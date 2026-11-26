// The study app's navigation (app.html and every sub-site's app.html), drawn once by kit/app/main.js:
//
//   Sidebar   the five sections and their screens. Collapses to a rail of icons ([ or the button at its top), each
//             section folds away, and Pinned and Recent sit above them. What's folded and whether it's a rail are
//             remembered on this device (kit/ui/prefs.js, scope "app"). The section you're in never folds.
//   Drawer    below the sidebar's width the same sidebar slides in from the left, from the menu button in the top bar.
//   Crumbs    Gradify › section › screen › the thing you opened (a pack, a topic), every level a link, with a pin.
//   Search    ⌘K / Ctrl+K or / anywhere: screens, actions ("Create flashcards", "Resume last lesson", "Start a
//             timed test"), pins, recent places, and every course and lesson in Gradify (kit/ui/global-nav.js).
//   Workspace tabs over the page: the notes, plan, flashcards and question set you're working between, each kept
//             where you were (kit/ui/workspace.js), shared with the lessons on every course page.
//   History   every screen opened goes into the learner's history (kit/ui/history.js, the History screen).
//   Essentials first: each section shows the screens most people need, always. The rest wait behind "N more"
//             until the learner opens the section's extras, or uses one (from search or a direct link, which always
//             work), and then it stays for 30 days. "Customise" sets each extra to recently used, always or never.
//   Courses   a dropdown of the courses recently opened, in the top bar (kit/ui/switcher.js).
//
//   const nav = mountAppNav({ sections, settings, screenOf, sectionOf, icon, haptic, home });
//   nav.arrived(name, view)       // after each screen draws: highlight it, breadcrumbs, note it in Recent
//
// sections: [[id, label, icon, [[route, label, icon], …]], …] (main.js SECTIONS); settings: [route, label, icon].
// The list helpers at the top are pure (tests/app-nav.test.mjs).
import { esc, isMac, ensureStyles } from "../ui/store.js";
import { uiIcon } from "../ui/icons.js";
import { pref, setPref, prefSet } from "../ui/prefs.js";
import { pins, pin, pinned, recent, visit, setPins, restoreAt, onPlacesChange } from "../ui/places.js";
import { createCommandPalette, mark } from "../ui/palette.js";
import { shortcuts } from "../ui/keys.js";
import { toast } from "../ui/feedback.js";
import { loadIndex, searchIndex, myCourses, score } from "../ui/global-nav.js";
import { mountWorkspace, workspace, switchTo, KINDS } from "../ui/workspace.js";
import { logEvent, history } from "../ui/history.js";
import { mountCourseSwitcher } from "../ui/switcher.js";
import { continueItems } from "./continue-view.js";

const norm = (s) => String(s || "").toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");

// ---------- pure ----------
/** every screen in the navigation, with the section it lives in: [{ route, label, icon, section, sectionLabel }] */
export function allScreens(sections, settings) {
  const out = sections.flatMap(([id, sl, , screens]) => screens.map(([route, label, ic]) => ({ route, label, icon: ic, section: id, sectionLabel: sl })));
  if (settings) out.push({ route: settings[0], label: settings[1], icon: settings[2], section: null, sectionLabel: "" });
  return out;
}

/**
 * The breadcrumb for a route: Gradify › section › screen › item. The section links to its first screen; a screen
 * that belongs to another (a pack in Your library) shows under that one, and the thing itself (its title, when the
 * screen named one) is the last, current level. Levels that would repeat the one before are left out.
 */
export function crumbTrail(hash, { sections, settings, screenOf = (r) => r, home = "#/today", itemTitle = "" }) {
  const parts = String(hash || "").replace(/^#\/?/, "").split("?")[0].split("/").filter(Boolean);
  const route = parts[0] || "today", screen = screenOf(route);
  const s = allScreens(sections, settings).find((x) => x.route === screen);
  const trail = [{ label: "Gradify", href: home }];
  if (s?.section) {
    const sec = sections.find(([id]) => id === s.section);
    if (sec && sec[1] !== s.label) trail.push({ label: sec[1], href: `#/${sec[3][0][0]}` });
  }
  if (s) trail.push({ label: s.label, href: `#/${screen}` });
  const deeper = route !== screen || parts.length > 1;
  const t = String(itemTitle || "").trim();
  if (deeper && t && t !== trail.at(-1)?.label) trail.push({ label: t.length > 60 ? `${t.slice(0, 57)}…` : t, href: `#/${parts.join("/")}` });
  return trail;
}

/**
 * Progressive disclosure: which of a section's screens show. Essentials always; an advanced screen once the section's
 * extras are open, once it's been used, or while it's the current one. Pure.
 */
export function visibleScreens(list, { advanced = new Set(), open = false, used = new Set(), current = null, choice = {} } = {}) {
  const shown = [], hidden = [];
  for (const s of list) {
    const r = s[0], c = choice[r];
    const on = !advanced.has(r) || open || r === current || c === "always" || (c !== "never" && used.has(r));
    (on ? shown : hidden).push(s);
  }
  return { shown, hidden };
}
/** the extras used within `days` (usedAt: { route: time }). Pure. */
export function recentlyUsed(usedAt = {}, { now = Date.now(), days = 30 } = {}) {
  return new Set(Object.entries(usedAt).filter(([, t]) => now - t < days * 864e5).map(([r]) => r));
}

/** screens whose name (or section) matches the query, best first, as palette hits */
export function screenHits(sections, settings, raw) {
  const words = norm(raw).split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return allScreens(sections, settings).map((s) => ({ s, sc: score(`${s.label} ${s.sectionLabel}`, words) }))
    .filter((x) => x.sc).sort((a, b) => b.sc - a.sc)
    .map(({ s }) => ({ type: "screen", t: s.label, k: s.sectionLabel ? `${s.sectionLabel} · screen` : "Screen", href: `#/${s.route}`, html: mark(s.label, raw), icon: s.icon }));
}

/** things to do, not places to go. resume: the learner's last course visit ({ title, href, next? }) or null */
export function appActions({ resume = null } = {}) {
  const a = [];
  if (resume) {
    const nx = resume.next?.href ? resume.next : null;
    a.push({ type: "action", t: "Resume last lesson", k: nx?.label || resume.title || "Where you left off", href: nx ? nx.href : resume.href, words: "continue carry on pick up" });
  }
  a.push(
    { type: "action", t: "Create flashcards", k: "From your notes: a PDF, a file or pasted text", href: "#/new", words: "make add upload notes pack" },
    { type: "action", t: "Review due flashcards", k: "The cards that are due now", href: "#/study", words: "revise practise spaced repetition" },
    { type: "action", t: "Open my plan", k: "Today and this week, planned around your exam", href: "#/plan", words: "schedule revision calendar timetable" },
    { type: "action", t: "Start a timed test", k: "Against the clock, like the real exam", href: "#/tools/quiz/timed", words: "quiz exam mock timer" },
    { type: "action", t: "Plan a study session", k: "Tell Gradify how long you've got", href: "#/session", words: "focus pomodoro" },
    { type: "action", t: "Make a mind map", k: "From a topic or your notes", href: "#/tools/map/new", words: "diagram" },
    { type: "action", t: "Ask Gradify", k: "A question about anything you study", href: "#/ai", words: "ai tutor help explain" },
    { type: "action", t: "Activity history", k: "Everything you've viewed, studied, created and edited", href: "#/history", words: "recent recently viewed edited created studied log" },
    { type: "action", t: "Explore every course", k: "Chapters, topics and lessons, with your progress", href: "/explore.html", words: "browse catalogue subjects" },
    { type: "action", t: "Keyboard shortcuts", k: "Press ? on any screen", run: () => import("../ui/keys.js").then((m) => m.showShortcuts()), words: "keys help" },
  );
  return a;
}
/** the actions that match every word of the query (in the name, the line under it, or their other names) */
export function matchActions(list, raw) {
  const words = norm(raw).split(/\s+/).filter(Boolean);
  return list.filter((x) => words.every((w) => norm(`${x.t} ${x.k} ${x.words || ""}`).includes(w))).map((x) => ({ ...x, html: mark(x.t, raw) }));
}

// ---------- the page ----------
const P = "app";   // prefs scope

export function mountAppNav({ sections, settings, screenOf, sectionOf, icon, haptic = () => {}, home = "#/today", appName = "Gradify", afterPaint = () => {}, advanced = new Set() }) {
  ensureStyles();
  const view = document.querySelector("#view"), shell = view?.parentElement;
  if (!view || !shell) return { arrived() {}, markCurrent() {} };
  const folded = prefSet(P, "folded"), extras = prefSet(P, "extras");
  // when each extra screen was last used, and the learner's own choice for it ("always" | "never"; none: recently used)
  const usedAt = () => pref(P, "usedAt", {}), choices = () => pref(P, "navChoice", {});
  const screens = allScreens(sections, settings);
  const currentRoute = () => location.hash.replace(/^#\/?/, "").split(/[/?]/)[0] || "today";
  const here = () => `${location.pathname}${location.hash || "#/today"}`;
  const appPath = location.pathname;
  // an href in this app, as the sidebar and the palette use it: a place inside it is just its hash
  const local = (href) => (href.startsWith(`${appPath}#`) ? href.slice(appPath.length) : href);
  let lastTitle = "";

  // ----- the sidebar -----
  const side = document.createElement("nav");
  side.className = "lo-side"; side.id = "lo-side"; side.setAttribute("aria-label", `${appName} sections`);
  view.before(side);
  shell.classList.add("lo-shell");
  const scrim = Object.assign(document.createElement("div"), { className: "lo-scrim" });
  scrim.hidden = true;
  document.body.append(scrim);

  const link = ([r, label, ic]) => `<a href="#/${r}" data-route="${r}" title="${esc(label)}">${icon(ic)}<span>${esc(label)}</span></a>`;
  const placeRow = (p, kind, i) => {
    const href = local(p.href);
    return `<div class="lo-place"><a href="${esc(href)}" data-place="${esc(href)}" title="${esc(p.title)}${p.sub ? ` · ${esc(p.sub)}` : ""}">${uiIcon(kind === "pin" ? "pinned" : "clock")}<span>${esc(p.title)}</span></a>${kind === "pin" ? `<button type="button" class="lo-x" data-unpin="${i}" aria-label="Unpin ${esc(p.title)}" title="Unpin">${uiIcon("close")}</button>` : ""}</div>`;
  };
  function paint() {
    const rail = isRail(), cur = sectionOf(currentRoute());
    const mine = pins().slice(0, 8);
    const seen = recent().filter((r) => local(r.href) !== local(here()) && !mine.some((p) => p.href === r.href)).slice(0, 5);
    const group = (id, label, body, { open = true, cls = "", foldable = true } = {}) => `<div class="lo-sec ${cls}${open ? " expanded" : ""}" data-section="${id}" role="group" aria-labelledby="lo-sec-${id}">
      ${foldable ? `<button type="button" class="lo-sec-label" id="lo-sec-${id}" data-fold="${id}" aria-expanded="${open}"><span>${esc(label)}</span>${uiIcon("right", "lo-chev")}</button>` : `<span class="lo-sec-label" id="lo-sec-${id}">${esc(label)}</span>`}
      <div class="lo-sec-body">${body}</div></div>`;
    side.innerHTML = `<div class="lo-side-head"><span class="lo-side-title">${esc(appName)}</span>
        <button type="button" class="lo-rail" data-rail aria-pressed="${rail}" aria-label="${rail ? "Expand the sidebar" : "Collapse the sidebar to icons"}" title="${rail ? "Expand" : "Collapse"} sidebar ([)">${uiIcon(rail ? "right" : "left")}</button>
        <button type="button" class="lo-close" data-close aria-label="Close menu">${uiIcon("close")}</button></div>
      <button type="button" class="lo-find" data-find title="Search (${isMac() ? "⌘K" : "Ctrl+K"})">${uiIcon("search")}<span>Search or jump to…</span><kbd>${isMac() ? "⌘K" : "/"}</kbd></button>
      ${mine.length ? group("pinned", "Pinned", mine.map((p, i) => placeRow(p, "pin", i)).join(""), { open: !folded.has("pinned"), cls: "lo-mine" }) : ""}
      ${seen.length ? group("recent", "Recent", seen.map((p) => placeRow(p, "recent")).join(""), { open: !folded.has("recent"), cls: "lo-mine" }) : ""}
      ${sections.map(([id, label, , list]) => {
        // essentials first; the rest behind "N more" (the rail has room for every icon, so it shows them all)
        const v = visibleScreens(list, { advanced, open: rail || extras.has(id), used: recentlyUsed(usedAt()), current: screenOf(currentRoute()), choice: choices() });
        const more = v.hidden.length ? `<button type="button" class="lo-more" data-more="${id}" aria-expanded="false" title="${esc(v.hidden.map((x) => x[1]).join(", "))}">${uiIcon("more")}<span>${v.hidden.length} more</span></button>`
          : !rail && extras.has(id) && visibleScreens(list, { advanced, used: recentlyUsed(usedAt()), current: screenOf(currentRoute()), choice: choices() }).hidden.length ? `<button type="button" class="lo-more" data-more="${id}" aria-expanded="true">${uiIcon("up")}<span>Show fewer</span></button>` : "";
        return group(id, label, v.shown.map(link).join("") + more, { open: id === cur || !folded.has(id), cls: id === cur ? "open" : "" });
      }).join("")}
      <div class="lo-sec lo-sec-end expanded"><div class="lo-sec-body">${link(settings)}${advanced.size ? `<button type="button" class="lo-more lo-custom" data-customise>${uiIcon("grid")}<span>Customise sidebar</span></button>` : ""}</div></div>`;
    markCurrent();
    afterPaint(side);
  }
  const isRail = () => matchMedia("(min-width: 1100px)").matches && Boolean(pref(P, "rail", false));
  function setRail(on) {
    setPref(P, "rail", on ? true : null);
    applyRail(); paint();
    side.querySelector("[data-rail]")?.focus();
  }
  const applyRail = () => shell.classList.toggle("lo-railed", isRail());
  matchMedia("(min-width: 1100px)").addEventListener?.("change", () => { applyRail(); if (matchMedia("(min-width: 1100px)").matches) closeDrawer(); paint(); });

  function markCurrent() {
    const route = currentRoute(), screen = screenOf(route), section = sectionOf(route), at = local(here());
    side.querySelectorAll("a[data-route]").forEach((a) => a.setAttribute("aria-current", a.dataset.route === screen ? "page" : "false"));
    side.querySelectorAll("a[data-place]").forEach((a) => a.classList.toggle("on", a.dataset.place === at));
    document.querySelectorAll(".sec-screens a").forEach((a) => a.setAttribute("aria-current", a.dataset.route === screen ? "page" : "false"));
    document.querySelectorAll(".tabbar a").forEach((a) => a.setAttribute("aria-current", String(a.dataset.section === section)));
    side.querySelectorAll(".lo-sec[data-section]").forEach((g) => {
      const mine = g.dataset.section === section;
      g.classList.toggle("open", mine);
      if (mine && !g.classList.contains("expanded")) { g.classList.add("expanded"); g.querySelector("[data-fold]")?.setAttribute("aria-expanded", "true"); }
    });
    paintScreens(section);
  }
  // below the sidebar's width: the open section's screens as a row of pills above the page, so a sibling screen is one tap
  function paintScreens(section) {
    let row = document.querySelector(".sec-screens");
    if (!row) {
      row = document.createElement("nav"); row.className = "sec-screens"; row.setAttribute("aria-label", "This section");
      view.before(row);
      row.addEventListener("click", (e) => { if (e.target.closest("a")) haptic("tap"); });
    }
    const sec = sections.find(([id]) => id === section), screen = screenOf(currentRoute());
    row.hidden = !sec || sec[3].length < 2;
    row.innerHTML = sec ? sec[3].map(([r, label]) => `<a class="chip" href="#/${r}" data-route="${r}" aria-current="${r === screen ? "page" : "false"}">${esc(label)}</a>`).join("") : "";
  }

  side.addEventListener("click", (e) => {
    const f = e.target.closest("[data-fold]");
    if (f) {
      const g = f.closest(".lo-sec"), id = f.dataset.fold, open = !g.classList.contains("expanded");
      if (!open && id === sectionOf(currentRoute())) { g.classList.add("nudge"); setTimeout(() => g.classList.remove("nudge"), 300); return; }   // where you are stays open
      g.classList.toggle("expanded", open); f.setAttribute("aria-expanded", String(open));
      folded.toggle(id, !open);
      return;
    }
    if (e.target.closest("[data-rail]")) { setRail(!isRail()); return; }
    if (e.target.closest("[data-customise]")) { closeDrawer(); customise(); return; }
    const m = e.target.closest("[data-more]");
    if (m) {
      // open or close a section's extras; focus goes to the first screen that appeared, or back to the button
      const id = m.dataset.more, opening = !extras.has(id), inSec = () => [...side.querySelectorAll(`[data-section="${id}"] a[data-route]`)];
      const before = new Set(inSec().map((a) => a.dataset.route));
      extras.toggle(id, opening); paint();
      (opening && inSec().find((a) => !before.has(a.dataset.route)) || side.querySelector(`[data-more="${id}"]`) || side.querySelector(`[data-fold="${id}"]`))?.focus();
      return;
    }
    if (e.target.closest("[data-close]")) { closeDrawer(true); return; }
    if (e.target.closest("[data-find]")) { closeDrawer(); pal.open(); return; }
    const un = e.target.closest("[data-unpin]");
    if (un) {
      const i = Number(un.dataset.unpin), item = pins()[i]; if (!item) return;
      setPins(pins().filter((_, k) => k !== i));
      toast({ html: `Unpinned <b>${esc(item.title)}</b>` }, { undo: () => setPins(restoreAt(pins(), item, i)) });
      return;
    }
    if (e.target.closest("a")) { haptic("tap"); closeDrawer(); }
  });

  // ----- customise: what the primary navigation shows. Essentials always; each extra recently used, always or never.
  // Whatever is chosen, every screen stays in search (⌘K) and opens from a direct link.
  async function customise() {
    const { openModal } = await import("../ui/overlay.js");
    const opts = [["", "When I've used it recently"], ["always", "Always"], ["never", "Only from search"]];
    const c = choices();
    const body = `<p class="sub lo-cust-lead">Essentials are always in the sidebar. Choose when the others show. Every screen is always in search (${isMac() ? "⌘K" : "Ctrl+K"}) and opens from a link.</p>
      ${sections.map(([id, label, , list]) => `<fieldset class="lo-cust"><legend>${esc(label)}</legend>${list.map(([r, l, ic]) => `<div class="lo-cust-row"><span>${icon(ic)}${esc(l)}</span>${advanced.has(r)
        ? `<select data-choice="${r}" aria-label="When ${esc(l)} shows">${opts.map(([v, t]) => `<option value="${v}" ${(c[r] || "") === v ? "selected" : ""}>${t}</option>`).join("")}</select>`
        : `<em>Always shown</em>`}</div>`).join("")}</fieldset>`).join("")}`;
    const m = openModal({ title: "Customise your sidebar", body, actions: [{ label: "Reset", value: "reset", run: () => { setPref(P, "navChoice", null); paint(); } }, { label: "Done", primary: true }] });
    m.box?.addEventListener("change", (e) => {
      const sel = e.target.closest("[data-choice]"); if (!sel) return;
      const next = { ...choices() }; if (sel.value) next[sel.dataset.choice] = sel.value; else delete next[sel.dataset.choice];
      setPref(P, "navChoice", Object.keys(next).length ? next : null); paint();
    });
  }

  // ----- the drawer (phones and tablets) -----
  const bar = document.querySelector("header.app-bar") || shell.querySelector("header");
  const menu = Object.assign(document.createElement("button"), { type: "button", className: "lo-menu" });
  menu.setAttribute("aria-label", "Menu"); menu.setAttribute("aria-controls", "lo-side"); menu.setAttribute("aria-expanded", "false");
  menu.innerHTML = uiIcon("menu");
  bar?.prepend(menu);
  menu.addEventListener("click", () => (document.body.classList.contains("side-open") ? closeDrawer(true) : openDrawer()));
  scrim.addEventListener("click", () => closeDrawer(true));
  function openDrawer() {
    document.body.classList.add("side-open"); scrim.hidden = false; menu.setAttribute("aria-expanded", "true");
    side.setAttribute("role", "dialog"); side.setAttribute("aria-modal", "true");
    (side.querySelector("a[aria-current='page']") || side.querySelector("a, button"))?.focus({ preventScroll: true });
    haptic("tap");
  }
  function closeDrawer(refocus = false) {
    if (!document.body.classList.contains("side-open")) return;
    document.body.classList.remove("side-open"); scrim.hidden = true; menu.setAttribute("aria-expanded", "false");
    side.removeAttribute("role"); side.removeAttribute("aria-modal");
    if (refocus) menu.focus({ preventScroll: true });
  }
  document.addEventListener("keydown", (e) => {
    if (!document.body.classList.contains("side-open")) return;
    if (e.key === "Escape") { e.preventDefault(); closeDrawer(true); return; }
    if (e.key !== "Tab") return;   // keep focus inside the open drawer
    const f = [...side.querySelectorAll("a, button")].filter((x) => x.offsetParent);
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f.at(-1).focus(); }
    else if (!e.shiftKey && document.activeElement === f.at(-1)) { e.preventDefault(); f[0].focus(); }
  });

  // ----- the search button in the top bar -----
  const find = Object.assign(document.createElement("button"), { type: "button", className: "gx-searchbtn lo-searchbtn" });
  find.setAttribute("aria-label", "Search Gradify"); find.title = `Search (${isMac() ? "⌘K" : "Ctrl+K"})`;
  find.innerHTML = `${uiIcon("search")}<span>Search</span><kbd>${isMac() ? "⌘K" : "/"}</kbd>`;
  find.addEventListener("click", () => pal.open());
  bar?.querySelector(".mode-chip")?.before(find);
  const switcher = mountCourseSwitcher(bar?.querySelector(".brand"), { where: "afterend" });

  // ----- breadcrumbs -----
  const crumbs = document.createElement("nav");
  crumbs.className = "lo-crumbs"; crumbs.setAttribute("aria-label", "Breadcrumb");
  view.before(crumbs);
  const tabs = mountWorkspace(crumbs, { where: "beforebegin" });
  function paintCrumbs(title) {
    const trail = crumbTrail(location.hash, { sections, settings, screenOf, home, itemTitle: title });
    const place = currentPlace(trail), on = pinned(place.href);
    crumbs.classList.toggle("deep", Boolean(title) && trail.length > 2);
    crumbs.innerHTML = `<ol>${trail.map((c, i) => i === trail.length - 1 ? `<li><span aria-current="page">${esc(c.label)}</span></li>` : `<li><a href="${esc(c.href)}">${esc(c.label)}</a></li>`).join("")}</ol>
      <button type="button" class="lo-pin" data-pin aria-pressed="${on}" title="${on ? "Unpin" : "Pin"} this to your sidebar">${uiIcon(on ? "pinned" : "pin")}<span>${on ? "Pinned" : "Pin"}</span></button>`;
  }
  const currentPlace = (trail = crumbTrail(location.hash, { sections, settings, screenOf, home, itemTitle: lastTitle })) => {
    const s = screens.find((x) => x.route === screenOf(currentRoute()));
    return { href: here(), title: trail.at(-1).label, sub: [appName === "Gradify" ? "Study app" : appName, s?.sectionLabel].filter(Boolean).join(" · "), kind: "app" };
  };
  crumbs.addEventListener("click", (e) => {
    if (!e.target.closest("[data-pin]")) return;
    const r = pin(currentPlace());
    haptic("tap");
    toast({ html: `${r.pinned ? "Pinned" : "Unpinned"} <b>${esc(r.item.title)}</b>${r.pinned ? " to your sidebar" : ""}` }, { undo: () => setPins(r.pinned ? pins().filter((p) => p.href !== r.item.href) : restoreAt(pins(), r.item, r.index)) });
  });

  // ----- the command palette -----
  const resume = () => myCourses()[0] || null;
  const placeHit = (p, type) => ({ type, t: p.title, k: p.sub || (type === "pin" ? "Pinned" : "Recently visited"), href: local(p.href) });
  const pal = createCommandPalette({
    name: appName, placeholder: "Search screens, actions, courses and lessons…",
    kinds: [["all", "All"], ["screen", "Screens"], ["action", "Actions"], ["lesson", "Lessons"], ["course", "Courses"]],
    groups: [["Actions", "action", 5], ["Screens", "screen", 6], ["Pinned", "pin", 5], ["Recent", "recent", 4], ["Courses", "course", 5], ["Lessons", "lesson", 8], ["Topics", "topic", 5]],
    icons: { tab: "split", screen: "grid", action: "bolt", course: "book", lesson: "play", topic: "flag", recent: "clock", pin: "pinned" },
    lead: (h) => (h.icon ? `<span class="gx-oi">${icon(h.icon)}</span>` : ""),
    search: (raw) => {
      const words = norm(raw).split(/\s+/).filter(Boolean);
      const has = (p) => words.every((w) => norm(`${p.title} ${p.sub || ""}`).includes(w));
      return [
        ...matchActions(appActions({ resume: resume() }), raw),
        ...screenHits(sections, settings, raw),
        ...pins().filter(has).map((p) => ({ ...placeHit(p, "pin"), html: mark(p.title, raw) })),
        ...recent().filter((p) => has(p) && !pinned(p.href)).map((p) => ({ ...placeHit(p, "recent"), html: mark(p.title, raw) })),
      ];
    },
    searchMore: (raw) => loadIndex().then((idx) => searchIndex(idx, raw, { site: appName === "Gradify" ? null : appName })),
    suggestions: () => {
      const r = resume();
      // everything the learner was in the middle of (the same as Today's "Pick up where you left off")
      let session = null; try { session = JSON.parse(localStorage.getItem("gradify.session")); } catch { /* none */ }
      const cont = continueItems({ course: r, hist: history(), session }).map((x) => ({ type: "action", t: x.kind === "lesson" ? `Resume: ${x.title}` : `${x.label}: ${x.title}`, k: x.sub || x.label, href: local(x.href) }));
      return [
        { title: "Continue", items: cont },
        { title: "Workspace", items: workspace().tabs.filter((t) => t.id !== workspace().active).map((t) => ({ type: "tab", t: t.title, k: `${KINDS[t.kind]?.[0] || ""}${t.scopeLabel ? ` · ${t.scopeLabel}` : ""} · workspace tab`, href: local(t.href), run: () => switchTo(t) })) },
        { title: "Pinned", items: pins().slice(0, 5).map((p) => placeHit(p, "pin")) },
        { title: "Recent", items: recent().filter((p) => local(p.href) !== local(here()) && !pinned(p.href)).slice(0, 4).map((p) => placeHit(p, "recent")) },
        { title: "Quick actions", items: appActions().slice(0, 6) },
      ];
    },
    onOpen: () => loadIndex(),
  });

  // ----- shortcuts -----
  const go = (r) => () => { location.hash = `#/${r}`; };
  shortcuts([
    { keys: "[", label: "Collapse or expand the sidebar", group: "General", run: () => (matchMedia("(min-width: 1100px)").matches ? setRail(!isRail()) : document.body.classList.contains("side-open") ? closeDrawer(true) : openDrawer()) },
    { keys: "g t", label: "Today", group: "Go to", run: go("today") },
    { keys: "g p", label: "Smart Plan", group: "Go to", run: go("plan") },
    { keys: "g f", label: "Flashcards", group: "Go to", run: go("study") },
    { keys: "g n", label: "Notes", group: "Go to", run: go("notes") },
    { keys: "g c", label: "Courses", group: "Go to", run: go("learning") },
    { keys: "g r", label: "Progress", group: "Go to", run: go("progress") },
    { keys: "g s", label: "Settings", group: "Go to", run: go("account") },
  ]);

  // ----- phones and tablets: the five sections in the tab bar, each opening its first screen -----
  for (const nav of document.querySelectorAll(".tabbar")) {
    nav.innerHTML = sections.map(([id, label, ic, list]) => `<a href="#/${list[0][0]}" data-section="${id}">${icon(ic)}<span>${esc(label)}</span></a>`).join("");
    nav.addEventListener("click", (e) => { if (e.target.closest("a, button")) haptic("tap"); });
  }

  onPlacesChange(() => { paint(); paintCrumbs(lastTitle); });
  applyRail(); paint();

  return {
    markCurrent() { closeDrawer(); markCurrent(); },
    /** after a screen has drawn: its breadcrumb, and a note in Recent (the title of what it opened, if it opened one) */
    arrived(name) {
      const deeper = location.hash.replace(/^#\/?/, "").split("?")[0].split("/").filter(Boolean).length > 1 || screenOf(name) !== name;
      lastTitle = deeper ? (view.querySelector("h1, h2")?.textContent || "").replace(/\s+/g, " ").trim() : "";
      paintCrumbs(lastTitle);
      const p = currentPlace();
      if (name !== "start" && name !== "offer") visit(p);
      // a workspace tab for the kinds of place you work between, and a line in History
      const arg = location.hash.replace(/^#\/?/, "").split("?")[0].split("/")[1];
      const kind = { deck: "flashcards", study: "flashcards", session: "flashcards", notes: "notes", jot: "notes", plan: "plan" }[name]
        || (name === "tools" && arg === "quiz" ? "questions" : name === "tools" && arg === "notebook" ? "notes" : null);
      tabs.arrived({ href: here(), title: p.title, kind, scope: appPath, scopeLabel: appName === "Gradify" ? "" : appName });
      // an extra screen the learner has used now stays in the sidebar
      const scr = screenOf(name);
      if (advanced.has(scr)) { const was = recentlyUsed(usedAt()).has(scr); setPref(P, "usedAt", { ...usedAt(), [scr]: Date.now() }); if (!was) paint(); }
      switcher?.refresh();
      if (!["start", "offer", "history"].includes(name)) logEvent({ act: "viewed", href: here(), title: p.title, kind: name, where: p.sub });
      markCurrent();
    },
  };
}
