// Reference outcomes for the Organic Chemistry Lab's Reaction mode (kit/labs/chemistry/reactions/predictor.js).
// Written by hand from standard A-level and first-year textbook chemistry, not generated from the predictor, and not
// yet reviewed by an independent chemist. Each entry: [starting SMILES, reagent id, expected, note?]
//   "SMILES"                 this product forms (as the only, a main or the major product)
//   { major: [], minor: [] } exactly these major (or only) products, and exactly these minor ones
//   { products: [] }         exactly these products (together, e.g. both halves of a hydrolysis)
//   null                     no reaction: the chemistry doesn't happen under these conditions (with a stated reason)
//   DECLINE                  the lab must decline: outside its rules, ambiguous, or another reagent is meant
// Tested by tests/organic-reference.test.mjs.
import { REVIEWS } from "../../kit/labs/chemistry/reactions/reviews.js";
export const DECLINE = { declined: true };
/**
 * The expected outcome as text, stored with a reviewer's verdict: an agreement counts only for the outcome the reviewer
 * actually saw, so editing a case's expectation sends it back for review (its id, start|reagent, stays the same).
 */
/**
 * A case's confidence from its recorded review: "agree" makes it reviewed only while its expectation is the one agreed
 * to (otherwise it's stale, back to provisional until reviewed again); "disagree" keeps it disputed whatever is edited,
 * until a new verdict resolves it.
 */
export function confidenceOf(review, key) {
  const stale = !!review && review.expect !== key;
  return { stale, confidence: review?.verdict === "disagree" ? "disputed" : review?.verdict === "agree" && !stale ? "reviewed" : "provisional" };
}
export const expectKey = (e) => (e === null ? "no-reaction" : e === DECLINE ? "declined" : JSON.stringify(e));
const SECTION = Symbol("section");
const RAW = [
  // ---------- alkenes ----------
  SECTION, { topic: "alkenes", sources: [["aqa", "3.3.4 Alkenes"], ["clayden", "electrophilic addition to alkenes"]] },
  ["C=C", "h2-ni", "CC"], ["C=C", "br2", "BrCCBr"], ["C=C", "hbr", "CCBr"], ["C=C", "steam", "CCO"], ["C=C", "kmno4-cold", "OCCO"],
  ["C=C", "kmno4-hot", { products: [], byproducts: ["CO₂", "H₂O"] }, "oxidised completely to CO₂ and water: a reaction (purple decolourised) with no organic product, not “no reaction”"], ["C=C", "ozone", { products: ["C=O", "C=O"] }], ["C=C", "lindlar", null], ["C=C", "nabh4", null], ["C=C", "naoh-aq", null],
  ["C=C", "cl2-alcl3", DECLINE], ["C=C", "nitration", null], ["C=C", "tollens", null], ["C=C", "hg-hydration", null], ["C=C", "br2-uv", DECLINE], ["C=C", "grignard", null],
  ["C=CC", "h2-ni", "CCC"], ["C=CC", "br2", "CC(Br)CBr"], ["C=CC", "hbr", { major: ["CC(C)Br"], minor: ["CCCBr"] }], ["C=CC", "steam", { major: ["CC(C)O"], minor: ["CCCO"] }],
  ["C=CC", "kmno4-cold", "CC(O)CO"], ["C=CC", "kmno4-hot", { products: ["CC(=O)O"] }], ["C=CC", "ozone", { products: ["C=O", "CC=O"] }], ["C=CC", "nabh4", null], ["C=CC", "cr-reflux", null],
  ["CC=CC", "hbr", "CC(Br)CC"], ["CC=CC", "br2", "CC(Br)C(C)Br"], ["CC=CC", "steam", "CC(O)CC"], ["CC=CC", "kmno4-hot", { products: ["CC(=O)O", "CC(=O)O"] }], ["CC=CC", "ozone", { products: ["CC=O", "CC=O"] }], ["CC=CC", "h2-ni", "CCCC"],
  ["C=C(C)C", "hbr", { major: ["CC(C)(C)Br"], minor: ["CC(C)CBr"] }], ["C=C(C)C", "steam", { major: ["CC(C)(C)O"], minor: ["CC(C)CO"] }], ["C=C(C)C", "kmno4-hot", { products: ["CC(C)=O"] }], ["C=C(C)C", "ozone", { products: ["C=O", "CC(C)=O"] }],
  ["CC=C(C)C", "hbr", { major: ["CCC(C)(C)Br"], minor: ["CC(Br)C(C)C"] }], ["CC=C(C)C", "steam", { major: ["CCC(C)(C)O"], minor: ["CC(O)C(C)C"] }], ["CC=C(C)C", "kmno4-hot", { products: ["CC(=O)O", "CC(C)=O"] }], ["CC=C(C)C", "ozone", { products: ["CC=O", "CC(C)=O"] }],
  ["C=CCC", "hbr", { major: ["CCC(C)Br"], minor: ["CCCCBr"] }], ["C=CCC", "kmno4-hot", { products: ["CCC(=O)O"] }], ["C=CCC", "ozone", { products: ["C=O", "CCC=O"] }], ["C=CCC", "br2", "CCC(Br)CBr"],
  ["C1CCC=CC1", "h2-ni", "C1CCCCC1"], ["C1CCC=CC1", "br2", "BrC1CCCCC1Br"], ["C1CCC=CC1", "hbr", "BrC1CCCCC1"], ["C1CCC=CC1", "steam", "OC1CCCCC1"], ["C1CCC=CC1", "kmno4-cold", "OC1CCCCC1O"],
  ["C1CCC=CC1", "kmno4-hot", "OC(=O)CCCCC(=O)O"], ["C1CCC=CC1", "ozone", "O=CCCCCC=O"],
  ["C=Cc1ccccc1", "hbr", { major: ["CC(Br)c1ccccc1"], minor: ["BrCCc1ccccc1"] }], ["C=Cc1ccccc1", "h2-ni", "CCc1ccccc1"], ["C=Cc1ccccc1", "kmno4-hot", { products: ["OC(=O)c1ccccc1"] }],
  ["C=Cc1ccccc1", "br2", "BrCC(Br)c1ccccc1"], ["C=Cc1ccccc1", "nitration", DECLINE, "C=C"], ["C=Cc1ccccc1", "ozone", { products: ["O=Cc1ccccc1", "C=O"] }],
  ["C=CC=C", "h2-ni", "CCCC"], ["C=CC=C", "br2", "BrCC(Br)C(Br)CBr"],
  ["C=CC(=O)O", "hbr", DECLINE, "conjugate"], ["C=CC=O", "nabh4", "C=CCO"], ["C=CC=O", "h2-ni", "CCC=O"], ["C=CC=O", "br2", "BrCC(Br)C=O"], ["C=CCO", "cr-distil", "C=CC=O"], ["C=CCO", "br2", "OCC(Br)CBr"], ["C=CCO", "h2-ni", "CCCO"],
  // ---------- alkynes ----------
  SECTION, { topic: "alkynes", sources: [["clayden", "reactions of alkynes"]] },
  ["C#CC", "h2-ni", "CCC"], ["C#CC", "lindlar", "C=CC"], ["C#CC", "hbr", "CC(C)(Br)Br"], ["C#CC", "br2", "CC(Br)(Br)C(Br)Br"], ["C#CC", "hg-hydration", "CC(C)=O"], ["C#CC", "steam", DECLINE], ["C#CC", "br2-uv", DECLINE],
  ["CC#CC", "lindlar", "CC=CC"], ["CC#CC", "hg-hydration", "CCC(C)=O"], ["CC#CC", "hbr", "CCC(C)(Br)Br"], ["CC#CC", "h2-ni", "CCCC"],
  ["C#C", "hg-hydration", "CC=O"], ["C#C", "h2-ni", "CC"], ["C#C", "lindlar", "C=C"], ["CCC#CC", "hg-hydration", { products: ["CCCC(C)=O", "CCC(=O)CC"] }],
  // ---------- halogenoalkanes (substitution and elimination) ----------
  SECTION, { topic: "halogenoalkanes (substitution and elimination)", sources: [["aqa", "3.3.3 Halogenoalkanes"], ["clayden", "nucleophilic substitution at saturated carbon; elimination reactions"]] },
  ["CCBr", "naoh-aq", "CCO"], ["CCBr", "kcn", "CCC#N"], ["CCBr", "nh3", "CCN"], ["CCBr", "koh-eth", { major: ["CCO"], minor: ["C=C"] }, "primary: substitution still wins"], ["CCBr", "tbuok", "C=C"],
  ["CCBr", "water", null, "No significant reaction"], ["CCBr", "h2-ni", null], ["CCBr", "nabh4", null], ["CCBr", "acid-hydrolysis", DECLINE], ["CCBr", "nh3-cold", DECLINE],
  ["CBr", "naoh-aq", "CO"], ["CBr", "koh-eth", "CO"], ["CBr", "tbuok", "COC(C)(C)C", "Williamson ether: methyl halides can't eliminate"],
  ["CCCBr", "naoh-aq", "CCCO"], ["CCCBr", "koh-eth", { major: ["CCCO"], minor: ["C=CC"] }], ["CCCBr", "kcn", "CCCC#N"], ["CCCBr", "tbuok", "C=CC"], ["CCCBr", "nh3", "CCCN"],
  ["CC(C)Br", "naoh-aq", { major: ["CC(C)O"], minor: ["C=CC"] }], ["CC(C)Br", "koh-eth", { major: ["C=CC"], minor: ["CC(C)O"] }], ["CC(C)Br", "kcn", "CC(C)C#N"], ["CC(C)Br", "tbuok", "C=CC"], ["CC(C)Br", "nh3", "CC(C)N"], ["CC(C)Br", "water", "CC(C)O"],
  ["CC(Br)CC", "koh-eth", { major: ["CC=CC"], minor: ["C=CCC", "CC(O)CC"] }], ["CC(Br)CC", "tbuok", { major: ["C=CCC"], minor: ["CC=CC"] }, "Hofmann product with a bulky base"],
  ["CC(Br)CC", "naoh-aq", { major: ["CC(O)CC"], minor: ["CC=CC", "C=CCC"] }], ["CC(Br)CC", "kcn", "CCC(C)C#N"],
  ["CC(C)(C)Br", "naoh-aq", { major: ["CC(C)(C)O"], minor: ["C=C(C)C"] }], ["CC(C)(C)Br", "koh-eth", "C=C(C)C"], ["CC(C)(C)Br", "water", "CC(C)(C)O"], ["CC(C)(C)Br", "kcn", "C=C(C)C", "tertiary + cyanide: elimination dominates"],
  ["CC(C)(C)Br", "nh3", DECLINE, "eliminates"], ["CC(C)(C)Br", "tbuok", "C=C(C)C"],
  ["CC(C)(C)CBr", "naoh-aq", null, "neopentyl"], ["CC(C)(C)CBr", "kcn", null, "neopentyl"],
  ["CCI", "naoh-aq", "CCO"], ["CCCl", "naoh-aq", "CCO"], ["CCCl", "kcn", "CCC#N"],
  ["ClCCCl", "koh-eth", DECLINE, "more than one halogen"], ["BrCCBr", "naoh-aq", DECLINE],
  ["BrCc1ccccc1", "naoh-aq", "OCc1ccccc1"], ["BrCc1ccccc1", "kcn", "N#CCc1ccccc1"], ["BrCc1ccccc1", "nh3", "NCc1ccccc1"],
  ["C=CBr", "naoh-aq", null], ["Brc1ccccc1", "naoh-aq", null], ["Brc1ccccc1", "kcn", null],
  ["BrCCO", "naoh-aq", "OCCO"], ["BrCCO", "kcn", "N#CCCO"], ["BrCCC(=O)O", "naoh-aq", DECLINE, "a halogen and a C=O"],
  // ---------- alcohols ----------
  SECTION, { topic: "alcohols", sources: [["aqa", "3.3.5 Alcohols"]] },
  ["CCO", "cr-distil", "CC=O"], ["CCO", "cr-reflux", "CC(=O)O"], ["CCO", "h3po4", "C=C"], ["CCO", "socl2", "CCCl"], ["CCO", "ethanoic-h2so4", "CCOC(C)=O"],
  ["CCO", "naoh-aq", null], ["CCO", "nabh4", null], ["CCO", "grignard", null, "strong base"], ["CCO", "esterify", null], ["CCO", "hbr", null], ["CCO", "tollens", null], ["CCO", "br2", null],
  ["CO", "cr-distil", "C=O"], ["CO", "h3po4", null, "no neighbouring carbon"],
  ["CCCO", "cr-distil", "CCC=O"], ["CCCO", "cr-reflux", "CCC(=O)O"], ["CCCO", "h3po4", "C=CC"], ["CCCO", "ethanoic-h2so4", "CCCOC(C)=O"],
  ["CC(C)O", "cr-distil", "CC(C)=O"], ["CC(C)O", "cr-reflux", "CC(C)=O"], ["CC(C)O", "h3po4", "C=CC"], ["CC(C)O", "socl2", "CC(C)Cl"], ["CC(C)O", "lialh4", null],
  ["CC(O)CC", "h3po4", { major: ["CC=CC"], minor: ["C=CCC"] }], ["CC(O)CC", "cr-reflux", "CCC(C)=O"], ["CC(O)CC", "cr-distil", "CCC(C)=O"],
  ["CC(C)(C)O", "cr-reflux", null, "tertiary"], ["CC(C)(C)O", "cr-distil", null, "tertiary"], ["CC(C)(C)O", "h3po4", "C=C(C)C"], ["CC(C)(C)O", "socl2", "CC(C)(C)Cl"], ["CC(C)(C)O", "grignard", null],
  ["CCC(C)(C)O", "h3po4", { major: ["CC=C(C)C"], minor: ["C=C(C)CC"] }], ["CCC(C)(C)O", "cr-reflux", null],
  ["OC1CCCCC1", "cr-reflux", "O=C1CCCCC1"], ["OC1CCCCC1", "h3po4", "C1CCC=CC1"], ["OC1CCCCC1", "cr-distil", "O=C1CCCCC1"],
  ["OCc1ccccc1", "cr-distil", "O=Cc1ccccc1"], ["OCc1ccccc1", "cr-reflux", "OC(=O)c1ccccc1"],
  ["OCCO", "h3po4", DECLINE, "more than one –OH"], ["OCCO", "cr-reflux", "OC(=O)C(=O)O"],
  ["OCCC=O", "nabh4", "OCCCO"],
  // ---------- aldehydes and ketones ----------
  SECTION, { topic: "aldehydes and ketones", sources: [["aqa", "3.3.8 Aldehydes and ketones"], ["clayden", "nucleophilic addition to the carbonyl group; organometallic reagents"]] },
  ["CC=O", "nabh4", "CCO"], ["CC=O", "lialh4", "CCO"], ["CC=O", "hcn", "CC(O)C#N"], ["CC=O", "grignard", "CC(C)O"], ["CC=O", "tollens", "CC(=O)[O-]"], ["CC=O", "cr-reflux", "CC(=O)O"],
  ["CC=O", "cr-distil", null], ["CC=O", "h2-ni", null], ["CC=O", "naoh-aq", DECLINE, "aldol"], ["CC=O", "kcn", null], ["CC=O", "esterify", null],
  ["C=O", "grignard", "CCO", "methanal gives a primary alcohol"], ["C=O", "nabh4", "CO"],
  ["CC(C)=O", "nabh4", "CC(C)O"], ["CC(C)=O", "grignard", "CC(C)(C)O"], ["CC(C)=O", "hcn", "CC(C)(O)C#N"], ["CC(C)=O", "tollens", null, "ketones"], ["CC(C)=O", "cr-reflux", null], ["CC(C)=O", "lialh4", "CC(C)O"], ["CC(C)=O", "naoh-aq", DECLINE, "aldol"],
  ["CCC=O", "grignard", "CCC(C)O"], ["CCC=O", "hcn", "CCC(O)C#N"], ["CCC=O", "tollens", "CCC(=O)[O-]"],
  ["O=Cc1ccccc1", "nabh4", "OCc1ccccc1"], ["O=Cc1ccccc1", "hcn", "N#CC(O)c1ccccc1"], ["O=Cc1ccccc1", "grignard", "CC(O)c1ccccc1"], ["O=Cc1ccccc1", "tollens", "[O-]C(=O)c1ccccc1"], ["O=Cc1ccccc1", "nitration", "O=Cc1cccc(c1)[N+](=O)[O-]"],
  ["CC(=O)c1ccccc1", "nabh4", "CC(O)c1ccccc1"], ["CC(=O)c1ccccc1", "grignard", "CC(C)(O)c1ccccc1"], ["CC(=O)c1ccccc1", "nitration", "CC(=O)c1cccc(c1)[N+](=O)[O-]"], ["CC(=O)c1ccccc1", "fc-acyl", null, "deactivated"],
  ["O=C1CCCCC1", "nabh4", "OC1CCCCC1"], ["O=C1CCCCC1", "grignard", "CC1(O)CCCCC1"],
  ["CC(=O)CCC(=O)O", "nabh4", "CC(O)CCC(=O)O", "NaBH₄ leaves the acid"], ["CC(=O)CCC(=O)O", "lialh4", "CC(O)CCCO"], ["CCOC(=O)CC(C)=O", "nabh4", "CCOC(=O)CC(C)O", "NaBH₄ leaves the ester"],
  // ---------- carboxylic acids and derivatives ----------
  SECTION, { topic: "carboxylic acids and derivatives", sources: [["aqa", "3.3.9 Carboxylic acids and derivatives"], ["clayden", "nucleophilic substitution at the carbonyl group"]] },
  ["CC(=O)O", "naoh-aq", "CC(=O)[O-]"], ["CC(=O)O", "esterify", "CCOC(C)=O"], ["CC(=O)O", "socl2", "CC(=O)Cl"], ["CC(=O)O", "lialh4", "CCO"], ["CC(=O)O", "nabh4", null], ["CC(=O)O", "grignard", null], ["CC(=O)O", "tollens", null], ["CC(=O)O", "acid-hydrolysis", null],
  ["CCC(=O)O", "esterify", "CCOC(=O)CC"], ["CCC(=O)O", "socl2", "CCC(=O)Cl"],
  ["OC(=O)c1ccccc1", "nitration", "OC(=O)c1cccc(c1)[N+](=O)[O-]"], ["OC(=O)c1ccccc1", "naoh-aq", "[O-]C(=O)c1ccccc1"], ["OC(=O)c1ccccc1", "lialh4", "OCc1ccccc1"], ["OC(=O)c1ccccc1", "cl2-alcl3", "OC(=O)c1cccc(Cl)c1"],
  ["OC(=O)c1ccccc1", "fc-acyl", null, "deactivated"], ["OC(=O)c1ccccc1", "fc-alkyl", null], ["OC(=O)c1ccccc1", "esterify", "CCOC(=O)c1ccccc1"],
  ["CCOC(C)=O", "naoh-aq", { products: ["CC(=O)[O-]", "CCO"] }], ["CCOC(C)=O", "acid-hydrolysis", { products: ["CC(=O)O", "CCO"] }], ["CCOC(C)=O", "lialh4", { products: ["CCO", "CCO"] }], ["CCOC(C)=O", "grignard", { products: ["CC(C)(C)O", "CCO"] }],
  ["CCOC(C)=O", "nabh4", null], ["CCOC(C)=O", "esterify", null], ["CCOC(C)=O", "tollens", null],
  ["COC(=O)c1ccccc1", "naoh-aq", { products: ["[O-]C(=O)c1ccccc1", "CO"] }], ["COC(=O)c1ccccc1", "nitration", "COC(=O)c1cccc(c1)[N+](=O)[O-]"], ["COC(=O)c1ccccc1", "lialh4", { products: ["OCc1ccccc1", "CO"] }],
  ["CC(Cl)=O", "water", "CC(=O)O"], ["CC(Cl)=O", "ethanol-rt", "CCOC(C)=O"], ["CC(Cl)=O", "nh3-cold", "CC(N)=O"], ["CC(Cl)=O", "naoh-aq", "CC(=O)[O-]"], ["CC(Cl)=O", "lialh4", "CCO"], ["CC(Cl)=O", "nabh4", "CCO"], ["CC(Cl)=O", "nh3", DECLINE],
  ["CC(=O)OC(C)=O", "water", { products: ["CC(=O)O", "CC(=O)O"] }], ["CC(=O)OC(C)=O", "ethanol-rt", { products: ["CCOC(C)=O", "CC(=O)O"] }], ["CC(=O)OC(C)=O", "nh3-cold", { products: ["CC(N)=O", "CC(=O)O"] }],
  ["CC(N)=O", "acid-hydrolysis", "CC(=O)O"], ["CC(N)=O", "naoh-aq", "CC(=O)[O-]"], ["CC(N)=O", "lialh4", "CCN"], ["CC(N)=O", "nabh4", null],
  ["CCC#N", "acid-hydrolysis", "CCC(=O)O"], ["CCC#N", "naoh-aq", "CCC(=O)[O-]"], ["CCC#N", "lialh4", "CCCN"], ["CCC#N", "nabh4", null], ["CC(O)C#N", "acid-hydrolysis", "CC(O)C(=O)O"],
  // ---------- alkanes ----------
  SECTION, { topic: "alkanes", sources: [["aqa", "3.3.2 Alkanes"], ["clayden", "radical reactions"]] },
  ["CCC", "br2-uv", { major: ["CC(C)Br"], minor: ["CCCBr"] }], ["CC(C)C", "br2-uv", { major: ["CC(C)(C)Br"], minor: ["CC(C)CBr"] }], ["C1CCCCC1", "br2-uv", "BrC1CCCCC1"], ["CC", "br2-uv", "CCBr"],
  ["CCCC", "br2-uv", { major: ["CCC(C)Br"], minor: ["CCCCBr"] }], ["CCC", "h2-ni", null], ["CCC", "naoh-aq", null], ["CCC", "nitration", null], ["CCC", "br2", null], ["CCC", "cr-reflux", null],
  // ---------- aromatic substitution ----------
  SECTION, { topic: "aromatic substitution", sources: [["aqa", "3.3.10 Aromatic chemistry"], ["clayden", "electrophilic aromatic substitution"]] },
  ["c1ccccc1", "nitration", "[O-][N+](=O)c1ccccc1"], ["c1ccccc1", "cl2-alcl3", "Clc1ccccc1"], ["c1ccccc1", "br2-febr3", "Brc1ccccc1"], ["c1ccccc1", "fc-alkyl", "Cc1ccccc1"], ["c1ccccc1", "fc-acyl", "CC(=O)c1ccccc1"],
  ["c1ccccc1", "br2", null, "benzene"], ["c1ccccc1", "h2-ni", null], ["c1ccccc1", "hbr", null], ["c1ccccc1", "kmno4-cold", null], ["c1ccccc1", "br2-uv", DECLINE, "radical addition to benzene (as with Cl₂ and UV) is outside the rules"],
  ["Cc1ccccc1", "nitration", { major: ["Cc1ccccc1[N+](=O)[O-]", "Cc1ccc(cc1)[N+](=O)[O-]"], minor: [] }], ["Cc1ccccc1", "br2-febr3", { major: ["Cc1ccccc1Br", "Cc1ccc(Br)cc1"], minor: [] }],
  ["Cc1ccccc1", "fc-acyl", { major: ["CC(=O)c1ccc(C)cc1"], minor: ["CC(=O)c1ccccc1C"] }, "bulky acylium: para"], ["Cc1ccccc1", "cl2-alcl3", { major: ["Cc1ccccc1Cl", "Cc1ccc(Cl)cc1"], minor: [] }],
  ["Oc1ccccc1", "br2", "Oc1c(Br)cc(Br)cc1Br", "phenol: no catalyst needed"], ["Oc1ccccc1", "nitration", { major: ["Oc1ccccc1[N+](=O)[O-]", "Oc1ccc(cc1)[N+](=O)[O-]"], minor: [] }], ["Oc1ccccc1", "fc-alkyl", null], ["Oc1ccccc1", "fc-acyl", null],
  ["Nc1ccccc1", "br2", "Nc1c(Br)cc(Br)cc1Br"], ["Nc1ccccc1", "nitration", DECLINE, "protected"], ["Nc1ccccc1", "fc-acyl", null], ["Nc1ccccc1", "cl2-alcl3", DECLINE],
  ["COc1ccccc1", "nitration", { major: ["COc1ccccc1[N+](=O)[O-]", "COc1ccc(cc1)[N+](=O)[O-]"], minor: [] }], ["COc1ccccc1", "fc-acyl", { major: ["CC(=O)c1ccc(OC)cc1"], minor: ["CC(=O)c1ccccc1OC"] }], ["COc1ccccc1", "br2", DECLINE],
  ["Clc1ccccc1", "nitration", { major: ["Clc1ccccc1[N+](=O)[O-]", "Clc1ccc(cc1)[N+](=O)[O-]"], minor: [] }], ["Clc1ccccc1", "fc-acyl", { major: ["CC(=O)c1ccc(Cl)cc1"], minor: ["CC(=O)c1ccccc1Cl"] }],
  ["[O-][N+](=O)c1ccccc1", "nitration", "[O-][N+](=O)c1cccc(c1)[N+](=O)[O-]"], ["[O-][N+](=O)c1ccccc1", "fc-alkyl", null], ["[O-][N+](=O)c1ccccc1", "fc-acyl", null], ["[O-][N+](=O)c1ccccc1", "cl2-alcl3", "Clc1cccc(c1)[N+](=O)[O-]"],
  ["FC(F)(F)c1ccccc1", "nitration", "FC(F)(F)c1cccc(c1)[N+](=O)[O-]", "–CF₃ is 3-directing"], ["N#Cc1ccccc1", "nitration", "N#Cc1cccc(c1)[N+](=O)[O-]"],
  ["Cc1ccc(C)cc1", "nitration", "Cc1ccc(C)c(c1)[N+](=O)[O-]"], ["Cc1ccc(C)cc1", "cl2-alcl3", "Cc1ccc(C)c(Cl)c1"],
  ["Cc1ccc(cc1)C(=O)O", "nitration", "Cc1ccc(C(=O)O)cc1[N+](=O)[O-]", "directing effects reinforce"],
  ["Cc1ccc(O)cc1", "nitration", "Cc1ccc(O)c(c1)[N+](=O)[O-]", "–OH (stronger activator) controls"], ["Cc1ccc(Cl)cc1", "nitration", "Cc1ccc(Cl)cc1[N+](=O)[O-]", "–CH₃ beats –Cl"],
];

// Each case as a record: a stable id, the section's sources, and its confidence (provisional until an independent
// review marks it; see docs/organic-review/README.md and the review columns in reference-review.csv).
export const REFERENCE = [];
{
  let meta = null;
  for (let i = 0; i < RAW.length; i++) {
    if (RAW[i] === SECTION) { meta = RAW[++i]; continue; }
    const [start, reagent, expect, note] = RAW[i], id = `${start}|${reagent}`;
    const review = REVIEWS[id], key = expectKey(expect), { confidence, stale } = confidenceOf(review, key);
    REFERENCE.push({ id, start, reagent, expect, expectKey: key, note: note || "", topic: meta.topic, sources: meta.sources.map(([src, topic]) => ({ id: src, topic })), confidence, review: review || null, stale });
  }
}
