# Jay Painters

Static site for Jay Painters, Ulsoor, Bangalore. Built with Astro, hosted on
Surge.sh at <https://jaypainters.surge.sh>. Maintainer: bkataru.

## Prerequisites

- Node >= 18, npm >= 9
- `npm i -g surge`

## Commands

```sh
npm install
npm run build
python scripts/check-weight.py
npm run check
npm run lint:html
npm run validate:html
npm run lint:css
npx prettier --check "src/**/*.{astro,ts,css}"
SURGE_TOKEN=... npx surge@latest ./dist jaypainters.surge.sh --preview
npx surge@latest jaypainters.surge.sh cutover <rev>
npx surge@latest jaypainters.surge.sh rollback
npx surge@latest jaypainters.surge.sh revs
npx surge@latest jaypainters.surge.sh status
```

Preview first; bkataru approves the preview URL; then cut over to production.

## Quality gates

All nine must pass before a publish:

| Gate | Command |
| --- | --- |
| Build | `npm run build` |
| Type and template check | `npm run check` |
| HTML rules | `npm run lint:html` |
| HTML5 conformance | `npm run validate:html` |
| CSS rules | `npm run lint:css` |
| Formatting | `npx prettier --check "src/**/*.{astro,ts,css}"` |
| Weight and freshness budget | `python scripts/check-weight.py` |
| Contact links | grep `tel:` and `wa.me` counts in `dist/index.html` |
| Preview render | fetch the preview URL and read the text |

Tooling installed for these: `htmlhint`, `html-validate`, `stylelint` with
`stylelint-config-standard`, `prettier` with `prettier-plugin-astro`.
`.prettierignore` keeps vendored skills, the JustDial dump, assets, and
`dist/` out of formatting.

## Regenerating WebP variants

`python scripts/make-webp.py` rebuilds `public/gallery-webp/` from
`public/gallery/`. Each gallery JPEG produces a full-size WebP plus a
320/480/720 px width ladder (`<slug>-320.webp`, `<slug>-480.webp`,
`<slug>-720.webp`, aspect preserved); the ladder rungs feed the `srcset` /
`sizes` on grid tiles, featured images, and the hero, with the JPEG as the
`<img src>` fallback. WebP is used unconditionally via `<source>` and is
usually smaller; it aborts on a 0-byte variant. One file
(`local-exterior-building-01`) saves almost nothing because the JPEG is
already WhatsApp-compressed.

## Editing content

All facts live in `src/data/site.ts`: phone, hours, address, map URL, service
groups with prefill text, gallery list, clip list, `LAST_VERIFIED`. Edit one
value, rebuild, redeploy. Captions must describe what is visible in the photo.

## Adding a photo

1. Compress to 150 KB or less (longest side 1200 px, JPEG quality ~72).
2. Drop into `public/gallery/` with a plain slug name.
3. Add the `{ file, caption, width, height }` entry to `GALLERY` in
   `src/data/site.ts`.
4. Run `python scripts/make-webp.py` to rebuild `public/gallery-webp/`.
5. Rebuild and run the weight check.

## Domains

- Production: `jaypainters.surge.sh` (reserved 2026-11-07 under
  baalateja.k@gmail.com).
- Backup: `jay-painters-blr.surge.sh`. Switch rule: use only if the primary
  name is lost; update `astro.config.mjs` (`site`, which drives canonical,
  JSON-LD url, and og:image), `public/CNAME`, `public/robots.txt` (Sitemap
  line), `public/sitemap.xml` (`loc`), and this file.

## Indexing status (2026-11-08 decision: stay on surge.sh)

Surge force-serves `User-agent: * Disallow: /` on all `*.surge.sh`
subdomains (sintaxi/surge#288, platform policy). Our `public/robots.txt`
ships in `dist/` but crawlers never see it, so the site is currently
de-indexed from Google/Bing/AI search. Discovery runs through the
JustDial listing + WhatsApp until a custom domain is bought.
`sitemap.xml` and `llms.txt` DO serve correctly and activate fully the
day a custom domain points here. To enable indexing: buy a domain,
`surge ./dist <domain>`, point DNS at Surge, update `astro.config.mjs`
`site`, `CNAME`, `robots.txt` Sitemap line, `sitemap.xml` loc,
`llms.txt` URLs, and this file.

## Surge quotas

Free-tier limits checked on first deploy; record numbers and date here.
Revisit trigger: move to GitHub Pages or Cloudflare if Surge limits bite.

## Notes

- No forms, prices, booking, backend, CMS, or login by design.
- `/kn/` is a reserved name only; no route ships.
