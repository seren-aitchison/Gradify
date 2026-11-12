// Mastery evidence maps: interactive → { challenge → the lesson it is evidence for } (scripts/evidence-maps.mjs).
// The challenges are those PsychGradify's memory lab declares (kit/courses/psychology/evidence.js).
export const EVIDENCE = {
  "digit-span": { "span": "u01-02", "chunk": "u01-02" },
  "memory-models": { "msm": "u01-01", "wmm": "u01-02" },
  "serial-position": { "one": "u01-16", "three": "u01-16", "delay": "u01-16" },
};
// Exploration challenges: they earn XP but never count towards mastery (kit/learning/evidence-class.js).
export const EXPLORATION = {
  "memory-models": ["msm", "wmm"],
  "serial-position": ["one", "three", "delay"],
};
