// One learner's real data across every Gradify site, in one shape, for LifeOS, its Tree and the subject
// Earth maps. Everything here is worked out from records that already exist; nothing new is stored:
//   courses   each course's progress object (kit/course/course.js: done, cards, attempts), on this device
//             (localStorage gradify.course.<slug>) or in the account (course_progress)
//   activity  the shared activity log every site writes to (store.logActivity): the life heatmap and the Tree
//   decks     the app's flashcard decks, with their Mastery Engine profiles
//   profile   the shared learner profile (kit/data/profile.js)
// The pure functions take that data as arguments, so Node tests them; loadLearner() gathers it in a browser.
import { evidenceFromAttempts, sixProfiles, revisionQueue, topicProfiles } from "./mastery.js";
import { weaknessTargets } from "./targets.js";
import { conceptGraph } from "./concepts.js";
import { isDue } from "./srs.js";
import { paceFor } from "./pace.js";

const DAY = 864e5;
// every course, where its pages live (tests/learner-data.test.mjs checks this matches kit/courses/)
export const COURSES = {
  physics: "/scigradify/physics/", biology: "/scigradify/biology/", chemistry: "/scigradify/chemistry/",
  law: "/lawgradify/course/", nursing: "/nursegradify/course/", pharmacy: "/pharmagradify/course/",
  psychology: "/psychgradify/course/", sociology: "/socgradify/course/", maths: "/mathgradify/course/", history: "/historygradify/course/",
  // courses made with scripts/new-course.mjs (mass production, docs/SITE-PRODUCTION.md); listed before their files land
  ecology: "/ecogradify/course/", business: "/businessgradify/course/", finance: "/financegradify/course/",
  medicine: "/medgradify/course/", literature: "/litgradify/course/", music: "/musicgradify/course/",
  health: "/healthgradify/course/", engineering: "/engineergradify/course/", investing: "/investorgradify/course/",
  veterinary: "/vetgradify/course/", dentistry: "/dentalgradify/course/", art: "/artgradify/course/",
  sport: "/sportgradify/course/", teaching: "/edugradify/course/", university: "/undergradify/course/",
  research: "/postgradify/course/", professional: "/progradify/course/", careers: "/internshipgradify/course/",
  design: "/creategradify/course/", spanish: "/languagegradify/course/", gcse: "/youthgradify/course/",
  primary: "/juniorgradify/course/", computing: "/techgradify/course/",
  french: "/languagegradify/french/", german: "/languagegradify/german/", italian: "/languagegradify/italian/", dutch: "/languagegradify/dutch/",
  swedish: "/languagegradify/swedish/", japanese: "/languagegradify/japanese/", mandarin: "/languagegradify/mandarin/",
};
const dayKey = (t) => { const d = new Date(t); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };

// ---------- activity: the life heatmap and the Tree ----------
// activity rows { at, site, xp } → one entry per day for the last `weeks` weeks, Monday first, with counts by site
export function activityDays(activity = [], { now = Date.now(), weeks = 52 } = {}) {
  const today = new Date(now); today.setHours(0, 0, 0, 0);
  const start = new Date(+today - weeks * 7 * DAY); start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
  const by = new Map();
  for (const a of activity) { const k = dayKey(Date.parse(a.at)); const c = by.get(k) || {}; c[a.site || "Gradify"] = (c[a.site || "Gradify"] || 0) + 1; by.set(k, c); }
  const out = [];
  for (let d = new Date(start); d <= today; d = new Date(+d + DAY)) out.push({ date: d, key: dayKey(+d), counts: by.get(dayKey(+d)) || {} });
  return out;
}
// the current streak counts today if there's activity, otherwise up to yesterday (today isn't over yet)
export function streakOf(days) {
  let n = 0, i = days.length - 1;
  if (i >= 0 && !Object.keys(days[i].counts).length) i--;
  for (; i >= 0 && Object.keys(days[i].counts).length; i--) n++;
  let best = 0, run = 0; for (const d of days) { run = Object.keys(d.counts).length ? run + 1 : 0; best = Math.max(best, run); }
  return { n, best, today: Boolean(days.length && Object.keys(days.at(-1).counts).length) };
}

// ---------- courses ----------
/** A course's summary from its config (kit/courses/<slug>/course.js) and the learner's progress object. */
export function courseSummary(cfg, S = {}, { now = Date.now(), profile = null } = {}) {
  const written = (u) => !cfg.written || cfg.written.includes(u.id);
  const lessons = cfg.units.flatMap((u) => u.lessons.map((l) => ({ ...l, unit: u })));
  const done = lessons.filter((l) => S.done?.[l.id]).length;
  const attempts = S.attempts || [];
  // exploration challenges (cfg.exploration) earn XP but are never mastery evidence (kit/learning/evidence-class.js)
  const ev = evidenceFromAttempts(attempts, { levels: cfg.levels || null, exploration: cfg.exploration || null });
  const { all, groups } = sixProfiles(ev, { by: (e) => e.unit, now });
  const revisit = revisionQueue(attempts, { now, limit: 1000 });
  // measured weak spots (kit/learning/targets.js), foundations first where the course has a concept graph
  const weak = attempts.length ? weaknessTargets(attempts, { exploration: cfg.exploration || null, levels: cfg.levels || null, graph: cfg.concepts ? conceptGraph(cfg.units, cfg.concepts) : null, now, limit: 5 }) : [];
  const titleOf = (id) => lessons.find((l) => l.id === id)?.title || id;
  const dueCards = Object.values(S.cards || {}).filter((st) => st?.due_at && isDue(st, now)).length;
  const times = [...(S.log || []).map((r) => r.t), ...attempts.map((a) => Date.parse(a.at)), ...Object.values(S.done || {}).map(Number)].filter(Number.isFinite);
  const lastAt = times.length ? Math.max(...times) : null;
  const next = lessons.find((l) => written(l.unit) && !S.done?.[l.id]) || null;
  const remaining = lessons.filter((l) => written(l.unit) && !S.done?.[l.id]).length;
  const examDate = profile?.site === cfg.site ? profile?.exam_date || null : null;
  const prior = profile?.learner?.prior?.[cfg.site] || "new";
  const pace = paceFor({ examDate, dailyMinutes: profile?.daily_minutes || 20, remaining, dueCards, dueQuestions: revisit.length, prior, now });
  const schools = cfg.units.map((u) => {
    const g = groups.find((x) => x.key === u.id) || null, d = u.lessons.filter((l) => S.done?.[l.id]).length;
    const t = [...(S.log || []).filter((r) => u.lessons.some((l) => l.id === r.id)).map((r) => r.t), ...attempts.filter((a) => a.unit === u.id).map((a) => Date.parse(a.at))];
    return { id: u.id, n: u.n, title: u.title, done: d, total: u.lessons.length, profile: g, lastAt: t.length ? Math.max(...t) : null, sureWrong: g?.calibration?.sureWrong || 0,
      text: [u.title, ...(u.modules || []).map((m) => m.title || m), ...u.lessons.map((l) => l.title)].join(" ") };
  }).filter((s) => s.done || s.profile);
  return { slug: cfg.slug, site: cfg.site, name: cfg.name, href: COURSES[cfg.slug] || null, total: lessons.length, written: lessons.filter((l) => written(l.unit)).length,
    done, remaining, lastAt, six: all, schools, revisit: revisit.length, dueCards, cards: Object.keys(S.cards || {}).length, pace, examDate, next: next && { id: next.id, title: next.title },
    weak: weak.map((t) => ({ lesson: t.lesson, title: titleOf(t.lesson), kind: t.kind, why: t.why, for: t.for ? titleOf(t.for) : null })),
    started: Boolean(done || attempts.length || Object.keys(S.cards || {}).length) };
}

// a course school on a subject Earth map, in the shape the map uses for a deck topic (kit/earth/subject-map.js)
export function schoolTopic(course, s, now = Date.now()) {
  const p = s.profile, d = (k) => ({ value: p?.dims[k]?.certainty && !["none", "insufficient"].includes(p.dims[k].certainty) ? p.dims[k].value : null });
  const coverage = s.total ? s.done / s.total : 0;
  const recentDays = s.lastAt ? (now - s.lastAt) / DAY : null;
  const retention = d("retention").value;
  const level = s.sureWrong >= 2 ? "shaky" : (retention != null && retention < 0.6) || p?.trend?.declining ? "fading" : p?.mastery != null && p.mastery >= 0.85 && coverage >= 0.9 ? "mastered" : coverage || p ? "learning" : "new";
  return {
    key: `course:${course.slug}:${s.id}`, topic: `${s.title}`, course: true, href: `${course.href || ""}#/learn/${s.id}`,
    level, mastery: p?.mastery ?? coverage * 0.5, coverage, lastSeen: s.lastAt, dims: { recall: d("recall"), explain: d("explain"), apply: d("apply"), retention: d("retention") },
    misconceptions: Array.from({ length: s.sureWrong }), text: s.text,
    next: { kind: "course", label: s.done < s.total ? "Continue this school" : "Revisit it", why: `${s.done} of ${s.total} lessons done in ${course.name}${p?.mastery != null ? `, ${Math.round(p.mastery * 100)}% mastery` : p ? ", not enough evidence for a mastery figure yet" : ""}.`, mins: 0 },
    recentDays,
  };
}

// ---------- what next, across everything ----------
// a short ranked list, each with the reason, from real data only
export function recommend(courses = [], decks = [], { limit = 6 } = {}) {
  const out = [];
  for (const c of courses.filter((x) => x.started)) {
    const at = (h) => `${c.href || ""}${h}`;
    const sureWrong = c.six.calibration?.sureWrong || 0;
    if (sureWrong) out.push({ p: 0.95, site: c.site, label: `Check ${sureWrong} confident ${sureWrong === 1 ? "mistake" : "mistakes"} in ${c.name}`, why: "You were sure about these and got them wrong. Fixing a misunderstanding early stops it spreading.", href: at("#/me") });
    if (c.revisit) out.push({ p: 0.8 + Math.min(0.1, c.revisit / 200), site: c.site, label: `Revisit ${c.revisit} ${c.name} ${c.revisit === 1 ? "question" : "questions"}`, why: "Due for spaced retrieval: answering them now, as they start to fade, is what makes them last.", href: at("#/review/questions") });
    if (c.weak?.length) { const t = c.weak[0]; out.push({ p: t.kind === "foundation" ? 0.78 : 0.74, site: c.site, label: `Target ${c.weak.length} weak ${c.weak.length === 1 ? "spot" : "spots"} in ${c.name}`, why: t.kind === "foundation" && t.for ? `Start with ${t.title}: it underpins ${t.for}, and your answers show both are weak.` : `${t.title}: ${t.why}`, href: at("#/review/weak") }); }
    if (c.dueCards) out.push({ p: 0.7 + Math.min(0.1, c.dueCards / 300), site: c.site, label: `Review ${c.dueCards} ${c.name} ${c.dueCards === 1 ? "flashcard" : "flashcards"}`, why: "These cards are due today.", href: at("#/review") });
    if (c.next) out.push({ p: 0.5 + ({ behind: 0.3, tight: 0.15 }[c.pace.status] || 0), site: c.site, label: `Continue ${c.name}: ${c.next.title}`, why: c.pace.status === "behind" || c.pace.status === "tight" ? `Your exam pace is ${c.pace.status}: about ${Math.round(c.pace.needPerDay * 10) / 10} lessons a day are needed.` : `${c.done} of ${c.total} lessons done.`, href: at(`#/lesson/${c.next.id}`) });
  }
  for (const t of decks) {
    if (t.level === "shaky" || t.level === "fading") out.push({ p: t.level === "shaky" ? 0.85 : 0.65, site: null, label: `${t.next.label}: ${t.topic}`, why: t.next.why, href: `/app.html#/topic/${encodeURIComponent(t.key)}` });
    else if (t.due) out.push({ p: 0.6, site: null, label: `Review ${t.due} cards: ${t.topic}`, why: "Due from your own notes.", href: `/app.html#/study/t:${encodeURIComponent(t.key)}` });
  }
  return out.sort((a, b) => b.p - a.p).slice(0, limit);
}

// ---------- gather it in a browser ----------
// `store`: a page that already has the learner's store (the app) passes it, so no second connection is opened
export async function loadLearner({ now = Date.now(), store = null } = {}) {
  const { learnerOf } = await import("../data/profile.js");
  if (!store) {
    const { LocalStore, CloudStore } = await import("../data/store.js");
    store = new LocalStore();
    try { const cloud = await CloudStore.create(); if (cloud && (await cloud.user())) store = cloud; } catch { /* this device */ }
  }
  const [p, activity, cards, reviews] = await Promise.all([store.getProfile().catch(() => ({})), store.listActivity(400).catch(() => []), store.listCards().catch(() => []), store.listReviews(400).catch(() => [])]);
  const profile = { ...p, learner: learnerOf(p) };
  // course progress: this device's copy, and the account's for courses not opened on this device yet
  const { courseStates } = await import("./course-states.js");
  const states = await courseStates(store);
  const courses = [];
  for (const [slug, S] of Object.entries(states)) {
    try { courses.push(courseSummary((await import(`../courses/${slug}/course.js`)).default, S, { now, profile })); } catch (e) { console.warn(`Couldn't read ${slug} progress`, e); }
  }
  const decks = topicProfiles(cards.filter((c) => !c.suspended), reviews, { now, examDate: profile.exam_date || null });
  const days = activityDays(activity, { now });
  const started = courses.filter((c) => c.started);
  return { mode: store.mode, profile, courses: started, decks, days, streak: streakOf(days), xp: profile.xp || activity.reduce((a, x) => a + (x.xp || 0), 0),
    hasData: Boolean(started.length || decks.length || activity.length), next: recommend(started, decks) };
}
