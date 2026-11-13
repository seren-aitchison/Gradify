// Quality assurance record, one entry per written school (docs/CURRICULUM_QA.md): written and tested are derived;
// reviewed, sources and signoff are recorded facts, null until they have actually happened. AI review may complete
// "reviewed" only if `by` says so; it can never complete "sources" or "signoff" (a veterinary surgeon, MRCVS, signs off).
export const QA = {
  u04: { standard: 2, reviewed: null, sources: null, signoff: null },
  // written to standard 2 on 2026-11-07; review, source check and veterinary sign-off pending
  u01: { standard: 2, reviewed: null, sources: null, signoff: null },
  // written to standard 2 on 2026-11-12; review, source check and veterinary sign-off pending
  u02: { standard: 2, reviewed: null, sources: null, signoff: null },
  // written to standard 2 on 2026-11-13; review, source check and veterinary sign-off pending
  u03: { standard: 2, reviewed: null, sources: null, signoff: null },
  u08: { standard: 2, reviewed: null, sources: null, signoff: null }, // reused from medicine u02
};
// the date each school's notes were first written
export const WRITTEN_ON = { u08: "2026-11-12", u01: "2026-11-07", u02: "2026-11-12", u03: "2026-11-13", u04: "2026-11-13" };
