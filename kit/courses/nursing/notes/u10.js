// School 10: Adult Nursing (field school). UK, as at 2026. Written to standard 2
// (docs/CURRICULUM_CONTENT_STANDARD.md). School 5 covers the conditions themselves; this school covers the
// adult nurse's role in each specialty: assessment, monitoring, interventions, escalation triggers and
// patient education. Thresholds are from national guidance as named; local policies, early warning
// systems and prescribing decisions apply. Nothing here authorises a procedure or a medicine decision
// outside a registrant's competence and local policy. Sources are listed with the edition known when
// written and are pending verification (docs/qa/nursing-sources.md).
export default `
## Adult health assessment
S: Adult health assessment brings together history, observation, examination and validated tools to build a full picture of an adult's health and needs. It is the foundation of safe adult nursing, from admission to discharge.
O: Carry out a structured adult nursing assessment combining history, observations and validated tools
O: Use the ABCDE approach and NEWS2 to recognise and respond to deterioration in adults
O: Adapt assessment for older adults, people with communication needs and people with learning disabilities
PRE: Assessment (School 7)
H: Components
- **History**: presenting problem, past medical history, medicines (including over-the-counter and herbal), allergies (with the reaction), social history, function, what matters to the person.
- **Observations**: respiratory rate, oxygen saturation (and whether on oxygen), blood pressure, pulse, level of consciousness or new confusion, temperature, recorded on the **NEWS2** chart; plus capillary blood glucose, pain score, weight and fluid balance as indicated.
- **Systematic examination**: often head to toe or by system, including skin integrity, mobility, nutrition, continence, cognition and mood.
- **Risk assessments**: VTE, pressure ulcers, falls, malnutrition (MUST), delirium (4AT), moving and handling.
H: ABCDE and NEWS2
- Use **ABCDE** for any acutely unwell adult: treat problems as you find them and call for help early.
- **NEWS2** scoring: a total of **5 or 6**, or **3 in any single parameter**, triggers an **urgent** response; a total of **7 or more** triggers an **emergency** response; follow the local escalation policy. Use the scale for SpO2 targets of 88–92% (scale 2) only when prescribed for people with confirmed hypercapnic respiratory failure.
- New confusion scores 3 in NEWS2: never dismiss it.
- NEWS2 isn't validated for pregnancy or children, which have their own tools.
H: Adapting assessment
- **Older adults**: assess cognition (and know the baseline), frailty, falls, continence, nutrition, hearing and vision; illness often presents atypically.
- **Communication needs**: use interpreters (not family members for clinical information), hearing loops, easy-read materials.
- **Learning disabilities and autism**: use the hospital passport, involve carers who know the person, allow time, watch for diagnostic overshadowing.
- **Skin tone**: assess pressure damage, cyanosis and jaundice in ways that work for all skin tones.
K: Combine history, NEWS2 observations, systematic examination and risk tools; escalate by NEWS2 thresholds and clinical concern; adapt assessment to the person.
!: Recording observations without acting on the score. A NEWS2 of 5 or a single red score of 3 needs urgent review.
T: NEWS2 | The National Early Warning Score 2, used to detect and respond to deterioration in adults
T: Diagnostic overshadowing | Attributing symptoms to a person's existing disability or diagnosis rather than investigating them
T: Baseline | The person's usual state, against which changes are judged
SUM: Adult assessment combines history, observations, examination and risk tools.
SUM: NEWS2 of 5–6 or a single 3 is urgent; 7 or more is an emergency.
SUM: Adapt assessment for age, communication, disability and skin tone.
SRC: Royal College of Physicians, National Early Warning Score (NEWS) 2 | guidance | 2017 | https://www.rcp.ac.uk/improving-care/resources/national-early-warning-score-news-2/
SRC: Resuscitation Council UK, The ABCDE approach | guidance | 2021 | https://www.resus.org.uk/library/abcde-approach
SRC: NHS England, Reasonable adjustments and diagnostic overshadowing (learning disability guidance) | guidance | 2023 | https://www.england.nhs.uk/learning-disabilities/
Q: Which NEWS2 total triggers an emergency response? | 7 or more.
Q: What is diagnostic overshadowing? | Attributing symptoms to an existing disability or diagnosis instead of investigating them.
M1#nursing-u10-01-q1@2: What does a NEWS2 score of 3 in a single parameter usually trigger? | An urgent clinical review | No action | A routine review the next day | Discharge planning | A single red score of 3 needs an urgent response under the RCP guidance.
M2#nursing-u10-01-q2@2: A patient's NEWS2 total is 7. What does this require? | An emergency response, usually from a team with critical care skills | Repeat the observations in 12 hours and review then | A routine ward round review | Record the score and inform the night team at handover | A total of 7 or more triggers an emergency assessment.
M3#nursing-u10-01-q3@3: An adult with a learning disability is more agitated than usual and holding his abdomen. Staff say "that's just his behaviour." What should the nurse do? | Assess for a physical cause with his carers and escalate | Accept that it is his usual behaviour | Give prescribed sedation to settle his agitation | Wait for him to say what is wrong before acting | Behaviour change can be a sign of pain or illness; avoiding diagnostic overshadowing saves lives.
MS2#nursing-u10-01-q4@1: Which are part of a NEWS2 observation set? | Respiratory rate ; Oxygen saturation ; Level of consciousness or new confusion | Blood glucose ; Weight | NEWS2 uses respiratory rate, SpO2, supplemental oxygen, blood pressure, pulse, consciousness and temperature.

## Medical nursing
S: Medical nursing cares for adults with acute and chronic medical conditions, such as heart failure, COPD exacerbations, infections, stroke and diabetes. It demands broad knowledge, close monitoring and coordination across many specialties.
O: Describe the scope of medical nursing and the common presentations on medical wards
O: Plan care for an adult with an acute medical illness, including monitoring and escalation
O: Recognise the risks of hospital stays for medical patients and how to reduce them
PRE: Adult health assessment
H: Settings and presentations
- Acute medical units, general medical and specialist wards (respiratory, cardiology, gastroenterology, care of older people), same day emergency care.
- Common presentations: breathlessness, chest pain, falls and "off legs", confusion, infection and sepsis, gastrointestinal bleeding, exacerbations of long-term conditions.
H: Nursing care of an acutely unwell medical patient
- Regular observations with NEWS2; escalate deterioration promptly.
- Oxygen therapy to prescribed target saturations.
- IV fluids and antibiotics as prescribed; fluid balance.
- Medicines reconciliation and timely administration, including time-critical medicines.
- Symptom relief: breathlessness, pain, nausea.
- Nutrition, hydration, skin, continence and mobility.
- Communication with the person and family about diagnosis and plans.
H: Hazards of hospital stays
P: Medical patients, often older, are at risk of **hospital-acquired harms**: delirium, falls, pressure ulcers, VTE, healthcare-associated infections, deconditioning, malnutrition and medication errors. Bundles of preventive care (early mobilisation, hydration, sleep, orientation, VTE assessment and prophylaxis, regular skin checks) reduce these risks. Long stays also increase loss of independence, so discharge planning starts on admission.
H: Working with the team
P: Medical wards depend on close teamwork with doctors, pharmacists, therapists, specialist nurses (such as respiratory, heart failure and diabetes nurses), social workers and discharge teams. Board rounds and daily reviews keep the plan moving.
K: Medical nursing combines close monitoring and escalation with preventing hospital-acquired harm and early discharge planning.
!: Focusing only on the medical diagnosis. Delirium, falls and deconditioning often decide how a medical patient's stay ends.
T: Acute medical unit | A unit receiving and assessing adults with acute medical illness, usually for a short stay
T: Hospital-acquired harm | Harm arising from a hospital stay, such as falls, pressure ulcers, VTE or delirium
T: Board round | A short daily team meeting reviewing each patient's plan and expected discharge
SUM: Medical nursing covers a wide range of acute and chronic conditions.
SUM: Monitor closely, escalate early and give timely treatment.
SUM: Prevent hospital-acquired harm and plan discharge from admission.
SRC: Royal College of Physicians, Acute care toolkit series | guidance | 2023 | https://www.rcp.ac.uk/improving-care/resources/acute-care-toolkits/
SRC: NICE NG94, Emergency and acute medical care in over 16s: service delivery and organisation | guidance | 2018 | https://www.nice.org.uk/guidance/ng94
Q: Name three hospital-acquired harms common in medical patients. | Delirium, falls, pressure ulcers, VTE, healthcare-associated infection, deconditioning or malnutrition.
Q: What is a board round? | A short daily team meeting reviewing each patient's plan and expected discharge.
M1#nursing-u10-02-q1@1: Which is a common presentation on an acute medical unit? | Breathlessness | Planned hip replacement | Routine dental check | Elective cataract surgery | Breathlessness, chest pain, falls, confusion and infection are common acute medical presentations.
M2#nursing-u10-02-q2@3: An 84-year-old admitted with pneumonia has stayed in bed for four days. Which risk should the nurse address? | Deconditioning, falls and pressure damage | Increased muscle strength | Reduced VTE risk | Improved appetite | Prolonged bed rest increases deconditioning, pressure damage, VTE and falls.
M2#nursing-u10-02-q3@2: Which bundle of measures helps prevent delirium on a medical ward? | Orientation, hydration, sleep, mobilisation and reviewing medicines | Regular night sedation for all older patients to aid sleep | Keeping lights on all night | Moving patients between bays often to balance workload | Multicomponent interventions reduce delirium risk.
TF2#nursing-u10-02-q4@1: Same day emergency care allows some acutely unwell adults to be assessed and treated without an overnight admission. | True | SDEC services treat suitable patients on the same day, avoiding admission.

## Surgical nursing
S: Surgical nursing cares for adults before, during and after surgery. Good preparation and post-operative monitoring prevent complications and support a faster recovery.
O: Prepare an adult for surgery, including pre-operative assessment, fasting and checklists
O: Describe the principles of enhanced recovery after surgery
O: Recognise and respond to early post-operative complications
PRE: Adult health assessment
H: Pre-operative preparation
- **Pre-operative assessment**: medical history, medicines (including anticoagulants, diabetes medicines and those to stop or continue), allergies, frailty, anaesthetic risk, and patient education.
- **Consent** obtained by the surgeon, with the nurse checking understanding and flagging concerns.
- **Fasting**: commonly no food for **6 hours** and clear fluids until **2 hours** before anaesthesia (some units allow clear fluids closer to surgery); avoid unnecessarily long fasting, follow local anaesthetic guidance.
- **Pre-operative checklist**: identity, consent, site marking, allergies, fasting, removal of jewellery and prostheses (as policy directs), VTE assessment, blood results, pregnancy test where relevant.
- The **WHO Surgical Safety Checklist** is used in theatre (sign in, time out, sign out).
H: Enhanced recovery
P: **Enhanced recovery after surgery (ERAS)** programmes combine evidence-based measures: pre-operative education and optimisation, shorter fasting with carbohydrate drinks where suitable, minimally invasive surgery, multimodal analgesia that limits opioids, early eating and drinking, early mobilisation and early removal of drains and catheters. They reduce complications and length of stay.
H: Post-operative monitoring
- Observations at a frequency set by local policy, more often in the early period; NEWS2 with escalation.
- Pain, nausea, wound and drains, fluid balance and urine output, bowel function, mobility.
- **Early complications**: haemorrhage (tachycardia, hypotension, increasing drain output), airway problems, hypoxia, hypotension, post-operative nausea and vomiting, urinary retention, delirium.
- **Later complications**: infection (wound, chest, urine), VTE, ileus, anastomotic leak (in bowel surgery: pain, fever, tachycardia, deterioration).
K: Prepare patients safely with checklists and appropriate fasting, use enhanced recovery principles, and monitor closely to catch post-operative complications early.
!: Fasting patients from midnight regardless of operation time. Prolonged fasting causes dehydration and distress; follow current fasting guidance.
T: Enhanced recovery after surgery | An evidence-based programme of perioperative care to speed recovery and reduce complications
T: WHO Surgical Safety Checklist | A three-stage checklist used in theatre to prevent avoidable harm
T: Anastomotic leak | Leakage from a surgical join in the bowel, a serious post-operative complication
SUM: Pre-operative assessment, consent, fasting and checklists prepare patients safely.
SUM: Enhanced recovery speeds recovery and reduces complications.
SUM: Monitor closely and escalate signs of bleeding, infection, VTE or leak.
SRC: Association of Anaesthetists, Perioperative care and fasting guidance | guidance | 2024 | https://anaesthetists.org/
SRC: World Health Organization, WHO Surgical Safety Checklist | guidance | 2009 | https://www.who.int/teams/integrated-health-services/patient-safety/research/safe-surgery
SRC: NICE NG180, Perioperative care in adults | guidance | 2020 | https://www.nice.org.uk/guidance/ng180
SAFE: Pre-operative preparation and post-operative monitoring follow your organisation's protocols, and some tasks (such as removing drains) need assessed competence and authorisation.
Q: What are the three stages of the WHO Surgical Safety Checklist? | Sign in, time out and sign out.
Q: Give three elements of enhanced recovery after surgery. | Pre-operative education, shorter fasting, multimodal analgesia, early eating and drinking, and early mobilisation.
M1#nursing-u10-03-q1@1: What is the usual minimum fasting time for clear fluids before elective anaesthesia in adults? | About 2 hours | 12 hours | 24 hours | No fasting at all | Clear fluids are usually allowed until about two hours before anaesthesia, following local guidance.
M2#nursing-u10-03-q2@2: Two hours after surgery, a patient's heart rate rises from 80 to 118, blood pressure falls and the drain fills with fresh blood. What should the nurse suspect? | Haemorrhage: escalate urgently | Normal post-operative recovery | Anxiety | Urinary retention | Tachycardia, hypotension and fresh drain output suggest bleeding.
M3#nursing-u10-03-q3@3: On day four after bowel surgery, a patient develops increasing abdominal pain, fever and a heart rate of 115, having been recovering well. What should the nurse suspect and do? | A possible anastomotic leak or sepsis: escalate urgently | Normal post-operative discomfort: give paracetamol | Constipation: give a laxative | Anxiety about discharge: reassure | New pain, fever and tachycardia after bowel surgery can signal a leak, which is a surgical emergency.
SEQ1#nursing-u10-03-q4@2: Put the stages of the WHO Surgical Safety Checklist in order. | Sign in ; Time out ; Sign out | The checklist runs before induction, before incision and before leaving theatre.

## Cardiovascular nursing
S: Cardiovascular nursing cares for adults with heart and circulatory conditions, from acute coronary syndromes to heart failure and arrhythmias. Nurses monitor, treat, educate and support people to live well with heart disease.
O: Describe nursing care for a person with suspected acute coronary syndrome
O: Plan care and self-management education for a person with heart failure
O: Recognise cardiovascular deterioration, including arrhythmias, and escalate appropriately
PRE: Cardiovascular disease (School 5)
H: Suspected acute coronary syndrome
- Treat chest pain as cardiac until assessed: record a **12-lead ECG** promptly and show it to a clinician immediately (School 6), following the local chest pain pathway.
- Observations, pain assessment, IV access; oxygen only if saturation is below target.
- Give prescribed medicines (such as aspirin and analgesia) per the pathway.
- Monitor for arrhythmias and deterioration; prepare for transfer to primary PCI or a coronary care unit where indicated.
- Reassure: fear and anxiety are common.
H: Heart failure
- **Monitor**: daily weights (same time, same scales, after voiding), fluid balance, oedema, breathlessness, observations, renal function and electrolytes (especially with diuretics and ACE inhibitors or similar medicines).
- **Treatment support**: diuretics, fluid restriction only if prescribed, positioning upright for breathlessness.
- **Education**: daily weighing at home and what to do if weight rises quickly (for example, around 2 kg over three days, according to the person's plan), recognising worsening symptoms, medicines adherence, salt reduction, activity, smoking cessation, vaccinations.
- **Specialist support**: heart failure specialist nurses, cardiac rehabilitation, and palliative care for advanced disease.
H: Arrhythmias and deterioration
P: Report new irregular pulse, palpitations, syncope, chest pain, breathlessness or a change on the cardiac monitor. Atrial fibrillation increases stroke risk, so anticoagulation decisions follow assessment. Severe bradycardia or tachycardia with signs of shock, syncope, heart failure or ischaemia is an emergency (Resuscitation Council UK peri-arrest algorithms).
H: Living with heart disease
P: Secondary prevention (statins, antiplatelets, blood pressure control, smoking cessation, exercise, diet) and **cardiac rehabilitation** improve survival and quality of life. Psychological support matters: anxiety and depression are common after cardiac events.
K: Act fast on chest pain with an ECG and the pathway; monitor heart failure with daily weights and electrolytes; teach self-management and secondary prevention.
!: Giving high-flow oxygen to every patient with chest pain. Oxygen is given only if saturation is below target.
T: Acute coronary syndrome | A spectrum of conditions caused by sudden reduced blood flow to the heart, including unstable angina and myocardial infarction
T: Daily weights | Weighing at the same time on the same scales to detect fluid retention in heart failure
T: Cardiac rehabilitation | A structured programme of exercise, education and support after a cardiac event
SUM: Chest pain needs a prompt ECG, the local pathway and close monitoring.
SUM: Heart failure care centres on daily weights, fluid, electrolytes and education.
SUM: Escalate arrhythmias with adverse features; support secondary prevention and rehabilitation.
SRC: NICE CG95, Recent-onset chest pain of suspected cardiac origin: assessment and diagnosis | guidance | 2016 | https://www.nice.org.uk/guidance/cg95
SRC: NICE NG106, Chronic heart failure in adults: diagnosis and management | guidance | 2018 | https://www.nice.org.uk/guidance/ng106
SRC: British Thoracic Society, Guideline for oxygen use in healthcare and emergency settings | guidance | 2017 | https://www.brit-thoracic.org.uk/
SRC: Resuscitation Council UK, Adult advanced life support guidelines (peri-arrest arrhythmias) | guidance | 2021 | https://www.resus.org.uk/library/2021-resuscitation-guidelines
Q: Why are daily weights important in heart failure? | A rapid weight gain shows fluid retention, often before symptoms worsen.
Q: What is cardiac rehabilitation? | A structured programme of exercise, education and support after a cardiac event.
M1#nursing-u10-04-q1@1: What should happen promptly when a patient develops central chest pain? | Record a 12-lead ECG and show it to a clinician immediately | Wait to see if it settles | Give high-flow oxygen to all patients | Discharge with advice | Chest pain needs urgent ECG and assessment via the local pathway.
M2#nursing-u10-04-q2@2: A patient with heart failure has gained 2.5 kg in three days and is more breathless. What does this suggest? | Fluid retention and worsening heart failure: escalate | Improved nutrition | Weighing scale error only | Normal variation | Rapid weight gain with breathlessness suggests fluid overload.
M3#nursing-u10-04-q3@3: A patient on a cardiac monitor develops a heart rate of 36, becomes dizzy and pale, and has a blood pressure of 78/40. What should the nurse do? | Call for urgent help: bradycardia with shock | Recheck the observations in an hour and document | Ask the patient to rest and lie flat for a while | Give a fluid challenge without assessment | Bradycardia with shock is an emergency covered by the peri-arrest algorithm.
MS2#nursing-u10-04-q4@3: Which should be taught to a person with heart failure? | Daily weighing at home ; Recognising worsening breathlessness ; Taking medicines as prescribed | Unlimited salt intake ; Stopping medicines when feeling better | Self-monitoring and adherence reduce admissions.

## Respiratory nursing
S: Respiratory nursing supports adults with acute and long-term lung conditions such as COPD, asthma, pneumonia and lung cancer. Breathlessness is frightening, and good nursing care makes a direct difference to comfort and safety.
O: Assess and manage breathlessness, including positioning, oxygen and inhaler technique
O: Describe nursing care in acute exacerbations of COPD and asthma, including escalation
O: Support self-management, pulmonary rehabilitation and smoking cessation
PRE: Respiratory disease (School 5)
H: Assessing breathing
- Respiratory rate, SpO2 (and target range), work of breathing, ability to speak, colour, cough and sputum, peak flow in asthma, and anxiety.
- Know each person's **prescribed target saturation** (often 94–98%, or 88–92% for people at risk of hypercapnic respiratory failure).
H: Acute exacerbations
- **COPD**: controlled oxygen to target, nebulised bronchodilators (air-driven where hypercapnia is a risk), steroids and antibiotics as prescribed, blood gases when indicated; non-invasive ventilation (NIV) for hypercapnic respiratory failure in specialist areas.
- **Acute asthma**: features of **life-threatening asthma** include SpO2 below 92%, peak flow below 33% of best or predicted, silent chest, cyanosis, poor respiratory effort, exhaustion, confusion or arrhythmia; this is an emergency. Give oxygen to target, nebulised bronchodilators and steroids as prescribed.
- **Pneumonia**: oxygen, antibiotics on time, fluids, chest physiotherapy, early mobilisation, sepsis screening.
H: Nursing interventions
- **Positioning**: sitting upright, leaning forward with arms supported.
- **Breathing techniques**: pursed-lip and paced breathing; a handheld fan can relieve breathlessness.
- **Inhaler technique**: check and teach it, because poor technique is common and reduces benefit.
- **Secretion clearance**: hydration, mobilisation, physiotherapy.
- **Anxiety**: calm presence, explanation and a breathlessness plan.
H: Long-term support
P: **Pulmonary rehabilitation** improves exercise capacity and quality of life in COPD. **Smoking cessation** is the most effective intervention in COPD; offer very brief advice and treatment. Personalised **self-management plans** and rescue packs, vaccinations (influenza, pneumococcal, COVID-19, RSV where eligible) and early palliative care for advanced disease all form part of good care.
K: Know the target saturation, manage breathlessness with positioning, oxygen and technique, escalate life-threatening features, and support self-management and rehabilitation.
!: Driving a nebuliser with high-flow oxygen in a patient with COPD and hypercapnia. Use air with separate controlled oxygen as prescribed.
T: Non-invasive ventilation | Ventilatory support through a mask, used for hypercapnic respiratory failure
T: Pulmonary rehabilitation | A programme of exercise and education for people with chronic lung disease
T: Life-threatening asthma | Asthma with features such as SpO2 below 92%, silent chest, exhaustion or confusion
SUM: Assess breathing fully and know the prescribed target saturation.
SUM: Recognise life-threatening asthma and support COPD and pneumonia treatment.
SUM: Positioning, technique, rehabilitation and smoking cessation improve outcomes.
SRC: British Thoracic Society and SIGN, British guideline on the management of asthma (SIGN 158) | guidance | 2019 | https://www.brit-thoracic.org.uk/
SRC: NICE NG115, Chronic obstructive pulmonary disease in over 16s: diagnosis and management | guidance | 2019 | https://www.nice.org.uk/guidance/ng115
SRC: British Thoracic Society, Guideline for oxygen use in healthcare and emergency settings | guidance | 2017 | https://www.brit-thoracic.org.uk/
Q: Name three features of life-threatening asthma. | SpO2 below 92%, peak flow below 33% of best, silent chest, cyanosis, exhaustion or confusion.
Q: What is the most effective intervention in COPD? | Stopping smoking.
M1#nursing-u10-05-q1@1: Which position usually helps a breathless adult most? | Sitting upright, leaning forward with arms supported | Lying flat | Head-down tilt | Lying on the stomach without assessment | Upright positions improve diaphragm movement and comfort.
M2#nursing-u10-05-q2@3: A patient with asthma has a silent chest, is drowsy and has an SpO2 of 89%. How should this be classified? | Life-threatening asthma: an emergency | Mild asthma | Moderate asthma needing review tomorrow | Anxiety | Silent chest, drowsiness and low saturation are life-threatening features.
M2#nursing-u10-05-q3@2: A patient with COPD uses their inhaler but their symptoms aren't improving. What should the nurse check first? | Inhaler technique | That they have stopped all medicines | Their shoe size | Whether they need antibiotics | Poor technique is common and stops the medicine reaching the lungs.
TF2#nursing-u10-05-q4@1: A handheld fan directed at the face can help relieve breathlessness. | True | Airflow across the face can reduce the sensation of breathlessness.

## Neurological nursing
S: Neurological nursing cares for adults with conditions of the brain, spinal cord and nerves, such as stroke, head injury, epilepsy, Parkinson's disease and multiple sclerosis. Careful neurological observation and early action can prevent permanent harm.
O: Carry out neurological observations, including the Glasgow Coma Scale, and recognise deterioration
O: Describe hyperacute stroke care and the nurse's role in recognition and early management
O: Plan nursing care for adults with epilepsy and long-term neurological conditions
PRE: Neurological disorders (School 5)
H: Neurological observations
- **Glasgow Coma Scale (GCS)**: eye opening (1–4), verbal response (1–5), best motor response (1–6); total 3–15. Record the components, not just the total.
- **Pupils**: size, equality and reaction to light.
- **Limb power** and movement, vital signs (late signs of raised intracranial pressure include rising blood pressure, slowing pulse and irregular breathing).
- A **drop of 2 or more GCS points**, a new pupil change or new limb weakness needs urgent escalation.
H: Stroke
- **Recognise**: FAST (Face, Arms, Speech, Time to call 999), plus sudden visual loss, imbalance or severe headache.
- **Hyperacute care**: urgent brain imaging; **thrombolysis** may be given within 4.5 hours of onset where suitable, and **thrombectomy** for selected people with large vessel occlusion. Know the time last seen well.
- **Nursing priorities**: swallow screening before any oral intake, positioning, early mobilisation, observations, blood glucose, continence, communication support for aphasia, mood, and prevention of complications (aspiration, pressure ulcers, VTE).
H: Epilepsy and seizures
- During a seizure: keep the person safe, don't restrain or put anything in the mouth, time it, recovery position afterwards.
- A seizure lasting **5 minutes or more**, or repeated seizures without recovery, needs emergency treatment (status epilepticus).
- Give anti-seizure medicines on time; missed doses risk seizures.
H: Long-term neurological conditions
P: In **Parkinson's disease**, give medicines exactly on time (time-critical) and assess swallowing and falls risk. In **multiple sclerosis** and **motor neurone disease**, support fatigue, mobility, continence, communication and swallowing, with specialist teams and advance care planning. Many neurological conditions affect mood and cognition, which need assessment and support.
K: Record GCS components, pupils and limb power, escalate a fall of two points or new signs, act fast on stroke and long seizures, and give time-critical medicines on time.
!: Giving a drink to a patient with suspected stroke before a swallow screen. Aspiration is a major risk.
T: Glasgow Coma Scale | A 3–15 scale assessing eye opening, verbal and motor responses
T: Thrombolysis | Clot-dissolving treatment for eligible ischaemic stroke, given within a time window
T: Status epilepticus | A seizure lasting five minutes or more, or repeated seizures without recovery, needing emergency treatment
SUM: Record GCS components, pupils, limb power and vital signs.
SUM: Recognise stroke with FAST; time from onset decides treatment; swallow screen first.
SUM: Manage seizures safely, treat prolonged seizures as an emergency, and give Parkinson's medicines on time.
SRC: NICE NG128, Stroke and transient ischaemic attack in over 16s: diagnosis and initial management | guidance | 2022 | https://www.nice.org.uk/guidance/ng128
SRC: Intercollegiate Stroke Working Party, National clinical guideline for stroke for the UK and Ireland | guidance | 2023 | https://www.strokeguideline.org/
SRC: NICE NG217, Epilepsies in children, young people and adults | guidance | 2022 | https://www.nice.org.uk/guidance/ng217
SAFE: Swallow screening, neurological observations and seizure management follow local protocols and training; time-critical treatment decisions are made by the stroke and medical teams.
Q: What are the three components of the Glasgow Coma Scale? | Eye opening, verbal response and best motor response.
Q: How long must a seizure last to be treated as status epilepticus? | Five minutes or more, or repeated seizures without recovery.
M1#nursing-u10-06-q1@1: What does FAST stand for in stroke recognition? | Face, Arms, Speech, Time | Fever, Ache, Sweating, Tiredness | Fall, Arm, Sight, Talk | Face, Abdomen, Sight, Temperature | FAST helps people recognise stroke and call 999 quickly.
M2#nursing-u10-06-q2@2: A patient's GCS falls from 14 to 11 and one pupil becomes sluggish. What should the nurse do? | Escalate immediately as a neurological emergency | Recheck in four hours | Record only the total score and continue routine checks | Give a sedative because he may be agitated | A two-point fall with a pupil change suggests serious deterioration.
M2#nursing-u10-06-q3@3: A man has sudden right arm weakness and slurred speech that began 40 minutes ago. Why is the time of onset important? | It determines eligibility for time-dependent treatments such as thrombolysis | It isn't important, because all strokes are treated the same | It only matters for documentation | It only decides which ward he will be admitted to | Thrombolysis and thrombectomy depend on the time since onset.
MATCH2#nursing-u10-06-q4@1: Match each GCS component to its maximum score. | Eye opening = 4 ; Verbal response = 5 ; Best motor response = 6 | The maximum total is 15.

## Gastrointestinal nursing
S: Gastrointestinal nursing cares for adults with conditions of the gut, liver and pancreas, such as GI bleeding, inflammatory bowel disease, liver disease and pancreatitis. Nutrition, fluid balance and symptom control are central.
O: Recognise and respond to upper gastrointestinal bleeding
O: Plan nursing care for people with inflammatory bowel disease, liver disease and pancreatitis
O: Support nutrition, bowel care and dignity in gastrointestinal illness
PRE: Gastrointestinal disorders (School 5)
H: Gastrointestinal bleeding
- **Upper GI bleed**: haematemesis (vomiting blood or "coffee grounds") and melaena (black, tarry, offensive stool).
- Signs of significant blood loss: tachycardia, hypotension, pallor, dizziness, reduced urine output.
- Nursing response: ABCDE, large-bore IV access support, observations with NEWS2, blood tests (including group and save or crossmatch), fluid and blood as prescribed, nil by mouth pending endoscopy, and escalation. Risk scores such as Glasgow-Blatchford help the team decide urgency.
- Review anticoagulant and antiplatelet medicines with the team.
H: Inflammatory bowel disease
- Crohn's disease and ulcerative colitis cause diarrhoea, bleeding, pain, weight loss and fatigue.
- **Acute severe ulcerative colitis** (for example, six or more bloody stools a day with signs of systemic illness) needs urgent hospital treatment.
- Nursing care: stool charts (Bristol Stool Chart), fluid and electrolyte balance, nutrition, VTE prophylaxis (IBD increases clot risk), psychological support, and IBD specialist nurse input.
H: Liver disease and pancreatitis
- **Liver disease**: monitor for confusion (hepatic encephalopathy), bleeding (varices, clotting problems), fluid (ascites), infection and nutrition; alcohol withdrawal assessment and support where relevant.
- **Acute pancreatitis**: severe abdominal pain radiating to the back, vomiting; needs analgesia, fluids, close monitoring for organ failure, and nutrition.
H: Nutrition, bowels and dignity
P: Malnutrition is common: screen with MUST and involve dietitians. Bowel symptoms are embarrassing for many people; provide privacy, prompt help with toileting and continence products, and respectful language. Stoma care and support may be needed (School 6).
K: Recognise GI bleeding and act with ABCDE and escalation; support IBD, liver and pancreatic care with careful monitoring, nutrition and dignity.
!: Missing melaena because the stool is dark from iron tablets. Melaena is black, tarry and offensive; if in doubt, report and test.
T: Haematemesis | Vomiting blood, fresh or like coffee grounds
T: Melaena | Black, tarry, offensive stool from upper gastrointestinal bleeding
T: Hepatic encephalopathy | Confusion and altered consciousness caused by liver failure
SUM: Upper GI bleeding presents with haematemesis or melaena and can cause shock.
SUM: IBD, liver disease and pancreatitis need careful monitoring and specialist input.
SUM: Nutrition, bowel care and dignity are central to GI nursing.
SRC: NICE CG141, Acute upper gastrointestinal bleeding in over 16s: management | guidance | 2016 | https://www.nice.org.uk/guidance/cg141
SRC: NICE NG130, Ulcerative colitis: management | guidance | 2019 | https://www.nice.org.uk/guidance/ng130
SRC: NICE NG104, Pancreatitis | guidance | 2018 | https://www.nice.org.uk/guidance/ng104
Q: What is melaena? | Black, tarry, offensive stool caused by upper gastrointestinal bleeding.
Q: Why do people with IBD need VTE prophylaxis in hospital? | Active inflammatory bowel disease increases the risk of blood clots.
M1#nursing-u10-07-q1@1: What does coffee-ground vomit suggest? | Upper gastrointestinal bleeding | Lower urinary tract infection | Normal digestion | Constipation | Altered blood in vomit looks like coffee grounds.
M2#nursing-u10-07-q2@2: A patient with known liver disease becomes increasingly confused and drowsy. What should the nurse consider? | Hepatic encephalopathy, needing urgent medical review | Normal tiredness after a poor night's sleep on the ward | Undiagnosed dementia, to be referred to the memory clinic | A side effect of fresh air | Confusion in liver disease may indicate encephalopathy and needs assessment.
M3#nursing-u10-07-q3@3: A man vomits fresh blood, has a heart rate of 124 and blood pressure of 88/50. What should the nurse do first? | ABCDE assessment, call for urgent help and support IV access and fluid resuscitation | Give him a drink of water and sit him up | Arrange a routine endoscopy for next week and observe | Lie him flat and wait | Haematemesis with shock is an emergency needing immediate assessment and resuscitation.
MS2#nursing-u10-07-q4@3: Which are signs of significant blood loss? | Tachycardia ; Hypotension ; Reduced urine output | Bradycardia with warm, pink skin ; Increased urine output | Blood loss causes compensatory tachycardia, then hypotension and reduced perfusion.

## Renal nursing
S: Renal nursing cares for adults with acute kidney injury and chronic kidney disease, including those on dialysis or with a kidney transplant. Close monitoring of fluid, electrolytes and medicines is central.
O: Recognise and help prevent acute kidney injury in adults
O: Plan care for adults with chronic kidney disease, including dialysis and transplant considerations
O: Monitor fluid balance, electrolytes and medicines safely in renal disease
PRE: Acute kidney injury (School 5)
H: Acute kidney injury (AKI)
- Defined by a rise in serum creatinine (such as 26 µmol/L or more within 48 hours, or 50% or more within 7 days) or urine output below 0.5 mL/kg/hour for more than 6 hours.
- Common causes: dehydration, sepsis, hypotension, nephrotoxic medicines, obstruction.
- **Nursing role**: identify people at risk, monitor urine output and fluid balance, respond to AKI warning alerts, review medicines with the team (for example, the "sick day" approach to temporarily stopping certain medicines when unwell, as advised), treat the cause, and check for urinary retention.
- Escalate high potassium, very low urine output, fluid overload or acidosis.
H: Chronic kidney disease (CKD)
- Staged by eGFR and albumin-to-creatinine ratio.
- Complications include anaemia, bone mineral disorder, high blood pressure, fluid retention, high potassium and cardiovascular disease.
- Nursing care includes blood pressure monitoring, diet advice with a renal dietitian (potassium, phosphate, salt, fluid as prescribed), medicines adjustment, and education.
H: Dialysis and transplantation
- **Haemodialysis**: protect the arteriovenous fistula (no blood pressure cuffs, cannulation or blood tests in that arm); check the thrill and bruit; watch for bleeding and infection of lines.
- **Peritoneal dialysis**: aseptic exchanges, watch for cloudy fluid and abdominal pain (possible peritonitis).
- **Transplant**: lifelong immunosuppression; monitor for rejection and infection; medicines must be taken exactly as prescribed.
- **Conservative kidney management** is a valid choice for some older or frail people, with palliative support.
H: Medicines and renal function
P: Many medicines are excreted by the kidneys and need dose adjustment or avoidance in kidney disease (for example, some antibiotics, opioids such as morphine, and metformin at lower eGFR). NSAIDs, ACE inhibitors, angiotensin receptor blockers and diuretics can worsen AKI in dehydration. Check renal function before giving such medicines and query prescriptions where needed.
K: Spot and prevent AKI through monitoring and medicines review; support CKD, dialysis and transplant patients with fluid, electrolyte, access and medicines care.
!: Taking a blood pressure on the arm with a dialysis fistula. It can damage the fistula, the person's lifeline for dialysis.
T: Acute kidney injury | A sudden fall in kidney function, shown by rising creatinine or falling urine output
T: Arteriovenous fistula | A surgically created connection between an artery and a vein for haemodialysis access
T: Conservative kidney management | Supportive care without dialysis, chosen by some people with advanced kidney disease
SUM: AKI is common and often preventable; monitor urine output, fluids and medicines.
SUM: CKD causes anaemia, bone disease, hypertension and high potassium.
SUM: Protect dialysis access, watch for infection and rejection, and adjust medicines for renal function.
SRC: NICE NG148, Acute kidney injury: prevention, detection and management | guidance | 2019 | https://www.nice.org.uk/guidance/ng148
SRC: NICE NG203, Chronic kidney disease: assessment and management | guidance | 2021 | https://www.nice.org.uk/guidance/ng203
SRC: UK Kidney Association, Clinical practice guidelines | guidance | 2024 | https://ukkidney.org/health-professionals/guidelines
Q: Why mustn't a blood pressure cuff be used on an arm with a dialysis fistula? | It can damage or block the fistula, which is needed for dialysis.
Q: What urine output may indicate AKI in an adult? | Less than 0.5 mL/kg/hour for more than 6 hours.
M1#nursing-u10-08-q1@1: Which finding helps define acute kidney injury? | A rise in creatinine of 26 µmol/L or more within 48 hours | A normal urine output | A low blood glucose | A raised haemoglobin | AKI is defined by a rise in creatinine or a fall in urine output.
M2#nursing-u10-08-q2@2: A patient on peritoneal dialysis has cloudy drainage fluid and abdominal pain. What should the nurse suspect? | Peritonitis: report urgently | Normal dialysis fluid | Constipation only | Dehydration | Cloudy effluent with pain suggests peritonitis, needing urgent treatment.
M3#nursing-u10-08-q3@3: A dehydrated patient with vomiting is prescribed ibuprofen, an ACE inhibitor and a diuretic. What should the nurse do? | Query the prescription, as these medicines can worsen kidney injury in dehydration | Give all the medicines as prescribed | Give the medicines but restrict fluids to protect the heart | Give only the ibuprofen and hold the others until morning | NSAIDs, ACE inhibitors and diuretics can harm kidney function in dehydration; prescribers should review.
TF2#nursing-u10-08-q4@1: Some people with advanced kidney disease choose conservative management rather than dialysis. | True | Conservative kidney management with palliative support is a valid informed choice.

## Endocrine nursing
S: Endocrine nursing cares for adults with hormone disorders such as thyroid disease, adrenal disorders and pituitary conditions. Some endocrine emergencies, such as adrenal crisis, can be fatal if missed.
O: Plan nursing care for adults with thyroid disease, including monitoring and education
O: Recognise and respond to adrenal insufficiency and adrenal crisis, including steroid emergency precautions
O: Describe nursing care for people with pituitary disorders and those on long-term steroids
PRE: Endocrine system (School 2)
H: Thyroid disease
- **Hypothyroidism**: tiredness, weight gain, cold intolerance, constipation, slow pulse; treated with levothyroxine, taken consistently (usually on an empty stomach) with regular blood tests.
- **Hyperthyroidism**: weight loss, anxiety, heat intolerance, tremor, palpitations, fast or irregular pulse; treated with antithyroid medicines, radioactive iodine or surgery.
- **After thyroid surgery**: watch for bleeding and airway compromise (neck swelling, stridor), and for low calcium (tingling around the mouth, cramps) if the parathyroids are affected.
- Thyroid storm and myxoedema coma are rare emergencies.
H: Adrenal insufficiency and crisis
- Causes: Addison's disease (primary), pituitary disease, and **long-term steroid use** suppressing the body's own cortisol.
- **Adrenal crisis**: vomiting, abdominal pain, severe weakness, confusion, hypotension and shock. It is life-threatening and needs **immediate injected hydrocortisone** as prescribed and fluids.
- **Sick day rules**: people on steroid replacement double their dose when unwell with fever and use injectable hydrocortisone if vomiting, as their plan sets out.
- Steroid emergency cards: national guidance requires people at risk of adrenal crisis to carry a **Steroid Emergency Card**, and staff should check for them and avoid missed doses.
H: Pituitary disorders
- Tumours can cause hormone excess (such as acromegaly or Cushing's disease) or deficiency, and visual field loss.
- After pituitary surgery, monitor fluid balance closely for **diabetes insipidus** (large volumes of dilute urine, thirst) and sodium changes.
H: Long-term steroids
P: People on long-term glucocorticoids are at risk of high blood glucose, infection, osteoporosis, mood changes, skin thinning and adrenal suppression. Monitor glucose, protect skin, assess bone health, and never stop steroids suddenly. Missed steroid doses in hospital, especially when nil by mouth, are a recognised cause of harm.
K: Monitor thyroid and pituitary conditions carefully, and treat suspected adrenal crisis as an emergency; never let people on long-term steroids miss doses.
!: Withholding a regular steroid dose because a patient is nil by mouth. They may need an alternative route; ask the prescriber urgently.
T: Adrenal crisis | Life-threatening cortisol deficiency causing shock, needing immediate hydrocortisone
T: Steroid Emergency Card | A card carried by people at risk of adrenal crisis, alerting staff to give emergency steroids
T: Diabetes insipidus | A condition causing large volumes of dilute urine, from lack of or resistance to antidiuretic hormone
SUM: Thyroid disease needs consistent treatment, monitoring and post-operative vigilance.
SUM: Adrenal crisis is an emergency; sick day rules and steroid emergency cards prevent it.
SUM: Monitor fluids after pituitary surgery and manage long-term steroid effects.
SRC: NHS England, National Patient Safety Alert: Steroid Emergency Card to support early recognition and treatment of adrenal crisis in adults | guidance | 2020 | https://www.england.nhs.uk/2020/08/steroid-emergency-card-to-support-early-recognition-and-treatment-of-adrenal-crisis-in-adults/
SRC: Society for Endocrinology, Adrenal crisis: emergency management guidance | guidance | 2023 | https://www.endocrinology.org/
SRC: NICE NG145, Thyroid disease: assessment and management | guidance | 2019 | https://www.nice.org.uk/guidance/ng145
SAFE: Emergency hydrocortisone, fluid management and post-operative airway care follow prescriptions, local protocols and senior input; escalate suspected adrenal crisis immediately.
Q: What are the signs of adrenal crisis? | Vomiting, abdominal pain, severe weakness, confusion, hypotension and shock.
Q: What should a person on steroid replacement do when unwell with a fever? | Follow sick day rules, usually doubling their dose, and use injectable hydrocortisone if vomiting, as their plan advises.
M1#nursing-u10-09-q1@2: What is the purpose of the Steroid Emergency Card? | To flag the risk of adrenal crisis | To record allergies | To show blood glucose results | To book appointments | The card prompts early recognition and treatment of adrenal crisis.
M2#nursing-u10-09-q2@3: After a thyroidectomy, a patient develops neck swelling and noisy breathing. What should the nurse do? | Call for urgent help: possible airway bleed | Give a throat lozenge and sit the patient upright | Wait for the morning ward round to review the wound | Lie the patient flat | Neck haematoma can obstruct the airway and needs immediate action.
M3#nursing-u10-09-q3@1,2: A patient with Addison's disease is vomiting, confused and hypotensive. What is the priority? | Treat as adrenal crisis: urgent escalation and prescribed injected hydrocortisone and fluids | Give oral steroids and observe for an hour | Wait for blood results | Encourage oral fluids and recheck the blood pressure later | Adrenal crisis is life-threatening; injected hydrocortisone mustn't be delayed.
MATCH1#nursing-u10-09-q4@1: Match each condition to a typical feature. | Hypothyroidism = Cold intolerance and weight gain ; Hyperthyroidism = Heat intolerance and tremor ; Diabetes insipidus = Large volumes of dilute urine | Recognising features helps nurses monitor and report.

## Diabetes care
S: Diabetes affects millions of adults in the UK, and people with diabetes are frequent users of every health service. Nurses support day-to-day management, prevent and treat hypo- and hyperglycaemia, and recognise diabetic emergencies.
O: Recognise and treat hypoglycaemia in adults following national guidance
O: Recognise diabetic ketoacidosis and hyperosmolar hyperglycaemic state and escalate them
O: Support safe diabetes care in hospital, including insulin safety, foot care and education
PRE: Diabetes (School 5)
H: Hypoglycaemia
- Blood glucose **below 4.0 mmol/L** ("four is the floor") in people on glucose-lowering medicines.
- Symptoms: sweating, shaking, hunger, palpitations, confusion, drowsiness, odd behaviour; seizures or unconsciousness if severe.
- **Treatment if conscious and able to swallow**: 15–20 g of quick-acting carbohydrate (for example, a measured amount of glucose tablets or fruit juice), recheck after 10–15 minutes, repeat up to three times; then a longer-acting carbohydrate.
- **If unconscious or unable to swallow**: call for help; glucagon IM or IV glucose as per protocol; don't give anything by mouth.
- Look for the cause (missed meal, too much insulin, alcohol, kidney impairment).
H: Diabetic emergencies
- **Diabetic ketoacidosis (DKA)**: usually in type 1 diabetes; high glucose (or known diabetes), raised ketones (blood ketones 3.0 mmol/L or more) and acidosis; symptoms include vomiting, abdominal pain, dehydration, deep rapid breathing and drowsiness. Can occur with near-normal glucose in people taking SGLT2 inhibitors. Needs urgent treatment with fixed-rate insulin, fluids and potassium monitoring.
- **Hyperosmolar hyperglycaemic state (HHS)**: usually in type 2 diabetes; very high glucose and dehydration, often with confusion, developing over days.
H: Diabetes in hospital
- **Insulin safety**: write "units" in full; use insulin syringes or pens, never IV syringes, to measure insulin; check the right insulin, dose and time against food; never omit basal insulin in type 1 diabetes.
- Monitor capillary glucose as planned, and more often when unwell, fasting or on steroids.
- Allow and support **self-management** where people are able and wish to.
- **Foot checks** on admission and regularly: people with diabetes are at high risk of heel ulcers in hospital.
- Involve the diabetes specialist team, especially for people on insulin pumps or with poor control.
H: Education and long-term care
P: Structured education (such as DAFNE for type 1 and DESMOND for type 2), annual reviews (eyes, feet, kidneys, blood pressure, cholesterol, HbA1c), sick day guidance and driving rules all support people to live well with diabetes.
K: Treat glucose below 4.0 mmol/L promptly, recognise DKA and HHS as emergencies, keep insulin safe, protect feet and support self-management.
!: Withholding all insulin from a person with type 1 diabetes because they aren't eating. Without basal insulin they can develop DKA within hours.
T: Hypoglycaemia | Blood glucose below 4.0 mmol/L in a person on glucose-lowering treatment
T: Diabetic ketoacidosis | A life-threatening state of high ketones and acidosis, usually in type 1 diabetes
T: Hyperosmolar hyperglycaemic state | A life-threatening state of very high glucose and dehydration, usually in type 2 diabetes
SUM: Four is the floor: treat hypoglycaemia with quick-acting carbohydrate and recheck.
SUM: DKA and HHS are emergencies; DKA can occur at near-normal glucose with SGLT2 inhibitors.
SUM: Never omit basal insulin in type 1 diabetes; check feet; support self-management.
SRC: Joint British Diabetes Societies for Inpatient Care, The hospital management of hypoglycaemia in adults with diabetes mellitus | guidance | 2023 | https://abcd.care/joint-british-diabetes-societies-jbds-inpatient-care-group
SRC: Joint British Diabetes Societies for Inpatient Care, The management of diabetic ketoacidosis in adults | guidance | 2023 | https://abcd.care/joint-british-diabetes-societies-jbds-inpatient-care-group
SRC: NICE NG17, Type 1 diabetes in adults: diagnosis and management | guidance | 2022 | https://www.nice.org.uk/guidance/ng17
SRC: NHS England, National Patient Safety Alert on insulin safety and the right syringe | guidance | 2016 | https://www.england.nhs.uk/
SAFE: Hypoglycaemia treatment, insulin administration and DKA protocols must follow local policy and prescriptions; IV glucose and fixed-rate insulin are given only by staff trained and authorised to do so.
Q: Below which blood glucose level is hypoglycaemia treated in people on glucose-lowering medicines? | Below 4.0 mmol/L.
Q: Why must basal insulin not be omitted in type 1 diabetes? | Without it, diabetic ketoacidosis can develop within hours.
M1#nursing-u10-10-q1@1: A conscious patient's blood glucose is 3.2 mmol/L. What should the nurse give first? | 15–20 g of quick-acting carbohydrate, then recheck in 10–15 minutes | A large meal and no recheck | Her usual insulin dose with lunch | Nothing until the next meal, then recheck | Quick-acting carbohydrate treats hypoglycaemia quickly, followed by a recheck.
M2#nursing-u10-10-q2@3: A patient with type 2 diabetes on an SGLT2 inhibitor is vomiting, with abdominal pain and blood ketones of 4.1 mmol/L, but glucose is 10.5 mmol/L. What should the nurse suspect? | Diabetic ketoacidosis | Gastroenteritis only, as glucose is near normal | Hypoglycaemia | Normal side effects | Euglycaemic DKA is a recognised risk with SGLT2 inhibitors and is an emergency.
M3#nursing-u10-10-q3@2,3: A patient with type 1 diabetes is nil by mouth for surgery and the night nurse has omitted the evening long-acting insulin. What is the risk and response? | Risk of DKA: inform the team urgently | No risk, because insulin isn't needed when not eating | Hypoglycaemia only, so give glucose | Wait until after surgery to decide on insulin | Basal insulin is needed even when fasting; omissions risk DKA.
MS2#nursing-u10-10-q4@3: Which are part of safe insulin practice? | Writing "units" in full ; Using an insulin syringe or pen ; Checking the insulin against food intake | Drawing insulin up with an IV syringe ; Abbreviating units to "U" | Insulin errors are common and preventable with these safeguards.

## Oncology nursing
S: Oncology nursing supports adults through cancer diagnosis, treatment and beyond. Nurses manage treatment side effects, recognise oncological emergencies and provide information and emotional support.
O: Describe nursing care for adults receiving chemotherapy, radiotherapy and newer cancer treatments
O: Recognise oncological emergencies, including neutropenic sepsis and metastatic spinal cord compression
O: Support people with cancer through information, holistic needs assessment and psychological care
PRE: Cancer (School 5)
H: Treatments and side effects
- **Chemotherapy**: nausea and vomiting, fatigue, hair loss, mucositis, bone marrow suppression (infection, bleeding, anaemia), neuropathy. Given only by trained, assessed staff, with safe handling of cytotoxic drugs and waste.
- **Radiotherapy**: skin reactions, fatigue, and effects depending on the site (such as diarrhoea, difficulty swallowing).
- **Immunotherapy**: immune-related side effects (such as colitis, pneumonitis, hepatitis, endocrine problems) which may appear late and need prompt reporting.
- **Targeted therapies** and hormone therapies, each with specific side effects.
H: Oncological emergencies
- **Neutropenic sepsis**: suspect in anyone who feels unwell or has a temperature above 38°C during or after chemotherapy; give empirical antibiotics within **1 hour** of arrival, following local protocol. Use acute oncology helplines.
- **Metastatic spinal cord compression**: new back or neck pain, especially in people with cancer, plus leg weakness, sensory changes, or bladder or bowel dysfunction; needs urgent imaging and treatment to prevent paralysis. Keep the person lying flat if pain or instability is suspected, according to local guidance.
- **Hypercalcaemia**: thirst, confusion, constipation, drowsiness.
- **Superior vena cava obstruction**: facial and arm swelling, breathlessness.
- **Tumour lysis syndrome**: electrolyte disturbances after starting treatment for some cancers.
H: Information and support
- **Holistic needs assessment** identifies physical, emotional, practical and spiritual concerns.
- A named **clinical nurse specialist** (key worker) supports people through treatment.
- Discuss fertility, work, finances, body image and relationships.
- Screen for distress and refer to psychological support.
- Support living with and beyond cancer, including late effects and recurrence concerns.
K: Manage treatment side effects, recognise neutropenic sepsis and spinal cord compression as emergencies, and support the whole person with information and holistic assessment.
!: Waiting for a fever to suspect neutropenic sepsis. Feeling unwell after chemotherapy is enough to act on.
T: Neutropenic sepsis | Sepsis in a person with a low neutrophil count, usually after chemotherapy; a medical emergency
T: Metastatic spinal cord compression | Compression of the spinal cord by cancer, which can cause paralysis without urgent treatment
T: Holistic needs assessment | A structured assessment of a person's physical, emotional, practical and spiritual concerns
SUM: Chemotherapy, radiotherapy and immunotherapy have different side effects to monitor.
SUM: Neutropenic sepsis and spinal cord compression need urgent action.
SUM: Holistic needs assessment and key workers support the whole person.
SRC: NICE CG151, Neutropenic sepsis: prevention and management in people with cancer | guidance | 2012 | https://www.nice.org.uk/guidance/cg151
SRC: NICE NG234, Spinal metastases and metastatic spinal cord compression | guidance | 2023 | https://www.nice.org.uk/guidance/ng234
SRC: UK Oncology Nursing Society, Oncology/haematology 24-hour triage tool | guidance | 2023 | https://www.ukons.org/
SAFE: Chemotherapy and other systemic anti-cancer therapies are given only by staff trained and assessed for them, with safe handling of cytotoxic drugs; follow local acute oncology protocols for emergencies.
Q: Within what time should antibiotics be given in suspected neutropenic sepsis? | Within one hour of arrival, following local protocol.
Q: Name three signs of metastatic spinal cord compression. | New back pain, leg weakness, sensory changes, and bladder or bowel dysfunction.
M1#nursing-u10-11-q1@1: Which is a common side effect of chemotherapy? | Bone marrow suppression | Increased hair growth | Weight gain from muscle | Improved appetite | Chemotherapy often suppresses the bone marrow, raising infection and bleeding risks.
M2#nursing-u10-11-q2@3: A man with prostate cancer reports new back pain and his legs "feel heavy." What should the nurse do? | Escalate urgently as possible metastatic spinal cord compression | Give analgesia and review next week | Encourage more walking to ease the stiffness | Advise rest at home and a GP review if it persists | New back pain with leg symptoms in cancer is an emergency.
M2#nursing-u10-11-q3@2: A woman receiving immunotherapy develops new diarrhoea several weeks after her last dose. What should the nurse do? | Treat it as a possible immune-related side effect and escalate per the acute oncology protocol | Assume it is unrelated to treatment given the time since the last dose | Advise loperamide without assessment | Wait to discuss it at her next treatment cycle | Immune-related colitis can be serious and can appear late.
TF2#nursing-u10-11-q4@1: Holistic needs assessment includes emotional, practical and spiritual concerns as well as physical symptoms. | True | It identifies the whole range of a person's concerns to plan support.

## Haematology nursing
S: Haematology nursing cares for adults with blood disorders such as anaemia, sickle cell disease, bleeding and clotting disorders, and blood cancers. Safe blood transfusion is a core haematology nursing responsibility.
O: Describe the principles and nursing responsibilities of safe blood transfusion
O: Recognise and respond to transfusion reactions
O: Plan nursing care for adults with sickle cell disease, anaemia and anticoagulation
PRE: Haematological disorders (School 5)
H: Safe transfusion
- Transfusions must be **prescribed** with a documented indication, and the patient **consented** where possible.
- **Positive patient identification** at every step: sampling, collection and administration, using the identity band.
- **Bedside checks**: patient identity matches the blood component label and prescription; component type, blood group compatibility, expiry date, special requirements (such as irradiated) and integrity of the pack.
- **Observations**: before starting, 15 minutes after the start of each unit, and at the end, plus whenever the patient feels unwell.
- Complete transfusion within the time limits in local policy.
- Errors and reactions are reported to the **Serious Hazards of Transfusion (SHOT)** scheme and the MHRA (SABRE).
H: Transfusion reactions
- Signs: fever, rigors, rash, itching, breathlessness, hypotension, tachycardia, back or loin pain, feeling of impending doom.
- **Action**: stop the transfusion, keep the line open with saline as prescribed, check the patient's ID against the unit, call for urgent medical review, and follow local reaction protocols. Severe reactions (such as anaphylaxis or ABO incompatibility) are emergencies.
- **Transfusion-associated circulatory overload (TACO)**: breathlessness and raised blood pressure from fluid overload; assess risk (such as heart failure, low weight, older age).
H: Sickle cell disease
- **Painful crisis**: severe pain; NICE recommends analgesia within **30 minutes** of presentation and regular reassessment.
- Watch for **acute chest syndrome** (chest pain, breathlessness, fever, falling saturation), stroke and infection.
- Keep warm, hydrated and oxygenated; involve the haematology team.
- Listen to the person, who often knows their condition best, and avoid stigmatising assumptions about pain relief.
H: Anaemia and anticoagulation
- **Anaemia**: fatigue, breathlessness, pallor; identify the cause (iron deficiency, B12, blood loss).
- **Anticoagulants**: monitor for bleeding; know the reversal agents and local policies; check doses, interactions and renal function; educate patients on signs of bleeding and carrying an anticoagulant alert card.
K: Transfuse safely with positive ID, bedside checks and observations; stop and escalate if a reaction occurs; treat sickle cell pain promptly and respectfully.
!: Collecting a blood unit for the wrong patient or skipping the bedside check. ABO-incompatible transfusion can be fatal and is a never event.
T: Positive patient identification | Actively confirming a person's identity against their ID band and documentation at each step
T: SHOT | Serious Hazards of Transfusion, the UK haemovigilance scheme
T: Acute chest syndrome | A serious complication of sickle cell disease with chest pain, fever, breathlessness and low oxygen
SUM: Safe transfusion relies on prescription, consent, positive ID, bedside checks and observations.
SUM: Stop a transfusion at the first sign of a reaction and escalate.
SUM: Give sickle cell analgesia within 30 minutes; monitor anticoagulants for bleeding.
SRC: British Society for Haematology, Guideline on the administration of blood components | guidance | 2017 | https://b-s-h.org.uk/guidelines
SRC: NICE NG24, Blood transfusion | guidance | 2015 | https://www.nice.org.uk/guidance/ng24
SRC: NICE CG143, Sickle cell disease: managing acute painful episodes in hospital | guidance | 2012 | https://www.nice.org.uk/guidance/cg143
SRC: Serious Hazards of Transfusion (SHOT), Annual report | primary | 2024 | https://www.shotuk.org/
SAFE: Blood components are administered only by staff trained and competency-assessed in transfusion, following local policy at every step.
Q: When should observations be taken during a transfusion? | Before starting, 15 minutes after starting each unit, at the end, and whenever the patient feels unwell.
Q: Within how long should analgesia be given for a sickle cell painful crisis? | Within 30 minutes of presentation.
M1#nursing-u10-12-q1@2: What is the first action if a patient develops a fever and rigors during a transfusion? | Stop the transfusion and call for urgent medical review | Speed up the transfusion | Give paracetamol and continue without review | Finish the unit then report | Suspected reactions require stopping the transfusion and urgent assessment.
M2#nursing-u10-12-q2@3: A woman with sickle cell disease arrives in severe pain. How quickly should she receive analgesia? | Within 30 minutes | After all blood tests are back | Within four hours | Only after a full assessment by the consultant | NICE recommends analgesia within 30 minutes for painful crises.
M3#nursing-u10-12-q3@1,2: During a transfusion, an older patient with heart failure becomes breathless with a rising blood pressure and crackles. What is the likely problem? | Transfusion-associated circulatory overload: stop and escalate | Normal response to transfusion | Hypoglycaemia from not eating during the transfusion | Anxiety about the transfusion, needing reassurance only | TACO is fluid overload; risk is higher in heart failure and older age.
SEQ2#nursing-u10-12-q4@1: Put these transfusion steps in order. | Confirm prescription and consent ; Take baseline observations ; Perform the bedside identity check ; Start the transfusion ; Observe at 15 minutes ; Observe at the end | Checks and baseline observations come before starting; monitoring continues throughout.

## Musculoskeletal nursing
S: Musculoskeletal nursing cares for adults with bone, joint and muscle conditions, including fractures, joint replacements and arthritis. Neurovascular observations, pain control and early mobilisation are central.
O: Carry out neurovascular observations and recognise compartment syndrome
O: Describe nursing care for adults with hip fracture and joint replacement
O: Support mobility, pain management and bone health in musculoskeletal conditions
PRE: Musculoskeletal disease (School 5)
H: Neurovascular observations
- Check the affected limb for **colour, warmth, capillary refill, pulses, sensation and movement**, compared with the other limb.
- **Compartment syndrome**: rising pressure within a muscle compartment (for example, after fractures, crush injuries or tight casts). The key early sign is **pain out of proportion** to the injury and **pain on passive stretch**; numbness, pallor and absent pulses are late signs. It is a surgical emergency.
- Elevate the limb as appropriate, loosen tight dressings or split casts per local guidance, and escalate urgently.
H: Hip fracture
- Common in older people after falls; associated with high mortality.
- National guidance recommends surgery on the day of, or the day after, admission, with **orthogeriatric** care.
- Nursing care: effective analgesia (including nerve blocks), delirium prevention and screening, pressure ulcer prevention, nutrition, VTE prophylaxis, early mobilisation (usually the day after surgery), continence and falls and bone health assessment.
H: Joint replacement
- Monitor wound, pain, neurovascular status and observations; follow any movement precautions the surgical team specifies.
- Early mobilisation with physiotherapy; VTE prophylaxis; infection prevention.
- Watch for dislocation, infection and VTE.
H: Arthritis and bone health
- **Osteoarthritis**: pain, stiffness; exercise, weight management and analgesia.
- **Rheumatoid arthritis**: inflammatory; disease-modifying drugs that may suppress immunity, needing monitoring.
- **Osteoporosis**: fracture risk assessment (FRAX or QFracture), calcium, vitamin D, bone-protecting medicines and falls prevention.
K: Check neurovascular status, treat disproportionate pain as possible compartment syndrome, and support early surgery, mobilisation and bone health for hip fracture and arthritis.
!: Increasing analgesia for escalating limb pain without considering compartment syndrome. Pain out of proportion is an emergency sign.
T: Neurovascular observations | Checks of colour, warmth, capillary refill, pulses, sensation and movement in a limb
T: Compartment syndrome | Raised pressure in a muscle compartment that compromises circulation and needs urgent surgery
T: Orthogeriatric care | Joint care of older patients with fractures by orthopaedic and geriatric medicine teams
SUM: Neurovascular observations detect compromise early.
SUM: Compartment syndrome is an emergency; early signs are disproportionate pain and pain on passive stretch.
SUM: Hip fracture care is time-critical and multidisciplinary; bone health prevents further fractures.
SRC: NICE CG124, Hip fracture: management | guidance | 2023 | https://www.nice.org.uk/guidance/cg124
SRC: Royal College of Physicians, National Hip Fracture Database annual report | primary | 2024 | https://www.nhfd.co.uk/
SRC: British Orthopaedic Association, BOAST: Diagnosis and management of compartment syndrome of the limbs | guidance | 2016 | https://www.boa.ac.uk/standards-guidance/boasts.html
Q: What is the earliest sign of compartment syndrome? | Pain out of proportion to the injury, especially on passive stretch.
Q: When should surgery for hip fracture usually happen? | On the day of, or the day after, admission.
M1#nursing-u10-13-q1@1: Which is part of neurovascular observations? | Capillary refill and sensation in the limb | Blood glucose | Peak flow | Urinalysis | Neurovascular checks assess circulation, sensation and movement.
M2#nursing-u10-13-q2@2: A patient with a new forearm cast reports severe, increasing pain not relieved by analgesia, worse when the fingers are moved. What should the nurse do? | Escalate urgently as possible compartment syndrome | Give more analgesia and recheck tomorrow | Elevate the arm above the head and leave it | Encourage hand exercises | Disproportionate pain and pain on passive stretch suggest compartment syndrome.
M2#nursing-u10-13-q3@3: Why is delirium screening important after hip fracture? | Delirium is common after hip fracture and worsens outcomes | Hip fracture never causes confusion | It is only needed for younger patients | It replaces pain assessment | Older adults with hip fracture are at high risk of delirium.
MS2#nursing-u10-13-q4@2: Which are part of nursing care after hip fracture surgery? | Mobilising the day after surgery where possible ; Pressure ulcer prevention ; Falls and bone health assessment | Prolonged bed rest ; Withholding analgesia to assess pain | Early mobilisation and prevention of complications improve recovery.

## Dermatology nursing
S: Dermatology nursing cares for adults with skin conditions, from eczema and psoriasis to leg ulcers, cellulitis and serious drug reactions. Skin conditions affect comfort, sleep, self-esteem and daily life.
O: Describe nursing care for common inflammatory skin conditions, including emollient therapy
O: Recognise cellulitis, leg ulcers and serious skin emergencies such as Stevens-Johnson syndrome
O: Support people psychologically and practically with skin conditions, including across skin tones
PRE: Skin conditions (School 5)
H: Common inflammatory conditions
- **Eczema**: dry, itchy, inflamed skin; managed with **emollients** (applied generously and often, in the direction of hair growth), topical steroids as prescribed, and avoiding triggers.
- **Psoriasis**: raised, scaly plaques; topical treatments, phototherapy, and systemic or biological therapies for severe disease, with monitoring.
- Emollient fire safety: paraffin-based and other emollients soaked into fabric can make clothing and bedding more flammable; advise people not to smoke or go near naked flames.
H: Infections, ulcers and wounds
- **Cellulitis**: spreading redness, warmth, swelling and pain, usually of the leg; mark the edge, monitor for spread and sepsis, elevate, give antibiotics as prescribed.
- **Leg ulcers**: venous (moderate exudate, around the ankle, often with oedema and skin changes) or arterial (punched-out, painful, on the foot, with poor pulses). Assess with Doppler (ankle-brachial pressure index) before compression.
- Pressure ulcers and wound care are covered in School 6.
H: Skin emergencies
- **Stevens-Johnson syndrome and toxic epidermal necrolysis**: rare, severe reactions, often to medicines, with widespread blistering, skin loss and mucosal involvement; stop the suspected drug and escalate as an emergency.
- **Erythroderma**: inflammation affecting most of the skin surface, causing heat loss, fluid loss and infection risk.
- **Necrotising fasciitis**: severe pain out of proportion to visible skin changes, rapid spread; a surgical emergency.
H: Living with a skin condition
P: Visible skin conditions can lead to stigma, low mood, anxiety and sleep loss from itching. Ask about the impact, offer support and signpost to patient organisations. Describe skin findings accurately across skin tones: redness may look purple, brown or grey on darker skin.
K: Use emollients generously, recognise cellulitis and ulcer types, act fast on blistering drug reactions and severe pain, and support the person's wellbeing.
!: Applying compression bandaging to a leg ulcer without vascular assessment. Arterial disease makes compression dangerous.
T: Emollient | A moisturising treatment that soothes and protects dry skin
T: Cellulitis | A bacterial infection of the deeper skin and subcutaneous tissue
T: Stevens-Johnson syndrome | A rare, severe skin and mucous membrane reaction, usually to medicines
SUM: Emollients and topical treatments underpin eczema and psoriasis care.
SUM: Mark and monitor cellulitis; assess leg ulcers before compression.
SUM: Blistering drug reactions and necrotising fasciitis are emergencies; support psychological wellbeing.
SRC: NICE Clinical Knowledge Summaries, Eczema: atopic | guidance | 2023 | https://cks.nice.org.uk/topics/eczema-atopic/
SRC: NICE NG141, Cellulitis and erysipelas: antimicrobial prescribing | guidance | 2019 | https://www.nice.org.uk/guidance/ng141
SRC: Medicines and Healthcare products Regulatory Agency, Emollients and risk of severe and fatal burns | guidance | 2020 | https://www.gov.uk/drug-safety-update/emollients-new-information-about-risk-of-severe-and-fatal-burns-with-paraffin-containing-and-paraffin-free-emollients
SRC: Scottish Intercollegiate Guidelines Network, SIGN 120: Management of chronic venous leg ulcers | guidance | 2010 | https://www.sign.ac.uk/
Q: Why must leg ulcers be assessed with Doppler before compression? | Compression can be dangerous if arterial disease is present.
Q: What fire risk do emollients carry? | Emollients soaked into fabric can make clothing and bedding more flammable.
M1#nursing-u10-14-q1@2: How should emollients usually be applied? | Generously and often, smoothed in the direction of hair growth | Sparingly once a week | Rubbed vigorously against hair growth | Only when the skin bleeds | Generous, frequent application in the direction of hair growth reduces irritation.
M2#nursing-u10-14-q2@2: A patient started a new antibiotic five days ago and now has blistering skin and mouth ulcers. What should the nurse do? | Escalate urgently as a serious drug reaction | Apply emollient to the blisters and observe for a day | Give the next dose as prescribed | Reassure her that drug rashes are common and settle | Blistering with mucosal involvement suggests SJS/TEN, a medical emergency.
M3#nursing-u10-14-q3@3: A patient's leg is red and swollen but her pain is severe, out of proportion to the skin appearance, and she is becoming unwell quickly. What should the nurse suspect? | Necrotising fasciitis: escalate as a surgical emergency | Simple cellulitis needing oral antibiotics next week | Eczema flare | A muscle strain | Disproportionate pain and rapid deterioration suggest necrotising fasciitis.
MATCH1#nursing-u10-14-q4@2: Match each leg ulcer type to a typical feature. | Venous ulcer = Around the ankle with oedema ; Arterial ulcer = Punched-out on the foot with poor pulses | Ulcer type guides safe treatment.

## Infection and infectious disease
S: Adult nurses care for people with a wide range of infections, from urinary and chest infections to HIV, tuberculosis and imported infections. This lesson focuses on the nursing care of the adult with an infectious disease; infection prevention systems are covered in School 8.
O: Plan nursing care for an adult with a common infection, including monitoring for sepsis
O: Describe nursing care for adults living with HIV, viral hepatitis and tuberculosis
O: Recognise imported and notifiable infections and the steps to take
PRE: Healthcare-associated infections (School 8)
H: Caring for an adult with infection
- Observations with NEWS2 and sepsis screening; escalate deterioration.
- Take specimens (blood cultures, urine, sputum, wound swabs) before antibiotics where it won't delay treatment.
- Give antimicrobials on time and support review at 48–72 hours.
- Fluids, nutrition, fever management and comfort.
- Apply the right precautions and explain them to the person.
H: Long-term infections
- **HIV**: lifelong antiretroviral therapy; adherence is vital; with an undetectable viral load people live a normal life expectancy and don't transmit HIV sexually. Ask about interactions with other medicines. Offer routine opt-out HIV testing where policy recommends.
- **Hepatitis B and C**: monitor liver function; hepatitis C is curable with antiviral treatment; offer hepatitis B vaccination to contacts.
- **Tuberculosis**: months of treatment with several drugs; **directly observed therapy** may be used to support adherence; monitor for side effects (such as liver toxicity and visual changes with some drugs); airborne precautions while infectious.
- Address **stigma**, confidentiality and the social factors (housing, substance use, migration status) that affect access to care.
H: Imported and notifiable infections
- Ask about **travel history** in anyone with fever.
- **Malaria** must be excluded urgently in fever after travel to an endemic area.
- Rare high-consequence infectious diseases (such as viral haemorrhagic fevers) need immediate isolation and specialist advice; follow the "identify, isolate, inform" approach.
- **Notifiable diseases** are reported by the clinician to the health protection team.
H: Older adults and infection
P: Older people may not mount a fever, may present with confusion, falls or reduced function, and are at higher risk of sepsis. Urine dipsticks aren't reliable in people over 65, so assess clinically.
K: Monitor for sepsis, give antimicrobials on time, support people with long-term infections without stigma, and always ask about travel.
!: Missing infection in an older person because they have no fever. Confusion, falls or reduced function may be the only signs.
T: Directly observed therapy | Treatment in which a health worker watches the person take each dose, used to support adherence in TB
T: Antiretroviral therapy | Combination medicines that suppress HIV
T: Identify, isolate, inform | The initial approach to a suspected high-consequence infectious disease
SUM: Monitor, sample, treat on time and screen for sepsis.
SUM: Support adherence and fight stigma in HIV, hepatitis and TB.
SUM: Ask about travel; isolate and inform for high-consequence infections.
SRC: British HIV Association, Guidelines for the treatment of adults living with HIV | guidance | 2023 | https://www.bhiva.org/guidelines
SRC: NICE NG33, Tuberculosis | guidance | 2024 | https://www.nice.org.uk/guidance/ng33
SRC: UK Health Security Agency, Viral haemorrhagic fever: algorithm and guidance on management of patients | guidance | 2024 | https://www.gov.uk/government/publications/viral-haemorrhagic-fever-algorithm-and-guidance-on-management-of-patients
Q: What is directly observed therapy? | Treatment where a health worker watches each dose being taken, often used in TB.
Q: Why is adherence important in HIV treatment? | It keeps the virus suppressed, protects health and prevents resistance.
M1#nursing-u10-15-q1@1: What should be asked of every adult with fever? | Recent travel history | Their favourite food | Their shoe size | Their star sign | Travel history identifies imported infections such as malaria.
M2#nursing-u10-15-q2@2: A patient being treated for TB develops yellowing of the eyes. What should the nurse do? | Report it urgently, as some TB drugs can cause liver toxicity | Reassure them it is normal | Stop all fluids | Ignore it until the end of treatment | Jaundice may indicate drug-induced liver injury.
M3#nursing-u10-15-q3@3: An adult returning from West Africa has fever, bleeding gums and vomiting. What is the immediate priority? | Isolate and get urgent specialist advice | Place them in a shared bay and observe overnight | Discharge with paracetamol and advice to return if worse | Wait for routine blood tests | Possible viral haemorrhagic fever needs immediate isolation and specialist advice.
TF2#nursing-u10-15-q4@2: People with HIV on effective treatment with an undetectable viral load don't transmit HIV sexually. | True | This is the evidence behind "undetectable = untransmittable".

## Older adult care
S: Older adults make up most hospital inpatients and many community caseloads. Caring for them well means recognising atypical presentations, preventing harm and keeping the person's independence, dignity and preferences at the centre.
O: Use comprehensive geriatric assessment principles and recognise geriatric syndromes
O: Prevent, recognise and manage delirium, falls and functional decline
O: Provide dignified, person-centred care for older people, including those living with dementia
PRE: Age-related physiological changes (School 2)
H: Geriatric syndromes
P: Older people often present with **falls**, **delirium**, **incontinence**, **immobility** and **functional decline** rather than classic symptoms of the underlying illness. These "geriatric syndromes" usually have several causes and need a systematic search, not acceptance as "just old age".
H: Comprehensive geriatric assessment
- A multidimensional, multidisciplinary assessment of medical, functional, psychological and social needs, leading to a coordinated plan.
- Includes medicines review (deprescribing where appropriate, using tools such as STOPP/START), nutrition, continence, mobility, cognition, mood and social support.
H: Delirium
- An **acute, fluctuating** disturbance of attention and awareness; can be hyperactive, **hypoactive** (quiet and easily missed) or mixed.
- Screen with the **4AT** on admission and when there is a change.
- Find and treat causes: infection, pain, constipation, urinary retention, dehydration, medicines, hypoxia, alcohol withdrawal.
- Non-drug care: orientation, glasses and hearing aids, familiar people, sleep, hydration, mobilisation, avoiding unnecessary moves. Avoid sedation unless there is risk of harm.
H: Falls
- Multifactorial falls risk assessment and interventions in hospital (lying and standing blood pressure, medicines review, continence, footwear, vision, cognition, walking aids within reach, call bell).
- After a fall: check for injury before moving, use flat lifting equipment if a hip or spinal injury is suspected, observe for head injury (especially on anticoagulants), and report.
H: Dignity and dementia
P: Provide personal care with dignity, use the person's preferred name, support eating and drinking, and use "This is me" or similar documents for people living with dementia. Involve carers, consider John's Campaign (the right of carers to stay with people with dementia), and recognise distress as a form of communication.
K: Look for causes behind falls, delirium and functional decline, use comprehensive assessment, and protect dignity and independence.
!: Missing hypoactive delirium in a quiet, sleepy older patient. Screen with the 4AT; hypoactive delirium is common and serious.
T: Geriatric syndromes | Common presentations in older people, such as falls and delirium, with multiple underlying causes
T: Comprehensive geriatric assessment | A multidisciplinary assessment of medical, functional, psychological and social needs
T: 4AT | A rapid screening tool for delirium
SUM: Geriatric syndromes need a systematic search for causes.
SUM: Screen for delirium with the 4AT and treat causes; prevent falls with multifactorial interventions.
SUM: Dignity, carers and person-centred approaches are central, especially in dementia.
SRC: British Geriatrics Society, Comprehensive Geriatric Assessment toolkit | guidance | 2019 | https://www.bgs.org.uk/
SRC: NICE CG103, Delirium: prevention, diagnosis and management in hospital and long-term care | guidance | 2023 | https://www.nice.org.uk/guidance/cg103
SRC: NICE NG249, Falls: assessment and prevention in older people and in people 50 and over at higher risk | guidance | 2025 | https://www.nice.org.uk/guidance/ng249
SRC: The 4AT rapid clinical test for delirium | guidance | 2018 | https://www.the4at.com/
Q: What are geriatric syndromes? | Common presentations in older people, such as falls, delirium and incontinence, with multiple underlying causes.
Q: What is hypoactive delirium? | A form of delirium in which the person is quiet, withdrawn and sleepy, which is easily missed.
M1#nursing-u10-16-q1@1: Which tool is used to screen for delirium? | The 4AT | MUST | Waterlow | NEWS2 | The 4AT is a rapid, validated delirium screening tool.
M2#nursing-u10-16-q2@2: An older woman is found on the floor and complains of hip pain. What should the nurse do before moving her? | Check for injury and use flat lifting equipment if a hip injury is suspected | Help her stand up straight away to check she can weight-bear | Lift her by the arms back into bed with a colleague | Leave her until the next shift | Suspected fractures need assessment and safe lifting to avoid further harm.
M3#nursing-u10-16-q3@2,3: An 86-year-old on a medical ward has become quiet, sleepy and less engaged over two days. What is the best response? | Screen for hypoactive delirium with the 4AT and look for causes | Assume she is tired after the infection and let her sleep | Record it as normal ageing and continue routine care | Start sedation | Hypoactive delirium is common, serious and often missed.
MS2#nursing-u10-16-q4@3: Which reduce delirium risk in older inpatients? | Glasses and hearing aids available ; Hydration and mobilisation ; Avoiding unnecessary bed moves | Routine night sedation ; Frequent ward transfers | Multicomponent interventions prevent delirium.

## Frailty
S: Frailty is a state of reduced physiological reserve that makes people vulnerable to sudden, disproportionate declines after minor events. Recognising it changes how adults are assessed, treated and supported.
O: Describe frailty and how it is identified, including the Clinical Frailty Scale
O: Recognise frailty syndromes and their significance
O: Plan proportionate, person-centred care for people living with frailty, including advance care planning
PRE: Older adult care
H: What frailty is
P: Frailty is a long-term condition related to ageing, in which several body systems gradually lose their reserves. It isn't the same as age, disability or multimorbidity, though it often coexists with them. A minor stressor (such as a new medicine or a urine infection) can cause a large change in health, such as going from walking independently to being bed-bound or confused.
H: Identifying frailty
- **Clinical Frailty Scale (CFS)**: a 1–9 scale from very fit to terminally ill, based on function before the current illness (usually two weeks before). It is validated for people aged 65 and over, and shouldn't be used alone for younger people or those with stable long-term disabilities.
- **Electronic Frailty Index** in primary care, and gait speed or "timed up and go" tests.
- Ask about function before the current illness.
H: Frailty syndromes
- Falls, immobility ("off legs"), delirium, incontinence, and susceptibility to side effects of medicines.
- These are often the presenting features of acute illness in frail people.
H: Care for people with frailty
- **Comprehensive geriatric assessment** and frailty units or same day frailty services.
- **Proportionate care**: balancing the benefits and burdens of investigations and treatments with the person's goals.
- **Medicines review** and deprescribing.
- **Strength and balance** exercise, nutrition (including protein), and social support.
- **Advance care planning** and treatment escalation plans (such as ReSPECT), discussed with the person and family.
K: Frailty is reduced reserve, identified with tools like the Clinical Frailty Scale; care should be proportionate, comprehensive and centred on the person's goals.
!: Using frailty as a reason to withhold appropriate treatment without discussion. Frailty informs shared decisions; it doesn't make them.
T: Frailty | A state of reduced physiological reserve across systems, increasing vulnerability to minor stressors
T: Clinical Frailty Scale | A 1–9 scale assessing frailty based on function before the current illness
T: Treatment escalation plan | A documented plan of which treatments are appropriate if a person deteriorates
SUM: Frailty is reduced reserve, distinct from age or disability.
SUM: The Clinical Frailty Scale grades frailty using pre-illness function.
SUM: Care is proportionate, comprehensive and includes advance care planning.
SRC: Rockwood K and others, A global clinical measure of fitness and frailty in elderly people, CMAJ 173(5):489–495 | primary | 2005 | https://www.cmaj.ca/content/173/5/489
SRC: British Geriatrics Society, Fit for Frailty: consensus best practice guidance | guidance | 2014 | https://www.bgs.org.uk/resources/fit-for-frailty
SRC: NHS England, Frailty: identification and management resources | guidance | 2024 | https://www.england.nhs.uk/ourwork/clinical-policy/older-people/frailty/
Q: What does the Clinical Frailty Scale measure? | Frailty on a 1–9 scale, based on the person's function before the current illness.
Q: Give two frailty syndromes. | Falls, immobility, delirium, incontinence or susceptibility to medicine side effects.
M1#nursing-u10-17-q1@1: On what is the Clinical Frailty Scale usually based? | The person's function about two weeks before the current illness | Their age only | Their blood tests | Their diagnosis | The CFS uses baseline function rather than the acute illness.
M2#nursing-u10-17-q2@2: A frail older man becomes bed-bound and confused after starting a new medicine. What does this illustrate? | A large decline after a minor stressor | Normal ageing | A psychiatric illness only | An unrelated coincidence | Frailty means small stressors cause large changes in function.
M3#nursing-u10-17-q3@3: A man with severe frailty has a third admission with pneumonia this year. What is the most appropriate step alongside treatment? | Discuss his goals and wishes and agree a treatment escalation plan with him and his family | Plan intensive care for any deterioration without discussion | Withhold antibiotics because he is frail | Avoid any conversation about the future | Advance care planning respects his goals and guides proportionate care.
TF2#nursing-u10-17-q4@1: Frailty and old age mean the same thing. | False | Frailty is reduced reserve; many older people aren't frail.

## Rehabilitation
S: Rehabilitation in adult nursing helps people regain function after acute illness, surgery or injury, and adapt to long-term conditions. This lesson looks at specialist adult rehabilitation pathways and the nurse's role within them.
O: Describe specialist adult rehabilitation pathways, including stroke, cardiac and pulmonary rehabilitation
O: Use goal setting and functional assessment in adult rehabilitation
O: Support people and families through adjustment and long-term recovery
PRE: Rehabilitation (School 7)
H: Specialist pathways
- **Stroke rehabilitation**: on specialist stroke units, with intensive therapy (physiotherapy, occupational therapy, speech and language therapy) and early supported discharge where suitable. Nurses support positioning, continence, swallowing, communication and mood around the clock.
- **Cardiac rehabilitation**: after heart attack, heart surgery or with heart failure; exercise, education, risk factor management and psychological support.
- **Pulmonary rehabilitation**: for COPD and other lung conditions; exercise and education improve function and quality of life.
- **Orthopaedic and trauma rehabilitation**: after fractures and joint replacement.
- **Neurological rehabilitation**: after brain or spinal cord injury, or for progressive conditions.
- **Critical illness rehabilitation**: after intensive care, addressing weakness, fatigue, psychological effects (post-intensive care syndrome) and family impact.
H: Goal setting and assessment
- Set goals with the person, focused on what matters to them, and measure progress with functional measures (such as the Barthel Index for activities of daily living).
- Break long-term goals into short-term steps.
- Review regularly in multidisciplinary meetings.
H: The nurse's role
- Continue therapy goals in everyday activities ("24-hour rehabilitation").
- Manage symptoms that limit progress: pain, fatigue, continence, low mood.
- Educate and involve families and carers.
- Plan transitions to home, community rehabilitation or reablement.
H: Adjustment
P: Illness and disability can bring grief, loss of role, anxiety and depression. Recognise these, offer emotional support and refer to psychological services. Peer support and patient organisations help many people adjust.
K: Adult rehabilitation pathways are specialist and multidisciplinary; nurses carry goals into everyday care and support adjustment.
!: Leaving rehabilitation to therapy sessions only. Most of the day is spent with nurses, so goals must be practised then too.
T: Barthel Index | A scale measuring independence in activities of daily living
T: Post-intensive care syndrome | Physical, cognitive and psychological problems after critical illness
T: Early supported discharge | A service enabling stroke survivors to leave hospital earlier with rehabilitation at home
SUM: Specialist pathways include stroke, cardiac, pulmonary, orthopaedic, neurological and critical illness rehabilitation.
SUM: Person-centred goals and functional measures guide progress.
SUM: Nurses provide 24-hour rehabilitation and support adjustment.
SRC: Intercollegiate Stroke Working Party, National clinical guideline for stroke for the UK and Ireland | guidance | 2023 | https://www.strokeguideline.org/
SRC: NICE CG83, Rehabilitation after critical illness in adults | guidance | 2009 | https://www.nice.org.uk/guidance/cg83
SRC: British Association for Cardiovascular Prevention and Rehabilitation, Standards and core components for cardiovascular disease prevention and rehabilitation | guidance | 2023 | https://www.bacpr.org/
Q: What is post-intensive care syndrome? | Physical, cognitive and psychological problems after critical illness.
Q: What does the Barthel Index measure? | Independence in activities of daily living.
M1#nursing-u10-18-q1@1: Which rehabilitation programme is designed for people with COPD? | Pulmonary rehabilitation | Cardiac rehabilitation only | Orthopaedic rehabilitation | Speech therapy only | Pulmonary rehabilitation combines exercise and education for lung disease.
M2#nursing-u10-18-q2@3: A stroke survivor practises dressing with the occupational therapist in the morning. What should the nurse do later in the day? | Support him to dress using the same techniques | Dress him to save time | Leave him to manage alone | Avoid dressing until the next therapy session | 24-hour rehabilitation continues therapy goals in everyday care.
M2#nursing-u10-18-q3@2: After discharge from intensive care, a woman reports nightmares, poor memory and weakness. What might explain this? | Post-intensive care syndrome | Normal recovery needing no support | Dementia only | Laziness | PICS includes psychological, cognitive and physical effects needing follow-up.
MATCH1#nursing-u10-18-q4@1: Match each rehabilitation pathway to its group. | Cardiac rehabilitation = After a heart attack ; Pulmonary rehabilitation = COPD ; Early supported discharge = Stroke | Specialist pathways target specific needs.

## Long-term conditions
S: Long-term conditions are health problems that can't currently be cured but can be managed, such as diabetes, COPD, heart failure, arthritis and chronic kidney disease. Adult nurses support people to manage their own conditions and live well.
O: Explain the burden and management of long-term conditions in adults
O: Support self-management using personalised care and support planning
O: Recognise the psychological and social impact of long-term conditions
PRE: Complex care (School 7)
H: The scale
P: Most adults over 65 in England live with at least one long-term condition, and people with long-term conditions account for a large share of GP appointments, hospital bed days and health spending. Rates are higher in more deprived areas, and conditions often start earlier.
H: Models of care
- **Risk stratification**: identifying people at highest risk of admission for proactive care.
- **Supported self-management**: the person manages day-to-day, with education, monitoring and clear plans for when things change.
- **Case management** for people with complex needs.
- **Personalised care and support planning**: a conversation focused on what matters to the person, their goals and the support they need, recorded in a shared plan.
H: Supporting self-management
- Structured education programmes (such as for diabetes, COPD and arthritis).
- Self-monitoring (blood glucose, peak flow, weight, blood pressure) with action plans.
- Health coaching and motivational interviewing.
- Digital tools and remote monitoring where suitable.
- Medicines optimisation and adherence support.
H: Psychological and social impact
P: Depression and anxiety are two to three times more common in people with long-term conditions and worsen outcomes. Screen for them and refer to talking therapies. Consider work, money, relationships, caring roles and loneliness. Social prescribing link workers can connect people to community support.
K: Long-term conditions are managed, not cured; personalised care planning and supported self-management help people live well, with attention to mental health and social needs.
!: Treating a long-term condition as only its physical symptoms. Depression and social circumstances strongly affect outcomes.
T: Long-term condition | A condition that can't currently be cured but can be managed with treatment and support
T: Supported self-management | Helping people develop the knowledge, skills and confidence to manage their own condition
T: Personalised care and support planning | A collaborative conversation and plan built around what matters to the person
SUM: Long-term conditions are common and unequally distributed.
SUM: Supported self-management and personalised care planning are central.
SUM: Screen for depression and anxiety and consider social needs.
SRC: NHS England, Personalised care and support planning handbook | guidance | 2016 | https://www.england.nhs.uk/personalisedcare/
SRC: NICE CG91, Depression in adults with a chronic physical health problem: recognition and management | guidance | 2009 | https://www.nice.org.uk/guidance/cg91
SRC: The King's Fund, Long-term conditions and multimorbidity | secondary | 2023 | https://www.kingsfund.org.uk/
Q: What is supported self-management? | Helping people develop the knowledge, skills and confidence to manage their own condition.
Q: Why should people with long-term conditions be screened for depression? | Depression is more common in them and worsens outcomes.
M1#nursing-u10-19-q1@1: Which is an example of a long-term condition? | Type 2 diabetes | A sprained ankle | A common cold | A minor cut | Long-term conditions can be managed but not currently cured.
M2#nursing-u10-19-q2@2: What is the focus of personalised care and support planning? | What matters to the person, their goals and the support they need | The clinician's targets only | Reducing the person's involvement | Completing a standard form | It is a collaborative conversation centred on the person.
M2#nursing-u10-19-q3@3: A man with COPD stops attending his reviews and says he feels hopeless. What should the nurse consider? | Screening for depression and offering support or referral | That he is uncooperative and should be warned about discharge | Discharging him from the service | Increasing his inhaler dose and booking another review | Depression is common in long-term conditions and affects engagement.
TF2#nursing-u10-19-q4@2: Supported self-management means leaving people to manage alone without professional input. | False | It combines the person's own management with education, plans and professional support.

## Multimorbidity
S: Multimorbidity is living with two or more long-term conditions. It is increasingly the norm in adult nursing, and it changes how care needs to be organised, from one disease at a time to the whole person.
O: Explain the impact of multimorbidity on adults and on health services
O: Apply a whole-person approach to care, including medicines review and treatment burden
O: Coordinate care for adults with multimorbidity across services
PRE: Multimorbidity (School 5)
H: Why it matters
- Multimorbidity becomes more common with age and deprivation; many people have four or more conditions.
- It is linked to reduced quality of life, poorer function, more hospital use and higher mortality.
- Physical and mental health conditions often occur together.
H: Problems with single-disease care
- Separate appointments, tests and plans for each condition.
- **Polypharmacy** and interactions, with prescribing cascades (a side effect treated with another medicine).
- Conflicting advice between guidelines.
- High **treatment burden**, which can lead to disengagement.
H: A whole-person approach
- Identify people who would benefit (frailty, polypharmacy, high treatment burden, frequent unplanned care).
- Establish what matters to the person and their priorities.
- Review **medicines** with a structured medication review, reducing those with limited benefit.
- Agree an **individualised plan**, with a named coordinator and clear responsibilities.
- Consolidate appointments and tests where possible.
H: The nurse's role
P: Practice nurses, district nurses, specialist nurses and ward nurses are well placed to notice when the overall burden is too much, to coordinate across services and to advocate for a whole-person review. Ask, "How are you managing everything?" as well as about each condition.
K: Multimorbidity needs whole-person care: shared priorities, medicines review, reduced burden and coordinated plans.
!: Adding a new medicine to treat a side effect without reviewing the cause. This "prescribing cascade" increases harm.
T: Prescribing cascade | Treating a medicine's side effect with another medicine, often without recognising the cause
T: Structured medication review | A planned review of all a person's medicines, considering benefits, risks and their goals
T: Whole-person care | Care that addresses all of a person's conditions and needs together rather than separately
SUM: Multimorbidity is common, especially with age and deprivation.
SUM: Single-disease care leads to polypharmacy, conflicts and burden.
SUM: A whole-person approach with medicines review and coordination improves care.
SRC: NICE NG56, Multimorbidity: clinical assessment and management | guidance | 2016 | https://www.nice.org.uk/guidance/ng56
SRC: Academy of Medical Sciences, Multimorbidity: a priority for global health research | secondary | 2018 | https://acmedsci.ac.uk/policy/policy-projects/multimorbidity
SRC: NHS England, Structured medication reviews and medicines optimisation | guidance | 2020 | https://www.england.nhs.uk/primary-care/pharmacy/smr/
Q: What is a prescribing cascade? | Treating a medicine's side effect with another medicine, often without recognising the cause.
Q: What question helps assess overall treatment burden? | "How are you managing everything?"
M1#nursing-u10-20-q1@1: What does multimorbidity mean? | Living with two or more long-term conditions | Having one serious illness | Being over 65 | Taking one medicine | Multimorbidity is the presence of two or more long-term conditions.
M2#nursing-u10-20-q2@3: An older woman develops ankle swelling after starting amlodipine and is prescribed a diuretic, which then causes falls. What has happened? | A prescribing cascade | A normal treatment plan | Good medicines optimisation | An allergic reaction only | Treating the side effect with another drug led to further harm.
M2#nursing-u10-20-q3@2: Which approach best suits a person with five long-term conditions attending many separate clinics? | A whole-person review with an agreed plan and coordinated appointments | More separate specialist referrals for each condition | Adding a clinic for each new symptom | Stopping all medicines to reduce the burden | Coordinated, person-centred care reduces burden and conflicts.
MS2#nursing-u10-20-q4@3: Which are features of a whole-person approach to multimorbidity? | Asking what matters most to the person ; Structured medication review ; A named care coordinator | Separate plans for every condition ; More medicines by default | These features reduce burden and improve outcomes.

## Palliative care
S: Palliative care improves the quality of life of people with life-limiting illness and their families, by relieving symptoms and supporting physical, psychological, social and spiritual needs. It can start early, alongside other treatments, not only at the end of life.
O: Explain the principles of palliative care and how to identify people who may benefit
O: Assess and manage common symptoms, including pain, breathlessness, nausea and constipation
O: Support people and families with advance care planning and psychological, social and spiritual care
PRE: End-of-life care (School 7)
H: Principles
- Palliative care is for anyone with a life-limiting condition (cancer, heart failure, COPD, dementia, kidney disease, neurological conditions), not only cancer.
- It can be given alongside treatments aimed at prolonging life.
- **General palliative care** is provided by all clinicians; **specialist palliative care** teams support complex needs.
H: Identifying people who may benefit
- The **"surprise question"**: would you be surprised if this person died in the next 12 months?
- Tools such as **SPICT** (Supportive and Palliative Care Indicators Tool) and the **Gold Standards Framework** prognostic indicators.
- Registers in primary care support coordinated care.
H: Symptom management
- **Pain**: assess type and cause; regular analgesia with breakthrough doses; opioids titrated with laxatives and anti-sickness cover as needed; adjuvants for neuropathic pain; non-drug measures.
- **Breathlessness**: positioning, fan, breathing techniques, treating causes, and low-dose opioids where prescribed.
- **Nausea and vomiting**: identify the likely cause to guide the choice of anti-emetic.
- **Constipation**: anticipate it, especially with opioids; prescribe laxatives proactively.
- **Fatigue**, low mood, anxiety and delirium also need assessment.
- Use a validated tool (such as the Integrated Palliative care Outcome Scale) to assess needs.
H: Advance care planning and support
- Conversations about what matters, preferred place of care, and treatment preferences, revisited over time.
- Psychological support, carer support and assessment, financial and practical help (such as fast-track benefits under special rules for end of life).
- Spiritual care through chaplaincy or faith leaders.
- Hospices provide inpatient, day and community care.
K: Palliative care is for anyone with life-limiting illness, can start early, and combines expert symptom control with advance care planning and whole-person support.
!: Thinking palliative care is only for the last days of life or only for cancer. It is for anyone with life-limiting illness, from diagnosis.
T: Palliative care | Care that improves quality of life for people with life-limiting illness and their families
T: Surprise question | Asking whether you'd be surprised if a person died in the next year, to identify palliative care needs
T: Breakthrough analgesia | Extra doses of pain relief for pain that breaks through regular analgesia
SUM: Palliative care is for any life-limiting illness and can start early.
SUM: Identify needs with the surprise question and tools such as SPICT.
SUM: Manage symptoms proactively and support advance care planning and families.
SRC: World Health Organization, Palliative care fact sheet | secondary | 2020 | https://www.who.int/news-room/fact-sheets/detail/palliative-care
SRC: NICE NG142, End of life care for adults: service delivery | guidance | 2019 | https://www.nice.org.uk/guidance/ng142
SRC: University of Edinburgh, Supportive and Palliative Care Indicators Tool (SPICT) | guidance | 2022 | https://www.spict.org.uk/
SRC: Scottish Palliative Care Guidelines | guidance | 2024 | https://www.palliativecareguidelines.scot.nhs.uk/
Q: What is the "surprise question"? | Would you be surprised if this person died in the next 12 months?
Q: Why should laxatives usually be prescribed with regular opioids? | Opioids commonly cause constipation.
M1#nursing-u10-21-q1@1: Who can benefit from palliative care? | Anyone with a life-limiting illness | Only people with cancer | Only people in their last days | Only people in hospices | Palliative care is for any life-limiting condition, from diagnosis.
M2#nursing-u10-21-q2@2: A patient on regular morphine has pain that comes on between doses. What should be available? | A prescribed breakthrough dose | Nothing until the next regular dose | A doubled regular dose without review | Paracetamol only | Breakthrough analgesia manages pain between regular doses.
M3#nursing-u10-21-q3@3: A man with advanced heart failure has had three admissions in six months and is increasingly breathless. What is the most appropriate step alongside treatment? | Identify palliative care needs and start advance care planning conversations | Wait until he is dying before discussing the future | Refer only to cardiology | Avoid discussing prognosis | Frequent admissions suggest he may benefit from palliative care and planning.
TF2#nursing-u10-21-q4@2: Palliative care can be provided alongside treatments intended to prolong life. | True | Palliative care is based on need and can start early, alongside other treatment.

## End-of-life care
S: End-of-life care in adult nursing covers the last weeks and days of life, the moment of death and care afterwards. This lesson focuses on the practical nursing skills involved: anticipatory medicines, syringe pumps, last days care and care after death.
O: Plan individualised care in the last days of life, including anticipatory medicines and syringe pumps
O: Support comfort through mouth care, positioning, hydration decisions and management of respiratory secretions
O: Provide care after death and support for bereaved families, following legal and cultural requirements
PRE: Palliative care
H: Anticipatory medicines
- Prescribed in advance for the five common symptoms at the end of life: **pain**, **breathlessness**, **nausea and vomiting**, **agitation and restlessness**, and **respiratory tract secretions**.
- Usually given by subcutaneous injection, so they can be used quickly at home or in hospital.
- Check prescriptions, stock and authorisation documents (such as community medication administration charts).
H: Syringe pumps
- A **continuous subcutaneous infusion** via a syringe pump delivers medicines over 24 hours when the person can't swallow or symptoms need continuous control.
- Nurses check the pump, line, site, rate and remaining volume regularly, as local policy requires; check medicine compatibility and labels; and keep breakthrough doses available.
- Only staff trained and assessed in using the specific device should set it up.
H: Comfort in the last days
- **Mouth care** regularly, as dry mouth is common and distressing.
- **Positioning** for comfort and to reduce secretions; pressure area care proportionate to comfort.
- **Hydration and nutrition**: support eating and drinking if the person wishes; decisions about clinically assisted hydration are individual and reviewed.
- **Respiratory secretions** ("death rattle"): repositioning; medicines may help; explain to families that it isn't usually distressing for the person.
- Stop unnecessary observations and medicines; record an individualised plan of care.
H: Care after death
- **Verification of death** by a trained and authorised registered nurse where local policy allows.
- **Care after death** (personal care of the deceased): with dignity, following religious and cultural wishes, infection prevention requirements, and local policy, including identification and documentation.
- Know when a death must be referred to the coroner or procurator fiscal.
- Return property and give families clear information about next steps (death certificate, registering the death, bereavement support).
- Look after yourself and colleagues, with debriefs and support.
K: Prescribe and check anticipatory medicines, use syringe pumps safely, focus on comfort in the last days, and give dignified care after death and support to families.
!: Assuming noisy breathing at the end of life is causing the person distress. Explain to families, reposition, and use medicines where helpful.
T: Continuous subcutaneous infusion | Delivery of medicines under the skin over 24 hours via a syringe pump
T: Anticipatory medicines | Medicines prescribed in advance for likely end-of-life symptoms
T: Care after death | Personal care of the person who has died, with dignity and respect for their wishes
SUM: Anticipatory medicines cover pain, breathlessness, nausea, agitation and secretions.
SUM: Syringe pumps need trained staff and regular checks.
SUM: Focus on comfort in the last days and give dignified care after death.
SRC: NICE NG31, Care of dying adults in the last days of life | guidance | 2015 | https://www.nice.org.uk/guidance/ng31
SRC: Hospice UK, Care after death: registered nurse verification of expected adult death | guidance | 2022 | https://www.hospiceuk.org/
SRC: Scottish Palliative Care Guidelines, Syringe pumps and anticipatory medicines | guidance | 2024 | https://www.palliativecareguidelines.scot.nhs.uk/
SAFE: Syringe pumps and subcutaneous medicines are set up and given only by staff trained and assessed in the specific device and policy; verification of death follows local authorisation.
Q: Name the five common symptoms anticipatory medicines are prescribed for. | Pain, breathlessness, nausea and vomiting, agitation, and respiratory secretions.
Q: Over what period does a syringe pump usually deliver medicines? | 24 hours.
M1#nursing-u10-22-q1@1: Why are anticipatory medicines usually given subcutaneously? | They can be given quickly when the person can't swallow | Subcutaneous injections are always painful | It is the only legal route | It avoids the need for prescriptions | The subcutaneous route is simple and effective when swallowing fails.
M2#nursing-u10-22-q2@2: A family member is distressed by her father's noisy breathing in his last hours. What should the nurse do? | Explain, reposition and consider prescribed medicines | Suction him repeatedly | Tell her to leave the room | Ignore her concern | Explanation, positioning and medicines help; deep suction is usually unhelpful.
M3#nursing-u10-22-q3@3: A syringe pump set to run over 24 hours has much more left in it than expected at the 4-hour check. What should the nurse do? | Check the pump, line and site, and escalate | Increase the rate so the dose is delivered on time | Remove the line and leave it | Leave it running and check again tomorrow | Discrepancies may mean a blocked line, site problem or device fault; act and escalate.
MS2#nursing-u10-22-q4@2: Which are part of comfort care in the last days of life? | Regular mouth care ; Positioning for comfort ; Stopping unnecessary observations | Hourly full observations ; Insisting on oral fluids | Comfort-focused care replaces routine interventions that don't help.

## Postoperative care
S: Postoperative care spans the recovery room to discharge and beyond. Nurses monitor recovery, manage pain and nausea, prevent complications and help people get moving, eating and home safely.
O: Monitor a patient after surgery, including handover from recovery and early observations
O: Manage post-operative pain and nausea and prevent common complications
O: Support recovery milestones and discharge readiness
PRE: Surgical nursing
H: Handover and early monitoring
- Receive a structured handover from recovery: the procedure, anaesthetic, intra-operative events, analgesia and anti-emetics given, drains, catheters, fluids, observations and the post-operative plan.
- Take observations at the frequency set by local policy (more often initially), with NEWS2 and escalation.
- Check wound and drains, fluid balance and urine output, pain and nausea scores, and the neurovascular status of limbs after orthopaedic or vascular surgery.
H: Pain and nausea
- **Multimodal analgesia** (paracetamol, NSAIDs where suitable, regional anaesthesia, opioids as needed) improves pain relief and reduces opioid side effects.
- Use patient-controlled analgesia (PCA) and epidurals only with trained staff, monitoring sedation, respiratory rate and (for epidurals) sensory and motor block.
- **Post-operative nausea and vomiting**: assess risk factors and give anti-emetics as prescribed.
H: Preventing complications
- **Respiratory**: early mobilisation, deep breathing and coughing, sitting upright.
- **VTE**: risk assessment, mechanical and drug prophylaxis as prescribed, mobilisation.
- **Infection**: wound care with aseptic technique, catheter and line care, prompt removal of devices.
- **Urinary retention**: monitor voiding, use bladder scans.
- **Delirium**: screen, especially in older adults.
- **Pressure ulcers**: especially after long operations.
H: Recovery milestones and discharge
- Eating and drinking, pain controlled on oral analgesia, passing urine, bowels starting to work (where relevant), mobilising safely.
- Discharge information: wound care, signs of infection or VTE, pain management, activity, driving and work, and who to contact.
K: Get a structured handover, monitor closely, use multimodal analgesia safely, prevent respiratory, VTE, infection and other complications, and work towards recovery milestones.
!: Giving more opioid to a sleepy patient with a low respiratory rate on PCA. Check sedation and respiratory rate and escalate.
T: Multimodal analgesia | Combining analgesics with different mechanisms to improve pain relief and reduce side effects
T: Patient-controlled analgesia | A system allowing patients to give themselves prescribed doses of analgesia, within set limits
T: Post-operative nausea and vomiting | Nausea or vomiting after anaesthesia and surgery
SUM: A structured recovery handover starts safe post-operative care.
SUM: Multimodal analgesia and anti-emetics improve comfort; monitor PCA and epidurals closely.
SUM: Prevent complications and work towards recovery milestones for discharge.
SRC: NICE NG180, Perioperative care in adults | guidance | 2020 | https://www.nice.org.uk/guidance/ng180
SRC: Faculty of Pain Medicine, Core standards for pain management services in the UK | guidance | 2021 | https://fpm.ac.uk/
SRC: NICE NG89, Venous thromboembolism in over 16s: reducing the risk of hospital-acquired deep vein thrombosis or pulmonary embolism | guidance | 2019 | https://www.nice.org.uk/guidance/ng89
SAFE: PCA, epidurals and other advanced analgesia are managed only by staff trained and assessed in their use, following local protocols.
Q: What is multimodal analgesia? | Combining analgesics with different mechanisms to improve pain relief and reduce side effects.
Q: Name two ways to prevent respiratory complications after surgery. | Early mobilisation, deep breathing and coughing, and sitting upright.
M1#nursing-u10-23-q1@1: Which should be included in a handover from recovery? | The procedure, anaesthetic, analgesia given, drains and post-operative plan | Only the patient's name and the operation performed | The time the patient went to theatre and nothing else | Nothing, as observations are enough | A full, structured handover supports safe ongoing care.
M2#nursing-u10-23-q2@2: A patient on PCA morphine is very drowsy with a respiratory rate of 8. What should the nurse do? | Stop the PCA, call for help and follow the opioid toxicity protocol | Encourage the patient to press the button | Increase the PCA dose to control the pain | Recheck the observations in four hours | Sedation and slow breathing suggest opioid toxicity, an emergency.
M2#nursing-u10-23-q3@3: A patient hasn't passed urine eight hours after hip surgery and has lower abdominal discomfort. What should the nurse do? | Assess for urinary retention with a bladder scan | Encourage more fluids and wait another few hours | Assume the patient is dehydrated | Give a laxative for the abdominal discomfort | Post-operative urinary retention is common and needs assessment.
MATCH2#nursing-u10-23-q4@3: Match each complication to a preventive measure. | Chest infection = Deep breathing and early mobilisation ; VTE = Prophylaxis and mobilisation ; Wound infection = Aseptic wound care ; Pressure ulcer = Repositioning and skin checks | Each complication has specific preventive measures.

## Discharge planning
S: Discharge planning for adults coordinates the move from hospital to home or another setting, so the person leaves at the right time with the right support. This lesson covers adult-specific pathways, funding and the practical checks that make discharge safe.
O: Describe discharge pathways for adults, including discharge to assess
O: Explain NHS Continuing Healthcare and other funding and support routes
O: Carry out the practical checks for a safe adult discharge, including medicines and carers
PRE: Discharge planning (School 7)
H: Discharge pathways (England)
- **Pathway 0**: simple discharge home with no new support.
- **Pathway 1**: home with new or extra support (such as reablement or community nursing).
- **Pathway 2**: to a rehabilitation or short-term care bed.
- **Pathway 3**: to a care home bed for people likely to need long-term care.
- **Discharge to assess** means assessing longer-term needs after leaving hospital rather than before. Scotland, Wales and Northern Ireland have their own approaches.
H: Funding and support
- **Adult social care** assessment under the Care Act 2014 (England), with financial assessment for means-tested support.
- **NHS Continuing Healthcare (CHC)**: a package of care fully funded by the NHS for adults with a "primary health need"; screening with the Checklist, then full assessment using the Decision Support Tool. A **fast-track** process exists for people with a rapidly deteriorating condition who may be entering a terminal phase.
- **NHS-funded nursing care** contributes to registered nursing in care homes with nursing.
- **Carers' assessments** and support.
H: Practical checks
- Medicines reconciled, supplied, explained; compliance aids if needed; changes sent to the GP and community pharmacy (some areas use discharge medicines referral services).
- Transport, keys, heating, food, equipment, and access to the home.
- Referrals made and confirmed (district nursing, therapy, social care).
- Discharge letter and patient information, including warning signs and contacts.
- Removal of cannulas; dressings and catheter supplies if needed.
- The person (and carers) agree with the plan; capacity and best interests decisions followed where needed.
H: Avoiding harm
P: Both delayed and premature discharges cause harm. Delays increase deconditioning and infection; premature or poorly planned discharges lead to readmissions and distress. Raise concerns if you believe a discharge isn't safe.
K: Use the right discharge pathway, know the funding routes such as Continuing Healthcare, and complete practical checks so adults leave hospital safely.
!: Discharging a patient with a cannula still in. Check and remove cannulas and other devices before the person leaves.
T: Discharge pathways | Categories (0–3) describing the support a person needs after discharge in England
T: NHS Continuing Healthcare | A package of ongoing care fully funded by the NHS for adults with a primary health need
T: Fast-track pathway | A rapid Continuing Healthcare route for people with a rapidly deteriorating condition who may be entering a terminal phase
SUM: Discharge pathways 0–3 match support to need; discharge to assess moves assessment out of hospital.
SUM: Funding routes include social care, Continuing Healthcare and NHS-funded nursing care.
SUM: Practical checks prevent unsafe discharge.
SRC: Department of Health and Social Care, Hospital discharge and community support guidance | guidance | 2024 | https://www.gov.uk/government/publications/hospital-discharge-service-policy-and-operating-model
SRC: Department of Health and Social Care, National framework for NHS Continuing Healthcare and NHS-funded nursing care | guidance | 2022 | https://www.gov.uk/government/publications/national-framework-for-nhs-continuing-healthcare-and-nhs-funded-nursing-care
SRC: NICE NG27, Transition between inpatient hospital settings and community or care home settings for adults with social care needs | guidance | 2015 | https://www.nice.org.uk/guidance/ng27
Q: What is NHS Continuing Healthcare? | A package of ongoing care fully funded by the NHS for adults with a primary health need.
Q: What is discharge pathway 1? | Home with new or extra support, such as reablement or community nursing.
M1#nursing-u10-24-q1@1: Which discharge pathway in England describes going home with no new support? | Pathway 0 | Pathway 1 | Pathway 2 | Pathway 3 | Pathway 0 is a simple discharge without new support.
M2#nursing-u10-24-q2@2: A patient with a rapidly deteriorating terminal illness wishes to die at home with care. Which process may speed funding? | The Continuing Healthcare fast-track pathway | A standard means-tested assessment only | No process exists | Waiting until a care home place is available | Fast-track allows rapid NHS-funded care for people nearing the end of life.
M2#nursing-u10-24-q3@3: Before discharge, the nurse finds the patient's new walking frame hasn't been delivered home. What should the nurse do? | Arrange delivery or delay discharge until it is in place | Discharge anyway and ask the family to sort it | Lend a ward frame without checking | Cancel the referral | Discharge isn't safe without essential equipment.
MS2#nursing-u10-24-q4@1: Which should be checked before an adult is discharged? | Medicines explained and supplied ; Cannulas removed ; Referrals confirmed | The cannula left in for convenience ; No information given to carers | Practical checks prevent harm and readmission.

## Community adult nursing
S: Community adult nurses care for people in their own homes, care homes and clinics. District nurses and their teams provide complex care that keeps people out of hospital and supports them to live, and die, at home.
O: Describe the roles and services of community adult nursing teams
O: Explain the particular considerations of caring in people's homes, including lone working and environment
O: Describe virtual wards and admission avoidance services
PRE: Continuity of care (School 7)
H: Roles and services
- **District nursing teams** (led by specialist practitioner district nurses): wound and leg ulcer care, catheter and continence care, injections (including insulin), palliative and end-of-life care, long-term condition management, and care coordination.
- **Community specialist nurses**: heart failure, respiratory, diabetes, tissue viability, continence, Parkinson's and others.
- **Practice nurses** in general practice: chronic disease clinics, immunisations, screening, wound care.
- **Community matrons and case managers** for people with complex long-term conditions.
- **Care home** support teams.
H: Caring in people's homes
- You are a **guest** in the person's home: respect their space, routines and choices.
- Assess the **environment**: hazards, equipment, heating, food, hygiene, pets, and social support.
- **Lone working**: follow organisational policies (sharing schedules, check-in systems, risk assessments, lone worker devices); leave if you feel unsafe.
- **Infection prevention** in the home: hand hygiene supplies, safe disposal of sharps and clinical waste.
- **Records**: shared electronic records and, where used, records held in the home.
H: Virtual wards and admission avoidance
- **Virtual wards** (hospital at home) allow people to receive acute care at home, with remote monitoring (such as wearable devices or apps) and visits from multidisciplinary teams.
- **Urgent community response** teams respond within two hours to people at risk of admission.
- These services rely on clear criteria, escalation plans and close links with acute and primary care.
H: Working with families and carers
P: Unpaid carers provide much of the care at home. Involve them, support them, check how they are coping, and offer carers' assessments. Watch for carer strain and for safeguarding concerns in both directions.
K: Community nurses deliver complex care at home, working as guests, managing lone working safely, and supporting virtual wards and admission avoidance with families at the centre.
!: Treating a home visit like a hospital bed space. Respect the home, the person's routines and choices, while managing risks.
T: District nurse | A community nurse, often with a specialist practitioner qualification, who leads care for people at home
T: Virtual ward | A service providing hospital-level care at home with remote monitoring and visits
T: Lone working | Working alone without close supervision, requiring specific safety arrangements
SUM: District, specialist and practice nurses deliver a wide range of community care.
SUM: Caring in homes requires respect, environmental assessment and lone working safety.
SUM: Virtual wards and urgent community response avoid admissions; carers are central partners.
SRC: Queen's Nursing Institute, The QNI/QNIS voluntary standards for district nurse education and practice | standard | 2015 | https://qni.org.uk/
SRC: NHS England, Virtual wards (hospital at home) guidance | guidance | 2024 | https://www.england.nhs.uk/virtual-wards/
SRC: Royal College of Nursing, Personal safety when working alone: guidance for members working in health and social care | guidance | 2023 | https://www.rcn.org.uk/
Q: What is a virtual ward? | A service providing hospital-level care at home with remote monitoring and visits.
Q: Name two lone working safety measures. | Sharing visit schedules, check-in systems, risk assessments and lone worker devices.
M1#nursing-u10-25-q1@1: Which service is usually led by district nurses? | Care for housebound people in their own homes | Intensive care units | Operating theatres | Emergency departments | District nursing teams provide care in people's homes.
M2#nursing-u10-25-q2@3: On a home visit, a nurse finds a man aggressive and threatening. What should she do? | Leave the property if unsafe, follow the lone working policy and report it | Stay and complete the planned care, then leave | Try to calm him by arguing the point | Ignore the threat | Personal safety comes first; leave and report under the lone working policy.
M2#nursing-u10-25-q3@2: A frail woman's daughter, who cares for her full-time, appears exhausted and tearful. What should the community nurse do? | Ask how she is coping and offer a carer's assessment and support | Focus only on the mother | Tell the daughter to try harder | Arrange immediate care home admission without discussion | Carers need recognition and support; carer strain affects both people.
TF2#nursing-u10-25-q4@1: Urgent community response teams aim to respond to people at risk of admission within two hours. | True | Two-hour urgent community response services help avoid hospital admission.

## Law and professional considerations in adult nursing
S: Adult nurses regularly face legal and professional questions, especially when caring for older people, people who lack capacity and people at risk of harm. This lesson applies School 17's law to common adult nursing situations.
O: Apply mental capacity, best interests and deprivation of liberty law in adult nursing situations
O: Recognise safeguarding concerns specific to adults, including in care homes and families
O: Manage professional issues such as covert medication, restraint and treatment escalation decisions
PRE: Mental Capacity Act 2005 (School 17)
H: Capacity and best interests in practice
- Capacity is decision-specific: a person with dementia may be able to choose their clothes but not decide on complex treatment.
- Support decision-making (time, aids, the best time of day).
- Record capacity assessments and best interests decisions for significant decisions.
- Check for lasting powers of attorney, advance decisions and ReSPECT forms.
H: Deprivation of liberty
- Older adults in hospitals and care homes who lack capacity and are under continuous supervision and control and not free to leave may need DoLS authorisation (England and Wales).
- Use the least restrictive options: bed rails, sensors, locked doors and one-to-one supervision all need justification.
H: Covert medication
- Giving medicines hidden in food or drink without a person's knowledge is only lawful when the person **lacks capacity** to decide about the medicine, it is in their **best interests**, the decision involves the prescriber, pharmacist and those close to the person, and it is **documented** and regularly **reviewed**.
- Never give medicines covertly to a person with capacity who refuses them.
- Check with the pharmacist whether the medicine can be safely mixed with food.
H: Restraint and restrictive practice
P: Physical, chemical or mechanical restraint must be necessary, proportionate and the least restrictive option, with legal authority (Mental Capacity Act section 6 for people who lack capacity). Using sedation to manage behaviour without assessing its cause is a form of chemical restraint and can be harmful, especially in dementia.
H: Safeguarding older adults
P: Older adults may experience abuse in families, care homes or hospitals: financial abuse, neglect, physical abuse and organisational abuse. Watch for unexplained injuries, weight loss, fear, changes in finances and poor care standards. Report through local safeguarding procedures.
K: Apply capacity, best interests and DoLS law to everyday adult care; covert medication and restraint need lawful, documented best interests decisions; watch for safeguarding concerns.
!: Hiding medicines in food because it's easier. Covert medication needs a formal, documented best interests process and review.
T: Covert medication | Giving medicines hidden in food or drink without the person's knowledge
T: Chemical restraint | Using medicines to control behaviour rather than to treat a diagnosed condition
T: Restrictive practice | Any practice that restricts a person's movement, liberty or freedom to act
SUM: Capacity is decision-specific; support decisions and record best interests.
SUM: Covert medication and restraint need capacity assessment, best interests, documentation and review.
SUM: Recognise and report safeguarding concerns for older adults.
SRC: NICE SC1, Managing medicines in care homes (covert administration) | guidance | 2014 | https://www.nice.org.uk/guidance/sc1
SRC: Mental Capacity Act 2005, sections 4–6 | legislation | 2005 | https://www.legislation.gov.uk/ukpga/2005/9
SRC: Care Quality Commission, Covert medication in care homes | guidance | 2022 | https://www.cqc.org.uk/
Q: When can medicines be given covertly? | Only when the person lacks capacity, it is in their best interests, the decision is agreed by the team and documented, and it is reviewed.
Q: What is chemical restraint? | Using medicines to control behaviour rather than to treat a diagnosed condition.
M1#nursing-u10-26-q1@1: Can medicines be given covertly to a person with capacity who refuses them? | No | Yes, if the family agrees | Yes, if the doctor agrees | Yes, in any care home | A person with capacity has the right to refuse medicines.
M2#nursing-u10-26-q2@2: A care home resident with dementia, who lacks capacity, refuses essential medicines. What is needed before giving them covertly? | A documented, reviewed best interests decision | A decision by the nurse in charge alone | Nothing; staff can hide medicines anytime | The resident's verbal agreement on the day | Covert administration needs a formal best interests process.
M3#nursing-u10-26-q3@3: A man with dementia becomes agitated every evening. A colleague suggests regular sedation. What is the best response? | Look for causes such as pain or infection first | Ask for regular evening sedation to be prescribed | Use restraint to keep him in bed | Accept the agitation as part of his dementia | Distress has causes; sedation without assessment is chemical restraint and can harm.
TF2#nursing-u10-26-q4@3: Bed rails can always be used as a simple falls prevention measure without assessment. | False | Bed rails restrict movement and can cause injury; they need individual assessment and justification.

## Preparing for an adult nursing placement
S: Practice placements are where student nurses learn to apply knowledge, develop skills and demonstrate proficiency. Good preparation helps you make the most of each placement in adult nursing settings.
O: Explain how practice learning is supervised and assessed under the NMC standards
O: Prepare practically and professionally for an adult nursing placement
O: Set learning goals and use placement opportunities to achieve NMC proficiencies
PRE: Professional regulation (School 17)
H: Supervision and assessment
- The NMC **Standards for student supervision and assessment** set out the roles: **practice supervisors** (any registered health or social care professional who supports and supervises learning), **practice assessors** (registered nurses who assess practice and confirm proficiency) and **academic assessors** (from the university).
- Students are **supernumerary**: additional to the staffing numbers, though they take part in care.
- Proficiencies and skills (including Annexes A and B of the NMC standards) are recorded in a **practice assessment document**, often a regional version shared by several universities.
H: Before you start
- Read about the placement area and common conditions.
- Contact the placement in advance; check shift patterns, dress code, location and parking or transport.
- Complete mandatory training (such as moving and handling, basic life support, information governance) and occupational health requirements.
- Know how to raise concerns and who to contact at the university.
- Make reasonable adjustment requests early if you have a disability or health condition.
H: Making the most of placement
- Agree learning goals at your initial interview, linked to the proficiencies.
- Seek learning opportunities: follow a patient's journey, spend time with specialist nurses and other professionals, attend ward rounds and MDT meetings.
- Ask questions, reflect regularly and seek feedback.
- Work within your competence and under supervision; say if you aren't ready to do something.
- Look after your wellbeing: placements can be tiring and emotionally demanding.
H: Professional behaviour
P: You represent your university and the profession. Follow the NMC Code and the guidance on professionalism for students, maintain confidentiality, use social media responsibly, and be punctual and reliable. If you witness poor practice, you have a duty to raise it.
K: Know who supervises and assesses you, prepare practically and professionally, set learning goals and work within your competence under supervision.
!: Agreeing to work as a member of staff to cover a shortage. Students are supernumerary; raise it with your supervisor and university.
T: Practice supervisor | A registered professional who supports and supervises a student's learning in practice
T: Practice assessor | A registered nurse who assesses a student's practice and confirms proficiency
T: Practice assessment document | The record of a student's practice learning, assessments and proficiencies
SUM: Practice supervisors, practice assessors and academic assessors support and assess learning.
SUM: Prepare practically and set goals linked to proficiencies.
SUM: Work within competence, behave professionally and raise concerns.
SRC: Nursing and Midwifery Council, Standards for student supervision and assessment | standard | 2023 | https://www.nmc.org.uk/standards/standards-for-nurses/standards-for-student-supervision-and-assessment/
SRC: Nursing and Midwifery Council, Future nurse: standards of proficiency for registered nurses (annexes A and B) | standard | 2018 | https://www.nmc.org.uk/standards/standards-for-nurses/
SRC: Nursing and Midwifery Council, Guidance on professionalism for nursing and midwifery students | guidance | 2019 | https://www.nmc.org.uk/
Q: What is the role of a practice assessor? | A registered nurse who assesses a student's practice and confirms proficiency.
Q: What does supernumerary mean for students? | Being additional to the staffing numbers while taking part in care.
M1#nursing-u10-27-q1@1: Who confirms a student nurse's proficiency in practice? | The practice assessor | Any healthcare assistant | The patient | The ward clerk | Practice assessors, who are registered nurses, assess and confirm proficiency.
M2#nursing-u10-27-q2@3: On placement, a student is asked to take sole charge of a bay because the ward is short-staffed. What should she do? | Explain she is supernumerary and raise it | Agree to help the team for this shift only | Leave the placement without telling anyone | Take charge and mention it to her assessor later | Students mustn't be counted in staffing numbers; raise it through proper channels.
M2#nursing-u10-27-q3@2: What should a student do at the start of a placement? | Agree learning goals at an initial interview linked to proficiencies | Wait to see what happens | Avoid the practice assessor | Focus only on observing | Early goal setting focuses learning and assessment.
MATCH1#nursing-u10-27-q4@1: Match each role to its description. | Practice supervisor = Supports and supervises learning ; Practice assessor = Assesses and confirms proficiency ; Academic assessor = University link who confirms progression | The NMC standards separate supervision and assessment roles.

## Reflective learning and case studies in adult nursing
S: Reflection turns experience into learning. Adult nursing students and registrants use reflective models and case studies to understand their practice, improve care and meet revalidation requirements.
O: Use reflective models, such as Gibbs and Driscoll, to reflect on adult nursing experiences
O: Write a structured, anonymised case study that links theory to practice
O: Explain how reflection supports professional development and NMC revalidation
PRE: Reflective practice (School 1)
H: Why reflect
P: Reflection helps you make sense of experiences, recognise what went well and what didn't, link theory to practice, manage emotions, and plan improvements. Schön described **reflection-in-action** (thinking on your feet) and **reflection-on-action** (looking back afterwards).
H: Reflective models
- **Gibbs' reflective cycle (1988)**: description, feelings, evaluation, analysis, conclusion, action plan.
- **Driscoll's model**: What? So what? Now what?
- **Rolfe and colleagues' framework**: a similar three-stage model.
- Choose a model that suits the situation; the depth of analysis matters more than the model.
H: Writing a case study
- **Anonymise** completely: no names, dates, ward names, hospital or other identifying details (use a pseudonym and say so), in line with confidentiality and university policy.
- Describe the person's presentation, assessment and care.
- Link each aspect to **evidence**: guidelines, research and theory.
- Analyse the decisions, including the nurse's role, the MDT, ethical and legal issues and the person's experience.
- Reflect on your own learning and what you would do differently.
H: Example structure: a frail older man with pneumonia
- Presentation and assessment (NEWS2, delirium screening, frailty score).
- Care planning and interventions (oxygen to target, antibiotics, fluids, mobilisation, delirium prevention).
- Complications and escalation.
- Discharge planning and family involvement.
- Reflection on communication with a family under stress and on recognising hypoactive delirium.
H: Reflection and revalidation
P: NMC revalidation requires **five written reflective accounts** and a **reflective discussion** with another registrant every three years. Reflection should focus on learning and changes to practice, never include identifiable information, and be honest. The NMC has stated that reflective accounts shouldn't be used against registrants in fitness to practise unless there are exceptional circumstances; check current guidance on sharing reflections.
K: Use a reflective model to analyse experiences, write anonymised evidence-based case studies, and use reflection for development and revalidation.
!: Including a patient's name, age and ward in a reflective account. Reflections and case studies must be fully anonymised.
T: Reflection-on-action | Looking back on an experience after it has happened to learn from it
T: Gibbs' reflective cycle | A six-stage reflective model: description, feelings, evaluation, analysis, conclusion, action plan
T: Case study | A detailed, anonymised account of a person's care that links practice to evidence and theory
SUM: Reflection links experience, theory and improvement.
SUM: Gibbs and Driscoll offer structured models; depth matters most.
SUM: Case studies must be anonymised and evidence-based; reflection is required for revalidation.
SRC: Gibbs G, Learning by Doing: a guide to teaching and learning methods, Further Education Unit, Oxford Polytechnic | secondary | 1988
SRC: Schön DA, The Reflective Practitioner: how professionals think in action, Basic Books | secondary | 1983
SRC: Nursing and Midwifery Council, Revalidation: written reflective accounts and reflective discussion | standard | 2019 | https://www.nmc.org.uk/revalidation/
Q: What are the six stages of Gibbs' reflective cycle? | Description, feelings, evaluation, analysis, conclusion and action plan.
Q: What are the three questions in Driscoll's model? | What? So what? Now what?
M1#nursing-u10-28-q1@1: In Schön's terms, thinking through a situation while you are still in it is called what? | Reflection-in-action | Reflection-on-action | Evaluation | Clinical supervision | Schön distinguished reflection-in-action, during the event, from reflection-on-action, looking back afterwards.
M2#nursing-u10-28-q2@2: Which stage of Gibbs' cycle considers what you would do differently next time? | Action plan | Description | Feelings | Evaluation | The action plan sets out what you will do differently, closing the cycle and linking reflection to future practice.
M3#nursing-u10-28-q3@3: A student's case study names the patient's ward, hospital and admission date. What should she do? | Remove all identifying details and use a stated pseudonym | Keep the details for accuracy | Replace the name with the patient's initials | Keep the details but mark the work as confidential | Case studies must be anonymised to protect confidentiality.
SEQ1#nursing-u10-28-q4@1: Put the stages of Gibbs' reflective cycle in order. | Description ; Feelings ; Evaluation ; Analysis ; Conclusion ; Action plan | The cycle moves from what happened to what you will do next.
`;
