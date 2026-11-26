// Study workspace tabs: the few things a learner is working between, a lesson, their notes, their plan, a question
// set, their flashcards, kept as tabs, each remembering exactly where they were (the place and the scroll), so
// switching between them loses nothing.
//
// Not browser tabs: one tab per kind of work in each place ("the lesson I'm on in Biology", "my notes", "my plan").
// Moving to the next lesson in Biology moves that tab along with you rather than opening another. Opening one of
// these kinds of place opens its tab; × closes it; at most six, the longest unused going first. The strip shows
// once there are two. Shared by the study app (kit/app/app-nav.js) and every course page (kit/course/course.js),
// on this device ("gradify.workspace"). The list helpers are pure (tests/workspace.test.mjs).
//
//   const ws = mountWorkspace(host, { label: "Biology" });   ws.arrived({ href, title, kind, scope, scopeLabel })
import { esc, readJson, writeJson, local, session, ensureStyles } from "./store.js";
import { uiIcon } from "./icons.js";
import { shortcuts } from "./keys.js";

// the kinds of place that get a tab, what they're called and their icon
export const KINDS = { lesson: ["Lesson", "book"], notes: ["Notes", "notes"], plan: ["Plan", "clock"], questions: ["Questions", "target"], flashcards: ["Flashcards", "cards"] };
const KEY = "gradify.workspace", RESTORE = "gradify.workspace.restore", MAX = 6;

// ---------- pure ----------
/** a tab's identity: its kind of work within its place (a course, or the study app) */
export const slotOf = (p) => (p?.kind && KINDS[p.kind] ? `${p.kind}:${p.scope || ""}` : null);

/** arrive at a place: it becomes (or moves) its slot's tab, and that tab is the active one */
export function openTab(ws = { tabs: [], active: null }, place, { max = MAX, now = Date.now() } = {}) {
  const slot = slotOf(place);
  if (!slot) return { ...ws, active: null };
  const tabs = [...(ws.tabs || [])], i = tabs.findIndex((t) => t.id === slot);
  const keepY = i >= 0 && tabs[i].href === place.href ? tabs[i].y || 0 : 0;
  const tab = { id: slot, href: place.href, title: place.title || KINDS[place.kind][0], kind: place.kind, scope: place.scope || "", scopeLabel: place.scopeLabel || "", y: keepY, t: now };
  if (i >= 0) tabs[i] = tab; else tabs.push(tab);
  // too many: the longest unused tab that isn't this one goes
  while (tabs.length > max) { const old = tabs.filter((t) => t.id !== slot).sort((a, b) => a.t - b.t)[0]; tabs.splice(tabs.indexOf(old), 1); }
  return { tabs, active: slot };
}
/** close a tab; if it was the active one, the tab next to it becomes active (returned as `go`) */
export function closeTab(ws = { tabs: [], active: null }, id) {
  const i = ws.tabs.findIndex((t) => t.id === id);
  if (i < 0) return { ws, go: null };
  const tabs = ws.tabs.filter((t) => t.id !== id);
  if (ws.active !== id) return { ws: { tabs, active: ws.active }, go: null };
  const go = tabs[Math.min(i, tabs.length - 1)] || null;
  return { ws: { tabs, active: go?.id || null }, go };
}
/** remember the scroll position on the active tab */
export function noteScroll(ws, y) {
  if (!ws?.active) return ws;
  return { ...ws, tabs: ws.tabs.map((t) => (t.id === ws.active ? { ...t, y: Math.max(0, Math.round(y)) } : t)) };
}
/** the tab `step` along from the active one, wrapping round */
export function stepTab(ws, step) {
  if (!ws?.tabs?.length) return null;
  const i = ws.tabs.findIndex((t) => t.id === ws.active);
  return ws.tabs[((i < 0 ? 0 : i + step) % ws.tabs.length + ws.tabs.length) % ws.tabs.length];
}

// ---------- this device ----------
export const workspace = () => readJson(KEY, { tabs: [], active: null }, local());
const saveWs = (ws) => writeJson(KEY, ws, local());

/** go to a tab: where it was, put back at its scroll position once the page has drawn (see arrived) */
export function switchTo(tab) {
  if (!tab) return;
  saveWs(noteScroll(workspace(), scrollY));
  writeJson(RESTORE, { href: tab.href, y: tab.y || 0 }, session());
  const here = `${location.pathname}${location.hash}`;
  const [path, hash = ""] = tab.href.split("#");
  if (tab.href === here) { scrollTo({ top: tab.y || 0, behavior: "instant" }); writeJson(RESTORE, null, session()); return; }
  if (path === location.pathname) location.hash = hash; else location.href = tab.href;
}

let wiredKeys = false;
export function mountWorkspace(host, { where = "beforebegin" } = {}) {
  if (!host) return { arrived() {} };
  ensureStyles();
  const strip = document.createElement("nav");
  strip.className = "gx-ws"; strip.setAttribute("aria-label", "Your workspace"); strip.hidden = true;
  host.insertAdjacentElement(where, strip);
  const here = () => `${location.pathname}${location.hash}`;
  function paint() {
    const ws = workspace();
    strip.hidden = ws.tabs.length < 2;
    if (strip.hidden) { strip.innerHTML = ""; return; }
    strip.innerHTML = `<span class="gx-wsl">Workspace</span><ul>${ws.tabs.map((t) => {
      const [kind, icon] = KINDS[t.kind] || ["", "grid"], on = t.id === ws.active;
      return `<li class="${on ? "on" : ""}"><a href="${esc(t.href)}" data-tab="${esc(t.id)}" ${on ? 'aria-current="page"' : ""} title="${esc(`${kind}${t.scopeLabel ? ` · ${t.scopeLabel}` : ""}: ${t.title}`)}">${uiIcon(icon)}<span>${t.title !== kind || t.scopeLabel ? `<small>${esc(kind)}${t.scopeLabel ? ` · ${esc(t.scopeLabel)}` : ""}</small>` : ""}${esc(t.title)}</span></a><button type="button" data-close="${esc(t.id)}" aria-label="Close ${esc(kind)}: ${esc(t.title)}" title="Close">${uiIcon("close")}</button></li>`;
    }).join("")}</ul>`;
  }
  strip.addEventListener("click", (e) => {
    const c = e.target.closest("[data-close]");
    if (c) {
      const { ws, go } = closeTab(workspace(), c.dataset.close);
      saveWs(ws); paint();
      if (go) switchTo(go); else strip.querySelector("a")?.focus();
      return;
    }
    const a = e.target.closest("[data-tab]");
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    switchTo(workspace().tabs.find((t) => t.id === a.dataset.tab));
  });
  // the scroll position is kept as the learner reads, so a tab switched away from by any route comes back to it
  let timer = 0;
  addEventListener("scroll", () => { clearTimeout(timer); timer = setTimeout(() => { const ws = workspace(); if (ws.active && ws.tabs.find((t) => t.id === ws.active)?.href === here()) saveWs(noteScroll(ws, scrollY)); }, 250); }, { passive: true });
  addEventListener("storage", (e) => { if (e.key === KEY) paint(); });
  if (!wiredKeys) {
    wiredKeys = true;
    shortcuts([
      { keys: "w n", label: "Next workspace tab", group: "Workspace", run: () => switchTo(stepTab(workspace(), 1)) },
      { keys: "w p", label: "Previous workspace tab", group: "Workspace", run: () => switchTo(stepTab(workspace(), -1)) },
    ]);
  }
  paint();
  return {
    /** after a place has drawn: open or move its tab, and if we came here by switching tabs, put the page back */
    arrived(place) {
      const href = place.href || here();
      saveWs(openTab(workspace(), { ...place, href }));
      const r = readJson(RESTORE, null, session());
      if (r?.href === href) {
        writeJson(RESTORE, null, session());
        requestAnimationFrame(() => requestAnimationFrame(() => scrollTo({ top: r.y || 0, behavior: "instant" })));
      }
      paint();
    },
    paint,
  };
}
