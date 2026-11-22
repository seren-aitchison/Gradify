// Reaction mode's predictor: a reagent and conditions applied to a drawn molecule (kit/labs/chemistry/skeletal.js
// model), by explicit rule templates for reactions taught at A-level and in first-year university courses.
// Rule-based on purpose: every product comes from a stated rule (Markovnikov, Zaitsev and Hofmann, oxidation level,
// directing effects, chemoselectivity of each reagent), every group in the molecule that the reagent attacks is
// treated, and when no rule applies the predictor says why instead of guessing. Substitution versus elimination is
// decided by competition.js, so the two always agree. No DOM; tested in tests/predictor.test.mjs and against the
// hand-written reference set in tests/data/organic-reference.mjs.
//   predict(m, reagentId) → { reacts, type, products: [{ m, role: "major" | "minor" | "product", note }],
//                             join: "or" | "+", byproducts, why: [reasoning], stereo: [notes], mechanism | null }
import * as K from "../skeletal.js";
import { competition, halideSites, sprout, substitute } from "./competition.js";

export { sprout };
export const LEVELS = { foundation: "Foundation", intermediate: "Intermediate", advanced: "Advanced", university: "University" };
const RANK = { foundation: 0, intermediate: 1, advanced: 2, university: 3 };
export const atLevel = (item, level) => RANK[item.level || "foundation"] <= RANK[level || "university"];

const X = ["Cl", "Br", "I"];
const nb = (m, id) => K.neighbours(m, id);
const heavy = (m, id) => nb(m, id).filter((n) => n.atom.el !== "H");
const ctx = (m) => {
  const G = K.graph(m), ix = new Map(G.id.map((id, i) => [id, i])), ar = K.aromatic(G);
  return { G, H: (id) => G.h[ix.get(id)] ?? 0, arom: (id) => ar.atoms.has(ix.get(id)) };
};
const multiple = (m, id) => nb(m, id).some((n) => n.bond.order > 1);
const cCount = (m, id) => heavy(m, id).filter((n) => n.atom.el === "C").length;
const CLASS = ["methyl", "primary", "secondary", "tertiary", "quaternary"];
const dropDrawnH = (m, id) => { const h = nb(m, id).find((n) => n.atom.el === "H"); if (h) K.removeAtom(m, h.atom.id); };
const setOrder = (m, a, b, o) => { K.bondBetween(m, a, b).order = o; };
const cut = (m, a, b) => { m.bonds = m.bonds.filter((x) => !((x.a === a && x.b === b) || (x.a === b && x.b === a))); };
const key = (pm) => K.analyse(pm).hash;
const uniq = (list) => { const seen = new Map(); for (const p of list) { const k = key(p.m); if (!seen.has(k)) seen.set(k, p); } return [...seen.values()]; };
const nameOf = (m) => K.analyse(m).name?.name || K.analyse(m).formula;

/** The separate molecules in a drawing (after a bond is cut), each with its atoms and bonds. */
export function split(m) {
  const seen = new Set(), out = [];
  for (const a0 of m.atoms) {
    if (seen.has(a0.id)) continue; const ids = new Set([a0.id]), st = [a0.id]; seen.add(a0.id);
    while (st.length) { const u = st.pop(); for (const n of nb(m, u)) if (!seen.has(n.atom.id)) { seen.add(n.atom.id); ids.add(n.atom.id); st.push(n.atom.id); } }
    out.push({ atoms: m.atoms.filter((a) => ids.has(a.id)), bonds: m.bonds.filter((b) => ids.has(b.a)), next: m.next });
  }
  return out;
}
/** Small inorganic pieces left after a hydrolysis or cleavage are reported as by-products, not drawn. */
const SMALL = { H2O: "H₂O", CH2O2: "HCOOH", CO2: "CO₂", NH3: "NH₃", "H4N+": "NH₄⁺", CH2O: "HCHO" };
function pieces(p, role = "product") {
  const prods = [], by = [];
  for (const q of split(p)) { const A = K.analyse(q), f = A.formula + (A.charge ? (A.charge > 0 ? "+" : "-") : ""); if (q.atoms.length === 1 && q.atoms[0].el === "N") by.push(q.atoms[0].charge > 0 ? "NH₄⁺" : "NH₃"); else if (SMALL[f] && q.atoms.length <= 3 && f !== "CH2O") by.push(SMALL[f]); else prods.push({ m: q, role }); }
  return { prods, by };
}

// ---------- sites ----------
const alkenes = (m, c) => m.bonds.filter((b) => b.order === 2 && K.atomOf(m, b.a).el === "C" && K.atomOf(m, b.b).el === "C" && !(c.arom(b.a) && c.arom(b.b)));
const alkynes = (m) => m.bonds.filter((b) => b.order === 3 && K.atomOf(m, b.a).el === "C" && K.atomOf(m, b.b).el === "C");
function alcohols(m, c) {
  const out = [];
  for (const o of m.atoms) if (o.el === "O" && !o.charge) {
    const h = heavy(m, o.id); if (h.length !== 1 || h[0].atom.el !== "C" || h[0].bond.order !== 1 || !c.H(o.id)) continue;
    const C = h[0].atom.id; if (c.arom(C) || multiple(m, C) || heavy(m, C).some((n) => n.atom.id !== o.id && n.atom.el !== "C")) continue;
    out.push({ o: o.id, c: C, cls: Math.max(1, cCount(m, C)) });
  }
  return out;
}
/** Every C=O, classified: aldehyde, ketone, acid, carboxylate, ester, anhydride, amide, acyl-halide, other. */
function carbonyls(m, c) {
  const out = [];
  for (const b of m.bonds) {
    if (b.order !== 2) continue; const [p, q] = [K.atomOf(m, b.a), K.atomOf(m, b.b)], C = p.el === "C" ? p : q, O = C === p ? q : p;
    if (C.el !== "C" || O.el !== "O") continue;
    const het = heavy(m, C.id).filter((n) => n.atom.id !== O.id && n.atom.el !== "C");
    let kind = "other", x = null, r = null;
    if (!het.length) kind = c.H(C.id) ? "aldehyde" : "ketone";
    else if (het.length === 1) {
      const h = het[0].atom; x = h.id;
      if (h.el === "O" && h.charge === -1) kind = "carboxylate";
      else if (h.el === "O" && heavy(m, h.id).length === 1) kind = "acid";
      else if (h.el === "O") { const o2 = heavy(m, h.id).find((n) => n.atom.id !== C.id).atom; r = o2.id; kind = nb(m, o2.id).some((n) => n.bond.order === 2 && n.atom.el === "O") ? "anhydride" : "ester"; }
      else if (h.el === "N") kind = "amide";
      else if (X.includes(h.el)) kind = "acyl-halide";
    }
    out.push({ c: C.id, o: O.id, kind, x, r });
  }
  return out;
}
const nitriles = (m) => m.bonds.filter((b) => b.order === 3 && [b.a, b.b].some((i) => K.atomOf(m, i).el === "N")).map((b) => { const n = K.atomOf(m, b.a).el === "N" ? b.a : b.b; return { n, c: n === b.a ? b.b : b.a }; });
const sixRings = (m, c) => K.rings(c.G, 6).filter((r) => r.length === 6 && r.every((i) => c.arom(c.G.id[i]))).map((r) => r.map((i) => c.G.id[i]));
const list = (a) => (a.length < 2 ? a.join("") : `${a.slice(0, -1).join(", ")} and ${a.at(-1)}`);
function none(m, need) {
  const have = [...new Set(K.analyse(m).groups.map((g) => g.label.toLowerCase().replace(/\s*\(.*\)/, "")))].map((g) => (/^[aeiou]/.test(g) ? `an ${g}` : `a ${g}`));
  return { fail: `No reaction: ${need}, and ${have.length ? `this molecule has ${list(have)}` : "this molecule has no functional group that reacts with it"}.` };
}

// ---------- stereochemistry notes ----------
function stereoNotes(m, prods, kind) {
  const before = K.analyse(m).stereo.length, out = new Set();
  for (const p of prods) {
    const A = K.analyse(p.m), gained = A.stereo.length - before;
    if (gained > 0 && kind === "planar") out.add("A new stereocentre forms at a planar (sp²) carbon. The reagent attacks either face equally, so the product is a racemic mixture (no optical activity).");
    if (gained > 1 && kind === "anti") out.add("Two stereocentres form. The two groups add to opposite faces (anti addition), so which stereoisomers form depends on whether the alkene was E or Z; a flat drawing doesn't fix that.");
    if (gained > 1 && kind === "syn") out.add("Two stereocentres form. Both –OH groups add to the same face (syn addition).");
  }
  return [...out];
}

// ---------- addition rules ----------
/** HX or H₂O across C=C, Markovnikov: H to the carbon with fewer carbons attached, so the cation is more stable. */
function markovnikov(m, X0, label) {
  const c = ctx(m), sites = alkenes(m, c);
  if (!sites.length) return null;
  if (sites.some((b) => [b.a, b.b].some((i) => heavy(m, i).some((n) => n.atom.el === "C" && nb(m, n.atom.id).some((x) => x.bond.order >= 2 && ["O", "N"].includes(x.atom.el)))))) return { fail: "This C=C is conjugated with a C=O (or C≡N). A carbocation next to that group is destabilised, so addition goes the other way (conjugate addition, X on the carbon further from the C=O). That is outside the Markovnikov rule the lab uses, so it makes no prediction." };
  const deg = (id) => cCount(m, id);
  const make = (choose) => { const p = K.clone(m); for (const b of sites) { const [, xC] = choose(b); setOrder(p, b.a, b.b, 1); sprout(p, xC, X0); } return p; };
  const major = make((b) => (deg(b.a) >= deg(b.b) ? [b.b, b.a] : [b.a, b.b]));
  const why = [], prods = [{ m: major, role: "product" }];
  if (sites.length === 1) {
    const b = sites[0], minor = make((b2) => (deg(b2.a) >= deg(b2.b) ? [b2.a, b2.b] : [b2.b, b2.a]));
    if (key(minor) !== key(major)) {
      const [da, db] = [deg(b.a), deg(b.b)].sort((x, y) => y - x);
      if (da === db) { prods.push({ m: minor, role: "product" }); why.push(`Both carbons of the C=C carry the same number of carbon groups, so either carbocation is equally stable (${CLASS[da]}): two products form in similar amounts.`); }
      else { prods[0].role = "major"; prods.push({ m: minor, role: "minor" }); why.push(`Markovnikov's rule: H adds to the C=C carbon that already has more hydrogens, leaving the positive charge on the carbon with more carbon groups (a ${CLASS[da]} rather than ${CLASS[db]} carbocation). The more stable carbocation gives the major product.`); }
    } else why.push("The alkene is symmetrical, so there is only one product.");
  } else why.push(`Each of the ${sites.length} C=C bonds reacts (reagent in excess), each following Markovnikov's rule.`);
  if (sites.some((b) => [b.a, b.b].some((i) => nb(m, i).some((n) => n.atom.id !== b.a && n.atom.id !== b.b && c.arom(n.atom.id))))) why.push("Next to a benzene ring the cation is benzylic, stabilised by the ring's delocalised electrons, so the X goes on the carbon next to the ring.");
  return { prods, why, stereo: stereoNotes(m, prods, "planar"), label };
}
/** HX across C≡C twice (excess): both X on the more substituted carbon (a geminal dihalide). */
function alkyneHX(m, X0) {
  const s = alkynes(m); if (!s.length) return null;
  const p = K.clone(m); for (const b of s) { const t = cCount(m, b.a) >= cCount(m, b.b) ? b.a : b.b; setOrder(p, b.a, b.b, 1); sprout(p, t, X0); sprout(p, t, X0); }
  return { prods: [{ m: p, role: "product" }], why: ["With excess HBr each C≡C adds two HBr. Both follow Markovnikov's rule, so both bromines end up on the same, more substituted carbon (a geminal dibromide)."] };
}

// ---------- aromatic substitution ----------
/** The directing class of a group on a benzene ring. Rank: 3 strong activator, 2 moderate, 1 alkyl, 0 halogen, −1 deactivating (3-directing). */
function directing(m, c, ringId, at) {
  const sub = heavy(m, at.id);
  if (at.el === "O") return at.charge === -1 ? { rank: 3, label: "–O⁻" } : sub.some((n) => n.atom.id !== ringId && nb(m, n.atom.id).some((x) => x.bond.order === 2 && x.atom.el === "O")) ? { rank: 2, label: "an ester –OCOR group" } : { rank: 3, label: c.H(at.id) ? "–OH" : "–OR" };
  if (at.el === "N") { if (at.charge > 0) return { rank: -1, label: at.charge && sub.some((n) => n.atom.el === "O") ? "–NO₂" : "–NH₃⁺" }; return sub.some((n) => n.atom.id !== ringId && nb(m, n.atom.id).some((x) => x.bond.order === 2 && x.atom.el === "O")) ? { rank: 2, label: "an amide –NHCOR group" } : { rank: 3, label: "–NH₂ (or –NHR)" }; }
  if (X.includes(at.el) || at.el === "F") return { rank: 0, label: `–${at.el}` };
  if (at.el === "S") return { rank: -1, label: "–SO₃H" };
  if (at.el === "C") {
    if (nb(m, at.id).some((n) => n.bond.order > 1 && n.atom.el !== "C")) return { rank: -1, label: nb(m, at.id).some((n) => n.bond.order === 3) ? "–C≡N" : "a C=O group (–CHO, –COR, –COOH, –COOR)" };
    if (heavy(m, at.id).filter((n) => ["F", "Cl", "Br"].includes(n.atom.el)).length >= 2) return { rank: -1, label: "–CF₃ (or –CCl₃)" };
    if (c.arom(at.id)) return { rank: 1, label: "a phenyl group" };
    return { rank: 1, label: "an alkyl group" };
  }
  return { rank: 0, label: at.el };
}
/**
 * Where an electrophile substitutes on a benzene ring: [{ pos (ring index), id }] and the reasoning. The strongest
 * activator controls; positions squeezed between two groups are avoided when there's a choice.
 */
function aromaticSites(m, c, r) {
  const subs = r.map((id, i) => ({ i, id, s: heavy(m, id).find((n) => !r.includes(n.atom.id)) })).filter((x) => x.s).map((x) => ({ ...x, d: directing(m, c, x.id, x.s.atom) }));
  const free = r.map((id, i) => ({ i, id })).filter((x) => c.H(x.id) > 0);
  if (!subs.length) return { sites: [free[0]], why: [], subs };
  const best = Math.max(...subs.map((s) => s.d.rank)), ctrl = subs.filter((s) => s.d.rank === best);
  const dirs = (s) => (s.d.rank >= 0 ? [1, 3, 5] : [2, 4]).map((d) => (s.i + d) % 6);
  let want = new Set(ctrl.flatMap(dirs)), sites = free.filter((f) => want.has(f.i));
  const crowded = (f) => subs.filter((s) => Math.abs(((s.i - f.i + 6) % 6)) === 1 || Math.abs(((f.i - s.i + 6) % 6)) === 1).length >= 2;
  if (sites.filter((f) => !crowded(f)).length) sites = sites.filter((f) => !crowded(f));
  const why = [];
  for (const s of subs) why.push(`${s.d.label[0].toUpperCase()}${s.d.label.slice(1)} ${s.d.rank >= 2 ? "donates electrons strongly (lone pair into the ring): it activates the ring and directs to the 2- and 4-positions" : s.d.rank === 1 ? "donates electrons weakly: it activates the ring and directs to the 2- and 4-positions" : s.d.rank === 0 ? "deactivates the ring slightly (it is electronegative) but its lone pairs direct to the 2- and 4-positions" : "withdraws electrons: it deactivates the ring and directs to the 3-position"}.`);
  if (subs.length > 1) why.push(ctrl.length === subs.length ? "The groups direct to positions that can be compared directly; the products are the positions they favour." : "When groups disagree, the stronger activating group controls where the electrophile goes.");
  if (subs.length > 1 && sites.length < free.filter((f) => want.has(f.i)).length) why.push("The position squeezed between two groups is hindered, so little substitution happens there.");
  return { sites, why, subs };
}
function aromatic(m, kind) {
  const c = ctx(m), rs = sixRings(m, c);
  if (!rs.length) return null;
  if (rs.length > 1) return { fail: "The lab predicts aromatic substitution for one benzene ring; molecules with several rings need directing rules it doesn't cover." };
  if (alkenes(m, c).length) return { fail: "This molecule also has a C=C outside the ring, which reacts with the electrophile first (addition, or polymerisation with AlCl₃), so the lab doesn't predict ring substitution here." };
  const r = rs[0], { sites, why, subs } = aromaticSites(m, c, r);
  if (!sites.length) return { fail: "Every position on the ring already carries a group." };
  const minRank = Math.min(...subs.map((s) => s.d.rank), 9), maxRank = Math.max(...subs.map((s) => s.d.rank), -9);
  if ((kind === "alkyl" || kind === "acyl") && minRank < 0) return { fail: "No reaction: Friedel–Crafts reactions fail on rings carrying a strongly electron-withdrawing group (–NO₂, C=O, –CN): the ring is too deactivated to attack the electrophile." };
  if ((kind === "alkyl" || kind === "acyl") && subs.some((s) => s.d.label.startsWith("–NH₂") || s.d.label === "–OH")) return { fail: "No reaction (not usefully): the lone pair on –NH₂ or –OH bonds to the AlCl₃ catalyst, which deactivates the ring and uses up the catalyst." };
  if ((kind === "Cl" || kind === "Br") && subs.some((s) => s.d.label.startsWith("–NH₂"))) return { fail: "Not with a halogen carrier: phenylamine is so activated that it reacts with bromine water alone, at every free 2-, 4- and 6-position (choose “Br₂, room temperature”), and the –NH₂ lone pair would bond to the Lewis-acid catalyst." };
  if (kind === "nitro" && subs.some((s) => s.d.label.startsWith("–NH₂"))) return { fail: "Not predicted: concentrated nitric acid oxidises phenylamine, and in strong acid –NH₂ is protonated to –NH₃⁺, which directs to the 3-position. In practice the –NH₂ is first protected as an amide (–NHCOCH₃), nitrated, then hydrolysed." };
  const cx = r.reduce((t, k) => t + K.atomOf(m, k).x, 0) / 6, cy = r.reduce((t, k) => t + K.atomOf(m, k).y, 0) / 6;
  const add = (f) => {
    const p = K.clone(m); dropDrawnH(p, f.id); const a = K.atomOf(p, f.id), out = Math.atan2(a.y - cy, a.x - cx);
    if (kind === "nitro") { const N = sprout(p, f.id, "N", 1, out); N.charge = 1; sprout(p, N.id, "O", 2); const O = sprout(p, N.id, "O"); O.charge = -1; }
    else if (kind === "alkyl") sprout(p, f.id, "C", 1, out);
    else if (kind === "acyl") { const C1 = sprout(p, f.id, "C", 1, out); sprout(p, C1.id, "O", 2); sprout(p, C1.id, "C"); }
    else sprout(p, f.id, kind, 1, out);
    return { m: p, role: sites.length > 1 ? "major" : "product" };
  };
  const prods = uniq(sites.map(add)); if (prods.length === 1) prods[0].role = "product";
  if (kind === "acyl" && prods.length > 1) { const ortho = (f) => subs.some((x) => (x.i - f.i + 6) % 6 === 1 || (f.i - x.i + 6) % 6 === 1); const ps = uniq(sites.map((f) => ({ ...add(f), o: ortho(f) }))); if (ps.some((p) => !p.o) && ps.some((p) => p.o)) { ps.forEach((p) => { p.role = p.o ? "minor" : "major"; }); why.push("The acylium ion is bulky, so attack next to an existing group (the 2-position) is hindered: the 4-product is the major one."); return { prods: ps.map(({ m: pm, role }) => ({ m: pm, role })), why, activated: maxRank >= 2 }; } }
  return { prods, why, activated: maxRank >= 2 };
}

// ---------- oxidation and reduction ----------
function oxidise(m, full) {
  const c = ctx(m), alc = alcohols(m, c), ald = full ? carbonyls(m, c).filter((x) => x.kind === "aldehyde") : [];
  const ox = alc.filter((a) => a.cls < 3);
  if (!ox.length && !ald.length) {
    if (alc.length) return { fail: "No reaction: a tertiary alcohol has no hydrogen on the carbon carrying the –OH, so it can't be oxidised. The dichromate stays orange (this is how tertiary alcohols are told apart)." };
    if (!full && carbonyls(m, c).some((x) => x.kind === "aldehyde")) return { fail: "Distilling removes an aldehyde before it can react; to oxidise an aldehyde to a carboxylic acid, heat under reflux with excess oxidising agent." };
    return none(m, "acidified dichromate oxidises primary and secondary alcohols (and aldehydes)");
  }
  const p = K.clone(m), why = [];
  for (const a of ox) { dropDrawnH(p, a.c); setOrder(p, a.c, a.o, 2); if (a.cls === 1 && full) sprout(p, a.c, "O"); }
  for (const x of ald) sprout(p, x.c, "O");
  if (ox.some((a) => a.cls === 1)) why.push(full ? "A primary alcohol is oxidised first to an aldehyde and then, under reflux (the aldehyde can't escape), on to a carboxylic acid." : "A primary alcohol is oxidised to an aldehyde. Distilling it off as it forms stops it being oxidised further to a carboxylic acid.");
  if (ox.some((a) => a.cls === 2)) why.push("A secondary alcohol is oxidised to a ketone, which isn't oxidised further.");
  if (ald.length) why.push("The aldehyde is oxidised to a carboxylic acid.");
  if (alc.some((a) => a.cls === 3)) why.push("The tertiary –OH is unchanged: it has no H on its carbon.");
  if (alkenes(m, c).length) why.push("Acidified dichromate at these conditions isn't used for C=C; the model leaves C=C unchanged.");
  why.push("Colour change: orange Cr₂O₇²⁻ is reduced to green Cr³⁺. In equations the oxidising agent is written [O].");
  return { prods: [{ m: p, role: "product" }], why, byproducts: ["H₂O"] };
}
/** Hydride reduction. strong: LiAlH₄ (also acids, esters, amides, nitriles); otherwise NaBH₄ (aldehydes and ketones only). */
function reduce(m, strong) {
  const c = ctx(m), cos = carbonyls(m, c), red = cos.filter((x) => x.kind === "aldehyde" || x.kind === "ketone" || x.kind === "acyl-halide" || (strong && ["acid", "ester", "amide"].includes(x.kind))), cn = strong ? nitriles(m) : [];
  const skipped = cos.filter((x) => !red.includes(x));
  if (!red.length && !cn.length) return skipped.length ? { fail: strong ? "No reaction with these groups." : "No reaction: NaBH₄ reduces aldehydes and ketones, but not carboxylic acids, esters or amides; their C=O is less electrophilic (the neighbouring O or N donates electron density). LiAlH₄ in dry ether reduces them." } : none(m, strong ? "LiAlH₄ reduces C=O groups and nitriles" : "NaBH₄ reduces the C=O of aldehydes and ketones");
  const p = K.clone(m), why = [];
  for (const x of red) {
    if (x.kind === "aldehyde" || x.kind === "ketone") setOrder(p, x.c, x.o, 1);
    else if (x.kind === "acid") K.removeAtom(p, x.o);
    else if (x.kind === "ester") { setOrder(p, x.c, x.o, 1); cut(p, x.c, x.x); }
    else if (x.kind === "amide") K.removeAtom(p, x.o);
    else if (x.kind === "acyl-halide") { setOrder(p, x.c, x.o, 1); K.removeAtom(p, x.x); }
  }
  for (const n of cn) setOrder(p, n.c, n.n, 1);
  const kinds = new Set(red.map((x) => x.kind));
  if (kinds.has("aldehyde")) why.push("An aldehyde is reduced to a primary alcohol.");
  if (kinds.has("ketone")) why.push("A ketone is reduced to a secondary alcohol.");
  if (kinds.has("acid")) why.push("LiAlH₄ reduces a carboxylic acid all the way to a primary alcohol.");
  if (kinds.has("ester")) why.push("An ester is reduced to two alcohols: the acyl part becomes a primary alcohol, and the alkoxy part is released as its alcohol.");
  if (kinds.has("amide")) why.push("An amide's C=O is reduced to CH₂, giving an amine.");
  if (kinds.has("acyl-halide")) why.push("An acyl chloride is reduced to a primary alcohol (via the aldehyde).");
  if (cn.length) why.push("A nitrile is reduced to a primary amine (–CH₂NH₂).");
  why.unshift(`The hydride ion (H⁻) from ${strong ? "LiAlH₄" : "NaBH₄"} attacks the δ+ carbon; the oxygen is then protonated${strong ? " (dilute acid work-up)" : ""}.`);
  if (skipped.length && !strong) why.push("The acid, ester or amide group is left alone: NaBH₄ is the milder reagent (chemoselective).");
  if (alkenes(m, c).length) why.push("C=C bonds aren't reduced: hydride is a nucleophile, and the electron-rich C=C doesn't attract it.");
  const { prods, by } = pieces(p);
  return { prods, why, byproducts: by, join: "+", stereo: stereoNotes(m, prods, "planar") };
}

// ---------- hydrolysis and acyl chemistry ----------
/** Hydrolysis of esters, amides, nitriles and acyl chlorides. mode: "acid" | "alkali". */
function hydrolyse(m, mode, { esters = true, amides = true, nitrile = true } = {}) {
  const c = ctx(m), cos = carbonyls(m, c), p = K.clone(m), why = [], seen = new Set(), used = new Set();
  const asAcid = (cId) => { const o = sprout(p, cId, "O"); if (mode === "alkali") o.charge = -1; };
  for (const x of cos) {
    if (x.kind === "ester" && esters) { cut(p, x.c, x.x); asAcid(x.c); seen.add("ester"); }
    if (x.kind === "anhydride" && esters && !used.has(x.x)) { used.add(x.x); cut(p, x.c, x.x); asAcid(x.c); seen.add("anhydride"); }
    if (x.kind === "amide" && amides) { const N = K.atomOf(p, x.x); cut(p, x.c, x.x); asAcid(x.c); if (mode === "acid") N.charge = 1; seen.add("amide"); }
    if (x.kind === "acyl-halide") { K.atomOf(p, x.x).el = "O"; if (mode === "alkali") K.atomOf(p, x.x).charge = -1; seen.add("acyl"); }
    if (x.kind === "acid" && mode === "alkali") { K.atomOf(p, x.x).charge = -1; seen.add("acid"); }
  }
  const extra = [];
  if (nitrile) for (const n of nitriles(m)) { K.removeAtom(p, n.n); sprout(p, n.c, "O", 2); asAcid(n.c); seen.add("nitrile"); extra.push(mode === "acid" ? "NH₄⁺" : "NH₃"); }
  if (!seen.size) return null;
  if (seen.has("ester")) why.push(mode === "acid" ? "The ester is hydrolysed to a carboxylic acid and an alcohol. With an acid catalyst the reaction is reversible (the reverse of esterification), so it doesn't go to completion." : "Saponification: hydroxide hydrolyses the ester to the carboxylate ion (as its sodium salt) and the alcohol. It goes to completion because the carboxylate can't react back.");
  if (seen.has("anhydride")) why.push("The anhydride is hydrolysed to two carboxylic acid molecules.");
  if (seen.has("amide")) why.push(mode === "acid" ? "The amide is hydrolysed to the carboxylic acid; the nitrogen ends up as an ammonium ion in the acid." : "The amide is hydrolysed to the carboxylate ion and ammonia (or an amine), which is given off.");
  if (seen.has("nitrile")) why.push(mode === "acid" ? "The nitrile is hydrolysed to a carboxylic acid (via an amide), and the nitrogen becomes NH₄⁺." : "The nitrile is hydrolysed to the carboxylate ion, giving off ammonia.");
  if (seen.has("acyl")) why.push(mode === "acid" ? "The acyl chloride is hydrolysed to the carboxylic acid (and HCl)." : "The acyl chloride is hydrolysed to the carboxylate ion.");
  if (seen.has("acid")) why.push("The carboxylic acid is neutralised to its carboxylate ion (an acid–base reaction, not a substitution).");
  const { prods, by } = pieces(p);
  return { prods, why, byproducts: [...new Set([...by, ...extra, ...(seen.has("acyl") && mode === "acid" ? ["HCl"] : [])])], join: "+" };
}
/** A nucleophile (water, ethanol, ammonia) adding–eliminating at an acyl chloride or anhydride. */
function acylate(m, nu) {
  const c = ctx(m), s = carbonyls(m, c).filter((x) => x.kind === "acyl-halide" || x.kind === "anhydride");
  if (!s.length) return null;
  const p = K.clone(m), by = [], used = new Set();
  for (const x of s) {
    if (x.kind === "anhydride") { if (used.has(x.x)) continue; used.add(x.x); }
    if (x.kind === "acyl-halide") { const a = K.atomOf(p, x.x); by.push(nu === "N" ? `NH₄${a.el}` : `H${a.el}`); a.el = nu === "N" ? "N" : "O"; if (nu === "OEt") { const c1 = sprout(p, a.id, "C"); sprout(p, c1.id, "C"); } }
    else { cut(p, x.c, x.x); const a = sprout(p, x.c, nu === "N" ? "N" : "O"); if (nu === "OEt") { const c1 = sprout(p, a.id, "C"); sprout(p, c1.id, "C"); } }
  }
  const { prods, by: b2 } = pieces(p);
  return { prods, byproducts: [...by, ...b2], join: "+" };
}

// ---------- the reagents ----------
export const REAGENTS = [
  { id: "h2-ni", label: "H₂, Ni catalyst", cond: "150 °C", type: "Addition (hydrogenation)", level: "foundation",
    run(m) {
      const c = ctx(m), s = [...alkenes(m, c), ...alkynes(m)];
      if (!s.length) return sixRings(m, c).length ? { fail: "No reaction under these conditions: a benzene ring is stabilised by its delocalised π electrons and isn't hydrogenated by H₂/Ni at 150 °C (it needs much harsher conditions)." } : none(m, "hydrogen adds across C=C and C≡C bonds");
      const p = K.clone(m); for (const b of s) K.bondOf(p, b.id).order = 1;
      const why = [`H₂ adds across ${s.length > 1 ? `all ${s.length} multiple bonds` : "the multiple bond"}: each carbon gains a hydrogen and the product is saturated.`];
      if (sixRings(m, c).length) why.push("The benzene ring is not hydrogenated: its delocalised π system is too stable.");
      if (carbonyls(m, c).length) why.push("C=O bonds aren't reduced under these conditions; use NaBH₄ for them.");
      return { prods: [{ m: p, role: "product" }], why, byproducts: [], stereo: stereoNotes(m, [{ m: p }], "syn").length ? ["Both hydrogens add to the same face of the C=C (syn addition), from the metal surface."] : [] };
    } },
  { id: "lindlar", label: "H₂, Lindlar catalyst", cond: "room temperature", type: "Addition (partial hydrogenation)", level: "advanced",
    run(m) {
      const s = alkynes(m); if (!s.length) return none(m, "a Lindlar catalyst stops hydrogenation of C≡C at the alkene");
      const p = K.clone(m); for (const b of s) K.bondOf(p, b.id).order = 2;
      return { prods: [{ m: p, role: "product" }], why: ["The poisoned Lindlar catalyst adds one H₂ to each C≡C and stops at the alkene: C=C bonds react much more slowly on it."], stereo: ["Both hydrogens add to the same face (syn addition), so an internal alkyne gives the Z (cis) alkene."], byproducts: [] };
    } },
  { id: "br2", label: "Br₂", cond: "room temperature, in the dark", type: "Electrophilic addition", mechanism: "br2-butene", level: "foundation",
    run(m) {
      const c = ctx(m), s = alkenes(m, c), t = alkynes(m), rs = sixRings(m, c);
      if (!s.length && !t.length) {
        if (rs.length === 1) {
          const { sites, subs } = aromaticSites(m, c, rs[0]);
          if (subs.some((x) => ["–OH", "–O⁻"].includes(x.d.label) || x.d.label.startsWith("–NH₂")) && sites.length) {
            const p = K.clone(m), r0 = rs[0], cx = r0.reduce((q, k) => q + K.atomOf(m, k).x, 0) / 6, cy = r0.reduce((q, k) => q + K.atomOf(m, k).y, 0) / 6;
            for (const f of sites) { dropDrawnH(p, f.id); const a = K.atomOf(p, f.id); sprout(p, f.id, "Br", 1, Math.atan2(a.y - cy, a.x - cx)); }
            return { prods: [{ m: p, role: "product" }], type: "Electrophilic aromatic substitution (no catalyst needed)", why: ["An –OH or –NH₂ group activates the ring so strongly that bromine water substitutes at every free 2-, 4- and 6-position without a catalyst: orange bromine is decolourised and a white precipitate forms (the test for phenol)."], byproducts: ["HBr"], mechanism: null };
          }
        }
        if (rs.length === 1 && aromaticSites(m, c, rs[0]).subs.some((x) => x.d.rank >= 2)) return { fail: "This ring is activated enough to react with bromine without a catalyst (mainly at the 4-position), but how far it goes depends on the conditions, so the lab doesn't predict it. Use Br₂ with FeBr₃ to see the directing pattern." };
        return rs.length ? { fail: "No reaction: benzene doesn't decolourise bromine water. Its delocalised π system is too stable to add Br₂; substitution needs a halogen carrier such as FeBr₃." } : none(m, "bromine adds across C=C bonds (and with UV light it substitutes into alkanes)");
      }
      const p = K.clone(m); for (const b of s) { setOrder(p, b.a, b.b, 1); sprout(p, b.a, "Br"); sprout(p, b.b, "Br"); } for (const b of t) { setOrder(p, b.a, b.b, 1); for (const i of [b.a, b.a, b.b, b.b]) sprout(p, i, "Br"); }
      const why = ["One bromine adds to each carbon of the C=C. This is the test for an alkene: orange bromine water turns colourless."]; if (t.length) why.push("A C≡C adds two Br₂ when bromine is in excess, giving a tetrabromide.");
      return { prods: [{ m: p, role: "product" }], why, byproducts: [], stereo: stereoNotes(m, [{ m: p }], "anti") };
    } },
  { id: "hbr", label: "HBr", cond: "room temperature", type: "Electrophilic addition", mechanism: "hbr-propene", level: "foundation",
    run(m) { const r = markovnikov(m, "Br", "hydrogen bromide") || alkyneHX(m, "Br"); if (r?.fail) return r; return r ? { ...r, byproducts: [] } : none(m, "hydrogen bromide adds across C=C (and C≡C) bonds"); } },
  { id: "steam", label: "H₂O(g), H₃PO₄ catalyst", cond: "300 °C, 60 atm", type: "Electrophilic addition (hydration)", level: "foundation",
    run(m) { const r = markovnikov(m, "O", "steam"); if (r?.fail) return r; if (!r) return alkynes(m).length ? { fail: "Alkynes are hydrated with dilute H₂SO₄ and an HgSO₄ catalyst instead (choose that reagent)." } : none(m, "steam adds across C=C bonds"); return { ...r, byproducts: [], why: [...r.why, "Industrially this makes ethanol from ethene. The acid protonates the alkene first, so the same carbocation rule applies."] }; } },
  { id: "hg-hydration", label: "H₂O, dilute H₂SO₄, HgSO₄ catalyst", cond: "warm", type: "Electrophilic addition (hydration of an alkyne)", level: "advanced",
    run(m) {
      const s = alkynes(m); if (!s.length) return none(m, "this mercury-catalysed hydration is for C≡C bonds");
      const one = (pick) => { const p = K.clone(m); for (const b of s) { const t = pick(b); setOrder(p, b.a, b.b, 1); sprout(p, t, "O", 2); } return p; };
      const deg = (id) => cCount(m, id), a = one((b) => (deg(b.a) >= deg(b.b) ? b.a : b.b)), z = one((b) => (deg(b.a) >= deg(b.b) ? b.b : b.a));
      const prods = key(a) === key(z) ? [{ m: a, role: "product" }] : s.length === 1 && deg(s[0].a) === deg(s[0].b) ? [{ m: a, role: "product" }, { m: z, role: "product" }] : [{ m: a, role: "product" }];
      return { prods, why: ["Water adds across the C≡C following Markovnikov's rule, giving an enol (C=C–OH), which rearranges at once to the more stable C=O (keto–enol tautomerism).", "A terminal alkyne gives a methyl ketone; ethyne gives ethanal."], byproducts: [] };
    } },
  { id: "kmno4-cold", label: "cold dilute KMnO₄", cond: "room temperature", type: "Oxidation (dihydroxylation)", level: "advanced",
    run(m) {
      const c = ctx(m), s = alkenes(m, c); if (!s.length) return none(m, "cold dilute permanganate adds two –OH groups across C=C (purple → colourless or brown, a test for alkenes)");
      const p = K.clone(m); for (const b of s) { setOrder(p, b.a, b.b, 1); sprout(p, b.a, "O"); sprout(p, b.b, "O"); }
      return { prods: [{ m: p, role: "product" }], why: ["Each C=C gains an –OH on both carbons, giving a diol. Purple permanganate is decolourised: another test for C=C."], stereo: ["Both –OH groups add to the same face (syn addition)."], byproducts: [] };
    } },
  { id: "kmno4-hot", label: "hot concentrated acidified KMnO₄", cond: "heat under reflux", type: "Oxidative cleavage", level: "advanced",
    run(m) { return cleave(m, true); } },
  { id: "ozone", label: "O₃, then Zn and water", cond: "−78 °C, then room temperature", type: "Oxidative cleavage (ozonolysis)", level: "university",
    run(m) { return cleave(m, false); } },
  { id: "naoh-aq", label: "NaOH(aq)", cond: "warm, under reflux", type: "Nucleophilic substitution and hydrolysis", level: "foundation",
    run(m) {
      const hs = halideSites(m), hyd = hydrolyse(m, "alkali"), cx = ctx(m);
      if (!hyd && !hs.length && carbonyls(m, cx).some((x) => (x.kind === "aldehyde" || x.kind === "ketone") && heavy(m, x.c).some((n) => n.atom.el === "C" && cx.H(n.atom.id) > 0))) return { fail: "Not predicted: hydroxide with an aldehyde or ketone that has a hydrogen on the next carbon starts aldol reactions (C–C bond formation via an enolate), which are outside this model's rules." };
      if (hs.length && hyd) return { fail: "This molecule has a halogen and a C=O group that both react with hydroxide; predicting the combined product reliably is outside this model. Try one group at a time." };
      if (hyd) return { ...hyd, mechanism: carbonyls(m, ctx(m)).some((x) => x.kind === "ester") ? "ester-hydrolysis" : null, type: "Hydrolysis (alkaline)" };
      if (!hs.length) return none(m, "hydroxide substitutes the halogen of a halogenoalkane and hydrolyses esters, amides and acyl chlorides");
      return fromCompetition(m, { nuc: "hydroxide", solvent: "water", temp: "warm" }, [`Na${K.atomOf(m, hs[0].x).el}`]);
    } },
  { id: "koh-eth", label: "KOH in ethanol", cond: "heat under reflux", type: "Elimination (with competing substitution)", mechanism: "e2", level: "intermediate",
    run(m) { if (!halideSites(m).length) return none(m, "hot ethanolic hydroxide eliminates HX from a halogenoalkane"); return fromCompetition(m, { nuc: "hydroxide", solvent: "ethanol", temp: "hot" }, ["H₂O", `K${K.atomOf(m, halideSites(m)[0].x).el}`]); } },
  { id: "tbuok", label: "KOC(CH₃)₃ (potassium tert-butoxide)", cond: "heat", type: "Elimination (bulky base)", mechanism: "e2", level: "university",
    run(m) { if (!halideSites(m).length) return none(m, "a bulky strong base eliminates HX from a halogenoalkane"); return fromCompetition(m, { nuc: "tbuo", solvent: "ethanol", temp: "hot" }, ["(CH₃)₃COH", "KBr"]); } },
  { id: "kcn", label: "KCN in ethanol", cond: "heat under reflux", type: "Nucleophilic substitution (adds a carbon)", mechanism: "sn2", level: "intermediate",
    run(m) {
      if (!halideSites(m).length) return none(m, "cyanide substitutes the halogen of a halogenoalkane (for C=O, use HCN/KCN)");
      const r = fromCompetition(m, { nuc: "cyanide", solvent: "ethanol", temp: "hot" }, [`K${K.atomOf(m, halideSites(m)[0].x).el}`]);
      if (!r.fail) r.why.push("Substituting CN⁻ for the halogen adds one carbon to the chain: useful for building longer molecules. The C≡N group is linear.");
      return r;
    } },
  { id: "water", label: "H₂O", cond: "room temperature", type: "Hydrolysis (water as nucleophile)", level: "intermediate",
    run(m) {
      const a = acylate(m, "O"); if (a) return { ...a, why: ["Water attacks the very δ+ carbon of the acyl chloride (or anhydride): addition, then elimination of Cl⁻ (or a carboxylate). Vigorous, with steamy fumes of HCl."], mechanism: "acyl-water" };
      if (halideSites(m).length) return fromCompetition(m, { nuc: "water", solvent: "water", temp: "rt" }, ["HBr"]);
      return none(m, "cold water hydrolyses acyl chlorides and anhydrides (and, slowly, tertiary halogenoalkanes)");
    } },
  { id: "nh3", label: "excess NH₃ in ethanol", cond: "heat in a sealed tube", type: "Nucleophilic substitution", level: "intermediate",
    run(m) {
      const c = ctx(m), s = halideSites(m);
      if (!s.length) return carbonyls(m, c).some((x) => x.kind === "acyl-halide") ? { fail: "For an acyl chloride, use concentrated ammonia at room temperature: it reacts at once." } : none(m, "ammonia substitutes the halogen of a halogenoalkane");
      if (s.some((x) => x.cls === 3)) return { fail: "A tertiary halogenoalkane mainly eliminates with ammonia (a base) rather than substituting; the model doesn't predict that mixture." };
      const p = K.clone(m); for (const h of s) K.atomOf(p, h.x).el = "N";
      return { prods: [{ m: p, role: "product" }], why: ["NH₃'s lone pair attacks the δ+ carbon; a second NH₃ removes H⁺ from the nitrogen, giving a primary amine.", "Excess ammonia keeps the product from reacting further (the amine is itself a nucleophile and would give secondary and tertiary amines)."], byproducts: [`NH₄${K.atomOf(m, s[0].x).el}`] };
    } },
  { id: "nh3-cold", label: "concentrated NH₃", cond: "room temperature", type: "Nucleophilic addition–elimination", mechanism: "acyl-ammonia", level: "intermediate",
    run(m) { const a = acylate(m, "N"); if (a) return { ...a, why: ["Ammonia's lone pair adds to the acyl carbon; Cl⁻ is eliminated and a second NH₃ takes the H⁺, giving a primary amide."] }; return halideSites(m).length ? { fail: "Halogenoalkanes need heating with excess ethanolic ammonia in a sealed tube (choose that reagent)." } : none(m, "ammonia turns acyl chlorides and anhydrides into amides"); } },
  { id: "ethanol-rt", label: "ethanol", cond: "room temperature", type: "Nucleophilic addition–elimination", level: "intermediate",
    run(m) { const a = acylate(m, "OEt"); if (a) return { ...a, why: ["Ethanol's oxygen lone pair adds to the acyl carbon and Cl⁻ is eliminated, giving an ethyl ester. Unlike esterification with a carboxylic acid, this goes to completion and needs no catalyst."] }; return none(m, "ethanol at room temperature reacts with acyl chlorides and anhydrides (to make esters from an acid, use the acid-catalysed esterification)"); } },
  { id: "cr-distil", label: "K₂Cr₂O₇ / H₂SO₄", cond: "warm, distil the product off as it forms", type: "Oxidation", level: "foundation", run: (m) => oxidise(m, false) },
  { id: "cr-reflux", label: "excess K₂Cr₂O₇ / H₂SO₄", cond: "heat under reflux", type: "Oxidation", level: "foundation", run: (m) => oxidise(m, true) },
  { id: "tollens", label: "Tollens' reagent (ammoniacal AgNO₃)", cond: "warm in a water bath", type: "Oxidation (test for aldehydes)", level: "intermediate",
    run(m) {
      const c = ctx(m), s = carbonyls(m, c).filter((x) => x.kind === "aldehyde");
      if (!s.length) return { fail: carbonyls(m, c).some((x) => x.kind === "ketone") ? "No reaction: ketones can't be oxidised without breaking a C–C bond, so there is no silver mirror. This is how aldehydes and ketones are told apart." : "No reaction (no silver mirror): Tollens' reagent oxidises aldehydes only." };
      const p = K.clone(m); for (const x of s) { const o = sprout(p, x.c, "O"); o.charge = -1; }
      return { prods: [{ m: p, role: "product" }], why: ["The aldehyde is oxidised to a carboxylic acid, present as its carboxylate ion in the alkaline (ammoniacal) solution.", "Ag⁺ is reduced to silver metal: a silver mirror forms on the tube."], byproducts: ["Ag"] };
    } },
  { id: "nabh4", label: "NaBH₄", cond: "in water or methanol", type: "Reduction (nucleophilic addition)", mechanism: "nabh4-propanone", level: "intermediate", run: (m) => reduce(m, false) },
  { id: "lialh4", label: "LiAlH₄ in dry ether, then dilute acid", cond: "room temperature", type: "Reduction", level: "advanced", run: (m) => reduce(m, true) },
  { id: "hcn", label: "KCN, then dilute H₂SO₄ (HCN)", cond: "room temperature", type: "Nucleophilic addition", mechanism: "hcn-ethanal", level: "intermediate",
    run(m) {
      const c = ctx(m), s = carbonyls(m, c).filter((x) => x.kind === "aldehyde" || x.kind === "ketone");
      if (!s.length) return none(m, "cyanide adds to the C=O of aldehydes and ketones (acids, esters and amides don't react this way)");
      const p = K.clone(m); for (const x of s) { setOrder(p, x.c, x.o, 1); const a = K.atomOf(p, x.c), C = sprout(p, x.c, "C"); sprout(p, C.id, "N", 3, Math.atan2(C.y - a.y, C.x - a.x)); }
      return { prods: [{ m: p, role: "product" }], why: ["CN⁻ attacks the δ+ carbonyl carbon and the alkoxide takes H⁺ from HCN, giving a hydroxynitrile (cyanohydrin). It adds a carbon to the chain.", "KCN is used rather than HCN gas, which is extremely toxic; the acid then supplies H⁺."], stereo: stereoNotes(m, [{ m: p }], "planar"), byproducts: [] };
    } },
  { id: "grignard", label: "CH₃MgBr in dry ether, then dilute acid", cond: "room temperature", type: "Nucleophilic addition (Grignard)", mechanism: "grignard", level: "advanced",
    run(m) {
      const c = ctx(m), cos = carbonyls(m, c), s = cos.filter((x) => ["aldehyde", "ketone", "ester"].includes(x.kind));
      if (cos.some((x) => x.kind === "acid") || alcohols(m, c).length) return { fail: "No addition: a Grignard reagent is a very strong base, and an O–H group (alcohol, acid or water) protonates it first, giving methane. The O–H must be protected, or the Grignard used in excess." };
      if (!s.length) return none(m, "a Grignard reagent adds to the C=O of aldehydes, ketones and esters");
      const p = K.clone(m), why = ["The C–Mg bond is polarised C^δ−–Mg^δ+, so the methyl carbon acts as a carbanion nucleophile, attacking the δ+ carbonyl carbon and forming a new C–C bond. Acid then protonates the alkoxide."];
      for (const x of s) {
        if (x.kind === "ester") { cut(p, x.c, x.x); setOrder(p, x.c, x.o, 1); sprout(p, x.c, "C"); sprout(p, x.c, "C"); }
        else { setOrder(p, x.c, x.o, 1); sprout(p, x.c, "C"); }
      }
      const kinds = new Set(s.map((x) => x.kind));
      if (kinds.has("aldehyde")) why.push(cos.some((x) => x.kind === "aldehyde" && ctx(m).H(x.c) === 2) ? "Methanal gives a primary alcohol." : "An aldehyde gives a secondary alcohol.");
      if (kinds.has("ketone")) why.push("A ketone gives a tertiary alcohol.");
      if (kinds.has("ester")) why.push("An ester reacts twice: the first addition expels the alkoxide to give a ketone, which adds a second CH₃MgBr. The product is a tertiary alcohol with two methyl groups from the reagent.");
      const { prods, by } = pieces(p);
      return { prods, why, byproducts: [...by, "Mg(OH)Br"], join: "+", stereo: stereoNotes(m, prods, "planar") };
    } },
  { id: "h3po4", label: "excess conc. H₃PO₄", cond: "heat (about 170 °C)", type: "Elimination (dehydration)", mechanism: "e1", level: "intermediate",
    run(m) {
      const c = ctx(m), s = alcohols(m, c);
      if (!s.length) return none(m, "hot concentrated acid dehydrates alcohols");
      if (s.length > 1) return { fail: "This molecule has more than one –OH: dehydrating them all gives a mixture the lab won't predict reliably. Try a molecule with one –OH." };
      const list2 = eliminateAll(m, s[0].o, s[0].c);
      if (!list2) return { fail: "The carbon carrying the –OH has no neighbouring carbon with a hydrogen (no β-hydrogen), so no C=C can form." };
      return { ...list2, why: [`The acid protonates the –OH, which leaves as water. ${s[0].cls === 3 ? "A tertiary alcohol forms a stable tertiary carbocation, which loses H⁺ (E1)." : s[0].cls === 2 ? "A secondary alcohol reacts by E1 through a secondary carbocation." : "A primary alcohol reacts by E2: a primary carbocation is too unstable to form."}`, ...list2.why], byproducts: ["H₂O"], mechanism: s[0].cls >= 2 ? "e1" : null };
    } },
  { id: "esterify", label: "ethanol, conc. H₂SO₄ catalyst", cond: "warm under reflux", type: "Esterification (condensation)", level: "foundation",
    run(m) {
      const c = ctx(m), s = carbonyls(m, c).filter((x) => x.kind === "acid");
      if (!s.length) return none(m, "an alcohol esterifies carboxylic acids (try “excess K₂Cr₂O₇ / H₂SO₄” first to make an acid)");
      const p = K.clone(m); for (const x of s) { const C1 = sprout(p, x.x, "C"); sprout(p, C1.id, "C"); }
      return { prods: [{ m: p, role: "product" }], why: ["The acid's –OH and a hydrogen from ethanol's –OH leave as water, joining the two through an ester link, –COO–.", "The reaction is reversible, so the yield is limited; the H₂SO₄ is a catalyst and also absorbs water."], byproducts: ["H₂O"] };
    } },
  { id: "ethanoic-h2so4", label: "ethanoic acid, conc. H₂SO₄ catalyst", cond: "warm under reflux", type: "Esterification (condensation)", level: "intermediate",
    run(m) {
      const c = ctx(m), s = alcohols(m, c);
      if (!s.length) return none(m, "a carboxylic acid esterifies alcohols");
      const p = K.clone(m); for (const a of s) { const C1 = sprout(p, a.o, "C"); sprout(p, C1.id, "O", 2); sprout(p, C1.id, "C"); }
      const why = ["The alcohol's oxygen ends up in the ester; water is lost (the –OH comes from the acid).", "Reversible: the yield is limited. An acyl chloride or acid anhydride gives a better yield."];
      if (s.some((a) => a.cls === 3)) why.push("Tertiary alcohols esterify poorly in practice (they tend to dehydrate in hot acid).");
      return { prods: [{ m: p, role: "product" }], why, byproducts: ["H₂O"] };
    } },
  { id: "socl2", label: "SOCl₂ (or PCl₅)", cond: "room temperature, dry", type: "Substitution of –OH by –Cl", level: "intermediate",
    run(m) {
      const c = ctx(m), acids = carbonyls(m, c).filter((x) => x.kind === "acid"), alc = alcohols(m, c);
      if (!acids.length && !alc.length) return none(m, "SOCl₂ (or PCl₅) replaces the –OH of carboxylic acids and alcohols with –Cl");
      const p = K.clone(m); for (const x of acids) K.atomOf(p, x.x).el = "Cl"; for (const a of alc) K.atomOf(p, a.o).el = "Cl";
      const why = [];
      if (acids.length) why.push("A carboxylic acid becomes an acyl chloride: a much more reactive starting point for esters and amides.");
      if (alc.length) why.push("An alcohol becomes a chloroalkane.");
      why.push("With SOCl₂ the by-products, SO₂ and HCl, are both gases, which makes the product easy to purify. (PCl₅ gives POCl₃ and HCl: steamy fumes, the test for –OH.)");
      return { prods: [{ m: p, role: "product" }], why, byproducts: ["SO₂", "HCl"] };
    } },
  { id: "acid-hydrolysis", label: "dilute H₂SO₄(aq)", cond: "heat under reflux", type: "Hydrolysis (acid)", level: "intermediate",
    run(m) {
      const r = hydrolyse(m, "acid"); if (r) return { ...r, mechanism: null };
      if (halideSites(m).length) return { fail: "Halogenoalkanes are hydrolysed by NaOH(aq) (or slowly by water), not usefully by dilute acid." };
      return none(m, "hot dilute acid hydrolyses esters, amides, nitriles and acyl chlorides");
    } },
  { id: "br2-uv", label: "Br₂", cond: "UV light", type: "Free-radical substitution", mechanism: "radical-chlorination", level: "foundation",
    run(m) {
      const c = ctx(m);
      if (alkynes(m).length) return { fail: "The lab predicts radical substitution only for alkanes; with a C≡C, bromine adds across the triple bond instead." };
      if (alkenes(m, c).length) return { fail: "Use “Br₂, room temperature” for an alkene: bromine adds across the C=C quickly, without needing UV light." };
      const A = K.analyse(m);
      if (Object.keys(A.counts).some((e) => e !== "C" && e !== "H") || sixRings(m, c).length) return { fail: "The lab predicts free-radical substitution only for alkanes and cycloalkanes: other groups and benzene rings react in other ways, or give mixtures it can't rank." };
      const sites = m.atoms.filter((a) => a.el === "C" && c.H(a.id));
      const prods = uniq(sites.map((a) => { const p = K.clone(m); dropDrawnH(p, a.id); sprout(p, a.id, "Br"); return { m: p, role: "product", cls: cCount(m, a.id) }; }));
      const why = ["A bromine radical takes a hydrogen, and the alkyl radical takes Br from Br₂ (a chain reaction)."];
      if (prods.length > 1) {
        const top = Math.max(...prods.map((p) => p.cls)); prods.forEach((p) => { p.role = p.cls === top ? "major" : "minor"; });
        why.push(`There are ${prods.length} different kinds of hydrogen, so ${prods.length} monobromo isomers form. Bromine radicals are selective: they take the hydrogen that leaves the most stable radical (tertiary > secondary > primary), so substitution at the ${CLASS[top]} carbon gives the major product. (Chlorine is much less selective and gives a mixture closer to the statistical ratio.)`);
      } else why.push("Every hydrogen is equivalent, so one monobromo product forms (and some further substitution).");
      return { prods: prods.map(({ m: pm, role }) => ({ m: pm, role })), why, byproducts: ["HBr"] };
    } },
  { id: "nitration", label: "conc. HNO₃ and conc. H₂SO₄", cond: "below 55 °C", type: "Electrophilic aromatic substitution", mechanism: "nitration", level: "intermediate",
    run(m) { const r = aromatic(m, "nitro"); if (!r) return { fail: "No reaction: nitration substitutes a benzene ring's hydrogen. This molecule has no benzene ring." }; if (r.fail) return r; return { ...r, why: ["The nitronium ion, NO₂⁺ (made from the two acids), is the electrophile. It attacks the ring's delocalised π electrons; losing H⁺ restores the aromatic ring, so H is substituted, not added.", "Below 55 °C to stop further nitration.", ...r.why], byproducts: ["H₂O"] }; } },
  { id: "cl2-alcl3", label: "Cl₂, AlCl₃ catalyst", cond: "room temperature, dry", type: "Electrophilic aromatic substitution (halogenation)", mechanism: "chlorination", level: "intermediate",
    run(m) { const r = aromatic(m, "Cl"); if (!r) return alkenes(m, ctx(m)).length ? { fail: "For a C=C, chlorine adds directly without a catalyst (as Br₂ does)." } : { fail: "No reaction: a halogen carrier such as AlCl₃ is needed for substituting into a benzene ring, and this molecule has none." }; if (r.fail) return r; return { ...r, why: ["AlCl₃ (a halogen carrier) polarises Cl₂ into a Cl⁺ electrophile and AlCl₄⁻. The ring attacks Cl⁺, then loses H⁺, which regenerates AlCl₃ and gives HCl.", ...r.why], byproducts: ["HCl"] }; } },
  { id: "br2-febr3", label: "Br₂, FeBr₃ catalyst", cond: "room temperature, dry", type: "Electrophilic aromatic substitution (halogenation)", mechanism: "chlorination", level: "intermediate",
    run(m) { const r = aromatic(m, "Br"); if (!r) return alkenes(m, ctx(m)).length ? { fail: "For a C=C, bromine adds directly without a catalyst (choose Br₂, room temperature)." } : { fail: "No reaction: the halogen carrier is for substituting into a benzene ring, and this molecule has none." }; if (r.fail) return r; return { ...r, why: ["FeBr₃ (or iron filings, which form it) polarises Br₂ into a Br⁺ electrophile and FeBr₄⁻. The ring attacks Br⁺, then loses H⁺; HBr forms and FeBr₃ is regenerated.", ...r.why], byproducts: ["HBr"] }; } },
  { id: "fc-alkyl", label: "CH₃Cl, AlCl₃ catalyst", cond: "dry, room temperature", type: "Friedel–Crafts alkylation", level: "advanced",
    run(m) { const r = aromatic(m, "alkyl"); if (!r) return { fail: "No reaction: Friedel–Crafts alkylation substitutes into a benzene ring, and this molecule has none." }; if (r.fail) return r; return { ...r, why: ["AlCl₃ pulls Cl from CH₃Cl, making a CH₃⁺-like electrophile that the ring attacks; loss of H⁺ restores the ring.", "Problem in practice: the product (an alkylbenzene) is more reactive than the starting ring, so further alkylation happens unless the arene is in excess. Longer alkyl groups can also rearrange.", ...r.why], byproducts: ["HCl"] }; } },
  { id: "fc-acyl", label: "CH₃COCl, AlCl₃ catalyst", cond: "dry, reflux at 60 °C", type: "Friedel–Crafts acylation", mechanism: "fc-acylation", level: "intermediate",
    run(m) { const r = aromatic(m, "acyl"); if (!r) return { fail: "No reaction: Friedel–Crafts acylation substitutes into a benzene ring, and this molecule has none." }; if (r.fail) return r; return { ...r, why: ["AlCl₃ removes Cl⁻ from ethanoyl chloride, giving the acylium ion CH₃C≡O⁺, the electrophile. The ring attacks it and loses H⁺; AlCl₃ is regenerated and HCl forms.", "The ketone product deactivates the ring, so (unlike alkylation) only one acyl group adds. It's a key way of making a C–C bond to a ring.", ...r.why], byproducts: ["HCl"] }; } },
];
export const reagentOf = (id) => REAGENTS.find((r) => r.id === id);

function eliminateAll(m, lg, cA) {
  const betas = heavy(m, cA).filter((n) => n.atom.el === "C" && n.bond.order === 1 && ctx(m).H(n.atom.id) && !ctx(m).arom(n.atom.id));
  if (!betas.length) return null;
  const prods = uniq(betas.map((b) => { const p = K.clone(m); K.removeAtom(p, lg); dropDrawnH(p, b.atom.id); setOrder(p, cA, b.atom.id, 2); return { m: p, subs: heavy(p, cA).length + heavy(p, b.atom.id).length - 2 }; }));
  const best = Math.max(...prods.map((p) => p.subs)), why = [];
  if (prods.length > 1) {
    const top = prods.filter((p) => p.subs === best);
    prods.forEach((p) => { p.role = top.length === prods.length ? "product" : p.subs === best ? "major" : "minor"; });
    why.push(top.length === prods.length ? "There are different β-hydrogens, but the alkenes they give are equally substituted." : "Zaitsev's rule: removing different β-hydrogens gives different alkenes; the more substituted alkene (more alkyl groups on the C=C) is more stable and is the major product.");
  } else { prods[0].role = "product"; why.push("Only one alkene can form (every β-hydrogen gives the same product)."); }
  for (const p of prods) if (K.analyse(p.m).ez.length) p.note = "Forms as a mixture of E and Z isomers (more E, which is more stable).";
  return { prods: prods.map(({ m: pm, role, note }) => ({ m: pm, role, note })), why };
}

/** Converts a competition result into a prediction: the major pathway's products are major, the others minor. */
function fromCompetition(m, cond, byproducts) {
  const r = competition(m, cond);
  if (!r.ok) return { fail: r.why };
  const prods = [], seen = new Set();
  for (const pw of r.pathways) for (const p of pw.products) { const k = key(p.m); if (seen.has(k)) continue; seen.add(k); prods.push({ m: p.m, role: pw.share === "major" ? p.role : "minor", note: p.note, mech: pw.mech }); }
  const majors = prods.filter((p) => p.role === "major");
  if (prods.length === 1 || majors.length === prods.length) prods.forEach((p) => { p.role = prods.length === 1 ? "product" : "major"; });
  const main = r.pathways[0], st = r.site, wasStereo = K.analyse(m).stereo.includes(st.c), stereo = [];
  if (wasStereo && main.mech === "SN2") stereo.push("The carbon carrying the halogen is a stereocentre: SN2 inverts its configuration (Walden inversion).");
  if (wasStereo && main.mech === "SN1") stereo.push("The carbon carrying the halogen is a stereocentre: the planar carbocation is attacked from either face, so the product is (nearly) racemic.");
  const why = [`${r.pathways.map((p) => `${p.mech} ${p.share === "major" ? "is the main pathway" : "competes (minor)"}`).join("; ")}. ${main.why}`, ...r.factors];
  return { prods: prods.map(({ m: pm, role, note }) => ({ m: pm, role, note })), why, byproducts, stereo, mechanism: { SN2: "sn2", SN1: "sn1", E2: "e2", E1: "e1" }[main.mech], competition: r };
}

/** Oxidative cleavage of C=C: hot KMnO₄ (full: aldehydes on to acids, =CH₂ to CO₂) or ozonolysis (stops at C=O). */
function cleave(m, full) {
  const c = ctx(m), s = alkenes(m, c);
  if (!s.length) return none(m, `${full ? "hot concentrated permanganate" : "ozone"} splits C=C bonds`);
  const p = K.clone(m);
  for (const b of s) { cut(p, b.a, b.b); sprout(p, b.a, "O", 2); sprout(p, b.b, "O", 2); }
  if (full) { const c2 = ctx(p); for (const b of s) for (const i of [b.a, b.b]) if (c2.H(i) >= 1) sprout(p, i, "O"); }
  const { prods, by: by0 } = pieces(p), why = ["The C=C bond is broken completely and each carbon becomes a C=O."];
  const by = full ? by0.map((b) => (b === "HCOOH" ? "CO₂ + H₂O" : b)) : by0;
  if (!prods.length) return { fail: "Ethene is oxidised completely, to CO₂ and water: there is no organic product." };
  if (full) why.push("Hot acidified permanganate oxidises further: a =CH– end becomes a carboxylic acid and a =CH₂ end becomes CO₂; a =CR₂ end stays a ketone.");
  else why.push("Ozonolysis with a zinc work-up stops at the C=O stage: =CH– ends become aldehydes (=CH₂ gives methanal), =CR₂ ends ketones. The pieces show where the C=C was, which made it a classic way of locating double bonds.");
  return { prods, why, byproducts: [...new Set(by)], join: "+" };
}

/** The prediction for a reagent on a drawing. */
export function predict(m, reagentId) {
  const r = reagentOf(reagentId);
  if (!r) return { reacts: false, why: ["Unknown reagent."] };
  if (!m?.atoms?.length) return { reacts: false, reagent: r, why: ["Draw a starting material first."] };
  const A = K.analyse(m);
  if (A.problems.length) return { reacts: false, reagent: r, why: [`Fix the structure first: ${A.problems[0].text}`] };
  if (A.components > 1) return { reacts: false, reagent: r, why: ["Draw one starting molecule: the reagent comes from the list."] };
  let out;
  try { out = r.run(K.clone(m)); } catch (e) { out = { fail: "The lab couldn't apply this reaction's rules to this molecule, so it makes no prediction." }; }
  if (!out || out.fail) return { reacts: false, reagent: r, type: r.type, why: [out?.fail || "No reaction."], products: [], competition: out?.competition };
  if (!out.prods.length) return { reacts: false, reagent: r, type: r.type, why: ["The rules give no organic product here."], products: [] };
  return { reacts: true, reagent: r, type: out.type || r.type, products: out.prods, join: out.join || "or", byproducts: out.byproducts || [], why: out.why, stereo: out.stereo || [], competition: out.competition || null,
    mechanism: out.mechanism !== undefined ? out.mechanism : r.mechanism || null };
}

/** Lays out a molecule from SMILES on the hexagon paper (for starting materials): chains zig-zag, a ring is a hexagon. */
export function drawSmiles(smiles) {
  const g = K.graphFromSmiles(smiles), G = K.graph(g), rs = K.rings(G, 6).filter((r) => r.length === 6);
  const m = K.empty(), map = new Map();
  const ringIds = rs.length ? rs[0].map((i) => G.id[i]) : [];
  const place = (oldId, x, y) => { const o = K.atomOf(g, oldId), a = K.addAtom(m, x, y, o.el); a.charge = o.charge || 0; map.set(oldId, a.id); return a; };
  if (ringIds.length) {
    const pts = K.ringPath(m, 6, { type: "paper", x: 0, y: 0 });
    ringIds.forEach((id, k) => place(id, pts[k][0], pts[k][1]));
    ringIds.forEach((id, k) => { const nx = ringIds[(k + 1) % 6], b = K.bondBetween(g, id, nx); K.addBond(m, map.get(id), map.get(nx), b.order); });
  } else place(g.atoms.find((a) => a.el !== "H")?.id ?? g.atoms[0].id, 0, 0);
  const queue = [...map.keys()];
  while (queue.length) {
    const u = queue.shift();
    for (const n of K.neighbours(g, u)) {
      if (map.has(n.atom.id)) { if (!K.bondBetween(m, map.get(u), map.get(n.atom.id))) K.addBond(m, map.get(u), map.get(n.atom.id), n.bond.order); continue; }
      const nu = map.get(u), from = K.atomOf(m, nu), prev = K.neighbours(m, nu);
      let dir = null;
      if (ringIds.includes(u)) { const cx = ringIds.reduce((t, k) => t + K.atomOf(m, map.get(k)).x, 0) / 6, cy = ringIds.reduce((t, k) => t + K.atomOf(m, map.get(k)).y, 0) / 6; dir = Math.atan2(from.y - cy, from.x - cx); }
      else if (prev.length === 1 && (prev[0].bond.order === 3 || n.bond.order === 3)) dir = Math.atan2(from.y - prev[0].atom.y, from.x - prev[0].atom.x);
      const a = sprout(m, nu, K.atomOf(g, n.atom.id).el, n.bond.order, dir); a.charge = K.atomOf(g, n.atom.id).charge || 0; map.set(n.atom.id, a.id); queue.push(n.atom.id);
    }
  }
  return m;
}

/** Starting materials to try in Reaction mode. */
export const STARTERS = [
  ["ethene", "C=C"], ["propene", "C=CC"], ["but-1-ene", "C=CCC"], ["but-2-ene", "CC=CC"], ["2-methylpropene", "C=C(C)C"], ["2-methylbut-2-ene", "CC=C(C)C"], ["cyclohexene", null], ["ethenylbenzene", "C=Cc1ccccc1"],
  ["propyne", "C#CC"], ["but-2-yne", "CC#CC"],
  ["bromoethane", "CCBr"], ["1-bromopropane", "CCCBr"], ["2-bromopropane", "CC(C)Br"], ["2-bromobutane", "CC(Br)CC"], ["2-bromo-2-methylpropane", "CC(C)(C)Br"], ["1-bromo-2,2-dimethylpropane", "CC(C)(C)CBr"],
  ["ethanol", "CCO"], ["propan-1-ol", "CCCO"], ["propan-2-ol", "CC(C)O"], ["butan-2-ol", "CC(O)CC"], ["2-methylpropan-2-ol", "CC(C)(C)O"],
  ["ethanal", "CC=O"], ["propanal", "CCC=O"], ["propanone", "CC(C)=O"], ["ethanoic acid", "CC(=O)O"], ["ethyl ethanoate", "CCOC(C)=O"], ["ethanoyl chloride", "CC(Cl)=O"], ["ethanamide", "CC(N)=O"], ["propanenitrile", "CCC#N"],
  ["propane", "CCC"], ["2-methylpropane", "CC(C)C"],
  ["benzene", "c1ccccc1"], ["methylbenzene", "Cc1ccccc1"], ["phenol", "Oc1ccccc1"], ["methoxybenzene", "COc1ccccc1"], ["benzoic acid", "OC(=O)c1ccccc1"], ["chlorobenzene", "Clc1ccccc1"], ["nitrobenzene", "[O-][N+](=O)c1ccccc1"], ["phenylamine", "Nc1ccccc1"], ["1,4-dimethylbenzene", "Cc1ccc(C)cc1"], ["4-methylbenzoic acid", "Cc1ccc(cc1)C(=O)O"],
];
export function starter(name) {
  const s = STARTERS.find((x) => x[0] === name); if (!s) return null;
  if (s[1]) return drawSmiles(s[1]);
  const m = K.empty(); K.addRing(m, K.ringPath(m, 6, { type: "paper", x: 0, y: 0 })); m.bonds[0].order = 2; return m; // cyclohexene
}
export { nameOf, split as components };
