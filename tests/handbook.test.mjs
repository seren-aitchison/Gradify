import { test } from "node:test";
import assert from "node:assert/strict";
import { parseHandbook, datesIn, yearIn, creditsIn, toRow } from "../kit/data/handbook.js";

const today = new Date(2026, 10, 24);   // 24 November 2026
const HANDBOOK = `School of Chemistry Undergraduate Handbook 2026-27
Contents
CHEM2001 Organic Chemistry II .......... 12
CHEM2004 Physical Chemistry .......... 14

Year 2 modules
CHEM2001  Organic Chemistry II  20 credits  Level 5  Semester 1
Module convenor: Dr A Smith
Coursework report (30%) due 14 November 2026
Examination 70%, January exam period, 12 January 2027

CHEM2004  Physical Chemistry  20 credits
Assessment: Problem sheets 20%; Exam 80% (May 2027)

Final year
CHEM3990 Research Project
Credits: 40
Dissertation 100% Submission deadline: 23/04/2027

MATH 3012 Statistics for Scientists 10 ECTS
Exam 100%
CHEM2001 assessment: Coursework report 30% due 14 November 2026; Examination 70% on 12 January 2027
`;

test("dates: UK day/month order, ISO, written months, and the next one for a date with no year", () => {
  assert.deepEqual(datesIn("Due 23/04/2027", today), ["2027-04-23"]);
  assert.deepEqual(datesIn("on 2027-01-12", today), ["2027-01-12"]);
  assert.deepEqual(datesIn("12th January 2027 and Jan 20, 2027", today), ["2027-01-12", "2027-01-20"]);
  assert.deepEqual(datesIn("hand in by 9 March", today), ["2027-03-09"]);       // no year: the next 9 March
  assert.deepEqual(datesIn("31/02/2027", today), []);                            // not a date
});

test("years, credits and levels", () => {
  assert.equal(yearIn("Level 5"), "2"); assert.equal(yearIn("FHEQ Level 6"), "3"); assert.equal(yearIn("Final year"), "3");
  assert.equal(yearIn("Year 2 modules"), "2"); assert.equal(yearIn("Stage three"), "3"); assert.equal(yearIn("Level 4"), "1");
  assert.equal(yearIn("Organic Chemistry"), "");
  assert.deepEqual(creditsIn("20 credits"), { credits: 20, ects: false });
  assert.deepEqual(creditsIn("Credits: 40"), { credits: 40, ects: false });
  assert.deepEqual(creditsIn("7.5 ECTS"), { credits: 15, ects: true });
  assert.equal(creditsIn("Room 20"), null);
});

test("a handbook becomes modules with credits, year, assessments and the next deadline", () => {
  const { modules, notes } = parseHandbook(HANDBOOK, { today });
  assert.deepEqual(modules.map((m) => m.code), ["CHEM2001", "CHEM2004", "CHEM3990", "MATH3012"], "each module once, contents and repeats merged");
  const [org, phys, proj, stats] = modules;
  assert.equal(org.name, "Organic Chemistry II"); assert.equal(org.credits, 20); assert.equal(org.year, "2");
  assert.deepEqual(org.assessments.map((a) => [a.name, a.weight]).slice(0, 2), [["Coursework report", 30], ["Examination", 70]]);
  assert.equal(org.due, "2027-01-12", "14 November has passed, so the next deadline is the January exam");
  assert.equal(phys.year, "2", "from the section heading above it");
  assert.deepEqual(phys.assessments.map((a) => [a.name, a.weight]), [["Problem sheets", 20], ["Exam", 80]]);
  assert.equal(proj.name, "Research Project"); assert.equal(proj.credits, 40); assert.equal(proj.year, "3"); assert.equal(proj.due, "2027-04-23");
  assert.equal(stats.credits, 20, "10 ECTS = 20 UK credits"); assert.equal(stats.year, "3");
  assert.ok(org.sure && proj.sure);
  assert.ok(notes.some((n) => /ECTS/.test(n)));
});

test("guesses are flagged, and an empty or scanned handbook says why nothing was found", () => {
  const { modules, notes } = parseHandbook("PSY3011 Cognitive Neuroscience 20 credits\nExam 100%", { today });
  assert.equal(modules[0].year, "3"); assert.equal(modules[0].yearGuessed, true); assert.equal(modules[0].sure, false);
  assert.ok(notes.some((n) => /guessed from its code/.test(n)));
  const none = parseHandbook("", { today });
  assert.equal(none.modules.length, 0); assert.ok(/No modules were found/.test(none.notes[0]));
});

test("a reviewed module becomes a tracker row with the mark left blank", () => {
  assert.deepEqual(toRow({ name: "Research Project", credits: 40, year: "3", due: "2027-04-23" }), { name: "Research Project", mark: "", credits: "40", year: "3", due: "2027-04-23" });
  assert.equal(toRow({ name: "X", credits: null, year: "", due: "" }).year, "2");
});
