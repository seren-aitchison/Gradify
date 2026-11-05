// The shared learner profile (kit/data/profile.js) and personal pacing (kit/learning/pace.js).
import { test } from "node:test";
import assert from "node:assert/strict";

const mem = {};
globalThis.localStorage = { getItem: (k) => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = String(v); }, removeItem: (k) => { delete mem[k]; } };
const { learnerOf, saveLearner, needsSetup, readMirror, syncMirror, DEFAULTS } = await import("../kit/data/profile.js");
const { LocalStore, scopeToSite } = await import("../kit/data/store.js");
const { paceFor } = await import("../kit/learning/pace.js");

test("set-up is offered until finished or skipped", async () => {
  const st = new LocalStore();
  assert.equal(needsSetup(await st.getProfile()), true);
  await saveLearner(st, { skipped_at: "2026-11-06T10:00:00Z" });
  assert.equal(needsSetup(await st.getProfile()), false);
  await st.saveProfile({ goal: "exam" });
  assert.equal(needsSetup(await st.getProfile()), false);
});

test("the learner object saves with the profile, merges, and is mirrored for every site", async () => {
  const st = new LocalStore();
  await saveLearner(st, { subjects: ["LawGradify"], prior: { LawGradify: "some" }, prefs: { text: "large" } });
  await saveLearner(st, { prior: { NurseGradify: "new" }, prefs: { motion: "reduce" } });
  const l = learnerOf(await st.getProfile());
  assert.deepEqual(l.prior, { LawGradify: "some", NurseGradify: "new" });
  assert.deepEqual(l.prefs, { motion: "reduce", text: "large" });
  assert.deepEqual(l.subjects, ["LawGradify"]);
  assert.deepEqual(readMirror().prefs, l.prefs, "mirrored in this browser");
  // a sub-site's scoped store reads the same profile
  const law = scopeToSite(new LocalStore(), "LawGradify");
  assert.equal(learnerOf(await law.getProfile()).prior.LawGradify, "some");
});

test("an account without the learner column keeps the answers on this device", async () => {
  const broken = { getProfile: async () => ({ id: "u", goal: "exam" }), saveProfile: async () => { throw new Error("column profiles.learner does not exist"); } };
  const l = await saveLearner(broken, { prior: { SciGradify: "confident" } });
  assert.equal(l.prior.SciGradify, "confident");
  assert.equal(learnerOf({ id: "u" }).prior.SciGradify, "confident", "falls back to the mirror");
  assert.equal(syncMirror({ learner: { ...DEFAULTS, prior: { X: "new" } } }).prior.X, "new", "the account's copy wins when it has one");
});

const NOW = Date.parse("2026-11-06T09:00:00Z");
test("pace: today's work puts due reviews first and fits the daily time", () => {
  const p = paceFor({ dailyMinutes: 30, remaining: 100, dueCards: 20, dueQuestions: 4, now: NOW });
  assert.equal(p.status, "no-date");
  assert.equal(p.today.cards, 20); assert.equal(p.today.questions, 4);
  assert.ok(p.today.lessons >= 1 && p.today.minutes <= 32, JSON.stringify(p.today));
  const lots = paceFor({ dailyMinutes: 10, remaining: 5, dueCards: 500, now: NOW });
  assert.ok(lots.today.minutes <= 10 + 12, "reviews never take the whole day; one lesson still fits");
});

test("pace: on track, tight and behind against an exam date", () => {
  const exam = "2027-01-06"; // 61 days away
  assert.equal(paceFor({ examDate: exam, dailyMinutes: 30, remaining: 60, now: NOW }).status, "on-track");
  assert.equal(paceFor({ examDate: exam, dailyMinutes: 30, remaining: 160, now: NOW }).status, "tight");
  const b = paceFor({ examDate: exam, dailyMinutes: 10, remaining: 300, now: NOW });
  assert.equal(b.status, "behind");
  assert.ok(b.minutesNeeded > 10 && b.finish > exam);
  assert.equal(paceFor({ examDate: "2026-10-01", dailyMinutes: 30, remaining: 3, now: NOW }).status, "past");
  assert.equal(paceFor({ examDate: exam, dailyMinutes: 30, remaining: 0, now: NOW }).status, "done");
});

test("pace: prior knowledge makes lessons quicker", () => {
  const a = paceFor({ dailyMinutes: 30, remaining: 200, prior: "new", now: NOW }), b = paceFor({ dailyMinutes: 30, remaining: 200, prior: "confident", now: NOW });
  assert.ok(b.daysNeeded < a.daysNeeded);
});
