// Subject-expert reviews of interactives (docs/INTERACTIVE-ROADMAP.md §8). One record per reviewed interactive,
// keyed "<course>/<interactive id>":
//   { role: "a registered pharmacist", date: "2026-12-01", scope: "model, wording, challenges", fingerprint: "…" }
// role describes the reviewer's qualification (no names are published without their agreement); fingerprint is the
// interactive's entry in kit/course/ix-manifest.js on the day of the review, so later changes show as
// "Updated since last review". Until a record exists, the interactive says "Not yet expert-reviewed".
// No interactive has been reviewed yet.
export const REVIEWS = {};
