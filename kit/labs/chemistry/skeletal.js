// The Organic Notes Lab's chemistry: a skeletal-formula drawing model on hexagon paper, and everything worked out
// from a drawing. No DOM here, so all of it is unit-tested (tests/skeletal.test.mjs); kit/labs/chemistry/sketch.js
// is the drawing surface.
//   geometry   bond length 1. The paper is a honeycomb whose hexagons stand on a vertex (the textbook benzene), so a
//              zig-zag chain drawn along it has 120° angles and any six of its points close into a ring.
//              snapPoint/snapCentre find the nearest lattice point and hexagon centre; nextDir picks the best
//              direction for a new bond (zig-zag after a chain, the largest gap at a branch, straight through an
//              sp carbon); chainPath lays a zig-zag chain along a drag; ringPath places a ring on empty paper,
//              on an atom (spiro) or on a bond (fused), on the less crowded side.
//   analyse    implicit hydrogens from standard valences (with charges), Hill formula, Mr, empirical formula,
//              degree of unsaturation, rings, aromatic rings (Kekulé benzene rings, fused rings included),
//              functional groups with primary/secondary/tertiary classes, carbon classes and hybridisation,
//              stereocentres, C=C bonds that can show E/Z isomerism, valence errors, a structural formula,
//              canonical SMILES-like text and a hash that is the same for every drawing of one molecule.
//   name       IUPAC names for acyclic molecules with halogens, alcohols, aldehydes, ketones, carboxylic acids,
//              C=C and C≡C, alkyl branches included, with the reasoning; anything else (rings, ethers, esters,
//              nitrogen) is named from a library of common compounds when it is one of them, or left unnamed
//              with the reason. Chain choice follows the A-level rule (most multiple bonds, then longest chain,
//              as in IUPAC 1993); IUPAC 2013 puts chain length first, which differs only for unusual branched alkenes.
import { MASS } from "../../diagrams/chem-core.js";
import { parseSmiles } from "./mol.js";

const R3 = Math.sqrt(3), DEG = Math.PI / 180;
export const ELEMENTS = ["C", "H", "N", "O", "S", "P", "F", "Cl", "Br", "I", "B"];
const HAL = new Set(["F", "Cl", "Br", "I"]);
const VAL = { C: [4], H: [1], N: [3], O: [2], S: [2, 4, 6], P: [3, 5], F: [1], Cl: [1], Br: [1], I: [1], B: [3] };

/** The valences an atom may have, given its charge (a carbocation or carbanion makes three bonds). */
export function valences(el, q = 0) {
  if (!q) return VAL[el] || [0];
  if (el === "C") return [3];
  if (el === "N" || el === "P") return q > 0 ? [4] : [2];
  if (el === "O" || el === "S") return q > 0 ? [3] : [1];
  if (el === "B") return q < 0 ? [4] : [2];
  if (HAL.has(el)) return q < 0 ? [0] : [2];
  return [0];
}

// ---------- the drawing ----------
export const empty = () => ({ atoms: [], bonds: [], next: 1 });
export const clone = (m) => JSON.parse(JSON.stringify(m));
export const atomOf = (m, id) => m.atoms.find((a) => a.id === id);
export const bondOf = (m, id) => m.bonds.find((b) => b.id === id);
export const bondBetween = (m, a, b) => m.bonds.find((x) => (x.a === a && x.b === b) || (x.a === b && x.b === a));
export const neighbours = (m, id) => m.bonds.filter((b) => b.a === id || b.b === id).map((b) => ({ bond: b, atom: atomOf(m, b.a === id ? b.b : b.a) }));
export function addAtom(m, x, y, el = "C") { const a = { id: m.next++, x, y, el, charge: 0 }; m.atoms.push(a); return a; }
export function addBond(m, a, b, order = 1) {
  if (a === b) return null;
  const old = bondBetween(m, a, b); if (old) return old;
  const x = { id: m.next++, a, b, order }; m.bonds.push(x); return x;
}
/** The atom at (x, y), or null. */
export function atomAt(m, x, y, r = 0.32) {
  let best = null, bd = r;
  for (const a of m.atoms) { const d = Math.hypot(a.x - x, a.y - y); if (d < bd) { bd = d; best = a; } }
  return best;
}
export function bondAt(m, x, y, r = 0.24) {
  let best = null, bd = r;
  for (const b of m.bonds) {
    const p = atomOf(m, b.a), q = atomOf(m, b.b), dx = q.x - p.x, dy = q.y - p.y, L2 = dx * dx + dy * dy || 1;
    const t = Math.max(0, Math.min(1, ((x - p.x) * dx + (y - p.y) * dy) / L2)), d = Math.hypot(p.x + t * dx - x, p.y + t * dy - y);
    if (d < bd && t > 0.12 && t < 0.88) { bd = d; best = b; }
  }
  return best;
}
/** An existing atom at (x, y) if there is one (so rings and chains close onto it), else a new one. */
export function placeAtom(m, x, y, el = "C") { return atomAt(m, x, y, 0.3) || addAtom(m, x, y, el); }
export function removeAtom(m, id) { m.atoms = m.atoms.filter((a) => a.id !== id); m.bonds = m.bonds.filter((b) => b.a !== id && b.b !== id); }
/** Removes a bond, and any carbon it leaves on its own. */
export function removeBond(m, id) {
  const b = bondOf(m, id); if (!b) return;
  m.bonds = m.bonds.filter((x) => x.id !== id);
  for (const a of [b.a, b.b]) { const at = atomOf(m, a); if (at && at.el === "C" && !neighbours(m, a).length) removeAtom(m, a); }
}

// ---------- hexagon paper ----------
// Lattice vectors of the honeycomb's triangular sub-lattice, screen coordinates (y down).
const A1 = [R3, 0], A2 = [R3 / 2, -1.5];
function nearestTri(x, y) {
  const j = -y / 1.5, i = (x - (R3 / 2) * j) / R3; let best = null, bd = Infinity;
  for (const I of [Math.floor(i), Math.ceil(i)]) for (const J of [Math.floor(j), Math.ceil(j)]) {
    const px = I * A1[0] + J * A2[0], py = I * A1[1] + J * A2[1], d = Math.hypot(px - x, py - y);
    if (d < bd) { bd = d; best = [px, py]; }
  }
  return best;
}
/** The nearest point of the hexagon paper: [x, y, site] with site "A" (bonds at 30°, 150°, 270°) or "B". */
export function snapPoint(x, y) {
  const a = nearestTri(x, y), b0 = nearestTri(x, y + 1), b = [b0[0], b0[1] - 1];
  return Math.hypot(a[0] - x, a[1] - y) <= Math.hypot(b[0] - x, b[1] - y) ? [a[0], a[1], "A"] : [b[0], b[1], "B"];
}
/** The centre of the paper's hexagon nearest (x, y). */
export function snapCentre(x, y) { const c = nearestTri(x, y - 1); return [c[0], c[1] + 1]; }
/** "A", "B" or null: whether (x, y) is on the paper's lattice. */
export function siteOf(x, y) { const [px, py, s] = snapPoint(x, y); return Math.hypot(px - x, py - y) < 0.02 ? s : null; }

const ang = (p, q) => Math.atan2(q.y - p.y, q.x - p.x);
const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));
const sep = (a, b) => Math.abs(wrap(a - b));

/** The best direction (radians, screen) for a new bond from atom id. */
export function nextDir(m, id) {
  const a = atomOf(m, id), nb = neighbours(m, id);
  if (!nb.length) return siteOf(a.x, a.y) === "A" ? 30 * DEG : -30 * DEG;
  const dirs = nb.map((n) => ang(a, n.atom));
  // sp carbon (a triple bond, or two double bonds): straight on
  if (nb.length === 1 && (nb[0].bond.order === 3 || (nb[0].bond.order === 2 && neighbours(m, nb[0].atom.id).some((n) => n.atom.id !== id && n.bond.order === 2)))) return dirs[0] + Math.PI;
  if (nb.length === 1) {
    const p = nb[0].atom, opts = [dirs[0] + 120 * DEG, dirs[0] - 120 * DEG];
    const gp = neighbours(m, p.id).find((n) => n.atom.id !== id);
    // zig-zag: the new bond runs parallel to the bond before the last one
    if (gp) { const want = ang(gp.atom, p); return sep(opts[0], want) <= sep(opts[1], want) ? opts[0] : opts[1]; }
    // otherwise stay on the paper, then prefer rightwards, then upwards
    const score = (t) => (siteOf(a.x + Math.cos(t), a.y + Math.sin(t)) ? 10 : 0) + Math.cos(t) - 0.01 * Math.sin(t);
    return score(opts[0]) >= score(opts[1]) ? opts[0] : opts[1];
  }
  // the bisector of the largest gap between the existing bonds
  const s = dirs.map((d) => (d + 2 * Math.PI) % (2 * Math.PI)).sort((x, y) => x - y); let gap = -1, at = 0;
  for (let i = 0; i < s.length; i++) { const lo = s[i], hi = i + 1 < s.length ? s[i + 1] : s[0] + 2 * Math.PI; if (hi - lo > gap + 1e-9) { gap = hi - lo; at = lo + (hi - lo) / 2; } }
  return wrap(at);
}

/** Adds one bond from atom id in the best direction; returns the new (or joined) atom. */
export function grow(m, id, el = "C") {
  const a = atomOf(m, id), t = nextDir(m, id), b = placeAtom(m, a.x + Math.cos(t), a.y + Math.sin(t), el);
  addBond(m, a.id, b.id, 1); return b;
}

/** Snaps an angle to the nearest multiple of 30°. */
export const snapAngle = (t) => Math.round(t / (30 * DEG)) * 30 * DEG;

/**
 * The points of a chain drawn by dragging from (x0, y0) to (x1, y1): one bond along the snapped direction for a short
 * drag, or a zig-zag of n bonds along it (each bond ±30° from the drag line, so on the paper when the drag is).
 * from: the atom the chain starts at, if any (its existing bonds decide which way the zig-zag starts).
 */
export function chainPath(m, x0, y0, x1, y1, from = null) {
  const d = Math.hypot(x1 - x0, y1 - y0), phi = snapAngle(Math.atan2(y1 - y0, x1 - x0));
  if (d < 1.25) return [[x0, y0], [x0 + Math.cos(phi), y0 + Math.sin(phi)]];
  const n = Math.max(2, Math.min(30, Math.round(d / (R3 / 2))));
  const start = from ? neighbours(m, from).map((nb) => ang({ x: x0, y: y0 }, nb.atom)) : [];
  const score = (s) => { const t = phi + s * 30 * DEG, x = x0 + Math.cos(t), y = y0 + Math.sin(t); return (siteOf(x0, y0) && siteOf(x, y) ? 10 : 0) + (start.length ? Math.min(...start.map((u) => sep(u, t))) : 0) + (s < 0 ? 0.01 : 0); };
  let s = score(-1) >= score(1) ? -1 : 1; const pts = [[x0, y0]];
  for (let k = 0; k < n; k++) { const [px, py] = pts[pts.length - 1], t = phi + s * 30 * DEG; pts.push([px + Math.cos(t), py + Math.sin(t)]); s = -s; }
  return pts;
}
/** Adds a chain (from chainPath) to the drawing. */
export function addChain(m, pts, fromId = null) {
  let prev = fromId != null ? atomOf(m, fromId) : placeAtom(m, pts[0][0], pts[0][1]);
  for (const [x, y] of pts.slice(1)) { const a = placeAtom(m, x, y); addBond(m, prev.id, a.id, 1); prev = a; }
  return prev;
}

/**
 * The vertices of an n-membered ring placed on target: { type: "point", x, y, snap } (a ring standing on a vertex,
 * centred on the nearest hexagon of the paper when snap is on), { type: "atom", id } (spiro, on the free side) or
 * { type: "bond", id } (fused, on the less crowded side). Returns [[x, y], ...] in order round the ring.
 */
export function ringPath(m, n, target) {
  const R = 1 / (2 * Math.sin(Math.PI / n)), ap = 1 / (2 * Math.tan(Math.PI / n)), step = (2 * Math.PI) / n;
  const around = (cx, cy, x0, y0, dir) => Array.from({ length: n }, (_, k) => { const t = Math.atan2(y0 - cy, x0 - cx) + dir * k * step; return [cx + R * Math.cos(t), cy + R * Math.sin(t)]; });
  if (target.type === "atom") {
    const a = atomOf(m, target.id), t = nextDir(m, a.id);
    return around(a.x + R * Math.cos(t), a.y + R * Math.sin(t), a.x, a.y, 1);
  }
  if (target.type === "bond") {
    const b = bondOf(m, target.id), u = atomOf(m, b.a), v = atomOf(m, b.b), mx = (u.x + v.x) / 2, my = (u.y + v.y) / 2;
    const L = Math.hypot(v.x - u.x, v.y - u.y) || 1, nx = -(v.y - u.y) / L, ny = (v.x - u.x) / L;
    const crowd = (s) => { const cx = mx + s * nx * ap, cy = my + s * ny * ap; return m.atoms.reduce((t, a) => (a.id === u.id || a.id === v.id ? t : t + Math.max(0, 1.6 * R - Math.hypot(a.x - cx, a.y - cy))), 0); };
    const s = crowd(1) <= crowd(-1) ? 1 : -1, cx = mx + s * nx * ap, cy = my + s * ny * ap;
    // go round from u so that the second vertex is v
    const t0 = Math.atan2(u.y - cy, u.x - cx), t1 = Math.atan2(v.y - cy, v.x - cx), dir = wrap(t1 - t0) > 0 ? 1 : -1;
    return around(cx, cy, u.x, u.y, dir);
  }
  let { x: cx, y: cy } = target;
  if (target.snap && n === 6) [cx, cy] = snapCentre(cx, cy);
  const t0 = -90 * DEG + (n % 4 === 0 ? step / 2 : 0);
  return around(cx, cy, cx + R * Math.cos(t0), cy + R * Math.sin(t0), 1);
}

/** Adds a ring (from ringPath). aromatic: alternate double bonds round it where every atom has room for one. */
export function addRing(m, pts, aromatic = false) {
  const ids = pts.map(([x, y]) => placeAtom(m, x, y).id), bonds = ids.map((id, k) => addBond(m, id, ids[(k + 1) % ids.length], 1));
  if (aromatic) kekulise(m, bonds);
  return ids;
}
function hasDouble(m, id, except) { return neighbours(m, id).some((n) => n.bond !== except && n.bond.order >= 2); }
function room(m, id) { const a = atomOf(m, id), used = neighbours(m, id).reduce((t, n) => t + n.bond.order, 0); return Math.max(...valences(a.el, a.charge)) - used; }
function kekulise(m, bonds) {
  let best = null;
  for (const p of [0, 1]) {
    const pick = bonds.filter((_, k) => k % 2 === p);
    const ok = pick.filter((b) => b.order === 2 || (!hasDouble(m, b.a, b) && !hasDouble(m, b.b, b) && room(m, b.a) >= 1 && room(m, b.b) >= 1));
    const score = ok.length + pick.filter((b) => b.order === 2).length * 0.5;
    if (!best || score > best.score) best = { score, ok };
  }
  for (const b of best.ok) b.order = 2;
}

/** Sets an atom's element (charges reset). */
export function setElement(m, id, el) { const a = atomOf(m, id); if (a) { a.el = el; a.charge = 0; } }
export function cycleOrder(m, id) { const b = bondOf(m, id); if (b) b.order = (b.order % 3) + 1; }
export function bounds(m) {
  if (!m.atoms.length) return { x0: -3, y0: -2, x1: 3, y1: 2 };
  const xs = m.atoms.map((a) => a.x), ys = m.atoms.map((a) => a.y);
  return { x0: Math.min(...xs), y0: Math.min(...ys), x1: Math.max(...xs), y1: Math.max(...ys) };
}

// ---------- the molecule graph ----------
// Explicit hydrogens drawn on a heavy atom are folded into its hydrogen count, so a drawing with or without them is
// the same molecule. G: { n, el[], q[], h[], hx[] (implicit H only), adj[i] = [{ j, o, bond }], id[] (drawing ids) }.
export function graph(m) {
  const keep = m.atoms.filter((a) => !(a.el === "H" && !a.charge && neighbours(m, a.id).length === 1 && neighbours(m, a.id)[0].atom.el !== "H" && neighbours(m, a.id)[0].bond.order === 1));
  const idx = new Map(keep.map((a, i) => [a.id, i]));
  const G = { n: keep.length, el: keep.map((a) => a.el), q: keep.map((a) => a.charge || 0), id: keep.map((a) => a.id), adj: keep.map(() => []), h: [], hx: [], hExplicit: keep.map(() => 0), over: [] };
  for (const b of m.bonds) {
    const i = idx.get(b.a), j = idx.get(b.b);
    if (i != null && j != null) { G.adj[i].push({ j, o: b.order, bond: b.id }); G.adj[j].push({ j: i, o: b.order, bond: b.id }); }
    else if (i != null) G.hExplicit[i]++; else if (j != null) G.hExplicit[j]++;
  }
  for (let i = 0; i < G.n; i++) {
    const used = G.adj[i].reduce((t, e) => t + e.o, 0) + G.hExplicit[i], vs = valences(G.el[i], G.q[i]);
    const v = vs.find((x) => x >= used); G.over[i] = v == null ? used - Math.max(...vs) : 0;
    G.hx[i] = v == null ? 0 : v - used; G.h[i] = G.hx[i] + G.hExplicit[i];
  }
  return G;
}
/** The same graph from SMILES (via kit/labs/chemistry/mol.js), for the library and the tests. */
export function graphFromSmiles(s) {
  const p = parseSmiles(s), m = empty();
  p.atoms.forEach((a) => { const x = addAtom(m, 0, 0, a.el); x.charge = a.charge || 0; x.hx = a.hx; });
  // aromatic bonds become an alternating Kekulé pattern, as a learner would draw them: every aromatic carbon (and
  // pyridine-type nitrogen) gets exactly one double bond
  const orders = p.bonds.map((b) => (b.order === 1.5 ? 0 : b.order)), dbl = new Set();
  const arBonds = p.bonds.map((b, k) => k).filter((k) => orders[k] === 0);
  const needs = p.atoms.map((a, i) => a.arom && (a.el === "C" || (a.el === "N" && !a.hx && p.bonds.filter((b) => b.a === i || b.b === i).length === 2)));
  const has = (i) => p.bonds.some((b, k) => (b.a === i || b.b === i) && (orders[k] === 2 || dbl.has(k)));
  const solve = (x) => {
    if (x === arBonds.length) return needs.every((nd, i) => !nd || has(i));
    const k = arBonds[x], { a, b } = p.bonds[k];
    if (needs[a] && needs[b] && !has(a) && !has(b)) { dbl.add(k); if (solve(x + 1)) return true; dbl.delete(k); }
    return solve(x + 1);
  };
  solve(0);
  p.bonds.forEach((b, k) => addBond(m, m.atoms[b.a].id, m.atoms[b.b].id, orders[k] || (dbl.has(k) ? 2 : 1)));
  // explicit H counts from bracket atoms become drawn hydrogens
  for (const [n, a] of p.atoms.entries()) if (a.hx != null) { const at = m.atoms[n], used = neighbours(m, at.id).reduce((t, x) => t + x.bond.order, 0), want = a.hx, vs = valences(at.el, at.charge), v = vs.find((x) => x >= used); if (v != null && v - used !== want) for (let k = 0; k < want; k++) addBond(m, at.id, addAtom(m, 0, 0, "H").id, 1); }
  return m;
}

// small helpers on G
const nbs = (G, i) => G.adj[i];
const isC = (G, i) => G.el[i] === "C";
const cNbs = (G, i) => G.adj[i].filter((e) => isC(G, e.j));
function h53(str) { let a = 0xdeadbeef, b = 0x41c6ce57; for (let i = 0; i < str.length; i++) { const c = str.charCodeAt(i); a = Math.imul(a ^ c, 2654435761); b = Math.imul(b ^ c, 1597334677); } a = Math.imul(a ^ (a >>> 16), 2246822507) ^ Math.imul(b ^ (b >>> 13), 3266489909); b = Math.imul(b ^ (b >>> 16), 2246822507) ^ Math.imul(a ^ (a >>> 13), 3266489909); return (4294967296 * (2097151 & b) + (a >>> 0)).toString(36); }

/** Rings of up to `max` atoms (each once, as a list of atom indices in order). */
export function rings(G, max = 8) {
  const out = [], seen = new Set();
  for (let s = 0; s < G.n; s++) {
    const path = [s], on = new Set([s]);
    const dfs = (u) => {
      if (out.length > 400) return;
      for (const { j } of G.adj[u]) {
        if (j === s && path.length >= 3) { const key = [...path].sort((a, b) => a - b).join(","); if (!seen.has(key)) { seen.add(key); out.push([...path]); } continue; }
        if (j <= s || on.has(j) || path.length >= max) continue;
        path.push(j); on.add(j); dfs(j); path.pop(); on.delete(j);
      }
    };
    dfs(s);
  }
  return out.sort((a, b) => a.length - b.length);
}
const orderOf = (G, i, j) => G.adj[i].find((e) => e.j === j)?.o || 0;

/** Aromatic rings: six-membered rings of sp² C (or N) that each have one double bond, in the ring or a fused aromatic ring. */
export function aromatic(G, rs = rings(G, 6)) {
  const six = rs.filter((r) => r.length === 6 && r.every((i) => (G.el[i] === "C" || G.el[i] === "N") && G.adj[i].filter((e) => e.o === 2).length === 1 && !G.adj[i].some((e) => e.o === 3)));
  const arom = new Set(), atoms = new Set(); let grew = true;
  const alternating = (r) => { const o = r.map((a, k) => orderOf(G, a, r[(k + 1) % 6])); return o.every((x, k) => x !== o[(k + 1) % 6] && (x === 1 || x === 2)); };
  for (const r of six) if (alternating(r)) { arom.add(r); r.forEach((a) => atoms.add(a)); }
  while (grew) {
    grew = false;
    for (const r of six) if (!arom.has(r) && r.every((i) => { const d = G.adj[i].find((e) => e.o === 2); return r.includes(d.j) || atoms.has(d.j); }) && r.some((i) => atoms.has(i))) { arom.add(r); r.forEach((a) => atoms.add(a)); grew = true; }
  }
  const bonds = new Set();
  for (const r of arom) r.forEach((a, k) => { const b = r[(k + 1) % 6]; bonds.add(`${Math.min(a, b)}-${Math.max(a, b)}`); });
  return { rings: [...arom], atoms, bonds };
}

// colour refinement (Weisfeiler–Lehman) labels; skip removes atoms from the graph (for stereocentres)
function refine(G, ar, skip = new Set(), iters = G.n + 1) {
  const bt = (i, j, o) => (ar.bonds.has(`${Math.min(i, j)}-${Math.max(i, j)}`) ? "a" : o);
  let lab = G.el.map((e, i) => `${e}${G.q[i]}h${G.h[i]}${ar.atoms.has(i) ? "a" : ""}`);
  for (let t = 0; t < Math.min(iters, 40); t++) lab = lab.map((l, i) => (skip.has(i) ? l : h53(`${l}|${G.adj[i].filter((e) => !skip.has(e.j)).map((e) => `${bt(i, e.j, e.o)}:${lab[e.j]}`).sort().join(",")}`)));
  return lab;
}

const SUB = "₀₁₂₃₄₅₆₇₈₉";
export const subs = (s) => String(s).replace(/\d/g, (d) => SUB[d]);
function hill(counts) {
  const ks = Object.keys(counts).filter((k) => counts[k] > 0);
  const order = counts.C ? ["C", "H", ...ks.filter((k) => k !== "C" && k !== "H").sort()] : ks.sort();
  return order.filter((k) => counts[k]).map((k) => `${k}${counts[k] > 1 ? counts[k] : ""}`).join("");
}
const gcd = (a, b) => (b ? gcd(b, a % b) : a);

/** Everything worked out from a drawing. */
export function analyse(m) {
  const G = graph(m), n = G.n, out = { G, atoms: n, empty: n === 0 };
  if (!n) return Object.assign(out, { formula: "", counts: {}, mass: 0, groups: [], problems: [], stereo: [], ez: [], name: null, hash: "" });
  // components
  const comp = new Array(n).fill(-1); let nc = 0;
  for (let s = 0; s < n; s++) if (comp[s] < 0) { const st = [s]; comp[s] = nc; while (st.length) { const u = st.pop(); for (const { j } of G.adj[u]) if (comp[j] < 0) { comp[j] = nc; st.push(j); } } nc++; }
  const counts = {}; for (let i = 0; i < n; i++) { counts[G.el[i]] = (counts[G.el[i]] || 0) + 1; if (G.h[i]) counts.H = (counts.H || 0) + G.h[i]; }
  const charge = G.q.reduce((a, b) => a + b, 0), nBonds = G.adj.reduce((t, a) => t + a.length, 0) / 2;
  const rs = rings(G, 8), ar = aromatic(G, rs);
  const X = ["F", "Cl", "Br", "I"].reduce((t, k) => t + (counts[k] || 0), 0);
  const dou = ((2 * (counts.C || 0) + 2 + (counts.N || 0) + (counts.P || 0) - (counts.H || 0) - X) / 2);
  const g = Object.values(counts).reduce(gcd, 0), emp = Object.fromEntries(Object.entries(counts).map(([k, v]) => [k, v / g]));
  const problems = [];
  for (let i = 0; i < n; i++) if (G.over[i] > 0) {
    const bonds = G.adj[i].reduce((t, e) => t + e.o, 0) + G.hExplicit[i];
    problems.push({ atom: G.id[i], text: `${G.el[i]}${G.q[i] ? (G.q[i] > 0 ? "⁺" : "⁻") : ""} has ${bonds} bonds, but can make at most ${Math.max(...valences(G.el[i], G.q[i]))}.${G.el[i] === "N" && bonds === 4 && !G.q[i] ? " A nitrogen with four bonds carries a + charge." : G.el[i] === "O" && bonds === 3 && !G.q[i] ? " An oxygen with three bonds carries a + charge." : ""}` });
  }
  const hyb = G.el.map((e, i) => { const d = G.adj[i].filter((x) => x.o === 2).length; return G.adj[i].some((x) => x.o === 3) || d >= 2 ? "sp" : d || ar.atoms.has(i) ? "sp2" : "sp3"; });
  const cls = G.el.map((e, i) => (e === "C" ? cNbs(G, i).length : -1));
  const carbon = { primary: 0, secondary: 0, tertiary: 0, quaternary: 0, sp3: 0, sp2: 0, sp: 0 };
  for (let i = 0; i < n; i++) if (G.el[i] === "C") { const k = cls[i]; if (k <= 1) carbon.primary++; else if (k === 2) carbon.secondary++; else if (k === 3) carbon.tertiary++; else carbon.quaternary++; carbon[hyb[i]]++; }
  const groups = functionalGroups(G, ar, cls);
  // stereocentres: sp³ carbon with four different groups (hydrogen counts as one)
  const stereo = [];
  for (let i = 0; i < n; i++) {
    if (G.el[i] !== "C" || hyb[i] !== "sp3" || G.adj[i].length + G.h[i] !== 4 || G.h[i] > 1) continue;
    const lab = refine(G, ar, new Set([i])), ls = G.adj[i].map((e) => `${e.o}:${lab[e.j]}`); if (G.h[i]) ls.push("H");
    if (new Set(ls).size === 4) stereo.push(G.id[i]);
  }
  // C=C bonds with E/Z isomers: not in a ring of fewer than eight, two different groups on each end
  const ez = [];
  for (let i = 0; i < n; i++) for (const e of G.adj[i]) {
    if (e.j < i || e.o !== 2 || G.el[i] !== "C" || G.el[e.j] !== "C" || ar.atoms.has(i)) continue;
    const ring = rs.find((r) => { if (r.length >= 8 || !r.includes(i) || !r.includes(e.j)) return false; const d = Math.abs(r.indexOf(i) - r.indexOf(e.j)); return d === 1 || d === r.length - 1; });
    if (ring) continue;
    const lab = refine(G, ar, new Set([i, e.j]));
    const ends = [[i, e.j], [e.j, i]].map(([a, b]) => { const ls = G.adj[a].filter((x) => x.j !== b).map((x) => `${x.o}:${lab[x.j]}`); for (let k = 0; k < G.h[a]; k++) ls.push("H"); return ls; });
    if (ends.every((ls) => ls.length === 2 && ls[0] !== ls[1])) ez.push(e.bond);
  }
  const lab = refine(G, ar), hash = h53(`${hill(counts)}|${charge}|${lab.slice().sort().join(".")}`);
  Object.assign(out, {
    counts, formula: hill(counts), charge, mass: Object.entries(counts).reduce((t, [k, v]) => t + (MASS[k] || 0) * v, 0),
    empirical: hill(emp), dou, ringCount: nBonds - n + nc, components: nc, aromaticRings: ar.rings.length, aromaticAtoms: [...ar.atoms].map((i) => G.id[i]),
    problems, hyb: Object.fromEntries(G.id.map((id, i) => [id, hyb[i]])), hcount: Object.fromEntries(G.id.map((id, i) => [id, G.hx[i]])),
    carbonClass: Object.fromEntries(G.id.map((id, i) => [id, cls[i]])), carbon, groups, stereo, ez, hash,
  });
  out.smiles = smiles(G);
  out.condensed = nc === 1 && out.ringCount === 0 ? condensed(G) : null;
  out.name = nc === 1 && !problems.length && !charge ? nameOf(G, rs, out) : null;
  return out;
}

// ---------- functional groups ----------
function functionalGroups(G, ar, cls) {
  const out = [], used = new Set(), n = G.n;
  const add = (key, label, atoms) => { out.push({ key, label, atoms: atoms.map((i) => G.id[i]) }); atoms.forEach((a) => used.add(a)); };
  const cl = (k) => (k <= 1 ? "primary" : k === 2 ? "secondary" : k === 3 ? "tertiary" : "quaternary");
  const oxo = (i) => G.adj[i].find((e) => e.o === 2 && G.el[e.j] === "O" && G.adj[e.j].length === 1);
  // nitro first: it has its own oxygens
  for (let i = 0; i < n; i++) if (G.el[i] === "N") { const os = G.adj[i].filter((e) => G.el[e.j] === "O" && G.adj[e.j].length === 1); if (os.length === 2 && G.adj[i].length === 3) add("nitro", "Nitro group (–NO₂)", [i, ...os.map((e) => e.j)]); }
  for (let i = 0; i < n; i++) {
    if (G.el[i] !== "C") continue; const d = oxo(i); if (!d || used.has(d.j)) continue;
    const others = G.adj[i].filter((e) => e.j !== d.j), O1 = others.find((e) => e.o === 1 && G.el[e.j] === "O"), N1 = others.find((e) => e.o === 1 && G.el[e.j] === "N"), X1 = others.find((e) => e.o === 1 && HAL.has(G.el[e.j]));
    if (O1) {
      const o = O1.j, beyond = G.adj[o].find((e) => e.j !== i);
      if (G.h[o] >= 1) add("acid", "Carboxylic acid (–COOH)", [i, d.j, o]);
      else if (G.q[o] === -1) add("carboxylate", "Carboxylate ion (–COO⁻)", [i, d.j, o]);
      else if (beyond && G.el[beyond.j] === "C" && oxo(beyond.j)) { if (!used.has(o)) add("anhydride", "Acid anhydride (–CO–O–CO–)", [i, d.j, o, beyond.j, oxo(beyond.j).j]); }
      else if (beyond && G.el[beyond.j] === "C") add("ester", "Ester (–COO–)", [i, d.j, o]);
      else continue;
    } else if (N1) { const k = G.adj[N1.j].filter((e) => G.el[e.j] === "C").length; add("amide", `Amide (${k === 1 ? "primary" : k === 2 ? "secondary" : "tertiary"})`, [i, d.j, N1.j]); }
    else if (X1) add("acyl-halide", `Acyl ${{ F: "fluoride", Cl: "chloride", Br: "bromide", I: "iodide" }[G.el[X1.j]]}`, [i, d.j, X1.j]);
    else if (G.h[i] >= 1) add("aldehyde", "Aldehyde (–CHO)", [i, d.j]);
    else if (cNbs(G, i).length === 2) add("ketone", "Ketone (C=O)", [i, d.j]);
    else add("carbonyl", "Carbonyl group (C=O)", [i, d.j]);
  }
  for (let i = 0; i < n; i++) {
    if (used.has(i)) continue; const e = G.el[i];
    if (e === "O" && G.adj[i].length === 1 && G.adj[i][0].o === 1 && G.h[i] === 1 && G.el[G.adj[i][0].j] === "C") { const c = G.adj[i][0].j; if (ar.atoms.has(c)) add("phenol", "Phenol (–OH on a benzene ring)", [i, c]); else add("alcohol", `Alcohol (${cl(cls[c])})`, [i, c]); }
    else if (e === "O" && G.adj[i].length === 2 && G.adj[i].every((x) => x.o === 1 && G.el[x.j] === "C")) add("ether", "Ether (C–O–C)", [i]);
    else if (e === "N" && G.adj[i].every((x) => x.o === 1) && G.adj[i].some((x) => G.el[x.j] === "C") && !G.adj[i].some((x) => G.el[x.j] === "O")) { const k = G.adj[i].filter((x) => G.el[x.j] === "C").length, aro = G.adj[i].some((x) => ar.atoms.has(x.j)); add("amine", G.q[i] > 0 && k === 4 ? "Quaternary ammonium ion" : `${aro ? "Aromatic amine" : "Amine"} (${k === 1 ? "primary" : k === 2 ? "secondary" : "tertiary"})`, [i]); }
    else if (e === "N" && G.adj[i].some((x) => x.o === 3 && G.el[x.j] === "C")) add("nitrile", "Nitrile (–C≡N)", [i, G.adj[i].find((x) => x.o === 3).j]);
    else if (e === "N" && G.adj[i].some((x) => x.o === 2 && G.el[x.j] === "C") && !ar.atoms.has(i)) add("imine", "Imine (C=N)", [i]);
    else if (HAL.has(e) && G.adj[i].length === 1 && G.el[G.adj[i][0].j] === "C") { const c = G.adj[i][0].j, nm = { F: "Fluoro", Cl: "Chloro", Br: "Bromo", I: "Iodo" }[e]; add(ar.atoms.has(c) ? "haloarene" : "haloalkane", ar.atoms.has(c) ? `Haloarene (${nm.toLowerCase()})` : `Haloalkane (${cl(cls[c])}, ${nm.toLowerCase()})`, [i, c]); }
    else if (e === "S" && G.adj[i].length === 1 && G.h[i] === 1) add("thiol", "Thiol (–SH)", [i]);
  }
  for (const r of ar.rings) out.push({ key: "arene", label: "Benzene ring (arene)", atoms: r.map((i) => G.id[i]) });
  for (let i = 0; i < n; i++) for (const e of G.adj[i]) if (e.j > i && G.el[i] === "C" && G.el[e.j] === "C") {
    if (e.o === 2 && !(ar.atoms.has(i) && ar.atoms.has(e.j))) out.push({ key: "alkene", label: "Alkene (C=C)", atoms: [G.id[i], G.id[e.j]] });
    if (e.o === 3) out.push({ key: "alkyne", label: "Alkyne (C≡C)", atoms: [G.id[i], G.id[e.j]] });
  }
  return out;
}

// ---------- SMILES and the structural formula ----------
const ORG = { B: [3], C: [4], N: [3, 5], O: [2], P: [3, 5], S: [2, 4, 6], F: [1], Cl: [1], Br: [1], I: [1] };
function smiles(G) {
  const vis = new Array(G.n).fill(-1), parts = []; let t = 0; const kids = G.adj.map(() => []), close = new Map();
  for (let s = 0; s < G.n; s++) {
    if (vis[s] >= 0) continue; const root = s;
    const dfs = (u, p) => { vis[u] = t++; for (const e of G.adj[u]) { if (e.j === p) continue; if (vis[e.j] < 0) { kids[u].push(e); dfs(e.j, u); } else if (vis[e.j] < vis[u]) { const k = `${Math.min(u, e.j)}-${Math.max(u, e.j)}`; if (!close.has(k)) close.set(k, e.o); } } };
    dfs(root, -1); parts.push(root);
  }
  const free = [], dig = new Map();
  const sym = (i) => { const e = G.el[i], used = G.adj[i].reduce((a, x) => a + x.o, 0), v = ORG[e]?.find((x) => x >= used); if (ORG[e] && !G.q[i] && v != null && v - used === G.h[i]) return e; return `[${e}${G.h[i] ? `H${G.h[i] > 1 ? G.h[i] : ""}` : ""}${G.q[i] ? (G.q[i] > 0 ? "+" : "-") + (Math.abs(G.q[i]) > 1 ? Math.abs(G.q[i]) : "") : ""}]`; };
  const bs = (o) => (o === 2 ? "=" : o === 3 ? "#" : "");
  const write = (u) => {
    let s = sym(u);
    for (const e of G.adj[u]) { const k = `${Math.min(u, e.j)}-${Math.max(u, e.j)}`; if (!close.has(k)) continue; if (vis[e.j] > vis[u]) { let d = 1; while (free.includes(d) || [...dig.values()].includes(d)) d++; dig.set(k, d); s += bs(e.o) + (d > 9 ? `%${d}` : d); } else if (dig.has(k)) { const d = dig.get(k); dig.delete(k); s += d > 9 ? `%${d}` : d; } }
    kids[u].forEach((e, k) => { const sub = bs(e.o) + write(e.j); s += k < kids[u].length - 1 ? `(${sub})` : sub; });
    return s;
  };
  return parts.map(write).join(".");
}
function condensed(G) {
  // along the longest carbon-to-carbon path, branches in brackets: CH3CH(CH3)CH2OH; then C(=O)(OH) → COOH,
  // CH(=O) → CHO, C(=O) → CO
  const dist = (s) => { const d = new Array(G.n).fill(-1), p = new Array(G.n).fill(-1), q = [s]; d[s] = 0; while (q.length) { const u = q.shift(); for (const { j } of G.adj[u]) if (d[j] < 0) { d[j] = d[u] + 1; p[j] = u; q.push(j); } } return { d, p }; };
  const Cs = G.el.map((e, i) => (e === "C" ? i : -1)).filter((i) => i >= 0); if (!Cs.length) return null;
  let best = [Cs[0], Cs[0], 0, null];
  for (const a of Cs) { const { d, p } = dist(a); for (const b of Cs) if (d[b] > best[2]) best = [a, b, d[b], p]; }
  let path = [best[1]]; if (best[3]) while (path[path.length - 1] !== best[0]) path.push(best[3][path[path.length - 1]]);
  const het = (u) => G.adj[u].filter((e) => G.el[e.j] !== "C").length;
  if (het(path[0]) > het(path[path.length - 1])) path = path.reverse();
  const onPath = new Set(path);
  const grp = (i) => `${G.el[i]}${G.h[i] ? `H${G.h[i] > 1 ? G.h[i] : ""}` : ""}${G.q[i] ? (G.q[i] > 0 ? "⁺" : "⁻") : ""}`;
  const bs = (o) => (o === 2 ? "=" : o === 3 ? "≡" : "");
  const order = (u, from) => G.adj[u].filter((e) => e.j !== from && !onPath.has(e.j)).sort((x, y) => y.o - x.o);
  const branch = (u, from) => grp(u) + G.adj[u].filter((e) => e.j !== from).sort((x, y) => y.o - x.o).map((e) => `(${bs(e.o)}${branch(e.j, u)})`).join("");
  let s = "";
  path.forEach((u, k) => {
    s += grp(u);
    for (const e of order(u)) { const b = branch(e.j, u); s += HAL.has(G.el[e.j]) ? b : `(${bs(e.o)}${b})`; }
    const nx = path[k + 1]; if (nx != null) s += bs(orderOf(G, u, nx));
  });
  return s.replace(/^CH\(=O\)\(OH\)$/, "HCOOH").replace(/C\(=O\)\(OH\)/g, "COOH").replace(/CH\(=O\)/g, "CHO").replace(/C\(=O\)/g, "CO").replace(/\(([^()]*)\)$/, "$1").replace(/((\([^()]+\)))\2+/g, (mm, g) => `${g}${mm.length / g.length}`);
}

// ---------- names ----------
const STEM = ["", "meth", "eth", "prop", "but", "pent", "hex", "hept", "oct", "non", "dec", "undec", "dodec", "tridec", "tetradec", "pentadec", "hexadec", "heptadec", "octadec", "nonadec", "icos"];
const MULT = ["", "", "di", "tri", "tetra", "penta", "hexa", "hepta", "octa", "nona", "deca"];
const MULTX = ["", "", "bis", "tris", "tetrakis", "pentakis", "hexakis"];
const HALO = { F: "fluoro", Cl: "chloro", Br: "bromo", I: "iodo" };
const cmpArr = (a, b) => { for (let i = 0; i < Math.max(a.length, b.length); i++) { if (a[i] == null) return -1; if (b[i] == null) return 1; if (a[i] !== b[i]) return a[i] - b[i]; } return 0; };

// a common-compound library (matched by hash) names rings, esters, amines and more, and gives everyday names
const LIBRARY = [
  ["c1ccccc1", "benzene"], ["Cc1ccccc1", "methylbenzene", "toluene"], ["CCc1ccccc1", "ethylbenzene"], ["Oc1ccccc1", "phenol"],
  ["OC(=O)c1ccccc1", "benzoic acid", "benzenecarboxylic acid"], ["O=Cc1ccccc1", "benzaldehyde", "benzenecarbaldehyde"], ["Nc1ccccc1", "phenylamine", "aniline"],
  ["[O-][N+](=O)c1ccccc1", "nitrobenzene"], ["Clc1ccccc1", "chlorobenzene"], ["Brc1ccccc1", "bromobenzene"], ["CC(=O)c1ccccc1", "1-phenylethan-1-one", "phenylethanone, acetophenone"],
  ["COC(=O)c1ccccc1", "methyl benzoate"], ["C=Cc1ccccc1", "ethenylbenzene", "styrene, phenylethene"], ["Cc1ccccc1C", "1,2-dimethylbenzene"], ["Cc1cccc(C)c1", "1,3-dimethylbenzene"], ["Cc1ccc(C)cc1", "1,4-dimethylbenzene"],
  ["c1ccc2ccccc2c1", "naphthalene"], ["c1ccc2cc3ccccc3cc2c1", "anthracene"], ["c1ccc2c(c1)ccc1ccccc12", "phenanthrene"], ["c1ccncc1", "pyridine"],
  ["CC(=O)Oc1ccccc1C(=O)O", "2-(acetyloxy)benzoic acid", "aspirin"], ["CC(=O)Nc1ccc(O)cc1", "N-(4-hydroxyphenyl)ethanamide", "paracetamol"], ["CC(C)Cc1ccc(cc1)C(C)C(=O)O", "2-[4-(2-methylpropyl)phenyl]propanoic acid", "ibuprofen"],
  ["OC(=O)c1ccccc1O", "2-hydroxybenzoic acid", "salicylic acid"],
  ["C1CC1", "cyclopropane"], ["C1CCC1", "cyclobutane"], ["C1CCCC1", "cyclopentane"], ["C1CCCCC1", "cyclohexane"], ["C1CCCCCC1", "cycloheptane"], ["C1CCCCCCC1", "cyclooctane"],
  ["C1CC=CC1", "cyclopentene"], ["C1CCC=CC1", "cyclohexene"], ["C1CC=CC=C1", "cyclohexa-1,3-diene"], ["C1C=CCC=C1", "cyclohexa-1,4-diene"], ["CC1CCCCC1", "methylcyclohexane"],
  ["OC1CCCCC1", "cyclohexanol"], ["O=C1CCCCC1", "cyclohexanone"], ["ClC1CCCCC1", "chlorocyclohexane"], ["BrC1CCCCC1", "bromocyclohexane"], ["C1CCOC1", "oxolane", "tetrahydrofuran, THF"], ["C1CO1", "oxirane", "epoxyethane"],
  ["COC", "methoxymethane", "dimethyl ether"], ["CCOC", "methoxyethane"], ["CCOCC", "ethoxyethane", "diethyl ether"],
  ["COC(C)=O", "methyl ethanoate", "methyl acetate"], ["CCOC(C)=O", "ethyl ethanoate", "ethyl acetate"], ["CCOC(=O)CC", "ethyl propanoate"], ["COC(=O)CC", "methyl propanoate"], ["CCCOC(C)=O", "propyl ethanoate"], ["COC=O", "methyl methanoate"], ["CCOC=O", "ethyl methanoate"],
  ["CC(=O)OC(C)=O", "ethanoic anhydride", "acetic anhydride"], ["CC(Cl)=O", "ethanoyl chloride", "acetyl chloride"], ["CCC(Cl)=O", "propanoyl chloride"],
  ["CN", "methylamine", "methanamine"], ["CCN", "ethylamine", "ethanamine"], ["CCCN", "propylamine", "propan-1-amine"], ["CNC", "dimethylamine", "N-methylmethanamine"], ["CN(C)C", "trimethylamine", "N,N-dimethylmethanamine"], ["CC(C)N", "propan-2-amine"],
  ["CC(N)=O", "ethanamide", "acetamide"], ["NC=O", "methanamide"], ["CNC(C)=O", "N-methylethanamide"], ["NC(N)=O", "urea", "carbamide"], ["CC#N", "ethanenitrile", "acetonitrile"], ["CCC#N", "propanenitrile"],
  ["NCC(=O)O", "aminoethanoic acid", "glycine"], ["CC(N)C(=O)O", "2-aminopropanoic acid", "alanine"], ["CC(O)C#N", "2-hydroxypropanenitrile"], ["CCS", "ethanethiol"],
  ["CC(C)=O", null, "propanone, acetone"], ["CCC(C)=O", null, "butanone, methyl ethyl ketone"], ["CC(=O)O", null, "acetic acid"], ["C=O", null, "formaldehyde"], ["CC=O", null, "acetaldehyde"], ["OC=O", null, "formic acid"],
  ["C=CC", null, "propene"], ["C#CC", null, "propyne"], ["CC(O)C(=O)O", null, "lactic acid"], ["ClC(Cl)Cl", null, "chloroform"], ["ClCCl", null, "dichloromethane, DCM"], ["C=CC(C)=C", null, "isoprene"],
  ["OCCO", null, "ethylene glycol"], ["OCC(O)CO", null, "glycerol"], ["CC(C)O", null, "isopropyl alcohol"], ["C=C", null, "ethylene"], ["C#C", null, "acetylene"], ["CCCC", null, "n-butane"], ["CC(C)C", null, "isobutane, methylpropane"],
  ["CC(C)(C)C", null, "neopentane, dimethylpropane"], ["OC(=O)C(=O)O", null, "oxalic acid"], ["CCCCCC(=O)O", null, "caproic acid"], ["CC(C)CC(C)(C)C", null, "isooctane"],
];
let LIB = null;
function library() {
  if (LIB) return LIB;
  LIB = new Map();
  for (const [s, name, aka] of LIBRARY) { try { const a = analyseQuiet(graphFromSmiles(s)); LIB.set(a.hash, { name, aka }); } catch { /* a bad entry is skipped */ } }
  return LIB;
}
// the library's hashes come from the same analysis, without the name (which would recurse)
function analyseQuiet(m) { const G = graph(m), rs = rings(G, 8), ar = aromatic(G, rs), counts = {}; for (let i = 0; i < G.n; i++) { counts[G.el[i]] = (counts[G.el[i]] || 0) + 1; if (G.h[i]) counts.H = (counts.H || 0) + G.h[i]; } const charge = G.q.reduce((a, b) => a + b, 0); return { hash: h53(`${hill(counts)}|${charge}|${refine(G, ar).slice().sort().join(".")}`) }; }

function nameOf(G, rs, A) {
  const lib = library().get(A.hash), sys = systematic(G, rs);
  if (sys.name) return { ...sys, aka: lib?.aka || null };
  if (lib) return { name: lib.name || lib.aka.split(",")[0], aka: lib.name ? lib.aka : null, from: "library", steps: ["A common compound: named from the library."] };
  return { name: null, reason: sys.reason };
}

/** IUPAC name of an acyclic molecule within scope; { name, chain (G indices, numbered from 1), steps } or { reason }. */
export function systematic(G, rs = rings(G, 8)) {
  const n = G.n, Cs = G.el.map((e, i) => (e === "C" ? i : -1)).filter((i) => i >= 0);
  if (!Cs.length) return { reason: "There's no carbon chain to name." };
  if (rs.length) return { reason: "Systematic naming here covers chains, not rings; common ring compounds are recognised from the library." };
  const bad = G.el.find((e) => !["C", "O", ...HAL].includes(e));
  if (bad) return { reason: `Systematic naming here covers C, H, O and halogens; this molecule has ${bad}.` };
  // the features on each carbon
  const feat = Cs.map(() => null), F = new Map();
  for (const c of Cs) {
    const f = { acid: 0, ald: 0, one: 0, ol: 0, halo: [] }, os = G.adj[c].filter((e) => G.el[e.j] === "O"), dO = os.filter((e) => e.o === 2), sO = os.filter((e) => e.o === 1);
    for (const e of G.adj[c]) if (HAL.has(G.el[e.j])) f.halo.push(G.el[e.j]);
    for (const e of sO) { const o = e.j; if (G.adj[o].length !== 1 || G.h[o] !== 1) return { reason: G.adj[o].length === 2 ? "Ethers and esters (C–O–C) are named from the library, not systematically here." : "This oxygen isn't an –OH group." }; }
    for (const e of dO) if (G.adj[e.j].length !== 1) return { reason: "This C=O oxygen has another bond." };
    if (dO.length > 1) return { reason: "A carbon with two C=O bonds is outside this namer." };
    if (dO.length && sO.length) { if (sO.length > 1) return { reason: "This carbon has too many oxygens to name here." }; f.acid = 1; }
    else if (dO.length) { if (cNbs(G, c).length <= 1) f.ald = 1; else f.one = 1; }
    else f.ol = sO.length;
    F.set(c, f);
  }
  for (const e of G.el.keys()) if (G.el[e] === "O" && G.adj[e].length === 0) return { reason: "There's an oxygen on its own." };
  const pri = ["acid", "ald", "one", "ol"].find((k) => Cs.some((c) => F.get(c)[k]));
  const priCount = (path) => path.reduce((t, c) => t + (pri ? F.get(c)[pri] : 0), 0), totalPri = pri ? Cs.reduce((t, c) => t + F.get(c)[pri], 0) : 0;
  // every path through the carbon skeleton (it's a tree), both ways round
  const cadj = (u) => G.adj[u].filter((e) => isC(G, e.j));
  const paths = [];
  for (const s of Cs) {
    const par = new Map([[s, -1]]), q = [s];
    while (q.length) { const u = q.shift(); for (const { j } of cadj(u)) if (!par.has(j)) { par.set(j, u); q.push(j); } }
    for (const t of Cs) { const p = []; for (let u = t; u !== -1; u = par.get(u)) p.push(u); paths.push(p.reverse()); }
  }
  let best = null, bestKey = null, bestSubs = null;
  for (const path of paths) {
    const on = new Set(path), L = path.length;
    if (pri && priCount(path) < totalPri) continue; // every principal group must be on the main chain
    const mb = []; for (let k = 0; k < L - 1; k++) { const o = orderOf(G, path[k], path[k + 1]); if (o > 1) mb.push({ loc: k + 1, o }); }
    // substituents
    const subs = []; let fail = null;
    path.forEach((c, k) => {
      const f = F.get(c), loc = k + 1;
      for (const x of f.halo) subs.push({ name: HALO[x], loc, key: HALO[x] });
      if (pri !== "ol") for (let r = 0; r < f.ol; r++) subs.push({ name: "hydroxy", loc, key: "hydroxy" });
      if (f.one && pri !== "one") subs.push({ name: "oxo", loc, key: "oxo" });
      if (f.ald && pri !== "ald") subs.push({ name: "oxo", loc, key: "oxo" });
      for (const e of cadj(c)) if (!on.has(e.j)) { if (e.o !== 1) { fail = "A branch joined by a double or triple bond is outside this namer."; continue; } const a = alkyl(G, F, e.j, c); if (!a) fail = "A branch carries a functional group or a multiple bond; that is outside this namer."; else subs.push({ ...a, loc }); }
    });
    if (fail) { best = best || null; if (!bestKey) bestSubs = fail; continue; }
    // every multiple bond must be in the chain
    const allMb = Cs.reduce((t, c) => t + cadj(c).filter((e) => e.j > c && e.o > 1).length, 0);
    if (mb.length < allMb) { bestSubs = bestSubs || "A double or triple bond is in a branch; that is outside this namer."; continue; }
    const priLocs = pri ? path.flatMap((c, k) => Array(F.get(c)[pri]).fill(k + 1)) : [];
    const alpha = [...subs].sort((a, b) => a.key.localeCompare(b.key) || a.loc - b.loc).map((s) => s.loc);
    const key = [-priCount(path), -mb.length, -L, -mb.filter((x) => x.o === 2).length, priLocs, mb.map((x) => x.loc), mb.filter((x) => x.o === 2).map((x) => x.loc), -subs.length, subs.map((s) => s.loc).sort((a, b) => a - b), alpha];
    if (!bestKey || compareKeys(key, bestKey) < 0) { bestKey = key; best = { path, mb, subs, priLocs }; }
  }
  if (!best) return { reason: typeof bestSubs === "string" ? bestSubs : "This structure is outside this namer." };
  const { path, mb, subs, priLocs } = best, L = path.length;
  if (L > 20) return { reason: "Chains longer than 20 carbons are outside this namer." };
  // locants are left out where there can be no doubt: methane and ethane derivatives with one feature, and the
  // terminal locants of aldehydes and acids
  const features = subs.length + mb.length + priLocs.length;
  const dropAll = L === 1 || (L === 2 && subs.length + priLocs.length <= 1);
  const enes = mb.filter((x) => x.o === 2).map((x) => x.loc), ynes = mb.filter((x) => x.o === 3).map((x) => x.loc);
  let parent = STEM[L];
  const multUnsat = enes.length > 1 || ynes.length > 1;
  if (!mb.length) parent += "an";
  else {
    if (multUnsat) parent += "a";
    const part = (locs, core) => (dropAll || L === 2 ? `${MULT[locs.length]}${core}` : `-${locs.join(",")}-${MULT[locs.length]}${core}`);
    if (enes.length) parent += part(enes, "en");
    if (ynes.length) parent += part(ynes, "yn");
  }
  const SUFF = { acid: "oic acid", ald: "al", one: "one", ol: "ol" };
  if (!pri) parent += "e";
  else {
    const k = priLocs.length, core = `${MULT[k]}${SUFF[pri]}`, vowel = /^[aeiou]/.test(core);
    const terminal = pri === "acid" || pri === "ald";
    if (!vowel) parent += "e";
    parent += terminal || dropAll ? core : `-${priLocs.join(",")}-${core}`;
  }
  // prefixes in alphabetical order (multiplying prefixes ignored, except inside a complex substituent's name)
  const byName = new Map(); for (const s of subs) { if (!byName.has(s.name)) byName.set(s.name, { ...s, locs: [] }); byName.get(s.name).locs.push(s.loc); }
  const pre = [...byName.values()].sort((a, b) => a.key.localeCompare(b.key)).map((s) => { const k = s.locs.length, m = s.complex ? MULTX[k] : MULT[k], nm = s.complex ? `(${s.name})` : s.name; return dropAll ? `${m}${nm}` : `${s.locs.sort((a, b) => a - b).join(",")}-${m}${nm}`; });
  const name = pre.join(dropAll ? "" : "-") + parent;
  // the reasoning, step by step
  const PRI = { acid: "carboxylic acid (–COOH, suffix -oic acid)", ald: "aldehyde (–CHO, suffix -al)", one: "ketone (C=O, suffix -one)", ol: "alcohol (–OH, suffix -ol)" };
  const steps = [];
  if (pri) steps.push(`Highest-priority group: ${PRI[pri]}${priLocs.length > 1 ? `, ×${priLocs.length}` : ""}. The main chain must contain it.`);
  steps.push(`Main chain: ${L} carbon${L > 1 ? "s" : ""} → "${STEM[L]}"${mb.length ? `, containing the ${mb.length > 1 ? "multiple bonds" : enes.length ? "C=C" : "C≡C"}` : ""}.`);
  if (!dropAll && features > 1) steps.push(`Numbered from the end that gives the lowest locants${pri ? " to the principal group first" : mb.length ? " to the multiple bonds first" : ""}${subs.length ? ", then to the substituents" : ""}.`);
  if (enes.length || ynes.length) steps.push(`${enes.length ? `C=C at ${enes.join(", ")} → "-en-"` : ""}${enes.length && ynes.length ? "; " : ""}${ynes.length ? `C≡C at ${ynes.join(", ")} → "-yn-"` : ""}.`);
  if (subs.length) steps.push(`Substituents, in alphabetical order: ${[...byName.values()].sort((a, b) => a.key.localeCompare(b.key)).map((s) => `${s.name} at ${s.locs.sort((a, b) => a - b).join(", ")}`).join("; ")}.`);
  return { name, chain: path, steps, from: "systematic" };
}
function compareKeys(a, b) {
  for (let i = 0; i < a.length; i++) { const x = a[i], y = b[i]; const c = Array.isArray(x) ? cmpArr(x, y) : x - y; if (c) return c; }
  return 0;
}
// an alkyl substituent from carbon r (attached to the chain at carbon from): { name, key, complex } or null
function alkyl(G, F, r, from) {
  const tree = [], par = new Map([[r, from]]), q = [r];
  while (q.length) { const u = q.shift(); tree.push(u); const f = F.get(u); if (f.acid || f.ald || f.one || f.ol || f.halo.length) return null; for (const e of G.adj[u]) { if (e.j === par.get(u) || !isC(G, e.j)) continue; if (e.o !== 1) return null; par.set(e.j, u); q.push(e.j); } }
  // longest chain from r, then most branches, then lowest locants
  const kids = (u) => G.adj[u].filter((e) => isC(G, e.j) && e.j !== par.get(u)).map((e) => e.j);
  let best = null;
  const walk = (u, p) => { const ks = kids(u); if (!ks.length) { const path = [...p, u]; const on = new Set(path); const br = []; path.forEach((c, k) => kids(c).forEach((j) => { if (!on.has(j)) br.push({ j, loc: k + 1 }); })); const key = [-path.length, -br.length, br.map((b) => b.loc).sort((a, b) => a - b)]; if (!best || compareKeys(key, best.key) < 0) best = { path, br, key }; return; } for (const k of ks) walk(k, [...p, u]); };
  walk(r, []);
  const { path, br } = best;
  if (!br.length) return { name: `${STEM[path.length]}yl`, key: `${STEM[path.length]}yl`, complex: false };
  const inner = new Map();
  for (const b of br) { const a = alkyl(G, F, b.j, path[b.loc - 1]); if (!a) return null; if (!inner.has(a.name)) inner.set(a.name, { ...a, locs: [] }); inner.get(a.name).locs.push(b.loc); }
  const pre = [...inner.values()].sort((a, b) => a.key.localeCompare(b.key)).map((s) => `${s.locs.sort((a, b) => a - b).join(",")}-${s.complex ? MULTX[s.locs.length] : MULT[s.locs.length]}${s.complex ? `(${s.name})` : s.name}`).join("-");
  const name = `${pre}${STEM[path.length]}yl`;
  return { name, key: name.replace(/[\d,()-]/g, ""), complex: true };
}

// ---------- the drawing as SVG ----------
export const PALETTES = {
  dark: { bg: "#0b0c0e", bond: "#e8eaed", grid: "rgba(255,255,255,.075)", mute: "#9aa0a6", accent: "#10b981", hi: "rgba(16,185,129,.28)", warn: "#ff4d6d", hover: "rgba(255,255,255,.16)", ghost: "rgba(16,185,129,.75)", el: { N: "#7aa8ff", O: "#ff6b6b", S: "#fbbf24", P: "#fb923c", F: "#86efac", Cl: "#4ade80", Br: "#f59e0b", I: "#c084fc", B: "#fda4af", H: "#e8eaed", C: "#e8eaed" } },
  light: { bg: "#ffffff", bond: "#111317", grid: "rgba(0,0,0,.085)", mute: "#5f6368", accent: "#047857", hi: "rgba(16,185,129,.22)", warn: "#c8102e", hover: "rgba(0,0,0,.09)", ghost: "rgba(4,120,87,.75)", el: { N: "#1d4ed8", O: "#c81e1e", S: "#a16207", P: "#c2410c", F: "#15803d", Cl: "#15803d", Br: "#92400e", I: "#7e22ce", B: "#be185d", H: "#111317", C: "#111317" } },
  print: { bg: "#ffffff", bond: "#000000", grid: "rgba(0,0,0,.08)", mute: "#555555", accent: "#047857", hi: "rgba(16,185,129,.22)", warn: "#c8102e", hover: "transparent", ghost: "transparent", el: { N: "#1d4ed8", O: "#c81e1e", S: "#a16207", P: "#c2410c", F: "#15803d", Cl: "#15803d", Br: "#92400e", I: "#7e22ce", B: "#be185d", H: "#000", C: "#000" } },
};
const f2 = (v) => Math.round(v * 10) / 10;

/** The honeycomb covering a world rectangle, as one SVG path (each edge once). */
export function gridPath(x0, y0, x1, y1, X, Y) {
  let d = ""; const jMin = Math.floor((1 - y1) / 1.5) - 1, jMax = Math.ceil((1 - y0) / 1.5) + 1;
  for (let j = jMin; j <= jMax; j++) {
    const iMin = Math.floor((x0 - (R3 / 2) * j) / R3) - 1, iMax = Math.ceil((x1 - (R3 / 2) * j) / R3) + 1;
    for (let i = iMin; i <= iMax; i++) {
      const cx = i * R3 + j * (R3 / 2), cy = -1.5 * j + 1;
      const v = [[cx, cy - 1], [cx + R3 / 2, cy - 0.5], [cx + R3 / 2, cy + 0.5], [cx, cy + 1]].map(([x, y]) => `${f2(X(x))},${f2(Y(y))}`);
      d += `M${v[0]}L${v[1]}L${v[2]}L${v[3]}`;
    }
  }
  return d;
}

/**
 * The drawing as an SVG string. view: { cx, cy, s } (world centre and pixels per bond), size: [W, H].
 * opts: { palette, grid, showC, showNums, showStereo, highlight: Set of atom ids, hover: { type, id },
 *         ghost: [[x, y], ...] with ghostRing (closed) or a chain, sel: atom id, title }
 */
export function render(m, A, view, [W, H], opts = {}) {
  const P = PALETTES[opts.palette || "dark"], s = view.s, X = (x) => (x - view.cx) * s + W / 2, Y = (y) => (y - view.cy) * s + H / 2;
  const fs = Math.max(9, s * 0.42), out = [];
  out.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${P.bg}"/>`);
  if (opts.grid) { const w0 = view.cx - W / 2 / s, w1 = view.cx + W / 2 / s, h0 = view.cy - H / 2 / s, h1 = view.cy + H / 2 / s; out.push(`<path d="${gridPath(w0, h0, w1, h1, X, Y)}" fill="none" stroke="${P.grid}" stroke-width="1"/>`); }
  const G = A.G || graph(m), byId = new Map(m.atoms.map((a) => [a.id, a])), deg = (id) => m.bonds.filter((b) => b.a === id || b.b === id).length;
  const hc = A.hcount || {}, bad = new Set((A.problems || []).map((p) => p.atom));
  const labelled = (a) => a.el !== "C" || opts.showC || !deg(a.id) || a.charge || bad.has(a.id);
  // highlights under everything
  if (opts.highlight?.size) for (const id of opts.highlight) { const a = byId.get(id); if (a) out.push(`<circle cx="${f2(X(a.x))}" cy="${f2(Y(a.y))}" r="${f2(s * 0.36)}" fill="${P.hi}"/>`); }
  if (opts.hover?.type === "atom") { const a = byId.get(opts.hover.id); if (a) out.push(`<circle cx="${f2(X(a.x))}" cy="${f2(Y(a.y))}" r="${f2(s * 0.3)}" fill="${P.hover}"/>`); }
  if (opts.hover?.type === "bond") { const b = m.bonds.find((x) => x.id === opts.hover.id); if (b) { const p = byId.get(b.a), q = byId.get(b.b); out.push(`<line x1="${f2(X(p.x))}" y1="${f2(Y(p.y))}" x2="${f2(X(q.x))}" y2="${f2(Y(q.y))}" stroke="${P.hover}" stroke-width="${f2(s * 0.34)}" stroke-linecap="round"/>`); } }
  // ring centres, for which side a ring's double bond goes
  const ringOf = new Map(); for (const r of rings(G, 8)) for (let k = 0; k < r.length; k++) { const a = G.id[r[k]], b = G.id[r[(k + 1) % r.length]], key = `${Math.min(a, b)}-${Math.max(a, b)}`; if (!ringOf.has(key)) { const pts = r.map((i) => byId.get(G.id[i])); ringOf.set(key, [pts.reduce((t, p) => t + p.x, 0) / pts.length, pts.reduce((t, p) => t + p.y, 0) / pts.length]); } }
  const sw = Math.max(1.2, s * 0.05), seg = (x1, y1, x2, y2, col = P.bond) => out.push(`<line x1="${f2(X(x1))}" y1="${f2(Y(y1))}" x2="${f2(X(x2))}" y2="${f2(Y(y2))}" stroke="${col}" stroke-width="${f2(sw)}" stroke-linecap="round"/>`);
  for (const b of m.bonds) {
    const p = byId.get(b.a), q = byId.get(b.b); if (!p || !q) continue;
    const dx = q.x - p.x, dy = q.y - p.y, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
    const t0 = labelled(p) ? 0.3 : 0, t1 = labelled(q) ? 0.3 : 0, x1 = p.x + ux * t0, y1 = p.y + uy * t0, x2 = q.x - ux * t1, y2 = q.y - uy * t1;
    const col = bad.has(b.a) && bad.has(b.b) ? P.warn : P.bond;
    if (b.order === 1) seg(x1, y1, x2, y2, col);
    else if (b.order === 3) { seg(x1, y1, x2, y2, col); for (const o of [-0.14, 0.14]) seg(x1 + nx * o, y1 + ny * o, x2 + nx * o, y2 + ny * o, col); }
    else {
      const key = `${Math.min(b.a, b.b)}-${Math.max(b.a, b.b)}`, rc = ringOf.get(key);
      let side = 0;
      if (rc) side = Math.sign((rc[0] - p.x) * nx + (rc[1] - p.y) * ny) || 1;
      else {
        const others = [...m.bonds.filter((x) => x !== b && (x.a === b.a || x.b === b.a)).map((x) => byId.get(x.a === b.a ? x.b : x.a)), ...m.bonds.filter((x) => x !== b && (x.a === b.b || x.b === b.b)).map((x) => byId.get(x.a === b.b ? x.b : x.a))];
        const dp = deg(b.a), dq = deg(b.b);
        if (dp > 1 && dq > 1) { const tot = others.reduce((t, o) => t + Math.sign((o.x - p.x) * nx + (o.y - p.y) * ny), 0); side = Math.sign(tot) || 1; }
      }
      if (!side) for (const o of [-0.08, 0.08]) seg(x1 + nx * o, y1 + ny * o, x2 + nx * o, y2 + ny * o, col);
      else { seg(x1, y1, x2, y2, col); const o = 0.17 * side, sh = 0.16; seg(x1 + nx * o + ux * (t0 ? 0 : sh), y1 + ny * o + uy * (t0 ? 0 : sh), x2 + nx * o - ux * (t1 ? 0 : sh), y2 + ny * o - uy * (t1 ? 0 : sh), col); }
    }
  }
  // atom labels
  for (const a of m.atoms) {
    const x = X(a.x), y = Y(a.y), nb = m.bonds.filter((b) => b.a === a.id || b.b === a.id).map((b) => byId.get(b.a === a.id ? b.b : b.a));
    const mx = nb.reduce((t, o) => t + (o.x - a.x), 0);
    if (bad.has(a.id)) out.push(`<circle cx="${f2(x)}" cy="${f2(y)}" r="${f2(s * 0.34)}" fill="none" stroke="${P.warn}" stroke-width="2" stroke-dasharray="3 2"/>`);
    if (labelled(a)) {
      const h = hc[a.id] ?? 0, col = P.el[a.el] || P.bond, hs = h ? `H${h > 1 ? `<tspan font-size="${f2(fs * 0.7)}" dy="${f2(fs * 0.25)}">${h}</tspan>` : ""}` : "";
      const left = h && mx > 0.2 && nb.length === 1, ew = fs * 0.62 * a.el.length;
      out.push(`<text x="${f2(x)}" y="${f2(y + fs * 0.36)}" text-anchor="middle" font-size="${f2(fs)}" font-weight="600" fill="${col}" font-family="Geist, system-ui, sans-serif">${a.el}</text>`);
      if (hs) out.push(left ? `<text x="${f2(x - ew / 2 - fs * 0.04)}" y="${f2(y + fs * 0.36)}" text-anchor="end" font-size="${f2(fs)}" font-weight="600" fill="${col}" font-family="Geist, system-ui, sans-serif">${hs}</text>` : `<text x="${f2(x + ew / 2 + fs * 0.02)}" y="${f2(y + fs * 0.36)}" text-anchor="start" font-size="${f2(fs)}" font-weight="600" fill="${col}" font-family="Geist, system-ui, sans-serif">${hs}</text>`);
    }
    if (a.charge) out.push(`<text x="${f2(x + fs * 0.62)}" y="${f2(y - fs * 0.35)}" text-anchor="middle" font-size="${f2(fs * 0.75)}" font-weight="700" fill="${P.el[a.el] || P.bond}" font-family="Geist, system-ui, sans-serif">${Math.abs(a.charge) > 1 ? Math.abs(a.charge) : ""}${a.charge > 0 ? "+" : "−"}</text>`);
    if (opts.showStereo && A.stereo?.includes(a.id)) out.push(`<text x="${f2(x - fs * 0.55)}" y="${f2(y - fs * 0.3)}" text-anchor="middle" font-size="${f2(fs * 0.9)}" font-weight="700" fill="${P.accent}">*</text>`);
    if (opts.sel === a.id) out.push(`<circle cx="${f2(x)}" cy="${f2(y)}" r="${f2(s * 0.36)}" fill="none" stroke="${P.accent}" stroke-width="2"/>`);
  }
  // main-chain numbering from the name
  if (opts.showNums && A.name?.chain) A.name.chain.forEach((gi, k) => {
    const a = byId.get(G.id[gi]); if (!a) return;
    const nb = m.bonds.filter((b) => b.a === a.id || b.b === a.id).map((b) => byId.get(b.a === a.id ? b.b : b.a));
    let vx = -nb.reduce((t, o) => t + (o.x - a.x), 0), vy = -nb.reduce((t, o) => t + (o.y - a.y), 0); const l = Math.hypot(vx, vy);
    if (l < 0.2) { vx = 0; vy = -1; } else { vx /= l; vy /= l; }
    const r = labelled(a) ? 0.62 : 0.42;
    out.push(`<text x="${f2(X(a.x + vx * r))}" y="${f2(Y(a.y + vy * r) + fs * 0.25)}" text-anchor="middle" font-size="${f2(fs * 0.62)}" font-weight="700" fill="${P.accent}" font-family="Geist Mono, monospace">${k + 1}</text>`);
  });
  // the preview of what a click or drag will add
  if (opts.ghost?.length) {
    const g = opts.ghost, d = g.map(([x, y], k) => `${k ? "L" : "M"}${f2(X(x))},${f2(Y(y))}`).join("") + (opts.ghostRing ? "Z" : "");
    out.push(`<path d="${d}" fill="none" stroke="${P.ghost}" stroke-width="${f2(sw)}" stroke-dasharray="5 4" stroke-linejoin="round"/>`);
    if (!opts.ghostRing && g.length > 2) { const [lx, ly] = g[g.length - 1]; out.push(`<text x="${f2(X(lx) + 10)}" y="${f2(Y(ly) - 10)}" font-size="12" font-weight="600" fill="${P.accent}" font-family="Geist, system-ui, sans-serif">${g.length}C</text>`); }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${opts.title ? `<title>${String(opts.title).replace(/[<&]/g, "")}</title>` : ""}${out.join("")}</svg>`;
}
/** A view that fits the drawing into [W, H] with a margin. */
export function fit(m, [W, H], { max = 40, pad = 1.2 } = {}) {
  const b = bounds(m), w = b.x1 - b.x0 + 2 * pad, h = b.y1 - b.y0 + 2 * pad;
  return { cx: (b.x0 + b.x1) / 2, cy: (b.y0 + b.y1) / 2, s: Math.min(max, W / w, H / h) };
}
