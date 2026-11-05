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
