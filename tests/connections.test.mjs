// Degree tracker Connections (kit/data/connections.js): due dates from a calendar file, matched to modules, applied
// only when ticked, without touching marks.
import { test } from "node:test";
import assert from "node:assert/strict";
import { deadlinesFromIcs, matchModule, applyDeadlines } from "../kit/data/connections.js";

const cal = (...events) => `BEGIN:VCALENDAR\r\nVERSION:2.0\r\n${events.join("\r\n")}\r\nEND:VCALENDAR\r\n`;
const ev = (lines) => `BEGIN:VEVENT\r\n${lines.join("\r\n")}\r\nEND:VEVENT`;
const today = new Date(2026, 10, 24);
const rows = [
  { name: "Organic Chemistry", mark: "", credits: "20", year: "2", due: "" },
  { name: "CHEM2042 Spectroscopy", mark: "", credits: "20", year: "2", due: "2026-12-10" },
  { name: "Physical Chemistry", mark: "68", credits: "20", year: "2", due: "" },
];

// a Moodle export: course shortname in CATEGORIES; a Canvas export: course in [brackets]
const moodle = cal(
  ev(["UID:m1@moodle", "SUMMARY:Lab report 2 is due", "CATEGORIES:CHEM2042", "DTSTART:20261203T235900Z", "DTEND:20261203T235900Z"]),
  ev(["UID:m2@moodle", "SUMMARY:Weekly lecture", "CATEGORIES:CHEM2042", "DTSTART:20261125T100000Z", "DTEND:20261125T110000Z", "RRULE:FREQ=WEEKLY;COUNT=4"]),
  ev(["UID:m3@moodle", "SUMMARY:Old quiz closes", "DTSTART:20261001T100000Z", "DTEND:20261001T100000Z"]));
const canvas = cal(
  ev(["UID:event-assignment-4410", "SUMMARY:Synthesis essay [Organic Chemistry 2026-27]", "DTSTART;VALUE=DATE:20270115", "DTEND;VALUE=DATE:20270116"]),
  ev(["UID:c2@canvas", "SUMMARY:January exam [Organic Chemistry 2026-27]", "DTSTART:20270120T093000Z", "DTEND:20270120T113000Z"]),
  ev(["UID:c3@canvas", "SUMMARY:Essay due [History of Science]", "DTSTART:20270201T120000Z", "DTEND:20270201T120000Z"]));

test("a Moodle export: only upcoming deadlines are listed, matched by module code; lectures aren't", () => {
  const { items, notes } = deadlinesFromIcs(moodle, { today, rows });
  assert.equal(items.length, 1, "the past quiz and the lectures are left out");
  assert.deepEqual([items[0].title, items[0].kind, items[0].date, items[0].module], ["Lab report 2 is due", "deadline", "2026-12-03", 1]);
  assert.match(notes.join(" "), /4 other events/);
});

test("a Canvas export: matched by the bracketed course name; an unknown course is left for the student", () => {
  const { items } = deadlinesFromIcs(canvas, { today, rows });
  assert.deepEqual(items.map((i) => [i.kind, i.date, i.module]), [["deadline", "2027-01-15", 0], ["exam", "2027-01-20", 0], ["deadline", "2027-02-01", null]]);
  assert.equal(items[0].title, "Synthesis essay [Organic Chemistry 2026-27]", "a Canvas assignment is listed even without the word 'due'");
  assert.equal(items[0].time, null, "an all-day due date has no time");
});

test("module matching needs a clear winner", () => {
  assert.equal(matchModule({ title: "Essay [Organic Chemistry]" }, rows), 0);
  assert.equal(matchModule({ title: "Chemistry essay due" }, rows), null, "'chemistry' alone fits two modules");
  assert.equal(matchModule({ title: "Something", categories: ["CHEM 2042"] }, rows), 1);
  assert.equal(matchModule({ title: "Essay due" }, []), null);
});

test("an empty or irrelevant file says so plainly", () => {
  assert.match(deadlinesFromIcs(cal(), { today, rows }).notes[0], /no upcoming events/);
  const lectures = cal(ev(["SUMMARY:Lecture", "DTSTART:20261201T100000Z", "DTEND:20261201T110000Z"]));
  assert.match(deadlinesFromIcs(lectures, { today, rows }).notes[0], /none look like a deadline/);
});

test("applying ticked dates: earliest upcoming date wins, marked modules and every other field are untouched", () => {
  const { rows: out, updated, added, skipped } = applyDeadlines(rows, [
    { date: "2026-12-03", module: 1 },               // earlier than its 10 Dec: replaces it
    { date: "2027-01-20", module: 0 },
    { date: "2027-01-10", module: 0 },               // earlier still: wins
    { date: "2026-12-01", module: 2 },               // already marked: skipped
    { date: "2027-02-01", module: "new", name: "History of Science", year: "3" },
    { date: "2027-01-28", module: "new", name: "history of science" },
    { date: "nonsense", module: 0 },
  ], { today });
  assert.deepEqual(out.map((r) => r.due), ["2027-01-10", "2026-12-03", "", "2027-01-28"]);
  assert.deepEqual(out.slice(0, 3).map((r) => [r.name, r.mark, r.credits, r.year]), rows.map((r) => [r.name, r.mark, r.credits, r.year]), "names, marks, credits and years never change");
  assert.deepEqual(out[3], { name: "History of Science", mark: "", credits: "", year: "3", due: "2027-01-28" });
  assert.deepEqual([updated, added, skipped], [2, 1, 2]);
  assert.equal(rows[1].due, "2026-12-10", "the original rows aren't modified");
});

test("a past due date on a module is replaced by an upcoming one; a later one doesn't replace an upcoming one", () => {
  const r = [{ name: "A", mark: "", due: "2026-10-01" }, { name: "B", mark: "", due: "2026-12-01" }];
  const { rows: out } = applyDeadlines(r, [{ date: "2027-01-05", module: 0 }, { date: "2027-01-05", module: 1 }], { today });
  assert.deepEqual(out.map((x) => x.due), ["2027-01-05", "2026-12-01"]);
});

test("re-importing the same file marks dates already in the tracker", () => {
  const after = applyDeadlines(rows, [{ date: "2026-12-03", module: 1 }], { today }).rows;
  const { items } = deadlinesFromIcs(moodle, { today, rows: after });
  assert.equal(items[0].dup, true);
});
