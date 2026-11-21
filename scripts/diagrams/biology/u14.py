"""Biology unit 14, Research methods: diagram specs. Run: python3 scripts/diagrams/biology/u14.py"""
from spec import mk

chain = lambda prefix, n: [{"from": f"{prefix}{i}", "to": f"{prefix}{i + 1}"} for i in range(n - 1)]
grid = lambda items, prefix, tones, per=3: [{"id": f"{prefix}{i}", "label": a, "sub": b, "tone": tones[i % len(tones)], "col": i % per if (i // per) % 2 == 0 else per - 1 - i % per, "row": i // per} for i, (a, b, *_) in enumerate(items)]

# ---------------------------------------------------------------- Beer–Lambert and calibration curves
IDEAL, REAL = "0.15*x", "1.5*(1-exp(-0.1*x))"
mk("u14-14", "bio-beer-lambert", "graph", "Absorbance and concentration: the Beer–Lambert law",
   "A = εcl: for a fixed path length and wavelength, absorbance is proportional to concentration, so standards of known concentration give a straight calibration line from which an unknown can be read. At high concentrations the real curve flattens below the line, so samples must be diluted into the linear range. Idealised numbers.",
   "A dashed straight line of absorbance rising by 0.15 per concentration unit, and a solid curve that follows it at first and then flattens; an unknown absorbance of 0.6 is read off the straight line as a concentration of 4.",
   ["Absorbance is proportional to concentration over a working range: the straight line.", "Standards of known concentration make the calibration curve.", "An unknown with absorbance 0.6 has concentration 4 on this line.",
    "At high concentration the real curve falls below the line, so the relationship is no longer proportional: dilute the sample."],
   also=("u14-12",), range={"x": [0, 30], "y": [0, 1.8]}, ticks=[[5, 10, 15, 20, 25, 30], [0.5, 1.0, 1.5]], height=[340, 320], xLabelBelow=True,
   axisLabels=["concentration (arbitrary units)", "absorbance"],
   curves=[{"expr": IDEAL, "colour": "a1", "dash": "6 5", "domain": [0, 12]}, {"expr": REAL, "colour": "a2"}],
   legend=[["proportional (A = εcl)", "a1", "6 5"], ["real measurements", "a2"]], legendData=[13, 0.5], marks=[{"y": 0.6, "to": 4}, {"x": 4, "to": 0.6}],
   checks=[{"type": "slope", "expr": IDEAL, "x": 5, "value": 0.15, "name": "A = εcl: absorbance rises by the same amount for each unit of concentration (0.15)"},
           {"type": "slope", "expr": REAL, "x": 0.001, "value": 0.15, "name": "at low concentration the real curve has the same gradient: it is linear in the working range"},
           {"type": "point", "expr": IDEAL, "x": 4, "y": 0.6, "name": "an unknown with absorbance 0.6 has concentration 4 on the calibration line"},
           {"type": "value", "expr": REAL, "x": 4, "between": [0.48, 0.52], "name": "at concentration 4 the real curve is within about 15% of the line"},
           {"type": "value", "expr": REAL, "x": 28, "between": [1.3, 1.5], "name": "at high concentration the real absorbance (about 1.4) is far below the line's 4.2: dilute the sample"}])

# ---------------------------------------------------------------- chromatography
mk("u14-13", "bio-tlc-rf", "tlc", "Thin-layer chromatography and Rf values",
   "Components separate by how strongly they are held by the stationary phase and carried by the mobile phase. Rf is the distance a spot moved divided by the distance the solvent front moved, always between 0 and 1, and characteristic for a substance under stated conditions. Pigment values here are illustrative.",
   "A thin-layer plate with the origin at the bottom and a solvent front 80 millimetres above it, with three pigment spots at 72, 40 and 32 millimetres, giving Rf values of 0.90, 0.50 and 0.40.",
   ["The solvent front moved 80 mm.", "Carotene moved 72 mm: Rf = 72 ÷ 80 = 0.90.", "Chlorophyll a moved 40 mm: Rf = 0.50.", "Chlorophyll b moved 32 mm: Rf = 0.40.", "The Rf value depends on the solvent and the plate, so conditions must be stated."],
   origin=0, front=80, spots=[{"label": "carotene", "d": 72, "colour": "a3"}, {"label": "chlorophyll a", "d": 40, "colour": "good"}, {"label": "chlorophyll b", "d": 32, "colour": "a4"}],
   claims=[{"type": "rf", "spot": "carotene", "value": 0.9}, {"type": "rf", "spot": "chlorophyll a", "value": 0.5}, {"type": "rf", "spot": "chlorophyll b", "value": 0.4}])

# ---------------------------------------------------------------- which statistical test?
mk("u14-17", "bio-choosing-a-test", "decision-tree", "Choosing a statistical test",
   "Match the test to the data and the question. Counts in categories compared with expected counts: chi-squared. An association between two measured variables: correlation. Comparing group means: a t-test for two normally distributed groups, ANOVA for three or more, and Mann–Whitney U for two groups that are not normally distributed.",
   "A flow chart from the kind of data and question to chi-squared, correlation, ANOVA, the Mann-Whitney U test or the t-test.",
   ["Are the data measurements rather than counts in categories? If not, compare the observed and expected counts with a chi-squared test.", "Are you comparing groups? If not, you are testing for an association between two variables: correlation (Pearson or Spearman).",
    "Are there exactly two groups? If not, compare three or more means with ANOVA.", "Are the data normally distributed? If so, use a t-test; if not, the Mann–Whitney U test."],
   also=("u01-17",), start="q1", nodes={
       "q1": {"q": "Are the data measurements, not counts in categories?", "yes": "q2", "no": "chi"},
       "chi": {"outcome": "Chi-squared test: observed against expected frequencies", "tone": "neutral"},
       "q2": {"q": "Are you comparing groups?", "yes": "q3", "no": "cor"},
       "cor": {"outcome": "Correlation (Pearson or Spearman): association of two variables", "tone": "neutral"},
       "q3": {"q": "Are there exactly two groups?", "yes": "q4", "no": "anova"},
       "anova": {"outcome": "ANOVA: means of three or more groups", "tone": "neutral"},
       "q4": {"q": "Are the data normally distributed?", "yes": "ttest", "no": "mwu"},
       "ttest": {"outcome": "t-test: means of two groups", "tone": "good"},
       "mwu": {"outcome": "Mann–Whitney U: two groups, no normality assumed", "tone": "neutral"}})

# ---------------------------------------------------------------- Western blot and ELISA workflows
WB = [("SDS-PAGE", "SDS coats proteins with negative charge, so they separate by size", "a1"), ("transfer", "proteins move from the gel to a membrane", "a4"), ("block", "stops antibodies sticking anywhere else", "a5"),
      ("primary antibody", "binds the target protein", "a3"), ("labelled secondary antibody", "binds the primary antibody", "a2"), ("detect", "a band at the expected size; a loading control checks equal loading", "a1")]
mk("u14-11", "bio-western-blot", "flow", "The steps of a Western blot",
   "Proteins are separated by size on an SDS-PAGE gel, transferred to a membrane, and the membrane is blocked. A primary antibody binds the target and a labelled secondary antibody binds the primary; detection shows a band at the expected size, and a loading control such as actin checks that equal amounts were loaded.",
   "Six boxes in order: SDS-PAGE, transfer, block, primary antibody, labelled secondary antibody and detection.",
   [f"{a[0].upper() + a[1:]}: {b}." for a, b, _ in WB],
   layout="grid", boxWidth=122, rowHeight=130, nodes=grid(WB, "w", ["a1", "a4", "a5", "a3", "a2", "a1"]), edges=chain("w", 6))
EL = [("coat the plate", "a capture antibody sticks to the wells", "a1"), ("add the sample", "the antigen binds the capture antibody; wash", "a4"), ("add the detection antibody", "an enzyme-labelled antibody binds the antigen; wash", "a5"),
      ("add the substrate", "the enzyme turns it into a coloured product", "a3"), ("read the absorbance", "a plate reader; unknowns are read off a standard curve", "a2")]
mk("u14-12", "bio-sandwich-elisa", "flow", "A sandwich ELISA",
   "A capture antibody on the plate binds the antigen from the sample, a second, enzyme-labelled antibody binds it from above, and washing removes everything unbound between steps. The enzyme turns a substrate into a coloured product whose absorbance, read against a standard curve, gives the concentration.",
   "Five boxes in order: coat the plate with capture antibody, add the sample, add the enzyme-labelled detection antibody, add the substrate, and read the absorbance.",
   [f"{a[0].upper() + a[1:]}: {b}." for a, b, _ in EL],
   layout="grid", boxWidth=122, rowHeight=130, nodes=grid(EL, "e", ["a1", "a4", "a5", "a3", "a2"]), edges=chain("e", 5))
