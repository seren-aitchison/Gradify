// Collections (#/collections, #/collections/<id>): the learner's own groups of resources from any tool (lessons,
// topics, flashcard sets, notes, quizzes, specification points), made from any resource's "•••" menu
// (kit/ui/resource-actions.js). One thing can be in several collections; nothing is copied, each item opens the real
// thing. Kept in the learner's record (kit/data/links.js), so collections are the same on every device.
import { icon } from "../core/icons.js";
import { esc } from "../core/text.js";
import { uiIcon } from "../ui/icons.js";
import { collections, itemsOf, createCollection, renameCollection, deleteCollection, removeFromCollection, addToCollection, noteOf } from "../data/links.js";
import { KINDS } from "../core/resource.js";
import { setPageOps, renameInPlace, deferredDelete, undoable, pickCollection, download, resourcesMd, fileName, mountMultiSelect } from "../ui/quick-actions.js";

// a deleted collection is hidden at once and really deleted once its notice has gone (so Undo needs nothing rebuilt)
const hidden = new Set();
function deleteWithUndo(cs, after) {
  const one = cs.length === 1;
  deferredDelete({
    html: one ? `Deleted the collection <b>${esc(cs[0].name)}</b>. The things in it are still where they were.` : `Deleted ${cs.length} collections. The things in them are still where they were.`,
    label: one ? cs[0].name : `${cs.length} collections`,
    hide: () => { cs.forEach((c) => hidden.add(c.id)); after(); },
    restore: () => { cs.forEach((c) => hidden.delete(c.id)); after(); },
    commit: () => cs.forEach((c) => { deleteCollection(c.id); hidden.delete(c.id); }),
  });
}
function duplicate(c) {
  const id = createCollection(`${c.name} (copy)`);
  for (const it of itemsOf(c.id)) addToCollection(id, it);
  undoable(`Made <a href="#/collections/${esc(id)}">${esc(c.name)} (copy)</a>.`, () => deleteCollection(id), { label: `${c.name} (copy)` });
  return id;
}
const exportMd = (c, items = itemsOf(c.id)) => download(fileName(c.name, "md"), resourcesMd(c.name, items, location.origin), "text/markdown");

const local = (h) => (h && h.startsWith(`${location.pathname}#`) ? h.slice(location.pathname.length) : h || "#");
const kindIcon = (k) => KINDS[k]?.[1] || "link";

export function renderCollections(view, id, { toast }) {
  const all = collections().filter((x) => !hidden.has(x.id));
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
  const grid = view.querySelector(".col-grid");
  if (grid && all.length > 1) {
    const pick = (ids) => all.filter((x) => ids.includes(x.id)), redraw = () => renderCollections(view, null, { toast });
    const head = document.createElement("div"); head.className = "gx-ms-head"; grid.before(head);
    grid.querySelectorAll(".col-card").forEach((a) => { a.dataset.col = a.getAttribute("href").split("/").pop(); });
    mountMultiSelect(grid, { item: ".col-card", key: (el) => el.dataset.col, name: (el) => el.querySelector("b")?.textContent || "", toggleHost: head, actions: [
      { id: "dup", label: "Duplicate", icon: "copy", run: (ids) => { pick(ids).forEach(duplicate); redraw(); } },
      { id: "export", label: "Export", icon: "download", run: (ids) => pick(ids).forEach((x) => exportMd(x)) },
      { id: "delete", label: "Delete", icon: "trash", run: (ids) => deleteWithUndo(pick(ids), redraw) },
    ] });
  }
}

// a contextual widget at the top of a collection: a way to start on what's in it, not just a list of it
function studyHtml(items) {
  const packs = items.filter((x) => x.kind === "pack"), lessons = items.filter((x) => x.kind === "lesson"), qs = items.filter((x) => x.kind === "question");
  const acts = [
    // a pack's revise page is in the app it was made in (each app keeps its own packs), so build it from the pack's own address
    ...packs.slice(0, 3).map((p) => [`${(p.href || location.pathname).split("#")[0] || location.pathname}#/study/${encodeURIComponent(p.rid.slice(5))}`, `Revise ${p.title}`]),
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
      <div class="row-actions"><button type="button" class="btn btn-ghost lg btn-sm" data-rename title="Rename (F2)"><span>Rename</span></button><button type="button" class="btn btn-ghost lg btn-sm" data-delete><span>Delete</span></button></div></div>
    ${studyHtml(items)}
    ${items.length ? [...byKind].map(([k, xs]) => `<h2 class="lo-h">${esc(k)}${xs.length > 1 ? "s" : ""}</h2><ul class="col-items">${xs.map((it) => `<li><a data-rid="${esc(it.rid)}" href="${esc(local(it.href))}"><span class="hist-ic" aria-hidden="true">${uiIcon(kindIcon(it.kind))}</span><span class="hist-t"><b>${esc(it.title)}</b><small>${esc([it.sub, noteOf(it.rid) ? "has your note" : ""].filter(Boolean).join(" · "))}</small></span></a><button type="button" class="gx-cn-x" data-remove="${esc(it.rid)}" aria-label="Remove ${esc(it.title)} from this collection" title="Remove">${uiIcon("close")}</button></li>`).join("")}</ul>`).join("")
      : `<div class="panel glass hist-empty"><h3>Empty for now</h3><p class="sub">Open a lesson, a flashcard set or a note, choose ••• and then “Save to a collection”.</p></div>`}
    <p><a href="#/collections">← Every collection</a></p></section>`;
  const redraw = () => { const now = collections().find((x) => x.id === c.id); if (now && !hidden.has(c.id)) renderOne(view, now, { toast }); };
  const rename = () => renameInPlace(view.querySelector(".deck-head h1"), c.name, (t) => { renameCollection(c.id, t); c.name = t; }, { label: "Collection name" });
  const del = () => deleteWithUndo([c], () => { if (hidden.has(c.id)) location.hash = "#/collections"; else if (location.hash === "#/collections") location.hash = `#/collections/${c.id}`; else redraw(); });
  // what this collection can do: in the page's ••• menu and on the keyboard
  setPageOps({ rename, duplicate: () => { location.hash = `#/collections/${duplicate(c)}`; }, export: () => exportMd(c), delete: del });
  view.querySelector(".cols").addEventListener("click", (e) => {
    const r = e.target.closest("[data-remove]");
    if (r) { const it = items.find((x) => x.rid === r.dataset.remove); removeFromCollection(c.id, r.dataset.remove); undoable(`Removed <b>${esc(it?.title || "it")}</b>`, () => { if (it) addToCollection(c.id, it); redraw(); }, { label: it?.title }); redraw(); return; }
    if (e.target.closest("[data-rename]")) { rename(); return; }
    if (e.target.closest("[data-delete]")) del();
  });
  // several items at once: move or copy them to another collection, remove them, or export them
  const lists = view.querySelector(".cols");
  if (items.length > 1) {
    const pick = (rids) => items.filter((x) => rids.includes(x.rid));
    const head = document.createElement("div"); head.className = "gx-ms-head"; view.querySelector(".col-items")?.previousElementSibling?.before(head);
    const moveOrCopy = async (rids, move) => {
      const to = await pickCollection({ title: `${move ? "Move" : "Copy"} ${rids.length} to…`, exclude: c.id }); if (!to) return;
      const name = collections().find((x) => x.id === to)?.name || "the collection", xs = pick(rids);
      const had = new Set(itemsOf(to).map((x) => x.rid)), added = xs.filter((x) => !had.has(x.rid));
      added.forEach((x) => addToCollection(to, x)); if (move) xs.forEach((x) => removeFromCollection(c.id, x.rid));
      undoable(`${move ? "Moved" : "Copied"} ${xs.length} to <a href="#/collections/${esc(to)}">${esc(name)}</a>.`, () => { added.forEach((x) => removeFromCollection(to, x.rid)); if (move) xs.forEach((x) => addToCollection(c.id, x)); redraw(); }, { label: `${move ? "moved" : "copied"} to ${name}` });
      redraw();
    };
    mountMultiSelect(lists, { item: ".col-items a[data-rid]", key: (el) => el.dataset.rid, name: (el) => el.querySelector("b")?.textContent || "", toggleHost: head, actions: [
      { id: "move", label: "Move to…", icon: "inbox", run: (rids) => moveOrCopy(rids, true) },
      { id: "copy", label: "Copy to…", icon: "copy", run: (rids) => moveOrCopy(rids, false) },
      { id: "export", label: "Export", icon: "download", run: (rids) => exportMd(c, pick(rids)) },
      { id: "remove", label: "Remove", icon: "close", run: (rids) => { const xs = pick(rids); xs.forEach((x) => removeFromCollection(c.id, x.rid)); undoable(`Removed ${xs.length} from <b>${esc(c.name)}</b>.`, () => { xs.forEach((x) => addToCollection(c.id, x)); redraw(); }, { label: `removed ${xs.length}` }); redraw(); } },
    ] });
  }
}
