// LawGradify quality assurance record, one entry per school. The stages (docs/CURRICULUM_QA.md):
//   written   — notes exist for every planned lesson (derived from course.js `written`)
//   tested    — technical checks pass (derived: npm test + npm run qa)
//   reviewed  — a structured content review against the checklist is complete; record who, when, findings
//   sources   — every authority (case, statute, SI, rule, guidance) checked against a primary source
//   signoff   — a qualified subject expert (practising solicitor or barrister) has approved it
// A school is "ready for publication" only when all five are complete. Until then the course shows it
// as a draft. Record facts here, never aspirations: leave a stage null until it has actually happened.
//   reviewed: { date: "YYYY-MM-DD", by: "name (role)", findings: ["…"], accepted: ["warnings accepted, with reason"], open: ["…"] }
//   sources:  { date, by, method: "…", checked: n, corrected: ["…"], open: ["…"] }
//   signoff:  { date, by: "name, qualification" }
export const QA = {
  u01: {
    reviewed: {
      date: "2026-10-31", by: "Claude (AI review against docs/CURRICULUM_QA.md checklist; not an expert review)",
      findings: [
        "Precedent: R v R [1991] was given as an example of overruling; replaced with R v Shivpuri [1987] overruling Anderton v Ryan.",
        "Delegated legislation: ex p Fire Brigades Union was cited for substantive ultra vires of delegated legislation, which it isn't; replaced with R (Public Law Project) v Lord Chancellor [2016] UKSC 39.",
        "Parliamentary sovereignty: EU supremacy updated for the Retained EU Law (Revocation and Reform) Act 2023.",
        "Civil and criminal law: added a second section heading.",
        "Assessment: 17 questions where the right answer was conspicuously the longest option rewritten with balanced, plausible distractors; 7 hard (M3) multi-step questions added (10 of 70 now hard).",
      ],
      accepted: ["No authority cited in What is law?, Court structures and jurisdiction, Parliament and the legislative process, Legal research and authority, Legal writing: conceptual or skills lessons where citation isn't needed."],
      open: [],
    },
    sources: null, signoff: null,
  },
  u03: { reviewed: null, sources: null, signoff: null },
  u04: { reviewed: null, sources: null, signoff: null },
  u15: { reviewed: null, sources: null, signoff: null },
  u17: { reviewed: null, sources: null, signoff: null },
  u18: { reviewed: null, sources: null, signoff: null },
  u19: { reviewed: null, sources: null, signoff: null },
};
