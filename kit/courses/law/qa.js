// LawGradify quality assurance record, one entry per school. The stages (docs/CURRICULUM_QA.md):
//   written   — notes exist for every planned lesson (derived from course.js `written`)
//   tested    — technical checks pass (derived: npm test + npm run qa)
//   reviewed  — a structured content review against the checklist is complete; record who, when, findings
//   sources   — every authority (case, statute, SI, rule, guidance) checked against a primary source
//   signoff   — a qualified subject expert (practising solicitor or barrister) has approved it
// A school is "ready for publication" only when all five are complete. Until then the course shows it
// as a draft. Record facts here, never aspirations: leave a stage null until it has actually happened.
//   reviewed: { date: "YYYY-MM-DD", by: "name (role)", findings: ["…"], open: ["…"] }
//   sources:  { date, by, method: "…", checked: n, corrected: ["…"], open: ["…"] }
//   signoff:  { date, by: "name, qualification" }
export const QA = {
  u01: { reviewed: null, sources: null, signoff: null },
  u03: { reviewed: null, sources: null, signoff: null },
  u04: { reviewed: null, sources: null, signoff: null },
  u15: { reviewed: null, sources: null, signoff: null },
  u17: { reviewed: null, sources: null, signoff: null },
  u18: { reviewed: null, sources: null, signoff: null },
  u19: { reviewed: null, sources: null, signoff: null },
};
