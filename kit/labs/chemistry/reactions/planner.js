// Synthesis planning over the predictor's own reactions: a breadth-first search from a starting material, where
// every edge is a reagent the predictor says works (major or only products; minor products are not followed). Routes
// a learner builds are checked the same way, so any route the rules support is accepted, not just a stored answer.
// Retrosynthesis walks the same graph backwards: "what could make this, starting from the given material?".
// No DOM; tested in tests/planner.test.mjs.
import * as K from "../skeletal.js";
import { REAGENTS, predict, drawSmiles, atLevel } from "./predictor.js";

export const hashOf = (m) => K.analyse(m).hash;
const nameOf = (m) => { const A = K.analyse(m); return A.name?.name || A.formula; };
const cache = new Map();
/** The useful products of every reagent (at or below a level) on a molecule: [{ reagent, m, hash }]. */
export function moves(m, level = "university") {
  const h = hashOf(m), out = [];
  for (const r of REAGENTS) {
    if (!atLevel(r, level)) continue;
    const k = `${h}|${r.id}`; let res = cache.get(k);
    if (!res) { res = predict(m, r.id); res = res.reacts ? res.products.filter((p) => p.role !== "minor" && !K.analyse(p.m).charge).map((p) => ({ m: p.m, hash: hashOf(p.m) })) : []; if (cache.size > 20000) cache.clear(); cache.set(k, res); }
    for (const p of res) if (p.hash !== h) out.push({ reagent: r.id, m: p.m, hash: p.hash });
  }
  return out;
}
/** Breadth-first exploration: { nodes: Map(hash → { m, depth }), edges: [{ from, to, reagent }] }. */
export function explore(start, { depth = 3, level = "university", limit = 260, stopAt = null } = {}) {
  const h0 = hashOf(start), nodes = new Map([[h0, { m: start, depth: 0 }]]), edges = [], queue = [h0];
  while (queue.length) {
    const h = queue.shift(), n = nodes.get(h); if (n.depth >= depth) continue;
    for (const mv of moves(n.m, level)) {
      edges.push({ from: h, to: mv.hash, reagent: mv.reagent });
      if (!nodes.has(mv.hash) && nodes.size < limit) { nodes.set(mv.hash, { m: mv.m, depth: n.depth + 1 }); queue.push(mv.hash); }
    }
    if (stopAt && nodes.has(stopAt) && nodes.get(stopAt).depth <= n.depth + 1) break;
  }
  return { start: h0, nodes, edges };
}
/** Shortest routes from start to target (up to max), each [{ reagent, from, to }] (hashes; graph.nodes has the molecules). */
export function routes(start, target, opts = {}) {
  const t = typeof target === "string" ? target : hashOf(target), g = explore(start, { ...opts, stopAt: t });
  if (!g.nodes.has(t)) return { graph: g, routes: [] };
  const out = [], max = opts.max || 6;
  const back = (h, path) => {
    if (out.length >= max) return;
    if (h === g.start) { out.push([...path].reverse()); return; }
    const d = g.nodes.get(h).depth;
    for (const e of g.edges.filter((x) => x.to === h && g.nodes.get(x.from)?.depth === d - 1)) back(e.from, [...path, e]);
  };
  back(t, []);
  return { graph: g, routes: out };
}
/** Retrosynthesis: the reagent and precursor pairs in the graph that give this molecule, nearest the start first. */
export function precursors(graph, hash) {
  const seen = new Set();
  return graph.edges.filter((e) => e.to === hash && graph.nodes.has(e.from) && e.from !== hash).sort((a, b) => graph.nodes.get(a.from).depth - graph.nodes.get(b.from).depth).filter((e) => { const k = `${e.from}|${e.reagent}`; if (seen.has(k)) return false; seen.add(k); return true; });
}
/** Checks a learner's step: does this reagent turn `from` into a molecule with this hash (as a major or only product)? */
export function checkStep(from, reagentId, toHash) { return moves(from).some((mv) => mv.reagent === reagentId && mv.hash === toHash); }

/** Synthesis challenges. best: the length of the shortest route the rules allow. */
export const TASKS = [
  { id: "ethene-acid", level: "foundation", from: ["ethene", "C=C"], to: ["ethanoic acid", "CC(=O)O"], best: 2, text: "Make ethanoic acid from ethene." },
  { id: "ethanol-ester", level: "foundation", from: ["ethanol", "CCO"], to: ["ethyl ethanoate", "CCOC(C)=O"], best: 2, text: "Make ethyl ethanoate from ethanol (ethanol is also available as a reagent)." },
  { id: "propene-ketone", level: "foundation", from: ["propene", "C=CC"], to: ["propanone", "CC(C)=O"], best: 2, text: "Make propanone from propene." },
  { id: "propanol-switch", level: "intermediate", from: ["propan-1-ol", "CCCO"], to: ["propan-2-ol", "CC(C)O"], best: 2, text: "Move the –OH: make propan-2-ol from propan-1-ol." },
  { id: "chain-acid", level: "intermediate", from: ["bromoethane", "CCBr"], to: ["propanoic acid", "CCC(=O)O"], best: 2, text: "Add a carbon: make propanoic acid from bromoethane." },
  { id: "butene-ketone", level: "intermediate", from: ["but-1-ene", "C=CCC"], to: ["butanone", "CCC(C)=O"], best: 2, text: "Make butanone from but-1-ene." },
  { id: "lactic", level: "intermediate", from: ["ethanal", "CC=O"], to: ["2-hydroxypropanoic acid", "CC(O)C(=O)O"], best: 2, text: "Make lactic acid (2-hydroxypropanoic acid) from ethanal." },
  { id: "aryl-alcohol", level: "intermediate", from: ["benzene", "c1ccccc1"], to: ["1-phenylethan-1-ol", "CC(O)c1ccccc1"], best: 2, text: "Make 1-phenylethan-1-ol from benzene." },
  { id: "amide", level: "intermediate", from: ["ethanol", "CCO"], to: ["ethanamide", "CC(N)=O"], best: 3, text: "Make ethanamide from ethanol." },
  { id: "amine-chain", level: "advanced", from: ["bromoethane", "CCBr"], to: ["propylamine", "CCCN"], best: 2, text: "Make propylamine (one more carbon) from bromoethane." },
  { id: "tertiary", level: "advanced", from: ["propan-2-ol", "CC(C)O"], to: ["2-methylpropan-2-ol", "CC(C)(C)O"], best: 2, text: "Build a tertiary alcohol: make 2-methylpropan-2-ol from propan-2-ol." },
  { id: "aryl-tertiary", level: "advanced", from: ["benzene", "c1ccccc1"], to: ["2-phenylpropan-2-ol", "CC(C)(O)c1ccccc1"], best: 2, text: "Make 2-phenylpropan-2-ol from benzene." },
];
export function task(id) { const t = TASKS.find((x) => x.id === id); return t ? { ...t, start: drawSmiles(t.from[1]), target: drawSmiles(t.to[1]), targetHash: hashOf(drawSmiles(t.to[1])) } : null; }
export { nameOf };
