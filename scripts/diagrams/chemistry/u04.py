"""Unit 4, Chemical Bonding and Molecular Structure."""
from spec import mk

def A(id, el, x, y, **k):
    d = {"id": id, "el": el, "x": x, "y": y}; d.update(k); return d
def B(a, b, order=1, **k):
    d = {"a": a, "b": b, "order": order}; d.update(k); return d

mk("u04-01", "chem-bond-type", "classify", "Which kind of bond?",
   "A metal with a non-metal transfers electrons: ionic bonding. Metal atoms alone share a sea of delocalised electrons: metallic bonding. Non-metals share pairs of electrons: covalent bonding.",
   "A tree: is there a metal and a non-metal? Yes, ionic. No: only metals? Yes, metallic; no, covalent.",
   ["Metal and non-metal, such as NaCl or MgO: ionic.", "Only metals, such as Cu or Fe: metallic.", "Only non-metals, such as H₂O or CO₂: covalent."],
   start="q1", rowHeight=104,
   nodes={"q1": {"q": "Does it contain a metal and a non-metal?", "yes": "ionic", "no": "q2"},
          "ionic": {"leaf": "Ionic", "examples": ["NaCl", "MgO", "CaF2"], "kind": "ionic", "tone": "a3"},
          "q2": {"q": "Is it only metal atoms?", "yes": "met", "no": "cov"},
          "met": {"leaf": "Metallic", "examples": ["Cu", "Fe", "Na"], "kind": "metallic", "tone": "a1"},
          "cov": {"leaf": "Covalent", "examples": ["H2O", "CO2", "CH4"], "kind": "covalent", "tone": "a4"}})

mk("u04-02", "chem-ionic-nacl", "dotcross", "Ionic bonding in sodium chloride",
   "Sodium's single outer electron (cross) transfers to chlorine, which has seven (dots). Both ions end with full outer shells: Na⁺ (2, 8) and Cl⁻ (2, 8, 8). Only the outer shells are drawn.",
   "Dot-and-cross diagram: a sodium atom with one outer electron and a chlorine atom with seven, then the ions in brackets: Na⁺ with an empty outer shell, Cl⁻ with eight outer electrons, one of them a cross.",
   ["Before: Na with one cross in its outer shell; Cl with seven dots.", "After: [Na]⁺ with no outer electrons shown, and [Cl]⁻ with eight, seven dots and one cross."],
   also=["gcse:u05-04"], perRow=2, arrowBetween=True, keyDot="chlorine electron", keyCross="sodium electron",
   molecules=[{"label": "Na + Cl", "atoms": [A("na", "Na", -0.9, 0, single=True, singleAt=[0], mark="cross", incomplete=True), A("cl", "Cl", 0.9, 0, lone=3, single=True, singleAt=[180], loneAt=[-90, 0, 90], incomplete=True)]},
              {"label": "Na⁺ Cl⁻", "atoms": [A("na", "Na", -1.0, 0, charge=1, bracket=True, mark="cross"), A("cl", "Cl", 1.1, 0, lone=4, charge=-1, bracket=True, gained=True, loneAt=[-90, 0, 90, 180])]}])

mk("u04-03", "chem-covalent-water", "dotcross", "Covalent bonding in water and carbon dioxide",
   "Each bond is a shared pair, one electron from each atom. Water has two O–H bonds and two lone pairs on oxygen; carbon dioxide has two C=O double bonds, each sharing two pairs. Every atom ends with a full outer shell.",
   "Dot-and-cross diagrams of water (two shared pairs and two lone pairs on oxygen) and carbon dioxide (two double bonds, two lone pairs on each oxygen).",
   ["Water: oxygen shares one pair with each hydrogen and keeps two lone pairs: eight around oxygen, two around each hydrogen.",
    "Carbon dioxide: carbon shares two pairs with each oxygen; each oxygen keeps two lone pairs."],
   perRow=2, keyDot="oxygen electron", keyCross="hydrogen or carbon electron",
   molecules=[{"label": "H₂O", "atoms": [A("o", "O", 0, 0, lone=2, loneAt=[-135, -45]), A("h1", "H", -0.85, 0.75, mark="cross"), A("h2", "H", 0.85, 0.75, mark="cross")], "bonds": [B("o", "h1"), B("o", "h2")]},
              {"label": "CO₂", "atoms": [A("o1", "O", -1.05, 0, lone=2, loneAt=[-90, 90]), A("c", "C", 0, 0, mark="cross"), A("o2", "O", 1.05, 0, lone=2, loneAt=[-90, 90])], "bonds": [B("o1", "c", 2), B("c", "o2", 2)]}])

mk("u04-04", "chem-coordinate-ammonium", "dotcross", "A coordinate bond: ammonium",
   "Ammonia's lone pair on nitrogen is donated to an H⁺ ion, which has no electrons. Once formed, the coordinate bond is identical to the other three N–H bonds; the ion carries a +1 charge.",
   "Dot-and-cross diagram of the ammonium ion in brackets with a + charge: four shared pairs around nitrogen, one of them two nitrogen electrons.",
   ["Nitrogen in the centre with four hydrogens.", "Three N–H bonds each share a dot (N) and a cross (H).", "The fourth bond's pair is two dots, both from nitrogen: the coordinate bond.", "Square brackets with a + charge."],
   keyDot="nitrogen electron", keyCross="hydrogen electron",
   molecules=[{"label": "NH₄⁺", "bracket": True, "charge": 1, "atoms": [A("n", "N", 0, 0), A("h1", "H", 0, -1, mark="cross"), A("h2", "H", 1, 0, mark="cross"), A("h3", "H", 0, 1, mark="cross"), A("h4", "H", -1, 0, mark="cross")],
               "bonds": [B("n", "h1", dative="n"), B("n", "h2"), B("n", "h3"), B("n", "h4")]}])

mk("u04-05", "chem-metallic-bonding", "particles", "Metallic bonding",
   "A metal is a lattice of positive ions in a sea of delocalised electrons. The attraction between the ions and the electrons is the metallic bond; the mobile electrons carry charge and heat, and layers can slide without breaking it.",
   "A grid of sodium ions with free electrons scattered between them.",
   ["Rows of Na⁺ ions in a regular lattice.", "Small dots between them: the delocalised electrons, free to move."],
   species={"Na+": {"atoms": ["Na"], "charge": 1}, "e-": {"atoms": ["e"]}}, panelHeight=200,
   panels=[{"title": "sodium: Na⁺ ions and delocalised electrons", "arrangement": "lattice", "contents": [["Na+", 24]], "overlay": [["e-", 24]]}],
   claims=[{"type": "count", "panel": 0, "species": "Na+", "n": 24}, {"type": "classify", "panel": 0, "as": "element"}])

mk("u04-06", "chem-lewis-examples", "dotcross", "Lewis structures",
   "Lines are bonding pairs and dots lone pairs. NH₃ has three bonds and one lone pair on N; CO₂ two double bonds; HCN a single and a triple bond. Every atom except hydrogen has an octet.",
   "Lewis structures of ammonia, carbon dioxide and hydrogen cyanide.",
   ["NH₃: three N–H bonds and one lone pair on nitrogen.", "CO₂: O=C=O with two lone pairs on each oxygen.", "HCN: H–C≡N with one lone pair on nitrogen."],
   perRow=3, scale=[1, 0.9], rowHeight=[180, 150],
   molecules=[{"label": "NH₃", "style": "lewis", "atoms": [A("n", "N", 0, 0, lone=1, loneAt=[-90]), A("h1", "H", -0.9, 0.6), A("h2", "H", 0.9, 0.6), A("h3", "H", 0, 1.0)], "bonds": [B("n", "h1"), B("n", "h2"), B("n", "h3")]},
              {"label": "CO₂", "style": "lewis", "atoms": [A("o1", "O", -1, 0, lone=2, loneAt=[-90, 90]), A("c", "C", 0, 0), A("o2", "O", 1, 0, lone=2, loneAt=[-90, 90])], "bonds": [B("o1", "c", 2), B("c", "o2", 2)]},
              {"label": "HCN", "style": "lewis", "atoms": [A("h", "H", -1, 0), A("c", "C", 0, 0), A("n", "N", 1, 0, lone=1, loneAt=[0])], "bonds": [B("h", "c"), B("c", "n", 3)]}])

mk("u04-07", "chem-formal-charge-co2", "dotcross", "Choosing a Lewis structure by formal charge",
   "Formal charge = valence electrons − lone-pair electrons − ½ bonding electrons. O=C=O gives every atom zero. The alternative O≡C–O gives +1 and −1, so it is less favoured: the best structure keeps formal charges smallest.",
   "Two Lewis structures of CO₂: O=C=O with all formal charges zero, and O≡C–O with +1 on the triply bonded oxygen and −1 on the singly bonded one.",
   ["O=C=O: each oxygen has two lone pairs and a double bond: formal charges 0, 0, 0.", "O≡C–O: the triply bonded O has one lone pair (+1); the singly bonded O has three (−1)."],
   perRow=2, rowHeight=[170, 150],
   molecules=[{"label": "O=C=O (preferred)", "style": "lewis", "show": "formal", "atoms": [A("o1", "O", -1, 0, lone=2, loneAt=[-90, 90]), A("c", "C", 0, 0), A("o2", "O", 1, 0, lone=2, loneAt=[-90, 90])], "bonds": [B("o1", "c", 2), B("c", "o2", 2)], "claims": {"formal": {"o1": 0, "c": 0, "o2": 0}}},
              {"label": "O≡C–O", "style": "lewis", "show": "formal", "atoms": [A("o1", "O", -1, 0, lone=1, loneAt=[180]), A("c", "C", 0, 0), A("o2", "O", 1, 0, lone=3, loneAt=[-90, 0, 90])], "bonds": [B("o1", "c", 3), B("c", "o2", 1)], "claims": {"formal": {"o1": 1, "c": 0, "o2": -1}}}])

mk("u04-08", "chem-resonance-carbonate", "structures", "Resonance in the carbonate ion",
   "Three equivalent Lewis structures differ only in which oxygen carries the double bond. The real ion is a hybrid: the two negative charges and the π electrons are spread over all three C–O bonds, which are identical in length.",
   "Three structures of carbonate, each with the C=O to a different oxygen, joined by double-headed resonance arrows.",
   ["Each structure: carbon bonded to three oxygens, one by a double bond, two singly bonded oxygens each carrying a negative charge.", "The double bond is to a different oxygen in each."],
   between=["↔", "↔"], panels=[{"smiles": "O=C([O-])[O-]", "label": "", "formula": "CO3-2"}, {"smiles": "O=C([O-])[O-]", "label": "", "rotate": 120}, {"smiles": "O=C([O-])[O-]", "label": "", "rotate": 240}],
   note="The real ion is the average: each C–O bond is 1⅓ bonds and each O carries −⅔.",
   claims=[{"type": "same", "panels": [0, 1], "name": "the resonance forms have the same atoms joined the same way"}, {"type": "same", "panels": [1, 2], "name": "and so do the second and third"}])

mk("u04-09", "chem-vsepr-domains", "vsepr", "Electron domains and shapes",
   "Electron pairs repel and spread out as far as possible. With no lone pairs the shape follows the number of bonding domains: 2 linear (180°), 3 trigonal planar (120°), 4 tetrahedral (109.5°), 5 trigonal bipyramidal (90° and 120°), 6 octahedral (90°).",
   "Five molecules: BeCl₂ linear, BF₃ trigonal planar, CH₄ tetrahedral, PCl₅ trigonal bipyramidal and SF₆ octahedral.",
   ["BeCl₂: linear, 180°.", "BF₃: trigonal planar, 120°.", "CH₄: tetrahedral, 109.5°.", "PCl₅: trigonal bipyramidal, 90° and 120°.", "SF₆: octahedral, 90°."],
   perRow=3,
   molecules=[{"label": "BeCl2", "centre": "Be", "ligands": [{"el": "Cl"}] * 2, "shape": "linear", "angle": "180°", "showAngle": False},
              {"label": "BF3", "centre": "B", "ligands": [{"el": "F"}] * 3, "shape": "trigonal planar", "angle": "120°", "anglePair": [1, 2]},
              {"label": "CH4", "centre": "C", "ligands": [{"el": "H"}] * 4, "shape": "tetrahedral", "angle": "109.5°", "anglePair": [0, 1]},
              {"label": "PCl5", "centre": "P", "ligands": [{"el": "Cl"}] * 5, "shape": "trigonal bipyramidal", "angle": "90° and 120°", "showAngle": False},
              {"label": "SF6", "centre": "S", "ligands": [{"el": "F"}] * 6, "shape": "octahedral", "angle": "90°", "anglePair": [0, 2]}])

mk("u04-10", "chem-vsepr-lone-pairs", "vsepr", "Lone pairs close the bond angle",
   "Methane, ammonia and water all have four electron pairs arranged tetrahedrally. Lone pairs repel more strongly than bonding pairs, so each lone pair squeezes the bond angle by about 2.5°: 109.5° in CH₄, 107° in NH₃, 104.5° in H₂O.",
   "CH₄ tetrahedral at 109.5°, NH₃ trigonal pyramidal at 107° with one lone pair, H₂O bent at 104.5° with two lone pairs.",
   ["CH₄: four bonding pairs, tetrahedral, 109.5°.", "NH₃: three bonding pairs and one lone pair, trigonal pyramidal, 107°.", "H₂O: two bonding pairs and two lone pairs, bent, 104.5°."],
   molecules=[{"label": "CH4", "centre": "C", "ligands": [{"el": "H"}] * 4, "shape": "tetrahedral", "angle": "109.5°", "anglePair": [0, 1]},
              {"label": "NH3", "centre": "N", "ligands": [{"el": "H"}] * 3, "shape": "trigonal pyramidal", "angle": "107°", "anglePair": [0, 1]},
              {"label": "H2O", "centre": "O", "ligands": [{"el": "H"}] * 2, "shape": "bent", "angle": "104.5°", "anglePair": [0, 1]}])

mk("u04-11", "chem-bond-polarity", "dotcross", "Polar bonds",
   "Chlorine (3.16) and fluorine (3.98) are more electronegative than hydrogen (2.20), so they pull the shared pair towards themselves and become δ−, leaving hydrogen δ+.",
   "Lewis structures of HCl and HF with δ+ on hydrogen and δ− on the halogen.",
   ["H–Cl: hydrogen δ+, chlorine δ−, with three lone pairs on chlorine.", "H–F: hydrogen δ+, fluorine δ−, a more polar bond."],
   perRow=2, rowHeight=[150, 140],
   molecules=[{"label": "HCl", "sub": "difference 0.96", "style": "lewis", "atoms": [A("h", "H", -0.6, 0, delta="+"), A("cl", "Cl", 0.6, 0, lone=3, loneAt=[-90, 0, 90], delta="-")], "bonds": [B("h", "cl")], "claims": {"delta": {"h": "+", "cl": "-"}}},
              {"label": "HF", "sub": "difference 1.78", "style": "lewis", "atoms": [A("h", "H", -0.6, 0, delta="+"), A("f", "F", 0.6, 0, lone=3, loneAt=[-90, 0, 90], delta="-")], "bonds": [B("h", "f")], "claims": {"delta": {"h": "+", "f": "-"}}}])

mk("u04-12", "chem-molecular-polarity", "vsepr", "When bond dipoles cancel",
   "CO₂ and BF₃ have polar bonds, but their symmetrical shapes make the dipoles cancel: non-polar. In bent H₂O and pyramidal NH₃ the dipoles do not cancel, so the molecules are polar.",
   "Four shapes: CO₂ linear and BF₃ trigonal planar (non-polar); H₂O bent and NH₃ pyramidal (polar).",
   ["CO₂: linear, non-polar.", "BF₃: trigonal planar, non-polar.", "H₂O: bent, polar, δ− oxygen.", "NH₃: trigonal pyramidal, polar."],
   perRow=4,
   molecules=[{"label": "CO2", "centre": "C", "ligands": [{"el": "O", "order": 2}] * 2, "shape": "linear", "polar": False},
              {"label": "BF3", "centre": "B", "ligands": [{"el": "F"}] * 3, "shape": "trigonal planar", "polar": False},
              {"label": "H2O", "centre": "O", "ligands": [{"el": "H", "delta": "+"}] * 2, "centreDelta": "-", "shape": "bent", "polar": True},
              {"label": "NH3", "centre": "N", "ligands": [{"el": "H", "delta": "+"}] * 3, "centreDelta": "-", "shape": "trigonal pyramidal", "polar": True}])

EN2 = {"Li": 0.98, "Be": 1.57, "B": 2.04, "C": 2.55, "N": 3.04, "O": 3.44, "F": 3.98}
mk("u04-13", "chem-electronegativity-p2", "trend", "Electronegativity across period 2",
   "Electronegativity rises across period 2 from lithium (0.98) to fluorine (3.98), the most electronegative element. A large difference between two bonded atoms gives a polar or ionic bond.",
   "Bar chart of Pauling electronegativity from lithium 0.98 to fluorine 3.98.",
   ["Li 0.98, Be 1.57, B 2.04, C 2.55, N 3.04, O 3.44, F 3.98."],
   kind="bars", dataset="enPauling", range=[0, 4.2], ticks=[0, 1, 2, 3, 4], yLabel="Pauling electronegativity", colour="a1",
   items=[{"key": k, "value": v} for k, v in EN2.items()], highlight={"F": "a2"}, claims=[{"type": "increasing"}, {"type": "max", "key": "F"}])

mk("u04-14", "chem-imf-bp", "trend", "Hydrogen bonding raises boiling points",
   "Boiling points of the hydrides usually rise down a group as London forces grow. NH₃, H₂O and HF break the pattern: hydrogen bonding makes them boil far higher than the next hydride down. Water is highest of all, with two hydrogen bonds per molecule.",
   "Line graph of hydride boiling points for groups 14 to 17 against period; the group 14 line rises steadily, while groups 15, 16 and 17 start high at NH₃, H₂O and HF before dropping.",
   ["Group 14: CH₄ −162, SiH₄ −112, GeH₄ −88, SnH₄ −52 °C, rising steadily.", "Group 15: NH₃ −33, then PH₃ −88, AsH₃ −62, SbH₃ −17.",
    "Group 16: H₂O 100, then H₂S −60, H₂Se −41, H₂Te −2.", "Group 17: HF 20, then HCl −85, HBr −67, HI −35."],
   kind="series", dataset="bpHydrides", range=[-180, 120], ticks=[-150, -100, -50, 0, 50, 100], yLabel="boiling point / °C", xLabels=["period 2", "period 3", "period 4", "period 5"],
   series=[{"label": "group 14", "keys": ["CH4", "SiH4", "GeH4", "SnH4"], "colour": "a5", "values": {"CH4": -162, "SiH4": -112, "GeH4": -88, "SnH4": -52}},
           {"label": "group 15", "keys": ["NH3", "PH3", "AsH3", "SbH3"], "colour": "a4", "values": {"NH3": -33, "PH3": -88, "AsH3": -62, "SbH3": -17}, "labelDy": 10},
           {"label": "group 16", "keys": ["H2O", "H2S", "H2Se", "H2Te"], "colour": "a1", "values": {"H2O": 100, "H2S": -60, "H2Se": -41, "H2Te": -2}},
           {"label": "group 17", "keys": ["HF", "HCl", "HBr", "HI"], "colour": "a2", "values": {"HF": 20, "HCl": -85, "HBr": -67, "HI": -35}}],
   pointLabels=True,
   claims=[{"type": "max", "key": "H2O", "keys": ["CH4", "SiH4", "GeH4", "SnH4", "NH3", "PH3", "AsH3", "SbH3", "H2O", "H2S", "H2Se", "H2Te", "HF", "HCl", "HBr", "HI"]},
           {"type": "order", "keys": ["PH3", "NH3"]}, {"type": "order", "keys": ["H2S", "H2O"]}, {"type": "order", "keys": ["HCl", "HF"]}, {"type": "increasing", "keys": ["CH4", "SiH4", "GeH4", "SnH4"]}])

ALK = {"methane": -162, "ethane": -89, "propane": -42, "butane": -1, "pentane": 36, "hexane": 69, "heptane": 98, "octane": 126}
mk("u04-15", "chem-alkane-bp", "trend", "London forces grow with chain length",
   "Each extra CH₂ adds electrons and surface contact, so London forces between alkane molecules grow and boiling points rise: methane to butane are gases at room temperature, pentane to octane are liquids.",
   "Line graph of alkane boiling points rising from methane −162 °C to octane 126 °C.",
   ["Methane −162 °C, ethane −89, propane −42, butane −1.", "Pentane 36, hexane 69, heptane 98, octane 126 °C."],
   kind="line", dataset="bpAlkanes", range=[-200, 150], ticks=[-200, -100, 0, 100], yLabel="boiling point / °C", colour="a4",
   items=[{"key": k, "label": f"C{i + 1}", "value": v} for i, (k, v) in enumerate(ALK.items())], xTitle="carbon atoms in the chain", claims=[{"type": "increasing"}])

mk("u04-16", "chem-dipole-dipole", "dotcross", "Permanent dipole–dipole forces",
   "Each HCl molecule has a permanent dipole, H δ+ and Cl δ−. Neighbouring molecules line up so the δ+ end of one is near the δ− end of the next, an attraction on top of the London forces.",
   "Three HCl molecules in a row, δ+ hydrogen next to δ− chlorine of the next, joined by dashed attractions.",
   ["Three H–Cl molecules, each with δ+ on H and δ− on Cl.", "Dashed lines between the H of one and the Cl of the next."],
   rowHeight=[150, 150], scale=[1, 0.62],
   molecules=[{"label": "", "style": "lewis", "atoms": [A("h1", "H", -2.6, 0, delta="+"), A("c1", "Cl", -1.6, 0, lone=3, loneAt=[-90, 0, 90], delta="-"),
                                                       A("h2", "H", -0.4, 0, delta="+"), A("c2", "Cl", 0.6, 0, lone=3, loneAt=[-90, 0, 90], delta="-"),
                                                       A("h3", "H", 1.8, 0, delta="+"), A("c3", "Cl", 2.8, 0, lone=3, loneAt=[-90, 0, 90], delta="-")],
               "bonds": [B("h1", "c1"), B("h2", "c2"), B("h3", "c3")], "links": [{"a": "c1", "b": "h2", "dy": 18}, {"a": "c2", "b": "h3", "dy": 18}],
               "claims": {"delta": {"h1": "+", "c1": "-"}}}])

mk("u04-17", "chem-hydrogen-bond-water", "dotcross", "Hydrogen bonds between water molecules",
   "A hydrogen bonded to oxygen is strongly δ+ and is attracted to a lone pair on the oxygen of another molecule. The O–H···O arrangement is close to straight (180°). Each water molecule can make up to four hydrogen bonds.",
   "Three water molecules: a δ+ hydrogen of one points at a lone pair on the oxygen of the next, joined by dashed hydrogen bonds.",
   ["Left water molecule: one O–H points right towards the middle molecule's oxygen lone pair.", "Middle molecule: one O–H points to the right-hand molecule.", "Dashed lines mark the hydrogen bonds."],
   rowHeight=[200, 200], scale=[1, 0.62],
   molecules=[{"label": "", "style": "lewis", "atoms": [A("o1", "O", -2.6, 0, lone=2, loneAt=[-130, 130]), A("h1a", "H", -1.8, 0), A("h1b", "H", -2.95, -0.85),
                                                       A("o2", "O", -0.5, 0, lone=2, loneAt=[180, 120]), A("h2a", "H", 0.3, 0), A("h2b", "H", -0.5, -0.95),
                                                       A("o3", "O", 1.6, 0, lone=2, loneAt=[180, 120]), A("h3a", "H", 2.35, -0.45), A("h3b", "H", 1.6, -0.95)],
               "bonds": [B("o1", "h1a"), B("o1", "h1b"), B("o2", "h2a"), B("o2", "h2b"), B("o3", "h3a"), B("o3", "h3b")],
               "links": [{"a": "h1a", "b": "o2", "hbond": True, "label": "H bond", "dy": 20}, {"a": "h2a", "b": "o3", "hbond": True, "label": "H bond", "dy": 20}]}])

mk("u04-18", "chem-bond-enthalpy-methane", "cycle", "Bond enthalpies: burning methane",
   "Breaking every bond in CH₄ + 2O₂ to make free atoms takes 2648 kJ; forming the bonds in CO₂ + 2H₂O releases 3466 kJ. ΔH = 2648 − 3466 = −818 kJ mol⁻¹, from mean bond enthalpies.",
   "Enthalpy diagram: reactants, then up 2648 kJ to separate atoms, then down 3466 kJ to products, which lie 818 kJ below the reactants.",
   ["Reactants CH₄ + 2O₂ at the start.", "Up 2648 kJ to C + 4H + 4O: bonds broken, 4 C–H and 2 O=O.", "Down 3466 kJ to CO₂ + 2H₂O: bonds made, 2 C=O and 4 O–H.", "Net ΔH = −818 kJ mol⁻¹."],
   kind="levels", states=[{"id": "r", "label": "CH4 + 2O2"}, {"id": "a", "label": "C + 4H + 4O (gaseous atoms)"}, {"id": "p", "label": "CO2 + 2H2O"}],
   steps=[{"from": "r", "to": "a", "dh": 2648, "label": "bonds broken", "col": 0}, {"from": "a", "to": "p", "dh": -3466, "label": "bonds made", "col": 1}, {"from": "r", "to": "p", "dh": None, "label": "ΔH", "col": 2}],
   find={"step": 2, "value": -818},
   bonds=[{"step": 0, "list": [["C–H", 4, 413], ["O=O", 2, 498]]}, {"step": 1, "sign": -1, "list": [["C=O", 2, 805], ["O–H", 4, 464]]}],
   equations=["CH4 + 2O2 → CO2 + 2H2O"])

mk("u04-19", "chem-lattice-enthalpy-ions", "trend", "Lattice enthalpy and ion size",
   "Lattice enthalpy becomes less exothermic from NaF to NaI: the halide ions get larger, so the oppositely charged ions are further apart and attract less. Charge matters even more: MgO, with 2+ and 2− ions, is −3791 kJ mol⁻¹.",
   "Bar chart of lattice enthalpies: NaF −923, NaCl −787, NaBr −747, NaI −704 kJ/mol.",
   ["NaF −923 kJ mol⁻¹.", "NaCl −787.", "NaBr −747.", "NaI −704: the largest anion, the least exothermic."],
   kind="bars", dataset="latticeNaX", range=[-1000, 0], ticks=[-1000, -750, -500, -250, 0], yLabel="lattice enthalpy of formation / kJ mol⁻¹", colour="a3",
   items=[{"key": k, "value": v} for k, v in {"NaF": -923, "NaCl": -787, "NaBr": -747, "NaI": -704}.items()], claims=[{"type": "increasing"}])

mk("u04-20", "chem-born-haber-nacl", "cycle", "The Born–Haber cycle for sodium chloride",
   "From the elements, sodium and chlorine are atomised (+107, +122), sodium is ionised (+496) and chlorine gains an electron (−349). The gaseous ions then form the lattice. Since the two routes to NaCl(s) must agree, −411 = 107 + 122 + 496 − 349 + ΔlattH, so ΔlattH = −787 kJ mol⁻¹.",
   "Enthalpy level diagram rising from Na(s) + ½Cl₂(g) through atomisation and ionisation, falling for the electron affinity, then a long downward arrow for lattice formation to NaCl(s), which is 411 below the start.",
   ["Start: Na(s) + ½Cl₂(g) at zero.", "Up +107 to Na(g); up +122 to Na(g) + Cl(g); up +496 to Na⁺(g) + e⁻ + Cl(g).", "Down −349 to Na⁺(g) + Cl⁻(g).",
    "Down by the lattice enthalpy to NaCl(s), which is −411 below the start (the enthalpy of formation).", "So the lattice enthalpy is −787 kJ mol⁻¹."],
   kind="levels", height=[480, 560],
   states=[{"id": "e", "label": "Na(s) + ½Cl2(g)"}, {"id": "na", "label": "Na(g) + ½Cl2(g)"}, {"id": "cl", "label": "Na(g) + Cl(g)"},
           {"id": "ion", "label": "Na+(g) + e− + Cl(g)"}, {"id": "ions", "label": "Na+(g) + Cl−(g)"}, {"id": "s", "label": "NaCl(s)"}],
   steps=[{"from": "e", "to": "na", "dh": 107, "label": "ΔatH(Na)", "col": 1}, {"from": "na", "to": "cl", "dh": 122, "label": "ΔatH(Cl)", "col": 1},
          {"from": "cl", "to": "ion", "dh": 496, "label": "IE(Na)", "col": 1}, {"from": "ion", "to": "ions", "dh": -349, "label": "EA(Cl)", "col": 2},
          {"from": "ions", "to": "s", "dh": None, "label": "ΔlattH", "col": 3}, {"from": "e", "to": "s", "dh": -411, "label": "ΔfH", "col": 0}],
   find={"step": 4, "value": -787}, equations=["Na + ½Cl2 → NaCl"])

mk("u04-21", "chem-mo-o2", "levels", "Molecular orbitals of oxygen",
   "Filling the molecular orbitals of O₂ in order puts the last two electrons singly in the two π*2p orbitals. Bond order = (bonding − antibonding) ÷ 2 = 2, a double bond, and the two unpaired electrons make oxygen paramagnetic, which a Lewis structure cannot explain.",
   "MO diagram: 2s and 2p atomic orbitals of two oxygen atoms on each side; in the middle σ2s, σ*2s, σ2p, π2p (two), π*2p (two, each with one electron) and σ*2p empty.",
   ["σ2s and σ*2s: both full.", "σ2p full, then both π2p orbitals full.", "π*2p: one electron in each of the two orbitals, parallel spins.", "σ*2p empty. Bond order 2; two unpaired electrons."],
   kind="mo", molecule="O2", bondOrder=2, unpaired=2)

mk("u04-22", "chem-hybridisation-sp3", "levels", "sp³ hybridisation in carbon",
   "Carbon's 2s and three 2p orbitals mix into four equivalent sp³ hybrids of equal energy, each holding one electron, which point to the corners of a tetrahedron and form four identical bonds, as in methane.",
   "Energy diagram: one 2s level and three higher 2p levels on the left; four equal sp³ levels between them on the right.",
   ["Left: 2s lower, three 2p orbitals higher.", "Right: four sp³ orbitals at one energy in between.", "Four orbitals in, four out."],
   kind="custom", height=[280, 300],
   levels=[{"id": "s", "label": "2s", "E": 0, "x0": 0.1, "x1": 0.22}] + [{"id": f"p{i}", "label": "2p" if i == 0 else "", "E": 3, "x0": 0.1 + i * 0.14, "x1": 0.22 + i * 0.14} for i in range(3)]
          + [{"id": f"h{i}", "label": "", "E": 2.25, "x0": 0.6 + i * 0.1, "x1": 0.68 + i * 0.1} for i in range(4)],
   notes=[{"x": 0.75, "E": 2.25, "dy": -18, "text": "four sp³ hybrids", "bold": True, "colour": "a2"}, {"x": 0.25, "E": 0, "dy": 18, "text": "atomic orbitals"}],
   transitions=[{"from": "s", "to": "h0", "x": 0.45, "label": "mix", "colour": "a5", "dash": "5 4"}],
   claims=[{"type": "conserve", "name": "four atomic orbitals (one 2s, three 2p) give four hybrids", "before": 4, "after": 4}])

mk("u04-23", "chem-sigma-pi", "lobes", "σ and π bonds in ethene",
   "The C=C in ethene is one σ bond, from end-on overlap along the axis, and one π bond, from sideways overlap of the two p orbitals above and below the plane. The π bond is weaker and stops rotation about the double bond.",
   "Two carbon atoms joined by a σ bond along the axis, each with a vertical p orbital; the p orbitals overlap above and below to form the π bond.",
   ["The σ bond: a line along the C–C axis.", "Each carbon also has two bonds to hydrogen, in the plane.", "Above and below: the two p orbitals overlapping sideways to form the π bond."],
   kind="sigma-pi", sigma=1, pi=1)

mk("u04-25", "chem-nacl-lattice", "lattice", "Ionic lattices: sodium chloride and caesium chloride",
   "In NaCl each ion has six nearest neighbours of the opposite charge (6:6), and the cubic cell holds four of each. The larger Cs⁺ fits eight Cl⁻ around it in CsCl (8:8). The cation-to-anion size ratio decides the structure.",
   "Two unit cells: sodium chloride, with alternating Na⁺ and Cl⁻ at every half-step; caesium chloride, with Cl⁻ at the corners and Cs⁺ at the centre.",
   ["Sodium chloride: ions alternate along every edge; each has six nearest neighbours of the other kind.", "Caesium chloride: one Cs⁺ at the body centre surrounded by eight Cl⁻ at the corners."],
   cells=[{"kind": "nacl", "label": "sodium chloride (6:6)", "species": {"A": {"label": "Na+", "colour": "#8e5bd6", "r": 8}, "B": {"label": "Cl-", "colour": "#2fa84f", "r": 12}},
           "claims": {"coordination": {"A": 6, "B": 6}, "perCell": {"A": 4, "B": 4}, "formula": {"A": 1, "B": 1}}},
          {"kind": "cscl", "label": "caesium chloride (8:8)", "species": {"A": {"label": "Cs+", "colour": "#b05bd6", "r": 13}, "B": {"label": "Cl-", "colour": "#2fa84f", "r": 11}},
           "claims": {"coordination": {"A": 8, "B": 8}, "perCell": {"A": 1, "B": 1}, "formula": {"A": 1, "B": 1}}}])

mk("u04-26", "chem-solid-types", "classify", "Classifying solids by bonding",
   "Ionic solids are metal with non-metal; metallic solids are metals. Non-metal solids are either giant covalent networks (diamond, silicon dioxide), with very high melting points, or simple molecular solids (ice, iodine), where only weak forces between molecules have to be overcome.",
   "A tree: contains a metal and a non-metal? Ionic. Only metal? Metallic. Otherwise: one giant network of covalent bonds? Giant covalent; if not, simple molecular.",
   ["Metal and non-metal: ionic, such as NaCl.", "Metal only: metallic, such as Cu.", "Non-metals in a continuous network: giant covalent, such as diamond (C) and SiO₂.", "Non-metals as separate molecules: simple molecular, such as H₂O and I₂."],
   start="q1", rowHeight=100,
   nodes={"q1": {"q": "Metal and non-metal together?", "yes": "ion", "no": "q2"}, "ion": {"leaf": "Ionic lattice", "examples": ["NaCl", "MgO"], "kind": "ionic", "tone": "a3"},
          "q2": {"q": "Metal atoms only?", "yes": "met", "no": "q3"}, "met": {"leaf": "Metallic lattice", "examples": ["Cu", "Fe"], "kind": "metallic", "tone": "a1"},
          "q3": {"q": "One continuous network of covalent bonds?", "yes": "gc", "no": "sm"}, "gc": {"leaf": "Giant covalent", "examples": ["C", "SiO2"], "kind": "covalent", "tone": "a5"},
          "sm": {"leaf": "Simple molecular", "examples": ["H2O", "I2", "CO2"], "kind": "covalent", "tone": "a4"}})
