// Chapter prerequisites: which chapters (a course's units: "School", "Unit"…) each chapter builds on, for every course.
// This is the backbone of the mastery map (kit/learning/mastery-map.js): Explore, each course's Progress page and the
// learner's world use it to show how a subject fits together and what is within reach next.
//
//   CHAPTER_PREREQS[slug] = { <chapter number>: [<chapter numbers it builds on>], … }
//
// Only direct prerequisites are listed (A → B → C, not also A → C); a chapter that isn't listed is a starting point.
// These are teaching dependencies (what you need to follow a chapter well), not a locked order: every chapter stays
// open. A course with a module-level concept graph (cfg.concepts, kit/learning/concepts.js) has its chapter links
// derived from that instead (chapterPrereqsFromConcepts), so they can never disagree.
// tests/mastery-map.test.mjs checks every number refers to a real chapter and that no course has a cycle.

export const CHAPTER_PREREQS = {
  physics: {
    3: [1], 4: [1, 2], 5: [4], 6: [4], 7: [4], 8: [4], 9: [4], 10: [6], 11: [10], 12: [1], 13: [12, 2], 14: [12],
    15: [1, 2], 16: [15], 17: [15], 18: [17, 10], 19: [18], 20: [10], 21: [20], 22: [21], 23: [21], 24: [23, 25],
    25: [4], 26: [25, 7], 27: [20, 13], 28: [27, 16], 29: [17, 13], 30: [7, 23], 31: [26, 30], 32: [7, 10],
    33: [12, 18], 34: [8, 12], 35: [23, 18], 36: [28, 19], 37: [20], 38: [6], 39: [2], 40: [4], 41: [40, 17],
    42: [41, 20, 25], 43: [24], 44: [3], 45: [27], 46: [12, 16], 47: [11], 48: [30, 32], 52: [4], 53: [34, 32],
    54: [3],
  },
  biology: {
    2: [1], 3: [1], 4: [2, 3], 5: [4], 6: [4], 7: [2, 3], 8: [2, 3], 9: [4], 10: [7, 9], 11: [6], 12: [9], 13: [4],
    14: [1],
  },
  chemistry: {
    2: [1], 3: [2], 4: [3], 5: [4], 6: [5], 7: [6], 8: [6], 9: [8], 10: [9], 11: [10], 12: [4], 13: [12], 14: [13],
    15: [12], 16: [7], 17: [11, 14], 18: [14, 15], 19: [14, 15], 20: [16],
  },
  law: {
    2: [1], 3: [1], 4: [3], 5: [1], 6: [5], 7: [1], 8: [7, 3], 9: [7], 10: [9], 11: [3], 12: [4], 13: [2], 14: [2],
    15: [1], 16: [1], 17: [1], 18: [15], 19: [16, 12, 8],
  },
  nursing: {
    3: [2], 4: [2], 5: [2], 6: [1, 3], 7: [6], 8: [1], 9: [5, 7], 10: [5, 7], 11: [5, 7], 12: [7], 13: [7],
    14: [1], 15: [5, 7], 16: [1], 17: [1],
  },
  pharmacy: {
    2: [1], 3: [2], 4: [2], 5: [3, 4], 6: [1], 7: [3], 8: [3], 9: [3], 10: [3], 11: [3], 12: [3], 13: [3], 14: [3],
    15: [3], 16: [1], 17: [7, 15], 18: [17], 19: [16, 18, 6],
  },
  psychology: {
    2: [1], 3: [1], 4: [1], 5: [1], 6: [1], 7: [1], 8: [7, 2], 9: [8], 10: [1], 11: [10], 12: [2, 6], 13: [2, 3],
    14: [9, 6], 15: [6], 16: [10, 3],
  },
  sociology: {
    2: [1], 3: [2], 4: [1], 5: [2], 6: [3, 4], 7: [5], 8: [4], 9: [5], 10: [2], 11: [2], 12: [2], 13: [5], 14: [3],
    15: [5], 16: [5], 17: [1], 18: [17],
  },
  history: {
    2: [1], 3: [2], 4: [3], 5: [4], 6: [5], 7: [6], 8: [7], 9: [7], 10: [9], 11: [10, 8], 12: [10], 13: [7],
    14: [6], 15: [1], 16: [1], 17: [1], 18: [17],
  },
  ecology: { 2: [1], 3: [2], 4: [3], 5: [4], 6: [3], 7: [6], 8: [5], 9: [1], 10: [5], 11: [7, 8, 10] },
  business: { 2: [1], 3: [1], 4: [1], 5: [1], 6: [2], 7: [1], 8: [1], 9: [3, 4], 10: [5], 11: [3] },
  finance: { 2: [1], 3: [2], 4: [3], 5: [1], 6: [5], 7: [4, 6], 8: [3], 9: [2], 11: [7] },
  medicine: { 2: [1], 3: [2], 4: [2], 5: [2], 6: [2], 7: [2], 8: [2], 9: [2], 10: [3, 4, 5], 11: [2], 12: [2] },
  literature: { 2: [1], 3: [1], 4: [1], 5: [2, 3, 4], 6: [5], 7: [1], 8: [3, 4], 9: [6], 10: [7, 8, 9] },
  music: { 2: [1], 3: [2], 4: [3], 5: [3], 6: [2], 7: [4], 8: [1], 10: [9], 11: [3], 12: [5, 7, 8] },
  health: { 3: [2], 4: [2], 5: [1], 6: [1], 7: [6], 8: [2], 9: [8], 10: [9], 11: [1] },
  engineering: { 2: [1], 3: [2], 4: [2], 5: [4], 6: [1], 7: [3, 6], 8: [1], 9: [3, 8], 10: [5], 12: [10, 11] },
  investing: { 2: [1], 3: [2], 4: [3], 5: [4], 6: [3], 7: [6], 8: [5], 9: [4], 10: [8], 11: [2], 12: [9, 10] },
  veterinary: { 2: [1], 3: [1], 5: [2, 3], 6: [3], 7: [2, 3], 8: [5], 9: [8, 7], 10: [8, 7], 11: [8, 4], 12: [6] },
  dentistry: { 2: [1], 4: [2], 5: [2], 6: [3], 7: [2], 9: [4, 5, 7], 10: [9], 11: [1, 6], 12: [6] },
  art: { 2: [1], 3: [1], 4: [2, 3], 5: [2], 6: [1], 7: [3], 9: [8], 10: [9], 12: [10] },
  sport: { 2: [1], 3: [2], 4: [3], 5: [1], 6: [4], 7: [6], 8: [3], 10: [9], 11: [5] },
  teaching: { 2: [1], 3: [2], 4: [2], 5: [1], 6: [1], 7: [6, 4], 8: [6] },
  university: { 3: [1], 4: [1], 5: [4], 6: [5], 7: [4], 10: [2, 3] },
  research: { 2: [1], 4: [2, 3], 5: [4], 6: [4], 7: [5, 6], 8: [4], 9: [8], 10: [2], 11: [10], 12: [10] },
  professional: { 3: [2], 4: [3], 6: [8] },
  careers: { 2: [1], 3: [2], 5: [1], 6: [5], 7: [6], 8: [2], 9: [8], 11: [1] },
  design: { 3: [1], 4: [1], 5: [4], 6: [3, 5], 10: [6], 11: [1] },
  spanish: { 2: [1], 3: [2], 4: [3], 5: [4], 6: [5], 7: [6], 8: [7], 9: [3], 10: [5] },
  gcse: { 3: [2] },
  primary: { 2: [1], 3: [2], 4: [2], 6: [5], 7: [5], 10: [9] },
  computing: { 2: [1], 3: [2], 4: [2], 5: [3, 4], 7: [6], 8: [7], 9: [8], 10: [3], 11: [5], 12: [9] },
  japanese: { 2: [1], 3: [2], 4: [3], 5: [4], 6: [5], 7: [5], 8: [7], 9: [7], 10: [2], 12: [6, 9] },
};

/** chapter links from a module-level concept graph: chapter A builds on B when any of A's modules builds on B's */
export function chapterPrereqsFromConcepts(units, concepts) {
  const byId = new Map(units.map((u) => [u.id, u.n])), out = {};
  for (const [to, froms] of Object.entries(concepts?.modules || {})) {
    const a = byId.get(String(to).split("/")[0]); if (a == null) continue;
    for (const f of froms) { const b = byId.get(String(f).split("/")[0]); if (b != null && b !== a) (out[a] ||= new Set()).add(b); }
  }
  // two chapters whose modules build on each other (fine for modules) become one link at chapter level: the earlier
  // chapter is the foundation
  for (const [a, set] of Object.entries(out)) for (const b of [...set]) if (out[b]?.has(Number(a)) && b > Number(a)) set.delete(b);
  // keep only direct links: drop B when another prerequisite of A already builds on B
  const reach = (n, seen = new Set()) => { for (const p of out[n] || []) if (!seen.has(p)) { seen.add(p); reach(p, seen); } return seen; };
  return Object.fromEntries(Object.entries(out).filter(([, set]) => set.size).map(([a, set]) => [a, [...set].filter((b) => ![...set].some((c) => c !== b && reach(c).has(b))).sort((x, y) => x - y)]));
}
