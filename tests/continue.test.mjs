// "Pick up where you left off" (kit/app/continue-view.js), the sidebar's essentials-first disclosure
// (kit/app/app-nav.js visibleScreens) and the recently opened courses dropdown (kit/ui/switcher.js recentCourses).
import { test } from "node:test";
import assert from "node:assert/strict";
import { continueItems, continueHtml, assessmentStatus } from "../kit/app/continue-view.js";
import { visibleScreens } from "../kit/app/app-nav.js";
import { recentCourses } from "../kit/ui/switcher.js";

const course = { title: "Cell cycle", href: "/sci/bio/#/lesson/cc", course: "Biology", site: "SciGradify", course_pct: 0.42, t: 500 };
const hist = [
  { act: "viewed", href: "/sci/bio/#/quiz/u2", title: "School 2 quiz", kind: "quiz", subject: "Biology", where: "SciGradify · Biology", t: 900 },
  { act: "viewed", href: "/app.html#/notes/abc", title: "Lecture 4", kind: "notes", t: 800 },
  { act: "studied", href: "/app.html#/deck/d1", title: "Cardiac cycle", kind: "flashcards", where: "Flashcards", t: 700 },
  { act: "viewed", href: "/law/#/lesson/t1", title: "Torts", kind: "lesson", subject: "Law", where: "LawGradify · Law", t: 600 },
];

test("one tile for each thing in progress, most pressing first, then newest first", () => {
  const blocks = [{ title: "Physiology reading", start_min: 18 * 60, done: false, cal: "study" }, { title: "Review cards", start_min: 9 * 60, done: true }, { title: "Lecture", cal: "external" }];
  const xs = continueItems({ course, hist, session: { steps: [{ title: "Recap" }, { title: "Learn" }], i: 1 }, blocks });
  assert.deepEqual(xs.map((x) => x.kind), ["session", "plan", "notes", "flashcards", "lesson"]);   // the quiz was only opened
  assert.equal(xs[0].title, "Step 2 of 2: Learn");
  assert.equal(xs[1].title, "1 of 2 blocks left today");          // the learner's calendar isn't counted
  assert.equal(xs[1].sub, "Next: Physiology reading at 18:00");
  assert.equal(xs.find((x) => x.kind === "lesson").sub, "Biology · 42% through");
  // limit, and nothing for a first visit
  assert.equal(continueItems({ course, hist, limit: 2 }).length, 2);
  assert.deepEqual(continueItems({}), []);
  assert.equal(continueHtml([]), "");
});

test("a quiz is offered only once an answer is in: not started, in progress, completed, available to retry", () => {
  assert.equal(assessmentStatus(undefined), "not-started");
  assert.equal(assessmentStatus({ act: "viewed" }), "not-started");
  assert.equal(assessmentStatus({ state: "in-progress", answered: 0, total: 10 }), "not-started");
  assert.equal(assessmentStatus({ state: "in-progress", answered: 3, total: 10 }), "in-progress");
  assert.equal(assessmentStatus({ state: "completed", pass: true, score: 80 }), "completed");
  assert.equal(assessmentStatus({ state: "completed", pass: false, score: 40 }), "retry");
  const quiz = "/sci/bio/#/quiz/u2", T = 1e12;
  // merely opened: nothing (the fixtures above only viewed the quiz)
  assert.ok(!continueItems({ hist, now: T }).some((x) => ["questions", "retry"].includes(x.kind)));
  const going = [{ act: "studied", href: quiz, title: "School 2 quiz", kind: "quiz", state: "in-progress", answered: 3, total: 10, t: T }];
  const tile = continueItems({ hist: going, now: T }).find((x) => x.kind === "questions");
  assert.equal(tile.sub, "3 of 10 answered");
  assert.equal(tile.label, "Questions in progress");
  // finished and passed: nothing; under the pass mark: a retry, for a fortnight
  assert.ok(!continueItems({ hist: [{ ...going[0], state: "completed", pass: true, score: 90 }], now: T }).length);
  const failed = [{ ...going[0], state: "completed", pass: false, score: 40 }];
  assert.equal(continueItems({ hist: failed, now: T }).find((x) => x.kind === "retry").sub, "40% last time");
  assert.ok(!continueItems({ hist: failed, now: T + 15 * 864e5 }).length);
  // only the newest state of each quiz counts: retaking it after a fail is "in progress" again
  const retaking = [{ ...going[0], answered: 1, t: T + 5 }, ...failed];
  assert.deepEqual(continueItems({ hist: retaking, now: T + 6 }).map((x) => x.kind), ["questions"]);
});

test("the last subject shows only when it isn't the last lesson's, and links to its course home", () => {
  assert.ok(!continueItems({ course, hist }).some((x) => x.kind === "subject"));
  const s = continueItems({ course: { ...course, course: "Chemistry" }, hist }).find((x) => x.kind === "subject");
  assert.equal(s.title, "Biology"); assert.equal(s.href, "/sci/bio/#/home");
  // a finished session and the plan's daily notes aren't "in progress"
  assert.ok(!continueItems({ session: { steps: [{}], i: 1 } }).length);
  assert.ok(!continueItems({ hist: [{ act: "viewed", href: "/a#/notes/daily", title: "Today" }] }).length);
});

test("this app's own links become in-app links", () => {
  const html = continueHtml(continueItems({ hist }), { appPath: "/app.html" });
  assert.match(html, /href="#\/notes\/abc"/);
  assert.match(continueHtml(continueItems({ course })), /href="\/sci\/bio\/#\/lesson\/cc"/);
});

test("essentials first: extras show when opened, once used, or while you're on them", () => {
  const list = [["learning", "Courses"], ["curriculum", "My curriculum"], ["earth", "Earth"]];
  const advanced = new Set(["curriculum", "earth"]);
  const names = (o) => visibleScreens(list, { advanced, ...o }).shown.map((x) => x[0]);
  assert.deepEqual(names({}), ["learning"]);
  assert.equal(visibleScreens(list, { advanced }).hidden.length, 2);
  assert.deepEqual(names({ open: true }), ["learning", "curriculum", "earth"]);
  assert.deepEqual(names({ used: new Set(["earth"]) }), ["learning", "earth"]);
  assert.deepEqual(names({ current: "curriculum" }), ["learning", "curriculum"]);
  assert.deepEqual(visibleScreens(list).shown.length, 3);           // nothing marked advanced: everything shows
});

test("recent courses: one row per course, newest first", () => {
  const xs = recentCourses([
    { site: "SciGradify", course: "Biology", href: "/sci/bio/#/lesson/a", t: 1 },
    { site: "LawGradify", course: "Law", href: "/law/#/lesson/x", t: 3 },
    { site: "SciGradify", course: "Biology", href: "/sci/bio/#/lesson/b", t: 2 },
    { site: "X", course: "No link", t: 9 },
  ]);
  assert.deepEqual(xs.map((x) => [x.course, x.href]), [["Law", "/law/#/lesson/x"], ["Biology", "/sci/bio/#/lesson/b"]]);
  assert.equal(xs[1].base, "/sci/bio/");
  assert.equal(recentCourses(Array.from({ length: 20 }, (_, i) => ({ site: "s", course: `c${i}`, href: `/c${i}/`, t: i })), { limit: 5 }).length, 5);
});

test("sidebar: recently used means the last 30 days; the learner's own choices win, and essentials can't be hidden", async () => {
  const { recentlyUsed } = await import("../kit/app/app-nav.js");
  const now = 1e12;
  assert.deepEqual([...recentlyUsed({ earth: now - 864e5, intel: now - 40 * 864e5 }, { now })], ["earth"]);
  const list = [["learning", "Courses"], ["curriculum", "My curriculum"], ["earth", "Earth"]];
  const advanced = new Set(["curriculum", "earth"]);
  const names = (o) => visibleScreens(list, { advanced, ...o }).shown.map((x) => x[0]);
  assert.deepEqual(names({ choice: { curriculum: "always" } }), ["learning", "curriculum"]);
  assert.deepEqual(names({ used: new Set(["earth"]), choice: { earth: "never" } }), ["learning"]);
  assert.deepEqual(names({ choice: { earth: "never" }, current: "earth" }), ["learning", "earth"]);   // a direct link still shows where you are
  assert.deepEqual(names({ choice: { learning: "never" } }), ["learning"]);                          // an essential always shows
});
