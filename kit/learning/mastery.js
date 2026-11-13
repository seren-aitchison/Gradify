// The Mastery Engine: a living profile for every topic, built only from evidence the learner
// has produced (their answers, how sure they were, and when they last saw each card), and a
// ranked answer to "what should I practise next, and why?". No browser APIs, so Node can test it.
import { evidenceClass, explorationIds, EVIDENCE_CLASSES } from "./evidence-class.js";
import { recallNow } from "./srs.js";
const DAY = 864e5;

// What each card type is evidence of. Recall-style cards test remembering; "why" cards test
// explaining. Application has no card type yet, so it reports "no evidence" rather than guessing.
const DIMENSION_OF_KIND = { definition: "recall", cloze: "recall", reverse: "recall", why: "explain", apply: "apply" };
export const DIMENSIONS = [
  { key: "recall", label: "Recall", what: "Remembering facts and terms when asked" },
  { key: "explain", label: "Explanation", what: "Explaining why and how, in your own words" },
  { key: "apply", label: "Application", what: "Using it on problems you haven't seen" },
  { key: "confidence", label: "Confidence", what: "How sure you felt, and whether that was right" },
  { key: "retention", label: "Retention", what: "How much you'd remember if tested right now" },
];
const SCORE = { again: 0, hard: 0.6, good: 1, easy: 1 };
const SURE = { sure: 1, unsure: 0.5, guess: 0 };
const HALF_LIFE_DAYS = 30; // older answers count for less

export const LEVELS = {
  new: { label: "Not started", note: "You haven't answered any of this topic's cards yet." },
  learning: { label: "Learning", note: "Evidence is coming in. Keep going." },
  fading: { label: "Fading", note: "You knew this, but it's slipping. A short review now brings it back." },
  shaky: { label: "Misconception risk", note: "You felt sure about answers you got wrong. Worth checking before it sets in." },
  strong: { label: "Strong", note: "Good recall and retention. A little more evidence and it's mastered." },
  mastered: { label: "Mastered", note: "Strong on every kind of evidence you've shown so far." },
};

// The chance of recalling a card right now, from its FSRS memory model (kit/learning/srs.js): retrievability falls
// along a power curve from the last review, at a pace set by the card's stability. A card just answered wrong reads 30%.
export function recallProbability(card, now = Date.now()) {
  if (!card.reps) return null;
  if (card.last_rating === "again") return 0.3;
  return recallNow(card, now);
}

// Weighted average with a gentle pull towards 50% while evidence is thin, so one lucky answer
// doesn't read as mastery.
function weighted(items) {
  if (!items.length) return null;
  let sw = 0, sv = 0;
  for (const { v, w } of items) { sw += w; sv += v * w; }
  return (sv + 0.5 * 0.5) / (sw + 0.5);
}

/**
 * Build a mastery profile for every topic.
 * @param {object[]} cards  cards with topic, kind, document_id and spaced-repetition state
 * @param {object[]} reviews  answers: { card_id, rating, confidence?, reviewed_at }
 * @param {{ now?: number, examDate?: string|null }} [opts]
 */
export function topicProfiles(cards, reviews, { now = Date.now(), examDate = null } = {}) {
  const byCard = new Map();
  for (const r of reviews) (byCard.get(r.card_id) || byCard.set(r.card_id, []).get(r.card_id)).push(r);
  const groups = new Map();
  for (const c of cards) {
    if (c.suspended) continue;
    const key = `${c.document_id}|${c.topic || "Cards"}`;
    if (!groups.has(key)) groups.set(key, { key, documentId: c.document_id, topic: c.topic || "Cards", cards: [] });
    groups.get(key).cards.push(c);
  }
  const examDays = examDate ? Math.ceil((new Date(examDate).getTime() - now) / DAY) : null;
  return [...groups.values()].map((g) => profileOf(g, byCard, now, examDays)).sort((a, b) => b.priority - a.priority);
}

function profileOf(g, byCard, now, examDays) {
  const ev = { recall: [], explain: [], apply: [], confidence: [] };
  const misconceptions = [];   // cards answered wrong while feeling sure
  let underconfident = 0, lastSeen = 0;
  for (const c of g.cards) {
    const dim = DIMENSION_OF_KIND[c.kind] || "recall";
    for (const r of byCard.get(c.id) || []) {
      const t = new Date(r.reviewed_at).getTime();
      lastSeen = Math.max(lastSeen, t);
      const w = Math.pow(0.5, (now - t) / DAY / HALF_LIFE_DAYS);
      const v = SCORE[r.rating] ?? 0;
      ev[dim].push({ v, w });
      if (r.confidence in SURE) {
        ev.confidence.push({ v: SURE[r.confidence], w });
        // a recent confident wrong answer is the clearest sign of a misconception
        if (r.confidence === "sure" && r.rating === "again" && now - t < 21 * DAY && !misconceptions.includes(c)) misconceptions.push(c);
        if (r.confidence !== "sure" && v >= 1) underconfident++;
      }
    }
    // a confident wrong answer stops counting once the card is answered well at least 12 hours
    // later: getting it right minutes after seeing the answer doesn't show the idea has changed
    const wrongAt = (byCard.get(c.id) || []).filter((r) => r.confidence === "sure" && r.rating === "again").map((r) => new Date(r.reviewed_at).getTime());
    if (misconceptions.includes(c) && (byCard.get(c.id) || []).some((r) => r.rating !== "again" && new Date(r.reviewed_at).getTime() >= Math.max(...wrongAt) + 12 * 36e5)) misconceptions.splice(misconceptions.indexOf(c), 1);
  }
  const seen = g.cards.filter((c) => c.reps > 0);
  const probs = seen.map((c) => recallProbability(c, now));
  const retention = probs.length ? probs.reduce((a, b) => a + b, 0) / probs.length : null;
  const dims = {
    recall: { value: weighted(ev.recall), n: ev.recall.length },
    explain: { value: weighted(ev.explain), n: ev.explain.length },
    apply: { value: weighted(ev.apply), n: ev.apply.length },
    confidence: { value: ev.confidence.length ? ev.confidence.reduce((a, x) => a + x.v * x.w, 0) / ev.confidence.reduce((a, x) => a + x.w, 0) : null, n: ev.confidence.length },
    retention: { value: retention, n: seen.length },
  };
  const coverage = g.cards.length ? seen.length / g.cards.length : 0;
  const fresh = g.cards.length - seen.length;
  const due = g.cards.filter((c) => new Date(c.due_at).getTime() <= now).length - fresh;

  // depth: how long each card has survived between reviews. Right after a first session
  // everything looks remembered; knowledge only counts as deep once it has lasted weeks.
  const depth = seen.length ? seen.reduce((a, c) => a + depthOf(c), 0) / g.cards.length : 0;
  // overall mastery: the quality of the evidence we have, scaled by how much of the topic
  // you've covered and how deep it goes
  const parts = [["recall", 0.35], ["explain", 0.2], ["apply", 0.15], ["retention", 0.3]].filter(([k]) => dims[k].value != null);
  const wsum = parts.reduce((a, [, w]) => a + w, 0);
  const quality = wsum ? parts.reduce((a, [k, w]) => a + dims[k].value * w, 0) / wsum : 0;
  let mastery = quality * coverage * (0.35 + 0.65 * depth / Math.max(coverage, 1e-9));

  const rec = dims.recall.value ?? dims.explain.value ?? 0;
  let level;
  if (!seen.length) level = "new";
  else if (misconceptions.length) level = "shaky";
  else if (retention < 0.7 && rec >= 0.6) level = "fading";
  else if (coverage >= 0.9 && rec >= 0.85 && retention >= 0.85 && depth >= 0.6 && (dims.explain.value == null || dims.explain.value >= 0.7) && seen.every((c) => c.reps >= 2)) level = "mastered";
  else if (rec >= 0.7 && retention >= 0.7 && depth >= 0.3) level = "strong";
  else level = "learning";
  // the number agrees with the label: a topic with a misconception or slipping memory can't read as nearly mastered
  if (level === "shaky") mastery = Math.min(mastery, 0.5);
  if (level === "fading") mastery = Math.min(mastery, retention);

  // the weakest kind of evidence that has any data
  const weakest = ["recall", "explain", "apply", "retention"].filter((k) => dims[k].value != null).sort((a, b) => dims[a].value - dims[b].value)[0] || null;
  const deep = g.cards.some((c) => c.kind === "why" || c.kind === "apply");
  const next = nextStep({ level, fresh, due, misconceptions, weakest, dims, retention, seen: seen.length, total: g.cards.length, deep });

  // how urgently this topic needs attention: low mastery, slipping memory, misconceptions,
  // cards already due, and an exam getting close
  const urgency = examDays != null && examDays >= 0 ? Math.max(0, 1 - examDays / 60) : 0;
  const priority = (1 - mastery)
    + (level === "fading" ? 0.6 : 0) + (level === "shaky" ? 0.8 : 0)
    + Math.min(0.5, Math.max(0, due) * 0.05) + (level === "new" ? 0.2 : 0)
    + urgency * (1 - mastery) - (level === "mastered" ? 1 : 0);

  // the same topic on the six-dimension model, from this topic's reviews
  const six = sixProfile(evidenceFromReviews(g.cards, g.cards.flatMap((c) => byCard.get(c.id) || [])), { now });
  return {
    six,
    key: g.key, documentId: g.documentId, topic: g.topic, cards: g.cards.length, seen: seen.length, fresh, due: Math.max(0, due),
    coverage, depth, mastery, level, dims, weakest, misconceptions: misconceptions.map((c) => ({ id: c.id, front: c.front })),
    underconfident, lastSeen: lastSeen || null, next, priority,
  };
}

// 0 for a card first seen today, 1 once it has stayed remembered across a three-week gap
function depthOf(card) {
  if (!card.reps || card.last_rating === "again") return 0;
  return Math.min(1, Math.log2(1 + (card.interval_days || 0)) / Math.log2(22));
}

function pct(v) { return `${Math.round(v * 100)}%`; }

// One clear next step for a topic, with the reason in plain words
function nextStep({ level, fresh, due, misconceptions, weakest, dims, retention, seen, total, deep }) {
  if (level === "shaky") return { kind: "misconception", label: "Check your understanding", mins: Math.max(3, misconceptions.length * 2),
    why: `You were sure about ${misconceptions.length === 1 ? "an answer" : `${misconceptions.length} answers`} that turned out wrong. Fixing a misunderstanding early stops it spreading to later topics.` };
  if (level === "fading") return { kind: "review", label: "Review before you forget", mins: Math.max(3, Math.ceil(((due || 4) * 25) / 60)),
    why: `You'd remember about ${pct(retention)} of it if tested now. A short review costs far less than relearning it later.` };
  if (level === "new") return { kind: "learn", label: `Start with ${Math.min(fresh, 10)} new cards`, mins: Math.max(3, Math.ceil((Math.min(fresh, 10) * 25) / 60)),
    why: "You haven't been tested on this topic yet, so Gradify can't tell what you know." };
  if (due > 0) return { kind: "review", label: `Review ${due} due ${due === 1 ? "card" : "cards"}`, mins: Math.max(2, Math.ceil((due * 25) / 60)),
    why: "These cards are due: reviewing them now, just before you'd forget, is what makes memory last." };
  if (fresh > 0) return { kind: "learn", label: `Learn ${Math.min(fresh, 10)} more ${Math.min(fresh, 10) === 1 ? "card" : "cards"}`, mins: Math.max(2, Math.ceil((Math.min(fresh, 10) * 25) / 60)),
    why: `You've been tested on ${seen} of ${total} cards. Gradify can't count the rest as known until you've answered them.` };
  // recall is solid but nothing yet tests understanding
  if (!deep && (level === "strong" || level === "mastered")) return { kind: "deepen", label: "Add explain and apply questions", mins: 1,
    why: "You recall this well. Explaining why it works and using it on new problems is the next level, and it's what exams test." };
  if (level === "mastered") return { kind: "done", label: "Nothing needed now", mins: 0, why: "It's mastered. Gradify will bring it back before you'd forget it." };
  if (weakest === "explain") return { kind: "practise", label: "Practise explaining", mins: 5, why: `Your explanation answers are at ${pct(dims.explain.value)}, below your recall. Being able to explain it is what exams test.` };
  const name = weakest ? DIMENSIONS.find((d) => d.key === weakest).label.toLowerCase() : null;
  return { kind: "practise", label: "Practise this topic", mins: 5,
    why: name ? `Your ${name} is at ${pct(dims[weakest].value)}. A few more right answers will make this topic strong.` : "A few more right answers will make this topic strong." };
}

// The order to show a topic's cards in a targeted practice session: misconceptions, then the
// cards you're most likely to have forgotten, then new ones.
export function practiceOrder(topicCards, profile, now = Date.now()) {
  const wrong = new Set(profile.misconceptions.map((m) => m.id));
  const p = (c) => (wrong.has(c.id) ? -1 : c.reps ? recallProbability(c, now) : 2);
  return [...topicCards].filter((c) => !c.suspended).sort((a, b) => p(a) - p(b));
}

// =====================================================================================
// Six-dimension mastery from every kind of evidence (course answers and flashcard reviews)
// =====================================================================================
// One evidence item per answer, whatever produced it:
//   { dim, score 0..1, at (ms), w (weight), independent, delayed, difficulty, confidence, source, topic, unit, subject, question }
// Mastery is computed from these items only. Nothing is stored: the attempt records and reviews
// stay the source of truth, so the model can change without migrating anyone's data.
export const SIX = [
  { key: "recognition", label: "Recognition", what: "Picking the right answer when it's in front of you" },
  { key: "recall", label: "Recall", what: "Bringing facts and terms to mind unprompted" },
  { key: "explain", label: "Explanation", what: "Explaining why and how, in your own words" },
  { key: "apply", label: "Application", what: "Using it to work out a problem" },
  { key: "transfer", label: "Transfer", what: "Using it cold, mixed with other topics, in a new context" },
  { key: "retention", label: "Retention", what: "Still knowing it days or weeks later" },
];
const DIFFICULTY_WEIGHT = { 1: 0.8, 2: 1, 3: 1.25 };
export const LAB_WEIGHT = 0.5;
const CHOICE = new Set(["sba", "mcq", "tf", "multi", "match", "order"]);
// how much evidence (in weighted answers) a dimension needs before it's reported as a measurement
export const ENOUGH = 3;
const TREND_DAYS = 14;        // "recent" for the trend: the last two weeks of the learner's answers
const DELAY = 864e5;          // a retrieval counts as delayed after a day without seeing the question

// which dimension a course answer is evidence of. A course's own level names decide for choice
// questions ("Foundation", "Application", "Clinical reasoning"): a level that names application,
// reasoning, analysis or evaluation is application evidence. Without names, only the hardest is.
const APPLIED = /appl|reason|analys|evaluat/i;
export function dimensionOf(a, levels = null) {
  const t = a.question?.type, d = a.question?.d;
  if (t === "card") return "recall";
  if (t === "num" || t === "reasoning" || t === "sim" || t === "lab") return "apply";   // worked problems, legal reasoning, clinical simulation, lab challenges
  if (t === "short") return "explain";
  if (CHOICE.has(t)) return (levels?.[d - 1] ? APPLIED.test(levels[d - 1]) : d === 3) ? "apply" : "recognition";
  return "recall";
}

// course attempt records (kit/assess/attempts.js) → evidence. Provisional marks (self-marked short
// answers awaiting review) count at a third of the weight; second tries after feedback are assisted.
export function evidenceFromAttempts(attempts = [], { levels = null, exploration = null } = {}) {
  const out = [], lastSeen = new Map(), recent = new Map(), ex = exploration ? explorationIds(exploration) : null;
  for (const a of [...attempts].filter((x) => x?.question).sort((x, y) => String(x.at).localeCompare(String(y.at)))) {
    // exploration (kit/learning/evidence-class.js) earns XP but is never mastery evidence, for or against
    const cls = evidenceClass(a, { exploration: ex });
    if (cls === "exploration") continue;
    // Lab challenges (LAB_OUTCOMES): "attempted" is engagement, never evidence. "unsuccessful" from working at a
    // simulation without meeting the goal is a sign to practise (labPractice), not evidence against mastery; an
    // unsuccessful *answer* (a wrong check-question option, decision or calculation: response.via "answer") counts
    // like any wrong answer. Successes count; assisted ones as second tries.
    const outcome = labOutcome(a);
    if (outcome === "attempted" || (outcome === "unsuccessful" && a.response?.via !== "answer")) continue;
    const at = Date.parse(a.at), qid = a.question.id, prev = lastSeen.get(qid);
    lastSeen.set(qid, at);
    // a challenge met after asking the AI tutor about the lab counts as assisted, like a second try after feedback
    const independent = (a.attempt || 1) === 1 && outcome !== "assisted_success";   // (unsuccessful answers stay independent: no help was given)
    const provisional = a.marking?.status === "provisional";
    // a lab challenge is recorded only when it's met (a lab can't see a failed try), so it counts at half weight
    // the same question answered again within a day counts for less each time (½, ⅓, …), so drilling one easy
    // question can't inflate a score or its certainty; answering it again after a gap is retention evidence below
    const times = (recent.get(qid) || []).filter((t) => at - t < DELAY); times.push(at); recent.set(qid, times);
    const repeat = 1 / times.length;
    const w = (DIFFICULTY_WEIGHT[a.question.d] || 1) * (independent ? 1 : 0.3) * (provisional ? 0.33 : 1) * (a.question.type === "lab" ? LAB_WEIGHT : 1) * EVIDENCE_CLASSES[cls].weight * repeat;
    const base = { score: Number(a.score) || 0, at, w, independent, evidence: cls, difficulty: a.question.d ?? null, confidence: a.confidence ?? null, source: a.context, topic: a.lesson || a.unit || a.subject, unit: a.unit, subject: a.subject, question: qid, misconception: a.misconception || null };
    const dim = dimensionOf(a, levels);
    out.push({ ...base, dim, delayed: false });
    // retrieval a day or more after last seeing the question, without help, is retention evidence
    if (independent && prev != null && at - prev >= DELAY) out.push({ ...base, dim: "retention", delayed: true, gap: (at - prev) / DELAY });
    // a first, unaided answer in a mixed exam or review, away from the lesson, at medium or high
    // difficulty: the closest thing to using it in a new context. (An approximation; say so.)
    if (independent && ["exam", "review"].includes(a.context) && (a.question.d ?? 2) >= 2 && a.question.type !== "card") out.push({ ...base, dim: "transfer", delayed: false });
  }
  return out;
}

// flashcard reviews → evidence, using the card kinds from the original engine
export function evidenceFromReviews(cards = [], reviews = []) {
  const byId = new Map(cards.map((c) => [c.id, c])), last = new Map(), out = [];
  for (const r of [...reviews].sort((x, y) => String(x.reviewed_at).localeCompare(String(y.reviewed_at)))) {
    const c = byId.get(r.card_id); if (!c || c.suspended) continue;
    const at = Date.parse(r.reviewed_at), prev = last.get(r.card_id); last.set(r.card_id, at);
    const conf = { sure: 3, unsure: 2, guess: 1 }[r.confidence] ?? null;
    const base = { score: SCORE[r.rating] ?? 0, at, w: r.mode === "practice" ? 0.8 : 1, independent: true, difficulty: null, confidence: conf, source: "card", topic: `${c.document_id}|${c.topic || "Cards"}`, question: c.id, misconception: null };
    out.push({ ...base, dim: DIMENSION_OF_KIND[c.kind] || "recall", delayed: false });
    if (prev != null && at - prev >= DELAY) out.push({ ...base, dim: "retention", delayed: true, gap: (at - prev) / DELAY });
  }
  return out;
}

// how sure we can be of a value from this much evidence
function certainty(n) { return n >= 12 ? "high" : n >= 6 ? "medium" : n >= ENOUGH ? "low" : "insufficient"; }

/**
 * The six dimensions for one set of evidence (a lesson, a school, a course or everything).
 * A dimension with less than ENOUGH weighted answers reports status "insufficient": its value is
 * shown as a provisional estimate, never as a measurement, and it doesn't count toward mastery.
 */
export function sixProfile(evidence, { now = Date.now() } = {}) {
  const dims = {};
  for (const { key } of SIX) {
    const items = evidence.filter((e) => e.dim === key);
    let sw = 0, sv = 0, n = 0, last = 0, ind = 0;
    for (const e of items) {
      const w = e.w * Math.pow(0.5, Math.max(0, now - e.at) / DAY / HALF_LIFE_DAYS);
      sw += w; sv += e.score * w; n += e.w; last = Math.max(last, e.at); if (e.independent) ind++;
    }
    const value = items.length ? (sv + 0.5 * 0.5) / (sw + 0.5) : null;     // pulled to 50% while thin
    dims[key] = { value, n: items.length, weight: n, certainty: items.length ? certainty(n) : "none", independent: ind, assisted: items.length - ind, lastAt: last || null };
  }
  // confidence calibration: confident answers should be right, and guesses shouldn't be
  const rated = evidence.filter((e) => e.confidence && e.dim !== "retention" && e.dim !== "transfer");
  const sure = rated.filter((e) => e.confidence === 3), sureWrong = sure.filter((e) => e.score < 0.5).length;
  const calibration = rated.length >= ENOUGH ? { rated: rated.length, sure: sure.length, sureWrong, guessRight: rated.filter((e) => e.confidence === 1 && e.score >= 0.7).length, accuracyWhenSure: sure.length ? 1 - sureWrong / sure.length : null } : null;
  // overall mastery only from dimensions with enough evidence; null until there are at least two
  const W = { recognition: 0.1, recall: 0.2, explain: 0.15, apply: 0.2, transfer: 0.15, retention: 0.2 };
  const measured = SIX.filter(({ key }) => dims[key].certainty !== "none" && dims[key].certainty !== "insufficient");
  const ws = measured.reduce((a, { key }) => a + W[key], 0);
  const mastery = measured.length >= 2 ? measured.reduce((a, { key }) => a + dims[key].value * W[key], 0) / ws : null;
  const missing = SIX.filter((d) => !measured.includes(d)).map((d) => d.key);
  const weakest = measured.slice().sort((a, b) => dims[a.key].value - dims[b.key].value)[0]?.key || null;
  // Is understanding slipping? Unaided answers in the last two weeks against those before, weighted as above.
  // Only reported with at least three of each, and only a clear drop (20 points or more) counts as declining.
  const own = evidence.filter((e) => e.independent && !e.delayed && e.dim !== "transfer");
  const latest = own.reduce((m, e) => Math.max(m, e.at), 0), cut = latest - TREND_DAYS * DAY;
  const mean = (xs) => xs.reduce((a, e) => a + e.score * e.w, 0) / xs.reduce((a, e) => a + e.w, 0);
  const late = own.filter((e) => e.at > cut), early = own.filter((e) => e.at <= cut);
  const trend = late.length >= ENOUGH && early.length >= ENOUGH ? { recent: mean(late), earlier: mean(early), declining: mean(early) - mean(late) >= 0.2 } : null;
  return { dims, mastery, measured: measured.map((d) => d.key), missing, weakest, trend, calibration, answers: evidence.filter((e) => e.dim !== "retention" && e.dim !== "transfer").length, misconceptionRisk: calibration ? sureWrong / Math.max(1, sure.length) : null };
}

// profiles for every group (lesson by default) plus the whole set
export function sixProfiles(evidence, { by = (e) => e.topic, now = Date.now() } = {}) {
  const groups = new Map();
  for (const e of evidence) { const k = by(e); if (k == null) continue; (groups.get(k) || groups.set(k, []).get(k)).push(e); }
  return { all: sixProfile(evidence, { now }), groups: [...groups].map(([key, ev]) => ({ key, ...sixProfile(ev, { now }) })) };
}

// Spaced retrieval for course questions: which questions to bring back now, and why. A question
// comes back when its latest unaided answer was wrong (after a short gap), or when its last success
// is older than an interval that grows with each consecutive delayed success (1, 3, 7, 21, 60 days).
const STEPS = [1, 3, 7, 21, 60];
// Lab challenges have three outcomes (kit/course/course.js records them; older records with no outcome were successes):
//   success           met without help
//   assisted_success  met after the AI tutor was asked about the lab: Application evidence, weighted as assisted
//   attempt           the learner chose the challenge ("Try this"), worked at it, and left without meeting it
// the four recorded outcomes of a lab challenge; "attempt" is the older name for "unsuccessful", read as it
export const LAB_OUTCOMES = ["success", "assisted_success", "unsuccessful", "attempted"];
export function labOutcome(a) {
  if (a?.question?.type !== "lab") return null;
  const o = a.response && typeof a.response === "object" ? a.response.outcome : null;
  if (o === "attempt") return "unsuccessful";
  return LAB_OUTCOMES.includes(o) ? o : a.correct === false ? "unsuccessful" : "success";
}
// Lessons whose lab challenges the learner has tried and not yet met: at least `min` unsuccessful tries since that
// lesson's last lab success. This never lowers mastery; it says where more practice would help.
export function labPractice(attempts = [], { min = 2, exploration = null } = {}) {
  const by = new Map(), ex = exploration ? explorationIds(exploration) : null;
  // exploration challenges aren't skills, so not meeting one isn't a sign to practise
  for (const a of [...attempts].filter((x) => labOutcome(x) && evidenceClass(x, { exploration: ex }) !== "exploration").sort((x, y) => String(x.at).localeCompare(String(y.at)))) {
    if (!a.lesson) continue;
    const g = by.get(a.lesson) || { lesson: a.lesson, tries: 0, lastAt: 0, labs: new Set(), challenges: new Set() };
    const o = labOutcome(a);
    if (o === "attempted") continue;   // touched, not tried: neither a try nor a reset
    if (o === "unsuccessful") { g.tries++; g.lastAt = Date.parse(a.at); if (a.contextId) g.labs.add(a.contextId); if (a.response?.challenge) g.challenges.add(a.response.challenge); }
    else { g.tries = 0; g.labs.clear(); g.challenges.clear(); }
    by.set(a.lesson, g);
  }
  return [...by.values()].filter((g) => g.tries >= min).map((g) => ({ ...g, labs: [...g.labs], challenges: [...g.challenges] })).sort((a, b) => b.tries - a.tries || b.lastAt - a.lastAt);
}

// (flashcards have their own scheduler, and a lab challenge can't be asked again as a question, so neither is here)
export function revisionQueue(attempts = [], { now = Date.now(), limit = 20 } = {}) {
  const byQ = new Map();
  for (const a of [...attempts].filter((x) => x?.question && x.question.type !== "card" && x.question.type !== "lab" && x.marking?.status !== "provisional").sort((x, y) => String(x.at).localeCompare(String(y.at)))) {
    const q = byQ.get(a.question.id) || { id: a.question.id, lesson: a.lesson, unit: a.unit, streak: 0, lastAt: 0, lastScore: 0, n: 0 };
    const at = Date.parse(a.at);
    if ((a.attempt || 1) === 1) {
      const right = a.score >= 0.7;
      // a success only climbs the ladder when it came after a real gap
      q.streak = right ? (at - q.lastAt >= DELAY * 0.9 || q.n === 0 ? q.streak + 1 : Math.max(q.streak, 1)) : 0;
      q.lastScore = a.score; q.lastAt = at; q.n++;
    }
    byQ.set(a.question.id, q);
  }
  const out = [];
  for (const q of byQ.values()) {
    if (!q.n) continue;
    const wait = q.streak === 0 ? 0.25 : STEPS[Math.min(q.streak - 1, STEPS.length - 1)];
    const dueAt = q.lastAt + wait * DAY, overdue = (now - dueAt) / DAY;
    if (overdue < 0) continue;
    out.push({ ...q, dueAt, overdue, reason: q.streak === 0 ? "wrong" : "spaced", why: q.streak === 0 ? "You got this wrong last time. Try it again now that it's had time to settle." : `You last got this right ${Math.round((now - q.lastAt) / DAY)} days ago. Recalling it now, just as it starts to fade, is what makes it stick.` });
  }
  return out.sort((a, b) => (a.reason === b.reason ? b.overdue - a.overdue : a.reason === "wrong" ? -1 : 1)).slice(0, limit);
}
