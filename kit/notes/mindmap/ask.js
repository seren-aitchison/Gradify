// "Ask the map": questions about these notes, answered only from the map itself (its terms, definitions and the
// links Gradify Intelligence found) and the learner's memory of each term. Like the rest of Gradify Intelligence it
// never makes anything up: every answer quotes the notes, and when the notes don't say, it says so.
// Pure, so Node tests it (tests/mindmap.test.mjs).
//
// ask(question, map, intel, memory) → { kind, title, parts: [{ head?, text, id? }], ids, note? }
const STOP = new Set("a an the and or of to in on at by for with from into is are was were be what which who how why does do did it its this that these those me my i about between difference explain tell".split(" "));
const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const words = (s) => (String(s).toLowerCase().match(/[a-z0-9]+/g) || []).filter((w) => w.length > 2 && !STOP.has(w)).map((w) => w.replace(/(ies)$/, "y").replace(/(s|ing|ed)$/, ""));
const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s);
const pct = (v) => `${Math.round(v * 100)}%`;

export const SUGGESTIONS = ["What should I learn first?", "What am I forgetting?", "Compare systole and diastole", "What does cardiac output depend on?"];

// the terms a question names, longest first so "first heart sound" wins over "heart"
export function mentioned(question, map) {
  const q = ` ${String(question).toLowerCase()} `, raw = ` ${question} `;
  const hits = [];
  for (const n of map.nodes) {
    if (n.type !== "term" || !n.fact) continue;
    const name = n.fact.term.toLowerCase();
    const at = q.search(new RegExp(`\\b${escRe(name)}(s|es)?\\b`));
    const ab = n.fact.ab ? raw.search(new RegExp(`\\b${escRe(n.fact.ab)}\\b`, "i")) : -1;
    if (at >= 0 || ab >= 0) hits.push({ n, at: at >= 0 ? at : ab, len: at >= 0 ? name.length : n.fact.ab.length });
  }
  hits.sort((a, b) => b.len - a.len);
  const kept = [];
  for (const h of hits) if (!kept.some((k) => h.at >= k.at && h.at < k.at + k.len)) kept.push(h);
  return kept.sort((a, b) => a.at - b.at).map((h) => h.n);
}

export function ask(question, map, intel, memory = null) {
  const q = String(question || "").trim(), s = q.toLowerCase();
  const mem = memory?.terms || new Map();
  const label = (id) => map.byId.get(id)?.label || id;
  const def = (n) => { const d = n.fact.def || n.fact.term; return `${cap(d)}${/[.!?…:]$/.test(d) ? "" : "."}`; };
  if (!q) return { kind: "empty", title: "Ask about these notes", parts: [], ids: [] };
  const terms = mentioned(q, map);

  // memory questions
  if (/forget|fading|weak|struggl|revis|review|remember|due|know/.test(s) && !terms.length) {
    if (!memory?.synced) return { kind: "memory", title: "Gradify can't see your memory of these terms yet", parts: [{ text: "None of them are in your flashcards. Make flashcards from these notes in the Gradify app and this map will show what you remember, and what's slipping." }], ids: [] };
    const bad = [...mem.entries()].filter(([, m]) => ["shaky", "fading"].includes(m.state)).sort((a, b) => (a[1].recall ?? 0) - (b[1].recall ?? 0));
    if (!bad.length) return { kind: "memory", title: "Nothing here is slipping", parts: [{ text: `All ${mem.size} terms in your flashcards are above 70% recall right now.` }], ids: [] };
    return { kind: "memory", title: `${bad.length} ${bad.length === 1 ? "term needs" : "terms need"} you`, ids: bad.map(([id]) => id),
      parts: bad.slice(0, 5).map(([id, m]) => ({ head: label(id), id, text: `${m.state === "shaky" ? (m.sureWrong ? "You were sure but wrong recently." : "Wrong more than once recently.") : "Fading."}${m.recall != null ? ` About ${pct(m.recall)} recall now.` : ""}` })) };
  }
  // what to learn first
  if (/first|start|order|next|begin/.test(s) && !terms.length) {
    const next = intel.insights.find((x) => x.kind === "next");
    const order = intel.order.filter((id) => !intel.known(id)).slice(0, 5);
    return { kind: "order", title: next ? next.title : "You know every term here", ids: order,
      parts: [...(next ? [{ text: next.detail }] : []), ...order.map((id, i) => ({ head: `${i + 1}. ${label(id)}`, id, text: def(map.byId.get(id)) }))] };
  }
  // formulas
  if (/formula|equation|calculat/.test(s) && !terms.length) {
    const eqs = map.nodes.filter((n) => n.type === "eq");
    return eqs.length ? { kind: "formula", title: `${eqs.length} ${eqs.length === 1 ? "formula" : "formulas"} in your notes`, ids: eqs.map((e) => e.id),
      parts: eqs.map((e) => ({ head: e.label, id: e.id, text: intel.links.filter((l) => l.kind === "formula" && l.to === e.id).map((l) => label(l.from)).join(", ") || "From your notes." })) }
      : { kind: "formula", title: "Your notes don't have a formula", parts: [], ids: [] };
  }
  // two or more terms: compare them
  if (terms.length >= 2) {
    const [a, b] = terms;
    const link = intel.links.find((l) => (l.from === a.id && l.to === b.id) || (l.from === b.id && l.to === a.id));
    const rel = !link ? (a.topic === b.topic ? `Both are in the same topic, ${label(map.byId.get(a.parent)?.id)}.` : "Your notes don't link them directly.")
      : link.kind === "contrast" ? `They're easy to mix up: ${link.why}` : `${label(link.to)} builds on ${label(link.from)}: ${link.why}`;
    return { kind: "compare", title: `${a.label} vs ${b.label}`, ids: terms.map((t) => t.id),
      parts: [...terms.slice(0, 3).map((t) => ({ head: t.label, id: t.id, text: def(t) })), { head: "How they relate", text: rel }] };
  }
  // one term: what it is, what it needs, what needs it
  if (terms.length === 1) {
    const t = terms[0], m = mem.get(t.id);
    const into = intel.links.filter((l) => l.kind === "builds" && l.to === t.id).map((l) => l.from);
    const out = intel.links.filter((l) => l.kind !== "contrast" && l.from === t.id).map((l) => l.to);
    const mix = intel.links.filter((l) => l.kind === "contrast" && (l.from === t.id || l.to === t.id)).map((l) => (l.from === t.id ? l.to : l.from));
    const wantsNeeds = /depend|need|made of|built on|builds on|what causes|why/.test(s), wantsUses = /use|lead|unlock|affect/.test(s);
    const parts = [{ head: t.label, id: t.id, text: def(t) }];
    if (t.fact.src) parts.push({ head: "In your notes", text: `“${t.fact.src}”` });
    if (into.length || wantsNeeds) parts.push({ head: "Builds on", text: into.length ? into.map(label).join(", ") : "Nothing else on this map." });
    if (out.length || wantsUses) parts.push({ head: "Leads to", text: out.length ? out.map(label).join(", ") : "Nothing else on this map uses it." });
    if (mix.length) parts.push({ head: "Easy to mix up with", text: mix.map(label).join(", ") });
    if (m) parts.push({ head: "Your memory", text: `${cap(m.state === "new" ? "not reviewed yet" : m.state)}${m.recall != null ? `, about ${pct(m.recall)} recall now` : ""}.` });
    return { kind: "term", title: t.label, ids: [t.id, ...into, ...out, ...mix], parts };
  }
  // otherwise: the closest definitions, by shared meaning words
  const qw = new Set(words(q));
  const scored = map.nodes.filter((n) => n.type === "term" && n.fact).map((n) => ({ n, s: words(`${n.fact.term} ${n.fact.def}`).filter((w) => qw.has(w)).length })).filter((x) => x.s > 0).sort((a, b) => b.s - a.s).slice(0, 3);
  if (!scored.length) return { kind: "none", title: "Your notes don't cover that", parts: [{ text: "Gradify only answers from these notes, so it won't guess. Try naming a term on the map." }], ids: [] };
  return { kind: "search", title: "Closest in your notes", ids: scored.map((x) => x.n.id), parts: scored.map((x) => ({ head: x.n.label, id: x.n.id, text: def(x.n) })) };
}
