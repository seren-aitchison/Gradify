import { test } from "node:test";
import assert from "node:assert/strict";
import { parseTell, parseInbox, findDate } from "../kit/intel/nlp.js";
import { decompose, catchUp, opportunities, proposeWeek, modeOf } from "../kit/intel/autopilot.js";
import { learnerMemory, predictions, dayKey } from "../kit/intel/memory.js";
import { prioritise } from "../kit/intel/priority.js";
import { reschedule, INTEL_DEFAULTS } from "../kit/intel/schedule.js";

const NOW = new Date(2026, 10, 13, 9, 0).getTime();   // Friday 13 November 2026

test("dates: day-month, month-day, the 4th, weekdays, tomorrow, and past dates roll forward", () => {
  assert.equal(findDate("on 10 December", NOW), "2026-12-10");
  assert.equal(findDate("December 2nd", NOW), "2026-12-02");
  assert.equal(findDate("due on the 4th", NOW), "2026-12-04");
  assert.equal(findDate("on the 20th", NOW), "2026-11-20");
  assert.equal(findDate("this friday", NOW), "2026-11-20");
  assert.equal(findDate("on Monday", NOW), "2026-11-16");
  assert.equal(findDate("tomorrow", NOW), "2026-11-14");
  assert.equal(findDate("3 March", NOW), "2027-03-03");
  assert.equal(findDate("12/1", NOW), "2027-01-12", "UK day/month");
  assert.equal(findDate("no date here", NOW), null);
});

test("Tell Gradify: exams, deadlines and being away, from one sentence", () => {
  const a = parseTell("I have a biology exam on 10 December, a chemistry assignment due on the 4th and I'm away this weekend.", NOW);
  assert.deepEqual(a.map((x) => [x.type, x.title, x.day || x.days.join(",")]), [
    ["exam", "Biology exam", "2026-12-10"],
    ["deadline", "Chemistry assignment", "2026-12-04"],
    ["away", "Away", "2026-11-14,2026-11-15"],
  ]);
});

test("Tell Gradify: work shifts become busy time, and daily hours set the budget", () => {
  const a = parseTell("I work 9am to 5pm on Monday. I can do 2 hours a day.", NOW);
  assert.deepEqual(a[0], { type: "busy", day: "2026-11-16", start_min: 540, end_min: 1020, title: "Work", why: "Busy: Gradify plans around it." });
  assert.equal(a[1].type, "hours"); assert.equal(a[1].minutes, 120);
});

test("the academic inbox spots a moved deadline and the lectures to cover", () => {
  const email = "Dear all, your renal physiology assessment has been moved forward to 2 December. Please ensure you have completed lectures 5-8. Best, Dr Patel";
  const r = parseInbox(email, { deadlines: [{ day: "2026-12-09", title: "Renal physiology assessment", kind: "exam" }], now: NOW });
  assert.equal(r.changes.length, 1);
  assert.deepEqual([r.changes[0].from, r.changes[0].day], ["2026-12-09", "2026-12-02"]);
  assert.deepEqual(r.prep.lectures, [5, 8]);
  const r2 = parseInbox("The pharmacology quiz will be on 20 November.", { deadlines: [], now: NOW });
  assert.equal(r2.found[0].title, "Pharmacology quiz");
});

// a small learner for the Autopilot tests
function model() {
  const card = (id, topic, o = {}) => ({ id, topic, kind: "definition", document_id: "d1", front: `Q ${id}`, back: "A", reps: o.reps ?? 0, interval_days: o.interval ?? 0, last_rating: o.last ?? null, due_at: new Date(NOW - (o.ago ?? 0) * 864e5 + (o.interval ?? 0) * 864e5).toISOString() });
  const cards = [card("a", "Cardiac cycle", { reps: 2, interval: 0, ago: 1, last: "again" }), card("b", "Cardiac cycle", { reps: 3, interval: 3, ago: 4, last: "good" }), card("c", "Valve sounds"), card("d", "Pressure volume loops")];
  const reviews = [{ card_id: "a", rating: "again", confidence: "sure", reviewed_at: new Date(NOW - 864e5).toISOString() }, { card_id: "b", rating: "good", confidence: "sure", reviewed_at: new Date(NOW - 4 * 864e5).toISOString() }];
  const docs = [{ id: "d1", title: "Cardiovascular physiology" }];
  const y = dayKey(NOW - 864e5), y2 = dayKey(NOW - 2 * 864e5), y3 = dayKey(NOW - 3 * 864e5);
  const blocks = [y, y2, y3].map((day, i) => ({ id: `m${i}`, day, start_min: 1080, end_min: 1100, title: "Review", cal: "study", auto: true, done: false }));
  const concepts = learnerMemory({ cards, reviews, docs, now: NOW });
  const preds = predictions({ concepts, cards, reviews, blocks, now: NOW });
  const prio = prioritise({ concepts, preds, now: NOW });
  return { now: NOW, today: dayKey(NOW), cards, reviews, docs, blocks, concepts, preds, prio, intel: INTEL_DEFAULTS, dailyMinutes: 30, deadlines: [], events: [], missed: reschedule({ blocks, minutes: 30, intel: INTEL_DEFAULTS, now: NOW }) };
}

test("decomposition turns 'revise cardiovascular physiology' into steps with a definition of done", () => {
  const d = decompose("Revise cardiovascular physiology", model());
  assert.equal(d.subject, "cardiovascular physiology");
  assert.ok(d.matched.length >= 2);
  assert.ok(d.steps.some((s) => s.tag === "Knowledge gap"));
  assert.equal(d.steps.at(-1).tag, "Verification");
  assert.ok(d.steps.every((s) => s.done && s.mins > 0));
  assert.equal(d.total, d.steps.reduce((a, s) => a + s.mins, 0));
  assert.match(decompose("Revise organic chemistry", model()).note, /doesn't have notes/);
});

test("catch-up: three missed sessions trigger a recovery that replans without cramming", () => {
  const m = model();
  const c = catchUp(m);
  assert.ok(c); assert.equal(c.missed, 3);
  assert.ok(c.essential.some((x) => x.kind === "misconception"));
  const w = proposeWeek(m, { replace: true });
  const perDay = {};
  for (const b of w.add) perDay[b.day] = (perDay[b.day] || 0) + b.end_min - b.start_min;
  assert.ok(Object.values(perDay).every((n) => n <= m.dailyMinutes), "no day over the daily time");
  assert.ok(w.add.every((b) => b.auto && b.cal === "study"));
});

test("opportunities: free time before the next event is offered with tasks that fit", () => {
  const m = model();
  m.blocks.push({ id: "lec", day: m.today, start_min: 9 * 60 + 40, end_min: 11 * 60, title: "Lecture", cal: "external" });
  const o = opportunities(m);
  assert.equal(o[0].id, "gap");
  assert.match(o[0].title, /40 minutes free before Lecture/);
});

test("modes: older settings map onto Copilot and Adaptive", () => {
  assert.equal(modeOf({ autonomy: "suggest" }), "copilot");
  assert.equal(modeOf({ autonomy: "auto" }), "adaptive");
  assert.equal(modeOf({ autonomy: "autopilot" }), "autopilot");
});
