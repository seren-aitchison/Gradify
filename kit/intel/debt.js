// Knowledge debt: foundations a learner hasn't secured, which make later topics harder. A normal platform sees a
// weak topic and schedules more of it; Gradify looks underneath it for the root cause and targets the smallest useful
// refresher instead of treating the symptoms.
//
// How dependencies are found, only from evidence that can be shown to the learner:
//  - In their own notes: if topic A defines a term ("What is stroke volume?") and topic B's cards use that term
//    ("Cardiac output = stroke volume × heart rate"), A underpins B. The shared term is the evidence.
//  - In Gradify courses: the course's prerequisite graph (kit/learning/concepts.js) via the weak foundations that
//    kit/learning/targets.js already finds from course answers (passed in as course `weak` entries).
// A debt is a weak or untested prerequisite under at least one weak topic. Chains are followed to the deepest root.
// Pure, so Node can test it (tests/debt.test.mjs).
const STOP = new Set(["what", "which", "when", "where", "does", "that", "this", "with", "from", "into", "their", "there", "these", "those", "about", "between", "during", "the", "and", "for"]);
const norm = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
const keyOf = (c) => `${c.document_id}|${c.topic || "Cards"}`;

// the terms a card defines: "What is X?", "Define X", "What does X mean?", "X is …" (short fronts of definition cards)
export function definedTerm(card) {
  const f = String(card.front || "").trim();
  let m = f.match(/^(?:what\s+(?:is|are)|define|what\s+does)\s+(?:an?\s+|the\s+)?(.+?)(?:\s+(?:mean|stand for|do))?\s*\??$/i);
  let t = m ? m[1] : null;
  if (!t && (card.kind === "definition" || card.kind === "reverse") && f.split(/\s+/).length <= 4 && !/\?$/.test(f)) t = f;
  if (!t) return null;
  t = norm(t.replace(/\(.*?\)/g, " ")).replace(/^(the|a|an)\s+/, "");
  const words = t.split(" ").filter((w) => w.length > 1);
  if (!words.length || words.length > 5 || (words.length === 1 && (words[0].length < 4 || STOP.has(words[0])))) return null;
  return words.join(" ");
}
// abbreviations in brackets count too: "What does cardiac output (CO) equal?" defines "co" for later cards
function abbreviations(card) { return [...String(card.front || "").matchAll(/\(([A-Z][A-Za-z0-9]{1,5})\)/g)].map((m) => m[1].toLowerCase()); }

/** Edges A → B ("A underpins B") between the learner's own topics, each with the shared term and the card using it. */
export function dependencyGraph(cards = []) {
  const byTopic = new Map();
  for (const c of cards) { if (c.suspended) continue; const k = keyOf(c); if (!byTopic.has(k)) byTopic.set(k, []); byTopic.get(k).push(c); }
  const terms = new Map();   // topic → Set of terms it defines
  for (const [k, list] of byTopic) terms.set(k, new Set(list.flatMap((c) => [definedTerm(c), ...abbreviations(c)]).filter(Boolean)));
  const edges = [];
  for (const [a, defs] of terms) for (const [b, list] of byTopic) {
    if (a === b || !defs.size) continue;
    // every term A defines that B uses: one term is a hint, several are stronger evidence (kit/intel/graph.js)
    const found = [];
    for (const term of defs) {
      const re = new RegExp(`\\b${term.replace(/[-]/g, "\\-")}\\b`, "i");
      const user = list.find((c) => re.test(`${c.front} ${c.back}`) && definedTerm(c) !== term);
      if (user) found.push({ term, card: user.front });
    }
    if (found.length) edges.push({ from: a, to: b, term: found[0].term, card: found[0].card, terms: found.map((f) => f.term) });
  }
  // a pair that points both ways is two topics that define each other's words: keep neither, it isn't a prerequisite
  const pair = new Set(edges.map((e) => `${e.from}>${e.to}`));
  return edges.filter((e) => !pair.has(`${e.to}>${e.from}`));
}

const weak = (c) => c && (c.level === "shaky" || c.level === "fading" || (c.seen > 0 && c.mastery < 0.5));
const insecure = (c) => c && (c.level === "new" || c.level === "shaky" || c.level === "learning" || c.mastery < 0.6);

/**
 * Root causes: weak or untested prerequisites under weak topics, deepest first, most damaging first.
 * @param {object[]} concepts learner memory (kit/intel/memory.js)
 * @param {object[]} edges from dependencyGraph
 * @param {object[]} courseWeak course foundations: [{ site, course, title, for, why, href }]
 */
export function knowledgeDebts(concepts = [], edges = [], courseWeak = []) {
  const byKey = new Map(concepts.map((c) => [c.key, c]));
  const parents = (k) => edges.filter((e) => e.to === k && insecure(byKey.get(e.from)));
  // follow a chain to its deepest insecure root, without looping
  const root = (k, seen = new Set()) => { const p = parents(k).find((e) => !seen.has(e.from)); if (!p) return null; seen.add(p.from); return root(p.from, seen) || p; };
  const debts = new Map();
  for (const b of concepts.filter(weak)) {
    const r = root(b.key, new Set([b.key]));
    if (!r) continue;
    const a = byKey.get(r.from);
    const d = debts.get(a.key) || { key: a.key, root: a, symptoms: [], evidence: [], site: a.site || null, kind: "notes" };
    if (!d.symptoms.some((x) => x.key === b.key)) d.symptoms.push(b);
    const direct = edges.find((e) => e.from === a.key && e.to === b.key) || r;
    d.evidence.push({ term: direct.term, card: direct.card, topic: b.name, note: direct.sources?.find((x) => x.kind === "course")?.note || null, confidence: direct.confidence ?? null });
    debts.set(a.key, d);
  }
  const out = [...debts.values()].map((d) => ({
    ...d, name: d.root.name,
    mins: Math.max(10, Math.min(20, Math.ceil(((d.root.fresh || 0) + (d.root.due || 0) + 4) * 25 / 60) + 5)),
    why: `${d.symptoms.map((s) => s.name).slice(0, 2).join(" and ")}${d.symptoms.length > 2 ? ` and ${d.symptoms.length - 2} more` : ""} ${d.symptoms.length === 1 ? "depends" : "depend"} on ${d.root.name}, which ${d.root.level === "new" ? "you haven't been tested on yet" : "isn't secure yet"}. Fixing it first is quicker than repeating the later ${d.symptoms.length === 1 ? "topic" : "topics"}.`,
    because: !d.evidence[0] ? "" : d.evidence[0].term ? `“${d.evidence[0].term}” is defined in ${d.root.name} and used in ${d.evidence[0].topic} (“${d.evidence[0].card}”).` : d.evidence[0].note || "",
    confidence: d.evidence.reduce((m, e) => (e.confidence == null ? m : Math.min(m, e.confidence)), 1),
    href: `#/study/t:${encodeURIComponent(d.root.key)}`,
  }));
  for (const w of courseWeak) out.push({ key: `course:${w.site}:${w.title}`, kind: "course", name: w.title, site: w.site, symptoms: w.for ? [{ name: w.for }] : [], mins: 15,
    why: w.for ? `${w.for} builds on ${w.title}, and your answers show both are weak. Revisit ${w.title} first.` : w.why || "A weak foundation in your course.", because: `From your ${w.course || w.site} answers.`, href: w.href, evidence: [] });
  return out.sort((x, y) => y.symptoms.length - x.symptoms.length);
}

/** How many topics each topic underpins (its importance as a foundation), from the same edges. */
export function dependants(edges = []) {
  const n = new Map();
  for (const e of edges) n.set(e.from, (n.get(e.from) || 0) + 1);
  return n;
}
