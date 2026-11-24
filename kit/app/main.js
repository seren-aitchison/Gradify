// Gradify app: bring your notes, get a checked study pack, revise it, and watch your progress.
// Every screen reads and writes the same store, so they always agree.
import { heroArt } from "../ui/art.js";
import { toast as uiToast } from "../ui/feedback.js";
import { GROUPS } from "../core/sites.js";
import { icon } from "../core/icons.js";
import { actionCard } from "../core/action-card.js";
import { tile, ink } from "../core/colour.js";
import { SAMPLE, readFile } from "../notes/studio.js";
import { renderJot, jotStripHtml, wireJotStrip, takePackDraft, exportJots, clearJots } from "../notes/jot.js";
import { LocalStore, CloudStore, cloudConfigured, scopeToSite, authProviders } from "../data/store.js";
import { describePlan, mySubscription, myAllowance, openPortal, startCheckout, AI_ALLOWANCES, PLAN_PRICES } from "../data/billing.js";
import { OFFER, captureOffer, offerToShow, storedOffer, dismissOffer, offerForAccount, offerTerms } from "../data/offer.js";
import { learnerOf, saveLearner, syncMirror, needsSetup, applyPrefs, PRIOR } from "../data/profile.js";
import { trackView } from "../core/analytics.js";
import { captureFirstTouch, recordFirstTouch } from "../core/attribution.js";
captureFirstTouch();
applyPrefs();
import { currentSite, nameHtml, pathOf } from "../core/site.js";
// on a sub-site (getgradify.com/medgradify/), the app belongs to that site
const SITE = currentSite();
// the Pro launch offer, kept from the campaign link through sign-in and set-up (kit/data/offer.js)
captureOffer();
trackView(SITE || "Gradify app");
import { generate, regenerateCard, generateQuestions } from "../notes/engine.js";
import { reviewCard } from "../notes/pack.js";
import { gradeTyped, VERDICT_TEXT } from "../learning/typed.js";
import { focusFromProfiles } from "../learning/focus.js";
import { access, plusPanelHtml, promptPlus, deviceStatus, switchDevice, readOnly } from "../data/plan.js";
import { schedule, preview, isDue, isLearned, fmtInterval, RATINGS } from "../learning/srs.js";
import { topicProfiles, practiceOrder, LEVELS } from "../learning/mastery.js";
import { sixHtml, calibrationHtml, HOW } from "../learning/mastery-view.js";
import { levelOf as gameLevelOf } from "../game/engine.js";
import { loadLearner, COURSES, LIVE_COURSES, leafKind } from "../learning/learner-data.js";
import { mountJourney, journeySummary } from "../game/journey.js";
import { AREAS, METRICS, PERIODS, HABIT_MODES, validateGoal, goalProgress, focusGoals } from "../learning/goals.js";
import { goalData } from "../learning/goal-data.js";
import { PLUS_ON_SALE } from "../data/billing.js";
import { cockpitHtml, wireCockpit, welcomeHtml } from "./cockpit.js";
import { hydrate as glassIcons } from "../core/glass-icons.js";
import { haptic, hapticsOn, setHaptics, hapticsSupported } from "../core/haptics.js";
import { complete } from "../core/complete.js";
import { offerInstall, countVisit } from "../core/install.js";
import { loadModel } from "../intel/model.js";
import { intelOf } from "../intel/schedule.js";
import { runAutopilot, briefingHtml, catchUpHtml, opportunitiesWidget, tellHtml, wireTell, decomposeHtml, wireDecompose, wireAutopilot, modesHtml } from "./autopilot-views.js";
import { modeOf } from "../intel/autopilot.js";
import { record, answerEvent, forgotEvent, stageEvents } from "../intel/ledger.js";
import { learnerMemory } from "../intel/memory.js";
import { boardHtml, wireBoard, DEFAULT_WIDGETS } from "./widgets.js";
import { notifyPanelHtml, wireNotify, notifyAskHtml, wireNotifyAsk, startReminders } from "./notify-views.js";
import { mountIntel3 } from "./intel3-views.js";
import { plannerHtml, wirePlanner, renderSession, sessionPill } from "./session-views.js";
import { orderCards } from "../intel/order.js";
import { weightedGraph, usable } from "../intel/graph.js";
import { dependencyGraph } from "../intel/debt.js";
import { renderAcademic, academicPanelHtml, wireAcademicPanel } from "./academic-views.js";
import { renderMy, MY_CHILD } from "./my-views.js";
import { calendarPanelHtml, wireCalendar, intelStripHtml, nextHtml, upcomingHtml, rescheduleHtml, forecastWidget, askWidget, conceptPileWidget, wireIntel, applyMoves, renderIntelPage, renderKnowledgePage, renderRevisePage, askHtml, wireAsk, smartPlanHtml, wireSmartPlan, planWeek } from "./intel-views.js";

const $ = (s, el = document) => el.querySelector(s);
import { esc } from "../core/text.js";
const DAY = 864e5;
const dayKey = (d) => { const x = new Date(d); return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`; };
const today = () => dayKey(new Date());
const n0 = (x) => Number(x || 0).toLocaleString("en-GB");
const fmtDate = (d, o = { day: "numeric", month: "short" }) => new Date(d).toLocaleDateString("en-GB", o);
const SITES = GROUPS.flatMap((g) => g.items).filter((s) => s.n !== "Klerio");
const siteOf = (n) => SITES.find((s) => s.n === n) || { n: "Gradify", c: "f055dd", i: "sparkles" };
// the same level curve as every course and the Journey page (kit/game/engine.js)
const levelOf = (xp) => gameLevelOf(xp).n;
const xpForLevel = (l) => 50 * (l - 1) * l;
const SEC_PER_CARD = 25;
// FSRS options: the learner's desired retention, and their exam date (no card is scheduled after it)
const srsOpts = () => ({ retention: Number(learnerOf(profile).intel?.retention) || 0.9, examDate: profile.exam_date || null });

let store, profile, view = $("#view");
// what this learner's plan includes (kit/data/plan.js); everything is open until Pro goes on sale
let ACCESS = { plan: "free", enforced: false, has: () => true };
// dashboard widgets that are Gradify Intelligence (Pro): forecasts, readiness, planning by conversation, suggestions
const INTEL_WIDGETS = new Set(["s-ready", "w-forecast", "w-tell", "w-opps", "w-debt", "b-exam"]);

// ---------- Toast ----------
// the shared toast (kit/ui/feedback.js): the same on every Gradify page; opts.undo adds Undo
function toast(msg, opts = {}) { return uiToast({ html: msg }, { timeout: 4500, ...opts }); }

// ---------- Derived numbers (one place, used by every screen) ----------
async function stats() {
  const [cards, acts, allReviews, docs] = await Promise.all([store.listCards(), store.listActivity(400), store.listReviews(400), store.listDocuments()]);
  const reviews = allReviews.filter((r) => Date.parse(r.reviewed_at) >= Date.now() - 30 * DAY);
  const byDay = {};
  for (const a of acts) { const k = dayKey(a.at); byDay[k] = (byDay[k] || 0) + 1; }
  let streak = 0;
  for (let d = new Date(), first = true; ; first = false) {
    const k = dayKey(d);
    if (byDay[k]) streak++; else if (!first) break;
    d = new Date(+d - DAY);
    if (streak > 3650) break;
  }
  let longest = 0, run = 0;
  for (let i = 365; i >= 0; i--) { if (byDay[dayKey(Date.now() - i * DAY)]) longest = Math.max(longest, ++run); else run = 0; }
  const live = cards.filter((c) => !c.suspended);
  const due = live.filter((c) => isDue(c));
  const learned = live.filter(isLearned);
  const right = reviews.filter((r) => r.rating !== "again").length;
  return {
    cards: live, due, learned, docs, acts, byDay, streak, longest,
    accuracy: reviews.length ? right / reviews.length : null, reviews30: reviews.length,
    // readiness: average mastery across topics, weighted by how many cards each has
    topics: topicProfiles(live, allReviews, { examDate: profile.exam_date || null }),
    get readiness() { const t = this.topics, n = t.reduce((a, x) => a + x.cards, 0); return n ? t.reduce((a, x) => a + x.mastery * x.cards, 0) / n : 0; },
    xp: profile.xp || acts.reduce((a, x) => a + (x.xp || 0), 0),
  };
}

// ---------- LifeOS sections ----------
// One navigation for every Gradify site's app, drawn here so the 33 app pages share it. Five sections, each a plain
// group of the screens it holds, so every screen is one click from anywhere and nothing waits behind a "More":
//   Today     what to do now and when        Learn     what you study from
//   Study     what you practise with         Library   what you keep        Progress  how it's going
// Settings sits on its own at the end (and behind the account button in the top bar). Every screen keeps its own URL.
// [section id, label, icon, [[route, label, icon], …]]; a section opens its first screen
const SECTIONS = [
  ["today", "Today", "home", [["today", "Today", "home"], ...(MY_CHILD.test(SITE || "") ? [] : [["my", "MyGradify", "cap"]]), ["plan", "Smart Plan", "calendar"], ["goals", "Path", "route"]]],
  ["learn", "Learn", "cap", [["learning", "Courses", "cap"], ["knowledge", "My Knowledge", "brain"], ["earth", "Earth", "globe"]]],
  ["study", "Study", "layers", [["study", "Flashcards", "layers"], ["revise", "Revision Centre", "checklist"], ["tools", "Tools", "forge"], ["ai", "Gradify AI", "bulb"]]],
  ["library", "Library", "book", [["notes", "Notes", "feather"], ["library", "Your library", "book"], ["new", "Add notes", "upload"], ["community", "Community", "people"]]],
  ["progress", "Progress", "trend", [["progress", "Progress", "trend"], ["intel", "Intelligence", "sparkles"]]],
];
const SETTINGS = ["account", "Settings", "cog"];
// screens that belong to another screen's place in the navigation (a pack lives in your library, a topic in Progress)
const SCREEN_OF = { academic: "my", deck: "library", jot: "notes", topic: "progress", goal: "goals", session: "study" };
const screenOf = (route) => SCREEN_OF[route] || route;
const sectionOf = (route) => SECTIONS.find(([, , , screens]) => screens.some(([r]) => r === screenOf(route)))?.[0] || null;
const screenLabel = (route) => (route === "account" ? SETTINGS[1] : SECTIONS.flatMap(([, , , x]) => x).find(([r]) => r === screenOf(route))?.[1]) || "";
const currentRoute = () => location.hash.replace(/^#\/?/, "").split("/")[0] || "today";
function paintSide(side) {
  const link = ([r, label, ic]) => `<a href="#/${r}" data-route="${r}">${icon(ic)}<span>${label}</span></a>`;
  side.innerHTML = `<span class="lo-side-title">Gradify</span>
    ${SECTIONS.map(([id, label, , screens]) => `<div class="lo-sec" data-section="${id}" role="group" aria-labelledby="lo-sec-${id}"><span class="lo-sec-label" id="lo-sec-${id}">${label}</span>${screens.map(link).join("")}</div>`).join("")}
    <div class="lo-sec lo-sec-end">${link(SETTINGS)}</div>`;
  markCurrent();
}
// which screen and section are open: the screen's link, the section's tab, and the phone's screen row
function markCurrent() {
  const route = currentRoute(), screen = screenOf(route), section = sectionOf(route);
  document.querySelectorAll(".lo-side a, .sec-screens a").forEach((a) => a.setAttribute("aria-current", a.dataset.route === screen ? "page" : "false"));
  document.querySelectorAll(".tabbar a").forEach((a) => a.setAttribute("aria-current", String(a.dataset.section === section)));
  document.querySelectorAll(".lo-sec[data-section]").forEach((g) => g.classList.toggle("open", g.dataset.section === section));
  paintScreens(section);
}
// below the sidebar's width: the open section's screens as a row of pills above the page, so a sibling screen is one tap
function paintScreens(section) {
  let row = document.querySelector(".sec-screens");
  if (!row) {
    row = document.createElement("nav"); row.className = "sec-screens"; row.setAttribute("aria-label", "This section");
    document.querySelector("#view")?.before(row);
    row.addEventListener("click", (e) => { if (e.target.closest("a")) haptic("tap"); });
  }
  const sec = SECTIONS.find(([id]) => id === section), screen = screenOf(currentRoute());
  row.hidden = !sec || sec[3].length < 2;
  row.innerHTML = sec ? sec[3].map(([r, label]) => `<a class="chip" href="#/${r}" data-route="${r}" aria-current="${r === screen ? "page" : "false"}">${label}</a>`).join("") : "";
}
function drawNav() {
  // the LifeOS sidebar (wide screens); the top bar keeps the brand and account
  let side = document.querySelector(".lo-side");
  if (!side) {
    side = document.createElement("nav");
    side.className = "lo-side"; side.id = "lo-side"; side.setAttribute("aria-label", "Gradify sections");
    document.querySelector("#view")?.before(side);
    document.querySelector("#view")?.parentElement.classList.add("lo-shell");
  }
  paintSide(side);
  // phones and tablets: the five sections in the tab bar (each opens its first screen) and the section's screens above the page
  for (const nav of document.querySelectorAll(".tabbar")) {
    nav.innerHTML = SECTIONS.map(([id, label, ic, screens]) => `<a href="#/${screens[0][0]}" data-section="${id}">${icon(ic)}<span>${label}</span></a>`).join("");
  }
  side.addEventListener("click", (e) => { if (e.target.closest("a")) haptic("tap"); });
  document.querySelector(".tabbar")?.addEventListener("click", (e) => { if (e.target.closest("a, button")) haptic("tap"); });
  markCurrent();
}
drawNav();
// a small lock on the sections that need Gradify Pro, once the learner's plan is known (only while Pro is on sale)
const LOCKED = { intel: "intelligence" };
function markLocks() {
  for (const a of document.querySelectorAll(".lo-side a, .tabbar a")) {
    const f = LOCKED[a.dataset.route], locked = Boolean(f && ACCESS.enforced && !ACCESS.has(f));
    a.classList.toggle("plus-locked", locked);
    a.querySelector(".nav-lock")?.remove();
    if (locked) { a.insertAdjacentHTML("beforeend", `<span class="nav-lock" title="Gradify Pro">${icon("lock")}</span>`); a.setAttribute("aria-label", `${a.textContent.trim()} (Gradify Pro)`); }
  }
}
// the pricing page lives on getgradify.com; sub-sites served elsewhere link to it there
const PRICING = /(^|\.)getgradify\.com$|^localhost/.test(location.hostname) ? "/pricing.html" : "https://getgradify.com/pricing.html";

// ---------- Router ----------
const routes = { offer: renderOffer, today: renderToday, start: renderStart, new: renderNew, deck: renderDeck, study: renderStudy, topic: renderTopic, progress: renderProgress, plan: renderPlan, account: renderAccount, academic: renderAcademicRoute, my: renderMyRoute };
// ---------- Section tabs: each LifeOS section's own top bar ----------
// Every section's page is split into a few panes, shown one at a time from tabs in the top bar (white labels, a
// rainbow line under the one that's open), so each is a short scroll. A pane is an element marked data-pane="id", or
// one matching the tab's selectors; anything else (the page's heading) shows on every tab. The tab a learner was on
// is remembered for each section during the visit.
const SECTION_TABS = {
  today: [["overview", "Overview", ".cp-welcome, .notify-ask, .ap-brief, .ap-catch, .i-resched, .i-next"], ["widgets", "Widgets", ".board"]],
  intel: [["overview", "Overview", ".intel-strip"], ["readiness", "Readiness", ""], ["free", "Free time", ""], ["evidence", "Concepts", ""], ["cards", "Card coach", ""], ["learning", "How you study", ""], ["control", "Controls", ""], ["log", "Activity", ""]],
  plan: [["day", "Day", ".ap-catch, .i-resched, .i-dayplan"], ["tell", "Tell Gradify", ".ap-tell"], ["week", "Week", "h2.lo-h, .add-block, .week-list"], ["month", "Month", ".cal-top"], ["calendars", "Calendars", ".cal-sync"]],
  revise: [["queue", "Queue", ".seg-chips, .r-list, .revise-page > article.panel:not([data-pane])"], ["breakdown", "Break it down", ""], ["ease", "Ease off", ""]],
  knowledge: [["stages", "Stages", ".k-funnel, .k-grid, .knowledge-page > article.panel:not([data-pane])"], ["debt", "Knowledge debt", ""], ["courses", "Courses", ""]],
  progress: [["year", "Your year", ".today > article.panel, section > article.panel:first-of-type"], ["mastery", "Mastery", ".prog-grid"], ["journey", "Level and quests", ".lo-journey"]],
  account: [["account", "Account", "#plan-panel, article:has(#signin), article:has(#signout), article:has(.signin)"], ["learning", "Your learning", "form.setup-form"], ["prefs", "Preferences", ".notify, article:has(#haptics)"], ["data", "Your data", "article:has(#export)"]],
  ai: [["ask", "Ask Gradify", ".i-ask"], ["features", "Gradify AI", ".ai-allow, .ai-tools, .ai-route > p.sub:last-child"]],
};
const activeTab = new Map();
function tabify(name) {
  const bar = document.querySelector(".app-nav");
  const tabs = SECTION_TABS[name], root = view.querySelector(":scope > section") || view;
  const label = screenLabel(name);
  if (!tabs) { if (bar) bar.innerHTML = label ? `<span class="tab-title">${esc(label)}</span>` : ""; return; }
  const ids = tabs.map(([id]) => id);
  const paneOf = (el) => {
    if (el.dataset.pane && ids.includes(el.dataset.pane)) return el.dataset.pane;
    for (const [id, , sel] of tabs) if (sel && sel.split(",").some((x) => { try { return el.matches(x.trim()); } catch { return false; } })) return id;
    return el.dataset.pane ? ids[ids.length - 1] : null;
  };
  const kids = [...root.children].map((el) => ({ el, pane: paneOf(el) }));
  const present = ids.filter((id) => kids.some((k) => k.pane === id));
  if (present.length < 2) { if (bar) bar.innerHTML = `<span class="tab-title">${esc(label)}</span>`; return; }
  let cur = activeTab.get(name);
  if (!present.includes(cur)) cur = present[0];
  const show = (id) => {
    cur = id; activeTab.set(name, id);
    for (const k of kids) if (k.pane) k.el.hidden = k.pane !== id;
    bar?.querySelectorAll("[data-tab]").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.tab === id)));
    root.dataset.tab = id;
  };
  if (bar) {
    bar.innerHTML = tabs.filter(([id]) => present.includes(id)).map(([id, l]) => `<button type="button" role="tab" data-tab="${id}" aria-selected="false">${esc(l)}</button>`).join("");
    bar.setAttribute("role", "tablist");
    bar.onclick = (e) => { const b = e.target.closest("[data-tab]"); if (!b) return; haptic("tap"); show(b.dataset.tab); scrollTo({ top: 0, behavior: "smooth" }); };
  }
  show(cur);
}

// ---------- Gradify Intelligence: one model for every screen ----------
// In "auto" mode, missed Gradify blocks are moved first (once per visit to a screen), then the model is rebuilt.
async function model({ autoMove = true } = {}) {
  const L = await learnerAcross().catch(() => null);
  const courseNext = (L?.next || []).filter((x) => x.site);
  let m = await loadModel(store, profile, { courseNext, courses: L?.courses || [] });
  // Adaptive and Autopilot act on their own (moving missed sessions, keeping the week planned, recovering), then
  // the model is rebuilt so the screen shows the result; every change is in the log with an undo
  if (autoMove && ACCESS.has("intelligence") && modeOf(m.intel) !== "copilot") {
    const made = await runAutopilot(m, apctx()).catch((e) => { console.warn("Autopilot", e); return []; });
    if (made.length) { profile = await store.getProfile(); m = await loadModel(store, profile, { courseNext, courses: L?.courses || [] }); }
    m.made = made;
  }
  m.L = L;
  m.storeMode = store.mode;
  if (!remindersStarted && m.intel.notify?.on) { remindersStarted = true; startReminders(() => model({ autoMove: false }), m.intel.notify); }
  return m;
}
let remindersStarted = false;
async function saveIntel(patch) {
  const cur = intelOf(learnerOf(profile));
  await saveLearner(store, { intel: { ...cur, ...patch } });
  profile = await store.getProfile();
}
const rerender = () => route();
const apctx = () => ({ store, toast, rerender, saveIntel, intel: () => intelOf(learnerOf(profile)), saveProfile: async (p) => { profile = await store.saveProfile(p); } });
// a gentle flow in as each screen opens. Boxes keep one quiet border, so colour is left for what matters on the screen.
function decorate(root) {
  const boxes = root.querySelectorAll(".panel, .cp-card, .cp-mini, .wd:not(.wd-raw), .i-next, .i-dayplan, .i-resched, .k-card, .r-list > li > a, .ai-tool, .start-card:not(.primary)");
  boxes.forEach((el, i) => { el.style.setProperty("--i", Math.min(i, 14)); el.classList.add("flow"); });
}

async function route() {
  // #/name/arg/…: each view gets its first argument, and any further parts of the route (#/goal/edit/<id>)
  const [name, arg, ...more] = (location.hash.replace(/^#\/?/, "") || "today").split("/");
  // someone new can try Gradify first: add notes (or the sample), get a pack, study it.
  // Opening the app itself ("Open Gradify", "Start free": no screen named) lands someone new on Bring your notes.
  // Any screen they ask for opens directly: set-up (#/start, "What do you want to achieve?") is never put in front of
  // a destination. It's offered instead, as a card on Today and from Account (docs/product/UX-SPEC.md, onboarding).
  if (needsSetup(profile) && !location.hash.replace(/^#\/?/, "")) { location.replace("#/new"); return; }
  markCurrent();
  document.body.classList.remove("side-open");
  // a Pro prompt belongs to the screen that opened it: leaving the screen closes it
  document.querySelector("dialog.plus-prompt")?.close();
  view.innerHTML = '<div class="loading" aria-busy="true"></div>';
  try { await (routes[name] || renderToday)(arg, more); } catch (e) { console.error(e); view.innerHTML = `<div class="panel glass"><h3>Something went wrong</h3><p class="sub">${esc(e.message)}</p></div>`; }
  decorate(view);
  tabify(name);
  sessionPill(name);
  // 3D glass icons from the learner's subject set (kit/core/glass-icons.js), matched to each card, pack and lesson
  glassIcons(view, profile.site || "Gradify").catch(() => {});
  // Google sign-in is offered only when the project has it switched on (see authProviders in kit/data/store.js)
  if (view.querySelector("#google, #save-google")) authProviders().then((p) => { if (!p.google) view.querySelectorAll("#google, #save-google").forEach((b) => { b.hidden = true; }); });
  view.focus({ preventScroll: true });
  scrollTo(0, 0);
}

// ---------- First-time setup ----------
const GOALS = [
  { id: "exam", t: "Pass an exam", d: "Revise for a test with a date", i: "flame" },
  { id: "course", t: "Keep up with my course", d: "Turn every lecture into flashcards", i: "cap" },
  { id: "qualification", t: "Get a qualification", d: "Professional or career exams", i: "award" },
  { id: "curious", t: "Learn something new", d: "No deadline, just progress", i: "bulb" },
];
const picks = {}; // choices made during setup, saved together at the end
// accessibility settings, shared by set-up and Account; applied on every Gradify site
const prefsFields = (pr) => `<fieldset class="setup-prefs"><legend>Display</legend>
  <label class="check"><input type="checkbox" name="motion" ${pr.motion === "reduce" ? "checked" : ""}> <span>Reduce motion (no animations)</span></label>
  <label class="check"><input type="checkbox" name="text" ${pr.text === "large" ? "checked" : ""}> <span>Larger text</span></label>
  <label class="theme-pick"><span>Appearance <em>on this device, on every Gradify site</em></span><select name="theme">${[["dark", "Dark"], ["light", "Light"], ["system", "Match my device"]].map(([v, l]) => `<option value="${v}" ${(globalThis.gradifyTheme?.get() || "dark") === v ? "selected" : ""}>${l}</option>`).join("")}</select></label></fieldset>`;
// appearance is a choice for this device (kit/core/theme-boot.js), so it's applied here rather than saved to the account
const prefsFrom = (f) => { if (f.get("theme")) globalThis.gradifyTheme?.set(f.get("theme")); return { motion: f.get("motion") ? "reduce" : "auto", text: f.get("text") ? "large" : "normal" }; };
// the subjects most learners pick, shown first in set-up; the rest are one tap (or a search) away
// what learners call each site's subject: set-up asks about subjects, not site names
const SUBJECT = {
  UnderGradify: "Any university subject", PostGradify: "Postgraduate study and research", ProGradify: "Professional skills and CPD",
  EduGradify: "Teaching", YouthGradify: "School and GCSEs (13 to 18)", JuniorGradify: "Primary school (5 to 12)",
  LawGradify: "Law", BusinessGradify: "Business and management", FinanceGradify: "Finance and accounting", InvestorGradify: "Investing",
  MedGradify: "Medicine", DentalGradify: "Dentistry", VetGradify: "Veterinary science", NurseGradify: "Nursing and midwifery",
  PharmaGradify: "Pharmacy", HealthGradify: "Health and wellbeing", PsychGradify: "Psychology", InternshipGradify: "Internships and work experience",
  EngineerGradify: "Engineering", MathGradify: "Maths", SciGradify: "Biology, chemistry and physics", EcoGradify: "Ecology and environment",
  SocGradify: "Sociology", HistoryGradify: "History", LitGradify: "English and literature", LanguageGradify: "Languages",
  ArtGradify: "Art and design", MusicGradify: "Music", SportGradify: "Sport and exercise science", CreateGradify: "Design and creativity",
  "TechGradify · ForgeLab": "Coding, data science and AI",
};
const subjectOf = (n) => SUBJECT[n] || String(n || "").replace(" · ForgeLab", "");
const POPULAR = ["UnderGradify", "MedGradify", "LawGradify", "NurseGradify", "PsychGradify", "BusinessGradify"];
const pickBtn = (s) => `<button type="button" class="site-pick ${profile.site === s.n ? "on" : ""}" data-site="${esc(s.n)}" data-s="${esc((subjectOf(s.n) + " " + s.n + " " + s.d).toLowerCase())}" style="--c:#${s.c};--tile:${tile(s.c)};--ink:${ink(s.c)}"><span class="icon">${icon(s.i)}</span><span><b>${esc(subjectOf(s.n))}</b><em>${esc(s.who || s.d.split(/[:.]/)[0])}<small>on ${esc(s.n.replace(" · ForgeLab", ""))}</small></em></span></button>`;

// ---------- Save your work: the sign-up ask, shown once a learner has something worth keeping ----------
function savePanel(title, line) {
  return `<article class="panel glass save-panel" id="save-panel"><div><h3>${title}</h3><p class="sub">${line}</p></div>
    <form id="save-signin" class="signin"><label class="sr-only" for="save-email">Email</label><input id="save-email" type="email" required placeholder="you@example.com" autocomplete="email"><button class="btn btn-primary lg btn-sm" type="submit"><span>Email me a link</span></button></form>
    <button type="button" class="btn btn-light lg btn-sm" id="save-google"><span>Continue with Google</span></button>
    <p class="sub save-fine">Free. No password, no card. Everything on this device moves into your account.</p></article>`;
}
function wireSavePanel() {
  $("#save-signin")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector("button");
    btn.disabled = true;
    try { await store.signInWithEmail($("#save-email").value.trim()); $("#save-panel").innerHTML = `<div><h3>Check your email</h3><p class="sub">We've sent a sign-in link to ${esc($("#save-email").value.trim())}. Open it on this device and your pack is saved to your account.</p></div>`; }
    catch (err) { btn.disabled = false; toast(esc(err.message)); }
  });
  $("#save-google")?.addEventListener("click", () => store.signInWithGoogle().catch((err) => toast(esc(err.message))));
}
// once signed in: an easy way to bring a study group along (tagged, so invites show up in first_touch)
function sharePanel() {
  return `<article class="panel glass share-panel"><div><h3>Revising with friends?</h3><p class="sub">Send them Gradify. They can turn their own notes into checked flashcards in about a minute, free.</p></div>
    <button type="button" class="btn btn-light lg btn-sm" id="share-gradify"><span>Share Gradify</span></button></article>`;
}
function wireSharePanel() {
  $("#share-gradify")?.addEventListener("click", async () => {
    const url = "https://getgradify.com/?utm_source=invite&utm_medium=share";
    const text = "I'm using Gradify to turn my notes into flashcards. It's free:";
    try { if (navigator.share) { await navigator.share({ title: "Gradify", text, url }); return; } } catch { return; /* cancelled */ }
    try { await navigator.clipboard.writeText(`${text} ${url}`); toast("Link copied. Paste it in your group chat."); } catch { toast(url); }
  });
}

// ---------- The Gradify Pro launch offer ----------
// Shown to learners on Free who came from the campaign link (kit/data/offer.js): a full screen straight after set-up,
// then a card on Today they can dismiss. Claiming it opens Stripe Checkout with the code already applied.
const signedIn = () => store?.mode === "cloud";
function currentOffer({ includeDismissed = false } = {}) {
  return offerToShow({ plan: ACCESS.enforced ? ACCESS.plan : "free", learner: learnerOf(profile), includeDismissed });
}
const OFFER_PERKS = [
  ["calendar", "Smart Plan autopilot", "Your week planned for you, and kept on track when life gets in the way."],
  ["trend", "Readiness forecasts", "How ready you are for your exam, and the cards that matter most and are fading first."],
  ["clock", "Exam preparation", "Timed exams over each part of a course and the whole course, and the complete question bank."],
  ["bell", "Calendar sync and reminders", "Plan around Google, Apple or Outlook, with reminders even when Gradify is closed."],
];
function offerClaimHtml(id) {
  return signedIn()
    ? `<button type="button" class="btn btn-primary lg" data-claim id="${id}"><span>Claim my £5 month</span></button>`
    : `<a class="btn btn-primary lg" href="#/account"><span>Sign in to claim</span></a>`;
}
function offerCardHtml() {
  const o = currentOffer();
  if (!o) return "";
  return `<article class="panel glass offer-card" aria-labelledby="offer-card-h">
    <button type="button" class="offer-x" data-dismiss-offer aria-label="Dismiss the offer">✕</button>
    <span class="offer-kicker">Launch offer · ends ${esc(OFFER.endsLabel.replace(/ 2026$/, ""))}</span>
    <h3 id="offer-card-h">Your first month of Gradify Pro for £5</h3>
    <p class="sub">${esc(offerTerms(PLAN_PRICES.plus.month))} Code <b class="offer-code">${OFFER.code}</b> is applied for you at checkout.</p>
    <div class="row-actions">${offerClaimHtml("claim-card")}<a class="btn btn-ghost lg btn-sm" href="#/offer"><span>What's in Pro</span></a></div>
  </article>`;
}
async function renderOffer() {
  const o = currentOffer({ includeDismissed: true });
  if (!o) { location.replace("#/today"); return; }
  view.innerHTML = `<section class="offer-page">
    <span class="offer-kicker">Launch offer · ends ${esc(OFFER.endsLabel)}</span>
    <h1>Your £5 month of Gradify Pro is ready</h1>
    <p class="sub">You're set up. Gradify Free is yours to keep. Gradify Pro is the part that organises your learning for you.</p>
    <ul class="offer-perks">${OFFER_PERKS.map(([ic, t, d]) => `<li class="panel glass">${icon(ic)}<div><b>${esc(t)}</b><span>${esc(d)}</span></div></li>`).join("")}</ul>
    <div class="panel glass offer-box">
      <p class="offer-price"><b>£5</b> for your first month</p>
      <p class="sub">${esc(offerTerms(PLAN_PRICES.plus.month))} Stripe shows the £5 total and the renewal price before you pay.</p>
      <p class="sub">Code <b class="offer-code">${OFFER.code}</b> is applied for you. One use per person, for your first Gradify Pro subscription.</p>
      <div class="row-actions">${offerClaimHtml("claim-page")}<a class="btn btn-ghost lg" href="#/new" data-not-now><span>Not now, keep learning free</span></a></div>
    </div>
  </section>`;
  wireOffer(view);
}
function wireOffer(root) {
  root.querySelectorAll("[data-claim]").forEach((b) => b.addEventListener("click", async () => {
    const label = b.querySelector("span"), was = label.textContent;
    b.disabled = true; label.textContent = "Opening Stripe…";
    // back to the pricing page, which waits for the plan to arrive and says so (or says nothing was charged)
    try { await startCheckout(store, "plus", "month", "/pricing.html", OFFER.code); }
    catch (err) { b.disabled = false; label.textContent = was; toast(esc(err.message)); }
  }));
  root.querySelector("[data-dismiss-offer]")?.addEventListener("click", (e) => {
    const shown = storedOffer(Date.now(), learnerOf(profile));   // from this browser or, on another device, the account
    dismissOffer(shown);
    if (signedIn() && shown) saveLearner(store, offerForAccount({ ...shown, dismissed: true })).then(async () => { profile = await store.getProfile(); }).catch(() => {});
    e.currentTarget.closest(".offer-card")?.remove();
    toast("Hidden. The offer is still on the Gradify Pro page until it ends.");
  });
}

async function renderStart(stepArg) {
  const step = Number(stepArg) || 1;
  const p = profile;
  const dots = [1, 2, 3].map((n) => `<i class="${n <= step ? "on" : ""}"></i>`).join("");
  if (step === 1) {
    view.innerHTML = `<section class="setup"><div class="setup-dots">${dots}</div>
      <h1>What do you want to achieve?</h1><p class="sub">Gradify plans your revision around it. You can change it any time.</p>
      <div class="goal-grid">${GOALS.map((g) => `<button type="button" class="goal-card glass ${p.goal === g.id ? "on" : ""}" data-goal="${g.id}"><span class="g-ico">${icon(g.i)}</span><b>${g.t}</b><span>${g.d}</span></button>`).join("")}</div>
      <p class="setup-skip"><button type="button" class="btn btn-ghost btn-sm" id="skip"><span>Skip for now</span></button> <small>You can set this up later from Account.</small></p></section>`;
    $("#skip").addEventListener("click", async () => { await saveLearner(store, { skipped_at: new Date().toISOString() }); profile = await store.getProfile(); location.hash = "#/today"; });
    view.querySelector(".goal-grid").addEventListener("click", (e) => {
      const b = e.target.closest("[data-goal]");
      if (!b) return;
      picks.goal = b.dataset.goal;
      location.hash = picks.site ? "#/start/3" : "#/start/2";
    });
    return;
  }
  if (step === 2 && SITE) { location.replace("#/start/3"); return; }
  if (step === 2) {
    const picked = p.site || "";
    const groups = GROUPS.filter((g) => g.id !== "tech").concat(GROUPS.filter((g) => g.id === "tech"));
    view.innerHTML = `<section class="setup"><div class="setup-dots">${dots}</div>
      <h1>What are you studying?</h1><p class="sub">Pick your subject. Your notes, cards, courses and progress are organised around it.</p>
      <label class="search-field"><span class="sr-only">Search subjects</span><input id="site-q" type="search" placeholder="Search, e.g. medicine, law, maths" autocomplete="off"></label>
      <h3 class="setup-group">Most popular</h3><div class="site-grid">${POPULAR.map((n) => SITES.find((s) => s.n === n)).filter(Boolean).map(pickBtn).join("")}</div>
      <p class="setup-more"><button type="button" class="btn btn-ghost btn-sm" id="all-subjects" aria-expanded="false" aria-controls="more-subjects"><span>Show all subjects</span></button></p>
      <div id="more-subjects" hidden>${groups.map((g) => { const items = g.items.filter((s) => s.n !== "Klerio" && !POPULAR.includes(s.n)); return items.length ? `<h3 class="setup-group">${esc(g.title)}</h3><div class="site-grid">${items.map(pickBtn).join("")}</div>` : ""; }).join("")}</div>
    </section>`;
    const more = $("#more-subjects"), moreBtn = $("#all-subjects");
    moreBtn.addEventListener("click", () => { more.hidden = false; moreBtn.parentElement.hidden = true; });
    $("#site-q").addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (q) { more.hidden = false; moreBtn.parentElement.hidden = true; }
      view.querySelectorAll(".site-pick").forEach((b) => { b.hidden = q && !b.dataset.s.includes(q); });
      view.querySelectorAll("#more-subjects .setup-group").forEach((h) => { h.hidden = ![...h.nextElementSibling.children].some((b) => !b.hidden); });
    });
    view.querySelector(".setup").addEventListener("click", (e) => {
      const b = e.target.closest("[data-site]");
      if (!b) return;
      picks.site = b.dataset.site;
      location.hash = "#/start/3";
    });
    return;
  }
  const goal = picks.goal || p.goal || "course";
  const site = SITE || picks.site || p.site || "UnderGradify";
  view.innerHTML = `<section class="setup"><div class="setup-dots">${dots}</div>
    <h1>A couple of details</h1><p class="sub">So Gradify can pace your revision.</p>
    <form class="setup-form panel glass" id="details">
      ${goal === "exam" || goal === "qualification" ? `<label><span>When is the exam?</span><input type="date" name="exam_date" min="${today()}" value="${p.exam_date || ""}"></label>` : ""}
      <label><span>How long can you study on a normal day?</span>
        <select name="daily_minutes">${[10, 20, 30, 45, 60, 90].map((m) => `<option value="${m}" ${Number(p.daily_minutes || 20) === m ? "selected" : ""}>${m} minutes</option>`).join("")}</select></label>
      <label><span>Level</span><select name="level">${[["school", "School"], ["undergraduate", "University"], ["postgraduate", "Postgraduate"], ["professional", "Professional"]].map(([v, l]) => `<option value="${v}" ${p.level === v ? "selected" : ""}>${l}</option>`).join("")}</select></label>
      <label><span>How much do you already know? <em class="hint">${esc(subjectOf(site))}</em></span><select name="prior">${PRIOR.map(([v, l]) => `<option value="${v}" ${(learnerOf(p).prior[site] || "new") === v ? "selected" : ""}>${l}</option>`).join("")}</select></label>
      <label><span>Your first name (optional)</span><input name="display_name" autocomplete="given-name" value="${esc(p.display_name || "")}"></label>
      ${prefsFields(learnerOf(p).prefs)}
      <button class="btn btn-primary lg" type="submit"><span>Next: add your notes</span></button>
    </form></section>`;
  $("#details").addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    profile = await store.saveProfile({ goal, site, exam_date: f.get("exam_date") || null, daily_minutes: Number(f.get("daily_minutes")), level: f.get("level"), display_name: (f.get("display_name") || "").trim() || null });
    const l = learnerOf(profile);
    await saveLearner(store, { subjects: [...new Set([...l.subjects, site])], prior: { [site]: f.get("prior") }, prefs: prefsFrom(f), onboarded_at: l.onboarded_at || new Date().toISOString(), skipped_at: null });
    profile = await store.getProfile();
    // university, postgraduate and college students are offered MyGradify course set-up next (skippable)
    academicFromStart = ["undergraduate", "postgraduate"].includes(f.get("level")) && !/^(JuniorGradify|YouthGradify)$/.test(site);
    location.hash = academicFromStart ? "#/academic/1" : currentOffer() ? "#/offer" : "#/new";
  });
}

// ---------- Add notes ----------
async function renderNew(arg) {
  const s = siteOf(profile.site);
  // Gradify AI reads the notes only when it's switched on for this learner, not just because they're signed in
  const user = store.mode === "cloud" && (await store.user());
  const ai = user && (await myAllowance(store).catch(() => [])).some((u) => u.feature === "pack" && u.enabled);
  view.innerHTML = `<section class="new">
    ${needsSetup(profile) ? "" : `<span class="kicker">${esc(s.n)}</span>`}
    <h1>Bring your notes</h1>
    <p class="sub">Upload a PDF of your notes or paste them. Gradify turns them into flashcards checked against what you wrote, in about a minute.</p>
    ${needsSetup(profile) ? `<p class="try-sample"><button type="button" class="btn btn-ghost lg" data-sample-top><span>${icon("sparkles")} No notes to hand? Try it with sample notes</span></button></p>` : ""}
    <div class="engine-note ${ai ? "ai" : ""}">${ai ? `${icon("sparkles")}<span><b>Gradify AI</b> (Claude) will read your notes. Every flashcard is checked against them.</span>` : `${icon("lock")}<span><b>Working on this device.</b> The quick extractor runs in your browser. It works best on notes written in full sentences or as “term: definition” lines. ${user ? "Gradify AI, for messy notes and scans, isn't switched on yet." : cloudConfigured() ? '<a href="#/account">Sign in</a> to keep your packs on every device.' : ""}</span>`}</div>
    <form id="upload" class="upload panel glass">
      <label class="dropzone" id="drop"><input type="file" id="file" accept=".pdf,.txt,.md,application/pdf,text/plain"><span class="dz-ico">${icon("upload")}</span><span><b>Drop a PDF here or choose a file</b><em>PDF, .txt or .md · one lecture or topic works best</em></span></label>
      <label class="sr-only" for="text">Or paste your notes</label>
      <textarea id="text" rows="8" placeholder="…or paste your notes here"></textarea>
      <label class="title-field"><span>Title</span><input id="title" placeholder="e.g. Cardiac cycle, lecture 4" maxlength="120"></label>
      <div class="row-actions"><button class="btn btn-primary lg" type="submit" id="go"><span>Make my study pack</span></button><button type="button" class="btn btn-ghost lg" id="sample"><span>Try sample notes</span></button></div>
      <p class="sub" id="status" aria-live="polite"></p>
    </form></section>`;
  let pdfBase64 = null, pages = null, fileName = null;
  const status = $("#status");
  async function take(file) {
    if (!file) return;
    status.textContent = `Reading ${file.name}…`;
    fileName = file.name;
    try {
      const text = await readFile(file);
      $("#text").value = text.trim();
      if (!$("#title").value) $("#title").value = file.name.replace(/\.[a-z]+$/i, "").replace(/[_-]+/g, " ");
      pdfBase64 = null;
      if (/pdf$/i.test(file.name) && text.trim().length < 200 && file.size < 20e6) {
        const buf = new Uint8Array(await file.arrayBuffer());
        let bin = ""; for (let i = 0; i < buf.length; i += 0x8000) bin += String.fromCharCode(...buf.subarray(i, i + 0x8000));
        pdfBase64 = btoa(bin);
      }
      pages = (text.match(/\f/g) || []).length || null;
      status.textContent = text.trim() ? `Read ${text.trim().split(/\s+/).length.toLocaleString("en-GB")} words from ${file.name}.` : "This PDF has no selectable text, so Gradify can't read it on this device. Paste your notes in instead.";
    } catch { status.textContent = "Couldn't read that file. Try a PDF with selectable text, or a .txt file."; }
  }
  $("#file").addEventListener("change", (e) => take(e.target.files[0]));
  const drop = $("#drop");
  drop.addEventListener("dragover", (e) => { e.preventDefault(); drop.classList.add("over"); });
  drop.addEventListener("dragleave", () => drop.classList.remove("over"));
  drop.addEventListener("drop", (e) => { e.preventDefault(); drop.classList.remove("over"); take(e.dataTransfer.files[0]); });
  $("#sample").addEventListener("click", () => { $("#text").value = SAMPLE; $("#title").value = "Cardiac cycle"; status.textContent = "Sample notes added. Press “Make my study pack”."; });
  if (arg === "sample") $("#sample").click();
  // the sample, from the top of the page: fill it in and make the pack straight away
  view.querySelector("[data-sample-top]")?.addEventListener("click", () => { $("#sample").click(); $("#upload").requestSubmit(); });
  // a quick note sent here to become flashcards (kit/notes/jot.js)
  { const d = takePackDraft(); if (d) { $("#text").value = d.text; $("#title").value = d.title; status.textContent = "Your note is ready. Press “Make my study pack”."; } }
  $("#upload").addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = $("#text").value.trim();
    const title = $("#title").value.trim() || "My notes";
    if (!text && !pdfBase64) { status.textContent = "Add a file or paste some notes first."; return; }
    const btn = $("#go");
    btn.disabled = true;
    btn.querySelector("span").textContent = ai ? "Gradify AI is reading your notes…" : "Making your pack…";
    status.textContent = ai ? "This usually takes 30 to 90 seconds." : "";
    try {
      // what the learner's own results say this pack should contain more of (Gradify AI only; fixed values, never free text)
      const focus = ai ? await store.listCards().then(async (cards) => focusFromProfiles(topicProfiles(cards, await store.listReviews(400)))).catch(() => []) : [];
      const out = await generate({ text, pdfBase64, title, site: profile.site, level: profile.level, store, focus });
      if (!out.cards.length) throw new Error("No flashcards could be made from these notes. Try notes written in full sentences, or as “term: definition” lines.");
      const doc = await store.addDocument({ title: out.pack.title || title, site: profile.site, file_name: fileName, pages, text });
      if (out.engine === "claude" && store.linkPack) await store.linkPack(out.packId, doc.id);
      else await store.addPack({ document_id: doc.id, engine: out.engine, model: out.model, pack: out.pack, stats: out.stats });
      await store.addCards(out.cards.map((c) => ({ document_id: doc.id, topic: c.topic, front: c.front, back: c.back, kind: c.kind, source_quote: c.sourceQuote, source_page: c.sourcePage, grounded: c.grounded })));
      await store.logActivity({ site: profile.site, kind: "pack", xp: 15, detail: { title: doc.title, cards: out.cards.length } });
      // dates in the notes become plan items
      for (const d of out.pack.dates || []) if (d.date && d.date >= today()) await store.saveBlock({ day: d.date, start_min: 9 * 60, end_min: 9 * 60 + 30, title: d.what, cal: d.kind === "exam" ? "exam" : "deadline" });
      complete("Study pack ready", { sub: `${out.cards.length} cards from ${doc.title}` });
      if (out.notice) toast(esc(out.notice));
      record(store, { event: "pack_made", site: profile.site, concept: doc.id, source: out.engine, detail: { cards: out.cards.length, title: doc.title.slice(0, 120) } });
      setTimeout(() => offerInstall({ reason: "Revise this pack anywhere: get the Gradify app for iPhone, iPad and Mac." }), 2600);
      location.hash = `#/deck/${doc.id}`;
    } catch (err) {
      status.textContent = err.message;
      btn.disabled = false;
      btn.querySelector("span").textContent = "Make my study pack";
    }
  });
}

// ---------- A deck: check, edit and fix the cards ----------
const GROUNDED = {
  yes: ["ok", "Checked against your notes"],
  partly: ["warn", "Partly matches your notes. Worth a look"],
  no: ["bad", "Couldn't find this in your notes. Check it"],
  bonus: ["info", "Extra from Gradify AI, not in your notes"],
};
async function renderDeck(id) {
  const docs = await store.listDocuments();
  const doc = docs.find((d) => d.id === id);
  if (!id || !doc) return renderNotes();
  const [cards, pack] = await Promise.all([store.listCards({ documentId: id }), store.getPack(id)]);
  const st = pack?.stats || {};
  const flagged = cards.filter((c) => c.grounded === "no" || c.grounded === "partly");
  const due = cards.filter((c) => isDue(c) && !c.suspended);
  const topics = [...new Set(cards.map((c) => c.topic || "Cards"))];
  const deeper = { why: cards.filter((c) => c.kind === "why").length, apply: cards.filter((c) => c.kind === "apply").length };
  view.innerHTML = `<section class="deck">
    <a class="back" href="#/library">← Your library</a>
    <div class="deck-head">
      <div><span class="kicker">${[doc.site || profile.site, fmtDate(doc.created_at)].filter(Boolean).map(esc).join(" · ")}</span><h1>${esc(doc.title)}</h1>
        <span class="engine-badge ${pack?.engine === "claude" ? "ai" : ""}">${pack?.engine === "claude" ? `${icon("sparkles")}Made by Gradify AI` : `${icon("lock")}Made on this device`}</span></div>
      <a class="btn btn-primary lg" href="#/study/${id}"><span>${due.length ? `Revise ${due.length} ${due.length === 1 ? "card" : "cards"}` : "Practise anyway"}</span></a>
    </div>
    <div class="deck-stats">
      <div><b>${cards.length}</b><span>cards</span></div>
      <div><b>${cards.length ? Math.round((cards.filter((c) => c.grounded === "yes").length / cards.length) * 100) : 0}%</b><span>checked against notes</span></div>
      <div class="${flagged.length ? "warn" : ""}"><b>${flagged.length}</b><span>to check</span></div>
      <div><b>${cards.filter(isLearned).length}</b><span>learned</span></div>
    </div>
    ${needsSetup(profile) ? setupNudgeHtml("Tell it your goal and exam date, and it schedules these cards and your next ones around it. About a minute.") : ""}
    ${store.mode !== "cloud" && cloudConfigured() ? savePanel(`Save these ${cards.length} cards to your free account`, "Keep this pack on every device, and let Gradify plan your revision around your exam.") : ""}
    ${store.mode === "cloud" ? sharePanel() : ""}
    ${(pack?.pack?.unclear || []).length ? `<div class="unclear panel glass"><b>${icon("bell")}Gradify AI noticed</b><ul>${pack.pack.unclear.map((u) => `<li>${esc(u)}</li>`).join("")}</ul></div>` : ""}
    ${flagged.length ? `<p class="sub">Cards marked <span class="g-pill warn">to check</span> couldn't be fully matched to your notes. Edit them, regenerate them or delete them before you revise.</p>` : ""}
    <div class="deeper panel glass">
      <div><b>${icon("brain")}Explain and apply</b>
        <p class="sub">${deeper.why || deeper.apply ? `${deeper.why} ${deeper.why === 1 ? "question asks" : "questions ask"} you to explain why, and ${deeper.apply} to apply what you know. They're what Gradify uses to measure explanation and application.` : "Recall cards show you remember. These questions show you understand: explaining why something happens, and using it on a problem you haven't seen."}</p></div>
      <button type="button" class="btn ${deeper.why || deeper.apply ? "btn-ghost" : "btn-light"} lg btn-sm" id="add-deeper"><span>${deeper.why || deeper.apply ? "Write more" : "Add explain and apply questions"}</span></button>
    </div>
    <div class="deck-tools"><button type="button" class="btn btn-ghost lg btn-sm" id="add-card"><span>+ Add a card</span></button>
      <button type="button" class="btn btn-ghost lg btn-sm danger" id="del-deck"><span>Delete these notes</span></button></div>
    ${topics.map((t) => `<h3 class="topic-h">${esc(t)}</h3><div class="card-list">${cards.filter((c) => (c.topic || "Cards") === t).map(cardRow).join("")}</div>`).join("")}
  </section>`;
  wireSavePanel();
  wireSharePanel();
  const list = view.querySelector(".deck");
  list.addEventListener("click", async (e) => {
    const row = e.target.closest(".c-row");
    const act = e.target.closest("[data-act]")?.dataset.act;
    if (e.target.closest("#add-card")) {
      const [c] = await store.addCards([{ document_id: id, topic: "My cards", front: "New question", back: "Answer", kind: "definition", grounded: "bonus", edited: true }]);
      await renderDeck(id);
      const el = view.querySelector(`[data-id="${c.id}"]`);
      el?.querySelector('[data-act="edit"]').click();
      return;
    }
    if (e.target.closest("#add-deeper")) {
      const btn = e.target.closest("button");
      btn.disabled = true; btn.querySelector("span").textContent = store.mode === "cloud" ? "Gradify AI is writing questions…" : "Writing questions…";
      try {
        const full = await store.getDocument(id);
        const have = new Set(cards.map((c) => c.front.trim().toLowerCase()));
        const fresh = (await generateQuestions({ text: full.text || "", title: doc.title, site: doc.site || profile.site, level: profile.level, topics, store }))
          .filter((c) => !have.has(c.front.trim().toLowerCase()));
        if (!fresh.length) {
          toast(store.mode === "cloud" ? "No new questions this time. Try again, or add your own." : "These notes don't give Gradify enough to write new explain or apply questions on this device. Sign in to use Gradify AI, or add your own.");
          renderDeck(id); return;
        }
        await store.addCards(fresh.map((c) => ({ document_id: id, topic: c.topic, front: c.front, back: c.back, kind: c.kind, source_quote: c.sourceQuote, source_page: c.sourcePage, grounded: c.grounded })));
        toast(`Added ${fresh.length} ${fresh.length === 1 ? "question" : "questions"}.`);
        renderDeck(id);
      } catch (err) { toast(esc(err.message)); renderDeck(id); }
      return;
    }
    if (e.target.closest("#del-deck")) {
      if (!confirm(`Delete “${doc.title}” and its ${cards.length} cards? This can't be undone.`)) return;
      await store.deleteDocument(id);
      toast("Deleted.");
      location.hash = "#/library";
      return;
    }
    if (!row || !act) return;
    const card = cards.find((c) => c.id === row.dataset.id);
    if (act === "edit") {
      row.classList.add("editing");
      row.querySelector(".c-body").innerHTML = `<label><span>Type</span><select class="e-kind">${[["definition", "Recall"], ["cloze", "Fill the gap"], ["why", "Explain why"], ["apply", "Apply it"]].map(([k, l]) => `<option value="${k}" ${(card.kind === k || (k === "definition" && !["cloze", "why", "apply"].includes(card.kind))) ? "selected" : ""}>${l}</option>`).join("")}</select></label><label><span>Question</span><textarea class="e-front" rows="2">${esc(card.front)}</textarea></label><label><span>Answer</span><textarea class="e-back" rows="3">${esc(card.back)}</textarea></label>
        <div class="row-actions"><button type="button" class="btn btn-light lg btn-sm" data-act="save"><span>Save</span></button><button type="button" class="btn btn-ghost lg btn-sm" data-act="cancel"><span>Cancel</span></button></div>`;
      row.querySelector(".e-front").focus();
    } else if (act === "cancel") renderDeck(id);
    else if (act === "save") {
      const front = row.querySelector(".e-front").value.trim(), back = row.querySelector(".e-back").value.trim();
      if (!front || !back) { toast("A card needs a question and an answer."); return; }
      const kind = row.querySelector(".e-kind").value;
      // "Recall" covers definition and reverse cards, so a reverse card keeps its kind
      await store.updateCard(card.id, { front, back, edited: true, kind: kind === "definition" && card.kind === "reverse" ? "reverse" : kind, grounded: card.grounded === "no" || card.grounded === "partly" ? "bonus" : card.grounded });
      toast("Saved.");
      renderDeck(id);
    } else if (act === "regen") {
      e.target.closest("button").disabled = true;
      try {
        const next = await regenerateCard({ card, notes: doc.text || "", store });
        await store.updateCard(card.id, { ...next, edited: true });
        renderDeck(id);
      } catch (err) { toast(esc(err.message)); e.target.closest("button").disabled = false; }
    } else if (act === "del") {
      await store.deleteCard(card.id);
      row.remove();
      toast("Card deleted.");
    } else if (act === "ok") {
      await store.updateCard(card.id, { grounded: "yes", edited: true });
      renderDeck(id);
    }
  });
}
// what the card reviewer (kit/notes/pack.js) found, in words a learner can act on
const ISSUES = {
  leak: "The question gives the answer away. Edit it",
  vague: "Starts with “it” or “this”. Say what it is",
  "long-front": "A long question. Try splitting it",
  "long-back": "A long answer. Try splitting it",
  "yes-no": "A yes-or-no question. Ask for the fact instead",
  negative: "Asks what isn't true, which is easy to misread",
};
function cardRow(c) {
  let [cls, label] = GROUNDED[c.grounded] || GROUNDED.bonus;
  const issue = c.edited ? null : reviewCard(c).find((i) => ISSUES[i]);
  if (issue && c.grounded !== "no") [cls, label] = ["warn", ISSUES[issue]];
  return `<article class="c-row panel glass" data-id="${c.id}">
    <div class="c-body">${c.kind === "why" || c.kind === "apply" ? `<span class="kind-tag ${c.kind}">${c.kind === "why" ? "Explain" : "Apply"}</span>` : ""}<p class="c-front">${esc(c.front)}</p><p class="c-back">${esc(c.back)}</p>
      ${c.edited ? `<p class="c-src"><span class="g-pill info">Edited by you</span>${c.source_quote ? ` Source: “${esc(c.source_quote)}”` : ""}</p>`
        : c.source_quote ? `<p class="c-src"><span class="g-pill ${cls}">${label}</span> “${esc(c.source_quote)}”${c.source_page ? ` · page ${c.source_page}` : ""}</p>` : `<p class="c-src"><span class="g-pill ${cls}">${label}</span></p>`}
    </div>
    <div class="c-actions">
      <button type="button" class="icon-btn" data-act="edit" aria-label="Edit card" title="Edit">${icon("pencil")}</button>
      <button type="button" class="icon-btn" data-act="regen" aria-label="Regenerate card" title="Write a new version">${icon("sparkles")}</button>
      ${c.grounded === "no" || c.grounded === "partly" ? `<button type="button" class="icon-btn" data-act="ok" aria-label="Mark as correct" title="It's correct">${icon("check")}</button>` : ""}
      <button type="button" class="icon-btn" data-act="del" aria-label="Delete card" title="Delete">${icon("x")}</button>
    </div>
    <span class="c-meta">${c.reps ? `Next review ${new Date(c.due_at) <= new Date() ? "now" : fmtDate(c.due_at)}` : "New"}</span>
  </article>`;
}

// ---------- All notes ----------
async function renderNotes() {
  const [docs, cards, reviews, L] = await Promise.all([store.listDocuments(), store.listCards(), store.listReviews(400), learnerAcross()]);
  const courseCards = (L?.courses || []).filter((c) => c.cards || c.revisit);
  // each deck's bar is its topics' mastery, weighted by how many cards each topic has
  const topics = topicProfiles(cards, reviews);
  const masteryOf = (docId) => { const ts = topics.filter((t) => t.documentId === docId), n = ts.reduce((a, t) => a + t.cards, 0); return n ? ts.reduce((a, t) => a + t.mastery * t.cards, 0) / n : 0; };
  view.innerHTML = `<section class="notes">
    <div class="deck-head"><div><span class="kicker lo-kicker">${icon("layers")}Library</span><h1>Your library</h1><p class="sub">Your own notes and their flashcards, and the flashcards and questions you're revising in each Gradify course.</p></div><a class="btn btn-primary lg" href="#/new"><span>+ Add notes</span></a></div>
    ${jotStripHtml()}
    ${courseCards.length ? `<h2 class="lo-h">From your courses</h2><div class="lo-grid">${courseCards.map((c) => `<article class="panel glass course-card"><div class="cc-top"><span class="cc-site">${esc(c.site)}</span></div><h3>${esc(c.name)}</h3>
      <p class="sub">${c.cards} flashcard${c.cards === 1 ? "" : "s"}${c.dueCards ? ` · ${c.dueCards} due` : " · nothing due"}${c.revisit ? ` · ${c.revisit} question${c.revisit === 1 ? "" : "s"} to revisit` : ""}</p>
      <div class="row-actions">${c.href && (c.dueCards || c.revisit) ? `<a class="btn btn-light lg btn-sm" href="${c.href}#/review"><span>Review now</span></a>` : ""}${c.href ? `<a class="btn btn-ghost lg btn-sm" href="${c.href}"><span>Open course</span></a>` : ""}</div></article>`).join("")}</div>
      <h2 class="lo-h">From your notes</h2>` : ""}
    ${docs.length ? `<div class="doc-grid">${docs.map((d) => {
      const cs = cards.filter((c) => c.document_id === d.id);
      const due = cs.filter((c) => isDue(c)).length;
      const s = siteOf(d.site);
      const m = masteryOf(d.id);
      return `<a class="doc panel glass" href="#/deck/${d.id}" style="--c:#${s.c};--tile:${tile(s.c)};--ink:${ink(s.c)}"><span class="doc-g3d" data-g3d="${esc(d.title)}" data-g3d-size="52" data-g3d-site="${esc(d.site || profile.site || "Gradify")}" data-g3d-unique></span><b>${esc(d.title)}</b>
        <span class="sub">${cs.length} cards · ${due ? `${due} due` : "nothing due"} · ${fmtDate(d.created_at)}</span><span class="goal-bar" title="${Math.round(m * 100)}% mastery"><i style="width:${Math.round(m * 100)}%"></i></span></a>`;
    }).join("")}</div>` : actionCard({ cls: "empty-action", kicker: "Start here", title: "No study packs yet", why: "Add a PDF or paste your notes, or turn a quick note into one, and Gradify makes flashcards from them.", iconSvg: icon("upload"), actions: [{ label: "Add notes", icon: "upload", href: "#/new" }] })}
  </section>`;
  wireJotStrip(view);
}
routes.library = renderNotes;
// Gradify Notes (kit/notes/kb): the knowledge base, loaded when opened. It reads the rest of the hash itself.
routes.notes = async () => (await import("../notes/kb/view.js")).renderNotesKb(view, { store, toast, site: profile.site || SITE || "Gradify", profile });
routes.jot = (arg) => renderJot(view, arg, { toast });
// Tools (kit/tools): the lesson search, mind map creator, flashcard creator and notes converter, loaded when opened
routes.tools = async () => (await import("../tools/tools.js")).renderTools(view, { store, toast, site: profile.site || "Gradify", pricing: PRICING });

// ---------- Revision session ----------
// Answering a card: first say how sure you are (that's evidence too: confident wrong answers point
// to misconceptions), then see the answer and rate it.
const SURE_BUTTONS = [["sure", "I know it", "J"], ["unsure", "Not sure", "K"], ["guess", "No idea", "L"]];
async function renderStudy(arg) {
  // #/study/<deck id>, or #/study/t:<topic key> for a targeted practice session on one topic
  const topicKey = arg?.startsWith("t:") ? decodeURIComponent(arg.slice(2)) : null;
  // #/study/kb:<rem id>|<mode>: cards from Gradify Notes (kit/notes/kb/view-study.js studyQueue)
  const kbSpec = arg?.startsWith("kb:") ? decodeURIComponent(arg.slice(3)) : null;
  const deckId = kbSpec ? null : topicKey ? topicKey.split("|")[0] : arg;
  // Free: 5 flashcard sets in all (kit/data/limits.js), once Pro is on sale
  const { gate, lockedHtml } = await import("../data/limits.js");
  if (!(await gate("flashcards", deckId || (kbSpec ? "notes" : "due"), { store, pricing: PRICING }))) { view.innerHTML = lockedHtml("flashcards", { pricing: PRICING }); return; }
  const all = await store.listCards(deckId ? { documentId: deckId } : {});
  let queue, practice = false, topicName = null, kb = null;
  if (kbSpec) {
    kb = await (await import("../notes/kb/view-study.js")).studyQueue(kbSpec, all);
    ({ queue, practice } = kb); topicName = kb.label;
  } else if (topicKey) {
    const [p] = topicProfiles(all, await store.listReviews(400)).filter((x) => x.key === topicKey);
    topicName = p?.topic || "Topic";
    queue = p ? practiceOrder(all.filter((c) => `${c.document_id}|${c.topic || "Cards"}` === topicKey), p).slice(0, 12) : [];
  } else {
    queue = all.filter((c) => isDue(c) && !c.suspended);
    practice = !queue.length && deckId;
    if (practice) queue = [...all].sort(() => Math.random() - 0.5);
  }
  const cap = Math.max(10, Math.round(((profile.daily_minutes || 20) * 60) / SEC_PER_CARD));
  // Intelligence 3.0 card order (kit/intel/order.js): fading and important cards first, foundations before what
  // builds on them, sure-but-wrong cards early, new cards capped, topics interleaved, fitted to the learner's minutes.
  // Practice and topic sessions keep their own order.
  let ordered = false;
  if (!topicKey && !kb && !practice && queue.length > 1 && ACCESS.has("intelligence")) {
    try {
      const reviews = await store.listReviews(400), concepts = learnerMemory({ cards: all, reviews, examDate: profile.exam_date || null });
      const edges = usable(weightedGraph({ noteEdges: dependencyGraph(all), concepts }));
      queue = orderCards(queue, { concepts, edges, reviews, examDate: profile.exam_date || null, minutes: profile.daily_minutes || 20 }).queue;
      ordered = true;
    } catch (e) { console.warn("Card ordering fell back to due date", e); }
  }
  // image occlusion cards from Gradify Notes show their image
  if (queue.some((c) => c.kind === "occlusion" && !c._front)) queue = await (await import("../notes/kb/view-study.js")).decorateAny(queue).catch(() => queue);
  if (!ordered && !topicKey && !kb) queue.sort((a, b) => (a.reps ? 0 : 1) - (b.reps ? 0 : 1) || new Date(a.due_at) - new Date(b.due_at));
  queue = queue.slice(0, cap);
  // the ledger: the session starts, and a snapshot of what the learner knew, to see what changed by the end
  const before = queue.length && !practice ? learnerMemory({ cards: all, reviews: await store.listReviews(400) }) : null;
  let finished = false, answeredSoFar = 0;
  if (queue.length) record(store, { event: "session_started", site: profile.site, concept: topicKey, source: practice ? "practice" : topicKey ? "topic" : "due", detail: { cards: queue.length } });
  if (queue.length) globalThis.gradifyConsent?.event("flashcard_session_start", { cards: queue.length, mode: practice ? "practice" : topicKey ? "topic" : "due" });   // Google Analytics, with consent (kit/core/consent.js)
  addEventListener("hashchange", () => { if (!finished && answeredSoFar) record(store, { event: "session_abandoned", site: profile.site, concept: topicKey, detail: { answered: answeredSoFar, of: queue.length } }); }, { once: true });
  if (!queue.length) {
    view.innerHTML = actionCard({ cls: "empty-action", kicker: "Nothing due", title: topicKey ? "No cards in this topic" : "All caught up", iconSvg: icon("check"),
      why: kb ? "Nothing here is due right now. Practise all of them from the document's Practise button, or come back later." : "Nothing is due right now. Add more notes, or come back later.",
      actions: [{ label: kb ? "Back to your notes" : "Add notes", icon: kb ? "book" : "upload", href: kb ? kb.back : "#/new" }, { label: "Back to Today", icon: "home", href: "#/today", soft: true }] });
    return;
  }
  const total = queue.length;
  const results = { again: 0, hard: 0, good: 0, easy: 0 };
  let i = 0, shown = false, sure = null, t0 = Date.now(), xp = 0;
  const again = [];
  let attempt = "";
  let grade = null;   // how close a typed answer was (kit/learning/typed.js), once the card is turned over
  const reveal = () => {
    const c = queue[i];
    attempt = view.querySelector("#typed, #attempt")?.value ?? attempt;
    grade = c.kind === "why" || c.kind === "apply" ? null : gradeTyped(attempt, c.back);
    shown = true; draw();
  };
  const draw = () => {
    const c = queue[i];
    const p = preview(c, srsOpts());
    const deep = c.kind === "why" || c.kind === "apply";
    view.innerHTML = `<section class="study-session">
      <div class="sess-top"><a href="${kb ? kb.back : topicKey ? `#/topic/${encodeURIComponent(topicKey)}` : deckId ? `#/deck/${deckId}` : "#/today"}" class="back">✕ End</a><span class="goal-bar"><i style="width:${(i / total) * 100}%"></i></span><span class="sub">${Math.min(i + 1, total)} / ${total}${practice ? " · practice" : ""}${topicName ? ` · ${esc(topicName)}` : ""}${ordered ? ` · <span title="Fading and important cards first, foundations before what builds on them, topics mixed">ordered by Gradify</span>` : ""}</span></div>
      <article class="flash-card ${shown ? "shown" : ""}" aria-live="polite">
        <span class="fc-icon" data-g3d="${esc(`${c.topic || ""} ${c.front}`)}" data-g3d-size="58"></span>
        <span class="kicker">${deep ? `<b class="kind-tag ${c.kind}">${c.kind === "why" ? "Explain" : "Apply"}</b>` : ""}${esc(c.topic || "")}${c.reps ? "" : " · new"}</span>
        ${c._front ? `<div class="fc-front fc-img">${shown ? c._back : c._front}</div>` : `<p class="fc-front">${esc(c.front)}</p>`}
        ${!deep && !shown ? `<label class="fc-type"><span class="sr-only">Type your answer (optional)</span><input id="typed" autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="done" placeholder="Type your answer, or just think it" value="${esc(attempt)}"></label>` : ""}
        ${deep && !shown ? `<label class="fc-write"><span>${c.kind === "why" ? "Explain it in your own words" : "Work it out"} <em>optional, just for you</em></span><textarea id="attempt" rows="3" placeholder="${c.kind === "why" ? "Because…" : "It would…, because…"}">${esc(attempt)}</textarea></label>` : ""}
        ${shown && grade ? `<div class="fc-typed v-${grade.verdict}" role="status"><b>${VERDICT_TEXT[grade.verdict]}</b><span>You typed “${esc(attempt)}”</span></div>` : ""}
        ${shown ? `${deep && attempt.trim() ? `<div class="fc-compare"><span>Your answer</span><p>${esc(attempt)}</p></div><span class="fc-model">Model answer</span>` : ""}<p class="fc-back">${esc(c.back)}</p>${c.source_quote ? `<p class="c-src">From your notes: “${esc(c.source_quote)}”</p>` : ""}${deep ? `<p class="c-src">Rate how close your ${c.kind === "why" ? "explanation" : "reasoning"} was, not just the result.</p>` : ""}` : ""}
      </article>
      ${shown ? `<div class="rate4" role="group" aria-label="How well did you know it?">${RATINGS.map((r, k) => `<button type="button" class="r-${r}${grade?.suggest === r ? " suggested" : ""}" data-r="${r}"${grade?.suggest === r ? ' aria-describedby="suggest-note"' : ""}><b>${r[0].toUpperCase() + r.slice(1)}</b><span>${fmtInterval(p[r])}</span><kbd>${k + 1}</kbd></button>`).join("")}${grade ? `<p class="suggest-note" id="suggest-note">Suggested from what you typed</p>` : ""}</div>`
        : `<div class="sure" role="group" aria-label="How sure are you? Choosing one shows the answer.">
            <span class="sure-q">How sure are you?</span>
            ${SURE_BUTTONS.map(([k, label, key]) => `<button type="button" data-sure="${k}" class="sure-${k}"><b>${label}</b><kbd>${key}</kbd></button>`).join("")}
            <button type="button" class="sure-skip" id="reveal">Just show me <kbd>Space</kbd></button>
          </div>`}
    </section>`;
    glassIcons(view, profile.site || "Gradify").catch(() => {});
  };
  const rate = async (r) => {
    haptic(r === "again" ? "warn" : r === "easy" ? "success" : "select");
    const c = queue[i];
    // in a topic session, cards that aren't due yet only move if you've forgotten them
    const reschedule = !practice && (!topicKey || !c.reps || isDue(c) || r === "again");
    const next = reschedule ? schedule(c, r, kb?.examDate ? { ...srsOpts(), examDate: kb.examDate } : srsOpts()) : {};
    results[r]++; answeredSoFar++;
    xp += r === "again" ? 1 : 2;
    record(store, answerEvent(c, { rating: r, confidence: sure, ms: Date.now() - t0, mode: practice ? "practice" : "scheduled", site: profile.site }));
    const forgot = forgotEvent(c, r, profile.site); if (forgot) record(store, forgot);
    if (!practice) {
      if (reschedule) await store.updateCard(c.id, next);
      await store.addReview({ card_id: c.id, rating: r, interval_days: next.interval_days ?? null, ms: Date.now() - t0, confidence: sure, mode: reschedule ? "scheduled" : "practice" });
      if (r === "again" && !again.includes(c.id)) { again.push(c.id); queue.push({ ...c, ...next }); }
    }
    i++; shown = false; sure = null; attempt = ""; grade = null; t0 = Date.now();
    if (i >= queue.length) return finish();
    draw();
  };
  const finish = async () => {
    removeEventListener("keydown", keys);
    const answered = Object.values(results).reduce((a, b) => a + b, 0);
    xp += 10;
    await store.logActivity({ site: profile.site, kind: "session", xp: Math.min(xp, 500), detail: { cards: answered, ...results, practice: Boolean(practice), topic: topicName } });
    finished = true;
    record(store, { event: "session_finished", site: profile.site, concept: topicKey, detail: { answered, ...results } });
    globalThis.gradifyConsent?.event("flashcard_session_complete", { cards: answered, practice: Boolean(practice) });
    if (before) { const after = learnerMemory({ cards: await store.listCards(deckId ? { documentId: deckId } : {}), reviews: await store.listReviews(400) }); for (const e of stageEvents(before, after, profile.site)) record(store, e); }
    // tick off today's review block in the plan
    const blocks = await store.listBlocks(today(), today());
    for (const b of blocks) if (b.auto && !b.done && /review/i.test(b.title)) await store.saveBlock({ ...b, done: true });
    profile = await store.getProfile();
    const s = await stats();
    const right = answered - results.again;
    complete("Session complete", { sub: `${answered} ${answered === 1 ? "card" : "cards"} · +${Math.min(xp, 500)} XP` });
    setTimeout(() => offerInstall({ reason: "Your next reviews will be ready tomorrow. Get the Gradify app for iPhone, iPad and Mac." }), 1900);
    view.innerHTML = `<section class="done-screen">
      <div class="done-burst">${icon("check")}</div>
      <h1>Session done</h1>
      <p class="sub">${answered} ${answered === 1 ? "answer" : "answers"} · ${Math.round((right / answered) * 100)}% right first time · +${Math.min(xp, 500)} XP</p>
      <div class="deck-stats">
        <div><b>${s.streak}</b><span>day streak ${icon("flame")}</span></div>
        <div><b>${s.learned.length}</b><span>cards learned</span></div>
        <div><b>${s.due.length}</b><span>still due</span></div>
        <div><b>Level ${levelOf(s.xp)}</b><span>${s.xp} XP</span></div>
      </div>
      <div class="rate-sum">${RATINGS.map((r) => `<span class="r-${r}"><b>${results[r]}</b>${r}</span>`).join("")}</div>
      ${topicKey ? `<div class="row-actions"><a class="btn btn-primary lg" href="#/topic/${encodeURIComponent(topicKey)}"><span>See ${esc(topicName)}'s mastery</span></a><a class="btn btn-ghost lg" href="#/today"><span>Back to Today</span></a></div>`
        : `<div class="row-actions"><a class="btn btn-primary lg" href="#/today"><span>Back to Today</span></a><a class="btn btn-ghost lg" href="#/progress"><span>See progress</span></a></div>`}
    </section>`;
  };
  const keys = (e) => {
    // typing an answer: ⌘/Ctrl+Enter shows the model answer
    // a typed answer: Enter turns the card over and grades it
    if (e.target.closest("input, textarea")) { if (!shown && e.key === "Enter" && (e.target.id === "typed" || e.metaKey || e.ctrlKey)) { e.preventDefault(); reveal(); } return; }
    if (!shown && (e.key === " " || e.key === "Enter")) { e.preventDefault(); reveal(); }
    else if (!shown && SURE_BUTTONS.some(([, , k]) => k.toLowerCase() === e.key.toLowerCase())) { sure = SURE_BUTTONS.find(([, , k]) => k.toLowerCase() === e.key.toLowerCase())[0]; reveal(); }
    else if (shown && ["1", "2", "3", "4"].includes(e.key)) rate(RATINGS[+e.key - 1]);
  };
  // listeners last only as long as this session; otherwise a second session in the same visit
  // would also answer for the first
  const session = new AbortController();
  addEventListener("keydown", keys, { signal: session.signal });
  addEventListener("hashchange", () => session.abort(), { once: true });
  view.addEventListener("click", (e) => {
    if (!shown) attempt = view.querySelector("#typed, #attempt")?.value ?? attempt;
    if (e.target.closest("#reveal")) { reveal(); return; }
    const sb = e.target.closest("[data-sure]");
    if (sb) { haptic("tap"); sure = sb.dataset.sure; reveal(); return; }
    const r = e.target.closest("[data-r]");
    if (r) rate(r.dataset.r);
  }, { signal: session.signal });
  draw();
}

// ---------- Today ----------
async function ensureReviewBlock(s) {
  const blocks = await store.listBlocks(today(), today());
  const mins = Math.max(5, Math.min(profile.daily_minutes || 20, Math.ceil((s.due.length * SEC_PER_CARD) / 60)));
  const existing = blocks.find((b) => b.auto && /review/i.test(b.title));
  if (s.due.length && !existing) {
    const now = new Date();
    const start = Math.min(22 * 60, Math.ceil((now.getHours() * 60 + now.getMinutes() + 15) / 15) * 15);
    return [...blocks, await store.saveBlock({ day: today(), start_min: start, end_min: Math.min(1440, start + mins), title: `Review ${s.due.length} due cards`, cal: "study", auto: true })];
  }
  return blocks;
}
function heatmap(byDay, weeks = 16) {
  const end = new Date(); const start = new Date(+end - (weeks * 7 - 1) * DAY);
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
  let cells = "";
  for (let d = new Date(start); d <= end; d = new Date(+d + DAY)) {
    const n = byDay[dayKey(d)] || 0;
    const lv = n === 0 ? 0 : n === 1 ? 1 : n <= 3 ? 2 : n <= 6 ? 3 : 4;
    cells += `<i class="l${lv} ${dayKey(d) === today() ? "today" : ""}" title="${fmtDate(d, { weekday: "short", day: "numeric", month: "short" })}: ${n} ${n === 1 ? "activity" : "activities"}"></i>`;
  }
  return `<div class="hm" style="--weeks:${Math.ceil(((+end - +start) / DAY + 1) / 7)}">${cells}</div>`;
}
// Set-up, offered and never imposed: someone who hasn't said what they're working towards sees this card (on Today and
// under a new study pack); nothing is put in front of the screen they asked for (route()).
function setupNudgeHtml(why) {
  return actionCard({ tag: "aside", cls: "setup-nudge", kicker: "Your next step", title: "Want Gradify to plan your revision?", why, iconSvg: icon("calendar"), actions: [{ label: "Plan my revision", icon: "calendar", href: "#/start" }] });
}

async function renderToday() {
  const [s, L, sub, G, GO] = await Promise.all([stats(), learnerAcross(), store.mode === "cloud" ? mySubscription(store).catch(() => null) : null, journeySummary({ store }).catch(() => null), loadGoals().catch(() => ({ goals: [], progress: {}, unavailable: "x" }))]);
  const blocks = (await ensureReviewBlock(s)).sort((a, b) => a.start_min - b.start_min);
  const [reviews, ahead] = await Promise.all([store.listReviews(400).catch(() => []), store.listBlocks(today(), dayKey(Date.now() + 14 * DAY)).catch(() => [])]);
  const allowance = store.mode === "cloud" ? myAllowance(store).then((u) => u.map((x) => ({ ...x, label: AI_ALLOWANCES.find((a) => a.feature === x.feature)?.label || x.feature }))) : null;
  const site = siteOf(profile.site);
  // level and streak as the Journey works them out (rest days included), so every screen agrees
  const gxp = G ? G.xp : s.xp, streakDays = G ? G.streak : s.streak;
  const lv = levelOf(gxp), into = gxp - xpForLevel(lv), need = xpForLevel(lv + 1) - xpForLevel(lv);
  const examIn = profile.exam_date ? Math.ceil((new Date(profile.exam_date) - new Date(today())) / DAY) : null;
  const mins = Math.ceil((s.due.length * SEC_PER_CARD) / 60);
  // One answer to "what should I do next?": a misconception first (it spreads), then due reviews
  // (cheap now, expensive later), then whichever topic the Mastery Engine ranks highest.
  const shaky = s.topics.find((t) => t.level === "shaky");
  const top = s.topics.find((t) => t.next.kind !== "done");
  const dueTopics = new Set(s.due.map((c) => `${c.document_id}|${c.topic || "Cards"}`)).size;
  // with no flashcards yet, the most important step across the learner's courses comes first
  const top0 = L?.next?.[0];
  const next = !s.cards.length && top0
    ? { t: esc(top0.label), d: esc(top0.why), href: esc(top0.href), cta: "Start" }
    : !s.cards.length
    ? { t: "Add your first notes", d: "Upload a PDF or paste your notes. Gradify turns them into flashcards you can trust.", href: "#/new", cta: "Add notes" }
    : shaky ? { t: `${shaky.next.label}: ${esc(shaky.topic)}`, d: esc(shaky.next.why), href: studyHref(shaky.key), cta: `Start · ${shaky.next.mins} min` }
    : s.due.length
      ? { t: `Review ${s.due.length} ${s.due.length === 1 ? "card" : "cards"}`, d: `About ${mins} ${mins === 1 ? "minute" : "minutes"}, across ${dueTopics} ${dueTopics === 1 ? "topic" : "topics"}. These are the cards you're about to forget: reviewing them now is what makes memory last.`, href: "#/study", cta: `Start · ${mins} min` }
      : top ? { t: `${top.next.label}: ${esc(top.topic)}`, d: esc(top.next.why), href: stepHref(top), cta: top.next.kind === "deepen" ? "Open the deck" : `Start · ${top.next.mins} min` }
      : { t: "You're all caught up", d: "Every topic is mastered and nothing is due. Add the next lecture's notes while it's fresh.", href: "#/new", cta: "Add notes" };
  // Realistic workload: what today needs, against the time you said you have
  const capMins = profile.daily_minutes || 20;
  const fading = s.topics.filter((t) => t.level === "fading");
  const notReady = s.topics.reduce((a, t) => a + t.cards * (1 - t.mastery), 0);
  const needPerDay = examIn > 0 ? Math.ceil((notReady * SEC_PER_CARD * 2.5) / 60 / examIn) : null; // each card needs ~2–3 more answers
  const briefing = [];
  if (s.cards.length) briefing.push({ ico: "clock", c: mins > capMins ? "warn" : "", t: s.due.length ? `${mins} min of reviews due today` : "No reviews due today", d: `You said you have ${capMins} min a day.${mins > capMins ? " Today needs more than that: do the oldest first and the rest will wait a day." : ""}` });
  if (fading.length) briefing.push({ ico: "alert", c: "warn", t: `${fading.length} ${fading.length === 1 ? "topic is" : "topics are"} fading`, d: `${fading.slice(0, 3).map((t) => esc(t.topic)).join(", ")}. You knew ${fading.length === 1 ? "it" : "them"}, but haven't practised recently.`, href: studyHref(fading[0].key), cta: "Review" });
  if (needPerDay != null && s.cards.length) briefing.push({ ico: "calendar", c: needPerDay > capMins ? "risk" : "", t: needPerDay > capMins ? `Exam risk: you need about ${needPerDay} min a day` : `On track for your exam`, d: needPerDay > capMins ? `At ${capMins} min a day you won't reach mastery on everything in ${examIn} days. Add time in Plan, or focus on the topics below.` : `${needPerDay < 5 ? "A few minutes a day" : `About ${needPerDay} min a day`} keeps every topic on course for mastery in ${examIn} days.`, href: needPerDay > capMins ? "#/plan" : null, cta: "Open Plan" });
  const hour = new Date().getHours();
  const courses = L?.courses || [];
  const examCourse = courses.find((c) => c.examDate) || null;
  const cockpitCtx = { s, reviews, blocks: ahead, docs: s.docs, profile, examIn, mins, topicHref, studyHref, allowance };
  const M = await model();
  // course steps from every site; steps from the learner's own notes are already in "what to do next"
  const acrossNext = (L?.next || []).filter((x) => x.site);
  // nothing to revise and no course yet: the welcome card is the whole job, so nothing else competes with it
  const firstRun = !s.cards.length && !courses.length;
  view.innerHTML = `<section class="today">
    <div class="today-head"><div><span class="kicker lo-kicker">${icon("home")}Command Centre · ${fmtDate(Date.now(), { weekday: "long", day: "numeric", month: "long" })}</span>
      <h1>${hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening"}${profile.display_name ? `, ${esc(profile.display_name)}` : ""} <span class="wave" aria-hidden="true">👋</span></h1>
      <p class="sub lo-hello">${s.cards.length ? `${n0(s.cards.length)} flashcards across ${n0(s.docs.length)} study ${s.docs.length === 1 ? "pack" : "packs"}${streakDays ? ` · ${streakDays}-day streak` : ""}.` : "Nice to have you here."}</p></div>
      ${heroArt(firstRun ? "path" : streakDays ? "streak" : "cards", { cls: "today-art" })}</div>
    ${offerCardHtml()}
    ${needsSetup(profile) ? setupNudgeHtml("Tell it your goal and exam date, and it plans your study around them. About a minute, whenever you like.") : ""}
    ${firstRun ? welcomeHtml(profile.display_name) : ""}
    ${ACCESS.has("calendar") ? notifyAskHtml(M) : ""}
    ${ACCESS.has("intelligence") ? `${briefingHtml(M, { made: M.made || [] })}
    ${catchUpHtml(M) || rescheduleHtml(M)}` : ""}
    ${firstRun ? "" : nextHtml(M)}
    ${firstRun ? "" : plannerHtml(M)}
    ${boardHtml({ m: M, s, G, L, streak: streakDays, xp: gxp, lv, xpForLevel, heat: heatmap(s.byDay) }, (M.intel.widgets?.length ? M.intel.widgets : DEFAULT_WIDGETS).filter((id) => ACCESS.has("intelligence") || !INTEL_WIDGETS.has(id)))}
    ${ACCESS.has("intelligence") ? "" : plusPanelHtml("intelligence", { pricing: PRICING, compact: true })}
  </section>`;
  wireOffer(view);
  wireCockpit(view, cockpitCtx);
  wirePlanner(view, M);
  wireIntel(view, M, { store, toast, rerender });
  wireAutopilot(view, M, apctx());
  wireTell(view, M, apctx());
  wireNotifyAsk(view, M, apctx());
  wireBoard(view, { ...apctx(), complete });
}

// ---------- LifeOS: across every Gradify site ----------
// The learner's courses, flashcard decks and ranked next steps from every site (kit/learning/learner-data.js), read
// through this app's own store. On a sub-site, only that site's courses and steps.
async function learnerAcross() {
  const L = await loadLearner({ store }).catch((e) => { console.warn("LifeOS: couldn't gather courses", e); return null; });
  if (!L) return null;
  if (!SITE) return L;
  const mine = (x) => !x.site || x.site === SITE;
  return { ...L, courses: L.courses.filter(mine), next: L.next.filter(mine) };
}
const PACE = { behind: ["risk", "Behind your exam pace"], tight: ["warn", "Tight for your exam"], "on-track": ["ok", "On track"], ahead: ["ok", "Ahead of pace"], "no-date": ["", "No exam date set"], done: ["ok", "Finished"], past: ["", "Exam date passed"] };
function courseCard(c) {
  const pct = c.written ? Math.round((100 * c.done) / c.written) : 0, [tone, paceLabel] = PACE[c.pace?.status] || ["", ""];
  return `<article class="panel glass course-card">
    <div class="cc-top"><span class="cc-site">${esc(c.site)}</span>${paceLabel ? `<span class="cc-pace ${tone}">${esc(paceLabel)}</span>` : ""}</div>
    <h3>${esc(c.name)}</h3>
    <div class="goal-bar" role="img" aria-label="${c.done} of ${c.written} lessons"><i style="width:${pct}%"></i></div>
    <p class="sub">${c.done} of ${c.written} lessons · ${pct}%${c.dueCards ? ` · ${c.dueCards} flashcards due` : ""}${c.revisit ? ` · ${c.revisit} questions to revisit` : ""}</p>
    <div class="row-actions">${c.next && c.href ? `<a class="btn btn-light lg btn-sm" href="${c.href}#/lesson/${encodeURIComponent(c.next.id)}"><span>Continue: ${esc(c.next.title)}</span></a>` : ""}${c.href ? `<a class="btn btn-ghost lg btn-sm" href="${c.href}"><span>Open course</span></a>` : ""}</div>
  </article>`;
}
function nextList(items) {
  return `<ol class="lo-next">${items.map((x) => `<li><a href="${esc(x.href)}"><span class="lo-site">${esc(x.site || "Your notes")}</span><b>${esc(x.label)}</b><em>${esc(x.why)}</em></a></li>`).join("")}</ol>`;
}
// sites to start with when a learner has no course yet: the built course sites, this learner's own first
function startCourses(L, n = 6) {
  const started = new Set((L?.courses || []).map((c) => c.slug));
  const all = Object.entries(LIVE_COURSES).filter(([slug]) => !started.has(slug));
  return all.slice(0, n).map(([slug, href]) => `<a class="lo-chip" href="${href}">${esc(slug[0].toUpperCase() + slug.slice(1))}</a>`).join("");
}
function proCard(sub) {
  const plan = sub ? describePlan(sub) : null;
  if (plan && plan.plan !== "free") return `<article class="panel glass lo-pro on"><span class="lo-pro-badge"><span class="pro-gem" aria-hidden="true"></span>${plan.plan === "plus" ? "Gradify Pro" : "Gradify Ultra"}</span><p class="sub">${esc(plan.line)}</p><a class="see" href="#/account">Manage</a></article>`;
  return `<article class="panel glass lo-pro"><span class="lo-pro-badge"><span class="pro-gem" aria-hidden="true"></span>${PLUS_ON_SALE ? "Gradify Pro" : "Gradify Pro · opening soon"}</span>
    <h3>Let Gradify run your studying</h3>
    <p class="sub">Smart Plan autopilot, readiness forecasts, exam preparation, calendar sync and every device${PLUS_ON_SALE ? "" : ". Until Pro opens, everything on Gradify is free"}.</p>
    <a class="btn btn-ghost lg btn-sm" href="${PRICING}"><span>See plans</span></a></article>`;
}

// everything waiting for review today, wherever it lives: course flashcards and questions, and decks from notes
function dueHtml(s, courses) {
  const rows = [
    ...courses.filter((c) => c.dueCards || c.revisit).map((c) => ({ label: c.name, site: c.site, n: (c.dueCards || 0) + (c.revisit || 0), what: [c.dueCards ? `${c.dueCards} flashcard${c.dueCards === 1 ? "" : "s"}` : "", c.revisit ? `${c.revisit} question${c.revisit === 1 ? "" : "s"}` : ""].filter(Boolean).join(" · "), href: c.href ? `${c.href}#/review` : "#/learning" })),
    ...(s.due.length ? [{ label: "Your notes", site: "Library", n: s.due.length, what: `${s.due.length} flashcard${s.due.length === 1 ? "" : "s"}`, href: "#/study" }] : []),
  ].sort((a, b) => b.n - a.n);
  const total = rows.reduce((a, r) => a + r.n, 0);
  return `<article class="panel glass lo-due"><div class="panel-head"><h3>Due for review</h3><span class="pill-dark">${total ? `${total} today` : "all clear"}</span></div>
    ${rows.length ? `<ul class="lo-courses">${rows.slice(0, 5).map((r) => `<li><a href="${esc(r.href)}"><span><b>${esc(r.label)}</b><em>${esc(r.what)}</em></span><span></span><em>Review</em></a></li>`).join("")}</ul><p class="sub">Reviewing just before you'd forget is what makes learning last.</p>`
      : `<p class="sub">Nothing is due anywhere. Reviews appear here as flashcards and questions come back round.</p>`}
  </article>`;
}

// ---------- Goals ----------
// Goals live in the learner's store (public.goals); their progress is worked out each time from existing records
// (kit/learning/goals.js, kit/learning/goal-data.js), never stored.
const TZ = (() => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || "Europe/London"; } catch { return "Europe/London"; } })();
const DAY_LETTERS = ["M", "T", "W", "T", "F", "S", "S"];
async function loadGoals() {
  let goals = [];
  try { goals = await store.listGoals(); } catch (e) { console.warn("Goals", e?.message); return { goals: [], progress: {}, unavailable: "Goals aren't switched on for Gradify accounts yet, or couldn't be reached. Nothing you've set is lost; try again shortly." }; }
  const data = await goalData(store, goals);
  return { goals, data, progress: Object.fromEntries(goals.map((g) => [g.id, goalProgress(g, data)])) };
}
const areaLabel = (a) => AREAS.find(([k]) => k === a)?.[1] || "Learning";
const courseName = (slug) => (slug ? slug[0].toUpperCase() + slug.slice(1) : "");
function goalSummaryLine(g, p) {
  if (!p.available) return p.note;
  const bits = [];
  if (p.value != null && p.target) bits.push(`${Math.round(p.value * 10) / 10} of ${p.target} ${p.unit || ""}`.trim());
  if (g.metric) bits.push(`${METRICS[`${g.metric.source}:${g.metric.metric}`]?.label.replace(/ \(any site, or one\)/, "")}${g.metric.course ? `: ${courseName(g.metric.course)}` : ""}${g.metric.site ? ` (${g.metric.site})` : ""}, ${{ since_start: "since you set it", week: "this week", month: "this month", all_time: "in total" }[g.metric.period] || ""}`);
  if (p.milestones.total) bits.push(`${p.milestones.done} of ${p.milestones.total} steps`);
  if (p.habit) bits.push(`${p.habit.label}: ${p.habit.hit} of ${p.habit.required} this week`);
  return bits.join(" · ");
}
function habitDots(h) {
  if (!h) return "";
  return `<span class="hb-week" role="img" aria-label="This week: ${h.hit} of ${h.required} days">${h.keys.map((k, i) => `<i class="${h.done.includes(k) ? "on" : ""} ${k === h.today ? "today" : ""}" title="${k}">${DAY_LETTERS[i]}</i>`).join("")}</span>`;
}
function goalCard(g, p, { compact = false } = {}) {
  const pct = p.pct == null ? null : Math.round(p.pct * 100);
  const due = p.daysLeft == null ? "" : p.overdue ? `<span class="gl-due late">${-p.daysLeft} day${p.daysLeft === -1 ? "" : "s"} overdue</span>` : `<span class="gl-due">${p.daysLeft === 0 ? "Due today" : `${p.daysLeft} day${p.daysLeft === 1 ? "" : "s"} left`}</span>`;
  return `<article class="panel glass goal ${g.status} ${p.available ? "" : "unavailable"}" data-goal="${esc(g.id)}">
    <div class="gl-top"><span class="gl-area">${esc(areaLabel(g.area))}${g.site ? ` · ${esc(g.site)}` : ""}</span>${g.pinned ? `<span class="gl-pin">${icon("star")} Pinned</span>` : ""}${g.status === "paused" ? `<span class="gl-pin">Paused</span>` : ""}${due}</div>
    <h3>${esc(g.title)}</h3>
    ${pct != null ? `<div class="goal-bar" role="img" aria-label="${pct}% done"><i style="width:${pct}%"></i></div>` : ""}
    <p class="sub">${esc(goalSummaryLine(g, p))}${pct != null ? ` · ${pct}%` : ""}</p>
    ${habitDots(p.habit)}
    ${compact ? "" : `<div class="row-actions gl-actions">
      ${g.status === "active" && g.target && !g.metric ? `<button type="button" class="btn btn-light lg btn-sm" data-act="plus"><span>+1 ${esc(g.unit || "")}</span></button>` : ""}
      <a class="btn btn-ghost lg btn-sm" href="#/goal/edit/${encodeURIComponent(g.id)}"><span>Edit</span></a>
      ${g.status === "active" ? `<button type="button" class="btn btn-ghost lg btn-sm" data-act="pin"><span>${g.pinned ? "Unpin" : "Pin to Command Centre"}</span></button>
        <button type="button" class="btn btn-ghost lg btn-sm" data-act="pause"><span>Pause</span></button>
        <button type="button" class="btn btn-ghost lg btn-sm" data-act="done"><span>Mark done</span></button>` : ""}
      ${g.status === "paused" ? `<button type="button" class="btn btn-ghost lg btn-sm" data-act="resume"><span>Resume</span></button>` : ""}
      ${g.status === "done" || g.status === "archived" ? `<button type="button" class="btn btn-ghost lg btn-sm" data-act="resume"><span>Make active again</span></button>` : ""}
      ${g.status !== "archived" ? `<button type="button" class="btn btn-ghost lg btn-sm" data-act="archive"><span>Archive</span></button>` : `<button type="button" class="btn btn-ghost lg btn-sm danger" data-act="delete"><span>Delete</span></button>`}
    </div>`}
  </article>`;
}
// one change to a goal, refused if another device saved it first
async function changeGoal(g, patch, done) {
  try { await store.saveGoal({ ...g, ...patch }, { expect: g.updated_at }); if (done) { if (patch.status === "done") complete("Goal complete", { sub: g.title }); else toast(done); } }
  catch (e) { toast(esc(e.conflict ? e.message : `Couldn't save: ${e.message}`)); }
  route();
}
function wireGoalActions(goals) {
  view.querySelectorAll("[data-goal] [data-act]").forEach((b) => b.addEventListener("click", async () => {
    const g = goals.find((x) => x.id === b.closest("[data-goal]").dataset.goal); if (!g) return;
    const act = b.dataset.act;
    if (act === "plus") return changeGoal(g, { manual_value: Number(g.manual_value || 0) + 1 });
    if (act === "pin") return changeGoal(g, { pinned: !g.pinned });
    if (act === "pause") return changeGoal(g, { status: "paused" }, "Paused. It won't show in the Command Centre.");
    if (act === "resume") return changeGoal(g, { status: "active", done_at: null });
    if (act === "done") return changeGoal(g, { status: "done", done_at: new Date().toISOString(), pinned: false }, "Goal complete. Well done.");
    if (act === "archive") return changeGoal(g, { status: "archived", pinned: false }, "Archived.");
    if (act === "delete") { if (!confirm(`Delete "${g.title}"? This can't be undone.`)) return; await store.deleteGoal(g.id); toast("Deleted."); route(); }
  }));
}

async function renderGoals() {
  const { goals, progress, unavailable } = await loadGoals();
  const by = (st) => goals.filter((g) => g.status === st);
  const active = [...by("active")].sort((a, b) => (b.pinned - a.pinned) || ((progress[a.id].daysLeft ?? 9999) - (progress[b.id].daysLeft ?? 9999)));
  const recent = by("done").sort((a, b) => String(b.done_at).localeCompare(String(a.done_at)));
  view.innerHTML = `<section class="lifeos-page goals-page">
    <div class="deck-head"><div><span class="kicker lo-kicker">${icon("trophy")}My Goals</span><h1>Your goals</h1><p class="sub">Learning, career, skills, health and personal goals. Progress on courses, XP, study days and flashcards updates by itself from what you do on Gradify.</p></div><a class="btn btn-primary lg" href="#/goal/new"><span>+ New goal</span></a></div>
    ${unavailable ? `<article class="panel glass"><h3>Goals aren't available right now</h3><p class="sub">${esc(unavailable)}</p></article>` : ""}
    ${active.length ? `<div class="lo-grid">${active.map((g) => goalCard(g, progress[g.id])).join("")}</div>`
      : `<article class="panel glass lo-empty"><h3>No active goals</h3><p class="sub">Set a goal and link it to what Gradify already tracks, such as lessons in a course, XP each week or days you study, or count something yourself.</p><a class="btn btn-light lg btn-sm" href="#/goal/new"><span>Set a goal</span></a></article>`}
    ${by("paused").length ? `<h2 class="lo-h">Paused</h2><div class="lo-grid">${by("paused").map((g) => goalCard(g, progress[g.id])).join("")}</div>` : ""}
    ${recent.length ? `<h2 class="lo-h">Completed</h2><div class="lo-grid">${recent.map((g) => goalCard(g, progress[g.id])).join("")}</div>` : ""}
    ${by("archived").length ? `<details class="gl-archived"><summary>Archived (${by("archived").length})</summary><div class="lo-grid">${by("archived").map((g) => goalCard(g, progress[g.id])).join("")}</div></details>` : ""}
  </section>`;
  wireGoalActions(goals);
}
routes.goals = renderGoals;

// create or edit one goal
async function renderGoalForm(arg, more = []) {
  // #/goal/new, or #/goal/edit/<id> (the id arrives as the route's next part)
  const mode = arg || "new", id = more[0] || "";
  const goals = await store.listGoals().catch(() => []);
  const g = mode === "edit" ? goals.find((x) => x.id === decodeURIComponent(id)) : null;
  if (mode === "edit" && !g) { view.innerHTML = `<article class="panel glass"><h3>That goal isn't here any more</h3><a class="see" href="#/goals">Back to your goals</a></article>`; return; }
  const kind = g ? (g.metric ? "tracked" : g.habit ? "habit" : g.target ? "counted" : "checklist") : "tracked";
  const m = g?.metric || {}, h = g?.habit || {};
  const sites = SITES.filter((x) => x.built);
  view.innerHTML = `<section class="lifeos-page goal-form-page">
    <a class="see" href="#/goals">← Your goals</a>
    <h1>${g ? "Edit goal" : "New goal"}</h1>
    <form class="panel glass setup-form goal-form" id="goal-form" novalidate>
      <label class="wide"><span>Goal</span><input name="title" maxlength="120" required value="${esc(g?.title || "")}" placeholder="e.g. Finish Contract Law, or Run three times a week"></label>
      <label><span>Area</span><select name="area">${AREAS.map(([k, l]) => `<option value="${k}" ${(g?.area || "learning") === k ? "selected" : ""}>${l}</option>`).join("")}</select></label>
      <label><span>Target date (optional)</span><input type="date" name="target_date" value="${esc(g?.target_date || "")}"></label>
      <fieldset class="wide gf-kind"><legend>How is progress measured?</legend>
        ${[["tracked", "Gradify tracks it", "Lessons, schools or XP in a course, XP across Gradify, study days, or flashcard reviews"], ["counted", "I count it", "Something Gradify can't see, like applications sent or books read"], ["habit", "A habit", "Every day, chosen days, or a number of days a week, from your activity"], ["checklist", "A checklist", "Steps you tick off"]].map(([k, t, d]) => `<label class="gf-opt"><input type="radio" name="kind" value="${k}" ${kind === k ? "checked" : ""}><span><b>${t}</b><em>${d}</em></span></label>`).join("")}
      </fieldset>
      <div class="wide gf-part" data-part="tracked">
        <label><span>What it measures</span><select name="metric">${Object.entries(METRICS).map(([k, d]) => `<option value="${k}" ${`${m.source}:${m.metric}` === k ? "selected" : ""}>${d.label}</option>`).join("")}</select></label>
        <label data-needs="course"><span>Course</span><select name="course">${Object.keys(COURSES).filter((c) => LIVE_COURSES[c] || c === m.course).map((c) => `<option value="${c}" ${m.course === c ? "selected" : ""}>${esc(courseName(c))}</option>`).join("")}</select></label>
        <label data-needs="site"><span>Site (optional)</span><select name="msite"><option value="">Any Gradify site</option>${sites.map((x) => `<option ${m.site === x.n ? "selected" : ""}>${esc(x.n)}</option>`).join("")}</select></label>
        <label><span>Counted</span><select name="period">${PERIODS.map(([k, l]) => `<option value="${k}" ${(m.period || "since_start") === k ? "selected" : ""}>${l}</option>`).join("")}</select></label>
        <label><span>Target</span><input type="number" name="ttarget" min="1" step="1" value="${g?.metric ? esc(g.target) : ""}" placeholder="e.g. 20"></label>
      </div>
      <div class="wide gf-part" data-part="counted">
        <label><span>Target</span><input type="number" name="ctarget" min="1" step="1" value="${!g?.metric && g?.target ? esc(g.target) : ""}" placeholder="e.g. 3"></label>
        <label><span>Unit</span><input name="unit" maxlength="24" value="${!g?.metric ? esc(g?.unit || "") : ""}" placeholder="e.g. applications"></label>
        <label><span>So far</span><input type="number" name="manual_value" min="0" step="1" value="${esc(g?.manual_value ?? 0)}"></label>
      </div>
      <div class="wide gf-part" data-part="habit">
        <label><span>How often</span><select name="hmode">${HABIT_MODES.map(([k, l]) => `<option value="${k}" ${(h.mode || "per_week") === k ? "selected" : ""}>${l}</option>`).join("")}</select></label>
        <fieldset data-needs="weekdays" class="gf-days"><legend>Days</legend>${["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => `<label><input type="checkbox" name="hday" value="${i + 1}" ${(h.days || []).includes(i + 1) ? "checked" : ""}> ${d}</label>`).join("")}</fieldset>
        <label data-needs="per_week"><span>Days a week</span><input type="number" name="per_week" min="1" max="7" value="${esc(h.per_week || 3)}"></label>
        <label><span>What counts</span><select name="hwhat"><option value="">Any learning on Gradify</option><option value="kind:workout" ${h.kind === "workout" ? "selected" : ""}>A logged workout (SportGradify)</option>${sites.map((x) => `<option value="site:${esc(x.n)}" ${h.site === x.n ? "selected" : ""}>Activity on ${esc(x.n)}</option>`).join("")}</select></label>
      </div>
      <div class="wide gf-steps"><span class="gf-label">Steps (optional for every kind of goal)</span>
        <ul id="gf-steps">${(g?.milestones || []).map((x) => `<li data-id="${esc(x.id)}" data-done="${esc(x.done_at || "")}"><label><input type="checkbox" ${x.done_at ? "checked" : ""}> <input class="gf-step" value="${esc(x.title)}" maxlength="120" aria-label="Step"></label><button type="button" class="icon-btn" data-del aria-label="Remove step">${icon("x")}</button></li>`).join("")}</ul>
        <button type="button" class="btn btn-ghost lg btn-sm" id="gf-add"><span>+ Add a step</span></button></div>
      <p class="sub gf-errors" id="gf-errors" role="alert"></p>
      <div class="wide row-actions"><button class="btn btn-primary lg" type="submit"><span>${g ? "Save goal" : "Create goal"}</span></button><a class="btn btn-ghost lg" href="#/goals"><span>Cancel</span></a></div>
    </form>
  </section>`;
  const form = view.querySelector("#goal-form");
  const show = () => {
    const k = form.kind.value, metric = METRICS[form.metric.value], hm = form.hmode.value;
    form.querySelectorAll(".gf-part").forEach((el) => { el.hidden = el.dataset.part !== k; });
    form.querySelector('[data-needs="course"]').hidden = !metric?.needsCourse;
    form.querySelector('[data-needs="site"]').hidden = form.metric.value !== "activity:days";
    form.querySelector('[data-needs="weekdays"]').hidden = hm !== "weekdays";
    form.querySelector('[data-needs="per_week"]').hidden = hm !== "per_week";
  };
  form.addEventListener("change", show); show();
  const stepRow = (t = "") => `<li data-id="" data-done=""><label><input type="checkbox"> <input class="gf-step" value="${esc(t)}" maxlength="120" aria-label="Step"></label><button type="button" class="icon-btn" data-del aria-label="Remove step">${icon("x")}</button></li>`;
  view.querySelector("#gf-add").addEventListener("click", () => { view.querySelector("#gf-steps").insertAdjacentHTML("beforeend", stepRow()); view.querySelector("#gf-steps li:last-child .gf-step").focus(); });
  view.querySelector("#gf-steps").addEventListener("click", (e) => { if (e.target.closest("[data-del]")) e.target.closest("li").remove(); });
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const k = form.kind.value, [source, metric] = form.metric.value.split(":");
    const milestones = [...view.querySelectorAll("#gf-steps li")].map((li) => ({ id: li.dataset.id || undefined, title: li.querySelector(".gf-step").value, done_at: li.querySelector("input[type=checkbox]").checked ? (li.dataset.done || new Date().toISOString()) : null }));
    const what = form.hwhat.value;
    const draft = {
      ...(g || {}), id: g?.id, title: form.title.value, area: form.area.value, target_date: form.target_date.value || null, tz: g?.tz || TZ,
      site: k === "tracked" && METRICS[form.metric.value]?.needsCourse ? null : (g?.site ?? null), status: g?.status || "active", pinned: g?.pinned ?? false, milestones,
      metric: k === "tracked" ? { source, metric, course: form.course.value, site: form.msite.value || undefined, period: form.period.value } : null,
      target: k === "tracked" ? form.ttarget.value : k === "counted" ? form.ctarget.value : null,
      unit: k === "counted" ? (form.unit.value.trim() || null) : null,
      manual_value: k === "counted" ? Number(form.manual_value.value || 0) : null,
      habit: k === "habit" ? { mode: form.hmode.value, days: [...form.querySelectorAll("[name=hday]:checked")].map((x) => Number(x.value)), per_week: Number(form.per_week.value), ...(what.startsWith("kind:") ? { kind: what.slice(5) } : what.startsWith("site:") ? { site: what.slice(5) } : {}) } : null,
    };
    const { goal, errors } = validateGoal(draft);
    if (k === "checklist" && !goal.milestones.length) errors.push("Add at least one step.");
    if (errors.length) { view.querySelector("#gf-errors").textContent = errors.join(" "); return; }
    if (goal.metric?.course) goal.site = SITES.find((x) => COURSES[goal.metric.course]?.startsWith(`/${x.n.toLowerCase()}`))?.n || goal.site || null;
    try {
      await store.saveGoal(goal, { expect: g ? g.updated_at : null });
      toast(g ? "Goal saved." : "Goal created."); location.hash = "#/goals";
    } catch (err) { view.querySelector("#gf-errors").textContent = err.conflict ? err.message : `Couldn't save: ${err.message}`; }
  });
}
routes.goal = renderGoalForm;

// the Command Centre's goals: a few in focus, today's habits, and what was finished recently
function goalsPanel({ goals, progress, unavailable }) {
  if (unavailable) return "";
  const focus = focusGoals(goals, progress, 3), done = goals.filter((g) => g.status === "done" && g.done_at && Date.now() - Date.parse(g.done_at) < 14 * DAY);
  const habitsToday = goals.filter((g) => g.status === "active" && progress[g.id]?.habit?.todayRequired && !progress[g.id]?.habit?.todayDone);
  const more = goals.filter((g) => g.status === "active").length - focus.length;
  return `<article class="panel glass lo-goals"><div class="panel-head"><h3>Goals</h3><a class="see" href="#/goals">${more > 0 ? `All goals (${more} more)` : "All goals"}</a></div>
    ${focus.length ? `<div class="lo-goal-list">${focus.map((g) => goalCard(g, progress[g.id], { compact: true })).join("")}</div>`
      : `<p class="sub">No active goals. <a href="#/goal/new">Set one</a>, such as finishing a course by a date or studying four days a week.</p>`}
    ${habitsToday.length ? `<p class="sub lo-hb-today">${icon("flame")} Today: ${habitsToday.map((g) => esc(g.title)).join(", ")}</p>` : ""}
    ${done.length ? `<p class="sub">${icon("check")} Recently completed: ${done.map((g) => esc(g.title)).join(", ")}</p>` : ""}
  </article>`;
}

// ---------- My Learning ----------
async function renderLearning() {
  const [L, s] = await Promise.all([learnerAcross(), stats()]);
  const courses = L?.courses || [];
  view.innerHTML = `<section class="lifeos-page">
    <header class="lo-head"><span class="kicker">${icon("book")}My Learning</span><h1>Everything you're learning</h1>
      <p class="sub">Your courses on ${SITE ? esc(SITE) : "every Gradify site"} and the flashcards from your own notes, with what to do next in each.</p></header>
    ${L?.next?.length ? `<article class="panel glass"><div class="panel-head"><h3>Do next, across your learning</h3><span class="pill-dark">ranked by what matters most</span></div>${nextList(L.next.slice(0, 5))}</article>` : ""}
    <h2 class="lo-h">Courses</h2>
    ${courses.length ? `<div class="lo-grid">${courses.map(courseCard).join("")}</div>`
      : `<article class="panel glass lo-empty"><h3>No courses started yet</h3><p class="sub">Open any Gradify course and finish a lesson: it appears here with your progress and pace.</p><div class="lo-chips">${startCourses(L)}</div></article>`}
    <h2 class="lo-h">Flashcards from your notes</h2>
    ${s.cards.length ? `<article class="panel glass"><div class="deck-stats">
        <div><b>${s.docs.length}</b><span>${s.docs.length === 1 ? "deck" : "decks"}</span></div><div><b>${s.cards.length}</b><span>cards</span></div>
        <div><b>${s.due.length}</b><span>due now</span></div><div><b>${s.learned.length}</b><span>learned</span></div></div>
        <div class="row-actions">${s.due.length ? `<a class="btn btn-light lg btn-sm" href="#/study"><span>Review ${s.due.length} due</span></a>` : ""}<a class="btn btn-ghost lg btn-sm" href="#/library"><span>Open your library</span></a><a class="btn btn-ghost lg btn-sm" href="#/new"><span>Add notes</span></a></div></article>`
      : `<article class="panel glass lo-empty"><h3>Turn your own notes into flashcards</h3><p class="sub">Paste or upload notes and Gradify makes flashcards, each checked against what you wrote, then schedules your reviews.</p><a class="btn btn-light lg btn-sm" href="#/new"><span>Add notes</span></a></article>`}
    ${courses.length ? `<h2 class="lo-h">More Gradify courses</h2><div class="lo-chips">${startCourses(L, 12)}</div>` : ""}
  </section>`;
}
routes.learning = renderLearning;

// ---------- Topic: its mastery profile ----------
const pctOf = (v) => `${Math.round(v * 100)}%`;
const levelPill = (level) => `<span class="lvl-pill lvl-${level}">${LEVELS[level].label}</span>`;
const topicHref = (key) => `#/topic/${encodeURIComponent(key)}`;
const studyHref = (key) => `#/study/t:${encodeURIComponent(key)}`;
// where a topic's next step happens: adding questions is on the deck page, everything else is a session
const stepHref = (t) => (t.next.kind === "deepen" ? `#/deck/${t.documentId}` : studyHref(t.key));
// where each dimension's evidence comes from, for a deck of flashcards
const SIX_HOW = {
  ...HOW,
  recognition: "Flashcards don't test this: it comes from multiple-choice questions in Gradify courses.",
  recall: "Answer some of this topic's cards to measure it.",
  explain: "Comes from Explain questions. Add them from this topic's deck, then answer a few.",
  apply: "Comes from Apply questions. Add them from this topic's deck, then answer a few. Gradify won't guess.",
  transfer: "Comes from mixed exams in Gradify courses. Flashcards on their own can't show it.",
  retention: "Measured when you answer a card again a day or more after last seeing it.",
};
async function renderTopic(arg) {
  const key = decodeURIComponent(arg || "");
  const s = await stats();
  const t = s.topics.find((x) => x.key === key);
  if (!t) { view.innerHTML = `<div class="empty-state panel glass"><h3>Topic not found</h3><p class="sub">It may have been deleted.</p><a class="btn btn-ghost lg" href="#/progress"><span>Back to Progress</span></a></div>`; return; }
  const doc = s.docs.find((d) => d.id === t.documentId);
  const seenAgo = t.lastSeen ? Math.floor((Date.now() - t.lastSeen) / DAY) : null;
  view.innerHTML = `<section class="topic-page">
    <a class="back" href="#/progress">← Progress</a>
    <div class="topic-head">
      <div><span class="kicker">${esc(doc?.title || "Your notes")}</span><h1>${esc(t.topic)}</h1>
        <p class="sub">${levelPill(t.level)} ${LEVELS[t.level].note}</p></div>
      <div class="ring-sm big" aria-label="Mastery ${pctOf(t.mastery)}"><svg viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="34" class="track"/><circle cx="40" cy="40" r="34" class="fill" style="stroke-dasharray:${2 * Math.PI * 34};stroke-dashoffset:${2 * Math.PI * 34 * (1 - t.mastery)}"/></svg><b>${pctOf(t.mastery)}</b><span>mastery</span></div>
    </div>
    <article class="panel glass next-up step-${t.next.kind}" style="--c:${t.next.kind === "misconception" ? "#ff5a4d" : t.next.kind === "review" ? "#ffb44d" : "#4fe0a6"}">
      <span class="kicker">${icon("flame")}Next step${t.next.mins ? ` · about ${t.next.mins} min` : ""}</span>
      <h2>${esc(t.next.label)}</h2><p class="sub">${esc(t.next.why)}</p>
      ${t.next.kind === "done" ? "" : `<a class="btn btn-light lg" href="${stepHref(t)}"><span>${t.next.kind === "deepen" ? "Open the deck" : "Start"}</span></a>`}
    </article>
    <div class="prog-grid">
      <article class="panel glass"><div class="panel-head"><h3>Mastery profile</h3><span class="pill-dark">from your answers</span></div>
        ${sixHtml(t.six, { how: SIX_HOW })}${calibrationHtml(t.six)}
      </article>
      <div class="topic-side">
        ${t.misconceptions.length ? `<article class="panel glass warn-card"><div class="panel-head"><h3>Possible misconceptions</h3></div>
          <p class="sub">You said you knew these, then got them wrong. Check the answer against your notes.</p>
          <ul class="mis-list">${t.misconceptions.map((m) => `<li>${esc(m.front)}</li>`).join("")}</ul></article>` : ""}
        ${t.underconfident >= 3 ? `<article class="panel glass"><h3>You know more than you think</h3><p class="sub">${t.underconfident} times you weren't sure, but got it right. Trust yourself a little more in the exam.</p></article>` : ""}
        <article class="panel glass"><div class="panel-head"><h3>Cards</h3><a class="see" href="#/deck/${t.documentId}">Open deck</a></div>
          <div class="deck-stats two"><div><b>${t.seen}<small>/${t.cards}</small></b><span>tested</span></div><div><b>${t.due}</b><span>due now</span></div>
          <div><b>${t.fresh}</b><span>not started</span></div><div><b>${seenAgo == null ? "–" : seenAgo === 0 ? "Today" : `${seenAgo}d`}</b><span>last practised</span></div></div>
        </article>
        <details class="panel glass how"><summary>How Gradify works this out</summary>
          <p class="sub">Every score comes from your own answers, with recent ones counting more. Recall comes from definition, fill-the-gap and reverse cards; explanation from Explain questions; application from Apply questions. Retention estimates how much you'd remember if tested right now, from when you last saw each card and how long you've been remembering it. Depth measures how long your memory of each card has lasted between reviews: everything looks remembered straight after a session, so mastery only grows as cards survive longer gaps. A topic is mastered only when you've answered every card, each more than once, with recall and retention above 85% and memories lasting a week or more.</p></details>
      </div>
    </div>
  </section>`;
}

// ---------- Progress ----------
async function renderProgress() {
  const s = await stats();
  const docs = s.docs;
  const forecast = Array.from({ length: 7 }, (_, k) => {
    const end = new Date(today()).getTime() + (k + 1) * DAY;
    const start = k === 0 ? -Infinity : end - DAY;
    return s.cards.filter((c) => { const t = new Date(c.due_at).getTime(); return t >= start && t < end; }).length;
  });
  const fmax = Math.max(1, ...forecast);
  view.innerHTML = `<section class="progress">
    <span class="kicker lo-kicker">${icon("trend")}My Progress</span>
    <h1>Your progress</h1>
    <p class="sub lo-intro">Your activity on every Gradify site, mastery of the topics in your own notes, and below it your level, quests and achievements.</p>
    <p class="share-progress"><button type="button" class="btn btn-ghost btn-sm" id="share-progress">Share my progress (image)</button></p>
    <article class="panel glass"><div class="panel-head"><h3>Your year</h3><span class="pill-dark">${Object.keys(s.byDay).length} active days</span></div><div class="hm-scroll">${heatmap(s.byDay, 52)}</div></article>
    <article class="panel glass tree-panel lo-tree" data-pane="year"><div class="panel-head"><div><h3>Your Gradify Tree</h3><p class="sub">It grows from what you actually do: a limb for every Gradify site you've studied on, filling out with your last 30 days there, on an island whose grass is your last 60 days.</p></div><span class="pill-dark">${s.acts.filter((a) => Date.now() - Date.parse(a.at) < 30 * DAY).length} activities in 30 days</span></div>
      <div class="grow-body"><div class="tree-wrap" id="lo-tree-svg"></div><aside class="grow-side" id="lo-tree-side"></aside></div></article>
    <div class="prog-grid">
      <article class="panel glass"><div class="panel-head"><h3>Mastery by topic</h3><span class="pill-dark">most urgent first</span></div>
        ${s.topics.length ? `<ul class="mastery">${s.topics.map((t) => {
          const d = docs.find((x) => x.id === t.documentId);
          return `<li><a href="${topicHref(t.key)}"><span><b>${esc(t.topic)}</b><em>${esc(d?.title || "")}</em></span><span class="m-mid">${levelPill(t.level)}<span class="goal-bar"><i style="width:${Math.round(t.mastery * 100)}%"></i></span></span><em>${pctOf(t.mastery)}</em></a></li>`;
        }).join("")}</ul>` : `<p class="sub">Add notes to see your topics here.</p>`}
      </article>
      <article class="panel glass"><div class="panel-head"><h3>Reviews due this week</h3></div>
        <div class="forecast">${forecast.map((n, k) => `<div><span>${n}</span><i style="height:${(n / fmax) * 100}%"></i><em>${k === 0 ? "Today" : fmtDate(Date.now() + k * DAY, { weekday: "short" })}</em></div>`).join("")}</div>
      </article>
    </div>
    <section class="gj lo-journey" id="lo-journey" aria-label="Level, quests and achievements"><p class="sub">Loading your level, quests and achievements…</p></section>
  </section>`;
  drawMyTree(s.acts).catch((e) => console.warn("Tree", e));
  document.getElementById("share-progress")?.addEventListener("click", () => progressCard(s, forecast).catch((e) => { console.warn("Share card", e); toast("Couldn't make the image."); }));
  // the Journey (kit/game/journey.js) lives here too, with its own styles, loaded once
  if (!document.querySelector("link[data-game-css]")) document.head.insertAdjacentHTML("beforeend", `<link rel="stylesheet" data-game-css href="${new URL("../styles/game.css", import.meta.url)}">`);
  mountJourney(document.getElementById("lo-journey"), { embedded: true, store }).catch((e) => { console.warn("Journey", e); });
}

// "Share my progress": a 1080×1350 image of the learner's active days, Gradify Tree, top topics by mastery and reviews
// due this week, with a small getgradify.com credit, for a study server, a story or #StudyTok. Made in the browser.
async function progressCard(s, forecast) {
  const W = 1080, H = 1350, c = document.createElement("canvas"); c.width = W; c.height = H;
  const g = c.getContext("2d"), grad = g.createLinearGradient(0, 0, W, 0);
  grad.addColorStop(0, "#4641ff"); grad.addColorStop(.4, "#f055dd"); grad.addColorStop(.75, "#ff5600"); grad.addColorStop(1, "#ffc002");
  g.fillStyle = "#0b0b0b"; g.fillRect(0, 0, W, H);
  g.fillStyle = "#fff"; g.font = "700 64px Inter, system-ui, sans-serif"; g.fillText("My study progress", 70, 130);
  g.font = "500 36px Inter, system-ui, sans-serif"; g.globalAlpha = .8;
  g.fillText(`${Object.keys(s.byDay).length} active days · ${forecast.reduce((a, b) => a + b, 0)} reviews due this week`, 70, 190); g.globalAlpha = 1;
  // the tree: drawn flat (SVG) off-screen, because on screen it may be the 3D island, which a canvas can't copy
  const { drawTreeFlat } = await import("../lifeos/tree.js"), { sites, bars } = treeData(s.acts), tmp = document.createElement("div");
  let seed = 7; const rand = () => { seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  try { drawTreeFlat(tmp, { sites: sites.length ? sites : [{ n: "Gradify", c: "4641ff", act: 0, k: 0, creds: [], leaves: { lesson: 0, flashcard: 0, quiz: 0 } }], bars, rand }); } catch (e) { console.warn("Tree for the card", e); }
  const svg = tmp.querySelector("svg");
  if (svg) {
    // an SVG without its own size draws at zero size, and page CSS doesn't reach the image: size and namespace it
    const copy = svg.cloneNode(true); copy.setAttribute("width", "600"); copy.setAttribute("height", "420"); copy.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const img = new Image(); img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(new XMLSerializer().serializeToString(copy))}`;
    await new Promise((r) => { img.onload = r; img.onerror = r; });
    try { g.drawImage(img, 240, 230, 600, 420); } catch { /* skip the tree */ }
  }
  g.font = "600 40px Inter, system-ui, sans-serif"; g.fillText("Mastery by topic", 70, 730);
  s.topics.slice(0, 5).forEach((t, i) => {
    const y = 790 + i * 92, m = Math.max(0, Math.min(1, (t.mastery ?? 0) > 1 ? t.mastery / 100 : t.mastery ?? 0));
    g.font = "500 32px Inter, system-ui, sans-serif"; g.fillStyle = "#fff"; g.fillText(String(t.topic).slice(0, 34), 70, y);
    g.fillStyle = "rgba(255,255,255,.15)"; g.fillRect(70, y + 18, 940, 18); g.fillStyle = grad; g.fillRect(70, y + 18, 940 * m, 18);
  });
  if (!s.topics.length) { g.font = "500 32px Inter, system-ui, sans-serif"; g.globalAlpha = .7; g.fillText("Just getting started.", 70, 800); g.globalAlpha = 1; }
  g.fillStyle = "#fff"; g.globalAlpha = .6; g.font = "500 30px Inter, system-ui, sans-serif"; g.fillText("getgradify.com · flashcards checked against your notes", 70, H - 60);
  const blob = await new Promise((r) => c.toBlob(r, "image/png")), file = new File([blob], "my-gradify-progress.png", { type: "image/png" });
  if (navigator.canShare?.({ files: [file] })) { try { await navigator.share({ files: [file], title: "My study progress" }); return; } catch (e) { if (e?.name === "AbortError") return; } }
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = file.name; a.click();
}

// The Gradify Tree (kit/lifeos/tree.js), from the learner's own activity log: a limb per site studied on in the last
// 30 days (or ever, if nothing recent), its leaves filling out with that site's activity; the island's grass is the
// last 60 days; gold fruit for every 500 XP earned on a site.
export function treeData(acts, now = Date.now()) {
  const recent = acts.filter((a) => now - Date.parse(a.at) < 30 * DAY);
  const bySite = new Map();
  for (const a of acts) { const k = a.site || "Gradify"; const r = bySite.get(k) || { act: 0, xp: 0 }; r.xp += a.xp || 0; bySite.set(k, r); }
  // each lesson, flashcard session and quiz in the last 30 days is a leaf on that site's tree (leafKind, learner-data.js)
  for (const a of recent) { const r = bySite.get(a.site || "Gradify"); r.act++; r.leaves ||= { lesson: 0, flashcard: 0, quiz: 0 }; const k = leafKind(a.kind); if (k) r.leaves[k]++; }
  const sites = [...bySite.entries()].sort((p, q) => q[1].act - p[1].act || q[1].xp - p[1].xp).slice(0, 8)
    .map(([n, r]) => ({ n, c: siteOf(n).c, act: r.act, k: Math.min(1, r.act / 36), leaves: r.leaves || { lesson: 0, flashcard: 0, quiz: 0 }, creds: Array.from({ length: Math.min(4, Math.floor(r.xp / 500)) }, (_, i) => ({ site: n, t: `${(i + 1) * 500} XP` })) }));
  const bars = Array.from({ length: 60 }, (_, i) => { const day = new Date(now - (59 - i) * DAY).toDateString(); return acts.filter((a) => new Date(a.at).toDateString() === day).length; });
  return { sites, bars };
}
async function drawMyTree(acts) {
  const el = document.getElementById("lo-tree-svg"); if (!el) return;
  const { drawTree } = await import("../lifeos/tree.js");
  const { sites, bars } = treeData(acts);
  let seed = 7; const rand = () => { seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  drawTree(el, { sites: sites.length ? sites : [{ n: "Gradify", c: "4641ff", act: 0, k: 0, creds: [] }], bars, rand });
  const side = document.getElementById("lo-tree-side"); if (!side) return;
  const L3 = sites.reduce((a, x) => ({ lesson: a.lesson + x.leaves.lesson, flashcard: a.flashcard + x.leaves.flashcard, quiz: a.quiz + x.leaves.quiz }), { lesson: 0, flashcard: 0, quiz: 0 });
  const leaves = L3.lesson + L3.flashcard + L3.quiz, fruit = sites.reduce((a, x) => a + x.creds.length, 0);
  side.innerHTML = sites.length ? `<div class="grow-stats"><div><b>${leaves}</b><span>leaves · last 30 days</span></div><div><b>${fruit}</b><span>gold fruit (500 XP each)</span></div><div><b>${bars.slice(-7).reduce((a, b) => a + b, 0)}</b><span>activities this week</span></div></div>
    <p class="leaf-key"><span><i class="lk-lesson"></i>${L3.lesson} lessons</span><span><i class="lk-flashcard"></i>${L3.flashcard} flashcard sessions</span><span><i class="lk-quiz"></i>${L3.quiz} quizzes</span></p>
    <ul class="grow-legend">${sites.map((x) => `<li><i style="background:#${x.c}"></i><span>${esc(x.n)}</span><em>${x.act}</em></li>`).join("")}</ul>`
    : `<p class="sub">Your tree is a seedling. Finish a lesson, review some cards or use a tool and it starts to grow.</p>`;
}

// ---------- Plan ----------
const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
// The next five weeks at a glance: study blocks, exam and deadline days (from the profile and from dates found in
// notes), and today. Everything comes from plan_blocks and the profile; nothing new is stored.
function monthGrid(blocksAhead, examDate) {
  const start = new Date(); start.setHours(0, 0, 0, 0); start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
  const cells = [];
  for (let i = 0; i < 35; i++) {
    const d = dayKey(+start + i * DAY), list = blocksAhead.filter((b) => b.day === d);
    const marks = [d === examDate || list.some((b) => b.cal === "exam") ? "exam" : "", list.some((b) => b.cal === "deadline") ? "deadline" : "", list.some((b) => b.cal === "goal") ? "goal" : "", list.some((b) => b.cal === "study") ? "study" : ""].filter(Boolean);
    const past = d < today(), label = `${fmtDate(d, { weekday: "long", day: "numeric", month: "long" })}${marks.includes("exam") ? ", exam" : ""}${marks.includes("deadline") ? ", deadline" : ""}${marks.includes("goal") ? ", goal due" : ""}${list.filter((b) => b.cal !== "goal").length ? `, ${list.filter((b) => b.cal !== "goal").length} planned` : ""}`;
    cells.push(`<li class="${past ? "past" : ""} ${d === today() ? "today" : ""}" title="${esc(label)}" aria-label="${esc(label)}"><span>${new Date(d).getDate()}</span>${marks.map((m) => `<i class="mk ${m}"></i>`).join("")}</li>`);
  }
  return `<ol class="month" role="list">${["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((w) => `<li class="wd" aria-hidden="true">${w}</li>`).join("")}${cells.join("")}</ol>
    <p class="sub month-key"><i class="mk exam"></i> Exam <i class="mk deadline"></i> Deadline <i class="mk goal"></i> Goal due <i class="mk study"></i> Study planned</p>`;
}

async function renderPlan(arg) {
  const s = await stats();
  await ensureReviewBlock(s);
  const M = await model();
  const days = Array.from({ length: 7 }, (_, k) => dayKey(Date.now() + k * DAY));
  const [blocks, ahead, L, goalsAll] = await Promise.all([store.listBlocks(days[0], days[6]), store.listBlocks(days[0], dayKey(Date.now() + 120 * DAY)).catch(() => []), learnerAcross(), store.listGoals().catch(() => [])]);
  const goalDates = goalsAll.filter((g) => g.status === "active" && g.target_date && g.target_date >= days[0]);
  // coming up: the exam date, dated items from notes (exam and deadline blocks), and each course's pace towards it
  const examIn = profile.exam_date ? Math.ceil((new Date(profile.exam_date) - new Date(today())) / DAY) : null;
  const upcoming = [
    ...(examIn != null && examIn >= 0 ? [{ day: profile.exam_date, title: `Exam${profile.site ? ` (${profile.site})` : ""}`, kind: "exam" }] : []),
    ...ahead.filter((b) => b.cal === "exam" || b.cal === "deadline").map((b) => ({ day: b.day, title: b.title, kind: b.cal })),
    ...goalDates.map((g) => ({ day: g.target_date, title: g.title, kind: "goal" })),
  ].sort((a, b) => a.day.localeCompare(b.day)).slice(0, 8);
  const paced = (L?.courses || []).filter((c) => c.examDate && c.pace && !["done", "no-date"].includes(c.pace.status));
  view.innerHTML = `<section class="planner">
    <div class="deck-head"><div><span class="kicker lo-kicker">${icon("calendar")}Smart Plan</span><h1>${ACCESS.has("intelligence") ? "Your plan, worked out for you" : "Your study plan"}</h1><p class="sub">${ACCESS.has("intelligence") ? `Gradify builds each day from what matters most (misconceptions, fading memory, deadlines, due cards and new material) and fits it into your free time, with breaks. <a href="#/intel">Change your hours and energy</a>.` : "Plan your study blocks for the week. With Gradify Pro, Gradify works out the plan for you."}</p></div>${ACCESS.has("intelligence") ? `<button type="button" class="btn btn-primary lg" id="autoplan"><span>Plan my week</span></button>` : ""}</div>
    ${ACCESS.has("intelligence") ? `${catchUpHtml(M) || rescheduleHtml(M)}
    ${tellHtml()}
    ${smartPlanHtml(M, arg)}` : ""}
    ${ACCESS.has("calendar") || M.intel.calendars_retired?.seen === false || M.blocks.some((b) => ["external", "away", "allday", "ext-exam", "ext-deadline"].includes(b.cal)) ? calendarPanelHtml(M) : ""}
    <div class="cal-top">
      <article class="panel glass"><div class="panel-head"><h3>Next five weeks</h3><span class="pill-dark">${fmtDate(Date.now(), { month: "long", year: "numeric" })}</span></div>${monthGrid([...ahead, ...goalDates.map((g) => ({ day: g.target_date, cal: "goal" }))], profile.exam_date)}</article>
      <article class="panel glass"><div class="panel-head"><h3>Coming up</h3></div>
        ${upcoming.length ? `<ul class="upcoming">${upcoming.map((u) => { const n = Math.ceil((new Date(u.day) - new Date(today())) / DAY); return `<li class="${u.kind}"><time><b>${new Date(u.day).getDate()}</b>${fmtDate(u.day, { month: "short" })}</time><span><b>${esc(u.title)}</b><em>${u.kind === "exam" ? "Exam" : u.kind === "goal" ? "Goal" : "Deadline"} · ${n === 0 ? "today" : n === 1 ? "tomorrow" : `in ${n} days`}</em></span></li>`; }).join("")}</ul>`
          : `<p class="sub">No exams or deadlines yet. Set your exam date in <a href="#/account">Account</a>; dates in notes you add (exams, deadlines) appear here too.</p>`}
        ${paced.length ? `<h4 class="brief-h">Course pace</h4><ul class="upcoming pace">${paced.map((c) => { const [tone, label] = PACE[c.pace.status] || ["", c.pace.status]; return `<li><span><b>${esc(c.name)}</b><em class="${tone}">${esc(label)}${c.pace.needPerDay ? ` · about ${Math.round(c.pace.needPerDay * 10) / 10} lessons a day` : ""}</em></span></li>`; }).join("")}</ul>` : ""}
      </article>
    </div>
    <h2 class="lo-h">This week</h2>
    <form class="panel glass add-block" id="add-block">
      <label><span>Day</span><select name="day">${days.map((d, k) => `<option value="${d}">${k === 0 ? "Today" : fmtDate(d, { weekday: "long", day: "numeric" })}</option>`).join("")}</select></label>
      <label><span>From</span><input type="time" name="from" value="18:00" step="900" required></label>
      <label><span>To</span><input type="time" name="to" value="19:00" step="900" required></label>
      <label class="grow"><span>What</span><input name="title" placeholder="e.g. Physiology reading" required maxlength="80"></label>
      <button class="btn btn-light lg btn-sm" type="submit"><span>Add block</span></button>
    </form>
    <div class="week-list">${days.map((d, k) => {
      const list = blocks.filter((b) => b.day === d).sort((a, b) => a.start_min - b.start_min);
      const exam = profile.exam_date === d;
      return `<article class="panel glass day-col ${k === 0 ? "is-today" : ""}"><h3>${k === 0 ? "Today" : fmtDate(d, { weekday: "long" })} <em>${fmtDate(d)}</em></h3>
        ${exam ? `<p class="exam-flag">${icon("flame")}Exam day</p>` : ""}
        ${list.length ? `<ul class="blocks">${list.map((b) => `<li class="${b.done ? "done" : ""} cal-${b.cal}" data-id="${b.id}"><time>${hhmm(b.start_min)}–${hhmm(b.end_min)}</time><span>${esc(b.title)}</span>
          <button type="button" class="icon-btn" data-act="done" aria-label="${b.done ? "Mark not done" : "Mark done"}">${icon("check")}</button><button type="button" class="icon-btn" data-act="del" aria-label="Delete block">${icon("x")}</button></li>`).join("")}</ul>` : `<p class="sub">Free</p>`}
      </article>`;
    }).join("")}</div>
    ${ACCESS.has("intelligence") ? "" : plusPanelHtml("intelligence", { pricing: PRICING, compact: true })}
    ${ACCESS.has("calendar") ? "" : plusPanelHtml("calendar", { pricing: PRICING, compact: true })}
  </section>`;
  view.querySelector("#add-block").addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const toMin = (t) => { const [h, m] = String(t).split(":").map(Number); return h * 60 + m; };
    const a = toMin(f.get("from")), b = toMin(f.get("to"));
    if (b <= a) { toast("The end time needs to be after the start."); return; }
    await store.saveBlock({ day: f.get("day"), start_min: a, end_min: b, title: String(f.get("title")).trim(), cal: "study" });
    renderPlan();
  });
  view.querySelector(".week-list").addEventListener("click", async (e) => {
    const li = e.target.closest("li[data-id]"), act = e.target.closest("[data-act]")?.dataset.act;
    if (!li || !act) return;
    const b = blocks.find((x) => x.id === li.dataset.id);
    if (act === "del") await store.deleteBlock(b.id);
    else {
      await store.saveBlock({ ...b, done: !b.done });
      if (!b.done) { complete("Session done", { sub: b.title }); record(store, { event: "plan_block_done", site: profile.site, detail: { title: b.title.slice(0, 120), mins: b.end_min - b.start_min, auto: Boolean(b.auto), start_min: b.start_min } }); }
      if (!b.done) await store.logActivity({ site: profile.site, kind: "block", xp: Math.min(60, Math.round((b.end_min - b.start_min) / 3)), detail: { title: b.title } });
    }
    renderPlan();
  });
  wireSmartPlan(view, M, { store, toast, rerender }, arg);
  wireCalendar(view, M, { store, toast, saveIntel, rerender, complete });
  wireAutopilot(view, M, apctx());
  wireTell(view, M, apctx());
  $("#autoplan")?.addEventListener("click", async (e) => {
    e.currentTarget.disabled = true;
    const made = await planWeek(M, store, s.cards);
    if (made) complete("Week planned", { sub: `${made} ${made === 1 ? "session" : "sessions"} in your free time` });
    else toast("Your week already has Gradify sessions, or no free time is set.");
    renderPlan(arg);
  });
}

// ---------- Account ----------
// ---------- MyGradify: your course (kit/app/academic-views.js) ----------
async function renderMyRoute(arg, more = []) {
  await renderMy(arg, more, { view, store, site: SITE || profile.site, toast, profile: () => profile, refresh: async () => { profile = await store.getProfile(); syncMirror(profile); }, rerender: () => route() });
}
let academicFromStart = false;
async function renderAcademicRoute(step) {
  await renderAcademic(step, {
    view, store, site: SITE || profile.site, toast,
    profile: () => profile,
    refresh: async () => { profile = await store.getProfile(); syncMirror(profile); },
    rerender: () => route(),
    next: () => (academicFromStart ? (currentOffer() ? "#/offer" : "#/new") : "#/my"),
  });
}
async function renderAccount() {
  const user = store.mode === "cloud" ? await store.user() : null;
  const s = siteOf(profile.site);
  view.innerHTML = `<section class="account">
    <h1>Account</h1>
    <article class="panel glass">
      ${user ? `<div class="panel-head"><div><h3>Signed in</h3><p class="sub">${esc(user.email)} · your notes and progress are saved to your Gradify account.</p></div><button type="button" class="btn btn-ghost lg btn-sm" id="signout"><span>Sign out</span></button></div>`
        : cloudConfigured() ? `${currentOffer({ includeDismissed: true }) ? `<p class="offer-note"><b>Your £5 Gradify Pro offer is saved.</b> Sign in or create your free account, and it'll be waiting for you.</p>` : ""}<h3>Save your progress to a Gradify account</h3><p class="sub">Sign in to keep your notes on every device and to use Gradify AI. Anything on this device moves across.</p>
          <form id="signin" class="signin"><label class="sr-only" for="email">Email</label><input id="email" type="email" required placeholder="you@example.com" autocomplete="email"><button class="btn btn-primary lg btn-sm" type="submit"><span>Email me a sign-in link</span></button></form>
          <button type="button" class="btn btn-ghost lg btn-sm" id="google"><span>Continue with Google</span></button>`
        : `<h3>Saved on this device</h3><p class="sub">Gradify accounts aren't switched on yet, so your notes and progress are saved in this browser${store.persistent ? "" : " for this visit only (this browser is blocking storage)"}. Export a copy below to keep it safe.</p>`}
    </article>
    ${user ? `<article class="panel glass plan-panel" id="plan-panel" aria-live="polite"><h3>Your plan</h3><p class="sub">Checking your plan…</p></article>` : ""}
    ${academicPanelHtml(learnerOf(profile), { site: SITE || profile.site })}
    <form class="panel glass setup-form" id="prefs">
      <h3>Your learning</h3>
      <label><span>Goal</span><select name="goal">${GOALS.map((g) => `<option value="${g.id}" ${profile.goal === g.id ? "selected" : ""}>${g.t}</option>`).join("")}</select></label>
      ${SITE ? "" : `<label><span>Subject</span><select name="site">${SITES.map((x) => `<option ${x.n === s.n ? "selected" : ""}>${esc(x.n)}</option>`).join("")}</select></label>`}
      <label><span>Exam date</span><input type="date" name="exam_date" value="${profile.exam_date || ""}"></label>
      <label><span>Daily study time</span><select name="daily_minutes">${[10, 20, 30, 45, 60, 90].map((m) => `<option value="${m}" ${Number(profile.daily_minutes) === m ? "selected" : ""}>${m} minutes</option>`).join("")}</select></label>
      <label><span>Level</span><select name="level">${[["school", "School"], ["undergraduate", "University"], ["postgraduate", "Postgraduate"], ["professional", "Professional"]].map(([v, l]) => `<option value="${v}" ${profile.level === v ? "selected" : ""}>${l}</option>`).join("")}</select></label>
      <label><span>What you already know about ${esc(s.n)}</span><select name="prior">${PRIOR.map(([v, l]) => `<option value="${v}" ${(learnerOf(profile).prior[s.n] || "new") === v ? "selected" : ""}>${l}</option>`).join("")}</select></label>
      ${prefsFields(learnerOf(profile).prefs)}
      <p class="sub">Every Gradify site uses these: courses pace your plan from your exam date and daily time.${learnerOf(profile).onboarded_at ? "" : ` <a href="#/start">Run set-up</a>`}</p>
      <button class="btn btn-light lg btn-sm" type="submit"><span>Save</span></button>
    </form>
    <article class="panel glass" data-pane="prefs"><div class="panel-head"><div><h3>Reading and accessibility</h3><p class="sub">Page size, font, spacing, line length, background tint, contrast, motion, focus mode, read aloud and how long your study blocks are. Each one separately, on every Gradify page.</p></div><button type="button" class="btn btn-light lg btn-sm" id="open-access"><span>Change</span></button></div></article>
    ${hapticsSupported() ? `<article class="panel glass"><div class="panel-head"><div><h3>Haptics</h3><p class="sub">A light buzz when you rate a card, shuffle a pile or plan your day.</p></div><label class="switch"><input type="checkbox" id="haptics" role="switch" ${hapticsOn() ? "checked" : ""}><span class="sw-track lg" aria-hidden="true"><span class="sw-knob"></span></span></label></div></article>` : ""}
    <div id="notify-slot"></div>
    <article class="panel glass"><h3>Your data</h3><p class="sub">${SITE ? `It's yours. Download or delete everything you've added on ${esc(SITE)}. Your notes on other Gradify sites stay as they are.` : "It's yours. Download everything, or delete it."}</p>
      <div class="row-actions"><button type="button" class="btn btn-light lg btn-sm" id="export"><span>Download my data</span></button><button type="button" class="btn btn-ghost lg btn-sm danger" id="wipe"><span>Delete all my data</span></button></div></article>
  </section>`;
  if (user) renderBillingPlan();
  wireAcademicPanel(view, { store, toast, refresh: async () => { profile = await store.getProfile(); syncMirror(profile); }, rerender: () => route() });
  $("#prefs").addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const site = SITE || f.get("site");
    profile = await store.saveProfile({ goal: f.get("goal"), site, exam_date: f.get("exam_date") || null, daily_minutes: Number(f.get("daily_minutes")), level: f.get("level") });
    const l = learnerOf(profile);
    await saveLearner(store, { subjects: [...new Set([...l.subjects, site])], prior: { [site]: f.get("prior") }, prefs: prefsFrom(f) });
    profile = await store.getProfile();
    toast("Saved.");
  });
  $("#open-access")?.addEventListener("click", (e) => window.gradifyAccess?.open(e.currentTarget));
  $("#haptics")?.addEventListener("change", (e) => { setHaptics(e.target.checked); haptic("success"); });
  { const nm = { intel: intelOf(learnerOf(profile)), storeMode: store.mode }; const slot = $("#notify-slot"); if (slot) { slot.outerHTML = notifyPanelHtml(nm); wireNotify(view, nm, apctx()); } }
  $("#export").addEventListener("click", async () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify({ ...(await store.exportAll()), quick_notes: exportJots() }, null, 2)], { type: "application/json" }));
    a.download = `gradify-data-${today()}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });
  $("#wipe").addEventListener("click", async () => {
    if (!confirm("Delete all your notes, cards and progress? This can't be undone.")) return;
    await store.wipe();
    clearJots();   // quick notes live beside the store, on this device (kit/notes/jot.js)
    profile = await store.getProfile();
    location.hash = "#/start";
  });
  $("#signin")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    try { await store.signInWithEmail($("#email").value.trim()); toast("Check your email for a sign-in link."); } catch (err) { toast(esc(err.message)); }
  });
  $("#google")?.addEventListener("click", () => store.signInWithGoogle().catch((err) => toast(esc(err.message))));
  $("#signout")?.addEventListener("click", async () => { await store.signOut(); location.reload(); });
}

// The learner's Gradify plan on the Account page: Free, Pro or Ultra, what needs doing, Manage billing, and Gradify AI used
// this month. The subscription row is the learner's own (row-level security); only the billing webhook writes it.
async function renderBillingPlan() {
  const box = $("#plan-panel");
  if (!box) return;
  const pricing = /(^|\.)getgradify\.com$|^localhost/.test(location.hostname) ? "/pricing.html" : "https://getgradify.com/pricing.html";
  let sub, uses = [];
  try { [sub, uses] = await Promise.all([mySubscription(store), myAllowance(store).catch(() => [])]); }
  catch { box.innerHTML = `<h3>Your plan</h3><p class="sub">Your plan couldn't be loaded just now. Your notes and progress aren't affected. <a href="${pricing}">See plans</a></p>`; return; }
  const p = describePlan(sub);
  const tone = { ok: "✓", warn: "!", info: "i" }[p.tone];
  const on = uses.some((u) => u.enabled);
  const usage = uses.length && on
    ? `<ul class="plan-uses">${uses.map((u) => `<li><span>${esc(AI_ALLOWANCES.find((a) => a.feature === u.feature)?.label || u.feature)}</span><b>${u.used} of ${u.allowance}</b></li>`).join("")}</ul><p class="sub">Gradify AI used this month${uses[0]?.period_end ? `, resetting on ${new Date(uses[0].period_end).toLocaleDateString("en-GB", { day: "numeric", month: "long" })}` : ""}.</p>`
    : `<p class="sub">Gradify AI isn't switched on yet. Your allowance will show here when it is.</p>`;
  box.innerHTML = `<div class="panel-head"><div><h3>Your plan: ${esc(p.title)}</h3><p class="sub plan-line ${p.tone}"><span aria-hidden="true">${tone}</span> ${esc(p.line)}</p></div>
      <div class="row-actions">${p.manage ? `<button type="button" class="btn btn-light lg btn-sm" id="manage-billing"><span>Manage billing</span></button>` : ""}<a class="btn btn-ghost lg btn-sm" href="${pricing}"><span>${p.plan === "free" ? "See Gradify Pro" : "See plans"}</span></a></div></div>
    ${usage}`;
  $("#manage-billing")?.addEventListener("click", async (e) => {
    const b = e.currentTarget; b.disabled = true; b.querySelector("span").textContent = "Opening Stripe…";
    try { await openPortal(store, `${location.pathname}#/account`); }
    catch (err) { b.disabled = false; b.querySelector("span").textContent = "Manage billing"; toast(esc(err.message)); }
  });
}

// ---------- Earth: the learner's subject as a world, with their real topics and mastery ----------
// Each built Gradify site has a learning map (kit/earth/subject-map.js) that sorts the learner's own topics into the
// subject's areas. Here it's shown inside LifeOS, for the subject they're studying, with a switch between subjects.
async function renderEarth(arg) {
  const L = await learnerAcross().catch(() => null);
  const mine = [...new Set([profile.site, ...learnerOf(profile).subjects, ...(L?.courses || []).map((c) => c.site)])].map(siteOf).filter((x) => x.built);
  const choice = mine.find((x) => x.n === decodeURIComponent(arg || "")) || mine[0];
  view.innerHTML = `<section class="earth-route">
    <span class="kicker lo-kicker">${icon("globe")}Gradify Earth</span>
    <h1>Your subject, as a world</h1>
    <p class="sub">Each area of ${choice ? esc(choice.n) : "your subject"} is a region and each topic is a pin. Topics from your own notes take the place of the ones they match, lit by your real mastery. Pins you haven't studied yet show example progress, and say so.</p>
    ${mine.length > 1 ? `<div class="seg-chips">${mine.map((x) => `<a class="chip" href="#/earth/${encodeURIComponent(x.n)}" aria-pressed="${x === choice}">${esc(x.n)}</a>`).join("")}</div>` : ""}
    ${choice ? `<div class="earth-frame panel glass"><iframe src="${pathOf(choice)}map.html" title="${esc(choice.n)} learning map" loading="lazy"></iframe></div>
      <p class="sub"><a href="${pathOf(choice)}map.html" target="_blank" rel="noopener">Open the map full screen ↗</a></p>`
    : `<article class="panel glass"><h3>No map for this subject yet</h3><p class="sub">Choose a subject with a Gradify site in <a href="#/account">Settings</a> and its world appears here.</p></article>`}
  </section>`;
}
routes.earth = renderEarth;

// ---------- Gradify AI: what it does for you, and how much of this month's allowance is left ----------
async function renderAi(arg) {
  const M = await model({ autoMove: false });
  const user = store.mode === "cloud" ? await store.user() : null;
  const uses = user ? await myAllowance(store).catch(() => []) : [];
  const on = uses.filter((u) => u.enabled);
  const docs = await store.listDocuments().catch(() => []);
  const s = siteOf(profile.site);
  const tools = [
    ["upload", "Study packs from messy notes", "Reads handwriting-heavy PDFs, diagrams and scans, and checks every card against what you wrote.", "#/new", "Add notes"],
    ["brain", "Explain and apply questions", "Questions that make you explain why and use an idea on a problem you haven't seen.", docs[0] ? `#/deck/${docs[0].id}` : "#/new", docs[0] ? "Open your latest pack" : "Make a pack first"],
    ["book", "A tutor in every lesson", "Talk a topic through, get questioned like a viva, or ask why something works, grounded in the lesson's notes.", "#/learning", "Go to your courses"],
    ["checklist", "Fix a card", "Regenerate any card that doesn't match your notes, straight from the pack.", docs[0] ? `#/deck/${docs[0].id}` : "#/library", "Open a pack"],
  ];
  view.innerHTML = `<section class="ai-route">
    <span class="kicker lo-kicker">${icon("sparkles")}Gradify AI</span>
    <h1>An assistant that works from your own notes</h1>
    <p class="sub">Gradify AI (Claude) only answers from your notes and Gradify's lessons, so you can check every answer against the source.</p>
    ${askHtml(arg ? decodeURIComponent(arg) : "")}
    <article class="panel glass ai-allow">
      ${user ? (on.length ? `<div class="panel-head"><h3>This month</h3><a class="see" href="${PRICING}">Plans</a></div><ul class="plan-uses">${on.map((u) => `<li><span>${esc(AI_ALLOWANCES.find((a) => a.feature === u.feature)?.label || u.feature)}</span><b>${u.used} of ${u.allowance}</b></li>`).join("")}</ul>`
        : `<h3>Gradify AI isn't switched on yet</h3><p class="sub">Your allowance will show here when it is. Everything else in Gradify works now.</p>`)
      : `<h3>Sign in to use Gradify AI</h3><p class="sub">It's free, with a monthly allowance. Your notes and cards on this device move into your account.</p><a class="btn btn-light lg btn-sm" href="#/account"><span>Sign in</span></a>`}
    </article>
    <div class="ai-tools">${tools.map(([ic, t, d, href, cta]) => `<a class="panel glass ai-tool" href="${href}"><span class="ai-ico">${icon(ic)}</span><b>${t}</b><span class="sub">${d}</span><span class="see">${cta} →</span></a>`).join("")}</div>
    <p class="sub">Studying ${esc(s.n)}. Ask Gradify answers from your own evidence in this browser; when you use Gradify AI, the text it needs is sent to Anthropic's Claude API. See <a href="/privacy.html">privacy</a>.</p>
  </section>`;
  wireAsk(view, M, { store, ai: Boolean(user), signin: store.mode !== "cloud" && cloudConfigured() });
}
routes.ai = renderAi;

// ---------- Intelligence, My Knowledge, Revision Centre (kit/app/intel-views.js) ----------
routes.intel = async () => {
  if (!ACCESS.has("intelligence")) { view.innerHTML = `<section class="intel-page"><div class="deck-head"><div><span class="kicker lo-kicker">${icon("sparkles")}Gradify Intelligence</span><h1>Let Gradify run your studying</h1></div></div>${plusPanelHtml("intelligence", { pricing: PRICING })}${plusPanelHtml("calendar", { pricing: PRICING, compact: true })}</section>`; promptPlus("intelligence", { pricing: PRICING, signedIn: store.mode === "cloud" }); return; }
  const m = await model(); renderIntelPage(view, m, { toast, saveIntel, modes: modesHtml(m) }); view.querySelector(".intel-page .learned")?.insertAdjacentHTML("beforebegin", notifyPanelHtml(m)); mountIntel3(view, m, apctx()); wireAutopilot(view, m, apctx()); wireNotify(view, m, apctx()); };
routes.knowledge = async () => { const m = await model({ autoMove: false }); renderKnowledgePage(view, m, { courses: m.L?.courses || [] }); };
routes.revise = async (arg) => { const m = await model({ autoMove: false }); renderRevisePage(view, m, arg); view.querySelector(".revise-page .seg-chips")?.insertAdjacentHTML("beforebegin", decomposeHtml()); wireDecompose(view, m, apctx()); };

// ---------- Community (kit/app/community.js): chats, study groups, friends' and school leaderboards, tutors, mentors, internships ----------
let catalogueP = null;
async function renderCommunity(arg) {
  catalogueP ||= fetch(new URL("../api/v1/catalogue.json", import.meta.url)).then((r) => r.json()).catch(() => ({ courses: [] }));
  const [{ renderCommunity: draw }, cat] = await Promise.all([import("./community.js"), catalogueP]);
  const courses = (cat.courses || []).map((c) => ({ slug: c.slug, name: c.name, site: c.site }));
  // the subjects this learner studies: their site's courses, and any course they've started on this device
  const started = courses.filter((c) => { try { return localStorage.getItem(`gradify.course.${c.slug}`); } catch { return false; } }).map((c) => c.slug);
  const subjects = [...new Set([...courses.filter((c) => profile.site && c.site === profile.site).map((c) => c.slug), ...started])];
  await draw({ view, store, toast, courses, subjects, appProfile: profile }, arg);
  view.querySelector(".community-route")?.insertAdjacentHTML("beforeend", sharePanel());
  wireSharePanel();
}
routes.community = renderCommunity;
routes.session = () => renderSession({ view, store, toast });

// ---------- Free on a second device ----------
function showDeviceBanner(cloud, device) {
  const when = (iso) => new Date(iso).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
  const can = !device.canSwitchAt || new Date(device.canSwitchAt) <= new Date();
  view.insertAdjacentHTML("beforebegin", `<aside class="device-banner panel glass" role="status">
    <div><b>You're studying on another device.</b> <span class="sub">Gradify Free studies on one device at a time. Everything you've made is safe and you can look at it here, but changes are saved only on your study device.</span></div>
    <div class="row-actions">${can ? `<button class="btn btn-light btn-sm" id="device-here" type="button"><span>Study on this device instead</span></button>` : `<span class="sub">You can move here from ${esc(when(device.canSwitchAt))}.</span>`}
      <a class="btn btn-ghost btn-sm" href="${PRICING}"><span>Every device with Pro</span></a></div>
  </aside>`);
  $("#device-here")?.addEventListener("click", async (e) => {
    e.currentTarget.disabled = true;
    try { await switchDevice(cloud); location.reload(); }
    catch (err) { e.currentTarget.disabled = false; toast(err.message === "too_soon" ? `You can move here from ${esc(when(err.canSwitchAt))}.` : esc(err.message)); }
  });
}

// ---------- Start ----------
// a network step that takes too long is treated as failed, so a slow or unreachable server never leaves a blank screen
const within = (p, ms, what) => Promise.race([Promise.resolve(p), new Promise((_, no) => setTimeout(() => no(new Error(`${what} took too long`)), ms))]);
async function boot() {
  try { await start(); }
  catch (e) {
    // the account couldn't be reached or read: open on this device rather than show nothing, and say so
    console.error("Gradify couldn't open your account", e);
    try {
      store = new LocalStore(); ACCESS = await access(store); profile = await store.getProfile();
      $("#mode").innerHTML = `${icon("lock")}<span>On this device</span>`;
      view.insertAdjacentHTML("beforebegin", `<aside class="device-banner panel glass" role="status"><div><b>Couldn't reach your account just now.</b> <span class="sub">You're on this device's copy. Nothing in your account is lost.</span></div><div class="row-actions"><button class="btn btn-light btn-sm" type="button" id="boot-retry"><span>Try again</span></button></div></aside>`);
      $("#boot-retry")?.addEventListener("click", () => location.reload());
      markLocks();
      addEventListener("hashchange", route);
      route();
    } catch (e2) {
      console.error(e2);
      view.innerHTML = `<div class="panel glass"><h3>Gradify couldn't start</h3><p class="sub">${esc(e2.message || String(e2))}</p><button class="btn btn-light btn-sm" type="button" data-reload><span>Try again</span></button></div>`;
      view.querySelector("[data-reload]").addEventListener("click", () => location.reload());
    }
  }
}
async function start() {
  const local = new LocalStore();
  const cloud = await within(CloudStore.create(), 10000, "Connecting");
  const user = cloud ? await within(cloud.user(), 12000, "Signing in") : null;
  store = user ? cloud : (cloud && cloudConfigured() ? Object.assign(local, { signInWithEmail: (e) => cloud.signInWithEmail(e), signInWithGoogle: () => cloud.signInWithGoogle() }) : local);
  // Free studies on one active device: on any other, everything stays readable and nothing is changed (kit/data/plan.js)
  const device = user ? await within(deviceStatus(cloud), 8000, "Checking this device").catch(() => ({ active: true })) : { active: true };
  if (user && device.active && local.hasData() && !localStorage.getItem(`gradify.moved.${user.id}`)) {
    try {
      // goals move on their own (below); any not moved yet must survive this wipe
      const keep = await local.listGoals();
      await cloud.importLocal(local); localStorage.setItem(`gradify.moved.${user.id}`, "1"); await local.wipe();
      for (const g of keep) await local.saveGoal(g);
      toast("Moved your notes and progress from this device into your account.");
    }
    catch (e) { console.error(e); toast("Couldn't move this device's data into your account. It's still saved here."); }
  }
  // goals made on this device move into the account; retried on every signed-in visit until they're all there
  if (user) { try { const r = await cloud.moveGoals(local); if (r.moved) toast(`Moved ${r.moved} goal${r.moved === 1 ? "" : "s"} from this device into your account.`); } catch (e) { console.warn("Goals stay on this device for now", e?.message); } }
  if (user) recordFirstTouch(cloud.db, user);
  cloud?.onAuth((u) => { if (Boolean(u) !== Boolean(user)) location.reload(); });
  // on a sub-site, the app only sees that site's notes and progress
  if (SITE) { store = scopeToSite(store, SITE); picks.site = SITE; }
  if (!device.active) { store = readOnly(store, "You're on Free, which studies on one device. Move your studying here, or get Gradify Pro to study on every device."); showDeviceBanner(cloud, device); }
  ACCESS = await within(access(store), 8000, "Checking your plan").catch(() => ({ plan: "free", enforced: false, has: () => true }));
  profile = await within(store.getProfile(), 12000, "Loading your profile");
  markLocks();
  syncMirror(profile);   // the account's settings, for every site in this browser
  // calendar links saved before November 2026 are removed from the account and this browser (a feed link works like
  // a password); events already imported from them stay in the plan, and the calendar panel says so once
  {
    const { retiredIntel } = await import("../intel/calsync.js");
    const next = retiredIntel(learnerOf(profile).intel);
    if (next) { await saveLearner(store, { intel: next }).catch((e) => console.warn("Calendar links not removed yet", e?.message)); profile = await store.getProfile(); }
  }
  // the launch offer follows the account to the learner's other devices
  // (awaited, once per account, so it can't race a set-up or settings save made straight after)
  if (user) { const o = storedOffer(Date.now(), learnerOf(profile)); if (o && !learnerOf(profile).offer) { await saveLearner(store, offerForAccount(o)).catch(() => {}); profile = await store.getProfile(); } }
  // arriving from a site card on getgradify.com: "Study MedGradify in Gradify"
  const fromSite = SITE ? null : new URLSearchParams(location.search).get("site");
  if (fromSite && SITES.some((x) => x.n === fromSite)) {
    picks.site = fromSite;
    if (profile.goal && profile.site !== fromSite) { profile = await store.saveProfile({ site: fromSite }); toast(`Switched to ${esc(fromSite)}.`); }
    history.replaceState(null, "", location.pathname + location.hash);
  }
  // a sub-site's own name and icon in the top bar
  if (SITE) {
    const s = siteOf(SITE), brand = $(".brand");
    if (brand) brand.innerHTML = `<span class="icon" style="--c:#${s.c};--tile:${tile(s.c)};--ink:${ink(s.c)}">${icon(s.i)}</span>${nameHtml(s)}`;
    document.title = SITE;
  }
  $("#mode").innerHTML = user ? `${icon("check")}<span>${esc(user.email)}</span>` : `${icon("lock")}<span>On this device</span>`;
  addEventListener("hashchange", route);
  route();
  // a returning learner is offered the Gradify app on the App Store (once the listing is live; dismissing it keeps it away for three weeks)
  if (countVisit() >= 2) setTimeout(() => offerInstall(), 6000);
}
boot();
