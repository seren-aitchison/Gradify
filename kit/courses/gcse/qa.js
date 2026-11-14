// Quality assurance record, one entry per written school (docs/CURRICULUM_QA.md): written and tested are derived;
// reviewed, sources and signoff are recorded facts, null until they have actually happened. AI review may complete
// "reviewed" only if `by` says so; it can never complete "sources" or "signoff".
export const QA = {
  u08: { standard: 2, reviewed: null, sources: null, signoff: null },
  u06: { standard: 2, reviewed: null, sources: null, signoff: null },
  u05: { standard: 2, reviewed: null, sources: null, signoff: null },
  u01: { standard: 2, reviewed: null, sources: null, signoff: null },
  u02: { standard: 2, reviewed: null, sources: null, signoff: null }, // reused from literature u01
  u09: { standard: 2, reviewed: null, sources: null, signoff: null }, // reused from health u01
  u04: { standard: 2, reviewed: null, sources: null, signoff: null }, // reused from health u02
  u07: { standard: 2, reviewed: null, sources: null, signoff: null }, // reused from ecology u01
  u03: { standard: 2, reviewed: null, sources: null, signoff: null }, // reused from literature u03
};
// the date each school's notes were first written
export const WRITTEN_ON = { u03: "2026-11-12", u07: "2026-11-12", u04: "2026-11-12", u09: "2026-11-12", u02: "2026-11-12", u01: "2026-11-09", u05: "2026-11-13", u06: "2026-11-14", u08: "2026-11-14" };
