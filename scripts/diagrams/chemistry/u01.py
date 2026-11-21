"""Unit 1, Foundations of Chemistry."""
from spec import mk

SP = {"He": {"atoms": ["He"]}, "Fe": {"atoms": ["Fe"]}, "H2": {"atoms": ["H", "H"]}, "O2": {"atoms": ["O", "O"]}, "N2": {"atoms": ["N", "N"]},
      "Cl2": {"atoms": ["Cl", "Cl"]}, "H2O": {"atoms": ["O", "H", "H"], "shape": "bent"}, "CO2": {"atoms": ["C", "O", "O"], "shape": "linear"},
      "CH4": {"atoms": ["C", "H", "H", "H", "H"], "shape": "tetra"}, "HCl": {"atoms": ["Cl", "H"]}, "NaCl": {"atoms": ["Na", "Cl"]},
      "Na+": {"atoms": ["Na"], "charge": 1}, "Cl-": {"atoms": ["Cl"], "charge": -1}, "S": {"atoms": ["S"]}, "Cu2+": {"atoms": ["Cu"], "charge": 2}}
def sp(*keys): return {k: SP[k] for k in keys}

mk("u01-02", "chem-classify-matter", "classify", "Classifying matter",
   "A pure substance has a fixed composition: an element (one kind of atom) or a compound (elements chemically joined in fixed proportions). A mixture can be separated by physical means and may be uniform throughout (homogeneous) or not (heterogeneous).",
   "A tree: is the sample one substance? Yes leads to: can it be broken down chemically? Yes, compound; no, element. No leads to: is it uniform throughout? Yes, homogeneous mixture; no, heterogeneous mixture.",
   ["Is it a single pure substance with fixed composition?", "If yes: can chemical reactions break it into simpler substances? Yes, a compound such as water or sodium chloride; no, an element such as oxygen or iron.",
    "If no, it is a mixture: uniform throughout is homogeneous, such as salt water or air; otherwise heterogeneous, such as sand in water."],
   start="q1", rowHeight=110,
   nodes={"q1": {"q": "Is it one substance with a fixed composition?", "yes": "q2", "no": "q3"},
          "q2": {"q": "Can a chemical reaction break it down?", "yes": "cpd", "no": "el"},
          "cpd": {"leaf": "Compound", "examples": ["H2O", "NaCl", "CO2"], "kind": "compound", "tone": "a4"},
          "el": {"leaf": "Element", "examples": ["O2", "Fe", "He"], "kind": "element", "tone": "a1"},
          "q3": {"q": "Is it the same throughout?", "yes": "hom", "no": "het"},
          "hom": {"leaf": "Homogeneous mixture", "examples": ["salt + water", "air (N2, O2, Ar)"], "kind": "mixture", "tone": "a5"},
          "het": {"leaf": "Heterogeneous mixture", "examples": ["sand + water"], "kind": "mixture", "tone": "a3"}},
   claims=[{"type": "path", "substance": "water", "answers": ["yes", "yes"], "leaf": "Compound"}, {"type": "path", "substance": "air", "answers": ["no", "yes"], "leaf": "Homogeneous mixture"}])

mk("u01-03", "chem-elements-compounds", "particles", "Elements, compounds and mixtures as particles",
   "Helium is an element made of single atoms; oxygen is an element made of O₂ molecules; water is a compound, every molecule the same H₂O; air is a mixture of different substances.",
   "Four boxes of particles: separate helium atoms; O₂ molecules; H₂O molecules; and a mixture of N₂ and O₂ molecules with an argon atom.",
   ["Helium: single atoms, one kind only, so an element.", "Oxygen: pairs of identical atoms (O₂), an element.", "Water: every molecule one O and two H, a compound.", "Air: N₂, O₂ and argon mixed, a mixture."],
   perRow=4, panelHeight=150, species={**sp("He", "O2", "H2O", "N2"), "Ar": {"atoms": ["Ar"]}},
   panels=[{"title": "element (atoms)", "arrangement": "gas", "contents": [["He", 7]]}, {"title": "element (molecules)", "arrangement": "gas", "contents": [["O2", 6]]},
           {"title": "compound", "arrangement": "gas", "contents": [["H2O", 6]]}, {"title": "mixture", "arrangement": "gas", "contents": [["N2", 4], ["O2", 2], ["Ar", 1]]}],
   claims=[{"type": "classify", "panel": 0, "as": "element"}, {"type": "classify", "panel": 1, "as": "element"}, {"type": "classify", "panel": 2, "as": "compound"}, {"type": "classify", "panel": 3, "as": "mixture"}])

mk("u01-04", "chem-mixtures", "particles", "A mixture keeps its components",
   "Mixing hydrogen, oxygen and water vapour makes a mixture: each substance keeps its own particles and properties, the proportions can vary, and they can be separated by physical means.",
   "One box containing H₂ molecules, O₂ molecules and H₂O molecules mixed together.",
   ["Hydrogen molecules (H₂), oxygen molecules (O₂) and water molecules (H₂O) moving freely among each other.", "No new substance has formed."],
   species=sp("H2", "O2", "H2O"), panelHeight=200,
   panels=[{"title": "a mixture of three substances", "arrangement": "gas", "contents": [["H2", 5], ["O2", 4], ["H2O", 4]]}],
   claims=[{"type": "classify", "panel": 0, "as": "mixture"}, {"type": "count", "panel": 0, "species": "H2O", "n": 4}])

mk("u01-05", "chem-physical-chemical-change", "particles", "Physical and chemical change",
   "Melting ice is a physical change: the same H₂O molecules, now free to move. Burning hydrogen is a chemical change: atoms rearrange into a new substance, 2H₂ + O₂ → 2H₂O. In both, every atom is still there.",
   "Top: ice as an ordered grid of water molecules becoming liquid water, the same molecules disordered. Bottom: hydrogen and oxygen molecules becoming water molecules.",
   ["Ice: water molecules in a regular arrangement.", "Water: the same nine molecules, close together but disordered.", "Hydrogen and oxygen: four H₂ and two O₂ molecules.", "After burning: four H₂O molecules, the same atoms rearranged."],
   perRow=4, panelHeight=150, species=sp("H2O", "H2", "O2"), steps=["melting: physical", None, "burning: chemical"],
   panels=[{"title": "ice", "arrangement": "lattice", "contents": [["H2O", 9]]}, {"title": "liquid water", "arrangement": "liquid", "contents": [["H2O", 9]]},
           {"title": "hydrogen + oxygen", "arrangement": "gas", "contents": [["H2", 4], ["O2", 2]]}, {"title": "water", "arrangement": "gas", "contents": [["H2O", 4]]}],
   claims=[{"type": "conserved", "panels": [0, 1]}, {"type": "conserved", "panels": [2, 3]}, {"type": "equation", "eq": "2H2 + O2 → 2H2O", "panels": [2, 3]}])

mk("u01-06", "chem-states-of-matter", "particles", "Solid, liquid and gas",
   "In a solid the particles are packed in a regular pattern and vibrate in place. In a liquid they are still touching but move past each other. In a gas they are far apart and move quickly in all directions.",
   "Three boxes: water molecules in a regular grid (solid), close but disordered (liquid), and widely spaced with motion arrows (gas).",
   ["Solid: particles in fixed, regular positions.", "Liquid: particles close together, irregular, sliding past each other.", "Gas: particles far apart, moving randomly."],
   also=["gcse:u05-05"], species=sp("H2O"), steps=["melting", "boiling"], reversible=[True, True],
   panels=[{"title": "solid", "arrangement": "lattice", "contents": [["H2O", 12]]}, {"title": "liquid", "arrangement": "liquid", "contents": [["H2O", 11]]},
           {"title": "gas", "arrangement": "gas", "contents": [["H2O", 5]], "motion": True}],
   claims=[{"type": "states", "panel": 0, "as": "solid"}, {"type": "states", "panel": 1, "as": "liquid"}, {"type": "states", "panel": 2, "as": "gas"}])

mk("u01-10", "chem-equation-particles", "particles", "An equation as particles",
   "CH₄ + 2O₂ → CO₂ + 2H₂O: one methane molecule and two oxygen molecules become one carbon dioxide and two water molecules. Count the atoms: 1 C, 4 H and 4 O on each side, so mass is conserved.",
   "Before: one methane and two oxygen molecules. After: one carbon dioxide and two water molecules.",
   ["Before: CH₄ and two O₂, holding 1 carbon, 4 hydrogen and 4 oxygen atoms.", "After: CO₂ and two H₂O, again 1 carbon, 4 hydrogen and 4 oxygen atoms."],
   also=["gcse:u05-06"], species=sp("CH4", "O2", "CO2", "H2O"), steps=["burns"], panelHeight=150,
   panels=[{"title": "CH₄ + 2O₂", "arrangement": "gas", "contents": [["CH4", 1], ["O2", 2]], "spacing": 14}, {"title": "CO₂ + 2H₂O", "arrangement": "gas", "contents": [["CO2", 1], ["H2O", 2]], "spacing": 14}],
   claims=[{"type": "conserved", "panels": [0, 1]}, {"type": "equation", "eq": "CH4 + 2O2 → CO2 + 2H2O", "panels": [0, 1]}])

mk("u01-11", "chem-balancing", "particles", "Balancing by counting atoms",
   "H₂ + O₂ → H₂O leaves an oxygen atom unaccounted for. Putting 2 in front of H₂O balances oxygen, and 2 in front of H₂ then balances hydrogen: 2H₂ + O₂ → 2H₂O. Only the numbers in front change, never the formulae.",
   "Before: two hydrogen molecules and one oxygen molecule. After: two water molecules.",
   ["Left side: 2H₂ and O₂, so 4 hydrogen and 2 oxygen atoms.", "Right side: 2H₂O, 4 hydrogen and 2 oxygen atoms. Balanced."],
   species=sp("H2", "O2", "H2O"), steps=["react"], panelHeight=140,
   panels=[{"title": "2H₂ + O₂", "arrangement": "gas", "contents": [["H2", 2], ["O2", 1]], "spacing": 16}, {"title": "2H₂O", "arrangement": "gas", "contents": [["H2O", 2]], "spacing": 16}],
   claims=[{"type": "conserved", "panels": [0, 1]}, {"type": "equation", "eq": "2H2 + O2 → 2H2O", "panels": [0, 1]}])

mk("u01-12", "chem-ar-chlorine", "ms", "Chlorine's isotopes and its relative atomic mass",
   "A mass spectrum of chlorine atoms shows ³⁵Cl (75.8%) and ³⁷Cl (24.2%). The weighted mean, (34.97 × 75.8 + 36.97 × 24.2) ÷ 100, is 35.45, the relative atomic mass in the periodic table.",
   "Mass spectrum with two lines: m/z 35 at 75.8% and m/z 37 at 24.2%.",
   ["A tall line at m/z 35, abundance 75.8%.", "A shorter line at m/z 37, abundance 24.2%.", "Ar = (34.97 × 75.8 + 36.97 × 24.2) ÷ 100 = 35.45."],
   kind="isotopes", range=[30, 42], tick=1, ar=35.45,
   peaks=[{"mz": 35, "mass": 34.969, "rel": 75.8, "label": "³⁵Cl, 75.8%", "colour": "a1"}, {"mz": 37, "mass": 36.966, "rel": 24.2, "label": "³⁷Cl, 24.2%", "colour": "a2"}],
   notes=["Ar = (34.97 × 75.8 + 36.97 × 24.2) ÷ 100 = 35.45"])

mk("u01-18", "chem-limiting-reagent", "particles", "The limiting reagent",
   "Six H₂ molecules and two O₂ molecules: by 2H₂ + O₂ → 2H₂O the two O₂ can use only four H₂, making four H₂O. Oxygen runs out first, so it is limiting; two H₂ are left over.",
   "Before: six hydrogen molecules and two oxygen molecules. After: four water molecules and two leftover hydrogen molecules.",
   ["Before: 6 H₂ and 2 O₂.", "After: 4 H₂O and 2 unreacted H₂. Oxygen was used up, so it was the limiting reagent."],
   species=sp("H2", "O2", "H2O"), steps=["react"], panelHeight=160,
   panels=[{"title": "6H₂ + 2O₂", "arrangement": "gas", "contents": [["H2", 6], ["O2", 2]]}, {"title": "4H₂O + 2H₂ left over", "arrangement": "gas", "contents": [["H2O", 4], ["H2", 2]]}],
   claims=[{"type": "conserved", "panels": [0, 1]}, {"type": "equation", "eq": "2H2 + O2 → 2H2O", "panels": [0, 1], "leftover": {"H2": 2}}])

mk("u01-21", "chem-concentration", "particles", "Concentration: solute per volume",
   "Both beakers hold the same volume of solution, but the right one has twice as many dissolved particles, so it is twice as concentrated. Concentration = amount of solute ÷ volume of solution.",
   "Two beakers filled to the same level; the left has five dissolved copper ions, the right ten.",
   ["Left: same volume, 5 solute particles.", "Right: same volume, 10 solute particles, twice the concentration."],
   also=["gcse:u05-07"], species=sp("Cu2+"), panelHeight=180, steps=[None],
   panels=[{"title": "dilute", "container": "beaker", "arrangement": "random", "contents": [["Cu2+", 5]], "fill": 0.8}, {"title": "concentrated", "container": "beaker", "arrangement": "random", "contents": [["Cu2+", 10]], "fill": 0.8}],
   claims=[{"type": "concentration", "solute": "Cu2+", "more": 1, "less": 0, "ratio": 2}])

mk("u01-22", "chem-dilution", "particles", "Dilution keeps the moles, spreads the volume",
   "Adding water doubles the volume but adds no solute. The eight solute particles are now spread through twice the volume, so the concentration halves: c₁V₁ = c₂V₂.",
   "Left: a beaker half full with eight solute particles. Right: the beaker full to twice the volume, still eight particles.",
   ["Before: 8 solute particles in volume V.", "After adding water: the same 8 particles in volume 2V, half the concentration."],
   species=sp("Cu2+"), steps=["add water"], panelHeight=190,
   panels=[{"title": "before: volume V", "container": "beaker", "arrangement": "random", "contents": [["Cu2+", 8]], "fill": 0.42, "volume": 1}, {"title": "after: volume 2V", "container": "beaker", "arrangement": "random", "contents": [["Cu2+", 8]], "fill": 0.84, "volume": 2}],
   claims=[{"type": "count", "panel": 1, "species": "Cu2+", "n": 8}, {"type": "concentration", "solute": "Cu2+", "more": 0, "less": 1, "ratio": 2}])
