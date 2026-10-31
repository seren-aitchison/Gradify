// A small molecule toolkit for the chemistry interactives:
//   parseSmiles(s)   a SMILES subset: organic-subset and bracket atoms, charges, explicit H counts, bonds
//                    - = # :, branches, ring closures (digits and %nn), aromatic lowercase atoms, @/@@
//                    chirality and / \ double-bond geometry. No reaction SMILES, wildcards or isotopes.
//   addHydrogens(m)  implicit hydrogens made explicit, using standard valences
//   embed(m)         3D coordinates from a simple force field (bond lengths from covalent radii, angles from
//                    hybridisation, planarity at sp² atoms, soft non-bonded repulsion, chirality and cis/trans
//                    restraints) minimised by gradient descent. Good enough to show shape and stereochemistry;
//                    not a substitute for a real force field (MMFF, UFF) or quantum chemistry.
//   cipRank, chirality, ez   Cahn–Ingold–Prelog priorities (breadth-first comparison of atomic numbers with
//                    duplicated atoms for multiple bonds), R/S at stereocentres and E/Z at double bonds. The
//                    simplified CIP rules cover textbook cases, not every subtle case.
import { bySym } from "./elements.js";

const ORGANIC = ["Cl", "Br", "B", "C", "N", "O", "P", "S", "F", "I"];
const VALENCE = { B: [3], C: [4], N: [3, 5], O: [2], P: [3, 5], S: [2, 4, 6], F: [1], Cl: [1], Br: [1], I: [1], H: [1] };
export const CPK = { H: 0xffffff, C: 0x909090, N: 0x3050f8, O: 0xff0d0d, F: 0x90e050, Cl: 0x1ff01f, Br: 0xa62929, I: 0x940094, S: 0xffff30, P: 0xff8000, B: 0xffb5b5, Na: 0xab5cf2, K: 0x8f40d4, Mg: 0x8aff00, Ca: 0x3dff00, Fe: 0xe06633, Zn: 0x7d80b0 };

export function parseSmiles(s) {
  const atoms = [], bonds = [], ring = {}; let prev = null, bond = null, dir = null; const stack = [];
  const addBond = (a, b, order, d) => { bonds.push({ a, b, order, dir: d || null }); atoms[a].nb.push(b); atoms[b].nb.push(a); };
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (c === "(") { stack.push(prev); i++; continue; }
    if (c === ")") { prev = stack.pop(); i++; continue; }
    if ("-=#:".includes(c)) { bond = { "-": 1, "=": 2, "#": 3, ":": 1.5 }[c]; i++; continue; }
    if (c === "/" || c === "\\") { dir = c; bond = 1; i++; continue; }
    if (c === "." ) { prev = null; i++; continue; }
    if (/\d|%/.test(c)) {
      const num = c === "%" ? s.slice(i + 1, i + 3) : c; i += c === "%" ? 3 : 1;
      if (ring[num]) { const r = ring[num]; const order = bond || r.bond || (atoms[prev].arom && atoms[r.atom].arom ? 1.5 : 1); addBond(r.atom, prev, order, dir || r.dir); atoms[r.atom].order[r.slot] = prev; atoms[prev].order.push(r.atom); delete ring[num]; }
      else { ring[num] = { atom: prev, bond, dir, slot: atoms[prev].order.length }; atoms[prev].order.push(null); }
      bond = null; dir = null; continue;
    }
    let el, arom = false, charge = 0, hx = null, chiral = null;
    if (c === "[") {
      const j = s.indexOf("]", i), body = s.slice(i + 1, j); i = j + 1;
      const m = body.match(/^(\d*)([A-Z][a-z]?|[a-z][a-z]?)(@@|@)?(H\d*)?([+-]\d*|[+-]+)?$/); if (!m) throw new Error(`Can't read [${body}]`);
      el = m[2]; if (el === el.toLowerCase()) { arom = true; el = el[0].toUpperCase() + el.slice(1); }
      chiral = m[3] || null; hx = m[4] ? Number(m[4].slice(1) || 1) : 0;
      if (m[5]) charge = /\d/.test(m[5]) ? Number(m[5][0] + "1") * Number(m[5].slice(1)) : (m[5][0] === "+" ? 1 : -1) * m[5].length;
    } else {
      const two = s.slice(i, i + 2), arom1 = "bcnops".includes(c);
      if (ORGANIC.includes(two)) { el = two; i += 2; } else if (ORGANIC.includes(c)) { el = c; i++; } else if (arom1) { el = c.toUpperCase(); arom = true; i++; } else throw new Error(`Unexpected "${c}" at ${i + 1}`);
    }
    const idx = atoms.length;
    atoms.push({ el, arom, charge, hx, chiral, nb: [], order: [] });
    if (prev != null) { const order = bond || (atoms[prev].arom && arom ? 1.5 : 1); addBond(prev, idx, order, dir); atoms[idx].order.push(prev); atoms[prev].order.push(idx); }
    if (chiral && hx) atoms[idx].order.push("H"); // the implicit H comes straight after the preceding atom
    prev = idx; bond = null; dir = null;
  }
  if (Object.keys(ring).length) throw new Error("Unclosed ring");
  return { atoms, bonds };
}

export function addHydrogens(m) {
  const { atoms, bonds } = m, n0 = atoms.length;
  for (let i = 0; i < n0; i++) {
    const a = atoms[i]; let h = a.hx;
    if (h == null) {
      const bs = bonds.filter((b) => b.a === i || b.b === i), aromN = bs.filter((b) => b.order === 1.5).length;
      let used = bs.reduce((t, b) => t + (b.order === 1.5 ? 1 : b.order), 0) + (aromN && !["O", "S"].includes(a.el) ? 1 : 0);
      if (a.el === "N" && a.arom && aromN === 2 && bs.length === 2) used = 3; // pyridine-type n
      if (a.el === "N" && a.arom && bs.length === 3) used = 3; // substituted pyrrole-type n, as in caffeine
      const v = (VALENCE[a.el] || [0]).find((x) => x >= used) ?? used;
      h = Math.max(0, v - used);
    }
    a.h = h;
    for (let k = 0; k < h; k++) { const j = atoms.length; atoms.push({ el: "H", charge: 0, nb: [i], order: [i], arom: false }); bonds.push({ a: i, b: j, order: 1 }); a.nb.push(j); const slot = a.order.indexOf("H"); if (slot >= 0) a.order[slot] = j; else a.order.push(j); }
  }
  return m;
}

const rad = (el) => (bySym[el]?.radius || 75) / 100; // Å
export function bondLength(a, b, order) { return (rad(a) + rad(b)) * (order === 2 ? 0.87 : order === 3 ? 0.78 : order === 1.5 ? 0.92 : 1); }
export function hybrid(m, i) { const bs = m.bonds.filter((b) => b.a === i || b.b === i), n = bs.length; if (bs.some((b) => b.order === 3) || bs.filter((b) => b.order === 2).length === 2) return "sp"; if (bs.some((b) => b.order === 2 || b.order === 1.5)) return "sp2"; if (m.atoms[i].el === "N" && bs.some((b) => { const o = b.a === i ? b.b : b.a; return m.bonds.some((c) => (c.a === o || c.b === o) && (c.order === 2 || c.order === 1.5)); }) && n === 3) return "sp2"; return n <= 1 ? "sp3" : "sp3"; }
const ANG = { sp: Math.PI, sp2: (2 * Math.PI) / 3, sp3: 1.9106 };

// signed volume of the tetrahedron a, b, c, d: negative when b → c → d runs anticlockwise seen from a
// (the SMILES @ sense), positive when clockwise (@@)
export const vol = (P, a, b, c, d) => { const v = (x) => [P[x][0] - P[a][0], P[x][1] - P[a][1], P[x][2] - P[a][2]], B = v(b), Cc = v(c), D = v(d); return B[0] * (Cc[1] * D[2] - Cc[2] * D[1]) - B[1] * (Cc[0] * D[2] - Cc[2] * D[0]) + B[2] * (Cc[0] * D[1] - Cc[1] * D[0]); };

export function embed(m, { iters = 1500, seed = 7 } = {}) {
  const { atoms, bonds } = m, n = atoms.length; let s = seed; const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296 - 0.5);
  const P = atoms.map(() => [rnd() * 4, rnd() * 4, rnd() * 4]);
  const terms = []; // [i, j, target distance, weight]
  const blen = new Map();
  for (const b of bonds) { const L = bondLength(atoms[b.a].el, atoms[b.b].el, b.order); terms.push([b.a, b.b, L, 4]); blen.set(`${b.a},${b.b}`, L); blen.set(`${b.b},${b.a}`, L); }
  const LP = (i) => { const a = atoms[i], v = { N: 5, O: 6, S: 6, P: 5 }[a.el]; return v ? Math.max(0, (v - (a.charge || 0) - atoms[i].nb.length - bonds.filter((b) => (b.a === i || b.b === i) && b.order > 1).reduce((t, b) => t + Math.ceil(b.order) - 1, 0)) / 2) : 0; };
  for (let i = 0; i < n; i++) { const nb = atoms[i].nb, hy = hybrid(m, i), th = (ANG[hy] || ANG.sp3) - (hy === "sp3" ? LP(i) * 0.0436 : 0); /* each lone pair closes an sp³ angle by about 2.5° */ for (let x = 0; x < nb.length; x++) for (let y = x + 1; y < nb.length; y++) { const a = blen.get(`${i},${nb[x]}`), b = blen.get(`${i},${nb[y]}`); terms.push([nb[x], nb[y], Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(th)), 1.5]); } }
  // planarity and cis/trans across double and aromatic bonds
  const planes = [];
  for (const b of bonds) if (b.order === 2 || b.order === 1.5) { const A = atoms[b.a].nb.filter((x) => x !== b.b), B = atoms[b.b].nb.filter((x) => x !== b.a); for (const p of A) for (const q of B) planes.push([p, b.a, b.b, q]); }
  for (const b of bonds) if (b.order === 2) {
    const dA = bonds.find((x) => x.dir && (x.a === b.a || x.b === b.a) && x !== b), dB = bonds.find((x) => x.dir && (x.a === b.b || x.b === b.b) && x !== b);
    if (dA && dB) {
      // "/" and "\" give the direction of each substituent bond as written left to right; same symbols on both sides = trans
      const sA = dA.b === b.a ? dA.dir : dA.dir === "/" ? "\\" : "/", sB = dB.a === b.b ? dB.dir : dB.dir === "/" ? "\\" : "/";
      const p = dA.a === b.a ? dA.b : dA.a, q = dB.a === b.b ? dB.b : dB.a, trans = sA === sB;
      terms.push([p, q, trans ? 3.8 : 2.95, 2]);
    }
  }
  const chir = atoms.map((a, i) => (a.chiral && a.order.length === 4 && a.order.every((x) => x != null && x !== "H") ? [i, a.order, a.chiral === "@" ? -1 : 1] : null)).filter(Boolean);
  const pairs = []; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if (!atoms[i].nb.includes(j) && !atoms[i].nb.some((k) => atoms[k].nb.includes(j))) pairs.push([i, j]);
  for (let it = 0; it < iters; it++) {
    const G = P.map(() => [0, 0, 0]), lr = it < iters * 0.6 ? 0.05 : 0.02;
    for (const [i, j, L, w] of terms) { const d = [P[j][0] - P[i][0], P[j][1] - P[i][1], P[j][2] - P[i][2]], r = Math.hypot(...d) || 1e-6, f = (w * (r - L)) / r; for (let k = 0; k < 3; k++) { G[i][k] += f * d[k]; G[j][k] -= f * d[k]; } }
    for (const [i, j] of pairs) { const d = [P[j][0] - P[i][0], P[j][1] - P[i][1], P[j][2] - P[i][2]], r = Math.hypot(...d) || 1e-6, min = atoms[i].el === "H" || atoms[j].el === "H" ? 2.0 : 2.8; if (r < min) { const f = (0.6 * (r - min)) / r; for (let k = 0; k < 3; k++) { G[i][k] += f * d[k]; G[j][k] -= f * d[k]; } } }
    // flatten: push the end atoms towards the plane through the double bond and one end (numerical gradient of the volume)
    for (const q of planes) { const V = vol(P, ...q); if (Math.abs(V) < 1e-4) continue; const h = 1e-3; for (const a of q) for (let k = 0; k < 3; k++) { P[a][k] += h; const V2 = vol(P, ...q); P[a][k] -= h; G[a][k] -= 0.3 * V * ((V2 - V) / h); } }
    for (const [c, ord, sign] of chir) { const V = vol(P, ord[0], ord[1], ord[2], ord[3]); if (V * sign > 0.4) continue; const h = 1e-3; for (const a of ord) for (let k = 0; k < 3; k++) { P[a][k] += h; const V2 = vol(P, ord[0], ord[1], ord[2], ord[3]); P[a][k] -= h; G[a][k] += 0.4 * sign * ((V2 - V) / h); } }
    for (let i = 0; i < n; i++) for (let k = 0; k < 3; k++) P[i][k] += lr * Math.max(-1, Math.min(1, G[i][k]));
  }
  const c = [0, 1, 2].map((k) => P.reduce((t, p) => t + p[k], 0) / n);
  m.pos = P.map((p) => p.map((v, k) => v - c[k]));
  return m;
}

export function molecule(smiles, opts) { return embed(addHydrogens(parseSmiles(smiles)), opts); }
export function formula(m) {
  const count = {}; for (const a of m.atoms) count[a.el] = (count[a.el] || 0) + 1;
  const order = ["C", "H", ...Object.keys(count).filter((e) => e !== "C" && e !== "H").sort()];
  const charge = m.atoms.reduce((t, a) => t + (a.charge || 0), 0);
  return { text: order.filter((e) => count[e]).map((e) => `${e}${count[e] > 1 ? count[e] : ""}`).join("") + (charge ? (charge > 0 ? "+" : "−").repeat(Math.abs(charge)) : ""), mass: Object.entries(count).reduce((t, [e, k]) => t + k * (bySym[e]?.mass || 0), 0), count };
}

// ---------- Cahn–Ingold–Prelog ----------
const Zof = (el) => bySym[el]?.Z || 0;
// spheres of atomic numbers outward from `from` through `start`, with duplicate atoms for multiple bonds
function spheres(m, from, start, depth = 6) {
  const out = []; let layer = [{ at: start, from, dup: false }];
  for (let d = 0; d < depth && layer.length; d++) {
    out.push(layer.map((x) => (x.dup ? Zof(m.atoms[x.at].el) : Zof(m.atoms[x.at].el))).sort((a, b) => b - a));
    const next = [];
    for (const x of layer) {
      if (x.dup) { for (let k = 0; k < 3; k++) next.push({ at: x.at, from: x.at, dup: true, ghost: true }); continue; }
      for (const nb of m.atoms[x.at].nb) {
        if (nb === x.from) continue;
        const b = m.bonds.find((y) => (y.a === x.at && y.b === nb) || (y.b === x.at && y.a === nb)), o = b.order === 1.5 ? 1.5 : b.order;
        next.push({ at: nb, from: x.at, dup: false });
        for (let k = 1; k < Math.ceil(o); k++) next.push({ at: nb, from: x.at, dup: true });
      }
      // a duplicated atom on the far side of a multiple bond, back to this atom
      const back = m.bonds.find((y) => (y.a === x.at && y.b === x.from) || (y.b === x.at && y.a === x.from));
      if (back && back.order > 1) for (let k = 1; k < Math.ceil(back.order); k++) next.push({ at: x.from, from: x.at, dup: true });
    }
    layer = next.filter((x) => !x.ghost);
  }
  return out;
}
const cmp = (A, B) => { for (let d = 0; d < Math.max(A.length, B.length); d++) { const a = A[d] || [], b = B[d] || []; for (let k = 0; k < Math.max(a.length, b.length); k++) { const x = a[k] ?? 0, y = b[k] ?? 0; if (x !== y) return y - x; } } return 0; };
// neighbours of atom c ranked by CIP priority (highest first); tie = true if two can't be separated
export function cipRank(m, c, neighbours = m.atoms[c].nb) {
  const sp = neighbours.map((nb) => ({ nb, s: spheres(m, c, nb) }));
  sp.sort((x, y) => cmp(x.s, y.s));
  const tie = sp.some((x, k) => k && cmp(sp[k - 1].s, x.s) === 0);
  return { order: sp.map((x) => x.nb), tie };
}
export function chirality(m, c) {
  if (m.atoms[c].nb.length !== 4) return null;
  const { order, tie } = cipRank(m, c); if (tie) return null;
  const [p1, p2, p3, p4] = order, P = m.pos;
  // viewed with p4 pointing away, p1 → p2 → p3 clockwise is R
  const V = vol(P, p4, p1, p2, p3);
  return V < 0 ? "R" : "S";
}
export function stereocentres(m) { return m.atoms.map((a, i) => (a.el === "C" && a.nb.length === 4 && !cipRank(m, i).tie ? i : -1)).filter((i) => i >= 0); }
export function ez(m, a, b) {
  const A = m.atoms[a].nb.filter((x) => x !== b), B = m.atoms[b].nb.filter((x) => x !== a);
  if (A.length < 2 || B.length < 2) return null;
  const ra = cipRank(m, a, A), rb = cipRank(m, b, B); if (ra.tie || rb.tie) return null;
  const hi = ra.order[0], hj = rb.order[0], P = m.pos;
  const d = Math.hypot(P[hi][0] - P[hj][0], P[hi][1] - P[hj][1], P[hi][2] - P[hj][2]);
  return d < 3.35 ? "Z" : "E";
}
