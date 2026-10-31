// Gradify assessment attempts: one structured record for every answer, in every subject, so progress
// can be analysed within a course and across the whole Gradify family (LifeOS, the AI tutor).
// Stored on the device with the course's progress and, when signed in, in the account
// (store.logAttempt → the assessment_attempts table).
//
// Attempt record, schema 1:
// { schema: 1, id, at,                         id: unique, at: ISO time
//   site, subject,                             "NurseGradify", "nursing"
//   context, contextId,                        "lesson" | "quiz" | "problems" | "exam" | "review" | "practice"
//   question: { id, v, type, d, objectives },  permanent question id and version (registry.js)
//   lesson, module, unit,                      permanent lesson id, module title, school id
//   response, score, correct, attempt,         score 0..1; attempt: 1 for the first try at this question here
//   confidence, ms,                            1 guessing · 2 unsure · 3 sure (null if not given); time taken
//   misconception,                             the wrong option chosen (single choice), for misconception analysis
//   marking: { method, status } }              method auto | self | human | ai-assisted; status final | provisional
// Records are never edited: a later re-mark is a new record with the same question id and version.

export const SCHEMA = 1;
const uid = () => (globalThis.crypto?.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`);

export function makeAttempt({ site, subject, context, contextId, Q, key, version, lesson, module, unit, response, result, meta = {} }) {
  const misconception = (Q.type === "sba" || Q.type === "mcq" || Q.type === "tf") && !result.correct && typeof response === "string" ? response : null;
  return {
    schema: SCHEMA, id: uid(), at: new Date().toISOString(), site, subject, context, contextId: contextId || null,
    question: { id: key, v: version ?? null, type: Q.type, d: Q.d ?? null, objectives: Q.objectives || [] },
    lesson: lesson || null, module: module || null, unit: unit || null,
    response: response ?? null, score: Math.round((result.score ?? 0) * 1000) / 1000, correct: !!result.correct, attempt: meta.attempt || 1,
    confidence: meta.confidence || null, ms: meta.ms ?? null, misconception,
    marking: { method: result.method || "auto", status: result.status || "final" },
  };
}

// analytics over a list of attempts (from one course or many). Uses only final marks unless asked.
export function analyse(attempts, { includeProvisional = false } = {}) {
  const A = attempts.filter((a) => a.schema === SCHEMA && (includeProvisional || a.marking?.status !== "provisional"));
  const group = (keyFn) => {
    const m = new Map();
    for (const a of A) for (const k of [].concat(keyFn(a) ?? [])) {
      if (k == null) continue;
      const g = m.get(k) || { key: k, n: 0, score: 0, first: [], last: new Map() }; g.n++; g.score += a.score;
      if (a.attempt === 1) g.first.push(a.score);
      g.last.set(a.question.id, a.score); m.set(k, g);
    }
    return [...m.values()].map((g) => ({ key: g.key, n: g.n, mean: g.score / g.n, firstTry: g.first.length ? g.first.reduce((x, y) => x + y, 0) / g.first.length : null, latest: [...g.last.values()].reduce((x, y) => x + y, 0) / g.last.size })).sort((a, b) => a.mean - b.mean);
  };
  // improvement: per question, the first recorded score against the latest
  const byQ = new Map();
  for (const a of [...A].sort((x, y) => x.at.localeCompare(y.at))) { const q = byQ.get(a.question.id) || { first: a.score, latest: a.score, n: 0 }; q.latest = a.score; q.n++; byQ.set(a.question.id, q); }
  const repeated = [...byQ.values()].filter((q) => q.n > 1);
  // misconceptions: the wrong options learners choose most often
  const mis = new Map();
  for (const a of A) if (a.misconception) { const k = `${a.question.id}|${a.misconception}`; mis.set(k, { question: a.question.id, lesson: a.lesson, option: a.misconception, n: (mis.get(k)?.n || 0) + 1 }); }
  // calibration: how often confident answers were wrong
  const rated = A.filter((a) => a.confidence);
  return {
    total: A.length, questions: byQ.size,
    byLesson: group((a) => a.lesson), byModule: group((a) => (a.unit && a.module ? `${a.unit}:${a.module}` : null)), byUnit: group((a) => a.unit),
    byObjective: group((a) => (a.lesson ? a.question.objectives.map((o) => `${a.lesson}#o${o}`) : null)),
    byType: group((a) => a.question.type), byLevel: group((a) => a.question.d), bySubject: group((a) => a.subject),
    improvement: repeated.length ? { questions: repeated.length, mean: repeated.reduce((s, q) => s + (q.latest - q.first), 0) / repeated.length } : null,
    misconceptions: [...mis.values()].sort((a, b) => b.n - a.n).slice(0, 20),
    calibration: rated.length ? { rated: rated.length, sureButWrong: rated.filter((a) => a.confidence === 3 && !a.correct).length, unsureButRight: rated.filter((a) => a.confidence === 1 && a.correct).length } : null,
  };
}
