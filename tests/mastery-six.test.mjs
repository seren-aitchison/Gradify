// The six-dimension mastery model (kit/learning/mastery.js): evidence mapping, assisted and
// delayed answers, insufficient evidence, calibration and spaced retrieval of course questions.
import { test } from "node:test";
import assert from "node:assert/strict";
import { dimensionOf, evidenceFromAttempts, evidenceFromReviews, sixProfile, sixProfiles, revisionQueue, topicProfiles, SIX } from "../kit/learning/mastery.js";

const DAY = 864e5, NOW = Date.parse("2026-11-05T12:00:00Z");
const at = (daysAgo) => new Date(NOW - daysAgo * DAY).toISOString();
let n = 0;
const A = (o) => ({ schema: 1, id: `a${n++}`, at: at(o.ago ?? 0), site: "LawGradify", subject: "law", context: o.ctx || "lesson", question: { id: o.q || "q1", v: 1, type: o.type || "sba", d: o.d ?? 2, objectives: [] }, lesson: o.lesson || "u01-01", unit: o.unit || "u01", score: o.score ?? 1, correct: (o.score ?? 1) >= 0.7, attempt: o.attempt || 1, confidence: o.conf ?? null, marking: { method: "auto", status: o.status || "final" } });

test("six dimensions, in the brief's order", () => {
  assert.deepEqual(SIX.map((d) => d.key), ["recognition", "recall", "explain", "apply", "transfer", "retention"]);
});

test("question types map to the dimension they're evidence of", () => {
  assert.equal(dimensionOf(A({ type: "sba", d: 1 })), "recognition");
  assert.equal(dimensionOf(A({ type: "tf" })), "recognition");
  assert.equal(dimensionOf(A({ type: "sba", d: 3 })), "apply");
  assert.equal(dimensionOf(A({ type: "num" })), "apply");
  assert.equal(dimensionOf(A({ type: "short" })), "explain");
  assert.equal(dimensionOf(A({ type: "card" })), "recall");
  // a course's own level names decide: "Application" and "Clinical reasoning" are application
  const NURSING = ["Foundation", "Application", "Clinical reasoning"];
  assert.equal(dimensionOf(A({ type: "sba", d: 2 }), NURSING), "apply");
  assert.equal(dimensionOf(A({ type: "sba", d: 1 }), NURSING), "recognition");
  assert.equal(dimensionOf(A({ type: "sba", d: 2 }), ["Easy", "Medium", "Hard"]), "recognition");
});

test("one answer is not enough evidence, and no overall figure is given from it", () => {
  const p = sixProfile(evidenceFromAttempts([A({})]), { now: NOW });
  assert.equal(p.dims.recognition.certainty, "insufficient");
  assert.equal(p.mastery, null);
  assert.equal(p.dims.transfer.certainty, "none");
  assert.equal(p.dims.transfer.value, null);
});

test("second tries after feedback count less than unaided first tries", () => {
  const unaided = sixProfile(evidenceFromAttempts([1, 2, 3, 4].map((i) => A({ q: `q${i}`, score: 0 })).concat([1, 2, 3, 4].map((i) => A({ q: `q${i}`, score: 1, attempt: 2 })))), { now: NOW });
  assert.ok(unaided.dims.recognition.value < 0.4, `wrong first tries dominate: ${unaided.dims.recognition.value}`);
  assert.equal(unaided.dims.recognition.assisted, 4);
});

test("answering again after a day is retention evidence; straight away is not", () => {
  const soon = evidenceFromAttempts([A({ ago: 0.1 }), A({ ago: 0 })]);
  assert.equal(soon.filter((e) => e.dim === "retention").length, 0);
  const later = evidenceFromAttempts([A({ ago: 5 }), A({ ago: 0 })]);
  assert.equal(later.filter((e) => e.dim === "retention").length, 1);
});

test("first tries at harder questions in a mixed exam are transfer evidence", () => {
  const ev = evidenceFromAttempts([A({ ctx: "exam", d: 2 }), A({ ctx: "exam", d: 1, q: "q2" }), A({ ctx: "lesson", d: 3, q: "q3" })]);
  assert.equal(ev.filter((e) => e.dim === "transfer").length, 1);
});

test("provisional marks count for little until reviewed", () => {
  const ev = evidenceFromAttempts([A({ type: "short", status: "provisional" })]);
  assert.ok(ev[0].w < 0.5);
});

test("with enough evidence on two dimensions, mastery is reported and the weakest is named", () => {
  const list = [];
  for (let i = 0; i < 6; i++) list.push(A({ q: `r${i}`, d: 1, score: 1 }), A({ q: `n${i}`, type: "num", score: i < 2 ? 1 : 0 }));
  const p = sixProfile(evidenceFromAttempts(list), { now: NOW });
  assert.ok(p.mastery > 0 && p.mastery < 1);
  assert.equal(p.weakest, "apply");
  assert.deepEqual(p.measured.sort(), ["apply", "recognition"]);
});

test("confidence calibration flags confident mistakes", () => {
  const p = sixProfile(evidenceFromAttempts([A({ q: "a", conf: 3, score: 0 }), A({ q: "b", conf: 3, score: 1 }), A({ q: "c", conf: 3, score: 0 }), A({ q: "d", conf: 1, score: 1 })]), { now: NOW });
  assert.equal(p.calibration.sureWrong, 2);
  assert.ok(Math.abs(p.calibration.accuracyWhenSure - 1 / 3) < 1e-9);
});

test("profiles group by lesson or school", () => {
  const { groups } = sixProfiles(evidenceFromAttempts([A({ unit: "u01" }), A({ unit: "u02", q: "z" })]), { by: (e) => e.unit, now: NOW });
  assert.deepEqual(groups.map((g) => g.key).sort(), ["u01", "u02"]);
});

test("revision: wrong answers come back within hours, right ones at growing intervals", () => {
  const q = revisionQueue([A({ q: "w", score: 0, ago: 0.5 }), A({ q: "r", score: 1, ago: 0.5 }), A({ q: "old", score: 1, ago: 2 })], { now: NOW });
  assert.deepEqual(q.map((x) => x.id), ["w", "old"]);
  assert.equal(q[0].reason, "wrong");
  // right after a day, then right again after three: next one isn't due for a week
  const ladder = revisionQueue([A({ q: "x", ago: 10 }), A({ q: "x", ago: 8.5 }), A({ q: "x", ago: 4 })], { now: NOW });
  assert.deepEqual(ladder.map((x) => x.id), []);
  const later = revisionQueue([A({ q: "x", ago: 20 }), A({ q: "x", ago: 18.5 }), A({ q: "x", ago: 14 })], { now: NOW });
  assert.deepEqual(later.map((x) => x.id), ["x"]);
  // provisional self-marks and flashcards aren't scheduled here
  assert.equal(revisionQueue([A({ q: "s", status: "provisional", score: 0 }), A({ q: "c", type: "card", score: 0 })], { now: NOW }).length, 0);
});

test("flashcard decks get the six-dimension view too, without changing the original profile", () => {
  const cards = [{ id: "a", document_id: "d", topic: "T", kind: "definition", reps: 2, interval_days: 3, due_at: at(-2), last_rating: "good" }, { id: "b", document_id: "d", topic: "T", kind: "why", reps: 1, interval_days: 1, due_at: at(-1), last_rating: "good" }];
  const reviews = [{ card_id: "a", rating: "good", reviewed_at: at(4) }, { card_id: "a", rating: "good", reviewed_at: at(1) }, { card_id: "b", rating: "hard", reviewed_at: at(0) }];
  const [t] = topicProfiles(cards, reviews, { now: NOW });
  assert.equal(t.six.dims.recall.n, 2);
  assert.equal(t.six.dims.explain.n, 1);
  assert.equal(t.six.dims.retention.n, 1);
  assert.equal(t.six.dims.recognition.certainty, "none");
  assert.ok("recall" in t.dims && "confidence" in t.dims, "original five dimensions still there");
  assert.equal(evidenceFromReviews(cards, reviews).length, 4);
});
