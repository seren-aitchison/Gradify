// Quality assurance record, one entry per written school (docs/CURRICULUM_QA.md):
//   written   — notes exist for every planned lesson (derived from course.js `written`)
//   tested    — technical checks pass (derived: npm test)
//   reviewed  — a structured content review against the checklist is complete; record who, when, findings
//   sources   — every reference, date, figure and quotation checked against the original
//   signoff   — a qualified subject expert (a university lecturer or chartered psychologist / sociologist) has approved it
// A school is "ready for publication" only when all five are complete; until then the course labels it a draft.
// Record facts, never aspirations: leave a stage null until it has actually happened. AI review may complete
// "reviewed" only if `by` says so; it can never complete "sources" or "signoff".
export const QA = {
  // written to standard 2 on 2026-11-01; linked sources checked by scripts/check-sources.mjs (docs/qa/sociology-source-check.md); review pending
  u01: { standard: 2, reviewed: null, sources: null, signoff: null },
  u02: { standard: 2, reviewed: null, sources: null, signoff: null },
  u03: { standard: 2, reviewed: null, sources: null, signoff: null },
  u04: { standard: 2, reviewed: null, sources: null, signoff: null },
  u05: { standard: 2, reviewed: null, sources: null, signoff: null },
  u06: { standard: 2, reviewed: null, sources: null, signoff: null },
  u07: { standard: 2, reviewed: null, sources: null, signoff: null },
  u08: { standard: 2, reviewed: null, sources: null, signoff: null },
  u09: { standard: 2, reviewed: null, sources: null, signoff: null },
  u10: { standard: 2, reviewed: null, sources: null, signoff: null },
  u17: { standard: 2, reviewed: null, sources: null, signoff: null },
  u18: { standard: 2, reviewed: null, sources: null, signoff: null },
};
// the date each school's notes were first written (shown on every lesson with the review state)
export const WRITTEN_ON = { u01: "2026-11-01", u02: "2026-11-01", u03: "2026-11-03", u04: "2026-11-05", u05: "2026-11-03", u06: "2026-11-05", u07: "2026-11-05", u08: "2026-11-05", u09: "2026-11-05", u10: "2026-11-05", u17: "2026-11-02", u18: "2026-11-02" };
