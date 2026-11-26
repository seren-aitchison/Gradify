// Floating quick-access utilities: small tools that are there on every study page without leaving the task.
//   Timer     a focus or break timer that keeps running from page to page (and survives a reload), with pause
//   Note      a thought, straight into today's page in Notes (kit/notes/kb), without opening Notes
//   Capture   a link or a question to come back to: links go to a "Captured" collection, the rest into Notes
//   Search    the same ⌘K search every page has
// One round button opens them; while a timer runs, the button shows the time left.
//
//   mountQuickDock({ app: "/app.html" })      startTimer(25, "Focus")      timerState()
import { esc, ensureStyles, isMac } from "./store.js";
import { uiIcon } from "./icons.js";
import { toast } from "./feedback.js";
import { collections, createCollection, addToCollection } from "../data/links.js";
import { resource } from "../core/resource.js";

const KEY = "gradify.timer";
// kept in the browser so it survives moving between pages; where storage is blocked, it still runs on this page
let mem = null, memOnly = false;
const read = () => { if (memOnly) return mem; try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch { return mem; } };
const write = (v) => {
  mem = v || null;
  try { if (v) localStorage.setItem(KEY, JSON.stringify(v)); else localStorage.removeItem(KEY); memOnly = false; } catch { memOnly = true; }
  dispatchEvent(new Event("gradify-timer"));
};

// ---------- the timer (pure parts) ----------
/** how long is left, in seconds, now: a paused timer keeps what it had. Pure. */
export function remaining(t, now = Date.now()) { if (!t) return 0; return t.paused != null ? t.paused : Math.max(0, Math.round((t.end - now) / 1000)); }
export const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
export const timerState = (now = Date.now()) => { const t = read(); return t ? { ...t, left: remaining(t, now) } : null; };
export function startTimer(mins, label = "Focus") { write({ end: Date.now() + mins * 60e3, mins, label, paused: null, started: Date.now() }); openPanel("timer"); }
export function pauseTimer() { const t = read(); if (t && t.paused == null) write({ ...t, paused: remaining(t) }); }
export function resumeTimer() { const t = read(); if (t && t.paused != null) write({ ...t, end: Date.now() + t.paused * 1000, paused: null }); }
export const stopTimer = () => write(null);

// ---------- quick note and capture ----------
/** a thought into today's page in Notes: the same document Notes' "Today" opens */
export async function quickNote(text) {
  const t = String(text || "").trim(); if (!t) return null;
  const [M, S] = await Promise.all([import("../notes/kb/model.js"), import("../notes/kb/store.js")]);
  const kb = S.load(), day = M.dailyDoc(kb, M.dayKey());
  const r = M.create(kb, { parent: day.id, text: t });
  S.save();
  return { id: r.id, day: day.id };
}
const isUrl = (s) => /^https?:\/\/\S+$/i.test(String(s).trim());
/** a link to come back to, in the "Captured" collection (made the first time); anything else goes into Notes */
export async function capture(text) {
  const t = String(text || "").trim(); if (!t) return null;
  if (!isUrl(t)) { await quickNote(`Captured: ${t}`); return { where: "notes" }; }
  const u = new URL(t);
  const cid = collections().find((c) => c.name === "Captured")?.id || createCollection("Captured");
  addToCollection(cid, resource(`page:${u.href}`, { title: `${u.hostname}${u.pathname === "/" ? "" : u.pathname}`.slice(0, 90), sub: "Captured link", href: u.href }));
  return { where: "collection", cid };
}

// ---------- the dock ----------
let dock = null, panel = null, tick = 0, app = "/app.html";
function openPanel(tab) {
  if (!dock) return;
  panel.hidden = false; dock.querySelector(".qd-b").setAttribute("aria-expanded", "true");
  show(tab);
}
function show(tab) {
  panel.querySelectorAll("[data-qtab]").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.qtab === tab)));
  panel.querySelectorAll("[data-qpane]").forEach((p) => { p.hidden = p.dataset.qpane !== tab; });
  panel.dataset.tab = tab;
  if (tab === "timer") paintTimer();
  setTimeout(() => panel.querySelector(`[data-qpane="${tab}"] textarea, [data-qpane="${tab}"] input, [data-qpane="${tab}"] button`)?.focus(), 30);
}
function paintTimer() {
  const t = timerState(), el = panel?.querySelector('[data-qpane="timer"]'), badge = dock?.querySelector(".qd-t");
  if (badge) { badge.hidden = !t; badge.textContent = t ? fmt(t.left) : ""; dock.classList.toggle("timing", Boolean(t)); }
  if (!el) return;
  // each second only the time changes: the buttons are redrawn only when the timer's state does, so a focused
  // Pause or Stop keeps its focus
  const state = t ? `${t.label}|${t.mins}|${t.paused != null}|${t.end}` : "none";
  if (el.dataset.state === state) { const big = el.querySelector(".qd-big"); if (big && t) big.textContent = fmt(t.left); return; }
  el.dataset.state = state;
  el.innerHTML = t
    ? `<p class="qd-big" aria-live="off">${fmt(t.left)}</p><p class="qd-sub">${esc(t.label)} · ${t.mins} min${t.paused != null ? " · paused" : ""}</p>
       <div class="qd-row">${t.paused != null ? `<button type="button" class="cp-pill dark" data-qt="resume">Resume</button>` : `<button type="button" class="cp-pill dark" data-qt="pause">Pause</button>`}<button type="button" class="cp-pill" data-qt="stop">Stop</button></div>`
    : `<p class="qd-sub">A timer that keeps going while you move between pages.</p><div class="qd-row">${[[25, "Focus"], [50, "Long focus"], [5, "Break"]].map(([m, l], i) => `<button type="button" class="cp-pill${i ? "" : " dark"}" data-qstart="${m}" data-label="${l}">${l} · ${m} min</button>`).join("")}</div>`;
}
function every() {
  const t = timerState();
  if (t && t.paused == null && t.left <= 0) {
    stopTimer();
    toast({ html: `<b>${esc(t.label)}</b> done: ${t.mins} minutes.` }, { icon: "check" });
    try { navigator.vibrate?.([120, 80, 120]); } catch { /* fine */ }
  }
  paintTimer();
}

export function mountQuickDock({ app: appPath = "/app.html", where = document.body } = {}) {
  if (dock) return dock;
  ensureStyles();
  app = appPath;
  dock = document.createElement("div"); dock.className = "qd";
  dock.innerHTML = `<button type="button" class="qd-b" aria-haspopup="dialog" aria-expanded="false" aria-controls="qd-panel" title="Quick tools: timer, note, capture, search">${uiIcon("bolt")}<span class="sr-only">Quick tools</span><span class="qd-t" hidden></span></button>
    <div class="qd-p" id="qd-panel" role="dialog" aria-label="Quick tools" hidden>
      <div class="qd-tabs" role="tablist">${[["timer", "Timer"], ["note", "Note"], ["capture", "Capture"], ["search", "Search"]].map(([k, l]) => `<button type="button" role="tab" data-qtab="${k}" aria-selected="false">${l}</button>`).join("")}<button type="button" class="qd-x" data-qclose aria-label="Close">${uiIcon("close")}</button></div>
      <div data-qpane="timer"></div>
      <form data-qpane="note" hidden><label class="sr-only" for="qd-note">A quick note</label><textarea id="qd-note" rows="3" placeholder="A thought, a question for later…" maxlength="2000"></textarea><div class="qd-row"><button class="cp-pill dark" type="submit">Add to today's notes</button><a class="qd-link" href="${esc(app)}#/notes/daily">Open today's notes</a></div></form>
      <form data-qpane="capture" hidden><label class="sr-only" for="qd-cap">A link or a question</label><input id="qd-cap" placeholder="Paste a link, or type a question to come back to" maxlength="1000"><p class="qd-sub">Links go to your Captured collection; anything else into today's notes.</p><div class="qd-row"><button class="cp-pill dark" type="submit">Capture</button></div></form>
      <div data-qpane="search" hidden><p class="qd-sub">Search every screen, course, lesson and your own things.</p><div class="qd-row"><button type="button" class="cp-pill dark" data-qsearch>Search <kbd>${isMac() ? "⌘K" : "Ctrl K"}</kbd></button></div></div>
    </div>`;
  where.append(dock);
  panel = dock.querySelector(".qd-p");
  const close = (refocus) => { panel.hidden = true; dock.querySelector(".qd-b").setAttribute("aria-expanded", "false"); if (refocus) dock.querySelector(".qd-b").focus(); };
  dock.querySelector(".qd-b").addEventListener("click", () => (panel.hidden ? openPanel(timerState() ? "timer" : panel.dataset.tab || "note") : close()));
  dock.addEventListener("click", (e) => {
    const tab = e.target.closest("[data-qtab]"); if (tab) { show(tab.dataset.qtab); return; }
    if (e.target.closest("[data-qclose]")) { close(true); return; }
    const st = e.target.closest("[data-qstart]"); if (st) { startTimer(Number(st.dataset.qstart), st.dataset.label); return; }
    const q = e.target.closest("[data-qt]"); if (q) { ({ pause: pauseTimer, resume: resumeTimer, stop: stopTimer })[q.dataset.qt](); return; }
    if (e.target.closest("[data-qsearch]")) { close(); document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: isMac(), ctrlKey: !isMac(), bubbles: true })); }
  });
  dock.addEventListener("keydown", (e) => { if (e.key === "Escape" && !panel.hidden) { e.stopPropagation(); close(true); } });
  dock.querySelector('[data-qpane="note"]').addEventListener("submit", async (e) => {
    e.preventDefault(); const ta = e.target.querySelector("textarea"), sent = ta.value;
    // only what was sent is cleared: anything typed while it saved stays
    try { if (await quickNote(sent)) { if (ta.value === sent) ta.value = ""; toast({ html: `Added to today's notes. <a href="${esc(app)}#/notes/daily">Open</a>` }); } } catch (err) { toast(`Couldn't save the note: ${err.message || "try again"}`); }
  });
  dock.querySelector('[data-qpane="capture"]').addEventListener("submit", async (e) => {
    e.preventDefault(); const inp = e.target.querySelector("input"), sent = inp.value;
    try { const r = await capture(sent); if (r) { if (inp.value === sent) inp.value = ""; toast(r.where === "collection" ? { html: `Saved to <a href="${esc(app)}#/collections/${esc(r.cid)}">Captured</a>.` } : "Added to today's notes."); } } catch (err) { toast(`Couldn't capture it: ${err.message || "try again"}`); }
  });
  addEventListener("gradify-timer", paintTimer);
  addEventListener("storage", (e) => { if (e.key === KEY) paintTimer(); });
  clearInterval(tick); tick = setInterval(every, 1000);
  paintTimer();
  return dock;
}
