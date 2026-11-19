// Gradify-wide navigation for the pages outside a course: the Gradify homepage and every subject site's homepage.
//
//   import { mountGlobalNav, mountYourLearning } from "/kit/ui/global-nav.js";
//   mountGlobalNav({ site: "SciGradify", button: document.querySelector(".sub-right") });   // ⌘K / "/" + a Search button
//   mountYourLearning(el, { site: "SciGradify" });          // pinned, continue cards with the recommended next step
//
// The palette searches every Gradify site, every course, its units and modules and every lesson
// (kit/data/search-index.json, built by scripts/build-search-index.mjs and fetched the first time someone types),
// plus what this learner pinned and opened recently, and a few quick actions. On a subject site, that site's
// courses come first.
import { esc, ensureStyles, isMac, readJson } from "./store.js";
import { uiIcon } from "./icons.js";
import { createCommandPalette, mark } from "./palette.js";
import { pins, pin, recent, setPins, onPlacesChange, restoreAt, move } from "./places.js";
import { toast } from "./feedback.js";
import { courseCard } from "./resources.js";
import { shortcuts } from "./keys.js";
import { SITES, pathOf } from "../core/site.js";

const norm = (s) => String(s || "").toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");
const INDEX_URL = new URL("../data/search-index.json", import.meta.url).href;
let indexP = null;
export const loadIndex = () => (indexP ||= fetch(INDEX_URL).then((r) => (r.ok ? r.json() : { courses: [] })).catch(() => { indexP = null; return { courses: [] }; }));

/** score how well a title matches the query words (every word must appear); higher is better. Pure. */
export function score(title, words) {
  const t = norm(title);
  let s = 0;
  for (const w of words) { const i = t.indexOf(w); if (i < 0) return 0; s += i === 0 ? 4 : t[i - 1] === " " ? 3 : 1; }
  return s + (t === words.join(" ") ? 10 : 0) - t.length / 200;
}
/**
 * Search the index: courses, units/modules and lessons, best first, the learner's own site first.
 * Pure (tests/ui.test.mjs): idx is the parsed search-index.json.
 */
export function searchIndex(idx, raw, { site = null, limit = 40 } = {}) {
  const words = norm(raw).split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const out = [];
  const bonus = (c) => (site && c.site === site ? 2 : 0);
  for (const c of idx.courses || []) {
    const cs = score(`${c.n} ${c.site}`, words);
    if (cs) out.push({ type: "course", t: c.n, k: `${c.site} · course`, href: c.u, s: cs + 3 + bonus(c) });
    for (const [uid, n, title, lessons, mods = []] of c.units) {
      const us = score(title, words);
      if (us) out.push({ type: "topic", t: title, k: `${c.n} · ${c.U} ${n}`, href: `${c.u}#/learn/${uid}`, s: us + 1 + bonus(c) });
      mods.forEach((m, mi) => { const ms = score(m, words); if (ms) out.push({ type: "topic", t: m, k: `${c.n} · ${c.U} ${n}.${mi + 1}`, href: `${c.u}#/learn/${uid}`, s: ms + 0.5 + bonus(c) }); });
      for (const [lid, lt, mi] of lessons) {
        const ls = score(lt, words);
        if (ls) out.push({ type: "lesson", t: lt, k: `${c.n} · ${c.U} ${n}${mi != null && mods[mi] ? ` · ${mods[mi]}` : ""}`, href: `${c.u}#/lesson/${lid}`, s: ls + bonus(c) });
      }
    }
  }
  return out.sort((a, b) => b.s - a.s).slice(0, limit).map((h) => ({ ...h, html: mark(h.t, raw) }));
}

const siteHits = (raw, site) => {
  const words = norm(raw).split(/\s+/).filter(Boolean);
  return SITES.filter((s) => s.built || s.url).map((s) => ({ s, sc: score(`${s.n} ${s.who || ""} ${s.d || ""}`, words) }))
    .filter((x) => x.sc).sort((a, b) => b.sc - a.sc).slice(0, 6)
    .map(({ s, sc }) => ({ type: "site", t: s.n, k: s.who || s.d || "", href: pathOf?.(s) || `/${s.n.toLowerCase()}/`, html: mark(s.n, raw), s: sc + (s.n === site ? 5 : 0) }));
};

function actions(site) {
  const app = site ? "app.html" : "/app.html";
  return [
    { type: "action", t: "Explore every course", k: "Chapters, topics and lessons, with your progress", href: "/explore.html" },
    { type: "action", t: "Open the study app", k: "Your notes, flashcards and plan", href: app },
    { type: "action", t: "Review flashcards", k: "The cards that are due", href: `${app}#/study` },
    { type: "action", t: "Your Journey", k: "Level, quests and streak", href: "/journey.html" },
    { type: "action", t: "Every Gradify site", k: "Browse the family", href: "/#find" },
    { type: "action", t: "Keyboard shortcuts", k: "Press ? on any page", run: () => import("./keys.js").then((m) => m.showShortcuts()) },
  ];
}

/** the learner's courses from the cross-site recent list (kit/course/course.js noteVisit), newest first */
export function myCourses({ site = null } = {}) {
  const list = readJson("gradify.recent", []).filter((r) => r?.href && r.title && (!site || r.site === site));
  return list.sort((a, b) => b.t - a.t);
}

export function mountGlobalNav({ site = null, button = null } = {}) {
  ensureStyles();
  const recentHits = () => [
    ...myCourses({ site }).slice(0, 4).map((r) => ({ type: "recent", t: r.title, k: `Continue · ${r.course}${r.unit ? ` · ${r.unit}` : ""}`, href: r.href })),
    ...recent().filter((r) => !myCourses().some((m) => m.href === r.href)).slice(0, 3).map((r) => ({ type: "recent", t: r.title, k: r.sub || "Recently visited", href: r.href })),
  ];
  const pal = createCommandPalette({
    name: site || "Gradify", placeholder: site ? `Search ${site}, every course and lesson…` : "Search every Gradify course, lesson and tool…",
    kinds: [["all", "All"], ["course", "Courses"], ["lesson", "Lessons"], ["topic", "Topics"], ["site", "Sites"], ["action", "Actions"]],
    groups: [["Pinned", "pin", 6], ["Courses", "course", 6], ["Lessons", "lesson", 10], ["Topics", "topic", 6], ["Sites", "site", 5], ["Actions", "action", 5]],
    icons: { course: "book", lesson: "play", topic: "flag", site: "home", action: "bolt", recent: "clock", pin: "pinned" },
    search: (raw) => {
      const words = norm(raw).split(/\s+/);
      const mine = pins().filter((p) => words.every((w) => norm(`${p.title} ${p.sub || ""}`).includes(w))).map((p) => ({ type: "pin", t: p.title, k: p.sub || "Pinned", href: p.href, html: mark(p.title, raw) }));
      const acts = actions(site).filter((a) => words.every((w) => norm(`${a.t} ${a.k}`).includes(w)));
      return [...mine, ...siteHits(raw, site), ...acts];
    },
    searchMore: (raw) => loadIndex().then((idx) => searchIndex(idx, raw, { site })),
    suggestions: () => [
      { title: "Continue", items: recentHits() },
      { title: "Pinned", items: pins().slice(0, 6).map((p) => ({ type: "pin", t: p.title, k: p.sub || "Pinned", href: p.href })) },
      { title: "Quick actions", items: actions(site) },
    ],
    onOpen: () => loadIndex(),   // start fetching while the learner types their first letters
  });
  if (button) {
    const b = Object.assign(document.createElement("button"), { type: "button", className: "gx-searchbtn" });
    b.setAttribute("aria-label", "Search Gradify"); b.title = `Search (${isMac() ? "⌘K" : "Ctrl+K"})`;
    b.innerHTML = `${uiIcon("search")}<span>Search</span><kbd>${isMac() ? "⌘K" : "/"}</kbd>`;
    b.addEventListener("click", () => pal.open());
    button.prepend(b);
  }
  shortcuts([{ keys: "g h", label: site ? `${site} home` : "Gradify home", group: "Go to", run: () => { location.href = site ? "./" : "/"; } }]);
  return pal;
}

/**
 * "Your learning": pinned items (reorderable, Undo on unpin) and a card per course in progress with its
 * recommended next step. Hidden for someone who hasn't started anything, so a first visit looks unchanged.
 */
export function mountYourLearning(el, { site = null, title = "Your learning" } = {}) {
  if (!el) return null;
  ensureStyles();
  const draw = () => {
    const courses = myCourses({ site }), mine = pins();
    if (!courses.length && !mine.length) { el.hidden = true; el.innerHTML = ""; return; }
    el.hidden = false; el.classList.add("gx-yours");
    el.setAttribute("aria-label", title);
    const pinnedHrefs = new Set(mine.map((p) => p.href));
    el.innerHTML = `<div class="gx-yhead"><h2><i aria-hidden="true"></i>${esc(title)}</h2><button type="button" class="gx-link" data-pal>${uiIcon("search")}Find anything <kbd>${isMac() ? "⌘K" : "/"}</kbd></button></div>
      ${mine.length ? `<ul class="gx-pins" aria-label="Pinned">${mine.map((p, i) => `<li draggable="true" data-i="${i}"><a href="${esc(p.href)}">${uiIcon("pinned")}<span><b>${esc(p.title)}</b><small>${esc(p.sub || "")}</small></span></a><button type="button" class="gx-ib" data-unpin="${i}" aria-label="Unpin ${esc(p.title)}" title="Unpin">${uiIcon("close")}</button></li>`).join("")}</ul>` : ""}
      ${courses.length ? `<div class="gx-cards">${courses.slice(0, 6).map((r) => {
        const courseHref = r.href.split("#")[0];
        return courseCard({ site: site ? r.unit || "" : r.site, course: r.course, status: r.course_pct >= 1 ? "done" : r.status || "started", pct: r.course_pct || 0, done: r.done_n || 0, total: r.total || 0,
          next: r.next ? { ...r.next, href: r.next.href } : { label: `Carry on with “${r.title}”`, href: r.href, go: "Continue learning" }, href: courseHref, pinned: pinnedHrefs.has(courseHref), pinHref: courseHref });
      }).join("")}</div>` : ""}`;
  };
  draw();
  el.addEventListener("click", (e) => {
    if (e.target.closest("[data-pal]")) { document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: isMac(), ctrlKey: !isMac(), bubbles: true })); return; }
    const un = e.target.closest("[data-unpin]");
    if (un) {
      const i = Number(un.dataset.unpin), item = pins()[i]; if (!item) return;
      setPins(pins().filter((_, k) => k !== i));
      toast({ html: `Unpinned <b>${esc(item.title)}</b>` }, { undo: () => setPins(restoreAt(pins(), item, i)) });
      return;
    }
    const pb = e.target.closest("[data-pin]");
    if (pb) {
      const href = pb.dataset.pin, card = pb.closest(".gx-ccard"), name = card.querySelector("h3").textContent, sub = card.querySelector(".gx-kicker").textContent;
      const r = pin({ href, title: name, sub: sub ? `${sub} · course` : "Course", kind: "course" });
      toast({ html: `${r.pinned ? "Pinned" : "Unpinned"} <b>${esc(name)}</b>` }, { undo: () => setPins(r.pinned ? pins().filter((p) => p.href !== href) : restoreAt(pins(), r.item, r.index)) });
    }
  });
  // drag to reorder the pins (and Alt+↑/↓ from the keyboard)
  let from = null;
  el.addEventListener("dragstart", (e) => { const li = e.target.closest(".gx-pins li"); if (li) { from = Number(li.dataset.i); e.dataTransfer.effectAllowed = "move"; li.classList.add("drag"); } });
  el.addEventListener("dragover", (e) => { if (from != null && e.target.closest(".gx-pins li")) e.preventDefault(); });
  el.addEventListener("drop", (e) => { const li = e.target.closest(".gx-pins li"); if (from == null || !li) return; e.preventDefault(); setPins(move(pins(), from, Number(li.dataset.i))); from = null; });
  el.addEventListener("dragend", () => { from = null; el.querySelectorAll(".drag").forEach((x) => x.classList.remove("drag")); });
  el.addEventListener("keydown", (e) => {
    const li = e.target.closest(".gx-pins li"); if (!li || !e.altKey || !["ArrowUp", "ArrowDown"].includes(e.key)) return;
    e.preventDefault(); const i = Number(li.dataset.i), to = i + (e.key === "ArrowUp" ? -1 : 1);
    setPins(move(pins(), i, to)); el.querySelector(`.gx-pins li[data-i="${Math.max(0, Math.min(pins().length - 1, to))}"] a`)?.focus();
  });
  onPlacesChange(draw);
  return { redraw: draw };
}
