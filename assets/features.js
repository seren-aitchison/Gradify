// Homepage showcase: every Gradify feature as a floating bubble, and "The Gradify road",
// a winding road with a car that drives along it as you scroll.
import { icon } from "../kit/core/icons.js";
import { tile, ink } from "../kit/core/colour.js";

const $ = (s, el = document) => el.querySelector(s);

// where: web, app or both. try: a LifeOS view or element to open in the preview.
const CATS = {
  learn: { name: "Learn", c: "4641ff" },
  create: { name: "Notes and creation", c: "f055dd" },
  practise: { name: "Practise", c: "ff5a4d" },
  progress: { name: "Progress and rewards", c: "ffc002" },
  people: { name: "People", c: "1fae8c" },
};
export const FEATURES = [
  // learn
  { n: "Online courses", cat: "learn", i: "cap", where: "both", d: "Full courses on every Gradify site, with interim quizzes along the way and a verified credential at the end.", size: 3 },
  { n: "Explainer videos", cat: "learn", i: "sparkles", where: "both", d: "Short, high-quality explainers for every topic, edited to keep attention.", try: "capture", size: 2 },
  { n: "Tutorials and simulations", cat: "learn", i: "atom", where: "web", d: "Interactive tutorials and digital simulations, from a beating heart to a trading floor.", size: 2 },
  { n: "Chant podcasts", cat: "learn", i: "music", where: "both", d: "Repetition and chant episodes that make key facts stick on a walk or a commute.", try: "capture", size: 2 },
  { n: "Audio questions", cat: "learn", i: "bell", where: "app", d: "Questions read aloud, a pause to answer, then the answer. Hands-free revision.", try: "capture", size: 1 },
  { n: "Story posters", cat: "learn", i: "palette", where: "both", d: "Posters that tell a topic as a picture story, made in Figma and Procreate. Interactive versions hide key words as clozes.", try: "capture", size: 2 },
  { n: "Dictionaries and thesauruses", cat: "learn", i: "book", where: "web", d: "Subject dictionaries for every site, with a thesaurus for writing.", size: 1 },
  { n: "Key-terms sheets", cat: "learn", i: "checklist", where: "both", d: "A key-terms sheet for every mini topic, ready to print.", try: "capture", size: 1 },
  { n: "Bonus facts and boosting", cat: "learn", i: "star", where: "app", d: "Bonus facts pop up as you learn, and key facts get boosted so you see them more.", try: "study", size: 1 },
  // notes and creation
  { n: "Notes Studio", cat: "create", i: "upload", where: "both", d: "Turn a PDF of messy notes into clean notes, flashcards, a spidermap, a cheat sheet, a video and a song.", try: "capture", size: 3, live: true },
  { n: "Notebook", cat: "create", i: "feather", where: "both", d: "A personal notebook like RemNote or Notion: linked notes, customisable pages, and any line can become a flashcard.", size: 2 },
  { n: "Handwriting to text", cat: "create", i: "pencil", where: "app", d: "Write by hand on a tablet or phone and get searchable text.", size: 1 },
  { n: "Notes to songs", cat: "create", i: "music", where: "app", d: "Any notes become a catchy song or chant.", try: "capture", size: 2, live: true },
  { n: "YouTube to notes", cat: "create", i: "share", where: "web", d: "Paste a YouTube link and get notes, flashcards and a chat about the video.", size: 2 },
  { n: "Spidermaps", cat: "create", i: "route", where: "both", d: "Every fact you learn joins your spidermap, with acronyms linking the terms.", try: "capture", size: 2, live: true },
  { n: "Downloadable resources", cat: "create", i: "upload", where: "web", d: "Notes, posters and sheets to download and print.", try: "capture", size: 1, live: true },
  // practise
  { n: "Flashcard feed", cat: "practise", i: "layers", where: "both", d: "A constant-scroll feed of flashcards, mixed with study hacks and inspiring reminders. Zoom out to see your cards as a Pinterest-style board.", try: "study", size: 3, live: true },
  { n: "Confidence ratings", cat: "practise", i: "heartbeat", where: "app", d: "Rate how well you knew every card, get feedback on each, and it comes back at the right time.", try: "study", size: 2, live: true },
  { n: "Adaptive difficulty", cat: "practise", i: "sparkles", where: "both", d: "Gradify AI makes questions harder or easier as you go.", size: 1 },
  { n: "Timed quiz mode", cat: "practise", i: "flame", where: "app", d: "Practise against the clock, like the real exam.", try: "study", size: 1, live: true },
  { n: "Question bank", cat: "practise", i: "board", where: "web", d: "A bank of practice questions with marked feedback on every answer.", size: 2 },
  { n: "Key-term games", cat: "practise", i: "trophy", where: "both", d: "Quick games for learning the key terms of any topic.", size: 1 },
  { n: "Interim quizzes", cat: "practise", i: "checklist", where: "web", d: "Short quizzes through every course, so you know where you stand.", size: 1 },
  // progress and rewards
  { n: "Gradify Tree", cat: "progress", i: "leaf", where: "app", d: "A tree that grows with your learning, with a branch for every subject.", try: "tree", size: 3, live: true },
  { n: "Heatmap", cat: "progress", i: "calendar", where: "both", d: "Every day of learning across every Gradify site, in one heatmap.", try: "life-heat", size: 2, live: true },
  { n: "XP and levels", cat: "progress", i: "star", where: "both", d: "Earn XP for everything you learn and level up.", try: "command", size: 2, live: true },
  { n: "Streaks", cat: "progress", i: "flame", where: "both", d: "Daily streaks, and streaks of correct answers.", try: "life-heat", size: 1, live: true },
  { n: "Challenges", cat: "progress", i: "trophy", where: "app", d: "Daily and weekly challenges across your Gradify sites.", try: "view-community", size: 1, live: true },
  { n: "Reward scheme", cat: "progress", i: "award", where: "both", d: "Rewards for milestones like 1,000 questions answered or a 100-day streak.", size: 2 },
  { n: "Projects for XP", cat: "progress", i: "briefcase", where: "web", d: "Real projects to complete for XP and your portfolio.", size: 1 },
  { n: "Smart reminders", cat: "progress", i: "bell", where: "app", d: "Reminders that know your deadlines and your streak.", try: "view-settings", size: 1, live: true },
  { n: "Time blocking", cat: "progress", i: "calendar", where: "both", d: "Plan your week in blocks, and let Gradify auto-plan your revision.", try: "plan-cal", size: 3, live: true },
  // people
  { n: "Gradify AI", cat: "people", i: "sparkles", where: "both", d: "An AI chat in the corner of every page, that knows your progress on every site.", try: "ai", size: 3, live: true },
  { n: "Tutors", cat: "people", i: "people", where: "web", d: "Book a tutor for any subject.", size: 2 },
  { n: "Student mentors", cat: "people", i: "people", where: "web", d: "Get advice from students a year or two ahead of you.", size: 1 },
  { n: "Study groups", cat: "people", i: "people", where: "both", d: "Virtual study groups with shared sessions and quizzes.", try: "view-community", size: 2, live: true },
  { n: "Friends and school leaderboards", cat: "people", i: "trophy", where: "app", d: "Follow friends and see your school's leaderboard. Always optional.", try: "view-community", size: 2, live: true },
  { n: "Community chats", cat: "people", i: "share", where: "web", d: "Chats for every subject and site.", size: 1 },
  { n: "InternshipGradify", cat: "people", i: "badge", where: "web", d: "Internships and work experience, matched to what you've learned.", size: 2 },
];

const WHERE = { web: "Website", app: "App", both: "Website and app" };

function renderBubbles(filter) {
  const list = FEATURES.filter((f) => filter === "all" || f.cat === filter);
  $("#bubbles").innerHTML = list.map((f, i) => {
    const c = CATS[f.cat].c;
    return `<button type="button" class="bubble s${f.size}" data-n="${f.n}" style="--c:#${c};--tile:${tile(c)};--ink:${ink(c)};--d:${(i * 0.37) % 5}s;--t:${6 + (i % 5)}s">
      <span class="b-ico">${icon(f.i)}</span><span class="b-name">${f.n}</span>${f.live ? '<i class="b-live" title="Try it in the LifeOS preview"></i>' : ""}</button>`;
  }).join("");
}
function showDetail(f) {
  const c = CATS[f.cat].c;
  $("#bubble-detail").innerHTML = `
    <span class="b-ico big" style="--c:#${c};--tile:${tile(c)};--ink:${ink(c)}">${icon(f.i)}</span>
    <span class="kicker">${CATS[f.cat].name} · ${WHERE[f.where]}</span>
    <h3>${f.n}</h3>
    <p>${f.d}</p>
    ${f.live ? `<a class="btn btn-light lg btn-sm" href="#${f.try}"><span>Try it in the LifeOS preview</span></a>` : `<span class="pill-dark">Coming soon</span>`}`;
}

// ---------- The Gradify road ----------
const STOPS = [
  { t: "Find your site", d: "Pick the Gradify site for your stage, job or subject." },
  { t: "Learn every day", d: "Courses, the flashcard feed, Notes Studio and Gradify AI." },
  { t: "Build streaks", d: "XP, levels, challenges and your growing Gradify Tree." },
  { t: "Prove it", d: "Finish courses and earn credentials anyone can verify." },
  { t: "InternshipGradify", d: "Turn what you've learned into real work experience." },
  { t: "Your career", d: "LifeOS keeps tracking your progress, for life." },
];
// The car, seen from above and pointing right: a glossy white body with the spectrum roof,
// tinted windows, tyres tucked under, headlights throwing a soft beam, and tail lights.
const CAR = `
  <path d="M27 -10 L120 -40 Q128 -12 112 4 L27 -5 Z" fill="url(#rd-beam)"/>
  <path d="M27 5 L112 -4 Q128 12 120 40 L27 10 Z" fill="url(#rd-beam)"/>
  <ellipse cx="0" cy="4" rx="31" ry="17" fill="url(#rd-shadow)"/>
  <rect x="-20" y="-17" width="13" height="6" rx="2.5" fill="#0b0b0b"/><rect x="10" y="-17" width="13" height="6" rx="2.5" fill="#0b0b0b"/>
  <rect x="-20" y="11" width="13" height="6" rx="2.5" fill="#0b0b0b"/><rect x="10" y="11" width="13" height="6" rx="2.5" fill="#0b0b0b"/>
  <path d="M-27 -6 Q-27 -14 -18 -14 H14 Q26 -14 29 -5 Q30 0 29 5 Q26 14 14 14 H-18 Q-27 14 -27 6 Z" fill="url(#rd-body)" stroke="rgba(0,0,0,.25)" stroke-width=".8"/>
  <path d="M-12 -10 H8 Q12 -10 12 -6 V6 Q12 10 8 10 H-12 Q-16 10 -16 6 V-6 Q-16 -10 -12 -10 Z" fill="url(#roadg)"/>
  <path d="M12 -8.5 Q19 -6 19 0 Q19 6 12 8.5 Z" fill="#141826" opacity=".9"/>
  <path d="M-16 -7.5 Q-21 -5 -21 0 Q-21 5 -16 7.5 Z" fill="#141826" opacity=".8"/>
  <path d="M-10 -9 H6" stroke="#fff" stroke-opacity=".55" stroke-width="1.2" stroke-linecap="round"/>
  <circle cx="28" cy="-7.5" r="11" fill="url(#rd-lamp)"/><circle cx="28" cy="7.5" r="11" fill="url(#rd-lamp)"/>
  <rect x="25" y="-11" width="5" height="6" rx="2" fill="#fffbe6"/><rect x="25" y="5" width="5" height="6" rx="2" fill="#fffbe6"/>
  <circle cx="-28" cy="-8" r="7" fill="url(#rd-tail)"/><circle cx="-28" cy="8" r="7" fill="url(#rd-tail)"/>
  <rect x="-29" y="-11" width="3.5" height="6" rx="1.4" fill="#ff5a4d"/><rect x="-29" y="5" width="3.5" height="6" rx="1.4" fill="#ff5a4d"/>`;
// gradients only (no filters or blend modes), so the lights show in every browser
const ROAD_DEFS = `<defs>
    <linearGradient id="roadg" x1="0" x2="1"><stop offset="0" stop-color="#4641ff"/><stop offset=".35" stop-color="#f055dd"/><stop offset=".7" stop-color="#ff5600"/><stop offset="1" stop-color="#ffc002"/></linearGradient>
    <linearGradient id="roadgv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4641ff"/><stop offset=".35" stop-color="#f055dd"/><stop offset=".7" stop-color="#ff5600"/><stop offset="1" stop-color="#ffc002"/></linearGradient>
    <linearGradient id="rd-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#eeeef2"/><stop offset="1" stop-color="#c9c9d2"/></linearGradient>
    <linearGradient id="rd-beam" x1="0" x2="1"><stop offset="0" stop-color="#fff3b8" stop-opacity=".7"/><stop offset=".45" stop-color="#fff3b8" stop-opacity=".25"/><stop offset="1" stop-color="#fff3b8" stop-opacity="0"/></linearGradient>
    <radialGradient id="rd-lamp"><stop offset="0" stop-color="#fffbe6" stop-opacity=".95"/><stop offset=".35" stop-color="#ffe9a3" stop-opacity=".55"/><stop offset="1" stop-color="#ffe9a3" stop-opacity="0"/></radialGradient>
    <radialGradient id="rd-tail"><stop offset="0" stop-color="#ff5a4d" stop-opacity=".85"/><stop offset="1" stop-color="#ff5a4d" stop-opacity="0"/></radialGradient>
    <radialGradient id="rd-shadow"><stop offset=".55" stop-color="#000" stop-opacity=".55"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
    <radialGradient id="rd-halo"><stop offset="0" stop-color="#fff" stop-opacity=".2"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
  </defs>`;
// Desktop: the road winds left to right. Phones: it winds down the screen, with each stop's words beside it.
const ROADS = {
  wide: { W: 1000, H: 470, y0: 40, grad: "roadg", d: "M40 440 C 200 440 180 300 330 300 S 470 440 600 420 S 720 200 860 200 S 960 90 960 70",
    // where each stop's label sits, relative to the stop
    tags: [[16, -44], [0, -40], [70, -48], [10, 46], [-8, -40], [-70, 8]] },
  // the road winds down the left; the words sit in a column on the right
  tall: { W: 400, H: 1100, y0: 0, grad: "roadgv", textX: 222, d: "M110 30 C 110 110 175 130 175 210 S 50 300 50 380 S 175 470 175 550 S 50 640 50 720 S 175 810 175 890 S 110 980 110 1060" },
};
const wrapLine = (text, max) => { const out = []; let line = ""; for (const w of text.split(" ")) { if ((line + " " + w).trim().length > max) { out.push(line.trim()); line = w; } else line += " " + w; } out.push(line.trim()); return out; };

let roadUpdate = null;
function initRoad() {
  const road = $("#road");
  if (!road) return;
  const tall = matchMedia("(max-width: 640px)").matches;
  const R = ROADS[tall ? "tall" : "wide"];
  road.classList.toggle("tall", tall);
  road.innerHTML = `
    <div class="road-hud"><span class="road-dot"></span><span id="road-now">Start your engine</span><i class="road-meter"><b id="road-meter"></b></i></div>
    <svg viewBox="0 ${R.y0} ${R.W} ${R.H - R.y0}" aria-hidden="true">${ROAD_DEFS}
      <path d="${R.d}" class="road-shadow"/>
      <path d="${R.d}" class="road-edge"/>
      <path d="${R.d}" class="road-base"/>
      <path d="${R.d}" class="road-lit" id="road-lit" stroke="url(#${R.grad})"/>
      <path d="${R.d}" class="road-dash"/>
      <g id="stops"></g>
      <circle id="road-halo" r="70" fill="url(#rd-halo)"/>
      <g id="car" class="car">${CAR}</g>
    </svg>
    <ol class="road-stops" id="road-stops">${STOPS.map((s, i) => `<li data-i="${i}"><em>${i + 1}</em><b>${s.t}</b><span>${s.d}</span></li>`).join("")}</ol>`;
  const path = road.querySelector(".road-base");
  const len = path.getTotalLength();
  const lit = $("#road-lit");
  lit.style.strokeDasharray = `${len}`;
  const at = (t) => path.getPointAtLength(Math.max(0, Math.min(1, t)) * len);
  const stopT = STOPS.map((_, i) => 0.03 + (0.94 * i) / (STOPS.length - 1));
  $("#stops").innerHTML = stopT.map((t, i) => {
    const p = at(t), last = i === STOPS.length - 1;
    let tag = "";
    if (tall) {
      // the stop's name and description in the column on the right, joined by a dotted line
      const dx = R.textX - p.x;
      tag = `<path class="stop-lead" d="M24 0 H${dx - 10}"/><g class="stop-tag tall" transform="translate(${dx} 0)"><text class="st-t" y="-4">${STOPS[i].t}</text>${wrapLine(STOPS[i].d, 22).map((l, k) => `<text class="st-d" y="${16 + k * 17}">${l}</text>`).join("")}</g>`;
    } else {
      const [dx, dy] = R.tags[i], w = STOPS[i].t.length * 7.4 + 24;
      tag = `<g class="stop-tag" transform="translate(${dx - w / 2} ${dy - 14})"><rect width="${w}" height="28" rx="14"/><text x="${w / 2}" y="18">${STOPS[i].t}</text></g>`;
    }
    const flag = last ? `<g class="stop-flag" transform="translate(4 -50)"><path d="M0 0 V32" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><path d="M1 1 H22 L17 8 L22 15 H1 Z" fill="url(#roadg)"/></g>` : "";
    return `<g class="stop" data-i="${i}" transform="translate(${p.x} ${p.y})">${tag}<circle class="stop-pulse" r="18"/><circle class="stop-ring" r="22"/><circle class="stop-dot" r="17"/><text class="stop-n" y="5">${i + 1}</text>${flag}</g>`;
  }).join("");
  const labels = [...road.querySelectorAll(".road-stops li")];
  const stops = [...road.querySelectorAll(".stop")];
  const car = $("#car"), halo = $("#road-halo"), now = $("#road-now"), meter = $("#road-meter");
  let raf = 0;
  roadUpdate = () => {
    raf = 0;
    const r = road.getBoundingClientRect();
    // wide: drive across as the road scrolls through the screen; tall: the car stays near the middle of the screen
    const t = tall ? Math.max(0, Math.min(1, (innerHeight * 0.55 - r.top - 40) / (r.height - 80)))
      : Math.max(0, Math.min(1, (innerHeight * 0.75 - r.top) / (r.height + innerHeight * 0.2)));
    const p = at(t), q = at(t + 0.004);
    car.setAttribute("transform", `translate(${p.x} ${p.y}) rotate(${(Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI})`);
    halo.setAttribute("cx", p.x); halo.setAttribute("cy", p.y);
    lit.style.strokeDashoffset = `${len * (1 - t)}`;
    let reached = -1;
    stopT.forEach((s, i) => { if (t >= s - 0.01) reached = i; });
    stops.forEach((el, i) => { el.classList.toggle("on", i <= reached); el.classList.toggle("here", i === reached); el.classList.toggle("next", i === reached + 1); });
    labels.forEach((el, i) => { el.classList.toggle("on", i <= reached); el.classList.toggle("here", i === reached); });
    now.textContent = reached < 0 ? "Start your engine" : reached === STOPS.length - 1 ? `Arrived · ${STOPS[reached].t}` : `Stop ${reached + 1} of ${STOPS.length} · ${STOPS[reached].t}`;
    meter.style.width = `${t * 100}%`;
  };
  if (!initRoad.bound) {
    initRoad.bound = true;
    addEventListener("scroll", () => { raf ||= requestAnimationFrame(() => roadUpdate?.()); }, { passive: true });
    addEventListener("resize", () => roadUpdate?.());
    // rebuild when switching between the wide and tall roads
    matchMedia("(max-width: 640px)").addEventListener("change", initRoad);
  }
  roadUpdate();
}

export function initFeatures() {
  let filter = "all";
  $("#bubble-filter").innerHTML = [`<button type="button" class="chip" data-cat="all" aria-pressed="true">All ${FEATURES.length}</button>`,
    ...Object.entries(CATS).map(([k, v]) => `<button type="button" class="chip" data-cat="${k}" aria-pressed="false">${v.name}</button>`)].join("");
  $("#bubble-filter").addEventListener("click", (e) => {
    const c = e.target.closest("[data-cat]");
    if (!c) return;
    filter = c.dataset.cat;
    $("#bubble-filter").querySelectorAll(".chip").forEach((b) => b.setAttribute("aria-pressed", String(b === c)));
    renderBubbles(filter);
  });
  $("#bubbles").addEventListener("click", (e) => {
    const b = e.target.closest(".bubble");
    if (!b) return;
    $("#bubbles").querySelectorAll(".bubble").forEach((x) => x.classList.toggle("sel", x === b));
    showDetail(FEATURES.find((f) => f.n === b.dataset.n));
  });
  renderBubbles(filter);
  showDetail(FEATURES.find((f) => f.n === "Notes Studio"));
  $("#bubbles").querySelector('[data-n="Notes Studio"]')?.classList.add("sel");
  $("#feature-count").textContent = `${FEATURES.length} features · ${FEATURES.filter((f) => f.live).length} to try now`;
  initRoad();

  // Gradify AI in the corner of every page
  const fab = $("#ai-fab");
  fab.addEventListener("click", () => {
    document.dispatchEvent(new CustomEvent("lifeos:goto", { detail: "ai" }));
    setTimeout(() => $("#ai-input")?.focus({ preventScroll: true }), 500);
  });
  const os = $("#os");
  new IntersectionObserver(([en]) => fab.classList.toggle("tucked", en.isIntersecting && !$("#view-ai").hidden), { threshold: 0.2 }).observe(os);
}

initFeatures();
