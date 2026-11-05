// The shared learner profile: one set of answers about the learner that every Gradify site reads.
// The core fields (goal, site, level, exam_date, daily_minutes, display_name) are columns of the
// profiles table, as before. What setup adds lives in one `learner` object:
//   { subjects: ["LawGradify"], prior: { LawGradify: "some" }, prefs: { motion, text }, onboarded_at, skipped_at }
// It's saved with the profile (LocalStore, or the profiles.learner column from
// supabase/migrations/20261106120000_learner_profile.sql) and mirrored in this browser, so a page can
// apply the learner's settings before anything async has loaded. Every site is on getgradify.com, so
// the mirror is shared by all of them. If the account's database hasn't had the migration yet, the
// learner object stays on this device and nothing else breaks.
const MIRROR = "gradify.learner";
export const PRIOR = [["new", "New to it"], ["some", "I know some of it"], ["confident", "I know a lot already"]];
export const DEFAULTS = { subjects: [], prior: {}, prefs: { motion: "auto", text: "normal" }, onboarded_at: null, skipped_at: null };

const merge = (a = {}, b = {}) => ({ ...DEFAULTS, ...a, ...b, prior: { ...(a.prior || {}), ...(b.prior || {}) }, prefs: { ...DEFAULTS.prefs, ...(a.prefs || {}), ...(b.prefs || {}) }, subjects: b.subjects || a.subjects || [] });

export function readMirror() {
  try { return merge(JSON.parse(globalThis.localStorage?.getItem(MIRROR) || "null") || {}); } catch { return merge(); }
}
function writeMirror(l) { try { globalThis.localStorage?.setItem(MIRROR, JSON.stringify(l)); } catch { /* storage blocked */ } }

// the learner object for a profile: the account's copy, else this browser's
export function learnerOf(profile) {
  const own = profile?.learner && Object.keys(profile.learner).length ? profile.learner : null;
  return own ? merge(own) : readMirror();
}

// keep this browser's mirror in step with the account (call after loading the profile)
export function syncMirror(profile) { const l = learnerOf(profile); writeMirror(l); applyPrefs(l.prefs); return l; }

export async function saveLearner(store, patch) {
  const next = merge(learnerOf(await store.getProfile()), patch);
  writeMirror(next); applyPrefs(next.prefs);
  try { await store.saveProfile({ learner: next }); } catch { /* the learner column isn't there yet: kept on this device */ }
  return next;
}

// set-up is offered until the learner has either finished it or chosen to skip it
export const needsSetup = (profile) => !profile?.goal && !learnerOf(profile).skipped_at;

// accessibility settings, applied as attributes on <html> (styles in kit/styles/base.css)
export function applyPrefs(prefs = readMirror().prefs) {
  const el = globalThis.document?.documentElement; if (!el) return;
  if (prefs.motion === "reduce") el.dataset.motion = "reduce"; else delete el.dataset.motion;
  if (prefs.text === "large") el.dataset.text = "large"; else delete el.dataset.text;
}
export const reducedMotion = () => readMirror().prefs.motion === "reduce" || Boolean(globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
