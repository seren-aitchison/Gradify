// Mastery evidence maps for this course's interactives: interactive → { challenge → the lesson it is evidence for }.
// Built by scripts/evidence-maps.mjs from the challenges each interactive declares; correct any mapping by hand here
// (the script keeps existing entries). Checked by tests/interactives.test.mjs and scripts/check-interactives.cjs.
export const EVIDENCE = {
  "study-critique": { "corr": "u02-11", "power": "u02-11", "demand": "u02-11", "phack": "u02-11", "weird": "u02-11", "attrition": "u02-11" },
  "experiment-builder": { "iv": "u04-04", "hyp": "u04-04", "design": "u04-04", "confound": "u04-04", "operational": "u04-04", "sampling": "u04-04", "control": "u04-04", "analysis": "u04-04", "ethics": "u04-04" },
  "sampling": { "all": "u04-12", "bias": "u04-13", "strat": "u04-12" },
  "survey-design": { "double": "u05-02", "leading": "u05-02", "vague": "u05-02", "jargon": "u05-02", "negative": "u05-02", "options": "u05-02", "sensitive": "u05-02", "order": "u05-02" },
  "psychometrics": { "pct": "u05-03", "rel": "u05-03" },
  "stats-describe": { "skew": "u05-06", "outlier": "u05-06", "own": "u05-06" },
  "hypothesis-test": { "t1": "u05-13", "pow": "u05-12", "curse": "u05-12" },
  "correlation": { "quartet": "u05-17", "out": "u05-17", "neg": "u05-17" },
  "crosstab": { "sig": "u05-16", "none": "u05-16" },
  "coding": { "codes": "u06-11" },
  "ethics": { "covert": "u08-07", "tearoom": "u08-03", "consent": "u08-03", "anon": "u08-04", "disclose": "u08-03", "data": "u08-03" },
};
