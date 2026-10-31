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
  // written to standard 2: lesson metadata is a hard check
  u06: {
    standard: 2,
    reviewed: {
      date: "2026-10-31", by: "Claude (AI review against docs/CURRICULUM_QA.md checklist; not an expert clinical review)",
      findings: [
        "Every lesson separates theoretical understanding from supervised, assessed competence (SAFE box), and covers indications or purpose, contraindications and risks, infection prevention, consent, supervision and local policy where they apply.",
        "Procedures are taught as principles, with the Royal Marsden Manual and local procedures named for step-by-step practice; no doses or thresholds beyond published national guidance (NEWS2, BTS oxygen targets, NG pH 5.5, BLS 5-6 cm at 100-120/min, hypoglycaemia below 4.0 mmol/L).",
        "QA run found and fixed: a question duplicating School 4, five thin explanations, 30 questions where the right answer was conspicuously longest (distractors rewritten as realistic misconceptions), too few hard questions (5 multi-step M3 questions added).",
        "ECG ordering question reworded to ask about placement order.",
      ],
      accepted: [],
      open: [],
    },
    sources: null, signoff: null,
  },
};
