import { test } from "node:test";
import assert from "node:assert/strict";
import { parseICS, toBlocks, toICS, kindOf, candidates, occurrence, zoneOf } from "../kit/intel/ical.js";
import { importIcsText, retiredIntel, readIcsFile, removeImported, MAX_ICS_BYTES } from "../kit/intel/calsync.js";
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
  assert.equal(events[0].start.toISOString(), "2026-11-10T10:00:00.000Z", "10:00 in London, wherever the learner is");
  const blocks = toBlocks(events);
  assert.equal(blocks[0].title, "Busy", "only busy time is kept, not the event's title");
  assert.ok(!JSON.stringify(blocks).includes("Room 2"), "never the location");
  const sm = events[0].start.getHours() * 60 + events[0].start.getMinutes();
  assert.deepEqual([blocks[0].start_min, blocks[0].end_min, blocks[0].cal], [sm, sm + 60, "external"]);
});

test("folded lines, escapes, UTC times and durations are read correctly", () => {
  const text = cal(ev(["SUMMARY:Shift\\, then gym", " (long one)", "DTSTART:20261115T180000Z", "DURATION:PT2H30M"]));
  const [e] = parseICS(text, { from, to });
  assert.equal(e.title, "Shift, then gym(long one)");
  assert.equal(e.end - e.start, 2.5 * 36e5);
});

test("all-day events block the day only when they say the learner is away; other all-day events aren't kept", () => {
  const text = cal(ev(["SUMMARY:Away in Edinburgh", "DTSTART;VALUE=DATE:20261121", "DTEND;VALUE=DATE:20261123"]), ev(["SUMMARY:Mum's birthday", "DTSTART;VALUE=DATE:20261125", "DTEND;VALUE=DATE:20261126"]));
  const blocks = toBlocks(parseICS(text, { from, to }));
  assert.deepEqual(blocks.map((b) => [b.day, b.cal, b.title]), [["2026-11-21", "away", "Away"], ["2026-11-22", "away", "Away"]]);
  assert.ok(!JSON.stringify(blocks).includes("Edinburgh") && !JSON.stringify(blocks).includes("birthday"));
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

// ---------- time zones, changed occurrences and what's kept (Stage 5) ----------
test("a repeating 10:00 London lecture stays at 10:00 across the October clock change", () => {
  const text = cal(ev(["UID:dst", "SUMMARY:Lecture", "DTSTART;TZID=Europe/London:20261020T100000", "DTEND;TZID=Europe/London:20261020T110000", "RRULE:FREQ=WEEKLY;COUNT=3"]));
  const events = parseICS(text, { from: new Date(Date.UTC(2026, 9, 1)), to: new Date(Date.UTC(2026, 11, 1)) });
  assert.deepEqual(events.map((e) => e.start.toISOString()), ["2026-10-20T09:00:00.000Z", "2026-10-27T10:00:00.000Z", "2026-11-03T10:00:00.000Z"]);
});

test("a time in another zone, and Outlook's Windows zone names, are converted exactly", () => {
  const ny = parseICS(cal(ev(["SUMMARY:Call", "DTSTART;TZID=America/New_York:20261110T090000", "DTEND;TZID=America/New_York:20261110T100000"])), { from, to });
  assert.equal(ny[0].start.toISOString(), "2026-11-10T14:00:00.000Z");
  assert.equal(zoneOf("GMT Standard Time"), "Europe/London");
  assert.equal(zoneOf("Not/AZone"), "local", "an unknown zone falls back to local time");
  const ol = parseICS(cal(ev(["SUMMARY:Seminar", 'DTSTART;TZID="GMT Standard Time":20260610T100000', 'DTEND;TZID="GMT Standard Time":20260610T110000'])), { from: new Date(Date.UTC(2026, 5, 1)), to: new Date(Date.UTC(2026, 6, 1)) });
  assert.equal(ol[0].start.toISOString(), "2026-06-10T09:00:00.000Z", "British Summer Time");
});

test("a changed occurrence replaces the original rather than appearing twice", () => {
  const text = cal(
    ev(["UID:wk", "SUMMARY:Tutorial", "DTSTART:20261110T100000Z", "DTEND:20261110T110000Z", "RRULE:FREQ=WEEKLY;COUNT=3"]),
    ev(["UID:wk", "RECURRENCE-ID:20261117T100000Z", "SUMMARY:Tutorial (moved)", "DTSTART:20261118T140000Z", "DTEND:20261118T150000Z"]));
  const got = parseICS(text, { from, to }).map((e) => e.start.toISOString());
  assert.deepEqual(got, ["2026-11-10T10:00:00.000Z", "2026-11-18T14:00:00.000Z", "2026-11-24T10:00:00.000Z"]);
});

test("possible exams and deadlines are suggestions; only confirmed ones keep their names", () => {
  const text = cal(
    ev(["UID:a1", "SUMMARY:Lab report due", "DTSTART:20261120T120000Z", "DTEND:20261120T120000Z", "BEGIN:VALARM", "SUMMARY:Reminder exam", "END:VALARM"]),
    ev(["UID:x1", "SUMMARY:Final exam", "LOCATION:Great Hall", "DTSTART:20261201T090000Z", "DTEND:20261201T110000Z"]),
    ev(["UID:l1", "SUMMARY:Lecture", "DTSTART:20261119T100000Z", "DTEND:20261119T110000Z"]));
  const events = parseICS(text, { from, to });
  const c = candidates(events);
  assert.deepEqual(c.map((x) => [x.title, x.kind]), [["Lab report due", "ext-deadline"], ["Final exam", "ext-exam"]], "an alarm's own text is ignored; a lecture isn't suggested");
  // nothing confirmed: everything is "Busy"
  assert.ok(toBlocks(events).every((b) => b.title === "Busy" && b.cal === "external"));
  // the learner confirms only the exam
  const exam = events.find((e) => e.title === "Final exam");
  const blocks = toBlocks(events, { confirmed: new Map([[occurrence(exam), "ext-exam"]]) });
  assert.deepEqual(blocks.filter((b) => b.cal === "ext-exam").map((b) => b.title), ["Final exam"]);
  assert.ok(!JSON.stringify(blocks).includes("Great Hall"));
  assert.ok(!JSON.stringify(blocks).includes("Lab report"), "an unconfirmed deadline stays Busy");
});

const memStore = () => { const blocks = []; let n = 0; return { blocks, async listBlocks(a, b) { return blocks.filter((x) => x.day >= a && x.day <= b); }, async saveBlock(x) { blocks.push({ ...x, id: x.id || `b${++n}` }); }, async deleteBlock(id) { const i = blocks.findIndex((x) => x.id === id); if (i >= 0) blocks.splice(i, 1); } }; };

test("importing the same file twice doesn't duplicate anything, and the learner's own blocks are kept", async () => {
  const store = memStore();
  await store.saveBlock({ day: "2026-11-20", start_min: 600, end_min: 660, title: "My revision", cal: "study" });
  const text = cal(ev(["UID:l", "SUMMARY:Lecture", "DTSTART:20261120T090000", "DTEND:20261120T100000"]));
  const now = new Date(2026, 10, 18).getTime();
  assert.equal((await importIcsText(store, text, { now })).added, 1);
  assert.equal((await importIcsText(store, text, { now })).added, 0);
  assert.equal(store.blocks.length, 2);
  assert.equal(await removeImported(store, { now }), 1);
  assert.deepEqual(store.blocks.map((b) => b.title), ["My revision"]);
});

test("files over 2 MB, and files that aren't calendars, are refused before parsing", async () => {
  await assert.rejects(readIcsFile({ size: MAX_ICS_BYTES + 1, text: async () => "" }), /too big/);
  await assert.rejects(readIcsFile({ size: 10, text: async () => "hello" }), /isn't a calendar/);
  assert.match(await readIcsFile({ size: 30, text: async () => "BEGIN:VCALENDAR\nEND:VCALENDAR" }), /VCALENDAR/);
});

test("saved calendar links are removed, keeping every other setting and recording only how many", () => {
  const intel = { weekday: [[540, 1020]], log: [{ a: 1 }], calendars: [{ name: "Uni", url: "https://calendar.google.com/calendar/ical/secret/basic.ics", ok: true }] };
  const next = retiredIntel(intel, Date.UTC(2026, 10, 24));
  assert.ok(!("calendars" in next));
  assert.deepEqual(next.weekday, intel.weekday);
  assert.deepEqual(next.log, intel.log);
  assert.deepEqual(next.calendars_retired, { at: "2026-11-24T00:00:00.000Z", count: 1, seen: false });
  assert.ok(!JSON.stringify(next).includes("secret"), "the link itself isn't copied anywhere");
  assert.equal(retiredIntel({ weekday: [] }), null, "nothing to do");
  assert.equal(retiredIntel(null), null);
  const seen = { calendars: [], calendars_retired: { at: "x", count: 2, seen: true } };
  assert.deepEqual(retiredIntel(seen), { calendars_retired: { at: "x", count: 2, seen: true } }, "an empty list is dropped without a new notice");
});

test("a Canvas assignment is suggested as a deadline even without the word 'due'", () => {
  const text = cal(ev(["UID:event-assignment-77", "SUMMARY:Synthesis essay [Organic Chemistry]", "DTSTART:20261125T235900Z", "DTEND:20261125T235900Z"]));
  assert.deepEqual(candidates(parseICS(text, { from, to })).map((c) => c.kind), ["ext-deadline"]);
});
