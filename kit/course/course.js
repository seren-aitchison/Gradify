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
import { parseNotes, lessonHtml, lessonText, lessonFrame, authorityCards, esc, inline, norm } from "./notes.js";
import { renderQuestion, wireQuestions, normalize, TYPES as QTYPES } from "../assess/questions.js";
import { makeAttempt, analyse } from "../assess/attempts.js";
import { evidenceFromAttempts, sixProfiles, revisionQueue, labPractice, SIX } from "../learning/mastery.js";
import { explorationIds, evidenceClass } from "../learning/evidence-class.js";
import { sixHtml, calibrationHtml } from "../learning/mastery-view.js";
import { learnerOf, needsSetup, applyPrefs } from "../data/profile.js";
import { paceFor } from "../learning/pace.js";
import { trackView, track } from "../core/analytics.js";
import { callFunction } from "../data/functions.js";
import { mergeProgress, cloudCopy, mergeAttempts, queueAttempt, outboxAttempts, confirmAttempts } from "./progress.js";
import { mountRevalidation } from "./revalidation.js";
import { scoreFeedback } from "../assess/tutor.js";
import { feedbackHtml, paras } from "../assess/tutor-view.js";
import { mountTutorPanel, directorHtml } from "./tutor-panel.js";
import { readLab, labState } from "./lab-state.js";
import { SUPABASE_URL } from "../../gradify.config.js";
import { buildExam, runExam, FORMATS } from "../assess/exam.js";
import { reviewLabel } from "./review.js";
import { REVIEWS } from "./reviews.js";
import { FINGERPRINTS } from "./ix-manifest.js";

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
  cube: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z M4 7.5l8 4.5 8-4.5 M12 12v9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
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
  // what a course calls its tracks ("Track" by default, "Stage" for the SciGradify sciences)
  const TW = cfg.trackWord || "Track", tw1 = TW.toLowerCase();
  // the interactives tab: "Practice" (law, nursing) or "Lab" (sciences); interactives can also sit inside lessons (IX: lines)
  // an interactive's evidence map (challenge → lesson): the course's (kit/courses/*/evidence.js), with any the
  // interactive carries itself taking precedence
  const PL = cfg.practiceLabel || "Practice", ixs = (cfg.interactives || []).map((x) => (cfg.evidence?.[x.id] ? { ...x, evidence: { ...cfg.evidence[x.id], ...(x.evidence || {}) } } : x)), ixById = Object.fromEntries(ixs.map((x) => [x.id, x]));
  // challenges that are exploration, not evidence of skill (cfg.exploration; kit/learning/evidence-class.js)
  const EXPLORE = explorationIds(cfg.exploration);
  // courses with a QA record (cfg.qa) label any unit that hasn't passed every quality stage as a draft
  // courses that set reviewLine show each written lesson's review state and date from cfg.qa
  const reviewLine = (u) => { const r = cfg.qa?.[u.id] || {}; const d = r.reviewed?.date; return `${d ? `Last reviewed ${esc(d)}${r.reviewed.by ? ` (${esc(r.reviewed.by)})` : ""}` : "Not yet reviewed"} · sources ${r.sources?.date ? `checked ${esc(r.sources.date)}` : "pending verification"}${cfg.writtenOn?.[u.id] ? ` · written ${esc(cfg.writtenOn[u.id])}` : ""}`; };
  const isReady = (u) => !cfg.qa || Boolean(cfg.qa[u.id]?.reviewed && cfg.qa[u.id]?.sources && cfg.qa[u.id]?.signoff);
  // cfg.publish: the course is published while its review stages continue; unready units aren't labelled drafts
  // (the outstanding checks are bookmarked in docs/qa/<slug>-review-queue.md)
  const isDraft = (u) => !cfg.publish && !isReady(u);
  const units = cfg.units, lessons = units.flatMap((u) => u.lessons.map((l, i) => ({ ...l, unit: u, i })));
  const byId = Object.fromEntries(lessons.map((l) => [l.id, l]));
  const trackOf = (u) => cfg.tracks.find((t) => t.units.includes(u.n)) || cfg.tracks[0];
  let S = (() => { try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch { return null; } })() || {};
  S = { done: {}, chests: {}, quiz: {}, solved: {}, cards: {}, log: [], goal: 30, path: null, open: [], closed: [], weekly: {}, saved: {}, mocks: {}, attempts: [], ...S };
  // saved on this device at once and, when signed in, to the account a few seconds later (kit/course/progress.js)
  let syncT = null;
  const save = () => {
    S.updated = Date.now();
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch { /* private mode: progress lasts this visit */ }
    clearTimeout(syncT); syncT = setTimeout(pushProgress, 3000);
  };
  // write the device copy without scheduling another account sync (used for bookkeeping such as sync status)
  const keep = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch { /* private mode */ } };
  let retryT = null;
  const failed = (e) => {
    const msg = String(e?.message || e || ""), auth = /jwt|token|auth|401|sign/i.test(msg) || e?.status === 401;
    S.sync = { ...(S.sync || {}), failedAt: Date.now(), reason: !navigator.onLine ? "offline" : auth ? "signed-out" : "error" }; keep(); paintSide();
    // try again in a minute while the page is open; the next visit and coming back online also retry
    clearTimeout(retryT); retryT = setTimeout(() => { pushProgress(); flushOutbox(); }, 60000);
  };
  async function pushProgress() {
    clearTimeout(syncT); syncT = null;
    let s; try { s = await store(); } catch { return; }
    if (s.mode !== "cloud" || !s.saveCourseProgress) return;
    try { await s.saveCourseProgress(cfg.slug, cfg.site, cloudCopy(S)); const was = S.sync?.failedAt; S.sync = { ok: Date.now() }; keep(); if (was) paintSide(); }
    catch (e) { failed(e); }   // the device copy is kept, and nothing completed is lost: the next sync merges it
  }
  // answers waiting for the account (kit/course/progress.js outbox): sent in batches, removed only once confirmed
  let flushing = false;
  async function flushOutbox() {
    if (flushing || !(S.outbox || []).length) return;
    let s; try { s = await store(); } catch { return; }
    if (s.mode !== "cloud" || !s.logAttempts) return;
    const list = outboxAttempts(S); flushing = true;
    try { await s.logAttempts(list); confirmAttempts(S, list.map((a) => a.id)); keep(); }
    catch (e) { failed(e); }
    finally { flushing = false; }
  }
  // leaving the page or losing the tab: send what's waiting now rather than after the usual delay
  // the store is known by now (it resolves at mount), so this stays synchronous, as the browser requires
  const flushNow = () => {
    if (syncT) {
      const sent = storeNow?.mode === "cloud" && storeNow.beaconCourseProgress?.(cfg.slug, cfg.site, cloudCopy(S));
      if (sent) { clearTimeout(syncT); syncT = null; } else pushProgress();
    }
    flushOutbox();
  };
  addEventListener("pagehide", flushNow);
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") flushNow(); });
  addEventListener("online", () => { pushProgress(); flushOutbox(); });
  // what the learner is told about where their work is (only shown when signed in, or when something is waiting)
  function syncText(mode) {
    const waiting = (S.outbox || []).length, f = S.sync?.failedAt && (!S.sync.ok || S.sync.failedAt > S.sync.ok) ? S.sync.reason : null;
    const n = waiting ? ` ${waiting} ${waiting === 1 ? "answer is" : "answers are"} waiting to sync.` : "";
    if (mode !== "cloud") return null;
    if (f === "offline") return { warn: true, text: `You're offline. Everything is saved on this device and will sync when you're back online.${n}` };
    if (f === "signed-out") return { warn: true, text: `Your sign-in has expired. Everything is saved on this device; sign in again to sync it.${n}` };
    if (f) return { warn: true, text: `Couldn't reach your account just now. Everything is saved on this device and Gradify will try again.${n}` };
    if (waiting) return { warn: false, text: `Saving to your account…${n}` };
    return S.sync?.ok ? { warn: false, text: `Synced to your account at ${new Date(S.sync.ok).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}.` } : { warn: false, text: "Signed in: your progress syncs to every device." };
  }
  // on load: merge the account's copy into this device's, then show the result
  async function pullProgress() {
    try {
      const s = await store(); if (s.mode !== "cloud" || !s.getCourseProgress) return;
      const cloud = await s.getCourseProgress(cfg.slug);
      const before = JSON.stringify(cloudCopy(S));
      if (cloud) S = mergeProgress(S, cloud);
      // answers made on other devices, so mastery, Revisit and Your plan see every one
      let added = 0;
      try { const mine = (await s.listAttempts(400)).filter((a) => a.subject === cfg.slug), n = S.attempts.length; S.attempts = mergeAttempts(S.attempts, mine); added = S.attempts.length - n; } catch { /* attempts table not set up yet */ }
      keep();
      if (!cloud || JSON.stringify(cloudCopy(S)) !== JSON.stringify(cloud)) pushProgress(); else { S.sync = { ok: Date.now() }; keep(); }
      flushOutbox();
      if (JSON.stringify(cloudCopy(S)) !== before || added) route();
    } catch { /* offline or not set up: carry on with the device copy */ }
  }

  // the learner's Gradify account (this device, or their cloud account when signed in)
  let storeP = null, storeMode = null, storeNow = null;   // storeNow: for the synchronous save when the page closes
  const store = () => (storeP ||= (async () => {
    let st;
    try { const cloud = await CloudStore.create(), user = cloud ? await cloud.user() : null; st = scopeToSite(user ? cloud : new LocalStore(), cfg.site); }
    catch { st = scopeToSite(new LocalStore(), cfg.site); }
    storeMode = st.mode; storeNow = st; return st;
  })());

  // the shared learner profile (kit/data/profile.js): exam date, daily time, prior knowledge, display
  // settings. The daily XP goal follows the learner's daily study time until they pick one here.
  applyPrefs();
  trackView(cfg.site);
  let prof = null;
  const GOAL_FOR = (m) => (m <= 10 ? 20 : m <= 20 ? 30 : m <= 45 ? 50 : 100);
  store().then((st) => st.getProfile()).then((p) => { prof = { ...p, learner: learnerOf(p) }; if (!S.goalChosen && p?.daily_minutes) S.goal = GOAL_FOR(p.daily_minutes); paintSide(); }).catch(() => {});

  // notes, loaded a unit at a time
  const cache = {};
  const unitNotes = (u) => (cache[u.id] ||= Promise.resolve(!cfg.written || cfg.written.includes(u.id) ? cfg.notes(u.id) : null).catch(() => null).then((txt) => {
    const parsed = parseNotes(txt), byTitle = Object.fromEntries(parsed.map((p) => [norm(p.title), p]));
    const out = Object.fromEntries(u.lessons.map((l) => [l.id, byTitle[norm(l.title)] || null]));
    // every question gets a key: its permanent id where it has one, else the older position-based key
    // (physics). Progress saved under a position-based key moves to the permanent id the first time
    // the notes load, while positions still match what the learner answered.
    let moved = false;
    for (const l of u.lessons) {
      const L = out[l.id]; if (!L) continue;
      L.items = [...L.mcq.map((m, i) => ({ Q: m.Q || normalize(m), key: m.id || `${l.id}#${i}`, legacy: `${l.id}#${i}` })), ...L.tasks.map((q, i) => ({ Q: q, key: q.id || `${l.id}#t${i}`, legacy: `${l.id}#t${i}` }))];
      for (const it of L.items) { it.l = byId[l.id]; it.v = cfg.questionVersions?.[it.key]?.v ?? null; if (it.key !== it.legacy && S.solved[it.legacy] && !S.solved[it.key]) { S.solved[it.key] = S.solved[it.legacy]; delete S.solved[it.legacy]; moved = true; } }
    }
    if (moved) save();
    return out;
  }));
  const notesFor = async (l) => (await unitNotes(l.unit))[l.id];
  const allNotes = async () => Object.assign({}, ...(await Promise.all(units.map(unitNotes))));

  // ---------- assessment: one path for every question (kit/assess) ----------
  const LEVELS = cfg.levels || ["Easy", "Medium", "Hard"];
  const pageQs = new Map();                                   // key → item, for questions on the current view
  const qHtml = (it, opts = {}) => { pageQs.set(it.key, it); return renderQuestion(it.Q, it.key, { levels: LEVELS, ...opts }); };
  function record(it, context, contextId, res, meta = {}) {
    const a = makeAttempt({ site: cfg.site, subject: cfg.slug, context, contextId, Q: it.Q, key: it.key, version: it.v, lesson: it.l?.id, module: it.l?.module, unit: it.l?.unit.id, response: meta.response, result: res, meta });
    S.attempts.push(a); if (S.attempts.length > 2000) S.attempts.splice(0, S.attempts.length - 2000);
    queueAttempt(S, a.id); save();
    flushOutbox();
    return a;
  }
  // wire practice questions in el: records every attempt; first-try success solves the question for XP
  function wirePractice(el, context, contextId, xp = XP.check) {
    wireQuestions(el, (k) => pageQs.get(k)?.Q, (Q, res, first, box, meta) => {
      const it = pageQs.get(box.dataset.key); record(it, context, contextId, res, meta);
      if (!res.correct && !res.self && Q.options && it.l && !box.querySelector(".co-whyw")) offerDiagnosis(box, Q, it, meta.response);
      if (first && res.score >= 0.7 && !S.solved[it.key]) { S.solved[it.key] = Date.now(); save(); award(xp, "check", it.key); }
    });
  }

  // "Why was I wrong?": Gradify AI names the likely misconception behind a wrong choice and gives a check question
  function offerDiagnosis(box, Q, it, chosen) {
    const wrap = document.createElement("div"); wrap.className = "co-whyw";
    wrap.innerHTML = `<button type="button" class="btn btn-ghost btn-sm"><span>Why was I wrong?</span></button><div class="co-whyout" aria-live="polite"></div>`;
    box.append(wrap);
    wrap.querySelector("button").addEventListener("click", async (e) => {
      const out = wrap.querySelector(".co-whyout"); e.currentTarget.disabled = true; out.innerHTML = `<p class="co-empty">Looking at your answer…</p>`;
      try {
        // the server reads the lesson's own notes by id (kit/assess/canon.js), so only the id and title are sent
        const r = await askTutor({ mode: "diagnose", lesson: { id: it.l.id, title: it.l.title }, question: { q: Q.q, options: Q.options.map((o) => ({ text: o.text, correct: o.correct })), chosen, why: Q.why } });
        out.innerHTML = `<div class="co-diag"><p><b>${esc(r.misconception)}</b></p>${paras(r.explanation)}<details><summary>Check: ${esc(r.check.question)}</summary><p>${esc(r.check.answer)}</p></details><p class="aq-note">From Gradify AI${r.fromLesson === false ? ", going beyond this lesson's notes" : ", using this lesson's notes"}. It can be wrong.</p></div>`;
      } catch (err) { out.innerHTML = err.signin ? signinLine("This", "") : `<p class="co-empty">${esc(err.message)}</p>`; e.currentTarget.disabled = false; }
    });
  }

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
  const VIEWS = [...(cfg.overview ? [["overview", "Overview"]] : []), ["learn", "Learn"], ["review", "Review"], ["paths", "Paths"], ["tracks", `${TW}s`], ["problems", "Problems"],
    ...(cfg.authorities ? [["cases", cfg.authorities]] : []), ...(cfg.writing?.length ? [["write", "Write"]] : []), ...(cfg.revalidation ? [["revalidation", "Revalidation"]] : []), ...(cfg.exams ? [["exams", "Exams"]] : []), ...(cfg.interactives ? [["practice", PL]] : []), ...(cfg.workspace ? [[cfg.workspace.route, cfg.workspace.label]] : []),
    ["leaderboard", "Leaderboard"], ["me", "My progress"], ["features", "Features"]];
  roadDefs();
  root.classList.add("co");
  if (cfg.theme) { root.classList.add("co-themed"); if (cfg.theme.spectrum) root.style.setProperty("--spectrum", cfg.theme.spectrum); if (cfg.theme.accent) root.style.setProperty("--co-accent", cfg.theme.accent); }
  root.innerHTML = `
    <div class="co-head">
      <div class="co-title"><span class="co-kicker">${esc(cfg.site)} course</span><h1>${esc(cfg.name)}</h1></div>
      <div class="co-hud" aria-label="Your progress"></div>
    </div>
    ${cfg.notice ? `<p class="co-notice" role="note">${cfg.notice}</p>` : ""}
    <nav class="co-tabs" aria-label="${esc(cfg.name)}">${VIEWS.map(([id, t]) => `<a href="#/${id}" data-v="${id}">${t}${id === "review" ? '<i class="co-due" hidden></i>' : ""}</a>`).join("")}
      <label class="co-search">${ic("search")}<input type="search" placeholder="Search ${lessons.length.toLocaleString()} lessons" aria-label="Search lessons"></label></nav>
    <div class="co-body"><main class="co-main"></main><aside class="co-side"></aside></div>`;
  const main = root.querySelector(".co-main"), side = root.querySelector(".co-side"), hud = root.querySelector(".co-hud");

  // search
  // the tab bar scrolls sideways when the tabs don't fit: the search shrinks to an icon, the edges fade where
  // there's more, and the current tab is kept in view
  const tabs = root.querySelector(".co-tabs");
  const tabEdges = () => {
    tabs.classList.toggle("more-l", tabs.scrollLeft > 2);
    tabs.classList.toggle("more-r", tabs.scrollLeft + tabs.clientWidth < tabs.scrollWidth - 2);
  };
  const fitTabs = () => {
    tabs.classList.remove("tight");
    tabs.classList.toggle("tight", tabs.scrollWidth > tabs.clientWidth + 2);
    tabEdges();
  };
  tabs.addEventListener("scroll", tabEdges, { passive: true });
  addEventListener("resize", fitTabs);
  const showTab = () => {
    const a = tabs.querySelector("a[aria-current]"); if (!a) return;
    const l = a.offsetLeft, r = l + a.offsetWidth;
    if (l < tabs.scrollLeft + 24) tabs.scrollLeft = Math.max(0, l - 24);
    else if (r > tabs.scrollLeft + tabs.clientWidth - 24) tabs.scrollLeft = r - tabs.clientWidth + 24;
    tabEdges();
  };
  requestAnimationFrame(fitTabs);
  document.fonts?.ready.then(fitTabs);   // tab widths change once the web fonts load
  const q = root.querySelector(".co-search input");
  // the results float above the page: inside the tab bar, which scrolls sideways, they were clipped out of sight
  const res = Object.assign(document.createElement("div"), { className: "co-results co-float", hidden: true });
  document.body.append(res);
  const placeResults = () => {
    if (res.hidden) return;
    const r = q.closest(".co-search").getBoundingClientRect(), w = Math.min(420, innerWidth - 16);
    res.style.width = `${w}px`;
    res.style.top = `${Math.round(r.bottom + 8)}px`;
    res.style.left = `${Math.round(Math.min(Math.max(8, r.right - w), innerWidth - w - 8))}px`;
  };
  addEventListener("resize", placeResults); addEventListener("scroll", placeResults, { passive: true });
  // opening the search in a crowded bar scrolls it into view (after its width transition)
  q.addEventListener("focus", () => setTimeout(() => { if (tabs.classList.contains("tight")) { tabs.scrollLeft = tabs.scrollWidth; tabEdges(); } placeResults(); }, 220));
  const searchHtml = (raw) => {
    const t = norm(raw);
    const hits = [...units.filter((u) => norm(u.title).includes(t)).map((u) => ({ href: `#/learn/${u.id}`, k: `${U} ${u.n}`, t: u.title })),
      ...ixs.filter((x) => norm(x.title).includes(t)).map((x) => ({ href: `#/practice/${x.id}`, k: x.kind, t: x.title })),
      ...lessons.filter((l) => norm(l.title).includes(t)).map((l) => ({ href: `#/lesson/${l.id}`, k: `${U} ${l.unit.n} · ${S.done[l.id] ? "done" : "lesson"}`, t: l.title }))].slice(0, 12);
    return hits.length ? hits.map((h) => `<a href="${h.href}"><small>${esc(h.k)}</small>${esc(h.t)}</a>`).join("") : `<p>No lessons match.</p>`;
  };
  q.addEventListener("input", () => {
    if (norm(q.value).length < 2) { res.hidden = true; return; }
    res.innerHTML = searchHtml(q.value);
    res.hidden = false;
    placeResults();
  });
  res.addEventListener("click", () => { res.hidden = true; q.value = ""; });
  document.addEventListener("click", (e) => { if (!e.target.closest(".co-search, .co-float")) res.hidden = true; });
  q.addEventListener("keydown", (e) => { if (e.key === "Escape") { res.hidden = true; q.blur(); } });

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
    const sw = syncText(storeMode), syncWarn = sw?.warn ? sw.text : null;
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
      ${syncWarn ? `<section class="co-card co-syncwarn" role="status"><p>${esc(syncWarn)}</p></section>` : ""}
      ${planHtml()}
      ${nl ? `<section class="co-card"><span class="co-kicker">${ic("flag")} Next milestone</span><h3>Finish ${U} ${nu.n}: ${esc(nu.title)}</h3><p>${left} lesson${left === 1 ? "" : "s"} to go, then the ${u1} quiz for +${XP.quiz} XP.</p><a class="btn btn-light lg btn-sm co-go" href="#/lesson/${nl.id}"><span>Continue: ${esc(nl.title)}</span></a></section>` : `<section class="co-card"><h3>Course complete</h3><p>Every lesson done. Keep your memory fresh in Review.</p></section>`}
      <section class="co-card"><span class="co-kicker">${ic("trophy")} Weekly challenge</span><h3>${c.name}</h3><p>${c.d}. Reward: +${XP.weekly} XP.</p><div class="co-bar warm"><i style="width:${(cw / c.n) * 100}%"></i></div><small>${cw} / ${c.n}${S.weekly[String(weekStart())] ? " · claimed" : ""} · resets Monday</small></section>
      <section class="co-card"><span class="co-kicker">Course progress</span><h3>${Object.keys(S.done).length} / ${lessons.length} lessons</h3>
        <div class="co-dots">${units.map((u) => { const t = trackOf(u), p = unitDone(u) / u.lessons.length; return `<a href="#/learn/${u.id}" title="${U} ${u.n}: ${esc(u.title)} (${Math.round(p * 100)}%)" style="--a:${t.from};--b:${t.to};--p:${p}"></a>`; }).join("")}</div></section>
      <section class="co-card"><span class="co-kicker">Badges · ${got.size} / ${BADGES.length}</span><div class="co-badges">${BADGES.map((b) => `<span class="${got.has(b.id) ? "on" : ""}" title="${b.name}: ${b.d}">${ic(got.has(b.id) ? "star" : "lock")}</span>`).join("")}</div><a class="co-more" href="#/me">See all your progress →</a></section>`;
    side.querySelector("select").addEventListener("change", (e) => { S.goal = Number(e.target.value); S.goalChosen = true; save(); paintSide(); });
  }

  // ---------- your plan: today's work and exam pace, from the shared profile ----------
  function planHtml() {
    if (!prof) return "";
    const acct = `${cfg.app || "app.html"}#/account`;
    if (needsSetup(prof) || !prof.daily_minutes) return `<section class="co-card co-plan"><span class="co-kicker">${ic("target")} Your plan</span><p>Tell Gradify your exam date and how long you can study each day, and every course plans your days around it.</p><a class="btn btn-ghost btn-sm" href="${acct}"><span>Set up your plan</span></a></section>`;
    const path = S.path && cfg.paths.find((p) => p.id === S.path);
    const pool = units.filter((u) => (!cfg.written || cfg.written.includes(u.id)) && (!path || path.units.includes(u.n))).flatMap((u) => (path ? pathLessons(path, u) : u.lessons));
    const remaining = pool.filter((l) => !S.done[l.id]).length, prior = prof.learner.prior[cfg.site] || "new";
    // the profile's exam date belongs to the learner's main subject
    const examDate = prof.site === cfg.site ? prof.exam_date : null;
    const p = paceFor({ examDate, dailyMinutes: prof.daily_minutes, remaining, dueCards: dueCards().length, dueQuestions: revisionQueue(S.attempts || [], { limit: 500 }).length, prior });
    const t = p.today, parts = [t.cards && `${t.cards} flashcard${t.cards === 1 ? "" : "s"}`, t.questions && `${t.questions} question${t.questions === 1 ? "" : "s"} to revisit`, t.lessons && `${t.lessons} new lesson${t.lessons === 1 ? "" : "s"}`].filter(Boolean);
    const fmt = (d) => new Date(`${d}T12:00:00Z`).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
    const n1 = (x) => (x < 1 ? x.toFixed(1) : Math.round(x));
    const scope = `${remaining} ${path ? `lessons on the ${esc(path.name)} path` : "lessons"}${cfg.written ? " written so far" : ""}`;
    const line = {
      done: `You've finished every ${path ? "lesson on this path" : "written lesson"}. Keep it fresh with Review.`,
      "no-date": `${scope} left. At ${prof.daily_minutes} minutes a day you'd finish around ${fmt(p.finish)}.`,
      "on-track": `On track for ${fmt(examDate)}: about ${n1(p.needPerDay)} lessons a day covers the ${scope}, with the last days left for revision.`,
      tight: `Tight for ${fmt(examDate)}: you need about ${n1(p.needPerDay)} lessons a day and ${prof.daily_minutes} minutes fits about ${n1(p.lessonsPerDay)}. About ${p.minutesNeeded} minutes a day would do it.`,
      behind: `Behind for ${fmt(examDate)}: at ${prof.daily_minutes} minutes a day you'd finish around ${fmt(p.finish)}. You'd need about ${p.minutesNeeded} minutes a day${cfg.paths.length ? ", or a path that covers less" : ""}.`,
      past: `Your exam date (${fmt(examDate || "2000-01-01")}) has passed. Update it to get a new plan.`,
    }[p.status];
    return `<section class="co-card co-plan co-plan-${p.status}"><span class="co-kicker">${ic("target")} Your plan today</span>
      <h3>${parts.length ? parts.join(", ") : "Nothing due"}</h3><p>${t.minutes ? `About ${t.minutes} minutes. ` : ""}${line}</p>
      ${prior === "confident" && cfg.exams?.length && Object.keys(S.done).length < 5 ? `<p>You said you already know a lot of this. <a href="#/exams">Take an exam</a> to find where to start.</p>` : ""}
      <small><a href="${acct}">Change exam date or study time</a></small></section>`;
  }

  // ---------- Learn: the road ----------
  function pathItems(u) {
    const out = [];
    u.lessons.forEach((l, i) => { out.push({ kind: "lesson", l: byId[l.id] }); if ((i + 1) % 6 === 0 && i < u.lessons.length - 1) out.push({ kind: "chest", id: `${u.id}-c${(i + 1) / 6}`, after: u.lessons.slice(0, i + 1) }); });
    out.push({ kind: "quiz", u });
    return out;
  }
  function road(u, current) {
    const items = pathItems(u), W = 440, gap = 96;
    const ci = items.findIndex((it) => it.kind === "lesson" && it.l.id === current?.id);
    // parked before the first lesson, the car needs road above it: without this it sits on the school card
    const lead = ci === 0, top = lead ? 56 + gap : 56;
    const pts = items.map((_, i) => [W / 2 + Math.sin(i * 0.9) * 120, top + i * gap]);
    const H = top + (items.length - 1) * gap + 70;
    const curve = (p) => p.map(([x, y], i) => { if (!i) return `M${x} ${y}`; const [px, py] = p[i - 1]; return `C${px} ${py + gap / 2} ${x} ${y - gap / 2} ${x} ${y}`; }).join(" ");
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
        const modStart = it.l.module && (it.l.i === 0 || u.lessons[it.l.i - 1].module !== it.l.module);
        return `<a class="co-node ${st}" style="${style}" href="#/lesson/${it.l.id}" aria-label="Lesson ${it.l.i + 1}: ${esc(it.l.title)}${st === "done" ? " (done)" : ""}">
          ${ic(st === "done" ? "check" : it.l.i === 0 && st === "cur" ? "star" : "play")}<span class="co-label ${side}">${modStart ? `<em class="co-mod">${esc(it.l.module)}</em>` : ""}${st === "cur" ? `<b>${it.l.i === 0 ? "Start here" : "Up next"}</b>` : `<small>${it.l.i + 1}</small>`}${esc(it.l.title)}</span></a>`;
      }
      if (it.kind === "chest") {
        const ready = it.after.every((l) => S.done[l.id]), got = S.chests[it.id];
        return `<button class="co-node chest ${got ? "done" : ready ? "ready" : ""}" style="${style}" data-chest="${it.id}" ${ready && !got ? "" : "disabled"} aria-label="Reward chest${got ? " (opened)" : ready ? ": open for XP" : ": finish the lessons before it"}">${ic("chest")}<span class="co-tip">${got ? "Opened" : ready ? `Open for +${XP.chest} XP` : "Finish the lessons before it"}</span></button>`;
      }
      const qz = S.quiz[u.id];
      return `<a class="co-node quiz ${qz?.pass ? "done" : ""}" style="${style}" href="#/quiz/${u.id}" aria-label="${U} ${u.n} quiz">${ic("trophy")}<span class="co-tip">Unit quiz${qz ? ` · best ${Math.round(qz.best * 100)}%` : ` · +${XP.quiz} XP`}</span></a>`;
    }).join("");
    const doneTo = lastDone >= 0 ? pts.slice(0, lastDone + 1) : [];
    const roadPts = lead ? [[pts[0][0], top - gap], ...pts] : pts;   // the stretch the car waits on
    return `<div class="co-road" style="height:${H}px">
      <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true">
        <path d="${curve(roadPts)}" class="co-r-edge"/><path d="${curve(roadPts)}" class="co-r-top"/><path d="${curve(roadPts)}" class="co-r-dash"/>
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
        <header><span class="kicker">${esc(t.name)} · ${U} ${u.n}${l.module ? ` · ${esc(l.module)}` : ""}</span><h2>${esc(l.title)}</h2>${N?.lead ? `<p class="mv-lead">${inline(N.lead)}</p>` : ""}
          <div class="mv-chips">${S.done[id] ? `<span class="co-chip lit">${ic("check")} Completed</span>` : `<span class="co-chip">${ic("bolt")} +${XP.lesson} XP</span>`}${N?.items?.length ? `<span class="co-chip">${N.items.length} check question${N.items.length > 1 ? "s" : ""}</span>` : ""}${N?.cards.length ? `<button data-cards>${ic("cards")} Flashcards (${N.cards.length})</button>` : ""}${N?.level ? `<span class="co-chip">${esc(N.level)}</span>` : ""}</div></header>
        ${N && isDraft(u) ? `<p class="co-draft" role="note"><b>Draft.</b> This ${u1} is written but hasn't yet completed content review, source checking and expert sign-off. Use it alongside your course materials and official sources.</p>` : ""}
        ${N && cfg.reviewLine ? `<p class="co-reviewed">${reviewLine(u)}</p>` : ""}
        ${N ? lessonFrame(N).top : ""}
        ${N ? `<div class="mv-cols">${lessonHtml(N)}</div>${lessonFrame(N).end}` : `<p class="co-empty">The notes for this lesson are still being written. You can still mark it done and come back later.</p>`}
        ${N && cfg.anatomy3d?.lessons && id in cfg.anatomy3d.lessons ? anatomyPanel(cfg.anatomy3d.lessons[id]) : ""}
        ${N ? `<section class="co-ask co-tutor"></section>` : ""}
        ${N?.items?.length ? `<section class="co-check"><h3>${ic("target")} Check yourself</h3>${N.items.map((it) => qHtml(it, { confidence: true })).join("")}</section>` : ""}
        <footer>
          <button class="btn btn-light lg co-complete" ${S.done[id] ? "disabled" : ""}><span>${S.done[id] ? "Completed ✓" : `Complete lesson · +${XP.lesson} XP`}</span></button>
          ${N?.cards.length ? `<button class="btn btn-ghost lg" data-cards><span>${ic("cards")} Flashcards</span></button>` : ""}
          ${N ? `<button class="btn btn-ghost lg" data-save><span>${ic("save")} ${S.saved[id] ? "Saved to your account ✓" : "Save notes and cards"}</span></button>` : ""}
        </footer>
      </div>
      <div class="co-pn">${prev ? `<a href="#/lesson/${prev.id}">← ${esc(prev.title)}</a>` : "<span></span>"}${next ? `<a href="#/lesson/${next.id}">${esc(next.title)} →</a>` : ""}</div>
    </article>`;
    scrollTo(0, 0);
    wirePractice(main, "lesson", id);
    // every interactive that names this lesson is reachable from it: those not placed in its notes go at the end
    // (before the tutor, or the footer when the notes aren't written yet), two in full and the rest as links
    {
      const placed = new Set([...main.querySelectorAll(".co-ixslot")].map((s) => s.dataset.ix));
      const linked = ixs.filter((x) => x.lessons?.includes(id) && !placed.has(x.id)), shown = linked.slice(0, 2), more = linked.slice(2);
      const at = main.querySelector(".co-tutor") || main.querySelector(".co-notes > footer");
      if (linked.length && at) at.insertAdjacentHTML("beforebegin", `<section class="co-trylab"><h3>Try it yourself</h3>${shown.map((x) => `<div class="co-ixslot" data-ix="${esc(x.id)}"></div>`).join("")}${more.length ? `<p class="co-morelabs">More for this lesson: ${more.map((x) => `<a href="#/practice/${esc(x.id)}">${esc(x.title)}</a>`).join(" · ")}</p>` : ""}</section>`);
    }
    mountIxSlots(main);
    main.querySelectorAll("[data-cards]").forEach((b) => b.addEventListener("click", () => flashcards(N.cards, l)));
    main.querySelector("[data-save]")?.addEventListener("click", (e) => saveLesson(l, N, e.currentTarget));
    const tp = main.querySelector(".co-tutor");
    if (tp) mountTutorPanel(tp, {
      ask: askTutor, lesson: { id, title: l.title }, note: cfg.tutor || TUTOR_NOTE,
      focus: sixProfiles(evidenceFromAttempts((S.attempts || []).filter((a) => a.lesson === id), { levels: cfg.levels || null, exploration: EXPLORE })).all.weakest || "apply",
      candidates: () => connectCandidates(l), unavailable: (what) => signinLine(what, ""),
      link: (lid) => `#/lesson/${lid}`, titleOf: (lid) => byId[lid]?.title || lid, lab: () => labFor(labLast),
    });
    main.querySelector(".co-complete").addEventListener("click", async (e) => {
      if (S.done[id]) return;
      S.done[id] = Date.now(); save(); track("lesson_complete", cfg.site); e.currentTarget.disabled = true; e.currentTarget.querySelector("span").textContent = "Completed ✓";
      await award(XP.lesson, "lesson", id, `${cfg.name}: ${l.title}`);
      if (unitDone(u) === u.lessons.length) celebrate(`${U} ${u.n} complete`, `${esc(u.title)}: every lesson done. Take the unit quiz for +${XP.quiz} XP.`, `<a class="btn btn-ghost lg btn-sm" href="#/quiz/${u.id}"><span>${U} quiz</span></a>`);
      else if (next) setTimeout(() => go(`lesson/${next.id}`), 650);
    });
  }
// ---------- the AI tutor (kit/assess/tutor.js → supabase/functions/course-tutor) and written practice ----------
  // One request to the course-tutor function (kit/data/functions.js turns every failure into a clear message)
  async function askTutor(body) {
    const out = await callFunction(await store(), "course-tutor", { subject: cfg.slug, ...body }, { fallback: "The tutor isn't available right now. You can still self-assess with the rubric." });
    // the tutor answered about a lab: challenges met in it from now on count as assisted
    if (body.lab && labLast) labHelped.add(labLast);
    track("tutor", cfg.site);
    return out;
  }
  // until Gradify accounts are switched on (gradify.config.js), say so rather than offering a sign-in that can't work
  const signinLine = (what, or = "self-assess with the rubric") => SUPABASE_URL
    ? `<p class="co-empty">${esc(what)} uses Gradify AI, which needs a free account. <a href="${cfg.app || "app.html"}#/account">Sign in</a>${or ? `, or ${esc(or)}` : ""}.</p>`
    : `<p class="co-empty">${esc(what)} uses Gradify AI, which isn't switched on yet: it arrives with Gradify accounts.${or ? ` For now, ${esc(or)}.` : ""}</p>`;
  const TUTOR_NOTE = "Answers come from Gradify AI, using this lesson's notes. It's study help and it can be wrong: check anything important against the notes and your course materials.";
  // lessons the tutor may link to: this school first, then nearby schools, then the rest (titles only)
  function connectCandidates(l) {
    const near = (u) => Math.abs(u.n - l.unit.n);
    return [...units].sort((a, b) => near(a) - near(b)).flatMap((u) => u.lessons).filter((x) => x.id !== l.id).slice(0, 400).map((x) => ({ id: x.id, title: `${x.title} (${U} ${x.unit.n})` }));
  }
  // a finished written task is recorded like any other answer (provisional), and earns XP the first time
  function recordTask(t, score, method, response) {
    const u = units.find((x) => x.id === t.unit);
    record({ Q: { type: "short", d: 3, objectives: [] }, key: t.id, v: null, l: u ? { id: null, module: null, unit: u } : null }, "practice", `write:${t.id}`,
      { score, correct: score >= 0.7, method, status: "provisional" }, { response });
    if (!S.solved[t.id]) { S.solved[t.id] = Date.now(); save(); award(XP.problem * 4, "write", t.id); }
  }
  const modelBlock = (t) => `<details class="co-model"><summary>Model answer</summary>${paras(t.model)}<p class="aq-note">A guide to what a strong answer covers, not the only acceptable wording.</p></details>`;
  async function viewWrite(arg) {
    const tasks = cfg.writing || [];
    if (!arg) {
      main.innerHTML = `<div class="co-intro"><span class="co-kicker">Written practice</span><h2>${esc(cfg.writingTitle || "Write it, then get feedback")}</h2><p>${esc(cfg.writingNote || "")} Check your answer against a rubric and a model answer, or sign in for provisional feedback from the Gradify AI tutor.</p></div>
        <div class="co-wlist">${tasks.map((t) => { const u = units.find((x) => x.id === t.unit); return `<a class="co-wtask${S.solved[t.id] ? " is-solved" : ""}" href="#/write/${t.id}"><span class="co-kicker">${esc(t.kind)}${u ? ` · ${U} ${u.n}` : ""} · ${t.minutes} min</span><h3>${esc(t.title)}</h3><p>${esc(t.brief)}</p>${S.solved[t.id] ? `<small>${ic("check")} Done</small>` : ""}</a>`; }).join("")}</div>`;
      return;
    }
    const t = tasks.find((x) => x.id === arg); if (!t) { location.hash = "#/write"; return; }
    const head = `<div class="co-crumbs"><a href="#/write">← Written practice</a></div>
      <div class="co-intro"><span class="co-kicker">${esc(t.kind)} · about ${t.minutes} minutes</span><h2>${esc(t.title)}</h2><p>${esc(t.brief)}</p></div>`;
    const rubric = `<section class="co-panel co-rubric"><h3>What a good answer covers</h3><ol>${t.rubric.map((r) => `<li>${esc(r)}</li>`).join("")}</ol></section>`;
    if (t.interview) return viewInterview(t, head, rubric);
    S.drafts ||= {};
    main.innerHTML = `${head}<section class="co-panel co-wprompt"><h3>The task</h3><p>${inline(t.prompt)}</p></section>
      <label class="sr-only" for="co-wtext">Your answer</label><textarea id="co-wtext" class="aq-text co-wtext" rows="14" placeholder="Write your answer here. It's saved as you type.">${esc(S.drafts[t.id] || "")}</textarea>
      <p class="co-wcount"></p>
      <div class="co-wactions"><button type="button" class="btn btn-light lg btn-sm" data-ai><span>Get AI feedback</span></button><button type="button" class="btn btn-ghost lg btn-sm" data-self><span>Self-assess with the rubric</span></button></div>
      <div class="co-wout" aria-live="polite"></div>${rubric}`;
    const ta = main.querySelector(".co-wtext"), out = main.querySelector(".co-wout"), count = () => { main.querySelector(".co-wcount").textContent = `${(ta.value.match(/\S+/g) || []).length} words`; };
    let dt = null; count();
    ta.addEventListener("input", () => { count(); clearTimeout(dt); dt = setTimeout(() => { S.drafts[t.id] = ta.value; save(); }, 800); });
    main.querySelector("[data-self]").addEventListener("click", () => {
      out.innerHTML = `<section class="co-panel"><h3>Self-assessment</h3><p>Tick each point your answer covers well, then record it.</p>${t.rubric.map((r, i) => `<label class="co-tick"><input type="checkbox" data-r="${i}"><span>${esc(r)}</span></label>`).join("")}
        <button type="button" class="btn btn-light lg btn-sm" data-rec><span>Record my self-assessment</span></button></section>${modelBlock(t)}`;
      out.querySelector("[data-rec]").addEventListener("click", (e) => {
        const n = out.querySelectorAll("[data-r]:checked").length, score = Math.round((n / t.rubric.length) * 1000) / 1000;
        recordTask(t, score, "self", { text: ta.value, ticked: [...out.querySelectorAll("[data-r]:checked")].map((x) => Number(x.dataset.r)) });
        e.currentTarget.outerHTML = `<p class="co-empty">${ic("check")} Recorded: ${n} of ${t.rubric.length} points (self-assessed, provisional).</p>`;
      });
    });
    main.querySelector("[data-ai]").addEventListener("click", async (e) => {
      const btn = e.currentTarget; S.drafts[t.id] = ta.value; save();
      btn.disabled = true; out.innerHTML = `<p class="co-empty">The tutor is reading your answer…</p>`;
      try {
        const { feedback } = await askTutor({ mode: "mark", task: { title: t.title, brief: t.brief, prompt: t.prompt, rubric: t.rubric, model: t.model }, answer: ta.value });
        out.innerHTML = feedbackHtml(feedback) + modelBlock(t);
        recordTask(t, scoreFeedback(feedback), "ai-assisted", { text: ta.value, ratings: feedback.criteria.map((c) => c.rating) });
      } catch (err) { out.innerHTML = err.signin ? signinLine("AI feedback") : `<p class="co-empty">${esc(err.message)}</p>`; }
      btn.disabled = false;
    });
  }
  // a practice interview: the tutor plays the client or patient (t.who), then gives feedback on the whole interview
  function viewInterview(t, head, rubric) {
    const turns = [], kase = { client: t.client, persona: t.persona, facts: t.facts }, who = t.who || "client", Who = who[0].toUpperCase() + who.slice(1);
    main.innerHTML = `${head}<section class="co-panel co-client"><h3>Your ${who}</h3><p>${esc(t.client)}</p></section>
      <div class="co-chat" aria-live="polite"><p class="co-empty">The ${who} is waiting. Introduce yourself to begin.</p></div>
      <form class="co-chatform"><label class="sr-only" for="co-say">What you say to the ${who}</label><textarea id="co-say" rows="2" maxlength="1500" placeholder="What do you say?"></textarea><button type="submit" class="btn btn-light lg btn-sm"><span>Say</span></button></form>
      <div class="co-wactions"><button type="button" class="btn btn-ghost lg btn-sm" data-end><span>End the interview and get feedback</span></button></div>
      <div class="co-wout" aria-live="polite"></div>${rubric}
      <details class="co-casefile"><summary>No account? Practise with a friend playing the ${who} (spoiler: the case file)</summary><p>Give your friend this case file. They answer only what you ask.</p><p><b>${Who}:</b> ${esc(t.client)}</p><p><b>How they come across:</b> ${esc(t.persona)}</p><p><b>What they know:</b> ${esc(t.facts)}</p>${modelBlock(t)}</details>`;
    const chat = main.querySelector(".co-chat"), form = main.querySelector(".co-chatform"), say = form.querySelector("textarea"), out = main.querySelector(".co-wout");
    const paint = (busy) => { chat.innerHTML = turns.map((m) => `<p class="co-say ${m.role}"><b>${m.role === "learner" ? "You" : Who}</b>${esc(m.text)}</p>`).join("") + (busy ? `<p class="co-say client co-typing"><b>${Who}</b>…</p>` : ""); chat.scrollTop = chat.scrollHeight; };
    form.addEventListener("submit", async (e) => {
      e.preventDefault(); const text = say.value.trim(); if (!text) return;
      turns.push({ role: "learner", text }); say.value = ""; paint(true); form.querySelector("button").disabled = true;
      try { const { reply } = await askTutor({ mode: "roleplay", case: kase, turns }); turns.push({ role: "client", text: reply }); paint(); }
      catch (err) { paint(); out.innerHTML = err.signin ? signinLine(`The practice ${who}`, "practise with a friend using the case file below") : `<p class="co-empty">${esc(err.message)}</p>`; }
      form.querySelector("button").disabled = false; say.focus();
    });
    say.addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); form.requestSubmit(); } });
    main.querySelector("[data-end]").addEventListener("click", async (e) => {
      const btn = e.currentTarget; btn.disabled = true; out.innerHTML = `<p class="co-empty">The tutor is reviewing your interview…</p>`;
      try {
        const { feedback } = await askTutor({ mode: "debrief", case: kase, rubric: t.rubric, turns });
        out.innerHTML = feedbackHtml(feedback) + modelBlock(t);
        recordTask(t, scoreFeedback(feedback), "ai-assisted", { turns: turns.length });
      } catch (err) { out.innerHTML = err.signin ? signinLine("Interview feedback") : `<p class="co-empty">${esc(err.message)}</p>`; }
      btn.disabled = false;
    });
  }

  // a link from an anatomy lesson to the 3D model, opened on one system with a quiz (cfg.anatomy3d)
  function anatomyPanel(system) {
    const href = (mode) => `${cfg.anatomy3d.href}?${system ? `system=${encodeURIComponent(system)}&` : ""}quiz=${mode}`;
    const A = cfg.anatomy3d, name = system ? (A.names?.[system] || `the ${system} system`) : (A.all || "every body system");
    return `<section class="co-3d"><h3>${ic("cube")} Practise in 3D</h3><p>Open ${esc(A.model || "the 3D body")} showing ${esc(name)} and ${esc(A.test || "test yourself on the real anatomy")}.</p>
      <div class="co-3d-actions"><a class="btn btn-light lg btn-sm" href="${href("find")}"><span>Find the structure</span></a><a class="btn btn-ghost lg btn-sm" href="${href("name")}"><span>Name the structure</span></a></div></section>`;
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
    const pool = u.lessons.flatMap((l) => (N[l.id]?.items || []).filter((it) => QTYPES[it.Q.type]?.auto));
    const qs = shuffle(pool).slice(0, Math.min(10, pool.length));
    if (!qs.length) { main.innerHTML = `<div class="co-panel"><h2>${U} ${u.n} quiz</h2><p>This quiz opens when the ${u1}'s notes are in.</p><a class="co-link" href="#/learn/${u.id}">← Back to the unit</a></div>`; return; }
    let k = 0, score = 0;
    const step = () => {
      if (k >= qs.length) return finish();
      const it = qs[k];
      main.innerHTML = `<div class="co-quiz" style="--a:${t.from};--b:${t.to}"><div class="co-crumbs"><a href="#/learn/${u.id}">← ${U} ${u.n}: ${esc(u.title)}</a><span>Question ${k + 1} of ${qs.length} · ${score} right</span></div>
        <div class="co-qbar"><i style="width:${(k / qs.length) * 100}%"></i></div>
        <div class="co-panel">${qHtml(it)}<p class="co-from">From: <a href="#/lesson/${it.l.id}">${esc(it.l.title)}</a></p><button class="btn btn-light lg btn-sm co-nextq" hidden><span>${k < qs.length - 1 ? "Next question →" : "See your score"}</span></button></div></div>`;
      // one try per quiz question: the first answer counts, then the explanation and the next button show
      wireQuestions(main, (key) => pageQs.get(key)?.Q, (Q, res, first, box, meta) => {
        if (box.classList.contains("done")) return;
        box.classList.add("done");
        score += res.score; record(it, "quiz", u.id, res, meta);
        box.querySelectorAll("button:not(.co-nextq), input, select, textarea").forEach((x) => { x.disabled = true; });
        main.querySelector(".co-nextq").hidden = false; main.querySelector(".co-nextq").focus();
      });
      main.querySelector(".co-nextq").addEventListener("click", () => { k++; step(); });
    };
    const finish = async () => {
      const p = score / qs.length, pass = p >= 0.75, prev = S.quiz[u.id];
      S.quiz[u.id] = { best: Math.max(p, prev?.best || 0), pass: pass || prev?.pass || false, t: Date.now() }; save();
      main.innerHTML = `<div class="co-panel co-result"><div class="co-burst">${ic(pass ? "trophy" : "target")}</div><h2>${Math.round(score * 10) / 10} / ${qs.length}</h2><p>${pass ? `Passed ${U} ${u.n}: ${esc(u.title)}.` : `You need 75% to pass. Look back over the lessons you missed, then try again.`}</p>
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
  // spaced retrieval of course questions (kit/learning/mastery.js revisionQueue): wrong answers come
  // back soon, right ones at growing gaps. Answers here are recorded in the "review" context.
  async function viewRetrieval() {
    const due = revisionQueue(S.attempts || [], { limit: 10 });
    if (!due.length) { main.innerHTML = `<div class="co-panel"><span class="co-kicker">Revisit</span><h2>No questions due</h2><p>Questions you got wrong come back after a few hours, and ones you got right return after 1, 3, 7, 21 and 60 days, so that what you know lasts.</p><a class="btn btn-light lg btn-sm" href="#/review"><span>Flashcard review</span></a></div>`; return; }
    main.innerHTML = `<div class="co-panel"><p>Loading your questions…</p></div>`;
    const need = new Set(due.map((q) => q.unit));
    const notes = Object.assign({}, ...(await Promise.all(units.filter((u) => need.has(u.id)).map(unitNotes))));
    const items = due.map((q) => ({ q, it: notes[q.lesson]?.items?.find((i) => i.key === q.id) })).filter((x) => x.it);
    main.innerHTML = `<div class="co-intro"><span class="co-kicker">Revisit</span><h2>${items.length} ${items.length === 1 ? "question" : "questions"} to bring back</h2><p>Answer without looking at the notes first. Recalling something just as it starts to fade is what makes it last. These answers count as retention evidence in My progress.</p></div>
      <div class="co-plist">${items.map(({ q, it }) => `<div class="co-prob"><div class="co-pmeta"><a href="#/lesson/${it.l.id}">${U} ${it.l.unit.n} · ${esc(it.l.title)}</a><span>${q.reason === "wrong" ? "Wrong last time" : `Last right ${Math.round((Date.now() - q.lastAt) / DAY)}d ago`}</span></div>${qHtml(it)}</div>`).join("")}</div>`;
    wirePractice(main.querySelector(".co-plist"), "review", "retrieval");
  }
  const revisitLink = () => { const n = revisionQueue(S.attempts || [], { limit: 200 }).length; return n ? `<a class="btn btn-ghost btn-sm" href="#/review/questions"><span>Revisit ${n} ${n === 1 ? "question" : "questions"}</span></a>` : ""; };

  async function viewReview() {
    await reviewPool(); paintHud();
    const due = shuffle(dueCards()).slice(0, 30);
    const learned = Object.keys(S.cards).length, total = cardPool.length;
    if (!due.length) {
      main.innerHTML = `<div class="co-panel"><span class="co-kicker">Review</span><h2>${total ? "All caught up" : "Nothing to review yet"}</h2><p>${total ? `You've seen ${learned} of ${total} cards. The next ones come due as their intervals pass, so come back tomorrow.` : "Complete lessons and their flashcards join your review queue. Spaced repetition brings each card back just before you'd forget it."}</p><a class="btn btn-light lg btn-sm" href="#/learn"><span>Go to the path</span></a> ${revisitLink()}</div>`;
      return;
    }
    let k = 0, done = 0;
    const step = () => {
      if (k >= due.length) { main.innerHTML = `<div class="co-panel co-result"><div class="co-burst">${ic("cards")}</div><h2>${done} cards reviewed</h2><p>+${done * XP.review} XP. Come back tomorrow for the next batch.</p><a class="btn btn-light lg btn-sm" href="#/learn"><span>Back to the path</span></a> ${revisitLink()}</div>`; save(); return; }
      const c = due[k], st = S.cards[c.id] || {}, pv = preview(st);
      main.innerHTML = `<div class="co-review"><div class="co-crumbs"><span>Review · ${k + 1} of ${due.length}</span><a href="#/lesson/${c.lesson}">${esc(byId[c.lesson].title)}</a></div><div class="co-qbar"><i style="width:${(k / due.length) * 100}%"></i></div>
        <button class="co-card3d big"><span class="f"><div>${inline(c.front)}</div><small>Tap or press space to reveal</small></span><span class="b"><div>${inline(c.back)}</div></span></button>
        <div class="co-rate" hidden>${["again", "hard", "good", "easy"].map((r) => `<button data-r="${r}" class="${r}"><b>${r[0].toUpperCase() + r.slice(1)}</b><small>${fmtInterval(pv[r])}</small></button>`).join("")}</div></div>`;
      const card = main.querySelector(".co-card3d"), rate = main.querySelector(".co-rate");
      card.onclick = () => { card.classList.add("flip"); rate.hidden = false; };
      rate.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => {
        S.cards[c.id] = { ...st, ...schedule(st, b.dataset.r) }; done++; k++;
        // the rating is evidence too: recall, and retention once the card comes back after a gap
        const score = { again: 0, hard: 0.6, good: 1, easy: 1 }[b.dataset.r];
        record({ Q: { type: "card" }, key: `card:${c.id}`, l: byId[c.lesson] }, "review", "cards", { score, correct: score >= 0.6, method: "self" }, { response: b.dataset.r });
        award(XP.review, "review", c.id); step();
      }));
    };
    step();
  }

  // ---------- paths and tracks ----------
  // the lessons a path covers in a school: the modules it selects, or the whole school
  const pathLessons = (p, u) => { const pick = p?.select?.[u.n]; return pick ? u.lessons.filter((l) => pick.includes(l.module)) : u.lessons; };
  const unitPct = (n, p) => { const u = units.find((x) => x.n === n); const ls = u ? pathLessons(p, u) : []; return ls.length ? ls.filter((l) => S.done[l.id]).length / ls.length : 0; };
  function viewPaths() {
    main.innerHTML = `<div class="co-intro"><span class="co-kicker">Paths</span><h2>Choose a route through ${esc(cfg.name)}</h2><p>Each path picks the ${u1}s for one goal, in the order to learn them. Follow one and the Learn page and your next milestone follow it too.</p></div>
      <div class="co-grid">${cfg.paths.map((p) => { const pct = p.units.reduce((a, n) => a + unitPct(n, p), 0) / p.units.length, ls = p.units.reduce((a, n) => { const u = units.find((x) => x.n === n); return a + (u ? pathLessons(p, u).length : 0); }, 0);
        const t = trackOf(units.find((u) => u.n === p.units[0]));
        return `<div class="co-pcard ${S.path === p.id ? "on" : ""}" style="--a:${t.from};--b:${t.to}"><h3>${esc(p.name)}</h3><p>${esc(p.sub)}</p><small>${p.units.length} ${u1}s · ${ls} lessons · ${Math.round(pct * 100)}% done</small><div class="co-bar"><i style="width:${pct * 100}%"></i></div>
          ${p.field ? `<span class="co-chip lit">${esc(p.field)} field</span>` : ""}
          <ol>${p.units.map((n) => { const u = units.find((x) => x.n === n), pick = p.select?.[n]; return `<li class="${unitPct(n, p) === 1 ? "done" : ""}"><a href="#/learn/${u.id}">${esc(u.title)}</a>${pick ? `<small class="co-pick"> · ${pick.map(esc).join(", ")}</small>` : ""}</li>`; }).join("")}</ol>
          <button class="btn ${S.path === p.id ? "btn-ghost" : "btn-light"} lg btn-sm" data-path="${p.id}"><span>${S.path === p.id ? "Following ✓ (stop)" : "Follow this path"}</span></button></div>`; }).join("")}</div>`;
    main.querySelectorAll("[data-path]").forEach((b) => b.addEventListener("click", () => { S.path = S.path === b.dataset.path ? null : b.dataset.path; save(); if (S.path) { toast(`Following <b>${esc(cfg.paths.find((p) => p.id === S.path).name)}</b>`); go("learn"); } else viewPaths(); paintSide(); }));
  }
  function viewTracks() {
    main.innerHTML = `<div class="co-intro"><span class="co-kicker">${TW}s</span><h2>${cfg.tracks.length} ${tw1}s, ${units.length} ${u1}s, ${lessons.length.toLocaleString()} lessons</h2><p>The whole of ${esc(cfg.name)}, grouped by theme. Jump into any unit.</p></div>
      <div class="co-grid">${cfg.tracks.map((t) => { const us = t.units.map((n) => units.find((u) => u.n === n)).filter(Boolean), tot = us.reduce((a, u) => a + u.lessons.length, 0), dn = us.reduce((a, u) => a + unitDone(u), 0);
        return `<div class="co-tcard" style="--a:${t.from};--b:${t.to}"><div class="co-tban"><h3>${esc(t.name)}</h3><small>${dn} / ${tot} lessons</small></div><ul>${us.map((u) => `<li><a href="#/learn/${u.id}"><span>${U} ${u.n}</span>${esc(u.title)}</a><i style="--p:${unitDone(u) / u.lessons.length}"></i></li>`).join("")}</ul></div>`; }).join("")}</div>`;
  }

  // ---------- problems: every check question in the course, filterable ----------
  // case and statute cards from every lesson (CASE: and LAW: lines), searchable (cfg.authorities names the tab)
  async function viewAuthorities() {
    main.innerHTML = `<div class="co-panel"><p>Loading the cards…</p></div>`;
    const all = await allNotes();
    const items = lessons.flatMap((l) => (all[l.id]?.authorities || []).map((a) => ({ a, l })));
    const sortKey = (x) => x.a.name.replace(/^(R|Re|In re)\s+(\(|v\s)?/i, "").toLowerCase();
    items.sort((x, y) => sortKey(x).localeCompare(sortKey(y)));
    const f = { unit: "", kind: "", q: "" };
    const nK = (k) => items.filter((x) => x.a.kind === k).length, drugs = nK("drug");
    const kinds = [["case", "Cases"], ["law", "Statutes"], ["drug", "Drugs"]].filter(([k]) => nK(k));
    main.innerHTML = `<div class="co-intro"><span class="co-kicker">${esc(cfg.authorities)}</span><h2>${drugs && kinds.length === 1 ? "Drug cards" : "Case and statute cards"}</h2><p>${drugs && kinds.length === 1 ? `${drugs} drug cards from the lessons: class and mechanism, uses, key adverse effects and cautions, and monitoring and counselling. They're study summaries, not prescribing information: check the current BNF and SPC.` : `${nK("case")} cases and ${nK("law")} statutory provisions from the lessons: facts, decision and principle for each case; what each provision does.`} Each card is also a flashcard in its lesson.</p></div>
      <div class="co-filters co-auths-tools"><input type="search" class="co-auth-q" placeholder="Search the cards" aria-label="Search the cards">
        <select class="co-auth-u" aria-label="${U}"><option value="">Every ${u1}</option>${units.filter((u) => items.some((x) => x.l.unit === u)).map((u) => `<option value="${u.id}">${U} ${u.n}: ${esc(u.title)}</option>`).join("")}</select>
        ${kinds.length > 1 ? `<select class="co-auth-kind" aria-label="Kind"><option value="">All cards</option>${kinds.map(([k, l]) => `<option value="${k}">${l}</option>`).join("")}</select>` : ""}</div>
      <p class="co-pcount co-auth-n"></p><div class="co-auth-list"></div>`;
    const paint = () => {
      const q = norm(f.q), list = items.filter((x) => (!f.unit || x.l.unit.id === f.unit) && (!f.kind || x.a.kind === f.kind) && (!q || norm(Object.values(x.a).join(" ")).includes(q)));
      main.querySelector(".co-auth-n").textContent = `${list.length} card${list.length === 1 ? "" : "s"}${list.length > 60 ? " · showing the first 60" : ""}`;
      main.querySelector(".co-auth-list").innerHTML = list.length ? `<div class="co-auths">${list.slice(0, 60).map((x) => authorityCards([x.a]).replace(/^<div class="co-auths">|<\/div>$/g, "").replace(/<\/article>$/, `<a class="co-auth-from" href="#/lesson/${x.l.id}">${U} ${x.l.unit.n} · ${esc(x.l.title)}</a></article>`)).join("")}</div>` : `<p class="co-empty">No cards match.</p>`;
    };
    main.querySelector(".co-auth-q").addEventListener("input", (e) => { f.q = e.target.value; paint(); });
    main.querySelector(".co-auth-u").addEventListener("change", (e) => { f.unit = e.target.value; paint(); });
    main.querySelector(".co-auth-kind")?.addEventListener("change", (e) => { f.kind = e.target.value; paint(); });
    paint();
  }

  async function viewProblems() {
    main.innerHTML = `<div class="co-panel"><p>Loading the problem bank…</p></div>`;
    const all = await allNotes();
    const probs = lessons.flatMap((l) => (all[l.id]?.items || []).filter((it) => QTYPES[it.Q.type]?.auto).map((it) => ({ ...it, d: it.Q.d, pid: it.key })));
    const f = { unit: "", d: "", s: "" };
    const paint = () => {
      const list = probs.filter((p) => (!f.unit || p.l.unit.id === f.unit) && (!f.d || p.d === Number(f.d)) && (!f.s || (f.s === "solved") === Boolean(S.solved[p.pid])));
      const shown = list.slice(0, 40);
      main.querySelector(".co-plist").innerHTML = shown.length ? shown.map((p) => `<div class="co-prob ${S.solved[p.pid] ? "is-solved" : ""}"><div class="co-pmeta"><a href="#/lesson/${p.l.id}">${U} ${p.l.unit.n} · ${esc(p.l.title)}</a><span class="d${p.d}">${esc(LEVELS[p.d - 1] || "")}</span>${S.solved[p.pid] ? `<span class="ok">${ic("check")} Solved</span>` : ""}</div>${qHtml(p)}</div>`).join("") + (list.length > 40 ? `<p class="co-empty">Showing 40 of ${list.length}. Narrow it down with the filters.</p>` : "") : `<p class="co-empty">No problems match these filters.</p>`;
      main.querySelector(".co-pcount").textContent = `${list.length} problems · ${probs.filter((p) => S.solved[p.pid]).length} solved`;
      wirePractice(main.querySelector(".co-plist"), "problems", null);
    };
    const withNotes = units.filter((u) => u.lessons.some((l) => all[l.id]?.items?.length));
    main.innerHTML = `<div class="co-intro"><span class="co-kicker">Problems</span><h2>Problem bank</h2><p>Every check question in the course in one place. Solve one first time for +${XP.problem} XP.</p></div>
      <div class="co-filters"><select data-f="unit"><option value="">All ${u1}s</option>${withNotes.map((u) => `<option value="${u.id}">${U} ${u.n}: ${esc(u.title)}</option>`).join("")}</select>
      <select data-f="d"><option value="">Any difficulty</option>${LEVELS.map((x, i) => `<option value="${i + 1}">${esc(x)}</option>`).join("")}</select>
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
  // assessment insight from attempt records (kit/assess/attempts.js): final marks only
  function insightHtml() {
    // answers to questions only: lab challenges show in Mastery and "Lab challenges to practise"
    const r = analyse((S.attempts || []).filter((a) => a.question?.type !== "lab"));
    if (r.total < 5) return `<section class="co-panel co-insight"><h3>How you're answering</h3><p class="co-empty">Answer a few more questions (${r.total} so far) to see your weak areas, common mistakes and how well your confidence matches your answers.</p></section>`;
    const pct = (x) => `${Math.round(x * 100)}%`;
    const weak = r.byLesson.filter((g) => g.n >= 2 && g.latest < 0.7).slice(0, 5);
    const lt = (id) => (byId[id] ? `<a href="#/lesson/${id}">${esc(byId[id].title)}</a>` : esc(id || ""));
    const c = r.calibration;
    return `<section class="co-panel co-insight"><h3>How you're answering</h3>
      <div class="co-tiles">${[["Answers", r.total], ["Questions", r.questions], ["First-try score", pct(r.byUnit.reduce((s, g) => s + (g.firstTry ?? 0) * g.n, 0) / Math.max(1, r.byUnit.reduce((s, g) => s + (g.firstTry == null ? 0 : g.n), 0)))], ["Improvement on retries", r.improvement ? `${r.improvement.mean >= 0 ? "+" : ""}${pct(r.improvement.mean)}` : "–"]].map(([k, v]) => `<div><small>${k}</small><b>${v}</b></div>`).join("")}</div>
      <h4>Lessons to revisit</h4>${weak.length ? `<ul class="co-weak">${weak.map((g) => `<li>${lt(g.key)} <small>latest ${pct(g.latest)} over ${g.n} answers</small></li>`).join("")}</ul>` : `<p class="co-empty">Nothing below 70% on your latest answers.</p>`}
      ${r.misconceptions.length ? `<h4>Answers you've chosen that were wrong</h4><ul class="co-weak">${r.misconceptions.slice(0, 4).map((m) => `<li>“${inline(m.option)}” <small>${m.n}× · ${lt(m.lesson)}</small></li>`).join("")}</ul>` : ""}
      ${c ? `<p class="co-empty">Confidence: of ${c.rated} rated answers, ${c.sureButWrong} were marked “Sure” but wrong, and ${c.unsureButRight} marked “Guessing” were right.${c.sureButWrong ? " Check those topics: confident mistakes are the ones most worth correcting." : ""}</p>` : ""}
      <p class="co-acct">Self-assessed short answers are provisional and aren't counted here.</p></section>`;
  }

  // six-dimension mastery from every answer in this course (kit/learning/mastery.js)
  function masteryHtml() {
    const ev = evidenceFromAttempts(S.attempts || [], { levels: cfg.levels || null, exploration: EXPLORE }), { all, groups } = sixProfiles(ev, { by: (e) => e.unit });
    const pc = (x) => `${Math.round(x * 100)}%`, label = (k) => SIX.find((d) => d.key === k)?.label.toLowerCase();
    const schools = groups.map((g) => ({ g, u: units.find((x) => x.id === g.key) })).filter((x) => x.u).sort((a, b) => a.u.n - b.u.n);
    return `<section class="co-panel co-mx"><h3>Mastery</h3>
      <p class="co-empty">${all.mastery == null ? `Gradify gives an overall mastery figure once at least two kinds of evidence have ${3}+ answers each. It won't guess from less.` : `<b>${pc(all.mastery)}</b> overall, measured from ${all.measured.length} of the 6 kinds of evidence.${all.missing.length ? ` Not yet measured: ${all.missing.map(label).join(", ")}.` : ""}`}</p>
      ${evidenceLine(ev)}${sixHtml(all)}${calibrationHtml(all)}
      ${schools.length ? `<h4>By ${u1}</h4><ul class="co-weak">${schools.map(({ g, u }) => `<li><a href="#/learn/${u.id}">${U} ${u.n}: ${esc(u.title)}</a> <small>${g.mastery == null ? `${g.answers} answers: not enough evidence yet` : `${pc(g.mastery)}${g.weakest ? ` · weakest: ${label(g.weakest)}` : ""}`}</small></li>`).join("")}</ul>` : ""}
      ${labPracticeHtml()}
      <p>${revisitLink()}</p>
      <div class="co-dirbox"><h4>Your next session</h4><p class="co-empty">The Gradify AI study director turns this evidence into a plan for your next session.</p><button type="button" class="btn btn-ghost btn-sm" data-director><span>Plan my next session</span></button><div class="co-dirout" aria-live="polite"></div></div></section>`;
  }
  // what the mastery figures are built from, and the exploration that isn't counted (kit/learning/evidence-class.js)
  function evidenceLine(ev) {
    // one entry per answer that counted (retention and transfer entries are extra readings of the same answer)
    const n = { practice: 0, assessment: 0 }; for (const e of ev) if (!e.delayed && e.dim !== "transfer") n[e.evidence]++;
    const ex = (S.attempts || []).filter((a) => a.question?.type === "lab" && a.score >= 1 && evidenceClass(a, { exploration: EXPLORE }) === "exploration").length;
    if (!n.practice && !n.assessment && !ex) return "";
    return `<p class="co-acct">Built from ${n.practice} practice ${n.practice === 1 ? "answer" : "answers"} and ${n.assessment} from quizzes, exams and checked working, which count more.${ex ? ` ${ex} exploration ${ex === 1 ? "challenge" : "challenges"} met in the labs earned XP but ${ex === 1 ? "isn't" : "aren't"} counted: trying something out isn't the same as showing you understand it.` : ""}</p>`;
  }
  // lab challenges tried and not yet met (kit/learning/mastery.js labPractice): a pointer to practise, not a mark
  function labPracticeHtml() {
    const list = labPractice(S.attempts || [], { exploration: EXPLORE }).filter((g) => byId[g.lesson]).slice(0, 6); if (!list.length) return "";
    return `<h4>Lab challenges to practise</h4><ul class="co-weak">${list.map((g) => { const lab = ixById[g.labs[0]]; return `<li><a href="${lab ? `#/practice/${lab.id}` : `#/lesson/${g.lesson}`}">${esc(byId[g.lesson].title)}</a> <small>${g.tries} tries without meeting ${g.challenges.length === 1 ? `"${esc(g.challenges[0])}"` : "the challenge"} yet${lab ? ` · ${esc(lab.title)}` : ""}</small></li>`; }).join("")}</ul>
      <p class="co-acct">Unmet tries don't lower your mastery. They show where a little more practice would help.</p>`;
  }
  // what the study director sees: this summary and the lessons it may name, nothing else
  function directorRequest() {
    const ev = evidenceFromAttempts(S.attempts || [], { levels: cfg.levels || null, exploration: EXPLORE });
    const all = sixProfiles(ev).all, byLesson = sixProfiles(ev).groups.filter((g) => byId[g.key]);
    const weak = byLesson.filter((g) => g.answers >= 2).sort((a, b) => (a.mastery ?? a.dims.recognition.value ?? 1) - (b.mastery ?? b.dims.recognition.value ?? 1)).slice(0, 6)
      .map((g) => ({ id: g.key, title: byId[g.key].title, note: `${g.mastery == null ? "not enough evidence" : `${Math.round(g.mastery * 100)}% mastery`}${g.weakest ? `, weakest ${g.weakest}` : ""}${g.calibration?.sureWrong ? `, ${g.calibration.sureWrong} confident mistakes` : ""}` }));
    for (const g of labPractice(S.attempts || [], { exploration: EXPLORE }).filter((p) => byId[p.lesson]).slice(0, 4)) {
      const note = `${g.tries} unsuccessful lab tries since the last success`, w = weak.find((x) => x.id === g.lesson);
      if (w) w.note += `, ${note}`; else weak.push({ id: g.lesson, title: byId[g.lesson].title, note });
    }
    const due = revisionQueue(S.attempts || [], { limit: 500 });
    const upcoming = []; for (const x of lessons) { if (upcoming.length >= 6) break; if (!S.done[x.id] && (!cfg.written || cfg.written.includes(x.unit.id))) upcoming.push(x); }
    const ids = [...new Set([...weak.map((w) => w.id), ...due.map((q) => q.lesson).filter(Boolean), ...upcoming.map((x) => x.id)])].slice(0, 40);
    const c = all.calibration, examDate = prof?.site === cfg.site ? prof?.exam_date : null;
    return { mode: "director", course: cfg.name, candidates: ids.map((i) => ({ id: i, title: byId[i]?.title || i })),
      summary: { dailyMinutes: prof?.daily_minutes || 20, examDate, done: Object.keys(S.done).length, total: lessons.length, dueCards: dueCards().length, dueQuestions: due.length,
        mastery: all.mastery, dims: Object.fromEntries(SIX.map((d) => [d.key, { value: all.dims[d.key].value, certainty: all.dims[d.key].certainty }])),
        calibration: c ? `${c.sure} answers marked sure, ${c.sureWrong} of them wrong; ${c.guessRight} guesses right` : "", weak, pace: "" } };
  }

  async function viewMe() {
    const st = stats(), xp = st.xp, L = levelOf(xp), sk = streak();
    const byDay = {}; for (const r of S.log) byDay[day(r.t)] = (byDay[day(r.t)] || 0) + r.xp;
    const weeks = 18, start = weekStart() - (weeks - 1) * 7 * DAY;
    const cells = Array.from({ length: weeks * 7 }, (_, i) => { const t = start + i * DAY, d = day(t), v = byDay[d] || 0; return t > Date.now() ? "<i class=future></i>" : `<button style="--v:${Math.min(1, v / Math.max(S.goal, 1))}" data-day="${d}" title="${d}: ${v} XP"></button>`; }).join("");
    const last14 = Array.from({ length: 14 }, (_, i) => { const d = day(Date.now() - (13 - i) * DAY); return [d, byDay[d] || 0]; }), mx = Math.max(S.goal, ...last14.map((x) => x[1]));
    main.innerHTML = `<div class="co-intro"><span class="co-kicker">My progress</span><h2>Your ${esc(cfg.name)}</h2><p>Everything you've done here, and what's saved to your Gradify account.</p></div>
      <div class="co-tiles">${[["Level", L.n], ["Total XP", xp.toLocaleString()], ["Day streak", sk.n], ["Best streak", sk.best], ["Lessons", `${st.lessons} / ${lessons.length}`], ["Units cleared", st.units], ["Quizzes passed", st.quizzes], ["Problems solved", st.solved]].map(([k, v]) => `<div><small>${k}</small><b>${v}</b></div>`).join("")}</div>
      ${masteryHtml()}
      ${insightHtml()}
      <section class="co-panel"><h3>Activity</h3><div class="co-heat">${cells}</div><p class="co-dayinfo">Pick a day to see what you did.</p></section>
      <section class="co-panel"><h3>XP, last 14 days</h3><div class="co-bars">${last14.map(([d, v]) => `<div title="${d}: ${v} XP"><i style="height:${(v / mx) * 100}%" class="${v >= S.goal ? "hit" : ""}"></i><small>${d.slice(8)}</small></div>`).join("")}<span class="co-goalline" style="bottom:${(S.goal / mx) * 100}%">goal ${S.goal}</span></div></section>
      <section class="co-panel"><h3>${TW}s</h3><div class="co-mastery">${cfg.tracks.map((t) => { const us = t.units.map((n) => units.find((u) => u.n === n)).filter(Boolean), tot = us.reduce((a, u) => a + u.lessons.length, 0), dn = us.reduce((a, u) => a + unitDone(u), 0); return `<div style="--a:${t.from};--b:${t.to}"><span>${esc(t.name)}</span><div class="co-bar"><i style="width:${(dn / tot) * 100}%"></i></div><small>${dn}/${tot}</small></div>`; }).join("")}</div></section>
      <section class="co-panel"><h3>Badges</h3><div class="co-badgelist">${BADGES.map((b) => `<div class="${b.ok(st) ? "on" : ""}">${ic(b.ok(st) ? "star" : "lock")}<b>${b.name}</b><small>${b.d}</small></div>`).join("")}</div></section>
      <section class="co-panel co-saved"><h3>Saved to your account</h3><p class="co-empty">Loading…</p></section>`;
    main.querySelector("[data-director]")?.addEventListener("click", async (e) => {
      const out = main.querySelector(".co-dirout"); e.currentTarget.disabled = true; out.innerHTML = `<p class="co-empty">Planning from your progress…</p>`;
      try { out.innerHTML = directorHtml(await askTutor(directorRequest()), { link: (lid) => `#/lesson/${lid}`, titleOf: (lid) => byId[lid]?.title || "" }); }
      catch (err) { out.innerHTML = err.signin ? signinLine("The study director", "use Revisit and Your plan") : `<p class="co-empty">${esc(err.message)}</p>`; e.currentTarget.disabled = false; }
    });
    main.querySelectorAll("[data-day]").forEach((b) => b.addEventListener("click", () => {
      const rows = S.log.filter((r) => day(r.t) === b.dataset.day), kinds = {};
      for (const r of rows) kinds[r.k] = (kinds[r.k] || 0) + 1;
      main.querySelector(".co-dayinfo").textContent = rows.length ? `${b.dataset.day}: ${rows.reduce((a, r) => a + r.xp, 0)} XP from ${Object.entries(kinds).map(([k, n]) => `${n} ${k}${n > 1 ? "s" : ""}`).join(", ")}.` : `${b.dataset.day}: nothing that day.`;
    }));
    try {
      const s = await store(), docs = (await s.listDocuments()).filter((d) => d.title?.startsWith(`${cfg.name}: `)), cards = await s.listCards();
      const count = (id) => cards.filter((c) => c.document_id === id).length;
      main.querySelector(".co-saved").innerHTML = `<h3>Saved to your account · ${docs.length} lesson${docs.length === 1 ? "" : "s"}</h3>${docs.length ? `<ul class="co-docs">${docs.map((d) => { const lid = d.file_name?.split("/")[1]; return `<li><div><b>${esc(d.title.slice(cfg.name.length + 2))}</b><small>${count(d.id)} cards · saved ${new Date(d.created_at).toLocaleDateString()}</small></div>${lid && byId[lid] ? `<a href="#/lesson/${lid}">Notes</a>` : ""}<a href="${cfg.app || "app.html"}#/deck/${d.id}">Study the cards</a></li>`; }).join("")}</ul>` : `<p class="co-empty">Nothing saved yet. Use <b>Save notes and cards</b> on any lesson to keep it in your Gradify account, where the cards join your daily study.</p>`}
        <p class="co-acct ${syncText(s.mode)?.warn ? "co-warn" : ""}">${s.mode === "cloud" ? esc(syncText("cloud").text) : `Saved on this device. <a href="${cfg.app || "app.html"}#/account">Sign in</a> to keep it everywhere.`}</p>`;
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

  // ---------- mock exams (kit/assess/exam.js) ----------
  // the question pool for a set of schools (respecting a path's module selection), from written notes only
  async function examPool(unitNs, path) {
    const out = [];
    for (const n of unitNs) {
      const u = units.find((x) => x.n === n); if (!u || (cfg.written && !cfg.written.includes(u.id))) continue;
      const N = await unitNotes(u), ls = path ? pathLessons(path, u) : u.lessons;
      for (const l of ls) {
        const L = N[l.id]; if (!L) continue;
        const group = l.module ? `${u.id}:${l.module}` : u.id, groupLabel = l.module ? `${U} ${u.n}: ${l.module}` : `${U} ${u.n}: ${u.title}`, link = `#/lesson/${l.id}`;
        for (const it of L.items) out.push({ Q: it.Q, id: it.key, item: it, group, groupLabel, link });
      }
    }
    return out;
  }
  async function viewExams() {
    const exams = cfg.exams;
    const rows = await Promise.all(exams.map(async (e) => { const p = e.path && cfg.paths.find((x) => x.id === e.path); const pool = await examPool(e.units || p?.units || [], p); return { e, n: buildExam(pool, e, 1).length }; }));
    main.innerHTML = `<div class="co-intro"><span class="co-kicker">Exams</span><h2>Mock exams</h2><p>Timed practice exams drawn from the written ${u1}s, marked at the end with every answer explained and your weak areas identified. They're for practice: pass marks here are practice thresholds, not official ones.</p></div>
      <div class="co-grid">${rows.map(({ e, n }) => { const hist = S.mocks[e.id] || [], best = hist.length ? Math.max(...hist.map((h) => h.score)) : null;
        return `<div class="co-pcard"><h3>${esc(e.title)}</h3><p>${esc(e.sub || "")}</p><small>${FORMATS[e.format || "mixed"].label} · ${Math.min(e.count, n)} questions · ${e.minutes} minutes · practice pass mark ${Math.round((e.pass ?? 0.6) * 100)}%${best !== null ? ` · best ${Math.round(best * 100)}%` : ""}</small>
        ${n ? `<a class="btn btn-light lg btn-sm" href="#/exam/${e.id}"><span>Start exam</span></a>` : `<p class="co-empty">Opens when the ${u1}s it covers have notes.</p>`}
        ${hist.length ? `<details><summary>Past attempts (${hist.length})</summary><ul>${hist.slice(-5).reverse().map((h) => `<li>${new Date(h.t).toLocaleDateString()}: ${Math.round(h.score * 100)}%${h.pass ? " · passed" : ""}</li>`).join("")}</ul></details>` : ""}</div>`; }).join("")}</div>`;
  }
  async function viewExam(id) {
    const e = cfg.exams?.find((x) => x.id === id); if (!e) return go("exams");
    const p = e.path && cfg.paths.find((x) => x.id === e.path);
    const items = buildExam(await examPool(e.units || p?.units || [], p), e);
    if (!items.length) return go("exams");
    side.hidden = true; root.querySelector(".co-body").classList.add("wide");
    runExam(main, { ...e, minutes: e.minutes, levels: LEVELS }, items, (summary, again) => {
      if (again) return viewExam(id);
      // every exam answer is an attempt record; the summary keeps only scores and weak areas
      for (const r of summary.items || []) if (r.item && !r.unanswered) record(r.item, "exam", e.id, r, { response: r.response, ms: r.ms, attempt: 1 });
      track("exam_finish", cfg.site);
      const { items: _drop, ...keep } = summary;
      (S.mocks[e.id] ||= []).push(keep); save();
      if (summary.pass) award(XP.quiz, "mock", e.id, `${cfg.name}: ${e.title} ${Math.round(summary.score * 100)}%`);
    });
  }

  // ---------- practice: subject interactives (kit/interactive/) ----------
  // ---------- practice / lab: subject interactives (kit/interactive/, kit/labs/) ----------
  // ctx for a mounted interactive: onComplete({ score }) passes the whole interactive (+quiz XP, once);
  // complete(task, label) records one challenge inside it (+problem XP, once); solved(task) reads that back.
  // A challenge named in x.evidence ({ task: lesson id }) is also an attempt record for that lesson, so it counts in
  // mastery as application (kit/learning/mastery.js, question type "lab"). Exploration tasks aren't named, so they don't.
  // The AI tutor on the page is told what the lab last used shows now (kit/course/lab-state.js reads it from the lab's
  // controls and readout); report(text) lets a lab add details its page doesn't show.
  const labNow = new Map(); let labLast = null;
  // Lab challenge outcomes (kit/learning/mastery.js LAB_OUTCOMES), each recorded against the challenge's lesson:
  //   "success"           met, with no help on this lab this visit
  //   "assisted_success"  met after the AI tutor answered a question about the lab, or after the interactive showed
  //                       the worked answer to this challenge this visit (ctx.fail with revealed)
  //   "unsuccessful"      a wrong answer to the challenge (ctx.fail), or the learner chose it ("Try this"), worked at it
  //                       for at least TRY_MOVES separate moments and moved on without meeting it
  //   "attempted"         chosen and touched, but fewer than TRY_MOVES moments: engagement, never mastery evidence
  // XP is awarded separately and only for a first success; mastery evidence never comes from opening a lab.
  const labTry = new Map(), labHelped = new Set(), labShown = new Map(), labFailed = new Map(), TRY_MOVES = 5;
  const labDecl = new Map(), labMetNow = new Map(), labTouched = new Set(), labOnOpen = new Map();
  const labDeclared = (x) => labDecl.get(x.id) || labDecl.set(x.id, new Map()).get(x.id);   // kept for the page's life
  const labMet = (x) => labMetNow.get(x.id) || labMetNow.set(x.id, new Set()).get(x.id);     // met this visit
  const labRecord = (x, task, label, outcome, extra = {}) => {
    const l = byId[x.evidence?.[task]]; if (!l) return null;
    const ok = outcome === "success" || outcome === "assisted_success";
    record({ Q: { type: "lab", d: 2, objectives: [] }, key: `ix:${x.id}:${task}`, v: null, l }, "practice", x.id,
      { score: ok ? 1 : 0, correct: ok, method: "auto", status: "final" }, { response: { challenge: label || task, outcome, evidence: EXPLORE.has(`ix:${x.id}:${task}`) ? "exploration" : "practice", ...extra } });
  };
  const endTry = (x) => {
    const t = labTry.get(x.id); labTry.delete(x.id);
    if (t && t.moves >= 1 && !S.solved[`ix:${x.id}:${t.task}`]) labRecord(x, t.task, t.label, t.moves >= TRY_MOVES ? "unsuccessful" : "attempted", { via: "try", moves: t.moves, seconds: Math.round((Date.now() - t.at) / 1000) });
  };
  const endTries = () => { for (const id of [...labTry.keys()]) if (ixById[id]) endTry(ixById[id]); };
  addEventListener("pagehide", endTries);
  const ixCtx = (x) => ({ ...x,
    onComplete: (r) => { const k = `ix:${x.id}`; if (!S.solved[k] && r?.score >= 0.7) { S.solved[k] = Date.now(); save(); award(XP.quiz, "practice", x.id, `${cfg.name}: ${x.title}`); } },
    complete: (task, label) => {
      // met before the learner has touched the interactive (its starting state happens to meet it): no XP, no
      // evidence. Opening something is never proof of understanding. scripts/check-interactives.cjs reports these.
      if (!labTouched.has(x.id)) { (labOnOpen.get(x.id) || labOnOpen.set(x.id, new Set()).get(x.id)).add(task); return; }
      const k = `ix:${x.id}:${task}`; if (labTry.get(x.id)?.task === task) labTry.delete(x.id);
      const helped = labHelped.has(x.id) || labShown.get(x.id)?.has(task);
      // a challenge is evidence each visit it's met (a practice item can be met again); XP only the first time ever
      if (!labMet(x).has(task)) { labMet(x).add(task); labRecord(x, task, label, helped ? "assisted_success" : "success"); }
      if (S.solved[k]) return;
      S.solved[k] = Date.now(); save(); award(XP.problem, "practice", k, `${cfg.name}: ${x.title}${label ? ` (${label})` : ""}`);
    },
    // a wrong answer to a challenge (once per challenge per visit); revealed: the interactive then showed the answer
    fail: (task, label, { revealed = false } = {}) => {
      if (revealed) { if (!labShown.has(x.id)) labShown.set(x.id, new Set()); labShown.get(x.id).add(task); }
      if (labTry.get(x.id)?.task === task) labTry.delete(x.id);
      const f = labFailed.get(x.id) || labFailed.set(x.id, new Set()).get(x.id);
      if (f.has(task) || labMet(x).has(task)) return; f.add(task);
      labRecord(x, task, label, "unsuccessful", { via: "answer" });
    },
    // the challenges this interactive offers (each needs a lesson in its evidence map; checked by scripts/check-interactives.cjs)
    declare: (list) => { for (const c of list || []) if (c?.id) labDeclared(x).set(c.id, c.text || c.id); },
    solved: (task) => Boolean(S.solved[`ix:${x.id}:${task}`]),
    // which challenge the learner says they're working on (only for labs whose challenges count as evidence)
    focus: x.evidence ? (task, label) => { endTry(x); if (task && x.evidence[task]) labTry.set(x.id, { task, label, moves: 0, last: 0, at: Date.now() }); } : undefined,
    report: (text) => { labNow.set(x.id, String(text || "").slice(0, 800)); } });
  const labFor = (id) => {
    const el = id && main.querySelector(`.co-lab[data-ix="${id}"] .co-labstage`);
    if (!el || !ixById[id]) return null;
    const state = labState({ report: labNow.get(id), ...readLab(el) });
    return state ? { title: ixById[id].title, state } : null;
  };
  const mounted = new Set();
  const unmountIx = () => { endTries(); for (const stop of mounted) { try { stop(); } catch { /* already gone */ } } mounted.clear(); labNow.clear(); labHelped.clear(); labShown.clear(); labFailed.clear(); labMetNow.clear(); labTouched.clear(); labLast = null; };
  async function mountIx(x, el) {
    try {
      const ctx = ixCtx(x), mod = await x.load(); el.innerHTML = ""; const stop = mod.mount(el, ctx); if (typeof stop === "function") mounted.add(stop);
      // for scripts/check-interactives.cjs: the interactive's context, its declared challenges and its records
      el.gradifyIx = { id: x.id, ctx, evidence: x.evidence || {}, declared: () => [...labDeclared(x)].map(([id, text]) => ({ id, text })), attempts: () => (S.attempts || []).filter((a) => a.contextId === x.id), metOnOpen: () => [...(labOnOpen.get(x.id) || [])], touch: () => labTouched.add(x.id) };
      // the lab the learner touched last is the one the tutor on the page is told about
      // a "move" on a chosen challenge is an interaction at least a second after the last (a slider drag is one move)
      if (!el.dataset.watch) { el.dataset.watch = "1"; for (const ev of ["pointerdown", "input", "change", "keydown"]) el.addEventListener(ev, (e) => {
        labLast = x.id; labTouched.add(x.id);
        const t = labTry.get(x.id), now = Date.now();
        if (t && !e.target.closest?.("[data-try]") && now - t.last >= 1000) { t.moves++; t.last = now; }
      }, { passive: true }); }
    }
    catch (e) { el.innerHTML = `<p class="co-empty">This interactive couldn't load (${esc(e.message)}).</p>`; }
  }
  // under every interactive: its expert review status, and that it works offline once opened (the tutor needs a connection)
  const ixStatus = (x) => { const r = reviewLabel(REVIEWS[`${cfg.slug}/${x.id}`], FINGERPRINTS[`${cfg.slug}/${x.id}`]); return `<p class="co-labstatus"><span class="co-review ${r.status}">${esc(r.text)}</span><span>Available offline after first use · the AI tutor needs an internet connection</span></p>`; };
  const ixCard = (x, open) => `<div class="co-lab" data-ix="${esc(x.id)}"><div class="co-labhead"><span class="co-kicker">${esc(PL === "Lab" ? `Interactive · ${x.kind}` : x.kind)}</span><h3>${esc(x.title)}</h3><p>${esc(x.sub)}</p></div><div class="co-labstage co-ix"><p class="co-empty">Loading the interactive…</p></div>${x.note ? `<p class="co-labnote"><b>Model:</b> ${inline(x.note)}</p>` : ""}${ixStatus(x)}</div>`;
  let ixObserver = null;
  function mountIxSlots(el) {
    el.querySelectorAll(".co-ixslot").forEach((slot) => { const x = ixById[slot.dataset.ix]; slot.outerHTML = x ? ixCard(x) : ""; });
    ixObserver?.disconnect();
    const go1 = (box) => { if (box.dataset.on) return; box.dataset.on = "1"; mountIx(ixById[box.dataset.ix], box.querySelector(".co-labstage")); };
    ixObserver = "IntersectionObserver" in window ? new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { ixObserver.unobserve(e.target); go1(e.target); } }), { rootMargin: "200px" }) : null;
    el.querySelectorAll(".co-lab[data-ix]").forEach((box) => (ixObserver ? ixObserver.observe(box) : go1(box)));
  }
  const ixDone = (x) => Object.keys(S.solved).filter((k) => k.startsWith(`ix:${x.id}:`)).length;
  const ixTile = (x) => `<a class="co-labtile" href="#/practice/${x.id}"><span class="co-kicker">${esc(x.kind)}</span><b>${esc(x.title)}</b><p>${esc(x.sub)}</p><small>${x.tasks ? `${ixDone(x)} / ${x.tasks} challenges` : x.schools ? `${U} ${x.schools.join(", ")}` : ""}</small></a>`;
  // ---------- workspace: a site's own reasoning environment (law: legal reasoning; nursing: clinical
  // simulation). cfg.workspace = { route, label, kicker, title, intro, banner, engine: () => import(…),
  // cases: [{ id, title, sub, kind, lessons, load: () => import(…) }] }. The engine mounts a case with
  // ctx.record (attempt records → mastery), ctx.finish (best score, XP once), ctx.ask (the AI tutor).
  const WS = cfg.workspace;
  const wsBest = (id) => S.ws?.[id]?.best;
  async function viewWorkspace(id) {
    S.ws ||= {};
    const list = WS.cases, base = `#/${WS.route}`;
    if (!id) {
      main.innerHTML = `<div class="co-intro"><span class="co-kicker">${esc(WS.kicker || WS.label)}</span><h2>${esc(WS.title)}</h2><p>${inline(WS.intro || "")}</p></div>
        ${WS.banner ? `<p class="sx-banner" role="note">${inline(WS.banner)}</p>` : ""}
        <div class="co-grid">${list.map((c) => { const b = wsBest(c.id); return `<a class="co-pcard" href="${base}/${c.id}"><span class="co-kicker">${esc(c.kind || "")}</span><h3>${esc(c.title)}</h3><p>${esc(c.sub)}</p><small>${b != null ? `Best ${Math.round(b * 100)}% · ${S.ws[c.id].runs} ${S.ws[c.id].runs === 1 ? "attempt" : "attempts"}` : "Not attempted yet"}</small></a>`; }).join("")}</div>`;
      return;
    }
    const c = list.find((x) => x.id === id);
    if (!c) { main.innerHTML = `<p class="co-empty">That case isn't here. <a href="${base}">Back to ${esc(WS.label)}</a></p>`; return; }
    main.innerHTML = `<div class="co-crumbs"><a href="${base}">← ${esc(WS.label)}</a><span>${esc(c.kind || "")}</span></div><div class="co-ws"><p class="co-empty">Loading…</p></div>`;
    const el = main.querySelector(".co-ws");
    try {
      const [engine, data] = await Promise.all([WS.engine(), c.load()]);
      unmountIx();
      const stop = engine.mount(el, data.default || data, wsCtx(c));
      if (typeof stop === "function") mounted.add(stop);
    } catch (e) { el.innerHTML = `<p class="co-empty">This case couldn't load (${esc(e.message)}).</p>`; }
  }
  const wsCtx = (c) => ({
    site: cfg.site, subject: cfg.slug,
    lessonHref: (lid) => `#/lesson/${lid}`, lessonTitle: (lid) => byId[lid]?.title || "",
    // one attempt record per marked part of the case, so the work counts in mastery and analytics
    record: (task, { type = "reasoning", d = 3, score = 0, response = null, lesson = null, method = "auto", status = "final" } = {}) =>
      record({ Q: { type, d, objectives: [] }, key: `ws:${c.id}:${task}`, v: null, l: lesson ? byId[lesson] : undefined }, "practice", c.id, { score, correct: score >= 0.7, method, status }, { response }),
    finish: (score) => {
      const w = (S.ws[c.id] ||= { best: 0, runs: 0 }); w.runs++; w.last = score; w.best = Math.max(w.best || 0, score); w.at = Date.now(); save();
      const k = `ws:${c.id}`; if (!S.solved[k] && score >= 0.7) { S.solved[k] = Date.now(); save(); award(XP.quiz, "practice", c.id, `${cfg.name}: ${c.title}`); }
    },
    draft: (k, v) => { S.drafts ||= {}; const key = `ws:${c.id}:${k}`; if (v === undefined) return S.drafts[key] || ""; S.drafts[key] = v; save(); },
    ask: askTutor, signinLine,
  });
  async function viewPractice(id) {
    const list = ixs;
    if (!id) {
      // grouped by track when the interactives name their lessons (sciences); a flat grid otherwise (law, nursing)
      const grouped = list.every((x) => x.lessons?.length);
      main.innerHTML = `<div class="co-intro"><span class="co-kicker">${esc(PL)}</span><h2>${PL === "Practice" ? "Interactive practice" : `${list.length} interactives`}</h2><p>${esc(cfg.practiceNote || "Work through scenarios and exercises that apply what you've learned.")}</p></div>
        ${grouped ? cfg.tracks.map((t) => { const g = list.filter((x) => trackOf(byId[x.lessons[0]].unit) === t); return g.length ? `<div class="co-track"><span>${esc(t.name)}</span></div><div class="co-labgrid">${g.map(ixTile).join("")}</div>` : ""; }).join("")
          : `<div class="co-grid">${list.map((x) => `<a class="co-pcard" href="#/practice/${x.id}"><h3>${esc(x.title)}</h3><p>${esc(x.sub)}</p><small>${esc(x.kind)}${x.schools ? ` · ${U} ${x.schools.join(", ")}` : ""}</small></a>`).join("")}</div>`}`;
      return;
    }
    const x = list.find((y) => y.id === id); if (!x) return go("practice");
    if (x.lessons?.length) {
      const used = x.lessons.map((l) => byId[l]).filter(Boolean);
      main.innerHTML = `<div class="co-crumbs"><a href="#/practice">← ${esc(PL)}</a><span>${esc(x.kind)}</span></div>${ixCard(x, true)}
        ${used.length ? `<section class="co-panel co-ask co-tutor"></section><section class="co-panel"><h3>Learn the ideas behind it</h3><ul class="co-used">${used.map((l) => `<li><a href="#/lesson/${l.id}"><small>${U} ${l.unit.n}${l.module ? ` · ${esc(l.module)}` : ""}</small>${esc(l.title)}</a></li>`).join("")}</ul></section>` : ""}`;
      await mountIx(x, main.querySelector(".co-labstage")); labLast = x.id;
      // the tutor on a lab page: grounded in the first of the lab's lessons that has notes, and told what the lab shows
      const tp = main.querySelector(".co-tutor"); if (!tp) return;
      let l0 = null, N = null;
      for (const l of used) { N = await notesFor(l).catch(() => null); if (N) { l0 = l; break; } }
      if (!N || !tp.isConnected) { tp.remove(); return; }
      mountTutorPanel(tp, {
        ask: askTutor, lesson: { id: l0.id, title: l0.title }, modes: ["explain", "socratic"], heading: "Ask about this lab",
        note: `${cfg.tutor || TUTOR_NOTE} On this page it uses the notes for "${l0.title}".`, focus: null, candidates: () => [], unavailable: (what) => signinLine(what, ""),
        link: (lid) => `#/lesson/${lid}`, titleOf: (lid) => byId[lid]?.title || lid, lab: () => labFor(x.id),
      });
      return;
    }
    main.innerHTML = `<div class="co-crumbs"><a href="#/practice">← ${esc(PL)}</a><span>${esc(x.kind)}</span></div><div class="co-panel co-ix"></div>`;
    await mountIx(x, main.querySelector(".co-ix"));
  }


  // ---------- overview: a subject's landing page (only when the course sets cfg.overview) ----------
  const isWritten = (u) => !cfg.written || cfg.written.includes(u.id);
  function viewOverview() {
    const O = cfg.overview, nl = nextLesson(), st = stats(), L = levelOf(st.xp), sk = streak(), t0 = cfg.tracks[0];
    const mods = units.reduce((a, u) => a + (u.modules?.filter((m) => m.title).length || 0), 0);
    const started = st.lessons > 0 || st.xp > 0, feat = (O.featured || []).map((id) => ixById[id]).filter(Boolean);
    const count = (f) => units.filter(f).reduce((a, u) => a + u.lessons.length, 0);
    main.innerHTML = `<section class="co-hero" style="--a:${t0.from};--b:${cfg.tracks.at(-1).to}">
        <div class="co-herotext"><span class="co-kicker">${esc(cfg.site)} · ${esc(cfg.name)}</span><h2>${esc(O.headline || cfg.name)}</h2><p>${esc(O.intro)}</p>
          <div class="co-herostats">${[[units.length, `${u1}s`], [mods, "modules"], [lessons.length, "lessons"], [ixs.length, "interactives"]].map(([n, k]) => `<div><b>${n.toLocaleString()}</b><small>${k}</small></div>`).join("")}</div>
          <div class="co-row">${nl ? `<a class="btn btn-light lg" href="#/lesson/${nl.id}"><span>${started ? `Continue: ${esc(nl.title)}` : `Start with ${esc(nl.title)}`}</span></a>` : ""}<a class="btn btn-ghost lg" href="#/paths"><span>Choose a path</span></a></div>
          <label class="co-bigsearch">${ic("search")}<input type="search" placeholder="Search ${lessons.length.toLocaleString()} lessons${ixs.length ? ` and ${ixs.length} interactives` : ""}" aria-label="Search ${esc(cfg.name)}"><div class="co-results" hidden></div></label></div>
        ${feat.length ? `<div class="co-herolab">${ixCard(feat[0], true)}</div>` : ""}
      </section>
      ${O.learn?.length ? `<section class="co-osec"><div class="co-intro"><span class="co-kicker">What you'll learn</span><h2>${esc(O.learnTitle || `${cfg.name} from first ideas to research`)}</h2></div><div class="co-learn">${O.learn.map(([h, d]) => `<div><b>${esc(h)}</b><p>${esc(d)}</p></div>`).join("")}</div></section>` : ""}
      <section class="co-osec"><div class="co-intro"><span class="co-kicker">Your progress</span><h2>${started ? `Level ${L.n} · ${st.xp.toLocaleString()} XP` : "Your progress will show here"}</h2><p>${started ? `${st.lessons} of ${lessons.length} lessons done, a ${sk.n}-day streak, ${st.quizzes} ${u1} quiz${st.quizzes === 1 ? "" : "zes"} passed.` : `XP, streaks, quizzes and saved notes count in your Gradify account, alongside every other Gradify course.`} <a href="#/me">See all your progress →</a></p></div>
        <div class="co-dots big">${units.map((u) => { const t = trackOf(u), p = unitDone(u) / u.lessons.length; return `<a href="#/learn/${u.id}" title="${U} ${u.n}: ${esc(u.title)} (${Math.round(p * 100)}%)" style="--a:${t.from};--b:${t.to};--p:${p}"></a>`; }).join("")}</div></section>
      <section class="co-osec"><div class="co-intro"><span class="co-kicker">Curriculum</span><h2>${units.length} ${u1}s in ${cfg.tracks.length} ${tw1}s</h2><p>Each ${u1} is divided into modules and lessons. A written lesson has notes, worked examples, key terms, sources, check questions at three levels and flashcards; ${u1}s still being written are marked.</p></div>
        ${cfg.tracks.map((t) => `<div class="co-track"><span>${esc(t.name)}</span></div><div class="co-schools">${t.units.map((n) => units.find((u) => u.n === n)).filter(Boolean).map((u) => { const d = unitDone(u), w = isWritten(u);
          return `<a class="co-school" href="#/learn/${u.id}" style="--a:${t.from};--b:${t.to}"><span class="co-kicker">${U} ${u.n}${w ? (isDraft(u) ? " · draft" : "") : " · being written"}</span><h3>${esc(u.title)}</h3>${cfg.blurbs?.[u.n] ? `<p>${esc(cfg.blurbs[u.n])}</p>` : ""}<small>${u.modules.filter((m) => m.title).length} modules · ${u.lessons.length} lessons${d ? ` · ${d} done` : ""}</small><div class="co-bar"><i style="width:${(d / u.lessons.length) * 100}%"></i></div></a>`; }).join("")}</div>`).join("")}</section>
      <section class="co-osec"><div class="co-intro"><span class="co-kicker">Learning paths</span><h2>Routes for different goals</h2><p>Follow a path and the Learn page and your next milestone follow it.</p></div>
        <div class="co-grid">${cfg.paths.map((p) => { const t = trackOf(units.find((u) => u.n === p.units[0])), pct = p.units.reduce((a, n) => a + unitPct(n, p), 0) / p.units.length; return `<a class="co-pcard mini" href="#/paths" style="--a:${t.from};--b:${t.to}"><h3>${esc(p.name)}</h3><p>${esc(p.sub)}</p><small>${p.units.length} ${u1}s · ${Math.round(pct * 100)}% done</small></a>`; }).join("")}</div></section>
      ${feat.length > 1 ? `<section class="co-osec"><div class="co-intro"><span class="co-kicker">Interactives</span><h2>Explore it, don't just read it</h2><p>${ixs.length} simulations, models and exercises. Each one states what it simplifies.</p></div>
        <div class="co-labgrid">${feat.slice(1).map(ixTile).join("")}</div><p><a class="co-more" href="#/practice">All ${ixs.length} interactives →</a></p></section>` : ""}
      <section class="co-osec"><div class="co-intro"><span class="co-kicker">Study tools</span><h2>Everything to make it stick</h2></div>
        <div class="co-feats">${[["Spaced review", "Flashcards from the lessons you've finished come back just before you'd forget them.", "#/review"], ["Problem bank", `Every question in the course by level: ${LEVELS.join(", ").toLowerCase()}.`, "#/problems"], ...(cfg.exams ? [["Exams", `Timed cumulative exams over each ${tw1} and the whole course, with weak areas identified.`, "#/exams"]] : []), [`${U} quizzes`, `Ten questions at the end of every ${u1}; pass with 75%.`, "#/learn"], ...(O.tools || [])].map(([h, d, href]) => `<a class="co-feat" href="${href}"><b>${esc(h)}</b><p>${esc(d)}</p></a>`).join("")}</div></section>
      ${cfg.qa ? `<section class="co-osec co-govern"><div class="co-intro"><span class="co-kicker">How the content is made</span><h2>Original notes, checked in stages</h2><p>Lessons are written in original words from authoritative sources (${esc(O.sources || "open textbooks and primary references")}), each cited in the lesson with its date. ${cfg.publish ? `Every ${u1} is published; review, source checking and expert sign-off continue ${u1} by ${u1}, and the counts below show progress.` : `A ${u1} is published as a draft until it has been reviewed, its sources checked and an expert has signed it off.`}</p></div>
        <div class="co-tiles">${[["Being written", count((u) => !isWritten(u))], [cfg.publish ? "Published, checks in progress" : "Written (draft)", count((u) => isWritten(u) && !isReady(u))], ["Reviewed, checked and signed off", count((u) => isWritten(u) && isReady(u))]].map(([k, v]) => `<div><small>${k}</small><b>${v.toLocaleString()}</b></div>`).join("")}</div>
        <p class="co-empty">Counts are lessons. The stages are written, technically tested, content reviewed, sources checked and expert sign-off (docs/CURRICULUM_QA.md).</p></section>` : ""}`;
    const bq = main.querySelector(".co-bigsearch input"), br = main.querySelector(".co-bigsearch .co-results");
    bq.addEventListener("input", () => { if (norm(bq.value).length < 2) { br.hidden = true; return; } br.innerHTML = searchHtml(bq.value); br.hidden = false; });
    if (feat.length) mountIx(feat[0], main.querySelector(".co-herolab .co-labstage"));
  }

  // ---------- router ----------
  const go = (h) => { location.hash = `#/${h}`; };
  async function route() {
    unmountIx();
    const home = cfg.overview ? "overview" : "learn";
    const [v0, arg] = location.hash.replace(/^#\/?/, "").split("/"), v = v0 || home;
    const view = VIEWS.some(([id]) => id === v) || ["lesson", "quiz", "exam"].includes(v) ? v : home;
    root.querySelectorAll(".co-tabs a").forEach((a) => a.toggleAttribute("aria-current", a.dataset.v === (view === "lesson" || view === "quiz" ? "learn" : view === "exam" ? "exams" : view)));
    showTab();
    const wide = ["me", "features", "leaderboard", "tracks", "paths", "exams", "exam", "practice", "overview", cfg.workspace?.route].includes(view);
    side.hidden = wide; root.querySelector(".co-body").classList.toggle("wide", wide);
    if (view !== "learn") scrollTo(0, 0);
    if (view === "learn") { if (arg) openUnit(arg); viewLearn(arg); }
    else if (view === "lesson") await viewLesson(arg);
    else if (view === "quiz") await viewQuiz(arg);
    else if (view === "review") await (arg === "questions" ? viewRetrieval() : viewReview());
    else if (view === "paths") viewPaths();
    else if (view === "tracks") viewTracks();
    else if (view === "problems") await viewProblems();
    else if (view === "cases") await viewAuthorities();
    else if (view === "write") await viewWrite(arg);
    else if (view === "revalidation") await mountRevalidation(main, await store(), { accountHref: `${cfg.app || "app.html"}#/account` });
    else if (view === "exams") await viewExams();
    else if (view === "exam") await viewExam(arg);
    else if (view === "practice") await viewPractice(arg);
    else if (cfg.workspace && view === cfg.workspace.route) await viewWorkspace(arg);
    else if (view === "overview") viewOverview();
    else if (view === "leaderboard") viewLeaderboard();
    else if (view === "me") await viewMe();
    else viewFeatures();
    paintSide();
  }
  addEventListener("hashchange", route);
  pullProgress();
  route();
  reviewPool().then(paintHud);
  return { state: () => S, lessons, units };
}
