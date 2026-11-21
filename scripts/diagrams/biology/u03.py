"""Biology unit 3, Biochemistry: diagram specs. Run: python3 scripts/diagrams/biology/u03.py
(needs RDKit only to derive maltose from two glucose molecules; the specs it writes hold plain SMILES.)"""
from spec import mk
from rdkit import Chem

def mapped(smiles, atoms):
    """The SMILES with atom-map numbers on the given atom indices {index: map}: the structures renderer checks R/S there."""
    m = Chem.MolFromSmiles(smiles)
    for i, k in atoms.items():
        m.GetAtomWithIdx(i).SetAtomMapNum(k)
    return Chem.MolToSmiles(m)

# ---------------------------------------------------------------- the hexoses: aldose or ketose, and ring forms
GLC, GAL, FRU = "C([C@H]([C@H]([C@@H]([C@H](C=O)O)O)O)O)O", "C([C@H]([C@@H]([C@@H]([C@H](C=O)O)O)O)O)O", "C([C@H]([C@H]([C@@H](C(=O)CO)O)O)O)O"
mk("u03-06", "bio-hexose-isomers", "structures", "Three hexoses with the same formula",
   "Glucose, galactose and fructose are all C₆H₁₂O₆: isomers. Glucose and galactose are aldoses (a –CHO at the end of the chain) and differ only at carbon 4; fructose is a ketose (a C=O inside the chain).",
   "Open-chain structures of glucose, galactose and fructose, each C6H12O6, with the carbonyl group shaded: an aldehyde on glucose and galactose, a ketone on fructose.",
   ["Glucose: an aldehyde group at carbon 1, so an aldose.", "Galactose: also an aldose; the –OH on carbon 4 points the other way from glucose.",
    "Fructose: a ketone group at carbon 2, so a ketose.", "All three are C₆H₁₂O₆, so they are isomers."],
   panels=[{"smiles": mapped(GLC, {1: 5, 2: 4, 3: 3, 4: 2}), "label": "glucose", "sub": "aldose", "formula": "C6H12O6", "cip": {"2": "R", "3": "S", "4": "R", "5": "R"}, "highlight": [{"group": "aldehyde", "colour": "a2"}]},
           {"smiles": mapped(GAL, {1: 5, 2: 4, 3: 3, 4: 2}), "label": "galactose", "sub": "aldose", "formula": "C6H12O6", "cip": {"2": "R", "3": "S", "4": "S", "5": "R"}, "highlight": [{"group": "aldehyde", "colour": "a2"}]},
           {"smiles": mapped(FRU, {1: 5, 2: 4, 3: 3}), "label": "fructose", "sub": "ketose", "formula": "C6H12O6", "cip": {"3": "S", "4": "R", "5": "R"}, "highlight": [{"group": "ketone", "colour": "a4"}]}],
   claims=[{"type": "isomers"}])

AG = "C([C@@H]1[C@H]([C@@H]([C@H]([C@H](O1)O)O)O)O)O"
BG = "C([C@@H]1[C@H]([C@@H]([C@H]([C@@H](O1)O)O)O)O)O"
ANOMER = "[CX4;R]([OX2H1])[O;R]"
mk("u03-06", "bio-alpha-beta-glucose", "structures", "α-glucose and β-glucose",
   "The two ring forms differ only in the –OH on carbon 1 (shaded): below the ring in α-glucose, above it in β-glucose. That one change decides whether glucose builds starch and glycogen (α) or cellulose (β).",
   "Ring structures of alpha-glucose and beta-glucose, each C6H12O6, with the carbon-1 hydroxyl group shaded.",
   ["α-glucose: the –OH on carbon 1 is below the ring.", "β-glucose: the –OH on carbon 1 is above the ring.",
    "Every other carbon is the same, so the two are stereoisomers that are not mirror images (diastereomers)."],
   also=("u03-08",),
   panels=[{"smiles": mapped(AG, {5: 1}), "label": "α-glucose", "sub": "OH on carbon 1 below the ring", "formula": "C6H12O6", "cip": {"1": "S"}, "highlight": [{"group": ANOMER, "colour": "a2"}]},
           {"smiles": mapped(BG, {5: 1}), "label": "β-glucose", "sub": "OH on carbon 1 above the ring", "formula": "C6H12O6", "cip": {"1": "R"}, "highlight": [{"group": ANOMER, "colour": "a4"}]}],
   claims=[{"type": "diastereomers"}])

# ---------------------------------------------------------------- condensation: maltose from two α-glucose (derived, not typed)
a = Chem.MolFromSmiles(AG); n = a.GetNumAtoms()
rw = Chem.RWMol(Chem.CombineMols(a, a))
rw.AddBond(7, 2 + n, Chem.BondType.SINGLE)   # O1 of the first glucose becomes the bridge to carbon 4 of the second
rw.RemoveAtom(10 + n)                          # the second glucose's own O4 leaves, with the hydrogen, as water
p = rw.GetMol(); Chem.SanitizeMol(p); MALTOSE = Chem.MolToSmiles(p)
mk("u03-07", "bio-condensation-maltose", "structures", "Two glucose molecules join to make maltose",
   "A condensation reaction links carbon 1 of one α-glucose to carbon 4 of another through an oxygen: the α-1,4 glycosidic bond (shaded). One molecule of water is released, and hydrolysis, catalysed by maltase, reverses it.",
   "Two alpha-glucose molecules, C6H12O6, react to give maltose, C12H22O11, and a molecule of water.",
   ["Two α-glucose molecules, each C₆H₁₂O₆.", "Carbon 1 of one joins to carbon 4 of the other through an oxygen atom: an α-1,4 glycosidic bond.",
    "A water molecule is released: this is a condensation reaction.", "Atoms balance: C₁₂H₂₄O₁₂ on the left, C₁₂H₂₂O₁₁ + H₂O on the right."],
   panels=[{"smiles": AG, "label": "α-glucose", "formula": "C6H12O6"}, {"smiles": AG, "label": "α-glucose", "formula": "C6H12O6"},
           {"smiles": MALTOSE, "label": "maltose", "sub": "α-1,4 glycosidic bond", "formula": "C12H22O11", "highlight": [{"group": "[CX4;R][OX2;!R][CX4;R]", "colour": "a2"}]},
           {"smiles": "O", "label": "water", "formula": "H2O"}],
   between=["+", "→", "+"], rowBreakSeparators=True, bond=[26, 30], claims=[{"type": "reaction", "left": [0, 1], "right": [2, 3]}])

# ---------------------------------------------------------------- fatty acids
mk("u03-10", "bio-fatty-acids", "structures", "Saturated and unsaturated fatty acids",
   "All three are 18 carbons long with a –COOH head. Stearic acid has no double bonds and is straight; each cis double bond in oleic and linoleic acid puts a kink in the chain, so they pack loosely and their fats are liquid.",
   "Skeletal structures of stearic acid with no double bonds, oleic acid with one cis double bond and linoleic acid with two, each with 18 carbons.",
   ["Stearic acid, C₁₈H₃₆O₂: saturated, a straight chain.", "Oleic acid, C₁₈H₃₄O₂: monounsaturated, one cis double bond and a kink.",
    "Linoleic acid, C₁₈H₃₂O₂: polyunsaturated, two cis double bonds and two kinks.", "Kinked chains cannot pack closely, so unsaturated fats are liquid at room temperature."],
   panels=[{"smiles": "CCCCCCCCCCCCCCCCCC(=O)O", "label": "stearic acid", "sub": "saturated", "formula": "C18H36O2", "groups": ["carboxylic acid"], "notGroups": ["alkene"]},
           {"smiles": "CCCCCCCC/C=C\\CCCCCCCC(=O)O", "label": "oleic acid", "sub": "monounsaturated", "formula": "C18H34O2", "groups": ["carboxylic acid", "alkene"], "highlight": [{"group": "alkene", "colour": "a2"}]},
           {"smiles": "CCCCC/C=C\\C/C=C\\CCCCCCCC(=O)O", "label": "linoleic acid", "sub": "polyunsaturated", "formula": "C18H32O2", "groups": ["carboxylic acid", "alkene"], "highlight": [{"group": "alkene", "colour": "a2"}]}])

# ---------------------------------------------------------------- triglyceride
OCT = "CCCCCCCC(=O)O"
TRI = "CCCCCCCC(=O)OCC(OC(=O)CCCCCCC)COC(=O)CCCCCCC"   # tricaprylin: chains kept short so the atoms stay legible
mk("u03-11", "bio-triglyceride-formation", "structures", "Making a triglyceride",
   "Each of glycerol's three –OH groups condenses with the –COOH of a fatty acid, forming an ester bond and releasing a molecule of water: three ester bonds, three waters. Lipase reverses it. The chains are drawn short (8 carbons) to fit; in fats they are typically 14–22.",
   "Glycerol and three molecules of octanoic acid react to give the triglyceride tricaprylin and three molecules of water.",
   ["Glycerol, C₃H₈O₃, has three –OH groups.", "Three fatty acids (here octanoic acid, C₈H₁₆O₂, a short one for clarity), each with a –COOH group.",
    "Three condensation reactions form three ester bonds, giving tricaprylin, C₂₇H₅₀O₆.", "Three molecules of water are released: C₃H₈O₃ + 3 C₈H₁₆O₂ = C₂₇H₅₀O₆ + 3 H₂O."],
   panels=[{"smiles": "OCC(O)CO", "label": "glycerol", "formula": "C3H8O3", "groups": ["alcohol"]},
           {"smiles": OCT, "label": "3 × octanoic acid", "formula": "C8H16O2", "groups": ["carboxylic acid"]},
           {"smiles": TRI, "label": "triglyceride (tricaprylin)", "formula": "C27H50O6", "highlight": [{"group": "ester", "colour": "a2"}], "notGroups": ["carboxylic acid"]},
           {"smiles": "O", "label": "3 × water", "formula": "H2O"}],
   between=["+", "→", "+"], rowBreakSeparators=True, claims=[{"type": "reaction", "left": [0, 1], "right": [2, 3], "coef": {"1": 3, "3": 3}}])

# ---------------------------------------------------------------- phospholipid
PC = "CCCCCCCCCCCCCCCC(=O)OC[C@H](COP(=O)([O-])OCC[N+](C)(C)C)OC(=O)CCCCCCC/C=C\\CCCCCCCC"
mk("u03-12", "bio-phospholipid", "structures", "A phospholipid",
   "Glycerol carries two fatty acid tails (non-polar, hydrophobic) and a phosphate head with choline (charged, hydrophilic). Having both parts makes the molecule amphipathic, which is why phospholipids assemble into a bilayer in water.",
   "Structure of a phosphatidylcholine with a saturated palmitic acid tail, an unsaturated oleic acid tail with a cis double bond, and a phosphate and choline head.",
   ["Two fatty acid tails joined to glycerol by ester bonds: one saturated, one with a cis double bond.", "A phosphate group on the third carbon of glycerol, linked to choline: the polar head.",
    "Tails: hydrophobic. Head: hydrophilic. The molecule is amphipathic."],
   panels=[{"smiles": PC, "label": "phosphatidylcholine", "sub": "two tails, one phosphate head", "formula": "C42H82NO8P",
            "groups": ["ester", "quaternary ammonium"], "highlight": [{"group": "[PX4](=O)([O-])(O)O", "colour": "a1"}, {"group": "ester", "colour": "a3"}]}])

# ---------------------------------------------------------------- cholesterol
CHOL = "C[C@H](CCCC(C)C)[C@H]1CC[C@@H]2[C@@]1(CC[C@H]3[C@H]2CC=C4[C@@]3(CC[C@@H](C4)O)C)C"
mk("u03-13", "bio-cholesterol", "structures", "Cholesterol",
   "Four fused rings (three six-membered, one five-membered) with a hydrocarbon tail and a single –OH. The rings and tail are hydrophobic, so cholesterol sits among the phospholipid tails of an animal cell membrane, with its small polar –OH near the heads.",
   "Structure of cholesterol, C27H46O, with its four fused carbon rings shaded and its single hydroxyl group.",
   ["Four fused carbon rings: A, B and C are six-membered, D is five-membered.", "A hydrocarbon side chain on ring D, and a small hydroxyl group on ring A.",
    "Eight chiral centres fix its shape exactly; C₂₇H₄₆O."],
   panels=[{"smiles": CHOL, "label": "cholesterol", "formula": "C27H46O", "rings": 4, "chiralCentres": 8, "groups": ["alcohol"],
            "highlight": [{"group": "steroid nucleus", "colour": "a4"}]}])

# ---------------------------------------------------------------- amino acids
AAS = [("glycine", "NCC(=O)O", "C2H5NO2", "R = H", {}), ("alanine", "N[C@@H](C)C(=O)O", "C3H7NO2", "non-polar", {1: "S"}), ("serine", "N[C@@H](CO)C(=O)O", "C3H7NO3", "polar, uncharged", {1: "S"}),
       ("aspartic acid", "N[C@@H](CC(=O)O)C(=O)O", "C4H7NO4", "acidic", {1: "S"}), ("lysine", "N[C@@H](CCCCN)C(=O)O", "C6H14N2O2", "basic", {1: "S"}), ("cysteine", "N[C@@H](CS)C(=O)O", "C3H7NO2S", "thiol: disulfide bridges", {1: "R"})]
mk("u03-15", "bio-amino-acids", "structures", "Amino acids differ only in the R group",
   "Every amino acid has the same backbone, an amino group and a carboxyl group on the α-carbon, shaded here. Only the R group changes, and it decides how the residue behaves in a protein. Proteins use the L form (S in all of these but cysteine, where sulfur changes the priorities).",
   "Skeletal structures of glycine, alanine, serine, aspartic acid, lysine and cysteine, each with the amino group, alpha carbon and carboxyl group shaded.",
   ["Glycine: R is a hydrogen atom, the simplest amino acid, and not chiral.", "Alanine: a methyl group, non-polar.", "Serine: a hydroxyl group, polar but uncharged.",
    "Aspartic acid: a second carboxyl group, acidic.", "Lysine: a second amino group, basic.", "Cysteine: a thiol (–SH) group, able to form disulfide bridges."],
   panels=[dict({"smiles": mapped(s, ({1: 1} if c else {})), "label": n, "sub": sub, "formula": f, "groups": ["alpha-amino acid"], "highlight": [{"group": "alpha-amino acid", "colour": "a1"}]},
                **({"cip": {"1": c[1]}} if c else {})) for n, s, f, sub, c in AAS])

# ---------------------------------------------------------------- peptide bond
mk("u03-16", "bio-peptide-bond", "structures", "Forming a peptide bond",
   "The carboxyl group of one amino acid condenses with the amino group of the next, releasing water and forming a peptide bond, –CO–NH– (shaded). The new chain has a free amino group at one end (N-terminus) and a free carboxyl group at the other (C-terminus).",
   "Glycine and alanine react to give the dipeptide glycylalanine, with the peptide bond shaded, and a molecule of water.",
   ["Glycine, C₂H₅NO₂, and alanine, C₃H₇NO₂.", "The carboxyl group of glycine joins the amino group of alanine: a peptide bond.", "A molecule of water is released: a condensation reaction.",
    "The dipeptide has a free –NH₂ (N-terminus) at the glycine end and a free –COOH (C-terminus) at the alanine end."],
   panels=[{"smiles": "NCC(=O)O", "label": "glycine", "formula": "C2H5NO2"}, {"smiles": "N[C@@H](C)C(=O)O", "label": "alanine", "formula": "C3H7NO2"},
           {"smiles": "NCC(=O)N[C@@H](C)C(=O)O", "label": "glycylalanine", "sub": "a dipeptide", "formula": "C5H10N2O3", "groups": ["peptide link"], "highlight": [{"group": "peptide link", "colour": "a2"}]},
           {"smiles": "O", "label": "water", "formula": "H2O"}],
   between=["+", "→", "+"], rowBreakSeparators=True, claims=[{"type": "reaction", "left": [0, 1], "right": [2, 3]}])

# ---------------------------------------------------------------- four levels of protein structure (flow)
LEV = [("primary", "the order of amino acids, joined by peptide bonds, from the amino end to the carboxyl end", "a1"),
       ("secondary", "α-helices and β-sheets: hydrogen bonds between backbone C=O and N–H groups", "a4"),
       ("tertiary", "the 3D fold of one chain: hydrogen bonds, ionic bonds, disulfide bridges and hydrophobic interactions between R groups", "a5"),
       ("quaternary", "two or more chains together, as in haemoglobin (four subunits)", "a2")]
mk("u03-14", "bio-protein-levels", "flow", "Four levels of protein structure",
   "Each level builds on the one before. The sequence (primary) decides which hydrogen bonds form along the backbone (secondary), how the R groups fold the chain (tertiary), and, for proteins with several chains, how the subunits fit together (quaternary).",
   "Four boxes in order: primary, secondary, tertiary and quaternary structure, each with the bonds that hold it.",
   [f"{a.capitalize()} structure: {b}." for a, b, _ in LEV] + ["Not every protein has a quaternary structure: only those made of more than one chain."],
   also=("u03-20",),
   layout="line",
   nodes=[{"id": f"s{i}", "label": a + " structure", "sub": b, "tone": t} for i, (a, b, t) in enumerate(LEV)],
   edges=[{"from": f"s{i}", "to": f"s{i + 1}"} for i in range(3)])

# ---------------------------------------------------------------- enzyme kinetics
MM = "100*x/(2+x)"
mk("u03-25", "bio-michaelis-menten", "graph", "Rate against substrate concentration",
   "At low substrate concentration the rate rises steeply; at high concentration every active site is busy and the rate levels off at Vmax. Km is the substrate concentration at which the rate is half of Vmax: here 2 mmol per dm³.",
   "A curve of reaction rate against substrate concentration rising steeply and levelling towards a dashed Vmax of 100, with the rate of 50 marked at a concentration of 2.",
   ["The curve starts at the origin and rises steeply: more substrate, more collisions with active sites.", "It flattens as the active sites become saturated, approaching Vmax = 100.",
    "Half of Vmax, 50, is reached at a substrate concentration of 2 mmol per dm³. This is Km.", "The equation is v = Vmax[S] ÷ (Km + [S])."],
   range={"x": [0, 20], "y": [0, 115]}, ticks=[[2, 5, 10, 15, 20], [25, 50, 75, 100]], height=[340, 320], xLabelBelow=True,
   axisLabels=["substrate concentration [S] / mmol dm^{−3}", "initial rate v (arbitrary units)"],
   curves=[{"expr": MM, "colour": "a1"}],
   marks=[{"y": 100, "label": "Vmax"}, {"x": 2, "to": 50, "label": "Km (½ Vmax)", "dx": 66}, {"y": 50, "to": 2}],
   checks=[{"type": "point", "expr": MM, "x": 2, "y": 50, "name": "at [S] = Km = 2 the rate is half of Vmax: v = 50"},
           {"type": "value", "expr": MM, "x": 20, "between": [88, 94], "name": "at [S] = 20, ten times Km, the rate is within 10% of Vmax"},
           {"type": "slope", "expr": MM, "x": 0.001, "value": 50, "name": "at low [S] the rate rises in proportion to [S]: gradient Vmax ÷ Km = 50"}])

NONE_, NONC = "100*x/(2+x)", "60*x/(2+x)"
COMP = "100*x/(6+x)"
mk("u03-26", "bio-enzyme-inhibition", "graph", "Competitive and non-competitive inhibitors",
   "A competitive inhibitor fights the substrate for the active site, so more substrate overcomes it: the curve shifts right (Km up) but reaches the same Vmax. A non-competitive inhibitor binds elsewhere and puts some enzyme out of action, so substrate cannot overcome it: Vmax falls.",
   "Three rate curves against substrate concentration: no inhibitor, a competitive inhibitor that shifts the curve right to the same maximum, and a non-competitive inhibitor that lowers the maximum.",
   ["No inhibitor: Vmax 100, Km 2.", "Competitive inhibitor: Km rises to 6 but the curve still approaches Vmax 100.", "Non-competitive inhibitor: Vmax falls to 60; Km stays at 2.",
    "Competitive inhibition is overcome by raising the substrate concentration; non-competitive inhibition is not."],
   range={"x": [0, 40], "y": [0, 115]}, ticks=[[5, 10, 20, 30, 40], [25, 50, 75, 100]], height=[340, 320], xLabelBelow=True,
   axisLabels=["substrate concentration [S] / mmol dm^{−3}", "initial rate v (arbitrary units)"],
   curves=[{"expr": NONE_, "colour": "a1"}, {"expr": COMP, "colour": "a3"}, {"expr": NONC, "colour": "a2"}],
   legend=[["no inhibitor", "a1"], ["competitive inhibitor", "a3"], ["non-competitive inhibitor", "a2"]], legendData=[11, 36],
   checks=[{"type": "point", "expr": COMP, "x": 6, "y": 50, "name": "competitive: half of Vmax (50) is reached at [S] = 6, so Km has risen from 2 to 6"},
           {"type": "value", "expr": COMP, "x": 400, "between": [97, 100], "name": "competitive: at very high [S] the rate reaches the same Vmax, 100"},
           {"type": "order", "a": COMP, "b": NONE_, "x": 5, "rel": "<", "name": "competitive: at the same [S] the rate is lower than with no inhibitor"},
           {"type": "point", "expr": NONC, "x": 2, "y": 30, "name": "non-competitive: half of its own Vmax (30) is reached at [S] = 2, so Km is unchanged"},
           {"type": "value", "expr": NONC, "x": 400, "between": [58, 60], "name": "non-competitive: Vmax falls to 60, and more substrate cannot restore it"}])

# ---------------------------------------------------------------- temperature and pH
TEMP = "1.12478*2^((x-37)/10)/(1+exp((x-40.33)/1.6))"
mk("u03-27", "bio-enzyme-temperature", "graph", "Temperature and enzyme activity",
   "Below the optimum the rate roughly doubles for every 10 °C rise, as molecules gain kinetic energy and collide more often. Beyond the optimum, about 37 °C for human enzymes, hydrogen bonds break, the active site changes shape and the enzyme denatures: the rate collapses.",
   "A curve of relative enzyme activity against temperature that rises steadily from 20 degrees, peaks at 37 degrees and then falls steeply to almost nothing by 50 degrees.",
   ["From 20 °C to 37 °C the rate rises steadily, roughly doubling for each 10 °C.", "The peak, the optimum, is at about 37 °C for a human enzyme.",
    "Above the optimum the enzyme denatures and the rate falls steeply.", "By 50 °C almost no active enzyme is left."],
   range={"x": [15, 60], "y": [0, 1.2]}, ticks=[[20, 30, 37, 40, 50, 60], [0.25, 0.5, 0.75, 1.0]], height=[340, 320], xLabelBelow=True,
   axisLabels=["temperature / °C", "relative rate of reaction"],
   curves=[{"expr": TEMP, "colour": "a2", "domain": [15, 60]}],
   marks=[{"x": 37, "to": 1.0, "label": "optimum", "dx": -8}],
   checks=[{"type": "max", "expr": TEMP, "domain": [20, 55], "x": 37, "y": 1.0, "name": "the rate peaks at the optimum, 37 °C"},
           {"type": "value", "expr": TEMP, "x": 27, "between": [0.5, 0.6], "name": "10 °C below the optimum the rate is a little over half the maximum: roughly halving for each 10 °C"},
           {"type": "value", "expr": TEMP, "x": 50, "between": [0, 0.1], "name": "by 50 °C the enzyme has denatured and the rate is almost zero"}])

PEP, AMY, TRY = "exp(-(x-2)^2/(2*1.1^2))", "exp(-(x-7)^2/(2*1.0^2))", "exp(-(x-8)^2/(2*1.0^2))"
mk("u03-27", "bio-enzyme-ph", "graph", "Each enzyme has its own optimum pH",
   "pH changes the charges on R groups, so it changes the shape of the active site and how well the substrate binds. Pepsin works in the acid of the stomach (about pH 2), salivary amylase in the mouth (about pH 7) and trypsin in the alkaline small intestine (about pH 8).",
   "Three bell-shaped curves of relative activity against pH: pepsin peaking at pH 2, salivary amylase at pH 7 and trypsin at pH 8.",
   ["Pepsin peaks at about pH 2, in the stomach.", "Salivary amylase peaks at about pH 7, in the mouth.", "Trypsin peaks at about pH 8, in the small intestine.",
    "Away from its optimum each enzyme loses activity, and at extremes it denatures."],
   range={"x": [0, 14], "y": [0, 1.25]}, ticks=[[0, 2, 4, 6, 8, 10, 12, 14], [0.25, 0.5, 0.75, 1.0]], height=[340, 320], xLabelBelow=True,
   axisLabels=["pH", "relative activity"],
   curves=[{"expr": PEP, "colour": "a2", "label": "pepsin", "labelAt": [2, 1.1], "anchor": "middle"},
           {"expr": AMY, "colour": "a1", "label": "amylase", "labelAt": [5.7, 1.1], "anchor": "end"},
           {"expr": TRY, "colour": "a4", "label": "trypsin", "labelAt": [9.3, 1.1], "anchor": "start"}],
   checks=[{"type": "max", "expr": PEP, "domain": [0, 14], "x": 2, "y": 1.0, "name": "pepsin's optimum is pH 2"},
           {"type": "max", "expr": AMY, "domain": [0, 14], "x": 7, "y": 1.0, "name": "salivary amylase's optimum is pH 7"},
           {"type": "max", "expr": TRY, "domain": [0, 14], "x": 8, "y": 1.0, "name": "trypsin's optimum is pH 8"}])

# ---------------------------------------------------------------- nucleotides and base pairing
mk("u03-28", "bio-nucleobases", "structures", "The five bases",
   "Adenine and guanine are purines, with two rings; cytosine, thymine and uracil are pyrimidines, with one. DNA uses A, G, C and T; RNA uses uracil in place of thymine, which lacks only the methyl group.",
   "Structures of adenine and guanine, each with two fused rings, and cytosine, thymine and uracil, each with one ring.",
   ["Adenine, C₅H₅N₅, and guanine, C₅H₅N₅O: purines, two rings.", "Cytosine, C₄H₅N₃O, thymine, C₅H₆N₂O₂, and uracil, C₄H₄N₂O₂: pyrimidines, one ring.",
    "Uracil is thymine without its methyl group; RNA uses uracil, DNA uses thymine."],
   panels=[{"smiles": "Nc1ncnc2[nH]cnc12", "label": "adenine (A)", "sub": "purine", "formula": "C5H5N5", "rings": 2, "groups": ["purine ring system"], "highlight": [{"group": "purine ring system", "colour": "a1"}]},
           {"smiles": "Nc1nc2[nH]cnc2c(=O)[nH]1", "label": "guanine (G)", "sub": "purine", "formula": "C5H5N5O", "rings": 2, "groups": ["purine ring system"], "highlight": [{"group": "purine ring system", "colour": "a1"}]},
           {"smiles": "Nc1cc[nH]c(=O)n1", "label": "cytosine (C)", "sub": "pyrimidine", "formula": "C4H5N3O", "rings": 1, "groups": ["pyrimidine ring"], "highlight": [{"group": "pyrimidine ring", "colour": "a4"}]},
           {"smiles": "Cc1c[nH]c(=O)[nH]c1=O", "label": "thymine (T)", "sub": "pyrimidine, DNA only", "formula": "C5H6N2O2", "rings": 1, "groups": ["pyrimidine ring"], "highlight": [{"group": "pyrimidine ring", "colour": "a4"}]},
           {"smiles": "O=c1cc[nH]c(=O)[nH]1", "label": "uracil (U)", "sub": "pyrimidine, RNA only", "formula": "C4H4N2O2", "rings": 1, "groups": ["pyrimidine ring"], "highlight": [{"group": "pyrimidine ring", "colour": "a4"}]}])

mk("u03-29", "bio-dna-rna-pairing", "strand", "DNA pairs A–T and G–C; RNA uses U for T",
   "The two DNA strands are complementary: A pairs with T by two hydrogen bonds, G with C by three. An RNA copy of the coding strand has the same sequence but with uracil in place of thymine.",
   "The coding strand of a short gene, its complementary template strand, and the matching mRNA, with the bases coloured by type.",
   ["Coding strand: ATGGTGCACCTG.", "Template strand, base-paired to it: TACCACGTGGAC (A–T, G–C).", "mRNA copy: AUGGUGCACCUG, the coding strand with U for T.",
    "31 hydrogen bonds hold this stretch of the double helix together: 2 for each of 5 A–T pairs and 3 for each of 7 G–C pairs."],
   coding="ATGGTGCACCTG", rows=["coding", "template", "mrna"],
   claims=[{"type": "template", "value": "TACCACGTGGAC"}, {"type": "mrna", "value": "AUGGUGCACCUG"}, {"type": "hbonds", "value": 31}])

# ---------------------------------------------------------------- ATP cycle (flow)
mk("u03-30", "bio-atp-cycle", "flow", "The ATP cycle",
   "Hydrolysis of the end phosphate of ATP releases about 30.5 kJ per mole, which powers active transport, muscle contraction and synthesis. ATP synthase rebuilds ATP from ADP and Pi, using energy from respiration or photosynthesis, so the cycle never stops.",
   "A cycle between ATP, with three phosphate groups, and ADP plus inorganic phosphate: hydrolysis releases energy, and ATP synthase uses energy from respiration or photosynthesis to rebuild ATP.",
   ["ATP: adenine, ribose and three phosphate groups.", "ATP hydrolase removes the end phosphate: ADP and inorganic phosphate (Pi), releasing about 30.5 kJ per mole to do work.",
    "ATP synthase joins ADP and Pi again by condensation, using energy from respiration or photosynthesis."],
   layout="cycle", radius=100,
   nodes=[{"id": "atp", "label": "ATP", "sub": "adenine, ribose, three phosphates", "tone": "a2"}, {"id": "adp", "label": "ADP + Pi", "sub": "adenine, ribose, two phosphates, and a free phosphate", "tone": "a1"}],
   edges=[{"from": "atp", "to": "adp", "label": "hydrolysis (ATPase): releases about 30.5 kJ per mole", "colour": "a2"},
          {"from": "adp", "to": "atp", "label": "condensation (ATP synthase): energy from respiration or photosynthesis", "colour": "a4"}])
