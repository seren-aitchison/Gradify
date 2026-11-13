// Calendar sync: read iCalendar (.ics) from Google Calendar, Apple Calendar, Outlook, a university timetable or a
// Moodle/Canvas/Blackboard calendar export, and write Gradify's plan back out as .ics. External events become busy
// time in the planner and are never moved; all-day events only block a day when they say the learner is away.
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

// a date or date-time value. UTC ("Z") is exact; a TZID or floating time is read as the learner's local time,
// which is right for the learner's own calendars (an approximation across time zones, said so in the docs).
export function parseDate(value, params = {}) {
  const v = String(value).trim();
  const m = v.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})?(Z)?)?$/);
  if (!m) return null;
  const [, y, mo, d, h, mi, s = "00", z] = m;
  const allDay = params.VALUE === "DATE" || h == null;
  if (allDay) return { date: new Date(+y, +mo - 1, +d), allDay: true };
  return { date: z ? new Date(Date.UTC(+y, +mo - 1, +d, +h, +mi, +s)) : new Date(+y, +mo - 1, +d, +h, +mi, +s), allDay: false };
}
function duration(v) {
  const m = String(v).match(/^([+-])?P(?:(\d+)W)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/);
  if (!m) return null;
  const [, sign, w = 0, d = 0, h = 0, mi = 0, s = 0] = m;
  return (sign === "-" ? -1 : 1) * ((+w * 7 + +d) * DAY + (+h * 3600 + +mi * 60 + +s) * 1000);
}

/** Every event in the calendar, with repeats expanded between `from` and `to` (Dates). */
export function parseICS(text, { from = new Date(Date.now() - DAY), to = new Date(Date.now() + 60 * DAY), max = 2000 } = {}) {
  const out = [];
  let ev = null;
  for (const l of lines(text)) {
    if (l.name === "BEGIN" && l.value.toUpperCase() === "VEVENT") { ev = { exdates: [] }; continue; }
    if (l.name === "END" && l.value.toUpperCase() === "VEVENT") { if (ev) expand(ev, from, to, out, max); ev = null; continue; }
    if (!ev) continue;
    if (l.name === "SUMMARY") ev.title = unescape(l.value);
    else if (l.name === "LOCATION") ev.location = unescape(l.value);
    else if (l.name === "UID") ev.uid = l.value;
    else if (l.name === "DTSTART") ev.start = parseDate(l.value, l.params);
    else if (l.name === "DTEND") ev.end = parseDate(l.value, l.params);
    else if (l.name === "DURATION") ev.duration = duration(l.value);
    else if (l.name === "RRULE") ev.rrule = Object.fromEntries(l.value.split(";").map((p) => p.split("=")));
    else if (l.name === "EXDATE") ev.exdates.push(...l.value.split(",").map((v) => parseDate(v, l.params)?.date?.getTime()).filter(Boolean));
    else if (l.name === "STATUS") ev.status = l.value.toUpperCase();
    else if (l.name === "TRANSP") ev.transparent = l.value.toUpperCase() === "TRANSPARENT";
  }
  return out.sort((a, b) => a.start - b.start);
}

function expand(ev, from, to, out, max) {
  if (!ev.start || ev.status === "CANCELLED") return;
  const s0 = ev.start.date.getTime();
  const len = ev.end ? ev.end.date.getTime() - s0 : ev.duration ?? (ev.start.allDay ? DAY : 36e5);
  const base = { uid: ev.uid || null, title: ev.title || "Busy", location: ev.location || null, allDay: ev.start.allDay, free: Boolean(ev.transparent) };
  const push = (t) => { if (out.length < max && t + len > from.getTime() && t < to.getTime() && !ev.exdates.includes(t)) out.push({ ...base, start: new Date(t), end: new Date(t + len) }); };
  const r = ev.rrule;
  if (!r) return push(s0);
  const freq = (r.FREQ || "").toUpperCase(), every = Math.max(1, parseInt(r.INTERVAL || "1", 10));
  const until = r.UNTIL ? parseDate(r.UNTIL)?.date.getTime() : Infinity, count = r.COUNT ? parseInt(r.COUNT, 10) : Infinity;
  const byday = r.BYDAY ? r.BYDAY.split(",").map((d) => WD[d.slice(-2)]).filter((d) => d != null) : null;
  const startDate = new Date(s0);
  let n = 0;
  // walk day by day (cheap for a two-month window), keeping the time of day of the first event
  for (let k = 0; k < 800 && n < count; k++) {
    const d = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + k, startDate.getHours(), startDate.getMinutes(), startDate.getSeconds());
    const t = d.getTime();
    if (t > until || t > to.getTime()) break;
    const days = Math.round((new Date(d.getFullYear(), d.getMonth(), d.getDate()) - new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())) / DAY);
    let hit = false;
    if (freq === "DAILY") hit = days % every === 0;
    else if (freq === "WEEKLY") hit = Math.floor(days / 7) % every === 0 && (byday ? byday.includes(d.getDay()) : d.getDay() === startDate.getDay());
    else if (freq === "MONTHLY") hit = d.getDate() === startDate.getDate() && ((d.getFullYear() - startDate.getFullYear()) * 12 + d.getMonth() - startDate.getMonth()) % every === 0;
    else if (freq === "YEARLY") hit = d.getDate() === startDate.getDate() && d.getMonth() === startDate.getMonth();
    else if (k === 0) hit = true;
    if (!hit) continue;
    n++;
    push(t);
  }
}

// exams and deadlines in an imported calendar (a Canvas or Moodle export, a timetable) become Gradify deadlines
const EXAM = /\b(exam|examination|test|assessment|quiz|mid-?term|finals?|osce|viva|mock)\b/i, DUE = /\b(due|deadline|submission|submit|hand-?in)\b/i;
export const kindOf = (title) => (DUE.test(title) ? "ext-deadline" : EXAM.test(title) ? "ext-exam" : "external");
// every kind of block that came from an outside calendar (a re-sync replaces exactly these)
export const IMPORTED = ["external", "away", "allday", "ext-exam", "ext-deadline"];
const key = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
/**
 * Events as Gradify calendar blocks (plan_blocks rows): busy time Gradify plans around and never moves.
 * cal: "external" (timed), "away" (an all-day "away" event: the whole day is unavailable), "allday" (shown, not busy).
 */
export function toBlocks(events) {
  const out = [];
  for (const e of events) {
    if (e.free && !e.allDay) continue;   // marked "free" in the source calendar
    if (e.allDay) {
      for (let t = new Date(e.start.getFullYear(), e.start.getMonth(), e.start.getDate()).getTime(); t < e.end.getTime(); t += DAY) {
        out.push({ day: key(new Date(t)), start_min: 0, end_min: 1440, title: e.title.slice(0, 120), cal: AWAY.test(e.title) ? "away" : "allday", auto: false, done: false });
        if (out.length > 3000) break;
      }
      continue;
    }
    // a timed event may cross midnight: one block per day it touches
    let s = e.start;
    while (s < e.end) {
      const dayEnd = new Date(s.getFullYear(), s.getMonth(), s.getDate() + 1);
      const end = e.end < dayEnd ? e.end : dayEnd;
      const sm = s.getHours() * 60 + s.getMinutes(), em = end.getTime() === dayEnd.getTime() ? 1440 : end.getHours() * 60 + end.getMinutes();
      if (em > sm) out.push({ day: key(s), start_min: sm, end_min: em, title: `${e.title}${e.location ? ` · ${e.location}` : ""}`.slice(0, 120), cal: kindOf(e.title), auto: false, done: false });
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

// webcal:// and Google's "secret address in iCal format" are plain https underneath
export const normaliseFeed = (url) => String(url || "").trim().replace(/^webcal:\/\//i, "https://");
export const isFeedUrl = (url) => { try { const u = new URL(normaliseFeed(url)); return u.protocol === "https:"; } catch { return false; } };
