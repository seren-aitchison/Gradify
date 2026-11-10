// MedGradify Cardiovascular Medicine (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## The cardiac cycle and cardiac output
LV: Preclinical · Foundation
S: The cardiac cycle is the sequence of pressure and volume changes in one heartbeat, and cardiac output is the volume the heart pumps each minute. This lesson covers the phases of the cycle, the heart sounds, the determinants of stroke volume and the Frank–Starling mechanism.
O: Describe the phases of the cardiac cycle and relate them to valve movements and heart sounds
O: Calculate cardiac output, stroke volume and ejection fraction
O: Explain how preload, afterload and contractility determine stroke volume
PRE: The heart and circulation
H: The phases
- **Ventricular filling** (diastole): AV valves open; most filling is passive, with atrial contraction adding the final part (more important with age and in stiff ventricles).
- **Isovolumetric contraction**: ventricles contract, pressure rises, mitral and tricuspid valves close (**S1**); all valves are shut.
- **Ejection**: ventricular pressure exceeds aortic and pulmonary pressure, so the semilunar valves open.
- **Isovolumetric relaxation**: pressure falls, aortic and pulmonary valves close (**S2**); the AV valves open again when ventricular pressure drops below atrial pressure.
P: An extra **S3** in early diastole can be normal in young people and athletes but suggests rapid filling of a dilated ventricle in heart failure. **S4** in late diastole reflects atrial contraction into a stiff ventricle.
H: Cardiac output
E: CO = HR × SV :: cardiac output (L/min) = heart rate × stroke volume
E: SV = EDV − ESV; EF = SV ÷ EDV :: stroke volume and ejection fraction
X: A resting adult with heart rate 70/min, end-diastolic volume 120 mL and end-systolic volume 50 mL.
> SV = 120 − 50 = 70 mL.
> CO = 70 × 70 = 4,900 mL/min, about 4.9 L/min.
> EF = 70 ÷ 120 = 58%, within the normal range (roughly 50–70%).
> If EDV rose to 180 mL with ESV 130 mL, SV would be 50 mL and EF 28%: a dilated, poorly contracting ventricle.
H: What sets stroke volume
- **Preload**: ventricular filling (end-diastolic stretch). The **Frank–Starling mechanism**: greater stretch produces a stronger contraction, matching output to venous return.
- **Afterload**: the resistance the ventricle pumps against, mainly arterial pressure and aortic valve resistance.
- **Contractility**: intrinsic strength of contraction at a given preload, increased by sympathetic stimulation and inotropes.
K: Cardiac output is heart rate times stroke volume; stroke volume rises with preload (Frank–Starling) and contractility and falls with afterload.
!: Equating ejection fraction with cardiac output. A patient can have a normal ejection fraction and still have heart failure (HFpEF), or a low EF with a resting output maintained by dilation and a fast rate.
EV: established | The Frank–Starling relationship and pressure–volume description of the cardiac cycle are foundational cardiovascular physiology.
EV: established | Normal EF ranges differ slightly between imaging methods and guideline bodies.
T: Stroke volume | The volume of blood ejected by a ventricle in one beat, EDV minus ESV
T: Preload | The degree of ventricular stretch at the end of diastole, related to end-diastolic volume
T: Afterload | The load against which the ventricle ejects, mainly arterial pressure
SUM: S1 marks AV valve closure; S2 marks semilunar valve closure.
SUM: CO = HR × SV; EF = SV/EDV.
SUM: Preload, afterload and contractility set stroke volume.
SRC: Boron W. F. and Boulpaep E. L., Medical Physiology, 3rd edn, Elsevier | secondary | 2017
SRC: Klabunde R. E., Cardiovascular Physiology Concepts, 3rd edn, Wolters Kluwer | secondary | 2021 | https://www.cvphysiology.com
Q: What causes the second heart sound? | Closure of the aortic and pulmonary (semilunar) valves.
Q: State the Frank–Starling mechanism. | Increased ventricular filling stretches the muscle and increases the force of contraction, so stroke volume matches venous return.
M1#medicine-u03-01-q1@1: What is normally heard at the start of isovolumetric contraction? | S1, from closure of the mitral and tricuspid valves | S2, from closure of the aortic and pulmonary valves | S3, from rapid early ventricular filling | S4, from atrial contraction into a stiff ventricle | Ventricular contraction closes the AV valves, producing S1, before the semilunar valves open.
M2#medicine-u03-01-q2@2: A patient has heart rate 90/min, EDV 150 mL and ESV 90 mL. What is the cardiac output? | 5.4 L/min | 8.1 L/min | 13.5 L/min | 3.6 L/min | SV = 150 − 90 = 60 mL; CO = 90 × 60 = 5,400 mL/min = 5.4 L/min (EF 40%).
M3#medicine-u03-01-q3@3: A 75-year-old with long-standing hypertension has a fourth heart sound. What does it most likely indicate? | Atrial contraction into a stiff, hypertrophied left ventricle | Rapid filling of a dilated ventricle in systolic failure | A normal finding in a healthy older adult | Severe aortic regurgitation with a dilated ventricle | S4 occurs in late diastole when the atrium pushes blood into a non-compliant ventricle, as in left ventricular hypertrophy.
NUM2#medicine-u03-01-q4@2: A ventricle has EDV 140 mL and ESV 56 mL. What is its ejection fraction, in per cent? | 60 | 1% | % | SV = 140 − 56 = 84 mL; EF = 84/140 = 0.60, which is 60%.
SA2#medicine-u03-01-q5@2,3: Explain how the body increases cardiac output during exercise. | Sympathetic activation raises heart rate and contractility. Muscle pumping and venoconstriction increase venous return, raising preload, so the Frank–Starling mechanism increases stroke volume. Vasodilation in exercising muscle lowers total peripheral resistance, reducing afterload. Together these can raise cardiac output several-fold. | Heart rate increase ; Contractility ; Venous return and Frank–Starling ; Reduced resistance or afterload

## Cardiac electrophysiology and conduction
LV: Preclinical · Application
S: The heartbeat is generated and coordinated by specialised conducting tissue. This lesson covers pacemaker and ventricular action potentials, the conduction pathway, and how these produce the waves and intervals of the ECG.
O: Describe the pacemaker and ventricular myocyte action potentials and their ion currents
O: Trace the conduction pathway and relate it to the ECG waves and intervals
O: Interpret normal ECG intervals and calculate heart rate from an ECG
PRE: The cardiac cycle and cardiac output
H: Action potentials
- **Ventricular myocyte**: phase 0 rapid depolarisation (sodium influx); phase 1 early repolarisation; phase 2 plateau (calcium influx balancing potassium efflux, triggering contraction); phase 3 repolarisation (potassium efflux); phase 4 resting potential.
- **Sinoatrial (SA) node**: no stable resting potential. Slow depolarisation in phase 4 (the "funny" current I_{f} and calcium currents) reaches threshold, then a calcium-driven upstroke.
P: Sympathetic stimulation steepens phase 4 and speeds the rate; vagal (parasympathetic) stimulation slows it.
H: Conduction and the ECG
- SA node → atria (**P wave**: atrial depolarisation).
- **AV node**: conduction is delayed, allowing ventricular filling (**PR interval**, normally 120–200 ms).
- Bundle of His → left and right bundle branches → Purkinje fibres → ventricles (**QRS complex**, normally under 120 ms).
- **T wave**: ventricular repolarisation. **QT interval**: from QRS start to T end; varies with rate, so it is corrected (QTc).
X: Calculating heart rate on a standard 25 mm/s ECG.
> One large square = 0.2 s; there are 300 large squares per minute.
> If the R–R interval is 4 large squares, rate = 300 ÷ 4 = 75/min.
> For irregular rhythms, count QRS complexes in a 10-second strip (the whole width) and multiply by 6.
> Twelve complexes in 10 s gives about 72/min.
K: The SA node's spontaneous depolarisation sets the rate; the AV node delays conduction; the ECG records atrial depolarisation (P), AV delay (PR), ventricular depolarisation (QRS) and repolarisation (T).
!: Forgetting that the ECG shows electrical, not mechanical, activity. A normal-looking rhythm without a pulse (pulseless electrical activity) is a cardiac arrest.
EV: established | The ionic basis of the cardiac action potential and the conduction pathway are well characterised.
EV: established | Normal interval limits (PR 120–200 ms, QRS under 120 ms) are standard teaching values; QTc limits vary with sex and correction formula.
T: Pacemaker potential | The slow spontaneous depolarisation of SA node cells in phase 4
T: PR interval | Time from the start of the P wave to the start of the QRS, reflecting atrioventricular conduction
T: QTc | The QT interval corrected for heart rate
SUM: Myocyte action potentials have a calcium plateau; nodal cells depolarise spontaneously.
SUM: P, PR, QRS and T reflect stages of conduction.
SUM: Rate = 300 ÷ large squares between R waves.
SRC: Hampton J. and Hampton J., The ECG Made Easy, 9th edn, Elsevier | secondary | 2019
SRC: Boron W. F. and Boulpaep E. L., Medical Physiology, 3rd edn, Elsevier | secondary | 2017
Q: What does the P wave represent? | Atrial depolarisation.
Q: What is the normal PR interval? | 120–200 ms (three to five small squares).
M1#medicine-u03-02-q1@1: Which ion is mainly responsible for the plateau phase of the ventricular action potential? | Calcium entering through L-type channels | Sodium entering through fast channels | Chloride leaving the cell | Magnesium binding troponin | Calcium influx during phase 2 balances potassium efflux and triggers contraction.
M2#medicine-u03-02-q2@2: The R–R interval on a 25 mm/s ECG is 3 large squares. What is the heart rate? | 100/min | 75/min | 60/min | 150/min | At 25 mm/s there are 300 large squares a minute: 300 ÷ 3 = 100 beats per minute.
M3#medicine-u03-02-q3@3: A patient's QRS duration is 140 ms with an otherwise normal rhythm. What does this most likely indicate? | Delayed ventricular conduction, such as a bundle branch block | Delayed conduction through the AV node | Faster atrial depolarisation than normal | A normal finding in healthy adults | A QRS of 120 ms or more shows slowed ventricular depolarisation, as in bundle branch block or ventricular rhythms.
NUM1#medicine-u03-02-q4@1: An irregular rhythm shows 15 QRS complexes in a 10-second strip. What is the approximate heart rate, per minute? | 90 | 1% | /min | Multiply the count in 10 seconds by 6: 15 × 6 = 90 per minute.
SA2#medicine-u03-02-q5@2,3: Explain why the AV node delays conduction and what happens to the ECG if that delay is prolonged. | The AV nodal delay allows the atria to finish contracting and the ventricles to fill before they contract, and limits how fast impulses reach the ventricles in atrial tachyarrhythmias. Prolonged AV conduction lengthens the PR interval beyond 200 ms (first-degree block); more severe disease can block some or all impulses (second- or third-degree block). | Allows ventricular filling ; Protects ventricles from fast atrial rates ; PR prolongation ; Higher-degree block

## Blood pressure regulation
LV: Preclinical · Application
S: Blood pressure is regulated over seconds by the baroreceptor reflex and over hours to days by the kidney and hormones. This lesson covers the determinants of blood pressure, the baroreflex, the renin–angiotensin–aldosterone system and natriuretic peptides.
O: Relate mean arterial pressure to cardiac output and total peripheral resistance
O: Describe the baroreceptor reflex and the renin–angiotensin–aldosterone system
O: Explain how these systems respond to haemorrhage and how drugs target them
PRE: The cardiac cycle and cardiac output
H: Determinants
E: MAP = CO × TPR :: mean arterial pressure = cardiac output × total peripheral resistance
E: MAP ≈ DBP + ⅓(SBP − DBP) :: estimate at rest
X: Blood pressure 120/80 mmHg.
> MAP ≈ 80 + ⅓(120 − 80) = 80 + 13 = 93 mmHg.
> Diastole lasts longer than systole at rest, so MAP is closer to the diastolic pressure.
> MAP above about 65 mmHg is a common target for organ perfusion in critical care.
H: Short-term: the baroreflex
P: **Baroreceptors** in the carotid sinus (glossopharyngeal nerve) and aortic arch (vagus nerve) sense stretch. A fall in pressure reduces their firing; the medulla increases sympathetic and decreases vagal outflow, raising heart rate, contractility and vasoconstriction within seconds.
H: Long-term: the kidney and hormones
- **Renin–angiotensin–aldosterone system (RAAS)**: low renal perfusion, reduced sodium at the macula densa or sympathetic stimulation release **renin**, which converts angiotensinogen to angiotensin I. **ACE** (mainly in the lungs) converts it to **angiotensin II**, which constricts arterioles, stimulates thirst and ADH, and releases **aldosterone** (sodium and water retention).
- **ADH (vasopressin)**: released with high osmolality or low volume; retains water.
- **Natriuretic peptides** (ANP, BNP): released when the heart is stretched; promote sodium excretion and vasodilation.
- **Pressure natriuresis**: higher pressure increases renal sodium excretion, setting the long-term level.
K: Pressure equals output times resistance; the baroreflex corrects changes in seconds, while the kidney, RAAS, ADH and natriuretic peptides control volume and set long-term pressure.
!: Assuming a normal blood pressure rules out significant blood loss. Compensatory tachycardia and vasoconstriction can hold pressure up until a large loss, especially in young people, so falling pressure is a late sign.
EV: established | The baroreflex and RAAS are well-established mechanisms; their pharmacology underpins ACE inhibitors, angiotensin receptor blockers and aldosterone antagonists.
EV: contested | The relative importance of the kidney versus the nervous system in causing essential hypertension remains debated.
T: Total peripheral resistance | The overall resistance to flow of the systemic circulation, mainly set by arteriolar diameter
T: Baroreceptor reflex | Rapid neural control of blood pressure via stretch receptors in the carotid sinus and aortic arch
T: Angiotensin II | A potent vasoconstrictor that also stimulates aldosterone and ADH release
SUM: MAP = CO × TPR.
SUM: The baroreflex acts in seconds; RAAS, ADH and natriuretic peptides act over hours to days.
SUM: Many antihypertensive drugs target RAAS.
SRC: Boron W. F. and Boulpaep E. L., Medical Physiology, 3rd edn, Elsevier | secondary | 2017
SRC: Guyton A. C., "Blood pressure control: special role of the kidneys and body fluids", Science 252(5014), 1813–1816 | primary | 1991
Q: Where are the main arterial baroreceptors? | In the carotid sinus and the aortic arch.
Q: Where is most angiotensin I converted to angiotensin II? | In the lungs, by angiotensin-converting enzyme on endothelial cells.
M1#medicine-u03-03-q1@1: Which hormone is released by the heart when it is stretched and promotes sodium excretion? | Natriuretic peptide (ANP or BNP) | Aldosterone from the adrenal cortex | Renin from the juxtaglomerular cells | Antidiuretic hormone from the pituitary | Atrial and ventricular stretch release ANP and BNP, which promote natriuresis and vasodilation.
M2#medicine-u03-03-q2@2: Blood pressure is 150/90 mmHg. What is the approximate mean arterial pressure? | 110 mmHg | 120 mmHg | 100 mmHg | 130 mmHg | MAP ≈ 90 + ⅓(150 − 90) = 90 + 20 = 110 mmHg.
M3#medicine-u03-03-q3@3: A young man has lost about 1 litre of blood after an injury. His blood pressure is 118/78 mmHg and heart rate 118/min. What is the best interpretation? | He is compensating with tachycardia and vasoconstriction; pressure may fall suddenly and he needs urgent assessment | His normal blood pressure shows the blood loss is clinically unimportant | The fast heart rate must be due to anxiety alone, so no action is needed | His baroreflex has failed, which is why the heart rate is high | Tachycardia is the early sign; hypotension is late. Escalate urgently using local pathways for major haemorrhage.
NUM2#medicine-u03-03-q4@2: A patient has cardiac output 5 L/min and MAP 95 mmHg. If TPR rises by 20% with output unchanged, what is the new MAP, in mmHg? | 114 | 1% | mmHg | MAP = CO × TPR, so a 20% rise in TPR raises MAP by 20%: 95 × 1.2 = 114 mmHg.
SA2#medicine-u03-03-q5@2,3: Describe how the body responds to a sudden fall in blood volume. | Within seconds, reduced baroreceptor firing increases sympathetic and decreases vagal outflow, raising heart rate, contractility and vasoconstriction. Over minutes to hours, reduced renal perfusion activates RAAS: angiotensin II constricts vessels and stimulates thirst and ADH, and aldosterone retains sodium. ADH retains water. Fluid shifts from the interstitium into vessels. | Baroreflex response ; RAAS and angiotensin II ; Aldosterone and ADH ; Thirst or fluid shift

## Atherosclerosis and cardiovascular risk
LV: Clinical · Foundation
S: Atherosclerosis is a chronic inflammatory disease of arteries and the main cause of heart attack, stroke and peripheral arterial disease. This lesson explains how plaques form and rupture, the modifiable and non-modifiable risk factors, and how risk is estimated with QRISK3.
O: Describe the pathogenesis of atherosclerosis from fatty streak to plaque rupture
O: List modifiable and non-modifiable cardiovascular risk factors
O: Explain how 10-year cardiovascular risk is estimated and used in the UK
PRE: Blood pressure regulation
H: Pathogenesis
- **Endothelial dysfunction** from hypertension, smoking, high LDL cholesterol, diabetes and inflammation.
- **LDL** enters the intima and is oxidised; monocytes enter, become macrophages and take up lipid as **foam cells**, forming a **fatty streak**.
- Smooth muscle cells migrate and form a **fibrous cap** over a lipid-rich **necrotic core**: a mature plaque.
- **Stable plaques** narrow the lumen gradually, causing angina or claudication.
- **Vulnerable plaques** have thin caps and large lipid cores; **rupture or erosion** exposes thrombogenic material, triggering **thrombosis**: the cause of most acute coronary syndromes.
H: Risk factors
- **Non-modifiable**: age, male sex, family history of premature cardiovascular disease, ethnicity (higher risk in people of South Asian background).
- **Modifiable**: smoking, hypertension, raised non-HDL cholesterol, diabetes, obesity, physical inactivity, unhealthy diet, excess alcohol.
- Others: chronic kidney disease, rheumatoid arthritis and other inflammatory diseases, severe mental illness, deprivation.
H: Estimating risk
P: In the UK, **QRISK3** estimates 10-year risk of heart attack or stroke for people aged 25–84 without established cardiovascular disease. NICE NG238 (2023) recommends offering a statin for primary prevention when 10-year risk is 10% or more, after discussing lifestyle change and the person's preferences; people with type 1 diabetes, CKD or familial hypercholesterolaemia have separate recommendations, as risk tools underestimate their risk.
X: A 58-year-old man who smokes, with treated hypertension, has a QRISK3 score of 14%.
> This means about 14 in 100 people with his risk profile would have a heart attack or stroke in 10 years.
> NICE recommends discussing a statin, alongside stopping smoking and other lifestyle changes.
> Stopping smoking would lower his estimated risk substantially.
> Shared decision-making uses absolute risk, not a single cholesterol number.
K: Atherosclerosis is inflammatory lipid deposition in the arterial wall; plaque rupture with thrombosis causes most acute events; treatment decisions use absolute 10-year risk from tools such as QRISK3.
!: Judging risk from cholesterol alone. Absolute risk depends on all risk factors together; a modest cholesterol in a smoker with diabetes can carry higher risk than a high cholesterol in a young non-smoker.
EV: established | Lowering LDL cholesterol reduces cardiovascular events in proportion to the absolute reduction (Cholesterol Treatment Trialists' Collaboration).
EV: contested | Where to set treatment thresholds for primary prevention balances benefit, harms and cost, and differs between NICE and other guideline bodies.
T: Foam cell | A macrophage filled with lipid, characteristic of early atherosclerosis
T: Vulnerable plaque | A plaque with a thin fibrous cap and large lipid core, prone to rupture
T: QRISK3 | A UK algorithm estimating 10-year risk of heart attack or stroke
SUM: Endothelial injury, LDL entry and inflammation form plaques.
SUM: Rupture and thrombosis cause acute events.
SUM: QRISK3 risk of 10% or more prompts statin discussion under NICE NG238.
SRC: NICE, Cardiovascular disease: risk assessment and reduction, including lipid modification (NG238) | guidance | 2023 | https://www.nice.org.uk/guidance/ng238
SRC: Libby P. et al., "Atherosclerosis", Nature Reviews Disease Primers 5, 56 | secondary | 2019
SRC: Hippisley-Cox J., Coupland C. and Brindle P., "Development and validation of QRISK3 risk prediction algorithms", BMJ 357, j2099 | primary | 2017
Q: What are foam cells? | Lipid-laden macrophages in the arterial intima, forming fatty streaks.
Q: What threshold of 10-year risk prompts a statin offer in NICE NG238? | A QRISK3 score of 10% or more, after discussing lifestyle and preferences.
M1#medicine-u03-04-q1@1: What event causes most acute coronary syndromes? | Rupture or erosion of a plaque with thrombosis | Gradual narrowing of a stable plaque | Spasm of a normal coronary artery | Embolism of fat from a fracture | Exposure of the plaque core triggers platelet aggregation and thrombosis, suddenly occluding the vessel.
M2#medicine-u03-04-q2@2: Which is a non-modifiable cardiovascular risk factor? | A family history of premature cardiovascular disease | Smoking twenty cigarettes a day | Raised non-HDL cholesterol | Physical inactivity | Family history can't be changed; the others are modifiable.
M3#medicine-u03-04-q3@3: A 35-year-old with type 1 diabetes for 15 years has a low QRISK3 score. What is the best approach? | Follow NICE's separate recommendations for type 1 diabetes, since risk tools underestimate risk in this group | Reassure that no prevention is needed because the score is low | Calculate the risk again until it is above 10% | Use cholesterol alone and ignore diabetes | NICE recommends considering statins for adults with type 1 diabetes who are older than 40, have had diabetes for over 10 years, or have nephropathy or other risk factors, as QRISK3 underestimates their risk.
TF1#medicine-u03-04-q4@1: QRISK3 is intended for people who already have established cardiovascular disease. | false | It estimates risk for people without established cardiovascular disease; those with it are already at high risk and are offered secondary prevention.
SA2#medicine-u03-04-q5@2,3: Explain the stages of atherosclerotic plaque development and how a stable plaque differs from a vulnerable one. | Endothelial dysfunction allows LDL into the intima, where it is oxidised; monocytes become macrophages and foam cells, forming fatty streaks. Smooth muscle cells form a fibrous cap over a lipid-rich core. Stable plaques have thick caps and narrow the lumen slowly, causing exertional symptoms; vulnerable plaques have thin caps, large cores and inflammation, and can rupture, causing thrombosis and acute events. | Endothelial dysfunction and LDL ; Foam cells and fatty streak ; Fibrous cap and core ; Stable versus vulnerable

## Stable angina
LV: Clinical · Application
S: Stable angina is chest discomfort caused by myocardial ischaemia on exertion, relieved by rest. This lesson covers its typical features, NICE's approach to assessing chest pain of recent onset, investigation with CT coronary angiography, and the principles of management.
O: Distinguish typical, atypical and non-anginal chest pain
O: Outline the investigation of suspected stable angina in line with NICE
O: Describe the principles of anti-anginal and secondary prevention treatment
PRE: Atherosclerosis and cardiovascular risk
H: Recognising angina
P: NICE CG95 classifies chest pain by three features:
- Constricting discomfort in the front of the chest, neck, shoulders, jaw or arms.
- Brought on by physical exertion.
- Relieved by rest or GTN within about 5 minutes.
P: All three: **typical angina**. Two: **atypical angina**. One or none: **non-anginal** chest pain. Angina is **stable** if it occurs predictably with a level of exertion; new, worsening or rest pain suggests an acute coronary syndrome.
H: Investigation
- **ECG**, blood tests (full blood count, lipids, HbA1c, renal and thyroid function) and assessment of risk factors.
- NICE CG95 (updated 2016) recommends **CT coronary angiography (CTCA)** as the first-line diagnostic test when angina can't be excluded clinically, or the ECG shows changes of ischaemia.
- **Functional imaging** (stress echo, myocardial perfusion scan, cardiac MRI) if CTCA is non-diagnostic or to assess the significance of known disease; **invasive angiography** if these are inconclusive or revascularisation is being considered.
H: Management (NICE CG126)
- **Explain** the condition and provide **short-acting nitrate** (GTN) for attacks, with advice to call 999 if pain persists after repeat doses.
- **First-line anti-anginal**: a beta-blocker or a calcium-channel blocker; combine them if needed. Other options include long-acting nitrates, ivabradine, nicorandil and ranolazine.
- **Secondary prevention**: antiplatelet therapy, statin, blood pressure control, smoking cessation and exercise.
- **Revascularisation** (PCI or CABG) for symptoms not controlled by optimal medical therapy, or for prognostic anatomy such as significant left main stem disease.
X: A 62-year-old woman has tight chest pain walking uphill, easing with rest in three minutes.
> All three features: typical angina.
> ECG at rest is normal; this doesn't exclude angina.
> NICE recommends CTCA.
> While awaiting tests: GTN for attacks with safety-netting advice, and risk-factor review. Prescribing follows local formularies and current guidance.
K: Typical angina has three features; NICE uses CTCA first-line; management combines GTN, anti-anginal drugs and secondary prevention, with revascularisation for refractory symptoms or high-risk anatomy.
!: Being reassured by a normal resting ECG. Most people with stable angina have a normal ECG at rest; it doesn't exclude coronary artery disease.
EV: established | The ISCHEMIA trial (2020) found that in stable coronary disease with moderate to severe ischaemia, an initial invasive strategy didn't reduce major cardiovascular events compared with optimal medical therapy, though it improved angina.
EV: contested | Which patients benefit prognostically from revascularisation, beyond symptom relief, continues to be refined.
T: Typical angina | Constricting chest discomfort brought on by exertion and relieved by rest or GTN within about 5 minutes
T: CT coronary angiography | A CT scan with contrast that shows the coronary arteries and plaques non-invasively
T: Revascularisation | Restoring blood flow through PCI (stenting) or coronary artery bypass grafting
SUM: Typical, atypical and non-anginal pain are classified by three features.
SUM: CTCA is the first-line test in NICE guidance.
SUM: Treat with GTN, anti-anginals, secondary prevention, and revascularisation where needed.
SRC: NICE, Recent-onset chest pain of suspected cardiac origin: assessment and diagnosis (CG95) | guidance | 2016 | https://www.nice.org.uk/guidance/cg95
SRC: NICE, Stable angina: management (CG126) | guidance | 2016 | https://www.nice.org.uk/guidance/cg126
SRC: Maron D. J. et al., "Initial invasive or conservative strategy for stable coronary disease", New England Journal of Medicine 382(15), 1395–1407 | primary | 2020
Q: What three features define typical angina? | Constricting chest discomfort; brought on by exertion; relieved by rest or GTN within about 5 minutes.
Q: What is NICE's first-line test for suspected stable angina? | CT coronary angiography.
M1#medicine-u03-05-q1@1: Chest pain with two of the three anginal features is classified as what? | Atypical angina | Typical angina | Non-anginal chest pain | Unstable angina | Two features make atypical angina; all three typical; one or none non-anginal.
M2#medicine-u03-05-q2@2: Which drugs does NICE recommend first-line to prevent anginal episodes? | A beta-blocker or a calcium-channel blocker | Ivabradine or ranolazine | A long-acting nitrate alone | An ACE inhibitor alone | NICE CG126 recommends a beta-blocker or calcium-channel blocker first, combined if needed.
M3#medicine-u03-05-q3@3: A man with known angina now gets chest pain at rest lasting 20 minutes. What is the most appropriate next step? | Treat as a possible acute coronary syndrome and seek emergency assessment | Increase his anti-anginal drugs and review in a month | Arrange a routine CT coronary angiogram | Reassure him, since his angina is already diagnosed | Rest pain or a change in pattern suggests an acute coronary syndrome; call for emergency help in line with local pathways.
TF1#medicine-u03-05-q4@1: A normal resting ECG rules out stable angina. | false | The resting ECG is often normal in stable angina; ischaemia appears only on exertion.
SA2#medicine-u03-05-q5@3: Evaluate the role of revascularisation compared with medical therapy in stable angina. | Optimal medical therapy (anti-anginal drugs and secondary prevention) is the foundation for all patients. Revascularisation improves symptoms when medicines fail and improves prognosis in specific anatomy such as left main stem or extensive disease with poor LV function. The ISCHEMIA trial found an initial invasive strategy didn't reduce major events in most stable patients, so revascularisation is mainly for symptoms or high-risk anatomy, decided with the patient and heart team. | Medical therapy for all ; Symptom benefit of revascularisation ; Prognostic benefit in selected anatomy ; ISCHEMIA evidence

## Acute coronary syndromes
LV: Clinical · Application
S: Acute coronary syndromes (ACS) are unstable angina, NSTEMI and STEMI, caused by sudden reduction of coronary blood flow. This lesson covers their recognition, ECG and troponin diagnosis, and the principles of urgent management, especially reperfusion for STEMI.
O: Distinguish unstable angina, NSTEMI and STEMI
O: Interpret ECG and high-sensitivity troponin findings in suspected ACS
O: Outline the principles of immediate management and reperfusion in line with NICE
PRE: Stable angina
H: The spectrum
- **Unstable angina**: ischaemic symptoms at rest or rapidly worsening, without troponin rise.
- **NSTEMI**: myocardial infarction (rise and fall of troponin above the 99th percentile with ischaemic features) without persistent ST elevation.
- **STEMI**: infarction with persistent ST elevation (or new left bundle branch block in the right clinical context), usually from complete occlusion of a coronary artery.
P: The **Fourth Universal Definition of Myocardial Infarction** (2018) defines MI as acute myocardial injury (troponin rise) with clinical evidence of ischaemia; it separates type 1 MI (plaque rupture) from type 2 (supply–demand mismatch, for example in sepsis or anaemia).
H: Recognition
- Central chest pain or pressure, often radiating to the arm or jaw, lasting over 15 minutes, with sweating, nausea or breathlessness.
- Atypical presentations are more common in older people, women and people with diabetes.
- **12-lead ECG** as soon as possible (ideally within 10 minutes of arrival); serial ECGs if the first is non-diagnostic.
- **High-sensitivity troponin** at presentation and repeated according to local protocol.
H: Principles of management
- **Call for help** and follow local ACS pathways; monitor, with resuscitation available.
- **Antiplatelet therapy** (aspirin, then a second agent as guided) and pain relief.
- **Oxygen** only if hypoxic (target saturations per BTS guidance), not routinely.
- **STEMI**: urgent reperfusion. NICE NG185 recommends **primary PCI** if presenting within 12 hours of symptom onset and PCI can be delivered within 120 minutes of the time fibrinolysis could have been given; otherwise **fibrinolysis**.
- **NSTEMI or unstable angina**: risk stratify (for example with the GRACE score); angiography within 72 hours for intermediate or higher risk.
X: A 67-year-old man has had crushing central chest pain for 40 minutes. ECG shows 3 mm ST elevation in V1–V4.
> Diagnosis: anterior STEMI, likely left anterior descending artery occlusion.
> Call the emergency team and activate the local primary PCI pathway.
> Give antiplatelet therapy and pain relief per local protocol; oxygen only if saturations are low.
> Time is myocardium: delays increase infarct size and mortality.
K: ACS ranges from unstable angina to STEMI; ECG and serial high-sensitivity troponin make the diagnosis; STEMI needs immediate reperfusion, preferably primary PCI within NICE's time window.
!: Waiting for a troponin result before acting on ST elevation. STEMI is diagnosed from the ECG and symptoms; troponin can be normal early, and delay costs myocardium.
EV: established | Primary PCI delivered promptly reduces mortality compared with fibrinolysis (Keeley et al., 2003 meta-analysis).
EV: established | Routine oxygen in normoxic patients with suspected MI doesn't improve survival (DETO2X-AMI, 2017).
T: NSTEMI | Myocardial infarction without persistent ST elevation, diagnosed by a troponin rise with ischaemic features
T: Primary PCI | Emergency coronary angioplasty and stenting as the first reperfusion treatment for STEMI
T: Type 2 myocardial infarction | Infarction caused by imbalance between oxygen supply and demand, not plaque rupture
SUM: ACS includes unstable angina, NSTEMI and STEMI.
SUM: ECG within 10 minutes and serial high-sensitivity troponin.
SUM: STEMI: primary PCI within the time window, otherwise fibrinolysis.
SRC: NICE, Acute coronary syndromes (NG185) | guidance | 2020 | https://www.nice.org.uk/guidance/ng185
SRC: Thygesen K. et al., "Fourth universal definition of myocardial infarction (2018)", European Heart Journal 40(3), 237–269 | guidance | 2019
SRC: Hofmann R. et al., "Oxygen therapy in suspected acute myocardial infarction", New England Journal of Medicine 377(13), 1240–1249 | primary | 2017
Q: How is NSTEMI distinguished from unstable angina? | NSTEMI has a rise and fall in troponin indicating myocardial infarction; unstable angina doesn't.
Q: When should oxygen be given in suspected ACS? | Only when the patient is hypoxic, not routinely.
M1#medicine-u03-06-q1@1: Which finding defines STEMI? | Persistent ST elevation with symptoms of ischaemia | A troponin rise without ECG change | Chest pain relieved by GTN | T-wave inversion alone | STEMI is defined by persistent ST elevation (or equivalent) in the context of ischaemic symptoms.
M2#medicine-u03-06-q2@2: A patient with STEMI presents 3 hours after onset to a hospital that can deliver primary PCI within 60 minutes. What reperfusion is preferred? | Primary PCI | Fibrinolysis | Coronary artery bypass grafting | No reperfusion, only antiplatelets | Within 12 hours and with PCI deliverable within the NICE time window, primary PCI is preferred.
M3#medicine-u03-06-q3@3: A woman with severe pneumonia and septic shock has a modest troponin rise without chest pain or ST changes. What is the most likely explanation? | Myocardial injury or a type 2 MI from supply–demand mismatch, not plaque rupture | A type 1 STEMI needing immediate primary PCI | Laboratory error, since troponin only rises in plaque rupture | Unstable angina, which always raises troponin | Troponin rises in many acute illnesses; sepsis causes demand ischaemia (type 2 MI) or non-ischaemic injury. Treat the cause and seek senior review.
TF2#medicine-u03-06-q4@1: In suspected STEMI, reperfusion should be delayed until a troponin result is available. | false | STEMI is diagnosed from symptoms and the ECG; waiting for troponin delays reperfusion and loses myocardium.
SA2#medicine-u03-06-q5@2,3: Outline the immediate assessment and management of a patient presenting with suspected STEMI. | Recognise ischaemic symptoms and record a 12-lead ECG immediately; identify ST elevation. Call for help and activate the local primary PCI pathway. Monitor with resuscitation facilities available. Give antiplatelet therapy and analgesia as per protocol, oxygen only if hypoxic. Arrange primary PCI if within the NICE time window, otherwise fibrinolysis. Check troponin and bloods without delaying reperfusion. | Immediate ECG ; Escalate and activate PCI pathway ; Antiplatelets, analgesia, oxygen only if hypoxic ; Reperfusion choice by time window

## Secondary prevention after myocardial infarction
LV: Clinical · Application
S: After a myocardial infarction, the aim is to prevent another event and help the person recover. This lesson covers the drug classes recommended by NICE, cardiac rehabilitation, lifestyle change, and practical advice on driving, work and sex.
O: List the drug classes recommended for secondary prevention after MI and their purpose
O: Describe the components and benefits of cardiac rehabilitation
O: Give appropriate lifestyle and practical advice after MI
PRE: Acute coronary syndromes
H: Drug treatment (NICE NG185)
- **Dual antiplatelet therapy**: aspirin plus a second antiplatelet (such as ticagrelor or prasugrel) usually for up to 12 months, then aspirin long term, balancing ischaemic and bleeding risk.
- **ACE inhibitor** (or ARB if not tolerated), titrated as tolerated, especially with reduced ejection fraction.
- **Beta-blocker**, particularly with reduced ejection fraction or ongoing angina.
- **High-intensity statin**, with lipid targets reviewed under NICE NG238.
- **Aldosterone antagonist** if there is heart failure with reduced ejection fraction.
P: Check renal function and potassium when starting and titrating ACE inhibitors and aldosterone antagonists. Prescribing follows current guidance, the BNF and local formularies.
H: Cardiac rehabilitation
P: Cardiac rehabilitation combines **supervised exercise**, **education** (about the condition, medicines and risk factors) and **psychological support**. A Cochrane review (Dibben et al., 2021) found exercise-based rehabilitation reduces cardiovascular mortality and hospital admissions and improves quality of life. Uptake in the UK is lower than it should be, especially among women, older people and minority ethnic groups.
H: Lifestyle and practical advice
- **Stop smoking**, the single most effective change; offer support and stop-smoking medicines.
- **Mediterranean-style diet**, regular physical activity, weight management and alcohol within UK guidelines.
- **Driving**: DVLA rules depend on the type of licence and the treatment received; advise the person to check current DVLA guidance before driving.
- **Work and sex**: most people can return to work and resume sexual activity once they feel well; PDE5 inhibitors must not be taken with nitrates.
X: A 55-year-old man is discharged after PCI for an NSTEMI.
> Medicines: dual antiplatelet therapy, ACE inhibitor, beta-blocker and statin, with a plan for review.
> Referral to cardiac rehabilitation, with start ideally within 10 days of discharge per NICE.
> He smokes: offer behavioural support and medication.
> He drives a car for work: advise him to check DVLA rules for his licence group.
K: Secondary prevention after MI combines antiplatelets, ACE inhibitor, beta-blocker and statin with cardiac rehabilitation and lifestyle change; smoking cessation gives the largest single benefit.
!: Stopping dual antiplatelet therapy early without advice. Premature discontinuation after a stent raises the risk of stent thrombosis; changes should be made with the cardiology team.
EV: established | Exercise-based cardiac rehabilitation reduces cardiovascular mortality and admissions (Dibben et al., 2021).
EV: contested | The optimal duration of dual antiplatelet therapy for individual patients continues to be refined by trials balancing ischaemia and bleeding.
T: Dual antiplatelet therapy | Treatment with aspirin plus a second antiplatelet drug after ACS or coronary stenting
T: Cardiac rehabilitation | A programme of exercise, education and psychological support after a cardiac event
T: Secondary prevention | Measures to prevent further events in people who already have a disease
SUM: Antiplatelets, ACE inhibitor, beta-blocker and statin are core drugs.
SUM: Cardiac rehabilitation reduces mortality and admissions.
SUM: Smoking cessation, diet, activity and practical advice support recovery.
SRC: NICE, Acute coronary syndromes (NG185) | guidance | 2020 | https://www.nice.org.uk/guidance/ng185
SRC: Dibben G. et al., "Exercise-based cardiac rehabilitation for coronary heart disease", Cochrane Database of Systematic Reviews 11, CD001800 | secondary | 2021
SRC: Driver and Vehicle Licensing Agency, Assessing fitness to drive: a guide for medical professionals | guidance | 2025 | https://www.gov.uk/guidance/assessing-fitness-to-drive-a-guide-for-medical-professionals
Q: What are the components of cardiac rehabilitation? | Supervised exercise, education about the condition and risk factors, and psychological support.
Q: Which drug class must not be combined with nitrates? | PDE5 inhibitors, such as sildenafil.
M1#medicine-u03-07-q1@1: Which lifestyle change gives the greatest single benefit after MI in a smoker? | Stopping smoking | Reducing salt intake | Losing a small amount of weight | Taking vitamin supplements | Stopping smoking roughly halves the risk of further events compared with continuing.
M2#medicine-u03-07-q2@2: What should be checked after starting an ACE inhibitor following MI? | Renal function and potassium | Liver enzymes only | Thyroid function | Full blood count only | ACE inhibitors can raise potassium and creatinine, so these are monitored when starting and titrating.
M3#medicine-u03-07-q3@3: Three months after a drug-eluting stent, a patient wants to stop his second antiplatelet before dental work. What is the best advice? | Don't stop without discussing with the cardiology team, because early cessation risks stent thrombosis | Stop both antiplatelets for a week before the dental work | Stop the second antiplatelet immediately, as dental work always takes priority | Double the aspirin dose instead of the second antiplatelet | Most dental procedures can proceed on antiplatelets; any interruption needs specialist advice because stent thrombosis can be fatal.
TF1#medicine-u03-07-q4@1: Cardiac rehabilitation is only for people who have had heart surgery. | false | It is recommended after MI, PCI, CABG and for heart failure, not only after surgery.
SA2#medicine-u03-07-q5@2,3: Explain the purpose of each of the main drug classes used in secondary prevention after MI. | Antiplatelets reduce platelet aggregation and the risk of further thrombosis, including stent thrombosis. ACE inhibitors limit adverse remodelling and reduce mortality, especially with reduced ejection fraction. Beta-blockers reduce myocardial oxygen demand and arrhythmias. Statins lower LDL cholesterol and stabilise plaques, reducing recurrent events. | Antiplatelets ; ACE inhibitors ; Beta-blockers ; Statins

## Heart failure: causes and classification
LV: Clinical · Foundation
S: Heart failure is a clinical syndrome in which the heart can't pump enough blood to meet the body's needs at normal filling pressures. This lesson covers its causes, classification by ejection fraction and symptoms, the clinical features, and diagnosis using NT-proBNP and echocardiography.
O: Describe the main causes of heart failure
O: Classify heart failure by ejection fraction and NYHA class
O: Outline the diagnostic pathway for suspected chronic heart failure in line with NICE
PRE: The cardiac cycle and cardiac output
H: Causes
- **Ischaemic heart disease**: the most common cause in the UK.
- **Hypertension**, **valvular disease**, **cardiomyopathies**, **arrhythmias** (especially AF).
- **Toxins**: alcohol, some chemotherapy drugs (such as anthracyclines).
- **High-output states** (rare): severe anaemia, thyrotoxicosis.
H: Classification
- **HFrEF** (reduced EF): EF 40% or less.
- **HFmrEF** (mildly reduced): EF 41–49%.
- **HFpEF** (preserved): EF 50% or more, with evidence of raised filling pressures or structural disease.
P: The **New York Heart Association (NYHA)** class describes symptoms: I no limitation; II slight limitation with ordinary activity; III marked limitation with less than ordinary activity; IV symptoms at rest.
H: Features and diagnosis
- **Symptoms**: breathlessness on exertion, orthopnoea, paroxysmal nocturnal dyspnoea, fatigue, ankle swelling.
- **Signs**: raised JVP, displaced apex, S3, crackles, peripheral oedema.
- **NICE NG106**: measure **NT-proBNP**. Above 2,000 ng/L: specialist assessment and echocardiography within 2 weeks. 400–2,000 ng/L: within 6 weeks. Below 400 ng/L makes heart failure less likely (in someone not on treatment).
- **Echocardiography** confirms the diagnosis and measures EF; ECG and blood tests look for causes.
X: A 72-year-old woman has six months of breathlessness on exertion and ankle swelling.
> Examination: JVP raised, bibasal crackles, pitting oedema.
> NT-proBNP is 2,600 ng/L.
> NICE: refer for specialist assessment and echo within 2 weeks.
> Echo shows EF 30%: HFrEF. The ECG shows Q waves, suggesting previous infarction.
K: Heart failure is classified by EF (reduced, mildly reduced, preserved) and NYHA class; NT-proBNP triages who needs echocardiography and how urgently.
!: Ruling out heart failure in an obese patient on a borderline NT-proBNP. Obesity lowers natriuretic peptide levels, and some drugs (such as diuretics, ACE inhibitors and beta-blockers) also reduce them; interpret results in context.
EV: established | NT-proBNP has high sensitivity for heart failure and is used to triage referrals.
EV: contested | Where to draw the EF boundaries between categories, and whether HFmrEF is a distinct entity, is debated; definitions have changed between guidelines.
T: HFrEF | Heart failure with reduced ejection fraction, 40% or less
T: HFpEF | Heart failure with preserved ejection fraction, 50% or more, with raised filling pressures or structural disease
T: NT-proBNP | A peptide released by stretched ventricular muscle, used to triage suspected heart failure
SUM: Ischaemic heart disease is the commonest cause.
SUM: Classify by EF and NYHA class.
SUM: NT-proBNP guides urgency of echo; echo confirms the type.
SRC: NICE, Chronic heart failure in adults: diagnosis and management (NG106) | guidance | 2018 | https://www.nice.org.uk/guidance/ng106
SRC: McDonagh T. A. et al., "2021 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure", European Heart Journal 42(36), 3599–3726 | guidance | 2021
Q: What ejection fraction defines HFrEF? | 40% or less.
Q: What does NYHA class III mean? | Marked limitation of activity: symptoms with less than ordinary activity.
M1#medicine-u03-08-q1@1: What is the most common cause of heart failure in the UK? | Ischaemic heart disease | Thyrotoxicosis | Viral myocarditis | Severe anaemia | Coronary disease and previous MI are the leading causes of heart failure in the UK.
M2#medicine-u03-08-q2@2: A breathless man has an NT-proBNP of 900 ng/L. What does NICE recommend? | Specialist assessment and echocardiography within 6 weeks | Echocardiography within 2 weeks | No further assessment, as heart failure is excluded | Immediate admission to a cardiac care unit | 400–2,000 ng/L triggers specialist assessment and echo within 6 weeks.
M3#medicine-u03-08-q3@3: An obese woman with breathlessness and oedema has an NT-proBNP of 350 ng/L. What is the best interpretation? | Heart failure is less likely but not excluded, since obesity lowers NT-proBNP; consider clinical context | Heart failure is ruled out completely and needs no further thought | The result proves she has severe HFrEF | NT-proBNP is never affected by body weight | Obesity can lower NT-proBNP; if clinical suspicion is high, discuss with a specialist.
MATCH1#medicine-u03-08-q4@1: Match each ejection fraction to its category. | EF 30% = HFrEF ; EF 45% = HFmrEF ; EF 60% with raised filling pressures = HFpEF ; EF 40% = HFrEF | The boundaries are 40% or less, 41–49%, and 50% or more.
SA2#medicine-u03-08-q5@2,3: Describe the symptoms and signs of chronic heart failure and explain their mechanisms. | Breathlessness, orthopnoea and paroxysmal nocturnal dyspnoea result from raised left-sided pressures causing pulmonary congestion, worse lying flat as fluid redistributes. Fatigue reflects low output. Ankle swelling and raised JVP result from fluid retention via RAAS activation and raised right-sided pressures. An S3 and displaced apex reflect a dilated ventricle; crackles reflect pulmonary oedema. | Pulmonary congestion symptoms ; Fatigue from low output ; Fluid retention and RAAS ; Signs explained

## Managing chronic heart failure
LV: Clinical · Application
S: Treatment of chronic heart failure aims to relieve symptoms, reduce admissions and prolong life. This lesson covers the drug classes that improve survival in HFrEF, symptomatic treatment with diuretics, device therapy, and the management of HFpEF.
O: Describe the prognostic drug classes for HFrEF and how they are introduced
O: Explain the role of diuretics and devices in heart failure
O: Outline management of HFpEF and non-drug measures
PRE: Heart failure: causes and classification
H: Drugs that improve survival in HFrEF
P: Four classes reduce mortality and hospitalisation (the "four pillars" in ESC 2021 guidance):
- **ACE inhibitor** (or ARB), or **sacubitril–valsartan** (an angiotensin receptor–neprilysin inhibitor) in people who remain symptomatic.
- **Beta-blocker** licensed for heart failure (bisoprolol, carvedilol or nebivolol), started low and titrated slowly.
- **Mineralocorticoid receptor antagonist** (spironolactone or eplerenone).
- **SGLT2 inhibitor** (dapagliflozin or empagliflozin), recommended by NICE technology appraisals.
P: Monitor renal function, potassium and blood pressure. Prescribing follows NICE, the BNF and specialist advice.
H: Symptoms and devices
- **Loop diuretics** relieve congestion and breathlessness but don't improve survival; adjust to the lowest dose that keeps the person euvolaemic.
- **Implantable cardioverter-defibrillator (ICD)** for selected people at high risk of ventricular arrhythmias.
- **Cardiac resynchronisation therapy (CRT)** for those with low EF and a broad QRS, especially left bundle branch block.
H: HFpEF and general measures
- **HFpEF**: diuretics for congestion; SGLT2 inhibitors reduce hospitalisation (EMPEROR-Preserved, 2021; DELIVER, 2022); treat hypertension, AF and other conditions.
- **For all**: cardiac rehabilitation, annual influenza and pneumococcal vaccination, daily weights to spot fluid gain, avoiding drugs that worsen heart failure (NSAIDs; verapamil and diltiazem in HFrEF), and palliative care when appropriate.
X: A 68-year-old with HFrEF (EF 30%) is breathless on mild exertion on furosemide alone.
> Start an ACE inhibitor and beta-blocker, introduced and titrated one at a time with blood monitoring.
> Add an MRA and an SGLT2 inhibitor as tolerated.
> Diuretic dose is adjusted to her weight and symptoms.
> If EF stays low and QRS is broad after optimal treatment, refer for CRT assessment.
K: HFrEF is treated with four prognostic drug classes plus diuretics for symptoms and devices for selected patients; HFpEF relies on diuretics, SGLT2 inhibitors and treating comorbidities.
!: Stopping a beta-blocker because the patient is in heart failure. Beta-blockers licensed for heart failure improve survival; they are started low and titrated, and only rarely stopped in acute decompensation on specialist advice.
EV: established | ACE inhibitors, beta-blockers, MRAs and SGLT2 inhibitors each reduce mortality or hospitalisation in HFrEF in large randomised trials.
EV: contested | Whether to start all four classes together rapidly or in sequence is debated; trials such as STRONG-HF (2022) support rapid up-titration.
T: Sacubitril–valsartan | An angiotensin receptor–neprilysin inhibitor used in HFrEF
T: SGLT2 inhibitor | A drug class blocking renal glucose reabsorption that reduces heart failure events
T: Cardiac resynchronisation therapy | A pacing device that coordinates contraction of the left and right ventricles
SUM: Four drug classes improve survival in HFrEF.
SUM: Diuretics relieve symptoms; ICD and CRT for selected patients.
SUM: HFpEF: diuretics, SGLT2 inhibitors and comorbidity treatment.
SRC: NICE, Chronic heart failure in adults: diagnosis and management (NG106) | guidance | 2018 | https://www.nice.org.uk/guidance/ng106
SRC: McDonagh T. A. et al., "2021 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure", European Heart Journal 42(36), 3599–3726 | guidance | 2021
SRC: McMurray J. J. V. et al., "Dapagliflozin in patients with heart failure and reduced ejection fraction", New England Journal of Medicine 381(21), 1995–2008 | primary | 2019
Q: Name the four drug classes that improve prognosis in HFrEF. | ACE inhibitor/ARB/ARNI, beta-blocker, mineralocorticoid receptor antagonist and SGLT2 inhibitor.
Q: Do loop diuretics improve survival in heart failure? | No: they relieve congestion and symptoms but haven't been shown to reduce mortality.
M1#medicine-u03-09-q1@1: Which beta-blocker is licensed for heart failure? | Bisoprolol | Atenolol | Propranolol | Sotalol | Bisoprolol, carvedilol and nebivolol are licensed for heart failure.
M2#medicine-u03-09-q2@2: A patient with HFrEF has an EF of 28% and QRS duration of 160 ms with left bundle branch block despite optimal drugs. What should be considered? | Cardiac resynchronisation therapy | Stopping all diuretics | Adding verapamil | No further treatment | CRT improves symptoms and survival in people with low EF and broad QRS, especially LBBB.
M3#medicine-u03-09-q3@3: A man with HFrEF is prescribed a regular NSAID for knee pain and becomes more oedematous. What is the most likely explanation? | NSAIDs cause sodium and water retention and can worsen heart failure | NSAIDs are a treatment for heart failure | His beta-blocker has stopped working | Knee pain causes fluid retention | NSAIDs impair renal sodium excretion and can precipitate decompensation; they should be avoided where possible.
TF1#medicine-u03-09-q4@2: SGLT2 inhibitors reduce heart failure events in both HFrEF and HFpEF. | true | Trials such as DAPA-HF, EMPEROR-Preserved and DELIVER showed reduced hospitalisation across ejection fractions.
SA2#medicine-u03-09-q5@3: Explain why drugs for HFrEF are started at low doses and titrated, and what monitoring is needed. | Beta-blockers can initially worsen symptoms by reducing contractility, and ACE inhibitors, ARNI and MRAs can cause hypotension, kidney dysfunction and hyperkalaemia. Starting low and titrating gradually allows adaptation and reduces adverse effects. Monitor blood pressure, heart rate, renal function and potassium after each change, and watch for symptoms. Target or maximum tolerated doses give the greatest benefit. | Initial adverse effects ; Hypotension, renal and potassium risks ; Monitoring ; Aim for target doses

## Valvular heart disease
LV: Clinical · Application
S: Valve disease causes narrowing (stenosis) or leaking (regurgitation). This lesson covers aortic stenosis, aortic regurgitation, mitral regurgitation and mitral stenosis: their causes, murmurs, signs and the principles of treatment, including TAVI.
O: Describe the causes and clinical features of the main valve lesions
O: Distinguish murmurs by timing, location and radiation
O: Outline indications for valve intervention
PRE: The cardiac cycle and cardiac output
H: Aortic stenosis
- **Causes**: age-related calcification (most common), bicuspid aortic valve (presents younger), rheumatic disease.
- **Symptoms**: exertional breathlessness, angina, syncope.
- **Signs**: ejection systolic murmur at the right second intercostal space radiating to the carotids; slow-rising pulse; soft or absent S2 when severe.
- **Severe**: aortic valve area under 1.0 cm^{2}, mean gradient over 40 mmHg or peak velocity over 4 m/s on echo.
- **Treatment**: intervention for symptomatic severe AS: surgical valve replacement (SAVR) or **transcatheter aortic valve implantation (TAVI)**, decided by a heart team.
H: Other valve lesions
- **Aortic regurgitation**: early diastolic murmur at the left sternal edge, best heard leaning forward in expiration; collapsing pulse; wide pulse pressure. Causes include aortic root dilatation and endocarditis.
- **Mitral regurgitation**: pansystolic murmur at the apex radiating to the axilla. Causes: degenerative (prolapse), functional (dilated ventricle), ischaemic, endocarditis.
- **Mitral stenosis**: mid-diastolic rumbling murmur at the apex, loud S1, opening snap; usually rheumatic. Often causes atrial fibrillation.
P: Echocardiography is the key investigation for every suspected valve lesion: it confirms the lesion, grades its severity and measures ventricular size and function. NICE NG208 recommends echocardiography for adults with a murmur and symptoms, or a murmur suggestive of significant disease, and regular surveillance for moderate or severe lesions.
X: An 80-year-old man faints while climbing stairs. He has an ejection systolic murmur radiating to the neck.
> Exertional syncope and this murmur suggest severe aortic stenosis.
> Arrange urgent echocardiography and cardiology review; advise him not to drive until assessed.
> Echo: valve area 0.7 cm^{2}, mean gradient 52 mmHg.
> Symptomatic severe AS needs intervention; at his age and risk, TAVI is likely to be discussed by the heart team.
K: Murmurs are identified by timing, location and radiation; symptomatic severe aortic stenosis is an indication for valve intervention, by surgery or TAVI.
!: Treating an ejection systolic murmur as innocent in an older person with exertional symptoms. Syncope, angina or breathlessness with this murmur needs urgent echocardiography.
EV: established | Symptomatic severe aortic stenosis has a poor prognosis without valve replacement.
EV: contested | The choice between TAVI and surgery in younger, lower-risk patients is still being informed by long-term durability data.
T: Ejection systolic murmur | A crescendo–decrescendo murmur during systole, typical of aortic stenosis
T: TAVI | Transcatheter aortic valve implantation: replacing the aortic valve through a catheter, usually via the femoral artery
T: Pansystolic murmur | A murmur of constant intensity throughout systole, typical of mitral regurgitation
SUM: AS: ejection systolic murmur to carotids, slow-rising pulse; TAVI or surgery if symptomatic and severe.
SUM: AR: early diastolic; MR: pansystolic to axilla; MS: mid-diastolic with AF.
SUM: Heart teams decide on intervention.
SRC: NICE, Heart valve disease presenting in adults: investigation and management (NG208) | guidance | 2021 | https://www.nice.org.uk/guidance/ng208
SRC: Vahanian A. et al., "2021 ESC/EACTS Guidelines for the management of valvular heart disease", European Heart Journal 43(7), 561–632 | guidance | 2022
Q: What murmur does mitral regurgitation cause? | A pansystolic murmur at the apex radiating to the axilla.
Q: What are the three classic symptoms of severe aortic stenosis? | Exertional breathlessness, angina and syncope.
M1#medicine-u03-10-q1@1: What is the most common cause of aortic stenosis in older adults in the UK? | Age-related calcific degeneration | Rheumatic heart disease | Infective endocarditis | Marfan syndrome | Calcific degeneration of a tricuspid valve is the leading cause in older people; bicuspid valves present younger.
M2#medicine-u03-10-q2@2: A patient has an early diastolic murmur at the left sternal edge and a collapsing pulse. Which lesion is most likely? | Aortic regurgitation | Aortic stenosis | Mitral stenosis | Mitral regurgitation | Backflow from the aorta in diastole gives an early diastolic murmur and wide pulse pressure.
M3#medicine-u03-10-q3@3: A 45-year-old with a bicuspid aortic valve has moderate stenosis on echo and no symptoms. What is the most appropriate plan? | Regular echocardiographic surveillance and advice to report symptoms promptly | Immediate TAVI, because all bicuspid valves need replacing | Discharge, since bicuspid valves never progress | Long-term antibiotics to slow progression | Asymptomatic moderate AS is monitored; intervention is triggered by symptoms, severe disease or LV dysfunction.
MATCH1#medicine-u03-10-q4@1: Match each lesion to its murmur. | Aortic stenosis = Ejection systolic, radiating to carotids ; Mitral regurgitation = Pansystolic, radiating to axilla ; Aortic regurgitation = Early diastolic at left sternal edge ; Mitral stenosis = Mid-diastolic at apex | Timing, location and radiation together identify the lesion.
SA2#medicine-u03-10-q5@2,3: Explain why exertional syncope is a serious symptom in a patient with aortic stenosis. | In severe aortic stenosis, the narrowed valve fixes cardiac output. During exercise, vasodilation in muscles lowers peripheral resistance, but output can't rise to compensate, so blood pressure and cerebral perfusion fall, causing syncope. Arrhythmias may also contribute. Symptomatic severe AS has a high risk of sudden death without intervention, so urgent echo and cardiology review are needed. | Fixed cardiac output ; Vasodilation on exercise ; Reduced cerebral perfusion ; Prognosis and urgency

## Infective endocarditis
LV: Clinical · Application
S: Infective endocarditis is infection of the heart's inner lining, usually the valves. This lesson covers who is at risk, the organisms involved, the clinical features, diagnosis with blood cultures, echocardiography and the Duke criteria, and the principles of treatment and prevention.
O: Identify risk factors and common causative organisms
O: Recognise the clinical features of infective endocarditis
O: Apply the principles of diagnosis using blood cultures, echocardiography and the Duke criteria
PRE: Valvular heart disease
H: Risk and organisms
- **Risk factors**: prosthetic valves, previous endocarditis, congenital heart disease, valve disease, injecting drug use, intravascular devices and haemodialysis.
- **Staphylococcus aureus**: now the most common cause in high-income countries; acute and destructive; associated with injecting drug use and healthcare.
- **Viridans streptococci**: oral origin; subacute course.
- **Enterococci**, **coagulase-negative staphylococci** (prosthetic valves) and, rarely, HACEK organisms and fungi.
- In **injecting drug use**, the **tricuspid valve** is often involved.
H: Clinical features
- **Fever** (very common) with a **new or changed murmur**.
- **Vascular phenomena**: splinter haemorrhages, Janeway lesions (painless palm and sole macules), emboli to brain, kidneys, spleen or lungs.
- **Immunological phenomena**: Osler's nodes (painful finger pulp nodules), Roth spots, glomerulonephritis.
- Non-specific weight loss, malaise and anaemia in subacute disease.
H: Diagnosis and treatment
- **Blood cultures**: at least three sets from separate venepunctures, **before antibiotics** if the patient is stable.
- **Echocardiography**: transthoracic first, transoesophageal if negative but suspicion is high or a prosthetic valve is present.
- **Modified Duke criteria** (updated as the 2023 Duke–ISCVID criteria): major criteria are typical organisms in blood cultures and imaging evidence of endocardial involvement; minor criteria include predisposition, fever, vascular and immunological phenomena.
- **Treatment**: prolonged intravenous antibiotics guided by microbiology; surgery for heart failure, uncontrolled infection or high embolic risk; management by an endocarditis team.
X: A 34-year-old who injects drugs has fever, breathlessness and a pansystolic murmur at the left lower sternal edge.
> A tricuspid regurgitation murmur suggests right-sided endocarditis.
> Septic pulmonary emboli may explain the breathlessness.
> Take three sets of blood cultures before antibiotics (if stable) and arrange echocardiography.
> Escalate to senior and specialist teams; S. aureus is the most likely organism.
K: Fever with a new murmur is endocarditis until proven otherwise; take multiple blood cultures before antibiotics, image the heart, and apply the Duke criteria.
!: Giving antibiotics for "fever of unknown origin" before blood cultures in a patient with a murmur. This can make cultures negative and delay diagnosis; in a stable patient, take cultures first. If the patient is septic, follow local sepsis guidance without delay.
EV: established | S. aureus has become the leading cause of endocarditis in high-income countries (Murdoch et al., 2009).
EV: contested | NICE (CG64) doesn't recommend routine antibiotic prophylaxis before dental procedures, whereas ESC and AHA guidance recommends it for the highest-risk patients.
T: Infective endocarditis | Infection of the endocardium, usually involving the heart valves
T: Duke criteria | Diagnostic criteria for endocarditis combining microbiology, imaging and clinical findings
T: Janeway lesions | Painless haemorrhagic macules on the palms and soles in endocarditis
SUM: Prosthetic valves, valve disease and injecting drug use increase risk.
SUM: S. aureus is now the most common organism.
SUM: Three blood cultures, echo and the Duke criteria make the diagnosis.
SRC: Fowler V. G. et al., "The 2023 Duke–International Society for Cardiovascular Infectious Diseases Criteria for Infective Endocarditis", Clinical Infectious Diseases 77(4), 518–526 | guidance | 2023
SRC: NICE, Prophylaxis against infective endocarditis (CG64) | guidance | 2016 | https://www.nice.org.uk/guidance/cg64
SRC: Murdoch D. R. et al., "Clinical presentation, etiology, and outcome of infective endocarditis in the 21st century", Archives of Internal Medicine 169(5), 463–473 | primary | 2009
Q: How many sets of blood cultures should be taken in suspected endocarditis? | At least three, from separate venepunctures, ideally before antibiotics.
Q: Which valve is commonly affected in people who inject drugs? | The tricuspid valve.
M1#medicine-u03-11-q1@1: Which organism is now the most common cause of infective endocarditis in high-income countries? | Staphylococcus aureus | Streptococcus pneumoniae | Escherichia coli | Candida albicans | S. aureus has overtaken viridans streptococci as the leading cause.
M2#medicine-u03-11-q2@2: What are Osler's nodes? | Painful nodules on the finger pulps | Painless macules on the palms and soles | Retinal haemorrhages with pale centres | Linear haemorrhages under the nails | Osler's nodes are tender, immunologically mediated; Janeway lesions are painless.
M3#medicine-u03-11-q3@3: A man with a prosthetic aortic valve has fever for two weeks; transthoracic echo is normal. What is the best next step? | Arrange transoesophageal echocardiography, as TTE has low sensitivity for prosthetic valve endocarditis | Exclude endocarditis because the transthoracic echo is normal | Start oral antibiotics and review in a month | Replace the valve immediately without further tests | TOE is much more sensitive than TTE, especially with prosthetic valves; a normal TTE doesn't exclude endocarditis.
TF1#medicine-u03-11-q4@1: NICE recommends routine antibiotic prophylaxis before dental procedures for people at risk of endocarditis. | false | NICE CG64 doesn't recommend routine prophylaxis; ESC and AHA guidance differs for the highest-risk patients.
SA2#medicine-u03-11-q5@2,3: Explain why blood cultures should be taken before antibiotics in suspected endocarditis, and how the diagnosis is confirmed. | Endocarditis involves continuous bacteraemia; cultures identify the organism and its sensitivities, guiding weeks of targeted treatment. Antibiotics given first can sterilise cultures and make diagnosis harder. At least three sets from separate sites are taken. Diagnosis combines positive cultures, echocardiographic evidence of vegetations or abscess, and clinical findings using the Duke criteria. | Continuous bacteraemia ; Guides targeted treatment ; Antibiotics can sterilise cultures ; Echo and Duke criteria

## Cardiomyopathies and pericardial disease
LV: Clinical · Application
S: Cardiomyopathies are diseases of the heart muscle not explained by coronary disease or loading conditions; pericardial disease affects the sac around the heart. This lesson covers hypertrophic and dilated cardiomyopathy, acute pericarditis and cardiac tamponade.
O: Describe the features of hypertrophic and dilated cardiomyopathy
O: Recognise acute pericarditis from its history, examination and ECG
O: Identify cardiac tamponade as an emergency and its signs
PRE: Heart failure: causes and classification
H: Cardiomyopathies
- **Hypertrophic cardiomyopathy (HCM)**: unexplained left ventricular hypertrophy, usually autosomal dominant mutations in sarcomere genes. About 1 in 500 people. May cause breathlessness, chest pain, syncope, or sudden cardiac death in young people. Left ventricular outflow tract obstruction causes an ejection systolic murmur that **increases** with Valsalva or standing. First-degree relatives should be offered screening.
- **Dilated cardiomyopathy (DCM)**: a dilated, poorly contracting left ventricle. Causes include genetic mutations, alcohol, myocarditis, pregnancy (peripartum cardiomyopathy) and chemotherapy. Presents as heart failure or arrhythmia.
- Others: arrhythmogenic cardiomyopathy and restrictive cardiomyopathy (such as cardiac amyloidosis).
H: Acute pericarditis
- **Pain**: sharp, central, pleuritic, relieved by sitting forward, worse lying flat.
- **Pericardial rub**: a scratching sound.
- **ECG**: widespread concave ("saddle-shaped") ST elevation with PR depression.
- **Causes**: often viral or idiopathic; also post-MI, uraemia, autoimmune disease, tuberculosis and malignancy.
- **Treatment** (ESC 2015 guidance): NSAID or aspirin with colchicine, with gastric protection; exclude high-risk features first.
H: Cardiac tamponade
P: Fluid in the pericardium compresses the heart and stops it filling. **Beck's triad**: hypotension, raised JVP and muffled heart sounds. **Pulsus paradoxus** (systolic fall of more than 10 mmHg on inspiration) is typical. It is an emergency: call for senior help immediately; treatment is urgent pericardiocentesis or surgical drainage.
X: A 30-year-old man has sharp chest pain for two days after a cold, easing when he leans forward.
> A rub is heard; ECG shows widespread saddle-shaped ST elevation and PR depression.
> This suggests acute pericarditis, not STEMI, which typically shows regional, convex ST elevation with reciprocal depression.
> Troponin may be mildly raised if there is myopericarditis.
> Echo checks for effusion; treatment usually follows ESC guidance with anti-inflammatory therapy and colchicine.
K: HCM is genetic LV hypertrophy with risk of sudden death; DCM presents as heart failure; pericarditis gives positional pleuritic pain with widespread ST elevation; tamponade is an emergency identified by Beck's triad.
!: Mistaking pericarditis for STEMI, or the reverse. Look at the distribution and shape of ST changes, reciprocal changes and PR depression, and seek senior review when unsure; missing a STEMI is dangerous.
EV: established | HCM affects about 1 in 500 people and is a leading cause of sudden cardiac death in young people (Maron et al., 1995).
EV: established | Adding colchicine to anti-inflammatory therapy halves recurrence of pericarditis (ICAP trial, 2013).
T: Hypertrophic cardiomyopathy | Inherited unexplained thickening of the left ventricular wall
T: Cardiac tamponade | Compression of the heart by pericardial fluid, preventing filling
T: Pulsus paradoxus | An exaggerated fall in systolic pressure on inspiration, more than 10 mmHg
SUM: HCM is genetic, can cause sudden death, and needs family screening.
SUM: Pericarditis: positional pain, rub, saddle ST elevation and PR depression.
SUM: Tamponade: Beck's triad, pulsus paradoxus, urgent drainage.
SRC: Arbelo E. et al., "2023 ESC Guidelines for the management of cardiomyopathies", European Heart Journal 44(37), 3503–3626 | guidance | 2023
SRC: Adler Y. et al., "2015 ESC Guidelines for the diagnosis and management of pericardial diseases", European Heart Journal 36(42), 2921–2964 | guidance | 2015
SRC: Imazio M. et al., "A randomized trial of colchicine for acute pericarditis", New England Journal of Medicine 369(16), 1522–1528 | primary | 2013
Q: What is Beck's triad? | Hypotension, raised JVP and muffled heart sounds, indicating cardiac tamponade.
Q: What happens to the murmur of HCM with the Valsalva manoeuvre? | It gets louder, because reduced preload worsens outflow obstruction.
M1#medicine-u03-12-q1@1: What is the typical ECG finding in acute pericarditis? | Widespread saddle-shaped ST elevation with PR depression | Regional ST elevation with reciprocal depression | Deep Q waves in the inferior leads | A prolonged QT interval alone | Pericarditis inflames the epicardium widely, giving diffuse concave ST elevation and PR depression.
M2#medicine-u03-12-q2@2: A 17-year-old footballer collapses during a match and is resuscitated; his father died suddenly at 40. Which diagnosis must be considered? | Hypertrophic cardiomyopathy | Acute pericarditis | Mitral stenosis | Infective endocarditis | HCM is inherited and a leading cause of sudden death in young athletes; family screening is needed.
M3#medicine-u03-12-q3@3: A patient with a large pericardial effusion is hypotensive with a raised JVP and a 20 mmHg inspiratory fall in systolic pressure. What is the priority? | Call for senior help immediately for urgent pericardiocentesis | Give a loop diuretic to reduce the effusion | Arrange an outpatient echocardiogram | Start colchicine and review the next day | These are signs of tamponade, a life-threatening emergency needing urgent drainage; diuretics would worsen filling.
TF1#medicine-u03-12-q4@1: The pain of acute pericarditis is typically relieved by sitting forward. | true | Leaning forward reduces pressure on the inflamed pericardium; lying flat worsens it.
SA2#medicine-u03-12-q5@2,3: Explain how you would distinguish acute pericarditis from STEMI. | History: pericarditis pain is sharp, pleuritic and positional, often after a viral illness; STEMI pain is crushing and not positional. Examination: a pericardial rub suggests pericarditis. ECG: pericarditis gives widespread concave ST elevation with PR depression and no reciprocal changes; STEMI gives regional convex ST elevation with reciprocal depression, evolving Q waves. Echo may show effusion or regional wall motion abnormality. Seek senior review if unsure. | Pain character ; Rub ; ECG distribution, shape and reciprocal changes ; Echo or escalation

## Atrial fibrillation
LV: Clinical · Application
S: Atrial fibrillation (AF) is the most common sustained arrhythmia and a major cause of stroke. This lesson covers its recognition, classification, assessment of stroke and bleeding risk, anticoagulation, and the choice between rate and rhythm control in line with NICE NG196.
O: Recognise AF clinically and on the ECG and classify it
O: Calculate a CHA2DS2-VASc score and explain how it guides anticoagulation
O: Compare rate and rhythm control strategies
PRE: Cardiac electrophysiology and conduction
H: Recognition and classification
- **Pulse**: irregularly irregular. **ECG**: no P waves, irregular narrow QRS complexes, fibrillatory baseline.
- **Types**: paroxysmal (stops within 7 days), persistent (lasts over 7 days), long-standing persistent (over a year) and permanent (a decision not to restore rhythm).
- **Causes and associations**: hypertension, ischaemic and valvular heart disease, heart failure, alcohol, thyrotoxicosis, obesity, sleep apnoea, sepsis.
P: **Unstable** AF (with shock, syncope, myocardial ischaemia or severe heart failure) needs emergency help and electrical cardioversion following the Resuscitation Council UK algorithm.
H: Stroke and bleeding risk
E: CHA2DS2-VASc: Congestive heart failure 1, Hypertension 1, Age 75 or over 2, Diabetes 1, Stroke/TIA/thromboembolism 2, Vascular disease 1, Age 65–74 1, Sex category female 1 :: maximum 9
P: NICE NG196 (2021): **offer anticoagulation** with a direct oral anticoagulant (DOAC) for a score of **2 or more**, and **consider** it for men with a score of 1, taking bleeding risk into account. Assess bleeding risk with the **ORBIT** score and address modifiable risks such as uncontrolled hypertension and alcohol. Aspirin alone isn't recommended for stroke prevention in AF.
X: A 78-year-old woman with hypertension has newly found AF.
> Age 75 or over: 2. Hypertension: 1. Female: 1.
> CHA2DS2-VASc = 4: offer anticoagulation, discussing benefits and risks.
> Assess bleeding risk (ORBIT) and modifiable factors.
> Rate control is likely to be first-line at her age unless symptoms persist.
H: Rate or rhythm control
- **Rate control** is first-line for most: a **beta-blocker** or a **rate-limiting calcium-channel blocker** (diltiazem or verapamil, not in heart failure with reduced EF); digoxin for sedentary people or in combination.
- **Rhythm control** (cardioversion, antiarrhythmic drugs or **catheter ablation**) for AF with a reversible cause, heart failure thought to be caused by AF, new-onset AF, or when rate control fails to control symptoms.
P: Before elective cardioversion of AF lasting over 48 hours, anticoagulation is needed for at least 3 weeks (or a TOE to exclude thrombus).
K: AF is irregularly irregular with no P waves; stroke risk is scored with CHA2DS2-VASc and anticoagulation offered at 2 or more; most people start with rate control.
!: Withholding anticoagulation because a person is old or falls occasionally. Older people gain the most absolute benefit; falls alone are rarely a reason to deny anticoagulation once bleeding risk is assessed.
EV: established | Anticoagulation reduces stroke in AF by about two-thirds; DOACs are at least as effective as warfarin with less intracranial bleeding.
EV: contested | ESC 2024 guidance replaced CHA2DS2-VASc with CHA2DS2-VA (dropping sex as a criterion); NICE hasn't adopted this, so check current guidance.
T: Atrial fibrillation | A supraventricular arrhythmia with chaotic atrial activity and an irregular ventricular response
T: CHA2DS2-VASc | A score estimating stroke risk in AF, used to guide anticoagulation
T: Rate control | Slowing the ventricular rate in AF without trying to restore sinus rhythm
SUM: AF: irregularly irregular pulse, no P waves.
SUM: CHA2DS2-VASc of 2 or more: offer a DOAC; assess bleeding with ORBIT.
SUM: Rate control first for most; rhythm control for selected patients.
SRC: NICE, Atrial fibrillation: diagnosis and management (NG196) | guidance | 2021 | https://www.nice.org.uk/guidance/ng196
SRC: Van Gelder I. C. et al., "2024 ESC Guidelines for the management of atrial fibrillation", European Heart Journal 45(36), 3314–3414 | guidance | 2024
SRC: Resuscitation Council UK, Adult tachycardia algorithm, Resuscitation Guidelines | guidance | 2021 | https://www.resus.org.uk/library/2021-resuscitation-guidelines
Q: What does the ECG show in atrial fibrillation? | No P waves, an irregularly irregular rhythm and usually narrow QRS complexes.
Q: At what CHA2DS2-VASc score does NICE recommend offering anticoagulation? | 2 or more (consider at 1 for men), taking bleeding risk into account.
M1#medicine-u03-13-q1@1: How many points does age 75 or over score in CHA2DS2-VASc? | 2 | 1 | 3 | 0 | Age 75 or over scores 2, as does previous stroke, TIA or thromboembolism.
M2#medicine-u03-13-q2@2: Which drug is a first-line rate-control option for AF in a patient with HFrEF? | A beta-blocker | Verapamil | Diltiazem | Flecainide | Rate-limiting calcium-channel blockers are avoided in HFrEF; a beta-blocker is preferred.
M3#medicine-u03-13-q3@3: An 82-year-old with AF and CHA2DS2-VASc of 5 has had one fall in a year. Her family worry anticoagulation is unsafe. What is the best approach? | Assess bleeding risk and fall causes, but offer anticoagulation, as her stroke risk is high and benefit is large | Avoid anticoagulation because she has fallen once | Prescribe aspirin instead, as it is safer and equally effective | Delay any decision until she has fallen again | Absolute benefit is greatest in older, high-risk people; aspirin alone isn't recommended. Decisions are shared and reviewed.
NUM2#medicine-u03-13-q4@2: A 70-year-old man with AF has diabetes and hypertension, and no other risk factors. What is his CHA2DS2-VASc score? | 3 | 0 | points | Age 65–74 scores 1, diabetes 1 and hypertension 1: a total of 3.
SA2#medicine-u03-13-q5@2,3: Compare rate control and rhythm control in AF, and say when each is preferred. | Rate control slows ventricular response with beta-blockers, rate-limiting calcium-channel blockers or digoxin, accepting AF; it is first-line for most people. Rhythm control aims to restore sinus rhythm by cardioversion, drugs or ablation, and is preferred for AF with a reversible cause, heart failure caused by AF, new-onset AF, or persisting symptoms despite rate control. Anticoagulation decisions are based on stroke risk regardless of strategy. | Rate control methods ; Rhythm control methods ; Indications for rhythm control ; Anticoagulation independent of strategy

## Bradyarrhythmias and heart block
LV: Clinical · Application
S: Bradyarrhythmias are slow heart rhythms, from sinus node disease to complete heart block. This lesson covers the types of atrioventricular block on the ECG, the adverse features that need urgent treatment, and the role of pacing.
O: Identify first-, second- and third-degree heart block on the ECG
O: Recognise adverse features and risk of asystole in bradycardia
O: Outline the principles of acute management and indications for pacing
PRE: Cardiac electrophysiology and conduction
H: Types
- **Sinus bradycardia**: normal in athletes and during sleep; also caused by drugs (beta-blockers, calcium-channel blockers, digoxin), hypothyroidism, hypothermia and raised intracranial pressure.
- **Sick sinus syndrome**: sinus pauses, sinoatrial block and often alternating bradycardia and tachycardia.
- **First-degree AV block**: PR interval over 200 ms; every P wave conducted.
- **Second-degree, Mobitz I (Wenckebach)**: PR lengthens progressively until a P wave isn't conducted; usually AV nodal and relatively benign.
- **Second-degree, Mobitz II**: constant PR with sudden non-conducted P waves; disease below the AV node, high risk of complete block.
- **Third-degree (complete) block**: no relationship between P waves and QRS complexes; a slow junctional or ventricular escape rhythm.
P: Always look for reversible causes before labelling block as permanent: rate-slowing drugs, hyperkalaemia, hypothyroidism, and inferior myocardial infarction (the right coronary artery usually supplies the AV node, so block after inferior MI often recovers).
H: Acute management
P: Resuscitation Council UK's bradycardia algorithm asks first about **adverse features**: shock, syncope, myocardial ischaemia and heart failure. If present, treat (initially with atropine, then further drugs or pacing) and seek expert help. Even without adverse features, the **risk of asystole** must be considered: recent asystole, Mobitz II, complete heart block with broad QRS, or a ventricular pause over 3 seconds.
X: An 80-year-old woman has dizzy spells; heart rate is 36/min. The ECG shows regular P waves at 80/min and regular broad QRS complexes at 36/min with no relationship between them.
> P waves and QRS are dissociated: complete heart block.
> Broad complexes indicate a ventricular escape rhythm: risk of asystole.
> Assess for adverse features, call for senior help and follow the RCUK algorithm.
> She is likely to need a permanent pacemaker; review drugs that slow conduction.
K: Classify AV block by the PR pattern; Mobitz II and complete heart block carry a high risk of asystole and usually need pacing; adverse features need immediate treatment and expert help.
!: Treating every slow heart rate as dangerous. Sinus bradycardia in a fit, asymptomatic young adult is often normal; assess symptoms, adverse features and the underlying rhythm.
EV: established | Permanent pacing improves symptoms and survival in symptomatic high-degree AV block.
EV: established | Mobitz II and complete heart block with broad QRS reflect infranodal disease with unreliable escape rhythms.
T: First-degree heart block | Prolonged AV conduction with a PR interval over 200 ms and every P wave conducted
T: Mobitz II | Second-degree AV block with a constant PR interval and intermittent non-conducted P waves
T: Complete heart block | Third-degree AV block with no conduction from atria to ventricles, so P waves and QRS complexes are dissociated
SUM: First-degree: long PR. Mobitz I: progressive PR lengthening. Mobitz II: fixed PR with dropped beats. Third-degree: dissociation.
SUM: Look for adverse features and risk of asystole.
SUM: Pacing is needed for high-degree block.
SRC: Resuscitation Council UK, Adult bradycardia algorithm, Resuscitation Guidelines | guidance | 2021 | https://www.resus.org.uk/library/2021-resuscitation-guidelines
SRC: Glikson M. et al., "2021 ESC Guidelines on cardiac pacing and cardiac resynchronization therapy", European Heart Journal 42(35), 3427–3520 | guidance | 2021
Q: What is the ECG pattern of Mobitz type I block? | Progressive PR lengthening until a P wave is not conducted, then the cycle repeats.
Q: Name the four adverse features in the RCUK bradycardia algorithm. | Shock, syncope, myocardial ischaemia and heart failure.
M1#medicine-u03-14-q1@1: What is the PR interval in first-degree heart block? | Over 200 ms, with every P wave conducted | Under 120 ms, with a delta wave | Progressively lengthening, then a dropped beat | Unrelated to the QRS complexes | First-degree block is a prolonged but constant PR interval with 1:1 conduction.
M2#medicine-u03-14-q2@2: An ECG shows a constant PR interval with occasional P waves not followed by QRS complexes. What is the rhythm? | Mobitz II second-degree block | Mobitz I (Wenckebach) | First-degree block | Complete heart block | A fixed PR with sudden dropped beats is Mobitz II, which carries a high risk of complete block.
M3#medicine-u03-14-q3@3: A fit 22-year-old runner has a resting heart rate of 44/min in sinus rhythm and no symptoms. What is the best response? | Reassure: this is likely physiological sinus bradycardia, provided the history and ECG are otherwise normal | Arrange an urgent permanent pacemaker | Give atropine immediately | Admit for continuous monitoring as an emergency | Athletic training increases vagal tone; asymptomatic sinus bradycardia with a normal ECG doesn't need treatment.
TF1#medicine-u03-14-q4@1: In complete heart block, P waves and QRS complexes occur independently. | true | No atrial impulses reach the ventricles, so an escape rhythm beats independently of the atria.
SA2#medicine-u03-14-q5@2,3: Explain why Mobitz II block is more dangerous than Mobitz I. | Mobitz I usually reflects AV nodal disease, often caused by vagal tone or drugs, and rarely progresses to complete block. Mobitz II reflects disease below the AV node in the His–Purkinje system, can progress suddenly to complete heart block, and any escape rhythm is slow and unreliable, risking asystole. Mobitz II is therefore an indication for specialist assessment and usually pacing. | Mobitz I nodal and benign ; Mobitz II infranodal ; Progression to complete block ; Risk of asystole and pacing

## Tachyarrhythmias
LV: Clinical · Application
S: Tachyarrhythmias are fast heart rhythms. This lesson classifies them by QRS width and regularity, covers supraventricular tachycardia, atrial flutter, Wolff–Parkinson–White syndrome and ventricular tachycardia, and sets out the Resuscitation Council UK approach to acute management.
O: Classify tachycardias by QRS width and regularity
O: Recognise SVT, atrial flutter, WPW and VT on the ECG
O: Apply the principles of the RCUK tachycardia algorithm
PRE: Cardiac electrophysiology and conduction
H: Classification
- **Narrow-complex regular**: sinus tachycardia, AV nodal re-entrant tachycardia (AVNRT), AV re-entrant tachycardia (AVRT, using an accessory pathway), atrial flutter with regular block (often 2:1 at about 150/min).
- **Narrow-complex irregular**: atrial fibrillation; flutter with variable block.
- **Broad-complex regular**: ventricular tachycardia (VT) or SVT with bundle branch block; **treat as VT if in doubt**.
- **Broad-complex irregular**: AF with bundle branch block, pre-excited AF (WPW), polymorphic VT such as torsades de pointes.
H: Specific rhythms
- **AVNRT**: the commonest SVT in young people; sudden onset palpitations; regular narrow complexes at 150–250/min.
- **Atrial flutter**: "sawtooth" flutter waves, best seen in the inferior leads.
- **Wolff–Parkinson–White**: an accessory pathway gives a short PR and a slurred QRS upstroke (**delta wave**) in sinus rhythm.
- **VT**: broad complexes, often with AV dissociation, fusion or capture beats; common after MI or in cardiomyopathy.
H: Acute management (RCUK 2021)
- **No pulse**: follow the cardiac arrest (ALS) algorithm.
- **Adverse features** (shock, syncope, myocardial ischaemia, severe heart failure): **synchronised DC cardioversion** under sedation or anaesthesia, with expert help.
- **Stable, regular narrow-complex**: **vagal manoeuvres** (the modified Valsalva manoeuvre is more effective than the standard one: REVERT trial, 2015), then **adenosine** with continuous ECG recording.
- **Stable broad-complex**: seek expert help; treat as VT unless known otherwise.
X: A 28-year-old woman has sudden palpitations. Pulse 190/min, regular; BP 118/74; no chest pain or breathlessness.
> ECG: regular narrow-complex tachycardia without visible P waves: likely AVNRT.
> No adverse features, so attempt the modified Valsalva manoeuvre.
> If unsuccessful, adenosine with continuous ECG monitoring, following local protocol.
> Afterwards, record a 12-lead ECG in sinus rhythm to look for a delta wave.
K: Classify tachycardias by width and regularity; unstable patients need synchronised cardioversion; stable regular narrow-complex tachycardia is treated with vagal manoeuvres then adenosine; broad-complex tachycardia is VT until proven otherwise.
!: Giving AV-nodal blocking drugs to irregular broad-complex tachycardia in WPW. In pre-excited AF, blocking the AV node can speed conduction down the accessory pathway and cause VF; seek expert help.
EV: established | The modified Valsalva manoeuvre restored sinus rhythm in about 43% of SVT episodes versus 17% with standard Valsalva (REVERT trial, Appelboam et al., 2015).
EV: established | Treating broad-complex tachycardia of uncertain origin as VT is safer than assuming SVT with aberrancy.
T: AVNRT | AV nodal re-entrant tachycardia, a regular narrow-complex SVT using dual pathways within the AV node
T: Delta wave | A slurred upstroke of the QRS complex caused by early ventricular activation through an accessory pathway
T: Synchronised cardioversion | An electric shock timed to the R wave to restore sinus rhythm in an unstable tachycardia
SUM: Classify by QRS width and regularity.
SUM: Unstable: synchronised DC cardioversion. Stable narrow regular: vagal manoeuvres then adenosine.
SUM: Broad-complex: treat as VT if in doubt; beware AV-nodal blockers in WPW with AF.
SRC: Resuscitation Council UK, Adult tachycardia algorithm, Resuscitation Guidelines | guidance | 2021 | https://www.resus.org.uk/library/2021-resuscitation-guidelines
SRC: Appelboam A. et al., "Postural modification to the standard Valsalva manoeuvre for emergency treatment of supraventricular tachycardias (REVERT)", The Lancet 386(10005), 1747–1753 | primary | 2015
Q: What is a delta wave? | A slurred upstroke at the start of the QRS caused by pre-excitation through an accessory pathway, as in WPW.
Q: What is the ventricular rate in atrial flutter with 2:1 block? | About 150 per minute.
M1#medicine-u03-15-q1@1: What is the most common cause of a regular narrow-complex tachycardia at 180/min in a young adult? | AV nodal re-entrant tachycardia | Ventricular tachycardia | Torsades de pointes | Complete heart block | AVNRT is the commonest SVT in young, otherwise healthy people.
M2#medicine-u03-15-q2@2: A patient with tachycardia at 170/min is hypotensive and confused. What is the priority after calling for help? | Synchronised DC cardioversion under sedation | Vagal manoeuvres | Oral beta-blocker | Observation for an hour | Shock and impaired consciousness are adverse features; synchronised cardioversion is indicated.
M3#medicine-u03-15-q3@3: A 40-year-old with known WPW has an irregular broad-complex tachycardia at 220/min. What should be avoided? | AV-nodal blocking drugs such as adenosine, verapamil or digoxin | Calling for expert cardiology help | Assessing for adverse features | Continuous ECG monitoring | In pre-excited AF, blocking the AV node can increase conduction down the accessory pathway and precipitate VF.
TF1#medicine-u03-15-q4@1: A broad-complex tachycardia of uncertain origin should be treated as ventricular tachycardia. | true | Assuming VT is safer; misdiagnosing VT as SVT and giving the wrong drug can be dangerous.
SA2#medicine-u03-15-q5@2,3: Describe the initial assessment and management of a patient with a tachycardia, following the RCUK approach. | Assess using ABCDE, call for help, attach monitoring and record a 12-lead ECG. Check for a pulse; if absent, follow the cardiac arrest algorithm. Look for adverse features (shock, syncope, myocardial ischaemia, heart failure); if present, give synchronised DC cardioversion with sedation and expert help. If stable, classify by QRS width and regularity: for regular narrow-complex, try vagal manoeuvres then adenosine with ECG recording; for broad-complex, seek expert help and treat as VT if unsure. | ABCDE, help and ECG ; Pulse check ; Adverse features and cardioversion ; Stable treatment by QRS type

## Hypertension
LV: Clinical · Application
S: Hypertension is a major modifiable risk factor for stroke, heart attack, heart failure and kidney disease. This lesson covers diagnosis with ambulatory or home monitoring, stages, assessment for target organ damage, and NICE's stepwise approach to treatment.
O: Diagnose and stage hypertension using clinic, ambulatory and home readings
O: Identify target organ damage and when to refer urgently
O: Apply NICE NG136's stepwise approach to drug treatment
PRE: Blood pressure regulation
H: Diagnosis and stages (NICE NG136)
- If clinic BP is between 140/90 and 180/120, offer **ambulatory BP monitoring (ABPM)**, or home monitoring if ABPM isn't suitable, to confirm the diagnosis.
- **Stage 1**: clinic 140/90 or higher and ABPM or home average 135/85 or higher.
- **Stage 2**: clinic 160/100 or higher and ABPM or home average 150/95 or higher.
- **Severe**: clinic systolic 180 or higher, or diastolic 120 or higher.
P: Refer the same day if severe hypertension comes with retinal haemorrhage or papilloedema (accelerated hypertension), life-threatening symptoms, or suspected phaeochromocytoma.
H: Assessment
- **Target organ damage**: urine albumin–creatinine ratio and dipstick for haematuria, renal function, HbA1c, lipids, fundoscopy and a 12-lead ECG (for left ventricular hypertrophy).
- **Cardiovascular risk**: QRISK3.
- Consider **secondary causes** in people under 40 or with resistant hypertension, hypokalaemia or other clues (renal disease, primary aldosteronism, renal artery stenosis, phaeochromocytoma, Cushing's syndrome, coarctation).
H: Treatment
- **Lifestyle** for all: less salt, healthy diet, activity, weight loss, alcohol within guidelines, stopping smoking.
- **Drugs**: offer for stage 2; for stage 1 if under 80 with target organ damage, cardiovascular or renal disease, diabetes or QRISK3 of 10% or more.
- **Step 1**: ACE inhibitor or ARB if type 2 diabetes, or aged under 55 and not of Black African or African-Caribbean family origin; calcium-channel blocker if aged 55 or over, or of Black African or African-Caribbean family origin (without type 2 diabetes).
- **Step 2**: add the other of these, or a thiazide-like diuretic.
- **Step 3**: ACE inhibitor or ARB + calcium-channel blocker + thiazide-like diuretic.
- **Step 4** (resistant): check adherence and confirm with ABPM; consider low-dose spironolactone if potassium is 4.5 mmol/L or less, otherwise an alpha- or beta-blocker; seek specialist advice.
P: **Targets** (clinic): below 140/90 under age 80; below 150/90 aged 80 and over.
X: A 61-year-old white man without diabetes has clinic BP 158/96; ABPM average is 146/90.
> Clinic 140/90 or more and ABPM 135/85 or more: stage 1 hypertension.
> Check for target organ damage and calculate QRISK3; his score is 13%.
> Offer drug treatment: QRISK3 10% or more.
> Step 1 at age 55 or over: calcium-channel blocker, with lifestyle advice. Prescribing follows current guidance and local formularies.
K: Confirm hypertension with ABPM or home readings, assess organ damage and risk, and treat stepwise: ACE inhibitor or ARB, calcium-channel blocker and thiazide-like diuretic, chosen by age, ethnicity and diabetes.
!: Diagnosing hypertension from a single raised clinic reading. White-coat effects are common; NICE requires ABPM or home monitoring to confirm, except in severe hypertension needing urgent action.
EV: established | Lowering blood pressure reduces stroke, coronary events and heart failure in proportion to the reduction (Ettehad et al., 2016).
EV: contested | Optimal blood pressure targets, especially in older people, differ between NICE, ESC and US guidance.
T: Ambulatory blood pressure monitoring | Automatic BP readings over 24 hours during normal activity, used to confirm hypertension
T: White-coat hypertension | Raised BP in clinic but normal readings outside it
T: Resistant hypertension | BP not controlled despite three drugs at optimal doses, including a diuretic
SUM: Confirm with ABPM or home monitoring; stage by clinic and out-of-clinic readings.
SUM: Assess organ damage, risk and secondary causes.
SUM: Step 1 depends on age, ethnicity and diabetes; build to A + C + D.
SRC: NICE, Hypertension in adults: diagnosis and management (NG136) | guidance | 2023 | https://www.nice.org.uk/guidance/ng136
SRC: Ettehad D. et al., "Blood pressure lowering for prevention of cardiovascular disease and death: a systematic review and meta-analysis", The Lancet 387(10022), 957–967 | secondary | 2016
Q: What ABPM average defines stage 1 hypertension? | 135/85 mmHg or higher (with clinic BP 140/90 or higher).
Q: What is the clinic BP target for people under 80 in NICE NG136? | Below 140/90 mmHg.
M1#medicine-u03-16-q1@1: What does NICE recommend to confirm a diagnosis of hypertension? | Ambulatory or home blood pressure monitoring | A single clinic reading above 140/90 | Three readings on the same day | An echocardiogram | ABPM (or home monitoring) confirms the diagnosis and excludes white-coat hypertension.
M2#medicine-u03-16-q2@2: A 45-year-old man of Black African family origin without diabetes has confirmed stage 2 hypertension. What is NICE's step 1 drug? | A calcium-channel blocker | An ACE inhibitor | A beta-blocker | Spironolactone | NICE recommends a calcium-channel blocker first for people of Black African or African-Caribbean family origin without type 2 diabetes.
M3#medicine-u03-16-q3@3: A 50-year-old has clinic BP 192/124 with headache and blurred vision; fundoscopy shows papilloedema. What is needed? | Same-day specialist referral for suspected accelerated hypertension | ABPM over the next week before deciding | Lifestyle advice and review in a month | Start a single drug and review in 4 weeks | Severe hypertension with papilloedema suggests accelerated hypertension, which needs same-day referral.
MATCH1#medicine-u03-16-q4@1: Match each reading pattern to its NICE category. | Clinic 150/92, ABPM 140/88 = Stage 1 ; Clinic 168/104, ABPM 156/98 = Stage 2 ; Clinic 184/110 = Severe ; Clinic 148/92, ABPM 128/80 = White-coat effect | Staging uses both clinic and out-of-clinic readings; severe hypertension is defined on clinic readings alone.
SA2#medicine-u03-16-q5@2,3: Explain the stepwise drug treatment of hypertension in NICE NG136 and why the first choice depends on age and ethnicity. | Step 1 is an ACE inhibitor or ARB for people with type 2 diabetes or under 55 and not of Black African or African-Caribbean origin, and a calcium-channel blocker for those 55 or over or of Black African or African-Caribbean origin. This reflects evidence that older and Black patients often have lower renin levels and respond better to calcium-channel blockers. Step 2 adds the other or a thiazide-like diuretic; step 3 combines all three; step 4 adds spironolactone or another agent with specialist advice. | Step 1 choices ; Reason: renin and response ; Steps 2 and 3 ; Step 4 resistant hypertension

## Peripheral arterial disease and aortic aneurysm
LV: Clinical · Application
S: Atherosclerosis in the leg arteries causes peripheral arterial disease; weakening of the aortic wall causes abdominal aortic aneurysm. This lesson covers claudication and limb-threatening ischaemia, the ankle–brachial pressure index, and AAA screening, surveillance and rupture.
O: Recognise intermittent claudication, chronic limb-threatening ischaemia and acute limb ischaemia
O: Calculate and interpret the ankle–brachial pressure index
O: Describe AAA screening and surveillance thresholds and the presentation of rupture
PRE: Atherosclerosis and cardiovascular risk
H: Peripheral arterial disease
- **Intermittent claudication**: cramping pain in the calf, thigh or buttock on walking, relieved by rest.
- **Chronic limb-threatening ischaemia**: rest pain (often at night, eased by hanging the leg down), ulcers or gangrene.
- **Acute limb ischaemia**: sudden pain, pallor, pulselessness, paraesthesia, paralysis and perishing cold (the "6 Ps"); a surgical emergency.
E: ABPI = highest ankle systolic pressure ÷ highest brachial systolic pressure :: below 0.9 indicates PAD
P: Calcified, incompressible arteries (common in diabetes and CKD) can give falsely high ABPI values above 1.3.
H: Management (NICE CG147)
- **Supervised exercise programme** for claudication.
- **Secondary prevention**: stop smoking, antiplatelet therapy, statin, control of blood pressure and diabetes.
- **Revascularisation** (angioplasty or bypass) when symptoms persist or the limb is threatened.
H: Abdominal aortic aneurysm
- An AAA is an aortic diameter of 3.0 cm or more. Risk factors: age, male sex, smoking, family history, hypertension.
- **NHS AAA Screening Programme** (England): one ultrasound scan for men in the year they turn 65.
- **Surveillance**: 3.0–4.4 cm yearly; 4.5–5.4 cm every 3 months; **5.5 cm or more**, or growth over 1 cm a year, or symptoms: refer to a vascular service.
- **Rupture**: severe abdominal or back pain, collapse and a pulsatile mass; call for emergency help immediately.
X: A 70-year-old smoker gets calf pain after 200 m that eases on standing still.
> Classic intermittent claudication.
> Ankle systolic 84 mmHg, brachial 140 mmHg: ABPI = 84 ÷ 140 = 0.6.
> ABPI below 0.9 confirms PAD (0.5–0.8 is often called moderate).
> Offer supervised exercise and secondary prevention; refer if symptoms limit life despite this.
K: PAD presents as claudication or limb-threatening ischaemia and is confirmed by an ABPI below 0.9; AAAs are screened in men at 65, watched by size, and referred at 5.5 cm.
!: Assuming a normal or high ABPI excludes PAD in a person with diabetes. Calcified arteries resist compression and can mask disease; use toe pressures or duplex ultrasound.
EV: established | Screening men aged 65 for AAA reduces aneurysm-related mortality (MASS trial, 2002).
EV: established | Supervised exercise improves walking distance in claudication more than unsupervised advice.
T: Intermittent claudication | Exercise-induced leg pain from arterial insufficiency, relieved by rest
T: ABPI | Ankle–brachial pressure index, the ratio of ankle to arm systolic pressure
T: Abdominal aortic aneurysm | Dilatation of the abdominal aorta to 3.0 cm or more
SUM: PAD: claudication, rest pain or acute ischaemia; ABPI below 0.9.
SUM: Exercise, secondary prevention and revascularisation.
SUM: AAA screening at 65 for men; refer at 5.5 cm; rupture is an emergency.
SRC: NICE, Peripheral arterial disease: diagnosis and management (CG147) | guidance | 2020 | https://www.nice.org.uk/guidance/cg147
SRC: NICE, Abdominal aortic aneurysm: diagnosis and management (NG156) | guidance | 2020 | https://www.nice.org.uk/guidance/ng156
SRC: Ashton H. A. et al., "The Multicentre Aneurysm Screening Study (MASS) into the effect of abdominal aortic aneurysm screening on mortality in men", The Lancet 360(9345), 1531–1539 | primary | 2002
Q: What ABPI suggests peripheral arterial disease? | Below 0.9.
Q: Who is invited for AAA screening in England? | Men in the year they turn 65.
M1#medicine-u03-17-q1@1: What are the classic features of intermittent claudication? | Leg pain on walking relieved by rest | Leg pain at rest relieved by walking | Sudden painless leg weakness | Leg swelling and redness | Exercise increases muscle demand beyond what narrowed arteries can supply; rest relieves it.
M2#medicine-u03-17-q2@2: An AAA on surveillance measures 5.6 cm. What should happen? | Referral to a vascular service | Repeat scan in a year | Discharge from surveillance | Repeat scan in 3 months only | NICE and the screening programme refer aneurysms of 5.5 cm or more for consideration of repair.
M3#medicine-u03-17-q3@3: A 74-year-old with diabetes has a foot ulcer and rest pain, but an ABPI of 1.4. What is the best interpretation? | Calcified arteries may give a falsely high ABPI; assess with toe pressures or duplex and refer urgently | The high ABPI rules out PAD, so the pain must be neuropathic | ABPI above 1.3 proves the arteries are healthy and wide | No action is needed, since ulcers in diabetes always heal | Incompressible vessels mask ischaemia; rest pain and ulceration suggest limb-threatening ischaemia needing urgent vascular review.
NUM1#medicine-u03-17-q4@1: A patient's highest ankle systolic pressure is 70 mmHg and highest brachial systolic pressure 140 mmHg. What is the ABPI? | 0.5 | 1% | ratio | ABPI = ankle ÷ brachial = 70 ÷ 140 = 0.5, indicating significant PAD.
SA2#medicine-u03-17-q5@2,3: Describe the presentation of a ruptured abdominal aortic aneurysm and the immediate response. | Sudden severe abdominal, back or flank pain, collapse or syncope, hypotension and tachycardia, and sometimes a pulsatile abdominal mass, often in an older male smoker. It may be mistaken for renal colic. The response is to call for emergency help immediately, assess using ABCDE, involve senior and vascular surgical teams urgently, and follow local major haemorrhage and ruptured AAA pathways. | Pain and collapse ; Shock signs and pulsatile mass ; Mimics such as renal colic ; Emergency escalation

## Venous thromboembolism
LV: Clinical · Application
S: Venous thromboembolism (VTE) covers deep vein thrombosis and pulmonary embolism. This lesson covers risk factors, the clinical features, NICE's diagnostic pathways using the Wells score, D-dimer and imaging, and the principles of anticoagulation.
O: Identify risk factors and clinical features of DVT and PE
O: Apply NICE's two-level Wells score pathways for suspected DVT and PE
O: Outline the principles of anticoagulant treatment and its duration
PRE: Atherosclerosis and cardiovascular risk
H: Risk and features
P: **Virchow's triad**: stasis (immobility, long journeys, surgery), endothelial injury (trauma, surgery) and hypercoagulability (cancer, pregnancy, oestrogen, thrombophilia).
- **DVT**: unilateral calf or leg swelling, pain, tenderness along the deep veins, warmth.
- **PE**: sudden breathlessness, pleuritic chest pain, haemoptysis, tachycardia, hypoxia; collapse in massive PE.
H: Diagnosis (NICE NG158)
- **Suspected DVT**: two-level DVT Wells score. **Likely** (2 or more): proximal leg vein ultrasound within 4 hours (if not possible, D-dimer and interim anticoagulation). **Unlikely**: D-dimer; if positive, ultrasound.
- **Suspected PE**: two-level PE Wells score. **Likely** (over 4): CT pulmonary angiogram (CTPA) immediately, or interim anticoagulation if delayed. **Unlikely**: D-dimer; if positive, CTPA.
- The **PERC rule** can be used where clinical suspicion is low, to avoid testing.
- D-dimer is sensitive but not specific: it rises with age, infection, pregnancy, cancer and surgery.
H: Treatment
- **Anticoagulation**: NICE recommends apixaban or rivaroxaban first-line for most; alternatives include LMWH followed by another DOAC or warfarin.
- **Duration**: at least 3 months; consider longer for **unprovoked** VTE, balancing recurrence and bleeding risk.
- **Massive PE** with haemodynamic instability: call for senior help; systemic thrombolysis is considered.
- Look for underlying causes, such as cancer in unprovoked VTE, by history and examination guided by NICE.
X: A 52-year-old woman flew from Australia 3 days ago. She has a swollen, tender left calf, 4 cm larger than the right.
> DVT Wells: entire leg or calf swelling, pitting oedema, tenderness along the deep veins and no more likely alternative diagnosis give a "likely" score.
> NICE: proximal leg vein ultrasound within 4 hours.
> Ultrasound confirms a popliteal vein DVT.
> Anticoagulation per local protocol; the long-haul flight makes this a provoked DVT, so 3 months is usual.
K: Use the two-level Wells score to choose between immediate imaging and D-dimer; a negative D-dimer helps rule out VTE when probability is low; most patients are treated with a DOAC for at least 3 months.
!: Ordering a D-dimer in every breathless patient. D-dimer is useful only to rule out VTE when clinical probability is low; in a "likely" patient, go straight to imaging.
EV: established | DOACs are as effective as LMWH followed by warfarin for VTE, with less major bleeding (van Es et al., 2014).
EV: contested | Extended anticoagulation after a first unprovoked VTE reduces recurrence but increases bleeding; the best duration for each person is debated.
T: Wells score | A clinical prediction rule estimating the probability of DVT or PE
T: D-dimer | A fibrin breakdown product; a negative test helps rule out VTE when probability is low
T: Provoked VTE | VTE occurring with a transient major risk factor, such as surgery or immobility
SUM: Virchow's triad explains VTE risk.
SUM: Wells likely: image; unlikely: D-dimer first.
SUM: DOACs first-line for at least 3 months; longer for unprovoked VTE.
SRC: NICE, Venous thromboembolic diseases: diagnosis, management and thrombophilia testing (NG158) | guidance | 2023 | https://www.nice.org.uk/guidance/ng158
SRC: van Es N. et al., "Direct oral anticoagulants compared with vitamin K antagonists for acute venous thromboembolism: evidence from phase 3 trials", Blood 124(12), 1968–1975 | secondary | 2014
Q: What is Virchow's triad? | Venous stasis, endothelial injury and hypercoagulability.
Q: What is the minimum usual duration of anticoagulation for VTE? | Three months.
M1#medicine-u03-18-q1@1: When is a D-dimer test most useful in suspected VTE? | When clinical probability is low, to rule VTE out | When clinical probability is high, to confirm VTE | After the diagnosis is confirmed by imaging | To decide how long to anticoagulate | A negative D-dimer is valuable in low-probability patients; it is often raised for other reasons.
M2#medicine-u03-18-q2@2: A patient has a PE Wells score of 6. What does NICE recommend? | Immediate CT pulmonary angiogram | D-dimer test first | Discharge with advice | Echocardiogram only | A score over 4 means PE likely, so go straight to CTPA (with interim anticoagulation if delayed).
M3#medicine-u03-18-q3@3: A man with a first unprovoked PE has completed 3 months of anticoagulation and has low bleeding risk. What is the best approach? | Discuss continuing anticoagulation, as recurrence risk after unprovoked VTE is higher | Stop anticoagulation, as 3 months is always enough | Switch to aspirin alone indefinitely | Repeat a CTPA to decide | NICE advises considering extended treatment after unprovoked VTE, balancing recurrence and bleeding risk with the patient.
TF1#medicine-u03-18-q4@1: A raised D-dimer confirms a diagnosis of pulmonary embolism. | false | D-dimer is non-specific; a raised result needs imaging, while a negative result in low-probability patients helps exclude VTE.
SA2#medicine-u03-18-q5@2,3: Outline NICE's diagnostic pathway for suspected pulmonary embolism. | Assess clinical features and consider PERC if suspicion is low. Calculate the two-level PE Wells score. If PE is likely (score over 4), arrange immediate CTPA, giving interim anticoagulation if there is a delay. If unlikely, do a D-dimer; if negative, consider an alternative diagnosis; if positive, arrange CTPA. Escalate immediately if the patient is unstable. | Clinical assessment and PERC ; Wells score likely pathway ; Unlikely pathway with D-dimer ; Escalation for instability
`;
