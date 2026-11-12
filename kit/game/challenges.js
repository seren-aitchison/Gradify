// The daily challenge: a short, varied set built from the learner's own courses. The kind is chosen from what fits
// today (a weakness recovery set when there's a measured weakness, otherwise a speed round or mixed revision), and
// subjects can register their own kinds (history registers a chronology challenge built from dated facts in its
// notes). Challenges use the shared question types, so they render and mark exactly as lessons do.
import { dayKey } from "./engine.js";
import { practiceSet } from "../learning/targets.js";

export const CHALLENGE_KINDS = new Map();
// kind: { title, blurb, subjects?: [slugs], seconds?, build(ctx) → { items: [{ key, Q, course, lesson? }] } | null }
export function registerChallenge(id, kind) {
  if (CHALLENGE_KINDS.has(id)) throw new Error(`challenge kind ${id} is already registered`);
  CHALLENGE_KINDS.set(id, { id, ...kind });
}
// a seeded shuffle, so a day's challenge is the same on every reload
function rng(s) { let h = [...String(s)].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 2166136261); return () => ((h = (h * 1664525 + 1013904223) >>> 0) / 2 ** 32); }
const pick = (arr, n, r) => arr.map((x) => [r(), x]).sort((a, b) => a[0] - b[0]).slice(0, n).map((x) => x[1]);
const auto = (it) => it.Q && it.Q.type !== "short";

registerChallenge("recovery", {
  title: "Weakness recovery", blurb: "Five questions from the topics your answers show are weakest, easier ones first.",
  build: (c) => { if (!c.weak.length) return null; const items = practiceSet(c.weak.map((w) => ({ lesson: w.lesson, value: w.value ?? null })), c.itemsByLesson, c.attempts, { per: 2, max: 5 }).filter(auto); return items.length >= 3 ? { items } : null; },
});
registerChallenge("speed", {
  title: "Speed round", blurb: "Five questions from lessons you've completed. Ninety seconds: accuracy first, then speed.", seconds: 90,
  build: (c) => { const pool = c.doneLessons.flatMap((l) => (c.itemsByLesson[l] || []).filter(auto)); return pool.length >= 5 ? { items: pick(pool, 5, c.r) } : null; },
});
registerChallenge("mixed", {
  title: "Mixed revision", blurb: "Five questions from across everything you've studied, spaced out on purpose.",
  build: (c) => { const pool = Object.values(c.itemsByLesson).flat().filter(auto); return pool.length >= 5 ? { items: pick(pool, 5, c.r) } : null; },
});
// history: put four dated events in order, from "established" evidence lines that carry exactly one year
registerChallenge("chronology", {
  title: "Chronology challenge", blurb: "Put four events in the order they happened.", subjects: ["history"],
  build: (c) => {
    const facts = [];
    for (const L of c.lessons.filter((L) => L.course === "history")) for (const e of L.evidence || []) {
      if (e.status !== "established") continue;
      const years = [...new Set((e.claim.match(/\b(1[0-9]{3}|20[0-2][0-9])\b/g) || []))];
      if (years.length === 1) facts.push({ year: Number(years[0]), text: e.claim.replace(/\.$/, ""), lesson: L.id });
    }
    const byYear = new Map(); for (const f of facts) if (!byYear.has(f.year)) byYear.set(f.year, f);
    if (byYear.size < 4) return null;
    const four = pick([...byYear.values()], 4, c.r).sort((a, b) => a.year - b.year);
    const Q = { type: "order", q: "Put these events in chronological order, earliest first.", steps: four.map((f) => f.text), d: 2, why: four.map((f) => `${f.year}: ${f.text}`).join(" · ") };
    return { items: [{ key: `chrono:${c.day}`, Q, course: "history", lesson: four[0].lesson }] };
  },
});

/**
 * Today's challenge. ctx: { day, weak, attempts, itemsByLesson: { lessonKey: [{ key, Q, course, lesson }] },
 * doneLessons: [lessonKey], lessons: [{ id, course, evidence }], subjects: [slugs] }.
 */
export function dailyChallenge(ctx) {
  const day = ctx.day || dayKey(Date.now()), r = rng(day), c = { ...ctx, day, r };
  // a measured weakness comes first; otherwise the kinds rotate by day, subject kinds only for their subjects
  const kinds = [...CHALLENGE_KINDS.values()].filter((k) => !k.subjects || k.subjects.some((s) => (ctx.subjects || []).includes(s)));
  const rotation = pick(kinds.filter((k) => k.id !== "recovery"), kinds.length, r);
  for (const k of [CHALLENGE_KINDS.get("recovery"), ...rotation]) {
    const built = k?.build(c); if (built?.items?.length) return { kind: k.id, title: k.title, blurb: k.blurb, seconds: k.seconds || null, items: built.items, key: `challenge:${day}` };
  }
  return null;
}
// XP for a finished challenge: 10 per correct answer (an ordering question counts as five), at most 50, paid once a day
export function challengeReward(result, challenge) {
  const n = challenge.items.length === 1 ? Math.round(5 * result.score) : result.correct;
  return { key: challenge.key, done: true, xp: Math.min(50, 10 * n), title: `Daily challenge: ${challenge.title}` };
}
