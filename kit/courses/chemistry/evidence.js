// Mastery evidence maps for this course's interactives: interactive → { challenge → the lesson it is evidence for }.
// Built by scripts/evidence-maps.mjs from the challenges each interactive declares; correct any mapping by hand here
// (the script keeps existing entries). Checked by tests/interactives.test.mjs and scripts/check-interactives.cjs.
export const EVIDENCE = {
  "periodic-table": { "modes": "u03-01", "en": "u03-01", "rad": "u03-03", "ie3": "u03-21", "ps": "u03-21" },
  "atom-builder": { "c12": "u02-01", "ion": "u02-01", "anion": "u02-01", "uns": "u02-01", "ram": "u02-04", "iso": "u02-03" },
  "electron-config": { "three": "u02-08", "fe": "u02-08", "cr": "u02-09" },
  "orbitals": { "all3": "u02-06", "nodes": "u02-18", "n3d": "u02-06", "rad": "u02-06" },
  "bonding": { "all": "u04-01", "mgo": "u04-02", "n2": "u04-03" },
  "lewis": { "five": "u04-06", "res": "u04-08" },
  "organic-notes": { "ethanol": "u12-09", "toluene": "u12-08", "pentanes": "u12-11", "tertiary": "u12-09", "named": "u12-10", "chiral": "u12-15", "ez": "u12-20", "fg-isomers": "u12-13", "ring-alkene": "u12-03", "naphthalene": "u12-07", "ester": "u12-09", "rs-draw": "u12-19", "z-draw": "u12-20", "meso": "u12-17", "mech-sn2": "u13-10", "mech-sn1": "u13-09", "mech-e2": "u13-13", "mech-hbr-propene": "u13-15", "mech-hcn-ethanal": "u13-16", "mech-radical-chlorination": "u13-06", "mech-e1": "u13-12", "mech-br2-butene": "u13-14", "mech-nitration": "u13-17", "mech-nabh4-propanone": "u13-20", "mech-acyl-water": "u14-07", "rx-predict": "u14-21", "rx-markovnikov": "u13-26", "rx-zaitsev": "u13-24", "rx-directing": "u13-17", "rx-two-step": "u14-22", "mech-spot": "u13-01", "mech-chlorination": "u14-17", "mech-fc-acylation": "u14-15", "mech-ester-hydrolysis": "u14-09", "mech-acyl-ammonia": "u14-10", "mech-grignard": "u14-18", "mech-exam": "u13-01", "rx-competition": "u13-08", "rx-synthesis": "u14-22", "rx-retro": "u14-22", "mech-nitronium": "u13-17", "mech-bromination": "u14-17", "mech-hbr-propyne": "u12-06", "mech-ester-acid": "u14-09" },
  "vsepr": { "ten": "u04-09", "nh3": "u04-09", "xef4": "u04-09" },
  "polarity": { "pol": "u04-12", "np": "u04-12", "co2": "u04-12" },
  "imf": { "hb": "u04-17", "all": "u04-14" },
  "molecule-viewer": { "lib": "u12-01", "own": "u20-03", "space": "u12-01" },
  "functional-groups": { "g6": "u12-09", "asp": "u12-09" },
  "chirality": { "judge": "u12-15" },
  "rs": { "five": "u12-19" },
  "ez": { "six": "u12-20" },
  "curly-arrows": { "two": "u13-13", "all": "u13-13" },
  "sn1-sn2": { "inv": "u13-10", "sn1": "u13-09", "nu": "u13-09" },
  "synthesis": { "three": "u14-22", "all": "u14-22" },
  "energy-profile": { "endo": "u07-04", "two": "u07-04", "temp": "u07-03" },
  "equilibrium": { "conc": "u08-07", "pr": "u08-02", "temp": "u08-02" },
  "ph": { "sw": "u09-06", "buf": "u09-12", "dil": "u09-05" },
  "titration": { "eq": "u09-16", "ind": "u09-15", "pka": "u09-14" },
  "electrochemical-cell": { "dan": "u10-07", "big": "u10-07", "ner": "u10-13" },
  "thermodynamics": { "lime": "u06-19", "all": "u06-19", "never": "u06-13", "ice": "u06-13" },
  "kinetics": { "half": "u07-15", "unk": "u07-10", "arr": "u07-09" },
  "catalysis": { "cat": "u07-05", "temp": "u07-05" },
  "spectroscopy-problems": { "five": "u15-27" },
  "ir": { "six": "u15-09", "co": "u15-09" },
  "nmr": { "six": "u15-11", "iso": "u15-11" },
  "mass-spec": { "hal": "u15-15", "six": "u15-15" },
  "docking": { "man": "u18-12", "auto": "u18-20", "sar": "u18-04" },
};

// Exploration challenges: met by doing what they say (run, open, view, step through, "halve X and see"), not by
// reasoning towards a target. They earn XP and stay in the activity history but never count towards mastery
// (kit/learning/evidence-class.js). Every other challenge in the map above is practice evidence.
export const EXPLORATION = {
  "docking": ["auto"],
  "imf": ["all"],
  "ir": ["six"],
  "mass-spec": ["six"],
  "molecule-viewer": ["lib"],
  "nmr": ["six"],
  "orbitals": ["all3"],
  "periodic-table": ["modes"],
  "vsepr": ["ten"],
};
