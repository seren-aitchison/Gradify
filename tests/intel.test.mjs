import { test } from "node:test";
import assert from "node:assert/strict";
import { learnerMemory, predictions, eventStream, forgetIn, dayKey } from "../kit/intel/memory.js";
import { prioritise } from "../kit/intel/priority.js";
import { planDay, reschedule, freeIntervals, INTEL_DEFAULTS } from "../kit/intel/schedule.js";
import { answer } from "../kit/intel/ask.js";

const DAY = 864e5;
const NOW = new Date(2026, 10, 13, 9, 0).getTime();   // Friday 13 November 2026, 09:00 local
const iso = (daysAgo, h = 0) => new Date(NOW - daysAgo * DAY + h * 36e5).toISOString();
const card = (id, topic, { reps = 0, interval = 0, ago = 0, last = null, kind = "definition", doc = "d1" } = {}) => ({
  id, topic, kind, document_id: doc, front: `Q ${id}`, back: `A ${id}`, reps, interval_days: interval, last_rating: last,
  due_at: new Date(NOW - ago * DAY + interval * DAY).toISOString(),
});
const review = (card_id, rating, daysAgo, confidence = null, ms = 6000) => ({ card_id, rating, confidence, ms, reviewed_at: iso(daysAgo) });

function sample() {
  const cards = [
    // "Systole": answered wrong while sure, twice: a misconception and a repeated mistake
    card("s1", "Systole", { reps: 3, interval: 0, ago: 1, last: "again" }),
    card("s2", "Systole", { reps: 2, interval: 2, ago: 1, last: "good" }),
    // "Diastole": solid and lasting
    card("d1", "Diastole", { reps: 4, interval: 25, ago: 2, last: "good" }),
    card("d2", "Diastole", { reps: 4, interval: 25, ago: 2, last: "easy" }),
    // "Valves": never tried
    card("v1", "Valves"), card("v2", "Valves"),
  ];
  const reviews = [
    review("s1", "again", 6, "sure"), review("s1", "again", 1, "sure"), review("s1", "good", 3, "unsure"),
    review("s2", "good", 1, "sure"), review("s2", "good", 3, "sure"),
    review("d1", "good", 2, "sure"), review("d1", "good", 27, "sure"), review("d2", "easy", 2, "sure"), review("d2", "good", 27, "sure"),
  ];
  return { cards, reviews };
}

test("learner memory: misconceptions, repeated mistakes, stages and honest certainty", () => {
  const { cards, reviews } = sample();
  const m = learnerMemory({ cards, reviews, docs: [{ id: "d1", title: "Cardiac" }], now: NOW });
  const sys = m.find((c) => c.name === "Systole"), dia = m.find((c) => c.name === "Diastole"), val = m.find((c) => c.name === "Valves");
  assert.equal(sys.level, "shaky");
  assert.equal(sys.errors.confident, 1);
  assert.deepEqual(sys.errors.repeated, ["Q s1"]);
  assert.equal(sys.stage, "seen", "a misconception isn't understanding");
  assert.equal(val.stage, "new");
  assert.equal(val.answers, 0);
  assert.ok(dia.stages.understood && dia.stages.retained);
  assert.ok(!dia.stages.applied, "no application evidence, so not 'applied'");
  assert.ok(dia.certainty > 0 && dia.certainty < 0.97);
  assert.equal(sys.pack, "Cardiac");
  assert.ok(sys.evidence[0].at >= sys.evidence[1].at, "evidence newest first");
});

test("forgetting forecast: a card at its due date is at 90%, so it slips within days", () => {
  const due = card("x", "T", { reps: 2, interval: 4, ago: 4, last: "good" });
  const d = forgetIn([due], NOW);
  assert.ok(d >= 1 && d <= 14, `slips in ${d} days`);
  assert.equal(forgetIn([], NOW), null);
});

test("predictions: readiness has an uncertainty band and says when evidence is thin", () => {
  const { cards, reviews } = sample();
  const concepts = learnerMemory({ cards, reviews, now: NOW });
  const p = predictions({ concepts, cards, reviews, examDate: dayKey(NOW + 20 * DAY), dailyMinutes: 20, now: NOW });
  assert.ok(p.readiness.low <= p.readiness.value && p.readiness.value <= p.readiness.high);
  assert.equal(p.readiness.enough, false);
  assert.match(p.readiness.note, /Not enough evidence/);
  assert.equal(p.requirement.examIn, 20);
  assert.ok(["on-track", "tight", "behind"].includes(p.requirement.status));
  assert.ok(p.gaps.some((c) => c.name === "Systole"));
});

test("plan adherence counts only study blocks whose time has passed", () => {
  const blocks = [
    { day: dayKey(NOW - DAY), start_min: 600, end_min: 630, cal: "study", done: true },
    { day: dayKey(NOW - DAY), start_min: 700, end_min: 730, cal: "study", done: false },
    { day: dayKey(NOW - DAY), start_min: 800, end_min: 830, cal: "exam", done: false },
    { day: dayKey(NOW + DAY), start_min: 600, end_min: 630, cal: "study", done: false },
  ];
  const p = predictions({ concepts: [], cards: [], reviews: [], blocks, now: NOW });
  assert.deepEqual([p.adherence.done, p.adherence.planned], [1, 2]);
});

test("priority: the misconception comes first, with its reason and evidence", () => {
  const { cards, reviews } = sample();
  const concepts = learnerMemory({ cards, reviews, now: NOW });
  const preds = predictions({ concepts, cards, reviews, now: NOW });
  const { items, stop } = prioritise({ concepts, preds, now: NOW });
  assert.equal(items[0].kind, "misconception");
  assert.match(items[0].title, /Systole/);
  assert.match(items[0].because, /answered wrong while sure/);
  assert.ok(items.some((x) => x.isNew), "new material is always among the candidates");
  assert.ok(Array.isArray(stop));
});

test("priority: never four revision items in a row at the top when new material exists", () => {
  const concepts = ["A", "B", "C", "D"].map((n) => ({ key: n, name: n, level: "shaky", misconceptions: [{}], errors: { repeated: [], recent: 1, confident: 1 }, evidence: [], forgetInDays: 5, seen: 1, cards: 2, due: 0, fresh: 0, stages: {}, dims: { recall: {} }, mastery: 0.3 }))
    .concat([{ key: "N", name: "New one", level: "new", cards: 4, fresh: 4, errors: { repeated: [] }, evidence: [], stages: {}, dims: { recall: {} }, misconceptions: [] }]);
  const { items } = prioritise({ concepts, preds: { dueCards: 0 }, now: NOW });
  assert.ok(items.slice(0, 4).some((x) => x.isNew));
});

test("deadlines: urgent ones rank high, distant ones aren't listed", () => {
  const { items } = prioritise({ concepts: [], preds: { dueCards: 0 }, deadlines: [{ day: dayKey(NOW + 2 * DAY), title: "Chemistry essay", kind: "deadline" }, { day: dayKey(NOW + 40 * DAY), title: "Far", kind: "deadline" }], now: NOW });
  assert.equal(items.length, 1);
  assert.equal(items[0].tag, "Deadline priority");
});

test("planDay: fits the budget into free time, around existing blocks, with breaks", () => {
  const items = [
    { id: "a", title: "Fix systole", mins: 20, weight: "hard", kind: "misconception" },
    { id: "b", title: "Due cards", mins: 25, weight: "light", kind: "review" },
    { id: "c", title: "New lesson", mins: 45, weight: "hard", kind: "lesson", isNew: true },
    { id: "d", title: "Assignment", mins: 45, weight: "hard", kind: "deadline" },
  ];
  const day = dayKey(NOW + DAY);   // Saturday: 10:00–13:00 by default
  const existing = [{ day, start_min: 11 * 60, end_min: 11 * 60 + 30, title: "Lunch with Mum", cal: "personal" }];
  const { blocks, used } = planDay({ items, day, minutes: 120, intel: INTEL_DEFAULTS, existing, now: NOW });
  const study = blocks.filter((b) => b.kind !== "break" && b.kind !== "wrap");
  assert.ok(used <= 120);
  assert.ok(blocks.some((b) => b.kind === "break"), "a protected break after 45 minutes of focus");
  for (const b of blocks) {
    assert.ok(b.start_min >= 600 && b.end_min <= 780, `${b.title} inside the window`);
    assert.ok(b.end_min <= 660 || b.start_min >= 690, `${b.title} doesn't overlap lunch`);
  }
  for (let i = 1; i < blocks.length; i++) assert.ok(blocks[i].start_min >= blocks[i - 1].end_min, "no overlaps");
  assert.equal(study[0].title, "Fix systole");
});

test("planDay: morning energy puts the hard work first", () => {
  const items = [{ id: "l", title: "Light", mins: 10, weight: "light" }, { id: "h", title: "Hard", mins: 10, weight: "hard" }];
  const { blocks } = planDay({ items, day: dayKey(NOW + DAY), minutes: 30, intel: { ...INTEL_DEFAULTS, energy: "morning" }, now: NOW });
  assert.equal(blocks[0].title, "Hard");
});

test("freeIntervals: time already gone today isn't offered", () => {
  const f = freeIntervals(dayKey(NOW), { windows: [{ from: 8 * 60, to: 10 * 60 }], now: NOW });
  assert.equal(f[0].from, 9 * 60);
});

test("reschedule: moves only Gradify's missed blocks, never the learner's own, and never crams", () => {
  const y = dayKey(NOW - DAY);
  const blocks = [
    { id: "auto1", day: y, start_min: 18 * 60, end_min: 18 * 60 + 20, title: "Review cards", cal: "study", auto: true, done: false },
    { id: "mine", day: y, start_min: 19 * 60, end_min: 19 * 60 + 30, title: "My reading", cal: "study", auto: false, done: false },
    { id: "done", day: y, start_min: 17 * 60, end_min: 17 * 60 + 20, title: "Done one", cal: "study", auto: true, done: true },
  ];
  const r = reschedule({ blocks, minutes: 20, intel: INTEL_DEFAULTS, now: NOW });
  assert.deepEqual(r.missed.map((b) => b.id), ["auto1"]);
  assert.equal(r.moves.length, 1);
  assert.equal(r.moves[0].to.day, dayKey(NOW), "today, in the evening window");
  assert.equal(r.moves[0].to.start_min, 17 * 60);
  // a full day stays full: with today's study time already used, the block goes to tomorrow
  const busy = [...blocks, { id: "t", day: dayKey(NOW), start_min: 18 * 60, end_min: 18 * 60 + 20, title: "Today's review", cal: "study", auto: true }];
  const r2 = reschedule({ blocks: busy, minutes: 20, intel: INTEL_DEFAULTS, now: NOW });
  assert.equal(r2.moves[0].to.day, dayKey(NOW + DAY));
});

test("event stream: answers, activity and missed blocks become one timeline, newest first", () => {
  const { cards, reviews } = sample();
  const ev = eventStream({ cards, reviews, activity: [{ kind: "pack", at: iso(0.1), site: "MedGradify", xp: 15 }], blocks: [{ day: dayKey(NOW - DAY), start_min: 600, end_min: 630, cal: "study", done: false }], now: NOW });
  assert.equal(ev[0].event, "study_pack_made");
  const a = ev.find((e) => e.event === "flashcard_answered" && e.result === "incorrect");
  assert.equal(a.confidence, 1);
  assert.match(a.concept, /Systole/);
  assert.ok(ev.some((e) => e.event === "plan_block_missed"));
});

test("ask: answers from the model, with evidence, and admits when it can't", () => {
  const { cards, reviews } = sample();
  const concepts = learnerMemory({ cards, reviews, now: NOW });
  const preds = predictions({ concepts, cards, reviews, examDate: dayKey(NOW + 20 * DAY), dailyMinutes: 20, now: NOW });
  const prio = prioritise({ concepts, preds, now: NOW });
  const m = { concepts, preds, prio, intel: INTEL_DEFAULTS, dailyMinutes: 20, now: NOW };
  assert.equal(answer("What should I study today?", m).intent, "today");
  assert.match(answer("What should I study today?", m).items[0].title, /Systole/);
  const s = answer("why am I struggling?", m);
  assert.equal(s.intent, "struggle");
  assert.match(s.items[0].detail, /confident mistake/);
  const free = answer("I've got 2 hours free", m);
  assert.equal(free.intent, "free-time");
  assert.ok(free.items.length >= 1);
  assert.equal(answer("am I on track for my exam?", m).intent, "exam");
  assert.equal(answer("anything", { concepts: [], prio: { items: [] }, now: NOW }).intent, "empty");
});
