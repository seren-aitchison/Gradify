// Gradify LifeOS preview. Everything here is example data for one made-up learner,
// generated in the browser. In the real LifeOS this comes from each site's progress API.
import { GROUPS } from "./sites.js";
import { icon } from "./icons.js";
import { ink, tile, triple } from "./colour.js";
import { initEarth, TOPICS, stateOf, review, showTopic } from "./earth.js";
import { initPlan } from "./plan.js";
import { initAssistant } from "./assistant.js";
import { initCapture } from "./capture.js";
import { initCommunity } from "./community.js";

const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch]);
const DAY = 864e5;
const fmt = (d, o) => d.toLocaleDateString("en-GB", o);

const SITES = new Map(GROUPS.flatMap((g) => g.items).map((s) => [s.n, s]));
const FORGE = "TechGradify · ForgeLab";
const colourOf = (n) => { const s = SITES.get(n); return s.spot || s.c; };
const short = (n) => (n === FORGE ? "ForgeLab" : n);

// ---------- Example learner ----------
// Which sites they use, and how often (per-day chance and max count). `when` shapes the pattern.
const SOURCES = [
  { n: "UnderGradify", p: 0.45, max: 3, when: (d) => inTerm(d) && weekday(d) },
  { n: "MedGradify", p: 0.28, max: 4 },
  { n: FORGE, p: 0.4, max: 5, when: (d, age) => age < 150 },
  { n: "LanguageGradify", p: 0.3, max: 2, when: (d) => d.getMonth() !== 7 },
  { n: "HealthGradify", p: 0.15, max: 1 },
  { n: "SportGradify", p: 0.55, max: 1, when: (d) => [1, 3, 6].includes(d.getDay()) },
  { n: "ProGradify", p: 0.6, max: 2, when: (d) => [6, 7].includes(d.getMonth()) && weekday(d) },
];
const inTerm = (d) => ![6, 7, 8].includes(d.getMonth()) || (d.getMonth() === 8 && d.getDate() > 20);
const weekday = (d) => d.getDay() > 0 && d.getDay() < 6;

// Life areas and the sites that feed them
const AREAS = [
  { id: "health", name: "Health", i: "heartbeat", site: "HealthGradify", sites: ["HealthGradify"], pct: 82, stat: "Sleep and wellbeing goals met this month" },
  { id: "fitness", name: "Fitness", i: "dumbbell", site: "SportGradify", sites: ["SportGradify"], pct: 64, stat: "3 of 4 workouts done this week" },
  { id: "career", name: "Career", i: "briefcase", site: "ProGradify", sites: ["ProGradify", FORGE], pct: 45, stat: "Junior data scientist · 9 of 20 skills" },
  { id: "knowledge", name: "Knowledge", i: "book", site: "MedGradify", sites: ["MedGradify", "LanguageGradify", FORGE], pct: 71, stat: "1,240 lessons across 3 sites" },
  { id: "degree", name: "Degree", i: "cap", site: "UnderGradify", sites: ["UnderGradify"], pct: 58, stat: "BSc Biomedical Science · Year 2 of 3" },
  { id: "courses", name: "Courses", i: "award", site: FORGE, sites: ["MedGradify", "LanguageGradify", FORGE], pct: 75, stat: "6 completed · 2 in progress" },
];

// One unit of a learning path per site
const PATHS = {
  MedGradify: { unit: 2, title: "The heart", sub: "Cardiac anatomy and the cardiac cycle", done: 3,
    lessons: ["Chambers and valves", "Coronary arteries", "The cardiac cycle", "Heart sounds", "ECG basics", "Arrhythmias", "Unit review"] },
  [FORGE]: { unit: 4, title: "Neural networks", sub: "Build a network from scratch in NumPy", done: 4,
    lessons: ["Perceptrons", "Activation functions", "The forward pass", "Loss functions", "Backpropagation", "Training loop", "Unit challenge"] },
  LanguageGradify: { unit: 6, title: "Travel Spanish", sub: "Directions, transport and hotels", done: 2,
    lessons: ["Asking for directions", "At the station", "Buying tickets", "Checking in", "Problems at the hotel", "Eating out", "Unit review"] },
};

const CREDS = [
  { site: FORGE, title: "Machine Learning Foundations", date: "2026-09-12", id: "GRD-ML01-7F3K", hours: 40, detail: "12 projects · 68 problems solved" },
  { site: "MedGradify", title: "Clinical Anatomy I", date: "2026-06-30", id: "GRD-MA11-Q82D" },
  { site: "LanguageGradify", title: "Spanish B1", date: "2026-03-18", id: "GRD-ES31-4LWN" },
  { site: FORGE, title: "Python for Data", date: "2026-01-09", id: "GRD-PY02-9XCE" },
];

// ---------- Build a year of activity ----------
function rng(seed) { // mulberry32: same example data on every visit
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const today = new Date(); today.setHours(0, 0, 0, 0);
const start = new Date(today - 52 * 7 * DAY);
start.setDate(start.getDate() - ((start.getDay() + 6) % 7)); // back to Monday
const days = [];
{
  const rand = rng(20261028);
  for (let d = new Date(start); d <= today; d = new Date(+d + DAY)) {
    const age = Math.round((today - d) / DAY);
    const counts = {};
    for (const s of SOURCES) {
      if (s.when && !s.when(d, age)) continue;
      if (rand() < s.p) counts[s.n] = 1 + Math.floor(rand() * s.max);
    }
    // a 23-day streak running up to today
    if (age < 23 && !Object.keys(counts).length) counts.MedGradify = 1;
    days.push({ date: d, counts });
  }
}
const todayCell = days[days.length - 1];

// ---------- Heatmap ----------
const heat = $("#heat");
const tip = $("#heat-tip");
let area = "all";

const off = new Set(); // sites disconnected in Settings
const inArea = (n) => !off.has(n) && (area === "all" || AREAS.find((a) => a.id === area).sites.includes(n));
function summarise(day) {
  const parts = Object.entries(day.counts).filter(([n]) => inArea(n)).sort((a, b) => b[1] - a[1]);
  return { parts, total: parts.reduce((t, [, c]) => t + c, 0) };
}
const level = (t) => (t === 0 ? 0 : t <= 2 ? 1 : t <= 4 ? 2 : t <= 7 ? 3 : 4);
const STRENGTH = [0, 38, 58, 80, 100];

function renderHeat() {
  const months = [];
  let html = "";
  days.forEach((day, i) => {
    const { parts, total } = summarise(day);
    const lv = level(total);
    const bg = lv ? `color-mix(in srgb, #${colourOf(parts[0][0])} ${STRENGTH[lv]}%, #151515)` : "";
    html += `<i data-i="${i}" class="${day === todayCell ? "today" : ""}"${bg ? ` style="background:${bg}"` : ""}></i>`;
    if (day.date.getDate() <= 7 && day.date.getDay() === 1) months.push({ col: Math.floor(i / 7), label: fmt(day.date, { month: "short" }) });
  });
  heat.innerHTML = `
    <div class="heat-days" aria-hidden="true"><span>Mon</span><span></span><span>Wed</span><span></span><span>Fri</span><span></span><span></span></div>
    <div class="heat-main">
      <div class="heat-months" aria-hidden="true">${months.map((m) => `<span style="grid-column:${m.col + 1}">${m.label}</span>`).join("")}</div>
      <div class="heat-cells">${html}</div>
    </div>`;
  renderStats();
}

function renderStats() {
  let total = 0, active = 0, longest = 0, run = 0;
  for (const d of days) {
    const t = summarise(d).total;
    total += t;
    if (t) { active++; run++; longest = Math.max(longest, run); } else run = 0;
  }
  let streak = 0;
  for (let i = days.length - 1; i >= 0 && summarise(days[i]).total; i--) streak++;
  const stat = (v, l, ic = "") => `<div class="stat">${ic}<b>${v.toLocaleString("en-GB")}</b><span>${l}</span></div>`;
  $("#heat-stats").innerHTML =
    stat(total, "activities") + stat(active, "active days") +
    stat(streak, "day streak", icon("flame", "flame")) + stat(longest, "longest streak");
  const a = AREAS.find((x) => x.id === area);
  $("#heat-sub").textContent = a ? `${a.name}: activity from ${a.sites.map(short).join(", ")}` : "Every activity across Gradify in the last year";
}

heat.addEventListener("mouseover", (e) => {
  const cell = e.target.closest("i[data-i]");
  if (!cell) return;
  const day = days[+cell.dataset.i];
  const { parts, total } = summarise(day);
  tip.innerHTML = `<b>${fmt(day.date, { weekday: "short", day: "numeric", month: "short", year: "numeric" })}</b>
    <span>${total ? `${total} ${total === 1 ? "activity" : "activities"}` : "No activity"}</span>
    ${parts.map(([n, c]) => `<span class="tip-row"><i style="background:#${colourOf(n)}"></i>${esc(short(n))}<em>${c}</em></span>`).join("")}`;
  tip.hidden = false;
  const panel = $("#life-heat").getBoundingClientRect(), r = cell.getBoundingClientRect();
  const x = Math.min(Math.max(r.left - panel.left + r.width / 2, 110), panel.width - 110);
  tip.style.left = x + "px";
  tip.style.top = r.top - panel.top + "px";
});
heat.addEventListener("mouseleave", () => { tip.hidden = true; });

// Area filter
const filter = $("#area-filter");
filter.innerHTML = [`<button class="chip" type="button" data-area="all" aria-pressed="true">All</button>`,
  ...AREAS.map((a) => `<button class="chip" type="button" data-area="${a.id}" aria-pressed="false">${a.name}</button>`)].join("");
filter.addEventListener("click", (e) => {
  const c = e.target.closest(".chip");
  if (!c) return;
  area = c.dataset.area;
  filter.querySelectorAll(".chip").forEach((b) => b.setAttribute("aria-pressed", String(b === c)));
  renderHeat();
});

// Legend: one dot per site the learner uses
const legend = () => SOURCES.map((s) =>
  `<span class="${off.has(s.n) ? "is-off" : ""}"><i style="background:#${colourOf(s.n)}"></i>${esc(short(s.n))}</span>`).join("");
function renderLegends() {
  $("#heat-legend").innerHTML = legend();
  $("#study-legend").innerHTML = legend();
}

// ---------- Study time: last 8 weeks, stacked by site ----------
const MIN_PER = 15; // example: minutes per logged activity
const hm = (m) => `${Math.floor(m / 60)}h${m % 60 ? ` ${m % 60}m` : ""}`;
function renderStudy() {
  const weeks = [];
  for (let w = 7; w >= 0; w--) {
    const slice = days.slice(Math.max(0, days.length - (w + 1) * 7), days.length - w * 7);
    const by = {};
    for (const d of slice) for (const [n, c] of Object.entries(d.counts)) if (!off.has(n)) by[n] = (by[n] || 0) + c * MIN_PER;
    weeks.push({ start: slice[0].date, by, total: Object.values(by).reduce((a, b) => a + b, 0) });
  }
  const max = Math.max(...weeks.map((w) => w.total), 60);
  const [prev, cur] = weeks.slice(-2);
  const change = prev.total ? Math.round(((cur.total - prev.total) / prev.total) * 100) : 0;
  $("#study-sub").textContent = `Last 7 days: ${hm(cur.total)} · ${change >= 0 ? "up" : "down"} ${Math.abs(change)}% on the week before`;
  $("#study-chart").innerHTML = weeks.map((w, i) => `
    <div class="sc-col${i === weeks.length - 1 ? " now" : ""}" title="${hm(w.total)}">
      <span class="sc-val">${hm(w.total)}</span>
      <span class="sc-bar" style="height:${(w.total / max) * 100}%">${SOURCES.filter((s) => w.by[s.n]).map((s) => `<i style="flex:${w.by[s.n]};background:#${colourOf(s.n)}"></i>`).join("")}</span>
      <span class="sc-lab">${i === weeks.length - 1 ? "This week" : fmt(w.start, { day: "numeric", month: "short" })}</span>
    </div>`).join("");
}

// ---------- Activity feed ----------
const FEED = [
  { site: "MedGradify", what: "Finished “Coronary arteries”", when: "Yesterday, 21:10", xp: 20 },
  { site: "SportGradify", what: "Logged a workout: upper body", when: "Yesterday, 18:30", xp: 15 },
  { site: FORGE, what: "Solved 3 problems in “The forward pass”", when: "Yesterday, 14:05", xp: 45 },
  { site: "LanguageGradify", what: "Finished “Buying tickets”", when: "Monday, 08:20", xp: 20 },
  { site: "HealthGradify", what: "Hit the sleep goal 5 nights in a row", when: "Monday, 07:00", xp: 10 },
  { site: "UnderGradify", what: "Submitted the anatomy practical write-up", when: "Sunday, 16:45", xp: 30 },
];
function renderFeed() {
  $("#feed").innerHTML = FEED.filter((f) => !off.has(f.site)).slice(0, 7).map((f) => {
    const c = colourOf(f.site);
    return `<li class="${f.fresh ? "fresh" : ""}"><span class="icon" style="--c:#${c};--tile:${tile(c)};--ink:${ink(c)}">${icon(SITES.get(f.site).i)}</span>
      <span class="feed-txt"><b>${esc(f.what)}</b><span>${esc(short(f.site))} · ${esc(f.when)}</span></span><em>+${f.xp} XP</em></li>`;
  }).join("");
}

// ---------- Life areas ----------
const R = 26, CIRC = 2 * Math.PI * R;
function renderAreas() {
  $("#areas").innerHTML = AREAS.map((a) => {
    const c = colourOf(a.site);
    return `<div class="area glass" style="--c:#${c};--tile:${tile(c)};--ink:${ink(c)}">
      <span class="icon">${icon(a.i)}</span>
      <div class="area-txt"><b>${a.name}</b><span>${esc(a.stat)}</span></div>
      <div class="area-ring">
        <svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="${R}" class="track"/><circle cx="32" cy="32" r="${R}" class="fill" style="stroke-dasharray:${CIRC};stroke-dashoffset:${CIRC * (1 - a.pct / 100)}"/></svg>
        <span>${a.pct}%</span>
      </div>
    </div>`;
  }).join("");
}

// ---------- Learning path ----------
let pathSite = "MedGradify";
const OFFSETS = [0, 46, 72, 46, 0, -46, -72];

function renderTabs() {
  $("#path-tabs").innerHTML = Object.keys(PATHS).map((n) =>
    `<button class="chip" type="button" role="tab" data-site="${esc(n)}" aria-selected="${n === pathSite}" aria-pressed="${n === pathSite}">${icon(SITES.get(n).i)}<span>${esc(short(n).replace("Gradify", ""))}</span></button>`).join("");
}

function renderPath() {
  const p = PATHS[pathSite], c = colourOf(pathSite);
  const panel = $(".path-panel");
  panel.style.setProperty("--c", "#" + c);
  panel.style.setProperty("--glow", triple(c));
  panel.style.setProperty("--ink", ink(c));
  $("#unit-banner").innerHTML = `
    <div><span>Unit ${p.unit}</span><b>${esc(p.title)}</b><em>${esc(p.sub)}</em></div>
    <span class="unit-count">${Math.min(p.done, p.lessons.length)}/${p.lessons.length}</span>`;
  $("#path").innerHTML = p.lessons.map((l, i) => {
    const last = i === p.lessons.length - 1;
    const state = i < p.done ? "done" : i === p.done ? "current" : "locked";
    const ic = state === "done" ? "check" : state === "locked" ? "lock" : last ? "trophy" : "star";
    const label = state === "done" ? `Practise “${l}” again` : state === "current" ? `Start “${l}”` : `“${l}” is locked`;
    return `<li style="--x:${OFFSETS[i % OFFSETS.length]}px">
      ${state === "current" ? '<span class="start-bubble" aria-hidden="true">Start</span>' : ""}
      <button type="button" class="node ${state}" data-i="${i}" aria-label="${esc(label)}">${icon(ic)}</button>
      <span class="node-name">${esc(l)}</span>
    </li>`;
  }).join("");
  renderMini();
}

function renderMini() {
  const c = colourOf(pathSite);
  $("#mini-title").textContent = `${short(pathSite)} heatmap · last 16 weeks`;
  $("#mini-heat").innerHTML = days.slice(-16 * 7).map((d) => {
    const n = d.counts[pathSite] || 0;
    const lv = level(n * 2);
    return `<i${lv ? ` style="background:color-mix(in srgb, #${c} ${STRENGTH[lv]}%, #151515)"` : ""}${d === todayCell ? ' class="today"' : ""}></i>`;
  }).join("");
}

$("#path-tabs").addEventListener("click", (e) => {
  const b = e.target.closest(".chip");
  if (!b) return;
  pathSite = b.dataset.site;
  renderTabs();
  renderPath();
});

$("#path").addEventListener("click", (e) => {
  const node = e.target.closest(".node");
  if (!node) return;
  const p = PATHS[pathSite], i = +node.dataset.i;
  if (node.classList.contains("locked")) {
    node.animate([{ transform: "translateX(0)" }, { transform: "translateX(-5px)" }, { transform: "translateX(5px)" }, { transform: "translateX(0)" }], { duration: 300 });
    toast(`Finish “${p.lessons[p.done]}” first to unlock this lesson.`);
    return;
  }
  const finished = i === p.done;
  if (finished) p.done++;
  logActivity(pathSite, finished ? `Finished “${p.lessons[i]}”` : `Practised “${p.lessons[i]}”`, finished ? "lesson" : "practice", finished ? 20 : 10);
  renderPath();
  if (finished && p.done === p.lessons.length) {
    unlock("unit");
    toast(`Unit ${p.unit} complete in ${short(pathSite)}. Achievement unlocked: Unit finisher. In the full version, finishing a course issues a verified credential.`);
  }
});

// The key idea: every activity on any site lands in LifeOS at once:
// the heatmap, life areas, XP and goals all update together.
function logActivity(site, what, kind, gained) {
  todayCell.counts[site] = (todayCell.counts[site] || 0) + 1;
  for (const a of AREAS) if (a.sites.includes(site)) a.pct = Math.min(100, a.pct + 1);
  for (const g of GOALS) if (g.counts(site, kind)) g.n = Math.min(g.of, g.n + 1);
  addXp(gained);
  FEED.forEach((f) => { f.fresh = false; });
  FEED.unshift({ site, what, when: "Just now", xp: gained, fresh: true });
  renderFeed();
  renderStudy();
  renderHeat();
  renderAreas();
  renderGoals();
  renderNext();
  heat.querySelector("i.today")?.classList.add("bump");
  document.dispatchEvent(new CustomEvent("lifeos:activity", { detail: { site, kind } }));
  toast(`${what} in ${short(site)}: +${gained} XP. <a href="#life-heat">Added to your life heatmap ↑</a>`, true);
}

// ---------- Command: today ----------
const LEVELS = ["Explorer", "Apprentice", "Scholar", "Specialist", "Expert"];
let userLevel = 14, xp = 2340;
const xpFor = (lv) => 1000 + lv * 140; // XP needed to finish this level
let sessionXp = 0;
function addXp(n) {
  xp += n;
  sessionXp += n;
  while (xp >= xpFor(userLevel)) { xp -= xpFor(userLevel); userLevel++; unlock("level"); toast(`Level up! Alex is now level ${userLevel}.`); }
  renderProfile();
}
function renderProfile() {
  $("#level-name").textContent = `Level ${userLevel} · ${LEVELS[Math.min(LEVELS.length - 1, Math.floor(userLevel / 6))]}`;
  $("#xp-level").textContent = `Level ${userLevel + 1}`;
  $("#xp-text").textContent = `${xp.toLocaleString("en-GB")} / ${xpFor(userLevel).toLocaleString("en-GB")} XP`;
  $("#xp-fill").style.width = `${(xp / xpFor(userLevel)) * 100}%`;
}

const BADGES = [
  { id: "streak", i: "flame", name: "7-day streak", c: "ff8a3d", got: true },
  { id: "cred", i: "award", name: "First credential", c: "ff5a4d", got: true },
  { id: "lessons", i: "star", name: "100 lessons", c: "ffc002", got: true },
  { id: "unit", i: "trophy", name: "Unit finisher: complete a unit", c: "40d4b1", got: false },
  { id: "level", i: "cap", name: "Level up", c: "3c78d8", got: false },
];
function renderBadges() {
  $("#badges").innerHTML = BADGES.map((b) =>
    `<span class="ach ${b.got ? "got" : "locked"}" style="--c:#${b.c}" title="${esc(b.name)}${b.got ? "" : " (locked)"}" role="img" aria-label="${esc(b.name)}${b.got ? "" : ", locked"}">${icon(b.got ? b.i : "lock")}</span>`).join("");
}
function unlock(id) {
  const b = BADGES.find((x) => x.id === id);
  if (b && !b.got) { b.got = true; renderBadges(); }
}

// Goals count real activity, not ticked boxes
const GOALS = [
  { label: "Finish 3 lessons", n: 1, of: 3, i: "star", counts: (site, kind) => kind === "lesson" },
  { label: "Review 2 fading topics", n: 0, of: 2, i: "flame", counts: (site, kind) => kind === "review-fading" },
  { label: "Practise Spanish", n: 0, of: 1, i: "languages", counts: (site) => site === "LanguageGradify" },
  { label: "Work out 4 times this week", n: 3, of: 4, i: "dumbbell", counts: (site) => site === "SportGradify", week: true },
];
function renderGoals() {
  $("#goals").innerHTML = GOALS.map((g) => {
    const done = g.n >= g.of;
    return `<div class="goal ${done ? "done" : ""}">
      <span class="goal-ico">${icon(done ? "check" : g.i)}</span>
      <span class="goal-txt"><b>${esc(g.label)}</b><span>${g.week ? "This week" : "Today"} · ${g.n}/${g.of}</span></span>
      <span class="goal-bar"><i style="width:${(g.n / g.of) * 100}%"></i></span>
    </div>`;
  }).join("");
}

// Recommended next action: the most urgent fading topic on Gradify Earth
const PRIORITY = ["cycle", "thorax", "enzymes", "inherit"];
function renderNext() {
  const t = PRIORITY.map((id) => TOPICS.find((x) => x.id === id)).find((x) => stateOf(x) === "fading");
  const c = colourOf("MedGradify");
  const box = $("#next");
  box.style.setProperty("--c", "#" + c);
  box.style.setProperty("--glow", triple(c));
  if (!t) {
    box.innerHTML = `<span class="kicker">Recommended now</span><b class="next-title">You're all caught up</b>
      <p>No fading topics left. Next, carry on with Unit 2 of MedGradify on the learning path.</p>
      <div class="next-actions"><a class="btn btn-light lg btn-sm" href="#path-panel"><span>Go to learning path</span></a></div>`;
    return;
  }
  box.innerHTML = `
    <span class="kicker">${icon("flame")}Recommended now</span>
    <b class="next-title">Review “${esc(t.name)}”</b>
    <p>Retention is down to ${t.ev[3]}% and the Cardiovascular exam is in 15 days. A short review now will bring it back.</p>
    <div class="chips-row"><span>15 min</span><span>MedGradify</span><span>+30 XP</span></div>
    <div class="next-actions">
      <button type="button" class="btn btn-light lg btn-sm" data-topic="${t.id}">${icon("star")}<span>Start session</span></button>
      <a class="see" href="#earth">See it on Gradify Earth</a>
    </div>`;
}
// Review a topic from anywhere (the recommendation, the assistant): Earth, XP, goals and heatmap all update
function startReview(id) {
  const t = TOPICS.find((x) => x.id === id);
  const wasFading = stateOf(t) === "fading";
  review(id);
  logActivity("MedGradify", `Reviewed “${t.name}”`, wasFading ? "review-fading" : "review", 30);
}
$("#next").addEventListener("click", (e) => {
  const b = e.target.closest("[data-topic]");
  if (b) startReview(b.dataset.topic);
});

// Coming up: this week, plus deadlines
const EVENTS = [
  { in: 2, what: "Unit 4 challenge due", site: FORGE },
  { in: 6, what: "Physiology lab report", site: "UnderGradify" },
  { in: 15, what: "Cardiovascular exam", site: "MedGradify" },
  { in: 23, what: "Spanish B2 speaking test", site: "LanguageGradify" },
];
function renderUpcoming() {
  const d0 = today;
  $("#week-label").textContent = fmt(d0, { month: "long", year: "numeric" });
  $("#week").innerHTML = Array.from({ length: 7 }, (_, k) => {
    const d = new Date(+d0 + k * DAY);
    const ev = EVENTS.find((e) => e.in === k);
    return `<span class="${k === 0 ? "now" : ""}"><em>${fmt(d, { weekday: "narrow" })}</em><b>${d.getDate()}</b>${ev ? `<i style="background:#${colourOf(ev.site)}"></i>` : "<i></i>"}</span>`;
  }).join("");
  const when = (n) => (n === 0 ? "today" : n === 1 ? "tomorrow" : `in ${n} days`);
  $("#events").innerHTML = EVENTS.slice(0, 5).map((e) => {
    const d = new Date(+d0 + e.in * DAY), c = colourOf(e.site);
    return `<div class="event${e.planned ? " planned" : ""}"><span class="date"><b>${d.getDate()}</b>${fmt(d, { month: "short" })}</span>
      <span class="ev-txt"><b>${esc(e.what)}</b><span><i style="background:#${c}"></i>${e.planned ? "Planned · " : ""}${esc(short(e.site))} · ${when(e.in)}</span></span></div>`;
  }).join("");
}
function addEvent(ev) {
  EVENTS.push(ev);
  EVENTS.sort((a, b) => a.in - b.in || (b.planned ? 1 : 0) - (a.planned ? 1 : 0));
  renderUpcoming();
}

// ---------- Credentials ----------
function renderCreds() {
  const [top, ...rest] = CREDS;
  const tc = colourOf(top.site);
  const date = (s) => fmt(new Date(s), { day: "numeric", month: "short", year: "numeric" });
  $("#cred-count").textContent = `${CREDS.length} verified`;
  $("#cred-feature").innerHTML = `
    <div class="cert" style="--c:#${tc};--tile:${tile(tc)};--ink:${ink(tc)}">
      <div class="cert-top"><span class="icon">${icon(SITES.get(top.site).i)}</span><span class="verified">${icon("shield")}Verified</span></div>
      <span class="cert-kicker">Certificate of completion</span>
      <b class="cert-title">${esc(top.title)}</b>
      <span class="cert-meta">Awarded to Alex Morgan by ${esc(short(top.site))} · ${date(top.date)}</span>
      <span class="cert-meta">${top.hours} hours · ${esc(top.detail)}</span>
      <div class="cert-foot"><code>${top.id}</code><button type="button" class="btn btn-light lg btn-sm verify">Verify</button></div>
    </div>`;
  $("#cred-list").innerHTML = rest.map((c) => {
    const col = colourOf(c.site);
    return `<div class="row inset cred" style="--c:#${col};--tile:${tile(col)};--ink:${ink(col)}">
      <span class="icon">${icon(SITES.get(c.site).i)}</span>
      <span class="row-txt"><b>${esc(c.title)}</b><span>${esc(short(c.site))} · ${date(c.date)} · <code>${c.id}</code></span></span>
      <button type="button" class="go verify" aria-label="Verify ${esc(c.title)}">${icon("shield")}</button>
    </div>`;
  }).join("");
}
$(".cred-panel").addEventListener("click", (e) => {
  if (e.target.closest(".verify")) toast("In the full version, this opens a public page where anyone can check the certificate is genuine.");
});

// ---------- Settings ----------
let aiStyle = "friendly";
const STYLES = {
  friendly: { name: "Friendly", note: "Warm and encouraging, with a bit more explanation." },
  coach: { name: "Coach", note: "Direct. Pushes you to start now and holds you to your goals." },
  concise: { name: "Concise", note: "Short answers: just the plan and the next step." },
};
const REMINDERS = [
  { label: "Daily plan at 8:00", on: true },
  { label: "Streak reminder at 20:00 if nothing's logged", on: true },
  { label: "Deadline alerts 3 days before", on: true },
  { label: "Weekly progress summary on Sunday", on: false },
];
const sw = (id, label, on, extra = "") => `<label class="switch row-switch"><span>${label}</span><input type="checkbox" ${extra} data-id="${id}" role="switch" ${on ? "checked" : ""}><span class="sw-track lg" aria-hidden="true"><span class="sw-knob"></span></span></label>`;
function renderSettings() {
  $("#site-toggles").innerHTML = SOURCES.map((s) => {
    const c = colourOf(s.n);
    return `<div class="site-row"><span class="icon" style="--c:#${c};--tile:${tile(c)};--ink:${ink(c)}">${icon(SITES.get(s.n).i)}</span>${sw(s.n, esc(short(s.n)), !off.has(s.n), 'data-kind="site"')}</div>`;
  }).join("");
  $("#ai-style").innerHTML = Object.entries(STYLES).map(([k, v]) => `<button type="button" class="chip" role="radio" data-style="${k}" aria-checked="${k === aiStyle}" aria-pressed="${k === aiStyle}">${v.name}</button>`).join("");
  $("#ai-style-note").textContent = STYLES[aiStyle].note;
  $("#reminders").innerHTML = REMINDERS.map((r, i) => sw(i, esc(r.label), r.on, 'data-kind="reminder"')).join("");
}
$(".settings").addEventListener("change", (e) => {
  const t = e.target;
  if (t.dataset.kind === "site") {
    if (t.checked) off.delete(t.dataset.id); else off.add(t.dataset.id);
    renderHeat(); renderLegends(); renderStudy(); renderFeed();
    toast(t.checked ? `${esc(short(t.dataset.id))} is connected again.` : `${esc(short(t.dataset.id))} is disconnected. Its activity is hidden from LifeOS until you reconnect it.`);
  }
  if (t.dataset.kind === "reminder") {
    REMINDERS[+t.dataset.id].on = t.checked;
    toast(`${REMINDERS[+t.dataset.id].label}: ${t.checked ? "on" : "off"}.`);
  }
});
$(".settings").addEventListener("click", (e) => {
  const st = e.target.closest("[data-style]");
  if (st) { aiStyle = st.dataset.style; renderSettings(); toast(`Gradify AI will now use the ${STYLES[aiStyle].name.toLowerCase()} style.`); return; }
  if (e.target.closest("#export")) {
    const data = {
      note: "Example data from the Gradify LifeOS preview. Not a real person.",
      learner: "Alex Morgan", level: userLevel, xp, goals: GOALS.map(({ label, n, of }) => ({ label, done: n, of })),
      lifeAreas: AREAS.map(({ name, pct }) => ({ name, pct })),
      topics: TOPICS.map((t) => ({ name: t.name, state: stateOf(t), evidence: t.ev })),
      calendar: EVENTS.map((ev) => ({ what: ev.what, site: ev.site, date: new Date(+today + ev.in * DAY).toISOString().slice(0, 10) })),
      activity: days.filter((d) => Object.keys(d.counts).length).map((d) => ({ date: d.date.toISOString().slice(0, 10), ...d.counts })),
    };
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
    a.download = "gradify-lifeos-example-data.json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    toast("Downloaded Alex's example data as a JSON file.");
    return;
  }
  if (e.target.closest("#delete")) toast("In the real LifeOS this permanently deletes your account and data, after you confirm by email. There's nothing to delete in this preview.");
});

// ---------- Toast ----------
const toastEl = $("#toast");
let toastTimer;
function toast(msg, html = false) {
  if (html) toastEl.innerHTML = msg; else toastEl.textContent = msg;
  toastEl.hidden = false;
  toastEl.classList.remove("show");
  void toastEl.offsetWidth;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toastEl.hidden = true; }, 4200);
}

// ---------- Go ----------
$("#connected").innerHTML = SOURCES.map((s) => {
  const c = colourOf(s.n);
  return `<span class="icon" style="--c:#${c};--tile:${tile(c)};--ink:${ink(c)}" title="${esc(s.n)}" role="img" aria-label="${esc(s.n)}">${icon(SITES.get(s.n).i)}</span>`;
}).join("");
renderProfile();
renderBadges();
renderGoals();
renderNext();
renderUpcoming();
initEarth({
  onReview: (t) => logActivity("MedGradify", `Reviewed “${t.name}”`, t.wasFading ? "review-fading" : "review", 15),
});
const ctx = {
  toast, addEvent, startReview, showTopic, logActivity,
  goals: GOALS, paths: PATHS, days, today, DAY, fmt, esc, short, colourOf, site: (n) => SITES.get(n),
  weekXp: () => 420 + sessionXp, aiStyle: () => aiStyle,
};
initPlan(ctx);
initAssistant(ctx);
initCapture(ctx);
initCommunity(ctx);
renderSettings();
renderLegends();
renderStudy();
renderFeed();
renderHeat();
renderAreas();
renderTabs();
renderPath();
renderCreds();
// phones: start the heatmap at the most recent weeks whenever Progress opens
document.addEventListener("lifeos:view", (e) => {
  if (e.detail === "progress") requestAnimationFrame(() => { const sc = $("#heat-scroll"); sc.scrollLeft = sc.scrollWidth; });
});
