// The session planner: "I have 35 minutes before my next commitment. What should I do?"
//
// Gradify builds one study session from the priority engine's ranked, evidence-backed items (kit/intel/priority.js),
// in an order learning science supports:
//   1. Recap     retrieve the basics this session builds on (prerequisites, root causes, fading foundations).
//                Recalling what you already know first gives new material something to attach to.
//   2. Learn     the hardest valuable thing: a misconception, a repeated mistake, new material, a deadline.
//                Hard thinking goes where attention is freshest.
//   3. Apply     use it on a problem: application questions, a stretch task, or explaining it back in your own words.
//   4. Retrieve  finish with retrieval practice (due cards, fading topics): testing beats rereading for retention.
// Long sessions are cut into blocks of the learner's chosen length (Settings → Reading and accessibility → Study
// block length) with a short break between them.
//
// Every step carries the reason for it and the evidence it came from. Nothing is invented: with no evidence there is
// no plan, and the learner is told what would give Gradify some. If a learner says a step was a struggle, the rest of
// the session adapts (adapt): the topic is met another way, and the next step is made easier before it gets harder.
// Pure, so Node tests it (tests/session.test.mjs).

export const PHASES = {
  recap: { name: "Recap", line: "Recall the basics this builds on, so the new material has something to attach to." },
  learn: { name: "Learn", line: "The hardest valuable thing, while your attention is freshest." },
  apply: { name: "Apply", line: "Use it on a problem, or explain it in your own words. Recognising isn't the same as being able to use it." },
  retrieve: { name: "Retrieve", line: "Finish by testing yourself. Retrieval makes memories last far longer than rereading." },
  break: { name: "Break", line: "Stand up, look away from the screen, have some water. Breaks help focus come back." },
};
const RECAP = ["root"], APPLY = ["stretch"], RETRIEVE = ["review"];
const share = { recap: 0.15, learn: 0.45, apply: 0.25, retrieve: 0.15 };

/** Minutes from now until the next thing in today's plan or calendar (less 5 to get ready), or null. Pure. */
export function untilNext(blocks = [], now = Date.now()) {
  const d = new Date(now), day = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const nowMin = d.getHours() * 60 + d.getMinutes();
  const next = blocks.filter((b) => b.day === day && b.start_min > nowMin && !b.done).sort((a, b) => a.start_min - b.start_min)[0];
  if (!next) return null;
  const mins = next.start_min - nowMin - 5;
  return mins >= 10 ? { mins, title: next.title, at: `${String(Math.floor(next.start_min / 60)).padStart(2, "0")}:${String(next.start_min % 60).padStart(2, "0")}` } : null;
}

const pick = (items, kinds, used) => items.find((x) => kinds.includes(x.kind) && !used.has(x.id));
// what to learn: a topic with evidence of a gap first, then new material, and only then a deadline, which names an
// event rather than something to learn
const pickLearn = (items, used) => pick(items, ["misconception", "weak"], used) || pick(items, ["learn", "lesson", "course"], used) || pick(items, ["deadline"], used);
// a topic's key in an item id ("fix:cells", "new:cells" → "cells")
const topicOf = (x) => (x?.id || "").split(":").slice(1).join(":");

/**
 * A session for `minutes` from the ranked items.
 * @param {{ minutes: number, items: object[], block?: number }} o  block: the learner's study block length
 * @returns {{ minutes, steps: {phase, title, mins, why, because, href, id, topic}[], used: number, empty?: string }}
 */
export function composeSession({ minutes, items = [], block = 25 }) {
  minutes = Math.max(5, Math.round(minutes));
  if (!items.length) return { minutes, steps: [], used: 0, empty: "Gradify doesn't have any evidence about your learning yet. Add some notes or start a course lesson, answer a few questions, and it can plan a session around what you know." };
  // the breaks come out of the time too: a 35-minute window holds 30 minutes of study and one 5-minute break
  const total0 = minutes; let work = minutes; while (work > 5 && work + 5 * (Math.ceil(work / block) - 1) > total0) work--;
  minutes = work;
  const used = new Set(), steps = [];
  const take = (phase, x, mins, extra = {}) => { if (!x || mins < 2) return; used.add(x.id); steps.push({ phase, id: x.id, topic: topicOf(x), title: x.title, mins: Math.round(mins), why: x.why, because: x.because || "", href: x.href, ...extra }); };
  // short sessions: learn and retrieve only
  const phases = minutes < 12 ? ["learn", "retrieve"] : ["recap", "learn", "apply", "retrieve"];
  const total = phases.reduce((a, p) => a + share[p], 0);
  const budget = Object.fromEntries(phases.map((p) => [p, Math.max(p === "learn" ? 4 : 2, (minutes * share[p]) / total)]));
  const learn = pickLearn(items, used);
  // recap: the root cause first; otherwise a fading topic; it's retrieval of the basics either way
  if (budget.recap) take("recap", pick(items, RECAP, used) || items.find((x) => x.kind === "review" && x.id !== "due" && !used.has(x.id) && x.id !== learn?.id), budget.recap);
  take("learn", learn && !used.has(learn.id) ? learn : pickLearn(items, used), budget.learn);
  if (budget.apply) {
    const lt = steps.find((s) => s.phase === "learn");
    // apply what was just learned where possible, then any stretch task
    const ap = items.find((x) => APPLY.includes(x.kind) && !used.has(x.id) && topicOf(x) === lt?.topic) || pick(items, APPLY, used);
    if (ap) take("apply", ap, budget.apply);
    else if (lt?.topic && lt.id !== "due" && !lt.id.startsWith("dl:") && !lt.id.startsWith("course:")) steps.push({ phase: "apply", id: `explain:${lt.id}`, topic: lt.topic, title: `Explain ${lt.title.replace(/^(Revisit|Target|Start|Fix the root:|Continue:?)\s*/i, "")} in your own words`, mins: Math.round(budget.apply),
      why: "Explaining something without your notes shows whether you understand it, and where you don't.", because: "Gradify has no application questions on this topic yet, so this is the next best test.", href: lt.href });
  }
  take("retrieve", items.find((x) => x.id === "due" && !used.has(x.id)) || pick(items, RETRIEVE, used), budget.retrieve);
  // nothing for a phase: give its time to learning, the most valuable phase
  const spent = steps.reduce((a, s) => a + s.mins, 0), spare = minutes - spent;
  const L = steps.find((s) => s.phase === "learn");
  // (rounding can also overshoot by a minute or two: taken back from learning too)
  const into = L || steps[0];
  if (into && spare) into.mins = Math.max(2, into.mins + spare);
  return { minutes: total0, study: minutes, steps: withBreaks(steps, block), used: total0 };
}

/** Cut a session into blocks of `block` minutes with a 5-minute break between them; long steps are split. Pure. */
export function withBreaks(steps, block = 25) {
  const out = []; let run = 0;
  for (const s of steps) {
    let left = s.mins, part = 0;
    while (left > 0) {
      const room = block - run;
      if (room <= 1) { out.push({ phase: "break", title: "Break", mins: 5, why: PHASES.break.line, because: `Your study blocks are ${block} minutes.` }); run = 0; continue; }
      const m = Math.min(left, room);
      out.push({ ...s, mins: m, ...(m < s.mins ? { part: ++part } : {}) });
      left -= m; run += m;
    }
  }
  if (out.at(-1)?.phase === "break") out.pop();
  return out;
}

/**
 * The rest of a session after the learner says a step went badly: meet the topic another way first, then make the
 * next step easier (retrieval on the same topic) instead of harder. Pure.
 * @param {object[]} rest the steps still to do
 * @param {object} step the step that was a struggle
 */
export function adapt(rest, step) {
  if (!step || step.phase === "break") return rest;
  const other = { phase: "learn", id: `another:${step.id}`, topic: step.topic, title: `See it another way: ${step.title.replace(/^(Revisit|Target|Start|Fix the root:|Apply|Explain)\s*/i, "")}`, mins: Math.min(8, Math.max(4, Math.round(step.mins / 2))),
    why: "The same explanation again rarely helps. A different way in (a worked example, a picture, a question to the tutor, or the topic broken into steps) usually does.",
    because: "You said that step was a struggle.", href: step.topic ? `#/topic/${encodeURIComponent(step.topic)}` : step.href, another: true };
  // anything harder on the same topic waits until it has been retrieved once more
  const easier = rest.map((s) => (s.phase === "apply" && s.topic === step.topic ? { ...s, phase: "retrieve", title: `Recall ${s.title.replace(/^(Apply|Explain)\s*/i, "")}`, why: "Make sure the basics are secure before applying them.", because: "Adapted after a struggle." } : s));
  return [other, ...easier];
}
