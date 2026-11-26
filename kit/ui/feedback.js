// Feedback that never gets in the way: small toasts (with Undo for anything reversible), and the save indicator.
//
//   toast("Bookmark removed", { undo: () => restore() });            // Undo button, and ⌘Z / Ctrl+Z while it shows
//   toast("Copied link", { tone: "ok", key: "copy" });               // same key replaces, never stacks
//   const saved = mountSaveState(el); saved.set("saving"); saved.set("saved", { at: Date.now() });
//
// Rules (docs/DESIGN-SYSTEM.md): a reversible action is done at once and offered back with Undo, never confirmed in
// a pop-up first. Toasts are polite (screen readers hear them without interruption), stay longer while hovered or
// focused, and at most three show. The last twenty are kept for this tab: recentNotices() is the inbox.
import { esc, ensureStyles, isMac } from "./store.js";
import { uiIcon } from "./icons.js";

const notices = [];
export const recentNotices = () => [...notices];
let region = null;
const TONE_ICON = { ok: "check", info: "sparkles", warn: "alert", undo: "undo" };
// ⌘Z / Ctrl+Z goes to one notice only: the newest one still on screen that can be undone (one listener for all)
const undoable = [];
let undoKeyOn = false;
function onUndoKey(e) {
  if (!(e.key === "z" || e.key === "Z") || !(e.metaKey || e.ctrlKey) || e.shiftKey) return;
  if (e.target.closest?.("input, textarea, [contenteditable]")) return;   // their own undo
  for (let i = undoable.length - 1; i >= 0; i--) { const n = undoable[i]; if (!n.el.isConnected || n.done()) { undoable.splice(i, 1); continue; } e.preventDefault(); n.undo(); return; }
}

function regionEl() {
  if (region?.isConnected) return region;
  ensureStyles();
  region = Object.assign(document.createElement("div"), { className: "gx-toasts" });
  region.setAttribute("role", "status"); region.setAttribute("aria-live", "polite");
  document.body.append(region);
  return region;
}

/**
 * Show a toast. message is text; pass { html } as message for trusted markup (bold names, icons).
 * opts: { tone: ok|info|warn, undo: fn, action: { label, run }, timeout (ms), key (replace a toast with the same key), icon,
 *   onClose({ undone }) when it goes, however it goes }. undo() may return a promise; false means too late, and a
 *   rejection that it failed (the notice stays, to try again)
 */
export function toast(message, opts = {}) {
  if (typeof document === "undefined") return { close() {} };
  const box = regionEl();
  const html = typeof message === "string" ? esc(message) : message?.html || "";
  if (opts.key) { const was = box.querySelector(`[data-key="${CSS.escape(opts.key)}"]`); if (was) (was._close ? was._close(true) : was.remove()); }
  const el = document.createElement("div");
  el.className = `gx-toast gx-${opts.tone || (opts.undo ? "undo" : "info")}`;
  if (opts.key) el.dataset.key = opts.key;
  const ic = opts.icon ?? TONE_ICON[opts.tone] ?? (opts.undo ? null : null);
  el.innerHTML = `${ic ? uiIcon(ic) : ""}<span class="gx-tmsg">${html}</span>${opts.undo ? `<button type="button" class="gx-tbtn" data-undo title="Undo (${isMac() ? "⌘" : "Ctrl+"}Z)">${uiIcon("undo")}Undo</button>` : ""}${opts.action ? `<button type="button" class="gx-tbtn" data-act>${esc(opts.action.label)}</button>` : ""}<button type="button" class="gx-tx" aria-label="Dismiss">${uiIcon("close")}</button>`;
  box.append(el);
  // at most three: the oldest goes, closed properly (its Undo stops, and whoever's waiting on it hears it closed)
  while (box.children.length > 3) { const old = box.firstElementChild; if (old._close) old._close(true); else old.remove(); }
  notices.unshift({ text: el.querySelector(".gx-tmsg").textContent, tone: opts.tone || "info", t: Date.now() }); notices.length = Math.min(notices.length, 20);

  let timer = null, left = opts.timeout ?? (opts.undo || opts.action ? 7000 : 4000), started = Date.now();
  let closed = false;
  const close = (now = false) => {
    clearTimeout(timer);
    // a notice already on its way out still goes at once when it has to (the three-notice limit), or the limit's
    // loop would wait on it forever; whoever waits on it hears that it closed only once
    if (closed) { if (now === true) el.remove(); return; }
    closed = true;
    const at = undoable.findIndex((n) => n.el === el); if (at >= 0) undoable.splice(at, 1);
    try { opts.onClose?.({ undone }); } catch (e) { console.warn(e); }
    if (!el.isConnected) return;
    if (now === true) el.remove(); else { el.classList.add("out"); setTimeout(() => el.remove(), 220); }
  };
  el._close = close;
  const arm = () => { started = Date.now(); timer = setTimeout(close, left); };
  const hold = () => { clearTimeout(timer); left = Math.max(1500, left - (Date.now() - started)); };
  el.addEventListener("pointerenter", hold); el.addEventListener("pointerleave", arm);
  el.addEventListener("focusin", hold); el.addEventListener("focusout", arm);
  let undone = false, undoing = false;
  // "Undone" is said only once the undo has really happened; undo() may return false (too late) or fail
  const undo = async () => {
    if (undone || undoing) return; undoing = true;
    let r;
    try { r = await opts.undo(); } catch (e) { console.warn(e); r = "failed"; }
    undoing = false;
    if (r === false) { close(); toast("That can't be undone any more.", { key: "gx-undone", timeout: 2600 }); return; }
    if (r === "failed") { toast("Couldn't undo that. Try again.", { tone: "warn", key: "gx-undone", timeout: 2600 }); return; }
    undone = true; close();
    toast("Undone", { tone: "ok", key: "gx-undone", timeout: 1800, icon: "undo" });
  };
  if (opts.undo) {
    undoable.push({ el, undo, done: () => undone || closed });
    if (!undoKeyOn) { undoKeyOn = true; addEventListener("keydown", onUndoKey, true); }
  }
  el.querySelector("[data-undo]")?.addEventListener("click", undo);
  el.querySelector("[data-act]")?.addEventListener("click", () => { close(); opts.action.run(); });
  el.querySelector(".gx-tx").addEventListener("click", () => close());
  arm();
  return { close, el };
}

// ---------- the save indicator ----------
/**
 * What to say about where the learner's work is. state: saving | saved | local | offline | error | signed-out.
 * Pure (tests/ui.test.mjs). { at } is when it last saved, { waiting } how many answers are still to send.
 */
export function saveLabel(state, { at = null, waiting = 0, now = Date.now() } = {}) {
  const w = waiting ? ` · ${waiting} waiting` : "";
  const when = at ? (now - at < 60e3 ? "just now" : new Date(at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })) : "";
  switch (state) {
    case "saving": return { text: "Saving…", tone: "busy", icon: "cloud", title: "Saving your progress" };
    case "saved": return { text: "Saved", tone: "ok", icon: "check", title: `Saved to your account${when ? ` ${when === "just now" ? when : `at ${when}`}` : ""}. It syncs to every device.` };
    case "local": return { text: "Saved on this device", tone: "ok", icon: "check", title: "Saved in this browser. Sign in to keep it on every device." };
    case "offline": return { text: `Offline · saved here${w}`, tone: "warn", icon: "offline", title: "You're offline. Everything is saved on this device and syncs when you're back online." };
    case "signed-out": return { text: `Sign in to sync${w}`, tone: "warn", icon: "alert", title: "Your sign-in has expired. Everything is saved on this device; sign in again to sync it." };
    case "error": return { text: `Will retry${w}`, tone: "warn", icon: "alert", title: "Couldn't reach your account just now. Everything is saved on this device and Gradify will try again." };
    default: return { text: "", tone: "idle", icon: "check", title: "" };
  }
}

/** a small "Saved" pill in el; set(state, detail) updates it. "Saved" settles into a quiet tick after a moment. */
export function mountSaveState(el, { href = null } = {}) {
  ensureStyles();
  el.classList.add("gx-save");
  el.setAttribute("role", "status"); el.setAttribute("aria-live", "polite");
  let quiet = null;
  const set = (state, detail = {}) => {
    const l = saveLabel(state, detail);
    el.dataset.tone = l.tone; el.title = l.title; el.hidden = !l.text;
    const inner = `${uiIcon(l.icon)}<span>${esc(l.text)}</span>`;
    el.innerHTML = href && l.tone === "warn" ? `<a href="${esc(href)}">${inner}</a>` : inner;
    el.classList.remove("quiet"); clearTimeout(quiet);
    if (l.tone === "ok") quiet = setTimeout(() => el.classList.add("quiet"), 2500);
  };
  return { set, el };
}
