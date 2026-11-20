"""Units 9 and 10: acids, bases and aqueous chemistry; redox and electrochemistry."""
import math
from spec import mk

HA = {"c": 0.1, "pKa": [4.76]}            # ethanoic acid
SA = {"c": 0.1, "strong": True}            # hydrochloric acid
NAOH = {"base": True, "strong": True, "c": 0.1}
NH3 = {"base": True, "pKb": 4.75, "c": 0.1}
IND = [{"name": "methyl orange", "range": [3.1, 4.4], "colour": "a3"}, {"name": "phenolphthalein", "range": [8.3, 10.0], "colour": "a2"}]

mk("u09-01", "chem-ph-scale", "trend", "The pH scale",
   "pH runs from about 0 (strongly acidic) to 14 (strongly alkaline), with 7 neutral at 25 °C. Each step of 1 is a factor of 10 in [H⁺]: stomach acid at pH 1.5 has about 300 000 times the [H⁺] of blood at pH 7.4. Typical values.",
   "Bar chart of typical pH values from stomach acid 1.5 through pure water 7 to bleach 12.6.",
   ["Acidic: stomach acid 1.5, lemon juice 2.4, vinegar 2.9, coffee 5.0.", "Neutral: pure water 7.0.", "Alkaline: blood 7.4, seawater 8.1, baking soda solution 8.3, household ammonia 11.6, bleach 12.6."],
   also=["gcse:u05-09"], kind="bars", range=[0, 14], ticks=[0, 2, 4, 6, 7, 8, 10, 12, 14], yLabel="typical pH",
   items=[{"key": k, "value": v} for k, v in [("stomach acid", 1.5), ("lemon", 2.4), ("vinegar", 2.9), ("coffee", 5.0), ("water", 7.0), ("blood", 7.4), ("seawater", 8.1), ("baking soda", 8.3), ("ammonia", 11.6), ("bleach", 12.6)]],
   highlight={"stomach acid": "a2", "lemon": "a2", "vinegar": "a2", "coffee": "a3", "water": "a4", "blood": "a1", "seawater": "a1", "baking soda": "a1", "ammonia": "a5", "bleach": "a5"},
   claims=[{"type": "increasing"}])

mk("u09-03", "chem-bronsted-pairs", "structures", "Conjugate acid–base pairs",
   "HCl donates a proton to water. HCl and Cl⁻ are a conjugate pair, differing by one H⁺; H₂O and H₃O⁺ are the other. Water acts as a Brønsted–Lowry base here.",
   "HCl + H₂O → Cl⁻ + H₃O⁺ drawn as structures, with the conjugate pairs labelled.",
   ["HCl, the acid, gives up H⁺ and becomes Cl⁻, its conjugate base.", "H₂O, the base, gains H⁺ and becomes H₃O⁺, its conjugate acid."],
   between=["+", "→", "+"], panels=[{"smiles": "Cl", "label": "HCl", "sub": "acid"}, {"smiles": "O", "label": "H₂O", "sub": "base", "displayed": True},
                                     {"smiles": "[Cl-]", "label": "Cl⁻", "sub": "conjugate base of HCl"}, {"smiles": "[OH3+]", "label": "H₃O⁺", "sub": "conjugate acid of H₂O", "displayed": True}],
   claims=[{"type": "reaction", "left": [0, 1], "right": [2, 3]}])

SPA = {"HCl": {"atoms": ["Cl", "H"]}, "HF": {"atoms": ["F", "H"]}, "H3O+": {"atoms": ["O", "H", "H", "H"], "shape": "trigonal", "charge": 1},
       "Cl-": {"atoms": ["Cl"], "charge": -1}, "F-": {"atoms": ["F"], "charge": -1}}
mk("u09-05", "chem-strong-weak-acid", "particles", "Strong and weak acids",
   "A strong acid such as HCl is fully ionised in water: every molecule has given its proton to water. A weak acid such as HF ionises only slightly, so most of it stays as molecules and [H₃O⁺] is much lower at the same concentration.",
   "Two beakers: hydrochloric acid with only H₃O⁺ and Cl⁻ ions; hydrofluoric acid mostly as HF molecules with a few H₃O⁺ and F⁻ ions.",
   ["Hydrochloric acid: 6 H₃O⁺ and 6 Cl⁻, no HCl molecules left.", "Hydrofluoric acid: 5 HF molecules and only 1 H₃O⁺ and 1 F⁻."],
   species=SPA, steps=[None], panelHeight=180,
   panels=[{"title": "strong: HCl(aq)", "container": "beaker", "arrangement": "random", "contents": [["H3O+", 6], ["Cl-", 6]]},
           {"title": "weak: HF(aq)", "container": "beaker", "arrangement": "random", "contents": [["HF", 5], ["H3O+", 1], ["F-", 1]]}],
   claims=[{"type": "count", "panel": 0, "species": "HCl", "n": 0}, {"type": "count", "panel": 1, "species": "HF", "n": 5}])

frac = "1/(1+10^(4.76-x))"
mk("u09-06", "chem-weak-acid-fraction", "graph", "How much of a weak acid is ionised",
   "The fraction of ethanoic acid present as ethanoate depends on pH: 1/(1 + 10^(pKa − pH)). It is half at pH = pKa = 4.76, about 1% two units below and 99% two units above.",
   "Fraction ionised against pH: an S-shaped curve rising from near 0 at pH 2 through 0.5 at 4.76 to near 1 at pH 7.",
   ["Below pH 3: almost all molecules.", "At pH 4.76: half ionised.", "Above pH 7: almost all ethanoate."],
   range={"x": [1, 9], "y": [0, 1.05]}, ticks=[[2, 3, 4, 5, 6, 7, 8], [0.5, 1]], grid=[1, 0.25], axisLabels=["pH", "fraction ionised"], xLabelBelow=True,
   curves=[{"expr": frac, "colour": "a1"}], points=[{"x": 4.76, "y": 0.5, "label": "pH = pKa"}],
   checks=[{"type": "point", "expr": frac, "x": 4.76, "y": 0.5, "name": "half ionised at pH = pKa = 4.76"}, {"type": "value", "expr": frac, "x": 2.76, "between": [0.0098, 0.0100], "name": "about 1% two units below pKa"}])

mk("u09-07", "chem-ph-log", "graph", "pH is a logarithmic scale",
   "pH = −log₁₀[H⁺]. A tenfold dilution of a strong acid raises the pH by exactly 1: 0.1 mol dm⁻³ HCl is pH 1, 0.01 is pH 2, 0.001 is pH 3.",
   "pH against log₁₀[H⁺]: a straight line of gradient −1 through (−1, 1), (−2, 2) and (−3, 3).",
   ["[H⁺] = 10⁻¹: pH 1.", "[H⁺] = 10⁻²: pH 2.", "[H⁺] = 10⁻³: pH 3: each tenfold dilution adds 1."],
   range={"x": [-7, 0], "y": [0, 7.5]}, ticks=[[-7, -6, -5, -4, -3, -2, -1], [1, 2, 3, 4, 5, 6, 7]], grid=[1, 1], axisLabels=["log₁₀([H⁺] / mol dm⁻³)", "pH"], xLabelBelow=True,
   curves=[{"expr": "0-x", "colour": "a2"}], points=[{"x": -1, "y": 1, "label": "0.1 M HCl"}, {"x": -2, "y": 2, "label": "0.01 M"}, {"x": -3, "y": 3, "label": "0.001 M"}],
   checks=[{"type": "point", "expr": "0-x", "x": -1, "y": 1, "name": "0.1 mol dm⁻³ strong acid: pH 1"}, {"type": "slope", "expr": "0-x", "x": -3, "value": -1, "name": "each tenfold change in [H⁺] changes pH by 1"}])

mk("u09-08", "chem-ph-poh", "graph", "[H⁺] and [OH⁻] in water",
   "In any aqueous solution at 25 °C, [H⁺][OH⁻] = Kw = 1.0 × 10⁻¹⁴, so pH + pOH = 14. The two lines cross at pH 7, where [H⁺] = [OH⁻] = 10⁻⁷ mol dm⁻³: neutral.",
   "log[H⁺] and log[OH⁻] against pH: two straight lines of opposite slope crossing at pH 7, log concentration −7.",
   ["log[H⁺] = −pH: falls to the right.", "log[OH⁻] = pH − 14: rises to the right.", "They meet at pH 7: neutral."],
   range={"x": [0, 14], "y": [-14, 0]}, ticks=[[2, 4, 6, 7, 8, 10, 12, 14], [-14, -10, -7, -4, 0]], grid=[1, 2], axisLabels=["pH", "log₁₀(concentration)"], xLabelBelow=True,
   curves=[{"expr": "0-x", "colour": "a2", "label": "[H⁺]", "labelAt": [1, -3]}, {"expr": "x-14", "colour": "a1", "label": "[OH⁻]", "labelAt": [12, -3.5]}], points=[{"x": 7, "y": -7, "label": "neutral"}],
   checks=[{"type": "intersect", "a": "0-x", "b": "x-14", "x": 7, "y": -7, "name": "[H⁺] = [OH⁻] = 10⁻⁷ at pH 7, since Kw = 10⁻¹⁴"}])

mk("u09-09", "chem-speciation", "graph", "Ethanoic acid and ethanoate",
   "As pH rises, CH₃COOH is converted to CH₃COO⁻. The curves cross at pH = pKa = 4.76, where the two are equal: the point of best buffering.",
   "Fraction of ethanoic acid falling and fraction of ethanoate rising with pH, crossing at 0.5 at pH 4.76.",
   ["Low pH: mainly CH₃COOH.", "pH 4.76: equal amounts.", "High pH: mainly CH₃COO⁻."],
   range={"x": [1, 9], "y": [0, 1.05]}, ticks=[[2, 3, 4, 5, 6, 7, 8], [0.5, 1]], grid=[1, 0.25], axisLabels=["pH", "fraction"], xLabelBelow=True,
   curves=[{"expr": "1-" + frac, "colour": "a2", "label": "CH₃COOH", "labelAt": [1.3, 0.9]}, {"expr": frac, "colour": "a1", "label": "CH₃COO⁻", "labelAt": [6.6, 0.9]}],
   checks=[{"type": "intersect", "a": "1-" + frac, "b": frac, "x": 4.76, "y": 0.5, "name": "equal amounts at pH = pKa = 4.76"}])

mk("u09-12", "chem-buffer-region", "titration", "The buffer region",
   "Titrating ethanoic acid with sodium hydroxide, the pH changes slowly over a wide range of added base: the solution contains both CH₃COOH and CH₃COO⁻ and resists change. This is the buffer region.",
   "Titration curve of 0.1 mol dm⁻³ ethanoic acid with 0.1 mol dm⁻³ sodium hydroxide, with the flat middle section shaded as the buffer region.",
   ["Start: pH about 2.9.", "From about 2 to 22 cm³ the pH rises slowly from about 3.8 to 5.7: the buffer region.", "A steep rise at 25 cm³, then levelling near pH 12."],
   flask={"acids": [HA], "V": 25}, titrant=NAOH, vmax=50, curves=[{"flask": {"acids": [HA], "V": 25}, "titrant": NAOH, "colour": "a1"}], marks={"buffer": True},
   claims=[{"type": "veq", "value": 25}, {"type": "startPh", "value": 2.88}])

mk("u09-13", "chem-half-equivalence", "titration", "pH = pKa at half-neutralisation",
   "Halfway to the equivalence point, half the ethanoic acid has become ethanoate, so [HA] = [A⁻] and pH = pKa. Reading the pH at half the equivalence volume measures pKa: 4.76.",
   "Weak acid–strong base titration curve with dashed lines from 12.5 cm³ up to the curve and across to pH 4.76.",
   ["Equivalence at 25.0 cm³.", "Half of that, 12.5 cm³: the pH reads 4.76.", "So pKa = 4.76 and Ka = 1.7 × 10⁻⁵."],
   flask={"acids": [HA], "V": 25}, titrant=NAOH, vmax=50, curves=[{"flask": {"acids": [HA], "V": 25}, "titrant": NAOH, "colour": "a1"}], marks={"half": True},
   claims=[{"type": "halfPh", "value": 4.76}, {"type": "veq", "value": 25}])

C4 = [{"label": "strong acid + strong base", "flask": {"acids": [SA], "V": 25}, "titrant": NAOH, "colour": "a1"},
      {"label": "weak acid + strong base", "flask": {"acids": [HA], "V": 25}, "titrant": NAOH, "colour": "a4"},
      {"label": "strong acid + weak base", "flask": {"acids": [SA], "V": 25}, "titrant": NH3, "colour": "a3"},
      {"label": "weak acid + weak base", "flask": {"acids": [HA], "V": 25}, "titrant": NH3, "colour": "a5"}]
for c, dy in zip(C4, [-8, 8, 6, -6]): c["labelDy"] = dy
mk("u09-14", "chem-titration-curves", "titration", "The four titration curves",
   "25.0 cm³ of 0.100 mol dm⁻³ acid titrated with 0.100 mol dm⁻³ base. Every curve reaches equivalence at 25.0 cm³, but where the pH jumps, and by how much, depends on whether acid and base are strong or weak. A weak acid with a weak base gives no sharp jump.",
   "Four titration curves: strong–strong jumps from about 3 to 11; weak acid–strong base from about 7 to 11; strong acid–weak base from about 3 to 7; weak–weak rises gradually through 7.",
   ["Strong acid + strong base: starts at pH 1, vertical section from about 3.4 to 10.6, equivalence at pH 7.", "Weak acid + strong base: starts near pH 3, vertical section from about 7 to 10.6, equivalence about pH 8.7.",
    "Strong acid + weak base: starts at pH 1, vertical section from about 3.4 to 6.6, equivalence about pH 5.3.", "Weak acid + weak base: no vertical section."],
   flask={"acids": [SA], "V": 25}, titrant=NAOH, vmax=50, curves=C4, marks={"eq": True}, panels=True,
   claims=[{"type": "veq", "curve": 0, "value": 25}, {"type": "phEq", "curve": 0, "rel": "=", "value": 7}, {"type": "phEq", "curve": 1, "rel": ">", "value": 7}, {"type": "phEq", "curve": 2, "rel": "<", "value": 7}])

mk("u09-15", "chem-indicator-ranges", "titration", "Choosing an indicator",
   "An indicator changes colour over about two pH units around its pKin. It works if that change falls within the steep part of the curve. Phenolphthalein (8.3–10.0) suits a weak acid with a strong base; methyl orange (3.1–4.4) does not, because it would change colour too early.",
   "Two titration curves, strong acid–strong base and weak acid–strong base, with the colour-change ranges of methyl orange and phenolphthalein as shaded bands.",
   ["Methyl orange band, pH 3.1 to 4.4.", "Phenolphthalein band, pH 8.3 to 10.0.", "The strong–strong curve passes through both bands in its vertical section.", "The weak acid curve's vertical section starts above the methyl orange band."],
   flask={"acids": [SA], "V": 25}, titrant=NAOH, vmax=50, curves=[{**C4[0], "label": "HCl + NaOH", "labelDy": -8}, {**C4[1], "label": "CH₃COOH + NaOH", "labelDy": 10}], indicators=IND,
   claims=[{"type": "suitable", "curve": 0, "indicator": "phenolphthalein", "ok": True}, {"type": "suitable", "curve": 0, "indicator": "methyl orange", "ok": True},
           {"type": "suitable", "curve": 1, "indicator": "phenolphthalein", "ok": True}, {"type": "suitable", "curve": 1, "indicator": "methyl orange", "ok": False}])

mk("u09-16", "chem-equivalence-point", "titration", "The equivalence point",
   "At equivalence the acid and base have reacted in exactly the amounts in the equation. For 25.0 cm³ of 0.100 mol dm⁻³ HCl that is 2.50 × 10⁻³ mol, so 25.0 cm³ of 0.100 mol dm⁻³ NaOH; the pH there is 7 and the curve is steepest.",
   "Strong acid–strong base titration curve with the equivalence point marked at 25.0 cm³ and pH 7.",
   ["Before equivalence: pH rises slowly from 1.", "At 25.0 cm³: an almost vertical jump through pH 7.", "After: excess alkali, pH levels near 12.5."],
   flask={"acids": [SA], "V": 25}, titrant=NAOH, vmax=50, curves=[C4[0]], marks={"eq": True},
   claims=[{"type": "veq", "value": 25}, {"type": "phEq", "rel": "=", "value": 7}, {"type": "startPh", "value": 1.0}])

SPS = {"Ag+": {"atoms": ["Ag"], "charge": 1}, "Cl-": {"atoms": ["Cl"], "charge": -1}}
mk("u09-17", "chem-solubility-equilibrium", "particles", "A saturated solution is a dynamic equilibrium",
   "In a saturated AgCl solution, ions leave the solid as fast as they rejoin it: AgCl(s) ⇌ Ag⁺(aq) + Cl⁻(aq). Ksp = [Ag⁺][Cl⁻] = 1.8 × 10⁻¹⁰ mol² dm⁻⁶ at 25 °C, so very few ions are in solution.",
   "A beaker with a layer of solid silver chloride on the bottom and a few silver and chloride ions in the solution above.",
   ["Solid AgCl at the bottom, a lattice of Ag⁺ and Cl⁻.", "Only a few Ag⁺ and Cl⁻ ions dissolved in the water above, in equal numbers."],
   species={**SPS, "Ag": {"atoms": ["Ag"]}}, panelHeight=200,
   panels=[{"title": "saturated AgCl(aq)", "container": "beaker", "arrangement": "layer", "contents": [["Ag+", 7], ["Cl-", 7]], "overlay": []}],
   claims=[{"type": "count", "panel": 0, "species": "Ag+", "n": 7}])

ks = "-9.745-x"
mk("u09-19", "chem-common-ion", "graph", "The common-ion effect",
   "Adding chloride ions to a saturated AgCl solution pushes AgCl(s) ⇌ Ag⁺ + Cl⁻ to the left. Solubility in water is √Ksp = 1.3 × 10⁻⁵ mol dm⁻³; in 0.01 mol dm⁻³ NaCl it falls to Ksp/[Cl⁻] = 1.8 × 10⁻⁸, a thousand times less.",
   "log solubility of AgCl against log chloride concentration: a straight line of gradient −1, with pure water marked at the top left.",
   ["In pure water, log s = −4.87.", "With added chloride, s = Ksp/[Cl⁻]: a straight line of gradient −1 on log axes.", "At [Cl⁻] = 0.01 mol dm⁻³, s = 1.8 × 10⁻⁸ mol dm⁻³."],
   range={"x": [-5, -1], "y": [-9, -4]}, ticks=[[-5, -4, -3, -2, -1], [-9, -8, -7, -6, -5, -4]], grid=[1, 1], axisLabels=["log₁₀([Cl⁻] / mol dm⁻³)", "log₁₀(solubility)"], xLabelBelow=True,
   curves=[{"expr": ks, "domain": [-4.87, -1], "colour": "a1"}], points=[{"x": -4.872, "y": -4.872, "label": "pure water", "dy": 14}, {"x": -2, "y": -7.745, "label": "0.01 M NaCl"}],
   checks=[{"type": "point", "expr": ks, "x": -2, "y": -7.745, "name": "in 0.01 mol dm⁻³ Cl⁻, s = Ksp/[Cl⁻] = 1.8 × 10⁻⁸"}, {"type": "point", "expr": ks, "x": -4.8725, "y": -4.8725, "name": "in pure water s = [Cl⁻] = √Ksp"}])

mk("u09-20", "chem-complex-ions", "vsepr", "Two copper(II) complexes",
   "In water copper(II) is the blue octahedral [Cu(H₂O)₆]²⁺. Adding concentrated HCl swaps the six water ligands for four larger chloride ions, giving the yellow-green tetrahedral [CuCl₄]²⁻: the coordination number changes with the ligand.",
   "An octahedral copper ion with six water ligands, and a tetrahedral copper ion with four chloride ligands.",
   ["[Cu(H₂O)₆]²⁺: six water molecules around Cu at 90°, octahedral.", "[CuCl₄]²⁻: four chloride ions at 109.5°, tetrahedral."],
   molecules=[{"label": "[Cu(H2O)6]^2+", "centre": "Cu", "complex": True, "ligands": [{"el": "OH2"}] * 6, "shape": "octahedral", "angle": "90°", "anglePair": [0, 2], "sub": "octahedral, blue"},
              {"label": "[CuCl4]^2-", "centre": "Cu", "complex": True, "ligands": [{"el": "Cl"}] * 4, "shape": "tetrahedral", "angle": "109.5°", "anglePair": [0, 1], "sub": "tetrahedral, yellow-green"}])

al = "log(10^(9-3*x)+10^(x-12.7))/log(10)"
mk("u09-21", "chem-amphoteric-al", "graph", "Aluminium hydroxide dissolves in acid and in alkali",
   "Al(OH)₃ is amphoteric. In acid it dissolves as Al³⁺(aq); in excess alkali as [Al(OH)₄]⁻(aq). In between, around pH 5 to 7, it is least soluble and precipitates. The curve is illustrative.",
   "log solubility of aluminium hydroxide against pH: a V-shaped curve, high at low pH, a minimum near pH 5.5, rising again at high pH.",
   ["Low pH: dissolves as Al³⁺.", "Minimum around pH 5 to 6: precipitates.", "High pH: dissolves as [Al(OH)₄]⁻."],
   range={"x": [2, 14], "y": [-8, 3]}, ticks=[[2, 4, 6, 8, 10, 12, 14], [-8, -6, -4, -2, 0, 2]], grid=[2, 2], axisLabels=["pH", "log₁₀(solubility)"], xLabelBelow=True,
   curves=[{"expr": al, "colour": "a1"}], bands=[{"x": [2, 4], "label": "Al³⁺(aq)", "colour": "a2"}, {"x": [11, 14], "label": "[Al(OH)₄]⁻", "colour": "a4"}],
   checks=[{"type": "min", "expr": al, "domain": [2, 14], "x": 5.54, "tol": 0.02, "name": "least soluble near pH 5.5, between the acid and alkali ranges (illustrative constants)"}])

H3PO4 = {"c": 0.1, "pKa": [2.15, 7.20, 12.35]}
mk("u09-22", "chem-polyprotic", "titration", "Titrating phosphoric acid",
   "Phosphoric acid gives up its protons one at a time, so titrating it with NaOH shows a separate rise for each: at 25 cm³ (H₂PO₄⁻) and 50 cm³ (HPO₄²⁻). The third proton (pKa 12.35) is too weak to give a visible end point in water.",
   "Titration curve of 25 cm³ of 0.1 mol dm⁻³ H₃PO₄ with 0.1 mol dm⁻³ NaOH: steep rises at 25 and 50 cm³, then a gradual climb.",
   ["First rise at 25 cm³, from about pH 3 to 6.", "Second rise at 50 cm³, from about pH 8 to 11.", "No third rise."],
   flask={"acids": [H3PO4], "V": 25}, titrant=NAOH, vmax=80, curves=[{"flask": {"acids": [H3PO4], "V": 25}, "titrant": NAOH, "colour": "a1"}],
   claims=[{"type": "points", "value": 2}])

# ---------------------------------------------------------------- unit 10
mk("u10-01", "chem-oil-rig", "flow", "Oxidation is loss, reduction is gain",
   "Magnesium in copper(II) sulfate solution: each Mg atom loses two electrons (oxidised) and each Cu²⁺ gains two (reduced). The electrons lost equal the electrons gained.",
   "Two half-equations: Mg → Mg²⁺ + 2e⁻ (oxidation) and Cu²⁺ + 2e⁻ → Cu (reduction), adding to Mg + Cu²⁺ → Mg²⁺ + Cu.",
   ["Mg → Mg²⁺ + 2e⁻: electrons lost, oxidation.", "Cu²⁺ + 2e⁻ → Cu: electrons gained, reduction.", "Overall: Mg + Cu²⁺ → Mg²⁺ + Cu."],
   layout="grid", rowHeight=110, boxWidth=120,
   nodes=[{"id": "mg", "label": "Mg", "col": 0, "row": 0}, {"id": "mg2", "label": "Mg²⁺", "col": 1, "row": 0, "tone": "a3", "sub": "oxidised: lost 2e⁻"},
          {"id": "cu2", "label": "Cu²⁺", "col": 0, "row": 1}, {"id": "cu", "label": "Cu", "col": 1, "row": 1, "tone": "a1", "sub": "reduced: gained 2e⁻"}],
   edges=[{"from": "mg", "to": "mg2", "label": "Mg → Mg²⁺ + 2e⁻", "eq": "Mg → Mg2+ + 2e-"}, {"from": "cu2", "to": "cu", "label": "Cu²⁺ + 2e⁻ → Cu", "eq": "Cu2+ + 2e- → Cu"}],
   claims=[{"type": "net", "steps": ["Mg → Mg2+ + 2e-", "Cu2+ + 2e- → Cu"], "net": "Mg + Cu2+ → Mg2+ + Cu"}])

def A(id, el, x, y, **k):
    d = {"id": id, "el": el, "x": x, "y": y}; d.update(k); return d
mk("u10-02", "chem-oxidation-state-rules", "dotcross", "Assigning oxidation states",
   "Give each bond's electrons to the more electronegative atom and count what each atom has gained or lost. Water: O −2, H +1. Sulfate: S +6, every O −2. Ammonium: N −3, H +1. The states add up to the overall charge.",
   "Lewis structures of water, the sulfate ion and the ammonium ion, each atom labelled with its oxidation state.",
   ["H₂O: oxygen −2, each hydrogen +1; total 0.", "SO₄²⁻: sulfur +6, each oxygen −2; total −2.", "NH₄⁺: nitrogen −3, each hydrogen +1; total +1."],
   perRow=3, rowHeight=[200, 180],
   molecules=[{"label": "H₂O", "style": "lewis", "show": "oxidation", "atoms": [A("o", "O", 0, 0, lone=2, loneAt=[-135, -45]), A("h1", "H", -0.85, 0.65), A("h2", "H", 0.85, 0.65)],
               "bonds": [{"a": "o", "b": "h1"}, {"a": "o", "b": "h2"}], "claims": {"oxidation": {"o": -2, "h1": 1, "h2": 1}}},
              {"label": "SO₄²⁻", "style": "lewis", "show": "oxidation", "bracket": True, "charge": -2,
               "atoms": [A("s", "S", 0, 0, expanded=True), A("o1", "O", 0, -1, lone=2, loneAt=[-150, -30]), A("o2", "O", 0, 1, lone=2, loneAt=[150, 30]), A("o3", "O", -1, 0, lone=3, loneAt=[-90, 180, 90]), A("o4", "O", 1, 0, lone=3, loneAt=[-90, 0, 90])],
               "bonds": [{"a": "s", "b": "o1", "order": 2}, {"a": "s", "b": "o2", "order": 2}, {"a": "s", "b": "o3"}, {"a": "s", "b": "o4"}], "claims": {"oxidation": {"s": 6, "o1": -2, "o3": -2}}},
              {"label": "NH₄⁺", "style": "lewis", "show": "oxidation", "bracket": True, "charge": 1,
               "atoms": [A("n", "N", 0, 0), A("h1", "H", 0, -1), A("h2", "H", 1, 0), A("h3", "H", 0, 1), A("h4", "H", -1, 0)],
               "bonds": [{"a": "n", "b": "h1"}, {"a": "n", "b": "h2"}, {"a": "n", "b": "h3"}, {"a": "n", "b": "h4"}], "claims": {"oxidation": {"n": -3, "h1": 1}}}])

mk("u10-05", "chem-halogen-oxidising", "trend", "Halogens as oxidising agents",
   "The more positive the standard electrode potential, the more strongly the halogen pulls in electrons: fluorine is the strongest oxidising agent and iodine the weakest. So chlorine displaces bromide and iodide, but iodine displaces neither.",
   "Bar chart of E° for X₂/X⁻: F₂ +2.87, Cl₂ +1.36, Br₂ +1.09, I₂ +0.54 V.",
   ["F₂/F⁻ +2.87 V.", "Cl₂/Cl⁻ +1.36 V.", "Br₂/Br⁻ +1.09 V.", "I₂/I⁻ +0.54 V."],
   kind="bars", dataset="e0", range=[0, 3.2], ticks=[0, 1, 2, 3], yLabel="E° / V", colour="a4",
   items=[{"key": k, "label": k.split("/")[0], "value": v} for k, v in [("F2/F-", 2.87), ("Cl2/Cl-", 1.36), ("Br2/Br-", 1.09), ("I2/I-", 0.54)]], claims=[{"type": "decreasing"}])

MET = [("Li+/Li", -3.04), ("K+/K", -2.93), ("Ca2+/Ca", -2.87), ("Na+/Na", -2.71), ("Mg2+/Mg", -2.37), ("Al3+/Al", -1.66), ("Zn2+/Zn", -0.76), ("Fe2+/Fe", -0.44), ("Pb2+/Pb", -0.13), ("H+/H2", 0.0), ("Cu2+/Cu", 0.34), ("Ag+/Ag", 0.80), ("Au3+/Au", 1.50)]
mk("u10-06", "chem-metal-reducing", "trend", "Metals as reducing agents",
   "The more negative a metal's electrode potential, the more readily it gives up electrons: lithium and potassium are the strongest reducing agents, gold the weakest. This is the reactivity series, measured.",
   "A vertical scale of E° for metal ion/metal couples from Li⁺/Li at −3.04 V at the bottom to Au³⁺/Au at +1.50 V at the top.",
   ["Bottom: Li −3.04, K −2.93, Ca −2.87, Na −2.71, Mg −2.37 V: most reactive.", "Middle: Al −1.66, Zn −0.76, Fe −0.44, Pb −0.13, H₂ 0.00.", "Top: Cu +0.34, Ag +0.80, Au +1.50 V: least reactive."],
   also=["gcse:u05-08"], kind="ladder", dataset="e0", unit="V", topLabel="weaker reducing agents", bottomLabel="stronger reducing agents", height=[460, 520],
   items=[{"key": k, "value": v} for k, v in MET], highlight={"H+/H2": "a2"}, claims=[{"type": "min", "key": "Li+/Li"}, {"type": "max", "key": "Au3+/Au"}])

SERIES = [("F2/F-", 2.87), ("MnO4-/Mn2+", 1.51), ("Cl2/Cl-", 1.36), ("Cr2O7 2-/Cr3+", 1.33), ("O2/H2O", 1.23), ("Br2/Br-", 1.09), ("Ag+/Ag", 0.80), ("Fe3+/Fe2+", 0.77), ("I2/I-", 0.54),
          ("Cu2+/Cu", 0.34), ("H+/H2", 0.0), ("Fe2+/Fe", -0.44), ("Zn2+/Zn", -0.76), ("Mg2+/Mg", -2.37), ("Na+/Na", -2.71), ("Li+/Li", -3.04)]
mk("u10-12", "chem-electrochemical-series", "trend", "The electrochemical series",
   "Couples listed by standard electrode potential. The oxidised form at the top (F₂, MnO₄⁻) is the strongest oxidising agent; the reduced form at the bottom (Li) is the strongest reducing agent. A species will oxidise anything below it on the left-hand side of the list.",
   "A vertical scale of E° values from F₂/F⁻ at +2.87 V down to Li⁺/Li at −3.04 V, with the hydrogen electrode at 0.",
   ["Top: F₂/F⁻ +2.87, MnO₄⁻/Mn²⁺ +1.51, Cl₂/Cl⁻ +1.36 V.", "Middle: Ag⁺/Ag +0.80, Cu²⁺/Cu +0.34, H⁺/H₂ 0.", "Bottom: Zn −0.76, Mg −2.37, Na −2.71, Li −3.04 V."],
   kind="ladder", dataset="e0", unit="V", topLabel="stronger oxidising agents (left)", bottomLabel="stronger reducing agents (right)", height=[520, 600],
   items=[{"key": k, "value": v, "label": k.replace(" 2-", "²⁻")} for k, v in SERIES], highlight={"H+/H2": "a2"}, claims=[{"type": "max", "key": "F2/F-"}, {"type": "min", "key": "Li+/Li"}])

mk("u10-07", "chem-daniell-cell", "cell", "The Daniell cell",
   "Zinc (E° −0.76 V) is more easily oxidised than copper (+0.34 V), so zinc is the negative electrode (anode) and copper the positive (cathode). Electrons flow through the wire from zinc to copper; the salt bridge completes the circuit. E°cell = 0.34 − (−0.76) = 1.10 V.",
   "Two beakers: a zinc electrode in zinc sulfate and a copper electrode in copper sulfate, joined by a wire through a voltmeter reading 1.10 V and by a salt bridge.",
   ["Left: zinc in Zn²⁺(aq), the anode: Zn → Zn²⁺ + 2e⁻.", "Right: copper in Cu²⁺(aq), the cathode: Cu²⁺ + 2e⁻ → Cu.", "Electrons flow along the wire from zinc to copper; the voltmeter reads 1.10 V.", "A salt bridge of KNO₃(aq) joins the solutions."],
   kind="galvanic", ecell=1.10, net="Zn + Cu2+ → Zn2+ + Cu",
   halves=[{"couple": "Zn2+/Zn", "electrode": "Zn", "solution": "ZnSO4(aq), 1 mol dm⁻³", "role": "anode", "half": "Zn → Zn2+ + 2e-"},
           {"couple": "Cu2+/Cu", "electrode": "Cu", "solution": "CuSO4(aq), 1 mol dm⁻³", "role": "cathode", "half": "Cu2+ + 2e- → Cu"}])

mk("u10-08", "chem-galvanic-cell", "cell", "A magnesium–copper cell",
   "The half-cell with the more negative E° supplies electrons. Magnesium (−2.37 V) is oxidised and copper ions (+0.34 V) are reduced; electrons flow externally from Mg to Cu, while ions in the salt bridge keep each solution neutral. E°cell = 2.71 V.",
   "A magnesium electrode in magnesium sulfate and a copper electrode in copper sulfate, joined by a wire with a voltmeter reading 2.71 V and a salt bridge.",
   ["Magnesium anode: Mg → Mg²⁺ + 2e⁻.", "Copper cathode: Cu²⁺ + 2e⁻ → Cu.", "E°cell = 0.34 − (−2.37) = 2.71 V."],
   kind="galvanic", ecell=2.71, net="Mg + Cu2+ → Mg2+ + Cu",
   halves=[{"couple": "Mg2+/Mg", "electrode": "Mg", "solution": "MgSO4(aq)", "role": "anode", "half": "Mg → Mg2+ + 2e-"}, {"couple": "Cu2+/Cu", "electrode": "Cu", "solution": "CuSO4(aq)", "role": "cathode", "half": "Cu2+ + 2e- → Cu"}])

mk("u10-09", "chem-electrolytic-cell", "cell", "Electrolysis of molten sodium chloride",
   "An external supply forces a non-spontaneous reaction. Na⁺ ions move to the negative electrode (cathode) and gain electrons; Cl⁻ ions move to the positive electrode (anode) and lose them. Molten NaCl gives sodium metal and chlorine gas.",
   "A vessel of molten sodium chloride with two electrodes connected to a d.c. supply; sodium forms at the negative electrode and chlorine at the positive.",
   ["Negative electrode (cathode): Na⁺ + e⁻ → Na.", "Positive electrode (anode): 2Cl⁻ → Cl₂ + 2e⁻.", "Overall: 2Na⁺ + 2Cl⁻ → 2Na + Cl₂."],
   kind="single", supply=True, vessel={"label": "molten NaCl", "colour": "#fde68a"}, net="2Na+ + 2Cl- → 2Na + Cl2",
   halves=[{"electrode": "C", "label": "graphite", "role": "anode", "half": "2Cl- → Cl2 + 2e-", "product": "Cl₂(g)", "ions": "Cl⁻"},
           {"electrode": "C", "label": "graphite", "role": "cathode", "half": "Na+ + e- → Na", "product": "Na(l)", "ions": "Na⁺"}])

mk("u10-10", "chem-she", "cell", "Measuring E° against the hydrogen electrode",
   "The standard hydrogen electrode, H₂ at 100 kPa bubbling over platinum in 1 mol dm⁻³ H⁺ at 298 K, is defined as 0 V. Connected to Cu²⁺/Cu, the voltmeter reads 0.34 V with copper positive: E°(Cu²⁺/Cu) = +0.34 V.",
   "Left: hydrogen gas bubbling over a platinum electrode in acid. Right: copper in copper sulfate. A salt bridge and a voltmeter reading 0.34 V join them.",
   ["Standard hydrogen electrode: Pt, H₂ at 100 kPa, H⁺ at 1 mol dm⁻³: H₂ → 2H⁺ + 2e⁻.", "Copper half-cell, 1 mol dm⁻³ Cu²⁺: Cu²⁺ + 2e⁻ → Cu.", "Voltmeter: 0.34 V."],
   kind="galvanic", ecell=0.34, net="H2 + Cu2+ → 2H+ + Cu",
   halves=[{"couple": "H+/H2", "electrode": "Pt", "gas": "H₂, 100 kPa", "solution": "H+(aq), 1 mol dm⁻³", "role": "anode", "half": "H2 → 2H+ + 2e-"}, {"couple": "Cu2+/Cu", "electrode": "Cu", "solution": "Cu2+(aq), 1 mol dm⁻³", "role": "cathode", "half": "Cu2+ + 2e- → Cu"}])

mk("u10-11", "chem-cell-potential", "cell", "Calculating a cell potential",
   "E°cell = E°(positive electrode) − E°(negative electrode). For silver and zinc: 0.80 − (−0.76) = 1.56 V. Each silver ion takes one electron, so two are needed for each zinc atom: Zn + 2Ag⁺ → Zn²⁺ + 2Ag.",
   "A zinc half-cell and a silver half-cell joined by a salt bridge, with a voltmeter reading 1.56 V.",
   ["Zinc anode: Zn → Zn²⁺ + 2e⁻ (E° −0.76 V).", "Silver cathode: Ag⁺ + e⁻ → Ag (E° +0.80 V).", "E°cell = 0.80 − (−0.76) = 1.56 V; overall Zn + 2Ag⁺ → Zn²⁺ + 2Ag."],
   kind="galvanic", ecell=1.56, net="Zn + 2Ag+ → Zn2+ + 2Ag",
   halves=[{"couple": "Zn2+/Zn", "electrode": "Zn", "solution": "Zn2+(aq)", "role": "anode", "half": "Zn → Zn2+ + 2e-"}, {"couple": "Ag+/Ag", "electrode": "Ag", "solution": "Ag+(aq)", "role": "cathode", "half": "Ag+ + e- → Ag"}])

ne = "0.34+0.029580*x"
mk("u10-13", "chem-nernst", "graph", "The Nernst equation",
   "E = E° + (RT/nF) ln[Cu²⁺] = 0.34 + 0.0296 log₁₀[Cu²⁺] at 298 K. Diluting the Cu²⁺ tenfold lowers the electrode potential by 0.0296 V (59 mV divided by the 2 electrons).",
   "Electrode potential against log of the copper(II) concentration: a straight line of gradient 0.0296, passing 0.34 V at 1 mol dm⁻³.",
   ["At [Cu²⁺] = 1 mol dm⁻³ (log 0): E = E° = 0.34 V.", "At 0.1 mol dm⁻³: 0.31 V.", "At 0.001: 0.25 V."],
   range={"x": [-4, 0.5], "y": [0.2, 0.36]}, ticks=[[-4, -3, -2, -1, 0], [0.22, 0.26, 0.30, 0.34]], grid=[1, 0.02], axisLabels=["log₁₀([Cu²⁺] / mol dm⁻³)", "E / V"], xLabelBelow=True,
   curves=[{"expr": ne, "colour": "a3"}], points=[{"x": 0, "y": 0.34, "label": "E°", "dx": -10, "anchor": "end"}],
   checks=[{"type": "slope", "expr": ne, "x": -2, "value": round(8.314 * 298.15 * math.log(10) / (2 * 96485), 5), "name": "gradient 2.303RT/2F = 0.0296 V per tenfold change"}, {"type": "point", "expr": ne, "x": 0, "y": 0.34}])

mk("u10-14", "chem-electrolysis-brine", "cell", "Electrolysis of brine",
   "In concentrated sodium chloride solution, hydrogen forms at the cathode instead of sodium, because H⁺ from water is reduced more easily than Na⁺. Chlorine forms at the anode because chloride is concentrated. Sodium hydroxide is left in solution.",
   "A cell of brine with a d.c. supply: hydrogen bubbles at the negative electrode, chlorine at the positive electrode.",
   ["Cathode (negative): 2H₂O + 2e⁻ → H₂ + 2OH⁻.", "Anode (positive): 2Cl⁻ → Cl₂ + 2e⁻.", "Left in solution: Na⁺ and OH⁻, sodium hydroxide."],
   also=["gcse:u05-10"], kind="single", supply=True, vessel={"label": "concentrated NaCl(aq)"}, net="2H2O + 2Cl- → H2 + 2OH- + Cl2",
   rules=[{"type": "cathode", "metal": "Na", "charge": 1, "product": "H2"}, {"type": "anode", "halide": "Cl2", "concentrated": True, "product": "Cl2"}],
   halves=[{"electrode": "C", "label": "inert", "role": "anode", "half": "2Cl- → Cl2 + 2e-", "product": "Cl₂(g)", "ions": "Cl⁻"},
           {"electrode": "C", "label": "inert", "role": "cathode", "half": "2H2O + 2e- → H2 + 2OH-", "product": "H₂(g)", "ions": "H₂O"}])

fd = "x*63.546/(2*96485)"
mk("u10-15", "chem-faraday", "graph", "Faraday's first law",
   "The mass of copper deposited is proportional to the charge passed. One mole of electrons (96 485 C, one faraday) deposits half a mole of copper, 31.8 g, because Cu²⁺ needs two electrons per atom.",
   "Mass of copper deposited against charge passed: a straight line through the origin, 3.18 g at 9648.5 C.",
   ["A straight line through the origin: mass ∝ charge.", "9648.5 C (0.1 mol of electrons) deposits 3.18 g of copper."],
   range={"x": [0, 12000], "y": [0, 4.2]}, ticks=[[2000, 4000, 6000, 8000, 10000, 12000], [1, 2, 3, 4]], grid=[2000, 1], axisLabels=["charge / C", "mass of Cu / g"], xLabelBelow=True,
   curves=[{"expr": fd, "colour": "a3"}], points=[{"x": 9648.5, "y": 3.1773, "label": "0.1 mol e⁻: 3.18 g", "dx": -10, "anchor": "end"}],
   checks=[{"type": "point", "expr": fd, "x": 9648.5, "y": 3.1773, "name": "0.1 F deposits 0.05 mol of copper, 3.18 g (Cu²⁺ + 2e⁻ → Cu)"}])

mk("u10-16", "chem-lithium-ion", "cell", "A lithium-ion cell discharging",
   "On discharge, lithium leaves the graphite negative electrode as Li⁺ and electrons; the Li⁺ crosses the electrolyte and the electrons go round the external circuit to the cobalt oxide positive electrode, where both are taken in. Charging reverses this.",
   "A cell with a graphite electrode on the left and a lithium cobalt oxide electrode on the right; Li⁺ ions move left to right through the electrolyte and electrons through the device.",
   ["Negative electrode (anode on discharge): LiC₆ → Li⁺ + C₆ + e⁻.", "Positive electrode (cathode): CoO₂ + Li⁺ + e⁻ → LiCoO₂.", "Overall: LiC₆ + CoO₂ → C₆ + LiCoO₂."],
   kind="single", load="device", membrane="separator", vessel={"label": "organic electrolyte with a lithium salt", "colour": "#ede9fe"}, net="LiC6 + CoO2 → C6 + LiCoO2",
   halves=[{"electrode": "C", "label": "graphite", "role": "anode", "half": "LiC6 → Li+ + C6 + e-", "ions": "Li⁺ →"}, {"electrode": "Co", "label": "LiCoO₂", "role": "cathode", "half": "CoO2 + Li+ + e- → LiCoO2"}])

mk("u10-17", "chem-fuel-cell", "cell", "The hydrogen–oxygen fuel cell",
   "Hydrogen is oxidised at the negative electrode and oxygen reduced at the positive one, with H⁺ ions crossing the membrane. The only product is water and E°cell = 1.23 V.",
   "A cell with hydrogen fed to the left electrode and oxygen to the right, a proton-exchange membrane between, and an external circuit.",
   ["Anode: H₂ → 2H⁺ + 2e⁻.", "Cathode: O₂ + 4H⁺ + 4e⁻ → 2H₂O.", "Overall: 2H₂ + O₂ → 2H₂O, E°cell = 1.23 V."],
   kind="single", load="motor", compare=True, ecell=1.23, membrane="proton-exchange membrane", vessel={"label": "H⁺ conducting electrolyte", "colour": "#ecfccb"}, net="2H2 + O2 → 2H2O",
   halves=[{"couple": "H+/H2", "electrode": "Pt", "label": "Pt", "role": "anode", "half": "H2 → 2H+ + 2e-", "product": "H₂ in", "ions": "H⁺ →"},
           {"couple": "O2/H2O", "electrode": "Pt", "label": "Pt", "role": "cathode", "half": "O2 + 4H+ + 4e- → 2H2O", "product": "O₂ in"}])

mk("u10-18", "chem-rusting", "cell", "How iron rusts",
   "Under a drop of water, iron at the centre (where oxygen is scarce) is oxidised to Fe²⁺; electrons flow through the metal to the edge, where oxygen is reduced to OH⁻. Fe²⁺ and OH⁻ meet to form Fe(OH)₂, which oxidises further to rust, Fe₂O₃·xH₂O.",
   "A water droplet on iron: the anode region in the middle and the cathode region at the edge, with the two half-equations.",
   ["Anode (centre): Fe → Fe²⁺ + 2e⁻.", "Cathode (edge, near the air): O₂ + 2H₂O + 4e⁻ → 4OH⁻.", "E°cell = 0.40 − (−0.44) = 0.84 V, so the reaction is feasible."],
   kind="single", compare=True, ecell=0.84, vessel={"label": "a water droplet on iron", "colour": "#e0f2fe", "fill": 0.6}, net="2Fe + O2 + 2H2O → 2Fe2+ + 4OH-",
   halves=[{"couple": "Fe2+/Fe", "electrode": "Fe", "label": "iron", "role": "anode", "half": "Fe → Fe2+ + 2e-", "product": "Fe²⁺"},
           {"couple": "O2/OH-", "electrode": "Fe", "label": "iron", "role": "cathode", "half": "O2 + 2H2O + 4e- → 4OH-", "product": "OH⁻"}])

mk("u10-19", "chem-sacrificial", "cell", "Sacrificial protection",
   "A block of zinc bolted to an iron hull corrodes instead of the iron, because zinc (E° −0.76 V) is more easily oxidised than iron (−0.44 V). The electrons it releases flow into the iron, where oxygen is reduced, so the iron is not oxidised.",
   "Seawater with a zinc block connected to iron: zinc is the anode and dissolves; oxygen is reduced at the iron surface.",
   ["Zinc anode: Zn → Zn²⁺ + 2e⁻, the zinc corrodes.", "Iron, the cathode: O₂ + 2H₂O + 4e⁻ → 4OH⁻; the iron itself is unchanged."],
   kind="single", compare=True, ecell=1.16, vessel={"label": "seawater"}, net="2Zn + O2 + 2H2O → 2Zn2+ + 4OH-",
   halves=[{"couple": "Zn2+/Zn", "electrode": "Zn", "label": "zinc block", "role": "anode", "half": "Zn → Zn2+ + 2e-", "product": "Zn²⁺"},
           {"couple": "O2/OH-", "electrode": "Fe", "label": "iron hull", "role": "cathode", "half": "O2 + 2H2O + 4e- → 4OH-", "product": "OH⁻"}])

mk("u10-20", "chem-aluminium-extraction", "cell", "Extracting aluminium",
   "Aluminium oxide is dissolved in molten cryolite at about 950 °C, far below alumina's own melting point, and electrolysed. Aluminium forms at the carbon cathode lining; oxygen forms at the carbon anodes, which burn away to CO₂ and must be replaced.",
   "An electrolysis cell of molten alumina in cryolite: carbon anodes at the top, a carbon cathode lining, aluminium collecting at the bottom.",
   ["Cathode: Al³⁺ + 3e⁻ → Al, molten aluminium.", "Anode: 2O²⁻ → O₂ + 4e⁻; the oxygen reacts with the carbon anodes.", "Overall: 4Al³⁺ + 6O²⁻ → 4Al + 3O₂."],
   kind="single", supply=True, vessel={"label": "Al₂O₃ in molten cryolite, 950 °C", "colour": "#fde68a"}, net="4Al3+ + 6O2- → 4Al + 3O2",
   halves=[{"electrode": "C", "label": "carbon", "role": "anode", "half": "2O2- → O2 + 4e-", "product": "O₂ (+ C → CO₂)", "ions": "O²⁻"},
           {"electrode": "C", "label": "carbon lining", "role": "cathode", "half": "Al3+ + 3e- → Al", "product": "Al(l)", "ions": "Al³⁺"}])
