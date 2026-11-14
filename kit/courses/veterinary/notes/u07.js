// VetGradify Veterinary Pharmacology and Therapeutics (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## Pharmacokinetics
LV: Preclinical · Foundation
S: Pharmacokinetics describes what the body does to a drug. This lesson explains absorption, distribution, metabolism and excretion, and the key measures of bioavailability, volume of distribution, clearance and half-life.
O: Describe the four processes of absorption, distribution, metabolism and excretion
O: Define bioavailability, volume of distribution, clearance and half-life
O: Apply half-life to predict drug levels and time to steady state
H: ADME
P: **Pharmacokinetics** is the study of how a drug moves through the body, summarised as **ADME**. **Absorption** is movement from the site of giving into the blood; drugs given **intravenously** skip this step, while oral drugs must cross the gut wall and may be broken down by the liver before reaching the circulation, the **first-pass effect**. **Distribution** carries the drug to tissues and depends on blood flow, **plasma protein binding** and how fat-soluble the drug is. **Metabolism**, mostly in the **liver**, converts drugs into more water-soluble forms through **phase I** reactions such as oxidation by **cytochrome P450** enzymes and **phase II** conjugation reactions such as **glucuronidation**. **Excretion** removes the drug or its metabolites, mainly by the **kidneys** in urine and the liver in **bile**.
H: Key measures
- **Bioavailability (F)**: the fraction of a dose that reaches the systemic circulation unchanged; 100 percent for intravenous drugs.
- **Volume of distribution (Vd)**: how widely a drug spreads into tissues compared with plasma.
- **Clearance**: the volume of plasma cleared of drug per unit time.
- **Half-life**: the time for the plasma concentration to fall by half.
- Half-life depends on both volume of distribution and clearance.
H: Using half-life
- Most drugs follow **first-order** kinetics: a constant fraction is removed per unit time.
- After one half-life 50 percent remains, after two 25 percent and after three 12.5 percent.
- With repeated dosing, **steady state** is reached after about **four to five half-lives**.
- A **loading dose** can be used to reach target levels quickly when a drug has a long half-life.
- Liver or kidney disease can lengthen half-life, so drug choice may need review by the vet.
X: Thinking through a drug's half-life.
> A drug has a half-life of 6 hours in a dog.
> After 6 hours, half the peak plasma concentration remains; after 12 hours, a quarter.
> With repeated dosing, steady state is reached after about 24 to 30 hours.
> If the dog develops kidney disease that reduces clearance, the half-life will lengthen.
K: Pharmacokinetics covers absorption, distribution, metabolism and excretion; bioavailability, volume of distribution, clearance and half-life describe drug handling, first-order drugs halve each half-life, and steady state takes about four to five half-lives.
!: Thinking half-life depends only on the liver. Half-life depends on both clearance and volume of distribution, and kidney excretion is often important.
EV: established | For drugs with first-order kinetics, steady state is reached after about four to five half-lives.
T: Bioavailability | The fraction of a dose that reaches the systemic circulation unchanged
T: First-pass effect | Metabolism of an oral drug by the gut wall and liver before it reaches the circulation
T: Half-life | The time for the plasma concentration of a drug to fall by half
SUM: ADME describes drug handling.
SUM: Half-life sets dosing intervals.
SUM: Steady state in four to five half-lives.
SRC: Riviere J. E. and Papich M. G. (eds), Veterinary Pharmacology and Therapeutics, 10th edition, Wiley-Blackwell | secondary | 2018
SRC: Maddison J. E., Page S. W. and Church D. B., Small Animal Clinical Pharmacology, 2nd edition, Saunders Elsevier | secondary | 2008
Q: What is the bioavailability of an intravenous drug? | 100 percent.
Q: About how many half-lives does it take to reach steady state? | Four to five.
M1#veterinary-u07-01-q1@1: Which process converts a drug into a more water-soluble form? | Metabolism | Absorption | Distribution | Protein binding | Hepatic metabolism makes drugs easier to excrete in urine or bile.
M2#veterinary-u07-01-q2@2: Why does an oral drug sometimes have low bioavailability? | First-pass metabolism by the liver | Rapid binding to red blood cells | Its passage through the kidneys | Giving it straight into a vein | Oral drugs pass through the liver before reaching the systemic circulation.
NUM2#veterinary-u07-01-q3@3: A drug reaches a peak plasma concentration of 80 units, and its half-life is 4 hours. What concentration remains after 12 hours, assuming first-order kinetics? | 10 | 0 | units | 12 hours is three half-lives, so 80 halves to 40, then 20, then 10 units.
M3#veterinary-u07-01-q4@3: A cat with reduced kidney function is given a drug excreted unchanged in urine. What is most likely? | The half-life will lengthen | The drug will act more briefly | Bioavailability will fall to zero | The drug will skip distribution | Reduced renal clearance slows elimination, so the drug persists longer.
SA2#veterinary-u07-01-q5@2,3: Explain what half-life is and how it affects dosing. | Half-life is the time taken for the plasma concentration of a drug to fall by half. For first-order drugs, a constant fraction is removed per unit time, so it guides how often a drug must be given to keep levels in the therapeutic range. Repeated dosing reaches steady state after about four to five half-lives, so a loading dose may be used for long half-life drugs, and disease that reduces clearance lengthens half-life. | Definition ; Dosing interval ; Steady state ; Effect of disease

## Pharmacodynamics
LV: Preclinical · Application
S: Pharmacodynamics describes what a drug does to the body. This lesson explains drug targets, agonists and antagonists, potency and efficacy, and the therapeutic index.
O: Describe the main drug targets and how drugs bind them
O: Distinguish agonists, partial agonists and antagonists
O: Interpret dose-response curves, potency, efficacy and therapeutic index
H: Drug targets and binding
P: **Pharmacodynamics** is the study of how drugs produce their effects. Most drugs act on one of four protein targets: **receptors**, **enzymes**, **ion channels** and **transporters**. **Affinity** is how strongly a drug binds its target, while **intrinsic activity** is how well it activates it once bound. An **agonist** binds and activates a receptor, a **partial agonist** activates it only partly even at full occupancy, and an **antagonist** binds without activating, blocking the agonist. **Competitive antagonists** can be overcome by more agonist, while **non-competitive antagonists** cannot. For example, **naloxone** competitively blocks opioid receptors, and **atipamezole** reverses alpha-2 agonist sedatives.
H: Dose-response
- A **dose-response curve** plots effect against dose or concentration, usually on a log scale.
- **Potency** is the amount of drug needed for a given effect; the **EC50** is the concentration giving half the maximum effect.
- **Efficacy** is the maximum effect a drug can produce.
- A more potent drug is not necessarily more effective.
- A competitive antagonist shifts the agonist curve to the right without lowering the maximum.
H: Safety margins
- The **therapeutic index** compares the toxic dose with the effective dose (TD50 divided by ED50).
- A **narrow therapeutic index** means small changes in level can cause toxicity, so monitoring is needed.
- **Tolerance** is a reduced response after repeated use.
- **Selectivity** is never absolute: higher doses affect other targets and cause side effects.
- Drug **interactions** can be pharmacodynamic, such as two drugs with additive effects.
X: Reversing sedation.
> A dog is sedated with an alpha-2 agonist for a minor procedure.
> When finished, the vet gives atipamezole, an alpha-2 antagonist.
> Atipamezole competes for the alpha-2 receptors and displaces the sedative.
> The dog wakes up within minutes, showing competitive antagonism in practice.
K: Drugs act on receptors, enzymes, ion channels and transporters; agonists activate, partial agonists partly activate and antagonists block receptors, potency describes how much drug is needed while efficacy is the maximum effect, and the therapeutic index measures the safety margin.
!: Confusing potency with efficacy. A potent drug works at low amounts, but a less potent drug may still produce a bigger maximum effect.
EV: established | Competitive antagonists shift the agonist dose-response curve to the right without reducing the maximum response.
T: Affinity | How strongly a drug binds to its target
T: Efficacy | The maximum effect a drug can produce
T: Therapeutic index | The ratio of the toxic dose to the effective dose
SUM: Four main drug targets.
SUM: Potency is not efficacy.
SUM: Narrow index needs care.
SRC: Riviere J. E. and Papich M. G. (eds), Veterinary Pharmacology and Therapeutics, 10th edition, Wiley-Blackwell | secondary | 2018
SRC: Rang H. P., Ritter J. M., Flower R. J. and Henderson G., Rang and Dale's Pharmacology, 9th edition, Elsevier | secondary | 2019
Q: What is a partial agonist? | A drug that binds and activates a receptor but cannot produce the full maximum effect.
Q: What does EC50 mean? | The concentration of drug producing half the maximum effect.
M1#veterinary-u07-02-q1@1: Which drug type binds a receptor without activating it? | Antagonist | Agonist | Partial agonist | Inverse enzyme | Antagonists occupy the receptor and block agonists from acting.
M2#veterinary-u07-02-q2@2: How does a competitive antagonist change an agonist's dose-response curve? | Shifts it right with the same maximum | Shifts it left with a higher maximum | Flattens it to a lower maximum | Leaves the curve entirely unchanged | More agonist can overcome competitive blockade, so the maximum is unchanged.
NUM2#veterinary-u07-02-q3@2: A drug has a TD50 of 200 units and an ED50 of 20 units. What is its therapeutic index? | 10 | 0 | – | The therapeutic index is TD50 divided by ED50, so 200 divided by 20 gives 10.
M3#veterinary-u07-02-q4@3: Drug P reaches a maximum effect of 60 percent at low concentrations, and drug Q reaches 100 percent at higher concentrations. Which statement is correct? | P is more potent but Q is more efficacious | Q is both more potent and more efficacious | P is more efficacious but less potent | Both drugs have identical efficacy | Potency is about the amount needed; efficacy is the maximum effect.
SA2#veterinary-u07-02-q5@1,2: Explain the difference between agonists, partial agonists and antagonists, with veterinary examples. | Agonists bind and fully activate a receptor, such as full opioid agonists used for severe pain. Partial agonists bind but produce less than the maximum effect, as buprenorphine does at opioid receptors. Antagonists bind without activating and block agonists; for example, naloxone reverses opioids and atipamezole reverses alpha-2 agonist sedatives. | Agonist ; Partial agonist ; Antagonist ; Examples

## Species differences in drug handling
LV: Clinical · Application
S: Drugs that are safe in one species can be dangerous in another. This lesson explains the main species differences in metabolism, anatomy and genetics that affect drug use, with key examples from cats, horses, ruminants and dogs.
O: Explain why drug handling differs between species
O: Identify key species-specific drug hazards
O: Apply species differences to safe prescribing decisions
H: Why species differ
P: Animals differ in **metabolism**, **gut anatomy**, **body composition** and **genetics**, so the same drug can behave very differently. **Cats** have low activity of some **glucuronidation** enzymes (UGT1A6), so they clear drugs such as **paracetamol**, aspirin and some NSAIDs slowly and are prone to toxicity. Cats are also very sensitive to **permethrin**, found in some dog flea products. **Ruminants** have a large **rumen** that dilutes and degrades oral drugs, and oral antibiotics can disrupt rumen microbes. **Horses** are **hindgut fermenters**, and some antibiotics, such as clindamycin and lincomycin, can cause fatal **colitis**. Birds, reptiles and fish differ again, so data on dogs or humans cannot simply be transferred.
H: Genetic differences
- Many herding breeds, such as **Collies** and Australian Shepherds, can carry the **MDR1** (ABCB1) gene mutation.
- Affected dogs lack a working P-glycoprotein pump in the blood-brain barrier.
- They can show severe neurological signs with **macrocyclic lactones** such as ivermectin and some other drugs.
- A genetic test is available, and data sheets warn about these breeds.
- Greyhounds and other sighthounds can recover slowly from some anaesthetic agents.
H: Prescribing safely
- Use medicines **authorised for the species** wherever possible, following the data sheet.
- Never give human medicines to pets without veterinary advice.
- Warn owners not to use dog spot-on products containing permethrin on cats.
- Consult references such as the **BSAVA Small Animal Formulary**.
- Suspected poisoning, such as a cat exposed to permethrin, needs urgent veterinary treatment.
X: A cat treated with a dog flea product.
> An owner applies a dog spot-on to their cat to save money.
> Within hours the cat is twitching, trembling and having seizures.
> The product contains permethrin, which cats cannot metabolise effectively.
> The cat needs urgent veterinary treatment, and the vet reports the incident to the VMD.
K: Species differ in metabolism, anatomy and genetics: cats glucuronidate poorly and are poisoned by paracetamol and permethrin, ruminant and equine guts are disrupted by some oral antibiotics, and dogs with the MDR1 mutation react to macrocyclic lactones, so prescribers should use species-authorised products and the data sheet.
!: Assuming that a drug safe in dogs is safe in cats. Cats metabolise many drugs differently and can be poisoned by products safe for dogs.
EV: established | Cats have reduced glucuronidation capacity, which explains their sensitivity to paracetamol.
T: Glucuronidation | A phase II reaction that joins glucuronic acid to a drug to aid excretion
T: MDR1 mutation | A gene defect that removes P-glycoprotein function, increasing drug entry into the brain
T: Hindgut fermenter | An animal, such as the horse, that ferments fibre in the caecum and colon
SUM: Cats glucuronidate poorly.
SUM: Collies may carry MDR1.
SUM: Some antibiotics cause equine colitis.
SRC: British Small Animal Veterinary Association, BSAVA Small Animal Formulary, 11th edition, Part A: Canine and Feline | standard | 2023 | https://www.bsava.com
SRC: Court M. H., Feline drug metabolism and disposition: pharmacokinetic evidence for species differences and molecular mechanisms, Veterinary Clinics of North America: Small Animal Practice 43: 1039-1054 | primary | 2013
SRC: Mealey K. L., Bentjen S. A., Gay J. M. and Cantor G. H., Ivermectin sensitivity in collies is associated with a deletion mutation of the mdr1 gene, Pharmacogenetics 11: 727-733 | primary | 2001
Q: Why are cats sensitive to paracetamol? | They have low glucuronidation capacity.
Q: Which gene mutation makes some Collies sensitive to ivermectin? | MDR1 (ABCB1).
M1#veterinary-u07-03-q1@1: Which species is most at risk from permethrin spot-on products? | Cats | Dogs | Horses | Cattle | Cats cannot metabolise permethrin effectively and develop tremors and seizures.
M2#veterinary-u07-03-q2@2: Why can some oral antibiotics be dangerous to horses? | They disrupt hindgut bacteria and cause colitis | They are absorbed too slowly by the stomach | They block the equine liver enzymes | They stop horses from producing saliva | Upsetting the hindgut microbiota allows overgrowth of harmful bacteria such as clostridia.
TF2#veterinary-u07-03-q3@2: The MDR1 mutation increases the entry of some drugs into the brain. | true | Without P-glycoprotein pumping drugs out, more drug crosses the blood-brain barrier.
M3#veterinary-u07-03-q4@3: An owner asks if they can give their cat a human painkiller tablet. What is the best response? | No; see a vet for a safe option | Yes, at a quarter of the human tablet | Yes, if mixed into wet cat food | Only if the cat weighs over 5 kg | Human painkillers such as paracetamol can be fatal to cats, so a vet must choose a safe drug.
SA2#veterinary-u07-03-q5@2,3: Explain three species differences that affect safe drug use in veterinary practice. | Cats have low glucuronidation capacity, so they clear drugs such as paracetamol and permethrin poorly and can be fatally poisoned. Horses are hindgut fermenters, and some antibiotics such as clindamycin disrupt their gut bacteria, causing fatal colitis. Some herding dogs carry the MDR1 mutation, so drugs such as ivermectin enter the brain and cause neurological toxicity. | Cat metabolism ; Horse gut ; MDR1 in dogs ; Implication for prescribing

## Adverse drug reactions and pharmacovigilance
LV: Clinical · Application
S: Every medicine can cause unwanted effects. This lesson explains how adverse drug reactions are classified, how the UK monitors medicine safety through pharmacovigilance and how vets report suspected adverse events to the VMD.
O: Classify adverse drug reactions
O: Describe the UK pharmacovigilance system for veterinary medicines
O: Report and manage a suspected adverse event
H: Types of adverse reaction
P: An **adverse drug reaction (ADR)** is a harmful, unintended response to a medicine used normally. ADRs are classified into **type A (augmented)** reactions, which are predictable, dose-related exaggerations of the normal effect, such as gastrointestinal ulceration with NSAIDs, and **type B (bizarre)** reactions, which are unpredictable and not dose-related, such as **anaphylaxis** or **idiosyncratic** liver damage. Other categories include reactions from long-term use, delayed effects such as **injection site sarcoma** in cats, and lack of expected efficacy. Risk factors include age, breed, organ disease and **drug interactions**.
H: Pharmacovigilance in the UK
- **Pharmacovigilance** is the monitoring of medicine safety after a product is authorised.
- The **Veterinary Medicines Directorate (VMD)** runs the UK system.
- Vets, owners and manufacturers can report **adverse events**, including reactions in people handling a product.
- Reports include lack of efficacy, environmental effects and **withdrawal period** problems.
- The VMD analyses reports and can change data sheets or withdraw products.
H: Managing a suspected reaction
- Stop the suspected medicine if it is safe to do so and treat the animal.
- Record details: product, batch number, timing, signs and outcome.
- Report to the VMD and the marketing authorisation holder.
- A reaction does not have to be proven to be reported; suspicion is enough.
- Signs such as collapse, facial swelling or breathing difficulty after a medicine need urgent veterinary care.
X: Facial swelling after a vaccine.
> A dog develops a swollen face and itching 30 minutes after a routine vaccine.
> The vet treats the reaction and observes the dog until it recovers.
> The vet records the vaccine, batch number and timing in the clinical notes.
> The vet reports the suspected adverse event to the VMD and the manufacturer.
K: Adverse drug reactions may be predictable and dose-related (type A) or unpredictable (type B), the VMD runs UK veterinary pharmacovigilance, and vets should stop and treat, record details including batch number and report suspected adverse events, even when not proven.
!: Waiting for proof before reporting. Pharmacovigilance relies on reports of suspected reactions; patterns only emerge when many reports are pooled.
EV: established | Post-authorisation pharmacovigilance detects rare adverse reactions that were not seen in pre-authorisation trials.
T: Adverse drug reaction | A harmful, unintended response to a medicine used normally
T: Pharmacovigilance | Monitoring the safety of medicines after authorisation
T: Type B reaction | An unpredictable reaction not related to dose
SUM: Type A predictable, type B bizarre.
SUM: VMD runs pharmacovigilance.
SUM: Report suspicion, not proof.
SRC: Veterinary Medicines Directorate, Report an adverse event to a veterinary medicine | guidance | 2024 | https://www.gov.uk/report-veterinary-medicine-problem
SRC: Veterinary Medicines Directorate, Veterinary pharmacovigilance annual review | data | 2024 | https://www.gov.uk/government/organisations/veterinary-medicines-directorate
SRC: Woodward K. N. (ed.), Veterinary Pharmacovigilance: Adverse Reactions to Veterinary Medicinal Products, Wiley-Blackwell | secondary | 2009
Q: Which UK body runs veterinary pharmacovigilance? | The Veterinary Medicines Directorate (VMD).
Q: What is a type A adverse drug reaction? | A predictable, dose-related exaggeration of a drug's normal effect.
M1#veterinary-u07-04-q1@1: What is pharmacovigilance? | Monitoring medicine safety after authorisation | Testing new drugs in laboratory mice | Setting the price of veterinary drugs | Checking stock levels in a pharmacy | Pharmacovigilance detects safety problems once medicines are in wide use.
M2#veterinary-u07-04-q2@2: Which is a type B adverse drug reaction? | Anaphylaxis after an injection | Gut ulcers from NSAID overuse | Sedation from a sedative given | Low blood pressure from acepromazine | Anaphylaxis is unpredictable and not dose-related, so it is type B.
SEQ2#veterinary-u07-04-q3@2: Put the steps of managing a suspected adverse reaction in order. | Stop the medicine and treat the animal ; Record product, batch and signs ; Report to the VMD and the manufacturer ; Review future use for this animal | Safety and treatment come first, then records and reporting.
M3#veterinary-u07-04-q4@3: A farmer reports that a wormer seemed not to work in his lambs. Should this be reported to the VMD? | Yes, lack of efficacy is reportable | No, only deaths are ever reported | No, only reactions in pets count | Yes, but only if a lamb has died | The VMD collects reports of suspected lack of efficacy as well as harmful reactions.
SA2#veterinary-u07-04-q5@2,3: Explain why vets should report suspected adverse reactions to the VMD. | Clinical trials before authorisation include limited numbers of animals, so rare or delayed reactions may not be detected. Reports from practice allow the VMD to spot patterns across many cases and act, for example by changing data sheet warnings or withdrawing a product. A reaction only has to be suspected, not proven, and reports also include lack of efficacy and reactions in people. | Limits of trials ; Pooling reports ; Regulatory action ; Suspicion is enough

## The Veterinary Medicines Regulations
LV: Clinical · Foundation
S: The Veterinary Medicines Regulations control how veterinary medicines are made, authorised, supplied and used in the UK. This lesson explains their purpose, the role of the VMD, marketing authorisations and the record-keeping duties of vets and farmers.
O: Describe the purpose and scope of the Veterinary Medicines Regulations
O: Explain marketing authorisations and the role of the VMD
O: Identify the record-keeping duties for medicines
H: Purpose of the regulations
P: The **Veterinary Medicines Regulations 2013 (VMR)**, substantially amended in **2024**, are the main UK law on veterinary medicines in Great Britain. They aim to protect **animal health**, **public health** (including consumers of food) and the **environment**. They cover the manufacture, **marketing authorisation**, classification, supply, prescription, possession, administration, labelling and record-keeping of veterinary medicines. They are enforced by the **Veterinary Medicines Directorate (VMD)**, an executive agency of Defra. Northern Ireland follows different rules under the Windsor Framework. The **RCVS** sets the professional standards for how vets prescribe within this law.
H: Marketing authorisations
- A veterinary medicine must have a **marketing authorisation (MA)** before it can be sold in the UK.
- The MA is granted when the product is shown to be of good **quality**, **safe** and **effective**.
- Each authorised product has a **summary of product characteristics (SPC)**, the data sheet.
- The SPC sets out the authorised species, indications, contraindications and withdrawal periods.
- Using a product outside its SPC is **off-label** and is allowed only under the **cascade**.
H: Records and duties
- Vets must keep records of medicines received and supplied, kept for **five years**.
- Keepers of **food-producing animals** must record all medicines bought and given.
- Records include the product, batch, date, amount, animal identity and withdrawal period.
- Medicines must be stored as the SPC requires, including fridge storage for vaccines.
- **Veterinary practice premises** that supply medicines must be registered with the VMD.
X: A farm medicines inspection.
> A VMD or farm assurance inspector visits a dairy farm.
> The inspector checks the farm medicine book against the vet's invoices.
> Each entry shows the product, batch, date, cow identity, amount given and withdrawal period.
> One treatment lacks a withdrawal end date, so the farmer is told to correct the record.
K: The Veterinary Medicines Regulations 2013, amended in 2024, protect animal health, public health and the environment by controlling the authorisation, supply, use and recording of veterinary medicines, enforced by the VMD, with each authorised product described in its SPC and records kept for five years.
!: Thinking the RCVS enforces medicines law. The VMD enforces the Veterinary Medicines Regulations; the RCVS regulates professional conduct.
EV: established | Veterinary medicines in the UK must hold a marketing authorisation showing quality, safety and efficacy before sale.
T: Marketing authorisation | Permission to sell a medicine, granted after it is shown to be safe, effective and of good quality
T: SPC | Summary of product characteristics, the authorised data sheet
T: Off-label use | Using a medicine outside the terms of its marketing authorisation
SUM: VMR protect animals, people and environment.
SUM: The VMD enforces them.
SUM: Keep records for five years.
SRC: The Veterinary Medicines Regulations 2013, SI 2013/2033, as amended by the Veterinary Medicines (Amendment etc.) Regulations 2024 | standard | 2024 | https://www.legislation.gov.uk/uksi/2013/2033
SRC: Veterinary Medicines Directorate, Veterinary Medicines Guidance notes | guidance | 2024 | https://www.gov.uk/government/collections/veterinary-medicines-guidance-notes-vmgns
SRC: Royal College of Veterinary Surgeons, Code of Professional Conduct: supporting guidance chapter 4, Veterinary medicines | guidance | 2024 | https://www.rcvs.org.uk
Q: Which body enforces the Veterinary Medicines Regulations? | The Veterinary Medicines Directorate (VMD).
Q: For how long must veterinary medicine records be kept? | Five years.
M1#veterinary-u07-05-q1@1: What must a veterinary medicine have before it can be sold in the UK? | A marketing authorisation | An RCVS licence to practise | A patent from the government | A farm assurance stamp | A marketing authorisation shows the medicine is safe, effective and of good quality.
M2#veterinary-u07-05-q2@2: Where would a vet find a product's authorised species and withdrawal periods? | The summary of product characteristics | The RCVS Code of Professional Conduct | The practice's own price list | The Animal Welfare Act 2006 | The SPC, or data sheet, sets out the terms of the authorisation.
TF1#veterinary-u07-05-q3@2: Keepers of food-producing animals must record the medicines they give. | true | The VMR require farm records of all medicines bought and administered, including withdrawal periods.
M3#veterinary-u07-05-q4@3: A vet wants to use a cattle product in a goat. What does the VMR require? | Use must follow the cascade | Use is banned in every situation | No rules apply for minor species | The farmer must get a court order | Use outside the SPC is off-label and must follow the prescribing cascade.
SA2#veterinary-u07-05-q5@1,3: Describe the purpose of the Veterinary Medicines Regulations and the record-keeping duties they create. | The VMR protect animal health, public health and the environment by controlling the authorisation, supply, prescription and use of veterinary medicines, enforced by the VMD. Vets must record medicines received and supplied and keep these records for five years. Keepers of food-producing animals must record every medicine bought and given, including batch, date, animal and withdrawal period, so that food safety can be checked. | Purpose ; Enforcement ; Vet records ; Farm records

## The prescribing cascade
LV: Clinical · Application
S: When no authorised medicine exists for a condition in a species, vets may use the prescribing cascade. This lesson explains the steps of the cascade, its rules for food-producing animals and the need for informed consent.
O: Describe the steps of the prescribing cascade
O: Explain the extra rules for food-producing animals
O: Apply the cascade and consent to a clinical case
H: What the cascade is
P: The **prescribing cascade** is a legal provision in the **Veterinary Medicines Regulations** that lets a vet treat an animal when no medicine is authorised in the UK for that **condition in that species**. The decision is the vet's **clinical responsibility**, and the aim is to avoid unacceptable suffering. The vet must follow the steps in order, choosing the first suitable option, and must have the animal **under their care**. The vet should obtain **informed consent** from the owner, explaining that the medicine is not authorised for this use and that its safety and efficacy may be less well known.
H: The steps
- **Step 1**: a veterinary medicine authorised in the UK for another species, or for another condition in the same species.
- **Step 2**: a human medicine authorised in the UK, or a veterinary medicine authorised in another country, imported under a **VMD special import certificate**.
- **Step 3**: a medicine prepared specially (an **extemporaneous** preparation) by a vet, pharmacist or authorised manufacturer.
- The vet may move down the steps only if there is no suitable option at the step above.
- Cost is not a valid reason to use the cascade when an authorised product is suitable.
H: Food-producing animals
- Active substances must be listed as allowed in food-producing animals, with **maximum residue limits** set.
- **Statutory minimum withdrawal periods** apply unless the product sets a longer one.
- Records must be kept by the vet and the keeper.
- Horses declared as food-producing in their **passport** follow these rules; those signed out of the food chain do not.
- Using a banned substance in a food animal is a criminal offence.
X: Treating a rabbit under the cascade.
> A rabbit needs a treatment for which no product is authorised in rabbits.
> The vet finds a suitable product authorised in cats, a step 1 option.
> The vet explains to the owner that it is not authorised for rabbits and why it is being used.
> The owner gives informed consent, which the vet records in the clinical notes.
K: The cascade lets a vet use an unauthorised medicine when no authorised product exists for that condition in that species, following steps from other UK veterinary products, to UK human or imported veterinary medicines, to specially prepared medicines, with informed consent and extra residue rules for food-producing animals.
!: Using the cascade because a human generic is cheaper. Cost is not a reason; a suitable authorised veterinary product must be used if one exists.
EV: established | The cascade allows off-label use only when no suitable authorised veterinary medicine is available for the condition in that species.
T: Prescribing cascade | A legal sequence of options for treating when no authorised medicine exists
T: Special import certificate | VMD permission to import a veterinary medicine authorised abroad
T: Extemporaneous preparation | A medicine specially prepared for an individual case
SUM: Follow the steps in order.
SUM: Obtain informed consent.
SUM: Extra rules for food animals.
SRC: Veterinary Medicines Directorate, The cascade: prescribing unauthorised medicines | guidance | 2024 | https://www.gov.uk/guidance/the-cascade-prescribing-unauthorised-medicines
SRC: Royal College of Veterinary Surgeons, Code of Professional Conduct: supporting guidance chapter 4, Veterinary medicines | guidance | 2024 | https://www.rcvs.org.uk
Q: What is the first step of the cascade? | A veterinary medicine authorised in the UK for another species or another condition in the same species.
Q: What does a vet need from the owner before using a medicine under the cascade? | Informed consent.
M1#veterinary-u07-06-q1@1: When can a vet use the prescribing cascade? | When no authorised product exists for that use | Whenever a cheaper human medicine exists | Only for food-producing animals | Whenever the owner requests it | The cascade applies only when no suitable authorised product is available.
M2#veterinary-u07-06-q2@2: A vet needs to import a medicine authorised in France. What is required? | A VMD special import certificate | An RCVS letter of approval | A local council licence | Nothing, if it is for one dog | Imported veterinary medicines need a special import certificate from the VMD.
SEQ1#veterinary-u07-06-q3@1: Put the cascade options in order of preference. | UK veterinary medicine for another species or condition ; UK human medicine or imported veterinary medicine ; Specially prepared medicine | Vets must use the first suitable option in the sequence.
M3#veterinary-u07-06-q4@3: A horse signed out of the food chain in its passport needs a drug not authorised for horses. Which rules apply? | The cascade, without food residue limits | The cascade with full food residue rules | No cascade, because horses are excluded | Only human medicines may be used | Horses signed out of the food chain are not subject to residue rules, but the cascade still applies.
SA2#veterinary-u07-06-q5@2,3: Explain how a vet should use the cascade to treat a pet when no authorised product exists. | The vet must first confirm that no medicine is authorised in the UK for that condition in that species. The vet then chooses the first suitable option: a UK veterinary product for another species or condition, then a UK human medicine or an imported veterinary medicine, then a specially prepared medicine. The vet explains to the owner that the product is unauthorised for this use, gains informed consent and records the decision. | No authorised product ; Steps in order ; Informed consent ; Records

## Prescription categories and controlled drugs
LV: Clinical · Application
S: Veterinary medicines are classified into legal categories that control who may prescribe and supply them, and some are controlled drugs with extra rules. This lesson explains the UK categories and the main controlled drug schedules.
O: Describe the UK legal categories of veterinary medicine
O: Explain the schedules and duties for controlled drugs
O: Apply prescribing and storage rules in practice
H: Legal categories
P: The Veterinary Medicines Regulations place every authorised veterinary medicine in a **distribution category**. **POM-V** (prescription-only medicine, veterinarian) may be prescribed only by a vet after a **clinical assessment** of animals under their care. **POM-VPS** may be prescribed by a vet, a **pharmacist** or a **Suitably Qualified Person (SQP)**, also called a registered animal medicines advisor, and includes many farm wormers. **NFA-VPS** (non-food animal) medicines can be supplied by the same people for companion animals. **AVM-GSL** (authorised veterinary medicine, general sales list) can be sold by any retailer. A **written prescription** must be provided if a client asks for one, so they can buy medicines elsewhere.
H: Controlled drugs
- Controlled drugs fall under the **Misuse of Drugs Act 1971** and the **Misuse of Drugs Regulations 2001**.
- **Schedule 2** includes strong opioids such as morphine, methadone and fentanyl, with a **controlled drugs register** and **safe custody** in a locked cabinet.
- **Schedule 3** includes buprenorphine and tramadol, with special prescription requirements.
- **Schedule 4** includes benzodiazepines such as diazepam and anabolic steroids.
- **Schedule 5** includes low-strength preparations with minimal controls.
- Prescriptions for Schedules 2 and 3 are valid for **28 days**.
H: Practice duties
- Keep a running balance in the CD register for Schedule 2 drugs and check it regularly.
- Destruction of Schedule 2 stock must be witnessed by an **authorised person**.
- Keep CD keys under the control of a vet or authorised person.
- Report thefts or losses to the police, and follow RCVS and Home Office guidance.
- Staff with concerns about misuse should raise them through practice procedures.
X: Recording a controlled drug.
> A vet gives methadone to a dog for pain after surgery.
> The vet records the date, patient, owner, amount used and new running balance in the CD register.
> The balance is checked against the stock in the locked cabinet.
> Waste from the opened vial is handled as the practice's CD procedures require.
K: UK veterinary medicines are POM-V, POM-VPS, NFA-VPS or AVM-GSL, controlling who may prescribe and supply them; controlled drugs are in Schedules 2 to 5 under the Misuse of Drugs Regulations 2001, with registers, safe custody and witnessed destruction for Schedule 2 and 28-day prescription validity for Schedules 2 and 3.
!: Thinking an SQP can prescribe any medicine. SQPs may prescribe only POM-VPS and NFA-VPS medicines, not POM-V.
EV: established | POM-V medicines may be prescribed only by a veterinary surgeon following a clinical assessment of animals under their care.
T: POM-V | A prescription-only medicine that only a vet can prescribe
T: SQP | Suitably Qualified Person, who may prescribe POM-VPS and NFA-VPS medicines
T: Controlled drugs register | A legal record of each Schedule 2 drug received and supplied
SUM: Four distribution categories.
SUM: Schedule 2 needs register and safe.
SUM: CD prescriptions valid 28 days.
SRC: Veterinary Medicines Directorate, Distribution categories of veterinary medicines | guidance | 2024 | https://www.gov.uk/government/publications/distribution-categories-of-veterinary-medicines
SRC: The Misuse of Drugs Regulations 2001, SI 2001/3998 | standard | 2001 | https://www.legislation.gov.uk/uksi/2001/3998
SRC: Royal College of Veterinary Surgeons, Code of Professional Conduct: supporting guidance chapter 4, Veterinary medicines (controlled drugs) | guidance | 2024 | https://www.rcvs.org.uk
Q: Who may prescribe a POM-VPS medicine? | A vet, a pharmacist or a Suitably Qualified Person.
Q: Which law lists the controlled drug schedules? | The Misuse of Drugs Regulations 2001.
M1#veterinary-u07-07-q1@1: Which category of veterinary medicine can only a vet prescribe? | POM-V | POM-VPS | NFA-VPS | AVM-GSL | POM-V medicines need a vet's clinical assessment.
M2#veterinary-u07-07-q2@2: Which controlled drug schedule requires a register and safe custody? | Schedule 2 | Schedule 4 | Schedule 5 | Schedule 1 only | Schedule 2 drugs such as morphine need a register and locked storage.
MATCH2#veterinary-u07-07-q3@2: Match each medicine to its controlled drug schedule. | Methadone = Schedule 2 ; Buprenorphine = Schedule 3 ; Diazepam = Schedule 4 ; Low-strength codeine preparation = Schedule 5 | Schedules reflect misuse potential and the controls needed.
M3#veterinary-u07-07-q4@3: A client asks for a written prescription to buy their dog's medicine online. What should the vet do? | Provide one if it is clinically appropriate | Refuse, as medicines must be bought there | Charge only if the client buys elsewhere | Tell them to ask an SQP instead | Clients are entitled to a written prescription, and a reasonable fee may be charged.
SA2#veterinary-u07-07-q5@2,3: Describe the duties of a practice for Schedule 2 controlled drugs. | Schedule 2 drugs such as methadone must be stored in a locked cabinet that meets safe custody rules, with keys controlled by a vet or authorised person. Each receipt and use must be recorded in the controlled drugs register with a running balance that is checked regularly against stock. Out-of-date stock must be destroyed in the presence of an authorised witness, and thefts or losses must be reported. | Safe custody ; Register and running balance ; Witnessed destruction ; Reporting losses

## Withdrawal periods and food-producing animals
LV: Clinical · Application
S: Medicines given to food-producing animals can leave residues in meat, milk and eggs. This lesson explains maximum residue limits, withdrawal periods and the duties of vets and farmers to keep residues out of the food chain.
O: Explain maximum residue limits and withdrawal periods
O: Describe statutory minimum withdrawal periods under the cascade
O: Calculate and apply withdrawal periods on farm
H: Residues and limits
P: A **residue** is any amount of a medicine or its breakdown products left in food from a treated animal. A **maximum residue limit (MRL)** is the highest concentration of a residue legally allowed in food, set so that it is safe for consumers. Only substances with an MRL, or found not to need one, may be given to **food-producing animals**. The **withdrawal period** is the minimum time between the last treatment and when meat, milk, eggs or honey may enter the food chain, so that residues fall below the MRL. Each authorised product's **SPC** states its withdrawal periods for each food. The **Veterinary Medicines Directorate** runs the **National Residues Control Programme**, which tests food samples.
H: Statutory minimum withdrawal periods
- If a medicine is used under the **cascade** in a food-producing animal, minimum withdrawal periods apply.
- **Meat** from mammals and poultry: at least **28 days**.
- **Milk**: at least **7 days**.
- **Eggs**: at least **7 days**.
- **Fish**: at least **500 degree-days**.
- A longer period is used if the product's authorised withdrawal period for any species is longer.
H: Farm practice
- Record the date of the last treatment and the date the withdrawal period ends.
- Mark treated animals, for example with leg bands or spray marks on dairy cows.
- Discard milk from treated cows during the withdrawal period, and keep it out of the bulk tank.
- Use **milk residue tests** where appropriate before returning cows to the herd.
- Horses must have a passport declaration before many medicines can be used.
X: Treating a dairy cow with mastitis.
> A cow is treated with an intramammary product with a 4-day milk withdrawal.
> The last treatment is given on Monday morning.
> The farmer marks the cow, records the treatment and discards her milk until the withdrawal ends.
> Milk is returned to the tank only after the withdrawal period, and the record is updated.
K: Residues are medicine left in food, MRLs set safe limits and withdrawal periods ensure residues fall below them; under the cascade, statutory minimums of 28 days for meat, 7 days for milk and eggs and 500 degree-days for fish apply, and farms must record, mark and discard appropriately.
!: Counting the withdrawal period from the first treatment. It starts from the last treatment given.
EV: established | Statutory minimum withdrawal periods apply when medicines are used under the cascade in food-producing animals.
T: Maximum residue limit | The highest legally allowed concentration of a residue in food
T: Withdrawal period | The minimum time after the last treatment before food from an animal can be used
T: Degree-days | Water temperature in degrees Celsius multiplied by days, used for fish
SUM: MRLs protect consumers.
SUM: Count from the last treatment.
SUM: Cascade minimums: 28, 7, 7, 500.
SRC: Veterinary Medicines Directorate, The cascade: prescribing unauthorised medicines | guidance | 2024 | https://www.gov.uk/guidance/the-cascade-prescribing-unauthorised-medicines
SRC: Veterinary Medicines Directorate, Residues surveillance: National Residues Control Programme results | data | 2024 | https://www.gov.uk/government/collections/residues-surveillance
Q: What is the statutory minimum meat withdrawal under the cascade? | 28 days.
Q: From which treatment is a withdrawal period counted? | The last treatment.
M1#veterinary-u07-08-q1@1: What does a maximum residue limit set? | The highest allowed residue in food | The longest time a drug can be stored | The largest dose a vet may prescribe | The maximum number of treatments | MRLs define safe residue concentrations in food.
M2#veterinary-u07-08-q2@2: What is the statutory minimum milk withdrawal when a medicine is used under the cascade? | 7 days | 28 days | 1 day | 500 degree-days | Milk and eggs have a minimum of 7 days under the cascade.
NUM2#veterinary-u07-08-q3@3: Fish are treated under the cascade in water at 10 degrees Celsius. How many days must pass to reach the 500 degree-day minimum withdrawal? | 50 | 0 | days | Degree-days are temperature multiplied by days, so 500 divided by 10 gives 50 days.
M3#veterinary-u07-08-q4@3: A cow's last treatment was on 1 March with a product carrying a 28-day meat withdrawal. When is the earliest she may go for slaughter? | 29 March | 1 March | 8 March | 1 April | The withdrawal runs for 28 days from the last treatment, ending on 29 March.
SA2#veterinary-u07-08-q5@2,3: Explain how a dairy farmer keeps milk residues out of the food chain after treating a cow. | The farmer follows the withdrawal period on the product's SPC, or the statutory minimum of 7 days if the vet has used the cascade, counting from the last treatment. The cow is clearly marked and her milk is discarded and kept out of the bulk tank until the period ends. The treatment, dates and withdrawal end are recorded, and a milk residue test may be used before her milk returns to the tank. | Withdrawal source ; Counting from last treatment ; Marking and discarding milk ; Records and testing

## Responsible use of antimicrobials
LV: Clinical · Evaluation
S: Vets have a legal and professional duty to use antimicrobials responsibly. This lesson explains UK rules on antimicrobial prescribing, national use targets and how to evaluate whether an antimicrobial is justified in a clinical case.
O: Describe UK legal and professional rules on antimicrobial prescribing
O: Explain national targets and surveillance of antimicrobial use
O: Evaluate whether antimicrobial treatment is justified in a case
H: Rules and duties
P: Since the **2024 amendments to the Veterinary Medicines Regulations**, UK law restricts antimicrobial use more tightly. Antimicrobials must not be used **routinely** or to make up for poor hygiene or husbandry. **Prophylaxis** (treating before infection) is allowed only in exceptional cases for individual animals or a restricted number of animals when the risk of infection is very high, and **metaphylaxis** (treating a group when some animals are already sick) only when the risk of spread is high and no alternative is available. Prescriptions for antimicrobials should be for a limited quantity and duration, based on clinical assessment. The **RCVS** expects vets to follow responsible use principles, and the **BSAVA PROTECT ME** and **RUMA** guidance help put them into practice.
H: Targets and surveillance
- The **UK-VARSS** report publishes sales and use of antimicrobials in animals each year.
- Sales of antibiotics for food-producing animals in the UK fell substantially after 2014.
- **RUMA Targets Task Force** sets sector targets for cattle, sheep, pigs, poultry and other sectors.
- Farm assurance schemes such as **Red Tractor** require annual reviews of antibiotic use.
- **HP-CIA** use in food-producing animals has fallen to very low levels.
H: Evaluating a case
- Is there evidence of a **bacterial** infection, or is the cause likely viral or non-infectious?
- Would the animal recover without an antimicrobial, as in many cases of acute diarrhoea?
- Can **topical** treatment, drainage or cleaning replace a systemic drug?
- Has a sample been taken for **culture and sensitivity**?
- What is the narrowest suitable drug, and for how short a course?
X: A dog with acute diarrhoea.
> A bright, eating dog has had diarrhoea for two days, with no blood and no fever.
> The vet considers that most such cases are self-limiting and not caused by bacteria needing treatment.
> No antimicrobial is given; the vet advises a bland diet, monitoring and when to come back.
> The owner is told to return urgently if the dog becomes lethargic, vomits repeatedly or passes blood.
K: UK law now bans routine antimicrobial use and limits prophylaxis and metaphylaxis, UK-VARSS and RUMA track and target use, and vets should evaluate each case for evidence of bacterial infection, alternatives such as topical treatment, culture and sensitivity and the narrowest, shortest suitable course.
!: Prescribing antimicrobials to satisfy an owner's expectation. The decision must be clinical, with a clear explanation of why an antimicrobial is not needed.
EV: established | Many cases of acute uncomplicated diarrhoea in dogs resolve without antimicrobial treatment.
EV: contested | The best way to set antimicrobial use targets across different livestock sectors is still debated.
T: Prophylaxis | Giving an antimicrobial before infection to prevent disease
T: Metaphylaxis | Treating a group when some animals already show disease
T: Antimicrobial stewardship | Coordinated actions to use antimicrobials only when needed and in the right way
SUM: No routine use.
SUM: VARSS tracks use.
SUM: Question every prescription.
SRC: The Veterinary Medicines (Amendment etc.) Regulations 2024 | standard | 2024 | https://www.legislation.gov.uk
SRC: Responsible Use of Medicines in Agriculture Alliance, Targets Task Force Report | guidance | 2024 | https://www.ruma.org.uk
SRC: British Small Animal Veterinary Association, PROTECT ME: responsible antimicrobial use | guidance | 2024 | https://www.bsava.com
Q: What is metaphylaxis? | Treating a group of animals when some already show disease.
Q: Which annual UK report publishes veterinary antimicrobial sales? | UK-VARSS.
M1#veterinary-u07-09-q1@1: Under the 2024 amendments, which antimicrobial use is banned? | Routine use to replace good husbandry | Use after culture and sensitivity | Use for a diagnosed infection | Use in an individual sick animal | Antimicrobials must not compensate for poor hygiene or husbandry.
M2#veterinary-u07-09-q2@2: When is antimicrobial prophylaxis allowed under UK law? | Only exceptionally, when infection risk is very high | Whenever a group of animals is moved | For every routine surgical procedure | Whenever an owner requests it | Prophylaxis is restricted to exceptional cases for individuals or small numbers.
TF2#veterinary-u07-09-q3@2: Sales of antibiotics for UK food-producing animals have fallen substantially since 2014. | true | UK-VARSS data show large falls following sector targets and stewardship work.
M3#veterinary-u07-09-q4@3: A calf group has one calf with pneumonia, and the others are bright. Which approach best follows responsible use? | Treat the sick calf and monitor the rest | Treat every calf in the shed routinely | Give the whole farm a preventive course | Delay all treatment for every calf | Metaphylaxis is allowed only when spread risk is high and no alternative exists, so start with the sick calf.
SA2#veterinary-u07-09-q5@1,3: Evaluate whether an antimicrobial should be prescribed for a cat with a small, fresh scratch wound. | The wound is small and fresh, so cleaning, lavage and monitoring are likely to be enough, and there is no evidence yet of bacterial infection. Prescribing routinely would add selection pressure for resistance without clear benefit and would go against UK rules and PROTECT ME principles. An antimicrobial would be considered if signs of infection such as an abscess, fever or cellulitis developed, ideally guided by culture and the narrowest suitable drug. | Assess need ; Alternatives ; Resistance and rules ; When treatment would be justified

## Antimicrobials
LV: Clinical · Application
S: Antimicrobials kill or inhibit bacteria by acting on targets that human and animal cells lack. This lesson explains the main antibacterial classes, their mechanisms and spectra, and the factors that guide choice.
O: Describe the mechanisms of action of the main antibacterial classes
O: Distinguish bactericidal from bacteriostatic and time-dependent from concentration-dependent drugs
O: Explain the factors that guide antimicrobial choice
H: Classes and targets
P: Antibacterial drugs work because bacteria have targets that mammalian cells lack or that differ. **Beta-lactams**, such as **penicillins** and **cephalosporins**, block cell wall synthesis by binding **penicillin-binding proteins**; **clavulanate** is added to some penicillins to inhibit beta-lactamases. **Aminoglycosides**, **tetracyclines**, **macrolides**, **lincosamides** and **phenicols** inhibit **protein synthesis** at the bacterial ribosome. **Fluoroquinolones** inhibit **DNA gyrase**, and **potentiated sulphonamides** block **folate synthesis** at two steps. **Metronidazole** damages DNA in **anaerobes**, and **polymyxins** disrupt Gram-negative membranes. Each class has a typical **spectrum**: penicillin G is mainly active against Gram-positive bacteria, while aminoglycosides act mainly against aerobic Gram-negative bacteria.
H: How they kill
- **Bactericidal** drugs kill bacteria, such as beta-lactams, aminoglycosides and fluoroquinolones.
- **Bacteriostatic** drugs stop growth and rely on host defences, such as tetracyclines.
- **Time-dependent** drugs, such as beta-lactams, work best when levels stay above the **minimum inhibitory concentration (MIC)** for long periods.
- **Concentration-dependent** drugs, such as aminoglycosides and fluoroquinolones, work best with high peak levels.
- The MIC is the lowest concentration that prevents visible bacterial growth in the laboratory.
H: Choosing an antimicrobial
- The likely or confirmed organism and its **susceptibility**.
- Whether the drug reaches the site, such as the prostate, brain, eye or inside cells.
- The species, age, kidney and liver function, and pregnancy.
- Toxicity, such as **nephrotoxicity** with aminoglycosides.
- Withdrawal periods in food animals and **WHO/EMA importance categories**.
- Owner compliance, route and frequency of giving.
X: Choosing treatment for a cystitis.
> A female dog has signs of a bacterial urinary tract infection.
> The vet collects urine by cystocentesis for culture and sensitivity.
> The result shows *E. coli* sensitive to a first-line drug that is concentrated in urine.
> The vet chooses that drug rather than a fluoroquinolone, in line with ISCAID guidelines.
K: Beta-lactams block cell wall synthesis, aminoglycosides, tetracyclines, macrolides and others block protein synthesis, fluoroquinolones block DNA gyrase and potentiated sulphonamides block folate synthesis; drugs are bactericidal or bacteriostatic, time- or concentration-dependent, and choice depends on organism, susceptibility, site, species, toxicity and importance category.
!: Choosing the broadest-spectrum drug to be safe. Broad-spectrum drugs disrupt normal flora and select resistance; the narrowest effective drug is better.
EV: established | Beta-lactam antimicrobials show time-dependent killing, while aminoglycosides show concentration-dependent killing.
T: MIC | Minimum inhibitory concentration, the lowest drug level that prevents visible growth
T: Bactericidal | Killing bacteria
T: Spectrum | The range of bacteria an antimicrobial is active against
SUM: Targets differ from host cells.
SUM: Time- versus concentration-dependent.
SUM: Choose by organism and site.
SRC: Giguère S., Prescott J. F. and Dowling P. M. (eds), Antimicrobial Therapy in Veterinary Medicine, 5th edition, Wiley-Blackwell | secondary | 2013
SRC: Weese J. S., Blondeau J., Boothe D. and others, International Society for Companion Animal Infectious Diseases (ISCAID) guidelines for the diagnosis and management of bacterial urinary tract infections in dogs and cats, The Veterinary Journal 247: 8-25 | guidance | 2019
SRC: European Medicines Agency, Categorisation of antibiotics for use in animals | guidance | 2019 | https://www.ema.europa.eu/en/documents/report/infographic-categorisation-antibiotics-use-animals-prudent-and-responsible-use_en.pdf
Q: What do beta-lactam antibiotics inhibit? | Bacterial cell wall synthesis.
Q: What does MIC stand for? | Minimum inhibitory concentration.
M1#veterinary-u07-10-q1@1: Which class inhibits bacterial DNA gyrase? | Fluoroquinolones | Penicillins | Tetracyclines | Aminoglycosides | Fluoroquinolones block the DNA gyrase enzyme needed for DNA replication.
M2#veterinary-u07-10-q2@2: Why is clavulanate combined with some penicillins? | It inhibits beta-lactamase enzymes | It improves absorption from the gut | It turns penicillin into a static drug | It reduces the risk of kidney damage | Clavulanate protects the penicillin from bacterial beta-lactamases.
MATCH2#veterinary-u07-10-q3@1: Match each class to its main target. | Beta-lactams = Cell wall ; Aminoglycosides = Ribosome ; Fluoroquinolones = DNA gyrase ; Potentiated sulphonamides = Folate synthesis | Antimicrobial classes act on different bacterial targets.
M3#veterinary-u07-10-q4@3: An infection is caused by anaerobic bacteria in a tooth root abscess. Which drug group is most likely to be active? | Metronidazole | Aminoglycosides | Polymyxins | Narrow anti-Gram-negative drugs | Metronidazole is active against anaerobes, while aminoglycosides need oxygen to enter bacteria.
SA2#veterinary-u07-10-q5@2,3: Explain the factors a vet considers when choosing an antimicrobial. | The vet considers the likely or confirmed organism and its susceptibility, ideally from culture and sensitivity. The drug must reach the infection site at effective levels, and the animal's species, age, organ function and pregnancy affect safety. Toxicity, withdrawal periods in food animals, the importance category of the drug and how easily the owner can give it also guide the choice. | Organism and susceptibility ; Site penetration ; Patient factors ; Toxicity, withdrawal and category

## Antiparasitic drugs
LV: Clinical · Application
S: Antiparasitic drugs control worms, flukes, protozoa and ectoparasites. This lesson explains the main classes and their modes of action, safety issues and how to choose a product for the parasite and species.
O: Describe the modes of action of the main antiparasitic classes
O: Identify key safety concerns with antiparasitic drugs
O: Choose an appropriate antiparasitic for a parasite, species and situation
H: Classes and actions
P: **Antiparasitic drugs** are grouped as **endoparasiticides** (against internal parasites), **ectoparasiticides** (against external parasites) and **endectocides**, which act on both. **Benzimidazoles** bind **beta-tubulin**, starving worms of energy. **Levamisole** acts on nicotinic receptors, causing **spastic paralysis**. **Macrocyclic lactones**, such as ivermectin, moxidectin and milbemycin, act on **glutamate-gated chloride channels**, causing **flaccid paralysis**, and also act on many ectoparasites. **Praziquantel** acts against **tapeworms**. **Isoxazolines**, such as fluralaner, sarolaner and afoxolaner, block insect and tick **GABA-gated chloride channels** and are used for fleas and ticks. Flukicides such as **triclabendazole** are active against immature and adult liver fluke.
H: Safety issues
- Dogs with the **MDR1** mutation are sensitive to high levels of macrocyclic lactones.
- **Permethrin** is toxic to cats.
- Isoxazolines carry a data sheet warning about **neurological** adverse events in some dogs.
- Some ectoparasiticides harm **aquatic life**, so dogs should not swim soon after spot-on treatment, and products should be disposed of safely.
- Withdrawal periods apply in food animals, and some products are not allowed in dairy animals producing milk for people.
H: Choosing a product
- Identify the parasite and its life stage, such as immature or adult fluke.
- Check the product is authorised for the species and age.
- Consider resistance status on the farm.
- Match the route to the situation: oral, injectable, pour-on, spot-on or collar.
- Follow ESCCAP, SCOPS or COWS advice, and weigh the animal so it receives the full intended amount.
X: Planning flea and tick control.
> An owner of a dog and two cats asks for flea and tick protection.
> The vet chooses a product authorised in cats and warns against using the dog's product on the cats.
> For the dog, which swims often, the vet discusses oral treatment to reduce release into rivers.
> The vet advises treating the home for fleas as well as all the pets.
K: Benzimidazoles act on beta-tubulin, levamisole and macrocyclic lactones paralyse worms, praziquantel acts on tapeworms and isoxazolines block chloride channels in fleas and ticks; safety concerns include MDR1 dogs, permethrin in cats, neurological events and environmental harm, and choice depends on parasite, stage, species, resistance and route.
!: Assuming all wormers kill tapeworms. Many broad-spectrum roundworm products have no activity against tapeworms, so praziquantel or another cestocide may be needed.
EV: established | Ectoparasiticides such as fipronil and imidacloprid have been detected in English rivers, raising environmental concerns.
T: Endectocide | A drug active against both internal and external parasites
T: Isoxazoline | A class of ectoparasiticide that blocks GABA-gated chloride channels in fleas and ticks
T: Cestocide | A drug that kills tapeworms
SUM: Classes act on different targets.
SUM: Watch MDR1 dogs and cats.
SUM: Think about the environment.
SRC: Riviere J. E. and Papich M. G. (eds), Veterinary Pharmacology and Therapeutics, 10th edition, Wiley-Blackwell | secondary | 2018
SRC: Perkins R., Whitehead M., Civil W. and Goulson D., Potential role of veterinary flea products in widespread pesticide contamination of English rivers, Science of the Total Environment 755: 143560 | primary | 2021
SRC: ESCCAP UK and Ireland, Control of ectoparasites in dogs and cats: guideline 3 | guidance | 2024 | https://www.esccapuk.org.uk
Q: Which drug is used against tapeworms? | Praziquantel.
Q: Which receptor do macrocyclic lactones act on in worms? | Glutamate-gated chloride channels.
M1#veterinary-u07-11-q1@1: Which wormer class binds beta-tubulin? | Benzimidazoles | Macrocyclic lactones | Isoxazolines | Levamisole | Benzimidazoles stop tubulin forming microtubules in worm cells.
M2#veterinary-u07-11-q2@2: What kind of paralysis does levamisole cause in worms? | Spastic paralysis | Flaccid paralysis | No paralysis | Reversible sleep | Levamisole stimulates nicotinic receptors, causing sustained muscle contraction.
TF2#veterinary-u07-11-q3@2: Some spot-on ectoparasiticides can harm aquatic life if treated dogs swim soon after treatment. | true | Active ingredients wash off into water and are toxic to aquatic invertebrates.
M3#veterinary-u07-11-q4@3: Sheep die suddenly in autumn from acute fasciolosis. Which flukicide property is essential? | Activity against immature fluke | Activity against adult tapeworms | Activity against adult fluke only | Activity against sheep scab mites | Acute fasciolosis is caused by migrating immature flukes, so the product must kill them.
SA2#veterinary-u07-11-q5@2,3: Explain the safety issues a vet considers when prescribing antiparasitic drugs to pets. | The vet checks species safety, because permethrin is toxic to cats and dog products must not be used on them. Breeds that may carry the MDR1 mutation can be sensitive to macrocyclic lactones, and isoxazolines carry warnings about neurological events. The vet also considers environmental harm from spot-ons in water and advises on safe use and disposal. | Cat safety ; MDR1 breeds ; Neurological warnings ; Environment

## Non-steroidal anti-inflammatory drugs
LV: Clinical · Application
S: NSAIDs are among the most widely used drugs in veterinary practice for pain and inflammation. This lesson explains how they work, their adverse effects and how to use them safely, including in cats.
O: Explain the mechanism of action of NSAIDs
O: Describe the main adverse effects and risk factors
O: Apply safe-use principles for NSAIDs in dogs, cats and horses
H: Mechanism
P: **Non-steroidal anti-inflammatory drugs (NSAIDs)** inhibit **cyclo-oxygenase (COX)** enzymes, which convert **arachidonic acid** into **prostaglandins** and **thromboxanes**. **COX-1** is constitutive and produces prostaglandins that protect the **stomach lining**, maintain **kidney blood flow** and support **platelet** function. **COX-2** is largely induced during inflammation and drives pain, swelling and fever. Older NSAIDs block both enzymes, while **COX-2 selective** or **preferential** drugs, such as meloxicam, robenacoxib and firocoxib, aim to reduce side effects, though COX-2 also has protective roles. NSAIDs provide **analgesic**, **anti-inflammatory** and **antipyretic** effects and are central to **multimodal analgesia** for osteoarthritis and surgery.
H: Adverse effects
- **Gastrointestinal** ulceration, vomiting and bleeding.
- **Kidney** injury, especially with dehydration, hypotension or existing kidney disease.
- **Liver** damage, which is usually idiosyncratic.
- Reduced **platelet** function and bleeding risk with some drugs.
- Risk rises with high doses, combinations with **corticosteroids** or another NSAID and old age.
- Cats are more sensitive because of limited glucuronidation of some NSAIDs.
H: Safe use
- Use only products authorised for the species, following the data sheet.
- Never combine with corticosteroids or another NSAID; allow a **washout** when switching.
- Assess hydration and blood pressure before surgery; avoid NSAIDs in shocked or dehydrated animals.
- Monitor kidney and liver values in long-term use, as ISFM and AAFP guidelines advise for cats.
- Tell owners to stop the drug and contact the vet promptly if vomiting, black faeces or loss of appetite develop.
X: Long-term NSAID use in an older cat.
> A 14-year-old cat with osteoarthritis would benefit from long-term pain relief.
> Before starting, the vet checks blood pressure, kidney values and urine.
> The cat starts an NSAID authorised for long-term use in cats, given with food.
> The owner is told to watch for poor appetite or vomiting, and blood tests are repeated as ISFM guidelines advise.
K: NSAIDs inhibit COX enzymes and reduce prostaglandins, giving pain relief, anti-inflammatory and antipyretic effects; adverse effects affect the gut, kidneys, liver and platelets, and safe use means species-authorised products, no combination with corticosteroids or other NSAIDs, attention to hydration and monitoring in long-term use.
!: Assuming NSAIDs are unsafe in cats. Some NSAIDs are authorised for long-term use in cats, including those with stable kidney disease, with careful monitoring under ISFM guidance.
EV: established | Combining NSAIDs with corticosteroids increases the risk of gastrointestinal ulceration.
EV: contested | The clinical benefit of COX-2 selectivity in reducing adverse effects in dogs and cats is still debated.
T: COX-1 | A constitutive cyclo-oxygenase enzyme with protective roles in the gut, kidney and platelets
T: COX-2 | An inducible cyclo-oxygenase enzyme that drives inflammation and pain
T: Washout | A drug-free gap before switching between NSAIDs or to corticosteroids
SUM: NSAIDs block COX.
SUM: Gut, kidney and liver risks.
SUM: Never combine with steroids.
SRC: Sparkes A. H., Heiene R., Lascelles B. D. X. and others, ISFM and AAFP consensus guidelines: long-term use of NSAIDs in cats, Journal of Feline Medicine and Surgery 12: 521-538 | guidance | 2010
SRC: Monteiro B. P., Lascelles B. D. X., Murrell J. and others, 2022 WSAVA guidelines for the recognition, assessment and treatment of pain, Journal of Small Animal Practice 64: 177-254 | guidance | 2023
SRC: British Small Animal Veterinary Association, BSAVA Small Animal Formulary, 11th edition, Part A: Canine and Feline | standard | 2023 | https://www.bsava.com
Q: Which enzyme do NSAIDs inhibit? | Cyclo-oxygenase (COX).
Q: Which drug class should never be combined with an NSAID? | Corticosteroids.
M1#veterinary-u07-12-q1@1: What do COX enzymes produce from arachidonic acid? | Prostaglandins | Histamine | Antibodies | Acetylcholine | Cyclo-oxygenase converts arachidonic acid into prostaglandins and thromboxanes.
M2#veterinary-u07-12-q2@2: Why are dehydrated animals at greater risk of NSAID kidney injury? | Prostaglandins maintain kidney blood flow | NSAIDs are absorbed faster when dry | Dehydration stops the liver working | NSAIDs cause animals to stop drinking | When blood flow is low, kidneys depend on prostaglandins, which NSAIDs block.
SEQ2#veterinary-u07-12-q3@3: Put the steps for starting long-term NSAID treatment in an older cat in order. | Check kidney values and blood pressure ; Choose an NSAID authorised for long-term cat use ; Advise the owner on side effects ; Recheck bloods during treatment | Baseline checks, a safe product, owner advice and monitoring keep use safe.
M3#veterinary-u07-12-q4@3: A dog on a long-term NSAID starts vomiting and passes black faeces. What is the most appropriate advice? | Stop the NSAID and see a vet promptly | Double the NSAID for extra relief | Add a corticosteroid to the NSAID | Switch to a human NSAID at home | Black faeces suggest gastrointestinal bleeding, which needs prompt veterinary assessment.
SA2#veterinary-u07-12-q5@1,2: Explain how NSAIDs work and why they can damage the stomach and kidneys. | NSAIDs inhibit cyclo-oxygenase enzymes, reducing the production of prostaglandins that drive pain, inflammation and fever. COX-1 prostaglandins also protect the stomach lining by maintaining mucus, bicarbonate and blood flow, so blocking them can cause ulcers. In the kidney, prostaglandins maintain blood flow when circulation is reduced, so NSAIDs can cause kidney injury, especially in dehydrated or hypotensive animals. | COX inhibition ; Prostaglandin roles ; Gastric effects ; Renal effects

## Corticosteroids
LV: Clinical · Application
S: Corticosteroids are powerful anti-inflammatory and immunosuppressive drugs. This lesson explains how glucocorticoids work, their main uses and adverse effects, and why long courses must be withdrawn gradually.
O: Explain the mechanism and effects of glucocorticoids
O: Describe the main clinical uses and adverse effects of corticosteroids
O: Explain the need for tapering and species-specific risks
H: Mechanism and effects
P: **Corticosteroids** are synthetic versions of hormones from the **adrenal cortex**. **Glucocorticoids**, such as **prednisolone** and **dexamethasone**, enter cells and bind **glucocorticoid receptors**, which change **gene transcription**. They reduce production of inflammatory mediators, including prostaglandins and cytokines, reduce migration of white cells and suppress lymphocytes. At low levels they are **anti-inflammatory** and at higher levels **immunosuppressive**. They also raise blood glucose, break down protein, redistribute fat and affect fluid balance. **Mineralocorticoids**, such as **fludrocortisone** and **desoxycorticosterone**, act mainly on sodium and potassium balance and are used to treat **hypoadrenocorticism** (Addison's disease).
H: Uses and adverse effects
- Uses include allergic skin disease, immune-mediated diseases such as IMHA, some cancers, asthma in cats and recurrent airway obstruction in horses.
- Short-term effects: increased thirst, urination and appetite, and panting in dogs.
- Long-term effects: **iatrogenic hyperadrenocorticism**, muscle wasting, thin skin, infections and poor wound healing.
- Cats may develop **diabetes mellitus**, and corticosteroids are linked with **laminitis** risk in some horses.
- They should not be combined with NSAIDs because of the risk of gut ulceration.
H: Stopping safely
- Long-term glucocorticoids suppress the **hypothalamic-pituitary-adrenal axis**.
- The adrenal glands shrink and cannot respond quickly to stress.
- Stopping suddenly can cause an **adrenal crisis** with weakness, vomiting and collapse.
- Long courses are therefore **tapered** gradually under veterinary guidance.
- Owners must not stop long-term steroids without speaking to the vet, and collapse needs urgent care.
X: Tapering after immune-mediated disease.
> A dog with immune-mediated thrombocytopenia is treated with prednisolone for several months.
> Once platelet counts are stable, the vet plans a gradual reduction over weeks.
> The owner is told that stopping suddenly could cause weakness and collapse.
> Platelet counts are checked at each step to detect relapse.
K: Glucocorticoids bind intracellular receptors and change gene transcription, giving anti-inflammatory and immunosuppressive effects, with uses in allergy, immune-mediated disease and some cancers; adverse effects include polydipsia, iatrogenic Cushing's, infection, diabetes in cats and laminitis risk in horses, and long courses must be tapered to avoid adrenal crisis.
!: Stopping a long course of steroids suddenly once signs improve. The suppressed adrenal glands cannot respond, so courses must be tapered.
EV: established | Long-term glucocorticoid treatment suppresses the hypothalamic-pituitary-adrenal axis.
EV: contested | The size of the risk that therapeutic corticosteroids cause laminitis in healthy horses is debated.
T: Glucocorticoid | A corticosteroid that mainly affects metabolism and inflammation
T: Iatrogenic | Caused by medical treatment
T: Tapering | Gradual reduction of a drug to allow the body to adjust
SUM: Steroids change gene transcription.
SUM: Many long-term side effects.
SUM: Taper long courses.
SRC: Riviere J. E. and Papich M. G. (eds), Veterinary Pharmacology and Therapeutics, 10th edition, Wiley-Blackwell | secondary | 2018
SRC: Swann J. W., Garden O. A., Fellman C. L. and others, ACVIM consensus statement on the treatment of immune-mediated hemolytic anemia in dogs, Journal of Veterinary Internal Medicine 33: 1141-1172 | guidance | 2019
Q: Which receptors do glucocorticoids bind? | Intracellular glucocorticoid receptors.
Q: What can happen if long-term steroids are stopped suddenly? | An adrenal crisis with weakness, vomiting and collapse.
M1#veterinary-u07-13-q1@1: Which disease is treated with mineralocorticoids? | Hypoadrenocorticism | Hyperthyroidism | Diabetes mellitus | Hyperadrenocorticism | Addison's disease causes mineralocorticoid deficiency, which is replaced with treatment.
M2#veterinary-u07-13-q2@2: Why do long-term glucocorticoids make dogs drink more? | They increase urine output and thirst | They raise blood calcium levels | They damage the thirst centre | They cause vomiting and dehydration | Glucocorticoids interfere with urine concentration, causing polyuria and secondary polydipsia.
TF2#veterinary-u07-13-q3@2: Long-term corticosteroid use can trigger diabetes mellitus in cats. | true | Glucocorticoids cause insulin resistance, and susceptible cats can become diabetic.
M3#veterinary-u07-13-q4@3: An owner wants to stop their dog's long-term prednisolone because it drinks a lot. What is the best advice? | Discuss tapering with the vet first | Stop all tablets today | Halve the dose without telling the vet | Swap to an NSAID straight away | Sudden withdrawal risks adrenal crisis, so the vet must plan a taper.
SA2#veterinary-u07-13-q5@2,3: Explain why long courses of glucocorticoids must be tapered. | Long-term glucocorticoids suppress the hypothalamic-pituitary-adrenal axis, so the pituitary makes less ACTH and the adrenal glands shrink. If the drug is stopped suddenly, the adrenal glands cannot produce enough cortisol, especially under stress. This can cause an adrenal crisis with weakness, vomiting and collapse, so the vet reduces the drug gradually to let the axis recover. | Axis suppression ; Adrenal atrophy ; Adrenal crisis ; Gradual reduction

## Opioids and analgesia
LV: Clinical · Application
S: Opioids are the most effective drugs for moderate to severe pain. This lesson explains opioid receptors and drug types, adverse effects, pain assessment and the principle of multimodal analgesia.
O: Describe opioid receptors and the main types of opioid drug
O: Explain the adverse effects and legal controls of opioids
O: Apply pain scoring and multimodal analgesia to clinical cases
H: Receptors and drugs
P: **Opioids** act on **mu (MOP)**, **kappa (KOP)** and **delta (DOP)** receptors in the brain, spinal cord and peripheral tissues, reducing transmission of pain signals. **Full mu agonists**, such as **methadone**, **morphine** and **fentanyl**, provide strong analgesia for severe pain. **Buprenorphine** is a **partial mu agonist** with a slow onset, long action and a ceiling effect, suitable for mild to moderate pain. **Butorphanol** is a kappa agonist and mu antagonist that gives sedation and short-lived analgesia. **Naloxone** is a competitive antagonist used to reverse opioid effects. Most opioids are **controlled drugs** under the Misuse of Drugs Regulations.
H: Adverse effects and species
- **Respiratory depression**, especially with full agonists in sick patients.
- **Bradycardia**, vomiting with some opioids, constipation and urinary retention.
- **Excitement** in cats and horses at high doses, rather than sedation.
- Body temperature can rise in cats after some opioids.
- Effects can be reversed with naloxone, which also reverses analgesia.
H: Pain assessment and multimodal analgesia
- Pain should be scored regularly using validated tools, such as the **Glasgow Composite Measure Pain Scale** for dogs.
- The **Feline Grimace Scale** and **Horse Grimace Scale** use facial expressions.
- **Multimodal analgesia** combines drugs acting at different points, such as opioids, NSAIDs, local anaesthetics and ketamine.
- **Pre-emptive analgesia** given before surgery reduces later pain.
- **Local anaesthetic** techniques, such as nerve blocks, reduce the need for systemic drugs.
- Untreated pain is a welfare problem, as WSAVA pain guidelines emphasise.
X: Pain relief after a fracture repair.
> A dog has surgery to repair a fractured femur.
> Before surgery it receives a full mu agonist, and a local nerve block is placed.
> After surgery an NSAID is added, and pain is scored every few hours with the Glasgow scale.
> As pain scores fall, the vet steps down from the full agonist to a lower-strength option.
K: Opioids act on mu, kappa and delta receptors, with full agonists for severe pain, buprenorphine as a partial agonist and butorphanol for sedation and short analgesia; adverse effects include respiratory depression and species-specific excitement, naloxone reverses them, and pain should be scored and treated with multimodal analgesia.
!: Giving analgesia only when an animal cries out. Many animals hide pain, so validated scoring is needed to detect and treat it.
EV: established | Multimodal analgesia using drugs with different mechanisms improves pain control and reduces individual drug side effects.
T: Partial agonist | A drug that binds a receptor but produces less than the maximum effect
T: Multimodal analgesia | Combining analgesics that act at different points in the pain pathway
T: Pre-emptive analgesia | Giving analgesia before a painful stimulus
SUM: Full agonists for severe pain.
SUM: Naloxone reverses opioids.
SUM: Score pain and combine drugs.
SRC: Monteiro B. P., Lascelles B. D. X., Murrell J. and others, 2022 WSAVA guidelines for the recognition, assessment and treatment of pain, Journal of Small Animal Practice 64: 177-254 | guidance | 2023
SRC: Reid J., Nolan A. M., Hughes J. M. L. and others, Development of the short-form Glasgow Composite Measure Pain Scale (CMPS-SF) and derivation of an analgesic intervention score, Animal Welfare 16 (S): 97-104 | primary | 2007
SRC: Evangelista M. C., Watanabe R., Leung V. S. Y. and others, Facial expressions of pain in cats: the development and validation of a Feline Grimace Scale, Scientific Reports 9: 19128 | primary | 2019
Q: Which opioid is a partial mu agonist? | Buprenorphine.
Q: Which drug reverses opioid effects? | Naloxone.
M1#veterinary-u07-14-q1@1: Which opioid is a full mu agonist? | Methadone | Buprenorphine | Butorphanol | Naloxone | Methadone fully activates mu receptors, giving strong analgesia.
M2#veterinary-u07-14-q2@2: Which pain tool uses facial expressions in cats? | The Feline Grimace Scale | The Glasgow scale for dogs | The body condition score | The Five Domains model | The Feline Grimace Scale scores ear, eye, muzzle, whisker and head position.
MATCH2#veterinary-u07-14-q3@3: Match each drug to its role. | Methadone = Severe pain ; Buprenorphine = Mild to moderate pain ; Butorphanol = Sedation with short analgesia ; Naloxone = Reversal | Opioids differ in receptor action and clinical use.
M3#veterinary-u07-14-q4@3: After surgery, a cat still has a high grimace score despite an opioid. What is the best next step? | Add another analgesic class and rescore | Stop all analgesia and observe | Give naloxone to wake the cat | Wait until the next day to rescore | Multimodal analgesia adds drugs acting at different points, and rescoring checks the response.
SA2#veterinary-u07-14-q5@2,3: Explain multimodal analgesia and why it is used. | Multimodal analgesia combines drugs that act at different points in the pain pathway, such as opioids, NSAIDs, local anaesthetics and ketamine. Combining them gives better pain control than one drug alone and allows lower amounts of each, reducing side effects. It is used for surgical and chronic pain, alongside regular pain scoring, as the WSAVA pain guidelines recommend. | Definition ; Examples ; Better control and fewer side effects ; Pain scoring

## Sedatives and anaesthetic agents
LV: Clinical · Application
S: Sedation and general anaesthesia allow safe handling, imaging and surgery. This lesson explains the main sedative and anaesthetic drug groups, how anaesthesia is planned and the risks of anaesthetic death.
O: Describe the main sedative drug groups and their reversal
O: Explain the stages of general anaesthesia and the drugs used
O: Evaluate anaesthetic risk using ASA status and published data
H: Sedatives
P: **Alpha-2 adrenoceptor agonists**, such as **medetomidine**, **dexmedetomidine**, **xylazine**, **detomidine** and **romifidine**, give reliable **sedation**, muscle relaxation and some analgesia, but cause **bradycardia**, early **hypertension** and vomiting in some species. Their effects can be **reversed** with **atipamezole**. **Ruminants** are much more sensitive to xylazine than horses. **Acepromazine**, a **phenothiazine**, gives calming without analgesia, lowers blood pressure through **vasodilation** and cannot be reversed. **Benzodiazepines**, such as midazolam, give little sedation in healthy animals but are useful in sick or old patients and for **seizures**.
H: General anaesthesia
- **Premedication**: sedatives and analgesics that calm the animal and reduce the drugs needed.
- **Induction**: injectable agents such as **propofol**, **alfaxalone** or **ketamine** produce unconsciousness.
- **Maintenance**: inhaled agents such as **isoflurane** and **sevoflurane**, or continued injectable drugs.
- **MAC** (minimum alveolar concentration) measures the potency of inhaled agents.
- **Recovery**: monitoring continues until the animal is fully awake, as many deaths occur after surgery.
H: Risk and monitoring
- The **ASA physical status** classification grades patients from I (healthy) to V (moribund).
- The **CEPSAF** study (Brodbelt and others, 2008) found anaesthetic-related death rates of about 0.17 percent in dogs and 0.24 percent in cats.
- Risk rises with ASA grade, extremes of age and body size, and emergency procedures.
- Monitor heart rate, breathing, oxygen saturation, blood pressure and temperature.
- Use a **safety checklist** and keep the animal warm during recovery.
X: Planning anaesthesia for an older dog.
> A 12-year-old dog with mild heart disease needs dental surgery.
> The vet classes it as ASA III and chooses drugs with less effect on the heart and blood pressure.
> Blood pressure and oxygen saturation are monitored throughout, and fluids are given.
> Monitoring continues closely in recovery, the riskiest period in CEPSAF.
K: Alpha-2 agonists sedate reliably and are reversed by atipamezole, acepromazine calms without analgesia and cannot be reversed, and benzodiazepines suit sick patients; anaesthesia involves premedication, induction, maintenance and recovery, risk is graded by ASA status, and CEPSAF showed most deaths occur after surgery, so recovery monitoring is vital.
!: Stopping monitoring when the anaesthetic gas is turned off. CEPSAF found many anaesthetic deaths happen in recovery, so monitoring must continue.
EV: established | The CEPSAF study found that a large proportion of perioperative deaths in dogs and cats occurred in the postoperative period.
T: ASA status | A grading of a patient's physical health from I to V before anaesthesia
T: MAC | Minimum alveolar concentration of an inhaled agent that prevents movement in half of patients
T: Premedication | Drugs given before induction to calm the animal and provide analgesia
SUM: Alpha-2 agonists are reversible.
SUM: Premed, induce, maintain, recover.
SUM: Most deaths after surgery.
SRC: Brodbelt D. C., Blissitt K. J., Hammond R. A. and others, The risk of death: the Confidential Enquiry into Perioperative Small Animal Fatalities, Veterinary Anaesthesia and Analgesia 35: 365-373 | primary | 2008
SRC: Grubb T., Sager J., Gaynor J. S. and others, 2020 AAHA anesthesia and monitoring guidelines for dogs and cats, Journal of the American Animal Hospital Association 56: 59-82 | guidance | 2020
SRC: Clarke K. W., Trim C. M. and Hall L. W., Veterinary Anaesthesia, 11th edition, Saunders Elsevier | secondary | 2014
Q: Which drug reverses alpha-2 agonist sedation? | Atipamezole.
Q: What does ASA status grade? | A patient's physical health before anaesthesia, from I to V.
M1#veterinary-u07-15-q1@1: Which sedative cannot be reversed? | Acepromazine | Medetomidine | Dexmedetomidine | Xylazine | Acepromazine has no specific reversal agent.
M2#veterinary-u07-15-q2@2: Why does acepromazine lower blood pressure? | It causes vasodilation | It raises the heart rate | It blocks opioid receptors | It increases blood volume | Acepromazine blocks alpha-1 receptors in vessels, causing vasodilation.
SEQ1#veterinary-u07-15-q3@2: Put the stages of general anaesthesia in order. | Premedication ; Induction ; Maintenance ; Recovery | Each stage has its own drugs and monitoring.
M3#veterinary-u07-15-q4@3: Which patient has the highest anaesthetic risk according to CEPSAF findings? | An ASA IV dog in an emergency | A healthy young dog for neutering | An ASA I cat for a dental scale | A fit adult dog for a skin lump | Risk rises with poor health status and emergency surgery.
SA2#veterinary-u07-15-q5@2,3: Explain why monitoring must continue into recovery after anaesthesia. | The CEPSAF study found that many anaesthetic-related deaths in dogs and cats happen after the procedure, during recovery. At this time animals may be cold, have breathing problems, low blood pressure or airway obstruction, and staff attention often drops. Continuing to monitor heart rate, breathing, temperature and oxygenation until the animal is fully awake allows problems to be treated early. | CEPSAF evidence ; Recovery risks ; Reduced attention ; Continued monitoring

## Cardiovascular drugs
LV: Clinical · Application
S: Drugs for heart failure and hypertension are widely used in dogs and cats. This lesson explains the main cardiovascular drug classes, how they work and the evidence and ACVIM guidance behind their use.
O: Describe the mechanisms of the main cardiovascular drug classes
O: Explain the evidence for treating myxomatous mitral valve disease
O: Apply cardiovascular drug knowledge to clinical cases
H: Drug classes
P: Heart failure activates the **renin-angiotensin-aldosterone system (RAAS)** and the sympathetic system, which retain fluid and strain the heart. **Pimobendan** is an **inodilator**: it increases the heart's contraction by sensitising heart muscle to **calcium** and dilates vessels by inhibiting **phosphodiesterase III**. **Loop diuretics**, such as **furosemide** and **torasemide**, remove fluid in **congestive heart failure**. **Angiotensin-converting enzyme (ACE) inhibitors**, such as benazepril, reduce angiotensin II and aldosterone. **Spironolactone** blocks aldosterone receptors. **Amlodipine**, a calcium channel blocker, is the first-line treatment for **hypertension in cats**. Antiarrhythmic drugs and **antithrombotic** drugs such as clopidogrel are used in specific conditions, such as feline cardiomyopathy with risk of clots.
H: Evidence and guidance
- The **ACVIM consensus statement** on myxomatous mitral valve disease (MMVD) stages disease from A to D.
- The **EPIC** trial showed pimobendan delayed the onset of heart failure in dogs with stage B2 MMVD and enlarged hearts.
- The **QUEST** trial showed pimobendan extended survival in dogs with congestive heart failure from MMVD compared with benazepril.
- Dogs in stage C need diuretics, pimobendan and often other drugs.
- The **ISFM consensus guidelines** guide treatment of hypertension in cats.
H: Monitoring
- Check kidney values and electrolytes after starting diuretics and ACE inhibitors.
- Owners can count **resting respiratory rate** at home; a rising rate suggests fluid on the lungs.
- Blood pressure should be measured after starting amlodipine.
- Breathlessness, collapse or blue gums need emergency veterinary care.
X: A dog with a heart murmur.
> A 9-year-old Cavalier King Charles Spaniel has a loud mitral murmur but no signs of illness.
> Echocardiography and radiographs show an enlarged left atrium and ventricle, ACVIM stage B2.
> Based on the EPIC trial, the vet starts pimobendan to delay heart failure.
> The owner learns to count the resting breathing rate at home and to call the vet if it rises.
K: Pimobendan is an inodilator, loop diuretics remove fluid, ACE inhibitors and spironolactone block the RAAS and amlodipine treats feline hypertension; ACVIM stages MMVD from A to D, EPIC supports pimobendan in stage B2 and QUEST in heart failure, and monitoring includes kidney values, blood pressure and home resting respiratory rate.
!: Starting pimobendan for every dog with a murmur. EPIC supports it only in stage B2 with heart enlargement, not in dogs with a murmur but normal heart size.
EV: established | The EPIC trial showed that pimobendan delays the onset of congestive heart failure in dogs with preclinical MMVD and cardiomegaly.
T: Inodilator | A drug that increases heart contraction and dilates blood vessels
T: RAAS | Renin-angiotensin-aldosterone system, which retains salt and water
T: Resting respiratory rate | Breaths per minute while sleeping, used to monitor heart failure at home
SUM: Pimobendan is an inodilator.
SUM: ACVIM stages A to D.
SUM: Count resting breaths at home.
SRC: Keene B. W., Atkins C. E., Bonagura J. D. and others, ACVIM consensus guidelines for the diagnosis and treatment of myxomatous mitral valve disease in dogs, Journal of Veterinary Internal Medicine 33: 1127-1140 | guidance | 2019
SRC: Boswood A., Häggström J., Gordon S. G. and others, Effect of pimobendan in dogs with preclinical myxomatous mitral valve disease and cardiomegaly: the EPIC study, Journal of Veterinary Internal Medicine 30: 1765-1779 | primary | 2016
SRC: Taylor S. S., Sparkes A. H., Briscoe K. and others, ISFM consensus guidelines on the diagnosis and management of hypertension in cats, Journal of Feline Medicine and Surgery 19: 288-303 | guidance | 2017
Q: Which drug is first-line for hypertension in cats? | Amlodipine.
Q: Which trial showed pimobendan delays heart failure in stage B2 MMVD? | The EPIC trial.
M1#veterinary-u07-16-q1@1: How do loop diuretics help in congestive heart failure? | They remove excess fluid | They slow the heart rate | They dissolve blood clots | They increase blood volume | Diuretics increase sodium and water loss, reducing fluid in the lungs.
M2#veterinary-u07-16-q2@2: How does pimobendan act? | It sensitises heart muscle to calcium and dilates vessels | It blocks beta receptors to slow the heart | It inhibits ACE to reduce angiotensin | It blocks aldosterone at the kidney | Pimobendan is an inodilator with calcium-sensitising and PDE III effects.
NUM2#veterinary-u07-16-q3@3: An owner counts 9 breaths in 15 seconds while their dog sleeps. What is the resting respiratory rate in breaths per minute? | 36 | 0 | breaths per minute | Multiply 9 by 4 to convert 15 seconds to one minute, giving 36, which is above 30 and should prompt a call to the vet.
M3#veterinary-u07-16-q4@3: A dog in ACVIM stage C starts a diuretic and ACE inhibitor. What should be checked soon after? | Kidney values and electrolytes | Thyroid hormone levels | Faecal egg counts | Liver bile acids | Diuretics and ACE inhibitors can affect kidney function and electrolytes.
SA2#veterinary-u07-16-q5@2,3: Explain how evidence from trials guides drug treatment of myxomatous mitral valve disease in dogs. | The ACVIM consensus stages MMVD from A to D, and treatment depends on the stage. The EPIC trial showed that pimobendan delays heart failure in stage B2 dogs with enlarged hearts, so it is started at that stage but not in dogs with normal heart size. In stage C, dogs need diuretics and pimobendan, which the QUEST trial showed extends survival compared with benazepril. | ACVIM staging ; EPIC and stage B2 ; Stage C treatment ; QUEST evidence

## Drugs acting on the gut
LV: Clinical · Application
S: Gastrointestinal drugs treat vomiting, ulceration, diarrhoea and constipation. This lesson explains the main classes of antiemetic, gastroprotectant, prokinetic and laxative drugs and when to treat the cause rather than the sign.
O: Describe the mechanisms of antiemetic drugs
O: Explain how gastroprotectant, prokinetic and laxative drugs work
O: Decide when gut drugs are appropriate and when urgent investigation is needed
H: Antiemetics
P: Vomiting is coordinated by the **emetic centre** in the brainstem, which receives signals from the **chemoreceptor trigger zone**, the gut, the vestibular system and higher centres. **Maropitant** blocks **neurokinin-1 (NK1)** receptors for substance P, acting centrally and peripherally against vomiting from many causes. **Metoclopramide** blocks **dopamine D2** receptors and also increases gastric emptying. **Ondansetron** blocks **5-HT3** serotonin receptors and is often used for vomiting linked to chemotherapy. Antiemetics treat the sign, not the cause, and should not mask conditions such as a **gut obstruction**, where vomiting continues and urgent investigation is needed.
H: Gastroprotectants and prokinetics
- **Proton pump inhibitors**, such as omeprazole, block acid secretion most effectively.
- **H2 receptor antagonists**, such as famotidine, reduce acid less strongly.
- **Sucralfate** forms a protective layer over ulcers.
- **Prokinetics**, such as metoclopramide, increase gut movement; they must not be used if there is an obstruction.
- Gastroprotectants are not needed routinely with NSAIDs, according to ACVIM consensus.
H: Diarrhoea and constipation
- Most acute diarrhoea is self-limiting and is managed with diet and fluids.
- **Probiotics** and **kaolin** are used, though evidence varies.
- **Lactulose** is an osmotic laxative used for constipation and hepatic encephalopathy.
- Enemas need care: some phosphate enemas are toxic to cats and small dogs.
- Repeated vomiting, blood, abdominal pain or collapse need urgent veterinary attention.
X: A vomiting dog that ate a toy.
> A young dog has vomited six times today and is not passing faeces.
> The owner says the dog chewed a toy, and the abdomen is painful.
> The vet does not simply give an antiemetic, because it could mask a foreign body obstruction.
> Radiographs confirm an obstruction, and the dog goes to surgery.
K: Maropitant blocks NK1 receptors, metoclopramide blocks D2 receptors and is prokinetic, ondansetron blocks 5-HT3 receptors, proton pump inhibitors and H2 antagonists reduce acid, sucralfate protects ulcers and lactulose is an osmotic laxative; gut drugs treat signs, so obstruction and other serious causes must be ruled out first.
!: Giving a prokinetic to a vomiting animal without ruling out obstruction. Prokinetics can worsen or rupture an obstructed gut.
EV: established | Proton pump inhibitors suppress gastric acid more effectively than H2 receptor antagonists in dogs.
T: Antiemetic | A drug that prevents or reduces vomiting
T: Prokinetic | A drug that increases gut movement
T: Proton pump inhibitor | A drug that blocks the final step of gastric acid secretion
SUM: Antiemetics act on different receptors.
SUM: PPIs reduce acid most.
SUM: Rule out obstruction first.
SRC: Marks S. L., Kook P. H., Papich M. G., Tolbert M. K. and Willard M. D., ACVIM consensus statement: support for rational administration of gastrointestinal protectants to dogs and cats, Journal of Veterinary Internal Medicine 32: 1823-1840 | guidance | 2018
SRC: British Small Animal Veterinary Association, BSAVA Small Animal Formulary, 11th edition, Part A: Canine and Feline | standard | 2023 | https://www.bsava.com
Q: Which receptor does maropitant block? | The neurokinin-1 (NK1) receptor.
Q: What type of laxative is lactulose? | An osmotic laxative.
M1#veterinary-u07-17-q1@1: Which drug class reduces stomach acid most effectively? | Proton pump inhibitors | H2 receptor antagonists | Prokinetics | Osmotic laxatives | PPIs block the proton pump, the final step of acid secretion.
M2#veterinary-u07-17-q2@2: Which receptor does ondansetron block? | 5-HT3 receptors | Dopamine D2 receptors | NK1 receptors | Histamine H2 receptors | Ondansetron is a serotonin 5-HT3 antagonist.
TF2#veterinary-u07-17-q3@2: ACVIM consensus recommends giving a gastroprotectant routinely to every dog on an NSAID. | false | ACVIM advises against routine use without a specific indication such as ulceration.
M3#veterinary-u07-17-q4@3: A cat is constipated, and the owner asks about a phosphate enema bought from a shop. What is the best advice? | Do not use it; see the vet | Use half of the enema at home | Use it with warm water only | Use it if the cat is over 2 years | Some phosphate enemas cause fatal electrolyte disturbance in cats.
SA2#veterinary-u07-17-q5@2,3: Explain why a vet should not simply give an antiemetic to every vomiting animal. | Antiemetics treat the sign of vomiting, not its cause, which may be serious, such as a foreign body obstruction, pancreatitis or a toxin. Masking vomiting can delay diagnosis and treatment, and prokinetic antiemetics can harm an obstructed gut. The vet should first take a history and examine the animal, and investigate further when there is repeated vomiting, pain, blood or collapse. | Sign not cause ; Masking serious disease ; Prokinetic risk ; Assess and investigate

## Drug calculations: principles
LV: Clinical · Application
S: Accurate calculations prevent medication errors. This lesson explains the units, concentrations and step-by-step methods used to work out amounts and volumes, using a fictional drug so that no real doses are given.
O: Convert between units of mass and volume
O: Interpret concentrations expressed as percentages and mg per ml
O: Calculate the volume and number of tablets needed from a prescribed amount
H: Units and conversions
P: Drug calculations start with **units**. Mass is measured in **kilograms (kg)**, **grams (g)**, **milligrams (mg)** and **micrograms**, with each step a factor of **1000**: 1 g equals 1000 mg and 1 mg equals 1000 micrograms. Volume is measured in **litres** and **millilitres (ml)**. The prescribed amount for a patient is usually written by the vet, from the data sheet or formulary, as an amount per kilogram of body weight, so an **accurate weight** is essential. In this lesson all amounts relate to a fictional **Drug A** and are for practice only: real doses must always come from the **SPC** or the **BSAVA Formulary** and be checked by the vet.
H: Concentrations
- Liquid concentrations are usually written as **mg per ml**.
- A **percentage weight per volume (w/v)** means grams per 100 ml.
- So a 1 percent solution contains 1 g per 100 ml, which is **10 mg per ml**.
- A 5 percent solution therefore contains 50 mg per ml.
- Ratio strengths, such as 1 in 1000, mean 1 g in 1000 ml, or 1 mg per ml.
H: Step-by-step method
- Step 1: check the weight in kg and the prescribed amount per kg.
- Step 2: total amount (mg) = weight (kg) multiplied by amount per kg.
- Step 3: volume (ml) = total amount (mg) divided by concentration (mg per ml).
- Step 4: for tablets, number of tablets = total amount divided by tablet strength.
- Step 5: check that the answer is sensible, and ask a colleague to double-check.
X: Working out a volume for fictional Drug A.
> A 20 kg dog is prescribed fictional Drug A at 2 mg per kg.
> Total amount: 20 kg multiplied by 2 mg per kg gives 40 mg.
> Drug A solution is 5 mg per ml, so volume is 40 divided by 5, which is 8 ml.
> A colleague checks the calculation before it is given.
K: Mass units differ by factors of 1000, percentage w/v means grams per 100 ml so 1 percent is 10 mg per ml, total amount equals weight times amount per kg, volume equals total amount divided by concentration, and every calculation should be checked against the data sheet and by a colleague.
!: Confusing mg and micrograms. They differ by a factor of 1000, so a unit slip can cause a thousandfold error.
EV: established | Independent double-checking of calculations reduces medication errors.
T: Concentration | The amount of drug in a given volume, such as mg per ml
T: Percentage w/v | Grams of substance per 100 ml of solution
T: Microgram | One thousandth of a milligram
SUM: Weigh accurately first.
SUM: 1 percent equals 10 mg per ml.
SUM: Always double-check.
SRC: Lake T. and Green N., Essential Calculations for Veterinary Nurses and Technicians, 3rd edition, Elsevier | secondary | 2016
SRC: British Small Animal Veterinary Association, BSAVA Small Animal Formulary, 11th edition, Part A: Canine and Feline | standard | 2023 | https://www.bsava.com
Q: How many mg per ml are in a 1 percent w/v solution? | 10 mg per ml.
Q: How many micrograms are in 1 mg? | 1000 micrograms.
M1#veterinary-u07-18-q1@1: How many milligrams are in 2.5 g? | 2500 mg | 25 mg | 250 mg | 25000 mg | Multiply grams by 1000: 2.5 multiplied by 1000 gives 2500 mg.
NUM2#veterinary-u07-18-q2@2: A solution of fictional Drug A is 2.5 percent w/v. What is its concentration in mg per ml? | 25 | 0 | mg per ml | 2.5 percent means 2.5 g per 100 ml, which is 2500 mg per 100 ml, or 25 mg per ml.
M2#veterinary-u07-18-q3@2: A 30 kg dog is prescribed fictional Drug A at 3 mg per kg. What is the total amount? | 90 mg | 10 mg | 33 mg | 900 mg | Total amount is 30 kg multiplied by 3 mg per kg, which gives 90 mg.
M3#veterinary-u07-18-q4@3: A cat needs 25 mg of fictional Drug A, and tablets contain 50 mg. How many tablets are needed? | Half a tablet | Two tablets | One tablet | A quarter of a tablet | 25 divided by 50 gives 0.5, so half a tablet is needed, if the tablet is scored for splitting.
SA2#veterinary-u07-18-q5@2,3: Explain the steps to calculate the volume of a liquid drug to draw up. | First, weigh the animal accurately and confirm the prescribed amount per kilogram from the vet and the data sheet. Multiply the weight in kilograms by the amount per kilogram to get the total amount in milligrams. Divide the total amount by the concentration in mg per ml to get the volume, then check the answer is sensible and ask a colleague to double-check before giving. | Accurate weight ; Total amount ; Volume from concentration ; Sense check and double-check
`;
