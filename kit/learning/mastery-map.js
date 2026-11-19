// The mastery map: a course's chapters as a map of how the subject fits together, each chapter showing how far the
// learner has really got with it, from their own answers. Pure functions (no DOM), so Explore, the course's Progress
// page, the learner's world and tests share them.
//
//   const map = masteryMap(chapters, prereqs, statusOf)
//     chapters  [{ n, id, title, lessons: [lessonId…] }]      prereqs  { n: [n…] } (kit/learning/chapter-map.js)
//     statusOf  lessonId → topic status (kit/learning/topic-status.js: new, started, learned, practised, mastered, revise)
//     rightOf   lessonId → whether its answers include right ones (first tries); Proficient counts these
//   → { nodes: [{ n, id, title, level, score, revise, layer, row, pre, next, counts, total }], edges, layers,
//       nextUp: [nodes within reach], holding: [nodes holding the most back], summary }
//
// Levels (one scale for every course, after Khan Academy's): Not started → Learning → Practising → Proficient →
// Mastered. They come only from evidence: opening a lesson is "Learning" at most; Proficient needs every lesson done
// with right answers across at least half of them; Mastered needs most lessons mastered (topic-status rules). A chapter
// whose recent answers have slipped is flagged "Needs revision" whatever its level.

export const LEVELS = [
  { key: "none", label: "Not started", what: "Nothing opened yet." },
  { key: "learning", label: "Learning", what: "Lessons opened or completed; answers still to come." },
  { key: "practising", label: "Practising", what: "Answering questions; not every lesson done yet." },
  { key: "proficient", label: "Proficient", what: "Every lesson done, with right answers across at least half of them." },
  { key: "mastered", label: "Mastered", what: "Most lessons mastered: right, again and again, over time." },
];
export const LEVEL = Object.fromEntries(LEVELS.map((l, i) => [l.key, { ...l, rank: i }]));
const WEIGHT = { new: 0, started: 0.2, learned: 0.45, practised: 0.75, mastered: 1, revise: 0.4 };

/**
 * one chapter's level from its lessons' statuses; `right` is how many of its lessons have right answers (first tries,
 * kit/learning/topic-status.js lessonSignals). A lesson answered wrongly is still "practised", so Proficient counts
 * right answers, not answers. Without it, only mastered lessons count as right.
 */
export function chapterLevel(statuses, right = statuses.filter((s) => s === "mastered").length) {
  const c = { new: 0, started: 0, learned: 0, practised: 0, mastered: 0, revise: 0 };
  for (const s of statuses) c[s in c ? s : "new"]++;
  const total = statuses.length || 1, done = c.learned + c.practised + c.mastered + c.revise, answered = c.practised + c.mastered + c.revise;
  const score = statuses.reduce((a, s) => a + (WEIGHT[s] ?? 0), 0) / total;
  let level = "none";
  if (c.mastered / total >= 0.8) level = "mastered";
  else if (done === total && right / total >= 0.5 && !c.revise) level = "proficient";
  else if (answered) level = "practising";
  else if (c.started || c.learned) level = "learning";
  return { level, score, counts: c, total: statuses.length, revise: c.revise };
}

/** layer = the longest chain of prerequisites beneath a chapter, so the map reads from foundations outwards */
export function layersOf(ns, prereqs) {
  const memo = new Map(), visiting = new Set();
  const depth = (n) => {
    if (memo.has(n)) return memo.get(n);
    if (visiting.has(n)) return 0;   // a cycle in hand-written data: don't loop (tests reject cycles)
    visiting.add(n);
    const d = (prereqs[n] || []).filter((p) => ns.includes(p)).reduce((m, p) => Math.max(m, depth(p) + 1), 0);
    visiting.delete(n); memo.set(n, d); return d;
  };
  return new Map(ns.map((n) => [n, depth(n)]));
}

/** every chapter that builds (directly or not) on n */
function dependents(n, next) { const seen = new Set(), go = (x) => { for (const y of next.get(x) || []) if (!seen.has(y)) { seen.add(y); go(y); } }; go(n); return seen; }

export function masteryMap(chapters, prereqs = {}, statusOf = () => "new", rightOf = (id) => statusOf(id) === "mastered") {
  const ns = chapters.map((c) => c.n), layer = layersOf(ns, prereqs), next = new Map(ns.map((n) => [n, []]));
  for (const n of ns) for (const p of prereqs[n] || []) if (next.has(p)) next.get(p).push(n);
  const nodes = chapters.map((c) => ({ n: c.n, id: c.id, title: c.title, ...chapterLevel(c.lessons.map(statusOf), c.lessons.filter(rightOf).length), layer: layer.get(c.n), pre: (prereqs[c.n] || []).filter((p) => next.has(p)), next: next.get(c.n) }));
  const byN = new Map(nodes.map((x) => [x.n, x]));
  const layers = [];
  for (const x of nodes) (layers[x.layer] ||= []).push(x);
  layers.forEach((col) => col.sort((a, b) => a.n - b.n).forEach((x, i) => { x.row = i; }));
  const edges = nodes.flatMap((x) => x.pre.map((p) => ({ from: p, to: x.n })));
  const rank = (x) => LEVEL[x.level].rank;
  // within reach: not yet proficient, and everything it builds on is at least being practised
  const nextUp = nodes.filter((x) => rank(x) < LEVEL.proficient.rank && x.pre.every((p) => rank(byN.get(p)) >= LEVEL.practising.rank))
    .sort((a, b) => (rank(b) - rank(a)) || (a.layer - b.layer) || (a.n - b.n)).slice(0, 4);
  // holding you back: started but shaky (or slipping), weighted by how much of the course builds on it
  const holding = nodes.filter((x) => (x.revise || (rank(x) >= LEVEL.learning.rank && rank(x) < LEVEL.proficient.rank)))
    .map((x) => ({ ...x, unlocks: dependents(x.n, next).size })).sort((a, b) => (b.revise - a.revise) || (b.unlocks - a.unlocks) || (a.n - b.n)).slice(0, 3);
  const summary = Object.fromEntries(LEVELS.map((l) => [l.key, nodes.filter((x) => x.level === l.key).length]));
  summary.revise = nodes.filter((x) => x.revise).length;
  summary.score = nodes.length ? nodes.reduce((a, x) => a + x.score * x.total, 0) / Math.max(1, nodes.reduce((a, x) => a + x.total, 0)) : 0;
  return { nodes, edges, layers, nextUp, holding, summary };
}

/** checks for hand-written prerequisite data: unknown chapters, self-links and cycles (tests/mastery-map.test.mjs) */
export function checkPrereqs(ns, prereqs) {
  const problems = [], set = new Set(ns);
  for (const [k, ps] of Object.entries(prereqs)) {
    if (!set.has(Number(k))) problems.push(`chapter ${k} doesn't exist`);
    for (const p of ps) { if (!set.has(p)) problems.push(`${k} builds on ${p}, which doesn't exist`); if (p === Number(k)) problems.push(`${k} builds on itself`); }
  }
  const state = new Map();
  const visit = (n, path) => {
    if (state.get(n) === 1) { problems.push(`cycle: ${[...path, n].join(" → ")}`); return; }
    if (state.get(n) === 2) return;
    state.set(n, 1); for (const p of prereqs[n] || []) visit(p, [...path, n]); state.set(n, 2);
  };
  for (const n of ns) visit(n, []);
  return problems;
}
