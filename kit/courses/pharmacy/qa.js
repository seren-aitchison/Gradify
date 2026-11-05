// PharmaGradify quality assurance record, one entry per written school. The stages (docs/CURRICULUM_QA.md):
//   written   — notes exist for every planned lesson (derived from course.js `written`)
//   tested    — technical checks pass (derived: npm test + npm run qa)
//   reviewed  — a structured content review against the checklist is complete; record who, when, findings
//   sources   — every reference (BNF, SPC, NICE, GPhC, legislation, textbooks) checked against the original
//   signoff   — a qualified subject expert (a registered pharmacist educator) has approved it
// A school is "ready for publication" only when all five are complete. Record facts, never aspirations:
// leave a stage null until it has actually happened. AI review may complete "reviewed" only if `by` says so;
// it can never complete "sources" or "signoff".
//   reviewed: { date: "YYYY-MM-DD", by: "name (role)", findings: ["…"], accepted: ["…"], open: ["…"] }
//   sources:  { date, by, method: "…", checked: n, corrected: ["…"], open: ["…"] }
//   signoff:  { date, by: "name, qualification" }
export const QA = {
  u01: { standard: 2, reviewed: null, sources: null, signoff: null },
  u02: { standard: 2, reviewed: null, sources: null, signoff: null },
  u16: { standard: 2, reviewed: null, sources: null, signoff: null },
  u17: { standard: 2, reviewed: null, sources: null, signoff: null },
  u06: { standard: 2, reviewed: null, sources: null, signoff: null },
};
