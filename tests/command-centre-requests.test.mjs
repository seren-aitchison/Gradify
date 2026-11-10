// The Command Centre gathers five summaries at once (cards and reviews, every course's progress, level and quests,
// goals, the plan). In an account they must not each fetch the same records: count the requests one load makes.
import { test } from "node:test";
import assert from "node:assert/strict";

test("one Command Centre load fetches each kind of record once, and course progress in a single request", async () => {
  const mem = new Map();
  globalThis.localStorage = { getItem: (k) => mem.get(k) ?? null, setItem: (k, v) => mem.set(k, String(v)), removeItem: (k) => mem.delete(k) };
  globalThis.matchMedia ??= () => ({ matches: false });
  globalThis.crypto ??= (await import("node:crypto")).webcrypto;
  const calls = {};
  const rows = { course_progress: [{ subject: "law", state: { done: { "u01-01": Date.now() }, log: [{ t: Date.now(), xp: 10, k: "lesson", id: "u01-01" }] } }], activity: [], reviews: [], cards: [], documents: [], goals: [{ id: "g", title: "XP", target: 100, metric: { source: "xp", metric: "xp", period: "week" }, created_at: new Date().toISOString(), tz: "Europe/London", status: "active", milestones: [] }], profiles: [{ id: "u1" }] };
  const builder = (t) => { calls[t] = (calls[t] || 0) + 1; const b = { select: () => b, insert: () => b, order: () => b, eq: () => b, gte: () => b, limit: () => b, single: () => b, then: (res, rej) => Promise.resolve({ data: rows[t] || [], error: null }).then(res, rej) }; return b; };
  const db = { from: builder, auth: { getUser: async () => ({ data: { user: { id: "u1" } } }), getSession: async () => ({ data: { session: null } }), onAuthStateChange() {} } };
  const { CloudStore } = await import("../kit/data/store.js");
  const store = new CloudStore(db);
  const { loadLearner } = await import("../kit/learning/learner-data.js");
  const { journeySummary } = await import("../kit/game/journey.js");
  const { goalData } = await import("../kit/learning/goal-data.js");
  // what renderToday asks for, at the same time
  const goals = await store.listGoals();
  await Promise.all([store.listCards(), store.listActivity(400), store.listReviews(400), store.listDocuments(), loadLearner({ store }), journeySummary({ store }), goalData(store, goals)]);
  assert.equal(calls.course_progress, 1, "every course's progress in one request (was up to 37 per summary)");
  assert.equal(calls.activity, 1, "the activity log once");
  assert.equal(calls.reviews, 1, "reviews once");
  assert.equal(calls.cards, 1, "flashcards once");
  // a change forgets the shared copy, so the next read is fresh
  await store.logActivity({ kind: "session", xp: 5 });
  await store.listActivity(400);
  assert.equal(calls.activity, 3, "1 read + 1 write + 1 fresh read");
});
