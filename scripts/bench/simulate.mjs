// Synthetic learners for the Gradify Intelligence benchmarks.
//
// Why synthetic: the live answer history sits in Supabase and isn't available offline, and a benchmark that runs in
// `npm test` must be deterministic. Synthetic learners check that each model behaves sensibly, catch regressions,
// and let readiness intervals be checked against a known truth. They don't show that a model helps real students:
// for that, run the same benchmarks on an exported, anonymised answer log (`--data`, see docs/intelligence/BENCHMARKS.md).
//
// To avoid marking Gradify's own homework, the simulated memory is NOT FSRS and the simulated knowledge is NOT BKT:
//   - memory: exponential forgetting with a half-life that grows with spaced successful recalls, scaled by a hidden
//     per-card difficulty and per-learner memory (in the spirit of half-life regression and ACT-R spacing effects);
//   - knowledge: a logistic ability model per concept that grows with practice, decays with time away, depends on
//     prerequisite concepts, and has per-learner guessing and slips (closer to IRT and performance-factors analysis).
// A model that happens to match the generator would look unrealistically good, so neither is used as a generator.
import { schedule } from "../../kit/learning/srs.js";

export const DAY = 864e5;
export const T0 = Date.UTC(2026, 0, 5, 9);   // a fixed start, so runs are identical

/** Seeded random numbers (mulberry32). */
export function rng(seed) {
  let a = seed >>> 0;
  const next = () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const normal = () => { const u = Math.max(1e-12, next()), v = next(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
  return { next, normal, pick: (xs) => xs[Math.floor(next() * xs.length)], int: (lo, hi) => lo + Math.floor(next() * (hi - lo + 1)) };
}
const sigmoid = (x) => 1 / (1 + Math.exp(-x));
const iso = (t) => new Date(t).toISOString();

// ---------------------------------------------------------------------------------------------
// Flashcard memory: review logs for the recall-prediction benchmark
// ---------------------------------------------------------------------------------------------
/**
 * Learners reviewing flashcards on Gradify's own schedule (srs.js decides when cards come back), but sometimes late,
 * sometimes early, and with a memory that follows the hidden model above.
 * @returns {{ user: string, card: string, at: number, rating: string, truth: number }[]} in time order per user;
 *   truth is the simulator's real recall probability at that moment (for checking, never shown to a model)
 */
export function simulateReviews({ seed = 1, learners = 40, cards = 40, days = 120 } = {}) {
  const R = rng(seed), out = [];
  for (let u = 0; u < learners; u++) {
    const memory = Math.exp(0.35 * R.normal());          // this learner's memory: >1 forgets more slowly
    const diligence = 0.55 + 0.4 * R.next();             // chance of studying on any given day
    const lateness = 0.3 + 1.2 * R.next();               // how far past due they tend to review
    const deck = Array.from({ length: cards }, (_, i) => ({
      id: `u${u}c${i}`, difficulty: Math.exp(0.5 * R.normal()), intro: Math.floor(R.next() * days * 0.6),
      half: null, last: null, nextAt: null, card: { reps: 0, due_at: null },
    }));
    for (let d = 0; d < days; d++) {
      if (R.next() > diligence) continue;
      const now = T0 + d * DAY + Math.floor(R.next() * 12) * 36e5;
      for (const c of deck) {
        if (d < c.intro || (c.nextAt != null && now < c.nextAt)) continue;
        // the hidden truth: exponential forgetting with this card's half-life (in days)
        const truth = c.half == null ? null : Math.pow(0.5, (now - c.last) / DAY / c.half);
        const recalled = c.half != null && R.next() < truth;
        // a first look is "learning"; afterwards the learner rates honestly, mostly "good"
        const rating = c.half == null ? (R.next() < 0.8 ? "good" : "again") : !recalled ? "again" : truth > 0.95 && R.next() < 0.35 ? "easy" : truth < 0.8 && R.next() < 0.4 ? "hard" : "good";
        out.push({ user: `u${u}`, card: c.id, at: now, rating, truth, ...(c.half == null ? { first: true } : {}) });
        // the hidden memory update: a successful recall after a longer gap (lower truth) strengthens memory more;
        // a failure cuts the half-life sharply
        if (c.half == null) c.half = (rating === "again" ? 5 : 25) * memory / c.difficulty;
        else if (!recalled) c.half = Math.max(3, c.half * 0.25);
        else c.half = c.half * (1 + (9 * memory / c.difficulty) * (1.1 - truth));
        c.last = now;
        c.card = { ...c.card, ...schedule(c.card, rating, { now }) };
        // Gradify's schedule says when; the learner turns up on time, late, or (rarely) a day or two early
        const due = Date.parse(c.card.due_at), gap = due - now;
        c.nextAt = R.next() < 0.05 ? due - Math.min(gap / 2, 2 * DAY) : due + lateness * R.next() * gap * 0.5;
      }
    }
  }
  return out;
}

// ---------------------------------------------------------------------------------------------
// Course answers: attempt records for the mastery, knowledge-tracing and readiness benchmarks
// ---------------------------------------------------------------------------------------------
/**
 * Learners working through a course of lessons with check questions, in Gradify's attempt-record format
 * (kit/assess/attempts.js), so Gradify's real evidence and readiness code can read them unchanged.
 * Each lesson has two objectives and several questions of difficulty 1 to 3; later lessons rest on earlier ones.
 * @returns {{ attempts: object[], truth: (user: string, lesson: string, objective: number, at: number, d: number) => number, lessons: string[], users: string[] }}
 */
export function simulateCourse({ seed = 2, learners = 60, lessons = 12, days = 70, perLesson = 6 } = {}) {
  const R = rng(seed);
  const L = Array.from({ length: lessons }, (_, i) => ({ id: `l${String(i + 1).padStart(2, "0")}`, unit: `u${1 + Math.floor(i / 4)}`, prereq: i ? [i - 1] : [], hard: 0.6 * R.normal() }));
  for (let i = 3; i < lessons; i += 3) L[i].prereq.push(i - 3);
  const Q = L.flatMap((l, li) => Array.from({ length: perLesson }, (_, k) => ({ id: `${l.id}q${k + 1}`, lesson: li, d: 1 + (k % 3), objectives: [1 + (k % 2)], b: l.hard + (k % 3 - 1) * 0.8 + 0.3 * R.normal() })));
  const attempts = [], state = new Map();
  const users = [];
  for (let u = 0; u < learners; u++) {
    const user = `s${u}`; users.push(user);
    const ability = R.normal(), rate = 0.25 + 0.35 * R.next(), forget = 0.08 + 0.12 * R.next();
    const guess = 0.1 + 0.15 * R.next(), slip = 0.03 + 0.07 * R.next(), pace = 2 + Math.floor(R.next() * 5), diligence = 0.5 + 0.45 * R.next();
    const know = L.map(() => ({ k: -1.5, last: null }));   // latent skill per lesson (logit scale)
    state.set(user, { ability, forget, guess, slip, know });
    let lesson = 0;
    for (let d = 0; d < days; d++) {
      if (R.next() > diligence) continue;
      const now = T0 + d * DAY + Math.floor(R.next() * 10) * 36e5;
      // move on to a new lesson every `pace` study days; otherwise revisit a lesson already met
      const met = Math.min(lessons - 1, lesson);
      const li = R.next() < 0.55 ? met : Math.floor(R.next() * (met + 1));
      if (R.next() < 1 / pace && lesson < lessons - 1) lesson++;
      const context = li === met ? "lesson" : R.next() < 0.5 ? "review" : "quiz";
      const qs = Q.filter((q) => q.lesson === li);
      for (let n = 0; n < 3; n++) {
        const q = R.pick(qs), p = pCorrect(state.get(user), L, li, q, now);
        const right = R.next() < p;
        const conf = right ? (p > 0.75 ? 3 : R.next() < 0.5 ? 2 : 1) : (R.next() < 0.25 ? 3 : R.next() < 0.6 ? 2 : 1);
        attempts.push({
          schema: 1, id: `${user}-${attempts.length}`, at: iso(now + n * 60e3), site: "BenchGradify", subject: "bench", context, contextId: null,
          question: { id: q.id, v: 1, type: q.d === 3 ? "sba" : "mcq", d: q.d, objectives: q.objectives },
          lesson: L[li].id, module: null, unit: L[li].unit, response: null, score: right ? 1 : 0, correct: right, attempt: 1,
          confidence: conf, ms: 8000 + Math.floor(R.next() * 20000), misconception: null, marking: { method: "auto", status: "final" }, user, truth: p,
        });
        // learning from the attempt: more from a mistake with feedback, less once already known
        const s = state.get(user).know[li];
        s.k = decayed(s, now, state.get(user).forget) + rate * (right ? 0.6 : 1) * (1 - sigmoid(s.k - 1));
        s.last = now;
      }
    }
  }
  const truth = (user, lessonId, objective, at, d = 2) => {
    const li = L.findIndex((l) => l.id === lessonId);
    const qs = Q.filter((q) => q.lesson === li && q.objectives.includes(objective));
    return qs.reduce((a, q) => a + pCorrect(state.get(user), L, li, q, at), 0) / qs.length;
  };
  return { attempts, truth, lessons: L.map((l) => l.id), users, questions: Q.map((q) => ({ ...q, lesson: L[q.lesson].id })) };
}

// skill fades towards a floor with time away, faster for learners who forget faster
function decayed(s, now, forget) {
  if (s.last == null) return s.k;
  const days = (now - s.last) / DAY;
  return -1.5 + (s.k + 1.5) * Math.exp(-forget * Math.log1p(days));
}
function pCorrect(st, L, li, q, now) {
  const s = st.know[li];
  // weak prerequisites drag the skill down: the knowledge-debt effect Gradify's graph is meant to capture
  const pre = L[li].prereq.length ? L[li].prereq.reduce((a, j) => a + Math.min(0, decayed(st.know[j], now, st.forget)), 0) / L[li].prereq.length : 0;
  const theta = st.ability + decayed(s, now, st.forget) + 0.5 * pre;
  return st.guess + (1 - st.guess - st.slip) * sigmoid(1.4 * (theta - q.b));
}
