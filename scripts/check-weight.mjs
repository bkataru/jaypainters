// Build-time weight and freshness check. Fails non-zero on byte overruns,
// warns (exit 0) when LAST_VERIFIED is over 12 months old.
import { readdirSync, statSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const GALLERY_MAX = 150 * 1024;
const CLIP_MAX = 3 * 1024 * 1024;
const CSS_MAX = 200 * 1024;

let failed = false;
const fail = (msg) => {
  console.error("OVER BUDGET:", msg);
  failed = true;
};

const checkDir = (dir, max, label) => {
  let entries = [];
  try {
    entries = readdirSync(join(DIST, dir));
  } catch {
    fail(`missing dist/${dir}/`);
    return;
  }
  for (const f of entries) {
    const size = statSync(join(DIST, dir, f)).size;
    if (size > max) fail(`${dir}/${f} is ${size} bytes (max ${max})`);
  }
};

checkDir("gallery", GALLERY_MAX, "gallery");
checkDir("video", CLIP_MAX, "video");

// CSS: Astro inlines small stylesheets into index.html; measure those bytes.
try {
  const html = readFileSync(join(DIST, "index.html"), "utf8");
  const styles = html.match(/<style[^>]*>[\s\S]*?<\/style>/g) || [];
  let total = 0;
  for (const s of styles) total += Buffer.byteLength(s, "utf8");
  try {
    const assets = readdirSync(join(DIST, "_astro")).filter((f) => f.endsWith(".css"));
    for (const f of assets) total += statSync(join(DIST, "_astro", f)).size;
  } catch {
    // no external CSS emitted; inline only
  }
  console.log(`CSS total ${total} bytes`);
  if (total > CSS_MAX) fail(`CSS total ${total} bytes (max ${CSS_MAX})`);
} catch (e) {
  fail("could not read dist/index.html for CSS check");
}

// Freshness: parse LAST_VERIFIED from site.ts.
try {
  const src = readFileSync(join(ROOT, "src", "data", "site.ts"), "utf8");
  const m = src.match(/LAST_VERIFIED = "(\d{4}-\d{2}-\d{2})"/);
  if (!m) {
    console.warn("WARN: LAST_VERIFIED not found in site.ts");
  } else {
    const age = Date.now() - new Date(m[1] + "T00:00:00Z").getTime();
    if (age > 365 * 24 * 3600 * 1000) console.warn(`WARN: LAST_VERIFIED ${m[1]} is over 12 months old`);
    else console.log(`lastVerified ${m[1]} OK`);
  }
} catch (e) {
  console.warn("WARN: could not read site.ts:", String(e).slice(0, 120));
}

if (failed) process.exit(1);
console.log("weight check passed");
