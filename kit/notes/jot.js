// Quick notes: a note taker for on the go, in the app's Notes section (#/jot, and the top of the library).
// Built for one thumb on a phone: a note box that's ready the moment the page opens, big tags to file a note as you
// write it, dictation where the browser has it, search, and a reading view with tickable to-dos in large type.
// Notes live on this device (localStorage "gradify.jots"); any note can be turned into a study pack (#/new), which
// is where Gradify's flashcards come from.
import { esc } from "../core/text.js";

const KEY = "gradify.jots", PACK_KEY = "gradify.jot.pack";
export const TAGS = [["note", "Note"], ["lecture", "Lecture"], ["idea", "Idea"], ["todo", "To-do"], ["question", "Question"]];
const TAG_NAME = Object.fromEntries(TAGS);
// small line icons this screen needs (the shared set has no microphone, search, back, bin or pin)
const SVG = {
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  back: '<path d="M15 18l-6-6 6-6"/>',
  bin: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
  pin: '<path d="M9 4h6l-1 6 4 4H6l4-4z"/><path d="M12 14v7"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  cards: '<rect x="3" y="7" width="14" height="12" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v10"/>',
  share: '<path d="M12 3v12M7 8l5-5 5 5M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5"/>',
  list: '<path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/>',
  todo: '<rect x="3" y="4" width="7" height="7" rx="1.5"/><path d="m4.5 7.5 1.5 1.5 2.5-3M14 7h7M3 15h7v6H3zM14 18h7"/>',
  head: '<path d="M6 4v16M18 4v16M6 12h12"/>',
};
const ico = (n) => `<svg class="jt-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${SVG[n]}</svg>`;

export function loadJots() { try { const v = JSON.parse(localStorage.getItem(KEY) || "[]"); return Array.isArray(v) ? v.filter((n) => n && n.id) : []; } catch { return []; } }
function saveJots(list) { try { localStorage.setItem(KEY, JSON.stringify(list)); return true; } catch { return false; } }
const uid = () => `j${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
export const titleOf = (n) => (n.text.split("\n").map((l) => l.replace(/^#+\s*|^\[[ x]\]\s*|^[-•*]\s*/i, "").trim()).find(Boolean) || "Untitled note").slice(0, 90);
const bodyOf = (n) => n.text.split("\n").map((l) => l.replace(/^\s*(#+|\[[ x]\]|[-•*])\s*/i, "").trim()).filter(Boolean).slice(1).join(" · ").slice(0, 160);
const todos = (t) => { const all = t.match(/^\s*\[[ x]\]/gim) || []; return { n: all.length, done: all.filter((x) => /x/i.test(x)).length }; };
const when = (t) => { const m = Math.round((Date.now() - t) / 6e4); if (m < 1) return "just now"; if (m < 60) return `${m} min ago`; if (m < 1440) return `${Math.round(m / 60)} h ago`; const d = new Date(t); return d.toLocaleDateString(undefined, { day: "numeric", month: "short" }); };
const sorted = (list) => [...list].sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned) || b.updated - a.updated);

function add(text, tag) { const now = Date.now(), n = { id: uid(), text, tag, pinned: false, created: now, updated: now }; saveJots([n, ...loadJots()]); return n; }
function update(id, patch) { const list = loadJots(), i = list.findIndex((n) => n.id === id); if (i < 0) return null; list[i] = { ...list[i], ...patch, updated: Date.now() }; saveJots(list); return list[i]; }
function remove(id) { const list = loadJots(), n = list.find((x) => x.id === id); saveJots(list.filter((x) => x.id !== id)); return n; }
function restore(n) { saveJots([n, ...loadJots().filter((x) => x.id !== n.id)]); }

// a note handed to "Add notes" (#/new) to become a study pack; renderNew takes it once
export function takePackDraft() { try { const v = JSON.parse(sessionStorage.getItem(PACK_KEY) || "null"); sessionStorage.removeItem(PACK_KEY); return v; } catch { return null; } }
const toPack = (n) => { try { sessionStorage.setItem(PACK_KEY, JSON.stringify({ title: titleOf(n), text: n.text })); } catch { /* private mode */ } location.hash = "#/new"; };

// dictation, where the browser offers it: words are added at the end of the box as they're heard
const Speech = globalThis.SpeechRecognition || globalThis.webkitSpeechRecognition;
function wireMic(btn, box, onText, status) {
  if (!Speech || !btn) { btn?.remove(); return; }
  let rec = null;
  const stop = () => { rec?.stop(); rec = null; btn.setAttribute("aria-pressed", "false"); btn.classList.remove("on"); if (status) status.textContent = ""; };
  btn.addEventListener("click", () => {
    if (rec) return stop();
    rec = new Speech(); rec.continuous = true; rec.interimResults = false; rec.lang = document.documentElement.lang || "en-GB";
    rec.onresult = (e) => { let t = ""; for (let i = e.resultIndex; i < e.results.length; i++) if (e.results[i].isFinal) t += e.results[i][0].transcript; t = t.trim(); if (!t) return;
      box.value = `${box.value}${box.value && !/\s$/.test(box.value) ? " " : ""}${t}`; box.dispatchEvent(new Event("input")); onText?.(); };
    rec.onerror = rec.onend = () => stop();
    try { rec.start(); btn.setAttribute("aria-pressed", "true"); btn.classList.add("on"); if (status) status.textContent = "Listening… tap the microphone again to stop."; } catch { stop(); }
  });
  addEventListener("hashchange", stop, { once: true });
}
const grow = (t, max = 9999) => { t.style.height = "auto"; t.style.height = `${Math.min(t.scrollHeight + 2, max)}px`; };
const tagChips = (name, cur) => `<div class="jt-tags" role="radiogroup" aria-label="File it as">${TAGS.map(([k, l]) => `<label class="jt-tag t-${k}"><input type="radio" name="${name}" value="${k}"${k === cur ? " checked" : ""}><span>${l}</span></label>`).join("")}</div>`;
const card = (n) => { const td = todos(n.text), b = bodyOf(n);
  return `<li><a class="jt-card t-${esc(n.tag)}" href="#/jot/${esc(n.id)}"><span class="jt-ct">${n.pinned ? `<span class="jt-pinned" title="Pinned">${ico("pin")}</span>` : ""}<b>${esc(titleOf(n))}</b></span>${b ? `<span class="jt-cb">${esc(b)}</span>` : ""}
    <span class="jt-cm"><em class="jt-chip t-${esc(n.tag)}">${esc(TAG_NAME[n.tag] || "Note")}</em>${td.n ? `<span>${td.done}/${td.n} ticked</span>` : ""}<span>${when(n.updated)}</span></span></a></li>`; };

// the composer: the box to write in, its tags and its buttons (shared by the library strip and the full page)
const composerHtml = (id) => `<form class="jt-new" data-jt-new><label class="sr-only" for="${id}">New note</label>
    <textarea id="${id}" rows="2" maxlength="20000" placeholder="Jot something down…" enterkeyhint="enter"></textarea>
    ${tagChips(`${id}-tag`, "note")}
    <div class="jt-newrow"><button type="button" class="jt-round" data-mic aria-pressed="false" aria-label="Dictate">${ico("mic")}</button><span class="jt-status" aria-live="polite"></span>
      <button type="submit" class="btn btn-primary lg jt-save"><span>Save note</span></button></div></form>`;
function wireComposer(root, onSaved) {
  const f = root.querySelector("[data-jt-new]"); if (!f) return;
  const box = f.querySelector("textarea"), status = f.querySelector(".jt-status");
  box.addEventListener("input", () => grow(box, 320));
  box.addEventListener("keydown", (e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); f.requestSubmit(); } });
  wireMic(f.querySelector("[data-mic]"), box, null, status);
  f.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = box.value.trim(); if (!text) { status.textContent = "Write something first."; box.focus(); return; }
    const n = add(text, f.querySelector("input[type=radio]:checked")?.value || "note");
    box.value = ""; grow(box, 320); status.textContent = "Saved.";
    onSaved(n);
  });
}

/** The quick-notes strip at the top of the library: the composer and the latest few notes. */
export function jotStripHtml() {
  const list = sorted(loadJots()).slice(0, 4), all = loadJots().length;
  return `<section class="panel glass jt-strip" aria-labelledby="jt-strip-h"><div class="jt-striph"><h2 id="jt-strip-h">Quick notes</h2>${all ? `<a href="#/jot">All ${all} →</a>` : ""}</div>
    ${composerHtml("jt-q")}${list.length ? `<ul class="jt-list jt-mini">${list.map(card).join("")}</ul>` : ""}</section>`;
}
export function wireJotStrip(root) { wireComposer(root, () => { const s = root.querySelector(".jt-strip"); if (s) { s.outerHTML = jotStripHtml(); wireJotStrip(root); root.querySelector("#jt-q")?.focus(); } }); }

/** #/jot (every note: search, filter, write) and #/jot/<id> (one note: write or read, tick to-dos) */
export function renderJot(view, arg, { toast }) {
  if (arg) return renderOne(view, arg, { toast });
  let q = "", tag = "all";
  view.innerHTML = `<section class="jt">
    <header class="jt-head"><div><span class="kicker lo-kicker">Notes</span><h1>Quick notes</h1><p class="sub">For lectures, ideas and to-dos on the go. Saved on this device. Turn any note into flashcards.</p></div></header>
    <div class="panel glass jt-compose">${composerHtml("jt-q")}</div>
    <div class="jt-find"><label class="jt-search">${ico("search")}<span class="sr-only">Search notes</span><input type="search" placeholder="Search notes" autocomplete="off" enterkeyhint="search"></label>
      <div class="jt-filter" role="group" aria-label="Show"></div></div>
    <ul class="jt-list" aria-live="polite"></ul></section>`;
  const listEl = view.querySelector(".jt-list"), filt = view.querySelector(".jt-filter");
  const paint = () => {
    const all = loadJots(), counts = Object.fromEntries(TAGS.map(([k]) => [k, all.filter((n) => n.tag === k).length]));
    filt.innerHTML = [["all", "All", all.length], ...TAGS.filter(([k]) => counts[k]).map(([k, l]) => [k, l, counts[k]])].map(([k, l, c]) => `<button type="button" data-tag="${k}" aria-pressed="${tag === k}">${l} <small>${c}</small></button>`).join("");
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    const shown = sorted(all).filter((n) => (tag === "all" || n.tag === tag) && words.every((w) => n.text.toLowerCase().includes(w)));
    listEl.innerHTML = shown.length ? shown.map(card).join("") : `<li class="jt-empty">${all.length ? "No notes match. Try another word or show all." : "No notes yet. Write your first one above: it saves the moment you tap Save."}</li>`;
  };
  filt.addEventListener("click", (e) => { const b = e.target.closest("[data-tag]"); if (b) { tag = b.dataset.tag; paint(); } });
  view.querySelector("input[type=search]").addEventListener("input", (e) => { q = e.target.value; paint(); });
  wireComposer(view, () => { tag = "all"; paint(); });
  paint();
}

function renderOne(view, id, { toast }) {
  let n = loadJots().find((x) => x.id === id);
  if (!n) { location.replace("#/jot"); return; }
  // a note with to-dos opens ready to tick them; anything else opens ready to write
  let mode = todos(n.text).n ? "read" : "write";
  view.innerHTML = `<section class="jt jt-one">
    <div class="jt-bar"><a class="jt-round" href="#/jot" aria-label="All quick notes">${ico("back")}</a>
      <div class="jt-seg" role="group" aria-label="View"><button type="button" data-mode="write">Write</button><button type="button" data-mode="read">Read</button></div>
      <span class="jt-saved" aria-live="polite">Saved</span>
      <button type="button" class="jt-round" data-pin aria-pressed="${!!n.pinned}" aria-label="Pin to the top">${ico("pin")}</button></div>
    ${tagChips("jt-one-tag", n.tag)}
    <label class="sr-only" for="jt-text">Note</label><textarea id="jt-text" class="jt-text" maxlength="20000"></textarea>
    <div class="jt-read" hidden></div>
    <p class="jt-when"></p>
    <div class="jt-tools" role="toolbar" aria-label="Note tools">
      <button type="button" data-ins="[ ] " aria-label="Add a to-do">${ico("todo")}<span>To-do</span></button>
      <button type="button" data-ins="- " aria-label="Add a bullet">${ico("list")}<span>Bullet</span></button>
      <button type="button" data-ins="# " aria-label="Make a heading">${ico("head")}<span>Heading</span></button>
      <button type="button" data-mic aria-pressed="false" aria-label="Dictate">${ico("mic")}<span>Dictate</span></button>
      <button type="button" data-pack aria-label="Make flashcards from this note">${ico("cards")}<span>Cards</span></button>
      <button type="button" data-share aria-label="Share or copy">${ico("share")}<span>Share</span></button>
      <button type="button" data-del class="jt-del" aria-label="Delete this note">${ico("bin")}<span>Delete</span></button></div></section>`;
  const box = view.querySelector("#jt-text"), read = view.querySelector(".jt-read"), saved = view.querySelector(".jt-saved"), whenEl = view.querySelector(".jt-when");
  box.value = n.text;
  let t = 0;
  const flush = () => { clearTimeout(t); if (box.value !== n.text) { n = update(n.id, { text: box.value }) || n; } saved.textContent = "Saved"; whenEl.textContent = `Edited ${when(n.updated)} · created ${new Date(n.created).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })}`; };
  box.addEventListener("input", () => { saved.textContent = "Saving…"; grow(box); clearTimeout(t); t = setTimeout(flush, 400); });
  box.addEventListener("blur", flush);
  addEventListener("pagehide", flush, { once: true });
  addEventListener("hashchange", flush, { once: true });
  // the reading view: headings, bullets and to-dos you can tick, in large type
  const drawRead = () => {
    read.innerHTML = n.text.split("\n").map((line, i) => {
      const m = line.match(/^\s*\[([ x])\]\s*(.*)$/i);
      if (m) return `<label class="jt-todo"><input type="checkbox" data-line="${i}"${m[1].toLowerCase() === "x" ? " checked" : ""}><span>${esc(m[2]) || "&nbsp;"}</span></label>`;
      if (/^#+\s/.test(line)) return `<h3>${esc(line.replace(/^#+\s*/, ""))}</h3>`;
      if (/^\s*[-•*]\s/.test(line)) return `<p class="jt-bul">${esc(line.replace(/^\s*[-•*]\s*/, ""))}</p>`;
      return line.trim() ? `<p>${esc(line)}</p>` : `<p class="jt-gap"></p>`;
    }).join("") || `<p class="jt-empty">This note is empty.</p>`;
  };
  read.addEventListener("change", (e) => {
    const c = e.target.closest("[data-line]"); if (!c) return;
    const lines = n.text.split("\n"), i = +c.dataset.line;
    lines[i] = lines[i].replace(/^(\s*)\[[ x]\]/i, `$1[${c.checked ? "x" : " "}]`);
    n = update(n.id, { text: lines.join("\n") }) || n; box.value = n.text; flush();
  });
  const setMode = (m) => {
    flush(); mode = m;
    view.querySelectorAll("[data-mode]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.mode === m)));
    box.hidden = m !== "write"; read.hidden = m !== "read";
    view.querySelectorAll("[data-ins], .jt-tools [data-mic]").forEach((b) => { b.disabled = m !== "write"; });
    if (m === "read") drawRead(); else { grow(box); }
  };
  view.querySelector(".jt-seg").addEventListener("click", (e) => { const b = e.target.closest("[data-mode]"); if (b) setMode(b.dataset.mode); });
  view.querySelector("[data-pin]").addEventListener("click", (e) => { n = update(n.id, { pinned: !n.pinned }) || n; e.currentTarget.setAttribute("aria-pressed", String(!!n.pinned)); toast(n.pinned ? "Pinned to the top." : "Unpinned."); });
  view.querySelector(".jt-one > .jt-tags").addEventListener("change", (e) => { n = update(n.id, { tag: e.target.value }) || n; flush(); });
  // a prefix at the start of the line the cursor is on
  view.querySelectorAll("[data-ins]").forEach((b) => b.addEventListener("click", () => {
    const p = b.dataset.ins, s = box.selectionStart ?? box.value.length, start = box.value.lastIndexOf("\n", s - 1) + 1;
    if (box.value.startsWith(p, start)) box.setRangeText("", start, start + p.length, "end"); else box.setRangeText(p, start, start, "end");
    box.focus(); box.dispatchEvent(new Event("input"));
  }));
  wireMic(view.querySelector(".jt-tools [data-mic]"), box, null, saved);
  view.querySelector("[data-pack]").addEventListener("click", () => { flush(); toPack(n); });
  view.querySelector("[data-share]").addEventListener("click", async () => {
    flush();
    try { if (navigator.share) { await navigator.share({ title: titleOf(n), text: n.text }); return; } await navigator.clipboard.writeText(n.text); toast("Copied to the clipboard."); }
    catch (err) { if (err?.name !== "AbortError") toast("Couldn't share this note. Select the text and copy it instead."); }
  });
  view.querySelector("[data-del]").addEventListener("click", () => {
    clearTimeout(t); const gone = remove(n.id); location.hash = "#/jot";
    const tt = toast(`Note deleted. <button type="button" class="jt-undo">Undo</button>`, { timeout: 7000 });
    setTimeout(() => document.querySelector(".jt-undo")?.addEventListener("click", () => { restore(gone); tt?.close?.(); location.hash = `#/jot/${gone.id}`; }), 0);
  });
  setMode(mode); flush();
  if (mode === "write" && !n.text) box.focus();
}
