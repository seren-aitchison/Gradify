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
      parent: "root", colour: c, icon: iconForTopic(g.theme) !== "layers" ? iconForTopic(g.theme) : iconForTopic(g.label), topic: ti })) return;
    links.push({ from: "root", to: id, kind: "arm" });
    g.facts.forEach((f, k) => {
      const fid = `${id}.f${k}`;
      if (add({ id: fid, type: "term", label: termLabel(f), sub: f.def, parent: id, colour: c, icon: NODE_TYPES.term.icon, topic: ti, fact: f,
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
    nodes.push({ id: a.id, type: "note", label: labels[a.id] ?? a.label, sub: a.sub || "", parent: a.parent, colour: p.colour, icon: NODE_TYPES.note.icon, topic: p.topic, custom: true });
    links.push({ from: a.parent, to: a.id, kind: "custom" });
    have.add(a.id);
  }
  // links the learner drew themselves, between any two nodes still on the map
  for (const l of edits.links || []) if (have.has(l.from) && have.has(l.to) && l.from !== l.to) links.push({ from: l.from, to: l.to, kind: "user" });
  return { nodes, links, byId: new Map(nodes.map((n) => [n.id, n])) };
}

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
