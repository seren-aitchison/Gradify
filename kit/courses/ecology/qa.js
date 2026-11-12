// Quality assurance record, one entry per written school (docs/CURRICULUM_QA.md): written and tested are derived;
// reviewed, sources and signoff are recorded facts, null until they have actually happened. AI review may complete
// "reviewed" only if `by` says so; it can never complete "sources" or "signoff". Sign-off needs a university
// ecology lecturer.
export const QA = {
  u04: { standard: 2, reviewed: null, sources: null, signoff: null },
  u03: { standard: 2, reviewed: null, sources: null, signoff: null },
  u02: { standard: 2, reviewed: null, sources: null, signoff: null },
  // written to standard 2 on 2026-11-07; review, source check and sign-off pending
  u01: { standard: 2, reviewed: null, sources: null, signoff: null },
};
// the date each school's notes were first written
export const WRITTEN_ON = { u01: "2026-11-07", u02: "2026-11-10", u03: "2026-11-11", u04: "2026-11-12" };
