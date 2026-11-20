// Chemistry the diagram checks recompute: formulae and equations (atoms and charge), relative masses, where each
// element sits in the periodic table, electron configurations, and oxidation-state and VSEPR rules.
// Used by kit/diagrams/chem-renderers.js. Everything here is plain data and arithmetic, with no drawing.

export const SYMBOLS = ("H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr " +
  "Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os " +
  "Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og").split(" ");
export const Z = Object.fromEntries(SYMBOLS.map((s, i) => [s, i + 1]));

// standard atomic weights (IUPAC 2021, abridged to the elements the diagrams use)
export const MASS = { H: 1.008, He: 4.0026, Li: 6.94, Be: 9.0122, B: 10.81, C: 12.011, N: 14.007, O: 15.999, F: 18.998, Ne: 20.180,
  Na: 22.990, Mg: 24.305, Al: 26.982, Si: 28.085, P: 30.974, S: 32.06, Cl: 35.45, Ar: 39.95, K: 39.098, Ca: 40.078, Sc: 44.956,
  Ti: 47.867, V: 50.942, Cr: 51.996, Mn: 54.938, Fe: 55.845, Co: 58.933, Ni: 58.693, Cu: 63.546, Zn: 65.38, Br: 79.904,
  Kr: 83.798, Rb: 85.468, Sr: 87.62, Ag: 107.87, Sn: 118.71, I: 126.90, Xe: 131.29, Cs: 132.91, Ba: 137.33, Pt: 195.08,
  Au: 196.97, Pb: 207.2, U: 238.03 };
// monoisotopic masses of the most abundant isotopes, for accurate-mass (high resolution) checks
export const MONO = { H: 1.007825, C: 12.000000, N: 14.003074, O: 15.994915, F: 18.998403, S: 31.972071, Cl: 34.968853, Br: 78.918338, I: 126.904473 };

// ---------- formulae ----------
const SUB = { "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4", "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9" };
const SUP = { "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9", "⁺": "+", "⁻": "-" };
/** Plain ASCII: H₂O → H2O, SO₄²⁻ → SO4^2-, e⁻ → e^-; state symbols removed. */
export function ascii(s, keepStates = false) {
  let out = "", sup = "";
  for (const ch of String(s).replace(/−/g, "-")) {
    if (SUP[ch]) { sup += SUP[ch]; continue; }
    if (sup) { out += `^${sup}`; sup = ""; }
    out += SUB[ch] ?? ch;
  }
  if (sup) out += `^${sup}`;
  return (keepStates ? out : out.replace(/\((s|l|g|aq)\)/g, "")).trim();
}

/** Parse one species: atoms {El: n} and charge. Handles brackets, hydrates (·), charges written ^2-, 2-, + and -. */
export function parseFormula(raw) {
  let s = ascii(raw);
  let charge = 0;
  // a charge is ^n± (Unicode superscripts become this) or a bare trailing + or −, which means 1: NH4+ is NH₄⁺
  const cm = s.match(/\^(\d*)([+-])$/) || s.match(/()([+-])$/);
  if (s === "e^-" || s === "e-") return { atoms: {}, charge: -1 };
  if (cm && !/^[+-]$/.test(s)) {
    charge = (cm[2] === "+" ? 1 : -1) * (cm[1] ? +cm[1] : 1);
    s = s.slice(0, s.length - cm[0].length);
  }
  const atoms = {};
  for (const part of s.split(/[·.*]/)) {
    const lead = part.match(/^(\d+)(?=[A-Z(])/);
    const mult = lead ? +lead[1] : 1;
    const body = lead ? part.slice(lead[1].length) : part;
    const stack = [{}];
    const re = /([A-Z][a-z]?)(\d*)|(\()|(\))(\d*)/g;
    let m, pos = 0;
    while ((m = re.exec(body))) {
      if (m.index !== pos) throw new Error(`cannot read "${raw}" at "${body.slice(pos)}"`);
      pos = re.lastIndex;
      if (m[1]) { if (!(m[1] in Z)) throw new Error(`unknown element ${m[1]} in ${raw}`); const t = stack.at(-1); t[m[1]] = (t[m[1]] || 0) + (m[2] ? +m[2] : 1); }
      else if (m[3]) stack.push({});
      else { const g = stack.pop(), k = m[5] ? +m[5] : 1, t = stack.at(-1); for (const [e, n] of Object.entries(g)) t[e] = (t[e] || 0) + n * k; }
    }
    if (pos !== body.length || stack.length !== 1) throw new Error(`cannot read "${raw}"`);
    for (const [e, n] of Object.entries(stack[0])) atoms[e] = (atoms[e] || 0) + n * mult;
  }
  return { atoms, charge };
}

export const formulaMass = (f) => Object.entries(parseFormula(f).atoms).reduce((m, [e, n]) => m + MASS[e] * n, 0);
export const monoMass = (f) => Object.entries(parseFormula(f).atoms).reduce((m, [e, n]) => m + MONO[e] * n, 0);

const FRAC = { "½": 0.5, "¼": 0.25, "¾": 0.75, "⅓": 1 / 3, "⅔": 2 / 3 };
/** One side of an equation: [{coef, species, atoms, charge}]. Terms are separated by " + " (with spaces). */
export function parseSide(side) {
  return side.split(/\s\+\s/).map((t) => t.trim()).filter(Boolean).map((t) => {
    // a leading coefficient: digits, a fraction a/b or a vulgar fraction, followed by the species
    const m = t.match(/^(\d+\/\d+|\d+(?:\.\d+)?|[½¼¾⅓⅔])\s*(?=[A-Z(e\[])(.+)$/);
    const coef = !m ? 1 : FRAC[m[1]] ?? (m[1].includes("/") ? +m[1].split("/")[0] / +m[1].split("/")[1] : +m[1]);
    const sp = m ? m[2] : t;
    return { coef, species: sp.trim(), ...parseFormula(sp) };
  });
}
/** Split an equation at its arrow (→, ⇌, ->, =). */
export function parseEquation(eq) {
  const parts = String(eq).split(/\s*(?:→|⇌|⟶|->|<=>|=)\s*/);
  if (parts.length !== 2) throw new Error(`no single arrow in "${eq}"`);
  return { left: parseSide(parts[0]), right: parseSide(parts[1]) };
}
function tally(terms) {
  const atoms = {}; let charge = 0;
  for (const t of terms) { for (const [e, n] of Object.entries(t.atoms)) atoms[e] = (atoms[e] || 0) + n * t.coef; charge += t.charge * t.coef; }
  return { atoms, charge };
}
/** Is the equation balanced for every element and for charge? Returns { ok, detail }. */
export function balanced(eq) {
  const { left, right } = parseEquation(eq), a = tally(left), b = tally(right);
  const els = [...new Set([...Object.keys(a.atoms), ...Object.keys(b.atoms)])];
  const bad = els.filter((e) => Math.abs((a.atoms[e] || 0) - (b.atoms[e] || 0)) > 1e-9);
  const qok = Math.abs(a.charge - b.charge) < 1e-9;
  return { ok: !bad.length && qok, detail: bad.length ? `unbalanced ${bad.map((e) => `${e} ${a.atoms[e] || 0}→${b.atoms[e] || 0}`).join(", ")}` : !qok ? `charge ${a.charge}→${b.charge}` : `atoms and charge balance (${els.join(", ")}; charge ${a.charge})` };
}
/** Net equation of several steps: species on both sides cancel. Returns {left:{sp:n}, right:{sp:n}}. */
export function netOf(steps) {
  const net = {};
  for (const eq of steps) { const { left, right } = parseEquation(eq); for (const t of left) net[ascii(t.species)] = (net[ascii(t.species)] || 0) - t.coef; for (const t of right) net[ascii(t.species)] = (net[ascii(t.species)] || 0) + t.coef; }
  const L = {}, R = {};
  for (const [k, v] of Object.entries(net)) { if (v < -1e-9) L[k] = -v; else if (v > 1e-9) R[k] = v; }
  return { left: L, right: R };
}
export function sameNet(a, b) {
  const eq = (x, y) => Object.keys(x).length === Object.keys(y).length && Object.entries(x).every(([k, v]) => Math.abs((y[k] || 0) - v) < 1e-9);
  return eq(a.left, b.left) && eq(a.right, b.right);
}
export const netText = (n) => `${Object.entries(n.left).map(([k, v]) => `${v === 1 ? "" : v}${k}`).join(" + ")} → ${Object.entries(n.right).map(([k, v]) => `${v === 1 ? "" : v}${k}`).join(" + ")}`;

// ---------- the periodic table ----------
/** Period, group (1–18; null for the f block) and block of element number z. */
export function position(z) {
  const starts = [1, 3, 11, 19, 37, 55, 87, 119];
  const period = starts.findIndex((s, i) => z >= s && z < starts[i + 1]) + 1;
  const i = z - starts[period - 1]; // 0-based index within the period
  if (period === 1) return { period, group: z === 1 ? 1 : 18, block: "s" };
  if (period <= 3) { const group = i < 2 ? i + 1 : i + 11; return { period, group, block: i < 2 ? "s" : "p" }; }
  if (period <= 5) { const group = i + 1; return { period, group, block: group <= 2 ? "s" : group <= 12 ? "d" : "p" }; }
  // periods 6 and 7: s(2), then La/Ac (group 3, d), 14 f elements Ce–Lu / Th–Lr, then d groups 4–12, p 13–18
  if (i < 2) return { period, group: i + 1, block: "s" };
  if (i === 2) return { period, group: 3, block: "d" };
  if (i <= 16) return { period, group: null, block: "f", fIndex: i - 3 };
  const group = i - 13; return { period, group, block: group <= 12 ? "d" : "p" };
}

// ---------- electron configurations ----------
export const ORDER = ["1s", "2s", "2p", "3s", "3p", "4s", "3d", "4p", "5s", "4d", "5p", "6s", "4f", "5d", "6p", "7s", "5f", "6d", "7p"];
export const CAP = { s: 2, p: 6, d: 10, f: 14 };
const L = { s: 0, p: 1, d: 2, f: 3 };
// ground-state exceptions to the Aufbau order among the elements the diagrams use
const EXCEPT = { 24: { "3d": 5, "4s": 1 }, 29: { "3d": 10, "4s": 1 }, 42: { "4d": 5, "5s": 1 }, 47: { "4d": 10, "5s": 1 }, 79: { "5d": 10, "6s": 1, "4f": 14 } };
/** Ground-state configuration of element z with the given charge: { "1s": 2, ... } in Aufbau order. */
export function configuration(z, charge = 0) {
  const conf = {};
  let left = z;
  for (const sub of ORDER) { if (!left) break; const n = Math.min(CAP[sub.at(-1)], left); conf[sub] = n; left -= n; }
  if (EXCEPT[z]) Object.assign(conf, EXCEPT[z]);
  if (charge > 0) {
    // cations lose electrons from the highest n first (4s before 3d), then the highest l within that n
    for (let k = 0; k < charge; k++) {
      const occ = Object.keys(conf).filter((s) => conf[s] > 0).sort((a, b) => +b[0] - +a[0] || L[b.at(-1)] - L[a.at(-1)]);
      conf[occ[0]]--;
    }
  } else if (charge < 0) {
    for (let k = 0; k < -charge; k++) { const sub = ORDER.find((s) => (conf[s] || 0) < CAP[s.at(-1)]); conf[sub] = (conf[sub] || 0) + 1; }
  }
  for (const s of Object.keys(conf)) if (!conf[s]) delete conf[s];
  return conf;
}
/** Read "1s2 2s2 2p6", "[Ar] 3d6 4s2" or with superscripts into { sub: n }. */
export function readConfig(str) {
  const NG = { He: 2, Ne: 10, Ar: 18, Kr: 36, Xe: 54, Rn: 86 };
  let conf = {};
  const s = ascii(str).replace(/\^/g, "");
  const core = s.match(/\[(\w+)\]/);
  if (core) conf = configuration(NG[core[1]]);
  for (const m of s.replace(/\[\w+\]/, "").matchAll(/(\d[spdf])(\d+)/g)) conf[m[1]] = (conf[m[1]] || 0) + +m[2];
  return conf;
}
export const sameConfig = (a, b) => { const ks = new Set([...Object.keys(a), ...Object.keys(b)]); return [...ks].every((k) => (a[k] || 0) === (b[k] || 0)); };
export const configText = (c) => Object.keys(c).sort((a, b) => +a[0] - +b[0] || L[a.at(-1)] - L[b.at(-1)]).map((k) => `${k}${c[k]}`).join(" ");
/** Unpaired electrons in a sub-shell holding n electrons in m orbitals (Hund's rule). */
export const unpairedIn = (n, m) => (n <= m ? n : 2 * m - n);
/** Electrons per shell (n = 1, 2, 3, …) from a configuration. */
export function shells(conf) { const out = []; for (const [k, v] of Object.entries(conf)) out[+k[0] - 1] = (out[+k[0] - 1] || 0) + v; return [...out].map((x) => x || 0); }

// ---------- VSEPR ----------
// [bonding domains, lone pairs] → electron-domain geometry, shape and the ideal angle(s)
export const VSEPR = {
  "2,0": ["linear", "linear", "180°"], "3,0": ["trigonal planar", "trigonal planar", "120°"], "2,1": ["trigonal planar", "bent", "<120°"],
  "4,0": ["tetrahedral", "tetrahedral", "109.5°"], "3,1": ["tetrahedral", "trigonal pyramidal", "107°"], "2,2": ["tetrahedral", "bent", "104.5°"],
  "5,0": ["trigonal bipyramidal", "trigonal bipyramidal", "90° and 120°"], "4,1": ["trigonal bipyramidal", "seesaw", "<90° and <120°"],
  "3,2": ["trigonal bipyramidal", "T-shaped", "<90°"], "2,3": ["trigonal bipyramidal", "linear", "180°"],
  "6,0": ["octahedral", "octahedral", "90°"], "5,1": ["octahedral", "square pyramidal", "<90°"], "4,2": ["octahedral", "square planar", "90°"],
};
/** Polar overall? Symmetric shapes with identical outer atoms cancel; anything else with polar bonds does not. */
export function polarShape(bp, lp, ligands, en) {
  const same = new Set(ligands).size === 1;
  const symmetric = ["2,0", "3,0", "4,0", "5,0", "6,0", "2,3", "4,2"].includes(`${bp},${lp}`);
  if (same && symmetric) return false;
  return ligands.some((l) => Math.abs((en[l] ?? 0) - (en.centre ?? 0)) > 0.05) || !symmetric || !same;
}
