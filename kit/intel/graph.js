// The evidence-weighted knowledge graph: "A underpins B" links between concepts, each with a confidence score and
// the evidence behind it, so Gradify can say how sure it is and why, and act only on links it's sure of.
//
// Evidence, and how much each kind counts (combined as independent signals: 1 − Π(1 − w)):
//   course          a Gradify course lists A as a prerequisite of B (an expert wrote it)             0.90  explicit
//   definition      A defines a term ("What is stroke volume?") that B's cards use                    0.45 per term, inferred
//   performance     the learner's answers fit the link: A answered and insecure while B is weak      0.25  inferred
//   contradiction   B is strong, with high certainty, while A is weak: B doesn't seem to need A      −0.25
// A link is acted on (knowledge debt, card order) only at confidence ≥ 0.5. So a single shared term is never enough
// by itself: it needs a second term, the learner's own answers agreeing, or a course saying so. Concept identity
// (kit/intel/identity.js) lets a course's prerequisite apply to the same concepts in the learner's notes.
// Pure, so Node can test it (tests/intel3.test.mjs).
import { conceptId } from "./identity.js";

export const USE_AT = 0.5;
export const WEIGHT = { course: 0.9, definition: 0.45, performance: 0.25, contradiction: -0.25 };
const insecure = (c) => c && (c.level === "shaky" || c.level === "fading" || c.level === "learning" || c.mastery < 0.6);
const weak = (c) => c && (c.level === "shaky" || c.level === "fading" || (c.seen > 0 && c.mastery < 0.5));

/**
 * @param {{ noteEdges?: object[], concepts?: object[], courses?: object[], aliases?: Map }} o
 *   noteEdges from dependencyGraph (kit/intel/debt.js); concepts: learner memory; courses: summaries with `prereqs`
 *   ([{ from, to }] module names) from kit/learning/learner-data.js
 * @returns {object[]} edges { from, to, fromName, toName, confidence, kind: "explicit"|"inferred", used, sources[], term, card }
 */
export function weightedGraph({ noteEdges = [], concepts = [], courses = [], aliases = new Map() } = {}) {
  const byKey = new Map(concepts.map((c) => [c.key, c]));
  const keysOfId = new Map();
  for (const c of concepts) { const id = conceptId(c.name, aliases); if (!id) continue; if (!keysOfId.has(id)) keysOfId.set(id, []); keysOfId.get(id).push(c.key); }
  const edges = new Map();
  const edge = (from, to, names = {}) => {
    const k = `${from}>${to}`;
    if (!edges.has(k)) edges.set(k, { from, to, fromName: names.from || byKey.get(from)?.name || from, toName: names.to || byKey.get(to)?.name || to, sources: [], term: null, card: null });
    return edges.get(k);
  };
  // the learner's notes: one source per term A defines and B uses
  for (const e of noteEdges) {
    const x = edge(e.from, e.to);
    for (const t of e.terms || [e.term]) x.sources.push({ kind: "definition", weight: WEIGHT.definition, note: `“${t}” is defined in ${x.fromName} and used in ${x.toName}${t === e.term && e.card ? ` (“${e.card}”)` : ""}.` });
    x.term = e.term; x.card = e.card;
  }
  // courses: explicit prerequisites, between course modules and, through concept identity, between the same concepts
  // in the learner's notes
  for (const c of courses) for (const p of c.prereqs || []) {
    const note = `${c.name || c.site} lists ${p.from} as a prerequisite of ${p.to}.`;
    edge(`course:${c.site}:${p.from}`, `course:${c.site}:${p.to}`, { from: p.from, to: p.to }).sources.push({ kind: "course", weight: WEIGHT.course, note });
    for (const a of keysOfId.get(conceptId(p.from, aliases)) || []) for (const b of keysOfId.get(conceptId(p.to, aliases)) || []) if (a !== b) edge(a, b).sources.push({ kind: "course", weight: WEIGHT.course, note });
  }
  // the learner's own answers, for or against
  for (const x of edges.values()) {
    const a = byKey.get(x.from), b = byKey.get(x.to);
    if (!a || !b) continue;
    if (a.seen > 0 && a.answers >= 2 && insecure(a) && weak(b)) x.sources.push({ kind: "performance", weight: WEIGHT.performance, note: `Your answers fit: ${a.name} isn't secure and ${b.name} is weak.` });
    else if (weak(a) && (b.level === "strong" || b.level === "mastered") && b.certaintyLabel === "high") x.sources.push({ kind: "contradiction", weight: WEIGHT.contradiction, note: `${b.name} is strong while ${a.name} is weak, so ${b.name} may not depend on it much.` });
  }
  return [...edges.values()].map((x) => {
    const pos = x.sources.filter((s) => s.weight > 0), neg = x.sources.filter((s) => s.weight < 0).reduce((t, s) => t + s.weight, 0);
    const confidence = Math.max(0, Math.min(0.97, 1 - pos.reduce((p, s) => p * (1 - s.weight), 1) + neg));
    return { ...x, confidence: Math.round(confidence * 100) / 100, kind: pos.some((s) => s.kind === "course") ? "explicit" : "inferred", used: confidence >= USE_AT };
  }).sort((p, q) => q.confidence - p.confidence);
}

/** Only the links Gradify acts on, in the shape knowledge debt and card ordering read. */
export const usable = (edges) => edges.filter((e) => e.used && !e.from.startsWith("course:"));

/** Depth of each concept below its foundations (0 = nothing underneath), from usable links; cycles are cut. */
export function depthOf(edges) {
  const parents = new Map();
  for (const e of edges) { if (!parents.has(e.to)) parents.set(e.to, []); parents.get(e.to).push(e.from); }
  const memo = new Map();
  const d = (k, seen = new Set()) => {
    if (memo.has(k)) return memo.get(k);
    if (seen.has(k)) return 0;
    seen.add(k);
    const v = Math.max(0, ...(parents.get(k) || []).map((p) => d(p, seen) + 1));
    memo.set(k, v); return v;
  };
  return (k) => d(k);
}
