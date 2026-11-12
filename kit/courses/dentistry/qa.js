// Quality assurance record, one entry per written school (docs/CURRICULUM_QA.md): written and tested are derived;
// reviewed, sources and signoff are recorded facts, null until they have actually happened. AI review may complete
// "reviewed" only if `by` says so; it can never complete "sources" or "signoff".
export const QA = {
  // written to standard 2; review, source check and sign-off by a registered dentist pending
  u01: { standard: 2, reviewed: null, sources: null, signoff: null },
  u02: { standard: 2, reviewed: null, sources: null, signoff: null },
  u03: { standard: 2, reviewed: null, sources: null, signoff: null }, // reused from medicine u01
  u06: { standard: 2, reviewed: null, sources: null, signoff: null }, // reused from medicine u02
};
// the date each school's notes were first written
export const WRITTEN_ON = { u06: "2026-11-12", u03: "2026-11-12", u01: "2026-11-08", u02: "2026-11-12" };
