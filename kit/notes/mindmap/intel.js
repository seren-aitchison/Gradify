// Gradify Intelligence for the spidermap: what the notes themselves say about how the terms fit together.
// Like the rest of Gradify Intelligence (kit/intel/), nothing is guessed: every link and suggestion carries the
// words from the notes it rests on, and a confidence worked out the same way as the knowledge graph
// (kit/intel/graph.js): a term named inside another's definition is evidence one builds on the other.
// Pure, so Node can test it (tests/mindmap.test.mjs).
//
//   builds    A is named in B's definition: learn A first          (term 0.6, abbreviation 0.55, one word 0.45)
//   contrast  A and B are defined in the same shape: easy to mix up ("phase when…" / "phase when…")
const STOP = new Set("a an the and or of to in on at by for with from into is are was were be been this that these those it its as per when which who what how all each so than then there their they them has have had not no but if about over under one two four first second also more most very can will may".split(" "));
const words = (s) => (String(s).toLowerCase().match(/[a-z0-9]+/g) || []).filter((w) => w.length > 2 && !STOP.has(w)).map((w) => w.replace(/(ies)$/, "y").replace(/(s|ing|ed)$/, ""));
const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
export const USE_AT = 0.45;

/** Links between terms. @returns {{ from, to, kind, confidence, evidence, why }[]} */
export function findLinks(map) {
  const terms = map.nodes.filter((n) => n.type === "term" && n.fact);
  const out = [];
  for (const a of terms) for (const b of terms) {
    if (a === b) continue;
    const def = ` ${b.fact.def.toLowerCase()} `, name = a.fact.term.toLowerCase();
    let conf = 0, hit = null;
    if (new RegExp(`\\b${escRe(name)}(s|es)?\\b`).test(def)) { conf = name.includes(" ") ? 0.6 : 0.45; hit = a.fact.term; }
    else if (a.fact.ab && new RegExp(`\\b${escRe(a.fact.ab)}\\b`).test(` ${b.fact.def} `)) { conf = 0.55; hit = a.fact.ab; }
    if (conf >= USE_AT) out.push({ from: a.id, to: b.id, kind: "builds", confidence: conf, evidence: b.fact.src || b.fact.text, why: `${b.fact.term}'s definition uses “${hit}”.` });
  }
  // same-shape definitions: they share a first or last word and most of their meaning words
  for (let i = 0; i < terms.length; i++) for (let j = i + 1; j < terms.length; j++) {
    const A = terms[i], B = terms[j];
    if (A.fact.kind !== B.fact.kind) continue;
    const wa = words(A.fact.def), wb = words(B.fact.def);
    if (!wa.length || !wb.length || !(wa[0] === wb[0] || wa.at(-1) === wb.at(-1))) continue;
    const sa = new Set(wa), common = new Set(wb.filter((w) => sa.has(w))), union = new Set([...wa, ...wb]);
    const overlap = common.size / union.size;
    // two-word definitions ("atrial depolarisation" / "ventricular depolarisation") only need one word in common
    if (overlap < 0.25 || (common.size < 2 && (wa.length > 3 || wb.length > 3))) continue;
    // show the notes' own words, not their stems
    const shown = [...common].map((w) => (String(A.fact.def).toLowerCase().match(new RegExp(`\\b${escRe(w)}[a-z]*`)) || [w])[0]);
    if (out.some((l) => (l.from === A.id && l.to === B.id) || (l.from === B.id && l.to === A.id))) continue;
    out.push({ from: A.id, to: B.id, kind: "contrast", confidence: Math.min(0.9, 0.4 + overlap), evidence: `${A.fact.text} ${B.fact.text}`,
      why: `Both are defined with “${shown.slice(0, 3).join(", ")}”, so they're easy to mix up.` });
  }
  return out;
}

// Learning order: a term other terms build on comes before them; otherwise keep the notes' own order.
export function learningOrder(map, links) {
  const terms = map.nodes.filter((n) => n.type === "term");
  const needs = new Map(terms.map((t) => [t.id, new Set()]));
  for (const l of links) if (l.kind === "builds" && needs.has(l.to) && needs.has(l.from)) needs.get(l.to).add(l.from);
  const done = new Set(), out = [];
  const visit = (id, path = new Set()) => {
    if (done.has(id) || path.has(id)) return;
    path.add(id);
    for (const p of needs.get(id) || []) visit(p, path);
    done.add(id); out.push(id);
  };
  terms.forEach((t) => visit(t.id));
  return out;
}

/**
 * Everything the Intelligence panel shows. Each insight: { kind, icon, title, detail, ids: node ids to light up, evidence? }
 * @param {object} map from buildMap
 * @param {{ questions?: {group, type, question, answer}[] }} [o] deeper questions from the studio, by topic index
 */
export function insights(map, { questions = [] } = {}) {
  const links = findLinks(map);
  const terms = map.nodes.filter((n) => n.type === "term");
  const topics = map.nodes.filter((n) => n.type === "topic");
  const label = (id) => map.byId.get(id)?.label || id;
  const learnt = terms.filter((t) => t.learnt).length;
  const order = learningOrder(map, links);
  const out = [];
  // start with a term whose prerequisites are known, preferring the one that unlocks the most
  const unlocks = (id) => links.filter((l) => l.kind === "builds" && l.from === id).length;
  const ready = order.filter((id) => !map.byId.get(id).learnt && !links.some((l) => l.kind === "builds" && l.to === id && !map.byId.get(l.from).learnt));
  const next = ready.reduce((best, id) => (best == null || unlocks(id) > unlocks(best) ? id : best), null);
  if (next) {
    const builds = links.filter((l) => l.kind === "builds" && l.from === next);
    out.push({ kind: "next", icon: "target", title: `Start with ${label(next)}`,
      detail: builds.length ? `${builds.map((l) => label(l.to)).slice(0, 3).join(", ")} ${builds.length === 1 ? "builds" : "build"} on it, so it unlocks the rest.` : "It's the first term in your notes you haven't marked as known.",
      ids: [next, ...builds.map((l) => l.to)], evidence: builds[0]?.evidence });
  } else if (terms.length) out.push({ kind: "done", icon: "check", title: "You know every term here", detail: "Keep them fresh with the flashcard feed: Gradify brings each back just before you'd forget it.", ids: [] });
  // the hub: the term most connected to others
  const degree = new Map();
  for (const l of links) for (const id of [l.from, l.to]) degree.set(id, (degree.get(id) || 0) + 1);
  const hub = [...degree.entries()].sort((a, b) => b[1] - a[1])[0];
  if (hub && hub[1] >= 2) out.push({ kind: "hub", icon: "link", title: `${label(hub[0])} is the hub`, detail: `It connects to ${hub[1]} other terms. Understanding it well pays off across the map.`, ids: [hub[0], ...links.filter((l) => l.from === hub[0] || l.to === hub[0]).map((l) => (l.from === hub[0] ? l.to : l.from))] });
  for (const l of links.filter((x) => x.kind === "builds").slice(0, 4)) {
    const a = map.byId.get(l.from), b = map.byId.get(l.to);
    out.push({ kind: "builds", icon: "route", title: `${label(l.to)} builds on ${label(l.from)}`, detail: a.topic !== b.topic ? `A link across topics: ${l.why}` : l.why, ids: [l.from, l.to], evidence: l.evidence, confidence: l.confidence });
  }
  for (const l of links.filter((x) => x.kind === "contrast").slice(0, 4)) {
    out.push({ kind: "contrast", icon: "alert", title: `Don't mix up ${label(l.from)} and ${label(l.to)}`, detail: l.why, ids: [l.from, l.to], evidence: l.evidence, confidence: l.confidence });
  }
  for (const q of questions.slice(0, 6)) {
    const t = topics.find((x) => x.topic === q.group);
    out.push({ kind: "question", icon: "bulb", title: q.question, detail: q.answer, ids: t ? [t.id] : [], qtype: q.type });
  }
  return { links, order, learnt, total: terms.length, insights: out };
}
