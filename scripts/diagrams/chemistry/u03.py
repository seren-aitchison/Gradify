"""Unit 3, Periodic Table and Periodicity."""
from spec import mk

def items(d, keys): return [{"key": k, "value": d[k]} for k in keys]
IE = {"H": 1312, "He": 2372, "Li": 520, "Be": 899, "B": 801, "C": 1086, "N": 1402, "O": 1314, "F": 1681, "Ne": 2081, "Na": 496, "Mg": 738, "Al": 578,
      "Si": 787, "P": 1012, "S": 1000, "Cl": 1251, "Ar": 1521, "K": 419, "Ca": 590, "Rb": 403, "Sr": 550, "Cs": 376, "Ba": 503}

mk("u03-02", "chem-table-blocks", "table", "The periodic table by block",
   "The block is the sub-shell that the last electron enters: s for groups 1 and 2 (and helium), p for groups 13 to 18, d for the transition series, f for the lanthanides and actinides.",
   "The periodic table coloured by block: s block on the left, d block in the middle, p block on the right, f block below.",
   ["Groups 1 and 2, with hydrogen and helium: the s block.", "Groups 3 to 12: the d block.", "Groups 13 to 18: the p block.", "The two rows below the table, lanthanides and actinides: the f block."],
   colour="block", groups=True, periods=True,
   claims=[{"type": "block", "symbols": ["Li", "Na", "K", "Mg", "Ca", "Ba"], "block": "s"}, {"type": "block", "symbols": ["B", "C", "N", "O", "F", "Cl", "Ar"], "block": "p"},
           {"type": "block", "symbols": ["Sc", "Fe", "Cu", "Zn", "Ag", "Pt"], "block": "d"}, {"type": "block", "symbols": ["Ce", "Nd", "Gd", "U", "Pu"], "block": "f"}])

mk("u03-03", "chem-table-periods-groups", "table", "Periods and groups",
   "Rows are periods: the period number is the number of occupied electron shells. Columns are groups: elements in a group share their outer electron configuration, so they react alike. Group 1, group 17 and group 18 are highlighted.",
   "The periodic table with groups 1 to 18 numbered across the top and periods 1 to 7 down the side; groups 1, 17 and 18 highlighted.",
   ["Group numbers 1 to 18 across the top, period numbers 1 to 7 down the left.", "Group 1 (the alkali metals) highlighted on the left.", "Group 17 (the halogens) and group 18 (the noble gases) highlighted on the right."],
   also=["gcse:u05-03"], groups=True, periods=True, dim=True,
   highlight={**{s: "a3" for s in ["Li", "Na", "K", "Rb", "Cs", "Fr"]}, **{s: "a4" for s in ["F", "Cl", "Br", "I", "At", "Ts"]}, **{s: "a5" for s in ["He", "Ne", "Ar", "Kr", "Xe", "Rn", "Og"]}},
   notes=["orange: group 1 · green: group 17 · purple: group 18"],
   claims=[{"type": "group", "symbol": "Na", "group": 1, "period": 3}, {"type": "group", "symbol": "Cl", "group": 17, "period": 3}, {"type": "group", "symbol": "Kr", "group": 18, "period": 4}])

mk("u03-04", "chem-s-block-config", "orbitals", "s-block elements: outer s electrons",
   "Sodium (3s¹) and magnesium (3s²) have their outer electrons in an s sub-shell, which they lose to form Na⁺ and Mg²⁺ ions with the neon configuration.",
   "Box diagrams for sodium, [Ne] 3s¹, and magnesium, [Ne] 3s².",
   ["Sodium: one electron in 3s.", "Magnesium: two paired electrons in 3s."],
   rows=[{"symbol": "Na", "label": "Sodium, [Ne] 3s¹", "config": "[Ne] 3s1", "show": ["3s"], "core": ["1s", "2s", "2p"]},
         {"symbol": "Mg", "label": "Magnesium, [Ne] 3s²", "config": "[Ne] 3s2", "show": ["3s"], "core": ["1s", "2s", "2p"]}])

mk("u03-05", "chem-p-block-config", "orbitals", "p-block elements: filling 2p",
   "Across period 2 from carbon to fluorine the 2p sub-shell fills: 2p², 2p³, 2p⁴, 2p⁵. Electrons occupy separate orbitals before pairing.",
   "Box diagrams of 2s and 2p for carbon, nitrogen, oxygen and fluorine.",
   ["Carbon, 2s² 2p²: two single 2p electrons.", "Nitrogen, 2s² 2p³: three single 2p electrons.", "Oxygen, 2s² 2p⁴: one pair and two singles.", "Fluorine, 2s² 2p⁵: two pairs and one single."],
   rows=[{"symbol": s, "label": f"{n}, [He] 2s² 2p{sup}", "config": f"1s2 2s2 2p{k}", "show": ["2s", "2p"], "core": ["1s"], "unpaired": u}
         for s, n, k, sup, u in [("C", "Carbon", 2, "²", 2), ("N", "Nitrogen", 3, "³", 3), ("O", "Oxygen", 4, "⁴", 2), ("F", "Fluorine", 5, "⁵", 1)]])

mk("u03-06", "chem-d-block-fill", "orbitals", "d-block elements: filling 3d",
   "Across the first transition series the 3d sub-shell fills behind a 4s² pair: scandium 3d¹, iron 3d⁶, zinc 3d¹⁰. Chromium and copper are the exceptions with 4s¹.",
   "Box diagrams of 3d and 4s for scandium, iron and zinc.",
   ["Scandium, [Ar] 3d¹ 4s².", "Iron, [Ar] 3d⁶ 4s²: one 3d pair and four singles.", "Zinc, [Ar] 3d¹⁰ 4s²: every box paired."],
   rows=[{"symbol": s, "label": l, "config": c, "show": ["3d", "4s"], "core": ["1s", "2s", "2p", "3s", "3p"], "unpaired": u}
         for s, l, c, u in [("Sc", "Scandium, [Ar] 3d¹ 4s²", "[Ar] 3d1 4s2", 1), ("Fe", "Iron, [Ar] 3d⁶ 4s²", "[Ar] 3d6 4s2", 4), ("Zn", "Zinc, [Ar] 3d¹⁰ 4s²", "[Ar] 3d10 4s2", 0)]])

mk("u03-07", "chem-table-f-block", "table", "The f block",
   "The lanthanides (cerium to lutetium) and actinides (thorium to lawrencium) fill 4f and 5f. They belong in periods 6 and 7 but are drawn below the table so it fits on a page.",
   "The periodic table with the lanthanide and actinide rows highlighted below the main table.",
   ["The main table, dimmed.", "Below it, two highlighted rows: the lanthanides (period 6) and the actinides (period 7)."],
   also=['chemistry:u03-18', 'chemistry:u11-22'], dim=True, highlight={s: ("a5" if i < 14 else "a2") for i, s in enumerate("Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr".split())},
   claims=[{"type": "block", "symbols": "Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr".split(), "block": "f"}])

mk("u03-08", "chem-group1-mp", "trend", "Group 1 melting points",
   "Down group 1 the atoms get larger, so the delocalised electrons are further from the cations and metallic bonding weakens: melting points fall from lithium (181 °C) to caesium (29 °C).",
   "Bar chart of melting points falling down group 1: Li 180.5, Na 97.8, K 63.5, Rb 39.3, Cs 28.5 °C.",
   ["Lithium 180.5 °C.", "Sodium 97.8 °C.", "Potassium 63.5 °C.", "Rubidium 39.3 °C.", "Caesium 28.5 °C."],
   kind="bars", dataset="mpGroup1", range=[0, 200], yLabel="melting point / °C", colour="a3",
   items=items({"Li": 180.5, "Na": 97.8, "K": 63.5, "Rb": 39.3, "Cs": 28.5}, ["Li", "Na", "K", "Rb", "Cs"]), claims=[{"type": "decreasing"}])

mk("u03-09", "chem-group2-ie", "trend", "Group 2 first ionisation energies",
   "Down group 2 the outer s electrons are further from the nucleus and better shielded, so less energy is needed to remove them and reactivity increases.",
   "Bar chart of first ionisation energies: Be 899, Mg 738, Ca 590, Sr 550, Ba 503 kJ/mol.",
   ["Beryllium 899 kJ mol⁻¹.", "Magnesium 738.", "Calcium 590.", "Strontium 550.", "Barium 503."],
   kind="bars", dataset="ie1", range=[0, 1000], yLabel="first ionisation energy / kJ mol⁻¹", colour="a1",
   items=items(IE, ["Be", "Mg", "Ca", "Sr", "Ba"]), claims=[{"type": "decreasing"}])

mk("u03-11", "chem-diamond-cell", "lattice", "Diamond: each carbon bonded to four",
   "In diamond every carbon atom is covalently bonded to four others in a tetrahedral giant lattice, which is why it is so hard and has a very high melting point. The cubic cell holds eight carbon atoms.",
   "A cubic unit cell of diamond: atoms at the corners and face centres, and four more inside the cell.",
   ["Carbon atoms on the eight corners and six face centres of a cube.", "Four more atoms inside, each bonded tetrahedrally to four neighbours."],
   cells=[{"kind": "diamond", "bonds": True, "label": "diamond", "species": {"A": {"label": "C", "colour": "#3a3f4b", "r": 9}}, "claims": {"coordination": {"A": 4}, "perCell": {"A": 8}}}])

mk("u03-14", "chem-group17-bp", "trend", "Halogen boiling points",
   "Halogen molecules get larger down the group, with more electrons, so London forces between them strengthen and boiling points rise: fluorine and chlorine are gases, bromine a liquid and iodine a solid at room temperature.",
   "Bar chart of boiling points: F₂ −188, Cl₂ −34, Br₂ 59, I₂ 184 °C.",
   ["F₂ −188 °C.", "Cl₂ −34 °C.", "Br₂ 59 °C.", "I₂ 184 °C."],
   kind="bars", dataset="bpHalogens", range=[-200, 200], ticks=[-200, -100, 0, 100, 200], yLabel="boiling point / °C", colour="a4",
   items=items({"F2": -188, "Cl2": -34, "Br2": 59, "I2": 184}, ["F2", "Cl2", "Br2", "I2"]), claims=[{"type": "increasing"}])

mk("u03-15", "chem-group18-bp", "trend", "Noble gas boiling points",
   "Noble gases exist as single atoms held together only by London forces. Larger atoms with more electrons are more polarisable, so boiling points rise down the group.",
   "Bar chart of noble gas boiling points from helium −269 to radon −62 °C.",
   ["He −269, Ne −246, Ar −186, Kr −153, Xe −108, Rn −62 °C."],
   kind="bars", dataset="bpNoble", range=[-300, 0], ticks=[-300, -200, -100, 0], yLabel="boiling point / °C", colour="a5",
   items=items({"He": -269, "Ne": -246, "Ar": -186, "Kr": -153, "Xe": -108, "Rn": -62}, ["He", "Ne", "Ar", "Kr", "Xe", "Rn"]), claims=[{"type": "increasing"}])

mk("u03-16", "chem-transition-ions", "orbitals", "Iron ions lose 4s before 3d",
   "Although 4s fills before 3d, once 3d is occupied the 4s electrons are the outermost and are removed first. Fe²⁺ is [Ar] 3d⁶ and Fe³⁺ is [Ar] 3d⁵, a half-filled sub-shell.",
   "Box diagrams for Fe, [Ar] 3d⁶ 4s²; Fe²⁺, [Ar] 3d⁶ with 4s empty; Fe³⁺, [Ar] 3d⁵.",
   ["Fe: 3d⁶ 4s².", "Fe²⁺: both 4s electrons removed; 3d⁶ unchanged.", "Fe³⁺: one 3d electron removed as well, leaving five single 3d electrons."],
   rows=[{"symbol": "Fe", "label": "Fe, [Ar] 3d⁶ 4s²", "config": "[Ar] 3d6 4s2", "show": ["3d", "4s"], "core": ["1s", "2s", "2p", "3s", "3p"], "unpaired": 4},
         {"symbol": "Fe", "charge": 2, "label": "Fe²⁺, [Ar] 3d⁶", "config": "[Ar] 3d6", "show": ["3d", "4s"], "core": ["1s", "2s", "2p", "3s", "3p"], "unpaired": 4},
         {"symbol": "Fe", "charge": 3, "label": "Fe³⁺, [Ar] 3d⁵", "config": "[Ar] 3d5", "show": ["3d", "4s"], "core": ["1s", "2s", "2p", "3s", "3p"], "unpaired": 5}])

LN = {"La": 103.2, "Ce": 101, "Pr": 99, "Nd": 98.3, "Pm": 97, "Sm": 95.8, "Eu": 94.7, "Gd": 93.8, "Tb": 92.3, "Dy": 91.2, "Ho": 90.1, "Er": 89, "Tm": 88, "Yb": 86.8, "Lu": 86.1}
mk("u03-17", "chem-lanthanide-contraction", "trend", "The lanthanide contraction",
   "Across the lanthanides each extra proton is poorly shielded by the added 4f electron, so the Ln³⁺ ions shrink steadily from La³⁺ (103 pm) to Lu³⁺ (86 pm). This makes the lanthanides chemically very similar and hard to separate.",
   "Line graph of Ln³⁺ six-coordinate ionic radius falling steadily from lanthanum 103.2 pm to lutetium 86.1 pm.",
   ["La³⁺ 103.2 pm, Ce³⁺ 101, Pr³⁺ 99, falling steadily.", "Gd³⁺ 93.8 pm in the middle.", "Lu³⁺ 86.1 pm at the end."],
   also=["chemistry:u11-21"], kind="line", dataset="radiusLn3", range=[80, 106], ticks=[80, 85, 90, 95, 100, 105], yLabel="Ln³⁺ radius / pm", colour="a5",
   items=items(LN, list(LN)), claims=[{"type": "decreasing"}])

R3 = {"Na": 186, "Mg": 160, "Al": 143, "Si": 117, "P": 110, "S": 104, "Cl": 99}
mk("u03-19", "chem-atomic-radius", "trend", "Atomic radius across period 3",
   "Across period 3 the nuclear charge rises by one each step while the electrons go into the same shell with similar shielding, so the outer electrons are pulled closer and the atoms shrink from sodium (186 pm) to chlorine (99 pm).",
   "Bar chart of atomic radius falling across period 3: Na 186, Mg 160, Al 143, Si 117, P 110, S 104, Cl 99 pm.",
   ["Na 186 pm, Mg 160, Al 143, Si 117, P 110, S 104, Cl 99."],
   kind="bars", dataset="radiusAtomic", range=[0, 200], yLabel="atomic radius / pm", colour="a4", items=items(R3, list(R3)), claims=[{"type": "decreasing"}])

IR = {"O2-": 140, "F-": 133, "Na+": 102, "Mg2+": 72, "Al3+": 54}
mk("u03-20", "chem-ionic-radius", "trend", "Isoelectronic ions",
   "O²⁻, F⁻, Na⁺, Mg²⁺ and Al³⁺ all have the neon configuration, ten electrons. The nuclear charge rises from 8 to 13, pulling the same electrons closer, so the ions shrink from 140 to 54 pm.",
   "Bar chart of six-coordinate ionic radii: O²⁻ 140, F⁻ 133, Na⁺ 102, Mg²⁺ 72, Al³⁺ 54 pm.",
   ["O²⁻ 140 pm (8 protons).", "F⁻ 133 pm (9).", "Na⁺ 102 pm (11).", "Mg²⁺ 72 pm (12).", "Al³⁺ 54 pm (13)."],
   kind="bars", dataset="radiusIonic", range=[0, 160], yLabel="ionic radius / pm", colour="a2",
   items=[{"key": k, "label": k.replace("2-", "^2-").replace("3+", "^3+").replace("2+", "^2+").replace("F-", "F^-").replace("Na+", "Na^+"), "value": v} for k, v in IR.items()],
   claims=[{"type": "decreasing"}])

mk("u03-21", "chem-ie-trend-table", "trend", "First ionisation energy, hydrogen to calcium",
   "Peaks at the noble gases, troughs at the alkali metals: the pattern repeats each period, the evidence for shells. Each period starts lower than the last because the outer electron is in a new, more shielded shell.",
   "Line graph of first ionisation energy for elements 1 to 20, with peaks at He, Ne and Ar and troughs at Li, Na and K.",
   ["Helium is the highest, 2372 kJ mol⁻¹.", "Lithium, sodium and potassium are troughs at 520, 496 and 419.", "Neon (2081) and argon (1521) are peaks."],
   kind="line", dataset="ie1", range=[0, 2500], ticks=[0, 500, 1000, 1500, 2000, 2500], yLabel="first ionisation energy / kJ mol⁻¹",
   items=items(IE, ["H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar", "K", "Ca"]), highlight={"He": "a2", "Ne": "a2", "Ar": "a2", "Li": "a3", "Na": "a3", "K": "a3"},
   claims=[{"type": "max", "key": "He"}, {"type": "dip", "key": "Li", "after": "He"}, {"type": "dip", "key": "Na", "after": "Ne"}, {"type": "dip", "key": "K", "after": "Ar"}])

EN3 = {"Na": 0.93, "Mg": 1.31, "Al": 1.61, "Si": 1.90, "P": 2.19, "S": 2.58, "Cl": 3.16}
mk("u03-22", "chem-electronegativity-trend", "trend", "Electronegativity across period 3",
   "Electronegativity rises across a period as nuclear charge increases and atomic radius falls, so a bonding pair is held more tightly: from sodium (0.93) to chlorine (3.16) on the Pauling scale.",
   "Bar chart of Pauling electronegativity rising across period 3 from Na 0.93 to Cl 3.16.",
   ["Na 0.93, Mg 1.31, Al 1.61, Si 1.90, P 2.19, S 2.58, Cl 3.16."],
   kind="bars", dataset="enPauling", range=[0, 3.5], ticks=[0, 1, 2, 3], yLabel="Pauling electronegativity", colour="a1", items=items(EN3, list(EN3)), claims=[{"type": "increasing"}])

mk("u03-23", "chem-group1-ie-reactivity", "trend", "Group 1: ionisation energy and reactivity",
   "Down group 1 the outer s electron is further out and more shielded, so first ionisation energy falls from 520 to 376 kJ mol⁻¹. The electron is lost more easily, so reactivity with water rises from lithium to caesium.",
   "Bar chart of first ionisation energies of Li 520, Na 496, K 419, Rb 403, Cs 376 kJ/mol, falling down the group.",
   ["Li 520, Na 496, K 419, Rb 403, Cs 376 kJ mol⁻¹: each lower, each more reactive."],
   kind="bars", dataset="ie1", range=[0, 600], yLabel="first ionisation energy / kJ mol⁻¹", colour="a3", items=items(IE, ["Li", "Na", "K", "Rb", "Cs"]),
   claims=[{"type": "decreasing"}])

mk("u03-24", "chem-max-oxidation-p3", "trend", "Highest oxidation states across period 3",
   "The highest oxidation state equals the number of outer-shell electrons an element can use: +1 for sodium rising to +7 for chlorine (as in Cl₂O₇ and ClO₄⁻).",
   "Bar chart of the highest oxidation state rising from +1 at sodium to +7 at chlorine.",
   ["Na +1, Mg +2, Al +3, Si +4, P +5, S +6, Cl +7."],
   kind="bars", dataset="maxOxP3", range=[0, 8], ticks=[0, 2, 4, 6, 8], yLabel="highest oxidation state", colour="a4",
   items=items({"Na": 1, "Mg": 2, "Al": 3, "Si": 4, "P": 5, "S": 6, "Cl": 7}, ["Na", "Mg", "Al", "Si", "P", "S", "Cl"]), claims=[{"type": "increasing"}])

mk("u03-25", "chem-diagonal-relationships", "table", "Diagonal relationships",
   "Lithium resembles magnesium, beryllium resembles aluminium and boron resembles silicon. Moving right raises charge density and electronegativity; moving down lowers them, so a diagonal step roughly cancels.",
   "The periodic table with arrows from Li to Mg, Be to Al and B to Si.",
   ["Arrow from lithium (period 2, group 1) to magnesium (period 3, group 2).", "Arrow from beryllium to aluminium.", "Arrow from boron to silicon."],
   dim=True, groups=True, maxZ=118, highlight={"Li": "a3", "Mg": "a3", "Be": "a4", "Al": "a4", "B": "a5", "Si": "a5"}, arrows=[["Li", "Mg"], ["Be", "Al"], ["B", "Si"]],
   claims=[{"type": "diagonal", "pairs": [["Li", "Mg"], ["Be", "Al"], ["B", "Si"]]}])
