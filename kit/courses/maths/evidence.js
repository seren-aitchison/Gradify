// Mastery evidence maps for this course's interactives: interactive → { challenge → the lesson it is evidence for }.
// Built by scripts/evidence-maps.mjs from the challenges each interactive declares; correct any mapping by hand here
// (the script keeps existing entries). Checked by tests/interactives.test.mjs and scripts/check-interactives.cjs.
export const EVIDENCE = {
  "practice": { "fractions": "u01-16", "percentChange": "u01-29", "reversePercent": "u01-29", "standardForm": "u01-22", "indices": "u01-20", "hcfLcm": "u01-14", "linear": "u03-09", "quadratic": "u03-11", "simultaneous": "u03-10", "nthTerm": "u01-25", "pythagoras": "u05-10", "trigSide": "u06-02", "compound": "u21-03", "probability": "u12-03", "gradient": "u07-07", "definite": "u07-29", "logs": "u03-21", "geometric": "u07-39" },
  "grapher": { "line": "u03-33", "parabola": "u03-33", "flip": "u03-33", "sine": "u03-33", "exp": "u03-33", "recip": "u03-33", "cubic": "u03-33" },
  "tangent": { "negh": "u07-03", "three": "u07-03" },
  "lln": { "k1": "u12-19", "six": "u12-19" },
  "clt": { "n1": "u12-20" },
  "regression": { "curve": "u13-36" },
};

// Exploration challenges: met by doing what they say (run, open, view, step through, "halve X and see"), not by
// reasoning towards a target. They earn XP and stay in the activity history but never count towards mastery
// (kit/learning/evidence-class.js). Every other challenge in the map above is practice evidence.
export const EXPLORATION = {
  "circles": ["seg", "semi"],
  "explog": ["straight"],
  "trig": ["quad"],
  "clt": ["n1"],
  "lln": ["k1", "k10", "six"],
  "regression": ["curve"],
  "sieve": ["full"],
  "tangent": ["negh", "three"],
};
