// Quality assurance record, one entry per written school (docs/CURRICULUM_QA.md): written and tested are derived;
// reviewed, sources and signoff are recorded facts, null until they have actually happened. AI review may complete
// "reviewed" only if `by` says so; it can never complete "sources" or "signoff".
export const QA = {
  // written to standard 2; sources cited for checking, review pending
  u01: { standard: 2, reviewed: null, sources: null, signoff: null },
  u02: { standard: 2, reviewed: null, sources: null, signoff: null }, // reused from teaching u01
  u09: { standard: 2, reviewed: null, sources: null, signoff: null }, // reused from professional u01
  u12: { standard: 2, reviewed: null, sources: null, signoff: null }, // reused from careers u01
  u11: { standard: 2, reviewed: null, sources: null, signoff: null }, // reused from health u05
};
// the date each school's notes were first written
export const WRITTEN_ON = { u11: "2026-11-12", u12: "2026-11-12", u09: "2026-11-12", u02: "2026-11-12", u01: "2026-11-08" };
