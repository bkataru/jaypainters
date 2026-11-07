# Stage 7 — Critic Review (FeatureRange 1-380)

*   Target: `docs/designs/jay-painters.md`, lines 1-380
*   Lenses: egm-design (feature-spec), egm-structural (feature-spec),
    egm-style (plain-English). All fresh context.
*   Context: design doc + `concepts_brief.md`
*   Verdict: FAIL (all three lenses fail)

## Design lens — FAIL

### B1 — No Risks and Limits section at all

*   Scope: whole 1-380; NFR 328-345 and Open Questions 61-73 only touch
    risks in passing.
*   What is wrong: no dedicated section names failure modes, security
    exposure, scalability limits, and mitigations. Only happy-path CUJs are
    listed.
*   Fix: add `## Risks & Limits` before Alternatives with a table (risk,
    likelihood and impact, mitigation, owner). Minimum rows: single-phone
    outage, spam harvest, no-signal basement, stale hours and year count,
    Surge free-tier cap, JustDial rights dispute, brand-line complaint,
    image-pipeline failure on clean clone, SEO non-discovery.

### B2 — All alternatives rejected by bare author claim

*   Scope: lines 232, 243, 256, 268, 279, 291, 303, 312, 322 (every
    Alternative A-I).
*   What is wrong: each rejection reads "Rejected by author:" with no link,
    measurement, or number. Runtime weight, friction, and tracking claims
    carry no figures.
*   Fix: give each alternative one verifiable fact (bundle size, command
    count, request count, bandwidth math) and link the deciding discussion,
    or downgrade to author preference and keep the option open.

### B3 — CUJ 2 assumes search discovery the design does not build

*   Scope: lines 86-93 vs 328-345 and 349-366.
*   What is wrong: CUJ 2 starts from a search result, but no title, meta,
    canonical, Open Graph, LocalBusiness schema, sitemap, robots, or Search
    Console step is specified. A `*.surge.sh` subdomain with no indexing
    plan will not produce search arrivals.
*   Fix: either scope launch to shared-link traffic only, or add an SEO
    slice (title, meta, canonical, one LocalBusiness JSON-LD block,
    sitemap and robots, JustDial-to-site link). CUJ 2 must match.

### B4 — `/kn/` stub ships broken or duplicate content

*   Scope: lines 112-122.
*   What is wrong: line 116-117 says `/kn/` ships the same English text;
    lines 118-119 say `kn.ts` holds empty values. Both cannot be true.
    Empty values render blank, copied English renders duplicate content.
*   Fix: do not ship `/kn/` at launch. Keep `en.ts` plus the key list and
    a build-time assertion excluding the route until translations land.
    Remove `kn/index.html` from the diagram.

### B5 — Gallery and brand line proceed while rights questions are open

*   Scope: lines 63-68 vs 42-43, 146-150, 164-174.
*   What is wrong: the plan bakes in 12-18 photos of unclear ownership and
    a brand line with possible trademark questions, then defers both to
    open questions.
*   Fix: gate the gallery list on a rights table (local vs JustDial,
    keep or drop, source) and gate the brand line on the certificate
    answer. Do not start build until both close.

### B6 — Goals untestable, success unmeasurable by design

*   Scope: lines 33-49 plus 336-339 (no trackers).
*   What is wrong: "understands in 10 seconds", "read fast", and "laid out
    so Kannada can be added later" have no pass criteria, and the analytics
    ban removes even countable proxies.
*   Fix: define 3-4 launch checks needing no tracking: weekly WhatsApp lead
    count from the owner, build-time weight budget check, dead-link check,
    one in-person 10-second test with 5 strangers. State them in Goals
    with numbers.

### B7 — Single-phone path has no failure-mode analysis

*   Scope: lines 37-39, 179-190, CUJs 1-3.
*   What is wrong: the whole conversion job is one handset. Buttons stay
    live 24 hours while hours say 07:00-21:00. Busy owner, no-signal
    basement, lost phone, and spam surge are never addressed.
*   Fix: specify an after-hours label, WhatsApp-as-fallback ordering, spam
    handling, and the accepted loss (missed calls in work hours). Measure
    by owner report.

### Design majors M1-M6

*   M1 stale-content rot: computed years go stale until rebuild; owner
    cannot publish. Fix: yearly rebuild rule, `lastVerified` date in
    `site.ts`, README documents who runs the commands.
*   M2 weight budget contradicts gallery math: first view under 1 MB vs
    12-18 tiles at 150 KB. Fix: define hero budget, per-tile cap with
    widths, lazy boundary, build-time byte check.
*   M3 Surge assumed free and reversible without quota evidence. Fix:
    record free limits checked on date, traffic vs limits, exact commands
    from `surge --help`, revisit trigger.
*   M4 map link underspecified, fallback weak. Fix: pick one canonical
    Maps URL form, record in `site.ts`, specify offline fallback text.
*   M5 phone exposure waved away: button-gated JustDial number vs cleartext
    `tel:` and `wa.me` plus git history differ. Fix: state the trade-off,
    document spam handling, never add email.
*   M6 JustDial coexistence missing. Fix: one paragraph (site never links
    to JustDial; maintainer adds site URL to the listing; reviews stay
    off-site until testimonials exist).

### Design nits N1-N5

*   N1 i18n contradiction in adjacent bullets (fix by deleting one).
*   N2 CNAME contents, path, and command interaction need one line.
*   N3 verify `public/404.html` is served on Surge for unknown paths.
*   N4 pin Astro from the official changelog only; drop mirror links.
*   N5 specify timezone-independent calendar-year math for the year count.

## Structural lens — FAIL

### S-Blocker 1 — Appendix sections nested under NFR

*   Scope: lines 328-378; `### Additional Resources` and
    `### Future Improvements` sit as H3 under `## Non-Functional
    Requirements`.
*   What is wrong: they are not NFR subsections. Appendix material
    masquerades as requirements and breaks the heading hierarchy.
*   Fix: promote both to H2 after NFR, or move them out of FeatureRange
    into an appendix after the implementation plan.

### S-Blocker 2 — Broken relative cross-references

*   Scope: lines 351-360 (`concepts_brief.md`, `justdial/`,
    `assets/justdial/`, `assets/video/`, `assets/posters/`).
*   What is wrong: none resolve from `docs/designs/`. All live at repo
    root. Bare relative paths are broken from this file's directory.
*   Fix: rewrite as `../../concepts_brief.md`, `../../justdial/`,
    `../../assets/justdial/`, `../../assets/video/`,
    `../../assets/posters/`.

### S-Blocker 3 — Build runbook inside feature scope

*   Scope: lines 162-176, 192-202, 340-342.
*   What is wrong: exact deploy commands, CNAME mechanics, 404 path,
    pipeline-failure behavior, and preview and rollback flags live in
    FeatureRange. Rollback appears twice.
*   Fix: keep one-line intent in FeatureRange. Move commands, CNAME, 404
    path, failure behavior, and flags to the implementation plan.

### S-Majors 4-9

*   S4 H2 names drift from the template (`The Problem`, `Critical User
    Journeys (CUJs)`, `Technical Plan (Architecture)`, `Alternatives
    Considered`, `Non-Functional Requirements`). Fix: use exact template
    names.
*   S5 author-choice labels out of order (3A before 1A and 2B) with no
    defined list. Fix: renumber in document order or reference the brief
    by number.
*   S6 every rejection uses bare "Rejected by author:" with no link or
    date. Fix: change to a decision line with technical reason, owner
    bkataru, and date or link.
*   S7 open questions name no owner and no due date. Fix: append owner and
    due stage to each bullet.
*   S8 malformed Markdown: split code span at lines 194-195, split links
    at 364-366. Fix: keep each span and link on one line.
*   S9 inconsistent terms: hours in three forms, `wa.me` vs full URL,
    phone display vs `tel:`, `Since-1980` vs `Since 1980`, `Surge.sh` vs
    `Surge`. Fix: fix one canonical form and use everywhere.

### S-Nits 10-12

*   S10 bullet style `*   ` and 80-dash HRs. Fix: normalize to `* ` or
    `- `, keep at most one HR style or delete separators.
*   S11 unit drift (`12-18`, `480 wide`, `under 3 MB`). Fix: `12-18`,
    `480 px wide`, `3 MB or less per clip` consistently.
*   S12 ASCII diagram uncaptioned with term drift. Fix: add caption and
    align labels to `Surge.sh`.

## Style lens — FAIL (wording pass only)

*   No blockers. No promotional adjective class, no decorative adverbs, no
    validating adjectives, no apologies found.
*   Majors: vague `read fast`, `plain`, `real and light`, `deduped`,
    `enough reason`, `within seconds`, `load fast`, `strong` and
    `strongest`. Each needs the concrete rewrite in the reviewer output
    (short lines, one-line captions, named job types, cited budgets,
    one-per-job rule).
*   Nits: filler `plain` (7 uses), `clean`, `cleaner`, `fastest`, `lean`,
    `reads flatter`, `more character`, `good`, `crisp`, `ships clean`,
    `full sunlight contrast`, `fit thumbs`, `paint mark`, plus config
    terms without values. Each needs the quoted rewrite.
*   Full quoted rewrites: see the Stage 7 style agent transcript at
    `history://Stage7Style`.
