"""Units 11 (inorganic) and 15 (analysis and spectroscopy)."""
import math
from spec import mk

def P(smiles, label, **k):
    d = {"smiles": smiles, "label": label}; d.update(k); return d

# ---------------------------------------------------------------- unit 11
mk("u11-02", "chem-main-group-oxides", "trend", "Period 3 oxides in water",
   "Across period 3 the oxides change from basic to acidic. Na₂O and MgO give alkaline solutions; Al₂O₃ and SiO₂ do not dissolve (Al₂O₃ is amphoteric); P₄O₁₀ and SO₃ react to give strongly acidic solutions. Typical pH values.",
   "Bar chart of the typical pH when each period 3 oxide is added to water: Na₂O 14, MgO 9, Al₂O₃ 7, SiO₂ 7, P₄O₁₀ 0, SO₃ 0.",
   ["Na₂O: about pH 14 (NaOH forms).", "MgO: about pH 9 (slightly soluble Mg(OH)₂).", "Al₂O₃ and SiO₂: insoluble, pH 7.", "P₄O₁₀ and SO₃: about pH 0 (H₃PO₄ and H₂SO₄ form)."],
   kind="bars", range=[0, 14], ticks=[0, 7, 14], yLabel="typical pH of the mixture",
   items=[{"key": k, "value": v} for k, v in [("Na2O", 14), ("MgO", 9), ("Al2O3", 7), ("SiO2", 7), ("P4O10", 0.5), ("SO3", 0.5)]],
   highlight={"Na2O": "a1", "MgO": "a1", "Al2O3": "a5", "SiO2": "a5", "P4O10": "a2", "SO3": "a2"},
   claims=[{"type": "order", "keys": ["MgO", "Na2O"]}, {"type": "order", "keys": ["P4O10", "Al2O3", "MgO"]}])

mk("u11-03", "chem-group2-solubility", "trend", "Group 2 sulfates become less soluble",
   "Down group 2 the sulfates become less soluble: Ksp falls from 4.9 × 10⁻⁵ for CaSO₄ to 1.1 × 10⁻¹⁰ for BaSO₄, which is why acidified BaCl₂ is the test for sulfate. The hydroxides show the opposite trend.",
   "Bar chart of log₁₀ Ksp for calcium, strontium and barium sulfates, falling from −4.31 to −9.97.",
   ["CaSO₄: log Ksp −4.31.", "SrSO₄: −6.46.", "BaSO₄: −9.97, the least soluble."],
   kind="bars", dataset="logKspSulfate", range=[-11, 0], ticks=[-10, -8, -6, -4, -2, 0], yLabel="log₁₀ Ksp", colour="a5",
   items=[{"key": k, "value": v} for k, v in [("CaSO4", -4.31), ("SrSO4", -6.46), ("BaSO4", -9.97)]], claims=[{"type": "decreasing"}])

mk("u11-04", "chem-p-block-oxides", "structures", "Two p-block oxides",
   "Phosphorus(V) oxide, P₄O₁₀, is a cage of four tetrahedral phosphorus atoms bridged by oxygens, each also double-bonded to one oxygen. Sulfur trioxide, SO₃, is a trigonal planar molecule. Both react with water to give strong acids.",
   "The P₄O₁₀ cage and the SO₃ molecule.",
   ["P₄O₁₀: four P atoms, six bridging O atoms and four terminal P=O.", "SO₃: sulfur double-bonded to three oxygens, trigonal planar."],
   panels=[P("O=P12OP3(=O)OP(=O)(O1)OP(=O)(O2)O3", "P₄O₁₀", formula="O10P4"), P("O=S(=O)=O", "SO₃", formula="O3S")])

mk("u11-05", "chem-tm-configs", "orbitals", "The first transition series",
   "Across the series 3d fills behind 4s². A transition metal forms at least one ion with a partly filled d sub-shell: so scandium (Sc³⁺ is d⁰) and zinc (Zn²⁺ is d¹⁰) are d-block elements but not transition metals.",
   "Box diagrams of 3d and 4s for titanium, manganese, iron, copper and zinc.",
   ["Ti [Ar] 3d² 4s².", "Mn [Ar] 3d⁵ 4s²: five unpaired d electrons.", "Fe [Ar] 3d⁶ 4s².", "Cu [Ar] 3d¹⁰ 4s¹: the exception.", "Zn [Ar] 3d¹⁰ 4s²: full 3d."],
   rows=[{"symbol": s, "label": l, "config": c, "show": ["3d", "4s"], "core": ["1s", "2s", "2p", "3s", "3p"], "unpaired": u}
         for s, l, c, u in [("Ti", "Ti, [Ar] 3d² 4s²", "[Ar] 3d2 4s2", 2), ("Mn", "Mn, [Ar] 3d⁵ 4s²", "[Ar] 3d5 4s2", 5), ("Fe", "Fe, [Ar] 3d⁶ 4s²", "[Ar] 3d6 4s2", 4),
                            ("Cu", "Cu, [Ar] 3d¹⁰ 4s¹", "[Ar] 3d10 4s1", 1), ("Zn", "Zn, [Ar] 3d¹⁰ 4s²", "[Ar] 3d10 4s2", 0)]])

mk("u11-06", "chem-complex-shapes", "vsepr", "Shapes of complex ions",
   "Six ligands give an octahedral complex (90°), four usually tetrahedral (109.5°); d⁸ ions such as Ni²⁺, Pd²⁺ and Pt²⁺ with strong-field ligands form square planar complexes (90°).",
   "Three complexes: octahedral [Fe(H₂O)₆]²⁺, tetrahedral [CoCl₄]²⁻ and square planar [Ni(CN)₄]²⁻.",
   ["[Fe(H₂O)₆]²⁺: octahedral.", "[CoCl₄]²⁻: tetrahedral.", "[Ni(CN)₄]²⁻: square planar."],
   molecules=[{"label": "[Fe(H2O)6]^2+", "centre": "Fe", "complex": True, "ligands": [{"el": "OH2"}] * 6, "shape": "octahedral", "angle": "90°", "anglePair": [0, 2]},
              {"label": "[CoCl4]^2-", "centre": "Co", "complex": True, "ligands": [{"el": "Cl"}] * 4, "shape": "tetrahedral", "angle": "109.5°", "anglePair": [0, 1]},
              {"label": "[Ni(CN)4]^2-", "centre": "Ni", "complex": True, "ligands": [{"el": "CN"}] * 4, "shape": "square planar", "angle": "90°", "anglePair": [0, 2]}])

mk("u11-07", "chem-ligands-denticity", "structures", "Ligands by denticity",
   "A ligand donates a lone pair to the metal. Ammonia donates one (monodentate); ethane-1,2-diamine and ethanedioate donate two (bidentate); EDTA⁴⁻ donates six (hexadentate), wrapping round the metal ion. Multidentate ligands form more stable complexes (the chelate effect).",
   "Ammonia, ethane-1,2-diamine, ethanedioate and EDTA⁴⁻ with their donor atoms.",
   ["NH₃: one donor nitrogen.", "Ethane-1,2-diamine: two nitrogens.", "Ethanedioate: two oxygens.", "EDTA⁴⁻: two nitrogens and four oxygens."],
   perRow=[4, 2], bond=[28, 26],
   panels=[P("N", "NH₃", sub="monodentate", displayed=True), P("NCCN", "en", sub="bidentate", groups=["primary amine"]), P("O=C([O-])C(=O)[O-]", "ethanedioate", sub="bidentate", groups=["carboxylate"]),
           P("[O-]C(=O)CN(CC(=O)[O-])CCN(CC(=O)[O-])CC(=O)[O-]", "EDTA⁴⁻", sub="hexadentate", formula="C10H12N2O8")])

mk("u11-08", "chem-coordination-numbers", "vsepr", "Coordination numbers 2, 4 and 6",
   "The coordination number is the number of coordinate bonds to the central metal ion. Small ligands such as NH₃ and H₂O usually give 6; large ones such as Cl⁻ give 4; Ag⁺ forms linear complexes with 2, as in Tollens' reagent.",
   "Linear [Ag(NH₃)₂]⁺, tetrahedral [CuCl₄]²⁻ and octahedral [Co(NH₃)₆]³⁺.",
   ["[Ag(NH₃)₂]⁺: 2, linear.", "[CuCl₄]²⁻: 4, tetrahedral.", "[Co(NH₃)₆]³⁺: 6, octahedral."],
   molecules=[{"label": "[Ag(NH3)2]^+", "centre": "Ag", "complex": True, "ligands": [{"el": "NH3"}] * 2, "shape": "linear", "sub": "coordination number 2"},
              {"label": "[CuCl4]^2-", "centre": "Cu", "complex": True, "ligands": [{"el": "Cl"}] * 4, "shape": "tetrahedral", "sub": "coordination number 4"},
              {"label": "[Co(NH3)6]^3+", "centre": "Co", "complex": True, "ligands": [{"el": "NH3"}] * 6, "shape": "octahedral", "sub": "coordination number 6"}])

mk("u11-09", "chem-cis-trans-platin", "vsepr", "Cis-platin and trans-platin",
   "Pt(NH₃)₂Cl₂ is square planar, so it has two isomers. In cisplatin the two chlorides are next to each other (90°); in the trans isomer they are opposite (180°). Only cisplatin is an anticancer drug: it binds two neighbouring bases on one DNA strand.",
   "Two square planar platinum complexes: cis, with the chlorides at 90°, and trans, with them at 180°.",
   ["Cisplatin: Cl and Cl on adjacent corners of the square.", "Transplatin: Cl and Cl on opposite corners."],
   molecules=[{"label": "cisplatin", "centre": "Pt", "complex": True, "shape": "square planar", "isomer": "cis", "isomerLigand": "Cl", "ligands": [{"el": "Cl"}, {"el": "NH3"}, {"el": "Cl"}, {"el": "NH3"}], "sub": "Cl–Pt–Cl 90°"},
              {"label": "transplatin", "centre": "Pt", "complex": True, "shape": "square planar", "isomer": "trans", "isomerLigand": "Cl", "ligands": [{"el": "Cl"}, {"el": "Cl"}, {"el": "NH3"}, {"el": "NH3"}], "sub": "Cl–Pt–Cl 180°"}])

mk("u11-10", "chem-cfs-octahedral", "levels", "Splitting of the d orbitals in an octahedral complex",
   "Six ligands approaching along the axes repel the d orbitals that point at them (eg: dz² and dx²−y²) more than those between the axes (t₂g). The gap is Δo. Ti³⁺ (d¹) puts its single electron in t₂g; absorbing light promotes it to eg.",
   "Energy diagram: two eg orbitals above three t₂g orbitals, with the gap Δo; one electron in t₂g for Ti³⁺.",
   ["Upper: eg, two orbitals.", "Lower: t₂g, three orbitals, holding one electron for Ti³⁺.", "The gap between them is Δo."],
   kind="cfs", panels=[{"metal": "Ti", "ox": 3, "d": 1, "unpaired": 1, "moment": 1.73, "title": "[Ti(H₂O)₆]³⁺, d¹"}])

mk("u11-11", "chem-high-low-spin", "levels", "High-spin and low-spin d⁶",
   "Fe²⁺ is d⁶. With weak-field water, Δo is smaller than the energy needed to pair electrons, so they spread out: high spin, four unpaired. With strong-field cyanide, Δo is large and all six pair in t₂g: low spin, none unpaired.",
   "Two octahedral splitting diagrams for Fe²⁺: [Fe(H₂O)₆]²⁺ high spin with four unpaired electrons, [Fe(CN)₆]⁴⁻ low spin with none.",
   ["[Fe(H₂O)₆]²⁺: t₂g with one pair and two singles, eg with two singles: four unpaired.", "[Fe(CN)₆]⁴⁻: t₂g fully paired, eg empty: none unpaired, diamagnetic."],
   kind="cfs", panels=[{"metal": "Fe", "ox": 2, "spin": "high", "d": 6, "unpaired": 4, "moment": 4.9, "title": "[Fe(H₂O)₆]²⁺ high spin"},
                       {"metal": "Fe", "ox": 2, "spin": "low", "d": 6, "unpaired": 0, "moment": 0, "title": "[Fe(CN)₆]⁴⁻ low spin"}])

mk("u11-12", "chem-magnetism-unpaired", "levels", "Unpaired electrons and magnetism",
   "Each unpaired electron adds to the magnetic moment: the spin-only value is μ = √(n(n + 2)) μB. High-spin Mn²⁺ (d⁵) has five, μ = 5.92; Cu²⁺ (d⁹) has one, 1.73; Zn²⁺ (d¹⁰) none, so it is diamagnetic.",
   "Three splitting diagrams: Mn²⁺ with five unpaired electrons, Cu²⁺ with one, Zn²⁺ with none.",
   ["Mn²⁺ d⁵ high spin: one electron in each d orbital, μ = 5.92 μB.", "Cu²⁺ d⁹: one unpaired, 1.73 μB.", "Zn²⁺ d¹⁰: all paired, diamagnetic."],
   kind="cfs", panels=[{"metal": "Mn", "ox": 2, "spin": "high", "d": 5, "unpaired": 5, "moment": 5.92, "title": "Mn²⁺ d⁵"}, {"metal": "Cu", "ox": 2, "d": 9, "unpaired": 1, "moment": 1.73, "title": "Cu²⁺ d⁹"},
                       {"metal": "Zn", "ox": 2, "d": 10, "unpaired": 0, "moment": 0, "title": "Zn²⁺ d¹⁰"}])

mk("u11-13", "chem-colour-dd", "levels", "Why copper(II) solutions are blue",
   "In [Cu(H₂O)₆]²⁺ an electron is promoted from t₂g to eg by absorbing light near 800 nm (red and orange), about 150 kJ mol⁻¹. The light transmitted is the complementary colour, so the solution looks pale blue. Changing the ligand changes Δo and so the colour.",
   "Energy diagram: t₂g and eg levels with an upward arrow labelled absorbs about 800 nm, and a note that the complementary blue is transmitted.",
   ["Lower level t₂g, upper eg.", "Arrow up: a photon of about 800 nm absorbed, ΔE = hc/λ ≈ 150 kJ mol⁻¹.", "The remaining light looks blue."],
   kind="custom", height=[260, 280], axisLabel="energy",
   levels=[{"id": "t", "label": "t_{2g}", "E": 0, "x0": 0.2, "x1": 0.5}, {"id": "e", "label": "e_{g}", "E": 1, "x0": 0.2, "x1": 0.5}],
   transitions=[{"from": "t", "to": "e", "x": 0.36, "label": "absorbs ≈ 800 nm (red), 150 kJ mol⁻¹", "colour": "a2"}],
   notes=[{"x": 0.2, "E": 0, "dy": 30, "anchor": "start", "text": "the light left over looks blue", "bold": True, "colour": "a1"}],
   claims=[{"type": "photon", "nm": 800, "kj": 149.5}])

mk("u11-14", "chem-mn-oxidation-states", "trend", "The oxidation states of manganese",
   "Manganese shows every state from +2 to +7, because its 4s and 3d electrons are close in energy. Each compound's oxidation state follows from its formula: Mn²⁺ +2, Mn₂O₃ +3, MnO₂ +4, MnO₄²⁻ +6, MnO₄⁻ +7 (purple manganate(VII)).",
   "Bar chart of manganese oxidation states in Mn²⁺, Mn₂O₃, MnO₂, MnO₄²⁻ and MnO₄⁻, rising from +2 to +7.",
   ["Mn²⁺: +2 (pale pink).", "Mn₂O₃: +3.", "MnO₂: +4 (black).", "MnO₄²⁻: +6 (green).", "MnO₄⁻: +7 (purple)."],
   kind="bars", range=[0, 8], ticks=[0, 2, 4, 6, 8], yLabel="oxidation state of Mn",
   items=[{"key": k, "label": l, "value": v} for k, l, v in [("a", "Mn^2+", 2), ("b", "Mn2O3", 3), ("c", "MnO2", 4), ("d", "MnO4^2-", 6), ("e", "MnO4^-", 7)]],
   highlight={"a": "#f9a8d4", "b": "#a16207", "c": "#3a3f4b", "d": "#16a34a", "e": "#7c3aed"},
   claims=[{"type": "increasing"}, {"type": "oxstate", "element": "Mn", "formulae": {"a": "Mn^2+", "b": "Mn2O3", "c": "MnO2", "d": "MnO4^2-", "e": "MnO4^-"}}])

mk("u11-15", "chem-ferrocene", "structures", "The pieces of ferrocene",
   "Ferrocene, Fe(C₅H₅)₂, is a sandwich: an iron(II) ion between two cyclopentadienide rings. Each aromatic C₅H₅⁻ ring donates six π electrons, and Fe²⁺ (d⁶) brings six, giving the stable 18-electron count.",
   "Two cyclopentadienide anions and an iron(II) ion, the components of ferrocene.",
   ["Two C₅H₅⁻ rings, each aromatic with six π electrons.", "Fe²⁺ (d⁶), held between them in ferrocene: 6 + 6 + 6 = 18 electrons."],
   between=["+", "+"], panels=[P("[cH-]1cccc1", "C₅H₅⁻", formula="C5H5"), P("[Fe+2]", "Fe²⁺", formula="Fe"), P("[cH-]1cccc1", "C₅H₅⁻", formula="C5H5")])

mk("u11-16", "chem-hydrogenation-cycle", "flow", "A catalytic cycle for hydrogenation",
   "A rhodium catalyst such as Wilkinson's adds H₂ (oxidative addition), binds the alkene, transfers a hydride to it (migratory insertion) and releases the alkane (reductive elimination), regenerating itself. [Rh] stands for the metal with its other ligands.",
   "A four-step cycle: [Rh] + H₂ → [Rh]H₂; + C₂H₄ → alkene complex; insertion → [Rh](H)(C₂H₅); elimination of C₂H₆ returns [Rh].",
   ["Oxidative addition: [Rh] + H₂ → [Rh]H₂.", "Alkene binds: [Rh]H₂ + C₂H₄ → [Rh]H₂(C₂H₄).", "Migratory insertion: → [Rh]H(C₂H₅).", "Reductive elimination: → [Rh] + C₂H₆, the catalyst regenerated."],
   layout="cycle", radius=120, boxWidth=110,
   nodes=[{"id": "a", "label": "[Rh]", "tone": "a1"}, {"id": "b", "label": "[Rh]H₂"}, {"id": "c", "label": "[Rh]H₂(C₂H₄)"}, {"id": "d", "label": "[Rh]H(C₂H₅)"}],
   edges=[{"from": "a", "to": "b", "label": "+ H₂"}, {"from": "b", "to": "c", "label": "+ C₂H₄"}, {"from": "c", "to": "d", "label": "insertion"}, {"from": "d", "to": "a", "label": "− C₂H₆"}],
   centre="net: C₂H₄ + H₂ → C₂H₆",
   claims=[{"type": "net", "steps": ["Rh + H2 → RhH2", "RhH2 + C2H4 → RhH2C2H4", "RhH2C2H4 → RhHC2H5", "RhHC2H5 → Rh + C2H6"], "net": "C2H4 + H2 → C2H6"},
           {"type": "regenerated", "species": "Rh", "steps": ["Rh + H2 → RhH2", "RhH2 + C2H4 → RhH2C2H4", "RhH2C2H4 → RhHC2H5", "RhHC2H5 → Rh + C2H6"]}])

eC, eF = "-221-0.179*x", "-528+0.130*x"
Tx = (528 - 221) / (0.179 + 0.130)
mk("u11-17", "chem-ellingham", "graph", "An Ellingham diagram: when carbon reduces iron oxide",
   f"ΔG° per mole of O₂ against temperature. Forming CO gets more favourable as T rises (its line slopes down, ΔS > 0), while forming FeO gets less favourable. Above the crossing, about {round(Tx)} K, carbon's line is lower, so carbon can reduce FeO.",
   "Two lines of ΔG° against temperature: 2C + O₂ → 2CO falling, 2Fe + O₂ → 2FeO rising; they cross near 990 K.",
   ["2C + O₂ → 2CO: ΔG° = −221 − 0.179T kJ, falling.", "2Fe + O₂ → 2FeO: ΔG° = −528 + 0.130T kJ, rising.", f"They cross at about {round(Tx)} K; above it carbon reduces FeO."],
   range={"x": [300, 2000], "y": [-650, -150]}, ticks=[[500, 1000, 1500, 2000], [-600, -500, -400, -300, -200]], grid=[250, 100], axisLabels=["T / K", "ΔG° / kJ per mol O₂"], xLabelBelow=True,
   curves=[{"expr": eC, "colour": "a1", "label": "2C + O₂ → 2CO", "labelAt": [1500, -520]}, {"expr": eF, "colour": "a3", "label": "2Fe + O₂ → 2FeO", "labelAt": [1450, -300]}],
   bands=[{"x": [Tx, 2000], "label": "carbon reduces FeO", "colour": "good"}],
   checks=[{"type": "intersect", "a": eC, "b": eF, "x": round(Tx, 4), "y": round(-221 - 0.179 * Tx, 4), "name": f"the lines cross at {round(Tx)} K"}, {"type": "order", "a": eC, "b": eF, "x": 1500, "rel": "<", "name": "at 1500 K the carbon line is lower: C can reduce FeO"}])

mk("u11-18", "chem-contact-process", "flow", "The Contact process",
   "Sulfur is burned to SO₂, which is oxidised to SO₃ over a vanadium(V) oxide catalyst at about 450 °C and 1–2 atm. SO₃ is absorbed in concentrated sulfuric acid (not water, which would make a mist) and then diluted.",
   "A flow: S → SO₂ → SO₃ (V₂O₅, 450 °C) → H₂S₂O₇ (with H₂SO₄) → H₂SO₄ (with water).",
   ["S + O₂ → SO₂.", "2SO₂ + O₂ ⇌ 2SO₃, V₂O₅ catalyst, 450 °C.", "SO₃ + H₂SO₄ → H₂S₂O₇ (oleum).", "H₂S₂O₇ + H₂O → 2H₂SO₄."],
   layout="line", nodes=[{"id": "s", "label": "S"}, {"id": "a", "label": "SO₂"}, {"id": "b", "label": "SO₃", "tone": "a3"}, {"id": "c", "label": "H₂S₂O₇"}, {"id": "d", "label": "H₂SO₄", "tone": "a1"}],
   edges=[{"from": "s", "to": "a", "label": "+ O₂", "eq": "S + O2 → SO2"}, {"from": "a", "to": "b", "label": "V₂O₅, 450 °C", "eq": "2SO2 + O2 → 2SO3"},
          {"from": "b", "to": "c", "label": "+ H₂SO₄", "eq": "SO3 + H2SO4 → H2S2O7"}, {"from": "c", "to": "d", "label": "+ H₂O", "eq": "H2S2O7 + H2O → 2H2SO4"}])

mk("u11-19", "chem-haem", "vsepr", "The iron centre of haem",
   "In haemoglobin, Fe²⁺ sits in an octahedral site: four nitrogens of the flat porphyrin ring, one histidine nitrogen below, and O₂ bound above. Carbon monoxide binds the same site about 200 times more strongly, which is why it is poisonous.",
   "An octahedral iron ion with four porphyrin nitrogens around it, histidine below and O₂ above.",
   ["Four N of the porphyrin in the equatorial plane.", "Histidine N below.", "O₂ above, in the sixth position."],
   molecules=[{"label": "Fe²⁺ in oxyhaemoglobin", "centre": "Fe", "complex": True, "shape": "octahedral", "ligands": [{"el": "O2", "colour": "a2"}, {"el": "His"}, {"el": "N"}, {"el": "N"}, {"el": "N"}, {"el": "N"}], "sub": "octahedral, coordination number 6"}])

mk("u11-20", "chem-perovskite", "lattice", "The perovskite structure",
   "Calcium titanate, CaTiO₃, gives its name to the perovskite structure: Ti⁴⁺ at the cube centre surrounded octahedrally by six O²⁻ at the face centres, and Ca²⁺ at the corners with twelve oxygen neighbours. Many solar-cell materials share it.",
   "A cubic cell with calcium at the corners, titanium at the centre and oxygen at the face centres.",
   ["Ca²⁺ at the 8 corners: 1 per cell.", "Ti⁴⁺ at the body centre: 1 per cell, 6 O²⁻ around it.", "O²⁻ at the 6 face centres: 3 per cell. Formula CaTiO₃."],
   cells=[{"kind": "perovskite", "label": "CaTiO₃", "species": {"A": {"label": "Ca2+", "colour": "#5a9e8f", "r": 11}, "B": {"label": "Ti4+", "colour": "#9aa1b5", "r": 9}, "X": {"label": "O2-", "colour": "#e0393e", "r": 8}},
           "claims": {"coordination": {"B": 6, "A": 12}, "perCell": {"A": 1, "B": 1, "X": 3}, "formula": {"A": 1, "B": 1, "X": 3}}}])

# ---------------------------------------------------------------- unit 15
mk("u15-02", "chem-qualitative-tests", "classify", "Identifying an anion",
   "Test in this order so earlier ions do not interfere: dilute acid first (carbonate fizzes), then acidified barium chloride (sulfate gives a white precipitate), then acidified silver nitrate (halides).",
   "A tree: fizzing with dilute acid? carbonate. Otherwise white precipitate with BaCl₂? sulfate. Otherwise precipitate with AgNO₃: white chloride, cream bromide, yellow iodide.",
   ["Add dilute HNO₃: fizzing, and the gas turns limewater milky: carbonate.", "Add acidified BaCl₂: white precipitate: sulfate.", "Add acidified AgNO₃: white (chloride), cream (bromide) or yellow (iodide)."],
   start="q1", rowHeight=92,
   nodes={"q1": {"q": "Fizzes with dilute acid, gas turns limewater milky?", "yes": "co3", "no": "q2"}, "co3": {"leaf": "Carbonate", "examples": ["Na2CO3"], "tone": "a4"},
          "q2": {"q": "White precipitate with acidified BaCl₂?", "yes": "so4", "no": "q3"}, "so4": {"leaf": "Sulfate", "examples": ["Na2SO4"], "tone": "a5"},
          "q3": {"q": "AgNO₃: is the precipitate white?", "yes": "cl", "no": "q4"}, "cl": {"leaf": "Chloride", "examples": ["NaCl"], "tone": "a1"},
          "q4": {"q": "Is it cream?", "yes": "br", "no": "i"}, "br": {"leaf": "Bromide", "examples": ["NaBr"], "tone": "a3"}, "i": {"leaf": "Iodide (yellow)", "examples": ["NaI"], "tone": "a2"}},
   claims=[{"type": "path", "substance": "sodium bromide", "answers": ["no", "no", "no", "yes"], "leaf": "Bromide"}, {"type": "path", "substance": "sodium sulfate", "answers": ["no", "yes"], "leaf": "Sulfate"}])

sets = {"accurate and precise": [25.01, 24.99, 25.02, 25.00], "precise, not accurate": [25.41, 25.43, 25.40, 25.42], "accurate, not precise": [24.70, 25.30, 24.85, 25.15], "neither": [25.6, 24.9, 25.9, 25.3]}
pts = []
for i, (k, v) in enumerate(sets.items()):
    for j, y in enumerate(v):
        pts.append({"x": i + 1 + (j - 1.5) * 0.08, "y": y, "colour": ["a4", "a1", "a3", "a2"][i]})
mk("u15-04", "chem-accuracy-precision", "graph", "Accuracy and precision",
   "Four students each repeat a titration whose true titre is 25.00 cm³. Accuracy is how close the mean is to the true value; precision is how close the repeats are to each other. Precise results can still be inaccurate, from a systematic error such as a misread burette.",
   "Four clusters of four titres around a dashed true value of 25.00 cm³: tight and on target; tight but high; spread but centred; spread and off.",
   ["Student 1: 25.01, 24.99, 25.02, 25.00: accurate and precise.", "Student 2: 25.40–25.43: precise but not accurate.", "Student 3: 24.70–25.30: centred on 25.00 but not precise.", "Student 4: spread and off target."],
   range={"x": [0.4, 4.6], "y": [24.5, 26.1]}, ticks=[[], [24.6, 25.0, 25.4, 25.8]], grid=[1, 0.2], height=[340, 320], axisLabels=["student", "titre / cm³"], xLabelBelow=True,
   marks=[{"y": 25.0, "label": "true value 25.00"}], curves=[], points=pts,
   bands=[{"x": [0.5, 1.5], "label": "1", "colour": "a4"}, {"x": [1.5, 2.5], "label": "2", "colour": "a1"}, {"x": [2.5, 3.5], "label": "3", "colour": "a3"}, {"x": [3.5, 4.5], "label": "4", "colour": "a2"}],
   checks=[{"type": "stats", "values": v, "truth": 25.0, "tolMean": 0.1, "tolSd": 0.05, "accurate": a, "precise": p, "name": f"student {i + 1}: {k}"}
           for i, ((k, v), (a, p)) in enumerate(zip(sets.items(), [(True, True), (False, True), (True, False), (False, False)]))])

import numpy as np
cs = [0, 2, 4, 6, 8, 10]; As = [0.002, 0.104, 0.205, 0.309, 0.408, 0.512]
m, b = np.polyfit(cs, As, 1)
cu = (0.300 - b) / m
mk("u15-05", "chem-calibration", "graph", "A calibration graph",
   f"Standards of known concentration are measured and a best-fit line drawn. The unknown's absorbance, 0.300, is read across to the line and down: {cu:.2f} mg dm⁻³. The unknown must lie within the range of the standards.",
   "Absorbance against concentration for six standards from 0 to 10 mg dm⁻³ with a best-fit straight line; dashed lines read an unknown absorbance of 0.300 across to the line and down to about 5.9.",
   ["Six standards: absorbance rises in proportion to concentration.", f"Best-fit line, gradient {m:.4f} dm³ mg⁻¹.", f"Unknown: A = 0.300, so c = {cu:.2f} mg dm⁻³."],
   range={"x": [0, 11], "y": [0, 0.6]}, ticks=[[2, 4, 6, 8, 10], [0.1, 0.2, 0.3, 0.4, 0.5]], grid=[2, 0.1], axisLabels=["concentration / mg dm⁻³", "absorbance"], xLabelBelow=True,
   curves=[{"expr": f"{m:.6f}*x+{b:.6f}".replace("+-", "-"), "colour": "a1"}], points=[{"x": c, "y": a} for c, a in zip(cs, As)] + [{"x": round(cu, 3), "y": 0.3, "label": "unknown", "colour": "a2"}],
   marks=[{"y": 0.3, "to": round(cu, 3)}, {"x": round(cu, 3), "to": 0.3}],
   checks=[{"type": "point", "expr": f"{m:.6f}*x+{b:.6f}".replace("+-", "-"), "x": round(cu, 4), "y": 0.3, "name": f"the unknown's absorbance 0.300 reads {cu:.2f} mg dm⁻³ from the line"},
           {"type": "value", "expr": f"{m:.6f}*x+{b:.6f}".replace("+-", "-"), "x": 10, "between": [0.505, 0.52], "name": "the line fits the top standard (0.512)"}])

mk("u15-06", "chem-titration-setup", "apparatus", "Titration apparatus",
   "The analyte is measured into a conical flask with a pipette and a few drops of indicator added; the titrant is added from a burette until the indicator just changes colour. The titre is the final reading minus the initial reading, read at the bottom of the meniscus.",
   "A burette clamped above a conical flask containing the analyte and indicator; burette readings and the titre beside it.",
   ["Burette: initial reading 0.50 cm³.", "Final reading 24.65 cm³.", "Titre 24.15 cm³."],
   also=["chemistry:u15-03"], kind="titration", initial=0.50, final=24.65, titre=24.15, analyte="25.0 cm³ NaOH(aq) + phenolphthalein")

mk("u15-07", "chem-gravimetric", "flow", "Gravimetric analysis of sulfate",
   "Sulfate is precipitated completely as barium sulfate, filtered, washed, dried and weighed until two weighings agree (constant mass). The mass of BaSO₄ gives the moles of sulfate: 0.583 g ÷ 233.4 g mol⁻¹ = 2.50 × 10⁻³ mol.",
   "A flow: add excess BaCl₂(aq) → filter → wash → dry and weigh → repeat until constant mass.",
   ["Ba²⁺ + SO₄²⁻ → BaSO₄(s), with excess barium so all the sulfate precipitates.", "Filter through ashless paper and wash with water.", "Dry, cool and weigh; repeat to constant mass."],
   layout="line", nodes=[{"id": "a", "label": "add excess BaCl₂"}, {"id": "b", "label": "filter and wash"}, {"id": "c", "label": "dry and weigh"}, {"id": "d", "label": "constant mass?", "tone": "a4"}],
   edges=[{"from": "a", "to": "b", "eq": "Ba2+ + SO4^2- → BaSO4"}, {"from": "b", "to": "c"}, {"from": "c", "to": "d"}])

uv = "1.2*exp(-((x-600)/70)^2)"
mk("u15-08", "chem-uv-vis", "graph", "A UV–visible spectrum",
   "Tetraamminecopper(II), [Cu(NH₃)₄(H₂O)₂]²⁺, absorbs most strongly at about 600 nm (orange), so it appears deep blue. At λmax, absorbance A = εcl (the Beer–Lambert law), which is why concentrations are measured there.",
   "Absorbance against wavelength from 400 to 800 nm: a broad peak at 600 nm.",
   ["A broad absorption band peaking at 600 nm.", "Little absorption below 450 nm, which is why blue light is transmitted."],
   range={"x": [400, 800], "y": [0, 1.4]}, ticks=[[400, 500, 600, 700, 800], [0.4, 0.8, 1.2]], grid=[50, 0.2], axisLabels=["wavelength / nm", "absorbance"], xLabelBelow=True,
   curves=[{"expr": uv, "colour": "a1"}], marks=[{"x": 600, "label": "λmax 600 nm", "to": 1.2}],
   checks=[{"type": "max", "expr": uv, "domain": [400, 800], "x": 600, "y": 1.2, "name": "λmax = 600 nm"}])

mk("u15-09", "chem-ir-ethanoic-acid", "ir", "Infrared spectrum of ethanoic acid",
   "The very broad O–H absorption of a carboxylic acid (2500–3000 cm⁻¹, broadened by hydrogen bonding) together with a sharp C=O near 1710 cm⁻¹ identifies the –COOH group. Below 1500 cm⁻¹ is the fingerprint region.",
   "Transmittance against wavenumber: a very broad dip from about 2500 to 3300, a strong sharp dip at about 1710 and a dip near 1290.",
   ["Broad O–H (acid) around 3000 cm⁻¹.", "Strong C=O at 1710 cm⁻¹.", "C–O near 1290 cm⁻¹, in the fingerprint region."],
   molecule="CC(=O)O", highlight=[{"group": "carboxylic acid", "colour": "a4"}],
   bands=[{"wn": 2900, "width": 600, "depth": 55, "label": "O–H (acid), broad", "bond": "O–H (acid)"}, {"wn": 1710, "width": 50, "depth": 80, "label": "C=O", "bond": "C=O"}, {"wn": 1290, "width": 60, "depth": 50, "label": "C–O", "bond": "C–O", "dy": 14}],
   absent=["O–H (alcohol)", "C≡N"])

mk("u15-10", "chem-nmr-principle", "levels", "Nuclear spin in a magnetic field",
   "A ¹H nucleus has two spin states that have the same energy until a magnetic field is applied. In a field they split: aligned with the field (α) is lower, against it (β) higher. Radio waves of exactly the gap flip spins; the gap depends on the local field, which is what chemical shift measures.",
   "Energy diagram: one level with no field, splitting into a lower α level and a higher β level in a field, with a radio-frequency arrow between them.",
   ["No field: one energy for both spin states.", "In field B₀: α (aligned) lower, β (opposed) higher.", "Absorbing radio waves of energy ΔE flips α to β."],
   kind="custom", height=[260, 280], axisLabel="energy",
   levels=[{"id": "z", "label": "no field", "E": 0.5, "x0": 0.08, "x1": 0.3, "labelAbove": True}, {"id": "a", "label": "α (aligned)", "E": 0, "x0": 0.5, "x1": 0.76, "labelRight": True},
           {"id": "b", "label": "β (opposed)", "E": 1, "x0": 0.5, "x1": 0.76, "labelRight": True}],
   links=[["z", "a"], ["z", "b"]],
   transitions=[{"from": "a", "to": "b", "x": 0.63, "label": "radio waves, ΔE ∝ B₀", "colour": "a2"}],
   notes=[{"x": 0.63, "E": 1, "dy": -26, "text": "in field B₀", "colour": "a1", "bold": True}],
   claims=[{"type": "below", "a": "a", "b": "b", "name": "the aligned (α) state is lower in energy"}])

mk("u15-11", "chem-h-nmr-ethanol", "nmr", "¹H NMR spectrum of ethanol",
   "Ethanol has three hydrogen environments, so three peaks in a 3:2:1 ratio. The CH₃ is split into a triplet by the two neighbouring CH₂ hydrogens, the CH₂ into a quartet by the three CH₃ hydrogens, and the O–H is a singlet because it exchanges rapidly.",
   "Spectrum with a triplet at 1.2 ppm (3H), a quartet at 3.7 ppm (2H) and a singlet at 2.6 ppm (1H), and the structure of ethanol.",
   ["δ 1.2, 3H, triplet: CH₃ next to CH₂.", "δ 3.7, 2H, quartet: CH₂ next to O and CH₃.", "δ 2.6, 1H, singlet: O–H (its position varies)."],
   molecule="CCO", nucleus="1H", range=[0, 6], displayed=True,
   peaks=[{"shift": 1.2, "n": 3, "split": "t", "atoms": [0], "env": "R–CH3", "colour": "a1"}, {"shift": 3.7, "n": 2, "split": "q", "atoms": [1], "env": "H–C–O", "colour": "a2"}, {"shift": 2.6, "n": 1, "split": "s", "atoms": [2], "env": "R–OH", "colour": "a4"}])

mk("u15-12", "chem-c13-nmr-propanol", "nmr", "¹³C NMR spectrum of propan-1-ol",
   "Each carbon environment gives one line. Propan-1-ol has three different carbons, so three lines; the one bonded to oxygen is furthest downfield (64 ppm). Propan-2-ol, by symmetry, would give only two.",
   "¹³C spectrum with lines at about 10, 26 and 64 ppm, and the structure of propan-1-ol.",
   ["δ 10: CH₃.", "δ 26: the middle CH₂.", "δ 64: CH₂ bonded to oxygen."],
   molecule="CCCO", nucleus="13C", range=[0, 100], tms=True,
   peaks=[{"shift": 10, "n": 1, "atoms": [0], "env": "C–C", "colour": "a1"}, {"shift": 26, "n": 1, "atoms": [1], "env": "C–C", "colour": "a4"}, {"shift": 64, "n": 1, "atoms": [2], "env": "C–O", "colour": "a2"}])

mk("u15-13", "chem-shift-ranges", "nmr", "Chemical shift and environment",
   "4-Methoxybenzaldehyde shows the main ¹H regions in one spectrum: the aldehyde H at 9.9 ppm, aromatic H at 7–8 ppm, and the OCH₃ at 3.9 ppm. Hydrogens near electronegative atoms or π systems are deshielded and appear further left.",
   "Spectrum with a singlet at 9.9 (1H), two doublets at 7.8 and 7.0 (2H each) and a singlet at 3.9 (3H).",
   ["δ 9.9, 1H, singlet: H–C=O.", "δ 7.8 and 7.0, 2H each, doublets: aromatic H.", "δ 3.9, 3H, singlet: O–CH₃."],
   molecule="COc1ccc(C=O)cc1", nucleus="1H", range=[0, 11],
   peaks=[{"shift": 9.9, "n": 1, "split": "s", "atoms": [6], "env": "H–C=O", "colour": "a2"}, {"shift": 7.8, "n": 2, "split": "d", "atoms": [4, 8], "env": "Ar–H", "colour": "a5"},
          {"shift": 7.0, "n": 2, "split": "d", "atoms": [3, 9], "env": "Ar–H", "colour": "a4"}, {"shift": 3.9, "n": 3, "split": "s", "atoms": [0], "env": "H–C–O", "colour": "a1"}])

mk("u15-14", "chem-splitting-ethyl", "nmr", "Spin–spin splitting in ethyl ethanoate",
   "The n + 1 rule: a signal is split into n + 1 lines by n equivalent hydrogens on the neighbouring carbon. The ethyl group gives a quartet (CH₂, next to CH₃) and a triplet (CH₃, next to CH₂); the CH₃ attached to C=O has no neighbouring H, so it is a singlet.",
   "Spectrum: triplet at 1.3 ppm (3H), singlet at 2.0 ppm (3H), quartet at 4.1 ppm (2H).",
   ["δ 1.3, 3H, triplet.", "δ 2.0, 3H, singlet: CH₃ next to C=O.", "δ 4.1, 2H, quartet: CH₂ next to O."],
   molecule="CCOC(C)=O", nucleus="1H", range=[0, 6],
   peaks=[{"shift": 1.3, "n": 3, "split": "t", "atoms": [0], "env": "R–CH3", "colour": "a1"}, {"shift": 4.1, "n": 2, "split": "q", "atoms": [1], "env": "H–C–O", "colour": "a2"}, {"shift": 2.0, "n": 3, "split": "s", "atoms": [4], "env": "H–C–C=O", "colour": "a4"}])

mk("u15-15", "chem-mass-spec", "ms", "Mass spectrum of pentane",
   "The molecular ion C₅H₁₂⁺ at m/z 72 gives the relative molecular mass. Breaking C–C bonds gives fragment ions at 57, 43 and 29, each 14 (CH₂) apart; the tallest peak (the base peak) at 43 is C₃H₇⁺.",
   "Mass spectrum with peaks at m/z 29, 43 (tallest), 57 and 72.",
   ["m/z 72: molecular ion C₅H₁₂⁺.", "m/z 57: C₄H₉⁺.", "m/z 43: C₃H₇⁺, the base peak.", "m/z 29: C₂H₅⁺."],
   molecule="CCCCC", molecularIon=72, base=43, range=[10, 80],
   peaks=[{"mz": 72, "rel": 10, "ion": "C5H12", "label": "M⁺"}, {"mz": 57, "rel": 15, "ion": "C4H9", "label": "C₄H₉⁺"}, {"mz": 43, "rel": 100, "ion": "C3H7", "label": "C₃H₇⁺", "colour": "a2"},
          {"mz": 29, "rel": 45, "ion": "C2H5", "label": "C₂H₅⁺"}, {"mz": 27, "rel": 30, "ion": "C2H3", "dx": -14}])

mk("u15-16", "chem-fragmentation-butanone", "ms", "Fragmentation of butanone",
   "Butanone (M⁺ at 72) breaks next to the C=O, giving acylium ions: CH₃CO⁺ at 43 (the base peak) and C₂H₅CO⁺ at 57. A peak at 29 is C₂H₅⁺. Fragments that keep the C=O are especially stable.",
   "Mass spectrum with peaks at 29, 43 (tallest), 57 and 72.",
   ["m/z 72: M⁺, C₄H₈O⁺.", "m/z 57: CH₃CH₂CO⁺.", "m/z 43: CH₃CO⁺, base peak.", "m/z 29: C₂H₅⁺."],
   molecule="CCC(C)=O", molecularIon=72, base=43, range=[10, 80],
   peaks=[{"mz": 72, "rel": 25, "ion": "C4H8O", "label": "M⁺"}, {"mz": 57, "rel": 10, "ion": "C3H5O", "label": "C₂H₅CO⁺"}, {"mz": 43, "rel": 100, "ion": "C2H3O", "label": "CH₃CO⁺", "colour": "a2"}, {"mz": 29, "rel": 20, "ion": "C2H5", "label": "C₂H₅⁺"}])

mk("u15-17", "chem-hrms", "ms", "High-resolution mass spectrometry",
   "CO, N₂ and C₂H₄ all have a nominal mass of 28, but their exact masses differ because isotopic masses are not whole numbers (¹²C is exactly 12, ¹H is 1.0078, ¹⁴N 14.0031, ¹⁶O 15.9949). Measured to four decimal places they are easily told apart.",
   "Three narrow peaks near m/z 28: CO at 27.9949, N₂ at 28.0061 and C₂H₄ at 28.0313.",
   ["CO: 27.9949.", "N₂: 28.0061.", "C₂H₄: 28.0313."],
   kind="hrms", range=[27.98, 28.04], tick=0.01,
   peaks=[{"mz": 27.9949, "rel": 80, "label": "CO", "colour": "a2"}, {"mz": 28.0061, "rel": 80, "label": "N₂", "colour": "a1"}, {"mz": 28.0313, "rel": 80, "label": "C₂H₄", "colour": "a4"}],
   species=[{"formula": "CO", "mass": 27.9949, "nominal": 28}, {"formula": "N2", "mass": 28.0061, "nominal": 28}, {"formula": "C2H4", "mass": 28.0313, "nominal": 28}])

mk("u15-18", "chem-raman", "levels", "Rayleigh and Raman scattering",
   "Light briefly lifts a molecule to a short-lived virtual state. Most photons scatter with unchanged energy (Rayleigh). A few leave the molecule one vibrational level higher and come out with less energy (Stokes), or take a level's energy away and come out with more (anti-Stokes). The shifts measure vibrational energies.",
   "Energy diagram: v = 0 and v = 1 levels and a dashed virtual level; arrows for Rayleigh, Stokes and anti-Stokes scattering.",
   ["Rayleigh: up from v = 0 and back to v = 0, same energy.", "Stokes: up from v = 0, down to v = 1: scattered light of lower energy.", "Anti-Stokes: up from v = 1, down to v = 0: higher energy."],
   kind="custom", height=[300, 320],
   levels=[{"id": "v0", "label": "v = 0", "E": 0, "x0": 0.1, "x1": 0.95}, {"id": "v1", "label": "v = 1", "E": 1, "x0": 0.1, "x1": 0.95}, {"id": "virt", "label": "virtual state", "E": 6, "x0": 0.1, "x1": 0.95, "dash": True, "thin": True}],
   transitions=[{"from": "v0", "to": "virt", "x": 0.2, "colour": "a1"}, {"from": "virt", "to": "v0", "x": 0.26, "colour": "a1", "label": "Rayleigh"},
                {"from": "v0", "to": "virt", "x": 0.5, "colour": "a3"}, {"from": "virt", "to": "v1", "x": 0.56, "colour": "a3", "label": "Stokes"},
                {"from": "v1", "to": "virt", "x": 0.78, "colour": "a4"}, {"from": "virt", "to": "v0", "x": 0.84, "colour": "a4", "label": "anti-Stokes"}],
   claims=[{"type": "lower", "transitions": [3, 2], "name": "Stokes light has less energy than the incident light"}, {"type": "lower", "transitions": [4, 5], "name": "anti-Stokes light has more energy than the incident light"},
           {"type": "equal", "transitions": [0, 1], "name": "Rayleigh light has the same energy as the incident light"}])

mk("u15-19", "chem-jablonski", "levels", "A Jablonski diagram",
   "Absorption lifts a molecule from S₀ to an excited singlet. It quickly relaxes to the lowest level of S₁ (vibrational relaxation and internal conversion), then either emits fluorescence (nanoseconds) or crosses to the triplet T₁, which emits phosphorescence much more slowly. Emitted light has lower energy than absorbed light.",
   "Energy levels S₀, S₁ and T₁ (T₁ below S₁): absorption up, wavy relaxation, fluorescence down from S₁, intersystem crossing to T₁, phosphorescence down from T₁.",
   ["Absorption: S₀ up to a high vibrational level of S₁.", "Wavy arrow: relaxation to the bottom of S₁.", "Fluorescence: S₁ down to S₀.", "Intersystem crossing: S₁ to T₁.", "Phosphorescence: T₁ down to S₀, lowest energy."],
   kind="custom", height=[320, 340],
   levels=[{"id": "s0", "label": "S₀", "E": 0, "x0": 0.1, "x1": 0.95}, {"id": "s0v", "E": 0.35, "x0": 0.1, "x1": 0.6, "thin": True},
           {"id": "s1", "label": "S₁", "E": 5, "x0": 0.1, "x1": 0.55}, {"id": "s1v", "E": 5.6, "x0": 0.1, "x1": 0.55, "thin": True}, {"id": "t1", "label": "T₁", "E": 3.8, "x0": 0.65, "x1": 0.95, "labelRight": True}],
   transitions=[{"from": "s0", "to": "s1v", "x": 0.18, "label": "absorption", "colour": "a1"}, {"from": "s1v", "to": "s1", "x": 0.3, "wavy": True, "colour": "a5"},
                {"from": "s1", "to": "s0v", "x": 0.42, "label": "fluorescence", "colour": "a4"}, {"from": "s1", "to": "t1", "x": 0.6, "wavy": True, "label": "ISC", "colour": "a5"},
                {"from": "t1", "to": "s0", "x": 0.8, "label": "phosphorescence", "colour": "a2"}],
   claims=[{"type": "lower", "transitions": [2, 0], "name": "fluorescence emits less energy than was absorbed"}, {"type": "below", "a": "t1", "b": "s1", "name": "T₁ lies below S₁"},
           {"type": "lower", "transitions": [4, 2], "name": "phosphorescence is lower in energy than fluorescence"}])

th = "asin(x*0.15406/(2*0.2820))*57.29578"
mk("u15-20", "chem-bragg", "graph", "Bragg's law",
   "nλ = 2d sin θ. With copper Kα X-rays (λ = 0.154 nm) and the 0.282 nm spacing between planes in NaCl, reflections appear at θ = 15.9° (n = 1), 33.1° (n = 2) and 55.0° (n = 3). Measuring θ gives the spacing d.",
   "Diffraction angle θ against order n: points at 15.9°, 33.1° and 55.0° for n = 1, 2 and 3.",
   ["n = 1: θ = 15.9°.", "n = 2: θ = 33.1°.", "n = 3: θ = 55.0°."],
   range={"x": [0, 3.5], "y": [0, 70]}, ticks=[[1, 2, 3], [20, 40, 60]], grid=[1, 10], axisLabels=["order n", "θ / °"], xLabelBelow=True,
   curves=[{"expr": th, "domain": [0, 3.4], "colour": "a1", "dash": "5 4"}],
   points=[{"x": n, "y": round(math.degrees(math.asin(n * 0.15406 / 0.564)), 2), "label": f"{math.degrees(math.asin(n * 0.15406 / 0.564)):.1f}°"} for n in (1, 2, 3)],
   checks=[{"type": "point", "expr": th, "x": n, "y": round(math.degrees(math.asin(n * 0.15406 / 0.564)), 4), "name": f"n = {n}: sin θ = {n} × 0.154 ÷ (2 × 0.282)"} for n in (1, 2, 3)])

mk("u15-21", "chem-paper-chromatography", "apparatus", "Paper chromatography",
   "Spots of a food colouring and three known dyes are placed on a pencil baseline above the solvent. As the solvent rises it carries each dye a characteristic distance. The colouring contains dyes A and B (same Rf), but not C. Rf = distance moved by the spot ÷ distance moved by the solvent.",
   "A paper chromatogram: the mixture lane has three spots; lanes A, B and C have one spot each; A and B match two of the mixture's spots.",
   ["Mixture: spots at Rf 0.32, 0.61 and 0.83.", "Dye A: one spot at 0.32. Dye B: 0.61. Dye C: 0.45, matching nothing in the mixture.", "Rf for the B spot: 4.88 cm ÷ 8.0 cm = 0.61."],
   also=["gcse:u05-15", "chemistry:u19-11"], kind="paper", measure=[2, 0],
   lanes=[{"label": "mixture", "spots": [{"rf": 0.32, "colour": "a3"}, {"rf": 0.61, "colour": "a1"}, {"rf": 0.83, "colour": "a4"}]}, {"label": "A", "spots": [{"rf": 0.32, "colour": "a3"}]},
          {"label": "B", "spots": [{"rf": 0.61, "colour": "a1"}]}, {"label": "C", "spots": [{"rf": 0.45, "colour": "a2"}]}],
   claims=[{"type": "same", "a": "mixture", "b": "A", "rf": 0.32}, {"type": "same", "a": "mixture", "b": "B", "rf": 0.61}, {"type": "pure", "lane": "C", "pure": True}, {"type": "pure", "lane": "mixture", "pure": False},
           {"type": "rf", "lane": "B", "distance": 4.88, "front": 8.0, "value": 0.61}])

mk("u15-22", "chem-tlc", "apparatus", "Thin-layer chromatography",
   "On a silica plate the more polar compound sticks to the silica and moves less. Here the starting material (Rf 0.55) and the product (Rf 0.30) are clearly separated; the co-spot lane, with both applied together, shows two spots, confirming they are different.",
   "A TLC plate with three lanes: starting material (one spot high), co-spot (two spots), reaction mixture (one spot low).",
   ["Lane 1, starting material: Rf 0.55.", "Lane 2, co-spot: 0.55 and 0.30.", "Lane 3, reaction mixture: only 0.30: the starting material has been used up."],
   kind="tlc", plate={"lanes": [{"label": "SM", "spots": [0.55], "colour": "a1"}, {"label": "co", "spots": [0.55, 0.30], "colour": "a5"}, {"label": "RM", "spots": [0.30], "colour": "a2"}]},
   claims=[{"type": "gone", "lane": "RM", "rf": 0.55}, {"type": "same", "a": "co", "b": "SM", "rf": 0.55}])

gc = "100*exp(-((x-2.1)/0.07)^2)+70*exp(-((x-3.4)/0.09)^2)+40*exp(-((x-5.2)/0.12)^2)"
mk("u15-23", "chem-gas-chromatogram", "graph", "A gas chromatogram",
   "Hexane, heptane and octane are carried through the column by the gas; the more volatile (lower boiling) the compound, the less time it spends dissolved in the stationary phase and the sooner it reaches the detector. The area under each peak is proportional to its amount.",
   "Detector signal against time: peaks at 2.1 min (hexane), 3.4 min (heptane) and 5.2 min (octane), getting lower and wider.",
   ["2.1 min: hexane (bp 69 °C).", "3.4 min: heptane (bp 98 °C).", "5.2 min: octane (bp 126 °C)."],
   range={"x": [0, 7], "y": [0, 110]}, ticks=[[1, 2, 3, 4, 5, 6, 7], []], grid=[1, 20], axisLabels=["retention time / min", "detector signal"], xLabelBelow=True,
   curves=[{"expr": gc, "colour": "a1", "samples": 1400}], points=[{"x": 2.1, "y": 100, "label": "hexane"}, {"x": 3.4, "y": 70, "label": "heptane"}, {"x": 5.2, "y": 40, "label": "octane"}],
   checks=[{"type": "max", "expr": gc, "domain": [1.5, 2.7], "x": 2.1, "y": 100, "name": "hexane (lowest bp) elutes first, 2.1 min"}, {"type": "max", "expr": gc, "domain": [2.8, 4.2], "x": 3.4, "y": 70},
           {"type": "max", "expr": gc, "domain": [4.4, 6.5], "x": 5.2, "y": 40, "name": "octane (highest bp) elutes last, 5.2 min"}])

hp = "60*exp(-((x-1.6)/0.08)^2)+100*exp(-((x-2.5)/0.1)^2)+45*exp(-((x-4.3)/0.14)^2)"
mk("u15-24", "chem-hplc", "graph", "An HPLC chromatogram of a painkiller",
   "Reversed-phase HPLC: the stationary phase is non-polar, so the most polar component (paracetamol) elutes first and the least polar (aspirin, here last) is retained longest. Comparing retention times with standards identifies each component; peak areas give amounts.",
   "Detector signal against time with three peaks: paracetamol 1.6 min, caffeine 2.5 min, aspirin 4.3 min.",
   ["1.6 min: paracetamol.", "2.5 min: caffeine (tallest).", "4.3 min: aspirin."],
   range={"x": [0, 6], "y": [0, 110]}, ticks=[[1, 2, 3, 4, 5, 6], []], grid=[1, 20], axisLabels=["retention time / min", "UV absorbance"], xLabelBelow=True,
   curves=[{"expr": hp, "colour": "a4", "samples": 1200}], points=[{"x": 1.6, "y": 60, "label": "paracetamol"}, {"x": 2.5, "y": 100, "label": "caffeine"}, {"x": 4.3, "y": 45, "label": "aspirin"}],
   checks=[{"type": "max", "expr": hp, "domain": [1.2, 2.0], "x": 1.6, "y": 60}, {"type": "max", "expr": hp, "domain": [2.1, 3.0], "x": 2.5, "y": 100}, {"type": "max", "expr": hp, "domain": [3.5, 5.5], "x": 4.3, "y": 45}])

mk("u15-25", "chem-gcms", "flow", "GC–MS",
   "Gas chromatography separates a mixture in time; each compound then enters the mass spectrometer, which records its spectrum. Matching the retention time and the mass spectrum against a library identifies the compound, as in drug testing and forensic analysis.",
   "A flow: sample injected → GC column separates → each compound in turn ionised → mass spectrum → library match.",
   ["Inject the vaporised sample.", "The GC column separates components by retention time.", "Each component is ionised and its mass spectrum recorded.", "The spectrum and retention time are matched to a database."],
   layout="line", nodes=[{"id": "a", "label": "inject sample"}, {"id": "b", "label": "GC separates", "sub": "by retention time", "tone": "a1"}, {"id": "c", "label": "MS fragments", "sub": "m/z spectrum", "tone": "a2"}, {"id": "d", "label": "library match", "tone": "a4"}],
   edges=[{"from": "a", "to": "b"}, {"from": "b", "to": "c"}, {"from": "c", "to": "d"}])

mk("u15-26", "chem-lcms", "flow", "LC–MS",
   "For compounds that are not volatile enough for GC, such as drugs and proteins, liquid chromatography separates them and electrospray ionisation gently turns each into gaseous ions (often [M+H]⁺) before mass analysis.",
   "A flow: sample in solution → HPLC separates → electrospray ionisation → mass analyser → spectrum.",
   ["HPLC separates the components.", "Electrospray: the solution is sprayed through a charged needle and the solvent evaporates, leaving ions such as [M+H]⁺.", "The mass analyser records m/z."],
   layout="line", nodes=[{"id": "a", "label": "solution"}, {"id": "b", "label": "HPLC", "tone": "a4"}, {"id": "c", "label": "electrospray", "sub": "[M+H]⁺ ions", "tone": "a5"}, {"id": "d", "label": "mass analyser", "tone": "a2"}],
   edges=[{"from": "a", "to": "b"}, {"from": "b", "to": "c"}, {"from": "c", "to": "d"}])

mk("u15-27", "chem-structure-elucidation", "flow", "Putting the evidence together",
   "An unknown with M⁺ at 88 (C₄H₈O₂), a strong IR absorption at 1740 cm⁻¹ but no broad O–H, and ¹H NMR peaks at 1.3 (t, 3H), 2.0 (s, 3H) and 4.1 (q, 2H) is ethyl ethanoate. Each technique narrows the possibilities.",
   "A flow: mass spectrum gives the formula, IR the functional group, NMR the arrangement, leading to the structure.",
   ["MS: M⁺ 88, C₄H₈O₂.", "IR: C=O at 1740 cm⁻¹, no O–H: an ester.", "NMR: an ethyl group next to O and a CH₃ next to C=O.", "Structure: CH₃COOCH₂CH₃."],
   layout="line", nodes=[{"id": "a", "label": "MS", "sub": "M⁺ 88: C₄H₈O₂"}, {"id": "b", "label": "IR", "sub": "C=O 1740, no O–H: ester"}, {"id": "c", "label": "¹H NMR", "sub": "t 3H, s 3H, q 2H"}, {"id": "d", "label": "ethyl ethanoate", "tone": "a4"}],
   edges=[{"from": "a", "to": "b"}, {"from": "b", "to": "c"}, {"from": "c", "to": "d"}], claims=[{"type": "equation", "eq": "C4H8O2 → CH3COOC2H5"}])
