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
function initRoad() {
  const road = $("#road");
  if (!road) return;
  const W = 1000, H = 520;
  const d = "M40 440 C 200 440 180 300 330 300 S 470 440 600 420 S 720 200 860 200 S 960 90 960 60";
  road.innerHTML = `<svg viewBox="0 30 ${W} ${H - 50}" aria-hidden="true">
      <defs><linearGradient id="roadg" x1="0" x2="1"><stop offset="0" stop-color="#4641ff"/><stop offset=".35" stop-color="#f055dd"/><stop offset=".7" stop-color="#ff5600"/><stop offset="1" stop-color="#ffc002"/></linearGradient></defs>
      <path d="${d}" class="road-base"/>
      <path d="${d}" class="road-lit" id="road-lit"/>
      <path d="${d}" class="road-dash"/>
      <g id="stops"></g>
      <g id="car" class="car"><rect x="-22" y="-11" width="44" height="22" rx="8" fill="#fff"/><rect x="-8" y="-8" width="16" height="16" rx="4" fill="url(#roadg)"/><rect x="14" y="-8" width="5" height="5" rx="1.5" fill="#ffd36b"/><rect x="14" y="3" width="5" height="5" rx="1.5" fill="#ffd36b"/><circle cx="-14" cy="-12" r="4" fill="#111"/><circle cx="12" cy="-12" r="4" fill="#111"/><circle cx="-14" cy="12" r="4" fill="#111"/><circle cx="12" cy="12" r="4" fill="#111"/></g>
    </svg>
    <ol class="road-stops" id="road-stops">${STOPS.map((s, i) => `<li data-i="${i}"><em>${i + 1}</em><b>${s.t}</b><span>${s.d}</span></li>`).join("")}</ol>`;
  const path = road.querySelector(".road-base");
  const len = path.getTotalLength();
  const lit = $("#road-lit");
  lit.style.strokeDasharray = `${len}`;
  const at = (t) => path.getPointAtLength(Math.max(0, Math.min(1, t)) * len);
  const stopT = STOPS.map((_, i) => 0.03 + (0.94 * i) / (STOPS.length - 1));
  $("#stops").innerHTML = stopT.map((t, i) => { const p = at(t); return `<g class="stop" data-i="${i}" transform="translate(${p.x} ${p.y})"><circle r="16"/><text y="5">${i + 1}</text></g>`; }).join("");
  const labels = [...road.querySelectorAll(".road-stops li")];
  const stops = [...road.querySelectorAll(".stop")];
  const car = $("#car");
  let raf = 0;
  const update = () => {
    raf = 0;
    const r = road.getBoundingClientRect();
    const t = Math.max(0, Math.min(1, (innerHeight * 0.75 - r.top) / (r.height + innerHeight * 0.2)));
    const p = at(t), q = at(t + 0.004);
    car.setAttribute("transform", `translate(${p.x} ${p.y}) rotate(${(Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI})`);
    lit.style.strokeDashoffset = `${len * (1 - t)}`;
    stopT.forEach((s, i) => { const on = t >= s - 0.01; stops[i].classList.toggle("on", on); labels[i].classList.toggle("on", on); });
  };
  addEventListener("scroll", () => { raf ||= requestAnimationFrame(update); }, { passive: true });
  addEventListener("resize", update);
  update();
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
