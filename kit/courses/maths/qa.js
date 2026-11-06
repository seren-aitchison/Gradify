// MathGradify quality assurance record, one entry per written school. The stages (docs/CURRICULUM_QA.md):
//   written   — notes exist for every planned lesson (derived from course.js `written`)
//   tested    — technical checks pass (derived: npm test + npm run qa)
//   reviewed  — a structured content review against the checklist is complete; record who, when, findings
//   sources   — every reference (DfE subject content, textbooks, papers) checked against the original
//   signoff   — a qualified subject expert (a mathematics teacher or lecturer) has approved it
// Record facts, never aspirations: leave a stage null until it has actually happened.
export const QA = {
  u13: { standard: 2, reviewed: null, sources: null, signoff: null },
  u12: { standard: 2, reviewed: null, sources: null, signoff: null },
  u06: { standard: 2, reviewed: null, sources: null, signoff: null },
  u05: { standard: 2, reviewed: null, sources: null, signoff: null },
  u07: { standard: 2, reviewed: null, sources: null, signoff: null },
  u03: { standard: 2, reviewed: null, sources: null, signoff: null },
  u01: { standard: 2, reviewed: null, sources: null, signoff: null },
};
