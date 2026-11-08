// A site's release status (kit/core/sites.js): what a learner can actually do there, not how finished it looks.
// Shared by the homepage (assets/app.js) and the site build (scripts/build-site.mjs), which writes the counts into
// the published homepage so they're right even before, or without, JavaScript.
export const statusOf = (s) => s.status || (s.built || (s.u && !s.soon) ? "live" : "soon");
export function homeCounts(groups) {
  const all = groups.flatMap((g) => g.items);
  return { total: all.length, live: all.filter((s) => statusOf(s) === "live").length, beta: all.filter((s) => statusOf(s) === "beta").length };
}
