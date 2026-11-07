# Stage 5 — Initial Zoom Out Review

*   Target: `docs/designs/jay-painters.md` (644 lines, full file)
*   Standard: Zoom Out Standard (Core Principle + sections 0-4)
*   Context: design doc + `concepts_brief.md`; Astro news URL left out
*   Reviewer: egm-zoom-out (fresh context)
*   Verdict: FAIL

## Summary

Root fit is right: one static page, call and WhatsApp only, no forms, no
backend. Overview, Problem, Goals, Non-Goals, and CUJs agree on the job. The
review fails on speculative launch scope (empty second-language route),
prescribing 28 files at build altitude while gallery, brand, and domain inputs
are still open, and tooling weight the page does not need.

Standard check: section 0 passes (objective clear), section 1 mostly passes,
section 2 fails on speculative scope, section 3 fails on altitude, section 4
passes on Astro and Surge choice but flags hardcoded deploy config.

## Blockers

### B1 — Dead `/kn/` route ships at launch

*   Location: lines 112-122, 436-450, 469-475, 623, 635-636.
*   What is wrong: `kn.ts` ships with same keys and empty values,
    `kn/index.astro` ships day one, fallback to English undefined. Non-Goal
    line 55 says no Kannada for launch, yet `dist/` must contain
    `kn/index.html`.
*   Why it matters: speculative feature with no consumer. Doubles route
    verification, risks indexed empty or duplicate-English pages, undefined
    fallback is a dead end.
*   Fix: cut `/kn/`, `kn.ts`, `i18n/index.ts`, `kn/index.astro`, and the
    `kn/index.html` checks from launch. Keep the intent line only. Add the
    route when translations exist.

### B2 — Gallery list undecided

*   Location: lines 63-65, 555-563, 151-152.
*   What is wrong: 16 local vs 17 JustDial (7 staged) overlap, rights unclear,
    eye-dedupe not done, but the plan assumes 12-18 slugs and proceeds to
    grid, captions, and pipeline.
*   Why it matters: proof is the trust mechanism in CUJ 3. Building without
    the pick list means rework or shipping duplicates, blurry, or
    wrong-rights tiles.
*   Fix: before implementation, lock the 12-18 slugs plus captions in
    `site.ts`. Rule if JustDial rights unclear: locals only. Close the open
    question.

## Majors

### M1 — Implementation plan at file-build altitude

*   Location: lines 381-618, 28 items.
*   What is wrong: pins `package.json` scripts, `tsconfig` extends, CNAME
    one-liner, `.gitignore` OS entries, per-component props.
*   Why it matters: high-level plan covers helper-level detail instead of
    architecture, interfaces, and data flow. Locks the builder, rots on
    contact with code.
*   Fix: collapse to slices (shell plus data file, sections, assets,
    build and deploy, README). Mark filenames non-binding. Keep styling to
    one constraint: plain CSS, 360 px no-scroll, thumb targets, sunlight
    contrast.

### M2 — Image pipeline as launch requirement

*   Location: lines 162-177, 502-508.
*   What is wrong: requires local sources plus Astro pipeline to emit tiles;
    the draft calls build-stops-on-missing-tools intended. Local JPEGs on
    disk are 40-164 KB, most already under the 150 KB tile target.
*   Why it matters: extra install plus fresh-machine failure mode for a
    one-maintainer page whose budget is met by plain files.
*   Fix: launch with compressed files in `public/` plus width, height, and
    lazy loading. Keep the pipeline as fallback if the first-view audit
    fails. Remove build-stops as a feature.

### M3 — Two string sources for one language

*   Location: lines 124-135, 427-450.
*   What is wrong: facts plus prefill in `site.ts`, labels in `en.ts`,
    picker in `index.ts`; three files to change one sentence, one language
    shipping.
*   Why it matters: indirection with no second consumer.
*   Fix: one source for launch (`site.ts` alone). Split to `en` and `kn`
    only when Kannada is funded.

### M4 — Domain and site URL hardcoded before checking

*   Location: lines 72-73, 194-196, 403-406, 587-592.
*   What is wrong: `jaypainters.surge.sh`, absolute site URL, and CNAME baked
    into config and README while availability is still an open question.
*   Why it matters: one unverified assumption breaks config, docs, and deploy
    commands.
*   Fix: check the name now, record one backup, make the site URL a single
    variable, move CNAME to README deploy notes.

### M5 — Brand line unresolved

*   Location: lines 66-68, 417-425.
*   What is wrong: "works with Asian Paints" vs "handled brands" depends on
    a dealer certificate not yet asked for.
*   Why it matters: same class as the fixed 47-year error; small line, large
    trust cost on a trade page.
*   Fix: ask the owner one question, ship one factual line, drop the item.

## Nits

### N1 — Map form already decided

*   Location: lines 69-71 vs 188-190.
*   What is wrong: Contact already says one Google Maps URL from address plus
    coordinates, address text left for copy. The open question repeats it.
*   Fix: delete the open question.

### N2 — Second clip

*   Location: lines 42-43, 170-172, 572-578.
*   What is wrong: both clips fit (345 KB plus 671 KB, posters, tap-to-play,
    no preload). Not a blocker.
*   Fix: change "at most 2" to "1-2, drop-first if weight slips" so one clip
    can carry launch.

### N3 — Small surface to trim

*   Location: lines 197-198 and 580-585, 408-412 and 640-642, 132-133,
    535-537.
*   What is wrong: 404 with Call and WhatsApp duplicates the bar; `astro
    check` and strict config must not gate a link-only page; computed year
    count is cheap but optional; footer JustDial link points at the
    competitor-mixing page cited in the Problem.
*   Fix: 404 links to `/` only; keep `astro check` advisory; keep computed
    count only if written; note the JustDial link is link-only with no
    rating import.

### N4 — No success signal

*   Location: lines 33-49, 333-339.
*   What is wrong: no analytics is right, but then the measure is missing.
*   Fix: state the measure as owner-reported calls and WhatsApp chats per
    week. Otherwise Goals cannot be checked.
