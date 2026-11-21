"""Biology unit 8, Plant biology: diagram specs. Run: python3 scripts/diagrams/biology/u08.py"""
from spec import mk

chain = lambda prefix, n: [{"from": f"{prefix}{i}", "to": f"{prefix}{i + 1}"} for i in range(n - 1)]
def snake(items, prefix, tones, per=3):
    return [{"id": f"{prefix}{i}", "label": a, "sub": b, "tone": tones[i % len(tones)], "col": i % per if (i // per) % 2 == 0 else per - 1 - i % per, "row": i // per} for i, (a, b, *_) in enumerate(items)]

# ---------------------------------------------------------------- photosynthesis in outline
PH = [("light and water", "light energy; H₂O from the roots", "a3"), ("light-dependent reactions", "thylakoid membranes: water split, O₂ released, ATP and NADPH made", "a1"),
      ("ATP and NADPH", "carry energy and hydrogen to the stroma", "a5"), ("Calvin cycle", "stroma: CO₂ fixed and reduced to triose phosphate", "a4"), ("glucose and other products", "sugars, starch, cellulose, amino acids, lipids", "a2")]
mk("u08-12", "bio-photosynthesis-outline", "flow", "Photosynthesis in two stages",
   "The light-dependent reactions in the thylakoid membranes split water, release oxygen and make ATP and NADPH. The Calvin cycle in the stroma uses them to fix CO₂ into sugars. Overall: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂.",
   "Five boxes in order: light and water, the light-dependent reactions, ATP and NADPH, the Calvin cycle, and glucose and other products.",
   [f"{a[0].upper() + a[1:]}: {b}." for a, b, _ in PH] + ["Overall: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂, using light energy."],
   layout="grid", boxWidth=122, rowHeight=130,
   nodes=[{"id": f"p{i}", "label": a, "sub": b, "tone": t, "col": i % 3 if i < 3 else 4 - i, "row": i // 3} for i, (a, b, t) in enumerate(PH)], edges=chain("p", 5),
   claims=[{"type": "equation", "eq": "6CO2 + 6H2O → C6H12O6 + 6O2"}])

# ---------------------------------------------------------------- the Calvin cycle, carbon counted
mk("u08-14", "bio-calvin-cycle", "carbonflow", "The Calvin cycle: counting the carbon",
   "Three turns fix three CO₂ (1 carbon each) onto three RuBP (5 carbons each), giving six GP (3 carbons each). The GP is reduced to six triose phosphate; five of them regenerate three RuBP and one leaves to make sugars. Carbon is conserved at every step: 18 in, 18 out, and one triose phosphate gained from three CO₂.",
   "A cycle of RuBP, GP and triose phosphate: RuBisCO fixes CO2 onto RuBP to give GP, GP is reduced to triose phosphate, and triose phosphate regenerates RuBP, with one triose phosphate in six leaving.",
   ["Fixation: 3 CO₂ + 3 RuBP (5C) become 6 GP (3C): 18 carbons in, 18 out.", "Reduction: 6 GP become 6 triose phosphate using ATP and NADPH: 18 carbons.",
    "Regeneration: 5 triose phosphate (15C) are rearranged into 3 RuBP (15C) using ATP.", "One triose phosphate (3C) leaves for each three CO₂ fixed; six turns make one glucose (6C)."],
   layout="line", notes=["One triose phosphate in six leaves the cycle to make sugars; six turns fix six CO₂ into one glucose."],
   nodes=[{"id": "rubp", "label": "RuBP", "sub": "5 carbons", "tone": "a1"}, {"id": "gp", "label": "GP", "sub": "3 carbons, made by fixing CO₂ (RuBisCO)", "tone": "a4"},
          {"id": "tp", "label": "triose phosphate", "sub": "3 carbons, made by reduction with ATP and NADPH", "tone": "a5"}, {"id": "rubp2", "label": "RuBP again", "sub": "5 carbons, regenerated using ATP", "tone": "a1"}],
   edges=[{"from": "rubp", "to": "gp"}, {"from": "gp", "to": "tp"}, {"from": "tp", "to": "rubp2"}],
   balance=[{"name": "fixation", "in": [[3, 1], [3, 5]], "out": [[6, 3]]}, {"name": "reduction", "in": [[6, 3]], "out": [[6, 3]]},
            {"name": "regeneration", "in": [[5, 3]], "out": [[3, 5]]}, {"name": "one turn of three CO₂ into one triose phosphate", "in": [[3, 1]], "out": [[1, 3]]},
            {"name": "six turns: six CO₂ into one glucose", "in": [[6, 1]], "out": [[1, 6]]}])

# ---------------------------------------------------------------- limiting factors
LOW, HIGH = "4*x*50/(4*x+50)", "4*x*100/(4*x+100)"
mk("u08-12", "bio-limiting-factors", "graph", "Light intensity as a limiting factor",
   "At low light intensity the rate rises in proportion to the light, whatever the CO₂ concentration or temperature: light is the limiting factor. At high intensity the curve levels off, and a higher CO₂ concentration (or temperature) lifts the plateau, because a different factor is now limiting.",
   "Two curves of photosynthesis rate against light intensity that rise together and then level off: a lower plateau at low CO2 and a higher plateau at high CO2.",
   ["At low light intensity both curves rise together: light is limiting.", "At high light intensity each curve levels off: another factor, such as CO₂ or temperature, is now limiting.",
    "With more CO₂ the plateau is higher (100 against 50).", "Glasshouses raise light, CO₂ and temperature to raise yields."],
   range={"x": [0, 200], "y": [0, 115]}, ticks=[[50, 100, 150, 200], [25, 50, 75, 100]], height=[340, 320], xLabelBelow=True,
   axisLabels=["light intensity (arbitrary units)", "rate of photosynthesis (arbitrary units)"],
   curves=[{"expr": HIGH, "colour": "a4"}, {"expr": LOW, "colour": "a3"}],
   legend=[["higher CO₂ or temperature", "a4"], ["lower CO₂ or temperature", "a3"]], legendData=[45, 28],
   checks=[{"type": "slope", "expr": LOW, "x": 0.001, "value": 4, "name": "at low light the lower curve rises in proportion to light: gradient 4"},
           {"type": "slope", "expr": HIGH, "x": 0.001, "value": 4, "name": "at low light the higher curve has the same gradient: light, not CO₂, is limiting"},
           {"type": "value", "expr": LOW, "x": 200, "between": [45, 50], "name": "the lower curve levels off near 50"}, {"type": "value", "expr": HIGH, "x": 200, "between": [85, 100], "name": "the higher curve levels off near 100"},
           {"type": "order", "a": HIGH, "b": LOW, "x": 150, "rel": ">", "name": "at high light, more CO₂ gives a higher rate: another factor was limiting"}])

# ---------------------------------------------------------------- C3, C4 or CAM
mk("u08-16", "bio-c3-c4-cam", "decision-tree", "C3, C4 or CAM?",
   "C3 plants fix CO₂ directly with RuBisCO. C4 and CAM plants first fix CO₂ into a four-carbon acid with PEP carboxylase, which does not bind oxygen, and release it near RuBisCO. C4 separates the steps in space (mesophyll and bundle sheath cells); CAM separates them in time (night and day).",
   "A flow chart: no four-carbon acid means C3; a four-carbon acid with steps in different cells means C4; with steps at different times means CAM.",
   ["Does the plant first fix CO₂ into a 4-carbon acid? If not, it is C3: RuBisCO fixes CO₂ directly.", "If so, are the steps in different cells, mesophyll and bundle sheath? If so, it is C4: separated in space, as in maize.",
    "If not, they are at different times: CAM, as in cacti. Stomata open at night and malate is stored; by day the stomata close and malate releases CO₂."],
   also=("u08-17",), start="q1", nodes={
       "q1": {"q": "Does the plant first fix CO₂ into a four-carbon acid (with PEP carboxylase)?", "yes": "q2", "no": "c3"},
       "c3": {"outcome": "C3: RuBisCO fixes CO₂ directly in the Calvin cycle", "tone": "neutral"},
       "q2": {"q": "Are the steps in different cells: mesophyll, then bundle sheath?", "yes": "c4", "no": "cam"},
       "c4": {"outcome": "C4: steps separated in space. Maize, sugarcane; good in hot, sunny, dry conditions", "tone": "good"},
       "cam": {"outcome": "CAM: steps separated in time. Stomata open at night: cacti, pineapples", "tone": "warn"}})

# ---------------------------------------------------------------- phototropism
TROP = [("light from one side", "a shoot is lit unevenly", "a3"), ("auxin moves to the shaded side", "made in the tip, transported sideways", "a1"),
        ("shaded cells elongate more", "auxin loosens their walls (acid growth)", "a4"), ("the shoot bends towards the light", "positive phototropism", "a2")]
mk("u08-25", "bio-phototropism", "flow", "How a shoot bends towards light",
   "Auxin made in the shoot tip moves to the shaded side. Cells there elongate more than on the lit side, so the shoot bends towards the light. In gravitropism auxin collects on the lower side, which bends a shoot up but, because high auxin inhibits root growth, bends a root down.",
   "Four boxes in order: light from one side, auxin moving to the shaded side, shaded cells elongating more, and the shoot bending towards the light.",
   [f"{a[0].upper() + a[1:]}: {b}." for a, b, _ in TROP],
   also=("u08-20",), layout="line", nodes=[{"id": f"t{i}", "label": a, "sub": b, "tone": t} for i, (a, b, t) in enumerate(TROP)], edges=chain("t", 4))

# ---------------------------------------------------------------- water through the plant
WAT = [("root hair", "water enters by osmosis down a water potential gradient", "a1"), ("root cortex", "apoplast (walls) and symplast (cytoplasm)", "a4"),
       ("endodermis", "the Casparian strip blocks the apoplast: water enters the symplast", "a5"), ("xylem", "water rises in a continuous column by cohesion and tension", "a1"),
       ("leaf", "water evaporates from the mesophyll walls", "a3"), ("air", "water vapour leaves through the stomata: transpiration", "a2")]
mk("u08-09", "bio-water-pathway", "flow", "The path of water through a plant",
   "Water enters the root hairs by osmosis and crosses the cortex by the apoplast and symplast pathways. At the endodermis the Casparian strip forces it into the symplast. In the xylem, transpiration creates tension and cohesion between water molecules pulls a continuous column upwards, until water leaves the leaf as vapour.",
   "Six boxes in order: root hair, root cortex, endodermis, xylem, leaf and air.",
   [f"{a[0].upper() + a[1:]}: {b}." for a, b, _ in WAT],
   layout="grid", boxWidth=122, rowHeight=130, nodes=snake(WAT, "w", ["a1", "a4", "a5", "a1", "a3", "a2"]), edges=chain("w", 6))
