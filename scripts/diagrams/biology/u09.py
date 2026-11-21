"""Biology unit 9, Microbiology: diagram specs. Run: python3 scripts/diagrams/biology/u09.py"""
from spec import mk

chain = lambda prefix, n: [{"from": f"{prefix}{i}", "to": f"{prefix}{i + 1}"} for i in range(n - 1)]

# ---------------------------------------------------------------- the bacterial growth curve, on a log axis
# generation time 20 minutes: log10 of the count rises by log10(2) every third of an hour
SL = "0.30103*3"
LAG, LOG, STAT, DEATH = "3", "3+0.90309*(x-1)", "7.5155", "7.5155-0.4*(x-10)"
mk("u09-04", "bio-growth-curve", "graph", "The bacterial growth curve",
   "Plotted as log₁₀ of the number of living cells, exponential growth is a straight line: with a 20-minute generation time the count doubles three times an hour (log₁₀ 2 = 0.301 per generation). A lag phase comes first, then the log phase, a stationary phase when growth equals death, and a death phase.",
   "A curve of log of viable cell count against time in hours: flat for the first hour (lag), a straight rising line from 1 to 6 hours (log phase), flat from 6 to 10 hours (stationary) and falling afterwards (death).",
   ["Lag phase, the first hour: the cells adjust and make enzymes, with little division.", "Log phase: the count doubles every generation (20 minutes here), a straight line on a log scale: gradient 0.903 per hour.",
    "Stationary phase: growth equals death as nutrients run out and wastes build up.", "Death phase: more cells die than divide.", "After n generations the population is the starting number × 2ⁿ: ten generations multiply it 1,024-fold."],
   range={"x": [0, 14], "y": [2, 8.5]}, ticks=[[0, 2, 4, 6, 8, 10, 12, 14], [3, 4, 5, 6, 7, 8]], height=[340, 320], xLabelBelow=True,
   axisLabels=["time / hours", "log₁₀ of living cells per mL"],
   bands=[{"x": [0, 1], "label": "lag", "colour": "a1"}, {"x": [1, 6], "label": "log phase", "colour": "a4"}, {"x": [6, 10], "label": "stationary", "colour": "a5"}, {"x": [10, 14], "label": "death", "colour": "a2"}],
   curves=[{"expr": LAG, "domain": [0, 1], "colour": "a1"}, {"expr": LOG, "domain": [1, 6], "colour": "a4"}, {"expr": STAT, "domain": [6, 10], "colour": "a5"}, {"expr": DEATH, "domain": [10, 14], "colour": "a2"}],
   checks=[{"type": "point", "expr": LAG, "x": 0.5, "y": 3, "name": "lag phase: no change in the count"},
           {"type": "slope", "expr": LOG, "x": 3, "value": 0.90309, "name": "log phase: a straight line of gradient 0.903 per hour, which is three doublings an hour (3 × log₁₀ 2)"},
           {"type": "point", "expr": LOG, "x": 1.3333333, "y": 3.30103, "name": "one generation (20 minutes) later the count has doubled: log₁₀ rises by 0.301"},
           {"type": "point", "expr": LOG, "x": 4.3333333, "y": 6.0103, "name": "after ten generations the count is 1,024 times larger: log₁₀ rises by 3.01"},
           {"type": "point", "expr": STAT, "x": 8, "y": 7.5155, "name": "stationary phase: the count stops changing"},
           {"type": "value", "expr": LOG, "x": 6, "between": [7.51, 7.52], "name": "the log phase ends where the stationary phase begins"},
           {"type": "value", "expr": DEATH, "x": 14, "between": [5.9, 5.92], "name": "death phase: the count falls"}])

# ---------------------------------------------------------------- how a virus replicates, and lytic or lysogenic
VR = [("attachment", "viral proteins bind specific host receptors", "a1"), ("entry", "fusion, endocytosis or injection of the genome", "a4"), ("replication", "the genome is copied and proteins made by host machinery", "a5"),
      ("assembly", "new virus particles are put together", "a3"), ("release", "by lysis (bursting) or budding", "a2")]
mk("u09-09", "bio-viral-replication", "flow", "How a virus replicates",
   "A virus can only replicate inside a host cell. It attaches to specific receptors, gets its genome in, uses the host's machinery to copy its genome and make its proteins, assembles new particles, and leaves by bursting the cell (lysis) or by budding.",
   "Five boxes in order: attachment, entry, replication, assembly and release.",
   [f"{a[0].upper() + a[1:]}: {b}." for a, b, _ in VR],
   layout="grid", boxWidth=122, rowHeight=124, nodes=[{"id": f"v{i}", "label": a, "sub": b, "tone": t, "col": i % 3 if i < 3 else 4 - i, "row": i // 3} for i, (a, b, t) in enumerate(VR)], edges=chain("v", 5))
mk("u09-09", "bio-lytic-lysogenic", "decision-tree", "Lytic or lysogenic?",
   "In the lytic cycle the virus replicates at once and the cell bursts. In the lysogenic cycle the viral DNA joins the host chromosome as a prophage and is copied with it, hiding for generations until something triggers the lytic cycle.",
   "A flow chart: if the viral DNA does not integrate into the host chromosome, the cycle is lytic and the cell bursts; if it integrates as a prophage, the cycle is lysogenic, and may later become lytic.",
   ["Does the viral genome integrate into the host chromosome? If not, it replicates immediately and the cell bursts: the lytic cycle.",
    "If it does, it is a prophage: it is copied with the host DNA every time the cell divides, and later may switch to the lytic cycle: the lysogenic cycle."],
   start="q1", nodes={
       "q1": {"q": "Does the viral genome integrate into the host chromosome?", "yes": "lyso", "no": "lytic"},
       "lyso": {"outcome": "Lysogenic: the genome is a prophage, copied with the host DNA, and later may become lytic", "tone": "warn"},
       "lytic": {"outcome": "Lytic: the virus replicates immediately and the cell bursts", "tone": "bad"}})

# ---------------------------------------------------------------- antibiotic resistance spreads by selection
RES = [("a mixed population", "a few cells already resistant, by mutation or a gene acquired from another bacterium", "a1"), ("antibiotic treatment", "kills the susceptible cells", "a3"),
       ("resistant cells survive", "and divide with less competition", "a4"), ("a resistant population", "resistance genes may also pass to other bacteria by horizontal transfer", "a2")]
mk("u09-22", "bio-resistance-selection", "flow", "How antibiotic resistance spreads",
   "Antibiotics do not cause resistance; they select for it. A few resistant cells survive the treatment, divide, and become most of the population, and resistance genes can then spread to other bacteria by horizontal gene transfer. Stewardship slows this by limiting unnecessary use.",
   "Four boxes in order: a mixed population with a few resistant cells, antibiotic treatment killing the susceptible ones, the resistant cells surviving, and a resistant population.",
   [f"{a[0].upper() + a[1:]}: {b}." for a, b, _ in RES],
   also=("u06-23",), layout="line", nodes=[{"id": f"r{i}", "label": a, "sub": b, "tone": t} for i, (a, b, t) in enumerate(RES)], edges=chain("r", 4))

# ---------------------------------------------------------------- R0 and herd immunity
HI = "1-1/x"
mk("u09-19", "bio-herd-immunity", "graph", "How much immunity stops an outbreak?",
   "If one case infects R₀ others in a fully susceptible population, an outbreak declines once the immune fraction is above 1 − 1/R₀, because each case then infects fewer than one other (R below 1). Measles, with R₀ of about 12–18, needs more than about 92–94% immunity, which is why very high vaccine coverage is needed.",
   "A curve of the immune fraction needed against R0, rising steeply and levelling towards 1: 0.5 at R0 of 2, 0.75 at 4, and about 0.92 to 0.94 for measles at R0 of 12 to 18.",
   ["The fraction immune needed to stop an outbreak is 1 − 1/R₀.", "R₀ = 2: half the population must be immune.", "R₀ = 4: three quarters.",
    "Measles, R₀ about 12–18: about 92% to 94%.", "Above that fraction each case infects fewer than one other person, so the outbreak declines."],
   also=("u10-20",), range={"x": [1, 20], "y": [0, 1.08]}, ticks=[[2, 4, 8, 12, 16, 20], [0.25, 0.5, 0.75, 1.0]], height=[340, 320], xLabelBelow=True,
   axisLabels=["R₀, new cases per case when everyone is susceptible", "fraction immune needed"],
   bands=[{"x": [12, 18], "label": "measles", "colour": "a2"}],
   curves=[{"expr": HI, "colour": "a1"}],
   checks=[{"type": "point", "expr": HI, "x": 2, "y": 0.5, "name": "R₀ = 2: half of the population must be immune"}, {"type": "point", "expr": HI, "x": 4, "y": 0.75, "name": "R₀ = 4: three quarters must be immune"},
           {"type": "value", "expr": HI, "x": 12, "between": [0.91, 0.92], "name": "measles at R₀ = 12: about 92% must be immune"}, {"type": "value", "expr": HI, "x": 18, "between": [0.94, 0.95], "name": "measles at R₀ = 18: about 94% must be immune"}])
