// Gradify courses: one subject as a game, in the style of techgradify.com. The Learn page is a road
// that winds through every lesson of every unit, with the car parked at your next lesson; each unit
// has a banner and a quiz; lessons have full notes, check questions and flashcards; and XP, levels,
// streaks, a daily goal, weekly challenges, badges, spaced review, a problem bank and a league keep
// you going. Progress is kept on this device and every XP is also logged to the Gradify account
// (store.logActivity), so it shows in LifeOS and the account's progress pages.
//
//   import { mountCourse } from "../../kit/course/course.js";
//   mountCourse(el, { site: "SciGradify", slug: "physics", name: "Physics", units, tracks, paths,
//     notes: (unitId) => import(`./notes/${unitId}.js`).then((m) => m.default), written: ["u01", …], extras: [...] });
// written lists the units whose notes files exist, so the others aren't requested.
import { schedule, isDue, preview, fmtInterval } from "../learning/srs.js";
import { LocalStore, CloudStore, scopeToSite } from "../data/store.js";
import { roadDefs, car } from "./road.js";
import { parseNotes, lessonHtml, lessonText, esc, inline, norm } from "./notes.js";

const DAY = 864e5;
const XP = { lesson: 10, check: 5, chest: 15, quiz: 50, perfect: 20, review: 2, problem: 5, weekly: 100 };
const day = (t = Date.now()) => { const d = new Date(t); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
const weekStart = (t = Date.now()) => { const d = new Date(t); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return d.getTime(); };
const shuffle = (a, seed = Math.random) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(seed() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const rng = (s) => () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
// levels get further apart: level n needs 50·n·(n+1) XP in total
export const levelOf = (xp) => { let n = 1; while (50 * n * (n + 1) <= xp) n++; return { n, from: 50 * (n - 1) * n, to: 50 * n * (n + 1) }; };
const ICON = {
  play: '<path d="M9 6.5v11l9-5.5z" fill="currentColor"/>',
  check: '<path d="M6 12.5l4 4 8-9" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>',
  star: '<path d="M12 3.5l2.6 5.6 6 .7-4.5 4.1 1.2 6-5.3-3-5.3 3 1.2-6L3.4 9.8l6-.7z" fill="currentColor"/>',
  lock: '<rect x="6" y="11" width="12" height="9" rx="2" fill="currentColor"/><path d="M8.5 11V8.5a3.5 3.5 0 017 0V11" fill="none" stroke="currentColor" stroke-width="2"/>',
  chest: '<path d="M4 10h16v9a1 1 0 01-1 1H5a1 1 0 01-1-1z" fill="currentColor"/><path d="M4 10a4 4 0 014-4h8a4 4 0 014 4" fill="none" stroke="currentColor" stroke-width="2"/><rect x="10.5" y="11" width="3" height="4" rx="1" fill="#000" opacity=".5"/>',
  trophy: '<path d="M7 4h10v5a5 5 0 01-10 0z" fill="currentColor"/><path d="M7 6H4a3 3 0 003 4M17 6h3a3 3 0 01-3 4M12 14v4M8 20h8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  flame: '<path d="M12 3c1 4 5 5.5 5 10a5 5 0 01-10 0c0-2.5 1.5-3.5 2-5 .8 1.5 1.8 2 2.5 2C11 8 11 5.5 12 3z" fill="currentColor"/>',
  bolt: '<path d="M13 3L5 14h6l-1 7 8-11h-6z" fill="currentColor"/>',
  cards: '<rect x="3" y="7" width="13" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 4h11a2 2 0 012 2v11" fill="none" stroke="currentColor" stroke-width="2"/>',
  save: '<path d="M6 3h9l4 4v13a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 3v5h7V3M8 21v-7h8v7" fill="none" stroke="currentColor" stroke-width="2"/>',
  target: '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/>',
  flag: '<path d="M6 21V4M6 4h11l-2 4 2 4H6" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
  search: '<circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16 16l4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
};
const ic = (n, cls = "") => `<svg class="co-ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICON[n]}</svg>`;

const BADGES = [
  { id: "first", name: "First steps", d: "Complete your first lesson", ok: (s) => s.lessons >= 1 },
  { id: "ten", name: "Getting going", d: "Complete 10 lessons", ok: (s) => s.lessons >= 10 },
  { id: "fifty", name: "Committed", d: "Complete 50 lessons", ok: (s) => s.lessons >= 50 },
  { id: "hundred", name: "Centurion", d: "Complete 100 lessons", ok: (s) => s.lessons >= 100 },
  { id: "unit", name: "Unit cleared", d: "Finish every lesson in a unit", ok: (s) => s.units >= 1 },
  { id: "quiz", name: "Quiz passed", d: "Pass a unit quiz", ok: (s) => s.quizzes >= 1 },
  { id: "ace", name: "Ace", d: "Score 100% on a unit quiz", ok: (s) => s.perfect >= 1 },
  { id: "streak3", name: "On a roll", d: "A 3-day streak", ok: (s) => s.best >= 3 },
  { id: "streak7", name: "Week strong", d: "A 7-day streak", ok: (s) => s.best >= 7 },
  { id: "streak30", name: "Unstoppable", d: "A 30-day streak", ok: (s) => s.best >= 30 },
  { id: "review", name: "Memory palace", d: "Review 50 flashcards", ok: (s) => s.reviews >= 50 },
  { id: "solver", name: "Problem solver", d: "Solve 25 problems", ok: (s) => s.solved >= 25 },
  { id: "xp1k", name: "1,000 XP", d: "Earn 1,000 XP", ok: (s) => s.xp >= 1000 },
  { id: "track", name: "Track complete", d: "Finish a whole track", ok: (s) => s.tracks >= 1 },
];
const CHALLENGES = [
  { name: "Lesson sprint", d: "Complete 15 lessons this week", n: 15, of: (w) => w.lesson },
  { name: "XP hunter", d: "Earn 300 XP this week", n: 300, of: (w) => w.xp },
  { name: "Quiz week", d: "Pass 2 unit quizzes this week", n: 2, of: (w) => w.quiz },
  { name: "Recall drill", d: "Review 40 flashcards this week", n: 40, of: (w) => w.review },
  { name: "Problem set", d: "Solve 20 problems this week", n: 20, of: (w) => w.problem + w.check },
];

export function mountCourse(root, cfg) {
  const KEY = `gradify.course.${cfg.slug}`;
  // what a course calls its units ("Unit" for physics, "School" for law and nursing)
  const U = cfg.unitWord || "Unit", u1 = U.toLowerCase();
  // courses with a QA record (cfg.qa) label any unit that hasn't passed every quality stage as a draft
  const isReady = (u) => !cfg.qa || Boolean(cfg.qa[u.id]?.reviewed && cfg.qa[u.id]?.sources && cfg.qa[u.id]?.signoff);
  const units = cfg.units, lessons = units.flatMap((u) => u.lessons.map((l, i) => ({ ...l, unit: u, i })));
  const byId = Object.fromEntries(lessons.map((l) => [l.id, l]));
  const trackOf = (u) => cfg.tracks.find((t) => t.units.includes(u.n)) || cfg.tracks[0];
  let S = (() => { try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch { return null; } })() || {};
  S = { done: {}, chests: {}, quiz: {}, solved: {}, cards: {}, log: [], goal: 30, path: null, open: [], closed: [], weekly: {}, saved: {}, ...S };
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch { /* private mode: progress lasts this visit */ } };

  // the learner's Gradify account (this device, or their cloud account when signed in)
  let storeP = null;
  const store = () => (storeP ||= (async () => {
    try { const cloud = await CloudStore.create(), user = cloud ? await cloud.user() : null; return scopeToSite(user ? cloud : new LocalStore(), cfg.site); }
    catch { return scopeToSite(new LocalStore(), cfg.site); }
  })());

  // notes, loaded a unit at a time
  const cache = {};
  const unitNotes = (u) => (cache[u.id] ||= Promise.resolve(!cfg.written || cfg.written.includes(u.id) ? cfg.notes(u.id) : null).catch(() => null).then((txt) => {
    const parsed = parseNotes(txt), byTitle = Object.fromEntries(parsed.map((p) => [norm(p.title), p]));
    return Object.fromEntries(u.lessons.map((l, i) => [l.id, byTitle[norm(l.title)] || null]));
  }));
  const notesFor = async (l) => (await unitNotes(l.unit))[l.id];
  const allNotes = async () => Object.assign({}, ...(await Promise.all(units.map(unitNotes))));

  // ---------- XP, levels, streaks ----------
  const totalXp = () => S.log.reduce((a, r) => a + r.xp, 0);
  const days = () => [...new Set(S.log.map((r) => day(r.t)))].sort();
  function streak() {
    const set = new Set(days()); let n = 0, t = Date.now();
    if (!set.has(day(t))) t -= DAY;
    while (set.has(day(t))) { n++; t -= DAY; }
    let best = 0, run = 0, prev = null;
    for (const d of days()) { const ms = Date.parse(d); run = prev && ms - prev < 1.5 * DAY ? run + 1 : 1; prev = ms; best = Math.max(best, run); }
    return { n, best: Math.max(best, n), today: set.has(day()) };
  }
  const todayXp = () => S.log.filter((r) => day(r.t) === day()).reduce((a, r) => a + r.xp, 0);
  function week() {
    const from = weekStart(), w = { xp: 0, lesson: 0, quiz: 0, review: 0, problem: 0, check: 0 };
    for (const r of S.log) if (r.t >= from) { w.xp += r.xp; w[r.k] = (w[r.k] || 0) + 1; }
    return w;
  }
  const challenge = () => CHALLENGES[Math.floor(weekStart() / (7 * DAY)) % CHALLENGES.length];
  const unitDone = (u) => u.lessons.filter((l) => S.done[l.id]).length;
  function stats() {
    const st = streak();
    return { xp: totalXp(), lessons: Object.keys(S.done).length, units: units.filter((u) => unitDone(u) === u.lessons.length).length,
      quizzes: Object.values(S.quiz).filter((q) => q.pass).length, perfect: Object.values(S.quiz).filter((q) => q.best === 1).length,
      best: st.best, reviews: S.log.filter((r) => r.k === "review").length, solved: Object.keys(S.solved).length,
      tracks: cfg.tracks.filter((t) => t.units.every((n) => { const u = units.find((x) => x.n === n); return u && unitDone(u) === u.lessons.length; })).length };
  }
  const earned = () => BADGES.filter((b) => b.ok(stats()));

  async function award(xp, k, id, detail) {
    const before = { lvl: levelOf(totalXp()).n, badges: new Set(earned().map((b) => b.id)), goal: todayXp() >= S.goal };
    S.log.push({ t: Date.now(), xp, k, id }); save();
    pop(`+${xp} XP`);
    store().then((s) => s.logActivity({ site: cfg.site, kind: `${cfg.slug}-${k}`, xp, detail: detail || id })).catch(() => {});
    const lvl = levelOf(totalXp()).n;
    if (lvl > before.lvl) celebrate(`Level ${lvl}`, `You reached level ${lvl} in ${cfg.name}.`);
    for (const b of earned()) if (!before.badges.has(b.id)) toast(`${ic("star")} Badge earned: <b>${b.name}</b>`);
    if (!before.goal && todayXp() >= S.goal) toast(`${ic("target")} Daily goal reached: ${S.goal} XP`);
    // the weekly challenge pays out once
    const c = challenge(), wk = String(weekStart());
    if (!S.weekly[wk] && c.of(week()) >= c.n) { S.weekly[wk] = true; S.log.push({ t: Date.now(), xp: XP.weekly, k: "weekly", id: wk }); save(); celebrate("Weekly challenge complete", `${c.name}: +${XP.weekly} XP`); }
    paintSide();
  }

  // ---------- feedback ----------
  function pop(text) {
    const el = document.createElement("div"); el.className = "co-pop"; el.textContent = text; document.body.append(el);
    setTimeout(() => el.remove(), 1400);
  }
  function toast(html) {
    let box = document.querySelector(".co-toasts"); if (!box) { box = document.createElement("div"); box.className = "co-toasts"; document.body.append(box); }
    const el = document.createElement("div"); el.className = "co-toast"; el.innerHTML = html; box.append(el);
    setTimeout(() => el.classList.add("out"), 3200); setTimeout(() => el.remove(), 3700);
  }
  function confetti() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = document.createElement("div"); box.className = "co-confetti";
    const cols = ["#4641ff", "#f055dd", "#ff5600", "#ffc002", "#40d4b1", "#fff"];
    box.innerHTML = Array.from({ length: 70 }, (_, i) => `<i style="--x:${Math.random() * 100}vw;--d:${0.9 + Math.random() * 1.4}s;--r:${Math.random() * 720 - 360}deg;--c:${cols[i % cols.length]};left:${Math.random() * 100}vw"></i>`).join("");
    document.body.append(box); setTimeout(() => box.remove(), 2600);
  }
  function celebrate(title, sub, actions = "") {
    confetti();
    const d = document.createElement("div"); d.className = "co-modal";
    d.innerHTML = `<div class="co-dialog co-cele" role="dialog" aria-modal="true"><div class="co-burst">${ic("trophy")}</div><h2>${title}</h2><p>${sub}</p><div class="co-row">${actions}<button class="btn btn-light lg btn-sm" data-close><span>Keep going</span></button></div></div>`;
    d.addEventListener("click", (e) => { if (e.target === d || e.target.closest("[data-close],a")) d.remove(); });
    document.body.append(d); d.querySelector("[data-close]").focus();
  }

  // ---------- layout ----------
  const VIEWS = [["learn", "Learn"], ["review", "Review"], ["paths", "Paths"], ["tracks", "Tracks"], ["problems", "Problems"], ["leaderboard", "Leaderboard"], ["me", "My progress"], ["features", "Features"]];
  roadDefs();
  root.classList.add("co");
  root.innerHTML = `
    <div class="co-head">
      <div class="co-title"><span class="co-kicker">${esc(cfg.site)} course</span><h1>${esc(cfg.name)}</h1></div>
      <div class="co-hud" aria-label="Your progress"></div>
    </div>
    ${cfg.notice ? `<p class="co-notice" role="note">${cfg.notice}</p>` : ""}
    <nav class="co-tabs" aria-label="${esc(cfg.name)}">${VIEWS.map(([id, t]) => `<a href="#/${id}" data-v="${id}">${t}${id === "review" ? '<i class="co-due" hidden></i>' : ""}</a>`).join("")}
      <label class="co-search">${ic("search")}<input type="search" placeholder="Search ${lessons.length.toLocaleString()} lessons" aria-label="Search lessons"><div class="co-results" hidden></div></label></nav>
    <div class="co-body"><main class="co-main"></main><aside class="co-side"></aside></div>`;
  const main = root.querySelector(".co-main"), side = root.querySelector(".co-side"), hud = root.querySelector(".co-hud");

  // search
  const q = root.querySelector(".co-search input"), res = root.querySelector(".co-results");
  q.addEventListener("input", () => {
    const t = norm(q.value);
    if (t.length < 2) { res.hidden = true; return; }
    const hits = [...units.filter((u) => norm(u.title).includes(t)).map((u) => ({ href: `#/learn/${u.id}`, k: `${U} ${u.n}`, t: u.title })),
      ...lessons.filter((l) => norm(l.title).includes(t)).map((l) => ({ href: `#/lesson/${l.id}`, k: `${U} ${l.unit.n} · ${S.done[l.id] ? "done" : "lesson"}`, t: l.title }))].slice(0, 12);
    res.innerHTML = hits.length ? hits.map((h) => `<a href="${h.href}"><small>${esc(h.k)}</small>${esc(h.t)}</a>`).join("") : `<p>No lessons match.</p>`;
    res.hidden = false;
  });
  res.addEventListener("click", () => { res.hidden = true; q.value = ""; });
  document.addEventListener("click", (e) => { if (!e.target.closest(".co-search")) res.hidden = true; });

  function paintHud() {
    const xp = totalXp(), L = levelOf(xp), st = streak(), due = dueCards().length;
    hud.innerHTML = `
      <span class="co-chip ${st.today ? "lit" : ""}" title="Day streak">${ic("flame")}<b>${st.n}</b></span>
      <span class="co-chip" title="Total XP">${ic("bolt")}<b>${xp.toLocaleString()}</b> XP</span>
      <span class="co-chip co-lvl" title="${L.to - xp} XP to level ${L.n + 1}"><b>Lv ${L.n}</b><i style="--p:${((xp - L.from) / (L.to - L.from)) * 100}%"></i></span>`;
    const dueEl = root.querySelector(".co-due"); dueEl.hidden = !due; dueEl.textContent = due;
  }

  // ---------- the sidebar ----------
  function nextLesson(scope) {
    const pool = scope || (S.path ? cfg.paths.find((p) => p.id === S.path)?.units : null);
    const list = pool ? pool.flatMap((n) => units.find((u) => u.n === n)?.lessons || []) : lessons;
    return list.find((l) => !S.done[l.id]) || null;
  }
  function paintSide() {
    paintHud();
    if (side.hidden) return;
    const xp = totalXp(), L = levelOf(xp), st = streak(), tx = todayXp(), nl = nextLesson(), c = challenge(), cw = Math.min(c.n, c.of(week()));
    const nu = nl ? byId[nl.id].unit : null, left = nu ? nu.lessons.length - unitDone(nu) : 0;
    const ring = Math.min(1, tx / S.goal), R = 30, C = 2 * Math.PI * R;
    const got = new Set(earned().map((b) => b.id));
    side.innerHTML = `
      <section class="co-card co-me">
        <div class="co-lvbadge"><b>${L.n}</b><small>level</small></div>
        <div><b>${xp.toLocaleString()} XP</b><div class="co-bar"><i style="width:${((xp - L.from) / (L.to - L.from)) * 100}%"></i></div><small>${(L.to - xp).toLocaleString()} XP to level ${L.n + 1}</small></div>
      </section>
      <section class="co-card co-goal">
        <svg viewBox="0 0 76 76" class="co-ring"><circle cx="38" cy="38" r="${R}" class="bg"/><circle cx="38" cy="38" r="${R}" class="fg" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - ring)}"/></svg>
        <div><span class="co-kicker">Daily goal</span><b>${tx} / ${S.goal} XP</b>
          <small class="co-streak">${ic("flame")} ${st.n}-day streak${st.today ? "" : st.n ? " · learn today to keep it" : ""}</small>
          <select aria-label="Daily goal">${[20, 30, 50, 100].map((g) => `<option value="${g}" ${g === S.goal ? "selected" : ""}>${g} XP a day</option>`).join("")}</select></div>
      </section>
      ${nl ? `<section class="co-card"><span class="co-kicker">${ic("flag")} Next milestone</span><h3>Finish ${U} ${nu.n}: ${esc(nu.title)}</h3><p>${left} lesson${left === 1 ? "" : "s"} to go, then the ${u1} quiz for +${XP.quiz} XP.</p><a class="btn btn-light lg btn-sm co-go" href="#/lesson/${nl.id}"><span>Continue: ${esc(nl.title)}</span></a></section>` : `<section class="co-card"><h3>Course complete</h3><p>Every lesson done. Keep your memory fresh in Review.</p></section>`}
      <section class="co-card"><span class="co-kicker">${ic("trophy")} Weekly challenge</span><h3>${c.name}</h3><p>${c.d}. Reward: +${XP.weekly} XP.</p><div class="co-bar warm"><i style="width:${(cw / c.n) * 100}%"></i></div><small>${cw} / ${c.n}${S.weekly[String(weekStart())] ? " · claimed" : ""} · resets Monday</small></section>
      <section class="co-card"><span class="co-kicker">Course progress</span><h3>${Object.keys(S.done).length} / ${lessons.length} lessons</h3>
        <div class="co-dots">${units.map((u) => { const t = trackOf(u), p = unitDone(u) / u.lessons.length; return `<a href="#/learn/${u.id}" title="${U} ${u.n}: ${esc(u.title)} (${Math.round(p * 100)}%)" style="--a:${t.from};--b:${t.to};--p:${p}"></a>`; }).join("")}</div></section>
      <section class="co-card"><span class="co-kicker">Badges · ${got.size} / ${BADGES.length}</span><div class="co-badges">${BADGES.map((b) => `<span class="${got.has(b.id) ? "on" : ""}" title="${b.name}: ${b.d}">${ic(got.has(b.id) ? "star" : "lock")}</span>`).join("")}</div><a class="co-more" href="#/me">See all your progress →</a></section>`;
    side.querySelector("select").addEventListener("change", (e) => { S.goal = Number(e.target.value); save(); paintSide(); });
  }

  // ---------- Learn: the road ----------
  function pathItems(u) {
    const out = [];
    u.lessons.forEach((l, i) => { out.push({ kind: "lesson", l: byId[l.id] }); if ((i + 1) % 6 === 0 && i < u.lessons.length - 1) out.push({ kind: "chest", id: `${u.id}-c${(i + 1) / 6}`, after: u.lessons.slice(0, i + 1) }); });
    out.push({ kind: "quiz", u });
    return out;
  }
  function road(u, current) {
    const items = pathItems(u), W = 440, gap = 96, top = 56;
    const pts = items.map((_, i) => [W / 2 + Math.sin(i * 0.9) * 120, top + i * gap]);
    const H = top + (items.length - 1) * gap + 70;
    const curve = (p) => p.map(([x, y], i) => { if (!i) return `M${x} ${y}`; const [px, py] = p[i - 1]; return `C${px} ${py + gap / 2} ${x} ${y - gap / 2} ${x} ${y}`; }).join(" ");
    const ci = items.findIndex((it) => it.kind === "lesson" && it.l.id === current?.id);
    const lastDone = items.reduce((a, it, i) => (it.kind === "lesson" && S.done[it.l.id] ? i : a), -1);
    let carSvg = "";
    if (ci >= 0) {
      const [x1, y1] = ci ? pts[ci - 1] : [pts[0][0], pts[0][1] - gap]; const [x2, y2] = pts[ci];
      const cx = (x1 + x2) / 2, cy = (y1 + y2) / 2, deg = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
      carSvg = `<svg class="co-car" viewBox="-130 -130 260 260" style="left:${(cx / W) * 100}%;top:${cy}px" aria-hidden="true">${car(0, 0, deg, 1.5)}</svg>`;
    }
    const nodes = items.map((it, i) => {
      const [x, y] = pts[i], style = `left:${(x / W) * 100}%;top:${y}px`;
      if (it.kind === "lesson") {
        const st = S.done[it.l.id] ? "done" : i === ci ? "cur" : "next";
        const side = x > W / 2 ? "l" : "r";
        return `<a class="co-node ${st}" style="${style}" href="#/lesson/${it.l.id}" aria-label="Lesson ${it.l.i + 1}: ${esc(it.l.title)}${st === "done" ? " (done)" : ""}">
          ${ic(st === "done" ? "check" : it.l.i === 0 && st === "cur" ? "star" : "play")}<span class="co-label ${side}">${st === "cur" ? `<b>${it.l.i === 0 ? "Start here" : "Up next"}</b>` : `<small>${it.l.i + 1}</small>`}${esc(it.l.title)}</span></a>`;
      }
      if (it.kind === "chest") {
        const ready = it.after.every((l) => S.done[l.id]), got = S.chests[it.id];
        return `<button class="co-node chest ${got ? "done" : ready ? "ready" : ""}" style="${style}" data-chest="${it.id}" ${ready && !got ? "" : "disabled"} aria-label="Reward chest${got ? " (opened)" : ready ? ": open for XP" : ": finish the lessons before it"}">${ic("chest")}<span class="co-tip">${got ? "Opened" : ready ? `Open for +${XP.chest} XP` : "Finish the lessons before it"}</span></button>`;
      }
      const qz = S.quiz[u.id];
      return `<a class="co-node quiz ${qz?.pass ? "done" : ""}" style="${style}" href="#/quiz/${u.id}" aria-label="${U} ${u.n} quiz">${ic("trophy")}<span class="co-tip">Unit quiz${qz ? ` · best ${Math.round(qz.best * 100)}%` : ` · +${XP.quiz} XP`}</span></a>`;
    }).join("");
    const doneTo = lastDone >= 0 ? pts.slice(0, lastDone + 1) : [];
    return `<div class="co-road" style="height:${H}px">
      <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true">
        <path d="${curve(pts)}" class="co-r-edge"/><path d="${curve(pts)}" class="co-r-top"/><path d="${curve(pts)}" class="co-r-dash"/>
        ${doneTo.length > 1 ? `<path d="${curve(doneTo)}" class="co-r-done"/>` : ""}
      </svg>
      ${carSvg}${nodes}</div>`;
  }
  function banner(u, open) {
    const t = trackOf(u), d = unitDone(u), qz = S.quiz[u.id];
    return `<div class="co-banner" style="--a:${t.from};--b:${t.to}">
      <div><span class="co-kicker">${U} ${u.n}</span><h2>${esc(u.title)}</h2><small>${d} / ${u.lessons.length} lessons${qz?.pass ? ` · quiz ${Math.round(qz.best * 100)}%` : ""}</small>
      <div class="co-ubar"><i style="width:${(d / u.lessons.length) * 100}%"></i></div></div>
      <div class="co-bbtns"><a class="co-bbtn" href="#/quiz/${u.id}">${ic("trophy")}<span>${U} quiz</span></a>
      <button class="co-bbtn ghost" data-toggle="${u.id}" aria-expanded="${open}">${open ? "Hide path" : "Show path"}</button></div></div>`;
  }
  function viewLearn(focus, keep) {
    const nl = nextLesson(), curUnit = nl ? byId[nl.id].unit : null, path = S.path && cfg.paths.find((p) => p.id === S.path);
    const show = new Set([curUnit?.id, focus, ...S.open].filter((id) => id && !S.closed.includes(id)));
    const unitOrder = path ? path.units.map((n) => units.find((u) => u.n === n)) : units;
    const groups = path ? [{ name: `Your path: ${path.name}`, list: unitOrder }] : cfg.tracks.map((t) => ({ name: t.name, t, list: t.units.map((n) => units.find((u) => u.n === n)).filter(Boolean) }));
    main.innerHTML = `${path ? `<div class="co-pathnote">Following <b>${esc(path.name)}</b>. <button class="co-link" data-unpath>Show the whole course</button></div>` : ""}
      ${groups.map((g) => `<div class="co-track"><span>${esc(g.name)}</span></div>${g.list.map((u) => `<section class="co-unit" id="${u.id}">${banner(u, show.has(u.id))}${show.has(u.id) ? road(u, nl) : ""}</section>`).join("")}`).join("")}`;
    main.querySelectorAll("[data-toggle]").forEach((b) => b.addEventListener("click", () => {
      const id = b.dataset.toggle, open = b.getAttribute("aria-expanded") === "true";
      S.open = S.open.filter((x) => x !== id); S.closed = S.closed.filter((x) => x !== id);
      (open ? S.closed : S.open).push(id); save();
      viewLearn(null, true);
    }));
    main.querySelector("[data-unpath]")?.addEventListener("click", () => { S.path = null; save(); viewLearn(); paintSide(); });
    main.querySelectorAll("[data-chest]").forEach((b) => b.addEventListener("click", () => { S.chests[b.dataset.chest] = Date.now(); save(); confetti(); award(XP.chest, "chest", b.dataset.chest); viewLearn(focus, true); }));
    const target = !keep && main.querySelector(focus ? `#${focus}` : ".co-node.cur");
    if (target) setTimeout(() => target.scrollIntoView({ block: focus ? "start" : "center", behavior: "instant" }), 0);
  }
  // opening a unit from elsewhere shows its path even if it was hidden
  const openUnit = (id) => { S.closed = S.closed.filter((x) => x !== id); save(); };

  // ---------- a lesson ----------
  async function viewLesson(id) {
    const l = byId[id]; if (!l) return go("learn");
    const u = l.unit, t = trackOf(u), N = await notesFor(l), prev = u.lessons[l.i - 1], next = u.lessons[l.i + 1] || units[u.n]?.lessons[0];
    main.innerHTML = `<article class="co-lesson" style="--a:${t.from};--b:${t.to}">
      <div class="co-crumbs"><a href="#/learn/${u.id}">← ${U} ${u.n}: ${esc(u.title)}</a><span>Lesson ${l.i + 1} of ${u.lessons.length}</span></div>
      <div class="co-steps">${u.lessons.map((x) => `<a href="#/lesson/${x.id}" class="${S.done[x.id] ? "done" : ""} ${x.id === id ? "here" : ""}" title="${esc(x.title)}"></a>`).join("")}</div>
      <div class="mv-page co-notes" style="--c:${t.from}">
        <header><span class="kicker">${esc(t.name)} · ${U} ${u.n}</span><h2>${esc(l.title)}</h2>${N?.lead ? `<p class="mv-lead">${inline(N.lead)}</p>` : ""}
          <div class="mv-chips">${S.done[id] ? `<span class="co-chip lit">${ic("check")} Completed</span>` : `<span class="co-chip">${ic("bolt")} +${XP.lesson} XP</span>`}${N?.mcq.length ? `<span class="co-chip">${N.mcq.length} check question${N.mcq.length > 1 ? "s" : ""}</span>` : ""}${N?.cards.length ? `<button data-cards>${ic("cards")} Flashcards (${N.cards.length})</button>` : ""}</div></header>
        ${N && !isReady(u) ? `<p class="co-draft" role="note"><b>Draft.</b> This ${u1} is written but hasn't yet completed content review, source checking and expert sign-off. Use it alongside your course materials and official sources.</p>` : ""}
        ${N ? `<div class="mv-cols">${lessonHtml(N)}</div>` : `<p class="co-empty">The notes for this lesson are still being written. You can still mark it done and come back later.</p>`}
        ${N?.mcq.length ? `<section class="co-check"><h3>${ic("target")} Check yourself</h3>${N.mcq.map((m, i) => mcqHtml(m, `${id}#${i}`)).join("")}</section>` : ""}
        <footer>
          <button class="btn btn-light lg co-complete" ${S.done[id] ? "disabled" : ""}><span>${S.done[id] ? "Completed ✓" : `Complete lesson · +${XP.lesson} XP`}</span></button>
          ${N?.cards.length ? `<button class="btn btn-ghost lg" data-cards><span>${ic("cards")} Flashcards</span></button>` : ""}
          ${N ? `<button class="btn btn-ghost lg" data-save><span>${ic("save")} ${S.saved[id] ? "Saved to your account ✓" : "Save notes and cards"}</span></button>` : ""}
        </footer>
      </div>
      <div class="co-pn">${prev ? `<a href="#/lesson/${prev.id}">← ${esc(prev.title)}</a>` : "<span></span>"}${next ? `<a href="#/lesson/${next.id}">${esc(next.title)} →</a>` : ""}</div>
    </article>`;
    scrollTo(0, 0);
    wireMcq(main);
    main.querySelectorAll("[data-cards]").forEach((b) => b.addEventListener("click", () => flashcards(N.cards, l)));
    main.querySelector("[data-save]")?.addEventListener("click", (e) => saveLesson(l, N, e.currentTarget));
    main.querySelector(".co-complete").addEventListener("click", async (e) => {
      if (S.done[id]) return;
      S.done[id] = Date.now(); save(); e.currentTarget.disabled = true; e.currentTarget.querySelector("span").textContent = "Completed ✓";
      await award(XP.lesson, "lesson", id, `${cfg.name}: ${l.title}`);
      if (unitDone(u) === u.lessons.length) celebrate(`${U} ${u.n} complete`, `${esc(u.title)}: every lesson done. Take the unit quiz for +${XP.quiz} XP.`, `<a class="btn btn-ghost lg btn-sm" href="#/quiz/${u.id}"><span>${U} quiz</span></a>`);
      else if (next) setTimeout(() => go(`lesson/${next.id}`), 650);
    });
  }
  function mcqHtml(m, pid) {
    const opts = shuffle([m.right, ...m.wrong], rng([...pid].reduce((a, c) => a * 31 + c.charCodeAt(0), 7) >>> 0));
    return `<div class="co-mcq" data-pid="${esc(pid)}" data-right="${esc(m.right)}"><p class="co-q">${inline(m.q)}<small>${["", "Easy", "Medium", "Hard"][m.d]}</small></p>
      <div class="co-opts">${opts.map((o) => `<button>${inline(o)}</button>`).join("")}</div>${m.why ? `<p class="co-why" hidden>${inline(m.why)}</p>` : ""}</div>`;
  }
  function wireMcq(el, onAnswer) {
    el.querySelectorAll(".co-mcq").forEach((box) => {
      let tried = false;
      box.querySelectorAll(".co-opts button").forEach((b) => b.addEventListener("click", () => {
        if (box.classList.contains("solved")) return;
        const ok = b.innerHTML === inline(box.dataset.right);
        b.classList.add(ok ? "right" : "wrong");
        if (ok) {
          box.classList.add("solved"); box.querySelector(".co-why")?.removeAttribute("hidden");
          const pid = box.dataset.pid;
          if (!tried && !S.solved[pid]) { S.solved[pid] = Date.now(); save(); award(XP.check, "check", pid); }
        } else if (!tried) { tried = true; box.querySelector(".co-why")?.removeAttribute("hidden"); }
        onAnswer?.(ok, tried);
      }));
    });
  }
  async function saveLesson(l, N, btn) {
    btn.disabled = true;
    try {
      const s = await store();
      const doc = await s.addDocument({ title: `${cfg.name}: ${l.title}`, site: cfg.site, text: lessonText(N), file_name: `${cfg.slug}/${l.id}` });
      if (N.cards.length) await s.addCards(N.cards.map(([front, back]) => ({ document_id: doc.id, topic: l.unit.title, front, back, kind: /^(why|how)/i.test(front) ? "why" : "definition", source_quote: null, grounded: "yes" })));
      S.saved[l.id] = doc.id; save();
      btn.querySelector("span").innerHTML = `${ic("save")} Saved to your account ✓`;
      toast(`${ic("save")} Saved <b>${esc(l.title)}</b> and ${N.cards.length} cards to your account`);
    } catch { btn.querySelector("span").textContent = "Couldn't save on this device"; }
  }

  // flashcards: flip through a lesson's cards
  function flashcards(cards, l) {
    let i = 0, flipped = false;
    const d = document.createElement("div"); d.className = "co-modal";
    const paint = () => {
      d.innerHTML = `<div class="co-dialog co-fc" role="dialog" aria-modal="true" aria-label="Flashcards">
        <div class="co-fc-top"><span class="co-kicker">${esc(l.title)}</span><span>${i + 1} / ${cards.length}</span><button class="co-x" data-close aria-label="Close">×</button></div>
        <button class="co-card3d ${flipped ? "flip" : ""}" aria-live="polite"><span class="f"><div>${inline(cards[i][0])}</div><small>Tap to reveal</small></span><span class="b"><div>${inline(cards[i][1])}</div></span></button>
        <div class="co-row"><button class="btn btn-ghost lg btn-sm" data-prev ${i ? "" : "disabled"}><span>← Back</span></button><button class="btn btn-light lg btn-sm" data-next><span>${i < cards.length - 1 ? "Next →" : "Done"}</span></button></div></div>`;
      d.querySelector(".co-card3d").onclick = () => { flipped = !flipped; d.querySelector(".co-card3d").classList.toggle("flip", flipped); };
      d.querySelector("[data-prev]").onclick = () => { i--; flipped = false; paint(); };
      d.querySelector("[data-next]").onclick = () => { if (i < cards.length - 1) { i++; flipped = false; paint(); } else d.remove(); };
      d.querySelector("[data-close]").onclick = () => d.remove();
    };
    d.addEventListener("click", (e) => { if (e.target === d) d.remove(); });
    d.addEventListener("keydown", (e) => { if (e.key === "Escape") d.remove(); if (e.key === " ") { e.preventDefault(); d.querySelector(".co-card3d").click(); } if (e.key === "ArrowRight") d.querySelector("[data-next]").click(); });
    paint(); document.body.append(d); d.querySelector(".co-card3d").focus();
  }

  // ---------- unit quiz ----------
  async function viewQuiz(uid) {
    const u = units.find((x) => x.id === uid); if (!u) return go("learn");
    const N = await unitNotes(u), t = trackOf(u);
    const pool = u.lessons.flatMap((l) => (N[l.id]?.mcq || []).map((m) => ({ ...m, l })));
    const qs = shuffle(pool).slice(0, Math.min(10, pool.length));
    if (!qs.length) { main.innerHTML = `<div class="co-panel"><h2>${U} ${u.n} quiz</h2><p>This quiz opens when the ${u1}'s notes are in.</p><a class="co-link" href="#/learn/${u.id}">← Back to the unit</a></div>`; return; }
    let k = 0, score = 0;
    const step = () => {
      if (k >= qs.length) return finish();
      const m = qs[k];
      main.innerHTML = `<div class="co-quiz" style="--a:${t.from};--b:${t.to}"><div class="co-crumbs"><a href="#/learn/${u.id}">← ${U} ${u.n}: ${esc(u.title)}</a><span>Question ${k + 1} of ${qs.length} · ${score} right</span></div>
        <div class="co-qbar"><i style="width:${(k / qs.length) * 100}%"></i></div>
        <div class="co-panel">${mcqHtml(m, `quiz-${u.id}-${k}-${Date.now()}`)}<p class="co-from">From: <a href="#/lesson/${m.l.id}">${esc(m.l.title)}</a></p><button class="btn btn-light lg btn-sm co-nextq" hidden><span>${k < qs.length - 1 ? "Next question →" : "See your score"}</span></button></div></div>`;
      const box = main.querySelector(".co-mcq");
      box.querySelectorAll(".co-opts button").forEach((b) => b.addEventListener("click", () => {
        if (box.classList.contains("done")) return;
        box.classList.add("done", "solved");
        const ok = b.innerHTML === inline(m.right); if (ok) score++;
        b.classList.add(ok ? "right" : "wrong");
        box.querySelectorAll(".co-opts button").forEach((x) => { if (x.innerHTML === inline(m.right)) x.classList.add("right"); });
        box.querySelector(".co-why")?.removeAttribute("hidden");
        main.querySelector(".co-nextq").hidden = false; main.querySelector(".co-nextq").focus();
      }));
      main.querySelector(".co-nextq").addEventListener("click", () => { k++; step(); });
    };
    const finish = async () => {
      const p = score / qs.length, pass = p >= 0.75, prev = S.quiz[u.id];
      S.quiz[u.id] = { best: Math.max(p, prev?.best || 0), pass: pass || prev?.pass || false, t: Date.now() }; save();
      main.innerHTML = `<div class="co-panel co-result"><div class="co-burst">${ic(pass ? "trophy" : "target")}</div><h2>${score} / ${qs.length}</h2><p>${pass ? `Passed ${U} ${u.n}: ${esc(u.title)}.` : `You need 75% to pass. Look back over the lessons you missed, then try again.`}</p>
        <div class="co-row"><a class="btn btn-ghost lg btn-sm" href="#/learn/${u.id}"><span>Back to the ${u1}</span></a><button class="btn btn-light lg btn-sm" data-again><span>Try again</span></button></div></div>`;
      main.querySelector("[data-again]").addEventListener("click", () => viewQuiz(uid));
      if (pass && !prev?.pass) { confetti(); await award(XP.quiz + (p === 1 ? XP.perfect : 0), "quiz", u.id, `${cfg.name}: ${U} ${u.n} quiz ${Math.round(p * 100)}%`); }
      else if (p === 1 && prev?.best < 1) await award(XP.perfect, "quiz", u.id, `${cfg.name}: ${U} ${u.n} quiz 100%`);
    };
    step();
  }

  // ---------- review (spaced repetition over the cards of finished lessons) ----------
  let cardPool = null;
  async function reviewPool() {
    const touched = units.filter((u) => u.lessons.some((l) => S.done[l.id]));
    const all = Object.assign({}, ...(await Promise.all(touched.map(unitNotes))));
    cardPool = Object.keys(S.done).flatMap((id) => (all[id]?.cards || []).map(([f, b], i) => ({ id: `${id}#c${i}`, lesson: id, front: f, back: b })));
    return cardPool;
  }
  const dueCards = () => (cardPool || []).filter((c) => { const st = S.cards[c.id]; return !st || isDue(st); });
  async function viewReview() {
    await reviewPool(); paintHud();
    const due = shuffle(dueCards()).slice(0, 30);
    const learned = Object.keys(S.cards).length, total = cardPool.length;
    if (!due.length) {
      main.innerHTML = `<div class="co-panel"><span class="co-kicker">Review</span><h2>${total ? "All caught up" : "Nothing to review yet"}</h2><p>${total ? `You've seen ${learned} of ${total} cards. The next ones come due as their intervals pass, so come back tomorrow.` : "Complete lessons and their flashcards join your review queue. Spaced repetition brings each card back just before you'd forget it."}</p><a class="btn btn-light lg btn-sm" href="#/learn"><span>Go to the path</span></a></div>`;
      return;
    }
    let k = 0, done = 0;
    const step = () => {
      if (k >= due.length) { main.innerHTML = `<div class="co-panel co-result"><div class="co-burst">${ic("cards")}</div><h2>${done} cards reviewed</h2><p>+${done * XP.review} XP. Come back tomorrow for the next batch.</p><a class="btn btn-light lg btn-sm" href="#/learn"><span>Back to the path</span></a></div>`; return; }
      const c = due[k], st = S.cards[c.id] || {}, pv = preview(st);
      main.innerHTML = `<div class="co-review"><div class="co-crumbs"><span>Review · ${k + 1} of ${due.length}</span><a href="#/lesson/${c.lesson}">${esc(byId[c.lesson].title)}</a></div><div class="co-qbar"><i style="width:${(k / due.length) * 100}%"></i></div>
        <button class="co-card3d big"><span class="f"><div>${inline(c.front)}</div><small>Tap or press space to reveal</small></span><span class="b"><div>${inline(c.back)}</div></span></button>
        <div class="co-rate" hidden>${["again", "hard", "good", "easy"].map((r) => `<button data-r="${r}" class="${r}"><b>${r[0].toUpperCase() + r.slice(1)}</b><small>${fmtInterval(pv[r])}</small></button>`).join("")}</div></div>`;
      const card = main.querySelector(".co-card3d"), rate = main.querySelector(".co-rate");
      card.onclick = () => { card.classList.add("flip"); rate.hidden = false; };
      rate.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => {
        S.cards[c.id] = { ...st, ...schedule(st, b.dataset.r) }; save(); done++; k++;
        award(XP.review, "review", c.id); step();
      }));
    };
    step();
  }

  // ---------- paths and tracks ----------
  const unitPct = (n) => { const u = units.find((x) => x.n === n); return u ? unitDone(u) / u.lessons.length : 0; };
  function viewPaths() {
    main.innerHTML = `<div class="co-intro"><span class="co-kicker">Paths</span><h2>Choose a route through ${esc(cfg.name)}</h2><p>Each path picks the ${u1}s for one goal, in the order to learn them. Follow one and the Learn page and your next milestone follow it too.</p></div>
      <div class="co-grid">${cfg.paths.map((p) => { const pct = p.units.reduce((a, n) => a + unitPct(n), 0) / p.units.length, ls = p.units.reduce((a, n) => a + (units.find((u) => u.n === n)?.lessons.length || 0), 0);
        const t = trackOf(units.find((u) => u.n === p.units[0]));
        return `<div class="co-pcard ${S.path === p.id ? "on" : ""}" style="--a:${t.from};--b:${t.to}"><h3>${esc(p.name)}</h3><p>${esc(p.sub)}</p><small>${p.units.length} ${u1}s · ${ls} lessons · ${Math.round(pct * 100)}% done</small><div class="co-bar"><i style="width:${pct * 100}%"></i></div>
          <ol>${p.units.map((n) => { const u = units.find((x) => x.n === n); return `<li class="${unitPct(n) === 1 ? "done" : ""}"><a href="#/learn/${u.id}">${esc(u.title)}</a></li>`; }).join("")}</ol>
          <button class="btn ${S.path === p.id ? "btn-ghost" : "btn-light"} lg btn-sm" data-path="${p.id}"><span>${S.path === p.id ? "Following ✓ (stop)" : "Follow this path"}</span></button></div>`; }).join("")}</div>`;
    main.querySelectorAll("[data-path]").forEach((b) => b.addEventListener("click", () => { S.path = S.path === b.dataset.path ? null : b.dataset.path; save(); if (S.path) { toast(`Following <b>${esc(cfg.paths.find((p) => p.id === S.path).name)}</b>`); go("learn"); } else viewPaths(); paintSide(); }));
  }
  function viewTracks() {
    main.innerHTML = `<div class="co-intro"><span class="co-kicker">Tracks</span><h2>${cfg.tracks.length} tracks, ${units.length} ${u1}s, ${lessons.length.toLocaleString()} lessons</h2><p>The whole of ${esc(cfg.name)}, grouped by theme. Jump into any unit.</p></div>
      <div class="co-grid">${cfg.tracks.map((t) => { const us = t.units.map((n) => units.find((u) => u.n === n)).filter(Boolean), tot = us.reduce((a, u) => a + u.lessons.length, 0), dn = us.reduce((a, u) => a + unitDone(u), 0);
        return `<div class="co-tcard" style="--a:${t.from};--b:${t.to}"><div class="co-tban"><h3>${esc(t.name)}</h3><small>${dn} / ${tot} lessons</small></div><ul>${us.map((u) => `<li><a href="#/learn/${u.id}"><span>${U} ${u.n}</span>${esc(u.title)}</a><i style="--p:${unitDone(u) / u.lessons.length}"></i></li>`).join("")}</ul></div>`; }).join("")}</div>`;
  }

  // ---------- problems: every check question in the course, filterable ----------
  async function viewProblems() {
    main.innerHTML = `<div class="co-panel"><p>Loading the problem bank…</p></div>`;
    const all = await allNotes();
    const probs = lessons.flatMap((l) => (all[l.id]?.mcq || []).map((m, i) => ({ ...m, l, pid: `${l.id}#${i}` })));
    const f = { unit: "", d: "", s: "" };
    const paint = () => {
      const list = probs.filter((p) => (!f.unit || p.l.unit.id === f.unit) && (!f.d || p.d === Number(f.d)) && (!f.s || (f.s === "solved") === Boolean(S.solved[p.pid])));
      const shown = list.slice(0, 40);
      main.querySelector(".co-plist").innerHTML = shown.length ? shown.map((p) => `<div class="co-prob ${S.solved[p.pid] ? "is-solved" : ""}"><div class="co-pmeta"><a href="#/lesson/${p.l.id}">${U} ${p.l.unit.n} · ${esc(p.l.title)}</a><span class="d${p.d}">${["", "Easy", "Medium", "Hard"][p.d]}</span>${S.solved[p.pid] ? `<span class="ok">${ic("check")} Solved</span>` : ""}</div>${mcqHtml(p, p.pid)}</div>`).join("") + (list.length > 40 ? `<p class="co-empty">Showing 40 of ${list.length}. Narrow it down with the filters.</p>` : "") : `<p class="co-empty">No problems match these filters.</p>`;
      main.querySelector(".co-pcount").textContent = `${list.length} problems · ${probs.filter((p) => S.solved[p.pid]).length} solved`;
      wireMcq(main.querySelector(".co-plist"));
    };
    const withNotes = units.filter((u) => u.lessons.some((l) => all[l.id]?.mcq.length));
    main.innerHTML = `<div class="co-intro"><span class="co-kicker">Problems</span><h2>Problem bank</h2><p>Every check question in the course in one place. Solve one first time for +${XP.problem} XP.</p></div>
      <div class="co-filters"><select data-f="unit"><option value="">All ${u1}s</option>${withNotes.map((u) => `<option value="${u.id}">${U} ${u.n}: ${esc(u.title)}</option>`).join("")}</select>
      <select data-f="d"><option value="">Any difficulty</option><option value="1">Easy</option><option value="2">Medium</option><option value="3">Hard</option></select>
      <select data-f="s"><option value="">Solved and unsolved</option><option value="unsolved">Unsolved</option><option value="solved">Solved</option></select><span class="co-pcount"></span></div><div class="co-plist"></div>`;
    main.querySelectorAll("[data-f]").forEach((s) => s.addEventListener("change", () => { f[s.dataset.f] = s.value; paint(); }));
    paint();
  }

  // ---------- leaderboard ----------
  function viewLeaderboard() {
    const wk = weekStart(), r = rng(Math.floor(wk / DAY)), mine = week().xp;
    const names = ["Ada", "Niels", "Lise", "Emmy", "Paul", "Chien-Shiung", "Richard", "Jocelyn", "Satyendra", "Vera", "Hideki", "Mae", "Subrahmanyan", "Donna"];
    const elapsed = Math.min(7, (Date.now() - wk) / DAY + 0.3);
    const rows = shuffle(names, r).slice(0, 14).map((n) => ({ n, xp: Math.round(r() * r() * 110 * elapsed) }));
    rows.push({ n: "You", xp: mine, me: true }); rows.sort((a, b) => b.xp - a.xp);
    const L = levelOf(totalXp()).n, league = ["Bronze", "Silver", "Gold", "Sapphire", "Ruby", "Emerald", "Diamond"][Math.min(6, Math.floor(L / 3))];
    main.innerHTML = `<div class="co-intro"><span class="co-kicker">Leaderboard</span><h2>${league} league · this week</h2><p>Earn XP to climb. The top 5 move up a league on Monday. <b>This is an example league:</b> the other names are made up until live leagues open with Gradify accounts. Your own XP is real.</p></div>
      <ol class="co-league">${rows.map((x, i) => `<li class="${x.me ? "me" : ""} ${i < 5 ? "up" : i >= rows.length - 3 ? "down" : ""}"><b>${i + 1}</b><span class="av" style="--h:${[...x.n].reduce((a, c) => a + c.charCodeAt(0), 0) % 360}">${x.n[0]}</span><span>${esc(x.n)}</span><span class="xp">${x.xp} XP</span></li>`).join("")}</ol>`;
  }

  // ---------- my progress: the course and the account together ----------
  async function viewMe() {
    const st = stats(), xp = st.xp, L = levelOf(xp), sk = streak();
    const byDay = {}; for (const r of S.log) byDay[day(r.t)] = (byDay[day(r.t)] || 0) + r.xp;
    const weeks = 18, start = weekStart() - (weeks - 1) * 7 * DAY;
    const cells = Array.from({ length: weeks * 7 }, (_, i) => { const t = start + i * DAY, d = day(t), v = byDay[d] || 0; return t > Date.now() ? "<i class=future></i>" : `<button style="--v:${Math.min(1, v / Math.max(S.goal, 1))}" data-day="${d}" title="${d}: ${v} XP"></button>`; }).join("");
    const last14 = Array.from({ length: 14 }, (_, i) => { const d = day(Date.now() - (13 - i) * DAY); return [d, byDay[d] || 0]; }), mx = Math.max(S.goal, ...last14.map((x) => x[1]));
    main.innerHTML = `<div class="co-intro"><span class="co-kicker">My progress</span><h2>Your ${esc(cfg.name)}</h2><p>Everything you've done here, and what's saved to your Gradify account.</p></div>
      <div class="co-tiles">${[["Level", L.n], ["Total XP", xp.toLocaleString()], ["Day streak", sk.n], ["Best streak", sk.best], ["Lessons", `${st.lessons} / ${lessons.length}`], ["Units cleared", st.units], ["Quizzes passed", st.quizzes], ["Problems solved", st.solved]].map(([k, v]) => `<div><small>${k}</small><b>${v}</b></div>`).join("")}</div>
      <section class="co-panel"><h3>Activity</h3><div class="co-heat">${cells}</div><p class="co-dayinfo">Pick a day to see what you did.</p></section>
      <section class="co-panel"><h3>XP, last 14 days</h3><div class="co-bars">${last14.map(([d, v]) => `<div title="${d}: ${v} XP"><i style="height:${(v / mx) * 100}%" class="${v >= S.goal ? "hit" : ""}"></i><small>${d.slice(8)}</small></div>`).join("")}<span class="co-goalline" style="bottom:${(S.goal / mx) * 100}%">goal ${S.goal}</span></div></section>
      <section class="co-panel"><h3>Tracks</h3><div class="co-mastery">${cfg.tracks.map((t) => { const us = t.units.map((n) => units.find((u) => u.n === n)).filter(Boolean), tot = us.reduce((a, u) => a + u.lessons.length, 0), dn = us.reduce((a, u) => a + unitDone(u), 0); return `<div style="--a:${t.from};--b:${t.to}"><span>${esc(t.name)}</span><div class="co-bar"><i style="width:${(dn / tot) * 100}%"></i></div><small>${dn}/${tot}</small></div>`; }).join("")}</div></section>
      <section class="co-panel"><h3>Badges</h3><div class="co-badgelist">${BADGES.map((b) => `<div class="${b.ok(st) ? "on" : ""}">${ic(b.ok(st) ? "star" : "lock")}<b>${b.name}</b><small>${b.d}</small></div>`).join("")}</div></section>
      <section class="co-panel co-saved"><h3>Saved to your account</h3><p class="co-empty">Loading…</p></section>`;
    main.querySelectorAll("[data-day]").forEach((b) => b.addEventListener("click", () => {
      const rows = S.log.filter((r) => day(r.t) === b.dataset.day), kinds = {};
      for (const r of rows) kinds[r.k] = (kinds[r.k] || 0) + 1;
      main.querySelector(".co-dayinfo").textContent = rows.length ? `${b.dataset.day}: ${rows.reduce((a, r) => a + r.xp, 0)} XP from ${Object.entries(kinds).map(([k, n]) => `${n} ${k}${n > 1 ? "s" : ""}`).join(", ")}.` : `${b.dataset.day}: nothing that day.`;
    }));
    try {
      const s = await store(), docs = (await s.listDocuments()).filter((d) => d.title?.startsWith(`${cfg.name}: `)), cards = await s.listCards();
      const count = (id) => cards.filter((c) => c.document_id === id).length;
      main.querySelector(".co-saved").innerHTML = `<h3>Saved to your account · ${docs.length} lesson${docs.length === 1 ? "" : "s"}</h3>${docs.length ? `<ul class="co-docs">${docs.map((d) => { const lid = d.file_name?.split("/")[1]; return `<li><div><b>${esc(d.title.slice(cfg.name.length + 2))}</b><small>${count(d.id)} cards · saved ${new Date(d.created_at).toLocaleDateString()}</small></div>${lid && byId[lid] ? `<a href="#/lesson/${lid}">Notes</a>` : ""}<a href="${cfg.app || "app.html"}#/deck/${d.id}">Study the cards</a></li>`; }).join("")}</ul>` : `<p class="co-empty">Nothing saved yet. Use <b>Save notes and cards</b> on any lesson to keep it in your Gradify account, where the cards join your daily study.</p>`}
        <p class="co-acct">${s.mode === "cloud" ? "Signed in: this syncs to every device." : `Saved on this device. <a href="${cfg.app || "app.html"}#/account">Sign in</a> to keep it everywhere.`}</p>`;
    } catch { main.querySelector(".co-saved").innerHTML = `<h3>Saved to your account</h3><p class="co-empty">Your account isn't reachable from this browser.</p>`; }
  }

  function viewFeatures() {
    const f = [
      ["Learning path", `A road through all ${lessons.length.toLocaleString()} lessons, with your car parked at the next one.`],
      ["Full notes", "Every lesson has notes: the ideas, equations, worked examples and common mistakes."],
      ["Check questions", "Questions at the end of each lesson, with an explanation for every answer."],
      ["Flashcards", "Flip through a lesson's cards, or save them to your account for daily study."],
      [`${U} quizzes`, `Pass with 75% for +${XP.quiz} XP; score 100% for a bonus.`],
      ["Spaced review", "Cards come back just before you'd forget them."],
      ["Problem bank", `Every question in the course, filtered by ${u1}, difficulty and whether you've solved it.`],
      ["Paths", `${cfg.paths.length} routes through the course for different goals.`],
      ["XP and levels", "Earn XP for everything you do. Levels get further apart as you go."],
      ["Streaks and daily goals", "Set a daily XP goal and keep your streak alive."],
      ["Weekly challenges", `A new challenge every Monday, worth +${XP.weekly} XP.`],
      ["Badges", `${BADGES.length} badges to earn.`],
      ["Leagues", "Climb the weekly league."],
      ["Your account", "XP counts in Gradify LifeOS; saved notes and cards live in your account."],
      ...(cfg.extras || []),
    ];
    main.innerHTML = `<div class="co-intro"><span class="co-kicker">Features</span><h2>Everything in ${esc(cfg.name)}</h2></div><div class="co-feats">${f.map(([t, d, href]) => `<${href ? `a href="${href}"` : "div"} class="co-feat"><b>${t}</b><p>${d}</p></${href ? "a" : "div"}>`).join("")}</div>`;
  }

  // ---------- router ----------
  const go = (h) => { location.hash = `#/${h}`; };
  async function route() {
    const [v = "learn", arg] = location.hash.replace(/^#\/?/, "").split("/");
    const view = VIEWS.some(([id]) => id === v) || ["lesson", "quiz"].includes(v) ? v : "learn";
    root.querySelectorAll(".co-tabs a").forEach((a) => a.toggleAttribute("aria-current", a.dataset.v === (view === "lesson" || view === "quiz" ? "learn" : view)));
    const wide = ["me", "features", "leaderboard", "tracks", "paths"].includes(view);
    side.hidden = wide; root.querySelector(".co-body").classList.toggle("wide", wide);
    if (view !== "learn") scrollTo(0, 0);
    if (view === "learn") { if (arg) openUnit(arg); viewLearn(arg); }
    else if (view === "lesson") await viewLesson(arg);
    else if (view === "quiz") await viewQuiz(arg);
    else if (view === "review") await viewReview();
    else if (view === "paths") viewPaths();
    else if (view === "tracks") viewTracks();
    else if (view === "problems") await viewProblems();
    else if (view === "leaderboard") viewLeaderboard();
    else if (view === "me") await viewMe();
    else viewFeatures();
    paintSide();
  }
  addEventListener("hashchange", route);
  route();
  reviewPool().then(paintHud);
  return { state: () => S, lessons, units };
}
