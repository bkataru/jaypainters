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
node scripts/check-weight.mjs
npm run check
SURGE_TOKEN=... npx surge@latest ./dist jaypainters.surge.sh --preview
npx surge@latest jaypainters.surge.sh cutover <rev>
npx surge@latest jaypainters.surge.sh rollback
npx surge@latest jaypainters.surge.sh revs
npx surge@latest jaypainters.surge.sh status
```

Preview first; bkataru approves the preview URL; then cut over to production.

## Editing content

All facts live in `src/data/site.ts`: phone, hours, address, map URL, brand
line, service groups with prefill text, gallery list, clip list, style
literals, `lastVerified`. Edit one value, rebuild, redeploy.

## Adding a photo

1. Compress to 150 KB or less (longest side 1200 px, JPEG quality ~72).
2. Drop into `public/gallery/` with a plain slug name.
3. Add the `{ file, caption, width, height }` entry to `GALLERY` in
   `src/data/site.ts`.
4. Rebuild and run the weight check.

## Domains

- Production: `jaypainters.surge.sh` (reserved 2026-11-07 under
  baalateja.k@gmail.com).
- Backup: `jay-painters-blr.surge.sh`. Switch rule: use only if the primary
  name is lost; update `astro.config.mjs`, `public/CNAME`, and this file.

## Surge quotas

Free-tier limits checked on first deploy; record numbers and date here.
Revisit trigger: move to GitHub Pages or Cloudflare if Surge limits bite.

## Notes

- No forms, prices, booking, backend, CMS, or login by design.
- Brand line is the neutral fallback until a dealer certificate is confirmed.
- `/kn/` is a reserved name only; no route ships.
