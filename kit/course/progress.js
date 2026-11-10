// Course progress across devices: the course keeps its progress on the device (localStorage) and, when the
// learner is signed in, a copy in the account (the course_progress table, one row per learner per course).
// Two copies can drift (two devices, or offline use), so they are merged rather than overwritten: nothing
// completed on either device is ever lost. Assessment attempts are left out: they have their own table.

const later = (a, b) => (b && (!a || b > a) ? b : a);
const union = (a = {}, b = {}, pick = (x, y) => x ?? y) => {
  const out = { ...a };
  for (const [k, v] of Object.entries(b)) out[k] = k in out ? pick(out[k], v) : v;
  return out;
};
// spaced-review state: keep the card that has been reviewed more, then the one due later
const card = (x, y) => ((y.reps || 0) > (x.reps || 0) || ((y.reps || 0) === (x.reps || 0) && (y.due_at || "") > (x.due_at || "")) ? y : x);
const quiz = (x, y) => ({ best: Math.max(x.best || 0, y.best || 0), pass: !!(x.pass || y.pass), t: Math.max(x.t || 0, y.t || 0) });
// workspace cases (legal reasoning, clinical simulation): best score wins; the higher attempt count and the latest result are kept
const ws = (x, y) => ({ best: Math.max(x.best || 0, y.best || 0), runs: Math.max(x.runs || 0, y.runs || 0), last: (y.at || 0) > (x.at || 0) ? y.last : x.last, at: Math.max(x.at || 0, y.at || 0) });
const dedupe = (list, key) => { const seen = new Set(); return list.filter((x) => { const k = key(x); if (seen.has(k)) return false; seen.add(k); return true; }); };
// a finished mock exam is identified by its exam id and finish time, never by its JSON text: the account's copy
// (Postgres jsonb) comes back with its keys in a different order, which made one sitting look like two
const mockKey = (m) => (m && m.t != null ? `${m.id}|${m.t}` : JSON.stringify(m));
// XP that can only be earned once per item (a lesson, a check question, a chest, a week's challenge, a written task,
// a lab or workspace challenge): if two devices both earned it before syncing, only the earliest award is kept.
// A unit quiz pays once for passing (50 XP, or 70 with a perfect score) and once for a first 100% (20 XP).
// Everything else (flashcard reviews, mock exams passed) can rightly be earned again and is kept.
export const ONCE = new Set(["lesson", "check", "chest", "weekly", "write", "practice"]);
const awardKey = (e) => (ONCE.has(e.k) ? `${e.k}|${e.id}` : e.k === "quiz" ? `quiz|${e.id}|${(e.xp || 0) >= 50 ? "pass" : "perfect"}` : null);
export function onceOnly(log) {
  const seen = new Set();
  return log.filter((e) => { const k = awardKey(e); if (k == null) return true; if (seen.has(k)) return false; seen.add(k); return true; });
}

// the part of the course state that goes to the account
export function cloudCopy(S) {
  const { attempts, outbox, sync, ...rest } = S;   // attempts have their own table; outbox and sync status are per device
  return rest;
}

// merge two copies of the course state. Completion records are unions; settings come from the copy
// changed more recently (S.updated, set on every save).
export function mergeProgress(local = {}, cloud = {}) {
  const newer = (cloud.updated || 0) > (local.updated || 0) ? cloud : local;
  const first = (x, y) => Math.min(x, y); // timestamps: keep when it first happened
  const mocks = union(local.mocks, cloud.mocks, (x, y) => dedupe([...x, ...y], mockKey));
  return {
    ...local,
    done: union(local.done, cloud.done, first),
    chests: union(local.chests, cloud.chests, first),
    solved: union(local.solved, cloud.solved, first),
    weekly: union(local.weekly, cloud.weekly),
    saved: union(local.saved, cloud.saved),
    drafts: union(local.drafts, cloud.drafts),
    quiz: union(local.quiz, cloud.quiz, quiz),
    ws: union(local.ws, cloud.ws, ws),
    cards: union(local.cards, cloud.cards, card),
    mocks,
    log: onceOnly(dedupe([...(local.log || []), ...(cloud.log || [])], (e) => `${e.t}|${e.k}|${e.id}`).sort((a, b) => a.t - b.t)),
    goal: newer.goal ?? local.goal, path: newer.path ?? null,
    open: newer.open || [], closed: newer.closed || [],
    attempts: local.attempts || [],
    updated: later(local.updated, cloud.updated) || 0,
  };
}

// ---------- assessment attempts across devices ----------
// Attempts are uploaded one row per answer (assessment_attempts), and downloaded again on other devices so
// mastery, Revisit and Your plan see every answer. Each attempt has a unique id, so uploads can be retried
// safely: a row that already exists is ignored, never duplicated.
export const ATTEMPT_CAP = 2000;
export function mergeAttempts(local = [], cloud = [], cap = ATTEMPT_CAP) {
  const byId = new Map();
  for (const a of [...local, ...cloud]) if (a?.id && !byId.has(a.id)) byId.set(a.id, a);
  const all = [...byId.values()].sort((x, y) => String(x.at).localeCompare(String(y.at)));
  return all.length > cap ? all.slice(all.length - cap) : all;
}
// the outbox: ids of attempts not yet confirmed in the account. Kept with the course state on this device, so a
// failed or interrupted upload is retried on the next visit, when the connection returns, or after sign-in.
export function queueAttempt(S, id) { S.outbox = [...new Set([...(S.outbox || []), id])]; return S; }
export function outboxAttempts(S) { const ids = new Set(S.outbox || []); return (S.attempts || []).filter((a) => ids.has(a.id)); }
export function confirmAttempts(S, ids) {
  const done = new Set(ids), have = new Set((S.attempts || []).map((a) => a.id));
  // forget ids that were confirmed, and ids whose attempt has aged out of the device copy (nothing left to send)
  S.outbox = (S.outbox || []).filter((id) => !done.has(id) && have.has(id));
  return S;
}

// ---------- saving without overwriting another device ----------
// JSON with object keys sorted, so two copies of the same state compare equal however their keys were ordered
// (the account's jsonb copy comes back in its own key order)
export const stableJSON = (v) => JSON.stringify(v, (_k, x) => (x && typeof x === "object" && !Array.isArray(x) ? Object.fromEntries(Object.keys(x).sort().map((k) => [k, x[k]])) : x));

/**
 * Bring this device's course state and the account's together without overwriting another device: read the account's
 * copy, merge it in, and write the result only if it adds something, and only if the account's copy is still the one
 * read. If another device (another tab, the iPhone app) saved in between, nothing is written: read, merge and try again.
 * The same rules as the native apps (gradify-apple, ProgressSync.swift), so every client can save at any moment.
 *   remote.fetch() → { state, version } | null        the account's copy and its version (updated_at)
 *   remote.save(state, version | null) → version | null  write only if still at `version` (or still absent); null if not
 * Returns { S: the merged device state, pushed, version }. Throws "busy" if the copy kept changing.
 */
export async function syncProgress(S, remote, { tries = 5 } = {}) {
  for (let i = 0; i < tries; i++) {
    const cloud = await remote.fetch();
    // merged even with nothing, so the state is in its settled form and the next sync finds nothing to change
    const merged = mergeProgress(S, cloud ? cloud.state : {});
    const copy = cloudCopy(merged);
    if (cloud && stableJSON(copy) === stableJSON(cloud.state)) return { S: merged, pushed: false, version: cloud.version };
    const version = await remote.save(copy, cloud?.version ?? null);
    if (version) return { S: merged, pushed: true, version };
    S = merged;
  }
  throw new Error("busy");
}
