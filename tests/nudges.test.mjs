import { test } from "node:test";
import assert from "node:assert/strict";
import { decideNudges, summaryFromRows, inQuiet, prefsOf, localClock } from "../kit/intel/nudges.js";
import { readFile } from "node:fs/promises";

const at = (h, m = 0) => Date.UTC(2026, 10, 13, h, m);   // London is UTC in November
const prefs = { on: true };
const s = { dueCards: 12, top: { title: "Fix the root: Preload", mins: 10 }, todayBlocks: [{ title: "Review", start_min: 18 * 60 }], fading: [{ name: "Systole", key: "d1|Systole" }], deadlinesTomorrow: [], studiedToday: false, streak: 4 };

test("nothing is sent unless notifications are on, or in quiet hours", () => {
  assert.deepEqual(decideNudges(s, { now: at(8, 30), prefs: { on: false } }), []);
  assert.deepEqual(decideNudges(s, { now: at(23), prefs }), []);
  assert.deepEqual(decideNudges(s, { now: at(6), prefs }), []);
  assert.ok(inQuiet(22 * 60, prefsOf({})) && !inQuiet(12 * 60, prefsOf({})));
});

test("the morning digest leads with the most valuable thing", () => {
  const [n] = decideNudges(s, { now: at(8, 30), prefs });
  assert.equal(n.kind, "digest");
  assert.equal(n.title, "Today: Fix the root: Preload");
  assert.equal(n.body, "1 planned session · 12 cards due · start with 10 min");
  assert.match(n.url, /#\/today/);
});

test("a daily cap, and never the same kind twice in a day", () => {
  const evening = decideNudges(s, { now: at(19, 30), prefs });
  assert.deepEqual(evening.map((n) => n.kind), ["fading", "streak"]);
  const after = decideNudges(s, { now: at(20), prefs, sent: { day: "2026-11-13", kinds: ["fading"] } });
  assert.deepEqual(after.map((n) => n.kind), ["streak"]);
  assert.deepEqual(decideNudges(s, { now: at(20), prefs, sent: { day: "2026-11-13", kinds: ["fading", "streak"] } }), []);
  assert.equal(decideNudges(s, { now: at(20), prefs: { on: true, kinds: { fading: false, streak: false } } }).length, 0, "kinds can be turned off");
});

test("a session starting in the next ten minutes, and tomorrow's deadline", () => {
  const n = decideNudges({ ...s, nextSession: { title: "Focus block", start_min: 10 * 60 + 5 }, deadlinesTomorrow: [{ title: "Lab report" }] }, { now: at(10), prefs });
  assert.deepEqual(n.map((x) => x.kind), ["session", "deadline"]);
  assert.equal(n[0].title, "Focus block at 10:05");
});

test("the server's summary comes straight from database rows, in the learner's time zone", () => {
  const now = at(8, 30);
  const sum = summaryFromRows({
    cards: [{ document_id: "d", topic: "T", reps: 3, last_rating: "good", due_at: new Date(now + 36e5).toISOString() }, { document_id: "d", topic: "U", reps: 0, due_at: new Date(now - 36e5).toISOString() }],
    blocks: [{ day: "2026-11-13", start_min: 600, end_min: 620, title: "Review", cal: "study" }, { day: "2026-11-14", start_min: 0, end_min: 30, title: "Essay", cal: "deadline" }],
    activity: [{ at: new Date(now - 864e5).toISOString() }, { at: new Date(now - 2 * 864e5).toISOString() }],
    now, tz: "Europe/London" });
  assert.equal(sum.dueCards, 1);
  assert.equal(sum.fading[0].name, "T");
  assert.equal(sum.nextSession.title, "Review");
  assert.equal(sum.deadlinesTomorrow[0].title, "Essay");
  assert.deepEqual([sum.streak, sum.studiedToday], [2, false]);
  assert.equal(localClock(at(23, 30), "Asia/Tokyo").day, "2026-11-14");
});

test("the server copy matches the browser's rules", async () => {
  const a = await readFile(new URL("../kit/intel/nudges.js", import.meta.url), "utf8");
  const b = await readFile(new URL("../supabase/functions/_shared/nudges.js", import.meta.url), "utf8");
  assert.equal(a, b, "run npm run sync");
});
