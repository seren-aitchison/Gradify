// The same actions for every resource, wherever it appears (kit/core/resource.js): a "•••" button that opens
//   Pin · Save to a collection · Link to… (Connections) · Schedule · Add a note · Share · See its history
// and, where the page can do them for this kind of thing (o.ops), Rename · Duplicate · Move · Export · Report a
// problem · Delete. Each has a key while the menu is open (P, S, L, …); "." opens the page's menu
// (kit/ui/quick-actions.js).
// Every action goes through the learner's record (kit/data/learner-state.js via kit/ui/places.js and
// kit/data/links.js), so a pin, a link, a collection or a note made here shows everywhere else, on every device.
//
//   mountResourceActions(host, () => res, { store: () => storePromise, app: "/app.html", where: "beforeend" })
// res is a function so the button always acts on what the page is showing now.
import { esc, ensureStyles } from "./store.js";
import { uiIcon } from "./icons.js";
import { openModal, openDrawer } from "./overlay.js";
import { toast } from "./feedback.js";
import { pin, pinned, pins, setPins, restoreAt } from "./places.js";
import { collections, itemsOf, createCollection, addToCollection, removeFromCollection, collectionsOf, noteOf, setNote, schedule, mistakes } from "../data/links.js";
import { tree, folderLabel, tagsOf, setTags, allTags, autoTags, STARTER_TAGS, normTag, placeFor, ownerOf, visibilityOf } from "../data/organise.js";
import { mountConnections } from "./connections.js";
import { EXTRA, MENU_KEYS, registerPageMenu } from "./quick-actions.js";

// what History records: places opened and studied. A single card or question is part of its set or lesson, so it
// has no history of its own and doesn't offer one.
export const HAS_HISTORY = new Set(["course", "unit", "lesson", "quiz", "test", "spec", "pack", "note", "map", "collection", "screen", "page"]);
/** the actions a resource's menu offers, in order (pure; tests/links.test.mjs) */
export const actionsFor = (r, { canSchedule = false, ops = {} } = {}) => ["pin", "save", "tag", "link", ...(canSchedule ? ["schedule"] : []), "note", "share", ...(HAS_HISTORY.has(r?.kind) ? ["history"] : []), ...EXTRA.map(([a]) => a).filter((a) => typeof ops?.[a] === "function")];
const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
const abs = (href) => { try { return new URL(href, location.href).href; } catch { return href; } };

export function mountResourceActions(host, getRes, { store = null, app = "/app.html", where = "beforeend", label = "More actions", ops = null, page = false } = {}) {
  if (!host) return null;
  ensureStyles();
  const wrap = document.createElement("div"); wrap.className = "gx-ra";
  wrap.innerHTML = `<button type="button" class="gx-rab" aria-haspopup="menu" aria-expanded="false" aria-label="${esc(label)}" title="${esc(label)}: pin, save, link, schedule, note, share">${uiIcon("more")}</button><div class="gx-ram" role="menu" hidden></div>`;
  host.insertAdjacentElement(where, wrap);
  const btn = wrap.querySelector(".gx-rab"), menu = wrap.querySelector(".gx-ram");
  const items = () => [...menu.querySelectorAll("[role=menuitem]")];
  const opsNow = () => (typeof ops === "function" ? ops() : ops) || {};
  const acts = () => { const r = getRes(); return r ? actionsFor(r, { canSchedule: Boolean(store), ops: opsNow() }) : []; };
  function paint() {
    const r = getRes(); if (!r) return;
    const on = pinned(r.href), inCols = collectionsOf(r.rid).length, hasNote = Boolean(noteOf(r.rid)), tags = tagsOf(r.rid);
    const it = (act, ic, text, sub = "") => `<button type="button" role="menuitem" data-ra="${act}" aria-keyshortcuts="${esc(MENU_KEYS[act] || "")}">${uiIcon(ic)}<span><b>${text}</b>${sub ? `<small>${sub}</small>` : ""}</span>${MENU_KEYS[act] ? `<kbd aria-hidden="true">${esc(MENU_KEYS[act].toUpperCase())}</kbd>` : ""}</button>`;
    // one list of actions for every resource (actionsFor), so every menu offers the same things in the same order
    const ITEM = {
      pin: () => it("pin", on ? "pinned" : "pin", on ? "Unpin" : "Pin", on ? "Pinned to your sidebar and home" : "Keep it in your sidebar and home"),
      save: () => it("save", "inbox", "Save to a folder", inCols ? `In ${inCols} folder${inCols > 1 ? "s" : ""}` : "Keep it with things from any tool"),
      tag: () => it("tag", "flag", "Tags", tags.length ? tags.slice(0, 3).map((t) => `#${esc(t)}`).join(" ") : "Label it: difficult, priority, homework…"),
      link: () => it("link", "link", "Connections", "Link it to notes, flashcards, lessons…"),
      schedule: () => it("schedule", "clock", "Schedule", "Put it in your plan"),
      note: () => it("note", "notes", hasNote ? "Edit your note" : "Add a note", "Your own words on it"),
      share: () => it("share", "up", "Share", "Copy a link to it"),
      history: () => it("history", "back", "See its history", "When you opened and studied it"),
      ...Object.fromEntries(EXTRA.map(([a, ic, text, sub]) => [a, () => it(a, ic, text, sub)])),
    };
    const list = acts(), firstExtra = list.findIndex((a) => EXTRA.some(([x]) => x === a));
    menu.innerHTML = `<p class="gx-ram-h">${esc(r.label)} · ${esc(r.title)}</p>${list.map((a, i) => `${i === firstExtra ? `<hr class="gx-ram-sep">` : ""}${ITEM[a]()}`).join("")}`;
  }
  const open = () => { paint(); menu.hidden = false; btn.setAttribute("aria-expanded", "true"); items()[0]?.focus(); };
  const close = (refocus = false) => { if (menu.hidden) return; menu.hidden = true; btn.setAttribute("aria-expanded", "false"); if (refocus) btn.focus(); };
  btn.addEventListener("click", () => (menu.hidden ? open() : close()));
  menu.addEventListener("keydown", (e) => {
    const xs = items(), i = xs.indexOf(document.activeElement);
    if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); close(true); }
    else if (e.key === "ArrowDown") { e.preventDefault(); xs[(i + 1) % xs.length]?.focus(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); xs[(i - 1 + xs.length) % xs.length]?.focus(); }
    else if (e.key === "Tab") close();
    else if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
      // each action's own key, while the menu is open
      const act = Object.keys(MENU_KEYS).find((a) => MENU_KEYS[a] === e.key.toLowerCase() && acts().includes(a));
      if (act) { e.preventDefault(); close(true); run(act); }
    }
  });
  document.addEventListener("click", (e) => { if (!wrap.contains(e.target)) close(); });
  menu.addEventListener("click", (e) => { const b = e.target.closest("[data-ra]"); if (!b) return; close(); run(b.dataset.ra); });
  // an action the page does itself (rename, duplicate, delete…) or one every resource has
  function run(act) {
    const r = getRes(); if (!r || !acts().includes(act)) return false;
    const own = opsNow()[act];
    if (typeof own === "function") own(r); else runResourceAction(act, r, { store, app });
    return true;
  }
  const api = { open, close, el: wrap, run, has: (act) => acts().includes(act) };
  if (page) registerPageMenu(api);
  return api;
}

/**
 * One action on a resource, from any menu (the ••• button, or a tool's own menu such as Notes'): "pin", "save",
 * "link", "schedule", "note", "share", "history". o: { store: () => Promise<store> (for schedule), app }
 */
export async function runResourceAction(what, r, { store = null, app = "/app.html" } = {}) {
  if (!r) return;
  if (what === "pin") {
    const x = pin({ href: r.href, title: r.title, sub: r.sub || r.label, kind: r.kind });
    toast({ html: `${x.pinned ? "Pinned" : "Unpinned"} <b>${esc(r.title)}</b>` }, { undo: () => setPins(x.pinned ? pins().filter((p) => p.href !== r.href) : restoreAt(pins(), x.item, x.index)) });
  } else if (what === "save") organiseDialog(r, "folders");
  else if (what === "tag") organiseDialog(r, "tags");
  else if (what === "link") openConnections(r, app);
  else if (what === "schedule") scheduleDialog(r, store);
  else if (what === "note") noteDialog(r);
  else if (what === "share") {
    const url = abs(r.href);
    try { if (navigator.share && matchMedia("(pointer: coarse)").matches) await navigator.share({ title: r.title, url }); else { await navigator.clipboard.writeText(url); toast("Link copied."); } }
    catch { toast(`Copy this link: ${url}`); }
  } else if (what === "history") location.href = `${app}#/history?q=${encodeURIComponent(r.title)}`;
}
// Organise: the three ways a thing is placed, side by side and never mixed. Folders are where the learner keeps it;
// tags are what it's like; the curriculum is what it teaches, which Gradify sets (kit/data/organise.js).
const signedIn = () => { try { return Object.keys(localStorage).some((k) => /^sb-[\w-]+-auth-token$/.test(k)); } catch { return false; } };
export function organiseDialog(r, focus = "folders") {
  const draw = () => {
    const mine = new Set(collectionsOf(r.rid)), cols = collections(), flat = [];
    const walk = (xs) => xs.forEach((c) => { if (!c.smart) flat.push(c); walk(c.children); });
    walk(tree(cols));
    const tags = tagsOf(r.rid), known = allTags().map((t) => t.tag);
    const mistakesHere = mistakes().filter((x) => !x.resolved && x.lesson?.rid === r.rid).length;
    const auto = autoTags(r, { mistakes: mistakesHere, have: tags });
    const starters = STARTER_TAGS.filter((t) => !tags.includes(t) && !auto.some((a) => a.tag === t)).slice(0, 6);
    const places = mine.size ? [] : placeFor(r, cols.map((c) => ({ ...c, items: itemsOf(c.id) })));
    const vis = visibilityOf(r, { signedIn: signedIn() });
    const where = [r.subject && `Subject: ${r.subject}`, r.unit && `Topic: ${r.unit}`, r.module && `Module: ${r.module}`, r.qualification && `Qualification: ${r.qualification}`].filter(Boolean);
    return `<div class="gx-org">
      <section aria-labelledby="gx-org-f"><h3 id="gx-org-f">${uiIcon("inbox")} Folders <small>Where you keep it. One thing can be in several, never copied.</small></h3>
        ${places.length ? `<p class="gx-org-sug">Suggested: ${places.map((p) => `<button type="button" class="gx-chip" data-sug="${esc(p.id)}" title="${esc(p.why)}">${uiIcon("plus")}${esc(p.name)}</button>`).join(" ")}</p>` : ""}
        ${flat.length ? `<ul class="gx-ra-cols">${flat.map((c) => `<li style="--d:${c.depth}"><label><input type="checkbox" data-col="${esc(c.id)}" ${mine.has(c.id) ? "checked" : ""}> ${esc(c.name)}${c.depth ? ` <small>${esc(folderLabel(cols, c.parent))}</small>` : ""}</label></li>`).join("")}</ul>` : `<p class="sub">No folders yet: make the first one here.</p>`}
        <form class="gx-ra-new"><label class="sr-only" for="gx-ra-cn">New folder</label><input id="gx-ra-cn" placeholder="New folder, e.g. Mock exam week" maxlength="80"><button type="submit" class="btn btn-ghost lg btn-sm"><span>Create and add</span></button></form></section>
      <section aria-labelledby="gx-org-t"><h3 id="gx-org-t">${uiIcon("flag")} Tags <small>What it's like. Your own labels, the same in every tool.</small></h3>
        <p class="gx-org-tags">${tags.map((t) => `<span class="gx-tagc">#${esc(t)}<button type="button" data-untag="${esc(t)}" aria-label="Remove the tag ${esc(t)}">${uiIcon("close")}</button></span>`).join("") || `<span class="sub">No tags yet.</span>`}</p>
        <form class="gx-ra-tag"><label class="sr-only" for="gx-ra-tn">Add a tag</label><input id="gx-ra-tn" list="gx-ra-tl" placeholder="Add a tag, e.g. difficult" maxlength="32" autocomplete="off"><datalist id="gx-ra-tl">${known.map((t) => `<option value="${esc(t)}">`).join("")}</datalist><button type="submit" class="btn btn-ghost lg btn-sm"><span>Add</span></button></form>
        ${auto.length || starters.length ? `<p class="gx-org-sug">${auto.map((a) => `<button type="button" class="gx-chip" data-tag="${esc(a.tag)}" title="${esc(a.why)}">${uiIcon("plus")}#${esc(a.tag)}</button>`).join("")}${starters.map((t) => `<button type="button" class="gx-chip quiet" data-tag="${esc(t)}">${uiIcon("plus")}#${esc(t)}</button>`).join("")}</p>` : ""}</section>
      <section aria-labelledby="gx-org-c"><h3 id="gx-org-c">${uiIcon("target")} Curriculum <small>What it teaches. Set by Gradify from the course and specification.</small></h3>
        ${where.length || r.refs?.length ? `<ul class="gx-org-cur">${where.map((w) => `<li>${esc(w)}</li>`).join("")}${(r.refs || []).slice(0, 6).map((x) => `<li>Specification point ${esc(x)}</li>`).join("")}</ul>` : `<p class="sub">${ownerOf(r) === "yours" ? "Your own things aren't mapped to a curriculum; filing them in a folder or tagging them keeps them findable." : "Not mapped to a specification yet."}</p>`}
        <p class="gx-org-vis"><b>${esc(ownerOf(r) === "yours" ? "Yours" : "Gradify's")}</b> · ${esc(vis.label)}: ${esc(vis.line)}</p></section>
    </div>`;
  };
  const m = openModal({ title: `Organise “${r.title}”`, body: draw(), actions: [{ label: "Done", primary: true }] });
  const redraw = (sel) => { m.box.querySelector(".gx-body").innerHTML = draw(); if (sel) m.box.querySelector(sel)?.focus(); };
  m.box.addEventListener("change", (e) => { const x = e.target.closest("[data-col]"); if (!x) return; if (x.checked) addToCollection(x.dataset.col, r); else removeFromCollection(x.dataset.col, r.rid); });
  m.box.addEventListener("click", (e) => {
    const s = e.target.closest("[data-sug]"); if (s) { addToCollection(s.dataset.sug, r); redraw(); return; }
    const t = e.target.closest("[data-tag]"); if (t) { setTags(r, [...tagsOf(r.rid), t.dataset.tag]); redraw("#gx-ra-tn"); return; }
    const u = e.target.closest("[data-untag]"); if (u) { setTags(r, tagsOf(r.rid).filter((x) => x !== u.dataset.untag)); redraw("#gx-ra-tn"); }
  });
  m.box.addEventListener("submit", (e) => {
    e.preventDefault();
    if (e.target.closest(".gx-ra-tag")) { const v = normTag(m.box.querySelector("#gx-ra-tn").value); if (v) setTags(r, [...tagsOf(r.rid), v]); redraw("#gx-ra-tn"); return; }
    const name = m.box.querySelector("#gx-ra-cn").value.trim(); if (!name) return;
    const id = createCollection(name); addToCollection(id, r); redraw("#gx-ra-cn"); toast({ html: `Made <b>${esc(name)}</b> and added it.` });
  });
  setTimeout(() => m.box.querySelector(focus === "tags" ? "#gx-ra-tn" : "#gx-ra-cn")?.focus(), 50);
  return m;
}
function noteDialog(r) {
  const m = openModal({ title: `Your note on “${r.title}”`, body: `<label class="sr-only" for="gx-ra-note">Your note</label><textarea id="gx-ra-note" rows="6" maxlength="4000" placeholder="What to remember, what to ask, where you got stuck…">${esc(noteOf(r.rid))}</textarea><p class="aq-note">It's shown with this ${esc(r.label.toLowerCase())} wherever it appears, and in its Connections.</p>`,
    actions: [{ label: "Cancel" }, { label: "Save note", primary: true, run: () => { setNote(r, m.box.querySelector("#gx-ra-note").value); toast("Note saved."); } }] });
  setTimeout(() => m.box.querySelector("textarea")?.focus(), 50);
}
function scheduleDialog(r, store) {
  const m = openModal({ title: `Schedule “${r.title}”`, body: `<form class="gx-ra-sched"><label><span>Day</span><input type="date" name="day" min="${today()}" value="${today()}" required></label><label><span>Start</span><input type="time" name="at" value="18:00" required></label><label><span>How long</span><select name="mins"><option value="15">15 min</option><option value="25" selected>25 min</option><option value="45">45 min</option><option value="60">1 hour</option></select></label></form><p class="aq-note">It goes into your plan, and finishing it ticks the block off.</p>`,
    actions: [{ label: "Cancel" }, { label: "Add to my plan", primary: true, run: () => { add(); return false; } }] });
  async function add() {
    const f = new FormData(m.box.querySelector("form")), [h, mi] = String(f.get("at")).split(":").map(Number), start = h * 60 + mi, end = Math.min(1440, start + Number(f.get("mins")));
    try {
      const s = await store();
      const block = await s.saveBlock({ day: f.get("day"), start_min: start, end_min: end, title: `${r.label}: ${r.title}`.slice(0, 120), cal: "study" });
      if (block?.id) schedule(r, block);
      m.close(); toast(`In your plan for ${new Date(`${f.get("day")}T12:00`).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}.`);
    } catch (err) { toast(`Couldn't add it to your plan: ${err.message || "try again"}`); }
  }
}

/** the resource's Connections, in a drawer beside the page */
export function openConnections(r, app = "/app.html", extra = []) {
  const d = openDrawer({ title: r.title, side: "right", label: `Connections: ${r.title}`, body: `<div class="gx-cn-host"></div>` });
  const c = mountConnections((d.box || d.el).querySelector(".gx-cn-host"), r, { app, extra });
  const el = d.el || d.box;
  const stop = () => c?.stop?.();
  d.done?.then(stop);
  return d;
}
