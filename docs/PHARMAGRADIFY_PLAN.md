# PharmaGradify plan

PharmaGradify (getgradify.com/pharmagradify/) is a pharmacy learning platform for the UK. It serves:
- MPharm students;
- foundation trainee pharmacists preparing for the GPhC registration assessment;
- pharmacy technicians;
- pharmacist prescribers;
- practising pharmacists doing CPD.

It runs on the shared Gradify course engine (`kit/course/course.js`), the same one as LawGradify and NurseGradify. Nothing in it is a separate system: progress, mastery, attempts, flashcards, the AI tutor and the account are shared.

## What exists

| Piece | Where | State |
|---|---|---|
| Homepage, study app, learning map, 3D drug-target model | `pharmagradify/` | Live before the course; now links to it |
| **Pharmacy course** | `pharmagradify/course/` → `kit/courses/pharmacy/` | 19 schools, 318 lessons, 8 pathways. Schools are published as they're written (`written` in `course.js`) |
| Calculations practice | `kit/interactive/pharmcalc.js` | Generated problems with worked methods (percentage and ratio strengths, dilutions, millimoles, weight- and BSA-based doses, infusions, displacement values, Cockcroft-Gault, quantities). Tested in `tests/pharmcalc.test.mjs` |
| Drug cards | `DRUG:` lines in the notes → Drugs tab | Class and mechanism, uses, adverse effects and cautions, and monitoring and counselling. Each card becomes two flashcards |
| 3D drug targets | School 2 lessons → `3d.html?system=receptors&quiz=name` | The existing membrane model with find-it and name-it quizzes |
| Mock exams | `exams` in `course.js` | A calculations paper, 60- and 120-question SBA papers, and law and ethics. Drawn only from written schools |
| Written practice and AI tutor | `writing.js`, `kit/assess/tutor.js` | The tutor has a pharmacy boundary: no doses or supply decisions for real patients |

## Framework

- **The GPhC's standards for the initial education and training of pharmacists (2021)**, mapped at the level of the four domains of learning outcomes (`map.js`, `verified: null` until checked against the published standards). Under those standards, newly qualified pharmacists are independent prescribers at registration, so School 18 teaches clinical assessment and prescribing.
- **The registration assessment's subject areas** (`map.js`). The GPhC revises its framework: School 19 tells learners to check the current version.
- Four nations: law and services that differ between England, Scotland, Wales and Northern Ireland are labelled (School 16 has a dedicated lesson).

## Pathways

1. MPharm: the sciences
2. MPharm: therapeutics
3. MPharm: practice and prescribing
4. Registration assessment preparation
5. Foundation training year
6. Pharmacy technicians
7. Pharmacist prescribers
8. Practising pharmacists: CPD

## Safety and honesty

- **Standing notice:** education, not clinical advice. The course is not GPhC registration or training. Doses are illustrative; use the current BNF or BNFC, the SPC, local guidance and professional judgement.
- **QA rules for pharmacy** (`scripts/qa-courses.mjs`):
  - every clinical lesson points to the BNF, SPC, guidance, referral or monitoring;
  - any dose is marked illustrative or sent to the BNF or SPC;
  - law lessons cite the legislation or the GPhC standard;
  - drug card lines must be complete.
- **Review queue:** `docs/qa/pharmacy-review-queue.md` flags doses, controlled drugs law, recent or changing guidance, calculations and renal dosing, and drug cards for review by a registered pharmacist educator.

## Order of writing

1. **School 6** (calculations): high stakes in the registration assessment, and checkable by arithmetic.
2. **Schools 1, 2 and 16**: foundations, pharmacology, and law and ethics.
3. **Schools 3, 17, 7, 8, 9, 10 and 11**: pharmacokinetics, clinical pharmacy, then the main therapeutics.
4. **Schools 12, 13, 14, 15, 18 and 19**, then **4 and 5**: chemistry and pharmaceutics.

## Status

See the status sections below as schools are added. Content is written by Claude from general knowledge and checked by the QA rules. It still needs review by a registered pharmacist before any pathway is promoted as exam preparation.

## Status: School 6, Pharmaceutical Calculations (2026-11-05)

- **20 lessons, written to content standard 2**: units, rounding, proportion, percentage and ratio strengths, ppm, millimoles and milliequivalents, dilutions, alligation, doses, weight- and BSA-based dosing, children's doses, quantities, infusion and drug-infusion rates, displacement values, Cockcroft-Gault, renal dose adjustment, pharmacokinetic equations, and the registration assessment.
- **Questions:** each lesson has worked examples, single-best-answer questions and a numerical question. QA reports 0 warnings.
- **Expert review:** the arithmetic was checked by hand, and the trainer's arithmetic by tests. A pharmacist educator should still review:
  - the clinical framing: MHRA advice on CrCl versus eGFR, Devine IBW, children's dosing practice, infusion practice;
  - the registration assessment description, which must be checked against the GPhC's current information.

## Status: School 2, Pharmacology: How Drugs Act (2026-11-05)

- **24 lessons, written to content standard 2**: targets, receptor families, agonism and antagonism, dose-response, potency and efficacy, tolerance and dependence, G protein signalling, ion channels, enzymes, transporters, nuclear receptors, autonomic, cholinergic, adrenergic and histamine pharmacology, eicosanoids, brain transmitters, ADRs, interactions, toxicity, pharmacogenomics, drug development, and biologics.
- **12 drug cards** (naloxone, omeprazole, digoxin, sertraline, prednisolone, atropine, salbutamol, propranolol, cetirizine, ibuprofen, codeine, adalimumab).
- **3D links:** six lessons link to the drug-target model.
- **QA:** 0 warnings.
- **Expert review:** the drug cards and the MHRA-based statements (codeine restrictions, DPD testing, CrCl advice, steroid cards) need checking by a pharmacist against the current BNF, SPCs and MHRA advice.

## Status: School 16, Pharmacy Law, Ethics and Governance (2026-11-05)

- **20 lessons, written to content standard 2**:
  - the legal framework;
  - POM, P and GSL;
  - prescription requirements and validity, and who can prescribe;
  - emergency supply, PGDs and PSDs, wholesale dealing, and labelling;
  - controlled drug schedules, prescriptions, registers, and safe custody and destruction;
  - the responsible pharmacist, records, and fitness to practise;
  - safeguarding, clinical governance, the four nations, ethics, and veterinary medicines.
- **QA:** 0 warnings.
- **Expert review: highest priority.** Medicines law has detailed exceptions and changes. A pharmacist should check every rule against the current legislation and the RPS *Medicines, Ethics and Practice* guide, especially:
  - emergency supply quantities and CD limits;
  - what can be amended on a CD prescription;
  - retention periods, RP absence rules and wholesale exceptions;
  - the CD schedules of individual drugs;
  - Northern Ireland differences.
- I deliberately left out details I wasn't sure of, such as repeat-dispensing defaults, and pointed to the RPS guide instead.

## Status: School 1, Foundations of Pharmacy Practice (2026-11-05)

- **20 lessons, written to content standard 2**:
  - the profession, its sectors and the team, and delegation;
  - the GPhC and RPS, and the nine standards;
  - person-centred care, consultation skills and health literacy;
  - consent and capacity across the UK, confidentiality and Caldicott, and equality;
  - judgement and accountability, speaking up and candour, and patient safety;
  - evidence-based practice, reflection and GPhC revalidation;
  - NHS structures and services in each nation, public health, multidisciplinary teams, and digital pharmacy.
- **QA:** 0 warnings, after rewriting the wrong options in 15 questions so that answer length doesn't give the answer away.
- **Expert review:** service names and contracts in each nation change often (for example, Wales's Common Ailments Service now sits within the Clinical Community Pharmacy Service). Check them, and the dates of GPhC guidance, against current sources.

## Status: written practice and consultation role-play (2026-11-05)

- **Six tasks** in `writing.js`:
  - a clinical check and intervention (clarithromycin with simvastatin, using SBAR);
  - counselling on weekly methotrexate;
  - medicines reconciliation on admission;
  - responding to symptoms (a cough with red flags);
  - a GPhC reflective account on a near miss;
  - a **patient consultation role-play** (heartburn with hidden red flags: dysphagia and weight loss).
- The AI tutor's role-play and debrief now adapt to the course (`SCENES` in `kit/assess/tutor.js`): a client for law, a patient for pharmacy and nursing. The interview page's wording follows the task's `who`.
- **Expert review:** the model answers (interaction management, methotrexate counselling, the apixaban dose criteria, NICE NG12 referral criteria) should be checked by a pharmacist.

## Status: School 17, Clinical Pharmacy and Medicines Optimisation (2026-11-05)

- **17 lessons, written to content standard 2**:
  - the clinical check, medicines reconciliation, and interactions in practice;
  - ADRs and Yellow Card, and interventions and SOAP documentation;
  - medicines optimisation, adherence, structured medication reviews and shared decision-making;
  - counselling (including high-risk medicines), responding to symptoms and red flags, and minor illness and referral;
  - Pharmacy First in England (the seven conditions and their age limits), NMS and DMS, hospital clinical pharmacy, and transfers of care.
- **QA:** 0 warnings.
- **Expert review:** the service specifications (Pharmacy First age limits and pathways, NMS conditions and timings, DMS) change, so check them against the current NHS England specifications and the equivalents in the other nations.

## Where the pharmacy course stands

- **Written:** 5 of 19 schools (101 of 318 lessons): 1, 2, 6, 16 and 17. Calculations practice, drug cards, 3D links, 4 mock exams, 6 written tasks and a consultation role-play are live.
- **Still to write:** Schools 3, 4, 5, 7 to 15, 18 and 19, in the order set out above.
- **Not started:** a GPhC version of the revalidation tracker (the nursing one is NMC-specific), a prescription clinical-check simulation, and an expert review of everything above.

## Status: School 3, Pharmacokinetics and Biopharmaceutics (2026-11-05)

- 21 lessons, written to content standard 2: ADME, routes, bioavailability, first-pass metabolism, volume of distribution, protein binding, phase I and II, CYP enzymes (including the smoking and clozapine interaction), renal and biliary excretion, clearance, half-life, steady state, loading and maintenance doses, saturable kinetics (phenytoin), compartment models (digoxin sampling), TDM, renal and hepatic impairment, dissolution and the BCS, and bioequivalence (MHRA antiepileptic categories, brand-only drugs). QA reports 0 warnings.
- **Expert review:** check the TDM sampling times and target ranges, the bioequivalence limits and the MHRA antiepileptic categories against current guidance.

## Status: School 7, Cardiovascular Therapeutics (2026-11-05)

- 18 lessons, written to content standard 2, following NICE NG136, NG238, CG126, NG185, NG106, NG196, NG158, NG89, NG128 and CG147. Covers: hypertension diagnosis and NICE steps, lipids and QRISK3, angina and GTN counselling, ACS and DAPT, secondary prevention, HFrEF's four pillars, AF (CHA₂DS₂-VASc and ORBIT), antiarrhythmics (amiodarone monitoring), VTE, anticoagulants and reversal, warfarin, DOACs (where they're unsuitable), antiplatelets, stroke and TIA, PAD, and cardiovascular ADRs.
- **Drug cards:** ramipril, amlodipine, atorvastatin, bisoprolol, amiodarone, warfarin, apixaban and clopidogrel. QA reports 0 warnings.
- **Expert review:** check the NICE thresholds, targets and treatment steps (NG136 and NG238 are updated often), the DOAC criteria and the warfarin INR targets.

## Status: School 8, Respiratory Therapeutics (2026-11-05)

- 11 lessons, written to content standard 2: adult and childhood asthma under BTS/NICE/SIGN NG245 (2024: AIR and MART), COPD (NG115), inhaler technique and carbon footprint, bronchodilators, inhaled corticosteroids (beclometasone by brand, steroid cards), acute asthma and COPD exacerbations, allergic rhinitis, anaphylaxis (Resuscitation Council UK; two auto-injectors), cough and self-care (NG120), and smoking cessation (NG209, CYP1A2).
- **Drug cards:** beclometasone (inhaled) and varenicline. QA reports 0 warnings.
- **Expert review:** check NG245's step details for children and the codeine cough medicine classification against current guidance.

## Status: School 9, Endocrine and Diabetes Therapeutics (2026-11-05)

- 13 lessons, written to content standard 2: type 1 diabetes (NG17, CGM, sick day rules), insulin types and safety, type 2 diabetes (NG28 and HbA1c targets), glucose-lowering drug classes, hypoglycaemia (JBDS and DVLA), special situations (steroids, pregnancy, Ramadan), DKA and HHS, thyroid disease (levothyroxine, carbimazole agranulocytosis), adrenal insufficiency and steroid cards, osteoporosis (NOGG, bisphosphonate counselling, denosumab rebound), contraception (UKMEC and emergency contraception), menopause and HRT (NG23), and obesity (NG246, safe supply).
- **Drug cards:** insulin glargine, metformin, dapagliflozin, levothyroxine, carbimazole and alendronic acid. QA reports 0 warnings.
- **Expert review:** check the thresholds (HbA1c targets, metformin eGFR cut-offs, steroid card criteria), the FSRH emergency contraception dosing and the NICE obesity criteria against current guidance.

## Status: School 10, Central Nervous System and Mental Health Therapeutics (2026-11-05)

- 20 lessons, written to content standard 2:
  - depression and antidepressants (NG222, tapering, serotonin syndrome, hyponatraemia);
  - anxiety (CG113), bipolar disorder and lithium (CG185; MHRA 2024 valproate restrictions);
  - psychosis and clozapine (CG178), antipsychotics and physical health monitoring;
  - ADHD (NG87), dementia (NG97), insomnia (CBT-I, TA922), and substance misuse and OST;
  - epilepsy (NG217) and antiseizure medicines (MHRA categories, lamotrigine titration), Parkinson's disease (time-critical doses), migraine (CG150), multiple sclerosis (NG220);
  - pain assessment, simple analgesics and NG193, opioids (Opioids Aware), neuropathic pain (CG173), and palliative anticipatory medicines (NG31).
- **Drug cards:** mirtazapine, lithium, olanzapine, methadone, lamotrigine and oral morphine. QA reports 0 warnings.
- **Expert review:** check the clozapine monitoring schedule, the lithium monitoring intervals, the valproate and topiramate pregnancy prevention requirements and the opioid conversion guidance against current MHRA and BNF advice.
