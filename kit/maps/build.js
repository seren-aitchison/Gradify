// Five mind maps for every Gradify lesson, built from the lesson's own notes (kit/course/notes.js: parseNotes).
//
//   1  The complete topic            every section, its points, key terms and the lesson's overall shape
//   2  Mechanisms and processes      worked examples step by step, formulas and tests, sequences, cause and effect
//   3  Key concepts and relationships terms and definitions, what builds on what, comparisons
//   4  Applications and examples     worked examples, cases, statutes, drugs, examples in the text, labs to try
//   5  Exam mastery                  objectives and what supports them, must-knows, common mistakes, what gets confused,
//                                    test yourself
//
// Every node comes from a tagged line of the lesson (S, O, PRE, T, SUM, H, bullets, P, E, X, K, !, CASE, LAW, DRUG, IX,
// Q), and carries a reference to it, so a map can't say anything the lesson doesn't. Where a lesson has nothing for a
// map (a law lesson with no processes, say), the map says so plainly instead of inventing content.
//
// Pure and deterministic: the same notes always give the same maps, in milliseconds, so there's nothing to store or
// regenerate. A map's version is a hash of the engine version and the lesson's notes: change the notes and the maps
// change with them. Pure, so Node can test it (tests/mindmaps.test.mjs).

export const ENGINE = "maps-1";

export const MAPS = [
  { key: "topic", n: 1, title: "The complete topic", purpose: "The whole lesson at a glance: every section, its key points and terms." },
  { key: "process", n: 2, title: "Mechanisms and processes", purpose: "How things happen: steps, stages, formulas, tests and cause and effect." },
  { key: "concepts", n: 3, title: "Key concepts and relationships", purpose: "What each idea means, what it builds on, and how ideas compare." },
  { key: "apply", n: 4, title: "Applications and examples", purpose: "Worked examples, cases and real situations where the ideas are used." },
  { key: "exam", n: 5, title: "Exam mastery", purpose: "What to know cold: objectives, must-knows, common mistakes and what gets confused." },
];

// ---------- text ----------
/** Markdown-ish inline text (**bold**, *italic*, `code`, [link](url)) as plain text. */
export const plain = (s) => String(s ?? "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1").replace(/(^|[^*])\*([^*\s][^*]*)\*/g, "$1$2").replace(/`([^`]+)`/g, "$1").replace(/\s+/g, " ").trim();
// letters and digits in any script (Japanese titles must stay distinct)
const norm = (s) => plain(s).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
const words = (s) => norm(s).split(" ").filter((w) => w.length > 3);

/** A node's title and detail from a line of notes: a bold lead is the title; a long line keeps its full text as detail. */
export function split(text, max = 72) {
  const raw = String(text ?? "").trim();
  const bold = raw.match(/^\*\*([^*]{2,80})\*\*\s*[:.,–—-]?\s*(.*)$/);
  if (bold) return { topic: plain(bold[1]), detail: bold[2].trim() ? plain(raw) : null };
  const p = plain(raw);
  if (p.length <= max) return { topic: p, detail: null };
  const colon = p.match(/^([^:]{3,60}):\s+(.+)$/);
  if (colon) return { topic: colon[1], detail: colon[2] };
  const sentence = p.match(/^(.{20,90}?[.!?])\s/);
  if (sentence) return { topic: sentence[1].replace(/[.]$/, ""), detail: p };
  const cut = p.slice(0, max).replace(/\s+\S*$/, "");
  return { topic: `${cut}…`, detail: p };
}

// ---------- the lesson as numbered sources ----------
// Every tagged line gets a stable reference ("b3" for block 3, "t0" for term 0, …) so nodes can say where they came from
function sourcesOf(L) {
  const sections = [];   // { title, ref, items: [{ kind, text, ref, steps?, rows? }] }
  let cur = { title: null, ref: "lead", items: [] };
  sections.push(cur);
  L.blocks.forEach((b, i) => {
    const ref = `b${i}`;
    if (b.t === "h") { cur = { title: b.x, ref, items: [] }; sections.push(cur); return; }
    if (b.t === "ul") b.items.forEach((x, k) => cur.items.push({ kind: "point", text: x, ref: `${ref}.${k}` }));
    else if (b.t === "p") cur.items.push({ kind: "para", text: b.x, ref });
    else if (b.t === "key") cur.items.push({ kind: "key", text: b.x, ref });
    else if (b.t === "pit") cur.items.push({ kind: "pitfall", text: b.x, ref });
    else if (b.t === "safe") cur.items.push({ kind: "safety", text: b.x, ref });
    else if (b.t === "eq") b.rows.forEach(([x, note], k) => cur.items.push({ kind: "equation", text: x, note: note || null, ref: `${ref}.${k}` }));
    else if (b.t === "ex") cur.items.push({ kind: "example", text: b.x, steps: b.steps || [], ref });
    else if (b.t === "ix") cur.items.push({ kind: "lab", text: b.id, ref });
  });
  return sections.filter((s) => s.title || s.items.length);
}

/** Every source reference in a lesson: what "covered" is measured against. */
export function allRefs(L) {
  const refs = new Set();
  for (const s of sourcesOf(L)) { if (s.title) refs.add(s.ref); for (const it of s.items) if (it.kind !== "lab") refs.add(it.ref); }
  (L.terms || []).forEach((_, i) => refs.add(`t${i}`));
  (L.objectives || []).forEach((_, i) => refs.add(`o${i}`));
  (L.summary || []).forEach((_, i) => refs.add(`s${i}`));
  (L.authorities || []).forEach((_, i) => refs.add(`a${i}`));
  return refs;
}

// ---------- nodes ----------
let seq = 0;
const node = (topic, o = {}) => ({ id: o.id || `n${++seq}`, topic: plain(topic).slice(0, 140), detail: o.detail ? plain(o.detail) : null, kind: o.kind || "point", src: o.src ? [].concat(o.src) : [], children: o.children || [] });
const fromText = (text, kind, src, extra = {}) => { const { topic, detail } = split(text); return node(topic, { detail, kind, src, ...extra }); };
const limited = (why) => node(why, { kind: "limit" });

// ---------- the five maps ----------
const PROCESS_HEAD = /\b(process|stage|step|mechanism|pathway|cycle|procedure|method|sequence|test|element|phase|order|technique|approach|algorithm|workflow|reaction|formation|making|route)s?\b/i;
const STEPPY = /^(\d+[.)]|first|second|third|then|next|finally|step\b)|→|->|⇒/i;
const CAUSAL = /\b(because|leads? to|caus(e|es|ed|ing)|results? in|so that|therefore|which means|as a result|in turn|triggers?|drives?|increases?|decreases?|reduces?)\b/i;
const EXAMPLE = /\b(for example|e\.g\.|such as|for instance|in practice|in real|clinically|in the workplace|case of|a typical|imagine)\b/i;
const CONTRAST = /\b(whereas|unlike|compared (with|to)|in contrast|differ(s|ence)?|by contrast|while\b.*\b(is|are)\b|rather than|but not)\b/i;

function mapTopic(L, S) {
  const kids = S.map((s) => {
    // content before the first heading gets a label of its own (a group heading, not lesson text)
    const n = node(s.title || "Overview", { kind: s.title ? "section" : "group", src: s.title ? s.ref : null });
    for (const it of s.items) {
      if (it.kind === "example") n.children.push(fromText(it.text, "example", it.ref));
      else if (it.kind === "equation") n.children.push(node(it.text, { detail: it.note, kind: "equation", src: it.ref }));
      else if (it.kind !== "lab") n.children.push(fromText(it.text, it.kind, it.ref));
    }
    return n;
  }).filter((n) => n.children.length || n.src.length);
  if (L.terms?.length) kids.push(node("Key terms", { kind: "group", children: L.terms.map(([t, d], i) => node(t, { detail: d, kind: "term", src: `t${i}` })) }));
  return kids;
}

function mapProcess(L, S) {
  const kids = [];
  for (const s of S) for (const it of s.items) if (it.kind === "example" && it.steps.length)
    kids.push(fromText(it.text, "example", it.ref, { children: it.steps.map((st, k) => node(`${k + 1}. ${split(st).topic}`, { detail: split(st).detail || plain(st), kind: "step", src: it.ref })) }));
  const eqs = S.flatMap((s) => s.items.filter((it) => it.kind === "equation"));
  if (eqs.length) kids.push(node("Formulas, rules and tests", { kind: "group", children: eqs.map((it) => node(it.text, { detail: it.note, kind: "equation", src: it.ref })) }));
  for (const s of S) {
    const points = s.items.filter((it) => it.kind === "point");
    const steppy = points.filter((it) => STEPPY.test(plain(it.text)));
    if (s.title && PROCESS_HEAD.test(s.title) && points.length >= 2) kids.push(node(s.title, { kind: "section", src: s.ref, children: points.map((it, k) => fromText(`${k + 1}. ${plain(it.text)}`, "step", it.ref)) }));
    else if (steppy.length >= 2) kids.push(node(s.title || "Sequence", { kind: s.title ? "section" : "group", src: s.title ? s.ref : null, children: steppy.map((it) => fromText(it.text, "step", it.ref)) }));
  }
  const causal = S.flatMap((s) => s.items.filter((it) => ["point", "para", "key"].includes(it.kind) && CAUSAL.test(plain(it.text))));
  if (causal.length) kids.push(node("Cause and effect", { kind: "group", children: causal.slice(0, 12).map((it) => fromText(it.text, "cause", it.ref)) }));
  for (const [i, a] of (L.authorities || []).entries()) if (a.kind === "drug") kids.push(node(a.name, { detail: a.mechanism, kind: "mechanism", src: `a${i}` }));
  if (!kids.length) kids.push(limited("This lesson doesn't describe step-by-step processes. Map 1 shows how its ideas are organised."));
  return kids;
}

function mapConcepts(L, S) {
  const kids = [];
  // terms, filed under the section that first mentions them
  const terms = (L.terms || []).map(([t, d], i) => ({ t, d, i, home: S.find((s) => s.title && s.items.some((it) => norm(it.text).includes(norm(t))))?.title || null }));
  const homes = [...new Set(terms.map((x) => x.home))];
  const termNode = (x) => node(x.t, { detail: x.d, kind: "term", src: `t${x.i}` });
  // one Definitions branch: by section when terms come from several, so this map's main branches are about meaning
  if (terms.length) kids.push(node("Definitions", { kind: "group", children: homes.length > 1
    ? homes.map((h) => node(h || "Core terms", { kind: "group", children: terms.filter((x) => x.home === h).map(termNode) }))
    : terms.map(termNode) }));
  // concepts named in bold at the start of a point, with their explanation
  const bold = S.flatMap((s) => s.items.filter((it) => it.kind === "point" && /^\*\*[^*]+\*\*/.test(it.text)).map((it) => ({ s, it })));
  const named = bold.filter(({ it }) => !terms.some((x) => norm(x.t) === norm(split(it.text).topic)));
  if (named.length) kids.push(node("Ideas explained", { kind: "group", children: named.slice(0, 16).map(({ it }) => fromText(it.text, "concept", it.ref)) }));
  const contrast = S.flatMap((s) => s.items.filter((it) => ["point", "para", "key"].includes(it.kind) && CONTRAST.test(plain(it.text))));
  if (contrast.length) kids.push(node("Compare and contrast", { kind: "group", children: contrast.slice(0, 10).map((it) => fromText(it.text, "compare", it.ref)) }));
  if (L.prereq?.length) kids.push(node("Builds on", { kind: "group", children: L.prereq.map((p) => node(p, { kind: "prereq" })) }));
  const keys = S.flatMap((s) => s.items.filter((it) => it.kind === "key"));
  if (keys.length) kids.push(node("Underlying principles", { kind: "group", children: keys.map((it) => fromText(it.text, "key", it.ref)) }));
  if (!kids.length) kids.push(limited("This lesson doesn't define separate terms. Map 1 shows its ideas section by section."));
  return kids;
}

function mapApply(L, S, { labTitle = (id) => id } = {}) {
  const kids = [];
  const exs = S.flatMap((s) => s.items.filter((it) => it.kind === "example"));
  if (exs.length) kids.push(node("Worked examples", { kind: "group", children: exs.map((it) => fromText(it.text, "example", it.ref, { children: it.steps.map((st, k) => node(`${k + 1}. ${split(st).topic}`, { detail: split(st).detail || plain(st), kind: "step", src: it.ref })) })) }));
  const A = (L.authorities || []).map((a, i) => ({ a, i }));
  const cases = A.filter(({ a }) => a.kind === "case");
  if (cases.length) kids.push(node("Cases", { kind: "group", children: cases.map(({ a, i }) => node(a.name, { kind: "case", src: `a${i}`, children: [node("Facts", { detail: a.facts, kind: "field", src: `a${i}` }), node("Held", { detail: a.held, kind: "field", src: `a${i}` }), node(split(a.principle).topic, { detail: a.principle, kind: "principle", src: `a${i}` })] })) }));
  const laws = A.filter(({ a }) => a.kind === "law");
  if (laws.length) kids.push(node("Legislation", { kind: "group", children: laws.map(({ a, i }) => node(a.name, { detail: a.provides, kind: "law", src: `a${i}` })) }));
  const drugs = A.filter(({ a }) => a.kind === "drug");
  if (drugs.length) kids.push(node("Medicines in practice", { kind: "group", children: drugs.map(({ a, i }) => node(a.name, { kind: "drug", src: `a${i}`, children: [node("Used for", { detail: a.uses, kind: "field", src: `a${i}` }), node("Watch for", { detail: a.adverse, kind: "field", src: `a${i}` }), node("Monitoring", { detail: a.monitoring, kind: "field", src: `a${i}` })] })) }));
  const inText = S.flatMap((s) => s.items.filter((it) => ["point", "para", "key"].includes(it.kind) && EXAMPLE.test(plain(it.text))));
  if (inText.length) kids.push(node("Examples in the lesson", { kind: "group", children: inText.slice(0, 12).map((it) => fromText(it.text, "example", it.ref)) }));
  const safety = S.flatMap((s) => s.items.filter((it) => it.kind === "safety"));
  if (safety.length) kids.push(node("Safe practice", { kind: "group", children: safety.map((it) => fromText(it.text, "safety", it.ref)) }));
  const labs = S.flatMap((s) => s.items.filter((it) => it.kind === "lab"));
  if (labs.length) kids.push(node("Try it yourself", { kind: "group", children: labs.map((it) => node(labTitle(it.text), { kind: "lab", src: it.ref, id: `lab-${it.text}` })) }));
  if (!kids.length) kids.push(limited("This lesson has no worked examples or case studies. Map 5 shows how to apply what it teaches."));
  return kids;
}

function mapExam(L, S) {
  const kids = [];
  const pool = S.flatMap((s) => s.items.filter((it) => ["key", "point", "para"].includes(it.kind)).map((it) => ({ it, w: new Set(words(it.text)), s })));
  // each objective with the points that share the most of its words: what to be able to say for it
  if (L.objectives?.length) kids.push(node("Be able to", { kind: "group", children: L.objectives.map((o, i) => {
    const ow = words(o);
    const best = pool.map((p) => ({ p, score: ow.filter((w) => p.w.has(w)).length + (p.it.kind === "key" ? 0.5 : 0) })).filter((x) => x.score >= 1).sort((a, b) => b.score - a.score).slice(0, 3);
    return node(o, { kind: "objective", src: `o${i}`, children: best.map(({ p }) => fromText(p.it.text, p.it.kind, p.it.ref)) });
  }) }));
  const must = [...(L.summary || []).map((x, i) => node(x, { kind: "summary", src: `s${i}` })), ...S.flatMap((s) => s.items.filter((it) => it.kind === "key")).map((it) => fromText(it.text, "key", it.ref))];
  if (must.length) kids.push(node("Must know", { kind: "group", children: must }));
  const pits = S.flatMap((s) => s.items.filter((it) => it.kind === "pitfall"));
  if (pits.length) kids.push(node("Common mistakes", { kind: "group", children: pits.map((it) => fromText(it.text, "pitfall", it.ref)) }));
  const eqs = S.flatMap((s) => s.items.filter((it) => it.kind === "equation"));
  if (eqs.length) kids.push(node("Formulas to know", { kind: "group", children: eqs.map((it) => node(it.text, { detail: it.note, kind: "equation", src: it.ref })) }));
  const confused = confusedPairs(L.terms || []);
  if (confused.length) kids.push(node("Easily confused", { kind: "group", children: confused.map(([a, b]) => node(`${a.t} vs ${b.t}`, { detail: `${a.t}: ${a.d} ${b.t}: ${b.d}`, kind: "compare", src: [`t${a.i}`, `t${b.i}`] })) }));
  const cards = (L.cards || []).filter(([q]) => !/^(Case card|Drug card|Statute card|Which case)/.test(q)).slice(0, 8);
  if (cards.length) kids.push(node("Test yourself", { kind: "group", children: cards.map(([q, a]) => node(split(q, 90).topic, { detail: `Answer: ${plain(a)}`, kind: "question" })) }));
  if (!kids.length) kids.push(limited("This lesson has no objectives or key points marked for revision yet. Map 1 covers everything in it."));
  return kids;
}

// terms whose names share a word, or whose definitions say much the same thing: the pairs learners mix up
function confusedPairs(terms) {
  const T = terms.map(([t, d], i) => ({ t, d, i, nw: new Set(words(t)), dw: new Set(words(d)) }));
  const out = [];
  for (let i = 0; i < T.length; i++) for (let j = i + 1; j < T.length; j++) {
    const a = T[i], b = T[j];
    const shareName = [...a.nw].some((w) => b.nw.has(w));
    const dShared = [...a.dw].filter((w) => b.dw.has(w)).length, dUnion = new Set([...a.dw, ...b.dw]).size || 1;
    if (shareName || dShared / dUnion >= 0.3) out.push([a, b]);
  }
  return out.slice(0, 6);
}

// ---------- tidy, check and measure ----------
// siblings with the same title are merged (their children and sources kept), empty groups dropped, ids made unique
function tidy(n) {
  // merge this level first, then tidy each child: merged children are checked again for their own duplicates
  const seen = new Map();
  for (const c of n.children) {
    const k = norm(c.topic);
    if (seen.has(k)) { const first = seen.get(k); first.children.push(...c.children); first.src = [...new Set([...first.src, ...c.src])]; if (!first.detail && c.detail) first.detail = c.detail; }
    else seen.set(k, c);
  }
  n.children = [...seen.values()];
  n.children.forEach(tidy);
  n.children = n.children.filter((c) => !(c.kind === "group" && !c.children.length));
  return n;
}
const walk = (n, f, depth = 0) => { f(n, depth); for (const c of n.children) walk(c, f, depth + 1); };

/** Problems with a map, or [] if it's sound: a root, unique ids, titles on every node, sensible depth, no duplicate siblings. */
export function validateMap(m) {
  const problems = [], ids = new Set();
  if (!m?.root?.topic) return ["no central topic"];
  walk(m.root, (n, d) => {
    if (ids.has(n.id)) problems.push(`duplicate id ${n.id}`); ids.add(n.id);
    if (!n.topic?.trim()) problems.push("a node with no title");
    if (d > 5) problems.push(`too deep at "${n.topic}"`);
    const sib = n.children.map((c) => norm(c.topic));
    if (new Set(sib).size !== sib.length) problems.push(`duplicate branches under "${n.topic}"`);
  });
  return problems;
}

/** Which of the lesson's sources the maps use, overall and per map. */
export function coverage(L, maps) {
  const all = allRefs(L), used = new Set();
  const per = maps.map((m) => { const mine = new Set(); walk(m.root, (n) => n.src.forEach((r) => { if (all.has(r)) { mine.add(r); used.add(r); } })); return mine.size; });
  return { total: all.size, used: used.size, share: all.size ? used.size / all.size : 1, perMap: per, missing: [...all].filter((r) => !used.has(r)) };
}

const fnv = (s) => { let h = 2166136261; for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return (h >>> 0).toString(36); };

/**
 * The five maps for a lesson.
 * @param {object} L a lesson from parseNotes(); L.title is the central topic
 * @param {{ id?: string, notes?: string, labTitle?: (id: string) => string }} o id: the lesson's id; notes: its raw notes (for the version)
 * @returns {{ lessonId, version, maps: { key, n, title, purpose, root, nodes, limited }[], coverage }}
 */
export function buildMaps(L, o = {}) {
  seq = 0;
  const S = sourcesOf(L);
  const build = { topic: mapTopic, process: mapProcess, concepts: mapConcepts, apply: mapApply, exam: mapExam };
  const maps = MAPS.map((def) => {
    const prefix = `${o.id || "lesson"}-${def.key}`;
    const root = tidy(node(L.title, { id: `${prefix}-root`, kind: "root", detail: L.lead || null, children: build[def.key](L, S, o) }));
    let k = 0; walk(root, (n) => { if (n !== root) n.id = `${prefix}-${k++}`; });
    let nodes = 0; walk(root, () => nodes++);
    return { ...def, root, nodes, limited: root.children.length === 1 && root.children[0].kind === "limit" };
  });
  return { lessonId: o.id || null, version: `${ENGINE}.${fnv(`${ENGINE}\n${o.notes ?? JSON.stringify(L)}`)}`, maps, coverage: coverage(L, maps) };
}

// one build per lesson version, per page: opening the same lesson again doesn't rebuild
const cache = new Map();
export function mapsFor(L, o = {}) {
  const key = `${o.id}|${fnv(o.notes ?? JSON.stringify(L))}`;
  if (!cache.has(key)) { if (cache.size > 40) cache.delete(cache.keys().next().value); cache.set(key, buildMaps(L, o)); }
  return cache.get(key);
}
