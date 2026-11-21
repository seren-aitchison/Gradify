"""Biology unit 12, Biotechnology: diagram specs. Run: python3 scripts/diagrams/biology/u12.py"""
from spec import mk

chain = lambda prefix, n: [{"from": f"{prefix}{i}", "to": f"{prefix}{i + 1}"} for i in range(n - 1)]
comp = lambda s: s.translate(str.maketrans("ATGC", "TACG"))
grid = lambda items, prefix, tones, per=3: [{"id": f"{prefix}{i}", "label": a, "sub": b, "tone": tones[i % len(tones)], "col": i % per if (i // per) % 2 == 0 else per - 1 - i % per, "row": i // per} for i, (a, b, *_) in enumerate(items)]

# ---------------------------------------------------------------- cutting and joining DNA
mk("u12-03", "bio-restriction-cloning", "restriction", "Cutting a gene and a vector with the same enzyme",
   "EcoRI recognises GAATTC, which reads the same on both strands, and cuts each strand between the G and the A, leaving single-stranded AATT overhangs. Cut with the same enzyme, the gene's ends and the vector's ends all fit each other, and DNA ligase seals them, restoring the site at both joins.",
   "A gene with two EcoRI sites cut into three fragments and a vector with one site cut open, each with sticky overhangs, then the middle gene fragment ligated into the vector, with the GAATTC site restored at both joins.",
   ["EcoRI recognises GAATTC and cuts between G and A on each strand.", "The staggered cut leaves 5′ overhangs of AATT, called sticky ends.", "The gene has two sites, so it gives three fragments; the middle one is the gene to be cloned.",
    "The vector has one site and is cut open.", "AATT pairs with AATT on another EcoRI-cut molecule, so the gene fits into the vector and ligase seals the backbones; GAATTC is restored at both joins."],
   also=("u12-04",), enzyme={"name": "EcoRI", "site": "GAATTC", "cutAfter": 1},
   molecules=[{"id": "gene", "label": "gene DNA", "dna": "TAGAATTCATGGCCAAAGGGAATTCCTA"}, {"id": "vector", "label": "vector", "dna": "CCTAGAATTCGGTCA"}],
   recombinant={"label": "recombinant DNA", "from": [["vector", 0], ["gene", 1], ["vector", 1]]}, claims=[{"type": "fragments", "id": "gene", "value": 3}, {"type": "fragments", "id": "vector", "value": 2}])
CL = [("isolate the gene", "cut with a restriction enzyme, or make cDNA from mRNA", "a1"), ("insert it into a vector", "a plasmid cut with the same enzyme", "a4"), ("join with DNA ligase", "the sticky ends are sealed", "a5"),
      ("transform host cells", "a few cells take up the recombinant plasmid", "a3"), ("select the transformed cells", "marker gene: only they grow on the antibiotic", "a2")]
mk("u12-02", "bio-cloning-steps", "flow", "Making recombinant DNA",
   "The gene is isolated and inserted into a vector cut with the same enzyme, ligase joins them, host cells are transformed, and the few cells that took up the plasmid are picked out by a marker gene such as antibiotic resistance. Eukaryotic genes are usually made as cDNA, because bacteria cannot remove introns.",
   "Five boxes in order: isolate the gene, insert it into a vector, join with ligase, transform host cells, and select the transformed cells.",
   [f"{a[0].upper() + a[1:]}: {b}." for a, b, _ in CL],
   layout="grid", boxWidth=122, rowHeight=124, nodes=grid(CL, "g", ["a1", "a4", "a5", "a3", "a2"]), edges=chain("g", 5))

# ---------------------------------------------------------------- PCR
PC = [("denaturation, about 95 °C", "heat separates the two strands", "a2"), ("annealing, about 50–65 °C", "primers bind to each end of the target", "a1"), ("extension, about 72 °C", "Taq polymerase adds nucleotides from the primers", "a4")]
mk("u12-07", "bio-pcr-cycle", "flow", "One cycle of the polymerase chain reaction",
   "Each cycle heats to separate the strands (about 95 °C), cools so primers can bind to each end of the target (50–65 °C), and warms to 72 °C so heat-stable Taq polymerase can extend them. Each cycle roughly doubles the target, so copies = initial number × 2ⁿ.",
   "Three boxes in order: denaturation at about 95 degrees, annealing at 50 to 65 degrees, and extension at about 72 degrees, then the cycle repeats.",
   [f"{a[0].upper() + a[1:]}: {b}." for a, b, _ in PC] + ["The cycle repeats 25–35 times, doubling the target each time."],
   also=("u14-09",), layout="line", nodes=[{"id": f"c{i}", "label": a, "sub": b, "tone": t} for i, (a, b, t) in enumerate(PC)], edges=chain("c", 3))
PCRL = "x*0.30103"
mk("u12-07", "bio-pcr-amplification", "graph", "PCR doubles the DNA every cycle",
   "On a log scale an exponential rise is a straight line: each cycle adds log₁₀ 2 = 0.301. After 10 cycles one copy has become 1,024 (10³); after 30, more than a billion (10⁹).",
   "A straight line of log of the number of copies against cycle number, rising by 0.301 per cycle: 3 at 10 cycles, 6 at 20 and 9 at 30.",
   ["Copies after n cycles = initial copies × 2ⁿ.", "On a log₁₀ axis this is a straight line with gradient 0.301 per cycle.", "10 cycles: about 1,000 copies. 20 cycles: about a million. 30 cycles: about a billion."],
   also=("u14-09",), range={"x": [0, 36], "y": [0, 11]}, ticks=[[0, 10, 20, 30], [3, 6, 9]], height=[340, 320], xLabelBelow=True,
   axisLabels=["number of PCR cycles", "log₁₀ of copies from one starting molecule"], curves=[{"expr": PCRL, "colour": "a1", "domain": [0, 36]}],
   checks=[{"type": "slope", "expr": PCRL, "x": 5, "value": 0.30103, "name": "each cycle doubles the DNA: log₁₀ rises by 0.301 per cycle"},
           {"type": "point", "expr": PCRL, "x": 10, "y": 3.0103, "name": "after 10 cycles: 2¹⁰ = 1,024 copies, about 10³"},
           {"type": "point", "expr": PCRL, "x": 20, "y": 6.0206, "name": "after 20 cycles: 2²⁰ = 1,048,576 copies, about 10⁶"},
           {"type": "point", "expr": PCRL, "x": 30, "y": 9.0309, "name": "after 30 cycles: 2³⁰ copies, more than a billion"}])

# ---------------------------------------------------------------- gel electrophoresis: calibrating with a ladder
GEL = "80-18*x"
mk("u12-08", "bio-gel-calibration", "graph", "Sizing a DNA fragment against a ladder",
   "Smaller fragments move faster and further through the gel. For fragments in the working range, the distance moved falls in a straight line against the log of the size, so bands of a ladder of known sizes give a calibration line, and an unknown band's distance can be read off it. Idealised numbers.",
   "A straight line sloping down: distance moved in millimetres against the log of fragment size in base pairs, through the ladder bands at 100, 500, 1,000 and 5,000 base pairs, with an unknown band at 35 millimetres read off as about 316 base pairs.",
   ["DNA is negatively charged, so it moves towards the positive electrode.", "Smaller fragments move further: distance falls as log₁₀ of the size rises (gradient −18 mm per log unit here).",
    "Ladder bands of known size, at 100, 500, 1,000 and 5,000 bp, make the calibration line.", "An unknown band that moved 35 mm lies at log₁₀ size 2.5: about 316 bp."],
   also=("u14-10",), range={"x": [1.8, 4], "y": [0, 50]}, ticks=[[2, 2.5, 3, 3.5, 4], [10, 20, 30, 40]], height=[340, 320], xLabelBelow=True,
   axisLabels=["log₁₀ of fragment size (base pairs)", "distance moved in the gel / mm"],
   curves=[{"expr": GEL, "colour": "a1"}],
   points=[{"x": 2, "y": 44, "label": "100", "colour": "a4", "dy": -14, "dx": 6}, {"x": 2.69897, "y": 31.4, "label": "500", "colour": "a4", "dy": -14, "dx": 6}, {"x": 3, "y": 26, "label": "1 000", "colour": "a4", "dy": -14, "dx": 6},
           {"x": 3.69897, "y": 13.4185, "label": "5 000", "colour": "a4", "dy": -14, "dx": 6}, {"x": 2.5, "y": 35, "label": "unknown", "colour": "a2", "dy": -14, "dx": 6}],
   marks=[{"y": 35, "to": 2.5}, {"x": 2.5, "to": 35}],
   checks=[{"type": "point", "expr": GEL, "x": 2, "y": 44, "name": "the 100 bp ladder band moved 44 mm"}, {"type": "point", "expr": GEL, "x": 3, "y": 26, "name": "the 1,000 bp band moved 26 mm"},
           {"type": "point", "expr": GEL, "x": 3.69897, "y": 13.4185, "name": "the 5,000 bp band moved about 13.4 mm"}, {"type": "point", "expr": GEL, "x": 2.5, "y": 35, "name": "a band that moved 35 mm is at log₁₀ size 2.5, about 316 bp"},
           {"type": "slope", "expr": GEL, "x": 3, "value": -18, "name": "larger fragments move less: distance falls as the size rises"}])

# ---------------------------------------------------------------- Sanger sequencing
NEW = "GATTACAGCT"
mk("u12-10", "bio-sanger", "sanger", "Sanger sequencing: chain termination",
   "DNA polymerase copies the template, but a little ddNTP, which has no 3′–OH, is mixed in: whenever one is added, the chain stops. The result is a fragment of every length, each ending at a base marked by a coloured dye. Sorted by size, the colours of the last bases spell out the new strand.",
   "Ten fragments of a new DNA strand, one of every length from 1 to 10 bases, each ending in a coloured base; reading the last bases from shortest to longest gives GATTACAGCT.",
   ["The template is copied by DNA polymerase from a primer, using normal dNTPs and a little labelled ddNTP.", "Whenever a ddNTP is added the chain stops, so fragments of every length are made.",
    "Fragments are separated by size by capillary electrophoresis, and a laser reads the dye of each last base.", f"From the shortest fragment upwards the last bases read {NEW}.", "The template strand is the complement: " + comp(NEW) + "."],
   newStrand=NEW, template=comp(NEW), claims=[{"type": "reads", "value": NEW}])

# ---------------------------------------------------------------- CRISPR-Cas9
CR = [("a guide RNA", "20 bases that match the target DNA", "a1"), ("Cas9 and the guide find the target", "next to a short PAM sequence", "a5"), ("Cas9 cuts both strands", "a double-strand break in the chosen gene", "a2"),
      ("the cell repairs the break", "the gene is disrupted or changed", "a4")]
mk("u12-13", "bio-crispr", "flow", "Editing a gene with CRISPR-Cas9",
   "A guide RNA, designed to match a 20-base target, leads the Cas9 nuclease to that sequence, next to a short PAM. Cas9 cuts both DNA strands, and the cell's repair of the break lets the gene be disrupted or changed. Bacteria use the same system to destroy the DNA of viruses they have met before.",
   "Four boxes in order: a guide RNA, Cas9 and the guide finding the target, Cas9 cutting both strands, and the cell repairing the break.",
   [f"{a[0].upper() + a[1:]}: {b}." for a, b, _ in CR],
   layout="line", nodes=[{"id": f"r{i}", "label": a, "sub": b, "tone": t} for i, (a, b, t) in enumerate(CR)], edges=chain("r", 4))
