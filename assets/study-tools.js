// The free study calculators on getgradify.com/tools/: pure functions (tested in tests/seo.test.mjs), and the code that
// runs each tool on its page. Everything happens in the browser; nothing typed into a tool is sent anywhere.

// ---------- UK degree classification ----------
export const CLASSES = [[70, "First-class honours (1st)"], [60, "Upper second (2:1)"], [50, "Lower second (2:2)"], [40, "Third-class honours (3rd)"], [0, "Below honours (fail)"]];
/** credit-weighted mean of [{ mark, credits }] (rows with no mark or credits are skipped), or null */
export function creditMean(rows) {
  let sum = 0, cr = 0;
  for (const r of rows) { const m = Number(r.mark), c = Number(r.credits); if (Number.isFinite(m) && r.mark !== "" && c > 0) { sum += m * c; cr += c; } }
  return cr ? sum / cr : null;
}
/** the classification for a final average, and whether it's within `margin` marks under the next boundary */
export function classify(avg, margin = 2) {
  const i = CLASSES.findIndex(([b]) => avg >= b);
  const above = i > 0 ? CLASSES[i - 1][0] : null;
  return { label: CLASSES[i][1], boundary: CLASSES[i][0], borderline: above !== null && above - avg <= margin && above - avg > 0, next: above };
}
/** final degree average from year 2 and year 3 means and the year 3 weight (0 to 100) */
export function degreeAverage(y2, y3, w3 = 60) {
  if (y3 === null) return null;
  if (y2 === null || w3 >= 100) return y3;
  return (y2 * (100 - w3) + y3 * w3) / 100;
}

/**
 * The degree tracker: where a degree stands part-way through. `rows` are [{ mark, credits, year: "2" | "3" }], `w3` the
 * final year's weight (0 to 100), `perYear` the credits in a full year (120 at most UK universities).
 *   years     [{ year, weight, avg, credits, done }]  done = share of that year's credits with a mark (0 to 1)
 *   average   the weighted average so far, over the years that have marks (null before any)
 *   complete  how much of the degree's weighting has marks (0 to 1)
 *   goals     [{ boundary, short, need, status }] the average needed on the credits still to come for each class:
 *             status "secured" (reached even with 0 on the rest), "reachable", "out" (needs more than 100%),
 *             "met" / "missed" once everything is marked
 */
export const GOALS = [[70, "First"], [60, "2:1"], [50, "2:2"], [40, "Third"]];
export function degreeTracker(rows, w3 = 60, perYear = 120) {
  const wt = { 2: w3 >= 100 ? 0 : (100 - w3) / 100, 3: w3 >= 100 ? 1 : w3 / 100 };
  const years = [2, 3].map((y) => {
    let sum = 0, cr = 0;
    for (const r of rows) { const m = Number(r.mark), c = Number(r.credits); if (String(r.year) === String(y) && r.mark !== "" && r.mark != null && Number.isFinite(m) && c > 0) { sum += m * c; cr += c; } }
    const avg = cr ? sum / cr : null;
    return { year: y, weight: wt[y], avg, credits: cr, done: Math.min(cr, perYear) / perYear };
  });
  const counted = years.filter((y) => y.weight > 0);
  const marked = counted.filter((y) => y.avg !== null);
  const wSum = marked.reduce((a, y) => a + y.weight, 0);
  const average = wSum ? marked.reduce((a, y) => a + y.weight * y.avg, 0) / wSum : null;
  const complete = counted.reduce((a, y) => a + y.weight * y.done, 0);
  // points already banked towards the final average, and how much weight is still to be marked
  const banked = counted.reduce((a, y) => a + (y.avg === null ? 0 : y.weight * y.avg * y.done), 0);
  const rest = counted.reduce((a, y) => a + y.weight * (1 - y.done), 0);
  const goals = GOALS.map(([boundary, short]) => {
    if (rest < 1e-9) return { boundary, short, need: null, status: average !== null && average >= boundary ? "met" : "missed" };
    const need = (boundary - banked) / rest;
    return { boundary, short, need, status: need <= 0 ? "secured" : need > 100 ? "out" : "reachable" };
  });
  return { years, average, complete, goals };
}

/**
 * Degree intelligence: what the numbers mean and what to do next. Deterministic (the maths is degreeTracker), so every
 * statement can be checked; estimates are labelled as estimates. Rows may also have a `name` and, for work not marked
 * yet (credits but no mark), a `due` date ("YYYY-MM-DD").
 *   cls        the class of the average so far ({ boundary, short })
 *   headline   one sentence: where you stand
 *   up / keep  the next class up and the current class: { short, boundary, need, status } (null when not relevant)
 *   projection { avg, short, basis } if the rest of your work matches your most recent year (an estimate), or null
 *              when that's no different from the average so far
 *   priorities upcoming modules ranked by impact × urgency: [{ name, share, days, due, score, minutes, perTen, reason }]
 *              (perTen: how much 10 more marks on that piece adds to the final average)
 *   unlisted   share of the degree (%) still to come that isn't in the list
 *   insights   [{ kind: "risk"|"chance"|"trend"|"weak"|"border"|"gap", text }]
 *   next       the next best action: { text, why, priority } (priority is one of `priorities`, or null)
 */
export function degreeIntel(rows, w3 = 60, today = new Date(), perYear = 120) {
  const t = degreeTracker(rows, w3, perYear);
  if (t.average === null) return { t, cls: null, headline: "", up: null, keep: null, projection: null, priorities: [], unlisted: 0, insights: [], next: null };
  const wt = (y) => t.years.find((x) => x.year === Number(y))?.weight ?? 0;
  const c = classify(t.average), cls = { boundary: c.boundary, short: SHORT_CLASS[c.boundary] };
  const goal = (b) => t.goals.find((g) => g.boundary === b) || null;
  const up = c.boundary < 70 ? goal(c.next ?? 40) : null, keep = c.boundary >= 40 ? goal(c.boundary) : null;
  const banked = t.years.reduce((a, y) => a + (y.avg === null ? 0 : y.weight * y.avg * y.done), 0);
  const rest = 1 - t.complete;
  // an estimate: the rest of the degree at the average of the most recent year with marks
  const recent = [...t.years].reverse().find((y) => y.avg !== null && y.weight > 0);
  const projection = rest > 1e-9 && recent ? (() => { const avg = banked + rest * recent.avg; return Math.abs(avg - t.average) < 0.5 ? null : { avg, short: SHORT_CLASS[classify(avg).boundary], basis: recent.year === 3 ? "final-year" : "year 2" }; })() : null;

  // the modules still to come, ranked by how much of the degree they carry and how soon they're due
  const day0 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  const target = up && up.status === "reachable" ? up : keep && keep.status === "reachable" ? keep : null;
  const upcoming = rows.filter((r) => (r.mark === "" || r.mark == null) && Number(r.credits) > 0 && wt(r.year) > 0).map((r, i) => {
    const share = wt(r.year) * Number(r.credits) / perYear;
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(r.due || "");
    const days = m ? Math.round((Date.UTC(+m[1], +m[2] - 1, +m[3]) - day0) / 864e5) : null;
    const urgency = days === null ? 1 : days < 0 ? 3 : days <= 7 ? 3 : days <= 14 ? 2 : days <= 42 ? 1.4 : 1;
    const minutes = days === null ? 30 : days <= 7 ? 90 : days <= 14 ? 60 : 45;
    return { name: String(r.name || "").trim() || `Module ${i + 1} (year ${r.year === "3" ? "final" : r.year})`, share: share * 100, days, due: r.due || "", score: share * 100 * urgency, minutes, perTen: share * 10 };
  }).sort((a, b) => b.score - a.score);
  for (const [i, p] of upcoming.entries()) {
    const when = p.days === null ? "" : p.days < 0 ? ` It was due ${-p.days} day${p.days === -1 ? "" : "s"} ago.` : p.days === 0 ? " It's due today." : p.days === 1 ? " It's due tomorrow." : ` It's due in ${p.days} days.`;
    const aim = target && i === 0 ? ` For a ${target.short}, you need ${Math.ceil(target.need * 10) / 10}% across everything left, this included.` : "";
    p.reason = `Worth ${Math.round(p.share * 10) / 10}% of your whole degree${i === 0 && upcoming.length > 1 ? ", your biggest lever right now" : ""}: every extra 10 marks here adds ${Math.round(p.perTen * 100) / 100} to your final average.${when}${aim}`;
  }
  const listed = upcoming.reduce((a, p) => a + p.share, 0);
  const unlisted = Math.max(0, rest * 100 - listed);

  const f1 = (n) => Math.round(n * 10) / 10;
  const insights = [];
  if (keep && keep.status === "reachable" && keep.need > t.average + 0.5) insights.push({ kind: "risk", text: `Holding your ${cls.short} needs ${f1(keep.need)}% across what's left, above your ${f1(t.average)}% average so far. This is the one to protect.` });
  if (up && up.status === "reachable") insights.push({ kind: "chance", text: up.need <= t.average + 5 ? `A ${up.short} is within reach: you need ${f1(up.need)}% across what's left, close to your current ${f1(t.average)}%.` : `A ${up.short} is still possible, but needs ${f1(up.need)}% across what's left, ${f1(up.need - t.average)} points above your average so far.` });
  if (up && up.status === "out") insights.push({ kind: "gap", text: `A ${up.short} is no longer reachable on these numbers, so put your effort into making your ${cls.short} safe.` });
  if (c.borderline) insights.push({ kind: "border", text: `You're ${f1(c.next - t.average)} marks under the ${c.next}% boundary. Many universities look again at borderline marks, often by how many of your final-year credits are in the higher class. Check your regulations.` });
  const y2 = t.years.find((y) => y.year === 2), y3 = t.years.find((y) => y.year === 3);
  if (y2?.avg != null && y3?.avg != null && y2.weight > 0) {
    const d = y3.avg - y2.avg;
    if (d >= 2) insights.push({ kind: "trend", text: `Your final-year marks are ${f1(d)} points above year 2, and the final year carries ${Math.round(y3.weight * 100)}% of your degree. You're heading the right way.` });
    if (d <= -2) insights.push({ kind: "risk", text: `Your final-year marks are ${f1(-d)} points below year 2, and the final year carries ${Math.round(y3.weight * 100)}% of your degree. Worth acting on now.` });
  }
  const marked = rows.filter((r) => r.mark !== "" && r.mark != null && Number(r.credits) > 0 && wt(r.year) > 0);
  const low = marked.map((r) => ({ name: String(r.name || "").trim(), mark: Number(r.mark) })).sort((a, b) => a.mark - b.mark)[0];
  if (low && marked.length > 2 && low.mark < t.average - 8) insights.push({ kind: "weak", text: `Your lowest mark is ${low.name ? `${low.name} (${f1(low.mark)}%)` : `${f1(low.mark)}%`}. Reread its feedback before your next assessment in that area; it's the cheapest improvement you can make.` });
  if (unlisted > 0.5) insights.push({ kind: "gap", text: `${f1(unlisted)}% of your degree is still to come but isn't in your list. Add those modules with their credits and due dates (leave the mark blank) for sharper priorities.` });

  let headline;
  if (t.complete >= 1 - 1e-9) headline = `Your degree is fully marked: ${f1(t.average)}%, a ${cls.short}.`;
  else if (c.boundary < 40) headline = `You're below the 40% pass mark so far. A Third needs ${f1(goal(40).need)}% across what's left.`;
  else if (up && up.status === "reachable" && up.need <= t.average + 5) headline = `You're on track for a ${cls.short}, and a ${up.short} is within reach.`;
  else if (keep && keep.status === "reachable" && keep.need > t.average + 0.5) headline = `You're on a ${cls.short} for now, but holding it needs a step up.`;
  else headline = `You're on track for a ${cls.short}.`;

  const top = upcoming[0] || null;
  const next = top
    ? { text: `Spend ${top.minutes} minutes on ${top.name} today.`, why: top.reason, priority: top }
    : { text: "Add the modules you still have to do.", why: "Give each one its credits and due date and leave the mark blank. Gradify will rank them by how much they move your degree and tell you where to start.", priority: null };
  return { t, cls, headline, up, keep, projection, priorities: upcoming.slice(0, 3), unlisted, insights, next };
}
const SHORT_CLASS = { 70: "First", 60: "2:1", 50: "2:2", 40: "Third", 0: "fail" };

// ---------- what you need in the final ----------
/** the final exam mark needed to reach `target`, given your current mark and the final's weight (all %) */
export function neededOnFinal(current, weight, target) {
  const w = weight / 100;
  if (!(w > 0 && w <= 1)) return null;
  return (target - current * (1 - w)) / w;
}

// ---------- weighted grade ----------
/** [{ score, weight }] → { avg (over the weight entered), done (total weight entered), contribution (points banked) } */
export function weighted(rows) {
  let pts = 0, w = 0;
  for (const r of rows) { const s = Number(r.score), x = Number(r.weight); if (r.score !== "" && Number.isFinite(s) && x > 0) { pts += s * x; w += x; } }
  return w ? { avg: pts / w, done: w, contribution: pts / 100 } : null;
}

// ---------- GPA (US 4.0 scale) ----------
export const GPA_POINTS = { "A+": 4, A: 4, "A-": 3.7, "B+": 3.3, B: 3, "B-": 2.7, "C+": 2.3, C: 2, "C-": 1.7, "D+": 1.3, D: 1, "D-": 0.7, F: 0 };
export function gpa(rows) {
  let pts = 0, cr = 0;
  for (const r of rows) { const p = GPA_POINTS[r.grade], c = Number(r.credits); if (p !== undefined && c > 0) { pts += p * c; cr += c; } }
  return cr ? pts / cr : null;
}

// ---------- exam countdown ----------
const DAY = 864e5;
const midnight = (d) => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
/** whole days from `now` to the exam day, study days left (excluding `restDays` per week), and hours available */
export function countdown(exam, now = new Date(), hoursPerDay = 3, restDays = 1) {
  const days = Math.round((midnight(exam) - midnight(now)) / DAY);
  if (!(days >= 0)) return { days, studyDays: 0, hours: 0, weeks: 0 };
  const studyDays = Math.max(0, days - Math.floor(days / 7) * restDays);
  return { days, studyDays, hours: Math.round(studyDays * hoursPerDay), weeks: Math.floor(days / 7) };
}

// ---------- spaced repetition schedule ----------
export const INTERVALS = [1, 3, 7, 14, 30, 60];
/** review dates after first learning on `start`, by expanding intervals, up to and including `exam` (Date objects) */
export function reviewDates(start, exam = null, intervals = INTERVALS) {
  const s = midnight(start), out = [];
  for (const d of intervals) { const t = new Date(s.getTime() + d * DAY); if (exam && t > midnight(exam)) break; out.push(t); }
  if (exam) { const e = new Date(midnight(exam).getTime() - DAY); if (e > s && !out.some((d) => +d === +e)) out.push(e); }
  return out.sort((a, b) => a - b);
}
const ymd = (d) => `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
/** an iCalendar file with one all-day event per review */
export function ics(topic, dates, stamp = new Date()) {
  const clean = String(topic || "Revision").replace(/[\r\n,;\\]/g, " ").slice(0, 80);
  const ev = dates.map((d, i) => ["BEGIN:VEVENT", `UID:gradify-${ymd(d)}-${i}@getgradify.com`, `DTSTAMP:${stamp.toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "")}`, `DTSTART;VALUE=DATE:${ymd(d)}`, `SUMMARY:Review: ${clean} (${i + 1} of ${dates.length})`, "DESCRIPTION:Test yourself from memory first\\, then check. Free spaced repetition schedules: search GetGradify or visit getgradify.com", "END:VEVENT"].join("\r\n"));
  return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Gradify//Spaced repetition//EN", "CALSCALE:GREGORIAN", ...ev, "END:VCALENDAR", ""].join("\r\n");
}

// ---------- on the page (shared by assets/tools-plan.js and assets/tools-write.js) ----------
export const fmt = (n, dp = 1) => (Math.round(n * 10 ** dp) / 10 ** dp).toLocaleString("en-GB");
export const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
export const longDay = (d) => d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
export function download(name, text, type) {
  const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([text], { type })); a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  import("./seo.js").then((m) => m.act("export")).catch(() => {});
}
const KEY = (id) => `gradify.tool.${id}`;
export const save = (id, v) => { try { localStorage.setItem(KEY(id), JSON.stringify(v)); } catch { /* private mode */ } };
export const load = (id) => { try { return JSON.parse(localStorage.getItem(KEY(id))); } catch { return null; } };
/** a tool's fixed inputs as { name: value }, and a helper to read one as a number */
export const fields = (root) => Object.fromEntries([...root.querySelectorAll("[name]")].filter((el) => !el.closest(".row")).map((el) => [el.name, el.type === "checkbox" ? el.checked : el.value]));
export const num = (root, n) => Number(root.querySelector(`[name="${n}"]`)?.value);
/** a fixed-field tool: restore saved values, run on every change, save */
export function formTool(root, id, run) {
  const s = load(id); if (s) for (const [k, v] of Object.entries(s)) { const el = root.querySelector(`[name="${k}"]`); if (el && !el.closest(".row")) { if (el.type === "checkbox") el.checked = v; else el.value = v; } }
  const go = () => { run(fields(root)); save(id, fields(root)); };
  root.addEventListener("input", go); root.addEventListener("change", go); go();
}
/** the next step after a result: one contextual link under it (cross-tool loops) */
export function setNext(root, html) {
  let el = root.querySelector(".next-action");
  if (!el) { el = document.createElement("p"); el.className = "next-action"; root.querySelector(".result")?.after(el); }
  el.innerHTML = html ? `<b>Next:</b> ${html}` : ""; el.hidden = !html;
}
export const NOTES = '<a href="/app.html#/new">turn your lecture notes into checked flashcards</a> (free, no account)';

/** repeating rows (module mark + credits, assessment + weight, grade + credits, topics …) */
export function rowsTool(root, id, makeRow, read, compute) {
  const list = root.querySelector(".rows"), add = (v) => { list.insertAdjacentHTML("beforeend", makeRow()); if (v) list.lastElementChild.querySelectorAll("[name]").forEach((el) => { if (v[el.name] !== undefined) { if (el.type === "checkbox") el.checked = v[el.name]; else el.value = v[el.name]; } }); };
  root.loadRows = (rows) => { list.innerHTML = ""; (rows.length ? rows : [{}, {}, {}]).forEach((r) => add(r)); };
  const saved = load(id);
  if (saved?.length) saved.forEach((v) => add(v)); else for (let i = 0; i < 4; i++) add();
  const run = () => { const rows = [...list.children].map(read); save(id, rows); compute(rows); };
  root.addEventListener("input", run); root.addEventListener("change", run);
  root.addEventListener("click", (e) => {
    if (e.target.closest("[data-add]")) { add(); run(); }
    const d = e.target.closest("[data-del]"); if (d) { d.closest(".row").remove(); run(); }
  });
  run();
}
export const val = (r) => Object.fromEntries([...r.querySelectorAll("[name]")].map((el) => [el.name, el.type === "checkbox" ? el.checked : el.value]));
export const del = '<button type="button" class="icon" data-del aria-label="Remove this row">✕</button>';

const SHORT = { 70: "First", 60: "2:1", 50: "2:2", 40: "Third", 0: "Below honours" };
const svg = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const ICON = {
  tick: svg('<path d="M5 12.5 10 17 19 7"/>'), cross: svg('<path d="M6 6l12 12M18 6 6 18"/>'),
  target: svg('<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".8" fill="currentColor"/>'),
  // the Gradify "G": the arc from the logo
  g: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22.9 10.9A8.6 8.6 0 1 0 24.6 16H16.4"/></svg>',
  spark: svg('<path d="M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9z"/><path d="M18.5 16.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/>'),
  risk: svg('<path d="M12 3.5 21 19H3z"/><path d="M12 10v4M12 16.8v.2"/>'), chance: svg('<path d="M7 17 17 7M9 7h8v8"/>'),
  trend: svg('<path d="M3.5 16.5 9 11l4 4 7.5-7.5"/><path d="M15 7.5h5.5V13"/>'), weak: svg('<path d="M4 5.5h6a2 2 0 0 1 2 2V19a2 2 0 0 0-2-2H4zM20 5.5h-6a2 2 0 0 0-2 2V19a2 2 0 0 1 2-2h6z"/>'),
  border: svg('<path d="M12 4v16M5 8h14M7 8l-3 6h6zM17 8l-3 6h6z"/>'), gap: svg('<circle cx="12" cy="12" r="8.5"/><path d="M12 8v8M8 12h8"/>'),
  cal: svg('<rect x="4" y="5" width="16" height="15" rx="3"/><path d="M4 10h16M9 3v4M15 3v4"/>'), cards: svg('<rect x="3.5" y="7" width="13" height="13" rx="3"/><path d="M8 4h9.5a3 3 0 0 1 3 3v9.5"/>'),
};

const TOOLS = {
  degree(root) {
    const out = root.querySelector(".result"), w = root.querySelector("[name=w3]"), live = root.querySelector("[data-live]"), sum = root.querySelector("[data-sum]");
    const row = () => `<div class="row mod"><div class="f-name"><label>Module</label><input name="name" type="text" maxlength="60" autocomplete="off" placeholder="e.g. Dissertation"></div><div class="f-mark"><label>Mark %</label><input name="mark" type="number" min="0" max="100" step="0.1" inputmode="decimal" placeholder="–" aria-describedby="mark-help"></div><div class="f-cr"><label>Credits</label><input name="credits" type="number" min="0" step="5" value="20" inputmode="numeric"></div><div class="f-yr"><label>Year</label><select name="year"><option value="2">Year 2</option><option value="3">Final</option></select></div><div class="f-due"><label>Due (if not marked)</label><input name="due" type="date"></div>${del}</div>`;
    let intel = null;
    const pct1 = (n) => `${fmt(n)}%`;
    const dueText = (p) => p.days === null ? "No due date" : p.days < 0 ? `${-p.days} day${p.days === -1 ? "" : "s"} overdue` : p.days === 0 ? "Due today" : p.days === 1 ? "Due tomorrow" : `Due in ${p.days} days`;
    const sessions = (p) => { if (!(p?.days > 1)) return []; const [y, m, d] = p.due.split("-").map(Number); return reviewDates(new Date(), new Date(y, m - 1, d)); };
    const ring = (frac, label, cls = "") => { const C = 2 * Math.PI * 22; return `<svg class="ring ${cls}" viewBox="0 0 54 54" aria-hidden="true"><circle cx="27" cy="27" r="22" class="ring-bg"/><circle cx="27" cy="27" r="22" class="ring-fg" stroke-dasharray="${(C * frac).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 27 27)"/><text x="27" y="32" text-anchor="middle">${label}</text></svg>`; };
    rowsTool(root, "degree", row, val, (rows) => {
      intel = degreeIntel(rows, Number(w.value));
      const t = intel.t;
      const n = rows.filter((r) => r.mark !== "" && Number(r.credits) > 0).length, todo = rows.filter((r) => r.mark === "" && Number(r.credits) > 0).length;
      if (sum) sum.textContent = n || todo ? `${n} marked${todo ? ` · ${todo} to come` : ""}` : "Add your marks";
      if (t.average === null) {
        out.innerHTML = `<div class="dash-empty"><span class="sq grad">${ICON.g}</span><b>Start with one module mark</b><span>Gradify shows where your degree stands, what's at risk, and exactly what to work on next.</span><button type="button" class="dash-cta" data-open-sheet>Add a module</button></div>`;
        root.dataset.summary = ""; if (live) live.textContent = ""; setNext(root, ""); return;
      }
      const { cls, next } = intel, pct = Math.round(t.complete * 100);
      const summary = `${intel.headline} Average so far ${pct1(t.average)}, ${pct}% of the degree marked. Next: ${next.text}`;
      root.dataset.summary = summary; if (live) live.textContent = summary;
      setNext(root, "");
      const goal = (g) => {
        const [mark, text] = { secured: [ICON.tick, "Secured"], met: [ICON.tick, "Achieved"], out: [ICON.cross, "Out of reach"], missed: [ICON.cross, "Not reached"], reachable: [ICON.target, `Need ${pct1(g.need)}`] }[g.status];
        return `<div class="goal c${g.boundary} ${g.status}"><span class="goal-top"><span class="goal-name">${g.short}</span><span class="goal-mark">${mark}</span></span><span class="goal-need">${text}</span><small>${g.boundary}% boundary</small></div>`;
      };
      const top = next.priority, cal = sessions(top);
      const prio = intel.priorities.map((p, i) => `<li class="prio-item"><span class="sq n${i}">${i + 1}</span><div class="prio-text"><b>${esc(p.name)}</b><span class="prio-meta">${fmt(p.share)}% of degree · ${dueText(p)} · ${p.minutes} min today</span><p>${esc(p.reason)}</p></div>${sessions(p).length ? `<button type="button" class="chip" data-ics="${i}" aria-label="Add revision sessions for ${esc(p.name)} to your calendar">${ICON.cal}<span>Plan</span></button>` : ""}</li>`).join("");
      out.innerHTML = `<section class="hero c${cls.boundary}">
          <div class="hero-top"><span class="hero-kicker"><span class="hero-g">${ICON.g}</span>Your degree so far</span><span class="pill">${cls.short}</span></div>
          <div class="hero-main"><span class="hero-num">${fmt(t.average)}<small>%</small></span><span class="hero-ring">${ring(t.complete, `${pct}%`, "on-dark")}<small>marked</small></span></div>
          <div class="hero-bar" role="img" aria-label="${pct}% of your degree is marked"><span style="width:${pct}%"></span></div>
          <p class="hero-line">${esc(intel.headline)}</p>
          ${intel.projection ? `<p class="hero-est">Estimate: if the rest goes like your ${intel.projection.basis} so far, you'd finish on about ${pct1(intel.projection.avg)}, a ${intel.projection.short}.</p>` : ""}
        </section>
        <section class="nba"><span class="sq grad">${ICON.spark}</span><div class="nba-text"><span class="kicker">Your next best action</span><b>${esc(next.text)}</b><p>${esc(next.why)}</p>
          <div class="nba-actions">${cal.length ? `<button type="button" class="act" data-ics="0">${ICON.cal}<span>Add ${cal.length} revision sessions to my calendar</span></button>` : ""}${top ? `<a class="act soft" href="/app.html#/new">${ICON.cards}<span>Turn my ${esc(top.name)} notes into flashcards</span></a>` : `<button type="button" class="act" data-open-sheet>${ICON.gap}<span>Add a module still to come</span></button>`}</div></div></section>
        ${prio ? `<h3 class="dash-h">Priorities</h3><p class="dash-sub">Ranked by how much each one moves your degree, and how soon it's due.</p><ol class="prio">${prio}</ol>` : ""}
        ${intel.insights.length ? `<h3 class="dash-h">What this means</h3><ul class="insights">${intel.insights.map((i) => `<li class="ins ${i.kind}"><span class="sq">${ICON[i.kind]}</span><p>${esc(i.text)}</p></li>`).join("")}</ul>` : ""}
        <h3 class="dash-h">Goals</h3><p class="dash-sub">The average you need across the rest of your degree.</p>
        <div class="goals">${t.goals.map(goal).join("")}</div>
        <h3 class="dash-h">Years</h3>
        <div class="years">${t.years.filter((y) => y.weight > 0).map((y) => `<div class="year-row">${ring(y.done, y.year === 3 ? "F" : String(y.year))}<span class="year-avg"><b>${y.avg === null ? "–" : pct1(y.avg)}</b>${y.year === 3 ? "Final year" : "Year 2"} average</span><span class="year-meta">${fmt(y.credits, 0)} / 120 credits marked<br>${fmt(y.weight * 100, 0)}% of your degree</span></div>`).join("")}</div>`;
    });
    w.addEventListener("change", () => root.dispatchEvent(new Event("input")));
    // "Plan": revision sessions from tomorrow up to the due date, spaced out, as a calendar file
    out.addEventListener("click", (e) => {
      const b = e.target.closest("[data-ics]"); if (!b || !intel) return;
      const p = intel.priorities[Number(b.dataset.ics)]; if (!p) return;
      const dates = sessions(p); if (!dates.length) return;
      download(`gradify-${p.name.replace(/[^\w-]+/g, "-").toLowerCase()}-sessions.ics`, ics(p.name, dates), "text/calendar");
    });
  },
  needed(root) {
    const out = root.querySelector(".result"), f = (n) => Number(root.querySelector(`[name=${n}]`).value);
    const run = () => {
      const need = neededOnFinal(f("current"), f("weight"), f("target"));
      if (need === null || !Number.isFinite(need)) { out.textContent = "Enter the final's weight (more than 0%)."; return; }
      setNext(root, need > 85 ? `that's a stretch. <a href="/tools/cram-planner/">Make a triage plan with the cram planner</a> and ${NOTES}.` : need > 60 ? `<a href="/tools/exam-countdown/">count your real revision hours</a>, then ${NOTES}.` : `bank it early: <a href="/tools/spaced-repetition-schedule/">schedule spaced reviews</a>.`);
      out.innerHTML = need <= 0 ? `<span class="big">0%</span>You've already reached ${f("target")}%, even with a zero on the final.` : need > 100 ? `<span class="big">${fmt(need)}%</span>That's more than 100%, so ${f("target")}% isn't reachable through the final alone. The highest overall you can reach is ${fmt(f("current") * (1 - f("weight") / 100) + f("weight"))}%.` : `<span class="big">${fmt(need)}%</span>is what you need on the final to finish on ${f("target")}%.`;
      save("needed", { current: f("current"), weight: f("weight"), target: f("target") });
    };
    const s = load("needed"); if (s) for (const k in s) root.querySelector(`[name=${k}]`).value = s[k];
    root.addEventListener("input", run); run();
  },
  weighted(root) {
    const out = root.querySelector(".result");
    const row = () => `<div class="row two"><div><label>Score %</label><input name="score" type="number" min="0" max="100" step="0.1" inputmode="decimal"></div><div><label>Weight %</label><input name="weight" type="number" min="0" max="100" step="1" inputmode="numeric"></div>${del}</div>`;
    rowsTool(root, "weighted", row, val, (rows) => {
      const r = weighted(rows);
      setNext(root, r && r.done < 100 ? `<a href="/tools/final-grade-calculator/">see what you need on what's left</a>.` : "");
      out.innerHTML = r ? `<span class="big">${fmt(r.avg)}%</span>average across the ${fmt(r.done, 0)}% of the module you've entered.<br><small>Banked so far: ${fmt(r.contribution)} of the 100 marks available.${r.done < 100 ? ` ${fmt(100 - r.done, 0)}% of the module is still to come.` : ""}</small>` : "Enter a score and its weight.";
    });
  },
  gpa(root) {
    const out = root.querySelector(".result");
    const opts = Object.keys(GPA_POINTS).map((g) => `<option>${g}</option>`).join("");
    const row = () => `<div class="row two"><div><label>Grade</label><select name="grade"><option value="">Grade</option>${opts}</select></div><div><label>Credits</label><input name="credits" type="number" min="0" step="0.5" value="3" inputmode="decimal"></div>${del}</div>`;
    rowsTool(root, "gpa", row, val, (rows) => { const g = gpa(rows); out.innerHTML = g === null ? "Choose a grade for at least one course." : `<span class="big">${g.toFixed(2)}</span>GPA on a 4.0 scale`; });
  },
  countdown(root) {
    const out = root.querySelector(".result"), q = (n) => root.querySelector(`[name=${n}]`), embed = root.querySelector("[data-embed]");
    const K = root.dataset.key || "countdown", s = load(K); if (s) for (const k in s) if (q(k)) q(k).value = s[k];
    if (!q("exam").value) q("exam").value = new Date(Date.now() + 42 * DAY).toISOString().slice(0, 10);
    const run = () => {
      const c = countdown(new Date(`${q("exam").value}T00:00`), new Date(), Number(q("hours").value), Number(q("rest").value));
      const name = q("label").value || "My exam";
      setNext(root, c.days >= 0 && c.days <= 7 ? `<a href="/tools/cram-planner/">turn the hours you have into a triage plan</a>.` : `<a href="/tools/spaced-repetition-schedule/">schedule spaced reviews for each topic</a> and ${NOTES}.`);
      out.innerHTML = c.days < 0 ? "That date has passed." : `<span class="big">${c.days} days</span>until ${esc(name)}. That's ${c.studyDays} study days and about <b>${c.hours} hours</b> of revision at ${q("hours").value} hours a day. Divide them between your topics, and keep the last week for past papers.`;
      embed.value = `<iframe src="https://getgradify.com/tools/exam-countdown/embed.html?date=${q("exam").value}&label=${encodeURIComponent(name)}" title="Exam countdown" width="320" height="170" style="border:0;border-radius:14px" loading="lazy"></iframe><p style="font:12px sans-serif">Exam countdown by <a href="https://getgradify.com/tools/exam-countdown/">Gradify</a></p>`;
      save(K, { exam: q("exam").value, label: q("label").value, hours: q("hours").value, rest: q("rest").value });
      return { c, name };
    };
    root.addEventListener("input", run); run();
    root.querySelector("[data-copy-embed]").addEventListener("click", async (e) => { try { await navigator.clipboard.writeText(embed.value); e.target.textContent = "Copied"; } catch { embed.select(); } });
    root.querySelector("[data-card]").addEventListener("click", () => { const { c, name } = run(); storyCard(c.days, name); });
  },
  spaced(root) {
    const out = root.querySelector(".result"), q = (n) => root.querySelector(`[name=${n}]`);
    if (!q("start").value) q("start").value = new Date().toISOString().slice(0, 10);
    let dates = [];
    const run = () => {
      const start = new Date(`${q("start").value}T00:00`), exam = q("exam").value ? new Date(`${q("exam").value}T00:00`) : null;
      if (isNaN(start)) { out.textContent = "Choose the day you first learn the topic."; return; }
      dates = reviewDates(start, exam);
      setNext(root, `${NOTES}, and Gradify schedules every card for you.`);
      out.innerHTML = `<b>Review ${esc(q("topic").value || "this topic")} on:</b><ol>${dates.map((d) => `<li>${longDay(d)}</li>`).join("")}</ol>`;
    };
    root.addEventListener("input", run); run();
    root.querySelector("[data-ics]").addEventListener("click", () => download("gradify-reviews.ics", ics(q("topic").value, dates), "text/calendar"));
  },
};

/** a 1080×1920 story image of the countdown, with a small getgradify.com credit, for Instagram, TikTok or Snapchat */
function storyCard(days, name) {
  const c = document.createElement("canvas"); c.width = 1080; c.height = 1920;
  const g = c.getContext("2d"), grad = g.createLinearGradient(0, 0, 1080, 1920);
  grad.addColorStop(0, "#4641ff"); grad.addColorStop(.4, "#f055dd"); grad.addColorStop(.75, "#ff5600"); grad.addColorStop(1, "#ffc002");
  g.fillStyle = "#0b0b0b"; g.fillRect(0, 0, 1080, 1920);
  g.fillStyle = grad; g.globalAlpha = .9; g.beginPath(); g.arc(540, 820, 400, 0, Math.PI * 2); g.fill(); g.globalAlpha = 1;
  g.fillStyle = "#fff"; g.textAlign = "center";
  g.font = "700 300px Geist, system-ui, sans-serif"; g.fillText(String(Math.max(0, days)), 540, 900);
  g.font = "600 64px Geist, system-ui, sans-serif"; g.fillText(days === 1 ? "day to go" : "days to go", 540, 1360);
  g.font = "500 56px Geist, system-ui, sans-serif"; g.fillText(String(name).slice(0, 30), 540, 1460);
  g.font = "500 36px Geist, system-ui, sans-serif"; g.globalAlpha = .7; g.fillText("getgradify.com", 540, 1820);
  c.toBlob((b) => { const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = "exam-countdown.png"; a.click(); });
}

export function mount(root) { TOOLS[root.dataset.tool]?.(root); }
