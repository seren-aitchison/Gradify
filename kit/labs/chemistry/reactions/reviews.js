// Verdicts from the independent chemistry review of the lab's reference set (tests/data/organic-reference.mjs),
// written by `node scripts/organic-review.mjs import <completed csv>`. Empty until a review has been returned.
// Read by rules.js: a rule with any "disagree" verdict is shown (and explained by the tutor) as disputed, with the
// reviewer's notes.
//   REVIEWS[id] = { verdict: "agree" | "disagree" | "unsure", reviewer, date, correction, note }
export const REVIEWS = {};
