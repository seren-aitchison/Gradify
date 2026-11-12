// Mastery evidence maps: interactive → { challenge → the lesson it is evidence for } (scripts/evidence-maps.mjs).
// Challenge ids are those the reused labs declare (as mapped in the biology, physics and psychology courses).
export const EVIDENCE = {
  "motor-neurone": { "sub": "u01-17", "thr": "u01-17", "ref": "u01-18", "ttx": "u01-17", "train": "u01-18" },
  "nmj": { "sum": "u01-17", "ache": "u01-12", "cur": "u01-17", "bot": "u01-12" },
  "heart": { "hr": "u02-04", "hyp": "u02-03", "fail": "u02-04" },
  "gas-exchange": { "alt": "u02-14", "lim": "u02-14", "bohr": "u02-10" },
  "respiration": { "all": "u03-04", "an": "u03-03", "poi": "u03-04", "o2role": "u03-04", "ferm": "u03-03" },
  "projectile": { "hit": "u05-12", "angle": "u05-13", "moon": "u05-12", "height": "u05-13" },
  "collisions": { "swap": "u05-08", "stick": "u05-08", "bounce": "u05-08", "explode": "u05-08" },
  "reaction-time": { "all": "u10-12", "slope": "u10-12" },
};
