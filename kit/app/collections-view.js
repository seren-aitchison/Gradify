// Collections: the learner's folders, tags and recently deleted things (kit/data/organise.js, docs/ORGANISE.md).
//
//   #/collections                every folder (grid, list or compact; sorted, filtered, reordered by dragging), the
//                                learner's tags, things not yet filed with where they might go, possible duplicates,
//                                archived folders, and templates to start from
//   #/collections/<id>           one folder: where it is (breadcrumbs), its folders, its progress, what's in it
//                                (searched, filtered, sorted, dragged into order or into a folder), all in one place
//   #/collections/tag/<tag>      everything with a tag;  #/collections/tags  every tag
//   #/collections/trash          recently deleted, for 30 days
//
// Folders hold references, never copies: one lesson can be in three folders, carry two tags and be mapped to the
// curriculum as one thing. Folders and tags sync with the learner's record; Recently deleted stays on this device.
import { icon } from "../core/icons.js";
import { esc } from "../core/text.js";
import { uiIcon } from "../ui/icons.js";
import { openModal } from "../ui/overlay.js";
import { pref, setPref } from "../ui/prefs.js";
import { collections, itemsOf, renameCollection, removeFromCollection, addToCollection, noteOf } from "../data/links.js";
import { KINDS, resource } from "../core/resource.js";
import { setPageOps, renameInPlace, undoable, pickCollection, download, resourcesMd, fileName, mountMultiSelect, stopMultiSelect, routeKey } from "../ui/quick-actions.js";
import { tree, pathOf, descendants, canNest, folderLabel, reorder, COLOURS, colourOf, FOLDER_ICONS, TEMPLATES, templatePlan, applyTemplate, createFolder, updateFolder, nestFolder, setFolderOrder, setItemOrder, itemOrder, archiveFolder,
  tagsOf, setTags, allTags, withTag, renameTag, deleteTag, normTag, tagMany, fileMany, placeFor, duplicateGroups, ownerOf, visibilityOf, trash, fromTrash, trashFolders, restoreFolders } from "../data/organise.js";
import { organiseDialog } from "../ui/resource-actions.js";

const P = "collections";   // prefs scope
const onList = () => routeKey() === "#/collections";
const local = (h) => (h && h.startsWith(`${location.pathname}#`) ? h.slice(location.pathname.length) : h || "#");
const kindIcon = (k) => KINDS[k]?.[1] || "link";
const plural = (n, one, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;
const ago = (t) => { if (!t) return ""; const d = Math.floor((Date.now() - t) / 864e5); return d < 1 ? "today" : d === 1 ? "yesterday" : d < 30 ? `${d} days ago` : new Date(t).toLocaleDateString("en-GB", { day: "numeric", month: "short" }); };
const signedIn = () => { try { return Object.keys(localStorage).some((k) => /^sb-[\w-]+-auth-token$/.test(k)); } catch { return false; } };
const fIcon = (c) => `<span class="cx-fic" style="${colourOf(c.colour) ? `--fc:${colourOf(c.colour)}` : ""}" aria-hidden="true">${uiIcon(c.icon || (c.smart ? "sparkles" : "inbox"))}</span>`;
const exportMd = (c, items = itemsOf(c.id)) => download(fileName(c.name, "md"), resourcesMd(c.name, items, location.origin), "text/markdown");

// what Gradify knows about each thing (done, status) for progress and filters: the search sources, built once
let docsP = null;
function knownDocs(store) {
  return (docsP ||= import("../search/view.js").then(async (m) => { const ix = await m.createSearchService({ store, app: location.pathname }).ready(true); return new Map(ix.list.map((x) => [x.d.id, x.d])); }).catch(() => { docsP = null; return new Map(); }));
}
/** a folder's progress from what's in it (and in the folders inside it): done, in progress, and how many can be done */
function progressOf(items, docs) {
  let done = 0, can = 0, going = 0;
  for (const it of items) { const d = docs.get(it.rid); if (d?.done == null) continue; can++; if (d.done) done++; else if ((d.status || []).includes("in-progress")) going++; }
  return { done, can, going };
}
const barHtml = (p, label) => (p.can ? `<span class="cx-prog" role="img" aria-label="${esc(label)}: ${p.done} of ${p.can} done"><i style="width:${Math.max(3, Math.round((100 * p.done) / p.can))}%"></i></span><small>${p.done} of ${p.can} done</small>` : "");

// ---------- dialogs ----------
/** edit a folder: name, description, colour, icon, where it sits, and (for a smart folder) what fills it */
function editFolder(c, { onDone } = {}) {
  const all = collections(), may = all.filter((x) => x.id !== c.id && !x.smart && canNest(all, c.id, x.id));
  const body = `<form class="cx-edit">
    <label><span>Name</span><input name="name" maxlength="80" value="${esc(c.name)}" required></label>
    <label><span>Description</span><textarea name="desc" rows="2" maxlength="280" placeholder="What goes in it, e.g. Everything for the chemistry mock on 9 December">${esc(c.desc || "")}</textarea></label>
    ${c.smart ? `<label><span>Filled automatically by</span><input name="smart" maxlength="300" value="${esc(c.smart.q)}" placeholder="tag:difficult done:no"><small class="sub">A search: <code>type:flashcards</code> <code>tag:priority</code> <code>in:course:chemistry</code> <code>done:no</code> <code>after:7d</code> and any words.</small></label>` : ""}
    <fieldset class="cx-sw"><legend>Colour</legend>${COLOURS.map(([n, hex]) => `<label title="${esc(n || "None")}"><input type="radio" name="colour" value="${esc(n)}" ${(c.colour || "") === n ? "checked" : ""}><span style="${n ? `background:${hex}` : ""}" class="${n ? "" : "none"}"></span><span class="sr-only">${esc(n || "No colour")}</span></label>`).join("")}</fieldset>
    <fieldset class="cx-icons"><legend>Icon</legend>${FOLDER_ICONS.map((n) => `<label title="${esc(n)}"><input type="radio" name="icon" value="${n}" ${(c.icon || (c.smart ? "sparkles" : "inbox")) === n ? "checked" : ""}><span>${uiIcon(n)}</span><span class="sr-only">${esc(n)}</span></label>`).join("")}</fieldset>
    <label><span>Inside</span><select name="parent"><option value="">Collections (the top)</option>${may.map((x) => `<option value="${esc(x.id)}" ${c.parent === x.id ? "selected" : ""}>${esc(folderLabel(all, x.id))}</option>`).join("")}</select></label>
  </form>`;
  const m = openModal({ title: c.id ? `Edit “${c.name}”` : "New folder", body, actions: [{ label: "Cancel" }, { label: "Save", primary: true, run: () => {
    const f = new FormData(m.box.querySelector("form")), name = String(f.get("name") || "").trim(); if (!name) return false;
    const patch = { name, desc: String(f.get("desc") || "").trim() || null, colour: f.get("colour") || null, icon: f.get("icon") || null, parent: f.get("parent") || null };
    if (c.smart) patch.smart = { q: String(f.get("smart") || "").trim() || c.smart.q };
    updateFolder(c.id, patch); onDone?.();
  } }] });
  setTimeout(() => m.box.querySelector("input[name=name]")?.select(), 40);
}
/** a new folder (plain or smart), optionally inside another */
function newFolder({ parent = null, smart = false, then } = {}) {
  const body = `<form class="cx-edit"><label><span>Name</span><input name="name" maxlength="80" required placeholder="${smart ? "e.g. Difficult and not finished" : "e.g. My mock exam revision"}"></label>
    ${smart ? `<label><span>Filled automatically by</span><input name="smart" maxlength="300" required value="tag:difficult done:no"><small class="sub">Anything this search finds, kept up to date: <code>type:flashcards</code> <code>tag:priority</code> <code>in:course:chemistry</code> <code>done:no</code> <code>after:7d</code> and any words. Nothing is moved or copied.</small></label>` : ""}
    <label><span>Description (optional)</span><input name="desc" maxlength="280" placeholder="What goes in it"></label></form>`;
  const m = openModal({ title: smart ? "New smart folder" : parent ? "New folder inside" : "New folder", body, actions: [{ label: "Cancel" }, { label: "Create", primary: true, run: () => {
    const f = new FormData(m.box.querySelector("form")), name = String(f.get("name") || "").trim(); if (!name) return false;
    const id = createFolder({ name, parent, desc: String(f.get("desc") || "").trim() || null, smart: smart ? String(f.get("smart") || "").trim() || null : null, icon: smart ? "sparkles" : null });
    then ? then(id) : (location.hash = `#/collections/${id}`);
  } }] });
  setTimeout(() => m.box.querySelector("input")?.focus(), 40);
}
/** start from a template: a ready-made set of folders (for the course one, choose the course) */
async function fromTemplate({ parent = null } = {}) {
  const idx = await import("../search/sources.js").then((m) => m.loadSearchIndex()).catch(() => ({ courses: [] }));
  const courses = (idx.courses || []).slice().sort((a, b) => a.n.localeCompare(b.n));
  const body = `<form class="cx-tpl">${TEMPLATES.map((t, i) => `<label class="cx-tplc"><input type="radio" name="t" value="${t.id}" ${i ? "" : "checked"}><span>${fIcon({ icon: t.icon, colour: t.colour })}<b>${esc(t.name)}</b><small>${esc(t.desc)}</small>${t.folders ? `<em>${t.folders.map((f) => esc(f.name) + (f.smart ? " (smart)" : "")).join(" · ")}</em>` : ""}</span></label>`).join("")}
    <label class="cx-tplcourse" hidden><span>Course</span><select name="course">${courses.map((c) => `<option value="${esc(c.s)}">${esc(c.n)}</option>`).join("")}</select></label>
    <label><span>Name (optional)</span><input name="name" maxlength="80" placeholder="Leave blank to use the template's name"></label></form>`;
  const m = openModal({ title: "Start from a template", body, actions: [{ label: "Cancel" }, { label: "Make the folders", primary: true, run: () => {
    const f = new FormData(m.box.querySelector("form")), t = TEMPLATES.find((x) => x.id === f.get("t"));
    const course = t.needsCourse ? (idx.courses || []).find((c) => c.s === f.get("course")) : null;
    const plan = templatePlan(t, { course, name: String(f.get("name") || "").trim() || null });
    const id = applyTemplate(t, { course, name: String(f.get("name") || "").trim() || null, parent });
    undoable(`Made <b>${esc(plan[0].name)}</b> with ${plural(plan.length - 1, "folder")} inside.`, () => { trashFolders([id]); fromTrash(trash()[0]?.id); if (routeKey().startsWith("#/collections")) location.hash = "#/collections"; }, { label: plan[0].name });
    location.hash = `#/collections/${id}`;
  } }] });
  const sync = () => { const t = TEMPLATES.find((x) => x.id === m.box.querySelector("[name=t]:checked")?.value); m.box.querySelector(".cx-tplcourse").hidden = !t?.needsCourse; };
  m.box.addEventListener("change", sync); sync();
}

// ---------- the list of folders ----------
export function renderCollections(view, id, ctx = {}) {
  stopMultiSelect();
  const more = ctx.more || [];
  if (id === "trash") return renderTrash(view, ctx);
  if (id === "tags") return renderTags(view, ctx);
  if (id === "tag" && more[0]) return renderTag(view, decodeURIComponent(more[0]), ctx);
  const all = collections();
  const c = id && all.find((x) => x.id === id);
  if (id && !c) { location.replace("#/collections"); return; }
  if (c) return renderOne(view, c, ctx);
  const viewMode = pref(P, "view", "grid"), sortBy = pref(P, "sort", "custom");
  const roots = tree(all);
  const sorted = sortBy === "custom" ? roots : [...roots].sort((a, b) => (sortBy === "name" ? a.name.localeCompare(b.name) : sortBy === "recent" ? (b.t || 0) - (a.t || 0) : sortBy === "size" ? itemsOf(b.id).length - itemsOf(a.id).length : 0));
  const archived = all.filter((x) => x.archived);
  const tags = allTags();
  const binN = trash().length;
  const card = (x) => {
    const items = itemsOf(x.id), subs = descendants(all, x.id).filter((d) => !d.archived);
    return `<li class="cx-fold" draggable="true" data-col="${esc(x.id)}" style="${colourOf(x.colour) ? `--fc:${colourOf(x.colour)}` : ""}"><a class="col-card panel glass" href="#/collections/${esc(x.id)}">
      ${fIcon(x)}<span class="cx-ft"><b>${esc(x.name)}</b>${x.desc ? `<span class="cx-fd">${esc(x.desc)}</span>` : ""}
      <small>${x.smart ? `Smart: <code>${esc(x.smart.q)}</code>` : `${plural(items.length, "item")}${subs.length ? ` · ${plural(subs.length, "folder")}` : ""}`}</small>
      <span class="cx-pw" data-prog="${esc(x.id)}"></span></span>
      <span class="col-kinds">${[...new Set(items.map((i) => i.kind))].slice(0, 4).map((k) => `<span title="${esc(KINDS[k]?.[0] || k)}">${uiIcon(kindIcon(k))}</span>`).join("")}</span></a></li>`;
  };
  view.innerHTML = `<section class="cols cx-org-page" data-view="${esc(viewMode)}">
    <span class="kicker lo-kicker">${icon("book")}Library</span>
    <div class="deck-head"><div><h1>Collections</h1><p class="sub">Your folders, from every tool. A folder holds things without copying them, so one lesson can sit in several. Tags say what something is like; the curriculum says what it teaches.</p></div></div>
    <div class="cx-bar">
      <button type="button" class="btn btn-primary lg btn-sm" data-new>${uiIcon("plus")}<span>New folder</span></button>
      <button type="button" class="btn btn-ghost lg btn-sm" data-smart>${uiIcon("sparkles")}<span>Smart folder</span></button>
      <button type="button" class="btn btn-ghost lg btn-sm" data-tpl>${uiIcon("grid")}<span>From a template</span></button>
      <span class="cx-sp"></span>
      <label class="cx-find">${uiIcon("search")}<span class="sr-only">Find a folder</span><input type="search" placeholder="Find a folder" data-findf></label>
      ${sortSel([["custom", "Your order"], ["name", "Name"], ["recent", "Recently changed"], ["size", "Most items"]], sortBy)}
      ${viewSel(viewMode)}
    </div>
    ${sorted.length ? `<ul class="col-grid cx-folders">${sorted.map(card).join("")}</ul><p class="cx-hint sub">Drag a folder onto another to put it inside, or onto the top half of one to put it before it.</p>`
      : `<div class="panel glass hist-empty"><h3>No folders yet</h3><p class="sub">Make one, start from a template (mock exam revision, a course by topic, a project, this week), or save anything from its ••• menu.</p></div>`}
    <div class="cx-under">
      ${tags.length ? `<section class="cx-sec" aria-labelledby="cx-tags-h"><h2 id="cx-tags-h">${uiIcon("flag")} Tags <a class="gx-link" href="#/collections/tags">Manage</a></h2><p class="cx-cloud">${tags.slice(0, 30).map((t) => `<a class="gx-tagc" href="#/collections/tag/${encodeURIComponent(t.tag)}">#${esc(t.tag)} <small>${t.n}</small></a>`).join("")}</p></section>` : ""}
      <section class="cx-sec" aria-labelledby="cx-sug-h" data-sugs hidden></section>
      <section class="cx-sec" aria-labelledby="cx-dup-h" data-dups hidden></section>
      ${archived.length ? `<details class="cx-sec cx-arch"><summary><h2>${uiIcon("clock")} Archived <small>${archived.length}</small></h2></summary><ul class="cx-alist">${archived.map((x) => `<li>${fIcon(x)}<a href="#/collections/${esc(x.id)}">${esc(folderLabel(all, x.id))}</a><small>archived ${esc(ago(x.archived))}</small><button type="button" class="btn btn-ghost btn-sm" data-unarch="${esc(x.id)}">Unarchive</button></li>`).join("")}</ul></details>` : ""}
      <p class="cx-bin"><a href="#/collections/trash">${uiIcon("trash")} Recently deleted${binN ? ` (${binN})` : ""}</a></p>
    </div>
  </section>`;
  const root = view.querySelector(".cx-org-page");
  const redraw = () => { if (onList()) renderCollections(view, null, ctx); };
  root.querySelector("[data-new]").addEventListener("click", () => newFolder());
  root.querySelector("[data-smart]").addEventListener("click", () => newFolder({ smart: true }));
  root.querySelector("[data-tpl]").addEventListener("click", () => fromTemplate());
  root.addEventListener("change", (e) => {
    if (e.target.matches("[data-sort]")) { setPref(P, "sort", e.target.value); redraw(); }
  });
  wireViews(root, (v) => { setPref(P, "view", v); root.dataset.view = v; });
  root.querySelector("[data-findf]")?.addEventListener("input", (e) => {
    const t = e.target.value.trim().toLowerCase();
    root.querySelectorAll(".cx-fold").forEach((li) => { const c0 = all.find((x) => x.id === li.dataset.col); const hay = [c0.name, c0.desc, ...descendants(all, c0.id).map((d) => d.name)].join(" ").toLowerCase(); li.hidden = Boolean(t) && !hay.includes(t); });
  });
  root.addEventListener("click", (e) => {
    const u = e.target.closest("[data-unarch]"); if (u) { archiveFolder(u.dataset.unarch, false); ctx.toast?.("Unarchived."); redraw(); }
  });
  // drag folders: onto one to put it inside, onto the top part of one to put it before it
  wireFolderDrag(root.querySelector(".cx-folders"), { all, redraw, toast: ctx.toast, ordered: sortBy === "custom" ? sorted.map((x) => x.id) : null });
  // several folders at once
  const grid = root.querySelector(".cx-folders");
  if (grid && sorted.length > 1) {
    const pick = (ids) => all.filter((x) => ids.includes(x.id));
    const head = document.createElement("div"); head.className = "gx-ms-head"; grid.before(head);
    mountMultiSelect(grid, { item: ".cx-fold", key: (el) => el.dataset.col, name: (el) => el.querySelector("b")?.textContent || "", toggleHost: head, actions: [
      { id: "move", label: "Move into…", icon: "inbox", run: async (ids) => { const to = await pickCollection({ title: `Put ${plural(ids.length, "folder")} inside…` }); if (!to) return; const ok = ids.filter((x) => nestFolder(x, to)); ctx.toast?.(`${ok.length ? `Moved ${plural(ok.length, "folder")}.` : ""}${ok.length < ids.length ? " A folder can't go inside itself." : ""}`); redraw(); } },
      { id: "archive", label: "Archive", icon: "clock", run: (ids) => { ids.forEach((x) => archiveFolder(x)); undoable(`Archived ${plural(ids.length, "folder")}.`, () => { ids.forEach((x) => archiveFolder(x, false)); redraw(); }, { label: "archived" }); redraw(); } },
      { id: "dup", label: "Duplicate", icon: "copy", run: (ids) => { pick(ids).forEach((x) => duplicate(x)); redraw(); } },
      { id: "export", label: "Export", icon: "download", run: (ids) => pick(ids).forEach((x) => exportMd(x)) },
      { id: "delete", label: "Delete", icon: "trash", run: (ids) => del(pick(ids), redraw, ctx) },
    ] });
  }
  // progress, suggestions and duplicates need what Gradify knows: drawn when it's ready
  later(view, root, all, ctx);
}

async function later(view, root, all, ctx) {
  const store = ctx.store;
  knownDocs(store).then((docs) => {
    if (!root.isConnected) return;
    for (const el of root.querySelectorAll("[data-prog]")) {
      const ids = [el.dataset.prog, ...descendants(all, el.dataset.prog).map((d) => d.id)];
      el.innerHTML = barHtml(progressOf(ids.flatMap((x) => itemsOf(x)), docs), "Progress");
    }
  });
  // the learner's own things: where unfiled ones might go, and possible duplicates
  const st = typeof store === "function" ? await store() : store;
  const mine = await import("../search/sources.js").then((m) => m.learnerDocs({ store: st, app: location.pathname })).then((r) => r.docs).catch(() => []);
  if (!root.isConnected) return;
  const filed = new Set(all.flatMap((c) => itemsOf(c.id).map((x) => x.rid)));
  const folders = all.filter((c) => !c.smart && !c.archived).map((c) => ({ ...c, items: itemsOf(c.id) }));
  const dismissed = new Set(pref(P, "notDup", []));
  const own = mine.filter((d) => ["pack", "note", "map"].includes(d.type) && !String(d.id).startsWith("block:"));
  const unfiled = own.filter((d) => !filed.has(d.id)).map((d) => ({ d, r: resOf(d), place: placeFor({ rid: d.id, title: d.title, terms: d.terms, subject: d.subject, course: d.course }, folders, { limit: 1 })[0] })).slice(0, 40);
  const sug = root.querySelector("[data-sugs]");
  const withPlace = unfiled.filter((x) => x.place).slice(0, 6), rest = unfiled.length - withPlace.length;
  if (unfiled.length) {
    sug.hidden = false;
    sug.innerHTML = `<h2 id="cx-sug-h">${uiIcon("sparkles")} Not in a folder yet <small>${unfiled.length}</small></h2>
      <ul class="cx-sugl">${(withPlace.length ? withPlace : unfiled.slice(0, 5)).map((x, i) => `<li><span class="hist-ic">${uiIcon(kindIcon(x.r.kind))}</span><a href="${esc(local(x.d.href))}">${esc(x.d.title)}</a>
        ${x.place ? `<button type="button" class="gx-chip" data-file="${i}" title="${esc(x.place.why)}">${uiIcon("plus")}${esc(folderLabel(all, x.place.id))}</button>` : ""}<button type="button" class="gx-link" data-choose="${i}">Choose a folder…</button></li>`).join("")}</ul>
      ${rest > 0 && withPlace.length ? `<p class="sub">And ${plural(rest, "other")} with no obvious folder yet.</p>` : ""}`;
    const shown = withPlace.length ? withPlace : unfiled.slice(0, 5);
    sug.addEventListener("click", async (e) => {
      const f = e.target.closest("[data-file]"); if (f) { const x = shown[Number(f.dataset.file)]; addToCollection(x.place.id, x.r); undoable(`Filed <b>${esc(x.d.title)}</b> in <b>${esc(x.place.name)}</b>.`, () => removeFromCollection(x.place.id, x.r.rid), { label: x.d.title }); f.closest("li").remove(); return; }
      const ch = e.target.closest("[data-choose]"); if (ch) { const x = shown[Number(ch.dataset.choose)]; const to = await pickCollection({ title: `File “${x.d.title}” in…` }); if (to) { addToCollection(to, x.r); ch.closest("li").remove(); } }
    });
  }
  const dups = duplicateGroups(own.map((d) => ({ rid: d.id, kind: d.type, title: d.title, href: d.href, fronts: d.type === "pack" ? String(d.body || "").split(" · ").filter(Boolean) : null })), { dismissed });
  const dupEl = root.querySelector("[data-dups]");
  if (dups.length) {
    dupEl.hidden = false;
    dupEl.innerHTML = `<h2 id="cx-dup-h">${uiIcon("copy")} Possible duplicates <small>${dups.length}</small></h2><ul class="cx-dupl">${dups.slice(0, 8).map((g, i) => `<li><span class="sub">${esc(g.reason)}:</span> ${g.items.map((x) => `<a href="${esc(local(x.href))}">${esc(x.title)}</a>`).join(" <span aria-hidden=\"true\">·</span> ")} <button type="button" class="gx-link" data-notdup="${i}">Not duplicates</button></li>`).join("")}</ul><p class="sub">Open each to compare. Nothing is merged or deleted for you.</p>`;
    dupEl.addEventListener("click", (e) => { const b = e.target.closest("[data-notdup]"); if (!b) return; setPref(P, "notDup", [...dismissed, dups[Number(b.dataset.notdup)].key].slice(-200)); b.closest("li").remove(); });
  }
}
const resOf = (d) => resource(d.id.includes(":") && !/^(jot|tooldeck|toolnote|qset|deck|module|spec|qual|board|screen|action):/.test(d.id) ? d.id : `page:${d.href}`, { title: d.title, sub: d.sub, href: d.href, subject: d.subject }) || { rid: d.id, kind: "page", title: d.title, href: d.href };

function del(cs, after, ctx) {
  const n = cs.length + cs.reduce((a, c) => a + descendants(collections(), c.id).length, 0);
  trashFolders(cs.map((c) => c.id));
  const entry = trash()[0];
  undoable(cs.length === 1 ? `Deleted <b>${esc(cs[0].name)}</b>${n > 1 ? ` and the ${plural(n - 1, "folder")} inside it` : ""}. The things in ${n > 1 ? "them" : "it"} are still where they were.` : `Deleted ${plural(cs.length, "folder")}.`,
    () => { const e = fromTrash(entry?.id); if (e) restoreFolders(e); after(); }, { label: cs.length === 1 ? cs[0].name : `${cs.length} folders` });
  after();
}
function duplicate(c) {
  const id = createFolder({ name: `${c.name} (copy)`, parent: c.parent || null, colour: c.colour, icon: c.icon, desc: c.desc, smart: c.smart?.q || null });
  for (const it of itemsOf(c.id)) addToCollection(id, it);
  undoable(`Made <a href="#/collections/${esc(id)}">${esc(c.name)} (copy)</a>.`, () => { trashFolders([id]); fromTrash(trash()[0]?.id); }, { label: `${c.name} (copy)` });
  return id;
}
const sortSel = (opts, cur) => `<label class="cx-sort"><span class="sr-only">Sort</span><select data-sort>${opts.map(([v, l]) => `<option value="${v}" ${v === cur ? "selected" : ""}>${esc(l)}</option>`).join("")}</select></label>`;
const viewSel = (cur) => `<span class="cx-views" role="group" aria-label="View">${[["grid", "grid", "Grid"], ["list", "menu", "List"], ["compact", "split", "Compact"]].map(([v, ic, l]) => `<button type="button" class="gx-ib" data-view="${v}" aria-pressed="${v === cur}" title="${l}" aria-label="${l} view">${uiIcon(ic)}</button>`).join("")}</span>`;
function wireViews(root, set) { root.querySelector(".cx-views")?.addEventListener("click", (e) => { const b = e.target.closest("[data-view]"); if (!b) return; root.querySelectorAll(".cx-views [data-view]").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); set(b.dataset.view); }); }

/** drag a folder onto another to nest it, or onto the top of one to put it before (in "Your order") */
function wireFolderDrag(list, { all, redraw, toast, ordered }) {
  if (!list) return;
  let from = null;
  const zone = (li, e) => { const r = li.getBoundingClientRect(); return ordered && e.clientY < r.top + r.height * 0.3 ? "before" : "in"; };
  list.addEventListener("dragstart", (e) => { const li = e.target.closest(".cx-fold"); if (!li) return; from = li.dataset.col; e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/x-gradify-folder", from); li.classList.add("drag"); });
  list.addEventListener("dragover", (e) => {
    const li = e.target.closest(".cx-fold"); if (!from || !li || li.dataset.col === from) return;
    e.preventDefault(); const z = zone(li, e);
    list.querySelectorAll(".drop-in, .drop-before").forEach((x) => x.classList.remove("drop-in", "drop-before")); li.classList.add(z === "in" ? "drop-in" : "drop-before");
  });
  list.addEventListener("dragleave", (e) => { e.target.closest?.(".cx-fold")?.classList.remove("drop-in", "drop-before"); });
  list.addEventListener("drop", (e) => {
    const li = e.target.closest(".cx-fold"); if (!from || !li) return; e.preventDefault();
    const to = li.dataset.col, z = zone(li, e), name = all.find((x) => x.id === from)?.name || "It";
    if (z === "before") { const was = ordered.slice(); setFolderOrder(reorder(ordered, from, to)); undoable(`Moved <b>${esc(name)}</b>.`, () => { setFolderOrder(was); redraw(); }, { label: name }); }
    else { const was = all.find((x) => x.id === from)?.parent || null; if (!nestFolder(from, to)) toast?.("A folder can't go inside itself."); else undoable(`Put <b>${esc(name)}</b> inside <b>${esc(all.find((x) => x.id === to)?.name || "it")}</b>.`, () => { nestFolder(from, was); redraw(); }, { label: name }); }
    from = null; redraw();
  });
  list.addEventListener("dragend", () => { from = null; list.querySelectorAll(".drag, .drop-in, .drop-before").forEach((x) => x.classList.remove("drag", "drop-in", "drop-before")); });
  // the keyboard way: Alt+↑ / Alt+↓ on a folder moves it in "Your order"
  list.addEventListener("keydown", (e) => {
    const li = e.target.closest(".cx-fold"); if (!li || !ordered || !e.altKey || !["ArrowUp", "ArrowDown"].includes(e.key)) return;
    e.preventDefault(); const i = ordered.indexOf(li.dataset.col), j = i + (e.key === "ArrowUp" ? -1 : 1); if (j < 0 || j >= ordered.length) return;
    const next = ordered.slice(); next.splice(i, 1); next.splice(j, 0, li.dataset.col); setFolderOrder(next); redraw();
    setTimeout(() => document.querySelector(`.cx-fold[data-col="${CSS.escape(li.dataset.col)}"] a`)?.focus(), 0);
  });
}

// ---------- one folder ----------
function studyHtml(items) {
  const packs = items.filter((x) => x.kind === "pack"), lessons = items.filter((x) => x.kind === "lesson"), qs = items.filter((x) => x.kind === "question");
  const acts = [
    ...packs.slice(0, 3).map((p) => [`${(p.href || location.pathname).split("#")[0] || location.pathname}#/study/${encodeURIComponent(p.rid.slice(5))}`, `Revise ${p.title}`]),
    lessons[0] ? [lessons[0].href, `Open ${lessons[0].title}`] : null,
    qs[0] ? [qs[0].href, `${qs.length} question${qs.length > 1 ? "s" : ""} saved: start with the first`] : null,
  ].filter(Boolean);
  return acts.length ? `<section class="panel glass col-study" aria-label="Study this folder"><p class="wd-k">Study this folder</p><div class="wd-launch">${acts.map(([h, t], i) => `<a class="cp-pill${i ? "" : " dark"}" href="${esc(local(h))}">${esc(t)}</a>`).join("")}</div></section>` : "";
}
async function renderOne(view, c, ctx) {
  stopMultiSelect();
  const all = collections(), path = pathOf(all, c.id), subs = all.filter((x) => x.parent === c.id && !x.archived);
  const store = ctx.store, sortBy = pref(P, `sort:${c.id}`, c.smart ? "relevance" : "custom"), viewMode = pref(P, "itemView", "list");
  let items;
  if (c.smart) {
    // a smart folder: what its search finds now (kit/search), nothing stored
    const svc = (await import("../search/view.js")).createSearchService({ store, app: location.pathname });
    const r = await svc.run(c.smart.q, {}, { force: true });
    items = r.hits.slice(0, 200).map((h, i) => ({ ...resOf(h), title: h.title, href: h.href, sub: h.sub, kind: resOf(h).kind === "page" ? ({ lesson: "lesson", pack: "pack", question: "question", note: "note", map: "map", collection: "collection", curriculum: "spec", topic: "unit", course: "course" })[h.type] || "page" : resOf(h).kind, added: h.modified || 0, rank: i, tags: h.tags || [] }));
  } else items = itemsOf(c.id).map((it) => ({ ...it, tags: tagsOf(it.rid) }));
  const order = itemOrder(c.id);
  const sorters = {
    custom: (a, b) => (order.get(a.rid) ?? 1e9) - (order.get(b.rid) ?? 1e9) || b.added - a.added,
    relevance: (a, b) => (a.rank ?? 0) - (b.rank ?? 0),
    added: (a, b) => b.added - a.added, title: (a, b) => String(a.title).localeCompare(String(b.title)),
    type: (a, b) => String(KINDS[a.kind]?.[0] || "").localeCompare(String(KINDS[b.kind]?.[0] || "")) || String(a.title).localeCompare(String(b.title)),
  };
  items.sort(sorters[sortBy] || sorters.custom);
  const kinds = [...new Set(items.map((i) => i.kind))], tagsHere = [...new Set(items.flatMap((i) => i.tags))].sort();
  const signed = signedIn();
  const row = (it) => {
    const own = ownerOf(it), vis = visibilityOf(it, { signedIn: signed });
    return `<li class="cx-item" draggable="${!c.smart && sortBy === "custom"}" data-rid="${esc(it.rid)}" data-kind="${esc(it.kind)}" data-tags="${esc(it.tags.join(" "))}" data-text="${esc(`${it.title} ${it.sub || ""} ${it.tags.join(" ")}`.toLowerCase())}">
      <a class="cx-ia" data-rid="${esc(it.rid)}" href="${esc(local(it.href))}"><span class="hist-ic" aria-hidden="true">${uiIcon(kindIcon(it.kind))}</span><span class="hist-t"><b>${esc(it.title)}</b><small>${esc([KINDS[it.kind]?.[0], it.sub, noteOf(it.rid) ? "has your note" : ""].filter(Boolean).join(" · "))}</small>
        <span class="cx-meta">${it.tags.map((t) => `<span class="gx-tagc sm">#${esc(t)}</span>`).join("")}<span class="cx-own ${own}" title="${esc(vis.line)}">${own === "yours" ? `Yours · ${esc(vis.label)}` : "Gradify"}</span><span class="cx-done" data-done="${esc(it.rid)}"></span></span></span></a>
      <span class="cx-iacts"><button type="button" class="gx-ib" data-org="${esc(it.rid)}" title="Folders and tags" aria-label="Folders and tags for ${esc(it.title)}">${uiIcon("flag")}</button>${c.smart ? "" : `<button type="button" class="gx-ib" data-remove="${esc(it.rid)}" title="Take it out of this folder" aria-label="Take ${esc(it.title)} out of this folder">${uiIcon("close")}</button>`}</span></li>`;
  };
  view.innerHTML = `<section class="cols cx-org-page" style="${colourOf(c.colour) ? `--fc:${colourOf(c.colour)}` : ""}">
    <nav class="cx-crumbs" aria-label="Folders"><ol><li><a href="#/collections">Collections</a></li>${path.map((p, i) => `<li>${i === path.length - 1 ? `<span aria-current="page">${esc(p.name)}</span>` : `<a href="#/collections/${esc(p.id)}">${esc(p.name)}</a>`}</li>`).join("")}</ol></nav>
    <div class="deck-head cx-head"><div>${fIcon(c)}<div><h1>${esc(c.name)}</h1>
      ${c.desc ? `<p class="sub cx-desc">${esc(c.desc)}</p>` : `<p class="sub cx-desc">${c.smart ? "A smart folder: it fills itself." : `${plural(items.length, "item")} from across Gradify. Each opens the real thing: nothing here is a copy.`}</p>`}
      <p class="cx-badges">${c.smart ? `<span class="sx-b">Smart: <code>${esc(c.smart.q)}</code></span>` : ""}${c.archived ? `<span class="sx-b s-draft">Archived ${esc(ago(c.archived))}</span>` : ""}<span class="cx-pw" data-prog1></span></p></div></div>
      <div class="row-actions">
        <button type="button" class="btn btn-ghost lg btn-sm" data-edit>${uiIcon("edit")}<span>Edit</span></button>
        ${c.smart ? "" : `<button type="button" class="btn btn-ghost lg btn-sm" data-sub>${uiIcon("plus")}<span>Folder inside</span></button>`}
        <button type="button" class="btn btn-ghost lg btn-sm" data-arch>${uiIcon("clock")}<span>${c.archived ? "Unarchive" : "Archive"}</span></button>
        <button type="button" class="btn btn-ghost lg btn-sm" data-delete>${uiIcon("trash")}<span>Delete</span></button></div></div>
    ${studyHtml(items)}
    ${subs.length ? `<h2 class="lo-h">Folders</h2><ul class="col-grid cx-folders cx-subs">${subs.sort((a, b) => (a.order ?? 1e9) - (b.order ?? 1e9) || a.name.localeCompare(b.name)).map((x) => `<li class="cx-fold" draggable="true" data-col="${esc(x.id)}" style="${colourOf(x.colour) ? `--fc:${colourOf(x.colour)}` : ""}"><a class="col-card panel glass" href="#/collections/${esc(x.id)}">${fIcon(x)}<span class="cx-ft"><b>${esc(x.name)}</b><small>${x.smart ? "Smart" : plural(itemsOf(x.id).length, "item")}</small><span class="cx-pw" data-prog="${esc(x.id)}"></span></span></a></li>`).join("")}</ul>` : ""}
    ${items.length ? `<div class="cx-bar cx-ibar">
        <label class="cx-find">${uiIcon("search")}<span class="sr-only">Find in this folder</span><input type="search" placeholder="Find in this folder" data-findi></label>
        <span class="cx-kinds" role="group" aria-label="Show">${kinds.length > 1 ? `<button type="button" data-k="" aria-pressed="true">All</button>${kinds.map((k) => `<button type="button" data-k="${esc(k)}" aria-pressed="false">${uiIcon(kindIcon(k))}${esc(KINDS[k]?.[0] || k)}</button>`).join("")}` : ""}</span>
        ${tagsHere.length ? `<label class="cx-sort"><span class="sr-only">Tag</span><select data-tagf><option value="">Any tag</option>${tagsHere.map((t) => `<option value="${esc(t)}">#${esc(t)}</option>`).join("")}</select></label>` : ""}
        <label class="cx-chk"><input type="checkbox" data-notdone> Not finished</label>
        ${sortSel([...(c.smart ? [["relevance", "Best match"]] : [["custom", "Your order"]]), ["added", c.smart ? "Recently changed" : "Recently added"], ["title", "Title"], ["type", "Type"]], sortBy)}
        ${viewSel(viewMode)}
        <a class="gx-link" href="#/search?folder=${encodeURIComponent(c.id)}">${uiIcon("search")}Search inside</a>
      </div>
      <ul class="col-items cx-items" data-view="${esc(viewMode)}">${items.map(row).join("")}</ul>
      <p class="cx-none sub" hidden>Nothing here matches.</p>
      ${!c.smart && sortBy === "custom" && items.length > 1 ? `<p class="cx-hint sub">Drag to put things in your order${subs.length ? ", or onto a folder above to move them into it" : ""}. Alt+↑/↓ does it from the keyboard.</p>` : ""}`
      : `<div class="panel glass hist-empty"><h3>${c.smart ? "Nothing matches this search yet" : "Empty for now"}</h3><p class="sub">${c.smart ? `Things that match <code>${esc(c.smart.q)}</code> appear here as soon as there are any.` : "Open a lesson, a flashcard set or a note, choose ••• and then “Save to a folder”. Or drag a folder in from Collections."}</p></div>`}
  </section>`;
  const root = view.querySelector(".cx-org-page");
  const redraw = () => { if (routeKey() === `#/collections/${c.id}`) { const now = collections().find((x) => x.id === c.id); if (now) renderOne(view, now, ctx); else location.hash = "#/collections"; } };
  const rename = () => renameInPlace(view.querySelector(".cx-head h1"), c.name, (t) => { renameCollection(c.id, t); c.name = t; }, { label: "Folder name" });
  const remove = () => del([c], () => { if (routeKey() === `#/collections/${c.id}`) location.hash = c.parent ? `#/collections/${c.parent}` : "#/collections"; else redraw(); }, ctx);
  setPageOps({ rename, duplicate: () => { location.hash = `#/collections/${duplicate(c)}`; }, export: () => exportMd(c, items), delete: remove });
  root.addEventListener("click", (e) => {
    const r = e.target.closest("[data-remove]");
    if (r) { const it = items.find((x) => x.rid === r.dataset.remove); removeFromCollection(c.id, r.dataset.remove); undoable(`Took <b>${esc(it?.title || "it")}</b> out of <b>${esc(c.name)}</b>.`, () => { if (it) addToCollection(c.id, it); redraw(); }, { label: it?.title }); redraw(); return; }
    const o = e.target.closest("[data-org]"); if (o) { const it = items.find((x) => x.rid === o.dataset.org); const m = organiseDialog(resource(it.rid, { title: it.title, href: it.href, sub: it.sub, subject: it.subject }) || it, "tags"); watchClose(m, redraw); return; }
    if (e.target.closest("[data-edit]")) { editFolder(c, { onDone: redraw }); return; }
    if (e.target.closest("[data-sub]")) { newFolder({ parent: c.id }); return; }
    if (e.target.closest("[data-arch]")) { const was = c.archived; archiveFolder(c.id, !was); undoable(was ? `Unarchived <b>${esc(c.name)}</b>.` : `Archived <b>${esc(c.name)}</b>: it's out of the way under Archived, with everything in it.`, () => { archiveFolder(c.id, Boolean(was)); redraw(); }, { label: c.name }); redraw(); return; }
    if (e.target.closest("[data-delete]")) { remove(); return; }
    const k = e.target.closest("[data-k]"); if (k) { root.querySelectorAll("[data-k]").forEach((b) => b.setAttribute("aria-pressed", String(b === k))); filter(); }
  });
  root.addEventListener("change", (e) => {
    if (e.target.matches("[data-sort]")) { setPref(P, `sort:${c.id}`, e.target.value); redraw(); return; }
    if (e.target.matches("[data-tagf], [data-notdone]")) filter();
  });
  root.querySelector("[data-findi]")?.addEventListener("input", filter);
  wireViews(root, (v) => { setPref(P, "itemView", v); root.querySelector(".cx-items")?.setAttribute("data-view", v); });
  let doneMap = new Map();
  function filter() {
    const t = root.querySelector("[data-findi]")?.value.trim().toLowerCase() || "", k = root.querySelector("[data-k][aria-pressed=true]")?.dataset.k || "", tag = root.querySelector("[data-tagf]")?.value || "", nd = root.querySelector("[data-notdone]")?.checked;
    let shown = 0;
    root.querySelectorAll(".cx-item").forEach((li) => {
      const ok = (!t || t.split(/\s+/).every((w) => li.dataset.text.includes(w))) && (!k || li.dataset.kind === k) && (!tag || li.dataset.tags.split(" ").includes(tag)) && (!nd || doneMap.get(li.dataset.rid) !== true);
      li.hidden = !ok; if (ok) shown++;
    });
    const none = root.querySelector(".cx-none"); if (none) none.hidden = shown > 0;
  }
  // drag items: into your order, or onto a folder
  const list = root.querySelector(".cx-items");
  if (list && !c.smart) wireItemDrag(list, root.querySelector(".cx-subs"), { c, items, ordered: sortBy === "custom" ? items.map((x) => x.rid) : null, redraw });
  wireFolderDrag(root.querySelector(".cx-subs"), { all, redraw, toast: ctx.toast, ordered: null });
  // several things at once
  if (items.length > 1 && list) {
    const pick = (rids) => items.filter((x) => rids.includes(x.rid));
    const head = document.createElement("div"); head.className = "gx-ms-head"; list.before(head);
    const moveOrCopy = async (rids, move) => {
      const to = await pickCollection({ title: `${move ? "Move" : "Copy"} ${rids.length} to…`, exclude: c.id }); if (!to) return;
      const name = collections().find((x) => x.id === to)?.name || "the folder", xs = pick(rids), undo = fileMany(to, xs);
      if (move) xs.forEach((x) => removeFromCollection(c.id, x.rid));
      undoable(`${move ? "Moved" : "Copied"} ${xs.length} to <a href="#/collections/${esc(to)}">${esc(name)}</a>.`, () => { undo(); if (move) xs.forEach((x) => addToCollection(c.id, x)); redraw(); }, { label: `${move ? "moved" : "copied"} to ${name}` });
      redraw();
    };
    mountMultiSelect(list, { item: ".cx-ia", key: (el) => el.dataset.rid, name: (el) => el.querySelector("b")?.textContent || "", toggleHost: head, actions: [
      ...(c.smart ? [] : [{ id: "move", label: "Move to…", icon: "inbox", run: (rids) => moveOrCopy(rids, true) }]),
      { id: "copy", label: c.smart ? "Add to a folder…" : "Copy to…", icon: "copy", run: (rids) => moveOrCopy(rids, false) },
      { id: "tag", label: "Tag…", icon: "flag", run: (rids) => tagDialog(pick(rids), redraw) },
      { id: "export", label: "Export", icon: "download", run: (rids) => exportMd(c, pick(rids)) },
      ...(c.smart ? [] : [{ id: "remove", label: "Remove", icon: "close", run: (rids) => { const xs = pick(rids); xs.forEach((x) => removeFromCollection(c.id, x.rid)); undoable(`Took ${xs.length} out of <b>${esc(c.name)}</b>.`, () => { xs.forEach((x) => addToCollection(c.id, x)); redraw(); }, { label: `removed ${xs.length}` }); redraw(); } }]),
    ] });
  }
  // progress, from what Gradify knows about each thing
  knownDocs(store).then((docs) => {
    if (!root.isConnected) return;
    const mine = [...items, ...descendants(all, c.id).flatMap((d) => itemsOf(d.id))];
    const p = progressOf(mine, docs), going = p.going ? ` · ${p.going} in progress` : "";
    const last = Math.max(0, ...items.map((x) => x.added || 0));
    root.querySelector("[data-prog1]").innerHTML = p.can ? `${barHtml(p, "Progress")}<small>${going}${last ? ` · last added ${esc(ago(last))}` : ""}</small>` : last ? `<small>Last added ${esc(ago(last))}</small>` : "";
    for (const el of root.querySelectorAll("[data-prog]")) el.innerHTML = barHtml(progressOf([el.dataset.prog, ...descendants(all, el.dataset.prog).map((d) => d.id)].flatMap((x) => itemsOf(x)), docs), "Progress");
    doneMap = new Map(items.map((it) => [it.rid, docs.get(it.rid)?.done ?? null]));
    for (const el of root.querySelectorAll("[data-done]")) { const d = doneMap.get(el.dataset.done); el.textContent = d === true ? "Done" : ""; el.classList.toggle("on", d === true); }
  });
}
function watchClose(m, f) { const t = setInterval(() => { if (!m.box.isConnected) { clearInterval(t); f(); } }, 250); }
/** tag several things at once (from a folder, or the Library's selection) */
export function tagDialog(rs, after = () => {}) {
  const known = allTags().map((t) => t.tag);
  const m = openModal({ title: `Tag ${plural(rs.length, "thing")}`, body: `<form class="gx-ra-tag"><label class="sr-only" for="cx-bt">Tag</label><input id="cx-bt" list="cx-btl" placeholder="e.g. priority" maxlength="32" required><datalist id="cx-btl">${known.map((t) => `<option value="${esc(t)}">`).join("")}</datalist></form>
    <p class="gx-org-sug">${[...new Set([...known.slice(0, 8), "difficult", "priority", "homework", "memorise"])].slice(0, 10).map((t) => `<button type="button" class="gx-chip" data-t="${esc(t)}">#${esc(t)}</button>`).join("")}</p>`,
    actions: [{ label: "Cancel" }, { label: "Add the tag", primary: true, run: () => go(m.box.querySelector("#cx-bt").value) }] });
  const go = (v) => { const t = normTag(v); if (!t) return false; const undo = tagMany(rs.map((x) => ({ rid: x.rid, kind: x.kind, title: x.title, href: x.href, sub: x.sub })), t); m.close(); undoable(`Tagged ${plural(rs.length, "thing")} <b>#${esc(t)}</b>.`, () => { undo(); after(); }, { label: `#${t}` }); after(); };
  m.box.addEventListener("click", (e) => { const b = e.target.closest("[data-t]"); if (b) go(b.dataset.t); });
  m.box.addEventListener("submit", (e) => { e.preventDefault(); go(m.box.querySelector("#cx-bt").value); });
  setTimeout(() => m.box.querySelector("input")?.focus(), 40);
}
function wireItemDrag(list, subs, { c, items, ordered, redraw }) {
  let from = null;
  list.addEventListener("dragstart", (e) => { const li = e.target.closest(".cx-item"); if (!li) return; from = li.dataset.rid; e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", items.find((x) => x.rid === from)?.title || ""); li.classList.add("drag"); });
  list.addEventListener("dragover", (e) => { const li = e.target.closest(".cx-item"); if (!from || !li || !ordered) return; e.preventDefault(); list.querySelectorAll(".drop-before").forEach((x) => x.classList.remove("drop-before")); if (li.dataset.rid !== from) li.classList.add("drop-before"); });
  list.addEventListener("drop", (e) => { const li = e.target.closest(".cx-item"); if (!from || !li || !ordered) return; e.preventDefault(); const was = ordered.slice(); setItemOrder(c.id, reorder(ordered, from, li.dataset.rid)); undoable("Moved it.", () => { setItemOrder(c.id, was); redraw(); }, { label: "order" }); from = null; redraw(); });
  list.addEventListener("dragend", () => { from = null; document.querySelectorAll(".drag, .drop-before, .drop-in").forEach((x) => x.classList.remove("drag", "drop-before", "drop-in")); });
  // onto a folder above: move it there
  subs?.addEventListener("dragover", (e) => { const li = e.target.closest(".cx-fold"); if (!from || !li) return; e.preventDefault(); e.stopPropagation(); subs.querySelectorAll(".drop-in").forEach((x) => x.classList.remove("drop-in")); li.classList.add("drop-in"); }, true);
  subs?.addEventListener("drop", (e) => {
    const li = e.target.closest(".cx-fold"); if (!from || !li) return; e.preventDefault(); e.stopPropagation();
    const it = items.find((x) => x.rid === from), to = li.dataset.col, name = li.querySelector("b")?.textContent || "the folder";
    addToCollection(to, it); removeFromCollection(c.id, it.rid);
    undoable(`Moved <b>${esc(it.title)}</b> into <b>${esc(name)}</b>.`, () => { removeFromCollection(to, it.rid); addToCollection(c.id, it); redraw(); }, { label: it.title });
    from = null; redraw();
  }, true);
  list.addEventListener("keydown", (e) => {
    const li = e.target.closest(".cx-item"); if (!li || !ordered || !e.altKey || !["ArrowUp", "ArrowDown"].includes(e.key)) return;
    e.preventDefault(); const i = ordered.indexOf(li.dataset.rid), j = i + (e.key === "ArrowUp" ? -1 : 1); if (j < 0 || j >= ordered.length) return;
    const next = ordered.slice(); next.splice(i, 1); next.splice(j, 0, li.dataset.rid); setItemOrder(c.id, next); redraw();
    setTimeout(() => document.querySelector(`.cx-item[data-rid="${CSS.escape(li.dataset.rid)}"] a`)?.focus(), 0);
  });
}

// ---------- tags ----------
function renderTags(view, ctx) {
  const tags = allTags();
  view.innerHTML = `<section class="cols cx-org-page"><nav class="cx-crumbs" aria-label="Folders"><ol><li><a href="#/collections">Collections</a></li><li><span aria-current="page">Tags</span></li></ol></nav>
    <div class="deck-head"><div><h1>Tags</h1><p class="sub">Your own labels for what something is like: difficult, priority, homework. Add them from any ••• menu, or to several things at once from a folder. A tag isn't a folder: it doesn't say where something is kept.</p></div></div>
    ${tags.length ? `<ul class="cx-taglist">${tags.map((t) => `<li><a class="gx-tagc" href="#/collections/tag/${encodeURIComponent(t.tag)}">#${esc(t.tag)}</a><small>${plural(t.n, "thing")}</small><button type="button" class="gx-link" data-ren="${esc(t.tag)}">Rename</button><button type="button" class="gx-link" data-del="${esc(t.tag)}">Delete</button></li>`).join("")}</ul>`
      : `<div class="panel glass hist-empty"><h3>No tags yet</h3><p class="sub">Choose ••• on a lesson, a set or a note, then “Tags”.</p></div>`}</section>`;
  view.querySelector(".cols").addEventListener("click", (e) => {
    const r = e.target.closest("[data-ren]"); if (r) { const to = prompt(`Rename #${r.dataset.ren} to`, r.dataset.ren); if (to && normTag(to)) { const n = renameTag(r.dataset.ren, to); ctx.toast?.(`Renamed on ${plural(n, "thing")}.`); renderTags(view, ctx); } return; }
    const d = e.target.closest("[data-del]"); if (d) { const undo = deleteTag(d.dataset.del); undoable(`Deleted the tag <b>#${esc(d.dataset.del)}</b>. The things it was on are unchanged.`, () => { undo(); renderTags(view, ctx); }, { label: `#${d.dataset.del}` }); renderTags(view, ctx); }
  });
}
function renderTag(view, tag, ctx) {
  const t = normTag(tag), items = withTag(t);
  view.innerHTML = `<section class="cols cx-org-page"><nav class="cx-crumbs" aria-label="Folders"><ol><li><a href="#/collections">Collections</a></li><li><a href="#/collections/tags">Tags</a></li><li><span aria-current="page">#${esc(t)}</span></li></ol></nav>
    <div class="deck-head"><div><h1>#${esc(t)}</h1><p class="sub">${plural(items.length, "thing")} tagged #${esc(t)}. <a href="#/search?q=${encodeURIComponent(`tag:${t}`)}">Search with this tag</a> · <button type="button" class="gx-link" data-smartof>Make a smart folder of it</button></p></div></div>
    ${items.length ? `<ul class="col-items cx-items" data-view="list">${items.map((it) => `<li class="cx-item"><a class="cx-ia" href="${esc(local(it.href))}"><span class="hist-ic" aria-hidden="true">${uiIcon(kindIcon(it.kind))}</span><span class="hist-t"><b>${esc(it.title)}</b><small>${esc([KINDS[it.kind]?.[0], it.sub].filter(Boolean).join(" · "))}</small><span class="cx-meta">${it.tags.map((x) => `<span class="gx-tagc sm">#${esc(x)}</span>`).join("")}</span></span></a><span class="cx-iacts"><button type="button" class="gx-ib" data-untag="${esc(it.rid)}" title="Remove the tag" aria-label="Remove #${esc(t)} from ${esc(it.title)}">${uiIcon("close")}</button></span></li>`).join("")}</ul>`
      : `<div class="panel glass hist-empty"><h3>Nothing has this tag now</h3></div>`}</section>`;
  view.querySelector(".cols").addEventListener("click", (e) => {
    if (e.target.closest("[data-smartof]")) { const id = createFolder({ name: `#${t}`, smart: `tag:${t}`, icon: "sparkles" }); location.hash = `#/collections/${id}`; return; }
    const u = e.target.closest("[data-untag]"); if (!u) return;
    const it = items.find((x) => x.rid === u.dataset.untag), before = tagsOf(it.rid);
    setTags(it, before.filter((x) => x !== t)); undoable(`Removed #${esc(t)} from <b>${esc(it.title)}</b>.`, () => { setTags(it, before); renderTag(view, t, ctx); }, { label: it.title }); renderTag(view, t, ctx);
  });
}

// ---------- recently deleted ----------
function renderTrash(view, ctx) {
  const list = trash();
  view.innerHTML = `<section class="cols cx-org-page"><nav class="cx-crumbs" aria-label="Folders"><ol><li><a href="#/collections">Collections</a></li><li><span aria-current="page">Recently deleted</span></li></ol></nav>
    <div class="deck-head"><div><h1>Recently deleted</h1><p class="sub">Deleted folders and flashcard sets wait here for 30 days, on this device, and then go for good. Restoring a folder brings back the folders inside it and what was in them.</p></div></div>
    ${list.length ? `<ul class="cx-trash">${list.map((x) => `<li><span class="hist-ic" aria-hidden="true">${uiIcon(x.kind === "pack" ? "cards" : "inbox")}</span><span class="hist-t"><b>${esc(x.label)}</b><small>${esc(x.kind === "pack" ? `Flashcard set · ${plural(x.n || 0, "card")}` : `${plural(x.n || 1, "folder")} · ${plural(x.items || 0, "item")}`)} · deleted ${esc(ago(x.at))} · ${plural(x.daysLeft, "day")} left</small></span>
        <button type="button" class="btn btn-ghost btn-sm" data-restore="${esc(x.id)}">${uiIcon("undo")}<span>Restore</span></button><button type="button" class="gx-link" data-purge="${esc(x.id)}">Delete now</button></li>`).join("")}</ul>`
      : `<div class="panel glass hist-empty"><h3>Nothing deleted recently</h3><p class="sub">Folders and flashcard sets you delete wait here for 30 days.</p></div>`}</section>`;
  view.querySelector(".cols").addEventListener("click", async (e) => {
    const r = e.target.closest("[data-restore]");
    if (r) {
      const entry = fromTrash(r.dataset.restore); if (!entry) return;
      if (entry.kind === "pack") { try { await ctx.restorePack?.(entry); ctx.toast?.(`Restored <b>${esc(entry.label)}</b>.`); } catch (err) { const { toTrash } = await import("../data/organise.js"); toTrash(entry); ctx.toast?.(`Couldn't restore it: ${esc(err.message || "try again")}`); } }
      else { restoreFolders(entry); ctx.toast?.(`Restored <b>${esc(entry.label)}</b>.`); }
      renderTrash(view, ctx); return;
    }
    const p = e.target.closest("[data-purge]"); if (p && confirm("Delete it for good? This can't be undone.")) { fromTrash(p.dataset.purge); renderTrash(view, ctx); }
  });
}
