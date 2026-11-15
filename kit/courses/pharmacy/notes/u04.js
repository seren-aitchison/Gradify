// PharmaGradify Medicinal and Pharmaceutical Chemistry (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## Functional groups in drugs
LV: Intermediate · Foundation
S: A drug's functional groups decide how it binds its target, how it dissolves and how the body handles it. Recognising them lets you predict properties, interactions and instability from a structure.
O: Identify the main functional groups found in drug molecules
O: Relate functional groups to binding, solubility, metabolism and stability
O: Predict practical problems such as instability or interactions from a structure
T: Functional group | A specific arrangement of atoms within a molecule that gives characteristic chemical properties
T: Hydrogen bond | A weak attraction between a hydrogen on an electronegative atom and a lone pair on another electronegative atom
H: Common groups and what they do
- **Hydroxyl** (alcohol, phenol): hydrogen bond donor and acceptor; phenols are weakly acidic and prone to oxidation and glucuronidation.
- **Carboxylic acid**: acidic (pKa about 3 to 5), ionised at plasma pH, forms salts and ionic bonds.
- **Amines**: basic; most are protonated at plasma pH, forming ionic bonds with acidic residues such as aspartate in receptors.
- **Esters** and **amides**: hydrogen bond acceptors; esters hydrolyse readily, amides more slowly.
- **Aromatic rings**: flat, lipophilic, binding by van der Waals and pi-stacking interactions.
- **Halogens**: increase lipophilicity and can block metabolism at that position.
H: Why it matters in practice
- Groups that ionise improve water solubility and allow salt formation, such as sodium or hydrochloride salts.
- Groups that hydrolyse or oxidise predict storage problems, such as aspirin smelling of vinegar.
- Groups that are targets for phase I and II metabolism predict clearance and some interactions.
- Polar groups reduce membrane permeability; lipophilic groups increase it.
P: Pharmacists use functional groups to reason about real problems. A carboxylic acid suggests the drug will bind albumin and may be displaced by other acidic drugs. A phenol or catechol warns of oxidation and the need for light protection. An ester points to hydrolysis in liquid formulations, and a basic amine suggests the drug can be made into a soluble hydrochloride salt for injection.
X: Reading a structure.
> A pharmacist is asked why an oral liquid of a new drug has a short shelf life.
> The structure shows an ester linking two parts of the molecule.
> She explains that water in the liquid hydrolyses the ester, so the product is made up fresh or supplied as a powder.
K: Functional groups such as hydroxyls, acids, amines, esters, amides, aromatic rings and halogens determine binding, solubility, metabolism and stability.
!: Treating a drug as one fixed property. Each functional group contributes separately to binding, ionisation and breakdown.
EV: established | The contribution of functional groups to binding, ionisation, metabolism and stability is a core principle of medicinal chemistry.
Q: Why are most amine drugs positively charged in plasma? | They are bases that accept a proton at pH 7.4.
Q: Which functional group makes aspirin prone to hydrolysis? | Its ester group.
SUM: Functional groups predict binding, solubility and metabolism.
SUM: Esters hydrolyse, phenols oxidise, amines ionise.
SRC: Patrick GL, An Introduction to Medicinal Chemistry, 6th edition, Oxford University Press | secondary | 2017
SRC: Cairns D, Essentials of Pharmaceutical Chemistry, 4th edition, Pharmaceutical Press | secondary | 2012
M1#pharmacy-u04-01-q1@1: Which functional group is most likely to form an ionic bond with an aspartate residue in a receptor? | A protonated amine | An aromatic ring | A methyl group | An ether linkage | A chlorine substituent | A positively charged amine pairs with the negatively charged carboxylate of aspartate.
M2#pharmacy-u04-01-q2@2: Why does adding a chlorine to an aromatic ring often prolong a drug's action? | It can block metabolism at that position | It makes the drug fully water soluble | It turns the drug into a prodrug | It always increases receptor efficacy | It prevents the drug crossing membranes | Halogens resist oxidation, so they can block a site of metabolism.
M3#pharmacy-u04-01-q3@2: A drug contains an ester and a phenol. Which storage risks should you expect? | Hydrolysis and oxidation | Polymerisation and racemisation only | Evaporation and sublimation | No risk, as both groups are stable | Freezing and crystal growth only | Esters hydrolyse in moisture and phenols oxidise in air and light.
MATCH1#pharmacy-u04-01-q4@1: Match each group to a typical property. | Carboxylic acid = Ionised at plasma pH ; Ester = Hydrolyses readily ; Phenol = Prone to oxidation ; Aromatic ring = Lipophilic binding | Each group brings its own behaviour.
SA2#pharmacy-u04-01-q5@1,3: Explain how functional groups in a drug molecule affect its behaviour in the body and in storage. | Groups such as protonated amines and carboxylates form ionic bonds with targets, and hydroxyls form hydrogen bonds. Ionisable groups improve water solubility and allow salt formation, while aromatic rings and halogens increase lipophilicity and permeability. Phenols, esters and amides are sites of metabolism, and halogens can block metabolism. In storage, esters and amides hydrolyse and phenols oxidise, so formulation and packaging must protect them. | Binding ; Solubility and salts ; Lipophilicity ; Metabolism ; Stability

## Acids, bases and pKa
LV: Intermediate · Foundation
S: Most drugs are weak acids or weak bases. Their pKa tells you how strongly they hold on to a proton, which controls ionisation, solubility and absorption.
O: Define pKa and relate it to acid and base strength
O: Predict whether a drug is mainly ionised at a given pH
O: Relate a drug's pKa to its absorption, solubility and formulation
T: pKa | The pH at which a weak acid or base is 50% ionised
T: Conjugate acid | The form of a base after it has accepted a proton
H: Acids and bases
- A **weak acid** (HA) donates a proton: HA ⇌ H+ + A−. The lower the pKa, the stronger the acid.
- A **weak base** (B) accepts a proton: B + H+ ⇌ BH+. The pKa quoted for a base is that of its conjugate acid BH+; the higher the pKa, the stronger the base.
- Typical acidic drugs: aspirin, ibuprofen, warfarin, furosemide. Typical basic drugs: morphine, amitriptyline, propranolol.
- Some drugs are **amphoteric**, with both acidic and basic groups, such as ciprofloxacin.
H: The pKa rule of thumb
- At pH = pKa, the drug is 50% ionised.
- An acid is mostly **un-ionised** when the pH is below its pKa, and mostly **ionised** when the pH is above it.
- A base is mostly **ionised** when the pH is below its pKa, and mostly un-ionised above it.
- Each pH unit away from the pKa changes the ratio of ionised to un-ionised forms tenfold.
P: pKa has direct practical effects. Weak acids such as aspirin are more un-ionised in the acidic stomach, while weak bases are mostly un-ionised in the more alkaline small intestine, although most absorption of both happens in the small intestine because of its large surface area. Salt forms are chosen to improve solubility: sodium salts for weak acids and hydrochloride salts for weak bases. Mixing an acidic and a basic drug in the same infusion can cause precipitation.
X: Predicting ionisation.
> Amitriptyline is a weak base with a pKa of about 9.4.
> In plasma at pH 7.4, the pH is two units below its pKa.
> So it is about 99% ionised, yet the small un-ionised fraction still crosses membranes and it distributes widely into tissues.
K: pKa is the pH of 50% ionisation; acids ionise above their pKa and bases ionise below theirs, with a tenfold change per pH unit.
!: Reading a base's pKa as if it were an acid's. A high pKa means a strong base, which is mostly ionised at plasma pH.
EV: established | The relationship between pKa, pH and ionisation is a well-established principle of physical chemistry applied to drugs.
Q: What is true when the pH equals a drug's pKa? | The drug is 50% ionised.
Q: Is a weak base mostly ionised in the stomach? | Yes, because stomach pH is far below the pKa of most basic drugs.
SUM: pKa is the pH of half ionisation.
SUM: Acids ionise above pKa; bases ionise below it.
SRC: Cairns D, Essentials of Pharmaceutical Chemistry, 4th edition, Pharmaceutical Press | secondary | 2012
SRC: Aulton ME, Taylor KMG (editors), Aulton's Pharmaceutics, 6th edition, Elsevier | secondary | 2021
M1#pharmacy-u04-02-q1@1: A weak acid has a pKa of 4. At what pH is it 50% ionised? | pH 4 | pH 7 | pH 1 | pH 10 | pH 2 | At pH equal to pKa, ionised and un-ionised forms are present in equal amounts.
M2#pharmacy-u04-02-q2@2: Ibuprofen is a weak acid with a pKa of about 4.4. In which form is it mainly found in plasma at pH 7.4? | Ionised, as the pH is above its pKa | Un-ionised, as the pH is above its pKa | Exactly half ionised and half un-ionised | Fully protonated as a cation in plasma | Precipitated as solid crystals in plasma | Acids are mostly ionised when the pH is above their pKa.
M3#pharmacy-u04-02-q3@3: Which basic drug is the strongest base? | One with a pKa of 10 | One with a pKa of 4 | One with a pKa of 6 | One with a pKa of 2 | One with a pKa of 7 | For bases, a higher pKa of the conjugate acid means a stronger base.
TF1#pharmacy-u04-02-q4@1: A weak base is mostly un-ionised when the pH is well below its pKa. | false | Below its pKa a base accepts protons, so it is mostly ionised in acidic conditions.
SA2#pharmacy-u04-02-q5@1,3: Explain how pKa determines whether a drug is ionised at a given pH and why this matters. | pKa is the pH at which a weak acid or base is 50% ionised. Acids are mostly ionised above their pKa and bases mostly ionised below theirs, with a tenfold change in ratio per pH unit. The un-ionised form crosses membranes more easily, so ionisation affects absorption and distribution. Ionised forms are more water soluble, so salt forms improve solubility. Mixing acidic and basic drugs can cause precipitation. | Definition ; Acids and bases ; Membrane crossing ; Solubility and salts ; Practical effects

## Ionisation and the Henderson-Hasselbalch equation
LV: Intermediate · Application
S: The Henderson-Hasselbalch equation turns pKa and pH into a ratio of ionised to un-ionised drug. It explains absorption, ion trapping and urinary pH manipulation.
O: Use the Henderson-Hasselbalch equation for weak acids and bases
O: Explain ion trapping and its clinical relevance
O: Apply ionisation calculations to absorption, excretion and poisoning
T: Henderson-Hasselbalch equation | An equation relating pH, pKa and the ratio of ionised to un-ionised forms
T: Ion trapping | Accumulation of a drug on the side of a membrane where it is more ionised
H: The equations
- For a weak acid: pH − pKa = log ([A−] ÷ [HA]), so the ratio ionised to un-ionised is 10 to the power (pH − pKa).
- For a weak base: pKa − pH = log ([BH+] ÷ [B]), so the ratio ionised to un-ionised is 10 to the power (pKa − pH).
- Example: a weak acid with pKa 5.4 at pH 7.4 has a ratio of 10², so 100 parts ionised to 1 part un-ionised.
- Only the un-ionised form crosses lipid membranes readily by passive diffusion.
H: Ion trapping in practice
- At equilibrium, un-ionised concentrations are equal on both sides of a membrane, but total drug is higher where ionisation is greater.
- Weak acids concentrate in alkaline compartments; weak bases concentrate in acidic ones.
- **Urinary alkalinisation** with sodium bicarbonate increases ionisation and excretion of salicylate in overdose.
- Basic drugs can concentrate in **breast milk**, which is slightly more acidic than plasma.
P: To use the equation safely, first decide which form is ionised: A− for acids and BH+ for bases. Then subtract in the right order and raise 10 to that power. Percent ionised equals ratio ÷ (ratio + 1) × 100. In practice, these calculations explain why aspirin is excreted faster in alkaline urine, why amphetamine excretion rises in acidic urine, and why basic drugs can reach higher concentrations in breast milk than in plasma.
X: Calculating percent ionised.
> Pethidine is a weak base with a pKa of 8.7.
> At pH 7.7, the ratio ionised to un-ionised is 10^(8.7 − 7.7) = 10.
> So 10 ÷ 11 × 100, about 91%, is ionised.
K: For acids, ratio ionised to un-ionised equals 10^(pH − pKa); for bases, 10^(pKa − pH); drugs become trapped where they are more ionised.
!: Using the acid form of the equation for a base. Write out which form is ionised before calculating.
EV: established | The Henderson-Hasselbalch equation accurately describes ionisation of weak acids and bases in dilute aqueous solution.
Q: What is the ionised to un-ionised ratio of a weak acid at one pH unit above its pKa? | 10 to 1.
Q: Why does alkalinising urine increase salicylate excretion? | Salicylate is a weak acid, so it becomes more ionised and is trapped in the urine.
SUM: Henderson-Hasselbalch gives the ionised ratio.
SUM: Drugs are trapped where they are more ionised.
SRC: Aulton ME, Taylor KMG (editors), Aulton's Pharmaceutics, 6th edition, Elsevier | secondary | 2021
SRC: Rang HP et al., Rang and Dale's Pharmacology, 9th edition, Elsevier | secondary | 2019
M1#pharmacy-u04-03-q1@1: Which form of a drug crosses lipid membranes most readily by passive diffusion? | The un-ionised form | The ionised form | The protein-bound form | The salt form in solution | The hydrated cationic form | Un-ionised molecules are more lipid soluble and diffuse through membranes.
M2#pharmacy-u04-03-q2@2: A weakly basic drug crosses into a more acidic compartment. What happens? | It becomes more ionised and is trapped there | It becomes less ionised and diffuses back out | Its pKa rises to match the new pH | It is converted into a weak acid | It precipitates as an insoluble free acid | Bases ionise in acid, and ionised drug cannot easily diffuse back.
M3#pharmacy-u04-03-q3@3: Why is sodium bicarbonate used in salicylate poisoning? | It ionises salicylate in urine, increasing excretion | It neutralises salicylate in the stomach | It binds salicylate in plasma | It blocks salicylate absorption from the gut | It converts salicylate into a weak base | Alkaline urine traps the weak acid salicylate, so less is reabsorbed.
NUM1#pharmacy-u04-03-q4@1: A weak acid has a pKa of 5.4. At pH 7.4, how many parts are ionised for every one part un-ionised? | 100 | 0 | parts | Ratio = 10^(7.4 − 5.4) = 10², so 100 parts ionised to 1 part un-ionised.
SA2#pharmacy-u04-03-q5@1,3: Explain how the Henderson-Hasselbalch equation is used to understand ion trapping, with a clinical example. | For a weak acid the ratio ionised to un-ionised is 10^(pH − pKa); for a base it is 10^(pKa − pH). Only the un-ionised form crosses membranes readily, so at equilibrium total drug is higher where it is more ionised. Weak acids are trapped in alkaline compartments and weak bases in acidic ones. In salicylate poisoning, sodium bicarbonate alkalinises the urine, ionising salicylate so it is trapped and excreted rather than reabsorbed. | Acid equation ; Base equation ; Un-ionised form crosses ; Trapping ; Clinical example

## Lipophilicity and partition coefficients
LV: Intermediate · Application
S: Lipophilicity describes how much a drug prefers fats to water. It affects absorption, distribution into the brain, metabolism and binding, and is measured as log P or log D.
O: Define the partition coefficient and log P
O: Explain how lipophilicity affects drug behaviour
O: Interpret log P and log D values to predict absorption, distribution and formulation needs
T: Partition coefficient (P) | The ratio of a compound's concentration in octanol to its concentration in water at equilibrium, for the un-ionised form
T: Distribution coefficient (log D) | The octanol-water ratio of all forms of a compound at a stated pH
H: Measuring lipophilicity
- **P** = [drug in octanol] ÷ [drug in water], measured for the un-ionised form; **log P** is its base-10 logarithm.
- A log P of 3 means the drug is 1,000 times more concentrated in octanol than in water.
- **log D** includes ionised forms at a given pH, usually 7.4, so it is lower than log P for ionisable drugs.
- Octanol is used as a model for lipid membranes.
H: Effects on drug behaviour
- Higher lipophilicity generally increases **membrane permeability** and **CNS penetration**.
- Very lipophilic drugs have poor water solubility, high protein binding, a large volume of distribution and more hepatic metabolism.
- Most oral drugs have a log P between about 1 and 4.
- Topical and depot formulations exploit lipophilicity, for example lipophilic steroid esters and fluphenazine decanoate.
P: Log P describes only the un-ionised molecule, so for a drug that ionises at body pH, log D at pH 7.4 is a better guide to real behaviour. For an acid, log D falls as pH rises above the pKa; for a base, log D rises as pH increases. Very hydrophilic drugs, such as aminoglycosides, are poorly absorbed orally and must be injected, while very lipophilic drugs, such as amiodarone, accumulate in fat and have very long half-lives.
X: Comparing two beta-blockers.
> Atenolol has low lipophilicity, while propranolol is much more lipophilic.
> Propranolol crosses into the brain and causes more sleep disturbance and vivid dreams.
> Atenolol stays mainly outside the brain and is cleared largely unchanged by the kidneys.
K: Log P measures lipophilicity of the un-ionised form and log D includes ionisation at a given pH; higher lipophilicity increases permeability but reduces solubility.
!: Assuming more lipophilic always means better absorption. Very lipophilic drugs may not dissolve well enough to be absorbed.
EV: established | Lipophilicity is a well-established predictor of membrane permeability, distribution and metabolic clearance.
Q: What does a log P of 2 mean? | The drug is 100 times more concentrated in octanol than in water.
Q: Why is log D lower than log P for an ionisable drug at pH 7.4? | Ionised molecules stay in water, lowering the overall octanol to water ratio.
SUM: Log P measures lipophilicity.
SUM: Lipophilicity trades permeability against solubility.
SRC: Patrick GL, An Introduction to Medicinal Chemistry, 6th edition, Oxford University Press | secondary | 2017
SRC: Leo A, Hansch C and Elkins D, "Partition coefficients and their uses", Chemical Reviews 71(6), 525–616 | primary | 1971
M1#pharmacy-u04-04-q1@1: Which solvent pair is used to measure the partition coefficient? | Octanol and water | Ethanol and water | Hexane and methanol | Chloroform and acetone | Glycerol and water | Octanol and water are the standard pair for log P.
M2#pharmacy-u04-04-q2@2: Which property usually increases as log P increases? | Penetration into the central nervous system | Water solubility of the drug | Renal excretion of unchanged drug | Speed of dissolution in the gut | Fraction of drug unbound in plasma | Lipophilic drugs cross the blood-brain barrier more easily.
M3#pharmacy-u04-04-q3@3: Why are some antipsychotics given as decanoate esters by deep intramuscular injection? | The very lipophilic ester releases slowly from an oily depot | The ester makes the drug act within minutes | The ester allows the drug to be given orally | The ester prevents any hepatic metabolism | The ester removes the need for a carrier oil | High lipophilicity slows release from the oil, giving weeks of action.
NUM1#pharmacy-u04-04-q4@1: A drug is 1,000 times more concentrated in octanol than in water. What is its log P? | 3 | 0 | log units | The log of 1,000 to base 10 is 3.
SA2#pharmacy-u04-04-q5@1,3: Explain what log P and log D measure and how lipophilicity influences a drug's behaviour. | Log P is the base-10 log of the ratio of un-ionised drug concentration in octanol to water. Log D includes all forms at a stated pH and is lower than log P for ionisable drugs. Higher lipophilicity increases membrane permeability and CNS penetration, protein binding, volume of distribution and hepatic metabolism, but reduces water solubility. Very hydrophilic drugs may need injection, while very lipophilic drugs may accumulate in tissues. | Log P ; Log D ; Permeability and CNS ; Distribution and metabolism ; Solubility trade-off

## Stereochemistry and chirality
LV: Intermediate · Application
S: Many drugs exist as mirror-image forms that the body can tell apart. Stereochemistry explains why one form may be active, inactive or even harmful.
O: Define chirality, enantiomers and racemic mixtures
O: Explain why stereochemistry matters for drug action and safety
O: Explain how enantiomers can differ in pharmacokinetics and why this matters in prescribing
T: Chiral centre | A carbon atom bonded to four different groups, giving non-superimposable mirror images
T: Enantiomers | A pair of molecules that are non-superimposable mirror images of each other
H: Describing stereochemistry
- Enantiomers are labelled **R** or **S** by the Cahn-Ingold-Prelog priority rules.
- They have identical physical properties except the direction they rotate plane-polarised light, (+) or (−).
- A **racemate** is a 50:50 mixture of two enantiomers.
- **Diastereomers** are stereoisomers that are not mirror images and have different physical properties.
H: Why it matters
- Receptors and enzymes are chiral, so enantiomers can differ in **potency**, effects and metabolism.
- The more active enantiomer is the **eutomer**; the less active is the **distomer**.
- **Single-enantiomer** products include esomeprazole, escitalopram and levocetirizine.
- Thalidomide's enantiomers interconvert in the body, so giving one form alone would not have prevented its harm.
P: Enantiomers can differ not only in activity but also in metabolism. Warfarin is given as a racemate; S-warfarin is more potent and is metabolised mainly by CYP2C9, while R-warfarin is metabolised by other enzymes, so interacting drugs can affect the two forms differently. Some drugs are labelled with prefixes such as levo- or dex-, as in levothyroxine and dexamfetamine, showing the stereochemistry of the active form.
X: A racemic drug and an interaction.
> A patient on warfarin starts a drug that inhibits CYP2C9.
> Clearance of the more potent S-warfarin falls more than that of R-warfarin.
> The INR rises sharply, so the warfarin dose must be reviewed and monitored.
K: Chiral drugs have R and S enantiomers that chiral targets distinguish; racemates contain both, and single-enantiomer drugs aim to give the more active form.
!: Assuming a single-enantiomer product is always safer. Some enantiomers interconvert in the body, as thalidomide does.
EV: established | Stereoselective differences in drug action and metabolism are well documented for many chiral drugs.
Q: What is a racemate? | A 50:50 mixture of two enantiomers.
Q: What is a eutomer? | The more active enantiomer of a chiral drug.
SUM: Chiral targets distinguish enantiomers.
SUM: Eutomers are active; distomers less so.
SRC: Patrick GL, An Introduction to Medicinal Chemistry, 6th edition, Oxford University Press | secondary | 2017
SRC: Nguyen LA, He H and Pham-Huy C, "Chiral drugs: an overview", International Journal of Biomedical Science 2(2), 85–100 | primary | 2006
M1#pharmacy-u04-05-q1@1: What makes a carbon atom a chiral centre? | It is bonded to four different groups | It is part of an aromatic ring | It forms a double bond to oxygen | It carries a positive charge | It is bonded to two identical groups | Four different substituents give two non-superimposable mirror images.
M2#pharmacy-u04-05-q2@2: Esomeprazole is the S-enantiomer of omeprazole. What is the rationale for single-enantiomer products? | To give the form with the more favourable activity or kinetics | To make the drug achiral and stable | To double the dose of both enantiomers | To prevent any metabolism by the liver | To change the drug into a different class | Selecting one enantiomer can improve potency or reduce variability.
M3#pharmacy-u04-05-q3@3: Why would a thalidomide product made only of the R-enantiomer still be unsafe in pregnancy? | The enantiomers interconvert in the body | The R-enantiomer is not absorbed at all | The R-enantiomer is excreted unchanged | Thalidomide is not a chiral molecule | Only the racemate is ever teratogenic | Racemisation in vivo forms the harmful enantiomer.
TF1#pharmacy-u04-05-q4@1: Enantiomers rotate plane-polarised light in opposite directions. | true | Enantiomers share physical properties except the direction of optical rotation.
SA2#pharmacy-u04-05-q5@1,3: Explain why stereochemistry matters for drug action and safety. | A chiral centre is a carbon bonded to four different groups, giving R and S enantiomers. Receptors and enzymes are chiral, so enantiomers can differ in potency, effects and metabolism; the eutomer is the more active form. Racemates contain both forms, and single-enantiomer products such as esomeprazole aim to give the more favourable one. Enantiomers can be metabolised by different enzymes, as with warfarin, and some interconvert in the body, as thalidomide does. | Chirality ; Chiral targets ; Eutomer and distomer ; Single enantiomers ; Metabolism and interconversion

## Structure-activity relationships
LV: Intermediate · Application
S: Structure-activity relationships link changes in a molecule's structure to changes in its biological effect. They guide chemists in deciding which parts of a drug to keep, change or remove.
O: Explain the purpose of structure-activity relationship studies
O: Describe common structural changes and their effects on activity
O: Interpret simple SAR data to identify essential groups in a molecule
T: Structure-activity relationship (SAR) | The relationship between a molecule's chemical structure and its biological activity
T: QSAR | Quantitative structure-activity relationships, which model activity mathematically from physicochemical properties
H: How SAR studies work
- Make a series of **analogues** that change one feature at a time.
- Test each for activity, selectivity and other properties.
- Identify groups that are **essential** for binding and those that can be changed.
- Common changes: varying alkyl chain length, adding or removing rings, changing substituents and their positions.
H: Lessons from SAR
- Removing a group needed for a key **hydrogen bond** or **ionic bond** often abolishes activity.
- **Chain extension** can reach a new binding pocket or switch an agonist to an antagonist.
- Changing the size of the group on the nitrogen of adrenaline analogues shifts selectivity: larger groups favour beta receptors, as in isoprenaline and salbutamol.
- **QSAR** uses properties such as log P, electronic effects and size to predict activity.
P: SAR is used throughout the life of drug families. The beta-blockers were developed by changing the structure of isoprenaline: adding an aryloxypropanolamine chain and changing the aromatic ring produced antagonists such as propranolol. Later changes to the ring substituents gave cardioselective drugs such as atenolol and bisoprolol. Each step kept the essential groups, such as the secondary amine and the hydroxyl, needed for binding to beta-adrenoceptors.
X: Interpreting SAR data.
> A series of analogues varies the length of an alkyl chain from one to six carbons.
> Activity rises up to four carbons, then falls sharply.
> The chemist concludes the chain fills a hydrophobic pocket that can hold about four carbons.
K: SAR studies vary structure one feature at a time to find essential groups and tune activity and selectivity; QSAR models this quantitatively.
!: Changing several features at once. It becomes impossible to tell which change caused the effect.
EV: established | Structure-activity relationship studies are a long-standing, central method in medicinal chemistry.
Q: What is the aim of a structure-activity relationship study? | To find which parts of a molecule are needed for activity and how changes affect it.
Q: What effect does a larger nitrogen substituent have on adrenaline analogues? | It increases selectivity for beta-adrenoceptors.
SUM: SAR links structure to activity.
SUM: Change one feature at a time.
SRC: Patrick GL, An Introduction to Medicinal Chemistry, 6th edition, Oxford University Press | secondary | 2017
SRC: Hansch C and Fujita T, "p-σ-π analysis: a method for the correlation of biological activity and chemical structure", Journal of the American Chemical Society 86(8), 1616–1626 | primary | 1964
M1#pharmacy-u04-06-q1@1: In an SAR study, a hydroxyl group is replaced by a methoxy group and activity is lost. What does this suggest? | The hydroxyl acts as a hydrogen bond donor in binding | The hydroxyl has no role in binding | The drug is now a prodrug | The molecule has become chiral | The methoxy group increases potency | Methylation removes the hydrogen that the hydroxyl donated in a key bond.
M2#pharmacy-u04-06-q2@2: Why are analogues usually made with only one structural change at a time? | So the effect can be linked to that specific change | So the compounds are quicker to synthesise | So the analogues are always more potent | So no testing of selectivity is required | So the drug can skip clinical trials | One change at a time makes cause and effect clear.
M3#pharmacy-u04-06-q3@3: Salbutamol has a bulky tert-butyl group on its nitrogen. What does this group mainly contribute? | Selectivity for beta-2 adrenoceptors | Selectivity for alpha-1 adrenoceptors | Activity as a muscarinic antagonist | Resistance to all phase II metabolism | Ability to cross the blood-brain barrier | Bulky nitrogen substituents favour beta-adrenoceptor selectivity.
MATCH1#pharmacy-u04-06-q4@1: Match each term to its meaning. | SAR = Structure linked to activity ; QSAR = Mathematical activity model ; Analogue = Structurally related compound ; Selectivity = Preference for one target | These terms describe drug optimisation.
SA2#pharmacy-u04-06-q5@1,3: Explain how structure-activity relationship studies are carried out and what they reveal. | Chemists make analogues that change one feature at a time, such as chain length, substituents or rings, and test their activity and selectivity. Losing activity when a group is removed or masked shows it is essential, for example as a hydrogen bond donor or ionic binding group. Changes can increase potency, alter selectivity, as larger nitrogen substituents do for beta receptors, or switch agonists to antagonists. QSAR models activity mathematically from properties such as log P. | Analogues ; One change at a time ; Essential groups ; Potency and selectivity ; QSAR

## Pharmacophores and lead optimisation
LV: Intermediate · Application
S: A pharmacophore is the arrangement of features a molecule needs to act at its target. Lead optimisation refines a promising compound into a candidate drug with the right potency, selectivity and properties.
O: Define a pharmacophore and a lead compound
O: Describe the goals and strategies of lead optimisation
O: Explain how ADME and safety properties are improved alongside potency
T: Pharmacophore | The spatial arrangement of features, such as hydrogen bond donors, acceptors, charges and hydrophobic regions, needed for activity
T: Lead compound | A compound with promising activity that is used as a starting point for optimisation
H: From hit to lead
- **Hits** come from high-throughput screening, fragment screening, natural products or computer-based design.
- A **lead** shows reproducible activity and a structure that can be modified.
- The **pharmacophore** is defined from SAR and target structures, and guides design of new analogues.
H: Optimising the lead
- Improve **potency** and **selectivity** against related targets.
- Improve **ADME** properties: absorption, distribution, metabolism and excretion.
- Reduce **toxicity**, such as hERG channel binding that can cause QT prolongation.
- Strategies include **rigidification** to lock the active shape, adding or removing groups, ring variation and bioisosteres.
- The aim is a **candidate drug** suitable for preclinical and clinical development.
P: Lead optimisation is a balancing act often guided by a target product profile, which states the desired dose, route, frequency and safety margin. Improving one property can worsen another: adding lipophilic groups may increase potency but also increase metabolism, protein binding and hERG risk. Teams therefore track several measures at once, such as potency, selectivity, solubility, metabolic stability, permeability and early toxicity signals, before selecting a candidate for development.
X: A trade-off in optimisation.
> A lead compound is highly potent but is metabolised very quickly in liver microsomes.
> Chemists add a fluorine to block the main site of oxidation.
> Metabolic stability improves while potency is kept, so the compound moves forward.
K: A pharmacophore is the set of features needed for activity; lead optimisation improves potency, selectivity, ADME and safety to produce a candidate drug.
!: Optimising potency alone. A very potent compound with poor absorption or toxicity will still fail.
EV: established | Multiparameter optimisation of potency, ADME and safety is standard practice in pharmaceutical drug discovery.
Q: What is a pharmacophore? | The spatial arrangement of features a molecule needs for activity.
Q: Why is hERG binding checked during lead optimisation? | It can cause QT prolongation and dangerous arrhythmias.
SUM: Pharmacophores define what is needed.
SUM: Optimisation balances potency, ADME and safety.
SRC: Patrick GL, An Introduction to Medicinal Chemistry, 6th edition, Oxford University Press | secondary | 2017
SRC: International Union of Pure and Applied Chemistry, Glossary of terms used in medicinal chemistry | standard | 1998 | https://iupac.org/
M1#pharmacy-u04-07-q1@1: Which describes a lead compound? | A promising active compound used as a starting point | A licensed medicine already on the market | An inactive impurity found in a batch | The final dosage form given to patients | A compound that failed every screen | Leads are starting points for optimisation.
M2#pharmacy-u04-07-q2@2: Why might chemists rigidify a flexible lead molecule? | To lock it into its active shape and improve binding | To make it dissolve faster in water | To ensure it is metabolised very quickly | To remove all of its hydrogen bonds | To convert it into a racemic mixture | A rigid molecule loses less energy fitting the target.
M3#pharmacy-u04-07-q3@3: A potent lead blocks hERG channels strongly. What is the main concern? | Risk of QT prolongation and arrhythmias | Risk of poor tablet compression | Risk of light sensitivity in storage | Risk of fast renal excretion | Risk of low lipophilicity | hERG block is a major cause of drug-induced QT prolongation.
SEQ1#pharmacy-u04-07-q4@1: Order the stages of early drug discovery. | Screen for hits ; Select a lead ; Optimise the lead ; Choose a candidate drug | Discovery moves from hits to a candidate.
SA2#pharmacy-u04-07-q5@1,3: Describe how a lead compound is turned into a candidate drug. | Hits from screening or design are confirmed and a lead with a modifiable structure is chosen. The pharmacophore, defined from SAR and target structures, guides design of analogues. Optimisation improves potency and selectivity, ADME properties such as absorption and metabolic stability, and safety, for example reducing hERG binding. Strategies include rigidification, adding or removing groups, ring changes and bioisosteres. Trade-offs are managed against a target profile before a candidate is selected. | Hits and leads ; Pharmacophore ; Potency and selectivity ; ADME and safety ; Strategies and trade-offs

## Prodrugs
LV: Intermediate · Application
S: A prodrug is inactive or less active until the body converts it into the active drug. Prodrugs solve problems of absorption, stability, targeting or taste, but their activation can vary between patients.
O: Define a prodrug and give examples
O: Explain why prodrugs are used and how activation can vary
O: Apply knowledge of prodrug activation to patient safety and counselling
T: Prodrug | A compound that is converted in the body into an active drug
T: Bioactivation | The metabolic conversion of a prodrug into its active form
H: Why prodrugs are used
- **Improve absorption**: enalapril is an ester of enalaprilat, which is poorly absorbed orally.
- **Improve bioavailability**: valaciclovir gives much higher aciclovir levels than oral aciclovir.
- **Cross barriers**: levodopa is carried into the brain and converted to dopamine.
- **Improve solubility** for injection, such as fosphenytoin.
- **Prolong action**, as with depot esters.
H: Activation and variability
- Activation is often by **esterases**, or by cytochrome P450 enzymes.
- **Codeine** is activated to morphine by CYP2D6; ultra-rapid metabolisers risk toxicity, and poor metabolisers get little benefit.
- **Clopidogrel** needs CYP2C19 activation; poor metabolisers have reduced antiplatelet effect.
- Liver disease or interacting drugs can reduce activation.
P: Because activation varies, some prodrugs carry specific warnings. In the UK, codeine is contraindicated in children under 12 for pain and in breastfeeding mothers, because ultra-rapid CYP2D6 metabolisers can form dangerous amounts of morphine. Omeprazole and esomeprazole inhibit CYP2C19 and can reduce clopidogrel's effect, so the combination is avoided. Pharmacists should check interactions that block activation as well as those that block elimination.
X: Counselling on codeine.
> A breastfeeding mother asks for co-codamol for pain after birth.
> The pharmacist explains that some women convert codeine to morphine very quickly, which can harm the baby.
> She recommends paracetamol or ibuprofen instead.
K: Prodrugs are activated in the body to improve absorption, solubility, targeting or duration; activation by enzymes such as CYP2D6 and CYP2C19 varies between patients.
!: Forgetting that prodrug activation can fail. Poor metabolisers may get little effect from codeine or clopidogrel.
EV: established | Pharmacogenetic variation in CYP2D6 and CYP2C19 affects activation of codeine and clopidogrel, and regulators have issued safety advice on this basis.
Q: Which enzyme converts codeine to morphine? | CYP2D6.
Q: Why is enalapril given rather than enalaprilat orally? | Enalapril is better absorbed and is converted to enalaprilat in the body.
SUM: Prodrugs are activated in the body.
SUM: Genetics and interactions affect activation.
SRC: Rautio J et al., "The expanding role of prodrugs in contemporary drug design and development", Nature Reviews Drug Discovery 17, 559–587 | primary | 2018
SRC: Medicines and Healthcare products Regulatory Agency, Codeine for analgesia: restricted use in children because of reports of morphine toxicity | guidance | 2013 | https://www.gov.uk/drug-safety-update
M1#pharmacy-u04-08-q1@1: Which of these is a prodrug? | Enalapril | Ramipril's active metabolite ramiprilat | Morphine | Paracetamol | Salbutamol | Enalapril is converted by esterases to the active enalaprilat.
M2#pharmacy-u04-08-q2@2: Why is valaciclovir often preferred to oral aciclovir? | It gives much higher aciclovir levels after absorption | It has a completely different antiviral target | It is active without any conversion | It is only given by intravenous injection | It avoids all renal excretion of aciclovir | The valine ester improves absorption, then releases aciclovir.
M3#pharmacy-u04-08-q3@3: A patient on clopidogrel is a CYP2C19 poor metaboliser. What is the likely effect? | Reduced antiplatelet effect from poor activation | Increased bleeding from excess active metabolite | No change, as clopidogrel needs no activation | Faster renal excretion of clopidogrel | Conversion of clopidogrel into aspirin | Clopidogrel needs CYP2C19 to form its active metabolite.
MATCH1#pharmacy-u04-08-q4@1: Match each prodrug to its active form. | Codeine = Morphine ; Enalapril = Enalaprilat ; Levodopa = Dopamine ; Valaciclovir = Aciclovir | Each prodrug is converted to an active drug.
SA2#pharmacy-u04-08-q5@1,3: Explain what prodrugs are, why they are used and how their activation can vary between patients. | A prodrug is converted in the body into an active drug. Prodrugs improve absorption, as with enalapril and valaciclovir, cross barriers, as levodopa does, improve solubility, as fosphenytoin does, or prolong action. Activation is often by esterases or cytochrome P450 enzymes. Codeine needs CYP2D6 and clopidogrel needs CYP2C19, so poor metabolisers get little effect and ultra-rapid codeine metabolisers risk toxicity. Interacting drugs and liver disease can also reduce activation. | Definition ; Reasons for use ; Examples ; Enzyme activation ; Variability and safety

## Bioisosteres
LV: Intermediate · Application
S: Bioisosteres are groups that can replace each other while keeping similar biological effects. Swapping in a bioisostere can improve stability, absorption or selectivity without losing activity.
O: Define classical and non-classical bioisosteres
O: Give examples of bioisosteric replacements in drugs
O: Evaluate the benefits and risks of a bioisosteric replacement
T: Bioisostere | A group that can replace another with broadly similar biological properties
T: Classical bioisostere | A replacement with the same valency and similar size, such as F for H
H: Types of bioisostere
- **Classical**: atoms or groups with similar size and valency, such as F for H, NH for O, or S for CH=CH in rings.
- **Non-classical**: groups that differ in atoms but mimic key properties, such as a **tetrazole** for a carboxylic acid.
- The replacement must keep the features needed in the pharmacophore.
H: Examples and benefits
- Losartan uses a **tetrazole**, which is acidic like a carboxylic acid but more lipophilic and metabolically stable.
- **Fluorine** replacing hydrogen blocks oxidation and can increase potency, as in many modern drugs.
- Replacing an **ester** with an **amide** reduces hydrolysis, as procainamide replaced procaine for longer action.
- 5-fluorouracil uses F in place of H on uracil, so it is accepted by enzymes but then blocks DNA synthesis.
P: Bioisosteric replacement is a trade-off. A tetrazole keeps the acidity of a carboxylic acid but changes its size and lipophilicity, improving oral absorption in the sartans. Replacing hydrogen with fluorine can block metabolism, but it also changes electron distribution and may alter binding or pKa of nearby groups. Chemists must test each replacement, because a group that mimics one property may differ in others that matter for the target.
X: Making a drug longer acting.
> Procaine, an ester local anaesthetic, is rapidly hydrolysed by plasma esterases.
> Replacing the ester with an amide gives procainamide.
> Procainamide resists hydrolysis and lasts much longer, which made it useful as an antiarrhythmic.
K: Bioisosteres swap groups with similar properties, such as tetrazole for carboxylic acid or F for H, to improve stability, absorption or selectivity while keeping activity.
!: Assuming a bioisostere behaves identically. Small changes in size, acidity or polarity can alter binding and kinetics.
EV: established | Bioisosteric replacement is a widely used and well-documented strategy in medicinal chemistry.
Q: What is a bioisostere? | A group that can replace another with broadly similar biological properties.
Q: Which group in losartan acts as a bioisostere of a carboxylic acid? | A tetrazole.
SUM: Bioisosteres keep activity with a different group.
SUM: They improve stability or properties.
SRC: Meanwell NA, "Synopsis of some recent tactical application of bioisosteres in drug design", Journal of Medicinal Chemistry 54(8), 2529–2591 | primary | 2011
SRC: Patrick GL, An Introduction to Medicinal Chemistry, 6th edition, Oxford University Press | secondary | 2017
M1#pharmacy-u04-09-q1@1: Which pair is a classical bioisosteric replacement? | Fluorine for hydrogen | Tetrazole for carboxylic acid | Benzene ring for sodium ion | Ester for chloride ion | Water for ethanol | Fluorine is similar in size to hydrogen and has the same valency.
M2#pharmacy-u04-09-q2@2: Why might an amide replace an ester in a drug? | Amides are more resistant to hydrolysis | Amides are always more lipophilic than esters | Amides cannot form any hydrogen bonds | Amides are converted to prodrugs immediately | Amides make the drug achiral | Amides hydrolyse much more slowly, prolonging action.
M3#pharmacy-u04-09-q3@3: How does 5-fluorouracil exploit bioisosterism? | Fluorine mimics hydrogen so enzymes accept it, then it blocks DNA synthesis | Fluorine makes it a strong base that kills cells | Fluorine prevents it entering any cells | Fluorine converts it into a steroid | Fluorine makes it a beta-lactam antibiotic | Its similarity to uracil lets it enter the pathway and inhibit thymidylate synthase.
TF1#pharmacy-u04-09-q4@1: A tetrazole can act as a bioisostere for a carboxylic acid group. | true | Tetrazoles have similar acidity and charge at physiological pH but greater lipophilicity.
SA2#pharmacy-u04-09-q5@1,3: Explain what bioisosteres are and how they are used in drug design, with examples. | Bioisosteres are groups that can replace each other with broadly similar biological effects. Classical bioisosteres have similar size and valency, such as F for H. Non-classical ones mimic key properties with different atoms, such as tetrazole for carboxylic acid in losartan. Replacements can block metabolism, reduce hydrolysis as amides replacing esters do, or improve absorption. In 5-fluorouracil, fluorine lets the drug mimic uracil and then block DNA synthesis. Each swap must be tested, as other properties change. | Definition ; Classical ; Non-classical ; Benefits and examples ; Trade-offs

## Drug-likeness and Lipinski's rule of five
LV: Intermediate · Application
S: Drug-likeness describes properties that make a compound likely to be absorbed orally. Lipinski's rule of five is a quick screen for compounds that may have poor absorption or permeability.
O: State Lipinski's rule of five
O: Apply the rule and explain its limitations
O: Assess a compound against the rule of five and related guidelines
T: Drug-likeness | How closely a compound's properties match those of known oral drugs
T: Rule of five | Lipinski's guideline predicting poor oral absorption when compounds exceed set limits
H: The rule of five
- Poor absorption is more likely if a compound has **more than one** of these:
- **Molecular weight** over 500.
- **Log P** over 5.
- More than 5 **hydrogen bond donors** (OH and NH groups).
- More than 10 **hydrogen bond acceptors** (N and O atoms).
- The name comes from all the cut-offs being multiples of five.
H: Limitations
- It applies to **passive** absorption; drugs carried by transporters may break it.
- Many **natural products**, antibiotics and newer drugs such as some kinase inhibitors break it.
- Other measures include **polar surface area** and the number of rotatable bonds (Veber rules).
- It predicts absorption, not activity, safety or metabolism.
P: Drug-likeness rules are used early in discovery to filter large compound libraries. Veber and colleagues added that oral bioavailability is more likely with a polar surface area of 140 Å² or less and 10 or fewer rotatable bonds. These rules describe trends from historical drugs, not limits of chemistry. Newer modalities, such as macrocycles and protein degraders, deliberately work outside them and need other strategies, such as special formulations, to achieve absorption.
X: Applying the rule.
> A compound has a molecular weight of 420, log P of 3.2, 2 hydrogen bond donors and 6 acceptors.
> It breaks none of Lipinski's limits.
> Passive oral absorption is predicted to be reasonable, though this must still be tested.
K: Lipinski's rule predicts poor oral absorption when more than one limit is exceeded: MW over 500, log P over 5, over 5 donors or over 10 acceptors; transporter substrates and natural products often break it.
!: Treating the rule of five as a strict law. It is a guide for passive absorption, and many useful drugs break it.
EV: established | Lipinski's rule of five is widely used as a guide to oral drug-likeness, with well-recognised exceptions.
Q: What molecular weight limit does Lipinski's rule use? | 500.
Q: What does Lipinski's rule predict? | The likelihood of poor oral absorption or permeability.
SUM: MW 500, log P 5, 5 donors, 10 acceptors.
SUM: A guide, not a law.
SRC: Lipinski CA et al., "Experimental and computational approaches to estimate solubility and permeability in drug discovery and development settings", Advanced Drug Delivery Reviews 46(1–3), 3–26 | primary | 2001
SRC: Veber DF et al., "Molecular properties that influence the oral bioavailability of drug candidates", Journal of Medicinal Chemistry 45(12), 2615–2623 | primary | 2002
M1#pharmacy-u04-10-q1@1: What is the maximum number of hydrogen bond donors in Lipinski's rule? | 5 | 10 | 2 | 15 | 8 | More than 5 hydrogen bond donors counts as a violation of the rule.
M2#pharmacy-u04-10-q2@2: A compound has a molecular weight of 650 and a log P of 6. What does the rule predict? | Poor oral absorption is likely | Excellent oral absorption is certain | It will be inactive at its target | It must be given as a prodrug | It will be excreted unchanged in urine | Two violations suggest poor absorption by passive diffusion.
M3#pharmacy-u04-10-q3@3: Why do some antibiotics break the rule of five yet still work orally? | They are absorbed by transporters rather than passive diffusion | The rule applies only to injections | They are always given at very high doses | They do not need to be absorbed to work | The rule applies only to steroids | The rule covers passive absorption, not carrier-mediated uptake.
NUM1#pharmacy-u04-10-q4@1: Under Lipinski's rule, what is the maximum number of hydrogen bond acceptors allowed? | 10 | 0 | acceptors | The rule flags compounds with more than 10 hydrogen bond acceptors.
SA2#pharmacy-u04-10-q5@1,3: State Lipinski's rule of five and evaluate its usefulness. | The rule predicts poor oral absorption when a compound has more than one of: molecular weight over 500, log P over 5, more than 5 hydrogen bond donors and more than 10 hydrogen bond acceptors. It is a quick, useful filter in early discovery. However, it applies to passive absorption, so transporter substrates, many natural products, antibiotics and newer drugs break it. It does not predict activity, safety or metabolism, and other measures such as polar surface area and rotatable bonds add to it. | Four criteria ; More than one violation ; Usefulness ; Exceptions ; Other measures

## Beta-lactam chemistry
LV: Intermediate · Application
S: Beta-lactam antibiotics share a strained four-membered ring that attacks bacterial cell wall enzymes. The same reactivity makes them vulnerable to acid, beta-lactamases and allergy.
O: Describe the structure and mechanism of beta-lactam antibiotics
O: Explain beta-lactamase resistance, stability and allergy
O: Apply beta-lactam chemistry to choice, stability and allergy questions in practice
T: Beta-lactam ring | A strained four-membered cyclic amide that is the active core of penicillins and related antibiotics
T: Penicillin-binding proteins (PBPs) | Bacterial transpeptidase enzymes that cross-link peptidoglycan
H: Structure and action
- **Penicillins** have a beta-lactam ring fused to a five-membered thiazolidine ring; **cephalosporins** fuse it to a six-membered dihydrothiazine ring.
- **Carbapenems** and **monobactams** are other members of the family.
- Ring strain makes the amide reactive: it **acylates** the serine of PBPs, blocking cell wall cross-linking and causing cell lysis.
H: Resistance, stability and allergy
- **Beta-lactamases** hydrolyse the ring. Inhibitors such as **clavulanic acid** and tazobactam protect the antibiotic.
- Bulky side chains, as in flucloxacillin, block staphylococcal penicillinase.
- **Benzylpenicillin** is destroyed by stomach acid; **phenoxymethylpenicillin** has an electron-withdrawing side chain that improves acid stability.
- Opened beta-lactam rings bind proteins to form the **penicilloyl** groups that trigger allergy.
- Ampicillin and amoxicillin solutions degrade quickly, so reconstituted suspensions have short expiry.
P: The chemistry has direct practice consequences. Reconstituted amoxicillin and co-amoxiclav suspensions have short expiry dates and often need refrigeration because the beta-lactam ring hydrolyses in water. Penicillin allergy is linked to the beta-lactam core and side chains; cross-reactivity with cephalosporins is low but higher where side chains are similar, so a careful allergy history matters. Flucloxacillin's bulky side chain explains its use for staphylococcal skin infections.
X: Checking stability.
> A parent asks whether a co-amoxiclav suspension from last month can be used for a new infection.
> The pharmacist explains that the reconstituted suspension has a short expiry because the antibiotic degrades in water.
> She advises getting a fresh supply and discarding the old bottle safely.
K: Beta-lactams have a strained ring that acylates PBPs; beta-lactamases hydrolyse it, side chains and inhibitors protect it, and ring-opened products can cause allergy.
!: Assuming all penicillins are acid stable. Benzylpenicillin is destroyed in the stomach and must be given by injection.
EV: established | The mechanism of beta-lactam antibiotics and beta-lactamase resistance is well established.
Q: How do beta-lactams kill bacteria? | They acylate penicillin-binding proteins, blocking cell wall cross-linking.
Q: What does clavulanic acid do? | It inhibits beta-lactamases, protecting the partner antibiotic.
SUM: A strained ring acylates PBPs.
SUM: Beta-lactamases break the ring.
SRC: Patrick GL, An Introduction to Medicinal Chemistry, 6th edition, Oxford University Press | secondary | 2017
SRC: Bush K and Bradford PA, "β-Lactams and β-lactamase inhibitors: an overview", Cold Spring Harbor Perspectives in Medicine 6(8), a025247 | primary | 2016
M1#pharmacy-u04-11-q1@1: Why is the beta-lactam ring chemically reactive? | Its four-membered ring is highly strained | It contains a stable aromatic system | It has no carbonyl group at all | It is fully ionised in all conditions | It is protected by a steroid nucleus | Ring strain makes the amide carbonyl very reactive.
M2#pharmacy-u04-11-q2@2: Why is co-amoxiclav active against some bacteria resistant to amoxicillin? | Clavulanic acid inhibits beta-lactamases that destroy amoxicillin | Clavulanic acid kills bacteria by a separate route | Clavulanic acid speeds amoxicillin absorption | Clavulanic acid binds to bacterial ribosomes | Clavulanic acid reduces renal excretion of amoxicillin | The inhibitor protects amoxicillin from enzymatic hydrolysis.
M3#pharmacy-u04-11-q3@3: Why is benzylpenicillin given by injection rather than orally? | It is destroyed by stomach acid | It is too lipophilic to be absorbed | It is a prodrug activated in the liver | It binds irreversibly to food | It is only active against fungi | Acid degrades benzylpenicillin's beta-lactam ring.
TF1#pharmacy-u04-11-q4@1: Cephalosporins have a beta-lactam ring fused to a six-membered ring. | true | Cephalosporins fuse the beta-lactam ring to a six-membered dihydrothiazine ring.
SA2#pharmacy-u04-11-q5@1,3: Explain how the chemistry of the beta-lactam ring relates to the action, resistance and stability of penicillins. | The strained four-membered beta-lactam ring is highly reactive and acylates the serine of penicillin-binding proteins, blocking peptidoglycan cross-linking and causing lysis. Beta-lactamases hydrolyse the ring, causing resistance; inhibitors such as clavulanic acid protect the antibiotic, and bulky side chains such as in flucloxacillin resist penicillinase. The same reactivity causes acid instability in benzylpenicillin and short shelf lives for reconstituted suspensions. Ring-opened products can bind proteins and trigger allergy. | Ring strain ; PBP acylation ; Beta-lactamases and inhibitors ; Stability ; Allergy

## Steroid chemistry
LV: Intermediate · Application
S: Steroids share a rigid four-ring skeleton. Small changes to that skeleton separate glucocorticoid from mineralocorticoid activity and adjust potency for oral, inhaled and topical use.
O: Describe the steroid nucleus and its numbering
O: Explain how structural changes alter corticosteroid potency and activity
O: Relate corticosteroid structure to potency classes and choice of preparation
T: Steroid nucleus | Four fused rings, three six-membered (A, B, C) and one five-membered (D)
T: Glucocorticoid | A corticosteroid with mainly anti-inflammatory and metabolic effects
H: The steroid skeleton
- Rings **A, B and C** have six carbons; ring **D** has five.
- Substituents point **alpha** (below the plane) or **beta** (above it).
- Natural steroids include cholesterol, cortisol (hydrocortisone), aldosterone, oestradiol and testosterone.
- The rigid shape fits **nuclear receptors** that regulate gene transcription.
H: Modifying corticosteroids
- A **1,2 double bond** in ring A, as in prednisolone, increases glucocorticoid activity relative to mineralocorticoid activity.
- A **9-alpha fluorine** increases potency, as in dexamethasone, betamethasone and fludrocortisone.
- A **16-methyl** group, as in dexamethasone and betamethasone, cancels most mineralocorticoid effects.
- **Esters** at C17 or C21, such as betamethasone valerate or clobetasol propionate, increase lipophilicity and skin penetration.
P: Topical corticosteroids in the UK are grouped as mild, moderately potent, potent and very potent. Hydrocortisone 1% is mild; clobetasone butyrate is moderately potent; betamethasone valerate 0.1% is potent; and clobetasol propionate 0.05% is very potent. These differences come mainly from fluorination, methyl groups and esters. Systemic corticosteroids also differ: hydrocortisone has significant mineralocorticoid activity, while dexamethasone has almost none, so they are chosen for different uses.
X: Choosing a corticosteroid.
> A patient with adrenal insufficiency needs replacement of both glucocorticoid and mineralocorticoid activity.
> Hydrocortisone provides glucocorticoid action with some mineralocorticoid action, and fludrocortisone is added if needed.
> Dexamethasone would be a poor choice, as it has almost no mineralocorticoid effect.
K: Steroids have three six-membered rings and one five-membered ring; a 1,2 double bond, 9-alpha fluorine, 16-methyl and esters adjust potency, selectivity and skin penetration.
!: Assuming all corticosteroids have similar potency. Fluorinated esters such as clobetasol propionate are far more potent than hydrocortisone.
EV: established | Structure-activity relationships of corticosteroids, including the effects of fluorination, methylation and esterification, are well established.
Q: How many rings are in the steroid nucleus? | Four: three six-membered and one five-membered.
Q: What effect does a 16-methyl group have in dexamethasone? | It almost removes mineralocorticoid activity.
SUM: Four fused rings: A, B, C and D.
SUM: Small changes tune potency and selectivity.
SRC: Lemke TL et al. (editors), Foye's Principles of Medicinal Chemistry, 8th edition, Wolters Kluwer | secondary | 2020
SRC: Joint Formulary Committee, British National Formulary: Topical corticosteroids | guidance | 2025 | https://bnf.nice.org.uk/
M1#pharmacy-u04-12-q1@1: Which ring in the steroid nucleus has five carbons? | Ring D | Ring A | Ring B | Ring C | None, all are six-membered | Rings A, B and C are six-membered and ring D is five-membered.
M2#pharmacy-u04-12-q2@2: Prednisolone differs from hydrocortisone mainly by a 1,2 double bond. What does this change? | It increases glucocorticoid relative to mineralocorticoid activity | It makes it a sex hormone | It removes all anti-inflammatory action | It makes it a beta-lactam | It converts it into a prodrug of cortisol | The extra double bond favours glucocorticoid activity.
M3#pharmacy-u04-12-q3@3: Why is betamethasone used as the valerate ester in creams? | The ester increases lipophilicity and skin penetration | The ester makes it water soluble for injection | The ester reduces its potency to that of hydrocortisone | The ester prevents any absorption into skin | The ester makes it light stable only | Lipophilic esters penetrate the stratum corneum better.
MATCH1#pharmacy-u04-12-q4@1: Match each change to its effect. | 1,2 double bond = More glucocorticoid activity ; 9-alpha fluorine = Higher potency ; 16-methyl = Less mineralocorticoid activity ; C17 ester = Better skin penetration | Small changes tune corticosteroids.
SA2#pharmacy-u04-12-q5@1,3: Explain how structural changes to the steroid nucleus alter the activity of corticosteroids. | The steroid nucleus has three six-membered rings and one five-membered ring. A 1,2 double bond in ring A, as in prednisolone, increases glucocorticoid relative to mineralocorticoid activity. A 9-alpha fluorine increases potency, as in dexamethasone and fludrocortisone. A 16-methyl group largely removes mineralocorticoid activity. Esters at C17 or C21, such as betamethasone valerate or clobetasol propionate, increase lipophilicity and skin penetration, giving potent topical products. | Steroid nucleus ; 1,2 double bond ; 9-alpha fluorine ; 16-methyl ; Esters and topical potency

## Opioid chemistry
LV: Intermediate · Application
S: Morphine's structure is the template for many opioids. Changes to its hydroxyl groups and nitrogen produce prodrugs, faster-acting drugs and antagonists.
O: Describe the key features of morphine's structure
O: Explain how structural changes alter opioid activity
O: Relate opioid structure to onset, metabolism and reversal in practice
T: Opioid | A drug that acts at opioid receptors, such as mu, delta and kappa receptors
T: Opioid antagonist | A drug that binds opioid receptors without activating them, such as naloxone
H: Morphine's key features
- A rigid five-ring structure containing a **phenol** at position 3, an **alcohol** at position 6 and a **tertiary amine**.
- The protonated amine forms an **ionic bond** with an aspartate in the mu receptor.
- The 3-phenol is important for binding; the 6-hydroxyl is a site of glucuronidation, forming active morphine-6-glucuronide.
H: Structural changes
- **Codeine** is 3-methyl morphine: weaker binding, and it acts mainly after CYP2D6 converts it back to morphine.
- **Diamorphine** (heroin) is 3,6-diacetylmorphine: more lipophilic, so it enters the brain faster, then is deacetylated.
- Replacing the N-methyl with an **allyl** or cyclopropylmethyl group gives antagonists such as **naloxone** and naltrexone, or partial agonists such as buprenorphine.
- Simplified synthetic opioids include **pethidine**, **fentanyl** (very lipophilic and potent) and **methadone**.
P: Opioid chemistry explains practical points. Fentanyl's high lipophilicity allows transdermal patches and rapid-onset buccal products, but also accumulation in fat. Morphine-6-glucuronide is active and cleared by the kidneys, so morphine accumulates in renal impairment. Naloxone has a shorter duration than many opioids, so repeated doses or an infusion may be needed after overdose with long-acting drugs such as methadone. Buprenorphine binds tightly and is only partly reversed by naloxone.
X: Reversing an overdose.
> A patient is given naloxone after a methadone overdose and wakes up.
> Thirty minutes later, they become drowsy again with slow breathing.
> Naloxone has worn off while methadone is still active, so further naloxone and observation are needed.
K: Morphine's 3-phenol, 6-hydroxyl and tertiary amine are key; methylation gives codeine, acetylation gives diamorphine, and N-allyl substitution gives antagonists such as naloxone.
!: Assuming codeine is just a weak morphine. It acts mainly after CYP2D6 conversion, so response varies widely between people.
EV: established | The structure-activity relationships of morphine and its derivatives are well documented in medicinal chemistry.
Q: What structural change turns morphine into codeine? | Methylation of the 3-phenol group.
Q: Why does diamorphine act faster than morphine? | Its two acetyl groups make it more lipophilic, so it enters the brain faster.
SUM: Phenol, alcohol and amine are key.
SUM: N-allyl groups give antagonists.
SRC: Lemke TL et al. (editors), Foye's Principles of Medicinal Chemistry, 8th edition, Wolters Kluwer | secondary | 2020
SRC: Patrick GL, An Introduction to Medicinal Chemistry, 6th edition, Oxford University Press | secondary | 2017
M1#pharmacy-u04-13-q1@1: Which group of morphine forms an ionic bond with the mu receptor? | The protonated tertiary amine | The 6-hydroxyl group | The aromatic ring | The ether bridge | The 3-methyl group | The positively charged nitrogen pairs with a receptor aspartate.
M2#pharmacy-u04-13-q2@2: What makes naloxone an antagonist rather than an agonist? | An allyl group on the nitrogen in place of a methyl | Removal of the phenolic hydroxyl group | Acetylation of both hydroxyl groups | Conversion into a beta-lactam ring | Addition of a fluorine at position 9 | N-allyl substitution blocks receptor activation while keeping binding.
M3#pharmacy-u04-13-q3@3: Why does diamorphine have a faster onset than morphine at the same route? | Acetyl groups increase lipophilicity and brain entry | It binds a completely different receptor | It is not metabolised at all | It is excreted more slowly by the kidneys | It is less lipid soluble than morphine | Greater lipophilicity speeds passage across the blood-brain barrier.
TF1#pharmacy-u04-13-q4@1: Codeine has a methyl group on the 3-phenol of morphine. | true | Codeine is 3-O-methylmorphine, which reduces mu receptor binding.
SA2#pharmacy-u04-13-q5@1,3: Explain how changes to the morphine structure produce drugs with different properties. | Morphine has a 3-phenol, a 6-hydroxyl and a tertiary amine that binds the mu receptor ionically. Methylating the 3-phenol gives codeine, which binds weakly and is activated by CYP2D6. Acetylating both hydroxyls gives diamorphine, which is more lipophilic and enters the brain faster. Replacing the N-methyl with an allyl or cyclopropylmethyl group gives antagonists such as naloxone or partial agonists such as buprenorphine. Simplified synthetic opioids such as fentanyl are very lipophilic and potent. | Key features ; Codeine ; Diamorphine ; Antagonists ; Synthetic opioids

## Benzodiazepine chemistry
LV: Intermediate · Application
S: Benzodiazepines share a fused ring system that binds the GABA-A receptor. Their substituents decide potency, and their metabolism decides duration and choice in liver disease.
O: Describe the benzodiazepine ring system and key substituents
O: Relate benzodiazepine structure to metabolism and duration of action
O: Choose between benzodiazepines using structure, metabolism and patient factors
T: Benzodiazepine | A drug with a benzene ring fused to a seven-membered diazepine ring, acting at GABA-A receptors
T: Positive allosteric modulator | A drug that binds a separate site and increases the effect of the natural agonist
H: Structure and activity
- A **benzene** ring fused to a **1,4-diazepine** ring, usually with a phenyl group at position 5.
- An electron-withdrawing group at position **7**, such as Cl in diazepam or NO2 in nitrazepam, increases activity.
- A halogen at the **2'** position of the phenyl ring increases potency, as in lorazepam.
- Fused **triazolo** rings give potent, short-acting drugs such as alprazolam and midazolam (an imidazo ring).
- They are positive allosteric modulators of **GABA-A** receptors; **flumazenil** is the antagonist.
H: Metabolism and duration
- **Diazepam** is demethylated to **desmethyldiazepam** (nordazepam), with a very long half-life, then hydroxylated to oxazepam.
- Drugs with a **3-hydroxyl**, such as lorazepam, oxazepam and temazepam, undergo direct **glucuronidation** without active metabolites.
- These 3-hydroxy drugs are preferred in **hepatic impairment** and older people, as glucuronidation is less affected.
P: Duration and metabolism guide choice. Short-acting drugs such as temazepam are used as hypnotics to limit next-day sedation, while long-acting diazepam is used for alcohol withdrawal and muscle spasm and for tapering. Midazolam's imidazole ring makes it water soluble at acidic pH for injection, then more lipophilic at body pH, giving rapid onset. All benzodiazepines can cause dependence, so courses should be short, and they add to the sedative effects of opioids and alcohol.
X: Choosing a benzodiazepine.
> An older man with cirrhosis needs short-term treatment of severe anxiety.
> Diazepam would form long-acting metabolites that accumulate.
> The team chooses a low dose of lorazepam, which is glucuronidated directly, and reviews him closely.
K: Benzodiazepines have a fused benzene-diazepine ring; 7-position electron-withdrawing groups and 2'-halogens increase potency; 3-hydroxy drugs are directly glucuronidated and preferred in liver impairment.
!: Choosing diazepam for someone with liver disease. Its long-acting active metabolites accumulate, causing excess sedation.
EV: established | The metabolism and structure-activity relationships of benzodiazepines are well established.
Q: Which benzodiazepines are directly glucuronidated? | Those with a 3-hydroxyl group, such as lorazepam, oxazepam and temazepam.
Q: Which drug reverses benzodiazepine effects? | Flumazenil, a benzodiazepine antagonist.
SUM: Fused benzene and diazepine rings.
SUM: 3-hydroxy drugs avoid active metabolites.
SRC: Lemke TL et al. (editors), Foye's Principles of Medicinal Chemistry, 8th edition, Wolters Kluwer | secondary | 2020
SRC: Joint Formulary Committee, British National Formulary: Hypnotics and anxiolytics | guidance | 2025 | https://bnf.nice.org.uk/
M1#pharmacy-u04-14-q1@1: How do benzodiazepines act at the GABA-A receptor? | As positive allosteric modulators | As direct agonists at the GABA site | As irreversible enzyme inhibitors | As competitive glutamate antagonists | As sodium channel blockers | They bind a separate site and enhance GABA's effect.
M2#pharmacy-u04-14-q2@2: Why does diazepam have a long duration of action? | It forms the long-acting active metabolite desmethyldiazepam | It is excreted unchanged by the kidneys | It is directly glucuronidated in minutes | It binds irreversibly to GABA receptors | It is a prodrug with no activity | Desmethyldiazepam has a very long half-life and accumulates.
M3#pharmacy-u04-14-q3@3: Which benzodiazepine is usually preferred for an older person with liver impairment? | Lorazepam | Diazepam | Chlordiazepoxide | Nitrazepam | Clobazam | Lorazepam is directly glucuronidated with no active metabolites.
MATCH1#pharmacy-u04-14-q4@1: Match each structural feature to its effect. | 7-chloro group = Higher activity ; 2'-halogen = Higher potency ; 3-hydroxyl = Direct glucuronidation ; Triazolo ring = Potent and short acting | Substituents shape action and metabolism.
SA2#pharmacy-u04-14-q5@1,3: Explain how the structure of benzodiazepines relates to their activity and metabolism. | Benzodiazepines have a benzene ring fused to a seven-membered diazepine ring, with a 5-phenyl group. An electron-withdrawing group at position 7 and a halogen at the 2' position increase potency, and triazolo or imidazo rings give potent, short-acting drugs such as alprazolam and midazolam. They are positive allosteric modulators at GABA-A receptors. Diazepam forms the long-acting desmethyldiazepam, while 3-hydroxy drugs such as lorazepam are directly glucuronidated and preferred in liver impairment. | Ring system ; Substituents ; GABA-A action ; Diazepam metabolism ; 3-hydroxy drugs

## Chemical degradation pathways
LV: Intermediate · Application
S: Medicines break down by predictable chemical reactions. Knowing the pathway tells you how to formulate, package and store a product to protect it.
O: Describe the main chemical degradation pathways of drugs
O: Identify formulation and storage measures that reduce degradation
O: Recognise signs of degradation and advise on storage
T: Hydrolysis | Breakdown of a bond by reaction with water, common for esters and amides
T: Oxidation | Loss of electrons, often involving oxygen, common for phenols, catechols and thiols
H: Main pathways
- **Hydrolysis**: esters (aspirin, procaine) and amides (paracetamol, penicillins); speeded by water, heat and extremes of pH.
- **Oxidation**: catechols such as adrenaline, phenols, thiols; speeded by oxygen, light and trace metals.
- **Photolysis**: light-induced breakdown, as with nifedipine and sodium nitroprusside.
- **Racemisation**: conversion of one enantiomer into a mixture.
- **Polymerisation**: as with concentrated ampicillin solutions.
- **Decarboxylation** and other reactions under heat.
H: Protecting medicines
- Against **hydrolysis**: keep products dry, buffer to the pH of greatest stability, or supply as dry powder for reconstitution.
- Against **oxidation**: antioxidants such as sodium metabisulfite or ascorbic acid, chelating agents such as edetate, and nitrogen in the headspace.
- Against **photolysis**: amber glass, opaque packaging or light-protective covers on infusions.
- Store at the stated **temperature**, as heat speeds all reactions.
P: Pharmacists see degradation in practice. Aspirin tablets that smell of vinegar have hydrolysed. Adrenaline solutions that turn pink or brown have oxidised and must not be used. Glyceryl trinitrate tablets lose potency once opened and are kept in their original glass bottle. Some infusions, such as sodium nitroprusside and amphotericin, need protection from light. Following storage instructions, keeping products in original packaging and checking appearance help protect patients.
X: A discoloured injection.
> A nurse finds an adrenaline ampoule that has turned brown.
> The pharmacist explains that the catechol groups have oxidised, reducing potency.
> The ampoule is discarded and replaced from stock that is in date and protected from light.
K: Drugs degrade by hydrolysis, oxidation, photolysis, racemisation and polymerisation; formulation and packaging such as dry powders, antioxidants, chelators and amber containers protect them.
!: Ignoring a vinegar smell from aspirin tablets. It shows hydrolysis to salicylic acid and acetic acid, so the product has degraded.
EV: established | The main degradation pathways of drugs, and formulation methods to reduce them, are well established in pharmaceutics.
Q: Which degradation pathway affects esters most? | Hydrolysis.
Q: Why is adrenaline injection formulated with sodium metabisulfite? | As an antioxidant to protect the catechol from oxidation.
SUM: Hydrolysis, oxidation and photolysis dominate.
SUM: Formulation and packaging protect medicines.
SRC: Aulton ME, Taylor KMG (editors), Aulton's Pharmaceutics, 6th edition, Elsevier | secondary | 2021
SRC: Connors KA, Amidon GL and Stella VJ, Chemical Stability of Pharmaceuticals, 2nd edition, Wiley | secondary | 1986
M1#pharmacy-u04-15-q1@1: Which product is most at risk of photolysis? | Nifedipine | Sodium chloride | Lactose | Glucose | Magnesium stearate | Nifedipine degrades rapidly in light, so it is protected from light.
M2#pharmacy-u04-15-q2@2: Why are many antibiotics supplied as dry powders for reconstitution? | They hydrolyse in solution, so water is added just before use | Powders are always absorbed more quickly | Water makes the antibiotic more potent | Powders cannot be oxidised or hydrolysed | It allows the dose to be doubled | Supplying dry slows hydrolysis until the product is needed.
M3#pharmacy-u04-15-q3@3: Why does edetate help protect some formulations from oxidation? | It chelates metal ions that catalyse oxidation | It reacts with water to prevent hydrolysis | It absorbs ultraviolet light from the room | It raises the pH to strongly alkaline levels | It adds oxygen to the headspace | Trace metals catalyse oxidation, and edetate binds them.
MATCH1#pharmacy-u04-15-q4@1: Match each pathway to a protection. | Hydrolysis = Dry powder for reconstitution ; Oxidation = Antioxidant ; Photolysis = Amber container ; Metal catalysis = Chelating agent | Each risk has its own solution.
SA2#pharmacy-u04-15-q5@1,3: Describe the main chemical degradation pathways of drugs and how formulation and storage reduce them. | Hydrolysis breaks esters and amides, as in aspirin and penicillins, and is reduced by keeping products dry, buffering and supplying dry powders. Oxidation affects catechols, phenols and thiols, as in adrenaline, and is reduced by antioxidants, chelating agents and nitrogen headspace. Photolysis affects drugs such as nifedipine and is reduced by amber or opaque packaging. Racemisation and polymerisation also occur. Storing at the right temperature slows all reactions. | Hydrolysis ; Oxidation ; Photolysis ; Other pathways ; Storage and temperature

## Drug stability and shelf life
LV: Intermediate · Application
S: Shelf life is how long a product stays within its specification under stated storage conditions. Reaction kinetics and stability testing set expiry dates and storage instructions.
O: Define shelf life and calculate t90 for first-order degradation
O: Describe accelerated and long-term stability testing
O: Apply shelf-life and in-use stability information in practice
T: Shelf life (t90) | The time for a product to fall to 90% of its labelled content, or to leave its specification
T: Arrhenius equation | An equation showing how reaction rate increases with temperature
H: Kinetics of degradation
- Many drugs in solution degrade by **first-order** kinetics: a constant fraction is lost per unit time.
- For first-order reactions, **t90 = 0.105 ÷ k**, where k is the rate constant.
- Suspensions often show **apparent zero-order** kinetics, as only dissolved drug degrades.
- The **Arrhenius equation** links rate to temperature, so higher temperatures shorten shelf life.
H: Stability testing
- ICH Q1A sets standard conditions: **long-term** testing at 25 °C and 60% relative humidity, and **accelerated** testing at 40 °C and 75% relative humidity for 6 months.
- Results support the **expiry date** and storage instructions such as "store below 25 °C" or "store in a refrigerator".
- In-use shelf life applies after opening or reconstitution, such as 7 days for some antibiotic suspensions.
P: In practice, pharmacists apply several types of expiry. The unopened shelf life comes from stability studies. Once reconstituted or opened, an in-use shelf life applies, such as 7 or 14 days for some antibiotic suspensions or 28 days for many eye drops. Products moved out of the fridge may have a reduced expiry, which the manufacturer specifies. Extemporaneous preparations have short expiries because full stability data are not available.
X: Calculating an expiry.
> An amoxicillin suspension is reconstituted on 3 March and has a 14-day in-use shelf life.
> The pharmacist labels it to be discarded after 17 March.
> She tells the parent to discard any remainder after that date, even if it is still within the unopened expiry date.
K: Shelf life is the time to reach 90% of content; for first-order degradation t90 = 0.105 ÷ k; ICH long-term and accelerated testing set expiry and storage.
!: Using the manufacturer's unopened expiry date after a product has been reconstituted. The shorter in-use shelf life then applies.
EV: established | ICH stability guidelines and first-order kinetics are the accepted basis for setting shelf lives of medicines.
Q: What does t90 mean? | The time taken for a product to fall to 90% of its labelled content.
Q: What are ICH accelerated stability conditions? | 40 °C and 75% relative humidity for 6 months.
SUM: t90 = 0.105 ÷ k for first-order loss.
SUM: Stability testing sets expiry and storage.
SRC: International Council for Harmonisation, Q1A(R2): Stability testing of new drug substances and products | guidance | 2003 | https://www.ich.org/page/quality-guidelines
SRC: Aulton ME, Taylor KMG (editors), Aulton's Pharmaceutics, 6th edition, Elsevier | secondary | 2021
M1#pharmacy-u04-16-q1@1: What does a product's shelf life usually represent? | The time until it falls to 90% of labelled content or leaves specification | The time until it is completely degraded | The time a patient takes to finish it | The time it takes to dissolve in water | The time until its packaging expires | Shelf life is based on staying within specification, typically 90% content.
M2#pharmacy-u04-16-q2@2: Why does storing a product above its stated temperature shorten its shelf life? | Higher temperature increases the degradation rate | Heat makes all drugs more stable | Heat stops hydrolysis completely | Temperature has no effect on reactions | Heat converts drugs to prodrugs | The Arrhenius relationship shows rate rising with temperature.
M3#pharmacy-u04-16-q3@3: Why may a suspension show zero-order degradation? | Only dissolved drug degrades, and its concentration stays constant | Suspensions contain no water at all | Suspended particles degrade faster than solutions | Zero-order means no degradation occurs | Suspensions are always stored frozen | Undissolved drug keeps the solution saturated, so the rate is constant.
NUM1#pharmacy-u04-16-q4@1: A drug degrades by first-order kinetics with k = 0.0105 per month. What is its t90, in months? | 10 | 0.1 | months | t90 = 0.105 ÷ 0.0105 = 10 months.
SA2#pharmacy-u04-16-q5@1,3: Explain how the shelf life of a medicine is determined and applied in practice. | Shelf life is the time for a product to fall to 90% of its labelled content or leave its specification. Many solutions degrade by first-order kinetics, so t90 = 0.105 ÷ k, while suspensions may show zero-order loss. The Arrhenius equation shows that higher temperatures speed degradation. ICH Q1A long-term testing at 25 °C and 60% humidity and accelerated testing at 40 °C and 75% humidity support expiry dates. After opening or reconstitution, shorter in-use shelf lives apply. | Definition ; Kinetics ; Temperature ; Stability testing ; In-use shelf life

## Pharmaceutical analysis
LV: Intermediate · Application
S: Pharmaceutical analysis checks that medicines contain the right drug, in the right amount, at the right purity. Analytical methods must be validated to show they are reliable.
O: Describe the purposes of pharmaceutical analysis
O: Explain the key parameters of analytical method validation
O: Choose appropriate tests for identity, assay and purity
T: Assay | A test measuring the amount of active ingredient in a sample
T: Method validation | Demonstrating that an analytical method is suitable for its intended purpose
H: What analysis checks
- **Identity**: is it the right substance? Tests include IR spectra and chromatographic retention times.
- **Assay**: how much drug is present? Often by titration, UV or HPLC.
- **Purity**: related substances, degradation products, residual solvents and heavy metals.
- **Performance**: dissolution, uniformity of content and disintegration.
- Classical methods include **acid-base titration**, non-aqueous titration for weak bases, and redox titration.
H: Validating methods
- ICH Q2 lists **accuracy** (closeness to the true value) and **precision** (closeness of repeated results).
- **Specificity**: measuring the analyte without interference from impurities or excipients.
- **Linearity** and **range**: a proportional response across the needed concentrations.
- **Limit of detection** and **limit of quantification** for impurities.
- **Robustness**: reliability despite small changes in conditions.
P: Different tests answer different questions. Identity tests confirm the substance, often by IR spectroscopy compared with a reference. Assays measure content, usually by HPLC or UV for products and titration for raw materials. Purity tests look for related substances by HPLC, residual solvents by gas chromatography and water by Karl Fischer titration. Performance tests, such as dissolution, check that the medicine releases its drug properly. Together they confirm a batch meets its specification.
X: Choosing tests.
> A quality control analyst receives a batch of paracetamol powder.
> She confirms identity by IR, measures content by titration and checks related substances by HPLC.
> All results meet the monograph limits, so the raw material is approved for use.
K: Pharmaceutical analysis tests identity, assay, purity and performance; validated methods show accuracy, precision, specificity, linearity, range, detection limits and robustness.
!: Confusing accuracy with precision. Results can be tightly grouped (precise) yet consistently wrong (inaccurate).
EV: established | ICH Q2 sets the internationally accepted standards for validating analytical procedures.
Q: What is the difference between accuracy and precision? | Accuracy is closeness to the true value; precision is closeness of repeated results.
Q: What does specificity mean in method validation? | Measuring the analyte without interference from other components.
SUM: Identity, assay, purity, performance.
SUM: Validation proves methods are reliable.
SRC: International Council for Harmonisation, Q2(R2): Validation of analytical procedures | guidance | 2023 | https://www.ich.org/page/quality-guidelines
SRC: Watson DG, Pharmaceutical Analysis: A Textbook for Pharmacy Students and Pharmaceutical Chemists, 4th edition, Elsevier | secondary | 2016
M1#pharmacy-u04-17-q1@1: Which test confirms how much active ingredient a tablet contains? | An assay | An identity test | A disintegration test | A friability test | A colour test | The assay measures the quantity of active ingredient.
M2#pharmacy-u04-17-q2@2: Repeated results are tightly grouped but all 5% above the true value. How is the method described? | Precise but not accurate | Accurate but not precise | Both accurate and precise | Neither accurate nor precise | Specific but not linear | Close agreement shows precision; a consistent bias shows inaccuracy.
M3#pharmacy-u04-17-q3@3: Why is non-aqueous titration used for many weakly basic drugs? | Water competes as a base, making the end point unclear | Non-aqueous titration needs no indicator | Weak bases react violently with water | It avoids any need for standard solutions | It measures impurities rather than the drug | In non-aqueous solvents, weak bases react sharply with strong acids.
MATCH1#pharmacy-u04-17-q4@1: Match each validation parameter to its meaning. | Accuracy = Close to true value ; Precision = Repeatable results ; Specificity = No interference ; Robustness = Tolerates small changes | Validation covers several parameters.
SA2#pharmacy-u04-17-q5@1,3: Describe the purposes of pharmaceutical analysis and the parameters used to validate analytical methods. | Pharmaceutical analysis checks identity, assay or content, purity, including impurities, degradation products and residual solvents, and performance, such as dissolution and uniformity. Methods include IR, titrations, UV and HPLC. Under ICH Q2, methods are validated for accuracy, precision, specificity, linearity and range, limits of detection and quantification, and robustness. Validation shows the method is reliable for its purpose. | Identity and assay ; Purity ; Performance ; Methods ; Validation parameters

## Spectroscopy in pharmaceutical analysis
LV: Intermediate · Application
S: Spectroscopy measures how molecules interact with light and other radiation. In pharmacy it identifies drugs, measures concentrations and detects impurities.
O: Describe UV-visible, infrared, NMR and mass spectrometry in pharmaceutical analysis
O: Use the Beer-Lambert law to calculate concentration
O: Choose the right spectroscopic technique for an analytical problem
T: Beer-Lambert law | A = εcl, relating absorbance to molar absorptivity, concentration and path length
T: Chromophore | The part of a molecule that absorbs UV or visible light
H: Main techniques
- **UV-visible**: measures absorbance by chromophores such as aromatic rings and conjugated systems; used widely for assays and dissolution testing.
- **Infrared (IR)**: shows functional groups, such as C=O near 1700 cm⁻¹ and O-H near 3300 cm⁻¹; the **fingerprint region** gives a unique pattern for identity tests.
- **Nuclear magnetic resonance (NMR)**: shows the arrangement of hydrogen and carbon atoms; used for structure confirmation.
- **Mass spectrometry (MS)**: measures mass-to-charge ratios; often linked to chromatography for impurity identification.
H: The Beer-Lambert law
- **A = εcl**: absorbance equals molar absorptivity × concentration (mol/L) × path length (cm).
- Pharmacopoeias often use **A(1%, 1 cm)**: the absorbance of a 1% w/v solution in a 1 cm cell.
- Absorbance is measured at the wavelength of maximum absorbance (**λmax**).
- The law holds best for dilute solutions, typically absorbances of about 0.2 to 0.8.
P: Each technique answers a different question. To confirm the identity of a raw material, IR compared with a reference spectrum is quick and specific. To measure the amount of drug in a tablet or a dissolution sample, UV absorbance with the Beer-Lambert law is simple and cheap. To confirm the structure of a new compound or identify an unknown impurity, NMR and mass spectrometry give detailed structural information, often combined with HPLC separation.
X: A UV assay.
> An analyst dilutes a tablet extract and measures an absorbance of 0.50 at λmax.
> A reference standard of known concentration gives an absorbance of 0.48 under the same conditions.
> She calculates the sample content by proportion and confirms it is within limits.
K: UV-visible assays use the Beer-Lambert law A = εcl; IR identifies functional groups and fingerprints; NMR confirms structure; MS identifies masses and impurities.
!: Measuring very concentrated solutions. The Beer-Lambert law deviates at high absorbance, so dilute samples first.
EV: established | UV, IR, NMR and mass spectrometry are standard pharmacopoeial and research methods for pharmaceutical analysis.
Q: What does the IR fingerprint region show? | A unique pattern used to confirm a substance's identity.
Q: What does the Beer-Lambert law state? | Absorbance equals molar absorptivity times concentration times path length.
SUM: UV for assays; IR for identity.
SUM: A = εcl.
SRC: Watson DG, Pharmaceutical Analysis: A Textbook for Pharmacy Students and Pharmaceutical Chemists, 4th edition, Elsevier | secondary | 2016
SRC: British Pharmacopoeia Commission, British Pharmacopoeia: Appendix II, Infrared and ultraviolet spectrophotometry | standard | 2025 | https://www.pharmacopoeia.com/
M1#pharmacy-u04-18-q1@1: Which technique is most often used for identity tests by comparing fingerprint spectra? | Infrared spectroscopy | Flame photometry | Karl Fischer titration | Polarimetry only | Gravimetric analysis | IR fingerprint regions are unique to each compound.
M2#pharmacy-u04-18-q2@2: Which part of a molecule absorbs in UV-visible spectroscopy? | A chromophore such as a conjugated or aromatic system | Any single carbon-hydrogen bond | Only the counter-ion of a salt | Only water molecules of hydration | Only metal impurities present | Chromophores contain the electrons that absorb UV-visible light.
M3#pharmacy-u04-18-q3@3: A sample's absorbance is 1.8. What should the analyst do? | Dilute it into the linear range and remeasure | Report the result as it stands | Increase the path length to 10 cm | Measure at a random wavelength | Use the result to double the dose | High absorbances deviate from Beer-Lambert behaviour.
NUM2#pharmacy-u04-18-q4@2: A solution has A = 0.45 in a 1 cm cell, and ε = 15,000 L/mol/cm. What is its concentration in micromoles per litre? | 30 | 0.5 | µmol/L | c = A ÷ (εl) = 0.45 ÷ 15,000 = 0.00003 mol/L, which is 30 µmol/L.
SA2#pharmacy-u04-18-q5@1,3: Describe how spectroscopic techniques are used in pharmaceutical analysis. | UV-visible spectroscopy measures absorbance by chromophores and is used for assays and dissolution testing using the Beer-Lambert law, A = εcl, within the linear range. IR spectroscopy identifies functional groups, and the fingerprint region confirms identity against a reference. NMR shows the arrangement of hydrogen and carbon atoms to confirm structure. Mass spectrometry measures mass-to-charge ratios and, linked to chromatography, identifies impurities. | UV-visible ; Beer-Lambert ; IR ; NMR ; Mass spectrometry

## Chromatography
LV: Intermediate · Application
S: Chromatography separates mixtures so their components can be identified and measured. High-performance liquid chromatography is the workhorse of pharmaceutical analysis.
O: Explain the principle of chromatographic separation
O: Describe HPLC, TLC and GC and their uses in pharmacy
O: Interpret chromatographic results for identity, assay and impurity testing
T: Retention time | The time a component takes to pass through a chromatographic column to the detector
T: Rf value | In thin-layer chromatography, distance moved by the spot divided by distance moved by the solvent front
H: Principles and techniques
- Components separate by distributing between a **stationary phase** and a **mobile phase**.
- **Reversed-phase HPLC**: a non-polar stationary phase (such as C18) and a polar mobile phase; polar compounds elute first.
- **Thin-layer chromatography (TLC)**: simple identity and impurity tests, using Rf values.
- **Gas chromatography (GC)**: for volatile compounds, such as **residual solvents**.
- Detectors include UV, fluorescence and mass spectrometry.
H: Using HPLC data
- **Identity**: the retention time matches a reference standard.
- **Assay**: peak area is proportional to concentration, compared with a standard.
- **Impurities**: extra peaks are measured against limits.
- **System suitability**: checks of resolution, peak symmetry and repeatability before analysis.
P: Reading a chromatogram means looking at retention times for identity, peak areas for amount, and extra peaks for impurities. Good separation needs adequate resolution between neighbouring peaks, usually a resolution of at least 1.5. Changing the mobile phase composition, pH or column alters retention. Methods are validated and checked with system suitability tests each day, and results are compared with reference standards analysed under the same conditions.
X: Reading a chromatogram.
> An HPLC trace for a tablet shows a main peak at 5.2 minutes and a small peak at 7.8 minutes.
> The reference standard also elutes at 5.2 minutes, confirming identity.
> The small peak is a degradation product measured against the impurity limit in the specification.
K: Chromatography separates components between stationary and mobile phases; reversed-phase HPLC is used for identity, assay and impurities, TLC for simple tests and GC for volatile substances.
!: Relying on retention time alone for identity. Different compounds can share a retention time, so confirm with another method.
EV: established | HPLC, TLC and GC are standard pharmacopoeial techniques for identity, assay and impurity testing.
Q: What phases are used in reversed-phase HPLC? | A non-polar stationary phase and a polar mobile phase.
Q: Which technique is used for residual solvents? | Gas chromatography.
SUM: Separation between two phases.
SUM: HPLC for identity, assay and impurities.
SRC: Watson DG, Pharmaceutical Analysis: A Textbook for Pharmacy Students and Pharmaceutical Chemists, 4th edition, Elsevier | secondary | 2016
SRC: European Directorate for the Quality of Medicines, European Pharmacopoeia 2.2.46: Chromatographic separation techniques | standard | 2025 | https://www.edqm.eu/
M1#pharmacy-u04-19-q1@1: In reversed-phase HPLC, which compounds usually elute first? | The more polar compounds | The most lipophilic compounds | The largest molecules regardless of polarity | Compounds with the highest log P | Compounds bound to the C18 phase | Polar compounds have least affinity for the non-polar stationary phase.
M2#pharmacy-u04-19-q2@2: How is the amount of drug measured in an HPLC assay? | By comparing peak area with a reference standard | By measuring the colour of the column | By timing how long the pump runs | By weighing the column after use | By counting the number of peaks | Peak area is proportional to the amount of analyte.
M3#pharmacy-u04-19-q3@3: Why is a system suitability test run before HPLC analysis? | To confirm the system separates and measures reliably that day | To clean the column before it is discarded | To replace the need for a reference standard | To check the tablets have the right colour | To measure residual solvents by default | It checks resolution, peak shape and repeatability.
NUM1#pharmacy-u04-19-q4@1: In TLC, a spot moves 3.0 cm and the solvent front moves 7.5 cm. What is the Rf value? | 0.4 | 0.01 | ratio | Rf = 3.0 ÷ 7.5 = 0.4.
SA2#pharmacy-u04-19-q5@1,3: Explain how chromatography is used in pharmaceutical analysis. | Chromatography separates components that distribute between a stationary and a mobile phase. In reversed-phase HPLC, a non-polar C18 stationary phase and polar mobile phase separate drugs, with polar compounds eluting first. Retention time compared with a standard confirms identity, peak area measures the amount, and extra peaks show impurities. TLC is used for simple identity and impurity tests using Rf values, and GC for volatile substances such as residual solvents. System suitability tests confirm performance. | Principle ; Reversed-phase HPLC ; Identity, assay, impurities ; TLC and GC ; System suitability

## Quality control and pharmacopoeias
LV: Intermediate · Application
S: Quality control makes sure every batch of a medicine meets its specification before release. Pharmacopoeias set the official standards, and good manufacturing practice governs how medicines are made.
O: Describe the role of pharmacopoeias and monographs
O: Explain quality control, GMP and the Qualified Person's role
O: Relate quality control principles to pharmacy practice, including recalls and defect reporting
T: Pharmacopoeia | An official book of quality standards for medicines and their ingredients
T: Qualified Person (QP) | A person legally responsible for certifying that each batch of a medicine meets requirements before release
H: Pharmacopoeias
- The **British Pharmacopoeia (BP)** is the UK's legally enforceable standard, incorporating the **European Pharmacopoeia (Ph. Eur.)** monographs.
- The **United States Pharmacopeia (USP)** is used in the USA and internationally.
- **Monographs** give the specification for a substance or product: identity tests, assay limits, impurities and other tests.
- General **appendices** describe test methods such as dissolution and uniformity of content.
H: Quality control and GMP
- **Good manufacturing practice (GMP)** sets standards for premises, staff, documentation and processes.
- In the UK, the MHRA's **Rules and Guidance for Pharmaceutical Manufacturers and Distributors** (the **Orange Guide**) sets out GMP.
- **Quality control** tests raw materials, in-process samples and finished batches against specifications.
- The **QP** certifies each batch for release.
- **Out-of-specification** results must be investigated before any batch is released.
P: Quality concerns reach pharmacy practice. When a defect is found, the MHRA issues drug alerts and recalls, classed by risk, and pharmacies must act on them promptly, checking stock and sometimes contacting patients. Pharmacists who notice a suspected defect, such as wrong labelling, contamination or unusual appearance, should report it to the MHRA. Unlicensed specials and extemporaneous products also need quality assurance, such as using pharmacopoeial-grade ingredients.
X: Acting on a recall.
> The MHRA issues a class 2 recall for a batch of an antibiotic due to an impurity.
> The pharmacy team checks stock, quarantines the affected batch and returns it.
> Records are kept to show the alert was actioned.
K: Pharmacopoeias such as the BP and Ph. Eur. set official monograph standards; GMP and quality control ensure every batch meets specification, and a Qualified Person certifies release.
!: Assuming testing alone ensures quality. Quality must be built in through GMP; final testing cannot detect every problem.
EV: established | Pharmacopoeial standards and good manufacturing practice are legal requirements for medicines in the UK.
Q: What is a pharmacopoeial monograph? | The official specification for a substance or product, including identity, assay and impurity tests.
Q: Who certifies each batch of a medicine for release? | A Qualified Person.
SUM: Pharmacopoeias set official standards.
SUM: GMP and QPs protect every batch.
SRC: British Pharmacopoeia Commission, British Pharmacopoeia | standard | 2025 | https://www.pharmacopoeia.com/
SRC: Medicines and Healthcare products Regulatory Agency, Rules and Guidance for Pharmaceutical Manufacturers and Distributors (the Orange Guide) | guidance | 2022 | https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency
M1#pharmacy-u04-20-q1@1: Which is the legally enforceable pharmacopoeia in the UK? | The British Pharmacopoeia | The United States Pharmacopeia | The BNF for Children | The Drug Tariff | The Martindale reference | The BP is the UK's official standard and includes Ph. Eur. monographs.
M2#pharmacy-u04-20-q2@2: What does the Orange Guide cover? | Good manufacturing and distribution practice | Prescribing of controlled drugs | Responding to minor symptoms | Doses for children | Dispensing labels | It sets out GMP and GDP rules and guidance for UK manufacturers and distributors.
M3#pharmacy-u04-20-q3@3: A batch gives an out-of-specification assay result. What should happen? | The result is investigated before any decision to release | The batch is released if most tests pass | The test is repeated until it passes | The result is ignored as an error | The specification is changed to fit | Out-of-specification results require a documented investigation.
SEQ1#pharmacy-u04-20-q4@1: Order the steps in releasing a batch. | Test raw materials ; Manufacture under GMP ; Test the finished batch ; QP certifies release | Quality is checked throughout manufacture.
SA2#pharmacy-u04-20-q5@1,3: Explain how pharmacopoeias, good manufacturing practice and quality control ensure the quality of medicines. | Pharmacopoeias such as the BP, which includes Ph. Eur. monographs, set legally enforceable standards with identity, assay and impurity tests. Good manufacturing practice, set out in the MHRA Orange Guide, governs premises, staff, documentation and processes so quality is built in. Quality control tests raw materials, in-process samples and finished batches against specifications, investigating any out-of-specification results. A Qualified Person certifies each batch for release, and recalls handle defects found later. | Pharmacopoeias ; GMP ; Quality control testing ; QP release ; Recalls and defects
`;
