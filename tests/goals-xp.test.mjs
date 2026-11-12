// A goal measuring "XP across Gradify" must show exactly the learner's level XP: same courses (this device first, then
// the account), same game ledger, same de-duplication of the activity log (course awards and synced rewards are already
// counted). Both are worked out here, the level by journeySummary() and the goal by goalData() + measure().
import { test } from "node:test";
import assert from "node:assert/strict";

test("a goal's all-time XP equals the level's XP, including account-only courses and duplicate-looking activity", async () => {
  const mem = new Map();
  globalThis.localStorage = { getItem: (k) => mem.get(k) ?? null, setItem: (k, v) => mem.set(k, String(v)), removeItem: (k) => mem.delete(k) };
  globalThis.matchMedia ??= () => ({ matches: false });
  const now = Date.parse("2026-11-11T10:00:00Z"), d = 864e5, iso = (t) => new Date(t).toISOString();
  // this device: Law, with three lessons (each logged in the course AND in the activity log)
  mem.set("gradify.course.law", JSON.stringify({ done: { "u01-01": now - 3 * d, "u01-02": now - 2 * d, "u01-03": now - d }, log: [10, 10, 10].map((xp, i) => ({ t: now - (3 - i) * d, xp, k: "lesson", id: `u01-0${i + 1}` })) }));
  // a paid quest reward, also synced to the activity log as game-<key>
  mem.set("gradify.game", JSON.stringify({ paid: { "quest:2026-11-10:lessons": { t: now - d, xp: 30, title: "Complete two lessons" } } }));
  const activity = [
    ...[1, 2, 3].map((i) => ({ at: iso(now - (4 - i) * d), site: "LawGradify", kind: "law-lesson", xp: 10 })),        // already in the course log
    { at: iso(now - d), site: "Gradify", kind: "game-quest:2026-11-10:lessons", xp: 30 },                             // already in the ledger
    { at: iso(now - 2 * d), site: "Gradify", kind: "session", xp: 6 },                                                 // flashcards: counts once
    { at: iso(now), site: "SportGradify", kind: "workout", xp: 15 },                                                   // a workout: counts once
    { at: iso(now - 5 * d), site: "MathGradify", kind: "maths-lesson", xp: 10 },                                       // a maths lesson: in the account's maths progress
  ];
  // the account: Maths progress not opened on this device, Law progress older than this device's, and a course that no longer exists
  const accountProgress = [
    { subject: "maths", state: { done: { "u01-01": now - 5 * d }, log: [{ t: now - 5 * d, xp: 10, k: "lesson", id: "u01-01" }] } },
    { subject: "law", state: { done: {}, log: [] } },
    { subject: "alchemy", state: { done: { x: now }, log: [{ t: now, xp: 999, k: "lesson", id: "x" }] } },
  ];
  const store = { mode: "cloud", listActivity: async () => activity, listReviews: async () => [], listCourseProgress: async () => accountProgress };
  const { journeySummary } = await import("../kit/game/journey.js");
  const { goalData } = await import("../kit/learning/goal-data.js");
  const { measure } = await import("../kit/learning/goals.js");
  const level = await journeySummary({ store, now });
  const goal = { id: "g", tz: "Europe/London", created_at: iso(now - 30 * d), target: 500, metric: { source: "xp", metric: "xp", period: "all_time" } };
  const value = measure(goal, await goalData(store, [goal]), now).value;
  assert.equal(level.xp, 30 + 30 + 10 + 6 + 15, "Law 30 + reward 30 + Maths 10 (account) + flashcards 6 + workout 15");
  assert.equal(value, level.xp, "the goal shows the same XP as the level");
});
