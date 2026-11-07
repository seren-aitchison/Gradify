// What kind of evidence an attempt record is, for every Gradify course and for the unified learner profile.
//   exploration  doing what an interactive's challenge says (run 1,000 trials, open ten organelles, step through
//                mitosis). Earns XP and stays in the learner's activity history, but never counts towards mastery:
//                it shows engagement, not understanding.
//   practice     answers and challenges checked by Gradify: check questions, generated problems, lab challenges that
//                need the learner to reason their way to a target. Counts towards mastery at the usual weight.
//   assessment   evidence gathered under assessment conditions or from assessed working: unit quizzes and exams,
//                worked solutions and cases checked step by step (the workspaces), and anything a person marked.
//                Counts more strongly than practice.
// Mastery comes only from these records, never from XP: XP is a reward for activity and is kept separately.
// Pure functions with no browser APIs, so Node tests them and a server can use them unchanged.

export const EVIDENCE_CLASSES = {
  exploration: { label: "Exploration", mastery: false, weight: 0, what: "Trying out an interactive: earns XP, not mastery" },
  practice: { label: "Practice", mastery: true, weight: 1, what: "Answers and challenges checked by Gradify" },
  assessment: { label: "Assessment", mastery: true, weight: 1.5, what: "Quizzes, exams and working checked step by step or by a person" },
};

// a course's exploration challenges, from its config ({ interactive id: [challenge ids] }), as attempt question ids
export function explorationIds(map) {
  if (map instanceof Set) return map;
  const out = new Set();
  for (const [ix, tasks] of Object.entries(map || {})) for (const t of tasks || []) out.add(`ix:${ix}:${t}`);
  return out;
}

/**
 * The evidence class of one attempt record (kit/assess/attempts.js).
 * @param {object} a  the attempt
 * @param {{ exploration?: Set<string> | Record<string, string[]> }} [opts]  the course's exploration challenges
 */
export function evidenceClass(a, { exploration = null } = {}) {
  const q = a?.question || {}, r = a?.response && typeof a.response === "object" ? a.response : null;
  // an interactive's challenge: exploration when it was recorded as one, or the course lists it as one (which also
  // covers records made before challenges were classified)
  if (q.type === "lab") {
    if (r?.evidence === "exploration") return "exploration";
    if (exploration && explorationIds(exploration).has(q.id)) return "exploration";
  }
  const final = a?.marking?.status !== "provisional";
  if (final && (a?.context === "quiz" || a?.context === "exam")) return "assessment";
  if (final && a?.marking?.method === "human") return "assessment";
  // a worked solution or case checked step by step in a workspace (maths step-by-step, legal reasoning, clinical
  // simulation): assessed working
  if (final && String(q.id || "").startsWith("ws:") && a?.marking?.method === "auto") return "assessment";
  return "practice";
}

// how many records of each class: for the learner's activity history and the unified profile
export function evidenceCounts(attempts = [], opts = {}) {
  const out = { exploration: 0, practice: 0, assessment: 0 };
  for (const a of attempts) if (a?.question) out[evidenceClass(a, opts)]++;
  return out;
}
