// A sub-site's learning map: its subject as a world on the 3D globe, with everything Gradify
// Earth has. Each of the site's six areas is a glowing region and its subtopics are pins. The
// learner's own topics (from their notes on this site) are sorted into those areas and take the
// place of the subtopics they match, with real mastery from their answers; topics that fit no
// area gather in "Your notes". Pins without real data show example progress, and say so.
// Glowing city markers show learners of this subject around the world (example numbers), and
// portals arc out to related Gradify sites.
//   import { mountSubjectMap } from "../kit/earth/subject-map.js"; mountSubjectMap("MedGradify");
import { createGlobe, vec } from "./globe.js";
import { SITES, pathOf, nameHtml } from "../core/site.js";
import { SITES_CONTENT, RELATED } from "../core/site-content.js";
import { SITE_MAPS } from "../core/site-maps.js";
import { LocalStore, CloudStore, scopeToSite } from "../data/store.js";
import { topicProfiles } from "../learning/mastery.js";
import { matchTopics } from "../learning/topic-match.js";
import { loadLearner, schoolTopic } from "../learning/learner-data.js";
import { loadIndex } from "../ui/global-nav.js";
import { courseProgress } from "../ui/explore.js";
import { masteryMap, LEVEL } from "../learning/mastery-map.js";

const $ = (s) => document.querySelector(s);
import { esc } from "../core/text.js";
const CENTRES = [[50, 12], [6, 20], [24, 78], [-14, -58], [40, -98], [-25, 134]];
const MINE = [60, 100];   // northern Asia: clear of the six areas
// where pins sit around an area's centre: three subtopics, then extra topics of the learner's
const SPOTS = [[7, -13], [-9, 3], [4, 14], [15, 1], [-3, -22], [-15, 17], [17, 20], [-17, -11]];
const PALETTE = ["4641ff", "f055dd", "1fae8c", "ff5a4d", "ffc002", "3c78d8", "e69138", "a855f7"];
const EVIDENCE = ["Recall", "Explain", "Apply to new problems", "Retained over time", "Connected to other topics"];
const STATES = {
  mastered: ["Mastered", "Strong on every kind of evidence."],
  recent: ["Recently active", "Studied in the last day or two."],
  fading: ["Fading", "It's slipping. A short review brings it back."],
  learning: ["Learning", "Started, but not all the evidence is in yet."],
  new: ["Not started", "Add notes on this to start."],
};
const CITIES = [["New York", 40.7, -74], ["London", 51.5, -0.1], ["São Paulo", -23.5, -46.6], ["Lagos", 6.5, 3.4], ["Cape Town", -33.9, 18.4], ["Dubai", 25.2, 55.3], ["Mumbai", 19.1, 72.9], ["Tokyo", 35.7, 139.7], ["Sydney", -33.9, 151.2]];
// deterministic example numbers, so every visit shows the same map
const hash = (s) => { let h = 2166136261; for (const ch of s) h = Math.imul(h ^ ch.charCodeAt(0), 16777619); return (h >>> 0) / 4294967296; };
const rgb = (h) => [0, 2, 4].map((i) => parseInt(h.substr(i, 2), 16));
const at = (c, [dl, dn]) => vec(c[0] + dl, c[1] + dn / Math.cos((c[0] * Math.PI) / 180));

function exampleTopic(name, i) {
  const r = hash(name), kinds = ["mastered", "recent", "learning", "fading", "mastered", "new", "learning"];
  const state = kinds[Math.floor(r * kinds.length)];
  const base = { mastered: 86, recent: 82, learning: 55, fading: 60, new: 0 }[state];
  const ev = EVIDENCE.map((_, k) => (state === "new" ? 0 : Math.max(10, Math.min(98, Math.round(base + (hash(name + k) - 0.5) * 30 - (state === "fading" && k === 3 ? 25 : 0))))));
  return { state, ev, strength: Math.round(ev.reduce((a, b) => a + b, 0) / ev.length), days: state === "recent" ? (i % 2) : state === "new" ? null : 4 + Math.floor(r * 40) };
}
// a real topic's Mastery Engine profile, in the map's terms
function realTopic(t) {
  const recent = t.lastSeen && Date.now() - t.lastSeen < 2 * 864e5;
  const state = t.level === "new" ? "new" : t.level === "mastered" ? "mastered" : ["fading", "shaky"].includes(t.level) ? "fading" : recent ? "recent" : "learning";
  const pct = (x) => (x.value == null ? null : Math.round(x.value * 100));   // null: no evidence yet, never shown as 0%
  return { state, strength: Math.round(t.mastery * 100), ev: [pct(t.dims.recall), pct(t.dims.explain), pct(t.dims.apply), pct(t.dims.retention), Math.round(t.coverage * 100)],
    days: t.lastSeen ? Math.floor((Date.now() - t.lastSeen) / 864e5) : null, key: t.key, next: t.next, misconceptions: t.misconceptions.length, course: Boolean(t.course), href: t.href || null };
}

async function loadMine(siteName) {
  try {
    // signed in: the account; otherwise this device
    const cloud = await CloudStore.create(), user = cloud ? await cloud.user() : null;
    const store = scopeToSite(user ? cloud : new LocalStore(), siteName);
    const cards = await store.listCards();
    const profiles = topicProfiles(cards, await store.listReviews(400));
    // each topic's cards, as text for matching it to an area
    const text = {};
    for (const c of cards) { const k = `${c.document_id}|${c.topic || "Cards"}`; text[k] = `${text[k] || ""} ${c.front} ${c.back}`; }
    const decks = profiles.map((p) => ({ ...p, text: text[p.key] || "", doc: p.documentId }));
    // the schools of this site's courses that the learner has started, with their six-dimension mastery
    let schools = [];
    try { schools = (await loadLearner()).courses.filter((c) => c.site === siteName).flatMap((c) => c.schools.map((sch) => schoolTopic(c, sch))); } catch { /* no course progress */ }
    return [...decks, ...schools];
  } catch (e) { console.warn("Couldn't read your notes for the map", e); return []; }
}

// ---------- the course world: a site's course as the land itself ----------
// Each stage of the course is a region, each chapter a place in it, and the roads are what builds on what
// (kit/learning/chapter-map.js). Regions glow brighter as their chapters' mastery rises; mastered chapters become
// ringed landmarks; chapters not yet explored stay dim. All of it from the learner's own answers (kit/learning/
// mastery-map.js), so the world grows with real learning, not with time spent.
const GLOBE_STATE = { none: "new", learning: "learning", practising: "learning", proficient: "mastered", mastered: "mastered" };
const spiral = (k) => { const a = k * 2.399, r = k ? 5 + 3.4 * Math.sqrt(k) : 0; return [Math.sin(a) * r, Math.cos(a) * r * 1.3]; };
export function courseWorld(course, S, now = Date.now()) {
  const prog = courseProgress(S || {});
  const chapters = course.units.map(([id, n, title, lessons, , ti = -1]) => ({ n, id, title, ti, lessons: lessons.map((l) => l[0]) }));
  const map = masteryMap(chapters, course.cp || {}, prog.status, prog.right);
  // stages → at most six regions (consecutive stages share one when a course has more)
  const stages = course.T?.length ? course.T : ["Chapters"], per = Math.ceil(stages.length / 6);
  const regionOf = (ti) => Math.min(5, Math.floor(Math.max(0, ti) / per));
  const bare = (t) => String(t).replace(/^Stage\s+\d+\s*·\s*/i, "");
  const names = Array.from({ length: Math.min(6, Math.ceil(stages.length / per)) }, (_, r) => { const g = stages.slice(r * per, r * per + per); return g.length > 1 ? g.map(bare).join(" & ") : g[0]; });
  const recent = (ids) => ids.some((id) => S?.time?.[id]?.last && now - S.time[id].last < 2 * 864e5) || (S?.recent || []).some((r) => ids.includes(r.id) && now - r.t < 2 * 864e5);
  const places = map.nodes.map((x) => {
    const c = chapters.find((y) => y.n === x.n), state = x.revise ? "fading" : x.level === "learning" || x.level === "practising" ? (recent(c.lessons) ? "recent" : "learning") : GLOBE_STATE[x.level];
    return { ...x, region: regionOf(c.ti), state, strength: Math.round(x.score * 100), href: `${course.u}#/learn/${x.id}` };
  });
  const regions = names.map((name, r) => { const ps = places.filter((p) => p.region === r); return { name, places: ps, light: ps.length ? ps.reduce((a, p) => a + p.score, 0) / ps.length : 0 }; }).filter((r) => r.places.length);
  return { course, map, regions, places, roads: map.edges };
}

async function loadCourseWorld(siteName) {
  try {
    const idx = await loadIndex(), courses = (idx.courses || []).filter((c) => c.site === siteName);
    if (!courses.length) return null;
    const read = (slug) => { try { return JSON.parse(localStorage.getItem(`gradify.course.${slug}`) || "null"); } catch { return null; } };
    // the course the learner is furthest into on this site (or chose last), else the first
    const chosen = (() => { try { return sessionStorage.getItem(`gx-world:${siteName}`); } catch { return null; } })();
    const done = (c) => Object.keys(read(c.s)?.done || {}).length;
    const course = courses.find((c) => c.s === chosen) || [...courses].sort((a, b) => done(b) - done(a))[0];
    return { world: courseWorld(course, read(course.s)), courses };
  } catch (e) { console.warn("Couldn't build the course world", e); return null; }
}

export async function mountSubjectMap(siteName) {
  // shown inside LifeOS (app.html#/earth): just the map, without the site's own header and footer
  try { if (window.self !== window.top) document.body.classList.add("map-embedded"); } catch { /* cross-origin parent: leave the page as it is */ }
  const site = SITES.find((s) => s.n === siteName), content = SITES_CONTENT[siteName], subs = SITE_MAPS[siteName];
  if (!site || !content || !subs) return;
  const colours = [site.c, ...PALETTE.filter((c) => c !== site.c)];
  const areas = content.topics.map(([name, desc], i) => ({ name, desc, subs: subs[i], c: colours[i % colours.length], centre: CENTRES[i] }));

  // the learner's topics, sorted into the areas
  const mine = await loadMine(siteName);
  const cw = await loadCourseWorld(siteName);
  const { placed, unplaced } = cw ? { placed: [], unplaced: mine.filter((t) => !t.course) } : matchTopics(areas, mine);
  const pins = [], roads = [], info = {};
  const pinById = (id) => pins.find((p) => p.id === id);
  if (cw) {
    // the course's stages replace the site's example areas, and its chapters replace the example subtopics
    const W = cw.world, U = W.course.U;
    areas.length = 0;
    W.regions.forEach((r, i) => areas.push({ name: r.name, desc: "", c: colours[i % colours.length], centre: CENTRES[i], ids: [], light: r.light }));
    for (const p of W.places) {
      const a = areas.find((x) => x.name === W.regions.find((r) => r.places.includes(p)).name), k = a.ids.length, id = `c-${p.id}`;
      pins.push({ id, v: at(a.centre, spiral(k)), c: `#${a.c}`, name: `${p.n}. ${p.title}`, state: p.state, strength: p.strength });
      const c = p.counts, t = p.total || 1;
      info[id] = { area: a.name, c: a.c, course: true, href: p.href, state: p.state, strength: p.strength, level: p.level,
        ev: [Math.round(((t - c.new - c.started) / t) * 100), Math.round(((c.practised + c.mastered + c.revise) / t) * 100), Math.round((c.mastered / t) * 100)],
        evNames: ["Lessons done", "Lessons answered", "Lessons mastered"],
        next: { label: p.level === "none" ? `Start ${U} ${p.n}` : p.level === "mastered" ? "Revisit it" : `Continue ${U} ${p.n}`, why: `${LEVEL[p.level].label}${p.revise ? ", and recent answers have slipped" : ""}. ${p.pre.length ? `Builds on ${U} ${p.pre.join(", ")}.` : "A starting point."}` } };
      a.ids.push(id);
    }
    for (const e of W.roads) { const A = pinById(`c-${W.places.find((p) => p.n === e.from)?.id}`), B = pinById(`c-${W.places.find((p) => p.n === e.to)?.id}`); if (A && B) roads.push({ a: A.v, b: B.v, weak: ["new", "fading"].includes(B.state) }); }
  } else areas.forEach((a, i) => {
    const here = placed.filter((p) => p.area === i);
    const bySlot = new Map(here.filter((p) => p.slot != null).map((p) => [p.slot, p.topic]));
    const extras = here.filter((p) => p.slot == null).map((p) => p.topic);
    // the three subtopics (or the learner's topic standing in for one), then their extra topics
    const items = a.subs.map((sub, j) => (bySlot.has(j) ? { real: bySlot.get(j) } : { sub, j })).concat(extras.slice(0, SPOTS.length - 3).map((t) => ({ real: t })));
    a.ids = items.map((it, k) => {
      const v = at(a.centre, SPOTS[k]);
      let id;
      if (it.real) {
        const r = realTopic(it.real);
        id = `r-${it.real.key}`;
        pins.push({ id, v, c: `#${a.c}`, name: it.real.topic, state: r.state, strength: r.strength });
        info[id] = { area: a.name, c: a.c, ...r };
      } else {
        const ex = exampleTopic(`${siteName}/${it.sub}`, it.j);
        id = `t${i}-${it.j}`;
        pins.push({ id, v, c: `#${a.c}`, name: it.sub, state: ex.state, strength: ex.strength });
        info[id] = { area: a.name, c: a.c, ...ex, example: true };
      }
      if (k) roads.push({ a: pins.at(-2).v, b: v, weak: ["fading", "new"].includes(pins.at(-1).state) });
      return id;
    });
    if (i) roads.push({ a: pinById(areas[i - 1].ids.at(-1)).v, b: pinById(a.ids[0]).v, weak: true });
  });
  // a region's glow is how far its chapters (or topics) have really got: it brightens as they're mastered
  const regions = areas.map((a) => ({ v: vec(...a.centre), radius: cw ? 0.28 + Math.min(0.12, a.ids.length * 0.008) : 0.32, rgb: rgb(a.c), light: a.light ?? a.ids.reduce((s, id) => s + pinById(id).strength, 0) / (a.ids.length * 100) }));
  // topics that fit no area
  const loose = unplaced.slice(0, 8);
  loose.forEach((t, k) => {
    const a = (k / Math.max(1, loose.length)) * Math.PI * 2, r = loose.length > 1 ? 9 : 0, rt = realTopic(t), id = `r-${t.key}`;
    pins.push({ id, v: vec(MINE[0] + Math.sin(a) * r, MINE[1] + Math.cos(a) * r * 2.2), c: "#ffffff", name: t.topic, state: rt.state, strength: rt.strength });
    info[id] = { area: "Your topics", c: "ffffff", ...rt };
  });
  if (loose.length) regions.push({ v: vec(...MINE), radius: 0.3, rgb: [230, 230, 240], light: loose.reduce((s, t) => s + t.mastery, 0) / loose.length });

  // learners of this subject around the world (example numbers)
  const hubs = CITIES.map(([name, lat, lon]) => {
    const n = 20 + Math.floor(hash(`${siteName}@${name}`) * 300);
    return { id: `hub:${name}`, name, v: vec(lat, lon), n, by: areas.map((a) => Math.round(n * (0.08 + hash(`${siteName}@${name}/${a.name}`) * 0.3))) };
  });
  // portals to the two most related Gradify sites
  const related = (RELATED[siteName] || []).map((n) => SITES.find((s) => s.n === n && s.built)).filter(Boolean);
  // anchored in the first and fourth areas (or the last there is: a course world can have fewer than four regions)
  const portals = related.map((s, k) => { const a = areas[Math.min(k * 3, areas.length - 1)]; return a && { v: at(a.centre, SPOTS[0]), dir: k ? [-0.35, 0.45, 0.15] : [0.3, -0.45, 0.15], c: `#${s.c}`, site: s.n }; }).filter(Boolean);

  const canvas = $("#earth-canvas");
  const firstReal = pins.find((p) => !info[p.id].example);
  let selected = (cw && (pins.find((p) => p.state === "recent") || pins.find((p) => p.state === "learning") || pins.find((p) => p.state === "fading"))?.id) || firstReal?.id || pins.find((p) => p.state === "fading")?.id || pins[0].id, lastTopic = selected;
  const globe = createGlobe(canvas, {
    onPick: (id) => select(id),
    onHover: (id) => { const h = hubs.find((x) => x.id === id); canvas.title = h ? `${h.name}: ${h.n} studying ${site.n} now` : id ? pinById(id).name : ""; },
  });
  const draw = () => globe.setScene({ regions, pins, roads, portals, hubs, selected, rings: true });

  function inspectHub(h) {
    const top = Math.max(...h.by), el = $("#inspector");
    el.style.setProperty("--c", "#ff8a3d");
    el.innerHTML = `
      <span class="kicker">Learners studying now · example</span>
      <b class="topic">${esc(h.name)}</b>
      <span class="state-pill hub">${h.n} studying ${esc(site.n)}</span>
      <p>What they're working on right now, by area.</p>
      <ul class="evidence">${areas.map((a, i) => `<li style="--c:#${a.c}"><span>${esc(a.name)}</span><em>${h.by[i]}</em><i><b style="width:${Math.round((h.by[i] / top) * 100)}%" class="ok"></b></i></li>`).join("")}</ul>
      <div class="hub-actions"><a class="btn btn-light lg btn-sm" href="/#group"><span>Find a study group</span></a><button type="button" class="btn btn-ghost lg btn-sm" data-back><span>Back to your topic</span></button></div>`;
  }
  function inspect() {
    const hub = hubs.find((h) => h.id === selected);
    if (hub) return inspectHub(hub);
    const t = info[selected], p = pinById(selected), [label, note] = STATES[t.state];
    const evName = (i) => (t.evNames ? t.evNames[i] : i === 4 && !t.example ? (t.course ? "Lessons done" : "Cards tested") : EVIDENCE[i]);
    const needs = t.ev.map((v, i) => [v, evName(i)]).filter(([v]) => v != null && v < 70).map(([, n]) => n.toLowerCase());
    const el = $("#inspector");
    el.style.setProperty("--c", `#${t.c}`);
    const days = t.days == null ? "" : ` Last studied ${t.days === 0 ? "today" : t.days === 1 ? "yesterday" : `${t.days} days ago`}.`;
    const action = t.example
      ? `<a class="btn btn-light lg btn-sm" href="app.html#/new"><span>Add notes on this</span></a>`
      : t.course ? `<a class="btn btn-light lg btn-sm" href="${esc(t.href)}"><span>${esc(t.next?.label || "Open")}</span></a>`
      : `<a class="btn btn-light lg btn-sm" href="app.html#/study/t:${encodeURIComponent(t.key)}"><span>${esc(t.next?.kind === "done" ? "Practise anyway" : t.next?.label || "Practise")}${t.next?.mins ? ` · ${t.next.mins} min` : ""}</span></a>
         <a class="btn btn-ghost lg btn-sm" href="app.html#/topic/${encodeURIComponent(t.key)}"><span>Full profile</span></a>`;
    el.innerHTML = `
      <span class="kicker">${esc(t.area)}${t.example ? " · example" : t.course ? ` · ${t.level ? esc(LEVEL[t.level].label) : "your course"}` : " · your notes"}</span>
      <b class="topic">${esc(p.name)}</b>
      <span class="state-pill ${t.state}">${label}</span>
      <p>${t.example ? note + days : esc(t.next?.why || note) + days}</p>
      ${t.misconceptions ? `<p class="verdict">${t.misconceptions} possible ${t.misconceptions === 1 ? "misconception" : "misconceptions"} to check.</p>` : ""}
      ${t.state === "new" ? "" : `<ul class="evidence">${t.ev.map((v, i) => `<li><span>${evName(i)}</span><em>${v == null ? "no evidence yet" : `${v}%`}</em><i><b style="width:${v ?? 0}%" class="${v >= 70 ? "ok" : ""}"></b></i></li>`).join("")}</ul>
      <p class="verdict">${needs.length ? `To master it: ${needs.join(", ")} need to reach 70%.` : t.ev.some((v) => v == null) ? "What's measured is above 70%; the rest needs more answers before Gradify can judge it." : "Every kind of evidence is above 70%."}</p>`}
      <div class="hub-actions">${action}</div>`;
  }
  function select(id, turn) {
    selected = id;
    if (!id.startsWith("hub:")) lastTopic = id;
    draw(); inspect();
    $("#earth-jump").value = selected;
    if (turn) globe.faceTo((pinById(id) || hubs.find((h) => h.id === id)).v);
  }
  $("#inspector").addEventListener("click", (e) => { if (e.target.closest("[data-back]")) select(lastTopic, true); });

  const opt = (id, label) => `<option value="${esc(id)}">${esc(label)}</option>`;
  $("#earth-jump").innerHTML = areas.map((a) => `<optgroup label="${esc(a.name)}">${a.ids.map((id) => opt(id, pinById(id).name + (info[id].example ? "" : " · yours"))).join("")}</optgroup>`).join("") +
    (loose.length ? `<optgroup label="Your topics">${loose.map((t) => opt(`r-${t.key}`, t.topic)).join("")}</optgroup>` : "") +
    `<optgroup label="Learners studying now">${hubs.map((h) => opt(h.id, `${h.name} · ${h.n} studying`)).join("")}</optgroup>`;
  $("#earth-jump").addEventListener("change", (e) => select(e.target.value, true));
  $("#earth-in").addEventListener("click", () => globe.zoomBy(1.2));
  $("#earth-out").addEventListener("click", () => globe.zoomBy(1 / 1.2));
  $("#earth-reset").addEventListener("click", () => globe.reset());
  $("#earth-legend").innerHTML = ["mastered", "recent", "fading", "learning", "new"].map((s) => `<span><i class="lg-dot ${s}"></i>${STATES[s][0]}</span>`).join("") +
    '<span><i class="lg-dot hub"></i>Learners studying now</span>' + (portals.length ? '<span><i class="lg-dot portal"></i>Portal to another Gradify site</span>' : "") + '<span><i class="lg-road"></i>Leads on to</span>';

  // a summary above the map, and the portals as links below it
  const real = Object.values(info).filter((t) => !t.example);
  if (cw) {
    const W = cw.world, sm = W.map.summary, n = W.places.length;
    $("#map-note").innerHTML = `${esc(W.course.n)}: every ${esc(W.course.U.toLowerCase())} is a place, grouped into the course's stages, with roads to what builds on it. Places light up as your answers show you know them; mastered ones become landmarks.${cw.courses.length > 1 ? ` <span class="map-courses">${cw.courses.map((c) => `<button type="button" data-world="${esc(c.s)}" aria-pressed="${c.s === W.course.s}">${esc(c.n)}</button>`).join("")}</span>` : ""}`;
    $("#map-stats").innerHTML = `<div><b>${n}</b><span>${esc(W.course.U.toLowerCase())}s</span></div><div><b>${sm.mastered + sm.proficient}</b><span>landmarks</span></div><div><b>${sm.learning + sm.practising}</b><span>in progress</span></div><div><b>${sm.revise}</b><span>fading</span></div><a class="btn btn-ghost lg btn-sm" href="/explore.html#/course/${esc(W.course.s)}"><span>Mastery map</span></a>`;
    $("#map-note").addEventListener("click", (e) => { const b = e.target.closest("[data-world]"); if (!b) return; try { sessionStorage.setItem(`gx-world:${siteName}`, b.dataset.world); } catch { /* private mode */ } location.reload(); });
    $("#map-portals").innerHTML = related.length ? `<span>Portals</span>${related.map((s) => `<a href="${pathOf(s)}map.html">${nameHtml(s)} map →</a>`).join("")}` : "";
    select(selected, true);
    return;
  }
  const count = (s) => real.filter((t) => t.state === s).length;
  $("#map-note").textContent = real.length
    ? `${real.length} of your topics are on the map, sorted into ${site.n}'s areas. Pins marked "example" are topics you haven't added notes on yet.`
    : `This is an example of ${site.n}'s map. Add your notes and your own topics take the place of the examples, with your real progress.`;
  $("#map-stats").innerHTML = real.length
    ? `<div><b>${real.length}</b><span>your topics</span></div><div><b>${count("mastered")}</b><span>mastered</span></div><div><b>${count("fading")}</b><span>fading</span></div><div><b>${count("learning") + count("recent")}</b><span>in progress</span></div>`
    : `<div><b>0</b><span>of your topics yet</span></div><a class="btn btn-light lg btn-sm" href="app.html#/new"><span>Add your first notes</span></a>`;
  $("#map-portals").innerHTML = related.length ? `<span>Portals</span>${related.map((s) => `<a href="${pathOf(s)}map.html">${nameHtml(s)} map →</a>`).join("")}` : "";
  select(selected, true);
}
