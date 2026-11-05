// School 7: Cardiovascular Therapeutics. UK, as at 2026.
// Format: kit/course/notes.js. Standard: docs/CURRICULUM_CONTENT_STANDARD.md
// EDUCATION ONLY. Treatment pathways summarise NICE guidance, which is updated: check the current NICE guideline,
// the BNF and the SPC. Any dose is illustrative; real doses come from the BNF and the prescriber.
export default `
## Hypertension
S: High blood pressure is the commonest treatable risk factor for heart attack, stroke, kidney disease and dementia. Pharmacists help find it, confirm it, treat it and keep it controlled.
O: Describe how hypertension is diagnosed and staged in UK practice
O: Explain blood pressure targets and the role of lifestyle change
T: Ambulatory blood pressure monitoring (ABPM) | Automatic readings over a day, used to confirm a diagnosis of hypertension
T: Stage 1 hypertension | Clinic blood pressure 140/90 mmHg or higher, confirmed by an ABPM or home average of 135/85 or higher
H: Diagnosis (NICE NG136)
- If clinic blood pressure is 140/90 mmHg or higher, confirm with ABPM or home blood pressure monitoring (HBPM), because clinic readings can be raised by anxiety ("white coat" effect).
- **Stage 1**: ABPM or HBPM average 135/85 or higher. **Stage 2**: 150/95 or higher. **Severe**: clinic systolic 180 or diastolic 120 or higher; needs same-day assessment if there are signs of target organ damage.
- Assess cardiovascular risk (QRISK3) and look for target organ damage (kidney function, urine albumin, ECG, eyes).
H: Targets and lifestyle
- Clinic targets: below 140/90 under 80 years; below 150/90 at 80 and over (adjust for frailty); home or ambulatory targets are 5 mmHg lower.
- Lifestyle: less salt, weight loss, regular exercise, less alcohol, stopping smoking, a healthy diet.
- Offer drug treatment for stage 2, and for stage 1 in people under 80 with target organ damage, cardiovascular disease, diabetes, kidney disease or a 10-year risk of 10% or more (and consider it in other groups as NICE describes).
- Community pharmacies in England offer blood pressure case finding and ABPM.
K: Confirm raised clinic readings with ABPM or HBPM; treat to targets under NICE NG136, alongside lifestyle change.
!: Starting long-term treatment on a single raised clinic reading without confirming it with ambulatory or home readings.
Q: Which readings confirm a diagnosis of hypertension? | ABPM or home blood pressure averages of 135/85 mmHg or higher.
Q: What is the clinic target for someone aged 75? | Below 140/90 mmHg.
SUM: Hypertension is confirmed out of the clinic and staged by NICE criteria.
SUM: Targets depend on age; lifestyle change underpins treatment.
SRC: NICE NG136, Hypertension in adults: diagnosis and management | guidance | 2023 | https://www.nice.org.uk/guidance/ng136
SRC: NHS England, Community pharmacy hypertension case-finding service: specification | guidance | 2024 | https://www.england.nhs.uk/primary-care/pharmacy/
M1#pharmacy-u07-01-q1@1: What confirms a diagnosis of hypertension after a raised clinic reading? | Ambulatory or home blood pressure monitoring | A second clinic reading the same day | A blood test | An ECG alone | A urine dipstick | NICE NG136 recommends ABPM or HBPM to confirm.
M2#pharmacy-u07-01-q2@2: What is the NICE clinic blood pressure target for an 84-year-old? | Below 150/90 mmHg | Below 120/80 mmHg | Below 130/80 mmHg | Below 140/90 mmHg | Below 160/100 mmHg | NICE sets a less strict target at 80 and over, adjusted for frailty.
M2#pharmacy-u07-01-q3@1: Which change most directly lowers blood pressure for many people? | Reducing salt intake | Taking vitamin C | Avoiding all fruit | Drinking more coffee | Sleeping longer only | Salt reduction is a key lifestyle measure.

## Antihypertensive drugs
S: NICE's step-wise approach chooses the first drug by age, ethnicity and diabetes, then adds drugs from the main classes. Knowing each class's effects and monitoring makes the pathway safe.
O: Apply the NICE treatment steps for hypertension
O: Describe the adverse effects and monitoring of the main antihypertensive classes
T: ACE inhibitor | A drug that blocks angiotensin-converting enzyme, reducing angiotensin II (such as ramipril)
T: Thiazide-like diuretic | A diuretic acting on the distal tubule, such as indapamide, used in hypertension
H: The NICE steps (NG136)
- **Step 1**: an ACE inhibitor or angiotensin receptor blocker (ARB) for people with type 2 diabetes, or under 55 and not of Black African or African-Caribbean family origin; a calcium channel blocker (CCB) for people 55 and over, or of Black African or African-Caribbean origin, without type 2 diabetes.
- **Step 2**: add a CCB or a thiazide-like diuretic (or an ACE inhibitor or ARB, depending on the first step).
- **Step 3**: ACE inhibitor or ARB plus CCB plus thiazide-like diuretic.
- **Step 4**: confirm adherence and resistant hypertension; consider spironolactone (if potassium 4.5 mmol/L or less) or an alpha- or beta-blocker, with specialist advice as needed.
H: Class effects and monitoring
- **ACE inhibitors**: dry cough, hyperkalaemia, acute kidney injury, angioedema; check renal function and potassium before starting and after dose changes; avoid in pregnancy. **ARBs** are similar without the cough.
- **CCBs**: ankle swelling, flushing, headache; verapamil and diltiazem also slow the heart.
- **Thiazide-like diuretics**: low sodium and potassium, raised uric acid (gout) and glucose.
DRUG: Ramipril | ACE inhibitor: blocks conversion of angiotensin I to angiotensin II | Hypertension, heart failure, after a heart attack, diabetic kidney disease | Dry cough, hyperkalaemia, acute kidney injury, first-dose hypotension, angioedema; contraindicated in pregnancy | Check U&Es before starting and after dose increases; sick day guidance during dehydrating illness; avoid NSAIDs and potassium supplements unless advised (check the BNF)
DRUG: Amlodipine | Dihydropyridine calcium channel blocker (blocks L-type channels in vascular smooth muscle) | Hypertension and angina | Ankle swelling, flushing, headache, palpitations | Ankle swelling is common and not due to heart failure: review rather than add a diuretic; simvastatin dose limit with amlodipine (check the BNF)
K: Choose step 1 by age, ethnicity and diabetes, then add classes in order; monitor ACE inhibitors and ARBs with U&Es.
!: Starting an ACE inhibitor without checking kidney function and potassium before and after.
Q: What is first-line for a 45-year-old white man with hypertension and no diabetes? | An ACE inhibitor or ARB.
Q: Which ACE inhibitor side effect leads to a switch to an ARB? | A persistent dry cough.
SUM: NICE steps choose drugs by age, ethnicity and diabetes.
SUM: Each class has specific adverse effects and monitoring.
SRC: NICE NG136, Hypertension in adults: diagnosis and management | guidance | 2023 | https://www.nice.org.uk/guidance/ng136
SRC: Joint Formulary Committee, British National Formulary: hypertension | guidance | 2026 | https://bnf.nice.org.uk/
M2#pharmacy-u07-02-q1@1: What is NICE's first step for a 62-year-old woman with hypertension and no diabetes? | A calcium channel blocker | An ACE inhibitor | A beta-blocker | A loop diuretic | Spironolactone | A CCB is first line at 55 and over without type 2 diabetes.
M2#pharmacy-u07-02-q2@2: Which check is needed after starting an ACE inhibitor? | Renal function and potassium | Liver function only | INR | Thyroid function | Blood glucose only | ACE inhibitors can cause AKI and hyperkalaemia.
M3#pharmacy-u07-02-q3@2: Someone on amlodipine develops ankle swelling. A diuretic is suggested. What's best? | Review the amlodipine first | Add the diuretic straight away | Double the amlodipine | Add a second CCB | Add a potassium supplement | CCB oedema doesn't respond well to diuretics; adding one risks a prescribing cascade.

## Lipid management
S: Lowering cholesterol, especially LDL and non-HDL cholesterol, reduces heart attacks and strokes. Statins are the foundation, with other drugs added when targets aren't met.
O: Describe the use of statins and other lipid-lowering drugs
O: Apply NICE lipid targets and monitoring
T: Non-HDL cholesterol | Total cholesterol minus HDL cholesterol: a measure of atherogenic lipoproteins
T: High-intensity statin | A statin regimen lowering LDL cholesterol by 40% or more, such as atorvastatin 20 mg or more
H: Treatment (NICE NG238)
- **Primary prevention**: offer a statin (atorvastatin is usual first choice) if the QRISK3 10-year risk is 10% or more, after discussing benefits and harms; lifestyle changes alongside.
- **Secondary prevention** (established cardiovascular disease): a high-intensity statin (atorvastatin at a higher dose; see the BNF), aiming for an LDL cholesterol of 2.0 mmol/L or less, or non-HDL of 2.6 mmol/L or less.
- If targets aren't met: check adherence, increase the statin if possible, then add ezetimibe; other options (such as inclisiran or PCSK9 inhibitors) under NICE technology appraisals.
H: Safety and monitoring
- Muscle symptoms are common but true statin myopathy is rare; check creatine kinase if symptoms are severe or unexplained. Rhabdomyolysis risk rises with interacting drugs.
- Check liver function before starting, then at 3 and 12 months.
- Interactions: simvastatin with strong CYP3A4 inhibitors (contraindicated), and dose limits with amlodipine, diltiazem and others (check the BNF).
- Statins are stopped in pregnancy.
DRUG: Atorvastatin | Statin: inhibits HMG-CoA reductase, lowering LDL cholesterol | Primary and secondary prevention of cardiovascular disease | Muscle aches; rarely myopathy and rhabdomyolysis; raised liver enzymes; GI effects | Lipids and liver function as NICE advises; report unexplained muscle pain, weakness or dark urine; check interactions (CYP3A4); avoid in pregnancy (check the BNF)
K: Atorvastatin for primary prevention when QRISK3 is 10% or more; high-intensity statins and LDL or non-HDL targets for secondary prevention, then ezetimibe.
!: Stopping a statin at the first mention of aches without assessing the symptoms or trying another statin or dose.
Q: What QRISK3 threshold prompts an offer of a statin? | 10% or more 10-year risk.
Q: What is the NICE LDL target in secondary prevention? | 2.0 mmol/L or less (non-HDL 2.6 mmol/L or less).
SUM: Statins are the foundation of lipid lowering.
SUM: Secondary prevention uses targets; add ezetimibe when needed.
SRC: NICE NG238, Cardiovascular disease: risk assessment and reduction, including lipid modification | guidance | 2023 | https://www.nice.org.uk/guidance/ng238
SRC: MHRA, Drug Safety Update: statins, benefits and risks | guidance | 2014 | https://www.gov.uk/drug-safety-update
M1#pharmacy-u07-03-q1@1: Which enzyme do statins inhibit? | HMG-CoA reductase | Cyclo-oxygenase | ACE | Xanthine oxidase | Lipoprotein lipase | Statins reduce cholesterol synthesis in the liver.
M2#pharmacy-u07-03-q2@2: A patient on atorvastatin hasn't reached the LDL target despite good adherence at the maximum tolerated dose. What's next? | Add ezetimibe | Stop the statin | Switch to aspirin | Add a fibrate first | Increase fish intake only | When the maximum tolerated statin dose doesn't reach the target, NICE NG238 recommends adding ezetimibe.
M2#pharmacy-u07-03-q3@1: Which is a contraindicated combination? | Simvastatin with clarithromycin | Atorvastatin with paracetamol | Rosuvastatin with ramipril | Atorvastatin with amlodipine at standard doses | Simvastatin with omeprazole | Strong CYP3A4 inhibitors raise simvastatin levels and the risk of rhabdomyolysis.

## Cardiovascular risk assessment
S: Risk tools estimate a person's chance of a heart attack or stroke over 10 years, helping decide who benefits from treatment. Pharmacists use them in health checks and conversations about statins.
O: Use QRISK3 and understand its limits
O: Communicate cardiovascular risk to support shared decisions
T: QRISK3 | A UK tool estimating 10-year risk of cardiovascular disease from factors such as age, blood pressure, cholesterol, smoking and conditions
T: NHS Health Check | A check for adults aged 40 to 74 in England to assess and reduce cardiovascular risk
H: Using QRISK3
- Includes age, sex, ethnicity, deprivation, smoking, blood pressure, cholesterol ratio, BMI, diabetes, family history, kidney disease, atrial fibrillation, migraine, rheumatoid arthritis, lupus, severe mental illness and some medicines.
- Don't use it for people who already have cardiovascular disease, type 1 diabetes, eGFR below 60 or albuminuria, or familial hypercholesterolaemia: they're managed directly.
- It may underestimate risk in some groups (for example people with HIV or on antipsychotics); use clinical judgement.
H: Communicating risk
- "Of 100 people like you, about 12 will have a heart attack or stroke in the next 10 years; with a statin, about 8 or 9 would" makes absolute benefit clear (illustrative numbers).
- Heart age tools can help people understand risk.
- Lifestyle change benefits everyone, whatever their risk score.
- Refer people with very high cholesterol or a family history of early heart disease for assessment for familial hypercholesterolaemia, as NICE advises.
K: Use QRISK3 for primary prevention (not for people with existing disease, type 1 diabetes or CKD), and explain risk in absolute numbers.
!: Calculating QRISK3 for someone who has already had a heart attack: they need secondary prevention regardless.
Q: Who should not have a QRISK3 calculation? | People with existing cardiovascular disease, type 1 diabetes, CKD or familial hypercholesterolaemia.
Q: Who is offered an NHS Health Check in England? | Adults aged 40 to 74 without existing conditions.
SUM: QRISK3 estimates 10-year cardiovascular risk for primary prevention.
SUM: Explain risk in absolute terms to support decisions.
SRC: NICE NG238, Cardiovascular disease: risk assessment and reduction | guidance | 2023 | https://www.nice.org.uk/guidance/ng238
SRC: Hippisley-Cox J and others, Development and validation of QRISK3, BMJ 357: j2099 | primary | 2017
M1#pharmacy-u07-04-q1@2: Which group shouldn't have QRISK3 used to decide on statins? | People who have had a stroke | People aged 50 | People who smoke | People with high blood pressure | People with a family history | Established cardiovascular disease means secondary prevention.
M2#pharmacy-u07-04-q2@1: What does QRISK3 estimate? | 10-year risk of heart attack or stroke | Lifetime risk of cancer | Current blood pressure | Risk of diabetes next year | Cholesterol level | It estimates 10-year cardiovascular risk.
M2#pharmacy-u07-04-q3@2: Which explanation of statin benefit is clearest? | "Of 100 people like you, about 3 or 4 fewer will have a heart attack or stroke" | "It cuts your risk by a third" | "It's very effective" | "Everyone should take one" | "It removes your risk" | Absolute numbers help people weigh benefits.

## Stable angina
S: Stable angina is chest pain on exertion from narrowed coronary arteries. Treatment relieves symptoms, prevents attacks and reduces the risk of heart attack, and people need clear advice on using their GTN spray.
O: Describe the drug treatment of stable angina
O: Counsel on glyceryl trinitrate use and when to call 999
T: Stable angina | Predictable chest pain on exertion or stress, relieved by rest or GTN
T: Glyceryl trinitrate (GTN) | A short-acting nitrate used sublingually to relieve or prevent angina
H: Treatment (NICE CG126)
- **Short-acting GTN** for attacks and before exertion.
- **First line** to prevent attacks: a beta-blocker or a calcium channel blocker (rate-limiting or dihydropyridine), chosen by comorbidities and preference.
- If symptoms persist: combine a beta-blocker with a dihydropyridine CCB (not verapamil, because of heart block risk); or add a long-acting nitrate, ivabradine, nicorandil or ranolazine.
- **Secondary prevention**: antiplatelet (usually aspirin), statin, blood pressure control, and an ACE inhibitor if diabetes is present; refer for revascularisation if symptoms aren't controlled.
H: GTN counselling
- Sit down before using it (it can cause dizziness and faintness); spray under the tongue.
- If pain isn't relieved after 5 minutes, take a second dose; if still not relieved 5 minutes after that, call 999.
- Headache is common. Never take with PDE5 inhibitors (such as sildenafil): severe hypotension.
- Allow a nitrate-free period with long-acting nitrates to avoid tolerance.
K: GTN for attacks (sit down, repeat after 5 minutes, call 999 if pain persists 5 minutes later); beta-blocker or CCB to prevent; secondary prevention for all.
!: Supplying sildenafil to someone using GTN or another nitrate.
Q: When should someone with angina call 999? | If pain persists 5 minutes after the second dose of GTN.
Q: Why avoid verapamil with a beta-blocker? | Both slow the heart, risking severe bradycardia and heart block.
SUM: Treat symptoms with GTN and prevent with beta-blockers or CCBs.
SUM: Everyone with angina needs secondary prevention and GTN counselling.
SRC: NICE CG126, Stable angina: management | guidance | 2016 | https://www.nice.org.uk/guidance/cg126
SRC: Joint Formulary Committee, British National Formulary: glyceryl trinitrate | guidance | 2026 | https://bnf.nice.org.uk/
M1#pharmacy-u07-05-q1@2: Which drug must never be combined with GTN? | Sildenafil | Aspirin | Atorvastatin | Bisoprolol | Paracetamol | PDE5 inhibitors with nitrates cause dangerous hypotension.
M2#pharmacy-u07-05-q2@1: Which is a first-line preventive drug for stable angina? | A beta-blocker | A loop diuretic | An ACE inhibitor alone | Digoxin | Warfarin | NICE recommends a beta-blocker or a CCB first line.
M2#pharmacy-u07-05-q3@2: What should someone do before using their GTN spray? | Sit down | Stand up quickly | Drink water | Eat something | Lie flat on their front | GTN dilates blood vessels and can cause dizziness and fainting, so sit down first.

## Acute coronary syndromes
S: Acute coronary syndromes (ACS) are emergencies: unstable angina and heart attacks (NSTEMI and STEMI). Rapid recognition, emergency care and the right antithrombotic treatment save lives.
O: Describe the immediate management of acute coronary syndromes
O: Explain dual antiplatelet therapy after ACS
T: STEMI | ST-elevation myocardial infarction: a heart attack with complete coronary occlusion, needing urgent reperfusion
T: Dual antiplatelet therapy (DAPT) | Aspirin plus a P2Y12 inhibitor (such as ticagrelor, prasugrel or clopidogrel) after ACS
H: Immediate management
- Call 999 for chest pain suggestive of a heart attack. Paramedics or hospital teams give aspirin (a loading dose; see the BNF), pain relief and oxygen only if saturations are low.
- **STEMI**: primary percutaneous coronary intervention (PCI), or thrombolysis if PCI can't be done in time.
- **NSTEMI and unstable angina**: risk assessment (such as the GRACE score), antithrombotic treatment and angiography depending on risk.
H: After ACS (NICE NG185)
- DAPT usually for up to 12 months (aspirin plus ticagrelor or prasugrel, or clopidogrel where bleeding risk is high), then aspirin alone lifelong.
- Consider gastroprotection with a PPI (avoid omeprazole and esomeprazole with clopidogrel).
- Plus secondary prevention: ACE inhibitor, beta-blocker, high-intensity statin, cardiac rehabilitation.
K: Chest pain suggesting a heart attack is a 999 emergency; after ACS, DAPT for up to 12 months then lifelong aspirin, with secondary prevention.
!: Advising someone with crushing chest pain to see their GP tomorrow instead of calling 999.
Q: What is DAPT? | Aspirin plus a P2Y12 inhibitor (such as ticagrelor) after ACS.
Q: Which PPIs should be avoided with clopidogrel? | Omeprazole and esomeprazole.
SUM: ACS needs emergency care; STEMI needs urgent reperfusion.
SUM: DAPT for up to 12 months, then lifelong aspirin and secondary prevention.
SRC: NICE NG185, Acute coronary syndromes | guidance | 2020 | https://www.nice.org.uk/guidance/ng185
SRC: Joint Formulary Committee, British National Formulary: acute coronary syndromes | guidance | 2026 | https://bnf.nice.org.uk/
M1#pharmacy-u07-06-q1@1: What should someone with crushing chest pain do? | Call 999 | Book a GP appointment | Take an antacid | Rest at home overnight | Visit the pharmacy next day | A suspected heart attack is an emergency: call 999 for urgent assessment and reperfusion.
M2#pharmacy-u07-06-q2@2: How long is DAPT usually continued after ACS? | Up to 12 months | 1 week | Lifelong | 3 days | 5 years | NICE recommends DAPT for up to 12 months in most people.
M3#pharmacy-u07-06-q3@2: A person on clopidogrel needs a PPI. Which is the best choice? | Lansoprazole | Omeprazole | Esomeprazole | Either omeprazole or esomeprazole | None can be used | Omeprazole and esomeprazole reduce clopidogrel activation via CYP2C19.

## Secondary prevention after a heart attack
S: After a heart attack, a set of medicines and lifestyle changes greatly reduces the risk of another event. Pharmacists help people understand, start and keep taking them.
O: List the medicines used for secondary prevention after myocardial infarction
O: Support people to take them and make lifestyle changes
T: Secondary prevention | Measures to prevent further events in people who already have cardiovascular disease
T: Cardiac rehabilitation | A structured programme of exercise, education and support after a cardiac event
H: The medicines (NICE NG185)
- **Antiplatelets**: DAPT then aspirin lifelong (or an alternative if intolerant).
- **ACE inhibitor** (titrated up, with renal monitoring).
- **Beta-blocker** (particularly with reduced ejection fraction).
- **High-intensity statin**.
- Others where indicated: an MRA (such as eplerenone) with heart failure and reduced ejection fraction, and SGLT2 inhibitors for heart failure or diabetes.
H: Supporting people
- Explain why each medicine matters, as several are for prevention rather than symptoms.
- Cardiac rehabilitation, stopping smoking, diet, exercise, weight, alcohol and blood pressure control.
- Practical advice: driving (DVLA rules), return to work, sexual activity (and avoiding PDE5 inhibitors with nitrates), and the New Medicine Service for new medicines.
K: After a heart attack: antiplatelets, ACE inhibitor, beta-blocker and high-intensity statin, plus rehabilitation and lifestyle change.
!: Not explaining that preventive medicines work even though the person feels well, so they stop them.
Q: Name four secondary prevention medicines after a heart attack. | Antiplatelet(s), ACE inhibitor, beta-blocker and high-intensity statin.
Q: What is cardiac rehabilitation? | A structured programme of exercise, education and support after a cardiac event.
SUM: Four medicine groups plus rehabilitation reduce further events.
SUM: Explanation and support help people keep taking them.
SRC: NICE NG185, Acute coronary syndromes: secondary prevention | guidance | 2020 | https://www.nice.org.uk/guidance/ng185
SRC: Driver and Vehicle Licensing Agency, Assessing fitness to drive: guide for medical professionals | guidance | 2025 | https://www.gov.uk/guidance/assessing-fitness-to-drive-a-guide-for-medical-professionals
M1#pharmacy-u07-07-q1@1: Which is part of secondary prevention after a heart attack? | A high-intensity statin | A short course of antibiotics | A sedating antihistamine | An oral corticosteroid | A decongestant | Statins reduce further cardiovascular events.
M2#pharmacy-u07-07-q2@2: Why might someone stop secondary prevention medicines? | They feel well and don't see the benefit | They are always unaffordable | They work only for one week | They cause immediate harm in everyone | They're not available | Explaining preventive benefit supports adherence.
M2#pharmacy-u07-07-q3@1: Which service supports people starting a new cardiovascular medicine in England? | The New Medicine Service | Pharmacy First | The Yellow Card scheme | NHS 111 only | The Healthy Start scheme | NMS supports people with new medicines for long-term conditions.

## Chronic heart failure
S: In heart failure the heart can't pump enough blood for the body's needs. For heart failure with reduced ejection fraction, several drug classes each reduce deaths and admissions, so getting people onto all of them matters.
O: Describe the drug treatment of heart failure with reduced ejection fraction
O: Identify drugs to avoid and monitoring needed in heart failure
T: Heart failure with reduced ejection fraction (HFrEF) | Heart failure with a left ventricular ejection fraction of 40% or less
T: Mineralocorticoid receptor antagonist (MRA) | A drug blocking aldosterone receptors, such as spironolactone or eplerenone
H: Treatment of HFrEF (NICE NG106 and technology appraisals)
- **First line**: an ACE inhibitor (or ARB if not tolerated) and a beta-blocker licensed for heart failure (bisoprolol, carvedilol or nebivolol), started low and titrated slowly.
- **Add**: an MRA, and an SGLT2 inhibitor (dapagliflozin or empagliflozin).
- **Sacubitril-valsartan** can replace an ACE inhibitor or ARB under specialist advice.
- **Loop diuretics** (furosemide, bumetanide) relieve congestion and breathlessness but don't improve survival.
- For heart failure with preserved ejection fraction, SGLT2 inhibitors and diuretics for symptoms.
H: Safety
- Monitor potassium and renal function, especially with ACE inhibitors, ARBs and MRAs together.
- Avoid or use with caution: NSAIDs, verapamil and diltiazem, pioglitazone, and some antiarrhythmics.
- Self-care: daily weights (a rise of about 2 kg in 3 days needs review), fluid advice, recognising worsening symptoms.
DRUG: Bisoprolol | Cardioselective beta-1 adrenoceptor blocker | Heart failure with reduced ejection fraction, angina, hypertension (not first line), atrial fibrillation rate control | Bradycardia, fatigue, cold extremities, dizziness; may worsen symptoms briefly when started in heart failure; caution in asthma | Start low and titrate slowly in heart failure; monitor pulse and blood pressure; don't stop abruptly (check the BNF)
K: HFrEF: ACE inhibitor (or ARB or sacubitril-valsartan), beta-blocker, MRA and SGLT2 inhibitor, with loop diuretics for congestion; monitor potassium and renal function.
!: Supplying ibuprofen to someone with heart failure: NSAIDs cause fluid retention and worsen heart failure and kidney function.
Q: Name the four main drug classes that improve survival in HFrEF. | ACE inhibitor (or ARB or sacubitril-valsartan), beta-blocker, MRA and SGLT2 inhibitor.
Q: Why weigh daily in heart failure? | Rapid weight gain shows fluid retention, needing review.
SUM: Four drug classes improve outcomes in HFrEF; diuretics relieve symptoms.
SUM: Monitor potassium and renal function; avoid drugs that worsen heart failure.
SRC: NICE NG106, Chronic heart failure in adults: diagnosis and management | guidance | 2018 | https://www.nice.org.uk/guidance/ng106
SRC: NICE TA679, Dapagliflozin for treating chronic heart failure with reduced ejection fraction | guidance | 2021 | https://www.nice.org.uk/guidance/ta679
M2#pharmacy-u07-08-q1@1: Which drug relieves breathlessness in heart failure but doesn't improve survival? | Furosemide | Bisoprolol | Ramipril | Spironolactone | Dapagliflozin | Loop diuretics relieve fluid congestion and breathlessness but, unlike the others, don't improve survival.
M2#pharmacy-u07-08-q2@2: Which combination needs close potassium monitoring? | Ramipril with spironolactone | Furosemide with paracetamol | Bisoprolol with atorvastatin | Aspirin with lansoprazole | Dapagliflozin with metformin | ACE inhibitors and MRAs both raise potassium.
M3#pharmacy-u07-08-q3@1: Someone with heart failure gains 2.5 kg in three days. What should they do? | Contact their heart failure team or GP promptly | Stop all their medicines | Drink more fluid | Wait for their annual review | Take extra salt | Rapid weight gain suggests fluid retention needing review.

## Atrial fibrillation
S: Atrial fibrillation (AF) is the commonest heart rhythm disorder and a major cause of stroke. Treatment controls the heart rate or rhythm and, for most people, prevents stroke with anticoagulation.
O: Describe rate and rhythm control strategies in atrial fibrillation
O: Assess stroke and bleeding risk to guide anticoagulation
T: CHA₂DS₂-VASc | A score estimating stroke risk in atrial fibrillation
T: ORBIT score | A score estimating bleeding risk in people on anticoagulants, recommended by NICE
H: Rate and rhythm (NICE NG196)
- **Rate control** first for most: a beta-blocker or a rate-limiting CCB (diltiazem or verapamil, not with a beta-blocker); digoxin for sedentary people or as an add-on.
- **Rhythm control** (cardioversion, antiarrhythmics, ablation) for some, such as people with new-onset AF, a reversible cause, or symptoms despite rate control.
H: Stroke prevention
- Calculate CHA₂DS₂-VASc: congestive heart failure, hypertension, age 75 or over (2 points), diabetes, stroke or TIA (2 points), vascular disease, age 65 to 74, sex category (female).
- Offer anticoagulation with a score of 2 or more; consider it for men with a score of 1.
- A DOAC is first choice for most; warfarin if DOACs are unsuitable (for example mechanical heart valves or moderate to severe mitral stenosis).
- Assess bleeding risk (ORBIT), and address modifiable bleeding risks; bleeding risk alone shouldn't stop anticoagulation.
- Aspirin isn't recommended for stroke prevention in AF.
K: Rate control first for most; anticoagulate (usually a DOAC) when CHA₂DS₂-VASc is 2 or more, after reviewing bleeding risk.
!: Offering aspirin for stroke prevention in AF: it's not recommended.
Q: What CHA₂DS₂-VASc score prompts an offer of anticoagulation? | 2 or more (consider at 1 in men).
Q: Is aspirin recommended for stroke prevention in AF? | No.
SUM: Most people with AF get rate control and anticoagulation.
SUM: Use CHA₂DS₂-VASc for stroke risk and ORBIT for bleeding risk.
SRC: NICE NG196, Atrial fibrillation: diagnosis and management | guidance | 2021 | https://www.nice.org.uk/guidance/ng196
SRC: Joint Formulary Committee, British National Formulary: arrhythmias | guidance | 2026 | https://bnf.nice.org.uk/
M1#pharmacy-u07-09-q1@1: Which drug is commonly first line for AF rate control? | Bisoprolol | Amiodarone | Flecainide | Aspirin | Furosemide | A beta-blocker or rate-limiting CCB is first line.
M2#pharmacy-u07-09-q2@2: A 78-year-old woman with AF and hypertension: what's her CHA₂DS₂-VASc score? | 4 | 2 | 3 | 1 | 5 | Age 75 or over (2) + hypertension (1) + female (1) = 4.
M2#pharmacy-u07-09-q3@1: Which anticoagulant is first choice for most people with AF? | A DOAC | Aspirin | Warfarin always | Heparin by injection | Clopidogrel | NICE NG196 recommends a DOAC first for most people; aspirin and clopidogrel aren't for AF stroke prevention.

## Antiarrhythmic drugs
S: Antiarrhythmic drugs restore or maintain a normal rhythm, but many can also cause arrhythmias and have serious adverse effects. Amiodarone in particular needs careful monitoring.
O: Describe the main antiarrhythmic drugs and their uses
O: Identify key adverse effects, monitoring and interactions
T: Proarrhythmia | An arrhythmia caused or worsened by an antiarrhythmic drug
T: Vaughan Williams classification | A grouping of antiarrhythmics by their main mechanism (classes I to IV)
H: Main drugs
- **Class I (sodium channel blockers)**: flecainide, for some atrial arrhythmias in people without structural heart disease (it increases mortality after a heart attack).
- **Class II (beta-blockers)**: rate control and prevention.
- **Class III (potassium channel blockers)**: amiodarone, sotalol (also prolongs QT).
- **Class IV (rate-limiting CCBs)**: verapamil, diltiazem.
- **Others**: digoxin (rate control), adenosine (terminating supraventricular tachycardia, given rapidly IV in hospital).
H: Amiodarone
- Adverse effects: thyroid dysfunction (hypo- and hyperthyroidism), lung fibrosis, liver injury, photosensitivity, corneal deposits, peripheral neuropathy, QT prolongation.
- Monitoring: thyroid and liver function before starting and every 6 months; chest X-ray at baseline; ask about breathlessness and vision.
- Interactions: raises warfarin's effect and digoxin levels (reduce doses), and increases myopathy risk with simvastatin.
- Very long half-life, so effects and interactions persist for months after stopping.
DRUG: Amiodarone | Class III antiarrhythmic (prolongs repolarisation by blocking potassium channels, with other actions) | Supraventricular and ventricular arrhythmias, usually under specialist advice | Thyroid dysfunction, lung fibrosis, liver toxicity, photosensitivity, corneal deposits, QT prolongation | Thyroid and liver function before and every 6 months; protect skin from the sun; check interactions with warfarin, digoxin and simvastatin (check the BNF)
K: Antiarrhythmics can cause arrhythmias; amiodarone needs thyroid, liver and lung monitoring and has major interactions.
!: Starting amiodarone in someone on warfarin and digoxin without adjusting doses or increasing monitoring.
Q: Name three adverse effects of amiodarone. | For example thyroid dysfunction, lung fibrosis and photosensitivity.
Q: Why is flecainide avoided after a heart attack? | It increases mortality in structural heart disease.
SUM: Antiarrhythmics are grouped by mechanism and can cause proarrhythmia.
SUM: Amiodarone has wide-ranging toxicity and interactions needing monitoring.
SRC: Joint Formulary Committee, British National Formulary: amiodarone | guidance | 2026 | https://bnf.nice.org.uk/
SRC: NICE NG196, Atrial fibrillation: rhythm control | guidance | 2021 | https://www.nice.org.uk/guidance/ng196
M2#pharmacy-u07-10-q1@1: Which monitoring is needed for amiodarone? | Thyroid and liver function every 6 months | INR weekly | Lithium levels | Blood glucose daily | Bone density yearly | Amiodarone affects the thyroid and liver.
M2#pharmacy-u07-10-q2@2: Amiodarone is started in someone on warfarin. What's expected? | The INR rises, so monitor and reduce warfarin | The INR falls sharply | No interaction | Warfarin must be stopped | Amiodarone becomes inactive | Amiodarone inhibits warfarin metabolism, raising the INR for weeks to months: monitor and reduce warfarin.
M3#pharmacy-u07-10-q3@1: Which antiarrhythmic should be avoided in someone with a previous heart attack? | Flecainide | Bisoprolol | Digoxin | Amiodarone under specialist care | Diltiazem in rate control | Class Ic drugs increase mortality in structural heart disease.

## Venous thromboembolism
S: Venous thromboembolism (VTE), meaning deep vein thrombosis and pulmonary embolism, is common and can be fatal. Prevention in hospital and prompt anticoagulant treatment both save lives.
O: Describe the diagnosis and anticoagulant treatment of VTE
O: Explain VTE prevention in hospital
T: Deep vein thrombosis (DVT) | A clot in a deep vein, usually of the leg
T: Pulmonary embolism (PE) | A clot blocking a pulmonary artery, often from a DVT
H: Diagnosis and treatment (NICE NG158)
- Suspected DVT or PE: assess with the Wells score, D-dimer and imaging; PE with severe breathlessness or collapse is an emergency.
- **Treatment**: a DOAC (apixaban or rivaroxaban) first line for most, including many people with cancer; LMWH followed by warfarin or dabigatran or edoxaban are alternatives.
- **Duration**: at least 3 months; longer for unprovoked VTE or ongoing risk, after assessing bleeding risk.
H: Prevention (NICE NG89)
- Assess everyone admitted to hospital for VTE and bleeding risk.
- Prophylaxis with LMWH (renally adjusted) or mechanical methods where appropriate, and after some surgery (for example hip and knee replacement).
- Encourage mobility and hydration.
- Counsel about leg swelling, chest pain or breathlessness, which need urgent assessment.
K: Treat VTE with a DOAC first line for at least 3 months; assess every hospital admission for VTE risk and give prophylaxis when indicated.
!: Missing VTE risk assessment on admission, or stopping anticoagulation early without review.
Q: What is the minimum usual treatment duration for VTE? | 3 months.
Q: Which anticoagulants are first line for most people with VTE? | Apixaban or rivaroxaban (DOACs).
SUM: DOACs are first line for most VTE, for at least 3 months.
SUM: VTE prevention in hospital starts with risk assessment.
SRC: NICE NG158, Venous thromboembolic diseases: diagnosis, management and thrombophilia testing | guidance | 2020 | https://www.nice.org.uk/guidance/ng158
SRC: NICE NG89, Venous thromboembolism in over 16s: reducing the risk of hospital-acquired DVT or PE | guidance | 2019 | https://www.nice.org.uk/guidance/ng89
M1#pharmacy-u07-11-q1@1: What is the minimum usual anticoagulation for a provoked DVT? | 3 months | 1 week | 2 weeks | Lifelong | 10 years | NICE NG158 recommends at least 3 months of anticoagulation, then review.
M2#pharmacy-u07-11-q2@2: Which is first-line treatment for most people with VTE? | Apixaban or rivaroxaban | Aspirin | Clopidogrel | Ibuprofen | Unfractionated heparin long term | NICE NG158 recommends a DOAC (apixaban or rivaroxaban) first line for most people.
M2#pharmacy-u07-11-q3@1: What must happen for everyone admitted to hospital? | VTE and bleeding risk assessment | Routine LMWH for all | Routine warfarin | A chest X-ray | Leg ultrasound | NICE NG89 requires risk assessment on admission.

## Anticoagulants
S: Anticoagulants prevent and treat clots by acting on the clotting cascade. Each class works differently, needs different monitoring and has different reversal options, and all carry a bleeding risk.
O: Compare the main anticoagulant classes and their monitoring
O: Describe reversal agents and bleeding management
T: Vitamin K antagonist | An anticoagulant such as warfarin that reduces production of vitamin K-dependent clotting factors
T: Direct oral anticoagulant (DOAC) | An oral anticoagulant directly inhibiting factor Xa (apixaban, rivaroxaban, edoxaban) or thrombin (dabigatran)
H: The classes
- **Warfarin**: reduces clotting factors II, VII, IX and X; monitored by INR; many interactions; reversed with vitamin K (and prothrombin complex concentrate in major bleeding).
- **DOACs**: fixed doses, no routine INR monitoring; depend on renal function; reversal with idarucizumab (dabigatran) or andexanet alfa in specific situations.
- **Heparins**: low molecular weight heparins (enoxaparin, dalteparin) by injection, renally adjusted; unfractionated heparin in hospital (monitored by APTT; reversed by protamine).
H: Safety
- Anticoagulants are high-risk medicines: bleeding, interactions and dosing errors cause serious harm.
- Carry an anticoagulant alert card; tell all health professionals.
- Avoid NSAIDs and use antiplatelets together only when indicated.
- Watch for bleeding signs: blood in urine or stools, black stools, vomiting blood, severe headache, prolonged bleeding.
K: Warfarin needs INR monitoring and has many interactions; DOACs depend on renal function; heparins are injected and renally adjusted. All risk bleeding.
!: Adding an NSAID to an anticoagulant for a sprain, raising the risk of GI bleeding.
Q: How is warfarin reversed? | Vitamin K, with prothrombin complex concentrate for major bleeding.
Q: Which DOAC inhibits thrombin rather than factor Xa? | Dabigatran.
SUM: Anticoagulant classes differ in mechanism, monitoring and reversal.
SUM: All carry bleeding risk; counselling and alert cards matter.
SRC: Joint Formulary Committee, British National Formulary: anticoagulants | guidance | 2026 | https://bnf.nice.org.uk/
SRC: National Patient Safety Agency, Patient Safety Alert 18: actions that can make anticoagulant therapy safer | guidance | 2007
M1#pharmacy-u07-12-q1@2: Which anticoagulant is monitored with the INR? | Warfarin | Apixaban | Rivaroxaban | Dabigatran | Enoxaparin | The INR measures warfarin's effect on clotting; DOACs and heparins don't use it.
M2#pharmacy-u07-12-q2@1: Which drug reverses dabigatran? | Idarucizumab | Vitamin K | Protamine | Naloxone | Flumazenil | Idarucizumab binds dabigatran specifically.
M2#pharmacy-u07-12-q3@2: Which symptom on an anticoagulant needs urgent medical attention? | Black, tarry stools | Mild bruising after a knock | A short nosebleed that stops | Slight gum bleeding when brushing | Feeling a little tired | Black, tarry stools suggest bleeding from the upper GI tract, which is urgent on an anticoagulant.

## Warfarin management
S: Warfarin has a narrow therapeutic range, many interactions and is affected by diet and illness, so it needs regular INR monitoring and careful counselling. Pharmacists check doses, interactions and understanding at every supply.
O: Manage warfarin safely, including INR targets and interactions
O: Counsel people taking warfarin
T: INR | International normalised ratio: a measure of how long blood takes to clot, used to monitor warfarin
T: Target INR | The INR range aimed for, usually 2.0 to 3.0 (target 2.5) for most indications
H: Managing warfarin
- Most indications (AF, VTE) target an INR of 2.5 (range 2.0 to 3.0); some (such as recurrent VTE on warfarin or some mechanical valves) target higher, as specialists advise.
- Tablets come in different colours by strength (0.5 mg white, 1 mg brown, 3 mg blue, 5 mg pink; see the BNF): check the person understands their dose in milligrams, not tablet counts alone.
- Check the INR is recent and in range before supplying, using the yellow book or record.
H: Interactions and counselling
- Raise the INR: many antibiotics, azole antifungals, amiodarone, some SSRIs, alcohol binges, illness.
- Lower the INR: enzyme inducers (rifampicin, carbamazepine, St John's wort), large changes in vitamin K intake.
- Counsel: take at the same time each day; keep vitamin K intake (green leafy vegetables) consistent, don't cut it out; avoid cranberry and grapefruit juice in large amounts; check before taking new medicines, including OTC and herbal ones; report bleeding or bruising; carry the alert card.
DRUG: Warfarin | Vitamin K antagonist (reduces synthesis of clotting factors II, VII, IX and X) | Atrial fibrillation, VTE treatment and prevention, mechanical heart valves | Bleeding; many interactions; teratogenic | INR monitoring to the target range; consistent vitamin K intake; check every new medicine for interactions; anticoagulant alert card; report bleeding (check the BNF)
K: Keep INR in range (usually 2.0 to 3.0), check every new medicine for interactions, and counsel on consistent diet and bleeding signs.
!: Supplying a course of clarithromycin to someone on warfarin without arranging an extra INR check.
Q: What is the usual INR target for atrial fibrillation? | 2.5 (range 2.0 to 3.0).
Q: What colour is a 3 mg warfarin tablet? | Blue.
SUM: Warfarin needs INR monitoring and careful interaction checks.
SUM: Counsel on consistent diet, new medicines and bleeding.
SRC: Joint Formulary Committee, British National Formulary: warfarin | guidance | 2026 | https://bnf.nice.org.uk/
SRC: Keeling D and others, Guidelines on oral anticoagulation with warfarin, British Journal of Haematology 154: 311–324 | guidance | 2011
M1#pharmacy-u07-13-q1@1: What is the usual target INR for VTE treatment? | 2.5 | 1.0 | 3.5 | 5.0 | 1.5 | Most indications target 2.5 (range 2.0 to 3.0).
M2#pharmacy-u07-13-q2@2: What dietary advice is right for warfarin? | Keep vitamin K intake consistent | Avoid all green vegetables | Eat as many greens as possible | Avoid all fruit | Drink cranberry juice daily | Keeping vitamin K intake consistent keeps the INR stable; cutting greens out isn't needed.
M3#pharmacy-u07-13-q3@2: Someone on warfarin starts St John's wort. What's the likely effect? | The INR falls as warfarin metabolism is induced | The INR rises sharply | No change | Warfarin becomes toxic immediately | St John's wort replaces warfarin | St John's wort induces enzymes, reducing warfarin's effect.

## Direct oral anticoagulants
S: DOACs have largely replaced warfarin for atrial fibrillation and VTE. They're simpler to use but still need correct dosing for renal function, weight and age, attention to interactions, and good adherence.
O: Describe DOAC dosing considerations and monitoring
O: Identify situations where DOACs are unsuitable
T: Factor Xa inhibitor | A DOAC inhibiting activated factor X: apixaban, rivaroxaban and edoxaban
T: Creatinine clearance (CrCl) | The estimate of renal function used for DOAC dosing (Cockcroft-Gault)
H: Dosing and monitoring
- Doses depend on indication and on renal function (CrCl by Cockcroft-Gault, as the MHRA advises), age and weight; check the SPC criteria for each drug.
- Check renal function, full blood count and liver function at baseline and regularly (more often in older people and with renal impairment).
- Rivaroxaban treatment doses are taken with food; others with or without food (check the SPC).
- Short half-lives make adherence crucial: missed doses quickly remove protection.
H: When DOACs aren't suitable
- Mechanical heart valves and moderate to severe mitral stenosis.
- Antiphospholipid syndrome, particularly triple-positive (MHRA advice).
- Severe renal impairment below the SPC thresholds, significant interactions (strong CYP3A4 and P-glycoprotein inhibitors or inducers, such as some antifungals, HIV drugs, rifampicin and carbamazepine), pregnancy and breastfeeding.
DRUG: Apixaban | Direct oral anticoagulant: factor Xa inhibitor | Stroke prevention in AF; treatment and prevention of VTE | Bleeding; anaemia; nausea | Dose by indication and SPC criteria (age, weight, creatinine); renal and liver function and full blood count; adherence to twice-daily dosing; check interactions with CYP3A4 and P-gp inhibitors or inducers; alert card (check the BNF and SPC)
K: Dose DOACs by indication and SPC criteria using CrCl; stress adherence; avoid them with mechanical valves, antiphospholipid syndrome and major interactions.
!: Switching someone with a mechanical heart valve from warfarin to a DOAC.
Q: Which renal function estimate is used for DOAC dosing? | Creatinine clearance (Cockcroft-Gault).
Q: Name two situations where DOACs aren't suitable. | For example mechanical heart valves and antiphospholipid syndrome.
SUM: DOACs need correct dosing for renal function, age and weight.
SUM: They're unsuitable for mechanical valves and some other conditions.
SRC: MHRA, Drug Safety Update: direct-acting oral anticoagulants, increased risk of recurrent thrombotic events in antiphospholipid syndrome | guidance | 2019-06 | https://www.gov.uk/drug-safety-update
SRC: Joint Formulary Committee, British National Formulary: apixaban | guidance | 2026 | https://bnf.nice.org.uk/
M1#pharmacy-u07-14-q1@1: Which DOAC is taken with food at treatment doses? | Rivaroxaban | Apixaban | Dabigatran | Edoxaban | None of them | Rivaroxaban's absorption at higher doses is improved by food.
M2#pharmacy-u07-14-q2@2: Why is adherence especially important with DOACs? | Their short half-lives mean protection is lost quickly | They need weekly injections | Missed doses cause toxicity | They're only taken monthly | They work for weeks after stopping | Missing doses quickly removes anticoagulant effect.
M3#pharmacy-u07-14-q3@2: A person with a mechanical mitral valve asks about switching to apixaban. What's right? | DOACs aren't suitable for mechanical valves | Switch them straight away | Switch if they prefer | Switch at half the dose | Add apixaban to warfarin | Warfarin remains the anticoagulant for mechanical valves.

## Antiplatelet drugs
S: Antiplatelet drugs reduce arterial clots, which cause heart attacks and strokes. They're the backbone of secondary prevention but increase bleeding, especially in the gut.
O: Describe the mechanisms and uses of the main antiplatelet drugs
O: Manage bleeding risk and interactions with antiplatelets
T: P2Y12 inhibitor | An antiplatelet drug blocking the platelet ADP receptor P2Y12: clopidogrel, prasugrel, ticagrelor
T: Gastroprotection | Using a PPI to reduce the risk of GI bleeding in at-risk people on antiplatelets or NSAIDs
H: The drugs
- **Aspirin**: irreversibly inhibits platelet COX-1, reducing thromboxane; low-dose aspirin for secondary prevention.
- **Clopidogrel**: a prodrug activated partly by CYP2C19; first choice after stroke and in peripheral arterial disease.
- **Ticagrelor**: reversible P2Y12 inhibitor used in ACS; can cause breathlessness; twice daily.
- **Prasugrel**: used in ACS with PCI in selected people.
- Aspirin isn't recommended for primary prevention in most people: bleeding risk outweighs benefit.
H: Managing bleeding risk
- Consider gastroprotection with a PPI in people at higher risk (older age, previous ulcer, combined antithrombotics, steroids, NSAIDs). Use lansoprazole or pantoprazole rather than omeprazole or esomeprazole with clopidogrel.
- Avoid NSAIDs where possible.
- Before surgery or dental procedures, antiplatelets are usually continued: specialist or surgical advice decides any interruption.
- Check interactions and doses in the BNF, and counsel people to report bleeding, black stools or unusual bruising.
DRUG: Clopidogrel | P2Y12 inhibitor (irreversible; prodrug activated partly by CYP2C19) | Secondary prevention after stroke or TIA, peripheral arterial disease, with aspirin after ACS or stents | Bleeding, bruising, GI upset; rarely thrombotic thrombocytopenic purpura | Avoid omeprazole and esomeprazole; don't stop early after a stent without specialist advice; report bleeding (check the BNF)
K: Aspirin and P2Y12 inhibitors prevent arterial clots; protect the stomach in at-risk people and avoid omeprazole with clopidogrel.
!: Stopping clopidogrel early after a coronary stent because of minor bruising, which risks stent thrombosis.
Q: Why does ticagrelor cause breathlessness in some people? | It's a recognised adverse effect, thought to involve adenosine.
Q: Is aspirin recommended for primary prevention in most people? | No: bleeding risk outweighs benefit.
SUM: Antiplatelets prevent arterial thrombosis.
SUM: Manage bleeding risk with gastroprotection and interaction checks.
SRC: Joint Formulary Committee, British National Formulary: antiplatelet drugs | guidance | 2026 | https://bnf.nice.org.uk/
SRC: NICE NG128, Stroke and transient ischaemic attack in over 16s: diagnosis and initial management | guidance | 2019 | https://www.nice.org.uk/guidance/ng128
M1#pharmacy-u07-15-q1@2: Which antiplatelet is a prodrug activated partly by CYP2C19? | Clopidogrel | Aspirin | Ticagrelor | Dipyridamole | Prasugrel only after hydrolysis | Clopidogrel is a prodrug that needs hepatic activation, partly by CYP2C19.
M2#pharmacy-u07-15-q2@1: Which side effect is characteristic of ticagrelor? | Breathlessness | Hair loss | Weight gain | Cough from ACE inhibition | Ankle swelling | Dyspnoea is a recognised effect of ticagrelor.
M2#pharmacy-u07-15-q3@2: Why isn't aspirin recommended for primary prevention in most people? | Bleeding risk outweighs benefit | It doesn't affect platelets | It raises cholesterol | It causes heart attacks | It interacts with all foods | For people without vascular disease, harms tend to exceed benefits.

## Stroke and transient ischaemic attack
S: Stroke is a medical emergency: rapid recognition and treatment limit brain damage. After a stroke or TIA, secondary prevention greatly lowers the risk of another.
O: Recognise stroke and TIA and describe emergency management
O: Describe secondary prevention after ischaemic stroke and TIA
T: FAST | Face, Arms, Speech, Time to call 999: a tool to recognise stroke
T: Transient ischaemic attack (TIA) | Stroke-like symptoms that resolve within 24 hours, signalling high stroke risk
H: Emergency care (NICE NG128)
- Use FAST and call 999. Suspected stroke needs immediate brain imaging to separate ischaemic stroke from haemorrhage.
- Ischaemic stroke: thrombolysis within 4.5 hours of onset and thrombectomy for selected people.
- Suspected TIA: aspirin straight away (unless contraindicated) and specialist assessment within 24 hours.
H: Secondary prevention
- Clopidogrel long term after ischaemic stroke (aspirin with modified-release dipyridamole if clopidogrel isn't tolerated); short-term dual antiplatelets after minor stroke or TIA in some people.
- Anticoagulation for AF-related stroke, with timing decided by the stroke team.
- High-intensity statin, blood pressure control, lifestyle change.
- Driving restrictions apply (DVLA).
- Pharmacists support stroke survivors with swallowing difficulties (alternative formulations) and with adherence to several new medicines.
K: Recognise stroke with FAST and call 999; after ischaemic stroke, long-term clopidogrel (or anticoagulation for AF), a statin and blood pressure control.
!: Advising someone with sudden facial droop and arm weakness to wait and see if it passes.
Q: What does FAST stand for? | Face, Arms, Speech, Time to call 999.
Q: What is first-choice long-term antiplatelet after ischaemic stroke? | Clopidogrel.
SUM: Stroke is an emergency; time to treatment matters.
SUM: Secondary prevention includes antiplatelets or anticoagulants, statins and BP control.
SRC: NICE NG128, Stroke and transient ischaemic attack in over 16s | guidance | 2019 | https://www.nice.org.uk/guidance/ng128
SRC: Intercollegiate Stroke Working Party, National clinical guideline for stroke for the UK and Ireland | guidance | 2023 | https://www.strokeguideline.org/
M1#pharmacy-u07-16-q1@1: What does the "T" in FAST stand for? | Time to call 999 | Temperature | Tablets | Tiredness | Tingling | Time: call 999 at once, because the speed of treatment decides how much brain can be saved.
M2#pharmacy-u07-16-q2@2: What's the usual long-term antiplatelet after an ischaemic stroke? | Clopidogrel | Ticagrelor | Prasugrel | No antiplatelet | Aspirin plus warfarin | NICE NG128 recommends clopidogrel first for long-term prevention after ischaemic stroke.
M2#pharmacy-u07-16-q3@1: How soon should someone with a suspected TIA be assessed by a specialist? | Within 24 hours | Within 4 weeks | Within 3 months | Only if it recurs | At their next GP review | NICE NG128 recommends specialist assessment within 24 hours.

## Peripheral arterial disease
S: Peripheral arterial disease (PAD) narrows the arteries to the legs, causing pain on walking and, in severe cases, threatening the limb. It also signals high risk of heart attack and stroke.
O: Describe the management of peripheral arterial disease
O: Recognise critical limb-threatening ischaemia
T: Intermittent claudication | Cramping leg pain on walking, relieved by rest, caused by PAD
T: Chronic limb-threatening ischaemia | Severe PAD with rest pain, ulcers or gangrene, needing urgent referral
H: Management (NICE CG147)
- Cardiovascular risk reduction for all: stop smoking (the most important step), clopidogrel (antiplatelet of choice), a high-intensity statin, blood pressure and diabetes control.
- Supervised exercise programmes for claudication.
- Naftidrofuryl may be considered if exercise hasn't helped and the person doesn't want revascularisation; review after 3 to 6 months.
- Revascularisation for selected people.
H: Red flags and foot care
- Rest pain, ulcers, gangrene or a cold, pale, painful leg need urgent vascular referral (an acutely ischaemic limb is an emergency).
- Foot care and checking for injuries, especially in people with diabetes.
- Beta-blockers aren't contraindicated in PAD and can be used when another condition needs them.
- Pharmacists can support stopping smoking and check that secondary prevention medicines are prescribed and taken.
K: PAD signals high cardiovascular risk: stop smoking, clopidogrel, statin and exercise; refer urgently for rest pain, ulcers or gangrene.
!: Treating new rest pain in a smoker with PAD as simple cramp.
Q: What is the most important lifestyle change in PAD? | Stopping smoking.
Q: Which antiplatelet is preferred in PAD? | Clopidogrel.
SUM: PAD needs full cardiovascular risk reduction.
SUM: Rest pain, ulcers or gangrene need urgent referral.
SRC: NICE CG147, Peripheral arterial disease: diagnosis and management | guidance | 2020 | https://www.nice.org.uk/guidance/cg147
SRC: Joint Formulary Committee, British National Formulary: naftidrofuryl | guidance | 2026 | https://bnf.nice.org.uk/
M1#pharmacy-u07-17-q1@1: What is intermittent claudication? | Leg pain on walking, relieved by rest | Pain only at night in bed | Chest pain on exertion | Numbness from diabetes | Muscle cramps after statins | It reflects reduced blood flow to the leg muscles during exercise.
M2#pharmacy-u07-17-q2@2: A person with PAD develops pain at rest and a toe ulcer. What's needed? | Urgent vascular referral | A stronger analgesic only | Exercise programme | Routine review in 6 months | Topical antibiotic only | These suggest chronic limb-threatening ischaemia.
M2#pharmacy-u07-17-q3@1: Which intervention has most impact on PAD progression? | Stopping smoking | Taking vitamin E | Wearing compression stockings | Avoiding walking | Taking aspirin and warfarin together | Smoking cessation is the key modifiable factor.

## Cardiovascular adverse drug reactions
S: Many drugs affect the heart and circulation: slowing the heart, prolonging the QT interval, causing fluid retention or raising potassium. Pharmacists spot these risks when checking prescriptions and combinations.
O: Identify common cardiovascular adverse drug reactions
O: Recognise high-risk combinations affecting the heart
T: QT prolongation | Lengthening of the QT interval on the ECG, increasing the risk of torsades de pointes
T: Hyperkalaemia | A raised blood potassium level, which can cause dangerous arrhythmias
H: Common reactions
- **Bradycardia and heart block**: beta-blockers with verapamil or diltiazem; digoxin; donepezil.
- **QT prolongation**: some antipsychotics, macrolides, quinolones, citalopram and escitalopram, methadone, ondansetron at higher doses, amiodarone; worse with low potassium or magnesium.
- **Hyperkalaemia**: ACE inhibitors, ARBs, MRAs, potassium supplements, trimethoprim, especially with renal impairment.
- **Fluid retention and heart failure**: NSAIDs, pioglitazone, some CCBs.
- **Postural hypotension and falls**: alpha-blockers, nitrates, diuretics, antihypertensive combinations in older people.
H: Acting on risks
- Check combinations with the BNF, and ECGs and electrolytes where the guidance advises.
- Review older people on several blood pressure-lowering drugs for dizziness and falls.
- Report serious suspected reactions through the Yellow Card scheme.
K: Watch for bradycardia, QT prolongation, hyperkalaemia, fluid retention and postural hypotension, especially with combinations and renal impairment.
!: Missing hyperkalaemia risk when trimethoprim is added for someone on spironolactone and an ACE inhibitor.
Q: Name three drugs that prolong the QT interval. | For example citalopram, clarithromycin and methadone.
Q: Which combination raises potassium dangerously? | For example an ACE inhibitor with spironolactone and trimethoprim.
SUM: Many drugs cause cardiovascular adverse effects.
SUM: Combinations and renal impairment increase the risk.
SRC: Joint Formulary Committee, British National Formulary: interactions | guidance | 2026 | https://bnf.nice.org.uk/interactions/
SRC: CredibleMeds, QTdrugs list | secondary | 2026 | https://crediblemeds.org/
M2#pharmacy-u07-18-q1@1: Which combination risks severe bradycardia? | Bisoprolol with verapamil | Ramipril with amlodipine | Atorvastatin with ezetimibe | Aspirin with lansoprazole | Furosemide with paracetamol | Beta-blockers and verapamil both slow heart rate and AV conduction, risking heart block.
M2#pharmacy-u07-18-q2@2: Which drug group can worsen heart failure through fluid retention? | NSAIDs | Statins | Proton pump inhibitors | Inhaled corticosteroids | Laxatives | NSAIDs cause sodium and water retention and reduce diuretic effect, worsening heart failure.
M3#pharmacy-u07-18-q3@1: Which factor increases the risk from QT-prolonging drugs? | Low potassium | High vitamin D | Low cholesterol | High HDL | Low blood glucose only | Hypokalaemia and hypomagnesaemia increase torsades risk.
`;
