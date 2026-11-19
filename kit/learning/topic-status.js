// Topic status: where a learner stands on each lesson, module and unit, from evidence rather than clicks.
// Completion and mastery are kept apart: finishing a lesson makes it "learned"; answering its questions makes it
// "practised"; being consistently right across several of its questions makes it "mastered"; and recent answers that
// are mostly wrong make it "needs revision", whatever the completion says. Opening a page alone only makes a topic
// "in progress", and nothing is ever marked forgotten just because it hasn't been opened for a while.
//
//   const sig = lessonSignals(S.attempts);                       // once per paint
//   topicStatus({ done: !!S.done[id], visited, sig: sig.get(id) }) → "new" | "started" | "learned" | "practised" | "mastered" | "revise"
//   rollup(lessonIds, statusOf, sig, isDone)                             → counts, coverage and mastery for a module, unit or course

export const STATUSES = [
  { key: "new", label: "Not started", what: "Not opened yet" },
  { key: "started", label: "In progress", what: "Opened, not yet completed" },
  { key: "learned", label: "Learned", what: "Lesson completed" },
  { key: "practised", label: "Practised", what: "Completed, and you've answered its questions" },
  { key: "mastered", label: "Mastered", what: "Right, consistently, across three or more of its questions" },
  { key: "revise", label: "Needs revision", what: "Your recent answers here are mostly wrong" },
];
export const STATUS = Object.fromEntries(STATUSES.map((s) => [s.key, s]));

// thresholds (named so the UI and the tests say the same thing)
export const MASTERED = { questions: 3, mean: 0.85 };
export const WEAK = { questions: 2, mean: 0.6 };

// what counts: final marks only, and never a lab challenge merely "attempted" (opening is not evidence)
const counts = (a) => a?.question && a.lesson && a.marking?.status !== "provisional" && !(a.question.type === "lab" && a.response?.outcome === "attempted");

/** Per lesson: how many answers and distinct questions, the mean of the latest score on each question, and when. */
export function lessonSignals(attempts = []) {
  const by = new Map();
  for (const a of attempts) {
    if (!counts(a)) continue;
    const g = by.get(a.lesson) || { answers: 0, latest: new Map(), firstAt: Infinity, lastAt: 0 };
    const at = Date.parse(a.at) || 0, prev = g.latest.get(a.question.id);
    g.answers++; g.firstAt = Math.min(g.firstAt, at); g.lastAt = Math.max(g.lastAt, at);
    // only a first try at a question counts towards how well it's known: trying the options until one is right
    // (attempt 2, 3… in the same sitting) is practice, never evidence of knowing it. A fresh sitting later is a new
    // first try, so coming back and getting it right does count.
    if ((a.attempt ?? 1) > 1) { by.set(a.lesson, g); continue; }
    if (!prev || at >= prev.at) g.latest.set(a.question.id, { at, score: Number(a.score) || 0 });
    by.set(a.lesson, g);
  }
  const out = new Map();
  for (const [id, g] of by) {
    const xs = [...g.latest.values()].map((x) => x.score);
    out.set(id, { answers: g.answers, questions: xs.length, latestMean: xs.length ? xs.reduce((s, x) => s + x, 0) / xs.length : 0, right: xs.filter((x) => x >= 0.7).length, firstAt: g.firstAt, lastAt: g.lastAt });
  }
  return out;
}

/** One lesson's status. */
export function topicStatus({ done = false, visited = false, sig = null } = {}) {
  if (sig && sig.questions >= WEAK.questions && sig.latestMean < WEAK.mean) return "revise";
  if (done) {
    if (sig && sig.questions >= MASTERED.questions && sig.latestMean >= MASTERED.mean) return "mastered";
    return sig ? "practised" : "learned";
  }
  return visited || sig ? "started" : "new";
}

/** A group of lessons (module, unit, course): counts per status, coverage (completed share) and measured mastery. */
export function rollup(ids, statusOf, sig = new Map(), isDone = (id) => ["learned", "practised", "mastered"].includes(statusOf(id))) {
  const c = Object.fromEntries(STATUSES.map((s) => [s.key, 0]));
  let measured = 0, sum = 0, done = 0;
  for (const id of ids) {
    c[statusOf(id)]++; if (isDone(id)) done++;
    const g = sig.get(id); if (g) { measured++; sum += g.latestMean; }
  }
  const total = ids.length;
  return { total, counts: c, done, coverage: total ? done / total : 0, mastery: measured ? sum / measured : null, measured,
    // the one word that sums the group up, for a dot in the syllabus
    status: !total ? "new" : c.revise ? "revise" : c.mastered === total ? "mastered" : c.new === total ? "new" : done === total ? (c.practised + c.mastered === total ? "practised" : "learned") : "started" };
}

/** Lessons ranked weakest first (measured only), and strongest first, for strengths and weaknesses. */
export function strengths(sig, { min = WEAK.questions } = {}) {
  const rows = [...sig].filter(([, g]) => g.questions >= min).map(([id, g]) => ({ id, ...g }));
  return {
    weak: rows.filter((r) => r.latestMean < 0.7).sort((a, b) => a.latestMean - b.latestMean || b.answers - a.answers),
    strong: rows.filter((r) => r.latestMean >= MASTERED.mean).sort((a, b) => b.latestMean - a.latestMean || b.questions - a.questions),
  };
}
