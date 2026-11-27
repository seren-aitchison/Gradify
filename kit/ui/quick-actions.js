// Quick actions: the things a learner does again and again, in as few steps as possible, the same on every page.
//
//   Create      "c", or New in the quick tools: a Notes page, a task for today, a flashcard set, a collection,
//               a mind map or a quiz, without going to the tool first (openCreate)
//   This page   "." opens the page's ••• menu; each action in it has its own key (P pin, S save, L connections,
//               T schedule, N note, R rename, D duplicate, M move, E export, X delete, ! report a problem).
//               What's in it depends on the resource: a page says what it can do with setPageOps()
//   Undo        every change made here can be undone from its notice, or later with ⌘Z / Ctrl+Z (undoable)
//   Delete      waits until the notice has gone before anything is really deleted, so Undo always works
//               (deferredDelete)
//   Select      many things at once, then act on them together (mountMultiSelect)
//   Report and  a problem in a lesson or question goes to the course team's repair queue; feedback about a tool
//   feedback    goes to the Gradify team. Offline or signed out, both wait on this device and are sent later (outbox)
import { esc, ensureStyles, isMac } from "./store.js";
import { uiIcon } from "./icons.js";
import { openModal } from "./overlay.js";
import { toast } from "./feedback.js";
import { shortcuts } from "./keys.js";
import { createCollection, collections, addToCollection } from "../data/links.js";
import { folderLabel } from "../data/organise.js";

// ---------- undo ----------
const undos = [];
/**
 * A notice with Undo, and an entry ⌘Z can undo after the notice has gone. undo() may be async; it returns false when
 * it's too late, and a rejection means it failed: then the entry stays, to be tried again.
 */
export function undoable(html, undo, { label = "", ...opts } = {}) {
  const u = { label, done: false, busy: false };
  // resolves true (undone), false (too late) or "failed"; only a real undo uses the entry up
  u.run = async () => {
    if (u.done) return false;
    if (u.busy) return "busy";
    u.busy = true;
    try { const r = await undo(); if (r === false) { u.done = true; return false; } u.done = true; return true; }
    catch (e) { console.warn("undo", e); return "failed"; }
    finally { u.busy = false; }
  };
  undos.push(u); if (undos.length > 20) undos.shift();
  return toast({ html }, { timeout: 7000, ...opts, undo: async () => { const r = await u.run(); if (r === "failed") throw new Error("undo failed"); return r !== false; } });
}
/** undo the latest change that can still be undone, and say what really happened */
export async function undoLast() {
  const u = [...undos].reverse().find((x) => !x.done);
  if (!u) { toast("Nothing to undo."); return false; }
  const r = await u.run();
  if (r === "busy") return false;
  if (r === "failed") { toast("Couldn't undo that. Try again.", { tone: "warn", key: "gx-undone" }); return false; }
  if (r === false) { toast("That can't be undone any more.", { key: "gx-undone" }); return false; }
  toast({ html: `Undone${u.label ? `: <b>${esc(u.label)}</b>` : ""}` }, { tone: "ok", key: "gx-undone", timeout: 2200, icon: "undo" });
  return true;
}
export const _undos = () => undos;   // tests

/**
 * Delete with Undo: the thing is hidden at once and really deleted only when its notice goes without Undo (it stays
 * while hovered or focused, and goes when dismissed or pushed out by newer notices), or the page is left. So Undo
 * is always possible while it's offered, and never has to rebuild anything.
 * o: { html, label, hide(), restore(), commit() → Promise, ms }
 */
export function deferredDelete({ html, label = "", hide, restore, commit, ms = 7000 }) {
  hide?.();
  let settled = false;
  const off = () => removeEventListener("pagehide", now);
  const now = () => { if (settled) return; settled = true; off(); Promise.resolve().then(commit).catch((e) => { console.warn("delete", e); restore?.(); toast(`Couldn't delete it: ${e.message || "try again"}`); }); };
  // only leaving the page commits; switching tabs doesn't, so Undo still works on return (a delete that never
  // committed just leaves the item where it was)
  addEventListener("pagehide", now);
  undoable(html, () => { if (settled) return false; settled = true; off(); restore?.(); }, { label, timeout: ms, onClose: ({ undone }) => { if (!undone) now(); } });
  return { now };
}

// ---------- this page's resource and what can be done with it ----------
export const routeKey = (hash = typeof location !== "undefined" ? location.hash : "") => String(hash).split("?")[0] || "#/";
let page = { key: null, ops: null };
/** a page says what its resource supports: { rename, duplicate, move, delete, export, report, feedback } (functions) */
export function setPageOps(ops, key = routeKey()) { page = { key, ops }; }
export const pageOps = () => (page.key === routeKey() ? page.ops || {} : {});
const menus = new Set();
/** a ••• menu that "." opens when it's the one in view (the lesson's beats the course's, being mounted later) */
export function registerPageMenu(m) { menus.add(m); return () => menus.delete(m); }
export function pageMenu() { return [...menus].reverse().find((m) => m.el.isConnected && m.el.offsetParent !== null) || null; }

// the extra actions a resource can have, beside pin/save/link/schedule/note/share/history, in menu order
export const EXTRA = [
  ["rename", "edit", "Rename", "Change its name here", "r"],
  ["duplicate", "copy", "Duplicate", "A copy to change without touching this one", "d"],
  ["move", "inbox", "Move to…", "Another collection", "m"],
  ["export", "download", "Export", "Download a copy", "e"],
  ["report", "flag", "Report a problem", "Something wrong, unclear or broken", "!"],
  ["delete", "trash", "Delete", "You can undo it", "x"],
];
/** each menu action's key in the ••• menu (pure; tests) */
export const MENU_KEYS = { pin: "p", save: "s", tag: "g", link: "l", schedule: "t", note: "n", share: "c", history: "h", ...Object.fromEntries(EXTRA.map(([a, , , , k]) => [a, k])) };

// ---------- create ----------
/** what can be made from anywhere (pure; tests). [id, label, icon, what, needs] */
export const CREATE = [
  ["note", "Notes page", "notes", "A new page in Notes"],
  ["task", "Task for today", "check", "Into today's plan, ticked off from Today"],
  ["cards", "Flashcard set", "cards", "From your notes, a PDF or a lesson"],
  ["collection", "Collection", "inbox", "A folder for things from any tool"],
  ["map", "Mind map", "grid", "From a lesson or your own notes"],
  ["quiz", "Practice quiz", "trophy", "Questions on what you choose"],
];
const pad = (n) => String(n).padStart(2, "0");
const todayKey = () => { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
/** a task's time today: from the next quarter hour, for 25 minutes, never past midnight (pure; tests) */
export function taskSlot(now = new Date(), mins = 25) {
  const m = now.getHours() * 60 + now.getMinutes(), start = Math.min(1440 - mins, Math.ceil((m + 1) / 15) * 15);
  return { start_min: start, end_min: start + mins };
}
const getStore = async (store) => (typeof store === "function" ? store() : store);

/** make something: the menu, or straight to one kind ("note", "task", …) */
export function openCreate({ app = "/app.html", store = null, kind = null } = {}) {
  ensureStyles();
  const local = (h) => (location.pathname === app ? h : `${app}${h}`);
  const go = (h) => { m.close(); location.href = local(h); };
  const body = `<div class="gx-cr" role="list">${CREATE.filter(([id]) => id !== "task" || store).map(([id, label, ic, what]) => `<button type="button" role="listitem" class="gx-cr-i" data-cr="${id}">${uiIcon(ic)}<span><b>${esc(label)}</b><small>${esc(what)}</small></span></button>`).join("")}</div>
    <form class="gx-cr-f" hidden><label><span data-cr-l>Name</span><input maxlength="120" required></label><div class="gx-cr-row"><button type="button" class="btn btn-ghost lg btn-sm" data-cr-back><span>Back</span></button><button class="btn btn-primary lg btn-sm" type="submit"><span>Create</span></button></div></form>`;
  const m = openModal({ title: "Create", body });
  const box = m.box, list = box.querySelector(".gx-cr"), form = box.querySelector(".gx-cr-f"), input = form.querySelector("input");
  let want = null;
  const ask = (id, label, placeholder) => { want = id; list.hidden = true; form.hidden = false; form.querySelector("[data-cr-l]").textContent = label; input.placeholder = placeholder; input.value = ""; input.focus(); };
  const pick = (id) => {
    if (id === "note") ask("note", "Page title", "e.g. Cardiac cycle: my questions");
    else if (id === "task") ask("task", "What to do today", "e.g. Redo the enzymes questions");
    else if (id === "collection") ask("collection", "Collection name", "e.g. Mock exam week");
    else if (id === "cards") go("#/new");
    else if (id === "map") go("#/tools/map/new");
    else if (id === "quiz") go("#/tools/quiz/practice");
  };
  box.addEventListener("click", (e) => { const b = e.target.closest("[data-cr]"); if (b) pick(b.dataset.cr); if (e.target.closest("[data-cr-back]")) { list.hidden = false; form.hidden = true; list.querySelector("button")?.focus(); } });
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); const t = input.value.trim(); if (!t) return;
    const btn = form.querySelector("[type=submit]"); btn.disabled = true;
    try {
      if (want === "note") {
        const [M, S] = await Promise.all([import("../notes/kb/model.js"), import("../notes/kb/store.js")]);
        const kb = S.load(), r = M.create(kb, { text: t }); S.save();
        go(`#/notes/${r.id}`);
      } else if (want === "task") {
        const s = await getStore(store);
        const b = await s.saveBlock({ day: todayKey(), ...taskSlot(), title: t.slice(0, 120), cal: "study" });
        m.close(); undoable(`Added <b>${esc(t)}</b> to today's plan.`, async () => { if (b?.id) await s.deleteBlock(b.id); dispatchEvent(new Event("gradify-plan")); }, { label: t });
        dispatchEvent(new Event("gradify-plan"));
      } else if (want === "collection") {
        const id = createCollection(t); go(`#/collections/${id}`);
      }
    } catch (err) { btn.disabled = false; toast(`Couldn't create it: ${err.message || "try again"}`); }
  });
  if (kind) pick(kind); else setTimeout(() => list.querySelector("button")?.focus(), 30);
  return m;
}

// ---------- rename in place ----------
/**
 * Rename where the name is shown: the heading becomes a text box; Enter or leaving it saves, Escape keeps the old
 * name. save(newName) may throw (then the old name comes back). Undo puts the old name back.
 */
export function renameInPlace(el, current, save, { label = "Name" } = {}) {
  if (!el || el.querySelector("input.gx-rn")) return;
  const before = el.innerHTML;
  el.innerHTML = `<label class="sr-only" for="gx-rn">${esc(label)}</label><input id="gx-rn" class="gx-rn" maxlength="200" value="${esc(current)}">`;
  const input = el.querySelector("input"); input.focus(); input.select();
  let done = false;
  const finish = async (keep) => {
    if (done) return; done = true;
    const t = input.value.trim();
    if (!keep || !t || t === current) { el.innerHTML = before; return; }
    el.textContent = t;
    try {
      await save(t);
      undoable(`Renamed to <b>${esc(t)}</b>.`, async () => { await save(current); el.textContent = current; }, { label: `renamed ${current}` });
    } catch (err) { el.innerHTML = before; toast(`Couldn't rename it: ${err.message || "try again"}`); }
  };
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); finish(true); } else if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); finish(false); } });
  input.addEventListener("blur", () => finish(true));
}

// ---------- pick a collection (move, copy, save many) ----------
/** choose a collection (or make one): resolves to its id, or null */
export function pickCollection({ title = "Choose a collection", exclude = null } = {}) {
  return new Promise((done) => {
    // folders only (a smart folder fills itself), with the folders they're inside
    const all = collections(), cols = all.filter((c) => c.id !== exclude && !c.smart && !c.archived).map((c) => ({ ...c, name: folderLabel(all, c.id) })).sort((a, b) => a.name.localeCompare(b.name));
    let chosen = null;
    const m = openModal({ title, body: `${cols.length ? `<ul class="gx-ra-cols">${cols.map((c) => `<li><button type="button" class="gx-pick" data-col="${esc(c.id)}">${uiIcon("inbox")}${esc(c.name)}</button></li>`).join("")}</ul>` : `<p class="sub">No other collections yet.</p>`}
      <form class="gx-ra-new"><label class="sr-only" for="gx-pc-new">New collection</label><input id="gx-pc-new" placeholder="Or a new one, e.g. Mock exam week" maxlength="80"><button type="submit" class="btn btn-ghost lg btn-sm"><span>Create</span></button></form>`,
      actions: [{ label: "Cancel" }] });
    m.box.addEventListener("click", (e) => { const b = e.target.closest("[data-col]"); if (b) { chosen = b.dataset.col; m.close(); } });
    m.box.addEventListener("submit", (e) => { e.preventDefault(); const n = m.box.querySelector("#gx-pc-new").value.trim(); if (!n) return; chosen = createCollection(n); m.close(); });
    (m.done || Promise.resolve()).then(() => done(chosen));
    if (!m.done) { const watch = setInterval(() => { if (!m.box.isConnected) { clearInterval(watch); done(chosen); } }, 200); }
    setTimeout(() => m.box.querySelector("button, input")?.focus(), 30);
  });
}
/** add many resources to a collection the learner picks, with Undo */
export async function saveMany(rs) {
  const cid = await pickCollection({ title: `Save ${rs.length} to a folder` }); if (!cid) return;
  const name = collections().find((c) => c.id === cid)?.name || "the collection";
  const { itemsOf, removeFromCollection } = await import("../data/links.js");
  const had = new Set(itemsOf(cid).map((x) => x.rid)), added = rs.filter((r) => !had.has(r.rid));
  added.forEach((r) => addToCollection(cid, r));
  undoable(`Saved ${rs.length} to <b>${esc(name)}</b>.`, () => added.forEach((r) => removeFromCollection(cid, r.rid)), { label: `saved to ${name}` });
}

// ---------- export ----------
/** download text as a file */
export function download(name, text, type = "text/plain") {
  const url = URL.createObjectURL(new Blob([text], { type: `${type};charset=utf-8` }));
  const a = Object.assign(document.createElement("a"), { href: url, download: name });
  document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
}
const csvCell = (s) => `"${String(s ?? "").replace(/"/g, '""')}"`;
/** flashcards as CSV (front, back, topic), for a spreadsheet or another flashcard app (pure; tests) */
export const cardsCsv = (cards) => ["front,back,topic", ...cards.map((c) => [c.front, c.back, c.topic || ""].map(csvCell).join(","))].join("\r\n");
/** resources as a Markdown list of links (pure; tests) */
export const resourcesMd = (title, rs, base = "https://gradify.app") => [`# ${title}`, "", ...rs.map((r) => { let u = r.href || ""; try { u = new URL(u, base).href; } catch { /* as is */ } return `- [${String(r.title).replace(/[[\]]/g, "")}](${u})${r.sub ? ` · ${r.sub}` : ""}`; })].join("\n");
export const fileName = (s, ext) => `${String(s || "gradify").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "gradify"}.${ext}`;

// ---------- reports and feedback: sent now, or kept on this device until they can be ----------
// The outbox is saved before anything is sent, so a closed tab loses nothing. Each entry records whose it is: one
// sent while signed in goes only with that account; one written while signed out goes with the account that next
// signs in here (the dialog says so when it's kept). Sending is one at a time, and only what was sent or refused
// for good leaves the outbox, so two quick reports never overwrite each other.
const OUTBOX = "gradify.outbox";
const readBox = () => { try { return JSON.parse(localStorage.getItem(OUTBOX) || "[]"); } catch { return []; } };
const writeBox = (v) => { try { localStorage.setItem(OUTBOX, JSON.stringify(v.slice(-50))); return true; } catch { return false; } };
// a report waits at most 30 days; one the database refuses for what it says (a check) is dropped, not retried
const FOREVER = new Set(["23514", "22001", "23502", "22P02"]);
const fresh = (x) => Date.now() - x.t < 30 * 864e5;
const LAST = "gradify.lastuser";   // the account last seen here, so a report can be saved before anyone is asked who it is
const lastUser = () => { try { return localStorage.getItem(LAST) || null; } catch { return null; } };
/** who's signed in now: { db, id }, null when confirmed signed out, { unverified: true } when it couldn't be checked */
async function account(store) {
  try {
    const s = await getStore(store), u = s?.mode === "cloud" ? await s.user?.() : null;
    try { u?.id ? localStorage.setItem(LAST, u.id) : localStorage.removeItem(LAST); } catch { /* fine */ }
    return u?.id ? { db: s.db, id: u.id } : null;
  } catch { return { unverified: true }; }
}
let flushing = Promise.resolve();
const delivered = new Set(), refused = new Set();   // ids sent / refused for good by any flush on this page
/** send what's waiting for this account, one flush at a time; returns the ids it delivered or dropped */
function flush(store) {
  const run = flushing.then(async () => {
    const me = await account(store); if (!me || me.unverified) return new Set();
    const settled = new Set();
    // entries kept before each had an id get one now, saved once, so each is sent and taken out on its own
    const box = readBox();
    if (box.some((x) => !x.id)) writeBox(box.map((x, i) => (x.id ? x : { ...x, id: `l${Date.now().toString(36)}${i}${Math.random().toString(36).slice(2, 7)}` })));
    for (const x of readBox().filter(fresh)) {
      if (!x.id) continue;   // couldn't be saved with one (storage blocked): left as it is
      if (x.owner && x.owner !== me.id) continue;   // someone else's: it waits for them
      // an owned entry names its owner in the insert, so if the session has changed meanwhile the database refuses it
      // (and it stays) instead of filing it under whoever is signed in
      try {
        const { error } = await me.db.from(x.table).insert(x.owner ? { ...x.row, user_id: x.owner } : x.row);
        if (!error) { settled.add(x.id); delivered.add(x.id); } else if (FOREVER.has(error.code)) { settled.add(x.id); refused.add(x.id); }
      }
      catch { /* offline: it stays */ }
    }
    // take out only what this flush settled, from the outbox as it is now (new entries may have arrived meanwhile)
    if (settled.size) writeBox(readBox().filter((x) => fresh(x) && !settled.has(x.id)));
    return settled;
  });
  flushing = run.catch(() => new Set());
  return run;
}
/**
 * Keep a report or feedback (saved on this device first) and send it now if the learner is signed in; with no row,
 * send what's waiting. Resolves "sent" | "waiting" (kept, to send later) | "rejected" (the database refused it for good) | "failed" (couldn't even be kept here).
 */
export async function sendOrKeep(store, table, row) {
  let id = null;
  if (row) {
    // saved at once, before any waiting, so closing the page right now loses nothing; it's owned by the account last
    // seen here (none if signed out), and only that account's session sends it
    id = `o${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
    if (!writeBox([...readBox().filter(fresh), { id, table, row, t: Date.now(), owner: lastUser() }])) {
      // storage is blocked or full: send straight away if we can, and say so if we can't
      const me = await account(store);
      if (!me || me.unverified) return "failed";
      try { const { error } = await me.db.from(table).insert(row); return !error ? "sent" : FOREVER.has(error.code) ? "rejected" : "failed"; } catch { return "failed"; }
    }
  }
  await flush(store);
  return id ? (delivered.has(id) ? "sent" : refused.has(id) ? "rejected" : "waiting") : "sent";
}
export const waiting = () => readBox().length;

/** send from a dialog: it stays open (with what was written) until it's sent or kept, and says so if neither worked */
async function sending(m, go) {
  const btn = m.box.querySelector(".gx-dfoot [data-gx-act]:last-child"); if (btn) btn.disabled = true;
  const r = await go().catch(() => "failed");
  if (r === "failed" || r === "rejected") {
    if (btn) btn.disabled = false;
    let note = m.box.querySelector(".gx-rep-err");
    if (!note) { note = Object.assign(document.createElement("p"), { className: "gx-rep-err aq-note" }); note.setAttribute("role", "alert"); m.box.querySelector("form")?.append(note); }
    note.textContent = r === "rejected" ? "Couldn't send it: it wasn't accepted. Check what you wrote and try again." : "Couldn't send or keep it: this browser isn't letting Gradify save anything. Sign in, or copy what you wrote, and try again.";
    return null;
  }
  m.close();
  return r;
}
const REPORT_KINDS = [["wrong", "Something's wrong", "A fact, an answer or a mark scheme"], ["unclear", "It's unclear", "Hard to follow, or it skips a step"], ["typo", "A typo", "Spelling, a symbol, formatting"], ["broken", "Something's broken", "A diagram, a question or a button doesn't work"], ["other", "Something else", ""]];
const SLUG = /^[a-z0-9-]{1,40}$/, QID = /^[a-z0-9-]{1,80}$/;
/** the row a report saves (pure; tests): null when the lesson can't be named safely */
export function reportRow({ site = null, subject, lesson, question = null, kind = "other", note = "" }) {
  if (!SLUG.test(subject || "") || !SLUG.test(lesson || "")) return null;
  return { site: site ? String(site).slice(0, 40) : null, subject, lesson_id: lesson, question_id: question && QID.test(question) ? question : null, kind: REPORT_KINDS.some(([k]) => k === kind) ? kind : "other", note: String(note || "").trim().slice(0, 1000) || null };
}
/** report a problem in a lesson or one of its questions. ctx: { site, subject, lesson, question, store } */
export function reportDialog(r, ctx) {
  const m = openModal({ title: `Report a problem: ${r.title}`, body: `<form class="gx-rep"><fieldset><legend class="sr-only">What's the problem?</legend>${REPORT_KINDS.map(([k, l, s], i) => `<label class="gx-rep-k"><input type="radio" name="kind" value="${k}" ${i ? "" : "checked"}><span><b>${l}</b>${s ? `<small>${s}</small>` : ""}</span></label>`).join("")}</fieldset>
    <label><span>What should it say? (optional)</span><textarea name="note" rows="3" maxlength="1000" placeholder="e.g. The answer to question 3 should be 4.2 kJ, not 42 kJ"></textarea></label>
    <p class="aq-note">It goes to the people who check this course, with the lesson and question, not your name. Thank you: every report makes the course better for everyone.</p></form>`,
    actions: [{ label: "Cancel" }, { label: "Send report", primary: true, run: () => { send(); return false; } }] });
  async function send() {
    const f = new FormData(m.box.querySelector("form")), row = reportRow({ ...ctx, kind: f.get("kind"), note: f.get("note") });
    if (!row) { m.close(); toast("This page can't be reported from here."); return; }
    const r2 = await sending(m, () => sendOrKeep(ctx.store, "lesson_reports", row)); if (!r2) return;
    toast(r2 === "sent" ? "Report sent. Thank you." : "Report saved on this device: it's sent with your account when you're signed in and online.", { tone: "ok" });
  }
  setTimeout(() => m.box.querySelector("input:checked")?.focus(), 30);
  return m;
}
const FEEDBACK_KINDS = [["idea", "An idea"], ["problem", "A problem"], ["praise", "Something I like"], ["other", "Something else"]];
/** the row feedback saves (pure; tests) */
export function feedbackRow({ site = null, about = "", kind = "idea", note = "", page = "" }) {
  const n = String(note || "").trim(); if (!n) return null;
  return { site: site ? String(site).slice(0, 40) : null, about: String(about || "Gradify").slice(0, 80), kind: FEEDBACK_KINDS.some(([k]) => k === kind) ? kind : "other", note: n.slice(0, 2000), page: String(page || "").split(/[?#]/)[0].slice(0, 200) || null };
}
/** feedback about a tool or page, for the Gradify team. ctx: { about, site, store } */
export function feedbackDialog(ctx = {}) {
  const m = openModal({ title: `Feedback${ctx.about ? `: ${ctx.about}` : ""}`, body: `<form class="gx-rep"><div class="gx-fb-k" role="radiogroup" aria-label="What kind of feedback">${FEEDBACK_KINDS.map(([k, l], i) => `<label><input type="radio" name="kind" value="${k}" ${i ? "" : "checked"}><span>${l}</span></label>`).join("")}</div>
    <label><span>Tell us</span><textarea name="note" rows="4" maxlength="2000" required placeholder="What would make this better? What got in the way?"></textarea></label>
    <p class="aq-note">Read by the Gradify team. Please don't include personal details.</p></form>`,
    actions: [{ label: "Cancel" }, { label: "Send feedback", primary: true, run: () => { send(); return false; } }] });
  async function send() {
    const f = new FormData(m.box.querySelector("form")), row = feedbackRow({ ...ctx, kind: f.get("kind"), note: f.get("note"), page: location.pathname + routeKey() });
    if (!row) { m.box.querySelector("textarea").focus(); return; }
    const r = await sending(m, () => sendOrKeep(ctx.store, "app_feedback", row)); if (!r) return;
    toast(r === "sent" ? "Thank you: sent to the Gradify team." : "Thank you: it's saved on this device and sent with your account when you're signed in and online.", { tone: "ok" });
  }
  setTimeout(() => m.box.querySelector("textarea")?.focus(), 30);
  return m;
}

// ---------- select many ----------
/**
 * Select many items in a list and act on them together.
 *   mountMultiSelect(root, { item: ".doc", key: (el) => id, name: (el) => title, toggleHost, actions: [{ id, label, icon, run(keys, els) }] })
 * "Select" turns it on; then a click (or Space) selects, Shift+click selects a range, ⌘A / Ctrl+A selects all,
 * Escape stops. The bar at the bottom says how many and holds the actions.
 */
let msLive = null;
/** end the selection on screen (a list drawn again calls this first, whether or not it offers selecting again) */
export const stopMultiSelect = () => { msLive?.abort(); msLive = null; };
export function mountMultiSelect(root, o) {
  if (!root) return null;
  ensureStyles();
  // one selection on screen at a time: a list drawn again replaces the last one's bar and listeners
  msLive?.abort(); const live = new AbortController(); msLive = live;
  const sig = { signal: live.signal };
  const items = () => [...root.querySelectorAll(o.item)];
  const sel = new Set(); let on = false, last = -1;
  const toggle = document.createElement("button");
  toggle.type = "button"; toggle.className = "btn btn-ghost lg btn-sm gx-ms-t"; toggle.setAttribute("aria-pressed", "false");
  toggle.innerHTML = `<span>Select</span>`;
  (o.toggleHost || root).insertAdjacentElement(o.toggleWhere || "afterbegin", toggle);
  const bar = document.createElement("div"); bar.className = "gx-ms-bar"; bar.setAttribute("role", "toolbar"); bar.setAttribute("aria-label", "Selected items"); bar.hidden = true;
  document.body.append(bar);
  // ended: its bar and button go, and the items are as they were, so the same list can offer it again cleanly
  live.signal.addEventListener("abort", () => {
    bar.remove(); toggle.remove(); root.classList.remove("gx-ms-on");
    for (const el of items()) { el.classList.remove("gx-ms-sel", "gx-ms-item"); el.removeAttribute("aria-pressed"); delete el.dataset.msLabel; }
  });
  function paint() {
    root.classList.toggle("gx-ms-on", on);
    toggle.setAttribute("aria-pressed", String(on)); toggle.querySelector("span").textContent = on ? "Done" : "Select";
    for (const el of items()) { const k = o.key(el), s = sel.has(k); el.classList.toggle("gx-ms-sel", s); el.classList.toggle("gx-ms-item", on); if (on) { el.setAttribute("aria-pressed", String(s)); el.dataset.msLabel = `Select ${o.name?.(el) || ""}`; } else el.removeAttribute("aria-pressed"); }
    bar.hidden = !on;
    const n = sel.size, all = items().length;
    bar.innerHTML = `<span class="gx-ms-n" aria-live="polite">${n ? `${n} selected` : "Select items"}</span><button type="button" class="gx-ms-b" data-ms="all">${n === all && all ? "Select none" : "Select all"}</button>${o.actions.map((a) => `<button type="button" class="gx-ms-b" data-ms="${a.id}" ${n ? "" : "disabled"}>${a.icon ? uiIcon(a.icon) : ""}${esc(a.label)}</button>`).join("")}<button type="button" class="gx-ms-x" data-ms="done" aria-label="Stop selecting">${uiIcon("close")}</button>`;
  }
  const set = (v) => { on = v; if (!v) { sel.clear(); last = -1; } paint(); if (v) items()[0]?.focus?.(); };
  toggle.addEventListener("click", () => set(!on), sig);
  root.addEventListener("click", (e) => {
    if (!on) return;
    const el = e.target.closest(o.item); if (!el || !root.contains(el)) return;
    e.preventDefault(); e.stopPropagation();
    const xs = items(), i = xs.indexOf(el), k = o.key(el);
    if (e.shiftKey && last >= 0) { const [a, b] = [Math.min(last, i), Math.max(last, i)]; xs.slice(a, b + 1).forEach((x) => sel.add(o.key(x))); }
    else if (sel.has(k)) sel.delete(k); else sel.add(k);
    last = i; paint(); el.focus?.();
  }, { capture: true, ...sig });
  root.addEventListener("keydown", (e) => {
    if (!on) return;
    const el = e.target.closest?.(o.item);
    if (el && (e.key === " " || e.key === "Enter")) { e.preventDefault(); el.click(); }
    else if ((isMac() ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === "a") { e.preventDefault(); items().forEach((x) => sel.add(o.key(x))); paint(); }
  }, sig);
  addEventListener("keydown", (e) => { if (on && e.key === "Escape" && !document.querySelector(".gx-layer")) { set(false); toggle.focus(); } }, sig);
  bar.addEventListener("click", async (e) => {
    const b = e.target.closest("[data-ms]"); if (!b) return;
    if (b.dataset.ms === "done") { set(false); toggle.focus(); return; }
    if (b.dataset.ms === "all") { const xs = items(); if (sel.size === xs.length) sel.clear(); else xs.forEach((x) => sel.add(o.key(x))); paint(); return; }
    const a = o.actions.find((x) => x.id === b.dataset.ms); if (!a || !sel.size) return;
    const keys = [...sel], els = items().filter((x) => sel.has(o.key(x)));
    await a.run(keys, els);
    if (a.keepOn) { paint(); return; }
    set(false);
  });
  // leaving the screen ends it
  addEventListener("hashchange", () => live.abort(), { once: true, ...sig });
  return { set, selected: () => [...sel], stop: () => live.abort() };
}

// ---------- keyboard ----------
let keysOn = false;
/** the quick-action shortcuts, once per page. o: { app, store, feedback: { about, site } } */
export function mountQuickKeys(o = {}) {
  if (keysOn) return; keysOn = true;
  const menu = (act) => () => { const m = pageMenu(); if (!m) return; if (act) m.run(act); else m.open(); };
  const has = (act) => () => Boolean(pageMenu()?.has?.(act));
  shortcuts([
    { keys: "c", label: "Create: a note, task, flashcard set, collection, mind map or quiz", group: "Quick actions", run: () => openCreate(o) },
    { keys: ".", label: "This page's actions (pin, save, link, rename, export…)", group: "Quick actions", run: menu(null), when: () => Boolean(pageMenu()) },
    { keys: "mod+s", label: "Save this to a collection", group: "Quick actions", run: menu("save"), when: () => Boolean(pageMenu()) },
    { keys: "F2", label: "Rename", group: "Quick actions", run: menu("rename"), when: has("rename") },
    { keys: "mod+Backspace", label: "Delete (you can undo it)", group: "Quick actions", run: menu("delete"), when: has("delete") },
    { keys: "mod+z", label: "Undo the last change", group: "Quick actions", run: () => undoLast(), when: () => !routeKey().startsWith("#/notes") },
  ]);
}
