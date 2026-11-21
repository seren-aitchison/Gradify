"""Biology unit 13, Bioinformatics: diagram specs. Run: python3 scripts/diagrams/biology/u13.py"""
from spec import mk

chain = lambda prefix, n: [{"from": f"{prefix}{i}", "to": f"{prefix}{i + 1}"} for i in range(n - 1)]
grid = lambda items, prefix, tones, per=3: [{"id": f"{prefix}{i}", "label": a, "sub": b, "tone": tones[i % len(tones)], "col": i % per if (i // per) % 2 == 0 else per - 1 - i % per, "row": i // per} for i, (a, b, *_) in enumerate(items)]

# ---------------------------------------------------------------- pairwise alignment
mk("u13-05", "bio-pairwise-alignment", "align", "Aligning two sequences",
   "An alignment lines up two sequences so that matching positions sit in the same column; a mismatch (×) and a gap (–, standing for an insertion or deletion) each cost points. Dynamic programming finds the alignment with the best total score, and percentage identity is the share of identical positions.",
   "Two alignments of GATTACA: against GCTTACA, six matches and one mismatch scoring 5; and against GATACA, six matches and one gap scoring 4.",
   ["Scoring: +1 for a match, −1 for a mismatch, −2 for a gap.", "GATTACA against GCTTACA: six matches and one mismatch, score 5, 86% identical.",
    "GATTACA against GATACA: one T is missing, so a gap is needed; six matches and one gap, score 4.", "The best score is found by dynamic programming (Needleman–Wunsch); any other alignment scores less."],
   also=("u13-03",), scoring={"match": 1, "mismatch": -1, "gap": -2},
   pairs=[{"seq1": "GATTACA", "seq2": "GCTTACA", "aligned1": "GATTACA", "aligned2": "GCTTACA", "label": "one mismatch"},
          {"seq1": "GATTACA", "seq2": "GATACA", "aligned1": "GATTACA", "aligned2": "GA-TACA", "label": "one gap (a deletion)"}],
   claims=[{"type": "identity", "pair": 0, "value": 85.7}, {"type": "identity", "pair": 1, "value": 85.7}])

# ---------------------------------------------------------------- BLAST E-values
E1, E2 = "10.4771-0.30103*x", "11.4771-0.30103*x"
mk("u13-06", "bio-blast-evalue", "graph", "E-value, bit score and database size",
   "The E-value is the number of hits of at least that score expected by chance: E = m × n × 2^−S for a query of length m, a database of n letters and a bit score S. On a log scale it falls in a straight line as the bit score rises, and a database ten times larger raises every E-value tenfold, so the same alignment is less significant.",
   "Two parallel lines of log of the E-value against bit score, falling by 0.301 per bit, the line for a ten times larger database one unit higher, with a threshold at E = 10 to the minus 5.",
   ["E = m × n × 2^−S, so log₁₀ E falls by 0.301 for each extra bit of score.", "Here the query has 300 residues and the databases have 10⁸ and 10⁹ residues.",
    "A 10 times larger database raises log₁₀ E by exactly 1: more chance matches are expected.", "E-values below about 10⁻⁵ usually indicate meaningful similarity: that needs a bit score of about 51 (smaller database) or 55 (larger)."],
   range={"x": [20, 80], "y": [-10, 12]}, ticks=[[20, 30, 40, 50, 60, 70, 80], [-10, -5, 0, 5, 10]], height=[340, 320], xLabelBelow=True,
   axisLabels=["bit score, S", "log₁₀ of the E-value"], curves=[{"expr": E2, "colour": "a2"}, {"expr": E1, "colour": "a1"}],
   legend=[["database of 10⁹ residues", "a2"], ["database of 10⁸ residues", "a1"]], legendData=[48, 11.5], marks=[{"y": -5, "label": "E = 10⁻⁵"}],
   checks=[{"type": "slope", "expr": E1, "x": 50, "value": -0.30103, "name": "each extra bit of score cuts the E-value by a factor of 2: log₁₀ E falls by 0.301"},
           {"type": "point", "expr": E1, "x": 20, "y": 4.4551, "name": "the 10⁸ database at a bit score of 20: E = 300 × 10⁸ × 2⁻²⁰, log₁₀ about 4.46"},
           {"type": "point", "expr": E2, "x": 20, "y": 5.4551, "name": "a 10 times larger database gives log₁₀ E exactly 1 higher"},
           {"type": "value", "expr": E1, "x": 53, "between": [-5.6, -5.4], "name": "a bit score of 53 is needed to pass E = 10⁻⁵ with the smaller database"},
           {"type": "value", "expr": E2, "x": 53, "between": [-4.6, -4.4], "name": "the same score is not quite significant against the larger database"}])

# ---------------------------------------------------------------- RNA-seq workflow
RS = [("extract RNA", "and check its quality", "a1"), ("select mRNA", "by poly-A tail, or remove ribosomal RNA", "a4"), ("reverse transcribe", "RNA to cDNA", "a5"), ("fragment and sequence", "add adapters, then sequence", "a3"),
      ("quality control", "check the reads", "a1"), ("align the reads", "to a reference genome or transcriptome", "a4"), ("count reads per gene", "quantification", "a5"), ("test for differences", "between conditions, with correction", "a2")]
mk("u13-11", "bio-rnaseq-workflow", "flow", "An RNA-seq experiment, bench to results",
   "In the laboratory RNA is extracted, mRNA selected (ribosomal RNA is most of the RNA, so it is removed), reverse transcribed to cDNA, fragmented and sequenced. On the computer the reads are checked, aligned to a reference, counted for each gene and tested for differences between conditions.",
   "Eight boxes in order: extract RNA, select mRNA, reverse transcribe, fragment and sequence, quality control, align, count reads per gene, and test for differences.",
   [f"{a[0].upper() + a[1:]}: {b}." for a, b, _ in RS],
   layout="grid", boxWidth=122, rowHeight=118, nodes=grid(RS, "r", ["a1", "a4", "a5", "a3", "a1", "a4", "a5", "a2"]), edges=chain("r", 8))

# ---------------------------------------------------------------- log2 fold change
L2 = "log(x)/0.693147"
mk("u13-12", "bio-log2-fold-change", "graph", "Why log₂ fold change?",
   "A fold change is expression in condition B divided by expression in condition A. A doubling is 2 and a halving is 0.5, which are not symmetrical; on a log₂ scale they are +1 and −1, and 'no change' is 0. Volcano plots use this scale.",
   "A curve of log base 2 of the fold change: zero at a fold change of 1, plus 1 at 2, plus 2 at 4, minus 1 at one half and minus 2 at one quarter.",
   ["Fold change = expression in B ÷ expression in A.", "No change: fold change 1, log₂ = 0.", "Doubled: fold change 2, log₂ = +1.  Halved: fold change ½, log₂ = −1.",
    "On the log₂ scale increases and decreases of the same size are symmetrical."],
   range={"x": [0, 8.5], "y": [-3.2, 3.2]}, ticks=[[1, 2, 4, 8], [-3, -2, -1, 0, 1, 2, 3]], height=[340, 320], xLabelBelow=True,
   axisLabels=["fold change (B ÷ A)", "log₂ fold change"], curves=[{"expr": L2, "colour": "a1", "domain": [0.12, 8.5]}],
   points=[{"x": 2, "y": 1, "label": "doubled", "colour": "a2", "dx": 8, "dy": -12}, {"x": 0.5, "y": -1, "label": "halved", "colour": "a4", "dx": 8, "dy": 14}, {"x": 1, "y": 0, "label": "no change", "colour": "ink", "dx": 8, "dy": -12}],
   checks=[{"type": "point", "expr": L2, "x": 1, "y": 0, "name": "no change (fold change 1) is 0"}, {"type": "point", "expr": L2, "x": 2, "y": 1, "name": "a doubling is +1"},
           {"type": "point", "expr": L2, "x": 0.5, "y": -1, "name": "a halving is −1: the same size as a doubling, opposite sign"}, {"type": "point", "expr": L2, "x": 4, "y": 2, "name": "a four-fold increase is +2"},
           {"type": "point", "expr": L2, "x": 0.25, "y": -2, "name": "a four-fold decrease is −2"}])
