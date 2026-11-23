// The mechanism engine: a mechanism is a sequence of electron-flow operations on a molecular state.
// See docs/ORGANIC-LAB.md for the data model. No DOM; tested in tests/mechanism.test.mjs.
//   state   { atoms: [{ id, el, x, y, n, h }], bonds: [{ id, a, b, e }], next }
//           n non-bonding electrons, h undrawn hydrogens (frozen), e electrons in the bond (2 per order).
//           Formal charge is derived: q = valence electrons − n − Σe/2 − h.
//   arrow   { type: "pair" | "single", from: { lp } | { bond } | { atom }, to: { atom } | { between: [a, b] } }
//   applyStep(state, arrows) → { ok, state, errors, warnings, changes, steps (what happened, in words), checks }
import { graph } from "../skeletal.js";
import { bySym } from "../elements.js";

export const VALENCE_E = { H: 1, Li: 1, Na: 1, K: 1, Mg: 2, B: 3, Al: 3, Fe: 3, C: 4, Si: 4, N: 5, P: 5, O: 6, S: 6, F: 7, Cl: 7, Br: 7, I: 7 };
const SHELL = (el) => (el === "H" || el === "Li" ? 2 : ["S", "P", "Cl", "Br", "I", "Si"].includes(el) ? 12 : 8);
export const EN = (el) => bySym[el]?.en ?? 2.5;
const clone = (s) => JSON.parse(JSON.stringify(s));
export const atomOf = (s, id) => s.atoms.find((a) => a.id === id);
export const bondOf = (s, id) => s.bonds.find((b) => b.id === id);
export const bondBetween = (s, a, b) => s.bonds.find((x) => (x.a === a && x.b === b) || (x.a === b && x.b === a));
const bondsOf = (s, id) => s.bonds.filter((b) => b.a === id || b.b === id);
const other = (b, id) => (b.a === id ? b.b : b.a);

/** Formal charge of an atom, from where its electrons are. */
export function charge(s, id) { const a = atomOf(s, id); return (VALENCE_E[a.el] ?? 0) - a.n - bondsOf(s, id).reduce((t, b) => t + b.e / 2, 0) - a.h; }
/** Electrons round an atom (its own non-bonding plus every bond it is in, hydrogens included). */
export const shellCount = (s, id) => { const a = atomOf(s, id); return a.n + bondsOf(s, id).reduce((t, b) => t + b.e, 0) + 2 * a.h; };
export const lonePairs = (s, id) => Math.floor(atomOf(s, id).n / 2);
export const isRadical = (s, id) => atomOf(s, id).n % 2 === 1;
export const totalElectrons = (s) => s.atoms.reduce((t, a) => t + a.n + 2 * a.h, 0) + s.bonds.reduce((t, b) => t + b.e, 0);

/** A mechanism state from a drawing (kit/labs/chemistry/skeletal.js): implicit hydrogens are frozen, charges kept. */
export function fromDrawing(m) {
  const G = graph(m), hx = new Map(G.id.map((id, i) => [id, G.hx[i]]));
  const s = { atoms: m.atoms.map((a) => ({ id: a.id, el: a.el, x: a.x, y: a.y, n: 0, h: hx.get(a.id) ?? 0 })), bonds: m.bonds.map((b) => ({ id: b.id, a: b.a, b: b.b, e: 2 * b.order })), next: m.next };
  for (const a of s.atoms) { const src = m.atoms.find((x) => x.id === a.id); a.n = Math.max(0, (VALENCE_E[a.el] ?? 0) - (src.charge || 0) - bondsOf(s, a.id).reduce((t, b) => t + b.e / 2, 0) - a.h); }
  return s;
}
const plain = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
const isId = (v) => Number.isSafeInteger(v) && v > 0;
const isCount = (v, max) => Number.isInteger(v) && v >= 0 && v <= max;
const isCoord = (v) => typeof v === "number" && Number.isFinite(v) && Math.abs(v) <= 1e4;
/**
 * A state read back from a saved note, checked and copied field by field: atoms { id, el, x, y, n, h } with el one of
 * the elements this module knows (VALENCE_E), bonds { id, a, b, e } with e = 2, 4 or 6. Null when anything is off.
 */
export function restoreState(v) {
  if (!plain(v) || !Array.isArray(v.atoms) || !Array.isArray(v.bonds)) return null;
  const atoms = [], bonds = [], ids = new Set(), bondIds = new Set();
  for (const a of v.atoms) {
    if (!plain(a) || !isId(a.id) || ids.has(a.id) || typeof a.el !== "string" || !Object.hasOwn(VALENCE_E, a.el) || !isCoord(a.x) || !isCoord(a.y) || !isCount(a.n, 12) || !isCount(a.h, 6)) return null;
    ids.add(a.id); atoms.push({ id: a.id, el: a.el, x: a.x, y: a.y, n: a.n, h: a.h });
  }
  for (const b of v.bonds) {
    if (!plain(b) || !isId(b.id) || bondIds.has(b.id) || !ids.has(b.a) || !ids.has(b.b) || b.a === b.b || ![2, 4, 6].includes(b.e)) return null;
    bondIds.add(b.id); bonds.push({ id: b.id, a: b.a, b: b.b, e: b.e });
  }
  const top = Math.max(0, ...ids, ...bondIds);
  return { atoms, bonds, next: isId(v.next) && v.next > top ? v.next : top + 1 };
}
/** One curly arrow read back from a saved note, copied field by field, or null. */
export function restoreArrow(v) {
  if (!plain(v) || (v.type !== "pair" && v.type !== "single") || !plain(v.from) || !plain(v.to)) return null;
  const from = {}, to = {}, pair = (x) => Array.isArray(x) && x.length === 2 && x.every(isId);
  for (const k of ["lp", "atom"]) if (v.from[k] != null) { if (!isId(v.from[k])) return null; from[k] = v.from[k]; }
  if (v.from.bond != null) { if (!Number.isSafeInteger(v.from.bond)) return null; from.bond = v.from.bond; }
  if (v.from.ends != null) { if (!pair(v.from.ends)) return null; from.ends = [...v.from.ends]; }
  if (v.to.atom != null) { if (!isId(v.to.atom)) return null; to.atom = v.to.atom; }
  if (v.to.between != null) { if (!pair(v.to.between)) return null; to.between = [...v.to.between]; }
  if (!Object.keys(from).length || !Object.keys(to).length) return null;
  return { type: v.type, from, to };
}
/** Builds a state by hand: atoms [key, el, x, y, charge = 0, undrawn H = 0], bonds [keyA, keyB, order]. */
export function build(atoms, bonds) {
  const s = { atoms: [], bonds: [], next: 1 }, key = {};
  for (const [k, el, x, y, q = 0, h = 0] of atoms) { const a = { id: s.next++, el, x, y, n: 0, h }; key[k] = a.id; s.atoms.push(a); }
  for (const [p, q, o = 1] of bonds) s.bonds.push({ id: s.next++, a: key[p], b: key[q], e: 2 * o });
  // non-bonding electrons follow from the charge (an odd count is a radical, e.g. Cl• or CH₃•)
  for (const [k, el, , , q = 0] of atoms) { const a = atomOf(s, key[k]); a.n = (VALENCE_E[el] ?? 0) - q - bondsOf(s, a.id).reduce((t, b) => t + b.e / 2, 0) - a.h; if (a.n < 0) throw new Error(`${k}: impossible charge or hydrogens`); }
  s.key = key;
  return s;
}
/** The state as a drawing for the renderer (bond orders and charges), with each atom's undrawn H count. */
export function toDrawing(s) {
  return { m: { atoms: s.atoms.map((a) => ({ id: a.id, el: a.el, x: a.x, y: a.y, charge: charge(s, a.id) })), bonds: s.bonds.filter((b) => b.e >= 2).map((b) => ({ id: b.id, a: b.a, b: b.b, order: Math.round(b.e / 2) })), next: s.next }, hcount: Object.fromEntries(s.atoms.map((a) => [a.id, a.h])) };
}

export const atomLabel = (s, id) => name(s, id);
const name = (s, id) => { const a = atomOf(s, id), same = s.atoms.filter((x) => x.el === a.el); return same.length > 1 ? `${a.el}${same.indexOf(a) + 1}` : a.el; };
const qs = (q) => (q === 0 ? "0" : `${Math.abs(q) > 1 ? Math.abs(q) : ""}${q > 0 ? "+" : "−"}`);

/**
 * What an arrow does, in electron terms: { e, src: { atom } | { bond: [a, b], id }, dst: { atom } | { pair: [x, y] } }
 * or { error: { code, text } }.
 */
export function normalize(s, arrow) {
  const e = arrow.type === "single" ? 1 : 2, t = arrow.to || {};
  let f = arrow.from || {};
  // a bond named by its two atoms (as reaction templates do) is found in whatever state the step applies to
  if (f.ends && (f.bond == null || !bondOf(s, f.bond))) { const b = bondBetween(s, f.ends[0], f.ends[1]); f = { ...f, bond: b ? b.id : -1 }; }
  if (f.atom != null) return { error: { code: "origin-atom", text: `Arrows start where electrons are: on a lone pair${arrow.type === "single" ? " or a radical's single electron" : ""} or in a bond, not on the atom ${name(s, f.atom)} itself.` } };
  if (t.atom == null && !t.between) return { error: { code: "no-target", text: "This arrow doesn't point to an atom or a bond." } };
  if (f.lp != null) {
    const A = f.lp;
    if (!atomOf(s, A)) return { error: { code: "bad-origin", text: "That lone pair isn't there." } };
    const dst = t.atom != null ? t.atom : t.between;
    if (t.atom != null) { if (t.atom === A) return { error: { code: "self", text: "An arrow has to move electrons somewhere else, not back to the same atom." } }; return { e, src: { atom: A }, dst: { pair: [A, t.atom] } }; }
    if (!dst.includes(A)) return { error: { code: "lp-target", text: `A lone pair on ${name(s, A)} can only form a bond to ${name(s, A)}: point the arrow at the atom it bonds to.` } };
    const C = dst[0] === A ? dst[1] : dst[0]; if (C === A) return { error: { code: "self", text: "An arrow has to move electrons somewhere else." } };
    return { e, src: { atom: A }, dst: { pair: [A, C] } };
  }
  if (f.bond != null) {
    const b = bondOf(s, f.bond); if (!b) return { error: { code: "bad-origin", text: "That bond isn't there." } };
    const ends = [b.a, b.b];
    if (t.atom != null) {
      if (ends.includes(t.atom)) return { e, src: { bond: ends, id: b.id }, dst: { atom: t.atom } };
      const C = atomOf(s, t.atom), [pa, pb] = ends.map((i) => atomOf(s, i));
      const X = Math.hypot(pa.x - C.x, pa.y - C.y) <= Math.hypot(pb.x - C.x, pb.y - C.y) ? pa.id : pb.id;
      return { e, src: { bond: ends, id: b.id }, dst: { pair: [X, t.atom] }, assumed: `the new bond forms from ${name(s, X)}, the end of the bond nearer ${name(s, t.atom)}` };
    }
    const [P, Q] = t.between;
    if ((P === b.a && Q === b.b) || (P === b.b && Q === b.a)) return { error: { code: "same-bond", text: "The arrow starts and ends on the same bond: electrons have to move to a new place." } };
    if (!ends.includes(P) && !ends.includes(Q)) return { error: { code: "bond-target", text: "Electrons from a bond can only form a new bond to one of that bond's own atoms." } };
    return { e, src: { bond: ends, id: b.id }, dst: { pair: [P, Q] } };
  }
  return { error: { code: "no-origin", text: "This arrow doesn't start on electrons." } };
}

const carbocationKind = (s, id) => {
  const cn = bondsOf(s, id).filter((b) => atomOf(s, other(b, id)).el === "C").length;
  const allylic = bondsOf(s, id).some((b) => { const o = other(b, id); return atomOf(s, o).el === "C" && bondsOf(s, o).some((x) => other(x, o) !== id && x.e >= 4); });
  const oxo = bondsOf(s, id).some((b) => b.e >= 4 && ["O", "N"].includes(atomOf(s, other(b, id)).el));
  const vinyl = bondsOf(s, id).some((b) => b.e >= 4 && atomOf(s, other(b, id)).el === "C");
  return { cn, kind: ["methyl", "primary", "secondary", "tertiary"][Math.min(cn, 3)], allylic, oxo, vinyl };
};

/** Applies one step's arrows together. Never throws; errors say what is wrong and which arrow. */
export function applyStep(before, arrows) {
  const s = clone(before), errors = [], warnings = [], steps = [], used = new Map();
  const norm = arrows.map((a, i) => ({ i, a, n: normalize(before, a) }));
  for (const { i, n } of norm) if (n.error) errors.push({ arrow: i, ...n.error });
  // electrons available at each source, counted across the step's arrows
  for (const { i, n } of norm) {
    if (n.error) continue;
    if (n.src.atom != null) { const k = `a${n.src.atom}`, have = atomOf(before, n.src.atom).n, want = (used.get(k) || 0) + n.e; used.set(k, want); if (want > have) errors.push({ arrow: i, code: "no-electrons", text: have === 0 ? `${name(before, n.src.atom)} has no lone pair${n.e === 1 ? " or unpaired electron" : ""} to give.` : n.e === 2 && have === 1 ? `${name(before, n.src.atom)} has a single unpaired electron, not a pair: radical steps use fishhook arrows.` : `${name(before, n.src.atom)} doesn't have enough lone-pair electrons for every arrow starting there.` }); }
    else { const k = `b${n.src.id}`, have = bondOf(before, n.src.id).e, want = (used.get(k) || 0) + n.e; used.set(k, want); if (want > have) errors.push({ arrow: i, code: "no-electrons", text: "More electrons are taken from this bond than it has." }); }
  }
  if (errors.length) return { ok: false, state: before, errors, warnings, changes: [], steps, checks: checksFrom(errors, warnings, true) };
  for (const { n } of norm) {
    if (n.src.atom != null) atomOf(s, n.src.atom).n -= n.e; else bondOf(s, n.src.id).e -= n.e;
    if (n.dst.atom != null) atomOf(s, n.dst.atom).n += n.e;
    else { const [x, y] = n.dst.pair; let b = bondBetween(s, x, y); if (!b) { b = { id: s.next++, a: x, b: y, e: 0 }; s.bonds.push(b); } b.e += n.e; }
    if (n.assumed) warnings.push({ code: "assumed", text: `Read as: ${n.assumed}.` });
  }
  // what changed
  const changes = [];
  for (const b of before.bonds) { const nb = bondOf(s, b.id); if (nb.e !== b.e) changes.push({ kind: nb.e === 0 ? "break" : "order", a: b.a, b: b.b, from: b.e / 2, to: nb.e / 2, id: b.id }); }
  for (const b of s.bonds) if (!before.bonds.some((x) => x.id === b.id)) changes.push({ kind: "form", a: b.a, b: b.b, from: 0, to: b.e / 2, id: b.id });
  for (const b of s.bonds) if (b.e % 2) errors.push({ code: "odd-bond", bond: b.id, text: `The ${name(s, b.a)}–${name(s, b.b)} bond is left with ${b.e === 1 ? "one electron" : `${b.e} electrons`}. ${b.e === 1 ? "A new bond needs a fishhook from each atom (two electrons)." : "Breaking a bond homolytically needs two fishhooks: one electron to each atom."}` });
  s.bonds = s.bonds.filter((b) => b.e > 0);
  for (const a of s.atoms) {
    const sh = shellCount(s, a.id), max = SHELL(a.el), deg = bondsOf(s, a.id).reduce((t, b) => t + b.e / 2, 0) + a.h;
    if (sh > max) errors.push({ code: "valence", atom: a.id, text: a.el === "H" ? `${name(s, a.id)} would have two bonds. Hydrogen holds only two electrons: when a new bond forms to H, its old bond must break in the same step.` : `${name(s, a.id)} would have ${sh} electrons round it (${deg} bonds${a.n ? ` and ${a.n / 2} lone pair${a.n > 2 ? "s" : ""}` : ""}), more than ${max}. ${a.el === "C" ? "When a bond forms to a carbon that already has four bonds, another bond to it must break in the same step (as the leaving group leaves in SN2)." : "Another bond to it must break, or a π bond move onto a neighbour, in the same step."}` });
  }
  const changed = new Set(changes.flatMap((c) => [c.a, c.b]).concat(norm.flatMap(({ n }) => (n.dst?.atom != null ? [n.dst.atom] : n.src?.atom != null ? [n.src.atom] : []))));
  const chargeChanges = [...changed].map((id) => ({ id, from: charge(before, id), to: charge(s, id) })).filter((c) => c.from !== c.to);
  for (const c of chargeChanges) if (Math.abs(c.to) > 1) warnings.push({ code: "big-charge", atom: c.id, text: `${name(s, c.id)} ends up with a ${qs(c.to)} charge, which is rare in organic mechanisms.` });
  if (totalElectrons(s) !== totalElectrons(before)) errors.push({ code: "conservation", text: "Electrons were created or lost." });
  // intermediates worth commenting on
  for (const c of chargeChanges) {
    const a = atomOf(s, c.id);
    if (a.el === "C" && c.to === 1 && carbocationKind(s, c.id).oxo) { steps.push(`${name(s, c.id)} becomes an acylium ion, R–C≡O⁺ ↔ R–C⁺=O: stabilised because the oxygen's lone pair can form a third bond to the carbon.`); continue; }
    if (a.el === "C" && c.to === 1 && carbocationKind(s, c.id).vinyl) { const k = carbocationKind(s, c.id); steps.push(`${name(s, c.id)} becomes a ${k.kind} vinyl cation (the + carbon is part of a C=C): less stable than an alkyl cation, which is why alkynes add electrophiles more slowly than alkenes.`); continue; }
    if (a.el === "C" && c.to === 1) { const k = carbocationKind(s, c.id); steps.push(`${name(s, c.id)} becomes a ${k.kind} carbocation${k.allylic ? " next to a C=C, so the positive charge is delocalised (resonance)" : ""}.`); if (k.cn <= 1 && !k.allylic) warnings.push({ code: "unstable-cation", atom: c.id, text: `A ${k.kind} carbocation is very unstable and doesn't form in solution reactions; ${k.cn === 0 ? "methyl" : "primary"} substrates react by a concerted mechanism (SN2 or E2) instead.` }); }
    if (a.el === "C" && c.to === -1) steps.push(`${name(s, c.id)} becomes a carbanion.`);
  }
  for (const a of s.atoms) if (a.n % 2 && !(atomOf(before, a.id).n % 2)) steps.push(`${name(s, a.id)} now has an unpaired electron: a radical.`);
  steps.unshift(...describe(before, s, norm.map((x) => x.n), changes));
  return { ok: !errors.length, state: errors.length ? before : s, attempted: s, errors, warnings, changes, chargeChanges, steps, checks: checksFrom(errors, warnings, false), electrons: [totalElectrons(before), totalElectrons(s)] };
}
function checksFrom(errors, warnings, early) {
  const has = (...c) => errors.some((e) => c.includes(e.code));
  return [
    ["Arrow origin", !has("origin-atom", "no-origin", "bad-origin", "no-electrons")],
    ["Arrow destination", !has("lp-target", "bond-target", "same-bond", "self", "no-target")],
    ["Valence", early ? null : !has("valence")],
    ["Electrons paired in bonds", early ? null : !has("odd-bond")],
    ["Electron conservation", early ? null : !has("conservation")],
    ["Intermediate stability", early ? null : !warnings.some((w) => w.code === "unstable-cation")],
  ].map(([label, ok]) => ({ label, ok }));
}

/** The step in words, classified from its electron flow. */
export function describe(s0, s1, ns, changes) {
  const out = [], N = (id) => name(s0, id);
  const forms = changes.filter((c) => c.kind === "form" || (c.kind === "order" && c.to > c.from)), breaks = changes.filter((c) => c.kind === "break" || (c.kind === "order" && c.to < c.from));
  const single = ns.some((n) => n.e === 1);
  if (single) {
    const homo = breaks.filter((b) => ns.filter((n) => n.src.id === b.id && n.dst.atom != null).length === 2);
    for (const b of homo) out.push(`Homolytic fission: the ${N(b.a)}–${N(b.b)} bond breaks with one electron going to each atom, making two radicals (initiation, often by UV light).`);
    const fromRad = ns.filter((n) => n.src.atom != null && atomOf(s0, n.src.atom).n % 2);
    if (fromRad.length && breaks.length && !homo.length) out.push(`A radical attacks: its unpaired electron pairs with one from the bond it attacks, and the other electron is left on a new radical (propagation).`);
    else if (fromRad.length >= 2 && !breaks.length) out.push("Two radicals combine to form a bond (termination).");
    return out;
  }
  const isH = (id) => atomOf(s0, id).el === "H";
  for (const n of ns) {
    if (n.src.atom != null && n.dst.pair) { const [A, C] = n.dst.pair, tgt = atomOf(s0, C); out.push(bondBetween(s0, A, C) ? `${N(A)}'s lone pair moves in between ${N(A)} and ${N(C)}, making the ${N(A)}=${N(C)} double bond (a π bond).` : isH(C) ? `${N(A)} uses a lone pair to take a proton (H): it acts as a base (proton transfer).` : charge(s0, C) > 0 ? `${N(A)}'s lone pair forms a bond to the positive ${N(C)}: the nucleophile attacks the electrophile.` : tgt.el === "C" ? `${N(A)}'s lone pair attacks the δ+ carbon ${N(C)}: ${N(A)} acts as a nucleophile.` : `${N(A)}'s lone pair forms a new ${N(A)}–${N(C)} bond.`); }
    else if (n.src.bond && n.dst.atom != null) { const [a, b] = n.src.bond, to = n.dst.atom, from = a === to ? b : a, pi = bondBetween(s0, a, b).e >= 4; out.push(pi ? `The ${N(from)}=${N(to)} π bond's electrons move onto ${N(to)}.` : `Heterolytic fission: the ${N(from)}–${N(to)} bond breaks and both electrons go to ${N(to)}${EN(atomOf(s0, to).el) > EN(atomOf(s0, from).el) ? ", the more electronegative atom" : ""}${charge(s1, to) < 0 ? `, which ${atomOf(s0, to).el === "C" ? "becomes an anion" : s1.bonds.some((x) => (x.a === to || x.b === to) && x.e > 0) ? "keeps them and becomes negative" : "leaves as an anion"}` : ""}.`); }
    else if (n.src.bond && n.dst.pair) { const [a, b] = n.src.bond, [x, y] = n.dst.pair, pi = bondBetween(s0, a, b).e >= 4, newAtom = [x, y].find((i) => i !== a && i !== b); out.push(pi && newAtom != null ? `The π electrons of the ${N(a)}${bondBetween(s0, a, b).e >= 6 ? "≡" : "="}${N(b)} bond form a bond to ${N(newAtom)}: the ${atomOf(s0, a).el === "C" && atomOf(s0, b).el === "C" ? `electron-rich C${bondBetween(s0, a, b).e >= 6 ? "≡" : "="}C acts as a nucleophile` : "π bond attacks"}.` : `The ${N(a)}–${N(b)} bond's electrons move to form a ${N(x)}–${N(y)} ${bondBetween(s0, x, y) ? "π " : ""}bond.`); }
  }
  // patterns across arrows
  const attack = ns.find((n) => n.src.atom != null && n.dst.pair && !isH(n.dst.pair[1]) && !bondBetween(s0, ...n.dst.pair)), leave = ns.find((n) => n.src.bond && n.dst.atom != null && bondBetween(s0, ...n.src.bond).e === 2);
  const reform = ns.find((n) => n.src.atom != null && n.dst.pair && bondBetween(s0, ...n.dst.pair));
  if (reform && leave && leave.src.bond.includes(reform.dst.pair[1])) out.push(atomOf(s0, reform.dst.pair[1]).el === "C" ? "The C=O re-forms and pushes out the leaving group: the elimination half of addition–elimination." : `As the leaving group departs, the new π bond keeps ${N(reform.dst.pair[1])} with a full outer shell.`);
  if (attack && leave && leave.src.bond.includes(attack.dst.pair[1])) out.push("Both happen at once on the same carbon: a concerted, one-step substitution (SN2). The nucleophile attacks from the side opposite the leaving group, so the configuration is inverted.");
  const base = ns.find((n) => n.src.atom != null && n.dst.pair && isH(n.dst.pair[1])), toPi = ns.find((n) => n.src.bond && n.dst.pair && n.src.bond.some(isH));
  if (base && toPi && leave) out.push("Proton removal, C=C formation and loss of the leaving group happen in one step: an E2 elimination.");
  return out;
}

/** Replays a mechanism { start, steps: [{ arrows }] }: every state and every step's result. */
export function replay(mech) {
  const states = [mech.start], results = [];
  for (const st of mech.steps) { const r = applyStep(states[states.length - 1], st.arrows); results.push(r); if (!r.ok) break; let next = r.state; if (st.move) { next = clone(next); for (const [id, [x, y]] of Object.entries(st.move)) { const a = atomOf(next, Number(id)); if (a) { a.x = x; a.y = y; } } } states.push(next); }
  return { states, results, ok: results.every((r) => r.ok) && results.length === mech.steps.length };
}

/** A key for one arrow's effect, so differently drawn arrows that do the same thing compare equal. */
export function arrowKey(s, arrow) {
  const n = normalize(s, arrow); if (n.error) return null;
  const src = n.src.atom != null ? `a${n.src.atom}` : `b${[...n.src.bond].sort((a, b) => a - b).join("-")}`;
  const dst = n.dst.atom != null ? `a${n.dst.atom}` : `p${[...n.dst.pair].sort((a, b) => a - b).join("-")}`;
  return `${n.e}:${src}>${dst}`;
}
/** Whether two states are the same: the same bonds (by atom pair and electrons) and the same electrons on each atom. */
export function sameState(s1, s2) {
  const bk = (s) => s.bonds.map((b) => `${Math.min(b.a, b.b)}-${Math.max(b.a, b.b)}:${b.e}`).sort().join(",");
  const ak = (s) => s.atoms.map((a) => `${a.id}:${a.n}:${a.h}`).sort().join(",");
  return bk(s1) === bk(s2) && ak(s1) === ak(s2);
}
/** The separate species in a state: [{ atoms: [ids], formula, charge, radical }]. */
export function species(s) {
  const seen = new Set(), out = [];
  for (const a0 of s.atoms) {
    if (seen.has(a0.id)) continue; const ids = [], st = [a0.id]; seen.add(a0.id);
    while (st.length) { const u = st.pop(); ids.push(u); for (const b of bondsOf(s, u)) { const o = other(b, u); if (!seen.has(o)) { seen.add(o); st.push(o); } } }
    const counts = {}; let q = 0, rad = false;
    for (const id of ids) { const a = atomOf(s, id); counts[a.el] = (counts[a.el] || 0) + 1; if (a.h) counts.H = (counts.H || 0) + a.h; q += charge(s, id); if (a.n % 2) rad = true; }
    // Hill order with carbon; without it, H first as usually written (HCl, H₂O, H₃O⁺)
    const ks = Object.keys(counts), order = counts.C ? ["C", "H", ...ks.filter((k) => k !== "C" && k !== "H").sort()] : [...ks.filter((k) => k === "H"), ...ks.filter((k) => k !== "H").sort()];
    const formula = order.filter((k) => counts[k]).map((k) => `${k}${counts[k] > 1 ? counts[k] : ""}`).join("") + (q ? (q > 0 ? "+" : "-").repeat(Math.abs(q)) : "") + (rad ? "•" : "");
    out.push({ atoms: ids, formula, charge: q, radical: rad });
  }
  return out;
}
/** δ+ / δ− on polar bonds (electronegativity difference above 0.4): [{ atom, sign }]. */
export function partialCharges(s) {
  const out = new Map();
  for (const b of s.bonds) { const A = atomOf(s, b.a), B = atomOf(s, b.b), d = EN(A.el) - EN(B.el); if (Math.abs(d) < 0.4 || A.el === "H" && B.el === "C" || B.el === "H" && A.el === "C") continue; const [p, m] = d > 0 ? [B, A] : [A, B]; if (!charge(s, p.id)) out.set(p.id, "δ+"); if (!charge(s, m.id)) out.set(m.id, "δ−"); }
  return [...out].map(([atom, sign]) => ({ atom, sign }));
}

/** Structured data about a mechanism attempt, for an AI tutor to explain (it never decides validity itself). */
export function tutorContext({ title, reaction, state, arrows, result, stepIndex, expected }) {
  return {
    reaction: reaction ? { id: reaction.id, title: reaction.title, family: reaction.family, conditions: reaction.conditions } : null, title,
    step: stepIndex, atoms: state.atoms.map((a) => ({ id: a.id, label: name(state, a.id), el: a.el, charge: charge(state, a.id), lonePairs: lonePairs(state, a.id), radical: isRadical(state, a.id) })),
    bonds: state.bonds.map((b) => ({ a: name(state, b.a), b: name(state, b.b), order: b.e / 2 })),
    arrows: arrows.map((a) => ({ type: a.type, from: a.from.lp != null ? `lone pair on ${name(state, a.from.lp)}` : a.from.ends ? `bond ${name(state, a.from.ends[0])}–${name(state, a.from.ends[1])}` : a.from.bond != null && bondOf(state, a.from.bond) ? `bond ${name(state, bondOf(state, a.from.bond).a)}–${name(state, bondOf(state, a.from.bond).b)}` : `atom ${name(state, a.from.atom)}`, to: a.to.atom != null ? name(state, a.to.atom) : a.to.between.map((i) => name(state, i)).join("–") })),
    verdict: result ? { valid: result.ok, errors: result.errors.map((e) => e.text), warnings: result.warnings.map((w) => w.text), whatHappened: result.steps, matchesExpected: expected ?? null } : null,
  };
}
