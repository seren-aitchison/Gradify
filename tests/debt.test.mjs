import { test } from "node:test";
import assert from "node:assert/strict";
import { definedTerm, dependencyGraph, knowledgeDebts, dependants } from "../kit/intel/debt.js";
import { learnerMemory, predictions } from "../kit/intel/memory.js";
import { prioritise } from "../kit/intel/priority.js";

const NOW = new Date(2026, 10, 13, 9).getTime(), DAY = 864e5;
const card = (id, topic, front, back, o = {}) => ({ id, topic, front, back, kind: o.kind || "definition", document_id: "d1", reps: o.reps ?? 0, interval_days: o.interval ?? 0, last_rating: o.last ?? null, due_at: new Date(NOW - (o.ago ?? 0) * DAY + (o.interval ?? 0) * DAY).toISOString() });

test("defined terms come from 'What is…', 'Define…' and abbreviations", () => {
  assert.equal(definedTerm({ front: "What is stroke volume?" }), "stroke volume");
  assert.equal(definedTerm({ front: "Define the Frank-Starling law" }), "frank-starling law");
  assert.equal(definedTerm({ front: "What does it mean?" }), null, "too vague to be a term");
  assert.equal(definedTerm({ front: "Explain why the heart has valves", kind: "why" }), null);
});

function sample() {
  const cards = [
    card("p1", "Preload", "What is preload?", "The stretch of the ventricle before it contracts."),
    card("s1", "Stroke volume", "What is stroke volume?", "Blood ejected per beat; it rises with preload.", { reps: 2, last: "good", interval: 1, ago: 1 }),
    card("s2", "Stroke volume", "Why does stroke volume rise with exercise?", "More venous return increases preload.", { kind: "why", reps: 1, last: "again", ago: 1 }),
    card("c1", "Cardiac output", "Cardiac output (CO) equals?", "Stroke volume multiplied by heart rate.", { reps: 2, last: "again", ago: 1 }),
    card("c2", "Cardiac output", "What happens to CO if stroke volume doubles and heart rate halves?", "It stays the same.", { reps: 2, last: "again", ago: 1 }),
    card("v1", "Valves", "What is the mitral valve?", "The valve between the left atrium and ventricle."),
  ];
  const reviews = [
    { card_id: "c1", rating: "again", confidence: "sure", reviewed_at: new Date(NOW - DAY).toISOString() },
    { card_id: "c2", rating: "again", confidence: "sure", reviewed_at: new Date(NOW - DAY).toISOString() },
    { card_id: "s2", rating: "again", confidence: "unsure", reviewed_at: new Date(NOW - DAY).toISOString() },
    { card_id: "s1", rating: "good", confidence: "sure", reviewed_at: new Date(NOW - DAY).toISOString() },
  ];
  return { cards, reviews };
}

test("the dependency graph links topics by a term one defines and another uses", () => {
  const edges = dependencyGraph(sample().cards);
  const has = (a, b) => edges.some((e) => e.from === `d1|${a}` && e.to === `d1|${b}`);
  assert.ok(has("Stroke volume", "Cardiac output"));
  assert.ok(has("Preload", "Stroke volume"));
  assert.ok(!has("Valves", "Cardiac output"), "unrelated topics aren't linked");
  assert.equal(edges.find((e) => e.to === "d1|Cardiac output").term, "stroke volume");
  assert.equal(dependants(edges).get("d1|Preload"), 1);
});

test("a weak topic's root cause is found by following the chain to the deepest insecure foundation", () => {
  const { cards, reviews } = sample();
  const concepts = learnerMemory({ cards, reviews, now: NOW });
  const edges = dependencyGraph(cards);
  const debts = knowledgeDebts(concepts, edges);
  assert.equal(debts[0].name, "Preload", "Preload (never tested) under Stroke volume under Cardiac output");
  assert.ok(debts[0].symptoms.some((s) => s.name === "Cardiac output"));
  assert.match(debts[0].why, /depends? on Preload/);
  assert.match(debts[0].because, /defined in Preload/);
});

test("course foundations join the same list", () => {
  const d = knowledgeDebts([], [], [{ site: "MathGradify", course: "Maths", title: "Logarithms", for: "pH calculations", href: "/mathgradify/course/#/lesson/u2" }]);
  assert.equal(d[0].kind, "course");
  assert.match(d[0].why, /pH calculations builds on Logarithms/);
});

test("priorities: the root cause comes before its symptoms, and every item explains its rank", () => {
  const { cards, reviews } = sample();
  const concepts = learnerMemory({ cards, reviews, now: NOW });
  const edges = dependencyGraph(cards);
  const debts = knowledgeDebts(concepts, edges);
  const preds = predictions({ concepts, cards, reviews, now: NOW });
  const { items } = prioritise({ concepts, preds, debts, underpins: dependants(edges), now: NOW });
  assert.equal(items[0].kind, "root");
  assert.match(items[0].title, /Preload/);
  const symptom = items.find((x) => x.id === "fix:d1|Cardiac output");
  assert.ok(items.indexOf(symptom) > 0);
  assert.match(symptom.why, /puts Preload first/);
  for (const x of items) assert.deepEqual(x.factors.map((f) => f.key), ["urgency", "importance", "forgetting", "evidence"]);
});
