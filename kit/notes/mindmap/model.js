// Spidermap model: a Notes Studio pack as a plain graph of nodes and links, plus the learner's own edits.
// Pure (no DOM), so Node can test it (tests/mindmap.test.mjs).
//
//   node  { id, type, label, sub?, parent, colour, icon, topic?, fact?, learnt?, custom? }
//   link  { from, to, kind: "arm" | "leg" | "formula" | "custom" | "user" }
// edits { labels: {id: text}, added: [{id, parent, label}], removed: [id], colours: {topicId: hex}, links: [{from, to}] }
// Ids are stable for the same notes ("t0", "t0.f2", "eq1"), so saved positions and edits still fit next time.
import { NODE_TYPES, TOPIC_ICONS } from "./config.js";

const iconForTopic = (s) => (TOPIC_ICONS.find(([re]) => re.test(String(s).toLowerCase())) || [null, "layers"])[1];
export const termLabel = (f) => `${f.term}${f.ab ? ` (${f.ab})` : ""}`;

/**
 * @param {{ title: string, groups: object[], equations?: string[] }} pack the studio's analysis
 * @param {{ learnt?: Set<string>, edits?: { labels?: object, added?: object[], removed?: string[] } }} [o]
 */
export function buildMap(pack, { learnt = new Set(), edits = {} } = {}) {
  const labels = edits.labels || {}, removed = new Set(edits.removed || []), colours = edits.colours || {};
  const nodes = [], links = [];
  const add = (n) => { if (removed.has(n.id)) return false; nodes.push({ ...n, label: labels[n.id] ?? n.label }); return true; };
  add({ id: "root", type: "root", label: pack.title, parent: null, colour: "5ef0ff", icon: NODE_TYPES.root.icon });
  pack.groups.forEach((g, ti) => {
    const id = `t${ti}`, c = colours[id] || g.c;
    if (!add({ id, type: "topic", label: g.theme && g.facts.length > 1 ? g.theme : g.label, sub: g.label, acronym: g.facts.length > 1 ? g.acronym : "",
      parent: "root", branch: id, colour: c, icon: iconForTopic(g.theme) !== "layers" ? iconForTopic(g.theme) : iconForTopic(g.label), topic: ti })) return;
    links.push({ from: "root", to: id, kind: "arm" });
    g.facts.forEach((f, k) => {
      const fid = `${id}.f${k}`;
      if (add({ id: fid, type: "term", label: termLabel(f), sub: f.def, parent: id, branch: id, colour: c, icon: NODE_TYPES.term.icon, topic: ti, fact: f,
        learnt: learnt.has(f.term.toLowerCase()) })) links.push({ from: id, to: fid, kind: "leg" });
    });
  });
  (pack.equations || []).forEach((e, i) => {
    const id = `eq${i}`;
    if (add({ id, type: "eq", label: e, sub: "Formula from your notes", parent: "root", colour: "ffc002", icon: NODE_TYPES.eq.icon })) links.push({ from: "root", to: id, kind: "formula" });
  });
  // the learner's own nodes, attached wherever they put them (dropped if their parent is gone)
  const have = new Set(nodes.map((n) => n.id));
  for (const a of edits.added || []) {
    if (removed.has(a.id) || !have.has(a.parent)) continue;
    const p = nodes.find((n) => n.id === a.parent);
    nodes.push({ id: a.id, type: "note", label: labels[a.id] ?? a.label, sub: a.sub || "", parent: a.parent, branch: p.branch, colour: p.colour, icon: NODE_TYPES.note.icon, topic: p.topic, custom: true });
    links.push({ from: a.parent, to: a.id, kind: "custom" });
    have.add(a.id);
  }
  // links the learner drew themselves, between any two nodes still on the map
  for (const l of edits.links || []) if (have.has(l.from) && have.has(l.to) && l.from !== l.to) links.push({ from: l.from, to: l.to, kind: "user" });
  return { nodes, links, byId: new Map(nodes.map((n) => [n.id, n])) };
}

// ---------- a lesson's mind map (kit/maps/build.js) as the same graph ----------
// A lesson map is a tree: { root: { id, topic, detail, kind, children }, links: [{ from, to, label }] }. Its main
// branches become topics; everything below them becomes a term, at any depth, keeping the lesson's own kind
// (term, step, pitfall, equation, question, gap…) so the view and Intelligence can treat each the right way.
export const LESSON_PALETTE = ["4641ff", "e5307a", "ff6a00", "13a37a", "8c27ca", "2f7fd8", "d99a00", "e04848"];
export const LESSON_KIND = { gap: "Not in the notes yet", term: "Term", step: "Step", example: "Example", equation: "Formula", key: "Key point", pitfall: "Common mistake",
  case: "Case", law: "Legislation", drug: "Medicine", objective: "Objective", summary: "Summary", question: "Test yourself", compare: "Compare", cause: "Cause and effect",
  concept: "Concept", principle: "Principle", mechanism: "Mechanism", safety: "Safe practice", prereq: "Builds on", lab: "Lab" };
const KIND_ICON = { term: "book", step: "cycle", example: "bulb", equation: "sigma", key: "star", pitfall: "alert", case: "scales", law: "landmark", drug: "pill",
  objective: "target", summary: "layers", question: "bulb", compare: "route", cause: "route", concept: "brain", principle: "shield", prereq: "route", lab: "atom", section: "layers", group: "layers" };
const plainText = (s) => String(s ?? "").replace(/\*\*([^*]+)\*\*/g, "$1").replace(/`([^`]+)`/g, "$1").replace(/\s+/g, " ").trim();
// what practice asks for each kind of idea
function promptFor(kind, topic) {
  if (kind === "term" || kind === "concept") return `What does “${topic}” mean?`;
  if (kind === "pitfall") return `What's the mistake to avoid here: “${topic}”?`;
  if (kind === "equation") return `What is this formula, and what does each part mean? ${topic}`;
  if (kind === "step") return `What happens at this step: “${topic}”?`;
  if (kind === "question") return topic;
  return `Explain: ${topic}`;
}
export function buildTreeMap(tree, { learnt = new Set(), edits = {} } = {}) {
  const labels = edits.labels || {}, removed = new Set(edits.removed || []), colours = edits.colours || {};
  const nodes = [], links = [];
  const add = (n) => { if (removed.has(n.id)) return false; nodes.push({ ...n, label: labels[n.id] ?? n.label }); return true; };
  const root = tree.root;
  add({ id: "root", type: "root", label: plainText(root.topic), sub: root.detail ? plainText(root.detail) : "", parent: null, colour: "7b86ff", icon: "brain", lesson: true });
  const idOf = (id) => (id === root.id ? "root" : id);
  root.children.forEach((b, ti) => {
    const c = colours[b.id] || LESSON_PALETTE[ti % LESSON_PALETTE.length];
    const title = plainText(b.topic), byWord = iconForTopic(title);
    if (!add({ id: b.id, type: "topic", label: title, sub: b.detail ? plainText(b.detail) : "", acronym: "", parent: "root", branch: b.id, colour: c,
      icon: byWord !== "layers" ? byWord : KIND_ICON[b.children[0]?.kind] || KIND_ICON[b.kind] || "layers", topic: ti, lk: b.kind, emoji: b.icon || "" })) return;
    links.push({ from: "root", to: b.id, kind: "arm" });
    const walk = (n, parent) => n.children.forEach((k) => {
      const topic = plainText(k.topic), def = k.detail && plainText(k.detail) !== topic ? plainText(k.detail) : "";
      const fact = { term: topic, ab: null, def, kind: k.kind, src: def || topic, text: def || topic, prompt: promptFor(k.kind, topic) };
      if (!add({ id: k.id, type: "term", label: topic, sub: def, parent, branch: b.id, colour: c, icon: KIND_ICON[k.kind] || "dot", topic: ti, fact, lk: k.kind,
        gap: k.kind === "gap" || k.kind === "limit", learnt: learnt.has(topic.toLowerCase()) })) return;
      links.push({ from: parent, to: k.id, kind: "leg" });
      walk(k, k.id);
    });
    walk(b, b.id);
  });
  const have = new Set(nodes.map((n) => n.id));
  // the lesson's own cross-links ("uses", "about", "tests"), from its words
  for (const l of tree.links || []) { const f = idOf(l.from), t = idOf(l.to); if (have.has(f) && have.has(t) && f !== t) links.push({ from: f, to: t, kind: "lesson", label: l.label || "relates to" }); }
  for (const a of edits.added || []) {
    if (removed.has(a.id) || !have.has(a.parent)) continue;
    const p = nodes.find((n) => n.id === a.parent);
    nodes.push({ id: a.id, type: "note", label: labels[a.id] ?? a.label, sub: a.sub || "", parent: a.parent, branch: p.branch, colour: p.colour, icon: NODE_TYPES.note.icon, topic: p.topic, custom: true });
    links.push({ from: a.parent, to: a.id, kind: "custom" });
    have.add(a.id);
  }
  for (const l of edits.links || []) if (have.has(l.from) && have.has(l.to) && l.from !== l.to) links.push({ from: l.from, to: l.to, kind: "user" });
  return { nodes, links, byId: new Map(nodes.map((n) => [n.id, n])), lesson: true };
}

// a definition as a sentence: capitalised, with one full stop
export const sentence = (s) => { const t = String(s || "").trim(); return t ? `${t[0].toUpperCase()}${t.slice(1)}${/[.!?…:]$/.test(t) ? "" : "."}` : ""; };

// every node below `id`, for moving or collapsing a whole arm
export function descendants(map, id) {
  const out = [], kids = new Map();
  for (const n of map.nodes) if (n.parent) { if (!kids.has(n.parent)) kids.set(n.parent, []); kids.get(n.parent).push(n.id); }
  const walk = (x) => (kids.get(x) || []).forEach((c) => { out.push(c); walk(c); });
  walk(id);
  return out;
}

// a short id that won't clash with the generated ones
export const newId = () => `n${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`;

// a stable key for this set of notes, so saved layouts come back with the same notes
export function mapKey(pack) {
  const s = `${pack.title}|${pack.groups.map((g) => g.facts.map((f) => f.term).join(",")).join("|")}`;
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
}
