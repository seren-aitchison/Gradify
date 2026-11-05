// School 14: Oncology, Haematology and Immunology. UK, as at 2026.
// Format: kit/course/notes.js. Standard: docs/CURRICULUM_CONTENT_STANDARD.md
// EDUCATION ONLY. Cancer, haematology and immunology treatments are specialist: follow protocols, the BNF,
// SPCs and local guidance. Any dose is illustrative.
export default `
## Anaemias
S: Anaemia is common and has many causes, from iron deficiency to B12 and folate deficiency and chronic disease. Identifying the type guides treatment, and medicines can both cause and treat it.
O: Classify anaemias and describe their causes
O: Manage iron, B12 and folate deficiency
T: Microcytic anaemia | Anaemia with small red cells, most often caused by iron deficiency
T: Macrocytic anaemia | Anaemia with large red cells, often caused by B12 or folate deficiency, alcohol or some medicines
H: Types and treatment
- **Iron deficiency**: oral iron (such as ferrous sulfate) once daily or on alternate days, which may improve absorption and tolerance; continue for 3 months after haemoglobin normalises; IV iron if oral fails or isn't tolerated.
- **B12 deficiency**: hydroxocobalamin injections for pernicious anaemia; oral B12 for dietary causes; urgent treatment if neurological symptoms.
- **Folate deficiency**: folic acid after B12 deficiency is excluded (folic acid alone can worsen B12 neurological damage).
- **Anaemia of chronic disease and CKD**: treat the cause; erythropoiesis-stimulating agents in CKD.
H: Causes, counselling and referral
- Iron deficiency in men and postmenopausal women needs investigation for gastrointestinal blood loss (possible cancer).
- Medicines: NSAIDs and anticoagulants (bleeding), PPIs and metformin (B12), methotrexate and trimethoprim (folate), and haemolysis with some drugs.
- Iron counselling: dark stools, constipation or diarrhoea, nausea; separate from antacids, tetracyclines, quinolones and levothyroxine; keep out of children's reach (overdose is dangerous).
- Check doses with the BNF.
K: Classify anaemia by cell size; replace iron, B12 or folate correctly; investigate unexplained iron deficiency; counsel on iron interactions.
!: Giving folic acid alone to someone with undiagnosed B12 deficiency.
Q: What is the most common cause of microcytic anaemia? | Iron deficiency.
Q: Why must B12 deficiency be excluded before folic acid? | Folic acid alone can worsen B12-related nerve damage.
SUM: Anaemia type guides investigation and treatment.
SUM: Medicines can cause anaemia and interact with iron.
SRC: NICE CKS, Anaemia: iron deficiency | guidance | 2024 | https://cks.nice.org.uk/topics/anaemia-iron-deficiency/
SRC: NICE NG239, Vitamin B12 deficiency in over 16s: diagnosis and management | guidance | 2024 | https://www.nice.org.uk/guidance/ng239
M1#pharmacy-u14-01-q1@1: What type of anaemia is typical of iron deficiency? | Microcytic | Macrocytic | Haemolytic only | Aplastic | Sickle cell | Iron deficiency produces small red cells.
M2#pharmacy-u14-01-q2@2: Which medicine can cause B12 deficiency with long-term use? | Metformin | Paracetamol | Amoxicillin | Salbutamol | Emollients | Metformin reduces B12 absorption over time.
M3#pharmacy-u14-01-q3@2: Why does iron deficiency in a 65-year-old man need investigation? | It may come from gastrointestinal blood loss, including cancer | Iron deficiency in older men is almost always dietary | Haemoglobin falls normally with age in men | It shows he needs more red meat in his diet | Only women need iron deficiency investigated | Unexplained iron deficiency can signal bowel cancer.

## Blood products and haematological support
S: Blood transfusion and haematological support are complex areas with serious risks. Pharmacists support safe use of blood products, anticoagulant reversal and growth factors.
O: Describe the safe use of blood products and their alternatives
O: Explain reversal of anticoagulants and haematological growth factors
T: Patient blood management | An approach reducing unnecessary transfusion by optimising the patient's own blood
T: Prothrombin complex concentrate (PCC) | A product containing clotting factors, used to reverse warfarin urgently
H: Blood products
- **Red cells** for symptomatic or severe anaemia, following restrictive thresholds (NICE NG24).
- **Platelets** for bleeding or very low counts; **fresh frozen plasma** and **cryoprecipitate** for clotting factor deficiencies.
- Correct patient identification is essential; transfusion reactions (fever, rash, breathlessness, low blood pressure) need the transfusion stopped and urgent assessment.
- Tranexamic acid reduces bleeding in surgery and trauma.
H: Reversal and support
- **Warfarin reversal**: vitamin K (phytomenadione) and, for major bleeding, PCC.
- **DOAC reversal**: idarucizumab for dabigatran; andexanet alfa for some factor Xa inhibitors in specific situations, following local protocols.
- **Heparin reversal**: protamine.
- **Growth factors**: filgrastim (G-CSF) to shorten neutropenia; erythropoiesis-stimulating agents in CKD and some cancers.
- Follow local protocols and the BNF; transfusion and reversal are specialist decisions.
K: Use blood products only when needed, identify patients carefully, and know reversal agents: vitamin K and PCC for warfarin, idarucizumab for dabigatran, protamine for heparin.
!: Delaying vitamin K and PCC for someone on warfarin with a major bleed.
Q: Which drug reverses dabigatran? | Idarucizumab.
Q: What reverses heparin? | Protamine.
SUM: Blood products carry risks and need careful use.
SUM: Know the reversal agents for anticoagulants.
SRC: NICE NG24, Blood transfusion | guidance | 2015 | https://www.nice.org.uk/guidance/ng24
SRC: Joint Formulary Committee, British National Formulary: anticoagulant reversal | guidance | 2026 | https://bnf.nice.org.uk/
M1#pharmacy-u14-02-q1@1: Which product reverses warfarin in major bleeding? | Prothrombin complex concentrate | Protamine | Idarucizumab | Tranexamic acid alone | Platelets | PCC rapidly replaces vitamin K-dependent clotting factors.
M2#pharmacy-u14-02-q2@2: What should happen if a person develops fever and breathlessness during a transfusion? | Stop the transfusion and get urgent assessment | Speed it up | Give paracetamol and continue | Ignore it | Switch to another bag without telling anyone | These may be signs of a serious transfusion reaction.
M2#pharmacy-u14-02-q3@1: What does filgrastim do? | Stimulates white cell production to shorten neutropenia | Reverses the anticoagulant effect of warfarin | Stimulates platelet production to stop bleeding | Replaces missing clotting factors in plasma | Stimulates red cell production in kidney disease | Filgrastim is G-CSF, which stimulates neutrophil production after chemotherapy.

## Principles of cancer treatment
S: Cancer treatment combines surgery, radiotherapy and systemic anti-cancer therapy (SACT). Understanding treatment intent, staging and the multidisciplinary approach helps pharmacists support people safely.
O: Describe the aims and types of cancer treatment
O: Explain the role of the pharmacist in cancer care
T: Systemic anti-cancer therapy (SACT) | Medicines treating cancer throughout the body, including chemotherapy, targeted therapy, immunotherapy and hormone therapy
T: Treatment intent | Whether treatment aims to cure (curative or adjuvant) or to control symptoms and extend life (palliative)
H: Approaches
- **Curative**: surgery or radiotherapy, often with **adjuvant** (after) or **neoadjuvant** (before) SACT.
- **Palliative**: controlling disease and symptoms, extending life.
- Decisions are made by multidisciplinary teams (MDTs) using staging and performance status.
- Hormone therapies (tamoxifen, aromatase inhibitors, androgen deprivation) treat hormone-sensitive breast and prostate cancers.
H: Pharmacists in cancer care
- Clinically verify SACT prescriptions against protocols: indication, regimen, dose (often by body surface area), blood results, organ function and cycle timing.
- Manage interactions, including herbal products and OTC medicines.
- Support oral SACT, which carries the same risks as IV treatment.
- Recognise early cancer symptoms in the community and refer under NICE NG12.
K: Cancer treatment may be curative or palliative; pharmacists verify SACT against protocols, check interactions and support oral treatment.
!: Treating oral chemotherapy as low-risk because it's a tablet.
Q: What is adjuvant therapy? | Treatment given after the main treatment (such as surgery) to reduce recurrence.
Q: What do pharmacists check when verifying SACT? | Protocol, dose, blood results, organ function and timing.
SUM: Cancer treatment is planned by MDTs according to intent.
SUM: Pharmacists ensure SACT is safe and correct.
SRC: British Oncology Pharmacy Association, Standards for clinical pharmacy verification of prescriptions for cancer medicines | guidance | 2023 | https://www.bopa.org.uk/
SRC: NICE NG12, Suspected cancer: recognition and referral | guidance | 2025 | https://www.nice.org.uk/guidance/ng12
M1#pharmacy-u14-03-q1@1: What does neoadjuvant therapy mean? | Treatment given before the main treatment | Treatment after relapse | Palliative care only | A placebo | Treatment for side effects | It shrinks tumours before surgery or radiotherapy.
M2#pharmacy-u14-03-q2@2: Why do pharmacists check blood counts before chemotherapy? | To ensure it's safe to give the next cycle | To check cholesterol | For research only | To decide the price | It isn't needed | Low neutrophils or platelets may require delay or dose change.
M3#pharmacy-u14-03-q3@2: What is the main risk of treating oral SACT as routine? | Errors and toxicity are as serious as with IV chemotherapy | Oral treatment has no meaningful toxicity | Tablets are less effective than infusions | Oral treatment needs no blood monitoring | Only IV treatment needs a protocol check | Oral SACT needs the same checks as IV treatment.

## Cytotoxic chemotherapy
S: Cytotoxic drugs kill rapidly dividing cells, including healthy ones, causing predictable toxicities. Pharmacists help prevent, recognise and manage them.
O: Describe the classes and common toxicities of cytotoxic chemotherapy
O: Explain dose calculation and monitoring in chemotherapy
T: Body surface area (BSA) | A calculation from height and weight used to dose many cytotoxic drugs
T: Neutropenic sepsis | A life-threatening infection in a person with low neutrophils after chemotherapy
H: Classes and toxicities
- **Alkylating agents** (cyclophosphamide), **antimetabolites** (fluorouracil, capecitabine, methotrexate), **anthracyclines** (doxorubicin: cardiotoxicity, cumulative dose limit), **platinum** (cisplatin: nephrotoxicity, ototoxicity), **taxanes** (paclitaxel: neuropathy, hypersensitivity), **vinca alkaloids** (vincristine: neuropathy; **fatal if given intrathecally**).
- Common toxicities: myelosuppression, nausea and vomiting, mucositis, hair loss, infertility.
H: Safety
- **Neutropenic sepsis**: fever (or feeling unwell) during chemotherapy needs immediate assessment and IV antibiotics within 1 hour; people should call their acute oncology helpline.
- **DPD deficiency** testing before fluorouracil or capecitabine, as deficiency can cause severe toxicity.
- Dose by BSA (illustrative standard practice), with adjustments for organ function and toxicity; check protocols, the BNF and SPC.
- Vincristine is supplied in a mini-bag to prevent intrathecal administration.
K: Cytotoxics cause myelosuppression and class-specific toxicities; fever during chemotherapy is an emergency; test for DPD deficiency before fluoropyrimidines.
!: Advising someone on chemotherapy with a fever to take paracetamol and wait.
Q: How quickly should antibiotics be given for suspected neutropenic sepsis? | Within 1 hour.
Q: Why test for DPD deficiency before capecitabine? | Deficiency causes severe, potentially fatal toxicity.
SUM: Cytotoxics have predictable and serious toxicities.
SUM: Neutropenic sepsis is an emergency.
SRC: NICE CG151, Neutropenic sepsis: prevention and management in people with cancer | guidance | 2012 | https://www.nice.org.uk/guidance/cg151
SRC: MHRA, Drug Safety Update: 5-fluorouracil, capecitabine, tegafur, DPD testing recommended before initiation | guidance | 2020-10 | https://www.gov.uk/drug-safety-update
M1#pharmacy-u14-04-q1@1: Which chemotherapy drug is fatal if given intrathecally? | Vincristine | Methotrexate | Cytarabine | Hydrocortisone | Saline | Vincristine is given only IV, in a mini-bag.
M2#pharmacy-u14-04-q2@2: What should someone on chemotherapy with a temperature do? | Contact their acute oncology helpline immediately | Take paracetamol and wait | Go to bed | Visit the pharmacy next week | Stop eating | Neutropenic sepsis needs urgent IV antibiotics.
M2#pharmacy-u14-04-q3@1: Which anthracycline toxicity limits the total lifetime dose? | Cardiotoxicity | Hair loss | Taste change | Constipation | Dry skin | Anthracyclines cause cumulative heart damage.

## Targeted therapies and immunotherapy
S: Targeted therapies and immunotherapies have transformed cancer treatment. Their adverse effects differ from cytotoxics, and immune-related effects can affect any organ.
O: Describe how targeted therapies and immunotherapies work
O: Recognise immune-related adverse effects and key interactions
T: Tyrosine kinase inhibitor (TKI) | An oral targeted drug blocking signalling enzymes in cancer cells, such as imatinib
T: Immune checkpoint inhibitor | An antibody (such as pembrolizumab or nivolumab) releasing the immune system's brakes to attack cancer
H: Targeted therapies
- **Monoclonal antibodies** (trastuzumab for HER2-positive breast cancer: cardiotoxicity; rituximab for B-cell cancers: infusion reactions, hepatitis B reactivation).
- **TKIs** (imatinib, osimertinib and others): many are CYP3A4 substrates, so check interactions with inhibitors, inducers, grapefruit and St John's wort; some need acid-reducing drugs avoided.
- Biomarker testing (HER2, EGFR, and others) guides choice.
H: Immunotherapy
- **Checkpoint inhibitors** cause immune-related adverse effects: colitis (diarrhoea), pneumonitis (breathlessness, cough), hepatitis, endocrine problems (thyroid, adrenal, pituitary, diabetes), skin reactions.
- Effects can appear months after starting or even after stopping.
- New symptoms need urgent assessment by the oncology team; treatment is often corticosteroids.
- Carry an alert card; check interactions and refer early, using the SPC and local acute oncology guidance.
K: Targeted therapies need biomarker selection and interaction checks; checkpoint inhibitors cause immune-related effects in any organ, which need urgent oncology assessment.
!: Treating diarrhoea in someone on pembrolizumab with loperamide without contacting their oncology team.
Q: Name two immune-related adverse effects of checkpoint inhibitors. | For example colitis and pneumonitis.
Q: Why do many TKIs have interactions? | Many are metabolised by CYP3A4.
SUM: Targeted therapies act on specific cancer pathways.
SUM: Immune-related effects can occur anywhere and at any time.
SRC: UK Oncology Nursing Society, Acute oncology initial management guidelines | guidance | 2023 | https://www.ukons.org/
SRC: European Society for Medical Oncology, Management of toxicities from immunotherapy | guidance | 2022 | https://www.esmo.org/
M1#pharmacy-u14-05-q1@1: Which drug is a TKI? | Imatinib | Pembrolizumab | Rituximab | Trastuzumab | Cyclophosphamide | Imatinib is an oral tyrosine kinase inhibitor.
M2#pharmacy-u14-05-q2@2: A person on nivolumab develops new diarrhoea. What's right? | Urgent contact with their oncology team | Loperamide and wait | Ignore it as a virus | Stop eating | Double the next dose | Diarrhoea may be immune-related colitis needing steroids.
M2#pharmacy-u14-05-q3@1: Which herbal product interacts with many TKIs? | St John's wort | Peppermint tea | Chamomile | Ginger biscuits | Honey | St John's wort induces CYP3A4, reducing TKI levels.

## Supportive care in cancer
S: Supportive care manages the symptoms and side effects of cancer and its treatment. Good support improves quality of life and helps people complete treatment.
O: Describe the management of common side effects of cancer treatment
O: Identify oncological emergencies
T: Chemotherapy-induced nausea and vomiting (CINV) | Nausea and vomiting caused by chemotherapy, classified by emetic risk
T: Mucositis | Painful inflammation and ulceration of the mouth and gut lining from chemotherapy or radiotherapy
H: Managing side effects
- **CINV**: antiemetic regimens by emetic risk (5-HT3 antagonists, dexamethasone, NK1 antagonists such as aprepitant), including for delayed nausea.
- **Mucositis**: mouth care, mouthwashes, analgesia.
- **Diarrhoea and constipation**: depending on cause; immunotherapy diarrhoea needs oncology input.
- **Fatigue, appetite and weight loss**, skin reactions (hand-foot syndrome with capecitabine), and neuropathy.
- **Venous thromboembolism**: cancer increases risk; anticoagulation following guidance.
H: Oncological emergencies
- **Neutropenic sepsis**, **hypercalcaemia** (confusion, thirst, constipation), **metastatic spinal cord compression** (back pain, leg weakness, bladder problems: urgent MRI and dexamethasone), **superior vena cava obstruction**, and **tumour lysis syndrome**.
- Refer urgently via acute oncology services; follow local guidance and the BNF.
K: Use antiemetics by emetic risk, support mouth, bowel and skin care; recognise oncological emergencies such as spinal cord compression and neutropenic sepsis.
!: Ignoring new back pain and leg weakness in someone with cancer.
Q: Name three oncological emergencies. | For example neutropenic sepsis, hypercalcaemia and spinal cord compression.
Q: Which antiemetic class is aprepitant? | NK1 receptor antagonist.
SUM: Supportive care helps people complete treatment.
SUM: Recognise and refer oncological emergencies.
SRC: NICE NG234, Spinal metastases and metastatic spinal cord compression | guidance | 2023 | https://www.nice.org.uk/guidance/ng234
SRC: Multinational Association of Supportive Care in Cancer, Antiemetic guidelines | guidance | 2023 | https://mascc.org/
M1#pharmacy-u14-06-q1@1: Which drug is an NK1 receptor antagonist antiemetic? | Aprepitant | Ondansetron | Metoclopramide | Cyclizine | Haloperidol | Aprepitant prevents acute and delayed CINV.
M2#pharmacy-u14-06-q2@2: Which symptoms suggest metastatic spinal cord compression? | Back pain with leg weakness and bladder problems | Mild cough with a sore throat for 2 days | Gradual hair thinning after chemotherapy | Dry mouth and altered taste after treatment | Itchy skin over the injection site | MSCC needs urgent imaging and treatment to prevent paralysis.
M2#pharmacy-u14-06-q3@1: Which side effect is linked to capecitabine? | Hand-foot syndrome | Hearing loss | Orange urine | Weight gain | Hair growth | Capecitabine causes painful redness of palms and soles.

## Safe handling of cytotoxic medicines
S: Cytotoxic medicines can harm staff and others through exposure. Safe handling, preparation, transport and disposal protect everyone, under health and safety law.
O: Describe the principles of safe handling of cytotoxic medicines
O: Apply safe practice to preparation, spills and disposal
T: Hazardous medicine | A medicine with carcinogenic, mutagenic or reproductive toxicity, requiring special handling
T: Aseptic unit | A controlled facility where injectable medicines, including cytotoxics, are prepared in isolators
H: Handling and preparation
- **COSHH** regulations require risk assessment and control of exposure.
- Cytotoxic injections are prepared in licensed or regulated aseptic units, in isolators or cabinets, by trained staff.
- **PPE**: gloves, gowns and eye protection as required.
- Avoid crushing or splitting cytotoxic tablets; use gloves and dedicated equipment if handling is necessary.
H: Spills, waste and community settings
- Spill kits available wherever cytotoxics are handled; follow the spill procedure.
- **Waste**: purple-lidded sharps bins and purple waste streams for cytotoxic and cytostatic waste.
- Advise patients and carers on handling oral SACT at home: wash hands, don't crush, store safely, return unused medicines.
- Pregnant staff may need adjusted duties following risk assessment and local policy.
K: Cytotoxics are hazardous: prepare in aseptic units with PPE, avoid crushing tablets, use purple waste streams and spill kits, and advise carers.
!: Crushing a capecitabine tablet in a pharmacy without precautions.
Q: What colour is cytotoxic waste containers' lid? | Purple.
Q: Which regulations require control of exposure to hazardous substances? | COSHH.
SUM: Cytotoxic handling protects staff, carers and patients.
SUM: Follow COSHH, local procedures and waste rules.
SRC: Health and Safety Executive, Safe handling of cytotoxic drugs in the workplace | guidance | 2025 | https://www.hse.gov.uk/healthservices/safe-use-cytotoxic-drugs.htm
SRC: Department of Health and Social Care, Health Technical Memorandum 07-01: safe and sustainable management of healthcare waste | guidance | 2023 | https://www.england.nhs.uk/
M1#pharmacy-u14-07-q1@1: What colour lid identifies cytotoxic sharps bins? | Purple | Yellow | Orange | Blue | Black | Purple identifies cytotoxic and cytostatic waste.
M2#pharmacy-u14-07-q2@2: What advice suits a carer giving oral chemotherapy at home? | Wear gloves or wash hands, don't crush tablets, and store safely | Crush the tablets into food to make swallowing easier | Keep leftover tablets for other family members | Put unused tablets in household waste | No precautions are needed with tablets | Carers need protection from exposure, so they avoid direct contact and return unused tablets.
M2#pharmacy-u14-07-q3@1: Where should cytotoxic injections be prepared? | In aseptic units using isolators or cabinets | On a ward bench | In the patient's home | In a dispensary without controls | Anywhere convenient | Controlled preparation protects staff and products.

## Immunosuppressants
S: Immunosuppressants prevent transplant rejection and treat autoimmune disease, but carry risks of infection, cancer and toxicity. Many have narrow therapeutic ranges and major interactions.
O: Describe the main immunosuppressants and their monitoring
O: Identify infection risks and interactions
T: Calcineurin inhibitor | An immunosuppressant (tacrolimus, ciclosporin) that blocks T-cell activation
T: Therapeutic drug monitoring | Measuring drug levels to keep a narrow-range drug effective and safe
H: The main drugs
- **Tacrolimus and ciclosporin**: narrow therapeutic range; level monitoring; nephrotoxicity, hypertension, diabetes (tacrolimus); many CYP3A4 interactions (clarithromycin, azoles, grapefruit, St John's wort); prescribe and dispense tacrolimus by brand.
- **Mycophenolate**: blood disorders, gastrointestinal effects; teratogenic, so a pregnancy prevention programme applies.
- **Azathioprine**: TPMT testing; blood monitoring; allopurinol interaction.
- **Corticosteroids**: steroid card; bone, glucose and infection risks.
- **Sirolimus and everolimus**: mTOR inhibitors with wound-healing and lung effects.
H: Safety
- Infection risk: report fever or symptoms; vaccination (avoid live vaccines).
- Skin cancer risk: sun protection and skin checks.
- Check all new medicines, OTC products and supplements for interactions, using the BNF and SPC.
K: Immunosuppressants need level monitoring, brand consistency (tacrolimus), interaction checks and infection and cancer vigilance; mycophenolate is teratogenic.
!: Switching tacrolimus brands without specialist involvement.
Q: Why prescribe tacrolimus by brand? | Brands differ in absorption, so switching can cause toxicity or rejection.
Q: Name an interaction with tacrolimus. | For example clarithromycin, azole antifungals or grapefruit.
SUM: Immunosuppressants have narrow margins and major interactions.
SUM: Infection, cancer and pregnancy risks need management.
SRC: MHRA, Drug Safety Update: oral tacrolimus products, prescribe and dispense by brand name only | guidance | 2012-06 | https://www.gov.uk/drug-safety-update
SRC: MHRA, Drug Safety Update: mycophenolate mofetil, mycophenolic acid, updated contraception advice for male patients | guidance | 2018-02 | https://www.gov.uk/drug-safety-update
M1#pharmacy-u14-08-q1@1: Which immunosuppressant must be dispensed by brand? | Tacrolimus | Prednisolone | Paracetamol | Azathioprine | Folic acid | Tacrolimus brands aren't interchangeable.
M2#pharmacy-u14-08-q2@2: Which antibiotic raises tacrolimus levels? | Clarithromycin | Amoxicillin | Nitrofurantoin | Flucloxacillin | Fosfomycin | Clarithromycin inhibits CYP3A4, raising tacrolimus levels and toxicity.
M3#pharmacy-u14-08-q3@2: Why does mycophenolate need a pregnancy prevention programme? | It's teratogenic | It causes infertility only | It's illegal in pregnancy | It cures pregnancy nausea | It has no risks | Mycophenolate causes miscarriage and birth defects.

## Transplantation
S: Organ transplantation saves lives but needs lifelong immunosuppression and careful medicines management. Pharmacists support adherence, monitoring and interaction checks after transplant.
O: Describe the principles of medicines management after transplantation
O: Support adherence and recognise rejection and infection
T: Rejection | The immune system attacking a transplanted organ
T: Prophylaxis | Preventive treatment, such as antivirals and antibiotics after transplantation
H: Medicines after transplant
- Induction (antibody therapy) at transplant, then maintenance immunosuppression, often tacrolimus, mycophenolate and a corticosteroid.
- Prophylaxis against infections such as cytomegalovirus (valganciclovir), pneumocystis (co-trimoxazole) and fungal infections.
- Cardiovascular, bone and diabetes risk management.
H: Pharmacy's role
- **Adherence**: missed or late doses risk rejection; consistent timing and brands.
- **Interactions**: check every new medicine, OTC product, herbal remedy and grapefruit.
- Recognise rejection signs (depending on organ: falling kidney function, fever, pain over the graft) and infection.
- Shared care with transplant centres; follow their protocols and the SPC.
- Vaccination: inactivated vaccines (influenza, pneumococcal, COVID-19) are recommended; live vaccines are avoided.
- Monitor kidney function, blood pressure, glucose and drug levels as the transplant centre directs.
K: Transplant patients need lifelong immunosuppression and infection prophylaxis; support adherence, brand consistency and interaction checks.
!: Recommending St John's wort to a transplant recipient with low mood.
Q: Why is adherence crucial after transplant? | Missed doses can trigger rejection.
Q: Which infection is co-trimoxazole used to prevent after transplant? | Pneumocystis pneumonia.
SUM: Transplant care relies on immunosuppression and prophylaxis.
SUM: Pharmacists support adherence and safety.
SRC: NHS Blood and Transplant, Organ donation and transplantation information | guidance | 2025 | https://www.nhsbt.nhs.uk/
SRC: NICE TA481, Immunosuppressive therapy for kidney transplant in adults | guidance | 2017 | https://www.nice.org.uk/guidance/ta481
M1#pharmacy-u14-09-q1@1: What is a typical maintenance immunosuppressive regimen after kidney transplant? | Tacrolimus, mycophenolate and a corticosteroid | Paracetamol, ibuprofen and a laxative | Aspirin and a statin alone | Long-term antibiotics alone | No medicines once the organ settles | Combination immunosuppression prevents rejection with lower doses of each drug.
M2#pharmacy-u14-09-q2@2: Why should transplant recipients avoid St John's wort? | It reduces immunosuppressant levels, risking rejection | It increases weight | It treats rejection | It's only a food | It has no interactions | St John's wort induces CYP3A4, lowering immunosuppressant levels and risking rejection.
M2#pharmacy-u14-09-q3@1: Which antiviral prevents cytomegalovirus after transplant? | Valganciclovir | Aciclovir cream | Oseltamivir | Fluconazole | Amoxicillin | Valganciclovir is used for CMV prophylaxis.

## Biologics in inflammatory disease
S: Biological medicines such as TNF inhibitors have changed the treatment of inflammatory diseases. They need screening, infection vigilance and support with self-injection, and biosimilars have cut costs.
O: Describe the use of biologics in inflammatory disease
O: Explain screening, safety and biosimilar switching
T: Biologic | A medicine made by living cells, such as a monoclonal antibody, targeting the immune system
T: Biosimilar | A biological medicine highly similar to an approved biologic, with no clinically meaningful differences
H: Use and safety
- **TNF inhibitors** (adalimumab, etanercept, infliximab) and others targeting IL-6, IL-17, IL-23 and B cells, used in RA, IBD, psoriasis and other conditions under NICE technology appraisals.
- **Screening**: TB, hepatitis B and C, HIV; vaccines updated before starting (avoid live vaccines during treatment).
- **Infections**: report fever or signs of infection; treatment may be paused for infections and surgery.
- Specialist prescribing; homecare delivery services often supply them.
H: Self-injection and biosimilars
- Teach injection technique, storage (fridge) and sharps disposal.
- **Biosimilars** are approved by the MHRA after showing similar quality, safety and efficacy; switching is managed by specialist teams.
- Record the brand and batch for pharmacovigilance (Yellow Card).
- Check the SPC for each biologic's monitoring and pregnancy advice.
K: Screen for TB and hepatitis before biologics, watch for infection, avoid live vaccines, teach injection technique, and record brands for biosimilars.
!: Starting adalimumab without TB screening.
Q: What screening is done before a TNF inhibitor? | TB, hepatitis B and C, and HIV.
Q: What is a biosimilar? | A biologic highly similar to an approved one, without meaningful clinical differences.
SUM: Biologics need screening and infection vigilance.
SUM: Biosimilars give similar benefit at lower cost.
SRC: MHRA, Guidance on the licensing of biosimilar products | guidance | 2022 | https://www.gov.uk/government/publications/guidance-on-the-licensing-of-biosimilar-products
SRC: British Society for Rheumatology, Guideline on safety of biologic DMARDs | guidance | 2019 | https://www.rheumatology.org.uk/
M1#pharmacy-u14-10-q1@1: Which drug is a TNF inhibitor? | Adalimumab | Methotrexate | Prednisolone | Allopurinol | Paracetamol | Adalimumab blocks tumour necrosis factor.
M2#pharmacy-u14-10-q2@2: Why screen for TB before a TNF inhibitor? | TNF inhibitors can reactivate latent TB | To check vaccine status only | It's a cost check | Because TB causes arthritis | It isn't needed | TNF is important in containing latent TB, so blocking it can cause reactivation.
M2#pharmacy-u14-10-q3@1: Why record the brand of a biologic? | For pharmacovigilance and traceability | For the price only | It isn't needed | Because generics don't exist | For advertising | Brand and batch help link adverse reactions to products.
`;
