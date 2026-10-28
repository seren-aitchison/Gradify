// Gradify LifeOS preview. Everything here is example data for one made-up learner,
// generated in the browser. In the real LifeOS this comes from each site's progress API.
import { GROUPS } from "./sites.js";
import { icon } from "./icons.js";
import { ink, tile, triple } from "./colour.js";

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

const inArea = (n) => area === "all" || AREAS.find((a) => a.id === area).sites.includes(n);
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
$("#heat-legend").innerHTML = SOURCES.map((s) =>
  `<span><i style="background:#${colourOf(s.n)}"></i>${esc(short(s.n))}</span>`).join("");

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
  logActivity(pathSite, finished ? `Finished “${p.lessons[i]}”` : `Practised “${p.lessons[i]}”`);
  renderPath();
  if (finished && p.done === p.lessons.length) toast(`Unit ${p.unit} complete in ${short(pathSite)}. In the full version, finishing a course issues a verified credential.`);
});

// The key idea: every lesson on any site lands on the LifeOS heatmap at once
function logActivity(site, what) {
  todayCell.counts[site] = (todayCell.counts[site] || 0) + 1;
  for (const a of AREAS) if (a.sites.includes(site)) a.pct = Math.min(100, a.pct + 1);
  renderHeat();
  renderAreas();
  const cell = heat.querySelector("i.today");
  cell?.classList.add("bump");
  toast(`${what} in ${short(site)}. <a href="#life-heat">Added to your life heatmap ↑</a>`, true);
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
renderHeat();
renderAreas();
renderTabs();
renderPath();
renderCreds();
const scroller = $("#heat-scroll");
scroller.scrollLeft = scroller.scrollWidth; // phones: start at the most recent weeks
