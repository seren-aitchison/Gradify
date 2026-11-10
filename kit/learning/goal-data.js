// The records goals are measured from (kit/learning/goals.js measure()), gathered in a browser: course progress (this
// device's copy, or the account's for courses not opened here), the activity log, flashcard reviews, and XP events
// worked out as the Journey does (kit/game/engine.js), so a goal's XP matches the learner's level. Nothing is copied
// or stored: this only reads.
import { COURSES } from "./learner-data.js";
import { eventsOf, outsideCourses } from "../game/engine.js";
import { courseStates, startedCourses } from "./course-states.js";

const read = (k) => { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch { return null; } };

/** goals: the goals to be measured (so course configs are loaded only for goals that count schools) */
export async function goalData(store, goals = []) {
  const slugs = Object.keys(COURSES);
  const states = await courseStates(store);
  const courses = Object.fromEntries(Object.entries(states).map(([slug, S]) => [slug, { S }]));
  // schools need the course's structure: loaded only for goals that measure them
  const needUnits = new Set(goals.filter((g) => g.metric?.source === "course" && g.metric.metric === "units").map((g) => g.metric.course));
  await Promise.all([...needUnits].filter((slug) => slugs.includes(slug)).map(async (slug) => {
    try { const cfg = (await import(`../courses/${slug}/course.js`)).default; (courses[slug] ||= { S: {} }).units = cfg.units; } catch { /* left without schools: shown as unavailable */ }
  }));
  const [activity, reviews, started] = await Promise.all([store?.listActivity?.(400).catch(() => []) ?? [], store?.listReviews?.(400).catch(() => []) ?? [],
    goals.some((g) => g.metric?.source === "xp") ? startedCourses(store, states) : []]);
  // XP exactly as the level counts it: the same started courses, the same game ledger, the same activity rules
  const xpEvents = eventsOf(started, read("gradify.game") || {}, outsideCourses(activity, slugs));
  return { courses, knownCourses: slugs, activity, reviews, xpEvents };
}
