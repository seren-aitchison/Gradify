// Gradify app: bring your notes, get a checked study pack, revise it, and watch your progress.
// Every screen reads and writes the same store, so they always agree.
import { GROUPS } from "../core/sites.js";
import { icon } from "../core/icons.js";
import { tile, ink } from "../core/colour.js";
import { SAMPLE, readFile } from "../notes/studio.js";
import { LocalStore, CloudStore, cloudConfigured, scopeToSite } from "../data/store.js";
import { describePlan, mySubscription, myAllowance, openPortal, AI_ALLOWANCES } from "../data/billing.js";
import { learnerOf, saveLearner, syncMirror, needsSetup, applyPrefs, PRIOR } from "../data/profile.js";
import { trackView } from "../core/analytics.js";
import { captureFirstTouch, recordFirstTouch } from "../core/attribution.js";
captureFirstTouch();
applyPrefs();
import { currentSite, nameHtml, pathOf } from "../core/site.js";
// on a sub-site (getgradify.com/medgradify/), the app belongs to that site
const SITE = currentSite();
trackView(SITE || "Gradify app");
import { generate, regenerateCard, generateQuestions } from "../notes/engine.js";
import { schedule, preview, isDue, isLearned, fmtInterval, RATINGS } from "../learning/srs.js";
import { topicProfiles, practiceOrder, LEVELS } from "../learning/mastery.js";
import { sixHtml, calibrationHtml, HOW } from "../learning/mastery-view.js";
import { levelOf as gameLevelOf } from "../game/engine.js";
import { loadLearner, COURSES } from "../learning/learner-data.js";
import { mountJourney, journeySummary } from "../game/journey.js";
import { AREAS, METRICS, PERIODS, HABIT_MODES, validateGoal, goalProgress, focusGoals } from "../learning/goals.js";
import { goalData } from "../learning/goal-data.js";
import { PRO_ON_SALE } from "../data/billing.js";
import { cockpitHtml, wireCockpit, welcomeHtml } from "./cockpit.js";
import { haptic, hapticsOn, setHaptics, hapticsSupported } from "../core/haptics.js";
import { loadModel } from "../intel/model.js";
import { intelOf } from "../intel/schedule.js";
import { intelStripHtml, nextHtml, upcomingHtml, rescheduleHtml, forecastWidget, askWidget, conceptPileWidget, wireIntel, applyMoves, renderIntelPage, renderKnowledgePage, renderRevisePage, askHtml, wireAsk, smartPlanHtml, wireSmartPlan, planWeek } from "./intel-views.js";

const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
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

let store, profile, view = $("#view");

// ---------- Toast ----------
let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.innerHTML = msg;
  t.hidden = false;
  t.classList.remove("show"); void t.offsetWidth; t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.hidden = true; }, 4500);
}

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
// One navigation for every Gradify site's app, drawn here so the 33 app pages share it: the signed-in LifeOS.
// [route, label, short label for the phone tab bar, icon]
const NAV = [
  ["today", "Today", "Today", "home"],
  ["intel", "Intelligence", "Intel", "sparkles"],
  ["plan", "Smart Plan", "Plan", "calendar"],
  ["revise", "Revision Centre", "Revise", "checklist"],
  ["knowledge", "My Knowledge", "Knowledge", "brain"],
  ["progress", "Progress", "Progress", "trend"],
  ["earth", "Earth", "Earth", "globe"],
  ["goals", "Path", "Path", "route"],
  ["ai", "Gradify AI", "AI", "bulb"],
  ["learning", "Learn", "Learn", "book"],
  ["study", "Study", "Study", "layers"],
  ["notes", "Notes Studio", "Notes", "upload"],
  ["community", "Community", "Community", "people"],
  ["account", "Settings", "Settings", "cog"],
];
// the phone tab bar has room for five: the rest are under More
const TABS = ["today", "study", "notes", "plan"];
// screens that belong to a section without being one
const SECTION_OF = { deck: "notes", new: "notes", topic: "progress", start: null, goal: "goals" };
function drawNav() {
  // the LifeOS sidebar (wide screens) and, inside it, every section; the top bar keeps the brand and account
  let side = document.querySelector(".lo-side");
  if (!side) {
    side = document.createElement("nav");
    side.className = "lo-side"; side.id = "lo-side"; side.setAttribute("aria-label", "LifeOS");
    document.querySelector("#view")?.before(side);
    document.querySelector("#view")?.parentElement.classList.add("lo-shell");
  }
  side.innerHTML = `<span class="lo-side-title">LifeOS</span>${NAV.map(([r, label, , ic]) => `<a href="#/${r}" data-route="${r}">${icon(ic)}<span>${label}</span></a>`).join("")}`;
  for (const nav of document.querySelectorAll(".app-nav")) nav.innerHTML = NAV.slice(0, 6).map(([r, label, , ic]) => `<a href="#/${r}" data-route="${r}">${icon(ic)}<span>${label}</span></a>`).join("");
  for (const nav of document.querySelectorAll(".tabbar")) {
    nav.innerHTML = NAV.filter(([r]) => TABS.includes(r)).map(([r, , short, ic]) => `<a href="#/${r}" data-route="${r}">${icon(ic)}<span>${short}</span></a>`).join("")
      + `<button type="button" class="tab-more" aria-expanded="false" aria-controls="lo-side"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg><span>More</span></button>`;
    const more = nav.querySelector(".tab-more");
    more.addEventListener("click", () => { const open = !document.body.classList.contains("side-open"); document.body.classList.toggle("side-open", open); more.setAttribute("aria-expanded", String(open)); });
  }
  side.addEventListener("click", (e) => { if (e.target.closest("a")) { haptic("tap"); document.body.classList.remove("side-open"); } });
  document.querySelector(".tabbar")?.addEventListener("click", (e) => { if (e.target.closest("a, button")) haptic("tap"); });
}
drawNav();
// the pricing page lives on getgradify.com; sub-sites served elsewhere link to it there
const PRICING = /(^|\.)getgradify\.com$|^localhost/.test(location.hostname) ? "/pricing.html" : "https://getgradify.com/pricing.html";

// ---------- Router ----------
const routes = { today: renderToday, start: renderStart, new: renderNew, deck: renderDeck, study: renderStudy, topic: renderTopic, progress: renderProgress, plan: renderPlan, account: renderAccount };
// ---------- Gradify Intelligence: one model for every screen ----------
// In "auto" mode, missed Gradify blocks are moved first (once per visit to a screen), then the model is rebuilt.
async function model({ autoMove = true } = {}) {
  const L = await learnerAcross().catch(() => null);
  const courseNext = (L?.next || []).filter((x) => x.site);
  let m = await loadModel(store, profile, { courseNext });
  if (autoMove && m.intel.autonomy === "auto" && m.missed.moves.length) {
    await applyMoves(m, store);
    const moved = m.missed;
    m = await loadModel(store, profile, { courseNext });
    m.missed = moved;   // so the screen can say what changed and why
  }
  m.L = L;
  return m;
}
async function saveIntel(patch) {
  const cur = intelOf(learnerOf(profile));
  await saveLearner(store, { intel: { ...cur, ...patch } });
  profile = await store.getProfile();
}
const rerender = () => route();
// thin borders in the colours of the spectrum, one per box, and a gentle flow in as each screen opens
const RAINBOW = ["#4641ff", "#8b3dff", "#f055dd", "#ff5a4d", "#ff8a00", "#ffc002", "#1fae8c", "#3c78d8"];
function decorate(root) {
  const boxes = root.querySelectorAll(".panel, .cp-card, .cp-mini, .i-next, .i-dayplan, .i-resched, .k-card, .r-list > li > a, .ai-tool, .start-card:not(.primary)");
  boxes.forEach((el, i) => { el.style.setProperty("--rb", RAINBOW[i % RAINBOW.length]); el.style.setProperty("--i", Math.min(i, 14)); el.classList.add("rb", "flow"); });
}

async function route() {
  const [name, arg] = (location.hash.replace(/^#\/?/, "") || "today").split("/");
  if (needsSetup(profile) && !["start", "account"].includes(name)) { location.replace("#/start"); return; }
  const section = name in SECTION_OF ? SECTION_OF[name] : name;
  document.querySelectorAll(".app-nav a, .tabbar a, .lo-side a").forEach((a) => a.setAttribute("aria-current", String(a.dataset.route === section)));
  document.body.classList.remove("side-open");
  view.innerHTML = '<div class="loading" aria-busy="true"></div>';
  try { await (routes[name] || renderToday)(arg); } catch (e) { console.error(e); view.innerHTML = `<div class="panel glass"><h3>Something went wrong</h3><p class="sub">${esc(e.message)}</p></div>`; }
  decorate(view);
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
  <label class="check"><input type="checkbox" name="text" ${pr.text === "large" ? "checked" : ""}> <span>Larger text</span></label></fieldset>`;
const prefsFrom = (f) => ({ motion: f.get("motion") ? "reduce" : "auto", text: f.get("text") ? "large" : "normal" });
// the subjects most learners pick, shown first in set-up; the rest are one tap (or a search) away
const POPULAR = ["UnderGradify", "MedGradify", "LawGradify", "NurseGradify", "PsychGradify", "BusinessGradify"];
const pickBtn = (s) => `<button type="button" class="site-pick ${profile.site === s.n ? "on" : ""}" data-site="${esc(s.n)}" data-s="${esc((s.n + " " + s.d).toLowerCase())}" style="--c:#${s.c};--tile:${tile(s.c)};--ink:${ink(s.c)}"><span class="icon">${icon(s.i)}</span><span><b>${esc(s.n.replace(" · ForgeLab", ""))}</b><em>${esc(s.d.split(/[:.]/)[0])}</em></span></button>`;

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
      <h1>What are you studying?</h1><p class="sub">Pick the Gradify site that fits. Your notes, cards and progress will be tagged with it.</p>
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
      <label><span>How much do you already know? <em class="hint">${esc(siteOf(site).n)}: ${esc((siteOf(site).d || "").split(/[:.]/)[0].toLowerCase())}</em></span><select name="prior">${PRIOR.map(([v, l]) => `<option value="${v}" ${(learnerOf(p).prior[site] || "new") === v ? "selected" : ""}>${l}</option>`).join("")}</select></label>
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
    location.hash = "#/new";
  });
}

// ---------- Add notes ----------
async function renderNew(arg) {
  const s = siteOf(profile.site);
  const ai = store.mode === "cloud" && (await store.user());
  view.innerHTML = `<section class="new">
    <span class="kicker">${esc(s.n)}</span>
    <h1>Bring your notes</h1>
    <p class="sub">Upload a PDF of your notes, however messy, or paste them. Gradify turns them into checked flashcards in about a minute.</p>
    <div class="engine-note ${ai ? "ai" : ""}">${ai ? `${icon("sparkles")}<span><b>Gradify AI</b> (Claude) will read your notes. Every flashcard is checked against them.</span>` : `${icon("lock")}<span><b>Working on this device.</b> The quick extractor runs in your browser and handles tidy definitions best. ${cloudConfigured() ? '<a href="#/account">Sign in</a> to use Gradify AI, which handles messy notes, diagrams and scans.' : "Gradify AI switches on when accounts launch."}</span>`}</div>
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
      status.textContent = text.trim() ? `Read ${text.trim().split(/\s+/).length.toLocaleString("en-GB")} words from ${file.name}.` : "This PDF has no selectable text. Gradify AI can read it once you're signed in.";
    } catch { status.textContent = "Couldn't read that file. Try a PDF with selectable text, or a .txt file."; }
  }
  $("#file").addEventListener("change", (e) => take(e.target.files[0]));
  const drop = $("#drop");
  drop.addEventListener("dragover", (e) => { e.preventDefault(); drop.classList.add("over"); });
  drop.addEventListener("dragleave", () => drop.classList.remove("over"));
  drop.addEventListener("drop", (e) => { e.preventDefault(); drop.classList.remove("over"); take(e.dataTransfer.files[0]); });
  $("#sample").addEventListener("click", () => { $("#text").value = SAMPLE; $("#title").value = "Cardiac cycle"; status.textContent = "Sample notes added. Press “Make my study pack”."; });
  if (arg === "sample") $("#sample").click();
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
      const out = await generate({ text, pdfBase64, title, site: profile.site, level: profile.level, store });
      if (!out.cards.length) throw new Error("No flashcards could be made from these notes. Try notes with full sentences, or sign in to use Gradify AI.");
      const doc = await store.addDocument({ title: out.pack.title || title, site: profile.site, file_name: fileName, pages, text });
      if (out.engine === "claude" && store.linkPack) await store.linkPack(out.packId, doc.id);
      else await store.addPack({ document_id: doc.id, engine: out.engine, model: out.model, pack: out.pack, stats: out.stats });
      await store.addCards(out.cards.map((c) => ({ document_id: doc.id, topic: c.topic, front: c.front, back: c.back, kind: c.kind, source_quote: c.sourceQuote, source_page: c.sourcePage, grounded: c.grounded })));
      await store.logActivity({ site: profile.site, kind: "pack", xp: 15, detail: { title: doc.title, cards: out.cards.length } });
      // dates in the notes become plan items
      for (const d of out.pack.dates || []) if (d.date && d.date >= today()) await store.saveBlock({ day: d.date, start_min: 9 * 60, end_min: 9 * 60 + 30, title: d.what, cal: d.kind === "exam" ? "exam" : "deadline" });
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
    <a class="back" href="#/notes">← All notes</a>
    <div class="deck-head">
      <div><span class="kicker">${esc(doc.site || profile.site)} · ${fmtDate(doc.created_at)}</span><h1>${esc(doc.title)}</h1>
        <span class="engine-badge ${pack?.engine === "claude" ? "ai" : ""}">${pack?.engine === "claude" ? `${icon("sparkles")}Made by Gradify AI` : `${icon("lock")}Made on this device`}</span></div>
      <a class="btn btn-primary lg" href="#/study/${id}"><span>${due.length ? `Revise ${due.length} ${due.length === 1 ? "card" : "cards"}` : "Practise anyway"}</span></a>
    </div>
    <div class="deck-stats">
      <div><b>${cards.length}</b><span>cards</span></div>
      <div><b>${cards.length ? Math.round((cards.filter((c) => c.grounded === "yes").length / cards.length) * 100) : 0}%</b><span>checked against notes</span></div>
      <div class="${flagged.length ? "warn" : ""}"><b>${flagged.length}</b><span>to check</span></div>
      <div><b>${cards.filter(isLearned).length}</b><span>learned</span></div>
    </div>
    ${store.mode !== "cloud" && cloudConfigured() ? savePanel(`Save these ${cards.length} cards to your free account`, "Keep this pack on every device, get Gradify AI for messy notes and scans, and let Gradify plan your revision around your exam.") : ""}
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
      location.hash = "#/notes";
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
function cardRow(c) {
  const [cls, label] = GROUNDED[c.grounded] || GROUNDED.bonus;
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
    ${courseCards.length ? `<h2 class="lo-h">From your courses</h2><div class="lo-grid">${courseCards.map((c) => `<article class="panel glass course-card"><div class="cc-top"><span class="cc-site">${esc(c.site)}</span></div><h3>${esc(c.name)}</h3>
      <p class="sub">${c.cards} flashcard${c.cards === 1 ? "" : "s"}${c.dueCards ? ` · ${c.dueCards} due` : " · nothing due"}${c.revisit ? ` · ${c.revisit} question${c.revisit === 1 ? "" : "s"} to revisit` : ""}</p>
      <div class="row-actions">${c.href && (c.dueCards || c.revisit) ? `<a class="btn btn-light lg btn-sm" href="${c.href}#/review"><span>Review now</span></a>` : ""}${c.href ? `<a class="btn btn-ghost lg btn-sm" href="${c.href}"><span>Open course</span></a>` : ""}</div></article>`).join("")}</div>
      <h2 class="lo-h">From your notes</h2>` : ""}
    ${docs.length ? `<div class="doc-grid">${docs.map((d) => {
      const cs = cards.filter((c) => c.document_id === d.id);
      const due = cs.filter((c) => isDue(c)).length;
      const s = siteOf(d.site);
      const m = masteryOf(d.id);
      return `<a class="doc panel glass" href="#/deck/${d.id}" style="--c:#${s.c};--tile:${tile(s.c)};--ink:${ink(s.c)}"><span class="icon">${icon(s.i)}</span><b>${esc(d.title)}</b>
        <span class="sub">${cs.length} cards · ${due ? `${due} due` : "nothing due"} · ${fmtDate(d.created_at)}</span><span class="goal-bar" title="${Math.round(m * 100)}% mastery"><i style="width:${Math.round(m * 100)}%"></i></span></a>`;
    }).join("")}</div>` : `<div class="empty-state panel glass">${icon("upload")}<h3>No notes yet</h3><p class="sub">Add your first set of notes and Gradify will make flashcards from them.</p><a class="btn btn-primary lg" href="#/new"><span>Add notes</span></a></div>`}
  </section>`;
}
routes.notes = renderNotes;

// ---------- Revision session ----------
// Answering a card: first say how sure you are (that's evidence too: confident wrong answers point
// to misconceptions), then see the answer and rate it.
const SURE_BUTTONS = [["sure", "I know it", "J"], ["unsure", "Not sure", "K"], ["guess", "No idea", "L"]];
async function renderStudy(arg) {
  // #/study/<deck id>, or #/study/t:<topic key> for a targeted practice session on one topic
  const topicKey = arg?.startsWith("t:") ? decodeURIComponent(arg.slice(2)) : null;
  const deckId = topicKey ? topicKey.split("|")[0] : arg;
  const all = await store.listCards(deckId ? { documentId: deckId } : {});
  let queue, practice = false, topicName = null;
  if (topicKey) {
    const [p] = topicProfiles(all, await store.listReviews(400)).filter((x) => x.key === topicKey);
    topicName = p?.topic || "Topic";
    queue = p ? practiceOrder(all.filter((c) => `${c.document_id}|${c.topic || "Cards"}` === topicKey), p).slice(0, 12) : [];
  } else {
    queue = all.filter((c) => isDue(c) && !c.suspended);
    practice = !queue.length && deckId;
    if (practice) queue = [...all].sort(() => Math.random() - 0.5);
  }
  const cap = Math.max(10, Math.round(((profile.daily_minutes || 20) * 60) / SEC_PER_CARD));
  // reviews first, then new cards (a topic session keeps the engine's order)
  if (!topicKey) queue.sort((a, b) => (a.reps ? 0 : 1) - (b.reps ? 0 : 1) || new Date(a.due_at) - new Date(b.due_at));
  queue = queue.slice(0, cap);
  if (!queue.length) {
    view.innerHTML = `<div class="empty-state panel glass">${icon("check")}<h3>${topicKey ? "No cards in this topic" : "All caught up"}</h3><p class="sub">Nothing is due right now. Add more notes, or come back later.</p><div class="row-actions"><a class="btn btn-primary lg" href="#/new"><span>Add notes</span></a><a class="btn btn-ghost lg" href="#/today"><span>Back to Today</span></a></div></div>`;
    return;
  }
  const total = queue.length;
  const results = { again: 0, hard: 0, good: 0, easy: 0 };
  let i = 0, shown = false, sure = null, t0 = Date.now(), xp = 0;
  const again = [];
  let attempt = "";
  const draw = () => {
    const c = queue[i];
    const p = preview(c);
    const deep = c.kind === "why" || c.kind === "apply";
    view.innerHTML = `<section class="study-session">
      <div class="sess-top"><a href="${topicKey ? `#/topic/${encodeURIComponent(topicKey)}` : deckId ? `#/deck/${deckId}` : "#/today"}" class="back">✕ End</a><span class="goal-bar"><i style="width:${(i / total) * 100}%"></i></span><span class="sub">${Math.min(i + 1, total)} / ${total}${practice ? " · practice" : ""}${topicName ? ` · ${esc(topicName)}` : ""}</span></div>
      <article class="flash-card ${shown ? "shown" : ""}" aria-live="polite">
        <span class="kicker">${deep ? `<b class="kind-tag ${c.kind}">${c.kind === "why" ? "Explain" : "Apply"}</b>` : ""}${esc(c.topic || "")}${c.reps ? "" : " · new"}</span>
        <p class="fc-front">${esc(c.front)}</p>
        ${deep && !shown ? `<label class="fc-write"><span>${c.kind === "why" ? "Explain it in your own words" : "Work it out"} <em>optional, just for you</em></span><textarea id="attempt" rows="3" placeholder="${c.kind === "why" ? "Because…" : "It would…, because…"}">${esc(attempt)}</textarea></label>` : ""}
        ${shown ? `${deep && attempt.trim() ? `<div class="fc-compare"><span>Your answer</span><p>${esc(attempt)}</p></div><span class="fc-model">Model answer</span>` : ""}<p class="fc-back">${esc(c.back)}</p>${c.source_quote ? `<p class="c-src">From your notes: “${esc(c.source_quote)}”</p>` : ""}${deep ? `<p class="c-src">Rate how close your ${c.kind === "why" ? "explanation" : "reasoning"} was, not just the result.</p>` : ""}` : ""}
      </article>
      ${shown ? `<div class="rate4" role="group" aria-label="How well did you know it?">${RATINGS.map((r, k) => `<button type="button" class="r-${r}" data-r="${r}"><b>${r[0].toUpperCase() + r.slice(1)}</b><span>${fmtInterval(p[r])}</span><kbd>${k + 1}</kbd></button>`).join("")}</div>`
        : `<div class="sure" role="group" aria-label="How sure are you? Choosing one shows the answer.">
            <span class="sure-q">How sure are you?</span>
            ${SURE_BUTTONS.map(([k, label, key]) => `<button type="button" data-sure="${k}" class="sure-${k}"><b>${label}</b><kbd>${key}</kbd></button>`).join("")}
            <button type="button" class="sure-skip" id="reveal">Just show me <kbd>Space</kbd></button>
          </div>`}
    </section>`;
  };
  const rate = async (r) => {
    haptic(r === "again" ? "warn" : r === "easy" ? "success" : "select");
    const c = queue[i];
    // in a topic session, cards that aren't due yet only move if you've forgotten them
    const reschedule = !practice && (!topicKey || !c.reps || isDue(c) || r === "again");
    const next = reschedule ? schedule(c, r) : {};
    results[r]++;
    xp += r === "again" ? 1 : 2;
    if (!practice) {
      if (reschedule) await store.updateCard(c.id, next);
      await store.addReview({ card_id: c.id, rating: r, interval_days: next.interval_days ?? null, ms: Date.now() - t0, confidence: sure, mode: reschedule ? "scheduled" : "practice" });
      if (r === "again" && !again.includes(c.id)) { again.push(c.id); queue.push({ ...c, ...next }); }
    }
    i++; shown = false; sure = null; attempt = ""; t0 = Date.now();
    if (i >= queue.length) return finish();
    draw();
  };
  const finish = async () => {
    removeEventListener("keydown", keys);
    const answered = Object.values(results).reduce((a, b) => a + b, 0);
    xp += 10;
    await store.logActivity({ site: profile.site, kind: "session", xp: Math.min(xp, 500), detail: { cards: answered, ...results, practice: Boolean(practice), topic: topicName } });
    // tick off today's review block in the plan
    const blocks = await store.listBlocks(today(), today());
    for (const b of blocks) if (b.auto && !b.done && /review/i.test(b.title)) await store.saveBlock({ ...b, done: true });
    profile = await store.getProfile();
    const s = await stats();
    const right = answered - results.again;
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
    if (e.target.closest("input, textarea")) { if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && !shown) { attempt = e.target.value; shown = true; draw(); } return; }
    if (!shown && (e.key === " " || e.key === "Enter")) { e.preventDefault(); shown = true; draw(); }
    else if (!shown && SURE_BUTTONS.some(([, , k]) => k.toLowerCase() === e.key.toLowerCase())) { sure = SURE_BUTTONS.find(([, , k]) => k.toLowerCase() === e.key.toLowerCase())[0]; shown = true; draw(); }
    else if (shown && ["1", "2", "3", "4"].includes(e.key)) rate(RATINGS[+e.key - 1]);
  };
  // listeners last only as long as this session; otherwise a second session in the same visit
  // would also answer for the first
  const session = new AbortController();
  addEventListener("keydown", keys, { signal: session.signal });
  addEventListener("hashchange", () => session.abort(), { once: true });
  view.addEventListener("click", (e) => {
    attempt = view.querySelector("#attempt")?.value ?? attempt;
    if (e.target.closest("#reveal")) { shown = true; draw(); return; }
    const sb = e.target.closest("[data-sure]");
    if (sb) { haptic("tap"); sure = sb.dataset.sure; shown = true; draw(); return; }
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
  view.innerHTML = `<section class="today">
    <span class="kicker lo-kicker">${icon("home")}Command Centre · ${fmtDate(Date.now(), { weekday: "long", day: "numeric", month: "long" })}</span>
    <h1>${hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening"}${profile.display_name ? `, ${esc(profile.display_name)}` : ""} <span class="wave" aria-hidden="true">👋</span></h1>
    <p class="sub lo-hello">${s.cards.length ? `${n0(s.cards.length)} flashcards across ${n0(s.docs.length)} study ${s.docs.length === 1 ? "pack" : "packs"}${streakDays ? ` · ${streakDays}-day streak` : ""}.` : "Nice to have you here."}</p>
    ${!s.cards.length && !courses.length ? welcomeHtml(profile.display_name) : ""}
    ${rescheduleHtml(M)}
    ${nextHtml(M)}
    ${intelStripHtml(M)}
    ${cockpitHtml(cockpitCtx)}
    <div class="intel-row">${upcomingHtml(M)}${forecastWidget(M)}${conceptPileWidget(M)}${askWidget()}</div>
    ${acrossNext.length || courses.length ? `<div class="lo-across">
      ${acrossNext.length > (s.cards.length ? 0 : 1) ? `<article class="panel glass"><div class="panel-head"><h3>${s.cards.length ? "Across" : "Then, across"} ${SITE ? esc(SITE) : "Gradify"}</h3><a class="see" href="#/learning">My Learning</a></div>${nextList(acrossNext.slice(s.cards.length ? 0 : 1, s.cards.length ? 3 : 4))}</article>` : ""}
      ${courses.length ? `<article class="panel glass"><div class="panel-head"><h3>Your courses</h3><span class="pill-dark">${courses.length}</span></div><ul class="lo-courses">${courses.slice(0, 4).map((c) => { const pct = c.written ? Math.round((100 * c.done) / c.written) : 0; return `<li><a href="${c.href && c.next ? `${c.href}#/lesson/${encodeURIComponent(c.next.id)}` : c.href || "#/learning"}"><span><b>${esc(c.name)}</b><em>${c.next ? `Next: ${esc(c.next.title)}` : "Finished"}</em></span><span class="goal-bar" role="img" aria-label="${pct}%"><i style="width:${pct}%"></i></span><em>${pct}%</em></a></li>`; }).join("")}</ul></article>` : ""}
    </div>` : ""}
    ${goalsPanel(GO)}
    <div class="today-grid">
      <article class="panel glass lo-day" aria-live="polite"></article>
      ${dueHtml(s, courses)}

      ${briefing.length || s.topics.length ? `<article class="panel glass briefing">
        <div class="panel-head"><h3>Your briefing</h3><span class="pill-dark">${fmtDate(Date.now(), { weekday: "long", day: "numeric", month: "short" })}</span></div>
        ${briefing.length ? `<ul class="brief-list">${briefing.map((b) => `<li class="${b.c}">${icon(b.ico)}<span><b>${b.t}</b><em>${b.d}</em></span>${b.href ? `<a class="btn btn-ghost lg btn-sm" href="${b.href}"><span>${b.cta}</span></a>` : ""}</li>`).join("")}</ul>` : ""}
      </article>` : ""}
      <article class="panel glass stat-tiles">
        <div><b>${streakDays}</b><span>day streak${G?.restBank ? ` · ${G.restBank} rest day${G.restBank > 1 ? "s" : ""}` : ""}</span></div>
        ${s.cards.length ? `<div><b>${s.learned.length}<small>/${s.cards.length}</small></b><span>cards learned</span></div>
        <div><b>${s.accuracy == null ? "–" : Math.round(s.accuracy * 100) + "%"}</b><span>right, last 30 days</span></div>` : `<div><b>${G?.rank?.name ? esc(G.rank.name) : "–"}</b><span>rank</span></div>`}
        <div class="lvl"><b>Level ${lv}</b><span class="goal-bar"><i style="width:${(into / need) * 100}%"></i></span><span>${into}/${need} XP to level ${lv + 1}</span></div>
      </article>
      ${examIn != null && !s.topics.length && examCourse ? `<article class="panel glass exam">
        <span class="kicker">${icon("calendar")}${examIn >= 0 ? `Exam in ${examIn} ${examIn === 1 ? "day" : "days"}` : "Exam date has passed"}</span>
        <h3>${esc(examCourse.name)}: ${esc((PACE[examCourse.pace?.status] || ["", "pace unknown"])[1].toLowerCase())}</h3>
        <p class="sub">${examCourse.done} of ${examCourse.written} lessons done${examCourse.pace?.needPerDay ? `; about ${Math.round(examCourse.pace.needPerDay * 10) / 10} lessons a day finish the course before your exam` : ""}. ${examCourse.pace?.status === "behind" ? "Add study time in Calendar, or focus on the schools that count most." : ""}</p>
        <a class="see" href="#/plan">Open Calendar</a>
      </article>` : ""}
      <article class="panel glass hm-panel">
        <div class="panel-head"><h3>Last 16 weeks</h3><a class="see" href="#/progress">Progress</a></div>
        ${heatmap(s.byDay)}
      </article>
      ${proCard(sub)}
    </div>
  </section>`;
  wireCockpit(view, cockpitCtx);
  wireIntel(view, M, { store, toast, rerender });
  // the daily goal and today's quests, from the same engine as My Progress
  if (G) {
    const pct = Math.min(1, G.todayXp / (G.goal || 1)), R = 30, C = 2 * Math.PI * R;
    view.querySelector(".lo-day").innerHTML = `<div class="panel-head"><h3>Today's goal</h3><a class="see" href="#/progress">${G.readyToClaim ? `${G.readyToClaim} to claim` : "All quests"}</a></div>
      <div class="lo-goal"><svg viewBox="0 0 72 72" aria-hidden="true"><circle cx="36" cy="36" r="${R}" class="bg"/><circle cx="36" cy="36" r="${R}" class="fg" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - pct)}"/></svg>
        <div><b>${G.todayXp}<small> / ${G.goal} XP</small></b><span class="sub">${G.goalMet ? "Daily goal met. Anything more is a bonus." : G.todayXp ? `${G.goal - G.todayXp} XP to go today.` : "Any lesson, review or quest counts."}</span></div></div>
      ${G.quests.length ? `<ul class="lo-quests">${G.quests.map((q) => `<li class="${q.paid ? "paid" : q.done ? "ready" : ""}"><span><b>${esc(q.title)}</b><em>${q.paid ? "Claimed" : q.done ? "Ready to claim in My Progress" : esc(q.why || "")}</em></span><span class="goal-bar" role="img" aria-label="${q.n} of ${q.of}"><i style="width:${(100 * Math.min(q.n, q.of)) / q.of}%"></i></span><em>${Math.min(q.n, q.of)}/${q.of} · +${q.xp}</em></li>`).join("")}</ul>` : `<p class="sub">Start a course and daily quests appear here.</p>`}
      ${G.nextAchievement ? `<p class="sub lo-ach">${icon("award")} Next achievement: <b>${esc(G.nextAchievement.name)}</b> (${G.nextAchievement.n} / ${G.nextAchievement.of})</p>` : ""}`;
  } else view.querySelector(".lo-day")?.remove();
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
  const all = Object.entries(COURSES).filter(([slug]) => !started.has(slug));
  return all.slice(0, n).map(([slug, href]) => `<a class="lo-chip" href="${href}">${esc(slug[0].toUpperCase() + slug.slice(1))}</a>`).join("");
}
function proCard(sub) {
  const plan = sub ? describePlan(sub) : null;
  if (plan?.plan === "pro") return `<article class="panel glass lo-pro on"><span class="lo-pro-badge"><span class="pro-gem" aria-hidden="true"></span>Gradify Pro</span><p class="sub">${esc(plan.line)}</p><a class="see" href="#/account">Manage</a></article>`;
  return `<article class="panel glass lo-pro"><span class="lo-pro-badge"><span class="pro-gem" aria-hidden="true"></span>Gradify Pro</span>
    <h3>${PRO_ON_SALE ? "Go further with Gradify AI" : "Coming soon"}</h3>
    <p class="sub">${PRO_ON_SALE ? "Generous monthly Gradify AI allowances on every site." : "The premium Gradify experience, starting with Gradify AI. Everything you use today stays free."}</p>
    <a class="btn btn-ghost lg btn-sm" href="${PRICING}"><span>${PRO_ON_SALE ? "See plans" : "See what's coming"}</span></a></article>`;
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
  try { await store.saveGoal({ ...g, ...patch }, { expect: g.updated_at }); if (done) toast(done); }
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
async function renderGoalForm(arg) {
  const [mode, id] = String(arg || "new").split("/").length > 1 ? String(arg).split("/") : [arg || "new"];
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
        <label data-needs="course"><span>Course</span><select name="course">${Object.keys(COURSES).map((c) => `<option value="${c}" ${m.course === c ? "selected" : ""}>${esc(courseName(c))}</option>`).join("")}</select></label>
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
        <div class="row-actions">${s.due.length ? `<a class="btn btn-light lg btn-sm" href="#/study"><span>Review ${s.due.length} due</span></a>` : ""}<a class="btn btn-ghost lg btn-sm" href="#/notes"><span>Open your library</span></a><a class="btn btn-ghost lg btn-sm" href="#/new"><span>Add notes</span></a></div></article>`
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
    <article class="panel glass"><div class="panel-head"><h3>Your year</h3><span class="pill-dark">${Object.keys(s.byDay).length} active days</span></div><div class="hm-scroll">${heatmap(s.byDay, 52)}</div></article>
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
  // the Journey (kit/game/journey.js) lives here too, with its own styles, loaded once
  if (!document.querySelector("link[data-game-css]")) document.head.insertAdjacentHTML("beforeend", `<link rel="stylesheet" data-game-css href="${new URL("../styles/game.css", import.meta.url)}">`);
  mountJourney(document.getElementById("lo-journey"), { embedded: true, store }).catch((e) => { console.warn("Journey", e); });
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
    <div class="deck-head"><div><span class="kicker lo-kicker">${icon("calendar")}Smart Plan</span><h1>Your plan, worked out for you</h1><p class="sub">Gradify builds each day from what matters most (misconceptions, fading memory, deadlines, due cards and new material) and fits it into your free time, with breaks. <a href="#/intel">Change your hours and energy</a>.</p></div><button type="button" class="btn btn-primary lg" id="autoplan"><span>Plan my week</span></button></div>
    ${rescheduleHtml(M)}
    ${smartPlanHtml(M, arg)}
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
      if (!b.done) await store.logActivity({ site: profile.site, kind: "block", xp: Math.min(60, Math.round((b.end_min - b.start_min) / 3)), detail: { title: b.title } });
    }
    renderPlan();
  });
  wireSmartPlan(view, M, { store, toast, rerender }, arg);
  $("#autoplan").addEventListener("click", async (e) => {
    e.currentTarget.disabled = true;
    const made = await planWeek(M, store, s.cards);
    haptic(made ? "success" : "tap");
    toast(made ? `Planned ${made} study ${made === 1 ? "session" : "sessions"} across the next six days, in your free time.` : "Your week already has Gradify sessions, or no free time is set.");
    renderPlan(arg);
  });
}

// ---------- Account ----------
async function renderAccount() {
  const user = store.mode === "cloud" ? await store.user() : null;
  const s = siteOf(profile.site);
  view.innerHTML = `<section class="account">
    <h1>Account</h1>
    <article class="panel glass">
      ${user ? `<div class="panel-head"><div><h3>Signed in</h3><p class="sub">${esc(user.email)} · your notes and progress are saved to your Gradify account.</p></div><button type="button" class="btn btn-ghost lg btn-sm" id="signout"><span>Sign out</span></button></div>`
        : cloudConfigured() ? `<h3>Save your progress to a Gradify account</h3><p class="sub">Sign in to keep your notes on every device and to use Gradify AI. Anything on this device moves across.</p>
          <form id="signin" class="signin"><label class="sr-only" for="email">Email</label><input id="email" type="email" required placeholder="you@example.com" autocomplete="email"><button class="btn btn-primary lg btn-sm" type="submit"><span>Email me a sign-in link</span></button></form>
          <button type="button" class="btn btn-ghost lg btn-sm" id="google"><span>Continue with Google</span></button>`
        : `<h3>Saved on this device</h3><p class="sub">Gradify accounts aren't switched on yet, so your notes and progress are saved in this browser${store.persistent ? "" : " for this visit only (this browser is blocking storage)"}. Export a copy below to keep it safe.</p>`}
    </article>
    ${user ? `<article class="panel glass plan-panel" id="plan-panel" aria-live="polite"><h3>Your plan</h3><p class="sub">Checking your plan…</p></article>` : ""}
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
    ${hapticsSupported() ? `<article class="panel glass"><div class="panel-head"><div><h3>Haptics</h3><p class="sub">A light buzz when you rate a card, shuffle a pile or plan your day.</p></div><label class="switch"><input type="checkbox" id="haptics" role="switch" ${hapticsOn() ? "checked" : ""}><span class="sw-track lg" aria-hidden="true"><span class="sw-knob"></span></span></label></div></article>` : ""}
    <article class="panel glass"><h3>Your data</h3><p class="sub">${SITE ? `It's yours. Download or delete everything you've added on ${esc(SITE)}. Your notes on other Gradify sites stay as they are.` : "It's yours. Download everything, or delete it."}</p>
      <div class="row-actions"><button type="button" class="btn btn-light lg btn-sm" id="export"><span>Download my data</span></button><button type="button" class="btn btn-ghost lg btn-sm danger" id="wipe"><span>Delete all my data</span></button></div></article>
  </section>`;
  if (user) renderBillingPlan();
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
  $("#haptics")?.addEventListener("change", (e) => { setHaptics(e.target.checked); haptic("success"); });
  $("#export").addEventListener("click", async () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(await store.exportAll(), null, 2)], { type: "application/json" }));
    a.download = `gradify-data-${today()}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });
  $("#wipe").addEventListener("click", async () => {
    if (!confirm("Delete all your notes, cards and progress? This can't be undone.")) return;
    await store.wipe();
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

// The learner's Gradify plan on the Account page: Free or Pro, what needs doing, Manage billing, and Gradify AI used
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
      <div class="row-actions">${p.manage ? `<button type="button" class="btn btn-light lg btn-sm" id="manage-billing"><span>Manage billing</span></button>` : ""}<a class="btn btn-ghost lg btn-sm" href="${pricing}"><span>${p.plan === "pro" ? "See plans" : "See Gradify Pro"}</span></a></div></div>
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
    ["checklist", "Fix a card", "Regenerate any card that doesn't match your notes, straight from the pack.", docs[0] ? `#/deck/${docs[0].id}` : "#/notes", "Open a pack"],
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
  wireAsk(view, M);
}
routes.ai = renderAi;

// ---------- Intelligence, My Knowledge, Revision Centre (kit/app/intel-views.js) ----------
routes.intel = async () => { const m = await model(); renderIntelPage(view, m, { toast, saveIntel }); };
routes.knowledge = async () => { const m = await model({ autoMove: false }); renderKnowledgePage(view, m, { courses: m.L?.courses || [] }); };
routes.revise = async (arg) => { const m = await model({ autoMove: false }); renderRevisePage(view, m, arg); };

// ---------- Community: not built yet; say so, and offer the one real thing (bringing friends) ----------
async function renderCommunity() {
  view.innerHTML = `<section class="community-route">
    <span class="kicker lo-kicker">${icon("people")}Community</span>
    <h1>Study with other people</h1>
    <article class="panel glass"><span class="pill-dark">Coming soon</span>
      <h3>Study groups, shared packs and leaderboards</h3>
      <p class="sub">Revise with your course mates, share a pack in one tap and see who's on a streak. It isn't built yet, so nothing here is pretend: it'll appear when it's real.</p></article>
    ${sharePanel()}
  </section>`;
  wireSharePanel();
}
routes.community = renderCommunity;

// ---------- Start ----------
async function boot() {
  const local = new LocalStore();
  const cloud = await CloudStore.create();
  const user = cloud ? await cloud.user() : null;
  store = user ? cloud : (cloud && cloudConfigured() ? Object.assign(local, { signInWithEmail: (e) => cloud.signInWithEmail(e), signInWithGoogle: () => cloud.signInWithGoogle() }) : local);
  if (user && local.hasData() && !localStorage.getItem(`gradify.moved.${user.id}`)) {
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
  profile = await store.getProfile();
  syncMirror(profile);   // the account's settings, for every site in this browser
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
}
boot();
