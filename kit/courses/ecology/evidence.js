// Mastery evidence maps: interactive → { challenge → the lesson it is evidence for } (scripts/evidence-maps.mjs).
export const EVIDENCE = {
  "population": { "K": "u02-07", "cycle": "u02-09", "excl": "u03-02", "co": "u03-02" },
  "food-web": { "sec": "u04-03", "big": "u04-03", "pyr": "u04-08" },
  "natural-selection": { "ind": "u06-05", "rev": "u06-05", "drift": "u06-05" },
  "photosynthesis": { "comp": "u04-05", "co2": "u04-05", "hot": "u04-05" },
};
// exploration challenges (kit/learning/evidence-class.js): earn XP, never count towards mastery
export const EXPLORATION = { "natural-selection": ["drift"] };
