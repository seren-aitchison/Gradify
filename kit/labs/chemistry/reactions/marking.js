// Exam-style marking for a mechanism attempt, out of 10, across separate criteria, so one early mistake doesn't cost
// every mark. The scheme adapts to the question: a one-step mechanism has no intermediate to mark, so those marks go
// to the electron movement. Error carried forward: steps after a valid wrong turn are credited when they do the right
// kind of step on the learner's own intermediate (decided in mechanism-ui.js with arrowKinds), and the final product
// earns partial credit. No DOM; tested in tests/mechanism.test.mjs.
//   breakdown({ arrows: [n per step], first: [arrows right on the first attempt, per step], ecf: step | null,
//               conditions: bool | null, explanation: bool | null, assisted: bool }) → { rows, got, total }
export function breakdown({ arrows, first, ecf = null, conditions = null, explanation = null, assisted = false }) {
  const n = arrows.length, frac = (k) => Math.max(0, Math.min(1, (first[k] || 0) / arrows[k]));
  const rows = [];
  const add = (label, max, got, note = "") => rows.push({ label, max, got: Math.round(got * 2) / 2, note });
  if (conditions != null) add("Reagents and conditions", 1, conditions ? 1 : 0);
  if (n === 1) {
    add("Electron movement (curly arrows)", 5, 5 * frac(0));
  } else {
    add("First electron movement", 2, 2 * frac(0));
    const mids = [...Array(n - 1).keys()], okMid = mids.filter((k) => ecf == null || k < ecf).filter((k) => frac(k) === 1).length;
    add("Intermediates", 2, (2 * okMid) / mids.length, ecf != null ? `Error at step ${ecf + 1}: later intermediates are your own` : "");
    const later = [...Array(n - 1).keys()].map((k) => k + 1), lf = later.reduce((t, k) => t + frac(k), 0) / later.length;
    add("Later electron movement", 2, 2 * lf, ecf != null ? "Marked on your own intermediate (error carried forward)" : "");
  }
  const P = n === 1 ? 3 : 2, lastRight = (first[n - 1] || 0) >= arrows[n - 1];
  add("Final product", P, ecf != null ? P / 2 : lastRight ? P : 0, ecf != null ? "Consistent with your route, but not the expected product" : "");
  if (explanation != null) add("Explanation", 1, explanation ? 1 : 0);
  // scale to 10
  const total = rows.reduce((t, r) => t + r.max, 0), scale = 10 / total;
  for (const r of rows) { r.max = Math.round(r.max * scale * 2) / 2; r.got = Math.round(r.got * scale * 2) / 2; }
  const diff = 10 - rows.reduce((t, r) => t + r.max, 0); if (diff) rows[rows.length - 1].max += diff;
  for (const r of rows) r.got = Math.min(r.got, r.max);
  const got = rows.reduce((t, r) => t + r.got, 0);
  if (assisted) { rows.push({ label: "Help used (hints or shown steps)", max: 0, got: 0, note: "Marks for shown steps are not given" }); }
  return { rows, got, total: 10 };
}
