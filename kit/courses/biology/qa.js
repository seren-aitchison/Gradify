// SciGradify Biology quality assurance record, one entry per written school. The stages (docs/CURRICULUM_QA.md):
//   written   — notes exist for every planned lesson (derived from course.js `written`)
//   tested    — technical checks pass (derived: npm test + npm run qa)
//   reviewed  — a structured content review against the checklist is complete; record who, when, findings
//   sources   — every factual claim and figure checked against the lesson's cited sources
//   signoff   — a qualified subject expert (a university biology lecturer or experienced teacher) has approved it
// A school is "ready for publication" only when all five are complete; until then the course labels it a
// draft. Record facts, never aspirations: leave a stage null until it has actually happened.
export const QA = {
  // written to standard 2; checks pending
  u01: { standard: 2, reviewed: null, sources: null, signoff: null },
};
