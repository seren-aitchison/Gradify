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
  // a formula uses a term when its symbol or name appears in it: CO = SV × HR uses stroke volume (SV)
  for (const e of map.nodes.filter((n) => n.type === "eq")) for (const t of terms) {
    const hit = (t.fact.ab && new RegExp(`(^|[^A-Za-z])${escRe(t.fact.ab)}([^A-Za-z]|$)`).test(e.label)) || new RegExp(`\\b${escRe(t.fact.term.toLowerCase())}\\b`).test(e.label.toLowerCase());
    if (hit) out.push({ from: t.id, to: e.id, kind: "formula", confidence: 0.9, evidence: e.label, why: `${e.label} uses ${t.fact.ab || t.fact.term}.` });
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

// Words used in two or more definitions that no term on the map defines, most used first.
export function gaps(map) {
  const terms = map.nodes.filter((n) => n.type === "term" && n.fact);
  const named = new Set(terms.flatMap((t) => words(`${t.fact.term} ${t.fact.ab || ""}`)));
  const COMMON = new Set("phase amount much when befor after each per make made part type kind thing way used use the".split(" "));
  const uses = new Map();
  for (const t of terms) for (const w of new Set(words(t.fact.def))) {
    if (w.length < 5 || named.has(w) || COMMON.has(w) || /\d/.test(w)) continue;
    if (!uses.has(w)) uses.set(w, []);
    uses.get(w).push(t.id);
  }
  return [...uses.entries()].filter(([, ids]) => ids.length >= 2).sort((a, b) => b[1].length - a[1].length || b[0].length - a[0].length).map(([w, ids]) => {
    // the notes' own spelling of the word, not its stem
    const raw = terms.find((t) => t.id === ids[0]).fact.def.toLowerCase().match(new RegExp(`\\b${w}[a-z]*`));
    return { word: raw ? raw[0] : w, ids };
  });
}

/**
 * Everything the Intelligence panel shows. Each insight: { kind, icon, title, detail, ids: node ids to light up, evidence? }
 * @param {object} map from buildMap
 * @param {{ questions?: object[], memory?: { terms: Map } }} [o] deeper questions from the studio (by topic index), and
 *   the learner's memory of each term (memory.js), when they have cards for these notes
 */
export function insights(map, { questions = [], memory = null } = {}) {
  const links = findLinks(map);
  const mem = memory?.terms || new Map();
  const terms = map.nodes.filter((n) => n.type === "term");
  const topics = map.nodes.filter((n) => n.type === "topic");
  const label = (id) => map.byId.get(id)?.label || id;
  // known: marked as known here or in the flashcard feed, or strong in the learner's real memory
  const known = (id) => Boolean(map.byId.get(id)?.learnt || mem.get(id)?.state === "strong");
  const learnt = terms.filter((t) => known(t.id)).length;
  const order = learningOrder(map, links);
  const builds = links.filter((l) => l.kind === "builds");
  const out = [];

  // 1. from the learner's memory: confident mistakes first, then a weak foundation, then what's fading
  const sure = terms.filter((t) => mem.get(t.id)?.sureWrong).sort((a, b) => mem.get(b.id).sureWrong - mem.get(a.id).sureWrong);
  for (const t of sure.slice(0, 2)) {
    const m = mem.get(t.id);
    out.push({ kind: "shaky", icon: "alert", title: `You were sure, but wrong, about ${label(t.id)}`, detail: `${m.sureWrong} confident ${m.sureWrong === 1 ? "mistake" : "mistakes"} in the last month. A confident mistake is a misconception: re-read the definition, then test yourself again.`, ids: [t.id], evidence: t.fact?.src });
  }
  for (const l of builds) {
    const m = mem.get(l.from);
    if (!m || !["shaky", "fading"].includes(m.state) || known(l.to)) continue;
    out.push({ kind: "debt", icon: "route", title: `Shore up ${label(l.from)} before ${label(l.to)}`, detail: `${label(l.to)} builds on it, and your memory of ${label(l.from)} is ${m.state}${m.recall != null ? ` (about ${Math.round(m.recall * 100)}% recall)` : ""}.`, ids: [l.from, l.to], evidence: l.evidence, confidence: l.confidence });
    break;
  }
  const fading = terms.filter((t) => { const m = mem.get(t.id); return m && m.state !== "new" && m.fadesIn != null && m.fadesIn <= 3; }).sort((a, b) => mem.get(a.id).fadesIn - mem.get(b.id).fadesIn);
  if (fading.length) {
    const f = mem.get(fading[0].id).fadesIn;
    out.push({ kind: "fading", icon: "clock", title: fading.length === 1 ? `${label(fading[0].id)} is fading` : `${fading.length} terms are fading`,
      detail: `${fading.slice(0, 3).map((t) => label(t.id)).join(", ")}${fading.length > 3 ? " and more" : ""} ${f === 0 ? "already below" : `drop${fading.length === 1 ? "s" : ""} below`} 70% recall${f === 0 ? "" : ` within ${f === 1 ? "a day" : `${f} days`}`}. A quick review now resets the clock.`,
      ids: fading.map((t) => t.id) });
  }
  // the weakest topic, by the average recall of the terms the learner has reviewed
  const avg = topics.map((t) => {
    const rs = terms.filter((x) => x.parent === t.id).map((x) => mem.get(x.id)?.recall).filter((r) => r != null);
    return { t, n: rs.length, v: rs.length ? rs.reduce((a, r) => a + r, 0) / rs.length : null };
  }).filter((x) => x.n >= 2).sort((a, b) => a.v - b.v);
  if (avg.length >= 2 && avg[0].v < 0.8) out.push({ kind: "weak", icon: "target", title: `${label(avg[0].t.id)} is your weakest topic`, detail: `About ${Math.round(avg[0].v * 100)}% recall across ${avg[0].n} terms you've reviewed, against ${Math.round(avg.at(-1).v * 100)}% for ${label(avg.at(-1).t.id)}.`, ids: [avg[0].t.id, ...terms.filter((x) => x.parent === avg[0].t.id).map((x) => x.id)] });

  // the exam forecast: what will have slipped below 70% by the morning of the learner's exam, if they don't review it
  if (memory?.examAt) {
    const slip = terms.filter((t) => { const m = mem.get(t.id); return m?.atExam != null && m.atExam < 0.7; }).sort((a, b) => mem.get(a.id).atExam - mem.get(b.id).atExam);
    const tracked = terms.filter((t) => mem.get(t.id)?.atExam != null).length;
    const day = new Date(memory.examAt).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
    if (tracked) out.push(slip.length
      ? { kind: "exam", icon: "calendar", title: `${slip.length} of ${tracked} ${tracked === 1 ? "term" : "terms"} will slip before your exam`, detail: `Left alone, ${slip.slice(0, 3).map((t) => label(t.id)).join(", ")}${slip.length > 3 ? " and more" : ""} will be below 70% recall by ${day}. Reviewing them now pushes that past the exam.`, ids: slip.map((t) => t.id) }
      : { kind: "exam", icon: "calendar", title: "Exam-ready on what you've reviewed", detail: `All ${tracked} terms you've reviewed stay above 70% recall until your exam on ${day}.`, ids: [] });
  }

  // 2. what to learn next: a term whose prerequisites are known, preferring the one that unlocks the most
  const unlocks = (id) => builds.filter((l) => l.from === id).length;
  const ready = order.filter((id) => !known(id) && mem.get(id)?.state !== "learning" && !builds.some((l) => l.to === id && !known(l.from)));
  const next = ready.reduce((best, id) => (best == null || unlocks(id) > unlocks(best) ? id : best), null);
  if (next) {
    const b = builds.filter((l) => l.from === next);
    out.push({ kind: "next", icon: "sparkle", title: `Learn ${label(next)} next`,
      detail: b.length ? `${b.map((l) => label(l.to)).slice(0, 3).join(", ")} ${b.length === 1 ? "builds" : "build"} on it, so it unlocks the rest.` : mem.get(next) ? "You haven't reviewed it yet, and nothing else here needs to come first." : "It's the first term here you haven't marked as known.",
      ids: [next, ...b.map((l) => l.to)], evidence: b[0]?.evidence });
  } else if (terms.length && learnt === terms.length) out.push({ kind: "done", icon: "check", title: "You know every term here", detail: "Keep them fresh with the flashcard feed: Gradify brings each back just before you'd forget it.", ids: [] });

  // 3. the shape of the notes
  const degree = new Map();
  for (const l of links) if (l.kind !== "formula") for (const id of [l.from, l.to]) degree.set(id, (degree.get(id) || 0) + 1);
  const hub = [...degree.entries()].sort((a, b) => b[1] - a[1])[0];
  if (hub && hub[1] >= 2) out.push({ kind: "hub", icon: "link", title: `${label(hub[0])} is the hub`, detail: `It connects to ${hub[1]} other terms. Understanding it well pays off across the map.`, ids: [hub[0], ...links.filter((l) => l.kind !== "formula" && (l.from === hub[0] || l.to === hub[0])).map((l) => (l.from === hub[0] ? l.to : l.from))] });
  for (const l of builds.slice(0, 3)) {
    const a = map.byId.get(l.from), b = map.byId.get(l.to);
    out.push({ kind: "builds", icon: "route", title: `${label(l.to)} builds on ${label(l.from)}`, detail: a.topic !== b.topic ? `A link across topics: ${l.why}` : l.why, ids: [l.from, l.to], evidence: l.evidence, confidence: l.confidence });
  }
  for (const l of links.filter((x) => x.kind === "contrast").slice(0, 3)) {
    out.push({ kind: "contrast", icon: "alert", title: `Don't mix up ${label(l.from)} and ${label(l.to)}`, detail: l.why, ids: [l.from, l.to], evidence: l.evidence, confidence: l.confidence });
  }
  // gaps: words the definitions lean on that the notes never define ("ventricles" in four definitions, no definition)
  for (const g of gaps(map).slice(0, 2)) out.push({ kind: "gap", icon: "bulb", title: `Your notes never define “${g.word}”`, detail: `${g.ids.length} definitions use it: ${g.ids.slice(0, 3).map(label).join(", ")}. Add it as a note so the terms that rest on it make sense.`, ids: g.ids, word: g.word });

  for (const q of questions.slice(0, 6)) {
    const t = topics.find((x) => x.topic === q.group);
    out.push({ kind: "question", icon: "bulb", title: q.question, detail: q.answer, ids: t ? [t.id] : [], qtype: q.type });
  }
  return { links, order, learnt, total: terms.length, known, insights: out };
}
