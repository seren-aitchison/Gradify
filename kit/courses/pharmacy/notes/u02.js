// School 2: Pharmacology: How Drugs Act. UK, as at 2026.
// Format: kit/course/notes.js. Standard: docs/CURRICULUM_CONTENT_STANDARD.md
// EDUCATION ONLY. Drug cards are study summaries, not prescribing information: check the current BNF and SPC.
export default `
## What pharmacology is
S: Pharmacology is the study of how drugs affect the body and how the body handles drugs. It connects the chemistry of a molecule to what happens in a patient, which is why it sits at the centre of pharmacy.
O: Define pharmacology, pharmacodynamics and pharmacokinetics
O: Explain how pharmacology connects to safe medicines use
LV: Intermediate · Foundation
T: Pharmacodynamics | What a drug does to the body: its targets, mechanisms and effects
T: Pharmacokinetics | What the body does to a drug: absorption, distribution, metabolism and excretion
H: Two halves of the subject
- **Pharmacodynamics** asks where a drug acts and what follows: a receptor is activated or blocked, an enzyme inhibited, a channel opened.
- **Pharmacokinetics** (School 3) asks how much drug reaches its target, for how long, and how it's removed.
- Together they explain the dose, the timing, the effects and the side effects of every medicine.
P: The two halves interact. A usual dose of a drug cleared by the kidneys gives higher levels when kidney function falls (a pharmacokinetic change), and the extra drug at the target produces more effect and more side effects (a pharmacodynamic consequence). This is why the same dose can suit one person and harm another.
H: Why it matters in practice
- Mechanisms predict effects: blocking β2 receptors can cause bronchospasm, so non-selective β-blockers are avoided in asthma.
- Mechanisms predict interactions: two drugs that both prolong the QT interval add their risks.
- Mechanisms explain adverse reactions and help you counsel people about what to expect.
- Most drugs act on proteins: receptors, enzymes, ion channels and transporters. A few act by physical or chemical means (antacids, osmotic laxatives, chelating agents).
X: Reasoning from mechanism: why can ibuprofen cause stomach ulcers?
> Ibuprofen inhibits cyclo-oxygenase (COX), its pharmacodynamic target.
> COX makes prostaglandins that protect the stomach lining, so that protection is reduced.
> The harm is predictable, and the risk rises with higher doses, longer use and other drugs that harm the gut or impair clotting.
K: Pharmacodynamics is what the drug does to the body; pharmacokinetics is what the body does to the drug. Both decide what a dose achieves.
!: Learning drugs as lists of names and doses without their mechanisms: mechanisms are what let you predict effects, interactions and harms.
EV: established | A drug's effect follows from its action at a target (pharmacodynamics) and the exposure that reaches it (pharmacokinetics).
Q: Define pharmacodynamics. | The study of what a drug does to the body: its targets, mechanisms and effects.
Q: Name the four main kinds of protein drug target. | Receptors, enzymes, ion channels and transporters.
SUM: Pharmacology links a drug's molecular action to its effects in a patient.
SUM: Mechanisms predict effects, interactions and adverse reactions.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
SRC: Joint Formulary Committee, British National Formulary | guidance | 2026 | https://bnf.nice.org.uk/
M1#pharmacy-u02-01-q1@1: What does pharmacokinetics describe? | What the body does to a drug | What a drug does to the body | How drugs are manufactured | How drugs are licensed | How drugs are priced | Pharmacokinetics covers absorption, distribution, metabolism and excretion.
M2#pharmacy-u02-01-q2@2: Why are non-selective β-blockers avoided in asthma? | Blocking β2 receptors can cause bronchospasm | They raise blood glucose sharply | They cause asthma to develop | They block histamine release | They stimulate airway mucus glands | β2 receptors mediate bronchodilation, so blocking them can trigger bronchospasm.
M2#pharmacy-u02-01-q3@1: Which drug acts by a physical or chemical means, not a protein target? | An antacid | Salbutamol | Omeprazole | Sertraline | Propranolol | Antacids neutralise acid chemically; the others act on receptors, enzymes or transporters.
M3@1,2: A person with reduced kidney function gets more side effects from a usual dose of a renally excreted drug. What best explains this? | Lower clearance raises levels, so the effect at the target increases | The drug's receptors change shape in kidney disease | The drug becomes more potent in the kidneys | Kidney disease turns antagonists into agonists | The drug is absorbed faster from the gut | A pharmacokinetic change (less elimination, higher levels) produces a pharmacodynamic consequence (more effect at the same target).
SA2@1,2: Explain the difference between pharmacodynamics and pharmacokinetics, and why a pharmacist needs both to use medicines safely. | Pharmacodynamics is what the drug does to the body: its target, mechanism and effects. Pharmacokinetics is what the body does to the drug: absorption, distribution, metabolism and excretion, which decide how much reaches the target and for how long. Mechanisms predict effects, side effects and pharmacodynamic interactions (for example two QT-prolonging drugs); pharmacokinetics explains why kidney or liver impairment, or an interacting drug, changes the level. Together they explain why a dose suits one person and harms another. | Defines pharmacodynamics ; Defines pharmacokinetics (ADME) ; Mechanism predicts effects and interactions ; Exposure explains effect of organ function or interactions ; Links both to safe dosing

## Drug targets
S: Most drugs work by binding to a protein in the body and changing what it does. Knowing the four families of drug target lets you group medicines by mechanism and reason about new ones.
O: Describe the four main classes of protein drug target
O: Give an example of a medicine acting on each
LV: Intermediate · Foundation
T: Drug target | The molecule (usually a protein) a drug binds to in order to produce its effect
T: Selectivity | A drug's preference for one target over others, which is relative and often lost at high doses
H: The four families
- **Receptors**: proteins that respond to the body's own signalling molecules. Salbutamol activates β2 receptors.
- **Enzymes**: proteins that catalyse reactions. Omeprazole inhibits the proton pump; ibuprofen inhibits cyclo-oxygenase.
- **Ion channels**: pores that let ions cross membranes. Amlodipine blocks L-type calcium channels; local anaesthetics block sodium channels.
- **Transporters**: carriers that move molecules across membranes. Sertraline blocks the serotonin transporter; digoxin inhibits the Na⁺/K⁺-ATPase pump.
P: Not every target is a human protein. Penicillins inhibit bacterial enzymes (penicillin-binding proteins) that build the cell wall, and their selective toxicity comes from acting on something the bacterium has and human cells lack. Some cytotoxic drugs act directly on DNA.
H: Selectivity and side effects
- No drug is perfectly selective. At higher doses it binds other targets, which explains many side effects.
- Side effects can come from the same target in another tissue: β2 agonists cause tremor because skeletal muscle has β2 receptors too.
- The 3D drug-target model shows these families in a cell membrane.
X: Classifying drugs by target.
> Ramipril blocks angiotensin-converting enzyme: an enzyme target.
> Lidocaine blocks voltage-gated sodium channels: an ion channel target.
> Fluoxetine blocks the serotonin transporter: a transporter target, so expect class effects similar to sertraline's.
K: Group drugs by target: receptor, enzyme, ion channel or transporter. Side effects often come from the same target elsewhere, or other targets at higher doses.
!: Assuming a "selective" drug has no effect on other targets: selectivity is a matter of degree.
EV: established | Most medicines act by binding to receptors, enzymes, ion channels or transporters, and selectivity between targets is relative.
Q: Which family of target does amlodipine act on? | Ion channels (L-type calcium channels).
Q: Why does salbutamol cause tremor? | Skeletal muscle has β2 receptors as well as the airways.
SUM: Receptors, enzymes, ion channels and transporters are the main drug targets.
SUM: Selectivity is relative; many side effects follow from it.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
SRC: Alexander SPH and others, The Concise Guide to Pharmacology 2023/24, British Journal of Pharmacology | primary | 2023
M1#pharmacy-u02-02-q1@2: Which drug inhibits an enzyme? | Omeprazole | Salbutamol | Amlodipine | Sertraline | Atropine | Omeprazole inhibits the H⁺/K⁺-ATPase (proton pump), an enzyme.
M2#pharmacy-u02-02-q2@2: Sertraline acts mainly on which kind of target? | A transporter | An ion channel | A nuclear receptor | An enzyme in the gut | A cell-surface antibody | It blocks the serotonin reuptake transporter (SERT).
M2#pharmacy-u02-02-q3@1: Why can a selective drug cause side effects in other tissues? | Its target exists in those tissues too | Selective drugs have no side effects | It changes into a different drug | It always binds DNA | It's only absorbed by the liver | The same receptor in another tissue produces another effect, such as β2-mediated tremor.
M3@1,2: Salbutamol is selective for β2 receptors, yet high doses cause a fast heart rate. What is the best explanation? | Selectivity is relative: high doses also act on cardiac β receptors | Salbutamol is converted to adrenaline in the liver | It blocks cardiac potassium channels at high doses | It irreversibly inhibits an enzyme in heart muscle | It acts on nuclear receptors in the heart | β2 selectivity is a matter of degree; high doses stimulate β receptors in the heart, and β2-mediated vasodilation adds a reflex rise in rate.
SA2@1,2: Describe the four main families of protein drug target, giving a medicine that acts on each, and explain why selectivity matters for side effects. | Receptors respond to the body's signalling molecules (salbutamol activates β2 receptors). Enzymes catalyse reactions (omeprazole inhibits the proton pump; ibuprofen inhibits COX). Ion channels let ions cross membranes (amlodipine blocks L-type calcium channels). Transporters move molecules across membranes (sertraline blocks the serotonin transporter). No drug is perfectly selective: side effects come from the same target in other tissues (β2 tremor) or from other targets at higher doses. | Receptors with example ; Enzymes with example ; Ion channels with example ; Transporters with example ; Selectivity is relative and explains side effects

## Receptors and receptor families
S: Receptors are the body's sensors for its own signals, such as hormones and neurotransmitters. Drugs that mimic or block those signals act through four structural families, which differ in how fast and how they work.
O: Describe the four receptor families and how quickly each acts
O: Classify common drugs by the receptor family they act on
LV: Intermediate · Foundation
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
P: The family also helps explain duration. A GPCR effect ends soon after the drug leaves the receptor, but a nuclear receptor effect depends on new proteins being made and can outlast the drug in the plasma: once-daily prednisolone controls inflammation through the day although its plasma half-life is only a few hours.
X: Matching drugs to receptor families.
> Insulin binds a receptor with tyrosine kinase activity: kinase-linked, acting over minutes to hours.
> Ondansetron blocks 5-HT3 receptors, which are ligand-gated ion channels.
> Salbutamol activates β2 adrenoceptors, which are GPCRs, so it relieves bronchospasm within minutes.
K: Ion channel receptors act in milliseconds, GPCRs in seconds, kinase-linked receptors in minutes to hours, and nuclear receptors in hours.
!: Expecting an oral corticosteroid to work as quickly as an inhaled bronchodilator: nuclear receptor effects take hours.
EV: established | Receptors fall into four structural families that differ in signalling mechanism and in the speed of the response.
Q: Where do benzodiazepines act? | The GABA-A receptor, a ligand-gated ion channel.
Q: Which receptor family do corticosteroids act on? | Nuclear receptors.
SUM: The four families differ in mechanism and speed.
SUM: Receptor subtypes allow selective drugs.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
SRC: Alexander SPH and others, The Concise Guide to Pharmacology 2023/24, British Journal of Pharmacology | primary | 2023
M2#pharmacy-u02-03-q1@1: Which receptor family acts fastest? | Ligand-gated ion channels | G protein-coupled receptors | Kinase-linked receptors | Nuclear receptors | They all act equally fast | Ligand-gated channels open within milliseconds of binding.
M2#pharmacy-u02-03-q2@2: Opioid receptors belong to which family? | G protein-coupled receptors | Ligand-gated ion channels | Kinase-linked receptors | Nuclear receptors | Transporters | μ, δ and κ opioid receptors are G protein-coupled receptors, signalling mainly through Gi/Go.
M3#pharmacy-u02-03-q3@1: Why does prednisolone take hours to reduce inflammation? | It acts on nuclear receptors to change gene transcription | It must first be converted to insulin | It only works after it's excreted | It blocks ion channels slowly | It needs to reach the bone marrow first | Nuclear receptor effects depend on new gene transcription and protein synthesis.
M1@2: Which receptor family does insulin act on? | Kinase-linked receptors | Ligand-gated ion channels | G protein-coupled receptors | Nuclear receptors | Membrane transporters | The insulin receptor has intrinsic tyrosine kinase activity, so it is a kinase-linked receptor.
SA2@1,2: Describe the four receptor families, how quickly each produces a response, and give a drug acting on each. | Ligand-gated ion channels open when the ligand binds and act in milliseconds (benzodiazepines at GABA-A). G protein-coupled receptors activate G proteins and second messengers over seconds (salbutamol at β2). Kinase-linked receptors activate enzyme activity over minutes to hours (insulin). Nuclear receptors change gene transcription over hours (prednisolone, levothyroxine). The family predicts how fast a drug works and how long its effect lasts. | Ion channels: milliseconds, example ; GPCRs: seconds, example ; Kinase-linked: minutes to hours, example ; Nuclear: hours, example ; Speed and duration follow from mechanism

## Agonists and antagonists
S: A drug that binds a receptor either activates it (an agonist) or prevents activation (an antagonist). Partial agonists and inverse agonists sit between, and the kind of antagonism decides whether it can be overcome.
O: Distinguish full, partial and inverse agonists and antagonists
O: Explain competitive and non-competitive antagonism and their clinical consequences
LV: Intermediate · Foundation
T: Agonist | A drug that binds a receptor and activates it
T: Antagonist | A drug that binds a receptor without activating it, blocking agonists
H: Agonists
- **Full agonist**: produces the maximum response (morphine at μ-opioid receptors).
- **Partial agonist**: produces less than the maximum even at full occupancy, and can reduce the effect of a full agonist (buprenorphine at μ receptors).
- **Inverse agonist**: reduces a receptor's background (constitutive) activity.
P: A partial agonist can act as an antagonist when a full agonist is present. Buprenorphine binds μ receptors tightly; given to someone with high levels of a full agonist such as heroin or methadone, it displaces it, and its lower activation can precipitate withdrawal. That is why buprenorphine is started once withdrawal has begun.
H: Antagonists
- **Competitive (reversible)**: competes with the agonist for the same site; enough agonist overcomes it, shifting the dose-response curve to the right. Naloxone at opioid receptors.
- **Irreversible or non-competitive**: can't be overcome by more agonist, reducing the maximum response. Aspirin irreversibly acetylates cyclo-oxygenase (an enzyme), so its antiplatelet effect lasts the platelet's lifetime.
- Naloxone's action is shorter than many opioids', so repeated doses or an infusion may be needed after overdose.
X: Competitive antagonism in practice.
> Naloxone competes with morphine for μ receptors.
> Enough naloxone displaces the opioid, and breathing and consciousness improve: the block is surmountable and reversible.
> As naloxone is cleared, opioid still in the body re-occupies the receptors, so the person is monitored and doses repeated if needed.
DRUG: Naloxone | Competitive opioid receptor antagonist, mainly at μ receptors | Reversal of opioid overdose and opioid-induced respiratory depression | Precipitates acute withdrawal in dependent people; short duration, so opioid effects can return | Monitor breathing and consciousness after the dose wears off; take-home naloxone supplied with training; repeat doses may be needed (check the BNF)
K: Agonists activate; antagonists block. Competitive antagonism can be overcome by more agonist; irreversible antagonism can't.
!: Assuming one dose of naloxone is enough after a long-acting opioid overdose: its effect can wear off first.
EV: established | Agonists activate receptors and antagonists block them; competitive antagonism is surmountable and irreversible antagonism is not.
Q: What is a partial agonist? | A drug that activates a receptor but can't produce the full maximum response.
Q: How does a competitive antagonist change the agonist dose-response curve? | It shifts it to the right without lowering the maximum.
SUM: Full, partial and inverse agonists differ in how much they activate a receptor.
SUM: Competitive antagonism is surmountable; irreversible antagonism isn't.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
SRC: Joint Formulary Committee, British National Formulary: naloxone hydrochloride | guidance | 2026 | https://bnf.nice.org.uk/
M2#pharmacy-u02-04-q1@1: Buprenorphine at μ-opioid receptors is best described as what? | A partial agonist | A full agonist | A competitive antagonist | An inverse agonist | An enzyme inhibitor | It activates μ receptors but with a lower maximum effect than full agonists.
M2#pharmacy-u02-04-q2@2: Why might naloxone need repeating after an overdose of a long-acting opioid? | Its effect can wear off before the opioid's | It becomes an agonist after an hour | It is excreted unchanged in seconds | It only works on the second dose | It destroys opioid receptors | Naloxone acts for a shorter time than many opioids, so respiratory depression can return.
M3#pharmacy-u02-04-q3@2: Aspirin's antiplatelet effect lasts for days after a single dose. Why? | It irreversibly inhibits platelet cyclo-oxygenase | It is stored in fat for weeks | It is a competitive antagonist | It is renally cleared slowly | It activates thromboxane receptors | Platelets have no nucleus to make new COX, so the effect lasts their lifespan (about 7 to 10 days).
M1@1: What does an antagonist do at a receptor? | Binds without activating it, blocking agonists | Activates it to the maximum response | Activates it partly, below the maximum | Destroys the receptor permanently | Increases the number of receptors | Antagonists have affinity but no efficacy: they occupy the receptor and stop agonists acting.
SA3@1,2: A man taking methadone is given a first dose of buprenorphine and develops withdrawal symptoms. Later, a woman treated with naloxone for an overdose becomes drowsy again. Explain both events. | Buprenorphine is a high-affinity partial agonist at μ receptors. It displaces methadone, a full agonist, and produces less activation, so the net opioid effect falls and withdrawal is precipitated. Naloxone is a competitive antagonist with a shorter duration than many opioids: as it is cleared, the opioid still present re-occupies the receptors and respiratory depression and drowsiness return, so monitoring and repeat doses may be needed. | Buprenorphine is a partial agonist with high affinity ; Displacing a full agonist lowers net activation ; Naloxone is a competitive antagonist ; Naloxone wears off before many opioids ; Monitoring and repeat doses

## Dose-response relationships
S: As the dose of a drug increases, the response increases until it reaches a maximum. The shape of this relationship explains why doubling a dose rarely doubles the benefit but can increase harm.
O: Interpret graded and quantal dose-response curves
O: Explain the therapeutic index and its clinical importance
LV: Intermediate · Foundation
T: EC50 | The concentration that produces 50% of the maximum response
T: Therapeutic index | The ratio between the dose causing toxicity and the dose producing the wanted effect
H: Dose-response curves
- **Graded** curves plot the size of a response against concentration in one person or tissue. Plotted against log concentration they are S-shaped (sigmoid).
- At the top of the curve, extra drug adds little effect: the response is near its maximum.
- **Quantal** curves plot the proportion of a population showing an all-or-nothing response (for example, relief of a headache) against dose.
E: Therapeutic index = TD50 ÷ ED50 :: the median toxic dose divided by the median effective dose, both read from quantal curves
X: Why doubling a dose near the top adds little.
> An illustrative drug gives half its maximum effect at 10 mg, and its effect follows dose ÷ (dose plus 10).
> At 40 mg the effect is 40 ÷ 50, which is 80% of the maximum.
> At 90 mg it is 90 ÷ 100, which is 90%: more than doubling the dose adds only 10 percentage points, while dose-related side effects keep rising.
H: Therapeutic index
- The therapeutic index compares the toxic dose with the effective dose. A narrow therapeutic index means the two are close.
- Narrow therapeutic index drugs include digoxin, lithium, warfarin, phenytoin, theophylline, aminoglycosides and ciclosporin: they need careful dosing and often monitoring of levels.
- For these drugs, small changes in absorption, interactions or kidney function can cause toxicity or loss of effect.
K: The dose-response curve flattens near the maximum, so higher doses add more harm than benefit. Narrow therapeutic index drugs need monitoring.
!: Increasing a dose that's already near the top of its dose-response curve and expecting more benefit.
EV: established | Responses rise with concentration towards a maximum, and the therapeutic index describes the margin between effective and toxic doses.
Q: What does EC50 mean? | The concentration producing half the maximum response.
Q: Name three narrow therapeutic index drugs. | For example digoxin, lithium and warfarin (also phenytoin, theophylline, aminoglycosides).
SUM: Graded curves are sigmoid on a log scale; quantal curves describe populations.
SUM: Narrow therapeutic index drugs have toxic doses close to effective ones.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
SRC: Neubig RR and others, International Union of Pharmacology Committee on Receptor Nomenclature and Drug Classification XXXVIII: update on terms and symbols in quantitative pharmacology, Pharmacological Reviews 55: 597–606 | standard | 2003
M1#pharmacy-u02-05-q1@2: Which drug has a narrow therapeutic index? | Lithium | Paracetamol at usual doses | Amoxicillin | Cetirizine | Simvastatin | Lithium's toxic levels are close to its therapeutic range, so levels are monitored.
M2#pharmacy-u02-05-q2@1: Near the top of a dose-response curve, what does a higher dose mostly add? | Little extra effect but more risk | A proportional extra effect | A completely new effect | Lower toxicity | A shorter half-life | The response is close to its maximum, so extra drug mainly increases side effects.
M2#pharmacy-u02-05-q3@2: Why is a narrow therapeutic index clinically important? | Small changes in level can cause harm or failure | It means the drug acts very quickly | It means the drug can't be overdosed | It makes the drug safe in pregnancy | It removes the need for monitoring | When toxic and effective levels are close, interactions or kidney changes matter.
M3@1: An illustrative drug's effect follows dose ÷ (dose plus 10 mg). What happens to the effect when the dose rises from 40 mg to 90 mg? | It rises from 80% to 90% of the maximum | It more than doubles, from 40% to 90% | It rises from 80% to 100% of the maximum | It stays at 50% of the maximum | It falls because of receptor tolerance | 40 ÷ 50 is 0.8 and 90 ÷ 100 is 0.9: near the top of the curve a large dose increase adds little effect.
SA2@1,2: Explain what the therapeutic index is and why drugs with a narrow therapeutic index need careful dosing and monitoring. Give two examples. | The therapeutic index compares the dose (or concentration) causing toxicity with the dose producing the wanted effect, for example TD50 ÷ ED50. When it is narrow, effective and toxic levels are close, so small changes in absorption, kidney function or interacting drugs can cause toxicity or loss of effect. Such drugs, for example lithium, digoxin, warfarin, phenytoin and aminoglycosides, are dosed carefully and often monitored with blood levels or clinical tests. | Defines therapeutic index ; Narrow means toxic and effective levels are close ; Small changes cause harm or failure ; Need monitoring or levels ; Two correct examples

## Affinity, efficacy and potency
S: Three terms describe how a drug interacts with its receptor: affinity (how well it binds), efficacy (how well it activates) and potency (how much is needed). They are often confused, and the difference matters when comparing drugs.
O: Define affinity, efficacy and potency
O: Explain why a more potent drug isn't necessarily a better one
LV: Intermediate · Application
T: Affinity | How strongly a drug binds to its receptor
T: Efficacy | The ability of a bound drug to activate the receptor and produce a response
H: Three different properties
- **Affinity** is binding strength. Antagonists have affinity but no efficacy.
- **Efficacy** is how much response a drug can produce once bound. Full agonists have high efficacy; partial agonists lower.
- **Potency** is the amount needed for a given effect (often measured as EC50). It depends on both affinity and efficacy.
P: On a log concentration-response graph, a more potent drug's curve lies further to the left (a lower EC50), and a drug with greater efficacy reaches a higher plateau. A partial agonist's curve levels off below a full agonist's, however much is given.
H: Potency in practice
- A more potent drug needs a smaller dose, but that doesn't make it more effective: if both reach the same maximum, they're equally effective at appropriate doses.
- The maximum achievable effect (Emax) reflects efficacy. Loop diuretics produce a greater maximum diuresis than thiazides, whatever the dose of thiazide.
- High potency can increase risk when doses are small and easily confused (for example fentanyl compared with morphine).
X: Comparing three drugs on one graph.
> Drug P gives half its maximum effect at 1 mg and drug Q at 10 mg; both reach the same plateau.
> P is ten times more potent, but the two are equally efficacious: at suitable doses both give the same maximum.
> Drug R levels off at 60% of that maximum: lower efficacy, as with a partial agonist, whatever its potency.
K: Potency is about dose size; efficacy is about the maximum effect. A more potent drug isn't automatically more effective.
!: Assuming "stronger" (more potent) means "works better": a less potent drug at an adequate dose can work just as well.
EV: established | Affinity, efficacy and potency are distinct properties: potency sets the dose needed, efficacy sets the maximum achievable effect.
Q: Which property do antagonists have: affinity or efficacy? | Affinity (they bind) but no efficacy.
Q: What does Emax reflect? | The drug's efficacy: its maximum achievable effect.
SUM: Affinity, efficacy and potency are distinct.
SUM: Potency determines the dose; efficacy determines the maximum effect.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
SRC: Neubig RR and others, International Union of Pharmacology Committee on Receptor Nomenclature and Drug Classification XXXVIII: update on terms and symbols in quantitative pharmacology, Pharmacological Reviews 55: 597–606 | standard | 2003
M2#pharmacy-u02-06-q1@1: Antagonists have which property? | Affinity without efficacy | Efficacy without affinity | Both high affinity and efficacy | Neither property | Only potency | They bind the receptor but don't activate it.
M2#pharmacy-u02-06-q2@2: Drug A needs 1 mg and drug B 10 mg for the same maximum effect. What follows? | A is more potent; both are equally effective | A is more effective than B | B is more potent than A | A has lower affinity than B | B can't reach the maximum | Potency concerns dose, not the size of the maximum effect.
M3#pharmacy-u02-06-q3@1: Why do loop diuretics produce more diuresis than thiazides at any dose? | Loop diuretics have greater efficacy | Thiazides are more potent | Loop diuretics have lower affinity | Thiazides are partial antagonists | Loop diuretics are taken more often | Their maximum effect (Emax) is higher, which reflects efficacy, not potency.
M1@1: What does potency describe? | The amount of drug needed for a given effect | The maximum effect a drug can produce | How long a drug's effect lasts | How quickly a drug is absorbed | How safe a drug is in overdose | Potency is about dose size (often shown by EC50); the maximum effect reflects efficacy instead.
SA2@1,2: A colleague says fentanyl is "better" than morphine because it is more potent. Explain affinity, efficacy and potency, and why the claim is misleading. | Affinity is how strongly a drug binds its receptor; efficacy is how well the bound drug activates it; potency is the amount needed for a given effect and depends on both. Fentanyl is more potent, so smaller doses are used, but potency doesn't mean a greater maximum effect: equally efficacious drugs reach the same maximum at appropriate doses. High potency can add risk, because small doses are easily confused and errors are larger in effect. | Defines affinity ; Defines efficacy ; Defines potency ; Potency is not maximum effect ; High potency adds dosing risk

## Tolerance, desensitisation and dependence
S: Repeated exposure to a drug can reduce its effect (tolerance) and lead the body to adapt so that stopping causes withdrawal (dependence). These processes shape how drugs such as opioids, benzodiazepines and nitrates are used.
O: Explain the mechanisms of tolerance and desensitisation
O: Distinguish physical dependence, withdrawal and addiction
LV: Intermediate · Foundation
T: Tolerance | A reduced response to a drug after repeated use, so a higher dose is needed for the same effect
T: Dependence | An adaptation in which stopping the drug causes a withdrawal syndrome
H: Mechanisms
- **Receptor desensitisation**: receptors become less responsive or are removed from the cell surface (downregulation) after repeated stimulation, for example β-receptors with long-term agonists.
- **Pharmacokinetic tolerance**: the body clears the drug faster, for example through enzyme induction.
- **Physiological adaptation**: opposing mechanisms come into play.
- Nitrate tolerance develops within a day of continuous exposure, so a nitrate-free period is built into dosing schedules.
P: Tolerance doesn't develop equally to every effect. With opioids, tolerance to sedation, euphoria and respiratory depression develops, but little develops to constipation or pupil constriction, so laxatives are usually needed throughout long-term use. A person whose tolerance has fallen, for example after a period of abstinence or a hospital stay, is at high risk of overdose if they return to their previous dose.
H: Dependence and withdrawal
- **Physical dependence** is an expected adaptation: stopping causes withdrawal (opioids, benzodiazepines, alcohol, some antidepressants, corticosteroids).
- **Addiction** is a behavioural pattern of compulsive use despite harm. Dependence can exist without addiction.
- Stopping dependence-producing drugs needs a gradual, agreed reduction plan.
X: Building in a nitrate-free period.
> Continuous nitrate exposure causes tolerance within about a day.
> Standard-release isosorbide mononitrate taken twice daily is therefore given at asymmetric times (for example morning and early afternoon), leaving a low-nitrate period overnight.
> Once-daily modified-release products achieve the same thing; check the BNF for each product's regimen.
K: Tolerance needs more drug for the same effect; dependence means stopping causes withdrawal. Neither is the same as addiction.
!: Stopping a benzodiazepine, opioid or long-term corticosteroid abruptly, which can cause dangerous withdrawal.
EV: established | Repeated exposure can cause tolerance and physical dependence, which are distinct from addiction.
Q: Why do nitrate regimens include a nitrate-free period? | To prevent nitrate tolerance.
Q: Can dependence occur without addiction? | Yes: physical dependence is an expected adaptation, distinct from compulsive use.
SUM: Tolerance and desensitisation reduce a drug's effect over time.
SUM: Dependence causes withdrawal on stopping; addiction is a behavioural pattern.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
SRC: NICE NG215, Medicines associated with dependence or withdrawal symptoms: safe prescribing and withdrawal management for adults | guidance | 2022 | https://www.nice.org.uk/guidance/ng215
M2#pharmacy-u02-07-q1@1: Why do isosorbide mononitrate regimens include a nitrate-free period? | To prevent tolerance | To reduce the cost | To avoid kidney damage | To allow sleep | To improve absorption | Continuous nitrate exposure causes tolerance within about a day.
M2#pharmacy-u02-07-q2@2: Which statement about dependence is correct? | It can occur without addiction | It always means addiction | It only happens with illegal drugs | It never causes withdrawal | It prevents tolerance | Physical dependence is an adaptation; addiction is compulsive use despite harm.
M2#pharmacy-u02-07-q3@2: What is the safest way to stop a long-term benzodiazepine? | A gradual, agreed dose reduction | Stopping it immediately | Swapping to alcohol | Doubling the dose then stopping | Missing alternate days | Abrupt withdrawal can cause rebound anxiety, insomnia and seizures; NICE NG215 advises planned tapering.
M1@1: What is tolerance? | A reduced response to repeated doses of a drug | An allergic reaction to a drug | A withdrawal syndrome on stopping a drug | Compulsive drug use despite harm | An increased response to each dose | With tolerance, a higher dose is needed for the same effect, through desensitisation, faster clearance or adaptation.
SA3@1,2: A man has taken high-dose opioids for years. He stops for a month while in hospital and is then discharged. Explain the risks using the ideas of tolerance, dependence and addiction. | Long-term use produces tolerance (less sedation and respiratory depression per dose) and physical dependence (withdrawal if stopped abruptly). Dependence is an expected adaptation and differs from addiction, which is compulsive use despite harm. After a month without opioids his tolerance has fallen, so returning to his previous dose could cause dangerous respiratory depression. Tolerance to constipation is limited, so laxatives remain relevant. Discharge planning should address dose, overdose risk and take-home naloxone where appropriate. | Tolerance explained ; Dependence and withdrawal explained ; Addiction distinguished ; Loss of tolerance raises overdose risk ; Practical safety step such as naloxone or dose review

## G protein-coupled receptors and second messengers
S: G protein-coupled receptors (GPCRs) are the largest family of drug targets. Binding switches on a G protein, which changes the level of a second messenger inside the cell and amplifies the signal.
O: Describe how GPCRs signal through G proteins and second messengers
O: Link major G protein types to drug effects
LV: Intermediate · Application
T: G protein | A protein inside the cell that is switched on by an activated GPCR and passes on the signal
T: Second messenger | A small molecule inside the cell (such as cAMP or calcium) that carries a receptor's signal onwards
H: Three main G protein pathways
- **Gs** stimulates adenylyl cyclase, raising cAMP. β-adrenoceptors use Gs: in airway smooth muscle, more cAMP causes relaxation (bronchodilation).
- **Gi** inhibits adenylyl cyclase, lowering cAMP. Opioid and α2 receptors use Gi.
- **Gq** activates phospholipase C, producing IP3 (which releases calcium) and DAG. α1-adrenoceptors and M3 muscarinic receptors use Gq, causing smooth muscle contraction and gland secretion.
P: The same second messenger can have different effects in different tissues because the downstream machinery differs. Raised cAMP relaxes airway smooth muscle (β2) but increases rate and force in the heart (β1), so the pathway together with the tissue predicts the response.
H: Amplification and drug design
- One activated receptor activates many G proteins, and each enzyme makes many second messenger molecules, so a small signal has a large effect.
- Drugs can also act downstream: phosphodiesterase inhibitors (such as sildenafil) slow the breakdown of cyclic nucleotides.
- Around a third of medicines act on GPCRs, including β-blockers, antihistamines, opioids and many antipsychotics.
X: Tracing a signal: salbutamol.
> Salbutamol binds β2 adrenoceptors on airway smooth muscle.
> The receptor activates Gs, which stimulates adenylyl cyclase and raises cAMP.
> cAMP activates protein kinase A, which relaxes the muscle: bronchodilation within minutes.
K: Gs raises cAMP, Gi lowers it, Gq raises calcium via IP3. The pathway explains the tissue response.
!: Assuming every GPCR increases cAMP: Gi-coupled receptors lower it and Gq-coupled ones act through calcium.
EV: established | GPCRs signal through Gs, Gi and Gq proteins and second messengers, amplifying the signal.
Q: Which G protein do β-adrenoceptors use? | Gs, which raises cAMP.
Q: What does Gq signalling produce? | IP3 and DAG, raising intracellular calcium.
SUM: GPCRs act through G proteins and second messengers, amplifying signals.
SUM: Gs, Gi and Gq pathways produce different tissue responses.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
SRC: Alexander SPH and others, The Concise Guide to Pharmacology 2023/24: G protein-coupled receptors, British Journal of Pharmacology | primary | 2023
M2#pharmacy-u02-08-q1@1: Activating β2 receptors in airway muscle raises which second messenger? | cAMP | IP3 | cGMP | Diacylglycerol | Nitric oxide | β2 receptors couple to Gs, which stimulates adenylyl cyclase to make cAMP.
M2#pharmacy-u02-08-q2@2: M3 muscarinic receptors on glands increase secretion through which G protein? | Gq | Gs | Gi | No G protein | A kinase-linked pathway | M3 receptors couple to Gq, raising calcium via IP3.
M3#pharmacy-u02-08-q3@1: Opioid receptors reduce neuronal excitability partly by doing what? | Lowering cAMP via Gi | Raising cAMP via Gs | Opening sodium channels | Activating nuclear receptors | Inhibiting the proton pump | Opioid receptors couple to Gi/Go, which inhibit adenylyl cyclase and open potassium channels.
M1@1: What is a second messenger? | An intracellular molecule relaying the signal | A hormone released by a second gland | A receptor found on the nucleus | A drug given after the first one | An enzyme circulating in the blood | Second messengers such as cAMP, IP3 and calcium carry a receptor's signal inside the cell and amplify it.
SA2@1,2: Explain how a GPCR signals, comparing the Gs, Gi and Gq pathways with a drug or receptor example for each. | An agonist binds the GPCR, which activates a G protein inside the cell; the G protein changes the activity of an enzyme and the level of a second messenger, amplifying the signal. Gs stimulates adenylyl cyclase and raises cAMP (β-adrenoceptors: bronchodilation in the airways). Gi inhibits adenylyl cyclase and lowers cAMP (opioid and α2 receptors). Gq activates phospholipase C, producing IP3 and DAG and raising calcium (α1 and M3 receptors: smooth muscle contraction and secretion). | Receptor activates a G protein ; Second messenger and amplification ; Gs and cAMP with example ; Gi with example ; Gq, IP3 and calcium with example

## Ion channels as drug targets
S: Ion channels control the electrical activity of nerves, muscle and the heart. Drugs that open, block or modulate them treat epilepsy, arrhythmias, hypertension and pain, and also cause some of the most serious adverse effects.
O: Describe how drugs act on voltage-gated and ligand-gated ion channels
O: Give clinical examples of ion channel drugs and their risks
LV: Intermediate · Application
T: Voltage-gated channel | An ion channel that opens or closes when the membrane voltage changes
T: Use-dependent block | A block that increases when the channel opens more often, as in rapidly firing nerves
H: Channels and drugs
- **Sodium channels**: local anaesthetics (lidocaine) and some antiepileptics (carbamazepine) block them; block is use-dependent, so rapidly firing neurons are affected most.
- **Calcium channels**: amlodipine (vascular) and verapamil and diltiazem (heart as well) block L-type channels, lowering blood pressure or heart rate.
- **Potassium channels**: sulfonylureas close ATP-sensitive potassium channels in pancreatic β cells, releasing insulin; some antiarrhythmics block cardiac potassium channels.
- **Ligand-gated channels**: benzodiazepines enhance GABA-A receptor chloride currents.
P: Use-dependence is an advantage in treatment: carbamazepine and lidocaine act most on neurons that are firing repeatedly, as in a seizure focus or a pain pathway, and least on normally active tissue.
H: Risks
- Blocking the cardiac hERG potassium channel prolongs the QT interval and can cause torsades de pointes. Many drugs do this (some antipsychotics, macrolides, methadone, citalopram).
- Combining QT-prolonging drugs, or giving them with low potassium or magnesium, adds risk.
X: Checking a QT combination.
> A woman taking citalopram is prescribed clarithromycin, and her recent potassium was low.
> Both drugs block hERG channels and prolong the QT interval, and low potassium adds to the risk.
> Contact the prescriber to discuss an alternative antibiotic, checking the BNF interactions entry and the MHRA advice.
K: Ion channel drugs alter electrical activity; hERG potassium channel block prolongs the QT interval, a key interaction to check.
!: Missing an additive QT-prolonging combination, for example a macrolide with citalopram, in someone with low potassium.
EV: established | Drugs that block or open sodium, calcium and potassium channels alter electrical activity, and hERG block prolongs the QT interval.
Q: Why do local anaesthetics affect rapidly firing nerves most? | Their sodium channel block is use-dependent.
Q: Which cardiac channel is linked to QT prolongation? | The hERG potassium channel.
SUM: Sodium, calcium and potassium channels and ligand-gated channels are important drug targets.
SUM: hERG block prolongs QT; check for combinations and electrolyte disturbance.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
SRC: MHRA, Drug Safety Update: citalopram and escitalopram, QT interval prolongation | guidance | 2011-12 | https://www.gov.uk/drug-safety-update
M2#pharmacy-u02-09-q1@1: Sulfonylureas increase insulin secretion by acting on which channel? | ATP-sensitive potassium channels | L-type calcium channels | Voltage-gated sodium channels | GABA-A chloride channels | hERG potassium channels | They close K-ATP channels in β cells, depolarising them and releasing insulin.
M2#pharmacy-u02-09-q2@2: Which combination most raises the risk of QT prolongation? | Clarithromycin with citalopram | Paracetamol with ibuprofen | Amlodipine with atorvastatin | Omeprazole with metformin | Amoxicillin with paracetamol | Both prolong the QT interval, so their effects add.
M3#pharmacy-u02-09-q3@1: Why do verapamil and amlodipine have different main effects? | Verapamil acts more on the heart; amlodipine on blood vessels | Amlodipine blocks sodium channels | Verapamil is a β-blocker | Amlodipine only acts in the gut | They act on different receptor families | Both block L-type channels, but with different tissue selectivity.
M1@1: Which ion channels do local anaesthetics such as lidocaine block? | Voltage-gated sodium channels | L-type calcium channels | ATP-sensitive potassium channels | GABA-A chloride channels | hERG potassium channels | Blocking sodium channels stops action potentials passing along the nerve, so pain signals don't reach the brain.
SA3@1,2: Explain how drugs can prolong the QT interval, which factors add to the risk, and what a pharmacist should do when a combination is found. | Many drugs block the cardiac hERG potassium channel, slowing repolarisation and prolonging the QT interval, which can lead to torsades de pointes. Examples include some antipsychotics, macrolides, methadone and citalopram. Risk adds up when two QT-prolonging drugs are combined and rises with low potassium or magnesium, existing heart disease or an inhibitor raising drug levels. The pharmacist checks the BNF and MHRA advice, contacts the prescriber to consider an alternative or monitoring (such as an ECG and electrolytes), and records the decision. | hERG block slows repolarisation ; Torsades de pointes risk ; Examples of QT-prolonging drugs ; Additive and electrolyte risk factors ; Action: check references, contact prescriber, monitor

## Enzymes as drug targets
S: Many medicines work by inhibiting an enzyme, stopping the production of a harmful product or the breakdown of a useful one. Whether inhibition is reversible decides how long the effect lasts.
O: Explain reversible and irreversible enzyme inhibition
O: Describe major enzyme-inhibiting medicines and their effects
LV: Intermediate · Application
T: Enzyme inhibitor | A drug that reduces an enzyme's activity
T: Irreversible inhibition | Permanent inactivation of an enzyme, so the effect lasts until new enzyme is made
H: Examples
- **Cyclo-oxygenase (COX)**: NSAIDs reversibly inhibit COX, reducing prostaglandins; aspirin irreversibly acetylates it.
- **ACE**: ACE inhibitors (ramipril, lisinopril) block conversion of angiotensin I to angiotensin II.
- **HMG-CoA reductase**: statins reduce cholesterol synthesis.
- **Proton pump (H⁺/K⁺-ATPase)**: PPIs irreversibly inhibit it in the parietal cell, so a single daily dose works for about a day.
- **Acetylcholinesterase**: donepezil (in dementia) and pyridostigmine (in myasthenia gravis) increase acetylcholine.
- **Xanthine oxidase**: allopurinol lowers uric acid.
P: Inhibiting an enzyme also lets its other substrates build up, which explains some adverse effects. ACE also breaks down bradykinin, so ACE inhibitors raise bradykinin, which is thought to cause their dry cough and, rarely, angioedema; angiotensin receptor blockers act further along the pathway and cause cough much less often.
H: Reversibility and duration
- Reversible inhibitors work while the drug is present; irreversible ones last until the body makes new enzyme, however short the drug's half-life.
X: Predicting how long an effect lasts after stopping.
> A person stops ibuprofen (a reversible COX inhibitor) and aspirin (an irreversible one).
> Ibuprofen's antiplatelet effect wanes as the drug is cleared, within about a day.
> Aspirin's effect fades only as new platelets are made, over their lifespan of about 7 to 10 days.
DRUG: Omeprazole | Proton pump inhibitor: irreversibly inhibits the gastric H⁺/K⁺-ATPase | Gastro-oesophageal reflux, peptic ulcer, Helicobacter pylori eradication, protection against NSAID ulcers | Headache, diarrhoea; with long-term use, Clostridioides difficile infection risk, low magnesium and fracture risk | Review long-term need and step down where possible; taken before food; interacts with clopidogrel through CYP2C19 (check the BNF)
K: Irreversible inhibitors (aspirin, PPIs) act long after the drug has gone; reversible ones act while the drug is present.
!: Continuing a PPI indefinitely without review: long-term use has risks, so the need should be reviewed regularly.
EV: established | Enzyme inhibitors reduce product formation or substrate breakdown; irreversible inhibition lasts until new enzyme is made.
Q: Why does a once-daily PPI work all day? | It irreversibly inhibits proton pumps, which must be replaced.
Q: Which enzyme do statins inhibit? | HMG-CoA reductase.
SUM: Many drugs act by inhibiting enzymes.
SUM: Irreversible inhibition outlasts the drug's presence in the body.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
SRC: Joint Formulary Committee, British National Formulary: omeprazole | guidance | 2026 | https://bnf.nice.org.uk/
M1#pharmacy-u02-10-q1@2: Which enzyme does allopurinol inhibit? | Xanthine oxidase | Cyclo-oxygenase | HMG-CoA reductase | Angiotensin-converting enzyme | Acetylcholinesterase | Inhibiting xanthine oxidase reduces uric acid production.
M2#pharmacy-u02-10-q2@1: Why does aspirin's effect on platelets outlast the drug? | It irreversibly inhibits COX | It's stored in red cells | It has a half-life of a week | It reversibly blocks receptors | It's converted to warfarin | Irreversible acetylation of COX lasts until new platelets are made.
M2#pharmacy-u02-10-q3@2: Donepezil helps in Alzheimer's disease by inhibiting which enzyme? | Acetylcholinesterase | Monoamine oxidase | Dopa decarboxylase | Cyclo-oxygenase | Xanthine oxidase | Less acetylcholine breakdown increases cholinergic transmission.
M3@1,2: A patient taking ramipril develops a persistent dry cough. What best explains it? | Bradykinin builds up because ACE also breaks it down | Angiotensin II builds up in the airways | Ramipril irreversibly inhibits cyclo-oxygenase | Ramipril blocks β2 receptors in the airways | It is an immune, type B allergic reaction | ACE inactivates bradykinin; inhibiting it raises bradykinin, which is linked to cough and, rarely, angioedema.
SA2@1,2: Compare reversible and irreversible enzyme inhibition, using two medicines as examples, and explain how this affects the duration of action. | A reversible inhibitor binds the enzyme while the drug is present, so its effect falls as the drug is cleared: NSAIDs such as ibuprofen inhibit COX reversibly. An irreversible inhibitor permanently inactivates the enzyme, so the effect lasts until new enzyme is made, however short the drug's half-life: aspirin acetylates platelet COX for the platelet's lifetime, and PPIs inactivate proton pumps, so once-daily dosing works. | Reversible inhibition explained ; Reversible example ; Irreversible inhibition explained ; Irreversible example ; Duration depends on enzyme turnover

## Transporters as drug targets
S: Transporters carry ions and molecules across membranes, against gradients if they use energy. Drugs that block them treat depression, heart failure, diabetes and oedema, and transporters also shape how drugs are absorbed and excreted.
O: Describe how drugs act on membrane transporters
O: Give examples of transporter-targeting medicines and their effects
LV: Intermediate · Application
T: Reuptake transporter | A transporter that clears a neurotransmitter from the synapse back into the neuron
T: Na⁺/K⁺-ATPase | The pump that moves sodium out of and potassium into cells, using ATP
H: Examples
- **Monoamine reuptake**: SSRIs (sertraline, fluoxetine) block the serotonin transporter; some antidepressants also block noradrenaline reuptake.
- **Na⁺/K⁺-ATPase**: digoxin inhibits it in heart muscle, increasing intracellular calcium and contractility and slowing AV conduction.
- **Kidney transporters**: loop diuretics block the Na⁺/K⁺/2Cl⁻ cotransporter; thiazides block the Na⁺/Cl⁻ cotransporter; SGLT2 inhibitors (dapagliflozin) block glucose reabsorption.
P: SSRIs block reuptake within hours, yet their antidepressant effect takes weeks. The delay is thought to reflect slower adaptive changes, such as altered receptor sensitivity, which is why people are encouraged to continue treatment even when early benefit is small.
H: Transporters and drug handling
- Transporters such as P-glycoprotein pump drugs out of cells, affecting absorption and excretion; inhibiting them causes interactions (for example raising digoxin levels).
- Low potassium increases digoxin binding and toxicity, so diuretics that lower potassium raise the risk.
X: Following a transporter interaction.
> A man taking digoxin and furosemide has a low potassium.
> Furosemide blocks the Na⁺/K⁺/2Cl⁻ cotransporter and increases potassium loss in the urine.
> With less potassium competing at the Na⁺/K⁺-ATPase, digoxin binds more and toxicity is more likely: check his potassium, symptoms and whether a level is needed.
DRUG: Digoxin | Cardiac glycoside: inhibits the Na⁺/K⁺-ATPase, increasing contractility and slowing AV conduction | Rate control in atrial fibrillation; heart failure | Narrow therapeutic index; toxicity causes nausea, visual disturbance, confusion and arrhythmias; risk rises with low potassium and renal impairment | Monitor pulse, renal function, potassium and levels where toxicity is suspected; check interactions (for example amiodarone and P-glycoprotein inhibitors) in the BNF
DRUG: Sertraline | Selective serotonin reuptake inhibitor (blocks the serotonin transporter) | Depression and anxiety disorders, including panic disorder, OCD and PTSD | Nausea and GI upset; low sodium in older people; increased bleeding risk with NSAIDs or anticoagulants; serotonin syndrome with other serotonergic drugs | Effect takes weeks; don't stop abruptly; monitor mood and suicidal thoughts early on, especially in young people; check sodium if symptoms suggest it
K: Many important drugs block transporters: SSRIs, digoxin, loop and thiazide diuretics, SGLT2 inhibitors.
!: Overlooking low potassium in a patient on digoxin and a loop diuretic, which increases digoxin toxicity.
EV: established | Blocking membrane transporters is the mechanism of SSRIs, digoxin, loop and thiazide diuretics and SGLT2 inhibitors.
Q: Which transporter do loop diuretics block? | The Na⁺/K⁺/2Cl⁻ cotransporter in the loop of Henle.
Q: Why does low potassium increase digoxin toxicity? | Digoxin competes with potassium at the Na⁺/K⁺-ATPase, so it binds more when potassium is low.
SUM: Transporters are targets for antidepressants, digoxin, diuretics and SGLT2 inhibitors.
SUM: Transporters like P-glycoprotein also cause interactions.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
SRC: Joint Formulary Committee, British National Formulary: digoxin and sertraline | guidance | 2026 | https://bnf.nice.org.uk/
M2#pharmacy-u02-11-q1@1: Dapagliflozin lowers blood glucose by blocking which transporter? | SGLT2 in the kidney | The serotonin transporter | The Na⁺/K⁺-ATPase | GLUT4 in muscle | P-glycoprotein in the gut | It reduces glucose reabsorption so more glucose is excreted in urine.
M2#pharmacy-u02-11-q2@2: A patient on digoxin starts a loop diuretic. What should you watch for? | Low potassium increasing toxicity | Higher blood sugar | Lower digoxin absorption | Increased appetite | Hair loss | Loop diuretics can lower potassium, which increases digoxin's effect and toxicity.
M3#pharmacy-u02-11-q3@2: Why can amiodarone raise digoxin levels? | It inhibits P-glycoprotein and reduces digoxin clearance | It induces liver enzymes | It is a potassium supplement | It speeds up kidney excretion | It blocks digoxin absorption | Inhibiting P-gp transport reduces digoxin excretion, so levels rise; the dose may need reducing (check the BNF).
M1@1: Which transporter do SSRIs such as sertraline block? | The serotonin transporter | The Na⁺/K⁺-ATPase pump | The SGLT2 cotransporter | P-glycoprotein in the gut | The Na⁺/K⁺/2Cl⁻ cotransporter | SSRIs block serotonin reuptake into the neuron, raising its level in the synapse.
SA3@2: An 80-year-old taking digoxin is started on furosemide and, a week later, amiodarone. Explain how each change could increase the risk of digoxin toxicity and what should be monitored. | Furosemide blocks the Na⁺/K⁺/2Cl⁻ cotransporter and increases potassium loss; low potassium increases digoxin binding to the Na⁺/K⁺-ATPase and so its toxicity. Amiodarone inhibits P-glycoprotein and reduces digoxin clearance, raising levels, so the digoxin dose may need reducing (check the BNF). Older age and reduced renal function add to accumulation. Monitor potassium, renal function, pulse, symptoms such as nausea, visual disturbance and confusion, and a digoxin level if toxicity is suspected. | Furosemide lowers potassium ; Low potassium increases digoxin toxicity ; Amiodarone inhibits P-glycoprotein and raises levels ; Age and renal function ; Monitoring of potassium, renal function, symptoms and levels

## Nuclear receptors
S: Nuclear receptors sit inside the cell and act as transcription factors when a hormone or drug binds. They mediate the effects of corticosteroids, thyroid hormones, sex hormones and some diabetes and lipid drugs.
O: Explain how nuclear receptors change gene expression
O: Describe the medicines that act through nuclear receptors and their time course
LV: Intermediate · Application
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
X: Explaining the time course to a patient.
> Prednisolone is started for an asthma attack alongside salbutamol.
> Salbutamol, acting on GPCRs, relieves bronchospasm within minutes.
> Prednisolone, acting on nuclear receptors, reduces airway inflammation over hours as new proteins are made, so both are needed and neither replaces the other.
DRUG: Prednisolone | Glucocorticoid: agonist at glucocorticoid (nuclear) receptors | Inflammatory and autoimmune conditions, asthma and COPD exacerbations | High glucose, mood change, infection risk, osteoporosis and adrenal suppression with prolonged use | Take in the morning with food; carry a steroid card if on long-term or repeated courses; don't stop abruptly after prolonged use; consider bone protection (check the BNF)
K: Nuclear receptor drugs change gene expression: effects take hours and long-term corticosteroids suppress the adrenal axis.
!: Stopping long-term prednisolone abruptly, risking adrenal crisis.
EV: established | Nuclear receptors act as ligand-activated transcription factors, so their effects develop over hours.
Q: Why do glucocorticoid effects take hours? | They act by changing gene transcription.
Q: Name a drug acting on PPAR-γ. | Pioglitazone.
SUM: Nuclear receptors are transcription factors activated by hormones and drugs.
SUM: Long-term corticosteroids need a steroid card and gradual withdrawal.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
SRC: NHS England and Society for Endocrinology, National Patient Safety Alert: steroid emergency card to support early recognition and treatment of adrenal crisis | guidance | 2020 | https://www.england.nhs.uk/
M2#pharmacy-u02-12-q1@1: Which drug acts through a nuclear receptor? | Levothyroxine | Salbutamol | Omeprazole | Lidocaine | Sertraline | Thyroid hormone acts on intracellular thyroid receptors that regulate gene transcription.
M2#pharmacy-u02-12-q2@2: What is the main risk of stopping prednisolone suddenly after months of use? | Adrenal crisis | Low blood glucose only | A rash | Bronchospasm | Raised potassium only | The adrenal glands are suppressed and can't respond to stress at once.
M3#pharmacy-u02-12-q3@1: Pioglitazone and fibrates have what in common? | Both act on PPAR nuclear receptors | Both block ion channels | Both inhibit HMG-CoA reductase | Both block β-receptors | Both are insulin analogues | Pioglitazone is a PPAR-γ agonist and fibrates are PPAR-α agonists.
M1@1: Where are nuclear receptors found? | Inside the cell, in the cytoplasm or nucleus | In the cell membrane, linked to G proteins | On nerve endings at the synapse | On the outer surface of red cells | Only in the lining of the stomach | Their lipid-soluble ligands cross the cell membrane and bind the receptor inside the cell.
SA2@2: Explain why someone who has taken prednisolone for several months must not stop it suddenly, and what support they need. | Prednisolone acts on glucocorticoid (nuclear) receptors. Long-term use suppresses the hypothalamic-pituitary-adrenal axis, so the adrenal glands make less cortisol. Stopping suddenly after more than about three weeks, or after repeated courses, risks adrenal crisis because the adrenals can't respond to stress at once. The dose is withdrawn gradually according to the BNF and the prescriber. People on long-term steroids need a steroid emergency card and sick-day guidance, and bone protection may be considered. | Acts on nuclear receptors ; Suppresses the adrenal axis ; Abrupt stopping risks adrenal crisis ; Gradual withdrawal ; Steroid card and sick-day guidance

## The autonomic nervous system
S: The autonomic nervous system controls involuntary functions: heart rate, blood pressure, airways, gut, bladder and glands. Many common drugs act on its two branches, so knowing its receptors predicts their effects and side effects.
O: Describe the sympathetic and parasympathetic systems and their transmitters
O: Predict drug effects from autonomic receptor actions
LV: Intermediate · Foundation
T: Sympathetic nervous system | The "fight or flight" branch; its post-ganglionic transmitter is mainly noradrenaline
T: Parasympathetic nervous system | The "rest and digest" branch; its post-ganglionic transmitter is acetylcholine
H: Organisation
- Both branches use acetylcholine at the ganglia (nicotinic receptors).
- Parasympathetic nerves release acetylcholine onto **muscarinic** receptors on organs.
- Sympathetic nerves release noradrenaline onto **adrenoceptors** (α and β); the adrenal medulla releases adrenaline into the blood.
- Exception: sympathetic nerves to sweat glands use acetylcholine.
H: Effects on organs
P: In each line below, the sympathetic effect and its receptor come first, then the parasympathetic one. Most organs receive both branches, and the balance sets the resting state: at rest, vagal (parasympathetic) tone keeps the heart rate below the pacemaker's intrinsic rate. Most blood vessels are controlled by sympathetic tone alone.
- Heart: faster and stronger (β1); slower (M2).
- Airways: dilate (β2); constrict and secrete (M3).
- Blood vessels: most constrict (α1).
- Gut: reduced motility (sympathetic); increased motility and secretion (M3).
- Bladder: relaxes the detrusor (β3) and contracts the sphincter (α1); contracts the detrusor (M3).
- Eye: pupil dilates (α1); pupil constricts (M3).
X: Predicting an antimuscarinic's side effects from the receptor map.
> Oxybutynin blocks muscarinic receptors to relax the bladder's detrusor muscle (M3).
> The same block elsewhere gives a dry mouth (salivary glands), constipation (gut), blurred vision (eye) and a faster heart rate (M2).
> So its side effects follow directly from where muscarinic receptors are.
K: Parasympathetic: acetylcholine on muscarinic receptors. Sympathetic: noradrenaline on α and β receptors. Predict effects from the receptor.
!: Forgetting that blocking one branch unmasks the other: an antimuscarinic causes tachycardia because sympathetic tone is unopposed.
EV: established | The sympathetic and parasympathetic systems act through adrenoceptors and muscarinic receptors whose distribution predicts drug effects.
Q: What transmitter acts on organs in the parasympathetic system? | Acetylcholine, on muscarinic receptors.
Q: What does β1 stimulation do to the heart? | Increases heart rate and force.
SUM: Two branches, two transmitters, distinct receptors on each organ.
SUM: Drug effects and side effects follow from which receptors they act on.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
SRC: Joint Formulary Committee, British National Formulary | guidance | 2026 | https://bnf.nice.org.uk/
M1#pharmacy-u02-13-q1@1: Which receptor mediates parasympathetic slowing of the heart? | M2 muscarinic | β1 adrenoceptor | α1 adrenoceptor | Nicotinic | H2 histamine | Acetylcholine acting on M2 receptors in the heart slows the rate.
M2#pharmacy-u02-13-q2@2: An antimuscarinic drug is given. What happens to heart rate? | It rises | It falls | It stops | No change | It becomes irregular only | Blocking parasympathetic (M2) tone leaves sympathetic drive unopposed.
M2#pharmacy-u02-13-q3@2: Which receptor relaxes the bladder's detrusor muscle? | β3 adrenoceptor | M3 muscarinic | α1 adrenoceptor | Nicotinic | H1 histamine | Mirabegron, a β3 agonist, relaxes the detrusor in overactive bladder.
M3@1,2: A man takes doxazosin for prostate symptoms and a β-blocker for angina. He feels faint when he stands up. What best explains this? | α1 block lowers vascular tone and β1 block blunts the reflex rise in rate | Both drugs stimulate muscarinic receptors in blood vessels | The β-blocker causes bronchospasm that lowers oxygen | α1 block raises his heart rate too much on standing | Doxazosin blocks nicotinic receptors in the ganglia | Standing needs α1 vasoconstriction and a β1-driven rise in heart rate; blocking both leaves postural hypotension.
SA2@1,2: Describe the transmitters and receptors of the sympathetic and parasympathetic systems, and use them to predict the effects of a β2 agonist and an antimuscarinic. | Both branches use acetylcholine at nicotinic receptors in the ganglia. Parasympathetic nerves release acetylcholine onto muscarinic receptors on organs; sympathetic nerves release noradrenaline onto α and β adrenoceptors (sweat glands are an exception), and the adrenal medulla releases adrenaline. A β2 agonist dilates the airways and can cause tremor and tachycardia. An antimuscarinic causes dry mouth, constipation, urinary retention, blurred vision and tachycardia, because parasympathetic tone is blocked and sympathetic tone is unopposed. | Ganglionic nicotinic transmission ; Parasympathetic: acetylcholine on muscarinic receptors ; Sympathetic: noradrenaline on adrenoceptors ; β2 agonist effects ; Antimuscarinic effects

## Cholinergic pharmacology
S: Drugs that mimic, block or prolong acetylcholine treat conditions from overactive bladder to myasthenia gravis and dementia. Their side effects follow directly from the muscarinic and nicotinic receptors they affect.
O: Describe muscarinic agonists, antagonists and anticholinesterases
O: Recognise antimuscarinic side effects and anticholinergic burden
LV: Intermediate · Application
T: Antimuscarinic | A drug that blocks muscarinic acetylcholine receptors
T: Anticholinergic burden | The cumulative antimuscarinic effect of all a person's medicines, linked to confusion and falls in older people
H: Drug groups
- **Antimuscarinics**: atropine (bradycardia), hyoscine (secretions, motion sickness), oxybutynin and solifenacin (overactive bladder), ipratropium and tiotropium (airways).
- **Anticholinesterases**: donepezil, rivastigmine and galantamine (dementia); pyridostigmine (myasthenia gravis); neostigmine (reversal of neuromuscular block).
- **Neuromuscular blockers** act on nicotinic receptors at the neuromuscular junction during anaesthesia.
P: Anticholinesterases raise acetylcholine at muscarinic and nicotinic sites, so their side effects mirror antimuscarinic ones: nausea, diarrhoea, sweating, increased secretions and a slow heart rate. Bradycardia is why donepezil needs care in people with cardiac conduction problems.
H: Antimuscarinic effects
- "Dry as a bone, red as a beet, blind as a bat, mad as a hatter": dry mouth, flushing, blurred vision, confusion, plus constipation, urinary retention and tachycardia.
- Many drugs have antimuscarinic activity (tricyclic antidepressants, some antihistamines, antipsychotics). Their burden adds up and is linked to cognitive decline and falls in older people.
X: Spotting anticholinergic burden in a medicines review.
> An 82-year-old takes amitriptyline for nerve pain, oxybutynin for bladder symptoms and chlorphenamine at night.
> All three have antimuscarinic activity, so their effects add up.
> Review whether each is still needed and whether alternatives with less antimuscarinic activity exist, and ask about confusion, constipation, urinary retention and falls.
DRUG: Atropine | Muscarinic receptor antagonist | Symptomatic bradycardia; organophosphate poisoning; reducing secretions | Dry mouth, tachycardia, blurred vision, urinary retention, constipation, confusion (especially in older people) | Monitor heart rate and rhythm; care in glaucoma, prostatic enlargement and older people; doses vary by indication (check the BNF)
K: Antimuscarinics cause dry mouth, blurred vision, constipation, retention, tachycardia and confusion. Add up the burden in older people.
!: Starting an antimuscarinic for overactive bladder in someone with dementia already on a cholinesterase inhibitor: the two work against each other and burden rises.
EV: established | Antimuscarinic effects of different medicines add up, and anticholinergic burden is associated with confusion and falls in older people.
Q: Name three antimuscarinic side effects. | For example dry mouth, constipation and urinary retention (also blurred vision, tachycardia, confusion).
Q: Which drug reverses non-depolarising neuromuscular block? | Neostigmine (an anticholinesterase).
SUM: Cholinergic drugs mimic, block or prolong acetylcholine.
SUM: Anticholinergic burden accumulates across medicines and harms older people.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
SRC: NICE NG97, Dementia: assessment, management and support | guidance | 2018 | https://www.nice.org.uk/guidance/ng97
M2#pharmacy-u02-14-q1@1: Which drug is an anticholinesterase used in myasthenia gravis? | Pyridostigmine | Oxybutynin | Atropine | Ipratropium | Hyoscine | Pyridostigmine increases acetylcholine at the neuromuscular junction.
M2#pharmacy-u02-14-q2@2: Why is anticholinergic burden a concern in older people? | It's linked to confusion, falls and cognitive decline | It only affects heart rate | It lowers blood pressure safely | It improves memory | It causes weight gain only | The combined antimuscarinic effect of several drugs worsens cognition and increases falls.
M3#pharmacy-u02-14-q3@2: A man with dementia on donepezil starts oxybutynin. What's the problem? | They have opposing actions and burden increases | Oxybutynin increases donepezil absorption | They both cause diarrhoea only | Donepezil blocks oxybutynin's metabolism | There's no concern | Donepezil boosts acetylcholine while oxybutynin blocks it, and antimuscarinics can worsen confusion.
M1@1: Which drug is an antimuscarinic used for overactive bladder? | Oxybutynin | Donepezil | Pyridostigmine | Neostigmine | Rivastigmine | Oxybutynin blocks M3 receptors on the detrusor muscle; the other options are anticholinesterases.
SA3@2: An 84-year-old with dementia taking donepezil is prescribed oxybutynin and already takes amitriptyline. Explain the pharmacological problems and what the pharmacist should recommend. | Donepezil inhibits acetylcholinesterase to raise acetylcholine and support cognition. Oxybutynin and amitriptyline block muscarinic receptors, opposing donepezil and adding to anticholinergic burden. In older people this burden is linked to confusion, cognitive decline, falls, constipation and urinary retention. The pharmacist should raise the combination with the prescriber, review whether each drug is needed, consider alternatives with less antimuscarinic activity (or non-drug measures for bladder symptoms), and agree monitoring. | Donepezil raises acetylcholine ; Oxybutynin and amitriptyline are antimuscarinic and oppose it ; Burden adds up ; Harms in older people ; Recommend review and alternatives

## Adrenergic pharmacology
S: Adrenoceptors (α1, α2, β1, β2, β3) respond to noradrenaline and adrenaline. Drugs that stimulate or block them are used for asthma, hypertension, heart failure, anaphylaxis and prostate symptoms.
O: Describe the adrenoceptor subtypes and the drugs acting on them
O: Predict effects and risks of adrenergic agonists and antagonists
LV: Intermediate · Application
T: β-blocker | A drug that blocks β-adrenoceptors (some selective for β1)
T: Cardioselective | Relatively selective for β1 receptors in the heart, such as bisoprolol and atenolol
H: Receptors and drugs
- **α1**: vasoconstriction; blockers (doxazosin, tamsulosin) lower blood pressure or relax prostate muscle; they can cause postural hypotension.
- **α2**: presynaptic inhibition of noradrenaline release; agonists such as clonidine lower blood pressure.
- **β1**: heart rate and force; cardioselective blockers (bisoprolol) treat angina, heart failure and AF.
- **β2**: bronchodilation; agonists (salbutamol, formoterol) treat asthma and COPD.
- **Adrenaline** acts on α and β receptors: the first-line treatment of anaphylaxis, given intramuscularly.
P: Adrenaline is the drug of choice in anaphylaxis because it acts on several receptors at once: α1 vasoconstriction raises blood pressure and reduces swelling, β1 supports the heart, and β2 relaxes the airways and reduces mediator release from mast cells.
H: β-blocker cautions
- Non-selective β-blockers (propranolol) can cause bronchospasm and are avoided in asthma; even cardioselective ones need care.
- β-blockers can mask the warning signs of hypoglycaemia (tremor, palpitations) and cause bradycardia, fatigue and cold extremities.
- Don't stop them abruptly in angina: rebound can worsen symptoms.
X: Counselling on a β-blocker in diabetes.
> A woman with type 1 diabetes is started on propranolol.
> β-blockade blunts tremor and palpitations, two adrenergic warning signs of hypoglycaemia; sweating, which is sympathetic but cholinergic, is less affected.
> Advise her that hypoglycaemia may feel different and to check her glucose more often.
DRUG: Salbutamol | Short-acting β2-adrenoceptor agonist | Relief of bronchospasm in asthma and COPD | Tremor, palpitations, tachycardia; low potassium at high doses | Check inhaler technique; frequent use signals poor control needing review; use with a spacer where appropriate
DRUG: Propranolol | Non-selective β-blocker | Angina, arrhythmias, migraine prophylaxis, physical symptoms of anxiety, thyrotoxicosis | Bronchospasm (avoid in asthma), bradycardia, fatigue, cold extremities; masks hypoglycaemia; toxic in overdose | Monitor pulse and blood pressure; don't stop abruptly; take care with verapamil and diltiazem (check the BNF)
K: β1 is the heart, β2 the airways, α1 vessels and prostate. Non-selective β-blockers risk bronchospasm; all can mask hypoglycaemia.
!: Supplying propranolol to someone with asthma: non-selective β-blockade can trigger severe bronchospasm.
EV: established | Adrenoceptor subtypes have distinct tissue effects that predict the benefits and risks of adrenergic agonists and antagonists.
Q: Which adrenoceptor do tamsulosin and doxazosin block? | α1.
Q: Which β-blocker side effect matters for people with diabetes? | Masking the warning signs of hypoglycaemia.
SUM: α1, α2, β1, β2 and β3 receptors have distinct effects and drugs.
SUM: β-blockers need care in asthma, diabetes and on stopping.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
SRC: Joint Formulary Committee, British National Formulary: beta-adrenoceptor blocking drugs | guidance | 2026 | https://bnf.nice.org.uk/
M1#pharmacy-u02-15-q1@1: Which receptor does salbutamol stimulate? | β2 | β1 | α1 | α2 | M3 | Salbutamol is a β2 agonist, relaxing airway smooth muscle.
M2#pharmacy-u02-15-q2@2: What is a common problem with α1-blockers such as doxazosin? | Postural hypotension | Bronchospasm | Hyperkalaemia | Weight loss | Diarrhoea | Blocking α1 vasoconstriction can cause dizziness on standing, especially after the first dose.
M3#pharmacy-u02-15-q3@2: A man with asthma is prescribed propranolol for migraine. What should the pharmacist do? | Contact the prescriber: it's contraindicated | Supply it with a spacer | Supply it and advise rest | Halve the dose | Swap to salbutamol | Non-selective β-blockade can cause life-threatening bronchospasm in asthma.
M2@2: Why does adrenaline treat both low blood pressure and wheeze in anaphylaxis? | It acts on α1, β1 and β2 receptors | It is a selective β2 agonist only | It blocks histamine H1 receptors | It is an α1 receptor antagonist | It acts on nuclear steroid receptors | α1 effects raise blood pressure and reduce swelling, β1 supports the heart and β2 relaxes the airways.
SA2@1,2: Describe the main adrenoceptor subtypes with a drug acting on each, and explain the cautions needed with β-blockers. | α1 receptors cause vasoconstriction and prostate smooth muscle contraction (blocked by doxazosin and tamsulosin, which can cause postural hypotension). α2 receptors inhibit noradrenaline release (clonidine). β1 receptors increase heart rate and force (blocked by bisoprolol). β2 receptors relax the airways (salbutamol). β-blockers, especially non-selective ones such as propranolol, can cause bronchospasm and are avoided in asthma; they mask hypoglycaemia warning signs, cause bradycardia and fatigue, and shouldn't be stopped abruptly in angina. | α1 with example ; α2 or β3 with example ; β1 with example ; β2 with example ; β-blocker cautions

## Histamine and its antagonists
S: Histamine is released from mast cells in allergy and from stomach cells to drive acid secretion. Antihistamines that block H1 receptors treat allergic conditions; H2 antagonists once dominated acid suppression.
O: Describe histamine's actions at H1 and H2 receptors
O: Compare first- and second-generation H1 antihistamines
LV: Intermediate · Application
T: H1 antihistamine | A drug that blocks H1 receptors, reducing allergic symptoms
T: Sedating antihistamine | An older (first-generation) H1 antihistamine that crosses into the brain, such as chlorphenamine
H: Histamine's actions
- **H1 receptors**: itch, sneezing, vasodilation, increased capillary permeability (swelling, wheals) and bronchoconstriction.
- **H2 receptors**: gastric acid secretion.
- H3 and H4 receptors have roles in the brain and immune cells.
P: H1 antihistamines block receptors rather than reverse effects already under way, so they work best taken before exposure; in seasonal allergic rhinitis, regular daily use through the pollen season usually controls symptoms better than occasional doses.
H: Antihistamines
- **First-generation H1** (chlorphenamine, promethazine): sedating and antimuscarinic; useful at night, risky for driving and in older people.
- **Second-generation H1** (cetirizine, loratadine, fexofenadine): less sedating, once daily; first choice for allergic rhinitis and urticaria.
- **H2 antagonists** (famotidine) reduce acid but are now used less than PPIs.
- Antihistamines aren't the treatment for anaphylaxis: adrenaline is.
- Some sedating antihistamines (such as promethazine) are also sold for short-term sleeplessness; they're unsuitable for regular use and for older people because of next-day drowsiness and antimuscarinic effects.
- Antihistamines can be used in pregnancy only after checking the BNF and specialist sources; loratadine and cetirizine are commonly chosen when needed.
X: Choosing an antihistamine for a driver.
> A lorry driver with hay fever asks for an antihistamine.
> Chlorphenamine crosses into the brain and can cause sedation and impaired driving.
> A less sedating second-generation option such as fexofenadine or loratadine suits him better; still advise him not to drive if he feels drowsy.
DRUG: Cetirizine | Second-generation H1-receptor antagonist | Allergic rhinitis, urticaria and itch | Less sedating than older antihistamines but can cause drowsiness; headache, dry mouth | Counsel about drowsiness, driving and alcohol; dose adjustment in renal impairment (check the BNF)
K: H1 blockers treat allergy (second-generation first line); H2 blockers reduce acid. Adrenaline, not an antihistamine, treats anaphylaxis.
!: Treating suspected anaphylaxis with an oral antihistamine instead of giving adrenaline and calling for help.
EV: established | H1 receptors mediate allergic symptoms and H2 receptors gastric acid secretion; adrenaline, not an antihistamine, treats anaphylaxis.
Q: Which receptor mediates gastric acid secretion? | H2.
Q: Why are first-generation antihistamines sedating? | They cross into the brain and block central H1 receptors.
SUM: H1 mediates allergy symptoms; H2 mediates acid secretion.
SUM: Second-generation H1 antihistamines are less sedating; anaphylaxis needs adrenaline.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
SRC: Resuscitation Council UK, Emergency treatment of anaphylaxis: guidelines for healthcare providers | guidance | 2021 | https://www.resus.org.uk/
M1#pharmacy-u02-16-q1@1: Which receptor does famotidine block? | H2 | H1 | β2 | M3 | 5-HT3 | Famotidine is an H2 antagonist that reduces gastric acid.
M2#pharmacy-u02-16-q2@2: Which antihistamine is least likely to cause drowsiness? | Fexofenadine | Chlorphenamine | Promethazine | Hydroxyzine | Diphenhydramine | Fexofenadine is a second-generation antihistamine with little central penetration.
M2#pharmacy-u02-16-q3@2: What is the first-line drug treatment for anaphylaxis? | Intramuscular adrenaline | Oral cetirizine | IV chlorphenamine | Oral prednisolone | Inhaled salbutamol | Adrenaline reverses the life-threatening features; antihistamines are not first line.
M3@2: An 80-year-old wants to take promethazine every night for sleep. What is the best response? | Advise against regular use: sedation and antimuscarinic effects | Supply it, as it is ideal for long-term use | Recommend taking a double dose at night | Suggest adding chlorphenamine for effect | Advise taking it with a small alcoholic drink | Sedating antihistamines cause next-day drowsiness and antimuscarinic harms (confusion, falls), so they are unsuitable for regular use in older people.
SA2@1,2: Compare first- and second-generation H1 antihistamines and explain why an antihistamine is not the first-line treatment for anaphylaxis. | Histamine at H1 receptors causes itch, sneezing, vasodilation, swelling and bronchoconstriction; at H2 receptors it drives acid secretion. First-generation H1 antihistamines (chlorphenamine, promethazine) cross into the brain, so they sedate, and they have antimuscarinic effects; they are risky for driving and in older people. Second-generation ones (cetirizine, loratadine, fexofenadine) are less sedating and taken once daily, so they are first choice for allergic rhinitis and urticaria. Anaphylaxis needs intramuscular adrenaline, which reverses airway, circulatory and swelling effects; antihistamines act too slowly and don't treat shock or bronchospasm adequately. | H1 actions ; First generation sedating and antimuscarinic ; Second generation less sedating, first choice ; Anaphylaxis needs adrenaline ; Why antihistamines are inadequate

## Eicosanoids and inflammation
S: Prostaglandins, thromboxanes and leukotrienes are lipid mediators made from arachidonic acid. They drive pain, fever, inflammation, platelet aggregation and stomach protection, which explains both the benefits and harms of NSAIDs and aspirin.
O: Describe how eicosanoids are made and what they do
O: Explain the benefits and adverse effects of COX inhibition
LV: Intermediate · Application
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
P: Low-dose aspirin works through the platelet's biology: having no nucleus, a platelet can't make new COX-1, so its thromboxane production stays suppressed for its lifespan, while the cells of the vessel wall make new enzyme and keep producing prostacyclin, which opposes aggregation.
- NSAIDs can worsen asthma in a minority of people with NSAID sensitivity.
X: The "triple whammy".
> A woman taking ramipril and furosemide buys ibuprofen for back pain.
> Ramipril relaxes the efferent arteriole and furosemide lowers blood volume, both reducing filtration pressure; ibuprofen removes the prostaglandins that keep the afferent arteriole dilated.
> Together they raise the risk of acute kidney injury: suggest an alternative such as paracetamol, and refer if needed.
DRUG: Ibuprofen | Non-steroidal anti-inflammatory drug: reversible non-selective COX inhibitor | Pain, inflammation and fever | GI irritation, ulcers and bleeding; renal impairment; fluid retention; cardiovascular risk; may worsen asthma in sensitive people | Take with or after food; avoid or use with caution in renal impairment, heart failure, peptic ulcer and with anticoagulants; consider gastroprotection in at-risk people (check the BNF)
K: COX inhibition relieves pain and inflammation but harms the stomach, kidneys and heart. Leukotrienes are blocked separately by montelukast.
!: Recommending ibuprofen to someone taking an ACE inhibitor and a diuretic, raising the risk of acute kidney injury.
EV: established | COX inhibition explains both the benefits of NSAIDs and aspirin (less pain, inflammation and platelet aggregation) and their gastric, renal and cardiovascular harms.
Q: What does thromboxane do? | Promotes platelet aggregation and vasoconstriction.
Q: Which drug blocks leukotriene receptors? | Montelukast.
SUM: COX and lipoxygenase make prostaglandins, thromboxane and leukotrienes.
SUM: NSAIDs' benefits and harms both follow from COX inhibition.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
SRC: MHRA, Drug Safety Update: high-dose ibuprofen, cardiovascular risk | guidance | 2015-06 | https://www.gov.uk/drug-safety-update
M2#pharmacy-u02-17-q1@1: Why do NSAIDs cause stomach ulcers? | They reduce protective prostaglandins | They increase histamine release | They dissolve the stomach lining directly | They block H2 receptors | They raise stomach pH | COX-1 prostaglandins protect the gastric mucosa.
M2#pharmacy-u02-17-q2@2: Which drug blocks leukotriene receptors in asthma? | Montelukast | Ibuprofen | Salbutamol | Cetirizine | Celecoxib | Montelukast is a leukotriene receptor antagonist.
M3#pharmacy-u02-17-q3@2: Why are COX-2 selective NSAIDs not risk-free? | They carry cardiovascular risk | They cause more GI bleeding | They are irreversible | They block thromboxane completely | They can't relieve pain | Fewer GI effects, but cardiovascular events remain a concern.
M1@1: Which enzyme converts arachidonic acid to prostaglandins and thromboxane? | Cyclo-oxygenase | Lipoxygenase | Phospholipase C | Adenylyl cyclase | Xanthine oxidase | COX makes prostaglandins and thromboxane; lipoxygenase makes leukotrienes from the same precursor.
SA3@2: A 75-year-old with heart failure, taking ramipril and furosemide, asks to buy naproxen for knee pain. Explain the risks using the pharmacology of COX inhibition and advise. | Naproxen inhibits COX-1 and COX-2. Reduced gastric prostaglandins increase ulcer and bleeding risk, especially in older people. Reduced renal prostaglandins constrict the afferent arteriole; with an ACE inhibitor and a diuretic this raises the risk of acute kidney injury. NSAIDs also cause sodium and fluid retention, which can worsen heart failure, and they carry cardiovascular risk. The pharmacist should not sell it, suggest an alternative such as paracetamol or a topical option where suitable, and refer to the prescriber if pain persists. | COX inhibition mechanism ; Gastric risk ; Renal risk with ACE inhibitor and diuretic ; Heart failure and cardiovascular risk ; Safe alternative and referral

## Neurotransmitters in the brain
S: Psychiatric and neurological medicines act on a handful of brain transmitter systems: dopamine, serotonin, noradrenaline, GABA, glutamate and acetylcholine. Their pathways explain both treatment effects and many side effects.
O: Describe the main brain neurotransmitter systems and their roles
O: Link CNS drug classes to the transmitters they affect
LV: Intermediate · Application
T: Dopamine pathways | Brain circuits (mesolimbic, nigrostriatal, tuberoinfundibular) through which dopamine affects reward, movement and prolactin
T: Excitatory and inhibitory transmitters | Glutamate excites neurons; GABA inhibits them
H: The main systems
- **Dopamine**: reward and motivation (mesolimbic), movement (nigrostriatal), prolactin release (tuberoinfundibular). Antipsychotics block D2 receptors; Parkinson's treatment replaces dopamine (levodopa).
- **Serotonin (5-HT)**: mood, anxiety, sleep and vomiting. SSRIs raise synaptic serotonin; ondansetron blocks 5-HT3 receptors.
- **Noradrenaline**: arousal and attention; SNRIs raise it.
- **GABA**: the main inhibitory transmitter; benzodiazepines and some antiepileptics enhance it.
- **Glutamate**: the main excitatory transmitter; memantine blocks NMDA receptors in dementia.
P: Many CNS drugs act on several systems, which explains their side-effect profiles. Tricyclic antidepressants block serotonin and noradrenaline reuptake but also muscarinic, H1 and α1 receptors, giving dry mouth, sedation and postural hypotension, and they are dangerous in overdose.
H: Side effects from pathways
- D2 blockade in the nigrostriatal pathway causes parkinsonism and other movement disorders; in the tuberoinfundibular pathway, raised prolactin.
- Levodopa can cause nausea and, through mesolimbic effects, hallucinations or impulse control problems.
X: Choosing an antiemetic in Parkinson's disease.
> A man with Parkinson's disease has nausea.
> Metoclopramide and antipsychotic antiemetics block central D2 receptors and would worsen his movement symptoms.
> Domperidone, which crosses into the brain poorly, is often used instead, with its cardiac (QT) risks checked; follow the BNF and specialist advice.
K: Know the six main transmitters and which drugs act on each; pathway effects explain side effects.
!: Giving metoclopramide or an antipsychotic to someone with Parkinson's disease: D2 blockade worsens it.
EV: established | CNS drugs act on dopamine, serotonin, noradrenaline, GABA, glutamate and acetylcholine pathways, and pathway effects explain many side effects.
Q: Why do antipsychotics cause parkinsonism? | They block D2 receptors in the nigrostriatal pathway.
Q: Which receptor does memantine block? | The NMDA glutamate receptor.
SUM: Dopamine, serotonin, noradrenaline, GABA, glutamate and acetylcholine are the main targets.
SUM: Side effects follow from the pathways drugs act in.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
SRC: Stahl SM, Stahl's Essential Psychopharmacology, 5th edition, Cambridge University Press | secondary | 2021
M2#pharmacy-u02-18-q1@1: Ondansetron prevents vomiting by blocking which receptor? | 5-HT3 | D2 | H1 | M3 | NMDA | It blocks serotonin 5-HT3 receptors in the gut and brainstem.
M2#pharmacy-u02-18-q2@2: Why should metoclopramide generally be avoided in Parkinson's disease? | It blocks D2 receptors and worsens symptoms | It increases dopamine too much | It causes low blood sugar | It is an opioid | It blocks GABA | Central D2 blockade counteracts dopamine replacement.
M2#pharmacy-u02-18-q3@1: Which transmitter do benzodiazepines enhance? | GABA | Glutamate | Dopamine | Serotonin | Acetylcholine | They increase GABA-A receptor responses to GABA.
M1@1: What is the main inhibitory transmitter in the brain? | GABA | Glutamate | Dopamine | Noradrenaline | Acetylcholine | GABA inhibits neurons; benzodiazepines and some antiepileptics enhance its effect at GABA-A receptors.
M3@1,2: A woman taking an antipsychotic develops galactorrhoea (milk discharge). Which mechanism explains it? | D2 block in the tuberoinfundibular pathway raises prolactin | D2 block in the nigrostriatal pathway lowers prolactin | 5-HT3 block in the gut raises oestrogen levels | GABA enhancement in the cortex raises prolactin | NMDA block in the hippocampus triggers lactation | Dopamine normally inhibits prolactin release; blocking D2 receptors in this pathway removes that brake.
SA2@1,2: Describe the three main dopamine pathways and explain how D2 blockade by an antipsychotic produces both its benefit and its side effects. | The mesolimbic pathway is involved in reward and motivation; overactivity is linked to psychotic symptoms, so D2 blockade there is thought to give the antipsychotic effect. The nigrostriatal pathway controls movement; D2 blockade there causes parkinsonism and other movement disorders. The tuberoinfundibular pathway controls prolactin; D2 blockade raises prolactin, causing galactorrhoea, menstrual changes and sexual dysfunction. The same mechanism therefore explains both benefit and harm, and is why such drugs worsen Parkinson's disease. | Mesolimbic pathway and benefit ; Nigrostriatal pathway and movement effects ; Tuberoinfundibular pathway and prolactin ; Same mechanism for benefit and harm ; Relevance to Parkinson's disease

## Adverse drug reactions
S: Adverse drug reactions (ADRs) are a major cause of hospital admission. Classifying them helps you predict which are dose-related and preventable, and which are idiosyncratic and need avoiding in future.
O: Classify adverse drug reactions using the ABCDE scheme
O: Identify risk factors for ADRs and how to reduce them
LV: Intermediate · Application
T: Adverse drug reaction | A harmful, unintended response to a medicine at normal doses
T: Type A reaction | An augmented, predictable, dose-related reaction from the drug's known pharmacology
H: Classification
- **A (augmented)**: predictable from pharmacology and dose-related, for example bleeding with anticoagulants or hypoglycaemia with insulin. The commonest type.
- **B (bizarre)**: not predictable or dose-related, often immune, for example anaphylaxis to penicillin or Stevens-Johnson syndrome.
- **C (chronic)**: from long-term use, for example adrenal suppression with steroids.
- **D (delayed)**: appear later, for example teratogenicity or some cancers.
- **E (end of use)**: withdrawal effects, for example rebound after stopping a β-blocker.
P: Many type B reactions have an immune basis and can recur with related drugs: someone with a true penicillin allergy should avoid all penicillins. The record should say what happened, when and how severe it was, so later decisions are informed.
H: Risk factors and prevention
- Older age, polypharmacy, renal or hepatic impairment, narrow therapeutic index drugs, previous ADRs and pregnancy.
- Prevention: right dose for kidney function, checking interactions and allergies, monitoring, and clear counselling.
- Report suspected ADRs through the Yellow Card scheme (School 17).
X: Classifying three reactions.
> A man on long-term prednisolone develops osteoporosis: type C (chronic).
> A woman develops a widespread blistering rash after starting lamotrigine: type B, needing urgent assessment and a clear record.
> A man has rebound tachycardia after stopping propranolol suddenly: type E (end of use).
K: Type A reactions are common, dose-related and often preventable; type B are unpredictable and must be recorded to avoid re-exposure.
!: Recording a type A side effect (such as nausea) as an "allergy", which can stop someone getting a useful medicine later.
EV: established | Adverse drug reactions are a major cause of hospital admission, and many type A reactions are preventable.
Q: Give an example of a type B reaction. | Anaphylaxis to penicillin (or Stevens-Johnson syndrome).
Q: What type is bleeding on warfarin? | Type A: augmented and dose-related.
SUM: ADRs are classified A to E.
SUM: Many ADRs are preventable with dosing, monitoring and interaction checks.
SRC: Ritter JM and others, Rang and Dale's Pharmacology, 10th edition, Elsevier | secondary | 2023
SRC: Pirmohamed M and others, Adverse drug reactions as cause of admission to hospital, BMJ 329: 15–19 | primary | 2004
M1#pharmacy-u02-19-q1@1: Hypoglycaemia caused by insulin is which type of ADR? | Type A | Type B | Type C | Type D | Type E | It's a predictable, dose-related extension of insulin's action.
M2#pharmacy-u02-19-q2@2: Which factor most increases ADR risk? | Polypharmacy in older age | Taking medicines with water | Being a non-smoker | Taking once-daily drugs | Having normal kidney function | More drugs and age-related changes increase interactions and sensitivity.
M3#pharmacy-u02-19-q3@1: Why should nausea from a drug not be recorded as an allergy? | It's a type A side effect, not an immune reaction | Nausea is never caused by drugs | Allergies can't involve the gut | It would make the drug cheaper | It's a type B reaction | Mislabelling side effects as allergies can deny people useful treatment later.
M2@1: Osteoporosis after years of prednisolone is which type of adverse drug reaction? | Type C | Type A | Type B | Type D | Type E | Type C (chronic) reactions come from long-term use; adrenal suppression is another example.
SA3@1,2: Using the ABCDE classification, explain which adverse drug reactions are most preventable and describe how a pharmacist can reduce ADR risk in an older person on many medicines. | Type A reactions are augmented, dose-related extensions of a drug's pharmacology (bleeding with anticoagulants, hypoglycaemia with insulin); they are the commonest and most preventable. Type B are unpredictable, often immune (anaphylaxis); they are prevented by accurate allergy records. Types C, D and E relate to long-term use, delayed effects and stopping. Older people with polypharmacy and reduced renal function are at higher risk. The pharmacist can dose for kidney function, check interactions and allergies, deprescribe unnecessary medicines, arrange monitoring, counsel clearly and report suspected ADRs by Yellow Card. | Type A is dose-related and preventable ; Type B unpredictable, recorded to avoid re-exposure ; C, D, E described ; Risk factors in older people ; Prevention measures and Yellow Card

## Mechanisms of drug interactions
S: Drug interactions happen when one drug changes the effect or level of another. Sorting them into pharmacokinetic and pharmacodynamic mechanisms lets you predict them, judge their importance and decide what to do.
O: Distinguish pharmacokinetic and pharmacodynamic interactions
O: Explain enzyme induction and inhibition and their time courses
LV: Intermediate · Clinical reasoning
T: Enzyme inhibition | Reduced metabolism of a drug by another drug, raising its levels, usually within days
T: Enzyme induction | Increased metabolism caused by another drug, lowering levels, developing over one to two weeks
H: Pharmacokinetic interactions
- **Absorption**: antacids and calcium reduce absorption of some antibiotics (tetracyclines, quinolones) and levothyroxine.
- **Metabolism**: CYP inhibitors (clarithromycin, fluconazole, grapefruit juice for some drugs) raise levels; inducers (rifampicin, carbamazepine, phenytoin, St John's wort) lower them.
- **Excretion**: some drugs reduce renal clearance of lithium (NSAIDs, ACE inhibitors, thiazides), raising lithium levels.
- **Transport**: P-glycoprotein inhibitors raise digoxin levels.
P: Judging an interaction means asking how big the change is, how narrow the affected drug's therapeutic index is, and whether it can be managed. Many interactions are managed by monitoring, separating doses or changing a dose; a few combinations should be avoided. A pharmacokinetic interaction matters most for narrow therapeutic index drugs such as warfarin, ciclosporin and lithium.
H: Pharmacodynamic interactions
- **Additive or synergistic**: two sedatives together; two QT-prolonging drugs; an NSAID with an anticoagulant (bleeding).
- **Antagonistic**: an NSAID reducing the effect of antihypertensives; a β-blocker opposing salbutamol.
- Use the BNF interactions appendix and judge severity, evidence and the patient's circumstances.
X: An enzyme inhibitor interaction.
> Clarithromycin, a CYP3A4 inhibitor, is prescribed for someone taking simvastatin.
> Simvastatin levels rise sharply within days, increasing the risk of myopathy and rhabdomyolysis.
> The combination should be avoided, so simvastatin is usually paused during the course; check the current BNF interactions entry.
K: Pharmacokinetic interactions change levels (absorption, metabolism, excretion, transport); pharmacodynamic ones add or oppose effects.
!: Forgetting that enzyme induction takes one to two weeks to develop and to wear off, so effects lag behind starting or stopping the inducer.
EV: established | Drug interactions arise by pharmacokinetic mechanisms (absorption, metabolism, excretion, transport) or pharmacodynamic ones (additive or opposing effects).
Q: Name three enzyme inducers. | For example rifampicin, carbamazepine and St John's wort (also phenytoin).
Q: Why do NSAIDs raise lithium levels? | They reduce renal lithium clearance.
SUM: Pharmacokinetic interactions alter drug levels; pharmacodynamic ones alter effects.
SUM: Inhibition acts in days; induction takes one to two weeks.
SRC: Joint Formulary Committee, British National Formulary: interactions | guidance | 2026 | https://bnf.nice.org.uk/interactions/
SRC: Preston CL (editor), Stockley's Drug Interactions, Pharmaceutical Press | secondary | 2025
M2#pharmacy-u02-20-q1@1: Rifampicin is started in someone on a combined oral contraceptive. What's the main risk? | Contraceptive failure from enzyme induction | Increased oestrogen side effects | Rifampicin toxicity | Lower blood pressure | No interaction | Rifampicin induces liver enzymes, lowering hormone levels.
M2#pharmacy-u02-20-q2@2: An NSAID with warfarin raises bleeding risk mainly by what mechanism? | Pharmacodynamic: antiplatelet and GI effects add to anticoagulation | Increasing warfarin absorption | Inducing warfarin metabolism | Reducing vitamin K intake | Blocking warfarin excretion | NSAIDs impair platelets and the gastric mucosa, adding to bleeding risk.
M3#pharmacy-u02-20-q3@2: Carbamazepine is stopped in someone also taking a CYP3A4 substrate. What happens over the next two weeks? | The substrate's levels rise as induction wears off | Levels fall immediately | Nothing changes | The substrate becomes inactive | Levels rise within an hour | Enzyme induction declines gradually, so substrate levels climb over one to two weeks.
M1@1: Which of these is a pharmacodynamic interaction? | Two sedatives causing more drowsiness | Antacids reducing ciprofloxacin absorption | Rifampicin inducing liver enzymes | Clarithromycin inhibiting CYP3A4 | P-glycoprotein inhibition raising digoxin | Pharmacodynamic interactions add or oppose effects at the target; the others change drug levels.
SA3@1,2: A woman taking warfarin is started on rifampicin, which is stopped after a month. Explain what happens to her warfarin control over this period and how the interaction should be managed. | Rifampicin is a potent enzyme inducer: it increases the metabolism of warfarin, a narrow therapeutic index drug, so the INR falls and the warfarin dose may need increasing. Induction develops over one to two weeks, so the effect lags behind starting rifampicin. When rifampicin stops, induction wears off over a similar period, warfarin levels rise and the INR can become dangerously high unless the dose is reduced. Management: avoid the combination if possible; otherwise monitor the INR closely when starting and for several weeks after stopping, and adjust the dose with the anticoagulation service, using the BNF. | Rifampicin is an enzyme inducer ; INR falls, dose may rise ; Induction takes one to two weeks ; Rebound rise in INR after stopping ; Close INR monitoring and dose adjustment

## Drug toxicity and overdose
S: Toxicity can follow overdose, accumulation or interactions. Knowing the mechanisms and the antidotes for common poisonings, and where to get expert advice, is part of every pharmacist's role.
O: Describe mechanisms of toxicity for common drugs in overdose
O: Name antidotes for key poisonings and the role of TOXBASE
LV: Intermediate · Clinical reasoning
T: Antidote | A treatment that counteracts a specific poison, such as acetylcysteine for paracetamol
T: TOXBASE | The UK National Poisons Information Service's online database for clinicians managing poisoning
H: Important poisonings
- **Paracetamol**: a toxic metabolite (NAPQI) builds up when glutathione is depleted, causing liver damage. Acetylcysteine replenishes glutathione; treatment decisions use the time and plasma level, following national guidance.
- **Opioids**: respiratory depression and reduced consciousness; naloxone reverses them.
- **Benzodiazepines**: sedation, worse with alcohol or opioids; flumazenil is rarely used because it can trigger seizures.
- **Tricyclic antidepressants**: cardiac arrhythmias and seizures; dangerous in overdose.
- **Iron, digoxin, lithium and anticoagulants** each have specific management.
P: Toxicity isn't only from deliberate overdose. A usual dose can accumulate: digoxin, lithium and aminoglycosides build up when kidney function falls, for example during dehydration from diarrhoea and vomiting, and toxicity then develops gradually.
H: Getting help
- TOXBASE and the National Poisons Information Service give up-to-date management advice to healthcare professionals.
- Members of the public with a suspected overdose need urgent medical help (999 or the emergency department; NHS 111 for advice).
X: Recognising accumulation.
> A woman taking lithium has had vomiting and diarrhoea for two days and now has a coarse tremor and confusion.
> Dehydration reduces lithium clearance, so levels rise; coarse tremor and confusion suggest toxicity.
> She needs urgent medical assessment and a lithium level; the treating team manages it using TOXBASE and the BNF.
K: Know the mechanism and antidote for paracetamol and opioid poisoning, and use TOXBASE for management.
!: Being reassured that someone who took a paracetamol overdose "feels fine": liver damage may not show for a day or more.
EV: established | Toxicity follows from known mechanisms such as toxic metabolite build-up or accumulation, and specific antidotes exist for some poisonings.
Q: What is the antidote for paracetamol poisoning? | Acetylcysteine.
Q: What is TOXBASE? | The UK National Poisons Information Service's database for managing poisoning.
SUM: Toxicity follows from mechanisms such as metabolite build-up or receptor overactivity.
SUM: Use antidotes and TOXBASE; people with an overdose need urgent medical care.
SRC: UK National Poisons Information Service, TOXBASE | guidance | 2026 | https://www.toxbase.org/
SRC: MHRA, Drug Safety Update: paracetamol overdose, simplification of the use of intravenous acetylcysteine | guidance | 2012-09 | https://www.gov.uk/drug-safety-update
M1#pharmacy-u02-21-q1@2: What is the antidote for opioid overdose? | Naloxone | Flumazenil | Acetylcysteine | Atropine | Vitamin K | Naloxone is a competitive opioid antagonist.
M2#pharmacy-u02-21-q2@1: Why does paracetamol overdose damage the liver? | A toxic metabolite builds up when glutathione runs out | It blocks bile flow | It kills liver cells directly at any dose | It causes low blood sugar only | It is excreted by the liver unchanged | NAPQI accumulates once glutathione is depleted.
M2#pharmacy-u02-21-q3@2: Someone says they took 30 paracetamol tablets an hour ago but feel well. What's right? | They need urgent medical assessment now | They can wait to see if symptoms develop | Advise rest and fluids | Suggest an antacid | Ask them to return tomorrow | Early symptoms may be absent while liver damage develops; treatment depends on time and levels.
M3@1,2: A woman on lithium has had diarrhoea and vomiting for two days and now has a coarse tremor and confusion. What is the most appropriate action? | Arrange urgent medical assessment and a lithium level | Advise her to double her fluids and wait a week | Suggest she takes her next dose with food | Recommend loperamide and review in a month | Advise an extra lithium dose to replace losses | Dehydration reduces lithium clearance; coarse tremor and confusion suggest toxicity, which needs urgent assessment.
SA2@1,2: Explain how paracetamol overdose damages the liver, how acetylcysteine works, and why a person who feels well after an overdose still needs urgent assessment. | Most paracetamol is conjugated safely, but a small amount is oxidised to the toxic metabolite NAPQI, which is normally detoxified by glutathione. In overdose glutathione is depleted, NAPQI builds up and damages liver cells. Acetylcysteine replenishes glutathione and is most effective given early. Treatment decisions use the time of ingestion and the plasma level, following national guidance and TOXBASE. Early symptoms may be absent while liver damage develops over a day or more, so anyone with a suspected overdose needs urgent medical assessment. | NAPQI formed ; Glutathione depletion causes liver damage ; Acetylcysteine replenishes glutathione ; Time and level guide treatment ; Delayed symptoms mean urgent assessment

## Pharmacogenomics
S: Genetic differences change how people respond to some medicines, by altering drug-metabolising enzymes or targets, or by increasing the risk of serious reactions. A few tests are already standard in UK practice.
O: Explain how genetic variation affects drug response
O: Give examples of pharmacogenomic tests used in UK practice
LV: Intermediate · Clinical reasoning
T: Pharmacogenomics | The study of how genetic variation affects drug response
T: Poor or ultra-rapid metaboliser | A person whose enzyme variant makes them metabolise a drug much more slowly or quickly than usual
H: Metabolism
- **CYP2D6**: converts codeine to morphine. Ultra-rapid metabolisers can get toxic morphine levels; poor metabolisers get little pain relief. Codeine is contraindicated in children under 12 and in breastfeeding, and restricted in children and young people.
- **CYP2C19**: activates clopidogrel; poor metabolisers get less antiplatelet effect.
- **TPMT**: metabolises azathioprine and mercaptopurine. Testing before starting reduces the risk of severe bone marrow toxicity.
- **DPD** (DPYD gene): breaks down fluorouracil and capecitabine. Testing before treatment is standard in the UK to prevent severe toxicity.
P: Genotype is one influence among many. Age, kidney and liver function, interactions and adherence also change response, and an enzyme inhibitor can make a normal metaboliser behave like a poor one (phenoconversion): strong CYP2D6 inhibitors such as fluoxetine or paroxetine reduce the conversion of codeine to morphine.
H: Hypersensitivity
- **HLA-B*57:01** testing before abacavir prevents hypersensitivity reactions.
- **HLA-B*15:02** (in people of some South-East Asian ancestry) predicts severe skin reactions to carbamazepine.
X: Interpreting a DPYD result.
> A man due to start capecitabine has a pre-treatment test showing partial DPD deficiency.
> He would break down fluoropyrimidines more slowly and is at risk of severe toxicity (mucositis, diarrhoea, low blood counts).
> The oncology team considers a reduced starting dose or another treatment, following national guidance; complete deficiency generally rules fluoropyrimidines out.
DRUG: Codeine | Opioid analgesic prodrug, converted to morphine by CYP2D6 | Mild to moderate pain; cough (limited use) | Constipation, drowsiness, dependence; toxic morphine levels in ultra-rapid metabolisers | Contraindicated under 12 years, in breastfeeding and in ultra-rapid metabolisers; counsel on drowsiness and driving; short courses (check the BNF and MHRA advice)
K: CYP2D6 (codeine), CYP2C19 (clopidogrel), TPMT (thiopurines), DPD (fluoropyrimidines) and HLA-B*57:01 (abacavir) are the key examples.
!: Supplying codeine for a breastfeeding mother: ultra-rapid metabolism can expose the baby to dangerous morphine levels.
EV: established | Variants in genes such as CYP2D6, CYP2C19, TPMT, DPYD and HLA-B change drug response, and several are tested routinely before specific drugs.
Q: Why is DPD testing done before capecitabine? | DPD deficiency causes severe, potentially fatal toxicity.
Q: Which test is done before abacavir? | HLA-B*57:01.
SUM: Genetic variants affect metabolism, efficacy and serious reactions.
SUM: Several pharmacogenomic tests are standard before specific drugs.
SRC: MHRA, Drug Safety Update: codeine for analgesia, restricted use in children because of reports of morphine toxicity | guidance | 2013-07 | https://www.gov.uk/drug-safety-update
SRC: MHRA, Drug Safety Update: 5-fluorouracil and capecitabine, DPD testing recommended before initiation | guidance | 2020-10 | https://www.gov.uk/drug-safety-update
M2#pharmacy-u02-22-q1@1: Which enzyme converts codeine to morphine? | CYP2D6 | CYP3A4 | CYP2C19 | TPMT | DPD | CYP2D6 variation explains toxicity in ultra-rapid metabolisers and poor effect in poor metabolisers.
M2#pharmacy-u02-22-q2@2: What testing is standard before starting capecitabine? | DPD deficiency testing | TPMT testing | HLA-B*57:01 testing | CYP2D6 testing | No testing | DPD deficiency can cause severe fluoropyrimidine toxicity.
M3#pharmacy-u02-22-q3@2: A breastfeeding mother asks for co-codamol. What's the best response? | Recommend an alternative: codeine is contraindicated in breastfeeding | Supply it with advice to feed after doses | Supply the lowest strength | Supply it for up to a week | Advise she stops feeding while taking it | MHRA advice: codeine is contraindicated in breastfeeding because of the risk to the baby.
M1@1: What does pharmacogenomics study? | How genetic variation affects drug response | How drugs are manufactured from genes | How drugs permanently change genes | How much drugs cost to develop | How diet affects drug absorption | Variants in enzymes, transporters, targets and HLA types change efficacy and the risk of serious reactions.
SA3@1,2: Using codeine as the example, explain how CYP2D6 genotype and interacting drugs can change the response, and why codeine is restricted in children and contraindicated in breastfeeding. | Codeine is a prodrug converted to morphine by CYP2D6. Poor metabolisers make little morphine and get little pain relief; ultra-rapid metabolisers make more morphine than expected and risk toxicity, including respiratory depression. Strong CYP2D6 inhibitors such as fluoxetine or paroxetine can make a normal metaboliser behave like a poor one. Because genotype is usually unknown, MHRA advice restricts codeine in children and young people (contraindicated under 12 years) and contraindicates it in breastfeeding, where an ultra-rapid metabolising mother can expose the baby to dangerous morphine levels. | Codeine is a CYP2D6 prodrug ; Poor metabolisers: little effect ; Ultra-rapid metabolisers: toxicity ; Interacting inhibitors (phenoconversion) ; MHRA restrictions in children and breastfeeding

## Drug development and clinical trials
S: A new medicine takes over a decade to move from discovery to licence, through preclinical studies and phased clinical trials, then regulatory review and post-marketing surveillance. Understanding the process helps you judge the evidence for any medicine.
O: Describe the stages of drug development and the phases of clinical trials
O: Explain the roles of the MHRA and post-marketing surveillance
LV: Intermediate · Application
T: Phase III trial | A large randomised trial comparing a new drug with placebo or standard treatment for efficacy and safety
T: Marketing authorisation | The licence from a regulator (the MHRA in the UK) to market a medicine for stated uses
H: From discovery to licence
- **Discovery and preclinical**: identifying a target and a molecule; laboratory and animal studies of activity and toxicity.
- **Phase I**: small numbers of healthy volunteers (or patients for toxic drugs): safety, tolerability and pharmacokinetics.
- **Phase II**: patients with the condition: dose finding and early efficacy.
- **Phase III**: large randomised controlled trials: efficacy and safety against comparators.
- **Licensing**: the MHRA reviews quality, safety and efficacy and grants a marketing authorisation with the SPC.
P: Trials have limits. They typically last months, enrol a few thousand people, and often exclude older people, pregnant women and people with several conditions or many medicines. A reaction affecting 1 in 10,000 people is unlikely to be seen before licensing.
H: After licensing
- **Phase IV and pharmacovigilance**: rare and long-term effects appear only in large populations. New medicines carry the black triangle (▼) for additional monitoring and Yellow Card reporting of all suspected reactions.
- NICE appraises cost-effectiveness for NHS use in England (with the SMC in Scotland and AWTTC in Wales).
X: How many people are needed to see a rare reaction?
> The "rule of three": to be 95% confident of seeing at least one case of a reaction with an incidence of 1 in n, about 3n people must be exposed.
> For 1 in 10,000, that is about 30,000 people, more than most development programmes include.
> So rare reactions often emerge only through Yellow Card reports and other post-marketing data.
K: Phases I to III establish safety and efficacy before licensing; pharmacovigilance continues after, especially for black triangle medicines.
!: Treating a licence as proof that a medicine has no unknown risks: rare effects often emerge after marketing.
EV: established | Medicines are licensed after phased trials of safety and efficacy, and rare or long-term harms are detected by post-marketing surveillance.
Q: What is the main purpose of a phase I trial? | Safety, tolerability and pharmacokinetics, usually in small numbers of healthy volunteers.
Q: What does the black triangle (▼) mean? | The medicine is under additional monitoring: report all suspected reactions.
SUM: Drug development moves from preclinical work through phase I to III trials to licensing.
SUM: Post-marketing surveillance detects rare and long-term effects.
SRC: Medicines and Healthcare products Regulatory Agency, Clinical trials for medicines: guidance | guidance | 2025 | https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency
SRC: MHRA, Yellow Card scheme and black triangle medicines | guidance | 2026 | https://yellowcard.mhra.gov.uk/
M1#pharmacy-u02-23-q1@1: Which trial phase is mainly about dose finding in patients? | Phase II | Phase I | Phase III | Phase IV | Preclinical | Phase II studies dose and early efficacy in people with the condition.
M2#pharmacy-u02-23-q2@2: What should you report for a black triangle medicine? | All suspected adverse reactions | Only fatal reactions | Only reactions in children | Nothing until it's fully licensed | Only reactions listed in the leaflet | Black triangle medicines are under additional monitoring.
M2#pharmacy-u02-23-q3@1: In the UK, which body grants marketing authorisations for medicines? | The MHRA | NICE | The GPhC | The BMA | The NHS Business Services Authority | The MHRA licenses medicines; NICE appraises cost-effectiveness.
M3@1,2: A drug's trials included 3,000 people. After launch, a serious reaction affecting about 1 in 10,000 users is reported. What is the best explanation? | The trials were too small to detect so rare a reaction | The trials must have been fraudulent | The reaction can't be caused by the drug | Phase I trials should have found it | Licensing removes all rare risks | By the rule of three, about 30,000 people would need exposure to be confident of seeing one case.
SA2@1,2: Outline the stages a new medicine passes through from discovery to routine use in the UK, and explain why reporting suspected reactions remains important after licensing. | Discovery and preclinical studies identify a target and molecule and test activity and toxicity in the laboratory and animals. Phase I tests safety, tolerability and pharmacokinetics in small numbers of volunteers; phase II finds the dose and early efficacy in patients; phase III compares the drug with placebo or standard treatment in large randomised trials. The MHRA reviews quality, safety and efficacy and grants a marketing authorisation; NICE (with the SMC and AWMSG) appraises cost-effectiveness. Trials are too small and selective to reveal rare or long-term harms, so pharmacovigilance continues: black triangle medicines need all suspected reactions reported by Yellow Card. | Preclinical stage ; Phases I to III ; MHRA licensing ; NICE or equivalent appraisal ; Post-marketing surveillance and Yellow Card

## Biological medicines and biosimilars
S: Biological medicines are large, complex molecules made in living cells, such as monoclonal antibodies, insulins and vaccines. Biosimilars are highly similar versions that cost less, and they have changed how many conditions are treated.
O: Describe how biological medicines differ from small-molecule drugs
O: Explain what biosimilars are and how they are used safely
LV: Intermediate · Application
T: Monoclonal antibody | A laboratory-made antibody targeting one specific molecule, named with the suffix -mab
T: Biosimilar | A biological medicine highly similar to an approved reference biological, with no clinically meaningful differences
H: Biologics
- Made by living cells, so they are large, complex and inherently variable between batches; most are given by injection because they would be digested orally.
- Examples: anti-TNF antibodies (adalimumab, infliximab) for rheumatoid arthritis and inflammatory bowel disease; insulins; erythropoietin; vaccines.
- They can provoke immune responses (anti-drug antibodies) that reduce effect, and many increase infection risk.
P: Biological medicines need careful handling: most are stored in a refrigerator, many must not be frozen or shaken vigorously, and each has its own storage and in-use instructions in the SPC. Pharmacists support people injecting at home with device training, sharps disposal and a plan for missed doses.
H: Biosimilars
- A biosimilar is shown to be highly similar in structure, function, safety and efficacy to its reference product. It isn't identical, like a generic small molecule.
- In the UK, biologicals are prescribed by brand name so that the product given is clear and traceable for pharmacovigilance.
- Switching to biosimilars, with clinical agreement and patient information, has produced large NHS savings.
X: Supporting a biosimilar switch.
> A hospital plans to switch patients from a reference adalimumab to a biosimilar.
> The clinical team agrees the switch, patients are informed and trained on the new device, and the brand is recorded.
> Any suspected reaction is reported by Yellow Card, naming the brand and batch.
DRUG: Adalimumab | Monoclonal antibody against tumour necrosis factor (TNF) | Rheumatoid arthritis, psoriatic arthritis, ankylosing spondylitis, Crohn's disease, ulcerative colitis, psoriasis | Serious infections including tuberculosis reactivation; injection site reactions; rarely demyelination or heart failure worsening | Screen for TB and hepatitis B before starting; avoid live vaccines; prescribe and record by brand; report infections promptly (check the BNF and SPC)
K: Biologics are large proteins made in living cells; biosimilars are highly similar, not identical, and are prescribed by brand.
!: Treating a biosimilar switch as automatic substitution without the clinical team and patient being involved, or recording it without the brand.
EV: established | Biosimilars are highly similar, not identical, to their reference biological medicines and are prescribed by brand for traceability.
Q: Why are biological medicines prescribed by brand? | So the exact product is traceable for safety monitoring.
Q: What does the suffix -mab indicate? | A monoclonal antibody.
SUM: Biologics are complex, variable and usually injected.
SUM: Biosimilars are highly similar to their reference products and prescribed by brand.
SRC: MHRA, Guidance on the licensing of biosimilar products | guidance | 2021 | https://www.gov.uk/government/publications/guidance-on-the-licensing-of-biosimilar-products
SRC: NHS England, Commissioning framework for biological medicines (including biosimilar medicines) | guidance | 2017 | https://www.england.nhs.uk/
M1#pharmacy-u02-24-q1@1: Which is a monoclonal antibody? | Adalimumab | Methotrexate | Prednisolone | Omeprazole | Metformin | The -mab suffix denotes a monoclonal antibody (here, anti-TNF).
M2#pharmacy-u02-24-q2@2: Why are biologicals prescribed by brand name? | For traceability and pharmacovigilance | Because generics are illegal | Because brands are always cheaper | To avoid labelling | Because biosimilars are identical | Biosimilars aren't identical, so the product given must be recorded clearly.
M2#pharmacy-u02-24-q3@2: What screening is needed before starting an anti-TNF? | Tuberculosis and hepatitis B | Thyroid function only | DPD deficiency | HLA-B*57:01 | Bone density | Anti-TNF treatment can reactivate latent TB and hepatitis B.
M3@1,2: A patient taking adalimumab reports a persistent cough, weight loss and night sweats. What is the main concern? | Reactivation of tuberculosis | A simple viral cold | Anti-drug antibodies only | An expected injection site reaction | Low blood glucose | Anti-TNF treatment impairs defence against TB; these symptoms need urgent medical review.
SA2@1,2: Explain how biological medicines differ from small-molecule drugs, what a biosimilar is, and how biosimilars are used safely in the NHS. | Biological medicines are large, complex molecules made in living cells, such as monoclonal antibodies, insulins and vaccines. They vary slightly between batches, are usually injected because they would be digested, can provoke anti-drug antibodies, and often increase infection risk. A biosimilar is highly similar to an approved reference biological in structure, function, safety and efficacy, with no clinically meaningful differences, but isn't identical as a generic is. Biologicals are prescribed and recorded by brand for traceability; switches are agreed by the clinical team with patient information and training, and suspected reactions are reported naming the brand and batch. | Made in living cells, large and variable ; Injected; immunogenicity and infection risk ; Definition of biosimilar ; Not identical to reference ; Brand prescribing, agreed switching and reporting
`;
