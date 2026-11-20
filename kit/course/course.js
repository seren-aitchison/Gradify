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
import { weaknessTargets, practiceSet } from "../learning/targets.js";
import { UNDERSTANDING, understandingStats } from "../learning/achievements.js";
import { sixHtml, calibrationHtml } from "../learning/mastery-view.js";
import { conceptGraph, prerequisitesOfLesson, weakPrerequisites } from "../learning/concepts.js";
import { checkCourse } from "./spec.js";
import { levelOf as gameLevelOf, habits } from "../game/engine.js";
import { learnerOf, needsSetup, applyPrefs } from "../data/profile.js";
import { paceFor } from "../learning/pace.js";
import { trackView, track } from "../core/analytics.js";
import { callFunction } from "../data/functions.js";
import { mergeProgress, cloudCopy, mergeAttempts, queueAttempt, outboxAttempts, confirmAttempts } from "./progress.js";
import { access, plusPanelHtml, promptPlus } from "../data/plan.js";
import { gate, lockedHtml } from "../data/limits.js";
import { mapsSectionHtml, wireMaps } from "../maps/view.js";
import { lessonTimer, addTime, MIN_LOG_MS, minutesPerLesson } from "./lesson-time.js";
import { hydrate as glassIcons } from "../core/glass-icons.js";
import { diagramsFor, diagramForCard, glassDiagram } from "../core/glass-diagrams.js";
import { mountRevalidation } from "./revalidation.js";
import { tutorEvent } from "../intel/experiments.js";
import { scoreFeedback } from "../assess/tutor.js";
import { feedbackHtml, paras } from "../assess/tutor-view.js";
import { mountTutorPanel, directorHtml, newConversation } from "./tutor-panel.js";
import { readLab, labState, labTry as nextLabTry, labLeave } from "./lab-state.js";
import { SUPABASE_URL } from "../../gradify.config.js";
import { buildExam, runExam, FORMATS } from "../assess/exam.js";
import { reviewLabel } from "./review.js";
import { REVIEWS } from "./reviews.js";
import { FINGERPRINTS } from "./ix-manifest.js";
import { lessonSignals, topicStatus, rollup, strengths, STATUSES, STATUS } from "../learning/topic-status.js";
import { buildTargetTest, targetResults, encodeTest, decodeTest, FOCUS, LENGTHS, countFor } from "../assess/target-test.js";
import { moduleGroups, createOutline, createPalette, dot, ring } from "./navigator.js";
import { gameState, claim } from "../game/engine.js";
import { quests } from "../game/quests.js";
import { ICONS } from "../ui/icons.js";
// the shared Gradify UX system (kit/ui, docs/DESIGN-SYSTEM.md): the same toasts, save indicator, shortcuts, empty
// states, skeletons, wayfinding and resource switcher on every Gradify page
import { toast as uiToast, mountSaveState } from "../ui/feedback.js";
import { shortcuts, withKey } from "../ui/keys.js";
import { emptyState, skeleton } from "../ui/states.js";
import { mountToTop, copyLink, jumpTo } from "../ui/motion.js";
import { arriveHere, rememberScroll, backPlace, trail, pin, pinned, pins, setPins, restoreAt, onPlacesChange } from "../ui/places.js";
import { offerBack, hideBack, restoreScroll } from "../ui/wayfinding.js";
import { resourceSwitcher, wireActions } from "../ui/resources.js";
import { pref, setPref } from "../ui/prefs.js";
import { openModal, openDrawer } from "../ui/overlay.js";
import { tabsHtml, wireTabs } from "../ui/disclosure.js";
import { feel } from "../ui/feel.js";
import { CHAPTER_PREREQS, chapterPrereqsFromConcepts } from "../learning/chapter-map.js";
import { masteryMap } from "../learning/mastery-map.js";
import { renderMasteryMap } from "../ui/mastery-map-view.js";

const DAY = 864e5;
const XP = { lesson: 10, check: 5, chest: 15, quiz: 50, perfect: 20, review: 2, problem: 5, weekly: 100 };
const day = (t = Date.now()) => { const d = new Date(t); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
const weekStart = (t = Date.now()) => { const d = new Date(t); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return d.getTime(); };
const shuffle = (a, seed = Math.random) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(seed() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const rng = (s) => () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
// levels get further apart: level n needs 50·n·(n+1) XP in total
// one level curve for every course and the Journey page (kit/game/engine.js): level n needs 50·n·(n+1) XP
export const levelOf = gameLevelOf;
// the icons are the shared set (kit/ui/icons.js), so an icon means the same thing on every Gradify page
const ICON = ICONS;
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
// understanding achievements (kit/learning/achievements.js): earned only from measured evidence, never from XP
BADGES.push(...UNDERSTANDING.map((b) => ({ ...b, understanding: true })));
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
  // the concept graph (kit/learning/concepts.js): what each module builds on, when the course provides cfg.concepts
  const graph = cfg.concepts ? conceptGraph(units, cfg.concepts) : null;
  // the subject config spec (kit/course/spec.js): a config that doesn't fit is reported, and the course still runs
  { const problems = checkCourse(cfg); if (problems.length) console.warn(`${cfg.site} course config:`, problems); }
  const trackOf = (u) => cfg.tracks.find((t) => t.units.includes(u.n)) || cfg.tracks[0];
  // module groups per unit (kit/course/navigator.js), worked out once
  const gcache = {}; const groupsOf = (u) => (gcache[u.id] ||= moduleGroups(u, byId));
  let S = (() => { try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch { return null; } })() || {};
  S = { done: {}, chests: {}, quiz: {}, solved: {}, cards: {}, log: [], goal: 30, path: null, open: [], closed: [], weekly: {}, saved: {}, mocks: {}, attempts: [], marks: {}, recent: [], treeOpen: [], ...S };
  // saved on this device at once and, when signed in, to the account a few seconds later (kit/course/progress.js)
  let syncT = null;
  // the save indicator (kit/ui/feedback.js): every pill on the page shows the same state
  let saves = [], saveNow = ["", {}];
  const setSave = (st, d = {}) => { saveNow = [st, { waiting: (S.outbox || []).length, ...d }]; saves = saves.filter((p) => p.el.isConnected); saves.forEach((p) => p.set(...saveNow)); };
  const addSave = (el) => { if (!el) return; const p = mountSaveState(el, { href: `${cfg.app || "app.html"}#/account` }); saves.push(p); p.set(...saveNow); };
  // quiet: bookkeeping (where you are in a lesson) syncs too, without the indicator flickering as you scroll
  const save = (quiet = false) => {
    S.updated = Date.now();
    if (!quiet) setSave(storeMode === "cloud" || !storeMode ? "saving" : "local");
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch { /* private mode: progress lasts this visit */ }
    clearTimeout(syncT); syncT = setTimeout(pushProgress, 3000);
  };
  // write the device copy without scheduling another account sync (used for bookkeeping such as sync status)
  const keep = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch { /* private mode */ } };
  let retryT = null;
  const failed = (e) => {
    const msg = String(e?.message || e || ""), auth = /jwt|token|auth|401|sign/i.test(msg) || e?.status === 401;
    S.sync = { ...(S.sync || {}), failedAt: Date.now(), reason: !navigator.onLine ? "offline" : auth ? "signed-out" : "error" }; keep(); paintSide(); setSave(S.sync.reason);
    // try again in a minute while the page is open; the next visit and coming back online also retry
    clearTimeout(retryT); retryT = setTimeout(() => { pushProgress(); flushOutbox(); }, 60000);
  };
  async function pushProgress() {
    clearTimeout(syncT); syncT = null;
    let s; try { s = await store(); } catch { return; }
    if (s.mode !== "cloud" || !s.saveCourseProgress) { setSave("local"); return; }
    try { await s.saveCourseProgress(cfg.slug, cfg.site, cloudCopy(S)); const was = S.sync?.failedAt; S.sync = { ok: Date.now() }; keep(); if (was) paintSide(); setSave("saved", { at: S.sync.ok }); }
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
  addEventListener("offline", () => { if (storeMode === "cloud") setSave("offline"); });
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
    storeMode = st.mode; storeNow = st;
    const f = S.sync?.failedAt && (!S.sync.ok || S.sync.failedAt > S.sync.ok) ? S.sync.reason : null;
    setSave(st.mode !== "cloud" ? "local" : !navigator.onLine ? "offline" : f || "saved", { at: S.sync?.ok });
    return st;
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
    if (a.question?.type !== "card") feel(a.correct ? "correct" : "wrong");
    queueAttempt(S, a.id); save();
    flushOutbox();
    return a;
  }
  // wire practice questions in el: records every attempt; first-try success solves the question for XP
  // answers right first time in a row, on this page: a little streak inside the lesson (no extra XP, just momentum)
  let combo = 0, comboBest = 0;
  function comboPop(n) {
    const el = document.createElement("div"); el.className = "cx-combopop"; el.innerHTML = `${ic("flame")}<b>${n} in a row!</b>`; document.body.append(el);
    setTimeout(() => el.remove(), 1600);
    root.querySelectorAll(".cx-combo-n").forEach((x) => { x.textContent = n; x.closest(".cx-combo")?.classList.add("hot"); });
  }
  function wirePractice(el, context, contextId, xp = XP.check) {
    wireQuestions(el, (k) => pageQs.get(k)?.Q, (Q, res, first, box, meta) => {
      const it = pageQs.get(box.dataset.key); record(it, context, contextId, res, meta);
      if (first) { if (res.score >= 0.7) { combo++; comboBest = Math.max(comboBest, combo); if ([3, 5, 8, 12].includes(combo)) comboPop(combo); } else { combo = 0; root.querySelectorAll(".cx-combo").forEach((x) => x.classList.remove("hot")); } root.querySelectorAll(".cx-combo-n").forEach((x) => { x.textContent = combo; x.closest(".cx-combo").hidden = !combo; }); }
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

  // ---------- topic status: completion and mastery from evidence (kit/learning/topic-status.js) ----------
  let sigKey = "", sigMap = new Map();
  const sigs = () => { const k = `${(S.attempts || []).length}|${S.attempts?.at(-1)?.id || ""}`; if (k !== sigKey) { sigKey = k; sigMap = lessonSignals(S.attempts || []); } return sigMap; };
  const visited = (id) => Boolean(S.time?.[id] || (S.recent || []).some((r) => r.id === id));
  const statusOf = (id) => topicStatus({ done: Boolean(S.done[id]), visited: visited(id), sig: sigs().get(id) });
  const roll = (ids) => rollup(ids, statusOf, sigs(), (id) => Boolean(S.done[id]));
  const idsOf = (u) => u.lessons.map((l) => l.id);
  const pc = (x) => `${Math.round((x || 0) * 100)}%`;
  // the bar that shows a group's statuses side by side, mastered first
  const ORDER = ["mastered", "practised", "learned", "started", "revise"];
  const stack = (r) => `<span class="cx-stack" role="img" aria-label="${ORDER.filter((k) => r.counts[k]).map((k) => `${r.counts[k]} ${STATUS[k].label.toLowerCase()}`).join(", ") || "Not started"}">${ORDER.map((k) => (r.counts[k] ? `<i class="s-${k}" style="flex:${r.counts[k]}"></i>` : "")).join("")}<i class="s-new" style="flex:${r.counts.new}"></i></span>`;

  // ---------- XP, levels, streaks ----------
  const totalXp = () => S.log.reduce((a, r) => a + r.xp, 0);
  const days = () => [...new Set(S.log.map((r) => day(r.t)))].sort();
  // the day streak, with rest days (kit/game/engine.js): every seven learning days bank one, up to three, and a banked
  // rest day covers a missed day automatically, so a day off for illness or a break doesn't wipe the streak
  function streak() {
    const h = habits(S.log || [], { goal: S.goal });
    return { n: h.streak, best: h.best, today: h.today, rest: h.restBank };
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
      tracks: cfg.tracks.filter((t) => t.units.every((n) => { const u = units.find((x) => x.n === n); return u && unitDone(u) === u.lessons.length; })).length,
      ...understandingStats(S.attempts || [], { exploration: EXPLORE, levels: cfg.levels || null, mocks: S.mocks }) };
  }
  const earned = () => BADGES.filter((b) => b.ok(stats()));

  async function award(xp, k, id, detail) {
    const before = { lvl: levelOf(totalXp()).n, badges: new Set(earned().map((b) => b.id)), goal: todayXp() >= S.goal };
    S.log.push({ t: Date.now(), xp, k, id }); save();
    pop(`+${xp} XP`);
    store().then((s) => s.logActivity({ site: cfg.site, kind: `${cfg.slug}-${k}`, xp, detail: detail || id })).catch(() => {});
    const lvl = levelOf(totalXp()).n;
    if (lvl > before.lvl) feel("levelup");
    else if (k === "lesson" || k === "quiz") feel("complete");
    if (lvl > before.lvl) celebrate(`Level ${lvl}`, `You reached level ${lvl} in ${cfg.name}.`);
    for (const b of earned()) if (!before.badges.has(b.id)) feel("achievement"), toast(`${ic("star")} Badge earned: <b>${b.name}</b>`);
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
  // the shared toast (kit/ui/feedback.js): opts.undo adds Undo (and ⌘Z / Ctrl+Z while it shows)
  const toast = (html, opts = {}) => uiToast({ html }, opts);
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
  // the tabs: a few that matter, always visible (Home, Syllabus, Revise, the course's own workspace, Exams, Lab,
  // Progress), and the rest under More. Every older address (#/review, #/paths, …) still works.
  const PRIMARY = [["home", "Home"], ["learn", "Syllabus"], ["revise", "Revise"], ...(cfg.workspace ? [[cfg.workspace.route, cfg.workspace.label]] : []), ...(cfg.exams ? [["exams", "Exams"]] : []), ...(cfg.interactives ? [["practice", PL]] : []), ["me", "Progress"]];
  const MORE = [...(cfg.overview ? [["overview", "About this course"]] : []), ["review", "Flashcard review"], ["problems", "Problem bank"], ...(cfg.authorities ? [["cases", cfg.authorities]] : []), ...(cfg.writing?.length ? [["write", "Written practice"]] : []), ...(cfg.revalidation ? [["revalidation", "Revalidation"]] : []), ["paths", "Paths"], ["tracks", `${TW}s`], ["leaderboard", "Leaderboard"], ["features", "Features"]];
  const VIEWS = [...PRIMARY, ...MORE];
  // which tab a view belongs to
  const TAB_OF = { lesson: "learn", quiz: "learn", review: "revise", target: "revise", problems: "revise", exam: "exams", overview: "home" };
  roadDefs();
  root.classList.add("co");
  if (cfg.theme) { root.classList.add("co-themed"); if (cfg.theme.spectrum) root.style.setProperty("--spectrum", cfg.theme.spectrum); if (cfg.theme.accent) root.style.setProperty("--co-accent", cfg.theme.accent); }
  const isMac = /Mac|iPhone|iPad/.test(navigator.platform || "");
  root.innerHTML = `
    <div class="co-head">
      <div class="co-title"><nav class="cx-crumbs" aria-label="Breadcrumb"><a href="/">Gradify</a><a href="../">${esc(cfg.site)}</a><span aria-current="page">${esc(cfg.name)}</span></nav><h1>${esc(cfg.name)}</h1><div class="cx-headrow"><span class="cx-save" hidden></span><button type="button" class="gx-link cx-pin" data-pincourse aria-pressed="false"></button></div></div>
      <div class="co-hud" aria-label="Your progress"></div>
    </div>
    ${cfg.notice ? `<p class="co-notice" role="note">${cfg.notice}</p>` : ""}
    <nav class="co-tabs" aria-label="${esc(cfg.name)}">${PRIMARY.map(([id, t]) => `<a href="#/${id}" data-v="${id}">${t}${id === "revise" ? '<i class="co-due" hidden></i>' : ""}</a>`).join("")}
      <button type="button" class="cx-morebtn" aria-haspopup="true" aria-expanded="false">More ${ic("more")}</button>
      <label class="co-search">${ic("search")}<input type="search" placeholder="Search ${lessons.length.toLocaleString()} lessons" aria-label="Search lessons"><kbd class="cx-kbd" title="Open the search from anywhere">${isMac ? "⌘K" : "/"}</kbd></label></nav>
    <div class="co-body"><aside class="cx-tree" aria-label="Course outline" hidden></aside><main class="co-main"></main><aside class="co-side"></aside></div>
    <div class="cx-scrim" hidden></div>
    <nav class="cx-dock" aria-label="${esc(cfg.name)} quick navigation"></nav>`;
  const main = root.querySelector(".co-main"), side = root.querySelector(".co-side"), hud = root.querySelector(".co-hud"), treeEl = root.querySelector(".cx-tree"), dock = root.querySelector(".cx-dock"), scrim = root.querySelector(".cx-scrim");
  addSave(root.querySelector(".co-head .cx-save"));
  // pin this course to the top of the Gradify homepage and the subject site's (kit/ui/places.js); Undo, no confirm
  const pinBtn = root.querySelector("[data-pincourse]"), courseHref = location.pathname;
  const paintPin = () => { const on = pinned(courseHref); pinBtn.setAttribute("aria-pressed", String(on)); pinBtn.innerHTML = `${ic(on ? "pinned" : "pin")}${on ? "Pinned" : "Pin course"}`; pinBtn.title = on ? "Unpin from your Gradify home" : "Pin to the top of your Gradify home"; };
  pinBtn.addEventListener("click", () => {
    const r = pin({ href: courseHref, title: cfg.name, sub: `${cfg.site} · course`, kind: "course" }); paintPin();
    toast(`${r.pinned ? "Pinned" : "Unpinned"} <b>${esc(cfg.name)}</b>${r.pinned ? " to your Gradify home" : ""}`, { icon: r.pinned ? "pinned" : "pin", key: "pin", undo: () => { setPins(r.pinned ? pins().filter((p) => p.href !== courseHref) : restoreAt(pins(), r.item, r.index)); paintPin(); } });
  });
  paintPin(); onPlacesChange(paintPin);
  mountToTop();
  // the More menu floats above the page (the tab bar scrolls sideways, which would clip it)
  const moreBtn = root.querySelector(".cx-morebtn"), moreMenu = Object.assign(document.createElement("div"), { className: "cx-moremenu", hidden: true });
  moreMenu.setAttribute("role", "menu");
  moreMenu.innerHTML = MORE.map(([id, t]) => `<a role="menuitem" href="#/${id}" data-v="${id}">${esc(t)}</a>`).join("");
  document.body.append(moreMenu);
  const closeMore = () => { moreMenu.hidden = true; moreBtn.setAttribute("aria-expanded", "false"); };
  moreBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!moreMenu.hidden) return closeMore();
    const r = moreBtn.getBoundingClientRect(); moreMenu.hidden = false; moreBtn.setAttribute("aria-expanded", "true");
    moreMenu.style.top = `${Math.round(r.bottom + 8)}px`; moreMenu.style.left = `${Math.round(Math.min(r.left, innerWidth - moreMenu.offsetWidth - 8))}px`;
    moreMenu.querySelector("a")?.focus();
  });
  moreMenu.addEventListener("click", closeMore);
  moreMenu.addEventListener("keydown", (e) => {
    const as = [...moreMenu.querySelectorAll("a")], i = as.indexOf(document.activeElement);
    if (e.key === "Escape") { closeMore(); moreBtn.focus(); } else if (e.key === "ArrowDown") { e.preventDefault(); as[(i + 1) % as.length].focus(); } else if (e.key === "ArrowUp") { e.preventDefault(); as[(i - 1 + as.length) % as.length].focus(); }
  });
  document.addEventListener("click", (e) => { if (!e.target.closest(".cx-moremenu, .cx-morebtn")) closeMore(); });
  addEventListener("scroll", closeMore, { passive: true });

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
  // below the search box, sized to the space that's really visible (a phone's keyboard takes the bottom half);
  // above it when there's more room there
  const placeResults = () => {
    if (res.hidden) return;
    const r = q.closest(".co-search").getBoundingClientRect(), w = Math.min(420, innerWidth - 16);
    const vh = window.visualViewport?.height ?? innerHeight, below = vh - r.bottom - 16, above = r.top - 16;
    res.style.width = `${w}px`;
    res.style.left = `${Math.round(Math.min(Math.max(8, r.right - w), innerWidth - w - 8))}px`;
    if (below >= 220 || below >= above) { res.style.top = `${Math.round(r.bottom + 8)}px`; res.style.maxHeight = `${Math.max(120, Math.round(below))}px`; }
    else { const h = Math.min(res.scrollHeight, above); res.style.maxHeight = `${Math.round(above)}px`; res.style.top = `${Math.round(Math.max(8, r.top - 8 - h))}px`; }
  };
  addEventListener("resize", placeResults); addEventListener("scroll", placeResults, { passive: true });
  window.visualViewport?.addEventListener("resize", placeResults);
  // opening the search in a crowded bar scrolls it into view (after its width transition); on a phone the page also
  // scrolls so the search box sits near the top, leaving room for its results above the keyboard
  q.addEventListener("focus", () => setTimeout(() => {
    if (tabs.classList.contains("tight")) { tabs.scrollLeft = tabs.scrollWidth; tabEdges(); }
    const top = q.closest(".co-search").getBoundingClientRect().top;
    if (innerWidth <= 760 && top > innerHeight * 0.3) scrollBy({ top: top - 84, behavior: "instant" });
    placeResults();
  }, 220));
  // ---------- search: one set of results for the tab search, the palette (/ or ⌘K) and the overview ----------
  const ACTIONS = () => [
    ["Home", "#/home", "launchpad continue today"], ["Syllabus", "#/learn", "outline course units lessons"], ["Revise", "#/revise", "revision"],
    ["Review flashcards", "#/review", "cards spaced repetition", dueCards().length ? `${dueCards().length} due` : ""],
    ["Target test", `#/target/${encodeTest({ minutes: 10, scope: weakTargets().length ? "weak" : "studied" })}`, "quiz test practice weak"],
    ["Target my weaknesses", "#/review/weak", "weak spots gaps"], ["Revisit questions", "#/review/questions", "retrieval spaced"],
    ["My progress", "#/me", "mastery strengths weaknesses stats"], ["Problem bank", "#/problems", "questions"],
    ...(cfg.exams ? [["Mock exams", "#/exams", "exam timed"]] : []), ...(ixs.length ? [[`${PL}`, "#/practice", "interactive simulation"]] : []),
    ["Paths", "#/paths", "route goal"], ["Leaderboard", "#/leaderboard", "league"],
    ["Focus mode", null, "distraction reading", "", () => setFocus(!focusOn())],
  ].map(([t, href, keys, badge, run]) => ({ type: "action", t, href, keys, badge, run, k: "Go to" }));
  const searchHits = (raw) => {
    const t = norm(raw); if (t.length < 2) return [];
    const sc = (x) => { const n = norm(x); return n.startsWith(t) ? 0 : n.includes(` ${t}`) ? 1 : n.includes(t) ? 2 : 9; };
    const out = [];
    for (const u of units) {
      const a = sc(u.title); if (a < 9) out.push({ type: "topic", href: `#/learn/${u.id}`, t: u.title, k: `${U} ${u.n} · ${u.lessons.length} lessons · ${pc(roll(idsOf(u)).coverage)} done`, st: roll(idsOf(u)).status, sc: a });
      groupsOf(u).forEach((g, mi) => { if (!g.title) return; const b = sc(g.title); if (b < 9) { const to = g.lessons.find((l) => !S.done[l.id]) || g.lessons[0]; out.push({ type: "topic", href: `#/lesson/${to.id}`, t: g.title, k: `Module ${u.n}.${mi + 1} · ${U} ${u.n}: ${u.title}`, st: roll(g.lessons.map((l) => l.id)).status, sc: b + 0.4 }); } });
    }
    for (const l of lessons) { const a = sc(l.title); if (a < 9) out.push({ type: "lesson", href: `#/lesson/${l.id}`, t: l.title, k: `${U} ${l.unit.n}${l.module ? ` · ${l.module}` : ""} · ${STATUS[statusOf(l.id)].label}`, st: statusOf(l.id), sc: a }); }
    for (const x of ixs) { const a = Math.min(sc(x.title), sc(x.kind || "") + 1); if (a < 9) out.push({ type: "lab", href: `#/practice/${x.id}`, t: x.title, k: `${PL} · ${x.kind || ""}`, sc: a }); }
    for (const x of ACTIONS()) { const a = Math.min(sc(x.t), x.keys && norm(x.keys).includes(t) ? 3 : 9); if (a < 9) out.push({ ...x, sc: a }); }
    return out.sort((a, b) => a.sc - b.sc);
  };
  // inside the notes: every section heading and key term, so a concept search lands where it's taught (loaded on first use)
  let noteIdx = null;
  const plain = (x) => String(x || "").replace(/\*\*|`|\$|\\\(|\\\)/g, "").trim();
  const notesIndex = () => (noteIdx ||= allNotes().then((all) => {
    const idx = [];
    for (const l of lessons) {
      const N = all[l.id]; if (!N) continue; let k = 0;
      for (const b of N.blocks) if (b.t === "h") { k++; idx.push({ type: "note", href: `#/lesson/${l.id}/co-s${k}`, t: plain(b.x), k: `Section of ${l.title}`, n: norm(plain(b.x)) }); }
      for (const [term] of N.terms || []) idx.push({ type: "note", href: `#/lesson/${l.id}`, t: plain(term), k: `Key term · ${l.title}`, n: norm(plain(term)) });
    }
    return idx;
  }));
  const searchNotes = async (raw) => { const t = norm(raw), idx = await notesIndex(); return idx.filter((x) => x.n.includes(t)).sort((a, b) => (a.n.startsWith(t) ? 0 : 1) - (b.n.startsWith(t) ? 0 : 1)).slice(0, 8); };
  const hitHtml = (h) => `<a href="${h.href || "#"}" ${h.run ? `data-run="${esc(h.t)}"` : ""}>${h.st ? dot(h.st) : ""}<small>${esc(h.k)}</small>${esc(h.t)}</a>`;
  const searchHtml = (raw) => {
    const hits = searchHits(raw).filter((h) => !h.run).slice(0, 10);
    return (hits.length ? hits.map(hitHtml).join("") : `<p>No lessons match.</p>`) + `<button type="button" class="cx-allres" data-pal="${esc(raw)}">${ic("search")} Search inside the notes too <kbd>↵</kbd></button>`;
  };
  // the palette's empty state: carry on, what you looked at last, your bookmarks, and where to go
  const suggestions = () => {
    const cur = resumeLesson(), recent = (S.recent || []).filter((r) => byId[r.id] && r.id !== cur?.id).slice(0, 5), marks = Object.entries(S.marks || {}).filter(([id, t]) => t > 0 && byId[id]).sort((a, b) => b[1] - a[1]).slice(0, 6);
    const L = (l, type, k) => ({ type, href: `#/lesson/${l.id}`, t: l.title, k: k || `${U} ${l.unit.n}${l.module ? ` · ${l.module}` : ""}`, st: statusOf(l.id) });
    return [
      { title: "Continue", items: cur ? [L(cur, "next", `${S.done[cur.id] ? "Review" : "Continue"} · ${U} ${cur.unit.n}: ${cur.unit.title}`)] : [] },
      { title: "Recently viewed", items: recent.map((r) => L(byId[r.id], "recent")) },
      { title: "Bookmarks", items: marks.map(([id]) => L(byId[id], "mark")) },
      { title: "Go to", items: ACTIONS().slice(0, 7) },
    ];
  };
  q.addEventListener("input", () => {
    if (norm(q.value).length < 2) { res.hidden = true; return; }
    res.innerHTML = searchHtml(q.value);
    res.hidden = false;
    placeResults();
  });
  res.addEventListener("click", () => { res.hidden = true; q.value = ""; });
  document.addEventListener("click", (e) => { if (!e.target.closest(".co-search, .co-float")) res.hidden = true; });
  q.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { res.hidden = true; q.blur(); }
    else if (e.key === "Enter" || e.key === "ArrowDown") { e.preventDefault(); const v = q.value; res.hidden = true; q.value = ""; q.blur(); palette.open(v); }
  });
  // the results' last row opens the full search (palette) with the same words; actions run in place
  const runHit = (e) => {
    const b = e.target.closest("[data-pal]"); if (b) { e.preventDefault(); palette.open(b.dataset.pal); return true; }
    return false;
  };
  res.addEventListener("click", runHit, true);
  root.querySelector(".cx-kbd").addEventListener("click", (e) => { e.preventDefault(); palette.open(q.value); });

  function paintHud() {
    const xp = totalXp(), L = levelOf(xp), st = streak(), due = dueCards().length;
    hud.innerHTML = `
      <span class="co-chip ${st.today ? "lit" : ""}" title="Day streak">${ic("flame")}<b>${st.n}</b></span>
      <span class="co-chip" title="Total XP">${ic("bolt")}<b>${xp.toLocaleString()}</b> XP</span>
      <span class="co-chip co-lvl" title="${L.to - xp} XP to level ${L.n + 1}"><b>Lv ${L.n}</b><i style="--p:${((xp - L.from) / (L.to - L.from)) * 100}%"></i></span>`;
    const dueEl = root.querySelector(".co-due"); dueEl.hidden = !due; dueEl.textContent = due;
  }

  // ---------- navigation: the outline, the palette, focus mode and the phone dock (kit/course/navigator.js) ----------
  // the lesson to pick up: the last one opened and not finished, else the next on the learner's path
  // the section to pick a lesson up at (S.pos; older copies kept it on this device only)
  function resumeSec(id) {
    if (S.done[id]) return null;
    if (S.pos?.[id]?.sec) return S.pos[id].sec;
    try { return JSON.parse(localStorage.getItem(`gradify.reading.${cfg.slug}`) || "{}")[id] || null; } catch { return null; }
  }
  // "Continue learning" goes to the exact place: the lesson, at the section you were reading
  const resumeHref = (l) => { const sec = resumeSec(l.id); return `#/lesson/${l.id}${sec ? `/${sec}/resume` : ""}`; };
  function resumeLesson() {
    const r = (S.recent || []).find((x) => byId[x.id] && !S.done[x.id]);
    return r ? byId[r.id] : nextLesson();
  }
  // the lesson on screen, and its notes (for the outline's question and flashcard counts)
  let curLesson = null, curN = null;
  const navGroups = () => {
    const path = S.path && cfg.paths.find((p) => p.id === S.path);
    return path ? [{ name: `Your path: ${path.name}`, list: path.units.map((n) => units.find((u) => u.n === n)).filter(Boolean) }]
      : cfg.tracks.map((t) => ({ name: t.name, list: t.units.map((n) => units.find((u) => u.n === n)).filter(Boolean) }));
  };
  const outline = createOutline({
    units, byId, U, ic, esc, norm, name: cfg.name, status: statusOf, roll: (ids) => roll(ids), groups: navGroups,
    marks: () => S.marks || {}, current: () => curLesson, quiz: (uid) => S.quiz[uid],
    openUnits: () => S.treeOpen || [], setOpen: (id, open) => { S.treeOpen = (S.treeOpen || []).filter((x) => x !== id); if (open) S.treeOpen.push(id); keep(); },
    nQ: (id) => (curLesson?.id === id ? curN?.items?.length || 0 : 0), nCards: (id) => (curLesson?.id === id ? curN?.cards?.length || 0 : 0),
  });
  let redrawTree = null;
  const showTree = (on) => { treeEl.hidden = !on; root.querySelector(".co-body").classList.toggle("has-tree", on); if (on) redrawTree = outline.mount(treeEl); else drawer(false); };
  // below 1280px the outline is a drawer that slides in from the left
  function drawer(open) {
    treeEl.classList.toggle("open", open); scrim.hidden = !open; document.documentElement.classList.toggle("cx-lock", open);
    if (open) { treeEl.hidden = false; if (!treeEl.dataset.wired) redrawTree = outline.mount(treeEl); else redrawTree?.(); treeEl.querySelector(".cx-l.here, summary")?.focus({ preventScroll: true }); }
  }
  scrim.addEventListener("click", () => drawer(false));
  // on a wide screen the outline can be put away to give the lesson more room (remembered); smaller screens use the drawer
  const wideScreen = () => matchMedia("(min-width: 1281px)").matches;
  const setTreeOff = (off) => { root.classList.toggle("cx-treeoff", off); setPref(cfg.slug, "outlineOff", off || null); };
  setTreeOff(Boolean(pref(cfg.slug, "outlineOff")));
  const toggleOutline = () => { if (wideScreen()) setTreeOff(!root.classList.contains("cx-treeoff")); else drawer(!treeEl.classList.contains("open")); };
  root.addEventListener("click", (e) => {
    if (e.target.closest("[data-tree-open]")) { e.preventDefault(); if (wideScreen() && root.classList.contains("cx-treeoff")) setTreeOff(false); else drawer(true); }
    else if (e.target.closest("[data-tree-close]")) { if (treeEl.classList.contains("open")) drawer(false); else if (wideScreen()) setTreeOff(true); }
  });
  treeEl.addEventListener("click", (e) => {
    if (e.target.closest("a[href^='#/']") && treeEl.classList.contains("open")) drawer(false);
    // the outline's Flashcards button opens the lesson's own
    if (e.target.closest("[data-cards]")) main.querySelector("[data-cards]")?.click();
  });
  addEventListener("keydown", (e) => { if (e.key === "Escape" && treeEl.classList.contains("open")) drawer(false); });
  const palette = createPalette({ esc, ic, name: cfg.name, search: searchHits, searchNotes, suggestions, labLabel: PL, hasLabs: ixs.length > 0 });
  // keyboard shortcuts (kit/ui/keys.js): one registry, so ? lists them all and every Gradify page writes them the same
  let curPN = { prev: null, next: null };
  const inLesson = () => Boolean(curLesson && root.dataset.view === "lesson");
  shortcuts([
    { keys: "ArrowLeft", label: "Previous lesson", group: "In a lesson", when: () => inLesson() && Boolean(curPN.prev), run: () => go(`lesson/${curPN.prev.id}`) },
    { keys: "ArrowRight", label: "Next lesson", group: "In a lesson", when: () => inLesson() && Boolean(curPN.next), run: () => go(`lesson/${curPN.next.id}`) },
    { keys: "n", label: "The recommended next step", group: "In a lesson", when: inLesson, run: () => main.querySelector(".gx-switch .gx-res.primary")?.click() },
    { keys: "b", label: "Bookmark the lesson", group: "In a lesson", when: inLesson, run: () => toggleMark(curLesson.id) },
    { keys: "f", label: "Focus mode", group: "In a lesson", when: inLesson, run: () => setFocus(!focusOn()) },
    { keys: "s", label: "Split screen: notes beside questions", group: "In a lesson", when: () => inLesson() && splitFits(), run: () => setSplit(!splitOn()) },
    { keys: "e", label: "Explore related topics", group: "In a lesson", when: inLesson, run: () => relatedTopics() },
    { keys: "r", label: "Revision notes for the lesson", group: "In a lesson", when: () => inLesson() && Boolean(curN), run: () => revisionNotes() },
    { keys: "o", label: "Show or hide the course outline", group: "In a lesson", when: () => !treeEl.hidden, run: toggleOutline },
    { keys: "u", label: `Up to the ${u1}`, group: "In a lesson", when: inLesson, run: () => go(`learn/${curLesson.unit.id}`) },
    { keys: "g h", label: "Course home", group: "Go to", run: () => go("home") },
    { keys: "g s", label: "Syllabus", group: "Go to", run: () => go("learn") },
    { keys: "g r", label: "Revise", group: "Go to", run: () => go("revise") },
    { keys: "g p", label: "Progress", group: "Go to", run: () => go("me") },
    ...(cfg.exams ? [{ keys: "g e", label: "Exams", group: "Go to", run: () => go("exams") }] : []),
    { keys: "g b", label: "Back to where I was", group: "Go to", when: () => Boolean(backPlace({ kinds: null })), run: () => { const p = backPlace({ kinds: null }); if (p) location.hash = p.href; } },
    { keys: "Escape", label: "Close a menu, dialog or the search", group: "General", show: true, when: () => false, run: () => {} },
  ]);
  // focus mode: the site's header, the outline and the rail fold away; the lesson, its progress and its next step stay
  const FK = "gradify.focus";
  const focusOn = () => document.documentElement.classList.contains("cx-focus");
  function setFocus(on) {
    document.documentElement.classList.toggle("cx-focus", on);
    try { localStorage.setItem(FK, on ? "1" : ""); } catch { /* private mode */ }
    document.querySelector(".cx-focusx")?.remove();
    if (on) { const b = Object.assign(document.createElement("button"), { type: "button", className: "cx-focusx", innerHTML: `${ic("expand")}<span>Exit focus</span><kbd>F</kbd>` }); b.addEventListener("click", () => setFocus(false)); document.body.append(b); }
    root.querySelectorAll("[data-focus]").forEach((b) => b.setAttribute("aria-pressed", String(on)));
  }
  // the dock along the bottom of a phone: where to go, or, in a lesson, how to move through it
  function paintDock(view, l, prev, next) {
    const due = dueCards().length;
    const a = (href, icon, t, cur, extra = "") => `<a href="${href}" ${cur ? 'aria-current="page"' : ""} ${extra}>${ic(icon)}<span>${t}</span></a>`;
    dock.innerHTML = view === "lesson" && l
      ? `<button type="button" data-tree-open>${ic("menu")}<span>Outline</span></button>${prev ? a(`#/lesson/${prev.id}`, "left", "Previous") : `<span class="off">${ic("left")}<span>Previous</span></span>`}<button type="button" data-pal-open>${ic("search")}<span>Search</span></button>${next ? a(`#/lesson/${next.id}`, "right", "Next") : `<span class="off">${ic("right")}<span>Next</span></span>`}${a("#/home", "home", "Home")}`
      : `${a("#/home", "home", "Home", view === "home")}${a("#/learn", "book", "Syllabus", ["learn", "quiz"].includes(view))}<button type="button" data-pal-open>${ic("search")}<span>Search</span></button>${a("#/revise", "cards", "Revise", ["revise", "review", "target", "problems"].includes(view), "")}${a("#/me", "chart", "Progress", view === "me")}`;
    if (due) dock.querySelector('a[href="#/revise"]')?.insertAdjacentHTML("beforeend", `<i class="cx-dot">${due > 99 ? "99+" : due}</i>`);
  }
  root.addEventListener("click", (e) => { if (e.target.closest("[data-pal-open]")) { e.preventDefault(); palette.open(); } });
  // bookmarks (S.marks: + time on, − time off, so the latest change wins across devices) and recently viewed lessons
  const marked = (id) => (S.marks?.[id] || 0) > 0;
  // a bookmark changes at once and can be undone (no "are you sure?"); the lesson's own button follows
  function setMark(id, on) { S.marks ||= {}; S.marks[id] = on ? Date.now() : -Date.now(); save(); redrawTree?.(); main.querySelectorAll("[data-mark]").forEach((b) => { b.setAttribute("aria-pressed", String(on)); b.innerHTML = ic(on ? "bookmarked" : "bookmark"); }); }
  function toggleMark(id) {
    const on = !marked(id); setMark(id, on);
    toast(`${on ? "Bookmarked" : "Bookmark removed"}: <b>${esc(byId[id].title)}</b>`, { tone: on ? "ok" : undefined, icon: on ? "bookmarked" : null, key: "mark", undo: () => setMark(id, !on) });
    return on;
  }
  // every course writes its last few lessons to one list on this device, so the Gradify homepage and each subject
  // site can offer "Continue learning" wherever the learner left off (kit/core/continue.js reads it)
  function noteVisit(l) {
    S.recent = [{ id: l.id, t: Date.now() }, ...(S.recent || []).filter((r) => r.id !== l.id)].slice(0, 20); keep();
    shareProgress(l);
  }
  // this course on the Gradify homepage and the subject site's (kit/ui/global-nav.js, kit/core/continue.js): where the
  // learner is, how far through, and the one most useful next step, as an intelligent course card
  function shareProgress(l = curLesson || resumeLesson()) {
    if (!l) return;
    try {
      const K = "gradify.recent", list = JSON.parse(localStorage.getItem(K) || "[]").filter((r) => !(r.slug === cfg.slug && r.site === cfg.site));
      const u = l.unit, r = roll(idsOf(u)), all = roll(lessons.map((x) => x.id)), base = location.pathname;
      const rec = recommendations()[0], nl = resumeLesson();
      const mins = () => { const m = minutesPerLesson(S); return m ? Math.round(m) : null; };   // this learner's own median, once known
      const next = rec ? { label: `${rec.t}. ${rec.d || ""}`.trim(), href: `${base}${rec.href}`, go: rec.cta, mins: rec.href.startsWith("#/target") ? 5 : rec.href.startsWith("#/review") ? 5 : null }
        : nl ? { label: `${S.done[nl.id] ? "Next" : "Carry on with"}: ${nl.title} (${U} ${nl.unit.n}).`, href: `${base}${resumeHref(nl)}`, go: "Continue learning", mins: mins(nl) } : null;
      list.unshift({ site: cfg.site, slug: cfg.slug, course: cfg.name, id: l.id, title: l.title, unit: `${U} ${u.n}: ${u.title}`, href: `${base}${resumeHref(l)}`, t: Date.now(), done: Boolean(S.done[l.id]),
        course_pct: all.coverage, unit_pct: r.coverage, done_n: all.done, total: all.total, status: all.counts.revise ? "revise" : all.coverage >= 1 ? "done" : "started", next });
      localStorage.setItem(K, JSON.stringify(list.slice(0, 12)));
    } catch { /* private mode */ }
  }

  // ---------- the sidebar ----------
  function nextLesson(scope) {
    const pool = scope || (S.path ? cfg.paths.find((p) => p.id === S.path)?.units : null);
    const list = pool ? pool.flatMap((n) => units.find((u) => u.n === n)?.lessons || []) : lessons;
    return list.find((l) => !S.done[l.id]) || null;
  }
  // ---------- missions: today's quests for this course (kit/game/quests.js), paid into the Journey's ledger ----------
  const GAME_KEY = "gradify.game";
  const readGame = () => { try { return JSON.parse(localStorage.getItem(GAME_KEY) || "null") || {}; } catch { return {}; } };
  function missions() {
    try {
      const st = gameState([{ slug: cfg.slug, site: cfg.site, name: cfg.name, units, S, interactives: ixs, exams: cfg.exams, exploration: cfg.exploration || null, levels: cfg.levels || null }], readGame(), { goal: S.goal });
      return quests(st, { graphs: graph ? { [cfg.slug]: graph } : {} });
    } catch { return []; }
  }
  const missionHref = (q) => q.lesson?.lesson ? `#/lesson/${q.lesson.lesson}` : { lessons: `#/lesson/${(resumeLesson() || lessons[0]).id}`, questions: `#/target/${encodeTest({ minutes: 10, scope: Object.keys(S.done).length ? "studied" : "units", units: [units[0].id] })}`, review: "#/review", lab: "#/practice", goal: `#/lesson/${(resumeLesson() || lessons[0]).id}`, mock: "#/exams", module: "#/learn" }[q.id] || "#/learn";
  function missionsHtml(kind = "daily", compact = false) {
    const list = missions().filter((q) => q.kind === kind); if (!list.length) return "";
    const doneN = list.filter((q) => q.done).length;
    return `<div class="cx-quests ${compact ? "compact" : ""}">${list.map((q) => `<div class="cx-q ${q.done ? "done" : ""}">
        <span class="cx-qic">${q.done ? ic("check") : ring(q.n / q.of, 30, 4)}</span>
        <div class="cx-qt"><a href="${missionHref(q)}">${esc(q.title)}</a><small>${q.done ? (q.paid ? "Claimed" : "Done!") : `${q.n} / ${q.of}`}${compact ? "" : ` · ${esc(q.why)}`}</small></div>
        ${q.done && !q.paid ? `<button type="button" class="cx-claim" data-claim="${esc(q.key)}">Claim +${q.xp}</button>` : `<em>+${q.xp} XP</em>`}</div>`).join("")}
      ${compact ? "" : `<p class="co-acct">${doneN} of ${list.length} done. Quest rewards count towards your level on <a href="/journey.html">your Journey</a>.</p>`}</div>`;
  }
  // claiming pays a quest once (its key holds the day), into the same ledger the Journey page syncs to the account
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-claim]"); if (!b || !root.contains(b)) return;
    const q = missions().find((x) => x.key === b.dataset.claim); if (!q?.done) return;
    try { localStorage.setItem(GAME_KEY, JSON.stringify(claim(readGame(), q))); } catch { /* private mode */ }
    confetti(); pop(`+${q.xp} XP`); toast(`${ic("trophy")} Quest complete: <b>${esc(q.title)}</b> · +${q.xp} XP on your Journey`);
    b.outerHTML = `<em class="cx-claimed">${ic("check")} Claimed</em>`;
  });

  function paintSide() {
    paintHud();
    if (!treeEl.hidden && treeEl.dataset.wired) redrawTree?.();
    if (side.hidden) return;
    if (lessonRail) { side.innerHTML = lessonRail(); root.querySelector(".co-lesson")?.dispatchEvent(new Event("co-rail")); return; }
    const xp = totalXp(), L = levelOf(xp), st = streak(), tx = todayXp(), nl = nextLesson(), c = challenge(), cw = Math.min(c.n, c.of(week()));
    const sw = syncText(storeMode), syncWarn = sw?.warn ? sw.text : null;
    const nu = nl ? byId[nl.id].unit : null, left = nu ? nu.lessons.length - unitDone(nu) : 0;
    const goalP = Math.min(1, tx / S.goal), R = 30, C = 2 * Math.PI * R;
    const got = new Set(earned().map((b) => b.id));
    side.innerHTML = `
      <section class="co-card co-me">
        <div class="co-lvbadge"><b>${L.n}</b><small>level</small></div>
        <div><b>${xp.toLocaleString()} XP</b><div class="co-bar"><i style="width:${((xp - L.from) / (L.to - L.from)) * 100}%"></i></div><small>${(L.to - xp).toLocaleString()} XP to level ${L.n + 1}</small></div>
      </section>
      <section class="co-card co-goal">
        <svg viewBox="0 0 76 76" class="co-ring"><circle cx="38" cy="38" r="${R}" class="bg"/><circle cx="38" cy="38" r="${R}" class="fg" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - goalP)}"/></svg>
        <div><span class="co-kicker">Daily goal</span><b>${tx} / ${S.goal} XP</b>
          <small class="co-streak">${ic("flame")} ${st.n}-day streak${st.today ? "" : st.n ? " · learn today to keep it" : ""}${st.rest ? ` · ${st.rest} rest day${st.rest > 1 ? "s" : ""} banked` : ""}</small>
          <select aria-label="Daily goal">${[20, 30, 50, 100].map((g) => `<option value="${g}" ${g === S.goal ? "selected" : ""}>${g} XP a day</option>`).join("")}</select></div>
      </section>
      ${syncWarn ? `<section class="co-card co-syncwarn" role="status"><p>${esc(syncWarn)}</p></section>` : ""}
      ${(() => { const m = missionsHtml("daily", true); return m ? `<section class="co-card"><span class="co-kicker">${ic("target")} Today's missions</span>${m}</section>` : ""; })()}
      ${planHtml()}
      ${nl ? `<section class="co-card"><span class="co-kicker">${ic("flag")} Next milestone</span><h3>Finish ${U} ${nu.n}: ${esc(nu.title)}</h3><p>${left} lesson${left === 1 ? "" : "s"} to go, then the ${u1} quiz for +${XP.quiz} XP.</p><a class="btn btn-light lg btn-sm co-go" href="#/lesson/${nl.id}"><span>Continue: ${esc(nl.title)}</span></a></section>` : `<section class="co-card"><h3>Course complete</h3><p>Every lesson done. Keep your memory fresh in Review.</p></section>`}
      <section class="co-card"><span class="co-kicker">${ic("trophy")} Weekly challenge</span><h3>${c.name}</h3><p>${c.d}. Reward: +${XP.weekly} XP.</p><div class="co-bar warm"><i style="width:${(cw / c.n) * 100}%"></i></div><small>${cw} / ${c.n}${S.weekly[String(weekStart())] ? " · claimed" : ""} · resets Monday</small></section>
      <a class="co-card co-journey" href="/journey.html"><span class="co-kicker">${ic("trophy")} Your journey</span><h3>Quests, achievements and every subject</h3><p>Your level, streak and rewards across all of Gradify.</p></a>
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
    const p = paceFor({ minutesPerLesson: minutesPerLesson(S), examDate, dailyMinutes: prof.daily_minutes, remaining, dueCards: dueCards().length, dueQuestions: revisionQueue(S.attempts || [], { limit: 500 }).length, prior });
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
  // the switch between the syllabus outline and the road, at the top of both
  const viewSwitch = () => `<div class="cx-views" role="group" aria-label="Show the syllabus as"><button type="button" data-lv="next" aria-pressed="${S.learnView === "next"}" title="Just what to do next">${ic("play")} Next up</button><button type="button" data-lv="list" aria-pressed="${!S.learnView || S.learnView === "list"}" title="The complete syllabus">${ic("menu")} Outline</button><button type="button" data-lv="road" aria-pressed="${S.learnView === "road"}">${ic("flag")} Road</button></div>`;
  const wireSwitch = () => main.querySelectorAll("[data-lv]").forEach((b) => b.addEventListener("click", () => { S.learnView = b.dataset.lv; keep(); viewLearn(); }));
  function viewLearn(focus, keep) {
    if (S.learnView === "next" && !focus) return viewNextUp();
    if (S.learnView !== "road") return viewSyllabus(focus);
    const nl = nextLesson(), curUnit = nl ? byId[nl.id].unit : null, path = S.path && cfg.paths.find((p) => p.id === S.path);
    const show = new Set([curUnit?.id, focus, ...S.open].filter((id) => id && !S.closed.includes(id)));
    const unitOrder = path ? path.units.map((n) => units.find((u) => u.n === n)) : units;
    const groups = path ? [{ name: `Your path: ${path.name}`, list: unitOrder }] : cfg.tracks.map((t) => ({ name: t.name, t, list: t.units.map((n) => units.find((u) => u.n === n)).filter(Boolean) }));
    main.innerHTML = `<div class="cx-sylbar">${viewSwitch()}</div>${path ? `<div class="co-pathnote">Following <b>${esc(path.name)}</b>. <button class="co-link" data-unpath>Show the whole course</button></div>` : ""}
      ${groups.map((g) => `<div class="co-track"><span>${esc(g.name)}</span></div>${g.list.map((u) => `<section class="co-unit" id="${u.id}">${banner(u, show.has(u.id))}${show.has(u.id) ? road(u, nl) : ""}</section>`).join("")}`).join("")}`;
    main.querySelectorAll("[data-toggle]").forEach((b) => b.addEventListener("click", () => {
      const id = b.dataset.toggle, open = b.getAttribute("aria-expanded") === "true";
      S.open = S.open.filter((x) => x !== id); S.closed = S.closed.filter((x) => x !== id);
      (open ? S.closed : S.open).push(id); save();
      viewLearn(null, true);
    }));
    main.querySelector("[data-unpath]")?.addEventListener("click", () => { S.path = null; save(); viewLearn(); paintSide(); });
    wireSwitch();
    main.querySelectorAll("[data-chest]").forEach((b) => b.addEventListener("click", () => { S.chests[b.dataset.chest] = Date.now(); save(); confetti(); award(XP.chest, "chest", b.dataset.chest); viewLearn(focus, true); }));
    const target = !keep && main.querySelector(focus ? `#${focus}` : ".co-node.cur");
    if (target) setTimeout(() => target.scrollIntoView({ block: focus ? "start" : "center", behavior: "instant" }), 0);
  }
  // opening a unit from elsewhere shows its path even if it was hidden
  const openUnit = (id) => { S.closed = S.closed.filter((x) => x !== id); if (!(S.treeOpen || []).includes(id)) (S.treeOpen ||= []).push(id); save(); };

  // ---------- Syllabus: the whole course as a numbered outline (stage → unit → module → lesson) ----------
  const FILTERS = [["all", "All"], ["started", "In progress"], ["revise", "Needs revision"], ["new", "Not started"], ["mastered", "Mastered"]];
  const blurb = (u) => cfg.blurbs?.[u.n] || "";
  function unitCardBody(u) {
    const f = S.sylFilter || "all", want = (id) => f === "all" || statusOf(id) === f;
    const r = roll(idsOf(u)), nl = u.lessons.find((l) => !S.done[l.id]), qz = S.quiz[u.id];
    const mods = groupsOf(u).map((g, mi) => {
      const ls = g.lessons.filter((l) => want(l.id)); if (!ls.length) return "";
      const gr = roll(g.lessons.map((l) => l.id));
      return `<div class="cx-mrow"><h4>${g.title ? `<span class="cx-n">${u.n}.${mi + 1}</span>${esc(g.title)}` : `Lessons`}<small>${gr.done}/${gr.total}${gr.mastery != null ? ` · ${pc(gr.mastery)} right` : ""}</small></h4>
        <ol class="cx-lgrid">${ls.map((l) => { const st = statusOf(l.id); return `<li><a class="cx-lp s-${st}${l.id === resumeLesson()?.id ? " next" : ""}" href="#/lesson/${l.id}">${dot(st)}<span class="cx-lpt">${esc(l.title)}</span>${marked(l.id) ? `<b class="cx-mk" aria-label="Bookmarked">${ic("star")}</b>` : ""}<em>${STATUS[st].label}</em></a></li>`; }).join("")}</ol></div>`;
    }).join("");
    return `${mods || `<p class="co-empty">No lessons in this ${u1} match that filter.</p>`}
      <div class="cx-uacts">${nl ? `<a class="btn btn-light lg btn-sm" href="#/lesson/${nl.id}"><span>${r.done ? "Continue" : "Start"}: ${esc(nl.title)}</span></a>` : ""}
        <a class="btn btn-ghost lg btn-sm" href="#/quiz/${u.id}"><span>${ic("trophy")} ${U} quiz${qz ? ` · best ${pc(qz.best)}` : ""}</span></a>
        ${r.done ? `<a class="btn btn-ghost lg btn-sm" href="#/target/${encodeTest({ minutes: 10, scope: "units", units: [u.id] })}"><span>${ic("target")} Target test</span></a>` : ""}</div>`;
  }
  // the syllabus, simplified to what this learner needs to do next: continue, then the next few lessons, what needs
  // revision, units ready to lock in with their quiz, and cards due. Outline shows everything.
  function viewNextUp() {
    const nl = resumeLesson(), after = nl ? lessons.slice(lessons.indexOf(nl) + 1).filter((l) => !S.done[l.id]).slice(0, 5) : [];
    const revise = lessons.filter((l) => statusOf(l.id) === "revise").slice(0, 8), ready = units.filter((u) => unitDone(u) === u.lessons.length && !S.quiz[u.id]?.pass), due = dueCards().length;
    const row = (l, sub) => `<a class="cx-ll" href="${S.done[l.id] ? `#/lesson/${l.id}` : resumeHref(l)}">${dot(statusOf(l.id))}<span><b>${esc(l.title)}</b><small>${sub || `${U} ${l.unit.n}: ${esc(l.unit.title)}${l.module ? ` · ${esc(l.module)}` : ""}`}</small></span></a>`;
    const block = (icon, title, sub, body) => `<section class="cx-panel cx-nextup"><div class="cx-sech"><h3>${ic(icon)} ${title}</h3>${sub ? `<p>${sub}</p>` : ""}</div>${body}</section>`;
    const parts = [
      nl ? block("play", "Continue", "", row(nl, `${U} ${nl.unit.n} · lesson ${nl.i + 1} of ${nl.unit.lessons.length}${S.time?.[nl.id]?.depth > 0.05 ? ` · ${pc(S.time[nl.id].depth)} read` : ""}`)) : "",
      revise.length ? block("target", "Needs revision", "Your latest answers here were under 60%.", `${revise.map((l) => row(l)).join("")}<p class="co-row"><a class="btn btn-light lg btn-sm" href="#/target/${encodeTest({ minutes: 10, scope: "lessons", lessons: revise.map((l) => l.id) })}"><span>${ic("bolt")} 10-minute target test on these</span></a></p>`) : "",
      ready.length ? block("trophy", "Ready to lock in", `Every lesson done: take the ${u1} quiz.`, ready.slice(0, 4).map((u) => `<a class="cx-ll" href="#/quiz/${u.id}">${ic("trophy")}<span><b>${U} ${u.n} quiz: ${esc(u.title)}</b><small>+${XP.quiz} XP</small></span></a>`).join("")) : "",
      due ? block("cards", `${due} flashcard${due === 1 ? "" : "s"} due`, "A few minutes now saves relearning later.", `<p class="co-row"><a class="btn btn-ghost lg btn-sm" href="#/review"><span>Review now</span></a></p>`) : "",
      after.length ? block("flag", "Then", "", after.map((l) => row(l)).join("")) : "",
    ].filter(Boolean);
    main.innerHTML = `<div class="cx-sylbar">${viewSwitch()}</div>${parts.length ? `<div class="cx-nextgrid">${parts.join("")}</div>` : emptyState({ icon: "check", title: "Nothing left to do", body: "Every lesson is complete and nothing needs revision. Push your mastery with a target test, or browse the whole syllabus.", actions: [{ label: "Target test", href: `#/target/${encodeTest({ minutes: 10, scope: "studied" })}`, primary: true }] })}`;
    wireSwitch();
  }
  function viewSyllabus(focus) {
    const path = S.path && cfg.paths.find((p) => p.id === S.path), all = roll(lessons.map((l) => l.id)), f = S.sylFilter || "all", cur = resumeLesson();
    const open = new Set([cur?.unit.id, focus, ...(S.treeOpen || [])].filter(Boolean));
    const unitHasMatch = (u) => f === "all" || u.lessons.some((l) => statusOf(l.id) === f);
    main.innerHTML = `<header class="cx-sylhead">
        <div><span class="co-kicker">Syllabus</span><h2>${esc(cfg.name)}</h2><p>${units.length} ${u1}s · ${lessons.length.toLocaleString()} lessons, in the order to learn them. Open a ${u1} to see its modules and lessons; every lesson shows where you stand.</p></div>
        <div class="cx-sylstats">${ring(all.coverage, 64, 7)}<div><b>${pc(all.coverage)}</b><small>complete</small></div><div><b>${all.counts.mastered}</b><small>mastered</small></div><div class="${all.counts.revise ? "warn" : ""}"><b>${all.counts.revise}</b><small>to revise</small></div></div>
      </header>
      <div class="cx-sylbar">${viewSwitch()}<div class="cx-chips" role="group" aria-label="Show lessons">${FILTERS.map(([k, t]) => `<button type="button" data-sf="${k}" aria-pressed="${f === k}">${k === "all" ? "" : dot(k)}${t}${k === "all" ? "" : ` <small>${all.counts[k]}</small>`}</button>`).join("")}</div>
        <button type="button" class="gx-link cx-sylall" data-sylall>${units.every((u) => open.has(u.id)) ? "Collapse all" : "Expand all"}</button>
        <details class="cx-legend"><summary>Key</summary><ul>${STATUSES.map((x) => `<li>${dot(x.key)}<b>${x.label}</b> ${esc(x.what)}</li>`).join("")}</ul></details></div>
      ${path ? `<div class="co-pathnote">Following <b>${esc(path.name)}</b>. <button class="co-link" data-unpath>Show the whole course</button></div>` : ""}
      ${navGroups().map((g) => { const us = g.list.filter(unitHasMatch); if (!us.length) return ""; const gr = roll(g.list.flatMap(idsOf)); const t = g.list[0] && trackOf(g.list[0]);
        return `<section class="cx-stage" style="--a:${t?.from};--b:${t?.to}"><header><h3>${esc(g.name)}</h3><span>${pc(gr.coverage)} · ${gr.done}/${gr.total} lessons</span><div class="co-bar"><i style="width:${gr.coverage * 100}%"></i></div></header>
          ${us.map((u) => { const r = roll(idsOf(u)), t2 = trackOf(u), isOpen = open.has(u.id) || f !== "all", w = isWritten(u);
            return `<details class="cx-ucard s-${r.status}" id="${u.id}" data-u="${u.id}" ${isOpen ? "open" : ""} style="--a:${t2.from};--b:${t2.to}"><summary>
              <span class="cx-ubadge">${u.n}</span>
              <div class="cx-uinfo"><h3>${esc(u.title)}</h3>${blurb(u) ? `<p>${esc(blurb(u))}</p>` : ""}<small>${groupsOf(u).filter((x) => x.title).length ? `${groupsOf(u).filter((x) => x.title).length} modules · ` : ""}${u.lessons.length} lessons${r.done ? ` · ${r.done} done` : ""}${r.counts.mastered ? ` · ${r.counts.mastered} mastered` : ""}${S.quiz[u.id]?.pass ? ` · quiz ${pc(S.quiz[u.id].best)}` : ""}${!w ? " · being written" : isDraft(u) ? " · draft" : ""}</small></div>
              <div class="cx-uprog">${stack(r)}<b>${pc(r.coverage)}</b></div><span class="cx-chev" aria-hidden="true">${ic("right")}</span></summary>
              ${isOpen ? `<div class="cx-ucontent">${unitCardBody(u)}</div>` : ""}</details>`; }).join("")}</section>`; }).join("") || `${emptyState({ icon: "flag", title: `No lessons are “${FILTERS.find(([k]) => k === f)?.[1] || f}” yet`, body: f === "revise" ? "Nothing needs revision: your latest answers are holding up." : f === "mastered" ? "Mastered comes from getting a lesson's questions right across several answers." : "Try another filter, or see every lesson." })}<p class="co-row" style="justify-content:center"><button type="button" class="btn btn-light lg btn-sm" data-sf="all"><span>Show every lesson</span></button></p>`}`;
    main.querySelectorAll("[data-sf]").forEach((b) => b.addEventListener("click", () => { S.sylFilter = b.dataset.sf; keep(); viewSyllabus(); }));
    // expand or collapse every unit at once (remembered, like opening them one by one)
    main.querySelector("[data-sylall]")?.addEventListener("click", () => { const all = units.every((u) => open.has(u.id)); S.treeOpen = all ? (cur ? [cur.unit.id] : []) : units.map((u) => u.id); keep(); viewSyllabus(); });
    main.querySelector("[data-unpath]")?.addEventListener("click", () => { S.path = null; save(); viewLearn(); paintSide(); });
    main.addEventListener("toggle", (e) => {
      const d = e.target.closest?.(".cx-ucard"); if (!d || !main.contains(d)) return;
      if ((S.sylFilter || "all") === "all") { S.treeOpen = (S.treeOpen || []).filter((x) => x !== d.dataset.u); if (d.open) S.treeOpen.push(d.dataset.u); keep(); }
      if (d.open && !d.querySelector(".cx-ucontent")) d.insertAdjacentHTML("beforeend", `<div class="cx-ucontent">${unitCardBody(units.find((u) => u.id === d.dataset.u))}</div>`);
    }, true);
    wireSwitch();
    const target = focus && document.getElementById(focus);
    if (target) setTimeout(() => scrollTo({ top: target.getBoundingClientRect().top + scrollY - 90, behavior: "instant" }), 0);
  }

  // ---------- Home: the launchpad. Where am I? What needs work? What should I do next? ----------
  function recommendations() {
    const out = [], w = weakTargets(), due = dueCards().length, rq = revisionQueue(S.attempts || [], { limit: 200 }).length;
    if (w[0] && byId[w[0].lesson]) out.push({ icon: "target", tone: "warn", t: `Shore up ${byId[w[0].lesson].title}`, d: w[0].why, href: `#/target/${encodeTest({ minutes: 5, scope: "lessons", lessons: w.slice(0, 3).map((x) => x.lesson).filter((id) => byId[id]) })}`, cta: "5-minute target test", alt: [`#/lesson/${w[0].lesson}`, "Reread the lesson"] });
    if (due) out.push({ icon: "cards", t: `${due} flashcard${due === 1 ? "" : "s"} due`, d: "Cards come back just before you'd forget them. A few minutes now saves relearning later.", href: "#/review", cta: "Review now" });
    if (rq) out.push({ icon: "clock", t: `${rq} question${rq === 1 ? "" : "s"} to bring back`, d: "Ones you got wrong, and ones you got right a while ago. Recalling them now makes them last.", href: "#/review/questions", cta: "Revisit" });
    const ready = units.find((u) => unitDone(u) === u.lessons.length && !S.quiz[u.id]?.pass);
    if (ready) out.push({ icon: "trophy", tone: "good", t: `Take the ${U} ${ready.n} quiz`, d: `You've finished every lesson in ${ready.title}. Lock it in for +${XP.quiz} XP.`, href: `#/quiz/${ready.id}`, cta: "Start the quiz" });
    for (const u of units) { const items = pathItems(u).filter((x) => x.kind === "chest"); const c = items.find((x) => x.after.every((l) => S.done[l.id]) && !S.chests[x.id]); if (c) { out.push({ icon: "chest", tone: "good", t: "A reward chest is ready", d: `On the road in ${U} ${u.n}. Open it for +${XP.chest} XP.`, href: `#/learn/${u.id}`, cta: "Open it", pre: () => { S.learnView = "road"; keep(); } }); break; } }
    const nu = resumeLesson()?.unit; if (nu) { const left = nu.lessons.length - unitDone(nu); if (left > 0 && left <= 3) out.push({ icon: "flag", t: `${left} lesson${left === 1 ? "" : "s"} to finish ${U} ${nu.n}`, d: `${nu.title} is nearly done.`, href: `#/lesson/${resumeLesson().id}`, cta: "Keep going" }); }
    const recent = (S.attempts || []).filter((a) => Date.now() - Date.parse(a.at) < 7 * DAY && a.question?.type !== "card");
    if (recent.length >= 12 && recent.filter((a) => a.score >= 0.7).length / recent.length >= 0.85) out.push({ icon: "sparkles", tone: "good", t: "Ready for a stretch", d: `${pc(recent.filter((a) => a.score >= 0.7).length / recent.length)} right this week. Try harder, applied questions.`, href: `#/target/${encodeTest({ minutes: 10, focus: "application", scope: "studied" })}`, cta: "Application test" });
    return out.slice(0, 4);
  }
  // how long have you got? four sessions, each resolved to one concrete thing to do now
  function sessions() {
    const nl = resumeLesson(), studied = Object.keys(S.done).length, w = weakTargets().length, due = dueCards().length;
    const ready = [...units].reverse().find((u) => unitDone(u) === u.lessons.length && !S.quiz[u.id]?.pass);
    return [
      { t: "Quick", m: "5–10 min", icon: "bolt", d: due ? `${Math.min(due, 20)} flashcards, then a 5-question check` : studied ? "A 5-question check on what you've studied" : "Your first lesson", href: due ? "#/review" : studied ? `#/target/${encodeTest({ minutes: 5, scope: "studied", focus: "recall" })}` : nl ? `#/lesson/${nl.id}` : "#/learn" },
      { t: "Learn", m: "15–20 min", icon: "book", d: nl ? `${S.done[nl.id] ? "Review" : "Next"}: ${nl.title}` : "Every lesson is done. Explore the syllabus.", href: nl ? `#/lesson/${nl.id}` : "#/learn" },
      { t: "Improve", m: "20–30 min", icon: "target", d: w ? `A target test on your ${w} weakest lesson${w === 1 ? "" : "s"}` : studied ? "A target test across everything you've studied" : "Unlocks after your first lesson", href: w ? `#/target/${encodeTest({ minutes: 20, scope: "weak" })}` : studied ? `#/target/${encodeTest({ minutes: 20, scope: "studied" })}` : null },
      { t: "Challenge", m: "30–45 min", icon: "trophy", d: ready ? `The ${U} ${ready.n} quiz: ${ready.title}` : cfg.exams?.length && studied >= 10 ? "A timed mock exam" : studied ? "A 30-minute application test" : "Unlocks after your first lesson", href: ready ? `#/quiz/${ready.id}` : cfg.exams?.length && studied >= 10 ? "#/exams" : studied ? `#/target/${encodeTest({ minutes: 30, scope: "studied", focus: "application" })}` : null },
    ];
  }
  function viewHome() {
    const st = stats(), xp = st.xp, L = levelOf(xp), sk = streak(), tx = todayXp(), all = roll(lessons.map((l) => l.id));
    const nl = resumeLesson(), started = st.lessons > 0 || (S.recent || []).length > 0, t0 = nl ? trackOf(nl.unit) : cfg.tracks[0];
    const g = nl && groupsOf(nl.unit).find((x) => x.lessons.some((l) => l.id === nl.id)), gi = g ? groupsOf(nl.unit).indexOf(g) : 0;
    const depth = nl ? S.time?.[nl.id]?.depth || 0 : 0, upnext = nl ? lessons.slice(lessons.indexOf(nl) + 1).filter((l) => !S.done[l.id]).slice(0, 3) : [];
    const { weak, strong } = strengths(sigs()), recs = recommendations(), recent = (S.recent || []).filter((r) => byId[r.id]).slice(0, 6), marks = Object.entries(S.marks || {}).filter(([id, t]) => t > 0 && byId[id]).sort((a, b) => b[1] - a[1]).slice(0, 6);
    const lessonLink = (l, sub) => `<a class="cx-ll" href="#/lesson/${l.id}">${dot(statusOf(l.id))}<span><b>${esc(l.title)}</b><small>${sub || `${U} ${l.unit.n}${l.module ? ` · ${esc(l.module)}` : ""}`}</small></span></a>`;
    const bar = (m) => `<span class="cx-mbar"><i style="width:${Math.round(m * 100)}%" class="${m >= 0.85 ? "hi" : m < 0.6 ? "lo" : ""}"></i></span>`;
    const hello = (() => { const h = new Date().getHours(); return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening"; })();
    main.innerHTML = `<section class="cx-hero" style="--a:${t0.from};--b:${t0.to}">
        <div class="cx-herol">
          <span class="co-kicker">${started ? `${hello} · pick up where you left off` : `Welcome to ${esc(cfg.name)}`}</span>
          ${nl ? `<p class="cx-path"><a href="#/learn/${nl.unit.id}">${U} ${nl.unit.n} · ${esc(nl.unit.title)}</a>${g?.title ? `<span>›</span><span>${nl.unit.n}.${gi + 1} ${esc(g.title)}</span>` : ""}</p>
          <h2>${esc(nl.title)}</h2>
          <p class="cx-herometa">Lesson ${nl.i + 1} of ${nl.unit.lessons.length} · ${STATUS[statusOf(nl.id)].label}${depth > 0.05 && !S.done[nl.id] ? ` · ${pc(depth)} read` : ""}</p>
          <div class="cx-heroprog"><i style="width:${Math.round(roll(idsOf(nl.unit)).coverage * 100)}%"></i></div><small class="cx-herounit">${U} ${nl.unit.n}: ${unitDone(nl.unit)} of ${nl.unit.lessons.length} lessons done</small>
          <div class="co-row"><a class="btn btn-light lg" href="${resumeHref(nl)}" data-autofocus><span>${ic("play")} ${started ? "Continue learning" : "Start the first lesson"}</span></a><a class="btn btn-ghost lg" href="#/learn/${nl.unit.id}"><span>See it in the syllabus</span></a></div>
          ${upnext.length ? `<div class="cx-upnext"><span class="co-kicker">Then</span>${upnext.map((l) => `<a href="#/lesson/${l.id}">${dot(statusOf(l.id))}${esc(l.title)}</a>`).join("")}</div>` : ""}`
          : `<h2>Course complete</h2><p class="cx-herometa">Every lesson is done. Keep it fresh with Revise, and push your mastery with target tests.</p><div class="co-row"><a class="btn btn-light lg" href="#/revise"><span>Revise</span></a></div>`}
        </div>
        <div class="cx-heror">
          <div class="cx-habit"><div class="co-lvbadge"><b>${L.n}</b><small>level</small></div><div><b>${xp.toLocaleString()} XP</b><div class="co-bar"><i style="width:${((xp - L.from) / (L.to - L.from)) * 100}%"></i></div><small>${(L.to - xp).toLocaleString()} XP to level ${L.n + 1}</small></div></div>
          <div class="cx-habit">${ring(Math.min(1, tx / S.goal), 58, 7, "goal")}<div><b>${tx} / ${S.goal} XP</b><small>${tx >= S.goal ? "Daily goal reached" : "today's goal"}</small></div></div>
          <div class="cx-habit"><span class="cx-flame ${sk.today ? "lit" : ""}">${ic("flame")}<b>${sk.n}</b></span><div><b>${sk.n}-day streak</b><small>${sk.today ? "Kept today" : sk.n ? "Learn today to keep it" : "Start one today"}${sk.rest ? ` · ${sk.rest} rest day${sk.rest > 1 ? "s" : ""} banked` : ""}</small></div></div>
        </div>
      </section>
      <section class="cx-sec"><div class="cx-sech"><h3>How long have you got?</h3><p>Pick a session and Gradify chooses the most useful thing to do with it.</p></div>
        <div class="cx-sessions">${sessions().map((x) => x.href ? `<a class="cx-sess" href="${x.href}"><span class="cx-sessi">${ic(x.icon)}</span><b>${x.t}</b><em>${x.m}</em><small>${esc(x.d)}</small></a>` : `<div class="cx-sess off"><span class="cx-sessi">${ic(x.icon)}</span><b>${x.t}</b><em>${x.m}</em><small>${esc(x.d)}</small></div>`).join("")}</div></section>
      <div class="cx-cols">
        <div class="cx-col">
          <section class="cx-panel"><div class="cx-sech"><h3>${ic("sparkles")} Recommended for you</h3></div>
            ${recs.length ? `<ul class="cx-recs">${recs.map((r, i) => `<li class="${r.tone || ""}"><span class="cx-reci">${ic(r.icon)}</span><div><b>${esc(r.t)}</b><p>${esc(r.d)}</p><div class="co-row"><a class="btn btn-light lg btn-sm" href="${r.href}" data-rec="${i}"><span>${esc(r.cta)}</span></a>${r.alt ? `<a class="btn btn-ghost lg btn-sm" href="${r.alt[0]}"><span>${esc(r.alt[1])}</span></a>` : ""}</div></div></li>`).join("")}</ul>`
              : `<p class="co-empty">${started ? "Nothing urgent. Carry on with your next lesson; recommendations appear as your answers show what needs work." : "Recommendations appear once you've done a lesson and answered its questions. They come from your own answers, never guesses."}</p>`}</section>
          <section class="cx-panel"><div class="cx-sech"><h3>${ic("chart")} Strengths and weaknesses</h3><a href="#/me">Full picture →</a></div>
            ${weak.length || strong.length ? `<div class="cx-sw"><div><span class="co-kicker">Needs work</span>${weak.length ? `<ul>${weak.slice(0, 4).filter((w2) => byId[w2.id]).map((w2) => `<li><a href="#/lesson/${w2.id}">${esc(byId[w2.id].title)}</a>${bar(w2.latestMean)}<small>${pc(w2.latestMean)} · ${w2.questions} question${w2.questions === 1 ? "" : "s"}</small></li>`).join("")}</ul><a class="btn btn-ghost btn-sm" href="#/target/${encodeTest({ minutes: 10, scope: "weak" })}"><span>${ic("target")} Practise these</span></a>` : `<p class="co-empty">Nothing measured as weak. Good.</p>`}</div>
              <div><span class="co-kicker">Strong</span>${strong.length ? `<ul>${strong.slice(0, 4).filter((w2) => byId[w2.id]).map((w2) => `<li><a href="#/lesson/${w2.id}">${esc(byId[w2.id].title)}</a>${bar(w2.latestMean)}<small>${pc(w2.latestMean)} · ${w2.questions} questions</small></li>`).join("")}</ul>` : `<p class="co-empty">Mastery shows here once you're right across three or more questions on a lesson.</p>`}</div></div>`
              : `<p class="co-empty">Answer the check questions in your lessons and Gradify works out, topic by topic, what you know and what needs another look.</p>`}</section>
        </div>
        <div class="cx-col">
          ${(() => { const tq = missions().filter((q) => q.kind === "topic"); if (!tq.length) return ""; const cur = tq.filter((q) => !q.earlier), q0 = tq[0].quest, got = cur.filter((q) => q.done).length;
            return `<section class="cx-panel cx-tquest"><div class="cx-sech"><h3>${ic("flag")} Today's topic quest</h3><span class="cx-tqxp">${got} / ${cur.length} · +${q0.xp} XP</span></div><p class="cx-tqname"><b>${esc(q0.topic)}</b> Understand it, remember it, apply it: each step pays only for learning.</p>${missionsHtml("topic", true)}</section>`; })()}
          <section class="cx-panel"><div class="cx-sech"><h3>${ic("target")} Today's missions</h3><a href="/journey.html">Journey →</a></div>${missionsHtml("daily") || `<p class="co-empty">Missions appear once you've started.</p>`}</section>
          <section class="cx-panel"><div class="cx-sech"><h3>${ic("book")} Your course</h3><a href="#/learn">Syllabus →</a></div>
            <div class="cx-course">${ring(all.coverage, 84, 9)}<div><b>${pc(all.coverage)}</b><small>of the course complete</small></div>
              <dl>${[["mastered", "Mastered"], ["practised", "Practised"], ["revise", "Needs revision"]].map(([k, t]) => `<div>${dot(k)}<dt>${t}</dt><dd>${all.counts[k]}</dd></div>`).join("")}<div><i class="cx-st s-learned"></i><dt>Measured accuracy</dt><dd>${all.mastery == null ? "–" : pc(all.mastery)}</dd></div></dl></div>
            <div class="cx-stages">${navGroups().map((gp) => { const r = roll(gp.list.flatMap(idsOf)), t = gp.list[0] && trackOf(gp.list[0]); return `<a href="#/learn/${gp.list[0]?.id || ""}" style="--a:${t?.from};--b:${t?.to}"><span>${esc(gp.name)}</span>${stack(r)}<small>${pc(r.coverage)}</small></a>`; }).join("")}</div></section>
        </div>
      </div>
      ${recent.length || marks.length ? `<div class="cx-cols">
        ${recent.length ? `<section class="cx-panel"><div class="cx-sech"><h3>${ic("clock")} Recently viewed</h3></div><div class="cx-lls">${recent.map((r) => lessonLink(byId[r.id], `${U} ${byId[r.id].unit.n} · ${ago(r.t)}`)).join("")}</div></section>` : ""}
        ${marks.length ? `<section class="cx-panel"><div class="cx-sech"><h3>${ic("bookmarked")} Bookmarks</h3></div><div class="cx-lls">${marks.map(([id]) => lessonLink(byId[id])).join("")}</div></section>` : ""}</div>` : ""}
      <p class="cx-tip">${ic("search")} Press <kbd>/</kbd> or <kbd>${isMac ? "⌘" : "Ctrl"} K</kbd> anywhere in the course to jump to any lesson, topic or key term.</p>`;
    main.querySelectorAll("[data-rec]").forEach((a) => a.addEventListener("click", () => recs[a.dataset.rec].pre?.()));
  }
  const ago = (t) => { const m = Math.round((Date.now() - t) / 6e4); return m < 2 ? "just now" : m < 60 ? `${m} min ago` : m < 1440 ? `${Math.round(m / 60)} h ago` : `${Math.round(m / 1440)} d ago`; };

  // ---------- a lesson ----------
  // "Builds on": the modules this lesson's module needs, linked to their first lesson, with any the learner's own
  // answers show to be weak marked (only measured weaknesses; no evidence means no mark)
  function masteryOfLessons(ids) {
    const set = new Set(ids), ev = evidenceFromAttempts((S.attempts || []).filter((a) => set.has(a.lesson)), { levels: cfg.levels || null });
    return ev.length ? sixProfiles(ev).all.mastery : null;
  }
  function buildsOnHtml(id) {
    if (!graph) return "";
    const { modules } = prerequisitesOfLesson(graph, id); if (!modules.length) return "";
    const weak = new Map(weakPrerequisites(graph, id, masteryOfLessons, { maxDepth: 1 }).map((w) => [w.key, w.mastery]));
    const items = modules.map((k) => graph.nodes.get(k)).sort((a, b) => a.order - b.order).map((n) => {
      const unit = units.find((x) => x.id === n.unit), m = weak.get(n.key), here = byId[id].unit.id === n.unit;
      return `<a href="#/lesson/${n.lessons[0]}" class="${m != null ? "weak" : ""}" title="${esc(`${U} ${unit.n}: ${unit.title}`)}">${esc(n.module || unit.title)}${here ? "" : ` <i>${U} ${unit.n}</i>`}${m != null ? ` <b>${Math.round(100 * m)}% · review first</b>` : ""}</a>`;
    });
    return `<p class="co-builds"><span>Builds on</span> ${items.join("")}</p>`;
  }
  // the five mind maps (kit/maps): this lesson's id, a kicker for the viewer, and lab names from this course
  // the lesson's notes with its glass diagrams beside the parts they show (kit/core/glass-diagrams.js)
  // five per lesson (kit/core/glass-diagrams.js), each beside the part it shows, full width so their words stay readable;
  // the ones that sum the lesson up (terms, summary, comparisons, case and drug cards, recall) open its Recap
  const RECAP_KINDS = new Set(["terms", "summary", "compare", "case", "drug", "evidence", "recall"]);
  const recapDiagrams = (N) => diagramsFor(N).filter((d) => RECAP_KINDS.has(d.kind));
  const lessonDiagrams = (N) => {
    const at = new Map(); for (const d of diagramsFor(N)) if (!RECAP_KINDS.has(d.kind)) at.set(d.at, [...(at.get(d.at) || []), d]);
    return lessonHtml(N, { after: (i) => (at.get(i) || []).map((d) => glassDiagram(d)).join("") });
  };
  const mapOpts = (l) => ({ id: `${cfg.slug}:${l.id}`, kicker: `${cfg.name || cfg.site} · ${l.title}`, site: cfg.site, store, labTitle: (x) => ixs.find((i) => i.id === x)?.title || x });
  // ---------- reading a lesson: the rail beside it ("On this page"), reading progress and the question count ----------
  let lessonRail = null, readStop = null;
  function railHtml(l, N, nQ, mins, ctx = {}) {
    const heads = N ? N.blocks.filter((b) => b.t === "h").map((b, k) => [`co-s${k + 1}`, b.x]) : [];
    const links = [
      ...(N && (N.objectives.length || N.prereq.length) ? [["co-top", "Before you start"]] : []),
      ...heads,
      ...(main.querySelector("#co-recap") ? [["co-recap", "Recap"]] : []),
      ...(nQ ? [["co-check", `Check yourself (${nQ})`]] : []),
      ...(main.querySelector(".co-trylab") ? [["co-trylab", "Try it yourself"]] : []),
      ...(N ? [["co-deeper", "Go deeper"]] : []),
      ...(main.querySelector("#co-refs") ? [["co-refs", "Sources"]] : []),
    ];
    const R = 22, C = 2 * Math.PI * R;
    const { u, g, nextL, quizNext } = ctx;
    // the rail is a stack of widgets (kit/styles/course.css, "Liquid Glass lesson"): where you are on the page, your
    // steps in this lesson, the topic it belongs to, and what comes next
    const topic = g?.lessons?.length > 1 ? (() => {
      const done = g.lessons.filter((x) => S.done[x.id]).length;
      return `<section class="cx-widget cx-w-topic" aria-label="This topic">
        <span class="co-kicker">This topic</span><b class="cx-w-title">${esc(g.title || u?.title || "")}</b>
        <ol class="cx-w-dots">${g.lessons.map((x) => `<li><a href="#/lesson/${x.id}" class="${S.done[x.id] ? "done" : ""} ${x.id === l.id ? "here" : ""}" title="${esc(x.title)}" aria-label="${esc(x.title)}${S.done[x.id] ? " (done)" : ""}${x.id === l.id ? " (this lesson)" : ""}"></a></li>`).join("")}</ol>
        <small>${done} of ${g.lessons.length} lessons done</small></section>`;
    })() : "";
    const upNext = quizNext && u ? `<a class="cx-widget cx-w-next" href="#/quiz/${u.id}"><span class="co-kicker">Up next</span><b class="cx-w-title">The ${esc(U)} ${u.n} quiz</b><small>Lock in ${esc(u.title)}</small><span class="cx-w-go" aria-hidden="true">${ic("right")}</span></a>`
      : nextL ? `<a class="cx-widget cx-w-next" href="#/lesson/${nextL.id}"><span class="co-kicker">Up next</span><b class="cx-w-title">${esc(nextL.title)}</b><small>${esc(nextL.module || `${U} ${nextL.unit?.n}`)}</small><span class="cx-w-go" aria-hidden="true">${ic("right")}</span></a>` : "";
    return `<div class="co-rail cx-widgets">
      ${!links.length ? "" : `<section class="cx-widget cx-w-page" aria-label="On this page"><div class="co-railtop"><svg viewBox="0 0 56 56" class="co-ring sm" aria-hidden="true"><circle cx="28" cy="28" r="${R}" class="bg"/><circle cx="28" cy="28" r="${R}" class="fg" stroke-dasharray="${C}" stroke-dashoffset="${C}" data-c="${C}"/></svg>
        <div><span class="co-kicker">On this page</span><b class="co-readpct">0% read</b>${mins ? `<small>About ${mins} min</small>` : ""}</div></div>
      <ol class="co-toc">${links.map(([href, t]) => `<li><a href="#${href}" data-jump="${href}">${inline(t)}</a></li>`).join("")}</ol></section>`}
      <section class="cx-widget cx-w-steps" aria-label="Your steps">
        ${nQ ? `<p class="co-railq"><span class="co-checkn"></span></p>` : ""}
        ${loopHtml(l, N, nQ)}
        <button class="btn btn-light lg btn-sm co-railgo" ${S.done[l.id] ? "disabled" : ""}><span>${S.done[l.id] ? "Completed ✓" : `Complete · +${XP.lesson} XP`}</span></button>
      </section>
      ${topic}
      ${upNext}
    </div>`;
  }
  // the learning loop for one lesson: read it, check yourself, recall it with the flashcards, complete it. Each step
  // lights up as it happens (reading from scroll depth, checking from right answers, recall from going through the cards)
  const loop = { read: false, check: false, recall: false };
  function loopHtml(l, N, nQ) {
    const steps = [["read", "Read", "book", true], ["check", "Check", "target", nQ > 0], ["recall", "Recall", "cards", (N?.cards?.length || 0) > 0], ["done", "Complete", "check", true]].filter((x) => x[3]);
    const on = (k) => (k === "done" ? Boolean(S.done[l.id]) : k === "recall" ? Boolean(loop.recall || S.recalled?.[l.id]) : loop[k]);
    return `<div class="cx-loop" aria-label="Your steps in this lesson">${steps.map(([k, t, icon]) => `<span class="cx-step ${on(k) ? "on" : ""}" data-step="${k}">${ic(on(k) ? "check" : icon)}<small>${t}</small></span>`).join("")}</div>
      <p class="cx-combo ${combo >= 3 ? "hot" : ""}" ${combo ? "" : "hidden"}>${ic("flame")}<span><b class="cx-combo-n">${combo}</b> in a row</span></p>`;
  }
  function lightStep(k) {
    if (k !== "done") loop[k] = true;
    root.querySelectorAll(`.cx-step[data-step="${k}"]`).forEach((el) => { if (el.classList.contains("on")) return; el.classList.add("on", "pop"); el.querySelector("svg").outerHTML = ic("check"); });
  }

  // the lesson's key terms, explained where the notes use them: the first use of each in the notes gets a dotted
  // underline, and hovering, focusing or tapping it shows the definition from the lesson's own key terms
  function markTerms(N) {
    const prose = main.querySelector(".co-prose"); if (!prose || !N?.terms?.length) return;
    const terms = N.terms.map(([t, d]) => [t.replace(/\*\*|`/g, "").trim(), d]).filter(([t]) => t.length >= 3 && t.length <= 60).sort((a, b) => b[0].length - a[0].length);
    const done = new Set();
    for (const [t, def] of terms) {
      const re = new RegExp(`\\b${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:s|es)?\\b`, "i");
      const walk = document.createTreeWalker(prose, NodeFilter.SHOW_TEXT, { acceptNode: (n) => (n.parentElement.closest("h3, a, code, button, .gd, .co-term, .co-ixslot, .co-lab, figure") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT) });
      for (let n = walk.nextNode(); n; n = walk.nextNode()) {
        const m = n.nodeValue.match(re); if (!m) continue;
        const after = n.splitText(m.index); after.splitText(m[0].length);
        const el = Object.assign(document.createElement("button"), { type: "button", className: "co-term", textContent: after.nodeValue });
        el.dataset.term = t; el.dataset.def = def.replace(/\*\*|`/g, ""); el.setAttribute("aria-label", `${after.nodeValue}: ${el.dataset.def}`);
        after.replaceWith(el); done.add(t); break;
      }
    }
    if (!done.size) return;
    const tip = Object.assign(document.createElement("div"), { className: "co-tip", role: "tooltip", hidden: true }); document.body.append(tip);
    let on = null;
    const show = (el) => {
      on = el; tip.innerHTML = `<b>${esc(el.dataset.term)}</b>${esc(el.dataset.def)}`; tip.hidden = false;
      const r = el.getBoundingClientRect(), w = Math.min(320, innerWidth - 24); tip.style.width = `${w}px`;
      tip.style.left = `${Math.round(Math.min(Math.max(12, r.left + r.width / 2 - w / 2), innerWidth - w - 12))}px`;
      const below = r.bottom + 10 + tip.offsetHeight < innerHeight; tip.style.top = `${Math.round(below ? r.bottom + 10 : r.top - 10 - tip.offsetHeight)}px`;
    };
    const hide = () => { on = null; tip.hidden = true; };
    prose.addEventListener("pointerover", (e) => { const el = e.target.closest(".co-term"); if (el && e.pointerType === "mouse") show(el); });
    prose.addEventListener("pointerout", (e) => { if (e.target.closest(".co-term") && e.pointerType === "mouse") hide(); });
    prose.addEventListener("focusin", (e) => { const el = e.target.closest(".co-term"); if (el) show(el); });
    prose.addEventListener("focusout", (e) => { if (e.target.closest(".co-term")) hide(); });
    prose.addEventListener("click", (e) => { const el = e.target.closest(".co-term"); if (!el) return; if (on === el) hide(); else show(el); });
    addEventListener("scroll", hide, { passive: true });
    return () => { tip.remove(); removeEventListener("scroll", hide); };
  }
  function wireReading(id, nQ, N, prev, next) {
    readStop?.();
    const unTerms = markTerms(N);
    const art = main.querySelector(".co-lesson"), bar = Object.assign(document.createElement("div"), { className: "co-readbar" });
    bar.innerHTML = "<i></i>"; document.body.append(bar);
    if (main.querySelector(".co-frame:not(.co-end):not(.co-refs)")) main.querySelector(".co-frame").id = "co-top";
    const trylab = main.querySelector(".co-trylab"); if (trylab) trylab.id = "co-trylab";
    paintSide();
    // the section headings and parts the rail links to, so it can show which one you're reading
    // (sections moved into the split-screen pane aren't on the page's scroll, so they don't count)
    const targets = () => [...root.querySelectorAll(".co-toc a")].map((a) => [a, document.getElementById(a.dataset.jump)]).filter(([, el]) => el && !el.closest(".cx-splitpane"));
    let pctShown = -1, lastPlace = null;
    // where you were in this lesson (S.pos, synced with the account so another device picks up at the same section):
    // offered as "Continue" when you come back before finishing it, and used by Continue learning everywhere
    const place = (sec) => { S.pos ||= {}; if (S.done[id] || sec === "co-top" || sec === targets()[0]?.[0].dataset.jump) { if (!S.pos[id]) return; delete S.pos[id]; } else S.pos[id] = { sec, t: Date.now() }; save(true); };
    const was = resumeSec(id), wasLink = was && !S.done[id] && root.querySelector(`.co-toc a[data-jump="${was}"]`);
    if (wasLink && document.getElementById(was) && was !== root.querySelector(".co-toc a")?.dataset.jump) {
      main.querySelector(".co-lhead .mv-chips")?.insertAdjacentHTML("afterbegin", `<button type="button" class="co-chip co-resume" data-jump="${esc(was)}">${ic("play")} Continue: ${esc(wasLink.textContent)}</button>`);
    }
    const onScroll = () => {
      // 0 at the top of the lesson, 1 once its end is on screen
      const r = art.getBoundingClientRect(), p = r.bottom <= innerHeight + 2 ? 1 : Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)));
      bar.firstChild.style.transform = `scaleX(${p})`;
      const pct = Math.round(p * 100);
      if (pct !== pctShown) {
        pctShown = pct;
        const fg = root.querySelector(".co-rail .fg"); if (fg) fg.style.strokeDashoffset = String(fg.dataset.c * (1 - p));
        const t = root.querySelector(".co-readpct"); if (t) t.textContent = `${pct}% read`;
        if (p >= 0.6) lightStep("read");
      }
      let cur = null; for (const [a, el] of targets()) { if (el.getBoundingClientRect().top < innerHeight * 0.3) cur = a; }
      root.querySelectorAll(".co-toc a").forEach((a) => a.classList.toggle("on", a === cur));
      if (cur && cur.dataset.jump !== lastPlace) {
        lastPlace = cur.dataset.jump; place(lastPlace);
        // the section you're in, kept in view in the lesson's sticky bar
        const sn = main.querySelector(".cx-secname"); if (sn) { sn.textContent = cur.textContent; sn.hidden = false; }
      }
      if (!cur) { const sn = main.querySelector(".cx-secname"); if (sn) sn.hidden = true; }
    };
    // the questions: how many are right so far, in the section's header and the rail
    const count = () => {
      if (!nQ) return;
      const ok = main.querySelectorAll(".co-check .aq.solved").length;
      root.querySelectorAll(".co-checkn").forEach((el) => { el.textContent = ok ? `${ok} of ${nQ} right${ok === nQ ? " · all done" : ""}` : `${nQ} question${nQ > 1 ? "s" : ""} · none answered yet`; el.classList.toggle("all", ok === nQ); });
      if (ok && ok >= Math.ceil(nQ / 2)) lightStep("check");
    };
    const mo = new MutationObserver(count); const chk = main.querySelector(".co-check"); if (chk) mo.observe(chk, { subtree: true, attributes: true, attributeFilter: ["class"] });
    count();
    // the sidebar is redrawn now and then (XP, sync): its rail picks the reading position and question count back up
    art.addEventListener("co-rail", () => { pctShown = -1; onScroll(); count(); });
    // in-page links scroll smoothly, below the sticky top bar, without changing the course's #/lesson route
    const jump = (e) => {
      const a = e.target.closest("[data-jump]"); if (!a) return;
      const el = document.getElementById(a.dataset.jump); if (!el) return;
      e.preventDefault();
      const tab = el.closest(".gx-tabpanel");
      if (tab && el.closest(".cx-splitpane")) { splitTabs?.select(tab.id.replace("cx-split-p-", "")); el.scrollIntoView({ block: "start" }); return; }
      scrollTo({ top: el.getBoundingClientRect().top + scrollY - 90, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    };
    root.addEventListener("click", jump);
    // every section can be linked to directly: the link opens this lesson at that section
    for (const [, el] of targets()) {
      const h = el.matches("h2, h3, h4") ? el : el.querySelector("h2, h3, h4");
      if (!/^co-s\d+$/.test(el.id) || !h || h.querySelector(".cx-seclink")) continue;
      h.insertAdjacentHTML("beforeend", `<button type="button" class="cx-seclink" data-seclink="${el.id}" aria-label="Copy a link to this section" data-tip="Copy link to section">${ic("link")}</button>`);
    }
    const secLink = (e) => { const b = e.target.closest("[data-seclink]"); if (b) copyLink(`${location.pathname}#/lesson/${id}/${b.dataset.seclink}`, "Link to this section copied"); };
    main.addEventListener("click", secLink);
    // a diagram opens full size (most useful on a phone): Escape, the close button or a click outside closes it
    const zoom = (e) => {
      const fig = e.target.closest(".co-lesson .gd"); if (!fig || e.target.closest("a, button")) return;
      const box = Object.assign(document.createElement("div"), { className: "gd-zoom", role: "dialog", ariaModal: "true", ariaLabel: fig.querySelector("svg")?.getAttribute("aria-label") || "Diagram" });
      box.innerHTML = `<div class="gd-zoomin" style="${fig.getAttribute("style")}">${fig.querySelector(".gd-pane").innerHTML}${fig.querySelector("figcaption") ? `<p>${fig.querySelector("figcaption").innerHTML}</p>` : ""}</div><button type="button" class="gd-zoomx" aria-label="Close">×</button>`;
      const close = () => { box.remove(); removeEventListener("keydown", key); fig.focus?.(); };
      const key = (k) => { if (k.key === "Escape") close(); };
      box.addEventListener("click", (k) => { if (k.target === box || k.target.closest(".gd-zoomx")) close(); });
      addEventListener("keydown", key); document.body.append(box); box.querySelector(".gd-zoomx").focus();
    };
    main.addEventListener("click", zoom);
    main.querySelectorAll(".co-lesson .gd").forEach((f) => { f.tabIndex = 0; f.title = "Open the diagram full size"; f.addEventListener("keydown", (k) => { if (k.key === "Enter" || k.key === " ") { k.preventDefault(); zoom({ target: f }); } }); });
    // ← → B F S N and the rest are registered once, with the shared shortcuts (see "keyboard shortcuts" below)
    curPN = { prev, next };
    // the rail's Complete button does what the lesson's own does
    const railGo = (e) => { if (e.target.closest(".co-railgo")) main.querySelector(".co-finish .co-complete")?.click(); };
    side.addEventListener("click", railGo);
    addEventListener("scroll", onScroll, { passive: true }); addEventListener("resize", onScroll);
    requestAnimationFrame(onScroll);
    readStop = () => { removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); root.removeEventListener("click", jump); main.removeEventListener("click", secLink); main.removeEventListener("click", zoom); document.querySelector(".gd-zoom")?.remove(); unTerms?.(); side.removeEventListener("click", railGo); mo.disconnect(); bar.remove(); readStop = null; };
  }
  // revision notes: the lesson's key ideas on one page (what you can now do, the summary, key terms, its sections),
  // made from the lesson's own notes, so they're never out of step with it
  function revisionNotes() {
    const l = curLesson, N = curN; if (!l || !N) return;
    const secs = [...main.querySelectorAll(".co-toc a[data-jump^='co-s']")].map((a) => [a.dataset.jump, a.textContent]);
    const body = `<p class="co-kicker">${esc(U)} ${l.unit.n} · ${esc(l.unit.title)}</p>
      ${N.objectives.length ? `<h3 class="cx-rn">You can now</h3><ul>${N.objectives.map((o) => `<li>${inline(o)}</li>`).join("")}</ul>` : ""}
      ${N.summary.length ? `<h3 class="cx-rn">The key ideas</h3><ul>${N.summary.map((x) => `<li>${inline(x)}</li>`).join("")}</ul>` : N.lead ? `<h3 class="cx-rn">In a sentence</h3><p>${inline(N.lead)}</p>` : ""}
      ${N.terms.length ? `<h3 class="cx-rn">Key terms</h3><dl class="co-terms">${N.terms.map(([t, d]) => `<dt>${inline(t)}</dt><dd>${inline(d)}</dd>`).join("")}</dl>` : ""}
      ${secs.length ? `<h3 class="cx-rn">Jump back into the lesson</h3><div class="cx-rnsecs">${secs.map(([sid, t]) => `<button type="button" class="co-chip" data-rnjump="${esc(sid)}">${esc(t)}</button>`).join("")}</div>` : ""}`;
    const m = openModal({ title: `Revision notes: ${l.title}`, body, size: "lg", actions: [
      ...(N.cards.length ? [{ label: `Test me: ${N.cards.length} flashcard${N.cards.length > 1 ? "s" : ""}`, primary: true, run: () => { setTimeout(() => main.querySelector("[data-cards]")?.click(), 200); } }] : []),
      { label: "Close", primary: !N.cards.length },
    ] });
    m.box.addEventListener("click", (e) => { const b = e.target.closest("[data-rnjump]"); if (!b) return; m.close(); setTimeout(() => jumpTo(document.getElementById(b.dataset.rnjump)), 200); });
  }

  // related topics: what this lesson builds on, the rest of its topic, and lessons named after its own key terms,
  // each previewable in place; opening one keeps a way back to the exact spot in this lesson (kit/ui/wayfinding.js)
  let returnTo = null;
  function relatedTopics() {
    const l = curLesson, N = curN; if (!l) return;
    const seen = new Set([l.id]), take = (ls) => ls.filter((x) => x && !seen.has(x.id) && seen.add(x.id));
    const pre = graph ? take(prerequisitesOfLesson(graph, l.id).modules.map((k) => graph.nodes.get(k)).filter(Boolean).sort((a, b) => a.order - b.order).map((n) => byId[n.lessons[0]])) : [];
    const g = groupsOf(l.unit).find((x) => x.lessons.some((y) => y.id === l.id));
    const sameTopic = take(g?.lessons || []).slice(0, 8);
    const terms = (N?.terms || []).map(([t]) => norm(plain(t))).filter((t) => t.length > 3);
    const byTerm = terms.length ? take(lessons.filter((x) => terms.some((t) => norm(x.title).includes(t)))).slice(0, 8) : [];
    const row = (x) => `<li class="cx-rel"><div><a href="#/lesson/${x.id}" data-relgo="${x.id}">${dot(statusOf(x.id))}<b>${esc(x.title)}</b></a><small>${U} ${x.unit.n}: ${esc(x.unit.title)}${x.module ? ` · ${esc(x.module)}` : ""}</small></div><button type="button" class="gx-link" data-peek="${x.id}" aria-expanded="false">Preview</button><div class="cx-peek" hidden></div></li>`;
    const sec = (title, sub, xs) => xs.length ? `<section class="cx-relsec"><h3>${title}</h3>${sub ? `<p>${sub}</p>` : ""}<ul>${xs.map(row).join("")}</ul></section>` : "";
    const body = [
      sec("Builds on", "Ideas this lesson relies on.", pre),
      sec("Connected by its key terms", "Lessons about the terms this one uses.", byTerm),
      sec(`The rest of ${g?.title ? esc(g.title) : "this topic"}`, "", sameTopic),
    ].join("") || emptyState({ icon: "link", title: "Nothing linked yet", body: "This lesson doesn't name related lessons. The whole course is on Explore.", compact: true });
    const d = openDrawer({ title: "Explore related topics", body: `${body}<p class="cx-relfoot"><a class="btn btn-ghost lg btn-sm" href="/explore.html#/course/${esc(cfg.slug)}/${esc(l.unit.id)}"><span>See ${esc(U)} ${l.unit.n} on Explore</span></a></p><p class="gx-note">Opening one keeps your place here: a “Back to” link returns to this exact spot.</p>` });
    d.box.addEventListener("click", async (e) => {
      const go = e.target.closest("[data-relgo]");
      if (go) { returnTo = { href: resumeHref(l), title: l.title }; d.close(); return; }
      const b = e.target.closest("[data-peek]"); if (!b) return;
      const box = b.parentElement.querySelector(".cx-peek"), open = box.hidden;
      box.hidden = !open; b.setAttribute("aria-expanded", String(open)); b.textContent = open ? "Hide" : "Preview";
      if (!open || box.dataset.done) return;
      box.innerHTML = skeleton("text", 3);
      const M = await notesFor(byId[b.dataset.peek]).catch(() => null); box.dataset.done = "1";
      box.innerHTML = M ? `${M.lead ? `<p>${inline(M.lead)}</p>` : ""}${M.summary.length ? `<ul>${M.summary.slice(0, 3).map((x) => `<li>${inline(x)}</li>`).join("")}</ul>` : ""}${M.terms.length ? `<p class="cx-peekterms">${M.terms.slice(0, 4).map(([t]) => `<span>${inline(t)}</span>`).join("")}</p>` : ""}` : `<p class="gx-note">The notes for this lesson aren't written yet.</p>`;
    });
  }

  // split screen (wide screens): the notes on the left; questions, flashcards, the AI tutor and the diagrams on the
  // right, in tabs. The sections themselves move across (answers and the tutor keep their state) and move back after.
  const splitFits = () => matchMedia("(min-width: 1100px)").matches;
  const splitOn = () => root.classList.contains("cx-split");
  let splitTabs = null;
  function setSplit(on, remember = true) {
    const art = main.querySelector(".co-lesson"), notes = art?.querySelector(".co-notes");
    // put everything back first (switching off, or rebuilding)
    art?.querySelectorAll("[data-split-home]").forEach((home) => { const el = document.getElementById(home.dataset.splitHome); if (el) home.replaceWith(el); else home.remove(); });
    art?.querySelector(".cx-splitpane")?.remove(); splitTabs = null;
    requestAnimationFrame(() => art?.dispatchEvent(new Event("co-rail")));   // the rail and reading position, recounted
    on = Boolean(on && art && notes && splitFits());
    root.classList.toggle("cx-split", on);
    root.querySelectorAll("[data-split]").forEach((b) => b.setAttribute("aria-pressed", String(on)));
    if (remember) setPref(cfg.slug, "split", on || null);
    if (!on) return;
    const N = curN, check = document.getElementById("co-check"), deeper = document.getElementById("co-deeper");
    const figs = [...notes.querySelectorAll(".gd")];
    const tabs = [
      check ? { id: "check", label: "Questions", icon: ic("target") } : null,
      N?.cards.length ? { id: "cards", label: "Flashcards", icon: ic("cards"), html: `<div class="cx-splitcards">${emptyState({ icon: "cards", title: `${N.cards.length} flashcard${N.cards.length > 1 ? "s" : ""} for this lesson`, body: "Recall beats rereading. Go through them while the notes stay open beside you.", actions: [{ label: "Start the flashcards", primary: true }] })}</div>` } : null,
      deeper ? { id: "tutor", label: "AI tutor", icon: ic("ai") } : null,
      figs.length ? { id: "figs", label: "Diagrams", icon: ic("grid"), badge: String(figs.length), html: `<div class="cx-splitfigs">${figs.map((f) => f.outerHTML).join("")}</div>` } : null,
    ].filter(Boolean);
    if (!tabs.length) { root.classList.remove("cx-split"); return; }
    const pane = document.createElement("aside");
    pane.className = "cx-splitpane"; pane.setAttribute("aria-label", "Beside the notes");
    pane.innerHTML = tabsHtml("cx-split", tabs, pref(cfg.slug, "splitTab", tabs[0].id));
    notes.after(pane);
    const move = (el, tab) => { if (!el) return; const home = document.createElement("div"); home.dataset.splitHome = el.id; home.hidden = true; el.before(home); pane.querySelector(`#cx-split-p-${tab}`).append(el); };
    move(check, "check"); move(deeper, "tutor");
    pane.querySelector(".cx-splitcards [data-empty-act]")?.addEventListener("click", () => main.querySelector(".co-finish [data-cards], [data-cards]")?.click());
    splitTabs = wireTabs(pane, { scope: cfg.slug, key: "splitTab" });
  }
  addEventListener("resize", () => { if (splitOn() && !splitFits()) setSplit(false, false); });

  async function viewLesson(id) {
    const l = byId[id]; if (!l) return go("learn");
    curLesson = l; loop.read = false; loop.check = false; loop.recall = false; comboBest = 0;
    noteVisit(l);
    // the lesson's shape while its notes load (only if they take a moment: cached notes never flash a placeholder)
    const skT = setTimeout(() => { if (curLesson === l) main.innerHTML = skeleton("lesson", 0, `Loading ${l.title}`); }, 120);
    // Free: 10 lessons in each course (kit/data/limits.js), once Pro is on sale
    if (!(await gate("lesson", id, { course: cfg.slug, store }))) { clearTimeout(skT); main.innerHTML = lockedHtml("lesson"); return; }
    lt.start(id);
    if (S.done[id] || S.time?.[id]?.v) ledger({ event: "lesson_revisited", concept: `${cfg.slug}:${id}`, source: "course", detail: { visits: (S.time?.[id]?.v || 0) + 1, done: Boolean(S.done[id]) } });
    const u = l.unit, t = trackOf(u), N = await notesFor(l); clearTimeout(skT);
    const prev = u.lessons[l.i - 1], next = u.lessons[l.i + 1] || units[u.n]?.lessons[0];
    const F = N ? lessonFrame(N) : null, nQ = N?.items?.length || 0;
    curN = N; const openedAt = Date.now(), xpBefore = totalXp();
    const g = groupsOf(u).find((x) => x.lessons.some((y) => y.id === id)), gi = groupsOf(u).indexOf(g);
    const nIx = ixs.filter((x) => x.lessons?.includes(id)).length + (N ? N.blocks.filter((b) => b.t === "ix").length : 0), qz = S.quiz[u.id];
    const mins = N ? Math.max(2, Math.round(lessonText(N).split(/\s+/).length / 200 + nQ * 0.75)) : 0;
    const card = (x, dir) => (x = x && byId[x.id]) ? `<a class="co-pncard ${dir}" href="#/lesson/${x.id}"><small>${dir === "prev" ? "← Previous lesson" : "Next lesson →"}</small><b>${esc(x.title)}</b>${x.unit !== u ? `<i>${U} ${x.unit.n}: ${esc(x.unit.title)}</i>` : ""}</a>` : "<span></span>";
    // the logical next activity, not just the next page: the last lesson of a unit leads to its quiz (until passed)
    const lastInUnit = l.i === u.lessons.length - 1, quizNext = lastInUnit && !S.quiz[u.id]?.pass && isWritten(u);
    const nextCard = quizNext ? `<a class="co-pncard next" href="#/quiz/${u.id}"><small>Next: the ${esc(u1)} quiz →</small><b>Lock in ${esc(u.title)}</b><i>${next ? `Then ${U} ${byId[next.id]?.unit.n}: ${esc(byId[next.id]?.unit.title || "")}` : `+${XP.quiz} XP`}</i></a>` : card(next, "next");
    const upCard = `<a class="co-pncard up" href="#/learn/${u.id}"><small>↑ Back to ${esc(U)} ${u.n}</small><b>${esc(u.title)}</b><i>${unitDone(u)} of ${u.lessons.length} lessons done</i></a>`;
    // "What would you like to do next?": everything for this topic, wherever it lives in Gradify, and the most useful first
    const quizReady = !S.quiz[u.id]?.pass && u.lessons.every((x) => S.done[x.id] || x.id === id);
    const prim = !S.done[id] && nQ ? "check" : quizReady ? "quiz" : "next";
    const nextL = next && byId[next.id];
    const res = N ? [
      { icon: "notes", label: "Revision notes", desc: "The key ideas, terms and sections on one page.", meta: "2 min", run: () => revisionNotes() },
      N.cards.length ? { icon: "cards", label: "Flashcards", desc: `Test your recall: ${l.title}`, meta: `${N.cards.length} card${N.cards.length > 1 ? "s" : ""}`, run: () => main.querySelector("[data-cards]")?.click() } : null,
      nQ ? { icon: "target", label: "Exam-style questions", desc: "Apply what you've just learned.", meta: `${nQ} here`, href: "#co-check", jump: "co-check", primary: prim === "check" } : null,
      { icon: "bolt", label: "Target test", desc: `Five minutes on ${g?.title || "this lesson"}, timed.`, meta: "5 min", href: `#/target/${encodeTest({ minutes: 5, scope: "lessons", lessons: (g?.lessons || [l]).map((x) => x.id) })}` },
      { icon: "link", label: "Explore related topics", desc: "What it builds on and connects to, without losing your place.", run: () => relatedTopics() },
      { icon: "ai", label: "Ask AI to explain", desc: "Another explanation, in different words.", run: () => { const t = main.querySelector(".co-tutor"); if (!t) return; if (t.closest(".cx-splitpane")) splitTabs?.select("tutor"); jumpTo(t); setTimeout(() => t.querySelector("textarea, input")?.focus({ preventScroll: true }), 350); } },
      quizReady || quizNext ? { icon: "trophy", label: `${U} ${u.n} quiz`, desc: `Lock in ${u.title}.`, meta: S.quiz[u.id] ? `best ${pc(S.quiz[u.id].best)}` : `+${XP.quiz} XP`, href: `#/quiz/${u.id}`, primary: prim === "quiz" } : null,
      nextL && !quizNext ? { icon: "play", label: "Next lesson", desc: nextL.title, href: `#/lesson/${nextL.id}`, primary: prim === "next" } : null,
    ] : [];
    // the lesson's colours behind the glass (the ambient light in kit/styles/course.css, "Liquid Glass lesson")
    root.style.setProperty("--la", t.from); root.style.setProperty("--lb", t.to);
    main.innerHTML = `<article class="co-lesson co-read" style="--a:${t.from};--b:${t.to}">
      <div class="co-lbar cx-lbar">
        <div class="cx-lrow">
          <button type="button" class="cx-ob" data-tree-open aria-label="Course outline">${ic("menu")}<span>Outline</span></button>
          <nav class="cx-bc" aria-label="Breadcrumb"><a href="#/home">${esc(cfg.name)}</a><a href="#/learn/${u.id}">${U} ${u.n}<span class="cx-bcl">: ${esc(u.title)}</span></a>${g?.title ? `<a href="#/learn/${u.id}" class="cx-bcm">${u.n}.${gi + 1} ${esc(g.title)}</a>` : ""}<span aria-current="page">${esc(l.title)}</span></nav>
          <span class="cx-secname" aria-hidden="true" hidden></span>
          <div class="cx-lact">
            <span class="cx-save" hidden></span>
            <button type="button" class="cx-ib" data-mark aria-pressed="${marked(id)}" title="Bookmark (B)" aria-label="Bookmark this lesson">${ic(marked(id) ? "bookmarked" : "bookmark")}</button>
            ${N ? `<button type="button" class="cx-ib" data-revnotes title="Revision notes (R)" aria-label="Revision notes">${ic("notes")}</button>` : ""}
            ${N && (nQ || N.cards.length) ? `<button type="button" class="cx-ib cx-splitb" data-split aria-pressed="${splitOn()}" title="Split screen: notes beside questions (S)" aria-label="Split screen">${ic("split")}</button>` : ""}
            <button type="button" class="cx-ib" data-focus aria-pressed="${focusOn()}" title="Focus mode (F)" aria-label="Focus mode">${ic("expand")}</button>
            <button type="button" class="cx-ib" data-pal-open title="Search (/)" aria-label="Search the course">${ic("search")}</button>
            <span class="cx-pn">${prev ? `<a class="cx-ib" href="#/lesson/${prev.id}" title="Previous: ${esc(prev.title)} (←)" aria-label="Previous lesson">${ic("left")}</a>` : `<span class="cx-ib off">${ic("left")}</span>`}<small>${l.i + 1} / ${u.lessons.length}</small>${next ? `<a class="cx-ib" href="#/lesson/${next.id}" title="Next: ${esc(next.title)} (→)" aria-label="Next lesson">${ic("right")}</a>` : `<span class="cx-ib off">${ic("right")}</span>`}</span>
          </div>
        </div>
        <div class="co-steps">${u.lessons.map((x, k) => `<a href="#/lesson/${x.id}" class="${S.done[x.id] ? "done" : ""} ${x.id === id ? "here" : ""}" title="${esc(x.title)}" aria-label="Lesson ${k + 1}: ${esc(x.title)}${S.done[x.id] ? " (done)" : ""}"></a>`).join("")}</div>
      </div>
      <div class="mv-page co-notes" style="--c:${t.from}">
        <header class="co-lhead"><span class="co-licon" data-g3d="${esc(`${l.title} ${l.module || ""} ${u.title}`)}" data-g3d-size="88"></span>
          <span class="kicker">${esc(t.name)} · ${U} ${u.n}${l.module ? ` · ${esc(l.module)}` : ""}</span><h1>${esc(l.title)}</h1>${N?.lead ? `<p class="mv-lead">${inline(N.lead)}</p>` : ""}
          <div class="mv-chips"><span class="co-chip cx-stchip s-${statusOf(id)}">${dot(statusOf(id))} ${STATUS[statusOf(id)].label}</span>${S.done[id] ? "" : `<span class="co-chip">${ic("bolt")} +${XP.lesson} XP</span>`}${mins ? `<span class="co-chip">${ic("clock")} About ${mins} min</span>` : ""}${N?.level ? `<span class="co-chip">${esc(N.level)}</span>` : ""}</div></header>
        ${N ? `<nav class="cx-kit" aria-label="Everything for this topic">
          ${nQ ? `<a class="cx-kc" href="#co-check" data-jump="co-check"><span>${ic("target")}</span><b>Check yourself</b><small>${nQ} question${nQ > 1 ? "s" : ""}</small></a>` : ""}
          ${N.cards.length ? `<button type="button" class="cx-kc" data-cards><span>${ic("cards")}</span><b>Flashcards</b><small>${N.cards.length} card${N.cards.length > 1 ? "s" : ""}</small></button>` : ""}
          ${nIx ? `<a class="cx-kc" href="#co-trylab" data-jump="co-trylab" data-kit-lab><span>${ic("cube")}</span><b>${PL === "Lab" ? "Interactive" : esc(PL)}</b><small>${nIx} to try</small></a>` : ""}
          <a class="cx-kc" href="#/quiz/${u.id}"><span>${ic("trophy")}</span><b>${U} quiz</b><small>${qz ? `best ${pc(qz.best)}` : `+${XP.quiz} XP`}</small></a>
          <a class="cx-kc" href="#/target/${encodeTest({ minutes: 5, scope: "lessons", lessons: (g?.lessons || [l]).map((x) => x.id) })}"><span>${ic("bolt")}</span><b>Target test</b><small>5 min · ${esc(g?.title || "this lesson")}</small></a>
        </nav>` : ""}
        ${N && isDraft(u) ? `<p class="co-draft" role="note"><b>Draft.</b> This ${u1} is written but hasn't yet completed content review, source checking and expert sign-off. Use it alongside your course materials and official sources.</p>` : ""}
        ${N && cfg.reviewLine ? `<p class="co-reviewed">${reviewLine(u)}</p>` : ""}
        ${buildsOnHtml(id)}
        ${N ? F.top : ""}
        ${N ? `<div class="mv-cols co-prose">${lessonDiagrams(N)}</div>${F.end || recapDiagrams(N).length ? `<section class="co-recap" id="co-recap"><h3 class="co-part">${ic("check")} Recap</h3>${recapDiagrams(N).map((d) => glassDiagram(d)).join("")}${F.end}</section>` : ""}` : `<p class="co-empty">The notes for this lesson are still being written. You can still mark it done and come back later.</p>`}
        ${N && cfg.anatomy3d?.lessons && id in cfg.anatomy3d.lessons ? anatomyPanel(cfg.anatomy3d.lessons[id]) : ""}
        ${nQ ? `<section class="co-check" id="co-check"><header><h3 class="co-part">${ic("target")} Check yourself</h3><span class="co-checkn" aria-live="polite"></span></header>${N.items.map((it, k) => `<div class="co-qn" data-n="${k + 1} of ${nQ}">${qHtml(it, { confidence: true })}</div>`).join("")}</section>` : ""}
        ${N ? `<section class="co-deeper" id="co-deeper"><h3 class="co-part">${ic("sparkles")} Go deeper</h3><section class="co-ask co-tutor"></section>${mapsSectionHtml(N, mapOpts(l))}</section>` : ""}
        ${resourceSwitcher({ kicker: `${U} ${u.n} · ${u.title} · ${l.title}`, items: res, id: "co-next" })}
        ${N && F.refs ? `<section class="co-refsec" id="co-refs">${F.refs}</section>` : ""}
        <footer class="co-finish">
          <div class="co-finish-txt"><b>${S.done[id] ? "You've finished this lesson" : N ? "Finished reading?" : "Notes coming soon"}</b><span>${S.done[id] ? "Review it any time, or carry on to the next one." : `Mark it complete for +${XP.lesson} XP${next ? ", then choose what's next" : ""}.`}</span></div>
          <div class="co-finish-btns">
            <button class="btn btn-light lg co-complete" ${S.done[id] ? "disabled" : ""}><span>${S.done[id] ? "Completed ✓" : `Complete lesson · +${XP.lesson} XP`}</span></button>
            ${N?.cards.length ? `<button class="btn btn-ghost lg" data-cards><span>${ic("cards")} Flashcards</span></button>` : ""}
            ${N ? `<button class="btn btn-ghost lg" data-save><span>${ic("save")} ${S.saved[id] ? "Saved to your account ✓" : "Save notes and cards"}</span></button>` : ""}
          </div>
        </footer>
      </div>
      <nav class="co-pn cx-pn3" aria-label="Other lessons">${card(prev, "prev")}${upCard}${nextCard}</nav>
    </article>`;
    // the rail beside the lesson: its sections, how far through you are, and its questions
    lessonRail = () => railHtml(l, N, nQ, mins, { u, g, nextL, quizNext });
    addSave(main.querySelector(".cx-lact .cx-save"));
    scrollTo(0, 0);
    wirePractice(main, "lesson", id);
    glassIcons(main, cfg.site).catch(() => {});
    // every interactive that names this lesson is reachable from it: those not placed in its notes go at the end
    // (before the tutor, or the footer when the notes aren't written yet), two in full and the rest as links
    {
      const placed = new Set([...main.querySelectorAll(".co-ixslot")].map((s) => s.dataset.ix));
      const linked = ixs.filter((x) => x.lessons?.includes(id) && !placed.has(x.id)), shown = linked.slice(0, 2), more = linked.slice(2);
      const at = main.querySelector(".co-tutor") || main.querySelector(".co-notes > footer");
      if (linked.length && at) at.insertAdjacentHTML("beforebegin", `<section class="co-trylab"><h3>Try it yourself</h3>${shown.map((x) => `<div class="co-ixslot" data-ix="${esc(x.id)}"></div>`).join("")}${more.length ? `<p class="co-morelabs">More for this lesson: ${more.map((x) => `<a href="#/practice/${esc(x.id)}">${esc(x.title)}</a>`).join(" · ")}</p>` : ""}</section>`);
    }
    mountIxSlots(main);
    { const lab = main.querySelector(".co-trylab, .co-lesson .co-lab"); if (lab) lab.id ||= "co-trylab"; else main.querySelector("[data-kit-lab]")?.remove(); }
    main.querySelector("[data-mark]").addEventListener("click", () => toggleMark(id));
    main.querySelector("[data-focus]").addEventListener("click", () => setFocus(!focusOn()));
    paintDock("lesson", l, prev && byId[prev.id], next && byId[next.id]);
    redrawTree?.(false);
    wireReading(id, nQ, N, prev && byId[prev.id], next && byId[next.id]);
    if (N) wireMaps(main, N, mapOpts(l));
    main.querySelectorAll("[data-cards]").forEach((b) => b.addEventListener("click", async () => { if (await gate("flashcards", `${cfg.slug}:${l.id}`, { store })) flashcards(N.cards, l, N); }));
    main.querySelector("[data-save]")?.addEventListener("click", (e) => saveLesson(l, N, e.currentTarget));
    { const sw = main.querySelector("#co-next"); if (sw) wireActions(sw, res); }
    main.querySelector("[data-revnotes]")?.addEventListener("click", () => revisionNotes());
    main.querySelector("[data-split]")?.addEventListener("click", () => setSplit(!splitOn()));
    if (splitOn() || pref(cfg.slug, "split")) setSplit(splitFits(), false);
    const tp = main.querySelector(".co-tutor");
    if (tp) mountTutorPanel(tp, {
      ask: askTutor, lesson: { id, title: l.title }, note: cfg.tutor || TUTOR_NOTE,
      focus: sixProfiles(evidenceFromAttempts((S.attempts || []).filter((a) => a.lesson === id), { levels: cfg.levels || null, exploration: EXPLORE })).all.weakest || "apply",
      candidates: () => connectCandidates(l), unavailable: (what) => signinLine(what, ""),
      link: (lid) => `#/lesson/${lid}`, titleOf: (lid) => byId[lid]?.title || lid, lab: () => labFor(labLast),
    });
    main.querySelector(".co-complete").addEventListener("click", async (e) => {
      if (S.done[id]) return;
      S.done[id] = Date.now(); save(); track("lesson_complete", cfg.site);
      ledger({ event: "lesson_completed", concept: `${cfg.slug}:${id}`, source: "course", detail: { seconds: Math.round((lt.current()?.ms || 0) / 1000) + (S.time?.[id]?.s || 0) } }); e.currentTarget.disabled = true; e.currentTarget.querySelector("span").textContent = "Completed ✓";
      const lvBefore = levelOf(totalXp());
      await award(XP.lesson, "lesson", id, `${cfg.name}: ${l.title}`);
      lightStep("done"); shareProgress(l);
      if (unitDone(u) === u.lessons.length) celebrate(`${U} ${u.n} complete`, `${esc(u.title)}: every lesson done. Take the unit quiz for +${XP.quiz} XP.`, `<a class="btn btn-ghost lg btn-sm" href="#/quiz/${u.id}"><span>${U} quiz</span></a>`);
      else lessonSummary({ l, N, nQ, next: next && byId[next.id], gained: totalXp() - xpBefore, lvBefore, openedAt });
    });
  }
  // the moment a lesson is completed: what it earned, how the questions went, the level and the day so far, and one
  // clear next step (Enter goes on). The learner chooses: nothing moves on by itself.
  function lessonSummary({ l, N, nQ, next, gained, lvBefore, openedAt }) {
    const xp = totalXp(), L = levelOf(xp), st = streak(), tx = todayXp(), right = main.querySelectorAll(".co-check .aq.solved").length;
    const mins = Math.max(1, Math.round((Date.now() - openedAt) / 6e4)), r = roll(idsOf(l.unit)), ups = L.n > lvBefore.n;
    const from = ups ? 0 : ((lvBefore.xp ?? xp - gained) - L.from) / (L.to - L.from), to = (xp - L.from) / (L.to - L.from);
    const cardsLeft = N?.cards?.length && !S.recalled?.[l.id];
    const d = document.createElement("div"); d.className = "co-modal cx-done";
    d.innerHTML = `<div class="co-dialog cx-donebox" role="dialog" aria-modal="true" aria-labelledby="cx-doneh">
      <div class="cx-donetop"><span class="cx-donecheck">${ic("check")}</span><span class="co-kicker">Lesson complete</span><h2 id="cx-doneh">${esc(l.title)}</h2><p class="cx-gain">+${gained} XP</p></div>
      <div class="cx-donestats">
        ${nQ ? `<div><b>${right}/${nQ}</b><small>questions right</small></div>` : ""}
        <div><b>${mins} min</b><small>on this lesson</small></div>
        <div><b>${ic("flame")} ${st.n}</b><small>day streak</small></div>
        <div><b>${Math.min(tx, S.goal)}/${S.goal}</b><small>daily XP goal</small></div>
      </div>
      <div class="cx-donelv"><span>Level ${L.n}${ups ? " · level up!" : ""}</span><div class="co-bar"><i style="width:${from * 100}%"></i></div><small>${(L.to - xp).toLocaleString()} XP to level ${L.n + 1}</small></div>
      <p class="cx-doneunit">${dot(statusOf(l.id))} ${STATUS[statusOf(l.id)].label} · ${U} ${l.unit.n}: ${r.done} of ${r.total} lessons done${comboBest >= 3 ? ` · best run ${comboBest} in a row` : ""}</p>
      ${nQ && right < nQ ? `<p class="cx-donetip">${ic("target")} ${nQ - right} question${nQ - right === 1 ? "" : "s"} still to get right. They'll come back in Revise, or <a href="#co-check" data-close data-jump="co-check">try them now</a>.</p>` : ""}
      <div class="co-row cx-donego">${next ? `<a class="btn btn-light lg" href="#/lesson/${next.id}" data-close><span>Next: ${esc(next.title)} →</span></a>` : `<a class="btn btn-light lg" href="#/learn" data-close><span>Back to the syllabus</span></a>`}
        ${cardsLeft ? `<button type="button" class="btn btn-ghost lg" data-recall><span>${ic("cards")} Recall the ${N.cards.length} flashcards</span></button>` : ""}
        <button type="button" class="btn btn-ghost lg" data-close><span>Stay here</span></button></div>
      <small class="cx-donekeys"><kbd>↵</kbd> ${next ? "next lesson" : "syllabus"} · <kbd>Esc</kbd> stay</small></div>`;
    const close = () => { d.remove(); removeEventListener("keydown", key, true); };
    const key = (e) => { if (e.key === "Escape") { e.preventDefault(); close(); } };
    d.addEventListener("click", (e) => { if (e.target === d || e.target.closest("[data-close]")) close(); if (e.target.closest("[data-recall]")) { close(); flashcards(N.cards, l, N); } });
    addEventListener("keydown", key, true);
    document.body.append(d); confetti();
    d.querySelector(".cx-donego a, .cx-donego button").focus();
    requestAnimationFrame(() => requestAnimationFrame(() => { const b = d.querySelector(".cx-donelv .co-bar i"); if (b) b.style.width = `${Math.min(1, to) * 100}%`; }));
  }
// ---------- the AI tutor (kit/assess/tutor.js → supabase/functions/course-tutor) and written practice ----------
  // One request to the course-tutor function (kit/data/functions.js turns every failure into a clear message)
  // teaching experiments (kit/intel/experiments.js): the first use of each tutor mode on a lesson, per page view
  const tutorLogged = new Set();
  async function askTutor(body) {
    const lid = body.lesson?.id, k = `${body.mode}:${lid}`;
    if (lid && body.mode && !tutorLogged.has(k)) { tutorLogged.add(k); ledger(tutorEvent({ site: cfg.site, subject: cfg.slug, lesson: lid, mode: body.mode })); }
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
    const turns = [], conv = newConversation(), kase = { client: t.client, persona: t.persona, facts: t.facts }, who = t.who || "client", Who = who[0].toUpperCase() + who.slice(1);
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
      try { const { reply } = await askTutor({ mode: "roleplay", case: kase, turns, conversationId: conv }); turns.push({ role: "client", text: reply }); paint(); }
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
  function flashcards(cards, l, N) {
    let i = 0, flipped = false;
    const diagrams = N ? diagramsFor(N, { max: 12 }) : [];
    const d = document.createElement("div"); d.className = "co-modal";
    const paint = () => {
      d.innerHTML = `<div class="co-dialog co-fc" role="dialog" aria-modal="true" aria-label="Flashcards">
        <div class="co-fc-top"><span class="co-kicker">${esc(l.title)}</span><span>${i + 1} / ${cards.length}</span><button class="co-x" data-close aria-label="Close">×</button></div>
        <button class="co-card3d ${flipped ? "flip" : ""}" aria-live="polite"><span class="f"><span class="co-fcicon" data-g3d="${esc(`${cards[i][0]} ${l.title}`)}" data-g3d-size="52"></span><div>${inline(cards[i][0])}</div><small>Tap to reveal</small></span><span class="b"><div>${inline(cards[i][1])}</div>${glassDiagram(diagramForCard(diagrams, cards[i][0], cards[i][1]), { size: "sm", caption: false })}</span></button>
        <div class="co-row"><button class="btn btn-ghost lg btn-sm" data-prev ${i ? "" : "disabled"}><span>← Back</span></button><button class="btn btn-light lg btn-sm" data-next><span>${i < cards.length - 1 ? "Next →" : "Done"}</span></button></div></div>`;
      glassIcons(d, cfg.site).catch(() => {});
      d.querySelector(".co-card3d").onclick = () => { flipped = !flipped; d.querySelector(".co-card3d").classList.toggle("flip", flipped); };
      d.querySelector("[data-prev]").onclick = () => { i--; flipped = false; paint(); };
      d.querySelector("[data-next]").onclick = () => {
        if (i < cards.length - 1) { i++; flipped = false; paint(); return; }
        // going through every card is the lesson's recall step
        d.remove(); S.recalled ||= {}; if (!S.recalled[l.id]) { S.recalled[l.id] = Date.now(); keep(); } lightStep("recall"); toast(`${ic("cards")} Recall done: ${cards.length} card${cards.length === 1 ? "" : "s"} from <b>${esc(l.title)}</b>`);
      };
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
    main.innerHTML = `<div class="co-panel">${skeleton("list", 6, "Loading your questions")}</div>`;
    const need = new Set(due.map((q) => q.unit));
    const notes = Object.assign({}, ...(await Promise.all(units.filter((u) => need.has(u.id)).map(unitNotes))));
    const items = due.map((q) => ({ q, it: notes[q.lesson]?.items?.find((i) => i.key === q.id) })).filter((x) => x.it);
    main.innerHTML = `<div class="co-intro"><span class="co-kicker">Revisit</span><h2>${items.length} ${items.length === 1 ? "question" : "questions"} to bring back</h2><p>Answer without looking at the notes first. Recalling something just as it starts to fade is what makes it last. These answers count as retention evidence in My progress.</p></div>
      <div class="co-plist">${items.map(({ q, it }) => `<div class="co-prob"><div class="co-pmeta"><a href="#/lesson/${it.l.id}">${U} ${it.l.unit.n} · ${esc(it.l.title)}</a><span>${q.reason === "wrong" ? "Wrong last time" : `Last right ${Math.round((Date.now() - q.lastAt) / DAY)}d ago`}</span></div>${qHtml(it)}</div>`).join("")}</div>`;
    wirePractice(main.querySelector(".co-plist"), "review", "retrieval");
  }
  // Target my weaknesses (kit/learning/targets.js): questions from the lessons where the learner's own answers show
  // them weakest, foundations first where the course has a concept graph. Answers count as ordinary practice.
  const weakTargets = () => weaknessTargets(S.attempts || [], { exploration: EXPLORE, levels: cfg.levels || null, graph, limit: 5 });
  async function viewWeak() {
    const targets = weakTargets();
    if (!targets.length) { main.innerHTML = `<div class="co-panel"><span class="co-kicker">Target my weaknesses</span><h2>No weak spots measured yet</h2><p>Gradify only calls something weak when your own answers show it: a lesson where you've got most questions wrong, one whose recent answers are worse than before, or a lab challenge you've tried and not met. Answer a few more check questions and come back.</p><a class="btn btn-light lg btn-sm" href="#/learn"><span>Continue learning</span></a></div>`; return; }
    main.innerHTML = `<div class="co-panel"><p>Building your practice set…</p></div>`;
    const need = new Set(targets.map((t) => byId[t.lesson]?.unit.id).filter(Boolean));
    const notes = Object.assign({}, ...(await Promise.all(units.filter((u) => need.has(u.id)).map(unitNotes))));
    const items = Object.fromEntries(targets.map((t) => [t.lesson, notes[t.lesson]?.items || []]));
    const set = practiceSet(targets, items, S.attempts || []), why = Object.fromEntries(targets.map((t) => [t.lesson, t]));
    const KIND = { foundation: "Foundation first", weak: "Weak", wrong: "Mostly wrong so far", slipping: "Slipping", lab: "Lab challenge not met" };
    main.innerHTML = `<div class="co-intro"><span class="co-kicker">Target my weaknesses</span><h2>${set.length} ${set.length === 1 ? "question" : "questions"} on your weakest ${targets.length === 1 ? "lesson" : `${targets.length} lessons`}</h2><p>Chosen from your own answers. Where a weak lesson rests on something you're also finding hard, that foundation comes first. Easier questions come first where you're weakest. These count as practice in your mastery.</p></div>
      <ul class="co-weak">${targets.map((t) => `<li><a href="#/lesson/${t.lesson}">${esc(byId[t.lesson]?.title || t.lesson)}</a> <small>${KIND[t.kind]}: ${esc(t.why)}${t.for && byId[t.for] ? ` It underpins ${esc(byId[t.for].title)}.` : ""}</small></li>`).join("")}</ul>
      ${set.length ? `<div class="co-plist">${set.map(({ lesson, item }) => `<div class="co-prob"><div class="co-pmeta"><a href="#/lesson/${lesson}">${U} ${byId[lesson].unit.n} · ${esc(byId[lesson].title)}</a><span>${KIND[why[lesson].kind]}</span></div>${qHtml(item)}</div>`).join("")}</div>` : `<p class="co-empty">These lessons have no check questions yet. Reread them, or try their labs.</p>`}`;
    if (set.length) wirePractice(main.querySelector(".co-plist"), "problems", "weak");
  }
  const weakLink = () => { const n = weakTargets().length; return n ? `<a class="btn btn-ghost btn-sm" href="#/review/weak"><span>Target my weaknesses (${n})</span></a>` : ""; };
  const revisitLink = () => { const n = revisionQueue(S.attempts || [], { limit: 200 }).length; return n ? `<a class="btn btn-ghost btn-sm" href="#/review/questions"><span>Revisit ${n} ${n === 1 ? "question" : "questions"}</span></a>` : ""; };

  async function viewReview() {
    await reviewPool(); paintHud();
    const due = shuffle(dueCards()).slice(0, 30);
    const learned = Object.keys(S.cards).length, total = cardPool.length;
    if (!due.length) {
      const nl = resumeLesson();
      main.innerHTML = `<div class="co-panel">${emptyState({ icon: total ? "check" : "cards", title: total ? "All caught up" : "No flashcards yet",
        body: total ? `You've seen ${learned} of ${total} cards. The next ones come due as their intervals pass, so come back tomorrow.` : "Each lesson you study adds its flashcards here. Spaced repetition then brings every card back just before you'd forget it.",
        actions: [nl ? { label: total ? "Continue learning" : "Study a lesson to get cards", href: `#/lesson/${nl.id}`, primary: true } : null, { label: "Open the syllabus", href: "#/learn" }].filter(Boolean) })}<p class="co-row">${revisitLink()}</p></div>`;
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

  // ---------- Revise: every way to revise in one place, and the Target Test builder ----------
  async function viewRevise() {
    await reviewPool(); paintHud();
    const due = dueCards().length, total = cardPool.length, rq = revisionQueue(S.attempts || [], { limit: 200 }).length, w = weakTargets(), studied = Object.keys(S.done).length;
    const ready = units.filter((u) => unitDone(u) === u.lessons.length && !S.quiz[u.id]?.pass), written = units.filter(isWritten);
    const T = S.ttPrefs || { minutes: 10, focus: "mixed", scope: w.length ? "weak" : studied ? "studied" : "units", units: [] };
    const card = (icon, kick, h, d, href, cta, n, off) => `<${off ? "div" : `a href="${href}"`} class="cx-rcard ${off ? "off" : ""}"><span class="cx-rci">${ic(icon)}${n ? `<i>${n}</i>` : ""}</span><span class="co-kicker">${kick}</span><b>${h}</b><p>${d}</p><span class="cx-rgo">${cta} ${off ? "" : ic("right")}</span></${off ? "div" : "a"}>`;
    main.innerHTML = `<div class="co-intro"><span class="co-kicker">Revise</span><h2>Revise what matters most</h2><p>Learn → recall → apply → review → improve. Everything here comes from your own answers: what's due, what you got wrong, and what's slipping.</p></div>
      <div class="cx-rgrid">
        ${card("cards", "Spaced review", due ? `${due} flashcard${due === 1 ? "" : "s"} due` : total ? "All caught up" : "No cards yet", total ? `${Object.keys(S.cards).length} of ${total} cards seen. Each comes back just before you'd forget it.` : "Complete lessons and their flashcards join your review queue.", "#/review", due ? "Review now" : "Open", due, !due && !total)}
        ${card("clock", "Retrieval", rq ? `${rq} question${rq === 1 ? "" : "s"} to bring back` : "Nothing due", "Wrong answers return in hours; right ones at 1, 3, 7, 21 and 60 days.", "#/review/questions", "Revisit", rq, !rq)}
        ${card("target", "Weak spots", w.length ? `${w.length} weak lesson${w.length === 1 ? "" : "s"}` : "None measured", w.length ? esc(w.slice(0, 2).map((x) => byId[x.lesson]?.title).filter(Boolean).join(", ")) : "Only your own answers can mark something as weak. Nothing does yet.", "#/review/weak", "Practise", w.length, !w.length)}
        ${card("trophy", `${U} quizzes`, ready.length ? `${ready.length} quiz${ready.length === 1 ? "" : "zes"} ready` : "Quizzes", ready.length ? esc(ready.slice(0, 2).map((u) => `${U} ${u.n}: ${u.title}`).join(" · ")) : `Ten questions at the end of each ${u1}. Pass with 75% for +${XP.quiz} XP.`, ready.length ? `#/quiz/${ready[0].id}` : "#/learn", ready.length ? "Take it" : "See the syllabus", ready.length)}
      </div>
      <section class="cx-tt" id="tt">
        <div class="cx-tth"><span class="cx-tti">${ic("target")}</span><div><span class="co-kicker">Target test</span><h3>Build a test for exactly what you need</h3><p>Pick your time, your focus and what to cover. Gradify chooses the questions: weak lessons first, questions you got wrong, and ones you've never seen, spread across topics. Answers count towards your mastery.</p></div></div>
        <div class="cx-ttf">
          <fieldset><legend>How long have you got?</legend><div class="cx-chips">${LENGTHS.map((m) => `<button type="button" data-tm="${m}" aria-pressed="${T.minutes === m}">${m} min <small>${countFor(m)} questions</small></button>`).join("")}</div></fieldset>
          <fieldset><legend>Focus</legend><div class="cx-chips">${Object.entries(FOCUS).map(([k, f]) => `<button type="button" data-tf="${k}" aria-pressed="${T.focus === k}">${f.label} <small>${f.sub}</small></button>`).join("")}</div></fieldset>
          <fieldset><legend>Cover</legend><div class="cx-chips">
            <button type="button" data-ts="weak" aria-pressed="${T.scope === "weak"}" ${w.length ? "" : "disabled"}>My weak topics <small>${w.length ? `${w.length} lesson${w.length === 1 ? "" : "s"}` : "none measured yet"}</small></button>
            <button type="button" data-ts="studied" aria-pressed="${T.scope === "studied"}" ${studied ? "" : "disabled"}>Everything I've studied <small>${studied} lesson${studied === 1 ? "" : "s"}</small></button>
            <button type="button" data-ts="units" aria-pressed="${T.scope === "units"}">Choose ${u1}s</button></div>
            <div class="cx-ttunits" ${T.scope === "units" ? "" : "hidden"}>${written.map((u) => `<label><input type="checkbox" value="${u.id}" ${(T.units || []).includes(u.id) ? "checked" : ""}><span>${U} ${u.n}: ${esc(u.title)}</span><small>${pc(roll(idsOf(u)).coverage)}</small></label>`).join("")}</div></fieldset>
          <div class="cx-ttgo"><button type="button" class="btn btn-light lg" data-ttstart><span>${ic("play")} Start target test</span></button><small class="cx-ttnote"></small></div>
        </div>
      </section>
      <div class="cx-rmore">
        <a class="co-feat" href="#/problems"><b>Problem bank</b><p>Every question in the course, filtered by ${u1}, level and whether you've solved it.</p></a>
        ${cfg.exams ? `<a class="co-feat" href="#/exams"><b>Mock exams</b><p>Timed, marked at the end, with your weak areas identified.</p></a>` : ""}
        ${cfg.writing?.length ? `<a class="co-feat" href="#/write"><b>Written practice</b><p>Write an answer, then check it against a rubric or get AI feedback.</p></a>` : ""}
        ${cfg.authorities ? `<a class="co-feat" href="#/cases"><b>${esc(cfg.authorities)}</b><p>Every card from the lessons, searchable.</p></a>` : ""}
        ${ixs.length ? `<a class="co-feat" href="#/practice"><b>${esc(PL)}</b><p>${ixs.length} interactives with challenges that count as application.</p></a>` : ""}
      </div>`;
    const tt = main.querySelector(".cx-tt"), note = tt.querySelector(".cx-ttnote");
    const sync = () => {
      tt.querySelectorAll("[data-tm]").forEach((b) => b.setAttribute("aria-pressed", String(Number(b.dataset.tm) === T.minutes)));
      tt.querySelectorAll("[data-tf]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.tf === T.focus)));
      tt.querySelectorAll("[data-ts]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.ts === T.scope)));
      tt.querySelector(".cx-ttunits").hidden = T.scope !== "units";
      T.units = [...tt.querySelectorAll(".cx-ttunits input:checked")].map((x) => x.value);
      const ok = T.scope !== "units" || T.units.length;
      tt.querySelector("[data-ttstart]").disabled = !ok;
      note.textContent = ok ? `${countFor(T.minutes)} ${FOCUS[T.focus].label.toLowerCase()} questions, about ${T.minutes} minutes.` : `Choose at least one ${u1}.`;
    };
    tt.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b || b.disabled) return;
      if (b.dataset.tm) T.minutes = Number(b.dataset.tm); else if (b.dataset.tf) T.focus = b.dataset.tf; else if (b.dataset.ts) T.scope = b.dataset.ts;
      else if ("ttstart" in b.dataset) { S.ttPrefs = { ...T }; keep(); go(`target/${encodeTest(T)}`); return; }
      sync();
    });
    tt.addEventListener("change", sync);
    if (T.scope === "weak" && !w.length) T.scope = studied ? "studied" : "units";
    sync();
    if (location.hash.includes("#tt")) tt.scrollIntoView();
  }
  async function viewTarget(code) {
    const c = decodeTest(code), sw = strengths(sigs());
    const ids = (c.scope === "weak" ? [...new Set([...weakTargets().map((t) => t.lesson), ...sw.weak.map((x) => x.id)])].slice(0, 8)
      : c.scope === "studied" ? Object.keys(S.done) : c.scope === "units" ? units.filter((u) => c.units.includes(u.id)).flatMap(idsOf) : c.lessons).filter((id) => byId[id]);
    const scopeLabel = { weak: "your weak topics", studied: "what you've studied", units: units.filter((u) => c.units.includes(u.id)).map((u) => `${U} ${u.n}`).join(", "), lessons: ids.length === 1 ? byId[ids[0]].title : `${ids.length} lessons` }[c.scope];
    const empty = (h, d) => { main.innerHTML = `<div class="co-panel"><span class="co-kicker">Target test</span><h2>${h}</h2><p>${d}</p><div class="co-row"><a class="btn btn-light lg btn-sm" href="#/revise"><span>Build another test</span></a><a class="btn btn-ghost lg btn-sm" href="#/learn"><span>Syllabus</span></a></div></div>`; };
    if (!ids.length) return empty("Nothing to test yet", c.scope === "weak" ? "Nothing is measured as weak yet. Try a test on everything you've studied instead." : "Complete a lesson or two first, or choose some units to cover.");
    main.innerHTML = `<div class="co-panel"><p>Building your test…</p></div>`;
    const need = new Set(ids.map((id) => byId[id].unit.id));
    const notes = Object.assign({}, ...(await Promise.all(units.filter((u) => need.has(u.id)).map(unitNotes))));
    const pool = ids.flatMap((id) => (notes[id]?.items || []).filter((it) => QTYPES[it.Q.type]?.auto));
    const items = buildTargetTest(pool, { minutes: c.minutes, focus: c.focus, weak: c.scope === "weak" ? ids : sw.weak.map((x) => x.id), attempts: S.attempts || [] });
    if (!items.length) return empty("No questions here yet", "These lessons don't have check questions yet. Try a different scope.");
    const t0 = Date.now(), limit = c.minutes * 60e3, rows = [];
    let k = 0, right = 0, run = 0, best = 0, timer = null, over = false;
    const clock = () => { const left = Math.max(0, limit - (Date.now() - t0)), el = main.querySelector(".cx-timer"); if (el) { el.textContent = `${Math.floor(left / 6e4)}:${String(Math.floor((left % 6e4) / 1e3)).padStart(2, "0")}`; el.classList.toggle("low", left < 60e3); } if (!left && !over) { over = true; el?.classList.add("over"); const n = main.querySelector(".co-nextq"); if (n) n.querySelector("span").textContent = "Time's up · see your results"; toast(`${ic("clock")} Time's up. Finish this question, then see your results.`); } };
    timer = setInterval(clock, 1000); routeStop = () => clearInterval(timer);
    const step = () => {
      if (k >= items.length || (over && k > 0 && rows.length === k)) return finish();
      const it = items[k];
      main.innerHTML = `<div class="co-quiz cx-ttrun"><div class="cx-tthead"><a href="#/revise">${ic("left")} Revise</a><span class="co-kicker">Target test · ${FOCUS[c.focus].label} · ${esc(scopeLabel)}</span><span class="cx-timer" aria-label="Time left"></span></div>
        <div class="co-qbar"><i style="width:${(k / items.length) * 100}%"></i></div>
        <div class="cx-ttmeta"><span>Question ${k + 1} of ${items.length}</span><span>${right} right</span>${run >= 2 ? `<span class="cx-combo">${ic("flame")} ${run} in a row</span>` : ""}</div>
        <div class="co-panel">${qHtml(it)}<p class="co-from" hidden>From: <a href="#/lesson/${it.l.id}">${esc(it.l.title)}</a> · ${dot(statusOf(it.l.id))} ${STATUS[statusOf(it.l.id)].label}</p><button class="btn btn-light lg btn-sm co-nextq" hidden><span>${k < items.length - 1 && !over ? "Next question →" : "See your results"}</span></button></div></div>`;
      clock();
      wireQuestions(main, (key) => pageQs.get(key)?.Q, (Q, res, first, box, meta) => {
        if (box.classList.contains("done")) return;
        box.classList.add("done");
        record(it, "quiz", "target", res, meta); rows.push({ lesson: it.l.id, key: it.key, score: res.score });
        if (res.score >= 0.7) { right++; run++; best = Math.max(best, run); if ([3, 5, 8].includes(run)) comboPop(run); } else run = 0;
        box.querySelectorAll("button:not(.co-nextq), input, select, textarea").forEach((x) => { x.disabled = true; });
        main.querySelector(".co-from").hidden = false;
        const nb = main.querySelector(".co-nextq"); nb.hidden = false; nb.focus();
      });
      main.querySelector(".co-nextq").addEventListener("click", () => { k++; step(); });
    };
    const finish = async () => {
      clearInterval(timer); routeStop = null;
      const n = rows.length, p = n ? rows.reduce((a, r) => a + r.score, 0) / n : 0, ms = Date.now() - t0, by = targetResults(rows);
      // XP for each question solved for the first time (as in the problem bank), paid once at the end
      let gain = 0; for (const r of rows) if (r.score >= 0.7 && !S.solved[r.key]) { S.solved[r.key] = Date.now(); gain += XP.problem; }
      if (gain) save();
      const weakNow = by.filter((g) => g.mean < 0.7).map((g) => g.lesson);
      main.innerHTML = `<div class="cx-ttres">
        <div class="cx-ttscore">${ring(p, 132, 12, p >= 0.7 ? "good" : "")}<div><b>${pc(p)}</b><small>${Math.round(right * 10) / 10} of ${n} right</small></div></div>
        <div class="cx-ttsum"><span class="co-kicker">Target test · ${FOCUS[c.focus].label}</span><h2>${p >= 0.85 ? "Excellent." : p >= 0.7 ? "Solid work." : p >= 0.4 ? "Good practice: now you know where to look." : "That's what practice is for."}</h2>
          <p>${Math.floor(ms / 6e4)} min ${Math.round((ms % 6e4) / 1e3)} s${best >= 3 ? ` · best run ${best} in a row` : ""}${gain ? ` · +${gain} XP for newly solved questions` : ""}. These answers count as assessment evidence in your mastery.</p>
          <div class="co-row">${weakNow.length ? `<a class="btn btn-light lg btn-sm" href="#/target/${encodeTest({ minutes: Math.min(c.minutes, 10), focus: c.focus, scope: "lessons", lessons: weakNow })}"><span>${ic("target")} Practise the ones you missed</span></a>` : ""}<a class="btn btn-ghost lg btn-sm" href="#/revise"><span>New target test</span></a><a class="btn btn-ghost lg btn-sm" href="#/home"><span>Home</span></a></div></div></div>
        <section class="co-panel"><h3>By topic</h3><ul class="cx-bytopic">${by.map((g) => `<li><a href="#/lesson/${g.lesson}">${dot(statusOf(g.lesson))}${esc(byId[g.lesson].title)}</a><span class="cx-mbar"><i style="width:${Math.round(g.mean * 100)}%" class="${g.mean >= 0.85 ? "hi" : g.mean < 0.6 ? "lo" : ""}"></i></span><small>${g.right}/${g.n} · now ${STATUS[statusOf(g.lesson)].label.toLowerCase()}</small>${g.mean < 0.7 ? `<a class="cx-studynext" href="#/lesson/${g.lesson}">Study next →</a>` : "<span></span>"}</li>`).join("")}</ul></section>`;
      if (p >= 0.7) confetti();
      if (gain) await award(gain, "problem", `target:${t0}`, `${cfg.name}: target test ${pc(p)}`);
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
    main.innerHTML = `<div class="co-panel">${skeleton("cards", 4, "Loading the cards")}</div>`;
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
    main.innerHTML = `<div class="co-panel">${skeleton("list", 8, "Loading the problem bank")}</div>`;
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
      ${schools.length ? `<h4>By ${u1}</h4><ul class="co-weak">${schools.map(({ g, u }) => `<li><a href="#/learn/${u.id}">${U} ${u.n}: ${esc(u.title)}</a> <small>${g.mastery == null ? `${g.answers} answers: not enough evidence yet` : `${pc(g.mastery)}${g.weakest ? ` · weakest: ${label(g.weakest)}` : ""}`}${g.trend?.declining ? " · slipping: recent answers are weaker than before" : ""}</small></li>`).join("")}</ul>` : ""}
      ${labPracticeHtml()}
      <p>${revisitLink()} ${weakLink()}</p>
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
      .map((g) => ({ id: g.key, title: byId[g.key].title, note: `${g.mastery == null ? "not enough evidence" : `${Math.round(g.mastery * 100)}% mastery`}${g.weakest ? `, weakest ${g.weakest}` : ""}${g.calibration?.sureWrong ? `, ${g.calibration.sureWrong} confident mistakes` : ""}${g.trend?.declining ? ", recent answers weaker than earlier ones" : ""}` }));
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

  // the topic map: every lesson as a cell, coloured by its status, unit by unit. Completion and mastery side by side.
  // chapter prerequisites: authored (kit/learning/chapter-map.js), or derived from the course's concept graph
  const chapterPre = CHAPTER_PREREQS[cfg.slug] || chapterPrereqsFromConcepts(units, cfg.concepts);
  const courseMastery = () => masteryMap(units.map((u) => ({ n: u.n, id: u.id, title: u.title, lessons: idsOf(u) })), chapterPre, statusOf, (id) => (sigs().get(id)?.right || 0) > 0);
  function topicMapHtml() {
    const all = roll(lessons.map((l) => l.id)), { weak, strong } = strengths(sigs());
    return `<section class="co-panel cx-map"><h3>Topic map</h3>
      <p class="co-acct">Finishing a lesson isn't the same as knowing it. Coverage is what you've completed; mastery is what your answers show you can do, consistently. Every square is a lesson.</p>
      <div class="cx-maptiles">${[["Coverage", pc(all.coverage), `${all.done} of ${all.total} lessons`], ["Practised or better", all.counts.practised + all.counts.mastered, "completed and answered"], ["Mastered", all.counts.mastered, "consistently right"], ["Needs revision", all.counts.revise, "recent answers mostly wrong"], ["Accuracy", all.mastery == null ? "–" : pc(all.mastery), `latest answers, ${all.measured} lessons`]].map(([k, v, d]) => `<div><small>${k}</small><b>${v}</b><em>${d}</em></div>`).join("")}</div>
      <ul class="cx-legendrow">${STATUSES.map((x) => `<li>${dot(x.key)}${x.label} <b>${all.counts[x.key]}</b></li>`).join("")}</ul>
      <div class="cx-maprows">${units.map((u) => { const r = roll(idsOf(u)); return `<div class="cx-mr"><a class="cx-mrl" href="#/learn/${u.id}"><span>${u.n}</span>${esc(u.title)}</a><div class="cx-mrc">${u.lessons.map((l) => `<a href="#/lesson/${l.id}" class="s-${statusOf(l.id)}" title="${esc(l.title)}: ${STATUS[statusOf(l.id)].label}" aria-label="${esc(l.title)}: ${STATUS[statusOf(l.id)].label}"></a>`).join("")}</div><small>${pc(r.coverage)}${r.mastery != null ? ` · ${pc(r.mastery)} right` : ""}</small></div>`; }).join("")}</div>
      ${weak.length || strong.length ? `<div class="cx-sw">${[["Needs work", weak, "lo"], ["Strongest", strong, "hi"]].map(([h, list, cls]) => `<div><span class="co-kicker">${h}</span>${list.length ? `<ul>${list.slice(0, 5).filter((w) => byId[w.id]).map((w) => `<li><a href="#/lesson/${w.id}">${esc(byId[w.id].title)}</a><span class="cx-mbar"><i class="${cls}" style="width:${Math.round(w.latestMean * 100)}%"></i></span><small>${pc(w.latestMean)} · ${w.questions} q</small></li>`).join("")}</ul>` : `<p class="co-empty">Nothing yet.</p>`}</div>`).join("")}</div>` : ""}
      ${weak.length ? `<a class="btn btn-light lg btn-sm" href="#/target/${encodeTest({ minutes: 10, scope: "weak" })}"><span>${ic("target")} Target test on my weak topics</span></a>` : ""}</section>`;
  }

  async function viewMe() {
    const st = stats(), xp = st.xp, L = levelOf(xp), sk = streak();
    const byDay = {}; for (const r of S.log) byDay[day(r.t)] = (byDay[day(r.t)] || 0) + r.xp;
    const weeks = 18, start = weekStart() - (weeks - 1) * 7 * DAY;
    const cells = Array.from({ length: weeks * 7 }, (_, i) => { const t = start + i * DAY, d = day(t), v = byDay[d] || 0; return t > Date.now() ? "<i class=future></i>" : `<button style="--v:${Math.min(1, v / Math.max(S.goal, 1))}" data-day="${d}" title="${d}: ${v} XP"></button>`; }).join("");
    const last14 = Array.from({ length: 14 }, (_, i) => { const d = day(Date.now() - (13 - i) * DAY); return [d, byDay[d] || 0]; }), mx = Math.max(S.goal, ...last14.map((x) => x[1]));
    main.innerHTML = `<div class="co-intro"><span class="co-kicker">My progress</span><h2>Your ${esc(cfg.name)}</h2><p>Everything you've done here, and what's saved to your Gradify account. Your quests, achievements and progress in every subject are on <a href="/journey.html">your journey</a>.</p></div>
      <div class="co-tiles">${[["Level", L.n], ["Total XP", xp.toLocaleString()], ["Day streak", sk.n], ["Best streak", sk.best], ["Lessons", `${st.lessons} / ${lessons.length}`], ["Units cleared", st.units], ["Quizzes passed", st.quizzes], ["Problems solved", st.solved]].map(([k, v]) => `<div><small>${k}</small><b>${v}</b></div>`).join("")}</div>
      <section class="co-panel cx-mmwrap" id="mastery-map"></section>
      ${topicMapHtml()}
      ${masteryHtml()}
      ${insightHtml()}
      <section class="co-panel"><h3>Activity</h3><div class="co-heat">${cells}</div><p class="co-dayinfo">Pick a day to see what you did.</p></section>
      <section class="co-panel"><h3>XP, last 14 days</h3><div class="co-bars">${last14.map(([d, v]) => `<div title="${d}: ${v} XP"><i style="height:${(v / mx) * 100}%" class="${v >= S.goal ? "hit" : ""}"></i><small>${d.slice(8)}</small></div>`).join("")}<span class="co-goalline" style="bottom:${(S.goal / mx) * 100}%">goal ${S.goal}</span></div></section>
      <section class="co-panel"><h3>${TW}s</h3><div class="co-mastery">${cfg.tracks.map((t) => { const us = t.units.map((n) => units.find((u) => u.n === n)).filter(Boolean), tot = us.reduce((a, u) => a + u.lessons.length, 0), dn = us.reduce((a, u) => a + unitDone(u), 0); return `<div style="--a:${t.from};--b:${t.to}"><span>${esc(t.name)}</span><div class="co-bar"><i style="width:${(dn / tot) * 100}%"></i></div><small>${dn}/${tot}</small></div>`; }).join("")}</div></section>
      <section class="co-panel"><h3>Badges</h3>${[["Understanding", "Earned only from what your answers show you understand and remember. XP can't buy these.", true], ["Activity", "For keeping going: lessons, streaks, reviews and XP.", false]].map(([h, sub, u]) => `<h4>${h}</h4><p class="co-acct">${sub}</p><div class="co-badgelist">${BADGES.filter((b) => !!b.understanding === u).map((b) => `<div class="${b.ok(st) ? "on" : ""}">${ic(b.ok(st) ? "star" : "lock")}<b>${b.name}</b><small>${b.d}</small></div>`).join("")}</div>`).join("")}</section>
      <section class="co-panel co-saved"><h3>Saved to your account</h3>${skeleton("list", 3)}</section>`;
    // the mastery map (kit/learning/mastery-map.js): how the course fits together, and how far your answers have got
    renderMasteryMap(main.querySelector("#mastery-map"), courseMastery(), { hrefOf: (x) => `#/learn/${x.id}`, unitWord: U, title: "Your mastery map",
      intro: `Each ${u1} sits to the right of what it builds on, coloured by what your own answers show. Hover or focus one to see its foundations and what it opens up.` });
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
  // tries at each lab challenge in this sitting, so a success after a failure in the same sitting is a retry, not
  // first-try evidence (kit/learning/topic-status.js counts first tries only). The sitting ends when the learner goes
  // somewhere else, not when the page redraws in place (an account sync re-renders the same view). Only scored
  // outcomes are tries: touching a challenge without finishing it ("attempted") isn't.
  const labTries = { where: null, counts: new Map() };
  const labRecord = (x, task, label, outcome, extra = {}) => {
    const l = byId[x.evidence?.[task]]; if (!l) return null;
    const ok = outcome === "success" || outcome === "assisted_success";
    const attempt = nextLabTry(labTries, (routedHash ?? location.hash).split("/").slice(0, 3).join("/"), `${x.id}:${task}`, outcome);
    record({ Q: { type: "lab", d: 2, objectives: [] }, key: `ix:${x.id}:${task}`, v: null, l }, "practice", x.id,
      { score: ok ? 1 : 0, correct: ok, method: "auto", status: "final" }, { attempt, response: { challenge: label || task, outcome, evidence: EXPLORE.has(`ix:${x.id}:${task}`) ? "exploration" : "practice", ...extra } });
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
      // capture phase: the learner's touch is noted before the lab handles the event, so a challenge met by their very
      // first interaction still counts (it isn't mistaken for one met on opening)
      if (!el.dataset.watch) { el.dataset.watch = "1"; for (const ev of ["pointerdown", "input", "change", "keydown"]) el.addEventListener(ev, (e) => {
        labLast = x.id; labTouched.add(x.id);
        const t = labTry.get(x.id), now = Date.now();
        if (t && !e.target.closest?.("[data-try]") && now - t.last >= 1000) { t.moves++; t.last = now; }
      }, { passive: true, capture: true }); }
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
    main.innerHTML = `<div class="co-crumbs"><a href="${base}">← ${esc(WS.label)}</a><span>${esc(c.kind || "")}</span></div><div class="co-ws">${skeleton("text", 6)}</div>`;
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
    bq.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); palette.open(bq.value); } });
    br.addEventListener("click", (e) => { const b = e.target.closest("[data-pal]"); if (b) { e.preventDefault(); palette.open(b.dataset.pal); } });
    if (feat.length) mountIx(feat[0], main.querySelector(".co-herolab .co-labstage"));
  }

  // ---------- router ----------
  const go = (h) => { location.hash = `#/${h}`; };
  // lesson time (kit/course/lesson-time.js): active time on each lesson, how far down it, and how often it's opened
  const ledger = (e) => { try { storeNow?.logEvent?.({ site: cfg.site, ...e })?.catch?.(() => {}); } catch { /* best effort */ } };
  const lt = lessonTimer({ onStop: (v) => {
    if (v.ms < MIN_LOG_MS) return;
    const t = addTime(S, v); save();
    ledger({ event: "lesson_time", concept: `${cfg.slug}:${v.id}`, source: "course", response_ms: Math.min(3600000, v.ms), detail: { seconds: Math.round(v.ms / 1000), depth: Math.round(v.depth * 100) / 100, visits: t.v, done: Boolean(S.done[v.id]) } });
  } });
  addEventListener("scroll", () => { const h = document.documentElement; lt.scroll((h.scrollTop + innerHeight) / Math.max(1, h.scrollHeight)); }, { passive: true });
  for (const ev of ["pointerdown", "keydown", "touchstart"]) addEventListener(ev, () => lt.input(), { passive: true });
  document.addEventListener("visibilitychange", () => lt.visibility(document.visibilityState === "visible"));
  addEventListener("pagehide", () => lt.stop());
  let routeStop = null;   // a view's own clean-up (the target test's timer)
  let routedHash = null;
  async function route() {
    // a real change of place ends a lab sitting; a redraw of the same place (an account sync) doesn't. A try still
    // open when the learner leaves is recorded first, against the place they're leaving and in that sitting
    if (location.hash !== routedHash) { endTries(); routedHash = location.hash; labLeave(labTries); }
    unmountIx();
    lt.stop();
    lessonRail = null; readStop?.(); routeStop?.(); routeStop = null;
    // a dialog belongs to the view it opened on (the lesson-complete summary, a celebration, flashcards): moving to
    // another place by link, Back or the search closes it, so it never sits over the next page
    document.querySelectorAll(".co-modal").forEach((m) => m.remove());
    curLesson = null; curN = null; combo = 0;
    // a learner who has started lands on Home; someone new lands on the course's overview when it has one
    const started = Object.keys(S.done).length || (S.log || []).length || (S.recent || []).length;
    const home = cfg.overview && !started ? "overview" : "home";
    const [v0, arg, sec, how] = location.hash.replace(/^#\/?/, "").split("/"), v = v0 || home;
    const view = VIEWS.some(([id]) => id === v) || ["lesson", "quiz", "exam", "target"].includes(v) ? v : home;
    const tab = TAB_OF[view] || view;
    root.querySelectorAll(".co-tabs > a").forEach((a) => a.toggleAttribute("aria-current", a.dataset.v === tab));
    const inMore = MORE.some(([id]) => id === view) && !PRIMARY.some(([id]) => id === tab);
    moreBtn.classList.toggle("on", inMore); moreMenu.querySelectorAll("a").forEach((a) => a.toggleAttribute("aria-current", a.dataset.v === view));
    showTab(); closeMore(); drawer(false);
    const wide = ["home", "me", "features", "leaderboard", "tracks", "paths", "exams", "exam", "practice", "overview", "target", cfg.workspace?.route].includes(view);
    side.hidden = wide; root.querySelector(".co-body").classList.toggle("wide", wide);
    // the course outline stays beside a lesson or a quiz (a drawer on smaller screens)
    showTree(view === "lesson" || view === "quiz");
    // reading a lesson: the course's header, progress and tabs fold away so the lesson starts at the top
    root.classList.toggle("co-reading", view === "lesson");
    root.dataset.view = view;
    const fpref = (() => { try { return localStorage.getItem(FK) === "1"; } catch { return false; } })();
    if (view === "lesson") { if (fpref !== focusOn()) setFocus(fpref); } else if (focusOn()) { document.documentElement.classList.remove("cx-focus"); document.querySelector(".cx-focusx")?.remove(); }
    paintDock(view);
    // the trail of places (kit/ui/places.js): coming back to the previous place puts you where you were on it
    const arrived = arriveHere({ href: location.hash || "#/", kind: view, title: "" });
    hideBack();
    if (view !== "learn" && !(arrived.back && arrived.y)) scrollTo(0, 0);
    if (view === "learn") { if (arg) openUnit(arg); viewLearn(arg); }
    else if (view === "lesson") {
      await viewLesson(arg);
      if (sec) setTimeout(() => {
        const el = document.getElementById(sec); if (!el) return;
        scrollTo({ top: el.getBoundingClientRect().top + scrollY - 90, behavior: "instant" });
        // Continue learning lands on the section you were reading, and says so (one tap back to the top)
        const name = root.querySelector(`.co-toc a[data-jump="${sec}"]`)?.textContent || el.querySelector("h2, h3, h4")?.textContent || "";
        if (how === "resume") toast(`Picked up where you left off${name ? `: <b>${esc(name.trim())}</b>` : ""}`, { key: "resume", icon: "play", action: { label: "Start from the top", run: () => scrollTo({ top: 0 }) } });
      }, 60);
    }
    else if (view === "home") viewHome();
    else if (view === "revise") await viewRevise();
    else if (view === "target") await viewTarget(arg);
    else if (view === "quiz") await viewQuiz(arg);
    else if (view === "review") await (arg === "questions" ? viewRetrieval() : arg === "weak" ? viewWeak() : viewReview());
    else if (view === "paths") viewPaths();
    else if (view === "tracks") viewTracks();
    // exam preparation is Gradify Pro: timed exams and the complete question bank (unit quizzes and labs stay free)
    else if (["problems", "exams", "exam"].includes(view) && !(await access(await store())).has("exams")) { main.innerHTML = plusPanelHtml("exams", { pricing: "/pricing.html" }); promptPlus("exams", { pricing: "/pricing.html", signedIn: (await store())?.mode === "cloud" }); }
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
    // what this place is called (for "Back to …"), then where to put the page
    const title = view === "lesson" ? byId[arg]?.title : view === "quiz" ? `${U} ${units.find((u) => u.id === arg)?.n ?? ""} quiz` : (VIEWS.find(([id]) => id === view)?.[1] || main.querySelector("h2")?.textContent || cfg.name);
    arriveHere({ href: location.hash || "#/", kind: view, title: `${title}` });
    if (arrived.back && arrived.y && !sec) restoreScroll(arrived.y);
    // followed a link away from a lesson to an activity (its quiz, a target test, the flashcards…): offer the way back
    else if (!arrived.back && ["quiz", "target", "review", "practice", "exam", "problems", "cases", "write"].includes(view)) {
      const from = backPlace({ kinds: ["lesson"], within: 30 * 60e3 });
      if (from && trail().at(-2)?.href === from.href) offerBack(from, { label: "Back to" });
    }
    // came from "Explore related topics": the way back to the exact spot in the lesson you left
    if (returnTo && view === "lesson" && !location.hash.startsWith(returnTo.href.split("/").slice(0, 3).join("/"))) offerBack(returnTo, { label: "Back to", ms: 30000 });
    returnTo = null;
    // a subtle entrance, so moving between views feels continuous rather than a jump cut
    main.classList.remove("cx-enter"); void main.offsetWidth; main.classList.add("cx-enter");
  }
  // remember how far down each place the learner was (for going back to it)
  let scrollT = null;
  addEventListener("scroll", () => { clearTimeout(scrollT); scrollT = setTimeout(() => rememberScroll(scrollY), 150); }, { passive: true });
  addEventListener("hashchange", route);
  pullProgress();
  route();
  reviewPool().then(paintHud);
  return { state: () => S, lessons, units };
}
