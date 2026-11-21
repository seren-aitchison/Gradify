"""Biology unit 5, Cell division, growth and development: diagram specs. Run: python3 scripts/diagrams/biology/u05.py"""
from spec import mk

# ---------------------------------------------------------------- the cell cycle and its checkpoints
mk("u05-01", "bio-cell-cycle", "flow", "The cell cycle and its checkpoints",
   "Interphase (G₁, S and G₂) takes up most of the cycle, and M phase is mitosis and cytokinesis. The cycle can pause at three checkpoints, in G₁, G₂ and at metaphase, until problems are fixed. Cells that stop dividing leave for G₀.",
   "A cycle of four boxes, G1, S, G2 and M, with arrows between them labelled with the G1 and G2 checkpoints and the daughter cells that start the next G1.",
   ["G₁: the cell grows and carries out its normal functions; the G₁ checkpoint checks size, nutrients, growth signals and DNA damage before S phase.",
    "S: DNA is replicated; DNA content doubles from 2C to 4C.", "G₂: the cell makes proteins for division and the G₂ checkpoint checks the DNA has been copied correctly.",
    "M: mitosis, with the spindle checkpoint at metaphase, then cytokinesis; two identical daughter cells return to 2C.", "A typical cycle in cultured human cells takes about 24 hours."],
   also=("u05-08",), layout="line",
   nodes=[{"id": "g1", "label": "G₁", "sub": "growth and normal function. G₁ checkpoint: size, nutrients, growth signals, DNA damage", "tone": "a1"},
          {"id": "s", "label": "S", "sub": "DNA replicated: 2C to 4C", "tone": "a4"},
          {"id": "g2", "label": "G₂", "sub": "prepares for division. G₂ checkpoint: DNA fully and correctly copied", "tone": "a5"},
          {"id": "m", "label": "M", "sub": "mitosis (spindle checkpoint at metaphase), then cytokinesis. Two identical 2C cells start G₁ again, or leave for G₀", "tone": "a2"}],
   edges=[{"from": "g1", "to": "s"}, {"from": "s", "to": "g2"}, {"from": "g2", "to": "m"}])

# ---------------------------------------------------------------- DNA content through the cycle
S_PH = "2+0.25*(x-10)"
mk("u05-02", "bio-dna-content", "graph", "DNA content through the cell cycle",
   "DNA content is 2C in G₁, rises steadily during S phase as the DNA is replicated, stays at 4C through G₂ and mitosis, and falls back to 2C when the cell divides. Each daughter cell is again 2C.",
   "A stepped line of DNA content against time through one cell cycle: flat at 2C in G1, rising to 4C across S phase, flat at 4C in G2 and M, then dropping to 2C in the daughter cells.",
   ["G₁: 2C.", "S phase: DNA is replicated, so the content rises from 2C to 4C.", "G₂ and M: 4C, each chromosome two sister chromatids.", "Cytokinesis divides the DNA between two daughter cells, each back to 2C."],
   also=("u05-01",), range={"x": [0, 36], "y": [0, 5]}, ticks=[[], [2, 4]], height=[340, 320], xLabelBelow=True,
   axisLabels=["time through one cell cycle", "DNA per cell (C)"],
   bands=[{"x": [0, 10], "label": "G₁", "colour": "a1"}, {"x": [10, 18], "label": "S", "colour": "a4"}, {"x": [18, 26], "label": "G₂", "colour": "a5"}, {"x": [26, 30], "label": "M", "colour": "a2"}, {"x": [30, 36], "label": "G₁ (daughter)", "colour": "a1"}],
   curves=[{"expr": "2", "domain": [0, 10], "colour": "a1"}, {"expr": S_PH, "domain": [10, 18], "colour": "a4"}, {"expr": "4", "domain": [18, 30], "colour": "a2"}, {"expr": "2", "domain": [30, 36], "colour": "a1"}],
   arrows=[{"from": [30, 4], "to": [30, 2], "colour": "a2", "dash": "5 4"}],
   checks=[{"type": "point", "expr": "2", "x": 5, "y": 2, "name": "G₁: 2C"}, {"type": "point", "expr": S_PH, "x": 10, "y": 2, "name": "S phase starts at 2C"},
           {"type": "point", "expr": S_PH, "x": 14, "y": 3, "name": "halfway through S phase the DNA is half copied: 3C"}, {"type": "point", "expr": S_PH, "x": 18, "y": 4, "name": "S phase ends at 4C: the DNA content has doubled"},
           {"type": "point", "expr": "4", "x": 28, "y": 4, "name": "G₂ and M: 4C"}, {"type": "point", "expr": "2", "x": 33, "y": 2, "name": "each daughter cell is back to 2C"}])

# ---------------------------------------------------------------- cyclins rise and fall
mk("u05-07", "bio-cyclin-cycle", "graph", "Cyclins rise and fall, driving the cycle",
   "A CDK is active only when bound to a cyclin. CDK levels stay steady, but each cyclin builds up before the phase it drives, switches on its CDK, and is then destroyed, which resets the cycle. Different cyclin–CDK complexes control G₁/S, S and M.",
   "Three bell-shaped curves of cyclin level peaking in late G1, in S phase and at the start of M, over a flat line for constant CDK, against bands for the phases of the cell cycle.",
   ["CDK level: steady all through the cycle.", "G₁/S cyclin: peaks at the end of G₁, driving entry to S phase.", "S cyclin: peaks in S phase.", "M cyclin: peaks at the start of M, then is destroyed so the cycle resets."],
   range={"x": [0, 36], "y": [-0.3, 1.9]}, ticks=[[], []], height=[340, 320], xLabelBelow=True, axisLabels=["time through one cell cycle", "relative level"],
   bands=[{"x": [0, 10], "label": "G₁", "colour": "a1"}, {"x": [10, 18], "label": "S", "colour": "a4"}, {"x": [18, 26], "label": "G₂", "colour": "a5"}, {"x": [26, 30], "label": "M", "colour": "a2"}, {"x": [30, 36], "label": "G₁", "colour": "a1"}],
   curves=[{"expr": "0.4", "colour": "a5", "dash": "6 5", "width": 2.4}, {"expr": "exp(-(x-9)^2/(2*1.6^2))", "colour": "a1"}, {"expr": "exp(-(x-14)^2/(2*2^2))", "colour": "a4"}, {"expr": "exp(-(x-27)^2/(2*1.8^2))", "colour": "a2"}],
   legend=[["CDK (steady)", "a5", "6 5"], ["G₁/S cyclin", "a1"], ["S cyclin", "a4"], ["M cyclin", "a2"]], legendData=[3, 1.84],
   checks=[{"type": "max", "expr": "exp(-(x-9)^2/(2*1.6^2))", "domain": [0, 36], "x": 9, "y": 1, "name": "G₁/S cyclin peaks at the end of G₁"},
           {"type": "max", "expr": "exp(-(x-14)^2/(2*2^2))", "domain": [0, 36], "x": 14, "y": 1, "name": "S cyclin peaks in S phase"},
           {"type": "max", "expr": "exp(-(x-27)^2/(2*1.8^2))", "domain": [0, 36], "x": 27, "y": 1, "name": "M cyclin peaks as the cell enters M"},
           {"type": "value", "expr": "exp(-(x-27)^2/(2*1.8^2))", "x": 34, "between": [0, 0.01], "name": "M cyclin has been destroyed by the next G₁"}])

# ---------------------------------------------------------------- mitosis and meiosis compared
mk("u05-05", "bio-mitosis-meiosis", "ploidy", "Mitosis and meiosis from the same parent cell",
   "Both start after S phase. Mitosis is one division and gives two diploid cells identical to the parent. Meiosis is two divisions and gives four haploid cells; with a crossover (a two-coloured chromosome) they differ from each other and from the parent.",
   "A parent cell with four chromosomes, two maternal and two paternal, each copied. Mitosis gives two cells with all four chromosomes; meiosis gives four cells with two chromosomes each, one with a chromosome that has crossed over.",
   ["The parent has 2n = 4 chromosomes, two from each parent, each copied in S phase.", "Mitosis: one division, two cells, each 2n = 4 and identical to the parent.",
    "Meiosis: two divisions, four cells, each n = 2, with one chromosome of each homologous pair.", "A crossover swaps ends between homologues, so the four meiotic products all differ from each other and from the parent."],
   also=("u05-04",), pairs=2, crossover=True,
   claims=[{"type": "cells", "process": "mitosis", "value": 2}, {"type": "divisions", "process": "mitosis", "value": 1}, {"type": "chromosomes", "process": "mitosis", "value": 4},
           {"type": "cells", "process": "meiosis", "value": 4}, {"type": "divisions", "process": "meiosis", "value": 2}, {"type": "chromosomes", "process": "meiosis", "value": 2}])

# ---------------------------------------------------------------- apoptosis or necrosis (decision tree)
mk("u05-09", "bio-apoptosis-necrosis", "decision-tree", "Apoptosis or necrosis?",
   "Apoptosis is a controlled, energy-requiring suicide: the cell shrinks and breaks into apoptotic bodies that phagocytes remove quietly. Necrosis follows severe injury: the cell swells and bursts, and its contents leak out and cause inflammation.",
   "A flow chart: a controlled, energy-requiring death triggered by signals leads to apoptosis, with shrinking and no inflammation; death from severe injury leads to necrosis, with swelling, bursting and inflammation.",
   ["Is the death controlled and energy-requiring, triggered by a signal such as DNA damage or a death receptor? If so it is apoptosis: the cell shrinks, the DNA is cut up, apoptotic bodies form and phagocytes remove them without inflammation.",
    "If the cause is severe injury (lack of oxygen, toxins, trauma) it is necrosis: the cell swells and its membrane ruptures, and its contents leak out and cause inflammation."],
   also=("u05-10",), start="q1", nodes={
       "q1": {"q": "Is the death controlled and energy-requiring, triggered by a signal such as DNA damage or a death receptor?", "yes": "apop", "no": "necro"},
       "apop": {"outcome": "Apoptosis: the cell shrinks and breaks into apoptotic bodies; phagocytes remove them with no inflammation", "tone": "good"},
       "necro": {"outcome": "Necrosis: severe injury; the cell swells and bursts, and the leaked contents cause inflammation", "tone": "bad"}})

# ---------------------------------------------------------------- tumour progression
PROG = [("a mutated cell", "mutations accumulate in one lineage over years", "a1"), ("benign tumour", "grows slowly, enclosed, does not invade", "a4"),
        ("malignant tumour", "grows faster and invades surrounding tissue", "a3"), ("blood supply", "angiogenesis beyond about 1–2 mm", "a5"),
        ("metastasis", "cells enter blood or lymph and form secondary tumours", "a2")]
mk("u05-13", "bio-tumour-progression", "flow", "From one mutated cell to metastasis",
   "Cancer builds up over years as mutations accumulate in a single cell lineage. A benign tumour stays put; a malignant one invades. Beyond about 1–2 mm a tumour needs its own blood supply (angiogenesis), and metastasis, which causes most cancer deaths, sends cells to form secondary tumours.",
   "Five boxes in order: a mutated cell, a benign tumour, a malignant tumour, blood supply by angiogenesis, and metastasis.",
   [f"{a[0].upper() + a[1:]}: {b}." for a, b, _ in PROG],
   layout="grid", boxWidth=118, rowHeight=118,
   nodes=[{"id": f"t{i}", "label": a, "sub": b, "tone": t, "col": i % 3 if i < 3 else 4 - i, "row": i // 3} for i, (a, b, t) in enumerate(PROG)],
   edges=[{"from": f"t{i}", "to": f"t{i + 1}"} for i in range(4)])

# ---------------------------------------------------------------- germ layers
mk("u05-18", "bio-germ-layers", "layers", "The three germ layers",
   "Gastrulation produces an embryo with three layers: ectoderm outside, mesoderm in the middle and endoderm inside. Every tissue of the body comes from one of them, so animals with three layers are triploblastic.",
   "Concentric rings for the ectoderm, mesoderm and endoderm of a gastrula, with the tissues each becomes: skin epidermis and nervous system; muscle, bone, blood, heart, kidneys and gonads; gut lining, respiratory lining, liver and pancreas.",
   ["Ectoderm (outer): the epidermis of the skin and the nervous system, including the brain and spinal cord.", "Mesoderm (middle): muscle, bone, blood, heart, kidneys and gonads.",
    "Endoderm (inner): the lining of the gut and respiratory tract, the liver and the pancreas."],
   layers=[{"name": "ectoderm", "position": "outer", "items": ["epidermis of the skin", "nervous system", "brain", "spinal cord"]},
           {"name": "mesoderm", "position": "middle", "items": ["muscle", "bone", "blood", "heart", "kidneys", "gonads"]},
           {"name": "endoderm", "position": "inner", "items": ["lining of the gut", "lining of the respiratory tract", "liver", "pancreas"]}])

# ---------------------------------------------------------------- a morphogen gradient
GRAD = "exp(-x/2.5)"
mk("u05-20", "bio-morphogen-gradient", "graph", "A morphogen gradient sets cell fates",
   "A morphogen spreads from its source and falls in concentration with distance. Cells read the concentration: above one threshold they take one fate, between the two thresholds another, below the lower one a third. One gradient can pattern a whole tissue, as Bicoid does along the fruit fly egg.",
   "A curve of morphogen concentration falling with distance from its source, with two horizontal thresholds dividing the tissue into three zones labelled fate A, fate B and fate C.",
   ["The morphogen is made at the left and its concentration falls with distance.", "Cells where the concentration is above the upper threshold (0.6) take fate A.",
    "Cells between the thresholds (0.6 and 0.25) take fate B.", "Cells below the lower threshold (0.25) take fate C.", "One gradient therefore makes three different cell types in order."],
   range={"x": [0, 8], "y": [0, 1.1]}, ticks=[[], [0.25, 0.6, 1.0]], height=[340, 320], xLabelBelow=True,
   axisLabels=["distance from the source of the morphogen", "morphogen concentration"],
   bands=[{"x": [0, 1.277], "label": "fate A", "colour": "a1"}, {"x": [1.277, 3.466], "label": "fate B", "colour": "a4"}, {"x": [3.466, 8], "label": "fate C", "colour": "a2"}],
   curves=[{"expr": GRAD, "colour": "a3", "width": 3.2}],
   marks=[{"y": 0.6, "to": 1.277, "label": "upper threshold"}, {"y": 0.25, "to": 3.466, "label": "lower threshold"}],
   checks=[{"type": "point", "expr": GRAD, "x": 1.277, "y": 0.6, "name": "the gradient falls to the upper threshold, 0.6, at distance 1.28"},
           {"type": "point", "expr": GRAD, "x": 3.466, "y": 0.25, "name": "the gradient falls to the lower threshold, 0.25, at distance 3.47"},
           {"type": "slope", "expr": GRAD, "x": 2, "value": -0.17975, "name": "the concentration falls steadily with distance (negative gradient everywhere)"}])
