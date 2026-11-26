// Gradify Notes (app.html#/notes): the knowledge base's screens. An outliner where every bullet can be a flashcard,
// a reference, a document, a portal, an image, a drawing, a table or a PDF. The model is kit/notes/kb/model.js;
// blocks (images, occlusion, drawings, tables, PDFs) are view-blocks.js, flashcards and exams view-study.js, and AI,
// guided learning, import, export and sharing view-learn.js.
//
// Routes:  #/notes                     the last document opened (or the welcome document)
//          #/notes/<rem id>            a document, or any bullet zoomed in as a page
//          #/notes/daily[/YYYY-MM-DD]  a day's daily document     #/notes/tasks     every to-do
//          #/notes/tag/<key>           a tag: its rems as a table, its properties and whether they make cards
//          #/notes/cards, exams, exam/<id>, pdf/<id>, guided/<id>, ask, io, shared/<id>, help
import * as M from "./model.js";
import * as S from "./store.js";
import { icon } from "../../core/icons.js";
import { resource as gResource, rid as gRid, hrefOf } from "../../core/resource.js";
import { link as gLink, linksOf } from "../../data/links.js";
import { runResourceAction } from "../../ui/resource-actions.js";
// this page as a universal resource (kit/core/resource.js), for links, collections, the plan and history
const noteRes = (id) => gResource(gRid("note", id), { title: M.nameOf(kb, id) || "Untitled", sub: "Note in Gradify Notes", href: `${location.pathname}#/notes/${id}` });

const { esc } = M;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const lazy = { blocks: () => import("./view-blocks.js"), study: () => import("./view-study.js"), learn: () => import("./view-learn.js") };

let ctx = null, kb = null, host = null, root = null, editing = null, sel = new Set(), anchor = null;
const hist = { undo: [], redo: [] };
let menu = null, cardTimer = 0, dirtyWhileEditing = false;

// ---------- the shared pieces every screen uses ----------
export const api = {
  get kb() { return kb; }, get ctx() { return ctx; }, get root() { return root; },
  change, save: () => S.save(), redraw: () => drawTree(), rerender: () => render(), toast: (m) => ctx.toast(m), esc, icon,
  modal, closeModal, pick, open: (id) => { location.hash = `#/notes/${id}`; }, practise, syncCardsNow,
};
/** Runs a change to the knowledge base as one undoable step, saves it, and redraws. */
function change(fn, { draw = "tree", focus = null } = {}) {
  M.begin(kb);
  let out;
  try { out = fn(); } finally {
    const step = M.commit(kb);
    if (step) { hist.undo.push(step); if (hist.undo.length > 200) hist.undo.shift(); hist.redo = []; S.save(); scheduleCards(); }
  }
  if (draw === "tree") drawTree();
  else if (draw === "page") render();
  if (focus) edit(focus.id, focus.caret ?? "end", focus.via ?? "");
  return out;
}
function doUndo(redo = false) {
  finishEdit({ draw: false });
  const from = redo ? hist.redo : hist.undo, to = redo ? hist.undo : hist.redo;
  const step = from.pop(); if (!step) { ctx.toast(redo ? "Nothing to redo." : "Nothing to undo."); return; }
  to.push(M.undo(kb, step)); S.save(); scheduleCards();
  if (!kb.rems[root]) { location.hash = "#/notes"; return; }
  drawTree();
}
function scheduleCards() { clearTimeout(cardTimer); cardTimer = setTimeout(() => syncCardsNow().catch(() => {}), 2500); }
async function syncCardsNow() {
  clearTimeout(cardTimer);
  const { syncCards } = await import("./bridge.js");
  const r = await syncCards(ctx.store, kb, { site: ctx.site });
  S.save();
  return r;
}
/** Opens a practice session in the app's revision screen: `what` is a rem id, "exam:<id>" or "sel:<ids>". */
async function practise(what, mode = "due") {
  ctx.toast("Getting your cards ready…");
  try { await syncCardsNow(); } catch (e) { ctx.toast(`Couldn't get the cards ready: ${esc(e.message)}`); return; }
  location.hash = `#/study/kb:${encodeURIComponent(`${what}|${mode}`)}`;
}

// ---------- entry ----------
export async function renderNotesKb(view, context) {
  ctx = context; host = view;
  // the stylesheet first, so the page is measured (titles sized) with it
  if (!document.querySelector("link[data-kb-css]")) await new Promise((ok) => { const l = document.createElement("link"); l.rel = "stylesheet"; l.href = new URL("./kb.css", import.meta.url).href; l.dataset.kbCss = ""; l.onload = l.onerror = ok; document.head.append(l); setTimeout(ok, 3000); });
  kb = S.load();
  if (!renderNotesKb.connected) {
    renderNotesKb.connected = true;
    S.onChange((next) => { kb = next; if (!location.hash.startsWith("#/notes")) return; if (editing) dirtyWhileEditing = true; else render(); });
    S.connect(ctx.store).then(() => { kb = S.load(); }).catch(() => {});
    addEventListener("keydown", globalKeys);
    addEventListener("hashchange", () => { if (!location.hash.startsWith("#/notes")) { finishEdit({ draw: false }); closeMenu(); } });
    import("./bridge.js").then(({ syncCards }) => syncCards(ctx.store, kb, { site: ctx.site })).then(() => S.save()).catch(() => {});
  }
  return render();
}
const parts = () => location.hash.replace(/^#\/?notes\/?/, "").split("?")[0].split("/").filter(Boolean).map(decodeURIComponent);
async function render() {
  kb = S.load();
  editing = null; sel.clear(); closeMenu();
  const [a, b] = parts();
  host.innerHTML = `<div class="kb${kb.settings.simple ? " simple" : ""}">${sideHtml()}<div class="kb-main" id="kb-main"></div></div>`;
  wireSide();
  const main = $("#kb-main");
  const special = { cards: "study", exams: "study", exam: "study", pdf: "blocks", guided: "learn", ask: "learn", io: "learn", shared: "learn" };
  if (special[a]) { root = null; return (await lazy[special[a]]()).screen(a, b, main, api); }
  // #/notes/from/<resource id>?t=<title>: notes on a lesson (or any resource). The page made from it before opens
  // again; otherwise a new document, titled after it, that remembers where it came from (a "made from" link)
  if (a === "from" && b) {
    const made = linksOf(b).find((x) => x.by === "source" && x.dir === "made-into" && x.other.kind === "note" && kb.rems[x.other.rid.slice(5)]);
    if (made) { location.replace(`#/notes/${made.other.rid.slice(5)}`); return; }
    const title = new URLSearchParams(location.hash.split("?")[1] || "").get("t") || "Notes";
    const r = change(() => M.create(kb, { text: title, doc: true, parent: null }), { draw: "none" });
    gLink(noteRes(r.id), gResource(b, { title, href: hrefOf(b) }), { by: "source" });
    location.replace(`#/notes/${r.id}`); return;
  }
  if (a === "tasks") return tasksScreen(main);
  if (a === "tag") return tagScreen(main, b);
  if (a === "help") return helpScreen(main);
  if (a === "daily") { const d = M.dailyDoc(kb, b && M.DATE_RE.test(b) ? b : M.dayKey()); S.save(); return openPage(main, d.id); }
  if (a && kb.rems[a]) return openPage(main, a);
  if (a) { main.innerHTML = `<div class="kb-empty"><h2>This note isn't here</h2><p class="sub">It may have been deleted, or it's in notes on another device that haven't arrived yet.</p><a class="btn btn-ghost lg btn-sm" href="#/notes"><span>Back to your notes</span></a></div>`; return; }
  const last = kb.recent.find((x) => kb.rems[x] && M.isDoc(kb.rems[x])) || kb.roots.find((x) => M.isDoc(kb.rems[x]) && !kb.rems[x].dailyRoot);
  if (last) { history.replaceState(null, "", `#/notes/${last}`); return openPage(main, last); }
  main.innerHTML = `<div class="kb-empty"><h2>Your notes</h2><p class="sub">Start a document, or open today's daily document.</p><div class="row-actions"><button class="btn btn-primary lg" type="button" data-act="new-doc"><span>New document</span></button><a class="btn btn-ghost lg" href="#/notes/daily"><span>Today</span></a></div></div>`;
}

// ---------- the sidebar ----------
function sideHtml() {
  const open = new Set(kb.settings.open || []);
  const tree = (parent, depth) => M.kidsOf(kb, parent).filter(M.isDoc).map((r) => {
    const kids = M.kidsOf(kb, r.id).filter(M.isDoc), isOpen = open.has(r.id);
    return `<li data-id="${r.id}"><div class="kb-doc-row${parts()[0] === r.id ? " on" : ""}" style="--d:${depth}" data-drop="${r.id}">${kids.length ? `<button type="button" class="kb-twisty" data-act="twisty" data-id="${r.id}" aria-expanded="${isOpen}" aria-label="${isOpen ? "Close" : "Open"} ${esc(M.nameOf(kb, r.id))}">${isOpen ? "▾" : "▸"}</button>` : `<span class="kb-twisty-sp"></span>`}<a href="#/notes/${r.id}" draggable="true" data-drag="${r.id}">${r.folder ? "🗂" : r.daily ? "📅" : r.pdf ? "📄" : "📝"} <span>${esc(M.nameOf(kb, r.id))}</span></a></div>${kids.length && isOpen ? `<ul>${tree(r.id, depth + 1)}</ul>` : ""}</li>`;
  }).join("");
  const due = S.status;
  const pinned = kb.pinned.filter((x) => kb.rems[x]), recent = kb.recent.filter((x) => kb.rems[x] && !pinned.includes(x)).slice(0, 5);
  const link = (href, ic, label, extra = "") => `<a class="kb-nav${location.hash === href || (href !== "#/notes" && location.hash.startsWith(href)) ? " on" : ""}" href="${href}">${icon(ic)}<span>${label}</span>${extra}</a>`;
  const nTasks = M.tasks(kb).filter((t) => !t.due || t.due <= M.dayKey()).length;
  return `<aside class="kb-side glass" aria-label="Notes">
    <button type="button" class="kb-search-btn" data-act="search">${icon("star")}<span>Search</span><kbd>Ctrl K</kbd></button>
    <nav class="kb-navs">
      ${link("#/notes/daily", "calendar", "Today")}
      ${link("#/notes/cards", "layers", "Flashcards")}
      ${link("#/notes/exams", "flame", "Exams")}
      ${link("#/notes/tasks", "checklist", "Tasks", nTasks ? `<b class="kb-count">${nTasks}</b>` : "")}
      ${link("#/notes/ask", "bulb", "Ask your notes")}
      ${link("#/notes/io", "upload", "Import and export")}
      <a class="kb-nav" href="#/library">${icon("book")}<span>Study packs</span></a>
    </nav>
    ${pinned.length ? `<h4>Pinned</h4><ul class="kb-mini">${pinned.map((x) => `<li><a href="#/notes/${x}">${esc(M.nameOf(kb, x))}</a></li>`).join("")}</ul>` : ""}
    ${recent.length ? `<h4>Recent</h4><ul class="kb-mini">${recent.map((x) => `<li><a href="#/notes/${x}">${esc(M.nameOf(kb, x))}</a></li>`).join("")}</ul>` : ""}
    <h4>Documents <span class="kb-side-acts"><button type="button" class="icon-btn" data-act="new-doc" aria-label="New document" title="New document">+</button><button type="button" class="icon-btn" data-act="new-folder" aria-label="New folder" title="New folder">🗂</button></span></h4>
    <ul class="kb-docs" data-drop-root>${tree(null, 0)}</ul>
    <div class="kb-side-foot">
      <label class="check"><input type="checkbox" data-act="simple" ${kb.settings.simple ? "checked" : ""}> <span>Simple view</span></label>
      <span class="kb-sync" title="${due.mode === "cloud" ? "Kept in your Gradify account" : "Kept on this device"}">${due.mode === "cloud" ? (due.note === "offline" ? "Offline: saved here" : due.note === "too-big" ? "Too big to sync" : "Synced") : "On this device"}</span>
      <a href="#/notes/help" class="kb-help-link">Shortcuts and syntax</a>
    </div>
  </aside>`;
}
function wireSide() {
  const side = $(".kb-side", host);
  side.addEventListener("click", (e) => {
    const b = e.target.closest("[data-act]"); if (!b) return;
    const act = b.dataset.act;
    if (act === "search") return palette();
    if (act === "new-doc" || act === "new-folder") {
      const r = change(() => M.create(kb, { text: act === "new-folder" ? "New folder" : "", [act === "new-folder" ? "folder" : "doc"]: true, parent: act === "new-doc" && kb.rems[root]?.folder ? root : null }), { draw: "none" });
      location.hash = `#/notes/${r.id}`;
    }
    if (act === "twisty") { const o = new Set(kb.settings.open || []); o.has(b.dataset.id) ? o.delete(b.dataset.id) : o.add(b.dataset.id); kb.settings.open = [...o]; S.save(); const s = $(".kb-side", host); s.outerHTML = sideHtml(); wireSide(); }
  });
  side.addEventListener("change", (e) => { if (e.target.dataset.act === "simple") { kb.settings.simple = e.target.checked; S.save(); render(); } });
  // drag a document onto another to move it inside; onto the list's empty space to move it to the top level
  side.addEventListener("dragstart", (e) => { const id = e.target.closest("[data-drag]")?.dataset.drag; if (id) { e.dataTransfer.setData("text/gradify-rem", id); e.dataTransfer.effectAllowed = "move"; } });
  side.addEventListener("dragover", (e) => { const t = e.target.closest("[data-drop], [data-drop-root]"); if (t && e.dataTransfer.types.includes("text/gradify-rem")) { e.preventDefault(); $$(".drop-on", side).forEach((x) => x.classList.remove("drop-on")); t.classList.add("drop-on"); } });
  side.addEventListener("dragleave", (e) => e.target.closest?.("[data-drop]")?.classList.remove("drop-on"));
  side.addEventListener("drop", (e) => {
    const id = e.dataTransfer.getData("text/gradify-rem"), t = e.target.closest("[data-drop], [data-drop-root]");
    $$(".drop-on", side).forEach((x) => x.classList.remove("drop-on"));
    if (!id || !t) return;
    e.preventDefault();
    const to = t.dataset.drop || null;
    if (to === id) return;
    const ok = change(() => M.move(kb, id, to), { draw: "none" });
    if (ok === false) ctx.toast("A note can't go inside itself.");
    else ctx.toast(`Moved to ${to ? esc(M.nameOf(kb, to)) : "the top level"}.`);
    render();
  });
}

// ---------- a page: a document or a zoomed-in bullet ----------
function openPage(main, id) {
  root = id;
  M.visit(kb, id); S.save();
  const r = kb.rems[id];
  const crumbs = M.ancestors(kb, id).map((a) => `<a href="#/notes/${a}">${esc(M.nameOf(kb, a))}</a>`).join("<span>›</span>");
  main.innerHTML = `<div class="kb-page" data-root="${id}">
    <div class="kb-top">
      <nav class="kb-crumbs" aria-label="Where this is">${crumbs || '<a href="#/notes">Notes</a>'}</nav>
      <div class="kb-acts">
        <button type="button" class="btn btn-light lg btn-sm" data-act="practise"><span>Practise</span></button>
        <button type="button" class="btn btn-ghost lg btn-sm kb-menu-btn" data-act="menu-ai" aria-haspopup="menu">${icon("sparkles")}<span>Learn</span></button>
        <button type="button" class="btn btn-ghost lg btn-sm kb-menu-btn" data-act="menu-more" aria-haspopup="menu" aria-label="More"><span>⋯</span></button>
      </div>
    </div>
    ${r.daily ? `<div class="kb-days">${[-1, 1].map((d) => { const k = M.dayKey(new Date(`${r.daily}T12:00:00`).getTime() + d * 864e5); return `<a href="#/notes/daily/${k}">${d < 0 ? "← " : ""}${esc(M.dayTitle(k))}${d > 0 ? " →" : ""}</a>`; }).join("")}</div>` : ""}
    <textarea class="kb-title" rows="1" placeholder="Untitled" aria-label="Title">${esc(r.daily && !r.text ? M.dayTitle(r.daily) : M.toEdit(kb, r.text))}</textarea>
    <div class="kb-meta" id="kb-meta"></div>
    <ul class="kb-tree" id="kb-tree" role="tree" aria-label="${esc(M.nameOf(kb, id))}"></ul>
    <button type="button" class="kb-add" data-act="add">+ Add a bullet</button>
    <div class="kb-selbar" id="kb-selbar" hidden></div>
    <div class="kb-mobile-bar" id="kb-mbar" hidden>${[["outdent", "⇤", "Outdent"], ["indent", "⇥", "Indent"], ["up", "↑", "Move up"], ["down", "↓", "Move down"], ["todo", "☐", "To-do"], ["card", "→", "Flashcard"], ["cloze", "{ }", "Cloze"], ["slash", "/", "Insert"], ["undo", "↶", "Undo"], ["done", "Done", "Stop editing"]].map(([a, t, l]) => `<button type="button" data-m="${a}" aria-label="${l}" title="${l}">${t}</button>`).join("")}</div>
    <section class="kb-refs" id="kb-refs"></section>
  </div>`;
  const title = $(".kb-title", main);
  autosize(title); document.fonts?.ready.then(() => autosize(title));
  if (r.daily && !r.text) title.readOnly = true;
  title.addEventListener("input", () => autosize(title));
  title.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); saveTitle(); const first = r.kids[0]; if (first) edit(first, "start"); else addBullet(); } });
  title.addEventListener("blur", saveTitle);
  main.addEventListener("click", pageClick);
  wireTree($("#kb-tree", main));
  $("#kb-mbar", main).addEventListener("pointerdown", mobileBar);
  drawTree();
  if (!r.kids.length && !r.daily) setTimeout(() => (r.text ? addBullet() : title.focus()), 30);
}
function saveTitle() {
  const t = $(".kb-title", host); if (!t || t.readOnly) return;
  const r = kb.rems[root]; if (!r) return;
  if (t.value === M.toEdit(kb, r.text)) return;
  change(() => M.update(kb, root, { text: M.fromEdit(kb, t.value, { before: r.text }).text }), { draw: "none" });
  const s = $(".kb-side", host); if (s) { s.outerHTML = sideHtml(); wireSide(); }
}
const autosize = (t) => { t.style.height = "auto"; t.style.height = `${t.scrollHeight}px`; };

// ---------- the outline ----------
function drawTree() {
  const tree = $("#kb-tree", host); if (!tree || !kb.rems[root]) return;
  const keep = editing ? { ...editing, caret: $(".kb-edit", tree)?.selectionStart ?? "end", value: $(".kb-edit", tree)?.value } : null;
  tree.innerHTML = kidsHtml(root, 0, "", new Set([root]));
  drawMeta(); drawRefs(); drawSelbar();
  typeset(tree);
  lazy.blocks().then((b) => b.hydrate(tree, api)).catch(() => {});
  if (keep && kb.rems[keep.id]) { editing = null; edit(keep.id, keep.caret, keep.via, keep.value); }
  else editing = null;
}
function kidsHtml(id, depth, via, seen) {
  const r = kb.rems[id]; if (!r) return "";
  let n = 0;
  return r.kids.map((k) => kb.rems[k] ? remHtml(k, depth, via, seen, r.list === "number" ? ++n : 0) : "").join("");
}
function remHtml(id, depth, via, seen, number) {
  const r = kb.rems[id];
  const kids = r.kids.filter((k) => kb.rems[k]);
  const cards = M.cardsOf(kb, id);
  const isPortal = Boolean(r.portal);
  const cls = ["kb-line", r.heading ? `h${r.heading}` : "", r.todo === "done" ? "done" : "", sel.has(id) ? "selected" : "", r.colour ? `c-${r.colour}` : "", r.cards === "off" ? "cards-off" : ""].filter(Boolean).join(" ");
  const tagsOf = M.tagsIn(r.text).map((t) => kb.tagDefs[t]).filter((d) => d?.schema?.length);
  const schema = [...new Set(tagsOf.flatMap((d) => d.schema))];
  const props = { ...Object.fromEntries(schema.map((k) => [k, ""])), ...(r.props || {}) };
  const body = M.isDoc(r) && depth >= 0 && id !== root
    ? `<a class="kb-doclink" href="#/notes/${id}">${r.folder ? "🗂" : "📝"} ${esc(M.nameOf(kb, id))}</a>`
    : `<div class="kb-text" data-id="${id}" data-via="${via}" tabindex="0">${r.text || r.daily ? M.inlineHtml(kb, r.text) : `<span class="kb-ph">${r.image || r.table || r.drawing || r.portal || r.embed || r.pdf ? "" : "Empty"}</span>`}</div>`;
  return `<li class="kb-rem" role="treeitem" data-id="${id}" data-via="${via}" ${kids.length ? `aria-expanded="${!r.collapsed}"` : ""}>
    <div class="${cls}" data-id="${id}" data-via="${via}" style="--depth:${depth}">
      ${kids.length && !M.isDoc(r) ? `<button type="button" class="kb-fold" data-act="fold" data-id="${id}" aria-label="${r.collapsed ? "Expand" : "Collapse"}">${r.collapsed ? "▸" : "▾"}</button>` : `<span class="kb-fold-sp"></span>`}
      <a class="kb-bullet${r.collapsed && kids.length ? " has-hidden" : ""}" href="#/notes/${id}" draggable="true" data-drag="${id}" title="Open as a page · drag to move · Shift-click to select" aria-label="Open ${esc(M.nameOf(kb, id))}">${number ? `${number}.` : ""}</a>
      ${r.todo ? `<input type="checkbox" class="kb-todo" data-act="todo" data-id="${id}" ${r.todo === "done" ? "checked" : ""} aria-label="Done">` : ""}
      ${body}
      ${cards.length ? `<button type="button" class="kb-cardchip" data-act="cards" data-id="${id}" title="${cards.length} ${cards.length === 1 ? "flashcard" : "flashcards"}: ${esc(M.CARD_TYPES[cards[0].type])}">${{ basic: "→", reverse: "←", concept: "⇄", descriptor: "›", cloze: "{ }", multi: "↓", list: "1.", mcq: "A)", occlusion: "▣", table: "▦" }[cards[0].type]}${cards.length > 1 ? ` ${cards.length}` : ""}</button>` : ""}
      ${r.src?.kind === "pdf" ? `<a class="kb-src" href="#/notes/pdf/${r.src.rem}/${r.src.page}" title="Open the page this came from">p. ${r.src.page}</a>` : ""}
    </div>
    ${blockHtml(r, via)}
    ${Object.keys(props).length ? `<table class="kb-props" data-id="${id}">${Object.entries(props).map(([k, v]) => `<tr><th>${esc(k)}</th><td><input data-prop="${esc(k)}" data-id="${id}" value="${esc(v)}" aria-label="${esc(k)}" placeholder="—"></td><td><button type="button" class="kb-x" data-act="prop-del" data-id="${id}" data-k="${esc(k)}" aria-label="Remove ${esc(k)}">×</button></td></tr>`).join("")}</table>` : ""}
    ${isPortal ? portalHtml(r, depth, seen) : ""}
    ${kids.length && !r.collapsed && !(M.isDoc(r) && id !== root) ? `<ul class="kb-kids" role="group">${kidsHtml(id, depth + 1, via, seen)}</ul>` : ""}
  </li>`;
}
function portalHtml(r, depth, seen) {
  const t = kb.rems[r.portal];
  if (!t) return `<div class="kb-portal broken">This portal showed a note that's been deleted.</div>`;
  if (seen.has(r.portal) || seen.size > 12) return `<div class="kb-portal">↻ <a href="#/notes/${r.portal}">${esc(M.nameOf(kb, r.portal))}</a> (already shown above)</div>`;
  const next = new Set([...seen, r.portal]);
  return `<div class="kb-portal" data-portal="${r.id}"><div class="kb-portal-head"><a href="#/notes/${r.portal}">↪ ${esc(M.pathOf(kb, r.portal).concat(M.nameOf(kb, r.portal)).join(" › "))}</a><span>Portal: edits here change the original</span></div>
    <ul class="kb-kids">${remHtml(r.portal, depth + 1, r.id, next, 0)}</ul></div>`;
}
function blockHtml(r, via) {
  if (r.image) return `<div class="kb-block kb-image" data-block="image" data-id="${r.id}"></div>`;
  if (r.drawing) return `<div class="kb-block kb-drawing" data-block="drawing" data-id="${r.id}"></div>`;
  if (r.table) return `<div class="kb-block kb-table" data-block="table" data-id="${r.id}"></div>`;
  if (r.pdf) return `<div class="kb-block kb-pdfcard"><a class="btn btn-light lg btn-sm" href="#/notes/pdf/${r.id}"><span>Open ${esc(r.pdf.name || "PDF")}</span></a><span class="sub">${r.pdf.pages || "?"} pages · ${r.kids.length} highlights and notes${r.pdf.file ? "" : " · the file is on another device"}</span><a class="see" href="#/notes/guided/${r.id}">Guided learning</a></div>`;
  if (r.embed) return `<div class="kb-block" data-block="embed" data-id="${r.id}"></div>`;
  if (r.code) return `<pre class="kb-code" data-lang="${esc(r.code)}"><code>${esc(r.text)}</code></pre>`.replace(/^/, "");
  return "";
}
// maths with KaTeX, loaded the first time a page has any
let katexP = null;
function typeset(el) {
  const spans = $$(".kb-math", el); if (!spans.length) return;
  katexP ||= new Promise((ok, no) => {
    const l = document.createElement("link"); l.rel = "stylesheet"; l.href = "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"; document.head.append(l);
    const s = document.createElement("script"); s.src = "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"; s.onload = () => ok(window.katex); s.onerror = () => { katexP = null; no(); }; document.head.append(s);
  });
  katexP.then((K) => { for (const s of spans) { try { K.render(s.textContent, s, { displayMode: s.classList.contains("block"), throwOnError: false }); s.classList.add("done"); } catch { /* shown as written */ } } }).catch(() => {});
}
// properties of the page itself, and its tags
function drawMeta() {
  const r = kb.rems[root], el = $("#kb-meta", host); if (!el) return;
  const tags = M.tagsIn(r.text);
  const cards = M.cardsUnder(kb, root);
  el.innerHTML = `${tags.map((t) => `<a class="kb-tag" href="#/notes/tag/${encodeURIComponent(t)}">#${esc(kb.tagDefs[t]?.name || t)}</a>`).join("")}
    <span class="sub">${cards.length} ${cards.length === 1 ? "flashcard" : "flashcards"}${r.cards === "off" ? " · switched off" : ""}${r.template ? " · template" : ""}${r.daily ? "" : ` · edited ${new Date(r.u).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}`}</span>`;
}
function drawRefs() {
  const el = $("#kb-refs", host); if (!el) return;
  const back = M.backlinks(kb, root), un = M.unlinkedMentions(kb, root, 12);
  const row = (x, extra = "") => `<li><a class="kb-crumb" href="#/notes/${M.docOf(kb, x.id)}">${esc(x.path.join(" › ") || "Top level")}</a><div class="kb-refline"><a href="#/notes/${x.id}">${M.inlineHtml(kb, kb.rems[x.id].text) || esc(M.nameOf(kb, x.id))}</a>${extra}</div></li>`;
  el.innerHTML = `${back.length ? `<details open><summary>Linked references <b>${back.length}</b></summary><ul>${back.map((x) => row(x, x.kind === "portal" ? ' <span class="g-pill info">portal</span>' : "")).join("")}</ul></details>` : ""}
    ${un.length ? `<details><summary>Unlinked mentions <b>${un.length}</b></summary><p class="sub">Notes that mention “${esc(M.nameOf(kb, root))}” without linking it.</p><ul>${un.map((x) => row(x, ` <button type="button" class="btn btn-ghost lg btn-sm" data-act="link-mention" data-id="${x.id}"><span>Link it</span></button>`)).join("")}</ul></details>` : ""}`;
}

// ---------- editing a bullet ----------
/** Starts editing a bullet: its text becomes a text box, with references shown by name. */
function edit(id, caret = "end", via = "", value = null) {
  const tree = $("#kb-tree", host); if (!tree) return;
  if (editing && (editing.id !== id || editing.via !== via)) finishEdit({ draw: false });
  const el = $(`.kb-text[data-id="${id}"][data-via="${via}"]`, tree) || $(`.kb-text[data-id="${id}"]`, tree);
  if (!el) return;
  const r = kb.rems[id];
  const ta = document.createElement("textarea");
  ta.className = "kb-edit"; ta.rows = 1; ta.dataset.id = id; ta.dataset.via = el.dataset.via || "";
  ta.value = value ?? M.toEdit(kb, r.text);
  ta.setAttribute("aria-label", "Bullet text");
  ta.spellcheck = true;
  el.replaceWith(ta);
  editing = { id, via: ta.dataset.via, original: ta.value };
  autosize(ta);
  ta.focus({ preventScroll: false });
  const pos = caret === "end" ? ta.value.length : caret === "start" ? 0 : Math.min(Number(caret) || 0, ta.value.length);
  ta.setSelectionRange(pos, pos);
  ta.addEventListener("input", onInput);
  ta.addEventListener("keydown", onKey);
  ta.addEventListener("blur", () => setTimeout(() => { if (editing?.id === id && document.activeElement !== ta && !menu?.el.contains(document.activeElement) && !$(".kb-modal")) finishEdit(); }, 120));
  ta.addEventListener("paste", onPaste);
  if (matchMedia("(pointer: coarse), (max-width: 760px)").matches) $("#kb-mbar", host).hidden = false;
}
/** Saves the bullet being edited. */
function finishEdit({ draw = true } = {}) {
  const ta = $(".kb-edit", host);
  const was = editing; editing = null; closeMenu();
  const mb = $("#kb-mbar", host); if (mb) mb.hidden = true;
  if (!ta || !was || !kb.rems[was.id]) { if (draw) drawTree(); return; }
  const value = ta.value;
  if (value !== M.toEdit(kb, kb.rems[was.id].text)) {
    change(() => { const { text } = M.fromEdit(kb, value, { before: kb.rems[was.id].text }); M.update(kb, was.id, { text }); }, { draw: "none" });
  }
  if (dirtyWhileEditing) { dirtyWhileEditing = false; render(); return; }
  if (draw) drawTree();
}
const current = () => $(".kb-edit", host);
/** The bullets on screen, in order (portals included), as [{ id, via }]. */
const onScreen = () => $$("#kb-tree .kb-text, #kb-tree .kb-edit", host).map((e) => ({ id: e.dataset.id, via: e.dataset.via || "" }));
function neighbour(d) {
  const list = onScreen(), i = list.findIndex((x) => x.id === editing?.id && x.via === editing?.via);
  return list[i + d] || null;
}
function commitValue() { const ta = current(); if (!ta || !editing) return; const r = kb.rems[editing.id]; if (ta.value !== M.toEdit(kb, r.text)) { const v = ta.value; M.update(kb, editing.id, { text: M.fromEdit(kb, v, { before: r.text }).text }); editing.original = v; } }
function addBullet(after = null, text = "") {
  const parent = after ? kb.rems[after].parent : root;
  const index = after ? kb.rems[parent].kids.indexOf(after) + 1 : null;
  const r = change(() => M.create(kb, { parent, index, text }), { draw: "tree" });
  edit(r.id, "start");
  return r;
}

function onInput(e) {
  const ta = e.target; autosize(ta);
  const before = ta.value.slice(0, ta.selectionStart);
  // the menus: "/" for commands, "[[" for references, "#" for tags, "((" for a portal
  let m;
  if ((m = before.match(/(?:^|\s)\/([\w\- ]{0,24})$/)) && !/https?:\/\/\S*$/.test(before)) return openMenu("slash", m[1], ta, m[0].trimStart().length);
  if ((m = before.match(/\[\[([^\]\n]{0,60})$/))) return openMenu("ref", m[1], ta, m[0].length);
  if ((m = before.match(/\(\(([^)\n]{0,60})$/))) return openMenu("portal", m[1], ta, m[0].length);
  if ((m = before.match(/(?:^|\s)#([\p{L}\p{N}_\-/]{0,40})$/u))) return openMenu("tag", m[1], ta, m[1].length + 1);
  closeMenu();
}
function wrap(ta, l, r = l) {
  const a = ta.selectionStart, b = ta.selectionEnd, v = ta.value;
  if (a === b) { ta.setRangeText(`${l}${r}`, a, b, "end"); ta.setSelectionRange(a + l.length, a + l.length); }
  else ta.setRangeText(`${l}${v.slice(a, b)}${r}`, a, b, "select");
  autosize(ta);
}
function onKey(e) {
  const ta = e.target, id = editing?.id, via = editing?.via; if (!id) return;
  const r = kb.rems[id], mod = e.ctrlKey || e.metaKey;
  if (menu && ["ArrowDown", "ArrowUp", "Enter", "Tab", "Escape"].includes(e.key)) { e.preventDefault(); return menuKey(e.key); }
  const atStart = ta.selectionStart === 0 && ta.selectionEnd === 0, atEnd = ta.selectionStart === ta.value.length;
  if (e.key === "Enter" && !e.shiftKey && !mod && !r.code) {
    e.preventDefault();
    const a = ta.selectionStart, rest = ta.value.slice(ta.selectionEnd);
    ta.value = ta.value.slice(0, a);
    // a bullet that's a heading or open with children: the new one goes first inside it
    const inside = r.kids.length && !r.collapsed && atEnd && !M.isDoc(r);
    const n = change(() => { commitValue(); return inside ? M.create(kb, { parent: id, index: 0, text: M.fromEdit(kb, rest).text }) : M.create(kb, { parent: r.parent, index: kb.rems[r.parent ?? ""]?.kids.indexOf(id) + 1, text: M.fromEdit(kb, rest).text, ...(r.todo ? { todo: "open" } : {}) }); }, { draw: "none" });
    editing = null; drawTree(); edit(n.id, "start", via);
    return;
  }
  if (e.key === "Enter" && mod) { e.preventDefault(); change(() => { commitValue(); M.update(kb, id, { todo: r.todo === "open" ? "done" : r.todo === "done" ? null : "open" }); }, { focus: { id, via, caret: ta.selectionStart } }); return; }
  if (e.key === "Tab") {
    e.preventDefault();
    const caret = ta.selectionStart;
    change(() => { commitValue(); e.shiftKey ? M.outdent(kb, id) : M.indent(kb, id); }, { draw: "none" });
    editing = null; drawTree(); edit(id, caret, via);
    return;
  }
  if (e.key === "Backspace" && atStart && !mod) {
    const prev = neighbour(-1);
    if (!ta.value) {
      if (r.kids.length || r.image || r.table || r.drawing || r.pdf) return;
      e.preventDefault();
      editing = null;
      change(() => M.remove(kb, id), { draw: "none" }); drawTree();
      if (prev) edit(prev.id, "end", prev.via); else $(".kb-title", host)?.focus();
      return;
    }
    if (prev && !kb.rems[prev.id].image && !kb.rems[prev.id].table && !M.isDoc(kb.rems[prev.id])) {
      // join this bullet onto the end of the one above; its children move with it
      e.preventDefault();
      const p = kb.rems[prev.id], joinAt = M.toEdit(kb, p.text).length, text = ta.value;
      editing = null;
      change(() => { const merged = M.fromEdit(kb, M.toEdit(kb, p.text) + text, { before: p.text + r.text }).text; M.update(kb, prev.id, { text: merged }); for (const k of [...r.kids]) M.move(kb, k, prev.id); M.remove(kb, id); }, { draw: "none" });
      drawTree(); edit(prev.id, joinAt, prev.via);
      return;
    }
  }
  if (e.key === "ArrowUp" && !e.altKey && !e.shiftKey && !mod && !ta.value.slice(0, ta.selectionStart).includes("\n")) { const p = neighbour(-1); if (p) { e.preventDefault(); finishEdit({ draw: false }); drawTree(); edit(p.id, "end", p.via); } return; }
  if (e.key === "ArrowDown" && !e.altKey && !e.shiftKey && !mod && !ta.value.slice(ta.selectionEnd).includes("\n")) { const n = neighbour(1); if (n) { e.preventDefault(); finishEdit({ draw: false }); drawTree(); edit(n.id, "start", n.via); } return; }
  if ((e.key === "ArrowUp" || e.key === "ArrowDown") && (e.altKey || (mod && e.shiftKey))) { e.preventDefault(); const caret = ta.selectionStart; change(() => { commitValue(); M.moveBy(kb, id, e.key === "ArrowUp" ? -1 : 1); }, { draw: "none" }); editing = null; drawTree(); edit(id, caret, via); return; }
  if ((e.key === "ArrowUp" || e.key === "ArrowDown") && mod && !e.shiftKey) { e.preventDefault(); change(() => { commitValue(); M.update(kb, id, { collapsed: e.key === "ArrowUp" ? true : null }); }, { focus: { id, via, caret: ta.selectionStart } }); return; }
  if (e.key === "Escape") { e.preventDefault(); finishEdit({ draw: false }); sel = new Set([id]); anchor = id; drawTree(); return; }
  if (mod && !e.altKey) {
    const k = e.key.toLowerCase();
    if (k === "b") { e.preventDefault(); return wrap(ta, "**"); }
    if (k === "i") { e.preventDefault(); return wrap(ta, "*"); }
    if (k === "u") { e.preventDefault(); return wrap(ta, "__"); }
    if (k === "e") { e.preventDefault(); return wrap(ta, "`"); }
    if (k === "h" && e.shiftKey) { e.preventDefault(); return wrap(ta, "=="); }
    if (k === "x" && e.shiftKey) { e.preventDefault(); return wrap(ta, "~~"); }
    if (k === "m" && e.shiftKey) { e.preventDefault(); return wrap(ta, "$"); }
    if (k === "c" && e.shiftKey) { e.preventDefault(); return wrap(ta, "{{", "}}"); }
    if (k === "z" && ta.value === editing.original) { e.preventDefault(); return doUndo(e.shiftKey); }
    if (k === "y" && ta.value === editing.original) { e.preventDefault(); return doUndo(true); }
    if (k === "d") { e.preventDefault(); const n = change(() => { commitValue(); return M.duplicate(kb, id); }, { draw: "none" }); editing = null; drawTree(); edit(n.id, "end", via); return; }
  }
}
function onPaste(e) {
  const t = e.clipboardData?.getData("text/plain") || "";
  const file = [...(e.clipboardData?.files || [])].find((f) => /^image\//.test(f.type));
  if (file) { e.preventDefault(); lazy.blocks().then((b) => b.addImageRem(api, file, { after: editing.id })); return; }
  if (!t.includes("\n")) return;
  // several lines: each becomes a bullet, nested as they were indented
  e.preventDefault();
  lazy.learn().then(async () => {
    const IO = await import("./io.js");
    const items = IO.fromMarkdown(t);
    const id = editing.id, r = kb.rems[id], ta = current();
    const empty = !ta.value.trim();
    editing = null;
    change(() => {
      const made = IO.insertOutline(kb, r.parent, items);
      const at = kb.rems[r.parent].kids.indexOf(id) + 1;
      made.forEach((m, i) => M.move(kb, m, r.parent, at + i));
      if (empty && !r.kids.length) M.remove(kb, id);
    }, { draw: "tree" });
    ctx.toast(`Pasted ${items.length} ${items.length === 1 ? "bullet" : "bullets"}.`);
  });
}

// ---------- clicks on the page ----------
function pageClick(e) {
  const t = e.target;
  const act = t.closest("[data-act]");
  if (act && act.closest(".kb-page")) {
    const a = act.dataset.act, id = act.dataset.id;
    if (a === "fold") { e.preventDefault(); return change(() => M.update(kb, id, { collapsed: !kb.rems[id].collapsed || null }), { draw: "tree" }); }
    if (a === "todo") { return change(() => M.update(kb, id, { todo: act.checked ? "done" : "open" }), { draw: "tree" }); }
    if (a === "add") { const last = kb.rems[root].kids.at(-1); return addBullet(last && !M.isDoc(kb.rems[last]) ? last : null); }
    if (a === "practise") return practiseMenu(act);
    if (a === "menu-ai") return aiMenu(act);
    if (a === "menu-more") return moreMenu(act);
    if (a === "cards") return lazy.study().then((m) => m.cardPopover(api, id, act));
    if (a === "prop-del") { return change(() => { const p = { ...(kb.rems[id].props || {}) }; delete p[act.dataset.k]; M.update(kb, id, { props: Object.keys(p).length ? p : null }); }); }
    if (a === "link-mention") { const r = kb.rems[id], name = M.nameOf(kb, root); const re = new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"); return change(() => M.update(kb, id, { text: r.text.replace(re, `[[${root}]]`) })); }
  }
  // the bullet itself: open it as a page, or (with Shift) select
  const bullet = t.closest(".kb-bullet");
  if (bullet && (e.shiftKey || e.metaKey || e.ctrlKey)) { e.preventDefault(); return toggleSel(bullet.dataset.drag, e.shiftKey); }
  if (t.closest("a, button, input, .kb-edit, .kb-block, table")) return;
  const text = t.closest(".kb-text");
  if (text) {
    // put the caret near where the click was: count the characters before it in the rendered text
    let caret = "end";
    try { const rg = document.caretRangeFromPoint?.(e.clientX, e.clientY); if (rg && text.contains(rg.startContainer)) { const pre = document.createRange(); pre.setStart(text, 0); pre.setEnd(rg.startContainer, rg.startOffset); caret = Math.round(pre.toString().length * (M.toEdit(kb, kb.rems[text.dataset.id].text).length / Math.max(1, text.textContent.length))); } } catch { /* end */ }
    sel.clear(); drawSelbar();
    return edit(text.dataset.id, caret, text.dataset.via || "");
  }
  if (!t.closest(".kb-line") && sel.size) { sel.clear(); drawTree(); }
}
function wireTree(tree) {
  tree.addEventListener("change", (e) => {
    const inp = e.target.closest("[data-prop]"); if (!inp) return;
    const id = inp.dataset.id, k = inp.dataset.prop;
    change(() => M.update(kb, id, { props: { ...(kb.rems[id].props || {}), [k]: inp.value } }), { draw: "none" });
  });
  // drag a bullet: above or below another, or (dropped toward its right) inside it
  let drag = null;
  tree.addEventListener("dragstart", (e) => { const id = e.target.closest?.("[data-drag]")?.dataset.drag; if (!id) return; drag = id; e.dataTransfer.setData("text/gradify-rem", id); e.dataTransfer.setData("text/plain", M.nameOf(kb, id)); e.dataTransfer.effectAllowed = "move"; finishEdit({ draw: false }); });
  tree.addEventListener("dragover", (e) => {
    const line = e.target.closest(".kb-line"); if (!line || !drag) return;
    e.preventDefault();
    const b = line.getBoundingClientRect(), into = e.clientX > b.left + 80 && e.clientY > b.top + b.height * 0.3;
    $$(".drop-before, .drop-after, .drop-into", tree).forEach((x) => x.classList.remove("drop-before", "drop-after", "drop-into"));
    line.classList.add(into ? "drop-into" : e.clientY < b.top + b.height / 2 ? "drop-before" : "drop-after");
  });
  tree.addEventListener("drop", (e) => {
    const line = e.target.closest(".kb-line"); if (!line || !drag) return;
    e.preventDefault();
    const where = line.classList.contains("drop-into") ? "into" : line.classList.contains("drop-before") ? "before" : "after";
    $$(".drop-before, .drop-after, .drop-into", tree).forEach((x) => x.classList.remove("drop-before", "drop-after", "drop-into"));
    const target = line.dataset.id, moving = sel.has(drag) ? [...sel] : [drag];
    if (moving.includes(target)) return;
    change(() => {
      for (const id of (where === "before" ? moving : [...moving].reverse())) {
        if (where === "into") M.move(kb, id, target, 0);
        else { const p = kb.rems[target].parent, i = kb.rems[p ?? ""]?.kids.indexOf(target) ?? 0; M.move(kb, id, p, where === "before" ? i : i + 1); }
      }
    });
    drag = null;
  });
  tree.addEventListener("dragend", () => { drag = null; $$(".drop-before, .drop-after, .drop-into", tree).forEach((x) => x.classList.remove("drop-before", "drop-after", "drop-into")); });
}
function mobileBar(e) {
  const b = e.target.closest("[data-m]"); if (!b) return;
  e.preventDefault();
  const ta = current(); if (!ta && b.dataset.m !== "undo") return;
  const fire = (key, o = {}) => ta.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true, ...o }));
  ({
    outdent: () => fire("Tab", { shiftKey: true }), indent: () => fire("Tab"), up: () => fire("ArrowUp", { altKey: true }), down: () => fire("ArrowDown", { altKey: true }),
    todo: () => fire("Enter", { ctrlKey: true }), card: () => { ta.setRangeText(" >> ", ta.selectionStart, ta.selectionEnd, "end"); ta.focus(); }, cloze: () => { wrap(ta, "{{", "}}"); ta.focus(); },
    slash: () => { ta.setRangeText(" /", ta.selectionStart, ta.selectionEnd, "end"); ta.dispatchEvent(new Event("input")); ta.focus(); }, undo: () => doUndo(), done: () => finishEdit(),
  })[b.dataset.m]?.();
}

// ---------- selecting several bullets ----------
function toggleSel(id, range) {
  finishEdit({ draw: false });
  if (range && anchor) {
    const list = onScreen().map((x) => x.id), a = list.indexOf(anchor), b = list.indexOf(id);
    if (a >= 0 && b >= 0) { const sib = kb.rems[anchor].parent; sel = new Set(list.slice(Math.min(a, b), Math.max(a, b) + 1).filter((x) => kb.rems[x].parent === sib)); }
  } else { sel.has(id) ? sel.delete(id) : sel.add(id); anchor = id; }
  drawTree();
}
function drawSelbar() {
  const bar = $("#kb-selbar", host); if (!bar) return;
  bar.hidden = !sel.size;
  if (!sel.size) return;
  bar.innerHTML = `<b>${sel.size} selected</b>${[["indent", "Indent"], ["outdent", "Outdent"], ["dup", "Duplicate"], ["move", "Move to…"], ["doc", "Make documents"], ["cards-off", "Cards off"], ["cards-on", "Cards on"], ["practise", "Practise these"], ["copy", "Copy"], ["del", "Delete"], ["clear", "Done"]].map(([a, l]) => `<button type="button" class="btn btn-ghost lg btn-sm" data-sel="${a}"><span>${l}</span></button>`).join("")}`;
  bar.onclick = (e) => { const a = e.target.closest("[data-sel]")?.dataset.sel; if (a) selAction(a); };
}
async function selAction(a) {
  const ids = [...sel].filter((x) => kb.rems[x]);
  const order = onScreen().map((x) => x.id).filter((x) => ids.includes(x));
  if (a === "clear") { sel.clear(); return drawTree(); }
  if (a === "del") { change(() => { for (const id of order) M.remove(kb, id); }); sel.clear(); ctx.toast(`Deleted ${order.length}. Ctrl+Z puts them back.`); return drawTree(); }
  if (a === "indent") return change(() => { for (const id of order) M.indent(kb, id); });
  if (a === "outdent") return change(() => { for (const id of [...order].reverse()) M.outdent(kb, id); });
  if (a === "dup") return change(() => { for (const id of [...order].reverse()) M.duplicate(kb, id); });
  if (a === "doc") return change(() => { for (const id of order) M.update(kb, id, { doc: true }); });
  if (a === "cards-off" || a === "cards-on") return change(() => { for (const id of order) M.update(kb, id, { cards: a === "cards-off" ? "off" : null }); });
  if (a === "practise") return practise(`sel:${order.join(",")}`, "all");
  if (a === "copy") { const IO = await import("./io.js"); const md = order.map((id) => IO.toMarkdown(kb, id).replace(/^# /, "- ")).join("\n"); await navigator.clipboard?.writeText(md).catch(() => {}); return ctx.toast("Copied as Markdown."); }
  if (a === "move") {
    const to = await pick("Move to which document?", { docs: true });
    if (!to) return;
    const ok = change(() => order.map((id) => M.move(kb, id, to)).every(Boolean));
    sel.clear(); drawTree();
    ctx.toast(ok ? `Moved to <a href="#/notes/${to}">${esc(M.nameOf(kb, to))}</a>.` : "Some couldn't move: a note can't go inside itself.");
  }
}

// ---------- keys anywhere on the notes screens ----------
function globalKeys(e) {
  if (!location.hash.startsWith("#/notes")) return;
  const mod = e.ctrlKey || e.metaKey;
  if (mod && (e.key === "k" || e.key === "K" || e.key === "p") && !e.shiftKey) { e.preventDefault(); return palette(); }
  if (current() || $(".kb-modal") || /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName || "")) return;
  if (mod && e.key.toLowerCase() === "z") { e.preventDefault(); return doUndo(e.shiftKey); }
  if (mod && e.key.toLowerCase() === "y") { e.preventDefault(); return doUndo(true); }
  if (!sel.size || !root) return;
  const ids = onScreen().map((x) => x.id).filter((x) => sel.has(x));
  if (e.key === "Escape") { sel.clear(); drawTree(); }
  else if (e.key === "Backspace" || e.key === "Delete") { e.preventDefault(); selAction("del"); }
  else if (e.key === "Tab") { e.preventDefault(); selAction(e.shiftKey ? "outdent" : "indent"); }
  else if (e.key === "Enter") { e.preventDefault(); const id = ids[0]; sel.clear(); drawTree(); edit(id, "end"); }
  else if ((e.key === "ArrowUp" || e.key === "ArrowDown") && e.altKey) { e.preventDefault(); change(() => { for (const id of e.key === "ArrowUp" ? ids : [...ids].reverse()) M.moveBy(kb, id, e.key === "ArrowUp" ? -1 : 1); }); }
  else if ((e.key === "ArrowUp" || e.key === "ArrowDown") && e.shiftKey) { e.preventDefault(); const list = onScreen().map((x) => x.id), edge = e.key === "ArrowUp" ? ids[0] : ids.at(-1), n = list[list.indexOf(edge) + (e.key === "ArrowUp" ? -1 : 1)]; if (n && kb.rems[n].parent === kb.rems[edge].parent) { sel.add(n); drawTree(); } }
  else if (mod && e.key.toLowerCase() === "c") { e.preventDefault(); selAction("copy"); }
  else if (mod && e.key.toLowerCase() === "d") { e.preventDefault(); selAction("dup"); }
}

// ---------- the menus ----------
const SYMBOLS = "→ ← ↔ ⇒ ⇔ ↑ ↓ ≈ ≠ ≤ ≥ ± × ÷ ° µ Δ α β γ δ θ λ π σ ω Ω Σ √ ∞ ∴ ∵ ∈ ∉ ⊂ ∪ ∩ ∀ ∃ ℃ ‰ ½ ¼ ² ³ ⁻¹".split(" ");
function slashItems() {
  const simple = kb.settings.simple;
  const list = [
    ["Heading 1", "Big heading", "h1"], ["Heading 2", "Section heading", "h2"], ["Heading 3", "Small heading", "h3"], ["Plain text", "Remove the heading", "h0"],
    ["To-do", "A checkbox (Ctrl+Enter)", "todo"], ["Numbered list", "Number this bullet's children", "numbers"],
    ["Flashcard", "Front >> back", "c:>>"], ["Reverse card", "Back << front", "c:<<"], ["Two-way card", "Front <> back", "c:<>"], ["Concept", "Term :: definition, both ways", "c:::"],
    ["Descriptor", "Attribute ;; value, asked with the parent", "c:;;"], ["Multi-line card", "Question >>> with the answer in the children", "c:>>>"], ["List answer", "Steps in order: >>1.", "c:>>1."], ["Multiple choice", "First child right, the rest wrong: >>A)", "c:>>A)"],
    ["Cloze", "Hide words: {{…}} (Ctrl+Shift+C)", "cloze"], ["Image occlusion", "Hide parts of an image", "occlusion"],
    ["Reference", "Link a note: [[", "ref"], ["Tag", "#tag", "tag"], ["Portal", "Show a note from somewhere else, live", "portal", true], ["Property", "Add a property", "prop", true], ["Today's date", "Link today's daily document", "today"],
    ["Image", "Upload or take a photo", "image"], ["Scan a page", "Photograph a page and read its text", "scan"], ["Drawing", "Draw or write by hand", "drawing"], ["Table", "Rows and columns", "table"],
    ["Code block", "Code, kept as typed", "code"], ["Equation", "Maths, written in LaTeX", "math"], ["Embed", "A video, audio or web link", "embed"], ["PDF", "Read, highlight and annotate a PDF", "pdf"], ["Dictate", "Speak, and it's typed", "dictate"],
    ["Template", "Lecture, Cornell, revision…", "template"], ["Make it a document", "Opens as its own page", "doc"], ["Cards off", "Stop this bullet making cards", "cardsoff"],
    ["Colour", "Colour this bullet", "colour"], ["Symbol", SYMBOLS.slice(0, 12).join(" "), "symbol"],
    ["Generate flashcards", "Gradify writes cards from this branch", "ai-cards"],
  ];
  return list.filter((x) => !(simple && x[3]));
}
function openMenu(kind, q, ta, eat) {
  const items = kind === "slash" ? slashItems().filter(([n, d]) => `${n} ${d}`.toLowerCase().includes(q.toLowerCase())).slice(0, 12).map(([n, d, v]) => ({ label: n, sub: d, v }))
    : kind === "tag" ? [...M.allTags(kb).filter((t) => t.key.includes(q.toLowerCase())).slice(0, 8).map((t) => ({ label: `#${t.name}`, sub: `${t.count}`, v: t.name })), ...(q && !kb.tagDefs[M.tagKey(q)] ? [{ label: `#${q}`, sub: "New tag", v: q }] : [])]
    : [...M.search(kb, q, { limit: 8 }).filter((x) => x.id !== editing?.id).map((x) => ({ label: x.name, sub: x.path.join(" › ") || (x.doc ? "Document" : ""), v: x.id })), ...(kind === "ref" && q.trim() && !M.findByName(kb, q) ? [{ label: q, sub: "New document", v: `new:${q}` }] : [])];
  if (!items.length) return closeMenu();
  if (!menu) { const el = document.createElement("div"); el.className = "kb-pop glass"; el.setAttribute("role", "listbox"); document.body.append(el); menu = { el }; }
  Object.assign(menu, { kind, q, ta, eat, items, i: Math.min(menu.i || 0, items.length - 1) });
  menu.el.innerHTML = `${kind === "slash" ? "" : `<p class="kb-pop-h">${{ ref: "Link to", tag: "Tag", portal: "Show in a portal" }[kind]}</p>`}${items.map((x, i) => `<button type="button" role="option" aria-selected="${i === menu.i}" data-i="${i}"><b>${esc(x.label)}</b>${x.sub ? `<span>${esc(x.sub)}</span>` : ""}</button>`).join("")}`;
  menu.el.onmousedown = (e) => { e.preventDefault(); const b = e.target.closest("[data-i]"); if (b) { menu.i = Number(b.dataset.i); menuKey("Enter"); } };
  const box = ta.getBoundingClientRect();
  menu.el.style.left = `${Math.min(innerWidth - 300, Math.max(8, box.left))}px`;
  menu.el.style.top = `${Math.min(innerHeight - 260, box.bottom + 6)}px`;
}
function closeMenu() { menu?.el.remove(); menu = null; }
function menuKey(k) {
  if (!menu) return;
  if (k === "Escape") return closeMenu();
  if (k === "ArrowDown" || k === "ArrowUp") { menu.i = (menu.i + (k === "ArrowDown" ? 1 : -1) + menu.items.length) % menu.items.length; return openMenu(menu.kind, menu.q, menu.ta, menu.eat); }
  const it = menu.items[menu.i], { ta, eat, kind } = menu;
  closeMenu();
  const a = ta.selectionStart - eat;
  ta.setRangeText("", a, ta.selectionStart, "end");
  if (kind === "ref") { const name = it.v.startsWith("new:") ? it.v.slice(4) : M.nameOf(kb, it.v); ta.setRangeText(`[[${name}]] `, a, a, "end"); autosize(ta); return; }
  if (kind === "tag") { const t = /[^\p{L}\p{N}_\-/]/u.test(it.v) ? `#[[${it.v}]] ` : `#${it.v} `; ta.setRangeText(t, a, a, "end"); return; }
  if (kind === "portal") { const id = editing.id; change(() => { commitValue(); const r = kb.rems[id]; M.create(kb, { parent: r.parent, index: kb.rems[r.parent].kids.indexOf(id) + 1, portal: it.v }); }); ctx.toast(`Showing <b>${esc(M.nameOf(kb, it.v))}</b> here. Edits in either place change both.`); return; }
  slashDo(it.v, ta);
}
async function slashDo(v, ta) {
  const id = editing.id, via = editing.via, r = kb.rems[id], caret = ta.selectionStart;
  const set = (patch) => change(() => { commitValue(); M.update(kb, id, patch); }, { draw: "none" });
  const again = () => { editing = null; drawTree(); edit(id, caret, via); };
  if (/^h[0-3]$/.test(v)) { set({ heading: Number(v[1]) || null }); return again(); }
  if (v === "todo") { set({ todo: r.todo ? null : "open" }); return again(); }
  if (v === "numbers") { const p = r.kids.length ? id : r.parent; change(() => { commitValue(); M.update(kb, p, { list: kb.rems[p].list === "number" ? null : "number" }); }, { draw: "none" }); return again(); }
  if (v.startsWith("c:")) { const d = v.slice(2); ta.setRangeText(/>>>|>>1\.|>>A\)/.test(d) ? ` ${d}` : ` ${d} `, ta.selectionStart, ta.selectionEnd, "end"); autosize(ta); if (/>>>|>>1\.|>>A\)/.test(d)) ctx.toast(d === ">>A)" ? "Write the question, then add the right answer as the first bullet inside it and wrong answers after." : "Write the question, then add the answer as bullets inside it (Enter, then Tab)."); return; }
  if (v === "cloze") return wrap(ta, "{{", "}}");
  if (v === "ref") { ta.setRangeText("[[", ta.selectionStart, ta.selectionEnd, "end"); return onInput({ target: ta }); }
  if (v === "tag") { ta.setRangeText(" #", ta.selectionStart, ta.selectionEnd, "end"); return; }
  if (v === "portal") { ta.setRangeText("((", ta.selectionStart, ta.selectionEnd, "end"); return onInput({ target: ta }); }
  if (v === "today") { ta.setRangeText(`[[${M.dayKey()}]] `, ta.selectionStart, ta.selectionEnd, "end"); return; }
  if (v === "prop") { const k = await prompt2("Property name", "e.g. Year, Difficulty, Author"); if (!k) return; set({ props: { ...(r.props || {}), [k]: "" } }); editing = null; drawTree(); setTimeout(() => $(`[data-prop="${CSS.escape(k)}"][data-id="${id}"]`, host)?.focus(), 30); return; }
  if (v === "doc") { set({ doc: true }); finishEdit(); location.hash = `#/notes/${id}`; return; }
  if (v === "cardsoff") { set({ cards: r.cards === "off" ? null : "off" }); ctx.toast(r.cards === "off" ? "This bullet's cards are on." : "This bullet won't make cards."); return again(); }
  if (v === "code") { set({ code: "text" }); return again(); }
  if (v === "math") { const a = ta.selectionStart; ta.setRangeText("$$  $$", a, ta.selectionEnd, "end"); ta.setSelectionRange(a + 3, a + 3); return; }
  if (v === "symbol") return symbolMenu(ta);
  if (v === "colour") { const c = await choose("Colour", ["none", ...M.HIGHLIGHTS].map((x) => [x, x === "none" ? "No colour" : x[0].toUpperCase() + x.slice(1)])); if (c) { set({ colour: c === "none" ? null : c }); again(); } return; }
  if (v === "template") { const t = await templatePicker(); if (!t) return; change(() => { commitValue(); M.applyTemplate(kb, r.kids.length || r.text ? id : r.parent, t); }); return; }
  if (v === "dictate") return dictate(ta);
  if (v === "ai-cards") { finishEdit({ draw: false }); return (await lazy.learn()).generateCards(api, id); }
  finishEdit({ draw: false });
  return (await lazy.blocks()).insert(api, v, id);
}
function symbolMenu(ta) {
  modal(`<h3>Insert a symbol</h3><div class="kb-symbols">${SYMBOLS.map((s) => `<button type="button" data-s="${s}">${s}</button>`).join("")}</div>`, (el) => {
    el.addEventListener("click", (e) => { const s = e.target.closest("[data-s]")?.dataset.s; if (!s) return; closeModal(); ta.focus(); ta.setRangeText(s, ta.selectionStart, ta.selectionEnd, "end"); });
  });
}
function dictate(ta) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return ctx.toast("This browser can't take dictation. Chrome, Edge and Safari can.");
  const rec = new SR(); rec.lang = document.documentElement.lang === "en" ? "en-GB" : navigator.language; rec.continuous = true; rec.interimResults = false;
  let id = editing.id;
  modal(`<h3>Listening…</h3><p class="sub">Speak. Each pause starts a new bullet.</p><p class="kb-dict" id="kb-dict"></p><button type="button" class="btn btn-primary lg" data-close><span>Stop</span></button>`, () => {}, () => rec.stop());
  rec.onresult = (e) => {
    const said = [...e.results].slice(e.resultIndex).filter((x) => x.isFinal).map((x) => x[0].transcript.trim()).join(" ");
    if (!said) return;
    $("#kb-dict") && ($("#kb-dict").textContent = said);
    const r = kb.rems[id];
    if (!r.text && current()?.dataset.id === id && !current().value) { M.update(kb, id, { text: said[0].toUpperCase() + said.slice(1) }); }
    else { const n = M.create(kb, { parent: r.parent, index: kb.rems[r.parent].kids.indexOf(id) + 1, text: said[0].toUpperCase() + said.slice(1) }); id = n.id; }
    S.save(); scheduleCards();
  };
  rec.onerror = (e) => { ctx.toast(e.error === "not-allowed" ? "Allow the microphone to dictate." : "Dictation stopped."); closeModal(); };
  rec.onend = () => { editing = null; drawTree(); };
  finishEdit({ draw: false });
  rec.start();
}

// ---------- page menus ----------
function popMenu(anchorEl, items) {
  closeMenu();
  const el = document.createElement("div"); el.className = "kb-pop glass kb-pop-menu"; el.setAttribute("role", "menu");
  el.innerHTML = items.map((x, i) => (x === "-" ? "<hr>" : `<button type="button" role="menuitem" data-i="${i}">${x[0]}${x[2] ? `<span>${x[2]}</span>` : ""}</button>`)).join("");
  document.body.append(el);
  const b = anchorEl.getBoundingClientRect();
  el.style.top = `${Math.min(innerHeight - el.offsetHeight - 8, b.bottom + 6)}px`;
  el.style.left = `${Math.max(8, Math.min(innerWidth - el.offsetWidth - 8, b.right - el.offsetWidth))}px`;
  const close = (e) => { if (!el.contains(e.target)) { el.remove(); removeEventListener("pointerdown", close, true); } };
  setTimeout(() => addEventListener("pointerdown", close, true));
  el.addEventListener("click", (e) => { const i = e.target.closest("[data-i]")?.dataset.i; if (i == null) return; el.remove(); removeEventListener("pointerdown", close, true); items[i][1](); });
  el.querySelector("button")?.focus();
}
function practiseMenu(btn) {
  const n = M.cardsUnder(kb, root).length;
  if (!n) return ctx.toast("No flashcards here yet. Write one with >> (for example: Mitochondria >> where respiration happens).");
  popMenu(btn, [
    ["Due cards", () => practise(root, "due"), "spaced repetition"],
    ["All cards, in order", () => practise(root, "all"), `${n}`],
    ["All cards, shuffled", () => practise(root, "shuffle")],
    ["New cards only", () => practise(root, "new")],
    "-",
    ["Preview cards", () => lazy.study().then((m) => m.previewCards(api, root))],
  ]);
}
function aiMenu(btn) {
  popMenu(btn, [
    ["Generate flashcards", () => lazy.learn().then((m) => m.generateCards(api, root)), "from this page"],
    ["Generate a quiz", () => lazy.learn().then((m) => m.quiz(api, root)), "multiple choice"],
    ["Guided learning", () => { location.hash = `#/notes/guided/${root}`; }, "section by section"],
    ["Summarise", () => lazy.learn().then((m) => m.summarise(api, root))],
    ["Ask your notes", () => { location.hash = "#/notes/ask"; }],
    "-",
    ["Create an exam from this", () => lazy.study().then((m) => m.newExamFrom(api, root))],
  ]);
}
function moreMenu(btn) {
  const r = kb.rems[root], pinned = kb.pinned.includes(root);
  popMenu(btn, [
    ["Add a template", async () => { const t = await templatePicker(); if (t) change(() => M.applyTemplate(kb, root, t)); }],
    [r.template ? "Stop being a template" : "Save as a template", () => { change(() => M.update(kb, root, { template: !r.template || null }), { draw: "page" }); ctx.toast(r.template ? "No longer a template." : "Saved as a template: choose it from /template in any document. Its cards aren't studied."); }],
    [pinned ? "Unpin" : "Pin to the sidebar", () => { kb.pinned = pinned ? kb.pinned.filter((x) => x !== root) : [root, ...kb.pinned]; S.save(); render(); }],
    [r.folder ? "Make it a document" : "Make it a folder", () => change(() => M.update(kb, root, r.folder ? { folder: null, doc: true } : { folder: true, doc: null }), { draw: "page" })],
    [r.cards === "off" ? "Turn its cards on" : "Turn its cards off", () => change(() => M.update(kb, root, { cards: r.cards === "off" ? null : "off" }), { draw: "page" })],
    ["Move to…", async () => { const to = await pick("Move to which document?", { docs: true, top: true }); if (to === undefined) return; const ok = change(() => M.move(kb, root, to), { draw: "page" }); if (ok === false) ctx.toast("A note can't go inside itself."); }],
    ["Duplicate", () => { const c = change(() => M.duplicate(kb, root), { draw: "none" }); location.hash = `#/notes/${c.id}`; }],
    "-",
    ["Export…", () => lazy.learn().then((m) => m.exportDialog(api, root))],
    ["Share…", () => lazy.learn().then((m) => m.shareDialog(api, root))],
    ["Print", () => print()],
    "-",
    // the same actions as on every resource in Gradify (kit/ui/resource-actions.js)
    ["Save to a collection…", () => runResourceAction("save", noteRes(root), { store: async () => ctx.store, app: location.pathname })],
    ["Connections…", () => runResourceAction("link", noteRes(root), { app: location.pathname })],
    ["Schedule…", () => runResourceAction("schedule", noteRes(root), { store: async () => ctx.store, app: location.pathname })],
    ["Pin to your Gradify sidebar", () => runResourceAction("pin", noteRes(root), { app: location.pathname })],
    ["See its history", () => runResourceAction("history", noteRes(root), { app: location.pathname })],
    "-",
    ["Delete", () => { if (!confirm(`Delete “${M.nameOf(kb, root)}” and everything in it? Its flashcards are suspended; Ctrl+Z puts it back while this page is open.`)) return; const parent = r.parent; change(() => M.remove(kb, root), { draw: "none" }); location.hash = parent ? `#/notes/${parent}` : "#/notes"; }],
  ]);
}
async function templatePicker() {
  const saved = M.savedTemplates(kb);
  return choose("Add a template", [...Object.entries(M.TEMPLATES).map(([k, t]) => [k, t.name]), ...saved.map((t) => [t.id, `${t.name} (yours)`])]);
}

// ---------- dialogs ----------
let modalClose = null;
export function modal(html, wire = () => {}, onClose = null) {
  closeModal();
  const el = document.createElement("div");
  el.className = "kb-modal"; el.setAttribute("role", "dialog"); el.setAttribute("aria-modal", "true");
  el.innerHTML = `<div class="kb-modal-box glass">${html}<button type="button" class="kb-modal-x" data-close aria-label="Close">×</button></div>`;
  document.body.append(el);
  const prev = document.activeElement;
  modalClose = () => { el.remove(); modalClose = null; onClose?.(); prev?.focus?.(); };
  el.addEventListener("click", (e) => { if (e.target === el || e.target.closest("[data-close]")) closeModal(); });
  el.addEventListener("keydown", (e) => { if (e.key === "Escape") { e.stopPropagation(); closeModal(); } });
  wire(el);
  (el.querySelector("[autofocus]") || el.querySelector("input, textarea, select, button:not(.kb-modal-x)"))?.focus();
  return el;
}
export function closeModal() { modalClose?.(); }
function choose(title, options) {
  return new Promise((ok) => {
    let done = false;
    modal(`<h3>${esc(title)}</h3><div class="kb-choices">${options.map(([v, l]) => `<button type="button" class="btn btn-ghost lg btn-sm" data-v="${esc(v)}"><span>${esc(l)}</span></button>`).join("")}</div>`, (el) => {
      el.addEventListener("click", (e) => { const v = e.target.closest("[data-v]")?.dataset.v; if (v) { done = true; closeModal(); ok(v); } });
    }, () => { if (!done) ok(null); });
  });
}
function prompt2(title, placeholder = "") {
  return new Promise((ok) => {
    let done = false;
    modal(`<h3>${esc(title)}</h3><form class="kb-form"><input name="v" placeholder="${esc(placeholder)}" autofocus required><button class="btn btn-primary lg btn-sm"><span>OK</span></button></form>`, (el) => {
      el.querySelector("form").addEventListener("submit", (e) => { e.preventDefault(); done = true; const v = el.querySelector("input").value.trim(); closeModal(); ok(v || null); });
    }, () => { if (!done) ok(null); });
  });
}
/** Asks the learner to choose a note (a document, with docs: true). Resolves with its id, null for the top level (with top: true), or undefined. */
export function pick(title, { docs = false, top = false } = {}) {
  return new Promise((ok) => {
    let done = false;
    const list = (q) => (q ? M.search(kb, q, { docs, limit: 30 }) : M.docTree(kb).map((x) => ({ id: x.id, name: `${"  ".repeat(x.depth)}${M.nameOf(kb, x.id)}`, path: [] })).slice(0, 60));
    const draw = (el, q) => { el.querySelector(".kb-picklist").innerHTML = `${top && !q ? `<button type="button" data-v="">Top level</button>` : ""}${list(q).map((x) => `<button type="button" data-v="${x.id}"><b>${esc(x.name)}</b>${x.path?.length ? `<span>${esc(x.path.join(" › "))}</span>` : ""}</button>`).join("")}`; };
    modal(`<h3>${esc(title)}</h3><input class="kb-pickq" placeholder="Search" autofocus><div class="kb-picklist"></div>`, (el) => {
      draw(el, "");
      el.querySelector(".kb-pickq").addEventListener("input", (e) => draw(el, e.target.value));
      el.addEventListener("click", (e) => { const b = e.target.closest("[data-v]"); if (!b) return; done = true; closeModal(); ok(b.dataset.v || null); });
    }, () => { if (!done) ok(undefined); });
  });
}
/** The search palette: Ctrl+K anywhere in notes. */
function palette() {
  finishEdit({ draw: false });
  let i = 0, results = [];
  const el = modal(`<input class="kb-palq" placeholder="Search your notes, or type a name to create a document" autofocus aria-label="Search"><div class="kb-palres" role="listbox"></div><p class="sub kb-palhint">↑↓ to choose · Enter to open · <kbd>#tag</kbd> to search a tag · searches image labels, highlights and properties too</p>`, (box) => {
    const q = box.querySelector(".kb-palq"), out = box.querySelector(".kb-palres");
    const draw = () => {
      const v = q.value.trim(), tag = v.match(/^#(\S+)\s*(.*)$/);
      results = v ? M.search(kb, tag ? tag[2] : v, { limit: 14, tag: tag ? M.tagKey(tag[1]) : null }) : kb.recent.filter((x) => kb.rems[x]).slice(0, 10).map((id) => ({ id, name: M.nameOf(kb, id), path: M.pathOf(kb, id), doc: M.isDoc(kb.rems[id]) }));
      if (v && !tag && !results.some((x) => x.name.toLowerCase() === v.toLowerCase())) results.push({ id: `new:${v}`, name: `Create “${v}”`, path: ["New document"] });
      i = Math.min(i, Math.max(0, results.length - 1));
      out.innerHTML = results.length ? results.map((x, k) => `<button type="button" role="option" aria-selected="${k === i}" data-k="${k}"><b>${x.doc ? "📝 " : ""}${esc(x.name)}</b><span>${esc(x.path.join(" › "))}</span></button>`).join("") : `<p class="sub">Nothing found.</p>`;
    };
    const go = (k) => {
      const x = results[k]; if (!x) return; closeModal();
      if (x.id.startsWith("new:")) { const r = change(() => M.create(kb, { text: x.id.slice(4), doc: true }), { draw: "none" }); location.hash = `#/notes/${r.id}`; return; }
      const r = kb.rems[x.id];
      location.hash = `#/notes/${M.isDoc(r) ? x.id : M.docOf(kb, x.id)}`;
      if (!M.isDoc(r)) setTimeout(() => { const line = $(`.kb-line[data-id="${x.id}"]`); line?.scrollIntoView({ block: "center" }); line?.classList.add("flash"); }, 150);
    };
    q.addEventListener("input", () => { i = 0; draw(); });
    q.addEventListener("keydown", (e) => { if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); i = (i + (e.key === "ArrowDown" ? 1 : -1) + results.length) % Math.max(1, results.length); draw(); } if (e.key === "Enter") { e.preventDefault(); go(i); } });
    out.addEventListener("click", (e) => { const b = e.target.closest("[data-k]"); if (b) go(Number(b.dataset.k)); });
    draw();
  });
  el.classList.add("kb-palette");
}

// ---------- tasks, tags, help ----------
function tasksScreen(main) {
  const all = M.tasks(kb, { done: kb.settings.showDone }), today = M.dayKey();
  const groups = [["Overdue", (t) => !t.done && t.due && t.due < today], ["Today", (t) => !t.done && t.due === today], ["Coming up", (t) => !t.done && t.due && t.due > today], ["No date", (t) => !t.done && !t.due], ["Done", (t) => t.done]];
  main.innerHTML = `<div class="kb-screen"><div class="deck-head"><div><span class="kicker lo-kicker">${icon("checklist")}Tasks</span><h1>Your to-dos</h1><p class="sub">Every to-do in your notes. Give one a date with @2026-11-20 in its text, a “due” property, or by writing it in a daily document.</p></div><label class="check"><input type="checkbox" id="kb-done" ${kb.settings.showDone ? "checked" : ""}> <span>Show done</span></label></div>
    ${all.length ? groups.map(([h, f]) => { const g = all.filter(f); return g.length ? `<h2 class="lo-h">${h} <span class="sub">${g.length}</span></h2><ul class="kb-tasks">${g.map((t) => `<li><input type="checkbox" data-task="${t.id}" ${t.done ? "checked" : ""} aria-label="Done"><a href="#/notes/${t.doc}">${M.inlineHtml(kb, kb.rems[t.id].text) || "Untitled"}</a><span class="sub">${esc(M.nameOf(kb, t.doc))}${t.due ? ` · ${new Date(`${t.due}T12:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}` : ""}</span></li>`).join("")}</ul>` : ""; }).join("")
      : `<div class="kb-empty"><h2>No to-dos</h2><p class="sub">Type /to-do in any bullet, or press Ctrl+Enter.</p><a class="btn btn-ghost lg btn-sm" href="#/notes/daily"><span>Open today</span></a></div>`}</div>`;
  main.addEventListener("change", (e) => {
    if (e.target.id === "kb-done") { kb.settings.showDone = e.target.checked; S.save(); return tasksScreen(main); }
    const id = e.target.dataset.task; if (!id) return;
    change(() => M.update(kb, id, { todo: e.target.checked ? "done" : "open" }), { draw: "none" });
    setTimeout(() => tasksScreen(main), 250);
  }, { once: true });
}
function tagScreen(main, key) {
  key = M.tagKey(key || "");
  if (!key) {
    const tags = M.allTags(kb);
    main.innerHTML = `<div class="kb-screen"><div class="deck-head"><div><span class="kicker lo-kicker">#</span><h1>Tags</h1><p class="sub">Type # in any bullet to tag it. A tag can give everything it's on the same properties, like a small database, and turn them into flashcards.</p></div></div>${tags.length ? `<div class="kb-tagcloud">${tags.map((t) => `<a class="kb-tag" href="#/notes/tag/${encodeURIComponent(t.key)}">#${esc(t.name)} <b>${t.count}</b></a>`).join("")}</div>` : `<p class="sub">No tags yet.</p>`}</div>`;
    return;
  }
  const def = kb.tagDefs[key] || { name: key, schema: [], cards: false };
  const t = M.tagTable(kb, key);
  main.innerHTML = `<div class="kb-screen"><a class="back" href="#/notes/tag">← All tags</a><div class="deck-head"><div><span class="kicker lo-kicker">Tag</span><h1>#${esc(def.name)}</h1><p class="sub">${t.rows.length} ${t.rows.length === 1 ? "note has" : "notes have"} this tag.</p></div></div>
    <div class="panel glass kb-tagdef"><h3>Properties</h3><p class="sub">Every note with #${esc(def.name)} shows these, ready to fill in.</p>
      <form class="kb-form" id="kb-schema"><input name="k" placeholder="Add a property, e.g. Born" aria-label="New property"><button class="btn btn-light lg btn-sm"><span>Add</span></button></form>
      <div class="kb-chips">${(def.schema || []).map((k) => `<span class="chip">${esc(k)} <button type="button" class="kb-x" data-unschema="${esc(k)}" aria-label="Remove ${esc(k)}">×</button></span>`).join("") || '<span class="sub">None yet.</span>'}</div>
      <label class="check"><input type="checkbox" id="kb-tagcards" ${def.cards ? "checked" : ""}> <span>Make flashcards from the properties (“Jane Austen › Born” → 1775)</span></label></div>
    ${t.rows.length ? `<div class="kb-tablewrap"><table class="kb-dbtable"><thead><tr><th>Note</th>${t.cols.map((c) => `<th>${esc(c)}</th>`).join("")}</tr></thead><tbody>${t.rows.map((r) => `<tr><td><a href="#/notes/${M.docOf(kb, r.id)}">${esc(r.name)}</a></td>${r.cells.map((v, i) => `<td><input data-cell="${r.id}" data-k="${esc(t.cols[i])}" value="${esc(v)}" aria-label="${esc(t.cols[i])} of ${esc(r.name)}"></td>`).join("")}</tr>`).join("")}</tbody></table></div>` : ""}</div>`;
  const save = (patch) => { M.defineTag(kb, def.name, patch); S.save(); scheduleCards(); tagScreen(main, key); };
  $("#kb-schema", main).addEventListener("submit", (e) => { e.preventDefault(); const k = e.target.k.value.trim(); if (k) save({ schema: [...new Set([...(def.schema || []), k])] }); });
  $("#kb-tagcards", main).addEventListener("change", (e) => { save({ cards: e.target.checked }); ctx.toast(e.target.checked ? "Each property is now a flashcard." : "Properties no longer make cards."); });
  main.addEventListener("click", (e) => { const k = e.target.closest("[data-unschema]")?.dataset.unschema; if (k) save({ schema: (def.schema || []).filter((x) => x !== k) }); });
  main.addEventListener("change", (e) => { const inp = e.target.closest("[data-cell]"); if (!inp) return; const id = inp.dataset.cell; change(() => M.update(kb, id, { props: { ...(kb.rems[id].props || {}), [inp.dataset.k]: inp.value } }), { draw: "none" }); });
}
function helpScreen(main) {
  const rows = (list) => `<table class="kb-help">${list.map(([a, b]) => `<tr><td><code>${esc(a)}</code></td><td>${esc(b)}</td></tr>`).join("")}</table>`;
  main.innerHTML = `<div class="kb-screen"><div class="deck-head"><div><span class="kicker lo-kicker">Help</span><h1>Shortcuts and syntax</h1></div></div>
    <div class="lo-grid kb-helpgrid">
      <article class="panel glass"><h3>Flashcards</h3>${rows([["Front >> Back", "a card"], ["Back << Front", "backwards"], ["Front <> Back", "both ways"], ["Term :: Definition", "a concept, both ways"], ["Attribute ;; Value", "a descriptor, asked with its parent"], ["Question >>>", "the answer is the bullets inside"], ["Steps >>1.", "a list answer, in order"], ["Question >>A)", "multiple choice: first inside is right"], ["{{hidden}}", "cloze; {{c1::a}} {{c1::b}} are one card"], ["{{word::hint}}", "cloze with a hint"]])}</article>
      <article class="panel glass"><h3>Formatting</h3>${rows([["**bold**", "Ctrl+B"], ["*italic*", "Ctrl+I"], ["__underline__", "Ctrl+U"], ["~~struck~~", "Ctrl+Shift+X"], ["==highlight==", "Ctrl+Shift+H"], ["=={green}text==", "a coloured highlight"], ["`code`", "Ctrl+E"], ["$x^2$", "maths; $$…$$ on its own line"], ["[text](https://…)", "a link"]])}</article>
      <article class="panel glass"><h3>Connecting</h3>${rows([["[[Name]]", "link a note (made if it's new)"], ["[[2026-11-18]]", "link a day"], ["#tag  #[[two words]]", "tag"], ["((Name", "a portal: the note, live, here"], ["/", "every command"], ["@2026-11-20", "a to-do's date"]])}</article>
      <article class="panel glass"><h3>Keys</h3>${rows([["Enter / Shift+Enter", "new bullet / new line"], ["Tab / Shift+Tab", "indent / outdent"], ["Alt+↑ ↓", "move the bullet"], ["Ctrl+↑ ↓", "collapse / expand"], ["Ctrl+Enter", "to-do"], ["Ctrl+D", "duplicate"], ["Esc", "select the bullet; then Shift+↑↓, Tab, Delete"], ["Shift-click a bullet", "select several"], ["Ctrl+Z / Ctrl+Shift+Z", "undo / redo"], ["Ctrl+K", "search"]])}</article>
    </div></div>`;
}
