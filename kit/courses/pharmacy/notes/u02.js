// School 2: Pharmacology: How Drugs Act. UK, as at 2026.
// Format: kit/course/notes.js. Standard: docs/CURRICULUM_CONTENT_STANDARD.md
// EDUCATION ONLY. Drug cards are study summaries, not prescribing information: check the current BNF and SPC.
export default `
## What pharmacology is
S: Pharmacology is the study of how drugs affect the body and how the body handles drugs. It connects the chemistry of a molecule to what happens in a patient, which is why it sits at the centre of pharmacy.
O: Define pharmacology, pharmacodynamics and pharmacokinetics
O: Explain how pharmacology connects to safe medicines use
T: Pharmacodynamics | What a drug does to the body: its targets, mechanisms and effects
T: Pharmacokinetics | What the body does to a drug: absorption, distribution, metabolism and excretion
H: Two halves of the subject
- **Pharmacodynamics** asks where a drug acts and what follows: a receptor is activated or blocked, an enzyme inhibited, a channel opened.
- **Pharmacokinetics** (School 3) asks how much drug reaches its target, for how long, and how it's removed.
- Together they explain the dose, the timing, the effects and the side effects of every medicine.
H: Why it matters in practice
- Mechanisms predict effects: blocking β2 receptors can cause bronchospasm, so non-selective β-blockers are avoided in asthma.
- Mechanisms predict interactions: two drugs that both prolong the QT interval add their risks.
- Mechanisms explain adverse reactions and help you counsel people about what to expect.
- Most drugs act on proteins: receptors, enzymes, ion channels and transporters. A few act by physical or chemical means (antacids, osmotic laxatives, chelating agents).
K: Pharmacodynamics is what the drug does to the body; pharmacokinetics is what the body does to the drug. Both decide what a dose achieves.
!: Learning drugs as lists of names and doses without their mechanisms: mechanisms are what let you predict effects, interactions and harms.
Q: Define pharmacodynamics. | The study of what a drug does to the body: its targets, mechanisms and effects.
Q: Name the four main kinds of protein drug target. | Receptors, enzymes, ion channels and transporters.
SUM: Pharmacology links a drug's molecular action to its effects in a patient.
SUM: Mechanisms predict effects, interactions and adverse reactions.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
SRC: Joint Formulary Committee, British National Formulary | guidance | 2026 | https://bnf.nice.org.uk/
M1#pharmacy-u02-01-q1@1: What does pharmacokinetics describe? | What the body does to a drug | What a drug does to the body | How drugs are manufactured | How drugs are licensed | How drugs are priced | Pharmacokinetics covers absorption, distribution, metabolism and excretion.
M2#pharmacy-u02-01-q2@2: Why are non-selective β-blockers avoided in asthma? | Blocking β2 receptors can cause bronchospasm | They raise blood glucose sharply | They cause asthma to develop | They block histamine release | They stimulate airway mucus glands | β2 receptors mediate bronchodilation, so blocking them can trigger bronchospasm.
M2#pharmacy-u02-01-q3@1: Which drug acts by a physical or chemical means, not a protein target? | An antacid | Salbutamol | Omeprazole | Sertraline | Propranolol | Antacids neutralise acid chemically; the others act on receptors, enzymes or transporters.

## Drug targets
S: Most drugs work by binding to a protein in the body and changing what it does. Knowing the four families of drug target lets you group medicines by mechanism and reason about new ones.
O: Describe the four main classes of protein drug target
O: Give an example of a medicine acting on each
T: Drug target | The molecule (usually a protein) a drug binds to in order to produce its effect
T: Selectivity | A drug's preference for one target over others, which is relative and often lost at high doses
H: The four families
- **Receptors**: proteins that respond to the body's own signalling molecules. Salbutamol activates β2 receptors.
- **Enzymes**: proteins that catalyse reactions. Omeprazole inhibits the proton pump; ibuprofen inhibits cyclo-oxygenase.
- **Ion channels**: pores that let ions cross membranes. Amlodipine blocks L-type calcium channels; local anaesthetics block sodium channels.
- **Transporters**: carriers that move molecules across membranes. Sertraline blocks the serotonin transporter; digoxin inhibits the Na⁺/K⁺-ATPase pump.
H: Selectivity and side effects
- No drug is perfectly selective. At higher doses it binds other targets, which explains many side effects.
- Side effects can come from the same target in another tissue: β2 agonists cause tremor because skeletal muscle has β2 receptors too.
- The 3D drug-target model shows these families in a cell membrane.
K: Group drugs by target: receptor, enzyme, ion channel or transporter. Side effects often come from the same target elsewhere, or other targets at higher doses.
!: Assuming a "selective" drug has no effect on other targets: selectivity is a matter of degree.
Q: Which family of target does amlodipine act on? | Ion channels (L-type calcium channels).
Q: Why does salbutamol cause tremor? | Skeletal muscle has β2 receptors as well as the airways.
SUM: Receptors, enzymes, ion channels and transporters are the main drug targets.
SUM: Selectivity is relative; many side effects follow from it.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
M1#pharmacy-u02-02-q1@2: Which drug inhibits an enzyme? | Omeprazole | Salbutamol | Amlodipine | Sertraline | Atropine | Omeprazole inhibits the H⁺/K⁺-ATPase (proton pump), an enzyme.
M2#pharmacy-u02-02-q2@2: Sertraline acts mainly on which kind of target? | A transporter | An ion channel | A nuclear receptor | An enzyme in the gut | A cell-surface antibody | It blocks the serotonin reuptake transporter (SERT).
M2#pharmacy-u02-02-q3@1: Why can a selective drug cause side effects in other tissues? | Its target exists in those tissues too | Selective drugs have no side effects | It changes into a different drug | It always binds DNA | It's only absorbed by the liver | The same receptor in another tissue produces another effect, such as β2-mediated tremor.

## Receptors and receptor families
S: Receptors are the body's sensors for its own signals, such as hormones and neurotransmitters. Drugs that mimic or block those signals act through four structural families, which differ in how fast and how they work.
O: Describe the four receptor families and how quickly each acts
O: Classify common drugs by the receptor family they act on
T: Receptor | A protein that recognises a signalling molecule and converts binding into a cellular response
T: Ligand | Any molecule that binds to a receptor, whether it activates it or not
H: The four families
- **Ligand-gated ion channels** (milliseconds): binding opens a channel. Nicotinic acetylcholine receptors; GABA-A receptors, where benzodiazepines act.
- **G protein-coupled receptors** (seconds): binding activates G proteins and second messengers. β-adrenoceptors, muscarinic and opioid receptors.
- **Kinase-linked receptors** (minutes to hours): binding activates enzyme activity, often tyrosine kinase. Insulin receptors; growth factor receptors.
- **Nuclear receptors** (hours): inside the cell, they change gene transcription. Steroid and thyroid hormone receptors.
H: Why the family matters
- The family predicts the speed of the response: a neuromuscular blocker acts in seconds; a corticosteroid's anti-inflammatory effect takes hours.
- It predicts how drugs can be designed: kinase inhibitors block the enzyme part of kinase-linked receptors (for example in some cancers).
- Receptors have subtypes (β1, β2, β3; M1 to M5), which are the basis of selectivity.
K: Ion channel receptors act in milliseconds, GPCRs in seconds, kinase-linked receptors in minutes to hours, and nuclear receptors in hours.
!: Expecting an oral corticosteroid to work as quickly as an inhaled bronchodilator: nuclear receptor effects take hours.
Q: Where do benzodiazepines act? | The GABA-A receptor, a ligand-gated ion channel.
Q: Which receptor family do corticosteroids act on? | Nuclear receptors.
SUM: The four families differ in mechanism and speed.
SUM: Receptor subtypes allow selective drugs.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
SRC: Alexander SPH and others, The Concise Guide to Pharmacology 2023/24, British Journal of Pharmacology | primary | 2023
M2#pharmacy-u02-03-q1@1: Which receptor family acts fastest? | Ligand-gated ion channels | G protein-coupled receptors | Kinase-linked receptors | Nuclear receptors | They all act equally fast | Ligand-gated channels open within milliseconds of binding.
M2#pharmacy-u02-03-q2@2: Opioid receptors belong to which family? | G protein-coupled receptors | Ligand-gated ion channels | Kinase-linked receptors | Nuclear receptors | Transporters | μ, δ and κ opioid receptors are G protein-coupled receptors, signalling mainly through Gi/Go.
M3#pharmacy-u02-03-q3@1: Why does prednisolone take hours to reduce inflammation? | It acts on nuclear receptors to change gene transcription | It must first be converted to insulin | It only works after it's excreted | It blocks ion channels slowly | It needs to reach the bone marrow first | Nuclear receptor effects depend on new gene transcription and protein synthesis.

## Agonists and antagonists
S: A drug that binds a receptor either activates it (an agonist) or prevents activation (an antagonist). Partial agonists and inverse agonists sit between, and the kind of antagonism decides whether it can be overcome.
O: Distinguish full, partial and inverse agonists and antagonists
O: Explain competitive and non-competitive antagonism and their clinical consequences
T: Agonist | A drug that binds a receptor and activates it
T: Antagonist | A drug that binds a receptor without activating it, blocking agonists
H: Agonists
- **Full agonist**: produces the maximum response (morphine at μ-opioid receptors).
- **Partial agonist**: produces less than the maximum even at full occupancy, and can reduce the effect of a full agonist (buprenorphine at μ receptors).
- **Inverse agonist**: reduces a receptor's background (constitutive) activity.
H: Antagonists
- **Competitive (reversible)**: competes with the agonist for the same site; enough agonist overcomes it, shifting the dose-response curve to the right. Naloxone at opioid receptors.
- **Irreversible or non-competitive**: can't be overcome by more agonist, reducing the maximum response. Aspirin irreversibly acetylates cyclo-oxygenase (an enzyme), so its antiplatelet effect lasts the platelet's lifetime.
- Naloxone's action is shorter than many opioids', so repeated doses or an infusion may be needed after overdose.
DRUG: Naloxone | Competitive opioid receptor antagonist, mainly at μ receptors | Reversal of opioid overdose and opioid-induced respiratory depression | Precipitates acute withdrawal in dependent people; short duration, so opioid effects can return | Monitor breathing and consciousness after the dose wears off; take-home naloxone supplied with training; repeat doses may be needed (check the BNF)
K: Agonists activate; antagonists block. Competitive antagonism can be overcome by more agonist; irreversible antagonism can't.
!: Assuming one dose of naloxone is enough after a long-acting opioid overdose: its effect can wear off first.
Q: What is a partial agonist? | A drug that activates a receptor but can't produce the full maximum response.
Q: How does a competitive antagonist change the agonist dose-response curve? | It shifts it to the right without lowering the maximum.
SUM: Full, partial and inverse agonists differ in how much they activate a receptor.
SUM: Competitive antagonism is surmountable; irreversible antagonism isn't.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
SRC: Joint Formulary Committee, British National Formulary: naloxone hydrochloride | guidance | 2026 | https://bnf.nice.org.uk/
M2#pharmacy-u02-04-q1@1: Buprenorphine at μ-opioid receptors is best described as what? | A partial agonist | A full agonist | A competitive antagonist | An inverse agonist | An enzyme inhibitor | It activates μ receptors but with a lower maximum effect than full agonists.
M2#pharmacy-u02-04-q2@2: Why might naloxone need repeating after an overdose of a long-acting opioid? | Its effect can wear off before the opioid's | It becomes an agonist after an hour | It is excreted unchanged in seconds | It only works on the second dose | It destroys opioid receptors | Naloxone acts for a shorter time than many opioids, so respiratory depression can return.
M3#pharmacy-u02-04-q3@2: Aspirin's antiplatelet effect lasts for days after a single dose. Why? | It irreversibly inhibits platelet cyclo-oxygenase | It is stored in fat for weeks | It is a competitive antagonist | It is renally cleared slowly | It activates thromboxane receptors | Platelets have no nucleus to make new COX, so the effect lasts their lifespan (about 7 to 10 days).

## Dose-response relationships
S: As the dose of a drug increases, the response increases until it reaches a maximum. The shape of this relationship explains why doubling a dose rarely doubles the benefit but can increase harm.
O: Interpret graded and quantal dose-response curves
O: Explain the therapeutic index and its clinical importance
T: EC50 | The concentration that produces 50% of the maximum response
T: Therapeutic index | The ratio between the dose causing toxicity and the dose producing the wanted effect
H: Dose-response curves
- **Graded** curves plot the size of a response against concentration in one person or tissue. Plotted against log concentration they are S-shaped (sigmoid).
- At the top of the curve, extra drug adds little effect: the response is near its maximum.
- **Quantal** curves plot the proportion of a population showing an all-or-nothing response (for example, relief of a headache) against dose.
H: Therapeutic index
- The therapeutic index compares the toxic dose with the effective dose. A narrow therapeutic index means the two are close.
- Narrow therapeutic index drugs include digoxin, lithium, warfarin, phenytoin, theophylline, aminoglycosides and ciclosporin: they need careful dosing and often monitoring of levels.
- For these drugs, small changes in absorption, interactions or kidney function can cause toxicity or loss of effect.
K: The dose-response curve flattens near the maximum, so higher doses add more harm than benefit. Narrow therapeutic index drugs need monitoring.
!: Increasing a dose that's already near the top of its dose-response curve and expecting more benefit.
Q: What does EC50 mean? | The concentration producing half the maximum response.
Q: Name three narrow therapeutic index drugs. | For example digoxin, lithium and warfarin (also phenytoin, theophylline, aminoglycosides).
SUM: Graded curves are sigmoid on a log scale; quantal curves describe populations.
SUM: Narrow therapeutic index drugs have toxic doses close to effective ones.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
M1#pharmacy-u02-05-q1@2: Which drug has a narrow therapeutic index? | Lithium | Paracetamol at usual doses | Amoxicillin | Cetirizine | Simvastatin | Lithium's toxic levels are close to its therapeutic range, so levels are monitored.
M2#pharmacy-u02-05-q2@1: Near the top of a dose-response curve, what does a higher dose mostly add? | Little extra effect but more risk | A proportional extra effect | A completely new effect | Lower toxicity | A shorter half-life | The response is close to its maximum, so extra drug mainly increases side effects.
M2#pharmacy-u02-05-q3@2: Why is a narrow therapeutic index clinically important? | Small changes in level can cause harm or failure | It means the drug acts very quickly | It means the drug can't be overdosed | It makes the drug safe in pregnancy | It removes the need for monitoring | When toxic and effective levels are close, interactions or kidney changes matter.

## Affinity, efficacy and potency
S: Three terms describe how a drug interacts with its receptor: affinity (how well it binds), efficacy (how well it activates) and potency (how much is needed). They are often confused, and the difference matters when comparing drugs.
O: Define affinity, efficacy and potency
O: Explain why a more potent drug isn't necessarily a better one
T: Affinity | How strongly a drug binds to its receptor
T: Efficacy | The ability of a bound drug to activate the receptor and produce a response
H: Three different properties
- **Affinity** is binding strength. Antagonists have affinity but no efficacy.
- **Efficacy** is how much response a drug can produce once bound. Full agonists have high efficacy; partial agonists lower.
- **Potency** is the amount needed for a given effect (often measured as EC50). It depends on both affinity and efficacy.
H: Potency in practice
- A more potent drug needs a smaller dose, but that doesn't make it more effective: if both reach the same maximum, they're equally effective at appropriate doses.
- The maximum achievable effect (Emax) reflects efficacy. Loop diuretics produce a greater maximum diuresis than thiazides, whatever the dose of thiazide.
- High potency can increase risk when doses are small and easily confused (for example fentanyl compared with morphine).
K: Potency is about dose size; efficacy is about the maximum effect. A more potent drug isn't automatically more effective.
!: Assuming "stronger" (more potent) means "works better": a less potent drug at an adequate dose can work just as well.
Q: Which property do antagonists have: affinity or efficacy? | Affinity (they bind) but no efficacy.
Q: What does Emax reflect? | The drug's efficacy: its maximum achievable effect.
SUM: Affinity, efficacy and potency are distinct.
SUM: Potency determines the dose; efficacy determines the maximum effect.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
M2#pharmacy-u02-06-q1@1: Antagonists have which property? | Affinity without efficacy | Efficacy without affinity | Both high affinity and efficacy | Neither property | Only potency | They bind the receptor but don't activate it.
M2#pharmacy-u02-06-q2@2: Drug A needs 1 mg and drug B 10 mg for the same maximum effect. What follows? | A is more potent; both are equally effective | A is more effective than B | B is more potent than A | A has lower affinity than B | B can't reach the maximum | Potency concerns dose, not the size of the maximum effect.
M3#pharmacy-u02-06-q3@1: Why do loop diuretics produce more diuresis than thiazides at any dose? | Loop diuretics have greater efficacy | Thiazides are more potent | Loop diuretics have lower affinity | Thiazides are partial antagonists | Loop diuretics are taken more often | Their maximum effect (Emax) is higher, which reflects efficacy, not potency.

## Tolerance, desensitisation and dependence
S: Repeated exposure to a drug can reduce its effect (tolerance) and lead the body to adapt so that stopping causes withdrawal (dependence). These processes shape how drugs such as opioids, benzodiazepines and nitrates are used.
O: Explain the mechanisms of tolerance and desensitisation
O: Distinguish physical dependence, withdrawal and addiction
T: Tolerance | A reduced response to a drug after repeated use, so a higher dose is needed for the same effect
T: Dependence | An adaptation in which stopping the drug causes a withdrawal syndrome
H: Mechanisms
- **Receptor desensitisation**: receptors become less responsive or are removed from the cell surface (downregulation) after repeated stimulation, for example β-receptors with long-term agonists.
- **Pharmacokinetic tolerance**: the body clears the drug faster, for example through enzyme induction.
- **Physiological adaptation**: opposing mechanisms come into play.
- Nitrate tolerance develops within a day of continuous exposure, so a nitrate-free period is built into dosing schedules.
H: Dependence and withdrawal
- **Physical dependence** is an expected adaptation: stopping causes withdrawal (opioids, benzodiazepines, alcohol, some antidepressants, corticosteroids).
- **Addiction** is a behavioural pattern of compulsive use despite harm. Dependence can exist without addiction.
- Stopping dependence-producing drugs needs a gradual, agreed reduction plan.
K: Tolerance needs more drug for the same effect; dependence means stopping causes withdrawal. Neither is the same as addiction.
!: Stopping a benzodiazepine, opioid or long-term corticosteroid abruptly, which can cause dangerous withdrawal.
Q: Why do nitrate regimens include a nitrate-free period? | To prevent nitrate tolerance.
Q: Can dependence occur without addiction? | Yes: physical dependence is an expected adaptation, distinct from compulsive use.
SUM: Tolerance and desensitisation reduce a drug's effect over time.
SUM: Dependence causes withdrawal on stopping; addiction is a behavioural pattern.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
SRC: NICE NG215, Medicines associated with dependence or withdrawal symptoms: safe prescribing and withdrawal management for adults | guidance | 2022 | https://www.nice.org.uk/guidance/ng215
M2#pharmacy-u02-07-q1@1: Why do isosorbide mononitrate regimens include a nitrate-free period? | To prevent tolerance | To reduce the cost | To avoid kidney damage | To allow sleep | To improve absorption | Continuous nitrate exposure causes tolerance within about a day.
M2#pharmacy-u02-07-q2@2: Which statement about dependence is correct? | It can occur without addiction | It always means addiction | It only happens with illegal drugs | It never causes withdrawal | It prevents tolerance | Physical dependence is an adaptation; addiction is compulsive use despite harm.
M2#pharmacy-u02-07-q3@2: What is the safest way to stop a long-term benzodiazepine? | A gradual, agreed dose reduction | Stopping it immediately | Swapping to alcohol | Doubling the dose then stopping | Missing alternate days | Abrupt withdrawal can cause rebound anxiety, insomnia and seizures; NICE NG215 advises planned tapering.

## G protein-coupled receptors and second messengers
S: G protein-coupled receptors (GPCRs) are the largest family of drug targets. Binding switches on a G protein, which changes the level of a second messenger inside the cell and amplifies the signal.
O: Describe how GPCRs signal through G proteins and second messengers
O: Link major G protein types to drug effects
T: G protein | A protein inside the cell that is switched on by an activated GPCR and passes on the signal
T: Second messenger | A small molecule inside the cell (such as cAMP or calcium) that carries a receptor's signal onwards
H: Three main G protein pathways
- **Gs** stimulates adenylyl cyclase, raising cAMP. β-adrenoceptors use Gs: in airway smooth muscle, more cAMP causes relaxation (bronchodilation).
- **Gi** inhibits adenylyl cyclase, lowering cAMP. Opioid and α2 receptors use Gi.
- **Gq** activates phospholipase C, producing IP3 (which releases calcium) and DAG. α1-adrenoceptors and M3 muscarinic receptors use Gq, causing smooth muscle contraction and gland secretion.
H: Amplification and drug design
- One activated receptor activates many G proteins, and each enzyme makes many second messenger molecules, so a small signal has a large effect.
- Drugs can also act downstream: phosphodiesterase inhibitors (such as sildenafil) slow the breakdown of cyclic nucleotides.
- Around a third of medicines act on GPCRs, including β-blockers, antihistamines, opioids and many antipsychotics.
K: Gs raises cAMP, Gi lowers it, Gq raises calcium via IP3. The pathway explains the tissue response.
!: Assuming every GPCR increases cAMP: Gi-coupled receptors lower it and Gq-coupled ones act through calcium.
Q: Which G protein do β-adrenoceptors use? | Gs, which raises cAMP.
Q: What does Gq signalling produce? | IP3 and DAG, raising intracellular calcium.
SUM: GPCRs act through G proteins and second messengers, amplifying signals.
SUM: Gs, Gi and Gq pathways produce different tissue responses.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
SRC: Alexander SPH and others, The Concise Guide to Pharmacology 2023/24: G protein-coupled receptors, British Journal of Pharmacology | primary | 2023
M2#pharmacy-u02-08-q1@1: Activating β2 receptors in airway muscle raises which second messenger? | cAMP | IP3 | cGMP | Diacylglycerol | Nitric oxide | β2 receptors couple to Gs, which stimulates adenylyl cyclase to make cAMP.
M2#pharmacy-u02-08-q2@2: M3 muscarinic receptors on glands increase secretion through which G protein? | Gq | Gs | Gi | No G protein | A kinase-linked pathway | M3 receptors couple to Gq, raising calcium via IP3.
M3#pharmacy-u02-08-q3@1: Opioid receptors reduce neuronal excitability partly by doing what? | Lowering cAMP via Gi | Raising cAMP via Gs | Opening sodium channels | Activating nuclear receptors | Inhibiting the proton pump | Opioid receptors couple to Gi/Go, which inhibit adenylyl cyclase and open potassium channels.

## Ion channels as drug targets
S: Ion channels control the electrical activity of nerves, muscle and the heart. Drugs that open, block or modulate them treat epilepsy, arrhythmias, hypertension and pain, and also cause some of the most serious adverse effects.
O: Describe how drugs act on voltage-gated and ligand-gated ion channels
O: Give clinical examples of ion channel drugs and their risks
T: Voltage-gated channel | An ion channel that opens or closes when the membrane voltage changes
T: Use-dependent block | A block that increases when the channel opens more often, as in rapidly firing nerves
H: Channels and drugs
- **Sodium channels**: local anaesthetics (lidocaine) and some antiepileptics (carbamazepine) block them; block is use-dependent, so rapidly firing neurons are affected most.
- **Calcium channels**: amlodipine (vascular) and verapamil and diltiazem (heart as well) block L-type channels, lowering blood pressure or heart rate.
- **Potassium channels**: sulfonylureas close ATP-sensitive potassium channels in pancreatic β cells, releasing insulin; some antiarrhythmics block cardiac potassium channels.
- **Ligand-gated channels**: benzodiazepines enhance GABA-A receptor chloride currents.
H: Risks
- Blocking the cardiac hERG potassium channel prolongs the QT interval and can cause torsades de pointes. Many drugs do this (some antipsychotics, macrolides, methadone, citalopram).
- Combining QT-prolonging drugs, or giving them with low potassium or magnesium, adds risk.
K: Ion channel drugs alter electrical activity; hERG potassium channel block prolongs the QT interval, a key interaction to check.
!: Missing an additive QT-prolonging combination, for example a macrolide with citalopram, in someone with low potassium.
Q: Why do local anaesthetics affect rapidly firing nerves most? | Their sodium channel block is use-dependent.
Q: Which cardiac channel is linked to QT prolongation? | The hERG potassium channel.
SUM: Sodium, calcium and potassium channels and ligand-gated channels are important drug targets.
SUM: hERG block prolongs QT; check for combinations and electrolyte disturbance.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
SRC: MHRA, Drug Safety Update: citalopram and escitalopram, QT interval prolongation | guidance | 2011-12 | https://www.gov.uk/drug-safety-update
M2#pharmacy-u02-09-q1@1: Sulfonylureas increase insulin secretion by acting on which channel? | ATP-sensitive potassium channels | L-type calcium channels | Voltage-gated sodium channels | GABA-A chloride channels | hERG potassium channels | They close K-ATP channels in β cells, depolarising them and releasing insulin.
M2#pharmacy-u02-09-q2@2: Which combination most raises the risk of QT prolongation? | Clarithromycin with citalopram | Paracetamol with ibuprofen | Amlodipine with atorvastatin | Omeprazole with metformin | Amoxicillin with paracetamol | Both prolong the QT interval, so their effects add.
M3#pharmacy-u02-09-q3@1: Why do verapamil and amlodipine have different main effects? | Verapamil acts more on the heart; amlodipine on blood vessels | Amlodipine blocks sodium channels | Verapamil is a β-blocker | Amlodipine only acts in the gut | They act on different receptor families | Both block L-type channels, but with different tissue selectivity.

## Enzymes as drug targets
S: Many medicines work by inhibiting an enzyme, stopping the production of a harmful product or the breakdown of a useful one. Whether inhibition is reversible decides how long the effect lasts.
O: Explain reversible and irreversible enzyme inhibition
O: Describe major enzyme-inhibiting medicines and their effects
T: Enzyme inhibitor | A drug that reduces an enzyme's activity
T: Irreversible inhibition | Permanent inactivation of an enzyme, so the effect lasts until new enzyme is made
H: Examples
- **Cyclo-oxygenase (COX)**: NSAIDs reversibly inhibit COX, reducing prostaglandins; aspirin irreversibly acetylates it.
- **ACE**: ACE inhibitors (ramipril, lisinopril) block conversion of angiotensin I to angiotensin II.
- **HMG-CoA reductase**: statins reduce cholesterol synthesis.
- **Proton pump (H⁺/K⁺-ATPase)**: PPIs irreversibly inhibit it in the parietal cell, so a single daily dose works for about a day.
- **Acetylcholinesterase**: donepezil (in dementia) and pyridostigmine (in myasthenia gravis) increase acetylcholine.
- **Xanthine oxidase**: allopurinol lowers uric acid.
H: Reversibility and duration
- Reversible inhibitors work while the drug is present; irreversible ones last until the body makes new enzyme, however short the drug's half-life.
DRUG: Omeprazole | Proton pump inhibitor: irreversibly inhibits the gastric H⁺/K⁺-ATPase | Gastro-oesophageal reflux, peptic ulcer, Helicobacter pylori eradication, protection against NSAID ulcers | Headache, diarrhoea; with long-term use, Clostridioides difficile infection risk, low magnesium and fracture risk | Review long-term need and step down where possible; taken before food; interacts with clopidogrel through CYP2C19 (check the BNF)
K: Irreversible inhibitors (aspirin, PPIs) act long after the drug has gone; reversible ones act while the drug is present.
!: Continuing a PPI indefinitely without review: long-term use has risks, so the need should be reviewed regularly.
Q: Why does a once-daily PPI work all day? | It irreversibly inhibits proton pumps, which must be replaced.
Q: Which enzyme do statins inhibit? | HMG-CoA reductase.
SUM: Many drugs act by inhibiting enzymes.
SUM: Irreversible inhibition outlasts the drug's presence in the body.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
SRC: Joint Formulary Committee, British National Formulary: omeprazole | guidance | 2026 | https://bnf.nice.org.uk/
M1#pharmacy-u02-10-q1@2: Which enzyme does allopurinol inhibit? | Xanthine oxidase | Cyclo-oxygenase | HMG-CoA reductase | Angiotensin-converting enzyme | Acetylcholinesterase | Inhibiting xanthine oxidase reduces uric acid production.
M2#pharmacy-u02-10-q2@1: Why does aspirin's effect on platelets outlast the drug? | It irreversibly inhibits COX | It's stored in red cells | It has a half-life of a week | It reversibly blocks receptors | It's converted to warfarin | Irreversible acetylation of COX lasts until new platelets are made.
M2#pharmacy-u02-10-q3@2: Donepezil helps in Alzheimer's disease by inhibiting which enzyme? | Acetylcholinesterase | Monoamine oxidase | Dopa decarboxylase | Cyclo-oxygenase | Xanthine oxidase | Less acetylcholine breakdown increases cholinergic transmission.

## Transporters as drug targets
S: Transporters carry ions and molecules across membranes, against gradients if they use energy. Drugs that block them treat depression, heart failure, diabetes and oedema, and transporters also shape how drugs are absorbed and excreted.
O: Describe how drugs act on membrane transporters
O: Give examples of transporter-targeting medicines and their effects
T: Reuptake transporter | A transporter that clears a neurotransmitter from the synapse back into the neuron
T: Na⁺/K⁺-ATPase | The pump that moves sodium out of and potassium into cells, using ATP
H: Examples
- **Monoamine reuptake**: SSRIs (sertraline, fluoxetine) block the serotonin transporter; some antidepressants also block noradrenaline reuptake.
- **Na⁺/K⁺-ATPase**: digoxin inhibits it in heart muscle, increasing intracellular calcium and contractility and slowing AV conduction.
- **Kidney transporters**: loop diuretics block the Na⁺/K⁺/2Cl⁻ cotransporter; thiazides block the Na⁺/Cl⁻ cotransporter; SGLT2 inhibitors (dapagliflozin) block glucose reabsorption.
H: Transporters and drug handling
- Transporters such as P-glycoprotein pump drugs out of cells, affecting absorption and excretion; inhibiting them causes interactions (for example raising digoxin levels).
- Low potassium increases digoxin binding and toxicity, so diuretics that lower potassium raise the risk.
DRUG: Digoxin | Cardiac glycoside: inhibits the Na⁺/K⁺-ATPase, increasing contractility and slowing AV conduction | Rate control in atrial fibrillation; heart failure | Narrow therapeutic index; toxicity causes nausea, visual disturbance, confusion and arrhythmias; risk rises with low potassium and renal impairment | Monitor pulse, renal function, potassium and levels where toxicity is suspected; check interactions (for example amiodarone and P-glycoprotein inhibitors) in the BNF
DRUG: Sertraline | Selective serotonin reuptake inhibitor (blocks the serotonin transporter) | Depression and anxiety disorders, including panic disorder, OCD and PTSD | Nausea and GI upset; low sodium in older people; increased bleeding risk with NSAIDs or anticoagulants; serotonin syndrome with other serotonergic drugs | Effect takes weeks; don't stop abruptly; monitor mood and suicidal thoughts early on, especially in young people; check sodium if symptoms suggest it
K: Many important drugs block transporters: SSRIs, digoxin, loop and thiazide diuretics, SGLT2 inhibitors.
!: Overlooking low potassium in a patient on digoxin and a loop diuretic, which increases digoxin toxicity.
Q: Which transporter do loop diuretics block? | The Na⁺/K⁺/2Cl⁻ cotransporter in the loop of Henle.
Q: Why does low potassium increase digoxin toxicity? | Digoxin competes with potassium at the Na⁺/K⁺-ATPase, so it binds more when potassium is low.
SUM: Transporters are targets for antidepressants, digoxin, diuretics and SGLT2 inhibitors.
SUM: Transporters like P-glycoprotein also cause interactions.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
SRC: Joint Formulary Committee, British National Formulary: digoxin and sertraline | guidance | 2026 | https://bnf.nice.org.uk/
M2#pharmacy-u02-11-q1@1: Dapagliflozin lowers blood glucose by blocking which transporter? | SGLT2 in the kidney | The serotonin transporter | The Na⁺/K⁺-ATPase | GLUT4 in muscle | P-glycoprotein in the gut | It reduces glucose reabsorption so more glucose is excreted in urine.
M2#pharmacy-u02-11-q2@2: A patient on digoxin starts a loop diuretic. What should you watch for? | Low potassium increasing toxicity | Higher blood sugar | Lower digoxin absorption | Increased appetite | Hair loss | Loop diuretics can lower potassium, which increases digoxin's effect and toxicity.
M3#pharmacy-u02-11-q3@2: Why can amiodarone raise digoxin levels? | It inhibits P-glycoprotein and reduces digoxin clearance | It induces liver enzymes | It is a potassium supplement | It speeds up kidney excretion | It blocks digoxin absorption | Inhibiting P-gp transport reduces digoxin excretion, so levels rise; the dose may need reducing (check the BNF).

## Nuclear receptors
S: Nuclear receptors sit inside the cell and act as transcription factors when a hormone or drug binds. They mediate the effects of corticosteroids, thyroid hormones, sex hormones and some diabetes and lipid drugs.
O: Explain how nuclear receptors change gene expression
O: Describe the medicines that act through nuclear receptors and their time course
T: Nuclear receptor | A receptor inside the cell that, when bound, regulates the transcription of genes
T: Glucocorticoid | A steroid (such as prednisolone) acting on glucocorticoid receptors, with anti-inflammatory and metabolic effects
H: How they work
- Lipid-soluble ligands cross the cell membrane and bind the receptor in the cytoplasm or nucleus.
- The complex binds DNA and switches genes on or off, so effects take hours to develop and can last beyond the drug's presence.
H: Medicines
- **Glucocorticoids** (prednisolone, hydrocortisone, dexamethasone): anti-inflammatory and immunosuppressive.
- **Thyroid hormone** (levothyroxine) acts on thyroid receptors.
- **Sex hormones and modulators**: oestrogens, progestogens, tamoxifen.
- **PPAR agonists**: pioglitazone (PPAR-γ) and fibrates (PPAR-α).
H: Corticosteroid safety
- Long-term use suppresses the body's own cortisol production, so stopping suddenly after more than about three weeks (or repeated courses) risks adrenal crisis.
- People on long-term steroids need a steroid card and sick-day guidance.
DRUG: Prednisolone | Glucocorticoid: agonist at glucocorticoid (nuclear) receptors | Inflammatory and autoimmune conditions, asthma and COPD exacerbations | High glucose, mood change, infection risk, osteoporosis and adrenal suppression with prolonged use | Take in the morning with food; carry a steroid card if on long-term or repeated courses; don't stop abruptly after prolonged use; consider bone protection (check the BNF)
K: Nuclear receptor drugs change gene expression: effects take hours and long-term corticosteroids suppress the adrenal axis.
!: Stopping long-term prednisolone abruptly, risking adrenal crisis.
Q: Why do glucocorticoid effects take hours? | They act by changing gene transcription.
Q: Name a drug acting on PPAR-γ. | Pioglitazone.
SUM: Nuclear receptors are transcription factors activated by hormones and drugs.
SUM: Long-term corticosteroids need a steroid card and gradual withdrawal.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
SRC: NHS England and Society for Endocrinology, National Patient Safety Alert: steroid emergency card to support early recognition and treatment of adrenal crisis | guidance | 2020 | https://www.england.nhs.uk/
M2#pharmacy-u02-12-q1@1: Which drug acts through a nuclear receptor? | Levothyroxine | Salbutamol | Omeprazole | Lidocaine | Sertraline | Thyroid hormone acts on intracellular thyroid receptors that regulate gene transcription.
M2#pharmacy-u02-12-q2@2: What is the main risk of stopping prednisolone suddenly after months of use? | Adrenal crisis | Low blood glucose only | A rash | Bronchospasm | Raised potassium only | The adrenal glands are suppressed and can't respond to stress at once.
M3#pharmacy-u02-12-q3@1: Pioglitazone and fibrates have what in common? | Both act on PPAR nuclear receptors | Both block ion channels | Both inhibit HMG-CoA reductase | Both block β-receptors | Both are insulin analogues | Pioglitazone is a PPAR-γ agonist and fibrates are PPAR-α agonists.

## The autonomic nervous system
S: The autonomic nervous system controls involuntary functions: heart rate, blood pressure, airways, gut, bladder and glands. Many common drugs act on its two branches, so knowing its receptors predicts their effects and side effects.
O: Describe the sympathetic and parasympathetic systems and their transmitters
O: Predict drug effects from autonomic receptor actions
T: Sympathetic nervous system | The "fight or flight" branch; its post-ganglionic transmitter is mainly noradrenaline
T: Parasympathetic nervous system | The "rest and digest" branch; its post-ganglionic transmitter is acetylcholine
H: Organisation
- Both branches use acetylcholine at the ganglia (nicotinic receptors).
- Parasympathetic nerves release acetylcholine onto **muscarinic** receptors on organs.
- Sympathetic nerves release noradrenaline onto **adrenoceptors** (α and β); the adrenal medulla releases adrenaline into the blood.
- Exception: sympathetic nerves to sweat glands use acetylcholine.
H: Effects on organs
- Heart: faster and stronger (β1); slower (M2).
- Airways: dilate (β2); constrict and secrete (M3).
- Blood vessels: most constrict (α1).
- Gut: reduced motility; increased motility and secretion.
- Bladder: relaxes the detrusor (β3) and contracts the sphincter (α1); contracts the detrusor (M3).
- Eye: pupil dilates (α1); pupil constricts (M3).
K: Parasympathetic: acetylcholine on muscarinic receptors. Sympathetic: noradrenaline on α and β receptors. Predict effects from the receptor.
!: Forgetting that blocking one branch unmasks the other: an antimuscarinic causes tachycardia because sympathetic tone is unopposed.
Q: What transmitter acts on organs in the parasympathetic system? | Acetylcholine, on muscarinic receptors.
Q: What does β1 stimulation do to the heart? | Increases heart rate and force.
SUM: Two branches, two transmitters, distinct receptors on each organ.
SUM: Drug effects and side effects follow from which receptors they act on.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
M1#pharmacy-u02-13-q1@1: Which receptor mediates parasympathetic slowing of the heart? | M2 muscarinic | β1 adrenoceptor | α1 adrenoceptor | Nicotinic | H2 histamine | Acetylcholine acting on M2 receptors in the heart slows the rate.
M2#pharmacy-u02-13-q2@2: An antimuscarinic drug is given. What happens to heart rate? | It rises | It falls | It stops | No change | It becomes irregular only | Blocking parasympathetic (M2) tone leaves sympathetic drive unopposed.
M2#pharmacy-u02-13-q3@2: Which receptor relaxes the bladder's detrusor muscle? | β3 adrenoceptor | M3 muscarinic | α1 adrenoceptor | Nicotinic | H1 histamine | Mirabegron, a β3 agonist, relaxes the detrusor in overactive bladder.

## Cholinergic pharmacology
S: Drugs that mimic, block or prolong acetylcholine treat conditions from overactive bladder to myasthenia gravis and dementia. Their side effects follow directly from the muscarinic and nicotinic receptors they affect.
O: Describe muscarinic agonists, antagonists and anticholinesterases
O: Recognise antimuscarinic side effects and anticholinergic burden
T: Antimuscarinic | A drug that blocks muscarinic acetylcholine receptors
T: Anticholinergic burden | The cumulative antimuscarinic effect of all a person's medicines, linked to confusion and falls in older people
H: Drug groups
- **Antimuscarinics**: atropine (bradycardia), hyoscine (secretions, motion sickness), oxybutynin and solifenacin (overactive bladder), ipratropium and tiotropium (airways).
- **Anticholinesterases**: donepezil, rivastigmine and galantamine (dementia); pyridostigmine (myasthenia gravis); neostigmine (reversal of neuromuscular block).
- **Neuromuscular blockers** act on nicotinic receptors at the neuromuscular junction during anaesthesia.
H: Antimuscarinic effects
- "Dry as a bone, red as a beet, blind as a bat, mad as a hatter": dry mouth, flushing, blurred vision, confusion, plus constipation, urinary retention and tachycardia.
- Many drugs have antimuscarinic activity (tricyclic antidepressants, some antihistamines, antipsychotics). Their burden adds up and is linked to cognitive decline and falls in older people.
DRUG: Atropine | Muscarinic receptor antagonist | Symptomatic bradycardia; organophosphate poisoning; reducing secretions | Dry mouth, tachycardia, blurred vision, urinary retention, constipation, confusion (especially in older people) | Monitor heart rate and rhythm; care in glaucoma, prostatic enlargement and older people; doses vary by indication (check the BNF)
K: Antimuscarinics cause dry mouth, blurred vision, constipation, retention, tachycardia and confusion. Add up the burden in older people.
!: Starting an antimuscarinic for overactive bladder in someone with dementia already on a cholinesterase inhibitor: the two work against each other and burden rises.
Q: Name three antimuscarinic side effects. | For example dry mouth, constipation and urinary retention (also blurred vision, tachycardia, confusion).
Q: Which drug reverses non-depolarising neuromuscular block? | Neostigmine (an anticholinesterase).
SUM: Cholinergic drugs mimic, block or prolong acetylcholine.
SUM: Anticholinergic burden accumulates across medicines and harms older people.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
SRC: NICE NG97, Dementia: assessment, management and support | guidance | 2018 | https://www.nice.org.uk/guidance/ng97
M2#pharmacy-u02-14-q1@1: Which drug is an anticholinesterase used in myasthenia gravis? | Pyridostigmine | Oxybutynin | Atropine | Ipratropium | Hyoscine | Pyridostigmine increases acetylcholine at the neuromuscular junction.
M2#pharmacy-u02-14-q2@2: Why is anticholinergic burden a concern in older people? | It's linked to confusion, falls and cognitive decline | It only affects heart rate | It lowers blood pressure safely | It improves memory | It causes weight gain only | The combined antimuscarinic effect of several drugs worsens cognition and increases falls.
M3#pharmacy-u02-14-q3@2: A man with dementia on donepezil starts oxybutynin. What's the problem? | They have opposing actions and burden increases | Oxybutynin increases donepezil absorption | They both cause diarrhoea only | Donepezil blocks oxybutynin's metabolism | There's no concern | Donepezil boosts acetylcholine while oxybutynin blocks it, and antimuscarinics can worsen confusion.

## Adrenergic pharmacology
S: Adrenoceptors (α1, α2, β1, β2, β3) respond to noradrenaline and adrenaline. Drugs that stimulate or block them are used for asthma, hypertension, heart failure, anaphylaxis and prostate symptoms.
O: Describe the adrenoceptor subtypes and the drugs acting on them
O: Predict effects and risks of adrenergic agonists and antagonists
T: β-blocker | A drug that blocks β-adrenoceptors (some selective for β1)
T: Cardioselective | Relatively selective for β1 receptors in the heart, such as bisoprolol and atenolol
H: Receptors and drugs
- **α1**: vasoconstriction; blockers (doxazosin, tamsulosin) lower blood pressure or relax prostate muscle; they can cause postural hypotension.
- **α2**: presynaptic inhibition of noradrenaline release; agonists such as clonidine lower blood pressure.
- **β1**: heart rate and force; cardioselective blockers (bisoprolol) treat angina, heart failure and AF.
- **β2**: bronchodilation; agonists (salbutamol, formoterol) treat asthma and COPD.
- **Adrenaline** acts on α and β receptors: the first-line treatment of anaphylaxis, given intramuscularly.
H: β-blocker cautions
- Non-selective β-blockers (propranolol) can cause bronchospasm and are avoided in asthma; even cardioselective ones need care.
- β-blockers can mask the warning signs of hypoglycaemia (tremor, palpitations) and cause bradycardia, fatigue and cold extremities.
- Don't stop them abruptly in angina: rebound can worsen symptoms.
DRUG: Salbutamol | Short-acting β2-adrenoceptor agonist | Relief of bronchospasm in asthma and COPD | Tremor, palpitations, tachycardia; low potassium at high doses | Check inhaler technique; frequent use signals poor control needing review; use with a spacer where appropriate
DRUG: Propranolol | Non-selective β-blocker | Angina, arrhythmias, migraine prophylaxis, physical symptoms of anxiety, thyrotoxicosis | Bronchospasm (avoid in asthma), bradycardia, fatigue, cold extremities; masks hypoglycaemia; toxic in overdose | Monitor pulse and blood pressure; don't stop abruptly; take care with verapamil and diltiazem (check the BNF)
K: β1 is the heart, β2 the airways, α1 vessels and prostate. Non-selective β-blockers risk bronchospasm; all can mask hypoglycaemia.
!: Supplying propranolol to someone with asthma: non-selective β-blockade can trigger severe bronchospasm.
Q: Which adrenoceptor do tamsulosin and doxazosin block? | α1.
Q: Which β-blocker side effect matters for people with diabetes? | Masking the warning signs of hypoglycaemia.
SUM: α1, α2, β1, β2 and β3 receptors have distinct effects and drugs.
SUM: β-blockers need care in asthma, diabetes and on stopping.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
SRC: Joint Formulary Committee, British National Formulary: beta-adrenoceptor blocking drugs | guidance | 2026 | https://bnf.nice.org.uk/
M1#pharmacy-u02-15-q1@1: Which receptor does salbutamol stimulate? | β2 | β1 | α1 | α2 | M3 | Salbutamol is a β2 agonist, relaxing airway smooth muscle.
M2#pharmacy-u02-15-q2@2: What is a common problem with α1-blockers such as doxazosin? | Postural hypotension | Bronchospasm | Hyperkalaemia | Weight loss | Diarrhoea | Blocking α1 vasoconstriction can cause dizziness on standing, especially after the first dose.
M3#pharmacy-u02-15-q3@2: A man with asthma is prescribed propranolol for migraine. What should the pharmacist do? | Contact the prescriber: it's contraindicated | Supply it with a spacer | Supply it and advise rest | Halve the dose | Swap to salbutamol | Non-selective β-blockade can cause life-threatening bronchospasm in asthma.

## Histamine and its antagonists
S: Histamine is released from mast cells in allergy and from stomach cells to drive acid secretion. Antihistamines that block H1 receptors treat allergic conditions; H2 antagonists once dominated acid suppression.
O: Describe histamine's actions at H1 and H2 receptors
O: Compare first- and second-generation H1 antihistamines
T: H1 antihistamine | A drug that blocks H1 receptors, reducing allergic symptoms
T: Sedating antihistamine | An older (first-generation) H1 antihistamine that crosses into the brain, such as chlorphenamine
H: Histamine's actions
- **H1 receptors**: itch, sneezing, vasodilation, increased capillary permeability (swelling, wheals) and bronchoconstriction.
- **H2 receptors**: gastric acid secretion.
- H3 and H4 receptors have roles in the brain and immune cells.
H: Antihistamines
- **First-generation H1** (chlorphenamine, promethazine): sedating and antimuscarinic; useful at night, risky for driving and in older people.
- **Second-generation H1** (cetirizine, loratadine, fexofenadine): less sedating, once daily; first choice for allergic rhinitis and urticaria.
- **H2 antagonists** (famotidine) reduce acid but are now used less than PPIs.
- Antihistamines aren't the treatment for anaphylaxis: adrenaline is.
- Some sedating antihistamines (such as promethazine) are also sold for short-term sleeplessness; they're unsuitable for regular use and for older people because of next-day drowsiness and antimuscarinic effects.
- Antihistamines can be used in pregnancy only after checking the BNF and specialist sources; loratadine and cetirizine are commonly chosen when needed.
DRUG: Cetirizine | Second-generation H1-receptor antagonist | Allergic rhinitis, urticaria and itch | Less sedating than older antihistamines but can cause drowsiness; headache, dry mouth | Counsel about drowsiness, driving and alcohol; dose adjustment in renal impairment (check the BNF)
K: H1 blockers treat allergy (second-generation first line); H2 blockers reduce acid. Adrenaline, not an antihistamine, treats anaphylaxis.
!: Treating suspected anaphylaxis with an oral antihistamine instead of giving adrenaline and calling for help.
Q: Which receptor mediates gastric acid secretion? | H2.
Q: Why are first-generation antihistamines sedating? | They cross into the brain and block central H1 receptors.
SUM: H1 mediates allergy symptoms; H2 mediates acid secretion.
SUM: Second-generation H1 antihistamines are less sedating; anaphylaxis needs adrenaline.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
SRC: Resuscitation Council UK, Emergency treatment of anaphylaxis: guidelines for healthcare providers | guidance | 2021 | https://www.resus.org.uk/
M1#pharmacy-u02-16-q1@1: Which receptor does famotidine block? | H2 | H1 | β2 | M3 | 5-HT3 | Famotidine is an H2 antagonist that reduces gastric acid.
M2#pharmacy-u02-16-q2@2: Which antihistamine is least likely to cause drowsiness? | Fexofenadine | Chlorphenamine | Promethazine | Hydroxyzine | Diphenhydramine | Fexofenadine is a second-generation antihistamine with little central penetration.
M2#pharmacy-u02-16-q3@2: What is the first-line drug treatment for anaphylaxis? | Intramuscular adrenaline | Oral cetirizine | IV chlorphenamine | Oral prednisolone | Inhaled salbutamol | Adrenaline reverses the life-threatening features; antihistamines are not first line.

## Eicosanoids and inflammation
S: Prostaglandins, thromboxanes and leukotrienes are lipid mediators made from arachidonic acid. They drive pain, fever, inflammation, platelet aggregation and stomach protection, which explains both the benefits and harms of NSAIDs and aspirin.
O: Describe how eicosanoids are made and what they do
O: Explain the benefits and adverse effects of COX inhibition
T: Cyclo-oxygenase (COX) | The enzyme that converts arachidonic acid to prostaglandins and thromboxane; COX-1 is constitutive and COX-2 inducible
T: Leukotriene | An eicosanoid made by lipoxygenase, causing bronchoconstriction and inflammation
H: The pathways
- Arachidonic acid is released from cell membranes.
- **COX** makes prostaglandins (pain, fever, inflammation, gastric protection, renal blood flow) and thromboxane (platelet aggregation).
- **Lipoxygenase** makes leukotrienes (bronchoconstriction): montelukast blocks their receptors in asthma.
H: COX inhibitors
- NSAIDs (ibuprofen, naproxen) inhibit COX-1 and COX-2: they relieve pain, inflammation and fever.
- Blocking COX-1 in the stomach reduces mucosal protection (ulcers and bleeding); in the kidney it reduces blood flow (acute kidney injury, especially with ACE inhibitors and diuretics).
- COX-2 selective inhibitors (celecoxib) cause fewer GI problems but carry cardiovascular risk, as do many NSAIDs.
- Low-dose aspirin irreversibly blocks platelet thromboxane: an antiplatelet effect.
- NSAIDs can worsen asthma in a minority of people with NSAID sensitivity.
DRUG: Ibuprofen | Non-steroidal anti-inflammatory drug: reversible non-selective COX inhibitor | Pain, inflammation and fever | GI irritation, ulcers and bleeding; renal impairment; fluid retention; cardiovascular risk; may worsen asthma in sensitive people | Take with or after food; avoid or use with caution in renal impairment, heart failure, peptic ulcer and with anticoagulants; consider gastroprotection in at-risk people (check the BNF)
K: COX inhibition relieves pain and inflammation but harms the stomach, kidneys and heart. Leukotrienes are blocked separately by montelukast.
!: Recommending ibuprofen to someone taking an ACE inhibitor and a diuretic, raising the risk of acute kidney injury.
Q: What does thromboxane do? | Promotes platelet aggregation and vasoconstriction.
Q: Which drug blocks leukotriene receptors? | Montelukast.
SUM: COX and lipoxygenase make prostaglandins, thromboxane and leukotrienes.
SUM: NSAIDs' benefits and harms both follow from COX inhibition.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
SRC: MHRA, Drug Safety Update: high-dose ibuprofen, cardiovascular risk | guidance | 2015-06 | https://www.gov.uk/drug-safety-update
M2#pharmacy-u02-17-q1@1: Why do NSAIDs cause stomach ulcers? | They reduce protective prostaglandins | They increase histamine release | They dissolve the stomach lining directly | They block H2 receptors | They raise stomach pH | COX-1 prostaglandins protect the gastric mucosa.
M2#pharmacy-u02-17-q2@2: Which drug blocks leukotriene receptors in asthma? | Montelukast | Ibuprofen | Salbutamol | Cetirizine | Celecoxib | Montelukast is a leukotriene receptor antagonist.
M3#pharmacy-u02-17-q3@2: Why are COX-2 selective NSAIDs not risk-free? | They carry cardiovascular risk | They cause more GI bleeding | They are irreversible | They block thromboxane completely | They can't relieve pain | Fewer GI effects, but cardiovascular events remain a concern.

## Neurotransmitters in the brain
S: Psychiatric and neurological medicines act on a handful of brain transmitter systems: dopamine, serotonin, noradrenaline, GABA, glutamate and acetylcholine. Their pathways explain both treatment effects and many side effects.
O: Describe the main brain neurotransmitter systems and their roles
O: Link CNS drug classes to the transmitters they affect
T: Dopamine pathways | Brain circuits (mesolimbic, nigrostriatal, tuberoinfundibular) through which dopamine affects reward, movement and prolactin
T: Excitatory and inhibitory transmitters | Glutamate excites neurons; GABA inhibits them
H: The main systems
- **Dopamine**: reward and motivation (mesolimbic), movement (nigrostriatal), prolactin release (tuberoinfundibular). Antipsychotics block D2 receptors; Parkinson's treatment replaces dopamine (levodopa).
- **Serotonin (5-HT)**: mood, anxiety, sleep and vomiting. SSRIs raise synaptic serotonin; ondansetron blocks 5-HT3 receptors.
- **Noradrenaline**: arousal and attention; SNRIs raise it.
- **GABA**: the main inhibitory transmitter; benzodiazepines and some antiepileptics enhance it.
- **Glutamate**: the main excitatory transmitter; memantine blocks NMDA receptors in dementia.
H: Side effects from pathways
- D2 blockade in the nigrostriatal pathway causes parkinsonism and other movement disorders; in the tuberoinfundibular pathway, raised prolactin.
- Levodopa can cause nausea and, through mesolimbic effects, hallucinations or impulse control problems.
K: Know the six main transmitters and which drugs act on each; pathway effects explain side effects.
!: Giving metoclopramide or an antipsychotic to someone with Parkinson's disease: D2 blockade worsens it.
Q: Why do antipsychotics cause parkinsonism? | They block D2 receptors in the nigrostriatal pathway.
Q: Which receptor does memantine block? | The NMDA glutamate receptor.
SUM: Dopamine, serotonin, noradrenaline, GABA, glutamate and acetylcholine are the main targets.
SUM: Side effects follow from the pathways drugs act in.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
SRC: Stahl SM, Stahl's Essential Psychopharmacology, 5th edition, Cambridge University Press | secondary | 2021
M2#pharmacy-u02-18-q1@1: Ondansetron prevents vomiting by blocking which receptor? | 5-HT3 | D2 | H1 | M3 | NMDA | It blocks serotonin 5-HT3 receptors in the gut and brainstem.
M2#pharmacy-u02-18-q2@2: Why should metoclopramide generally be avoided in Parkinson's disease? | It blocks D2 receptors and worsens symptoms | It increases dopamine too much | It causes low blood sugar | It is an opioid | It blocks GABA | Central D2 blockade counteracts dopamine replacement.
M2#pharmacy-u02-18-q3@1: Which transmitter do benzodiazepines enhance? | GABA | Glutamate | Dopamine | Serotonin | Acetylcholine | They increase GABA-A receptor responses to GABA.

## Adverse drug reactions
S: Adverse drug reactions (ADRs) are a major cause of hospital admission. Classifying them helps you predict which are dose-related and preventable, and which are idiosyncratic and need avoiding in future.
O: Classify adverse drug reactions using the ABCDE scheme
O: Identify risk factors for ADRs and how to reduce them
T: Adverse drug reaction | A harmful, unintended response to a medicine at normal doses
T: Type A reaction | An augmented, predictable, dose-related reaction from the drug's known pharmacology
H: Classification
- **A (augmented)**: predictable from pharmacology and dose-related, for example bleeding with anticoagulants or hypoglycaemia with insulin. The commonest type.
- **B (bizarre)**: not predictable or dose-related, often immune, for example anaphylaxis to penicillin or Stevens-Johnson syndrome.
- **C (chronic)**: from long-term use, for example adrenal suppression with steroids.
- **D (delayed)**: appear later, for example teratogenicity or some cancers.
- **E (end of use)**: withdrawal effects, for example rebound after stopping a β-blocker.
H: Risk factors and prevention
- Older age, polypharmacy, renal or hepatic impairment, narrow therapeutic index drugs, previous ADRs and pregnancy.
- Prevention: right dose for kidney function, checking interactions and allergies, monitoring, and clear counselling.
- Report suspected ADRs through the Yellow Card scheme (School 17).
K: Type A reactions are common, dose-related and often preventable; type B are unpredictable and must be recorded to avoid re-exposure.
!: Recording a type A side effect (such as nausea) as an "allergy", which can stop someone getting a useful medicine later.
Q: Give an example of a type B reaction. | Anaphylaxis to penicillin (or Stevens-Johnson syndrome).
Q: What type is bleeding on warfarin? | Type A: augmented and dose-related.
SUM: ADRs are classified A to E.
SUM: Many ADRs are preventable with dosing, monitoring and interaction checks.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
SRC: Pirmohamed M and others, Adverse drug reactions as cause of admission to hospital, BMJ 329: 15–19 | primary | 2004
M1#pharmacy-u02-19-q1@1: Hypoglycaemia caused by insulin is which type of ADR? | Type A | Type B | Type C | Type D | Type E | It's a predictable, dose-related extension of insulin's action.
M2#pharmacy-u02-19-q2@2: Which factor most increases ADR risk? | Polypharmacy in older age | Taking medicines with water | Being a non-smoker | Taking once-daily drugs | Having normal kidney function | More drugs and age-related changes increase interactions and sensitivity.
M3#pharmacy-u02-19-q3@1: Why should nausea from a drug not be recorded as an allergy? | It's a type A side effect, not an immune reaction | Nausea is never caused by drugs | Allergies can't involve the gut | It would make the drug cheaper | It's a type B reaction | Mislabelling side effects as allergies can deny people useful treatment later.

## Mechanisms of drug interactions
S: Drug interactions happen when one drug changes the effect or level of another. Sorting them into pharmacokinetic and pharmacodynamic mechanisms lets you predict them, judge their importance and decide what to do.
O: Distinguish pharmacokinetic and pharmacodynamic interactions
O: Explain enzyme induction and inhibition and their time courses
T: Enzyme inhibition | Reduced metabolism of a drug by another drug, raising its levels, usually within days
T: Enzyme induction | Increased metabolism caused by another drug, lowering levels, developing over one to two weeks
H: Pharmacokinetic interactions
- **Absorption**: antacids and calcium reduce absorption of some antibiotics (tetracyclines, quinolones) and levothyroxine.
- **Metabolism**: CYP inhibitors (clarithromycin, fluconazole, grapefruit juice for some drugs) raise levels; inducers (rifampicin, carbamazepine, phenytoin, St John's wort) lower them.
- **Excretion**: some drugs reduce renal clearance of lithium (NSAIDs, ACE inhibitors, thiazides), raising lithium levels.
- **Transport**: P-glycoprotein inhibitors raise digoxin levels.
H: Pharmacodynamic interactions
- **Additive or synergistic**: two sedatives together; two QT-prolonging drugs; an NSAID with an anticoagulant (bleeding).
- **Antagonistic**: an NSAID reducing the effect of antihypertensives; a β-blocker opposing salbutamol.
- Use the BNF interactions appendix and judge severity, evidence and the patient's circumstances.
K: Pharmacokinetic interactions change levels (absorption, metabolism, excretion, transport); pharmacodynamic ones add or oppose effects.
!: Forgetting that enzyme induction takes one to two weeks to develop and to wear off, so effects lag behind starting or stopping the inducer.
Q: Name three enzyme inducers. | For example rifampicin, carbamazepine and St John's wort (also phenytoin).
Q: Why do NSAIDs raise lithium levels? | They reduce renal lithium clearance.
SUM: Pharmacokinetic interactions alter drug levels; pharmacodynamic ones alter effects.
SUM: Inhibition acts in days; induction takes one to two weeks.
SRC: Joint Formulary Committee, British National Formulary: interactions | guidance | 2026 | https://bnf.nice.org.uk/interactions/
SRC: Preston CL (editor), Stockley's Drug Interactions, Pharmaceutical Press | secondary | 2025
M2#pharmacy-u02-20-q1@1: Rifampicin is started in someone on a combined oral contraceptive. What's the main risk? | Contraceptive failure from enzyme induction | Increased oestrogen side effects | Rifampicin toxicity | Lower blood pressure | No interaction | Rifampicin induces liver enzymes, lowering hormone levels.
M2#pharmacy-u02-20-q2@2: An NSAID with warfarin raises bleeding risk mainly by what mechanism? | Pharmacodynamic: antiplatelet and GI effects add to anticoagulation | Increasing warfarin absorption | Inducing warfarin metabolism | Reducing vitamin K intake | Blocking warfarin excretion | NSAIDs impair platelets and the gastric mucosa, adding to bleeding risk.
M3#pharmacy-u02-20-q3@2: Carbamazepine is stopped in someone also taking a CYP3A4 substrate. What happens over the next two weeks? | The substrate's levels rise as induction wears off | Levels fall immediately | Nothing changes | The substrate becomes inactive | Levels rise within an hour | Enzyme induction declines gradually, so substrate levels climb over one to two weeks.

## Drug toxicity and overdose
S: Toxicity can follow overdose, accumulation or interactions. Knowing the mechanisms and the antidotes for common poisonings, and where to get expert advice, is part of every pharmacist's role.
O: Describe mechanisms of toxicity for common drugs in overdose
O: Name antidotes for key poisonings and the role of TOXBASE
T: Antidote | A treatment that counteracts a specific poison, such as acetylcysteine for paracetamol
T: TOXBASE | The UK National Poisons Information Service's online database for clinicians managing poisoning
H: Important poisonings
- **Paracetamol**: a toxic metabolite (NAPQI) builds up when glutathione is depleted, causing liver damage. Acetylcysteine replenishes glutathione; treatment decisions use the time and plasma level, following national guidance.
- **Opioids**: respiratory depression and reduced consciousness; naloxone reverses them.
- **Benzodiazepines**: sedation, worse with alcohol or opioids; flumazenil is rarely used because it can trigger seizures.
- **Tricyclic antidepressants**: cardiac arrhythmias and seizures; dangerous in overdose.
- **Iron, digoxin, lithium and anticoagulants** each have specific management.
H: Getting help
- TOXBASE and the National Poisons Information Service give up-to-date management advice to healthcare professionals.
- Members of the public with a suspected overdose need urgent medical help (999 or the emergency department; NHS 111 for advice).
K: Know the mechanism and antidote for paracetamol and opioid poisoning, and use TOXBASE for management.
!: Being reassured that someone who took a paracetamol overdose "feels fine": liver damage may not show for a day or more.
Q: What is the antidote for paracetamol poisoning? | Acetylcysteine.
Q: What is TOXBASE? | The UK National Poisons Information Service's database for managing poisoning.
SUM: Toxicity follows from mechanisms such as metabolite build-up or receptor overactivity.
SUM: Use antidotes and TOXBASE; people with an overdose need urgent medical care.
SRC: UK National Poisons Information Service, TOXBASE | guidance | 2026 | https://www.toxbase.org/
SRC: MHRA, Drug Safety Update: paracetamol overdose, simplification of the use of intravenous acetylcysteine | guidance | 2012-09 | https://www.gov.uk/drug-safety-update
M1#pharmacy-u02-21-q1@2: What is the antidote for opioid overdose? | Naloxone | Flumazenil | Acetylcysteine | Atropine | Vitamin K | Naloxone is a competitive opioid antagonist.
M2#pharmacy-u02-21-q2@1: Why does paracetamol overdose damage the liver? | A toxic metabolite builds up when glutathione runs out | It blocks bile flow | It kills liver cells directly at any dose | It causes low blood sugar only | It is excreted by the liver unchanged | NAPQI accumulates once glutathione is depleted.
M2#pharmacy-u02-21-q3@2: Someone says they took 30 paracetamol tablets an hour ago but feel well. What's right? | They need urgent medical assessment now | They can wait to see if symptoms develop | Advise rest and fluids | Suggest an antacid | Ask them to return tomorrow | Early symptoms may be absent while liver damage develops; treatment depends on time and levels.

## Pharmacogenomics
S: Genetic differences change how people respond to some medicines, by altering drug-metabolising enzymes or targets, or by increasing the risk of serious reactions. A few tests are already standard in UK practice.
O: Explain how genetic variation affects drug response
O: Give examples of pharmacogenomic tests used in UK practice
T: Pharmacogenomics | The study of how genetic variation affects drug response
T: Poor or ultra-rapid metaboliser | A person whose enzyme variant makes them metabolise a drug much more slowly or quickly than usual
H: Metabolism
- **CYP2D6**: converts codeine to morphine. Ultra-rapid metabolisers can get toxic morphine levels; poor metabolisers get little pain relief. Codeine is contraindicated in children under 12 and in breastfeeding, and restricted in children and young people.
- **CYP2C19**: activates clopidogrel; poor metabolisers get less antiplatelet effect.
- **TPMT**: metabolises azathioprine and mercaptopurine. Testing before starting reduces the risk of severe bone marrow toxicity.
- **DPD** (DPYD gene): breaks down fluorouracil and capecitabine. Testing before treatment is standard in the UK to prevent severe toxicity.
H: Hypersensitivity
- **HLA-B*57:01** testing before abacavir prevents hypersensitivity reactions.
- **HLA-B*15:02** (in people of some South-East Asian ancestry) predicts severe skin reactions to carbamazepine.
DRUG: Codeine | Opioid analgesic prodrug, converted to morphine by CYP2D6 | Mild to moderate pain; cough (limited use) | Constipation, drowsiness, dependence; toxic morphine levels in ultra-rapid metabolisers | Contraindicated under 12 years, in breastfeeding and in ultra-rapid metabolisers; counsel on drowsiness and driving; short courses (check the BNF and MHRA advice)
K: CYP2D6 (codeine), CYP2C19 (clopidogrel), TPMT (thiopurines), DPD (fluoropyrimidines) and HLA-B*57:01 (abacavir) are the key examples.
!: Supplying codeine for a breastfeeding mother: ultra-rapid metabolism can expose the baby to dangerous morphine levels.
Q: Why is DPD testing done before capecitabine? | DPD deficiency causes severe, potentially fatal toxicity.
Q: Which test is done before abacavir? | HLA-B*57:01.
SUM: Genetic variants affect metabolism, efficacy and serious reactions.
SUM: Several pharmacogenomic tests are standard before specific drugs.
SRC: MHRA, Drug Safety Update: codeine for analgesia, restricted use in children because of reports of morphine toxicity | guidance | 2013-07 | https://www.gov.uk/drug-safety-update
SRC: MHRA, Drug Safety Update: 5-fluorouracil and capecitabine, DPD testing recommended before initiation | guidance | 2020-10 | https://www.gov.uk/drug-safety-update
M2#pharmacy-u02-22-q1@1: Which enzyme converts codeine to morphine? | CYP2D6 | CYP3A4 | CYP2C19 | TPMT | DPD | CYP2D6 variation explains toxicity in ultra-rapid metabolisers and poor effect in poor metabolisers.
M2#pharmacy-u02-22-q2@2: What testing is standard before starting capecitabine? | DPD deficiency testing | TPMT testing | HLA-B*57:01 testing | CYP2D6 testing | No testing | DPD deficiency can cause severe fluoropyrimidine toxicity.
M3#pharmacy-u02-22-q3@2: A breastfeeding mother asks for co-codamol. What's the best response? | Recommend an alternative: codeine is contraindicated in breastfeeding | Supply it with advice to feed after doses | Supply the lowest strength | Supply it for up to a week | Advise she stops feeding while taking it | MHRA advice: codeine is contraindicated in breastfeeding because of the risk to the baby.

## Drug development and clinical trials
S: A new medicine takes over a decade to move from discovery to licence, through preclinical studies and phased clinical trials, then regulatory review and post-marketing surveillance. Understanding the process helps you judge the evidence for any medicine.
O: Describe the stages of drug development and the phases of clinical trials
O: Explain the roles of the MHRA and post-marketing surveillance
T: Phase III trial | A large randomised trial comparing a new drug with placebo or standard treatment for efficacy and safety
T: Marketing authorisation | The licence from a regulator (the MHRA in the UK) to market a medicine for stated uses
H: From discovery to licence
- **Discovery and preclinical**: identifying a target and a molecule; laboratory and animal studies of activity and toxicity.
- **Phase I**: small numbers of healthy volunteers (or patients for toxic drugs): safety, tolerability and pharmacokinetics.
- **Phase II**: patients with the condition: dose finding and early efficacy.
- **Phase III**: large randomised controlled trials: efficacy and safety against comparators.
- **Licensing**: the MHRA reviews quality, safety and efficacy and grants a marketing authorisation with the SPC.
H: After licensing
- **Phase IV and pharmacovigilance**: rare and long-term effects appear only in large populations. New medicines carry the black triangle (▼) for additional monitoring and Yellow Card reporting of all suspected reactions.
- NICE appraises cost-effectiveness for NHS use in England (with the SMC in Scotland and AWTTC in Wales).
K: Phases I to III establish safety and efficacy before licensing; pharmacovigilance continues after, especially for black triangle medicines.
!: Treating a licence as proof that a medicine has no unknown risks: rare effects often emerge after marketing.
Q: What is the main purpose of a phase I trial? | Safety, tolerability and pharmacokinetics, usually in small numbers of healthy volunteers.
Q: What does the black triangle (▼) mean? | The medicine is under additional monitoring: report all suspected reactions.
SUM: Drug development moves from preclinical work through phase I to III trials to licensing.
SUM: Post-marketing surveillance detects rare and long-term effects.
SRC: Medicines and Healthcare products Regulatory Agency, Clinical trials for medicines: guidance | guidance | 2025 | https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency
SRC: MHRA, Yellow Card scheme and black triangle medicines | guidance | 2026 | https://yellowcard.mhra.gov.uk/
M1#pharmacy-u02-23-q1@1: Which trial phase is mainly about dose finding in patients? | Phase II | Phase I | Phase III | Phase IV | Preclinical | Phase II studies dose and early efficacy in people with the condition.
M2#pharmacy-u02-23-q2@2: What should you report for a black triangle medicine? | All suspected adverse reactions | Only fatal reactions | Only reactions in children | Nothing until it's fully licensed | Only reactions listed in the leaflet | Black triangle medicines are under additional monitoring.
M2#pharmacy-u02-23-q3@1: In the UK, which body grants marketing authorisations for medicines? | The MHRA | NICE | The GPhC | The BMA | The NHS Business Services Authority | The MHRA licenses medicines; NICE appraises cost-effectiveness.

## Biological medicines and biosimilars
S: Biological medicines are large, complex molecules made in living cells, such as monoclonal antibodies, insulins and vaccines. Biosimilars are highly similar versions that cost less, and they have changed how many conditions are treated.
O: Describe how biological medicines differ from small-molecule drugs
O: Explain what biosimilars are and how they are used safely
T: Monoclonal antibody | A laboratory-made antibody targeting one specific molecule, named with the suffix -mab
T: Biosimilar | A biological medicine highly similar to an approved reference biological, with no clinically meaningful differences
H: Biologics
- Made by living cells, so they are large, complex and inherently variable between batches; most are given by injection because they would be digested orally.
- Examples: anti-TNF antibodies (adalimumab, infliximab) for rheumatoid arthritis and inflammatory bowel disease; insulins; erythropoietin; vaccines.
- They can provoke immune responses (anti-drug antibodies) that reduce effect, and many increase infection risk.
H: Biosimilars
- A biosimilar is shown to be highly similar in structure, function, safety and efficacy to its reference product. It isn't identical, like a generic small molecule.
- In the UK, biologicals are prescribed by brand name so that the product given is clear and traceable for pharmacovigilance.
- Switching to biosimilars, with clinical agreement and patient information, has produced large NHS savings.
DRUG: Adalimumab | Monoclonal antibody against tumour necrosis factor (TNF) | Rheumatoid arthritis, psoriatic arthritis, ankylosing spondylitis, Crohn's disease, ulcerative colitis, psoriasis | Serious infections including tuberculosis reactivation; injection site reactions; rarely demyelination or heart failure worsening | Screen for TB and hepatitis B before starting; avoid live vaccines; prescribe and record by brand; report infections promptly (check the BNF and SPC)
K: Biologics are large proteins made in living cells; biosimilars are highly similar, not identical, and are prescribed by brand.
!: Treating a biosimilar switch as automatic substitution without the clinical team and patient being involved, or recording it without the brand.
Q: Why are biological medicines prescribed by brand? | So the exact product is traceable for safety monitoring.
Q: What does the suffix -mab indicate? | A monoclonal antibody.
SUM: Biologics are complex, variable and usually injected.
SUM: Biosimilars are highly similar to their reference products and prescribed by brand.
SRC: MHRA, Guidance on the licensing of biosimilar products | guidance | 2021 | https://www.gov.uk/government/publications/guidance-on-the-licensing-of-biosimilar-products
SRC: NHS England, Commissioning framework for biological medicines (including biosimilar medicines) | guidance | 2017 | https://www.england.nhs.uk/
M1#pharmacy-u02-24-q1@1: Which is a monoclonal antibody? | Adalimumab | Methotrexate | Prednisolone | Omeprazole | Metformin | The -mab suffix denotes a monoclonal antibody (here, anti-TNF).
M2#pharmacy-u02-24-q2@2: Why are biologicals prescribed by brand name? | For traceability and pharmacovigilance | Because generics are illegal | Because brands are always cheaper | To avoid labelling | Because biosimilars are identical | Biosimilars aren't identical, so the product given must be recorded clearly.
M2#pharmacy-u02-24-q3@2: What screening is needed before starting an anti-TNF? | Tuberculosis and hepatitis B | Thyroid function only | DPD deficiency | HLA-B*57:01 | Bone density | Anti-TNF treatment can reactivate latent TB and hepatitis B.
`;
