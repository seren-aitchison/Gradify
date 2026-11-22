// Reaction mode's predictor: a reagent and conditions applied to a drawn molecule (kit/labs/chemistry/skeletal.js
// model), by explicit rule templates for the reactions taught at A-level and in first-year courses. Rule-based on
// purpose: every product comes from a stated rule (Markovnikov, Zaitsev, directing effects), and when no rule
// applies the predictor says why instead of guessing. No DOM; tested in tests/predictor.test.mjs.
//   predict(m, reagentId) → { reacts, type, products: [{ m, role: "major" | "minor" | "product", note }],
//                             byproducts, why: [reasoning], mechanism (a library reaction id) | null, warn }
// Reagents and conditions match kit/labs/chemistry/synthesis.js.
import * as K from "../skeletal.js";

const DEG = Math.PI / 180;
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

/** A new atom bonded to id, in the best free direction (never joining an existing atom by accident). */
export function sprout(m, id, el, order = 1, dir = null) {
  const a = K.atomOf(m, id), t0 = dir ?? K.nextDir(m, id);
  for (const d of [0, 60, -60, 120, -120, 30, -30, 90, -90, 150, -150, 180]) {
    const t = t0 + d * DEG, x = a.x + Math.cos(t), y = a.y + Math.sin(t);
    if (!m.atoms.some((o) => Math.hypot(o.x - x, o.y - y) < 0.6)) { const b = K.addAtom(m, x, y, el); K.addBond(m, a.id, b.id, order); return b; }
  }
  const b = K.addAtom(m, a.x + Math.cos(t0), a.y + Math.sin(t0), el); K.addBond(m, a.id, b.id, order); return b;
}
/** Removes one hydrogen drawn explicitly on an atom, if there is one (implicit hydrogens adjust by themselves). */
const dropDrawnH = (m, id) => { const h = nb(m, id).find((n) => n.atom.el === "H"); if (h) K.removeAtom(m, h.atom.id); };
const setOrder = (m, a, b, o) => { K.bondBetween(m, a, b).order = o; };
const key = (pm) => K.analyse(pm).hash;
const uniq = (list) => { const seen = new Map(); for (const p of list) { const k = key(p.m); if (!seen.has(k)) seen.set(k, p); } return [...seen.values()]; };

// ---------- sites ----------
const alkenes = (m, c) => m.bonds.filter((b) => b.order === 2 && K.atomOf(m, b.a).el === "C" && K.atomOf(m, b.b).el === "C" && !(c.arom(b.a) && c.arom(b.b)));
const alkynes = (m) => m.bonds.filter((b) => b.order === 3 && K.atomOf(m, b.a).el === "C" && K.atomOf(m, b.b).el === "C");
function halides(m, c) {
  const out = [];
  for (const x of m.atoms) if (X.includes(x.el)) { const h = heavy(m, x.id); if (h.length === 1 && h[0].atom.el === "C" && h[0].bond.order === 1 && !c.arom(h[0].atom.id) && !multiple(m, h[0].atom.id)) out.push({ x: x.id, c: h[0].atom.id, cls: cCount(m, h[0].atom.id) }); }
  return out;
}
function alcohols(m, c) {
  const out = [];
  for (const o of m.atoms) if (o.el === "O" && !o.charge) {
    const h = heavy(m, o.id); if (h.length !== 1 || h[0].atom.el !== "C" || h[0].bond.order !== 1 || !c.H(o.id)) continue;
    const C = h[0].atom.id; if (c.arom(C) || multiple(m, C) || heavy(m, C).some((n) => n.atom.id !== o.id && n.atom.el !== "C")) continue;
    out.push({ o: o.id, c: C, cls: Math.max(1, cCount(m, C)) });
  }
  return out;
}
function carbonyls(m, c) {
  const out = [];
  for (const b of m.bonds) {
    if (b.order !== 2) continue; const [p, q] = [K.atomOf(m, b.a), K.atomOf(m, b.b)], C = p.el === "C" ? p : q, O = C === p ? q : p;
    if (C.el !== "C" || O.el !== "O") continue;
    const others = heavy(m, C.id).filter((n) => n.atom.id !== O.id);
    const acidO = others.find((n) => n.atom.el === "O" && c.H(n.atom.id) && heavy(m, n.atom.id).length === 1);
    const kind = acidO ? "acid" : others.some((n) => n.atom.el !== "C") ? "other" : c.H(C.id) ? "aldehyde" : "ketone";
    out.push({ c: C.id, o: O.id, kind, oh: acidO?.atom.id });
  }
  return out;
}
const sixRings = (m, c) => K.rings(c.G, 6).filter((r) => r.length === 6 && r.every((i) => c.arom(c.G.id[i]))).map((r) => r.map((i) => c.G.id[i]));

// ---------- the rules ----------
/** HX or H₂O across a C=C, Markovnikov: H to the carbon with fewer carbons attached, so the cation is more stable. */
function markovnikov(m, X0, label) {
  const c = ctx(m), sites = alkenes(m, c);
  if (!sites.length) return none(m, c, `${label} adds across C=C bonds`);
  const make = (choose) => { const p = K.clone(m); for (const b of sites) { const [hC, xC] = choose(b); setOrder(p, hC, xC, 1); sprout(p, xC, X0); } return p; };
  const deg = (id) => cCount(m, id);
  const major = make((b) => (deg(b.a) >= deg(b.b) ? [b.b, b.a] : [b.a, b.b]));
  const why = [], prods = [{ m: major, role: "product" }];
  if (sites.length === 1) {
    const b = sites[0], minor = make((b2) => (deg(b2.a) >= deg(b2.b) ? [b2.a, b2.b] : [b2.b, b2.a]));
    if (key(minor) !== key(major)) {
      const [da, db] = [deg(b.a), deg(b.b)].sort((x, y) => y - x);
      if (da === db) { prods[0].role = "product"; prods.push({ m: minor, role: "product" }); why.push(`Both carbons of the C=C carry the same number of carbon groups, so either carbocation is equally stable (${CLASS[da]}): two products form in similar amounts.`); }
      else { prods[0].role = "major"; prods.push({ m: minor, role: "minor" }); why.push(`Markovnikov's rule: H adds to the C=C carbon that already has more hydrogens, leaving the positive charge on the carbon with more carbon groups (a ${CLASS[da]} rather than ${CLASS[db]} carbocation). The more stable carbocation gives the major product.`); }
    } else why.push("The alkene is symmetrical, so there is only one product.");
  } else why.push(`Each of the ${sites.length} C=C bonds reacts (reagent in excess), each following Markovnikov's rule.`);
  return { prods, why };
}
/** Loses a leaving group and a β-hydrogen to make C=C; Zaitsev: the more substituted alkene is the major product. */
function eliminate(m, lg, cA, what) {
  const c = ctx(m), betas = heavy(m, cA).filter((n) => n.atom.el === "C" && n.bond.order === 1 && c.H(n.atom.id) && !c.arom(n.atom.id));
  if (!betas.length) return { fail: `The carbon carrying the ${what} has no neighbouring carbon with a hydrogen (no β-hydrogen), so no C=C can form.` };
  const prods = uniq(betas.map((b) => { const p = K.clone(m); K.removeAtom(p, lg); dropDrawnH(p, b.atom.id); setOrder(p, cA, b.atom.id, 2); return { m: p, subs: heavy(p, cA).length + heavy(p, b.atom.id).length - 2 }; }));
  const best = Math.max(...prods.map((p) => p.subs));
  const why = [];
  if (prods.length > 1) {
    const top = prods.filter((p) => p.subs === best);
    prods.forEach((p) => { p.role = top.length === prods.length ? "product" : p.subs === best ? "major" : "minor"; });
    why.push(top.length === prods.length ? "There are different β-hydrogens, but the alkenes they give are equally substituted." : "Zaitsev's rule: removing different β-hydrogens gives different alkenes; the more substituted alkene (more alkyl groups on the C=C) is more stable and is the major product.");
  } else { prods[0].role = "product"; why.push("Only one alkene can form (every β-hydrogen gives the same product)."); }
  for (const p of prods) { const ez = K.analyse(p.m).ez; if (ez.length) p.note = "Forms as a mixture of E and Z isomers (more E, which is more stable)."; }
  return { prods: prods.map(({ m: pm, role, note }) => ({ m: pm, role, note })), why };
}
function none(m, c, need) {
  const have = describeGroups(m, c);
  return { fail: `No reaction: ${need}, and ${have.length ? `this molecule has ${list(have)}` : "this molecule has no functional group that reacts with it"}.` };
}
const list = (a) => (a.length < 2 ? a.join("") : `${a.slice(0, -1).join(", ")} and ${a.at(-1)}`);
function describeGroups(m, c) {
  const A = K.analyse(m); return [...new Set(A.groups.map((g) => g.label.toLowerCase().replace(/\s*\(.*\)/, "")))].map((g) => (/^[aeiou]/.test(g) ? `an ${g}` : `a ${g}`));
}

export const REAGENTS = [
  { id: "h2-ni", label: "H₂, Ni catalyst", cond: "150 °C", type: "Addition (hydrogenation)",
    run(m) {
      const c = ctx(m), s = [...alkenes(m, c), ...alkynes(m)];
      if (!s.length) return sixRings(m, c).length ? { fail: "No reaction under these conditions: a benzene ring is stabilised by its delocalised π electrons and isn't hydrogenated by H₂/Ni at 150 °C (it needs much harsher conditions)." } : none(m, c, "hydrogen adds across C=C and C≡C bonds");
      const p = K.clone(m); for (const b of s) K.bondOf(p, b.id).order = 1;
      return { prods: [{ m: p, role: "product" }], why: [`H₂ adds across ${s.length > 1 ? `all ${s.length} multiple bonds` : "the multiple bond"}: each carbon gains a hydrogen and the product is saturated.${sixRings(m, c).length ? " The benzene ring is not hydrogenated: its delocalised π system is too stable." : ""}`], byproducts: [] };
    } },
  { id: "br2", label: "Br₂", cond: "room temperature, in the dark", type: "Electrophilic addition", mechanism: "br2-butene",
    run(m) {
      const c = ctx(m), s = alkenes(m, c);
      if (!s.length) return sixRings(m, c).length ? { fail: "No reaction: benzene doesn't decolourise bromine water. Its delocalised π system is too stable to add Br₂; substitution needs a halogen carrier such as FeBr₃." } : none(m, c, "bromine adds across C=C bonds (and with UV light it substitutes into alkanes)");
      const p = K.clone(m); for (const b of s) { setOrder(p, b.a, b.b, 1); sprout(p, b.a, "Br"); sprout(p, b.b, "Br"); }
      return { prods: [{ m: p, role: "product" }], why: ["One bromine adds to each carbon of the C=C. This is the test for an alkene: orange bromine water turns colourless."], byproducts: [] };
    } },
  { id: "hbr", label: "HBr", cond: "room temperature", type: "Electrophilic addition", mechanism: "hbr-propene",
    run(m) { const r = markovnikov(m, "Br", "hydrogen bromide"); return r.fail ? r : { ...r, byproducts: [] }; } },
  { id: "steam", label: "H₂O(g), H₃PO₄ catalyst", cond: "300 °C, 60 atm", type: "Electrophilic addition (hydration)",
    run(m) { const r = markovnikov(m, "O", "steam"); return r.fail ? r : { ...r, byproducts: [], why: [...r.why, "Industrially this makes ethanol from ethene."] }; } },
  { id: "naoh-aq", label: "NaOH(aq)", cond: "warm, under reflux", type: "Nucleophilic substitution",
    run(m) {
      const c = ctx(m), s = halides(m, c);
      if (!s.length) return none(m, c, "hydroxide substitutes the halogen of a halogenoalkane");
      const p = K.clone(m); for (const h of s) K.atomOf(p, h.x).el = "O", K.atomOf(p, h.x).charge = 0;
      const cls = s[0].cls, mech = cls <= 1 ? "sn2" : cls === 3 ? "sn1" : "sn2";
      const why = [`OH⁻ replaces the halogen. ${cls <= 1 ? "A primary halogenoalkane reacts by SN2 (one step, the nucleophile attacking as the halide leaves)." : cls === 3 ? "A tertiary halogenoalkane reacts by SN1: the C–X bond breaks first, giving a tertiary carbocation that hydroxide or water attacks." : "A secondary halogenoalkane reacts by a mix of SN1 and SN2."}`, "Rate: C–I > C–Br > C–Cl, because the C–I bond is the weakest (bond enthalpy matters more than polarity)."];
      if (cls >= 2) why.push("Some elimination to an alkene competes; aqueous and warm conditions favour substitution.");
      return { prods: [{ m: p, role: "product" }], why, byproducts: [`Na${K.atomOf(m, s[0].x).el}`], mechanism: mech };
    } },
  { id: "koh-eth", label: "KOH in ethanol", cond: "heat under reflux", type: "Elimination", mechanism: "e2",
    run(m) {
      const c = ctx(m), s = halides(m, c);
      if (!s.length) return none(m, c, "hot ethanolic hydroxide eliminates HX from a halogenoalkane");
      if (s.length > 1) return { fail: "This molecule has more than one halogen: eliminating from several at once gives a mixture the lab won't predict reliably. Try a molecule with one halogen." };
      const r = eliminate(m, s[0].x, s[0].c, "halogen"); if (r.fail) return r;
      return { ...r, why: ["In hot ethanol, OH⁻ acts as a base: it removes a β-hydrogen as the halide leaves (E2), forming a C=C.", ...r.why], byproducts: ["H₂O", `K${K.atomOf(m, s[0].x).el}`] };
    } },
  { id: "kcn", label: "KCN in ethanol", cond: "heat under reflux", type: "Nucleophilic substitution (adds a carbon)",
    run(m) {
      const c = ctx(m), s = halides(m, c);
      if (!s.length) return none(m, c, "cyanide substitutes the halogen of a halogenoalkane");
      const p = K.clone(m);
      for (const h of s) { const x = K.atomOf(p, h.x), a = K.atomOf(p, h.c); x.el = "C"; const t = Math.atan2(x.y - a.y, x.x - a.x); sprout(p, x.id, "N", 3, t); }
      const cls = s[0].cls;
      return { prods: [{ m: p, role: "product" }], why: ["CN⁻ replaces the halogen, making a nitrile and adding one carbon to the chain: useful for building longer molecules.", "The C≡N group is linear (180°).", ...(cls === 3 ? ["With a tertiary halogenoalkane, elimination competes strongly; substitution goes by SN1."] : [])], byproducts: [`K${K.atomOf(m, s[0].x).el}`], mechanism: cls === 3 ? "sn1" : "sn2" };
    } },
  { id: "nh3", label: "excess NH₃ in ethanol", cond: "heat in a sealed tube", type: "Nucleophilic substitution",
    run(m) {
      const c = ctx(m), s = halides(m, c);
      if (!s.length) return none(m, c, "ammonia substitutes the halogen of a halogenoalkane");
      const p = K.clone(m); for (const h of s) K.atomOf(p, h.x).el = "N";
      return { prods: [{ m: p, role: "product" }], why: ["NH₃'s lone pair attacks the δ+ carbon; a second NH₃ removes H⁺ from the nitrogen, giving a primary amine.", "Excess ammonia keeps the product from reacting further (the amine is itself a nucleophile and would give secondary and tertiary amines)."], byproducts: ["NH₄Br"] };
    } },
  { id: "cr-distil", label: "K₂Cr₂O₇ / H₂SO₄", cond: "warm, distil the product off as it forms", type: "Oxidation",
    run(m) { return oxidise(m, false); } },
  { id: "cr-reflux", label: "excess K₂Cr₂O₇ / H₂SO₄", cond: "heat under reflux", type: "Oxidation",
    run(m) { return oxidise(m, true); } },
  { id: "nabh4", label: "NaBH₄", cond: "in water or methanol", type: "Reduction (nucleophilic addition)", mechanism: "nabh4-propanone",
    run(m) {
      const c = ctx(m), s = carbonyls(m, c).filter((x) => x.kind === "aldehyde" || x.kind === "ketone"), rest = carbonyls(m, c).filter((x) => x.kind === "acid" || x.kind === "other");
      if (!s.length) return rest.length ? { fail: "No reaction: NaBH₄ reduces aldehydes and ketones, but not carboxylic acids, esters or amides; their C=O is less electrophilic (the neighbouring O or N donates electron density). LiAlH₄ in dry ether reduces them." } : none(m, c, "NaBH₄ reduces the C=O of aldehydes and ketones");
      const p = K.clone(m); for (const x of s) setOrder(p, x.c, x.o, 1);
      const why = [`The hydride ion (H⁻) from NaBH₄ attacks the δ+ carbonyl carbon, then the O⁻ is protonated: ${s.some((x) => x.kind === "aldehyde") ? "an aldehyde gives a primary alcohol" : ""}${s.some((x) => x.kind === "aldehyde") && s.some((x) => x.kind === "ketone") ? " and " : ""}${s.some((x) => x.kind === "ketone") ? "a ketone gives a secondary alcohol" : ""}.`];
      if (rest.length) why.push("The other C=O group (acid, ester or amide) isn't reduced by NaBH₄.");
      if (K.analyse(p).stereo.length > K.analyse(m).stereo.length) why.push("A new stereocentre forms; H⁻ attacks the planar C=O from either face, so a racemic mixture results.");
      if (alkenes(m, c).length) why.push("C=C bonds aren't reduced: NaBH₄ is a nucleophile, and the electron-rich C=C doesn't attract it.");
      return { prods: [{ m: p, role: "product" }], why, byproducts: [] };
    } },
  { id: "h3po4", label: "excess conc. H₃PO₄", cond: "heat (about 170 °C)", type: "Elimination (dehydration)", mechanism: "e1",
    run(m) {
      const c = ctx(m), s = alcohols(m, c);
      if (!s.length) return none(m, c, "hot concentrated acid dehydrates alcohols");
      if (s.length > 1) return { fail: "This molecule has more than one –OH: dehydrating them all gives a mixture the lab won't predict reliably. Try a molecule with one –OH." };
      const r = eliminate(m, s[0].o, s[0].c, "–OH"); if (r.fail) return r;
      return { ...r, why: [`The acid protonates the –OH, which leaves as water. ${s[0].cls === 3 ? "A tertiary alcohol forms a stable tertiary carbocation, which loses H⁺ (E1)." : "A β-hydrogen is lost as water leaves."}`, ...r.why], byproducts: ["H₂O"], mechanism: s[0].cls === 3 ? "e1" : null };
    } },
  { id: "esterify", label: "ethanol, conc. H₂SO₄ catalyst", cond: "warm under reflux", type: "Esterification (condensation)",
    run(m) {
      const c = ctx(m), s = carbonyls(m, c).filter((x) => x.kind === "acid");
      if (!s.length) return none(m, c, "an alcohol esterifies carboxylic acids (try “excess K₂Cr₂O₇ / H₂SO₄” first to make an acid)");
      const p = K.clone(m); for (const x of s) { const C1 = sprout(p, x.oh, "C"); sprout(p, C1.id, "C"); }
      return { prods: [{ m: p, role: "product" }], why: ["The acid's –OH and a hydrogen from ethanol's –OH leave as water, joining the two through an ester link, –COO–.", "The reaction is reversible, so the yield is limited; the H₂SO₄ is a catalyst and also absorbs water."], byproducts: ["H₂O"] };
    } },
  { id: "br2-uv", label: "Br₂", cond: "UV light", type: "Free-radical substitution", mechanism: "radical-chlorination",
    run(m) {
      const c = ctx(m);
      if (alkenes(m, c).length) return { fail: "Use “Br₂, room temperature” for an alkene: bromine adds across the C=C quickly, without needing UV light." };
      const A = K.analyse(m);
      if (Object.keys(A.counts).some((e) => e !== "C" && e !== "H") || sixRings(m, c).length) return { fail: "The lab predicts free-radical substitution only for alkanes and cycloalkanes: other groups and benzene rings react in other ways, or give mixtures it can't rank." };
      const sites = m.atoms.filter((a) => a.el === "C" && c.H(a.id));
      const prods = uniq(sites.map((a) => { const p = K.clone(m); dropDrawnH(p, a.id); sprout(p, a.id, "Br"); return { m: p, role: "product" }; }));
      return { prods, why: ["A bromine radical takes a hydrogen, and the alkyl radical takes Br from Br₂ (a chain reaction).", prods.length > 1 ? `There are ${prods.length} different kinds of hydrogen, so ${prods.length} monobromo isomers form as a mixture (tertiary positions react fastest with bromine, because the tertiary radical is most stable). Further substitution also gives dibromo products.` : "Every hydrogen is equivalent, so one monobromo product forms (and some further substitution)."], byproducts: ["HBr"] };
    } },
  { id: "nitration", label: "conc. HNO₃ and conc. H₂SO₄", cond: "below 55 °C", type: "Electrophilic aromatic substitution", mechanism: "nitration",
    run(m) {
      const c = ctx(m), rs = sixRings(m, c);
      if (!rs.length) return { fail: "No reaction: nitration is a substitution of a benzene ring's hydrogen. This molecule has no benzene ring." };
      if (rs.length > 1) return { fail: "The lab predicts nitration for one benzene ring; fused or several rings need directing rules it doesn't cover." };
      const r = rs[0], subs = r.map((id, i) => ({ i, id, sub: heavy(m, id).find((n) => !r.includes(n.atom.id)) })).filter((x) => x.sub);
      const nitrate = (pos) => { const p = K.clone(m); const id = r[pos]; dropDrawnH(p, id); const a = K.atomOf(p, id), cx = r.reduce((t, k) => t + K.atomOf(m, k).x, 0) / 6, cy = r.reduce((t, k) => t + K.atomOf(m, k).y, 0) / 6; const N = sprout(p, id, "N", 1, Math.atan2(a.y - cy, a.x - cx)); N.charge = 1; sprout(p, N.id, "O", 2); const O = sprout(p, N.id, "O"); O.charge = -1; return p; };
      const why = ["The nitronium ion, NO₂⁺ (made from the two acids), is the electrophile. It attacks the ring's delocalised π electrons; losing H⁺ restores the aromatic ring, so H is substituted, not added.", "Below 55 °C to stop further nitration."];
      if (!subs.length) return { prods: [{ m: nitrate(0), role: "product" }], why, byproducts: ["H₂O"] };
      if (subs.length > 1) return { fail: "With more than one group on the ring, the directing effects can compete; the lab predicts only rings with one substituent." };
      const s = subs[0], at = s.sub.atom, deact = (at.el === "C" && heavy(m, at.id).some((n) => n.bond.order > 1 && n.atom.el !== "C")) || (at.el === "N" && at.charge > 0) || at.el === "S";
      const halo = X.includes(at.el) || at.el === "F";
      const pos = (d) => (s.i + d + 6) % 6;
      const prods = deact ? [{ m: nitrate(pos(2)), role: "product" }] : [{ m: nitrate(pos(1)), role: "major" }, { m: nitrate(pos(3)), role: "major" }];
      why.push(deact ? "The group on the ring withdraws electrons (it has a C=O, C≡N or N⁺): it deactivates the ring and directs to the 3-position (meta)." : halo ? "A halogen deactivates the ring slightly (it's electronegative) but its lone pairs direct to the 2- and 4-positions (ortho and para)." : "The group on the ring donates electrons (alkyl groups, –OH, –NH₂): it activates the ring and directs to the 2- and 4-positions (ortho and para).");
      return { prods: uniq(prods), why, byproducts: ["H₂O"] };
    } },
];
export const reagentOf = (id) => REAGENTS.find((r) => r.id === id);

function oxidise(m, full) {
  const c = ctx(m), alc = alcohols(m, c), ald = full ? carbonyls(m, c).filter((x) => x.kind === "aldehyde") : [];
  const ox = alc.filter((a) => a.cls < 3);
  if (!ox.length && !ald.length) {
    if (alc.length) return { fail: "No reaction: a tertiary alcohol has no hydrogen on the carbon carrying the –OH, so it can't be oxidised. The dichromate stays orange (this is how tertiary alcohols are told apart)." };
    if (!full && carbonyls(m, c).some((x) => x.kind === "aldehyde")) return { fail: "Distilling removes an aldehyde before it can react; to oxidise an aldehyde to a carboxylic acid, heat under reflux with excess oxidising agent." };
    return none(m, c, "acidified dichromate oxidises primary and secondary alcohols (and aldehydes)");
  }
  const p = K.clone(m), why = [];
  for (const a of ox) {
    dropDrawnH(p, a.c); setOrder(p, a.c, a.o, 2);
    if (a.cls === 1 && full) sprout(p, a.c, "O");
  }
  for (const x of ald) sprout(p, x.c, "O");
  if (ox.some((a) => a.cls === 1)) why.push(full ? "A primary alcohol is oxidised first to an aldehyde, and then, under reflux (the aldehyde can't escape), on to a carboxylic acid." : "A primary alcohol is oxidised to an aldehyde. Distilling it off as it forms stops it being oxidised further to a carboxylic acid.");
  if (ox.some((a) => a.cls === 2)) why.push("A secondary alcohol is oxidised to a ketone, which isn't oxidised further.");
  if (ald.length) why.push("The aldehyde is oxidised to a carboxylic acid.");
  if (alc.some((a) => a.cls === 3)) why.push("The tertiary –OH is unchanged: it has no H on its carbon.");
  why.push("Colour change: orange Cr₂O₇²⁻ is reduced to green Cr³⁺. In equations the oxidising agent is written [O].");
  return { prods: [{ m: p, role: "product" }], why, byproducts: ["H₂O"] };
}

/** The prediction for a reagent on a drawing. */
export function predict(m, reagentId) {
  const r = reagentOf(reagentId);
  if (!r) return { reacts: false, why: ["Unknown reagent."] };
  if (!m?.atoms?.length) return { reacts: false, reagent: r, why: ["Draw a starting material first."] };
  const A = K.analyse(m);
  if (A.problems.length) return { reacts: false, reagent: r, why: [`Fix the structure first: ${A.problems[0].text}`] };
  if (A.components > 1) return { reacts: false, reagent: r, why: ["Draw one starting molecule: the reagent comes from the list."] };
  const out = r.run(K.clone(m));
  if (out.fail) return { reacts: false, reagent: r, type: r.type, why: [out.fail], products: [] };
  return { reacts: true, reagent: r, type: r.type, products: out.prods, byproducts: out.byproducts || [], why: out.why, mechanism: out.mechanism !== undefined ? out.mechanism : r.mechanism || null };
}

/** Lays out a molecule from SMILES on the hexagon paper (for starting materials): chains zig-zag, a benzene ring is a hexagon. */
export function drawSmiles(smiles) {
  const g = K.graphFromSmiles(smiles), G = K.graph(g), rs = K.rings(G, 6).filter((r) => r.length === 6);
  const m = K.empty(), map = new Map();
  const ringIds = rs.length ? rs[0].map((i) => G.id[i]) : [];
  const place = (oldId, x, y) => { const o = K.atomOf(g, oldId), a = K.addAtom(m, x, y, o.el); a.charge = o.charge || 0; map.set(oldId, a.id); return a; };
  if (ringIds.length) {
    const pts = K.ringPath(m, 6, { type: "paper", x: 0, y: 0 }) || [...Array(6)].map((_, k) => [Math.cos((k * 60 + 30) * DEG), Math.sin((k * 60 + 30) * DEG)]);
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
  ["ethene", "C=C"], ["propene", "C=CC"], ["but-1-ene", "C=CCC"], ["2-methylpropene", "C=C(C)C"], ["cyclohexene", null],
  ["bromoethane", "CCBr"], ["2-bromobutane", "CC(Br)CC"], ["2-bromo-2-methylpropane", "CC(C)(C)Br"],
  ["ethanol", "CCO"], ["propan-1-ol", "CCCO"], ["propan-2-ol", "CC(C)O"], ["butan-2-ol", "CC(O)CC"], ["2-methylpropan-2-ol", "CC(C)(C)O"],
  ["ethanal", "CC=O"], ["propanone", "CC(C)=O"], ["ethanoic acid", "CC(=O)O"], ["propane", "CCC"], ["2-methylpropane", "CC(C)C"],
  ["benzene", "c1ccccc1"], ["methylbenzene", "Cc1ccccc1"], ["benzoic acid", "OC(=O)c1ccccc1"], ["chlorobenzene", "Clc1ccccc1"],
];
export function starter(name) {
  const s = STARTERS.find((x) => x[0] === name); if (!s) return null;
  if (s[1]) return drawSmiles(s[1]);
  const m = K.empty(); const pts = K.ringPath(m, 6, { type: "paper", x: 0, y: 0 }); const r = K.addRing(m, pts); const b = m.bonds[0]; b.order = 2; return m; // cyclohexene
}
