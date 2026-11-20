// Mappings, lesson → knowledge: which canonical concepts each existing Gradify lesson teaches, and at what band. The
// lessons themselves are untouched (kit/courses/<slug>/notes/); this file only describes them.
//
// Each binding records what it was last checked against: the concept's version and the lesson's content hash (the
// same fingerprint kit/courses/<slug>/registry.js uses, from scripts/curriculum-registry.mjs). When either changes,
// the engine marks the binding for review: a changed concept may need the lesson adapting, and a changed lesson may
// no longer teach what the binding says. Nothing is rewritten automatically.
//
//   role      teaches | applies | mentions (kit/curriculum/schema.js ROLES); "mentions" never counts as coverage
//   band      the level the lesson is pitched at (schema.js BANDS), which is what makes depth comparable
//   covers    extra things the lesson covers, such as "practical" for a required practical
//   checked   { conceptVersion, lessonHash, on, by }: by is null until a named person has confirmed the binding
//
// Current hashes: node scripts/curriculum.mjs hash <course>/<lesson>.
// 2026-11-20: Biology u02-17 to u02-23 re-recorded after the assessment upgrade (questions, LV, EV, SRC only; the
// teaching text was checked unchanged), so the bindings still hold.

const B = (course, lesson, concept, role, band, lessonHash, extra = {}) =>
  ({ course, lesson, concept, role, band, ...extra, checked: { conceptVersion: 1, lessonHash, on: "2026-11-19", by: null } });

export const LESSON_MAPS = [
  // SciGradify Biology, School 2: membranes and transport. Pitched at A level and first-year undergraduate.
  B("biology", "u02-17", "BIO-CELL-MEMBRANE-001", "teaches", "post-16", "63f2fcd7a94d"),
  B("biology", "u02-18", "BIO-CELL-MEMBRANE-001", "teaches", "post-16", "8a87609db147"),
  B("biology", "u02-19", "BIO-CELL-DIFFUSION-001", "applies", "post-16", "c7e91536e571"),
  B("biology", "u02-19", "BIO-CELL-ACTIVE-TRANSPORT-001", "applies", "post-16", "c7e91536e571"),
  B("biology", "u02-20", "BIO-CELL-DIFFUSION-001", "teaches", "post-16", "6cc1bc3607ac"),
  B("biology", "u02-21", "BIO-CELL-OSMOSIS-001", "teaches", "post-16", "caca6b0002ea"),
  B("biology", "u02-22", "BIO-CELL-DIFFUSION-001", "teaches", "post-16", "bf55e00c3cfc"),
  B("biology", "u02-23", "BIO-CELL-ACTIVE-TRANSPORT-001", "teaches", "post-16", "629a7003204d"),
  // YouthGradify GCSE Core, School 4 (The Human Body): diffusion applied at the alveoli
  B("gcse", "u04-34", "BIO-CELL-DIFFUSION-001", "applies", "upper-secondary", "39a15204e421"),
  // School 10 (Cells and Bioenergetics), written on 2026-11-19 for AQA 8464 section 4.1.3
  B("gcse", "u10-01", "BIO-CELL-MEMBRANE-001", "applies", "upper-secondary", "178e0eb69cf4"),
  B("gcse", "u10-07", "BIO-CELL-DIFFUSION-001", "teaches", "upper-secondary", "16c4994f2f72"),
  B("gcse", "u10-08", "BIO-CELL-DIFFUSION-001", "applies", "upper-secondary", "51fd68a30b06"),
  B("gcse", "u10-09", "BIO-CELL-OSMOSIS-001", "teaches", "upper-secondary", "132bde2742da"),
  B("gcse", "u10-02", "BIO-CELL-MEMBRANE-001", "teaches", "upper-secondary", "80bfc65aac57"),
  B("gcse", "u10-10", "BIO-CELL-ACTIVE-TRANSPORT-001", "teaches", "upper-secondary", "af32ec633915"),
  // School 11: the biology required practicals, including the osmosis practical (AQA 8464 required practical 2)
  B("gcse", "u11-20", "BIO-CELL-OSMOSIS-001", "applies", "upper-secondary", "2ecb3fedfbcb", { covers: ["practical"] }),
  // SciGradify Chemistry: osmosis as a colligative property, and diffusion
  B("chemistry", "u05-17", "BIO-CELL-OSMOSIS-001", "applies", "undergraduate", "dd322eede48b"),
  B("chemistry", "u05-18", "BIO-CELL-DIFFUSION-001", "applies", "undergraduate", "4c8c2138fff2"),
  // SciGradify Physics, School 34 (Biophysics): membrane transport from a physical point of view
  B("physics", "u34-05", "BIO-CELL-OSMOSIS-001", "applies", "undergraduate", "e9116fbe655b"),
  B("physics", "u34-05", "BIO-CELL-DIFFUSION-001", "mentions", "undergraduate", "e9116fbe655b"),
  B("physics", "u34-05", "BIO-CELL-ACTIVE-TRANSPORT-001", "mentions", "undergraduate", "e9116fbe655b"),
];
