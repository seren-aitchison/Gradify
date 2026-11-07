// The achievement registry. An achievement is data plus a progress function over the learner's stats, so pages never
// hardcode them and new ones (a subject's own, a season's) are one registerAchievement call. Progress is computed
// from evidence every time, so it can't drift; unlocking pays the XP once (key "ach:<id>", engine.claim).
import { evidenceFromAttempts, sixProfile } from "../learning/mastery.js";

export const ACHIEVEMENTS = [];
export function registerAchievement(a) {
  if (!a?.id || !a.name || !a.d || typeof a.progress !== "function") throw new Error("an achievement needs id, name, d and progress()");
  if (ACHIEVEMENTS.some((x) => x.id === a.id)) throw new Error(`achievement ${a.id} is already registered`);
  ACHIEVEMENTS.push({ xp: 0, icon: "award", tier: "bronze", group: "General", ...a });
}

// the stats achievements read, computed once from the game state
export function statsOf(state) {
  const { courses, events, habits: H, game } = state;
  const lessons = courses.reduce((a, c) => a + Object.keys(c.S?.done || {}).length, 0);
  const unitsTouched = courses.reduce((a, c) => a + (c.units || []).filter((u) => u.lessons.some((l) => c.S?.done?.[l.id])).length, 0);
  const unitsDone = courses.reduce((a, c) => a + (c.units || []).filter((u) => u.lessons.length && u.lessons.every((l) => c.S?.done?.[l.id])).length, 0);
  const perfect = courses.some((c) => Object.values(c.S?.quiz || {}).some((q) => q?.best === 1)) || events.some((e) => e.k === "quiz" && e.xp >= 70);
  const labs = new Set(events.filter((e) => e.k === "practice").map((e) => `${e.course}:${e.id}`)).size;
  // deep focus: 60 XP or more inside one hour
  let focus = 0; const ev = events.filter((e) => e.xp > 0);
  for (let i = 0, j = 0, sum = 0; j < ev.length; j++) { sum += ev[j].xp; while (ev[j].t - ev[i].t > 3600e3) sum -= ev[i++].xp; focus = Math.max(focus, sum); }
  // per-lesson evidence: mastery and comebacks, from each course's attempts
  let mastered = 0, comebacks = 0;
  for (const c of courses) {
    const byLesson = new Map();
    for (const a of c.S?.attempts || []) if (a.lesson) (byLesson.get(a.lesson) || byLesson.set(a.lesson, []).get(a.lesson)).push(a);
    for (const A of byLesson.values()) {
      const p = sixProfile(evidenceFromAttempts(A, { levels: c.levels || null }), { now: state.now });
      if (p.mastery != null && p.mastery >= 0.85) mastered++;
      // a comeback: three or more early answers mostly wrong, then three or more later answers mostly right
      const s = A.slice().sort((a, b) => Date.parse(a.at) - Date.parse(b.at)).map((a) => a.score);
      if (s.length >= 6) { const k = Math.floor(s.length / 2), mean = (x) => x.reduce((p, q) => p + q, 0) / x.length; if (mean(s.slice(0, k)) < 0.5 && mean(s.slice(k)) >= 0.8) comebacks++; }
    }
  }
  const quests = Object.keys(game.paid || {}).filter((k) => k.startsWith("quest:")).length;
  const challenges = Object.keys(game.paid || {}).filter((k) => k.startsWith("challenge:")).length;
  const subjects = courses.filter((c) => (c.S?.log || []).some((e) => e.xp > 0)).length;
  return { xp: state.xp, level: state.level.n, lessons, unitsTouched, unitsDone, perfect, labs, focus, mastered, comebacks, best: H.best, consistentWeeks: H.consistentWeeks, quests, challenges, subjects, days: H.calendar.size };
}

const n = (key, of) => (s) => ({ n: Math.min(of, Number(s[key]) || 0), of });
const flag = (key) => (s) => ({ n: s[key] ? 1 : 0, of: 1 });
[
  ["first-steps", "First Steps", "Complete your first lesson.", n("lessons", 1), 10, "flag", "bronze", "Learning"],
  ["curious-mind", "Curious Mind", "Explore five different schools or modules.", n("unitsTouched", 5), 30, "sparkles", "bronze", "Learning"],
  ["scholar", "Scholar", "Complete every lesson in a school.", n("unitsDone", 1), 50, "cap", "silver", "Learning"],
  ["polymath", "Polymath", "Earn XP in two different subjects.", n("subjects", 2), 40, "layers", "silver", "Learning"],
  ["centurion", "Centurion", "Complete 100 lessons.", n("lessons", 100), 150, "book", "gold", "Learning"],
  ["consistency", "Consistency", "Reach a seven-day learning streak.", n("best", 7), 50, "flame", "silver", "Habits"],
  ["steady-month", "Steady Month", "Have four weeks with study on three or more days.", n("consistentWeeks", 4), 80, "calendar", "gold", "Habits"],
  ["deep-focus", "Deep Focus", "Earn 60 XP inside one hour.", n("focus", 60), 30, "clock", "bronze", "Habits"],
  ["perfectionist", "Perfectionist", "Score full marks in a quiz.", flag("perfect"), 40, "star", "silver", "Mastery"],
  ["mastery", "Mastery", "Show strong understanding of a lesson across several kinds of evidence.", n("mastered", 1), 50, "award", "silver", "Mastery"],
  ["comeback", "Comeback", "Turn a topic you were getting wrong into one you get right.", n("comebacks", 1), 60, "trend", "gold", "Mastery"],
  ["explorer", "Explorer", "Complete five interactive challenges.", n("labs", 5), 40, "globe", "silver", "Mastery"],
  ["quester", "Quest Taker", "Complete ten quests.", n("quests", 10), 50, "checklist", "silver", "Habits"],
  ["challenger", "Challenger", "Finish your first daily challenge.", n("challenges", 1), 20, "target", "bronze", "Habits"],
  ["xp-1000", "1,000 XP", "Earn 1,000 XP across Gradify.", n("xp", 1000), 0, "bolt", "silver", "Milestones"],
  ["xp-5000", "5,000 XP", "Earn 5,000 XP across Gradify.", n("xp", 5000), 0, "bolt", "gold", "Milestones"],
  ["level-10", "Adept", "Reach overall level 10.", n("level", 10), 0, "trophy", "gold", "Milestones"],
].forEach(([id, name, d, progress, xp, icon, tier, group]) => registerAchievement({ id, name, d, progress, xp, icon, tier, group }));

// every achievement with its progress; unlocked ones carry a reward key for engine.claim
export function achievements(state) {
  const s = statsOf(state);
  return ACHIEVEMENTS.map((a) => { const p = a.progress(s); return { ...a, ...p, done: p.n >= p.of, key: `ach:${a.id}`, paid: !!state.game.paid?.[`ach:${a.id}`], title: `Achievement: ${a.name}` }; });
}
// the locked achievement closest to unlocking, for "next achievement"
export function nextAchievement(list) {
  return list.filter((a) => !a.done && a.n > 0).sort((a, b) => b.n / b.of - a.n / a.of)[0] || list.find((a) => !a.done) || null;
}
