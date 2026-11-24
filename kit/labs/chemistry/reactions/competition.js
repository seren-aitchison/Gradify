// Substitution versus elimination for halogenoalkanes: which of SN1, SN2, E1 and E2 dominates under given conditions.
// A rule-based model of the factors taught at A-level and in first-year courses (substrate class and branching,
// nucleophile strength, base strength and bulk, solvent, temperature). It ranks pathways with relative scores; the
// scores are not yields, and the result says so. No DOM; tested in tests/predictor.test.mjs and the reference set.
//   competition(m, { nuc, solvent, temp }) → { ok, pathways: [{ mech, share, products, why }], factors, note } |
//                                            { ok: false, why }
import * as K from "../skeletal.js";

export const NUCLEOPHILES = {
  hydroxide: { label: "OH⁻ (NaOH or KOH)", group: "O", strongBase: true, goodNuc: true },
  ethoxide: { label: "CH₃CH₂O⁻ (sodium ethoxide)", group: "OEt", strongBase: true, goodNuc: true },
  tbuo: { label: "(CH₃)₃CO⁻ (potassium tert-butoxide, bulky)", group: "OtBu", strongBase: true, goodNuc: false, bulky: true },
  cyanide: { label: "CN⁻ (KCN)", group: "CN", strongBase: false, goodNuc: true },
  water: { label: "H₂O (weak nucleophile)", group: "O", weak: true },
  ethanol: { label: "CH₃CH₂OH (weak nucleophile)", group: "OEt", weak: true },
};
export const SOLVENTS = { water: { label: "water (polar protic)", protic: true }, ethanol: { label: "ethanol (polar protic, less polar)", protic: true }, aprotic: { label: "propanone or DMSO (polar aprotic)", protic: false } };
export const TEMPS = { rt: "room temperature", warm: "warm", hot: "heat under reflux" };
const X = ["Cl", "Br", "I"];
const DEG = Math.PI / 180;

const nb = (m, id) => K.neighbours(m, id), heavy = (m, id) => nb(m, id).filter((n) => n.atom.el !== "H");
const hOf = (m, id) => { const G = K.graph(m), i = G.id.indexOf(id); return i < 0 ? 0 : G.h[i]; };
function sprout(m, id, el, order = 1, dir = null) {
  const a = K.atomOf(m, id), t0 = dir ?? K.nextDir(m, id);
  for (const d of [0, 60, -60, 120, -120, 30, -30, 90, -90, 150, -150, 180]) { const t = t0 + d * DEG, x = a.x + Math.cos(t), y = a.y + Math.sin(t); if (!m.atoms.some((o) => Math.hypot(o.x - x, o.y - y) < 0.6)) { const b = K.addAtom(m, x, y, el); K.addBond(m, a.id, b.id, order); return b; } }
  const b = K.addAtom(m, a.x + Math.cos(t0), a.y + Math.sin(t0), el); K.addBond(m, a.id, b.id, order); return b;
}
export { sprout };
const key = (m) => K.analyse(m).hash;

/** The halogenoalkane sites: sp³ carbon bonded to Cl, Br or I. */
export function halideSites(m) {
  const G = K.graph(m), ar = K.aromatic(G), arom = (id) => ar.atoms.has(G.id.indexOf(id));
  const out = [];
  for (const x of m.atoms) if (X.includes(x.el)) { const h = heavy(m, x.id); if (h.length === 1 && h[0].atom.el === "C" && h[0].bond.order === 1 && !arom(h[0].atom.id) && !nb(m, h[0].atom.id).some((n) => n.bond.order > 1)) out.push({ x: x.id, c: h[0].atom.id, cls: heavy(m, h[0].atom.id).filter((n) => n.atom.el === "C").length }); }
  return out;
}

/** Replaces the halogen with a nucleophile's group. */
export function substitute(m, site, group) {
  const p = K.clone(m), x = K.atomOf(p, site.x), a = K.atomOf(p, site.c);
  if (group === "CN") { x.el = "C"; x.charge = 0; sprout(p, x.id, "N", 3, Math.atan2(x.y - a.y, x.x - a.x)); }
  else { x.el = "O"; x.charge = 0; if (group === "OEt") { const c1 = sprout(p, x.id, "C"); sprout(p, c1.id, "C"); } if (group === "OtBu") { const c1 = sprout(p, x.id, "C"); for (let k = 0; k < 3; k++) sprout(p, c1.id, "C"); } }
  return p;
}
/** Every alkene from losing the leaving group and a β-hydrogen: [{ m, subs }] (subs: alkyl groups on the C=C). */
export function alkenes(m, lg, cA) {
  const betas = heavy(m, cA).filter((n) => n.atom.el === "C" && n.bond.order === 1 && hOf(m, n.atom.id) > 0 && !nb(m, n.atom.id).some((x) => x.bond.order > 1));
  const seen = new Map();
  for (const b of betas) {
    const p = K.clone(m); K.removeAtom(p, lg); const hx = nb(p, b.atom.id).find((n) => n.atom.el === "H"); if (hx) K.removeAtom(p, hx.atom.id);
    K.bondBetween(p, cA, b.atom.id).order = 2; const k = key(p);
    if (!seen.has(k)) seen.set(k, { m: p, subs: heavy(p, cA).length + heavy(p, b.atom.id).length - 2 });
  }
  return [...seen.values()];
}

/** Ranks SN1, SN2, E1 and E2 for one halogenoalkane under the conditions. */
export function competition(m, { nuc = "hydroxide", solvent = "water", temp = "warm" } = {}) {
  const sites = halideSites(m), N = NUCLEOPHILES[nuc], S = SOLVENTS[solvent];
  if (!N || !S || !TEMPS[temp]) return { ok: false, why: "Unknown conditions." };
  if (!sites.length) return { ok: false, why: "This model is for halogenoalkanes (a Cl, Br or I on an sp³ carbon). This molecule has none." };
  if (sites.length > 1) return { ok: false, why: "With more than one halogen, the pathways at each one interact; the model handles one halogen at a time." };
  const st = sites[0], cls = st.cls, el = K.atomOf(m, st.x).el, enes = alkenes(m, st.x, st.c), hasBetaH = enes.length > 0;
  const betaBranched = cls === 1 && heavy(m, st.c).some((n) => n.atom.el === "C" && !nb(m, n.atom.id).some((x) => x.bond.order > 1) && heavy(m, n.atom.id).filter((x) => x.atom.el === "C").length >= 4);
  const hot = temp === "hot", rt = temp === "rt", protic = S.protic, factors = [];
  let sn2 = 0, sn1 = 0, e2 = 0, e1 = 0;
  if (cls <= 1) {
    sn2 = N.bulky ? 1 : N.goodNuc ? 10 : 0.5; if (!protic && N.goodNuc) sn2 *= 1.5; if (betaBranched) sn2 *= 0.05;
    e2 = N.bulky ? 8 : N.strongBase ? (hot ? 3 : 1) * (solvent === "ethanol" ? 1.5 : 1) : 0;
    factors.push(cls === 0 ? "A methyl halide: no carbocation can form and there is no β-hydrogen, so only SN2 is possible." : "Primary: an SN2 attack from the back is unhindered, and a primary carbocation is far too unstable for SN1 or E1.");
    if (betaBranched) factors.push("But the neighbouring carbon is quaternary (a neopentyl-type halide), which blocks the back-side attack: SN2 is thousands of times slower, and there is no β-hydrogen to eliminate. In practice such halides barely react, or rearrange under SN1 conditions.");
  } else if (cls === 2) {
    sn2 = N.goodNuc && !N.bulky ? (nuc === "cyanide" ? 10 : 6) * (protic ? 1 : 1.5) * (hot ? 0.7 : 1) : 0;
    e2 = N.strongBase ? (N.bulky ? 10 : (solvent === "ethanol" ? 6 : 3) * (hot ? 1.6 : rt ? 0.6 : 1)) : nuc === "cyanide" ? 1 : 0;
    sn1 = N.weak ? (protic ? 3 : 0.4) * (hot ? 0.7 : 1) : 0; e1 = N.weak ? (protic ? 1 : 0.2) * (hot ? 3 : 1) : 0;
    factors.push("Secondary: every pathway is possible, so the conditions decide.");
  } else {
    e2 = N.strongBase ? (solvent === "water" && !N.bulky && !hot ? 3 : 10) : nuc === "cyanide" ? 4 : 0;
    sn1 = protic ? (N.weak ? 8 : nuc === "hydroxide" && solvent === "water" ? 6 : 2) * (hot ? 0.6 : 1) : 0.4;
    e1 = protic ? (hot ? 6 : 2) * (N.weak ? 1 : 0.5) : 0.2;
    factors.push("Tertiary: the three alkyl groups block SN2 completely, and the tertiary carbocation is stable enough for SN1 and E1.");
  }
  if (!hasBetaH) { e2 = 0; e1 = 0; if (cls > 0) factors.push("There is no hydrogen on a neighbouring carbon, so elimination can't happen."); }
  if (N.weak) factors.push(`${N.label.split(" (")[0]} is a weak nucleophile and a weak base: it reacts by waiting for the C–X bond to ionise (SN1, E1), which needs a polar protic solvent.`);
  else if (N.bulky) factors.push("tert-Butoxide is a strong base but too bulky to reach carbon: it removes the most accessible β-hydrogen (E2), giving the less substituted alkene (Hofmann product) as the major one.");
  else if (nuc === "cyanide") factors.push("Cyanide is a good nucleophile but a weak base, so substitution is favoured where it is possible.");
  else factors.push(`${N.label.split(" (")[0]} is both a strong nucleophile and a strong base: substitution and elimination compete.`);
  if (!protic) factors.push("A polar aprotic solvent leaves the anion unsolvated and reactive, speeding up SN2; it doesn't stabilise carbocations, so SN1 and E1 slow down.");
  else if (solvent === "ethanol" && N.strongBase) factors.push("In ethanol (less polar than water) hydroxide is a stronger base and less solvated, which favours elimination: the classic “ethanolic KOH” condition.");
  else if (solvent === "water") factors.push("Water solvates the anion and stabilises ions, which favours substitution.");
  factors.push(hot ? "Heating favours elimination: it makes more molecules (higher entropy), which matters more at high temperature." : rt ? "At room temperature substitution is usually favoured over elimination." : "Warming speeds everything up without strongly favouring elimination.");
  factors.push(`Leaving group: ${el === "I" ? "iodide, the best (weakest C–I bond)" : el === "Br" ? "bromide, a good leaving group" : "chloride, the slowest of the three (strongest C–X bond)"}.`);

  const scores = [["SN2", sn2], ["SN1", sn1], ["E2", e2], ["E1", e1]].filter(([, s]) => s > 0).sort((a, b) => b[1] - a[1]);
  if (!scores.length || scores[0][1] < 1) return { ok: false, why: `No significant reaction under these conditions: ${N.weak ? "a weak nucleophile can't do SN2 at a reasonable rate, and a primary carbocation won't form" : "none of the pathways is available"}.`, factors };
  const top = scores[0][1], subProd = substitute(m, st, N.group);
  const elim = (bulky) => { const s = [...enes].sort((a, b) => (bulky ? a.subs - b.subs : b.subs - a.subs)); return s.map((e, i) => ({ m: e.m, role: s.length > 1 && e.subs !== s[0].subs ? "minor" : "major", note: K.analyse(e.m).ez.length ? "Forms as a mixture of E and Z isomers (more E)." : null })); };
  const WHY = { SN2: "One step: the nucleophile attacks from the side opposite the leaving group (inversion of configuration).", SN1: "The C–X bond ionises first to a carbocation, which the nucleophile attacks from either face (racemisation).", E2: "One step: the base removes a β-hydrogen as the halide leaves.", E1: "The carbocation loses a β-hydrogen to the solvent." };
  const pathways = scores.filter(([, s]) => s >= top * 0.3).map(([mech, s]) => ({ mech, share: s === top ? "major" : "minor", score: Math.round((s / top) * 100) / 100, why: WHY[mech],
    products: mech.startsWith("S") ? [{ m: subProd, role: "major" }] : elim(N.bulky && mech === "E2") }));
  if (pathways.filter((p) => p.share === "major").length > 1) pathways.forEach((p) => { p.share = "major"; });
  return { ok: true, site: st, cls, pathways, factors, note: "Ranked by rules, not measured yields: they show which pathway is favoured and why." };
}
