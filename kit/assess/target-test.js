// Target Tests: a short test built for the learner from their own evidence. They choose how long they have, what to
// focus on (recall, understanding, application or a mix) and the scope (their weak topics, what they've studied, or
// chosen units); Gradify picks the questions. Weak lessons come first, questions they got wrong last time and ones
// they've never answered are preferred, and the set is spread across lessons rather than ten from one. Difficulty
// follows the focus: recall is level 1, understanding level 2, application level 3 (falling back to nearby levels).
//
//   buildTargetTest(pool, { minutes: 10, focus: "mixed", weak: ["u03-02", …], attempts, seed })
//   pool: [{ key, Q: { type, d }, l: { id } }]      → the chosen items, easiest first
//   targetResults(rows) → per lesson right/total, weakest first

export const FOCUS = {
  recall: { label: "Recall", sub: "Can you remember it?", d: [1] },
  understanding: { label: "Understanding", sub: "Can you explain it?", d: [2] },
  application: { label: "Application", sub: "Can you use it on something new?", d: [3] },
  mixed: { label: "Mixed", sub: "A bit of everything", d: [1, 2, 3] },
};
export const LENGTHS = [5, 10, 20, 30];
// about a minute a question, with a floor and a ceiling
export const countFor = (minutes) => Math.max(3, Math.min(30, Math.round(minutes)));

const rng = (s) => () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
const DAY = 864e5;

export function buildTargetTest(pool, { minutes = 10, focus = "mixed", weak = [], attempts = [], seed = Date.now() % 2147483647, now = Date.now() } = {}) {
  const want = FOCUS[focus]?.d || FOCUS.mixed.d, count = countFor(minutes), rand = rng(seed || 1);
  const rank = new Map(weak.map((id, i) => [id, i]));
  const last = new Map();
  for (const a of attempts) { if (!a?.question) continue; const t = Date.parse(a.at) || 0, p = last.get(a.question.id); if (!p || t >= p.t) last.set(a.question.id, { t, score: Number(a.score) || 0 }); }
  const score = (it) => {
    const d = it.Q.d || 2, prev = last.get(it.key);
    let s = rand();
    s += want.includes(d) ? 3 : Math.min(...want.map((w) => Math.abs(w - d))) === 1 ? 1 : 0;
    if (rank.has(it.l?.id)) s += 4 - Math.min(3, rank.get(it.l.id) * 0.5);
    if (!prev) s += 1.2;
    else if (prev.score < 0.7) s += 2;
    else if (now - prev.t < 3 * DAY) s -= 1.5;
    return s;
  };
  // best questions per lesson, then lessons in order of their best question, taken in turns
  const by = new Map();
  for (const it of pool) { const k = it.l?.id || "?"; (by.get(k) || by.set(k, []).get(k)).push({ it, s: score(it) }); }
  const groups = [...by.values()].map((g) => g.sort((a, b) => b.s - a.s)).sort((a, b) => b[0].s - a[0].s);
  const out = [];
  for (let round = 0; out.length < count && groups.some((g) => g.length > round); round++) {
    for (const g of groups) { if (out.length >= count) break; if (g[round]) out.push(g[round].it); }
  }
  return out.sort((a, b) => (a.Q.d || 2) - (b.Q.d || 2));
}

/** rows: [{ lesson, score }] → [{ lesson, n, right, mean }] weakest first */
export function targetResults(rows) {
  const m = new Map();
  for (const r of rows) { const g = m.get(r.lesson) || { lesson: r.lesson, n: 0, right: 0, sum: 0 }; g.n++; g.sum += r.score; if (r.score >= 0.7) g.right++; m.set(r.lesson, g); }
  return [...m.values()].map((g) => ({ lesson: g.lesson, n: g.n, right: g.right, mean: g.sum / g.n })).sort((a, b) => a.mean - b.mean || b.n - a.n);
}

/** a test's settings in the address (#/target/<code>), so a test can be retaken or linked: m10_fmixed_sweak[_u01.u03] */
export const encodeTest = ({ minutes = 10, focus = "mixed", scope = "studied", units = [], lessons = [] }) =>
  [`m${minutes}`, `f${focus}`, `s${scope}`, ...(units.length ? [`u${units.join(".")}`] : []), ...(lessons.length ? [`l${lessons.join(".")}`] : [])].join("_");
export function decodeTest(code = "") {
  const out = { minutes: 10, focus: "mixed", scope: "studied", units: [], lessons: [] };
  for (const part of String(code).split("_")) {
    const k = part[0], v = part.slice(1);
    if (k === "m" && Number(v)) out.minutes = Math.max(3, Math.min(60, Number(v)));
    else if (k === "f" && FOCUS[v]) out.focus = v;
    else if (k === "s" && ["weak", "studied", "units", "lessons"].includes(v)) out.scope = v;
    else if (k === "u" && v) out.units = v.split(".");
    else if (k === "l" && v) out.lessons = v.split(".");
  }
  return out;
}
