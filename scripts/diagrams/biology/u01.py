"""Biology unit 1, Foundations of Biology: diagram specs. Run: python3 scripts/diagrams/biology/u01.py"""
from spec import mk

def snake(i, n):
    """column for the i-th box when rows run alternately left to right and right to left"""
    return i % n if (i // n) % 2 == 0 else n - 1 - i % n

LEVELS = [("atoms and molecules", "C, H, O, N; proteins, DNA"), ("organelles", "mitochondria"), ("cells", "smallest living unit"),
          ("tissues", "muscle tissue"), ("organs", "the heart"), ("organ systems", "circulatory system"), ("organisms", "one living thing"),
          ("populations", "one species in an area"), ("communities", "all the populations"), ("ecosystems", "community + non-living"),
          ("biosphere", "all ecosystems on Earth")]
mk("u01-03", "bio-levels-of-organisation", "flow", "Levels of biological organisation",
   "Each level is built from the one before it, from molecules to the whole biosphere. New properties emerge at each step: one heart muscle cell contracts, but only the organised tissue of the heart pumps blood.",
   "A chain of eleven boxes from atoms and molecules, through organelles, cells, tissues, organs, organ systems and organisms, to populations, communities, ecosystems and the biosphere.",
   [f"{a[0].capitalize()}: {a[1]}." for a in LEVELS],
   also=("u02-30",),
   layout="grid", boxWidth=118, rowHeight=118,
   nodes=[{"id": f"l{i}", "label": a, "sub": b, "col": snake(i, 4), "row": i // 4, "tone": "a1" if i < 7 else "a4"} for i, (a, b) in enumerate(LEVELS)],
   edges=[{"from": f"l{i}", "to": f"l{i + 1}"} for i in range(len(LEVELS) - 1)])

RANKS = [("domain", "Eukarya"), ("kingdom", "Animalia"), ("phylum", "Chordata"), ("class", "Mammalia"), ("order", "Primates"),
         ("family", "Hominidae"), ("genus", "Homo"), ("species", "Homo sapiens")]
mk("u01-05", "bio-taxonomic-ranks", "flow", "The ranks of classification, for humans",
   "Each rank sits inside the one before it, from the broadest (domain) to the narrowest (species). The scientific name is the last two: the genus and the specific epithet, Homo sapiens.",
   "Eight boxes in order: domain Eukarya, kingdom Animalia, phylum Chordata, class Mammalia, order Primates, family Hominidae, genus Homo, species Homo sapiens.",
   [f"{r.capitalize()}: {n}." for r, n in RANKS] + ["The binomial name is genus plus specific epithet: Homo sapiens."],
   layout="grid", boxWidth=130, rowHeight=104,
   nodes=[{"id": r, "label": r, "sub": n, "col": snake(i, 4), "row": i // 4, "tone": "a5" if i >= 6 else "a1"} for i, (r, n) in enumerate(RANKS)],
   edges=[{"from": RANKS[i][0], "to": RANKS[i + 1][0]} for i in range(len(RANKS) - 1)])

STEPS = [("observation", "something needs explaining"), ("hypothesis", "a testable explanation"), ("prediction", "what should happen if it is right"),
         ("experiment", "controlled data collection"), ("analysis and conclusion", "supported or refuted?"), ("communication", "peer review, repeats")]
mk("u01-08", "bio-scientific-method", "flow", "The scientific method is a cycle",
   "Results feed back into new observations and questions, so investigation is a cycle rather than a straight line. Evidence can support a hypothesis but never prove it; one well-replicated contradictory result can refute it.",
   "Six boxes in a loop: observation, hypothesis, prediction, experiment, analysis and conclusion, communication, and back to observation.",
   [f"{a.capitalize()}: {b}." for a, b in STEPS] + ["Communication leads to new observations, closing the loop."],
   also=("u14-01", "u14-02"),
   layout="cycle", radius=130,
   nodes=[{"id": f"s{i}", "label": a, "sub": b, "tone": "a1"} for i, (a, b) in enumerate(STEPS)],
   edges=[{"from": f"s{i}", "to": f"s{(i + 1) % len(STEPS)}"} for i in range(len(STEPS))])

# four students measure the same 50.0 µm stage-micrometer interval five times; the points and the checks share the data
DATA = [("A", [50.1, 49.9, 50.0, 50.2, 49.9], "a4", True, True), ("B", [52.4, 52.6, 52.5, 52.3, 52.5], "a1", False, True),
        ("C", [48.6, 51.5, 49.2, 51.0, 50.1], "a3", True, False), ("D", [53.8, 50.6, 55.0, 51.9, 54.4], "a2", False, False)]
pts, checks = [], []
for i, (who, vs, c, acc, prec) in enumerate(DATA):
    for j, v in enumerate(vs):
        pts.append({"x": i + 1 + (j - 2) * 0.08, "y": v, "colour": c})
    checks.append({"type": "stats", "values": vs, "truth": 50.0, "tolMean": 0.5, "tolSd": 0.3, "accurate": acc, "precise": prec,
                   "name": f"student {who}: {'accurate' if acc else 'not accurate'} and {'precise' if prec else 'not precise'}"})
mk("u01-12", "bio-accuracy-precision", "graph", "Accurate, precise, both or neither",
   "Four students each measure the same 50.0 µm interval five times. A and C are accurate (their means are close to 50.0); A and B are precise (their repeats agree). B's tight cluster sits too high, the mark of a systematic error such as an uncalibrated graticule.",
   "Dot plot of five repeat measurements by each of four students against a dashed true value of 50.0 micrometres.",
   ["A: values 49.9 to 50.2, mean 50.0: accurate and precise.", "B: values 52.3 to 52.6, mean 52.5: precise but not accurate (systematic error).",
    "C: values 48.6 to 51.5, mean 50.1: accurate on average but not precise (random error).", "D: values 50.6 to 55.0, mean 53.1: neither."],
   range={"x": [0.4, 4.6], "y": [47, 56]}, ticks=[[], [48, 50, 52, 54, 56]], height=[340, 320], xLabelBelow=True,
   axisLabels=["student A, B, C, D", "measured length / µm (dashed: true value 50.0)"], points=pts, marks=[{"y": 50.0}],
   checks=checks)

SIZES = [("protein", 0.01), ("virus", 0.1), ("E. coli", 2), ("red cell", 8), ("leaf cell", 60), ("egg", 120)]
mk("u01-14", "bio-scale-of-life", "trend", "The scale of life, on a logarithmic axis",
   "Each step up the axis is ten times larger. A large protein (about 10 nm) and a virus (about 100 nm) are below the 0.2 µm limit of a light microscope; bacteria (1–5 µm) and eukaryotic cells (10–100 µm) can be seen with one.",
   "Bar chart on a logarithmic scale in micrometres: protein 0.01, virus 0.1, bacterium 2, red blood cell 8, plant cell 60, human egg 120.",
   ["A large protein such as an antibody, about 0.01 µm (10 nm).", "Virus (influenza), about 0.1 µm (100 nm).", "Bacterium (E. coli), about 2 µm.",
    "Red blood cell, about 8 µm.", "Plant leaf cell, about 60 µm.", "Human egg cell, about 120 µm, just visible to the eye."],
   also=("u09-26", "u14-05"),
   kind="bars", log=True, range=[0.001, 1000], ticks=[0.001, 0.01, 0.1, 1, 10, 100, 1000], yLabel="typical size / µm (log scale)",
   items=[{"key": k, "value": v} for k, v in SIZES], highlight={"protein": "a5", "virus": "a5"},
   claims=[{"type": "increasing"}])

mk("u01-17", "bio-which-graph", "decision-tree", "Which graph should you draw?",
   "Two questions about the variables choose the graph. A categoric independent variable gives a bar chart; one continuous variable counted in classes gives a histogram; two measured variables with nothing controlled give a scatter graph.",
   "A flow chart of questions leading to a bar chart, a histogram, a scatter graph or a line graph.",
   ["Is the independent variable continuous? If not, draw a bar chart.", "Are two different variables plotted against each other? If not, draw a histogram of the frequency of one variable.",
    "Did you set the independent variable yourself? If not, draw a scatter graph to look for a correlation.", "Otherwise draw a line graph."],
   start="q1", nodes={
       "q1": {"q": "Is the independent variable continuous, measured on a number scale?", "yes": "q2", "no": "bar"},
       "bar": {"outcome": "Bar chart: the independent variable is categoric (blood group, species)", "tone": "neutral"},
       "q2": {"q": "Are you plotting two different variables against each other?", "yes": "q3", "no": "hist"},
       "hist": {"outcome": "Histogram: the frequency of one continuous variable in classes, bars touching", "tone": "neutral"},
       "q3": {"q": "Did you set the independent variable yourself, in an experiment?", "yes": "line", "no": "scatter"},
       "scatter": {"outcome": "Scatter graph: look for a correlation between two measured variables", "tone": "neutral"},
       "line": {"outcome": "Line graph: independent variable on the x-axis, dependent on the y-axis", "tone": "good"}})

PDF = "exp(-(x-163)^2/98)/(7*sqrt(2*3.14159265))"
mk("u01-18", "bio-normal-distribution", "graph", "The normal distribution",
   "Heights of adult women follow a bell-shaped curve, here with mean 163 cm and standard deviation 7 cm. About 68% of values lie within one standard deviation of the mean (156–170 cm) and about 95% within two (149–177 cm).",
   "A bell curve centred on 163 centimetres with the region from 156 to 170 shaded darker and 149 to 177 shaded lighter.",
   ["The horizontal axis is height in centimetres, from 135 to 191.", "The curve peaks at the mean, 163 cm, and is symmetrical.",
    "The darker band, 156 to 170 cm (mean ± 1 standard deviation), holds about 68% of the area.", "The lighter band, 149 to 177 cm (± 2 standard deviations), holds about 95%."],
   range={"x": [135, 191], "y": [0, 0.068]}, ticks=[[142, 149, 156, 163, 170, 177, 184], [0.02, 0.04, 0.06]], height=[340, 320], xLabelBelow=True,
   axisLabels=["height / cm", "probability density"],
   areas=[{"expr": PDF, "from": 149, "to": 177, "colour": "a1", "opacity": 0.14}, {"expr": PDF, "from": 156, "to": 170, "colour": "a1", "opacity": 0.26}],
   curves=[{"expr": PDF, "colour": "a1"}],
   marks=[{"x": 163, "to": 0.057, "label": "mean"}],
   checks=[{"type": "area", "expr": PDF, "from": 156, "to": 170, "value": 0.6827, "tol": 0.002, "name": "about 68% of values lie within one standard deviation"},
           {"type": "area", "expr": PDF, "from": 149, "to": 177, "value": 0.9545, "tol": 0.002, "name": "about 95% lie within two standard deviations"},
           {"type": "area", "expr": PDF, "from": 100, "to": 226, "value": 1, "tol": 0.001, "name": "the whole curve has area 1"},
           {"type": "max", "expr": PDF, "domain": [135, 191], "x": 163, "y": 0.05699, "name": "the peak is at the mean, 163 cm"}])
