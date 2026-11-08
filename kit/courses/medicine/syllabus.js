// MedGradify Medicine: the full curriculum of an undergraduate medical degree in 12 schools, modelled on the GMC's
// Outcomes for graduates (2018) and the MLA content map (the areas of clinical practice, professional knowledge and
// capabilities tested by the UK Medical Licensing Assessment). Each topic is taught as one lesson, grouped into
// modules ("> " lines) and stages (TRACKS). Lesson ids are permanent (ids.js, written by
// node scripts/new-course.mjs lock medicine): never renumber, delete or reuse one.
import { parseSyllabus } from "../../course/syllabus.js";
import { IDS, RETIRED } from "./ids.js";
export const SYLLABUS = `
1. Foundations of Medical Science
> Cells and homeostasis
* Cell structure and function in health
* Membranes, transport and the resting potential
* Homeostasis and negative feedback
* Body fluids, osmolality and electrolytes
* Acid–base physiology
> Pathological processes
* Cell injury, adaptation and death
* Acute inflammation
* Chronic inflammation and repair
* Thrombosis, embolism and infarction
* Neoplasia: benign and malignant tumours
* The hallmarks and genetics of cancer
> Immunity and genetics
* Innate immunity
* Adaptive immunity
* Hypersensitivity and autoimmunity
* Patterns of inheritance in clinical genetics
> Principles of pharmacology
* Pharmacodynamics: receptors and dose–response
* Pharmacokinetics: absorption, distribution, metabolism and excretion
2. Clinical Method and Reasoning
> The consultation
* The medical history
* Consultation models and patient-centred care
* Communicating risk and shared decision-making
* Breaking bad news
> Examination
* Principles of physical examination
* Vital signs and the early warning score (NEWS2)
* The cardiovascular examination
* The respiratory examination
* The abdominal examination
* The neurological examination
> Investigation and reasoning
* Clinical reasoning and diagnostic error
* Interpreting tests: sensitivity, specificity and predictive values
* Interpreting a full blood count and electrolytes
* Arterial blood gas interpretation
* The 12-lead ECG: a systematic approach
* Chest X-ray interpretation
* Presenting a patient and documenting care
3. Cardiovascular Medicine
> Cardiovascular science
* The cardiac cycle and cardiac output
* Cardiac electrophysiology and conduction
* Blood pressure regulation
> Atherosclerosis and coronary disease
* Atherosclerosis and cardiovascular risk
* Stable angina
* Acute coronary syndromes
* Secondary prevention after myocardial infarction
> Heart failure and structural disease
* Heart failure: causes and classification
* Managing chronic heart failure
* Valvular heart disease
* Infective endocarditis
* Cardiomyopathies and pericardial disease
> Rhythm and vascular disease
* Atrial fibrillation
* Bradyarrhythmias and heart block
* Tachyarrhythmias
* Hypertension
* Peripheral arterial disease and aortic aneurysm
* Venous thromboembolism
4. Respiratory Medicine
> Respiratory science
* Ventilation, gas exchange and oxygen transport
* Lung function tests
* Respiratory failure: type 1 and type 2
> Airways disease
* Asthma
* Chronic obstructive pulmonary disease (COPD)
* Bronchiectasis and cystic fibrosis
> Infection and the pleura
* Community-acquired pneumonia
* Tuberculosis
* Pleural effusion
* Pneumothorax
> Interstitial, vascular and malignant disease
* Interstitial lung disease
* Sarcoidosis
* Pulmonary embolism
* Pulmonary hypertension
* Lung cancer
* Obstructive sleep apnoea
5. Gastroenterology and Hepatology
> The gut and nutrition
* Digestion and absorption
* Nutrition, malnutrition and refeeding
* Dysphagia and oesophageal disease
* Gastro-oesophageal reflux disease
* Peptic ulcer disease and Helicobacter pylori
* Upper gastrointestinal bleeding
> Small and large bowel
* Coeliac disease
* Inflammatory bowel disease
* Irritable bowel syndrome
* Diarrhoea and gastroenteritis
* Colorectal cancer and screening
* Diverticular disease
> Liver, biliary tree and pancreas
* Liver function tests and jaundice
* Viral hepatitis
* Alcohol-related and metabolic liver disease
* Cirrhosis and its complications
* Gallstone disease
* Acute and chronic pancreatitis
6. Renal, Endocrine and Metabolic Medicine
> The kidney
* Renal physiology and glomerular filtration
* Acute kidney injury
* Chronic kidney disease
* Glomerulonephritis and nephrotic syndrome
* Urinary tract infection
* Hyperkalaemia and hyponatraemia
> Diabetes
* Type 1 diabetes
* Type 2 diabetes
* Diabetic ketoacidosis and hyperosmolar hyperglycaemic state
* Hypoglycaemia
* Complications of diabetes
> Endocrine disease
* The hypothalamus and pituitary
* Hypothyroidism
* Hyperthyroidism
* Adrenal insufficiency
* Cushing's syndrome
* Primary hyperaldosteronism and phaeochromocytoma
* Calcium disorders and the parathyroid glands
* Osteoporosis and metabolic bone disease
* Lipid disorders
7. Neurology and Psychiatry
> Neurological disease
* Headache
* Stroke and transient ischaemic attack
* Epilepsy and seizures
* Multiple sclerosis
* Parkinson's disease and movement disorders
* Dementia
* Motor neurone disease
* Peripheral neuropathy
* Myasthenia gravis and muscle disease
* Meningitis and encephalitis
* Spinal cord compression and cauda equina syndrome
* Raised intracranial pressure and head injury
> Psychiatry
* The psychiatric assessment and mental state examination
* Depression
* Bipolar affective disorder
* Anxiety disorders and obsessive-compulsive disorder
* Schizophrenia and psychosis
* Self-harm and suicide risk assessment
* Eating disorders
* Alcohol and substance misuse
* Personality disorders
* Delirium
* Psychiatry of childhood and adolescence
* Mental health law in the UK
8. Infection, Haematology and Oncology
> Infection
* Principles of microbiology
* Antimicrobial therapy and stewardship
* Sepsis
* Fever in the returning traveller
* HIV infection
* Healthcare-associated infection and infection control
* Vaccination and immunisation
> Haematology
* Anaemia
* Haemoglobinopathies: sickle cell disease and thalassaemia
* Haemostasis and bleeding disorders
* Anticoagulation
* Blood transfusion
* Leukaemia
* Lymphoma
* Myeloma
* Myeloproliferative neoplasms
> Oncology
* Principles of cancer staging and treatment
* Systemic anticancer therapy and its toxicities
* Oncological emergencies
* Cancer screening programmes
9. Musculoskeletal, Skin and the Special Senses
> Musculoskeletal and rheumatology
* Osteoarthritis
* Rheumatoid arthritis
* Gout and pseudogout
* Seronegative spondyloarthropathies
* Systemic lupus erythematosus and connective tissue disease
* Vasculitis and polymyalgia rheumatica
* Septic arthritis and osteomyelitis
* Back pain
* Fractures and orthopaedic trauma
> Dermatology
* Describing skin lesions
* Eczema and psoriasis
* Skin cancer
* Skin infections and infestations
* Urticaria and drug reactions
> Eyes and ENT
* The red eye
* Sudden loss of vision
* Glaucoma, cataract and diabetic eye disease
* Hearing loss and tinnitus
* Vertigo
* Ear, nose and throat infections
* Head and neck cancer
10. Acute, Surgical and Palliative Care
> Acute and emergency medicine
* The ABCDE assessment of the acutely ill patient
* Shock
* Anaphylaxis
* Cardiac arrest and advanced life support
* Poisoning and overdose
* Major trauma
* Burns
> Surgery and perioperative care
* The acute abdomen
* Appendicitis
* Bowel obstruction
* Hernias
* Preoperative assessment
* Anaesthesia and airway management
* Postoperative complications
* Fluid prescribing
* Urological emergencies and urinary retention
* Breast disease
> Older people and end of life
* Frailty and comprehensive geriatric assessment
* Falls
* Palliative care and symptom control
* Care in the last days of life
11. Obstetrics, Gynaecology and Paediatrics
> Obstetrics
* Normal pregnancy and antenatal care
* Bleeding in early pregnancy
* Hypertensive disorders of pregnancy
* Diabetes in pregnancy
* Labour and delivery
* Obstetric emergencies
* The postnatal period and perinatal mental health
> Gynaecology and sexual health
* The menstrual cycle and its disorders
* Contraception
* Subfertility
* The menopause
* Gynaecological cancers
* Sexually transmitted infections
> Paediatrics
* Child development and the developmental assessment
* The sick child
* The newborn
* Respiratory illness in children
* Childhood infections and immunisation
* Growth and nutrition in children
* Congenital heart disease
* Safeguarding children
* Common paediatric emergencies
12. Professional Practice, Prescribing and Population Health
> Professional values
* Good medical practice and professionalism
* Medical ethics: principles and frameworks
* Consent and capacity
* Confidentiality and information governance
* Raising concerns and the duty of candour
> Safe prescribing
* Writing a safe prescription
* Adverse drug reactions and interactions
* Prescribing in renal and hepatic impairment
* Prescribing in pregnancy, children and older people
* Therapeutic drug monitoring
> Safety and quality
* Patient safety and human factors
* Clinical governance and audit
* Teamwork, handover and leadership
> Population health and evidence
* Epidemiology: measures of disease frequency and association
* Study design and critical appraisal
* Evidence-based medicine
* Screening: principles and criteria
* Health inequalities and the social determinants of health
* Health promotion and behaviour change
* The NHS and the organisation of healthcare
`;

// stages on the map; MedGradify's colours run from indigo to cyan
export const TRACKS = [
  { name: "Stage 1 · Foundations of medicine", units: [1, 2, 12], from: "#4641ff", to: "#6366f1" },
  { name: "Stage 2 · The body systems", units: [3, 4, 5, 6], from: "#6366f1", to: "#3b82f6" },
  { name: "Stage 3 · Brain, blood and defence", units: [7, 8, 9], from: "#3b82f6", to: "#0ea5e9" },
  { name: "Stage 4 · Acute care and the life course", units: [10, 11], from: "#0ea5e9", to: "#22d3ee" },
];

export const PATHS = [
  { id: "preclinical", name: "Preclinical years", sub: "The science that underpins clinical medicine and the core clinical skills of the consultation and examination.", units: [1, 2, 3, 4, 5, 6] },
  { id: "ukmla", name: "UKMLA preparation", sub: "Every area of the MLA content map: the clinical schools, acute care and professional knowledge. Revision, not a substitute for your school's teaching.", units: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  { id: "acute", name: "Acute and emergency medicine", sub: "Recognising and managing the acutely unwell patient: ABCDE, NEWS2, sepsis, shock, arrests and the emergencies of each system.", units: [2, 10, 3, 4, 8] },
  { id: "general-practice", name: "General practice and long-term conditions", sub: "The conditions managed mostly in primary care: hypertension, diabetes, asthma and COPD, mental health, children and prevention.", units: [2, 6, 4, 7, 11, 12] },
  { id: "prescribing", name: "Prescribing safely", sub: "Pharmacology, therapeutics and the prescribing skills assessed in the Prescribing Safety Assessment. Education, not prescribing advice.", units: [1, 12, 8, 10] },
];

// one line per school for the overview page
export const BLURBS = {
  1: "The cell biology, physiology, pathology, immunology, genetics and pharmacology that clinical medicine is built on.",
  2: "Taking a history, examining patients, reasoning to a diagnosis and interpreting the first-line tests.",
  3: "The heart and circulation in health and disease: coronary disease, heart failure, rhythm, valves and vessels.",
  4: "Breathing and gas exchange, airways disease, infection, the pleura, the interstitium and lung cancer.",
  5: "The gut, liver, biliary tree and pancreas, from nutrition and reflux to bleeding, IBD and cirrhosis.",
  6: "The kidney, diabetes and the endocrine glands: filtration, electrolytes, hormones, bone and lipids.",
  7: "The nervous system and mental health: stroke, seizures, neurodegeneration, mood, psychosis, risk and the law.",
  8: "Microbes and antimicrobials, sepsis, HIV, the blood and its cancers, anticoagulation and oncology.",
  9: "Joints, bones and connective tissue, the skin, the eye and the ear, nose and throat.",
  10: "The acutely ill patient, emergencies, surgery and anaesthesia, frailty and care at the end of life.",
  11: "Pregnancy and birth, gynaecology and sexual health, and the medicine of children.",
  12: "Professional values, ethics and law, safe prescribing, patient safety, evidence and population health.",
};

export const UNITS = parseSyllabus(SYLLABUS, IDS, RETIRED);
