// Quality assurance record, one entry per written school (docs/CURRICULUM_QA.md): written and tested are derived;
// reviewed, sources and signoff are recorded facts, null until they have actually happened. AI review may complete
// "reviewed" only if `by` says so; it can never complete "sources" or "signoff".
export const QA = {
  // written to standard 2 on 2026-11-07; review, source check and expert sign-off pending
  u01: { standard: 2, reviewed: null, sources: null, signoff: null },
  u08: { standard: 2, reviewed: null, sources: null, signoff: null }, // reused from health u03
  u12: { standard: 2, reviewed: null, sources: null, signoff: null }, // reused from health u04
  u09: { standard: 2, reviewed: null, sources: null, signoff: null }, // reused from psychology u13
};
// the date each school's notes were first written
export const WRITTEN_ON = { u09: "2026-11-12", u12: "2026-11-12", u08: "2026-11-12", u01: "2026-11-07" };
