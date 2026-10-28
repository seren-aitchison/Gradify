// Gradify Earth preview: a 2D knowledge map of one learner's degree (example data).
// Planet = the degree, continents = years, regions = modules, cities = topics,
// roads = prerequisites, portals = links to other Gradify sites.
import { icon } from "./icons.js";

const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch]);
const SVG = "http://www.w3.org/2000/svg";

export const MODULES = {
  anat: { name: "Anatomy", c: "#f99246" },
  bio: { name: "Biochemistry", c: "#a855f7" },
  gen: { name: "Genetics", c: "#3c78d8" },
  cardio: { name: "Cardiovascular", c: "#e52153" },
  phys: { name: "Physiology", c: "#40d4b1" },
  pharm: { name: "Pharmacology", c: "#ffc002" },
};

// Continents: soft shapes behind the regions
const CONTINENTS = [
  { name: "Year 1", x: 245, y: 250, rx: 175, ry: 150 },
  { name: "Year 2 · now", x: 545, y: 235, rx: 185, ry: 165, lx: 665, ly: 100 },
  { name: "Year 3", x: 790, y: 300, rx: 90, ry: 120, fog: true },
];

// Evidence order: recall, explain, apply, retain, connect (0–100)
const EVIDENCE = ["Recall", "Explain", "Apply to new problems", "Retained over time", "Connected to other topics"];
export const TOPICS = [
  { id: "bones", m: "anat", name: "Bones and joints", x: 150, y: 175, ev: [92, 88, 80, 90, 76], days: 9 },
  { id: "muscles", m: "anat", name: "Muscles", x: 215, y: 135, ev: [86, 82, 74, 84, 72], days: 12 },
  { id: "thorax", m: "anat", name: "The thorax", x: 300, y: 170, ev: [64, 70, 58, 41, 60], days: 46 },
  { id: "enzymes", m: "bio", name: "Enzymes", x: 135, y: 280, ev: [58, 66, 52, 38, 50], days: 71 },
  { id: "metab", m: "bio", name: "Metabolism", x: 215, y: 315, ev: [84, 80, 76, 78, 74], days: 18 },
  { id: "signal", m: "bio", name: "Cell signalling", x: 300, y: 285, ev: [62, 48, 40, 60, 35], days: 6 },
  { id: "dna", m: "gen", name: "DNA replication", x: 190, y: 380, ev: [90, 86, 78, 82, 70], days: 21 },
  { id: "inherit", m: "gen", name: "Inheritance", x: 290, y: 375, ev: [61, 64, 55, 44, 58], days: 63 },
  { id: "chambers", m: "cardio", name: "Chambers and valves", x: 455, y: 140, ev: [94, 90, 84, 88, 80], days: 0, recent: true },
  { id: "coronary", m: "cardio", name: "Coronary arteries", x: 545, y: 105, ev: [88, 84, 78, 86, 74], days: 1, recent: true },
  { id: "cycle", m: "cardio", name: "The cardiac cycle", x: 535, y: 200, ev: [54, 72, 60, 48, 66], days: 15 },
  { id: "sounds", m: "cardio", name: "Heart sounds", x: 625, y: 165, ev: [40, 30, 20, 0, 22], days: 0, learning: true },
  { id: "ecg", m: "cardio", name: "ECG basics", x: 650, y: 245, ev: [0, 0, 0, 0, 0] },
  { id: "bp", m: "phys", name: "Blood pressure", x: 470, y: 270, ev: [55, 44, 30, 0, 38], days: 3, learning: true },
  { id: "renal", m: "phys", name: "Renal function", x: 545, y: 330, ev: [0, 0, 0, 0, 0] },
  { id: "receptors", m: "pharm", name: "Drug receptors", x: 400, y: 345, ev: [86, 82, 76, 80, 78], days: 10 },
  { id: "pk", m: "pharm", name: "Pharmacokinetics", x: 470, y: 395, ev: [58, 50, 36, 0, 44], days: 2, learning: true },
  { id: "placements", m: null, name: "Clinical placements", x: 800, y: 280, ev: [0, 0, 0, 0, 0], locked: true },
];
export const ROADS = [
  ["bones", "muscles"], ["muscles", "thorax"], ["thorax", "chambers"], ["chambers", "coronary"], ["chambers", "cycle"],
  ["cycle", "sounds"], ["cycle", "ecg"], ["cycle", "bp"], ["bp", "renal"], ["enzymes", "metab"], ["metab", "signal"],
  ["signal", "receptors"], ["receptors", "pk"], ["dna", "inherit"], ["ecg", "placements"],
];
// Portals: links to other Gradify sites
const PORTALS = [
  { to: "pk", site: "ForgeLab", what: "Data analysis for drug trials", c: "#ff5a4d", x: 345, y: 440 },
  { to: "chambers", site: "LanguageGradify", what: "Medical Spanish: el corazón", c: "#dd7d6b", x: 420, y: 62 },
];

const STATES = {
  mastered: { label: "Mastered", note: "Strong on every kind of evidence." },
  recent: { label: "Recently active", note: "Studied in the last day or two." },
  fading: { label: "Fading", note: "Knowledge is slipping. A short review will bring it back." },
  learning: { label: "Learning", note: "Started, but not all the evidence is in yet." },
  new: { label: "Not started", note: "Unlocks once its prerequisites are strong." },
  locked: { label: "Locked", note: "Part of Year 3." },
};
export function stateOf(t) {
  if (t.locked) return "locked";
  if (t.ev.every((v) => v === 0)) return "new";
  const mastered = t.ev.every((v) => v >= 70);
  if (t.recent && mastered) return "recent";
  if (mastered) return "mastered";
  if (t.ev[3] < 50 && !t.learning) return "fading";
  return "learning";
}
export const strength = (t) => Math.round(t.ev.reduce((a, b) => a + b, 0) / t.ev.length);

let selected = "cycle";
let onReview = () => {};

function el(name, attrs = {}, parent) {
  const n = document.createElementNS(SVG, name);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  parent?.appendChild(n);
  return n;
}

function draw() {
  const map = $("#earth-map");
  map.innerHTML = "";
  const svg = el("svg", { viewBox: "0 0 900 480", role: "group", "aria-label": "Knowledge map. Choose a topic to see its evidence." }, map);
  const defs = el("defs", {}, svg);
  defs.innerHTML = `
    <radialGradient id="planet" cx="45%" cy="38%" r="70%"><stop offset="0" stop-color="#1a1d26"/><stop offset=".7" stop-color="#0c0d12"/><stop offset="1" stop-color="#050506"/></radialGradient>
    <radialGradient id="rim" cx="50%" cy="50%" r="50%"><stop offset=".86" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#9fb4ff" stop-opacity=".22"/></radialGradient>
    <filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="28"/></filter>
    <filter id="fog" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14"/></filter>
    <clipPath id="globe"><ellipse cx="450" cy="250" rx="440" ry="235"/></clipPath>`;

  // planet body, latitude/longitude lines and rim light
  el("ellipse", { cx: 450, cy: 250, rx: 440, ry: 235, fill: "url(#planet)" }, svg);
  const g = el("g", { "clip-path": "url(#globe)" }, svg);
  for (let i = 1; i < 6; i++) el("ellipse", { cx: 450, cy: 250, rx: 440, ry: 235 * i / 6, class: "grid-line" }, g);
  for (let i = 1; i < 8; i++) el("ellipse", { cx: 450, cy: 250, rx: 440 * i / 8, ry: 235, class: "grid-line" }, g);

  // continents and module regions, as soft glows
  for (const c of CONTINENTS) {
    el("ellipse", { cx: c.x, cy: c.y, rx: c.rx, ry: c.ry, class: "continent" + (c.fog ? " fog" : ""), filter: c.fog ? "url(#fog)" : "" }, g);
    const t = el("text", { x: c.lx ?? c.x, y: c.ly ?? c.y - c.ry + 22, class: "continent-label" }, g);
    t.textContent = c.name;
  }
  for (const [key, m] of Object.entries(MODULES)) {
    const ts = TOPICS.filter((t) => t.m === key);
    const cx = ts.reduce((a, t) => a + t.x, 0) / ts.length, cy = ts.reduce((a, t) => a + t.y, 0) / ts.length;
    const lit = ts.reduce((a, t) => a + strength(t), 0) / ts.length / 100;
    el("ellipse", { cx, cy, rx: 85, ry: 60, fill: m.c, opacity: (0.12 + lit * 0.3).toFixed(2), filter: "url(#soft)" }, g);
    const label = el("text", { x: cx, y: Math.max(...ts.map((t) => t.y)) + 34, class: "region-label", fill: m.c }, g);
    label.textContent = m.name;
  }
  el("ellipse", { cx: 450, cy: 250, rx: 440, ry: 235, fill: "url(#rim)", "pointer-events": "none" }, svg);

  // roads (prerequisites)
  const byId = Object.fromEntries(TOPICS.map((t) => [t.id, t]));
  for (const [a, b] of ROADS) {
    const A = byId[a], B = byId[b];
    const weak = ["fading", "new", "locked"].includes(stateOf(A)) || ["new", "locked"].includes(stateOf(B));
    el("line", { x1: A.x, y1: A.y, x2: B.x, y2: B.y, class: "road" + (weak ? " weak" : "") }, svg);
  }

  // portals to other sites
  for (const p of PORTALS) {
    const T = byId[p.to];
    el("line", { x1: p.x, y1: p.y, x2: T.x, y2: T.y, class: "portal-link", stroke: p.c }, svg);
    const pg = el("g", { class: "portal", transform: `translate(${p.x} ${p.y})` }, svg);
    el("circle", { r: 12, stroke: p.c }, pg);
    el("circle", { r: 6, fill: p.c }, pg);
    const tt = el("title", {}, pg);
    tt.textContent = `Portal to ${p.site}: ${p.what}`;
    const pl = el("text", { y: p.y < 250 ? -18 : 26, class: "portal-label", fill: p.c }, pg);
    pl.textContent = `→ ${p.site}`;
  }

  // cities (topics)
  for (const t of TOPICS) {
    const st = stateOf(t), m = MODULES[t.m];
    const c = m ? m.c : "#666";
    const r = 6 + strength(t) / 18;
    const node = el("g", {
      class: `city ${st}${t.id === selected ? " selected" : ""}`, transform: `translate(${t.x} ${t.y})`,
      tabindex: 0, role: "button", "aria-label": `${t.name}: ${STATES[st].label}`, "data-id": t.id, style: `--c:${c}`,
    }, svg);
    if (st === "recent") el("circle", { r: r + 4, class: "pulse" }, node);
    el("circle", { r: r + 6, class: "hit" }, node);
    el("circle", { r, class: "core" }, node);
    if (st === "mastered" || st === "recent") el("rect", { x: -2.5, y: -r - 9, width: 5, height: 9, rx: 1, class: "tower" }, node);
    const label = el("text", { y: r + 15, class: "city-label" }, node);
    label.textContent = t.name;
  }
}

function inspect() {
  const t = TOPICS.find((x) => x.id === selected);
  const st = stateOf(t), m = MODULES[t.m];
  const c = m ? m.c : "#888";
  const needs = t.ev.map((v, i) => [v, EVIDENCE[i]]).filter(([v]) => v < 70).map(([, n]) => n.toLowerCase());
  $("#inspector").style.setProperty("--c", c);
  $("#inspector").innerHTML = `
    <span class="kicker">${m ? `${esc(m.name)} · ${t.x < 380 ? "Year 1" : "Year 2"}` : "Year 3"}</span>
    <b class="topic">${esc(t.name)}</b>
    <span class="state-pill ${st}">${STATES[st].label}</span>
    <p>${STATES[st].note}${t.days !== undefined && st !== "new" ? ` Last studied ${t.days === 0 ? "today" : t.days === 1 ? "yesterday" : `${t.days} days ago`}.` : ""}</p>
    ${t.locked ? "" : `<ul class="evidence">${t.ev.map((v, i) => `
      <li><span>${EVIDENCE[i]}</span><em>${v}%</em><i><b style="width:${v}%" class="${v >= 70 ? "ok" : ""}"></b></i></li>`).join("")}</ul>
    <p class="verdict">${needs.length ? `To master it: ${needs.join(", ")} need to reach 70%.` : "Every kind of evidence is above 70%. This topic is mastered."}</p>
    ${st === "new" ? "" : `<button type="button" class="btn btn-light lg btn-sm" id="review">${icon("flame")}<span>${st === "learning" ? "Continue" : "Review"} · 10 min</span></button>`}`}`;
}

function select(id) {
  selected = id;
  draw();
  inspect();
}

export function showTopic(id) {
  select(id);
  document.getElementById("earth").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}

export function review(id) {
  const t = TOPICS.find((x) => x.id === id);
  if (!t || t.locked) return;
  // a review strengthens recall and retention most
  const bump = [12, 6, 6, 18, 5];
  t.ev = t.ev.map((v, i) => Math.min(100, v + bump[i]));
  t.days = 0;
  t.recent = true;
  if (t.ev.every((v) => v >= 70)) t.learning = false;
  select(id);
  $("#earth-map").querySelector(`[data-id="${id}"]`)?.classList.add("boost");
}

export function initEarth(opts) {
  onReview = opts.onReview;
  const map = $("#earth-map");
  map.addEventListener("click", (e) => {
    const n = e.target.closest(".city");
    if (n) select(n.dataset.id);
  });
  map.addEventListener("keydown", (e) => {
    const n = e.target.closest(".city");
    if (n && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); select(n.dataset.id); map.querySelector(`[data-id="${n.dataset.id}"]`)?.focus(); }
  });
  $("#inspector").addEventListener("click", (e) => {
    if (!e.target.closest("#review")) return;
    const t = TOPICS.find((x) => x.id === selected);
    t.wasFading = stateOf(t) === "fading";
    review(selected);
    onReview(t);
  });
  $("#earth-legend").innerHTML = ["mastered", "recent", "fading", "learning", "new"].map((s) =>
    `<span><i class="lg-dot ${s}"></i>${STATES[s].label}</span>`).join("") +
    '<span><i class="lg-dot portal"></i>Portal to another Gradify site</span><span><i class="lg-road"></i>Prerequisite</span>';
  select(selected);
}
