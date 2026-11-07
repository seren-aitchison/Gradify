// Target my weaknesses: which lessons a learner should practise now, and which questions to give them. Built only
// from the learner's own measured evidence (kit/learning/mastery.js, with the evidence classes in
// evidence-class.js) and, where a course has one, its concept graph (kit/learning/concepts.js): a weak lesson whose
// foundations are also measured as weak sends the learner to the foundation first. Nothing is guessed: a lesson
// with no answers is never called weak. Pure functions, so Node tests them.
import { evidenceFromAttempts, sixProfiles, labPractice } from "./mastery.js";
import { weakPrerequisites } from "./concepts.js";

const WEAK = 0.6;

/**
 * @param {object[]} attempts  the learner's attempt records in this course
 * @param {{ exploration?: any, levels?: string[]|null, graph?: object|null, now?: number, limit?: number }} [o]
 * @returns {{ lesson: string, why: string, kind: "foundation"|"weak"|"slipping"|"wrong"|"lab", score: number, value: number|null, for?: string }[]}
 */
export function weaknessTargets(attempts = [], { exploration = null, levels = null, graph = null, now = Date.now(), limit = 6 } = {}) {
  const ev = evidenceFromAttempts(attempts, { levels, exploration });
  const byLesson = new Map(sixProfiles(ev, { by: (e) => e.topic, now }).groups.map((g) => [g.key, g]));
  // a lesson's level: measured mastery where there is enough evidence, else the plain share of its answers right
  // (only with at least two answers: one wrong answer is a slip, not a weakness)
  const plain = (g) => { const xs = ev.filter((e) => e.topic === g.key && !e.delayed && e.dim !== "transfer"); return xs.length >= 2 ? xs.reduce((a, e) => a + e.score, 0) / xs.length : null; };
  const level = (g) => (g ? g.mastery ?? plain(g) : null);
  const out = new Map();
  const add = (lesson, t) => { const had = out.get(lesson); if (!had || t.score > had.score) out.set(lesson, { lesson, ...t }); };
  for (const g of byLesson.values()) {
    const v = level(g);
    if (g.trend?.declining) add(g.key, { kind: "slipping", why: `Your recent answers here are weaker than before (${Math.round(g.trend.earlier * 100)}% → ${Math.round(g.trend.recent * 100)}%).`, score: 0.7 + (g.trend.earlier - g.trend.recent), value: v });
    if (v != null && v < WEAK) add(g.key, { kind: g.mastery != null ? "weak" : "wrong", why: g.mastery != null ? `Measured mastery ${Math.round(v * 100)}%.` : `${Math.round(v * 100)}% of your answers here were right.`, score: 1 - v, value: v });
  }
  for (const p of labPractice(attempts, { exploration })) add(p.lesson, { kind: "lab", why: `${p.tries} lab tries without meeting the challenge yet.`, score: 0.4 + 0.05 * Math.min(p.tries, 6), value: level(byLesson.get(p.lesson)) });
  // foundations first: a weak prerequisite of a weak lesson outranks the lesson that rests on it
  if (graph) {
    const mastery = (ids) => { const vs = ids.map((id) => level(byLesson.get(id))).filter((x) => x != null); return vs.length ? vs.reduce((a, b) => a + b, 0) / vs.length : null; };
    for (const t of [...out.values()]) {
      for (const w of weakPrerequisites(graph, t.lesson, mastery, { threshold: WEAK, maxDepth: 2 })) {
        const lessons = w.lesson ? [w.lesson.id] : w.node.lessons.filter((id) => byLesson.has(id) && (level(byLesson.get(id)) ?? 1) < WEAK);
        for (const lid of lessons) add(lid, { kind: "foundation", for: t.lesson, why: "A foundation for a lesson you're finding hard, and weak itself.", score: t.score + 0.3 + 0.1 * w.depth, value: level(byLesson.get(lid)) });
      }
    }
  }
  return [...out.values()].sort((a, b) => b.score - a.score).slice(0, limit);
}

/**
 * Questions for a practice set from the target lessons: up to `per` from each, wrong-before and never-answered
 * questions first, at a difficulty that suits the learner's level there (easier first where they're weakest).
 * @param {{ lesson: string, value: number|null }[]} targets
 * @param {Record<string, { key: string, Q: { d?: number } }[]>} itemsByLesson  each lesson's check questions
 * @param {object[]} attempts
 */
export function practiceSet(targets, itemsByLesson, attempts = [], { per = 3, max = 12 } = {}) {
  const last = new Map();
  for (const a of [...attempts].sort((x, y) => String(x.at).localeCompare(String(y.at)))) last.set(a.question?.id, a.score);
  const out = [];
  for (const t of targets) {
    const items = itemsByLesson[t.lesson] || []; if (!items.length) continue;
    // the difficulty that suits: 1 below 40%, 2 up to 60%, 3 above (or 2 with no measure)
    const want = t.value == null ? 2 : t.value < 0.4 ? 1 : t.value < 0.6 ? 2 : 3;
    const rank = (it) => { const s = last.get(it.key); return (s != null && s < 0.7 ? 0 : s == null ? 1 : 3) + Math.abs((it.Q?.d || 2) - want) * 0.5; };
    out.push(...[...items].sort((a, b) => rank(a) - rank(b) || String(a.key).localeCompare(String(b.key))).slice(0, per).map((it) => ({ lesson: t.lesson, item: it })));
    if (out.length >= max) break;
  }
  return out.slice(0, max);
}
