"""Biology diagrams for the lessons that needed new renderers (docs/visual-learning/BIOLOGY-REMAINING-RENDERERS.md).
Run: python3 scripts/diagrams/biology/gaps.py"""
from spec import mk

# ---------------------------------------------------------------- the fluid mosaic membrane
mk("u02-18", "bio-fluid-mosaic", "bilayer", "The fluid mosaic membrane",
   "Phospholipids form a bilayer with their hydrophilic heads towards the water on both sides and their hydrophobic tails inside, a core about 3.5 nm thick in a membrane about 5 nm thick here. Proteins float in it like tiles in a mosaic: integral proteins span it, peripheral proteins sit on one surface. Cholesterol sits between the phospholipids of animal membranes, and short carbohydrate chains on the outer surface form the glycocalyx. Drawn to scale.",
   "A cross-section of a membrane: two layers of phospholipids with heads outwards and tails inwards, a channel protein, a carrier protein and a receptor protein spanning it, cholesterol between the lipids, a peripheral protein on the cytosol side and carbohydrate chains on the outer surface only.",
   ["Phospholipids: heads (hydrophilic) face the water on both sides, tails (hydrophobic) face inwards.", "The hydrophobic core is about 3.5 nm thick in a membrane about 5 nm thick, drawn to scale.",
    "Integral proteins span the bilayer: a channel, a carrier and a receptor.", "A peripheral protein sits on one surface.", "Cholesterol sits between the phospholipids in animal membranes, restraining their movement.",
    "Carbohydrate chains on proteins and lipids are on the outer surface only: the glycocalyx, used in recognition and adhesion."],
   cell="animal", scale=14,
   proteins=[{"kind": "channel", "at": 0.2}, {"kind": "carrier", "at": 0.48}, {"kind": "receptor", "at": 0.78, "carb": True}],
   cholesterol=[0.1, 0.35, 0.64, 0.92], glycolipids=[0.29, 0.62], peripheral=[{"at": 0.35, "side": "inner"}],
   claims=[{"type": "count", "kind": "channel", "value": 1}, {"type": "count", "kind": "carrier", "value": 1}, {"type": "count", "kind": "receptor", "value": 1}])

# ---------------------------------------------------------------- lock and key against induced fit
mk("u03-24", "bio-induced-fit", "inducedfit", "Lock and key, and induced fit",
   "In the lock-and-key model the active site already has exactly the substrate's shape. In the induced-fit model, now preferred, the active site is not a perfect fit until the substrate binds, and then it changes shape to close round it, straining the substrate towards the transition state. After the reaction the products leave and the enzyme returns to its original shape, ready to be used again. Schematic, not to scale.",
   "Two rows of three pictures. Lock and key: a substrate fits an active site of the same width, which never changes. Induced fit: the active site is wider than the substrate, narrows round it when it binds, and widens again when the two products leave.",
   ["Lock and key: the active site has the substrate's shape before, during and after.", "Induced fit: the active site is wider than the substrate at first.", "When the substrate binds, the active site changes shape and closes round it.",
    "The substrate is split into two products, whose sizes add up to the substrate's.", "The products leave and the enzyme returns to its original shape."],
   substrate={"w": 40, "h": 46}, products=[{"w": 22}, {"w": 18}],
   models=[{"name": "lock and key", "before": 40, "after": 40}, {"name": "induced fit", "before": 58, "after": 40}])

# ---------------------------------------------------------------- water and hydrogen bonds
mk("u03-03", "bio-water-hbond", "hbond", "Water molecules and hydrogen bonds",
   "Oxygen pulls the shared electrons harder than hydrogen, so each water molecule is polar: δ− on the oxygen, δ+ on each hydrogen, with the hydrogens 104.5° apart. A δ+ hydrogen is attracted to the oxygen of a neighbouring molecule: a hydrogen bond, longer (0.177 nm) than the covalent O–H bond (0.096 nm) and much weaker (5–30 kJ per mole, against about 350 for C–C). A molecule can donate two and accept two, so up to four.",
   "Five water molecules: a central one donating two hydrogen bonds from its two hydrogens and accepting two from neighbours' hydrogens, drawn as dashed lines in line with the O–H bonds, with the 104.5 degree angle and the bond lengths given.",
   ["A water molecule is bent: H–O–H 104.5°.", "Oxygen is δ− and the hydrogens are δ+: the molecule is polar.", "A hydrogen bond links a δ+ hydrogen to the oxygen of another molecule, in line with the O–H bond.",
    "O–H covalent bond 0.096 nm; hydrogen bond 0.177 nm.", "The central molecule donates two hydrogen bonds and accepts two: four in all.", "Each is weak (5–30 kJ per mole) but together they give water its cohesion, high boiling point and solvent properties."],
   also=("u03-02",), scale=450, energies={"hbond": [5, 30], "cc": 350})

# ---------------------------------------------------------------- plant structures in section (templates)
def sec(lesson, id_, title, caption, alt, desc, template, labels, claims, also=()):
    mk(lesson, id_, "section", title, caption, alt, desc, also=also, template=template, labels=labels, claims=claims)

sec("u08-03", "bio-root-section", "A root in cross-section",
    "From the outside in: the epidermis (some cells make root hairs), the cortex, the endodermis with its Casparian strip, and the vascular cylinder. The xylem forms a star or cross, with the phloem between its arms. The Casparian strip blocks the apoplast pathway, so water must cross the endodermal cell membranes into the symplast.",
    "A circular root section: an outer epidermis with root hairs, a wide cortex of packed cells, a ring of endodermis with dark Casparian strip dots, and a centre where four xylem arms form a cross with four phloem patches between them.",
    ["Layers from the outside in: epidermis, cortex, endodermis, vascular cylinder.", "Root hairs are extensions of epidermal cells and increase the surface area for absorption.", "The Casparian strip is a waterproof band in the endodermal walls: it forces water into the symplast, so entry to the xylem is controlled.", "The xylem forms a star or cross in the centre, with the phloem between its arms."],
    "root", ["root hair", "epidermis", "cortex", "endodermis", "Casparian strip", "vascular cylinder", "xylem", "phloem"],
    [{"type": "order", "value": ["epidermis", "cortex", "endodermis", "vascular cylinder"], "text": "layers run epidermis, cortex, endodermis, vascular cylinder"},
     {"type": "fact", "id": "xylemStar", "text": "the xylem forms a star in the centre"}, {"type": "fact", "id": "phloemBetweenArms", "text": "the phloem sits between the arms of the xylem"}])

sec("u08-04", "bio-stem-section", "A eudicot stem in cross-section",
    "In a eudicot stem the vascular bundles form a ring between the cortex and the pith. In each bundle the xylem is on the inner side and the phloem on the outer side. (In a monocot the bundles are scattered.)",
    "A circular stem section: an epidermis, a cortex, a ring of eight vascular bundles each with a larger xylem circle on the inner side and a smaller phloem circle on the outer side, and a pith in the middle.",
    ["Layers from the outside in: epidermis, cortex, a ring of vascular bundles, pith.", "In each bundle xylem is on the inner side and phloem on the outer side.", "In a monocot stem the vascular bundles are scattered instead of in a ring."],
    "stem", ["epidermis", "cortex", "vascular bundle", "xylem", "phloem", "pith"],
    [{"type": "order", "value": ["epidermis", "cortex", "vascular bundles", "pith"], "text": "layers run epidermis, cortex, vascular bundles, pith"},
     {"type": "fact", "id": "xylemInner", "text": "xylem is on the inner side of each bundle"}, {"type": "fact", "id": "ring", "text": "the bundles form a ring"}],
    also=("u08-02", "u08-06"))

sec("u08-05", "bio-leaf-section", "A leaf in cross-section",
    "From the top: the waxy cuticle, the transparent upper epidermis, the palisade mesophyll (tightly packed, many chloroplasts), the spongy mesophyll (air spaces for gas diffusion) and the lower epidermis, which carries the stomata between pairs of guard cells. In a vein the xylem is on the upper side and the phloem below it.",
    "A leaf section from top to bottom: a thin cuticle, a row of upper epidermis cells, tall palisade cells with green chloroplasts, loosely packed spongy cells with gaps, and a lower epidermis with a pore between two guard cells; a vein in the middle with xylem above and phloem below.",
    ["Layers from the top: cuticle, upper epidermis, palisade mesophyll, spongy mesophyll, lower epidermis.", "Palisade cells are tightly packed and contain most of the chloroplasts.", "Spongy mesophyll has air spaces for gas diffusion.", "Stomata are in the lower epidermis, each between two guard cells.", "In a vein the xylem is on the upper side and the phloem on the lower side."],
    "leaf", ["cuticle", "upper epidermis", "palisade mesophyll", "spongy mesophyll", "lower epidermis", "stoma", "guard cell", "xylem", "phloem"],
    [{"type": "order", "value": ["cuticle", "upper epidermis", "palisade mesophyll", "spongy mesophyll", "lower epidermis"], "from": "the top", "to": "the bottom", "text": "layers run from the top to the bottom"},
     {"type": "fact", "id": "xylemUpper", "text": "in a vein the xylem is above the phloem"}, {"type": "fact", "id": "stomataLower", "text": "the stomata are in the lower epidermis"}])

sec("u08-07", "bio-xylem-vessel", "Xylem vessel elements",
    "Xylem vessel elements are dead cells joined end to end with no cross-walls between them, forming a continuous tube. The walls are thickened with lignin, often in rings or spirals, which waterproofs and strengthens them against collapse under tension. Pits are thin gaps that let water move sideways.",
    "Two vessel elements side by side, each a tall tube with horizontal bands of lignin along its wall and small oval pits, with the cross-wall between the upper and lower element open.",
    ["Vessel elements are dead: no nucleus or cytoplasm, so nothing obstructs flow.", "The end walls are gone, so the lumen is a continuous tube.", "Lignin thickens the wall in rings or spirals: strong and waterproof.", "Pits are gaps in the wall that let water move sideways between vessels."],
    "xylem", ["vessel element", "lignin", "pit", "no end wall"],
    [{"type": "fact", "id": "noEndWalls", "text": "no end walls: the lumen is continuous"}, {"type": "fact", "id": "deadCells", "text": "the cells are dead (no nucleus)"}, {"type": "fact", "id": "lignified", "text": "the walls are lignified"}])

sec("u08-08", "bio-phloem-cells", "Phloem: a sieve tube and its companion cells",
    "Sieve tube elements are living cells joined end to end, with sieve plates between them; they have few organelles and no nucleus. Each is served by a companion cell, which has a nucleus and many mitochondria and loads sucrose using ATP; plasmodesmata link the two.",
    "Two sieve tube elements stacked end to end with a perforated sieve plate between them, each with a companion cell beside it containing a nucleus and mitochondria, joined to it by narrow channels.",
    ["Sieve tube elements are living, with few organelles and no nucleus.", "Sieve plates are perforated cross-walls that let sap pass.", "Companion cells have a nucleus and many mitochondria: they supply ATP and load sucrose.", "Plasmodesmata link each companion cell to its sieve tube element."],
    "phloem", ["sieve tube element", "sieve plate", "companion cell", "plasmodesma", "nucleus", "mitochondria"],
    [{"type": "fact", "id": "sieveHasPlates", "text": "sieve plates lie between sieve tube elements"}, {"type": "fact", "id": "sieveNoNucleus", "text": "sieve tube elements have no nucleus"},
     {"type": "fact", "id": "companionNucleus", "text": "companion cells have a nucleus"}, {"type": "fact", "id": "companionMitochondria", "text": "companion cells have many mitochondria"}, {"type": "fact", "id": "linked", "text": "plasmodesmata link the cells"}])

sec("u08-28", "bio-flower-section", "A flower in section",
    "The anthers make pollen; the stigma receives it. The style leads down to the ovary, which contains the ovules. Petals attract insect pollinators. After fertilisation the ovule becomes the seed and the ovary the fruit.",
    "A flower cut lengthways: two petals and two sepals round a central carpel with a stigma on top, a style below it, and an ovary at the base holding an ovule, with two anthers on filaments either side.",
    ["Anthers on filaments make pollen.", "The stigma receives pollen; the style connects it to the ovary.", "The ovary contains ovules; each ovule contains an egg cell.", "Petals attract pollinators; sepals protect the bud."],
    "flower", ["petal", "sepal", "anther", "filament", "stigma", "style", "ovary", "ovule", "receptacle"],
    [{"type": "order", "value": ["stigma", "style", "ovary", "ovule"], "from": "the top of the carpel", "to": "its base", "text": "stigma, style, ovary, ovule from the top of the carpel"},
     {"type": "fact", "id": "pollenPath", "text": "the pollen tube grows down from stigma through style to ovary"}, {"type": "fact", "id": "ovuleInOvary", "text": "the ovule is inside the ovary"}],
    also=("u08-29",))

sec("u08-30", "bio-seed-section", "Seeds: eudicot and monocot",
    "A seed has a testa, an embryo (radicle and plumule) and a food store. A eudicot seed such as a bean has two cotyledons, which hold the food; a monocot seed such as maize has one cotyledon and stores food in the endosperm. The micropyle is where the pollen tube entered; water enters there at germination.",
    "Two seeds side by side. A bean has a thick testa round two large cotyledons, with a plumule at the top and a radicle at the bottom. A maize grain has a testa round a large food store, the endosperm, with a single small cotyledon, plumule and radicle at one side.",
    ["The testa protects the embryo.", "The embryo is the radicle (young root) and plumule (young shoot) on the cotyledon(s).", "Eudicot: two cotyledons that store food.", "Monocot: one cotyledon; food stored in the endosperm."],
    "seed", ["testa", "cotyledon", "plumule", "radicle", "micropyle", "endosperm", "single cotyledon"],
    [{"type": "fact", "id": "eudicotTwoCotyledons", "text": "a eudicot seed has two cotyledons"}, {"type": "fact", "id": "monocotOneCotyledon", "text": "a monocot seed has one cotyledon"},
     {"type": "fact", "id": "eudicotStoreInCotyledons", "text": "a eudicot stores food in its cotyledons"}, {"type": "fact", "id": "monocotStoreInEndosperm", "text": "a monocot stores food in its endosperm"}])

# ---------------------------------------------------------------- tracts of the human body (flows with route checks)
chain = lambda prefix, n: [{"from": f"{prefix}{i}", "to": f"{prefix}{i + 1}"} for i in range(n - 1)]
CIRC = [("right heart", "deoxygenated", "a1", "receives blood from the body"), ("pulmonary artery", "deoxygenated", "a1", "carries it to the lungs"), ("lungs", "exchange", "a4", "blood gains oxygen"),
        ("pulmonary vein", "oxygenated", "a2", "carries it back"), ("left heart", "oxygenated", "a2", "pumps it at high pressure"), ("aorta", "oxygenated", "a2", "carries it to the body"),
        ("body tissues", "exchange", "a4", "blood gives up oxygen"), ("vena cava", "deoxygenated", "a1", "returns it to the heart")]
mk("u07-16", "bio-double-circulation", "tract", "The double circulation",
   "Blood passes through the heart twice in each complete circuit. The pulmonary circuit takes oxygen-poor blood from the right heart to the lungs and back to the left heart; the systemic circuit takes oxygen-rich blood from the left heart to the body tissues and back to the right heart. Keeping the two circuits apart lets the systemic circuit run at high pressure without damaging the delicate lungs.",
   "A loop of eight boxes: right heart, pulmonary artery, lungs, pulmonary vein, left heart, aorta, body tissues and vena cava, with the oxygen-poor boxes in blue, the oxygen-rich ones in red and the lungs and body tissues, where gases are exchanged, in green.",
   ["Pulmonary circulation: right heart to lungs and back to the left heart.", "Systemic circulation: left heart to body tissues and back to the right heart.", "Blood passes through the heart twice in each complete circuit.",
    "Blue boxes carry oxygen-poor blood and red boxes oxygen-rich blood; the lungs and the body tissues are where the exchange happens.", "A double circulation allows high pressure in the systemic circuit while protecting the delicate lungs."],
   tract="circulation", layout="grid", boxWidth=118, rowHeight=130,
   nodes=[{"id": f"c{i}", "label": a, "sub": d, "is": a, "blood": b, "tone": t, "col": i % 4 if i < 4 else 7 - i, "row": i // 4} for i, (a, b, t, d) in enumerate(CIRC)], edges=chain("c", 8) + [{"from": "c7", "to": "c0"}])

AIR = [("nose", "warms, moistens and filters the air"), ("pharynx", "the throat, shared with the gut"), ("larynx", "the voice box"), ("trachea", "held open by C-shaped rings of cartilage"),
       ("bronchi", "two, one to each lung"), ("bronchioles", "many; smooth muscle in their walls can constrict"), ("alveoli", "air sacs where gas exchange happens")]
mk("u07-17", "bio-airway", "tract", "The path of air to the alveoli",
   "Air enters through the nose or mouth, then passes the pharynx and larynx into the trachea, which divides into two bronchi and then many bronchioles that end in the alveoli, where gas exchange happens. Mucus from goblet cells traps particles and cilia sweep it up to the throat.",
   "A line of seven boxes in order: nose, pharynx, larynx, trachea, bronchi, bronchioles and alveoli, each with a short note on what it does.",
   ["Air enters through the nose and mouth, then passes the pharynx and larynx.", "The trachea is supported by C-shaped rings of cartilage.", "It divides into two bronchi, then many bronchioles.", "Bronchioles end in alveoli, where gas exchange happens.", "Goblet cells make mucus that traps particles; cilia sweep it upwards."],
   tract="airway", layout="grid", boxWidth=118, rowHeight=118,
   nodes=[{"id": f"a{i}", "label": a, "sub": d, "is": a, "tone": "a5" if a == "alveoli" else "a1", "col": i % 4 if i < 4 else 3 - i % 4, "row": i // 4} for i, (a, d) in enumerate(AIR)], edges=chain("a", 7))

GUT = [("mouth", "teeth chew; saliva has amylase"), ("oesophagus", "peristalsis moves the food"), ("stomach", "churns; hydrochloric acid and pepsin"), ("small intestine", "the main site of digestion and absorption"),
       ("large intestine", "absorbs water; makes faeces"), ("rectum", "stores the faeces")]
mk("u07-21", "bio-gut", "tract", "The path of food through the gut",
   "Food passes from the mouth along the oesophagus to the stomach, the small intestine, the large intestine and the rectum. The liver, gall bladder and pancreas are accessory organs: food never passes through them, but they secrete into the small intestine. Most digestion and absorption of nutrients happens in the small intestine.",
   "Six boxes in order: mouth, oesophagus, stomach, small intestine, large intestine and rectum; a separate box for the accessory organs (liver, gall bladder and pancreas) with a dashed arrow into the small intestine.",
   ["Mouth: teeth chew food; saliva contains amylase.", "Oesophagus: moves food by peristalsis.", "Stomach: churns food; secretes hydrochloric acid and pepsin.", "Small intestine: the main site of digestion and absorption.", "Large intestine: absorbs water and forms faeces; the rectum stores them.", "Accessory organs (liver, gall bladder, pancreas): food does not pass through them."],
   tract="gut", layout="grid", boxWidth=118, rowHeight=118,
   nodes=[{"id": f"g{i}", "label": a, "sub": d, "is": a, "tone": "a5" if a == "small intestine" else "a1", "col": i % 3 if i < 3 else 5 - i, "row": i // 3} for i, (a, d) in enumerate(GUT)]
         + [{"id": "acc", "label": "accessory organs", "sub": "liver, gall bladder and pancreas", "is": "accessory organs", "tone": "a3", "col": 1, "row": 2}],
   edges=chain("g", 6) + [{"from": "acc", "to": "g3", "dashed": True, "label": "secrete into"}])

# ---------------------------------------------------------------- cell junctions
sec("u02-29", "bio-cell-junctions", "Tight junctions, desmosomes, gap junctions and plasmodesmata",
    "A tight junction seals the gap between animal cells so that nothing leaks between them; a desmosome joins two cells through cadherins anchored to intermediate filaments, so that pulling forces are spread through the tissue; a gap junction is a channel of connexins that joins the cytoplasm of the two cells. In plants, plasmodesmata are channels through the cell walls lined with plasma membrane. Drawn schematically: the sizes are not to scale.",
    "Four panels, each with two neighbouring cells. Tight junction: the membranes meet at the top and a dashed arrow trying to pass between the cells is blocked. Desmosome: dense plates inside each cell joined across the gap by cadherin lines, with filaments running into each cell. Gap junction: a channel through both membranes joining the cytoplasm of the two cells. Plasmodesma: two plant cells with walls and a middle lamella joined by a membrane-lined channel.",
    ["Tight junctions seal the gap, so substances must pass through the cells (gut lining, blood–brain barrier).", "Desmosomes and adherens junctions link cells through cadherins attached to the cytoskeleton, spreading mechanical stress.", "Gap junctions are channels of connexin that join the cytoplasm of neighbouring cells and let ions and small molecules (up to about 1 kDa) pass.", "Plasmodesmata are channels through plant cell walls, lined with plasma membrane.", "Schematic: the sizes are not to scale."],
    "junctions", ["claudin and occludin", "cadherin", "plaque", "intermediate filament", "connexin channel", "plasmodesma", "cell wall", "middle lamella"],
    [{"type": "fact", "id": "sealed", "text": "at a tight junction the gap between the cells is closed"}, {"type": "fact", "id": "cadherinSpansGap", "text": "the cadherins are long enough to reach across the gap"},
     {"type": "fact", "id": "anchoredToFilaments", "text": "each desmosome plaque is anchored to intermediate filaments in both cells"}, {"type": "fact", "id": "channelLinksCytoplasm", "text": "the gap junction channel reaches across the gap and is open"},
     {"type": "fact", "id": "plasmodesmaSpansWalls", "text": "the plasmodesma channel is long enough to cross both walls and the middle lamella"}])

# ---------------------------------------------------------------- fertilisation, cleavage and the blastocyst
mk("u05-16", "bio-fertilisation", "fertilisation", "Fertilisation in mammals",
   "A capacitated sperm reaches the zona pellucida; the acrosome reaction releases enzymes that digest a path through it; the sperm and egg membranes fuse and the sperm nucleus enters; the cortical reaction hardens the zona so that no further sperm can enter (preventing polyspermy); the egg completes meiosis II and the two haploid nuclei combine. In humans 23 + 23 = 46 chromosomes.",
   "Five small pictures of an egg inside its zona pellucida: a sperm at the zona; the acrosome reaction opening a gap in the zona; the sperm fused with the egg and its nucleus inside; the cortical granules releasing enzymes while a second sperm is blocked outside; and the two nuclei, 23 chromosomes each, combining.",
   ["Capacitated sperm reach the egg's zona pellucida.", "The acrosome reaction releases enzymes that digest the zona pellucida.", "The sperm membrane fuses with the egg membrane and the sperm nucleus enters.", "The cortical reaction hardens the zona pellucida, so that no more sperm bind or enter: polyspermy is prevented.",
    "The egg completes meiosis II and the two haploid nuclei combine: 23 + 23 = 46 chromosomes in humans.", "Schematic: the sizes are not to scale."],
   species="human", haploid=23, diploid=46,
   steps=[{"id": "approach", "title": "Sperm at the zona", "note": "a capacitated sperm binds the zona pellucida", "inside": 0, "blocked": 0},
          {"id": "acrosome", "title": "Acrosome reaction", "note": "enzymes digest a path through the zona", "inside": 0, "blocked": 0},
          {"id": "fusion", "title": "Fusion", "note": "the membranes fuse and the sperm nucleus enters", "inside": 1, "blocked": 0},
          {"id": "cortical", "title": "Cortical reaction", "note": "the zona hardens: other sperm are blocked", "inside": 1, "blocked": 1},
          {"id": "combine", "title": "Nuclei combine", "note": "two haploid nuclei form a diploid zygote", "inside": 1, "blocked": 0}])

mk("u05-17", "bio-cleavage", "cleavage", "Cleavage: from zygote to blastocyst",
   "The zygote divides by rapid mitosis without growing, so each division halves the size of the cells (blastomeres) while the embryo stays the same size. In humans there are two cells on day 1, a morula of about 16 cells on day 3 and a blastocyst on day 5, with an outer trophoblast, which forms part of the placenta, and an inner cell mass, which forms the embryo.",
   "Six stages in a row inside the same size of zona pellucida: the zygote, then two, four, eight and about sixteen cells that get smaller at each division, then a blastocyst with an outer ring of trophoblast, a fluid-filled cavity and a small cluster of inner cell mass cells against one side.",
   ["Cleavage is rapid mitosis without growth: the cells (blastomeres) get smaller at each division.", "Two cells on day 1; a solid morula of about 16 cells on day 3; a blastocyst on day 5.", "The blastocyst has an outer trophoblast, a fluid-filled cavity and an inner cell mass.", "The trophoblast forms part of the placenta; the inner cell mass forms the embryo.", "Schematic cross-sections: every cell in a stage is drawn with the same share of the area."],
   R=36, stages=[{"name": "zygote", "n": 1}, {"name": "2 cells", "n": 2, "day": 1}, {"name": "4 cells", "n": 4}, {"name": "8 cells", "n": 8}, {"name": "morula", "n": 16, "day": 3}, {"name": "blastocyst", "n": 0, "kind": "blastocyst", "day": 5}])

# ---------------------------------------------------------------- flow cytometry (seeded simulation)
mk("u14-16", "bio-flow-cytometry", "cytometry", "Flow cytometry: gating and counting",
   "Cells pass one at a time through a laser. Forward scatter (size) and side scatter (granularity) separate the populations of white blood cells; a gate on the scatter plot selects the lymphocytes; the gated cells are then counted for the fluorescent anti-CD4 label, using unstained cells as a control to set the threshold for a positive signal. The events are simulated from a fixed random seed, so the percentages are illustrative, not patient data.",
   "Two plots. Left: a scatter plot of side scatter against forward scatter with three clusters of cells, lymphocytes at low size and low granularity, monocytes larger, and granulocytes the most granular, with a rectangular gate round the lymphocytes. Right: a histogram of anti-CD4 fluorescence for the gated cells beside the unstained control, with a dashed threshold and the percentage of CD4-positive cells to the right of it.",
   ["Cells flow in single file past a laser.", "Forward scatter indicates cell size; side scatter indicates internal complexity or granularity.", "A gate selects a population of interest, here lymphocytes, as a percentage of all events.", "Fluorescent anti-CD4 antibody labels CD4-positive cells; unstained cells set the threshold for a positive signal.", "The data are simulated (a fixed random seed) and the values are illustrative."],
   seed=14, n=1800,
   populations=[{"name": "lymphocytes", "fsc": [300, 42], "ssc": [200, 38], "frac": 0.35}, {"name": "monocytes", "fsc": [500, 55], "ssc": [390, 55], "frac": 0.07}, {"name": "granulocytes", "fsc": [470, 65], "ssc": [690, 90], "frac": 0.58}],
   gate={"fsc": [190, 420], "ssc": [90, 320], "population": "lymphocytes"},
   cd4={"frac": 0.40, "neg": [1.2, 0.28], "pos": [2.9, 0.3]},
   claims=[{"type": "gate", "percent": 35, "tol": 3}, {"type": "positive", "percent": 40, "tol": 4}])

# ================================================================ extras: other lessons that were waiting on a renderer
# ---------------------------------------------------------------- gene flow (two populations, symmetric migration)
GF1, GF2 = "0.5+0.4*exp(x*log(0.9))", "0.5-0.4*exp(x*log(0.9))"
mk("u06-08", "bio-gene-flow", "graph", "Gene flow makes populations more alike",
   "Two populations start with different allele frequencies (0.9 and 0.1). Without gene flow the difference stays. If 5% of each population is replaced by migrants from the other every generation, the difference shrinks by a factor of 0.9 each generation (1 − 2m) and the two frequencies converge on 0.5. A simple model with no selection or drift: the migration rate is illustrative.",
   "A graph of allele frequency over 40 generations. Two dashed reference lines at 0.9 and 0.1 show where the populations would stay with no gene flow. Two curves start at 0.9 and 0.1 and converge towards 0.5 with gene flow.",
   ["Gene flow transfers alleles between populations, making them more similar.", "Without gene flow the populations can stay different, and may diverge.", "Model: migration m = 0.05 each way each generation; the difference falls by a factor (1 − 2m) = 0.9 per generation.", "No selection or drift in this model; the rate is illustrative."],
   range={"x": [0, 40], "y": [0, 1]}, ticks=[[0, 10, 20, 30, 40], [0, 0.5, 1]], height=[340, 320], xLabelBelow=True, axisLabels=["generation", "frequency of allele A"],
   curves=[{"expr": GF1, "colour": "a1"}, {"expr": GF2, "colour": "a2"}],
   marks=[{"y": 0.9, "label": "no gene flow: stays 0.9"}, {"y": 0.1, "label": "no gene flow: stays 0.1"}],
   legend=[["population 1", "a1"], ["population 2", "a2"]], legendData=[24, 0.62],
   checks=[{"type": "point", "expr": GF1, "x": 0, "y": 0.9, "name": "population 1 starts at 0.9"}, {"type": "point", "expr": GF2, "x": 0, "y": 0.1, "name": "population 2 starts at 0.1"},
           {"type": "value", "expr": GF1, "x": 40, "between": [0.5, 0.52], "name": "after 40 generations population 1 has almost reached 0.5"}, {"type": "value", "expr": GF2, "x": 40, "between": [0.48, 0.5], "name": "and population 2 has almost reached 0.5"},
           {"type": "slope", "expr": GF1, "x": 5, "value": -0.0249, "name": "population 1 is falling towards 0.5: gradient 0.4 × ln 0.9 × 0.9^5 = −0.025 per generation at generation 5"}])

# ---------------------------------------------------------------- the water cycle
WN = [{"id": "atmosphere", "label": "water vapour and clouds", "tone": "a3"}, {"id": "oceans", "label": "oceans", "tone": "a1"}, {"id": "rivers and lakes", "label": "rivers and lakes", "tone": "a1"},
      {"id": "land", "label": "land surface", "tone": "a5"}, {"id": "soil", "label": "soil water", "tone": "a2"}, {"id": "plants", "label": "plants", "tone": "good"}]
mk("u11-14", "bio-water-cycle", "biocycle", "The water cycle",
   "Water evaporates from oceans, lakes and soil, and plants return it to the air by transpiration. Water vapour condenses to form clouds, and precipitation (rain, snow and hail) returns it to the oceans and the land. On land it infiltrates into the soil or runs off into rivers, and roots take up soil water for the plants to transpire. Groundwater and ice are also stores, but they are not drawn here.",
   "A ring of six stores joined by arrows: oceans to the atmosphere by evaporation; the atmosphere back to the oceans and to the land by condensation and precipitation; land to rivers and lakes by runoff and to soil by infiltration; rivers and lakes to the oceans; soil to plants by root uptake; and plants to the atmosphere by transpiration.",
   ["Evaporation from oceans, lakes and soil; transpiration from plants.", "Condensation forms clouds; precipitation returns water to the oceans and the land.", "Infiltration into the soil, runoff into rivers; rivers flow to the sea.", "Plants take up soil water through their roots and return it to the air by transpiration."],
   cycle="water", nodes=WN,
   edges=[{"from": "oceans", "to": "atmosphere", "process": "evaporation", "colour": "a3"}, {"from": "atmosphere", "to": "oceans", "process": "condensation and precipitation", "colour": "a1"}, {"from": "atmosphere", "to": "land", "process": "condensation and precipitation", "colour": "a4"},
          {"from": "land", "to": "rivers and lakes", "process": "runoff", "colour": "a5"}, {"from": "rivers and lakes", "to": "oceans", "process": "river flow", "colour": "a1"}, {"from": "land", "to": "soil", "process": "infiltration", "colour": "a2"},
          {"from": "soil", "to": "plants", "process": "root uptake", "colour": "good"}, {"from": "plants", "to": "atmosphere", "process": "transpiration", "colour": "good"}])

# ---------------------------------------------------------------- chromosomal abnormalities (numbers)
mk("u04-32", "bio-karyotype-counts", "karyotype", "Counting chromosomes: aneuploidy",
   "A typical human cell has 46 chromosomes: 44 autosomes and two sex chromosomes. Non-disjunction gives gametes with an extra or a missing chromosome, so the offspring have, for example, three copies of chromosome 21 (trisomy 21, Down syndrome, 47,XX,+21 or 47,XY,+21), only one sex chromosome (Turner syndrome, 45,X) or an extra X (Klinefelter syndrome, 47,XXY). Aneuploidy is an abnormal number of one chromosome.",
   "Four rows. Typical: two copies of chromosome 21 and either XX or XY, 46 chromosomes. Down syndrome: three copies of chromosome 21, 47. Turner syndrome: a single X, 45. Klinefelter syndrome: XXY, 47.",
   ["Typical: 46 chromosomes (46,XX or 46,XY).", "Down syndrome: trisomy 21, three copies of chromosome 21: 47,XX,+21.", "Turner syndrome: 45,X.", "Klinefelter syndrome: 47,XXY.", "Aneuploidy is an abnormal number of one chromosome; non-disjunction in meiosis is its usual cause."],
   cases=[{"name": "typical female", "sex": "XX", "extra": {}, "total": 46, "notation": "46,XX"}, {"name": "Down syndrome", "sex": "XX", "extra": {"21": 1}, "total": 47, "notation": "47,XX,+21"},
          {"name": "Turner syndrome", "sex": "X", "extra": {}, "total": 45, "notation": "45,X"}, {"name": "Klinefelter syndrome", "sex": "XXY", "extra": {}, "total": 47, "notation": "47,XXY"}])

# ---------------------------------------------------------------- a plasmid vector map
mk("u12-05", "bio-plasmid-map", "plasmidmap", "An engineered plasmid vector",
   "An engineered vector is a small circular DNA molecule with an origin of replication (so it is copied in the host), a selectable marker such as an ampicillin resistance gene, a multiple cloning site with unique restriction sites for inserting a gene, and sometimes a promoter to drive its expression. This map is illustrative, not a named plasmid.",
   "A circle labelled 3,000 base pairs with four coloured arcs: an origin of replication, an ampicillin resistance gene, a promoter and a short multiple cloning site with three unique cutting sites, EcoRI, BamHI and HindIII.",
   ["Origin of replication: the plasmid is copied independently in the host.", "Selectable marker (here an ampicillin resistance gene): only cells that took up the plasmid grow on antibiotic.", "Multiple cloning site: unique restriction sites for inserting a gene.", "Promoter: drives expression of the inserted gene.", "Digesting with two enzymes cuts out a small fragment; the fragments add up to the plasmid's length."],
   name="illustrative vector", length=3000,
   features=[{"name": "ori", "type": "ori", "start": 100, "end": 700}, {"name": "AmpR", "type": "marker", "start": 1100, "end": 1961}, {"name": "promoter", "type": "promoter", "start": 2250, "end": 2350}, {"name": "MCS", "type": "mcs", "start": 2400, "end": 2460}],
   sites=[{"enzyme": "EcoRI", "pos": 2410}, {"enzyme": "BamHI", "pos": 2430}, {"enzyme": "HindIII", "pos": 2450}], digest=["EcoRI", "HindIII"])

# ---------------------------------------------------------------- habitat fragmentation on a grid
def grid(rows, cols, blocks):
    g = [["." for _ in range(cols)] for _ in range(rows)]
    for r0, r1, c0, c1 in blocks:
        for r in range(r0, r1 + 1):
            for c in range(c0, c1 + 1): g[r][c] = "#"
    return ["".join(r) for r in g]
FRAG4 = [(1, 4, 1, 6), (1, 4, 9, 14), (6, 9, 1, 6), (6, 9, 9, 14)]
mk("u11-24", "bio-habitat-fragmentation", "fragment", "Habitat fragmentation and edge effects",
   "The same area of habitat as one block or as four small patches. Fragmenting it turns interior habitat into edge: the proportion of core habitat falls from about 63% to about 33%, although the habitat area is the same, and the patches are isolated. A narrow corridor joins the patches again, though corridor cells are all edge. An illustrative grid, not a real landscape.",
   "Three small maps. One block of 96 habitat cells with a large dark core; the same 96 cells split into four patches, most of them now edge; and the four patches joined by narrow corridors into one connected patch.",
   ["One block of habitat has a large core and a small share of edge.", "The same area split into four patches is mostly edge: edge effects (light, temperature, wind and predators) reach most of it, so species that need the interior decline.", "Corridors reconnect the patches, but they are all edge and add only a little habitat.", "Illustrative grid: 96 habitat cells in each of the first two maps."],
   panels=[{"name": "continuous", "grid": grid(11, 16, [(1, 8, 2, 13)])}, {"name": "fragmented", "grid": grid(11, 16, FRAG4)}, {"name": "joined by corridors", "grid": grid(11, 16, FRAG4 + [(2, 2, 7, 8), (7, 7, 7, 8), (5, 5, 3, 3), (5, 5, 11, 11)])}],
   claims=[{"type": "sameArea", "a": 0, "b": 1}, {"type": "patches", "panel": 0, "value": 1}, {"type": "patches", "panel": 1, "value": 4}, {"type": "moreEdge", "a": 0, "b": 1}, {"type": "lessCore", "a": 0, "b": 1}, {"type": "connected", "panel": 2}])

# ---------------------------------------------------------------- scale-free biological networks
mk("u13-18", "bio-scale-free-network", "bionetwork", "A network with hubs",
   "In a network, nodes are molecules and edges are interactions. The number of connections of a node is its degree. In a scale-free network most nodes have few connections and a few hubs have many. This one is simulated by adding each new node to a network with a preference for nodes that already have many links; many biological networks look like this, which is why removing a hub (as with p53 in the lesson) can disrupt so much.",
   "A network of 36 circles joined by lines, with a few large orange hubs each joined to many small blue circles. A bar chart on the right shows many nodes with 2 or 3 links and a long tail up to the largest hub.",
   ["Nodes are molecules; edges are interactions.", "Degree: the number of connections of a node.", "Hubs are highly connected nodes; most nodes have few links.", "Simulated by preferential attachment: not real interaction data."],
   seed=5, n=36, m=2)

# ---------------------------------------------------------------- templates: virion, horizontal transfer, chromatin
sec("u09-08", "bio-virion", "Virion structure",
    "A virion has a genome of DNA or RNA inside a protein coat, the capsid, which is made of capsomeres. Some viruses also have a lipid envelope from the host membrane, with glycoproteins that stick out of it. A virus has no cell, no ribosomes and no metabolism. Typical sizes are 20–300 nm; the drawing is not to scale.",
    "Two virions. A non-enveloped one: a hexagonal capsid enclosing a coiled genome. An enveloped one: a round lipid envelope with spikes of glycoprotein, enclosing a capsid and a coiled genome.",
    ["Genome of DNA or RNA, single- or double-stranded.", "A protein capsid made of capsomeres.", "Some viruses have a lipid envelope from the host membrane, with glycoproteins.", "No cell, ribosomes or metabolism: viruses replicate only inside host cells."],
    "virion", ["genome", "capsid", "envelope", "glycoprotein"],
    [{"type": "order", "value": ["envelope", "capsid", "genome"], "from": "the outside", "to": "the centre", "text": "envelope, capsid, genome from the outside in"},
     {"type": "fact", "id": "capsidEnclosesGenome", "text": "the capsid encloses the genome"}, {"type": "fact", "id": "envelopeEnclosesCapsid", "text": "the envelope encloses the capsid"},
     {"type": "fact", "id": "glycoproteinsInEnvelope", "text": "the glycoproteins stick out of the envelope"}, {"type": "fact", "id": "noCellularMachinery", "text": "no ribosomes or other cell machinery are drawn"}])

sec("u09-07", "bio-horizontal-transfer", "Three ways bacteria exchange genes",
    "In transformation a bacterium takes up free DNA from its surroundings. In transduction a bacteriophage carries DNA from one bacterium to another. In conjugation two bacteria join through a pilus and usually pass a plasmid through it. All three are horizontal transfer, unlike vertical transfer from parent to offspring.",
    "Three panels. Transformation: free DNA fragments above a bacterium and an arrow into it. Transduction: a bacteriophage between two bacteria with an arrow to the lower one. Conjugation: two bacteria joined by a pilus, a plasmid shown between them.",
    ["Transformation: uptake of free DNA from the environment.", "Transduction: transfer of DNA by a bacteriophage.", "Conjugation: direct transfer, usually of a plasmid, through a pilus.", "These spread antibiotic resistance and virulence genes between bacteria."],
    "hgt", ["free DNA", "recipient cell", "bacteriophage", "pilus", "plasmid"],
    [{"type": "order", "value": ["transformation", "transduction", "conjugation"], "from": "the left", "to": "the right", "text": "transformation, transduction, conjugation from left to right"},
     {"type": "fact", "id": "transformationNeedsNoContact", "text": "transformation takes up free DNA and needs no donor cell"}, {"type": "fact", "id": "transductionUsesPhage", "text": "transduction uses a bacteriophage"}, {"type": "fact", "id": "conjugationUsesPilus", "text": "conjugation needs contact through a pilus"}])

sec("u04-16", "bio-chromatin-marks", "Chromatin marks and gene expression",
    "Histone acetylation loosens chromatin, which usually activates genes: the promoter is open to RNA polymerase. DNA methylation (methyl groups on cytosine, often near a promoter) and some histone methylation usually silence genes: the chromatin is tight and RNA polymerase cannot reach the promoter. These marks can be reversed and are copied when cells divide.",
    "Two rows of nucleosomes on DNA. The upper row is spread out, the histone tails carry acetyl groups and RNA polymerase sits on the promoter. The lower row is packed tightly, the DNA near the promoter carries methyl groups, and RNA polymerase is crossed out.",
    ["Histone acetylation loosens chromatin and usually activates genes.", "DNA methylation, often near promoters, usually silences genes.", "Deacetylation and some methylation tighten chromatin, silencing genes.", "Marks can be reversed, so drugs that block DNA methyltransferases or histone deacetylases are used in some cancers."],
    "chromatin", ["nucleosome", "histone tail", "acetyl group", "methyl group", "promoter", "RNA polymerase"],
    [{"type": "fact", "id": "acetylationLoosens", "text": "the acetylated chromatin is more open than the silenced chromatin"}, {"type": "fact", "id": "methylationOnSilenced", "text": "methyl groups are on the silenced gene only"}, {"type": "fact", "id": "polymeraseOnlyOnOpen", "text": "RNA polymerase reaches the promoter only on the open chromatin"}])
