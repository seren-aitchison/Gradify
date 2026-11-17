// What a learner's own results say their next study pack should contain more of. Gradify AI receives only these fixed
// values (kit/notes/pack.js: FOCUS), never free text, and the server checks them.
//   recall    they're getting the basics wrong: favour short definition and cloze cards
//   apply     recall is strong, but they can't yet use the ideas (or have never been asked to)
//   explain   recall is strong, explaining is weak
//   compare   they keep confusing similar things
// Decided from evidence across all their topics (kit/learning/mastery.js: topicProfiles), never assumed: with too
// little evidence, nothing is asked for. Pure, so Node can test it (tests/focus.test.mjs).

const avg = (profiles, dim) => {
  let sum = 0, n = 0;
  for (const p of profiles) { const d = p.dims?.[dim]; if (d && d.value != null && d.n) { sum += d.value * d.n; n += d.n; } }
  return { value: n ? sum / n : null, n };
};

/** @param {object[]} profiles topicProfiles(cards, reviews) @returns {string[]} at most two of recall, apply, explain, compare */
export function focusFromProfiles(profiles = []) {
  const recall = avg(profiles, "recall"), explain = avg(profiles, "explain"), apply = avg(profiles, "apply");
  if (recall.n < 10) return [];
  if (recall.value < 0.6) return ["recall"];
  const out = [];
  const strong = recall.value >= 0.75;
  if (strong && ((apply.n >= 3 && apply.value < 0.6) || (apply.n === 0 && recall.n >= 20))) out.push("apply");
  if (strong && explain.n >= 3 && explain.value < 0.6) out.push("explain");
  const confused = profiles.reduce((a, p) => a + (p.misconceptions?.length || 0), 0);
  if (confused >= 3 && out.length < 2) out.push("compare");
  return out.slice(0, 2);
}
