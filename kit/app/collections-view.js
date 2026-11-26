// Collections (#/collections, #/collections/<id>): the learner's own groups of resources from any tool (lessons,
// topics, flashcard sets, notes, quizzes, specification points), made from any resource's "•••" menu
// (kit/ui/resource-actions.js). One thing can be in several collections; nothing is copied, each item opens the real
// thing. Kept in the learner's record (kit/data/links.js), so collections are the same on every device.
import { icon } from "../core/icons.js";
import { esc } from "../core/text.js";
import { uiIcon } from "../ui/icons.js";
import { collections, itemsOf, createCollection, renameCollection, deleteCollection, removeFromCollection, addToCollection, noteOf } from "../data/links.js";
import { KINDS } from "../core/resource.js";

const local = (h) => (h && h.startsWith(`${location.pathname}#`) ? h.slice(location.pathname.length) : h || "#");
const kindIcon = (k) => KINDS[k]?.[1] || "link";

export function renderCollections(view, id, { toast }) {
  const all = collections();
  const c = id && all.find((x) => x.id === id);
  if (id && !c) { location.replace("#/collections"); return; }
  if (c) return renderOne(view, c, { toast });
  view.innerHTML = `<section class="cols">
    <span class="kicker lo-kicker">${icon("book")}Library</span>
    <div class="deck-head"><div><h1>Collections</h1><p class="sub">Group lessons, flashcard sets, notes, questions and topics from anywhere in Gradify. Add anything from its ••• menu; one thing can be in several collections.</p></div></div>
    <form class="col-new panel glass"><label class="sr-only" for="col-name">New collection</label><input id="col-name" placeholder="New collection, e.g. Mock exam week" maxlength="80"><button class="btn btn-primary lg btn-sm" type="submit"><span>Create</span></button></form>
    ${all.length ? `<ul class="col-grid">${all.map((x) => { const items = itemsOf(x.id); return `<li><a class="col-card panel glass" href="#/collections/${esc(x.id)}"><b>${esc(x.name)}</b><small>${items.length} ${items.length === 1 ? "item" : "items"}</small><span class="col-kinds">${[...new Set(items.map((i) => i.kind))].slice(0, 5).map((k) => `<span title="${esc(KINDS[k]?.[0] || k)}">${uiIcon(kindIcon(k))}</span>`).join("")}</span></a></li>`; }).join("")}</ul>`
      : `<div class="panel glass hist-empty"><h3>No collections yet</h3><p class="sub">Make one here, or save something from its ••• menu: a lesson, a flashcard set, a note, a specification point.</p></div>`}
  </section>`;
  view.querySelector(".col-new").addEventListener("submit", (e) => {
    e.preventDefault(); const name = view.querySelector("#col-name").value.trim(); if (!name) return;
    const nid = createCollection(name); toast?.(`Made <b>${esc(name)}</b>.`); location.hash = `#/collections/${nid}`;
  });
}

// a contextual widget at the top of a collection: a way to start on what's in it, not just a list of it
function studyHtml(items) {
  const packs = items.filter((x) => x.kind === "pack"), lessons = items.filter((x) => x.kind === "lesson"), qs = items.filter((x) => x.kind === "question");
  const acts = [
    ...packs.slice(0, 3).map((p) => [`#/study/${encodeURIComponent(p.rid.slice(5))}`, `Revise ${p.title}`]),
    lessons[0] ? [lessons[0].href, `Open ${lessons[0].title}`] : null,
    qs[0] ? [qs[0].href, `${qs.length} question${qs.length > 1 ? "s" : ""} saved: start with the first`] : null,
  ].filter(Boolean);
  return acts.length ? `<section class="panel glass col-study" aria-label="Study this collection"><p class="wd-k">Study this collection</p><div class="wd-launch">${acts.map(([h, t], i) => `<a class="cp-pill${i ? "" : " dark"}" href="${esc(local(h))}">${esc(t)}</a>`).join("")}</div></section>` : "";
}
function renderOne(view, c, { toast }) {
  const items = itemsOf(c.id).sort((a, b) => b.added - a.added);
  const byKind = new Map(); for (const it of items) { const k = KINDS[it.kind]?.[0] || "Other"; if (!byKind.has(k)) byKind.set(k, []); byKind.get(k).push(it); }
  view.innerHTML = `<section class="cols">
    <span class="kicker lo-kicker">${icon("book")}Collection</span>
    <div class="deck-head"><div><h1>${esc(c.name)}</h1><p class="sub">${items.length} ${items.length === 1 ? "item" : "items"} from across Gradify. Each opens the real thing: nothing here is a copy.</p></div>
      <div class="row-actions"><button type="button" class="btn btn-ghost lg btn-sm" data-rename><span>Rename</span></button><button type="button" class="btn btn-ghost lg btn-sm" data-delete><span>Delete</span></button></div></div>
    ${studyHtml(items)}
    ${items.length ? [...byKind].map(([k, xs]) => `<h2 class="lo-h">${esc(k)}${xs.length > 1 ? "s" : ""}</h2><ul class="col-items">${xs.map((it) => `<li><a href="${esc(local(it.href))}"><span class="hist-ic" aria-hidden="true">${uiIcon(kindIcon(it.kind))}</span><span class="hist-t"><b>${esc(it.title)}</b><small>${esc([it.sub, noteOf(it.rid) ? "has your note" : ""].filter(Boolean).join(" · "))}</small></span></a><button type="button" class="gx-cn-x" data-remove="${esc(it.rid)}" aria-label="Remove ${esc(it.title)} from this collection" title="Remove">${uiIcon("close")}</button></li>`).join("")}</ul>`).join("")
      : `<div class="panel glass hist-empty"><h3>Empty for now</h3><p class="sub">Open a lesson, a flashcard set or a note, choose ••• and then “Save to a collection”.</p></div>`}
    <p><a href="#/collections">← Every collection</a></p></section>`;
  view.querySelector(".cols").addEventListener("click", (e) => {
    const r = e.target.closest("[data-remove]");
    if (r) { const it = items.find((x) => x.rid === r.dataset.remove); removeFromCollection(c.id, r.dataset.remove); toast?.(`Removed <b>${esc(it?.title || "it")}</b>`, { undo: () => { if (it) addToCollection(c.id, it); renderOne(view, c, { toast }); } }); renderOne(view, c, { toast }); return; }
    if (e.target.closest("[data-rename]")) { const n = prompt("Rename the collection", c.name); if (n && n.trim()) { renameCollection(c.id, n); renderOne(view, { ...c, name: n.trim() }, { toast }); } return; }
    if (e.target.closest("[data-delete]")) { if (!confirm(`Delete “${c.name}”? The things in it aren't deleted, only the collection.`)) return; deleteCollection(c.id); toast?.("Collection deleted."); location.hash = "#/collections"; }
  });
}
