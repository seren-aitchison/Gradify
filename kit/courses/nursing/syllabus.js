// NurseGradify: the nursing curriculum as schools and lessons. Each "* topic" becomes a lesson on the
// school's path; its notes are in notes/uNN.js (format: kit/course/notes.js). The course engine calls
// a school a "unit" internally (ids u01…); the pages say "School".
// Framework: UK nursing education and the NMC's standards, which apply UK-wide. Laws, policies and
// health services that differ between England, Scotland, Wales and Northern Ireland are labelled.
// Clinical skills are taught as education only: supervised practice, local policy and scope come first.
// School 6 onwards (Core Nursing Procedures and Clinical Skills, …) is still to be added: the brief
// that listed them was cut off at School 6.
export const SYLLABUS = `
1. Foundations of Nursing and Professional Practice
* Introduction to nursing
* History and development of nursing
* The nursing profession
* Professional identity
* The NMC and professional regulation
* The NMC Code
* The seven NMC platforms
* Professional accountability
* Duty of care
* Duty of candour
* Consent
* Capacity
* Confidentiality
* Data protection
* Documentation
* Record keeping
* Professional boundaries
* Delegation
* Scope of practice
* Clinical supervision
* Reflective practice
* Evidence-based practice
* Equality, diversity and inclusion
* Human rights
* Safeguarding
* Professional resilience
* Patient advocacy
* Ethical decision-making
* Multidisciplinary working
* Continuing professional development
2. Human Anatomy and Physiology
* Anatomical terminology
* Cells and tissues
* Homeostasis
* The integumentary system
* Skeletal system
* Muscular system
* Nervous system
* Brain and spinal cord
* Autonomic nervous system
* Cardiovascular system
* Blood and circulation
* Respiratory system
* Gas exchange
* Digestive system
* Liver and pancreas
* Renal system
* Urinary system
* Endocrine system
* Reproductive system
* Immune system
* Lymphatic system
* Fluid balance
* Electrolytes
* Acid-base balance
* Temperature regulation
* Pain physiology
* Age-related physiological changes
* Cellular pathology
* Microbiology
* Genetics and genomics
3. Health Assessment and Clinical Reasoning
* Introduction to clinical assessment
* Person-centred assessment
* History taking
* Subjective and objective data
* Physical assessment
* General inspection
* Vital signs
* Temperature
* Pulse
* Respiratory rate
* Blood pressure
* Oxygen saturation
* Pain assessment
* Neurological observations
* Cardiovascular assessment
* Respiratory assessment
* Abdominal assessment
* Skin assessment
* Hydration assessment
* Nutritional assessment
* Mental state examination
* Mobility assessment
* Falls assessment
* Pressure ulcer risk assessment
* Clinical reasoning
* Differential considerations
* Recognising deterioration
* Escalation of concerns
* Structured handover
* Documentation and reassessment
4. Pharmacology and Medicines Management
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
* Medication reconciliation
* Medicines legislation
* Prescribing and administration responsibilities
* The medicines administration process
* The rights of medicines administration
* Oral medication
* Topical medication
* Inhaled medication
* Injectable medication
* Intravenous medication principles
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
* Polypharmacy
* Medicines safety
* Medication errors
* Patient education
* Medicines optimisation
* Antimicrobial stewardship
5. Pathophysiology and Clinical Conditions
* Introduction to disease processes
* Inflammation
* Infection
* Immune dysfunction
* Cardiovascular disease
* Hypertension
* Heart failure
* Ischaemic heart disease
* Myocardial infarction
* Arrhythmias
* Stroke
* Respiratory disease
* Asthma
* COPD
* Pneumonia
* Pulmonary embolism
* Diabetes
* Thyroid disease
* Renal disease
* Acute kidney injury
* Chronic kidney disease
* Liver disease
* Gastrointestinal disorders
* Neurological disorders
* Epilepsy
* Dementia
* Parkinson's disease
* Cancer
* Haematological disorders
* Musculoskeletal disease
* Rheumatological conditions
* Skin conditions
* Sepsis
* Shock
* Multimorbidity
* Frailty
* Palliative and end-of-life conditions
`;

export const TRACKS = [
  { name: "Professional practice", units: [1], from: "#6a60ff", to: "#b38cff" },
  { name: "The body", units: [2], from: "#ff3d6e", to: "#ff9f40" },
  { name: "Assessment and reasoning", units: [3], from: "#00b3ff", to: "#40d4b1" },
  { name: "Medicines", units: [4], from: "#16c784", to: "#a0ff74" },
  { name: "Conditions", units: [5], from: "#ff5600", to: "#ffc002" },
];

export const PATHS = [
  { id: "year1", name: "Pre-registration year 1", sub: "Professional practice, the body and how to assess a person: the foundations every field of nursing builds on.", units: [1, 2, 3] },
  { id: "acute", name: "Recognising and responding to deterioration", sub: "Assessment, observations, escalation and the conditions behind them, from sepsis to heart failure.", units: [3, 5, 4] },
  { id: "medicines", name: "Medicines management", sub: "Pharmacology, the administration process, calculations and medicines safety. Education only: you give medicines under your local policy and supervision.", units: [4, 2] },
  { id: "nqn", name: "Newly qualified nurse", sub: "Accountability, delegation, escalation, medicines safety and handover for your first post.", units: [1, 3, 4] },
  { id: "ien", name: "Internationally educated nurses: UK practice", sub: "The NMC Code, UK law and policy across the four nations, assessment conventions and medicines governance in the UK.", units: [1, 3, 4] },
  { id: "na", name: "Nursing associates", sub: "The foundations for nursing associates, within the NMC's standards of proficiency for nursing associates and your local scope.", units: [1, 2, 3] },
  { id: "cpd", name: "CPD and revalidation", sub: "Refresh professional standards, assessment and medicines knowledge, and record it as CPD.", units: [1, 4, 5] },
];

export const UNITS = SYLLABUS.trim().split(/\n(?=\d+\. )/).map((block) => {
  const [head, ...rest] = block.split("\n");
  const n = Number(head.match(/^(\d+)\./)[1]), id = `u${String(n).padStart(2, "0")}`;
  return { n, id, title: head.replace(/^\d+\.\s*/, ""), lessons: rest.filter((l) => l.startsWith("* ")).map((l, i) => ({ id: `${id}-${String(i + 1).padStart(2, "0")}`, title: l.slice(2).trim() })) };
});
