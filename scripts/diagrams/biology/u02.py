"""Biology unit 2, Cell Biology: diagram specs. Run: python3 scripts/diagrams/biology/u02.py"""
from spec import mk

# ---------------------------------------------------------------- labelled cells (cellmap)
mk("u02-02", "bio-prokaryotic-cell", "cellmap", "A prokaryotic cell",
   "A bacterium has no nucleus: its single circular chromosome lies in the nucleoid, free in the cytoplasm. Plasmids, 70S ribosomes, a wall, and often a capsule, pili and a flagellum complete the cell, typically 0.5–5 µm long.",
   "A rod-shaped bacterium with labels for the capsule, cell wall, plasma membrane, cytoplasm, nucleoid, plasmid, 70S ribosomes, pili and a flagellum.",
   ["The capsule is the outer slimy layer; inside it is the cell wall, then the plasma membrane.",
    "The nucleoid holds the single, usually circular chromosome, with no membrane around it.",
    "Plasmids are small extra circles of DNA, often carrying genes such as antibiotic resistance.",
    "70S ribosomes are scattered through the cytoplasm.",
    "Pili on the surface attach the cell and transfer DNA; the flagellum turns to move it.",
    "There is no nucleus, and no mitochondria, endoplasmic reticulum or Golgi apparatus."],
   cell="prokaryote", labels=["capsule", "cell wall", "plasma membrane", "cytoplasm", "nucleoid", "plasmid", "70S ribosomes", "pili", "flagellum"],
   claims=[{"type": "lacks", "structures": ["nucleus", "mitochondrion", "rough ER", "Golgi apparatus", "80S ribosomes"]}])

mk("u02-04", "bio-animal-cell", "cellmap", "An animal cell",
   "An animal cell has a nucleus, mitochondria, rough and smooth ER, a Golgi apparatus, lysosomes and a pair of centrioles, all inside a flexible plasma membrane. There is no cell wall and no chloroplast.",
   "An animal cell with labels for the plasma membrane, cytoplasm, nucleus, nucleolus, mitochondrion, rough and smooth endoplasmic reticulum, Golgi apparatus, lysosome, ribosomes and centrioles.",
   ["The nucleus, with its nucleolus, holds the DNA.", "Mitochondria carry out aerobic respiration and make ATP.",
    "Rough ER (studded with ribosomes) makes proteins; smooth ER makes lipids.", "The Golgi apparatus modifies, sorts and dispatches proteins in vesicles.",
    "Lysosomes digest worn-out parts and engulfed material.", "The centrioles organise microtubules, including the spindle.",
    "Only a plasma membrane bounds the cell: there is no wall."],
   cell="animal", labels=["plasma membrane", "cytoplasm", "nucleus", "nucleolus", "mitochondrion", "rough ER", "smooth ER", "Golgi apparatus", "lysosome", "80S ribosomes", "centrioles"],
   claims=[{"type": "lacks", "structures": ["cell wall", "chloroplast"]}])

mk("u02-05", "bio-plant-cell", "cellmap", "A plant cell",
   "A plant cell has everything an animal cell needs plus three extras: a cellulose cell wall, chloroplasts and a large permanent vacuole bounded by the tonoplast. Plasmodesmata cross the wall to join neighbouring cells.",
   "A plant leaf cell with labels for the cell wall, plasmodesmata, plasma membrane, cytoplasm, nucleus, mitochondrion, chloroplast, vacuole, tonoplast, rough endoplasmic reticulum, Golgi apparatus and ribosomes.",
   ["The cellulose cell wall lies outside the plasma membrane; plasmodesmata are channels through it.",
    "The large permanent vacuole, full of cell sap, is surrounded by the tonoplast.",
    "Chloroplasts carry out photosynthesis; root cells, in the dark, have none.",
    "Like an animal cell it has a nucleus, mitochondria, rough ER, a Golgi apparatus and ribosomes."],
   cell="plant", labels=["cell wall", "plasmodesmata", "plasma membrane", "cytoplasm", "nucleus", "mitochondrion", "chloroplast", "vacuole", "tonoplast", "rough ER", "Golgi apparatus", "80S ribosomes"])

mk("u02-06", "bio-fungal-cell", "cellmap", "A fungal hypha",
   "A segment of a fungal hypha: a chitin wall around a eukaryotic cell with a nucleus, mitochondria, ER, Golgi and a vacuole, but no chloroplasts. A septum with a pore divides it from the next segment.",
   "One segment of a fungal hypha with labels for the cell wall, plasma membrane, cytoplasm, nucleus, mitochondrion, vacuole, rough endoplasmic reticulum, Golgi apparatus, ribosomes and a septum.",
   ["The wall is made mainly of chitin, with glucans, not cellulose.", "Inside are a nucleus, mitochondria, rough ER, a Golgi apparatus, ribosomes and a vacuole.",
    "A septum, a cross-wall with a pore, separates this segment from the next.", "There are no chloroplasts: fungi feed by absorbing food they digest outside themselves."],
   cell="fungus", labels=["cell wall", "plasma membrane", "cytoplasm", "nucleus", "mitochondrion", "vacuole", "rough ER", "Golgi apparatus", "80S ribosomes", "septum"],
   claims=[{"type": "lacks", "structures": ["chloroplast"]}])

# ---------------------------------------------------------------- Gram-positive and Gram-negative walls (envelope)
mk("u02-07", "bio-gram-walls", "envelope", "Gram-positive and Gram-negative walls",
   "Drawn to scale. A Gram-positive wall is a thick mesh of peptidoglycan that traps crystal violet, so the cell stains purple. A Gram-negative wall has only a thin peptidoglycan layer under an outer membrane of lipopolysaccharide; it loses the stain and is counterstained pink.",
   "Two cross-sections of a bacterial cell surface, drawn to the same scale: Gram-positive with a thick peptidoglycan layer over the plasma membrane, and Gram-negative with lipopolysaccharide, an outer membrane, a thin peptidoglycan layer and the periplasm over the plasma membrane.",
   ["Gram-positive (Staphylococcus): a peptidoglycan wall about 30 nm thick (20–80 nm), then the plasma membrane. It keeps crystal violet and stains purple.",
    "Gram-negative (E. coli): lipopolysaccharide on an outer membrane, a thin peptidoglycan layer (2–7 nm), the periplasm, then the plasma membrane. It loses crystal violet and is counterstained pink.",
    "The outer membrane keeps many antibiotics away from the Gram-negative wall."],
   panels=[
       {"gram": "positive", "example": "Staphylococcus", "stain": "purple", "layers": [
           {"kind": "peptidoglycan", "nm": 30, "label": "thick peptidoglycan, 20–80 nm"},
           {"kind": "plasma membrane", "nm": 8, "label": "plasma membrane"},
           {"kind": "cytoplasm", "nm": 10, "label": "cytoplasm"}]},
       {"gram": "negative", "example": "E. coli", "stain": "pink", "layers": [
           {"kind": "lps", "nm": 8, "label": "lipopolysaccharide"},
           {"kind": "outer membrane", "nm": 8, "label": "outer membrane"},
           {"kind": "peptidoglycan", "nm": 4, "label": "thin peptidoglycan, 2–7 nm"},
           {"kind": "periplasm", "nm": 10, "label": "periplasm"},
           {"kind": "plasma membrane", "nm": 8, "label": "plasma membrane"},
           {"kind": "cytoplasm", "nm": 10, "label": "cytoplasm"}]}])

# ---------------------------------------------------------------- the secretory route (route: flow with endomembrane checks)
ROUTE = [("nucleus", "nucleus", "the gene is copied into mRNA"), ("ribosome", "ribosome on the rough ER", "translates the mRNA into a polypeptide"),
         ("rough ER", "rough ER", "the chain is threaded in, folded and given sugars"), ("transport vesicle", "transport vesicle", "buds off and carries it to the Golgi"),
         ("Golgi apparatus", "Golgi apparatus", "modifies it from the cis face to the trans face"), ("secretory vesicle", "secretory vesicle", "carries it to the cell surface"),
         ("plasma membrane", "plasma membrane", "the vesicle fuses: exocytosis releases it")]
mk("u02-08", "bio-secretory-pathway", "route", "How a cell makes and secretes a protein",
   "A secreted protein such as insulin follows one route through the endomembrane system: made on ribosomes of the rough ER, folded inside it, modified in the Golgi and released by exocytosis. Mitochondria supply the ATP but are not part of the route.",
   "Seven boxes in order: nucleus, ribosome on the rough endoplasmic reticulum, rough ER, transport vesicle, Golgi apparatus, secretory vesicle and plasma membrane.",
   [f"{a[0].upper() + a[1:]}: {b}." for _, a, b in ROUTE] + ["Lysosomal enzymes leave the same route at the Golgi, tagged with mannose-6-phosphate."],
   also=("u02-13", "u02-14"),
   layout="grid", boxWidth=118, rowHeight=126,
   nodes=[{"id": f"r{i}", "label": a, "sub": b, "is": k, "col": i % 4 if i < 4 else 3 - i % 4, "row": i // 4, "tone": "a5" if k == "Golgi apparatus" else "a1"} for i, (k, a, b) in enumerate(ROUTE)],
   edges=[{"from": f"r{i}", "to": f"r{i + 1}"} for i in range(len(ROUTE) - 1)])

# ---------------------------------------------------------------- choosing a route across the membrane (decision tree)
mk("u02-19", "bio-which-route", "decision-tree", "How does it cross the membrane?",
   "Three questions about the cargo choose its route. Size first: particles and macromolecules go in vesicles. Then the gradient: anything moved against it needs a pump and ATP. Finally the chemistry: small non-polar molecules slip through the lipid, while ions and polar molecules need a protein.",
   "A flow chart of questions leading to bulk transport, active transport, simple diffusion, osmosis or facilitated diffusion.",
   ["Is it a single small molecule or ion, not a macromolecule or particle? If not, it is moved in vesicles by endocytosis or exocytosis, using ATP.",
    "Is it moving down its concentration gradient? If not, a pump moves it by active transport, using ATP.",
    "Is it charged or polar? If not (oxygen, carbon dioxide, steroids), it crosses by simple diffusion through the lipid.",
    "Is it a solute such as an ion, glucose or an amino acid? Then it crosses by facilitated diffusion through a channel or carrier protein.",
    "If it is water itself, it crosses by osmosis, much of it through aquaporins."],
   start="q1", nodes={
       "q1": {"q": "Is it a single small molecule or ion, not a macromolecule or a particle such as a bacterium?", "yes": "q2", "no": "bulk"},
       "bulk": {"outcome": "Endocytosis or exocytosis: carried in a vesicle, using ATP", "tone": "warn"},
       "q2": {"q": "Is it moving down its concentration gradient?", "yes": "q3", "no": "active"},
       "active": {"outcome": "Active transport: a pump moves it, using ATP", "tone": "warn"},
       "q3": {"q": "Is it charged or polar?", "yes": "q4", "no": "simple"},
       "simple": {"outcome": "Simple diffusion through the lipid: O₂, CO₂, steroids", "tone": "good"},
       "q4": {"q": "Is it a solute (an ion, glucose, an amino acid) rather than water itself?", "yes": "facil", "no": "osmosis"},
       "osmosis": {"outcome": "Osmosis, much of it through aquaporins", "tone": "good"},
       "facil": {"outcome": "Facilitated diffusion: a channel protein for ions, a carrier protein for glucose and amino acids", "tone": "good"}})

# ---------------------------------------------------------------- surface area to volume (graph)
mk("u02-20", "bio-surface-area-volume", "graph", "Surface area to volume ratio falls as a cell grows",
   "For a cube of side L the surface area is 6L² and the volume L³, so the ratio is 6/L: doubling the side halves it. A 2 µm cube has 3 µm² of surface for every µm³ of volume; a 4 µm cube only 1.5.",
   "A curve of surface area to volume ratio against the side of a cube, falling steeply from 12 at 0.5 micrometres to 1 at 6 micrometres, with points marked at 1, 2 and 4 micrometres.",
   ["The ratio is surface area ÷ volume = 6L² ÷ L³ = 6/L.", "A 1 µm cube: 6 µm² ÷ 1 µm³ = 6 per µm.",
    "A 2 µm cube: 24 µm² ÷ 8 µm³ = 3 per µm.", "A 4 µm cube: 96 µm² ÷ 64 µm³ = 1.5 per µm.",
    "Each doubling of size halves the surface available to supply each unit of volume."],
   range={"x": [0, 6.4], "y": [0, 13]}, ticks=[[1, 2, 3, 4, 5, 6], [2, 4, 6, 8, 10, 12]], height=[340, 320], xLabelBelow=True,
   axisLabels=["side of the cube, L / µm", "surface area : volume / µm^{−1}"],
   curves=[{"expr": "6*x^2/x^3", "domain": [0.46, 6.4], "colour": "a1"}],
   points=[{"x": 1, "y": 6, "label": "1 µm: 6 ÷ 1 = 6", "colour": "a2"}, {"x": 2, "y": 3, "label": "2 µm: 24 ÷ 8 = 3", "colour": "a2"},
           {"x": 4, "y": 1.5, "label": "4 µm: 96 ÷ 64 = 1.5", "colour": "a2"}],
   checks=[{"type": "point", "expr": "6*x^2/x^3", "x": 1, "y": 6, "name": "a 1 µm cube: 6 µm² of surface, 1 µm³ of volume, ratio 6"},
           {"type": "point", "expr": "6*x^2/x^3", "x": 2, "y": 3, "name": "a 2 µm cube: 24 µm² of surface, 8 µm³ of volume, ratio 3"},
           {"type": "point", "expr": "6*x^2/x^3", "x": 4, "y": 1.5, "name": "a 4 µm cube: 96 µm² of surface, 64 µm³ of volume, ratio 1.5"}])

# ---------------------------------------------------------------- osmosis and cells (tonicity)
mk("u02-21", "bio-osmosis-cells", "tonicity", "Animal and plant cells in different solutions",
   "Water always moves from the higher to the lower water potential. In pure water a red blood cell bursts but a plant cell only becomes turgid, because its wall pushes back. In a strong solution both lose water: the red cell crenates and the plant cell's membrane pulls away from its wall.",
   "Six panels: a red blood cell and a plant cell, each in a solution of higher, equal and lower water potential, with arrows showing water moving in, not moving, or moving out.",
   ["Red blood cell, ψ = −750 kPa. In pure water (ψ = 0) water enters and the cell bursts (haemolysis).",
    "In a solution of ψ = −750 kPa there is no net movement.", "In a solution of ψ = −1500 kPa water leaves and the cell shrinks and crenates.",
    "Plant cell, ψ = ψs + ψp = −700 + 300 = −400 kPa. In pure water, water enters and the cell becomes fully turgid.",
    "In a solution of ψ = −400 kPa there is no net movement.",
    "In a solution of ψ = −1400 kPa, below the cell's solute potential, water leaves until the membrane pulls away from the wall: plasmolysis."],
   columns=["higher ψ outside (hypotonic)", "equal ψ (isotonic)", "lower ψ outside (hypertonic)"],
   rows=[{"cell": "animal", "label": "red blood cell", "psiS": -750, "psiP": 0,
          "panels": [{"solution": 0, "outcome": "bursts"}, {"solution": -750, "outcome": "unchanged"}, {"solution": -1500, "outcome": "crenated"}]},
         {"cell": "plant", "label": "plant cell", "psiS": -700, "psiP": 300,
          "panels": [{"solution": 0, "outcome": "turgid"}, {"solution": -400, "outcome": "unchanged"}, {"solution": -1400, "outcome": "plasmolysed"}]}])

# ---------------------------------------------------------------- transport across membranes (membrane)
mk("u02-22", "bio-facilitated-diffusion", "membrane", "Three ways down a gradient",
   "Oxygen, small and non-polar, diffuses straight through the lipid. Potassium ions are charged, so they need a channel; glucose is large and polar, so it needs a carrier. All three move down their own gradients, so none of them uses ATP.",
   "A phospholipid bilayer with oxygen diffusing straight through it, potassium ions leaving through a channel protein and glucose entering through a carrier protein, each with the concentration on either side.",
   ["Oxygen: 0.05 outside, 0.02 inside; it crosses the bilayer by simple diffusion.",
    "Potassium ions: 140 inside, 4 outside; they leave through a potassium channel.",
    "Glucose: 5 outside, 0.5 inside; it enters on a GLUT carrier protein.",
    "Concentrations are typical values in mmol per dm³."],
   concUnit="mmol dm^{−3}",
   sides=[{"id": "out", "label": "tissue fluid outside the cell", "conc": {"O₂": 0.05, "K⁺": 4, "glucose": 5}},
          {"id": "in", "label": "cytoplasm", "conc": {"O₂": 0.02, "K⁺": 140, "glucose": 0.5}}],
   moves=[{"substance": "O₂", "kind": "simple", "from": "out", "to": "in"},
          {"substance": "K⁺", "kind": "channel", "from": "in", "to": "out", "note": "potassium channel"},
          {"substance": "glucose", "kind": "carrier", "from": "out", "to": "in", "note": "carrier protein (GLUT)"}])

SIMPLE, FACIL = "0.5*x", "12*x/(2+x)"
mk("u02-22", "bio-diffusion-saturation", "graph", "Facilitated diffusion levels off",
   "The rate of simple diffusion rises in proportion to the concentration difference. Facilitated diffusion is faster at first but levels off once every carrier protein is busy, so adding more transporters, not a steeper gradient, is what speeds it further.",
   "Two lines of rate against concentration difference: a straight line through the origin for simple diffusion, and a curve for facilitated diffusion that rises steeply and then flattens towards a dashed maximum.",
   ["Simple diffusion: the rate is proportional to the concentration difference, so doubling it doubles the rate.",
    "Facilitated diffusion: the rate reaches half its maximum at a difference of 2 mmol per dm³, then flattens.",
    "The dashed line is the maximum rate, reached only when every carrier is working as fast as it can.",
    "The rate is in arbitrary units: the shapes, not the numbers, are the point."],
   range={"x": [0, 20], "y": [0, 15]}, ticks=[[5, 10, 15, 20], [3, 6, 9, 12, 15]], height=[340, 320], xLabelBelow=True,
   axisLabels=["concentration difference / mmol dm^{−3}", "rate of uptake (arbitrary units)"],
   curves=[{"expr": FACIL, "colour": "a1"}, {"expr": SIMPLE, "colour": "a3"}],
   marks=[{"y": 12, "label": "maximum: every carrier busy"}],
   legend=[["facilitated diffusion", "a1"], ["simple diffusion", "a3"]], legendData=[8.5, 3.2],
   checks=[{"type": "point", "expr": SIMPLE, "x": 10, "y": 5, "name": "simple diffusion at a difference of 10: rate 5"},
           {"type": "point", "expr": SIMPLE, "x": 20, "y": 10, "name": "doubling the difference to 20 doubles the simple rate to 10"},
           {"type": "point", "expr": FACIL, "x": 2, "y": 6, "name": "facilitated diffusion reaches half its maximum (6 of 12) at a difference of 2"},
           {"type": "value", "expr": FACIL, "x": 20, "between": [10.8, 12], "name": "by a difference of 20 facilitated diffusion is within 10% of its maximum, 12"},
           {"type": "slope", "expr": FACIL, "x": 18, "value": 0.06, "name": "near the top the facilitated curve has almost flattened: gradient 0.06, against 6 at the start"}])

mk("u02-23", "bio-active-transport-gut", "membrane", "Pumping and co-transport in a gut lining cell",
   "The Na⁺/K⁺ pump uses ATP to push 3 Na⁺ out into the blood for every 2 K⁺ it brings in, keeping sodium low inside the cell. Sodium then flows in from the gut through SGLT1 and drags glucose with it, against the glucose gradient: secondary active transport. Glucose leaves for the blood down its gradient through GLUT2.",
   "A gut lining cell between the gut lumen above and the blood below. On the gut side, sodium ions and glucose enter together through a co-transporter. On the blood side, a sodium-potassium pump moves three sodium ions out and two potassium ions in using ATP, and glucose leaves through a carrier protein.",
   ["Gut side: Na⁺ flows in from 140 to 12 mmol per dm³, down its gradient, through the SGLT1 co-transporter.",
    "Glucose enters through the same protein from 0.5 to 8 mmol per dm³, against its own gradient: the sodium gradient pays for it.",
    "Blood side: the Na⁺/K⁺ pump uses one ATP to move 3 Na⁺ out (12 to 145) and 2 K⁺ in (4 to 140), both against their gradients.",
    "Each cycle of the pump carries one more positive charge out than in, so the inside of the cell is left negative.",
    "Glucose leaves for the blood (8 to 5) by facilitated diffusion through GLUT2.",
    "Concentrations are illustrative: SGLT1 goes on absorbing glucose even when the gut holds less than the cell."],
   concUnit="mmol dm^{−3}", cell="cell",
   sides=[{"id": "lumen", "label": "gut lumen", "conc": {"Na⁺": 140, "glucose": 0.5}},
          {"id": "cell", "label": "gut lining cell", "conc": {"Na⁺": 12, "K⁺": 140, "glucose": 8}},
          {"id": "blood", "label": "blood", "conc": {"Na⁺": 145, "K⁺": 4, "glucose": 5}}],
   proteins={"sglt": "SGLT1 co-transporter", "pump": "Na⁺/K⁺ pump"},
   moves=[{"substance": "Na⁺", "kind": "cotransport", "from": "lumen", "to": "cell", "protein": "sglt"},
          {"substance": "glucose", "kind": "cotransport", "from": "lumen", "to": "cell", "protein": "sglt"},
          {"substance": "Na⁺", "label": "3 Na⁺", "count": 3, "kind": "active", "atp": True, "from": "cell", "to": "blood", "protein": "pump"},
          {"substance": "K⁺", "label": "2 K⁺", "count": 2, "kind": "active", "atp": True, "from": "blood", "to": "cell", "protein": "pump"},
          {"substance": "glucose", "kind": "carrier", "from": "cell", "to": "blood", "note": "carrier protein (GLUT2)"}],
   claims=[{"type": "netCharge", "protein": "pump", "out": 1}])

mk("u02-24", "bio-bulk-transport", "membrane", "Endocytosis and exocytosis",
   "Cargo too big for any channel or carrier crosses wrapped in membrane. A phagocyte engulfs a whole bacterium; receptors in clathrin-coated pits gather LDL particles; and secretory vesicles fuse with the membrane to release enzymes. All three use ATP.",
   "A phospholipid bilayer with a bacterium being engulfed by phagocytosis, an LDL particle taken in by receptor-mediated endocytosis, and digestive enzymes leaving the cell by exocytosis, each in a vesicle.",
   ["Phagocytosis: the membrane flows around a bacterium and encloses it in a vesicle, which then fuses with lysosomes.",
    "Receptor-mediated endocytosis: LDL particles carrying cholesterol bind receptors in clathrin-coated pits, which pinch off as vesicles.",
    "Exocytosis: a vesicle of digestive enzymes fuses with the plasma membrane and releases them outside, adding its membrane to the surface.",
    "All three use ATP to move vesicles and reshape the cytoskeleton."],
   sides=[{"id": "out", "label": "outside the cell"}, {"id": "in", "label": "cytoplasm"}],
   moves=[{"substance": "bacterium", "kind": "endocytosis", "atp": True, "from": "out", "to": "in", "note": "phagocytosis"},
          {"substance": "LDL particles", "kind": "endocytosis", "atp": True, "from": "out", "to": "in", "note": "receptor-mediated endocytosis"},
          {"substance": "digestive enzymes", "kind": "exocytosis", "atp": True, "from": "in", "to": "out", "note": "exocytosis"}])

# ---------------------------------------------------------------- stem cell potency (lineage: flow with potency checks)
LINE = [("zygote", "zygote", "totipotent", "every cell type, and the placenta", "a2"),
        ("inner cell mass", "inner cell mass", "pluripotent", "every body cell type, not the placenta", "a5"),
        ("haematopoietic stem cell", "haematopoietic stem cell", "multipotent", "all the blood cells", "a1"),
        ("erythroid progenitor", "erythroid progenitor", "unipotent", "red blood cells only", "a4"),
        ("red blood cell", "red blood cell", "specialised", "no nucleus: cannot divide", "a3")]
mk("u02-26", "bio-stem-cell-potency", "lineage", "Potency narrows as cells specialise",
   "Following one line of descent from the zygote to a red blood cell, each cell can make fewer kinds of cell than the one before. Bone marrow transplants use the multipotent haematopoietic stem cells; induced pluripotent stem cells are adult cells turned back to the pluripotent stage.",
   "Five boxes in order: zygote (totipotent), inner cell mass (pluripotent), haematopoietic stem cell (multipotent), erythroid progenitor (unipotent) and red blood cell (specialised).",
   [f"{a[0].upper() + a[1:]}: {p}, can make {w}." if p != "specialised" else f"{a[0].upper() + a[1:]}: specialised, with {w}." for _, a, p, w, _t in LINE],
   also=("u05-14",), layout="line",
   nodes=[{"id": f"p{i}", "label": a, "sub": f"{p}: {w}", "cell": c, "potency": p, "tone": t} for i, (c, a, p, w, t) in enumerate(LINE)],
   edges=[{"from": f"p{i}", "to": f"p{i + 1}"} for i in range(len(LINE) - 1)])

# ---------------------------------------------------------------- a signalling cascade (flow)
CASCADE = [("adrenaline", "first messenger: stays outside the cell"), ("G-protein-coupled receptor", "in the membrane: the hormone binds"),
           ("adenylyl cyclase", "switched on inside the membrane"), ("cyclic AMP", "second messenger, made inside the cell"),
           ("protein kinase A", "activated by cAMP"), ("chain of enzymes", "each activates many of the next"), ("glucose", "released from glycogen in the liver")]
mk("u02-28", "bio-adrenaline-cascade", "flow", "From one hormone to many glucose molecules",
   "Adrenaline never enters the liver cell: it binds a receptor in the membrane, and the cell makes its own second messenger, cyclic AMP. Each step activates many molecules of the next, so a few hormone molecules release vast numbers of glucose molecules.",
   "Seven boxes in order: adrenaline, a G-protein-coupled receptor, adenylyl cyclase, cyclic AMP, protein kinase A, a chain of enzymes, and glucose released from glycogen.",
   [f"{a[0].upper() + a[1:]}: {b}." for a, b in CASCADE],
   layout="grid", boxWidth=118, rowHeight=126,
   nodes=[{"id": f"c{i}", "label": a, "sub": b, "col": i % 4 if i < 4 else 3 - i % 4, "row": i // 4, "tone": "a4" if i == 0 else "a2" if i == 3 else "a1"} for i, (a, b) in enumerate(CASCADE)],
   edges=[{"from": f"c{i}", "to": f"c{i + 1}"} for i in range(len(CASCADE) - 1)])
