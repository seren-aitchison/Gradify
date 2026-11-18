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

// ---------- synced with the learner's memory ----------
import { memoryFor, cardsAbout, whenText } from "../kit/notes/mindmap/memory.js";
const NOW = Date.parse("2026-11-18T12:00:00Z"), D = 864e5;
const iso = (t) => new Date(t).toISOString();
const card = (id, front, back, o) => ({ id, front, back, reps: 2, ease: 2.5, suspended: false, last_rating: "good", ...o });
const CARDS = [
  card("sv", "What is stroke volume (SV)?", "Amount of blood ejected per beat.", { reps: 4, interval_days: 30, due_at: iso(NOW + 25 * D) }),
  card("sys", "What is systole?", "Phase when ventricles contract.", { interval_days: 1, due_at: iso(NOW - 5 * D) }),
  card("s1", "What causes the first heart sound (S1)?", "Closure of the mitral and tricuspid valves.", { interval_days: 1, due_at: iso(NOW + D), last_rating: "again" }),
  card("other", "What is a mitochondrion?", "The powerhouse of the cell.", { interval_days: 5, due_at: iso(NOW + 3 * D) }),
];
const REVIEWS = [
  { card_id: "s1", rating: "again", confidence: "sure", reviewed_at: iso(NOW - 2 * D) },
  { card_id: "s1", rating: "good", confidence: "unsure", reviewed_at: iso(NOW - 6 * D) },
  { card_id: "sv", rating: "good", reviewed_at: iso(NOW - 5 * D) },
];

test("the map finds the learner's own cards for each term, by name or abbreviation, and ignores the rest", () => {
  assert.deepEqual(cardsAbout("Stroke volume", "SV", CARDS).map((c) => c.id), ["sv"]);
  assert.deepEqual(cardsAbout("First heart sound", "S1", CARDS).map((c) => c.id), ["s1"]);
  assert.deepEqual(cardsAbout("Diastole", null, CARDS), []);
});

test("each term's memory comes from the learner's real answers: strong, fading, shaky or not tracked", () => {
  const m = buildMap(pack);
  const id = (term) => m.nodes.find((n) => n.fact?.term === term).id;
  const r = memoryFor(m, { cards: CARDS, reviews: REVIEWS, now: NOW });
  assert.equal(r.synced, true);
  assert.equal(r.tracked, 3);
  assert.equal(r.terms.get(id("Stroke volume")).state, "strong");
  assert.equal(r.terms.get(id("Systole")).state, "fading");
  assert.ok(r.terms.get(id("Systole")).due);
  assert.equal(r.terms.get(id("First heart sound")).state, "shaky");
  assert.equal(r.terms.get(id("First heart sound")).sureWrong, 1);
  assert.ok(!r.terms.has(id("Diastole")));
  assert.equal(memoryFor(m, {}).synced, false);
  assert.equal(whenText(NOW + 2 * D, NOW), "in 2 days");
});

test("Intelligence puts the learner's misconceptions and fading terms first, and counts strong terms as known", () => {
  const m = buildMap(pack);
  const memory = memoryFor(m, { cards: CARDS, reviews: REVIEWS, now: NOW });
  const r = insights(m, { memory });
  assert.equal(r.insights[0].kind, "shaky");
  assert.ok(r.insights.some((i) => i.kind === "fading"));
  assert.ok(r.known(m.nodes.find((n) => n.fact?.term === "Stroke volume").id));
  assert.equal(r.learnt, 1);
  // stroke volume is known now, so the next thing to learn is something else
  assert.ok(!r.insights.find((i) => i.kind === "next").title.includes("Stroke volume"));
});

// ---------- ask the map, export, and the learner's own links and colours ----------
import { ask, mentioned } from "../kit/notes/mindmap/ask.js";
import { toMarkdown } from "../kit/notes/mindmap/export.js";

test("Ask the map finds the terms a question names, longest first, by name or abbreviation", () => {
  const m = buildMap(pack);
  assert.deepEqual(mentioned("compare S1 and the second heart sound", m).map((n) => n.fact.term), ["First heart sound", "Second heart sound"]);
  assert.deepEqual(mentioned("what is cardiac output?", m).map((n) => n.fact.term), ["Cardiac output"]);
});

test("Ask the map answers only from the notes: compare, depends on, first steps, memory, and says when it can't", () => {
  const m = buildMap(pack), intel = insights(m);
  const cmp = ask("Compare systole and diastole", m, intel);
  assert.equal(cmp.kind, "compare");
  assert.match(cmp.parts.at(-1).text, /easy to mix up/);
  const dep = ask("What does cardiac output depend on?", m, intel);
  assert.equal(dep.kind, "term");
  assert.ok(dep.parts.some((p) => p.head === "Builds on" && /Stroke volume/.test(p.text)));
  assert.equal(ask("What should I learn first?", m, intel).kind, "order");
  assert.match(ask("What am I forgetting?", m, intel).title, /can't see your memory/);
  assert.equal(ask("Who won the 1966 World Cup?", m, intel).kind, "none");
  const memory = memoryFor(m, { cards: CARDS, reviews: REVIEWS, now: NOW });
  const forgetting = ask("What am I forgetting?", m, insights(m, { memory }), memory);
  assert.ok(forgetting.ids.includes(m.nodes.find((n) => n.fact?.term === "First heart sound").id));
});

test("the learner's own links and topic colours survive in the map, and links to hidden nodes are dropped", () => {
  const m = buildMap(pack, { edits: { colours: { t0: "ff5a4d" }, links: [{ from: "t0.f0", to: "t3.f1" }, { from: "t0.f0", to: "t9.f9" }] } });
  assert.equal(m.byId.get("t0").colour, "ff5a4d");
  assert.ok(m.nodes.filter((n) => n.parent === "t0").every((n) => n.colour === "ff5a4d"));
  assert.deepEqual(m.links.filter((l) => l.kind === "user").map((l) => `${l.from}>${l.to}`), ["t0.f0>t3.f1"]);
});

test("the map exports as a Markdown outline with every topic, term, formula and link", () => {
  const m = buildMap(pack), md = toMarkdown(m, insights(m));
  assert.match(md, /^# Cardiac cycle/);
  for (const g of pack.groups) for (const f of g.facts) assert.ok(md.includes(`**${f.term}`), f.term);
  assert.match(md, /`CO = SV × HR`/);
  assert.match(md, /Cardiac output \(CO\) builds on Stroke volume \(SV\)/);
});

// ---------- exam forecast, gaps in the notes ----------
import { gaps } from "../kit/notes/mindmap/intel.js";

test("recall is forecast for the learner's exam day, and Intelligence warns about what will slip before it", () => {
  const m = buildMap(pack);
  const examDate = new Date(NOW + 30 * D).toISOString().slice(0, 10);
  const memory = memoryFor(m, { cards: CARDS, reviews: REVIEWS, now: NOW, examDate });
  const sv = memory.terms.get(m.nodes.find((n) => n.fact?.term === "Stroke volume").id);
  assert.ok(sv.atExam < sv.recall, "memory fades between now and the exam");
  const exam = insights(m, { memory }).insights.find((i) => i.kind === "exam");
  assert.ok(exam && exam.ids.length >= 1);
  // a past exam date isn't forecast
  assert.equal(memoryFor(m, { cards: CARDS, reviews: REVIEWS, now: NOW, examDate: "2020-01-01" }).examAt, null);
});

test("gaps are words several definitions lean on that no term defines", () => {
  const g = gaps(buildMap(pack));
  assert.equal(g[0].word, "ventricles");
  assert.ok(g[0].ids.length >= 3);
  assert.ok(!g.some((x) => ["stroke", "systole", "cardiac"].includes(x.word)));
  assert.ok(insights(buildMap(pack)).insights.some((i) => i.kind === "gap" && i.word === "ventricles"));
});

// ---------- every lesson's maps in the spidermap ----------
import { buildTreeMap } from "../kit/notes/mindmap/model.js";
import { parseNotes } from "../kit/course/notes.js";
import { buildMaps } from "../kit/maps/build.js";

test("a lesson's five maps become spidermaps with every idea, its kind, its links and a place for each node", async () => {
  for (const [subject, unit, i] of [["chemistry", "u01", 2], ["law", "u01", 0], ["medicine", "u03", 1], ["history", "u03", 0]]) {
    const text = (await import(`../kit/courses/${subject}/notes/${unit}.js`)).default;
    const r = buildMaps(parseNotes(text)[i], { id: `${subject}:${unit}-${i}`, notes: text });
    for (const m of r.maps) {
      const map = buildTreeMap(m);
      assert.equal(map.nodes.length, m.nodes, `${subject} ${m.key}: every node of the lesson map is on the spidermap`);
      assert.equal(map.nodes.filter((n) => n.type === "topic").length, m.root.children.length);
      assert.equal(map.links.filter((l) => l.kind === "lesson").length, m.links.length, `${subject} ${m.key}: the lesson's own links`);
      for (const n of map.nodes) assert.ok(n.type === "root" || map.byId.has(n.parent), `${n.id} has its parent`);
      const pos = layout(map, "spider");
      for (const n of map.nodes) assert.ok(Number.isFinite(pos[n.id]?.x), `${subject} ${m.key}: ${n.id} placed`);
      const intel = insights(map);
      assert.ok(Array.isArray(intel.insights));
      for (const t of map.nodes.filter((n) => n.type === "term")) assert.ok(t.fact.term && t.fact.prompt, `${t.id} can be practised`);
    }
  }
});

test("lesson Intelligence uses the lesson's own links, mistakes and test questions", async () => {
  const text = (await import("../kit/courses/chemistry/notes/u01.js")).default;
  const r = buildMaps(parseNotes(text)[2], { id: "chemistry:u01-2", notes: text });
  const exam = buildTreeMap(r.maps.find((m) => m.key === "exam")), x = insights(exam);
  assert.ok(x.insights.some((i) => i.kind === "question"));
  assert.ok(x.insights.some((i) => /common mistake/.test(i.title)));
  const topic = buildTreeMap(r.maps[0]);
  assert.ok(insights(topic).links.some((l) => l.kind === "builds"), "the lesson's cross-links become builds-on links");
});
