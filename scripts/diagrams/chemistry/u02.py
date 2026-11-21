"""Unit 2, Atomic Structure and Quantum Chemistry: run to rewrite these specs."""
from spec import mk

mk("u02-01", "chem-atom-structure", "atom", "The nuclear atom: carbon-12",
   "Six protons and six neutrons make a tiny nucleus; six electrons occupy shells around it, two in the first and four in the second. Not to scale: the nucleus is about 100 000 times smaller than the atom.",
   "A carbon atom: a nucleus labelled 6 protons and 6 neutrons, with two electrons in the inner shell and four in the outer shell.",
   ["A small central nucleus labelled 6 p and 6 n.", "Two circles around it are the shells: two electrons on the inner shell, four on the outer shell.",
    "Below: carbon, 6 protons, 6 neutrons, 6 electrons."],
   also=["gcse:u05-02"], big=True,
   atoms=[{"symbol": "C", "A": 12, "label": "carbon-12", "claims": {"protons": 6, "neutrons": 6, "electrons": 6, "shells": [2, 4]}}])

mk("u02-02", "chem-atom-sodium-ion", "atom", "A sodium atom and a sodium ion",
   "Na and Na⁺ have the same nucleus, 11 protons and 12 neutrons. The ion has lost its single outer electron, so 11 positive charges and 10 negative ones leave a charge of +1.",
   "Sodium atom with shells 2, 8, 1 beside the sodium ion with shells 2, 8; both nuclei have 11 protons and 12 neutrons.",
   ["Left: sodium atom, nucleus 11 p and 12 n, electrons 2, 8, 1.", "Right: sodium ion Na⁺, the same nucleus, electrons 2, 8; charge 11 − 10 = +1."],
   atoms=[{"symbol": "Na", "A": 23, "label": "Na atom", "claims": {"protons": 11, "neutrons": 12, "electrons": 11, "shells": [2, 8, 1]}},
          {"symbol": "Na", "A": 23, "charge": 1, "claims": {"electrons": 10, "shells": [2, 8]}}])

mk("u02-03", "chem-isotopes-chlorine", "atom", "Isotopes of chlorine",
   "Chlorine-35 and chlorine-37 both have 17 protons and 17 electrons arranged 2, 8, 7, so they react the same way. Only the neutrons differ: 18 against 20.",
   "Two chlorine atoms side by side with identical electron shells 2, 8, 7; one nucleus has 17 protons and 18 neutrons, the other 17 protons and 20 neutrons.",
   ["Left: chlorine-35, nucleus 17 p and 18 n, electrons 2, 8, 7.", "Right: chlorine-37, nucleus 17 p and 20 n, electrons 2, 8, 7.",
    "Nuclide symbols above each: ³⁵₁₇Cl and ³⁷₁₇Cl."],
   also=["gcse:u05-01"],
   atoms=[{"symbol": "Cl", "A": 35, "label": "chlorine-35", "nuclide": True, "claims": {"protons": 17, "neutrons": 18, "electrons": 17}},
          {"symbol": "Cl", "A": 37, "label": "chlorine-37", "nuclide": True, "claims": {"protons": 17, "neutrons": 20, "electrons": 17}}])

mk("u02-04", "chem-nuclide-notation", "atom", "Nuclide notation in a beta decay",
   "The mass number A (protons + neutrons) is written top left and the atomic number Z (protons) bottom left. In ¹⁴₆C → ¹⁴₇N + ⁰₋₁e a neutron becomes a proton: A stays 14 and Z rises from 6 to 7, so the element changes from carbon to nitrogen.",
   "Carbon-14 with 6 protons and 8 neutrons beside nitrogen-14 with 7 protons and 7 neutrons, each with its nuclide symbol.",
   ["Left: ¹⁴₆C, nucleus 6 p and 8 n, electrons 2, 4.", "Right: ¹⁴₇N, nucleus 7 p and 7 n, electrons 2, 5.",
    "Both have mass number 14; the atomic number has risen by one."],
   atoms=[{"symbol": "C", "A": 14, "label": "carbon-14", "nuclide": True, "claims": {"protons": 6, "neutrons": 8}},
          {"symbol": "N", "A": 14, "label": "nitrogen-14", "nuclide": True, "claims": {"protons": 7, "neutrons": 7}}])

mk("u02-05", "chem-shells-period3", "atom", "Electron shells across period 3",
   "For the first 20 elements the shells fill 2, then 8, then 8. Sodium to argon all have full first and second shells; the third shell gains one electron per element, which is why they sit in groups 1, 2, 17 and 18.",
   "Four atoms: sodium 2, 8, 1; magnesium 2, 8, 2; chlorine 2, 8, 7; argon 2, 8, 8.",
   ["Sodium: shells 2, 8, 1.", "Magnesium: shells 2, 8, 2.", "Chlorine: shells 2, 8, 7.", "Argon: shells 2, 8, 8, a full outer shell."],
   perRow=2,
   atoms=[{"symbol": "Na", "A": 23, "claims": {"shells": [2, 8, 1]}}, {"symbol": "Mg", "A": 24, "claims": {"shells": [2, 8, 2]}},
          {"symbol": "Cl", "A": 35, "claims": {"shells": [2, 8, 7]}}, {"symbol": "Ar", "A": 40, "claims": {"shells": [2, 8, 8]}}])

mk("u02-06", "chem-subshell-energies", "orbitals", "Sub-shell energies up to 4p",
   "Each box is an orbital: one per s, three per p, five per d. Energy rises up the page (not to scale). The 4s sub-shell lies just below 3d, so it fills first.",
   "An energy ladder of empty orbital boxes: 1s at the bottom, then 2s, 2p, 3s, 3p, 4s, 3d and 4p at the top.",
   ["From the bottom: 1s (one box), 2s (one), 2p (three), 3s (one), 3p (three), 4s (one), 3d (five), 4p (three).",
    "4s is drawn below 3d, the first place the energy order differs from the shell order."],
   kind="energy", subshells=["1s", "2s", "2p", "3s", "3p", "4s", "3d", "4p"])

mk("u02-07", "chem-quantum-numbers", "orbitals", "Quantum numbers in the second shell: neon",
   "n = 2 holds one 2s orbital (l = 0) and three 2p orbitals (l = 1, mₗ = −1, 0, +1). Each orbital holds two electrons of opposite spin, mₛ = +½ (up) and −½ (down): eight electrons in all, 2n².",
   "Orbital boxes for neon: 1s, 2s and three 2p boxes labelled with mₗ = −1, 0 and +1, each holding an up and a down arrow.",
   ["1s: one box with a pair of electrons.", "2s: one box with a pair.", "2p: three boxes labelled mₗ −1, 0, +1, each with a pair: up for mₛ = +½, down for −½."],
   rows=[{"symbol": "Ne", "label": "Neon, 1s² 2s² 2p⁶", "config": "1s2 2s2 2p6", "ml": True}])

mk("u02-08", "chem-config-cr-cu", "orbitals", "Chlorine, chromium and copper in boxes",
   "Chlorine follows the filling order. Chromium and copper do not: one 4s electron moves into 3d to give a half-filled 3d⁵ or a full 3d¹⁰, so chromium is [Ar] 3d⁵ 4s¹ and copper is [Ar] 3d¹⁰ 4s¹.",
   "Orbital box diagrams of the outer sub-shells: chlorine 3s² 3p⁵; chromium 3d⁵ 4s¹ with five single 3d electrons; copper 3d¹⁰ 4s¹.",
   ["Chlorine, [Ne] 3s² 3p⁵: 3s paired, 3p with two pairs and one single electron.",
    "Chromium, [Ar] 3d⁵ 4s¹: five single 3d electrons, all spin up, and one 4s electron.",
    "Copper, [Ar] 3d¹⁰ 4s¹: five paired 3d orbitals and one 4s electron."],
   rows=[{"symbol": "Cl", "label": "Chlorine, [Ne] 3s² 3p⁵", "config": "[Ne] 3s2 3p5", "show": ["3s", "3p"], "core": ["1s", "2s", "2p"], "unpaired": 1},
         {"symbol": "Cr", "label": "Chromium, [Ar] 3d⁵ 4s¹", "config": "[Ar] 3d5 4s1", "show": ["3d", "4s"], "core": ["1s", "2s", "2p", "3s", "3p"], "unpaired": 6},
         {"symbol": "Cu", "label": "Copper, [Ar] 3d¹⁰ 4s¹", "config": "[Ar] 3d10 4s1", "show": ["3d", "4s"], "core": ["1s", "2s", "2p", "3s", "3p"], "unpaired": 1}])

mk("u02-09", "chem-aufbau-order", "orbitals", "The order of filling",
   "Write the sub-shells in rows by shell and follow the diagonals from upper right to lower left: this is the n + l rule. Sub-shells fill in order of increasing n + l, the lower n first when n + l is equal, which puts 4s before 3d and 5s before 4d.",
   "A grid of sub-shell labels 1s to 7s with diagonal arrows; reading along the arrows gives 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s and onwards.",
   ["Rows: 1s; 2s 2p; 3s 3p 3d; 4s 4p 4d 4f; and so on to 7s.", "Diagonal arrows run from upper right to lower left.",
    "Reading them in turn gives the filling order 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f, 6d, 7p."],
   kind="diagonal")

mk("u02-10", "chem-pauli", "orbitals", "Two electrons per orbital, opposite spins",
   "Helium's two electrons share 1s with opposite spins. Lithium's third electron cannot enter 1s, which is full, so it starts 2s. Nitrogen's 2p electrons are each in their own box.",
   "Box diagrams: helium 1s²; lithium 1s² 2s¹; nitrogen 1s² 2s² 2p³ with three single 2p electrons.",
   ["Helium: one 1s box with an up and a down arrow.", "Lithium: 1s paired, 2s with a single up arrow.", "Nitrogen: 1s and 2s paired, three 2p boxes each with one up arrow."],
   rows=[{"symbol": "He", "label": "Helium, 1s²", "config": "1s2"}, {"symbol": "Li", "label": "Lithium, 1s² 2s¹", "config": "1s2 2s1"},
         {"symbol": "N", "label": "Nitrogen, 1s² 2s² 2p³", "config": "1s2 2s2 2p3", "unpaired": 3}])

mk("u02-11", "chem-hund-np", "orbitals", "Hund's rule: nitrogen and oxygen",
   "In nitrogen the three 2p electrons occupy separate orbitals with parallel spins. Oxygen's fourth 2p electron must pair, and the repulsion within that pair makes it easier to remove: oxygen's first ionisation energy (1314 kJ mol⁻¹) is below nitrogen's (1402).",
   "2s and 2p boxes for nitrogen, three single parallel electrons in 2p, and oxygen, one paired and two single 2p electrons.",
   ["Nitrogen, 2s² 2p³: three 2p boxes each with one up arrow.", "Oxygen, 2s² 2p⁴: the first 2p box paired, the other two singly occupied."],
   rows=[{"symbol": "N", "label": "Nitrogen, [He] 2s² 2p³", "config": "1s2 2s2 2p3", "show": ["2s", "2p"], "core": ["1s"], "unpaired": 3},
         {"symbol": "O", "label": "Oxygen, [He] 2s² 2p⁴", "config": "1s2 2s2 2p4", "show": ["2s", "2p"], "core": ["1s"], "unpaired": 2}])

ie_al = {1: 578, 2: 1817, 3: 2745, 4: 11577, 5: 14842, 6: 18379, 7: 23326, 8: 27465, 9: 31853, 10: 38473, 11: 42647, 12: 201266, 13: 222316}
mk("u02-12", "chem-successive-ie-al", "trend", "Successive ionisation energies of aluminium",
   "On a log scale each ionisation is a little harder than the last, with two large jumps: after the 3rd electron (the next comes from the second shell) and after the 11th (the next comes from the first). Three outer electrons put aluminium in group 13.",
   "Line graph of the 13 successive ionisation energies of aluminium on a logarithmic axis, rising gradually with big jumps between the 3rd and 4th and between the 11th and 12th.",
   ["Ionisations 1 to 3: 578, 1817 and 2745 kJ mol⁻¹, the three outer electrons.",
    "Ionisation 4 jumps to 11 577 kJ mol⁻¹: the electron comes from the second shell.",
    "Ionisations 4 to 11 rise steadily to 42 647; ionisations 12 and 13 jump to about 201 000 and 222 000, the first shell."],
   kind="line", dataset="ieAl", log=True, range=[300, 400000], ticks=[1000, 10000, 100000],
   yLabel="ionisation energy / kJ mol⁻¹ (log scale)", xTitle="electron removed",
   items=[{"key": str(k), "value": v} for k, v in ie_al.items()], highlight={"3": "a2", "11": "a2"},
   notes=[{"key": "3", "text": "jump: new shell", "dy": -30}, {"key": "11", "text": "jump: first shell", "dy": -30}],
   claims=[{"type": "increasing"}, {"type": "jumps", "after": ["3", "11"], "factor": 4}])

mk("u02-13", "chem-electron-affinity-p3", "trend", "First electron affinities across period 3",
   "Gaining an electron releases energy for these atoms, most of all for chlorine, whose extra electron completes the 3p sub-shell. Phosphorus (3p³, half-filled) releases less than silicon: its value is less negative. Magnesium and argon form no stable 1− ion and are left out.",
   "Bar chart of first electron affinities, all negative: sodium −53, aluminium −42, silicon −134, phosphorus −72, sulfur −200, chlorine −349 kJ mol⁻¹.",
   ["Sodium −53, aluminium −42 and silicon −134 kJ mol⁻¹.", "Phosphorus −72, smaller than silicon because its 3p is half filled.",
    "Sulfur −200 and chlorine −349, the most exothermic."],
   kind="bars", dataset="ea1", range=[-400, 0], ticks=[-400, -300, -200, -100, 0], yLabel="first electron affinity / kJ mol⁻¹",
   items=[{"key": k, "value": v} for k, v in [("Na", -53), ("Al", -42), ("Si", -134), ("P", -72), ("S", -200), ("Cl", -349)]],
   highlight={"Cl": "a2", "P": "a3"}, claims=[{"type": "min", "key": "Cl"}, {"type": "order", "keys": ["Si", "P"]}])

ie = {"Li": 520, "Be": 899, "B": 801, "C": 1086, "N": 1402, "O": 1314, "F": 1681, "Ne": 2081, "Na": 496, "Mg": 738, "Al": 578, "Si": 787, "P": 1012, "S": 1000, "Cl": 1251, "Ar": 1521}
mk("u02-19", "chem-ie-period-2-3", "trend", "First ionisation energy, lithium to argon",
   "Ionisation energy rises across each period as nuclear charge grows with similar shielding, and falls sharply at each new period. The small dips at boron and aluminium (a new p sub-shell) and at oxygen and sulfur (the first paired p electron) are evidence for sub-shells.",
   "Line graph of first ionisation energy for elements 3 to 18, rising across period 2 to neon, dropping to sodium, rising again to argon, with dips at B, O, Al and S.",
   ["Period 2: lithium 520 rising to neon 2081 kJ mol⁻¹, with dips at boron (801, below beryllium 899) and oxygen (1314, below nitrogen 1402).",
    "Sodium drops to 496: a new shell.", "Period 3 repeats the pattern, with dips at aluminium (578) and sulfur (1000), up to argon 1521."],
   kind="line", dataset="ie1", range=[0, 2400], ticks=[0, 500, 1000, 1500, 2000], yLabel="first ionisation energy / kJ mol⁻¹",
   items=[{"key": k, "value": v} for k, v in ie.items()], highlight={k: "a2" for k in ["B", "O", "Al", "S"]},
   claims=[{"type": "dip", "key": "B", "after": "Be"}, {"type": "dip", "key": "O", "after": "N"}, {"type": "dip", "key": "Al", "after": "Mg"},
           {"type": "dip", "key": "S", "after": "P"}, {"type": "max", "key": "Ne"}, {"type": "dip", "key": "Na", "after": "Ne"}])

mk("u02-20", "chem-config-reactivity", "orbitals", "Why sodium loses and chlorine gains",
   "Sodium has one 3s electron outside a full shell; losing it leaves the neon configuration. Chlorine is one electron short of filling 3p; gaining one gives the argon configuration. The ions Na⁺ and Cl⁻ both have full outer sub-shells.",
   "Box diagrams for Na, 3s¹, and Na⁺ with nothing in shell 3; Cl, 3s² 3p⁵, and Cl⁻, 3s² 3p⁶.",
   ["Na: one electron in 3s.", "Na⁺: the 3s box is empty; 2p is full.", "Cl: 3s² 3p⁵, one 3p box singly occupied.", "Cl⁻: 3s² 3p⁶, every box paired."],
   rows=[{"symbol": "Na", "label": "Na, [Ne] 3s¹", "config": "[Ne] 3s1", "show": ["2p", "3s"], "core": ["1s", "2s"]},
         {"symbol": "Na", "charge": 1, "label": "Na⁺, [Ne]", "config": "1s2 2s2 2p6", "show": ["2p", "3s"], "core": ["1s", "2s"]},
         {"symbol": "Cl", "label": "Cl, [Ne] 3s² 3p⁵", "config": "[Ne] 3s2 3p5", "show": ["3s", "3p"], "core": ["1s", "2s", "2p"]},
         {"symbol": "Cl", "charge": -1, "label": "Cl⁻, [Ne] 3s² 3p⁶", "config": "[Ne] 3s2 3p6", "show": ["3s", "3p"], "core": ["1s", "2s", "2p"]}])

mk("u02-14", "chem-hydrogen-spectrum", "levels", "The hydrogen spectrum",
   "Hydrogen's energy levels, Eₙ = −13.6 eV ÷ n², crowd together towards n = ∞. Electrons falling to n = 1 emit ultraviolet (Lyman series), to n = 2 visible light (Balmer: 656, 486, 434 and 410 nm) and to n = 3 infrared (Paschen). Each line is one jump between two levels.",
   "Energy levels n = 1 to 6, drawn to scale and converging below n = ∞, with downward arrows for the Lyman series to n = 1, the Balmer series to n = 2 and the Paschen series to n = 3.",
   ["n = 1 at −13.6 eV, n = 2 at −3.40 eV, n = 3 at −1.51 eV, converging at 0.", "Lyman series: arrows ending on n = 1 (ultraviolet).", "Balmer series: arrows ending on n = 2 (visible).", "Paschen series: arrows ending on n = 3 (infrared)."],
   also=["chemistry:u16-10"], kind="hydrogen", levels=6, balmerNm=[656, 486, 434, 410])

mk("u02-15", "chem-emission-absorption", "levels", "Emission and absorption spectra of hydrogen",
   "Hot hydrogen gas emits light only at certain wavelengths: bright lines on black. Cool hydrogen in front of a white light absorbs exactly the same wavelengths: dark lines on the continuous spectrum. The lines match because each corresponds to the same energy gap, ΔE = hc/λ.",
   "Two spectrum strips from 380 to 720 nm: emission with coloured lines at 410, 434, 486 and 656 nm on black, and a full rainbow with dark lines at the same positions.",
   ["Emission: violet 410, violet 434, blue-green 486 and red 656 nm lines on black.", "Absorption: a continuous rainbow with dark lines at 410, 434, 486 and 656 nm."],
   kind="spectrum", balmerNm=[656, 486, 434, 410])

r1s = "4*x^2*exp(-2*x)"
mk("u02-17", "chem-radial-1s", "graph", "Where the 1s electron is",
   "The radial probability distribution 4πr²ψ² for hydrogen's 1s electron. The electron is most likely to be found at the Bohr radius, a₀ = 52.9 pm, but there is a spread of distances: the quantum model replaces a fixed orbit with a probability.",
   "Probability against distance from the nucleus in units of a₀: zero at the nucleus, a peak at 1 a₀, and a long tail.",
   ["Zero at the nucleus.", "Maximum at r = a₀ = 52.9 pm.", "A tail stretching out several a₀."],
   range={"x": [0, 6], "y": [0, 0.6]}, ticks=[[1, 2, 3, 4, 5, 6], [0.2, 0.4]], grid=[1, 0.1], axisLabels=["r / a₀", "radial probability"], xLabelBelow=True,
   curves=[{"expr": r1s, "colour": "a1"}], marks=[{"x": 1, "label": "a₀ = 52.9 pm", "to": 0.54}],
   checks=[{"type": "max", "expr": r1s, "domain": [0, 6], "x": 1, "y": round(4 * __import__("math").exp(-2), 5), "name": "the most probable distance is the Bohr radius, r = a₀"},
           {"type": "area", "expr": r1s, "from": 0, "to": 40, "value": 1, "name": "total probability 1"}])

mk("u02-18", "chem-orbital-shapes", "lobes", "The shapes of s, p and d orbitals",
   "s orbitals are spheres; each p orbital has two lobes along an axis with a nodal plane between them; most d orbitals have four lobes. The colours show the opposite signs of the wavefunction, which matter when orbitals overlap to form bonds. An orbital has l angular nodes and n − l − 1 radial nodes.",
   "Five orbital shapes: 1s sphere, 2s sphere with an inner sphere of opposite sign, 2pₓ and 2p_z dumbbells, 3d_xy cloverleaf and 3d_z² with a ring.",
   ["1s: a sphere, no nodes.", "2s: a sphere with one radial node.", "2pₓ, 2p_z: two lobes, one nodal plane.", "3d_xy: four lobes between the axes, two nodal planes.", "3d_z²: two lobes on z and a ring."],
   orbitals=[{"name": "1s"}, {"name": "2s", "claims": {"radial": 1}}, {"name": "2px", "claims": {"angular": 1}}, {"name": "2pz"}, {"name": "3dxy", "claims": {"angular": 2}}, {"name": "3dz2"}])
