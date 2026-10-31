// NurseGradify: the nursing curriculum as schools and lessons. Each "* topic" becomes a lesson on the
// school's path; its notes are in notes/uNN.js (format: kit/course/notes.js). The course engine calls
// a school a "unit" internally (ids u01…); the pages say "School".
// Framework: UK nursing education and the NMC's standards, which apply UK-wide. Laws, policies and
// health services that differ between England, Scotland, Wales and Northern Ireland are labelled.
// Clinical skills are taught as education only: supervised practice, local policy and scope come first.
// Hierarchy: school (numbered) → module ("> ") → lesson ("* "). Schools 10–13 are the four fields of
// nursing; each field pathway below combines the shared core with its field school.
import { parseSyllabus } from "../../course/syllabus.js";
import { IDS } from "./ids.js";

export const SYLLABUS = `
1. Foundations of Nursing and Professional Practice
> Nursing as a profession
* Introduction to nursing
* History and development of nursing
* The nursing profession
* Professional identity
> Regulation and the Code
* The NMC and professional regulation
* The NMC Code
* The seven NMC platforms
* Professional accountability
> Duties, consent and information
* Duty of care
* Duty of candour
* Consent
* Capacity
* Confidentiality
* Data protection
* Documentation
* Record keeping
> Safe professional practice
* Professional boundaries
* Delegation
* Scope of practice
* Clinical supervision
> Reflection and evidence
* Reflective practice
* Evidence-based practice
> Rights, equality and safeguarding
* Equality, diversity and inclusion
* Human rights
* Safeguarding
> Sustaining professional practice
* Professional resilience
* Patient advocacy
* Ethical decision-making
* Multidisciplinary working
* Continuing professional development
2. Human Anatomy and Physiology
> Foundations of the body
* Anatomical terminology
* Cells and tissues
* Homeostasis
> Protection and movement
* The integumentary system
* Skeletal system
* Muscular system
> The nervous system
* Nervous system
* Brain and spinal cord
* Autonomic nervous system
> The cardiovascular system
* Cardiovascular system
* Blood and circulation
> The respiratory system
* Respiratory system
* Gas exchange
> Digestion and metabolism
* Digestive system
* Liver and pancreas
> The renal and urinary systems
* Renal system
* Urinary system
> Endocrine and reproductive systems
* Endocrine system
* Reproductive system
> Immunity
* Immune system
* Lymphatic system
> Fluids and regulation
* Fluid balance
* Electrolytes
* Acid-base balance
* Temperature regulation
> Applied physiology
* Pain physiology
* Age-related physiological changes
* Cellular pathology
* Microbiology
* Genetics and genomics
3. Health Assessment and Clinical Reasoning
> Principles of assessment
* Introduction to clinical assessment
* Person-centred assessment
* History taking
* Subjective and objective data
> Physical assessment
* Physical assessment
* General inspection
> Vital signs
* Vital signs
* Temperature
* Pulse
* Respiratory rate
* Blood pressure
* Oxygen saturation
* Pain assessment
> Systems assessment
* Neurological observations
* Cardiovascular assessment
* Respiratory assessment
* Abdominal assessment
* Skin assessment
* Hydration assessment
* Nutritional assessment
> Mental state and function
* Mental state examination
* Mobility assessment
> Risk assessment
* Falls assessment
* Pressure ulcer risk assessment
> Clinical reasoning and escalation
* Clinical reasoning
* Differential considerations
* Recognising deterioration
* Escalation of concerns
* Structured handover
* Documentation and reassessment
4. Pharmacology and Medicines Management
> Principles of pharmacology
* Principles of pharmacology
* Pharmacokinetics
* Pharmacodynamics
* Absorption
* Distribution
* Metabolism
* Excretion
* Drug interactions
* Adverse drug reactions
* Contraindications
* Allergies
> Medicines governance
* Medication reconciliation
* Medicines legislation
* Prescribing and administration responsibilities
* The medicines administration process
* The rights of medicines administration
> Routes of administration
* Oral medication
* Topical medication
* Inhaled medication
* Injectable medication
* Intravenous medication principles
> Medicine groups
* Controlled drugs
* Antimicrobials
* Analgesics
* Cardiovascular medicines
* Respiratory medicines
* Endocrine medicines
* Gastrointestinal medicines
* Neurological and psychiatric medicines
* Anticoagulants
* Insulin and diabetes medicines
> Medicines safety and optimisation
* Polypharmacy
* Medicines safety
* Medication errors
* Patient education
* Medicines optimisation
* Antimicrobial stewardship
5. Pathophysiology and Clinical Conditions
> Disease processes
* Introduction to disease processes
* Inflammation
* Infection
* Immune dysfunction
> Cardiovascular conditions
* Cardiovascular disease
* Hypertension
* Heart failure
* Ischaemic heart disease
* Myocardial infarction
* Arrhythmias
* Stroke
> Respiratory conditions
* Respiratory disease
* Asthma
* COPD
* Pneumonia
* Pulmonary embolism
> Endocrine conditions
* Diabetes
* Thyroid disease
> Renal conditions
* Renal disease
* Acute kidney injury
* Chronic kidney disease
> Liver and gastrointestinal conditions
* Liver disease
* Gastrointestinal disorders
> Neurological conditions
* Neurological disorders
* Epilepsy
* Dementia
* Parkinson's disease
> Cancer and blood disorders
* Cancer
* Haematological disorders
> Musculoskeletal, rheumatological and skin conditions
* Musculoskeletal disease
* Rheumatological conditions
* Skin conditions
> Critical illness
* Sepsis
* Shock
> Complex and end-of-life care
* Multimorbidity
* Frailty
* Palliative and end-of-life conditions
6. Core Nursing Procedures and Clinical Skills
> Infection prevention in practice
* Hand hygiene
* Standard infection precautions
* Personal protective equipment
* Aseptic technique
> Wounds and skin integrity
* Wound assessment
* Wound dressing principles
* Pressure area care
> Elimination and fluid balance
* Catheter care
* Urinary catheterisation principles
* Fluid balance monitoring
* Intake and output recording
> Nutrition
* Nutrition support
* Enteral feeding principles
> Respiratory care
* Oxygen therapy
* Nebuliser administration principles
> Diabetes care skills
* Blood glucose monitoring
* Insulin administration principles
> Vascular access and IV therapy
* Blood sampling
* Venepuncture principles
* Cannulation principles
* Intravenous therapy principles
> Medicines and specimens
* Medication administration
* Specimen collection
> Cardiac monitoring and resuscitation
* ECG recording
* Resuscitation principles
* Basic life support
> Comfort, mobility and personal care
* Patient positioning
* Safe moving and handling
* Personal care
* Oral care
* Continence care
> Stomas and drains
* Stoma care
* Drain management
> Observation and records
* Observations and escalation
* Documentation of procedures
7. Clinical Practice and Care Planning
> The nursing process
* Nursing process
* Assessment
* Nursing diagnoses and problem identification
* Care planning
* SMART goals
* Nursing interventions
* Evidence-based care
* Evaluation of outcomes
> Person-centred care
* Person-centred care
* Holistic care
* Individualised care
* Shared decision-making
* Patient education
> Prevention and recovery
* Health promotion
* Preventative care
* Rehabilitation
> Transitions and coordination
* Discharge planning
* Continuity of care
* Complex care
* Multidisciplinary care
* Care coordination
> Safe practice
* Risk assessment
* Clinical prioritisation
* Delegation
* Safe escalation
* Patient advocacy
* End-of-life care
8. Infection Prevention and Control
> Microbiology
* Microorganisms
* Bacteria
* Viruses
* Fungi
* Parasites
> How infection spreads
* Transmission routes
* Chain of infection
> Precautions
* Standard precautions
* Hand hygiene
* PPE
* Isolation precautions
* Aseptic technique
> Decontamination
* Sterilisation
* Disinfection
* Cleaning
> Healthcare-associated infections
* Healthcare-associated infections
* MRSA
* Clostridioides difficile
* Bloodborne viruses
* Respiratory infections
* Sepsis recognition
> Antimicrobial resistance
* Antimicrobial resistance
* Antimicrobial stewardship
> Systems and safety
* Outbreak management
* Waste management
* Sharps safety
* Occupational exposure
* Infection surveillance
9. Acute, Emergency and Critical Care Nursing
> Recognising deterioration
* Acute nursing principles
* Recognition of deterioration
* ABCDE assessment
* Early warning scores
* NEWS2
> Critical conditions
* Sepsis
* Shock
* Acute respiratory failure
* Acute cardiac conditions
* Acute neurological conditions
* Chest pain
* Stroke recognition
* Acute kidney injury
> Supporting vital functions
* Fluid resuscitation principles
* Oxygenation and ventilation
> Emergencies and resuscitation
* Emergency escalation
* Cardiac arrest
* Resuscitation
> Critical care
* Critical care fundamentals
* Intensive care
* Postoperative monitoring
> Emergency and major incident care
* Trauma
* Emergency triage
* Major incident response
* Deteriorating patient scenarios
10. Adult Nursing
> Adult assessment and acute care
* Adult health assessment
* Medical nursing
* Surgical nursing
> Systems nursing
* Cardiovascular nursing
* Respiratory nursing
* Neurological nursing
* Gastrointestinal nursing
* Renal nursing
* Endocrine nursing
* Diabetes care
* Oncology nursing
* Haematology nursing
* Musculoskeletal nursing
* Dermatology nursing
* Infection and infectious disease
> Older adults and long-term conditions
* Older adult care
* Frailty
* Rehabilitation
* Long-term conditions
* Multimorbidity
> Palliative and end-of-life care
* Palliative care
* End-of-life care
> Transitions and community care
* Postoperative care
* Discharge planning
* Community adult nursing
> Law, placement and reflection
* Law and professional considerations in adult nursing
* Preparing for an adult nursing placement
* Reflective learning and case studies in adult nursing
11. Children's and Young People's Nursing
> Foundations and development
* Introduction to paediatric nursing
* Child development
* Growth and development
* Developmental assessment
> Family, communication and law
* Family-centred care
* Communication with children
* Consent and parental responsibility
* Safeguarding children
> Paediatric assessment
* Paediatric assessment
* Paediatric vital signs
> Neonatal care
* Neonatal fundamentals
* Prematurity
* Congenital conditions
> Childhood conditions and emergencies
* Paediatric respiratory disease
* Paediatric cardiovascular conditions
* Paediatric neurological conditions
* Paediatric infections
* Paediatric emergencies
* Paediatric medication safety
* Childhood diabetes
* Childhood cancer
> Young people and protection
* Adolescent health
* Mental health in children
* Child protection
* Transition to adult services
> Placement and reflection
* Preparing for a children's nursing placement
* Reflective learning and case studies in children's nursing
12. Mental Health Nursing
> Foundations and assessment
* Foundations of mental health nursing
* Mental health assessment
* Mental state examination
> Therapeutic practice
* Therapeutic relationships
* Communication
* Trauma-informed care
> Mental health conditions
* Depression
* Bipolar disorder
* Anxiety disorders
* OCD
* PTSD
* Psychosis
* Schizophrenia
* Personality disorders
* Eating disorders
* Substance misuse
* Addiction
> Risk and crisis
* Self-harm
* Suicide risk assessment
* Crisis intervention
> Treatment and law
* Psychiatric medication
* Mental Health Act
* Mental Capacity Act
> Safety and recovery
* Safeguarding
* De-escalation
* Recovery-oriented practice
> Settings and populations
* Community mental health
* Inpatient mental health care
* Forensic mental health
* Older adult mental health
> Placement and reflection
* Preparing for a mental health nursing placement
* Reflective learning and case studies in mental health nursing
13. Learning Disability Nursing
> Foundations and conditions
* Foundations of learning disability nursing
* Intellectual disability
* Neurodevelopmental conditions
* Autism
* Down syndrome
> Communication and access
* Communication needs
* Accessible healthcare
* Reasonable adjustments
> Capacity, consent and advocacy
* Mental capacity
* Consent
* Advocacy
> Positive behaviour support
* Positive behavioural support
* Challenging behaviour
> Health and complex needs
* Physical health inequalities
* Epilepsy
* Complex needs
* Safeguarding
> Families, services and inclusion
* Family and carer support
* Community learning disability services
* Hospital care
* Health promotion
* Independent living
* Multidisciplinary care
* Rights and inclusion
> Placement and reflection
* Preparing for a learning disability nursing placement
* Reflective learning and case studies in learning disability nursing
14. Community, Public Health and Health Promotion
> Public health foundations
* Public health foundations
* Social determinants of health
* Health inequalities
* Epidemiology
> Prevention and protection
* Disease prevention
* Health promotion
* Screening
* Vaccination
* Immunisation
> Sexual, reproductive and maternal health
* Sexual health
* Reproductive health
* Maternal health
> Lifestyle and behaviour
* Smoking cessation
* Alcohol and substance use
* Nutrition
* Physical activity
> Community nursing roles
* Community nursing
* District nursing
* School nursing
* Health visiting
> Communities and populations
* Population health
* Infection control in communities
* Health education
* Behaviour change
* Community assessment
15. Older Adult, Palliative and End-of-Life Nursing
> Ageing and frailty
* Ageing physiology
* Frailty
* Falls
> Cognition
* Dementia
* Delirium
> Everyday health needs
* Polypharmacy
* Continence
* Nutrition and hydration
* Pressure injuries
* Mobility
> Care settings and protection
* Rehabilitation
* Care homes
* Safeguarding older people
> Palliative and end-of-life care
* Advanced care planning
* Palliative care
* Symptom management
* Pain management
* End-of-life communication
* Last days of life
> Families, loss and ethics
* Bereavement support
* Family support
* Ethical decision-making
16. Research, Evidence-Based Practice and Nursing Leadership
> Research methods
* Research literacy
* Quantitative research
* Qualitative research
* Mixed methods
* Study design
* Clinical trials
* Cohort studies
* Case-control studies
* Systematic reviews
* Meta-analysis
> Appraisal and ethics
* Critical appraisal
* Research ethics
* Informed consent in research
> Evidence into practice
* Evidence-based practice
* Clinical guidelines
> Quality and safety
* Quality improvement
* Clinical audit
* Patient safety
* Human factors
> Leadership and teams
* Leadership
* Management
* Teamwork
* Delegation
* Supervision
> Governance, policy and digital health
* Service improvement
* Clinical governance
* Risk management
* Healthcare policy
* Digital health
* Health informatics
17. Nursing Law, Ethics and Safeguarding
> Regulation and professional duties
* Professional regulation
* The NMC Code
* Duty of care
> Consent, capacity and mental health law
* Consent
* Mental Capacity Act 2005
* Mental Health Act
> Safeguarding and liberty
* Safeguarding adults
* Safeguarding children
* Deprivation of Liberty Safeguards and relevant reforms
> Rights and equality
* Human rights
* Equality law
> Information law
* Data protection
* Confidentiality
* Information governance
* Record keeping
> Candour, negligence and accountability
* Duty of candour
* Negligence
* Professional accountability
> Incidents and raising concerns
* Clinical incidents
* Raising concerns
* Whistleblowing
> Ethics and boundaries
* Professional boundaries
* Ethical dilemmas
> End-of-life law
* End-of-life law
* Advance decisions
* Best interests
> Fitness to practise
* Professional misconduct
* Regulatory investigations
`;

export const TRACKS = [
  { name: "Professional practice", units: [1, 7, 17, 16], from: "#6a60ff", to: "#b38cff" },
  { name: "The body and its conditions", units: [2, 5], from: "#ff3d6e", to: "#ff9f40" },
  { name: "Assessment and acute care", units: [3, 9], from: "#00b3ff", to: "#40d4b1" },
  { name: "Medicines", units: [4], from: "#16c784", to: "#a0ff74" },
  { name: "Clinical skills and infection prevention", units: [6, 8], from: "#ff5600", to: "#ffc002" },
  { name: "Fields of nursing", units: [10, 11, 12, 13], from: "#f055dd", to: "#4641ff" },
  { name: "Communities and later life", units: [14, 15], from: "#0aa4c9", to: "#7ee0ff" },
];

// The shared core every field builds on (NMC standards of proficiency are common to all fields):
// professional practice, the body, assessment, medicines, conditions, clinical skills, care planning,
// infection prevention, and law and ethics.
export const CORE = [1, 2, 3, 4, 5, 6, 7, 8, 17];

// Paths list schools in study order. `select` limits a shared school to the modules that pathway needs
// (by module title); schools not in `select` are taken whole. Field schools (10–13) are each field's own.
export const PATHS = [
  { id: "adult", field: "Adult", name: "Adult nursing", sub: "The shared core, then adult nursing across medical, surgical and community settings, acute and critical care, older adults and end-of-life care, with field scenarios, placement preparation and reflection.", units: [1, 2, 3, 6, 8, 4, 5, 7, 17, 10, 9, 15, 14, 16] },
  { id: "children", field: "Children's", name: "Children's nursing", sub: "The shared core, then children's and young people's nursing: development, family-centred care, consent and parental responsibility, safeguarding, paediatric assessment, neonates, childhood conditions and medicines safety.", units: [1, 2, 3, 6, 8, 4, 5, 7, 17, 11, 9, 14, 16],
    // pathophysiology foundations from the shared school; childhood conditions are taught in School 11
    select: { 5: ["Disease processes", "Critical illness"], 9: ["Recognising deterioration", "Emergencies and resuscitation", "Supporting vital functions"], 14: ["Prevention and protection", "Community nursing roles", "Sexual, reproductive and maternal health"] } },
  { id: "mental-health", field: "Mental health", name: "Mental health nursing", sub: "The shared core, then mental health nursing: assessment, therapeutic relationships, conditions, risk and crisis, mental health and capacity law, de-escalation and recovery, with physical health care for people with mental illness.", units: [1, 2, 3, 6, 8, 4, 7, 17, 12, 5, 15, 14, 16],
    // physical health care for people with serious mental illness, and later-life mental health
    select: { 5: ["Disease processes", "Cardiovascular conditions", "Endocrine conditions", "Neurological conditions", "Complex and end-of-life care"], 15: ["Cognition"], 14: ["Public health foundations", "Lifestyle and behaviour"] } },
  { id: "learning-disability", field: "Learning disability", name: "Learning disability nursing", sub: "The shared core, then learning disability nursing: communication, reasonable adjustments, capacity and advocacy, positive behaviour support, health inequalities, epilepsy and complex needs, families and inclusion.", units: [1, 2, 3, 6, 8, 4, 7, 17, 13, 5, 14, 16],
    // the conditions and health inequalities most relevant to people with learning disabilities
    select: { 5: ["Disease processes", "Respiratory conditions", "Neurological conditions", "Liver and gastrointestinal conditions", "Complex and end-of-life care"], 14: ["Public health foundations", "Prevention and protection", "Lifestyle and behaviour"] } },
  { id: "year1", name: "Pre-registration year 1 (all fields)", sub: "Professional practice, the body, assessment and core skills: the foundations every field of nursing builds on.", units: [1, 2, 3, 6, 8] },
  { id: "acute", name: "Recognising and responding to deterioration", sub: "Assessment, observations, escalation, acute and critical care, and the conditions behind deterioration.", units: [3, 9, 5, 4] },
  { id: "medicines", name: "Medicines management", sub: "Pharmacology, the administration process, calculations and medicines safety. Education only: you give medicines under your local policy and supervision.", units: [4, 2, 6] },
  { id: "nqn", name: "Newly qualified nurse", sub: "Accountability, delegation, prioritisation, escalation, medicines safety and handover for your first post.", units: [17, 7, 9, 4, 16] },
  { id: "ien", name: "Internationally educated nurses: UK practice", sub: "The NMC Code, UK law and policy across the four nations, assessment conventions and medicines governance in the UK.", units: [1, 17, 3, 4, 7] },
  { id: "na", name: "Nursing associates", sub: "The foundations for nursing associates, within the NMC's standards of proficiency for nursing associates and your local scope.", units: [1, 2, 3, 6, 7, 8] },
  { id: "cpd", name: "CPD and revalidation", sub: "Refresh professional standards, evidence-based practice, leadership and medicines knowledge, and record it as CPD.", units: [1, 16, 4, 5] },
];

// the syllabus as schools, modules and lessons; lesson ids are u01-01 style
export const UNITS = parseSyllabus(SYLLABUS, IDS);
