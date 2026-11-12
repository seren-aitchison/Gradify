// School 4: Pharmacology and Medicines Management. UK, as at 2026.
// Format: kit/course/notes.js. Standard: docs/CURRICULUM_CONTENT_STANDARD.md
// EDUCATION ONLY. Every example and calculation here is illustrative. Medicines are given only against a
// valid prescription or other legal authority, after the required checks, within your competence, under
// supervision where required and in line with your organisation's policies. Always check the BNF.
export default `
## Principles of pharmacology
S: Pharmacology is the study of how medicines interact with the body. Nurses need it to give medicines safely, monitor their effects, recognise harm and explain treatment to the people they care for.
O: Define key pharmacology terms and reliable information sources
O: Explain why nurses need pharmacology knowledge before giving medicines
T: Pharmacology | The study of how medicines interact with the body
T: BNF | The British National Formulary, the standard UK reference on medicines
SUM: Nurses need pharmacology to give medicines safely, monitor effects and explain treatment.
SUM: Use the BNF, SPC and pharmacists; look up or ask before giving an unfamiliar medicine.
SRC: Joint Formulary Committee, British National Formulary | guidance | 2026 | https://bnf.nice.org.uk/
SRC: Royal Pharmaceutical Society and Royal College of Nursing, Professional guidance on the administration of medicines in healthcare settings | guidance | 2019 | https://www.rpharms.com/
H: Key terms
- **Drug or medicine**: a substance used to prevent, diagnose or treat disease or alter body function.
- **Generic name** (approved name, used in prescribing, for example *amoxicillin*) and **brand name**.
- **Pharmacokinetics**: what the body does to the drug (absorption, distribution, metabolism, excretion).
- **Pharmacodynamics**: what the drug does to the body (mechanisms and effects).
- **Indication**, **contraindication**, **caution**, **side effect**, **adverse drug reaction**, **interaction**.
- **Therapeutic index**: the margin between an effective dose and a toxic one.
H: Sources of information
- The **British National Formulary (BNF)** and **BNF for Children**: indications, doses, cautions, interactions and monitoring.
- The **Summary of Product Characteristics (SmPC)** and patient information leaflet.
- Local formularies, pharmacists and medicines information services.
H: Why nurses need pharmacology
- To check that a prescribed medicine is appropriate for this person (allergies, interactions, kidney function, pregnancy).
- To give it by the right route at the right time and monitor for the expected effect and adverse effects.
- To educate people and support adherence.
K: If you don't know what a medicine is for, how it works, its usual dose and what to monitor, look it up or ask before giving it.
Q: What is the difference between pharmacokinetics and pharmacodynamics? | Pharmacokinetics is what the body does to the drug (ADME); pharmacodynamics is what the drug does to the body.
Q: What does a narrow therapeutic index mean? | The effective dose is close to the toxic dose, so small changes can cause harm and monitoring is often needed.
M1#nursing-u04-01-q1@1: Which reference gives UK doses, cautions and interactions? | The British National Formulary (BNF) | The NMC Code | The Mental Capacity Act Code | The Caldicott Principles | NEWS2 chart | The BNF is the standard UK prescribing reference.
M2#nursing-u04-01-q2@2: A nurse is asked to give a medicine they've never heard of. What should they do first? | Look it up or ask a pharmacist first | Give it, since it has been prescribed | Ask the patient what it's for, then give it | Skip it and document "not given" | Ask a student nurse to give it instead | Nurses must understand what they administer.

## Pharmacokinetics
S: Pharmacokinetics describes how a drug moves through the body over time: absorption, distribution, metabolism and excretion (ADME). It explains dose timing, routes, interactions and why some people need different doses.
O: Describe the four stages of pharmacokinetics
O: Explain how half-life, steady state and patient factors affect dosing
T: Pharmacokinetics | How a drug moves through the body: absorption, distribution, metabolism and excretion
T: Half-life | The time for the plasma concentration of a drug to fall by half
SUM: Pharmacokinetics explains dose timing, routes and individual variation.
SUM: Renally cleared drugs may need dose changes when kidney function falls.
SAFE: If kidney or liver function has changed, or a person shows signs of toxicity, withhold if unsafe and query the dose with the prescriber or pharmacist before giving it.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
SRC: Joint Formulary Committee, British National Formulary: prescribing in renal impairment | guidance | 2026 | https://bnf.nice.org.uk/
H: Key concepts
- **Bioavailability**: the proportion of a dose reaching the systemic circulation unchanged. Intravenous medicines have 100% bioavailability; oral medicines are usually lower because of incomplete absorption and **first-pass metabolism** in the liver.
- **Half-life (t½)**: the time for the plasma concentration to fall by half. It determines dosing intervals.
- **Steady state**: reached after about 4–5 half-lives of regular dosing; loading doses are used to reach effective levels sooner (for example, some antiarrhythmics and anticonvulsants).
- **Clearance**: the rate the body removes the drug, mainly by the liver and kidneys.
- **Therapeutic drug monitoring**: measuring blood levels for drugs with narrow therapeutic indices, such as gentamicin, vancomycin, lithium, digoxin and phenytoin.
H: Factors that change pharmacokinetics
- Age (neonates and older people), body weight and composition, pregnancy.
- Kidney and liver disease.
- Interactions with other medicines and foods.
- Genetics (for example, variation in liver enzymes).
- Critical illness, dehydration and low albumin.
K: Doses of renally cleared medicines often need adjusting when kidney function falls. Check kidney function before giving them.
Q: What is first-pass metabolism? | Metabolism of an orally absorbed drug in the gut wall and liver before it reaches the systemic circulation, reducing bioavailability.
Q: How long does it take to reach steady state? | About 4–5 half-lives of regular dosing.
M1#nursing-u04-02-q1@1: What is the bioavailability of an intravenous dose? | 100% | 50% | 0% | 75% | It depends on food | IV medicines enter the circulation directly.
M2#nursing-u04-02-q2@2: A patient on gentamicin has a rising creatinine. What is the main concern? | Possible accumulation: check levels, tell prescriber | The drug will now work faster than usual | No concern, as kidneys don't affect gentamicin | The dose should be increased to compensate | The patient should drink less fluid today | Gentamicin is renally cleared and nephrotoxic, with a narrow therapeutic index.

## Pharmacodynamics
S: Pharmacodynamics is how drugs produce their effects: the targets they act on, how strongly they act and how the response relates to the dose.
O: Describe drug targets and the dose-response relationship
O: Use a drug's mechanism to predict effects and side effects
T: Agonist | A drug that binds a receptor and activates it
T: Therapeutic index | The ratio between toxic and effective doses
SUM: Drugs act on receptors, enzymes, ion channels and transporters.
SUM: Narrow therapeutic index drugs need careful monitoring.
SAFE: For narrow therapeutic index drugs such as digoxin, lithium and gentamicin, check the levels and monitoring the prescriber has asked for, and report signs of toxicity to the prescriber.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
H: Drug targets
- **Receptors**: proteins that drugs bind to. **Agonists** activate receptors (for example, salbutamol at beta-2 receptors); **antagonists** block them (for example, propranolol at beta receptors); **partial agonists** produce a smaller maximal effect (for example, buprenorphine at opioid receptors).
- **Enzymes**: drugs can inhibit them (for example, ACE inhibitors; NSAIDs inhibit cyclo-oxygenase).
- **Ion channels**: for example, calcium channel blockers; local anaesthetics block sodium channels.
- **Transporters**: for example, SSRIs block serotonin reuptake; loop diuretics block a transporter in the kidney.
H: Dose and response
- **Potency**: how much drug is needed for an effect.
- **Efficacy**: the maximum effect a drug can produce.
- **Tolerance**: a reduced response with repeated use (for example, opioids, nitrates).
- **Dependence**: physical or psychological need, with withdrawal effects on stopping.
H: Selectivity
P: Few drugs act only where intended. Beta-blockers that act on beta-1 receptors in the heart can also block beta-2 receptors in the airways, causing bronchospasm in some people with asthma. Understanding selectivity explains many side effects.
K: Knowing a drug's mechanism lets you predict its main effects, its side effects and its interactions.
Q: What is an antagonist? | A drug that binds to a receptor and blocks it without activating it.
Q: What is the difference between potency and efficacy? | Potency is how much drug is needed for an effect; efficacy is the maximum effect it can produce.
M1#nursing-u04-03-q1@1: Salbutamol relieves bronchospasm by acting as which kind of drug at beta-2 receptors? | An agonist | An antagonist | An enzyme inhibitor | A partial antagonist | An ion channel blocker | Salbutamol stimulates beta-2 receptors, relaxing airway smooth muscle.
M2#nursing-u04-03-q2@2: Why might a non-selective beta-blocker be dangerous for someone with asthma? | It may block beta-2 receptors, causing bronchospasm | It increases the heart rate dangerously | It causes high blood sugar in asthma | It dilates the airways too much | It blocks histamine and causes wheeze | Non-selective beta-blockers also block beta-2 receptors in the airways, which can trigger bronchospasm in people with asthma.

## Absorption
S: Absorption is the movement of a drug from where it is given into the bloodstream. It determines how quickly and how much of a drug takes effect.
O: Explain how route and formulation affect absorption
O: Apply rules for crushing tablets and using patches safely
T: Bioavailability | The proportion of a dose that reaches the systemic circulation
T: First-pass metabolism | Metabolism of a drug in the gut wall and liver before it reaches the circulation
SUM: Route, formulation, food and gut function affect absorption.
SUM: Don't crush modified-release or enteric-coated tablets without pharmacist advice.
SRC: Specialist Pharmacy Service, Using medicines in people with swallowing difficulties | guidance | 2023 | https://www.sps.nhs.uk/
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
H: Routes and absorption
- **Oral**: absorbed mainly in the small intestine; slower and less predictable; subject to first-pass metabolism.
- **Sublingual and buccal**: absorbed through the mouth's lining, avoiding first-pass metabolism (for example, glyceryl trinitrate spray or tablets).
- **Rectal**: useful when oral is impossible.
- **Transdermal**: slow, steady absorption through the skin (patches).
- **Inhaled**: rapid local action in the lungs.
- **Subcutaneous and intramuscular**: absorption depends on blood flow; IM is faster than SC.
- **Intravenous**: no absorption phase; immediate effect.
H: Factors affecting absorption
- Food (some medicines must be taken with food, others on an empty stomach, for example levothyroxine).
- Gut motility, vomiting, diarrhoea, and gut surgery.
- Formulation: **modified-release** preparations release the drug slowly; crushing them can cause a dangerous dose dump.
- Interactions: for example, antacids or calcium reduce absorption of some antibiotics (tetracyclines, ciprofloxacin) and levothyroxine.
- Poor perfusion (shock) reduces absorption from IM and SC sites.
H: Patches
P: Heat over a transdermal patch (a hot water bottle, fever, a hot bath) increases absorption and can cause toxicity, especially with opioid patches such as fentanyl. Check patches during skin checks, remove old patches and record sites.
K: Never crush or split modified-release or enteric-coated tablets unless a pharmacist confirms it's safe.
Q: Why are sublingual medicines fast-acting? | They are absorbed through the mouth's lining directly into the circulation, avoiding first-pass metabolism.
Q: Why must modified-release tablets not be crushed? | Crushing can release the whole dose at once (dose dumping), causing toxicity.
M1#nursing-u04-04-q1@1: Which route avoids absorption entirely? | Intravenous | Oral | Intramuscular | Transdermal | Rectal | IV medicines go straight into the circulation.
M2#nursing-u04-04-q2@2: A patient with a fentanyl patch develops a fever of 39°C and becomes drowsy. What should the nurse consider? | Heat may raise absorption: assess and escalate | The patch has stopped working in the heat | The fever is unrelated to the fentanyl patch | A second patch should be applied for cover | A hot water bottle will help the patch work | Fever or external heat increases blood flow to the skin and speeds absorption from the patch, which can cause opioid toxicity; escalate and assess sedation and breathing.

## Distribution
S: Distribution is the movement of a drug from the bloodstream into tissues. It affects how much drug reaches its target, how long it stays and how it should be dosed.
O: Describe factors affecting drug distribution
O: Apply distribution principles to special populations
T: Volume of distribution | A measure of how widely a drug spreads into body tissues
T: Protein binding | The attachment of a drug to plasma proteins such as albumin
SUM: Blood flow, protein binding, fat and barriers affect distribution.
SUM: Low albumin can increase free drug and toxicity.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
H: Key factors
- **Blood flow**: well-perfused organs (heart, liver, kidneys, brain) receive drug quickly.
- **Plasma protein binding**: many drugs bind to albumin; only the unbound (free) fraction is active. Low albumin (malnutrition, liver disease, critical illness) increases the free fraction of highly bound drugs such as phenytoin.
- **Lipid solubility**: fat-soluble drugs cross membranes and enter fat and the brain more readily.
- **Barriers**: the blood-brain barrier limits entry of many drugs to the brain; the placenta allows many drugs to reach the fetus; many drugs pass into breast milk.
- **Volume of distribution**: a theoretical measure of how widely a drug spreads into tissues.
H: Special populations
- **Older people**: more body fat and less body water: fat-soluble drugs (such as some benzodiazepines) last longer.
- **Pregnancy and breastfeeding**: check suitability in the BNF and with a pharmacist.
- **Obesity**: some doses are based on ideal or adjusted body weight.
K: A normal total blood level can hide toxicity if albumin is low and the drug is highly protein-bound.
Q: Which fraction of a protein-bound drug is active? | The unbound (free) fraction.
Q: Why might benzodiazepines last longer in older people? | Increased body fat stores the fat-soluble drug, prolonging its effect, and clearance may also be reduced.
M1#nursing-u04-05-q1@1: Which barrier limits many drugs from entering the brain? | The blood-brain barrier | The placenta | The skin | The gut wall | The glomerulus | The blood-brain barrier restricts entry to the central nervous system.
M2#nursing-u04-05-q2@2: A malnourished patient with low albumin is on phenytoin. Their total phenytoin level is in range, but they are unsteady with nystagmus. What is the best explanation? | Raised free fraction from low albumin | The phenytoin level is far too low | The symptoms are unrelated to phenytoin | Phenytoin isn't bound to plasma proteins | The patient is simply dehydrated | Low albumin raises free phenytoin; levels need interpreting with albumin.

## Metabolism
S: Metabolism (biotransformation) chemically changes drugs, mainly in the liver, usually making them easier to excrete. It can inactivate drugs, activate prodrugs or produce toxic metabolites.
O: Describe the role of the liver and enzymes in drug metabolism
O: Recognise interactions caused by enzyme inducers and inhibitors
T: Enzyme inducer | A substance that increases drug-metabolising enzyme activity
T: Prodrug | An inactive drug converted into an active form by metabolism
SUM: Metabolism happens mainly in the liver, often via cytochrome P450 enzymes.
SUM: Inducers and inhibitors change drug levels; check before starting new medicines.
SRC: Joint Formulary Committee, British National Formulary: interactions | guidance | 2026 | https://bnf.nice.org.uk/interactions/
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
H: The liver and enzymes
- **Phase 1** reactions (oxidation, reduction, hydrolysis), largely by the **cytochrome P450** (CYP) enzymes.
- **Phase 2** reactions (conjugation) make molecules more water-soluble.
- **Prodrugs** are activated by metabolism (for example, codeine is converted to morphine; clopidogrel to its active form).
H: Changes in metabolism
- **Enzyme inducers** speed up metabolism of other drugs, reducing their effect: for example, rifampicin, carbamazepine, phenytoin and St John's wort.
- **Enzyme inhibitors** slow metabolism, increasing levels and toxicity: for example, clarithromycin, fluconazole and grapefruit juice.
- **Genetic variation**: some people are "ultra-rapid metabolisers" of codeine, producing high morphine levels; codeine is therefore contraindicated in some groups (for example, children under 12 and breastfeeding mothers).
- **Liver disease** reduces metabolism; some drugs need dose reductions or avoiding.
- **Age**: neonates and older people may metabolise drugs more slowly.
H: Toxic metabolites
P: In paracetamol overdose, the normal pathways are overwhelmed and a toxic metabolite damages the liver. Acetylcysteine is the antidote; timing matters, so treat suspected overdose as an emergency.
K: Before giving a new medicine, check for interactions with enzyme inducers and inhibitors the person already takes.
Q: Name two enzyme inducers. | Rifampicin, carbamazepine, phenytoin, St John's wort (any two).
Q: What is a prodrug? | An inactive drug converted to its active form by metabolism (for example, codeine to morphine).
M1#nursing-u04-06-q1@1: Which is an enzyme inhibitor that can raise levels of other drugs? | Clarithromycin | Rifampicin | St John's wort | Carbamazepine | Phenytoin | Clarithromycin inhibits the liver enzyme CYP3A4, raising levels of drugs it metabolises; rifampicin, St John's wort, carbamazepine and phenytoin are inducers.
M2#nursing-u04-06-q2@2: A woman on a combined oral contraceptive starts rifampicin. What is the main risk? | Reduced contraceptive effect (enzyme induction) | Increased contraceptive side effects | No interaction between these medicines | Acute liver failure from the combination | A reduced effect of rifampicin itself | Rifampicin induces enzymes that metabolise hormonal contraceptives.

## Excretion
S: Excretion removes drugs and their metabolites from the body, mainly through the kidneys, but also in bile, faeces, breath, sweat and breast milk. Reduced excretion causes accumulation and toxicity.
O: Describe renal and other routes of excretion
O: Manage medicines safely in reduced kidney function and acute kidney injury
T: Renal clearance | The removal of a drug from the blood by the kidneys
T: Acute kidney injury | A rapid fall in kidney function
SUM: Most drugs are excreted by the kidneys.
SUM: Reduced excretion causes accumulation; review medicines in acute kidney injury.
SRC: National Institute for Health and Care Excellence, Acute kidney injury: prevention, detection and management (NG148) | guidance | 2019 | https://www.nice.org.uk/guidance/ng148
SRC: Think Kidneys, Guidelines for medicines optimisation in patients with acute kidney injury | guidance | 2016 | https://www.thinkkidneys.nhs.uk/
H: Renal excretion
- Drugs are filtered at the glomerulus, secreted and reabsorbed in the tubules.
- Kidney function is estimated using **eGFR** or, for many dosing decisions, **creatinine clearance** (Cockcroft-Gault), which uses age, weight, sex and serum creatinine. The BNF and pharmacists advise which to use.
- Renally cleared drugs needing caution include gentamicin, vancomycin, lithium, digoxin, metformin, many DOACs, low molecular weight heparins and some antibiotics.
H: Acute kidney injury and medicines
- During acute illness, some medicines should be paused to protect the kidneys or prevent toxicity, as directed by the prescriber and local "sick day" guidance: for example, ACE inhibitors and ARBs, diuretics, NSAIDs, metformin and SGLT2 inhibitors.
- The combination of an ACE inhibitor or ARB, a diuretic and an NSAID (the "triple whammy") raises the risk of acute kidney injury.
H: Other routes
- **Biliary** excretion into faeces (some drugs are reabsorbed: enterohepatic recirculation).
- **Breast milk**: check suitability during breastfeeding.
- **Lungs**: volatile anaesthetics.
K: Watch kidney function in anyone on renally cleared medicines, especially older people and during acute illness.
Q: How is kidney function estimated for drug dosing? | Using eGFR or creatinine clearance (Cockcroft-Gault), as advised by the BNF and pharmacist.
Q: What is the "triple whammy"? | The combination of an ACE inhibitor or ARB, a diuretic and an NSAID, which increases the risk of acute kidney injury.
M1#nursing-u04-07-q1@1: Which organ is the main route of excretion for most drugs? | The kidneys | The lungs | The skin | The spleen | The heart | Most drugs and metabolites are excreted in urine.
M3#nursing-u04-07-q2@2: A patient on ramipril, furosemide and ibuprofen develops vomiting and reduced urine output. What should the nurse do? | Escalate: high risk of AKI; doses may need pausing | Give the next doses as usual and monitor | Increase oral fluids only and continue all | Give extra ibuprofen for the discomfort | Wait for the routine bloods next week | Dehydration with the triple whammy is a recognised cause of AKI.

## Drug interactions
S: A drug interaction occurs when one substance changes the effect of another. Interactions can make treatment fail or cause serious harm, and they become more likely as the number of medicines increases.
O: Describe types of drug interaction and high-risk combinations
O: Prevent interaction harm when medicines change
T: Pharmacokinetic interaction | One drug changes the absorption, distribution, metabolism or excretion of another
T: Pharmacodynamic interaction | Drugs with additive or opposing effects at their targets
SUM: Interactions can cause treatment failure or toxicity.
SUM: Ask what else the person takes, including over-the-counter and herbal products.
SRC: Joint Formulary Committee, British National Formulary: interactions | guidance | 2026 | https://bnf.nice.org.uk/interactions/
H: Types
- **Pharmacokinetic**: one drug alters another's absorption, distribution, metabolism or excretion (for example, enzyme inhibition by clarithromycin raising statin levels, risking muscle damage).
- **Pharmacodynamic**: drugs with similar or opposing effects (for example, two sedatives together causing respiratory depression; NSAIDs plus anticoagulants raising bleeding risk; two drugs that prolong the QT interval).
- **Drug-food**: grapefruit juice, vitamin K in leafy greens with warfarin, alcohol, dairy with some antibiotics.
- **Drug-herb**: St John's wort reduces levels of many drugs.
- **Drug-disease**: a medicine worsening a condition (NSAIDs in heart failure or kidney disease; beta-blockers in asthma).
H: High-risk combinations
- Warfarin with many antibiotics, antifungals and NSAIDs.
- Serotonergic drugs together (SSRIs, tramadol, triptans, linezolid): serotonin syndrome.
- Opioids with benzodiazepines or gabapentinoids: respiratory depression.
- Potassium-sparing drugs together: hyperkalaemia.
H: Preventing harm
- Check the BNF interactions section, electronic prescribing alerts and a pharmacist.
- Ask about over-the-counter, herbal and recreational substances.
- Monitor for expected changes (for example, INR, levels, sedation).
K: Ask "what else does this person take?" every time a medicine is started, stopped or changed.
Q: Name the two main types of drug interaction. | Pharmacokinetic and pharmacodynamic.
Q: Which herbal remedy interacts with many medicines by inducing liver enzymes? | St John's wort.
M1#nursing-u04-08-q1@1: Which combination increases the risk of respiratory depression? | An opioid and a benzodiazepine | Paracetamol and a laxative | An emollient and a steroid cream | Vitamin D and calcium | Salbutamol and a spacer | Additive central nervous system depression.
M2#nursing-u04-08-q2@2: A patient on warfarin is prescribed clarithromycin. What should the nurse expect? | A raised INR, needing closer monitoring | A reduced INR and a higher clot risk | No interaction between the two medicines | Increased clotting and stroke risk | Failure of the antibiotic to work | Clarithromycin can increase warfarin's effect.

## Adverse drug reactions
S: An adverse drug reaction (ADR) is a harmful and unintended response to a medicine. ADRs are a common cause of hospital admission and harm, and many are predictable and preventable.
O: Classify adverse drug reactions
O: Respond to and report a suspected adverse drug reaction
T: Adverse drug reaction | A harmful, unintended response to a medicine
T: Yellow Card scheme | The UK system for reporting suspected adverse drug reactions to the MHRA
SUM: ADRs are common and many are predictable and preventable.
SUM: Withhold if unsafe, assess, escalate, document and report via Yellow Card.
SRC: Medicines and Healthcare products Regulatory Agency, Yellow Card scheme | guidance | 2026 | https://yellowcard.mhra.gov.uk/
SRC: Edwards IR, Aronson JK, Adverse drug reactions: definitions, diagnosis, and management, The Lancet 356(9237):1255–1259 | primary | 2000
SRC: Pirmohamed M and others, Adverse drug reactions as cause of admission to hospital, BMJ 329:15 | primary | 2004
H: Classification
- **Type A (augmented)**: dose-related and predictable from the drug's pharmacology (for example, bleeding with anticoagulants, hypoglycaemia with insulin, constipation with opioids). Most common.
- **Type B (bizarre)**: not dose-related, unpredictable (for example, anaphylaxis, severe skin reactions such as Stevens-Johnson syndrome).
- Others: chronic effects (C), delayed effects (D), end-of-use or withdrawal effects (E), and failure of therapy (F).
H: Recognising ADRs
- Consider any new symptom as a possible ADR, especially after starting or changing a medicine.
- Older people, people with multiple conditions and people on many medicines are at higher risk.
H: Reporting
- The MHRA **Yellow Card scheme** collects reports of suspected ADRs from anyone, including nurses and the public. Report serious suspected reactions to any medicine, and all suspected reactions to medicines marked with a **black triangle** (▼), which are under additional monitoring.
- Document the reaction in the record and update allergy or ADR status.
K: If you suspect an ADR, stop and think: withhold the next dose if it's unsafe, assess the person, escalate to the prescriber, document and report.
Q: What is a Type A adverse drug reaction? | A dose-related, predictable reaction arising from the drug's known pharmacology.
Q: What is the Yellow Card scheme? | The MHRA's system for reporting suspected adverse drug reactions in the UK.
M1#nursing-u04-09-q1@1: What does a black triangle (▼) next to a medicine mean? | It is under additional MHRA monitoring | It is a Schedule 2 controlled drug | It is an unlicensed medicine | It is for hospital use only | It can safely be crushed | The black triangle denotes additional monitoring.
M3#nursing-u04-09-q2@2: A patient develops a widespread blistering rash and mouth ulcers a week after starting a new medicine. What should the nurse do? | Possible serious ADR: withhold, escalate, report | Apply an emollient and continue the medicine | Wait a day to see whether the rash settles | Give the next dose as prescribed and observe | Document "rash" only and take no other action | Severe skin reactions can be life-threatening.

## Contraindications
S: A contraindication is a reason not to use a medicine because the risk of harm outweighs the benefit. A caution means the medicine can be used, but with care, monitoring or a dose change.
O: Distinguish contraindications from cautions
O: Check a medicine is safe for the individual before giving it
T: Contraindication | A reason not to use a medicine because risk outweighs benefit
T: Caution | A reason to use a medicine with extra care, monitoring or dose change
SUM: Contraindications may be absolute or relative.
SUM: A prescription doesn't remove the nurse's duty to check safety.
SRC: Joint Formulary Committee, British National Formulary | guidance | 2026 | https://bnf.nice.org.uk/
SRC: Nursing and Midwifery Council, The Code, section 18 | standard | 2018 | https://www.nmc.org.uk/standards/code/
H: Absolute and relative
- **Absolute contraindication**: the medicine must not be used (for example, a previous anaphylactic reaction to the drug).
- **Relative contraindication or caution**: use only if the benefit outweighs the risk, with appropriate precautions (for example, NSAIDs in someone with mild kidney impairment).
H: Common contraindications and cautions
- **Pregnancy**: for example, ACE inhibitors, warfarin, sodium valproate, isotretinoin, methotrexate.
- **Kidney or liver impairment**.
- **Specific conditions**: beta-blockers in asthma; NSAIDs in active peptic ulcer or severe heart failure; metoclopramide in Parkinson's disease; many antipsychotics in dementia-related agitation (increased stroke and mortality risk).
- **Age**: aspirin in children under 16 (Reye's syndrome); codeine in children under 12.
- **Interactions** with existing medicines.
H: The nurse's role
- Check the record, ask the person and family, and check the BNF before giving a medicine.
- If you identify a possible contraindication, don't give the medicine; discuss with the prescriber and pharmacist and document.
K: A prescription doesn't remove the nurse's responsibility to check that a medicine is safe for this person.
Q: What is the difference between a contraindication and a caution? | A contraindication means the medicine shouldn't be used; a caution means it can be used with care, monitoring or dose adjustment.
Q: Why is aspirin avoided in children under 16 (except under specialist advice)? | Because of the risk of Reye's syndrome.
M1#nursing-u04-10-q1@1: Which medicine is contraindicated in pregnancy? | Warfarin | Paracetamol at usual doses | Folic acid | Most emollients | Iron supplements at usual doses | Warfarin crosses the placenta and can cause birth defects and fetal bleeding, so it is avoided in pregnancy; heparins are usually used instead.
M2#nursing-u04-10-q2@2: A patient with Parkinson's disease is prescribed metoclopramide for nausea. What should the nurse do? | Query it with the prescriber, as metoclopramide can worsen Parkinson's symptoms | Give it as prescribed | Give double the dose | Ask the patient to decide | Give it only at night | Metoclopramide blocks dopamine and is generally avoided in Parkinson's disease.

## Allergies
S: A drug allergy is an immune-mediated reaction to a medicine. Recording allergies accurately, checking them before every administration, and recognising anaphylaxis are core nursing responsibilities.
O: Distinguish allergy from intolerance and record allergies accurately
O: Recognise and respond to anaphylaxis
T: Anaphylaxis | A severe, life-threatening systemic hypersensitivity reaction
T: Cross-reactivity | An allergic reaction to a different drug with a similar structure
SUM: Record the drug and the reaction; check allergies before every dose.
SUM: Anaphylaxis needs IM adrenaline and emergency help.
SRC: National Institute for Health and Care Excellence, Drug allergy: diagnosis and management (CG183) | guidance | 2014 | https://www.nice.org.uk/guidance/cg183
SRC: Resuscitation Council UK, Emergency treatment of anaphylaxis | guidance | 2021 | https://www.resus.org.uk/library/additional-guidance/guidance-anaphylaxis/emergency-treatment
H: Allergy versus intolerance
- **Allergy**: immune reaction: urticaria, angioedema, bronchospasm, anaphylaxis, or delayed reactions (rashes, severe skin reactions).
- **Intolerance or side effect**: non-immune (for example, nausea with codeine). Labelling side effects as allergies can deny people the best treatment (many people labelled "penicillin allergic" are not).
H: Recording allergies
- Record the medicine (or substance), the reaction, the date, and the source of the information on every chart and record, following NICE guidance on drug allergy.
- Include non-medicine allergies relevant to care (latex, chlorhexidine, food, plasters).
- Use allergy wristbands according to local policy.
- Never give a medicine until allergy status is known and recorded, except in an emergency.
H: Anaphylaxis
- A severe, life-threatening hypersensitivity reaction with airway, breathing or circulation problems, usually with skin or mucosal changes.
- **Treatment** follows the Resuscitation Council UK algorithm: call for help, lie the person flat (or sitting if breathing is difficult), give **intramuscular adrenaline** at the dose for age as per the algorithm, give high-flow oxygen and IV fluids as directed, repeat adrenaline after 5 minutes if no improvement, and monitor.
- Report and document; ensure referral to an allergy service as appropriate.
H: Cross-reactivity
P: People allergic to one medicine may react to related ones (for example, penicillins and some other beta-lactams). Check with a pharmacist before giving a related medicine.
K: Check allergies before every administration, not just on admission.
Q: What should an allergy record include? | The medicine or substance, the reaction, the date, and the source of the information.
Q: What is the first-line drug treatment for anaphylaxis? | Intramuscular adrenaline, given according to the Resuscitation Council UK algorithm.
M1#nursing-u04-11-q1@1: Which is most likely to be an intolerance rather than an allergy? | Nausea after codeine | Hives and wheeze after penicillin | Swelling of the lips after an injection | Anaphylaxis | A blistering rash with mucosal involvement | Nausea is a common side effect, not an immune reaction.
M3#nursing-u04-11-q2@2: Minutes after a first dose of IV antibiotic, a patient has stridor, a widespread rash and a blood pressure of 78/40. What should the nurse do first? | Stop it, call for help, give IM adrenaline | Slow the infusion and recheck in 15 minutes | Give an oral antihistamine and wait | Sit the patient up and give a drink of water | Document it and tell the doctor on the round | These are signs of anaphylaxis, a medical emergency.

## Medication reconciliation
S: Medicines reconciliation is the process of obtaining an accurate, complete list of a person's current medicines and comparing it with what is prescribed at transitions of care: on admission, transfer and discharge. It prevents omissions, duplications and errors.
O: Describe the medicines reconciliation process
O: Recognise time-critical medicines at transitions of care
T: Medicines reconciliation | Comparing an accurate list of current medicines with what is prescribed at transitions
T: Time-critical medicine | A medicine where delay or omission can cause harm
SUM: Use at least two sources and document the reconciliation.
SUM: Time-critical medicines must not be delayed at admission.
SRC: National Institute for Health and Care Excellence, Medicines optimisation (NG5) | guidance | 2015 | https://www.nice.org.uk/guidance/ng5
SRC: Specialist Pharmacy Service, Time critical medicines | guidance | 2023 | https://www.sps.nhs.uk/
H: The process
- **Collect**: gather information from at least two sources: the person or carer, GP records, the summary care record or shared care record, repeat prescriptions, the medicines brought in, community pharmacy.
- **Check**: compare with the current prescription chart; identify discrepancies (omitted, wrong dose, duplicated, stopped medicines).
- **Communicate**: resolve discrepancies with the prescriber and pharmacist, and document the reasons for any changes.
H: Guidance
- NICE guidance on medicines optimisation (NG5) recommends reconciliation within 24 hours of admission (sooner if needed) and at every transfer of care.
- Include over-the-counter, herbal, recreational substances, eye drops, inhalers, patches, injections given in clinics (for example, depot antipsychotics, monthly injections) and recently stopped medicines.
H: Time-critical medicines
P: Some medicines must not be missed or delayed on admission: for example, Parkinson's medicines, insulin, anticonvulsants, anticoagulants, immunosuppressants and some antimicrobials. Make sure they're prescribed and given on time.
K: Two sources, checked and documented, for every person at every transition.
Q: Within what time should medicines reconciliation be done on hospital admission? | Within 24 hours (NICE NG5), sooner where needed.
Q: Name four sources for a medicines history. | The person or carer, GP record, shared or summary care record, repeat prescriptions, medicines brought in, community pharmacy (any four).
M1#nursing-u04-12-q1@1: Which medicines are time-critical on admission? | Parkinson's medicines | Most vitamins | Emollients | Occasional antacids | Simple linctus | Delays in Parkinson's medicines can cause serious harm.
M2#nursing-u04-12-q2@2: On admission, a patient says they have a monthly injection at the GP practice that isn't on the chart. What should the nurse do? | Record it, confirm the source, inform the team | Ignore it, because it isn't due today | Tell the patient to sort it out after discharge | Give an extra dose to make up for it | Assume the medicine was stopped deliberately | Clinic-administered medicines are often missed at reconciliation.

## Medicines legislation
S: Medicines law in the UK controls how medicines are classified, prescribed, supplied, stored and administered. Nurses must work within it, and within professional and local policy.
O: Describe the main UK medicines legislation and classification
O: Identify the legal authority to administer a medicine
T: Patient group direction | Written instructions for supplying or giving medicines to groups of patients without individual prescriptions
T: Patient specific direction | A prescriber's written instruction to give a medicine to a named patient
SUM: The Human Medicines Regulations 2012 and Misuse of Drugs legislation govern medicines.
SUM: Know your authority: prescription, PSD, PGD or exemption.
SRC: Human Medicines Regulations 2012 | legislation | 2012 | https://www.legislation.gov.uk/uksi/2012/1916
SRC: Misuse of Drugs Act 1971 | legislation | 1971 | https://www.legislation.gov.uk/ukpga/1971/38
SRC: National Institute for Health and Care Excellence, Patient group directions (MPG2) | guidance | 2017 | https://www.nice.org.uk/guidance/mpg2
H: Main legislation
- **Human Medicines Regulations 2012**: licensing, classification, prescribing, supply and administration of medicines (replacing most of the Medicines Act 1968). UK-wide.
- **Misuse of Drugs Act 1971** and the **Misuse of Drugs Regulations 2001** (in Great Britain; Northern Ireland has its own Regulations of 2002): control of controlled drugs.
- **Controlled Drugs (Supervision of Management and Use) Regulations 2013** (England and Scotland; equivalent provisions elsewhere): accountable officers and governance.
H: Classification
- **Prescription-only medicines (POM)**: need a prescription from an authorised prescriber.
- **Pharmacy medicines (P)**: sold under a pharmacist's supervision.
- **General sales list (GSL)**: available from shops.
H: Authority to administer
- A **prescription** (for an individual) by a doctor, dentist or non-medical prescriber.
- A **patient specific direction (PSD)**: a written instruction for a named patient.
- A **patient group direction (PGD)**: a written instruction allowing named, trained registered professionals to supply or administer specified medicines to groups of patients without a prescription, under strict conditions.
- Exemptions in the Regulations for emergencies (for example, adrenaline for anaphylaxis may be given by anyone to save life).
H: Professional guidance
P: The Royal Pharmaceutical Society and Royal College of Nursing's *Professional guidance on the administration of medicines in healthcare settings* (2019) sets principles for safe administration. The NMC Code (18) requires registrants to advise on, prescribe, supply, dispense or administer medicines within their competence and the law.
K: Always know your legal authority before giving a medicine: a prescription, a PSD, a PGD or a legal exemption.
Q: What is a patient group direction? | A written instruction allowing named, trained registered professionals to supply or administer specified medicines to defined groups of patients without a prescription.
Q: What are the three legal categories of medicines? | Prescription-only (POM), pharmacy (P) and general sales list (GSL).
M1#nursing-u04-13-q1@1: Which regulations govern controlled drugs in Great Britain? | The Misuse of Drugs Regulations 2001 | The Human Rights Act 1998 | The Mental Capacity Act 2005 | The Data Protection Act 2018 | The Equality Act 2010 | The 2001 Regulations set out schedules and requirements for CDs.
M2#nursing-u04-13-q2@2: A nurse in a clinic wants to give a flu vaccine to a patient with no prescription. What legal authority might allow it? | A valid PGD the nurse is trained under | Verbal agreement from a nursing colleague | The patient's own request for the vaccine | The manufacturer's patient information leaflet | A prescription written for the patient last year | PGDs allow supply or administration to defined groups without a prescription.

## Prescribing and administration responsibilities
S: Prescribers decide which medicine a person should have; those administering medicines are responsible for giving them correctly and safely. Both are accountable, and nurses can be prescribers too with additional qualifications.
O: Describe nurse prescribing and the responsibilities of the person administering
O: Respond to unclear or unsafe prescriptions
T: Independent prescriber | A practitioner responsible for assessment and prescribing decisions
T: Supplementary prescriber | A practitioner who prescribes within an agreed clinical management plan
SUM: Prescribers and administrators are both accountable.
SUM: Don't give a medicine from an unclear or unsafe prescription; query and escalate.
SRC: Royal Pharmaceutical Society, A competency framework for all prescribers | guidance | 2021 | https://www.rpharms.com/resources/frameworks/prescribing-competency-framework/competency-framework
SRC: Nursing and Midwifery Council, Standards for prescribing programmes | standard | 2023 | https://www.nmc.org.uk/standards/standards-for-post-registration/standards-for-prescribers/
H: Nurse prescribing
- **Community practitioner nurse prescribers (V100/V150)**: prescribe from a limited formulary.
- **Independent and supplementary prescribers (V300)**: independent prescribers can prescribe any medicine within their competence (including most controlled drugs), after an NMC-approved programme.
- Prescribers follow the Royal Pharmaceutical Society's **Competency Framework for All Prescribers** and the NMC Standards for prescribing.
H: Responsibilities when administering
- Confirm the prescription is legible, complete, signed, dated and appropriate (drug, dose, route, frequency, duration, indication where required, allergies).
- Know the medicine: its purpose, usual dose, side effects, interactions and monitoring.
- Check the person's identity, allergies and consent.
- Check calculations independently, and get a second check where policy requires.
- Administer, document immediately, and monitor the effect.
- Query any prescription that seems wrong, and don't administer until it's resolved.
H: Separation of duties
P: Good practice separates prescribing from administering or supplying where possible, so that one person's error is caught by another. Nurses should not prescribe and administer for the same person without a second check unless local policy allows it in specific situations.
K: If a prescription is unclear, unsafe or incomplete, don't give the medicine. Query it, document and escalate.
Q: What can a V300 independent nurse prescriber prescribe? | Any medicine within their competence and scope, including most controlled drugs, subject to legal restrictions.
Q: What must be checked on a prescription before administering? | Patient details, drug, dose, route, frequency, timing, duration, signature and date, allergies and that the medicine is appropriate.
M1#nursing-u04-14-q1@1: Which framework sets competencies for all prescribers in the UK? | The RPS Competency Framework for All Prescribers | The NMC Code: professional standards | The NEWS2 national early warning score | The eight Caldicott Principles | The Equality Act 2010 code of practice | The RPS framework applies to all prescribers.
M2#nursing-u04-14-q2@2: A prescription for morphine has no route written. What should the nurse do? | Not administer; contact the prescriber to complete the prescription | Give it orally as the most common route | Give it subcutaneously | Ask a colleague which route they would choose | Give half the dose by each route | An incomplete prescription isn't valid for administration.

## The medicines administration process
S: Safe administration follows a consistent process every time: preparation, checking, administration, documentation and monitoring. Interruptions and shortcuts are common causes of error.
O: Describe the steps before, during and after administration
O: Reduce errors from interruptions and shortcuts
T: Medicines administration record | The chart or electronic record of prescribed and given medicines
T: Interruption | A break in a task that increases the risk of error
SUM: Prepare, check, give, document and monitor every time.
SUM: Never sign before giving or for a medicine you haven't seen taken.
SRC: Royal Pharmaceutical Society and Royal College of Nursing, Professional guidance on the administration of medicines in healthcare settings | guidance | 2019 | https://www.rpharms.com/
SRC: Westbrook JI and others, Association of interruptions with an increased risk and severity of medication administration errors, Archives of Internal Medicine 170(8):683–690 | primary | 2010
H: Before
- Wash hands; gather the chart, medicines and equipment; minimise interruptions (some wards use "do not disturb" tabards).
- Check the prescription is valid and appropriate.
- Check the person's identity using at least two identifiers (name and date of birth, checked against the wristband and chart), and ask the person to state them where possible.
- Check allergies.
- Check the medicine, strength, formulation, expiry date and storage.
- Calculate the dose and have it checked if policy requires.
- Check when it was last given, and whether any observations or results are needed first (for example, pulse before digoxin, blood glucose before insulin, INR for warfarin).
H: During
- Explain the medicine and gain consent.
- Give by the correct route and technique, and stay with the person while they take oral medicines.
H: After
- Document immediately, accurately, on the correct chart: given, or not given with the reason code.
- Monitor for effect and adverse effects; reassess (for example, pain after analgesia).
- Report and act on refusals, omissions and errors.
P: **Investigate with the lab.** Work through tablet and liquid dose calculations with the worked methods. The numbers are illustrative only.
IX: calculations
K: Never sign for a medicine you haven't seen the person take, and never sign before giving it.
Q: How many identifiers should be used to confirm a person's identity? | At least two (for example, name and date of birth), checked against the wristband and chart.
Q: What should you check before giving digoxin? | The person's pulse (rate and rhythm), and know the most recent levels and electrolytes where relevant.
M1#nursing-u04-15-q1@1: When should administration be documented? | Immediately after giving it | Before preparing it | At the end of the shift | When the next dose is due | Only if the person asks | Prompt documentation prevents double dosing.
M2#nursing-u04-15-q2@2: A nurse is interrupted repeatedly during a medicine round and isn't sure whether one patient had their 8am dose. What should they do? | Check the chart and colleagues; don't give until sure | Give it again, just to be safe | Skip all of that patient's medicines today | Ask the patient to decide whether to take it | Sign for it now without giving it | Uncertainty risks a double dose; verify before acting.
M2#nursing-u04-15-q3@1: A prescription is 500 mg; tablets are 250 mg. How many tablets are given? | 2 | 0.5 | 4 | 1 | Dose required ÷ dose per tablet = 500 ÷ 250 = 2.

## The rights of medicines administration
S: The "rights" of medicines administration are a checklist to prevent errors. The core five are right person, right medicine, right dose, right route and right time; many organisations add more.
O: List the core and extended rights of medicines administration
O: Recognise the limits of the rights as a safety tool
T: Rights of administration | A checklist: right person, medicine, dose, route and time, often extended
T: Right documentation | Recording administration accurately after giving a medicine
SUM: The core five rights are person, medicine, dose, route and time.
SUM: Rights are checks, not a guarantee; systems also matter.
SAFE: If any right can't be confirmed, don't give the medicine: withhold it, query with the prescriber or pharmacist, and document and report as local policy requires.
SRC: Royal Pharmaceutical Society and Royal College of Nursing, Professional guidance on the administration of medicines in healthcare settings | guidance | 2019 | https://www.rpharms.com/
SRC: Elliott M, Liu Y, The nine rights of medication administration: an overview, British Journal of Nursing 19(5):300–305 | primary | 2010
H: The core rights
- **Right person**: positive identification.
- **Right medicine**: check name, strength and form against the prescription.
- **Right dose**: correct calculation and measurement.
- **Right route**: oral, IV, SC and so on, and right site.
- **Right time**: correct time and frequency; time-critical medicines on time.
H: Extended rights (common additions)
- **Right documentation**.
- **Right reason** (indication).
- **Right response** (monitoring the effect).
- **Right to refuse** (informed refusal).
- **Right form** (for example, liquid for someone with swallowing problems, if prescribed).
- **Right expiry**.
H: Limits of the rights
P: The rights are a minimum checklist, not a guarantee. Most errors happen when the system makes the wrong thing easy: look-alike, sound-alike names, similar packaging, interruptions, unclear prescriptions. Use the rights together with professional knowledge and a culture that encourages speaking up.
K: Check the rights three times: when taking the medicine from storage, when preparing it, and at the bedside.
Q: List the five core rights of medicines administration. | Right person, right medicine, right dose, right route, right time.
Q: Name three extended rights. | Right documentation, reason, response, right to refuse, form, expiry (any three).
M1#nursing-u04-16-q1@1: Which right is checked by asking the person to state their name and date of birth? | Right person | Right route | Right time | Right dose | Right form | Positive identification confirms the right person.
M2#nursing-u04-16-q2@2: A patient refuses their evening medicine after it was explained. What should the nurse do? | Respect it, explore why, inform and document | Hide the tablet in their food instead | Give it later while they're asleep | Document the medicine as given anyway | Insist repeatedly until they take it | Informed refusal is a right; covert administration needs a capacity assessment and a formal best-interests process.

## Oral medication
S: Oral medicines are the most common route. Safe oral administration depends on the right formulation, the person's ability to swallow, and attention to food and timing.
O: Describe oral formulations and the effect of food and timing
O: Give oral medicines safely, including with swallowing difficulties and covert administration
T: Modified-release | A formulation that releases a drug slowly over time
T: Covert administration | Giving medicine disguised in food or drink, only within a lawful best-interests process
SUM: Choose the right formulation and check swallowing.
SUM: Covert administration needs capacity assessment, best interests and pharmacist advice.
SRC: National Institute for Health and Care Excellence, Managing medicines in care homes (SC1) | guidance | 2014 | https://www.nice.org.uk/guidance/sc1
SRC: Specialist Pharmacy Service, Using medicines in people with swallowing difficulties | guidance | 2023 | https://www.sps.nhs.uk/
H: Formulations
- Tablets, capsules, modified-release and enteric-coated preparations, orodispersible tablets, liquids (solutions and suspensions), sachets.
- Shake suspensions; measure liquids with an oral syringe or medicine pot, never a household spoon. Oral syringes are designed so they can't connect to IV lines.
H: Swallowing difficulties
- Check swallowing: dysphagia increases the risk of choking and aspiration.
- Don't crush or open medicines without checking with a pharmacist. Crushing is usually "off-label" and can be unsafe (modified-release, enteric-coated, cytotoxic medicines).
- A liquid or alternative formulation may be prescribed instead.
- Thickened fluids for people with dysphagia may change how some medicines work; ask a pharmacist.
H: Food and timing
- Some medicines must be taken on an empty stomach (levothyroxine, some antibiotics), some with food (NSAIDs, metformin), and bisphosphonates with water, sitting upright for 30 minutes.
H: Covert administration
P: Hiding medicine in food or drink without the person's knowledge is only lawful for a person who lacks capacity to make the decision, after a best interests decision involving the prescriber, pharmacist and family or advocate, documented and regularly reviewed, in line with mental capacity law and local policy.
K: Stay with the person until oral medicines are taken. Don't leave them on the table.
Q: Why use an oral syringe for liquid medicines? | For accurate measurement, and because oral syringes can't connect to IV devices, preventing wrong-route errors.
Q: How should bisphosphonate tablets such as alendronic acid be taken? | On an empty stomach with a full glass of water, staying upright for at least 30 minutes.
M1#nursing-u04-17-q1@1: Which formulation should usually not be crushed? | A modified-release tablet | A standard paracetamol tablet if a pharmacist has advised it's suitable | An orodispersible tablet | A liquid | A soluble tablet | Crushing modified-release tablets can cause dose dumping.
M2#nursing-u04-17-q2@2: A patient with dementia who lacks capacity keeps spitting out important medicines. Staff suggest hiding them in yoghurt. What must happen first? | A documented best interests decision under capacity law | Nothing, because it is in their interests | The nurse decides alone on each occasion | The family decides alone and tells staff | Covert administration is never allowed | Covert administration needs a formal, lawful process.

## Topical medication
S: Topical medicines are applied to the skin or mucous membranes for local or, sometimes, systemic effect. They include creams, ointments, lotions, gels, patches, eye drops, ear drops and nasal sprays.
O: Describe types of topical preparations and their uses
O: Apply topical medicines and patches safely
T: Emollient | A moisturising treatment that softens and protects the skin
T: Fingertip unit | A measure of topical steroid cream for dosing
SUM: Topical medicines include creams, ointments, patches and eye, ear and nasal preparations.
SUM: Topical medicines can cause systemic effects; emollients are a fire risk on fabrics.
SAFE: Paraffin-containing and other emollients soaked into fabric are a fire hazard; report and remove patches causing skin reactions, and query unclear topical prescriptions with the prescriber or pharmacist.
SRC: Medicines and Healthcare products Regulatory Agency, Emollients: new information about risk of severe and fatal burns | guidance | 2020 | https://www.gov.uk/drug-safety-update
SRC: Joint Formulary Committee, British National Formulary: topical corticosteroids | guidance | 2026 | https://bnf.nice.org.uk/
H: Skin preparations
- **Emollients**: moisturise and protect; apply generously, smoothing in the direction of hair growth.
- **Topical corticosteroids**: potency ranges from mild to very potent; apply thinly as directed (the fingertip unit is a guide), for the shortest time needed. Overuse thins the skin.
- **Antimicrobial creams** and **barrier creams**.
H: Safety
- Wear gloves to protect yourself and avoid cross-contamination; use a separate supply for each person.
- **Fire risk**: emollients (including paraffin-free ones) soak into clothing and bedding and make them flammable. Warn people not to smoke or go near naked flames.
- Label tubes with opening dates and follow expiry guidance.
H: Transdermal patches
- Apply to clean, dry, hairless, intact skin; rotate sites; record the site, date and time; remove the old patch before applying the new one; fold used patches and dispose of them safely (controlled drug patches have specific disposal rules).
H: Eye, ear and nasal preparations
- Eye drops: wash hands, pull down the lower lid, instil into the lower conjunctival sac without touching the eye; leave 5 minutes between different drops; ointment after drops.
- Label eye drops with the date of opening; most are discarded after 28 days (check the product).
K: Topical doesn't mean harmless: steroid creams, patches and eye drops can all cause systemic effects.
Q: What is a fingertip unit? | The amount of cream or ointment squeezed from a tube along the end segment of an adult's index finger, used to guide topical steroid dosing.
Q: Why must people using emollients be warned about naked flames? | Emollient residue on clothing and bedding increases flammability and the risk of serious burns.
M1#nursing-u04-18-q1@1: Which is correct when applying a new transdermal patch? | Remove the old patch; use a new site; record it | Apply the new patch over the old one | Apply it to broken skin for faster effect | Cover it with a heat pad to help absorption | Cut the patch to reduce the dose without advice | Rotating sites and removing old patches prevents overdose and skin irritation.
M2#nursing-u04-18-q2@2: A patient using paraffin-based emollients wants to go outside to smoke. What should the nurse advise? | Explain the fire risk of emollient on clothing | Nothing: emollients are never flammable | Smoking is fine once the emollient is dry | Apply more emollient before going out | Only paraffin-free emollients are safe | Both paraffin-based and paraffin-free emollients can build up in fabric and increase fire risk.

## Inhaled medication
S: Inhaled medicines deliver drugs straight to the airways for asthma and COPD. Technique makes the difference between a medicine that works and one that doesn't.
O: Describe inhaler devices and inhaled medicines
O: Teach and check inhaler technique
T: Spacer | A chamber that helps deliver medicine from a pressurised inhaler
T: Dry powder inhaler | A breath-actuated device delivering powdered medicine
SUM: Technique determines whether inhaled medicine works.
SUM: Watch people use their inhalers; consider environmental impact.
SRC: British Thoracic Society, BTS/NICE/SIGN Asthma: diagnosis, monitoring and chronic asthma management | guidance | 2024 | https://www.brit-thoracic.org.uk/
SRC: National Institute for Health and Care Excellence, Chronic obstructive pulmonary disease in over 16s (NG115) | guidance | 2019 | https://www.nice.org.uk/guidance/ng115
H: Devices
- **Pressurised metered-dose inhalers (pMDI)**: need slow, steady inhalation coordinated with pressing the canister; a **spacer** improves delivery and reduces mouth deposition.
- **Dry powder inhalers (DPI)**: need a quick, deep breath.
- **Soft mist inhalers**.
- **Nebulisers**: used in acute or severe illness. Oxygen or air as the driving gas, as prescribed (air for people at risk of hypercapnic respiratory failure, with supplemental oxygen as needed).
H: Medicines
- **Relievers**: short-acting beta-2 agonists (SABA, such as salbutamol).
- **Preventers**: inhaled corticosteroids (ICS, such as beclometasone, budesonide).
- **Long-acting bronchodilators**: LABA (such as formoterol, salmeterol) and LAMA (such as tiotropium).
- Current UK asthma guidance (BTS, NICE and SIGN, 2024) favours an inhaled corticosteroid in every treatment step, including combined ICS-formoterol inhalers used as anti-inflammatory relievers in many adults. Follow the person's prescribed plan.
H: Teaching technique
- Check technique at every opportunity and use the teach-back method.
- Rinse the mouth after inhaled corticosteroids to reduce oral thrush.
- Recognise poor control: using a reliever more than a few times a week, night waking, or reduced activity.
H: Environmental impact
P: pMDIs contain propellant gases that are potent greenhouse gases; dry powder inhalers have a lower carbon footprint. Inhaler choice should be agreed with the person, considering ability and preference.
K: Most inhaler failures are technique failures. Watch the person use it.
Q: Why use a spacer with a pMDI? | It improves delivery of the medicine to the lungs and reduces deposition in the mouth and throat.
Q: Why should people rinse their mouth after an inhaled corticosteroid? | To reduce the risk of oral thrush and hoarseness.
M1#nursing-u04-19-q1@1: Which device needs a quick, deep inhalation? | A dry powder inhaler | A pMDI | A pMDI with spacer | A nebuliser | A soft mist inhaler | DPIs need a fast, forceful breath to disperse the powder.
M2#nursing-u04-19-q2@2: A patient says they use their blue inhaler several times a day and still wake at night wheezing. What should the nurse do? | Poor control: check technique; refer for review | Reassure them that this is normal for asthma | Advise using the blue inhaler even more often | Stop the preventer, as it isn't helping | Tell them to avoid all exercise in future | Frequent reliever use and night symptoms indicate poor control.

## Injectable medication
S: Injections deliver medicines into the skin (intradermal), fat (subcutaneous) or muscle (intramuscular). Safe practice depends on the right site, needle, technique, asepsis and sharps safety.
O: Describe injection routes and sites
O: Give injections safely, including sharps safety
T: Subcutaneous injection | An injection into the fat layer under the skin
T: Intramuscular injection | An injection into muscle
SUM: Choose the right route, site, needle and technique.
SUM: Insulin and LMWH are subcutaneous; dispose of sharps safely.
SRC: Health and Safety (Sharp Instruments in Healthcare) Regulations 2013 | legislation | 2013 | https://www.legislation.gov.uk/uksi/2013/645
SRC: Forum for Injection Technique UK, The UK injection and infusion technique recommendations | guidance | 2016
H: Routes and sites
- **Intradermal (ID)**: into the dermis (for example, some tests and vaccines); a small bleb forms.
- **Subcutaneous (SC)**: into fat (abdomen, thigh, upper arm); for insulin, low molecular weight heparin and many others. Rotate sites to prevent lipohypertrophy.
- **Intramuscular (IM)**: into muscle: deltoid (small volumes, vaccines), vastus lateralis (infants and adults), ventrogluteal (larger volumes, avoids major nerves). The dorsogluteal site risks sciatic nerve injury and is generally avoided.
H: Technique
- Check the prescription, the person, allergies and consent; explain.
- Hand hygiene; aseptic non-touch technique (ANTT); check whether skin cleaning is required by local policy.
- Choose the needle length and gauge for the site, the person's size and the medicine.
- The **Z-track** technique for IM injections reduces leakage of irritant medicines.
- Use safety-engineered needles; don't resheath; dispose of sharps at the point of use in a sharps bin (Health and Safety (Sharp Instruments in Healthcare) Regulations 2013).
H: After
- Document the medicine, dose, site, batch (for vaccines) and time.
- Monitor for reactions; observe after vaccines as policy requires.
- Report sharps injuries immediately and follow the local exposure procedure.
K: Insulin and low molecular weight heparin are given subcutaneously; giving them IM by mistake changes their absorption and effect.
Q: Which IM site avoids the sciatic nerve and is suitable for larger volumes? | The ventrogluteal site.
Q: Why rotate subcutaneous injection sites? | To prevent lipohypertrophy, which causes unpredictable absorption.
M1#nursing-u04-20-q1@1: Which regulations require safer sharps in healthcare in Great Britain? | The Health and Safety (Sharp Instruments in Healthcare) Regulations 2013 | The Human Medicines Regulations 2012 | The Misuse of Drugs Regulations 2001 | The Data Protection Act 2018 | The Care Act 2014 | The 2013 Regulations implement sharps safety requirements.
M2#nursing-u04-20-q2@2: A nurse sustains a needlestick injury from a used needle. What should they do first? | Bleed it, wash it, report it at once | Suck the wound to remove any blood | Scrub with alcohol and carry on working | Report it at the end of the week | Ignore it if the patient seems well | Prompt first aid and reporting allows risk assessment and post-exposure prophylaxis if needed.

## Intravenous medication principles
S: Intravenous (IV) medicines act immediately and can't be retrieved once given, so IV administration carries high risk. Nurses give IV medicines only after specific training and competence assessment, following local policy.
O: Describe IV administration methods and principles
O: Recognise and respond to IV complications
T: Bolus | A dose given directly into a vein over a short time
T: Extravasation | Leakage of a vesicant drug into surrounding tissue
SUM: IV medicines act immediately and can't be retrieved.
SUM: Only give IV medicines after training and competence assessment; observe for reactions.
SRC: Royal College of Nursing, Standards for infusion therapy | guidance | 2016 | https://www.rcn.org.uk/
SRC: Injectable Medicines Guide (Medusa), NHS | guidance | 2026 | https://www.medusa.wales.nhs.uk/
H: Methods
- **Bolus** (slow IV injection over a set time, often 3–5 minutes or as specified).
- **Intermittent infusion** (for example, an antibiotic over 30 minutes).
- **Continuous infusion** (for example, maintenance fluids, heparin, insulin), usually via an infusion pump.
H: Principles
- Valid prescription; check compatibility, dilution, rate and stability using the local injectable medicines guide (for example, the Medusa guide).
- Two-person independent checking for high-risk IV medicines, as policy requires.
- ANTT for preparation and access; label every infusion bag and line.
- Check the cannula or central line before use: patency, no pain, swelling or redness. The Visual Infusion Phlebitis (VIP) score helps monitor peripheral cannulas.
- Use a volumetric pump with dose error reduction software where available; never rely on gravity for high-risk infusions.
H: Complications
- **Phlebitis**, **infiltration** and **extravasation** (leakage of vesicant medicines causing tissue damage): stop the infusion and follow the local protocol.
- **Infection**, including bloodstream infection.
- **Speed shock** from bolus given too quickly.
- **Fluid overload**.
- **Air embolism**.
- **Anaphylaxis**.
H: Calculations (illustrative)
E: Rate (mL/hour) = volume (mL) ÷ time (hours) :: for a pump
E: Drops per minute = (volume (mL) × drop factor (drops/mL)) ÷ time (minutes) :: for a gravity set
X: Illustrative only: 1,000 mL over 8 hours by pump.
> 1,000 ÷ 8 = 125 mL/hour.
> In practice the pump settings, the prescription and a second check confirm the rate.
P: **Investigate with the lab.** Practise infusion and drip rate calculations, checking each against the worked method.
IX: calculations
K: If an IV medicine has been given, the dose can't be taken back. Check everything before connecting, and stay to observe for early reactions.
Q: What is extravasation? | Leakage of a vesicant (tissue-damaging) medicine from the vein into surrounding tissue.
Q: What is the formula for an infusion rate in mL per hour? | Volume (mL) divided by time (hours).
M1#nursing-u04-21-q1@1: A prescription is for 500 mL over 4 hours via a pump. What is the rate? (Illustrative calculation.) | 125 mL/hour | 100 mL/hour | 200 mL/hour | 250 mL/hour | 50 mL/hour | Rate = volume ÷ time: 500 mL ÷ 4 hours = 125 mL per hour. In practice, the pump setting is checked against the prescription by a second person where policy requires.
M2#nursing-u04-21-q2@2: During an infusion, the cannula site becomes swollen, cool and painful. What should the nurse do first? | Stop the infusion and assess the site | Increase the rate to finish it quickly | Flush the cannula forcefully to clear it | Apply heat to the area and continue | Ignore it until the infusion has ended | Swelling and pain suggest infiltration; stopping prevents further harm.
M2#nursing-u04-21-q3@1: 1,000 mL is to be given over 8 hours by pump. What is the rate? | 125 mL/hour | 80 mL/hour | 250 mL/hour | 8 mL/hour | Rate = volume ÷ time = 1,000 ÷ 8 = 125 mL per hour.

## Controlled drugs
S: Controlled drugs (CDs) are medicines with potential for misuse and harm, controlled under the Misuse of Drugs Act 1971 and its regulations. They have strict rules on prescribing, storage, recording, administration and destruction.
O: Describe the schedules and legal controls for controlled drugs
O: Store, record and give controlled drugs safely and act on discrepancies
T: Controlled drug | A medicine controlled under misuse of drugs legislation
T: CD register | The bound or electronic record of controlled drug stock and administration
SUM: CDs are controlled by the Misuse of Drugs Act 1971 and Regulations 2001.
SUM: If a balance is wrong, stop, recount and report.
SRC: Misuse of Drugs Regulations 2001 | legislation | 2001 | https://www.legislation.gov.uk/uksi/2001/3998
SRC: National Institute for Health and Care Excellence, Controlled drugs: safe use and management (NG46) | guidance | 2016 | https://www.nice.org.uk/guidance/ng46
H: Schedules (Misuse of Drugs Regulations 2001, Great Britain)
- **Schedule 1**: no recognised medicinal use (for example, LSD); research licence only.
- **Schedule 2**: for example, morphine, diamorphine, oxycodone, fentanyl, methadone, methylphenidate: full controls, safe custody, CD register.
- **Schedule 3**: for example, buprenorphine, midazolam, temazepam, gabapentin, pregabalin, tramadol: prescription requirements; some need safe custody.
- **Schedule 4**: for example, most benzodiazepines; lighter controls.
- **Schedule 5**: low-strength preparations (for example, some codeine products).
H: In hospitals (follow local policy)
- Stored in a locked CD cupboard meeting safe custody requirements; keys held by the registered nurse in charge.
- Recorded in a **CD register**: receipt, administration, balance, and destruction, in ink, in chronological order, with no alterations or crossings out (errors corrected by annotation).
- Administration of Schedule 2 CDs is usually witnessed and signed by two registered professionals (one of whom is the administering registrant), as local policy requires.
- Regular stock checks; any discrepancy is reported immediately to the nurse in charge and pharmacy.
- Destruction of unwanted stock is witnessed by an authorised person.
H: Governance
P: Organisations have a **Controlled Drugs Accountable Officer**, and local intelligence networks share concerns about CD misuse. Diversion of CDs by staff is a criminal offence and an NMC fitness to practise matter.
K: If the CD balance doesn't match, stop, recount with a colleague, and report at once.
Q: Give three examples of Schedule 2 controlled drugs. | Morphine, diamorphine, oxycodone, fentanyl, methadone, methylphenidate (any three).
Q: What must a CD register entry include? | Date, time, patient name, drug, dose given, signatures of the administering and witnessing professionals, and the running balance, in ink.
M1#nursing-u04-22-q1@1: Who normally holds the CD keys on a hospital ward? | The registered nurse in charge (or delegated registrant) | Any healthcare support worker | The ward clerk | The patient's family | The porter | CD keys are held by a registered professional, as policy specifies.
M2#nursing-u04-22-q2@2: During a CD check, two ampoules of morphine are missing compared with the register. What should the nurse do? | Recount with a witness and report it now | Adjust the balance so that it matches | Wait until the next scheduled CD check | Borrow stock from another ward to cover it | Ignore it if the amount is small | Discrepancies must be investigated and reported without delay.

## Antimicrobials
S: Antimicrobials (antibiotics, antivirals, antifungals and antiparasitic drugs) treat infections. Using them correctly saves lives; using them poorly causes harm and antimicrobial resistance.
O: Describe main antibiotic groups and other antimicrobials
O: Use antimicrobials safely, including review and duration
T: Antimicrobial | A medicine that kills or inhibits microorganisms
T: Broad-spectrum antibiotic | An antibiotic active against many types of bacteria
SUM: Antimicrobials save lives but misuse causes harm and resistance.
SUM: Every prescription needs an indication and review date.
SRC: National Institute for Health and Care Excellence, Antimicrobial stewardship (NG15) | guidance | 2015 | https://www.nice.org.uk/guidance/ng15
SRC: UK Health Security Agency, Start smart then focus | guidance | 2023 | https://www.gov.uk/government/publications/antimicrobial-stewardship-start-smart-then-focus
H: Main antibiotic groups
- **Penicillins** (amoxicillin, flucloxacillin, piperacillin with tazobactam): penicillin allergy is the commonest reported drug allergy.
- **Cephalosporins** (cefalexin, ceftriaxone).
- **Macrolides** (clarithromycin, erythromycin, azithromycin): interactions and QT prolongation.
- **Tetracyclines** (doxycycline): avoid in pregnancy and young children; take with water, upright.
- **Aminoglycosides** (gentamicin): narrow therapeutic index; monitor levels and kidney function.
- **Glycopeptides** (vancomycin): monitor levels.
- **Quinolones** (ciprofloxacin, levofloxacin): restricted use because of rare serious effects, including tendon damage.
- **Nitrofurantoin**, **trimethoprim**: common for urinary tract infections.
H: Safe use
- Take cultures before starting where possible, but don't delay treatment in sepsis.
- Give on time: missed or late doses reduce effectiveness.
- Review at 48–72 hours (in England, the "Start Smart then Focus" approach): stop, switch IV to oral, change, continue, or consider outpatient therapy.
- Watch for diarrhoea: **Clostridioides difficile** infection is a risk, especially with broad-spectrum antibiotics.
H: Antivirals and antifungals
P: For example, aciclovir (herpes viruses), oseltamivir (influenza), and fluconazole and nystatin (fungal infections). Fluconazole has many interactions.
K: Every antimicrobial prescription should have an indication, a duration or review date, and be reviewed.
Q: What does "Start Smart then Focus" involve? | Starting appropriate antimicrobials promptly, then reviewing at 48–72 hours to stop, switch, change, continue or move to outpatient therapy.
Q: Which antibiotic group needs blood level monitoring because of a narrow therapeutic index? | Aminoglycosides (such as gentamicin); glycopeptides such as vancomycin are also monitored.
M1#nursing-u04-23-q1@1: Which infection risk increases with broad-spectrum antibiotics? | Clostridioides difficile infection | Influenza | Pneumothorax | Hypoglycaemia | Gout | Antibiotics disrupt gut flora, allowing C. difficile to flourish.
M2#nursing-u04-23-q2@2: A patient on IV antibiotics for 3 days is now eating, has normal observations and is improving. What should the nurse prompt? | A review: switch to oral, change or stop | Continuing IV antibiotics indefinitely | Stopping the antibiotic without any review | Doubling the dose to clear the infection | Adding a second antibiotic for cover | Review at 48–72 hours is a stewardship principle.

## Analgesics
S: Analgesics relieve pain. Choosing the right one, at the right dose and time, and monitoring for effect and harm, are central nursing roles.
O: Describe non-opioid, opioid and adjuvant analgesics
O: Monitor for analgesic effect and harm
T: Opioid | A medicine acting on opioid receptors to relieve pain
T: Naloxone | An opioid antagonist used to reverse opioid toxicity
SUM: Choose analgesia by pain type and severity.
SUM: Monitor sedation and breathing on opioids; watch for duplicate paracetamol.
SRC: Joint Formulary Committee, British National Formulary: analgesics | guidance | 2026 | https://bnf.nice.org.uk/
SRC: Faculty of Pain Medicine, Opioids Aware | guidance | 2023 | https://fpm.ac.uk/opioids-aware
H: Non-opioids
- **Paracetamol**: effective for mild to moderate pain and fever. Maximum daily dose limits apply and are lower for people with low body weight, liver disease or other risk factors: check the BNF and the prescription, and check all sources (many combination products contain paracetamol).
- **NSAIDs** (ibuprofen, naproxen): anti-inflammatory; risks include gastrointestinal bleeding, kidney injury, cardiovascular events and worsening asthma in some people. Use the lowest effective dose for the shortest time; consider gastroprotection.
H: Opioids
- **Weak**: codeine, dihydrocodeine (and tramadol, with serotonergic effects).
- **Strong**: morphine, oxycodone, fentanyl, diamorphine, buprenorphine.
- Side effects: nausea, constipation (prescribe a laxative), drowsiness, respiratory depression, confusion, dependence.
- **Naloxone** reverses opioid toxicity; it is short-acting, so repeat doses or an infusion may be needed.
- Check the formulation: immediate-release and modified-release opioids are different. Confusing them is a recognised cause of serious harm.
H: Adjuvants and approaches
- For neuropathic pain: amitriptyline, duloxetine, gabapentin, pregabalin (gabapentinoids are controlled drugs with misuse potential).
- The WHO analgesic ladder (for cancer pain) and multimodal analgesia after surgery; non-drug approaches such as positioning, heat, cold and distraction.
H: Monitoring
P: Assess pain, sedation and respiratory rate after opioid doses; use a sedation score where policy requires. Increasing sedation is an earlier warning than a falling respiratory rate.
K: Check whether a person on regular paracetamol is also getting it in a combination product, to avoid accidental overdose.
Q: Name four common side effects of opioids. | Nausea and vomiting, constipation, drowsiness, respiratory depression, confusion, itching (any four).
Q: What reverses opioid toxicity? | Naloxone, which may need repeating because it is shorter-acting than many opioids.
M1#nursing-u04-24-q1@1: Which is a major risk of NSAIDs? | Gastrointestinal bleeding | Hypoglycaemia | Hair loss | Hearing improvement | Weight gain | NSAIDs inhibit protective prostaglandins in the stomach.
M2#nursing-u04-24-q2@2: A patient on regular paracetamol asks for a "cold and flu" sachet. What should the nurse check? | Whether it contains paracetamol | Nothing; it's a GSL product | Only the flavour of the medicine | Whether the patient likes the taste | Whether it's best taken with alcohol | Many over-the-counter remedies contain paracetamol.

## Cardiovascular medicines
S: Cardiovascular medicines treat hypertension, heart failure, angina, arrhythmias and high cholesterol, and prevent heart attacks and strokes. Many need monitoring of pulse, blood pressure, kidney function or electrolytes.
O: Describe the main groups of cardiovascular medicines
O: Monitor pulse, blood pressure and blood results before and after giving them
T: Beta-blocker | A drug that blocks beta-adrenoceptors, slowing heart rate
T: ACE inhibitor | A drug that blocks angiotensin-converting enzyme, lowering blood pressure
SUM: Cardiovascular medicines treat hypertension, heart failure, angina and arrhythmias.
SUM: Check pulse before rate-slowing medicines; monitor kidney function and potassium.
SRC: National Institute for Health and Care Excellence, Chronic heart failure in adults (NG106) | guidance | 2018 | https://www.nice.org.uk/guidance/ng106
SRC: National Institute for Health and Care Excellence, Hypertension in adults (NG136) | guidance | 2019 | https://www.nice.org.uk/guidance/ng136
H: Main groups
- **ACE inhibitors** (ramipril, lisinopril): lower blood pressure, protect the heart and kidneys. Side effects: dry cough, hyperkalaemia, kidney impairment, angioedema (rare). Pause during acute dehydrating illness as advised.
- **Angiotensin receptor blockers (ARBs)** (losartan, candesartan): similar effects, without the cough.
- **Beta-blockers** (bisoprolol, atenolol): slow the heart and lower blood pressure. Check pulse and blood pressure; caution in asthma; don't stop abruptly.
- **Calcium channel blockers** (amlodipine; verapamil and diltiazem, which also slow the heart): ankle swelling, flushing.
- **Diuretics**: loop (furosemide) for fluid overload; thiazide-like (indapamide) for hypertension. Monitor fluid balance, weight, potassium and sodium.
- **Statins** (atorvastatin, simvastatin): lower cholesterol. Report unexplained muscle pain.
- **Nitrates** (glyceryl trinitrate spray or tablets for angina): headache, low blood pressure; contraindicated with sildenafil-type drugs.
- **Antiplatelets** (aspirin, clopidogrel, ticagrelor): bleeding risk.
- **Digoxin**: for atrial fibrillation and heart failure; narrow therapeutic index. Check pulse; withhold and escalate if the pulse is below the threshold the prescriber or policy sets. Toxicity signs: nausea, vomiting, visual disturbance, confusion, arrhythmias; risk increases with low potassium.
H: Monitoring
- Pulse and blood pressure (including lying and standing), daily weights in heart failure, fluid balance, urea and electrolytes.
K: Check the pulse before giving rate-slowing medicines such as beta-blockers, digoxin, verapamil and diltiazem.
Q: Name two side effects of ACE inhibitors. | Dry cough, hyperkalaemia, kidney impairment, low blood pressure, angioedema (any two).
Q: Name three signs of digoxin toxicity. | Nausea or vomiting, visual disturbance (yellow-green vision), confusion, bradycardia or arrhythmias (any three).
M1#nursing-u04-25-q1@1: Which medicine group commonly causes a persistent dry cough? | ACE inhibitors | ARBs | Statins | Calcium channel blockers | Loop diuretics | ACE inhibitors increase bradykinin, causing cough in some people.
M2#nursing-u04-25-q2@2: Before giving bisoprolol, the nurse finds the pulse is 46 and the patient feels dizzy. What should the nurse do? | Withhold, assess and inform the prescriber | Give the dose exactly as prescribed | Give half the dose as a compromise | Give it and recheck the pulse tomorrow | Ask the patient to walk around first | Bradycardia with symptoms is a reason to withhold a beta-blocker and seek review.

## Respiratory medicines
S: Respiratory medicines treat asthma, COPD and other lung conditions, mostly by opening the airways, reducing inflammation, or treating infection. Oxygen is also a medicine and must be prescribed.
O: Describe bronchodilators, anti-inflammatories and oxygen therapy
O: Give respiratory medicines and oxygen safely in acute exacerbations
T: Bronchodilator | A medicine that relaxes airway smooth muscle
T: Target saturation | The prescribed SpO2 range for oxygen therapy
SUM: Bronchodilators and inhaled steroids are the mainstay of asthma and COPD treatment.
SUM: Oxygen is prescribed to a target saturation.
SRC: British Thoracic Society, Guideline for oxygen use in healthcare and emergency settings | guidance | 2017 | https://www.brit-thoracic.org.uk/
SRC: National Institute for Health and Care Excellence, Chronic obstructive pulmonary disease in over 16s (NG115) | guidance | 2019 | https://www.nice.org.uk/guidance/ng115
H: Bronchodilators
- **Short-acting beta-2 agonists** (salbutamol): fast relief. Side effects: tremor, tachycardia, palpitations, low potassium at high doses.
- **Long-acting beta-2 agonists** (formoterol, salmeterol): always used with an inhaled corticosteroid in asthma, never alone.
- **Antimuscarinics**: short-acting (ipratropium) and long-acting (tiotropium); dry mouth, urinary retention.
- **Theophylline** and **aminophylline**: narrow therapeutic index; many interactions; levels monitored.
H: Anti-inflammatories
- **Inhaled corticosteroids**: reduce airway inflammation; rinse the mouth after use.
- **Oral corticosteroids** (prednisolone): for exacerbations; side effects include raised blood glucose, mood changes and, with longer courses, adrenal suppression (don't stop suddenly after long-term use).
- **Leukotriene receptor antagonists** (montelukast): note the warning about neuropsychiatric reactions.
H: Oxygen
- Prescribe with a **target saturation range** (BTS): 94–98% for most, 88–92% for people at risk of hypercapnic respiratory failure.
- Choose the delivery device to meet the target; monitor and adjust; document.
- Oxygen is a fire risk: no smoking or naked flames near it.
H: Acute exacerbations
P: Nebulised bronchodilators, oxygen to target, oral or IV steroids and antibiotics if infection is suspected, with close monitoring and escalation. Severe or life-threatening asthma is an emergency.
K: Oxygen is prescribed to a target, not to a fixed number of litres.
Q: Why should a LABA never be used alone in asthma? | Using a LABA without an inhaled corticosteroid increases the risk of serious asthma attacks.
Q: What are the target saturation ranges in BTS guidance? | 94–98% for most acutely ill adults; 88–92% for those at risk of hypercapnic respiratory failure.
M1#nursing-u04-26-q1@1: Which side effect is common with high-dose salbutamol? | Tremor and tachycardia | Bradycardia | Constipation | Hair loss | Weight gain | Beta-2 stimulation causes tremor and a fast heart rate.
M3#nursing-u04-26-q2@2: A patient with COPD at risk of hypercapnic respiratory failure has SpO2 97% on 4 L/min oxygen and is becoming drowsy. What should the nurse do? | Reduce oxygen to target and escalate urgently | Increase the oxygen further to be safe | Leave the oxygen, as saturation is good | Remove the oxygen completely right away | Give a sedative to calm the breathing | Over-oxygenation can worsen hypercapnia in at-risk patients.

## Endocrine medicines
S: Endocrine medicines replace or modify hormones. Many are taken long term and need careful timing, monitoring and education, and some must never be stopped suddenly.
O: Describe thyroid, corticosteroid and other endocrine medicines
O: Recognise and prevent adrenal crisis
T: Adrenal crisis | A life-threatening state of acute cortisol deficiency
T: Steroid emergency card | A card identifying people at risk of adrenal crisis
SUM: Many endocrine medicines need careful timing and monitoring.
SUM: Never stop long-term steroids abruptly; adrenal crisis is an emergency.
SRC: NHS England, National Patient Safety Alert: steroid emergency card to support early recognition and treatment of adrenal crisis in adults | guidance | 2020 | https://www.england.nhs.uk/
SRC: Society for Endocrinology, Adrenal crisis guidance | guidance | 2020 | https://www.endocrinology.org/adrenal-crisis
H: Thyroid
- **Levothyroxine** (hypothyroidism): take on an empty stomach, usually 30–60 minutes before breakfast, separate from calcium and iron; dose adjusted by thyroid function tests.
- **Carbimazole** (hyperthyroidism): warn about sore throat, fever or mouth ulcers, which may signal a rare but serious drop in white cells (agranulocytosis); report immediately.
H: Corticosteroids
- Prednisolone, hydrocortisone, dexamethasone: anti-inflammatory and immunosuppressive.
- Long-term use suppresses the body's own cortisol: don't stop suddenly; people on long-term steroids may need a **steroid emergency card** and "sick day rules" (extra doses during illness, as advised).
- Side effects: raised blood glucose, infection risk, osteoporosis, mood changes, weight gain, thin skin.
H: Other endocrine medicines
- **Hormone replacement therapy** and **hormonal contraception**: venous thromboembolism risk; interactions with enzyme inducers.
- **Bisphosphonates** (alendronic acid) for osteoporosis: strict administration instructions.
- **Fludrocortisone**, **desmopressin** and others in specialist use.
- Diabetes medicines are covered in their own lesson.
H: Adrenal crisis
P: People with adrenal insufficiency, or on long-term steroids, can develop adrenal crisis during illness, injury or surgery: severe weakness, vomiting, low blood pressure and confusion. It is an emergency treated with parenteral hydrocortisone. Never omit steroid doses in hospital.
K: Never stop long-term steroids abruptly, and never omit them in hospital without a prescriber's decision.
Q: When should levothyroxine be taken? | On an empty stomach, usually 30–60 minutes before breakfast, separate from calcium and iron.
Q: Why should a person on carbimazole report a sore throat? | It may signal agranulocytosis, a rare but serious fall in white blood cells.
M1#nursing-u04-27-q1@1: Which is a common side effect of long-term corticosteroids? | Raised blood glucose | Low blood pressure | Hair growth only | Weight loss | Improved bone density | Steroids raise blood glucose and have many other effects.
M3#nursing-u04-27-q2@2: A patient on long-term prednisolone is nil by mouth before surgery, and their morning dose has been omitted. What should the nurse do? | Inform the prescriber so steroid cover is given | Leave it until they're eating again | Give double the dose tomorrow instead | Give it orally despite being nil by mouth | Do nothing, as one missed dose is safe | Steroid-dependent patients need cover when they can't take oral doses.

## Gastrointestinal medicines
S: Gastrointestinal medicines treat acid-related disease, nausea and vomiting, constipation, diarrhoea and inflammatory bowel disease. Many are used every day on wards, and each has its own safety points.
O: Describe acid-suppressing, antiemetic, laxative and antidiarrhoeal medicines
O: Check bowel history and red flags before giving GI medicines
T: Proton pump inhibitor | A drug that reduces stomach acid by blocking the proton pump
T: Osmotic laxative | A laxative that draws water into the bowel
SUM: GI medicines are used daily, each with safety points.
SUM: Know the bowel history and check for obstruction or infection first.
SAFE: Withhold laxatives and report to the prescriber if there are signs of bowel obstruction; don't give antidiarrhoeals in suspected infective diarrhoea (such as C. difficile) without medical review.
SRC: Joint Formulary Committee, British National Formulary: gastro-intestinal system | guidance | 2026 | https://bnf.nice.org.uk/
SRC: National Institute for Health and Care Excellence, Constipation (CKS) | guidance | 2024 | https://cks.nice.org.uk/topics/constipation/
H: Acid suppression
- **Proton pump inhibitors** (omeprazole, lansoprazole): treat and prevent ulcers and reflux; long-term use is linked to C. difficile, low magnesium and fractures; review regularly.
- **Antacids and alginates**: short-term relief; interact with absorption of other medicines.
H: Antiemetics
- **Cyclizine**: antihistamine; drowsiness, dry mouth.
- **Ondansetron**: constipation, headache; can prolong the QT interval.
- **Metoclopramide**: prokinetic; risk of extrapyramidal side effects, so use is limited in dose and duration (usually up to 5 days); avoid in Parkinson's disease and bowel obstruction.
- **Haloperidol** and **levomepromazine**: often used in palliative care.
H: Laxatives
- **Bulk-forming** (ispaghula): need good fluid intake.
- **Osmotic** (lactulose, macrogols): draw water into the bowel.
- **Stimulant** (senna, bisacodyl): increase motility; useful with opioids.
- **Softeners** (docusate).
- Prescribe a laxative with regular opioids.
H: Antidiarrhoeals
P: Loperamide slows the gut. Don't use it without review in suspected infective diarrhoea, particularly C. difficile, or bloody diarrhoea. Isolate and send a stool sample per policy.
K: Before giving a laxative or antidiarrhoeal, know the bowel history and check for red flags such as obstruction or infection.
Q: Name the four main types of laxative. | Bulk-forming, osmotic, stimulant and softeners.
Q: Why is metoclopramide limited in dose and duration? | Because of the risk of extrapyramidal side effects such as acute dystonia and tardive dyskinesia.
M1#nursing-u04-28-q1@1: Which antiemetic can prolong the QT interval? | Ondansetron | Cyclizine | Senna | Lactulose | Omeprazole | Ondansetron is associated with QT prolongation.
M3#nursing-u04-28-q2@2: A patient with new watery diarrhoea who has recently had antibiotics asks for loperamide. What should the nurse do? | Withhold loperamide, isolate and send a sample | Give the loperamide as the patient requested | Give a laxative to clear the bowel | Restrict all fluids to reduce the diarrhoea | Ignore it as a common antibiotic side effect | Loperamide can be dangerous in infective diarrhoea, especially C. difficile.

## Neurological and psychiatric medicines
S: Medicines for epilepsy, Parkinson's disease, dementia, depression, psychosis, bipolar disorder and anxiety are often long term and some have serious risks. Timing, monitoring and safety warnings are especially important.
O: Describe medicines for epilepsy, Parkinson's disease and mental health conditions
O: Give time-critical doses and monitor for serious risks
T: Lithium | A mood stabiliser with a narrow therapeutic range needing level monitoring
T: Serotonin syndrome | A potentially serious reaction to excess serotonergic activity
SUM: Parkinson's and antiepileptic doses are time-critical.
SUM: Lithium, antipsychotics and benzodiazepines need monitoring.
SRC: Parkinson's UK, Get It On Time | guidance | 2023 | https://www.parkinsons.org.uk/
SRC: National Institute for Health and Care Excellence, Epilepsies in children, young people and adults (NG217) | guidance | 2022 | https://www.nice.org.uk/guidance/ng217
SRC: National Institute for Health and Care Excellence, Bipolar disorder (CG185) | guidance | 2023 | https://www.nice.org.uk/guidance/cg185
H: Antiepileptics
- Levetiracetam, lamotrigine, carbamazepine, phenytoin, sodium valproate.
- Never omit or delay doses; seizures can result. Brand consistency matters for some (for example, carbamazepine, phenytoin).
- **Sodium valproate** carries serious risks in pregnancy (birth defects and developmental disorders); in the UK it must not be started in anyone under 55 unless specific conditions are met, and a pregnancy prevention programme applies. Check current MHRA guidance.
H: Parkinson's medicines
- Levodopa preparations (co-careldopa, co-beneldopa) and dopamine agonists: **time-critical**; give within the prescribed time window. Missed doses can cause severe rigidity, swallowing problems and a rare, dangerous syndrome.
H: Antidepressants
- **SSRIs** (sertraline, citalopram): nausea, hyponatraemia in older people, bleeding risk with NSAIDs or anticoagulants, serotonin syndrome with other serotonergic drugs.
- Monitor for worsening mood or suicidal thoughts when starting, especially in young people.
H: Antipsychotics
- Haloperidol, olanzapine, risperidone, quetiapine, clozapine.
- Side effects: extrapyramidal symptoms, weight gain, diabetes, QT prolongation, sedation.
- **Clozapine**: risk of neutropenia, requiring regular blood monitoring; constipation can be life-threatening.
- **Neuroleptic malignant syndrome**: fever, rigidity, confusion, autonomic instability: an emergency.
H: Lithium
- Narrow therapeutic index; regular levels, kidney and thyroid function. Toxicity: vomiting, diarrhoea, coarse tremor, confusion. Risk increases with dehydration, NSAIDs, ACE inhibitors and diuretics.
H: Benzodiazepines and Z-drugs
P: Sedation, falls, respiratory depression with opioids, dependence and withdrawal. Use short term.
K: Parkinson's and antiepileptic doses are time-critical. Get them on time, every time.
Q: Why are Parkinson's medicines time-critical? | Late or missed doses can cause rapid loss of mobility, swallowing problems and serious complications.
Q: Name three signs of lithium toxicity. | Vomiting or diarrhoea, coarse tremor, confusion, ataxia, drowsiness (any three).
M1#nursing-u04-29-q1@1: Which medicine requires regular blood monitoring for neutropenia? | Clozapine | Sertraline | Levetiracetam | Co-careldopa | Lorazepam | Clozapine can cause agranulocytosis (a dangerous fall in neutrophils), so regular full blood counts are required under a monitoring scheme.
M3#nursing-u04-29-q2@2: A patient on lithium has had vomiting and diarrhoea for two days and now has a coarse tremor and confusion. What should the nurse do? | Possible lithium toxicity: withhold and escalate | Give the next dose as normal and observe | Encourage a large meal to settle the stomach | Add an NSAID to help with the discomfort | Wait for the routine level next month | Dehydration raises lithium levels; toxicity is an emergency.

## Anticoagulants
S: Anticoagulants reduce blood clotting to prevent and treat venous thromboembolism and to prevent stroke in atrial fibrillation. They are high-risk medicines: too much causes bleeding, too little causes clots.
O: Describe types of anticoagulant
O: Give anticoagulants safely and respond to bleeding
T: Direct oral anticoagulant | An oral anticoagulant such as apixaban that directly inhibits a clotting factor
T: INR | International normalised ratio, used to monitor warfarin
SUM: Anticoagulants are high-risk: too much causes bleeding, too little clots.
SUM: Check indication, dose and results before every dose.
SRC: National Institute for Health and Care Excellence, Venous thromboembolism in over 16s: reducing the risk (NG89) | guidance | 2018 | https://www.nice.org.uk/guidance/ng89
SRC: National Patient Safety Agency, Actions that can make anticoagulant therapy safer | guidance | 2007
H: Types
- **Warfarin**: a vitamin K antagonist. Dosing guided by the **INR**; many drug and food interactions (vitamin K, alcohol, antibiotics). Reversal: vitamin K and, in serious bleeding, prothrombin complex concentrate, as directed.
- **Direct oral anticoagulants (DOACs)**: apixaban, rivaroxaban, edoxaban, dabigatran. Fixed doses adjusted for kidney function, age and weight; fewer interactions; specific reversal agents exist for some.
- **Heparins**: unfractionated heparin (IV infusions, monitored with blood tests) and low molecular weight heparins (enoxaparin, dalteparin), given subcutaneously; dose by weight and kidney function. Rare risk: heparin-induced thrombocytopenia.
H: Safe practice
- Check the indication, dose, kidney function, weight, INR (for warfarin) and platelet count as required.
- Confirm when the last dose was given, especially around procedures; anticoagulants are often paused before surgery under a plan.
- Give an anticoagulant alert card and information booklet; teach signs of bleeding.
- VTE risk assessment on admission, with prophylaxis as prescribed.
H: Bleeding
P: Signs include bruising, blood in urine or stools (or black stools), nosebleeds, bleeding gums, vomiting blood, severe headache, and confusion after a fall (possible intracranial bleed). Escalate urgently.
K: Every anticoagulant dose needs a check of the indication, the dose and the latest relevant results.
Q: Which blood test guides warfarin dosing? | The INR (international normalised ratio).
Q: Name four DOACs. | Apixaban, rivaroxaban, edoxaban and dabigatran.
M1#nursing-u04-30-q1@1: Which food can reduce warfarin's effect if intake changes markedly? | Leafy green vegetables high in vitamin K | Bread | Rice | Chicken | Apples | Warfarin works by blocking vitamin K-dependent clotting factors, so a big change in vitamin K intake (for example, leafy greens) changes the INR.
M3#nursing-u04-30-q2@2: A patient on apixaban falls and hits their head. They seem well. What should the nurse do? | Follow the post-fall policy, given bleeding risk | Help them back to bed and carry on as usual | Give their next apixaban dose a little early | Give vitamin K without any medical review | Document the fall only and take no action | Anticoagulated patients with head injuries need urgent assessment.

## Insulin and diabetes medicines
S: Diabetes medicines lower blood glucose. Insulin is a high-alert medicine: errors in type, dose, timing or abbreviation can cause severe hypoglycaemia or diabetic ketoacidosis.
O: Describe insulin types and other diabetes medicines
O: Give insulin safely and treat hypoglycaemia
T: Hypoglycaemia | Blood glucose below 4.0 mmol/L
T: Basal insulin | Long-acting insulin that provides background cover
SUM: Insulin is a high-alert medicine; write "units" in full.
SUM: Treat hypoglycaemia promptly using local protocol.
SRC: Joint British Diabetes Societies for Inpatient Care, The hospital management of hypoglycaemia in adults with diabetes mellitus | guidance | 2022 | https://abcd.care/joint-british-diabetes-societies-jbds-inpatient-care-group
SRC: National Institute for Health and Care Excellence, Type 1 diabetes in adults (NG17) | guidance | 2022 | https://www.nice.org.uk/guidance/ng17
H: Insulin
- Types: rapid-acting (insulin aspart, lispro), short-acting (soluble insulin), intermediate (isophane), long-acting (glargine, detemir, degludec) and premixed.
- **Always write "units" in full**: "U" or "IU" can be misread as a zero or a 10.
- Use insulin pens or insulin syringes only; never draw insulin from a pen or cartridge into a standard syringe.
- Check blood glucose before giving; match timing to meals as prescribed.
- Don't omit long-acting insulin in people with type 1 diabetes, even if they're not eating: they need basal insulin to prevent ketoacidosis.
- Support people to self-manage in hospital where safe and agreed.
H: Other diabetes medicines
- **Metformin**: first line in type 2; gastrointestinal side effects; pause in acute kidney injury, dehydration and before some contrast procedures as advised.
- **Sulphonylureas** (gliclazide): hypoglycaemia risk.
- **SGLT2 inhibitors** (dapagliflozin, empagliflozin): risk of diabetic ketoacidosis even with near-normal glucose; pause during acute illness or surgery as advised.
- **DPP-4 inhibitors** (sitagliptin), **GLP-1 receptor agonists** (semaglutide, liraglutide).
H: Hypoglycaemia (blood glucose below 4.0 mmol/L)
- Signs: sweating, shaking, hunger, confusion, behaviour change, drowsiness, seizures.
- If conscious and able to swallow: fast-acting carbohydrate (15–20 g), recheck after 10–15 minutes, repeat if still low, then give a longer-acting carbohydrate. If unconscious or unable to swallow: call for help and follow the local hypoglycaemia protocol (for example, IV glucose or IM glucagon).
- Find the cause and review the medicines.
K: Write "units", never "U", and only use insulin devices for insulin.
Q: What blood glucose level defines hypoglycaemia in people with diabetes? | Below 4.0 mmol/L ("four is the floor").
Q: Why must long-acting insulin not be omitted in type 1 diabetes? | Without basal insulin, diabetic ketoacidosis can develop within hours.
M1#nursing-u04-31-q1@1: Why must "units" be written in full on a prescription? | "U" or "IU" can be misread as a zero or a 10, causing a tenfold overdose | It's quicker to read | Pharmacists prefer it | It's a legal requirement for all drugs | So the patient knows the brand | Abbreviation of units is a recognised cause of serious insulin errors.
M2#nursing-u04-31-q2@2: A patient with type 2 diabetes on gliclazide is sweaty and confused; capillary glucose is 3.1 mmol/L. They can swallow. What should the nurse do first? | Give 15–20 g fast-acting carbohydrate and recheck | Give their next gliclazide dose now | Give a dose of insulin straight away | Wait an hour and recheck the glucose | Give a low-sugar drink and leave them | Prompt treatment of hypoglycaemia is essential.

## Polypharmacy
S: Polypharmacy is the use of multiple medicines. It is often appropriate, but "problematic polypharmacy" (medicines whose harms outweigh benefits, or that no longer help) increases adverse effects, falls, confusion, hospital admission and treatment burden.
O: Explain why polypharmacy happens and when it becomes problematic
O: Contribute to medication review and deprescribing
T: Problematic polypharmacy | Multiple medicines whose harms outweigh benefits or that no longer help
T: Deprescribing | Planned reduction or stopping of medicines that are no longer appropriate
SUM: Polypharmacy is often appropriate but can cause harm.
SUM: Every medicine needs a current reason; ask for review if unclear.
SRC: National Institute for Health and Care Excellence, Multimorbidity: clinical assessment and management (NG56) | guidance | 2016 | https://www.nice.org.uk/guidance/ng56
SRC: Duerden M, Avery T, Payne R, Polypharmacy and medicines optimisation, The King's Fund | primary | 2013 | https://www.kingsfund.org.uk/insight-and-analysis/reports/polypharmacy-and-medicines-optimisation
H: Why it happens
- Multiple long-term conditions, each with its own guidelines.
- Prescribing cascades: a side effect treated with another medicine (for example, ankle swelling from amlodipine treated with a diuretic).
- Medicines started for short-term problems but never stopped.
- Care across many settings and prescribers.
H: Reducing harm
- **Structured medication reviews** with the person: what matters to them, what each medicine is for, whether it's still needed.
- Tools such as **STOPP/START** criteria (for older people), the anticholinergic burden scale, and national polypharmacy guidance.
- **Deprescribing**: planned, supervised reduction or stopping of medicines, with monitoring.
- Simplify regimens, use compliance aids only where appropriate, and coordinate with community pharmacy.
H: The nurse's role
- Notice possible adverse effects (falls, confusion, constipation, low blood pressure) and link them to medicines.
- Ask people about their experience and what they actually take.
- Flag medicines for review, and share information at transitions.
K: Every medicine should have a current reason. If no one knows why it was started, ask for a review.
Q: What is a prescribing cascade? | When a side effect of one medicine is mistaken for a new condition and treated with another medicine.
Q: What do STOPP/START criteria help with? | Identifying potentially inappropriate medicines (STOPP) and potentially beneficial omitted medicines (START) in older people.
M1#nursing-u04-32-q1@1: Which is most likely to be a sign of problematic polypharmacy in an older person? | New falls and confusion after medicine changes | Improved mobility | Stable blood pressure | Better sleep with no side effects | Weight gain from improved appetite | Falls and confusion often relate to medicines.
M2#nursing-u04-32-q2@2: A patient on 14 medicines says they don't know why they take half of them and feel dizzy. What should the nurse do? | Request a medication review and record the dizziness | Tell them to stop the ones they don't understand | Reassure them that dizziness is normal at their age | Add another medicine to treat the dizziness | Do nothing until they are discharged home | A review can identify medicines to stop or change safely.

## Medicines safety
S: Medicines safety is about designing systems and habits that prevent medication harm. Most errors are caused by system weaknesses, not careless individuals, though everyone has a role.
O: Identify high-alert medicines and never events
O: Use safety barriers and a speaking-up culture to prevent harm
T: High-alert medicine | A medicine with a heightened risk of significant harm when used in error
T: Never event | A serious, largely preventable incident that shouldn't occur if safeguards are in place
SUM: Most errors come from system weaknesses.
SUM: Safety barriers and speaking up prevent harm.
SRC: World Health Organization, Medication Without Harm: global patient safety challenge | guidance | 2017 | https://www.who.int/initiatives/medication-without-harm
SRC: NHS England, Never Events policy and framework | guidance | 2018 | https://www.england.nhs.uk/patient-safety/never-events/
H: High-alert medicines
- Medicines with a higher risk of serious harm when used in error: insulin, anticoagulants, opioids, concentrated potassium, chemotherapy, IV infusions with narrow margins, methotrexate.
- Extra safeguards: independent double checks, standard concentrations, restricted storage, dose error reduction software.
H: Never events (England examples)
- Wrong-route administration of medicines (for example, IV administration of an oral liquid, or intrathecal vincristine).
- Overdose of insulin due to abbreviations or the wrong device.
- Mis-selection of strong potassium solutions.
- Overdose of methotrexate for non-cancer treatment.
- These are serious, largely preventable incidents with strong barriers available; check the current national list.
H: Safety barriers
- Electronic prescribing and barcode scanning.
- Tall-man lettering for look-alike names (for example, predniSOLONE and prednisONE).
- Oral and enteral syringes that can't connect to IV lines.
- Separate storage of look-alike packaging.
- Reducing interruptions during medicine rounds.
H: Culture
P: The WHO's *Medication Without Harm* challenge and national patient safety strategies promote open reporting, learning and a just culture, where people can speak up about risks without fear.
P: **Investigate with the lab.** Convert between micrograms, milligrams and grams in the calculator before working out each dose.
IX: calculations
K: If something feels wrong about a medicine, stop and check. Speaking up is a safety barrier.
Q: Name four high-alert medicines. | Insulin, anticoagulants, opioids, concentrated potassium, chemotherapy, methotrexate (any four).
Q: What is tall-man lettering? | Using capital letters to highlight differences between look-alike drug names (for example, predniSOLONE and prednisONE).
M1#nursing-u04-33-q1@1: Which design feature prevents oral liquids being given intravenously? | Oral or enteral syringes that can't connect to IV devices | Coloured labels only | Smaller bottles | Larger print on the chart | Separate drug rounds | Physical barriers prevent wrong-route connection.
M2#nursing-u04-33-q2@2: A nurse notices two look-alike vials of different strengths stored next to each other. What should they do? | Separate them now and report the risk | Leave them, as staff should read labels | Swap the labels round on the shelf | Remove one vial without telling anyone | Mention it at next month's team meeting | Reporting near misses and risks prevents future errors.
M2#nursing-u04-33-q3@1: How many micrograms are in 0.5 mg? | 500 micrograms | 50 micrograms | 5 micrograms | 5,000 micrograms | 1 mg = 1,000 micrograms, so 0.5 mg = 500 micrograms.

## Medication errors
S: A medication error is any preventable event that may cause or lead to inappropriate medicine use or harm. Errors can occur in prescribing, dispensing, preparing, administering or monitoring. How you respond matters as much as preventing them.
O: Describe types of medication error
O: Respond to an error safely and openly
T: Medication error | A preventable event that may cause inappropriate medicine use or harm
T: Near miss | An error caught before it reaches the person
SUM: Errors occur in prescribing, dispensing, preparing, giving and monitoring.
SUM: Patient safety first, then tell, document and report.
SRC: General Medical Council and Nursing and Midwifery Council, Openness and honesty when things go wrong | guidance | 2022 | https://www.nmc.org.uk/standards/guidance/the-professional-duty-of-candour/
SRC: Elliott RA and others, Economic analysis of the prevalence and clinical and economic burden of medication error in England, BMJ Quality and Safety 30(2):96–105 | primary | 2021
H: Types
- Wrong person, medicine, dose, route, time or formulation; omission; giving a medicine the person is allergic to; wrong calculation; failure to monitor.
H: If you make or discover an error
- **Ensure the person's safety first**: assess, take observations and call for help as needed.
- **Inform** the nurse in charge and the prescriber immediately.
- **Follow instructions** for monitoring or treatment.
- **Be open with the person** (duty of candour): explain and apologise.
- **Document** factually in the record.
- **Report** through the local incident system (for example, the national Learn from Patient Safety Events service in England).
- **Reflect and learn**, with support.
H: Learning, not blame
- Organisations should respond with a systems-focused review (in England, the Patient Safety Incident Response Framework), identifying contributing factors such as staffing, interruptions, packaging and design.
- The NMC expects openness: concealing an error is far more serious professionally than making one.
- Repeated errors may lead to supervised practice and support to rebuild competence.
H: Near misses
P: Report near misses (errors caught before reaching the person): they show where the system is weak.
K: Patient safety first, then tell, then document and report. Never hide an error.
Q: What is the first thing to do after discovering a medication error? | Make sure the person is safe: assess them and get help as needed.
Q: Why should near misses be reported? | They reveal system weaknesses so they can be fixed before harm occurs.
M1#nursing-u04-34-q1@1: Which is a near miss? | A wrong dose noticed and corrected before it is given | A medicine given to the wrong person | An omitted dose | A medicine given by the wrong route | An allergic reaction to a correctly given medicine | A near miss is caught before reaching the person.
M3#nursing-u04-34-q2@2: A nurse realises they gave a patient's 10 mg dose of a medicine as 100 mg an hour ago. What should they do first? | Assess the patient, get help, then inform | Document it at the end of the shift | Wait to see whether the patient is affected | Give another drug to counteract it | Change the chart to read 100 mg | Patient safety comes first; immediate escalation allows treatment.

## Patient education
S: Educating people about their medicines helps them take them safely and effectively, recognise side effects and make informed choices. Around half of people with long-term conditions don't take medicines as prescribed, often for understandable reasons.
O: Describe what to cover when teaching people about medicines
O: Use teach-back and support adherence
T: Teach-back | Asking the person to explain in their own words to check understanding
T: Adherence | The extent to which a person takes medicines as agreed
SUM: Education helps people take medicines safely and make informed choices.
SUM: Teach-back checks your explanation; non-adherence is common.
SAFE: Tell people which side effects to report and to whom, and refer questions you can't answer to the prescriber or pharmacist rather than guessing.
SRC: National Institute for Health and Care Excellence, Medicines adherence (CG76) | guidance | 2009 | https://www.nice.org.uk/guidance/cg76
SRC: World Health Organization, Adherence to long-term therapies: evidence for action | primary | 2003
H: What to cover
- What the medicine is for and how it helps.
- How and when to take it (with food, timing, technique for inhalers or injections).
- Common side effects and what to do; serious effects that need urgent help.
- Interactions (including alcohol and over-the-counter products).
- How long to take it, and what happens if they miss a dose.
- Monitoring needed (blood tests, blood pressure).
- Where to get more information and help (community pharmacy, GP, helplines).
H: How to teach
- Assess what the person already knows and what matters to them.
- Plain language, small chunks, written information in accessible formats.
- **Teach-back**: ask the person to explain in their own words.
- Involve carers with consent.
- Use professional interpreters.
H: Adherence
- Explore reasons for not taking medicines: side effects, beliefs, cost, complexity, forgetting, health literacy.
- Respect informed choices; support shared decision-making.
- Simplify regimens and consider aids, linking to routines, reminders and pharmacy services such as new medicine services.
K: Teach-back checks your explanation, not the person's intelligence.
Q: What is teach-back? | Asking the person to explain information in their own words to confirm they have understood it.
Q: Name three reasons people may not take medicines as prescribed. | Side effects, beliefs about the medicine, complexity, forgetting, cost, poor understanding (any three).
M1#nursing-u04-35-q1@1: Which is the best way to check understanding of new inhaler instructions? | Ask the person to show and explain how they'll use it | Ask "Do you understand?" | Give a leaflet only | Explain twice as quickly | Ask a relative only | Demonstration and teach-back confirm understanding.
M2#nursing-u04-35-q2@2: A patient says they stopped their statin because of muscle aches. What is the best response? | Acknowledge it and arrange a prescriber review | Tell them to restart without any discussion | Tell them that muscle aches are normal | Report them to the GP for non-adherence | Ignore it, as statins are always safe | Side effects are a valid reason to review the medicine.

## Medicines optimisation
S: Medicines optimisation is a person-centred approach to safe and effective medicine use, so that people get the best possible outcomes from their medicines. NICE guidance (NG5) sets out how systems and professionals should achieve this.
O: Describe the principles of medicines optimisation
O: Apply optimisation in practice and at discharge
T: Medicines optimisation | A person-centred approach to safe and effective use of medicines
T: Structured medication review | A clinical review of a person's medicines with them
SUM: Optimisation means the right medicines for this person now.
SUM: Communicate medicine changes clearly at discharge.
SAFE: At discharge, check changes with the prescriber or pharmacist and refer the person for community pharmacy follow-up where local schemes exist.
SRC: National Institute for Health and Care Excellence, Medicines optimisation (NG5) | guidance | 2015 | https://www.nice.org.uk/guidance/ng5
SRC: Royal Pharmaceutical Society, Medicines optimisation: helping patients to make the most of medicines | guidance | 2013 | https://www.rpharms.com/
H: Principles
- Understand the person's experience and what matters to them.
- Evidence-based choice of medicines.
- Make medicines use as safe as possible.
- Make medicines optimisation part of routine practice.
H: In practice
- **Shared decision-making** about starting, continuing and stopping medicines.
- **Medicines reconciliation** at every transfer of care.
- **Structured medication reviews**, especially for people with polypharmacy.
- **Communication** between hospital, GP and community pharmacy at discharge (for example, discharge medicines services).
- **Self-administration** schemes in hospital where safe.
- **Monitoring** outcomes and adverse effects.
H: Discharge
P: A large share of medication problems happen after discharge. Make sure the person understands any changes, has a supply, knows who to contact, and that the GP and community pharmacy receive accurate information.
K: Optimisation is not about using fewer or more medicines; it's about the right medicines for this person now.
Q: What NICE guideline covers medicines optimisation? | NICE NG5, Medicines optimisation (2015).
Q: Name three activities that support medicines optimisation. | Shared decision-making, medicines reconciliation, structured medication review, monitoring, good discharge communication (any three).
M1#nursing-u04-36-q1@1: Which activity is central to medicines optimisation at discharge? | Explaining changes and informing GP and pharmacy | Giving a week's supply of medicines only | Removing all medicines at discharge | Telling the person to read the leaflets | Ending all monitoring once home | Good transfer of information prevents post-discharge errors.
M2#nursing-u04-36-q2@2: A patient's blood pressure tablet was stopped in hospital because of low blood pressure. What must happen at discharge? | The change and its reason are clearly communicated to the patient, GP and community pharmacy | Nothing; the GP will notice | The patient restarts at home | The tablet is added back to the discharge list | Only the patient is told | Unclear communication leads to medicines being restarted in error.

## Antimicrobial stewardship
S: Antimicrobial stewardship is a coordinated approach to using antimicrobials responsibly, so they stay effective. Antimicrobial resistance is one of the greatest threats to health worldwide, and nurses play a key part in stewardship.
O: Explain antimicrobial resistance and why stewardship matters
O: Describe the nurse's role in stewardship programmes
T: Antimicrobial resistance | The ability of microorganisms to survive medicines that once killed them
T: Antimicrobial stewardship | A coordinated approach to using antimicrobials responsibly
SUM: Resistance is a major global threat.
SUM: Nurses take samples, give doses on time and prompt reviews.
SAFE: If an antimicrobial has no indication, review date or culture result review, prompt the prescriber or pharmacist and report concerns through local stewardship routes.
SRC: National Institute for Health and Care Excellence, Antimicrobial stewardship (NG15) | guidance | 2015 | https://www.nice.org.uk/guidance/ng15
SRC: HM Government, Confronting antimicrobial resistance 2024 to 2029: UK national action plan | guidance | 2024 | https://www.gov.uk/government/publications/uk-5-year-action-plan-for-antimicrobial-resistance-2024-to-2029
H: Why it matters
- Inappropriate use (wrong drug, dose, duration, or when not needed) selects for resistant organisms.
- Resistant infections are harder to treat, more expensive and more deadly.
- The UK's national action plan for antimicrobial resistance (2024–2029) sets targets for reducing use and infections.
H: Nurses' role
- **Infection prevention**: hand hygiene, aseptic technique, line and catheter care, vaccination. Preventing infections reduces the need for antibiotics.
- **Timely, correct administration**: right dose and time; don't miss doses.
- **Samples**: take cultures before antibiotics where possible, correctly labelled.
- **Prompt review**: ask at 48–72 hours whether the antimicrobial is still needed, can be switched to oral, or changed based on results.
- **Allergy labels**: help clarify penicillin allergy labels, which often lead to broader-spectrum alternatives.
- **Education**: explain why antibiotics aren't always needed (for example, viral infections) and the importance of completing the agreed course or stopping when advised.
H: Programmes
P: Hospitals have antimicrobial stewardship teams and policies; primary care uses resources such as the TARGET toolkit (England). Nurses can become Antibiotic Guardians and lead local audits.
K: Every unnecessary antibiotic dose is a step towards resistance. Ask: is it still needed?
Q: What is antimicrobial stewardship? | A coordinated approach to promoting the appropriate use of antimicrobials to improve outcomes and reduce resistance.
Q: Name three ways nurses contribute to antimicrobial stewardship. | Infection prevention, timely administration, correct sampling, prompting review at 48–72 hours, clarifying allergy labels, patient education (any three).
M1#nursing-u04-37-q1@1: How does a wrong penicillin allergy label harm stewardship? | It leads to broader-spectrum or less effective alternatives, increasing resistance and side effects | It has no effect | It reduces C. difficile | It makes penicillin more effective | It only affects the record | Many penicillin allergy labels are inaccurate and drive broader-spectrum use.
M2#nursing-u04-37-q2@2: A patient with a viral cold asks for antibiotics "to be safe". What is the best response? | Explain antibiotics don't treat viruses; safety-net | Ask the GP to prescribe some antibiotics anyway | Give leftover antibiotics from another patient | Tell them they can buy antibiotics online | Tell them just to come back if they feel worse | Education supports stewardship and patient safety.
`;
