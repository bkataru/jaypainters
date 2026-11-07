# Stage 9 — Implementation Readiness Test (DetailedRange 440-703)

*   Target: `docs/designs/jay-painters.md`, lines 440-703
*   Lenses: egm-implementation-readiness, egm-codebase-details (both on the
    implementation-readiness standard), egm-style (plain-English bar). All
    fresh context.
*   Context: design doc + `concepts_brief.md`
*   Verdict: FAIL (all three lenses fail)

## Readiness lens — FAIL

15 blockers, 6 majors, 4 nits. The range is not executable on first
attempt. The implementer must invent content, schema, styles, URLs, file
lists, and phasing, and must resolve direct contradictions with the
feature range.

### Blockers B1-B15

*   B1 `/kn/` ships vs reserved-only: items 6, 7, 10 build the route the
    feature range forbids. Fix: delete one side.
*   B2 content split vs single-file lock: feature range says all strings
    in `site.ts`; plan splits facts from `en.ts` with no key list. Fix:
    pick one and document the keys.
*   B3 pipeline required vs fallback-only: feature range says compressed
    files with pipeline as fallback; plan mandates the pipeline. Fix: lock
    one path with explicit rules.
*   B4 gallery list, slugs, captions unlocked; rights gate open. Fix:
    append a source-to-slug-to-caption-to-rights table, 12–18 rows.
*   B5 service groups, items, prefills, brand line missing. Fix: list 5
    groups with exact title, items, raw and encoded prefill, plus the
    brand sentence or its fallback.
*   B6 global CSS has no values. Fix: specify font, sizes, hex codes,
    tokens, breakpoints, focus style, sticky-bar height.
*   B7 contact URLs not specified: no canonical `wa.me` base, no encoded
    examples, no map URL format, no exact hours label. Fix: define every
    literal plus one worked encoding example in the `site.ts` spec.
*   B8 i18n schema and empty-`kn` fallback undefined. Fix: list the export
    shape with all keys and values, define the fallback, or remove the
    stub per B1.
*   B9 no phasing; single ordered list is not buildable incrementally.
    Fix: split into 3 phases with entry and exit checks (skeleton plus
    conversion, services plus proof, hardening plus handoff).
*   B10 footer JustDial link contradicts the never-link rule, and no URL
    is given. Fix: remove the link or amend the rule with the exact URL.
*   B11 meta and canonical vs no-SEO slice. Fix: either keep no-SEO
    (charset, viewport, title only) or authorize the slice with exact
    strings per route.
*   B12 tap-to-play with zero client script underspecified: no `controls`
    attribute, no poster wiring. Fix: specify the exact `video` tag or
    authorize a minimal script.
*   B13 domain, rollback, quota not locked; deploy not executable. Fix:
    record check date plus result, one backup domain, exact preview,
    production, and rollback commands, quota numbers.
*   B14 byte-budget fail-the-build not implemented: no script, tool, or
    measurement point. Fix: add the check script path, thresholds, and
    failure output, or downgrade to a manual checklist.
*   B15 after-hours label logic vs static page: no exact string per slot,
    no switching rule. Fix: lock one static label, state no
    time-switching.

### Majors M1-M6

*   M1 Base layout props and slots incomplete. Fix: give frontmatter
    types plus the slot skeleton.
*   M2 `site.ts` helpers plus freshness warning missing. Fix: specify
    exports, signatures, year math, `lastVerified`, warning location.
*   M3 asset source paths ambiguous (WhatsApp folder, poster and clip
    filenames unmapped). Fix: list absolute source plus dest paths and
    byte sizes.
*   M4 404, CNAME, `.gitignore`, README lack exact content. Fix: paste
    the 404 copy, CNAME bytes, ignore lines, README command block.
*   M5 toolchain gaps for `astro check` (missing devDeps, no check
    script). Fix: pin deps, add the script, verify the extend path.
*   M6 verification plan is manual-only with no edge cases. Fix: per-check
    command plus expected output plus an edge-case matrix.

### Nits N1-N4

Literal drift (hours, phone, `wa.me`, Since 1980, clip naming), CNAME
timing unclear, image-service line meaningless until B3 resolves, header
mark term drift. Fix each to one canonical form.

## Codebase lens — FAIL

Verified on disk: no `src/`, no `package.json` (expected, all items say
Create). `assets/justdial/` holds 7 files, `assets/video/` 2 clips,
`assets/posters/` 2 files, 16 WhatsApp images plus 2 videos in root,
`justdial/` dumps exist. Clip probes match the plan (352,710 B and
686,909 B, 12.03 s, 480x864, video-only). Astro 7.4 line verified.
Surge `404.html`, preview, cutover, rollback, and CNAME behavior verified
against current Surge docs.

### Blockers B1-B5

*   B1 `/kn/` contradiction: plan builds what normative sections forbid.
    Fix: delete the build items or promote the route everywhere with the
    fallback spelled out.
*   B2 pipeline contradiction: plan mandates what the feature range calls
    a fallback. Fix: pick one launch path with explicit rules.
*   B3 `astro check` cannot pass on the specified install: one-dependency
    manifest lacks `@astrojs/check` plus `typescript`. Fix: add both with
    pins and a check script, or drop the gate.
*   B4 `site.ts` has keys with no values: 5 prefills, 12–18 captions, 2
    clip captions, full map URL, brand sentence, JustDial URL, head
    strings, service items, `lastVerified` are all missing. Fix: append
    an appendix table with every literal.
*   B5 CNAME account is false: Surge writes `dist/CNAME` on publish;
    `public/CNAME` is a committed source file, and guidance is to pass
    the domain explicitly every time. No backup domain recorded. Fix:
    rewrite the item, keep explicit domain args, record the check plus
    one backup.

### Majors M1-M6

*   M1 WhatsApp source path unspecified; ignore pattern missing for 60 MB
    in root. Fix: state the exact glob, slug mapping, literal ignore
    lines, and whether root originals move or delete after curation.
*   M2 poster identities and URL wiring absent. Fix: list both filenames,
    source-to-dest mapping, and the exact `poster=` expression.
*   M3 no enforcement for weight budget or `lastVerified`. Fix: give the
    exact mechanism or downgrade to a manual checklist.
*   M4 deploy and rollback incomplete; quotas absent. Preview syntax is
    valid but omits the token form and the revision-id promotion step.
    Fix: add the literal preview-to-cutover-to-rollback sequence plus
    quotas or remove the claim.
*   M5 visual and head tokens have no values, and head meta contradicts
    the no-SEO non-goal. Fix: token table plus head literals, reconciled
    with scope.
*   M6 toolchain unpinned; reuse miss on staged `justdial/` and brief
    evidence. Fix: pin Node 18+, npm, TS range; add a harvest step naming
    exact sources and fields.

### Nits

Byte-exact clip sizes, muted-vs-video-only wording, tokenised Surge form
with revision-id cutover.

## Style lens — FAIL (wording pass)

*   No blockers. 9 majors, 5 nits.
*   Majors: `guarantees`, `proves` plus `from day one`, `scannable
    buckets` plus `chat path`, `photo proof` plus `loads fast`, `motion
    proof` plus `framework weight` plus `surprise sound`, `trust
    question`, `conversion path` (2 uses), pipeline, tiles, and slug
    jargon, `cutover` hiding the approver. Each has a quoted rewrite in
    the agent output.
*   Nits: `mechanical` plus `one defensible answer` filler,
    `sitemap-free canonical links` wordiness, `best` and `blurry` hiding
    the decider, unexplained `CI`, `build loop` filler. Each has a quoted
    rewrite.
*   Full quoted rewrites: see the Stage 9 style transcript at
    `history://Stage9Style`.
