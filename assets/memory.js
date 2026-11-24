// What a visitor's own browser remembers about their study on Gradify's free pages, with no account: the pages they
// used recently, tools they pinned, their study streak, and their confidence in each topic with the next review date.
// Nothing here leaves the browser. Every read and write survives blocked storage (private windows, previews).
const get = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? d; } catch { return d; } };
const set = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage blocked */ } };
const DAY = 864e5;
export const dayKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

// ---------- recently used pages ----------
export function remember(path, title, max = 8) {
  const list = get("gradify.recent", []).filter((x) => x.path !== path);
  list.unshift({ path, title: String(title).replace(/ · Gradify$/, "").slice(0, 90), at: Date.now() });
  set("gradify.recent", list.slice(0, max));
}
export const recent = () => get("gradify.recent", []);

// ---------- pinned tools ----------
export const pins = () => get("gradify.pins", []);
export function togglePin(path, title) {
  const list = pins(), has = list.some((x) => x.path === path);
  set("gradify.pins", has ? list.filter((x) => x.path !== path) : [{ path, title }, ...list].slice(0, 12));
  return !has;
}

// ---------- study streak: days on which the visitor did something (a quiz, a tool, a review) ----------
/** pure: the current streak from a list of day keys, counting today or, if today is empty, up to yesterday */
export function streakOf(days, today = new Date()) {
  const s = new Set(days); let n = 0, d = new Date(today);
  if (!s.has(dayKey(d))) d = new Date(d.getTime() - DAY);
  while (s.has(dayKey(d))) { n++; d = new Date(d.getTime() - DAY); }
  return n;
}
export function studied() { const days = get("gradify.days", []); const k = dayKey(); if (!days.includes(k)) set("gradify.days", [...days, k].slice(-400)); }
export const streak = () => streakOf(get("gradify.days", []));

// ---------- topic confidence and reviews ----------
// low → review tomorrow, medium → in 3 days, strong → in 7 days (a simple spaced schedule; the app itself uses FSRS)
export const GAP = { low: 1, medium: 3, strong: 7 };
export function rate(path, title, level, now = new Date()) {
  const all = get("gradify.topics", {});
  all[path] = { title, level, at: dayKey(now), due: dayKey(new Date(now.getTime() + GAP[level] * DAY)), reviewed: all[path]?.reviewed || false };
  set("gradify.topics", all);
}
export function markReviewed(path, title, on = true) {
  const all = get("gradify.topics", {});
  all[path] = { ...(all[path] || { title, level: null, at: dayKey(), due: null }), reviewed: on };
  set("gradify.topics", all); return on;
}
export const topics = () => get("gradify.topics", {});
/** pure: topics whose review is due on or before today, lowest confidence first */
export function dueList(all, today = dayKey()) {
  const rank = { low: 0, medium: 1, strong: 2 };
  return Object.entries(all).filter(([, t]) => t.due && t.due <= today).map(([path, t]) => ({ path, ...t })).sort((a, b) => (rank[a.level] ?? 3) - (rank[b.level] ?? 3));
}
export const due = () => dueList(topics());

/** "(2 due) Title" in the browser tab when reviews are due, so an open tab pulls the visitor back */
export function badgeTitle(doc = document) {
  const n = due().length, base = doc.title.replace(/^\(\d+ due\) /, "");
  doc.title = n ? `(${n} due) ${base}` : base;
}

/** the "pick up where you left off" strip: reviews due, low-confidence topics, recent pages and pinned tools */
export function resumeHtml(esc, here = "") {
  const d = due().slice(0, 3), r = recent().filter((x) => x.path !== here).slice(0, 4), p = pins().slice(0, 4), s = streak();
  if (!d.length && !r.length && !p.length) return "";
  const a = (x) => `<a href="${esc(x.path)}">${esc(x.title)}</a>`;
  return `<div class="resume">
    ${s > 1 ? `<p class="resume-streak">${s}-day study streak. Keep it going today.</p>` : ""}
    ${d.length ? `<p><b>Due for review:</b> ${d.map((x) => `${a(x)}${x.level === "low" ? " (you marked it low confidence: try the 3-question quiz first)" : ""}`).join(" · ")}</p>` : ""}
    ${p.length ? `<p><b>Pinned:</b> ${p.map(a).join(" · ")}</p>` : ""}
    ${r.length ? `<p><b>Pick up where you left off:</b> ${r.map(a).join(" · ")}</p>` : ""}
  </div>`;
}
