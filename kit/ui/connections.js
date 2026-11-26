// Connections beside any resource: what the learner linked it to (from either end, so a link made on a flashcard
// set shows on the lesson too), what it was made from, the collections it's in, the learner's note on it, and what
// Gradify suggests goes with it, each with why. A small map shows it in the middle of its neighbours. "Link
// something" searches every course, lesson and topic, and the learner's own pins, history and collections.
//
//   mountConnections(el, res, { extra: [resources], app: "/app.html" })    // res: kit/core/resource.js resource()
import { esc, ensureStyles } from "./store.js";
import { uiIcon } from "./icons.js";
import { linksOf, link, unlink, collectionsOf, collections, noteOf, suggest, onConnections, words } from "../data/links.js";
import { resource, rid as makeRid, resourceFromPlace } from "../core/resource.js";
import { pins, recent } from "./places.js";
import { history } from "./history.js";
import { loadIndex } from "./global-nav.js";

const KIND_ICON = (k) => ({ lesson: "book", course: "book", unit: "flag", pack: "cards", card: "cards", note: "notes", quiz: "trophy", test: "bolt", spec: "target", collection: "inbox", map: "grid", block: "clock", goal: "flag" })[k] || "link";

/** everything a link or a suggestion could point at: every lesson, topic and course, and the learner's own places */
export async function candidates(extra = []) {
  const idx = await loadIndex().catch(() => ({ courses: [] }));
  const out = [...extra];
  for (const c of idx.courses || []) {
    out.push(resource(makeRid("course", c.u), { title: c.n, subject: c.n, sub: `${c.site} · course`, href: c.u }));
    for (const [uid, n, title, lessons] of c.units || []) {
      out.push(resource(makeRid("unit", c.u, uid), { title, subject: c.n, sub: `${c.n} · ${c.U || "Unit"} ${n}`, href: `${c.u}#/learn/${uid}` }));
      for (const [lid, lt] of lessons) out.push(resource(makeRid("lesson", c.u, lid), { title: lt, subject: c.n, sub: `${c.n} · ${c.U || "Unit"} ${n}: ${title}`, href: `${c.u}#/lesson/${lid}` }));
    }
  }
  const mine = [...pins(), ...recent(), ...history().filter((h) => h.act !== "viewed" || h.kind === "deck" || h.kind === "notes")];
  for (const p of mine) { const r = resourceFromPlace(p); if (r && r.kind !== "screen" && r.kind !== "page") out.push(r); }
  return out.filter(Boolean);
}

const row = (r, right = "", why = "") => `<li class="gx-cn-i"><a href="${esc(r.href || "#")}"><span class="gx-cn-ic" aria-hidden="true">${uiIcon(KIND_ICON(r.kind))}</span><span class="gx-cn-t"><b>${esc(r.title)}</b><small>${esc([r.label || r.kind, why || r.sub].filter(Boolean).join(" · "))}</small></span></a>${right}</li>`;

/** a small map: this resource in the middle, its links and the best suggestions around it (dashed). Pure. */
export function graphSvg(center, linked = [], suggested = [], { size = 260 } = {}) {
  const nodes = [...linked.slice(0, 8).map((r) => ({ r, s: false })), ...suggested.slice(0, Math.max(0, 10 - Math.min(8, linked.length))).map((r) => ({ r, s: true }))];
  if (!nodes.length) return "";
  const c = size / 2, R = size / 2 - 34;
  const at = (i) => { const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2; return [c + R * Math.cos(a), c + R * Math.sin(a)]; };
  const short = (t) => (t.length > 18 ? `${t.slice(0, 17)}…` : t);
  return `<svg class="gx-cn-map" viewBox="0 0 ${size} ${size}" role="img" aria-label="${esc(`${center.title}: ${linked.length} linked, ${suggested.length} suggested`)}">
    ${nodes.map((n, i) => { const [x, y] = at(i); return `<line x1="${c}" y1="${c}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" class="${n.s ? "sug" : ""}"/>`; }).join("")}
    ${nodes.map((n, i) => { const [x, y] = at(i); return `<a href="${esc(n.r.href || "#")}"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6" class="k-${esc(n.r.kind)}${n.s ? " sug" : ""}"/><text x="${x.toFixed(1)}" y="${(y + (y < c ? -11 : 18)).toFixed(1)}" text-anchor="middle">${esc(short(n.r.title))}</text></a>`; }).join("")}
    <circle cx="${c}" cy="${c}" r="11" class="mid"/><text x="${c}" y="${c + 28}" text-anchor="middle" class="mid">${esc(short(center.title))}</text></svg>`;
}

export function mountConnections(el, res, { extra = [], app = "/app.html" } = {}) {
  if (!el || !res) return null;
  ensureStyles();
  el.classList.add("gx-cn");
  let pool = null, query = "";
  const load = () => (pool ||= candidates(extra));
  async function draw() {
    const ls = linksOf(res.rid), linkedIds = ls.map((l) => l.other.rid);
    const cols = collectionsOf(res.rid), names = new Map(collections().map((c) => [c.id, c.name])), note = noteOf(res.rid);
    const sug = suggest(res, await load(), { exclude: linkedIds, limit: 6 });
    // redrawing replaces what had focus (a Link button just pressed): it goes back into the panel, not to the page,
    // so the keyboard, Escape and a screen reader stay where they were
    const had = el.contains(document.activeElement) || document.activeElement === document.body;
    el.innerHTML = `<div class="gx-cn-head"><h3>Connections</h3><button type="button" class="gx-link" data-cn-add aria-expanded="${query !== null && el.dataset.adding === "1"}">${uiIcon("link")}Link something</button></div>
      <div class="gx-cn-pick" ${el.dataset.adding === "1" ? "" : "hidden"}><label class="gx-cn-q">${uiIcon("search")}<input type="search" placeholder="A lesson, topic, course or something of yours" aria-label="Find something to link" value="${esc(query || "")}"></label><ul class="gx-cn-l gx-cn-res"></ul></div>
      ${ls.length ? `<p class="gx-cn-k">Linked</p><ul class="gx-cn-l">${ls.map((l) => row(l.other, `<button type="button" class="gx-cn-x" data-unlink="${esc(l.other.rid)}" aria-label="Unlink ${esc(l.other.title)}" title="Unlink">${uiIcon("close")}</button>`, l.dir === "made-from" ? "made from this" : l.dir === "made-into" ? "this was made from it" : "")).join("")}</ul>` : `<p class="gx-cn-none">Nothing linked yet. Link the notes, flashcards, questions and lessons that go with this, and they'll show here, and here from there.</p>`}
      ${cols.length ? `<p class="gx-cn-k">In your collections</p><p class="gx-cn-cols">${cols.map((id) => `<a href="${esc(app)}#/collections/${esc(id)}">${uiIcon("inbox")}${esc(names.get(id) || "Collection")}</a>`).join("")}</p>` : ""}
      ${note ? `<p class="gx-cn-k">Your note</p><p class="gx-cn-note">${esc(note)}</p>` : ""}
      ${sug.length ? `<p class="gx-cn-k">Suggested</p><ul class="gx-cn-l">${sug.map((s) => row(s, `<button type="button" class="gx-cn-ln" data-link="${esc(s.rid)}">Link</button>`, s.why)).join("")}</ul>` : ""}
      ${graphSvg(res, ls.map((l) => l.other), sug)}`;
    if (el.dataset.adding === "1") { paintPick(); el.querySelector(".gx-cn-q input")?.focus(); }
    else if (had && el.isConnected && el.closest(".gx-layer, .gx-cn")) el.querySelector("[data-cn-add]")?.focus({ preventScroll: true });
  }
  async function paintPick() {
    const out = el.querySelector(".gx-cn-res"); if (!out) return;
    const w = words(query); if (!w.length) { out.innerHTML = `<li class="gx-cn-none">Type to search.</li>`; return; }
    const all = await load(), linked = new Set(linksOf(res.rid).map((l) => l.other.rid));
    const hits = all.filter((r) => r.rid !== res.rid && !linked.has(r.rid) && w.every((x) => words(`${r.title} ${r.sub || ""}`).some((y) => y.startsWith(x)))).slice(0, 8);
    out.innerHTML = hits.length ? hits.map((r) => row(r, `<button type="button" class="gx-cn-ln" data-link="${esc(r.rid)}">Link</button>`)).join("") : `<li class="gx-cn-none">Nothing matches “${esc(query)}”.</li>`;
  }
  el.addEventListener("click", async (e) => {
    if (e.target.closest("[data-cn-add]")) { el.dataset.adding = el.dataset.adding === "1" ? "" : "1"; draw(); return; }
    const u = e.target.closest("[data-unlink]"); if (u) { unlink(res.rid, u.dataset.unlink); return; }
    const l = e.target.closest("[data-link]");
    if (l) { const r = (await load()).find((x) => x.rid === l.dataset.link); if (r) { el.dataset.adding = ""; query = ""; link(res, r); } }
  });
  el.addEventListener("input", (e) => { if (e.target.closest(".gx-cn-q")) { query = e.target.value; paintPick(); } });
  const off = onConnections(draw);
  draw();
  return { redraw: draw, stop: off };
}
