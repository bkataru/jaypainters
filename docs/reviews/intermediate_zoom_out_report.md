# Stage 8 — Intermediate Zoom Out

*   Target: `docs/designs/jay-painters.md` (703 lines, full file)
*   Prior: `zoom_out_report.md` (Stage 5 FAIL)
*   Reviewer: egm-zoom-out (fresh context)
*   Context: design doc + `concepts_brief.md`
*   Verdict: FAIL

## Summary

Stage 7 resolution fixed the prose but left the build plan behind. The
document now contradicts itself: prose says no `/kn/` route ships, the plan
builds it; prose says the image pipeline is a fallback, the plan mandates
it; the domain question was added but nothing was unpinned. Gallery slugs
are still unlocked. Map form, second clip, success signal, and brand-gate
process are resolved and hold.

## Blockers (still open)

### B1 — `/kn/` stub still ships, contradicting its own non-goal

*   Location: Goals, Non-Goals, Routes vs plan items 5-7 and 10,
    verification checks.
*   What is wrong: prose says reserved by name only with no route, but the
    plan still ships `en.ts`, `kn.ts` with empty values, the picker, and
    `kn/index.astro`, and verification still requires `kn/index.html`.
*   Fix: delete the four build items and the two verification checks. Keep
    one intent line. Add the route only when translations exist.

### B2 — Gallery pick list still deferred to build time

*   Location: Open Questions, Goals, plan item 21, verification.
*   What is wrong: the gate rule and source inventory are good, but the
    12–18 slugs plus captions are still not locked. Item 21 still says
    dedupe by eye during implementation.
*   Fix: lock the slug list plus one-line captions in `site.ts` or an
    appendix table before implementation. The open question then closes to
    a yes or no rights check.

## Majors

### M1 — Plan still at file-build altitude

*   Location: implementation plan, 28 items.
*   What is wrong: still pins scripts, extends, CNAME one-liner, ignore
    entries, per-component props. Resolution added detail without lifting
    altitude.
*   Fix: collapse to about 5 slices (shell plus data file, sections,
    assets, build and deploy, README). Mark filenames non-binding.

### M2 — Pipeline contradiction: prose fallback, plan mandate

*   Location: Technical Plan and Images vs plan items 21-22, Gallery
    component, verification.
*   What is wrong: prose says compressed files with width, height, and
    lazy loading; the plan still requires pipeline sources and pipelined
    output. Both cannot be true.
*   Fix: make the plan match the prose. Launch uses compressed files in
    `public/`; pipeline only if the weight audit fails.

### M3 — String sources grew to four for one language

*   Location: content source plus plan items 4-7.
*   What is wrong: `site.ts` plus `en.ts` plus picker plus `kn.ts` stub
    means up to four files to change one sentence, one language shipping.
*   Fix: one source for launch (`site.ts` alone). Split only when Kannada
    is funded.

### M4 — Domain still hardcoded, backup missing

*   Location: open question vs config, CNAME item, README, diagram,
    verification.
*   What is wrong: the reservation question was added but the name stays
    baked into config, docs, and commands with no backup recorded.
*   Fix: check the name now, record one backup, make the site URL a single
    variable, move CNAME to README notes.

### M5 — Brand line process resolved, content pending

*   Status: acceptable. The certificate check gates the Services build with
    a neutral fallback. Ask the owner, ship one line, close the item. No
    design change needed.

### M6 (new) — Canonical-link fragment contradicts no-SEO scope

*   Location: config item vs Goals and Non-Goals.
*   What is wrong: the config requires canonical-link machinery for an
    explicitly out-of-scope slice.
*   Fix: delete the canonical-link requirement. The site URL exists only
    if config needs it, stated once.

## Nits

*   N1 map form, N2 second clip, N4 success signal: resolved, hold.
*   N3 small surface mostly open: 404 still duplicates the bar (link to
    `/` only); `astro check` still gates (make advisory); footer JustDial
    link still lacks the link-only note; year math correctly specified.
*   N5 (new) toolchain over-pin: patch-level Astro pin plus dated
    third-party links rot fast. Fix: "Astro 7.x current at build; record
    exact version in README."
*   N6 (new) code-altitude weeds: January-1 boundary detail and
    per-component prop lists. Fix: one-line year rule, trim props to
    inputs and outputs.

## Holds from Stage 6-7

Dated author rejections on alternatives A-I, deferred future items, NFR
budgets, after-hours plus missed-call plus spam handling, accepted
single-phone risk with owner-report counting. None of this is speculative.
