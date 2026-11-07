# Jay Painters Static Site

* **Author:** bkataru
* **Date:** 2026-11-07

## Overview

One-page-first static site for Jay Painters, Ulsoor, Bangalore. Owner: Anthony Jayasheelan. In business since 1980. Serves homes and commercial sites in Bangalore, travels to Chennai / Hyderabad on request.

The only job of the site is to turn a phone visitor into a call or WhatsApp chat on +91 97316 70742. No forms. No prices. No backend. English only for now, built so Kannada and other languages can be added later. Built in Astro, output to `dist/`, hosted free on Surge.sh at `jaypainters.surge.sh` from public repo `github.com/bkataru/jaypainters`.

What the visitor gets: who this is, what work they do (grouped so it reads fast), proof (merged photo gallery + short compressed clips), how to reach them (tap-to-call, tap-to-WhatsApp with prefilled text), where they are (address, hours 07:00–21:00, map link from 12.972696,77.626606).

## Analysis (critique first)

### 1. The 47-year claim does not add up and sits at the top of the page
JustDial shows "47 Years in Business" and the hypothesis repeats "prominent 47-years claim", but 1980 to November 2026 is 46 years. A wrong number in the hero destroys trust for a trade business that sells on trust.

Fix: lead with "Since 1980", compute years from the date ("46 years" today) in code so it never goes stale. Keep JustDial's wording off the site. Owner agreed to this fix in brainstorm iteration.

### 2. The site will be too heavy for the phones it targets unless video is cut hard
Two WhatsApp videos total ~59 MB. On a cheap Android phone on mobile data that is a dead page. Surge.sh serves files as-is — no resizing, no transcoding, no image CDN. Phone-first and 60 MB of video cannot both be true.

Fix: compress each clip to a short silent loop under ~2–3 MB (720p max, no audio track, poster image, lazy load, tap to play, never autoplay with sound). Done for launch: `assets/video/ceiling-painting-clip.mp4` (12s, 480x864, 345 KB, worker painting ceiling from scaffold) and `assets/video/wood-polish-clip.mp4` (12s, 480x864, 671 KB, Anthony masking wood frames for polish work), each with a JPG poster in `assets/posters/`. Source videos (43 MB + 19 MB) stay out of the shipped build. Photos also need_resize and compress before they go in the repo — 33 source photos (16 local + 17 JustDial) with duplicates will bloat the build fast.

### 3. One phone number is the whole business — the site has no backup plan
Personal number = business number. If the owner is on a ladder, in a no-signal basement, or gets spam from having the number in a public repo, leads stop. No form is fine, but then the call/WhatsApp path must work every time.

Fix: `tel:+919731670742` everywhere, `wa.me/919731670742` with a short prefilled message per section (e.g. "Hi Jay Painters, I need interior painting in ___"). Sticky bottom bar on mobile with Call + WhatsApp always visible. Add hours ("7 AM–9 PM") next to the buttons so people know when to expect an answer. Number is already public on JustDial, so repo exposure adds little new risk, but do not add any second number or email that is not answered.

### 4. The service list as given confuses a new visitor
Current raw list mixes rooms (living/bedroom), coatings (Asian Paints, Deco, spray, texture, 3D, deco), prep (putty, white wash, wood/polish), problems (waterproof, window/wall), statues, and customer types (residential, buildings/malls/corporate). A homeowner will not know where they fit.

Fix: group into 4–5 plain buckets and say who each is for. Proposed grouping:
- Home interiors — living room, bedroom, putty, wall, window, white wash
- Outside + waterproof — exterior walls, terrace / leakage-related painting
- Decorative — 3D, texture, Deco / design finishes, spray, statue
- Wood + polish — doors, furniture, polish work
- Buildings + workplaces — apartments, buildings, malls, offices
Keep brand mentions ("works with Asian Paints" style) as one line, not a category, unless there is a dealer certificate to show.

### 5. Gallery merge hides a rights and duplication problem
16 local images vs 17 JustDial photos overlap. Some JustDial images are low-resolution catalogue shots. Pulling them straight into the repo risks duplicates, blurry tiles, and unclear ownership.

Fix: dedupe by eye (perceptual check, not filenames — WhatsApp forwards rename everything). Keep one best copy of each job. Prefer local originals. Compress to web-friendly sizes, cap gallery at ~12–18 strongest images for launch, add the rest later only if they show different work. Give each image a plain caption ("Exterior, Ulsoor") so it reads as proof, not filler.

### 6. Text-only logo and English-only are fine for launch, but both need a stub for what comes next
Text logo keeps cost zero and loads fast, but alone it looks generic among competitors with painted logos. English-only excludes part of the local customer base in Ulsoor.

Fix: style the text logo (fixed type, spacing, one paint-stroke underline or colour block) so it is repeatable, not default browser text. For language, build URL and string structure ready for `/kn/` later, but do not ship half-translated Kannada now. One clean language beats two broken ones.

### 7. Free hosting + public repo + no CMS means updates depend on one maintainer
Surge free + HTTPS is enough for a static page. Weak point is people, not tech: only bkataru can rebuild and push. Owner cannot edit photos or hours himself. If that handoff is not written down, the site goes stale after the first price or timing change.

Fix: keep the build to two commands (`npm install`, `npm run build`, `surge ./dist jaypainters.surge.sh`), keep content (phone, hours, address, services) in one small file so a future edit is one place, document it in the README.

## Goals vs. Non-Goals

* **In-Scope Goals:**
- Visitor understands in 10 seconds: painter in Ulsoor, since 1980, Bangalore homes + buildings, call or WhatsApp now.
- Tap-to-call and tap-to-WhatsApp work from every section on a phone, with prefilled WhatsApp text in English.
- Grouped services (4–5 buckets), merged deduped gallery, address + hours + map link, owner name.
- Fast on mobile data: compressed images, short muted clips with posters, no framework weight.
- Astro builds to `dist/`, deploys to Surge.sh free HTTPS from public GitHub repo.

* **Out-of-Scope Non-Goals:**
- No contact forms, no quote forms, no price lists or per-sq-ft rates.
- No online booking, no payments, no backend, no CMS, no login.
- No Kannada / Hindi / Tamil versions yet — structure ready, content later.
- No image logo design, no brand system beyond styled text.
- No SEO article section, no blog, no reviews widget (JustDial rating count is thin — do not import it).
- No email or social links until real handles exist — placeholders stay out of the shipped page.

## Alternatives Weighed

1. Astro static vs plain HTML file vs Next.js.
Picked Astro: gives component reuse for service cards and gallery plus image handling, still outputs plain static files Surge can serve. Plain HTML would work but repeats header/footer/CTA markup by hand. Next.js adds a server we do not need and complicates free static hosting. Reason: smallest tool that removes duplication without adding runtime.

2. Surge.sh vs GitHub Pages / Netlify / Vercel / Cloudflare Pages.
Picked Surge per hypothesis: one-command deploy, free HTTPS, custom subdomain, no account complexity. GitHub Pages is a fair second (free, tied to the repo) but custom 404/HTTPS setup is slightly more fiddly for this maintainer flow. Netlify/Vercel free tiers add forms/previews we will not use. Reason: keep the stated deploy path, document the two commands, revisit only if Surge limits bite.

3. Self-host compressed clips vs YouTube embed vs no video.
Picked short self-hosted muted clips with posters: keeps visitor on the page, no YouTube chrome or tracking weight, works with no backend. YouTube would save bandwidth but shows ads/suggestions and needs third-party embeds on a lean page. No video is the fallback if compression fails. Reason: proof matters for painters, but only if clips stay tiny and lazy-loaded.

4. Single long page vs multi-page (services / gallery / contact pages).
Picked single page with anchor sections for launch: one scroll on a phone, one sticky call bar, fewer files to maintain. Multi-page helps SEO later but splits a thin content set and doubles nav work now. Reason: match the single conversion job; split later only when content grows (e.g. Kannada version, commercial section).

5. Tap-to-chat only vs form + chat.
Picked tap-to-call / tap-to-WhatsApp only: matches how the owner already works (phone = business), zero spam handling, zero backend, prefills give structure without a form. A form would need storage, spam defence, and someone to check inbox — none exists. Reason: do what the owner answers.

6. Full 33-photo gallery vs curated 12–18.
Picked curated: faster load, less duplication, stronger proof. Full dump buries good work under near-duplicates and blurry catalogue copies. Reason: gallery is evidence, not storage.

7. Text logo vs designed image logo vs photo of painted signboard.
Picked styled text for launch: zero asset cost, crisp on all screens, easy to keep consistent. A photo signboard could beat it on character if a good photo exists — worth testing one hero-header option with the shop photo. Full logo design is deferred. Reason: ship clean, revisit with real artwork.

## Key Decisions & Staging for Next Steps

Decisions locked for implementation:
- Phone `+91 97316 70742` as `tel:+919731670742` and `https://wa.me/919731670742?text=<encoded English message>`; per-section prefill text; sticky mobile Call/WhatsApp bar; hours 07:00–21:00 shown beside CTAs.
- Claim wording: "Since 1980" + computed years; never hard-code "47 years".
- Service buckets (5 max) as in Analysis §4; brand line kept to one sentence.
- Gallery: dedupe 33 → keep 12–18, compress, plain captions; videos: max 2 clips, each ≤3 MB, muted, poster, lazy, no autoplay with sound.
- English only; code paths and strings laid out for `/kn/` later.
- Text logo with fixed style; no social/email icons until real accounts exist.
- Content lives in one data file (phone, hours, address, coords, services, gallery list) so non-Astro edits are trivial.
- Build: Astro → `dist/` → `surge ./dist jaypainters.surge.sh`; README records exact commands and maintainer (bkataru).

Staging:
- Stage 1 — Skeleton + conversion path: Astro shell, header with text logo, hero with Since-1980 line, sticky Call/WhatsApp bar, footer with address/hours/map link. Verify on a real phone: both buttons work, readable in sunlight, no horizontal scroll.
- Stage 2 — Services + proof: 5 service buckets with per-bucket WhatsApp prefill, curated gallery grid, compressed clips with posters. Dedupe and compress happen here, not later.
- Stage 3 — Hardening + handoff: compress audit (page weight budget), dead-link check, no placeholders shipped, README with build/deploy/edit steps, Surge deploy from clean clone. i18n stub verified (adding `/kn/` needs no refactor).
- Later (not launch): Kannada version, commercial-client section, review/testimonial capture, YouTube move if clips exceed budget, SEO pages per service area.

Biggest risks to watch:
1. Page weight from photos/video on mobile data — kills the whole lead goal if ignored. Enforce size caps before deploy.
2. Year-count credibility ("47" vs actual 46) — small text, large trust cost. Compute from 1980.
3. Single-maintainer updates with no CMS — site rots if only bkataru can change hours or photos. One content file + README is the mitigation.
