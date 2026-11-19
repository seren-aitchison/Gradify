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

const B = (course, lesson, concept, role, band, lessonHash, extra = {}) =>
  ({ course, lesson, concept, role, band, ...extra, checked: { conceptVersion: 1, lessonHash, on: "2026-11-19", by: null } });

export const LESSON_MAPS = [
  // SciGradify Biology, School 2: membranes and transport. Pitched at A level and first-year undergraduate.
  B("biology", "u02-17", "BIO-CELL-MEMBRANE-001", "teaches", "post-16", "b45cb985322f"),
  B("biology", "u02-18", "BIO-CELL-MEMBRANE-001", "teaches", "post-16", "3a0007ef3c76"),
  B("biology", "u02-19", "BIO-CELL-DIFFUSION-001", "applies", "post-16", "86f4c6940796"),
  B("biology", "u02-19", "BIO-CELL-ACTIVE-TRANSPORT-001", "applies", "post-16", "86f4c6940796"),
  B("biology", "u02-20", "BIO-CELL-DIFFUSION-001", "teaches", "post-16", "738810f1da73"),
  B("biology", "u02-21", "BIO-CELL-OSMOSIS-001", "teaches", "post-16", "5d37fba1dbda"),
  B("biology", "u02-22", "BIO-CELL-DIFFUSION-001", "teaches", "post-16", "927724283c1b"),
  B("biology", "u02-23", "BIO-CELL-ACTIVE-TRANSPORT-001", "teaches", "post-16", "c9bfa9944675"),
  // YouthGradify GCSE Core, School 4 (The Human Body): diffusion applied at the alveoli. GCSE Core has no lesson that
  // teaches diffusion, osmosis or active transport as topics (its old one, u04-04, was retired unwritten)
  B("gcse", "u04-34", "BIO-CELL-DIFFUSION-001", "applies", "upper-secondary", "39a15204e421"),
  // SciGradify Chemistry: osmosis as a colligative property, and diffusion
  B("chemistry", "u05-17", "BIO-CELL-OSMOSIS-001", "applies", "undergraduate", "dd322eede48b"),
  B("chemistry", "u05-18", "BIO-CELL-DIFFUSION-001", "applies", "undergraduate", "4c8c2138fff2"),
  // SciGradify Physics, School 34 (Biophysics): membrane transport from a physical point of view
  B("physics", "u34-05", "BIO-CELL-OSMOSIS-001", "applies", "undergraduate", "e9116fbe655b"),
  B("physics", "u34-05", "BIO-CELL-DIFFUSION-001", "mentions", "undergraduate", "e9116fbe655b"),
  B("physics", "u34-05", "BIO-CELL-ACTIVE-TRANSPORT-001", "mentions", "undergraduate", "e9116fbe655b"),
];
