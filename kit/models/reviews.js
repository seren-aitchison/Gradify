// Expert reviews of the 3D models (kit/models/*.js), the same rule as the molecules (scripts/visuals/reviews.json):
// nothing is shown as reviewed until a named expert has checked it, and a review covers only the exact version they
// checked. Each entry records the model file's SHA-256 (first 16 hex digits) at review time; tests/model-reviews.test.mjs
// fails if the model has changed since, so a review can't silently vouch for content nobody checked.
//   body: { by: "Dr A. Anatomist, MBBS", on: "2026-12-01", sha: "…", scope: "structures, labels and notes" }
// Who should review each model (shown while it's waiting):
export const REVIEWER = {
  body: "a doctor or anatomist", athlete: "a sport scientist or physiotherapist", dog: "a veterinary surgeon", mouth: "a dentist",
  brain: "a neuroscientist", membrane: "a pharmacologist", cell: "a cell biologist", ecosystem: "an ecologist", engine: "a mechanical engineer",
  maths: "a mathematics teacher", solar: "an astronomer or physics teacher", atoms: "a chemistry teacher", globe: "a theatre historian",
  voice: "a phonetician or speech and language therapist", piano: "a music teacher", colour: "an art teacher", castle: "a medieval historian",
  courtroom: "a criminal barrister or solicitor", computer: "a computer scientist",
};
export const REVIEWS = {};
/** A model's review status for display: { reviewed, line }. */
export function reviewOf(file) {
  const r = REVIEWS[file];
  return r ? { reviewed: true, line: `Reviewed by ${r.by} on ${r.on}${r.scope ? ` (${r.scope})` : ""}.` } : { reviewed: false, line: `Not yet reviewed by ${REVIEWER[file] || "a subject expert"}. If you spot something wrong, tell us: hello@getgradify.com.` };
}
