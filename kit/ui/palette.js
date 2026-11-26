// The command palette: / or ⌘K (Ctrl+K) anywhere opens one search box over everything a page knows about.
// Each Gradify page gives it its own sources: a course searches its lessons, topics and notes
// (kit/course/navigator.js); the hub and the subject sites search every course, lesson and tool (kit/ui/global-nav.js).
//
//   const pal = createCommandPalette({
//     name: "Chemistry", placeholder: "Search lessons, topics and key terms…",
//     kinds: [["all", "All"], ["lesson", "Lessons"], …],               // filter chips (Tab cycles them)
//     groups: [["Lessons", "lesson", 8], …],                           // how results are grouped, and how many each
//     search(raw) → hits,  searchMore?(raw) → Promise<hits>,           // fast results, then slower ones (notes, index)
//     suggestions() → [{ title, items: hits }],                       // shown before typing: continue, recent, pinned, actions
//     icons: { lesson: "play", … }, lead?(hit) → html,                // what sits at the start of a row
//     seeAll?(raw) → { t, k, href } | [them],                         // "See all results" rows (Shift+Enter: the first)
//   });
// Searches the learner chooses a result from are remembered on this device (kit/search/memory.js) and offered again
// under "Recent searches" before anything is typed.
//
// A hit: { type, t (title), k (context line), href | run(), html? (highlighted title) }.
import { esc, ensureStyles, isMac, readJson } from "./store.js";
import { uiIcon } from "./icons.js";
import { shortcuts } from "./keys.js";
// past searches are kept by kit/search/memory.js ("gradify.search"); read here directly and written through it when a
// result is chosen, so pages with quick search don't load the search engine to show them
const searchHistory = () => readJson("gradify.search", {})?.history || [];
const remember = (q) => import("../search/memory.js").then((m) => m.remember(q)).catch(() => {});

let seqId = 0;
export function createCommandPalette(o) {
  const icons = { recent: "clock", mark: "bookmarked", pin: "pinned", next: "play", action: "bolt", history: "clock", all: "search", ...(o.icons || {}) };
  const kinds = o.kinds || [["all", "All"]];
  const id = `gx-pal${++seqId}`;
  let box = null, list = null, input = null, sel = 0, hits = [], filter = "all", seq = 0;
  const row = (h, i) => `<a role="option" id="${id}-o${i}" href="${esc(h.href || "#")}" class="gx-o${i === sel ? " on" : ""}" data-i="${i}" aria-selected="${i === sel}">${o.lead?.(h) || `<span class="gx-oi">${uiIcon(icons[h.type] || "search")}</span>`}<span class="gx-ot"><b>${h.html || esc(h.t)}</b>${h.k ? `<small>${esc(h.k)}</small>` : ""}</span>${h.badge ? `<em>${esc(h.badge)}</em>` : ""}<span class="gx-ogo" aria-hidden="true">↵</span></a>`;
  function paint(groups) {
    hits = groups.flatMap((g) => g.items);
    sel = Math.min(sel, Math.max(0, hits.length - 1));
    let i = 0;
    const raw = input.value.trim();
    list.innerHTML = hits.length
      ? groups.filter((g) => g.items.length).map((g) => `<div class="gx-og" role="group" aria-label="${esc(g.title)}"><p>${esc(g.title)}</p>${g.items.map((h) => row(h, i++)).join("")}</div>`).join("")
      : `<p class="gx-none">${raw.length < 2 ? "Type to search." : `Nothing matches “${esc(raw)}”. Try a key term, or fewer words.`}</p>`;
    input.setAttribute("aria-activedescendant", hits.length ? `${id}-o${sel}` : "");
  }
  const grouped = (xs) => (o.groups || [["Results", null, 30]]).map(([title, type, n = 8]) => ({ title, items: xs.filter((h) => !type || h.type === type).slice(0, n) }));
  // "See all results": the full Search screen, with this query
  const allRows = (raw) => { const x = o.seeAll?.(raw); return (Array.isArray(x) ? x : x ? [x] : []).map((h) => ({ type: "all", ...h })); };
  const withAll = (groups, raw) => { const rows = allRows(raw); return rows.length ? [...groups, { title: "Search", items: rows }] : groups; };
  function run() {
    const raw = input.value.trim(), my = ++seq;
    if (raw.length < 2) {
      const past = o.history === false ? [] : searchHistory().slice(0, 4).map((x) => ({ type: "history", t: x.q, k: "Recent search", fill: x.q }));
      paint([...(past.length ? [{ title: "Recent searches", items: past }] : []), ...(o.suggestions?.() || [])]);
      return;
    }
    const want = (h) => filter === "all" || h.type === filter;
    const quick = (o.search?.(raw) || []).filter(want);
    paint(withAll(grouped(quick), raw));
    o.searchMore?.(raw, filter)?.then((more) => { if (my === seq && box) paint(withAll(grouped([...quick, ...more.filter(want)]), raw)); }).catch(() => {});
  }
  function move(d) {
    if (!hits.length) return;
    sel = (sel + d + hits.length) % hits.length;
    list.querySelectorAll(".gx-o").forEach((a) => { const on = Number(a.dataset.i) === sel; a.classList.toggle("on", on); a.setAttribute("aria-selected", on); if (on) a.scrollIntoView({ block: "nearest" }); });
    input.setAttribute("aria-activedescendant", `${id}-o${sel}`);
  }
  function choose(i, e) {
    const h = hits[i]; if (!h) return;
    if (h.fill) { input.value = h.fill; sel = 0; run(); input.focus(); return; }   // a recent search: run it again here
    const raw = input.value.trim(); if (raw.length > 1) remember(raw);
    if (e && (e.metaKey || e.ctrlKey) && h.href) { globalThis.open(h.href, "_blank", "noopener"); return; }   // ⌘/Ctrl-click: a new tab
    close();
    if (h.run) h.run(); else if (h.href) { if (h.href.startsWith("#")) location.hash = h.href.slice(1); else location.href = h.href; }
  }
  function setFilter(k) { filter = k; box.querySelectorAll("[data-k]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.k === k)); sel = 0; run(); }
  function openPal(q = "") {
    if (box) { input.focus(); return; }
    ensureStyles();
    o.onOpen?.();
    box = document.createElement("div"); box.className = "gx-pal cx-pal";
    box.innerHTML = `<div class="gx-palbox" role="dialog" aria-modal="true" aria-label="Search ${esc(o.name || "Gradify")}">
      <label class="gx-palin">${uiIcon("search")}<input type="text" role="combobox" aria-expanded="true" aria-controls="${id}-list" aria-autocomplete="list" autocomplete="off" spellcheck="false" placeholder="${esc(o.placeholder || "Search…")}"><kbd>Esc</kbd></label>
      ${kinds.length > 1 ? `<div class="gx-palf" role="group" aria-label="Show">${kinds.map(([k, t]) => `<button type="button" data-k="${k}" aria-pressed="${k === filter}">${esc(t)}</button>`).join("")}</div>` : ""}
      <div class="gx-pall" id="${id}-list" role="listbox"></div>
      <p class="gx-palfoot"><span><kbd>↑</kbd><kbd>↓</kbd> move</span><span><kbd>↵</kbd> open</span>${o.seeAll ? "<span><kbd>⇧</kbd><kbd>↵</kbd> see all results</span>" : ""}${kinds.length > 1 ? "<span><kbd>Tab</kbd> filter</span>" : ""}<span><kbd>/</kbd> or <kbd>${isMac() ? "⌘" : "Ctrl"}</kbd><kbd>K</kbd> from anywhere</span><span><kbd>?</kbd> all shortcuts</span></p></div>`;
    o.back = document.activeElement;
    document.body.append(box); document.documentElement.classList.add("gx-lock");
    list = box.querySelector(".gx-pall"); input = box.querySelector("input"); sel = 0;
    input.value = q; input.focus(); run();
    input.addEventListener("input", () => { sel = 0; run(); });
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); move(1); } else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
      else if (e.key === "Enter" && e.shiftKey && allRows(input.value.trim()).length && input.value.trim().length > 1) { e.preventDefault(); const i = hits.findIndex((h) => h.type === "all"); if (i >= 0) choose(i, {}); }
      else if (e.key === "Enter") { e.preventDefault(); choose(sel, e); } else if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); close(); }
      else if (e.key === "Tab" && kinds.length > 1) { e.preventDefault(); const i = kinds.findIndex(([k]) => k === filter); setFilter(kinds[(i + (e.shiftKey ? -1 : 1) + kinds.length) % kinds.length][0]); }
    });
    box.querySelectorAll("[data-k]").forEach((b) => b.addEventListener("click", () => { setFilter(b.dataset.k); input.focus(); }));
    list.addEventListener("click", (e) => { const a = e.target.closest(".gx-o"); if (!a) return; e.preventDefault(); choose(Number(a.dataset.i), e); });
    list.addEventListener("mousemove", (e) => { const a = e.target.closest(".gx-o"); if (a && Number(a.dataset.i) !== sel) { sel = Number(a.dataset.i); move(0); } });
    box.addEventListener("click", (e) => { if (e.target === box) close(); });
  }
  function close() { if (!box) return; box.remove(); box = null; document.documentElement.classList.remove("gx-lock"); o.back?.focus?.({ preventScroll: true }); }
  if (o.hotkeys !== false) shortcuts([
    { keys: "mod+k", label: "Search", group: "General", anywhere: true, run: () => (box ? close() : openPal()) },
    { keys: "/", label: "Search", group: "General", show: false, run: () => openPal() },
  ]);
  return { open: openPal, close, get isOpen() { return Boolean(box); } };
}

/** highlight the words of a query in a title (escaped), for hit.html */
export function mark(title, raw) {
  const words = String(raw).toLowerCase().split(/\s+/).filter((w) => w.length > 1).map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const t = esc(title);
  return words.length ? t.replace(new RegExp(`(${words.join("|")})`, "gi"), "<mark>$1</mark>") : t;
}
