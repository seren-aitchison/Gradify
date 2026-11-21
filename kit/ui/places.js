// Where the learner has been, and what they keep close:
//
//   Places   this tab's trail of meaningful locations ("gradify.places", per tab), each with its scroll position.
//            Going back to a place puts you back where you were on it; "Back to where I was" offers the last one.
//   Recent   the last places opened anywhere in Gradify on this device ("gradify.visited"): courses, lessons, tools.
//   Pins     what the learner pinned: courses, lessons, resources ("gradify.pins"), in the order they chose.
//
// The list functions are pure (tests/ui.test.mjs); the small wrappers below read and write this device's storage.
import { readJson, writeJson, local, session } from "./store.js";

// ---------- the trail (pure) ----------
/**
 * Record arriving at `place` ({ href, title, kind }). Arriving at the place before the current one is treated as
 * going back: the current one comes off the trail and its saved scroll position is returned, so the page can
 * put the learner back where they were.
 */
export function arrive(trail = [], place, limit = 30) {
  const cur = trail.at(-1), prev = trail.at(-2);
  if (cur?.href === place.href) return { trail: [...trail.slice(0, -1), { ...cur, ...place, y: cur.y }], back: false, y: null };
  if (prev?.href === place.href) return { trail: trail.slice(0, -1), back: true, y: prev.y ?? null };
  return { trail: [...trail, { ...place, y: 0, t: place.t ?? Date.now() }].slice(-limit), back: false, y: null };
}
/** note the scroll position of the current place */
export function scrolled(trail = [], y) {
  if (!trail.length) return trail;
  return [...trail.slice(0, -1), { ...trail.at(-1), y: Math.max(0, Math.round(y)) }];
}
/** the last meaningful place before this one (a different page, of a kind worth returning to) */
export function backTarget(trail = [], { kinds = null, within = 2 * 60 * 60e3, now = Date.now() } = {}) {
  const cur = trail.at(-1);
  for (let i = trail.length - 2; i >= 0; i--) {
    const p = trail[i];
    if (p.href === cur?.href) continue;
    if (now - (p.t || 0) > within) return null;
    if (!kinds || kinds.includes(p.kind)) return p;
  }
  return null;
}

// ---------- recent and pins (pure) ----------
export function addRecent(list = [], item, limit = 12) {
  return [{ ...item, t: item.t ?? Date.now() }, ...list.filter((x) => x.href !== item.href)].slice(0, limit);
}
export const isPinned = (list = [], href) => list.some((x) => x.href === href);
/** pin or unpin; returns { list, pinned, index } (index: where it was, so Undo can put it back) */
export function togglePin(list = [], item) {
  const i = list.findIndex((x) => x.href === item.href);
  if (i >= 0) return { list: list.filter((_, k) => k !== i), pinned: false, index: i, item: list[i] };
  return { list: [...list, { ...item, t: item.t ?? Date.now() }], pinned: true, index: list.length, item };
}
/** put an item back at an index (Undo after unpinning or removing) */
export function restoreAt(list = [], item, index) {
  const rest = list.filter((x) => x.href !== item.href);
  return [...rest.slice(0, index), item, ...rest.slice(index)];
}
/** move one item (drag-and-drop or the keyboard's move up/down) */
export function move(list = [], from, to) {
  if (from === to || from < 0 || from >= list.length) return list;
  const out = [...list], [x] = out.splice(from, 1);
  out.splice(Math.max(0, Math.min(out.length, to)), 0, x);
  return out;
}

// ---------- this device ----------
const TRAIL = "gradify.places", RECENT = "gradify.visited", PINS = "gradify.pins";
const listeners = new Set();
const changed = () => listeners.forEach((f) => { try { f(); } catch { /* a listener's own problem */ } });

export const trail = () => readJson(TRAIL, [], session());
export function arriveHere(place) { const r = arrive(trail(), place); writeJson(TRAIL, r.trail, session()); return r; }
export function rememberScroll(y) { writeJson(TRAIL, scrolled(trail(), y), session()); }
export const backPlace = (opts) => backTarget(trail(), opts);

export const recent = () => readJson(RECENT, [], local());
export function visit(item) { writeJson(RECENT, addRecent(recent(), item)); changed(); }

export const pins = () => readJson(PINS, [], local());
export const pinned = (href) => isPinned(pins(), href);
export function setPins(list) { writeJson(PINS, list); changed(); }
export function pin(item) { const r = togglePin(pins(), item); setPins(r.list); return r; }
export function onPlacesChange(f) { listeners.add(f); return () => listeners.delete(f); }
// another tab pinned something: keep this one in step
globalThis.addEventListener?.("storage", (e) => { if (e.key === PINS || e.key === RECENT) changed(); });
