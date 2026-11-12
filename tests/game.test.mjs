// The game engine (kit/game/): XP, levels, ranks, streaks with rest days, the reward ledger, quests, achievements
// and daily challenges, on invented learners. Every reward is paid once, however often a page reloads.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { levelOf, rankOf, eventsOf, habits, gameState, claim, dayKey, DAY, REST_EVERY } from "../kit/game/engine.js";
import { quests, nextSteps } from "../kit/game/quests.js";
import { achievements, nextAchievement, registerAchievement } from "../kit/game/achievements.js";
import { dailyChallenge, challengeReward, registerChallenge } from "../kit/game/challenges.js";
import { markQuestion } from "../kit/assess/questions.js";
import { parseNotes } from "../kit/course/notes.js";

const NOW = new Date(2026, 10, 7, 18, 0).getTime();          // a Saturday evening, local time
const at = (daysAgo, h = 12) => { const d = new Date(NOW); d.setDate(d.getDate() - daysAgo); d.setHours(h, 0, 0, 0); return d.getTime(); };
const unit = (id, n, k) => ({ id, n, title: `Unit ${n}`, lessons: [...Array(k)].map((_, i) => ({ id: `${id}-${String(i + 1).padStart(2, "0")}`, title: `Lesson ${n}.${i + 1}`, module: "M" })) });
const course = (slug, S = {}, extra = {}) => ({ slug, site: `${slug}site`, name: slug, units: [unit("u01", 1, 3), unit("u02", 2, 3)], S: { log: [], done: {}, attempts: [], quiz: {}, goal: 30, ...S }, ...extra });
const attempt = (lesson, score, daysAgo, h = 12) => ({ lesson, score, correct: score >= 0.7, at: new Date(at(daysAgo, h)).toISOString(), question: { id: `${lesson}-q${Math.random()}`, type: "mcq", d: 2 }, confidence: null, marking: { status: "final" }, schema: 1, context: "lesson" });

test("levels follow the course engine's curve exactly, and ranks have subject titles", async () => {
  const src = await readFile(new URL("../kit/course/course.js", import.meta.url), "utf8");
  const { levelOf: courseLevelOf } = await import("../kit/course/course.js");
  for (const xp of [0, 99, 100, 299, 300, 1234, 5000, 99999]) assert.equal(levelOf(xp).n, courseLevelOf(xp).n, `xp ${xp}`);
  assert.deepEqual([levelOf(0).n, levelOf(100).n, levelOf(300).n], [1, 2, 3]);
  assert.equal(levelOf(250).need, 50);
  assert.equal(rankOf(1).name, "Novice"); assert.equal(rankOf(12).name, "Adept"); assert.equal(rankOf(12).next.name, "Expert");
  assert.equal(rankOf(6, "history").name, "Researcher"); assert.equal(rankOf(6, "physics").name, "Scholar");
});

test("XP is the sum of every course's own log plus paid game rewards, with no second ledger", () => {
  const a = course("maths", { log: [{ t: at(1), xp: 10, k: "lesson", id: "u01-01" }, { t: at(0), xp: 5, k: "check", id: "q" }] });
  const b = course("history", { log: [{ t: at(0), xp: 50, k: "quiz", id: "u01" }] });
  const s = gameState([a, b], { paid: { "quest:x": { t: at(0), xp: 30 } } }, { now: NOW });
  assert.equal(s.xp, 95); assert.equal(s.todayGain, 85);
  assert.deepEqual(s.subjects.map((x) => [x.slug, x.xp]), [["history", 50], ["maths", 15]]);
  assert.equal(eventsOf([a]).every((e) => e.course === "maths"), true);
});

test("streaks: rest days are earned and cover missed days; a long break ends the streak quietly, the record stays", () => {
  const ev = (days) => days.map((d) => ({ t: at(d), xp: 10, k: "lesson" }));
  // 7 active days earn a rest day, which covers one missed day
  assert.equal(habits(ev([9, 8, 7, 6, 5, 4, 3, 1, 0]), { now: NOW }).streak, 9);
  assert.equal(habits(ev([9, 8, 7, 6, 5, 4, 3, 1, 0]), { now: NOW }).restUsed, 1);
  // without a banked rest day, a missed day ends the streak
  assert.equal(habits(ev([3, 1, 0]), { now: NOW }).streak, 2);
  // a long break: streak 0, best kept, and the learner counts as away
  const h = habits(ev([20, 19, 18, 17]), { now: NOW });
  assert.equal(h.streak, 0); assert.equal(h.best, 4); assert.equal(h.daysAway, 17);
  // an empty today doesn't break yesterday's streak
  assert.equal(habits(ev([2, 1]), { now: NOW }).streak, 2);
  assert.equal(REST_EVERY, 7);
});

test("daily and weekly goals, the calendar and personal records", () => {
  const h = habits([{ t: at(0, 9), xp: 20, k: "lesson" }, { t: at(0, 10), xp: 15, k: "check" }, { t: at(2), xp: 40, k: "quiz" }], { now: NOW, goal: 30 });
  assert.equal(h.todayXp, 35); assert.equal(h.goalMet, true); assert.equal(h.goalDays, 2); assert.equal(h.weekGoal, 150);
  assert.equal(h.calendar.get(dayKey(at(2))), 40); assert.equal(h.bestDay, 40);
});

test("a reward is paid exactly once, however often it is claimed", () => {
  const r = { key: "quest:2026-11-07:lessons", done: true, xp: 30, title: "Complete two lessons" };
  let g = {}; for (let i = 0; i < 5; i++) g = claim(g, r, NOW + i);
  assert.equal(Object.keys(g.paid).length, 1); assert.equal(g.paid[r.key].xp, 30); assert.equal(g.paid[r.key].t, NOW);
  assert.equal(claim(g, { ...r, key: "quest:x", done: false }).paid["quest:x"], undefined, "unfinished rewards aren't paid");
  const s = gameState([course("maths")], g, { now: NOW });
  assert.equal(s.xp, 30);
  // the same ledger after a "reload" (serialised and parsed) still holds one payment
  assert.equal(gameState([course("maths")], JSON.parse(JSON.stringify(claim(g, r))), { now: NOW }).xp, 30);
});

test("quests fit the learner: no lesson quest when all are done, a weak-topic quest only for a measured weakness, gentle after time away", () => {
  const allDone = Object.fromEntries(["u01-01", "u01-02", "u01-03", "u02-01", "u02-02", "u02-03"].map((id) => [id, at(3)]));
  let q = quests(gameState([course("maths", { done: allDone, log: [{ t: at(1), xp: 10, k: "lesson" }] })], {}, { now: NOW }));
  assert.ok(!q.some((x) => x.id === "lessons"), "no lesson quest when every lesson is done");
  assert.ok(!q.some((x) => x.id === "weak"), "no weak-topic quest without evidence");
  assert.equal(q.filter((x) => x.kind === "daily").length, 3);
  // a measured weakness: several wrong answers on one lesson
  const weakA = [0.1, 0.2, 0, 0.3, 0.2, 0.1].map((s, i) => attempt("u01-02", s, 2, 9 + i));
  q = quests(gameState([course("maths", { attempts: weakA, log: [{ t: at(1), xp: 5, k: "check" }] })], {}, { now: NOW }));
  const weak = q.find((x) => x.id === "weak");
  assert.ok(weak, "a weak-topic quest is offered"); assert.match(weak.title, /Lesson 1\.2/); assert.equal(weak.done, false);
  // answering that lesson well today completes it
  const s2 = gameState([course("maths", { attempts: [...weakA, attempt("u01-02", 1, 0, 10)], log: [] })], {}, { now: NOW });
  assert.equal(quests(s2).find((x) => x.id === "weak")?.done, true);
  // away for five days: gentler quests and a welcome-back step
  const away = gameState([course("maths", { log: [{ t: at(5), xp: 10, k: "lesson" }] })], {}, { now: NOW });
  assert.equal(quests(away).find((x) => x.id === "lessons").of, 1);
  assert.equal(nextSteps(away)[0].kind, "return");
});

test("quest progress comes from today's real activity, and a completed quest pays once", () => {
  const log = [1, 2].map((i) => ({ t: at(0, 9 + i), xp: 10, k: "lesson", id: `u01-0${i}` }));
  const s = gameState([course("maths", { log, done: { "u01-01": at(0), "u01-02": at(0) } })], {}, { now: NOW });
  const q = quests(s).find((x) => x.id === "lessons");
  assert.deepEqual([q.n, q.of, q.done], [2, 2, true]);
  const g = claim(claim({}, q, NOW), q, NOW + 5);
  assert.equal(quests(gameState(s.courses, g, { now: NOW })).find((x) => x.id === "lessons").paid, true);
  assert.equal(gameState(s.courses, g, { now: NOW }).xp, 20 + 30);
});

test("achievements: conditions, progress towards locked ones, and an extensible registry", () => {
  const done = { "u01-01": at(2), "u01-02": at(1), "u01-03": at(0) };
  const s = gameState([course("maths", { done, log: [{ t: at(0), xp: 10, k: "lesson" }], quiz: { u01: { best: 1, pass: true } } })], {}, { now: NOW });
  const A = Object.fromEntries(achievements(s).map((a) => [a.id, a]));
  assert.equal(A["first-steps"].done, true); assert.equal(A.scholar.done, true); assert.equal(A.perfectionist.done, true);
  assert.deepEqual([A["curious-mind"].n, A["curious-mind"].of, A["curious-mind"].done], [1, 5, false]);
  assert.equal(A.consistency.done, false);
  assert.ok(nextAchievement(achievements(s)));
  assert.throws(() => registerAchievement({ id: "scholar", name: "x", d: "x", progress: () => ({ n: 0, of: 1 }) }), /already registered/);
  // a comeback: wrong early, right later
  const cb = [0, 0.2, 0.1, 0.9, 1, 1].map((x, i) => attempt("u02-01", x, 6 - i));
  assert.equal(Object.fromEntries(achievements(gameState([course("maths", { attempts: cb })], {}, { now: NOW })).map((a) => [a.id, a])).comeback.done, true);
});

test("daily challenge: built from real content, stable for the day, history gets a chronology challenge", async () => {
  const hist = (await import("../kit/courses/history/course.js")).default;
  const lessons = parseNotes(await hist.notes("u01")).map((L, i) => ({ ...L, id: hist.units[0].lessons[i].id, course: "history" }));
  const ctx = { day: "2026-11-07", weak: [], attempts: [], itemsByLesson: {}, doneLessons: [], lessons, subjects: ["history"] };
  const c = dailyChallenge(ctx);
  assert.equal(c.kind, "chronology");
  assert.deepEqual(dailyChallenge(ctx).items[0].Q.steps, c.items[0].Q.steps, "the same challenge on every reload");
  const years = c.items[0].Q.why.match(/\d{4}(?=:)/g).map(Number);
  assert.deepEqual(years, [...years].sort((a, b) => a - b));
  assert.equal(markQuestion(c.items[0].Q, c.items[0].Q.steps).correct, true);
  // a speed round from completed lessons' questions when there's no history and no weakness
  const items = lessons.flatMap((L) => L.mcq.map((m, i) => ({ key: `${L.id}-${i}`, Q: m.Q, lesson: L.id })));
  const sp = dailyChallenge({ ...ctx, subjects: ["maths"], itemsByLesson: { a: items }, doneLessons: ["a"] });
  assert.ok(["speed", "mixed"].includes(sp.kind)); assert.equal(sp.items.length, 5);
  assert.equal(challengeReward({ correct: 4 }, sp).xp, 40); assert.equal(challengeReward({ correct: 9 }, sp).xp, 50);
  assert.throws(() => registerChallenge("speed", {}), /already registered/);
});

test("account sync sends each paid reward once: not if synced from here, not if the account already holds it", async () => {
  const { unsynced, rewardKind } = await import("../kit/game/engine.js");
  const g = { paid: { "ach:scholar": { t: 1, xp: 50 }, "quest:2026-11-07:lessons": { t: 2, xp: 30 }, "challenge:2026-11-07": { t: 3, xp: 40 } }, synced: { "ach:scholar": 5 } };
  assert.deepEqual(unsynced(g, new Set([rewardKind("challenge:2026-11-07")])).map(([k]) => k), ["quest:2026-11-07:lessons"]);
  assert.deepEqual(unsynced({}, new Set()), []);
  const sql = await readFile(new URL("../supabase/migrations/20261107120000_game_rewards.sql", import.meta.url), "utf8");
  assert.match(sql, /unique index[^;]*\(user_id, kind\) where kind like 'game-%'/, "the database refuses a second row for a reward");
});

test("one level curve everywhere: course pages, the Journey, the study app and LifeOS", async () => {
  for (const f of ["../kit/app/main.js", "../kit/lifeos/mine.js", "../kit/course/course.js"]) {
    const src = await readFile(new URL(f, import.meta.url), "utf8");
    assert.ok(!/Math\.sqrt\(xp \/ 50\)/.test(src), `${f} has its own level curve`);
    assert.match(src, /from "\.\.\/game\/engine\.js"/, `${f} uses the shared engine`);
  }
});

test("one level and streak: learning outside courses counts once, course awards and synced rewards never twice", async () => {
  const { gameState, outsideCourses } = await import("../kit/game/engine.js");
  const now = Date.parse("2026-11-10T12:00:00"), d = 864e5, iso = (t) => new Date(t).toISOString();
  // a course award is in the course's own log AND the activity log; a paid game reward is in the ledger AND synced
  const courses = [{ slug: "law", S: { log: [{ t: now - d, xp: 10, k: "lesson", id: "u01-01" }] } }];
  const game = { paid: { "ach:first": { t: now - d, xp: 10, title: "First Steps" } } };
  const activity = [
    { at: iso(now - d), kind: "law-lesson", xp: 10, site: "LawGradify" },        // already in the course log
    { at: iso(now - d), kind: "game-ach:first", xp: 10, site: "Gradify" },       // already in the game ledger
    { at: iso(now - 2 * d), kind: "session", xp: 6, site: "Gradify" },           // a flashcard session in the app
    { at: iso(now), kind: "workout", xp: 15, site: "SportGradify" },             // a workout
    { at: iso(now), kind: "block", xp: 0, site: "Gradify" },                     // no XP: not an event
  ];
  const extra = outsideCourses(activity, ["law", "maths"]);
  assert.deepEqual(extra.map((a) => a.kind), ["session", "workout"]);
  const without = gameState(courses, game, { now }), withLife = gameState(courses, game, { now, extra });
  assert.equal(without.xp, 20);
  assert.equal(withLife.xp, 41, "10 lesson + 10 reward + 6 session + 15 workout, each once");
  assert.equal(without.habits.streak, 1);
  assert.equal(withLife.habits.streak, 3, "the flashcard session two days ago and today's workout join the streak");
  assert.equal(withLife.recent[0].k, "life");
});
