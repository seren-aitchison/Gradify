// The same actions for every resource, wherever it appears (kit/core/resource.js): a "•••" button that opens
//   Pin · Save to a collection · Link to… (Connections) · Schedule · Add a note · Share · See its history
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
import { collections, createCollection, addToCollection, removeFromCollection, collectionsOf, noteOf, setNote, schedule } from "../data/links.js";
import { mountConnections } from "./connections.js";

const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
const abs = (href) => { try { return new URL(href, location.href).href; } catch { return href; } };

export function mountResourceActions(host, getRes, { store = null, app = "/app.html", where = "beforeend", label = "More actions" } = {}) {
  if (!host) return null;
  ensureStyles();
  const wrap = document.createElement("div"); wrap.className = "gx-ra";
  wrap.innerHTML = `<button type="button" class="gx-rab" aria-haspopup="menu" aria-expanded="false" aria-label="${esc(label)}" title="${esc(label)}: pin, save, link, schedule, note, share">${uiIcon("more")}</button><div class="gx-ram" role="menu" hidden></div>`;
  host.insertAdjacentElement(where, wrap);
  const btn = wrap.querySelector(".gx-rab"), menu = wrap.querySelector(".gx-ram");
  const items = () => [...menu.querySelectorAll("[role=menuitem]")];
  function paint() {
    const r = getRes(); if (!r) return;
    const on = pinned(r.href), inCols = collectionsOf(r.rid).length, hasNote = Boolean(noteOf(r.rid));
    const it = (act, ic, text, sub = "") => `<button type="button" role="menuitem" data-ra="${act}">${uiIcon(ic)}<span><b>${text}</b>${sub ? `<small>${sub}</small>` : ""}</span></button>`;
    menu.innerHTML = `<p class="gx-ram-h">${esc(r.label)} · ${esc(r.title)}</p>
      ${it("pin", on ? "pinned" : "pin", on ? "Unpin" : "Pin", on ? "Pinned to your sidebar and home" : "Keep it in your sidebar and home")}
      ${it("save", "inbox", "Save to a collection", inCols ? `In ${inCols} collection${inCols > 1 ? "s" : ""}` : "Group it with things from any tool")}
      ${it("link", "link", "Connections", "Link it to notes, flashcards, lessons…")}
      ${store ? it("schedule", "clock", "Schedule", "Put it in your plan") : ""}
      ${it("note", "notes", hasNote ? "Edit your note" : "Add a note", "Your own words on it")}
      ${it("share", "up", "Share", "Copy a link to it")}
      ${it("history", "back", "See its history", "When you opened and studied it")}`;
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
  });
  document.addEventListener("click", (e) => { if (!wrap.contains(e.target)) close(); });
  menu.addEventListener("click", (e) => { const b = e.target.closest("[data-ra]"); if (!b) return; close(); act(b.dataset.ra, getRes()); });

  async function act(what, r) {
    if (!r) return;
    if (what === "pin") {
      const x = pin({ href: r.href, title: r.title, sub: r.sub || r.label, kind: r.kind });
      toast(`${x.pinned ? "Pinned" : "Unpinned"} <b>${esc(r.title)}</b>`, { undo: () => setPins(x.pinned ? pins().filter((p) => p.href !== r.href) : restoreAt(pins(), x.item, x.index)) });
    } else if (what === "save") saveDialog(r);
    else if (what === "link") openConnections(r, app);
    else if (what === "schedule") scheduleDialog(r);
    else if (what === "note") noteDialog(r);
    else if (what === "share") {
      const url = abs(r.href);
      try { if (navigator.share && matchMedia("(pointer: coarse)").matches) await navigator.share({ title: r.title, url }); else { await navigator.clipboard.writeText(url); toast("Link copied."); } }
      catch { toast(`Copy this link: ${esc(url)}`); }
    } else if (what === "history") location.href = `${app}#/history?q=${encodeURIComponent(r.title)}`;
  }
  function saveDialog(r) {
    const draw = () => { const mine = new Set(collectionsOf(r.rid)); return `<p class="sub">A collection groups things from any tool: lessons, flashcard sets, notes, questions. One thing can be in several.</p>
      ${collections().length ? `<ul class="gx-ra-cols">${collections().map((c) => `<li><label><input type="checkbox" data-col="${esc(c.id)}" ${mine.has(c.id) ? "checked" : ""}> ${esc(c.name)}</label></li>`).join("")}</ul>` : ""}
      <form class="gx-ra-new"><label class="sr-only" for="gx-ra-cn">New collection</label><input id="gx-ra-cn" placeholder="New collection, e.g. Mock exam week" maxlength="80"><button type="submit" class="btn btn-ghost lg btn-sm"><span>Create and add</span></button></form>`; };
    const m = openModal({ title: `Save “${r.title}”`, body: draw(), actions: [{ label: "Done", primary: true }] });
    m.box.addEventListener("change", (e) => { const x = e.target.closest("[data-col]"); if (!x) return; if (x.checked) addToCollection(x.dataset.col, r); else removeFromCollection(x.dataset.col, r.rid); });
    m.box.addEventListener("submit", (e) => { e.preventDefault(); const name = m.box.querySelector("#gx-ra-cn").value.trim(); if (!name) return; const id = createCollection(name); addToCollection(id, r); m.box.querySelector(".gx-body").innerHTML = draw(); m.box.querySelector("#gx-ra-cn")?.focus(); toast(`Added to <b>${esc(name)}</b>`); });   // focus stays in the dialog, so Escape and Tab still work
  }
  function noteDialog(r) {
    const m = openModal({ title: `Your note on “${r.title}”`, body: `<label class="sr-only" for="gx-ra-note">Your note</label><textarea id="gx-ra-note" rows="6" maxlength="4000" placeholder="What to remember, what to ask, where you got stuck…">${esc(noteOf(r.rid))}</textarea><p class="aq-note">It's shown with this ${esc(r.label.toLowerCase())} wherever it appears, and in its Connections.</p>`,
      actions: [{ label: "Cancel" }, { label: "Save note", primary: true, run: () => { setNote(r, m.box.querySelector("#gx-ra-note").value); toast("Note saved."); } }] });
    setTimeout(() => m.box.querySelector("textarea")?.focus(), 50);
  }
  function scheduleDialog(r) {
    const m = openModal({ title: `Schedule “${r.title}”`, body: `<form class="gx-ra-sched"><label><span>Day</span><input type="date" name="day" min="${today()}" value="${today()}" required></label><label><span>Start</span><input type="time" name="at" value="18:00" required></label><label><span>How long</span><select name="mins"><option value="15">15 min</option><option value="25" selected>25 min</option><option value="45">45 min</option><option value="60">1 hour</option></select></label></form><p class="aq-note">It goes into your plan, and finishing it ticks the block off.</p>`,
      actions: [{ label: "Cancel" }, { label: "Add to my plan", primary: true, run: () => { add(); return false; } }] });
    async function add() {
      const f = new FormData(m.box.querySelector("form")), [h, mi] = String(f.get("at")).split(":").map(Number), start = h * 60 + mi, end = Math.min(1440, start + Number(f.get("mins")));
      try {
        const s = await store();
        const block = await s.saveBlock({ day: f.get("day"), start_min: start, end_min: end, title: `${r.label}: ${r.title}`.slice(0, 120), cal: "study" });
        if (block?.id) schedule(r, block);
        m.close(); toast(`In your plan for ${new Date(`${f.get("day")}T12:00`).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}.`);
      } catch (err) { toast(`Couldn't add it to your plan: ${esc(err.message || "try again")}`); }
    }
  }
  return { open, close, el: wrap };
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
