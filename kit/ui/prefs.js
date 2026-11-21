// Remembered interface preferences: which view, which filter, which tab, which sections are open, whether the
// outline is collapsed or split screen is on. One record per device ("gradify.ui"), grouped by scope, so a course's
// filter doesn't leak into another course.
//
//   import { pref, setPref } from "/kit/ui/prefs.js";
//   pref("chemistry", "learnFilter", "all");     setPref("chemistry", "learnFilter", "revise");
//
// Text size and reduced motion are not here: they belong to the learner's profile (kit/data/profile.js), which
// syncs them to every device with the account.
import { readJson, writeJson, local } from "./store.js";

const KEY = "gradify.ui";
const MAX_SCOPES = 60;   // old scopes are dropped first, so the record stays small

export function prefsFrom(store = local()) { return readJson(KEY, {}, store); }

export function pref(scope, key, dflt = null, store = local()) {
  const v = prefsFrom(store)[scope]?.[key];
  return v === undefined ? dflt : v;
}

/** set one preference; null or undefined removes it. Returns the new record (pure apart from the write). */
export function setPref(scope, key, value, store = local()) {
  const all = prefsFrom(store), s = { ...(all[scope] || {}) };
  if (value == null) delete s[key]; else s[key] = value;
  s._t = Date.now();
  const next = { ...all, [scope]: s };
  const scopes = Object.keys(next);
  if (scopes.length > MAX_SCOPES) scopes.sort((a, b) => (next[a]._t || 0) - (next[b]._t || 0)).slice(0, scopes.length - MAX_SCOPES).forEach((k) => delete next[k]);
  writeJson(KEY, next, store);
  return next;
}

/** a set of ids remembered under one key (open accordion sections, expanded units) */
export function prefSet(scope, key, store = local()) {
  const read = () => new Set(pref(scope, key, [], store));
  return {
    has: (id) => read().has(id),
    toggle(id, on) { const s = read(); if (on ?? !s.has(id)) s.add(id); else s.delete(id); setPref(scope, key, [...s].slice(-200), store); return s.has(id); },
    all: () => [...read()],
    clear: () => setPref(scope, key, null, store),
  };
}
