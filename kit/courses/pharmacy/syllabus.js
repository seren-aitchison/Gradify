// PharmaGradify: the pharmacy curriculum as schools and lessons. Each "* topic" becomes a lesson on the
// school's path; its notes are in notes/uNN.js (format: kit/course/notes.js). The course engine calls a
// school a "unit" internally (ids u01…); the pages say "School".
// Framework: UK pharmacy education: the GPhC's standards for the initial education and training of
// pharmacists (2021), the MPharm, the foundation training year and the GPhC registration assessment, with
// independent prescribing at registration. Law and services that differ between England, Scotland, Wales
// and Northern Ireland are labelled. Education only: doses and examples are illustrative, and practice
// follows the current BNF, the SPC, local policy and the pharmacist's own professional judgement.
// Hierarchy: school (numbered) → module ("> ") → lesson ("* ").
import { parseSyllabus } from "../../course/syllabus.js";
import { IDS, RETIRED } from "./ids.js";

export const SYLLABUS = `
1. Foundations of Pharmacy Practice
> The profession
* Introduction to pharmacy
* Pharmacy across sectors
* The pharmacy team
* The GPhC and professional regulation
* The standards for pharmacy professionals
> Person-centred care
* Person-centred care
* Communication and consultation skills
* Health literacy and adapting information
* Consent in pharmacy practice
* Confidentiality and information governance
* Equality, diversity and inclusion
> Safe and effective practice
* Professional judgement and accountability
* Raising concerns and speaking up
* Patient safety and learning from errors
* Evidence-based practice
* Reflective practice and CPD
> The pharmacy in the health system
* The NHS and pharmacy services across the UK
* Public health and health promotion
* Working in multidisciplinary teams
* Digital pharmacy and technology

2. Pharmacology: How Drugs Act
> Principles
* What pharmacology is
* Drug targets
* Receptors and receptor families
* Agonists and antagonists
* Dose-response relationships
* Affinity, efficacy and potency
* Tolerance, desensitisation and dependence
> Signalling
* G protein-coupled receptors and second messengers
* Ion channels as drug targets
* Enzymes as drug targets
* Transporters as drug targets
* Nuclear receptors
> Systems pharmacology
* The autonomic nervous system
* Cholinergic pharmacology
* Adrenergic pharmacology
* Histamine and its antagonists
* Eicosanoids and inflammation
* Neurotransmitters in the brain
> Safety pharmacology
* Adverse drug reactions
* Mechanisms of drug interactions
* Drug toxicity and overdose
* Pharmacogenomics
* Drug development and clinical trials
* Biological medicines and biosimilars

3. Pharmacokinetics and Biopharmaceutics
> Absorption and distribution
* Introduction to pharmacokinetics
* Routes of administration
* Absorption and bioavailability
* First-pass metabolism
* Distribution and volume of distribution
* Plasma protein binding
> Metabolism and excretion
* Drug metabolism: phase I and II
* Cytochrome P450 enzymes
* Renal excretion
* Biliary excretion and enterohepatic recycling
> Quantitative pharmacokinetics
* Clearance
* Half-life and the elimination rate constant
* Steady state and accumulation
* Loading and maintenance doses
* Linear and non-linear kinetics
* Compartment models
> Applied pharmacokinetics
* Therapeutic drug monitoring
* Pharmacokinetics in renal impairment
* Pharmacokinetics in hepatic impairment
* Biopharmaceutics and dissolution
* Bioequivalence

4. Medicinal and Pharmaceutical Chemistry
> Chemical foundations
* Functional groups in drugs
* Acids, bases and pKa
* Ionisation and the Henderson-Hasselbalch equation
* Lipophilicity and partition coefficients
* Stereochemistry and chirality
> Drug design
* Structure-activity relationships
* Pharmacophores and lead optimisation
* Prodrugs
* Bioisosteres
* Drug-likeness and Lipinski's rule of five
> Drug classes in chemistry
* Beta-lactam chemistry
* Steroid chemistry
* Opioid chemistry
* Benzodiazepine chemistry
> Stability and analysis
* Chemical degradation pathways
* Drug stability and shelf life
* Pharmaceutical analysis
* Spectroscopy in pharmaceutical analysis
* Chromatography
* Quality control and pharmacopoeias

5. Pharmaceutics: Formulation and Dosage Forms
> Physical pharmacy
* Introduction to pharmaceutics
* Solubility and dissolution
* Particle size and powders
* Rheology
* Surfactants and interfacial phenomena
> Liquid and semi-solid dosage forms
* Solutions
* Suspensions
* Emulsions
* Creams, ointments and gels
> Solid dosage forms
* Tablets
* Capsules
* Modified-release dosage forms
* Excipients
> Other routes
* Parenteral products
* Sterile products and aseptic manufacture
* Ophthalmic preparations
* Inhaled dosage forms
* Transdermal and topical delivery
* Rectal and vaginal dosage forms
> Practice
* Extemporaneous preparation
* Packaging and storage
* Pharmaceutical microbiology and preservation
* Manufacturing and quality assurance

6. Pharmaceutical Calculations
> Foundations
* Units and conversions
* Significant figures and rounding
* Ratio and proportion
> Concentrations
* Percentage concentrations
* Ratio strengths and parts per million
* Molarity, millimoles and milliequivalents
* Dilutions
* Concentrating and mixing
> Doses
* Dose calculations
* Weight-based dosing
* Body surface area dosing
* Doses in children
* Quantities to supply
> Infusions and clinical calculations
* Infusion rates
* Drug infusions in mg per hour
* Displacement values
* Estimating renal function
* Dose adjustment in renal impairment
* Pharmacokinetic calculations
* Calculations in the registration assessment

7. Cardiovascular Therapeutics
> Hypertension and lipids
* Hypertension
* Antihypertensive drugs
* Lipid management
* Cardiovascular risk assessment
> Coronary disease
* Stable angina
* Acute coronary syndromes
* Secondary prevention after a heart attack
> Heart failure and rhythm
* Chronic heart failure
* Atrial fibrillation
* Antiarrhythmic drugs
> Thrombosis
* Venous thromboembolism
* Anticoagulants
* Warfarin management
* Direct oral anticoagulants
* Antiplatelet drugs
> Other cardiovascular conditions
* Stroke and transient ischaemic attack
* Peripheral arterial disease
* Cardiovascular adverse drug reactions

8. Respiratory Therapeutics
> Airways disease
* Asthma in adults
* Asthma in children
* Chronic obstructive pulmonary disease
* Inhaler devices and technique
* Bronchodilators
* Inhaled corticosteroids
* Acute exacerbations
> Other respiratory conditions
* Allergic rhinitis and allergy
* Anaphylaxis
* Cough and respiratory infections
* Smoking cessation

9. Endocrine and Diabetes Therapeutics
> Diabetes
* Type 1 diabetes
* Insulins
* Type 2 diabetes
* Glucose-lowering drugs
* Hypoglycaemia
* Diabetes in special situations
* Diabetic emergencies
> Other endocrine conditions
* Thyroid disorders
* Adrenal insufficiency and corticosteroids
* Osteoporosis
* Contraception
* Menopause and hormone replacement therapy
* Obesity and weight management

10. Central Nervous System and Mental Health Therapeutics
> Mental health
* Depression
* Antidepressants
* Anxiety disorders
* Bipolar disorder and lithium
* Schizophrenia and psychosis
* Antipsychotics
* Attention deficit hyperactivity disorder
* Dementia
* Insomnia
* Substance misuse and harm reduction
> Neurology
* Epilepsy
* Antiepileptic drugs
* Parkinson's disease
* Migraine
* Multiple sclerosis
> Pain
* Pain physiology and assessment
* Analgesic ladder and simple analgesics
* Opioids
* Neuropathic pain
* Palliative care symptom control

11. Infection and Antimicrobial Stewardship
> Principles
* Microbiology for pharmacists
* Antibiotic classes and mechanisms
* Antimicrobial resistance
* Antimicrobial stewardship
* Choosing an antibiotic
> Infections
* Urinary tract infections
* Respiratory tract infections
* Skin and soft tissue infections
* Sepsis
* Clostridioides difficile infection
* Tuberculosis
* Fungal infections
> Viral infections and immunisation
* Antiviral drugs
* HIV
* Viral hepatitis
* Vaccines and immunisation
* Travel health

12. Gastrointestinal, Renal and Hepatic Therapeutics
> Gastrointestinal
* Dyspepsia and gastro-oesophageal reflux
* Peptic ulcer disease and Helicobacter pylori
* Nausea and vomiting
* Constipation
* Diarrhoea
* Inflammatory bowel disease
* Irritable bowel syndrome
> Renal
* Acute kidney injury
* Chronic kidney disease
* Electrolyte disorders
* Fluid therapy
> Hepatic
* Liver disease and drug handling
* Drug-induced liver injury
* Alcohol-related liver disease

13. Musculoskeletal, Skin, Eye and Inflammatory Conditions
> Musculoskeletal and inflammatory
* Non-steroidal anti-inflammatory drugs
* Osteoarthritis
* Rheumatoid arthritis
* Gout
* Disease-modifying antirheumatic drugs
> Skin
* Eczema
* Psoriasis
* Acne
* Skin infections and infestations
> Eyes and ears
* Eye conditions
* Ear conditions

14. Oncology, Haematology and Immunology
> Haematology
* Anaemias
* Blood products and haematological support
> Oncology
* Principles of cancer treatment
* Cytotoxic chemotherapy
* Targeted therapies and immunotherapy
* Supportive care in cancer
* Safe handling of cytotoxic medicines
> Immunology
* Immunosuppressants
* Transplantation
* Biologics in inflammatory disease

15. Special Populations
> Life stages
* Children and young people
* Neonates
* Pregnancy
* Breastfeeding
* Older people
> Organ impairment
* Prescribing in renal impairment
* Prescribing in hepatic impairment
> Complex care
* Polypharmacy and deprescribing
* Frailty
* People with learning disabilities
* Swallowing difficulties and covert administration
* Care homes

16. Pharmacy Law, Ethics and Governance
> Medicines law
* The legal framework for medicines
* Classes of medicines: POM, P and GSL
* Prescriptions and prescription requirements
* Who can prescribe
* Emergency supply
* Patient group directions and patient specific directions
* Wholesale dealing and supply
* Labelling requirements
> Controlled drugs
* The Misuse of Drugs Regulations: schedules
* Controlled drug prescriptions
* Controlled drug registers and records
* Safe custody and destruction
> Professional regulation and governance
* The responsible pharmacist
* Records and record keeping
* Fitness to practise
* Safeguarding in pharmacy
* Clinical governance
* Pharmacy across the four nations
* Ethics in pharmacy practice
* Veterinary medicines in pharmacy

17. Clinical Pharmacy and Medicines Optimisation
> Clinical checks
* The clinical check
* Medicines reconciliation
* Drug interactions in practice
* Identifying and managing adverse drug reactions
* Reporting adverse reactions: the Yellow Card scheme
* Interventions and documentation
> Medicines optimisation
* Medicines optimisation
* Adherence and concordance
* Structured medication reviews
* Shared decision-making
* Counselling on medicines
> Community services
* Responding to symptoms
* Minor illness and referral
* Pharmacy First and common clinical conditions
* New Medicine Service and discharge services
* Hospital clinical pharmacy
* Transfers of care

18. Prescribing and Clinical Assessment
> Becoming a prescriber
* The independent prescriber
* The RPS competency framework for all prescribers
* Prescribing governance and scope
> Clinical assessment
* Consultation models
* History taking
* Clinical examination skills
* Vital signs and red flags
* Interpreting blood tests
* Diagnostic reasoning
> Prescribing decisions
* Writing a prescription
* Prescribing safety and common errors
* Antimicrobial prescribing
* Remote prescribing
* Influences on prescribing
* Monitoring and follow-up
* Prescribing in practice: case reviews

19. Registration Assessment and Foundation Training
> The registration assessment
* The GPhC registration assessment
* The assessment framework
* Single best answer questions
* Extended matching questions
* Using the BNF and resources efficiently
* Revision strategy
> Foundation training
* The foundation training year
* Learning outcomes and evidence
* Working with your designated supervisor
* From trainee to registered pharmacist
* GPhC revalidation
`;

export const TRACKS = [
  { name: "Professional practice", units: [1, 16, 17, 18], from: "#16c784", to: "#7ee0ff" },
  { name: "The science of medicines", units: [2, 3, 4, 5], from: "#6a60ff", to: "#b38cff" },
  { name: "Calculations", units: [6], from: "#ffc002", to: "#ff8a3d" },
  { name: "Therapeutics", units: [7, 8, 9, 10, 11, 12, 13, 14], from: "#ff3d6e", to: "#ff9f40" },
  { name: "Special populations", units: [15], from: "#0aa4c9", to: "#40d4b1" },
  { name: "Qualifying", units: [19], from: "#f055dd", to: "#4641ff" },
];

// Paths list schools in study order. `select` limits a shared school to the modules that pathway needs
// (by module title); schools not in `select` are taken whole.
export const PATHS = [
  { id: "mpharm-1", name: "MPharm: the sciences", sub: "The professional foundations, then how drugs act, how the body handles them, their chemistry and their formulation, with calculations throughout.", units: [1, 2, 3, 4, 5, 6] },
  { id: "mpharm-therapeutics", name: "MPharm: therapeutics", sub: "Disease, drugs and patients system by system: cardiovascular, respiratory, endocrine, mental health and neurology, infection, gastrointestinal and renal, inflammation and skin, cancer and immunology, and special populations.", units: [7, 8, 9, 10, 11, 12, 13, 14, 15] },
  { id: "mpharm-practice", name: "MPharm: practice and prescribing", sub: "Law, ethics and governance, clinical pharmacy and medicines optimisation, and the clinical assessment and prescribing skills you'll need as an independent prescriber at registration.", units: [16, 17, 18, 15] },
  { id: "registration", name: "Registration assessment preparation", sub: "The assessment format and framework, calculations, law and the therapeutics that come up most, with single-best-answer practice. Check the GPhC's current framework before you sit.", units: [19, 6, 16, 17, 7, 8, 9, 10, 11, 12, 15] },
  { id: "foundation", name: "Foundation training year", sub: "What your foundation year involves, with the clinical pharmacy, prescribing, law and medicines optimisation you'll use every day.", units: [19, 17, 18, 16, 15] },
  { id: "technician", name: "Pharmacy technicians", sub: "The professional foundations, medicines law, dispensing, formulation, calculations and medicines optimisation, within the GPhC's standards for pharmacy technicians and your local scope.", units: [1, 16, 5, 6, 17],
    select: { 5: ["Liquid and semi-solid dosage forms", "Solid dosage forms", "Practice"], 17: ["Clinical checks", "Medicines optimisation"] } },
  { id: "prescriber", name: "Pharmacist prescribers", sub: "Clinical assessment, prescribing decisions and governance, with the therapeutics and special populations behind them, for pharmacists preparing to prescribe or extending their scope.", units: [18, 17, 15, 7, 8, 9, 11] },
  { id: "cpd", name: "Practising pharmacists: CPD", sub: "Refresh law, clinical pharmacy, prescribing and the therapeutics that change most, and record it for GPhC revalidation.", units: [16, 17, 18, 7, 9, 11] },
];

// the syllabus as schools, modules and lessons; lesson ids are u01-01 style
export const UNITS = parseSyllabus(SYLLABUS, IDS, RETIRED);
