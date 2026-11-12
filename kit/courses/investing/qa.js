// Quality assurance record, one entry per written school (docs/CURRICULUM_QA.md): written and tested are derived;
// reviewed, sources and signoff are recorded facts, null until they have actually happened. AI review may complete
// "reviewed" only if `by` says so; it can never complete "sources" or "signoff". Sign-off needs an FCA-regulated
// investment professional or a CFA charterholder educator.
export const QA = {
  // written to standard 2 on 2026-11-07; review, source check and sign-off pending
  u01: { standard: 2, reviewed: null, sources: null, signoff: null },
  // written to standard 2 on 2026-11-12
  u02: { standard: 2, reviewed: null, sources: null, signoff: null },
  u07: { standard: 2, reviewed: null, sources: null, signoff: null }, // reused from finance u04
};
// the date each school's notes were first written
export const WRITTEN_ON = { u07: "2026-11-12", u01: "2026-11-07", u02: "2026-11-12" };
