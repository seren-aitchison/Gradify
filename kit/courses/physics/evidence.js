// Mastery evidence maps for this course's interactives: interactive → { challenge → the lesson it is evidence for }.
// Built by scripts/evidence-maps.mjs from the challenges each interactive declares; correct any mapping by hand here
// (the script keeps existing entries). Checked by tests/interactives.test.mjs and scripts/check-interactives.cjs.
export const EVIDENCE = {
  "projectile": { "hit": "u04-07", "angle": "u04-07", "moon": "u04-07", "height": "u04-07" },
  "collisions": { "swap": "u04-25", "stick": "u04-22", "bounce": "u04-22", "explode": "u04-22" },
  "oscillator": { "period": "u06-03", "crit": "u06-08", "res": "u06-03", "q": "u06-11" },
  "pendulum": { "small": "u06-05", "big": "u06-05", "length": "u06-05", "chaos": "u06-05" },
  "orbits": { "circ": "u07-07", "ell": "u07-01", "esc": "u07-05", "kep": "u07-08" },
  "waves": { "cancel": "u10-09", "stand": "u10-10", "h3": "u10-10", "beats": "u10-17" },
  "interference": { "spacing": "u19-13", "miss": "u19-15", "wide": "u19-16", "grat": "u19-17" },
  "circuits": { "maxp": "u16-08", "cmp": "u16-05", "share": "u16-05", "bal": "u16-03" },
  "transients": { "tau": "u16-11", "half": "u16-11", "dis": "u16-11", "rl": "u16-11" },
  "efield": { "dip": "u15-05", "nul": "u15-05", "plates": "u15-05", "add": "u15-04" },
  "lorentz": { "circ": "u17-01", "double": "u17-01", "period": "u17-01", "sel": "u17-01" },
  "gas": { "mb": "u13-05", "boyle": "u13-05", "charles": "u13-05", "hot": "u13-12" },
  "photoelectric": { "thr": "u20-01", "stop": "u20-01", "int": "u20-01", "planck": "u20-01" },
  "decay": { "half": "u23-10", "few": "u23-08", "random": "u23-10", "chain": "u23-10" },
  "quantum": { "box": "u20-22", "fin": "u20-22", "lad": "u20-22", "tun": "u20-23" },
  "relativity": { "g2": "u25-05", "len": "u25-04", "sim": "u25-11", "add": "u25-04" },
  "optics": { "tir": "u19-04", "real": "u19-05", "virt": "u19-01", "mag": "u19-05" },
};
