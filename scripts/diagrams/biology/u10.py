"""Biology unit 10, Immunology: diagram specs. Run: python3 scripts/diagrams/biology/u10.py"""
from spec import mk

chain = lambda prefix, n: [{"from": f"{prefix}{i}", "to": f"{prefix}{i + 1}"} for i in range(n - 1)]

# ---------------------------------------------------------------- primary and secondary responses
PRIM = "x^4*exp(-x/3.5)/703.6136"
B = "0.09683"
SEC = f"{B}+5.9*((x-35)^2*exp(-(x-35)/2.5))/3.38338"
mk("u10-03", "bio-immune-response", "graph", "The primary and secondary immune responses",
   "On first exposure to an antigen the antibody level takes one to two weeks to rise, and stays low. On re-exposure the memory cells respond within days: the antibody level rises faster, much higher and lasts longer. This is the principle behind vaccines and booster doses. Relative levels, drawn schematically.",
   "A curve of antibody level against days: a slow, low rise to a peak around day 14 after the first exposure, then after a second exposure at day 35 a much faster, taller peak around day 40.",
   ["First exposure (day 0): a lag, then antibody levels rise slowly to a low peak at about two weeks.", "Second exposure (day 35): memory cells respond at once.",
    "The secondary response peaks within days, about six times higher, and lasts longer.", "A vaccine gives the first exposure safely, so the real infection meets a secondary response."],
   also=("u10-19",), range={"x": [0, 70], "y": [0, 7]}, ticks=[[0, 14, 35, 40, 56, 70], []], height=[340, 320], xLabelBelow=True,
   axisLabels=["time / days", "antibody level (relative)"],
   curves=[{"expr": PRIM, "domain": [0, 35], "colour": "a1"}, {"expr": SEC, "domain": [35, 70], "colour": "a2"}],
   marks=[{"x": 0, "to": 6.6, "label": "exposure 1", "dx": 42}, {"x": 35, "to": 6.6, "label": "exposure 2", "dx": -36}],
   checks=[{"type": "max", "expr": PRIM, "domain": [0, 35], "x": 14, "y": 1.0, "name": "primary response: the antibody level peaks about two weeks after the first exposure"},
           {"type": "max", "expr": SEC, "domain": [35, 70], "x": 40, "y": 5.9968, "name": "secondary response: the peak comes within about five days of the second exposure"},
           {"type": "value", "expr": SEC, "x": 40, "between": [5.9, 6.1], "name": "the secondary peak is about six times the primary peak"},
           {"type": "value", "expr": PRIM, "x": 3, "between": [0, 0.1], "name": "primary response: little antibody in the first days (a lag)"}])

# ---------------------------------------------------------------- clonal selection
CS = [("antigen meets its B cell", "only the B cell whose receptor matches binds it", "a1"), ("helper T cell activation", "the B cell presents the antigen; a helper T cell gives the signals", "a5"),
      ("clonal expansion", "the selected B cell divides again and again", "a4"), ("plasma cells and memory cells", "plasma cells secrete antibodies; memory B cells wait for a second exposure", "a2")]
mk("u10-10", "bio-clonal-selection", "flow", "Clonal selection of a B cell",
   "Each B cell carries a receptor for one antigen. The antigen selects the matching cell, a helper T cell activates it, and it multiplies into a clone. Most of the clone becomes plasma cells that secrete antibody; some become memory cells that make later responses faster.",
   "Four boxes in order: antigen meets its matching B cell, helper T cell activation, clonal expansion, and plasma cells and memory cells.",
   [f"{a[0].upper() + a[1:]}: {b}." for a, b, _ in CS],
   layout="line", nodes=[{"id": f"c{i}", "label": a, "sub": b, "tone": t} for i, (a, b, t) in enumerate(CS)], edges=chain("c", 4))

# ---------------------------------------------------------------- antigen presentation
mk("u10-14", "bio-mhc-pathways", "decision-tree", "Which MHC molecule presents the antigen?",
   "Where the protein comes from decides the route. Proteins made inside any nucleated cell, including viral proteins, are cut up by the proteasome and shown on MHC class I to cytotoxic CD8⁺ T cells. Proteins taken in from outside by antigen-presenting cells are broken down in endosomes and shown on MHC class II to helper CD4⁺ T cells.",
   "A flow chart: a protein made inside the cell goes by the proteasome to MHC class I and cytotoxic CD8 T cells; a protein taken in from outside goes by endosomes to MHC class II and helper CD4 T cells.",
   ["Was the protein made inside the cell, as a viral protein is? If so: the proteasome breaks it into peptides, which enter the ER, load onto MHC class I and are shown to cytotoxic CD8⁺ T cells, which kill the infected cell.",
    "If it was taken in from outside, on a professional antigen-presenting cell (dendritic cell, macrophage or B cell): endosomes break it down, the peptides load onto MHC class II and are shown to helper CD4⁺ T cells."],
   start="q1", nodes={
       "q1": {"q": "Was the protein made inside the cell, as a viral protein is?", "yes": "m1", "no": "m2"},
       "m1": {"outcome": "MHC class I: the proteasome makes peptides, which are shown to cytotoxic CD8⁺ T cells that kill the infected cell", "tone": "bad"},
       "m2": {"outcome": "MHC class II: endosomes break down the protein, and the peptides are shown to helper CD4⁺ T cells", "tone": "good"}})

# ---------------------------------------------------------------- inflammation
INF = [("tissue damage or infection", "damaged cells and mast cells release histamine and other mediators", "a3"), ("vasodilation", "more blood flow: redness and heat", "a2"),
       ("more permeable capillaries", "fluid and proteins leak out: swelling", "a5"), ("neutrophils, then macrophages", "move into the tissue and remove the pathogen", "a1"), ("resolution and repair", "acute inflammation normally ends once the cause is gone", "a4")]
mk("u10-18", "bio-inflammation", "flow", "Acute inflammation",
   "Damaged cells and mast cells release histamine. Vasodilation brings more blood (redness, heat) and leakier capillaries let fluid out (swelling), while neutrophils and then macrophages move in. The fifth sign, pain, and the loss of function, follow. Acute inflammation resolves; chronic inflammation does not.",
   "Five boxes in order: tissue damage, vasodilation, more permeable capillaries, neutrophils then macrophages arriving, and resolution and repair.",
   [f"{a[0].upper() + a[1:]}: {b}." for a, b, _ in INF] + ["The five signs are redness, heat, swelling, pain and loss of function."],
   layout="grid", boxWidth=122, rowHeight=124, nodes=[{"id": f"i{i}", "label": a, "sub": b, "tone": t, "col": i % 3 if i < 3 else 4 - i, "row": i // 3} for i, (a, b, t) in enumerate(INF)], edges=chain("i", 5))
