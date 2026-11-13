// The learning event ledger, in the browser: record() never throws and never slows a screen down, so every part of
// Gradify can log what happened. The pure helpers work out events that need a before-and-after comparison:
// a concept reaching a new stage, something previously known being forgotten, a misconception being fixed.
// Pure helpers are tested in tests/ledger.test.mjs.
const SURE = { sure: 1, unsure: 0.5, guess: 0 };
const STAGE_ORDER = ["new", "seen", "understood", "retained", "applied"];

export function record(store, e) {
  try { const p = store?.logEvent?.(e); if (p?.catch) p.catch(() => {}); } catch { /* the ledger is best-effort */ }
}

// one flashcard answer, as a ledger event
export function answerEvent(card, { rating, confidence = null, ms = null, mode = "scheduled", site = null }) {
  return { event: "card_answered", site, concept: `${card.document_id}|${card.topic || "Cards"}`, card_id: card.id, result: rating === "again" ? "incorrect" : rating === "hard" ? "partial" : "correct",
    confidence: confidence in SURE ? SURE[confidence] : null, response_ms: ms == null ? null : Math.max(0, Math.min(3600000, Math.round(ms))), source: mode === "practice" ? "practice" : "study_pack", detail: { rating } };
}

// a card the learner had learned (two good answers or more) answered wrong: that's forgetting, not a gap
export function forgotEvent(cardBefore, rating, site = null) {
  if (rating !== "again" || !cardBefore.reps || cardBefore.reps < 2 || !["good", "easy"].includes(cardBefore.last_rating)) return null;
  return { event: "forgotten", site, concept: `${cardBefore.document_id}|${cardBefore.topic || "Cards"}`, card_id: cardBefore.id, detail: { interval_days: cardBefore.interval_days || 0 } };
}

/** Compare two learner-memory snapshots (kit/intel/memory.js learnerMemory): stages reached, misconceptions fixed. */
export function stageEvents(before = [], after = [], site = null) {
  const was = new Map(before.map((c) => [c.key, c]));
  const out = [];
  for (const c of after) {
    const b = was.get(c.key);
    const from = STAGE_ORDER.indexOf(b?.stage || "new"), to = STAGE_ORDER.indexOf(c.stage);
    if (to > from && to >= 2) out.push({ event: "stage_reached", site, concept: c.key, detail: { stage: c.stage, from: b?.stage || "new", name: c.name } });
    if (b && b.level === "shaky" && c.level !== "shaky") out.push({ event: "misconception_fixed", site, concept: c.key, detail: { name: c.name } });
  }
  return out;
}
