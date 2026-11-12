// Quality assurance record, one entry per written school (docs/CURRICULUM_QA.md): written and tested are derived;
// reviewed, sources and signoff are recorded facts, null until they have actually happened. AI review may complete
// "reviewed" only if `by` says so; it can never complete "sources" or "signoff". Sign-off needs a qualified teacher
// and initial teacher education tutor.
export const QA = {
  u01: { standard: 2, reviewed: null, sources: null, signoff: null },
  u12: { standard: 2, reviewed: null, sources: null, signoff: null }, // reused from sociology u09
  u11: { standard: 2, reviewed: null, sources: null, signoff: null }, // reused from psychology u10
  u05: { standard: 2, reviewed: null, sources: null, signoff: null }, // reused from psychology u04
};
// the date each school's notes were first written
export const WRITTEN_ON = { u05: "2026-11-12", u11: "2026-11-12", u12: "2026-11-12", u01: "2026-11-08" };
