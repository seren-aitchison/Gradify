// Gradify Intelligence 3.0: concept identity, the evidence-weighted graph, card ordering, the opportunity engine,
// adaptive card needs, teaching experiments and readiness by objective (kit/intel/*.js).
import { test } from "node:test";
import assert from "node:assert/strict";
import { canonical, conceptId, learnAliases, unify, shared } from "../kit/intel/identity.js";
import { weightedGraph, usable, depthOf, USE_AT } from "../kit/intel/graph.js";
import { orderCards, interleave, forWindow, windowSize } from "../kit/intel/order.js";
import { cardNeeds, isDuplicate } from "../kit/intel/cardgen.js";
import { teachingExperiments, tutorEvent } from "../kit/intel/experiments.js";
import { objectiveReadiness, statusOf } from "../kit/intel/readiness.js";
import { dependencyGraph } from "../kit/intel/debt.js";

const NOW = new Date(2026, 10, 14, 9).getTime(), DAY = 864e5, iso = (t) => new Date(t).toISOString();
const concept = (key, name, o = {}) => ({ key, name, site: null, level: "learning", mastery: 0.5, seen: 3, answers: 4, certaintyLabel: "medium", certainty: 0.5, cards: 4, dims: { recall: { n: 0, value: null } }, ...o });

// ---------- concept identity ----------
test("concept identity: case, plurals, word order, brackets and leading filler don't make a new concept", () => {
  const id = conceptId("Cardiac output");
  assert.equal(id, "c:cardiac-output");
  assert.equal(conceptId("cardiac outputs"), id);
  assert.equal(conceptId("Introduction to Cardiac Output (CO)"), id);
  assert.equal(conceptId("CO"), id, "a known abbreviation expands");
  assert.equal(conceptId("Contract law"), conceptId("Law of contract"));
  assert.notEqual(conceptId("Cardiac output regulation"), id, "a narrower concept stays separate");
  assert.deepEqual(canonical("Analysis"), ["analysis"], "words ending -is aren't singularised");
});

test("concept identity learns the learner's own abbreviations and unifies mentions across sites", () => {
  const aliases = learnAliases([{ front: "What is the glomerular filtration rate (GFR) in health?", back: "" }, { front: "Peak expiratory flow (PEF) falls in asthma", back: "" }]);
  assert.equal(aliases.get("pef"), "peak expiratory flow");
  const { concepts, idOf } = unify([
    { kind: "notes", key: "d1|PEF", name: "PEF", site: "MedGradify" },
    { kind: "course", key: "course:NurseGradify:Peak expiratory flow", name: "Peak expiratory flow", site: "NurseGradify" },
    { kind: "notes", key: "d2|Asthma", name: "Asthma", site: "MedGradify" },
  ], aliases);
  assert.equal(idOf.get("d1|PEF"), idOf.get("course:NurseGradify:Peak expiratory flow"));
  const sh = shared(concepts);
  assert.equal(sh.length, 1);
  assert.deepEqual(sh[0].sites.sort(), ["MedGradify", "NurseGradify"]);
});

// ---------- evidence-weighted graph ----------
test("the graph: one shared term alone is never enough to act on", () => {
  const concepts = [concept("d|A", "Preload", { level: "new", seen: 0, answers: 0 }), concept("d|B", "Stroke volume", { level: "shaky", mastery: 0.3 })];
  const g = weightedGraph({ noteEdges: [{ from: "d|A", to: "d|B", term: "preload", card: "SV rises with preload", terms: ["preload"] }], concepts });
  assert.equal(g.length, 1);
  assert.ok(g[0].confidence < USE_AT && !g[0].used, `${g[0].confidence} should be under ${USE_AT}`);
  assert.equal(usable(g).length, 0);
});

test("the graph: two terms, the learner's answers, or a course prerequisite make a link usable", () => {
  const A = concept("d|A", "Preload", { level: "shaky", mastery: 0.4 }), B = concept("d|B", "Stroke volume", { level: "shaky", mastery: 0.3 });
  const two = weightedGraph({ noteEdges: [{ from: "d|A", to: "d|B", term: "preload", terms: ["preload", "end-diastolic volume"] }], concepts: [{ ...A, level: "new", seen: 0, answers: 0 }, B] })[0];
  assert.ok(two.used, "two defined terms");
  const perf = weightedGraph({ noteEdges: [{ from: "d|A", to: "d|B", term: "preload", terms: ["preload"] }], concepts: [A, B] })[0];
  assert.ok(perf.used && perf.sources.some((s) => s.kind === "performance"), "the answers agree");
  const course = weightedGraph({ concepts: [{ ...A, level: "new" }, B], courses: [{ site: "MedGradify", name: "Medicine", prereqs: [{ from: "preload", to: "Stroke volumes" }] }] });
  const linked = course.find((e) => e.from === "d|A" && e.to === "d|B");
  assert.ok(linked?.used && linked.kind === "explicit", "a course prerequisite applies to the same concepts in the notes");
  assert.ok(course.some((e) => e.from.startsWith("course:")), "and is kept between the course's own modules");
});

test("the graph: a strong dependant with high certainty weakens the link", () => {
  const g = weightedGraph({ noteEdges: [{ from: "d|A", to: "d|B", term: "x", terms: ["x", "y"] }], concepts: [concept("d|A", "A", { level: "shaky", mastery: 0.3 }), concept("d|B", "B", { level: "strong", mastery: 0.9, certaintyLabel: "high" })] })[0];
  assert.ok(g.sources.some((s) => s.kind === "contradiction"));
  assert.ok(g.confidence < 0.7 && !g.used);
  const depth = depthOf([{ from: "a", to: "b" }, { from: "b", to: "c" }, { from: "c", to: "a" }]);
  assert.ok(Number.isFinite(depth("c")), "cycles don't loop forever");
});

// ---------- card ordering ----------
const card = (id, topic, o = {}) => ({ id, topic, document_id: "d", front: `${topic} ${id}`, back: "x", reps: o.reps ?? 2, ease: 15, interval_days: o.S ?? 5, updated_at: iso(NOW - (o.ago ?? 5) * DAY), due_at: iso(NOW - DAY), last_rating: o.last ?? "good", suspended: false });

test("card order: foundations before what rests on them, fading before fresh, sure-but-wrong early", () => {
  const cards = [card("b1", "Cardiac output", { ago: 2 }), card("a1", "Stroke volume", { ago: 2 }), card("c1", "Valves", { ago: 30, S: 2 }), card("m1", "Valves", { ago: 1, S: 30, last: "again" })];
  const edges = [{ from: "d|Stroke volume", to: "d|Cardiac output", used: true }];
  const reviews = [{ card_id: "m1", rating: "again", confidence: "sure", reviewed_at: iso(NOW - DAY) }];
  const { queue, why } = orderCards(cards, { edges, reviews, minutes: 20, now: NOW });
  const at = (id) => queue.findIndex((c) => c.id === id);
  assert.ok(at("a1") < at("b1"), "the prerequisite comes first");
  assert.ok(at("c1") < at("b1"), "a badly faded card comes before a fresh one");
  assert.ok(at("m1") <= 1, "a sure-but-wrong card is early");
  assert.ok(why.get("a1").some((r) => /rests? on/.test(r)), "every card says why");
});

test("card order: fits the minutes, caps new cards, and never runs a topic more than three in a row", () => {
  const cards = [...Array.from({ length: 8 }, (_, i) => card(`x${i}`, "X", { ago: 20, S: 2 })), ...Array.from({ length: 3 }, (_, i) => card(`y${i}`, "Y", { ago: 3 })), ...Array.from({ length: 10 }, (_, i) => ({ ...card(`n${i}`, "N"), reps: 0 }))];
  const { queue, seconds } = orderCards(cards, { minutes: 5, now: NOW });
  assert.ok(queue.length * seconds <= 300);
  assert.ok(queue.filter((c) => !c.reps).length <= Math.floor(300 / seconds / 3));
  const runs = interleave([..."AAAAAB"].map((k, i) => ({ k, i })));
  assert.ok(!runs.slice(0, 4).every((x) => x.k === "A"), "a fourth card of one topic waits for another topic");
});

// ---------- the learning opportunity engine ----------
test("free time: short windows get quick recall, long ones get new material, nothing overruns", () => {
  const m = { prio: { items: [
    { id: "root:a", kind: "root", title: "Fix the root", mins: 15, score: 110 },
    { id: "due", kind: "review", title: "Due cards", mins: 20, score: 70 },
    { id: "course:x", kind: "lesson", title: "Next lesson", mins: 12, score: 60 },
    { id: "fade:y", kind: "review", title: "Fading topic", mins: 5, score: 76 },
  ] } };
  assert.equal(windowSize(8), "short"); assert.equal(windowSize(45), "long");
  const s = forWindow(m, 8);
  assert.equal(s.items[0].kind, "review");
  assert.ok(s.used <= 8);
  const l = forWindow(m, 60);
  assert.ok(l.items.some((x) => x.kind === "lesson") && l.items.some((x) => x.kind === "root"));
  assert.equal(new Set(l.items.map((x) => x.kind)).size, l.items.length, "one of each kind");
  assert.equal(forWindow(m, 2).items.length, 0);
});

// ---------- adaptive card needs ----------
test("card coach: compares confusable terms and reverses known definitions, from the learner's own words only", () => {
  const cards = [
    { id: "1", document_id: "d", topic: "Volumes", kind: "definition", front: "What is end-diastolic volume?", back: "Blood in the ventricle at the end of filling.", reps: 2, last_rating: "again", lapses: 1 },
    { id: "2", document_id: "d", topic: "Volumes", kind: "definition", front: "What is end-systolic volume?", back: "Blood left in the ventricle after contraction.", reps: 3, last_rating: "good" },
    { id: "3", document_id: "d", topic: "Rate", kind: "definition", front: "What is heart rate?", back: "Beats per minute.", reps: 3, last_rating: "good" },
  ];
  const needs = cardNeeds({ concepts: [concept("d|Volumes", "Volumes"), concept("d|Rate", "Rate")], cards });
  const cmp = needs.find((x) => x.need === "compare");
  assert.ok(cmp, "end-diastolic and end-systolic volume are confusable");
  assert.match(cmp.card.back, /Blood in the ventricle at the end of filling/);
  const rev = needs.find((x) => x.need === "reverse" && x.key === "d|Rate");
  assert.equal(rev.card.front, "Which term means: Beats per minute?");
  assert.equal(rev.card.back, "Heart rate");
  // no duplicates: once the reverse card exists, it isn't suggested again
  const again = cardNeeds({ concepts: [concept("d|Rate", "Rate")], cards: [...cards, { ...rev.card, id: "4", reps: 0 }] });
  assert.ok(!again.some((x) => x.need === "reverse" && x.key === "d|Rate"));
  assert.ok(isDuplicate("what is HEART rate", cards));
});

test("card coach: flags application and stubborn cards without writing content", () => {
  const cards = [{ id: "1", document_id: "d", topic: "T", kind: "definition", front: "What is osmosis exactly in cells?", back: "x".repeat(200), reps: 9, lapses: 4, last_rating: "good" }];
  const needs = cardNeeds({ concepts: [concept("d|T", "T", { dims: { recall: { n: 5, value: 0.85 } } })], cards });
  assert.ok(needs.some((x) => x.need === "apply" && !x.card));
  assert.ok(needs.some((x) => x.need === "rephrase" && x.cardId === "1"));
});

// ---------- teaching experiments ----------
test("teaching experiments: measures later answers after each tutor mode and only recommends with evidence", () => {
  const ledger = [], attempts = [];
  const use = (mode, lesson, day, before, after) => {
    ledger.push({ ...tutorEvent({ site: "S", subject: "s", lesson, mode }), at: iso(NOW - day * DAY) });
    attempts.push({ lesson, subject: "s", score: before, at: iso(NOW - (day + 1) * DAY), marking: { status: "final" } });
    attempts.push({ lesson, subject: "s", score: after, at: iso(NOW - (day - 1) * DAY), marking: { status: "final" } });
  };
  let t = teachingExperiments({ ledger, attempts, now: NOW });
  assert.equal(t.enough, false); assert.ok(t.suggest.why.length);
  for (let i = 0; i < 3; i++) { use("socratic", `s${i}`, 10 + i * 3, 0.4, 0.9); use("explain", `e${i}`, 10 + i * 3, 0.5, 0.55); }
  t = teachingExperiments({ ledger, attempts, now: NOW });
  assert.ok(t.enough);
  assert.equal(t.best.mode, "socratic");
  assert.equal(t.modes.find((x) => x.mode === "socratic").measured, 3);
  // exploration: on some days it still suggests a less-tried mode
  const days = Array.from({ length: 3 }, (_, k) => teachingExperiments({ ledger, attempts, now: NOW + k * DAY }).suggest.mode);
  assert.ok(days.includes("socratic") && days.some((m) => m !== "socratic"));
});

// ---------- readiness by objective ----------
test("readiness by objective: little evidence gives a wide range; more right answers narrow it and lift it", () => {
  const a = (score, daysAgo, o = 1, lesson = "u1-1") => ({ lesson, subject: "med", site: "MedGradify", score, at: iso(NOW - daysAgo * DAY), question: { objectives: [o] }, marking: { status: "final" } });
  const thin = objectiveReadiness({ attempts: [a(1, 1)], examDate: "2026-12-01", now: NOW }).objectives[0];
  assert.equal(thin.status, "unknown", "one answer isn't enough to call it");
  const many = objectiveReadiness({ attempts: [1, 3, 6, 9, 12, 15].map((d) => a(1, d)), examDate: "2026-12-01", titles: new Map([["u1-1", "Heart"]]), now: NOW });
  const o = many.objectives[0];
  assert.ok(o.hi - o.lo < thin.hi - thin.lo, "more evidence, narrower range");
  assert.ok(o.p > 0.6 && o.lo <= o.p && o.p <= o.hi);
  assert.match(o.name, /^Heart: objective 1$/);
  const bad = objectiveReadiness({ attempts: [0, 0.2, 0, 0.1].map((s, i) => a(s, i + 1, 2)), now: NOW }).objectives[0];
  assert.equal(bad.status, "at-risk");
  assert.equal(statusOf(0.9, 0.75, 5), "ready");
  assert.equal(many.summary.total, 1);
});

test("readiness by objective: the learner's own topics use FSRS recall on exam day", () => {
  const cards = [{ id: "1", document_id: "d", topic: "T", reps: 3, ease: 15, interval_days: 3, updated_at: iso(NOW), due_at: iso(NOW + 3 * DAY), last_rating: "good" }];
  const near = objectiveReadiness({ cards, concepts: [concept("d|T", "T", { certainty: 0.8 })], examDate: "2026-11-15", now: NOW }).objectives[0];
  const far = objectiveReadiness({ cards, concepts: [concept("d|T", "T", { certainty: 0.8 })], examDate: "2027-02-01", now: NOW }).objectives[0];
  assert.ok(near.p > far.p, "memory fades more by a later exam");
});

test("dependency edges keep every shared term, so the graph can weigh them", () => {
  const cards = [
    { id: "1", document_id: "d", topic: "A", front: "What is preload?", back: "stretch", kind: "definition" },
    { id: "2", document_id: "d", topic: "A", front: "What is afterload?", back: "resistance", kind: "definition" },
    { id: "3", document_id: "d", topic: "B", front: "How do preload and afterload set stroke volume?", back: "…", kind: "why" },
  ];
  const e = dependencyGraph(cards).find((x) => x.from === "d|A" && x.to === "d|B");
  assert.deepEqual(e.terms.sort(), ["afterload", "preload"]);
  assert.ok(weightedGraph({ noteEdges: [e], concepts: [] })[0].used);
});
