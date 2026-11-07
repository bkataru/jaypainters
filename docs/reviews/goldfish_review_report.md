# Stage 7 Resolution — goldfish_review_report.md

*   Target: `docs/designs/jay-painters.md`, FeatureRange 1-380
*   Source: `critic_report.md` (design B1-B7 + M1-M6 + N1-N5, structural
    S1-S12, style majors 1-5 + nits 6-13)
*   Mode: PROPOSE FIX vs CONTEST per finding, then apply approved edits

## PROPOSE FIX (26)

*   B1 Risks section: add `## Risks & Limits` before Alternatives with 9
    rows (single-phone outage, spam harvest, no-signal basement, stale
    content, Surge cap, JustDial rights, brand complaint, pipeline failure,
    SEO non-discovery). Each row names likelihood, impact, mitigation,
    owner.
*   B3 CUJ 2 discovery: scope launch to shared-link traffic only. Rewrite
    CUJ 2 Given to open from a shared WhatsApp or JustDial link, not
    search. Add explicit non-goal line that launch has no SEO slice.
*   B4 `/kn/` stub: cut the route from launch. Routes section keeps `/`
    plus reserved intent only. Diagram drops `kn/index.html`. Future
    Improvements keeps the Kannada item as the re-entry point.
*   B5 rights gates: Open Questions gain owner and due-stage lines, and
    the gallery and brand bullets name the gate rule (locals-only fallback
    for photos, handled-brands wording unless a certificate exists).
*   B6 measurable goals: Goals gain pass criteria and a no-tracker
    measurement list (owner-reported chats per week, byte budget check,
    dead-link check, 5-stranger 10-second test).
*   B7 single-phone failures: Contact section gains after-hours label,
    WhatsApp-fallback ordering, spam acceptance, and accepted missed-call
    loss measured by owner report.
*   M1 freshness: `site.ts` gains `lastVerified`, footer renders it, README
    rule requires yearly rebuild. NFR gains the freshness line.
*   M2 weight math: NFR weight bullet defines hero budget, per-tile cap,
    lazy boundary, LCP rule, and build-time byte check.
*   M3 Surge evidence: NFR rollout keeps one criterion line; exact
    commands, quotas checked on date, and revisit trigger move to the
    implementation plan (structural S-Blocker 3 alignment).
*   M4 map form: pick the canonical form now (address-text search URL with
    coordinates in `site.ts` as backup), close the open question, specify
    landmark fallback text.
*   M5 phone exposure: rewrite the privacy bullet to state the scraper
    trade-off honestly with spam handling, no email.
*   M6 JustDial coexistence: add one paragraph (site never links to
    JustDial; maintainer adds site URL to the listing; reviews stay
    off-site).
*   N1 i18n contradiction: deleted with the `/kn/` cut.
*   N2 CNAME line: moved to implementation plan with contents and path.
*   N3 404 verification: moved to implementation plan as a verify step.
*   N5 year math: content-source bullet names calendar-year math with a
    January-1 boundary.
*   S-Blocker 1 nesting: promote Additional Resources and Future
    Improvements to H2 after NFR.
*   S-Blocker 2 refs: rewrite all five paths as `../../` root-relative.
*   S-Blocker 3 runbook: move commands, CNAME, 404 path, failure behavior,
    and flags to the implementation plan; FeatureRange keeps intent lines.
*   S4 heading names: rename to exact template names (Problem, CUJs,
    Technical Plan, Alternatives, NFR), aliases dropped.
*   S5 choice labels: drop `(author choice NA)` parentheticals; each
    subsection names the picked option in words.
*   S7 owners: every open question gains owner and due stage.
*   S8 Markdown: join the split code span and split links onto single
    lines.
*   S9 terms: canonicalize hours, phone, wa.me, Since 1980, Surge.sh
    across the range.
*   S10-S12 formatting: normalize bullets, dashes, units, diagram caption.
*   Style majors 1-5 + nits 6-13: apply all quoted rewrites (short lines,
    one-line captions, named budgets, no filler plain, no clean, crisp,
    strong, lean, fast without measure).

## CONTEST (3)

*   B2 bare author rejections: CONTEST in part. The design session is the
    deciding discussion; no external issue or PR exists for a personal
    static site. Adding fake links would be worse. Fix applied instead:
    each rejection keeps owner bkataru with date 2026-11-07 and gains one
    verifiable fact (file counts, command counts, byte sizes, request
    counts) without inventing links. Alternatives Rule satisfied by
    concrete reasons; no maintainer attribution exists to link.
*   S6 rejection prefix: CONTEST the removal. The template requires a
    `Reason for Rejection` line and the draft skill requires `Rejected by
    author:` wording for author decisions. Fix applied instead: keep the
    prefix, append owner and date plus the verifiable fact from B2.
*   N4 Astro sourcing: CONTEST the drop. Official Astro changelog was not
    reachable in the draft session; the two cited sources carry version
    and date. Fix applied instead: keep both links on single lines and
    add `https://github.com/withastro/astro/releases` as the primary
    check, with a note to re-pin from it before build.
