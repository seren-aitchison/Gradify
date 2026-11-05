// School 12: Gastrointestinal, Renal and Hepatic Therapeutics. UK, as at 2026.
// Format: kit/course/notes.js. Standard: docs/CURRICULUM_CONTENT_STANDARD.md
// EDUCATION ONLY. Treatment follows NICE guidance, the BNF, SPCs and local formularies. Any dose is illustrative.
export default `
## Dyspepsia and gastro-oesophageal reflux
S: Dyspepsia and reflux are very common and often managed in pharmacies. Knowing when symptoms are simple, when lifestyle and short courses help, and when to refer for possible cancer is the core skill.
O: Manage dyspepsia and reflux in line with NICE guidance
O: Identify alarm features needing referral
T: Dyspepsia | Upper abdominal pain or discomfort, often with bloating, early fullness or nausea
T: Gastro-oesophageal reflux disease (GORD) | Symptoms or damage caused by stomach contents flowing back into the oesophagus
H: Management (NICE CG184)
- **Lifestyle**: weight loss, smaller meals, avoiding late meals and triggers (alcohol, fatty food, caffeine), stopping smoking, raising the head of the bed.
- **Review medicines** that cause dyspepsia: NSAIDs, bisphosphonates, calcium channel blockers, nitrates, theophylline, corticosteroids.
- **Antacids and alginates** for occasional symptoms; a **proton pump inhibitor (PPI)** for 4 weeks for uninvestigated dyspepsia or GORD, or an H. pylori test-and-treat approach.
- Use the lowest effective PPI dose, and review long-term use: risks include C. difficile, fractures, low magnesium and B12 deficiency.
H: Alarm features
- Difficulty swallowing, unintentional weight loss, persistent vomiting, upper abdominal mass, anaemia or bleeding (black stools, vomiting blood), or new symptoms in people aged 55 and over with weight loss: refer under the NICE NG12 suspected cancer pathways.
- Chest pain may be cardiac: don't assume it's indigestion.
K: Lifestyle, medicine review, antacids, then a 4-week PPI or H. pylori testing; refer alarm features such as dysphagia, weight loss and bleeding.
!: Selling antacids repeatedly to a 60-year-old with weight loss and difficulty swallowing.
Q: Name three alarm features in dyspepsia. | For example difficulty swallowing, weight loss and black stools.
Q: Name two risks of long-term PPI use. | For example C. difficile and fractures.
SUM: Most dyspepsia responds to lifestyle changes and short courses.
SUM: Alarm features need urgent referral.
SRC: NICE CG184, Gastro-oesophageal reflux disease and dyspepsia in adults: investigation and management | guidance | 2019 | https://www.nice.org.uk/guidance/cg184
SRC: NICE NG12, Suspected cancer: recognition and referral | guidance | 2025 | https://www.nice.org.uk/guidance/ng12
M1#pharmacy-u12-01-q1@1: How long is an initial PPI course for uninvestigated dyspepsia? | 4 weeks | 1 day | 6 months | 2 years | Lifelong | NICE suggests a full-dose PPI for 4 weeks, then review.
M2#pharmacy-u12-01-q2@2: Which feature in a person with indigestion needs urgent referral? | Difficulty swallowing | Symptoms after a large meal | Relief with antacids | Occasional heartburn | Burping | Dysphagia is an alarm feature for oesophageal cancer.
M2#pharmacy-u12-01-q3@1: Which medicine commonly causes dyspepsia? | Ibuprofen | Paracetamol | Alginate | Lactulose | Loratadine | NSAIDs reduce protective prostaglandins in the stomach lining.

## Peptic ulcer disease and Helicobacter pylori
S: Peptic ulcers are mostly caused by H. pylori or NSAIDs. Eradicating H. pylori cures most ulcers, and protecting at-risk people taking NSAIDs prevents bleeding.
O: Describe the causes and treatment of peptic ulcer disease
O: Explain H. pylori testing and eradication therapy
T: Helicobacter pylori | A bacterium living in the stomach lining that causes most peptic ulcers
T: Eradication therapy | A PPI with two antibiotics for 7 days to clear H. pylori
H: Causes and testing
- **H. pylori** and **NSAIDs** (including low-dose aspirin) are the main causes; risk is higher with age, previous ulcers, anticoagulants, SSRIs and corticosteroids.
- Test with a urea breath test or stool antigen test; stop PPIs for 2 weeks and antibiotics for 4 weeks before testing, as they cause false negatives.
H: Treatment
- **Eradication**: a PPI plus two antibiotics (for example amoxicillin with clarithromycin or metronidazole) for 7 days, following NICE and local guidance; penicillin-allergic regimens differ.
- Explain that completing the course matters and side effects (diarrhoea, taste disturbance) are common.
- **NSAID ulcers**: stop the NSAID if possible and give a PPI; if NSAIDs must continue, use gastroprotection.
- Bleeding ulcers (black stools, vomiting blood, collapse) are emergencies.
- Check the BNF and local guidance for regimen doses, and retest only if symptoms persist or the ulcer was complicated.
K: Test and treat H. pylori with a 7-day triple regimen; stop NSAIDs or protect with a PPI; refer bleeding urgently.
!: Testing for H. pylori while the person is still taking a PPI.
Q: How long is H. pylori eradication therapy? | 7 days.
Q: Why stop a PPI before H. pylori testing? | PPIs can cause false-negative results.
SUM: H. pylori and NSAIDs cause most peptic ulcers.
SUM: Eradication cures H. pylori ulcers; gastroprotection prevents NSAID ulcers.
SRC: NICE CG184, Gastro-oesophageal reflux disease and dyspepsia in adults | guidance | 2019 | https://www.nice.org.uk/guidance/cg184
SRC: UK Health Security Agency, Test and treat for Helicobacter pylori in dyspepsia: quick reference guide for primary care | guidance | 2024 | https://www.gov.uk/government/publications/helicobacter-pylori-diagnosis-and-treatment
M1#pharmacy-u12-02-q1@1: What is H. pylori eradication therapy? | A PPI plus two antibiotics for 7 days | One antibiotic for 1 day | An antacid for a month | A PPI alone for life | A vaccine | A PPI with two antibiotics for 7 days clears most H. pylori infections.
M2#pharmacy-u12-02-q2@2: How long should a PPI be stopped before an H. pylori breath test? | 2 weeks | 1 hour | 1 day | 6 months | It doesn't need stopping | PPIs suppress the bacteria and cause false negatives.
M3#pharmacy-u12-02-q3@1: Which combination most increases the risk of a bleeding ulcer? | An NSAID with an SSRI and a corticosteroid | Paracetamol with an alginate | Amoxicillin with a PPI | Loperamide with fluids | Lactulose with senna | Each adds to gastrointestinal bleeding risk.

## Nausea and vomiting
S: Nausea and vomiting have many causes, from infections and pregnancy to medicines and raised intracranial pressure. Choosing an antiemetic means matching it to the cause and its receptor pathway.
O: Match antiemetics to the cause of nausea and vomiting
O: Identify red flags and adverse effects of antiemetics
T: Chemoreceptor trigger zone | An area of the brainstem sensing toxins and drugs in the blood, rich in dopamine and 5-HT3 receptors
T: Extrapyramidal side effects | Movement problems (such as acute dystonia) caused by dopamine blockers
H: Matching drug to cause
- **Drugs, toxins, metabolic causes**: haloperidol or metoclopramide (dopamine antagonists).
- **Gastric stasis**: metoclopramide or domperidone (prokinetics).
- **Motion sickness and vestibular causes**: hyoscine hydrobromide, cyclizine, promethazine.
- **Chemotherapy and post-operative**: ondansetron (5-HT3 antagonist), with dexamethasone and others.
- **Pregnancy**: lifestyle first, then antihistamines such as cyclizine or promethazine, following RCOG guidance.
H: Cautions and red flags
- **Metoclopramide**: maximum 5 days in adults, because of extrapyramidal effects; avoid in young people where possible (MHRA).
- **Domperidone**: QT prolongation; restricted use and doses (MHRA).
- **Ondansetron**: constipation, QT prolongation.
- Refer: signs of dehydration, blood in vomit, severe abdominal pain, headache with vomiting, or vomiting in infants.
K: Choose antiemetics by cause and receptor; limit metoclopramide to 5 days; refer dehydration, blood or severe pain.
!: Supplying metoclopramide long term to a young woman.
Q: Which antiemetic is used for motion sickness? | Hyoscine hydrobromide, cyclizine or promethazine.
Q: Why is metoclopramide restricted to 5 days? | Because of the risk of extrapyramidal effects.
SUM: Antiemetics are chosen by cause and receptor pathway.
SUM: Watch for movement disorders and QT prolongation.
SRC: Joint Formulary Committee, British National Formulary: nausea and vomiting | guidance | 2026 | https://bnf.nice.org.uk/
SRC: MHRA, Drug Safety Update: metoclopramide, risk of neurological adverse effects | guidance | 2013-08 | https://www.gov.uk/drug-safety-update
M1#pharmacy-u12-03-q1@1: Which antiemetic class does ondansetron belong to? | 5-HT3 antagonist | Dopamine agonist | Antihistamine | Antimuscarinic | Benzodiazepine | Ondansetron blocks 5-HT3 receptors in the gut and chemoreceptor trigger zone.
M2#pharmacy-u12-03-q2@2: What is the maximum duration of metoclopramide in adults? | 5 days | 5 weeks | 5 months | 5 years | Lifelong | MHRA restrictions reduce the risk of extrapyramidal effects.
M2#pharmacy-u12-03-q3@1: Which red flag needs urgent referral with vomiting? | Vomiting blood | Mild nausea after a meal | Travel sickness | Nausea after a new iron tablet | Morning nausea in early pregnancy | Vomiting blood (haematemesis) suggests upper gastrointestinal bleeding.

## Constipation
S: Constipation is common, especially in older people and those taking opioids. Choosing the right laxative and spotting red flags such as change in bowel habit are everyday pharmacy skills.
O: Choose an appropriate laxative for the type of constipation
O: Recognise red flags and medicines causing constipation
T: Bulk-forming laxative | A laxative such as ispaghula husk that increases stool mass and needs good fluid intake
T: Osmotic laxative | A laxative such as macrogol or lactulose that draws water into the bowel
H: Management
- **Lifestyle**: fibre, fluids, activity, responding to the urge.
- **Bulk-forming** (ispaghula) first in many adults; then **osmotic** (macrogol); add a **stimulant** (senna, bisacodyl) if stools are soft but hard to pass.
- **Opioid-induced**: an osmotic plus a stimulant; avoid bulk-forming laxatives; peripherally acting opioid antagonists for resistant cases.
- **Children**: macrogols first line, following NICE CG99.
- **Medicines causing constipation**: opioids, antimuscarinics, iron, calcium channel blockers, aluminium antacids.
H: Red flags
- Refer: change in bowel habit (especially over 40 or with weight loss), rectal bleeding, anaemia, severe pain, or constipation with vomiting (possible obstruction).
- NICE NG12 sets criteria for suspected colorectal cancer referral; faecal immunochemical testing (FIT) supports decisions.
K: Lifestyle, bulk-forming, then osmotic and stimulant laxatives; opioid constipation needs osmotic and stimulant; refer change in bowel habit and bleeding.
!: Recommending ispaghula for someone with opioid constipation.
Q: Which laxatives are used for opioid-induced constipation? | An osmotic laxative and a stimulant laxative.
Q: Name two red flags with constipation. | For example change in bowel habit and rectal bleeding.
SUM: Choose the laxative type for the cause.
SUM: Change in bowel habit or bleeding needs referral.
SRC: NICE CKS, Constipation | guidance | 2025 | https://cks.nice.org.uk/topics/constipation/
SRC: NICE CG99, Constipation in children and young people: diagnosis and management | guidance | 2017 | https://www.nice.org.uk/guidance/cg99
M1#pharmacy-u12-04-q1@1: Which laxative type is ispaghula husk? | Bulk-forming | Stimulant | Osmotic | Softener | Opioid antagonist | Ispaghula increases stool bulk and needs plenty of fluid.
M2#pharmacy-u12-04-q2@2: Which laxative should be avoided in opioid-induced constipation? | Bulk-forming laxatives | Macrogol | Senna | Lactulose | Bisacodyl | Bulk-forming laxatives can worsen constipation when gut movement is slowed.
M3#pharmacy-u12-04-q3@1: Which feature with constipation needs referral? | Rectal bleeding and weight loss | Constipation after a new diet | Short-lived constipation while travelling | Constipation responding to fibre | Hard stools after dehydration | Rectal bleeding with weight loss may indicate colorectal cancer and needs referral.

## Diarrhoea
S: Acute diarrhoea is usually viral and self-limiting, but dehydration is dangerous, especially in infants and older people. Pharmacists support rehydration and know when diarrhoea needs medical attention.
O: Manage acute diarrhoea with rehydration and appropriate medicines
O: Identify red flags and medicine-related causes of diarrhoea
T: Oral rehydration salts (ORS) | A glucose and electrolyte solution replacing fluid and salts lost in diarrhoea
T: Sick day rules | Advice to temporarily stop some medicines (such as metformin, ACE inhibitors and diuretics) during dehydrating illness
H: Management
- **Rehydration** with ORS, especially for children and older people.
- **Loperamide** for adults with uncomplicated diarrhoea; avoid if there's blood, fever or suspected C. difficile; not for young children.
- Hygiene: hand washing, and staying off work or school until 48 hours after the last episode.
- **Sick day rules**: people taking metformin, ACE inhibitors, ARBs, diuretics, NSAIDs or SGLT2 inhibitors may need to pause them during dehydrating illness, following local guidance.
H: Red flags and causes
- Refer: blood or mucus, high fever, severe pain, signs of dehydration, symptoms lasting more than a few days, recent hospital stay or antibiotics (C. difficile), recent travel, or infants.
- **Medicines causing diarrhoea**: antibiotics, magnesium antacids, metformin, colchicine, laxative misuse.
- Diarrhoea can reduce absorption of the contraceptive pill: check the extra precautions advice.
K: Rehydrate first, use loperamide in uncomplicated adult diarrhoea, give sick day advice, and refer blood, fever, dehydration or recent antibiotics.
!: Selling loperamide to someone with bloody diarrhoea and fever.
Q: What is the mainstay of treating acute diarrhoea? | Rehydration, with oral rehydration salts where needed.
Q: Which medicines might be paused during dehydrating illness? | For example metformin, ACE inhibitors and diuretics.
SUM: Rehydration is the priority in diarrhoea.
SUM: Recognise red flags and medicines that cause or are affected by diarrhoea.
SRC: NICE CKS, Diarrhoea: adult's assessment | guidance | 2024 | https://cks.nice.org.uk/topics/diarrhoea-adults-assessment/
SRC: Think Kidneys, Sick day guidance in patients at risk of acute kidney injury | guidance | 2018 | https://www.thinkkidneys.nhs.uk/
M1#pharmacy-u12-05-q1@1: What is the priority treatment for acute diarrhoea in a child? | Oral rehydration | Loperamide | Antibiotics | Codeine | Fasting | Dehydration is the main danger in children, so rehydration comes first.
M2#pharmacy-u12-05-q2@2: When should loperamide not be used? | When there's blood in the stool or fever | In uncomplicated adult diarrhoea | When travelling | With oral rehydration | After a takeaway meal without fever | It can worsen infective or inflammatory diarrhoea.
M3#pharmacy-u12-05-q3@2: A person with diarrhoea for 2 days takes metformin and ramipril. What advice fits? | Follow sick day rules, which may pause both | Double both doses | Stop all medicines permanently | Take loperamide with extra salt only | Nothing changes | Dehydration plus these medicines increases kidney injury and lactic acidosis risk.

## Inflammatory bowel disease
S: Crohn's disease and ulcerative colitis are long-term inflammatory conditions with flares and remissions. Treatment uses aminosalicylates, corticosteroids, immunomodulators and biologics, each with monitoring needs.
O: Describe the medicines used to induce and maintain remission in IBD
O: Identify monitoring and safety issues with IBD medicines
T: Ulcerative colitis | Inflammation of the colon lining, starting at the rectum
T: Crohn's disease | Patchy inflammation anywhere in the gut, through the full thickness of the wall
H: Medicines
- **Aminosalicylates** (mesalazine): mainstay in ulcerative colitis; brands aren't interchangeable, so prescribe by brand; report unexplained bleeding, bruising, sore throat or fever (blood disorders); monitor renal function.
- **Corticosteroids** induce remission but aren't for maintenance: bone protection and steroid card where relevant.
- **Immunomodulators** (azathioprine, mercaptopurine, methotrexate): check TPMT before thiopurines; blood monitoring.
- **Biologics and small molecules** (infliximab, adalimumab, vedolizumab, ustekinumab, JAK inhibitors) under specialists; infection screening first.
H: Support
- Flares: refer severe symptoms (bloody diarrhoea more than 6 times a day, fever, fast heart rate) urgently.
- Avoid NSAIDs where possible; check vaccines (avoid live vaccines on immunosuppression).
- Recognise the burden of fatigue and psychological effects.
K: Mesalazine by brand, steroids to induce not maintain, thiopurines with TPMT testing, biologics with screening; refer severe flares.
!: Switching between mesalazine brands without checking they are equivalent.
Q: Why is mesalazine prescribed by brand? | Release characteristics differ between brands.
Q: What is checked before starting azathioprine? | TPMT activity.
SUM: IBD treatment induces and maintains remission.
SUM: Many IBD medicines need monitoring and infection precautions.
SRC: NICE NG130, Ulcerative colitis: management | guidance | 2019 | https://www.nice.org.uk/guidance/ng130
SRC: NICE NG129, Crohn's disease: management | guidance | 2019 | https://www.nice.org.uk/guidance/ng129
M1#pharmacy-u12-06-q1@1: Which drug is the mainstay of mild to moderate ulcerative colitis? | Mesalazine | Loperamide | Senna | Codeine | Omeprazole | Aminosalicylates induce and maintain remission.
M2#pharmacy-u12-06-q2@2: What should someone on mesalazine report urgently? | Unexplained bleeding, bruising, sore throat or fever | Mild bloating | Dark urine after beetroot | A good appetite | Better sleep | These may indicate a blood disorder (blood dyscrasia) caused by mesalazine.
M2#pharmacy-u12-06-q3@1: Why aren't corticosteroids used to maintain IBD remission? | They don't maintain remission and cause long-term harm | They're too cheap | They cure IBD | They're only for children | They're illegal | Steroids induce remission in flares but don't maintain it and cause long-term harm.

## Irritable bowel syndrome
S: IBS causes abdominal pain with altered bowel habit and bloating, without structural disease. It's diagnosed positively, after red flags are excluded, and managed with diet, lifestyle and symptom-targeted medicines.
O: Describe the diagnosis and management of IBS
O: Distinguish IBS from conditions needing referral
T: Irritable bowel syndrome (IBS) | A long-term functional bowel disorder with pain, bloating and change in bowel habit
T: Low FODMAP diet | A dietitian-led diet restricting fermentable carbohydrates to reduce IBS symptoms
H: Management (NICE CG61)
- Regular meals, fluids, limiting insoluble fibre, caffeine and alcohol; oats and linseeds may help bloating.
- **Pain and spasm**: antispasmodics (mebeverine, peppermint oil, hyoscine butylbromide).
- **Constipation**: laxatives (avoid lactulose, which causes bloating); linaclotide if others fail.
- **Diarrhoea**: loperamide.
- Low-dose tricyclic antidepressants as second line; psychological therapies for refractory symptoms.
H: When it isn't IBS
- First diagnosis of IBS in a pharmacy should be confirmed by a GP.
- Refer: age over 50 with new symptoms, weight loss, rectal bleeding, anaemia, family history of bowel or ovarian cancer, nocturnal symptoms.
- In women, persistent bloating, especially over 50, may be ovarian cancer: NICE recommends CA125 testing.
K: IBS is managed with diet, antispasmodics and targeted laxatives or loperamide; refer red flags, new symptoms over 50, and persistent bloating in women.
!: Selling IBS remedies to a 58-year-old woman with new persistent bloating, without suggesting she see her GP.
Q: Which laxative should be avoided in IBS? | Lactulose, because it causes bloating.
Q: Why does persistent bloating in a woman over 50 need referral? | It may be a symptom of ovarian cancer.
SUM: IBS is a positive diagnosis after excluding red flags.
SUM: Treat symptoms with diet and targeted medicines.
SRC: NICE CG61, Irritable bowel syndrome in adults: diagnosis and management | guidance | 2017 | https://www.nice.org.uk/guidance/cg61
SRC: NICE NG12, Suspected cancer: recognition and referral | guidance | 2025 | https://www.nice.org.uk/guidance/ng12
M1#pharmacy-u12-07-q1@1: Which medicine is an antispasmodic used in IBS? | Mebeverine | Lactulose | Omeprazole | Metformin | Codeine | Antispasmodics such as mebeverine relieve abdominal pain and spasm in IBS.
M2#pharmacy-u12-07-q2@2: Which person needs referral rather than OTC IBS treatment? | A 58-year-old woman with new persistent bloating | A 25-year-old with known IBS and a typical flare | A student with stress-related cramps and a GP diagnosis | Someone wanting peppermint oil for known IBS | A 30-year-old with diagnosed IBS-D | New symptoms over 50 and persistent bloating need assessment.
M2#pharmacy-u12-07-q3@1: Which diet is used under a dietitian for IBS? | Low FODMAP | High fat | Gluten-rich | High sugar | Raw food only | Restricting fermentable carbohydrates can reduce symptoms.

## Acute kidney injury
S: Acute kidney injury (AKI) is a sudden fall in kidney function, often caused by illness plus medicines. Many cases are preventable, and pharmacists are well placed to spot and prevent harm.
O: Describe the causes and recognition of AKI
O: Review medicines in people at risk of or with AKI
T: Acute kidney injury (AKI) | A rapid fall in kidney function, shown by rising creatinine or falling urine output
T: Nephrotoxic | Harmful to the kidneys
H: Causes and recognition
- **Pre-renal**: dehydration, sepsis, low blood pressure.
- **Renal**: nephrotoxic drugs, infection, inflammation.
- **Post-renal**: obstruction (enlarged prostate, stones).
- Diagnosed by a rise in serum creatinine or reduced urine output (KDIGO criteria); NHS laboratories issue AKI warning alerts.
- Risk: older age, CKD, heart failure, diabetes, sepsis, and medicines.
H: Medicines
- **Nephrotoxic or risk-increasing**: NSAIDs, ACE inhibitors, ARBs, diuretics, aminoglycosides, vancomycin, contrast media, lithium.
- **Dose adjustments**: medicines cleared by the kidneys (metformin, DOACs, gentamicin, some antibiotics) need review as function falls.
- Review all medicines on admission; restart those paused when kidneys recover.
- The "triple whammy" (NSAID with ACE inhibitor or ARB and a diuretic) greatly increases risk.
- Monitor creatinine, potassium and urine output, and follow NICE and local guidance on medicines to pause and restart.
K: AKI often follows illness and medicines; stop or adjust nephrotoxic and renally cleared drugs, avoid the triple whammy, and restart when appropriate.
!: Selling ibuprofen to someone taking ramipril and furosemide.
Q: What is the "triple whammy"? | An NSAID with an ACE inhibitor or ARB and a diuretic.
Q: Name three medicines that increase AKI risk. | For example NSAIDs, ACE inhibitors and diuretics.
SUM: AKI is a sudden fall in kidney function, often medicine-related.
SUM: Medicine review prevents and limits harm.
SRC: NICE NG148, Acute kidney injury: prevention, detection and management | guidance | 2019 | https://www.nice.org.uk/guidance/ng148
SRC: Think Kidneys, Guidelines for medicines optimisation in patients with acute kidney injury | guidance | 2016 | https://www.thinkkidneys.nhs.uk/
M1#pharmacy-u12-08-q1@1: Which combination is known as the "triple whammy"? | NSAID, ACE inhibitor or ARB, and diuretic | Paracetamol, codeine and aspirin | Three antibiotics | Three vitamins | Statin, aspirin and PPI | This combination greatly increases AKI risk.
M2#pharmacy-u12-08-q2@2: Which medicine needs review if kidney function falls? | Metformin | Paracetamol at standard doses | Emollient cream | Loratadine in most cases | Saline nasal spray | Metformin can accumulate and cause lactic acidosis.
M3#pharmacy-u12-08-q3@2: An older person with diarrhoea and vomiting takes lisinopril, furosemide and naproxen. What's the main concern? | Acute kidney injury | Hypoglycaemia from naproxen | Constipation | Overactive thyroid | Insomnia | Dehydration plus this triple whammy can quickly damage the kidneys.

## Chronic kidney disease
S: Chronic kidney disease (CKD) affects millions of people and raises cardiovascular risk. Treatment slows progression and manages complications, while medicines must be adjusted to kidney function.
O: Describe how CKD is classified and managed
O: Identify medicines that slow progression and those needing adjustment
T: eGFR | Estimated glomerular filtration rate, a measure of kidney function from creatinine
T: ACR | Albumin to creatinine ratio, a urine test for kidney damage
H: Classification and management (NICE NG203)
- CKD is staged by eGFR (G1 to G5) and ACR (A1 to A3).
- **Slow progression**: control blood pressure; ACE inhibitor or ARB if albuminuria; **SGLT2 inhibitor** (such as dapagliflozin) for many people with CKD, following NICE criteria.
- **Cardiovascular protection**: atorvastatin for people with CKD.
- **Complications**: anaemia (iron, erythropoiesis-stimulating agents), mineral and bone disorder (phosphate binders, vitamin D), acidosis, and hyperkalaemia.
H: Medicines in CKD
- Adjust or avoid renally cleared drugs: check the BNF and SPC (they may use creatinine clearance rather than eGFR, especially for narrow-margin drugs).
- Avoid NSAIDs where possible; take care with potassium-raising drugs.
- Kidney failure needs dialysis or transplantation; pharmacists support specialist renal teams.
K: Stage by eGFR and ACR; slow progression with blood pressure control, ACE inhibitors or ARBs and SGLT2 inhibitors; adjust renally cleared drugs.
!: Using eGFR rather than creatinine clearance for a narrow-margin drug in a very underweight person.
Q: Which two tests classify CKD? | eGFR and ACR.
Q: Which drug class is now recommended to slow CKD progression in many people? | SGLT2 inhibitors.
SUM: CKD is classified by eGFR and albuminuria.
SUM: Slow progression, protect the heart and adjust medicines.
SRC: NICE NG203, Chronic kidney disease: assessment and management | guidance | 2021 | https://www.nice.org.uk/guidance/ng203
SRC: Joint Formulary Committee, British National Formulary: prescribing in renal impairment | guidance | 2026 | https://bnf.nice.org.uk/
M1#pharmacy-u12-09-q1@1: What does ACR measure? | Albumin in the urine | Blood sugar | Liver enzymes | Cholesterol | Heart rate | Albumin to creatinine ratio shows kidney damage.
M2#pharmacy-u12-09-q2@2: Which medicine slows CKD progression in many people? | Dapagliflozin | Ibuprofen | Gentamicin | Lithium | Naproxen | SGLT2 inhibitors reduce progression and cardiovascular events.
M2#pharmacy-u12-09-q3@1: Which statin is recommended for people with CKD? | Atorvastatin | Simvastatin 80 mg | No statin | Rosuvastatin at the highest dose | Pravastatin only | NICE recommends atorvastatin for primary and secondary prevention.

## Electrolyte disorders
S: Abnormal sodium, potassium, calcium and magnesium levels can be life-threatening and are often caused or worsened by medicines. Pharmacists identify the cause and advise on correction.
O: Describe causes and effects of common electrolyte disorders
O: Identify medicines causing electrolyte disturbances
T: Hyperkalaemia | A high blood potassium level, which can cause dangerous heart rhythms
T: Hyponatraemia | A low blood sodium level, causing confusion, falls and seizures
H: Potassium and sodium
- **Hyperkalaemia**: caused by CKD and medicines (ACE inhibitors, ARBs, spironolactone, trimethoprim, potassium supplements). Severe levels are emergencies: calcium gluconate protects the heart; insulin with glucose and salbutamol shift potassium into cells.
- **Hypokalaemia**: caused by loop and thiazide diuretics, vomiting, diarrhoea; increases digoxin toxicity.
- **Hyponatraemia**: caused by thiazides, SSRIs, carbamazepine, PPIs and others; correct slowly to avoid brain damage.
H: Calcium, magnesium and phosphate
- **Hypercalcaemia**: thiazides, vitamin D excess, cancer; causes thirst, confusion and constipation.
- **Hypomagnesaemia**: long-term PPIs and diuretics; may cause low potassium and calcium too.
- Check the BNF and local guidance for treatment and monitoring; avoid potassium-raising combinations without monitoring.
K: Many medicines cause electrolyte disorders; hyperkalaemia and hyponatraemia are most dangerous; correct cautiously and review the medicines.
!: Prescribing trimethoprim to someone on spironolactone and ramipril without checking potassium.
Q: Name two medicines that raise potassium. | For example ACE inhibitors and spironolactone.
Q: Name two medicines that cause hyponatraemia. | For example thiazides and SSRIs.
SUM: Electrolyte disorders are often medicine-related.
SUM: Treat severe disturbances as emergencies.
SRC: UK Kidney Association, Clinical practice guidelines: treatment of acute hyperkalaemia in adults | guidance | 2023 | https://ukkidney.org/
SRC: Joint Formulary Committee, British National Formulary: fluids and electrolytes | guidance | 2026 | https://bnf.nice.org.uk/
M1#pharmacy-u12-10-q1@1: Which medicine can cause hyperkalaemia? | Spironolactone | Furosemide | Salbutamol | Insulin | Bendroflumethiazide | Spironolactone is a potassium-sparing diuretic, so it can raise potassium.
M2#pharmacy-u12-10-q2@2: Why is low potassium dangerous with digoxin? | It increases the risk of digoxin toxicity | It makes digoxin inactive | It causes hyperkalaemia | It has no effect | It cures heart failure | Hypokalaemia makes the heart more sensitive to digoxin.
M2#pharmacy-u12-10-q3@1: Which medicine is a common cause of hyponatraemia in older people? | SSRIs | Paracetamol | Amoxicillin | Emollients | Salbutamol inhaler | SSRIs can cause SIADH and low sodium, especially in older people.

## Fluid therapy
S: IV fluids are medicines: the wrong type or amount causes harm. NICE's approach of resuscitation, routine maintenance, replacement and redistribution helps prescribe fluids safely.
O: Apply the NICE principles of IV fluid prescribing
O: Identify risks of IV fluid therapy
T: Maintenance fluids | Fluids replacing normal daily losses in people unable to drink enough
T: Crystalloid | An IV fluid of water with dissolved salts, such as sodium chloride 0.9% or Hartmann's solution
H: The 5 Rs (NICE CG174)
- **Resuscitation**: a fluid bolus of crystalloid for shock, then reassess.
- **Routine maintenance**: about 25 to 30 ml/kg/day of water with sodium, potassium and glucose, as an illustrative NICE figure; check local guidance.
- **Replacement**: for ongoing losses (vomiting, drains).
- **Redistribution**: complex fluid shifts in illness.
- **Reassessment**: regularly review fluid balance, weight, electrolytes and the clinical picture.
H: Risks
- Overload (especially in heart failure, kidney disease and older people), hyponatraemia (from hypotonic fluids), and hyperchloraemic acidosis (from large volumes of sodium chloride 0.9%).
- Children have specific guidance (NICE NG29).
- Potassium must be given in pre-mixed bags where possible: concentrated potassium is a high-risk medicine.
- Pharmacists check fluid prescriptions against the BNF, local guidance and the person's fluid balance chart, and question duplicate or excessive fluids.
K: Prescribe fluids using the 5 Rs, reassess often, and watch for overload, hyponatraemia and potassium errors.
!: Running maintenance fluids for days without checking electrolytes.
Q: What are NICE's 5 Rs of fluid therapy? | Resuscitation, routine maintenance, replacement, redistribution and reassessment.
Q: Why is concentrated potassium chloride dangerous? | Rapid or concentrated infusion can cause fatal heart arrhythmias.
SUM: IV fluids need the same care as any medicine.
SUM: Reassess fluid balance and electrolytes regularly.
SRC: NICE CG174, Intravenous fluid therapy in adults in hospital | guidance | 2017 | https://www.nice.org.uk/guidance/cg174
SRC: NICE NG29, Intravenous fluid therapy in children and young people in hospital | guidance | 2020 | https://www.nice.org.uk/guidance/ng29
M1#pharmacy-u12-11-q1@1: Which fluid is a crystalloid? | Hartmann's solution | Albumin | Packed red cells | Plasma | Platelets | Crystalloids such as Hartmann's are water with dissolved salts.
M2#pharmacy-u12-11-q2@2: What risk follows large volumes of hypotonic fluids? | Hyponatraemia | Hyperglycaemia only | Constipation | Hair loss | Hearing loss | Hypotonic fluids dilute the blood's sodium, causing hyponatraemia.
M2#pharmacy-u12-11-q3@1: Why should potassium be given in pre-mixed bags where possible? | Concentrated potassium can cause fatal arrhythmias | Pre-mixed bags are always cheaper | It improves taste | It isn't a medicine | Concentrate is unavailable | Concentrated potassium is a high-risk medicine.

## Liver disease and drug handling
S: The liver metabolises many drugs, so liver disease changes how medicines work and how safe they are. Unlike kidney function, there's no single test to guide doses.
O: Explain how liver disease affects drug handling
O: Identify medicines needing caution in liver disease
T: Hepatic encephalopathy | Confusion caused by toxins the failing liver can't clear, worsened by some medicines
T: Child-Pugh score | A score grading the severity of chronic liver disease
H: Effects of liver disease
- Reduced metabolism raises levels of drugs cleared by the liver, especially those with high first-pass metabolism.
- Low albumin increases free drug for highly protein-bound medicines.
- Clotting factors fall, so bleeding risk rises.
- Fluid retention (ascites) changes distribution; kidney function often falls too.
H: Medicines to use with care
- **Sedatives and opioids** can precipitate encephalopathy.
- **NSAIDs**: bleeding, kidney injury and fluid retention.
- **Constipating drugs**: worsen encephalopathy; lactulose and rifaximin are used to treat it.
- **Hepatotoxic drugs**: avoid where possible.
- **Paracetamol**: usually preferred analgesic, sometimes at reduced doses in low weight or malnourished people; check the BNF and SPC.
- Use the BNF hepatic impairment advice and specialist input; Child-Pugh helps grade severity.
K: Liver disease raises drug levels, lowers albumin and impairs clotting; avoid sedatives, NSAIDs and constipating drugs, and check the BNF.
!: Giving a person with cirrhosis a sedative and codeine without considering encephalopathy.
Q: Why are NSAIDs avoided in liver disease? | They increase bleeding, kidney injury and fluid retention.
Q: Which medicines treat hepatic encephalopathy? | Lactulose and rifaximin.
SUM: Liver disease changes drug handling in several ways.
SUM: Use specialist advice and the BNF; avoid risky drugs.
SRC: Joint Formulary Committee, British National Formulary: prescribing in hepatic impairment | guidance | 2026 | https://bnf.nice.org.uk/
SRC: NICE NG50, Cirrhosis in over 16s: assessment and management | guidance | 2023 | https://www.nice.org.uk/guidance/ng50
M1#pharmacy-u12-12-q1@1: Which drug treats hepatic encephalopathy? | Lactulose | Codeine | Diazepam | Ibuprofen | Loperamide | Lactulose reduces ammonia absorption from the gut, improving confusion.
M3#pharmacy-u12-12-q2@2: Why can sedatives be dangerous in cirrhosis? | They can precipitate hepatic encephalopathy | They improve liver function | They cure ascites | They raise albumin | They have no effect | Reduced clearance and brain sensitivity increase risks.
M3#pharmacy-u12-12-q3@1: Why does low albumin matter for some drugs? | More free drug is available for highly protein-bound medicines | It reduces all drug effects | It only affects vitamins | It improves kidney function | It stops absorption entirely | Unbound (free) drug is the active fraction, so effects and toxicity increase.

## Drug-induced liver injury
S: Many medicines can damage the liver, from paracetamol overdose to idiosyncratic reactions. Recognising symptoms, monitoring the right drugs and acting quickly prevent serious harm.
O: Identify medicines commonly causing liver injury
O: Describe recognition and management of drug-induced liver injury
T: Drug-induced liver injury (DILI) | Liver damage caused by a medicine, herbal or dietary supplement
T: Hepatocellular and cholestatic patterns | Liver injury mainly affecting liver cells (raised ALT) or bile flow (raised ALP and bilirubin)
H: Common causes
- **Paracetamol overdose**: dose-dependent; treated with acetylcysteine using the treatment nomogram, following TOXBASE.
- **Idiosyncratic**: co-amoxiclav (cholestatic, sometimes weeks after stopping), flucloxacillin, isoniazid, methotrexate, statins (rarely serious), valproate, some antiepileptics, nitrofurantoin.
- **Herbal and dietary supplements**: increasingly recognised causes.
H: Recognition and management
- Symptoms: jaundice, dark urine, pale stools, itching, nausea, abdominal pain, tiredness.
- Stop the suspected drug; check liver function tests; refer severe or worsening cases.
- Monitor LFTs for drugs needing it (methotrexate, valproate, TB drugs, some others) as the SPC and local shared care guidance require.
- Report suspected DILI through the Yellow Card scheme.
K: Paracetamol, antibiotics (co-amoxiclav, flucloxacillin), TB drugs and supplements cause liver injury; stop the drug, check LFTs and report.
!: Dismissing jaundice weeks after a course of co-amoxiclav because the course has finished.
Q: What is the antidote for paracetamol overdose? | Acetylcysteine.
Q: Name a symptom of drug-induced liver injury. | For example jaundice, dark urine or itching.
SUM: Many medicines and supplements can injure the liver.
SUM: Stop the cause, monitor and report.
SRC: UK Health Security Agency, TOXBASE: paracetamol | guidance | 2026 | https://www.toxbase.org/
SRC: MHRA, Yellow Card scheme | guidance | 2026 | https://yellowcard.mhra.gov.uk/
M1#pharmacy-u12-13-q1@1: Which antibiotic can cause cholestatic jaundice weeks after stopping? | Co-amoxiclav | Amoxicillin alone always | Nitrofurantoin creams | Trimethoprim eye drops | None | Co-amoxiclav cholestasis can appear up to several weeks after the course ends.
M2#pharmacy-u12-13-q2@2: Which symptom suggests drug-induced liver injury? | Dark urine and pale stools | Runny nose | Dry eyes | Sneezing | Ankle cramps | These signs suggest problems with bile flow.
M2#pharmacy-u12-13-q3@1: What should a pharmacist do if they suspect a drug caused liver injury? | Advise stopping and assessment, then report via Yellow Card | Increase the dose | Ignore it | Switch to a herbal remedy | Wait a year | Stopping, assessing and reporting reduce harm.

## Alcohol-related liver disease
S: Alcohol is the commonest cause of liver disease in the UK. Pharmacists help identify harmful drinking, support withdrawal and relapse prevention, and manage complications.
O: Describe the stages of alcohol-related liver disease and their management
O: Explain medicines used in alcohol withdrawal and dependence
T: Alcohol withdrawal | Symptoms (tremor, anxiety, sweating, seizures, delirium tremens) when a dependent person stops drinking
T: Wernicke's encephalopathy | A neurological emergency from thiamine deficiency in heavy drinkers
H: Liver disease
- Progresses from fatty liver to alcoholic hepatitis to cirrhosis; stopping drinking can reverse early stages.
- Complications: ascites (spironolactone, salt restriction), varices (beta-blockers, endoscopy), encephalopathy (lactulose, rifaximin), infections.
- UK low-risk guidance: no more than 14 units a week, spread over 3 or more days.
H: Withdrawal and dependence
- **Withdrawal** in dependent people should be medically managed: a reducing course of chlordiazepoxide (or another benzodiazepine) following local protocols; stopping suddenly risks seizures.
- **Thiamine** to prevent Wernicke's encephalopathy (oral, or IV Pabrinex in high risk).
- **Relapse prevention**: acamprosate, naltrexone, or disulfiram, with psychosocial support (NICE CG115).
- Pharmacists can give brief interventions using AUDIT.
- Benzodiazepine and thiamine doses follow local protocols: check the BNF and SPC.
K: Alcohol damages the liver progressively; manage withdrawal with benzodiazepines and thiamine, and prevent relapse with acamprosate, naltrexone or disulfiram.
!: Advising a dependent drinker to stop suddenly without medical support.
Q: What is the UK low-risk drinking guideline? | No more than 14 units a week, spread over 3 or more days.
Q: Why is thiamine given to heavy drinkers? | To prevent Wernicke's encephalopathy.
SUM: Alcohol-related liver disease is preventable and partly reversible.
SUM: Withdrawal needs medical management; relapse prevention needs support.
SRC: NICE CG115, Alcohol-use disorders: diagnosis, assessment and management of harmful drinking and alcohol dependence | guidance | 2011 | https://www.nice.org.uk/guidance/cg115
SRC: UK Chief Medical Officers, Low risk drinking guidelines | guidance | 2016 | https://www.gov.uk/government/publications/alcohol-consumption-advice-on-low-risk-drinking
M1#pharmacy-u12-14-q1@1: Which vitamin prevents Wernicke's encephalopathy? | Thiamine | Vitamin C | Vitamin D | Folic acid | Vitamin K | Thiamine deficiency causes Wernicke's encephalopathy.
M2#pharmacy-u12-14-q2@2: Which medicine is used for medically managed alcohol withdrawal? | Chlordiazepoxide | Disulfiram | Acamprosate alone | Naltrexone | Lactulose | A reducing benzodiazepine prevents seizures and delirium.
M3#pharmacy-u12-14-q3@2: Why shouldn't a dependent drinker stop alcohol suddenly without support? | Withdrawal can cause seizures and delirium tremens | It always causes liver failure | It increases the hangover only | It's illegal | It causes weight gain | Severe withdrawal can be fatal without treatment.
`;
