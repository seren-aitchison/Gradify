// Gradify Intelligence in the browser: gather the learner's evidence once from their store (this device or their
// account, which every Gradify site shares) and build the whole model: memory, predictions, priorities, today's plan,
// missed sessions and the event stream. Each screen in LifeOS reads the same model, so they always agree.
import { learnerMemory, predictions, eventStream, dayKey, DAY } from "./memory.js";
import { prioritise } from "./priority.js";
import { planDay, reschedule, intelOf } from "./schedule.js";
import { learnerOf } from "../data/profile.js";

/**
 * @param {object} store the app's store
 * @param {object} profile the learner's profile
 * @param {{ courseNext?: object[], now?: number }} [o] courseNext: ranked steps from every Gradify site's courses
 */
export async function loadModel(store, profile, { courseNext = [], now = Date.now() } = {}) {
  const from = dayKey(now - 14 * DAY), to = dayKey(now + 120 * DAY);
  const [cards, reviews, activity, docs, blocks] = await Promise.all([
    store.listCards().catch(() => []), store.listReviews(1000).catch(() => []), store.listActivity(400).catch(() => []),
    store.listDocuments().catch(() => []), store.listBlocks(from, to).catch(() => []),
  ]);
  const learner = learnerOf(profile), intel = intelOf(learner);
  const dailyMinutes = profile.daily_minutes || 20;
  const concepts = learnerMemory({ cards, reviews, docs, examDate: profile.exam_date || null, now });
  const preds = predictions({ concepts, cards, reviews, blocks, examDate: profile.exam_date || null, dailyMinutes, now });
  const today = dayKey(now);
  const deadlines = [
    ...blocks.filter((b) => (b.cal === "exam" || b.cal === "deadline") && b.day >= today).map((b) => ({ day: b.day, title: b.title, kind: b.cal })),
    ...(profile.exam_date && profile.exam_date >= today ? [{ day: profile.exam_date, title: `your ${profile.site || ""} exam`.replace("  ", " "), kind: "exam" }] : []),
  ];
  const prio = prioritise({ concepts, preds, courseNext, deadlines, dailyMinutes, now });
  // what's left of today: Gradify's own blocks already planned count, and the rest of the time is offered
  const todays = blocks.filter((b) => b.day === today);
  const plannedMins = todays.filter((b) => (b.cal || "study") === "study").reduce((a, b) => a + b.end_min - b.start_min, 0);
  const plan = planDay({ items: prio.items, day: today, minutes: Math.max(0, dailyMinutes - plannedMins), intel, existing: todays, now });
  const missed = reschedule({ blocks, minutes: dailyMinutes, intel, now });
  const events = eventStream({ cards, reviews, activity, blocks, now });
  return { now, profile, learner, intel, dailyMinutes, cards, reviews, activity, docs, blocks, concepts, preds, prio, plan, missed, events, deadlines, today };
}
