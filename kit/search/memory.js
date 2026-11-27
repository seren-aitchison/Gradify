// What search remembers on this device: the searches made (newest first, to reuse and to finish as you type) and the
// searches the learner saved by name (a recurring search: "AQA chemistry, not finished"). Both live in this browser
// only ("gradify.search"); a private window simply forgets them.
//
//   remember(q, { count })   searchHistory()   forgetSearch(q)   clearSearchHistory()
//   saveSearch(name, q)      savedSearches()   unsaveSearch(id)  isSaved(q)
// The list functions are pure over a record and the storage functions wrap them (tests/search.test.mjs).
import { readJson, writeJson, local } from "../ui/store.js";

const KEY = "gradify.search", MAX = 30, MAX_SAVED = 30;
const clean = (q) => String(q || "").replace(/\s+/g, " ").trim();
const same = (a, b) => clean(a).toLowerCase() === clean(b).toLowerCase();

/** add a search to the history (pure): the newest first, no repeats, nothing shorter than two letters */
export function addHistory(list = [], q, { count = null, now = Date.now(), max = MAX } = {}) {
  const t = clean(q); if (t.length < 2) return list;
  // typing "equ", "equil", "equilibrium" leaves only the last one: a search that's the start of the next goes
  const rest = list.filter((x) => !same(x.q, t) && !(now - x.t < 60e3 && t.toLowerCase().startsWith(clean(x.q).toLowerCase())));
  return [{ q: t, t: now, n: count }, ...rest].slice(0, max);
}
export function addSaved(list = [], name, q, { now = Date.now() } = {}) {
  const t = clean(q); if (!t) return list;
  const n = clean(name) || t;
  const rest = list.filter((x) => !same(x.q, t));
  return [{ id: `s${now.toString(36)}`, name: n.slice(0, 60), q: t, t: now }, ...rest].slice(0, MAX_SAVED);
}

const read = (store) => ({ history: [], saved: [], ...readJson(KEY, {}, store) });
const write = (rec, store) => writeJson(KEY, rec, store);

export const searchHistory = (store = local()) => read(store).history;
export const savedSearches = (store = local()) => read(store).saved;
export function remember(q, { count = null, store = local() } = {}) { const r = read(store); r.history = addHistory(r.history, q, { count }); write(r, store); return r.history; }
export function forgetSearch(q, store = local()) { const r = read(store); r.history = r.history.filter((x) => !same(x.q, q)); write(r, store); }
export function clearSearchHistory(store = local()) { const r = read(store); r.history = []; return write(r, store); }
/** saved by name; null when this browser wouldn't keep it (storage full or blocked) */
export function saveSearch(name, q, store = local()) { const r = read(store); r.saved = addSaved(r.saved, name, q); return write(r, store) ? r.saved[0] : null; }
/** put cleared searches back as they were (their own times), keeping any made since (Undo on "Clear recent searches") */
export function restoreHistory(list = [], store = local()) { const r = read(store), have = new Set(r.history.map((x) => x.q.toLowerCase())); r.history = [...r.history, ...list.filter((x) => !have.has(x.q.toLowerCase()))].sort((a, b) => b.t - a.t).slice(0, MAX); write(r, store); }
/** forget every search and saved search on this device (signing out, so the next person here doesn't see them) */
export function clearSearchMemory(store = local()) { try { store.removeItem(KEY); } catch { /* fine */ } }
export function unsaveSearch(id, store = local()) { const r = read(store); const gone = r.saved.find((x) => x.id === id); r.saved = r.saved.filter((x) => x.id !== id); write(r, store); return gone || null; }
export function restoreSaved(item, store = local()) { if (!item) return; const r = read(store); if (!r.saved.some((x) => x.id === item.id)) { r.saved = [item, ...r.saved]; write(r, store); } }
export const isSaved = (q, store = local()) => savedSearches(store).find((x) => same(x.q, q)) || null;
