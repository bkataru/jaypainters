# Stage 9 Resolution — goldfish_review_report_stage9.md

*   Target: `docs/designs/jay-painters.md`, DetailedRange 440-703
*   Source: `implementation_readiness_report.md` (readiness B1-B15 + M1-M6 +
    N1-N4, codebase B1-B5 + M1-M6, style 9 majors + 5 nits)
*   Mode: PROPOSE FIX vs CONTEST per finding, then apply approved edits

## PROPOSE FIX (20 groups)

*   R-B1 + C-B1 `/kn/` contradiction: delete items 5, 6, 7, 10 and the
    `kn/index.html` plus locale-stub verification checks. Single English
    route only; `/kn/` stays a reserved name in prose.
*   R-B2 + R-B8 content split: single `site.ts` owns all strings. Delete
    `en.ts`, `kn.ts`, picker. Document the full key table with every
    literal value in item 4.
*   R-B3 + C-B2 pipeline: launch uses compressed files in `public/` with
    explicit width, height, and loading rules. Rewrite items 14, 21, 22.
    Pipeline is a named fallback only.
*   R-B4 gallery locks: appendix table with 12–18 rows (source path,
    dest slug, caption, rights status). Applied with the locals-only gate
    rule; exact picks need the side-by-side check, so the table ships with
    the rule plus the source inventory and the builder fills rows before
    Phase 2.
*   R-B5 services + brand: item 4 lists 5 groups with exact titles and
    prefill raw text plus the encoding rule; brand line locked to the
    neutral fallback until the certificate answer lands.
*   R-B6 + C-M5 styles and head: token table (font stack, sizes, hex
    codes, breakpoints, focus, sticky height) plus head literals. No-SEO
    scope kept: charset, viewport, title only.
*   R-B7 contact URLs: canonical literals plus `waLink` helper signature
    plus one worked encoding example plus exact map URL plus exact hours
    labels.
*   R-B9 phasing: 3 phases with entry and exit checks replace the single
    list.
*   R-B10 + R-B11 JustDial footer + meta scope: footer drops the JustDial
    link; Base renders charset, viewport, title only.
*   R-B12 video tag: exact `video` tag specified with controls, muted,
    playsinline, preload none, poster paths.
*   R-B13 + R-B14 + C-M3 + C-M4 deploy, rollback, quota, budget: domain
    check plus backup recorded; literal preview, cutover, rollback, revs,
    status sequence; weight-check script specified; `lastVerified`
    warning specified.
*   R-B15 hours label: one static string in all three slots, no
    time-switching.
*   R-M1 + R-M2 Base slots + site helpers: frontmatter types, slot names,
    helper signatures, year math, `lastVerified` wiring.
*   R-M3 + C-M1 + C-M2 asset paths: absolute source paths, dest paths,
    byte sizes, poster filenames, ignore decision (root originals move to
    `assets/originals/` after curation, then ignored).
*   R-M4 404 + CNAME + gitignore + README: exact 404 copy, CNAME bytes and
    timing, literal ignore lines, README command block.
*   R-M5 + C-B3 toolchain: add `typescript` + `@astrojs/check` pins, add
    `check` script, verify extend path; otherwise `astro check` becomes
    advisory.
*   R-M6 verification: per-check command plus expected output plus an
    edge-case matrix.
*   C-B4 values appendix: every literal (prefills, captions, map URL,
    brand fallback, head strings, theme hex, `lastVerified`) in one
    table.
*   C-B5 CNAME truth: rewritten as committed source file; CLI always
    passes the domain explicitly.
*   C-M6 pins + harvest: Node 18+, npm, TS range pinned; harvest step
    from `justdial/` + brief names exact fields.
*   Style 9 majors + 5 nits: all quoted rewrites applied.

## CONTEST (2)

*   R-N4 + C header-mark wording: CONTEST removal of the mark concept.
    Keep one term (`CSS shape`) with the rule location in `global.css`.
    Fix applied as canonicalization, not deletion.
*   C-M4 quota numbers: CONTEST blocking on live quota fetch. Surge free
    quotas are checked at first deploy and recorded with date in the
    README; the plan states the check step instead of inventing numbers.
    Fix applied as a check step, not fabricated limits.
