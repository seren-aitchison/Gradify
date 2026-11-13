import { test } from "node:test";
import assert from "node:assert/strict";
import { schedule, preview, retrievability, intervalFor, memoryOf, recallNow, W } from "../kit/learning/srs.js";

const DAY = 864e5, NOW = Date.UTC(2026, 10, 13, 9);
const fresh = { id: "c", reps: 0, lapses: 0, ease: 2.5, interval_days: 0, due_at: new Date(NOW).toISOString() };

test("FSRS curve: 90% recall at one stability, and the interval for 90% is the stability", () => {
  assert.ok(Math.abs(retrievability(10, 10) - 0.9) < 1e-12);
  assert.ok(Math.abs(intervalFor(10, 0.9) - 10) < 1e-9);
  assert.ok(intervalFor(10, 0.95) < 10 && intervalFor(10, 0.8) > 10, "higher retention, shorter intervals");
});

test("a first answer sets stability and difficulty from the published parameters", () => {
  const good = schedule(fresh, "good", { now: NOW }), easy = schedule(fresh, "easy", { now: NOW }), again = schedule(fresh, "again", { now: NOW });
  assert.ok(Math.abs(good.interval_days - W[2]) < 0.001, "S0(good) = w2");
  assert.ok(good.ease > 10, "difficulty stored as 10 + D");
  assert.ok(easy.ease < good.ease, "easy cards are less difficult");
  assert.equal(Date.parse(again.due_at) - NOW, 10 * 60000, "forgotten: back in ten minutes");
  assert.equal(Date.parse(good.due_at) - NOW, 3 * DAY, "good: about three days");
  assert.equal(good.updated_at, new Date(NOW).toISOString(), "last review time recorded");
});

test("remembering after it had faded grows stability more than reviewing early", () => {
  const c1 = { ...fresh, ...schedule(fresh, "good", { now: NOW }) };
  const early = schedule(c1, "good", { now: NOW + 1 * DAY }), onTime = schedule(c1, "good", { now: NOW + 3 * DAY }), late = schedule(c1, "good", { now: NOW + 8 * DAY });
  assert.ok(early.interval_days < onTime.interval_days && onTime.interval_days < late.interval_days);
  const forgot = schedule(c1, "again", { now: NOW + 3 * DAY });
  assert.ok(forgot.interval_days < c1.interval_days, "forgetting lowers stability");
  assert.equal(forgot.lapses, 1);
  assert.ok(forgot.ease > c1.ease, "and raises difficulty");
});

test("an exam caps the interval so the review comes first", () => {
  const strong = { ...fresh, reps: 5, ease: 13, interval_days: 40, updated_at: new Date(NOW - 40 * DAY).toISOString(), due_at: new Date(NOW).toISOString(), last_rating: "good" };
  const free = schedule(strong, "good", { now: NOW });
  const exam = schedule(strong, "good", { now: NOW, examDate: "2026-11-23" });
  assert.ok(Date.parse(free.due_at) - NOW > 30 * DAY);
  assert.equal(Math.round((Date.parse(exam.due_at) - NOW) / DAY), 9, "the day before the exam");
  assert.equal(exam.interval_days, free.interval_days, "stability is the same: only the date moves");
});

test("old SM-2 cards are read as FSRS cards and converted on their next review", () => {
  const old = { ...fresh, reps: 3, ease: 2.5, interval_days: 6, due_at: new Date(NOW).toISOString(), last_rating: "good" };
  const m = memoryOf(old);
  assert.equal(m.fsrs, false); assert.equal(m.S, 6);
  assert.ok(Math.abs(recallNow(old, NOW) - 0.9) < 1e-9, "due now means 90% recall");
  const next = schedule(old, "good", { now: NOW });
  assert.ok(next.ease > 10 && next.interval_days > 6);
  const p = preview(old, { now: NOW });
  assert.ok(p.again < p.hard && p.hard <= p.good && p.good <= p.easy);
});
