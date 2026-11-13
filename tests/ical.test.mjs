import { test } from "node:test";
import assert from "node:assert/strict";
import { parseICS, toBlocks, toICS, kindOf, normaliseFeed, isFeedUrl } from "../kit/intel/ical.js";
import { planDay, INTEL_DEFAULTS } from "../kit/intel/schedule.js";

const from = new Date(2026, 10, 9), to = new Date(2026, 11, 7);   // 9 Nov – 7 Dec 2026, local time
const cal = (...events) => `BEGIN:VCALENDAR\r\nVERSION:2.0\r\n${events.join("\r\n")}\r\nEND:VCALENDAR\r\n`;
const ev = (lines) => `BEGIN:VEVENT\r\n${lines.join("\r\n")}\r\nEND:VEVENT`;

test("a weekly lecture repeats on its days, skips an excluded date, and keeps its time", () => {
  const text = cal(ev(["UID:lec1", "SUMMARY:Physiology lecture", "LOCATION:Room 2", "DTSTART;TZID=Europe/London:20261110T100000", "DTEND;TZID=Europe/London:20261110T110000",
    "RRULE:FREQ=WEEKLY;BYDAY=TU,TH;UNTIL=20261204T235959Z", "EXDATE;TZID=Europe/London:20261119T100000"]));
  const events = parseICS(text, { from, to });
  const days = events.map((e) => e.start.getDate());
  assert.deepEqual(days, [10, 12, 17, 24, 26, 1, 3], "Tuesdays and Thursdays, without 19 Nov");
  assert.equal(events[0].start.getHours(), 10);
  const blocks = toBlocks(events);
  assert.equal(blocks[0].title, "Physiology lecture · Room 2");
  assert.deepEqual([blocks[0].start_min, blocks[0].end_min, blocks[0].cal], [600, 660, "external"]);
});

test("folded lines, escapes, UTC times and durations are read correctly", () => {
  const text = cal(ev(["SUMMARY:Shift\\, then gym", " (long one)", "DTSTART:20261115T180000Z", "DURATION:PT2H30M"]));
  const [e] = parseICS(text, { from, to });
  assert.equal(e.title, "Shift, then gym(long one)");
  assert.equal(e.end - e.start, 2.5 * 36e5);
});

test("all-day events block the day only when they say the learner is away", () => {
  const text = cal(ev(["SUMMARY:Away in Edinburgh", "DTSTART;VALUE=DATE:20261121", "DTEND;VALUE=DATE:20261123"]), ev(["SUMMARY:Mum's birthday", "DTSTART;VALUE=DATE:20261125", "DTEND;VALUE=DATE:20261126"]));
  const blocks = toBlocks(parseICS(text, { from, to }));
  assert.deepEqual(blocks.map((b) => [b.day, b.cal]), [["2026-11-21", "away"], ["2026-11-22", "away"], ["2026-11-25", "allday"]]);
  // the planner finds no time on an away day, and ignores the birthday
  const items = [{ id: "a", title: "Review", mins: 20, weight: "light" }];
  assert.equal(planDay({ items, day: "2026-11-21", minutes: 20, intel: INTEL_DEFAULTS, existing: blocks, now: from.getTime() }).blocks.length, 0);
  assert.equal(planDay({ items, day: "2026-11-25", minutes: 20, intel: INTEL_DEFAULTS, existing: blocks, now: from.getTime() }).blocks.length, 1);
});

test("cancelled and 'free' events don't take up time; a late event is split at midnight", () => {
  const text = cal(ev(["SUMMARY:Cancelled seminar", "STATUS:CANCELLED", "DTSTART:20261116T090000", "DTEND:20261116T100000"]),
    ev(["SUMMARY:Optional drop-in", "TRANSP:TRANSPARENT", "DTSTART:20261116T120000", "DTEND:20261116T130000"]),
    ev(["SUMMARY:Night shift", "DTSTART:20261117T220000", "DTEND:20261118T060000"]));
  const blocks = toBlocks(parseICS(text, { from, to }));
  assert.deepEqual(blocks.map((b) => [b.day, b.start_min, b.end_min]), [["2026-11-17", 1320, 1440], ["2026-11-18", 0, 360]]);
});

test("exams and deadlines in an imported calendar are recognised", () => {
  assert.equal(kindOf("BIO101 Final exam"), "ext-exam");
  assert.equal(kindOf("Chemistry assignment due"), "ext-deadline");
  assert.equal(kindOf("Lecture"), "external");
});

test("Gradify's plan exports as a valid calendar, without the imported events", () => {
  const ics = toICS([
    { id: "b1", day: "2026-11-20", start_min: 1080, end_min: 1100, title: "Review cards; cardiac", cal: "study", auto: true },
    { id: "b2", day: "2026-12-10", start_min: 540, end_min: 600, title: "Biology", cal: "exam" },
    { id: "x", day: "2026-11-20", start_min: 600, end_min: 660, title: "Lecture", cal: "external" },
  ], { now: new Date(Date.UTC(2026, 10, 13)) });
  assert.match(ics, /^BEGIN:VCALENDAR\r\n/);
  assert.match(ics, /DTSTART:20261120T180000\r\nDTEND:20261120T182000/);
  assert.match(ics, /SUMMARY:Review cards\\; cardiac/);
  assert.match(ics, /SUMMARY:Exam: Biology/);
  assert.doesNotMatch(ics, /Lecture/);
  // round trip: Gradify can read its own export
  assert.equal(parseICS(ics, { from, to: new Date(2026, 11, 31) }).length, 2);
});

test("calendar links: webcal becomes https, and only https links are accepted", () => {
  assert.equal(normaliseFeed("webcal://p01-calendars.icloud.com/x.ics"), "https://p01-calendars.icloud.com/x.ics");
  assert.ok(isFeedUrl("webcal://example.com/a.ics"));
  assert.ok(!isFeedUrl("http://example.com/a.ics"));
  assert.ok(!isFeedUrl("not a url"));
});
