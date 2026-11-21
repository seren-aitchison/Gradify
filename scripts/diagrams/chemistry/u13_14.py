"""Units 13 and 14: structures, selectivity and synthesis maps (the mechanisms are in mechanisms.py)."""
from spec import mk

def P(smiles, label, **k):
    d = {"smiles": smiles, "label": label}; d.update(k); return d

mk("u13-02", "chem-electrophiles-nucleophiles", "structures", "Nucleophiles and electrophiles",
   "Nucleophiles (top row) have a lone pair and often a negative charge, and attack electron-poor carbon. Electrophiles (bottom row) are electron-poor: a δ+ carbon next to an electronegative atom, or a cation such as NO₂⁺, and are attacked by electron-rich species.",
   "Top row: hydroxide, ammonia, cyanide and water. Bottom row: bromomethane, methanal and the nitronium ion.",
   ["Nucleophiles: OH⁻, NH₃, CN⁻ and H₂O, each with a lone pair to donate.", "Electrophiles: bromomethane (δ+ carbon), methanal (δ+ carbonyl carbon) and NO₂⁺."],
   perRow=[4, 2], bond=[32, 30],
   panels=[P("[OH-]", "OH⁻", sub="nucleophile"), P("N", "NH₃", sub="nucleophile", displayed=True), P("[C-]#N", "CN⁻", sub="nucleophile"), P("O", "H₂O", sub="nucleophile", displayed=True),
           P("CBr", "CH₃Br", sub="electrophile: δ+ C", groups=["halogenoalkane"]), P("C=O", "HCHO", sub="electrophile: δ+ C", groups=["aldehyde"]), P("O=[N+]=O", "NO₂⁺", sub="electrophile")])

mk("u13-04", "chem-carbocation-stability", "structures", "Carbocation stability",
   "Alkyl groups push electron density towards a positive carbon (a positive inductive effect), spreading its charge. So the more alkyl groups on C⁺, the more stable it is: tertiary > secondary > primary > methyl. This decides Markovnikov products and SN1 rates.",
   "Four carbocations in order of increasing stability: methyl, ethyl (primary), propan-2-yl (secondary), 2-methylpropan-2-yl (tertiary).",
   ["Methyl, CH₃⁺: no alkyl groups, least stable.", "Primary: one alkyl group.", "Secondary: two.", "Tertiary: three alkyl groups, most stable."],
   between=["<", "<", "<"], perRow=[4, 2], bond=[32, 30],
   panels=[P("[CH3+]", "methyl", formula="CH3", displayed=True), P("C[CH2+]", "primary", formula="C2H5"), P("C[CH+]C", "secondary", formula="C3H7"), P("C[C+](C)C", "tertiary", formula="C4H9")])

mk("u13-05", "chem-carbanions", "structures", "A stabilised carbanion: the enolate",
   "A carbanion is a negatively charged carbon. Most are very reactive, but one next to a C=O is stabilised because its charge is delocalised onto the oxygen. The two resonance forms of propanone's enolate differ only in where the electrons are drawn.",
   "Two resonance structures of the propanone enolate joined by a double-headed arrow: charge on carbon, and charge on oxygen.",
   ["Left: the negative charge on the CH₂ carbon next to C=O.", "Right: the same ion with C=C and the negative charge on oxygen, the more important form."],
   between=["↔"], panels=[P("CC(=O)[CH2-]", "carbanion form", formula="C3H5O"), P("CC([O-])=C", "enolate form", formula="C3H5O")])

mk("u13-19", "chem-oxidation-alcohols", "structures", "Oxidising alcohols",
   "With acidified potassium dichromate (orange to green), a primary alcohol is oxidised to an aldehyde (distil it off as it forms) and then to a carboxylic acid (reflux). A secondary alcohol gives a ketone. A tertiary alcohol is not oxidised.",
   "Top row: ethanol to ethanal to ethanoic acid. Bottom row: propan-2-ol to propanone. Each arrow is labelled [O].",
   ["Ethanol (primary) → ethanal (aldehyde) → ethanoic acid (carboxylic acid).", "Propan-2-ol (secondary) → propanone (ketone)."],
   perRow=[3, 2], between=["→", "→", "", "→"], betweenLabels=["[O]", "[O]", "", "[O]"],
   panels=[P("CCO", "ethanol", groups=["primary alcohol"], highlight=[{"group": "primary alcohol", "colour": "a1"}]), P("CC=O", "ethanal", groups=["aldehyde"], highlight=[{"group": "aldehyde", "colour": "a2"}]),
           P("CC(=O)O", "ethanoic acid", groups=["carboxylic acid"], highlight=[{"group": "carboxylic acid", "colour": "a4"}]),
           P("CC(C)O", "propan-2-ol", groups=["secondary alcohol"], highlight=[{"group": "secondary alcohol", "colour": "a1"}]), P("CC(C)=O", "propanone", groups=["ketone"], highlight=[{"group": "ketone", "colour": "a2"}])])

mk("u13-21", "chem-condensation-ester", "structures", "A condensation reaction: making an ester",
   "Ethanoic acid and ethanol join, losing a molecule of water, to give ethyl ethanoate. With a concentrated sulfuric acid catalyst this is an equilibrium; removing water or the ester pushes it forward.",
   "Ethanoic acid plus ethanol, an equilibrium arrow, ethyl ethanoate plus water.",
   ["Ethanoic acid + ethanol.", "⇌ (H⁺ catalyst, heat).", "Ethyl ethanoate + water."],
   between=["+", "⇌", "+"], betweenLabels=["", "H⁺", ""], bond=[30, 26],
   panels=[P("CC(=O)O", "ethanoic acid", groups=["carboxylic acid"]), P("CCO", "ethanol", groups=["alcohol"]), P("CCOC(C)=O", "ethyl ethanoate", groups=["ester"], highlight=[{"group": "ester", "colour": "a5"}]), P("O", "water", displayed=True)],
   claims=[{"type": "reaction", "left": [0, 1], "right": [2, 3]}])

mk("u13-24", "chem-selectivity-overview", "classify", "Which kind of selectivity?",
   "When a reaction could give more than one product, ask what the products differ in. Reaction at one functional group rather than another is chemoselectivity; at one position rather than another, regioselectivity; one stereoisomer rather than another, stereoselectivity.",
   "A tree: do the possible products differ in which functional group reacted? Chemoselective. If not, in where on the molecule? Regioselective. Otherwise in 3D arrangement: stereoselective.",
   ["Different functional group reacted: chemoselective, such as NaBH₄ reducing a ketone but not an ester.", "Same group, different position: regioselective, such as HBr giving 2-bromopropane from propene.",
    "Same connections, different 3D arrangement: stereoselective, such as anti addition of Br₂."],
   start="q1", rowHeight=100,
   nodes={"q1": {"q": "Do the products differ in which functional group reacted?", "yes": "chemo", "no": "q2"}, "chemo": {"leaf": "Chemoselective", "examples": ["NaBH₄: ketone, not ester"], "tone": "a1"},
          "q2": {"q": "Do they differ in where on the molecule?", "yes": "regio", "no": "stereo"}, "regio": {"leaf": "Regioselective", "examples": ["Markovnikov addition"], "tone": "a4"},
          "stereo": {"leaf": "Stereoselective", "examples": ["anti addition of Br₂"], "tone": "a5"}})

mk("u13-25", "chem-chemoselectivity", "structures", "Chemoselectivity: NaBH₄ reduces a ketone, not an ester",
   "Sodium borohydride is a mild hydride donor: it reduces the ketone of methyl 4-oxopentanoate to a secondary alcohol but leaves the less electrophilic ester untouched. LiAlH₄ would reduce both.",
   "Methyl 4-oxopentanoate, an arrow labelled NaBH₄, and methyl 4-hydroxypentanoate; the ketone and the new alcohol are shaded, the ester unchanged.",
   ["Starting material: a ketone and an ester in one molecule.", "After NaBH₄: the ketone has become a secondary alcohol; the ester is unchanged."],
   between=["→"], betweenLabels=["NaBH₄"],
   panels=[P("COC(=O)CCC(C)=O", "methyl 4-oxopentanoate", groups=["ketone", "ester"], highlight=[{"group": "ketone", "colour": "a2"}, {"group": "ester", "colour": "a4"}]),
           P("COC(=O)CCC(C)O", "methyl 4-hydroxypentanoate", groups=["secondary alcohol", "ester"], notGroups=["ketone"], highlight=[{"group": "secondary alcohol", "colour": "a1"}, {"group": "ester", "colour": "a4"}])])

mk("u13-26", "chem-regioselectivity", "structures", "Regioselectivity: adding HBr to propene",
   "HBr can add to propene two ways. The major product, 2-bromopropane, forms via the more stable secondary carbocation (Markovnikov's rule); 1-bromopropane, via a primary carbocation, is minor. The two products are position isomers.",
   "Propene with an arrow to 2-bromopropane (major) and 1-bromopropane (minor).",
   ["Propene + HBr.", "Major: 2-bromopropane, Br on the middle carbon.", "Minor: 1-bromopropane, Br on the end carbon."],
   between=["→", ""], betweenLabels=["HBr", ""],
   panels=[P("C=CC", "propene", groups=["alkene"]), P("CC(C)Br", "2-bromopropane", sub="major (via 2° C⁺)", groups=["halogenoalkane"]), P("BrCCC", "1-bromopropane", sub="minor (via 1° C⁺)", groups=["halogenoalkane"])],
   claims=[{"type": "isomers", "panels": [1, 2]}])

mk("u13-27", "chem-stereoselectivity", "structures", "Stereoselectivity: anti addition of bromine",
   "Bromine adds to cyclohexene through a bromonium ion, which bromide opens from the opposite face. Only trans-1,2-dibromocyclohexane forms, as a racemic mixture of the (R,R) and (S,S) enantiomers; the cis isomer does not form.",
   "Cyclohexene, an arrow labelled Br₂, and the two enantiomers of trans-1,2-dibromocyclohexane.",
   ["Cyclohexene + Br₂.", "Products: (1R,2R)- and (1S,2S)-1,2-dibromocyclohexane, the bromines on opposite faces (trans)."],
   between=["→", "+"], betweenLabels=["Br₂", ""],
   panels=[P("C1=CCCCC1", "cyclohexene", groups=["alkene"]), P("Br[C@@H:1]1CCCC[C@H:2]1Br", "(1R,2R)-trans", cip={"1": "R", "2": "R"}), P("Br[C@H:1]1CCCC[C@@H:2]1Br", "(1S,2S)-trans", cip={"1": "S", "2": "S"})],
   claims=[{"type": "enantiomers", "panels": [1, 2]}])

# ---------------------------------------------------------------- unit 14
mk("u14-01", "chem-alcohol-classes", "structures", "Primary, secondary and tertiary alcohols",
   "The class depends on how many carbons are attached to the carbon bearing –OH: one (primary), two (secondary) or three (tertiary). The class decides what oxidation gives: aldehyde then acid, ketone, or no reaction.",
   "Butan-1-ol, butan-2-ol and 2-methylpropan-2-ol, all C₄H₁₀O, with the carbon bearing OH shaded.",
   ["Butan-1-ol: the C–OH carbon has one carbon attached: primary.", "Butan-2-ol: two: secondary.", "2-Methylpropan-2-ol: three: tertiary."],
   panels=[P("CCCCO", "butan-1-ol", sub="primary", groups=["primary alcohol"], highlight=[{"group": "primary alcohol", "colour": "a1"}]),
           P("CCC(C)O", "butan-2-ol", sub="secondary", groups=["secondary alcohol"], highlight=[{"group": "secondary alcohol", "colour": "a4"}]),
           P("CC(C)(C)O", "2-methylpropan-2-ol", sub="tertiary", groups=["tertiary alcohol"], highlight=[{"group": "tertiary alcohol", "colour": "a5"}])],
   claims=[{"type": "isomers"}])

mk("u14-02", "chem-phenol-acidity", "structures", "Why phenol is more acidic than ethanol",
   "Phenol (pKa 10.0) loses H⁺ far more readily than ethanol (pKa about 16) because the phenoxide ion's charge is delocalised into the benzene ring. Ethoxide has nowhere to spread its charge.",
   "Phenol in equilibrium with phenoxide, compared with ethanol in equilibrium with ethoxide.",
   ["Phenol ⇌ phenoxide + H⁺: pKa 10.0, charge spread into the ring.", "Ethanol ⇌ ethoxide + H⁺: pKa about 16, charge on oxygen only."],
   perRow=[2, 2], between=["⇌", "", "⇌"],
   panels=[P("Oc1ccccc1", "phenol", sub="pKa 10.0", groups=["phenol"]), P("[O-]c1ccccc1", "phenoxide", sub="charge delocalised"), P("CCO", "ethanol", sub="pKa about 16", groups=["alcohol"]), P("CC[O-]", "ethoxide", sub="charge localised")])

mk("u14-03", "chem-ethers", "structures", "Ethers",
   "An ether has an oxygen bonded to two carbons, C–O–C. With no O–H, ethers cannot hydrogen bond to each other, so they boil far lower than alcohols of similar mass. Epoxides are three-membered cyclic ethers, strained and reactive.",
   "Methoxymethane, ethoxyethane and epoxyethane, with the C–O–C shaded.",
   ["Methoxymethane, CH₃OCH₃.", "Ethoxyethane, C₂H₅OC₂H₅, the old anaesthetic 'ether'.", "Epoxyethane: a three-membered ring of two carbons and an oxygen."],
   panels=[P("COC", "methoxymethane", groups=["ether"], highlight=[{"group": "ether", "colour": "a5"}]), P("CCOCC", "ethoxyethane", groups=["ether"], highlight=[{"group": "ether", "colour": "a5"}]), P("C1CO1", "epoxyethane", groups=["epoxide"])])

mk("u14-04", "chem-aldehydes", "structures", "Aldehydes",
   "In an aldehyde the C=O is at the end of a chain, with at least one hydrogen on the carbonyl carbon. That hydrogen is why aldehydes are easily oxidised (Tollens' and Fehling's tests) when ketones are not.",
   "Methanal, ethanal and benzaldehyde with the CHO group shaded.",
   ["Methanal, HCHO.", "Ethanal, CH₃CHO.", "Benzaldehyde, C₆H₅CHO."],
   panels=[P("C=O", "methanal", groups=["aldehyde"], highlight=[{"group": "aldehyde", "colour": "a2"}]), P("CC=O", "ethanal", groups=["aldehyde"], highlight=[{"group": "aldehyde", "colour": "a2"}]), P("O=Cc1ccccc1", "benzaldehyde", groups=["aldehyde"], highlight=[{"group": "aldehyde", "colour": "a2"}])])

mk("u14-05", "chem-ketones", "structures", "Ketones",
   "In a ketone the C=O is within the chain, with a carbon on each side, so there is no hydrogen on the carbonyl carbon to oxidise. Propanone is the simplest; ketones are named with -one.",
   "Propanone, butanone and cyclohexanone with the C=O shaded.",
   ["Propanone, CH₃COCH₃.", "Butanone, CH₃COCH₂CH₃.", "Cyclohexanone: the C=O in a six-membered ring."],
   panels=[P("CC(C)=O", "propanone", groups=["ketone"], highlight=[{"group": "ketone", "colour": "a2"}]), P("CCC(C)=O", "butanone", groups=["ketone"], highlight=[{"group": "ketone", "colour": "a2"}]), P("O=C1CCCCC1", "cyclohexanone", groups=["ketone"], highlight=[{"group": "ketone", "colour": "a2"}])])

mk("u14-06", "chem-carboxylate-resonance", "structures", "Why carboxylic acids are acidic",
   "Losing H⁺ from ethanoic acid gives ethanoate, whose negative charge is shared equally between the two oxygens. The two resonance forms are equivalent and both C–O bonds are the same length (0.127 nm), which stabilises the ion.",
   "Two resonance structures of ethanoate joined by a double-headed arrow.",
   ["Left: the double bond to the upper oxygen, the charge on the lower.", "Right: the reverse. The real ion is halfway between."],
   between=["↔"], panels=[P("CC(=O)[O-]", "", formula="C2H3O2", groups=["carboxylate"]), P("CC(=O)[O-]", "", rotate=180, formula="C2H3O2")],
   note="Both C–O bonds 0.127 nm, between C=O (0.123) and C–O (0.143)", claims=[{"type": "same", "panels": [0, 1], "name": "both forms have the same atoms and connections"}])

mk("u14-08", "chem-anhydride-acylation", "structures", "Making aspirin with an acid anhydride",
   "Ethanoic anhydride acylates the phenol –OH of salicylic acid, forming the ester in aspirin and ethanoic acid. Industry uses the anhydride rather than ethanoyl chloride because it is cheaper, less corrosive, reacts less violently and gives no HCl.",
   "Salicylic acid plus ethanoic anhydride gives aspirin plus ethanoic acid.",
   ["Salicylic acid: a phenol and a carboxylic acid on a benzene ring.", "Ethanoic anhydride.", "Aspirin (2-ethanoyloxybenzoic acid): the phenol is now an ester.", "Ethanoic acid."],
   between=["+", "→", "+"], bond=[28, 24], perRow=[4, 2],
   panels=[P("OC(=O)c1ccccc1O", "salicylic acid", groups=["phenol", "carboxylic acid"]), P("CC(=O)OC(C)=O", "ethanoic anhydride", groups=["acid anhydride"]),
           P("CC(=O)Oc1ccccc1C(=O)O", "aspirin", groups=["ester", "carboxylic acid"], highlight=[{"group": "ester", "colour": "a5"}]), P("CC(=O)O", "ethanoic acid")],
   claims=[{"type": "reaction", "left": [0, 1], "right": [2, 3]}])

mk("u14-09", "chem-esters", "structures", "Esters",
   "Esters, R–COO–R′, are named from the alcohol part then the acid part. Many smell fruity: ethyl ethanoate (nail varnish remover), ethyl butanoate (pineapple), 3-methylbutyl ethanoate (pear drops, banana).",
   "Ethyl ethanoate, ethyl butanoate and 3-methylbutyl ethanoate with the ester group shaded.",
   ["Ethyl ethanoate, CH₃COOC₂H₅.", "Ethyl butanoate.", "3-Methylbutyl ethanoate."],
   panels=[P("CCOC(C)=O", "ethyl ethanoate", groups=["ester"], highlight=[{"group": "ester", "colour": "a5"}]), P("CCCC(=O)OCC", "ethyl butanoate", groups=["ester"], highlight=[{"group": "ester", "colour": "a5"}]),
           P("CC(C)CCOC(C)=O", "3-methylbutyl ethanoate", groups=["ester"], highlight=[{"group": "ester", "colour": "a5"}])])

mk("u14-10", "chem-amides", "structures", "Amides and the peptide link",
   "Amides contain C(=O)–N. Replacing the N–H hydrogens with carbon groups gives secondary and tertiary amides. The amide bond joining amino acids in proteins is called the peptide link.",
   "Ethanamide, N-methylethanamide, N,N-dimethylethanamide, and the dipeptide glycylalanine with its peptide link shaded.",
   ["Primary amide: ethanamide, CH₃CONH₂.", "Secondary: N-methylethanamide.", "Tertiary: N,N-dimethylethanamide.", "Glycylalanine: two amino acids joined by a peptide link, –CO–NH–."],
   perRow=[4, 2], bond=[30, 26],
   panels=[P("CC(N)=O", "ethanamide", groups=["amide"], highlight=[{"group": "amide", "colour": "a3"}]), P("CNC(C)=O", "N-methylethanamide", groups=["amide"], highlight=[{"group": "amide", "colour": "a3"}]),
           P("CN(C)C(C)=O", "N,N-dimethylethanamide", groups=["amide"], highlight=[{"group": "amide", "colour": "a3"}]), P("NCC(=O)N[C@@H](C)C(=O)O", "glycylalanine", groups=["peptide link"], highlight=[{"group": "peptide link", "colour": "a3"}])])

mk("u14-11", "chem-amine-classes", "structures", "Classes of amine",
   "Amines are named by how many carbon groups are bonded to nitrogen: one (primary), two (secondary) or three (tertiary). A fourth gives a quaternary ammonium ion, which has no lone pair left and is no longer a base.",
   "Methylamine, dimethylamine, trimethylamine and the tetramethylammonium ion.",
   ["Primary: CH₃NH₂.", "Secondary: (CH₃)₂NH.", "Tertiary: (CH₃)₃N.", "Quaternary: (CH₃)₄N⁺."],
   perRow=[4, 2],
   panels=[P("CN", "methylamine", sub="primary", groups=["primary amine"]), P("CNC", "dimethylamine", sub="secondary", groups=["secondary amine"]), P("CN(C)C", "trimethylamine", sub="tertiary", groups=["tertiary amine"]),
           P("C[N+](C)(C)C", "tetramethylammonium", sub="quaternary ion", groups=["quaternary ammonium"])])

mk("u14-12", "chem-nitriles", "structures", "What nitriles become",
   "A nitrile carries the C≡N group, which adds a carbon to a chain. Hydrolysis with acid turns it into a carboxylic acid; reduction with LiAlH₄ (or H₂ over Ni) turns it into a primary amine.",
   "Ethanoic acid on the left, ethanenitrile in the middle, ethylamine on the right, with arrows from the nitrile to each.",
   ["Middle: ethanenitrile, CH₃C≡N.", "Left: hydrolysis (H⁺(aq), heat) gives ethanoic acid.", "Right: reduction (LiAlH₄) gives ethylamine."],
   between=["←", "→"], betweenLabels=["H⁺, H₂O", "LiAlH₄"],
   panels=[P("CC(=O)O", "ethanoic acid", groups=["carboxylic acid"]), P("CC#N", "ethanenitrile", groups=["nitrile"], highlight=[{"group": "nitrile", "colour": "a1"}]), P("CCN", "ethylamine", groups=["primary amine"])])

mk("u14-13", "chem-nitro-reduction", "structures", "Reducing nitrobenzene to phenylamine",
   "Tin and concentrated hydrochloric acid reduce the nitro group to –NH₂ (as the phenylammonium salt; adding NaOH frees the amine). Phenylamine is the starting point for azo dyes.",
   "Nitrobenzene, an arrow labelled Sn / conc. HCl then NaOH, and phenylamine.",
   ["Nitrobenzene, C₆H₅NO₂.", "Phenylamine, C₆H₅NH₂."],
   between=["→"], betweenLabels=["Sn, HCl; NaOH"],
   panels=[P("O=[N+]([O-])c1ccccc1", "nitrobenzene", groups=["nitro"], highlight=[{"group": "nitro", "colour": "a1"}]), P("Nc1ccccc1", "phenylamine", groups=["primary amine"], highlight=[{"group": "primary amine", "colour": "a4"}])])

mk("u14-16", "chem-thiols", "structures", "Thiols, sulfides and disulfides",
   "Sulfur sits below oxygen in group 16, giving thiols (R–SH), sulfides (R–S–R) and disulfides (R–S–S–R). Thiols smell strongly. Two cysteine thiols can be oxidised to a disulfide bridge, which holds protein chains in shape.",
   "Ethanethiol, dimethyl sulfide and dimethyl disulfide.",
   ["Ethanethiol, CH₃CH₂SH.", "Dimethyl sulfide, CH₃SCH₃.", "Dimethyl disulfide, CH₃SSCH₃: the S–S link."],
   panels=[P("CCS", "ethanethiol", groups=["thiol"], highlight=[{"group": "thiol", "colour": "a3"}]), P("CSC", "dimethyl sulfide", groups=["sulfide"], highlight=[{"group": "sulfide", "colour": "a3"}]), P("CSSC", "dimethyl disulfide", groups=["disulfide"], highlight=[{"group": "disulfide", "colour": "a3"}])])

mk("u14-17", "chem-organohalogens", "structures", "Organohalogen compounds",
   "CFCs such as dichlorodifluoromethane and trichlorofluoromethane were ideal refrigerants and propellants (unreactive, non-toxic) but carry chlorine to the stratosphere, where it destroys ozone. Halothane is an inhaled anaesthetic.",
   "Dichlorodifluoromethane, trichlorofluoromethane and halothane.",
   ["CCl₂F₂ (CFC-12).", "CCl₃F (CFC-11).", "Halothane, CF₃CHBrCl."],
   panels=[P("FC(F)(Cl)Cl", "CFC-12", formula="CCl2F2", groups=["halogenoalkane"]), P("FC(Cl)(Cl)Cl", "CFC-11", formula="CCl3F", groups=["halogenoalkane"]), P("FC(F)(F)C(Cl)Br", "halothane", formula="C2HBrClF3", groups=["halogenoalkane"])])

mk("u14-18", "chem-carbonyl-reactivity", "structures", "Reactivity of carboxylic acid derivatives",
   "Towards nucleophiles: acyl chlorides > acid anhydrides > esters > amides. The better the leaving group (Cl⁻ best, NH₂⁻ worst) and the less the lone pair next to C=O feeds into it, the more reactive the derivative.",
   "Ethanoyl chloride, ethanoic anhydride, methyl ethanoate and ethanamide in order of decreasing reactivity.",
   ["Ethanoyl chloride: most reactive.", "Ethanoic anhydride.", "Methyl ethanoate.", "Ethanamide: least reactive."],
   between=[">", ">", ">"], perRow=[4, 2], bond=[30, 28],
   panels=[P("CC(=O)Cl", "acyl chloride", groups=["acyl chloride"]), P("CC(=O)OC(C)=O", "anhydride", groups=["acid anhydride"]), P("COC(C)=O", "ester", groups=["ester"]), P("CC(N)=O", "amide", groups=["amide"])])

mk("u14-20", "chem-heterocycles", "structures", "Aromatic heterocycles",
   "A heteroatom in an aromatic ring. Pyridine's nitrogen lone pair lies outside the π system, so it is basic. In pyrrole, furan and thiophene a lone pair on N, O or S is part of the 6-electron aromatic system.",
   "Pyridine, pyrrole, furan and thiophene.",
   ["Pyridine, C₅H₅N: a six-membered ring.", "Pyrrole, C₄H₅N.", "Furan, C₄H₄O.", "Thiophene, C₄H₄S."],
   perRow=[4, 2],
   panels=[P("c1ccncc1", "pyridine", formula="C5H5N"), P("c1cc[nH]c1", "pyrrole", formula="C4H5N"), P("c1ccoc1", "furan", formula="C4H4O"), P("c1ccsc1", "thiophene", formula="C4H4S")])

mk("u14-21", "chem-synthesis-map", "flow", "A synthesis map from bromoethane",
   "From one halogenoalkane: aqueous hydroxide gives an alcohol, excess ammonia an amine, and cyanide in ethanol a nitrile with one more carbon, which hydrolyses to a carboxylic acid. Oxidising the alcohol gives ethanoic acid.",
   "A map with bromoethane at the centre and arrows to ethanol, ethylamine and propanenitrile; propanenitrile on to propanoic acid; ethanol on to ethanoic acid.",
   ["Bromoethane + NaOH(aq), heat → ethanol.", "Bromoethane + excess NH₃ (in ethanol, sealed tube) → ethylamine.", "Bromoethane + KCN in ethanol → propanenitrile (one more carbon).",
    "Propanenitrile + H⁺(aq), heat → propanoic acid.", "Ethanol + K₂Cr₂O₇/H⁺, reflux → ethanoic acid."],
   layout="grid", rowHeight=104, boxWidth=104,
   nodes=[{"id": "br", "label": "bromoethane", "col": 1, "row": 1, "tone": "a3"}, {"id": "oh", "label": "ethanol", "col": 0, "row": 0}, {"id": "acid1", "label": "ethanoic acid", "col": 0, "row": 2},
          {"id": "nh2", "label": "ethylamine", "col": 2, "row": 0}, {"id": "cn", "label": "propanenitrile", "col": 2, "row": 2}, {"id": "acid2", "label": "propanoic acid", "col": 3, "row": 2}],
   edges=[{"from": "br", "to": "oh", "label": "NaOH(aq), heat", "eq": "C2H5Br + OH- → C2H5OH + Br-"}, {"from": "br", "to": "nh2", "label": "excess NH₃", "eq": "C2H5Br + 2NH3 → C2H5NH2 + NH4Br"},
          {"from": "br", "to": "cn", "label": "KCN, ethanol", "eq": "C2H5Br + CN- → C2H5CN + Br-"}, {"from": "cn", "to": "acid2", "label": "H⁺(aq), heat", "eq": "C2H5CN + 2H2O + H+ → C2H5COOH + NH4+"},
          {"from": "oh", "to": "acid1", "label": "K₂Cr₂O₇/H⁺"}])

mk("u14-22", "chem-multistep-route", "flow", "Two steps: benzene to phenylamine",
   "No single reaction puts –NH₂ on benzene. Nitration (concentrated HNO₃ and H₂SO₄, below 55 °C) gives nitrobenzene; reduction with tin and HCl, then NaOH, gives phenylamine.",
   "Benzene, arrow (conc. HNO₃, conc. H₂SO₄, 55 °C), nitrobenzene, arrow (Sn, HCl; then NaOH), phenylamine.",
   ["Step 1: C₆H₆ + HNO₃ → C₆H₅NO₂ + H₂O.", "Step 2: C₆H₅NO₂ + 6[H] → C₆H₅NH₂ + 2H₂O, the [H] from tin and acid."],
   layout="line",
   nodes=[{"id": "a", "label": "benzene", "sub": "C₆H₆"}, {"id": "b", "label": "nitrobenzene", "sub": "C₆H₅NO₂", "tone": "a1"}, {"id": "c", "label": "phenylamine", "sub": "C₆H₅NH₂", "tone": "a4"}],
   edges=[{"from": "a", "to": "b", "label": "HNO₃/H₂SO₄, 55 °C", "eq": "C6H6 + HNO3 → C6H5NO2 + H2O"}, {"from": "b", "to": "c", "label": "Sn/HCl, then NaOH", "eq": "C6H5NO2 + 3H2 → C6H5NH2 + 2H2O"}])
