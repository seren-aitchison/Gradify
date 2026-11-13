// Gradify Intelligence: answers to the questions learners actually ask about their own learning, worked out from
// the learner model rather than generated. Every answer quotes the evidence it rests on, and when there isn't
// enough evidence it says so instead of guessing. (Explaining a topic itself is Gradify AI's job, inside lessons.)
// Pure, so Node can test it. Returns plain-text parts; the page escapes and lays them out.
import { planDay } from "./schedule.js";
import { dayKey, hhmm } from "./memory.js";

export const QUESTIONS = [
  "What should I study today?",
  "What am I most likely to forget?",
  "Why am I struggling?",
  "Am I on track for my exam?",
  "I've got 2 hours free. What should I do?",
  "What can I stop revising?",
  "How am I doing this week?",
];
const pct = (v) => `${Math.round(v * 100)}%`;

/**
 * @param {string} q the learner's question
 * @param {{ concepts, preds, prio, intel, dailyMinutes, existing, now }} m the learner model
 * @returns {{ intent: string, lead: string, items: {title: string, detail?: string, href?: string}[], note?: string }}
 */
export function answer(q, m) {
  const s = String(q || "").toLowerCase();
  const { concepts = [], preds, prio, now = Date.now() } = m;
  if (!concepts.length && !prio?.items?.length) return { intent: "empty", lead: "Gradify doesn't know enough about your learning yet to answer that.", items: [], note: "Add some notes and answer a few cards: every answer teaches Gradify what you know." };

  const hours = s.match(/(\d+(?:\.\d+)?)\s*(h|hour|hr)/), mins = s.match(/(\d+)\s*(m|min)/);
  if (hours || mins || /free|spare|got time/.test(s)) {
    const minutes = hours ? Math.round(parseFloat(hours[1]) * 60) : mins ? parseInt(mins[1], 10) : 60;
    const nowMin = new Date(now).getHours() * 60 + new Date(now).getMinutes();
    const start = Math.ceil(nowMin / 5) * 5;
    const plan = planDay({ items: prio.items, day: dayKey(now), minutes, intel: { ...m.intel, weekday: [{ from: start, to: Math.min(1440, start + minutes + 60) }], weekend: [{ from: start, to: Math.min(1440, start + minutes + 60) }] }, existing: m.existing || [], now });
    return { intent: "free-time", lead: `Here's the most valuable way to use ${minutes >= 60 ? `${Math.round((minutes / 60) * 10) / 10} hours` : `${minutes} minutes`}, starting now:`,
      items: plan.blocks.map((b) => ({ title: `${hhmm(b.start_min)} · ${b.title}`, detail: b.why, href: b.href })), note: "Breaks are built in. You can add this to your plan from Smart Plan." };
  }
  if (/forget|slip|fad/.test(s)) {
    const f = preds.forgetting.slice(0, 5);
    return { intent: "forget", lead: f.length ? "These are slipping fastest, from how long each card has lasted between your answers:" : "Nothing is forecast to slip in the next week. Your reviews are keeping up.",
      items: f.map((x) => ({ title: x.name, detail: x.days === 0 ? `Already below 70% recall${x.retention != null ? ` (about ${pct(x.retention)})` : ""}.` : `Drops below 70% recall in about ${x.days} ${x.days === 1 ? "day" : "days"}.`, href: `#/study/t:${encodeURIComponent(x.key)}` })) };
  }
  if (/struggl|hard|why|wrong|weak/.test(s)) {
    const worst = concepts.filter((c) => c.level === "shaky" || c.errors.recent >= 2).sort((a, b) => b.errors.confident - a.errors.confident || b.errors.recent - a.errors.recent).slice(0, 3);
    return { intent: "struggle", lead: worst.length ? "From your recent answers:" : "Nothing stands out as a struggle: no repeated or confident mistakes in the last month.",
      items: worst.map((c) => ({ title: c.name, detail: [c.errors.confident ? `${c.errors.confident} confident ${c.errors.confident === 1 ? "mistake" : "mistakes"} (you were sure, and wrong)` : "", c.errors.recent ? `${c.errors.recent} wrong in 30 days` : "", c.errors.repeated.length ? `“${c.errors.repeated[0]}” keeps coming back wrong` : "", c.errors.slow ? `${c.errors.slow} slow answers` : ""].filter(Boolean).join(" · ") + `. ${c.next.why}`, href: `#/topic/${encodeURIComponent(c.key)}` })),
      note: worst.length ? "Confident mistakes matter most: they're misunderstandings, not gaps, and they spread." : undefined };
  }
  if (/exam|on track|ready|readiness/.test(s)) {
    const r = preds.readiness, req = preds.requirement;
    const lead = req.examIn == null ? "You haven't set an exam date, so Gradify can't pace you. Set one in Settings." : req.examIn < 0 ? "Your exam date has passed. Set your next one in Settings." :
      req.status === "on-track" ? `Yes. About ${req.perDay} min a day brings every topic to ${pct(req.target)} mastery in ${req.examIn} days, within the ${m.dailyMinutes} min you have.` :
      `Not yet. You need about ${req.perDay} min a day for ${req.examIn} days to reach ${pct(req.target)} mastery, and you've said you have ${m.dailyMinutes}.`;
    return { intent: "exam", lead, items: [
      { title: `Readiness: ${pct(r.value)} (likely ${pct(r.low)}–${pct(r.high)})`, detail: r.note },
      ...preds.gaps.slice(0, 3).map((c) => ({ title: `Gap: ${c.name}`, detail: c.next.why, href: `#/topic/${encodeURIComponent(c.key)}` })),
    ], note: req.status === "behind" || req.status === "tight" ? "Add time in Smart Plan, or focus on the gaps above first." : undefined };
  }
  if (/stop|master|wast|enough|already know/.test(s)) {
    return { intent: "stop", lead: prio.stop.length ? "You can ease off these: they're strong and won't need you for a while. Gradify will bring each back before you'd forget." : "Nothing is secure enough to stop revising yet. Mastery needs good answers that last across weeks.",
      items: prio.stop.slice(0, 6).map((c) => ({ title: c.name, detail: c.nextReview ? `Next check ${new Date(c.nextReview).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}.` : "" })) };
  }
  if (/week|doing|progress|velocity/.test(s)) {
    const v = preds.velocity, a = preds.adherence;
    return { intent: "week", lead: v.now == null ? "No answers this week yet." : `This week you got ${pct(v.now)} right across ${v.answers} answers${v.delta != null ? `, ${v.delta >= 0 ? "up" : "down"} ${Math.abs(Math.round(v.delta * 100))} points on last week` : ""}.`,
      items: [
        ...(a.value != null ? [{ title: `Plan kept: ${pct(a.value)}`, detail: `${a.done} of ${a.planned} planned study blocks done in the last 14 days.` }] : []),
        { title: `${preds.strong.length} strong, ${preds.gaps.length} to work on`, detail: "Strong means good recall that's lasting. Gaps are misconceptions, fading memory or low mastery." },
      ] };
  }
  // default: what to do today
  const top = prio.items.slice(0, 3);
  return { intent: "today", lead: top.length ? "Start here, in this order:" : "You're all caught up. Add your next lecture's notes while they're fresh.",
    items: top.map((x) => ({ title: `${x.title} · ${x.mins} min`, detail: `${x.why}${x.because ? ` ${x.because}` : ""}`, href: x.href })) };
}
