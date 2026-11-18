import { test } from "node:test";
import assert from "node:assert/strict";
import { SAMPLE, analyseNotes, deeperQuestions } from "../kit/notes/studio.js";
import { buildMap, descendants, mapKey } from "../kit/notes/mindmap/model.js";
import { layout, LAYOUT_FNS, bounds } from "../kit/notes/mindmap/layout.js";
import { findLinks, learningOrder, insights } from "../kit/notes/mindmap/intel.js";
import { NODE_TYPES } from "../kit/notes/mindmap/config.js";

const TODAY = new Date(2026, 9, 20);
const pack = analyseNotes(SAMPLE, TODAY);

test("the map has the notes at the centre, a node per topic and per term, and stable ids", () => {
  const m = buildMap(pack);
  assert.equal(m.nodes[0].id, "root");
  assert.equal(m.nodes.filter((n) => n.type === "topic").length, pack.groups.length);
  assert.equal(m.nodes.filter((n) => n.type === "term").length, pack.groups.reduce((s, g) => s + g.facts.length, 0));
  assert.equal(m.nodes.filter((n) => n.type === "eq").length, pack.equations.length);
  for (const l of m.links) assert.ok(m.byId.has(l.from) && m.byId.has(l.to), `${l.from} → ${l.to}`);
  assert.equal(mapKey(pack), mapKey(analyseNotes(SAMPLE, TODAY)));
});

test("the learner's edits: renames, their own notes, hidden nodes, and notes under a hidden parent go too", () => {
  const edits = { labels: { t0: "My topic" }, added: [{ id: "n1", parent: "t0.f0", label: "Remember this" }, { id: "n2", parent: "t1.f0", label: "Gone" }], removed: ["t1"] };
  const m = buildMap(pack, { edits });
  assert.equal(m.byId.get("t0").label, "My topic");
  assert.equal(m.byId.get("n1").type, "note");
  assert.ok(!m.byId.has("t1") && !m.byId.has("t1.f0") && !m.byId.has("n2"));
  assert.deepEqual(descendants(m, "t0").includes("n1"), true);
});

test("terms rated known are marked on the map", () => {
  const term = pack.groups[0].facts[0].term;
  const m = buildMap(pack, { learnt: new Set([term.toLowerCase()]) });
  assert.equal(m.byId.get("t0.f0").learnt, true);
});

test("every layout places every node, and the spider keeps nodes from overlapping", () => {
  const m = buildMap(pack);
  for (const id of Object.keys(LAYOUT_FNS)) {
    const pos = layout(m, id);
    for (const n of m.nodes) assert.ok(Number.isFinite(pos[n.id]?.x) && Number.isFinite(pos[n.id]?.y), `${id}: ${n.id}`);
    assert.deepEqual(pos.root, { x: 0, y: 0 });
  }
  const pos = layout(m, "spider");
  const box = (n) => NODE_TYPES[n.type];
  for (const a of m.nodes) for (const b of m.nodes) {
    if (a === b) continue;
    const ox = (box(a).w + box(b).w) / 2 - Math.abs(pos[a.id].x - pos[b.id].x), oy = (box(a).h + box(b).h) / 2 - Math.abs(pos[a.id].y - pos[b.id].y);
    assert.ok(ox <= 1 || oy <= 1, `${a.id} overlaps ${b.id}`);
  }
  assert.ok(bounds(m, pos).w > 0);
});

test("Gradify Intelligence links a term to the terms whose definitions use it, and orders them", () => {
  const m = buildMap(pack);
  const links = findLinks(m);
  const id = (term) => m.nodes.find((n) => n.fact?.term === term)?.id;
  const sv = id("Stroke volume"), co = id("Cardiac output");
  assert.ok(links.some((l) => l.kind === "builds" && l.from === sv && l.to === co), "cardiac output builds on stroke volume");
  for (const l of links) { assert.ok(l.confidence >= 0.45 && l.evidence && l.why); }
  const order = learningOrder(m, links);
  assert.ok(order.indexOf(sv) < order.indexOf(co));
  // systole and diastole are both "the phase when the ventricles…": easy to mix up
  assert.ok(links.some((l) => l.kind === "contrast" && [l.from, l.to].includes(id("Systole")) && [l.from, l.to].includes(id("Diastole"))));
});

test("insights start with what to learn next, quote their evidence, and carry the deeper questions", () => {
  const m = buildMap(pack);
  const r = insights(m, { questions: deeperQuestions(pack) });
  assert.equal(r.insights[0].kind, "next");
  assert.equal(r.total, m.nodes.filter((n) => n.type === "term").length);
  for (const x of r.insights.filter((i) => i.kind === "builds" || i.kind === "contrast")) assert.ok(x.evidence);
  assert.ok(r.insights.some((i) => i.kind === "question"));
  const all = buildMap(pack, { learnt: new Set(pack.facts.filter((f) => f.term).map((f) => f.term.toLowerCase())) });
  assert.equal(insights(all).insights[0].kind, "done");
});
