// Gradify Autopilot: the layer that runs a learner's study for them, within limits they set.
//   Copilot   you decide, Gradify advises: suggestions only, nothing changes without a tap.
//   Adaptive  Gradify organises your learning: missed Gradify sessions are moved, focus blocks are filled at the
//             moment you start them, and a new deadline or missed day re-plans Gradify's own blocks.
//   Autopilot your study, managed: Adaptive, plus the next seven days are kept planned, and a recovery plan is
//             applied when you fall behind.
// Every change is a proposed action that this module validates (Gradify's own blocks only, never more than the
// learner's daily time, never outside their free hours) and records in an activity log with an undo.
// Also here: the catch-up machine, the opportunity detector, task decomposition and floating focus blocks.
// Pure functions; the browser applies them through kit/app/autopilot-views.js.
import { forWindow } from "./order.js";
import { DAY, SEC_PER_CARD, dayKey, minuteOf, hhmm } from "./memory.js";
import { planDay, freeIntervals, windowsFor } from "./schedule.js";
import { words } from "../learning/topic-match.js";

export const MODES = [
  { id: "copilot", name: "Copilot", line: "You decide. Gradify advises.", what: "Recommends what to do and why, and suggests plan changes. Nothing changes until you say so." },
  { id: "adaptive", name: "Adaptive", line: "Gradify organises your learning.", what: "Moves missed Gradify sessions, fills focus blocks with the most valuable task when you start, and re-plans its own blocks when deadlines change." },
  { id: "autopilot", name: "Autopilot", line: "Your study, intelligently managed.", what: "Everything in Adaptive, plus it keeps the next seven days planned in your free time and puts a recovery plan in place when you fall behind." },
];
// older settings ("suggest", "auto") map onto the modes
export const modeOf = (intel) => ({ suggest: "copilot", auto: "adaptive" }[intel?.autonomy] || intel?.autonomy || "copilot");
export const FOCUS = "Focus block";
const IMPORTED = ["external", "away", "allday", "ext-exam", "ext-deadline"];

// ---------- the catch-up machine ----------
/**
 * When the plan has stopped being realistic (several missed sessions, or days without study while work is due),
 * a recovery: what's essential, what can wait, and a fresh seven days that doesn't try to cram the missed work back.
 * Missed sessions aren't simply repeated: priorities are worked out again from the learner's evidence now.
 */
export function catchUp(m) {
  const lastStudy = m.events.find((e) => e.event === "flashcard_answered" || e.event === "study_session" || e.event === "plan_block_done");
  const idleDays = lastStudy ? Math.floor((m.now - Date.parse(lastStudy.at)) / DAY) : null;
  const missed = m.missed.missed.length;
  const needed = missed >= 3 || (idleDays != null && idleDays >= 3 && (m.preds.dueCards > 0 || m.deadlines.length > 0));
  if (!needed) return null;
  const items = m.prio.items;
  const essential = items.filter((x) => x.kind === "deadline" || x.kind === "misconception" || x.kind === "weak");
  const later = items.filter((x) => x.kind === "stretch" || (x.kind === "learn" && !m.deadlines.length));
  return {
    missed, idleDays, essential, later, dueCards: m.preds.dueCards,
    deadlines: m.deadlines.filter((d) => (Date.parse(`${d.day}T00:00:00`) - m.now) / DAY <= 14),
    headline: missed >= 3 ? `You've missed ${missed} planned sessions.` : `It's been ${idleDays} days since you last studied.`,
    line: "Your original schedule isn't realistic any more. Gradify can reorganise the next seven days around what matters most now, protecting your deadlines, without trying to cram every missed session back in.",
  };
}

// ---------- the week, built by Gradify (Autopilot and the recovery plan) ----------
/**
 * Proposed blocks for the next `days` days: each day's due reviews plus the ranked queue, spread so nothing is planned
 * twice, in the learner's free time, never more than their daily minutes. Days that already have Gradify blocks are
 * left alone unless `replace` is set (the recovery plan replaces Gradify's own future blocks).
 */
export function proposeWeek(m, { days = 7, replace = false, startToday = false } = {}) {
  let queue = m.prio.items.filter((x) => x.id !== "due");
  const out = [], remove = [];
  for (let k = startToday ? 0 : 1; k < days + (startToday ? 0 : 1); k++) {
    const day = dayKey(m.now + k * DAY), end = Date.parse(`${day}T23:59:59`);
    const own = m.blocks.filter((b) => b.day === day && b.auto && !b.done);
    if (own.length && !replace) continue;
    if (replace) remove.push(...own);
    const keep = m.blocks.filter((b) => b.day === day && !(replace && b.auto && !b.done));
    const due = m.cards.filter((c) => !c.suspended && c.reps > 0 && Date.parse(c.due_at) <= end && Date.parse(c.due_at) > end - DAY).length;
    const items = [...(due ? [{ id: `due:${day}`, title: `Review about ${due} due ${due === 1 ? "card" : "cards"}`, mins: Math.max(5, Math.ceil((due * SEC_PER_CARD) / 60)), weight: "light", kind: "review", why: "Due that day from spaced repetition." }] : []), ...queue];
    const plan = planDay({ items, day, minutes: m.dailyMinutes, intel: m.intel, existing: keep, now: m.now });
    const used = new Set(plan.blocks.map((b) => b.id));
    queue = queue.filter((x) => !used.has(x.id));
    out.push(...plan.blocks.filter((b) => b.kind !== "break" && b.kind !== "wrap").map((b) => ({ day, start_min: b.start_min, end_min: b.end_min, title: b.title, cal: "study", auto: true })));
  }
  return { add: out, remove, unplaced: queue.slice(0, 5) };
}

// ---------- floating focus blocks: reserved time whose task is chosen at the moment it starts ----------
export const isFocus = (b) => b.auto && b.title === FOCUS;
export function proposeFocusBlocks(m, { days = 7, len = null } = {}) {
  const size = len || Math.min(45, Math.max(20, m.dailyMinutes));
  const out = [];
  for (let k = 1; k <= days; k++) {
    const day = dayKey(m.now + k * DAY);
    if (m.blocks.some((b) => b.day === day && b.auto)) continue;
    const f = freeIntervals(day, { windows: windowsFor(day, m.intel), existing: m.blocks.filter((b) => b.day === day), now: m.now }).find((x) => x.to - x.from >= size);
    if (f) out.push({ day, start_min: f.from, end_min: f.from + size, title: FOCUS, cal: "study", auto: true });
  }
  return out;
}
// what a focus block holds right now: the best item that fits its length
export function fillFocus(m, block) {
  const len = block.end_min - block.start_min;
  return m.prio.items.find((x) => x.mins <= len) || m.prio.items[0] || null;
}

// ---------- opportunities ----------
export function opportunities(m) {
  const out = [], nowMin = minuteOf(m.now);
  // free time right now, before the next thing in the calendar today
  const next = m.blocks.filter((b) => b.day === m.today && b.start_min > nowMin && b.cal !== "allday").sort((a, b) => a.start_min - b.start_min)[0];
  if (next) {
    const gap = next.start_min - nowMin;
    if (gap >= 10 && gap <= 120) {
      // the learning opportunity engine picks the best use of exactly this window (kit/intel/order.js)
      const w = forWindow(m, gap - 5), fit = w.items;
      if (fit.length) out.push({ id: "gap", tone: "blue", title: `${gap} minutes free before ${next.title}`, why: `${fit.map((x) => `${x.title} (${x.mins} min)`).join(", then ")}. ${w.note}`, href: fit[0].href, cta: "Start the first" });
    }
  }
  // a pack fully strong: time to move on
  const byPack = new Map();
  for (const c of m.concepts) { if (!byPack.has(c.documentId)) byPack.set(c.documentId, []); byPack.get(c.documentId).push(c); }
  for (const [id, list] of byPack) if (list.length >= 2 && list.every((c) => c.level === "strong" || c.level === "mastered")) {
    out.push({ id: `ready:${id}`, tone: "green", title: `${list[0].pack || "A pack"} is strong`, why: "Every topic in it is strong and lasting. You're ready for the next lecture's notes.", href: "#/new", cta: "Add the next notes" });
  }
  // application lagging recall
  const rec = m.concepts.filter((c) => c.dims.recall.n >= 3), app = m.concepts.filter((c) => c.dims.apply.n >= 2);
  const avg = (l, k) => l.reduce((a, c) => a + c.dims[k].value, 0) / l.length;
  if (rec.length >= 2 && (!app.length || avg(app, "apply") < avg(rec, "recall") - 0.2)) {
    const d = m.docs[0];
    out.push({ id: "apply", tone: "violet", title: app.length ? "Application is lagging your recall" : "You haven't tried applying what you know", why: app.length ? `You recall about ${Math.round(avg(rec, "recall") * 100)}% but apply about ${Math.round(avg(app, "apply") * 100)}%. A few apply questions a day closes the gap, and it's what exams test.` : "Recall is solid. Questions that make you use ideas on new problems are the next step, and what exams test.", href: d ? `#/deck/${d.id}` : "#/notes", cta: "Add apply questions" });
  }
  // an exam soon, with no full mixed practice yet
  const exam = m.deadlines.find((x) => x.kind === "exam");
  if (exam) {
    const days = Math.round((Date.parse(`${exam.day}T00:00:00`) - Date.parse(`${m.today}T00:00:00`)) / DAY);
    const mixed = m.events.some((e) => e.event === "study_session" && e.detail?.cards >= 25);
    if (days >= 0 && days <= 21 && !mixed && m.cards.length >= 15) out.push({ id: "mock", tone: "amber", title: `${days} days to ${exam.title}`, why: "You haven't done a long mixed session yet. Practising everything together, under time, is the best rehearsal for the real thing.", href: "#/study", cta: "Do a mixed session" });
  }
  // plenty of free time next week compared with what's planned
  let free = 0, planned = 0;
  for (let k = 1; k <= 7; k++) {
    const day = dayKey(m.now + k * DAY);
    free += freeIntervals(day, { windows: windowsFor(day, m.intel), existing: m.blocks.filter((b) => b.day === day), now: m.now }).reduce((a, f) => a + f.to - f.from, 0);
    planned += m.blocks.filter((b) => b.day === day && b.auto).reduce((a, b) => a + b.end_min - b.start_min, 0);
  }
  if (free >= m.dailyMinutes * 7 * 3 && m.preds.requirement.status && ["tight", "behind"].includes(m.preds.requirement.status)) out.push({ id: "time", tone: "green", title: `${Math.round(free / 60)} free hours in the next week`, why: `You're ${m.preds.requirement.status} for your exam, and your availability has room. Raising your daily time to ${m.preds.requirement.perDay} min would put you on track.`, href: "#/account", cta: "Change daily time" });
  else if (!planned && free >= 60 && m.prio.items.length) out.push({ id: "plan", tone: "blue", title: "Nothing planned for the next week", why: `You have about ${Math.round(free / 60)} hours free. Let Gradify spread your ${m.prio.items.length} priorities across it.`, href: "#/plan", cta: "Plan my week" });
  return out.slice(0, 4);
}

// ---------- task decomposition: "Revise cardiovascular physiology" into real work ----------
export function decompose(query, m) {
  const q = new Set(words(query));
  const score = (c) => { const w = words(`${c.name} ${c.pack || ""}`); return w.filter((x) => q.has(x)).length / Math.max(1, Math.min(q.size, 4)); };
  const matched = m.concepts.map((c) => ({ c, s: score(c) })).filter((x) => x.s > 0).sort((a, b) => b.s - a.s).map((x) => x.c);
  const subject = String(query).replace(/^(revise|study|learn|review|prepare for|work on|go over|cover)\s+/i, "").trim() || query;
  if (!matched.length) return { subject, matched: [], steps: [], total: 0, note: `Gradify doesn't have notes on “${subject}” yet. Add your notes or slides on it and it'll break the topic down into real work.` };
  const enc = encodeURIComponent, steps = [];
  const found = (c) => c.level === "strong" || c.level === "mastered";
  const strong = matched.filter(found), gaps = matched.filter((c) => c.level === "shaky" || c.level === "fading" || (c.seen && c.mastery < 0.5)), fresh = matched.filter((c) => c.level === "new");
  const dueN = m.cards.filter((card) => !card.suspended && Date.parse(card.due_at) <= m.now && card.reps > 0 && matched.some((c) => `${card.document_id}|${card.topic || "Cards"}` === c.key)).length;
  if (strong.length) steps.push({ title: `Warm up: ${strong.slice(0, 2).map((c) => c.name).join(", ")}`, mins: 10, tag: "Foundational", why: "Start with what you know well, so the harder parts have something to attach to.", done: "Answer them right again, first time.", href: `#/study/t:${enc(strong[0].key)}` });
  for (const c of gaps.slice(0, 3)) steps.push({ title: `Fix ${c.name}`, mins: Math.max(8, c.misconceptions.length * 4 || 10), tag: "Knowledge gap", why: c.next.why, done: c.level === "shaky" ? "Right on the cards you got wrong while sure, at least 12 hours later." : "Recall back above 70%.", href: `#/study/t:${enc(c.key)}` });
  if (dueN) steps.push({ title: `Review ${dueN} priority ${dueN === 1 ? "flashcard" : "flashcards"}`, mins: Math.max(5, Math.ceil((dueN * SEC_PER_CARD) / 60)), tag: "Spaced repetition", why: "Due now across this topic.", done: "Nothing due in this topic.", href: `#/study/t:${enc(matched[0].key)}` });
  for (const c of fresh.slice(0, 2)) steps.push({ title: `Learn ${c.name}`, mins: Math.max(5, Math.ceil((Math.min(c.fresh, 10) * SEC_PER_CARD) / 60)), tag: "New material", why: "Not tested yet.", done: "Every card answered once.", href: `#/study/t:${enc(c.key)}` });
  const d = matched[0].documentId;
  if (!matched.some((c) => c.stages.applied)) steps.push({ title: "Application questions", mins: 15, tag: "Application", why: "Use the ideas on problems you haven't seen: what exams test.", done: "Two or more apply answers right.", href: `#/deck/${enc(d)}` });
  steps.push({ title: "Mastery check: mixed practice", mins: 10, tag: "Verification", why: "Everything in this topic, shuffled, to show it's really there.", done: `Every concept here at least “understood”.`, href: `#/study/t:${enc(matched[0].key)}` });
  const total = steps.reduce((a, s) => a + s.mins, 0);
  const finished = matched.every((c) => c.stages.understood);
  return { subject, matched, steps, total, finished, note: finished ? "By the evidence, you've already reached the goal for this topic. Gradify will keep it fresh." : `Finished when every concept is at least understood: now ${matched.filter((c) => c.stages.understood).length} of ${matched.length}.` };
}

// ---------- the activity log ----------
export function logEntry(what, undo, now = Date.now()) { return { at: new Date(now).toISOString(), what, undo }; }
export const trimLog = (log = [], max = 25) => log.slice(-max);
export const fmtBlock = (b) => `${new Date(`${b.day}T12:00:00`).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })} ${hhmm(b.start_min)}`;
export { IMPORTED };
