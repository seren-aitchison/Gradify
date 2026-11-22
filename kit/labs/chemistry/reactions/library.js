// The Organic Chemistry Lab's reaction library: each reaction is data, replayed by the mechanism engine
// (electron-flow.js), so every intermediate and product is produced by applying the template's own arrows.
//   start   atoms [key, el, x, y, charge, undrawn H], bonds [keyA, keyB, order]; positions in bond lengths
//   steps   arrows as ["lp", from, to] | ["bond", a, b, to] (prefix "f-" for a fishhook); to is an atom key or
//           [keyA, keyB] for "between these atoms". move: where atoms sit after the step (for the animation).
//   mistakes  checks on a learner's (valid) result that recognise a common wrong turn, with the explanation
// Conventions follow A-level and first-year courses. Tested in tests/mechanism.test.mjs.
import { build, bondBetween } from "./electron-flow.js";

export const FAMILIES = {
  "nucleophilic-substitution": "Nucleophilic substitution", elimination: "Elimination", "electrophilic-addition": "Electrophilic addition",
  "nucleophilic-addition": "Nucleophilic addition", radical: "Free-radical reactions",
};

export const REACTIONS = [
  {
    id: "sn2", family: "nucleophilic-substitution", title: "SN2: hydroxide + bromoethane", lessons: ["u13-10", "u13-08"],
    conditions: { above: "NaOH(aq)", below: "warm, under reflux" }, products: ["C2H6O", "Br-"],
    overview: "A primary halogenoalkane reacts with hydroxide ions in one concerted step: the nucleophile attacks the δ+ carbon from the side opposite the bromine while the C–Br bond breaks. Rate = k[RBr][OH⁻].",
    start: { atoms: [["O", "O", -2.7, 0, -1, 1], ["C1", "C", 0, 0, 0, 1], ["Br", "Br", 1, 0], ["C2", "C", -0.5, -0.87, 0, 3], ["H", "H", -0.5, 0.87]], bonds: [["C1", "Br"], ["C1", "C2"], ["C1", "H"]] },
    steps: [{
      arrows: [["lp", "O", "C1"], ["bond", "C1", "Br", "Br"]], label: "Products: ethanol + bromide",
      move: { O: [-1, 0], C2: [0.5, -0.87], H: [0.5, 0.87], Br: [2.6, 0.3] },
      hint: "Which carbon is δ+? Where are the electrons on the hydroxide, and what has to happen to the C–Br bond at the same moment?",
      explain: "A curly arrow shows a pair of electrons moving. The nucleophile's lone pair forms the new C–O bond; because carbon can't have five bonds, the C–Br bond breaks in the same step, its pair going to bromine (more electronegative), which leaves as Br⁻.",
    }],
    outcome: "Inversion of configuration (the Walden inversion): the other three groups flip like an umbrella in the wind. With a chiral substrate, one enantiomer gives the other.",
    misconceptions: ["Drawing the arrow from the O atom or the negative charge instead of a lone pair.", "Forgetting the C–Br arrow, which would give carbon five bonds.", "Drawing a carbocation: primary carbocations are too unstable, so primary substrates react by SN2."],
    mistakes: [{ test: (s, k) => !bondBetween(s, k.O, k.C1) && !bondBetween(s, k.C1, k.Br), text: "You've broken the C–Br bond first, which makes a primary carbocation: that's an SN1 route, and primary carbocations are too unstable. For bromoethane both arrows belong in one step." }],
  },
  {
    id: "sn1", family: "nucleophilic-substitution", title: "SN1: water + 2-bromo-2-methylpropane", lessons: ["u13-09", "u13-04"],
    conditions: { above: "H₂O", below: "room temperature" }, products: ["C4H10O", "H3O+", "Br-"],
    overview: "A tertiary halogenoalkane ionises first to a tertiary carbocation (the slow, rate-determining step), which water then attacks; a second water removes a proton. Rate = k[RBr].",
    start: { atoms: [["C", "C", 0, 0], ["Br", "Br", 1, 0], ["M1", "C", 0, -1, 0, 3], ["M2", "C", 0, 1, 0, 3], ["M3", "C", -1, 0, 0, 3], ["O1", "O", 2.7, -0.7, 0, 1], ["Ha", "H", 3.4, -1.3], ["O2", "O", 3.2, 1.1, 0, 2]], bonds: [["C", "Br"], ["C", "M1"], ["C", "M2"], ["C", "M3"], ["O1", "Ha"]] },
    steps: [
      { arrows: [["bond", "C", "Br", "Br"]], label: "Tertiary carbocation + bromide", move: { Br: [1.7, 2.2] },
        hint: "Which bond breaks on its own first, and which atom takes both electrons?", explain: "Heterolytic fission: the C–Br bond breaks with both electrons going to the more electronegative bromine. A tertiary carbocation is stabilised by the three electron-releasing methyl groups (inductive effect), so it can form. This step is slow and sets the rate." },
      { arrows: [["lp", "O1", "C"]], label: "Protonated alcohol (an oxonium ion)", move: { O1: [1, 0], Ha: [1.5, -0.87] },
        hint: "The carbocation has an empty orbital. What in the water can fill it?", explain: "A lone pair on water's oxygen forms a bond to the positive carbon. The carbocation is planar, so water can attack from either face: a chiral substrate gives a racemic mixture." },
      { arrows: [["lp", "O2", "Ha"], ["bond", "O1", "Ha", "O1"]], label: "Products: 2-methylpropan-2-ol + H₃O⁺", move: { Ha: [2.75, 0.25] },
        hint: "The oxygen now has three bonds and a + charge. How does it get back to neutral?", explain: "Proton transfer: a second water molecule uses a lone pair to take the H⁺, and the O–H bond's electrons return to the oxygen, which becomes neutral." },
    ],
    outcome: "Racemisation at a stereocentre: the planar carbocation is attacked equally from both faces.",
    misconceptions: ["Attacking with water before the C–Br bond breaks (that's SN2, blocked here by three bulky methyl groups).", "Leaving the product as a protonated alcohol."],
    mistakes: [{ test: (s, k) => !!bondBetween(s, k.O1, k.C) && !!bondBetween(s, k.C, k.Br), text: "Water can't bond while bromine is still attached: the carbon would have five bonds. In SN1 the C–Br bond breaks first, on its own." }],
  },
  {
    id: "e2", family: "elimination", title: "E2: hydroxide + 2-bromopropane", lessons: ["u13-13", "u13-11"],
    conditions: { above: "NaOH in ethanol", below: "heat under reflux" }, products: ["C3H6", "H2O", "Br-"],
    overview: "In ethanol and with heat, hydroxide acts as a base, not a nucleophile: it removes a proton from the carbon next to the C–Br, the C–H electrons form the C=C, and bromide leaves, all in one step.",
    start: { atoms: [["Ca", "C", 0, 0, 0, 1], ["Br", "Br", 0, 1], ["C1", "C", -0.87, -0.5, 0, 3], ["Cb", "C", 0.87, -0.5, 0, 2], ["Hb", "H", 1.25, -1.43], ["O", "O", 2.5, -2.1, -1, 1]], bonds: [["Ca", "Br"], ["Ca", "C1"], ["Ca", "Cb"], ["Cb", "Hb"]] },
    steps: [{
      arrows: [["lp", "O", "Hb"], ["bond", "Cb", "Hb", ["Cb", "Ca"]], ["bond", "Ca", "Br", "Br"]], label: "Products: propene + water + bromide",
      move: { Hb: [1.85, -1.55], Br: [0.2, 2.4] },
      hint: "Three electron pairs move at once. Start with the base: which hydrogen can it reach, on the carbon next to the C–Br?",
      explain: "The hydroxide's lone pair takes a β-hydrogen as H⁺. The electrons of that C–H bond move between the two carbons to form the π bond, and the C–Br bond breaks with both electrons going to bromine. H and Br leave from opposite sides (anti-periplanar).",
    }],
    outcome: "Gives the alkene. With unsymmetrical substrates the more substituted alkene usually dominates (Zaitsev's rule).",
    misconceptions: ["Attacking the carbon (substitution) instead of the β-hydrogen: favoured by aqueous, warm conditions.", "Drawing the C–H arrow to the hydroxide rather than into the C–C bond."],
    mistakes: [{ test: (s, k) => !!bondBetween(s, k.O, k.Ca), text: "Your hydroxide has bonded to carbon: that's substitution (SN). Hot ethanolic conditions make hydroxide act as a base, removing a β-hydrogen instead." }],
  },
  {
    id: "hbr-propene", family: "electrophilic-addition", title: "Electrophilic addition: HBr + propene", lessons: ["u13-15", "u13-26", "u13-04"],
    conditions: { above: "HBr(g)", below: "room temperature" }, products: ["C3H7Br"],
    overview: "The electron-rich C=C attacks the δ+ hydrogen of HBr, making a carbocation and bromide; bromide then attacks the carbocation. The more stable (secondary) carbocation forms, giving 2-bromopropane as the major product (Markovnikov's rule).",
    start: { atoms: [["C1", "C", 0, 0, 0, 2], ["C2", "C", 0.87, 0.5, 0, 1], ["C3", "C", 1.73, 0, 0, 3], ["H", "H", -0.3, -1.4], ["Br", "Br", -0.3, -2.4]], bonds: [["C1", "C2", 2], ["C2", "C3"], ["H", "Br"]] },
    steps: [
      { arrows: [["bond", "C1", "C2", ["C1", "H"]], ["bond", "H", "Br", "Br"]], label: "Secondary carbocation + bromide", move: { H: [-0.5, -0.87], Br: [1.3, -1.5] },
        hint: "Where are the most available electrons in propene? And which end of HBr is δ+?", explain: "The π bond is electron-rich, so the alkene acts as a nucleophile: its electrons form a bond to the δ+ hydrogen while the H–Br bond breaks heterolytically. Putting H on the CH₂ end leaves the positive charge on the middle carbon, a secondary carbocation, more stable than a primary one." },
      { arrows: [["lp", "Br", "C2"]], label: "Product: 2-bromopropane", move: { Br: [0.87, 1.5] },
        hint: "What can donate a pair of electrons to the positive carbon?", explain: "The bromide ion's lone pair bonds to the carbocation." },
    ],
    outcome: "Major product 2-bromopropane (via the secondary carbocation); the minor product 1-bromopropane comes from the less stable primary carbocation.",
    misconceptions: ["Starting the first arrow from a carbon atom rather than the C=C bond.", "Adding H to the middle carbon (gives the minor product via a primary carbocation).", "Missing the H–Br arrow."],
    mistakes: [{ test: (s, k) => !!bondBetween(s, k.C2, k.H), text: "You've added H to the middle carbon, which leaves a primary carbocation on the end carbon. That route gives only the minor product, 1-bromopropane: the secondary carbocation is more stable (Markovnikov's rule)." }],
  },
  {
    id: "hcn-ethanal", family: "nucleophilic-addition", title: "Nucleophilic addition: HCN + ethanal", lessons: ["u13-16", "u14-04"],
    conditions: { above: "KCN, then dilute H⁺", below: "room temperature" }, products: ["C3H5NO", "CN-"],
    overview: "Cyanide attacks the δ+ carbonyl carbon and the C=O π electrons move onto oxygen; the alkoxide then takes a proton from HCN, regenerating cyanide.",
    start: { atoms: [["Cn", "C", -2.4, 0.7, -1, 0], ["N", "N", -3.4, 0.9], ["C", "C", 0, 0, 0, 1], ["O", "O", 0, -1], ["Me", "C", 0.87, 0.5, 0, 3], ["Hh", "H", 1.4, -2.2], ["Cx", "C", 2.4, -2.2], ["Nx", "N", 3.4, -2.2]], bonds: [["Cn", "N", 3], ["C", "O", 2], ["C", "Me"], ["Hh", "Cx"], ["Cx", "Nx", 3]] },
    steps: [
      { arrows: [["lp", "Cn", "C"], ["bond", "C", "O", "O"]], label: "Alkoxide intermediate", move: { Cn: [-0.87, 0.5], N: [-1.73, 1.0] },
        hint: "The C=O bond is polar. Which atom is δ+, and which electrons in cyanide can attack it?", explain: "Oxygen is more electronegative, so the carbonyl carbon is δ+. Cyanide's carbon lone pair forms a C–C bond, and the C=O π bond's electrons move onto oxygen (carbon can't have five bonds), giving O⁻." },
      { arrows: [["lp", "O", "Hh"], ["bond", "Hh", "Cx", "Cx"]], label: "Product: 2-hydroxypropanenitrile + cyanide", move: { Hh: [0.75, -1.65] },
        hint: "The O⁻ is a strong base. Where can it get H⁺ from?", explain: "Proton transfer: an oxygen lone pair takes H⁺ from HCN, and the H–C bond's electrons go to carbon, regenerating CN⁻ (so cyanide acts as a catalyst)." },
    ],
    outcome: "The product has a new stereocentre; the planar carbonyl is attacked from either face, so a racemic mixture forms.",
    misconceptions: ["Attacking with the nitrogen end of cyanide (here the carbon carries the lone pair that bonds).", "Leaving out the π-bond arrow onto oxygen."],
    mistakes: [],
  },
  {
    id: "radical-chlorination", family: "radical", title: "Free-radical substitution: chlorine + methane", lessons: ["u13-06", "u13-03"],
    conditions: { above: "Cl₂", below: "UV light" }, products: ["CH3Cl", "HCl", "Cl•", "Cl•"],
    overview: "UV light splits Cl₂ into chlorine radicals (initiation). A chlorine radical takes H from methane, and the methyl radical takes Cl from another Cl₂, regenerating a chlorine radical (propagation, a chain reaction).",
    start: { atoms: [["Cla", "Cl", -3.6, -0.6], ["Clb", "Cl", -2.6, -0.6], ["C", "C", 0, 0, 0, 3], ["Hx", "H", -1, 0], ["Clc", "Cl", 1.9, -0.9], ["Cld", "Cl", 2.9, -0.9]], bonds: [["Cla", "Clb"], ["C", "Hx"], ["Clc", "Cld"]] },
    steps: [
      { arrows: [["f-bond", "Cla", "Clb", "Cla"], ["f-bond", "Cla", "Clb", "Clb"]], label: "Initiation: two chlorine radicals", move: { Cla: [-4.1, -1.3], Clb: [-2.1, -0.3] },
        hint: "UV light breaks the weakest bond. How are its two electrons shared out?", explain: "Homolytic fission: each chlorine takes one electron of the Cl–Cl bond. A fishhook (half-headed) arrow shows one electron moving, so you need two." },
      { arrows: [["f-lp", "Clb", ["Clb", "Hx"]], ["f-bond", "C", "Hx", ["Clb", "Hx"]], ["f-bond", "C", "Hx", "C"]], label: "Propagation: HCl + methyl radical", move: { Hx: [-1.15, -0.25] },
        hint: "A radical has an unpaired electron that wants a partner. Which bond in methane can it attack?", explain: "The chlorine radical's electron pairs with one electron from the C–H bond to make H–Cl; the other C–H electron stays on carbon, which becomes a methyl radical. Three fishhooks." },
      { arrows: [["f-lp", "C", ["C", "Clc"]], ["f-bond", "Clc", "Cld", ["C", "Clc"]], ["f-bond", "Clc", "Cld", "Cld"]], label: "Propagation: chloromethane + chlorine radical", move: { Clc: [1, 0], Cld: [3.4, -1.5] },
        hint: "The methyl radical meets another Cl₂ molecule. What happens to the Cl–Cl bond?", explain: "The methyl radical's electron pairs with one electron from Cl–Cl to make C–Cl; the other Cl gets the second electron and becomes a new chlorine radical, which carries the chain on." },
    ],
    outcome: "A chain reaction; termination steps (two radicals combining) end it. Further substitution gives CH₂Cl₂, CHCl₃ and CCl₄.",
    misconceptions: ["Using full curly arrows for radical steps.", "Drawing H• (a hydrogen radical) forming in propagation: the chlorine radical takes H to make HCl."],
    mistakes: [],
  },
];

/** A reaction's starting state, with the arrows written in electron-flow terms (atom ids). */
export function instantiate(r) {
  const s = build(r.start.atoms, r.start.bonds), k = s.key;
  const tgt = (t) => (Array.isArray(t) ? { between: t.map((x) => k[x]) } : { atom: k[t] });
  const arrow = (a) => {
    const single = a[0].startsWith("f-"), kind = a[0].replace("f-", ""), type = single ? "single" : "pair";
    if (kind === "lp") return { type, from: { lp: k[a[1]] }, to: tgt(a[2]) };
    const b = s.bonds.find((x) => (x.a === k[a[1]] && x.b === k[a[2]]) || (x.a === k[a[2]] && x.b === k[a[1]]));
    return { type, from: { bond: b ? b.id : null, ends: [k[a[1]], k[a[2]]] }, to: tgt(a[3]) };
  };
  return { reaction: r, start: s, key: k, steps: r.steps.map((st) => ({ ...st, arrows: st.arrows.map(arrow), move: st.move ? Object.fromEntries(Object.entries(st.move).map(([kk, v]) => [k[kk], v])) : null })) };
}
