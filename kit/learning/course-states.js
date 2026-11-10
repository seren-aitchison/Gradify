// Every course's progress for this learner, read once and shared by everything that counts it: the level and Journey
// (kit/game/journey.js), goals (kit/learning/goal-data.js). One source means a goal's XP and the learner's level can't
// disagree. This device's copy comes first (it may be newer than the last sync); the account's copy fills in courses not
// opened on this device, in one request. Read only.
import { COURSES } from "./learner-data.js";

const read = (k) => { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch { return null; } };
const started = (S) => Boolean(S && ((S.log || []).length || Object.keys(S.done || {}).length || (S.attempts || []).length));

/** { [slug]: S } for every course with saved progress, this device first, then the account */
export async function courseStates(store = null) {
  const out = {};
  for (const slug of Object.keys(COURSES)) { const S = read(`gradify.course.${slug}`); if (S) out[slug] = S; }
  if (store?.mode === "cloud") {
    try {
      if (store.listCourseProgress) { for (const r of await store.listCourseProgress()) if (COURSES[r.subject] && !out[r.subject] && r.state) out[r.subject] = r.state; }
      else await Promise.all(Object.keys(COURSES).filter((s) => !out[s]).map(async (slug) => { const S = await store.getCourseProgress?.(slug).catch(() => null); if (S) out[slug] = S; }));
    } catch { /* the account's copy isn't reachable: this device's progress only */ }
  }
  return out;
}

/** The started courses with their configurations, as the level and Journey count them. A course whose
 *  configuration can't load is left out (and so is its XP), everywhere alike. */
export async function startedCourses(store = null, states = null) {
  states ||= await courseStates(store);
  const list = await Promise.all(Object.entries(states).filter(([, S]) => started(S)).map(async ([slug, S]) => {
    try { const cfg = (await import(`../courses/${slug}/course.js`)).default; return { slug, page: COURSES[slug], site: cfg.site, name: cfg.name, units: cfg.units, levels: cfg.levels, interactives: cfg.interactives, exams: cfg.exams, exploration: cfg.exploration, notes: cfg.notes, written: cfg.written || [], cfg, S }; }
    catch { return null; }
  }));
  return list.filter(Boolean);
}
