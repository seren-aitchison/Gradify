// Mastery evidence maps for this course's interactives: interactive → { challenge → the lesson it is evidence for }.
// Built by scripts/evidence-maps.mjs from the challenges each interactive declares; correct any mapping by hand here
// (the script keeps existing entries). Checked by tests/interactives.test.mjs and scripts/check-interactives.cjs.
export const EVIDENCE = {
  "forecasting": { "quartet": "u10-07", "out": "u10-07", "neg": "u10-07" },
};

// Exploration challenges: met by doing what they say (run, open, view, step through, "halve X and see"), not by
// reasoning towards a target. They earn XP and stay in the activity history but never count towards mastery
// (kit/learning/evidence-class.js). Every other challenge in the map above is practice evidence.
export const EXPLORATION = {
  "forecasting": ["quartet"],
};
