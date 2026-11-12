// VetGradify Veterinary Science: the full curriculum, 12 schools, modelled on the RCVS Day One Competences and the
// preclinical and clinical years of a UK veterinary degree (BVSc/BVetMed/BVMS). Each topic is taught as one lesson,
// grouped into modules ("> " lines) and stages (TRACKS). Lesson ids are permanent (ids.js, written by
// node scripts/new-course.mjs lock veterinary): never renumber, delete or reuse one.
import { parseSyllabus } from "../../course/syllabus.js";
import { IDS, RETIRED } from "./ids.js";
export const SYLLABUS = `
1. Comparative Anatomy
> Principles of anatomy
* Anatomical terms of position and direction
* The skeleton and joints compared
* Muscles, tendons and fascia
> The locomotor system
* The thoracic limb of the dog and cat
* The equine distal limb and hoof
* The pelvic limb and the equine stay apparatus
* The bovine foot and claw
* The vertebral column and spinal cord
> Head and nervous system
* The skull, teeth and dental formulae
* The brain and cranial nerves
> Thorax, abdomen and pelvis
* The thorax, heart and lungs
* The carnivore digestive tract
* The equine digestive tract
* The ruminant stomach
* The urinary system
* Male and female reproductive anatomy
> Birds and the integument
* Avian anatomy
* Skin, hoof, horn and the mammary gland
2. Veterinary Physiology
> Cells, nerves and muscle
* Homeostasis and body fluids
* Membrane potentials and nerve conduction
* The neuromuscular junction and muscle contraction
* The autonomic nervous system
> Cardiovascular and respiratory physiology
* The cardiac cycle
* Blood pressure and its control
* Blood: cells, clotting and blood groups in animals
* Respiration and gas exchange
* Avian respiration
> Digestion and energy
* Rumen fermentation and volatile fatty acids
* Monogastric and hindgut digestion
* Thermoregulation
> Kidney, endocrine and reproduction
* Renal function and urine concentration
* Acid–base balance
* The hypothalamus and pituitary
* Thyroid, adrenal and endocrine pancreas
* Reproductive cycles in domestic species
* Pregnancy, parturition and lactation
3. Biochemistry, Cell Biology and Genetics
> Cells and molecules
* The animal cell and its organelles
* Proteins and enzymes
* Carbohydrate metabolism
* Lipid metabolism and ketogenesis
* Protein and nitrogen metabolism
* Energy metabolism in the ruminant
* Minerals, trace elements and vitamins
> Genetics
* DNA, genes and gene expression
* Mendelian inheritance in domestic animals
* Sex-linked and polygenic traits
* Inherited diseases and breed health schemes
* Genetic testing in animals
* Population genetics and inbreeding
* Animal breeding and selection
> Development
* Embryology and organogenesis
* Congenital abnormalities
4. Animal Husbandry, Nutrition and Welfare
> Animal welfare
* What animal welfare means
* The Five Freedoms and the Five Domains
* The Animal Welfare Act 2006
* Assessing welfare in practice
* Behaviour and its role in welfare
* Pain recognition and scoring
> Husbandry
* Husbandry of dogs and cats
* Husbandry of horses
* Dairy and beef cattle systems
* Sheep and pig systems
* Poultry systems
* Rabbits, small mammals and exotic pets
* Biosecurity on farm
> Nutrition
* Principles of animal nutrition
* Feeding dogs and cats
* Feeding horses
* Ruminant nutrition and rationing
* Body condition scoring
* Welfare at transport and slaughter
5. Veterinary Pathology
> General pathology
* Cell injury and cell death
* Acute inflammation
* Chronic inflammation and repair
* Disturbances of circulation
* Disorders of growth
* Neoplasia: principles
* Tumour classification and grading
> Systemic pathology
* Pathology of the cardiovascular system
* Pathology of the respiratory system
* Pathology of the alimentary system
* Pathology of the liver and pancreas
* Pathology of the urinary system
* Pathology of the skin
* Pathology of the nervous system
> Diagnostic pathology
* The post-mortem examination
* Cytology and histopathology
* Clinical pathology: haematology
* Clinical pathology: biochemistry
6. Microbiology, Parasitology and Immunology
> Microbiology
* Bacteria of veterinary importance
* Viruses of veterinary importance
* Fungi and prions
* Antimicrobial resistance
* Disinfection and sterilisation
> Parasitology
* Nematodes of domestic animals
* Cestodes and trematodes
* Ectoparasites: fleas, lice, mites and ticks
* Protozoa
* Parasite control and anthelmintic resistance
> Immunology
* Innate immunity
* Adaptive immunity
* Antibodies and the humoral response
* Hypersensitivity and autoimmunity
* Maternally derived immunity and colostrum
* Principles of vaccination
* Vaccination of companion animals
* Vaccination of farm animals and horses
7. Veterinary Pharmacology and Therapeutics
> Principles
* Pharmacokinetics
* Pharmacodynamics
* Species differences in drug handling
* Adverse drug reactions and pharmacovigilance
> Regulation and prescribing
* The Veterinary Medicines Regulations
* The prescribing cascade
* Prescription categories and controlled drugs
* Withdrawal periods and food-producing animals
* Responsible use of antimicrobials
> Drug classes
* Antimicrobials
* Antiparasitic drugs
* Non-steroidal anti-inflammatory drugs
* Corticosteroids
* Opioids and analgesia
* Sedatives and anaesthetic agents
* Cardiovascular drugs
* Drugs acting on the gut
* Drug calculations: principles
8. Clinical Method and Reasoning
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
9. Small Animal Medicine and Surgery
> Medicine
* Vomiting and diarrhoea in dogs and cats
* Cardiac disease in dogs and cats
* Respiratory disease in dogs and cats
* Chronic kidney disease
* Diabetes mellitus
* Hyperthyroidism and hypothyroidism
* Hyperadrenocorticism and hypoadrenocorticism
* Skin and ear disease
* Infectious diseases of dogs and cats
* Seizures and neurological disease
* Common poisonings
* Oncology in practice
> Surgery
* Neutering
* Gastric dilatation and volvulus
* Intestinal foreign bodies
* Fracture management principles
* Cruciate ligament disease
* Hip and elbow dysplasia
* Dental disease
> Exotics
* Rabbit medicine
* Reptiles and birds in practice
10. Equine Practice
> Medicine
* Colic
* Equine respiratory disease
* Equine infectious and notifiable diseases
* Laminitis and equine metabolic syndrome
* Pituitary pars intermedia dysfunction
* Equine skin disease
> Lameness and surgery
* Lameness diagnosis in the horse
* Diagnostic analgesia
* Common causes of lameness
* Wounds and synovial sepsis
* Castration in the horse
> Stud medicine and the foal
* Equine reproduction
* The neonatal foal
* Equine dentistry
* Equine passports and medicines records
11. Farm Animal Practice and Herd Health
> Cattle
* Mastitis
* Lameness in cattle
* Metabolic disease of dairy cows
* Calf health and the colostrum
* Bovine respiratory disease
* Bovine tuberculosis
* Bovine viral diarrhoea and Johne's disease
* Fertility and herd health planning
> Sheep and goats
* Sheep health planning
* Lambing and neonatal lamb losses
* Sheep scab, fly strike and lameness
* Goat medicine
> Pigs and poultry
* Pig health and production
* Poultry health and avian influenza
* Notifiable diseases of livestock
12. Veterinary Public Health and Professional Practice
> Public health
* One Health
* Zoonoses
* Food safety and meat inspection
* Notifiable diseases and disease control
* Surveillance and the role of APHA
* Epidemiology for veterinarians
> Professional practice
* The RCVS and the regulation of the profession
* The RCVS Code of Professional Conduct
* Consent and communication with clients
* Clinical records and confidentiality
* Certification
* Animal welfare and the law
* Working with veterinary nurses and the wider team
* Clinical governance and evidence-based veterinary medicine
* Wellbeing and professional life
* The Day One Competences
`;

export const TRACKS = [
  { name: "Stage 1 · Preclinical foundations", units: [1, 2, 3], from: "#4fb884", to: "#22d3ee" },
  { name: "Stage 2 · Animals, welfare and disease", units: [4, 5, 6], from: "#22d3ee", to: "#60a5fa" },
  { name: "Stage 3 · Clinical foundations", units: [7, 8], from: "#60a5fa", to: "#a78bfa" },
  { name: "Stage 4 · Clinical practice and the profession", units: [9, 10, 11, 12], from: "#a78bfa", to: "#4fb884" },
];

export const PATHS = [
  { id: "core", name: "The whole degree", sub: "Every school in order, preclinical to clinical, as a UK veterinary degree runs.", units: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  { id: "preclinical", name: "Preclinical sciences", sub: "Anatomy, physiology, biochemistry, pathology and infection: the science behind the clinic.", units: [1, 2, 3, 5, 6] },
  { id: "small-animal", name: "Companion animal practice", sub: "From the dog and cat's anatomy to small-animal medicine, surgery and the profession.", units: [1, 2, 7, 8, 9, 12] },
  { id: "farm-equine", name: "Farm and equine practice", sub: "Husbandry, welfare, herd health, the horse and public health.", units: [4, 6, 10, 11, 12] },
  { id: "vet-nursing", name: "For veterinary nurses and support staff", sub: "Welfare, anatomy, physiology, pharmacology principles, clinical examination and the team.", units: [1, 2, 4, 7, 8] },
];

// one line per school for the overview page
export const BLURBS = {
  1: "The body of the dog, cat, horse, ruminant, pig and bird compared: terms, skeleton, limbs, viscera and integument.",
  2: "How animal bodies work: nerves and muscle, heart and lungs, rumen and gut, kidney, hormones and reproduction.",
  3: "Cells, metabolism (including the ruminant's), vitamins and minerals, inheritance, breed health schemes and embryology.",
  4: "Welfare science and law, the Five Domains, pain, husbandry of every species, nutrition and biosecurity.",
  5: "How disease changes tissues: inflammation, repair, circulation, neoplasia, systemic pathology and the post-mortem.",
  6: "Bacteria, viruses, parasites and the immune system, antimicrobial resistance and the principles of vaccination.",
  7: "How drugs work and how they are regulated in UK practice: the cascade, withdrawal periods and the main drug classes.",
  8: "Taking a history, examining patients, reasoning to a diagnosis and interpreting the first-line tests.",
  9: "Common medical and surgical problems of dogs, cats, rabbits and exotics, as met in first-opinion practice.",
  10: "Colic, lameness, laminitis, respiratory and infectious disease, stud medicine, the foal and equine records.",
  11: "Herd and flock health: mastitis, lameness, metabolic disease, fertility, TB, sheep, pigs and poultry.",
  12: "One Health, zoonoses, food safety, notifiable disease, the RCVS Code, consent, certification and the Day One Competences.",
};

export const UNITS = parseSyllabus(SYLLABUS, IDS, RETIRED);
