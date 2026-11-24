// Configuration of a drawing: R/S at stereocentres from wedge and dash bonds, E/Z at C=C bonds from where the groups
// sit on the page, and how two stereoisomers are related. DOM-free; tested in tests/configuration.test.mjs.
//
// Drawing convention: a single bond may carry `stereo: "wedge" | "dash"`, with its narrow end at `bond.a`, the
// stereocentre it describes (as IUPAC recommends). A wedge points towards the viewer, a dash away. The page's y axis
// points down, so it is turned over before the 3D handedness is worked out.
//
// CIP priorities come from rankCIP in kit/labs/chemistry/mol.js (the routine behind the R/S and E/Z exercises): first
// point of difference by atomic number, sphere by sphere, with duplicated atoms for multiple bonds. It covers textbook
// cases, not every subtle rule (no isotopes, no rule 4/5 like-unlike pairs, no pseudo-asymmetric r/s centres). When it
// can't separate two groups, the descriptor is null with a reason, never a guess.
//
//   configuration(m) → { centres: [{ atom, label: "R" | "S" | null, defined, why? }],
//                        bonds:   [{ bond, atoms: [a, b], label: "E" | "Z" | null, why? }],
//                        locant: { atomId: n } (main-chain numbering, when the molecule has a systematic name) }
//   descriptor(m, cfg)     → "(2R,3S)" style prefix for the defined descriptors, or "" when there are none
//   mirror(m, atoms?)      → the mirror image in the page plane: every wedge becomes a dash (only at `atoms` if given)
//   chiral(m)              → false when the mirror image is the same molecule (achiral, including meso), true when it
//                            isn't, null when the configuration isn't fully defined
//   relation(m1, m2)       → "identical" | "enantiomers" | "diastereomers" | "constitutional" | "undefined"
//   setEZ(m, bondId, "E" | "Z")  reflects one end's groups across the C=C so the drawing shows that isomer
//   bendAlkene(m, bondId, "E" | "Z")  lays out a C=C made from a straight C≡C at 120° angles
//   stereoFromSmiles(m, map, smiles)  wedges and C=C geometry on a laid-out drawing to match @, @@, / and \ in the SMILES
import * as K from "../skeletal.js";
import { cipRank, vol, parseSmiles } from "../mol.js";

/** A CIP model of the drawing: every drawn atom plus its implicit hydrogens, in mol.js form ({ atoms: [{ el, nb }], bonds }). */
export function cipModel(m, G = K.graph(m)) {
  const atoms = m.atoms.map((a) => ({ el: a.el, nb: [], id: a.id })), bonds = [], ix = new Map(m.atoms.map((a, i) => [a.id, i]));
  const link = (i, j, order) => { bonds.push({ a: i, b: j, order }); atoms[i].nb.push(j); atoms[j].nb.push(i); };
  for (const b of m.bonds) { const i = ix.get(b.a), j = ix.get(b.b); if (i != null && j != null) link(i, j, b.order); }
  const implicit = new Map(); // drawing atom id → [model index of each implicit H]
  G.id.forEach((id, k) => {
    const list = [];
    for (let n = 0; n < G.hx[k]; n++) { const h = atoms.length; atoms.push({ el: "H", nb: [], id: null }); link(ix.get(id), h, 1); list.push(h); }
    implicit.set(id, list);
  });
  return { atoms, bonds, ix, implicit };
}

const DZ = 0.9;
/** The 3D direction of each neighbour of a centre: page direction (y turned over) plus a lift for a wedge or dash. */
function directions(m, M, id) {
  const a = K.atomOf(m, id), out = new Map(); let lifted = false;
  for (const { bond, atom } of K.neighbours(m, id)) {
    const dx = atom.x - a.x, dy = -(atom.y - a.y), L = Math.hypot(dx, dy) || 1;
    const z = bond.stereo && bond.a === id ? (bond.stereo === "wedge" ? DZ : -DZ) : 0;
    if (z) lifted = true;
    out.set(M.ix.get(atom.id), [dx / L, dy / L, z]);
  }
  const hs = M.implicit.get(id) || [];
  if (hs.length === 1) {
    // the hidden hydrogen points away from the other three
    const s = [...out.values()].reduce((t, v) => [t[0] + v[0], t[1] + v[1], t[2] + v[2]], [0, 0, 0]), L = Math.hypot(...s) || 1;
    out.set(hs[0], [-s[0] / L, -s[1] / L, -s[2] / L]);
  }
  return { dirs: out, lifted };
}

function rsOf(m, M, id) {
  const c = M.ix.get(id), nbs = M.atoms[c].nb;
  if (nbs.length !== 4) return { label: null, defined: false, why: "Not four groups." };
  const { dirs, lifted } = directions(m, M, id);
  if (!lifted) return { label: null, defined: false, why: "No wedge or dash at this stereocentre, so the drawing doesn't say which arrangement it is." };
  const { order, tie } = cipRank(M, c);
  if (tie) return { label: null, defined: true, why: "Two groups can't be separated by the CIP rules this lab uses." };
  const P = Object.fromEntries(order.map((i) => [i, dirs.get(i)]));
  const V = vol(P, order[3], order[0], order[1], order[2]);
  if (Math.abs(V) < 0.05) return { label: null, defined: true, why: "The wedges and dashes here don't describe a tetrahedral centre (for example, two wedges side by side)." };
  return { label: V < 0 ? "R" : "S", defined: true };
}

function ezOf(m, M, a, b) {
  const A = M.ix.get(a), B = M.ix.get(b), pa = K.atomOf(m, a), pb = K.atomOf(m, b);
  const top = (i, j) => { const r = cipRank(M, i, M.atoms[i].nb.filter((x) => x !== j)); return r.tie ? null : r.order[0]; };
  const ta = top(A, B), tb = top(B, A);
  if (ta == null || tb == null) return { label: null, why: "Two groups on one carbon can't be separated by the CIP rules this lab uses." };
  const at = (k) => (M.atoms[k].id != null ? K.atomOf(m, M.atoms[k].id) : null);
  const ga = at(ta), gb = at(tb);
  const side = (g) => (g ? Math.sign((pb.x - pa.x) * (g.y - pa.y) - (pb.y - pa.y) * (g.x - pa.x)) : 0);
  // a hidden hydrogen can't be the higher group on its carbon (another group always outranks H), so ga and gb exist
  const sa = side(ga), sb = side(gb);
  if (!sa || !sb) return { label: null, why: "The groups are drawn in line with the C=C, so the drawing doesn't show E or Z." };
  return { label: sa === sb ? "Z" : "E" };
}

/** R/S and E/Z for everything the drawing defines. */
export function configuration(m, A = K.analyse(m)) {
  const M = cipModel(m, A.G), locant = {};
  if (A.name?.chain) A.name.chain.forEach((gi, k) => { locant[A.G.id[gi]] = k + 1; });
  const centres = (A.stereo || []).map((id) => ({ atom: id, ...rsOf(m, M, id) }));
  const bonds = (A.ez || []).map((bid) => { const b = K.bondOf(m, bid); return { bond: bid, atoms: [b.a, b.b], ...ezOf(m, M, b.a, b.b) }; });
  return { centres, bonds, locant };
}

/** "(2R,3S)", "(E)", "(2R,3E)"; descriptors without a main-chain locant are listed in drawing order. */
export function descriptor(m, cfg = configuration(m)) {
  const parts = [];
  for (const c of cfg.centres) if (c.label) parts.push({ n: cfg.locant[c.atom], t: c.label });
  for (const b of cfg.bonds) if (b.label) { const ns = b.atoms.map((x) => cfg.locant[x]).filter((x) => x != null); parts.push({ n: ns.length ? Math.min(...ns) : undefined, t: b.label }); }
  if (!parts.length) return "";
  const numbered = parts.every((p) => p.n != null) && parts.length > 1;
  if (numbered) parts.sort((p, q) => p.n - q.n);
  return `(${parts.map((p) => (numbered ? `${p.n}${p.t}` : p.t)).join(",")})`;
}

/** The mirror image across the page: wedges and dashes swap (only at the listed stereocentres if `atoms` is given). */
export function mirror(m, atoms = null) {
  const p = K.clone(m), only = atoms ? new Set(atoms) : null;
  for (const b of p.bonds) if (b.stereo && (!only || only.has(b.a))) b.stereo = b.stereo === "wedge" ? "dash" : "wedge";
  return p;
}

/**
 * A stereo fingerprint: the constitution, plus every descriptor placed by one whole-molecule mapping onto the canonical
 * atom order, taking the smallest over the molecule's symmetries. One mapping for all centres at once matters: sorting
 * each symmetry class separately would let 2,3,4,5-tetrafluorohexane's (2R,3R,4S,5S) and (2R,3S,4R,5S) match, though no
 * symmetry of the chain turns one into the other. R/S and E/Z are properties of each atom, so they move with it.
 */
function stereoKey(m) {
  const A = K.analyse(m), cfg = configuration(m, A);
  if (cfg.centres.some((c) => !c.label) || cfg.bonds.some((b) => !b.label)) return null;
  const G = K.graph(m), can = K.canonical(G, K.aromatic(G));
  if (!can) return null; // too symmetric to search: say "undefined" rather than guess
  const ix = new Map(G.id.map((id, i) => [id, i]));
  const keys = can.orders.map((order) => {
    const pos = new Map(order.map((i, k) => [i, k])), at = (id) => pos.get(ix.get(id));
    return [...cfg.centres.map((c) => `${String(at(c.atom)).padStart(4, "0")}:${c.label}`), ...cfg.bonds.map((b) => `${b.atoms.map(at).sort((x, y) => x - y).map((k) => String(k).padStart(4, "0")).join("=")}:${b.label}`)].sort().join(".");
  });
  return `${A.hash}|${keys.sort()[0]}`;
}

/**
 * Whether the drawn stereoisomer is chiral. Compared through each descriptor's symmetry class, so meso compounds
 * (whose mirror image has the same descriptors on equivalent atoms) come out achiral. No stereocentres: false.
 */
export function chiral(m) {
  const cfg = configuration(m);
  if (!cfg.centres.length) return false;
  const k = stereoKey(m); if (k == null) return null;
  return k !== stereoKey(mirror(m));
}

/** How two drawings are related as isomers. */
export function relation(m1, m2) {
  if (K.analyse(m1).hash !== K.analyse(m2).hash) return "constitutional";
  const k1 = stereoKey(m1), k2 = stereoKey(m2);
  if (k1 == null || k2 == null) return "undefined";
  if (k1 === k2) return "identical";
  return k1 === stereoKey(mirror(m2)) ? "enantiomers" : "diastereomers";
}

// ---------- setting geometry ----------
/** The atoms on `from`'s side of the bond from–to (null if the bond is in a ring). */
function side(m, from, to) {
  const seen = new Set([from]), st = [from];
  while (st.length) { const u = st.pop(); for (const n of K.neighbours(m, u)) { if (u === from && n.atom.id === to) continue; if (n.atom.id === to) return null; if (!seen.has(n.atom.id)) { seen.add(n.atom.id); st.push(n.atom.id); } } }
  return seen;
}
const ezLabel = (m, bondId) => configuration(m).bonds.find((b) => b.bond === bondId)?.label ?? null;
/**
 * Reflects the atoms in `set` across the line through P0 and P1. A reflection in the page is a mirror image, so every
 * wedge or dash whose narrow end (the stereocentre, bond.a) is in the set is swapped too: the branch changes shape on
 * the page but each stereocentre keeps its R/S.
 */
function reflect(m, set, P0, P1) {
  const dx = P1.x - P0.x, dy = P1.y - P0.y, L2 = dx * dx + dy * dy;
  for (const id of set) { const g = K.atomOf(m, id), t = ((g.x - P0.x) * dx + (g.y - P0.y) * dy) / L2, fx = P0.x + t * dx, fy = P0.y + t * dy; g.x = 2 * fx - g.x; g.y = 2 * fy - g.y; }
  for (const b of m.bonds) if ((b.stereo === "wedge" || b.stereo === "dash") && set.has(b.a)) b.stereo = b.stereo === "wedge" ? "dash" : "wedge";
}

/** Reflects the groups on one end of a C=C across its axis, if needed, so the drawing shows `want` ("E" or "Z"). */
export function setEZ(m, bondId, want) {
  const now = ezLabel(m, bondId); if (!now || now === want) return now === want;
  const b = K.bondOf(m, bondId), set = side(m, b.b, b.a); if (!set) return false;
  reflect(m, set, K.atomOf(m, b.a), K.atomOf(m, b.b));
  return ezLabel(m, bondId) === want;
}

const rotate = (m, ids, cx, cy, t) => { const c = Math.cos(t), s = Math.sin(t); for (const id of ids) { const a = K.atomOf(m, id), x = a.x - cx, y = a.y - cy; a.x = cx + c * x - s * y; a.y = cy + s * x + c * y; } };
/** A C=C that was a straight C≡C: turns each end's group 60° off the line, to the same side for Z, opposite for E. */
export function bendAlkene(m, bondId, want) {
  const b = K.bondOf(m, bondId);
  for (const [x, y, dir] of [[b.a, b.b, 1], [b.b, b.a, -1]]) {
    for (const n of K.neighbours(m, x)) if (n.atom.id !== y) { const set = side(m, n.atom.id, x); if (set) rotate(m, set, K.atomOf(m, x).x, K.atomOf(m, x).y, (dir * Math.PI) / 3); }
  }
  return setEZ(m, bondId, want);
}

/**
 * Puts the stereochemistry written in a SMILES onto a drawing laid out from it. `map` takes each SMILES atom's index
 * (in the order written) to its drawing id. Read straight from the SMILES syntax (not from a 3D embedding): @ means
 * that, looking from the first neighbour written, the other three run anticlockwise; / and \ on either side of a C=C
 * give which way each substituent bond points. Each stereocentre gets a wedge (or a dash, if that is what matches) on
 * a bond to a neighbour that isn't itself a stereocentre where possible; one end of each C=C is reflected if needed.
 */
export function stereoFromSmiles(m, map, smiles) {
  if (!/[@/\\]/.test(smiles)) return m;
  const P = parseSmiles(smiles), M = cipModel(m);
  const centres = new Set(P.atoms.map((a, i) => (a.chiral ? map.get(i) : null)).filter((x) => x != null));
  P.atoms.forEach((a, i) => {
    const id = map.get(i); if (!a.chiral || id == null) return;
    const hidden = (M.implicit.get(id) || [])[0];
    const ord = a.order.map((x) => (x === "H" ? hidden : M.ix.get(map.get(x))));
    if (ord.length !== 4 || ord.some((x) => x == null)) return;
    const want = a.chiral === "@" ? -1 : 1; // mol.js's convention: @ → negative signed volume of the four in order
    const ok = () => { const { dirs, lifted } = directions(m, M, id); if (!lifted) return false; const Pd = Object.fromEntries(ord.map((k) => [k, dirs.get(k)])); return Math.sign(vol(Pd, ...ord)) === want; };
    const options = K.neighbours(m, id).filter((n) => n.bond.order === 1).sort((x, y) => (centres.has(x.atom.id) - centres.has(y.atom.id)) || (K.neighbours(m, x.atom.id).length - K.neighbours(m, y.atom.id).length));
    for (const { bond } of options) {
      if (bond.stereo && bond.a !== id) continue;
      if (bond.a !== id) [bond.a, bond.b] = [bond.b, bond.a];
      if (["wedge", "dash"].some((st) => { bond.stereo = st; return ok(); })) return;
      delete bond.stereo;
    }
  });
  for (const b of P.bonds) {
    if (b.order !== 2) continue;
    const dA = P.bonds.find((x) => x.dir && x !== b && (x.a === b.a || x.b === b.a)), dB = P.bonds.find((x) => x.dir && x !== b && (x.a === b.b || x.b === b.b));
    const d = K.bondBetween(m, map.get(b.a), map.get(b.b)); if (!dA || !dB || !d) continue;
    // as in mol.js: each symbol read as the direction of the bond leaving the C=C; the same symbol both sides = trans
    const sA = dA.b === b.a ? dA.dir : dA.dir === "/" ? "\\" : "/", sB = dB.a === b.b ? dB.dir : dB.dir === "/" ? "\\" : "/";
    const p = map.get(dA.a === b.a ? dA.b : dA.a), q = map.get(dB.a === b.b ? dB.b : dB.a);
    setSides(m, d.id, map.get(b.a), p, q, sA !== sB);
  }
  return m;
}

/** Puts p (on end a of the C=C) and q (on the other end) on the same side of the bond, or opposite sides. */
export function setSides(m, bondId, a, p, q, same) {
  const b = K.bondOf(m, bondId), [x, y] = b.a === a ? [b.a, b.b] : [b.b, b.a], P0 = K.atomOf(m, x), P1 = K.atomOf(m, y);
  const sd = (id) => { const g = K.atomOf(m, id); return Math.sign((P1.x - P0.x) * (g.y - P0.y) - (P1.y - P0.y) * (g.x - P0.x)); };
  if (!sd(p) || !sd(q) || (sd(p) === sd(q)) === same) return;
  const set = side(m, y, x); if (!set) return;
  reflect(m, set, P0, P1);
}
