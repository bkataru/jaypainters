# Jay Painters Static Site

*   **Author:** bkataru
*   **Status:** Draft
*   **Date:** 2026-11-07

--------------------------------------------------------------------------------

## Overview

Jay Painters is a painting business in Ulsoor, Bangalore, run by Anthony
Jayasheelan since 1980. He manages teams of painters who work across homes,
buildings, malls, and offices in Bangalore, and travel to other cities on
request. Most new work comes from word of mouth and phone referrals. He has no
website.

This design covers a single static web page built with Astro and hosted free on
Surge.sh. The page shows who the business is, what work it does, proof of past
work, and how to reach the owner. A visitor on a phone can call or start a
WhatsApp chat in one tap. There are no forms, no prices, no booking, and no
backend.

## Problem

Anthony has a crew but not enough clients. He wins work when someone calls him
and he follows up by phone. Without an online page, people who hear his name
cannot check his work or find his number in one place. A JustDial listing
exists (a listings site where businesses show services and photos), but it
hides his number behind a button, mixes his listing with competitors, and
carries no reviews. A standalone page gives him a link he can share on
WhatsApp, Facebook, and Instagram, and shows the name, work types, photos,
hours, and call button without scrolling on a phone.

## Goals

* A visitor passes a 10-second check: shown the first screen for 10 seconds,
  the visitor can name the trade (painter), area (Ulsoor, Bangalore), start
  year (1980), and the two contact actions (call, WhatsApp). Pass bar: 4 out
  of 5 strangers in one in-person test.
* Tap-to-call and tap-to-WhatsApp work from every section on a phone, using
  `tel:+919731670742` and full `https://wa.me/919731670742?text=` links with
  short prefilled English text per section. Pass bar: link check finds zero
  dead or placeholder links.
* Services use 5 groups: home interiors, outside and waterproof, decorative,
  wood and polish, buildings and workplaces. Each group lists items as short
  lines.
* Proof: 12–18 photos with one-line captions naming the job type, duplicates
  removed, each 150 KB or less; plus 1–2 short muted clips with poster
  images, each 3 MB or less (launch ships 345 KB and 671 KB, drop-first if
  the budget slips). Pass bar: byte check fails the build over budget.
* Address, hours (07:00–21:00, shown as 7 AM–9 PM), owner name, and a map
  link open from the page without typing.
* Astro builds to `dist/` and deploys to Surge.sh with free HTTPS from a
  public GitHub repo, using two documented commands.
* All strings live in `src/data/site.ts` under stable keys, and page paths
  keep `/` for English with `/kn/` reserved by name only (no route ships),
  so a Kannada version needs no restructure. Pass bar: adding `/kn/` later
  touches strings plus one route file only.
* Launch traffic is shared links only (WhatsApp, Facebook, Instagram,
  JustDial listing). No search arrivals are expected; no SEO slice ships.
* Success is measured without trackers: owner-reported WhatsApp and call
  count per week, byte budget check, dead-link check, and the 10-second
  test above.

## Non-Goals

* No contact forms, quote forms, price lists, or per-sq-ft rates.
* No online booking, payments, backend, database, CMS, or login.
* No Kannada, Hindi, Tamil, or Telugu content for launch. No `/kn/` route
  ships; the name is reserved only.
* No designed image logo; styled text only.
* No blog, article section, or reviews import from JustDial.
* No email or social links until real accounts exist; placeholders do not
  ship on the page.
* No SEO slice for launch: no title, meta, canonical, schema, sitemap, or
  Search Console work beyond the default head tags.

## Open Questions

* **Brand line wording** (Owner: bkataru with Anthony — Due: follow-up after
  launch; does not gate build): dealer-certificate status is unknown, so
  launch ships the neutral fallback `Handles Asian Paints and Deco paints`.
  If a certificate is confirmed later, switch to an authorised-applicator
  claim in one `site.ts` edit.

Resolved before build:

* **JustDial photo reuse** — CLOSED 2026-11-07 by bkataru: catalogue copies
  are free to reuse (bkataru uploaded the originals to JustDial on
  Anthony's behalf). Dedupe done by hash plus eyes across 23 files: 3
  JustDial copies supersede local dupes (jd-6xbq7mlppn, jd-a1u8iwq1w2,
  jd-8xtczhrp1n), 3 unique JustDial files add coverage (jd-kx62vd78e4
  hero, jd-tlvv4sb8ao commercial, jd-fey86713no materials), 6 files
  dropped (2 blurry locals, 3 superseded locals, 1 JustDial dupe with a
  stranger in frame). 17 picks locked in `assets/gallery-locked/`, all
  150 KB or less, 1,537 KB total. See the appendix table.
* **Surge domain reservation** — CLOSED 2026-11-07 by bkataru: reserved
  via `surge` CLI under baalateja.k@gmail.com. `jaypainters.surge.sh` is
  live with a stub page (verified HTTPS 200). Backup
  `jay-painters-blr.surge.sh` recorded in the plan but unneeded.

## CUJs

### CUJ 1: Homeowner calls from the hero section

* **Given**: visitor on an Android phone over mobile data opens the page from
  a shared WhatsApp link.
* **When**: the visitor reads the name, Since 1980 line, and service area,
  then taps the Call button.
* **Then**: the phone dialer opens with +91 97316 70742 (shown in that
  spaced form, linked as `tel:+919731670742`). The page shows the number,
  hours, and address without scrolling on a small screen.

### CUJ 2: Builder checks services and opens WhatsApp

* **Given**: visitor needs painting for a building and opens the page from a
  shared WhatsApp link or the JustDial listing link.
* **When**: the visitor scrolls to the buildings and workplaces group and
  taps its WhatsApp button.
* **Then**: WhatsApp opens to +91 97316 70742 with prefilled English text
  naming that service group, ready to send. No form appears in between.

### CUJ 3: Visitor verifies past work before contacting

* **Given**: visitor is unsure whether to trust a painter found online.
* **When**: the visitor opens the gallery, views captions and 1–2 short
  clips with posters, then taps the sticky Call or WhatsApp bar.
* **Then**: images load within the weight budget (each tile 150 KB or
  less), captions name the job type, clips play muted on tap only, and the
  contact bar stays visible while scrolling.

## Technical Plan

One static page built with Astro. All facts live in one data file. Astro
components read that file and render sections. Launch ships compressed photo
files with width, height, and lazy loading; the Astro image pipeline stays a
fallback if the byte budget fails. Video files stay as static files. The build
writes HTML, CSS, images, and video to `dist/`. Surge.sh serves that folder
over HTTPS. The visitor never sends data to the site; Call, WhatsApp, and Map
links leave the page to the dialer, WhatsApp, and Google Maps.

### Routes and languages

* `/` serves English. The name `/kn/` is reserved for Kannada later. No
  Kannada route, strings file, or picker ships at launch.
* `src/pages/index.astro` renders the English page and reuses one layout.
* `src/data/site.ts` holds all visible English strings under stable keys.
* Adding Kannada later means adding one strings file plus one route file.
  No other file moves and no import changes.

### Content source

* `src/data/site.ts` is the one place for facts: phone, display form,
  `tel:+919731670742` link, `https://wa.me/919731670742?text=` base, hours,
  address, coordinates, map link, brand line, 5 service groups with
  per-group prefill text, gallery list, clip list, visible labels, and a
  `lastVerified` date.
* Every component reads from this file. No phone number, hour, or address
  text is typed directly in a component.
* Years in business are computed from 1980 at build time using calendar-year
  math (current year minus 1980, January-1 boundary, no timezone effect).
  The page shows "Since 1980" plus the computed count. No hard-coded year
  count ships. The build warns if `lastVerified` is over 12 months old.
* An edit means changing one value in `site.ts`, rebuilding, and deploying.
  The trade-off is that only the maintainer can publish a change. Rebuild
  at least yearly so the year count rolls over.

### Components

* `src/layouts/Base.astro`: HTML shell, head tags, styled text logo styles,
  sticky-bar slot, footer slot. Loads no client framework.
* `src/components/Header.astro`: text logo with fixed type, letter spacing,
  and one CSS shape defined in `src/styles/global.css`, Call and WhatsApp
  links.
* `src/components/Hero.astro`: name, Since 1980 line, service area
  (Bangalore, other cities on request), Call and WhatsApp buttons, hours
  next to the buttons.
* `src/components/Services.astro`: 5 groups (home interiors, outside and
  waterproof, decorative, wood and polish, buildings and workplaces). Each
  group lists its items as short lines and has its own WhatsApp link with
  prefilled text naming that group. Brand names sit in one line, not as a
  group.
* `src/components/Gallery.astro`: grid of 12–18 photos with one-line
  captions. Images below the first row load lazily; the first tile loads
  eagerly.
* `src/components/Clips.astro`: 1–2 video blocks. Each uses a poster image,
  muted playback, no preload, tap to play. No autoplay with sound.
* `src/components/About.astro`: owner name, Ulsoor base, team model, work
  area, hours.
* `src/components/Contact.astro`: address text, hours, map link, Call and
  WhatsApp buttons with the same links as the hero.
* `src/components/StickyBar.astro`: bottom bar on phones with Call and
  WhatsApp always visible, WhatsApp listed as the after-hours fallback.
  Pure links and CSS; no script needed.

### Images and video

* Launch ships compressed photo files with width, height, and lazy loading.
  Captions come from `site.ts` so text and file stay paired. The Astro
  image pipeline is a fallback if the byte budget fails, not a launch
  requirement.
* Clips ship as static files and copy to `dist/` unchanged. Launch clips
  are 12 seconds each, 480 px wide, no audio track: ceiling painting
  (345 KB) and wood masking and polish (671 KB). Each clip keeps its
  poster. Each clip stays 3 MB or less.
* Source originals (43 MB and 19 MB WhatsApp files, unused JustDial copies)
  stay out of the shipped folders. They are not part of the build.

### Contact and map links

* Call uses `tel:+919731670742` in the header, hero, each service group,
  contact block, and sticky bar. The number shows as +91 97316 70742.
* WhatsApp uses `https://wa.me/919731670742?text=` with a short encoded
  English message per section, for example naming interior painting or
  building work. Text is URL-encoded at build time from `site.ts`.
* Hours "7 AM–9 PM" sit beside Call and WhatsApp in the hero, contact
  block, and sticky bar. Outside 07:00–21:00 the buttons stay live with a
  "Replies 7 AM–9 PM, WhatsApp anytime" label; WhatsApp is the fallback.
* The single phone is the whole conversion path. Accepted behavior: missed
  calls during work hours are lost and counted only through the owner's
  weekly report. No second number ships without an answering owner.
* Tap-to-call needs a machine-readable number, so scraper exposure is
  accepted. Handling: block and report spam, use WhatsApp filters. No
  email ships, so no inbox needs watching.
* Map link opens Google Maps address search for "#21, Gauthamapuram, Near
  Football Ground, Ulsoor, Bangalore-560008". Coordinates 12.972696,
  77.626606 stay in `site.ts` as backup. Address text plus the landmark
  line "Near Football Ground, Ulsoor — ask for Jay Painters" stays on the
  page so a visitor with no Maps app can still find the shop.

### Build and hosting

* Astro builds to `dist/`; Surge.sh publishes that folder over HTTPS with
  free certificates on the project subdomain.
* One not-found page links back to `/`. Exact file placement and the
  verification that Surge.sh serves it live in the implementation plan.
* No server code, functions, or database. No forms to store or spam to
  filter. Rollback is a Surge.sh revision cutover; exact commands live in
  the implementation plan.
* API changes: none. The only outbound interfaces are `tel:`,
  `https://wa.me/`, and the Maps URL.

Figure 1 — Build to call flow:

```text
[maintainer edits src/data/site.ts + gallery/clip sources]
                |
                v
[Astro build: pages + components + compressed files]
                |
                v
[dist/: index.html, images, video/*.mp4, posters, 404.html, CNAME]
                |
                v
[Surge.sh: jaypainters.surge.sh over HTTPS]
                |
                v
[visitor phone: read -> tap Call / WhatsApp / Map]
                |
                +--> dialer (tel:+919731670742)
                +--> WhatsApp (https://wa.me/ with prefill)
                +--> Google Maps (address + coords)
```

## Risks & Limits

| Risk | Likelihood / Impact | Mitigation | Owner |
| --- | --- | --- | --- |
| Single-phone outage (busy, lost, no signal) | Medium / High | After-hours label, WhatsApp fallback, accepted missed-call loss counted by owner report | bkataru |
| Spam harvest from cleartext number in page and repo | High / Medium | Block and report, WhatsApp filters, no email added | bkataru |
| Stale hours, address, year count | Medium / Medium | One data file, `lastVerified` date with build warning over 12 months, yearly rebuild rule | bkataru |
| Surge.sh free-tier cap or limits | Low / High | Record limits checked on date in implementation plan; revisit trigger moves to GitHub Pages or Cloudflare | bkataru |
| JustDial photo rights dispute | Low / Medium | Rights table before gallery final; locals-only fallback | bkataru with Anthony |
| Brand-line complaint | Low / Medium | Certificate check before Services build; neutral wording without it | bkataru with Anthony |
| No search discovery | High / Low | Launch scoped to shared links only; SEO explicitly out | bkataru |
| Compressed-file budget miss | Low / Medium | Build-time byte check fails the build; image pipeline as fallback | bkataru |

JustDial coexistence: the site never links to JustDial. The maintainer adds
the site URL to the JustDial listing and watches for photo-reuse complaints.
Reviews stay off-site until testimonials exist.

## Alternatives

### Alternative A: Plain single HTML file instead of Astro

* **Pros**: one file, no build step, no dependencies, deploys as-is to
  Surge.sh.
* **Cons**: header, hero, service cards, gallery tiles, and sticky-bar links
  repeat by hand. One phone or prefill change means editing 5 or more
  copies.
* **Reason for Rejection**: Rejected by author (bkataru, 2026-11-07): Astro
  renders 9 sections from one data file, so a phone change touches 1 file
  instead of 5+. Build output stays static files and the deploy stays 2
  commands.

### Alternative B: Next.js instead of Astro

* **Pros**: large ecosystem, familiar React model, image component included.
* **Cons**: ships a server model and client runtime this page does not use.
  Static export adds config for no gain, and free static hosting is less
  direct than Astro to Surge.sh.
* **Reason for Rejection**: Rejected by author (bkataru, 2026-11-07): the
  page needs 0 server routes, 0 dynamic paths, and 0 client state. Next.js
  adds a client runtime of 80 KB or more plus export config for no used
  feature.

### Alternative C: GitHub Pages, Netlify, Vercel, or Cloudflare Pages instead of Surge.sh

* **Pros**: all serve static files free with HTTPS. GitHub Pages ties
  deploys to the repo. Netlify and Vercel add previews and form helpers.
  Cloudflare adds a large edge network.
* **Cons**: GitHub Pages needs extra setup for a working 404 page and HTTPS
  flow in this maintainer path. Netlify and Vercel extras (forms, previews,
  server functions) go unused. Cloudflare adds an account and config layer
  the maintainer did not ask for.
* **Reason for Rejection**: Rejected by author (bkataru, 2026-11-07): Surge.sh
  publishes `dist/` in 1 command with HTTPS on the project subdomain and 0
  config files. The design keeps that path and revisits only if Surge.sh
  limits bite.

### Alternative D: YouTube embeds instead of self-hosted clips

* **Pros**: no video bytes in the repo or build, YouTube handles encoding
  and bandwidth.
* **Cons**: embeds pull third-party scripts, suggested videos, and ad
  chrome onto a page with no third-party scripts. Playback leaves the page
  context and adds tracking requests over mobile data.
* **Reason for Rejection**: Rejected by author (bkataru, 2026-11-07): two
  clips at 345 KB and 671 KB with posters and muted tap-to-play keep proof
  on the page with 0 outside requests. YouTube stays a fallback if clips
  ever exceed the size budget.

### Alternative E: No video, photos only

* **Pros**: smallest page weight, no video bytes to download, no encoding
  work, no video maintenance.
* **Cons**: loses motion proof that painters use to show work in progress.
  A still gallery does not show work in progress the way a short clip does.
* **Reason for Rejection**: Rejected by author (bkataru, 2026-11-07): the
  compressed clips survived the cut (345 KB and 671 KB, muted, posters,
  lazy). They stay. Dropping video remains the fallback if future clips
  cannot meet the size cap.

### Alternative F: Multi-page site (services, gallery, contact pages)

* **Pros**: separate URLs per topic, room to grow per-service pages and a
  separate commercial section later.
* **Cons**: splits thin launch content across pages, doubles nav and
  cross-link work, and breaks the one-scroll one-bar conversion flow on a
  phone.
* **Reason for Rejection**: Rejected by author (bkataru, 2026-11-07):
  launch content is 9 sections on 1 scroll with 1 sticky bar. Splitting
  adds 3+ pages and a nav without adding content. Split later when
  Kannada or commercial content grows.

### Alternative G: Contact or quote form plus chat

* **Pros**: structured fields could capture name, area, and job type before
  first contact.
* **Cons**: needs storage, spam defence, an inbox someone checks, and a
  reply path. The owner answers phone and WhatsApp, not email or a
  dashboard. Prefilled WhatsApp text already carries the structure.
* **Reason for Rejection**: Rejected by author (bkataru, 2026-11-07): the
  owner answers 1 channel (phone and WhatsApp) and checks 0 inboxes. A
  form adds storage plus spam handling plus a checking burden with no one
  to carry it.

### Alternative H: Full 33-photo gallery instead of curated 12–18

* **Pros**: shows every job, no selection work, nothing left out.
* **Cons**: buries distinct jobs under near-duplicates and low-resolution
  catalogue copies, slows load on mobile data, and reads as storage rather
  than evidence.
* **Reason for Rejection**: Rejected by author (bkataru, 2026-11-07):
  gallery is evidence, not storage. Launch keeps 12–18 photos, one per
  job, duplicates removed, each with a one-line caption naming the job
  type, and adds more only when they show different work.

### Alternative I: Designed image logo or painted signboard photo instead of styled text

* **Pros**: a drawn mark or real signboard photo shows more detail than text
  alone and stands out against competitors.
* **Cons**: logo design costs time or money. A signboard photo needs a
  high-resolution original cropped for 360 px to desktop widths.
* **Reason for Rejection**: Rejected by author (bkataru, 2026-11-07): styled
  text needs no image files and renders sharp at any width. A signboard
  hero option can be tested later if a good photo exists. Full logo design
  is deferred.

--------------------------------------------------------------------------------

## NFR

* **Page weight**: header plus hero plus sticky CSS 200 KB or less; each
  gallery tile 150 KB or less with explicit width and lazy loading except
  the first tile; each clip 3 MB or less (launch: 345 KB, 671 KB) with
  posters and tap-to-play; build fails over budget.
* **No client runtime**: zero JavaScript framework on the page. Sticky bar,
  gallery, and video use links, CSS, and native video tags only. No script
  means nothing breaks on old phones.
* **Privacy**: no trackers, no analytics, no third-party embeds for launch.
  Outbound links (`tel:+919731670742`, `https://wa.me/`, Google Maps)
  leave the page by user tap only. Tap-to-call needs a machine-readable
  number, so scraper exposure is accepted; handling is block, report, and
  WhatsApp filters. No email ships.
* **Rollout**: every Surge.sh publish is a revision with instant cutover;
  preview before production and keep rollback ready. Exact commands, quota
  numbers checked on date, and the revisit trigger live in the
  implementation plan.
* **Readability**: text meets the body-size and contrast values in
  `src/styles/global.css`, tap targets are at least 44 px high, no
  horizontal scroll at 360 px width, layout holds if images or video fail
  to load.
* **Freshness**: `site.ts` carries `lastVerified`; the build warns past 12
  months; the maintainer rebuilds at least yearly.

## Additional Resources

* `../../concepts_brief.md`: brainstorm brief and intake source for this
  design.
* `../../justdial/`: saved JustDial page (HTML, Markdown, screenshot) with
  address, hours, coordinates, categories, and catalogue photo URLs.
* `../../assets/justdial/`: 7 unique JustDial photos downloaded once locally
  (jd-kx62vd78e4, jd-6xbq7mlppn, jd-8xtczhrp1n, jd-yfroy44hcv, jd-fey86713no,
  jd-a1u8iwq1w2, jd-tlvv4sb8ao). Remaining catalogue tiles behind the +11
  More control were not reachable as direct URLs; the 7 cover the visible
  set. No further JustDial fetches are needed.
* `../../assets/video/` and `../../assets/posters/`: 2 launch clips with
  posters (ceiling painting, wood masking and polish).
* Surge.sh docs: `https://surge.sh/` (one-command static publish,
  `surge ./dist <domain>`, free HTTPS on `*.surge.sh`).
* Astro docs: current line is Astro 7.4 (stable 7.4.5 as of November 2026);
  plan pins `astro@^7.4`. Check the primary source first:
  `https://github.com/withastro/astro/releases`, then [DepLog astro 7.4.5](https://deplog.dev/package-managers/npm/astro) and [Astro news November 2026](https://blog.mean.ceo/astro-framework-news-november-2026/).

## Future Improvements

* **Kannada version**: add one strings file plus one `/kn/` route when
  translations exist.
* **Commercial section**: separate anchor or page for builders and property
  managers once project names and testimonials exist.
* **Testimonial capture**: add client names and short quotes when the owner
  supplies them.
* **Per-area pages**: split services by area (Ulsoor, Richmond Town, and so
  on) only if shared-link traffic justifies it.

--------------------------------------------------------------------------------

## Detailed Implementation Plan

Styling: plain global CSS in `src/styles/global.css` plus scoped `<style>`
blocks in Astro components. No CSS framework, no utility library, no client
script.

### Phases

* Phase 1 — Skeleton plus conversion: items 1–4, 8–9, 11–12, 17–20, 24–27
  (config, data file with all literals, shell, header, hero, contact,
  footer, sticky bar, styles, 404, CNAME, README, ignore rules). Exit:
  `npm run build` passes, `dist/index.html` renders with working Call and
  WhatsApp links, no gallery or clips yet.
* Phase 2 — Services plus proof: items 13–16, 21–23, 28 (services with
  prefills, gallery with locked slugs and captions, clips with posters).
  Entry: gallery table and brand line closed. Exit: full page renders,
  weight and link checks pass.
* Phase 3 — Hardening plus handoff: verification plan, Surge preview,
  production publish, README quota record. Exit: preview approved by
  bkataru, production live, rollback recorded.

### Target Files to Create/Modify

#### 1. `package.json` (Create)

* **Type / Scope**: Node project manifest.
* **Proposed Changes**: name `jaypainters`, private true, type module.
  Scripts: `dev` runs `astro dev`, `build` runs `astro build`,
  `preview` runs `astro preview`, `check` runs `astro check`.
  Dependencies: `astro@^7.4`. Dev dependencies: `typescript@^5.6`,
  `@astrojs/check@^0.9`. Engines: node `>=18`. No UI framework, no
  analytics, no CMS packages. Why: pins the Astro 7.4 line with the two
  packages `astro check` needs, so install plus check pass on a clean
  clone.

#### 2. `astro.config.mjs` (Create)

* **Type / Scope**: Astro build config.
* **Proposed Changes**: default static output to `dist/`, site URL set to
  `https://jaypainters.surge.sh` (single variable; backup domain
  `jay-painters-blr.surge.sh` recorded in README if the first name is
  taken). No image-service config (launch uses plain files, not the
  pipeline). Why: fixes the output folder Surge.sh publishes. No
  canonical-link or sitemap output; launch keeps default head tags only.

#### 3. `tsconfig.json` (Create)

* **Type / Scope**: TypeScript config.
* **Proposed Changes**: extends `astro/tsconfigs/strict` (verify this
  path exists in the installed Astro version before build), includes
  `src/`. Why: catches wrong imports and mistyped data-file keys before
  build.

#### 4. `src/data/site.ts` (Create)

* **Type / Scope**: Single content data file. All strings live here; no
  second strings file ships.
* **Proposed Changes**: exports one object plus helpers. Exact literals:
  `phoneDisplay: "+91 97316 70742"`,
  `phoneTel: "tel:+919731670742"`,
  `waBase: "https://wa.me/919731670742?text="`,
  `hoursShort: "7 AM–9 PM"`, `hoursLong: "07:00–21:00"`,
  `hoursNote: "Replies 7 AM–9 PM, WhatsApp anytime"`,
  `owner: "Anthony Jayasheelan"`, `sinceYear: 1980`,
  `address: "#21, Gauthamapuram, Near Football Ground, R H A Penchine Line, Ulsoor, Bangalore-560008, Karnataka"`,
  `landmark: "Near Football Ground, Ulsoor — ask for Jay Painters"`,
  `lat: 12.972696`, `lng: 77.626606`,
  `mapUrl: "https://www.google.com/maps/search/?api=1&query=%2321%20Gauthamapuram%20Near%20Football%20Ground%20Ulsoor%20Bangalore-560008"`,
  `brandFallback: "Handles Asian Paints and Deco paints"`,
  `lastVerified: "2026-11-07"`, head `title: "Jay Painters — Ulsoor, Bangalore"`,
  `themeColor: "#1a1a1a"`. Service groups (exact titles, items, raw
  prefill): home interiors (living room, bedroom, putty, wall, window,
  white wash; prefill `Hi Jay Painters, I need interior painting.`),
  outside and waterproof (exterior walls, terrace and leakage painting;
  prefill `Hi Jay Painters, I need exterior or waterproof painting.`),
  decorative (3D, texture, Deco finishes, spray, statue; prefill
  `Hi Jay Painters, I need decorative painting.`), wood and polish
  (doors, furniture, polish; prefill
  `Hi Jay Painters, I need wood polish work.`), buildings and
  workplaces (apartments, buildings, malls, offices; prefill
  `Hi Jay Painters, I need painting for a building.`). Helpers:
  `waLink(prefill: string): string` returns `waBase +
  encodeURIComponent(prefill)`; worked example —
  `waLink("Hi Jay Painters, I need interior painting.")` returns
  `https://wa.me/919731670742?text=Hi%20Jay%20Painters%2C%20I%20need%20interior%20painting.`;
  `yearsSince1980(now = new Date()): number` returns
  `now.getFullYear() - 1980`. Build warns if `lastVerified` parses to
  over 12 months old. Gallery and clip entries follow the appendix
  table. Why: every fact and label lives in one place; components
  import from here and never hard-code phone, hours, or addresses.

#### 5. `src/layouts/Base.astro` (Create)

* **Type / Scope**: Astro HTML shell.
* **Proposed Changes**: frontmatter props `{ title: string }` read from
  `site.ts`. Renders head (charset utf-8, viewport
  `width=device-width, initial-scale=1`, title, theme-color meta from
  `site.ts`), global stylesheet link `/styles/global.css`, named slots
  `header`, `main`, `footer`, `bar` via `<slot name="..." />`. Sets
  `<html lang="en">`. No client scripts. Why: use this shell on every
  route so head tags, styles, and bar placement match.

#### 6. `src/pages/index.astro` (Create)

* **Type / Scope**: English page route at `/`. Only route at launch.
* **Proposed Changes**: imports `Base`, all section components, `site.ts`.
  Renders Header, Hero, Services, Gallery, Clips, About, Contact, Footer,
  StickyBar in that order with anchor ids (`#services`, `#gallery`,
  `#clips`, `#about`, `#contact`). Why: defines the launch page order
  and the anchor links the sticky bar and nav use.

#### 7. `src/components/Header.astro` (Create)

* **Type / Scope**: Astro header component.
* **Proposed Changes**: text logo with fixed type, letter spacing, and one
  CSS shape defined in `src/styles/global.css`, anchor nav (Services,
  Gallery, About, Contact), Call and WhatsApp links from `site.ts`. Why:
  gives the page the same top identity and contact entry points.

#### 8. `src/components/Hero.astro` (Create)

* **Type / Scope**: Astro hero component.
* **Proposed Changes**: business name, `Since 1980` plus computed years,
  area line (Bangalore, other cities on request), Call and WhatsApp
  buttons, static hours label `7 AM–9 PM · Replies 7 AM–9 PM, WhatsApp
  anytime` beside the buttons. No time-based switching. Why: carries the
  10-second check; the first screen must answer who, where, since when,
  and how to call.

#### 9. `src/components/Services.astro` (Create)

* **Type / Scope**: Astro services component.
* **Proposed Changes**: groups the list under 5 headings from `site.ts`
  (home interiors; outside and waterproof; decorative; wood and polish;
  buildings and workplaces), each with short item lines and its own
  WhatsApp link with prefill text. Brand fallback line renders once
  below the groups. Why: groups the raw list under headings with a chat
  link per group.

#### 10. `src/components/Gallery.astro` (Create)

* **Type / Scope**: Astro gallery component.
* **Proposed Changes**: grid of the 12–18 curated photos with one-line
  captions from `site.ts`, rendered as plain `<img>` tags with explicit
  `width`, `height`, and `loading` attributes. First tile loads eagerly,
  the rest load lazily. Alt text equals the caption. Why: gallery images
  load lazily with caption text as `alt` text, so missing images still
  show the caption.

#### 11. `src/components/Clips.astro` (Create)

* **Type / Scope**: Astro video component.
* **Proposed Changes**: 1–2 native tags exactly as
  `<video controls muted playsinline preload="none" poster="/posters/ceiling-painting-poster.jpg" src="/video/ceiling-painting-clip.mp4"></video>`
  (and the wood-polish pair). No autoplay, no script. Why: shows muted
  videos with native controls and no added JavaScript library.

#### 12. `src/components/About.astro` (Create)

* **Type / Scope**: Astro about component.
* **Proposed Changes**: owner name, Ulsoor base, team model (crew sent to
  sites, owner works alongside), service area, hours. Why: shows owner
  name, Ulsoor base, crew setup, service area, and hours.

#### 13. `src/components/Contact.astro` (Create)

* **Type / Scope**: Astro contact component.
* **Proposed Changes**: address text, landmark line, hours, map link from
  `site.ts`, Call and WhatsApp buttons. Same static hours label as the
  hero. Why: repeats the Call and WhatsApp links at the bottom for
  visitors who scroll the full page.

#### 14. `src/components/Footer.astro` (Create)

* **Type / Scope**: Astro footer component.
* **Proposed Changes**: name, Since line, `lastVerified` date from
  `site.ts`, small nav anchors, copyright year computed at build. No
  JustDial link (the site never links to JustDial), no social or email
  icons. Why: closes the page with identity and a freshness date.

#### 15. `src/components/StickyBar.astro` (Create)

* **Type / Scope**: Astro sticky-bar component.
* **Proposed Changes**: fixed bottom bar on narrow screens with Call and
  WhatsApp links and the same static hours label as the hero. Pure links
  plus CSS. Why: keeps the Call and WhatsApp links visible while
  scrolling on narrow screens.

#### 16. `src/styles/global.css` (Create)

* **Type / Scope**: Global stylesheet. Token table (no invented choice
  left): font stack `system-ui, -apple-system, "Segoe UI", Roboto, Arial,
  sans-serif`; body 16 px, H1 28 px, H2 22 px, small 14 px; background
  `#ffffff`, text `#1a1a1a`, muted `#5a5a5a`, call accent `#0b5fff`,
  WhatsApp accent `#1f7a34`, focus outline `#0b5fff` 2 px solid offset
  2 px; spacing 8, 16, 24, 32 px; gallery grid 2 columns under 640 px, 3
  above; services 1 column under 640 px, 2 above; sticky bar 56 px high;
  tap targets min-height 44 px; `overflow-x: hidden` guard plus 360 px
  no-scroll check.
* **Proposed Changes**: implements the token table above plus responsive
  grids, sticky-bar rules, and focus states. Why: one file sets the
  whole look so components stay small and consistent.

#### 17. `public/gallery/*` (Create, 12–18 files)

* **Type / Scope**: Gallery photo files served as-is.
* **Proposed Changes**: copy the locked files from the appendix table
  (sources: 16 root `WhatsApp Image *.jpeg` files plus 7
  `assets/justdial/jd-*.jpg` files), renamed to the locked slugs
  (example `exterior-ulsoor-01.jpg`). Compare images visually before
  copying: keep one copy per job, prefer local originals, drop
  duplicates and images where the subject is not sharp. Each file 150
  KB or less; Astro needs no local source transform because launch
  ships plain files. After curation, move the 16 root originals plus 2
  root videos to `assets/originals/` so the root stays clean; they are
  ignored, never shipped. Why: plain file names such as
  `exterior-ulsoor-01.jpg` keep the list in `site.ts` readable, and
  explicit sizes keep the byte check honest.

#### 18. `public/posters/ceiling-painting-poster.jpg` and `public/posters/wood-polish-poster.jpg` (Create, 2 files)

* **Type / Scope**: Video poster files served as-is.
* **Proposed Changes**: copy `assets/posters/ceiling-painting-poster.jpg`
  (29.9 KB) and `assets/posters/wood-polish-poster.jpg` (56.3 KB) here
  unchanged. Clips reference them as
  `poster="/posters/ceiling-painting-poster.jpg"` and the wood-polish
  pair. Why: posters ship compressed without a pipeline step.

#### 19. `public/video/ceiling-painting-clip.mp4` and `public/video/wood-polish-clip.mp4` (Create, 2 files)

* **Type / Scope**: Static video files (video streams only, no audio
  streams in the files; `muted`, `playsinline`, `preload="none"` are
  tag attributes, not file properties).
* **Proposed Changes**: copy `assets/video/ceiling-painting-clip.mp4`
  (352,710 B, 12.03 s, 480x864) and
  `assets/video/wood-polish-clip.mp4` (686,909 B, 12.03 s, 480x864)
  here unchanged. Why: `public/` copies to `dist/` as-is, and these
  sizes already meet the budget.

#### 20. `public/404.html` (Create)

* **Type / Scope**: Static not-found page.
* **Proposed Changes**: exact copy: heading `Page not found`, line `This
  page does not exist.`, link `Back to Jay Painters` to `/`. No Call or
  WhatsApp buttons (the sticky bar covers contact). Why: Surge.sh
  serves this file on unknown paths (verify on preview); it returns a
  lost visitor to the page in one tap.

#### 21. `public/CNAME` (Create, committed before first deploy)

* **Type / Scope**: Committed source file copied to `dist/CNAME`.
* **Proposed Changes**: exact bytes: `jaypainters.surge.sh` plus one
  newline. Surge.sh also writes `dist/CNAME` on publish; the committed
  file keeps the name stable. CLI calls still pass the domain
  explicitly every time so a stale file cannot misdirect a bare
  publish. Why: pins the domain so later deploys avoid typing errors.

#### 22. `scripts/check-weight.mjs` (Create)

* **Type / Scope**: Build-time weight and freshness check.
* **Proposed Changes**: reads `dist/`, fails with non-zero exit when any
  gallery file exceeds 150 KB, any clip exceeds 3 MB, header-plus-hero
  CSS exceeds 200 KB, or `lastVerified` in `site.ts` parses to over 12
  months old (warn-only for the date, fail for bytes). Run as part of
  `npm run build`. Why: turns the NFR budget into an executable gate
  instead of a manual hope.

#### 23. `README.md` (Create)

* **Type / Scope**: Maintainer guide.
* **Proposed Changes**: records prerequisites (Node `>=18`, npm `>=9`,
  `npm i -g surge`), exact command block (`npm install`, `npm run
  build`, `node scripts/check-weight.mjs`,
  `SURGE_TOKEN=... npx surge@latest ./dist jaypainters.surge.sh
  --preview`, `npx surge@latest jaypainters.surge.sh cutover <rev>`,
  `npx surge@latest jaypainters.surge.sh rollback`, `npx surge@latest
  jaypainters.surge.sh revs`, `npx surge@latest jaypainters.surge.sh
  status`), how to edit `src/data/site.ts`, how to add a photo (compress
  to 150 KB or less, drop into `public/gallery/`, add the caption
  entry, rebuild), Surge quota numbers with the checked-on date, backup
  domain `jay-painters-blr.surge.sh` with the switch rule, and who
  maintains (bkataru). Why: the design has one maintainer and no CMS;
  the README is the handoff.

#### 24. `.gitignore` (Create)

* **Type / Scope**: Git ignore file.
* **Proposed Changes**: exact lines: `node_modules/`, `dist/`,
  `assets/originals/`, `WhatsApp*`, `.DS_Store`, `Thumbs.db`. Why:
  keeps the public repo free of build output, the 60 MB of moved
  originals, and machine files.

#### 25. `assets/justdial/*` (Already staged, keep as source)

* **Type / Scope**: Downloaded JustDial originals.
* **Proposed Changes**: no further fetches. Only chosen copies move to
  `public/gallery/`; the 7 files stay as sources and are not used at
  build time. Why: keeps JustDial out of the build while preserving the
  source pool.

#### 26. Harvest step (process, no new file)

* **Type / Scope**: One-time copy from staged evidence.
* **Proposed Changes**: copy address, hours, coordinates, and categories
  from `../../justdial/Jay_Painters_in_Ulsoor,Bangalore_-_Best_House_Painters_near_me_in_Bangalore_-_Justdial.md`
  and the locked decisions from `../../concepts_brief.md` into
  `site.ts` before Phase 1 exit. Why: reuses staged evidence instead of
  re-deriving facts.

### Verification Plan

* **Build**: `npm install` then `npm run build` from a clean clone, then
  `node scripts/check-weight.mjs` and `npm run check`. Expected: all
  pass. `dist/` contains `index.html`, `gallery/*`, `video/*.mp4`,
  `posters/*`, `404.html`, `CNAME`. No `kn/` output exists.
* **Link check**: scripted grep over `dist/index.html`: every Call link
  equals `tel:+919731670742`; every WhatsApp link starts with
  `https://wa.me/919731670742?text=` and decodes to its appendix
  prefill; map link equals the appendix URL; zero `TODO`, zero
  placeholder social or email links.
* **Weight audit**: `node scripts/check-weight.mjs` passes with the
  thresholds above. Launch clips show posters and play muted with
  native controls on tap only.
* **Phone check**: open on a real Android phone at 360 px width. Sticky
  bar visible, no horizontal scroll, text readable, dialer and WhatsApp
  open on tap.
* **Deploy check**: `SURGE_TOKEN=... npx surge@latest ./dist
  jaypainters.surge.sh --preview` shows a preview URL; bkataru approves
  the preview URL; `npx surge@latest jaypainters.surge.sh cutover
  <rev>` publishes; `revs` and `status` confirm; `rollback` path
  recorded in README.
* **Static analysis**: `npm run check` (`astro check`) passes with the
  pinned devDeps. Advisory only: it must not gate a link-only page if
  the Astro version moves the extend path.
* **Edge-case matrix**: missing gallery file fails the build; missing
  caption key fails the build; unencoded prefill fails link check;
  wrong map URL fails link check; clip without poster fails link check;
  `lastVerified` over 12 months warns; images or video blocked still
  leaves layout with no horizontal scroll; January-1 rollover shows the
  new year count after rebuild; unknown path serves `404.html` on the
  preview URL. No test framework is added; the commands above plus this
  matrix replace unit tests.

### Appendix — Locked Content Tables

Gallery picks locked 2026-11-07 (17 files in `assets/gallery-locked/`,
all 150 KB or less, 1,537 KB total; copy to `public/gallery/` at build):

| # | Source path | Dest slug | Caption | Size |
| --- | --- | --- | --- | --- |
| 1 | `assets/justdial/jd-kx62vd78e4.jpg` | `hero-finished-exterior.jpg` | Finished exterior, Bangalore | 101 KB |
| 2 | `WhatsApp Image 2026-11-06 at 2.26.05 PM (1).jpeg` | `local-interior-texture-01.jpg` | Interior texture work | 73 KB |
| 3 | `WhatsApp Image 2026-11-06 at 2.26.05 PM.jpeg` | `local-interior-room-01.jpg` | Interior room painting | 78 KB |
| 4 | `WhatsApp Image 2026-11-06 at 2.27.18 PM (1).jpeg` | `local-decorative-finish-01.jpg` | Decorative wall finish | 104 KB |
| 5 | `WhatsApp Image 2026-11-06 at 2.27.19 PM.jpeg` | `local-interior-room-02.jpg` | Interior room painting | 52 KB |
| 6 | `WhatsApp Image 2026-11-06 at 2.27.52 PM (1).jpeg` | `local-exterior-building-01.jpg` | Exterior building painting | 149 KB |
| 7 | `WhatsApp Image 2026-11-06 at 2.27.52 PM.jpeg` | `local-exterior-detail-01.jpg` | Exterior detail work | 69 KB |
| 8 | `WhatsApp Image 2026-11-06 at 2.27.53 PM (1).jpeg` | `local-crew-exterior-01.jpg` | Crew painting exterior | 103 KB |
| 9 | `WhatsApp Image 2026-11-06 at 2.27.54 PM (1).jpeg` | `local-wood-polish-01.jpg` | Wood polish work | 67 KB |
| 10 | `WhatsApp Image 2026-11-06 at 2.27.55 PM (1).jpeg` | `local-interior-ceiling-01.jpg` | Interior ceiling painting | 60 KB |
| 11 | `WhatsApp Image 2026-11-06 at 2.27.55 PM.jpeg` | `local-wall-finish-01.jpg` | Wall finish work | 71 KB |
| 12 | `WhatsApp Image 2026-11-06 at 2.27.56 PM.jpeg` | `local-exterior-house-01.jpg` | House exterior painting | 85 KB |
| 13 | `assets/justdial/jd-6xbq7mlppn.jpg` | `jd-finished-apartments-01.jpg` | Finished apartments, exterior | 133 KB |
| 14 | `assets/justdial/jd-a1u8iwq1w2.jpg` | `jd-white-building-01.jpg` | White building exterior | 135 KB |
| 15 | `assets/justdial/jd-8xtczhrp1n.jpg` | `jd-yellow-exterior-01.jpg` | Yellow exterior finish | 95 KB |
| 16 | `assets/justdial/jd-tlvv4sb8ao.jpg` | `jd-commercial-scaffold-01.jpg` | Commercial block, scaffold work | 100 KB |
| 17 | `assets/justdial/jd-fey86713no.jpg` | `jd-materials-01.jpg` | Paints and tools on site | 99 KB |

Dropped (6): `2.27.19 PM (1).jpeg` (blurry), `2.27.18 PM.jpeg`
(dark/blurry), `2.27.53 PM.jpeg` (superseded by jd-6xbq7mlppn),
`2.27.54 PM.jpeg` (superseded by jd-a1u8iwq1w2),
`2.27.56 PM (1).jpeg` (superseded by jd-8xtczhrp1n),
`jd-yfroy44hcv.jpg` (dupe of jd-6xbq7mlppn with a stranger in frame).

Clip captions: `Ceiling painting, crew at work` and
`Wood masking and polish, Anthony at work`. Service prefills, map URL,
brand fallback, head strings, and hours labels are the literals in item
4 above.

*Drafted with EGM*
