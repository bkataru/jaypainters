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

## The Problem

Anthony has a crew but not enough clients. He wins work when someone calls him
and he follows up by phone. Without an online page, people who hear his name
cannot check his work or find his number in one place. A JustDial listing
exists, but it hides his number behind a button, mixes his listing with
competitors, and carries no reviews. A standalone page gives him a link he can
share on WhatsApp, Facebook, and Instagram, and gives a stranger enough reason
to call within seconds.

## Goals

*   A visitor understands in 10 seconds: painter in Ulsoor, since 1980,
    Bangalore homes and buildings, call or WhatsApp now.
*   Tap-to-call and tap-to-WhatsApp work from every section on a phone, using
    `tel:+919731670742` and `wa.me` links with short prefilled English text per
    section.
*   Services read fast: 5 plain groups covering interiors, outside and
    waterproof, decorative, wood and polish, and buildings and workplaces.
*   Proof is real and light: 12-18 deduped compressed photos with plain
    captions, plus at most 2 short muted clips with posters, each under 3 MB.
*   Address, hours (07:00-21:00), owner name, and a map link open from the
    page without typing.
*   Astro builds to `dist/` and deploys to Surge.sh with free HTTPS from a
    public GitHub repo, using two documented commands.
*   All strings and page paths are laid out so a Kannada version can be added
    later without restructuring the code.

## Non-Goals

*   No contact forms, quote forms, price lists, or per-sq-ft rates.
*   No online booking, payments, backend, database, CMS, or login.
*   No Kannada, Hindi, Tamil, or Telugu content for launch.
*   No designed image logo; styled text only.
*   No blog, article section, or reviews import from JustDial.
*   No email or social links until real accounts exist; placeholders do not
    ship on the page.

## Open Questions

*   **JustDial photo reuse**: 17 catalogue photos exist on JustDial. Are all of
    them free to copy into this repo, and which ones duplicate the 16 local
    images? Needs a side-by-side check before the gallery list is final.
*   **Brand line wording**: the brief keeps "works with Asian Paints" style
    wording to one line. Does Anthony hold a dealer certificate, or should the
    line name Asian Paints and Deco as handled brands only?
*   **Map link form**: address plus coordinates (12.972696, 77.626606) are
    known. Should the link open Google Maps search by address or by
    coordinates, and what fallback shows if maps is blocked?
*   **Surge domain reservation**: is `jaypainters.surge.sh` free, or is a
    backup name needed before the first deploy?

## Critical User Journeys (CUJs)

### CUJ 1: Homeowner calls from the hero section

*   **Given**: visitor on an Android phone over mobile data opens the page from
    a shared WhatsApp link.
*   **When**: the visitor reads the name, Since-1980 line, and service area,
    then taps the Call button.
*   **Then**: the phone dialer opens with +91 97316 70742. The page shows the
    number, hours, and address without scrolling on a small screen.

### CUJ 2: Builder checks services and opens WhatsApp

*   **Given**: visitor needs painting for a building and opens the page from a
    search result.
*   **When**: the visitor scrolls to the buildings and workplaces group and
    taps its WhatsApp button.
*   **Then**: WhatsApp opens to +91 97316 70742 with prefilled English text
    naming that service group, ready to send. No form appears in between.

### CUJ 3: Visitor verifies past work before contacting

*   **Given**: visitor is unsure whether to trust a painter found online.
*   **When**: the visitor opens the gallery, views captions and at most 2 short
    clips with posters, then taps the sticky Call or WhatsApp bar.
*   **Then**: images load fast on mobile data, captions name the job type, clips
    play muted on tap only, and the contact bar stays visible while scrolling.

## Technical Plan (Architecture)

One static page built with Astro. All facts live in one data file. Astro
components read that file and render sections. Images pass through the Astro
image pipeline. Video files stay as static files. The build writes plain HTML,
CSS, images, and video to `dist/`. Surge serves that folder over HTTPS. The
visitor never sends data to the site; Call, WhatsApp, and Map links leave the
page to the dialer, WhatsApp, and Google Maps.

### Routes and languages (author choice 3A)

*   `/` serves English. `/kn/` is reserved for Kannada later.
*   `src/pages/index.astro` renders the English page. `src/pages/kn/index.astro`
    exists from day one and reuses the same layout with the same English text
    until Kannada strings are filled.
*   `src/i18n/en.ts` holds all visible English strings. `src/i18n/kn.ts` is a
    stub with the same keys and empty values. `src/i18n/index.ts` picks the
    strings file by route.
*   Adding Kannada later means filling `kn.ts` only. No file moves and no
    import changes.

### Content source (author choice 1A)

*   `src/data/site.ts` is the one place for facts: phone, display form,
    `tel:` link, WhatsApp base, hours, address, coordinates, map link, brand
    line, 5 service groups with per-group prefill text, gallery list, clip
    list.
*   Every component reads from this file. No phone number, hour, or address
    text is typed directly in a component.
*   Years in business are computed from 1980 at build time. The page shows
    "Since 1980" plus the computed count. No hard-coded year count ships.
*   An edit means changing one value in `site.ts`, rebuilding, and deploying.
    The trade-off is that only the maintainer can publish a change.

### Components

*   `src/layouts/Base.astro`: HTML shell, head tags, styled text logo styles,
    sticky-bar slot, footer slot. Loads no client framework.
*   `src/components/Header.astro`: text logo with fixed type and one paint
    mark, Call and WhatsApp links.
*   `src/components/Hero.astro`: name, Since-1980 line, service area
    (Bangalore, other cities on request), Call and WhatsApp buttons, hours next
    to the buttons.
*   `src/components/Services.astro`: 5 groups (home interiors, outside and
    waterproof, decorative, wood and polish, buildings and workplaces). Each
    group lists its items in plain words and has its own WhatsApp link with
    prefilled text naming that group. Brand names sit in one line, not as a
    group.
*   `src/components/Gallery.astro`: grid of 12-18 photos with plain captions.
    Images below the first screen load lazily.
*   `src/components/Clips.astro`: at most 2 video blocks. Each uses a poster
    image, muted playback, no preload, tap to play. No autoplay with sound.
*   `src/components/About.astro`: owner name, Ulsoor base, team model, work
    area, hours.
*   `src/components/Contact.astro`: address text, hours, map link, Call and
    WhatsApp buttons with the same links as the hero.
*   `src/components/StickyBar.astro`: bottom bar on phones with Call and
    WhatsApp always visible. Pure links and CSS; no script needed.

### Images and video (author choice 2B)

*   Photo sources move to `src/assets/gallery/`. Components render them with
    the Astro image pipeline, which writes sized compressed files to `dist/`
    at build time. Captions come from `site.ts` so text and file stay paired.
*   Posters move to `src/assets/posters/` and pass through the same pipeline.
    Clips move from `assets/video/` to `public/video/` and copy to `dist/`
    unchanged, since the image pipeline does not handle video.
*   Current launch clips are 12 seconds each, 480 wide, no audio track:
    ceiling painting (345 KB) and wood masking and polish (671 KB). Each clip
    keeps its poster. Total launch video stays under 3 MB per clip.
*   Source originals (43 MB and 19 MB WhatsApp files, unused JustDial copies)
    stay out of `src/assets/` and `public/`. They are not part of the build.
*   If the image pipeline fails on a fresh machine (missing image tools), the
    build stops before deploy. That is intended: it blocks shipping broken or
    oversized images.

### Contact and map links

*   Call uses `tel:+919731670742` in the header, hero, each service group,
    contact block, and sticky bar.
*   WhatsApp uses `https://wa.me/919731670742?text=<encoded English message>`.
    Each section sets its own short text, for example naming interior painting
    or building work. Text is URL-encoded at build time from `site.ts`.
*   Hours "7 AM - 9 PM" sit beside Call and WhatsApp in the hero, contact
    block, and sticky bar.
*   Map link opens Google Maps from the address and coordinates
    (12.972696, 77.626606). Address text stays on the page so the visitor can
    copy it if Maps is blocked.

### Build and hosting

*   `npm run build` runs Astro and writes `dist/`. `surge ./dist
    jaypainters.surge.sh` publishes that folder. HTTPS on `*.surge.sh` is
    included. A `CNAME` file records the domain.
*   `public/404.html` gives a plain not-found page with a link back to `/`
    and the Call and WhatsApp buttons.
*   No server code, functions, or database. No forms to store or spam to
    filter. Rollback is a Surge revision cutover.
*   API changes: none. The only outbound interfaces are `tel:`, `wa.me`, and
    the Maps URL.

```text
[maintainer edits src/data/site.ts + src/assets/*]
                |
                v
[Astro build: pages + components + image pipeline]
                |
                v
[dist/: index.html, kn/index.html, _astro images,
        video/*.mp4, posters, 404.html, CNAME]
                |
                v
[Surge CDN: jaypainters.surge.sh over HTTPS]
                |
                v
[visitor phone: read -> tap Call / WhatsApp / Map]
                |
                +--> dialer (tel:+919731670742)
                +--> WhatsApp (wa.me with prefill)
                +--> Google Maps (address + coords)
```

## Alternatives Considered

### Alternative A: Plain single HTML file instead of Astro

*   **Pros**: one file, no build step, no dependencies, deploys as-is to Surge.
*   **Cons**: header, hero, service cards, gallery tiles, and sticky-bar links
    repeat by hand. One phone or prefill change means editing many copies.
*   **Reason for Rejection**: Rejected by author: Astro removes duplication
    through components and adds build-time image handling while still
    emitting plain static files. The file count stays small and the deploy
    path stays the same.

### Alternative B: Next.js instead of Astro

*   **Pros**: large ecosystem, familiar React model, image component included.
*   **Cons**: ships a server model and client runtime this page does not use.
    Static export adds config for no gain, and free static hosting is less
    direct than Astro to Surge.
*   **Reason for Rejection**: Rejected by author: no server, no dynamic
    routes, and no client state exist here. Next.js adds runtime weight and
    config without a matching need.

### Alternative C: GitHub Pages, Netlify, Vercel, or Cloudflare Pages instead of Surge

*   **Pros**: all serve static files free with HTTPS. GitHub Pages ties
    deploys to the repo. Netlify and Vercel add previews and form helpers.
    Cloudflare adds a large edge network.
*   **Cons**: GitHub Pages needs extra setup for clean 404 and HTTPS flow in
    this maintainer path. Netlify and Vercel extras (forms, previews, server
    functions) go unused. Cloudflare adds an account and config layer the
    maintainer did not ask for.
*   **Reason for Rejection**: Rejected by author: Surge is a one-command
    publish of `dist/` with free HTTPS on the project subdomain. The design
    keeps that path and its two documented commands, and revisits only if
    Surge limits bite.

### Alternative D: YouTube embeds instead of self-hosted clips

*   **Pros**: no video bytes in the repo or build, YouTube handles encoding
    and bandwidth.
*   **Cons**: embeds pull third-party scripts, suggested videos, and ad
    chrome onto a lean page. Playback leaves the page context and adds
    tracking weight over mobile data.
*   **Reason for Rejection**: Rejected by author: two clips under 3 MB each
    with posters and muted tap-to-play keep proof on the page with no outside
    calls. YouTube stays a fallback if clips ever exceed the size budget.

### Alternative E: No video, photos only

*   **Pros**: smallest page weight, fastest load, no encoding work, no video
    maintenance.
*   **Cons**: loses motion proof that painters use to show real work in
    progress. A still gallery reads flatter than a short clip of a crew at
    work.
*   **Reason for Rejection**: Rejected by author: the compressed clips
    survived the cut (345 KB and 671 KB, muted, posters, lazy). They stay.
    Dropping video remains the fallback if future clips cannot meet the size
    cap.

### Alternative F: Multi-page site (services, gallery, contact pages)

*   **Pros**: cleaner URLs per topic, room to grow per-service SEO pages and a
    separate commercial section later.
*   **Cons**: splits thin launch content across pages, doubles nav and
    cross-link work, and breaks the one-scroll one-bar conversion flow on a
    phone.
*   **Reason for Rejection**: Rejected by author: launch content fits one
    scroll. One page with anchor sections and a single sticky bar matches the
    single job (call or chat now). Split later when Kannada or commercial
    content grows.

### Alternative G: Contact or quote form plus chat

*   **Pros**: structured fields could capture name, area, and job type before
    first contact.
*   **Cons**: needs storage, spam defence, an inbox someone checks, and a
    reply path. The owner answers phone and WhatsApp, not email or a
    dashboard. Prefilled WhatsApp text already carries the structure.
*   **Reason for Rejection**: Rejected by author: do what the owner answers.
    Forms add a backend and a checking burden with no one to carry it.

### Alternative H: Full 33-photo gallery instead of curated 12-18

*   **Pros**: shows every job, no selection work, nothing left out.
*   **Cons**: buries strong proof under near-duplicates and low-resolution
    catalogue copies, slows load on mobile data, and reads as storage rather
    than evidence.
*   **Reason for Rejection**: Rejected by author: gallery is evidence, not
    storage. Launch keeps 12-18 strongest deduped photos with plain captions
    and adds more only when they show different work.

### Alternative I: Designed image logo or painted signboard photo instead of styled text

*   **Pros**: a drawn mark or real signboard photo carries more character than
    plain type and stands out against competitors.
*   **Cons**: logo design costs time or money. A signboard photo needs a good
    original and careful cropping to stay crisp on all screens.
*   **Reason for Rejection**: Rejected by author: styled text ships clean at
    zero asset cost and stays crisp everywhere. A signboard hero option can be
    tested later if a good photo exists. Full logo design is deferred.

--------------------------------------------------------------------------------

## Non-Functional Requirements

*   **Page weight**: first view under 1 MB on mobile data. Each gallery image
    ships compressed (target under 150 KB per tile). Each clip stays under 3
    MB; launch ships 345 KB and 671 KB. Clips load on tap only with posters.
*   **No client runtime**: zero JavaScript framework on the page. Sticky bar,
    gallery, and video use links, CSS, and native video tags only. No script
    means nothing breaks on old phones.
*   **Privacy**: no trackers, no analytics, no third-party embeds for launch.
    Outbound links (`tel:`, `wa.me`, Google Maps) leave the page by user tap
    only. Phone number is already public on JustDial; no new personal data is
    exposed.
*   **Rollout and rollback**: every Surge publish is a revision with instant
    cutover. Preview with `surge ./dist jaypainters.surge.sh --preview` before
    production. Roll back with `surge jaypainters.surge.sh rollback`.
*   **Readability on phones**: text stays readable at full sunlight contrast,
    tap targets fit thumbs, no horizontal scroll at 360 px width, layout holds
    if images or video fail to load.

--------------------------------------------------------------------------------

### Additional Resources

*   `concepts_brief.md`: brainstorm brief and intake source for this design.
*   `justdial/`: saved JustDial page (HTML, Markdown, screenshot) with
    address, hours, coordinates, categories, and catalogue photo URLs.
*   `assets/justdial/`: 7 unique JustDial photos downloaded once locally
    (jd-kx62vd78e4, jd-6xbq7mlppn, jd-8xtczhrp1n, jd-yfroy44hcv, jd-fey86713no,
    jd-a1u8iwq1w2, jd-tlvv4sb8ao). Remaining catalogue tiles behind the +11
    More control were not reachable as direct URLs; the 7 cover the visible
    set. No further JustDial fetches are needed.
*   `assets/video/` and `assets/posters/`: 2 launch clips with posters
    (ceiling painting, wood masking and polish).
*   Surge docs: `https://surge.sh/` (one-command static publish,
    `surge ./dist <domain>`, free HTTPS on `*.surge.sh`).
*   Astro docs: current line is Astro 7.4 (stable 7.4.5 as of November 2026);
    plan pins `astro@^7.4` and its image handling. Sources: [DepLog astro
    7.4.5](https://deplog.dev/package-managers/npm/astro),
    [Astro news November 2026](https://blog.mean.ceo/astro-framework-news-november-2026/).

### Future Improvements

*   **Kannada version**: fill `src/i18n/kn.ts` and publish `/kn/` when
    translations exist.
*   **Commercial section**: separate anchor or page for builders and property
    managers once project names and testimonials exist.
*   **Testimonial capture**: add client names and short quotes when the owner
    supplies them.
*   **Per-area pages**: split services by area (Ulsoor, Richmond Town, and so
    on) only if search traffic justifies it.

--------------------------------------------------------------------------------

## Detailed Implementation Plan

Single ordered list. Styling choice (mechanical, one defensible answer): plain
global CSS in `src/styles/global.css` plus scoped `<style>` blocks inside
Astro components. No CSS framework, no utility library, no client script.
Reason: one global file for type, spacing, and the sticky bar, with
per-component overrides kept next to markup. Nothing to install beyond Astro.

### Target Files to Create/Modify

#### 1. `package.json` (Create)

*   **Type / Scope**: Node project manifest.
*   **Proposed Changes**: name `jaypainters`, private true, type module.
    Scripts: `dev` runs `astro dev`, `build` runs `astro build`, `preview`
    runs `astro preview`. Dependencies: `astro@^7.4`. No UI framework, no
    analytics, no CMS packages. Why: pins the current Astro 7.4 line and keeps
    the install to one dependency so `npm install` stays fast and repeatable.

#### 2. `astro.config.mjs` (Create)

*   **Type / Scope**: Astro build config.
*   **Proposed Changes**: default static output to `dist/`, site URL set to
    `https://jaypainters.surge.sh`. Image service left at Astro default. Why:
    fixes the output folder Surge publishes and gives absolute URLs for meta
    tags and sitemap-free canonical links.

#### 3. `tsconfig.json` (Create)

*   **Type / Scope**: TypeScript config for Astro check.
*   **Proposed Changes**: extends `astro/tsconfigs/strict`, includes `src/`.
    Why: catches wrong imports and mistyped data-file keys before build.

#### 4. `src/data/site.ts` (Create)

*   **Type / Scope**: Single content data file.
*   **Proposed Changes**: exports one object with phone (`+91 97316 70742`,
    `tel:+919731670742`, `wa.me/919731670742` base), hours
    (`07:00-21:00`, display `7 AM - 9 PM`), owner name, Since year 1980,
    address text, coordinates, map URL, brand line, 5 service groups each with
    title, item list, and prefill text, gallery entries (file key plus plain
    caption), clip entries (file key, poster key, caption). Helper exports
    build encoded `wa.me` URLs and computed years from 1980. Why: every fact
    lives in one place; components import from here and never hard-code phone,
    hours, or addresses.

#### 5. `src/i18n/en.ts` (Create)

*   **Type / Scope**: English strings file.
*   **Proposed Changes**: exports all visible labels: nav anchors, hero lines,
    section titles, button text (Call, WhatsApp), hours label, address label,
    map link text, footer text, 404 text. Keys mirror section names. Why:
    separates display text from facts so a second locale can reuse the same
    keys.

#### 6. `src/i18n/kn.ts` (Create)

*   **Type / Scope**: Kannada strings stub.
*   **Proposed Changes**: same keys as `en.ts`, values empty with a comment
    marking untranslated. Why: reserves the `/kn/` contract now so filling
    translations later needs no code change.

#### 7. `src/i18n/index.ts` (Create)

*   **Type / Scope**: Locale picker.
*   **Proposed Changes**: exports a small map from locale (`en`, `kn`) to its
    strings file, plus the list of supported locales. Pages pass `en` or `kn`
    and receive strings. Why: keeps locale logic in one file instead of
    spreading conditionals through components.

#### 8. `src/layouts/Base.astro` (Create)

*   **Type / Scope**: Astro HTML shell.
*   **Proposed Changes**: props take locale, title, description. Renders head
    (charset, viewport, title, description, theme color), global stylesheet
    link, header slot, main slot, footer slot, sticky-bar slot. No client
    scripts. Why: one shell guarantees every route shares head tags, styles,
    and bar placement.

#### 9. `src/pages/index.astro` (Create)

*   **Type / Scope**: English page route at `/`.
*   **Proposed Changes**: imports `Base`, all section components, `site.ts`,
    and `en` strings. Renders Header, Hero, Services, Gallery, Clips, About,
    Contact, Footer, StickyBar in that order with anchor ids (`#services`,
    `#gallery`, `#clips`, `#about`, `#contact`). Why: defines the launch page
    order and the anchor links the sticky bar and nav use.

#### 10. `src/pages/kn/index.astro` (Create)

*   **Type / Scope**: Kannada route stub at `/kn/`.
*   **Proposed Changes**: same layout and component order as `/`, wired to
    the `kn` strings file. Since `kn.ts` values are empty, components fall
    back to `en` text with no broken output. Why: proves the locale route
    works from day one without shipping half-translated text.

#### 11. `src/components/Header.astro` (Create)

*   **Type / Scope**: Astro header component.
*   **Proposed Changes**: text logo with fixed type, letter spacing, and one
    paint mark (underline block), anchor nav (Services, Gallery, About,
    Contact), Call and WhatsApp links from `site.ts`. Why: gives every route
    the same top identity and contact entry points.

#### 12. `src/components/Hero.astro` (Create)

*   **Type / Scope**: Astro hero component.
*   **Proposed Changes**: business name, `Since 1980` plus computed years,
    area line (Bangalore, other cities on request), Call and WhatsApp buttons,
    hours beside the buttons. Why: carries the 10-second clarity goal; the
    first screen must answer who, where, since when, and how to call.

#### 13. `src/components/Services.astro` (Create)

*   **Type / Scope**: Astro services component.
*   **Proposed Changes**: renders the 5 groups from `site.ts` (home
    interiors; outside and waterproof; decorative; wood and polish; buildings
    and workplaces), each with plain item list and its own WhatsApp link with
    group prefill. Brand line renders once below the groups. Why: turns the
    raw mixed list into scannable buckets with a direct chat path per bucket.

#### 14. `src/components/Gallery.astro` (Create)

*   **Type / Scope**: Astro gallery component.
*   **Proposed Changes**: grid of the 12-18 curated photos with captions from
    `site.ts`. Uses the Astro image component with lazy loading below the
    first row. Alt text equals the caption. Why: photo proof loads fast and
    stays readable for screen readers and failed-image fallbacks.

#### 15. `src/components/Clips.astro` (Create)

*   **Type / Scope**: Astro video component.
*   **Proposed Changes**: at most 2 native `video` tags with poster, muted,
    playsinline, preload none, tap to play, no autoplay. Sources point to
    `/video/*.mp4`, posters to pipelined images. Why: motion proof without
    framework weight or surprise sound on mobile data.

#### 16. `src/components/About.astro` (Create)

*   **Type / Scope**: Astro about component.
*   **Proposed Changes**: owner name, Ulsoor base, team model (crew sent to
    sites, owner works alongside), service area, hours. Why: answers the trust
    question with facts a stranger can verify by phone.

#### 17. `src/components/Contact.astro` (Create)

*   **Type / Scope**: Astro contact component.
*   **Proposed Changes**: address text, hours, map link (address plus coords),
    Call and WhatsApp buttons. Why: repeats the conversion path at the bottom
    for visitors who scroll the whole page.

#### 18. `src/components/Footer.astro` (Create)

*   **Type / Scope**: Astro footer component.
*   **Proposed Changes**: name, Since line, small nav anchors, JustDial
    profile link, copyright year computed at build. No social or email icons.
    Why: closes the page with identity and one verifiable outside listing.

#### 19. `src/components/StickyBar.astro` (Create)

*   **Type / Scope**: Astro sticky-bar component.
*   **Proposed Changes**: fixed bottom bar on narrow screens with Call and
    WhatsApp links and short hours text. Pure links plus CSS. Why: keeps the
    conversion path visible while scrolling on phones.

#### 20. `src/styles/global.css` (Create)

*   **Type / Scope**: Global stylesheet.
*   **Proposed Changes**: type scale, spacing, colors (light background, dark
    text, one accent for Call and one for WhatsApp), responsive grid for
    services and gallery, sticky-bar rules, focus states, 360 px no-scroll
    behavior. Why: one file sets the whole look so components stay small and
    consistent.

#### 21. `src/assets/gallery/*` (Create, 12-18 files)

*   **Type / Scope**: Gallery photo sources for the Astro image pipeline.
*   **Proposed Changes**: copy the chosen files from the 16 local WhatsApp
    images and the 7 staged `assets/justdial/jd-*.jpg` files, renamed to plain
    slugs (for example `exterior-ulsoor-01.jpg`). Dedupe by eye first: keep one
    best copy per job, prefer local originals, drop blurry catalogue copies.
    Why: the pipeline needs local sources to emit sized compressed tiles;
    curated slugs keep the gallery list readable in `site.ts`.

#### 22. `src/assets/posters/*` (Create, 2 files)

*   **Type / Scope**: Video poster sources.
*   **Proposed Changes**: move the 2 posters from `assets/posters/` here so
    they pass through the image pipeline. Why: posters get the same
    compression as gallery tiles instead of shipping raw.

#### 23. `public/video/ceiling-painting-clip.mp4` and `public/video/wood-polish-clip.mp4` (Create, 2 files)

*   **Type / Scope**: Static video files.
*   **Proposed Changes**: move the 2 launch clips from `assets/video/` here
    unchanged (345 KB, 671 KB, 12 s each, muted, no audio track). Why:
    `public/` copies to `dist/` as-is; the image pipeline does not handle
    video, and these sizes already meet the budget.

#### 24. `public/404.html` (Create)

*   **Type / Scope**: Static not-found page.
*   **Proposed Changes**: plain page with a link back to `/` plus Call and
    WhatsApp buttons. Why: Surge serves this on unknown paths; it keeps a lost
    visitor one tap from contact.

#### 25. `public/CNAME` (Create at first deploy)

*   **Type / Scope**: Surge domain record.
*   **Proposed Changes**: one line with `jaypainters.surge.sh`, written by the
    first `surge` publish. Why: pins the domain so later deploys need no
    argument and CI cannot mistype it.

#### 26. `README.md` (Create)

*   **Type / Scope**: Maintainer guide.
*   **Proposed Changes**: records prerequisites (Node, npm, `npm i -g surge`),
    commands (`npm install`, `npm run build`, `surge ./dist
    jaypainters.surge.sh`), how to edit `src/data/site.ts`, how to add a
    photo (drop into `src/assets/gallery/`, add caption entry, rebuild), how
    to preview and roll back, and who maintains (bkataru). Why: the design has
    one maintainer and no CMS; the README is the handoff.

#### 27. `.gitignore` (Create)

*   **Type / Scope**: Git ignore file.
*   **Proposed Changes**: ignores `node_modules/`, `dist/`, raw WhatsApp
    originals kept outside `src/assets/` and `public/`, OS files. Why: keeps
    the public repo free of build output, heavy originals, and machine files.

#### 28. `assets/justdial/*` (Already staged, keep as source)

*   **Type / Scope**: Downloaded JustDial originals.
*   **Proposed Changes**: no further fetches. The 7 files stay as the local
    source pool; only chosen copies move to `src/assets/gallery/`. Why:
    satisfies the one-time download decision and keeps JustDial out of the
    build loop.

### Verification Plan

*   **Build**: `npm install` then `npm run build` from a clean clone. Must
    pass with no missing-image or missing-key errors. `dist/` must contain
    `index.html`, `kn/index.html`, pipelined images, `video/*.mp4`, posters,
    `404.html`.
*   **Link check**: every Call link equals `tel:+919731670742`; every
    WhatsApp link opens `wa.me/919731670742` with the section prefill
    URL-encoded; map link opens with the address and coordinates; no
    placeholder social or email links ship.
*   **Weight audit**: first view under 1 MB; each gallery tile under 150 KB;
    each clip under 3 MB (launch: 345 KB, 671 KB). Clips show posters and
    play muted on tap only.
*   **Phone check**: open on a real Android phone at 360 px width. Sticky bar
    visible, no horizontal scroll, text readable, dialer and WhatsApp open on
    tap.
*   **Locale stub check**: `/kn/` builds and renders without broken text or
    missing keys while `kn.ts` is unfilled.
*   **Deploy check**: `surge ./dist jaypainters.surge.sh --preview` shows a
    preview URL first; production cutover only after preview approval.
    Rollback command recorded in README.
*   **Static analysis**: `astro check` passes. No test framework is added;
    this page has no logic beyond links, computed years, and static rendering,
    so manual checks above replace unit tests.

*Drafted with EGM*
