// PROPOSED (docs/PROGRESS-SYNC.md, awaiting review): course progress that two or more devices can save at the same
// time without losing anything. Not used by the site yet: kit/course/progress.js and course.js are unchanged
// until the design is approved. Pure functions, no browser APIs, so the Swift apps can port them and run the same
// fixtures (tests/fixtures/progress-sync.json).
//
// Three ideas:
//   1. Every entry carries the time it was written (S.stamps["done:u01-01"]). Removals and course resets are
//      recorded (S.removed, S.resetAt) rather than just deleted, so a device that missed them can't bring the old
//      entry back.
//   2. Merging is per entry: work that only adds (lessons done, best scores, cards reviewed) is combined from both
//      copies; things a learner corrects (drafts, goal, path) take the most recent edit. A whole copy never beats
//      another one because it's newer or has a higher version.
//   3. Saving is version-checked (save_course_progress in docs/proposed/course_progress_sync.sql): the account
//      accepts a save only from a device that has seen the latest copy. Otherwise it hands back that copy, the
//      device merges it in and saves again. The version only detects a concurrent save; it never decides content.

// how each part of the course state merges
const ADD = {           // combined from both copies (both devices' work counts)
  weekly: (x, y) => x || y,
  quiz: (x, y) => ({ best: Math.max(x.best || 0, y.best || 0), pass: !!(x.pass || y.pass), t: Math.max(x.t || 0, y.t || 0) }),
  ws: (x, y) => ({ best: Math.max(x.best || 0, y.best || 0), runs: Math.max(x.runs || 0, y.runs || 0), last: (y.at || 0) > (x.at || 0) || ((y.at || 0) === (x.at || 0) && JSON.stringify(y.last ?? null) > JSON.stringify(x.last ?? null)) ? y.last : x.last, at: Math.max(x.at || 0, y.at || 0) }),
  // spaced review: the card reviewed more times, then the one due later
  cards: (x, y) => ((y.reps || 0) > (x.reps || 0) || ((y.reps || 0) === (x.reps || 0) && String(y.due_at || "") > String(x.due_at || "")) || ((y.reps || 0) === (x.reps || 0) && String(y.due_at || "") === String(x.due_at || "") && JSON.stringify(y) > JSON.stringify(x)) ? y : x),
  mocks: (x, y) => { const seen = new Set(); return [...x, ...y].filter((m) => { const k = JSON.stringify(m); return seen.has(k) ? false : (seen.add(k), true); }).sort((p, q) => (JSON.stringify(p) < JSON.stringify(q) ? -1 : 1)); },
};
// keyed entries where the most recent write wins. Lessons done, chests opened and questions solved hold the time they
// happened: present on either device means present, and the time kept is the latest completion (which is what
// keeps an undo followed by a redo consistent on every device, whatever order they sync in)
const LATEST = ["done", "chests", "solved", "drafts", "saved"];
const SETTINGS = ["goal", "path", "open", "closed"];    // single values: the latest edit wins
export const FIELDS = [...Object.keys(ADD), ...LATEST];

// the time an entry was written; entries saved before stamps existed fall back to a time inside the value
function stampOf(S, field, key) {
  const t = S.stamps?.[`${field}:${key}`];
  if (t != null) return t;
  const v = S[field]?.[key];
  if (typeof v === "number") return v;                  // done, chests, solved hold their time
  if (v && typeof v === "object") return v.at || v.t || 0;
  return 0;
}

// ---------- writing (the course calls these instead of assigning directly) ----------
// now: the device's clock corrected by the account's (S.clockOffset, learned on each save), so a phone whose clock
// is wrong can't make an old edit look new
export const clock = (S, deviceNow = Date.now()) => deviceNow + (S.clockOffset || 0);
export function put(S, field, key, value, now = clock(S)) {
  S[field] = { ...(S[field] || {}), [key]: value };
  S.stamps = { ...(S.stamps || {}), [`${field}:${key}`]: now };
  return S;
}
export function setting(S, name, value, now = clock(S)) {
  S[name] = value; S.stamps = { ...(S.stamps || {}), [name]: now }; return S;
}
// undo one entry (a lesson marked not done, a card reset, a draft cleared)
export function remove(S, field, key, now = clock(S)) {
  if (S[field]) { const { [key]: _, ...rest } = S[field]; S[field] = rest; }
  S.removed = { ...(S.removed || {}), [`${field}:${key}`]: now };
  return S;
}
// start the course again, everywhere: everything written before now is dropped on every device as it syncs
export function reset(S, now = clock(S)) {
  const keep = { goal: S.goal, path: S.path, stamps: {}, removed: {}, resetAt: now, clockOffset: S.clockOffset, version: S.version };
  for (const f of SETTINGS) if (S.stamps?.[f] != null) keep.stamps[f] = S.stamps[f];
  return keep;
}

// ---------- merging ----------
export function merge(a = {}, b = {}) {
  const resetAt = Math.max(a.resetAt || 0, b.resetAt || 0);
  const removed = {};
  for (const [k, t] of [...Object.entries(a.removed || {}), ...Object.entries(b.removed || {})]) if (t > resetAt) removed[k] = Math.max(removed[k] || 0, t);
  const out = { resetAt, removed, stamps: {} };
  for (const field of FIELDS) {
    const res = {};
    for (const key of new Set([...Object.keys(a[field] || {}), ...Object.keys(b[field] || {})])) {
      const cut = Math.max(resetAt, removed[`${field}:${key}`] || 0);
      // an entry survives if it was written after any removal or reset that covers it (with neither, it always does)
      const live = [a, b].filter((S) => S[field] && key in S[field] && (cut === 0 || stampOf(S, field, key) > cut));
      if (!live.length) continue;
      let pick;
      if (live.length === 1) pick = live[0][field][key];
      else if (field in ADD) pick = ADD[field](live[0][field][key], live[1][field][key]);
      else pick = later(live[0], live[1], field, key)[field][key];
      res[key] = pick;
      out.stamps[`${field}:${key}`] = Math.max(...live.map((S) => stampOf(S, field, key)));
    }
    out[field] = res;
  }
  for (const name of SETTINGS) {
    const sa = a.stamps?.[name] ?? a.updated ?? 0, sb = b.stamps?.[name] ?? b.updated ?? 0;
    const w = sb > sa || (sb === sa && JSON.stringify(b[name] ?? null) > JSON.stringify(a[name] ?? null)) ? b : a;
    out[name] = w[name] ?? (name === "open" || name === "closed" ? [] : null);
    if (Math.max(sa, sb)) out.stamps[name] = Math.max(sa, sb);
  }
  // the activity log: one entry per event, nothing from before a reset
  const seen = new Set();
  out.log = [...(a.log || []), ...(b.log || [])].filter((e) => e.t > resetAt && !seen.has(`${e.t}|${e.k}|${e.id}`) && seen.add(`${e.t}|${e.k}|${e.id}`)).sort((x, y) => x.t - y.t);
  out.updated = Math.max(a.updated || 0, b.updated || 0);
  return out;
}
// two edits of the same entry: the later one; an exact tie is broken by content, so every device picks the same
function later(a, b, field, key) {
  const ta = stampOf(a, field, key), tb = stampOf(b, field, key);
  if (ta !== tb) return tb > ta ? b : a;
  return JSON.stringify(b[field][key]) > JSON.stringify(a[field][key]) ? b : a;
}

// what goes to the account: everything except what belongs to this device
export function accountCopy(S) {
  const { attempts, outbox, sync, version, clockOffset, ...rest } = S;
  return rest;
}

// ---------- saving ----------
/**
 * Sync this device's copy with the account. Safe to call at any time, including after being offline for weeks.
 * @param {object} S  this device's course state (S.version: the account version it last saw)
 * @param {{ save: (state: object, expectedVersion: number) => Promise<{ saved: boolean, version: number, state: object|null, serverTime: number }> }} account
 * @returns the merged state, with S.version and S.clockOffset updated; throws if the account can't be reached
 */
export async function sync(S, account, { tries = 5, deviceNow = () => Date.now() } = {}) {
  let local = S;
  for (let i = 0; i < tries; i++) {
    const r = await account.save(accountCopy(local), local.version || 0);
    const offset = r.serverTime - deviceNow();
    if (r.saved) return { ...local, version: r.version, clockOffset: offset };
    // someone else saved first: take their copy in, then try again on top of it
    local = { ...local, ...merge(local, r.state || {}), version: r.version, clockOffset: offset };
  }
  throw new Error("Couldn't save course progress: the account kept changing. It's kept on this device and will sync later.");
}
