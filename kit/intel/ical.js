// Calendar files: read an iCalendar (.ics) file exported from Google Calendar, Apple Calendar, Outlook, a university
// timetable or a Moodle/Canvas/Blackboard calendar, and write Gradify's plan back out as .ics. Files only: Gradify
// doesn't take calendar links, because a feed link works like a password. Imported events become busy time the
// planner never moves; all-day events only block a day when they say the learner is away.
// Pure, so Node can test it (tests/ical.test.mjs).
const DAY = 864e5;
const WD = { SU: 0, MO: 1, TU: 2, WE: 3, TH: 4, FR: 5, SA: 6 };
const AWAY = /\b(away|holiday|holidays|trip|travel|travelling|vacation|annual leave|leave|off|out of office|ooo|abroad|festival|wedding)\b/i;

// RFC 5545: unfold continuation lines, then split into name;params:value
function lines(text) {
  return String(text || "").replace(/\r\n/g, "\n").replace(/\n[ \t]/g, "").split("\n").filter(Boolean).map((l) => {
    const i = l.indexOf(":"); if (i < 0) return null;
    const [name, ...params] = l.slice(0, i).split(";");
    return { name: name.toUpperCase(), params: Object.fromEntries(params.map((p) => { const [k, v = ""] = p.split("="); return [k.toUpperCase(), v.replace(/^"|"$/g, "")]; })), value: l.slice(i + 1) };
  }).filter(Boolean);
}
const unescape = (s) => String(s).replace(/\\n/gi, " ").replace(/\\([,;\\])/g, "$1").trim();

// Time zones. A date-time is kept as its wall-clock parts plus its zone: "UTC" for a "Z" time, an IANA zone for a
// TZID (Outlook's Windows names are mapped), or "local" for a floating time (read in the learner's own zone). Turning
// the parts into an instant uses Intl, so daylight-saving changes come out right in any zone.
const WINDOWS_TZ = {
  "gmt standard time": "Europe/London", "greenwich standard time": "Atlantic/Reykjavik", "utc": "UTC", "coordinated universal time": "UTC",
  "w. europe standard time": "Europe/Berlin", "romance standard time": "Europe/Paris", "central europe standard time": "Europe/Budapest",
  "central european standard time": "Europe/Warsaw", "e. europe standard time": "Europe/Chisinau", "gtb standard time": "Europe/Athens",
  "fle standard time": "Europe/Helsinki", "eastern standard time": "America/New_York", "central standard time": "America/Chicago",
  "mountain standard time": "America/Denver", "pacific standard time": "America/Los_Angeles", "india standard time": "Asia/Kolkata",
  "china standard time": "Asia/Shanghai", "singapore standard time": "Asia/Singapore", "tokyo standard time": "Asia/Tokyo",
  "aus eastern standard time": "Australia/Sydney", "new zealand standard time": "Pacific/Auckland", "arabian standard time": "Asia/Dubai",
};
const fmts = new Map();
function zoneOk(tz) {
  if (fmts.has(tz)) return fmts.get(tz);
  let f = null;
  try { f = new Intl.DateTimeFormat("en-GB", { timeZone: tz, hourCycle: "h23", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" }); } catch { f = null; }
  fmts.set(tz, f); return f;
}
export function zoneOf(tzid) {
  if (!tzid) return "local";
  const raw = String(tzid).replace(/^\/+/, "").trim(), mapped = WINDOWS_TZ[raw.toLowerCase()] || raw;
  return zoneOk(mapped) ? mapped : "local";
}
// how far the zone's wall clock is ahead of UTC at instant t
function offset(t, tz) {
  const p = Object.fromEntries(zoneOk(tz).formatToParts(new Date(t)).map((x) => [x.type, x.value]));
  return Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour % 24, +p.minute, +p.second) - Math.floor(t / 1000) * 1000;
}
/** The instant for wall-clock parts in a zone ("local", "UTC" or an IANA name). */
export function instant(w, zone) {
  if (zone === "local") return new Date(w.y, w.mo - 1, w.d, w.h, w.mi, w.s).getTime();
  const guess = Date.UTC(w.y, w.mo - 1, w.d, w.h, w.mi, w.s);
  if (zone === "UTC") return guess;
  const t1 = guess - offset(guess, zone), o2 = offset(t1, zone);
  return guess - o2;
}

// a date or date-time value
export function parseDate(value, params = {}) {
  const v = String(value).trim();
  const m = v.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})?(Z)?)?$/);
  if (!m) return null;
  const [, y, mo, d, h, mi, s = "00", z] = m;
  const allDay = params.VALUE === "DATE" || h == null;
  if (allDay) return { date: new Date(+y, +mo - 1, +d), allDay: true, wall: { y: +y, mo: +mo, d: +d, h: 0, mi: 0, s: 0 }, zone: "local" };
  const wall = { y: +y, mo: +mo, d: +d, h: +h, mi: +mi, s: +s }, zone = z ? "UTC" : zoneOf(params.TZID);
  return { date: new Date(instant(wall, zone)), allDay: false, wall, zone };
}
function duration(v) {
  const m = String(v).match(/^([+-])?P(?:(\d+)W)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/);
  if (!m) return null;
  const [, sign, w = 0, d = 0, h = 0, mi = 0, s = 0] = m;
  return (sign === "-" ? -1 : 1) * ((+w * 7 + +d) * DAY + (+h * 3600 + +mi * 60 + +s) * 1000);
}

/**
 * Every event in the calendar, with repeats expanded between `from` and `to` (Dates). A changed occurrence of a
 * repeating event (RECURRENCE-ID) replaces the original one. Each event is { uid, title, location, categories, allDay,
 * free, start, end }; callers decide what to keep (see toBlocks).
 */
export function parseICS(text, { from = new Date(Date.now() - DAY), to = new Date(Date.now() + 60 * DAY), max = 2000 } = {}) {
  const raw = [];
  let ev = null, depth = 0;
  for (const l of lines(text)) {
    if (l.name === "BEGIN" && l.value.toUpperCase() === "VEVENT") { ev = { exdates: [] }; depth = 0; continue; }
    if (l.name === "END" && l.value.toUpperCase() === "VEVENT") { if (ev) raw.push(ev); ev = null; continue; }
    if (!ev) continue;
    // alarms inside an event have their own SUMMARY and DESCRIPTION: skip them
    if (l.name === "BEGIN") { depth++; continue; }
    if (l.name === "END") { depth = Math.max(0, depth - 1); continue; }
    if (depth) continue;
    if (l.name === "SUMMARY") ev.title = unescape(l.value);
    else if (l.name === "LOCATION") ev.location = unescape(l.value);
    else if (l.name === "CATEGORIES") ev.categories = l.value.split(",").map(unescape).filter(Boolean);
    else if (l.name === "UID") ev.uid = l.value;
    else if (l.name === "DTSTART") ev.start = parseDate(l.value, l.params);
    else if (l.name === "DTEND") ev.end = parseDate(l.value, l.params);
    else if (l.name === "DURATION") ev.duration = duration(l.value);
    else if (l.name === "RRULE") ev.rrule = Object.fromEntries(l.value.split(";").map((p) => p.split("=")));
    else if (l.name === "RECURRENCE-ID") ev.recurrenceId = parseDate(l.value, l.params)?.date?.getTime() ?? null;
    else if (l.name === "EXDATE") ev.exdates.push(...l.value.split(",").map((v) => parseDate(v, l.params)?.date?.getTime()).filter(Boolean));
    else if (l.name === "STATUS") ev.status = l.value.toUpperCase();
    else if (l.name === "TRANSP") ev.transparent = l.value.toUpperCase() === "TRANSPARENT";
  }
  // changed occurrences take the original's place
  const moved = new Map();
  for (const e of raw) if (e.uid && e.recurrenceId != null) { if (!moved.has(e.uid)) moved.set(e.uid, []); moved.get(e.uid).push(e.recurrenceId); }
  const out = [];
  for (const e of raw) {
    if (e.rrule && e.recurrenceId == null && moved.has(e.uid)) e.exdates.push(...moved.get(e.uid));
    expand(e, from, to, out, max);
  }
  return out.sort((a, b) => a.start - b.start);
}

// wall-clock date arithmetic, independent of the machine's own zone
const wallDay = (w, k) => { const d = new Date(Date.UTC(w.y, w.mo - 1, w.d + k)); return { ...w, y: d.getUTCFullYear(), mo: d.getUTCMonth() + 1, d: d.getUTCDate() }; };
const weekday = (w) => new Date(Date.UTC(w.y, w.mo - 1, w.d)).getUTCDay();

function expand(ev, from, to, out, max) {
  if (!ev.start || ev.status === "CANCELLED") return;
  const s0 = ev.start.date.getTime();
  const len = ev.end ? ev.end.date.getTime() - s0 : ev.duration ?? (ev.start.allDay ? DAY : 36e5);
  const base = { uid: ev.uid || null, title: ev.title || "Busy", location: ev.location || null, categories: ev.categories || [], allDay: ev.start.allDay, free: Boolean(ev.transparent) };
  const push = (t) => { if (out.length < max && t + Math.max(len, 1) > from.getTime() && t < to.getTime() && !ev.exdates.includes(t)) out.push({ ...base, start: new Date(t), end: new Date(t + len) }); };
  const r = ev.rrule;
  if (!r) return push(s0);
  const freq = (r.FREQ || "").toUpperCase(), every = Math.max(1, parseInt(r.INTERVAL || "1", 10));
  const until = r.UNTIL ? parseDate(r.UNTIL)?.date.getTime() : Infinity, count = r.COUNT ? parseInt(r.COUNT, 10) : Infinity;
  const byday = r.BYDAY ? r.BYDAY.split(",").map((d) => WD[d.slice(-2)]).filter((d) => d != null) : null;
  const w0 = ev.start.wall, zone = ev.start.zone, wd0 = weekday(w0);
  let n = 0;
  // walk day by day in the event's own time zone, keeping its wall-clock time of day (so 10:00 stays 10:00 across
  // a clock change); stop well past the window
  for (let k = 0; k < 2000 && n < count; k++) {
    const w = wallDay(w0, k), t = instant(w, zone);
    if (t > until || t > to.getTime()) break;
    let hit = false;
    if (freq === "DAILY") hit = k % every === 0;
    else if (freq === "WEEKLY") hit = Math.floor((k + ((wd0 + 6) % 7)) / 7) % every === 0 && (byday ? byday.includes(weekday(w)) : weekday(w) === wd0);
    else if (freq === "MONTHLY") hit = w.d === w0.d && ((w.y - w0.y) * 12 + w.mo - w0.mo) % every === 0;
    else if (freq === "YEARLY") hit = w.d === w0.d && w.mo === w0.mo && (w.y - w0.y) % every === 0;
    else if (k === 0) hit = true;
    if (!hit) continue;
    n++;
    push(t);
  }
}

// exams and deadlines in an imported calendar (a Canvas or Moodle export, a timetable). A keyword match is only a
// suggestion: the learner confirms each one before it's kept as an exam or deadline (never decided on a word alone).
const EXAM = /\b(exam|examination|test|assessment|quiz|mid-?term|finals?|osce|viva|mock)\b/i, DUE = /\b(due|deadline|submission|submit|hand-?in|closes)\b/i;
export const kindOf = (title) => (DUE.test(title) ? "ext-deadline" : EXAM.test(title) ? "ext-exam" : "external");
// every kind of block that came from an outside calendar
export const IMPORTED = ["external", "away", "allday", "ext-exam", "ext-deadline"];
const key = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
/** A stable id for one occurrence of an event, used by review screens to say which ones were confirmed. */
export const occurrence = (e) => `${e.uid || e.title}|${e.start.getTime()}`;

/** The events that might be exams or deadlines, for the learner to confirm. Ordinary events aren't listed. */
export function candidates(events) {
  const seen = new Set(), out = [];
  for (const e of events) {
    // Canvas marks assignments in the event's UID ("event-assignment-123"), whatever the title says
    const kind = kindOf(e.title) === "external" && /(^|[^a-z])assignment/i.test(e.uid || "") ? "ext-deadline" : kindOf(e.title);
    if (kind === "external") continue;
    const id = occurrence(e); if (seen.has(id)) continue; seen.add(id);
    out.push({ id, title: e.title.slice(0, 120), kind, start: e.start, allDay: e.allDay });
  }
  return out;
}

/**
 * Events as Gradify calendar blocks (plan_blocks rows): busy time Gradify plans around and never moves.
 * Only what planning needs is kept: start and end, labelled "Busy". An event's title is kept only when the learner
 * confirmed it as an exam or deadline (`confirmed`, a Map of occurrence id → "ext-exam" | "ext-deadline").
 * Locations, descriptions, attendees and categories are never kept. All-day events only become a block when they say
 * the learner is away (labelled "Away"); other all-day events are left out.
 */
export function toBlocks(events, { confirmed = new Map() } = {}) {
  const out = [];
  for (const e of events) {
    const kind = confirmed.get(occurrence(e)) || null;
    if (e.free && !e.allDay && !kind) continue;   // marked "free" in the source calendar
    if (e.allDay) {
      const away = AWAY.test(e.title);
      if (!away && !kind) continue;
      for (let t = new Date(e.start.getFullYear(), e.start.getMonth(), e.start.getDate()).getTime(); t < e.end.getTime(); t += DAY) {
        out.push({ day: key(new Date(t)), start_min: 0, end_min: 1440, title: kind ? e.title.slice(0, 120) : "Away", cal: kind || "away", auto: false, done: false });
        if (out.length > 3000) break;
      }
      continue;
    }
    // a timed event may cross midnight: one block per day it touches
    let s = e.start;
    const end = e.end > e.start ? e.end : new Date(e.start.getTime() + 36e5);
    while (s < end) {
      const dayEnd = new Date(s.getFullYear(), s.getMonth(), s.getDate() + 1);
      const stop = end < dayEnd ? end : dayEnd;
      const sm = s.getHours() * 60 + s.getMinutes(), em = stop.getTime() === dayEnd.getTime() ? 1440 : stop.getHours() * 60 + stop.getMinutes();
      if (em > sm) out.push({ day: key(s), start_min: sm, end_min: em, title: kind ? e.title.slice(0, 120) : "Busy", cal: kind || "external", auto: false, done: false });
      s = dayEnd;
    }
  }
  return out;
}

// ---------- export: Gradify's plan as .ics, for any calendar app ----------
const esc = (s) => String(s).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
const stamp = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const local = (day, min) => `${day.replace(/-/g, "")}T${String(Math.floor(min / 60)).padStart(2, "0")}${String(min % 60).padStart(2, "0")}00`;
export function toICS(blocks, { name = "Gradify plan", now = new Date() } = {}) {
  const fold = (l) => (l.length <= 74 ? l : l.match(/.{1,74}/g).join("\r\n "));
  const ev = blocks.filter((b) => !IMPORTED.includes(b.cal)).map((b) => [
    "BEGIN:VEVENT", `UID:${b.id || `${b.day}-${b.start_min}-${b.title}`.replace(/\W+/g, "")}@getgradify.com`, `DTSTAMP:${stamp(now)}`,
    b.end_min - b.start_min >= 1440 ? `DTSTART;VALUE=DATE:${b.day.replace(/-/g, "")}` : `DTSTART:${local(b.day, b.start_min)}`,
    b.end_min - b.start_min >= 1440 ? null : `DTEND:${local(b.day, b.end_min)}`,
    `SUMMARY:${esc(b.cal === "exam" ? `Exam: ${b.title}` : b.cal === "deadline" ? `Deadline: ${b.title}` : b.title)}`,
    `DESCRIPTION:${esc(b.auto ? "Planned by Gradify. Open getgradify.com/app.html to start." : "From your Gradify calendar.")}`,
    "END:VEVENT"].filter(Boolean).map(fold).join("\r\n"));
  return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Gradify//Smart Plan//EN", "CALSCALE:GREGORIAN", `X-WR-CALNAME:${esc(name)}`, ...ev, "END:VCALENDAR"].join("\r\n") + "\r\n";
}
