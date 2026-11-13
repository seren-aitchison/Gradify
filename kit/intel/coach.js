// Gradify AI, aware of the learner: the summary of their Gradify Intelligence model that the coach (course-tutor,
// mode "coach") is given, and the call itself. Claude sees only this summary and the actions the priority engine
// offered; it can recommend those actions but can't change the plan, the scores or the calendar. That stays with
// the deterministic engine (kit/intel), which the learner controls.
import { callFunction } from "../data/functions.js";
import { DAY } from "./memory.js";

// which tutor safety rules apply (kit/assess/tutor.js SITE_RULES), from the learner's Gradify site
const SUBJECT = { MedGradify: "medicine", LawGradify: "law", NurseGradify: "nursing", PharmaGradify: "pharmacy", DentalGradify: "dentistry", VetGradify: "veterinary",
  HealthGradify: "health", FinanceGradify: "finance", InvestorGradify: "investing", MathGradify: "maths", HistoryGradify: "history" };
export const subjectOf = (site) => SUBJECT[site] || "general";

export function coachProfile(m) {
  const p = m.preds, r = p.readiness, req = p.requirement;
  const soon = m.cards.filter((c) => !c.suspended && c.reps > 0 && Date.parse(c.due_at) > m.now && Date.parse(c.due_at) <= m.now + 3 * DAY).length;
  return {
    site: m.profile.site || "", dailyMinutes: m.dailyMinutes, examDate: m.profile.exam_date || "", examIn: req.examIn,
    readiness: r.value, readinessLow: r.low, readinessHigh: r.high, enoughEvidence: r.enough, target: req.target, perDay: req.perDay, paceStatus: req.status,
    rightThisWeek: p.velocity.now, answersThisWeek: p.velocity.answers, velocityDelta: p.velocity.delta, planKept: p.adherence.value,
    missed: m.missed.missed.length, dueCards: p.dueCards, dueSoonMinutes: Math.ceil((soon * 25) / 60),
    deadlines: m.deadlines.map((d) => ({ title: d.title, day: d.day })),
    concepts: m.concepts.slice(0, 30).map((c) => ({ name: c.name, level: c.level, mastery: c.mastery, certainty: c.certaintyLabel, retention: c.retention, forgetInDays: c.forgetInDays, stage: c.stage, confidentErrors: c.errors.confident, recentErrors: c.errors.recent })),
    actions: m.prio.items.slice(0, 20).map((x) => ({ id: x.id, title: x.title, why: x.why, mins: x.mins })),
  };
}

/** @returns {Promise<{ answer: string, actions: {id, why, item}[] }>} */
export async function askCoach(store, m, question, turns = []) {
  const body = await callFunction(store, "course-tutor", { mode: "coach", subject: subjectOf(m.profile.site), question, profile: coachProfile(m), turns }, { fallback: "Gradify AI couldn't answer just now. The answer above is from your own data." });
  const byId = new Map(m.prio.items.map((x) => [x.id, x]));
  return { answer: body.answer || "", actions: (body.actions || []).map((a) => ({ ...a, item: byId.get(a.id) })).filter((a) => a.item), usage: body.usage };
}
