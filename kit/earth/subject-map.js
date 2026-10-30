// A sub-site's learning map: its subject as a world on the 3D globe. Each of the site's six
// topic areas is a glowing region, its subtopics are pins, and arcs join them in order. The
// levels on those pins are example data. Any notes the learner has added on this site appear
// as their own region ("Your notes"), with real mastery from their answers.
//   import { mountSubjectMap } from "../kit/earth/subject-map.js"; mountSubjectMap("MedGradify");
import { createGlobe, vec } from "./globe.js";
import { SITES } from "../core/site.js";
import { SITES_CONTENT } from "../core/site-content.js";
import { SITE_MAPS } from "../core/site-maps.js";
import { LocalStore, CloudStore, scopeToSite } from "../data/store.js";
import { topicProfiles } from "../learning/mastery.js";

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
const CENTRES = [[50, 12], [6, 20], [24, 78], [-14, -58], [40, -98], [-25, 134]];
const MINE = [60, 100];   // northern Asia: clear of the six areas
const PALETTE = ["4641ff", "f055dd", "1fae8c", "ff5a4d", "ffc002", "3c78d8", "e69138", "a855f7"];
const EVIDENCE = ["Recall", "Explain", "Apply to new problems", "Retained over time", "Connected to other topics"];
const STATES = {
  mastered: ["Mastered", "Strong on every kind of evidence."],
  recent: ["Recently active", "Studied in the last day or two."],
  fading: ["Fading", "It's slipping. A short review brings it back."],
  learning: ["Learning", "Started, but not all the evidence is in yet."],
  new: ["Not started", "Add notes on this to start."],
};
// deterministic example evidence, so every visit shows the same map
const hash = (s) => { let h = 2166136261; for (const ch of s) h = Math.imul(h ^ ch.charCodeAt(0), 16777619); return (h >>> 0) / 4294967296; };
const rgb = (h) => [0, 2, 4].map((i) => parseInt(h.substr(i, 2), 16));

function exampleTopic(name, i) {
  const r = hash(name), kinds = ["mastered", "recent", "learning", "fading", "mastered", "new", "learning"];
  const state = kinds[Math.floor(r * kinds.length)];
  const base = { mastered: 86, recent: 82, learning: 55, fading: 60, new: 0 }[state];
  const ev = EVIDENCE.map((_, k) => (state === "new" ? 0 : Math.max(10, Math.min(98, Math.round(base + (hash(name + k) - 0.5) * 30 - (state === "fading" && k === 3 ? 25 : 0))))));
  return { state, ev, strength: Math.round(ev.reduce((a, b) => a + b, 0) / ev.length), days: state === "recent" ? (i % 2) : state === "new" ? null : 4 + Math.floor(r * 40) };
}

export async function mountSubjectMap(siteName) {
  const site = SITES.find((s) => s.n === siteName), content = SITES_CONTENT[siteName], subs = SITE_MAPS[siteName];
  if (!site || !content || !subs) return;
  const colours = [site.c, ...PALETTE.filter((c) => c !== site.c)];
  const areas = content.topics.map(([name], i) => ({ name, c: colours[i % colours.length], centre: CENTRES[i] }));
  const pins = [], roads = [], info = {};
  areas.forEach((a, i) => {
    subs[i].forEach((sub, j) => {
      const id = `t${i}-${j}`, ex = exampleTopic(`${siteName}/${sub}`, j);
      // three pins in a little triangle around the region's centre
      const [dl, dn] = [[5, -9], [-7, 2], [3, 10]][j];
      const v = vec(a.centre[0] + dl, a.centre[1] + dn / Math.cos((a.centre[0] * Math.PI) / 180));
      pins.push({ id, v, c: `#${a.c}`, name: sub, state: ex.state, strength: ex.strength });
      info[id] = { area: a.name, c: a.c, ...ex, example: true };
      if (j) roads.push({ a: pins.at(-2).v, b: v, weak: ["fading", "new"].includes(ex.state) });
    });
    if (i) roads.push({ a: pins[(i - 1) * 3 + 2].v, b: pins[i * 3].v, weak: true });
  });
  const regions = areas.map((a, i) => ({ v: vec(...a.centre), radius: 0.3, rgb: rgb(a.c), light: pins.slice(i * 3, i * 3 + 3).reduce((s, p) => s + p.strength, 0) / 300 }));

  // the learner's own topics on this site, from their real answers
  let mine = [];
  try {
    // signed in: the account; otherwise this device
    const cloud = await CloudStore.create(), user = cloud ? await cloud.user() : null;
    const store = scopeToSite(user ? cloud : new LocalStore(), siteName);
    mine = topicProfiles(await store.listCards(), await store.listReviews(400)).slice(0, 8);
  } catch (e) { console.warn("Couldn't read your notes for the map", e); }
  mine.forEach((t, k) => {
    const id = `mine-${k}`, a = (k / Math.max(1, mine.length)) * Math.PI * 2, r = mine.length > 1 ? 9 : 0;
    // a ring of pins; longitude stretched because degrees are narrower this far north
    const v = vec(MINE[0] + Math.sin(a) * r, MINE[1] + Math.cos(a) * r * 2.2);
    const recent = t.lastSeen && Date.now() - t.lastSeen < 2 * 864e5;
    const state = t.level === "new" ? "new" : t.level === "mastered" ? "mastered" : ["fading", "shaky"].includes(t.level) ? "fading" : recent ? "recent" : "learning";
    const d = t.dims, pct = (x) => (x.value == null ? 0 : Math.round(x.value * 100));
    pins.push({ id, v, c: "#ffffff", name: t.topic, state, strength: Math.round(t.mastery * 100) });
    info[id] = { area: "Your notes", c: "ffffff", state, ev: [pct(d.recall), pct(d.explain), pct(d.apply), pct(d.retention), Math.round(t.coverage * 100)], days: t.lastSeen ? Math.floor((Date.now() - t.lastSeen) / 864e5) : null, key: t.key, next: t.next };
  });
  if (mine.length) regions.push({ v: vec(...MINE), radius: 0.3, rgb: [230, 230, 240], light: mine.reduce((s, t) => s + t.mastery, 0) / mine.length });

  const canvas = $("#earth-canvas");
  let selected = mine.length ? "mine-0" : pins.find((p) => p.state === "fading")?.id || pins[0].id;
  const globe = createGlobe(canvas, { onPick: (id) => select(id), onHover: (id) => { canvas.title = id ? pins.find((p) => p.id === id).name : ""; } });
  const draw = () => globe.setScene({ regions, pins, roads, portals: [], hubs: [], selected, rings: true });

  function inspect() {
    const t = info[selected], p = pins.find((x) => x.id === selected), [label, note] = STATES[t.state];
    const needs = t.ev.map((v, i) => [v, EVIDENCE[i]]).filter(([v]) => v < 70).map(([, n]) => n.toLowerCase());
    const el = $("#inspector");
    el.style.setProperty("--c", `#${t.c}`);
    const days = t.days == null ? "" : ` Last studied ${t.days === 0 ? "today" : t.days === 1 ? "yesterday" : `${t.days} days ago`}.`;
    el.innerHTML = `
      <span class="kicker">${esc(t.area)}${t.example ? " · example" : " · from your answers"}</span>
      <b class="topic">${esc(p.name)}</b>
      <span class="state-pill ${t.state}">${label}</span>
      <p>${t.example ? note + days : esc(t.next?.why || note) + days}</p>
      ${t.state === "new" ? "" : `<ul class="evidence">${t.ev.map((v, i) => `<li><span>${i === 4 && !t.example ? "Cards tested" : EVIDENCE[i]}</span><em>${v}%</em><i><b style="width:${v}%" class="${v >= 70 ? "ok" : ""}"></b></i></li>`).join("")}</ul>
      <p class="verdict">${needs.length ? `To master it: ${needs.join(", ")} need to reach 70%.` : "Every kind of evidence is above 70%."}</p>`}
      <a class="btn btn-light lg btn-sm" href="${t.example ? "app.html#/new" : `app.html#/topic/${encodeURIComponent(t.key)}`}"><span>${t.example ? "Add notes on this" : "Open this topic"}</span></a>`;
    $("#earth-jump").value = selected;
  }
  function select(id, turn) {
    selected = id; draw(); inspect();
    if (turn) globe.faceTo(pins.find((p) => p.id === id).v);
  }

  $("#earth-jump").innerHTML = areas.map((a, i) => `<optgroup label="${esc(a.name)}">${subs[i].map((s, j) => `<option value="t${i}-${j}">${esc(s)}</option>`).join("")}</optgroup>`).join("") +
    (mine.length ? `<optgroup label="Your notes">${mine.map((t, k) => `<option value="mine-${k}">${esc(t.topic)}</option>`).join("")}</optgroup>` : "");
  $("#earth-jump").addEventListener("change", (e) => select(e.target.value, true));
  $("#earth-in").addEventListener("click", () => globe.zoomBy(1.2));
  $("#earth-out").addEventListener("click", () => globe.zoomBy(1 / 1.2));
  $("#earth-reset").addEventListener("click", () => globe.reset());
  $("#earth-legend").innerHTML = ["mastered", "recent", "fading", "learning", "new"].map((s) => `<span><i class="lg-dot ${s}"></i>${STATES[s][0]}</span>`).join("") + '<span><i class="lg-road"></i>Leads on to</span>';
  $("#map-note").textContent = mine.length
    ? `The six areas show example progress. "Your notes" shows your real progress on ${site.n}.`
    : `This is an example of ${site.n}'s map. Add your notes and your own topics appear here, with your real progress.`;
  select(selected, true);
}
