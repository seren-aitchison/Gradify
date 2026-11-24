// Connections for the degree tracker: due dates from a calendar file (an .ics export from a university timetable,
// Moodle, Canvas, Blackboard or any calendar app). The file is read in the browser; nothing is uploaded or stored
// except the due dates the student ticks on the review screen, which go into their tracker rows on this device.
// No calendar links, tokens or sign-ins: a feed link works like a password, so Gradify takes files only.
// Deterministic and pure, so Node can test it (tests/connections.test.mjs). A keyword match is only a suggestion:
// nothing is ticked for the student.
import { parseICS, kindOf } from "../intel/ical.js";

const DAY = 864e5;
const STOP = new Set(["and", "the", "for", "with", "from", "into", "module", "modules", "year", "level", "part", "unit", "course",
  "assignment", "assessment", "coursework", "essay", "report", "exam", "examination", "test", "quiz", "deadline", "due", "submission",
  "submit", "closes", "final", "mid", "term", "semester", "week", "group", "online", "practical", "lab", "lecture", "seminar", "tutorial"]);
const CODE = /\b([A-Z]{2,5}\s?-?\d{3,5}[A-Z]?)\b/;
const words = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9 ]+/g, " ").split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w) && !/^\d+$/.test(w));
const ymd = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/**
 * The tracker row a calendar event belongs to, or null when it isn't clear. A module code in the title or
 * categories that appears in a row's name wins; otherwise the row sharing the most distinctive words with the title,
 * its [bracketed course name] (Canvas) and its categories (Moodle), provided no other row ties with it.
 */
export function matchModule(ev, rows) {
  const names = rows.map((r) => String(r?.name || "").trim());
  const hay = [ev.title, ...(ev.categories || [])].join(" ");
  const code = hay.match(CODE)?.[1]?.replace(/[\s-]/g, "").toUpperCase();
  if (code) { const i = names.findIndex((n) => n.replace(/[\s-]/g, "").toUpperCase().includes(code)); if (i >= 0) return i; }
  const have = new Set(words(hay));
  let best = -1, bestScore = 0, tie = false;
  names.forEach((n, i) => {
    if (!n) return;
    const ws = words(n); if (!ws.length) return;
    const score = ws.filter((w) => have.has(w)).length / ws.length;
    if (score > bestScore) { best = i; bestScore = score; tie = false; } else if (score === bestScore && score > 0) tie = true;
  });
  return best >= 0 && bestScore >= 0.5 && !tie ? best : null;
}

/**
 * The possible deadlines and exams in a calendar file, upcoming only, for the review screen. Each:
 * { id, title, kind ("deadline" | "exam"), date (yyyy-mm-dd), time ("HH:MM" or null), module (row index or null),
 *   dup (that row already has this due date), marked (that row already has a mark) }.
 * `notes` says, in plain words, what was left out and why.
 */
export function deadlinesFromIcs(text, { today = new Date(), rows = [], horizonDays = 400 } = {}) {
  const t0 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const events = parseICS(text, { from: t0, to: new Date(t0.getTime() + horizonDays * DAY), max: 3000 });
  const seen = new Set(), items = [];
  let other = 0;
  for (const e of events) {
    // Canvas marks assignments in the event's UID ("event-assignment-123"), whatever the title says
    const k = /(^|[^a-z])assignment/i.test(e.uid || "") && kindOf(e.title) === "external" ? "ext-deadline" : kindOf(e.title);
    if (k === "external") { other++; continue; }
    const date = ymd(e.start), key = `${e.title.toLowerCase()}|${date}`;
    if (seen.has(key)) continue; seen.add(key);
    const module = matchModule(e, rows), row = module == null ? null : rows[module];
    items.push({
      id: `${items.length}`, title: e.title.slice(0, 120), kind: k === "ext-exam" ? "exam" : "deadline", date,
      time: e.allDay ? null : `${String(e.start.getHours()).padStart(2, "0")}:${String(e.start.getMinutes()).padStart(2, "0")}`,
      module, dup: Boolean(row && row.due === date), marked: Boolean(row && String(row.mark ?? "").trim() !== ""),
    });
  }
  const notes = [];
  if (!events.length) notes.push("There are no upcoming events in this file. Check it's the right calendar, and that its export covers the coming months.");
  else if (!items.length) notes.push(`Gradify found ${events.length} upcoming event${events.length === 1 ? "" : "s"}, but none look like a deadline or an exam. Add due dates by hand on the Modules page, or import your module handbook.`);
  if (items.length && other) notes.push(`${other} other event${other === 1 ? "" : "s"}, such as lectures, ${other === 1 ? "isn't" : "aren't"} listed, because ${other === 1 ? "it doesn't" : "they don't"} look like ${other === 1 ? "a deadline" : "deadlines"}.`);
  return { items, notes, total: events.length };
}

/**
 * Put the ticked due dates into the tracker rows. `picks`: [{ date, module (row index) }] or
 * [{ date, module: "new", name, year }]. A module keeps its earliest upcoming due date. Marks, credits, names and
 * every other row are never changed; a module that already has a mark is skipped (its work is done).
 * Returns { rows, updated, added, skipped }.
 */
export function applyDeadlines(rows, picks, { today = new Date() } = {}) {
  const t = ymd(today), out = rows.map((r) => ({ ...r }));
  let added = 0, skipped = 0;
  const fresh = new Map(), changed = new Set();
  for (const p of picks) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(p.date || "")) { skipped++; continue; }
    if (p.module === "new") {
      const name = String(p.name || "").trim().slice(0, 60); if (!name) { skipped++; continue; }
      const k = name.toLowerCase();
      if (fresh.has(k)) { const r = out[fresh.get(k)]; if (p.date < r.due) r.due = p.date; continue; }
      out.push({ name, mark: "", credits: "", year: p.year === "3" ? "3" : "2", due: p.date });
      fresh.set(k, out.length - 1); added++; continue;
    }
    const r = out[p.module];
    if (!r) { skipped++; continue; }
    if (String(r.mark ?? "").trim() !== "") { skipped++; continue; }
    const cur = r.due && r.due >= t ? r.due : "";
    if (!cur || p.date < cur) { if (r.due !== p.date) { r.due = p.date; changed.add(p.module); } }
  }
  return { rows: out, updated: changed.size, added, skipped };
}
