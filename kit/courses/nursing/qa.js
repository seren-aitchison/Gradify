// NurseGradify quality assurance record, one entry per school. The stages (docs/CURRICULUM_QA.md):
//   written   — notes exist for every planned lesson (derived from course.js `written`)
//   tested    — technical checks pass (derived: npm test + npm run qa)
//   reviewed  — a structured content review against the checklist is complete; record who, when, findings
//   sources   — every authority (NMC standard, NICE/SIGN guideline, RCUK, BTS, MHRA, statute) checked against a primary source
//   signoff   — a qualified subject expert (registered nurse educator in the relevant field) has approved it
// A school is "ready for publication" only when all five are complete. Until then the course shows it
// as a draft. Record facts here, never aspirations: leave a stage null until it has actually happened.
//   reviewed: { date: "YYYY-MM-DD", by: "name (role)", findings: ["…"], accepted: ["warnings accepted, with reason"], open: ["…"] }
//   sources:  { date, by, method: "…", checked: n, corrected: ["…"], open: ["…"] }
//   signoff:  { date, by: "name, qualification" }
export const QA = {
  u01: { reviewed: null, sources: null, signoff: null },
  u03: { reviewed: null, sources: null, signoff: null },
  u04: { reviewed: null, sources: null, signoff: null },
  u05: { reviewed: null, sources: null, signoff: null },
};
