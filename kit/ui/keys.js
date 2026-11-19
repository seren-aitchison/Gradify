// Keyboard shortcuts, registered in one place so every page lists them the same way and ? shows them all.
//
//   const off = shortcuts([
//     { keys: "g h", label: "Go to course home", group: "Go to", run: () => go("home") },
//     { keys: "mod+k", label: "Search", group: "General", run: open, anywhere: true },
//   ]);
//
// keys: one key ("b", "?", "ArrowLeft", "Escape"), a combination ("mod+k": ⌘ on Apple devices, Ctrl elsewhere;
// "shift+/") or a sequence of two ("g h"). Shortcuts stand aside while the learner is typing (unless `anywhere`) and
// while a dialog is open. `when()` limits one to a page state (and hides it from the help sheet then, unless
// `show: true`). `show: false` keeps it out of the help sheet.
import { esc, isMac } from "./store.js";
import { overlayOpen, openModal } from "./overlay.js";

/** "mod+shift+k" → { key: "k", mod: true, shift: true, alt: false }; pure */
export function parseCombo(combo) {
  const parts = String(combo).split("+"), key = parts.pop();
  const has = (m) => parts.map((p) => p.toLowerCase()).includes(m);
  return { key: key.length === 1 ? key.toLowerCase() : key, mod: has("mod") || has("ctrl") || has("cmd"), shift: has("shift"), alt: has("alt") };
}
/** does a keyboard event (or any { key, metaKey, ctrlKey, shiftKey, altKey }) match one combination; pure */
export function matches(e, combo, mac = isMac()) {
  const c = parseCombo(combo), k = e.key?.length === 1 ? e.key.toLowerCase() : e.key;
  const mod = mac ? e.metaKey : e.ctrlKey;
  if (k !== c.key || Boolean(mod) !== c.mod || Boolean(e.altKey) !== c.alt) return false;
  // a printable symbol like ? already needs Shift, so Shift only counts for letters and named keys
  if (c.shift || /^[a-z]$|^[A-Z][a-z]+/.test(c.key)) return Boolean(e.shiftKey) === c.shift;
  return true;
}
/** how a shortcut is written for the learner: "mod+k" → ["⌘", "K"]; "g h" → ["G", "then", "H"] */
export function kbdParts(keys, mac = isMac()) {
  const NAMES = { ArrowLeft: "←", ArrowRight: "→", ArrowUp: "↑", ArrowDown: "↓", Escape: "Esc", Enter: "↵", mod: mac ? "⌘" : "Ctrl", shift: "Shift", alt: mac ? "⌥" : "Alt" };
  return String(keys).split(" ").flatMap((step, i) => [...(i ? ["then"] : []), ...step.split("+").map((p) => NAMES[p] || (p.length === 1 ? p.toUpperCase() : p))]);
}
export const kbdHtml = (keys) => kbdParts(keys).map((p) => (p === "then" ? `<small>then</small>` : `<kbd>${esc(p)}</kbd>`)).join("");
/** a tooltip line that shows the shortcut: "Bookmark (B)" */
export const withKey = (label, keys) => `${label} (${kbdParts(keys).filter((p) => p !== "then").join(isMac() ? "" : "+")})`;

const registry = new Set();
let pending = null, pendingT = null, wired = false;
const typing = (t) => Boolean(t?.closest?.("input, textarea, select, [contenteditable], [contenteditable=''], .co-ix, .co-lab"));

function onKey(e) {
  if (e.defaultPrevented || e.isComposing) return;
  const list = [...registry].filter((s) => !s.when || s.when());
  const inField = typing(e.target), blocked = overlayOpen();
  if (pending) {
    const want = `${pending} ${e.key.length === 1 ? e.key.toLowerCase() : e.key}`;
    pending = null; clearTimeout(pendingT);
    const s = list.find((x) => x.keys === want);
    if (s && !inField && !blocked) { e.preventDefault(); s.run(e); return; }
  }
  for (const s of list) {
    const steps = s.keys.split(" ");
    if (inField && !s.anywhere) continue;
    if (blocked && !s.anywhere) continue;
    if (steps.length === 2 && matches(e, steps[0])) { pending = steps[0]; pendingT = setTimeout(() => (pending = null), 1200); e.preventDefault(); return; }
    if (steps.length === 1 && matches(e, s.keys)) { e.preventDefault(); s.run(e); return; }
  }
}

export function shortcuts(list) {
  if (!wired && typeof addEventListener === "function") {
    wired = true; addEventListener("keydown", onKey);
    registry.add({ keys: "?", label: "Show keyboard shortcuts", group: "General", run: showShortcuts });
  }
  const added = list.map((s) => ({ group: "General", ...s }));
  added.forEach((s) => registry.add(s));
  return () => added.forEach((s) => registry.delete(s));
}

export function showShortcuts() {
  const groups = new Map();
  for (const s of registry) { if (s.show === false || (s.when && !s.when() && s.show !== true)) continue; if (!groups.has(s.group)) groups.set(s.group, []); if (!groups.get(s.group).some((x) => x.label === s.label)) groups.get(s.group).push(s); }
  const body = `<div class="gx-keys">${[...groups].map(([g, xs]) => `<section><h3>${esc(g)}</h3><dl>${xs.map((s) => `<div><dt>${esc(s.label)}</dt><dd>${kbdHtml(s.keys)}</dd></div>`).join("")}</dl></section>`).join("")}</div><p class="gx-note">Shortcuts pause while you're typing in a box.</p>`;
  return openModal({ title: "Keyboard shortcuts", body, size: "lg" });
}
