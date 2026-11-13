// Gradify Intelligence in the browser: gather the learner's evidence once from their store (this device or their
// account, which every Gradify site shares) and build the whole model: memory, predictions, priorities, today's plan,
// missed sessions and the event stream. Each screen in LifeOS reads the same model, so they always agree.
import { learnerMemory, predictions, eventStream, dayKey, DAY } from "./memory.js";
import { prioritise } from "./priority.js";
import { planDay, reschedule, intelOf } from "./schedule.js";
import { dependencyGraph, knowledgeDebts, dependants } from "./debt.js";
import { calibrate, applyCalibration } from "./calibrate.js";
import { learnerOf } from "../data/profile.js";

/**
 * @param {object} store the app's store
 * @param {object} profile the learner's profile
 * @param {{ courseNext?: object[], now?: number }} [o] courseNext: ranked steps from every Gradify site's courses
 */
export async function loadModel(store, profile, { courseNext = [], courses = [], now = Date.now() } = {}) {
  const from = dayKey(now - 14 * DAY), to = dayKey(now + 120 * DAY);
  const [cards, reviews, activity, docs, blocks, ledger] = await Promise.all([
    store.listCards().catch(() => []), store.listReviews(1000).catch(() => []), store.listActivity(400).catch(() => []),
    store.listDocuments().catch(() => []), store.listBlocks(from, to).catch(() => []), store.listEvents?.(800).catch(() => []) ?? [],
  ]);
  const learner = learnerOf(profile), chosen = intelOf(learner);
  const dailyMinutes = profile.daily_minutes || 20;
  const concepts = learnerMemory({ cards, reviews, docs, examDate: profile.exam_date || null, now });
  const preds = predictions({ concepts, cards, reviews, blocks, examDate: profile.exam_date || null, dailyMinutes, now });
  const today = dayKey(now);
  const deadlines = [
    ...blocks.filter((b) => ["exam", "deadline", "ext-exam", "ext-deadline"].includes(b.cal) && b.day >= today).map((b) => ({ day: b.day, title: b.title, kind: b.cal.replace("ext-", "") })),
    ...(profile.exam_date && profile.exam_date >= today ? [{ day: profile.exam_date, title: `your ${profile.site || ""} exam`.replace("  ", " "), kind: "exam" }] : []),
  ];
  // knowledge debt: from the learner's own notes (terms defined in one topic, used in another) and their courses
  const edges = dependencyGraph(cards);
  const courseWeak = courses.flatMap((c) => (c.weak || []).filter((w) => w.kind === "foundation").map((w) => ({ site: c.site, course: c.name, title: w.title, for: w.for, why: w.why, href: c.href ? `${c.href}#/lesson/${w.lesson}` : "#/learning" })));
  const debts = knowledgeDebts(concepts, edges, courseWeak);
  const ranked = prioritise({ concepts, preds, courseNext, deadlines, dailyMinutes, debts, underpins: dependants(edges), now });
  // what Gradify has learned from its own past plans shapes this one (session length, time of day, time per card)
  const cal = calibrate({ blocks, reviews, ledger: ledger || [], now });
  const tuned = applyCalibration(chosen, ranked.items, cal), intel = tuned.intel;
  const prio = { ...ranked, items: tuned.items };
  // what's left of today: Gradify's own blocks already planned count, and the rest of the time is offered
  const todays = blocks.filter((b) => b.day === today);
  const plannedMins = todays.filter((b) => (b.cal || "study") === "study").reduce((a, b) => a + b.end_min - b.start_min, 0);
  const plan = planDay({ items: prio.items, day: today, minutes: Math.max(0, dailyMinutes - plannedMins), intel, existing: todays, now });
  const missed = reschedule({ blocks, minutes: dailyMinutes, intel, now });
  // the ledger adds what the tables can't show (abandoned sessions, forgetting, stages reached, recommendations followed)
  const LEDGER_ONLY = ["session_abandoned", "forgotten", "stage_reached", "misconception_fixed", "recommendation_followed", "mode_changed", "autopilot_change", "change_undone", "plan_accepted", "tell_applied", "calendar_synced", "notification_opened"];
  const events = [...eventStream({ cards, reviews, activity, blocks, now }), ...(ledger || []).filter((e) => LEDGER_ONLY.includes(e.event))].sort((a, b) => Date.parse(b.at) - Date.parse(a.at));
  return { cal, edges, debts, chosen, now, profile, learner, intel, dailyMinutes, cards, reviews, activity, docs, blocks, concepts, preds, prio, plan, missed, events, ledger: ledger || [], deadlines, today };
}
