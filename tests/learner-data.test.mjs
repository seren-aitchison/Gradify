// One learner's data across Gradify (kit/learning/learner-data.js): activity, streaks, course summaries,
// map topics and recommendations, all from real records only.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import { activityDays, streakOf, courseSummary, schoolTopic, recommend, COURSES } from "../kit/learning/learner-data.js";

const DAY = 864e5, NOW = Date.parse("2026-11-06T15:00:00");
const ago = (d) => new Date(NOW - d * DAY).toISOString();
const law = (await import("../kit/courses/law/course.js")).default;

test("every course is listed with its page", async () => {
  for (const slug of await readdir(new URL("../kit/courses/", import.meta.url))) assert.ok(COURSES[slug], `${slug} is listed in COURSES`);
  for (const href of Object.values(COURSES)) assert.match(href, /^\/[a-z]+\/[a-z]+\/$/);
});

test("activity becomes a year of days by site, and streaks count honestly", () => {
  const days = activityDays([{ at: ago(0), site: "LawGradify" }, { at: ago(0), site: "LawGradify" }, { at: ago(1), site: "SciGradify" }, { at: ago(2), site: "LawGradify" }, { at: ago(5), site: "LawGradify" }], { now: NOW });
  assert.ok(days.length >= 364 && days.length <= 371);
  assert.equal(days[0].date.getDay(), 1, "starts on a Monday");
  assert.deepEqual(days.at(-1).counts, { LawGradify: 2 });
  assert.deepEqual(streakOf(days), { n: 3, best: 3, today: true });
  const notYet = activityDays([{ at: ago(1), site: "X" }, { at: ago(2), site: "X" }], { now: NOW });
  assert.equal(streakOf(notYet).n, 2, "today isn't over, so yesterday's streak still stands");
  assert.equal(streakOf(activityDays([], { now: NOW })).n, 0);
});

test("a course summary is built from the progress object alone", () => {
  const u1 = law.units[0], ids = u1.lessons.map((l) => l.id);
  const a = (q, d, score, unit = u1.id, lesson = ids[0]) => ({ schema: 1, id: q + d, at: ago(d), site: "LawGradify", subject: "law", context: "lesson", question: { id: q, type: "sba", d: 2, objectives: [] }, lesson, unit, score, correct: score >= 0.7, attempt: 1, confidence: 3, marking: { method: "auto", status: "final" } });
  const S = { done: { [ids[0]]: NOW - 3 * DAY, [ids[1]]: NOW - DAY }, cards: { c1: { due_at: ago(1), reps: 1 }, c2: { due_at: ago(-5), reps: 1 } }, log: [{ t: NOW - DAY, xp: 20, k: "lesson", id: ids[1] }],
    attempts: [a("q1", 4, 1), a("q2", 4, 0), a("q3", 3, 1), a("q4", 3, 1), a("q1", 0.5, 1)] };
  const c = courseSummary(law, S, { now: NOW, profile: { site: "LawGradify", exam_date: "2027-01-10", daily_minutes: 30 } });
  assert.equal(c.done, 2); assert.equal(c.total, 480); assert.equal(c.dueCards, 1);
  assert.equal(c.next.id, ids[2]);
  assert.equal(c.revisit, 3, "the wrong answer, and two right answers past their 1-day step");
  assert.equal(c.six.calibration.sureWrong, 1, "one confident wrong answer");
  assert.equal(c.pace.status, "behind");
  assert.equal(c.schools.length, 1); assert.equal(c.schools[0].done, 2);
  assert.ok(c.started);
  assert.equal(c.href, "/lawgradify/course/");
  // the same school on a subject map
  const t = schoolTopic(c, c.schools[0], NOW);
  assert.equal(t.key, `course:law:${u1.id}`); assert.equal(t.course, true);
  assert.match(t.href, /#\/learn\/u01$/);
  assert.equal(t.level, "learning");
  assert.equal(t.dims.apply.value === null || typeof t.dims.apply.value === "number", true);
  assert.match(t.text, new RegExp(u1.lessons[0].title));
  // nothing done: not started
  assert.equal(courseSummary(law, {}, { now: NOW }).started, false);
});

test("recommendations rank confident mistakes and due work first, and link to the real place", () => {
  const base = { started: true, site: "LawGradify", name: "Law", href: "/lawgradify/course/", done: 3, total: 480, pace: { status: "no-date" }, next: { id: "u01-04", title: "Common law" } };
  const recs = recommend([
    { ...base, six: { calibration: { sureWrong: 2 } }, revisit: 4, dueCards: 0 },
    { ...base, name: "Physics", site: "SciGradify", href: "/scigradify/physics/", six: { calibration: null }, revisit: 0, dueCards: 12, next: null },
  ], [{ level: "fading", topic: "Cells", key: "d|Cells", next: { label: "Review before you forget", why: "w" } }]);
  assert.match(recs[0].label, /2 confident mistakes in Law/);
  assert.equal(recs[0].href, "/lawgradify/course/#/me");
  assert.deepEqual(recs.map((r) => r.href), ["/lawgradify/course/#/me", "/lawgradify/course/#/review/questions", "/scigradify/physics/#/review", "/app.html#/topic/d%7CCells", "/lawgradify/course/#/lesson/u01-04"]);
  assert.deepEqual(recommend([{ ...base, started: false, six: {}, revisit: 9, dueCards: 9 }], []), [], "courses not started recommend nothing");
});
