// The concept graph: what each part of a course builds on, for any subject. Pure functions (no DOM), so the
// course engine, QA scripts and tests share it. A course turns it on by giving its config a `concepts` spec:
//
//   concepts: {
//     // module-level prerequisites: "<unit id>/<module name>" → the modules it builds on. A bare unit id ("u07")
//     // stands for every module in that unit.
//     modules: { "u07/Integration": ["u07/Differentiation", "u03/Functions"], … },
//     // optional lesson-level prerequisites, by lesson id, for links finer than a module
//     lessons: { "u07-21": ["u07-09"] },
//   }
//
// The graph's nodes are modules; each lesson belongs to its module's node. Lessons inside a module are taken in
// the order the syllabus gives them. Nothing here is subject-specific: maths, physics, law or programming all
// describe their prerequisites the same way.

export const nodeKey = (unitId, module) => `${unitId}/${module || "(unit)"}`;

/** Build the graph from a course's units and its concepts spec. */
export function conceptGraph(units, spec = {}) {
  const nodes = new Map(), lessonNode = new Map(), unitNodes = new Map(), lessonById = new Map();
  let order = 0;
  for (const u of units) {
    unitNodes.set(u.id, []);
    for (const l of u.lessons) {
      const key = nodeKey(u.id, l.module);
      if (!nodes.has(key)) { nodes.set(key, { key, unit: u.id, unitN: u.n, module: l.module || null, lessons: [], order: order++ }); unitNodes.get(u.id).push(key); }
      nodes.get(key).lessons.push(l.id); lessonNode.set(l.id, key); lessonById.set(l.id, { ...l, unit: u.id });
    }
  }
  const unknown = [], prereq = new Map([...nodes.keys()].map((k) => [k, new Set()]));
  const expand = (ref) => (unitNodes.has(ref) ? unitNodes.get(ref) : nodes.has(ref) ? [ref] : (unknown.push(ref), []));
  for (const [key, reqs] of Object.entries(spec.modules || {})) {
    const targets = expand(key);
    for (const t of targets) for (const r of reqs) for (const k of expand(r)) if (k !== t) prereq.get(t).add(k);
  }
  const lessonPrereq = new Map();
  for (const [lid, reqs] of Object.entries(spec.lessons || {})) {
    if (!lessonById.has(lid)) { unknown.push(lid); continue; }
    lessonPrereq.set(lid, reqs.filter((r) => lessonById.has(r) || (unknown.push(r), false)));
  }
  const dependents = new Map([...nodes.keys()].map((k) => [k, new Set()]));
  for (const [k, rs] of prereq) for (const r of rs) dependents.get(r).add(k);
  return { nodes, lessonNode, lessonById, prereq, dependents, lessonPrereq, unknown };
}

/** Problems a reviewer should see: unknown references, cycles, and prerequisites taught after what needs them. */
export function validateGraph(g) {
  const cycles = [], state = new Map(), stack = [];
  const visit = (k) => {
    state.set(k, 1); stack.push(k);
    for (const r of g.prereq.get(k)) {
      if (state.get(r) === 1) cycles.push([...stack.slice(stack.indexOf(r)), r]);
      else if (!state.get(r)) visit(r);
    }
    stack.pop(); state.set(k, 2);
  };
  for (const k of g.nodes.keys()) if (!state.get(k)) visit(k);
  const forward = [];
  for (const [k, rs] of g.prereq) for (const r of rs) if (g.nodes.get(r).order > g.nodes.get(k).order) forward.push({ node: k, needs: r });
  const isolated = [...g.nodes.keys()].filter((k) => !g.prereq.get(k).size && !g.dependents.get(k).size);
  return { unknown: [...new Set(g.unknown)], cycles, forward, isolated };
}

/** Everything a node builds on, nearest first, each with its distance (1 = direct prerequisite). */
export function ancestors(g, key, { maxDepth = Infinity } = {}) {
  const out = new Map(), queue = [[key, 0]];
  while (queue.length) {
    const [k, d] = queue.shift(); if (d >= maxDepth) continue;
    for (const r of g.prereq.get(k) || []) if (!out.has(r) && r !== key) { out.set(r, d + 1); queue.push([r, d + 1]); }
  }
  return [...out].map(([k, depth]) => ({ key: k, depth }));
}

/** Everything that builds on a node (what a weakness here puts at risk). */
export function descendants(g, key) {
  const out = new Set(), queue = [key];
  while (queue.length) for (const d of g.dependents.get(queue.shift()) || []) if (!out.has(d)) { out.add(d); queue.push(d); }
  return [...out];
}

/** Prerequisites for a lesson: its own lesson-level links, earlier lessons in its module, then its module's prerequisites. */
export function prerequisitesOfLesson(g, lessonId) {
  const key = g.lessonNode.get(lessonId); if (!key) return { lessons: [], modules: [] };
  const inModule = g.nodes.get(key).lessons, i = inModule.indexOf(lessonId);
  return { lessons: [...(g.lessonPrereq.get(lessonId) || [])], earlier: inModule.slice(0, i), modules: [...g.prereq.get(key)] };
}

/**
 * Weak foundations behind a lesson, for weakness detection and remediation. masteryOf(lessonIds) returns the
 * learner's mastery (0–1) on those lessons, or null when there isn't enough evidence; only measured weaknesses
 * are reported, never guesses. Root causes come first: the deepest weak prerequisite, then nearer ones.
 */
export function weakPrerequisites(g, lessonId, masteryOf, { threshold = 0.6, maxDepth = 3 } = {}) {
  const key = g.lessonNode.get(lessonId); if (!key) return [];
  const out = [];
  for (const { key: k, depth } of ancestors(g, key, { maxDepth })) {
    const m = masteryOf(g.nodes.get(k).lessons);
    if (m != null && m < threshold) out.push({ key: k, depth, mastery: m, node: g.nodes.get(k) });
  }
  for (const lid of g.lessonPrereq.get(lessonId) || []) {
    const m = masteryOf([lid]);
    if (m != null && m < threshold) out.push({ key: `lesson:${lid}`, depth: 1, mastery: m, lesson: g.lessonById.get(lid) });
  }
  return out.sort((a, b) => b.depth - a.depth || a.mastery - b.mastery);
}

/**
 * A study order to reach a target: every prerequisite module not yet secure, each after the modules it needs
 * (a topological order), ending with the target. isSecure(node) decides what can be skipped.
 */
export function learningPath(g, targetKey, isSecure = () => false) {
  const need = new Set([targetKey, ...ancestors(g, targetKey).map((a) => a.key)]), out = [], seen = new Set();
  const visit = (k) => {
    if (seen.has(k)) return; seen.add(k);
    for (const r of [...g.prereq.get(k)].sort((a, b) => g.nodes.get(a).order - g.nodes.get(b).order)) if (need.has(r)) visit(r);
    if (k === targetKey || !isSecure(g.nodes.get(k))) out.push(k);
  };
  visit(targetKey);
  return out;
}

/** Summary numbers for reports. */
export function graphStats(g) {
  const edges = [...g.prereq.values()].reduce((a, s) => a + s.size, 0);
  const depth = new Map(); const d = (k) => depth.has(k) ? depth.get(k) : (depth.set(k, 0), depth.set(k, 1 + Math.max(-1, ...[...g.prereq.get(k)].map(d))), depth.get(k));
  for (const k of g.nodes.keys()) d(k);
  const roots = [...g.nodes.keys()].filter((k) => !g.prereq.get(k).size);
  return { nodes: g.nodes.size, edges, lessonEdges: [...g.lessonPrereq.values()].reduce((a, r) => a + r.length, 0), roots: roots.length, longestChain: 1 + Math.max(0, ...depth.values()) };
}
