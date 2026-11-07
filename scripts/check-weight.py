# Build-time weight and freshness check. Fails non-zero on byte overruns,
# warns (exit 0) when LAST_VERIFIED is over 12 months old.
import os
import re
import sys
import time
from datetime import datetime, timezone

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST = os.path.join(ROOT, "dist")
IMAGE_MAX = 150 * 1024
CLIP_MAX = 3 * 1024 * 1024
FIRST_VIEW_MAX = 250 * 1024

failed = False


def fail(msg):
    global failed
    print("OVER BUDGET:", msg, file=sys.stderr)
    failed = True


def check_dir(dirname, max_bytes):
    try:
        entries = os.listdir(os.path.join(DIST, dirname))
    except OSError:
        fail(f"missing dist/{dirname}/")
        return
    for f in entries:
        size = os.path.getsize(os.path.join(DIST, dirname, f))
        if size > max_bytes:
            fail(f"{dirname}/{f} is {size} bytes (max {max_bytes})")


check_dir("gallery", IMAGE_MAX)
check_dir("gallery-webp", IMAGE_MAX)
check_dir("posters", IMAGE_MAX)
check_dir("video", CLIP_MAX)

# Guard: no stray webp next to the jpeg originals.
try:
    strays = [f for f in os.listdir(os.path.join(ROOT, "public", "gallery")) if f.endswith(".webp")]
    if strays:
        fail(f"stray webp in public/gallery/: {', '.join(sorted(strays))}")
except OSError:
    fail("could not read public/gallery/")

# Guard + budget: every gallery entry resolves to both formats.
try:
    with open(os.path.join(ROOT, "src", "data", "site.ts"), encoding="utf8") as fh:
        src = fh.read()
    files = []
    m = re.search(r"export const GALLERY: GalleryEntry\[\] = \[(.*?)\];", src, re.S)
    if not m:
        fail("could not find GALLERY block in site.ts")
    else:
        files = re.findall(r'file: "([^"]+)"', m.group(1))
    missing = []
    for f in files:
        slug = f.replace(".jpg", "")
        for webp in [slug + ".webp"] + [f"{slug}-{w}.webp" for w in (320, 480, 720)]:
            if not os.path.isfile(os.path.join(DIST, "gallery", f)) or not os.path.isfile(os.path.join(DIST, "gallery-webp", webp)):
                missing.append(webp)
    if missing:
        fail(f"gallery entries missing a format: {', '.join(missing)}")
    else:
        print(f"gallery formats OK ({len(files)} entries x jpg + 4 webp rungs)")
except OSError:
    fail("could not read src/data/site.ts")

# First-view budget: html + css + preloaded fonts + hero webp. Only the
# latin faces are preloaded; latin-ext loads on demand, so it is not
# first-view bytes.
try:
    html = open(os.path.join(DIST, "index.html"), encoding="utf8").read()
    preloaded = re.findall(r'rel="preload" href="/fonts/([^"]+\.woff2)"', html)
    if not preloaded:
        fail("no preloaded fonts found in dist/index.html")
    total = os.path.getsize(os.path.join(DIST, "index.html"))
    for f in os.listdir(os.path.join(DIST, "_astro")):
        if f.endswith(".css"):
            total += os.path.getsize(os.path.join(DIST, "_astro", f))
    for f in preloaded:
        total += os.path.getsize(os.path.join(DIST, "fonts", f))
    total += os.path.getsize(os.path.join(DIST, "gallery-webp", "hero-finished-exterior.webp"))
    print(f"first-view total {total} bytes")
    if total > FIRST_VIEW_MAX:
        fail(f"first-view total {total} bytes (max {FIRST_VIEW_MAX})")
except OSError as e:
    fail(f"could not measure first-view bytes: {e}")

# Freshness: parse LAST_VERIFIED from site.ts.
try:
    with open(os.path.join(ROOT, "src", "data", "site.ts"), encoding="utf8") as fh:
        src = fh.read()
    m = re.search(r'LAST_VERIFIED = "(\d{4}-\d{2}-\d{2})"', src)
    if not m:
        print("WARN: LAST_VERIFIED not found in site.ts")
    else:
        age = time.time() - datetime.strptime(m.group(1), "%Y-%m-%d").replace(
            tzinfo=timezone.utc
        ).timestamp()
        if age > 365 * 24 * 3600:
            print(f"WARN: LAST_VERIFIED {m.group(1)} is over 12 months old")
        else:
            print(f"lastVerified {m.group(1)} OK")
except OSError as e:
    print(f"WARN: could not read site.ts: {str(e)[:120]}")

if failed:
    sys.exit(1)
print("weight check passed")
