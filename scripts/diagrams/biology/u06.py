"""Biology unit 6, Evolution: diagram specs. Run: python3 scripts/diagrams/biology/u06.py"""
from spec import mk

def snake_nodes(items, prefix, tones, per=3):
    """grid nodes reading left to right, then right to left on the next row"""
    return [{"id": f"{prefix}{i}", "label": a, "sub": b, "tone": tones[i % len(tones)], "col": i % per if (i // per) % 2 == 0 else per - 1 - i % per, "row": i // per} for i, (a, b) in enumerate(items)]
chain = lambda prefix, n: [{"from": f"{prefix}{i}", "to": f"{prefix}{i + 1}"} for i in range(n - 1)]

# ---------------------------------------------------------------- the conditions for natural selection
COND = [("variation", "individuals in a population differ"), ("heritability", "some of the variation is inherited"), ("overproduction", "more offspring are born than can survive"),
        ("differential survival", "individuals with advantageous traits leave more offspring"), ("allele frequencies change", "advantageous alleles become more common")]
mk("u06-03", "bio-selection-conditions", "flow", "What natural selection needs",
   "Natural selection follows when a population has variation, some of it heritable, and produces more offspring than survive, so that individuals with advantageous traits leave more offspring. It acts on phenotypes but changes allele frequencies, so populations evolve, not individuals.",
   "Five boxes in order: variation, heritability, overproduction, differential survival and reproduction, and changing allele frequencies.",
   [f"{a[0].upper() + a[1:]}: {b}." for a, b in COND],
   layout="grid", boxWidth=126, rowHeight=118, nodes=snake_nodes(COND, "c", ["a1", "a1", "a1", "a3", "a2"]), edges=chain("c", 5))

# ---------------------------------------------------------------- three kinds of selection
pdf = lambda m, s: f"exp(-(x-{m})^2/(2*{s}^2))/({s}*sqrt(2*3.14159265))"
BEFORE = pdf(50, 8)
def selection(id, title, caption, alt, desc, after, label, checks, **extra):
    mk("u06-03", id, "graph", title, caption, alt, desc, range={"x": [20, 80], "y": [0, 0.125]}, ticks=[[30, 40, 50, 60, 70], []], height=[340, 320], xLabelBelow=True,
       axisLabels=["value of the trait", "proportion of the population"],
       curves=[{"expr": BEFORE, "colour": "a1", "dash": "6 5", "width": 2.6}, {"expr": after, "colour": "a2"}],
       legend=[["before selection", "a1", "6 5"], [label, "a2"]], legendData=[21, 0.12], checks=checks, **extra)
selection("bio-selection-directional", "Directional selection",
          "One extreme is favoured, so the whole distribution shifts and the mean moves towards it. Antibiotic resistance in bacteria is an example.",
          "Two bell curves of a trait: a dashed curve before selection centred on 50 and a solid curve after directional selection centred on 58.",
          ["Before: the trait is spread around a mean of 50.", "Directional selection favours high values, so after selection the mean has moved to 58.", "The spread (standard deviation) is unchanged."],
          pdf(58, 8), "after directional selection",
          [{"type": "max", "expr": BEFORE, "domain": [20, 80], "x": 50, "y": 0.049868, "name": "before selection the mean is 50"},
           {"type": "max", "expr": pdf(58, 8), "domain": [20, 80], "x": 58, "y": 0.049868, "name": "after directional selection the mean has moved to 58 and the curve keeps its shape"},
           {"type": "area", "expr": pdf(58, 8), "from": 0, "to": 120, "value": 1, "tol": 0.002, "name": "both curves describe the whole population: area 1"}])
selection("bio-selection-stabilising", "Stabilising selection",
          "Intermediate values are favoured, so the extremes are removed. The mean stays put but the variation falls and the curve narrows and rises. Human birth weight is an example.",
          "Two bell curves of a trait centred on 50: a dashed curve before selection and a narrower, taller solid curve after stabilising selection.",
          ["Before: the trait is spread around a mean of 50.", "Stabilising selection favours intermediate values and removes both extremes.", "After: the mean is still 50 but the spread is smaller, so the peak is higher."],
          pdf(50, 5), "after stabilising selection",
          [{"type": "max", "expr": pdf(50, 5), "domain": [20, 80], "x": 50, "y": 0.079788, "name": "after stabilising selection the mean is unchanged at 50 and the peak is higher (0.080, against 0.050 before)"},
           {"type": "value", "expr": pdf(50, 5), "x": 35, "between": [0, 0.0045], "name": "the low extreme (35) is much rarer after selection than before"},
           {"type": "value", "expr": BEFORE, "x": 35, "between": [0.008, 0.009], "name": "before selection the low extreme (35) was more common (about 0.009)"},
           {"type": "area", "expr": pdf(50, 5), "from": 0, "to": 100, "value": 1, "tol": 0.002, "name": "the population is the same size: area 1"}])
MIX = f"0.5*{pdf(41, 5)}+0.5*{pdf(59, 5)}"
selection("bio-selection-disruptive", "Disruptive selection",
          "Both extremes are favoured and the middle is not, so the distribution splits into two peaks. If the two forms stop breeding together this can lead to two species.",
          "Two curves of a trait: a dashed single bell curve centred on 50 before selection and a solid curve with two peaks, near 41 and 59, after disruptive selection.",
          ["Before: one peak around a mean of 50.", "Disruptive selection favours both extremes.", "After: two peaks, around 41 and 59, with few individuals in the middle."],
          MIX, "after disruptive selection",
          [{"type": "max", "expr": MIX, "domain": [30, 50], "x": 41.028, "y": 0.039956, "name": "after disruptive selection there is a peak at the low extreme, near 41"},
           {"type": "max", "expr": MIX, "domain": [50, 70], "x": 58.972, "y": 0.039956, "name": "and a second peak at the high extreme, near 59"},
           {"type": "value", "expr": MIX, "x": 50, "between": [0.0155, 0.0161], "name": "the middle (50) is much rarer than before: 0.016 against 0.050"},
           {"type": "area", "expr": MIX, "from": 0, "to": 100, "value": 1, "tol": 0.002, "name": "the population is the same size: area 1"}])

# ---------------------------------------------------------------- genetic drift
mk("u06-07", "bio-genetic-drift", "drift", "Genetic drift is strongest in small populations",
   "Six simulated populations each start with an allele at frequency 0.5 and change only by chance. With 20 gene copies the lines wander widely and some reach 0 (lost) or 1 (fixed); with 500 they stay close to 0.5. The simulation is seeded, so the picture does not change.",
   "Two panels of allele frequency against generation for six simulated populations each: with 20 gene copies the lines wander widely and some reach 0 or 1; with 500 gene copies they stay near 0.5.",
   ["Each line is one population, starting with the allele at frequency 0.5.", "Every generation the alleles passed on are a random sample of those present: there is no selection.",
    "N = 20: the frequencies wander far from 0.5, and some alleles are lost (0) or fixed (1) within 50 generations.", "N = 500: the frequencies stay close to 0.5.", "Drift is therefore strongest in small populations."],
   seed=5, p0=0.5, gens=50, reps=6, panels=[{"N": 20, "label": "small population: 20 gene copies"}, {"N": 500, "label": "large population: 500 gene copies"}],
   claims=[{"type": "theory", "N": 20}, {"type": "theory", "N": 500}, {"type": "moreSpread", "small": 20, "large": 500, "factor": 2}, {"type": "reaches", "N": 20, "value": True}, {"type": "reaches", "N": 500, "value": False}])

# ---------------------------------------------------------------- allopatric speciation, polyploid speciation, reproductive barriers
ALLO = [("one population", "a single species with gene flow"), ("a geographic barrier", "a mountain range, river or sea splits it"), ("gene flow stops", "the two populations no longer mix"),
        ("divergence", "different selection pressures, mutations and drift"), ("reproductive isolation", "two species that can no longer interbreed")]
mk("u06-14", "bio-allopatric-speciation", "flow", "Allopatric speciation",
   "A geographic barrier stops gene flow, so the two populations diverge independently under different selection pressures, mutations and drift. Over time reproductive isolation develops and they become separate species, as with snapping shrimp on either side of the Isthmus of Panama.",
   "Five boxes in order: one population, a geographic barrier, gene flow stops, divergence, and reproductive isolation giving two species.",
   [f"{a[0].upper() + a[1:]}: {b}." for a, b in ALLO],
   layout="grid", boxWidth=118, rowHeight=118, nodes=snake_nodes(ALLO, "a", ["a1", "a3", "a3", "a5", "a2"]), edges=chain("a", 5))
POLY = [("diploid species", "parents with two sets of chromosomes (2n)"), ("failed meiosis", "gametes with a double set (2n) instead of a single set"),
        ("fusion of 2n gametes", "a tetraploid (4n) offspring"), ("a new species", "the 4n plant cannot breed with its 2n parents: speciation in one generation")]
mk("u06-15", "bio-polyploid-speciation", "flow", "Instant speciation by polyploidy",
   "If meiosis fails, a plant can make gametes with a double set of chromosomes. Two of them fuse to give a tetraploid offspring that cannot breed with its diploid parents, so a new species appears within one generation and without any geographic barrier.",
   "Four boxes in order: a diploid species, failed meiosis giving diploid gametes, fusion into a tetraploid offspring, and a new species.",
   [f"{a[0].upper() + a[1:]}: {b}." for a, b in POLY],
   layout="line", nodes=[{"id": f"p{i}", "label": a, "sub": b, "tone": ["a1", "a5", "a5", "a2"][i]} for i, (a, b) in enumerate(POLY)], edges=chain("p", 4))
mk("u06-13", "bio-reproductive-barriers", "decision-tree", "Where is the barrier?",
   "Reproductive barriers act in order. Prezygotic barriers stop fertilisation: the groups never meet or breed together, do not accept each other, or their gametes cannot fuse. Postzygotic barriers act after a zygote forms: the hybrid does not survive, is sterile, or its offspring are weak.",
   "A flow chart of questions from meeting and mating to hybrid fertility, each 'no' leading to a barrier: habitat or temporal, behavioural or mechanical, gametic, hybrid inviability, hybrid sterility or hybrid breakdown.",
   ["Do the groups meet in the same habitat and breed at the same time? If not: habitat or temporal isolation.", "Do they accept each other as mates and fit together? If not: behavioural or mechanical isolation.",
    "Can their sperm and eggs fuse? If not: gametic isolation.", "Does the hybrid zygote develop and survive? If not: hybrid inviability.", "Is the hybrid fertile? If not: hybrid sterility, as with mules.",
    "Are later hybrid generations fertile and fit? If not: hybrid breakdown. If they are, there is no reproductive barrier."],
   start="q1", nodes={
       "q1": {"q": "Do the groups meet in the same habitat and breed at the same time?", "yes": "q2", "no": "b1"},
       "b1": {"outcome": "Habitat or temporal isolation (prezygotic)", "tone": "warn"},
       "q2": {"q": "Do they accept each other as mates, with structures that fit?", "yes": "q3", "no": "b2"},
       "b2": {"outcome": "Behavioural or mechanical isolation (prezygotic)", "tone": "warn"},
       "q3": {"q": "Can their sperm and eggs fuse?", "yes": "q4", "no": "b3"},
       "b3": {"outcome": "Gametic isolation (prezygotic)", "tone": "warn"},
       "q4": {"q": "Does the hybrid zygote develop and survive?", "yes": "q5", "no": "b4"},
       "b4": {"outcome": "Hybrid inviability (postzygotic)", "tone": "bad"},
       "q5": {"q": "Is the hybrid fertile?", "yes": "q6", "no": "b5"},
       "b5": {"outcome": "Hybrid sterility (postzygotic), as with mules", "tone": "bad"},
       "q6": {"q": "Are later generations of hybrids fertile and fit?", "yes": "none", "no": "b6"},
       "b6": {"outcome": "Hybrid breakdown (postzygotic)", "tone": "bad"},
       "none": {"outcome": "No barrier: the groups are not reproductively isolated", "tone": "good"}})

# ---------------------------------------------------------------- reading a tree
mk("u06-17", "bio-cladogram", "cladogram", "Reading an evolutionary tree",
   "Relatedness is shown by how recently two taxa share a common ancestor. The lizard and mouse share an ancestor that the frog does not, so they are more closely related to each other than either is to the frog. Each numbered trait arose once, on the branch shown, and is shared by every taxon above it.",
   "A tree of lancelet, shark, frog, lizard and mouse with five numbered traits on branches: vertebral column, jaws, four limbs, amniotic egg, and hair and mammary glands.",
   ["Branches are lineages, nodes are common ancestors and the tips are the taxa.", "Trait 1, a vertebral column, and trait 2, jaws, arose in the ancestor of the shark, frog, lizard and mouse; the lancelet lacks them.",
    "Trait 3, four limbs, arose in the ancestor of the frog, lizard and mouse; trait 4, the amniotic egg, in the ancestor of the lizard and mouse; trait 5, hair and mammary glands, in the mouse lineage.",
    "The lizard and mouse share a more recent common ancestor with each other than with the frog."],
   also=("u06-16", "u13-08"), tree=["lancelet", ["shark", ["frog", ["lizard", "mouse"]]]],
   characters=[{"name": "vertebral column", "taxa": ["shark", "frog", "lizard", "mouse"]}, {"name": "jaws", "taxa": ["shark", "frog", "lizard", "mouse"]},
               {"name": "four limbs", "taxa": ["frog", "lizard", "mouse"]}, {"name": "amniotic egg", "taxa": ["lizard", "mouse"]}, {"name": "hair and mammary glands", "taxa": ["mouse"]}],
   claims=[{"type": "closer", "taxa": ["lizard", "mouse"], "than": ["frog", "lizard"]}, {"type": "clade", "taxa": ["lizard", "mouse"]}, {"type": "clade", "taxa": ["frog", "lizard", "mouse"]}])

# ---------------------------------------------------------------- radiometric decay
DECAY = "0.5^(x/5.73)"
mk("u06-19", "bio-radiometric-decay", "graph", "Radioactive decay and carbon-14 dating",
   "Every half-life, 5,730 years for carbon-14, half of the remaining radioactive atoms decay. After 50,000 years only about 0.2% is left, too little to measure reliably, which is why carbon-14 dating works only for remains up to about 50,000 years old.",
   "A curve of the fraction of carbon-14 remaining against time in thousands of years, halving every 5.73 thousand years: 0.5 at 5.73, 0.25 at 11.46 and about 0.002 at 50.",
   ["The fraction of carbon-14 remaining halves every 5,730 years.", "After one half-life, 0.5 remains; after two, 0.25.", "After 50,000 years about 0.2% remains: the practical limit of the method."],
   range={"x": [0, 60], "y": [0, 1.08]}, ticks=[[10, 20, 30, 40, 50, 60], [0.25, 0.5, 0.75, 1.0]], height=[340, 320], xLabelBelow=True,
   axisLabels=["time since death / thousand years", "fraction of carbon-14 remaining"],
   curves=[{"expr": DECAY, "colour": "a3"}],
   marks=[{"x": 5.73, "to": 0.5, "label": "one half-life", "dx": 44}, {"x": 11.46, "to": 0.25, "label": "two", "dx": 18}, {"x": 50, "to": 0.0024, "label": "50 000 years: 0.2%", "dx": -52}],
   checks=[{"type": "point", "expr": DECAY, "x": 5.73, "y": 0.5, "name": "after one half-life (5,730 years) half remains"},
           {"type": "point", "expr": DECAY, "x": 11.46, "y": 0.25, "name": "after two half-lives a quarter remains"},
           {"type": "value", "expr": DECAY, "x": 50, "between": [0.002, 0.003], "name": "after 50,000 years only about 0.2% remains: the limit of carbon-14 dating"}])
