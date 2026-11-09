// DentalGradify Dentistry: the full curriculum, 12 schools, modelled on the GDC's Preparing for Practice learning
// outcomes and a UK BDS curriculum. Each topic is taught as one lesson, grouped into modules ("> " lines) and stages
// (TRACKS). Lesson ids are permanent (ids.js, written by node scripts/new-course.mjs lock dentistry): never
// renumber, delete or reuse one.
import { parseSyllabus } from "../../course/syllabus.js";
import { IDS, RETIRED } from "./ids.js";
export const SYLLABUS = `
1. Oral and Head and Neck Anatomy
> The skull and jaws
* The skull and facial skeleton
* The maxilla and palate
* The mandible
* The temporomandibular joint
> Muscles and movement
* Muscles of mastication
* Mandibular movements
* Muscles of facial expression
* The tongue and floor of the mouth
> Nerves and vessels
* The trigeminal nerve
* Nerve supply of the teeth and gingivae
* The facial nerve and other cranial nerves in dentistry
* Blood supply and lymphatic drainage of the head and neck
> The oral cavity and its spaces
* The oral cavity: anatomy and landmarks
* The salivary glands
* The pharynx and larynx
* Fascial spaces of the head and neck
2. Teeth: Morphology, Development and Oral Histology
> Naming and describing teeth
* Dental notation systems
* The primary and permanent dentitions
* Permanent incisors and canines
* Permanent premolars
* Permanent molars
* Primary teeth
> Tooth development
* Odontogenesis: from bud to bell
* Amelogenesis and enamel structure
* Dentinogenesis and dentine
* The dental pulp
* Dentine sensitivity and the hydrodynamic theory
* Root formation and cementum
* Eruption and the chronology of the dentition
> Supporting tissues and anomalies
* The periodontal ligament and alveolar bone
* The oral mucosa
* Developmental anomalies of the teeth
3. Oral Physiology, Microbiology and Infection Control
> Oral physiology
* Saliva: secretion and control
* The functions and composition of saliva
* Dry mouth and salivary flow
* Taste and oral sensation
* Mastication and swallowing
> Oral microbiology
* The oral microbiome
* Dental plaque as a biofilm
* Microbiology of caries and periodontal disease
* Oral fungal and viral infections
* Antimicrobials and antimicrobial stewardship in dentistry
> Infection prevention and control
* Standard infection control precautions in dentistry
* Hand hygiene and personal protective equipment
* Decontamination of dental instruments (HTM 01-05)
* Dental unit waterlines
* Sharps injuries and blood-borne viruses
* Healthcare waste in dental practice
4. Dental Caries, Prevention and Dental Public Health
> The caries process
* What dental caries is
* The ecological plaque hypothesis
* Demineralisation and remineralisation
* Diet, sugars and caries
* Caries detection and diagnosis
* Caries risk assessment
* Root caries
> Fluoride and prevention
* How fluoride works
* Fluoride toothpaste, varnish and other vehicles
* Fissure sealants
* Delivering Better Oral Health
* Minimal intervention dentistry
> Dental public health
* Epidemiology of oral disease
* Measuring oral disease: indices
* Oral health inequalities
* Community water fluoridation
* Oral health promotion
* NHS dental services
5. Periodontology
> Periodontal health and disease
* The periodontium in health
* Gingivitis
* Pathogenesis of periodontitis
* Risk factors for periodontitis
* Periodontitis and systemic health
> Diagnosis and classification
* Periodontal examination: BPE and charting
* The 2017 classification of periodontal diseases
* Staging and grading periodontitis
* Necrotising periodontal diseases and periodontal abscess
> Treatment
* Oral hygiene instruction and behaviour change
* Professional mechanical plaque removal
* Non-surgical periodontal therapy
* Adjuncts to periodontal therapy
* Periodontal surgery: an overview
* Supportive periodontal care
* Peri-implant health and disease
6. Oral Pathology and Oral Medicine
> Pathology of teeth and jaws
* Pulpitis and periapical disease
* Odontogenic cysts
* Odontogenic tumours
* Bone diseases of the jaws
* Tooth wear: erosion, attrition and abrasion
> Oral mucosal disease
* Oral ulceration
* Recurrent aphthous stomatitis
* Oral lichen planus
* White and red patches
* Oral potentially malignant disorders
* Oral cancer
* Salivary gland disease
> Oral medicine and the medically complex patient
* Orofacial pain and temporomandibular disorders
* Oral manifestations of systemic disease
* Medical history and the medically complex patient
* Anticoagulants and bleeding risk
* Medication-related osteonecrosis of the jaw
* Medical emergencies in the dental practice
7. Dental Materials
> Materials science basics
* Properties of dental materials
* Biocompatibility of dental materials
* Adhesion to enamel and dentine
> Direct restorative materials
* Dental amalgam
* Resin composites
* Glass ionomer cements
* Resin-modified glass ionomers and compomers
* Dental cements and liners
> Indirect and impression materials
* Impression materials
* Gypsum products
* Dental ceramics
* Dental alloys
* Denture base polymers
* Endodontic materials
* Dental implant materials
8. Dental Radiography and Radiation Protection
> Radiation physics and biology
* Production of X-rays
* Interaction of X-rays with matter
* Biological effects of ionising radiation
* Radiation doses in dentistry
> Law and protection
* IRR17 and IR(ME)R in dentistry
* Justification and optimisation
* Radiation protection in the dental surgery
* Quality assurance in dental radiography
> Techniques and interpretation
* Image receptors: film and digital
* Intraoral techniques: bitewing and periapical
* Occlusal radiographs
* Panoramic radiography
* Cone beam CT
* Selection criteria for dental radiographs
* Radiographic interpretation: caries and periodontal bone
* Radiographic interpretation: periapical and jaw lesions
* Radiographic faults and artefacts
9. Restorative Dentistry: Operative, Endodontics and Prosthodontics
> Assessment and planning
* History, examination and treatment planning
* Consent and shared decision-making in treatment
* Occlusion in restorative dentistry
> Operative dentistry
* Principles of cavity preparation
* Moisture control and rubber dam
* Direct posterior restorations
* Direct anterior restorations
* Managing deep caries and the pulp
* Managing tooth wear
> Endodontics
* Pulp and periapical diagnosis
* Access and canal preparation
* Irrigation and disinfection
* Root canal obturation
* Endodontic outcomes and retreatment
* Dental trauma in adults
> Prosthodontics
* Crowns and onlays
* Fixed bridges
* Complete dentures
* Removable partial dentures
* Dental implants
* Restoring the endodontically treated tooth
10. Paediatric Dentistry and Orthodontics
> Children's oral health
* Child development and behaviour management
* Caries in children
* Pulp therapy in primary teeth
* Dental trauma in children
* Molar–incisor hypomineralisation
* Safeguarding children in dentistry
* Children with additional needs
> Orthodontics
* Growth of the face and jaws
* Development of occlusion
* Classification of malocclusion
* The Index of Orthodontic Treatment Need
* Orthodontic assessment
* Removable and functional appliances
* Fixed appliances and tooth movement
* Retention and stability
* Interceptive orthodontics
* Cleft lip and palate
11. Oral Surgery, Pain and Anxiety Control
> Pain and anxiety control
* Local anaesthetics: pharmacology
* Local anaesthetic techniques
* Complications of local anaesthesia
* Dental anxiety
* Conscious sedation
* General anaesthesia in dentistry
> Oral surgery
* Principles of exodontia
* Surgical removal of teeth
* Third molar surgery
* Complications of extractions
* Odontogenic infections and their management
* Antibiotic prescribing in dentistry
* Analgesia for dental pain
* Maxillofacial trauma: an introduction
* Referral pathways and urgent dental care
12. Professionalism, Ethics and Law
> Professionalism
* The GDC and its Standards for the Dental Team
* The dental team and scope of practice
* Communication and consent
* Mental capacity and consent
* Raising concerns and the duty of candour
* Fitness to practise
> Practice, law and governance
* Record keeping and data protection
* Complaints
* Clinical governance and audit
* Evidence-based dentistry
* Safeguarding adults
* Equality, diversity and inclusion
* Health and safety in dental practice
* Continuing professional development
* Ethics in dental practice
`;

export const TRACKS = [
  { name: "Stage 1 · Biomedical foundations", units: [1, 2, 3], from: "#40d4b1", to: "#22d3ee" },
  { name: "Stage 2 · Oral disease and prevention", units: [4, 5, 6], from: "#34d399", to: "#40d4b1" },
  { name: "Stage 3 · Clinical sciences", units: [7, 8], from: "#2dd4bf", to: "#38bdf8" },
  { name: "Stage 4 · Clinical dentistry and practice", units: [9, 10, 11, 12], from: "#40d4b1", to: "#818cf8" },
];

export const PATHS = [
  { id: "bds", name: "The BDS core", sub: "Every school in order, from anatomy to professional practice, following the GDC's Preparing for Practice outcomes.", units: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  { id: "year1", name: "BDS year 1", sub: "The biomedical foundations: anatomy, teeth and their tissues, oral physiology, microbiology and infection control.", units: [1, 2, 3] },
  { id: "dcp", name: "Hygiene and therapy", sub: "The core for dental hygienists and therapists: tissues, prevention, caries, periodontology, radiography and professionalism.", units: [2, 3, 4, 5, 8, 12] },
  { id: "clinic", name: "Before your first clinic", sub: "Infection control, radiation protection, pain control, the medically complex patient and the GDC Standards.", units: [3, 8, 11, 6, 12] },
  { id: "restorative", name: "Restorative and materials", sub: "Caries, materials, operative dentistry, endodontics and prosthodontics.", units: [4, 7, 9] },
];

// one line per school for the overview page
export const BLURBS = {
  1: "The skull, jaws, TMJ, muscles, nerves, vessels and spaces of the head and neck that every dental procedure depends on.",
  2: "Naming and describing every tooth, how teeth and their tissues develop, and the histology of enamel, dentine, pulp, periodontium and mucosa.",
  3: "Saliva, taste and swallowing, the oral microbiome and biofilm, and infection prevention and control under HTM 01-05.",
  4: "How caries starts and stops, fluoride and Delivering Better Oral Health, and the epidemiology and inequalities of oral disease.",
  5: "The periodontium in health and disease, the 2017 classification, BPE, staging and grading, and periodontal therapy.",
  6: "Pulpal and jaw pathology, mucosal disease and oral cancer, orofacial pain and caring for the medically complex patient.",
  7: "The science of the materials dentists place: amalgam, composites, glass ionomers, cements, impressions, ceramics and alloys.",
  8: "X-ray physics and biology, IRR17 and IR(ME)R, selection criteria, techniques, CBCT and radiographic interpretation.",
  9: "Treatment planning, operative dentistry, endodontics, crowns, bridges, dentures and implants.",
  10: "Children's oral health, behaviour management, trauma and safeguarding, and orthodontics from growth to retention.",
  11: "Local anaesthesia, anxiety and sedation, extractions and surgery, infections, antibiotics and urgent care.",
  12: "The GDC Standards, consent and capacity, candour, records, complaints, governance and ethics in dental practice.",
};

export const UNITS = parseSyllabus(SYLLABUS, IDS, RETIRED);
