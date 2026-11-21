"""Biology unit 4, Genetics: diagram specs. Run: python3 scripts/diagrams/biology/u04.py"""
from spec import mk

CODE = "FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG"
THREE = dict(F="Phe", L="Leu", S="Ser", Y="Tyr", C="Cys", W="Trp", P="Pro", H="His", Q="Gln", R="Arg", I="Ile", M="Met", T="Thr", N="Asn", K="Lys", V="Val", A="Ala", D="Asp", E="Glu", G="Gly")
comp = lambda s: s.translate(str.maketrans("ATGC", "TACG"))
rna = lambda s: s.replace("T", "U")
def protein(dna):
    out = []
    for i in range(0, len(dna) - 2, 3):
        aa = CODE["UCAG".index(rna(dna)[i]) * 16 + "UCAG".index(rna(dna)[i + 1]) * 4 + "UCAG".index(rna(dna)[i + 2])]
        out.append("Stop" if aa == "*" else THREE[aa])
        if aa == "*": break
    return out

# ---------------------------------------------------------------- chromosomes: packing DNA
PACK = [("DNA double helix", "about 2 metres of it in every human cell", "a1"), ("nucleosomes", "DNA wound round histone proteins: beads on a string", "a4"),
        ("chromatin fibre", "the nucleosomes coil, then loop and condense further", "a5"), ("chromosome", "before division: two sister chromatids joined at a centromere", "a2")]
mk("u04-05", "bio-chromatin-packing", "flow", "Packing two metres of DNA into a nucleus",
   "DNA wraps round histone proteins to make nucleosomes, which coil into chromatin fibres that loop and condense, until before division each chromosome is two sister chromatids joined at the centromere. Tight packing also makes DNA harder to transcribe.",
   "Four boxes in order: the DNA double helix, nucleosomes, the chromatin fibre and the condensed chromosome.",
   [f"{a[0].upper() + a[1:]}: {b}." for a, b, _ in PACK],
   layout="line", nodes=[{"id": f"k{i}", "label": a, "sub": b, "tone": t} for i, (a, b, t) in enumerate(PACK)], edges=[{"from": f"k{i}", "to": f"k{i + 1}"} for i in range(3)])

# ---------------------------------------------------------------- replication: Meselson and Stahl
mk("u04-03", "bio-meselson-stahl", "density", "Meselson and Stahl: DNA copies itself semi-conservatively",
   "Bacteria grown in heavy nitrogen (¹⁵N) were moved to light nitrogen (¹⁴N). After one generation all the DNA was a single hybrid band; after two, half hybrid and half light. Semi-conservative copying predicts exactly that; conservative copying would have left a heavy band at generation 1.",
   "Tubes of DNA bands for generations 0, 1 and 2: semi-conservative copying gives heavy, then all hybrid, then half hybrid and half light, matching the observations; conservative copying predicts a heavy band and a light band at generation 1, which was not seen.",
   ["Generation 0: all DNA is heavy (¹⁵N).", "Generation 1, observed: one band of intermediate density, so every molecule has one old and one new strand.",
    "Generation 2, observed: half the DNA hybrid, half light.", "Semi-conservative copying predicts exactly these bands.", "Conservative copying predicts a heavy band and a light band at generation 1, so it is ruled out."],
   groups=[{"label": "semi-conservative: matches the observed bands", "model": "semiconservative", "gens": [0, 1, 2], "agrees": True},
           {"label": "conservative: predicts a heavy band at generation 1, which was not seen", "model": "conservative", "gens": [0, 1, 2], "agrees": False}],
   observed={"0": {"heavy": 1}, "1": {"hybrid": 1}, "2": {"hybrid": 0.5, "light": 0.5}})

# ---------------------------------------------------------------- transcription and translation
G1 = "ATGAAATTTGGCTGA"
mk("u04-09", "bio-transcription", "strand", "Transcription: the template strand is copied into mRNA",
   "RNA polymerase reads the template strand, adding RNA nucleotides complementary to it, with uracil in place of thymine. The mRNA therefore has the same sequence as the coding strand, with U for T.",
   "A short gene shown as its coding strand, its complementary template strand and the mRNA made from the template, with bases coloured by type.",
   [f"Coding strand: {G1}.", f"Template strand: {comp(G1)}, read by RNA polymerase.", f"mRNA: {rna(G1)}: the coding strand with U in place of T.", "The mRNA is built 5′ to 3′ as the polymerase moves along the template."],
   coding=G1, rows=["coding", "template", "mrna"],
   claims=[{"type": "template", "value": comp(G1)}, {"type": "mrna", "value": rna(G1)}])

G2 = "ATGGGTCCAAAGTAA"
mk("u04-11", "bio-translation", "strand", "Translation: codons of mRNA specify amino acids",
   "The ribosome reads the mRNA three bases at a time. The start codon AUG brings in methionine; each following codon adds one amino acid; the stop codon UAA ends the chain and releases the polypeptide.",
   "An mRNA divided into codons with the amino acid each codes for: Met, Gly, Pro, Lys, then the stop codon.",
   [f"mRNA: {rna(G2)}.", "AUG is the start codon: methionine.", f"The next codons give {', '.join(protein(G2)[1:-1])}.", "UAA is a stop codon: no amino acid, the chain is released."],
   coding=G2, rows=["mrna", "protein"], claims=[{"type": "mrna", "value": rna(G2)}, {"type": "protein", "value": protein(G2)}])

mk("u04-12", "bio-genetic-code", "codontable", "The genetic code",
   "Sixty-four codons, 61 for amino acids and three stops. The code is degenerate: most amino acids have several codons, often differing only in the third base (all four GGN codons give glycine). Only methionine and tryptophan have one codon each; leucine, serine and arginine have six (shaded).",
   "A table of the 64 mRNA codons arranged by first, second and third base, with the amino acid or stop for each; AUG is marked as the start codon and UAA, UAG and UGA as stops.",
   ["AUG codes for methionine and is the start codon.", "UAA, UAG and UGA are stop codons.", "61 codons code for the 20 amino acids, so most amino acids have more than one.",
    "Methionine and tryptophan have a single codon each; leucine, serine and arginine have six.", "The third base often does not matter: GGU, GGC, GGA and GGG all code for glycine."],
   highlight=[{"aa": "Leu", "colour": "a1"}, {"aa": "Ser", "colour": "a2"}, {"aa": "Arg", "colour": "a4"}],
   claims=[{"type": "start", "codon": "AUG", "aa": "Met"}, {"type": "stops", "value": ["UAA", "UAG", "UGA"]}, {"type": "sense", "value": 61}, {"type": "amino", "value": 20},
           {"type": "single", "aa": ["Met", "Trp"]}, {"type": "count", "aa": "Leu", "value": 6}, {"type": "count", "aa": "Ser", "value": 6}, {"type": "count", "aa": "Arg", "value": 6},
           {"type": "family", "prefix": "GG", "aa": "Gly"}])

# ---------------------------------------------------------------- four kinds of mutation, in the start of the β-globin gene
BETA = "ATGGTGCACCTGACTCCTGAGGAGAAG"   # Met Val His Leu Thr Pro Glu Glu Lys
def mutation(id, title, caption, alt, desc, mutant, kind, label):
    mk("u04-18", id, "strand", title, caption, alt, desc, coding=BETA, rows=["coding", "protein"], mutant={"coding": mutant, "label": label, "rows": ["coding", "protein"]},
       claims=[{"type": "mutation", "kind": kind}, {"type": "protein", "value": protein(BETA)}])
mutation("bio-mutation-silent", "A silent mutation",
         "Changing the last base of the Lys codon from AAG to AAA does not change the amino acid, because the code is degenerate: the protein is unchanged.",
         "The start of the beta-globin coding strand and the same sequence with the ninth codon changed from AAG to AAA; the protein is the same.",
         ["The ninth codon AAG codes for lysine.", "AAA also codes for lysine, so the protein is unchanged."],
         BETA[:24] + "AAA", "silent", "after the mutation (AAG to AAA)")
mutation("bio-mutation-missense", "A missense mutation: sickle cell",
         "GAG becomes GTG at the sixth amino acid of the β-globin chain, replacing glutamate with valine. One different amino acid is enough to make haemoglobin form fibres in low oxygen.",
         "The start of the beta-globin coding strand and the same sequence with the seventh codon changed from GAG to GTG; glutamate is replaced by valine.",
         ["GAG codes for glutamate.", "GTG codes for valine: one amino acid is replaced.", "This is the change in sickle cell anaemia."],
         BETA[:18] + "GTG" + BETA[21:], "missense", "after the mutation (GAG to GTG)")
mutation("bio-mutation-nonsense", "A nonsense mutation",
         "GAG becomes TAG, a stop codon, so translation ends early and a shortened protein is made.",
         "The start of the beta-globin coding strand and the same sequence with the eighth codon changed from GAG to TAG; the protein stops after seven amino acids.",
         ["GAG codes for glutamate.", "TAG, read as UAG in mRNA, is a stop codon.", "The chain is released after seven amino acids: a shortened protein."],
         BETA[:21] + "TAG" + BETA[24:], "nonsense", "after the mutation (GAG to TAG)")
mutation("bio-mutation-frameshift", "A frameshift mutation",
         "Deleting one base shifts the reading frame, so every codon after it changes. Inserting or deleting three bases would instead add or remove a single amino acid.",
         "The start of the beta-globin coding strand and the same sequence with one base deleted from the seventh codon; every later codon is read differently.",
         ["One G is deleted from the seventh codon.", "The bases after it are read in a new frame, so the amino acids after the deletion all change.", "A deletion of 3 bases would not shift the frame."],
         BETA[:18] + BETA[19:], "frameshift", "after the mutation (one base deleted)")

# ---------------------------------------------------------------- RNA processing (flow)
PROC = [("pre-mRNA", "exons and introns, made in the nucleus", "a1"), ("5′ cap", "a modified guanine added to the 5′ end", "a4"), ("poly-A tail", "many adenines added to the 3′ end", "a4"),
        ("splicing", "the spliceosome removes the introns and joins the exons", "a5"), ("mature mRNA", "leaves through the nuclear pores for translation", "a2")]
mk("u04-10", "bio-rna-processing", "flow", "From pre-mRNA to mature mRNA",
   "In eukaryotes the first transcript is processed before it leaves the nucleus: a cap protects the 5′ end, a poly-A tail stabilises the 3′ end, and the spliceosome removes the introns and joins the exons.",
   "Five boxes in order: pre-mRNA, 5′ cap, poly-A tail, splicing and mature mRNA.",
   [f"{a[0].upper() + a[1:]}: {b}." for a, b, _ in PROC],
   layout="grid", boxWidth=118, rowHeight=118,
   nodes=[{"id": f"m{i}", "label": a, "sub": b, "tone": t, "col": i % 3 if i < 3 else 4 - i, "row": i // 3} for i, (a, b, t) in enumerate(PROC)],
   edges=[{"from": f"m{i}", "to": f"m{i + 1}"} for i in range(4)])

# ---------------------------------------------------------------- the lac operon (decision tree)
mk("u04-15", "bio-lac-operon", "decision-tree", "When is the lac operon on?",
   "Two questions predict the lac operon. Without lactose the repressor sits on the operator and the genes are off. With lactose the repressor is freed, but the operon is strongly expressed only when glucose is also absent, because then cAMP rises and the CAP protein helps RNA polymerase bind.",
   "A flow chart: no lactose means the operon is off; lactose with glucose gives low expression; lactose without glucose gives high expression.",
   ["Is lactose present? If not, the repressor stays bound to the operator, blocking RNA polymerase: the genes are off.",
    "If lactose is present, allolactose binds the repressor, which leaves the operator.", "Is glucose also present? If so, cAMP is low, CAP is inactive and transcription is low.",
    "If glucose is absent, cAMP binds CAP, which helps RNA polymerase bind the promoter: the operon is strongly expressed."],
   start="q1", nodes={
       "q1": {"q": "Is lactose present?", "yes": "q2", "no": "off"},
       "off": {"outcome": "Off: the repressor binds the operator and blocks RNA polymerase", "tone": "bad"},
       "q2": {"q": "Is glucose also present?", "yes": "low", "no": "high"},
       "low": {"outcome": "Low: allolactose frees the repressor, but with glucose present cAMP is low and CAP is inactive", "tone": "warn"},
       "high": {"outcome": "High: the repressor is off the operator and cAMP–CAP helps RNA polymerase bind", "tone": "good"}})

# ---------------------------------------------------------------- crosses
TALL = {"alleles": ["T", "t"], "dominance": {"kind": "complete", "dominant": "T", "traits": ["tall", "short"]}}
mk("u04-23", "bio-monohybrid-cross", "cross", "A monohybrid cross: Tt × Tt",
   "Two heterozygous parents each make T and t gametes in equal numbers. The square gives 1 TT : 2 Tt : 1 tt, and because T is dominant, three tall plants for every short one. These are probabilities: a small family can differ.",
   "A Punnett square of two heterozygous tall pea plants: the offspring are one TT, two Tt and one tt.",
   ["Each parent is Tt and makes T and t gametes.", "The four squares give TT, Tt, Tt and tt.", "Genotype ratio 1 TT : 2 Tt : 1 tt.", "Phenotype ratio 3 tall : 1 short."],
   loci=[TALL], parents=[{"genotype": ["T t"], "label": "tall"}, {"genotype": ["T t"], "label": "tall"}],
   claims=[{"type": "genotypes", "ratio": {"TT": 1, "Tt": 2, "tt": 1}}, {"type": "phenotypes", "ratio": {"tall": 3, "short": 1}}])
mk("u04-23", "bio-test-cross", "cross", "A test cross: Tt × tt",
   "To find whether a tall plant is TT or Tt, cross it with a short (tt) plant. A TT parent would give only tall offspring; a Tt parent gives tall and short in a 1 : 1 ratio, so any short offspring show it is heterozygous.",
   "A Punnett square of a heterozygous tall plant crossed with a short plant: two Tt and two tt offspring.",
   ["The unknown plant is Tt and the tester is tt.", "The tester only makes t gametes.", "Half the offspring are Tt (tall) and half are tt (short): a 1 : 1 ratio.", "If the unknown plant were TT, all offspring would be tall."],
   loci=[TALL], parents=[{"genotype": ["T t"], "label": "tall"}, {"genotype": ["t t"], "label": "short (tester)"}],
   claims=[{"type": "genotypes", "ratio": {"Tt": 1, "tt": 1}}, {"type": "phenotypes", "ratio": {"tall": 1, "short": 1}}])
mk("u04-21", "bio-carrier-cross", "cross", "Two carriers of an autosomal recessive condition",
   "Each carrier (Aa) is unaffected but passes the recessive allele a to half their gametes. In every pregnancy there is a 1 in 4 chance of an affected child (aa), a 1 in 2 chance of a carrier and a 1 in 4 chance of a child with two working copies.",
   "A Punnett square of two unaffected carrier parents: one AA, two Aa and one aa child; the aa child is affected.",
   ["Both parents are Aa: unaffected carriers.", "Each makes A and a gametes.", "The children are AA, Aa, Aa and aa.", "One in four (aa) is affected; three in four are unaffected, and two of those are carriers."],
   loci=[{"alleles": ["A", "a"], "dominance": {"kind": "complete", "dominant": "A", "traits": ["unaffected", "affected"]}}],
   parents=[{"genotype": ["A a"], "label": "carrier"}, {"genotype": ["A a"], "label": "carrier"}],
   claims=[{"type": "genotypes", "ratio": {"AA": 1, "Aa": 2, "aa": 1}}, {"type": "probability", "phenotype": "affected", "value": 0.25}, {"type": "probability", "genotype": "Aa", "value": 0.5}])
mk("u04-24", "bio-dihybrid-cross", "cross", "A dihybrid cross: RrYy × RrYy",
   "Each parent makes four gamete types, RY, Ry, rY and ry, in equal numbers because the genes assort independently. The 16 squares give the 9 : 3 : 3 : 1 phenotype ratio, and each gene on its own still gives 3 : 1.",
   "A four by four Punnett square of two plants heterozygous for seed shape and seed colour, giving nine round yellow, three round green, three wrinkled yellow and one wrinkled green.",
   ["Each parent is RrYy: round and yellow.", "Gametes: RY, Ry, rY and ry, each one quarter.", "16 combinations in the square.", "Phenotypes 9 round yellow : 3 round green : 3 wrinkled yellow : 1 wrinkled green."],
   loci=[{"alleles": ["R", "r"], "dominance": {"kind": "complete", "dominant": "R", "traits": ["round", "wrinkled"]}}, {"alleles": ["Y", "y"], "dominance": {"kind": "complete", "dominant": "Y", "traits": ["yellow", "green"]}}],
   parents=[{"genotype": ["R r", "Y y"], "label": "round, yellow"}, {"genotype": ["R r", "Y y"], "label": "round, yellow"}],
   claims=[{"type": "phenotypes", "ratio": {"round, yellow": 9, "round, green": 3, "wrinkled, yellow": 3, "wrinkled, green": 1}}])
mk("u04-25", "bio-incomplete-dominance", "cross", "Incomplete dominance: pink snapdragons",
   "Neither allele is completely dominant, so the heterozygote is intermediate. Two pink plants give 1 red : 2 pink : 1 white, so the genotype ratio and the phenotype ratio are the same, unlike the 3 : 1 of complete dominance.",
   "A Punnett square of two pink snapdragons: one red, two pink and one white offspring.",
   ["Pink plants are CᴿCᵂ.", "Each parent makes Cᴿ and Cᵂ gametes.", "Offspring: CᴿCᴿ red, CᴿCᵂ pink (two squares), CᵂCᵂ white.", "Genotype and phenotype ratios are both 1 : 2 : 1."],
   loci=[{"alleles": ["Cᴿ", "Cᵂ"], "dominance": {"kind": "map", "map": {"Cᴿ Cᴿ": "red", "Cᴿ Cᵂ": "pink", "Cᵂ Cᵂ": "white"}}}],
   parents=[{"genotype": ["Cᴿ Cᵂ"], "label": "pink"}, {"genotype": ["Cᴿ Cᵂ"], "label": "pink"}],
   claims=[{"type": "genotypes", "ratio": {"CᴿCᴿ": 1, "CᴿCᵂ": 2, "CᵂCᵂ": 1}}, {"type": "phenotypes", "ratio": {"red": 1, "pink": 2, "white": 1}}])
ABO = {"Iᴬ Iᴬ": "group A", "Iᴬ Iᴼ": "group A", "Iᴬ Iᴮ": "group AB", "Iᴮ Iᴮ": "group B", "Iᴮ Iᴼ": "group B", "Iᴼ Iᴼ": "group O"}
mk("u04-26", "bio-abo-cross", "cross", "Codominance and multiple alleles: ABO blood groups",
   "Iᴬ and Iᴮ are codominant, and both are dominant to Iᴼ. A group A parent (IᴬIᴼ) and a group B parent (IᴮIᴼ) can have a child of any of the four groups, each with probability one quarter.",
   "A Punnett square of a group A parent and a group B parent, both heterozygous: one group AB, one group A, one group B and one group O child.",
   ["Parent 1 is IᴬIᴼ, group A; parent 2 is IᴮIᴼ, group B.", "Gametes: Iᴬ or Iᴼ from one parent, Iᴮ or Iᴼ from the other.", "Offspring: IᴬIᴮ (AB), IᴬIᴼ (A), IᴮIᴼ (B), IᴼIᴼ (O).", "Each blood group has probability 1 in 4."],
   loci=[{"alleles": ["Iᴬ", "Iᴮ", "Iᴼ"], "dominance": {"kind": "map", "map": ABO}}],
   parents=[{"genotype": ["Iᴬ Iᴼ"], "label": "group A"}, {"genotype": ["Iᴮ Iᴼ"], "label": "group B"}],
   claims=[{"type": "phenotypes", "ratio": {"group A": 1, "group B": 1, "group AB": 1, "group O": 1}}, {"type": "probability", "phenotype": "group O", "value": 0.25}])
mk("u04-27", "bio-xlinked-cross", "cross", "An X-linked recessive cross: a carrier mother",
   "The haemophilia allele Xʰ is on the X chromosome. A carrier mother passes Xʰ to half her gametes, so half her sons are affected and half her daughters are carriers. The father passes his Y to every son and his Xᴴ to every daughter.",
   "A Punnett square of a carrier mother and an unaffected father: one unaffected daughter, one carrier daughter, one unaffected son and one son with haemophilia.",
   ["Mother XᴴXʰ is a carrier; father XᴴY is unaffected.", "Her eggs carry Xᴴ or Xʰ; his sperm carry Xᴴ or Y.", "Daughters: one XᴴXᴴ unaffected, one XᴴXʰ carrier. Sons: one XᴴY unaffected, one XʰY with haemophilia.",
    "Half of the sons are affected and half of the daughters are carriers."],
   loci=[{"alleles": ["Xᴴ", "Xʰ", "Y"], "dominance": {"kind": "sexlinked", "disease": "Xʰ", "recessive": True, "trait": "haemophiliac"}}],
   parents=[{"genotype": ["Xᴴ Xʰ"], "label": "carrier mother"}, {"genotype": ["Xᴴ Y"], "label": "unaffected father"}],
   claims=[{"type": "phenotypes", "ratio": {"unaffected female": 1, "carrier female": 1, "unaffected male": 1, "haemophiliac male": 1}}, {"type": "probability", "phenotype": "haemophiliac male", "value": 0.25}])

# ---------------------------------------------------------------- pedigrees
mk("u04-28", "bio-pedigree-recessive", "pedigree", "A pedigree that shows autosomal recessive inheritance",
   "Two unaffected parents (I-1 and I-2) have an affected child (II-2), which rules out a dominant allele. The affected daughter III-2 has an unaffected father, which rules out X-linked recessive inheritance. That leaves autosomal recessive, and forces II-3 and her parents to be carriers.",
   "A three-generation family tree: unaffected parents I-1 and I-2 have an affected son II-2; unaffected II-3 and II-4 have an affected daughter III-2.",
   ["Squares are males, circles females, filled symbols affected.", "I-1 and I-2 are unaffected but have an affected son, II-2: not dominant.",
    "III-2 is an affected daughter with an unaffected father: not X-linked recessive.", "So the pattern is autosomal recessive: I-1, I-2, II-3 and II-4 are all carriers."],
   people=[{"id": "I-1", "sex": "m", "gen": 1, "x": 1}, {"id": "I-2", "sex": "f", "gen": 1, "x": 2},
           {"id": "II-1", "sex": "f", "gen": 2, "x": 0, "parents": ["I-1", "I-2"]}, {"id": "II-2", "sex": "m", "gen": 2, "x": 1, "affected": True, "parents": ["I-1", "I-2"]},
           {"id": "II-3", "sex": "f", "gen": 2, "x": 2, "parents": ["I-1", "I-2"]}, {"id": "II-4", "sex": "m", "gen": 2, "x": 3},
           {"id": "III-1", "sex": "m", "gen": 3, "x": 2, "parents": ["II-3", "II-4"]}, {"id": "III-2", "sex": "f", "gen": 3, "x": 3, "affected": True, "parents": ["II-3", "II-4"]}],
   claims=[{"type": "consistent", "mode": "AR"}, {"type": "excluded", "mode": "AD"}, {"type": "excluded", "mode": "XR"},
           {"type": "genotype", "id": "II-3", "mode": "AR", "value": "Aa"}, {"type": "genotype", "id": "II-4", "mode": "AR", "value": "Aa"}, {"type": "genotype", "id": "I-1", "mode": "AR", "value": "Aa"}])
mk("u04-28", "bio-pedigree-xlinked", "pedigree", "A pedigree that shows X-linked recessive inheritance",
   "Only males are affected, and the allele reaches them through carrier mothers: I-2 has an affected son and a carrier daughter (II-2), who in turn has an affected son. Unaffected parents with an affected child rule out a dominant allele.",
   "A three-generation family tree: carrier mother I-2 has an affected son II-1; her carrier daughter II-2 has an affected son III-1.",
   ["Squares are males, circles females, filled symbols affected, a dot marks a carrier.", "I-1 and I-2 are unaffected but have an affected son, II-1: not dominant.",
    "Only males are affected, and each affected male has a carrier mother.", "If the allele is X-linked recessive, I-2 and II-2 must be carriers (XᴬXᵃ)."],
   people=[{"id": "I-1", "sex": "m", "gen": 1, "x": 0}, {"id": "I-2", "sex": "f", "gen": 1, "x": 1, "carrier": True},
           {"id": "II-1", "sex": "m", "gen": 2, "x": 0, "affected": True, "parents": ["I-1", "I-2"]}, {"id": "II-2", "sex": "f", "gen": 2, "x": 1, "carrier": True, "parents": ["I-1", "I-2"]},
           {"id": "II-3", "sex": "m", "gen": 2, "x": 2},
           {"id": "III-1", "sex": "m", "gen": 3, "x": 1, "affected": True, "parents": ["II-2", "II-3"]}, {"id": "III-2", "sex": "f", "gen": 3, "x": 2, "parents": ["II-2", "II-3"]}],
   claims=[{"type": "consistent", "mode": "XR"}, {"type": "excluded", "mode": "AD"}, {"type": "genotype", "id": "I-2", "mode": "XR", "value": "XᴬXᵃ"}, {"type": "genotype", "id": "II-2", "mode": "XR", "value": "XᴬXᵃ"}])

# ---------------------------------------------------------------- Hardy–Weinberg
mk("u04-29", "bio-hardy-weinberg", "graph", "Genotype frequencies in Hardy–Weinberg equilibrium",
   "With allele frequencies p and q (p + q = 1) the genotype frequencies are p², 2pq and q². Heterozygotes are most common at q = 0.5, but when a recessive allele is rare almost all copies are in carriers: at q = 0.02 (cystic fibrosis, about 1 in 2,500) the carrier frequency 2pq is about 0.039, roughly 1 in 25.",
   "Three curves against the frequency q of the recessive allele: AA falling from 1 to 0, Aa rising to 0.5 at q = 0.5 and falling, and aa rising from 0 to 1, with q = 0.02 marked.",
   ["p² (AA) falls from 1 to 0 as q rises.", "2pq (Aa) peaks at 0.5 when q = 0.5.", "q² (aa) rises from 0 to 1.", "At every q the three frequencies add up to 1.",
    "At q = 0.02, q² = 0.0004 (1 in 2,500) but 2pq = 0.039, about 1 in 25."],
   also=("u06-24",),
   range={"x": [0, 1], "y": [0, 1.08]}, ticks=[[0, 0.2, 0.4, 0.5, 0.6, 0.8, 1], [0.25, 0.5, 0.75, 1]], height=[340, 320], xLabelBelow=True,
   axisLabels=["frequency of the recessive allele, q", "genotype frequency"],
   curves=[{"expr": "(1-x)^2", "colour": "a1"}, {"expr": "2*x*(1-x)", "colour": "a4"}, {"expr": "x^2", "colour": "a2"}],
   legend=[["AA (p²)", "a1"], ["Aa (2pq)", "a4"], ["aa (q²)", "a2"]], legendData=[0.36, 1.04],
   checks=[{"type": "max", "expr": "2*x*(1-x)", "domain": [0, 1], "x": 0.5, "y": 0.5, "name": "heterozygotes (2pq) are most frequent at q = 0.5, where 2pq = 0.5"},
           {"type": "point", "expr": "(1-x)^2+2*x*(1-x)+x^2", "x": 0.3, "y": 1, "name": "p² + 2pq + q² = 1 at q = 0.3"},
           {"type": "point", "expr": "(1-x)^2+2*x*(1-x)+x^2", "x": 0.02, "y": 1, "name": "p² + 2pq + q² = 1 at q = 0.02"},
           {"type": "point", "expr": "x^2", "x": 0.02, "y": 0.0004, "name": "at q = 0.02, q² = 0.0004: 1 in 2,500 are affected"},
           {"type": "value", "expr": "2*x*(1-x)", "x": 0.02, "between": [0.0385, 0.0395], "name": "at q = 0.02 the carrier frequency 2pq is about 0.039, roughly 1 in 25"}])

# ---------------------------------------------------------------- linkage and crossing over
mk("u04-30", "bio-crossover-linkage", "crossover", "Crossing over between linked genes",
   "Genes A and B are on the same chromosome. A crossover between them swaps the lower ends of two non-sister chromatids, making two recombinant chromatids (Ab and aB) alongside two parental ones (AB and ab). Even then only half the products are recombinant, so the recombination frequency cannot exceed 50%.",
   "Four chromatids before and after a crossover between genes A and B: before, two carry AB and two carry ab; after, they carry AB, Ab, aB and ab.",
   ["Before: two chromatids carry A and B, two carry a and b.", "A crossover between the genes swaps the B and b ends of two non-sister chromatids.",
    "After: AB and ab are parental; Ab and aB are recombinant.", "Two of four are recombinant: at most 50%, however far apart the genes are."],
   also=("u04-31",), genes=[{"alleles": ["A", "a"]}, {"alleles": ["B", "b"]}], crossover="between",
   claims=[{"type": "recombinant", "value": 2}, {"type": "parental", "value": 2}, {"type": "max", "value": 0.5}])
