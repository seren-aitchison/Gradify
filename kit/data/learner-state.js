// The learner's state: one record of what the learner is doing across Gradify, which every tool reads and writes
// through this module and nothing else (docs/product/LEARNER-STATE.md). It works offline and signed out, and when
// the account has the learner_state table (supabase/migrations/20261126120000_learner_state.sql) it syncs, so the
// same record follows the learner to every device.
//
//   put("link", key, value)   get("pin", key)   list("activity")   del("collection", key)   subscribe(f)
//   attachAccount(store)      // signed in: pull, merge, push, and keep doing so as things change
//   syncStatus()              // { state: "local" | "saving" | "saved" | "offline" | "failed", at, waiting }
//
// Each entry is { kind, key, value, t, dev, del }: t is when it last changed (ms), dev the device that changed it.
// Two copies merge entry by entry, the newer change winning (the device id breaks a tie), and a deletion is kept as a
// tombstone with its own time, so an older copy can't bring something back. Nothing in the record is the content
// of notes, answers or documents: those stay in their own tables.
//
// Kinds: pin, tab (workspace tabs), activity (history, including quiz and test states), link (a connection between
// two resources, kit/core/resource.js ids), collection and collitem, note (the learner's own note on a resource),
// mistake (a question got wrong, until it's got right), sched (a resource scheduled as a plan block).
// merge, the entry helpers and importLegacy are pure (tests/learner-state.test.mjs).

const KEY = "gradify.state", DEV = "gradify.device";
export const SYNCED = new Set(["pin", "tab", "activity", "link", "collection", "collitem", "note", "mistake", "sched"]);
const id = (kind, key) => `${kind}|${key}`;

// ---------- pure ----------
/** the newer of two copies of one entry: later t wins, then the larger device id, so every device agrees */
export const newer = (a, b) => (!a ? b : !b ? a : (b.t > a.t || (b.t === a.t && String(b.dev) > String(a.dev))) ? b : a);
/** merge two records (maps of "kind|key" → entry); returns the merged map and the entries the second one changed */
export function merge(mine = {}, theirs = {}) {
  const out = { ...mine }, changed = [];
  for (const [k, e] of Object.entries(theirs)) { const w = newer(out[k], e); if (w !== out[k]) { out[k] = w; changed.push(w); } }
  return { entries: out, changed };
}
export const entry = (kind, key, value, { t = Date.now(), dev = "?" } = {}) => ({ kind, key: String(key), value, t, dev, del: false });
export const tombstone = (kind, key, { t = Date.now(), dev = "?" } = {}) => ({ kind, key: String(key), value: null, t, dev, del: true });
/** the live values of one kind, newest first: [{ key, value, t }] */
export const valuesOf = (entries, kind) => Object.values(entries).filter((e) => e.kind === kind && !e.del).sort((a, b) => b.t - a.t);

/**
 * The record from what this device kept before it existed: pins, workspace tabs and history each had their own key.
 * They become entries once; the old keys are left as they were (nothing is deleted).
 */
export function importLegacy({ pins = [], workspace = null, history = [] } = {}, { dev = "?", now = Date.now() } = {}) {
  const out = {};
  pins.forEach((p, i) => { if (p?.href) out[id("pin", p.href)] = entry("pin", p.href, { ...p, order: i }, { t: p.t || now, dev }); });
  for (const tab of workspace?.tabs || []) if (tab?.id) out[id("tab", tab.id)] = entry("tab", tab.id, tab, { t: tab.t || now, dev });
  history.forEach((h, i) => { if (h?.href && h.act) { const key = h.id || `${h.t || now}-${i}`; out[id("activity", key)] = entry("activity", key, { ...h, id: key }, { t: h.t || now, dev }); } });
  return out;
}
/** keep the record a sensible size: activity older than a year, and beyond the newest `cap`, goes (this device only) */
export function prune(entries, { now = Date.now(), cap = 600, days = 365 } = {}) {
  const acts = Object.values(entries).filter((e) => e.kind === "activity").sort((a, b) => b.t - a.t);
  const drop = new Set(acts.filter((e, i) => i >= cap || now - e.t > days * 864e5).map((e) => id(e.kind, e.key)));
  // tombstones are kept for a month, long enough for every device to have seen them
  for (const e of Object.values(entries)) if (e.del && now - e.t > 30 * 864e5) drop.add(id(e.kind, e.key));
  if (!drop.size) return entries;
  return Object.fromEntries(Object.entries(entries).filter(([k]) => !drop.has(k)));
}

// ---------- this device ----------
const ls = () => { try { return globalThis.localStorage || null; } catch { return null; } };
const read = (k, d) => { try { const v = ls()?.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } };
const write = (k, v) => { try { ls()?.setItem(k, JSON.stringify(v)); return true; } catch { return false; } };
export function deviceId() {
  let d = null; try { d = ls()?.getItem(DEV); } catch { /* none */ }
  if (!d) { d = (globalThis.crypto?.randomUUID?.() || `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`).slice(0, 12); try { ls()?.setItem(DEV, d); } catch { /* private mode */ } }
  return d;
}
let cache = null, status = { state: "local", at: null, waiting: 0 };
const listeners = new Set(), statusListeners = new Set();
const emit = (kinds) => listeners.forEach((f) => { try { f(kinds); } catch { /* a listener's own problem */ } });
function load() {
  if (cache) return cache;
  const rec = read(KEY, null);
  if (rec?.entries) { cache = rec; return cache; }
  // first run on this device: bring in what the older keys held
  cache = { v: 1, entries: importLegacy({ pins: read("gradify.pins", []), workspace: read("gradify.workspace", null), history: read("gradify.history", []) }, { dev: deviceId() }), pushed: 0, pulled: null };
  write(KEY, cache);
  return cache;
}
function save(kinds) {
  cache.entries = prune(cache.entries);
  write(KEY, cache);
  emit(kinds);
  if (account) { setStatus({ ...status, waiting: pendingCount() }); soon(); }
}
export const get = (kind, key) => { const e = load().entries[id(kind, key)]; return e && !e.del ? e.value : null; };
export const list = (kind) => valuesOf(load().entries, kind);
export function put(kind, key, value) { load().entries[id(kind, key)] = entry(kind, key, value, { dev: deviceId(), t: stamp() }); save([kind]); return value; }
export function del(kind, key) { if (!load().entries[id(kind, key)]) return; load().entries[id(kind, key)] = tombstone(kind, key, { dev: deviceId(), t: stamp() }); save([kind]); }
/** several changes as one save */
export function batch(fn) { const kinds = new Set(); fn({ put: (k, key, v) => { kinds.add(k); load().entries[id(k, key)] = entry(k, key, v, { dev: deviceId(), t: stamp() }); }, del: (k, key) => { kinds.add(k); load().entries[id(k, key)] = tombstone(k, key, { dev: deviceId(), t: stamp() }); } }); save([...kinds]); }
export function subscribe(f) { listeners.add(f); return () => listeners.delete(f); }
// times only go forwards on one device, even within a millisecond, so "newer" is never ambiguous here
let last = 0; const stamp = () => (last = Math.max(Date.now(), last + 1));
// another tab changed the record: read it again and tell this one
globalThis.addEventListener?.("storage", (e) => { if (e.key === KEY) { cache = null; emit(null); } });
/** everything kept, for the learner's own "Your data" (export) */
export const exportState = () => ({ device: deviceId(), entries: Object.values(load().entries).filter((e) => !e.del) });

// ---------- the account ----------
// signed in, the record syncs with public.learner_state: pull what changed since last time, merge, push what this
// device changed. Until the table exists (the migration isn't applied yet) it stays on the device and says so.
let account = null, timer = 0, busy = false;
const pendingCount = () => Object.values(load().entries).filter((e) => SYNCED.has(e.kind) && e.t > (load().pushed || 0) && e.dev === deviceId()).length;
const setStatus = (s) => { status = { ...status, ...s }; statusListeners.forEach((f) => { try { f(status); } catch { /* */ } }); };
export const syncStatus = () => status;
export function onSyncStatus(f) { statusListeners.add(f); f(status); return () => statusListeners.delete(f); }
const soon = (ms = 1500) => { clearTimeout(timer); timer = setTimeout(syncNow, ms); };

export async function attachAccount(store) {
  const db = store?.db || store?.cloud?.db;
  if (!db || store.mode !== "cloud") { account = null; setStatus({ state: "local", waiting: 0 }); return status; }
  const user = await store.user?.().catch(() => null);
  if (!user?.id) { account = null; setStatus({ state: "local", waiting: 0 }); return status; }
  account = { db, user };
  globalThis.addEventListener?.("online", () => soon(200));
  globalThis.document?.addEventListener?.("visibilitychange", () => { if (document.visibilityState === "hidden") syncNow(); else soon(200); });
  await syncNow();
  return status;
}
export async function syncNow() {
  if (!account || busy) return status;
  if (globalThis.navigator?.onLine === false) { setStatus({ state: "offline", waiting: pendingCount() }); return status; }
  busy = true; setStatus({ state: "saving" });
  try {
    const rec = load(), since = rec.pulled || "1970-01-01T00:00:00Z";
    // pull: everything that reached the account since the last pull, by the server's own clock (a device whose clock
    // is behind still has its changes picked up); which change wins is still decided by t
    const { data, error } = await account.db.from("learner_state").select("kind,key,value,t,dev,del,updated_at").gt("updated_at", since).order("updated_at", { ascending: true }).limit(5000);
    if (error) throw error;
    const theirs = Object.fromEntries((data || []).map((r) => [id(r.kind, r.key), { kind: r.kind, key: r.key, value: r.value, t: Number(r.t), dev: r.dev, del: r.del }]));
    const { entries, changed } = merge(rec.entries, theirs);
    rec.entries = entries;
    if (data?.length) rec.pulled = data.at(-1).updated_at;
    // push: what this device changed since its last push (the server keeps the newer of two changes: see the migration)
    const mine = Object.values(rec.entries).filter((e) => SYNCED.has(e.kind) && e.dev === deviceId() && e.t > (rec.pushed || 0));
    for (let i = 0; i < mine.length; i += 200) {
      const rows = mine.slice(i, i + 200).map((e) => ({ user_id: account.user.id, kind: e.kind, key: e.key, value: e.value, t: e.t, dev: e.dev, del: e.del }));
      const r = await account.db.from("learner_state").upsert(rows, { onConflict: "user_id,kind,key" });
      if (r.error) throw r.error;
    }
    if (mine.length) rec.pushed = Math.max(rec.pushed || 0, ...mine.map((e) => e.t));
    write(KEY, rec);
    if (changed.length) emit([...new Set(changed.map((e) => e.kind))]);
    setStatus({ state: "saved", at: Date.now(), waiting: 0 });
  } catch (err) {
    // the table isn't there yet: this device's copy is the record, and nothing is lost
    const text = `${err?.code || ""} ${err?.message || ""}`;
    const missing = /42P01|PGRST20[0-9]|schema cache|relation .*learner_state.* does not exist/i.test(text);
    // on Free, only the active study device writes to the account (public.may_write): this one keeps its copy
    const readOnly = /42501|row-level security/i.test(text);
    if (missing || readOnly) {
      setStatus({ state: "local", waiting: 0, note: missing ? "Account sync for your workspace isn't switched on yet." : "On Free, your other device is the one that saves to your account. Changes here stay on this device." });
      account = null;
    } else { setStatus({ state: globalThis.navigator?.onLine === false ? "offline" : "failed", waiting: pendingCount() }); soon(30000); }
  } finally { busy = false; }
  return status;
}
