// Specification Mastery: how well a learner can demonstrate each point of the specification they'll be examined on,
// from the evidence Gradify already has (docs/SPEC-MASTERY.md). Pure functions, no DOM, so the course page, LifeOS
// and tests share one model.
//
//   specMastery(spec, { attempts, levels, exploration, done, available, titleOf, choices, now })
//
// Nothing here knows about a board, a subject or a country: a specification is data (kit/specs/), its points name
// lessons, and the learner's choices (a tier, say) hide the point flags the specification says they hide.
//   → { points: [...], topics: [...], overall: {...} }
//
// Three things are kept apart for every point, because they answer different questions:
//   coverage     Does Gradify teach and assess it (full, partial, none)? And how much of it has the learner completed?
//   estimate     How well do the learner's own answers show they can do it? (0..1, or null: not yet assessed)
//   confidence   How much evidence is that estimate built on? (none, low, medium, high)
// Completing a lesson never raises the estimate: only answers do. A point with no answers is "Not yet assessed",
// never 0%. Nothing new is stored: every figure is worked out from the attempt records (kit/assess/attempts.js)
// through the Mastery Engine (kit/learning/mastery.js), so the model can change without migrating anyone's data.
import { evidenceFromAttempts, sixProfile, SIX } from "./mastery.js";
import { pointsOf, resolveRef, hiddenFlags, choicesFor } from "../specs/index.js";

const DAY = 864e5;

// five stages on one percentage scale; deliberately not names a subscription plan could have
export const BANDS = [
  { key: "emerging", label: "Emerging", min: 0, what: "Early evidence: most answers so far aren't right yet." },
  { key: "building", label: "Building", min: 20, what: "Some of it is there; the core ideas need more work." },
  { key: "developing", label: "Developing", min: 40, what: "About half right: the basics are forming." },
  { key: "secure", label: "Secure", min: 60, what: "Mostly right, with gaps worth closing before the exam." },
  { key: "strong", label: "Strong", min: 80, what: "Consistently right, across kinds of question and over time." },
];
export const UNASSESSED = { key: "unassessed", label: "Not yet assessed", what: "No answers on this yet, so Gradify doesn't guess." };
/** the band for an estimate, judged on the rounded percentage the learner sees, so 80% always reads Strong */
export function bandOf(v) {
  if (v == null) return UNASSESSED;
  const pct = Math.round(v * 100);
  return [...BANDS].reverse().find((b) => pct >= b.min);
}

export const CONFIDENCE = {
  none: { label: "No evidence", what: "Nothing answered on this yet." },
  low: { label: "Low confidence", what: "Only a little evidence so far: treat the figure as a first impression." },
  medium: { label: "Medium confidence", what: "A fair amount of varied evidence." },
  high: { label: "High confidence", what: "Plenty of varied evidence, over more than one day." },
};
const STALE_DAYS = 45;          // evidence older than this is still counted, but confidence in it drops a step
const DOWN = { high: "medium", medium: "low", low: "low", none: "none" };

// one entry per answer: retention and transfer entries are extra readings of an answer already counted
const answersOf = (ev) => ev.filter((e) => !e.delayed && e.dim !== "transfer");

/** How much an estimate can be trusted: amount, variety (questions, kinds of evidence, days) and recency. */
export function confidenceOf(ev, profile, now = Date.now()) {
  const own = answersOf(ev);
  const answers = own.length, questions = new Set(own.map((e) => e.question)).size;
  const days = new Set(own.map((e) => new Date(e.at).toISOString().slice(0, 10))).size;
  const kinds = profile?.measured?.length || 0, lastAt = own.reduce((m, e) => Math.max(m, e.at), 0) || null;
  const easyOnly = answers > 0 && !own.some((e) => (e.difficulty ?? 2) >= 2);
  let level = !answers ? "none" : answers >= 15 && questions >= 6 && kinds >= 3 && days >= 2 ? "high" : answers >= 6 && questions >= 3 && kinds >= 2 ? "medium" : "low";
  // easy questions alone can't show the whole of a point
  if (easyOnly && level === "high") level = "medium";
  const stale = lastAt != null && now - lastAt > STALE_DAYS * DAY;
  if (stale) level = DOWN[level];
  return { level, answers, questions, days, kinds, lastAt, stale, easyOnly };
}

/** a sentence saying what the confidence rests on */
export function basisText(c) {
  if (c.level === "none") return "No answers on this yet.";
  const s = (n, w) => `${n} ${w}${n === 1 ? "" : "s"}`;
  return `Based on ${s(c.answers, "answer")} to ${s(c.questions, "different question")}${c.days > 1 ? ` over ${c.days} days` : ", all on one day"}${c.easyOnly ? ", all of them easier questions" : ""}${c.stale ? `. The latest is over ${STALE_DAYS} days old, so it may have faded` : ""}.`;
}

// the learner's own answers for one lesson inside a point: how they're doing and how steady it is
function lessonReading(ev) {
  const own = answersOf(ev).filter((e) => e.independent).sort((a, b) => a.at - b.at);
  if (!own.length) return { n: 0, state: "unanswered" };
  const latestByQ = new Map(); for (const e of own) latestByQ.set(e.question, e.score);
  const latest = [...latestByQ.values()].reduce((a, b) => a + b, 0) / latestByQ.size;
  const recent = own.slice(-6).map((e) => e.score);
  const right = recent.filter((s) => s >= 0.7).length, wrong = recent.filter((s) => s < 0.5).length;
  const mixed = recent.length >= 3 && right >= 1 && wrong >= 1 && Math.min(right, wrong) / recent.length >= 0.25;
  const state = own.length < 2 ? "thin" : latest < 0.5 ? "weak" : mixed ? "inconsistent" : latest >= 0.75 ? "strong" : "ok";
  return { n: own.length, latest, mixed, state };
}

// weekly mean of unaided answers over the last eight weeks, oldest first (null where there were none)
function weeklySeries(ev, now, weeks = 8) {
  const own = answersOf(ev).filter((e) => e.independent), out = Array(weeks).fill(null);
  for (let w = 0; w < weeks; w++) {
    const to = now - (weeks - 1 - w) * 7 * DAY, from = to - 7 * DAY, xs = own.filter((e) => e.at > from && e.at <= to);
    if (xs.length) out[w] = xs.reduce((a, e) => a + e.score, 0) / xs.length;
  }
  return out;
}

const LABEL = Object.fromEntries(SIX.map((d) => [d.key, d.label.toLowerCase()]));
const list = (xs) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs.at(-1)}`);

// what the learner can show, where they're struggling, and one plain next step
function readingOf(point, byLesson, profile, conf, titleOf) {
  const strong = [], shaky = [], weak = [], unanswered = [];
  for (const [id, r] of byLesson) (r.state === "strong" ? strong : r.state === "inconsistent" ? shaky : r.state === "weak" ? weak : r.state === "unanswered" ? unanswered : []).push(id);
  const name = (ids) => list(ids.slice(0, 2).map((id) => titleOf(id)));
  const can = [], struggle = [];
  if (strong.length) can.push(`Answers on ${name(strong)} are consistently right.`);
  for (const d of SIX) { const v = profile.dims[d.key]; if (v.certainty !== "none" && v.certainty !== "insufficient" && v.value >= 0.75) can.push(`${d.label}: ${Math.round(v.value * 100)}%. ${d.what}.`); }
  if (shaky.length) struggle.push(`Answers on ${name(shaky)} are inconsistent: right one time, wrong the next.`);
  if (weak.length) struggle.push(`Most answers on ${name(weak)} aren't right yet.`);
  const wk = profile.weakest && profile.dims[profile.weakest];
  if (wk && wk.value < 0.6) struggle.push(`Your weakest kind of evidence here is ${LABEL[profile.weakest]} (${Math.round(wk.value * 100)}%).`);
  if (profile.calibration?.sureWrong) struggle.push(`${profile.calibration.sureWrong} ${profile.calibration.sureWrong === 1 ? "answer" : "answers"} you were sure of ${profile.calibration.sureWrong === 1 ? "was" : "were"} wrong: worth checking before it sets in.`);
  // the next step: the one sentence the page leads with
  let next;
  if (conf.level === "none") next = unanswered.length ? `Gradify hasn't seen you answer anything on this yet. Start with ${titleOf(unanswered[0])} and its check questions.` : "Gradify doesn't teach this point yet, so it can't measure it. Use your class notes and the specification.";
  else if (strong.length && (shaky.length || weak.length)) next = `You're confident on ${name(strong)}, but your answers on ${name([...shaky, ...weak])} are ${shaky.length ? "inconsistent" : "mostly wrong so far"}. Practise that area to strengthen this point.`;
  else if (shaky.length || weak.length) next = `Your answers on ${name([...shaky, ...weak])} ${shaky.length ? "are inconsistent" : "aren't right yet"}. Reread it, then practise a few questions.`;
  else if (conf.level === "low") next = `A good start, but there isn't much evidence yet. ${unanswered.length ? `Try the questions on ${titleOf(unanswered[0])} too.` : "A few more questions will make this figure firmer."}`;
  else if (conf.stale) next = "You knew this, but it was a while ago. A short practice now checks it's still there.";
  else if (unanswered.length) next = `Strong where you've answered. ${titleOf(unanswered[0])} hasn't been tested yet.`;
  else next = "You're doing well on this point. Revisit it in a week or two to keep it fresh.";
  return { can, struggle, next, strong, shaky, weak, unanswered };
}

/** The whole specification, measured. */
// a lesson's evidence is keyed by course and lesson, since lesson ids repeat across courses ("u02-20" is in every one)
const keyOf = (course, lesson) => `${course}:${lesson}`;

/**
 * The whole specification, measured.
 *   attempts   attempt records from any course (each carries its course as `subject`)
 *   done       { lessonRef: true } lessons completed; available(ref) whether Gradify teaches it; titleOf(ref)
 *   choices    the learner's options, e.g. { tier: "foundation" }; each option's first choice is the default
 */
export function specMastery(spec, { attempts = [], levels = null, exploration = null, done = {}, available = () => true, titleOf = (id) => id, choices = {}, now = Date.now() } = {}) {
  const ev = evidenceFromAttempts(attempts, { levels, exploration }).filter((e) => e.at <= now);
  const byLesson = new Map();
  for (const e of ev) { if (!e.topic) continue; const k = keyOf(e.subject || spec.course, e.topic); (byLesson.get(k) || byLesson.set(k, []).get(k)).push(e); }
  const evOf = (ref) => { const r = resolveRef(spec, ref); return byLesson.get(keyOf(r.course, r.lesson)) || []; };
  const hidden = hiddenFlags(spec, choices);
  const pts = pointsOf(spec).filter((p) => !p.flags.some((f) => hidden.has(f)));
  const points = pts.map((p) => {
    const full = p.lessons.filter(available), part = p.partial.filter(available), ids = [...full, ...part];
    const pev = ids.flatMap(evOf);
    const profile = sixProfile(pev, { now }), conf = confidenceOf(pev, profile, now);
    // a measurement once the Mastery Engine reports one; before that, a provisional estimate from what there is
    let estimate = profile.mastery, provisional = false;
    if (estimate == null && conf.answers) {
      const ds = SIX.map((d) => profile.dims[d.key]).filter((d) => d.value != null);
      estimate = ds.reduce((a, d) => a + d.value * d.n, 0) / ds.reduce((a, d) => a + d.n, 0); provisional = true;
    }
    const readings = new Map(ids.map((id) => [id, lessonReading(evOf(id))]));
    const r = readingOf(p, readings, profile, conf, titleOf);
    const series = weeklySeries(pev, now), t = profile.trend;
    const trend = !t ? null : t.declining ? "slipping" : t.recent - t.earlier >= 0.15 ? "improving" : "steady";
    // what to practise: the shakiest lessons first, then ones not yet tested, then the rest from weakest up
    const rank = { weak: 0, inconsistent: 1, thin: 2, unanswered: 3, ok: 4, strong: 5 };
    const practise = ids.slice().sort((a, b) => rank[readings.get(a).state] - rank[readings.get(b).state] || (readings.get(a).latest ?? 1) - (readings.get(b).latest ?? 1)).slice(0, 3);
    return {
      ...p, lessons: full, partial: part,
      // gradify: full, partial, none, or unchecked (a generated view: nothing taught, some statements not checked yet);
      // evidence: "verified" (a named person) or "ai-mapped" (an AI reviewer), from the mapping store
      coverage: { gradify: p.state && !(full.length || part.length) ? (p.state === "none" ? "none" : "unchecked") : full.length ? "full" : part.length ? "partial" : "none", evidence: p.evidence ?? null, done: ids.filter((id) => done[id]).length, total: ids.length, ids, doneIds: ids.filter((id) => done[id]) },
      estimate, provisional, band: bandOf(estimate), confidence: conf, profile, trend, series,
      byLesson: Object.fromEntries(readings), can: r.can, struggle: r.struggle, next: r.next,
      practise, focus: ["apply", "transfer"].includes(profile.weakest) ? "application" : "mixed",
    };
  });
  return { spec, choices: choicesFor(spec, choices), points, topics: spec.topics.map((t) => topicOf(t, points.filter((p) => p.topic.id === t.id))).filter((t) => t.total), overall: overallOf(points) };
}

const WEIGHT = { none: 0, low: 1, medium: 2, high: 3 };
// an average over assessed points only, weighted by how much each estimate can be trusted
function combine(points) {
  const a = points.filter((p) => p.estimate != null), w = a.reduce((s, p) => s + WEIGHT[p.confidence.level], 0);
  // an average of early estimates only is itself an early estimate
  return { assessed: a.length, estimate: a.length ? a.reduce((s, p) => s + p.estimate * WEIGHT[p.confidence.level], 0) / w : null, provisional: a.length > 0 && a.every((p) => p.provisional) };
}

function topicOf(t, points) {
  const { assessed, estimate, provisional } = combine(points), band = bandOf(estimate);
  // points to work on: still emerging or building, or slipping. Named next to the topic's standing, never instead of it
  const toWork = points.filter((p) => (p.estimate != null && ["emerging", "building"].includes(p.band.key)) || p.trend === "slipping").length;
  const base = !assessed ? "Not yet assessed" : assessed < points.length / 2 ? "Partly assessed" : `${band.label} overall`;
  const status = toWork ? `${base} · ${toWork} to work on` : base;
  return { id: t.id, title: t.title, points, total: points.length, assessed, estimate, provisional, band, status, attention: toWork > 0, toWork };
}

function overallOf(points) {
  const { assessed, estimate, provisional } = combine(points);
  const bands = Object.fromEntries([...BANDS, UNASSESSED].map((b) => [b.key, points.filter((p) => p.band.key === b.key).length]));
  const covered = points.filter((p) => ["full", "partial"].includes(p.coverage.gradify)).length, full = points.filter((p) => p.coverage.gradify === "full").length;
  // what the coverage rests on: verified by a person, mapped by an AI reviewer only, or not checked yet
  const evidence = { verified: points.filter((p) => p.coverage.evidence === "verified").length, aiMapped: points.filter((p) => p.coverage.evidence === "ai-mapped").length, unchecked: points.filter((p) => p.coverage.gradify === "unchecked").length };
  // taught, by what it rests on: only a person's verification counts as taught; a provisional mapping is counted apart
  const taughtBy = (ev) => points.filter((p) => p.coverage.evidence === ev && ["full", "partial"].includes(p.coverage.gradify));
  const taught = { verified: taughtBy("verified").length, verifiedPart: taughtBy("verified").filter((p) => p.coverage.gradify === "partial").length, provisional: taughtBy("ai-mapped").length };
  const share = points.length ? assessed / points.length : 0;
  const firm = points.filter((p) => ["medium", "high"].includes(p.confidence.level)).length;
  // the headline is only as trustworthy as the share of the specification behind it
  const level = !assessed ? "none" : share >= 0.6 && firm >= assessed / 2 ? "high" : share >= 0.25 ? "medium" : "low";
  // one lesson can teach several requirements: the totals count each lesson once
  const mapped = new Set(points.flatMap((p) => p.coverage.ids)), doneIds = new Set(points.flatMap((p) => p.coverage.doneIds));
  return { total: points.length, covered, full, evidence, taught, assessed, firm, measured: points.filter((p) => p.estimate != null && !p.provisional).length, estimate, provisional, band: bandOf(estimate), bands, confidence: level,
    slipping: points.filter((p) => p.trend === "slipping").length,
    lessonsDone: doneIds.size, lessonsMapped: mapped.size };
}

/** the points most worth practising next: weakest assessed points first, slipping ones raised, thin evidence last */
export function weakestPoints(model, n = 3) {
  const score = (p) => p.estimate + (p.trend === "slipping" ? -0.2 : 0) + (p.confidence.level === "low" ? 0.05 : 0);
  return model.points.filter((p) => p.estimate != null && p.band.key !== "strong").sort((a, b) => score(a) - score(b)).slice(0, n);
}
