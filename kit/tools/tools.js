// Tools: apps inside Gradify's app (app.html, #/tools), for making study material of your own.
//   #/tools                 the four tools, and what you've made
//   #/tools/search          the lesson search engine: find any lesson on Gradify, pick facts from it
//   #/tools/map/<id|new>    the mind map creator: build a map from facts you toggle on, then edit it freely
//   #/tools/cards/<id|new>  the flashcard creator (RemNote-style syntax, cloze, images, spaced repetition)
//   #/tools/convert         notes in any format into a mind map, flashcards, a chant with a voice, or a cheatsheet
// On Free each tool can be used 5 times (kit/data/limits.js), once Plus is on sale.
import { searchLessons, loadLesson, factsOf, loadIndex } from "./search.js";
import { decks, maps } from "./store.js";
import { gate, lockedHtml, toolUsage, limited, TOOLS } from "../data/limits.js";
import { split } from "../maps/build.js";

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
export { esc };
const here = new URL(".", import.meta.url);
let cssDone = false;
export function toolsCss() {
  if (cssDone) return; cssDone = true;
  const l = document.createElement("link"); l.rel = "stylesheet"; l.href = new URL("tools.css", here).href; document.head.append(l);
}
/** The hash after #/tools/, split: "cards/abc/review" → ["cards", "abc", "review"] */
export const parts = () => location.hash.replace(/^#\/?tools\/?/, "").split(/[/?]/).filter(Boolean);
export const factKey = (hit, f) => `${hit.c.slug}/${hit.lesson}/${f.id}`;
const fmt = (n, one, many) => `${n} ${n === 1 ? one : many}`;

const TOOL_LIST = [
  { id: "search", href: "#/tools/search", name: "Lesson search", g3d: "search find library explore", line: "Find any lesson on Gradify, in every subject, by its title, key terms or headings. Pick the facts you want." },
  { id: "map", href: "#/tools/map/new", name: "Mind map creator", g3d: "map network branch idea", line: "Build your own mind map: toggle facts on from any lesson, then move, rename and add ideas of your own." },
  { id: "cards", href: "#/tools/cards/new", name: "Flashcard creator", g3d: "cards layers notebook memory", line: "Type cards with >>, :: and {{cloze}}, add images, and review them with spaced repetition, as cards or inline." },
  { id: "convert", href: "#/tools/convert", name: "Notes converter", g3d: "sparkles magic transform music", line: "Paste notes in any format and get a mind map, flashcards, a chant to say along to, or a cheatsheet." },
];

/**
 * Draw the Tools screen for the current hash.
 * @param {HTMLElement} view @param {{ store, toast, site, pricing }} ctx
 */
export async function renderTools(view, ctx) {
  toolsCss();
  const [tool, ...rest] = parts();
  if (!tool) return hub(view, ctx);
  if (tool === "search") return searchPage(view, ctx);
  if (tool === "map") return (await import("./mapmaker.js")).renderMapMaker(view, ctx, rest);
  if (tool === "cards") return (await import("./cardmaker.js")).renderCardMaker(view, ctx, rest);
  if (tool === "convert") return (await import("./converter.js")).renderConverter(view, ctx, rest);
  return hub(view, ctx);
}

// a gate for making something new with a tool (opening what you've made never counts)
export async function useTool(tool, key, ctx, view) {
  const ok = await gate("tool", key, { tool, store: ctx.store, pricing: ctx.pricing });
  if (!ok && view) view.innerHTML = `${backLink()}${lockedHtml("tool", { pricing: ctx.pricing, tool: TOOLS[tool] })}`;
  return ok;
}
export const backLink = (to = "#/tools", label = "Tools") => `<a class="back tl-back" href="${to}">← ${label}</a>`;

async function hub(view, ctx) {
  const lim = await limited(ctx.store);
  const ds = decks(), ms = maps();
  view.innerHTML = `<div class="tl">
    <div class="deck-head"><div><span class="kicker lo-kicker">Tools</span><h1>Tools</h1><p class="sub">Make study material of your own, from Gradify's lessons or your own notes. Everything you make stays in this browser.</p></div></div>
    <div class="tl-grid">${TOOL_LIST.map((t) => {
      const u = lim ? toolUsage(t.id) : null;
      return `<a class="tl-tile panel glass" href="${t.href}"><span class="tl-ico" data-g3d="${esc(t.g3d)}" data-g3d-size="64" data-g3d-unique></span><b>${esc(t.name)}</b><span class="sub">${esc(t.line)}</span>${u ? `<span class="tl-left">${u.left ? `${fmt(u.left, "use", "uses")} left on Free` : "Free uses used: Plus for more"}</span>` : ""}<span class="go" aria-hidden="true">→</span></a>`;
    }).join("")}</div>
    ${ms.length || ds.length ? `<h2 class="lo-h">What you've made</h2><div class="tl-made">
      ${ms.map((m) => `<a class="tl-item panel glass" href="#/tools/map/${esc(m.id)}"><span class="tl-k">Mind map</span><b>${esc(m.title || "Untitled map")}</b><span class="sub">${fmt(countNodes(m.data?.nodeData) - 1, "idea", "ideas")}</span></a>`).join("")}
      ${ds.map((d) => `<a class="tl-item panel glass" href="#/tools/cards/${esc(d.id)}"><span class="tl-k">Flashcards</span><b>${esc(d.title || "Untitled deck")}</b><span class="sub">${esc(d.summary || "")}</span></a>`).join("")}
    </div>` : ""}
  </div>`;
}
const countNodes = (n) => (n ? 1 + (n.children || []).reduce((a, c) => a + countNodes(c), 0) : 0);

// ---------- the lesson picker: search, open a lesson, toggle its facts ----------
/**
 * Mount a lesson search with fact toggles in `el`.
 * @param {{ isOn(key): boolean, onToggle(hit, group, fact, on): void, onAll?(hit, groups): void, actions?(hit): string, onOpen?(hit): Promise<boolean> }} o
 */
export function lessonPicker(el, o) {
  el.innerHTML = `<form class="tl-search" role="search"><input type="search" placeholder="Search every lesson: mitosis, contract offer, Tudors…" aria-label="Search lessons" autocomplete="off"><select aria-label="Subject"><option value="">Every subject</option></select></form>
    <p class="tl-hint sub">Search by a lesson's title, key terms or headings.</p><ol class="tl-results" aria-live="polite"></ol>`;
  const input = el.querySelector("input"), sel = el.querySelector("select"), list = el.querySelector(".tl-results"), hint = el.querySelector(".tl-hint");
  loadIndex().then((ix) => { sel.innerHTML += ix.courses.map((c) => `<option value="${esc(c.slug)}">${esc(c.name)}</option>`).join(""); hint.textContent = `${ix.lessons.length.toLocaleString("en-GB")} lessons in ${ix.courses.length} subjects. Search by title, key terms or headings.`; }).catch((e) => { hint.textContent = e.message; });
  let timer = 0, hits = [];
  const run = async () => {
    const q = input.value.trim();
    if (q.length < 2) { list.innerHTML = ""; return; }
    hits = await searchLessons(q, { course: sel.value || null, limit: 25 });
    list.innerHTML = hits.length ? hits.map((h, i) => `<li class="tl-hit" data-i="${i}"><button type="button" class="tl-open" aria-expanded="false"><span class="tl-c" style="--c:${esc(h.c.accent || "#8b3dff")}">${esc(h.c.name)}</span><b>${esc(h.title)}</b><span class="sub">${esc([h.module, h.unitTitle].filter(Boolean).join(" · "))}</span>${h.terms.length ? `<span class="tl-terms">${h.terms.slice(0, 4).map(esc).join(" · ")}</span>` : ""}</button><div class="tl-facts" hidden></div></li>`).join("")
      : `<li class="sub tl-none">No lesson matches "${esc(q)}". Try fewer or different words.</li>`;
  };
  input.addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(run, 160); });
  sel.addEventListener("change", run);
  el.querySelector("form").addEventListener("submit", (e) => { e.preventDefault(); run(); });
  list.addEventListener("click", async (e) => {
    const li = e.target.closest(".tl-hit"); if (!li) return;
    const h = hits[+li.dataset.i], box = li.querySelector(".tl-facts");
    if (e.target.closest(".tl-open")) {
      const open = box.hidden;
      li.querySelector(".tl-open").setAttribute("aria-expanded", String(open));
      if (!open) { box.hidden = true; return; }
      if (o.onOpen && !(await o.onOpen(h))) return;
      box.hidden = false; box.innerHTML = '<p class="sub">Loading the lesson…</p>';
      try {
        const L = await loadLesson(h); if (!L) throw new Error("This lesson's notes aren't written yet.");
        h.groups = factsOf(L).map((g) => ({ ...g, facts: g.facts.map((f) => ({ ...f, short: split(f.title).topic })) }));
        paintFacts(box, h);
      } catch (err) { box.innerHTML = `<p class="sub">${esc(err.message)}</p>`; }
      return;
    }
    const t = e.target.closest("input[data-f]");
    if (t) { const [gi, fi] = t.dataset.f.split(":").map(Number); o.onToggle(h, h.groups[gi], h.groups[gi].facts[fi], t.checked); return; }
    const all = e.target.closest("[data-all]");
    if (all) { const g = h.groups[+all.dataset.all]; g.facts.forEach((f) => { if (!o.isOn(factKey(h, f))) o.onToggle(h, g, f, true); }); paintFacts(box, h); }
  });
  const paintFacts = (box, h) => {
    box.innerHTML = `${o.actions ? `<div class="tl-acts">${o.actions(h)}</div>` : ""}${h.groups.map((g, gi) => `<fieldset><legend>${esc(g.section)} <button type="button" class="tl-mini" data-all="${gi}">Add all</button></legend>${g.facts.map((f, fi) => `<label class="tl-fact"><input type="checkbox" class="tl-switch" data-f="${gi}:${fi}" ${o.isOn(factKey(h, f)) ? "checked" : ""}><span><span class="tl-kind">${esc(KINDS[f.kind] || "")}</span>${esc(f.text)}</span></label>`).join("")}</fieldset>`).join("")}`;
  };
  return { refresh: () => list.querySelectorAll(".tl-hit").forEach((li) => { const box = li.querySelector(".tl-facts"); if (!box.hidden && hits[+li.dataset.i].groups) paintFacts(box, hits[+li.dataset.i]); }), focus: () => input.focus() };
}
const KINDS = { term: "Term", formula: "Formula", example: "Example", mistake: "Mistake", key: "Key", safety: "Safety", point: "" };

// ---------- the search page ----------
// picked facts travel to the map or card creator through sessionStorage
export const PICK = "gradify.tools.pick";
async function searchPage(view, ctx) {
  view.innerHTML = `<div class="tl">${backLink()}<div class="deck-head"><div><span class="kicker lo-kicker">Tools</span><h1>Lesson search</h1><p class="sub">Every lesson on Gradify in one search. Open a lesson to see its facts, pick the ones you want, and send them to a mind map or flashcards.</p></div></div>
    <div class="tl-picked panel glass" hidden><b class="tl-pn"></b><a class="btn btn-primary lg btn-sm" data-send="map" href="#/tools/map/new"><span>Make a mind map</span></a><a class="btn btn-light lg btn-sm" data-send="cards" href="#/tools/cards/new"><span>Make flashcards</span></a><button type="button" class="btn btn-ghost lg btn-sm" data-clear><span>Clear</span></button></div>
    <div class="tl-pick"></div></div>`;
  const picked = new Map();
  const bar = view.querySelector(".tl-picked");
  const paint = () => { bar.hidden = !picked.size; bar.querySelector(".tl-pn").textContent = `${fmt(picked.size, "fact", "facts")} picked`; };
  const picker = lessonPicker(view.querySelector(".tl-pick"), {
    isOn: (k) => picked.has(k),
    onToggle: (h, g, f, on) => { const k = factKey(h, f); if (on) picked.set(k, { ...f, lesson: h.title, course: h.c.name, slug: h.c.slug, lessonId: h.lesson, section: g.section }); else picked.delete(k); paint(); },
    // each lesson opened from a search counts as a use of the tool on Free
    onOpen: (h) => gate("tool", `${h.c.slug}/${h.lesson}`, { tool: "search", store: ctx.store, pricing: ctx.pricing }),
    actions: (h) => (h.c.page ? `<a class="tl-mini" href="${esc(h.c.page)}#/lesson/${esc(h.lesson)}">Open the lesson →</a>` : ""),
  });
  view.querySelectorAll("[data-send]").forEach((a) => a.addEventListener("click", () => { try { sessionStorage.setItem(PICK, JSON.stringify([...picked.values()])); } catch { /* fine */ } }));
  view.querySelector("[data-clear]").addEventListener("click", () => { picked.clear(); paint(); picker.refresh(); });
  picker.focus();
}
/** Facts picked on the search page, once. */
export function takePicked() { try { const v = JSON.parse(sessionStorage.getItem(PICK) || "[]"); sessionStorage.removeItem(PICK); return v; } catch { return []; } }
