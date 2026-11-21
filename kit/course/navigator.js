// Course navigation (kit/course/course.js): the course outline that stays beside a lesson, and the command palette.
//
// The outline follows the syllabus the way a student thinks about it: stage → unit → module → lesson, numbered
// (3, 3.2, …), each lesson marked with its status (kit/learning/topic-status.js) and the current one highlighted.
// Units open and close (remembered), only open units are drawn (a course can have a thousand lessons), and typing in
// its filter narrows it to matching lessons. Under the current lesson sit its own resources: check questions,
// flashcards and the unit quiz, so nothing needs hunting for.
//
// The palette (/ or ⌘K / Ctrl+K anywhere in a course) searches units, modules, lessons, interactives and actions at
// once, and, once the notes have loaded, section headings and key terms inside the notes, so a search for a concept
// lands on the paragraph that teaches it. Empty, it offers Continue, recently viewed lessons, bookmarks and actions.
//
// Both take an api from the course: { units, byId, U, trackOf, ic, esc, status(id), roll(ids), marks(), current(),
// openUnits(), setOpen(id, open), search(raw), searchNotes(raw) → Promise, suggestions(), nQ(id)?, nCards(id)? }

import { STATUS } from "../learning/topic-status.js";
import { createCommandPalette } from "../ui/palette.js";

/** A unit's lessons in modules: the unit's own module list when it covers every lesson, else runs of l.module. */
export function moduleGroups(u, byId) {
  const all = u.lessons.map((l) => byId[l.id]).filter(Boolean);
  if (u.modules?.length && u.modules.reduce((n, m) => n + (m.lessons?.length || 0), 0) === all.length) {
    return u.modules.map((m, i) => ({ id: m.id || `${u.id}:${i}`, title: m.title || null, lessons: (m.lessons || []).map((id) => byId[typeof id === "string" ? id : id.id]).filter(Boolean) }));
  }
  const out = [];
  for (const l of all) { const last = out.at(-1); if (last && last.title === (l.module || null)) last.lessons.push(l); else out.push({ id: `${u.id}:${out.length}`, title: l.module || null, lessons: [l] }); }
  return out;
}

export const dot = (st) => `<i class="cx-st s-${st}" aria-hidden="true"></i>`;
export const stLabel = (st) => STATUS[st]?.label || "";
const pct = (x) => `${Math.round((x || 0) * 100)}%`;

export function ring(p, size = 44, stroke = 5, cls = "") {
  const r = (size - stroke) / 2, C = 2 * Math.PI * r;
  return `<svg class="cx-ring ${cls}" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" aria-hidden="true"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" class="bg" stroke-width="${stroke}"/><circle cx="${size / 2}" cy="${size / 2}" r="${r}" class="fg" stroke-width="${stroke}" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - Math.max(0, Math.min(1, p || 0)))}"/></svg>`;
}

// ---------- the outline ----------
export function createOutline(api) {
  const { esc, ic, U } = api;
  const lessonRow = (l, cur) => {
    const st = api.status(l.id), here = cur?.id === l.id, mark = api.marks()[l.id] > 0;
    return `<li><a href="#/lesson/${l.id}" class="cx-l s-${st}${here ? " here" : ""}" ${here ? 'aria-current="page"' : ""} title="${esc(stLabel(st))}">${dot(st)}<span>${esc(l.title)}</span>${mark ? `<b class="cx-mk" aria-label="Bookmarked">${ic("star")}</b>` : ""}</a>${here ? toolkit(l) : ""}</li>`;
  };
  // the current lesson's own resources, under it in the outline
  const toolkit = (l) => {
    const nq = api.nQ?.(l.id) || 0, nc = api.nCards?.(l.id) || 0;
    return `<div class="cx-here"><a href="#co-check" data-jump="co-check" ${nq ? "" : "hidden"}>${ic("target")}Questions${nq ? ` · ${nq}` : ""}</a><button type="button" data-cards ${nc ? "" : "hidden"}>${ic("cards")}Flashcards${nc ? ` · ${nc}` : ""}</button><a href="#/quiz/${l.unit.id}">${ic("trophy")}${esc(U)} quiz</a></div>`;
  };
  const unitBody = (u, cur) => moduleGroups(u, api.byId).map((g, mi) => {
    const r = api.roll(g.lessons.map((l) => l.id));
    return `<div class="cx-mod">${g.title ? `<p class="cx-mt"><span class="cx-n">${u.n}.${mi + 1}</span><span class="cx-mtt">${esc(g.title)}</span><small>${r.done}/${r.total}</small></p>` : ""}<ol>${g.lessons.map((l) => lessonRow(l, cur)).join("")}</ol></div>`;
  }).join("") + `<a class="cx-qz" href="#/quiz/${u.id}">${ic("trophy")}<span>${esc(U)} ${u.n} quiz</span>${api.quiz(u.id) ? `<small>best ${pct(api.quiz(u.id).best)}</small>` : ""}</a>`;
  const unitRow = (u, cur, open) => {
    const r = api.roll(u.lessons.map((l) => l.id));
    return `<details class="cx-unit s-${r.status}" data-u="${u.id}" ${open ? "open" : ""}><summary><span class="cx-un">${u.n}</span><span class="cx-ut">${esc(u.title)}</span><span class="cx-up" title="${r.done} of ${r.total} lessons done"><i style="--p:${r.coverage}"></i>${pct(r.coverage)}</span></summary>${open ? `<div class="cx-ub">${unitBody(u, cur)}</div>` : ""}</details>`;
  };
  const bodyHtml = () => {
    const cur = api.current(), open = new Set(api.openUnits()); if (cur) open.add(cur.unit.id);
    return api.groups().map((g) => `${g.name ? `<p class="cx-tg">${esc(g.name)}</p>` : ""}${g.list.map((u) => unitRow(u, cur, open.has(u.id))).join("")}`).join("");
  };
  const headHtml = () => {
    const all = api.roll(api.units.flatMap((u) => u.lessons.map((l) => l.id)));
    return `<a href="#/learn" class="cx-treeback">${ring(all.coverage, 40, 5)}<span><span class="co-kicker">Course outline</span><b>${esc(api.name)}</b><small>${pct(all.coverage)} complete${all.counts.mastered ? ` · ${all.counts.mastered} mastered` : ""}</small></span></a><button type="button" class="cx-treex" data-tree-close aria-label="Close the outline">×</button>`;
  };
  function filterHtml(raw) {
    const t = api.norm(raw), cur = api.current();
    const hits = api.units.map((u) => ({ u, ls: u.lessons.map((l) => api.byId[l.id]).filter((l) => api.norm(`${l.title} ${l.module || ""}`).includes(t)) })).filter((x) => x.ls.length || api.norm(x.u.title).includes(t));
    if (!hits.length) return `<p class="cx-none">No lessons match “${esc(raw)}”.</p>`;
    return hits.slice(0, 30).map(({ u, ls }) => `<div class="cx-fu"><p class="cx-tg">${esc(U)} ${u.n} · ${esc(u.title)}</p><ol>${(ls.length ? ls : u.lessons.map((l) => api.byId[l.id])).slice(0, 25).map((l) => lessonRow(l, cur)).join("")}</ol></div>`).join("");
  }
  /** draw the outline into el (wired once); returns redraw(), which keeps the filter and scroll position */
  function mount(el) {
    if (!el.dataset.wired) {
      el.dataset.wired = "1";
      el.innerHTML = `<div class="cx-treehead"></div><label class="cx-tf">${ic("search")}<input type="search" placeholder="Filter lessons" aria-label="Filter the outline"></label><div class="cx-tb"></div>`;
      const input = el.querySelector(".cx-tf input");
      el.addEventListener("toggle", (e) => {
        const d = e.target.closest?.(".cx-unit"); if (!d || input.value.trim().length >= 2) return;
        api.setOpen(d.dataset.u, d.open);
        if (d.open && !d.querySelector(".cx-ub")) d.insertAdjacentHTML("beforeend", `<div class="cx-ub">${unitBody(api.units.find((u) => u.id === d.dataset.u), api.current())}</div>`);
      }, true);
      // where the list is scrolled, kept as it scrolls: reading it back when redrawing would make the browser lay out
      // the page there and then
      const tb = el.querySelector(".cx-tb"); el.__top = 0; tb.addEventListener("scroll", () => { el.__top = tb.scrollTop; }, { passive: true });
      input.addEventListener("input", () => redraw(el));
      input.addEventListener("keydown", (e) => { if (e.key === "Escape" && input.value) { e.stopPropagation(); input.value = ""; redraw(el); } });
    }
    redraw(el, true);
    return (keep = true) => redraw(el, !keep);
  }
  function redraw(el, toHere = false) {
    const body = el.querySelector(".cx-tb"), v = el.querySelector(".cx-tf input").value.trim();
    // only what changed is replaced (opening a lesson asks for the outline more than once; the same outline again is
    // left alone, so the browser doesn't restyle it)
    const head = headHtml(), list = v.length >= 2 ? filterHtml(v) : bodyHtml();
    if (head !== el.__head) { el.querySelector(".cx-treehead").innerHTML = head; el.__head = head; }
    // asked to show the current lesson, it must be there to see: not inside a unit the learner has since closed (a
    // filter that leaves it out is left alone: rebuilding wouldn't show it, and would take focus off a result)
    const shown = () => { const h = body.querySelector(".cx-l.here"); return h && !h.closest("details:not([open])"); };
    if (list !== el.__list || (toHere && shown() === false)) { body.innerHTML = list; el.__list = list; if (!toHere && el.__top) body.scrollTop = el.__top; }
    if (!toHere || el.__toHere) return;
    // the current lesson in view, without moving the page: once a frame, however many times it was asked for
    el.__toHere = requestAnimationFrame(() => { el.__toHere = 0; const here = body.querySelector(".cx-l.here"); if (!here) return; const b = body.getBoundingClientRect(), h = here.getBoundingClientRect(); if (h.top < b.top || h.bottom > b.bottom - 40) body.scrollTop += h.top - b.top - b.height / 3; });
  }
  return { mount, unitBody };
}

// ---------- the command palette ----------
// the shared palette (kit/ui/palette.js), given this course's sources: the same component the hub and subject sites use
export function createPalette(api) {
  const KINDS = [["all", "All"], ["lesson", "Lessons"], ["topic", "Units & modules"], ["note", "In the notes"], ["lab", api.labLabel || "Labs"], ["action", "Actions"]].filter(([k]) => k !== "lab" || api.hasLabs);
  return createCommandPalette({
    name: api.name, placeholder: "Search lessons, topics and key terms…", kinds: KINDS,
    groups: [["Lessons", "lesson", 8], ["Units and modules", "topic", 6], ["In the notes", "note", 6], [api.labLabel || "Labs", "lab", 6], ["Actions", "action", 6]],
    icons: { lesson: "play", topic: "flag", note: "sparkles", lab: "cube", action: "bolt", recent: "clock", mark: "star", next: "play" },
    lead: (h) => (h.st ? dot(h.st) : ""),
    search: api.search,
    searchMore: (raw, filter) => (filter === "all" || filter === "note" ? api.searchNotes(raw) : null),
    suggestions: api.suggestions,
  });
}
