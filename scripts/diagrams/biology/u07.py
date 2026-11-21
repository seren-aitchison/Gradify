"""Biology unit 7, Human body systems: diagram specs. Run: python3 scripts/diagrams/biology/u07.py"""
from spec import mk

chain = lambda prefix, n: [{"from": f"{prefix}{i}", "to": f"{prefix}{i + 1}"} for i in range(n - 1)]

# ---------------------------------------------------------------- negative feedback
FB = [("change", "a controlled variable moves away from its set point"), ("receptor", "detects the change"), ("coordinator", "such as the brain, processes the information"),
      ("effector", "carries out a response, such as a gland or muscle"), ("set point restored", "the response reverses the change")]
mk("u07-02", "bio-negative-feedback", "flow", "A negative feedback loop",
   "A receptor detects a change in a controlled variable, a coordinator processes the information and an effector makes a response that reverses the change, returning the variable towards its set point. Rising blood glucose triggering insulin release is an example; positive feedback, which amplifies a change, is rarer.",
   "Five boxes in order: a change in the variable, the receptor, the coordinator, the effector and the restored set point.",
   [f"{a[0].upper() + a[1:]}: {b}." for a, b in FB] + ["Example: blood glucose rises, the pancreas releases insulin, and glucose falls back to the set point."],
   layout="grid", boxWidth=118, rowHeight=118,
   nodes=[{"id": f"f{i}", "label": a, "sub": b, "tone": ["a3", "a1", "a5", "a4", "a2"][i], "col": i % 3 if i < 3 else 4 - i, "row": i // 3} for i, (a, b) in enumerate(FB)], edges=chain("f", 5))

mk("u07-33", "bio-thermoregulation", "decision-tree", "Keeping core temperature near 37 °C",
   "The hypothalamus compares blood temperature with the set point. If it is too high, sweating and vasodilation lose heat; if too low, shivering, vasoconstriction and a higher metabolic rate save and make heat. Two opposite responses give finer control.",
   "A flow chart: temperature at the set point needs no response; above it leads to sweating, vasodilation and flattened hairs; below it leads to shivering, vasoconstriction, raised hairs and increased metabolism.",
   ["The hypothalamus monitors blood temperature and input from skin receptors.", "At the set point, about 37 °C, no response is needed.",
    "Too hot: sweating, vasodilation of skin arterioles and hairs lying flat, so more heat is lost.", "Too cold: shivering, vasoconstriction, hairs raised and increased metabolism, so heat is kept and made."],
   start="q1", nodes={
       "q1": {"q": "Is core temperature different from the set point, about 37 °C?", "yes": "q2", "no": "ok"},
       "ok": {"outcome": "No response needed: temperature is at the set point", "tone": "good"},
       "q2": {"q": "Is it above the set point?", "yes": "hot", "no": "cold"},
       "hot": {"outcome": "Too hot: sweating, vasodilation of skin arterioles, hairs lie flat", "tone": "warn"},
       "cold": {"outcome": "Too cold: shivering, vasoconstriction, hairs raised, more metabolism", "tone": "bad"}})

# ---------------------------------------------------------------- action potential
RISE, DEP, REP, REC = "-70+15*(x-1)/0.5", "-55+95*sin(1.5708*(x-1.5)/0.5)", "40-120*sin(1.5708*(x-2)/1)", "-70-10*cos(1.5708*(x-3)/1.5)"
mk("u07-05", "bio-action-potential", "graph", "An action potential",
   "From a resting potential of about −70 mV, a stimulus that reaches the threshold (about −55 mV) opens voltage-gated Na⁺ channels: depolarisation to about +40 mV. Then Na⁺ channels close and K⁺ channels open (repolarisation), the potential briefly undershoots below −70 mV (hyperpolarisation), and the resting potential is restored. The time axis is schematic.",
   "A trace of membrane potential with its phases labelled depolarisation, repolarisation and hyperpolarisation: flat at -70 millivolts, a stimulus rising to the -55 millivolt threshold, a sharp rise to +40, a fall to about -80 below the resting level, and a return to -70.",
   ["Resting: about −70 mV, inside negative.", "A stimulus raises the potential to the threshold, about −55 mV.", "Depolarisation: Na⁺ floods in and the potential rises to about +40 mV.",
    "Repolarisation: Na⁺ channels close, K⁺ channels open and K⁺ leaves.", "Hyperpolarisation: the potential briefly falls below −70 mV.", "The resting potential is restored."],
   range={"x": [0, 6], "y": [-100, 60]}, ticks=[[], [-70, -55, 0, 40]], height=[340, 320], xLabelBelow=True,
   axisLabels=["time (schematic)", "membrane potential / mV"],
   bands=[{"x": [1.5, 2], "label": "depol.", "colour": "a2"}, {"x": [2, 3], "label": "repol.", "colour": "a4"}, {"x": [3, 4.5], "label": "hyperpol.", "colour": "a5"}],
   curves=[{"expr": "-70", "domain": [0, 1], "colour": "a1"}, {"expr": RISE, "domain": [1, 1.5], "colour": "a1"}, {"expr": DEP, "domain": [1.5, 2], "colour": "a2"},
           {"expr": REP, "domain": [2, 3], "colour": "a4"}, {"expr": REC, "domain": [3, 4.5], "colour": "a5"}, {"expr": "-70", "domain": [4.5, 6], "colour": "a1"}],
   marks=[{"y": -55, "label": "threshold"}],
   checks=[{"type": "point", "expr": "-70", "x": 0.5, "y": -70, "name": "resting potential: −70 mV"}, {"type": "point", "expr": RISE, "x": 1.5, "y": -55, "name": "the stimulus brings the membrane to the threshold, −55 mV"},
           {"type": "point", "expr": DEP, "x": 2, "y": 40, "name": "depolarisation reaches about +40 mV"}, {"type": "max", "expr": DEP, "domain": [1.5, 2], "x": 2, "y": 40, "name": "the peak is the top of the action potential"},
           {"type": "point", "expr": REP, "x": 3, "y": -80, "name": "hyperpolarisation: the potential falls below the resting level (−80 mV)"}, {"type": "point", "expr": REC, "x": 4.5, "y": -70, "name": "the resting potential is restored"}])

# ---------------------------------------------------------------- sliding filaments
mk("u07-29", "bio-sarcomere", "sarcomere", "The sarcomere shortens, the filaments do not",
   "In contraction the myosin heads pull the actin filaments towards the middle. The Z lines move closer, the I band and H zone shrink and may vanish, but the A band, which is the length of the myosin filament, stays the same: the filaments slide past each other and keep their length.",
   "Two sarcomeres drawn to scale, relaxed at 2.4 micrometres and contracted at 1.8: the thin actin filaments from each Z line slide inwards over the central thick myosin filament; the A band stays 1.6 micrometres while the I band falls from 0.8 to 0.2 and the H zone from 0.4 to nothing.",
   ["Relaxed: sarcomere 2.4 µm; A band 1.6 µm, I band 0.8 µm, H zone 0.4 µm.", "Contracted: sarcomere 1.8 µm; A band still 1.6 µm, I band 0.2 µm, H zone gone.",
    "Myosin heads form cross-bridges with actin and pivot, pulling the thin filaments inwards.", "The sarcomere shortens by 0.6 µm but no filament changes length."],
   thick=1.6, thin=1.0, states=[{"label": "relaxed", "L": 2.4}, {"label": "contracted", "L": 1.8}], claims=[{"type": "shortening", "value": 0.6}])

# ---------------------------------------------------------------- the menstrual cycle
FSH = "0.25+0.55*exp(-(x-3)^2/(2*2.2^2))+0.3*exp(-(x-14)^2/(2*0.9^2))"
LH = "0.12+0.9*exp(-(x-14)^2/(2*0.9^2))"
OES = "0.12+0.7*exp(-(x-12.8)^2/(2*2^2))+0.35*exp(-(x-21)^2/(2*3^2))"
PRO = "0.05+0.85*exp(-(x-21)^2/(2*3^2))"
mk("u07-31", "bio-menstrual-cycle", "graph", "The menstrual cycle: four hormones over 28 days",
   "FSH stimulates a follicle to mature and the follicle releases oestrogen. A surge of LH triggers ovulation around day 14. After ovulation progesterone maintains the lining of the uterus; if there is no pregnancy it falls and menstruation follows. Relative levels, drawn schematically.",
   "Four curves of relative hormone level over 28 days: FSH highest early with a small peak at day 14, oestrogen peaking just before day 14 and again later, a sharp LH surge at day 14, and progesterone peaking about day 21 and falling by day 28.",
   ["FSH rises early in the cycle and stimulates a follicle to mature.", "Oestrogen from the follicle rises to a peak just before the middle of the cycle.", "A surge of LH around day 14 triggers ovulation.",
    "Progesterone rises after ovulation, peaking in the second half, and maintains the uterus lining.", "If there is no pregnancy, progesterone falls by day 28 and menstruation occurs."],
   range={"x": [0, 28], "y": [0, 1.3]}, ticks=[[0, 7, 14, 21, 28], []], height=[340, 320], xLabelBelow=True, axisLabels=["day of the cycle", "hormone level"],
   curves=[{"expr": FSH, "colour": "a1"}, {"expr": LH, "colour": "a2"}, {"expr": OES, "colour": "a4"}, {"expr": PRO, "colour": "a3"}],
   marks=[{"x": 14, "to": 1.25, "label": "ovulation", "dx": 34}],
   legend=[["FSH", "a1"], ["LH", "a2"], ["oestrogen", "a4"], ["progesterone", "a3"]], legendData=[0.5, 1.28],
   checks=[{"type": "max", "expr": LH, "domain": [0, 28], "x": 14, "y": 1.02, "name": "the LH surge peaks at day 14, triggering ovulation"},
           {"type": "max", "expr": OES, "domain": [0, 14], "x": 12.845, "y": 0.829, "name": "oestrogen peaks just before ovulation"},
           {"type": "max", "expr": PRO, "domain": [14, 28], "x": 21, "y": 0.9, "name": "progesterone peaks in the second half of the cycle, after ovulation"},
           {"type": "value", "expr": PRO, "x": 28, "between": [0, 0.15], "name": "with no pregnancy, progesterone has fallen by day 28"},
           {"type": "value", "expr": PRO, "x": 5, "between": [0, 0.1], "name": "progesterone is low before ovulation"}])
