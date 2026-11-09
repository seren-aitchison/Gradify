// Mastery evidence maps for this course's interactives: interactive → { challenge → the lesson it is evidence for }.
// Built from the maps of the labs' home courses (biology, nursing): each challenge goes to the linked Medicine lesson
// whose title best matches its wording (scripts/evidence-maps.mjs bestLesson). Correct any mapping by hand here.
export const EVIDENCE = {
  "action-potential": { "sub": "u01-02", "thr": "u01-02", "ref": "u01-02", "ttx": "u01-02", "train": "u01-02" },
  "synapse": { "sum": "u01-16", "ache": "u01-16", "cur": "u01-16", "bot": "u01-16" },
  "immune-response": { "sec": "u01-13", "vac": "u01-13" },
  "inheritance": { "9331": "u01-15", "test": "u01-15", "chi": "u01-15", "x": "u01-15" },
  "news2": { "scores": "u02-06", "response": "u02-06" },
  "heart": { "hr": "u03-08", "hyp": "u03-01", "fail": "u03-08" },
  "gas-exchange": { "alt": "u04-01", "lim": "u04-01", "bohr": "u04-01" },
  "kidney": { "gly": "u06-01", "obs": "u06-01", "adh": "u06-01" },
};

// Exploration challenges, as classified in the labs' home courses: XP and activity, never mastery
// (kit/learning/evidence-class.js).
export const EXPLORATION = {
  "immune-response": ["sec"],
};
