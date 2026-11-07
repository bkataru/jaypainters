# Stage 6 — Comprehension Test

*   Target: `docs/designs/jay-painters.md`
*   FeatureRange: 1-380. DetailedRange: 381-End.
*   Reviewer: egm-comprehension (fresh context, document alone, no standard)
*   Note: no GoldfishContext per skill rule for Stage 6.

## What the Feature Spec (FeatureRange) says the page will do for a visitor

Jay Painters is a painting business in Ulsoor, Bangalore, run by Anthony
Jayasheelan since 1980, with no website. The document proposes one static
English page built with Astro and hosted on Surge.sh, with no forms, prices,
booking, or backend. For a visitor, the page shows who the business is, five
plain service groups, 12-18 photos with captions plus up to 2 short muted
clips, and address, hours, and owner name. From every section on a phone the
visitor can tap to open the phone dialer or a WhatsApp chat to the owner, or
open a map link, without typing.

## What the Implementation Plan (DetailedRange) says the builder must create

The builder must create a new Astro project with about 28 files: project
manifest, build config, TypeScript config, one facts file, two language
string files plus a picker, one page shell, two routes, nine content
components, one global stylesheet, curated photo and poster sources, two
video files, a not-found page, a domain file, a README, and ignore rules.
Styling is plain global CSS plus per-component styles, with no CSS framework
and no client script. The builder must then verify with a clean build, link
check, weight audit, phone check, language-stub check, preview deploy, and a
static check, with no automated tests.

## Findings

### 1. Blocker — Open questions block the build

*   Scope: JustDial photo reuse, brand line wording, map link form, Surge
    domain reservation.
*   What is wrong: the feature part leaves four decisions open but the build
    part tells the builder to copy specific photos, render one brand line,
    build one map URL, and publish to one domain. A reader with only this
    document cannot resolve which photos are allowed, what brand words to
    use, whether the map link uses address or coordinates, what shows if
    maps is blocked, or whether the domain is free.
*   Fix: answer all four in the document before the build starts.

### 2. Blocker — Photo counts do not line up

*   Scope: gallery sources, counts of 17, 16, and 7 photos.
*   What is wrong: Open Questions says 17 catalogue photos and 16 local
    images. Additional Resources says 7 unique JustDial photos were
    downloaded and cover the visible set. The build step says copy from 16
    local images and 7 staged files. A reader with no project history cannot
    tell how many source photos exist, which set is complete, or what the
    side-by-side check should compare.
*   Fix: state one source pool (16 local plus 7 staged, with the reason 17
    vs 7 differ) and name what the dedupe check compares.

### 3. Major — Author-choice labels point nowhere

*   Scope: routes and languages "author choice 3A", content source "author
    choice 1A", images and video "author choice 2B".
*   What is wrong: these labels refer to choices made elsewhere but the
    document never defines what 3A, 1A, or 2B were, what alternatives they
    beat, or where the choice list lives. A fresh reader cannot tell if
    something was omitted or why these labels matter.
*   Fix: drop the labels or add one line each naming the picked option and
    where the rejected options live.

### 4. Major — Kannada fallback mechanism missing

*   Scope: `src/i18n/kn.ts` empty values with fallback to English.
*   What is wrong: the plan says the Kannada file ships with empty values
    and components fall back to English with no broken output, but never
    explains how. A reader cannot tell if the component checks for empty
    strings, if the picker merges the two files, or if empty output is
    simply accepted.
*   Fix: describe the fallback in one paragraph or cut the stub route.

### 5. Major — Image pipeline underspecified

*   Scope: Astro image pipeline.
*   What is wrong: the document says photos and posters pass through the
    pipeline which writes sized compressed files, and that the build stops
    if image tools are missing. It never states what sizes are emitted, what
    compressed means, what tools must be installed, or what error the
    builder will see.
*   Fix: name output sizes, quality target, required tools, and the failure
    message to expect.

### 6. Major — JustDial never defined

*   Scope: JustDial.
*   What is wrong: the document assumes the reader knows what JustDial is,
    what a catalogue is on it, what hiding a number behind a button means,
    and what the +11 More control is. No definition or link is given.
*   Fix: add two sentences explaining JustDial as a listings site and what
    the catalogue and photo controls are.

### 7. Major — Surge deploy steps assume prior knowledge

*   Scope: Surge.sh deploy and rollback (revisions, preview flag, CNAME,
    404 handling).
*   What is wrong: the plan says every publish is a revision with instant
    cutover, preview with a preview flag, rollback with a rollback command,
    domain pinned by a CNAME file written by the first publish, and a plain
    404 page served on unknown paths. It does not explain what a Surge
    revision is, where the preview URL comes from, who writes the CNAME
    file and when, or how Surge finds `404.html`.
*   Fix: add the missing how-to lines or point to the exact Surge doc pages.

### 8. Major — Link text and map URL not listed

*   Scope: contact links (`tel:`, `wa.me` with encoded prefill, map URL).
*   What is wrong: the document gives the phone number and link shapes but
    never lists the actual short prefilled English text per section, the
    exact map URL format, or how encoding at build time works.
*   Fix: list each prefill string and the map URL template verbatim.

### 9. Major — Curation rules leave content to judgment

*   Scope: gallery and clips curation rules.
*   What is wrong: keep 12-18 deduped photos, keep one best copy per job,
    prefer local originals, drop blurry copies, plain captions naming the
    job type, and plain item lists leave file names, captions, service
    items, and brand line to the builder's judgment. Two builders would ship
    different content and both could claim they followed the plan.
*   Fix: lock the file list, captions, service items, and brand line in the
    document.

### 10. Nit — Style and video terms lack values

*   Scope: header paint mark, theme color, 360 px layout, muted playsinline
    preload none.
*   What is wrong: fixed type with letter spacing and one paint mark as
    underline block, theme color, tap targets fit thumbs, no horizontal
    scroll at 360 px width, and video attributes such as playsinline and
    preload none are named without values or plain-language definitions.
*   Fix: give each term a value or one-line definition.

### 11. Nit — Build config checks lack examples

*   Scope: site URL, canonical links, `astro check`, strict TS config.
*   What is wrong: the plan says set the site URL for absolute meta tags
    and sitemap-free canonical links, extend a strict config, and run a
    static check, without showing an example URL output or what the check
    covers.
*   Fix: show one example output and what the check covers.
