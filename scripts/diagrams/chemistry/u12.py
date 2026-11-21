"""Unit 12, Organic Chemistry Foundations."""
from spec import mk

def P(smiles, label, **k):
    d = {"smiles": smiles, "label": label}; d.update(k); return d

mk("u12-01", "chem-organic-formulae", "structures", "Four ways to write butan-1-ol",
   "The same molecule, C₄H₁₀O, as a displayed formula (every bond and atom), a structural formula, CH₃CH₂CH₂CH₂OH, and a skeletal formula, where each corner or line end is a carbon carrying enough hydrogens to make four bonds.",
   "Butan-1-ol drawn as a displayed formula with all hydrogens and as a skeletal formula, with the molecular and structural formulae as labels.",
   ["Left: the displayed formula, four carbons in a chain with every C–H bond drawn and O–H on the end carbon.",
    "Right: the skeletal formula, a zigzag of three lines ending in OH.", "Labels give C₄H₁₀O and CH₃CH₂CH₂CH₂OH."],
   panels=[P("CCCCO", "displayed formula", displayed=True, formula="C4H10O", sub="molecular formula C₄H₁₀O"),
           P("CCCCO", "skeletal formula", formula="C4H10O", groups=["primary alcohol"], sub="structural CH₃CH₂CH₂CH₂OH")],
   claims=[{"type": "same", "panels": [0, 1], "name": "both drawings are the same compound"}])

mk("u12-02", "chem-carbon-geometries", "vsepr", "Carbon's three shapes",
   "Four single bonds put carbon at the centre of a tetrahedron, 109.5°. With a double bond it is trigonal planar, 120°; with a triple bond, linear, 180°. A multiple bond counts as one region of electron density.",
   "Methane tetrahedral at 109.5°, methanal trigonal planar at 120°, and hydrogen cyanide linear at 180°.",
   ["Methane: four C–H bonds, two in the plane, one wedge and one hash, 109.5°.", "Methanal: C=O and two C–H in a plane at 120°.", "Hydrogen cyanide: H–C≡N in a straight line, 180°."],
   molecules=[{"label": "CH4, sp³ carbon", "centre": "C", "ligands": [{"el": "H"}] * 4, "shape": "tetrahedral", "angle": "109.5°", "anglePair": [0, 1]},
              {"label": "HCHO, sp² carbon", "centre": "C", "ligands": [{"el": "O", "order": 2}, {"el": "H"}, {"el": "H"}], "shape": "trigonal planar", "angle": "120°", "anglePair": [1, 2]},
              {"label": "HCN, sp carbon", "centre": "C", "ligands": [{"el": "H"}, {"el": "N", "order": 3}], "shape": "linear", "angle": "180°", "showAngle": False}])

mk("u12-03", "chem-hydrocarbon-families", "structures", "The four hydrocarbon families",
   "Alkanes have only single bonds, alkenes a C=C, alkynes a C≡C, and arenes a benzene ring. Each is shown with four or six carbons so the families compare directly.",
   "Skeletal formulae of butane, but-1-ene, but-1-yne and benzene, with the C=C, C≡C and ring highlighted.",
   ["Butane: a four-carbon zigzag, single bonds only.", "But-1-ene: the same chain with a double bond at one end, highlighted.",
    "But-1-yne: a triple bond at one end, drawn straight.", "Benzene: a hexagon with a ring of delocalised electrons."],
   panels=[P("CCCC", "alkane", sub="butane, C₄H₁₀", formula="C4H10"), P("C=CCC", "alkene", sub="but-1-ene, C₄H₈", formula="C4H8", highlight=[{"group": "alkene", "colour": "a1"}]),
           P("C#CCC", "alkyne", sub="but-1-yne, C₄H₆", formula="C4H6", highlight=[{"group": "alkyne", "colour": "a2"}]),
           P("c1ccccc1", "arene", sub="benzene, C₆H₆", formula="C6H6", highlight=[{"group": "arene", "colour": "a4"}])])

mk("u12-04", "chem-alkanes-series", "structures", "The first four alkanes",
   "Each alkane has one more CH₂ than the last, and every one fits CₙH₂ₙ₊₂. Methane to butane are gases at room temperature; boiling points rise with chain length.",
   "Displayed formulae of methane, ethane, propane and butane with their molecular formulae.",
   ["Methane, CH₄: one carbon with four hydrogens.", "Ethane, C₂H₆.", "Propane, C₃H₈.", "Butane, C₄H₁₀."],
   perRow=[4, 2], bond=[30, 28],
   panels=[P("C", "methane", displayed=True, sub="CH₄", formula="CH4"), P("CC", "ethane", displayed=True, sub="C₂H₆", formula="C2H6"),
           P("CCC", "propane", displayed=True, sub="C₃H₈", formula="C3H8"), P("CCCC", "butane", displayed=True, sub="C₄H₁₀", formula="C4H10")],
   claims=[{"type": "series"}, {"type": "general", "formula": "CₙH₂ₙ₊₂", "hOffset": 2}])

mk("u12-05", "chem-alkenes", "structures", "Ethene and propene",
   "Each alkene has one C=C and fits CₙH₂ₙ. The two carbons of the double bond and the four atoms attached to them all lie in one plane.",
   "Displayed formulae of ethene and propene with the C=C highlighted.",
   ["Ethene, C₂H₄: two carbons joined by a double bond, each with two hydrogens.", "Propene, C₃H₆: a CH₃ on one carbon of the double bond."],
   panels=[P("C=C", "ethene", displayed=True, sub="C₂H₄", formula="C2H4", highlight=[{"group": "alkene", "colour": "a1"}]),
           P("C=CC", "propene", displayed=True, sub="C₃H₆", formula="C3H6", highlight=[{"group": "alkene", "colour": "a1"}])],
   claims=[{"type": "general", "formula": "CₙH₂ₙ", "hOffset": 0}])

mk("u12-06", "chem-alkynes", "structures", "Ethyne and propyne",
   "Each alkyne has a C≡C and fits CₙH₂ₙ₋₂. The two sp carbons and the atoms on them lie in a straight line.",
   "Displayed formulae of ethyne and propyne, drawn linear, with the C≡C highlighted.",
   ["Ethyne, C₂H₂: H–C≡C–H in a straight line.", "Propyne, C₃H₄: H–C≡C–CH₃."],
   panels=[P("C#C", "ethyne", displayed=True, sub="C₂H₂", formula="C2H2", highlight=[{"group": "alkyne", "colour": "a2"}]),
           P("C#CC", "propyne", displayed=True, sub="C₃H₄", formula="C3H4", highlight=[{"group": "alkyne", "colour": "a2"}])],
   claims=[{"type": "general", "formula": "CₙH₂ₙ₋₂", "hOffset": -2}])

mk("u12-07", "chem-aromatics", "structures", "Aromatic compounds",
   "Each has a planar ring with 4n + 2 delocalised π electrons: six for benzene and its derivatives, ten for naphthalene (n = 2).",
   "Skeletal formulae of benzene, methylbenzene, phenol and naphthalene.",
   ["Benzene, C₆H₆.", "Methylbenzene: a CH₃ on the ring.", "Phenol: an OH on the ring.", "Naphthalene, C₁₀H₈: two fused rings."],
   perRow=[4, 2],
   panels=[P("c1ccccc1", "benzene", formula="C6H6", sub="6 π electrons"), P("Cc1ccccc1", "methylbenzene", formula="C7H8", sub="6 π electrons"),
           P("Oc1ccccc1", "phenol", formula="C6H6O", groups=["phenol"], sub="6 π electrons"), P("c1ccc2ccccc2c1", "naphthalene", formula="C10H8", sub="10 π electrons")])

mk("u12-08", "chem-benzene-structure", "structures", "Kekulé and delocalised benzene",
   "Kekulé's structure has alternating single (0.154 nm) and double (0.134 nm) bonds. X-ray diffraction finds every C–C bond 0.139 nm, so the six π electrons are delocalised round the ring, drawn as a circle.",
   "Two Kekulé structures of benzene with a double-headed arrow between them, and the delocalised structure with a circle in the ring.",
   ["Left and centre: the two Kekulé structures, double bonds in alternate positions.", "Right: the hexagon with a circle, all bonds equal at 0.139 nm."],
   also=["chemistry:u04-24"], between=["↔", "="], betweenLabels=["", ""],
   panels=[P("C1=CC=CC=C1", "Kekulé form", formula="C6H6"), P("C1C=CC=CC=1", "Kekulé form", formula="C6H6"), P("c1ccccc1", "delocalised", formula="C6H6", sub="all C–C 0.139 nm")],
   claims=[{"type": "same", "panels": [0, 2], "name": "each Kekulé form is benzene"}])

fg = [("CCO", "alcohol", "alcohol", "a1"), ("CCBr", "halogenoalkane", "halogenoalkane", "a3"), ("CC=O", "aldehyde", "aldehyde", "a2"),
      ("CC(C)=O", "ketone", "ketone", "a2"), ("CC(=O)O", "carboxylic acid", "carboxylic acid", "a4"), ("CC(=O)OC", "ester", "ester", "a5"),
      ("CCN", "amine", "primary amine", "a1"), ("CC(N)=O", "amide", "amide", "a3")]
mk("u12-09", "chem-functional-groups", "structures", "The main functional groups",
   "A functional group is the atom or group of atoms that gives a family its reactions. Each two- or three-carbon example has its group shaded.",
   "Eight small molecules: ethanol, bromoethane, ethanal, propanone, ethanoic acid, methyl ethanoate, ethylamine and ethanamide, each with its functional group shaded.",
   [f"{label}: {s} with the {g} group shaded." for s, label, g, _ in fg],
   perRow=[4, 2], bond=[30, 28],
   panels=[P(s, label, highlight=[{"group": g, "colour": c}]) for s, label, g, c in fg])

mk("u12-10", "chem-iupac-naming", "structures", "Naming by the longest chain",
   "4-methylpentan-2-ol: the longest chain holding the –OH has five carbons (pent-), numbered from the end nearer the OH so it gets 2; a methyl branch sits on carbon 4.",
   "Skeletal formula of 4-methylpentan-2-ol with the hydroxyl group highlighted.",
   ["A five-carbon zigzag with OH on carbon 2 and a methyl branch on carbon 4.", "Numbered from the OH end: OH at 2, methyl at 4."],
   panels=[P("CC(O)CC(C)C", "4-methylpentan-2-ol", formula="C6H14O", highlight=[{"group": "secondary alcohol", "colour": "a1"}], sub="chain of 5, OH on C2, CH₃ on C4", cipLabels=False)],
   note="Number from the end that gives the main group the lowest number.")

mk("u12-11", "chem-structural-isomers", "structures", "Three kinds of structural isomer",
   "Chain isomers have different skeletons (butane, methylpropane); position isomers have the group in a different place (propan-1-ol, propan-2-ol); functional group isomers have different groups (ethanol, methoxymethane). Each pair shares a molecular formula.",
   "Three pairs of isomers: butane and methylpropane, propan-1-ol and propan-2-ol, ethanol and methoxymethane.",
   ["Chain: butane and methylpropane, both C₄H₁₀.", "Position: propan-1-ol and propan-2-ol, both C₃H₈O.", "Functional group: ethanol and methoxymethane, both C₂H₆O."],
   perRow=[2, 2], bond=[32, 28],
   panels=[P("CCCC", "butane", sub="C₄H₁₀, chain isomers", formula="C4H10"), P("CC(C)C", "methylpropane", sub="C₄H₁₀", formula="C4H10"),
           P("CCCO", "propan-1-ol", sub="C₃H₈O, position isomers", formula="C3H8O", highlight=[{"group": "alcohol", "colour": "a1"}]), P("CC(C)O", "propan-2-ol", sub="C₃H₈O", formula="C3H8O", highlight=[{"group": "alcohol", "colour": "a1"}]),
           P("CCO", "ethanol", sub="C₂H₆O, functional group isomers", formula="C2H6O", highlight=[{"group": "alcohol", "colour": "a1"}]), P("COC", "methoxymethane", sub="C₂H₆O", formula="C2H6O", highlight=[{"group": "ether", "colour": "a5"}])],
   claims=[{"type": "isomers", "panels": [0, 1]}, {"type": "isomers", "panels": [2, 3]}, {"type": "isomers", "panels": [4, 5]}])

mk("u12-12", "chem-stereoisomers", "structures", "Two kinds of stereoisomer",
   "E- and Z-but-2-ene differ in which side of the rigid C=C the methyl groups sit. (R)- and (S)-butan-2-ol differ at a chiral centre and are non-superimposable mirror images. In each pair the atoms are joined in the same order.",
   "E- and Z-but-2-ene, and the two enantiomers of butan-2-ol with wedge and hash bonds.",
   ["E-but-2-ene: methyl groups on opposite sides of the double bond.", "Z-but-2-ene: methyl groups on the same side.",
    "(R)-butan-2-ol and (S)-butan-2-ol: mirror images at the carbon bearing OH."],
   perRow=[4, 2],
   panels=[P("C/[CH:1]=[CH:2]/C", "E-but-2-ene", ez={"1-2": "E"}), P("C/[CH:1]=[CH:2]\\C", "Z-but-2-ene", ez={"1-2": "Z"}),
           P("CC[C@@H:1](C)O", "(R)-butan-2-ol", cip={"1": "R"}), P("CC[C@H:1](C)O", "(S)-butan-2-ol", cip={"1": "S"})],
   claims=[{"type": "isomers", "panels": [0, 1]}, {"type": "enantiomers", "panels": [2, 3]}])

mk("u12-13", "chem-constitutional-c3h8o", "structures", "The constitutional isomers of C₃H₈O",
   "Three different connections of the same atoms: two alcohols and an ether. Their properties differ: propan-1-ol boils at 97 °C, propan-2-ol at 82 °C and methoxyethane at 7 °C, which has no O–H to hydrogen bond.",
   "Propan-1-ol, propan-2-ol and methoxyethane, each C₃H₈O.",
   ["Propan-1-ol: OH on the end carbon.", "Propan-2-ol: OH on the middle carbon.", "Methoxyethane: CH₃–O–CH₂CH₃."],
   panels=[P("CCCO", "propan-1-ol", formula="C3H8O", sub="bp 97 °C"), P("CC(C)O", "propan-2-ol", formula="C3H8O", sub="bp 82 °C"), P("CCOC", "methoxyethane", formula="C3H8O", groups=["ether"], sub="bp 7 °C")],
   claims=[{"type": "isomers"}])

mk("u12-14", "chem-butane-conformations", "graph", "Energy of butane as it rotates",
   "Rotating about the central C–C bond: the anti conformation (180°) is lowest; gauche (60°, 300°) is about 3.8 kJ mol⁻¹ higher; eclipsed forms are maxima, the fully eclipsed one (0°, methyls together) highest at about 19 kJ mol⁻¹.",
   "Energy against dihedral angle from 0 to 360 degrees: maxima at 0 and 360 (19 kJ/mol) and at 120 and 240 (about 15), minima at 60 and 300 (gauche, about 3.8) and at 180 (anti, 0).",
   ["Fully eclipsed at 0° and 360°: about 19 kJ mol⁻¹.", "Gauche minima at 60° and 300°: about 3.8 kJ mol⁻¹.", "Eclipsed maxima at 120° and 240°: about 15 kJ mol⁻¹.", "Anti at 180°: the lowest, 0."],
   range={"x": [0, 360], "y": [-2, 22]}, ticks=[[0, 60, 120, 180, 240, 300, 360], [0, 5, 10, 15, 20]], grid=[60, 5], height=[340, 300],
   axisLabels=["dihedral angle / °", "relative energy / kJ mol⁻¹"], xLabelBelow=True,
   curves=[{"expr": "9.5+2.533*cos(x*0.0174533)+6.967*cos(3*x*0.0174533)", "colour": "a1"}],
   points=[{"x": 0, "y": 19, "label": "fully eclipsed", "dx": 8, "dy": 4}, {"x": 60, "y": 3.8, "label": "gauche", "dy": 16, "anchor": "middle", "dx": 0},
           {"x": 180, "y": 0, "label": "anti", "dy": -14, "anchor": "middle", "dx": 0}, {"x": 120, "y": 15.2, "label": "eclipsed", "dy": -12, "anchor": "middle", "dx": 0}],
   checks=[{"type": "max", "expr": "9.5+2.533*cos(x*0.0174533)+6.967*cos(3*x*0.0174533)", "domain": [0, 359], "x": 0, "y": 19, "name": "the fully eclipsed form (0°) is the highest, 19 kJ mol⁻¹"},
           {"type": "point", "expr": "9.5+2.533*cos(x*0.0174533)+6.967*cos(3*x*0.0174533)", "x": 180, "y": 0, "name": "anti (180°) is the zero of energy"},
           {"type": "value", "expr": "9.5+2.533*cos(x*0.0174533)+6.967*cos(3*x*0.0174533)", "x": 60, "between": [3.5, 4.1], "name": "gauche is about 3.8 kJ mol⁻¹ above anti"}])

mk("u12-15", "chem-chirality", "structures", "A chiral centre: four different groups",
   "Butan-2-ol's second carbon carries H, OH, CH₃ and C₂H₅, four different groups, so the molecule is chiral. Propan-2-ol's central carbon has two identical CH₃ groups and is not.",
   "Butan-2-ol with its chiral carbon shaded, beside propan-2-ol, which has no chiral centre.",
   ["Butan-2-ol: the carbon bearing OH also carries H, CH₃ and CH₂CH₃, so it is a stereocentre.", "Propan-2-ol: the central carbon carries two CH₃ groups, so it is not."],
   panels=[P("CC[C@@H:1](C)O", "butan-2-ol", sub="1 chiral centre", chiralCentres=1, highlight=[{"group": "[CX4H1]([CH3])([CH2])[OH]", "colour": "a2", "check": False}]),
           P("CC(C)O", "propan-2-ol", sub="no chiral centre", chiralCentres=0)])

mk("u12-16", "chem-enantiomers-alanine", "structures", "The enantiomers of alanine",
   "(S)-alanine, the form in proteins, and (R)-alanine are mirror images that cannot be superimposed. They have the same melting point and solubility, and rotate plane-polarised light by equal amounts in opposite directions.",
   "(S)-alanine and (R)-alanine as mirror images with a dashed mirror line between them.",
   ["Left: (S)-alanine.", "Right: (R)-alanine, its mirror image.", "Same atoms, same connections, opposite arrangement at the central carbon."],
   between=["mirror"], panels=[P("C[C@H:1](N)C(=O)O", "(S)-alanine", cip={"1": "S"}, sub="L-alanine, in proteins"), P("C[C@@H:1](N)C(=O)O", "(R)-alanine", cip={"1": "R"}, sub="D-alanine")],
   claims=[{"type": "enantiomers"}])

mk("u12-17", "chem-diastereomers", "structures", "The stereoisomers of 2,3-dibromobutane",
   "Two stereocentres allow up to 2² = 4 stereoisomers, but here there are three. (2R,3R) and (2S,3S) are enantiomers. The (2R,3S) form has a mirror plane, so it is meso and achiral, and it is a diastereomer of each of the others.",
   "(2R,3R)-, (2S,3S)- and meso-2,3-dibromobutane.",
   ["(2R,3R)-2,3-dibromobutane.", "(2S,3S)-2,3-dibromobutane, its mirror image.", "meso-(2R,3S)-2,3-dibromobutane, identical to its own mirror image."],
   panels=[P("C[C@@H:1](Br)[C@@H:2](C)Br", "(2R,3R)", cip={"1": "R", "2": "R"}), P("C[C@H:1](Br)[C@H:2](C)Br", "(2S,3S)", cip={"1": "S", "2": "S"}),
           P("C[C@@H:1](Br)[C@H:2](C)Br", "meso (2R,3S)", cip={"1": "R", "2": "S"})],
   claims=[{"type": "enantiomers", "panels": [0, 1]}, {"type": "diastereomers", "panels": [0, 2]}, {"type": "meso", "panels": [2]}])

mk("u12-18", "chem-optical-activity", "structures", "Enantiomers rotate light oppositely",
   "(R)- and (S)-butan-2-ol rotate plane-polarised light by the same angle in opposite directions. A 50:50 racemic mixture shows no rotation, because the two effects cancel.",
   "The two enantiomers of butan-2-ol, labelled with opposite signs of optical rotation.",
   ["(S)-(+)-butan-2-ol rotates the plane clockwise.", "(R)-(−)-butan-2-ol rotates it anticlockwise by the same angle."],
   between=["mirror"], panels=[P("CC[C@H:1](C)O", "(S)-(+)-butan-2-ol", cip={"1": "S"}, sub="rotates clockwise (+13.5°)"), P("CC[C@@H:1](C)O", "(R)-(−)-butan-2-ol", cip={"1": "R"}, sub="anticlockwise (−13.5°)")],
   claims=[{"type": "enantiomers"}])

mk("u12-19", "chem-r-s", "structures", "Assigning R and S",
   "For bromochlorofluoromethane the priorities by atomic number are Br > Cl > F > H. With H pointing away, Br → Cl → F runs clockwise for (R) and anticlockwise for (S).",
   "(R)- and (S)-bromochlorofluoromethane with CIP labels.",
   ["(R)-CHBrClF: with H at the back, Br, Cl, F go clockwise.", "(S)-CHBrClF: the mirror image, anticlockwise."],
   between=["mirror"], panels=[P("Br[C@@H:1](Cl)F", "(R)-CHBrClF", cip={"1": "R"}, cipLabels=True, sub="Br > Cl > F > H"), P("Br[C@H:1](Cl)F", "(S)-CHBrClF", cip={"1": "S"}, cipLabels=True, sub="Br > Cl > F > H")],
   claims=[{"type": "enantiomers"}])

mk("u12-20", "chem-e-z", "structures", "E and Z where cis and trans fail",
   "In 1-bromo-1-chloropropene each carbon of the C=C carries two different groups, so cis/trans is ambiguous. By priority, Br beats Cl on one carbon and CH₃ beats H on the other: the two higher-priority groups together is Z, opposite is E.",
   "Z- and E-1-bromo-1-chloropropene.",
   ["Z isomer: Br and CH₃ on the same side of the double bond.", "E isomer: Br and CH₃ on opposite sides."],
   panels=[P("Cl/[C:1](Br)=[CH:2]/C", "Z isomer", ez={"1-2": "Z"}, sub="Br and CH₃ same side"), P("Cl/[C:1](Br)=[CH:2]\\C", "E isomer", ez={"1-2": "E"}, sub="Br and CH₃ opposite")],
   claims=[{"type": "isomers"}])

mk("u12-21", "chem-fgi-map", "flow", "Functional group interconversions",
   "A map of the A level reactions linking the main groups, with reagents on the arrows. Following it backwards from a target is how a synthesis is planned.",
   "A flow map: alkene to alcohol (steam, H₃PO₄), halogenoalkane to alcohol (NaOH(aq), heat), primary alcohol to aldehyde to carboxylic acid (acidified dichromate), secondary alcohol to ketone, acid and alcohol to ester.",
   ["Alkene → alcohol with steam and an H₃PO₄ catalyst.", "Halogenoalkane → alcohol with aqueous NaOH, heated.",
    "Primary alcohol → aldehyde (distil) → carboxylic acid (reflux), each with acidified potassium dichromate.", "Secondary alcohol → ketone with acidified dichromate.", "Carboxylic acid + alcohol → ester with an acid catalyst."],
   layout="grid", rowHeight=110, boxWidth=96,
   nodes=[{"id": "alkene", "label": "alkene", "col": 0, "row": 0}, {"id": "halo", "label": "halogenoalkane", "col": 0, "row": 1}, {"id": "alc", "label": "primary alcohol", "col": 1, "row": 0},
          {"id": "ald", "label": "aldehyde", "col": 2, "row": 0}, {"id": "acid", "label": "carboxylic acid", "col": 3, "row": 0}, {"id": "ester", "label": "ester", "col": 3, "row": 1},
          {"id": "sec", "label": "secondary alcohol", "col": 1, "row": 1}, {"id": "ket", "label": "ketone", "col": 2, "row": 1}],
   edges=[{"from": "alkene", "to": "alc", "label": "steam, H₃PO₄", "eq": "C2H4 + H2O → C2H5OH"}, {"from": "halo", "to": "alc", "label": "NaOH(aq), heat"},
          {"from": "alc", "to": "ald", "label": "K₂Cr₂O₇/H⁺, distil"}, {"from": "ald", "to": "acid", "label": "K₂Cr₂O₇/H⁺, reflux"},
          {"from": "sec", "to": "ket", "label": "K₂Cr₂O₇/H⁺"}, {"from": "acid", "to": "ester", "label": "alcohol, H⁺"}])

mk("u12-22", "chem-reaction-classes", "classify", "Classifying an organic reaction",
   "Ask what happens to the starting molecule. Two molecules joining into one is addition; a group swapped for another is substitution; a small molecule lost to form a double bond is elimination. Oxidation, reduction, condensation and hydrolysis are named by what is gained or lost.",
   "A decision tree: does the number of molecules fall? If yes, addition. If no, is one group replaced by another? If yes, substitution; if no, is a small molecule removed to leave a multiple bond? If yes, elimination; otherwise a rearrangement.",
   ["First question: do two reactant molecules become one product? Yes means addition, as in ethene + HBr.",
    "Otherwise: is one atom or group replaced by another? Yes means substitution, as in bromoethane + OH⁻.",
    "Otherwise: is a small molecule such as H₂O or HBr removed, leaving a double bond? Yes means elimination; if not, the atoms have rearranged."],
   start="q1", rowHeight=96,
   nodes={"q1": {"q": "Do two molecules join to make one product?", "yes": "add", "no": "q2"},
          "add": {"leaf": "Addition", "examples": ["ethene + HBr"], "tone": "a1"},
          "q2": {"q": "Is one atom or group replaced by another?", "yes": "sub", "no": "q3"},
          "sub": {"leaf": "Substitution", "examples": ["CH3CH2Br + OH-"], "tone": "a4"},
          "q3": {"q": "Is a small molecule lost, leaving a C=C?", "yes": "elim", "no": "rearr"},
          "elim": {"leaf": "Elimination", "examples": ["2-bromopropane → propene"], "tone": "a3"},
          "rearr": {"leaf": "Rearrangement", "examples": ["carbocation shift"], "tone": "a5"}})
