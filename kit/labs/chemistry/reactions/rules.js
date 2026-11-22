// The evidence behind every Reaction mode rule (predictor.js): what it needs, what it gives, its selectivity, what
// it does not cover, the sources it follows and how far it has been checked. predict() attaches the record to each
// result, so an explanation (or a future AI tutor) can quote the rule actually applied instead of inventing one.
// No DOM. Every rule is "provisional" until an independent chemist has reviewed it (docs/organic-review/README.md);
// source pointers name the topic and are themselves marked unchecked until that review confirms them.
//   RULES[reagentId] = { reactants, products, selectivity, limitations: [], sources: [{ id, topic }], confidence }

import { REVIEWS } from "./reviews.js";

export const CONFIDENCE = {
  provisional: "Written from standard textbook chemistry and tested against the lab's reference set; not yet reviewed by an independent chemist.",
  reviewed: "Checked by an independent chemist; minor corrections possible.",
  validated: "Reviewed, with every reference case confirmed against a cited source.",
  disputed: "An independent reviewer disagreed with at least one of this rule's cases; treat its predictions as uncertain until it is fixed.",
};
export const SOURCES = {
  aqa: "AQA A-level Chemistry (7405) specification, 3.3 Organic chemistry",
  ocr: "OCR A-level Chemistry A (H432) specification, modules 4 and 6",
  clayden: "Clayden, Greeves and Warren, Organic Chemistry, 2nd edn (Oxford University Press, 2012)",
  march: "Smith, March's Advanced Organic Chemistry, 8th edn (Wiley, 2019)",
};
const P = "provisional";
const s = (...pairs) => pairs.map(([id, topic]) => ({ id, topic, checked: false }));

export const RULES = {
  "h2-ni": { reactants: "alkenes, alkynes", products: "alkanes (all C=C and C≡C reduced)", selectivity: "syn addition from the metal surface; C=O and benzene rings untouched under these conditions",
    limitations: ["Doesn't model partial hydrogenation of dienes or hydrogenation of C=O at high pressure."], sources: s(["aqa", "3.3.4 Alkenes"], ["clayden", "hydrogenation of alkenes"]), confidence: P },
  lindlar: { reactants: "alkynes", products: "Z-alkenes", selectivity: "syn addition; stops at the alkene", limitations: ["Terminal alkynes can over-reduce in practice."], sources: s(["clayden", "reduction of alkynes"]), confidence: P },
  br2: { reactants: "alkenes, alkynes (excess Br₂); phenol and phenylamine (ring substitution)", products: "1,2-dibromides; tetrabromides from alkynes; 2,4,6-tribromo arenes", selectivity: "anti addition (via a bromonium ion)",
    limitations: ["Bromine water with an alkene also gives the bromohydrin; the lab shows the dibromide.", "Other activated rings (e.g. methoxybenzene) are declined."], sources: s(["aqa", "3.3.4 Alkenes"], ["aqa", "3.3.10 Aromatic chemistry"], ["clayden", "electrophilic addition to alkenes"]), confidence: P },
  hbr: { reactants: "alkenes, alkynes", products: "bromoalkanes; geminal dibromides from alkynes (excess HBr)", selectivity: "Markovnikov, by carbocation class; benzylic cations favoured",
    limitations: ["No carbocation rearrangements.", "No anti-Markovnikov (peroxide) addition.", "C=C conjugated with C=O is declined (conjugate addition)."], sources: s(["aqa", "3.3.4 Alkenes"], ["clayden", "electrophilic addition to alkenes"]), confidence: P },
  steam: { reactants: "alkenes", products: "alcohols", selectivity: "Markovnikov", limitations: ["No rearrangements.", "Alkynes need HgSO₄ catalysis instead."], sources: s(["aqa", "3.3.5 Alcohols"]), confidence: P },
  "hg-hydration": { reactants: "alkynes", products: "ketones (ethanal from ethyne)", selectivity: "Markovnikov, via the enol (keto–enol tautomerism)", limitations: ["Internal unsymmetrical alkynes give both ketones."], sources: s(["clayden", "hydration of alkynes"]), confidence: P },
  "kmno4-cold": { reactants: "alkenes", products: "1,2-diols", selectivity: "syn addition", limitations: ["Over-oxidation in practice is not modelled."], sources: s(["clayden", "dihydroxylation of alkenes"]), confidence: P },
  "kmno4-hot": { reactants: "alkenes", products: "ketones, carboxylic acids, CO₂", selectivity: "=CR₂ → ketone, =CHR → acid, =CH₂ → CO₂", limitations: ["Side-chain oxidation of alkylbenzenes is not modelled."], sources: s(["clayden", "oxidative cleavage of alkenes"]), confidence: P },
  ozone: { reactants: "alkenes", products: "aldehydes and ketones", selectivity: "reductive (Zn) work-up stops at C=O", limitations: ["Oxidative work-up (H₂O₂) is not offered."], sources: s(["clayden", "ozonolysis"]), confidence: P },
  "naoh-aq": { reactants: "halogenoalkanes; carboxylic acids; esters, anhydrides, amides, nitriles, acyl chlorides", products: "alcohols (with competing alkenes); carboxylate salts; alcohols and amines released", selectivity: "substitution/elimination from competition.js; hydrolysis goes to completion (carboxylate)",
    limitations: ["Declines molecules with both a halogen and a C=O.", "Declines aldol reactions of aldehydes and ketones with α-H.", "Aryl and vinyl halides don't react."], sources: s(["aqa", "3.3.3 Halogenoalkanes"], ["aqa", "3.3.9 Carboxylic acids and derivatives"], ["clayden", "nucleophilic substitution at saturated carbon"]), confidence: P },
  "koh-eth": { reactants: "halogenoalkanes", products: "alkenes and substitution products", selectivity: "competition.js: E2 major for 2°/3°, SN2 still major for 1°; Zaitsev for the alkene", limitations: ["Scores rank pathways; they are not yields.", "One halogen per molecule."], sources: s(["aqa", "3.3.3 Halogenoalkanes"], ["clayden", "elimination reactions"]), confidence: P },
  tbuok: { reactants: "halogenoalkanes", products: "alkenes (ethers from methyl halides)", selectivity: "E2 with Hofmann orientation (less substituted alkene)", limitations: ["Solvent fixed as the alcohol."], sources: s(["clayden", "elimination reactions"], ["march", "orientation of elimination"]), confidence: P },
  kcn: { reactants: "halogenoalkanes", products: "nitriles (one more carbon)", selectivity: "SN2 for 1°/2°; tertiary mainly eliminates", limitations: ["Isonitrile formation is not modelled."], sources: s(["aqa", "3.3.3 Halogenoalkanes"]), confidence: P },
  water: { reactants: "acyl chlorides, anhydrides; tertiary halogenoalkanes (slow)", products: "carboxylic acids; alcohols", selectivity: "addition–elimination; SN1 for tertiary", limitations: ["Primary halides: no significant reaction is predicted."], sources: s(["aqa", "3.3.9 Carboxylic acids and derivatives"]), confidence: P },
  nh3: { reactants: "primary and secondary halogenoalkanes", products: "primary amines", selectivity: "excess ammonia limits further substitution", limitations: ["Tertiary halides are declined (elimination)."], sources: s(["aqa", "3.3.11 Amines"]), confidence: P },
  "nh3-cold": { reactants: "acyl chlorides, anhydrides", products: "primary amides", selectivity: "addition–elimination", limitations: ["Amines (to N-substituted amides) are not offered as reagents."], sources: s(["aqa", "3.3.9 Carboxylic acids and derivatives"]), confidence: P },
  "ethanol-rt": { reactants: "acyl chlorides, anhydrides", products: "ethyl esters", selectivity: "addition–elimination, irreversible", limitations: [], sources: s(["aqa", "3.3.9 Carboxylic acids and derivatives"]), confidence: P },
  "cr-distil": { reactants: "primary and secondary alcohols", products: "aldehydes; ketones", selectivity: "distillation stops primary alcohols at the aldehyde", limitations: ["Methanol's further oxidation is not modelled."], sources: s(["aqa", "3.3.5 Alcohols"]), confidence: P },
  "cr-reflux": { reactants: "primary and secondary alcohols, aldehydes", products: "carboxylic acids; ketones", selectivity: "tertiary alcohols unchanged", limitations: ["C=C bonds are assumed untouched."], sources: s(["aqa", "3.3.5 Alcohols"]), confidence: P },
  tollens: { reactants: "aldehydes", products: "carboxylate ions (silver mirror)", selectivity: "ketones don't react", limitations: ["Methanoic acid and α-hydroxy ketones (which also react) are not modelled."], sources: s(["aqa", "3.3.8 Aldehydes and ketones"]), confidence: P },
  nabh4: { reactants: "aldehydes, ketones, acyl chlorides", products: "primary and secondary alcohols", selectivity: "chemoselective: acids, esters, amides and C=C untouched; racemic at a new stereocentre", limitations: ["Conjugate (1,4) reduction of enones is not modelled."], sources: s(["aqa", "3.3.8 Aldehydes and ketones"], ["clayden", "chemoselectivity"]), confidence: P },
  lialh4: { reactants: "aldehydes, ketones, acids, esters, amides, acyl chlorides, nitriles", products: "alcohols; amines from amides and nitriles", selectivity: "reduces all these C=O and C≡N groups", limitations: ["Doesn't model partial reduction (e.g. DIBAL)."], sources: s(["clayden", "reduction of carbonyl groups"]), confidence: P },
  hcn: { reactants: "aldehydes, ketones", products: "hydroxynitriles (one more carbon)", selectivity: "racemic at a new stereocentre", limitations: [], sources: s(["aqa", "3.3.8 Aldehydes and ketones"]), confidence: P },
  grignard: { reactants: "aldehydes, ketones, esters", products: "secondary/tertiary alcohols (primary from methanal); esters add twice", selectivity: "destroyed by O–H groups", limitations: ["Only CH₃MgBr is offered.", "CO₂ and epoxides as electrophiles are not offered."], sources: s(["clayden", "organometallic reagents"]), confidence: P },
  h3po4: { reactants: "alcohols", products: "alkenes", selectivity: "Zaitsev; E1 for 2°/3°, E2 for 1°", limitations: ["No carbocation rearrangements.", "One –OH per molecule."], sources: s(["aqa", "3.3.5 Alcohols"]), confidence: P },
  esterify: { reactants: "carboxylic acids", products: "ethyl esters", selectivity: "reversible (equilibrium)", limitations: ["Only ethanol is offered as the alcohol."], sources: s(["aqa", "3.3.9 Carboxylic acids and derivatives"]), confidence: P },
  "ethanoic-h2so4": { reactants: "alcohols", products: "ethanoate esters", selectivity: "reversible; tertiary alcohols poor", limitations: [], sources: s(["aqa", "3.3.9 Carboxylic acids and derivatives"]), confidence: P },
  socl2: { reactants: "carboxylic acids, alcohols", products: "acyl chlorides; chloroalkanes", selectivity: "–OH replaced by –Cl", limitations: ["Stereochemistry at the alcohol carbon is not tracked."], sources: s(["clayden", "making acyl chlorides"]), confidence: P },
  "acid-hydrolysis": { reactants: "esters, anhydrides, amides, nitriles, acyl chlorides", products: "carboxylic acids, alcohols, ammonium ions", selectivity: "ester hydrolysis reversible", limitations: [], sources: s(["aqa", "3.3.9 Carboxylic acids and derivatives"]), confidence: P },
  "br2-uv": { reactants: "alkanes and cycloalkanes", products: "monobromoalkanes", selectivity: "bromine's radical selectivity: tertiary > secondary > primary C–H", limitations: ["Ratios are qualitative; polybromination is mentioned, not drawn.", "Molecules with other groups are declined."], sources: s(["aqa", "3.3.2 Alkanes"], ["clayden", "radical reactions"]), confidence: P },
  nitration: { reactants: "benzene rings (one ring)", products: "nitroarenes", selectivity: "directing effects: strongest activator controls; hindered positions avoided", limitations: ["Phenylamine is declined (oxidation, anilinium ion).", "Isomer ratios are qualitative."], sources: s(["aqa", "3.3.10 Aromatic chemistry"], ["clayden", "electrophilic aromatic substitution"]), confidence: P },
  "cl2-alcl3": { reactants: "benzene rings", products: "chloroarenes", selectivity: "directing effects", limitations: ["Phenylamine declined."], sources: s(["clayden", "electrophilic aromatic substitution"]), confidence: P },
  "br2-febr3": { reactants: "benzene rings", products: "bromoarenes", selectivity: "directing effects", limitations: ["Phenylamine declined."], sources: s(["clayden", "electrophilic aromatic substitution"]), confidence: P },
  "fc-alkyl": { reactants: "benzene rings (not deactivated, not –NH₂ or –OH)", products: "methylarenes", selectivity: "directing effects; polyalkylation noted", limitations: ["Only CH₃Cl is offered, so rearrangement doesn't arise."], sources: s(["clayden", "Friedel–Crafts reactions"]), confidence: P },
  "fc-acyl": { reactants: "benzene rings (not deactivated, not –NH₂ or –OH)", products: "aryl ketones", selectivity: "para favoured for the bulky acylium ion", limitations: ["Only ethanoyl chloride is offered."], sources: s(["aqa", "3.3.10 Aromatic chemistry"], ["clayden", "Friedel–Crafts reactions"]), confidence: P },
};
/** The record for a reagent, with its reagent and conditions. */
export function ruleFor(reagent) {
  const r = RULES[reagent.id]; if (!r) return null;
  // a reviewer's "disagree" on any reference case for this reagent marks the rule disputed, with the notes
  const disputes = Object.entries(REVIEWS).filter(([id, v]) => id.endsWith(`|${reagent.id}`) && v.verdict === "disagree").map(([id, v]) => ({ case: id.split("|")[0], correction: v.correction || "", note: v.note || "" }));
  return { reagent: reagent.label, conditions: reagent.cond, level: reagent.level, mechanism: reagent.mechanism || null, ...r, ...(disputes.length ? { confidence: "disputed", disputes } : {}) };
}
