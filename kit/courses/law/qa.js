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
    standard: 2,
    reviewed: {
      date: "2026-10-31", by: "Claude (AI review against docs/CURRICULUM_QA.md checklist; not an expert review)",
      findings: [
        "Precedent: R v R [1991] was given as an example of overruling; replaced with R v Shivpuri [1987] overruling Anderton v Ryan.",
        "Delegated legislation: ex p Fire Brigades Union was cited for substantive ultra vires of delegated legislation, which it isn't; replaced with R (Public Law Project) v Lord Chancellor [2016] UKSC 39.",
        "Parliamentary sovereignty: EU supremacy updated for the Retained EU Law (Revocation and Reform) Act 2023.",
        "Civil and criminal law: added a second section heading.",
        "Assessment: 17 questions where the right answer was conspicuously the longest option rewritten with balanced, plausible distractors; 7 hard (M3) multi-step questions added (10 of 70 now hard).",
        "2026-11-03: lesson metadata (objectives, summaries, key terms, dated sources) added to all 30 lessons; an authority added to the five lessons that had none (Theft Act 1968, Courts Act 1971 and Constitutional Reform Act 2005, Parliament Acts and Jackson, Anderton v Ryan and Shivpuri, CPR Part 16).",
      ],
      accepted: [],
      open: [],
    },
    sources: null, signoff: null,
  },
  u05: { standard: 2, reviewed: null, sources: null, signoff: null },
  u07: { standard: 2, reviewed: null, sources: null, signoff: null },
  u09: { standard: 2, reviewed: null, sources: null, signoff: null },
  u11: { standard: 2, reviewed: null, sources: null, signoff: null },
  u12: { standard: 2, reviewed: null, sources: null, signoff: null },
  u08: { standard: 2, reviewed: null, sources: null, signoff: null },
  u10: { standard: 2, reviewed: null, sources: null, signoff: null },
  u06: { standard: 2, reviewed: null, sources: null, signoff: null },
  u02: { standard: 2, reviewed: null, sources: null, signoff: null },
  u13: { standard: 2, reviewed: null, sources: null, signoff: null },
  u14: { standard: 2, reviewed: null, sources: null, signoff: null },
  u16: { standard: 2, reviewed: null, sources: null, signoff: null },
  u03: { standard: 2, reviewed: null, sources: null, signoff: null },
  u04: { standard: 2, reviewed: null, sources: null, signoff: null },
  u15: { standard: 2, reviewed: null, sources: null, signoff: null },
  u17: { standard: 2, reviewed: null, sources: null, signoff: null },
  u18: { standard: 2, reviewed: null, sources: null, signoff: null },
  u19: { standard: 2, reviewed: null, sources: null, signoff: null },
};

// Partial citation checks that do NOT complete a school's `sources` stage. Kept so the work isn't repeated.
export const SOURCE_CHECKS = [
  {
    date: "2026-11-03", by: "Claude (web search; not an expert review)",
    method: "36 authorities searched individually against BAILII, supremecourt.uk, jcpc.uk, Find Case Law and legislation.gov.uk (mostly post-2015 cases); the remaining case, statute and section citations read through for consistency and against well-established citations, not each confirmed. Details: docs/qa/law-citation-check.md",
    checked: 36,
    corrected: [
      "u05 necessity: R v Shayler [2001] UKHL 11 (no such citation) changed to [2001] EWCA Crim 1977, noting the House of Lords [2002] UKHL 11.",
      "u05 necessity: Nicklinson's rejection of necessity attributed to the Court of Appeal [2013] EWCA Civ 961, not the Supreme Court [2014] UKSC 38.",
      "u09-01 question: the made-up 'Judicature Act 1925' distractor replaced with Supreme Court of Judicature Act 1873, s 25 (repealed).",
    ],
    open: [
      "Every school's sources stage: a person must check each authority against a primary source.",
      "CPR, CrimPR and regulator guidance references, and figures that change (fees, thresholds, limits), were not checked.",
      "Party names: Benkharbouche, Times Travel and Allister use titles that differ from the Supreme Court's.",
    ],
  },
];
