// The Mastery Engine: a living profile for every topic, built only from evidence the learner
// has produced (their answers, how sure they were, and when they last saw each card), and a
// ranked answer to "what should I practise next, and why?". No browser APIs, so Node can test it.
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

// The chance of recalling a card right now. The scheduler picks each interval so recall should
// still be about 90% when the card comes due, so memory decays as 0.9^(elapsed / interval).
export function recallProbability(card, now = Date.now()) {
  if (!card.reps) return null;
  if (card.last_rating === "again") return 0.3;
  const interval = Math.max(card.interval_days || 0, 1 / 24);
  const last = new Date(card.due_at).getTime() - interval * DAY;
  const elapsed = Math.max(0, (now - last) / DAY);
  return Math.pow(0.9, elapsed / interval);
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

  return {
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
