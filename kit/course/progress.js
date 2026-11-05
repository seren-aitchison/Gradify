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

// the part of the course state that goes to the account
export function cloudCopy(S) {
  const { attempts, ...rest } = S;
  return rest;
}

// merge two copies of the course state. Completion records are unions; settings come from the copy
// changed more recently (S.updated, set on every save).
export function mergeProgress(local = {}, cloud = {}) {
  const newer = (cloud.updated || 0) > (local.updated || 0) ? cloud : local;
  const first = (x, y) => Math.min(x, y); // timestamps: keep when it first happened
  const mocks = union(local.mocks, cloud.mocks, (x, y) => dedupe([...x, ...y], (m) => JSON.stringify(m)));
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
    log: dedupe([...(local.log || []), ...(cloud.log || [])], (e) => `${e.t}|${e.k}|${e.id}`).sort((a, b) => a.t - b.t),
    goal: newer.goal ?? local.goal, path: newer.path ?? null,
    open: newer.open || [], closed: newer.closed || [],
    attempts: local.attempts || [],
    updated: later(local.updated, cloud.updated) || 0,
  };
}
