// The free planners, timers and writing tools on getgradify.com/tools/ (assets/tools-plan.js, assets/tools-write.js),
// the topic pages' quiz and export helpers (assets/topic.js) and what the browser remembers (assets/memory.js).
import { test } from "node:test";
import assert from "node:assert/strict";
import { cramPlan, deadlinePlan, timetable, studyHours, readingTime, prioritise, moduleNeed, gradeFor, convert, splitWords, growth, winterPlan, mistakeBreakdown, roomPhase, icsEvents } from "../assets/tools-plan.js";
import { coverage, cite, essayOutline, presentationPlan, researchQuestions, litGroups, groupSplit, deconstruct, vivaQuestions, seminarPrep } from "../assets/tools-write.js";
import { options, quizSummary, cardsCsv, speakMinutes } from "../assets/topic.js";
import { streakOf, dueList, dayKey } from "../assets/memory.js";

const day = (s) => new Date(`${s}T00:00`);

test("cram planner: sleep comes off first, then four blocks in 40/30/20/10", () => {
  const p = cramPlan(48, ["a", "b", "c", "d"]);
  assert.equal(p.sleep, 16);
  assert.equal(p.study, 19.2);
  assert.deepEqual(p.blocks.map((b) => b.hours), [7.7, 5.8, 3.8, 1.9]);
  assert.ok(Math.abs(p.perTopic - 115.2) < 0.01);
});

test("deadline planner: finishes two days early, milestones in order, tight when close", () => {
  const p = deadlinePlan(day("2026-12-21"), 20, 5, day("2026-11-30"));
  assert.equal(p.span, 19);
  assert.equal(p.milestones.at(-1).by.getTime(), day("2026-12-21").getTime());
  for (let i = 1; i < p.milestones.length; i++) assert.ok(p.milestones[i].by >= p.milestones[i - 1].by);
  assert.ok(deadlinePlan(day("2026-12-03"), 10, 5, day("2026-11-30")).tight);
  assert.match(icsEvents([{ date: day("2026-12-01"), title: "Draft, done" }]), /DTSTART;VALUE=DATE:20261201\r\nSUMMARY:Draft  done/);
});

test("exam timetable: the close, heavy exam gets the first days; days stop at each exam", () => {
  const from = day("2026-12-01");
  const t = timetable([{ name: "Heavy", date: day("2026-12-05"), weight: 5, difficulty: 5 }, { name: "Light", date: day("2026-12-12"), weight: 1, difficulty: 1 }], from);
  assert.equal(t.days[0].exam, "Heavy");
  assert.ok(t.days.filter((d) => d.exam === "Heavy").every((d) => d.day < day("2026-12-05")));
  assert.deepEqual(timetable([{ name: "Past", date: day("2026-11-01") }], from).days, []);
});

test("study hours, reading time and the prioritiser", () => {
  assert.deepEqual(studyHours(36, 5, 2), { total: 65, weekly: 13 });
  const r = readingTime({ pages: 10, density: "textbook" });
  assert.equal(r.words, 4500); assert.equal(r.read, 22.5); assert.equal(r.total, 22.5 + 11.25 + 30);
  const p = prioritise([{ topic: "A", weight: 5, conf: 2 }, { topic: "B", weight: 2, conf: 2 }, { topic: "C", weight: 3, conf: 5 }, { topic: "" }]);
  assert.deepEqual([p.first.map((x) => x.topic), p.next.map((x) => x.topic), p.later.map((x) => x.topic)], [["A"], ["B"], ["C"]]);
});

test("module grade: marks banked, the exam mark needed, and done when all is in", () => {
  const m = moduleNeed([{ mark: "64", weight: "30" }, { mark: "55", weight: "20" }, { mark: "", weight: "" }], 60);
  assert.equal(m.banked, 30.2); assert.equal(m.left, 50); assert.ok(Math.abs(m.need - 59.6) < 1e-9);
  assert.equal(moduleNeed([{ mark: "70", weight: "100" }], 60).need, null);
});

test("grade boundaries, units and the dissertation split", () => {
  const b = [{ grade: "A", mark: "140" }, { grade: "B", mark: "118" }, { grade: "C", mark: "96" }];
  assert.deepEqual(gradeFor(137, b), { grade: "B", next: "A", toNext: 3 });
  assert.deepEqual(gradeFor(150, b), { grade: "A", next: null, toNext: 0 });
  assert.equal(gradeFor(50, b).grade, "below the lowest boundary");
  assert.ok(Math.abs(convert(25, "volume", "cm³ (mL)", "dm³ (L)").value - 0.025) < 1e-12);
  assert.ok(Math.abs(convert(1, "mass", "mg", "µg").value - 1000) < 1e-9);
  assert.equal(convert(1, "mass", "mg", "nope"), null);
  const s = splitWords(10000, "empirical");
  assert.equal(s.parts.reduce((a, p) => a + p.words, 0), 10000);
});

test("compound growth: fees always cost something, and nothing grows at 0%", () => {
  const g = growth({ start: 1000, monthly: 100, years: 20, rate: 5, fee: 1 });
  assert.equal(g.paid, 25000); assert.ok(g.gross > g.net && g.drag > 0);
  assert.equal(growth({ start: 100, monthly: 0, years: 5, rate: 0, fee: 0 }).net, 100);
});

test("winter plan, mistake log and the focus room's shared clock", () => {
  const w = winterPlan(day("2026-12-12"), day("2027-01-11"), 4);
  assert.equal(w.length, 30); assert.equal(w[0].kind, "rest"); assert.equal(w.at(-1).kind, "focus");
  assert.deepEqual(mistakeBreakdown([{ reason: "misread" }, { reason: "misread" }, { reason: "forgot" }, { reason: "concept" }])[0], { reason: "misread", count: 2, share: 50 });
  const hour = Date.UTC(2026, 10, 23, 14, 0, 0);
  assert.equal(roomPhase(hour + 23 * 60e3).phase, "focus");
  assert.equal(roomPhase(hour + 23 * 60e3).left, 27 * 60e3);
  assert.equal(roomPhase(hour + 55 * 60e3).phase, "break");
});

test("syllabus and mark-scheme coverage: word matching, with stems", () => {
  const r = coverage("Describe the structure of DNA\nExplain enzyme denaturation\nOutline mitosis", "DNA is a double helix structure. Enzymes are denatured by heat.");
  assert.deepEqual(r.map((x) => x.covered), [true, true, false]);
  assert.deepEqual(r[2].miss, ["mitosis"]);
});

test("references: Harvard, APA, Vancouver and IEEE, with in-text forms", () => {
  const f = { authors: "Roediger, Henry L; Karpicke, Jeffrey D", year: "2006", title: "Test-enhanced learning", source: "Psychological Science", volume: "17", issue: "3", pages: "249-255", doi: "10.1111/j.1467-9280.2006.01693.x" };
  assert.equal(cite("harvard", "journal", f).intext, "(Roediger and Karpicke, 2006)");
  assert.match(cite("harvard", "journal", f).ref, /^Roediger, H\. L\. and Karpicke, J\. D\. \(2006\) 'Test-enhanced learning', \*Psychological Science\*, 17\(3\), pp\. 249-255\./);
  assert.equal(cite("apa", "journal", f).intext, "(Roediger & Karpicke, 2006)");
  assert.match(cite("apa", "journal", f).ref, /\(2006\)\. Test-enhanced learning\. \*Psychological Science\*, \*17\*\(3\), 249-255\. https:\/\/doi\.org\//);
  assert.match(cite("vancouver", "journal", f).ref, /^Roediger HL, Karpicke JD\. Test-enhanced learning\. Psychological Science\. 2006;17\(3\):249-255\./);
  assert.match(cite("ieee", "journal", f).ref, /^\[1\] H\. L\. Roediger and J\. D\. Karpicke, "Test-enhanced learning,"/);
  assert.equal(cite("apa", "book", { authors: "A, B; C, D; E, F", year: "2020", title: "T" }).intext, "(A et al., 2020)");
});

test("essay, presentation, research question, literature review, group split and question deconstructor", () => {
  const o = essayOutline("Q", 2000, "T", 3);
  assert.equal(o.length, 6); assert.ok(Math.abs(o.reduce((a, p) => a + p.words, 0) - 2000) <= 30);
  const p = presentationPlan(10, ["a", "b", "c"]);
  assert.equal(p.words, 1300); assert.equal(p.slides.length, 5); assert.equal(p.slides[1].words, Math.round(p.slides[1].mins * 130));
  assert.match(researchQuestions({ topic: "X", population: "P", comparison: "C", outcome: "O" }).options[1].q, /^In P, does X compared with C change O\?$/);
  assert.equal(researchQuestions({}).finer.length, 5);
  const g = litGroups([{ who: "A", stance: "agree" }, { who: "B", stance: "method" }, { who: "C", stance: "gap" }, { who: "", claim: "" }]);
  assert.deepEqual([g.agree.length, g.tension.length, g.gap.length], [1, 1, 1]);
  const s = groupSplit(["A", "B"], [{ task: "x", hours: 5 }, { task: "y", hours: 3 }, { task: "z", hours: 3 }], day("2026-12-31"), day("2026-12-01"));
  assert.deepEqual(s.load.map((m) => m.hours), [5, 6]); assert.equal(s.checkpoints.length, 3);
  const d = deconstruct("Evaluate the use of beta-blockers.", 8);
  assert.equal(d.command, "evaluate"); assert.equal(d.time, 9.6);
  assert.equal(deconstruct("Calculate the moles in 25 cm3", 2).command, "calculate");
  assert.equal(Object.keys(vivaQuestions()).length, 3);
  assert.equal(seminarPrep().points.length, 3);
});

test("topic pages: quiz options keep every answer, guesses count as gaps, CSV escapes quotes", () => {
  const m = { q: "Q?", right: "R", wrong: ["A", "B", "C"] };
  assert.deepEqual([...options(m)].sort(), ["A", "B", "C", "R"]);
  assert.deepEqual(options(m, 3), options(m, 3), "stable for the same seed");
  assert.deepEqual(quizSummary([{ ok: true, guessed: true }, { ok: true }, { ok: false }]), { right: 2, of: 3, lucky: 1, solid: 1 });
  assert.equal(cardsCsv([['say "hi", now', "b\nc"]]), '"say ""hi"", now","b c"\n');
  assert.equal(speakMinutes("w ".repeat(260)), 2);
});

test("memory: the streak counts back from today or yesterday, and due reviews come lowest confidence first", () => {
  const t = day("2026-11-23"), k = (n) => dayKey(new Date(t.getTime() - n * 864e5));
  assert.equal(streakOf([k(0), k(1), k(2), k(4)], t), 3);
  assert.equal(streakOf([k(1), k(2)], t), 2);
  assert.equal(streakOf([k(3)], t), 0);
  const due = dueList({ "/a": { due: "2026-11-20", level: "strong" }, "/b": { due: "2026-11-22", level: "low" }, "/c": { due: "2026-12-01", level: "low" } }, "2026-11-23");
  assert.deepEqual(due.map((x) => x.path), ["/b", "/a"]);
});
