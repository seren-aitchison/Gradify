// The Organic Chemistry Lab's reaction library: each reaction is data, replayed by the mechanism engine
// (electron-flow.js), so every intermediate and product is produced by applying the template's own arrows.
//   start   atoms [key, el, x, y, charge, undrawn H], bonds [keyA, keyB, order]; positions in bond lengths
//   steps   arrows as ["lp", from, to] | ["bond", a, b, to] (prefix "f-" for a fishhook); to is an atom key or
//           [keyA, keyB] for "between these atoms". move: where atoms sit after the step (for the animation).
//   mistakes  checks on a learner's (valid) result that recognise a common wrong turn, with the explanation
// Conventions follow A-level and first-year courses. Tested in tests/mechanism.test.mjs.
import { build, bondBetween, normalize, applyStep, replay, sameState, atomOf, atomLabel, EN } from "./electron-flow.js";

export const FAMILIES = {
  "nucleophilic-substitution": "Nucleophilic substitution", elimination: "Elimination", "electrophilic-addition": "Electrophilic addition",
  "nucleophilic-addition": "Nucleophilic addition", "aromatic-substitution": "Electrophilic aromatic substitution",
  "addition-elimination": "Nucleophilic addition–elimination", radical: "Free-radical reactions",
};

export const REACTIONS = [
  {
    id: "sn2", family: "nucleophilic-substitution", title: "SN2: hydroxide + bromoethane", lessons: ["u13-10", "u13-08"], level: "foundation",
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
    id: "sn1", family: "nucleophilic-substitution", title: "SN1: water + 2-bromo-2-methylpropane", lessons: ["u13-09", "u13-04"], level: "intermediate",
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
    id: "e2", family: "elimination", title: "E2: hydroxide + 2-bromopropane", lessons: ["u13-13", "u13-11"], level: "intermediate",
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
    id: "hbr-propene", family: "electrophilic-addition", title: "Electrophilic addition: HBr + propene", lessons: ["u13-15", "u13-26", "u13-04"], level: "foundation",
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
    id: "hcn-ethanal", family: "nucleophilic-addition", title: "Nucleophilic addition: HCN + ethanal", lessons: ["u13-16", "u14-04"], level: "intermediate",
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
    id: "e1", family: "elimination", title: "E1: dehydration of 2-methylpropan-2-ol", lessons: ["u13-12", "u13-11"], level: "intermediate",
    conditions: { above: "conc. H₃PO₄ (or H₂SO₄)", below: "heat" }, products: ["C4H8", "H2O", "H2O", "H3O+"],
    overview: "Acid turns the poor leaving group –OH into a good one, –OH₂⁺. Water leaves on its own, giving a tertiary carbocation (the slow step), and a water molecule then removes a proton from a neighbouring carbon to form the C=C. Rate = k[R–OH₂⁺]: only one species in the slow step.",
    start: { atoms: [["C", "C", 0, 0], ["M1", "C", 0, -1, 0, 2], ["M2", "C", -1, 0, 0, 3], ["M3", "C", 0, 1, 0, 3], ["O", "O", 1, 0, 0, 1], ["Hb", "H", -0.7, -1.7], ["Oa", "O", 3.5, -1.3, 1, 2], ["Ha", "H", 2.6, -0.85], ["Ob", "O", -1.9, -2.5, 0, 2]],
      bonds: [["C", "M1"], ["C", "M2"], ["C", "M3"], ["C", "O"], ["M1", "Hb"], ["Oa", "Ha"]] },
    steps: [
      { arrows: [["lp", "O", "Ha"], ["bond", "Ha", "Oa", "Oa"]], label: "Protonated alcohol (–OH₂⁺) + water", move: { Ha: [1.45, -0.8], Oa: [3.9, -1.7] },
        hint: "–OH is a poor leaving group (OH⁻ is a strong base). What can the acid do to the oxygen first?", explain: "A lone pair on the alcohol's oxygen takes a proton from H₃O⁺ (the acid catalyst). The oxygen now carries a + charge, and the group can leave as a neutral water molecule, which is stable." },
      { arrows: [["bond", "C", "O", "O"]], label: "Tertiary carbocation + water", move: { O: [2.1, 0.35], Ha: [2.6, -0.3] },
        hint: "The C–O bond is now weak. Which atom takes both of its electrons?", explain: "Heterolytic fission: the C–O bond breaks with both electrons going to oxygen, and water leaves. This is the slow, rate-determining step; it happens because the tertiary carbocation is stabilised by three electron-releasing methyl groups." },
      { arrows: [["lp", "Ob", "Hb"], ["bond", "M1", "Hb", ["M1", "C"]]], label: "Products: 2-methylpropene + H₃O⁺", move: { Hb: [-1.25, -2.05] },
        hint: "The carbocation loses a proton from a neighbouring carbon. Where do that C–H bond's electrons go?", explain: "A water molecule takes a β-hydrogen as H⁺, and the electrons of the C–H bond move between the two carbons, forming the C=C and cancelling the + charge. The acid is regenerated as H₃O⁺, so it's a catalyst." },
    ],
    outcome: "An alkene. If there are different β-hydrogens, the more substituted alkene forms most (Zaitsev's rule). E1 competes with SN1 because they share the carbocation; heat favours elimination.",
    misconceptions: ["Letting OH⁻ leave directly: hydroxide is a poor leaving group, so the –OH must be protonated first.", "Removing the proton before water leaves (that would be one concerted E2 step).", "Forgetting that the acid is regenerated."],
    mistakes: [{ test: (s, k) => !bondBetween(s, k.C, k.O) && !bondBetween(s, k.O, k.Ha), text: "You've broken the C–O bond before protonating the oxygen, so OH⁻ would have to leave. Hydroxide is a strong base and a poor leaving group: first use a lone pair on O to take H⁺ from the acid." }],
  },
  {
    id: "br2-butene", family: "electrophilic-addition", title: "Electrophilic addition: bromine + but-2-ene", lessons: ["u13-14", "u13-15"], level: "foundation",
    conditions: { above: "Br₂", below: "room temperature" }, products: ["C4H8Br2"],
    overview: "Br₂ is non-polar, but the electron-dense C=C repels electrons in the Br–Br bond, inducing a dipole: the nearer bromine becomes δ+. The π electrons attack it, the Br–Br bond breaks heterolytically, and bromide then attacks the carbocation. Orange bromine water decolourises: the test for C=C.",
    start: { atoms: [["Ca", "C", 0, 0, 0, 1], ["Cb", "C", 1, 0, 0, 1], ["Me1", "C", -0.5, 0.87, 0, 3], ["Me2", "C", 1.5, 0.87, 0, 3], ["Br1", "Br", 0.5, -1.5], ["Br2", "Br", 0.5, -2.5]],
      bonds: [["Ca", "Cb", 2], ["Ca", "Me1"], ["Cb", "Me2"], ["Br1", "Br2"]] },
    steps: [
      { arrows: [["bond", "Ca", "Cb", ["Ca", "Br1"]], ["bond", "Br1", "Br2", "Br2"]], label: "Carbocation + bromide", move: { Br1: [-0.5, -0.87], Br2: [2.3, -1.6] },
        hint: "Bromine has no permanent dipole. What does the C=C do to it as it approaches, and which bromine becomes δ+?", explain: "The π electrons form a bond to the nearer, δ+ bromine, while the Br–Br bond's electrons move onto the far bromine, which leaves as Br⁻. The other carbon of the old C=C is left with a + charge (a secondary carbocation here)." },
      { arrows: [["lp", "Br2", "Cb"]], label: "Product: 2,3-dibromobutane", move: { Br2: [1.5, -0.87] },
        hint: "The bromide ion has lone pairs. Where is the positive charge?", explain: "The bromide's lone pair bonds to the carbocation, giving the 1,2-dibromo product: one bromine on each carbon of the old C=C." },
    ],
    outcome: "A dibromoalkane. At university level the intermediate is a bridged bromonium ion rather than an open carbocation, which explains why the two bromines add to opposite faces (anti addition).",
    misconceptions: ["Saying Br₂ is polar: its dipole is induced by the C=C.", "Drawing the first arrow from bromine to the alkene: electrons flow from the electron-rich C=C to the δ+ Br.", "Putting both bromines on the same carbon."],
    mistakes: [],
  },
  {
    id: "nitration", family: "aromatic-substitution", title: "Electrophilic substitution: nitration of benzene", lessons: ["u13-17", "u14-15"], level: "intermediate",
    conditions: { above: "conc. HNO₃ + conc. H₂SO₄", below: "below 55 °C" }, products: ["C6H5NO2", "H2O4S"],
    overview: "The two acids make the nitronium ion, NO₂⁺ (HNO₃ + 2H₂SO₄ → NO₂⁺ + H₃O⁺ + 2HSO₄⁻). It is attacked by the ring's delocalised π electrons, giving a positive intermediate that has lost aromaticity; losing H⁺ to HSO₄⁻ restores the stable ring. Substitution, not addition, because aromaticity is kept.",
    start: { atoms: [["R1", "C", 0, -1], ["R2", "C", 0.87, -0.5, 0, 1], ["R3", "C", 0.87, 0.5, 0, 1], ["R4", "C", 0, 1, 0, 1], ["R5", "C", -0.87, 0.5, 0, 1], ["R6", "C", -0.87, -0.5, 0, 1], ["Hx", "H", -0.55, -1.85],
      ["N", "N", 1.7, -2.3, 1], ["Oa", "O", 0.8, -2.7], ["Ob", "O", 2.6, -1.9], ["Ox", "O", -1.7, -2.9, -1], ["S", "S", -2.6, -3.3], ["Os1", "O", -3.2, -2.5], ["Os2", "O", -2.2, -4.1], ["Os3", "O", -3.4, -4.0, 0, 1]],
      bonds: [["R1", "R2", 2], ["R2", "R3"], ["R3", "R4", 2], ["R4", "R5"], ["R5", "R6", 2], ["R6", "R1"], ["R1", "Hx"], ["N", "Oa", 2], ["N", "Ob", 2], ["S", "Ox"], ["S", "Os1", 2], ["S", "Os2", 2], ["S", "Os3"]] },
    steps: [
      { arrows: [["bond", "R1", "R2", ["R1", "N"]], ["bond", "N", "Oa", "Oa"]], label: "Intermediate: the ring has lost its aromaticity", move: { N: [0.6, -1.85], Oa: [0.3, -2.8], Ob: [1.6, -1.95] },
        hint: "The electrophile is NO₂⁺. Where are the electrons in benzene that can attack it, and what must happen at nitrogen so it doesn't get five bonds?", explain: "Two of the ring's π electrons form a C–N bond. Nitrogen can't take a fifth bond, so one N=O π bond's electrons move onto oxygen (O⁻, with N⁺: a nitro group). The positive charge is left in the ring, delocalised over three carbons; the ring is no longer aromatic, so this step is slow." },
      { arrows: [["lp", "Ox", "Hx"], ["bond", "R1", "Hx", ["R1", "R2"]]], label: "Products: nitrobenzene + H₂SO₄", move: { Hx: [-1.15, -2.45] },
        hint: "The carbon that the nitro group joined still has its hydrogen. How does the ring get its aromaticity back?", explain: "HSO₄⁻ removes the H⁺, and the C–H bond's electrons go back into the ring, restoring the delocalised π system and regenerating H₂SO₄ (a catalyst)." },
    ],
    outcome: "Nitrobenzene. Substituents already on the ring change the rate and where NO₂ goes: –CH₃ and –OH direct to positions 2 and 4; –NO₂, –COOH and –CHO direct to position 3.",
    misconceptions: ["Drawing the first arrow from NO₂⁺ to the ring: electrons flow from the ring to the electrophile.", "Adding the base to the ring (addition) instead of removing H⁺ (substitution keeps aromaticity).", "Drawing the arrow to remove H⁺ from the wrong carbon: it is the carbon that gained the nitro group."],
    mistakes: [{ test: (s, k) => !!bondBetween(s, k.Ox, k.R2), text: "The base has bonded to the ring: that's addition, which would leave the ring non-aromatic. Benzene keeps its stable delocalised ring by losing H⁺ from the carbon that the NO₂ joined." }],
  },
  {
    id: "nabh4-propanone", family: "nucleophilic-addition", title: "Reduction: NaBH₄ + propanone", lessons: ["u13-20", "u14-05"], level: "intermediate",
    conditions: { above: "NaBH₄", below: "in water or methanol" }, products: ["C3H8O", "HO-"],
    overview: "NaBH₄ delivers a hydride ion, H⁻, which is a nucleophile. It attacks the δ+ carbonyl carbon as the C=O π electrons move onto oxygen; the alkoxide then takes a proton from water. A ketone gives a secondary alcohol, an aldehyde a primary alcohol.",
    start: { atoms: [["C", "C", 0, 0], ["O", "O", 0, -1], ["Me1", "C", -0.87, 0.5, 0, 3], ["Me2", "C", 0.87, 0.5, 0, 3], ["Hy", "H", -2.2, -0.6, -1], ["Hw", "H", 0.95, -1.75], ["Ow", "O", 1.8, -2.2, 0, 1]],
      bonds: [["C", "O", 2], ["C", "Me1"], ["C", "Me2"], ["Hw", "Ow"]] },
    steps: [
      { arrows: [["lp", "Hy", "C"], ["bond", "C", "O", "O"]], label: "Alkoxide intermediate", move: { Hy: [0, 1] },
        hint: "The hydride ion has a pair of electrons and a − charge. Which atom of the C=O is δ+?", explain: "H⁻ uses its electron pair to bond to the carbonyl carbon. Carbon can't keep four bonds plus a new one, so the C=O π electrons move onto oxygen, giving O⁻." },
      { arrows: [["lp", "O", "Hw"], ["bond", "Hw", "Ow", "Ow"]], label: "Product: propan-2-ol + OH⁻", move: { Hw: [0.7, -1.55], Ow: [2.0, -2.4] },
        hint: "The O⁻ is a strong base. Where can it get a proton from?", explain: "Proton transfer: a lone pair on the alkoxide oxygen takes H⁺ from water, giving the alcohol and a hydroxide ion." },
    ],
    outcome: "Propan-2-ol, a secondary alcohol. A planar C=O attacked from either face gives a racemic mixture when a stereocentre forms. NaBH₄ doesn't reduce C=C, carboxylic acids or esters.",
    misconceptions: ["Writing H⁺ or H• as the nucleophile: it is the hydride ion, H⁻.", "Missing the π-bond arrow onto oxygen.", "Thinking NaBH₄ reduces C=C bonds (the electron-rich C=C doesn't attract a nucleophile)."],
    mistakes: [],
  },
  {
    id: "acyl-water", family: "addition-elimination", title: "Addition–elimination: water + ethanoyl chloride", lessons: ["u14-07", "u13-22"], level: "intermediate",
    conditions: { above: "H₂O", below: "room temperature (vigorous; steamy fumes of HCl)" }, products: ["C2H4O2", "HCl"],
    overview: "The carbonyl carbon of an acyl chloride is very δ+ (two electronegative atoms pull on it). Water adds to it, opening the C=O (addition); the C=O then re-forms and pushes out chloride (elimination); finally chloride takes a proton. The same pattern with alcohols gives esters, and with ammonia, amides.",
    start: { atoms: [["C", "C", 0, 0], ["O", "O", 0, -1], ["Cl", "Cl", 0.87, 0.5], ["Me", "C", -0.87, 0.5, 0, 3], ["Ow", "O", 2.4, -0.6, 0, 1], ["Hw", "H", 3.0, -1.4]],
      bonds: [["C", "O", 2], ["C", "Cl"], ["C", "Me"], ["Ow", "Hw"]] },
    steps: [
      { arrows: [["lp", "Ow", "C"], ["bond", "C", "O", "O"]], label: "Addition: tetrahedral intermediate", move: { Ow: [1, -0.3], Hw: [1.6, -1.0] },
        hint: "Which atom of the acyl chloride is most δ+? What happens to the C=O when the nucleophile bonds?", explain: "A lone pair on water's oxygen bonds to the carbonyl carbon, and the C=O π electrons move onto oxygen (O⁻). The carbon is briefly tetrahedral, bonded to four groups." },
      { arrows: [["lp", "O", ["O", "C"]], ["bond", "C", "Cl", "Cl"]], label: "Elimination: chloride leaves", move: { Cl: [1.6, 1.3] },
        hint: "The O⁻ can push its electrons back down. Which group can leave so the carbon doesn't get five bonds?", explain: "A lone pair on O⁻ re-forms the C=O π bond, and the C–Cl bond breaks with both electrons going to chlorine, which leaves as Cl⁻ (a good leaving group)." },
      { arrows: [["lp", "Cl", "Hw"], ["bond", "Hw", "Ow", "Ow"]], label: "Products: ethanoic acid + HCl", move: { Hw: [2.1, 0.6] },
        hint: "The oxygen from the water still has three bonds and a + charge. What removes the extra proton?", explain: "Chloride uses a lone pair to take H⁺ from the positive oxygen, giving the carboxylic acid and HCl, seen as steamy fumes." },
    ],
    outcome: "Ethanoic acid and HCl. Acyl chlorides react much faster than carboxylic acids; with an alcohol the product is an ester, with NH₃ an amide.",
    misconceptions: ["Drawing an SN2-style step where chloride leaves as water attacks: at a C=O the nucleophile adds first.", "Leaving the product with a positively charged oxygen.", "Missing the arrow that re-forms the C=O."],
    mistakes: [{ test: (s, k) => !!bondBetween(s, k.Ow, k.C) && !bondBetween(s, k.C, k.Cl) && (bondBetween(s, k.C, k.O)?.e ?? 0) >= 4, text: "You've pushed chloride out at the same moment the water bonds, as in SN2. At a C=O carbon the nucleophile adds first and the π bond opens onto oxygen; chloride leaves in the next step, as the C=O re-forms (addition, then elimination)." }],
  },
  {
    id: "chlorination", family: "aromatic-substitution", title: "Halogenation: chlorine + benzene (AlCl₃ catalyst)", lessons: ["u13-17", "u14-17"], level: "intermediate",
    conditions: { above: "Cl₂, AlCl₃", below: "room temperature, dry" }, products: ["C6H5Cl", "HCl", "AlCl3"],
    overview: "Chlorine on its own can't attack benzene's stable ring. The halogen carrier AlCl₃ accepts a lone pair from one chlorine and pulls the Cl–Cl electrons over, releasing a Cl⁺ electrophile. The ring attacks it, then loses H⁺ to AlCl₄⁻, which regenerates AlCl₃ (a catalyst) and makes HCl. FeBr₃ does the same job for bromine.",
    start: { atoms: [["R1", "C", 0, -1], ["R2", "C", 0.87, -0.5, 0, 1], ["R3", "C", 0.87, 0.5, 0, 1], ["R4", "C", 0, 1, 0, 1], ["R5", "C", -0.87, 0.5, 0, 1], ["R6", "C", -0.87, -0.5, 0, 1], ["Hx", "H", -0.6, -1.85], ["Cla", "Cl", 0.6, -2.6], ["Clb", "Cl", -0.4, -2.95], ["Al", "Al", -1.4, -3.45], ["Cl1", "Cl", -2.35, -3.0], ["Cl2", "Cl", -1.5, -4.45], ["Cl3", "Cl", -0.55, -4.05]],
      bonds: [["R1", "R2", 2], ["R2", "R3"], ["R3", "R4", 2], ["R4", "R5"], ["R5", "R6", 2], ["R6", "R1"], ["R1", "Hx"], ["Cla", "Clb"], ["Al", "Cl1"], ["Al", "Cl2"], ["Al", "Cl3"]] },
    steps: [
      { arrows: [["lp", "Clb", "Al"], ["bond", "Cla", "Clb", "Clb"]], label: "Making the electrophile: Cl⁺ and AlCl₄⁻", move: { Cla: [0.75, -2.35] },
        hint: "AlCl₃ has only six electrons round aluminium. What can a chlorine give it, and what happens to the Cl–Cl bond?", explain: "A lone pair on one chlorine forms a bond to aluminium (AlCl₃ is a Lewis acid, an electron-pair acceptor). That chlorine takes the Cl–Cl bond's electrons, so the other chlorine is left as Cl⁺, a strong electrophile." },
      { arrows: [["bond", "R1", "R2", ["R1", "Cla"]]], label: "Intermediate: the ring has lost its aromaticity", move: { Cla: [0.55, -1.85] },
        hint: "Where are the electrons in benzene that can attack Cl⁺?", explain: "Two of the ring's delocalised π electrons form the C–Cl bond. The positive charge is spread over the remaining five carbons and the ring is no longer aromatic, so this step is slow." },
      { arrows: [["bond", "Clb", "Al", ["Clb", "Hx"]], ["bond", "R1", "Hx", ["R1", "R2"]]], label: "Products: chlorobenzene + HCl, AlCl₃ regenerated", move: { Hx: [-0.5, -2.05] },
        hint: "The ring wants its aromaticity back. Which H⁺ can it lose, and what removes it?", explain: "AlCl₄⁻ gives back a chloride: the electrons of an Al–Cl bond form the H–Cl bond, and the C–H bond's electrons return to the ring, restoring aromaticity. AlCl₃ is regenerated." },
    ],
    outcome: "Chlorobenzene. With a substituent already on the ring, the halogen goes where that group directs it (2- and 4- for –CH₃, 3- for –NO₂).",
    misconceptions: ["Drawing benzene attacking Cl₂ directly, without the halogen carrier.", "Adding Cl across a C=C of the ring (addition) instead of substituting H.", "Forgetting that AlCl₃ is regenerated, so it's a catalyst."],
    mistakes: [],
  },
  {
    id: "fc-acylation", family: "aromatic-substitution", title: "Friedel–Crafts acylation: ethanoyl chloride + benzene", lessons: ["u13-17", "u14-15"], level: "intermediate",
    conditions: { above: "CH₃COCl, AlCl₃", below: "dry, reflux at 60 °C" }, products: ["C8H8O", "HCl", "AlCl3"],
    overview: "AlCl₃ removes chloride from ethanoyl chloride, giving the acylium ion CH₃CO⁺, the electrophile. Benzene attacks it and loses H⁺, giving phenylethanone. It makes a new C–C bond to the ring, and the ketone product deactivates the ring so only one acyl group adds.",
    start: { atoms: [["R1", "C", 0, -1], ["R2", "C", 0.87, -0.5, 0, 1], ["R3", "C", 0.87, 0.5, 0, 1], ["R4", "C", 0, 1, 0, 1], ["R5", "C", -0.87, 0.5, 0, 1], ["R6", "C", -0.87, -0.5, 0, 1], ["Hx", "H", -0.6, -1.85], ["Cc", "C", 1.9, -2.3], ["Oc", "O", 2.6, -3.0], ["Me", "C", 2.6, -1.6, 0, 3], ["Cl", "Cl", 1.0, -2.8], ["Al", "Al", 0.1, -3.3], ["Cl1", "Cl", -0.8, -2.8], ["Cl2", "Cl", 0.1, -4.3], ["Cl3", "Cl", 0.95, -3.85]],
      bonds: [["R1", "R2", 2], ["R2", "R3"], ["R3", "R4", 2], ["R4", "R5"], ["R5", "R6", 2], ["R6", "R1"], ["R1", "Hx"], ["Cc", "Oc", 2], ["Cc", "Me"], ["Cc", "Cl"], ["Al", "Cl1"], ["Al", "Cl2"], ["Al", "Cl3"]] },
    steps: [
      { arrows: [["lp", "Cl", "Al"], ["bond", "Cc", "Cl", "Cl"]], label: "The acylium ion, CH₃CO⁺, and AlCl₄⁻", move: { Cl: [-1.4, -2.4], Al: [-2.3, -2.9], Cl1: [-3.2, -2.4], Cl2: [-2.3, -3.9], Cl3: [-2.95, -3.65] },
        hint: "AlCl₃ is a Lewis acid. Which atom of ethanoyl chloride can give it a lone pair, and which bond breaks?", explain: "The chlorine's lone pair bonds to aluminium, and the C–Cl bond breaks with its electrons going to chlorine. Left behind is the acylium ion, stabilised because oxygen's lone pair can form a C≡O⁺ triple bond." },
      { arrows: [["bond", "R1", "R2", ["R1", "Cc"]]], label: "Intermediate: the ring has lost its aromaticity", move: { Cc: [0.5, -1.87], Oc: [1.45, -2.2], Me: [0.1, -2.8] },
        hint: "The acylium carbon is the electrophile. What in benzene attacks it?", explain: "A pair of the ring's π electrons forms a C–C bond to the acylium carbon; the positive charge moves into the ring." },
      { arrows: [["bond", "Cl", "Al", ["Cl", "Hx"]], ["bond", "R1", "Hx", ["R1", "R2"]]], label: "Products: phenylethanone + HCl, AlCl₃ regenerated", move: { Hx: [-0.85, -2.1] },
        hint: "How does the ring become aromatic again, and what happens to AlCl₄⁻?", explain: "An Al–Cl bond's electrons form H–Cl as the C–H bond's electrons return to the ring. Aromaticity is restored and AlCl₃ is regenerated." },
    ],
    outcome: "Phenylethanone (acetophenone), C₆H₅COCH₃. Friedel–Crafts reactions fail on strongly deactivated rings (–NO₂, C=O) and on –NH₂ rings, whose lone pair ties up the AlCl₃.",
    misconceptions: ["Using the acyl chloride's C=O carbon before AlCl₃ has removed chloride.", "Thinking several acyl groups add (the ketone deactivates the ring; that is alkylation's problem).", "Forgetting that the reaction needs dry conditions (water destroys AlCl₃)."],
    mistakes: [],
  },
  {
    id: "ester-hydrolysis", family: "addition-elimination", title: "Alkaline hydrolysis: hydroxide + ethyl ethanoate", lessons: ["u14-09", "u13-22"], level: "intermediate",
    conditions: { above: "NaOH(aq)", below: "heat under reflux" }, products: ["C2H3O2-", "C2H6O"],
    overview: "Hydroxide adds to the ester's δ+ carbonyl carbon, giving a tetrahedral intermediate. The C=O re-forms and pushes out ethoxide, a poor but possible leaving group. Ethoxide, a strong base, then takes the acid's proton, so the products are the carboxylate ion and ethanol. That last step can't reverse, which is why alkaline hydrolysis (saponification) goes to completion while acid hydrolysis is an equilibrium.",
    start: { atoms: [["C", "C", 0, 0], ["O", "O", 0, -1], ["Me", "C", -0.87, 0.5, 0, 3], ["Oe", "O", 0.87, 0.5], ["Ce", "C", 1.73, 0, 0, 2], ["Ce2", "C", 2.6, 0.5, 0, 3], ["Oh", "O", -2.2, -0.9, -1], ["Hh", "H", -2.9, -1.6]],
      bonds: [["C", "O", 2], ["C", "Me"], ["C", "Oe"], ["Oe", "Ce"], ["Ce", "Ce2"], ["Oh", "Hh"]] },
    steps: [
      { arrows: [["lp", "Oh", "C"], ["bond", "C", "O", "O"]], label: "Addition: tetrahedral intermediate", move: { Oh: [-1.0, -0.45], Hh: [-1.7, -1.05] },
        hint: "Which carbon is δ+? What happens to the C=O when hydroxide bonds to it?", explain: "Hydroxide's lone pair bonds to the carbonyl carbon and the C=O π electrons move onto oxygen, giving O⁻. The carbon briefly has four single bonds." },
      { arrows: [["lp", "O", ["O", "C"]], ["bond", "C", "Oe", "Oe"]], label: "Elimination: ethoxide leaves", move: { Oe: [1.4, 1.35], Ce: [2.3, 0.95], Ce2: [3.15, 1.45] },
        hint: "The O⁻ pushes its electrons back down. Which group leaves so carbon doesn't get five bonds?", explain: "A lone pair on O⁻ re-forms the C=O, and the C–O bond to the ethyl group breaks, both electrons going to that oxygen: ethoxide leaves. The product so far is ethanoic acid." },
      { arrows: [["lp", "Oe", "Hh"], ["bond", "Oh", "Hh", "Oh"]], label: "Products: ethanoate ion + ethanol", move: { Hh: [0.75, 1.75] },
        hint: "Ethoxide is a strong base and ethanoic acid is an acid. What happens next?", explain: "Proton transfer: ethoxide takes the acid's H⁺, giving ethanol and the ethanoate ion. The carboxylate can't be attacked by ethanol, so the reaction goes to completion. Acidifying afterwards gives the free carboxylic acid." },
    ],
    outcome: "Ethanoate ion (as sodium ethanoate) and ethanol. Soaps are made this way from fats (triesters) and NaOH.",
    misconceptions: ["An SN2-style step where ethoxide leaves as hydroxide attacks: at a C=O, addition comes first.", "Leaving the products as ethanoic acid and ethoxide (the proton transfer always happens).", "Thinking alkaline hydrolysis is reversible like acid hydrolysis."],
    mistakes: [],
  },
  {
    id: "acyl-ammonia", family: "addition-elimination", title: "Addition–elimination: ammonia + ethanoyl chloride", lessons: ["u14-10", "u14-07"], level: "intermediate",
    conditions: { above: "conc. NH₃", below: "room temperature" }, products: ["C2H5NO", "H4N+", "Cl-"],
    overview: "Ammonia's lone pair adds to the very δ+ carbon of the acyl chloride. The C=O re-forms and chloride leaves; a second ammonia molecule removes H⁺ from the nitrogen. Ammonia gives a primary amide; an amine gives an N-substituted amide.",
    start: { atoms: [["C", "C", 0, 0], ["O", "O", 0, -1], ["Cl", "Cl", 0.87, 0.5], ["Me", "C", -0.87, 0.5, 0, 3], ["N1", "N", 2.4, -0.6, 0, 2], ["Hn", "H", 3.0, -1.4], ["N2", "N", 3.6, 0.7, 0, 3]],
      bonds: [["C", "O", 2], ["C", "Cl"], ["C", "Me"], ["N1", "Hn"]] },
    steps: [
      { arrows: [["lp", "N1", "C"], ["bond", "C", "O", "O"]], label: "Addition: tetrahedral intermediate", move: { N1: [1.0, -0.35], Hn: [1.6, -1.05] },
        hint: "Which atom of ammonia has the lone pair, and which carbon is δ+?", explain: "Nitrogen's lone pair bonds to the carbonyl carbon, and the C=O π electrons move onto oxygen. Nitrogen now has four bonds and a + charge." },
      { arrows: [["lp", "O", ["O", "C"]], ["bond", "C", "Cl", "Cl"]], label: "Elimination: chloride leaves", move: { Cl: [1.6, 1.3] },
        hint: "The C=O re-forms. What leaves?", explain: "A lone pair on O⁻ re-forms the C=O and the C–Cl bond breaks, chloride leaving with both electrons." },
      { arrows: [["lp", "N2", "Hn"], ["bond", "N1", "Hn", "N1"]], label: "Products: ethanamide + NH₄⁺ (+ Cl⁻)", move: { Hn: [2.75, 0.2] },
        hint: "The nitrogen still has a + charge and an extra H. What removes it?", explain: "A second ammonia molecule acts as a base, taking H⁺ from the positive nitrogen: the products are ethanamide and ammonium chloride." },
    ],
    outcome: "Ethanamide. Two moles of ammonia are used per mole of acyl chloride: one to react, one to take the proton.",
    misconceptions: ["Letting chloride leave in the same step that ammonia attacks.", "Forgetting the second ammonia (the product isn't left with N⁺).", "Thinking a nitrile forms (that comes from dehydrating an amide)."],
    mistakes: [],
  },
  {
    id: "grignard", family: "nucleophilic-addition", title: "Grignard addition: CH₃MgBr + propanone", lessons: ["u14-18", "u14-05"], level: "advanced",
    conditions: { above: "CH₃MgBr in dry ether, then H₃O⁺", below: "room temperature" }, products: ["C4H10O", "BrMg+", "H2O"],
    overview: "In a Grignard reagent the C–Mg bond is polarised C^δ−–Mg^δ+, so the carbon behaves as a carbanion. It attacks the δ+ carbonyl carbon, forming a new C–C bond, and the C=O π electrons move onto oxygen. Acid work-up protonates the alkoxide. A ketone gives a tertiary alcohol.",
    start: { atoms: [["C", "C", 0, 0], ["O", "O", 0, -1], ["Me1", "C", -0.87, 0.5, 0, 3], ["Me2", "C", 0.87, 0.5, 0, 3], ["Cg", "C", -2.3, -0.3, 0, 3], ["Mg", "Mg", -3.2, -0.8], ["Br", "Br", -4.1, -1.3], ["Ow", "O", 1.8, -2.3, 1, 2], ["Hw", "H", 1.0, -1.85]],
      bonds: [["C", "O", 2], ["C", "Me1"], ["C", "Me2"], ["Cg", "Mg"], ["Mg", "Br"], ["Ow", "Hw"]] },
    steps: [
      { arrows: [["bond", "Cg", "Mg", ["Cg", "C"]], ["bond", "C", "O", "O"]], label: "Alkoxide (as its magnesium salt)", move: { Cg: [0, 1], Mg: [-1.2, -1.6], Br: [-2.1, -2.1] },
        hint: "Which end of the C–Mg bond is electron-rich? Where can those electrons go?", explain: "The C–Mg bond's electrons form a new bond from the methyl carbon to the carbonyl carbon; the C=O π electrons move onto oxygen. Magnesium is left as MgBr⁺, paired with the alkoxide O⁻." },
      { arrows: [["lp", "O", "Hw"], ["bond", "Hw", "Ow", "Ow"]], label: "Product: 2-methylpropan-2-ol", move: { Hw: [0.75, -1.6], Ow: [1.95, -2.4] },
        hint: "The work-up adds dilute acid. What does the O⁻ do?", explain: "Proton transfer: the alkoxide takes H⁺ from H₃O⁺, giving the tertiary alcohol." },
    ],
    outcome: "2-Methylpropan-2-ol. Grignard reagents make C–C bonds: methanal → primary, other aldehydes → secondary, ketones → tertiary alcohols; esters react twice. Water or any O–H destroys the reagent, so the ether must be dry.",
    misconceptions: ["Treating the Grignard carbon as an electrophile (it's a nucleophile, δ−).", "Adding acid at the start (it would protonate the Grignard to methane).", "Drawing the arrow from Mg rather than from the C–Mg bond."],
    mistakes: [],
  },
  {
    id: "nitronium", family: "aromatic-substitution", title: "Making the electrophile: the nitronium ion (HNO₃ + H₂SO₄)", lessons: ["u13-17"], level: "intermediate",
    conditions: { above: "conc. HNO₃ + conc. H₂SO₄", below: "below 55 °C" }, products: ["NO2+", "H2O", "HO4S-"],
    overview: "Sulfuric acid is the stronger acid, so it protonates nitric acid's –OH. The protonated –OH₂⁺ leaves as water, and a lone pair on the other oxygen forms a second N=O, giving the linear nitronium ion, NO₂⁺, the electrophile that attacks benzene. Overall: HNO₃ + H₂SO₄ → NO₂⁺ + HSO₄⁻ + H₂O.",
    start: { atoms: [["N", "N", 0, 0, 1], ["Od", "O", 0.87, -0.5], ["Om", "O", 0.87, 0.5, -1], ["Oh", "O", -1, 0], ["Hn", "H", -1.5, -0.87], ["S", "S", -3.4, -1.4], ["Os4", "O", -2.5, -1.9], ["Hs", "H", -1.9, -1.6], ["Os1", "O", -3.9, -0.5], ["Os2", "O", -3.9, -2.3], ["Os3", "O", -4.3, -1.6, 0, 1]],
      bonds: [["N", "Od", 2], ["N", "Om"], ["N", "Oh"], ["Oh", "Hn"], ["S", "Os4"], ["Os4", "Hs"], ["S", "Os1", 2], ["S", "Os2", 2], ["S", "Os3"]] },
    steps: [
      { arrows: [["lp", "Oh", "Hs"], ["bond", "Os4", "Hs", "Os4"]], label: "Protonated nitric acid + HSO₄⁻", move: { Hs: [-1.35, 0.75] },
        hint: "Sulfuric acid is the stronger acid. Which oxygen of nitric acid can take its proton?", explain: "A lone pair on nitric acid's –OH oxygen takes H⁺ from sulfuric acid; the O–H bond's electrons stay on the sulfate oxygen, giving HSO₄⁻. Nitric acid is acting as a base here." },
      { arrows: [["bond", "N", "Oh", "Oh"], ["lp", "Om", ["Om", "N"]]], label: "Nitronium ion NO₂⁺ + water", move: { Oh: [-1.8, 0.3], Hn: [-2.3, -0.4], Hs: [-2.2, 1.0], Od: [1, 0], Om: [-1, 0] },
        hint: "–OH₂⁺ is a good leaving group. What leaves, and what stops nitrogen being left with too few bonds?", explain: "The N–O bond breaks and water leaves with both electrons. A lone pair on the O⁻ forms a second N=O, giving the linear ion O=N⁺=O." },
    ],
    outcome: "NO₂⁺, a strong electrophile. Sulfuric acid is a catalyst: the HSO₄⁻ formed here takes the proton back from the ring at the end of nitration.",
    misconceptions: ["Thinking sulfuric acid is protonated by nitric acid (it's the other way round).", "Drawing NO₂⁺ bent: it is linear, with two N=O bonds.", "Calling H₂SO₄ a dehydrating agent only: here it's the acid that makes the electrophile."],
    mistakes: [],
  },
  {
    id: "bromination", family: "aromatic-substitution", title: "Halogenation: bromine + benzene (FeBr₃ catalyst)", lessons: ["u13-17", "u14-17"], level: "intermediate",
    conditions: { above: "Br₂, FeBr₃ (or iron filings)", below: "room temperature, dry" }, products: ["C6H5Br", "HBr", "Br3Fe"],
    overview: "Iron(III) bromide, made from iron and bromine, is the halogen carrier: it accepts a lone pair from one bromine and pulls the Br–Br electrons over, releasing a Br⁺ electrophile. The ring attacks it, then loses H⁺ to FeBr₄⁻, regenerating FeBr₃ and making HBr. The same pattern as chlorination with AlCl₃.",
    start: { atoms: [["R1", "C", 0, -1], ["R2", "C", 0.87, -0.5, 0, 1], ["R3", "C", 0.87, 0.5, 0, 1], ["R4", "C", 0, 1, 0, 1], ["R5", "C", -0.87, 0.5, 0, 1], ["R6", "C", -0.87, -0.5, 0, 1], ["Hx", "H", -0.6, -1.85], ["Bra", "Br", 0.6, -2.6], ["Brb", "Br", -0.4, -2.95], ["Fe", "Fe", -1.4, -3.45], ["B1", "Br", -2.35, -3.0], ["B2", "Br", -1.5, -4.45], ["B3", "Br", -0.55, -4.05]],
      bonds: [["R1", "R2", 2], ["R2", "R3"], ["R3", "R4", 2], ["R4", "R5"], ["R5", "R6", 2], ["R6", "R1"], ["R1", "Hx"], ["Bra", "Brb"], ["Fe", "B1"], ["Fe", "B2"], ["Fe", "B3"]] },
    steps: [
      { arrows: [["lp", "Brb", "Fe"], ["bond", "Bra", "Brb", "Brb"]], label: "Making the electrophile: Br⁺ and FeBr₄⁻", move: { Bra: [0.75, -2.35] },
        hint: "FeBr₃ is a Lewis acid. What can a bromine give it, and what happens to the Br–Br bond?", explain: "A lone pair on one bromine bonds to iron. That bromine keeps the Br–Br bond's electrons, so the other bromine is left as Br⁺." },
      { arrows: [["bond", "R1", "R2", ["R1", "Bra"]]], label: "Intermediate: the ring has lost its aromaticity", move: { Bra: [0.55, -1.85] },
        hint: "Which electrons in benzene attack Br⁺?", explain: "Two of the ring's π electrons form the C–Br bond. The positive charge is delocalised over the other five ring carbons." },
      { arrows: [["bond", "Brb", "Fe", ["Brb", "Hx"]], ["bond", "R1", "Hx", ["R1", "R2"]]], label: "Products: bromobenzene + HBr, FeBr₃ regenerated", move: { Hx: [-0.5, -2.05] },
        hint: "How does the ring get its aromaticity back?", explain: "An Fe–Br bond's electrons form H–Br as the C–H bond's electrons return to the ring. FeBr₃ is regenerated." },
    ],
    outcome: "Bromobenzene. Without the catalyst benzene doesn't react with bromine at all (unlike alkenes and phenol).",
    misconceptions: ["Leaving out the halogen carrier.", "Drawing addition across a ring C=C.", "Forgetting HBr as a product."],
    mistakes: [],
  },
  {
    id: "hbr-propyne", family: "electrophilic-addition", title: "Electrophilic addition: HBr + propyne", lessons: ["u13-15", "u12-06"], level: "advanced",
    conditions: { above: "HBr (one equivalent)", below: "room temperature" }, products: ["C3H5Br"],
    overview: "A C≡C adds HBr like a C=C, through a carbocation, but the cation is a vinyl cation (its + carbon is part of a C=C), which is less stable, so alkynes react more slowly than alkenes. Markovnikov's rule still applies: H goes to the terminal carbon. A second HBr adds the same way, giving 2,2-dibromopropane.",
    start: { atoms: [["C1", "C", 0, 0, 0, 1], ["C2", "C", 1, 0], ["C3", "C", 2, 0, 0, 3], ["H", "H", -0.4, -1.4], ["Br", "Br", -0.4, -2.4]], bonds: [["C1", "C2", 3], ["C2", "C3"], ["H", "Br"]] },
    steps: [
      { arrows: [["bond", "C1", "C2", ["C1", "H"]], ["bond", "H", "Br", "Br"]], label: "Vinyl cation + bromide", move: { H: [-0.5, -0.87], Br: [1.4, -1.5] },
        hint: "Which carbon of the C≡C should the H go to, so that the more stable cation forms?", explain: "Two of the triple bond's π electrons bond to the δ+ hydrogen of HBr, which loses bromide. H goes to the CH end, leaving the positive charge on the carbon with the methyl group." },
      { arrows: [["lp", "Br", "C2"]], label: "Product: 2-bromopropene", move: { Br: [1.0, -1.0] },
        hint: "What does the bromide do?", explain: "Bromide's lone pair bonds to the cation, giving 2-bromopropene. With excess HBr this adds again (Markovnikov), giving 2,2-dibromopropane." },
    ],
    outcome: "2-Bromopropene after one equivalent; 2,2-dibromopropane (a geminal dibromide) with excess HBr.",
    misconceptions: ["Putting H on the middle carbon (gives a primary vinyl cation).", "Thinking alkynes are more reactive than alkenes because they have more π electrons.", "Adding both H and Br to the same carbon in one step."],
    mistakes: [],
  },
  {
    id: "ester-acid", family: "addition-elimination", title: "Acid hydrolysis: water + ethyl ethanoate (H₃O⁺ catalyst)", lessons: ["u14-09", "u13-22"], level: "advanced",
    conditions: { above: "dilute H₂SO₄(aq)", below: "heat under reflux" }, products: ["C2H4O2", "C2H6O", "H3O+"],
    overview: "With acid the carbonyl oxygen is protonated first, which makes the carbonyl carbon much more δ+, so even water (a weak nucleophile) adds. A proton transfer turns the ethoxy group into a good leaving group (ethanol), which leaves as the C=O re-forms, and the acid catalyst is returned. Every step is reversible: this is exactly esterification run backwards.",
    start: { atoms: [["C", "C", 0, 0], ["O", "O", 0, -1], ["Me", "C", -0.87, 0.5, 0, 3], ["Oe", "O", 0.87, 0.5], ["Ce", "C", 1.73, 0, 0, 2], ["Ce2", "C", 2.6, 0.5, 0, 3], ["Oa", "O", 0.9, -2.6, 1, 2], ["Ha", "H", 0.45, -1.85], ["Ow", "O", -2.3, -0.6, 0, 1], ["Hw", "H", -2.9, -1.3]],
      bonds: [["C", "O", 2], ["C", "Me"], ["C", "Oe"], ["Oe", "Ce"], ["Ce", "Ce2"], ["Oa", "Ha"], ["Ow", "Hw"]] },
    steps: [
      { arrows: [["lp", "O", "Ha"], ["bond", "Ha", "Oa", "Oa"]], label: "Protonated ester", move: { Ha: [0.6, -1.55], Oa: [1.3, -2.7] },
        hint: "Water is a weak nucleophile. How does the acid make the carbonyl carbon more attractive to it?", explain: "A lone pair on the carbonyl oxygen takes H⁺ from H₃O⁺. The positive charge makes the carbonyl carbon strongly δ+." },
      { arrows: [["lp", "Ow", "C"], ["bond", "C", "O", "O"]], label: "Water adds: tetrahedral intermediate", move: { Ow: [-1.0, -0.45], Hw: [-1.6, -1.05] },
        hint: "Which molecule can now attack the carbonyl carbon?", explain: "A lone pair on water bonds to the carbonyl carbon and the C=O π electrons move onto the (protonated) oxygen, which becomes neutral –OH." },
      { arrows: [["lp", "Oe", "Hw"], ["bond", "Ow", "Hw", "Ow"]], label: "Proton transfer: ethoxy oxygen protonated", move: { Hw: [1.3, 1.1] },
        hint: "Ethoxide is a poor leaving group, but ethanol is a good one. Where should a proton go?", explain: "A proton moves from the water-derived oxygen to the ethoxy oxygen (in practice via solvent molecules). The ethoxy group can now leave as neutral ethanol." },
      { arrows: [["lp", "O", ["O", "C"]], ["bond", "C", "Oe", "Oe"]], label: "Ethanol leaves", move: { Oe: [1.45, 1.35], Ce: [2.35, 0.95], Ce2: [3.2, 1.45], Hw: [1.1, 2.1] },
        hint: "The –OH on carbon can push electrons back down. What leaves?", explain: "A lone pair re-forms the C=O (protonated), and the C–O bond to the ethyl group breaks: ethanol leaves." },
      { arrows: [["lp", "Oa", "Ha"], ["bond", "O", "Ha", "O"]], label: "Products: ethanoic acid + ethanol, H₃O⁺ regenerated", move: { Ha: [0.95, -1.95] },
        hint: "The carbonyl oxygen still carries an extra proton. What takes it?", explain: "Water takes the proton back, giving ethanoic acid and regenerating H₃O⁺, so the acid is a catalyst." },
    ],
    outcome: "Ethanoic acid and ethanol, at equilibrium. A large excess of water pushes the equilibrium towards hydrolysis; alkaline hydrolysis goes to completion instead.",
    misconceptions: ["Letting water attack the unprotonated ester in acid (it does, slowly; protonation is what makes it fast).", "Ethoxide leaving in acid: it leaves as neutral ethanol after protonation.", "Forgetting the catalyst is regenerated."],
    mistakes: [],
  },
  {
    id: "radical-chlorination", family: "radical", title: "Free-radical substitution: chlorine + methane", lessons: ["u13-06", "u13-03"], level: "foundation",
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

/** The kind of each arrow in a step (what it does, not which atoms): for error-carried-forward marking. */
export function arrowKinds(s, arrows) {
  return arrows.map((a) => { const n = normalize(s, a); if (n.error) return "bad"; const src = n.src.atom != null ? "lp" : "bond", dst = n.dst.atom != null ? "atom" : bondBetween(s, ...n.dst.pair) ? "pi" : "new"; return `${n.e}${src}>${dst}`; }).sort();
}

/**
 * "Spot the error": one arrow of a library step changed into a common wrong one, checked by the engine to really be
 * wrong. Returns { arrows, wrong, kind, why } or null when no change of that step can be confirmed as an error.
 */
export function faultyStep(inst, k, seed = 0) {
  const states = replay({ start: inst.start, steps: inst.steps }).states, s = states[k], st = inst.steps[k];
  if (!s || !st) return null;
  const good = applyStep(s, st.arrows).state, out = [], n0 = (a) => normalize(s, a);
  st.arrows.forEach((a, i) => {
    const swap = (b, kind) => { const arrows = st.arrows.map((x, j) => (j === i ? b : x)); out.push({ arrows, wrong: i, kind }); };
    if (a.from.lp != null) swap({ ...a, from: { atom: a.from.lp } }, "from-atom");
    const n = normalize(s, a);
    if (!n.error && n.src.bond && n.dst.atom != null) { const otherEnd = n.src.bond.find((x) => x !== n.dst.atom); swap({ ...a, to: { atom: otherEnd } }, "wrong-end"); }
    if (a.type === "single") swap({ ...a, type: "pair" }, "full-arrow");
    if (!n.error && n.src.atom != null && n.dst.pair) { const tgt = n.dst.pair.find((x) => x !== n.src.atom), nb = s.bonds.filter((b) => b.a === tgt || b.b === tgt).map((b) => (b.a === tgt ? b.b : b.a)).filter((x) => x !== n.src.atom && atomOf(s, x).el !== "H").sort((x, y) => (atomOf(s, y).el === "C") - (atomOf(s, x).el === "C")); if (nb.length) swap({ ...a, to: { atom: nb[0] } }, "wrong-target"); }
  });
  const confirmed = out.map((f) => {
    const r = applyStep(s, f.arrows);
    if (r.ok && sameState(r.state, good)) return null;
    const engine = r.ok ? "" : r.errors.find((e) => e.arrow === f.wrong)?.text || r.errors[0].text;
    if (f.kind === "wrong-end" && n0(st.arrows[f.wrong]).e === 1) { const n = n0(st.arrows[f.wrong]), to = n.src.bond.find((x) => x !== n.dst.atom); return { ...f, why: `This fishhook sends its electron to ${atomLabel(s, to)}, so both electrons of the bond end up on ${atomLabel(s, to)}: that would be heterolysis, making ions. In homolytic fission one electron goes to each atom.` }; }
    if (f.kind === "wrong-end") { const n = normalize(s, st.arrows[f.wrong]), to = n.src.bond.find((x) => x !== n.dst.atom); return { ...f, why: `This arrow sends both electrons of the ${atomLabel(s, n.src.bond[0])}–${atomLabel(s, n.src.bond[1])} bond to ${atomLabel(s, to)}. In this step they go to ${atomLabel(s, n.dst.atom)}${EN(atomOf(s, n.dst.atom).el) > EN(atomOf(s, to).el) ? ", the more electronegative atom" : ""}.${engine ? ` As drawn: ${engine}` : ""}` }; }
    return { ...f, why: engine || "Every arrow is possible on its own, but this one gives a different intermediate from the real mechanism." };
  }).filter(Boolean);
  return confirmed.length ? confirmed[seed % confirmed.length] : null;
}
