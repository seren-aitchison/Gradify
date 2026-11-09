// Mastery evidence maps: interactive → { challenge → the lesson it is evidence for } (scripts/evidence-maps.mjs).
export const EVIDENCE = {
  "forecasting": { "quartet": "u10-07", "out": "u10-07", "neg": "u10-07" },
};
// Exploration challenges: met by doing what they say; they earn XP but never count towards mastery
// (kit/learning/evidence-class.js). Every other challenge in the map above is practice evidence.
export const EXPLORATION = {
  "forecasting": ["quartet"],
};
