// Gradify Earth preview: a 3D globe of one learner's degree (example data).
// Planet = the degree, continents = years, regions = modules, cities = topics,
// roads = prerequisites, portals = links to other Gradify sites.
import { icon } from "./icons.js";
import { createGlobe, vec } from "./globe.js";

const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch]);

export const MODULES = {
  anat: { name: "Anatomy", c: "#f99246" },
  bio: { name: "Biochemistry", c: "#a855f7" },
  gen: { name: "Genetics", c: "#3c78d8" },
  cardio: { name: "Cardiovascular", c: "#e52153" },
  phys: { name: "Physiology", c: "#40d4b1" },
  pharm: { name: "Pharmacology", c: "#ffc002" },
};

// Where each module sits on the globe: [lat, lon] of its region's centre. Year 1 lies in the
// north and west, Year 2 in the south and east, and Year 3 is still in the fog over East Asia.
const CENTRES = { anat: [50, 12], bio: [6, 20], gen: [24, 78], cardio: [-14, -58], phys: [40, -98], pharm: [-25, 134], placements: [36, 106] };
const YEAR1 = new Set(["anat", "bio", "gen"]);
// Hubs: cities where other Gradify learners are studying right now (example data)
const HUBS = [
  ["New York", 40.7, -74], ["London", 51.5, -0.1], ["São Paulo", -23.5, -46.6],
  ["Lagos", 6.5, 3.4], ["Cape Town", -33.9, 18.4], ["Dubai", 25.2, 55.3], ["Mumbai", 19.1, 72.9],
  ["Tokyo", 35.7, 139.7], ["Sydney", -33.9, 151.2],
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
  { to: "pk", site: "ForgeLab", what: "Data analysis for drug trials", c: "#ff5a4d", dir: [0.3, -0.45, 0.15] },
  { to: "chambers", site: "LanguageGradify", what: "Medical Spanish: el corazón", c: "#dd7d6b", dir: [-0.4, 0.4, 0.15] },
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

let globe = null;

// The topics' x/y were laid out on a flat map; turn each one's offset from its module's centre
// into a spot on the globe (about 5px to a degree), so neighbours on the map stay neighbours.
const place = (() => {
  const out = {};
  for (const key of Object.keys(CENTRES)) {
    const ts = TOPICS.filter((t) => (t.m ?? "placements") === key);
    const mx = ts.reduce((a, t) => a + t.x, 0) / ts.length, my = ts.reduce((a, t) => a + t.y, 0) / ts.length;
    const [lat0, lon0] = CENTRES[key];
    for (const t of ts) {
      const lat = lat0 - (t.y - my) / 5;
      out[t.id] = vec(lat, lon0 + (t.x - mx) / 5 / Math.cos(lat * Math.PI / 180));
    }
  }
  return out;
})();

const rgb = (h) => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };

function scene() {
  const regions = Object.entries(MODULES).map(([key, m]) => {
    const ts = TOPICS.filter((t) => t.m === key);
    return { v: vec(...CENTRES[key]), radius: 0.3, rgb: rgb(m.c), light: ts.reduce((a, t) => a + strength(t), 0) / ts.length / 100 };
  });
  regions.push({ v: vec(...CENTRES.placements), radius: 0.4, rgb: [120, 120, 130], light: 0, locked: true });
  const byId = Object.fromEntries(TOPICS.map((t) => [t.id, t]));
  return {
    regions,
    rings: true,
    hubs: HUBS.map(([name, lat, lon]) => ({ name, v: vec(lat, lon) })),
    selected,
    pins: TOPICS.map((t) => ({ id: t.id, v: place[t.id], c: MODULES[t.m]?.c ?? "#777777", name: t.name, state: stateOf(t), strength: strength(t) })),
    roads: ROADS.map(([a, b]) => ({
      a: place[a], b: place[b],
      weak: ["fading", "new", "locked"].includes(stateOf(byId[a])) || ["new", "locked"].includes(stateOf(byId[b])),
    })),
    portals: PORTALS.map((p) => ({ v: place[p.to], dir: p.dir, c: p.c, site: p.site })),
  };
}

function draw() {
  globe?.setScene(scene());
  const jump = $("#earth-jump");
  if (jump) jump.value = selected;
}

function inspect() {
  const t = TOPICS.find((x) => x.id === selected);
  const st = stateOf(t), m = MODULES[t.m];
  const c = m ? m.c : "#888";
  const needs = t.ev.map((v, i) => [v, EVIDENCE[i]]).filter(([v]) => v < 70).map(([, n]) => n.toLowerCase());
  $("#inspector").style.setProperty("--c", c);
  $("#inspector").innerHTML = `
    <span class="kicker">${m ? `${esc(m.name)} · ${YEAR1.has(t.m) ? "Year 1" : "Year 2"}` : "Year 3"}</span>
    <b class="topic">${esc(t.name)}</b>
    <span class="state-pill ${st}">${STATES[st].label}</span>
    <p>${STATES[st].note}${t.days !== undefined && st !== "new" ? ` Last studied ${t.days === 0 ? "today" : t.days === 1 ? "yesterday" : `${t.days} days ago`}.` : ""}</p>
    ${t.locked ? "" : `<ul class="evidence">${t.ev.map((v, i) => `
      <li><span>${EVIDENCE[i]}</span><em>${v}%</em><i><b style="width:${v}%" class="${v >= 70 ? "ok" : ""}"></b></i></li>`).join("")}</ul>
    <p class="verdict">${needs.length ? `To master it: ${needs.join(", ")} need to reach 70%.` : "Every kind of evidence is above 70%. This topic is mastered."}</p>
    ${st === "new" ? "" : `<button type="button" class="btn btn-light lg btn-sm" id="review">${icon("flame")}<span>${st === "learning" ? "Continue" : "Review"} · 10 min</span></button>`}`}`;
}

function select(id, turn) {
  selected = id;
  draw();
  inspect();
  if (turn) globe?.faceTo(place[id]);
}

export function showTopic(id) {
  select(id, true);
  document.dispatchEvent(new CustomEvent("lifeos:goto", { detail: "earth" }));
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
}

export function initEarth(opts) {
  onReview = opts.onReview;
  const canvas = $("#earth-canvas");
  globe = createGlobe(canvas, {
    onPick: (id) => select(id),
    onHover: (id) => { canvas.title = id ? TOPICS.find((t) => t.id === id).name : ""; },
  });
  // keyboard and screen-reader route to every topic, since the globe itself is a picture
  const jump = $("#earth-jump");
  jump.innerHTML = Object.entries(MODULES).map(([key, m]) => `<optgroup label="${esc(m.name)}">${TOPICS.filter((t) => t.m === key).map((t) =>
    `<option value="${t.id}">${esc(t.name)} · ${STATES[stateOf(t)].label}</option>`).join("")}</optgroup>`).join("") +
    `<optgroup label="Year 3">${TOPICS.filter((t) => !t.m).map((t) => `<option value="${t.id}">${esc(t.name)} · Locked</option>`).join("")}</optgroup>`;
  jump.addEventListener("change", () => select(jump.value, true));
  $("#earth-in").addEventListener("click", () => globe.zoomBy(1.2));
  $("#earth-out").addEventListener("click", () => globe.zoomBy(1 / 1.2));
  $("#earth-reset").addEventListener("click", () => globe.reset());
  $("#inspector").addEventListener("click", (e) => {
    if (!e.target.closest("#review")) return;
    const t = TOPICS.find((x) => x.id === selected);
    t.wasFading = stateOf(t) === "fading";
    review(selected);
    onReview(t);
  });
  $("#earth-legend").innerHTML = ["mastered", "recent", "fading", "learning", "new"].map((s) =>
    `<span><i class="lg-dot ${s}"></i>${STATES[s].label}</span>`).join("") +
    '<span><i class="lg-dot portal"></i>Portal to another Gradify site</span><span><i class="lg-dot hub"></i>Learners studying now</span><span><i class="lg-road"></i>Prerequisite</span>';
  select(selected, true);
}
