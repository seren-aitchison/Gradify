// School 3: Pharmacokinetics and Biopharmaceutics. UK, as at 2026.
// Format: kit/course/notes.js. Standard: docs/CURRICULUM_CONTENT_STANDARD.md
// EDUCATION ONLY. Numbers and parameters are illustrative or typical values: for real dosing and monitoring,
// use the current BNF, the SPC and local therapeutic drug monitoring guidance.
export default `
## Introduction to pharmacokinetics
S: Pharmacokinetics describes how drug concentrations change over time as the body absorbs, distributes, metabolises and excretes a drug. It explains why doses, routes and intervals are chosen and why people respond differently.
O: Describe the four processes of pharmacokinetics (ADME)
O: Explain how pharmacokinetics links dose to effect
T: ADME | Absorption, distribution, metabolism and excretion: the four processes that determine drug concentrations
T: Concentration-time curve | A graph of plasma drug concentration against time after a dose
H: The four processes
- **Absorption**: movement from the site of administration into the blood.
- **Distribution**: movement from the blood into tissues.
- **Metabolism**: chemical change, mainly in the liver, usually to more water-soluble and less active products.
- **Excretion**: removal from the body, mainly by the kidneys and in bile.
- Metabolism and excretion together are called **elimination**.
H: Why it matters
- The concentration at the site of action drives the effect; pharmacokinetics predicts that concentration from the dose.
- Key parameters (bioavailability, volume of distribution, clearance and half-life) decide the dose, the dosing interval and the time to steady state.
- Age, organ function, genetics, interactions and illness all change pharmacokinetics, which is why one dose doesn't suit everyone.
K: ADME determines drug concentrations; four parameters (bioavailability, volume of distribution, clearance, half-life) turn that into dosing decisions.
!: Assuming everyone given the same dose reaches the same concentration: kidney function, age and interactions change it.
Q: What does ADME stand for? | Absorption, distribution, metabolism and excretion.
Q: What two processes make up elimination? | Metabolism and excretion.
SUM: Pharmacokinetics links dose to concentration over time.
SUM: Four parameters drive dose, interval and time to steady state.
SRC: Rowland M, Tozer TN, Clinical Pharmacokinetics and Pharmacodynamics: Concepts and Applications, 5th edition, Wolters Kluwer | secondary | 2019
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
M1#pharmacy-u03-01-q1@1: Which process removes a drug from the body unchanged? | Excretion | Absorption | Distribution | Dissolution | Ionisation | Excretion (mainly renal or biliary) removes drug from the body; metabolism changes it chemically.
M2#pharmacy-u03-01-q2@2: Why might two people on the same dose have different drug levels? | Differences in kidney function, age or interactions | Because the tablets differ in colour | Because doses are always rounded | Only because of different diets | Levels never differ between people | Organ function, age, genetics and interactions all change pharmacokinetics.
M2#pharmacy-u03-01-q3@1: Which two processes together are called elimination? | Metabolism and excretion | Absorption and distribution | Distribution and excretion | Absorption and metabolism | Dissolution and absorption | Elimination is the irreversible loss of drug by metabolism and excretion.

## Routes of administration
S: The route of administration decides how quickly and how completely a drug reaches the circulation, and sometimes where it acts. Choosing the right route balances speed, convenience, safety and the person's situation.
O: Compare the main routes of administration and their pharmacokinetic features
O: Choose a route appropriate to the drug and the person
T: Enteral route | Administration via the gastrointestinal tract (oral, sublingual, buccal, rectal, via feeding tube)
T: Parenteral route | Administration bypassing the gut, such as intravenous, intramuscular or subcutaneous injection
H: The routes
- **Oral**: convenient, but absorption is variable and first-pass metabolism reduces bioavailability.
- **Sublingual and buccal**: rapid absorption into the systemic circulation, avoiding first-pass metabolism (glyceryl trinitrate).
- **Intravenous**: complete bioavailability and immediate effect; risks include infection, extravasation and dosing errors.
- **Intramuscular and subcutaneous**: absorption depends on blood flow; used for vaccines, insulin and some depot preparations.
- **Rectal**: useful when oral isn't possible; partly avoids first-pass metabolism.
- **Inhaled, topical and transdermal**: local action with less systemic exposure (inhaled corticosteroids), or steady systemic delivery (fentanyl or nicotine patches).
H: Choosing a route
- Consider how fast an effect is needed, whether the person can swallow, the drug's oral bioavailability, and local versus systemic action.
- Switching from intravenous to oral when appropriate reduces line infections and shortens hospital stays.
K: Each route trades speed, completeness of absorption, convenience and risk; choose for the drug, the situation and the person.
!: Assuming oral and IV doses are interchangeable: oral bioavailability is often lower, so the doses can differ.
Q: Why does sublingual GTN act quickly? | It's absorbed directly into the systemic circulation, avoiding first-pass metabolism.
Q: What is the bioavailability of an IV dose? | 100%.
SUM: Routes differ in speed, completeness of absorption and risk.
SUM: Choose a route for the clinical need and the person's situation.
SRC: Rowland M, Tozer TN, Clinical Pharmacokinetics and Pharmacodynamics, 5th edition, Wolters Kluwer | secondary | 2019
SRC: Medusa NHS Injectable Medicines Guide | guidance | 2026 | https://www.medusaimg.nhs.uk/
M1#pharmacy-u03-02-q1@1: Which route gives 100% bioavailability? | Intravenous | Oral | Rectal | Transdermal | Inhaled | IV administration delivers the whole dose into the circulation.
M2#pharmacy-u03-02-q2@2: Why are inhaled corticosteroids preferred to oral ones for asthma control? | They act locally with less systemic exposure | They're absorbed faster into the blood | They avoid the need for a device | They have higher bioavailability | They're always cheaper | Inhaled delivery targets the airways and limits systemic side effects.
M2#pharmacy-u03-02-q3@1: Why can an oral dose be larger than the IV dose of the same drug? | Oral bioavailability is incomplete | The IV route is less effective | Oral drugs are weaker | The stomach adds drug | IV doses accumulate | Incomplete absorption and first-pass metabolism reduce oral bioavailability.

## Absorption and bioavailability
S: Before an oral drug can act, it must dissolve and cross the gut wall, then survive the liver. Bioavailability measures how much of a dose reaches the systemic circulation unchanged.
O: Explain the factors that affect drug absorption
O: Define and interpret bioavailability
T: Bioavailability (F) | The fraction of an administered dose reaching the systemic circulation unchanged
T: Passive diffusion | Movement of drug across membranes down a concentration gradient, favoured for small, lipid-soluble, un-ionised molecules
H: Factors affecting absorption
- **Drug properties**: lipid solubility, ionisation (pKa and gut pH), molecular size and solubility.
- **Formulation**: dissolution rate, modified-release designs, coatings.
- **The gut**: gastric emptying, transit time, food, blood flow, surface area, and transporters such as P-glycoprotein.
- **Interactions**: chelation (tetracyclines and quinolones with calcium, iron or antacids), pH changes.
H: Measuring bioavailability
- F is found by comparing the area under the concentration-time curve (AUC) after an oral dose with that after an IV dose.
- F is reduced by incomplete absorption and first-pass metabolism.
- The rate of absorption affects the peak concentration (Cmax) and when it occurs (Tmax); the extent affects the AUC.
K: Bioavailability is the fraction reaching the circulation unchanged; absorption depends on the drug, the formulation, the gut and interactions.
!: Taking a tetracycline or quinolone with milk, antacids or iron, which chelate it and reduce absorption.
Q: How is bioavailability measured? | By comparing the AUC after oral and IV doses.
Q: What does the rate of absorption mainly affect? | The peak concentration (Cmax) and its timing (Tmax).
SUM: Absorption depends on drug, formulation, gut and interactions.
SUM: Bioavailability is the fraction of a dose reaching the circulation unchanged.
SRC: Rowland M, Tozer TN, Clinical Pharmacokinetics and Pharmacodynamics, 5th edition, Wolters Kluwer | secondary | 2019
SRC: Aulton ME, Taylor KMG (editors), Aulton's Pharmaceutics, 6th edition, Elsevier | secondary | 2021
M2#pharmacy-u03-03-q1@1: How is oral bioavailability calculated? | Oral AUC compared with IV AUC, adjusted for dose | Peak concentration divided by dose | Half-life multiplied by clearance | Volume of distribution divided by AUC | Urine concentration divided by dose | F = (AUC oral × dose IV) ÷ (AUC IV × dose oral).
M2#pharmacy-u03-03-q2@2: Why should ciprofloxacin not be taken with an antacid? | Chelation reduces its absorption | The antacid increases toxicity | It makes ciprofloxacin act too fast | The antacid is inactivated | There is no interaction | Multivalent cations bind quinolones in the gut.
M3#pharmacy-u03-03-q3@1: A slower-dissolving formulation has the same AUC but a lower Cmax. What changed? | The rate, not the extent, of absorption | The extent of absorption | The drug's clearance | The volume of distribution | The drug's half-life | Same AUC means the same extent; a lower, later peak reflects slower absorption.

## First-pass metabolism
S: Drugs absorbed from the gut pass through the gut wall and liver before reaching the rest of the body, and some are extensively metabolised on the way. This first-pass effect explains low oral bioavailability and why some drugs are given by other routes.
O: Explain first-pass metabolism and its clinical consequences
O: Identify drugs and routes affected by first-pass metabolism
T: First-pass metabolism | Metabolism of a drug in the gut wall and liver before it reaches the systemic circulation
T: Hepatic extraction ratio | The fraction of drug removed by the liver in one pass
H: The first-pass effect
- Orally absorbed drugs enter the hepatic portal vein and pass through the liver first.
- Drugs with a high hepatic extraction (such as glyceryl trinitrate, lidocaine and morphine) lose much of the dose on the first pass.
- Gut wall enzymes (CYP3A4) and transporters also contribute.
H: Consequences
- Low and variable oral bioavailability; larger oral than IV doses (for example oral morphine doses are higher than IV ones).
- Liver disease or interactions that reduce first-pass metabolism can sharply increase exposure.
- Routes that avoid the portal circulation (sublingual, buccal, transdermal, IV, partly rectal) bypass it: glyceryl trinitrate is used sublingually or transdermally because oral doses would be largely metabolised.
K: First-pass metabolism lowers oral bioavailability; bypassing the portal circulation (sublingual, transdermal, IV) avoids it.
!: Converting between oral and IV morphine as if the doses were equivalent: oral doses are larger because of first-pass metabolism.
Q: Name a drug with high first-pass metabolism. | For example glyceryl trinitrate, lidocaine or morphine.
Q: Which routes avoid first-pass metabolism? | For example sublingual, buccal, transdermal and intravenous.
SUM: First-pass metabolism in gut wall and liver reduces oral bioavailability.
SUM: Some drugs are given by other routes to bypass it.
SRC: Rowland M, Tozer TN, Clinical Pharmacokinetics and Pharmacodynamics, 5th edition, Wolters Kluwer | secondary | 2019
SRC: Joint Formulary Committee, British National Formulary: glyceryl trinitrate | guidance | 2026 | https://bnf.nice.org.uk/
M1#pharmacy-u03-04-q1@2: Why is glyceryl trinitrate given sublingually for angina? | To avoid extensive first-pass metabolism | To slow its absorption | To increase its half-life | To avoid the lungs | Because it can't be made as a tablet | Swallowed GTN is largely metabolised by the liver before reaching the circulation.
M2#pharmacy-u03-04-q2@1: Why can liver cirrhosis increase exposure to oral drugs with high first-pass metabolism? | Less drug is removed on the first pass | Absorption from the gut stops | The kidneys excrete more | Protein binding rises | The drug is destroyed in the stomach | Reduced hepatic metabolism and shunting let more drug reach the circulation.
M2#pharmacy-u03-04-q3@2: Which route avoids first-pass metabolism? | Transdermal | Oral tablet | Oral liquid | Swallowed capsule | Enteric-coated tablet | Transdermal absorption enters the systemic circulation directly.

## Distribution and volume of distribution
S: Once in the blood, drugs distribute into tissues to different extents. The volume of distribution describes this and decides how big a loading dose must be to reach a target concentration.
O: Define volume of distribution and explain what affects it
O: Use volume of distribution to interpret loading doses
T: Volume of distribution (Vd) | The apparent volume into which a drug distributes: amount in the body ÷ plasma concentration
T: Tissue binding | Binding of drug in tissues, which keeps plasma levels low and the Vd high
H: What Vd tells you
- A small Vd (close to blood or extracellular fluid volume) means the drug stays mainly in the blood or extracellular fluid: for example warfarin (highly protein bound) and gentamicin (water-soluble, extracellular).
- A large Vd (many litres per kg) means extensive tissue binding: for example digoxin and amiodarone.
- Vd is an apparent volume, not a real one: it can exceed total body water.
H: Factors and uses
- Lipid solubility, ionisation, plasma and tissue protein binding, and body composition (obesity, oedema, dehydration) all change Vd.
- Loading dose = target concentration × Vd ÷ F, so drugs with a large Vd need large loading doses to reach effective levels quickly.
- Fluid shifts in critical illness can increase the Vd of water-soluble drugs such as aminoglycosides.
K: Vd = amount in the body ÷ plasma concentration; a large Vd means tissue binding and a large loading dose.
!: Expecting a high Vd to mean a high plasma level: it means the opposite, because the drug is in the tissues.
Q: What does a very large Vd indicate? | Extensive distribution into and binding in tissues.
Q: How does Vd relate to the loading dose? | Loading dose = target concentration × Vd ÷ F.
SUM: Vd describes how widely a drug distributes.
SUM: It determines the loading dose needed for a target concentration.
SRC: Rowland M, Tozer TN, Clinical Pharmacokinetics and Pharmacodynamics, 5th edition, Wolters Kluwer | secondary | 2019
SRC: Winter ME, Basic Clinical Pharmacokinetics, Wolters Kluwer | secondary | 2010
M1#pharmacy-u03-05-q1@1: What is volume of distribution? | Amount in the body divided by plasma concentration | Total body water | Blood volume | Dose divided by half-life | Clearance multiplied by time | Vd is an apparent volume linking amount to concentration.
M2#pharmacy-u03-05-q2@2: Amiodarone has a very large Vd. What does this mean? | It is extensively bound in tissues | It stays mainly in plasma | It is rapidly excreted | It needs only tiny loading doses | It is mostly water-soluble | A large Vd reflects tissue binding, and a long time to reach steady state.
M3#pharmacy-u03-05-q3@2: Why might an aminoglycoside's Vd rise in a critically ill patient? | Fluid shifts expand the extracellular volume | The drug binds more to fat | Its clearance increases | The kidneys secrete it into tissues | Protein binding becomes complete | Water-soluble drugs distribute into expanded extracellular fluid.

## Plasma protein binding
S: Many drugs bind to plasma proteins, mainly albumin. Only the unbound (free) drug can act and be eliminated, which matters for interpreting levels when proteins are low.
O: Explain the significance of plasma protein binding
O: Interpret drug levels when albumin is low
T: Free fraction | The proportion of drug in plasma that isn't bound to proteins and can act
T: Albumin | The main plasma protein binding acidic drugs such as warfarin and phenytoin
H: Binding
- Acidic drugs bind mainly to albumin (warfarin, phenytoin, NSAIDs); basic drugs often bind to alpha-1 acid glycoprotein.
- Only free drug crosses membranes, acts at targets and is cleared.
- Binding is reversible; bound drug acts as a reservoir.
H: Clinical relevance
- **Low albumin** (in malnutrition, liver disease, nephrotic syndrome, critical illness) increases the free fraction. A total level within range may then hide a high free level: phenytoin levels need adjusting or measuring as free drug when albumin is low.
- **Displacement interactions** (one drug displacing another from albumin) rarely cause lasting effects on their own, because more free drug is also cleared faster; they matter mainly with narrow therapeutic index drugs and when combined with other effects.
- Renal failure can reduce binding of some drugs.
K: Only free drug acts; when albumin is low, a "normal" total level of a highly bound drug like phenytoin may be toxic.
!: Interpreting a phenytoin level as within range without considering a low albumin.
Q: Which plasma protein binds most acidic drugs? | Albumin.
Q: Why does low albumin matter for phenytoin? | The free fraction rises, so a normal total level can still be toxic.
SUM: Only unbound drug is active and eliminated.
SUM: Interpret levels of highly bound drugs in the light of albumin.
SRC: Rowland M, Tozer TN, Clinical Pharmacokinetics and Pharmacodynamics, 5th edition, Wolters Kluwer | secondary | 2019
SRC: Joint Formulary Committee, British National Formulary: phenytoin, plasma concentration monitoring | guidance | 2026 | https://bnf.nice.org.uk/
M2#pharmacy-u03-06-q1@1: Which part of a drug in plasma produces its effect? | The unbound (free) drug | The albumin-bound drug | Both equally | The metabolites only | The drug in red cells | Only free drug can reach targets and be cleared.
M3#pharmacy-u03-06-q2@2: A patient with low albumin has a total phenytoin level within range but signs of toxicity. Why? | The free fraction is raised | The level was taken too early | Phenytoin is bound to red cells | Albumin makes phenytoin inactive | The kidneys retain phenytoin | Low albumin increases free phenytoin, so the total level underestimates exposure.
M2#pharmacy-u03-06-q3@2: Why do displacement interactions rarely cause lasting problems alone? | Extra free drug is also cleared faster | Bound drug can't be displaced | Albumin levels always rise | Free drug is inactive | They only occur in children | Clearance of the free drug rises, so free levels return towards normal.

## Drug metabolism: phase I and II
S: Most drugs are metabolised to more water-soluble compounds that the kidneys can excrete. Phase I reactions change the molecule; phase II reactions attach a polar group. Metabolites may be inactive, active or toxic.
O: Describe phase I and phase II metabolic reactions
O: Explain the clinical importance of active and toxic metabolites
T: Phase I metabolism | Reactions (oxidation, reduction, hydrolysis) that introduce or expose a functional group, often by cytochrome P450 enzymes
T: Phase II metabolism | Conjugation reactions (such as glucuronidation, sulfation, acetylation) that attach a polar group
H: The two phases
- **Phase I**: oxidation (mostly by CYP450), reduction and hydrolysis. Products may be more, less or differently active.
- **Phase II**: conjugation with glucuronic acid, sulfate, glutathione, acetyl or methyl groups, usually producing inactive, water-soluble metabolites.
- Some drugs go straight to phase II (morphine glucuronidation); some need phase I first.
H: Active and toxic metabolites
- **Prodrugs** are activated by metabolism (codeine to morphine; clopidogrel to its active form; enalapril to enalaprilat).
- **Active metabolites** can accumulate in renal impairment, such as morphine-6-glucuronide, causing toxicity.
- **Toxic metabolites**: paracetamol's NAPQI, normally detoxified by glutathione.
- **Acetylation** varies genetically (slow and fast acetylators), affecting isoniazid.
K: Phase I changes the molecule; phase II conjugates it. Metabolites may be active (prodrugs), accumulate in renal failure, or be toxic.
!: Assuming metabolism always inactivates a drug: prodrugs and active metabolites are common.
Q: Name three phase II reactions. | For example glucuronidation, sulfation and acetylation.
Q: Which active metabolite of morphine accumulates in renal impairment? | Morphine-6-glucuronide.
SUM: Phase I and II reactions make drugs more water-soluble.
SUM: Metabolites can be active, accumulate or be toxic.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
SRC: Rowland M, Tozer TN, Clinical Pharmacokinetics and Pharmacodynamics, 5th edition, Wolters Kluwer | secondary | 2019
M1#pharmacy-u03-07-q1@1: Which is a phase II reaction? | Glucuronidation | Oxidation | Reduction | Hydrolysis | Hydroxylation | Glucuronidation is a conjugation (phase II) reaction.
M2#pharmacy-u03-07-q2@2: Why can morphine cause toxicity in renal impairment? | An active metabolite accumulates | It stops being metabolised | Its absorption increases | Its protein binding falls to zero | It becomes a prodrug | Morphine-6-glucuronide is renally excreted and accumulates.
M2#pharmacy-u03-07-q3@1: Which drug is a prodrug? | Clopidogrel | Paracetamol | Amoxicillin | Salbutamol | Insulin | Clopidogrel is activated by hepatic metabolism (partly via CYP2C19).

## Cytochrome P450 enzymes
S: The cytochrome P450 (CYP) enzymes carry out most phase I metabolism. Inhibiting or inducing them is the commonest mechanism of important drug interactions.
O: Identify the main CYP enzymes and drugs they metabolise
O: Predict interactions from CYP inhibition and induction
T: CYP inhibitor | A drug that reduces the activity of a CYP enzyme, raising levels of its substrates
T: CYP inducer | A drug or substance that increases CYP enzyme production, lowering levels of its substrates
H: The main enzymes
- **CYP3A4**: metabolises around half of all drugs, including simvastatin, ciclosporin, many calcium channel blockers and some DOACs.
- **CYP2D6**: codeine, tramadol, many antidepressants and antipsychotics; genetically variable.
- **CYP2C9**: warfarin (its more potent S-enantiomer), phenytoin.
- **CYP2C19**: clopidogrel activation, proton pump inhibitors.
- **CYP1A2**: theophylline, clozapine; induced by smoking.
H: Inhibitors and inducers
- Inhibitors: clarithromycin, itraconazole and ritonavir (3A4); fluconazole (2C9 and others); fluoxetine and paroxetine (2D6); ciprofloxacin (1A2); grapefruit juice (intestinal 3A4).
- Inducers: rifampicin, carbamazepine, phenytoin, St John's wort; smoking (1A2).
- Inhibition acts within days; induction takes one to two weeks to develop and to wear off.
- **Stopping smoking** removes CYP1A2 induction, so clozapine and theophylline levels can rise sharply.
K: Know the main CYP enzymes, their key substrates, and the common inhibitors and inducers; check the BNF for each combination.
!: Missing that a person on clozapine has stopped smoking (for example on admission to a smoke-free hospital), which can cause toxicity.
Q: Which CYP enzyme metabolises about half of all drugs? | CYP3A4.
Q: Why does stopping smoking affect clozapine? | Smoking induces CYP1A2; stopping lets clozapine levels rise.
SUM: CYP enzymes drive most phase I metabolism and many interactions.
SUM: Inhibition acts quickly; induction develops and fades over weeks.
SRC: Preston CL (editor), Stockley's Drug Interactions, Pharmaceutical Press | secondary | 2025
SRC: Joint Formulary Committee, British National Formulary: interactions | guidance | 2026 | https://bnf.nice.org.uk/interactions/
M1#pharmacy-u03-08-q1@2: Which drug is a strong CYP3A4 inhibitor? | Clarithromycin | Rifampicin | Carbamazepine | St John's wort | Phenytoin | Clarithromycin inhibits CYP3A4; the others are inducers.
M2#pharmacy-u03-08-q2@1: Which enzyme is induced by tobacco smoking? | CYP1A2 | CYP3A4 | CYP2D6 | CYP2C9 | CYP2C19 | Polycyclic hydrocarbons in smoke induce CYP1A2.
M3#pharmacy-u03-08-q3@2: A smoker on clozapine is admitted to a smoke-free ward. What should happen? | Monitor clozapine levels and side effects closely | Increase the clozapine dose | Nothing changes | Stop clozapine on admission | Start nicotine to block clozapine | Stopping smoking removes CYP1A2 induction, so clozapine levels may rise.

## Renal excretion
S: The kidneys excrete many drugs and metabolites by filtration, tubular secretion and reabsorption. When renal function falls, renally cleared drugs accumulate, a common cause of toxicity.
O: Describe the three processes of renal drug handling
O: Identify drugs whose excretion is most affected by renal function
T: Glomerular filtration | Passive filtration of unbound drug from plasma into the tubule
T: Tubular secretion | Active transport of drug into the tubule by transporters such as OATs and OCTs
H: Three processes
- **Filtration**: only unbound drug is filtered; depends on GFR.
- **Secretion**: active transport in the proximal tubule; can be saturated or competitively inhibited (probenecid reduces penicillin secretion; trimethoprim reduces creatinine secretion, raising serum creatinine without true kidney damage).
- **Reabsorption**: mainly of lipid-soluble, un-ionised drug; urine pH affects ionisation (alkalinising the urine increases excretion of weak acids such as salicylate).
H: Clinical consequences
- Drugs mainly excreted unchanged by the kidney accumulate in renal impairment: aminoglycosides, vancomycin, lithium, digoxin, metformin, many DOACs, gabapentin and pregabalin.
- **Lithium** is handled like sodium: dehydration, diuretics and low sodium intake increase its reabsorption and toxicity.
- Use creatinine clearance or eGFR as the BNF and SPC advise to adjust doses (School 6).
K: Filtration, secretion and reabsorption determine renal excretion; renally cleared drugs need dose adjustment as kidney function falls.
!: Ignoring dehydration in someone on lithium: sodium and water loss increase lithium reabsorption and toxicity.
Q: Which drug reduces renal secretion of penicillin? | Probenecid.
Q: Why does dehydration raise lithium levels? | Lithium is reabsorbed with sodium when the body conserves sodium and water.
SUM: Renal excretion combines filtration, secretion and reabsorption.
SUM: Renally cleared drugs accumulate as kidney function falls.
SRC: Joint Formulary Committee, British National Formulary: prescribing in renal impairment | guidance | 2026 | https://bnf.nice.org.uk/
SRC: Ashley C, Dunleavy A (editors), The Renal Drug Handbook, 5th edition, CRC Press | secondary | 2018
M1#pharmacy-u03-09-q1@1: Which form of a drug is filtered at the glomerulus? | The unbound drug | The albumin-bound drug | Only metabolites | Only ionised drug | Only drug in red cells | Proteins aren't filtered, so only free drug passes the glomerulus.
M2#pharmacy-u03-09-q2@2: Why can trimethoprim raise serum creatinine without kidney damage? | It inhibits tubular secretion of creatinine | It causes muscle breakdown | It increases creatinine production in the liver | It interferes with the creatinine assay only | It reduces GFR permanently | Reduced secretion raises creatinine without a true fall in GFR.
M2#pharmacy-u03-09-q3@1: Which drug is mainly excreted unchanged by the kidneys? | Gentamicin | Simvastatin | Warfarin | Amiodarone | Diazepam | Aminoglycosides accumulate in renal impairment.

## Biliary excretion and enterohepatic recycling
S: Some drugs and metabolites are excreted into bile and pass into the gut. Conjugates can be broken down by gut bacteria and the drug reabsorbed, prolonging its action. This is enterohepatic recycling.
O: Describe biliary excretion and enterohepatic recycling
O: Explain clinical situations where they matter
T: Biliary excretion | Active transport of drugs or metabolites from the liver into bile
T: Enterohepatic recycling | Reabsorption of a drug from the gut after biliary excretion, often after bacterial deconjugation
H: The process
- Larger, polar molecules, especially glucuronide conjugates, are secreted into bile.
- In the gut, bacteria can remove the glucuronide, releasing the parent drug, which is reabsorbed.
- Recycling prolongs half-life and can produce a second peak in the concentration-time curve.
H: Clinical relevance
- Drugs undergoing recycling include mycophenolate and some hormones.
- Older advice that broad-spectrum antibiotics reduce the effectiveness of combined hormonal contraception by disrupting recycling is no longer supported, except for enzyme-inducing antibiotics such as rifampicin (FSRH guidance).
- Activated charcoal given repeatedly can interrupt recycling of some drugs in overdose, under specialist advice (TOXBASE).
K: Biliary excretion and bacterial deconjugation can recycle drugs, prolonging their action; only enzyme-inducing antibiotics affect hormonal contraception.
!: Advising extra contraception for every antibiotic course: current FSRH guidance limits this to enzyme inducers such as rifampicin.
Q: What is enterohepatic recycling? | Reabsorption of a drug from the gut after biliary excretion and bacterial deconjugation.
Q: Which antibiotics affect combined hormonal contraception? | Enzyme-inducing ones, such as rifampicin and rifabutin.
SUM: Biliary excretion and recycling can prolong drug action.
SUM: Only enzyme-inducing antibiotics need contraceptive precautions under current guidance.
SRC: Faculty of Sexual and Reproductive Healthcare, Drug interactions with hormonal contraception | guidance | 2022 | https://www.fsrh.org/
SRC: UK National Poisons Information Service, TOXBASE: multiple-dose activated charcoal | guidance | 2026 | https://www.toxbase.org/
M2#pharmacy-u03-10-q1@1: What can enterohepatic recycling cause on a concentration-time curve? | A second peak | No change | A faster decline | An instant peak | A flat line | Reabsorption after biliary excretion can produce a secondary peak.
M2#pharmacy-u03-10-q2@2: According to FSRH guidance, which antibiotic reduces the effectiveness of combined hormonal contraception? | Rifampicin | Amoxicillin | Doxycycline | Clarithromycin | Nitrofurantoin | Only enzyme-inducing antibiotics such as rifampicin have a clinically important effect.
M3#pharmacy-u03-10-q3@1: Why might repeated doses of activated charcoal help in some overdoses? | They interrupt enterohepatic recycling | They increase renal excretion | They neutralise stomach acid | They speed up absorption | They bind albumin | Charcoal in the gut binds drug excreted in bile, preventing reabsorption (specialist advice only).

## Clearance
S: Clearance measures the body's ability to eliminate a drug. It determines the maintenance dose needed to keep a steady concentration, and changes whenever kidney or liver function changes.
O: Define clearance and relate it to maintenance dosing
O: Explain how organ function and blood flow affect clearance
T: Clearance (CL) | The volume of plasma cleared of drug per unit time, such as litres per hour
T: Maintenance dose rate | The dose per unit time needed to maintain a target steady-state concentration: CL × Css ÷ F
H: Understanding clearance
- Clearance is a volume per time (L/h or mL/min), not an amount.
- Total clearance = renal clearance + hepatic clearance + any other routes.
- At steady state, rate in = rate out: dose rate × F = CL × Css.
- So the maintenance dose rate needed is CL × Css ÷ F: halve the clearance and you need half the dose for the same level.
H: What changes clearance
- **Renal clearance** tracks GFR (creatinine clearance estimates it).
- **Hepatic clearance** depends on blood flow and enzyme activity: high-extraction drugs (such as lidocaine and propranolol) depend on liver blood flow; low-extraction drugs depend on enzyme activity and protein binding.
- Interactions (enzyme inhibition and induction), age, heart failure (reduced blood flow) and genetics.
- Example: if creatinine clearance halves and a drug is cleared entirely by the kidneys, the maintenance dose for the same steady-state level also roughly halves (use the BNF or SPC dose in practice).
K: Maintenance dose rate = CL × Css ÷ F: when clearance falls, the maintenance dose must fall.
!: Keeping the same maintenance dose when kidney function declines, leading to accumulation.
Q: What are the units of clearance? | Volume per unit time, such as L/h or mL/min.
Q: What determines the hepatic clearance of a high-extraction drug? | Mainly liver blood flow.
SUM: Clearance determines the maintenance dose.
SUM: Organ function, blood flow and interactions change clearance.
SRC: Rowland M, Tozer TN, Clinical Pharmacokinetics and Pharmacodynamics, 5th edition, Wolters Kluwer | secondary | 2019
SRC: Winter ME, Basic Clinical Pharmacokinetics, Wolters Kluwer | secondary | 2010
M2#pharmacy-u03-11-q1@1: If clearance halves, what happens to the maintenance dose needed for the same level? | It halves | It doubles | It stays the same | It quarters | It must be stopped | Maintenance dose rate = CL × Css ÷ F, so the dose rate falls in proportion to clearance for the same target level.
M2#pharmacy-u03-11-q2@2: Heart failure reduces liver blood flow. Which drugs are most affected? | High hepatic extraction drugs | Drugs cleared only by the kidney | Topical drugs | Inhaled drugs only | Drugs given once only | Their clearance depends on hepatic blood flow.
M3#pharmacy-u03-11-q3@1: A drug's CL is 5 L/h and the target Css is 2 mg/L with F = 1. What dose rate is needed? | 10 mg/h | 2.5 mg/h | 7 mg/h | 0.4 mg/h | 20 mg/h | Dose rate = CL × Css ÷ F = 5 × 2 = 10 mg/h.

## Half-life and the elimination rate constant
S: Half-life is the time for a drug's concentration to halve. It decides how often a drug is given, how long it takes to reach steady state, and how long it lasts after stopping.
O: Define half-life and relate it to clearance and volume of distribution
O: Use half-life to plan dosing intervals and predict elimination
T: Half-life (t½) | The time taken for the plasma concentration to fall by half during elimination
T: Elimination rate constant (k) | The fraction of drug eliminated per unit time; k = 0.693 ÷ t½
H: What half-life depends on
- t½ = 0.693 × Vd ÷ CL: it's a consequence of both distribution and clearance.
- A drug can have a long half-life because it's cleared slowly or because it has a large Vd (amiodarone has both, giving a half-life of weeks).
H: Using half-life
- Dosing interval: drugs with short half-lives need frequent doses or modified-release forms.
- Steady state takes about 4 to 5 half-lives; so does near-complete elimination after stopping.
- After one half-life 50% remains; two, 25%; three, 12.5%; four, about 6%; five, about 3%.
- Half-life matters for switching drugs (washout periods) and for overdose duration.
- Example: a drug with a half-life of 6 hours has k = 0.693 ÷ 6 = 0.116 per hour, so about 11% of the drug in the body is eliminated each hour.
- Modified-release preparations let drugs with short half-lives be given once or twice daily.
K: t½ = 0.693 × Vd ÷ CL; about 4 to 5 half-lives to reach steady state, and to eliminate a drug after stopping.
!: Thinking a long half-life always means slow clearance: a large volume of distribution also lengthens it.
Q: How is half-life related to Vd and CL? | t½ = 0.693 × Vd ÷ CL.
Q: About what fraction remains after five half-lives? | About 3%.
SUM: Half-life depends on both Vd and clearance.
SUM: It guides dosing intervals, time to steady state and washout.
SRC: Rowland M, Tozer TN, Clinical Pharmacokinetics and Pharmacodynamics, 5th edition, Wolters Kluwer | secondary | 2019
M1#pharmacy-u03-12-q1@1: About how much of a drug remains after two half-lives? | 25% | 50% | 12.5% | 6% | 75% | Each half-life halves what remains: 100% → 50% after one, 25% after two.
M2#pharmacy-u03-12-q2@2: Why does amiodarone have a half-life of weeks? | It has a very large Vd and slow clearance | It is excreted quickly | It isn't metabolised | It is given intravenously | It has low protein binding | t½ rises with Vd and falls with clearance.
M2#pharmacy-u03-12-q3@1: A drug has t½ = 12 hours. About how long until it's largely eliminated after stopping? | About 2 to 2.5 days | About 12 hours | About 6 hours | About 1 week | About 1 month | About 4 to 5 half-lives are needed: 4 × 12 to 5 × 12 hours, which is 48 to 60 hours.

## Steady state and accumulation
S: With regular dosing, a drug accumulates until the amount eliminated each interval equals the amount given. This steady state is reached after about 4 to 5 half-lives, whatever the dose.
O: Explain how steady state is reached and what determines its level
O: Relate dosing interval to fluctuation between peaks and troughs
T: Steady state | The condition in which drug input equals elimination, so average concentrations stay constant
T: Peak and trough | The highest and lowest concentrations within a dosing interval
H: Reaching steady state
- The time to steady state depends only on half-life (about 4 to 5 half-lives), not on the dose or the interval.
- The average steady-state level depends on the dose rate and clearance (Css = F × dose rate ÷ CL).
- Doubling the dose doubles the steady-state level (for linear drugs) but doesn't change how long it takes to get there.
H: Fluctuation
- Giving smaller doses more often, or a modified-release form, reduces the swing between peak and trough.
- Trough levels are used for monitoring some drugs (for example vancomycin, some immunosuppressants), and timing of samples matters.
- After any dose change, wait about 4 to 5 half-lives before judging the new steady-state level.
- Accumulation is greatest when the dosing interval is short compared with the half-life.
K: Time to steady state depends on half-life; the level depends on dose rate and clearance. Recheck levels only once a new steady state is reached.
!: Measuring a level two days after changing the dose of a drug with a half-life of several days, before the new steady state.
Q: What determines the time to reach steady state? | The half-life (about 4 to 5 half-lives).
Q: What determines the average steady-state level? | The dose rate, bioavailability and clearance.
SUM: Steady state takes 4 to 5 half-lives regardless of dose.
SUM: The level reflects dose rate and clearance; fluctuation reflects the interval.
SRC: Rowland M, Tozer TN, Clinical Pharmacokinetics and Pharmacodynamics, 5th edition, Wolters Kluwer | secondary | 2019
M1#pharmacy-u03-13-q1@1: What decides how long a drug takes to reach steady state? | Its half-life | Its dose | The dosing interval | The tablet strength | The route only | Steady state takes about 4 to 5 half-lives.
M2#pharmacy-u03-13-q2@2: The dose of a linear drug is doubled. What happens at steady state? | The level doubles, reached in the same time | The level doubles, reached twice as fast | The level stays the same | The time to steady state halves | The level quadruples | Css rises in proportion to dose; time to steady state is unchanged.
M3#pharmacy-u03-13-q3@2: How does giving the same daily dose in more frequent smaller doses affect levels? | Less fluctuation between peak and trough | Higher average level | Faster time to steady state | Lower average level | No effect at all | Average level is unchanged; the swing is smaller.

## Loading and maintenance doses
S: A loading dose gets a drug to its effective concentration quickly; maintenance doses keep it there. Which one depends on volume of distribution and which on clearance decides how each is adjusted.
O: Calculate and explain loading and maintenance doses
O: Decide how each is affected by organ impairment
T: Loading dose | A larger initial dose to reach the target concentration quickly: target × Vd ÷ F
T: Maintenance dose | The regular dose that replaces what is eliminated: CL × target × interval ÷ F
H: When loading doses are used
- For drugs with long half-lives where waiting 4 to 5 half-lives for steady state is too slow: digoxin, amiodarone, some antibiotics and antiepileptics in acute settings.
- Loading dose = Ctarget × Vd ÷ F.
- Maintenance dose (per interval) = CL × Ctarget × τ ÷ F, where τ is the dosing interval.
H: Adjusting
- Loading doses depend on Vd, which renal impairment rarely changes: they usually stay the same.
- Maintenance doses depend on clearance: reduce them in renal or hepatic impairment as the BNF or SPC advises.
- Large loading doses may need splitting to reduce peak-related toxicity.
- Example: with Vd 50 L, target 10 mg/L and F 1, the loading dose is 500 mg; with CL 5 L/h, the maintenance dose rate is 50 mg/h (illustrative numbers).
- Check whether a loading dose is still appropriate if the person has already been taking the drug.
K: Loading dose depends on Vd; maintenance dose on clearance. In renal impairment, keep the loading dose and reduce the maintenance dose.
!: Halving the loading dose of a drug in renal impairment, delaying effective treatment.
Q: Which parameter determines the loading dose? | Volume of distribution.
Q: Which parameter determines the maintenance dose? | Clearance.
SUM: Loading doses fill the volume of distribution; maintenance replaces what's cleared.
SUM: Organ impairment usually changes maintenance, not loading, doses.
SRC: Winter ME, Basic Clinical Pharmacokinetics, Wolters Kluwer | secondary | 2010
SRC: Joint Formulary Committee, British National Formulary: digoxin | guidance | 2026 | https://bnf.nice.org.uk/
M2#pharmacy-u03-14-q1@1: A drug has Vd 400 L, target 1.5 micrograms/L and F 1. What loading dose? | 600 micrograms | 267 micrograms | 60 micrograms | 1,500 micrograms | 6,000 micrograms | Loading dose = 1.5 × 400 = 600 micrograms (illustrative).
M2#pharmacy-u03-14-q2@2: In renal impairment, which dose usually needs reducing? | The maintenance dose | The loading dose | Both equally | Neither | Only the first dose | Clearance falls, so maintenance doses fall; Vd is usually unchanged.
M2#pharmacy-u03-14-q3@1: Why is a loading dose used for a drug with a long half-life? | To reach effective levels without waiting 4 to 5 half-lives | To reduce side effects | To shorten its half-life | To increase clearance | To avoid monitoring | Without loading, steady state could take days or weeks.

## Linear and non-linear kinetics
S: For most drugs, concentration rises in proportion to dose (linear, first-order kinetics). For a few, elimination saturates and small dose increases cause large rises in level. Phenytoin is the classic example.
O: Distinguish first-order and zero-order (saturable) elimination
O: Explain the clinical risks of non-linear kinetics
T: First-order kinetics | Elimination of a constant fraction of drug per unit time, so levels rise in proportion to dose
T: Zero-order (saturable) kinetics | Elimination of a constant amount per unit time once enzymes are saturated
H: Linear (first-order)
- A constant fraction is eliminated per unit time; half-life is constant.
- Doubling the dose doubles the steady-state level.
H: Non-linear (saturable)
- When enzymes or transporters saturate, elimination approaches a maximum rate (Michaelis-Menten kinetics).
- Above saturation, a small dose increase can cause a disproportionate rise in level, and half-life lengthens as levels rise.
- Examples: **phenytoin** (within its therapeutic range), **alcohol** (zero order at most intakes), and high-dose **aspirin**.
- Phenytoin dose changes should be small and followed by levels once a new steady state is reached, which takes longer at higher levels.
- At low levels, saturable drugs behave almost linearly; the problem appears as levels approach the enzyme's capacity.
K: Most drugs follow linear kinetics; phenytoin saturates in its therapeutic range, so small dose increases can cause toxicity.
!: Increasing phenytoin by a large step because the level is slightly low, causing toxicity.
Q: What is zero-order elimination? | Removal of a constant amount per unit time, because elimination is saturated.
Q: Name a drug with saturable kinetics in its therapeutic range. | Phenytoin.
SUM: Linear kinetics: level proportional to dose.
SUM: Saturable kinetics: small dose changes, big level changes.
SRC: Winter ME, Basic Clinical Pharmacokinetics, Wolters Kluwer | secondary | 2010
SRC: Joint Formulary Committee, British National Formulary: phenytoin | guidance | 2026 | https://bnf.nice.org.uk/
M1#pharmacy-u03-15-q1@1: Which drug shows saturable (Michaelis-Menten) kinetics at usual doses? | Phenytoin | Amoxicillin | Gentamicin | Metformin | Atenolol | Phenytoin metabolism saturates within the therapeutic range.
M2#pharmacy-u03-15-q2@2: How should a phenytoin dose be increased when the level is low? | In small steps, then recheck at steady state | Doubled at once | By the same percentage as the level is low | Not at all | Switched to a loading dose daily | Non-linear kinetics make large increases dangerous.
M3#pharmacy-u03-15-q3@1: What happens to phenytoin's half-life as its level rises? | It lengthens | It shortens | It stays constant | It becomes zero | It equals the dosing interval | With saturation, elimination slows relative to concentration, lengthening half-life.

## Compartment models
S: Pharmacokinetic models describe the body as one or more compartments. They explain why some drug levels fall in two phases and why the timing of blood samples matters for drugs like digoxin.
O: Describe one- and two-compartment models
O: Explain the distribution phase and its importance for sampling
T: One-compartment model | A model in which the drug distributes instantly through one uniform space and declines in a single exponential phase
T: Distribution phase | The early fall in plasma concentration as drug moves from blood into tissues
H: The models
- **One compartment**: the drug distributes instantly; concentration falls in one straight line on a log scale.
- **Two compartments**: a central compartment (blood and well-perfused organs) and a peripheral one (less perfused tissues). After a dose, there's a rapid fall as the drug distributes (alpha phase), then a slower elimination phase (beta phase).
H: Why it matters
- Drugs whose effect is in tissues reach their target only after distribution. A level taken during distribution overestimates the tissue level.
- **Digoxin**: take levels at least 6 hours after a dose, when distribution is complete.
- Rapid IV injection of some drugs can cause high early levels in the heart or brain before distribution (one reason some drugs must be given slowly).
- Most clinical calculations use a one-compartment approximation, which works well for many drugs once distribution is complete.
K: Two-compartment drugs fall in two phases; sample after distribution (for digoxin, at least 6 hours post-dose).
!: Measuring a digoxin level 2 hours after the dose and reducing the dose because it looks high.
Q: When should a digoxin level be taken? | At least 6 hours after the dose.
Q: What is the alpha phase? | The early, rapid fall as the drug distributes into tissues.
SUM: Compartment models explain multi-phase concentration curves.
SUM: Sample after distribution to reflect tissue levels.
SRC: Rowland M, Tozer TN, Clinical Pharmacokinetics and Pharmacodynamics, 5th edition, Wolters Kluwer | secondary | 2019
SRC: Joint Formulary Committee, British National Formulary: digoxin | guidance | 2026 | https://bnf.nice.org.uk/
M2#pharmacy-u03-16-q1@1: When should a digoxin level be taken? | At least 6 hours after the dose | 1 hour after the dose | Just before the dose only if toxic | At any time | Immediately after an IV dose | Earlier samples reflect the distribution phase, not tissue levels.
M2#pharmacy-u03-16-q2@2: In a two-compartment model, what causes the early rapid fall? | Distribution into tissues | Rapid renal excretion | Metabolism in the gut | Protein binding stopping | Biliary excretion | The alpha phase reflects movement into peripheral tissues.
M1#pharmacy-u03-16-q3@1: In a one-compartment model, how does concentration fall on a log scale? | As a single straight line | In two phases | As a curve that rises again | It stays constant | In steps | A single exponential appears linear on a log scale.

## Therapeutic drug monitoring
S: For some drugs, measuring blood levels guides dosing because the effective and toxic levels are close or response is hard to judge. Interpreting a level needs the timing, the dose history and the clinical picture.
O: Identify drugs that need therapeutic drug monitoring and why
O: Interpret drug levels in context
T: Therapeutic drug monitoring (TDM) | Measuring drug concentrations to individualise dosing
T: Target range | The concentration range associated with effect and acceptable toxicity in most people
H: Which drugs and why
- Narrow therapeutic index and variable pharmacokinetics: digoxin, lithium, phenytoin, aminoglycosides (gentamicin), vancomycin, theophylline, ciclosporin and tacrolimus, and some antiepileptics in specific situations.
- TDM isn't useful when effect can be measured directly (blood pressure, INR for warfarin, glucose).
H: Interpreting a level
- **Timing**: trough, peak or a set time after the dose (lithium about 12 hours after the dose; digoxin at least 6 hours).
- **Steady state**: is the person at steady state after the last dose change?
- **Adherence and dose history**: was the dose taken as prescribed?
- **Patient factors**: renal function, albumin (phenytoin), interacting drugs, symptoms of toxicity.
- Treat the patient, not the number: a level within range with toxic symptoms still needs action.
- Target ranges vary by indication and laboratory: use local guidance, the BNF and the SPC.
K: Monitor narrow-margin drugs, and interpret every level with its timing, steady state, adherence, organ function and symptoms.
!: Acting on a lithium level without knowing when the last dose was taken.
Q: When is a lithium level usually taken? | About 12 hours after the dose.
Q: Why isn't TDM used for warfarin? | Its effect is measured directly with the INR.
SUM: TDM individualises dosing for narrow-margin drugs.
SUM: Interpret levels with timing, steady state and the clinical picture.
SRC: NICE CG185, Bipolar disorder: assessment and management (lithium monitoring) | guidance | 2014 | https://www.nice.org.uk/guidance/cg185
SRC: Joint Formulary Committee, British National Formulary: therapeutic drug monitoring | guidance | 2026 | https://bnf.nice.org.uk/
M1#pharmacy-u03-17-q1@1: Which drug commonly needs therapeutic drug monitoring? | Lithium | Amoxicillin | Paracetamol at usual doses | Omeprazole | Cetirizine | Lithium has a narrow therapeutic index and variable clearance, so levels guide dosing.
M2#pharmacy-u03-17-q2@2: A digoxin level is in range but the patient has nausea and visual disturbance. What's right? | Treat as possible toxicity and review | Ignore the symptoms, as the level is normal | Increase the dose | Repeat the level next month | Stop all monitoring | Clinical toxicity matters even with an in-range level.
M3#pharmacy-u03-17-q3@2: What is essential to interpret a lithium level? | The time since the last dose | The patient's height | The tablet colour | The pharmacy's stock level | The day of the week | Levels depend on sampling time; about 12 hours post-dose is standard.

## Pharmacokinetics in renal impairment
S: Kidney disease reduces the elimination of renally cleared drugs and their active metabolites, and can change absorption, distribution and protein binding. Many dosing decisions in practice turn on renal function.
O: Explain how renal impairment changes pharmacokinetics
O: Apply principles for dosing in renal impairment
T: Chronic kidney disease (CKD) | Long-term reduction in kidney function, staged by eGFR and albuminuria
T: Nephrotoxic drug | A drug that can damage the kidneys, such as aminoglycosides and NSAIDs
H: What changes
- **Elimination**: renally excreted drugs and active metabolites accumulate (gentamicin, lithium, morphine-6-glucuronide, DOACs, metformin, gabapentin).
- **Distribution and binding**: uraemia reduces binding of some acidic drugs; fluid overload changes Vd.
- **Sensitivity**: some drugs have greater effects (for example sedatives).
H: Principles
- Estimate renal function appropriately (Cockcroft-Gault creatinine clearance where the BNF or SPC uses it, and for DOACs; School 6).
- Keep loading doses; reduce maintenance doses or extend intervals per the BNF or SPC.
- Avoid nephrotoxic drugs where possible; review "sick day" rules for drugs to pause during dehydrating illness (such as metformin, ACE inhibitors, diuretics, NSAIDs and SGLT2 inhibitors), following local guidance.
- Recheck renal function when the person's condition changes.
K: Renal impairment causes accumulation of renally cleared drugs and metabolites: adjust maintenance doses, avoid nephrotoxins and use sick day guidance.
!: Choosing morphine for pain in severe renal impairment without considering metabolite accumulation.
Q: Name three drugs that accumulate in renal impairment. | For example gentamicin, lithium and metformin.
Q: What are sick day rules? | Advice to pause certain medicines during dehydrating illness to protect the kidneys.
SUM: Renal impairment reduces elimination and changes sensitivity.
SUM: Adjust doses, avoid nephrotoxins and give sick day advice.
SRC: NICE NG203, Chronic kidney disease: assessment and management | guidance | 2021 | https://www.nice.org.uk/guidance/ng203
SRC: Joint Formulary Committee, British National Formulary: prescribing in renal impairment | guidance | 2026 | https://bnf.nice.org.uk/
M2#pharmacy-u03-18-q1@1: Which drug's active metabolite accumulates in renal impairment? | Morphine | Fentanyl | Paracetamol | Salbutamol | Omeprazole | Morphine-6-glucuronide is renally cleared.
M2#pharmacy-u03-18-q2@2: Which medicines are commonly included in sick day guidance? | Metformin, ACE inhibitors and diuretics | Paracetamol and emollients | Inhaled steroids and spacers | Vitamin D and calcium | Antihistamines | These can worsen kidney injury or cause harm during dehydration.
M2#pharmacy-u03-18-q3@1: Which is a nephrotoxic drug? | Gentamicin | Paracetamol at usual doses | Cetirizine | Levothyroxine | Simvastatin | Aminoglycosides can damage the kidney, especially with high or prolonged exposure.

## Pharmacokinetics in hepatic impairment
S: Liver disease can reduce drug metabolism, change protein binding and increase sensitivity to some drugs. Unlike kidney function, there's no single test that predicts how to adjust doses.
O: Explain how liver disease alters pharmacokinetics and drug sensitivity
O: Apply cautious prescribing principles in hepatic impairment
T: Child-Pugh score | A clinical score of liver disease severity used in some dosing guidance
T: Hepatic encephalopathy | Brain dysfunction caused by liver failure, which sedatives and constipation can precipitate
H: What changes
- **Metabolism**: reduced enzyme activity and blood flow; portosystemic shunting raises the bioavailability of high first-pass drugs.
- **Protein binding**: low albumin increases free fractions.
- **Coagulation**: impaired clotting factor production increases bleeding risk with anticoagulants and antiplatelets.
- **Sensitivity**: sedatives and opioids can precipitate encephalopathy; fluid retention increases with NSAIDs and some other drugs.
H: Principles
- No marker equivalent to creatinine clearance: use clinical severity (such as the Child-Pugh score), the BNF's hepatic impairment advice and the SPC.
- Start low, go slow; avoid hepatotoxic drugs; avoid or minimise sedatives; prevent constipation in people at risk of encephalopathy.
- Monitor liver function and clinical effects.
K: Liver disease reduces metabolism, raises free drug and increases sensitivity; there's no simple test, so use the BNF, clinical severity and caution.
!: Prescribing a benzodiazepine for agitation in decompensated liver disease, risking encephalopathy.
Q: Why does liver disease increase bleeding risk? | Reduced production of clotting factors.
Q: Name a score used for liver disease severity. | The Child-Pugh score.
SUM: Liver disease reduces metabolism and increases drug sensitivity.
SUM: Use the BNF, clinical severity and cautious dosing.
SRC: Joint Formulary Committee, British National Formulary: prescribing in hepatic impairment | guidance | 2026 | https://bnf.nice.org.uk/
SRC: NICE NG50, Cirrhosis in over 16s: assessment and management | guidance | 2016 | https://www.nice.org.uk/guidance/ng50
M1#pharmacy-u03-19-q1@2: Which drug class can precipitate hepatic encephalopathy? | Sedatives such as benzodiazepines | Laxatives such as lactulose | Inhaled bronchodilators | Topical emollients | Vitamin supplements | Sedatives and opioids can precipitate encephalopathy.
M2#pharmacy-u03-19-q2@1: Why is there no simple dose formula in liver disease? | No single test measures metabolic capacity | Liver disease never affects drugs | All drugs are renally cleared | The liver regenerates instantly | The Child-Pugh score is a blood test | Liver function tests don't predict drug clearance reliably.
M2#pharmacy-u03-19-q3@2: How does portosystemic shunting affect high first-pass drugs? | Raises their bioavailability | Lowers their absorption | Increases their renal excretion | Has no effect | Makes them inactive | Blood bypasses the liver, so less drug is removed on the first pass.

## Biopharmaceutics and dissolution
S: Biopharmaceutics links a formulation's physical properties to how the drug is absorbed. Dissolution is often the slowest step for poorly soluble drugs, so formulation can decide bioavailability.
O: Explain the role of dissolution in drug absorption
O: Apply the Noyes-Whitney equation and the Biopharmaceutics Classification System
T: Dissolution | The process by which a solid drug dissolves in a solvent, such as gastrointestinal fluid
T: Biopharmaceutics Classification System (BCS) | A system classifying drugs by solubility and permeability into four classes
H: Dissolution
- A drug must be in solution to be absorbed.
- The **Noyes-Whitney equation**: dissolution rate is proportional to surface area and the difference between saturated solubility and the concentration in solution, and inversely proportional to the diffusion layer thickness.
- So reducing particle size (increasing surface area), using salts or more soluble forms, and improving wetting increase dissolution.
H: The BCS
- **Class I**: high solubility, high permeability: absorption usually good.
- **Class II**: low solubility, high permeability: dissolution limits absorption, so formulation matters most.
- **Class III**: high solubility, low permeability: permeability limits absorption.
- **Class IV**: low solubility, low permeability: absorption difficult.
- Dissolution testing is used in quality control and, for some products, to support bioequivalence.
K: For poorly soluble drugs, dissolution limits absorption; surface area, solubility and wetting control dissolution (Noyes-Whitney).
!: Assuming two tablets of the same drug dose behave identically: formulation can change dissolution and absorption.
Q: Name two ways to increase dissolution rate. | For example reducing particle size and using a more soluble salt.
Q: Which BCS class is most affected by formulation? | Class II (low solubility, high permeability).
SUM: Dissolution often limits absorption of poorly soluble drugs.
SUM: The BCS predicts which drugs are sensitive to formulation.
SRC: Aulton ME, Taylor KMG (editors), Aulton's Pharmaceutics, 6th edition, Elsevier | secondary | 2021
SRC: Amidon GL and others, A theoretical basis for a biopharmaceutic drug classification, Pharmaceutical Research 12: 413–420 | primary | 1995
M2#pharmacy-u03-20-q1@1: According to Noyes-Whitney, what increases dissolution rate? | Increasing surface area | Increasing the diffusion layer thickness | Reducing solubility | Larger particles | Lower temperature | In the Noyes-Whitney equation, dissolution rate is proportional to the surface area available.
M2#pharmacy-u03-20-q2@2: For a BCS class II drug, what mainly limits absorption? | Dissolution | Permeability | First-pass metabolism | Renal excretion | Protein binding | Low solubility makes dissolution rate-limiting.
M1#pharmacy-u03-20-q3@1: Why must a drug dissolve before absorption? | Only dissolved drug can cross the gut wall | Solid drug is absorbed faster | Dissolution destroys drugs | Absorption happens before dissolution | It doesn't need to | Only molecules in solution can cross the gut wall, so dissolution must come first.

## Bioequivalence
S: Generic medicines are licensed when they're shown to be bioequivalent to the reference product. For most drugs, switching brands is safe; for a few narrow therapeutic index drugs, consistent supply of one product is recommended.
O: Define bioequivalence and how it is demonstrated
O: Identify medicines where brand or product consistency matters
T: Bioequivalence | Similar rate and extent of absorption of two products, so they can be expected to have the same effects
T: Generic medicine | A medicine with the same active substance, strength and form as a reference product, shown to be bioequivalent
H: Showing bioequivalence
- Studies compare AUC (extent) and Cmax (rate) of the test and reference products, usually in healthy volunteers.
- The 90% confidence interval for the ratio of means must lie within 80% to 125% (narrower limits may apply for narrow therapeutic index drugs).
- Bioequivalent generics are interchangeable for most medicines, saving the NHS large sums.
H: When to keep the same product
- **Antiepileptics**: the MHRA classifies them into categories; for category 1 drugs (such as phenytoin, carbamazepine, phenobarbital and primidone) people should be kept on a specific manufacturer's product.
- **Ciclosporin, tacrolimus and lithium**: prescribe and supply by brand.
- Some modified-release products (for example some nifedipine and theophylline preparations) and inhalers aren't interchangeable: prescribe by brand.
- Biological medicines are prescribed by brand (School 2).
K: Generics are bioequivalent (90% CI for AUC and Cmax within 80 to 125%); keep product consistency for category 1 antiepileptics, ciclosporin, tacrolimus, lithium and some modified-release products.
!: Switching a person stable on a category 1 antiepileptic between manufacturers' products without considering the risk.
Q: What are the usual bioequivalence limits? | The 90% confidence interval of the AUC and Cmax ratios within 80 to 125%.
Q: Name two drugs that should be prescribed by brand. | For example ciclosporin and tacrolimus (also lithium).
SUM: Generics are licensed on bioequivalence and are usually interchangeable.
SUM: Some narrow-margin drugs need product consistency.
SRC: MHRA, Drug Safety Update: antiepileptic drugs, updated advice on switching between different manufacturers' products | guidance | 2017-11 | https://www.gov.uk/drug-safety-update
SRC: European Medicines Agency, Guideline on the investigation of bioequivalence | guidance | 2010 | https://www.ema.europa.eu/
M1#pharmacy-u03-21-q1@2: Which drug should be prescribed and supplied by brand? | Tacrolimus | Amoxicillin | Paracetamol | Simvastatin | Omeprazole | Tacrolimus formulations differ and switching can change levels.
M2#pharmacy-u03-21-q2@1: Which parameters are compared in a bioequivalence study? | AUC and Cmax | Half-life and Vd | Clearance and dose | Tablet weight and colour | Price and pack size | AUC reflects extent, Cmax rate, of absorption.
M3#pharmacy-u03-21-q3@2: A person stable on carbamazepine is offered a different manufacturer's product. What applies? | MHRA advises keeping category 1 antiepileptics on the same product | Switching is always fine | Switch only if cheaper | Stop carbamazepine during the switch | Halve the dose when switching | Category 1 antiepileptics should be kept on one manufacturer's product.
`;
