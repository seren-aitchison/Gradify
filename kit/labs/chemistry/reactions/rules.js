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
    limitations: ["No carbocation rearrangements.", "No anti-Markovnikov (peroxide) addition.", "C=C conjugated with C=O is declined (conjugate addition).", "A C=C whose benzylic carbon is less substituted than the other end (benzylic against a more substituted cation) is declined.", "Molecules with both a C=C and a C≡C are declined.", "An internal C≡C with equally substituted carbons gives both geminal dibromides; several such C≡C are declined."], sources: s(["aqa", "3.3.4 Alkenes"], ["clayden", "electrophilic addition to alkenes"]), confidence: P },
  steam: { reactants: "alkenes", products: "alcohols", selectivity: "Markovnikov", limitations: ["No rearrangements.", "Alkynes need HgSO₄ catalysis instead."], sources: s(["aqa", "3.3.5 Alcohols"]), confidence: P },
  "hg-hydration": { reactants: "alkynes", products: "ketones (ethanal from ethyne)", selectivity: "Markovnikov, via the enol (keto–enol tautomerism)", limitations: ["Internal unsymmetrical alkynes give both ketones.", "Several such C≡C in one molecule are declined."], sources: s(["clayden", "hydration of alkynes"]), confidence: P },
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
  nitration: { reactants: "benzene rings (one ring)", products: "nitroarenes", selectivity: "directing effects: strongest activator controls; hindered positions avoided", limitations: ["Phenylamine is declined (oxidation, anilinium ion).", "Isomer ratios are qualitative.", "Heteroaromatic rings such as pyridine are declined."], sources: s(["aqa", "3.3.10 Aromatic chemistry"], ["clayden", "electrophilic aromatic substitution"]), confidence: P },
  "cl2-alcl3": { reactants: "benzene rings", products: "chloroarenes", selectivity: "directing effects", limitations: ["Phenylamine declined.", "Heteroaromatic rings such as pyridine are declined."], sources: s(["clayden", "electrophilic aromatic substitution"]), confidence: P },
  "br2-febr3": { reactants: "benzene rings", products: "bromoarenes", selectivity: "directing effects", limitations: ["Phenylamine declined.", "Heteroaromatic rings such as pyridine are declined."], sources: s(["clayden", "electrophilic aromatic substitution"]), confidence: P },
  "fc-alkyl": { reactants: "benzene rings (not deactivated, not –NH₂ or –OH)", products: "methylarenes", selectivity: "directing effects; polyalkylation noted", limitations: ["Only CH₃Cl is offered, so rearrangement doesn't arise.", "Heteroaromatic rings such as pyridine are declined."], sources: s(["clayden", "Friedel–Crafts reactions"]), confidence: P },
  "fc-acyl": { reactants: "benzene rings (not deactivated, not –NH₂ or –OH)", products: "aryl ketones", selectivity: "para favoured for the bulky acylium ion", limitations: ["Only ethanoyl chloride is offered.", "Heteroaromatic rings such as pyridine are declined."], sources: s(["aqa", "3.3.10 Aromatic chemistry"], ["clayden", "Friedel–Crafts reactions"]), confidence: P },
};
/** The record for a reagent, with its reagent and conditions. */
export function ruleFor(reagent) {
  const r = RULES[reagent.id]; if (!r) return null;
  // a reviewer's "disagree" on any reference case for this reagent marks the rule disputed, with the notes
  const disputes = Object.entries(REVIEWS).filter(([id, v]) => id.endsWith(`|${reagent.id}`) && v.verdict === "disagree").map(([id, v]) => ({ case: id.split("|")[0], correction: v.correction || "", note: v.note || "" }));
  return { reagent: reagent.label, conditions: reagent.cond, level: reagent.level, mechanism: reagent.mechanism || null, ...r, ...(disputes.length ? { confidence: "disputed", disputes } : {}) };
}

// ---------- coverage: what each rule can vouch for ----------
// The features of a molecule (predictor.js features()) and, for each reagent, which ones its rule HANDLES (it decides
// what they do, including "nothing") and which are KNOWN INERT under its conditions. The predictor may only say "no
// reaction" when every feature of the molecule is handled or inert, and may only predict products when nothing is left
// over; otherwise it reports the case as unsupported and names what it couldn't account for. Inert lists are
// deliberately conservative: a feature is listed only when it is standard that it doesn't react under these conditions.
export const FEATURE_NAMES = {
  benzylic: "an alkyl side chain on a benzene ring (a benzylic C–H)", strained: "a three- or four-membered ring", alkene: "a C=C", alkyne: "a C≡C",
  arene: "a benzene ring", haloalkyl: "a halogenoalkane C–X", haloaryl: "a halogen on a ring or C=C carbon", fluoro: "a C–F bond",
  alc1: "a primary alcohol", alc2: "a secondary alcohol", alc3: "a tertiary alcohol", alcX: "another kind of –OH group", phenol: "a phenol –OH",
  ether: "an ether", aldehyde: "an aldehyde", ketone: "a ketone", acid: "a carboxylic acid", methanoic: "a H–C(=O)–O group (methanoic acid or a methanoate)",
  carboxylate: "a carboxylate ion", ester: "an ester", anhydride: "an acid anhydride", amide: "an amide", acylhalide: "an acyl chloride",
  carbonylX: "another kind of C=O group", nitrile: "a nitrile", amine: "an amine", arylamine: "an –NH₂ on a benzene ring", nitro: "a nitro group",
  sulfur: "a sulfur-containing group", other: "an element or ion the lab's rules don't cover",
};
const A = ["alc1", "alc2", "alc3"];
const HC = ["arene", "benzylic", "ether", "fluoro"]; // hydrocarbon parts and ethers, inert to most of these reagents
export const COVERAGE = {
  "h2-ni": { handles: ["alkene", "alkyne"], inert: [...HC, ...A, "alcX", "phenol", "acid", "carboxylate", "ester", "amide", "amine", "arylamine", "haloaryl"] },
  lindlar: { handles: ["alkyne"], inert: [...HC, ...A, "alcX", "alkene", "phenol", "acid", "carboxylate", "ester", "amide", "amine", "arylamine", "haloaryl", "aldehyde", "ketone"] },
  br2: { handles: ["alkene", "alkyne", "arene", "phenol", "arylamine"], inert: ["benzylic", "ether", "fluoro", ...A, "alcX", "acid", "carboxylate", "ester", "amide", "haloalkyl", "haloaryl", "nitro", "nitrile"] },
  hbr: { handles: ["alkene", "alkyne"], inert: [...HC, "phenol", "haloalkyl", "haloaryl", "acid", "ester", "amide", "nitro", "nitrile", "ketone"] },
  steam: { handles: ["alkene"], inert: [...HC, ...A, "phenol", "haloaryl", "acid", "ketone"] },
  "hg-hydration": { handles: ["alkyne"], inert: [...HC, ...A, "ketone", "acid", "ester", "haloaryl"] },
  "kmno4-cold": { handles: ["alkene"], inert: [...HC, "alc3", "acid", "carboxylate", "ester", "ketone", "nitro", "haloaryl", "haloalkyl", "amide", "nitrile"] },
  "kmno4-hot": { handles: ["alkene", "arene", "benzylic"], inert: ["fluoro", "alc3", "ketone", "acid", "carboxylate", "nitro", "haloaryl"] },
  ozone: { handles: ["alkene"], inert: [...HC, ...A, "acid", "carboxylate", "ester", "ketone", "aldehyde", "haloalkyl", "haloaryl", "nitro", "amide", "nitrile"] },
  "naoh-aq": { handles: ["haloalkyl", "ester", "methanoic", "anhydride", "amide", "nitrile", "acylhalide", "acid", "phenol"], inert: [...HC, ...A, "alcX", "alkene", "alkyne", "carboxylate", "nitro", "amine", "arylamine", "haloaryl", "strained"] },
  "koh-eth": { handles: ["haloalkyl"], inert: [...HC, ...A, "alcX", "alkene", "alkyne", "nitro", "haloaryl", "amine", "arylamine", "strained", "carboxylate"] },
  tbuok: { handles: ["haloalkyl"], inert: [...HC, ...A, "alcX", "alkene", "alkyne", "nitro", "haloaryl", "amine", "arylamine", "strained", "carboxylate"] },
  kcn: { handles: ["haloalkyl"], inert: [...HC, ...A, "alcX", "alkene", "alkyne", "haloaryl", "nitro", "nitrile", "amide", "amine", "arylamine", "strained", "carboxylate"] },
  water: { handles: ["acylhalide", "anhydride", "haloalkyl"], inert: [...HC, ...A, "alcX", "alkene", "alkyne", "phenol", "ketone", "aldehyde", "acid", "carboxylate", "ester", "amide", "nitrile", "nitro", "haloaryl", "strained", "amine", "arylamine"] },
  nh3: { handles: ["haloalkyl", "acylhalide"], inert: [...HC, ...A, "alkene", "alkyne", "nitro", "nitrile", "haloaryl", "strained", "amine", "arylamine"] },
  "nh3-cold": { handles: ["acylhalide", "anhydride", "haloalkyl"], inert: [...HC, ...A, "alcX", "alkene", "alkyne", "ester", "nitro", "nitrile", "amide", "haloaryl", "strained", "amine", "arylamine", "carboxylate"] },
  "ethanol-rt": { handles: ["acylhalide", "anhydride"], inert: [...HC, ...A, "alcX", "alkene", "alkyne", "ketone", "aldehyde", "acid", "carboxylate", "ester", "amide", "nitrile", "nitro", "haloaryl", "strained", "phenol"] },
  "cr-distil": { handles: [...A, "aldehyde"], inert: [...HC, "ketone", "acid", "ester", "amide", "nitrile", "nitro", "haloalkyl", "haloaryl", "carboxylate", "strained"] },
  "cr-reflux": { handles: [...A, "aldehyde"], inert: [...HC, "ketone", "acid", "ester", "amide", "nitrile", "nitro", "haloalkyl", "haloaryl", "carboxylate", "strained"] },
  tollens: { handles: ["aldehyde", "ketone", "methanoic"], inert: [...HC, ...A, "alcX", "alkene", "acid", "carboxylate", "ester", "amide", "nitrile", "nitro", "haloaryl", "amine", "strained"] },
  nabh4: { handles: ["aldehyde", "ketone", "acylhalide", "acid", "ester", "amide"], inert: [...HC, ...A, "alcX", "phenol", "alkene", "alkyne", "nitrile", "nitro", "haloalkyl", "haloaryl", "carboxylate", "amine", "arylamine", "strained"] },
  lialh4: { handles: ["aldehyde", "ketone", "acid", "ester", "amide", "acylhalide", "nitrile"], inert: [...HC, ...A, "alcX", "phenol", "alkene", "alkyne", "haloaryl", "amine", "arylamine", "strained"] },
  hcn: { handles: ["aldehyde", "ketone"], inert: [...HC, ...A, "alcX", "alkene", "alkyne", "acid", "carboxylate", "ester", "amide", "nitrile", "nitro", "haloaryl", "phenol", "strained"] },
  grignard: { handles: ["aldehyde", "ketone", "ester", "acylhalide", "nitrile", ...A, "alcX", "acid", "phenol", "methanoic"], inert: [...HC, "alkene", "haloaryl", "strained"] },
  h3po4: { handles: A, inert: ["arene", "benzylic", "fluoro", "ketone", "acid", "ester", "nitro", "haloaryl", "haloalkyl", "nitrile", "amide"] },
  esterify: { handles: ["acid"], inert: [...HC, "ketone", "ester", "amide", "nitrile", "nitro", "haloalkyl", "haloaryl", "alkyne", "strained", "phenol"] },
  "ethanoic-h2so4": { handles: A, inert: [...HC, "ketone", "ester", "amide", "nitrile", "nitro", "haloalkyl", "haloaryl", "phenol", "strained"] },
  socl2: { handles: ["acid", ...A], inert: [...HC, "alkene", "alkyne", "ketone", "aldehyde", "ester", "nitrile", "nitro", "haloalkyl", "haloaryl", "phenol", "strained"] },
  "acid-hydrolysis": { handles: ["ester", "methanoic", "anhydride", "amide", "nitrile", "acylhalide", "haloalkyl"], inert: [...HC, ...A, "alcX", "phenol", "alkene", "alkyne", "acid", "ketone", "aldehyde", "nitro", "haloaryl", "strained"] },
  "br2-uv": { handles: [], inert: [] },
  nitration: { handles: ["arene", "phenol", "arylamine"], inert: ["benzylic", "ether", "fluoro", "haloalkyl", "haloaryl", "nitro", "acid", "ester", "ketone", "aldehyde", "nitrile", "amide"] },
  "cl2-alcl3": { handles: ["arene", "phenol", "arylamine"], inert: ["benzylic", "ether", "fluoro", "haloaryl", "nitro", "acid", "ester", "ketone", "nitrile"] },
  "br2-febr3": { handles: ["arene", "phenol", "arylamine"], inert: ["benzylic", "ether", "fluoro", "haloaryl", "nitro", "acid", "ester", "ketone", "nitrile"] },
  "fc-alkyl": { handles: ["arene", "phenol", "arylamine"], inert: ["benzylic", "ether", "fluoro", "haloaryl", "nitro", "acid", "ester", "ketone", "aldehyde", "nitrile"] },
  "fc-acyl": { handles: ["arene", "phenol", "arylamine"], inert: ["benzylic", "ether", "fluoro", "haloaryl", "nitro", "acid", "ester", "ketone", "aldehyde", "nitrile"] },
};
