import { test } from "node:test";
import assert from "node:assert/strict";
import { topicProfiles, recallProbability, practiceOrder } from "../kit/learning/mastery.js";

const DAY = 864e5;
const NOW = Date.parse("2026-10-29T12:00:00Z");
const iso = (daysAgo) => new Date(NOW - daysAgo * DAY).toISOString();
// a card last reviewed `ago` days ago with the given interval
const card = (id, topic, kind, { reps = 0, interval = 0, ago = 0, last = null } = {}) => ({
  id, topic, kind, document_id: "d1", reps, interval_days: interval, last_rating: last,
  due_at: new Date(NOW - ago * DAY + interval * DAY).toISOString(),
});

test("a card's recall probability is 90% when it comes due, and falls after", () => {
  assert.equal(recallProbability(card("a", "T", "definition"), NOW), null);
  const c = card("a", "T", "definition", { reps: 2, interval: 4, ago: 4, last: "good" });
  assert.ok(Math.abs(recallProbability(c, NOW) - 0.9) < 1e-9);
  const late = card("a", "T", "definition", { reps: 2, interval: 4, ago: 16, last: "good" });
  assert.ok(recallProbability(late, NOW) < 0.7);
});

test("untouched topics are 'not started' and suggest learning", () => {
  const [p] = topicProfiles([card("a", "Enzymes", "definition"), card("b", "Enzymes", "why")], [], { now: NOW });
  assert.equal(p.level, "new");
  assert.equal(p.next.kind, "learn");
  assert.equal(p.mastery, 0);
  assert.equal(p.dims.apply.value, null, "no application evidence means no score, not a guess");
});

test("recall and explanation come from different card types", () => {
  const cards = [card("a", "Heart", "definition", { reps: 3, interval: 10, ago: 1, last: "good" }), card("b", "Heart", "why", { reps: 3, interval: 3, ago: 1, last: "hard" })];
  const reviews = [
    { card_id: "a", rating: "good", reviewed_at: iso(1) }, { card_id: "a", rating: "good", reviewed_at: iso(5) },
    { card_id: "b", rating: "again", reviewed_at: iso(1) }, { card_id: "b", rating: "hard", reviewed_at: iso(5) },
  ];
  const [p] = topicProfiles(cards, reviews, { now: NOW });
  assert.ok(p.dims.recall.value > 0.7);
  assert.ok(p.dims.explain.value < 0.5);
  assert.equal(p.dims.recall.n, 2);
  assert.equal(p.dims.explain.n, 2);
});

test("a confident wrong answer flags a misconception until it's answered well again", () => {
  const cards = [card("a", "Renal", "definition", { reps: 2, interval: 0, ago: 0, last: "again" })];
  const wrong = [{ card_id: "a", rating: "good", reviewed_at: iso(10) }, { card_id: "a", rating: "again", confidence: "sure", reviewed_at: iso(1) }];
  const [p] = topicProfiles(cards, wrong, { now: NOW });
  assert.equal(p.level, "shaky");
  assert.equal(p.next.kind, "misconception");
  assert.equal(p.misconceptions.length, 1);
  // right again minutes later, straight after seeing the answer: still flagged
  const soon = [...wrong, { card_id: "a", rating: "good", confidence: "sure", reviewed_at: iso(0.99) }];
  assert.equal(topicProfiles(cards, soon, { now: NOW })[0].level, "shaky");
  // right again the next day: cleared
  const fixed = [...wrong, { card_id: "a", rating: "good", confidence: "sure", reviewed_at: iso(0.4) }];
  const [q] = topicProfiles([{ ...cards[0], last_rating: "good", interval_days: 1, due_at: iso(-0.5) }], fixed, { now: NOW });
  assert.notEqual(q.level, "shaky");
});

test("a topic you knew but haven't seen in weeks is fading, and ranks above a strong one", () => {
  const strong = [card("s1", "Strong", "definition", { reps: 4, interval: 20, ago: 2, last: "good" }), card("s2", "Strong", "definition", { reps: 4, interval: 20, ago: 2, last: "easy" })];
  const old = [card("f1", "Old", "definition", { reps: 3, interval: 3, ago: 20, last: "good" }), card("f2", "Old", "definition", { reps: 3, interval: 3, ago: 20, last: "good" })];
  const reviews = [...strong, ...old].flatMap((c) => [{ card_id: c.id, rating: "good", reviewed_at: iso(c.id.startsWith("s") ? 2 : 20) }, { card_id: c.id, rating: "good", reviewed_at: iso(30) }]);
  const ps = topicProfiles([...strong, ...old], reviews, { now: NOW });
  const fading = ps.find((p) => p.topic === "Old"), good = ps.find((p) => p.topic === "Strong");
  assert.equal(fading.level, "fading");
  assert.ok(["strong", "mastered"].includes(good.level));
  assert.equal(ps[0].topic, "Old", "the fading topic comes first");
  assert.match(fading.next.why, /remember about \d+%/);
});

test("mastered needs every card covered and answered more than once", () => {
  const cs = [card("a", "T", "definition", { reps: 3, interval: 30, ago: 1, last: "easy" }), card("b", "T", "definition")];
  const rv = [{ card_id: "a", rating: "easy", reviewed_at: iso(1) }, { card_id: "a", rating: "good", reviewed_at: iso(8) }];
  const [p] = topicProfiles(cs, rv, { now: NOW });
  assert.notEqual(p.level, "mastered", "half the topic is untested");
  assert.equal(p.next.kind, "learn");
});

test("practice puts misconceptions first, then the most-forgotten cards, then new ones", () => {
  const cs = [card("new", "T", "definition"), card("fresh", "T", "definition", { reps: 2, interval: 10, ago: 1, last: "good" }),
    card("old", "T", "definition", { reps: 2, interval: 2, ago: 10, last: "good" }), card("wrong", "T", "definition", { reps: 2, interval: 0, ago: 0, last: "again" })];
  const order = practiceOrder(cs, { misconceptions: [{ id: "wrong" }] }, NOW).map((c) => c.id);
  assert.deepEqual(order, ["wrong", "old", "fresh", "new"]);
});
