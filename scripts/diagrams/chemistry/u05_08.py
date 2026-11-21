"""Units 5–8: states of matter, energetics, kinetics, equilibrium. Curve constants are computed here, so the numbers
in captions and checks come from the same arithmetic as the curves."""
import math
from spec import mk

R = 8.314
def r(x, n=4): return round(x, n)

# ---------------------------------------------------------------- unit 5
SPW = {"H2O": {"atoms": ["O", "H", "H"], "shape": "bent"}, "Na+": {"atoms": ["Na"], "charge": 1}, "Cl-": {"atoms": ["Cl"], "charge": -1},
       "N2": {"atoms": ["N", "N"]}, "O2": {"atoms": ["O", "O"]}}

mk("u05-01", "chem-gas-particles", "particles", "Gas particles",
   "Gas particles are far apart compared with their size and move fast in straight lines in random directions, colliding with each other and with the walls. Collisions with the walls cause the gas's pressure.",
   "A box of air: nitrogen and oxygen molecules widely spaced, with arrows showing random motion.",
   ["Nitrogen and oxygen molecules spread through the box.", "Arrows: each moving in a different direction."],
   species={k: SPW[k] for k in ["N2", "O2"]}, panelHeight=200,
   panels=[{"title": "air in a container", "arrangement": "gas", "contents": [["N2", 8], ["O2", 2]], "motion": True}],
   claims=[{"type": "classify", "panel": 0, "as": "mixture"}, {"type": "states", "panel": 0, "as": "gas"}])

mk("u05-02", "chem-boyle", "graph", "Boyle's law",
   "At constant temperature, pressure is inversely proportional to volume: pV is constant, so halving the volume doubles the pressure. A higher temperature gives a larger constant and a curve further out.",
   "Two hyperbolas of pressure against volume: pV = 100 and, at a higher temperature, pV = 150.",
   ["At the lower temperature, pV = 100 kPa dm³: 50 kPa at 2 dm³, 25 kPa at 4 dm³.", "At the higher temperature, pV = 150 kPa dm³: the curve lies above."],
   range={"x": [0, 10], "y": [0, 120]}, ticks=[[2, 4, 6, 8, 10], [20, 40, 60, 80, 100, 120]], grid=[2, 20], axisLabels=["V / dm³", "p / kPa"], xLabelBelow=True,
   curves=[{"expr": "100/x", "domain": [0.85, 10], "colour": "a1", "label": "T₁", "labelAt": [8.3, 18]}, {"expr": "150/x", "domain": [1.25, 10], "colour": "a2", "label": "T₂ > T₁", "labelAt": [7.5, 28]}],
   points=[{"x": 2, "y": 50, "label": "(2, 50)"}, {"x": 4, "y": 25, "label": "(4, 25)"}],
   checks=[{"type": "point", "expr": "100/x", "x": 2, "y": 50, "name": "halving V from 4 to 2 dm³ doubles p from 25 to 50 kPa"}, {"type": "point", "expr": "100/x", "x": 4, "y": 25}])

mk("u05-03", "chem-charles", "graph", "Charles's law",
   "At constant pressure, the volume of a gas is proportional to its absolute temperature. One mole of ideal gas at 1 atm occupies 22.4 dm³ at 273 K; extending the line back reaches zero volume at 0 K (−273 °C).",
   "Straight line of volume against temperature in kelvin through the origin, dashed below 200 K, passing 22.4 dm³ at 273 K.",
   ["Volume rises in proportion to kelvin temperature.", "At 273 K, 22.4 dm³ for one mole at 1 atm.", "Dashed extrapolation to the origin: zero volume at absolute zero."],
   range={"x": [0, 420], "y": [0, 36]}, ticks=[[100, 200, 273, 400], [10, 20, 30]], grid=[100, 10], axisLabels=["T / K", "V / dm³"], xLabelBelow=True,
   curves=[{"expr": "0.082057*x", "domain": [0, 200], "colour": "a1", "dash": "6 5"}, {"expr": "0.082057*x", "domain": [200, 410], "colour": "a1"}],
   points=[{"x": 273.15, "y": 22.414, "label": "273 K, 22.4 dm³", "dx": -10, "anchor": "end"}],
   checks=[{"type": "point", "expr": "0.082057*x", "x": 273.15, "y": 22.414, "name": "1 mol at 1 atm and 273 K occupies 22.4 dm³ (V = nRT/p)"}, {"type": "point", "expr": "0.082057*x", "x": 0, "y": 0, "name": "zero volume at 0 K"}])

mk("u05-04", "chem-real-gas-z", "graph", "Real gases are not quite ideal",
   "The compression factor Z = pV/nRT is exactly 1 for an ideal gas. For a real gas such as methane, attractions pull Z below 1 at moderate pressure; at high pressure the molecules' own volume pushes it above 1. The curve is illustrative.",
   "Z against pressure: a flat line at 1 for an ideal gas; a real-gas curve dipping to about 0.8 near 250 atm and rising above 1 beyond about 500 atm.",
   ["Ideal gas: Z = 1 at every pressure.", "Real gas: Z falls below 1 (attractions dominate), reaches a minimum, then rises above 1 (molecular volume dominates)."],
   range={"x": [0, 700], "y": [0.6, 1.4]}, ticks=[[200, 400, 600], [0.8, 1.0, 1.2]], grid=[100, 0.1], axisLabels=["p / atm", "Z = pV/nRT"], xLabelBelow=True,
   curves=[{"expr": "1", "colour": "soft", "dash": "6 5", "label": "ideal gas", "labelAt": [560, 1.03]}, {"expr": "1-0.0016*x+0.0000032*x^2", "colour": "a2", "label": "real gas (illustrative)", "labelAt": [380, 0.74]}],
   checks=[{"type": "min", "expr": "1-0.0016*x+0.0000032*x^2", "domain": [0, 700], "x": 250, "name": "real gas: Z falls below 1, a minimum near 250 atm (attractions)"},
           {"type": "value", "expr": "1-0.0016*x+0.0000032*x^2", "x": 650, "between": [1.01, 2], "name": "real gas: Z above 1 at high pressure (molecular volume)"}])

def mb(T, M=0.028):
    a = M / (2 * R * T) * 1e4  # speed in units of 100 m/s
    c = 4 * math.pi * (a / math.pi) ** 1.5
    return c, a, 1 / math.sqrt(a), c / a * math.exp(-1)
c1, a1, p1, m1 = mb(300); c2, a2, p2, m2 = mb(600)
e1 = f"{c1:.6f}*x^2*exp(-{a1:.6f}*x^2)"; e2 = f"{c2:.6f}*x^2*exp(-{a2:.6f}*x^2)"
mk("u05-05", "chem-maxwell-boltzmann-T", "graph", "Molecular speeds at two temperatures",
   f"Nitrogen molecules have a spread of speeds. At 300 K the most probable speed is about {round(p1 * 100)} m s⁻¹; at 600 K the curve flattens and shifts right to about {round(p2 * 100)} m s⁻¹. The area under each curve, the total number of molecules, is the same.",
   "Two Maxwell–Boltzmann speed distributions for nitrogen: a taller, narrower curve peaking near 420 m/s at 300 K and a lower, broader curve peaking near 600 m/s at 600 K.",
   [f"300 K: a peak at about {round(p1 * 100)} m s⁻¹.", f"600 K: lower, broader, peaking at about {round(p2 * 100)} m s⁻¹.", "Both start at zero, and both curves enclose the same area."],
   range={"x": [0, 16], "y": [0, 0.24]}, ticks=[[2, 4, 6, 8, 10, 12, 14], []], grid=[2, 0.04], axisLabels=["speed / 100 m s⁻¹", "fraction of molecules"], xLabelBelow=True,
   curves=[{"expr": e1, "colour": "a1", "label": "300 K", "labelAt": [p1 + 0.4, m1 + 0.005]}, {"expr": e2, "colour": "a3", "label": "600 K", "labelAt": [p2 + 1.2, m2]}],
   checks=[{"type": "max", "expr": e1, "domain": [0.01, 16], "x": r(p1, 3), "y": r(m1, 5), "name": f"300 K: most probable speed √(2RT/M) = {round(p1 * 100)} m s⁻¹"},
           {"type": "max", "expr": e2, "domain": [0.01, 16], "x": r(p2, 3), "y": r(m2, 5), "name": f"600 K: most probable speed {round(p2 * 100)} m s⁻¹"},
           {"type": "area", "expr": e1, "from": 0, "to": 30, "value": 1, "name": "300 K: area 1 (all the molecules)"}, {"type": "area", "expr": e2, "from": 0, "to": 30, "value": 1, "name": "600 K: the same area"}])

mk("u05-06", "chem-liquid-particles", "particles", "Liquid particles",
   "In a liquid the particles touch, as in a solid, but are disordered and keep moving past one another, so a liquid flows and takes the shape of its container but is hardly compressible.",
   "A box of water molecules packed closely but irregularly.",
   ["Water molecules close together.", "No regular pattern; gaps move as molecules slide past each other."],
   species={"H2O": SPW["H2O"]}, panelHeight=180,
   panels=[{"title": "water", "arrangement": "liquid", "contents": [["H2O", 24]]}], claims=[{"type": "states", "panel": 0, "as": "liquid"}])

vp = "0.133322*10^(8.07131-1730.63/(233.426+x))"
mk("u05-07", "chem-vapour-pressure", "graph", "Vapour pressure of water",
   "Vapour pressure rises steeply with temperature. A liquid boils when its vapour pressure equals the pressure above it: 101.3 kPa at 100 °C for water at sea level, lower on a mountain, so water boils at a lower temperature there.",
   "Vapour pressure of water against temperature, a curve rising steeply to 101.3 kPa at 100 °C, with a dashed line marking atmospheric pressure.",
   ["Vapour pressure is small at 20 °C (about 2.3 kPa).", "It rises ever more steeply.", "It reaches 101.3 kPa, atmospheric pressure, at 100 °C: the normal boiling point."],
   range={"x": [0, 110], "y": [0, 120]}, ticks=[[20, 40, 60, 80, 100], [20, 40, 60, 80, 100]], grid=[20, 20], axisLabels=["temperature / °C", "vapour pressure / kPa"], xLabelBelow=True,
   marks=[{"y": 101.325, "label": "1 atm = 101.3 kPa", "to": 100}], curves=[{"expr": vp, "colour": "a1"}], points=[{"x": 100, "y": 101.3, "label": "boils", "dx": -10, "anchor": "end", "dy": -14}],
   checks=[{"type": "value", "expr": vp, "x": 100, "between": [100.8, 101.8], "name": "vapour pressure reaches 1 atm at 100 °C (Antoine equation)"}, {"type": "value", "expr": vp, "x": 20, "between": [2.2, 2.45], "name": "about 2.3 kPa at 20 °C"}])

# heating 18 g (1 mol) of ice from −20 °C: specific heats 2.09 (ice), 4.18 (water), 2.01 (steam) J g⁻¹ K⁻¹; ΔfusH 6.01, ΔvapH 40.7 kJ mol⁻¹
q1 = 18 * 2.09 * 20 / 1000; q2 = q1 + 6.01; q3 = q2 + 18 * 4.18 * 100 / 1000; q4 = q3 + 40.7; q5 = q4 + 18 * 2.01 * 20 / 1000
mk("u05-08", "chem-heating-curve", "graph", "Heating curve of water",
   f"Heating one mole of ice from −20 °C at a steady rate. The temperature stops rising while the ice melts (6.01 kJ) and while the water boils (40.7 kJ): the energy separates particles instead of speeding them up. Boiling takes far more energy because the molecules separate completely.",
   "Temperature against energy supplied: a short rise to 0 °C, a short flat stretch (melting), a rise to 100 °C, a long flat stretch (boiling), then a short rise.",
   ["Ice warms from −20 to 0 °C.", "Flat at 0 °C while melting: 6.01 kJ.", "Water warms to 100 °C.", "Flat at 100 °C while boiling: 40.7 kJ, nearly seven times as long.", "Steam warms above 100 °C."],
   range={"x": [0, 57], "y": [-30, 130]}, ticks=[[10, 20, 30, 40, 50], [-20, 0, 50, 100]], grid=[10, 20], axisLabels=["energy supplied / kJ", "temperature / °C"], xLabelBelow=True,
   curves=[{"expr": f"-20+20*x/{q1:.4f}", "domain": [0, q1], "colour": "a1"}, {"expr": "0", "domain": [q1, q2], "colour": "a1", "label": "melting", "labelAt": [q1 + 0.5, -10]},
           {"expr": f"100*(x-{q2:.4f})/{q3 - q2:.4f}", "domain": [q2, q3], "colour": "a1"}, {"expr": "100", "domain": [q3, q4], "colour": "a1", "label": "boiling", "labelAt": [30, 108]},
           {"expr": f"100+20*(x-{q4:.4f})/{q5 - q4:.4f}", "domain": [q4, q5], "colour": "a1"}],
   checks=[{"type": "value", "expr": "100", "x": 30, "between": [100, 100], "name": "the temperature is constant while water boils"},
           {"type": "point", "expr": f"100*(x-{q2:.4f})/{q3 - q2:.4f}", "x": r(q3, 4), "y": 100, "name": "liquid water reaches 100 °C after 18 g × 4.18 J g⁻¹ K⁻¹ × 100 K = 7.52 kJ"},
           {"type": "value", "expr": f"{q4 - q3:.4f}/{q2 - q1:.4f}", "x": 0, "between": [6.5, 7.0], "name": "boiling takes about 6.8 times the energy of melting (40.7 ÷ 6.01)"}])

mk("u05-09", "chem-phase-water", "phase", "Phase diagram of water",
   "Each region is a single phase; along each line two phases coexist, and at the triple point all three. Water's solid–liquid line slopes backwards because ice is less dense than liquid water, so pressure melts ice. Not to scale.",
   "Pressure against temperature: solid at low temperature and high pressure, liquid in the middle, gas at low pressure; three lines meet at the triple point; the liquid–gas line ends at the critical point; the solid–liquid line leans left.",
   ["Solid region upper left, liquid region upper middle, gas region at the bottom right.", "The three boundaries meet at the triple point, 0.01 °C and 0.006 atm.",
    "The liquid–gas line ends at the critical point, 374 °C and 218 atm.", "At 1 atm the line crosses melting at 0 °C and boiling at 100 °C."],
   substance="water", claims={"slope": "negative", "sublimes": False})

mk("u05-10", "chem-solid-types-lattice", "lattice", "Three crystalline solids",
   "Sodium chloride is an ionic lattice (6:6), copper a face-centred cubic metal in which each atom touches twelve others, and iron a body-centred cubic metal with eight neighbours.",
   "Three unit cells: sodium chloride, copper (face-centred cubic) and iron (body-centred cubic).",
   ["Sodium chloride: alternating Na⁺ and Cl⁻.", "Copper: atoms at corners and face centres, coordination 12.", "Iron: atoms at corners and the body centre, coordination 8."],
   cells=[{"kind": "nacl", "label": "NaCl (ionic)", "species": {"A": {"label": "Na+", "colour": "#8e5bd6", "r": 7}, "B": {"label": "Cl-", "colour": "#2fa84f", "r": 10}}, "claims": {"coordination": {"A": 6}, "perCell": {"A": 4, "B": 4}}},
          {"kind": "fcc", "label": "Cu (fcc metal)", "species": {"A": {"label": "Cu", "colour": "#c87533", "r": 10}}, "claims": {"coordination": {"A": 12}, "perCell": {"A": 4}}},
          {"kind": "bcc", "label": "Fe (bcc metal)", "species": {"A": {"label": "Fe", "colour": "#8a5a44", "r": 11}}, "claims": {"coordination": {"A": 8}, "perCell": {"A": 2}}}])

mk("u05-11", "chem-cubic-cells", "lattice", "Cubic unit cells",
   "Counting shared atoms: a corner atom is shared by 8 cells, a face atom by 2. Simple cubic holds 1 atom per cell (coordination 6), body-centred cubic 2 (coordination 8) and face-centred cubic 4 (coordination 12), the closest packing.",
   "Simple cubic, body-centred cubic and face-centred cubic unit cells.",
   ["Simple cubic: 8 corners × ⅛ = 1 atom; 6 neighbours.", "Body-centred: 1 + 1 = 2 atoms; 8 neighbours.", "Face-centred: 1 + 6 × ½ = 4 atoms; 12 neighbours."],
   cells=[{"kind": k, "label": l, "species": {"A": {"label": "atom", "colour": "a1", "r": 10}}, "claims": {"coordination": {"A": c}, "perCell": {"A": n}}}
          for k, l, c, n in [("sc", "simple cubic", 6, 1), ("bcc", "body-centred cubic", 8, 2), ("fcc", "face-centred cubic", 12, 4)]])

mk("u05-12", "chem-crystalline-amorphous", "particles", "Crystalline and amorphous solids",
   "A crystalline solid such as quartz has its particles in a regular, repeating arrangement and a sharp melting point. An amorphous solid such as glass has the same close packing but no long-range order, and softens over a range of temperatures.",
   "Two boxes of the same particles: a regular grid (crystalline) and a disordered close packing (amorphous).",
   ["Crystalline: rows and columns repeating.", "Amorphous: just as close together, but disordered."],
   species={"SiO2": {"atoms": ["Si", "O", "O"], "shape": "linear"}}, steps=[None],
   panels=[{"title": "crystalline", "arrangement": "lattice", "contents": [["SiO2", 12]]}, {"title": "amorphous (glass)", "arrangement": "liquid", "contents": [["SiO2", 12]]}],
   claims=[{"type": "states", "panel": 0, "as": "solid"}, {"type": "count", "panel": 1, "species": "SiO2", "n": 12}])

mk("u05-13", "chem-dissolving", "particles", "Sodium chloride dissolving",
   "Water molecules surround the ions at the edge of the lattice: the δ− oxygens face Na⁺ and the δ+ hydrogens face Cl⁻. The energy released by hydration pulls the ions into solution.",
   "Left: a sodium chloride lattice in water. Right: separate Na⁺ and Cl⁻ ions spread through the water.",
   ["Before: an ordered lattice of alternating Na⁺ and Cl⁻.", "After: the same ions, now separate and spread through the solution, each surrounded by water."],
   species={k: SPW[k] for k in ["Na+", "Cl-"]}, steps=["dissolves"], panelHeight=170,
   panels=[{"title": "solid NaCl", "arrangement": "lattice", "contents": [["Na+", 8], ["Cl-", 8]]}, {"title": "NaCl(aq)", "container": "beaker", "arrangement": "random", "contents": [["Na+", 8], ["Cl-", 8]]}],
   claims=[{"type": "conserved", "panels": [0, 1]}])

import numpy as np
T = [0, 20, 40, 60, 80, 100]
KNO3 = [13.3, 31.6, 63.9, 110, 169, 246]; NACL = [35.7, 36.0, 36.6, 37.3, 38.4, 39.8]
pk = np.polyfit(T, KNO3, 3); pn = np.polyfit(T, NACL, 2)
ek = f"{pk[0]:.8f}*x^3+{pk[1]:.7f}*x^2+{pk[2]:.6f}*x+{pk[3]:.5f}".replace("+-", "-"); en = f"{pn[0]:.8f}*x^2+{pn[1]:.7f}*x+{pn[2]:.5f}".replace("+-", "-")
mk("u05-14", "chem-solubility-curve", "graph", "Solubility curves",
   "Potassium nitrate's solubility rises steeply with temperature; sodium chloride's barely changes. Cooling a saturated KNO₃ solution from 80 °C to 20 °C crystallises out about 137 g per 100 g of water, which is why it can be purified by recrystallisation and NaCl cannot.",
   "Solubility in g per 100 g water against temperature: KNO₃ rising from 13 to 246; NaCl almost flat from 36 to 40.",
   ["KNO₃: 13.3 g at 0 °C, 31.6 at 20 °C, 110 at 60 °C, 246 at 100 °C.", "NaCl: 35.7 at 0 °C rising only to 39.8 at 100 °C.", "The curves cross near 22 °C."],
   range={"x": [0, 100], "y": [0, 260]}, ticks=[[20, 40, 60, 80, 100], [50, 100, 150, 200, 250]], grid=[20, 50], axisLabels=["temperature / °C", "solubility / g per 100 g water"], xLabelBelow=True,
   curves=[{"expr": ek, "colour": "a1", "label": "KNO₃", "labelAt": [78, 190]}, {"expr": en, "colour": "a3", "label": "NaCl", "labelAt": [82, 52]}],
   points=[{"x": t, "y": v, "colour": "a1"} for t, v in zip(T, KNO3)] + [{"x": t, "y": v, "colour": "a3"} for t, v in zip(T, NACL)],
   checks=[{"type": "value", "expr": ek, "x": 20, "between": [29, 34], "name": "KNO₃: about 31.6 g at 20 °C (data)"}, {"type": "value", "expr": ek, "x": 80, "between": [164, 174], "name": "KNO₃: about 169 g at 80 °C (data)"},
           {"type": "value", "expr": en, "x": 60, "between": [37.0, 37.6], "name": "NaCl: 37.3 g at 60 °C (data)"}])

mk("u05-16", "chem-colligative", "phase", "A solute lowers the freezing point and raises the boiling point",
   "Dissolving a non-volatile solute lowers the solvent's vapour pressure, shifting the liquid–gas line down (boiling point up) and the solid–liquid line left (freezing point down). For 1 mol of NaCl in 1 kg of water (2 mol of ions) ΔTb = 1.02 K and ΔTf = 3.72 K. Not to scale.",
   "The phase diagram of water with the solution's boundaries dashed: the liquid region widens at both ends.",
   ["Solid lines: pure water.", "Dashed lines: the solution. Its liquid–gas line lies lower and to the right, its solid–liquid line to the left.", "So the solution boils above 100 °C and freezes below 0 °C."],
   substance="water", solution={"molality": 1, "i": 2}, claims={"slope": "negative", "dTb": 1.02, "dTf": 3.72})

mk("u05-17", "chem-osmosis", "particles", "Osmosis",
   "A partially permeable membrane lets water molecules through but not the larger solute particles. Water moves overall from the dilute side (more free water) to the concentrated side until the pressures balance.",
   "A box divided by a dashed membrane: left side mostly water, right side water with many sugar molecules; an arrow shows net water flow to the right.",
   ["Left: pure water.", "Right: a concentrated sugar solution.", "Water crosses the membrane from left to right; sugar cannot."],
   species={"H2O": SPW["H2O"], "sugar": {"atoms": ["C", "O", "O", "O", "O"], "shape": "tetra"}}, panelHeight=200,
   panels=[{"title": "dilute | membrane | concentrated", "arrangement": "random", "contents": [["H2O", 10, "left"], ["H2O", 5, "right"], ["sugar", 5, "right"]], "membrane": True, "note": "net flow of water: left → right"}],
   claims=[{"type": "region", "panel": 0, "species": "sugar", "region": "right"}, {"type": "count", "panel": 0, "species": "sugar", "n": 5}])

mk("u05-18", "chem-diffusion", "particles", "Diffusion",
   "Particles move randomly, so a gas released in one corner spreads until it is evenly mixed: there is a net movement from high to low concentration even though no single particle aims anywhere.",
   "Before: bromine molecules crowded on the left of a box of air. After: bromine spread evenly through the box.",
   ["Before: bromine (brown) only in the left half.", "After a while: bromine everywhere, mixed with the air."],
   species={"Br2": {"atoms": ["Br", "Br"]}, "N2": SPW["N2"]}, steps=["time"],
   panels=[{"title": "start", "arrangement": "gas", "contents": [["Br2", 6]], "region": "left"}, {"title": "later", "arrangement": "gas", "contents": [["Br2", 6]]}],
   claims=[{"type": "conserved", "panels": [0, 1]}])

mk("u05-19", "chem-surface-tension", "particles", "Surface tension",
   "Molecules inside a liquid are pulled equally in all directions by their neighbours; molecules at the surface are pulled only sideways and inwards. The surface behaves like a stretched skin, strongest in water because of hydrogen bonding.",
   "Water molecules in a beaker; those at the surface have neighbours only beside and below them.",
   ["Molecules in the bulk are surrounded on every side.", "Surface molecules have no neighbours above, so they are pulled inwards."],
   species={"H2O": SPW["H2O"]}, panelHeight=180,
   panels=[{"title": "water", "container": "beaker", "arrangement": "liquid", "contents": [["H2O", 20]], "fill": 0.86, "note": "surface molecules: pulled sideways and down only"}],
   claims=[{"type": "states", "panel": 0, "as": "liquid"}])

# ---------------------------------------------------------------- unit 6
def prof(title, pts, dh, colour="a1", ea=True):
    p = {"title": title, "colour": colour, "points": pts, "expect": {"ts": sum(1 for q in pts if q["kind"] == "ts"), "int": sum(1 for q in pts if q["kind"] == "int"), "dh": dh}}
    if ea: p["ea"] = [{"from": 0, "to": 1, "label": "Ea", "dx": 0, "anchor": "start"}]
    return p

mk("u06-01", "chem-exo-endo-profiles", "energy-profile", "Exothermic and endothermic reactions",
   "In an exothermic reaction the products are lower in energy than the reactants and the difference is released to the surroundings (ΔH negative). In an endothermic reaction the products are higher and energy is taken in (ΔH positive). Both must first climb the activation energy.",
   "Two reaction profiles: exothermic, with products below reactants; endothermic, with products above reactants; both with an activation energy hump.",
   ["Exothermic: rises to a peak, then falls below the starting level; ΔH negative.", "Endothermic: rises to a peak, then falls to a level above the start; ΔH positive."],
   also=["gcse:u05-11"],
   profiles=[prof("exothermic", [{"x": 0, "e": 60, "kind": "start", "label": "reactants"}, {"x": 0.5, "e": 110, "kind": "ts", "label": "TS"}, {"x": 1, "e": 10, "kind": "end", "label": "products"}], "exothermic", "a1"),
             prof("endothermic", [{"x": 0, "e": 10, "kind": "start", "label": "reactants"}, {"x": 0.5, "e": 110, "kind": "ts", "label": "TS"}, {"x": 1, "e": 60, "kind": "end", "label": "products"}], "endothermic", "a3")])

mk("u06-02", "chem-exothermic-combustion", "energy-profile", "Burning methane",
   "CH₄ + 2O₂ → CO₂ + 2H₂O, ΔcH = −890 kJ mol⁻¹. The products are far lower in energy than the reactants; a spark supplies the activation energy, after which the energy released keeps the reaction going.",
   "Reaction profile with reactants CH₄ + 2O₂, a small hump, then products CO₂ + 2H₂O far below.",
   ["Reactants CH₄ + 2O₂.", "A hump: the activation energy.", "Products CO₂ + 2H₂O, 890 kJ mol⁻¹ lower."],
   profiles=[prof("CH₄ + 2O₂ → CO₂ + 2H₂O", [{"x": 0, "e": 100, "kind": "start", "label": "CH₄ + 2O₂"}, {"x": 0.3, "e": 140, "kind": "ts", "label": "TS"}, {"x": 1, "e": 0, "kind": "end", "label": "CO₂ + 2H₂O"}], "exothermic", "a1")])

mk("u06-03", "chem-endothermic-decomposition", "energy-profile", "Decomposing calcium carbonate",
   "CaCO₃ → CaO + CO₂, ΔH = +178 kJ mol⁻¹. The products are higher in energy than the reactants, so energy must be supplied continuously: limestone is heated to about 900 °C in a lime kiln.",
   "Reaction profile with CaCO₃ at the bottom, a high hump, and CaO + CO₂ at a higher level than the start.",
   ["Reactant CaCO₃.", "A large activation energy.", "Products CaO + CO₂, 178 kJ mol⁻¹ higher."],
   profiles=[prof("CaCO₃ → CaO + CO₂", [{"x": 0, "e": 10, "kind": "start", "label": "CaCO₃"}, {"x": 0.55, "e": 120, "kind": "ts", "label": "TS"}, {"x": 1, "e": 70, "kind": "end", "label": "CaO + CO₂"}], "endothermic", "a3")])

mk("u06-04", "chem-enthalpy-levels", "cycle", "An enthalpy level diagram",
   "Neutralisation: H⁺(aq) + OH⁻(aq) → H₂O(l), ΔH = −57.1 kJ mol⁻¹. The products sit below the reactants on the enthalpy scale and the arrow points down: exothermic.",
   "Two levels: H⁺(aq) + OH⁻(aq) above, H₂O(l) below, with a downward arrow labelled ΔH = −57.1 kJ mol⁻¹.",
   ["Upper level: H⁺(aq) + OH⁻(aq).", "Lower level: H₂O(l).", "Arrow down: ΔH = −57.1 kJ mol⁻¹."],
   kind="levels", height=[230, 260], states=[{"id": "r", "label": "H+(aq) + OH−(aq)"}, {"id": "p", "label": "H2O(l)"}],
   steps=[{"from": "r", "to": "p", "dh": -57.1, "label": "ΔH", "col": 0}], equations=["H+ + OH- → H2O"])

mk("u06-06", "chem-formation-cycle", "cycle", "ΔrH from enthalpies of formation",
   "For C₂H₄ + H₂ → C₂H₆, both routes from the elements must give the same total: ΔrH = ΣΔfH(products) − ΣΔfH(reactants) = −84 − (+52) = −136 kJ mol⁻¹.",
   "A Hess triangle: reactants C₂H₄ + H₂ top left, product C₂H₆ top right, elements 2C + 3H₂ at the bottom; arrows from the elements up to each side.",
   ["Elements 2C(s) + 3H₂(g) at the bottom.", "Up to C₂H₄ + H₂: ΔfH = +52 kJ mol⁻¹ (H₂ is an element, 0).", "Up to C₂H₆: ΔfH = −84 kJ mol⁻¹.", "So ΔrH = −84 − 52 = −136 kJ mol⁻¹."],
   kind="triangle", states=[{"id": "r", "label": "C2H4 + H2"}, {"id": "p", "label": "C2H6"}, {"id": "e", "label": "2C + 3H2 (elements)"}],
   steps=[{"from": "r", "to": "p", "dh": None, "label": "ΔrH"}, {"from": "e", "to": "r", "dh": 52, "label": "ΔfH"}, {"from": "e", "to": "p", "dh": -84, "label": "ΔfH"}],
   find={"step": 0, "value": -136}, equations=["C2H4 + H2 → C2H6", "2C + 2H2 → C2H4", "2C + 3H2 → C2H6"])

mk("u06-07", "chem-combustion-cycle", "cycle", "ΔfH from enthalpies of combustion",
   "Methane cannot be made directly from carbon and hydrogen, but both it and its elements burn to CO₂ and H₂O. ΔfH(CH₄) = [ΔcH(C) + 2ΔcH(H₂)] − ΔcH(CH₄) = (−394 − 572) − (−890) = −76 kJ mol⁻¹ with these rounded values (data books: −75).",
   "A Hess triangle: elements C + 2H₂ top left, CH₄ top right, CO₂ + 2H₂O at the bottom; arrows down from each top corner.",
   ["Top left: C(s) + 2H₂(g).", "Top right: CH₄(g); the arrow between them is ΔfH, unknown.", "Down from the elements: −394 + 2 × (−286) = −966 kJ mol⁻¹.", "Down from CH₄: −890 kJ mol⁻¹.", "So ΔfH = −966 + 890 = −76 kJ mol⁻¹."],
   kind="triangle", states=[{"id": "e", "label": "C + 2H2 (+ 2O2)"}, {"id": "m", "label": "CH4 (+ 2O2)"}, {"id": "c", "label": "CO2 + 2H2O"}],
   steps=[{"from": "e", "to": "m", "dh": None, "label": "ΔfH"}, {"from": "e", "to": "c", "dh": -966, "label": "ΣΔcH"}, {"from": "m", "to": "c", "dh": -890, "label": "ΔcH"}],
   find={"step": 0, "value": -76}, equations=["C + 2H2 + 2O2 → CO2 + 2H2O", "CH4 + 2O2 → CO2 + 2H2O"])

mk("u06-08", "chem-neutralisation-calorimeter", "apparatus", "Measuring an enthalpy of neutralisation",
   "50 cm³ of 1.0 mol dm⁻³ HCl and 50 cm³ of 1.0 mol dm⁻³ NaOH in a polystyrene cup rise by 6.8 °C. q = mcΔT = 100 × 4.18 × 6.8 = 2842 J for 0.050 mol of water formed, so ΔH = −2.84 ÷ 0.050 = −56.8 kJ mol⁻¹.",
   "A polystyrene cup with a lid and a thermometer, containing the mixture; the calculation beside it.",
   ["A polystyrene cup insulates the mixture; a lid reduces heat loss.", "The thermometer reads to 0.1 °C.", "m = 100 g, ΔT = 6.8 °C, q = 2842 J, n = 0.050 mol, ΔH = −56.8 kJ mol⁻¹."],
   kind="calorimeter", mixture="50 cm³ HCl + 50 cm³ NaOH", mass=100, dT=6.8, q=2842, moles=0.05, dH=-56.8)

mk("u06-09", "chem-hess-law", "cycle", "Hess's law",
   "The enthalpy change depends only on the start and finish, not the route. Burning carbon straight to CO₂ releases 394 kJ mol⁻¹; going via CO (−111, then −283) gives the same total.",
   "Hess triangle: C + O₂ top left, CO₂ top right, CO + ½O₂ at the bottom; direct route −394, indirect route −111 then −283.",
   ["Direct: C + O₂ → CO₂, ΔH = −394 kJ mol⁻¹.", "Indirect: C + ½O₂ → CO, −111; then CO + ½O₂ → CO₂, −283.", "−111 + (−283) = −394: the same."],
   kind="triangle", states=[{"id": "a", "label": "C + O2"}, {"id": "b", "label": "CO2"}, {"id": "c", "label": "CO + ½O2"}],
   steps=[{"from": "a", "to": "b", "dh": None, "label": "ΔH₁"}, {"from": "a", "to": "c", "dh": -111, "label": "ΔH₂"}, {"from": "c", "to": "b", "dh": -283, "label": "ΔH₃"}],
   find={"step": 0, "value": -394}, equations=["C + O2 → CO2", "C + ½O2 → CO", "CO + ½O2 → CO2"])

mk("u06-10", "chem-bond-enthalpy-cycle", "cycle", "Hydrogen and chlorine from bond enthalpies",
   "H₂ + Cl₂ → 2HCl: breaking H–H (436) and Cl–Cl (243) takes 679 kJ; making two H–Cl (2 × 432) releases 864 kJ. ΔH = 679 − 864 = −185 kJ mol⁻¹.",
   "Enthalpy diagram: H₂ + Cl₂, up 679 kJ to 2H + 2Cl, down 864 kJ to 2HCl, 185 kJ below the start.",
   ["Up 679 kJ: bonds broken.", "Down 864 kJ: bonds made.", "Net −185 kJ mol⁻¹."],
   kind="levels", states=[{"id": "r", "label": "H2 + Cl2"}, {"id": "a", "label": "2H + 2Cl (gaseous atoms)"}, {"id": "p", "label": "2HCl"}],
   steps=[{"from": "r", "to": "a", "dh": 679, "label": "bonds broken", "col": 0}, {"from": "a", "to": "p", "dh": -864, "label": "bonds made", "col": 1}, {"from": "r", "to": "p", "dh": None, "label": "ΔH", "col": 2}],
   find={"step": 2, "value": -185}, bonds=[{"step": 0, "list": [["H–H", 1, 436], ["Cl–Cl", 1, 243]]}, {"step": 1, "sign": -1, "list": [["H–Cl", 2, 432]]}], equations=["H2 + Cl2 → 2HCl"])

cool = "27.0-0.25*(x-3)"
mk("u06-11", "chem-calorimetry-cooling", "graph", "Correcting for heat loss",
   "The solution is mixed at 3 minutes. Because the cup loses heat while the reaction happens, the highest reading underestimates the rise. Extrapolating the cooling line back to the moment of mixing gives the true maximum, 27.0 °C: ΔT = 7.0 °C.",
   "Temperature against time: steady at 20 °C for 3 minutes, a sharp rise, then a straight cooling line; the cooling line is extended back to 3 minutes, meeting 27 °C.",
   ["0–3 min: steady at 20.0 °C.", "Mixed at 3 min.", "From 4 min: cooling in a straight line, 0.25 °C per minute.", "Extended back to 3 min: 27.0 °C, so ΔT = 7.0 °C."],
   range={"x": [0, 10], "y": [18, 29]}, ticks=[[1, 2, 3, 4, 5, 6, 7, 8, 9], [20, 22, 24, 26, 28]], grid=[1, 2], axisLabels=["time / min", "temperature / °C"], xLabelBelow=True,
   curves=[{"expr": "20", "domain": [0, 3], "colour": "a1"}, {"expr": "20+6.4*(x-3)/0.8", "domain": [3, 3.8], "colour": "a1"}, {"expr": cool, "domain": [3.8, 10], "colour": "a1"},
           {"expr": cool, "domain": [3, 3.8], "colour": "a2", "dash": "5 4"}],
   marks=[{"x": 3, "label": "mixed", "to": 27}], arrows=[{"from": [2.6, 20], "to": [2.6, 27], "both": True, "colour": "a2", "label": "ΔT = 7.0 °C", "labelAt": [0.3, 25.5]}],
   checks=[{"type": "point", "expr": cool, "x": 3, "y": 27, "name": "the cooling line extrapolated to the time of mixing gives 27.0 °C"},
           {"type": "slope", "expr": cool, "x": 6, "value": -0.25, "name": "cooling at 0.25 °C per minute"}])

mk("u06-12", "chem-entropy-states", "particles", "Entropy increases from solid to gas",
   "Entropy measures the number of ways particles and their energy can be arranged. A solid's particles are fixed in place (low entropy); a liquid's can move past each other; a gas's are free to be almost anywhere (high entropy). S(H₂O): ice 41, water 70, steam 189 J K⁻¹ mol⁻¹.",
   "Three boxes of water molecules: ordered solid, disordered liquid and widely scattered gas.",
   ["Ice: ordered, S about 41 J K⁻¹ mol⁻¹.", "Liquid water: disordered, about 70.", "Steam: spread out, 189."],
   species={"H2O": SPW["H2O"]}, steps=["S rises", "S rises"],
   panels=[{"title": "ice, S = 41", "arrangement": "lattice", "contents": [["H2O", 12]]}, {"title": "water, S = 70", "arrangement": "liquid", "contents": [["H2O", 12]]}, {"title": "steam, S = 189", "arrangement": "gas", "contents": [["H2O", 6]], "motion": True}],
   claims=[{"type": "states", "panel": 0, "as": "solid"}, {"type": "states", "panel": 1, "as": "liquid"}, {"type": "states", "panel": 2, "as": "gas"}])

T0 = 178 / 0.161
mk("u06-13", "chem-gibbs-T", "graph", "When does limestone decompose?",
   f"For CaCO₃ → CaO + CO₂, ΔH = +178 kJ mol⁻¹ and ΔS = +161 J K⁻¹ mol⁻¹. ΔG = ΔH − TΔS falls as T rises and becomes negative above T = ΔH ÷ ΔS = {round(T0)} K (about {round(T0 - 273)} °C): the reaction becomes feasible.",
   "ΔG against temperature: a straight line falling from +178 kJ/mol at 0 K, crossing zero near 1106 K.",
   ["At 0 K, ΔG = ΔH = +178 kJ mol⁻¹.", "The line falls with gradient −ΔS.", f"It crosses zero at {round(T0)} K: above this ΔG is negative."],
   range={"x": [0, 1600], "y": [-80, 200]}, ticks=[[400, 800, 1200, 1600], [-50, 0, 50, 100, 150]], grid=[200, 50], axisLabels=["T / K", "ΔG / kJ mol⁻¹"], xLabelBelow=True,
   curves=[{"expr": "178-0.161*x", "colour": "a1"}], points=[{"x": round(T0, 2), "y": 0, "label": f"ΔG = 0 at {round(T0)} K", "dy": -16}],
   bands=[{"x": [T0, 1600], "label": "feasible", "colour": "good"}],
   checks=[{"type": "point", "expr": "178-0.161*x", "x": round(T0, 4), "y": 0, "name": f"ΔG = 0 at T = ΔH/ΔS = {round(T0)} K"}, {"type": "slope", "expr": "178-0.161*x", "x": 500, "value": -0.161, "name": "gradient −ΔS = −0.161 kJ K⁻¹ mol⁻¹"}])

mk("u06-14", "chem-spontaneity-signs", "classify", "Is the reaction feasible?",
   "ΔG = ΔH − TΔS must be negative. The signs of ΔH and ΔS decide whether that depends on temperature.",
   "A tree: is ΔH negative? Then: is ΔS positive? Feasible at all temperatures; otherwise only at low temperatures. If ΔH is positive: is ΔS positive? Feasible at high temperatures; otherwise never.",
   ["ΔH negative and ΔS positive: always feasible, such as combustion.", "ΔH negative and ΔS negative: feasible below T = ΔH/ΔS, such as the Haber process.",
    "ΔH positive and ΔS positive: feasible above T = ΔH/ΔS, such as decomposing CaCO₃.", "ΔH positive and ΔS negative: never feasible."],
   start="q1", rowHeight=100,
   nodes={"q1": {"q": "Is ΔH negative (exothermic)?", "yes": "q2", "no": "q3"}, "q2": {"q": "Is ΔS positive?", "yes": "all", "no": "low"},
          "all": {"leaf": "Feasible at every temperature", "examples": ["burning methane"], "tone": "good"}, "low": {"leaf": "Feasible at low T only", "examples": ["N2 + 3H2 → 2NH3"], "tone": "a1"},
          "q3": {"q": "Is ΔS positive?", "yes": "high", "no": "never"}, "high": {"leaf": "Feasible at high T only", "examples": ["CaCO3 → CaO + CO2"], "tone": "a3"},
          "never": {"leaf": "Never feasible", "examples": ["3O2 → 2O3"], "tone": "bad"}},
   claims=[{"type": "path", "substance": "the Haber process (ΔH −92, ΔS −199)", "answers": ["yes", "no"], "leaf": "Feasible at low T only"},
           {"type": "path", "substance": "decomposing CaCO₃ (ΔH +178, ΔS +161)", "answers": ["no", "yes"], "leaf": "Feasible at high T only"}])

dg0, rt = -5.0, R * 298 / 1000
xi = 1 / (1 + math.exp(dg0 / rt))
gexpr = f"{dg0}*x+{rt:.4f}*(x*log(x)+(1-x)*log(1-x))"
mk("u06-15", "chem-gibbs-extent", "graph", "Equilibrium is the minimum of G",
   f"As a reaction A ⇌ B proceeds, the Gibbs energy of the mixture falls to a minimum and then rises. The minimum is the equilibrium position. With ΔG° = −5 kJ mol⁻¹ at 298 K it lies at {xi:.2f} of the way to products, where K = {math.exp(-dg0 / rt):.1f}.",
   "Gibbs energy of the mixture against extent of reaction from pure A (0) to pure B (1): a curve with a minimum at about 0.88.",
   ["At 0, pure A; at 1, pure B, 5 kJ mol⁻¹ lower.", "Mixing lowers G, so the curve dips below both ends.", f"The minimum, at {xi:.2f}, is equilibrium; the reaction moves downhill to it from either side."],
   range={"x": [0, 1], "y": [-6.5, 0.5]}, ticks=[[0.2, 0.4, 0.6, 0.8, 1], [-6, -4, -2, 0]], grid=[0.2, 1], axisLabels=["extent of reaction", "G / kJ mol⁻¹"], xLabelBelow=True,
   curves=[{"expr": gexpr, "domain": [0.0005, 0.9995], "colour": "a1"}], points=[{"x": round(xi, 4), "y": round(dg0 * xi + rt * (xi * math.log(xi) + (1 - xi) * math.log(1 - xi)), 4), "label": "equilibrium", "dy": 18, "anchor": "middle", "dx": 0}],
   checks=[{"type": "min", "expr": gexpr, "domain": [0.001, 0.999], "x": round(xi, 3), "name": f"G is lowest at extent {xi:.3f}, where B/A = K = exp(−ΔG°/RT) = {math.exp(-dg0 / rt):.2f}"}])

mk("u06-17", "chem-second-law", "particles", "Why gases spread out",
   "Removing the partition lets the gas spread into the empty half. Of all the ways to arrange the particles, almost all have them spread through the whole box, so the gas spreads and never gathers back on its own: entropy increases.",
   "Before: gas particles on the left of a partition, the right empty. After: particles spread through the whole box.",
   ["Before: all the particles in the left half.", "After: spread evenly; the reverse never happens by chance for any real number of particles."],
   species={"N2": SPW["N2"]}, steps=["partition removed"],
   panels=[{"title": "before", "arrangement": "gas", "contents": [["N2", 8]], "region": "left", "membrane": True}, {"title": "after", "arrangement": "gas", "contents": [["N2", 8]]}],
   claims=[{"type": "conserved", "panels": [0, 1]}])

mk("u06-18", "chem-chemical-potential", "graph", "Chemical potential of a gas",
   "For an ideal gas μ = μ° + RT ln(p/p°): the chemical potential rises with pressure, logarithmically. At the standard pressure (1 bar) μ = μ°; matter flows from high μ to low.",
   "μ − μ° against pressure in bar at 298 K: a logarithmic curve through zero at 1 bar.",
   ["Below 1 bar, μ is below μ°.", "At 1 bar, μ = μ°.", "Above 1 bar, μ rises ever more slowly: RT ln p."],
   range={"x": [0, 5], "y": [-8, 5]}, ticks=[[1, 2, 3, 4, 5], [-6, -3, 0, 3]], grid=[1, 3], axisLabels=["p / bar", "μ − μ° / kJ mol⁻¹"], xLabelBelow=True,
   curves=[{"expr": f"{rt:.4f}*log(x)", "domain": [0.04, 5], "colour": "a1"}], points=[{"x": 1, "y": 0, "label": "standard state"}],
   checks=[{"type": "point", "expr": f"{rt:.4f}*log(x)", "x": 1, "y": 0, "name": "μ = μ° at the standard pressure"}, {"type": "value", "expr": f"{rt:.4f}*log(x)", "x": 2.718282, "between": [2.47, 2.49], "name": "RT ln e = RT = 2.48 kJ mol⁻¹ at 298 K"}])

mk("u06-19", "chem-gibbs-T-lines", "graph", "ΔG against temperature for each sign case",
   "ΔG = ΔH − TΔS is a straight line with intercept ΔH and gradient −ΔS. Two cases never change sign; the other two cross zero at T = ΔH/ΔS, here 500 K.",
   "Four lines of ΔG against T: always negative, always positive, negative only below 500 K, and negative only above 500 K.",
   ["ΔH −50, ΔS +0.1: always negative.", "ΔH +50, ΔS −0.1: always positive.", "ΔH −50, ΔS −0.1: negative below 500 K.", "ΔH +50, ΔS +0.1: negative above 500 K."],
   range={"x": [0, 1000], "y": [-160, 160]}, ticks=[[200, 400, 600, 800, 1000], [-150, -100, -50, 0, 50, 100, 150]], grid=[200, 50], axisLabels=["T / K", "ΔG / kJ mol⁻¹"], xLabelBelow=True,
   curves=[{"expr": "-50-0.1*x", "colour": "good", "label": "ΔH < 0, ΔS > 0", "labelAt": [560, -140]}, {"expr": "50+0.1*x", "colour": "bad", "label": "ΔH > 0, ΔS < 0", "labelAt": [560, 135]},
           {"expr": "-50+0.1*x", "colour": "a1", "label": "ΔH < 0, ΔS < 0", "labelAt": [640, 64]}, {"expr": "50-0.1*x", "colour": "a3", "label": "ΔH > 0, ΔS > 0", "labelAt": [640, -64]}],
   marks=[{"y": 0}],
   checks=[{"type": "point", "expr": "-50+0.1*x", "x": 500, "y": 0, "name": "ΔH < 0, ΔS < 0: ΔG = 0 at 500 K"}, {"type": "point", "expr": "50-0.1*x", "x": 500, "y": 0, "name": "ΔH > 0, ΔS > 0: ΔG = 0 at 500 K"},
           {"type": "value", "expr": "-50-0.1*x", "x": 1000, "between": [-1000, -1], "name": "ΔH < 0, ΔS > 0 stays negative"}, {"type": "value", "expr": "50+0.1*x", "x": 0, "between": [1, 1000], "name": "ΔH > 0, ΔS < 0 stays positive"}])

mk("u06-20", "chem-thermo-cycle-dissolution", "cycle", "Dissolving sodium chloride",
   "ΔsolH = −ΔlattH(formation) + ΔhydH(Na⁺) + ΔhydH(Cl⁻) = +787 − 406 − 364 = +17 kJ mol⁻¹ with these values (data books give about +4). Separating the lattice costs almost exactly what hydrating the ions returns, so NaCl dissolves with a small enthalpy change, driven by entropy.",
   "Enthalpy diagram: NaCl(s) low; up 787 to the gaseous ions; down 406 and 364 for hydration to Na⁺(aq) + Cl⁻(aq), just above NaCl(s).",
   ["NaCl(s) at the start.", "Up +787 kJ mol⁻¹ to Na⁺(g) + Cl⁻(g): breaking up the lattice.", "Down −406 kJ mol⁻¹: hydrating Na⁺.", "Down −364 kJ mol⁻¹: hydrating Cl⁻, ending 17 kJ mol⁻¹ above the start."],
   kind="levels", states=[{"id": "s", "label": "NaCl(s)"}, {"id": "g", "label": "Na+(g) + Cl−(g)"}, {"id": "h", "label": "Na+(aq) + Cl−(g)"}, {"id": "aq", "label": "Na+(aq) + Cl−(aq)"}],
   steps=[{"from": "s", "to": "g", "dh": 787, "label": "−ΔlattH", "col": 0}, {"from": "g", "to": "h", "dh": -406, "label": "ΔhydH(Na⁺)", "col": 1}, {"from": "h", "to": "aq", "dh": -364, "label": "ΔhydH(Cl⁻)", "col": 1},
          {"from": "s", "to": "aq", "dh": None, "label": "ΔsolH", "col": 2}], find={"step": 3, "value": 17})

# ---------------------------------------------------------------- unit 7
mk("u07-01", "chem-rate-curve", "graph", "Following the rate of a reaction",
   "The volume of gas produced rises fastest at the start, when the reactants are most concentrated, and levels off as they are used up. The rate at any moment is the gradient of the curve.",
   "Volume of gas against time: a curve rising steeply at first and levelling off at 60 cm³.",
   ["Steep at the start: fast reaction.", "Less steep as the reactants are used up.", "Flat at 60 cm³: the reaction has finished."],
   also=["gcse:u05-12"],
   range={"x": [0, 120], "y": [0, 70]}, ticks=[[20, 40, 60, 80, 100, 120], [20, 40, 60]], grid=[20, 10], axisLabels=["time / s", "volume of gas / cm³"], xLabelBelow=True,
   curves=[{"expr": "60*(1-exp(-0.04*x))", "colour": "a1"}], marks=[{"y": 60, "label": "reaction complete"}],
   checks=[{"type": "slope", "expr": "60*(1-exp(-0.04*x))", "x": 0, "value": 2.4, "name": "initial rate 2.4 cm³ s⁻¹ (the gradient at t = 0)"}, {"type": "value", "expr": "60*(1-exp(-0.04*x))", "x": 120, "between": [59, 60], "name": "levels off at 60 cm³"}])

def mbE(scale):
    c = 2 / math.sqrt(math.pi) * scale ** -1.5
    return f"{c:.6f}*sqrt(x)*exp(-x/{scale})"
E1, E2 = mbE(1.0), mbE(1.25)
mk("u07-02", "chem-collision-ea", "graph", "The activation energy on the energy distribution",
   "Only collisions with at least the activation energy Ea lead to reaction. The shaded area beyond Ea is the fraction of molecules energetic enough to react: a small part of the whole.",
   "Maxwell–Boltzmann distribution of molecular energies starting at zero, rising to a peak and falling slowly; the tail beyond Ea is shaded.",
   ["The curve starts at the origin: no molecules have zero energy.", "It peaks at the most probable energy and tails off; it never quite reaches the axis.", "Beyond Ea (shaded): the molecules that can react."],
   also=['chemistry:u16-13'], range={"x": [0, 9], "y": [0, 0.5]}, ticks=[[], []], axisLabels=["energy", "number of molecules"], xLabelBelow=True,
   curves=[{"expr": E1, "domain": [0, 9], "colour": "a1"}], areas=[{"expr": E1, "from": 4, "to": 9}], marks=[{"x": 4, "label": "Ea", "to": 0.2}],
   checks=[{"type": "area", "expr": E1, "from": 0, "to": 60, "value": 1, "name": "the area under the curve is all the molecules (normalised to 1)"},
           {"type": "max", "expr": E1, "domain": [0.01, 9], "x": 0.5, "y": round(2 / math.sqrt(math.pi) * math.sqrt(0.5) * math.exp(-0.5), 5), "name": "the most probable energy is ½kT"}])

mk("u07-03", "chem-activation-energy", "energy-profile", "Activation energy",
   "The activation energy is the minimum energy colliding particles need to react: the height of the barrier from the reactants to the transition state. It is the same whether the reaction is exothermic or endothermic overall.",
   "A reaction profile with the activation energy arrow from the reactants up to the transition state.",
   ["Reactants at the left.", "The curve rises to the transition state; the arrow Ea spans this rise.", "It falls to the products, lower here: exothermic."],
   profiles=[prof("an exothermic reaction", [{"x": 0, "e": 50, "kind": "start", "label": "reactants"}, {"x": 0.5, "e": 120, "kind": "ts", "label": "TS"}, {"x": 1, "e": 10, "kind": "end", "label": "products"}], "exothermic")])

mk("u07-04", "chem-reaction-profile-steps", "energy-profile", "A two-step reaction",
   "A reaction with an intermediate has two transition states with the intermediate in the valley between. The higher barrier, here the first, controls the overall rate.",
   "Reaction profile: reactants, a high first hump, a valley with the intermediate, a lower second hump, products.",
   ["First, higher transition state.", "The intermediate in the dip.", "Second, lower transition state.", "Products below the reactants."],
   profiles=[{"title": "two steps", "colour": "a1", "points": [{"x": 0, "e": 40, "kind": "start", "label": "reactants"}, {"x": 0.3, "e": 120, "kind": "ts", "label": "TS1"}, {"x": 0.55, "e": 70, "kind": "int", "label": "intermediate"},
              {"x": 0.75, "e": 95, "kind": "ts", "label": "TS2"}, {"x": 1, "e": 10, "kind": "end", "label": "products"}], "ea": [{"from": 0, "to": 1, "label": "Ea", "dx": -30, "anchor": "end"}],
              "expect": {"ts": 2, "int": 1, "rds": 1, "dh": "exothermic"}}])

mk("u07-05", "chem-catalysed-profile", "energy-profile", "A catalyst lowers the activation energy",
   "A catalyst provides an alternative route with a lower activation energy. The reactants and products, and so ΔH, are unchanged; more collisions now have enough energy, so the reaction is faster.",
   "Two profiles with the same start and end: uncatalysed with a high peak, catalysed with a lower peak.",
   ["Uncatalysed: a high activation energy.", "Catalysed: the same reactants and products, a lower barrier.", "ΔH is the same for both."],
   profiles=[prof("uncatalysed", [{"x": 0, "e": 50, "kind": "start", "label": "reactants"}, {"x": 0.5, "e": 130, "kind": "ts", "label": "TS"}, {"x": 1, "e": 10, "kind": "end", "label": "products"}], "exothermic", "a1"),
             prof("catalysed", [{"x": 0, "e": 50, "kind": "start", "label": "reactants"}, {"x": 0.5, "e": 85, "kind": "ts", "label": "TS"}, {"x": 1, "e": 10, "kind": "end", "label": "products"}], "exothermic", "a4")])

mk("u07-06", "chem-catalyst-distribution", "graph", "Why a catalyst speeds a reaction",
   "With a catalyst the activation energy falls from Ea to Ea(cat). The distribution of energies is unchanged, but a much larger fraction of molecules now has enough energy: here about 3.7 times as many.",
   "One Maxwell–Boltzmann distribution with two thresholds: Ea, and a lower Ea(cat); the area beyond Ea(cat) is much larger.",
   ["The same energy distribution: the temperature has not changed.", "Uncatalysed: only molecules beyond Ea react.", "Catalysed: everything beyond the lower Ea(cat) can react."],
   range={"x": [0, 9], "y": [0, 0.5]}, ticks=[[], []], axisLabels=["energy", "number of molecules"], xLabelBelow=True,
   curves=[{"expr": E1, "domain": [0, 9], "colour": "a1"}], areas=[{"expr": E1, "from": 3, "to": 9, "colour": "a4", "opacity": 0.2}, {"expr": E1, "from": 4.5, "to": 9, "colour": "a2", "opacity": 0.3}],
   marks=[{"x": 3, "label": "Ea(cat)", "to": 0.24}, {"x": 4.5, "label": "Ea", "to": 0.2}],
   checks=[{"type": "tail", "a": E1, "fromA": 3, "fromB": 4.5, "to": 60, "factor": 3, "name": "lowering Ea from 4.5 to 3 (units of kT) more than triples the fraction able to react"}])

mm = "10*x/(2+x)"
mk("u07-08", "chem-michaelis-menten", "graph", "Enzyme kinetics",
   "At low substrate concentration the rate rises almost in proportion. As the enzyme's active sites fill, the rate levels towards Vmax. The Michaelis constant Km is the concentration that gives half of Vmax.",
   "Rate against substrate concentration: rising steeply, then levelling towards Vmax = 10, with half Vmax reached at [S] = Km = 2.",
   ["At low [S]: rate roughly proportional to [S].", "At high [S]: rate approaches Vmax, the enzyme saturated.", "At [S] = Km = 2, rate = 5 = Vmax ÷ 2."],
   range={"x": [0, 20], "y": [0, 11]}, ticks=[[2, 5, 10, 15, 20], [5, 10]], grid=[5, 1], axisLabels=["[S] / mmol dm⁻³", "rate / μmol s⁻¹"], xLabelBelow=True,
   curves=[{"expr": mm, "colour": "a1"}], marks=[{"y": 10, "label": "Vmax"}, {"x": 2, "to": 5, "label": "Km"}], points=[{"x": 2, "y": 5, "label": "½Vmax"}],
   checks=[{"type": "point", "expr": mm, "x": 2, "y": 5, "name": "at [S] = Km the rate is Vmax/2"}, {"type": "value", "expr": mm, "x": 1000, "between": [9.9, 10], "name": "the rate approaches Vmax = 10"}])

mk("u07-09", "chem-rate-vs-conc-orders", "graph", "Rate against concentration for each order",
   "Zero order: the rate does not change with [A]. First order: rate ∝ [A], a straight line through the origin. Second order: rate ∝ [A]², a curve, so doubling [A] quadruples the rate.",
   "Rate against [A]: a horizontal line (zero order), a straight line through the origin (first), and an upward curve (second).",
   ["Zero order: flat.", "First order: rate doubles when [A] doubles.", "Second order: rate × 4 when [A] doubles."],
   range={"x": [0, 2], "y": [0, 2.2]}, ticks=[[0.5, 1, 1.5, 2], [0.5, 1, 1.5, 2]], grid=[0.5, 0.5], axisLabels=["[A] / mol dm⁻³", "rate / mol dm⁻³ s⁻¹"], xLabelBelow=True,
   curves=[{"expr": "0.6", "colour": "a5", "label": "zero order", "labelAt": [1.55, 0.7]}, {"expr": "0.5*x", "colour": "a1", "label": "first order", "labelAt": [1.55, 0.95]}, {"expr": "0.5*x^2", "colour": "a2", "label": "second order", "labelAt": [1.2, 1.6]}],
   checks=[{"type": "point", "expr": "0.5*x", "x": 1.6, "y": 0.8, "name": "first order: doubling [A] from 0.8 to 1.6 doubles the rate"}, {"type": "point", "expr": "0.5*x^2", "x": 1.6, "y": 1.28, "name": "second order: doubling [A] from 0.8 (0.32) to 1.6 (1.28) quadruples the rate"}])

k1 = math.log(2) / 3
mk("u07-10", "chem-orders-conc-time", "graph", "Concentration against time for each order",
   "From the same start, a zero-order reaction falls in a straight line, a first-order one decays exponentially with a constant half-life, and a second-order one starts as fast but slows more, with half-lives that double.",
   "[A] against time from 1.0: a straight line to zero (zero order), an exponential curve (first order) and a curve that flattens more (second order).",
   ["Zero order: [A] falls by the same amount each second.", "First order: [A] halves every 3 s.", "Second order: the first half-life is 3 s, the next 6 s."],
   range={"x": [0, 15], "y": [0, 1.1]}, ticks=[[3, 6, 9, 12, 15], [0.25, 0.5, 0.75, 1]], grid=[3, 0.25], axisLabels=["time / s", "[A] / mol dm⁻³"], xLabelBelow=True,
   curves=[{"expr": "1-x/6", "domain": [0, 6], "colour": "a5", "label": "zero", "labelAt": [4.2, 0.18]}, {"expr": "0", "domain": [6, 15], "colour": "a5"},
           {"expr": f"exp(-{k1:.6f}*x)", "colour": "a1", "label": "first", "labelAt": [9.3, 0.17]}, {"expr": "1/(1+x/3)", "colour": "a2", "label": "second", "labelAt": [11, 0.3]}],
   checks=[{"type": "point", "expr": f"exp(-{k1:.6f}*x)", "x": 3, "y": 0.5, "name": "first order: half-life 3 s"}, {"type": "point", "expr": f"exp(-{k1:.6f}*x)", "x": 6, "y": 0.25, "name": "first order: the next half-life is also 3 s"},
           {"type": "point", "expr": "1/(1+x/3)", "x": 9, "y": 0.25, "name": "second order: 0.5 → 0.25 takes 6 s, twice the first half-life"}])

mk("u07-11", "chem-zero-order", "graph", "A zero-order reaction",
   "The concentration falls at a constant rate, so the graph is a straight line whose gradient is −k. Here k = 0.05 mol dm⁻³ s⁻¹: the half-life, [A]₀/2k = 10 s, gets shorter as the reaction goes on.",
   "[A] against time: a straight line from 1.0 mol dm⁻³ at 0 s to zero at 20 s.",
   ["A straight line: the rate does not depend on [A].", "Gradient −0.05 mol dm⁻³ s⁻¹ = −k.", "Half the reactant is gone at 10 s."],
   range={"x": [0, 22], "y": [0, 1.1]}, ticks=[[5, 10, 15, 20], [0.25, 0.5, 0.75, 1]], grid=[5, 0.25], axisLabels=["time / s", "[A] / mol dm⁻³"], xLabelBelow=True,
   curves=[{"expr": "1-0.05*x", "domain": [0, 20], "colour": "a5"}], points=[{"x": 10, "y": 0.5, "label": "t½ = 10 s"}],
   checks=[{"type": "slope", "expr": "1-0.05*x", "x": 5, "value": -0.05, "name": "gradient = −k = −0.05 mol dm⁻³ s⁻¹"}, {"type": "point", "expr": "1-0.05*x", "x": 10, "y": 0.5, "name": "t½ = [A]₀/2k = 10 s"}])

kd = math.log(2) / 6
mk("u07-12", "chem-first-order-decay", "graph", "First-order decay: constant half-lives",
   "A first-order reaction loses the same fraction in each equal time: the half-life is constant, here 6 s, whatever the starting concentration. t½ = ln 2 ÷ k, so k = 0.116 s⁻¹.",
   "[A] against time from 1.0, halving to 0.5 at 6 s, 0.25 at 12 s and 0.125 at 18 s.",
   ["1.0 at 0 s.", "0.5 at 6 s.", "0.25 at 12 s.", "0.125 at 18 s: three equal half-lives."],
   also=["chemistry:u07-15"],
   range={"x": [0, 24], "y": [0, 1.1]}, ticks=[[6, 12, 18, 24], [0.125, 0.25, 0.5, 1]], grid=[6, 0.25], axisLabels=["time / s", "[A] / mol dm⁻³"], xLabelBelow=True,
   curves=[{"expr": f"exp(-{kd:.6f}*x)", "colour": "a1"}], points=[{"x": 6, "y": 0.5, "label": "t½"}, {"x": 12, "y": 0.25, "label": "2t½"}, {"x": 18, "y": 0.125, "label": "3t½"}],
   checks=[{"type": "point", "expr": f"exp(-{kd:.6f}*x)", "x": 6, "y": 0.5}, {"type": "point", "expr": f"exp(-{kd:.6f}*x)", "x": 12, "y": 0.25}, {"type": "point", "expr": f"exp(-{kd:.6f}*x)", "x": 18, "y": 0.125, "name": "three half-lives of 6 s: 1 → ½ → ¼ → ⅛"}])

mk("u07-13", "chem-second-order-inverse", "graph", "Recognising second order",
   "For a second-order reaction 1/[A] = 1/[A]₀ + kt, so a plot of 1/[A] against time is a straight line with gradient k. Here k = 0.5 dm³ mol⁻¹ s⁻¹.",
   "1/[A] against time: a straight line from 1 at 0 s rising with gradient 0.5.",
   ["Intercept 1/[A]₀ = 1 dm³ mol⁻¹.", "Gradient k = 0.5 dm³ mol⁻¹ s⁻¹.", "A straight line confirms second order."],
   range={"x": [0, 10], "y": [0, 7]}, ticks=[[2, 4, 6, 8, 10], [1, 2, 3, 4, 5, 6]], grid=[2, 1], axisLabels=["time / s", "1/[A] / dm³ mol⁻¹"], xLabelBelow=True,
   curves=[{"expr": "1+0.5*x", "colour": "a2"}], checks=[{"type": "slope", "expr": "1+0.5*x", "x": 5, "value": 0.5, "name": "gradient = k = 0.5 dm³ mol⁻¹ s⁻¹"}, {"type": "point", "expr": "1+0.5*x", "x": 0, "y": 1, "name": "intercept 1/[A]₀ = 1"}])

ea_r = 50000 / R
ak = f"exp({ea_r:.2f}*(1/300-1/x))"
mk("u07-14", "chem-rate-constant-T", "graph", "How k changes with temperature",
   f"For a reaction with Ea = 50 kJ mol⁻¹, the Arrhenius equation predicts k nearly doubles for each 10 K rise near room temperature (×{math.exp(ea_r * (1 / 300 - 1 / 310)):.2f} from 300 to 310 K) and rises ever faster.",
   "k relative to its value at 300 K against temperature from 290 to 360 K, rising in an accelerating curve; at 310 K it is about 1.9.",
   ["At 300 K, k is 1 (the reference).", "At 310 K, about 1.9.", "At 360 K, about 28."],
   range={"x": [290, 360], "y": [0, 32]}, ticks=[[300, 310, 320, 330, 340, 350, 360], [5, 10, 15, 20, 25, 30]], grid=[10, 5], axisLabels=["T / K", "k ÷ k(300 K)"], xLabelBelow=True,
   curves=[{"expr": ak, "colour": "a3"}], points=[{"x": 310, "y": round(math.exp(ea_r * (1 / 300 - 1 / 310)), 4), "label": "×1.9 for +10 K", "dx": 10}],
   checks=[{"type": "value", "expr": ak, "x": 310, "between": [1.85, 1.95], "name": "k rises by a factor of about 1.9 from 300 to 310 K (Ea = 50 kJ mol⁻¹)"}, {"type": "point", "expr": ak, "x": 300, "y": 1}])

mk("u07-16", "chem-ln-first-order", "graph", "ln[A] against time is a straight line for first order",
   "Taking logs of [A] = [A]₀e^(−kt) gives ln[A] = ln[A]₀ − kt: a straight line whose gradient is −k. Here k = 0.116 s⁻¹ (half-life 6 s).",
   "ln[A] against time: a straight line falling from 0 with gradient −0.116.",
   ["Intercept ln[A]₀ = ln 1 = 0.", "Gradient −k = −0.116 s⁻¹.", "Straight, so the reaction is first order."],
   range={"x": [0, 24], "y": [-3.2, 0.4]}, ticks=[[6, 12, 18, 24], [-3, -2, -1, 0]], grid=[6, 1], axisLabels=["time / s", "ln([A] / mol dm⁻³)"], xLabelBelow=True,
   curves=[{"expr": f"-{kd:.6f}*x", "colour": "a1"}], checks=[{"type": "slope", "expr": f"-{kd:.6f}*x", "x": 10, "value": -round(kd, 6), "name": "gradient −k = −ln 2 ÷ 6 s = −0.116 s⁻¹"}])

ar = f"20-{ea_r / 1000:.4f}*x"
mk("u07-17", "chem-arrhenius-plot", "graph", "The Arrhenius plot",
   "ln k = ln A − Ea/RT, so plotting ln k against 1/T gives a straight line of gradient −Ea/R. Here the gradient is −6.01 × 10³ K, so Ea = 6.01 × 10³ × 8.314 = 50 kJ mol⁻¹.",
   "ln k against 1/T (in units of 10⁻³ K⁻¹): a straight line falling with gradient −6.01.",
   ["x-axis: 1/T from 2.6 to 3.6 × 10⁻³ K⁻¹.", "Gradient −Ea/R = −6.01 × 10³ K.", "Intercept (at 1/T = 0) ln A = 20."],
   range={"x": [2.6, 3.6], "y": [-2, 5]}, ticks=[[2.8, 3.0, 3.2, 3.4, 3.6], [-2, 0, 2, 4]], grid=[0.2, 1], axisLabels=["1/T / 10⁻³ K⁻¹", "ln k"], xLabelBelow=True,
   curves=[{"expr": ar, "colour": "a1"}], checks=[{"type": "slope", "expr": ar, "x": 3, "value": -round(ea_r / 1000, 4), "name": "gradient = −Ea/R; with Ea = 50 kJ mol⁻¹ that is −6.01 × 10³ K"}])

mk("u07-18", "chem-maxwell-boltzmann-ea", "graph", "Why a small temperature rise speeds reactions so much",
   "At the higher temperature the distribution flattens and shifts to higher energy. The area beyond Ea, the molecules that can react, grows far more than the shift suggests: here it more than doubles.",
   "Two Maxwell–Boltzmann energy distributions, T₁ and a higher T₂, with the area beyond Ea shaded for each; the T₂ tail is much larger.",
   ["T₁: taller, narrower, peak further left.", "T₂: lower, broader, peak further right.", "Both enclose the same area.", "Beyond Ea: the T₂ curve lies well above the T₁ curve."],
   range={"x": [0, 9], "y": [0, 0.5]}, ticks=[[], []], axisLabels=["energy", "number of molecules"], xLabelBelow=True,
   curves=[{"expr": E1, "domain": [0, 9], "colour": "a1", "label": "T₁", "labelAt": [0.9, 0.45]}, {"expr": E2, "domain": [0, 9], "colour": "a3", "label": "T₂ > T₁", "labelAt": [1.6, 0.34]}],
   areas=[{"expr": E2, "from": 4.5, "to": 9, "colour": "a3", "opacity": 0.25}, {"expr": E1, "from": 4.5, "to": 9, "colour": "a1", "opacity": 0.35}], marks=[{"x": 4.5, "label": "Ea", "to": 0.2}],
   checks=[{"type": "tail", "a": E2, "b": E1, "from": 4.5, "to": 60, "factor": 2, "name": "beyond Ea, T₂ has more than twice as many molecules as T₁"}, {"type": "area", "expr": E2, "from": 0, "to": 80, "value": 1, "name": "T₂: the same total area"}])

mk("u07-19", "chem-mechanism-profile", "energy-profile", "A three-step mechanism",
   "Each step has its own transition state, with an intermediate between steps. The step with the highest transition state, here the second, is rate-determining.",
   "Profile with three humps and two intermediates; the second hump is highest.",
   ["Step 1: a low barrier to intermediate 1.", "Step 2: the highest transition state, rate-determining.", "Step 3: a small barrier to the products."],
   profiles=[{"title": "three steps", "colour": "a5", "points": [{"x": 0, "e": 40, "kind": "start", "label": "reactants"}, {"x": 0.18, "e": 80, "kind": "ts", "label": "TS1"}, {"x": 0.33, "e": 55, "kind": "int", "label": "I₁"},
              {"x": 0.52, "e": 120, "kind": "ts", "label": "TS2"}, {"x": 0.68, "e": 65, "kind": "int", "label": "I₂"}, {"x": 0.82, "e": 85, "kind": "ts", "label": "TS3"}, {"x": 1, "e": 15, "kind": "end", "label": "products"}],
              "expect": {"ts": 3, "int": 2, "rds": 2, "dh": "exothermic"}}])

mk("u07-20", "chem-rds-profile", "energy-profile", "The rate-determining step",
   "In a two-step reaction the slower step is the one with the higher transition state. Here the first step is fast and the second slow, so the second step is rate-determining and the rate equation reflects the species in it.",
   "Profile with two humps; the second is higher.",
   ["Step 1: a low barrier, fast, forming the intermediate.", "Step 2: the higher barrier, slow: rate-determining."],
   profiles=[{"title": "slow second step", "colour": "a1", "points": [{"x": 0, "e": 40, "kind": "start", "label": "reactants"}, {"x": 0.28, "e": 75, "kind": "ts", "label": "TS1"}, {"x": 0.5, "e": 55, "kind": "int", "label": "intermediate"},
              {"x": 0.72, "e": 125, "kind": "ts", "label": "TS2"}, {"x": 1, "e": 10, "kind": "end", "label": "products"}], "expect": {"ts": 2, "int": 1, "rds": 2, "dh": "exothermic"}}])

mk("u07-22", "chem-initial-rates", "graph", "Measuring an initial rate",
   "The initial rate is the gradient of the concentration–time curve at t = 0. Draw the tangent at the start and measure its gradient: here 0.2 mol dm⁻³ min⁻¹. Repeating with different starting concentrations gives the orders.",
   "Product concentration against time, a curve levelling at 0.8, with a dashed tangent at the origin of gradient 0.2.",
   ["The curve rises and levels off at 0.8 mol dm⁻³.", "The tangent at t = 0 rises 0.4 in 2 min: initial rate 0.2 mol dm⁻³ min⁻¹."],
   range={"x": [0, 15], "y": [0, 1]}, ticks=[[2, 4, 6, 8, 10, 12, 14], [0.2, 0.4, 0.6, 0.8]], grid=[2, 0.2], axisLabels=["time / min", "[product] / mol dm⁻³"], xLabelBelow=True,
   curves=[{"expr": "0.8*(1-exp(-0.25*x))", "colour": "a1"}, {"expr": "0.2*x", "domain": [0, 4.5], "colour": "a2", "dash": "6 5", "label": "tangent at t = 0", "labelAt": [4.6, 0.92]}],
   checks=[{"type": "slope", "expr": "0.8*(1-exp(-0.25*x))", "x": 0, "value": 0.2, "name": "the curve's gradient at t = 0 is 0.2 mol dm⁻³ min⁻¹"}, {"type": "slope", "expr": "0.2*x", "x": 1, "value": 0.2, "name": "and the tangent drawn has that gradient"}])

# ---------------------------------------------------------------- unit 8
mk("u08-01", "chem-reversible-approach", "graph", "Rates of the forward and reverse reactions",
   "Starting with reactants only, the forward rate is high and falls as they are used up; the reverse rate starts at zero and rises as products form. When the two rates are equal, the system is at dynamic equilibrium.",
   "Rate against time: a forward-rate curve falling and a reverse-rate curve rising until both level at the same value.",
   ["Forward rate: starts high, falls.", "Reverse rate: starts at zero, rises.", "From about 10 s they are equal: equilibrium."],
   range={"x": [0, 15], "y": [0, 1.1]}, ticks=[[5, 10, 15], [0.3, 0.5, 1]], grid=[5, 0.25], axisLabels=["time / s", "rate"], xLabelBelow=True,
   curves=[{"expr": "0.3+0.7*exp(-0.4*x)", "colour": "a1", "label": "forward", "labelAt": [1.2, 0.85]}, {"expr": "0.3*(1-exp(-0.4*x))", "colour": "a2", "label": "reverse", "labelAt": [1.2, 0.05]}],
   bands=[{"x": [10, 15], "label": "equilibrium", "colour": "a4"}],
   checks=[{"type": "intersect", "a": "0.3+0.7*exp(-0.4*x)", "b": "0.3*(1-exp(-0.4*x))", "x": 40, "y": 0.3, "name": "the two rates become equal (0.3)"}])

mk("u08-02", "chem-dynamic-equilibrium", "graph", "Concentrations reaching equilibrium",
   "For A ⇌ B starting from pure A, [A] falls and [B] rises until both stop changing. They need not be equal: here [B]/[A] = 0.6/0.4 = 1.5 = Kc. Both reactions are still going, at equal rates.",
   "Concentration against time: [A] falling from 1.0 to 0.4, [B] rising from 0 to 0.6, both levelling.",
   ["[A] from 1.0 down to 0.4.", "[B] from 0 up to 0.6.", "Then constant: Kc = 0.6 ÷ 0.4 = 1.5."],
   also=["gcse:u05-13"],
   range={"x": [0, 20], "y": [0, 1.1]}, ticks=[[5, 10, 15, 20], [0.2, 0.4, 0.6, 0.8, 1]], grid=[5, 0.2], axisLabels=["time / s", "concentration / mol dm⁻³"], xLabelBelow=True,
   curves=[{"expr": "0.4+0.6*exp(-0.3*x)", "colour": "a1", "label": "[A]", "labelAt": [18, 0.46]}, {"expr": "0.6*(1-exp(-0.3*x))", "colour": "a2", "label": "[B]", "labelAt": [18, 0.66]}],
   checks=[{"type": "value", "expr": "(0.6*(1-exp(-0.3*x)))/(0.4+0.6*exp(-0.3*x))", "x": 60, "between": [1.499, 1.501], "name": "at equilibrium [B]/[A] = Kc = 1.5"}])

mk("u08-03", "chem-k-large-small", "graph", "The size of K and the position of equilibrium",
   "For A ⇌ B the fraction converted to B at equilibrium is K/(1 + K). K = 1 gives half; each factor of 10 pushes it further: K = 1000 is 99.9% products, K = 0.001 almost none.",
   "Fraction of B at equilibrium against log K: an S-shaped curve through 0.5 at log K = 0.",
   ["log K = −3: almost all A.", "log K = 0 (K = 1): half and half.", "log K = +3: almost all B."],
   range={"x": [-4, 4], "y": [0, 1.05]}, ticks=[[-4, -2, 0, 2, 4], [0.5, 1]], grid=[1, 0.25], axisLabels=["log₁₀ K", "fraction as B"], xLabelBelow=True,
   curves=[{"expr": "10^x/(1+10^x)", "colour": "a1"}], points=[{"x": 0, "y": 0.5, "label": "K = 1"}],
   checks=[{"type": "point", "expr": "10^x/(1+10^x)", "x": 0, "y": 0.5, "name": "K = 1: half converted"}, {"type": "value", "expr": "10^x/(1+10^x)", "x": 3, "between": [0.998, 0.9995], "name": "K = 1000: 99.9% converted"}])

mk("u08-06", "chem-q-vs-k", "graph", "Comparing Q with K",
   "The reaction quotient Q has the same form as K but uses the current concentrations. ΔG = RT ln(Q/K): if Q < K, ΔG is negative and the reaction moves forward; if Q > K it moves back; at Q = K it is at equilibrium. Here K = 100.",
   "ΔG against log Q at 298 K for K = 100: a straight line crossing zero at log Q = 2.",
   ["Left of log Q = 2 (Q < K): ΔG negative, forward reaction.", "At Q = K: ΔG = 0, equilibrium.", "Right (Q > K): ΔG positive, reverse reaction."],
   range={"x": [-1, 5], "y": [-20, 20]}, ticks=[[0, 1, 2, 3, 4], [-15, 0, 15]], grid=[1, 5], axisLabels=["log₁₀ Q", "ΔG / kJ mol⁻¹"], xLabelBelow=True,
   curves=[{"expr": f"{rt * math.log(10):.5f}*(x-2)", "colour": "a1"}], bands=[{"x": [-1, 2], "label": "Q < K: forward", "colour": "good"}, {"x": [2, 5], "label": "Q > K: reverse", "colour": "bad"}],
   points=[{"x": 2, "y": 0, "label": "Q = K"}], checks=[{"type": "point", "expr": f"{rt * math.log(10):.5f}*(x-2)", "x": 2, "y": 0, "name": "ΔG = 0 when Q = K = 100"}])

def lc(add):
    return add
mk("u08-07", "chem-le-chatelier-conc", "graph", "Adding a reactant",
   "A ⇌ B at equilibrium, Kc = 1.5. At 5 s extra A is added: [A] jumps from 0.4 to 0.8. The system responds by converting some A to B until [B]/[A] is 1.5 again, now at [A] = 0.56 and [B] = 0.84.",
   "Concentration against time: steady [A] = 0.4 and [B] = 0.6; at 5 s [A] jumps to 0.8, then falls to 0.56 while [B] rises to 0.84.",
   ["Before 5 s: equilibrium, [A] 0.4, [B] 0.6.", "At 5 s: [A] jumps to 0.8.", "After: [A] falls to 0.56 and [B] rises to 0.84; the ratio returns to 1.5."],
   range={"x": [0, 20], "y": [0, 1]}, ticks=[[5, 10, 15, 20], [0.2, 0.4, 0.6, 0.8]], grid=[5, 0.2], axisLabels=["time / s", "concentration / mol dm⁻³"], xLabelBelow=True,
   curves=[{"expr": "0.4", "domain": [0, 5], "colour": "a1"}, {"expr": "0.56+0.24*exp(-0.6*(x-5))", "domain": [5, 20], "colour": "a1", "label": "[A]", "labelAt": [18, 0.5]},
           {"expr": "0.6", "domain": [0, 5], "colour": "a2"}, {"expr": "0.84-0.24*exp(-0.6*(x-5))", "domain": [5, 20], "colour": "a2", "label": "[B]", "labelAt": [18, 0.9]}],
   marks=[{"x": 5, "label": "A added", "to": 0.85}],
   checks=[{"type": "value", "expr": "(0.84-0.24*exp(-0.6*(x-5)))/(0.56+0.24*exp(-0.6*(x-5)))", "x": 60, "between": [1.499, 1.501], "name": "the new equilibrium has the same Kc = 1.5"},
           {"type": "value", "expr": "0.56+0.24*exp(-0.6*(x-5))+0.84-0.24*exp(-0.6*(x-5))", "x": 7, "between": [1.3999, 1.4001], "name": "A + B is conserved after the addition (0.8 + 0.6 = 1.4)"}])

hx, hn = 92400 / R, 57200 / R
mk("u08-08", "chem-k-temperature", "graph", "How K changes with temperature",
   "Raising the temperature favours the endothermic direction. For the exothermic Haber process (ΔH = −92 kJ mol⁻¹) K falls as T rises; for the endothermic N₂O₄ ⇌ 2NO₂ (ΔH = +57 kJ mol⁻¹) K rises. Shown as ln(K/K₂₉₈) from the van 't Hoff equation.",
   "ln(K/K at 298 K) against temperature from 298 to 500 K: a falling curve for the exothermic reaction and a rising one for the endothermic reaction.",
   ["Both start at zero at 298 K.", "Exothermic (Haber): ln(K/K₂₉₈) falls to about −15 by 500 K.", "Endothermic (N₂O₄): rises to about +9."],
   range={"x": [298, 500], "y": [-18, 12]}, ticks=[[300, 350, 400, 450, 500], [-15, -10, -5, 0, 5, 10]], grid=[50, 5], axisLabels=["T / K", "ln(K / K₂₉₈)"], xLabelBelow=True,
   curves=[{"expr": f"{hx:.2f}*(1/x-1/298)", "colour": "a1", "label": "exothermic: N₂ + 3H₂ ⇌ 2NH₃", "labelAt": [330, -12]}, {"expr": f"-{hn:.2f}*(1/x-1/298)", "colour": "a3", "label": "endothermic: N₂O₄ ⇌ 2NO₂", "labelAt": [330, 8]}],
   checks=[{"type": "order", "a": f"{hx:.2f}*(1/x-1/298)", "b": "0", "x": 400, "rel": "<", "name": "exothermic: K at 400 K is smaller than at 298 K"}, {"type": "order", "a": f"-{hn:.2f}*(1/x-1/298)", "b": "0", "x": 400, "rel": ">", "name": "endothermic: K at 400 K is larger"}])

mk("u08-09", "chem-pressure-equilibrium", "particles", "Pressure and equilibrium",
   "N₂O₄ ⇌ 2NO₂. Squeezing the mixture into a smaller volume raises the pressure; the equilibrium shifts towards the side with fewer gas molecules, N₂O₄, partly relieving the change. The atoms are the same; only their grouping changes.",
   "Left: a box with N₂O₄ and NO₂ molecules. Right: the compressed mixture, now with more N₂O₄ and fewer NO₂.",
   ["Before: 2 N₂O₄ and 6 NO₂.", "After compression: 4 N₂O₄ and 2 NO₂, fewer molecules overall (6 against 8)."],
   species={"N2O4": {"atoms": ["N", "N", "O", "O", "O", "O"], "shape": "dimer"}, "NO2": {"atoms": ["N", "O", "O"], "shape": "bent"}}, steps=["pressure raised"],
   panels=[{"title": "lower pressure", "arrangement": "gas", "contents": [["N2O4", 2], ["NO2", 6]]}, {"title": "higher pressure", "arrangement": "gas", "contents": [["N2O4", 4], ["NO2", 2]]}],
   claims=[{"type": "conserved", "panels": [0, 1]}, {"type": "count", "panel": 1, "species": "N2O4", "n": 4}])

mk("u08-10", "chem-conc-change", "graph", "Removing a product",
   "A ⇌ B at equilibrium, Kc = 1.5. At 5 s some B is removed: [B] drops from 0.6 to 0.2. The system makes more B from A until the ratio is 1.5 again, at [A] = 0.24 and [B] = 0.36. This is why removing a product drives a reaction on.",
   "Concentration against time: steady, then [B] drops at 5 s and recovers partway while [A] falls.",
   ["Before 5 s: [A] 0.4, [B] 0.6.", "At 5 s: [B] drops to 0.2.", "After: [B] rises to 0.36, [A] falls to 0.24."],
   range={"x": [0, 20], "y": [0, 0.8]}, ticks=[[5, 10, 15, 20], [0.2, 0.4, 0.6]], grid=[5, 0.2], axisLabels=["time / s", "concentration / mol dm⁻³"], xLabelBelow=True,
   curves=[{"expr": "0.4", "domain": [0, 5], "colour": "a1"}, {"expr": "0.24+0.16*exp(-0.6*(x-5))", "domain": [5, 20], "colour": "a1", "label": "[A]", "labelAt": [18, 0.19]},
           {"expr": "0.6", "domain": [0, 5], "colour": "a2"}, {"expr": "0.36-0.16*exp(-0.6*(x-5))", "domain": [5, 20], "colour": "a2", "label": "[B]", "labelAt": [18, 0.41]}],
   marks=[{"x": 5, "label": "B removed", "to": 0.7}],
   checks=[{"type": "value", "expr": "(0.36-0.16*exp(-0.6*(x-5)))/(0.24+0.16*exp(-0.6*(x-5)))", "x": 60, "between": [1.499, 1.501], "name": "the new equilibrium has the same Kc = 1.5"}])

mk("u08-15", "chem-dg-lnk", "graph", "ΔG° and K",
   "ΔG° = −RT ln K. At 298 K, every 5.7 kJ mol⁻¹ more negative multiplies K by 10. A negative ΔG° means K > 1 (products favoured); a positive ΔG° means K < 1.",
   "log₁₀ K against ΔG° at 298 K: a straight line falling through 0 at ΔG° = 0, gradient −1/5.71.",
   ["ΔG° = 0: K = 1.", "ΔG° = −5.71 kJ mol⁻¹: K = 10.", "ΔG° = +5.71: K = 0.1."],
   range={"x": [-30, 30], "y": [-6, 6]}, ticks=[[-30, -20, -10, 0, 10, 20, 30], [-4, -2, 0, 2, 4]], grid=[10, 2], axisLabels=["ΔG° / kJ mol⁻¹", "log₁₀ K"], xLabelBelow=True,
   curves=[{"expr": f"-x/{rt * math.log(10):.5f}", "colour": "a1"}], points=[{"x": round(-rt * math.log(10), 4), "y": 1, "label": "K = 10"}],
   checks=[{"type": "point", "expr": f"-x/{rt * math.log(10):.5f}", "x": round(-rt * math.log(10), 4), "y": 1, "name": "ΔG° = −2.303RT = −5.71 kJ mol⁻¹ gives K = 10"}])
