// Mastery evidence maps: interactive → { challenge → the lesson it is evidence for } (scripts/evidence-maps.mjs).
// The challenge ids are those the reused SciGradify Biology and PsychGradify labs declare; each is mapped by hand
// to the HealthGradify lesson it tests.
export const EVIDENCE = {
  "organ-systems": { "sys": "u02-01", "org": "u02-01", "pan": "u02-01" },
  "heart": { "hr": "u02-07", "hyp": "u02-08", "fail": "u02-07" },
  "gas-exchange": { "alt": "u02-11", "lim": "u02-11", "bohr": "u02-11" },
  "kidney": { "gly": "u02-04", "obs": "u02-14", "adh": "u02-14" },
  "immune-response": { "sec": "u02-15", "vac": "u08-03" },
  "sleep": { "late": "u05-01", "nap": "u05-01", "lag": "u05-03" },
  "stress": { "sam": "u05-11", "hpa": "u05-11", "chronic": "u05-12" },
};
