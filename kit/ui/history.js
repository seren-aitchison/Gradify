// Everything the learner has done in Gradify, newest first: what they viewed,
// studied, created and edited, in the study app and on every course page. The app's History screen
// (kit/app/history-view.js) filters it by activity, subject and date.
//
//   logEvent({ act: "viewed", href, title, kind: "lesson", subject: "Biology", where: "SciGradify · Biology" });
//   logEvent({ act: "studied", href: "#/study", title: "Flashcards", n: 24, unit: "cards" });   // n adds up
//
// The same thing done again soon after (the same act on the same place within half an hour) updates one entry
// instead of adding another, so a page opened ten times in a sitting is one line. The list helpers are pure
// (tests/history.test.mjs).
import * as LS from "../data/learner-state.js";
// Kept in the learner's record (kit/data/learner-state.js, kind "activity"), one entry per line, so it follows the
// learner to every device. A line done during a study session carries that session's id (session), so History can
// show what one sitting held.

export const ACTS = [["viewed", "Viewed"], ["studied", "Studied"], ["created", "Created"], ["edited", "Edited"]];
export const RANGES = [["all", "Any time"], ["today", "Today"], ["week", "Last 7 days"], ["month", "Last 30 days"]];
const LIMIT = 500, MERGE = 30 * 60e3, DAY = 864e5;

// ---------- pure ----------
/** add one event at the front; the same act on the same place within `merge` ms updates the latest entry */
export function addEvent(list = [], ev, { now = Date.now(), limit = LIMIT, merge = MERGE } = {}) {
  if (!ev?.href || !ev.act) return list;
  const i = list.findIndex((x) => x.href === ev.href && x.act === ev.act);
  const prev = i >= 0 && now - (list[i].t || 0) < merge ? list[i] : null;
  const row = { ...(prev || {}), ...ev, t: now };
  if (ev.n != null) row.n = (prev?.n || 0) + ev.n;
  for (const k of Object.keys(row)) if (row[k] == null || row[k] === "") delete row[k];
  const rest = prev ? list.filter((_, k) => k !== i) : list;
  return [row, ...rest].slice(0, limit);
}

const startOfDay = (t) => { const d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime(); };
/** the earliest time a date range starts at (0: any time) */
export function rangeStart(range, now = Date.now()) {
  if (range === "today") return startOfDay(now);
  if (range === "week") return startOfDay(now) - 6 * DAY;
  if (range === "month") return startOfDay(now) - 29 * DAY;
  return 0;
}
const norm = (s) => String(s || "").toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");
/** filter by activity, subject ("none": no subject), date range and words in the title or where it lives */
export function filterHistory(list = [], { act = "all", subject = "all", range = "all", q = "", now = Date.now() } = {}) {
  const from = rangeStart(range, now), words = norm(q).split(/\s+/).filter(Boolean);
  return list.filter((x) => (act === "all" || x.act === act)
    && (subject === "all" || (subject === "none" ? !x.subject : x.subject === subject))
    && (x.t || 0) >= from
    && words.every((w) => norm(`${x.title} ${x.where || ""} ${x.subject || ""}`).includes(w)));
}
/** the subjects in the list, most active first: [[subject, count]] */
export function subjectsOf(list = []) {
  const m = new Map();
  for (const x of list) if (x.subject) m.set(x.subject, (m.get(x.subject) || 0) + 1);
  return [...m].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}
/** group by day, newest first: [{ day, label: "Today" | "Yesterday" | "Monday 24 November", items }] */
export function groupByDay(list = [], now = Date.now()) {
  const today = startOfDay(now), out = [];
  for (const x of [...list].sort((a, b) => b.t - a.t)) {
    const day = startOfDay(x.t);
    let g = out.at(-1);
    if (!g || g.day !== day) {
      const label = day === today ? "Today" : day === today - DAY ? "Yesterday"
        : new Date(day).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", ...(new Date(day).getFullYear() !== new Date(now).getFullYear() ? { year: "numeric" } : {}) });
      out.push(g = { day, label, items: [] });
    }
    g.items.push(x);
  }
  return out;
}

// ---------- the learner's record ----------
export const history = () => LS.list("activity").map((e) => e.value);
const currentSession = () => { try { const s = JSON.parse(globalThis.localStorage?.getItem("gradify.session") || "null"); return s && s.i < s.steps?.length ? s.started || null : null; } catch { return null; } };
export function logEvent(ev, { now = Date.now() } = {}) {
  try {
    if (!ev?.href || !ev.act) return;
    const cur = history(), session = ev.session ?? currentSession();
    const row = addEvent(cur, session ? { ...ev, session } : ev, { now })[0];
    // the same act on the same place a moment ago is the same line: it keeps its id
    const prev = cur.find((x) => x.href === row.href && x.act === row.act && now - (x.t || 0) < MERGE);
    const id = prev?.id || `${now.toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
    LS.put("activity", id, { ...row, id });
  } catch { /* storage full or blocked */ }
}
export function clearHistory() { LS.batch((b) => { for (const e of LS.list("activity")) b.del("activity", e.key); }); }
export function onHistoryChange(f) { return LS.subscribe((kinds) => { if (!kinds || kinds.includes("activity")) f(); }); }
