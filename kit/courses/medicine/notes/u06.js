// MedGradify Renal, Endocrine and Metabolic Medicine (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## Renal physiology and glomerular filtration
LV: Preclinical · Foundation
S: The kidneys filter the blood, regulate fluids and electrolytes, and produce hormones. This lesson covers the nephron, glomerular filtration rate and its measurement, and the kidney's endocrine roles.
O: Describe the structure and functions of the nephron
O: Explain glomerular filtration rate and how it is estimated
O: Describe the endocrine functions of the kidney
PRE: Cell structure and function
H: The nephron
- **Glomerulus**: capillaries filter plasma into Bowman's capsule; cells and large proteins stay in the blood.
- **Proximal tubule**: reabsorbs most sodium, water, glucose and amino acids.
- **Loop of Henle**: creates the concentration gradient for concentrating urine.
- **Distal tubule and collecting duct**: fine-tune sodium, potassium, acid and water, under aldosterone and antidiuretic hormone.
H: Glomerular filtration rate
P: The kidneys receive about 20–25% of cardiac output. In a healthy young adult, **GFR** is about 125 mL/min, around 180 litres of filtrate a day, of which over 99% is reabsorbed.
E: Clearance = U × V ÷ P :: U urine concentration, V urine flow rate, P plasma concentration
X: Estimating GFR from creatinine clearance.
> Urine creatinine is 8 mmol/L; urine flow is 1.25 mL/min; plasma creatinine is 0.08 mmol/L (80 µmol/L).
> Clearance = 8 × 1.25 ÷ 0.08 = 125 mL/min.
> In practice, laboratories report an **estimated GFR (eGFR)** from serum creatinine, age and sex using the CKD-EPI equation.
> eGFR is less reliable at extremes of muscle mass, such as in amputees or bodybuilders.
H: Endocrine roles
- **Renin**: released when renal perfusion falls, activating the renin–angiotensin–aldosterone system.
- **Erythropoietin**: stimulates red cell production; deficiency causes anaemia in chronic kidney disease.
- **Activated vitamin D** (calcitriol): formed in the kidney, supporting calcium absorption.
K: Nephrons filter plasma at the glomerulus and adjust the filtrate along the tubule; GFR is about 125 mL/min and is estimated from creatinine; the kidneys also produce renin, erythropoietin and active vitamin D.
!: Treating a normal serum creatinine as proof of normal kidney function. Creatinine depends on muscle mass and rises only after substantial loss of GFR.
EV: established | The CKD-EPI equation is recommended in the UK for estimating GFR from creatinine.
EV: established | Creatinine-based eGFR is less accurate at extremes of muscle mass and in acute kidney injury.
T: Glomerular filtration rate | The volume of plasma filtered by the glomeruli per minute
T: Nephron | The functional unit of the kidney
T: Erythropoietin | A kidney hormone that stimulates red blood cell production
SUM: The nephron filters and adjusts plasma.
SUM: GFR is about 125 mL/min, estimated from creatinine.
SUM: The kidney makes renin, EPO and active vitamin D.
SRC: NICE, Chronic kidney disease: assessment and management (NG203) | guidance | 2021 | https://www.nice.org.uk/guidance/ng203
SRC: Levey A. S. et al., "A new equation to estimate glomerular filtration rate", Annals of Internal Medicine 150(9), 604–612 | primary | 2009
Q: What is a typical GFR in a healthy young adult? | About 125 mL/min.
Q: Name two hormones produced by the kidney. | Two of: renin, erythropoietin and activated vitamin D (calcitriol).
M1#medicine-u06-01-q1@1: Where is most filtered sodium and glucose reabsorbed? | The proximal tubule | The collecting duct | The glomerulus | The bladder | The proximal tubule reabsorbs the bulk of filtered solutes.
M2#medicine-u06-01-q2@2: Why do patients with chronic kidney disease often become anaemic? | Reduced erythropoietin production | Excess renin release | Increased vitamin D activation | Loss of red cells in the filtrate | Damaged kidneys make less erythropoietin.
M3#medicine-u06-01-q3@3: A very muscular athlete has a slightly raised creatinine but normal urine tests. Why should eGFR be interpreted cautiously? | High muscle mass raises creatinine, so eGFR may underestimate true GFR | Muscle mass has no effect at all on creatinine levels | eGFR is always exact, whatever a person's build | Creatinine is not produced by skeletal muscle | Creatinine reflects muscle mass as well as filtration.
NUM2#medicine-u06-01-q4@2: Urine creatinine is 8 mmol/L, urine flow 1.25 mL/min and plasma creatinine 0.08 mmol/L. What is the creatinine clearance, in mL/min? | 125 | 1% | mL/min | Clearance = U × V ÷ P = 8 × 1.25 ÷ 0.08 = 125 mL/min.
SA2#medicine-u06-01-q5@2,3: Explain why serum creatinine is an imperfect marker of kidney function. | Creatinine comes from muscle, so levels depend on muscle mass, age and sex as well as filtration. It rises significantly only after a large fall in GFR, so early disease may be missed. In acute kidney injury, creatinine lags behind the actual fall in GFR. eGFR equations adjust for some factors but remain less accurate at extremes. | Muscle dependence ; Late rise ; Lag in AKI ; eGFR limitations

## Acute kidney injury
LV: Clinical · Application
S: Acute kidney injury (AKI) is a sudden fall in kidney function, common in hospital and often preventable. This lesson covers its definition and staging, causes, assessment and management under NICE NG148.
O: Define and stage acute kidney injury
O: Classify causes as pre-renal, intrinsic renal or post-renal
O: Outline the assessment and initial management of AKI
PRE: Renal physiology and glomerular filtration
H: Definition and staging
P: The KDIGO criteria, used in NICE NG148, define AKI as a rise in serum creatinine of **26 µmol/L or more within 48 hours**, a **50% or greater rise** within 7 days, or urine output below 0.5 mL/kg/hour for more than 6 hours.
- **Stage 1**: creatinine 1.5–1.9 times baseline.
- **Stage 2**: 2.0–2.9 times baseline.
- **Stage 3**: 3 times baseline or more, or creatinine of 354 µmol/L or more, or starting renal replacement therapy.
H: Causes
- **Pre-renal**: reduced perfusion, such as dehydration, sepsis, bleeding or heart failure.
- **Intrinsic renal**: damage to the kidney itself, such as acute tubular necrosis, glomerulonephritis or nephrotoxic drugs.
- **Post-renal**: obstruction to urine flow, such as an enlarged prostate or bilateral ureteric stones.
X: Recognising and managing AKI.
> An 80-year-old with diarrhoea and vomiting has a creatinine of 210 µmol/L; her baseline was 90.
> 210 ÷ 90 = 2.3 times baseline: AKI stage 2.
> Assess fluid status, check for sepsis, review medicines (such as ACE inhibitors, diuretics and NSAIDs) and examine for a palpable bladder.
> Give fluids according to her volume status, monitor urine output, and do a urinary tract ultrasound within 24 hours if obstruction is suspected, as NICE NG148 advises.
H: Escalation
P: Seek urgent senior and renal advice for complications such as **severe hyperkalaemia**, **pulmonary oedema**, **severe acidosis** or **uraemic** symptoms, which may need renal replacement therapy.
K: AKI is a rapid fall in kidney function defined by creatinine rise or low urine output, staged 1–3; causes are pre-renal, intrinsic or post-renal; management treats the cause, optimises fluids, stops nephrotoxic drugs and escalates complications.
!: Continuing nephrotoxic medicines during AKI. NSAIDs, ACE inhibitors, diuretics and some others should be reviewed and often paused.
EV: established | KDIGO criteria are the international standard for defining and staging AKI.
EV: established | AKI is associated with higher mortality and later chronic kidney disease.
T: Acute kidney injury | A rapid reduction in kidney function over hours to days
T: Pre-renal AKI | AKI caused by reduced blood flow to the kidneys
T: Renal replacement therapy | Dialysis or filtration to replace kidney function
SUM: AKI: creatinine rise or low urine output.
SUM: Pre-renal, intrinsic and post-renal causes.
SUM: Treat cause, fluids, stop nephrotoxins, escalate.
SRC: NICE, Acute kidney injury: prevention, detection and management (NG148) | guidance | 2019 | https://www.nice.org.uk/guidance/ng148
SRC: KDIGO, KDIGO Clinical Practice Guideline for Acute Kidney Injury, Kidney International Supplements 2(1), 1–138 | guidance | 2012
Q: What creatinine rise within 48 hours defines AKI? | A rise of 26 µmol/L or more.
Q: Give an example of a post-renal cause of AKI. | Urinary obstruction, such as an enlarged prostate.
M1#medicine-u06-02-q1@1: Which is a pre-renal cause of AKI? | Severe dehydration | Bladder outlet obstruction | Glomerulonephritis | Bilateral ureteric stones | Applying the standard result: Reduced perfusion causes pre-renal AKI.
M2#medicine-u06-02-q2@2: Baseline creatinine is 80 µmol/L and current creatinine 250 µmol/L. What AKI stage is this? | Stage 3 | Stage 1 | Stage 2 | No AKI | Applying the standard result: 250 ÷ 80 = 3.1 times baseline.
M3#medicine-u06-02-q3@3: A man with AKI has a palpable, distended bladder. What is the most important immediate step? | Relieve the obstruction, for example with a urinary catheter | Give large volumes of intravenous fluid and nothing else | Start an NSAID to relieve his discomfort | Wait for kidney function to recover without intervention | Applying the standard result: Post-renal obstruction must be relieved.
NUM2#medicine-u06-02-q4@2: A patient's baseline creatinine is 90 µmol/L and current creatinine is 210 µmol/L. How many times the baseline is this, to one decimal place? | 2.3 | 0.05 | ratio | 210 ÷ 90 = 2.3 times baseline, which is AKI stage 2.
SA2#medicine-u06-02-q5@2,3: Outline the initial assessment of a patient with suspected AKI. | Confirm AKI by comparing creatinine with baseline and checking urine output. Assess fluid status and look for sepsis or bleeding. Review medicines and stop or adjust nephrotoxic drugs. Dipstick the urine for blood and protein suggesting intrinsic disease, and check for obstruction by examination and urinary tract ultrasound if indicated. Check potassium and acid–base status, and escalate complications urgently. | Confirm and stage ; Fluid status and sepsis ; Medicines ; Urine and imaging ; Complications

## Chronic kidney disease
LV: Clinical · Application
S: Chronic kidney disease (CKD) is common, often silent, and increases cardiovascular risk. This lesson covers its classification by GFR and albuminuria, causes, monitoring and management under NICE NG203.
O: Classify CKD using eGFR and albumin-to-creatinine ratio categories
O: Identify the main causes and complications of CKD
O: Outline the management of CKD to slow progression and reduce cardiovascular risk
PRE: Acute kidney injury
H: Definition and classification
P: CKD is abnormal kidney structure or function present for **more than 3 months**. It is classified by **GFR category** and **albuminuria category**:
- **G1** ≥90, **G2** 60–89, **G3a** 45–59, **G3b** 30–44, **G4** 15–29, **G5** <15 mL/min/1.73 m².
- **A1** ACR <3, **A2** 3–30, **A3** >30 mg/mmol.
P: Higher categories in either dimension mean greater risk of progression and cardiovascular disease.
H: Causes and complications
- **Causes**: diabetes, hypertension, glomerulonephritis, polycystic kidney disease, obstruction.
- **Complications**: anaemia, bone mineral disorder, acidosis, hyperkalaemia, fluid overload and much higher cardiovascular risk.
H: Management
- Control **blood pressure**; use an **ACE inhibitor or ARB** for people with albuminuria.
- **SGLT2 inhibitors** for many people with CKD, especially with type 2 diabetes or albuminuria, as NICE recommends.
- **Statin** for cardiovascular protection.
- Review medicines for dose adjustment and avoid nephrotoxins.
- Refer to a nephrologist for eGFR below 30, ACR of 70 mg/mmol or more, rapid decline or a 5-year kidney failure risk above 5%.
X: Classifying a patient.
> A 62-year-old with type 2 diabetes has eGFR 52 and ACR 40 mg/mmol on two occasions over 4 months.
> This is CKD G3a A3.
> The high albuminuria increases risk of progression.
> Management: blood pressure control with an ACE inhibitor, an SGLT2 inhibitor, a statin and good diabetes care, with monitoring.
K: CKD is kidney damage for over 3 months, classified by eGFR (G1–G5) and ACR (A1–A3); diabetes and hypertension are the main causes; management slows progression and cuts cardiovascular risk with blood pressure control, ACE inhibitors or ARBs, SGLT2 inhibitors and statins.
!: Classifying CKD on eGFR alone. Albuminuria is a powerful predictor of risk and must be measured.
EV: established | SGLT2 inhibitors slow CKD progression in many patients, with or without diabetes.
EV: established | CKD substantially increases cardiovascular risk.
T: Chronic kidney disease | Abnormal kidney structure or function lasting more than 3 months
T: Albumin-to-creatinine ratio | A urine test measuring albuminuria
T: Kidney failure risk equation | A tool estimating the risk of kidney failure over 2 and 5 years
SUM: Classify by G and A categories.
SUM: Diabetes and hypertension dominate causes.
SUM: Protect kidneys and the heart.
SRC: NICE, Chronic kidney disease: assessment and management (NG203) | guidance | 2021 | https://www.nice.org.uk/guidance/ng203
SRC: KDIGO, KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease, Kidney International 105(4S), S117–S314 | guidance | 2024
Q: For how long must kidney abnormalities be present to diagnose CKD? | More than 3 months.
Q: What ACR category is 3–30 mg/mmol? | A2.
M1#medicine-u06-03-q1@1: What eGFR range defines CKD category G3b? | 30–44 mL/min/1.73 m² | 45–59 mL/min/1.73 m² | 15–29 mL/min/1.73 m² | 60–89 mL/min/1.73 m² | Applying the standard result: G3b is 30–44.
M2#medicine-u06-03-q2@2: What is the leading cause of CKD in the UK? | Diabetes | Polycystic kidney disease | Kidney stones | Urinary tract infection | Diabetic kidney disease is the commonest cause.
M3#medicine-u06-03-q3@3: A patient has eGFR 70 and ACR 45 mg/mmol for 6 months. Why is this significant? | Severe albuminuria (A3) indicates high risk even with near-normal eGFR | eGFR above 60 means there is no CKD | ACR is irrelevant to risk | It requires immediate dialysis | Albuminuria is a strong predictor of progression and cardiovascular risk.
MATCH1#medicine-u06-03-q4@1: Match each eGFR to its CKD category. | 95 = G1 ; 50 = G3a ; 35 = G3b ; 10 = G5 | Categories are set by eGFR thresholds.
SA2#medicine-u06-03-q5@2,3: Explain why people with CKD are at high cardiovascular risk and how this is managed. | CKD is linked with hypertension, diabetes, dyslipidaemia, vascular calcification, inflammation and anaemia, all of which increase cardiovascular disease, which is a commoner cause of death than kidney failure in CKD. Management includes blood pressure control, ACE inhibitors or ARBs for albuminuria, SGLT2 inhibitors, statins, smoking cessation and good diabetes control. | Risk factors ; Main cause of death ; Pharmacological measures ; Lifestyle

## Glomerulonephritis and nephrotic syndrome
LV: Clinical · Application
S: Glomerular diseases damage the kidney's filters and present with nephrotic or nephritic patterns. This lesson distinguishes the two, outlines key causes, and identifies when urgent referral is needed.
O: Distinguish nephrotic from nephritic syndrome
O: Identify the main causes of glomerular disease in children and adults
O: Recognise features that require urgent specialist referral
PRE: Chronic kidney disease
H: Nephrotic syndrome
- Heavy **proteinuria** (over 3 g per 24 hours, or urine protein-to-creatinine ratio over 300 mg/mmol).
- **Hypoalbuminaemia**.
- **Oedema**.
- Often **hyperlipidaemia**; increased risk of **thrombosis** and **infection**.
P: Causes: **minimal change disease** (the commonest cause in children), **membranous nephropathy**, **focal segmental glomerulosclerosis**, and **diabetic kidney disease** and amyloidosis in adults.
H: Nephritic syndrome
- **Haematuria** (often with red cell casts).
- **Hypertension**, **oliguria** and rising creatinine.
- Some proteinuria, usually less than nephrotic range.
P: Causes: **IgA nephropathy** (the commonest glomerulonephritis worldwide, often with haematuria after a sore throat), **post-infectious** glomerulonephritis, **ANCA-associated vasculitis** and **anti-GBM disease**.
X: Recognising an emergency.
> A 60-year-old has two weeks of fatigue, haemoptysis, blood and protein on urine dipstick, and creatinine rising daily.
> This suggests a rapidly progressive glomerulonephritis, possibly ANCA vasculitis or anti-GBM disease.
> Send ANCA and anti-GBM antibodies and refer urgently to the renal team the same day.
> Early immunosuppression can save kidney function and life.
H: Investigation
P: Urine dipstick and microscopy, urine protein or albumin quantification, blood tests (creatinine, albumin, immunology) and kidney ultrasound; **kidney biopsy** usually confirms the diagnosis in adults.
K: Nephrotic syndrome is heavy proteinuria, low albumin and oedema; nephritic syndrome is haematuria, hypertension and declining function; rapidly progressive glomerulonephritis is an emergency needing same-day renal referral.
!: Treating haematuria and proteinuria with a rising creatinine as a simple UTI. These features may signal glomerulonephritis needing urgent assessment.
EV: established | Minimal change disease is the commonest cause of nephrotic syndrome in children.
EV: established | IgA nephropathy is the commonest primary glomerulonephritis worldwide.
T: Nephrotic syndrome | Heavy proteinuria with hypoalbuminaemia and oedema
T: Nephritic syndrome | Haematuria, hypertension and reduced kidney function from glomerular inflammation
T: Rapidly progressive glomerulonephritis | Glomerular disease causing loss of kidney function over days to weeks
SUM: Nephrotic: protein, low albumin, oedema.
SUM: Nephritic: blood, hypertension, falling function.
SUM: RPGN needs same-day referral.
SRC: KDIGO, KDIGO 2021 Clinical Practice Guideline for the Management of Glomerular Diseases, Kidney International 100(4S), S1–S276 | guidance | 2021
SRC: UK Kidney Association, Clinical practice guidelines | guidance | 2023
Q: What are the three core features of nephrotic syndrome? | Heavy proteinuria, hypoalbuminaemia and oedema.
Q: What is the commonest cause of nephrotic syndrome in children? | Minimal change disease.
M1#medicine-u06-04-q1@1: Which feature is typical of nephritic rather than nephrotic syndrome? | Haematuria with hypertension | Massive proteinuria with oedema | Hyperlipidaemia | Very low serum albumin | Nephritic syndrome reflects glomerular inflammation with bleeding.
M2#medicine-u06-04-q2@2: A young man has visible haematuria a day after a sore throat. What is the likely diagnosis? | IgA nephropathy | Minimal change disease | Membranous nephropathy | Diabetic kidney disease | Synpharyngitic haematuria is typical of IgA nephropathy.
M3#medicine-u06-04-q3@3: Why are patients with nephrotic syndrome at risk of thrombosis? | Loss of anticoagulant proteins in urine and increased clotting factors | Their platelet counts are usually very low | Their serum albumin is abnormally high | They have an excess of vitamin K in the blood | Urinary loss of proteins such as antithrombin raises clotting risk.
TF1#medicine-u06-04-q4@2: A patient with haemoptysis, haematuria and rapidly rising creatinine needs same-day renal referral. | true | This suggests a pulmonary–renal syndrome such as ANCA vasculitis or anti-GBM disease.
SA2#medicine-u06-04-q5@2,3: Compare the presentation of nephrotic and nephritic syndromes. | Nephrotic syndrome results from leaky glomeruli: heavy proteinuria, low albumin and oedema, often with high cholesterol and a risk of thrombosis and infection; kidney function may be normal at first. Nephritic syndrome results from glomerular inflammation: haematuria with casts, hypertension, oliguria and rising creatinine, with less proteinuria. Some diseases show mixed features. | Nephrotic features ; Nephrotic complications ; Nephritic features ; Overlap

## Urinary tract infection
LV: Clinical · Application
S: Urinary tract infections are among the most common bacterial infections. This lesson covers lower UTI, pyelonephritis and catheter-associated infection, diagnosis in different groups, and antimicrobial stewardship under NICE guidance.
O: Recognise lower UTI and pyelonephritis
O: Apply appropriate diagnostic approaches for different patient groups
O: Explain principles of antimicrobial stewardship and escalation for UTI
PRE: Renal physiology and glomerular filtration
H: Lower UTI and pyelonephritis
- **Lower UTI (cystitis)**: dysuria, frequency, urgency, suprapubic pain, new nocturia, cloudy urine.
- **Pyelonephritis**: fever, rigors, loin pain, nausea and vomiting, sometimes with lower urinary symptoms.
P: *Escherichia coli* causes most community-acquired UTIs.
H: Diagnosis by group
- **Women under 65**: UKHSA guidance uses symptoms; with two or more key symptoms (dysuria, new nocturia, cloudy urine) and no other cause, UTI is likely; dipsticks may help when symptoms are less clear.
- **Over 65s**: do **not** use urine dipsticks, as asymptomatic bacteriuria is common; diagnose on clinical signs and symptoms.
- **Men, pregnant women and catheterised patients**: send a urine culture.
H: Treatment and stewardship
P: NICE NG109 recommends considering a back-up (delayed) antibiotic prescription or immediate antibiotics depending on severity, with self-care advice. **Asymptomatic bacteriuria** should not usually be treated except in pregnancy. Choose antibiotics according to local guidelines and culture results to limit resistance.
X: Recognising urosepsis.
> A 78-year-old care home resident becomes confused with a temperature of 38.6 °C, heart rate 118 and low blood pressure.
> She has new loin pain; a urine dipstick is not used to diagnose UTI in her age group.
> Her observations meet sepsis criteria: this needs urgent escalation, such as calling 999 or the hospital sepsis pathway.
> She needs blood cultures, intravenous antibiotics according to local guidance and fluids promptly.
K: Lower UTI causes urinary symptoms and pyelonephritis adds fever and loin pain; diagnostic approaches differ by age and group, with no dipsticks in over 65s; treatment follows NICE stewardship guidance, and signs of sepsis need urgent escalation.
!: Diagnosing UTI in older people from a positive urine dipstick alone. Asymptomatic bacteriuria is common, and confusion may have another cause.
EV: established | Urine dipsticks should not be used to diagnose UTI in people over 65.
EV: established | Treating asymptomatic bacteriuria in non-pregnant adults does not improve outcomes and drives resistance.
T: Pyelonephritis | Infection of the kidney, causing fever and loin pain
T: Asymptomatic bacteriuria | Bacteria in the urine without symptoms of infection
T: Antimicrobial stewardship | Using antimicrobials in ways that preserve their effectiveness
SUM: Lower UTI versus pyelonephritis.
SUM: Diagnose differently by age and group.
SUM: Use antibiotics wisely; escalate sepsis.
SRC: NICE, Urinary tract infection (lower): antimicrobial prescribing (NG109) | guidance | 2018 | https://www.nice.org.uk/guidance/ng109
SRC: UK Health Security Agency, Urinary tract infection: diagnostic tools for primary care | guidance | 2020
Q: Which organism causes most community-acquired UTIs? | Escherichia coli.
Q: Should urine dipsticks be used to diagnose UTI in people over 65? | No; asymptomatic bacteriuria is common, so diagnosis is based on clinical features.
M1#medicine-u06-05-q1@1: Which symptom suggests pyelonephritis rather than lower UTI? | Loin pain with fever | Dysuria alone | Cloudy urine alone | Urinary frequency alone | Upper tract infection causes systemic and loin symptoms.
M2#medicine-u06-05-q2@2: When should asymptomatic bacteriuria be treated? | In pregnancy | In all older adults | In every catheterised patient | Whenever a dipstick is positive | Pregnancy is the main exception, because of the risk of complications.
M3#medicine-u06-05-q3@3: An older resident is confused but has no urinary symptoms or fever; a dipstick shows nitrites. What is the appropriate approach? | Look for other causes of confusion rather than diagnosing UTI from the dipstick | Start antibiotics immediately on the dipstick result | Ignore the confusion | Catheterise to obtain urine for every resident | Positive dipsticks are common without infection in older people.
TF1#medicine-u06-05-q4@1: Escherichia coli is the commonest cause of community-acquired UTI. | true | It accounts for the majority of uncomplicated UTIs.
SA2#medicine-u06-05-q5@2,3: Explain the principles of antimicrobial stewardship in managing UTI. | Diagnose carefully, avoiding treatment of asymptomatic bacteriuria except in pregnancy. Use back-up prescriptions where appropriate for mild symptoms, with self-care advice. Follow local guidelines for the choice and duration of antibiotics, send cultures where indicated and adjust treatment to results. These steps reduce unnecessary use and slow antimicrobial resistance while treating infection effectively. | Accurate diagnosis ; Back-up prescribing ; Guideline choice and duration ; Cultures and resistance

## Hyperkalaemia and hyponatraemia
LV: Clinical · Application
S: Potassium and sodium disorders are common and can be life-threatening. This lesson covers the causes, ECG changes and emergency management of hyperkalaemia, and the assessment and safe correction of hyponatraemia.
O: Recognise hyperkalaemia, its causes and ECG changes
O: Outline the emergency management principles for severe hyperkalaemia
O: Assess hyponatraemia and explain the risk of overly rapid correction
PRE: Acute kidney injury
H: Hyperkalaemia
- **Severity**: mild 5.5–5.9, moderate 6.0–6.4, **severe 6.5 mmol/L or above**.
- **Causes**: AKI and CKD, drugs (ACE inhibitors, ARBs, potassium-sparing diuretics), adrenal insufficiency, tissue breakdown; and **spurious** results from haemolysed samples.
- **ECG changes**: tall peaked T waves, flattened P waves, broad QRS complexes, and eventually a sine-wave pattern before cardiac arrest.
P: Severe hyperkalaemia or ECG changes are an emergency. Treatment follows the UK Kidney Association guideline: **intravenous calcium** to stabilise the heart, **insulin with glucose** and nebulised **salbutamol** to shift potassium into cells, then measures to remove potassium and treat the cause, with cardiac monitoring.
H: Hyponatraemia
P: Sodium below 135 mmol/L; **severe** below 125, or with severe symptoms such as seizures or reduced consciousness. Assess **volume status** and serum and urine osmolality. Causes include diuretics, SIADH, heart failure, cirrhosis, hypothyroidism, adrenal insufficiency and excess water intake.
E: Calculated serum osmolality ≈ 2 × Na + glucose + urea :: all in mmol/L
X: Assessing hyponatraemia.
> Sodium 125 mmol/L, glucose 5 mmol/L, urea 5 mmol/L.
> Calculated osmolality = 2 × 125 + 5 + 5 = 260 mOsm/kg, confirming hypotonic hyponatraemia.
> The patient is euvolaemic with inappropriately concentrated urine, suggesting SIADH.
> Correction must be gradual: European guidance limits the rise to 10 mmol/L in the first 24 hours to avoid osmotic demyelination.
K: Hyperkalaemia of 6.5 mmol/L or above or with ECG changes is an emergency treated with calcium, insulin–glucose and salbutamol under monitoring; hyponatraemia is assessed by volume status and osmolality and corrected slowly to prevent osmotic demyelination.
!: Correcting chronic hyponatraemia too quickly. Rapid rises in sodium can cause osmotic demyelination syndrome, with permanent neurological damage.
EV: established | Intravenous calcium protects the heart in hyperkalaemia but does not lower potassium.
EV: established | Overly rapid correction of chronic hyponatraemia risks osmotic demyelination.
T: Hyperkalaemia | Raised serum potassium, above 5.5 mmol/L
T: SIADH | Syndrome of inappropriate antidiuretic hormone secretion
T: Osmotic demyelination syndrome | Brain injury caused by overly rapid correction of chronic hyponatraemia
SUM: Severe hyperkalaemia is an emergency.
SUM: Assess hyponatraemia by volume and osmolality.
SUM: Correct sodium slowly.
SRC: UK Kidney Association, Clinical Practice Guidelines: Treatment of Acute Hyperkalaemia in Adults | guidance | 2023
SRC: Spasovski G. et al., "Clinical practice guideline on diagnosis and treatment of hyponatraemia", European Journal of Endocrinology 170(3), G1–G47 | guidance | 2014
Q: What potassium level defines severe hyperkalaemia? | 6.5 mmol/L or above.
Q: Why must chronic hyponatraemia be corrected slowly? | To avoid osmotic demyelination syndrome.
M1#medicine-u06-06-q1@1: Which ECG change is typical of hyperkalaemia? | Tall, peaked T waves | Prominent U waves | Prolonged QT from low calcium only | ST elevation in a single territory | Applying the standard result: Peaked T waves are an early sign.
M2#medicine-u06-06-q2@2: Why is intravenous calcium given in severe hyperkalaemia? | To stabilise the cardiac membrane and reduce arrhythmia risk | To lower serum potassium quickly | To remove potassium through the kidneys | To correct hyponatraemia at the same time | Calcium protects the heart while other treatments lower potassium.
M3#medicine-u06-06-q3@3: A potassium result of 7.1 mmol/L comes back from a sample taken with difficulty; the ECG is normal. What should be done? | Repeat urgently to exclude haemolysis while assessing the patient | Ignore it as spurious without repeating | Discharge the patient | Start dialysis immediately without assessment | Haemolysis can falsely raise potassium, but true hyperkalaemia must not be missed.
NUM2#medicine-u06-06-q4@2: Sodium is 125 mmol/L, glucose 5 mmol/L and urea 5 mmol/L. What is the calculated serum osmolality, in mOsm/kg? | 260 | 1 | mOsm/kg | Osmolality = 2 × 125 + 5 + 5 = 260 mOsm/kg.
SA2#medicine-u06-06-q5@2,3: Outline the emergency management of severe hyperkalaemia. | Assess the patient with ABCDE and attach a cardiac monitor; record a 12-lead ECG. Give intravenous calcium to stabilise the myocardium if there are ECG changes. Give insulin with glucose, and consider nebulised salbutamol, to shift potassium into cells, monitoring glucose. Then remove potassium with measures such as binders or dialysis, stop contributing drugs and treat the cause, escalating to renal and critical care teams as needed. | Monitoring and ECG ; Calcium ; Shifting potassium ; Removal and cause

## Type 1 diabetes
LV: Clinical · Application
S: Type 1 diabetes is an autoimmune condition in which the pancreas stops producing insulin. This lesson covers its presentation, diagnosis, insulin-based management, glucose monitoring technology and targets under NICE NG17.
O: Describe the cause and presentation of type 1 diabetes
O: Outline the principles of insulin therapy and glucose monitoring
O: State NICE targets and the role of structured education
PRE: Digestion and absorption
H: Cause and presentation
P: In **type 1 diabetes**, autoimmune destruction of pancreatic beta cells causes absolute insulin deficiency. It usually presents in children and young adults, though it can occur at any age. Classic symptoms are **thirst, polyuria, weight loss and fatigue**; some present in **diabetic ketoacidosis**. Suspected type 1 diabetes in a child should be referred to a specialist team the **same day**.
H: Diagnosis
P: Diagnosis is usually clinical, supported by high glucose and ketones. Autoantibodies (such as GAD and IA-2) and C-peptide can help distinguish type 1 from other types when unclear.
H: Management
- **Insulin**: usually a **basal–bolus** regimen (long-acting background insulin plus rapid-acting insulin with meals), or an insulin pump. Doses are individualised by the diabetes team.
- **Glucose monitoring**: NICE recommends offering **continuous glucose monitoring** (real-time or intermittently scanned) to adults with type 1 diabetes; **hybrid closed-loop** systems, which adjust insulin automatically, are recommended for many people.
- **Structured education**, such as DAFNE, teaches carbohydrate counting and insulin adjustment.
- **Target HbA1c**: 48 mmol/mol (6.5%) or lower, balanced against hypoglycaemia risk.
X: Living with type 1 diabetes.
> A 19-year-old student uses a sensor that shows glucose every few minutes on her phone.
> She counts carbohydrates and adjusts mealtime insulin using what she learnt on a DAFNE course.
> Her sensor alerts her to falling glucose before exercise.
> Her HbA1c is 51 mmol/mol; she works with her team on reducing it without increasing hypoglycaemia.
K: Type 1 diabetes is autoimmune insulin deficiency presenting with osmotic symptoms or DKA; it needs lifelong insulin, ideally with continuous glucose monitoring, structured education and an HbA1c target of 48 mmol/mol or lower.
!: Delaying referral of a child with suspected type 1 diabetes for further tests. Same-day referral prevents progression to DKA.
EV: established | Intensive glucose control in type 1 diabetes reduces microvascular complications, as shown in the DCCT.
EV: established | Continuous glucose monitoring improves glucose control and reduces hypoglycaemia for many people.
T: Basal–bolus regimen | Insulin therapy with long-acting background and rapid-acting mealtime insulin
T: Continuous glucose monitoring | A sensor measuring interstitial glucose continuously
T: Hybrid closed loop | A system linking a sensor and pump to adjust insulin automatically
SUM: Autoimmune insulin deficiency.
SUM: Insulin, CGM and education.
SUM: HbA1c target 48 mmol/mol or lower.
SRC: NICE, Type 1 diabetes in adults: diagnosis and management (NG17) | guidance | 2022 | https://www.nice.org.uk/guidance/ng17
SRC: Diabetes Control and Complications Trial Research Group, "The effect of intensive treatment of diabetes on the development and progression of long-term complications in insulin-dependent diabetes mellitus", New England Journal of Medicine 329(14), 977–986 | primary | 1993
Q: What causes type 1 diabetes? | Autoimmune destruction of pancreatic beta cells, causing absolute insulin deficiency.
Q: What HbA1c target does NICE recommend for adults with type 1 diabetes? | 48 mmol/mol (6.5%) or lower.
M1#medicine-u06-07-q1@1: Which are classic symptoms of new type 1 diabetes? | Thirst, polyuria and weight loss | Weight gain and constipation | Joint pain and rash | Chest pain and palpitations | Hyperglycaemia causes osmotic symptoms and catabolism.
M2#medicine-u06-07-q2@2: What does a basal–bolus insulin regimen involve? | Long-acting background insulin plus rapid-acting insulin with meals | Tablets taken before each meal | A single weekly injection | Insulin only when unwell | Applying the standard result: It mimics normal insulin secretion.
M3#medicine-u06-07-q3@3: A GP suspects type 1 diabetes in a 9-year-old with thirst and weight loss. What should happen? | Same-day referral to the paediatric diabetes team | Arrange a fasting glucose test next week | Start tablets and review in a month | Advise more fluids and wait | Applying the standard result: Children can rapidly develop DKA.
TF1#medicine-u06-07-q4@2: NICE recommends offering continuous glucose monitoring to adults with type 1 diabetes. | true | NG17 recommends real-time or intermittently scanned CGM.
SA2#medicine-u06-07-q5@2,3: Explain the role of structured education in type 1 diabetes. | Type 1 diabetes requires daily decisions about insulin, food and activity. Structured education, such as DAFNE, teaches people to count carbohydrates, adjust insulin, manage exercise, illness and hypoglycaemia, and interpret glucose data. This improves control, reduces hypoglycaemia and empowers self-management, which is central because people manage their condition themselves almost all the time. | Daily self-management ; Skills taught ; Outcomes ; Empowerment

## Type 2 diabetes
LV: Clinical · Application
S: Type 2 diabetes is the most common form of diabetes and is closely linked with obesity and insulin resistance. This lesson covers diagnosis, prevention, and management under NICE NG28, including remission through weight loss.
O: Describe the diagnosis of type 2 diabetes and non-diabetic hyperglycaemia
O: Outline lifestyle and drug management under NICE guidance
O: Explain the evidence for type 2 diabetes remission
PRE: Type 1 diabetes
H: Diagnosis
- **HbA1c 48 mmol/mol (6.5%) or above**.
- **Fasting plasma glucose 7.0 mmol/L or above**, or random glucose 11.1 mmol/L or above with symptoms.
- Without symptoms, confirm with a repeat test.
- **Non-diabetic hyperglycaemia** (prediabetes): HbA1c 42–47 mmol/mol; refer to the **NHS Diabetes Prevention Programme**.
H: Management
- **Lifestyle**: diet, physical activity, weight loss, stopping smoking.
- **Metformin** is usually first-line.
- **SGLT2 inhibitors** are recommended for people with, or at high risk of, cardiovascular disease, heart failure or CKD.
- Other drug classes, and eventually insulin, are added if needed, with individualised targets: often HbA1c 48 mmol/mol on lifestyle or one drug, or 53 mmol/mol if on a drug that can cause hypoglycaemia.
- **Cardiovascular risk**: blood pressure, statins.
H: Remission
P: The DiRECT trial (Lean et al., 2018) gave people with type 2 diabetes a low-calorie total diet replacement programme in primary care. At 12 months, 46% of the intervention group were in remission, and remission was strongly linked to the amount of weight lost. The NHS now offers a Type 2 Diabetes Path to Remission programme.
X: Diagnosing and managing a new case.
> A 54-year-old with a BMI of 33 has HbA1c results of 55 and 52 mmol/mol on two occasions.
> This confirms type 2 diabetes.
> He is offered structured education, metformin and support to lose weight, and his QRISK score is calculated.
> He is told that substantial weight loss could put his diabetes into remission.
K: Type 2 diabetes is diagnosed by HbA1c 48 mmol/mol or above or raised glucose; management combines lifestyle change, metformin, SGLT2 inhibitors for cardiorenal benefit and cardiovascular risk reduction; substantial weight loss can achieve remission.
!: Treating type 2 diabetes as only a glucose problem. Cardiovascular risk factors, kidney protection and weight are just as important.
EV: established | Substantial weight loss can put type 2 diabetes into remission in many people, especially early in the disease.
EV: established | SGLT2 inhibitors reduce heart failure and kidney outcomes in type 2 diabetes.
T: Insulin resistance | Reduced response of tissues to insulin
T: Non-diabetic hyperglycaemia | Raised blood glucose below the diabetes threshold, HbA1c 42–47 mmol/mol
T: Remission | HbA1c below 48 mmol/mol for at least 3 months off glucose-lowering drugs
SUM: Diagnose with HbA1c 48 mmol/mol or above.
SUM: Lifestyle, metformin, SGLT2 inhibitors.
SUM: Weight loss can bring remission.
SRC: NICE, Type 2 diabetes in adults: management (NG28) | guidance | 2022 | https://www.nice.org.uk/guidance/ng28
SRC: Lean M. E. J. et al., "Primary care-led weight management for remission of type 2 diabetes (DiRECT): an open-label, cluster-randomised trial", The Lancet 391(10120), 541–551 | primary | 2018
Q: What HbA1c level diagnoses type 2 diabetes? | 48 mmol/mol (6.5%) or above.
Q: What HbA1c range indicates non-diabetic hyperglycaemia? | 42–47 mmol/mol.
M1#medicine-u06-08-q1@1: Which drug is usually first-line in type 2 diabetes? | Metformin | Insulin | A sulfonylurea in all cases | A statin | Metformin is usually started first unless contraindicated.
M2#medicine-u06-08-q2@2: What proportion of DiRECT participants were in remission at 12 months? | 46% | 4% | 86% | 100% | Remission was closely linked to weight loss.
M3#medicine-u06-08-q3@3: A person with type 2 diabetes has heart failure. Which drug class does NICE particularly recommend? | An SGLT2 inhibitor | A thiazolidinedione | No additional drug | Only lifestyle change | SGLT2 inhibitors reduce heart failure hospitalisation.
MATCH1#medicine-u06-08-q4@1: Match each result to its interpretation. | HbA1c 40 mmol/mol = Normal ; HbA1c 45 mmol/mol = Non-diabetic hyperglycaemia ; HbA1c 50 mmol/mol = Diabetes range ; Fasting glucose 7.2 mmol/L = Diabetes range | Thresholds define each category.
SA2#medicine-u06-08-q5@2,3: Explain why weight loss can lead to remission of type 2 diabetes. | In type 2 diabetes, excess fat in the liver and pancreas contributes to insulin resistance and impaired beta-cell function. Substantial weight loss reduces this fat, improving insulin sensitivity and allowing beta cells to recover, so glucose can return to the non-diabetic range without medication. The DiRECT trial showed remission was more likely with greater weight loss and shorter duration of diabetes. | Ectopic fat ; Insulin resistance ; Beta-cell recovery ; Evidence

## Diabetic ketoacidosis and hyperosmolar hyperglycaemic state
LV: Clinical · Application
S: Diabetic ketoacidosis (DKA) and the hyperosmolar hyperglycaemic state (HHS) are life-threatening emergencies. This lesson covers their diagnosis and management principles according to the Joint British Diabetes Societies guidelines.
O: Diagnose DKA and HHS using JBDS criteria
O: Outline the principles of emergency management
O: Identify precipitating causes and prevention through sick-day rules
PRE: Type 1 diabetes
H: DKA
P: DKA results from severe insulin deficiency, causing high glucose, ketone production and acidosis. It mostly affects people with type 1 diabetes. **JBDS criteria**:
- Ketones **3.0 mmol/L or above** (or significant ketonuria).
- Glucose above 11.0 mmol/L or known diabetes.
- **Bicarbonate below 15 mmol/L and/or venous pH below 7.3**.
P: Symptoms include vomiting, abdominal pain, rapid deep breathing (Kussmaul), dehydration and drowsiness.
H: HHS
P: HHS occurs mainly in older people with type 2 diabetes. It features marked **hyperglycaemia** (often 30 mmol/L or above), **high osmolality** (320 mOsm/kg or above) and severe dehydration, **without significant ketosis or acidosis**. It develops over days and carries high mortality.
H: Management principles
- Assess with **ABCDE** and involve the diabetes and senior teams early.
- **Fluid replacement** is the priority.
- In DKA, a **fixed-rate intravenous insulin infusion** following local protocol.
- Close monitoring of **potassium**, glucose, ketones, pH and fluid balance.
- Treat the **precipitating cause**, such as infection, missed insulin or new diagnosis.
X: Recognising DKA.
> A 22-year-old with type 1 diabetes has vomited for a day and missed insulin doses.
> Capillary ketones 5.2 mmol/L, glucose 24 mmol/L, venous pH 7.15, bicarbonate 10 mmol/L.
> All three JBDS criteria are met: DKA.
> She needs emergency hospital treatment with fluids, insulin infusion and potassium monitoring.
H: Prevention
P: **Sick-day rules**: never stop insulin when unwell, check glucose and ketones more often, keep hydrated and seek urgent help if ketones are high or vomiting persists.
K: DKA is ketosis, high glucose and acidosis from insulin deficiency; HHS is severe hyperglycaemia and hyperosmolality without major ketosis; both need urgent fluids, monitoring and treatment of the cause, with insulin infusion in DKA.
!: Stopping insulin when unwell and not eating. Illness raises insulin needs, and stopping insulin can trigger DKA.
EV: established | JBDS guidelines set UK standards for managing DKA and HHS.
EV: established | Potassium shifts during insulin treatment of DKA can be dangerous without close monitoring.
T: Diabetic ketoacidosis | An emergency of ketosis, hyperglycaemia and acidosis due to insulin deficiency
T: Hyperosmolar hyperglycaemic state | An emergency of severe hyperglycaemia and dehydration without significant ketosis
T: Sick-day rules | Guidance on managing diabetes during illness
SUM: DKA: ketones, glucose, acidosis.
SUM: HHS: very high glucose and osmolality.
SUM: Fluids, monitoring and treat the cause.
SRC: Joint British Diabetes Societies Inpatient Care Group, The Management of Diabetic Ketoacidosis in Adults | guidance | 2023
SRC: Joint British Diabetes Societies Inpatient Care Group, The Management of the Hyperosmolar Hyperglycaemic State in Adults | guidance | 2022
Q: What are the JBDS diagnostic criteria for DKA? | Ketones 3.0 mmol/L or above, glucose above 11.0 mmol/L or known diabetes, and bicarbonate below 15 mmol/L and/or pH below 7.3.
Q: What is the first priority in managing DKA and HHS? | Fluid replacement.
M1#medicine-u06-09-q1@1: Which breathing pattern is typical of DKA? | Rapid, deep (Kussmaul) breathing | Slow, shallow breathing | Wheezing on expiration | Periodic apnoea | Deep breathing compensates for metabolic acidosis.
M2#medicine-u06-09-q2@2: How does HHS differ from DKA? | HHS has very high glucose and osmolality without significant ketosis | HHS always has much higher ketone levels than DKA | HHS occurs only in people with type 1 diabetes | HHS develops within minutes rather than days | HHS is driven by dehydration and hyperglycaemia.
M3#medicine-u06-09-q3@3: A man with type 1 diabetes stops his insulin because he is vomiting and not eating. What should he have been advised? | Never stop insulin when unwell; check ketones and seek urgent help | Stopping insulin is safe whenever you are not eating | Drink only sugary drinks and avoid checking glucose | Wait a week to see if symptoms settle before seeking help | Applying the standard result: Sick-day rules prevent DKA.
SEQ1#medicine-u06-09-q4@2: Order the initial management steps in DKA. | ABCDE assessment and senior involvement ; Intravenous fluids ; Fixed-rate insulin infusion ; Monitor potassium, glucose and ketones | Fluids come first, then insulin with close monitoring.
SA2#medicine-u06-09-q5@2,3: Explain why potassium must be closely monitored in DKA treatment. | In DKA, total body potassium is depleted, though blood levels may be normal or high because acidosis and insulin deficiency shift potassium out of cells. Insulin treatment drives potassium back into cells, so blood levels can fall rapidly, risking dangerous arrhythmias. Regular measurement and potassium replacement according to protocol are therefore essential. | Total depletion ; Shift out of cells ; Insulin shifts back ; Arrhythmia risk

## Hypoglycaemia
LV: Clinical · Application
S: Hypoglycaemia is the most common acute complication of diabetes treatment. This lesson covers its definition, symptoms, causes, treatment principles and prevention, including advice on driving.
O: Define and classify hypoglycaemia
O: Recognise symptoms and outline treatment principles
O: Explain causes, prevention and driving advice
PRE: Type 1 diabetes
H: Definition
- **Level 1**: glucose below 4.0 mmol/L ("four is the floor").
- **Level 2**: below 3.0 mmol/L, clinically significant.
- **Severe**: needs help from another person, regardless of glucose level.
H: Symptoms
- **Autonomic**: sweating, shaking, palpitations, hunger, anxiety.
- **Neuroglycopenic**: confusion, difficulty concentrating, slurred speech, drowsiness, seizures and coma.
P: Repeated hypoglycaemia can blunt warning symptoms: **impaired awareness of hypoglycaemia**.
H: Treatment principles
P: Following JBDS guidance: if conscious and able to swallow, give **fast-acting carbohydrate**, recheck glucose after 10–15 minutes and repeat if still low, then give longer-acting carbohydrate. If unable to swallow or unconscious, place in the recovery position, call **999**, and give **glucagon** if available and trained, or intravenous glucose in hospital.
H: Causes and prevention
- Too much insulin or sulfonylurea; missed or delayed meals; exercise; alcohol; kidney impairment.
- Review medicines, educate about recognition, use CGM alarms.
X: Driving and diabetes.
> DVLA guidance for people on insulin: check glucose before driving and at least every 2 hours on long journeys.
> Glucose should be above 5.0 mmol/L to drive ("five to drive").
> If hypoglycaemic, stop safely, remove keys, treat, and wait 45 minutes after recovery before driving.
> Drivers must tell the DVLA about severe hypoglycaemia episodes, as rules require.
K: Hypoglycaemia is glucose below 4.0 mmol/L, with level 2 below 3.0 and severe episodes needing help; it is treated with fast-acting carbohydrate or, if unconscious, emergency help and glucagon; prevention involves medicine review, education and monitoring, and strict driving rules apply.
!: Giving food or drink by mouth to someone who cannot swallow safely. Call 999 and use glucagon or IV glucose instead.
EV: established | Hypoglycaemia is a common and potentially dangerous side effect of insulin and sulfonylureas.
EV: established | CGM with alerts reduces time spent in hypoglycaemia for many people.
T: Hypoglycaemia | Blood glucose below 4.0 mmol/L in people with diabetes
T: Impaired awareness of hypoglycaemia | Reduced ability to recognise symptoms of low glucose
T: Glucagon | A hormone that raises blood glucose, used for severe hypoglycaemia
SUM: Four is the floor.
SUM: Treat with fast-acting carbohydrate, or glucagon if unconscious.
SUM: Five to drive.
SRC: Joint British Diabetes Societies Inpatient Care Group, The Hospital Management of Hypoglycaemia in Adults with Diabetes Mellitus | guidance | 2023
SRC: Driver and Vehicle Licensing Agency, Assessing fitness to drive: a guide for medical professionals | guidance | 2024
Q: What glucose level defines hypoglycaemia in people with diabetes? | Below 4.0 mmol/L.
Q: What glucose level is needed before driving for people on insulin? | Above 5.0 mmol/L.
M1#medicine-u06-10-q1@1: Which is an autonomic symptom of hypoglycaemia? | Sweating and shaking | Slurred speech | Seizures | Coma | Autonomic symptoms come from adrenaline release.
M2#medicine-u06-10-q2@2: A conscious person with diabetes has glucose of 3.2 mmol/L. What is the first step? | Give fast-acting carbohydrate and recheck after 10–15 minutes | Give a long-acting insulin dose | Call 999 and do nothing else | Encourage sleep | Applying the standard result: Rapid sugar raises glucose quickly.
M3#medicine-u06-10-q3@3: A person with diabetes is found unconscious with suspected hypoglycaemia. What should be done? | Recovery position, call 999 and give glucagon if trained | Pour a sugary drink into their mouth | Give their usual insulin | Wait for them to wake up | Oral treatment risks choking when unconscious.
TF1#medicine-u06-10-q4@2: Repeated hypoglycaemia can reduce awareness of warning symptoms. | true | Impaired awareness increases the risk of severe episodes.
SA2#medicine-u06-10-q5@2,3: Explain how hypoglycaemia can be prevented in a person taking insulin. | Review insulin doses and timing with the diabetes team, especially after changes in weight, kidney function or activity. Teach recognition of symptoms and how to treat early. Plan carbohydrates and insulin adjustment around exercise and alcohol. Use continuous glucose monitoring with low-glucose alerts. Check glucose before driving. Education programmes help people put this into practice. | Medicine review ; Recognition and early treatment ; Exercise and alcohol ; Monitoring technology

## Complications of diabetes
LV: Clinical · Application
S: Long-term high glucose damages small and large blood vessels. This lesson covers retinopathy, nephropathy, neuropathy and foot disease, cardiovascular complications, and the screening and care processes that prevent them.
O: Describe the microvascular and macrovascular complications of diabetes
O: Explain screening and annual care processes
O: Identify urgent foot problems and their management under NICE NG19
PRE: Type 2 diabetes
H: Microvascular complications
- **Retinopathy**: damage to retinal vessels, a leading cause of sight loss in working-age adults; detected by the **NHS Diabetic Eye Screening Programme** from age 12.
- **Nephropathy**: albuminuria and declining eGFR; monitored with annual **ACR** and eGFR.
- **Neuropathy**: often a "glove and stocking" sensory loss, increasing the risk of foot ulcers; also autonomic neuropathy.
H: Macrovascular complications
P: Diabetes roughly doubles the risk of **coronary heart disease** and **stroke**, and raises the risk of **peripheral arterial disease**. Blood pressure, lipid and smoking management are as important as glucose control.
H: Annual care processes
P: NHS diabetes care includes regular checks of HbA1c, blood pressure, cholesterol, kidney function (creatinine and urine ACR), weight, smoking status and **foot examination**, plus eye screening.
X: An urgent foot problem.
> A 66-year-old with diabetes and neuropathy has a red, hot, swollen foot and a small ulcer.
> NICE NG19 advises immediate referral to acute services if there is a limb-threatening problem, such as ulceration with fever, signs of sepsis or critical ischaemia.
> A hot, swollen foot in neuropathy also raises suspicion of acute Charcot arthropathy, needing urgent referral to the multidisciplinary foot service.
> Delay risks amputation.
K: Diabetes causes retinopathy, nephropathy and neuropathy, and greatly increases cardiovascular disease; annual care processes and eye screening detect problems early, and urgent foot problems need prompt referral to prevent amputation.
!: Assuming a painless foot ulcer is minor. Neuropathy removes pain, so serious infection or ischaemia can progress unnoticed.
EV: established | Regular eye screening reduces sight loss from diabetic retinopathy.
EV: established | Multidisciplinary foot care reduces amputation rates.
T: Retinopathy | Damage to the blood vessels of the retina
T: Peripheral neuropathy | Damage to peripheral nerves, causing sensory loss
T: Charcot foot | Inflammatory destruction of foot bones and joints in people with neuropathy
SUM: Micro- and macrovascular complications.
SUM: Annual checks and eye screening.
SUM: Urgent foot problems need rapid referral.
SRC: NICE, Diabetic foot problems: prevention and management (NG19) | guidance | 2015 | https://www.nice.org.uk/guidance/ng19
SRC: UK Prospective Diabetes Study Group, "Intensive blood-glucose control with sulphonylureas or insulin compared with conventional treatment and risk of complications in patients with type 2 diabetes (UKPDS 33)", The Lancet 352(9131), 837–853 | primary | 1998
Q: Name the three main microvascular complications of diabetes. | Retinopathy, nephropathy and neuropathy.
Q: Why are people with diabetic neuropathy at risk of foot ulcers? | Loss of sensation means injuries go unnoticed.
M1#medicine-u06-11-q1@1: Which is a macrovascular complication of diabetes? | Stroke | Retinopathy | Peripheral neuropathy | Nephropathy | Large-vessel disease includes stroke and heart disease.
M2#medicine-u06-11-q2@2: Which test monitors diabetic nephropathy annually? | Urine albumin-to-creatinine ratio | Chest X-ray | Faecal calprotectin | Thyroid function test | Applying the standard result: ACR detects early kidney damage.
M3#medicine-u06-11-q3@3: A man with diabetes has a hot, swollen foot without pain or a wound. What should be suspected? | Acute Charcot foot, needing urgent foot service referral | A simple sprain that needs rest and no referral | Gout, which needs no specialist foot assessment | Normal ageing changes that need only reassurance | Neuropathic patients may not feel Charcot destruction.
MATCH1#medicine-u06-11-q4@1: Match each complication to its screening or check. | Retinopathy = Eye screening photography ; Nephropathy = Urine ACR and eGFR ; Neuropathy = Foot examination ; Cardiovascular risk = Blood pressure and cholesterol | Annual checks target each complication.
SA2#medicine-u06-11-q5@2,3: Explain why controlling blood pressure and cholesterol is as important as glucose in diabetes. | Diabetes greatly increases the risk of heart attack, stroke and peripheral arterial disease, which are the main causes of death in people with diabetes. Large trials show that lowering blood pressure and cholesterol substantially reduces these events and also protects the kidneys and eyes. Glucose control mainly reduces microvascular complications, so comprehensive risk factor management is needed. | Cardiovascular burden ; Evidence ; Kidney and eye benefits ; Comprehensive care

## The hypothalamus and pituitary
LV: Clinical · Application
S: The hypothalamus and pituitary control much of the endocrine system. This lesson covers pituitary hormones, pituitary tumours and their effects, including prolactinoma and acromegaly, and pituitary emergencies.
O: Describe the hormones of the anterior and posterior pituitary
O: Recognise the presentations of pituitary tumours
O: Identify pituitary emergencies
PRE: Cell structure and function
H: Pituitary hormones
- **Anterior pituitary**: growth hormone (GH), prolactin, ACTH, TSH, LH and FSH.
- **Posterior pituitary**: antidiuretic hormone (vasopressin) and oxytocin.
P: Hypothalamic hormones regulate anterior pituitary secretion, and target organ hormones feed back to switch it off.
H: Pituitary tumours
P: Most are benign **adenomas**. They cause problems by:
- **Hormone excess**: **prolactinoma** (the commonest functioning tumour) causes galactorrhoea, menstrual disturbance and low libido; **acromegaly** (GH excess) causes enlarged hands, feet and facial features; **Cushing's disease** (ACTH excess).
- **Mass effect**: headache and **bitemporal hemianopia** from pressure on the optic chiasm.
- **Hypopituitarism**: loss of other pituitary hormones.
X: Diagnosing acromegaly.
> A 48-year-old notices his rings and shoes no longer fit; he has headaches and sweating.
> His IGF-1 is raised, and GH fails to suppress during an oral glucose tolerance test.
> MRI shows a pituitary macroadenoma.
> He is referred to the endocrine and pituitary surgery team; untreated acromegaly increases cardiovascular risk.
H: Emergencies and posterior pituitary
P: **Pituitary apoplexy**, a sudden bleed into a tumour, causes severe headache, visual loss and potentially life-threatening cortisol deficiency, needing emergency care. Lack of vasopressin causes **arginine vasopressin deficiency** (formerly called cranial diabetes insipidus), with large volumes of dilute urine.
K: The pituitary secretes hormones controlling growth, stress response, thyroid and reproduction, plus vasopressin and oxytocin; tumours cause hormone excess, mass effects or hypopituitarism, and pituitary apoplexy is an emergency.
!: Attributing new headaches and peripheral vision loss to eye strain. Bitemporal visual field loss suggests a pituitary mass.
EV: established | Prolactinomas are the most common functioning pituitary adenomas.
EV: established | Diabetes insipidus has been renamed arginine vasopressin deficiency or resistance to avoid confusion with diabetes mellitus.
T: Acromegaly | A condition caused by excess growth hormone in adults
T: Bitemporal hemianopia | Loss of the outer halves of both visual fields
T: Pituitary apoplexy | Sudden haemorrhage or infarction of a pituitary tumour
SUM: Anterior and posterior pituitary hormones.
SUM: Tumours: excess, mass effect, deficiency.
SUM: Apoplexy is an emergency.
SRC: Society for Endocrinology, Endocrine Emergency Guidance: pituitary apoplexy | guidance | 2016
SRC: Katznelson L. et al., "Acromegaly: an Endocrine Society clinical practice guideline", Journal of Clinical Endocrinology and Metabolism 99(11), 3933–3951 | guidance | 2014
Q: Which is the commonest functioning pituitary tumour? | Prolactinoma.
Q: What visual field defect does a pituitary tumour pressing on the optic chiasm cause? | Bitemporal hemianopia.
M1#medicine-u06-12-q1@1: Which hormone is released by the posterior pituitary? | Antidiuretic hormone (vasopressin) | Growth hormone | TSH | Prolactin | The posterior pituitary releases vasopressin and oxytocin.
M2#medicine-u06-12-q2@2: Which test confirms acromegaly? | Failure of GH to suppress during an oral glucose tolerance test | A low serum IGF-1 | A short Synacthen test | Thyroid antibodies | Applying the standard result: GH normally suppresses after glucose.
M3#medicine-u06-12-q3@3: A patient with a known pituitary tumour develops sudden severe headache and visual loss. What is the priority? | Emergency assessment for pituitary apoplexy, including steroid cover | Routine clinic review in three months' time | Oral pain relief at home and no further action | An eye test at a high street optician next week | Apoplexy can cause life-threatening cortisol deficiency.
TF1#medicine-u06-12-q4@1: The anterior pituitary secretes TSH, ACTH and growth hormone. | true | These are among the six main anterior pituitary hormones.
SA2#medicine-u06-12-q5@2,3: Explain the three ways a pituitary tumour can cause symptoms. | A functioning tumour can secrete excess hormone, causing syndromes such as hyperprolactinaemia, acromegaly or Cushing's disease. A large tumour can cause mass effects, including headache and bitemporal hemianopia from pressure on the optic chiasm. It can also compress normal pituitary tissue, causing hypopituitarism with deficiencies of hormones such as cortisol, thyroid hormone and sex hormones. | Hormone excess ; Mass effect ; Hypopituitarism ; Examples

## Hypothyroidism
LV: Clinical · Application
S: Hypothyroidism is common, especially in women, and easily treated once recognised. This lesson covers its causes, symptoms, interpretation of thyroid function tests and management under NICE NG145.
O: Identify the causes and symptoms of hypothyroidism
O: Interpret thyroid function tests in primary and subclinical hypothyroidism
O: Outline treatment and monitoring, and recognise myxoedema coma
PRE: The hypothalamus and pituitary
H: Causes
- **Autoimmune (Hashimoto's) thyroiditis**: the commonest cause in the UK, with thyroid peroxidase (TPO) antibodies.
- **After treatment** for hyperthyroidism: radioiodine or surgery.
- **Drugs**: amiodarone, lithium.
- **Iodine deficiency**: the commonest cause worldwide.
- **Secondary**: pituitary disease (rare).
H: Symptoms and signs
P: Tiredness, weight gain, cold intolerance, constipation, dry skin, hair thinning, low mood, menstrual changes, slow pulse and slow-relaxing reflexes. Symptoms are often gradual and non-specific.
H: Thyroid function tests
- **Primary hypothyroidism**: **high TSH**, **low free T4**.
- **Subclinical hypothyroidism**: high TSH with normal free T4; NICE advises repeating tests and considering treatment depending on TSH level, age and symptoms.
- **Secondary hypothyroidism**: low or normal TSH with low free T4.
H: Treatment
P: **Levothyroxine** replaces thyroid hormone. The dose is individualised and adjusted to keep TSH in the reference range, with checks every few months after starting or changing treatment, then annually. Older people and those with heart disease start more cautiously.
X: Interpreting a result.
> A 45-year-old woman has fatigue and weight gain.
> TSH is 18 mU/L (high) and free T4 is 7 pmol/L (low), with positive TPO antibodies.
> This indicates primary hypothyroidism from Hashimoto's thyroiditis.
> She starts levothyroxine and has TSH rechecked after a few months.
H: Emergency
P: **Myxoedema coma** is rare but life-threatening: hypothermia, drowsiness, bradycardia and hyponatraemia in severe hypothyroidism, often triggered by infection. It needs emergency hospital treatment.
K: Hypothyroidism, usually autoimmune in the UK, causes fatigue, weight gain and cold intolerance; primary disease shows high TSH and low free T4; levothyroxine is adjusted to TSH, and myxoedema coma is an emergency.
!: Diagnosing hypothyroidism from a single mildly raised TSH during acute illness. TSH can fluctuate, so tests should be repeated when the patient is well.
EV: established | Hashimoto's thyroiditis is the commonest cause of hypothyroidism in iodine-sufficient countries.
EV: contested | The benefit of treating mild subclinical hypothyroidism, especially in older people, is uncertain.
T: Hashimoto's thyroiditis | Autoimmune destruction of the thyroid gland
T: Subclinical hypothyroidism | Raised TSH with normal free T4
T: Myxoedema coma | A life-threatening emergency of severe hypothyroidism
SUM: Usually autoimmune in the UK.
SUM: High TSH, low free T4.
SUM: Levothyroxine guided by TSH.
SRC: NICE, Thyroid disease: assessment and management (NG145) | guidance | 2019 | https://www.nice.org.uk/guidance/ng145
SRC: Chaker L. et al., "Hypothyroidism", The Lancet 390(10101), 1550–1562 | secondary | 2017
Q: What is the commonest cause of hypothyroidism in the UK? | Autoimmune (Hashimoto's) thyroiditis.
Q: What thyroid function pattern indicates primary hypothyroidism? | High TSH and low free T4.
M1#medicine-u06-13-q1@1: Which symptom is typical of hypothyroidism? | Cold intolerance and weight gain | Heat intolerance and weight loss | Tremor and palpitations | Diarrhoea and anxiety | Applying the standard result: Low thyroid hormone slows metabolism.
M2#medicine-u06-13-q2@2: TSH is raised and free T4 is normal. What does this indicate? | Subclinical hypothyroidism | Overt hyperthyroidism | Secondary hypothyroidism from pituitary failure | A normal result that needs no follow-up | Raised TSH with normal T4 is subclinical.
M3#medicine-u06-13-q3@3: An elderly woman with untreated hypothyroidism is found cold, drowsy and bradycardic after a chest infection. What is the concern? | Myxoedema coma, needing emergency hospital care | Normal ageing that needs reassurance at home | Simple viral illness managed with fluids only | Hyperthyroidism needing antithyroid drugs | Severe hypothyroidism with infection can cause coma.
TF1#medicine-u06-13-q4@2: Levothyroxine treatment is adjusted to keep TSH within the reference range. | true | TSH guides replacement in primary hypothyroidism.
SA2#medicine-u06-13-q5@2,3: Explain how thyroid function tests distinguish primary from secondary hypothyroidism. | In primary hypothyroidism, the thyroid fails, so low thyroid hormone removes negative feedback and the pituitary releases more TSH: TSH is high and free T4 low. In secondary hypothyroidism, the pituitary fails to produce TSH, so TSH is low or inappropriately normal despite low free T4. Secondary disease needs assessment of other pituitary hormones. | Feedback ; Primary pattern ; Secondary pattern ; Further assessment

## Hyperthyroidism
LV: Clinical · Application
S: Hyperthyroidism speeds up metabolism and can affect the heart, bones and eyes. This lesson covers its causes, especially Graves' disease, diagnosis and treatment options, and safety warnings with antithyroid drugs.
O: Identify the causes and features of hyperthyroidism
O: Distinguish Graves' disease from other causes
O: Outline treatment options and important safety advice
PRE: Hypothyroidism
H: Causes
- **Graves' disease**: autoimmune stimulation of the thyroid by **TSH receptor antibodies**; the commonest cause in the UK.
- **Toxic multinodular goitre** and **toxic adenoma**.
- **Thyroiditis**: such as after viral illness or pregnancy; often temporary.
- **Drugs**: amiodarone, excess levothyroxine.
H: Features
P: Weight loss despite good appetite, heat intolerance, sweating, tremor, palpitations, atrial fibrillation, anxiety, diarrhoea and menstrual changes. **Graves' disease** may also cause **thyroid eye disease** (bulging eyes, double vision) and **pretibial myxoedema**.
H: Diagnosis
P: **Low TSH** with **high free T4 and/or T3**. TSH receptor antibodies confirm Graves' disease; thyroid scintigraphy can distinguish nodular disease and thyroiditis.
H: Treatment
- **Beta-blockers** for symptom relief.
- **Antithyroid drugs** (such as carbimazole) to reduce hormone production.
- **Radioactive iodine**: avoided in pregnancy and active thyroid eye disease.
- **Surgery**: thyroidectomy, such as for large goitres.
X: A safety warning.
> A 30-year-old starts carbimazole for Graves' disease.
> She is warned that a rare side effect is agranulocytosis, a dangerous fall in white blood cells.
> She is told to stop the drug and get an urgent full blood count if she develops a sore throat, mouth ulcers or fever.
> This warning is required by medicines safety guidance for all patients on carbimazole.
H: Thyroid storm
P: A rare emergency with fever, confusion, very fast heart rate and heart failure, often triggered by infection or surgery in untreated hyperthyroidism. It needs immediate hospital treatment.
K: Hyperthyroidism, most often Graves' disease, causes weight loss, heat intolerance, tremor and palpitations, with low TSH and high free T4; treatments are beta-blockers, antithyroid drugs, radioiodine or surgery, and patients on carbimazole must report sore throat or fever urgently.
!: Ignoring a sore throat in someone taking carbimazole. It may signal agranulocytosis, which needs an urgent blood count.
EV: established | Graves' disease is the commonest cause of hyperthyroidism in iodine-sufficient regions.
EV: established | Agranulocytosis is a rare but serious adverse effect of antithyroid drugs.
T: Graves' disease | Autoimmune hyperthyroidism caused by TSH receptor-stimulating antibodies
T: Thyroid eye disease | Inflammation of tissues around the eyes, associated with Graves' disease
T: Agranulocytosis | A dangerous fall in neutrophils, increasing infection risk
SUM: Graves' disease is commonest.
SUM: Low TSH, high free T4.
SUM: Warn about agranulocytosis with carbimazole.
SRC: NICE, Thyroid disease: assessment and management (NG145) | guidance | 2019 | https://www.nice.org.uk/guidance/ng145
SRC: Smith T. J. and Hegedüs L., "Graves' disease", New England Journal of Medicine 375(16), 1552–1565 | secondary | 2016
Q: What antibodies cause Graves' disease? | TSH receptor-stimulating antibodies.
Q: What should a patient on carbimazole do if they develop a sore throat? | Stop the drug and get an urgent full blood count.
M1#medicine-u06-14-q1@1: Which feature is specific to Graves' disease? | Thyroid eye disease | Weight loss | Tremor | Heat intolerance | Eye disease is linked to Graves' autoimmunity.
M2#medicine-u06-14-q2@2: TSH is suppressed and free T4 is raised. What does this indicate? | Hyperthyroidism | Primary hypothyroidism | Subclinical hypothyroidism | A normal result needing no action | Applying the standard result: Low TSH with high T4 is hyperthyroidism.
M3#medicine-u06-14-q3@3: Why is radioactive iodine avoided in pregnancy? | It can damage the fetal thyroid | It is ineffective in all women | It causes immediate hypothyroidism in the mother only | It is cheaper than surgery | Applying the standard result: Radioiodine crosses the placenta.
TF1#medicine-u06-14-q4@1: Hyperthyroidism can cause atrial fibrillation. | true | Excess thyroid hormone affects the heart rhythm.
SA2#medicine-u06-14-q5@2,3: Compare the treatment options for Graves' disease. | Beta-blockers control symptoms quickly but do not treat the cause. Antithyroid drugs such as carbimazole reduce hormone production and may lead to remission, but relapse is common and agranulocytosis is a rare risk. Radioactive iodine is effective and definitive but often causes hypothyroidism and is avoided in pregnancy and active eye disease. Surgery is definitive, suitable for large goitres, but carries surgical risks. | Beta-blockers ; Antithyroid drugs ; Radioiodine ; Surgery

## Adrenal insufficiency
LV: Clinical · Application
S: Adrenal insufficiency means the adrenal glands do not make enough cortisol. This lesson covers primary (Addison's disease) and secondary causes, diagnosis, and the prevention and emergency treatment of adrenal crisis.
O: Distinguish primary from secondary adrenal insufficiency
O: Describe the features and diagnosis of adrenal insufficiency
O: Explain the recognition, prevention and emergency treatment of adrenal crisis
PRE: The hypothalamus and pituitary
H: Causes
- **Primary (Addison's disease)**: adrenal destruction, usually **autoimmune** in the UK; both cortisol and aldosterone are deficient.
- **Secondary**: pituitary failure reducing ACTH.
- **Tertiary**: suppression by long-term **glucocorticoid** (steroid) treatment, the commonest cause overall.
H: Features
P: Fatigue, weight loss, nausea, abdominal pain, dizziness on standing, low blood pressure, and salt craving. In Addison's disease, raised ACTH causes skin and mucosal **hyperpigmentation**, and aldosterone deficiency causes **hyponatraemia** and **hyperkalaemia**.
H: Diagnosis
P: A low morning cortisol suggests the diagnosis; a **short Synacthen test** (measuring cortisol response to synthetic ACTH) confirms it. ACTH levels distinguish primary (high ACTH) from secondary (low or normal ACTH).
X: Preventing adrenal crisis.
> A man with Addison's disease takes daily hydrocortisone replacement.
> He is taught **sick-day rules**: increase his steroid dose during illness with fever, as his team advises.
> He carries an NHS **Steroid Emergency Card** and an emergency injection kit.
> If vomiting or collapsing, he or others must give the injection and call 999.
H: Adrenal crisis
P: Adrenal crisis is a life-threatening emergency with hypotension, shock, vomiting, confusion and hypoglycaemia. Immediate treatment is **parenteral hydrocortisone** and intravenous fluids, followed by urgent hospital care. Treatment must never be delayed for tests.
K: Adrenal insufficiency may be primary (Addison's), secondary or from steroid suppression; it causes fatigue, hypotension and, in Addison's, pigmentation and electrolyte disturbance; it is confirmed by a short Synacthen test, and adrenal crisis needs immediate hydrocortisone.
!: Stopping long-term steroid treatment suddenly. The adrenal glands may be suppressed, risking adrenal crisis.
EV: established | Autoimmune adrenalitis is the commonest cause of Addison's disease in the UK.
EV: established | NHS England introduced the Steroid Emergency Card to reduce deaths from adrenal crisis.
T: Addison's disease | Primary adrenal insufficiency, usually autoimmune
T: Short Synacthen test | A test measuring cortisol response to synthetic ACTH
T: Adrenal crisis | A life-threatening emergency of acute cortisol deficiency
SUM: Primary, secondary and steroid-induced causes.
SUM: Confirm with a short Synacthen test.
SUM: Adrenal crisis: give hydrocortisone immediately.
SRC: Society for Endocrinology, Endocrine Emergency Guidance: emergency management of acute adrenal insufficiency (adrenal crisis) in adult patients, Endocrine Connections 5(5), G1–G3 | guidance | 2016
SRC: NHS England, National Patient Safety Alert: Steroid Emergency Card to support early recognition and treatment of adrenal crisis in adults | guidance | 2020
Q: What is the commonest cause of Addison's disease in the UK? | Autoimmune destruction of the adrenal glands.
Q: Which test confirms adrenal insufficiency? | The short Synacthen test.
M1#medicine-u06-15-q1@1: Which feature suggests primary rather than secondary adrenal insufficiency? | Skin hyperpigmentation | Fatigue | Weight loss | Nausea | High ACTH in Addison's disease causes pigmentation.
M2#medicine-u06-15-q2@2: Which electrolyte pattern is typical of Addison's disease? | Low sodium and high potassium | High sodium and low potassium | Low calcium and high phosphate | High glucose and low chloride | Aldosterone deficiency causes salt loss and potassium retention.
M3#medicine-u06-15-q3@3: A patient with Addison's disease is vomiting and hypotensive. What should happen first? | Immediate parenteral hydrocortisone and fluids, without waiting for tests | Arrange a Synacthen test before treatment | Advise oral fluids at home and review tomorrow | Stop all steroid medicines | Adrenal crisis can be fatal without prompt steroid treatment.
TF1#medicine-u06-15-q4@2: Long-term steroid treatment can suppress the adrenal glands. | true | Suppression means stopping steroids suddenly can cause adrenal crisis.
SA2#medicine-u06-15-q5@2,3: Explain how adrenal crisis can be prevented in people with adrenal insufficiency. | Patients and families are educated about sick-day rules, increasing steroid doses during illness as advised by their team. They carry a Steroid Emergency Card and an emergency injection kit, and know when to use it and call 999. Clinicians give extra steroid cover for surgery and procedures, and long-term steroids are never stopped abruptly. | Education and sick-day rules ; Emergency card and kit ; Procedures ; Avoid abrupt withdrawal

## Cushing's syndrome
LV: Clinical · Application
S: Cushing's syndrome is caused by prolonged exposure to excess cortisol. This lesson covers its causes, clinical features, a stepwise approach to diagnosis, and principles of management.
O: Identify the causes of Cushing's syndrome
O: Recognise its clinical features
O: Describe the stepwise diagnostic tests
PRE: Adrenal insufficiency
H: Causes
- **Exogenous**: long-term glucocorticoid treatment, by far the commonest cause.
- **ACTH-dependent**: a pituitary adenoma (**Cushing's disease**, the commonest endogenous cause) or ectopic ACTH from tumours such as small cell lung cancer.
- **ACTH-independent**: adrenal adenoma or carcinoma.
H: Features
P: Weight gain with central obesity, rounded face, a fat pad between the shoulders, thin skin, easy bruising, **purple striae**, proximal muscle weakness, hypertension, diabetes, osteoporosis, low mood and menstrual change. Proximal weakness, easy bruising and wide purple striae are the most discriminating features.
H: Diagnosis
- First, exclude exogenous steroids, including inhaled, topical and injected forms.
- **Screening tests**: overnight dexamethasone suppression test, 24-hour urinary free cortisol, or late-night salivary cortisol.
- If confirmed, measure **ACTH** to separate ACTH-dependent from independent causes, then image the pituitary or adrenals.
X: Interpreting a dexamethasone suppression test.
> A 40-year-old with weight gain, purple striae and hypertension takes dexamethasone late at night.
> Normally, morning cortisol would be suppressed.
> Her cortisol remains high, suggesting Cushing's syndrome.
> She is referred to endocrinology for confirmatory tests and ACTH measurement.
H: Management
P: Treatment depends on the cause: reducing exogenous steroids where possible, pituitary surgery for Cushing's disease, adrenalectomy for adrenal tumours, and treating ectopic sources. Untreated Cushing's syndrome raises cardiovascular mortality.
K: Cushing's syndrome is cortisol excess, most often from steroid treatment and, among endogenous causes, pituitary adenoma; key features are central obesity, purple striae and proximal weakness; diagnosis is stepwise, from screening tests to ACTH and imaging.
!: Forgetting inhaled or topical steroids when assessing a patient with Cushingoid features. All routes can cause cortisol excess.
EV: established | Exogenous glucocorticoids are the commonest cause of Cushing's syndrome.
EV: established | The overnight dexamethasone suppression test is a standard screening test.
T: Cushing's syndrome | A condition caused by prolonged exposure to excess cortisol
T: Cushing's disease | Cushing's syndrome caused by an ACTH-secreting pituitary adenoma
T: Dexamethasone suppression test | A test assessing whether cortisol suppresses normally after dexamethasone
SUM: Steroids are the commonest cause.
SUM: Striae, bruising and proximal weakness discriminate.
SUM: Screen, then ACTH, then imaging.
SRC: Nieman L. K. et al., "The diagnosis of Cushing's syndrome: an Endocrine Society clinical practice guideline", Journal of Clinical Endocrinology and Metabolism 93(5), 1526–1540 | guidance | 2008
SRC: Lacroix A. et al., "Cushing's syndrome", The Lancet 386(9996), 913–927 | secondary | 2015
Q: What is the commonest cause of Cushing's syndrome? | Long-term glucocorticoid (steroid) treatment.
Q: What is Cushing's disease? | Cushing's syndrome caused by an ACTH-secreting pituitary adenoma.
M1#medicine-u06-16-q1@1: Which feature is most discriminating for Cushing's syndrome? | Wide purple striae and easy bruising | General tiredness | Mild weight gain alone | Occasional headaches | These features are less common in simple obesity.
M2#medicine-u06-16-q2@2: In ACTH-independent Cushing's syndrome, what level of ACTH would be expected? | Low, suppressed by high cortisol | High, driving the adrenals | Normal in all cases | Absent from birth | Adrenal tumours produce cortisol that suppresses ACTH.
M3#medicine-u06-16-q3@3: A patient with Cushingoid features takes no tablets. What should be asked before testing? | About inhaled, topical, injected or other steroid use | Only about family history | About recent foreign travel | Nothing, as tablets are the only source | Many steroid routes can cause Cushing's syndrome.
SEQ1#medicine-u06-16-q4@2: Order the diagnostic steps for suspected Cushing's syndrome. | Exclude exogenous steroids ; Perform a screening test ; Measure ACTH ; Image the pituitary or adrenals | Diagnosis proceeds from confirming excess to finding the source.
SA2#medicine-u06-16-q5@2,3: Explain how ACTH measurement helps locate the cause of Cushing's syndrome. | Once cortisol excess is confirmed, ACTH shows whether the excess is driven from above. A low ACTH means cortisol is being made independently, usually by an adrenal tumour, so adrenal imaging follows. A normal or high ACTH means an ACTH-secreting source, usually a pituitary adenoma, or an ectopic tumour, so pituitary MRI and further tests follow. | Confirm excess ; Low ACTH meaning ; High ACTH meaning ; Imaging choice

## Primary hyperaldosteronism and phaeochromocytoma
LV: Clinical · Application
S: Some cases of hypertension have endocrine causes that can be treated or cured. This lesson covers primary hyperaldosteronism, the commonest endocrine cause, and phaeochromocytoma, a rare but dangerous tumour.
O: Recognise when to screen for secondary causes of hypertension
O: Describe the diagnosis of primary hyperaldosteronism
O: Recognise the features and diagnosis of phaeochromocytoma
PRE: Adrenal insufficiency
H: Primary hyperaldosteronism
P: Excess aldosterone from the adrenal glands causes sodium retention and hypertension, sometimes with **hypokalaemia** (though potassium is often normal). It accounts for an estimated **5–10% of hypertension**, making it the commonest endocrine cause. Causes are **bilateral adrenal hyperplasia** or an **aldosterone-producing adenoma** (Conn's syndrome).
H: When to screen
- Hypertension with **hypokalaemia**.
- **Resistant hypertension** despite three drugs.
- Hypertension at a **young age**.
- An **adrenal incidentaloma** found on imaging.
H: Diagnosis
P: The **aldosterone-to-renin ratio** is the screening test: high aldosterone with suppressed renin suggests primary hyperaldosteronism. Confirmatory tests, CT and **adrenal vein sampling** distinguish a unilateral adenoma (which may be removed surgically) from bilateral disease (treated with mineralocorticoid receptor antagonists).
H: Phaeochromocytoma
P: A tumour of the adrenal medulla (or related tissue) secreting **catecholamines**. Classic features are **paroxysmal headaches, sweating and palpitations**, with episodic or sustained hypertension. Diagnosis is by **plasma or urine metanephrines**, then imaging. About a third or more have an inherited cause, so genetic testing is offered.
X: A hypertensive crisis.
> A 35-year-old has episodes of pounding headache, sweating and palpitations, with blood pressure of 220/120 during one episode.
> Plasma metanephrines are markedly raised; CT shows an adrenal mass.
> She is referred to a specialist endocrine and surgical team.
> Alpha-blockade is started before surgery to prevent a dangerous hypertensive crisis during the operation.
K: Primary hyperaldosteronism is a common, often missed cause of hypertension screened with the aldosterone-to-renin ratio; phaeochromocytoma causes paroxysmal symptoms and is diagnosed by metanephrines, with careful pre-operative preparation.
!: Assuming primary hyperaldosteronism needs hypokalaemia. Most patients have normal potassium.
EV: established | Primary hyperaldosteronism is the commonest endocrine cause of hypertension.
EV: established | Many phaeochromocytomas and paragangliomas have a hereditary basis.
T: Primary hyperaldosteronism | Excess aldosterone production by the adrenal glands
T: Aldosterone-to-renin ratio | A screening test for primary hyperaldosteronism
T: Phaeochromocytoma | A catecholamine-secreting tumour of the adrenal medulla
SUM: Hyperaldosteronism is common and often missed.
SUM: Screen with the aldosterone-to-renin ratio.
SUM: Phaeochromocytoma: metanephrines and careful surgery.
SRC: Funder J. W. et al., "The management of primary aldosteronism: case detection, diagnosis, and treatment: an Endocrine Society clinical practice guideline", Journal of Clinical Endocrinology and Metabolism 101(5), 1889–1916 | guidance | 2016
SRC: Lenders J. W. M. et al., "Pheochromocytoma and paraganglioma: an Endocrine Society clinical practice guideline", Journal of Clinical Endocrinology and Metabolism 99(6), 1915–1942 | guidance | 2014
Q: What is the screening test for primary hyperaldosteronism? | The aldosterone-to-renin ratio.
Q: Which test diagnoses phaeochromocytoma? | Plasma or urine metanephrines.
M1#medicine-u06-17-q1@1: What are the classic symptoms of phaeochromocytoma? | Paroxysmal headache, sweating and palpitations | Weight gain, cold intolerance and constipation | Thirst, polyuria and weight loss | Joint pain, rash and fever | Catecholamine surges cause episodic symptoms.
M2#medicine-u06-17-q2@2: Which patient should be screened for primary hyperaldosteronism? | A person with hypertension resistant to three drugs | A person with normal blood pressure and no symptoms | A person with low blood pressure on standing | A person with a single high reading after exercise | Resistant hypertension is a key indication.
M3#medicine-u06-17-q3@3: Why is adrenal vein sampling used in primary hyperaldosteronism? | To tell a unilateral adenoma, which can be removed, from bilateral disease | To measure blood glucose in the adrenal veins | To diagnose phaeochromocytoma | To treat the disease directly | Lateralisation guides surgery versus medication.
TF1#medicine-u06-17-q4@2: Most patients with primary hyperaldosteronism have normal serum potassium. | true | Hypokalaemia is present in only a minority.
SA2#medicine-u06-17-q5@2,3: Explain why identifying primary hyperaldosteronism matters. | It is a common but under-diagnosed cause of hypertension. Aldosterone excess causes more cardiovascular and kidney damage than the blood pressure alone would suggest. A unilateral adenoma can be removed surgically, potentially curing or greatly improving hypertension, while bilateral disease responds well to mineralocorticoid receptor antagonists. Screening at-risk groups therefore improves outcomes. | Common and missed ; Excess harm ; Curable forms ; Targeted treatment

## Calcium disorders and the parathyroid glands
LV: Clinical · Application
S: Calcium is tightly regulated by parathyroid hormone and vitamin D. This lesson covers calcium homeostasis, the causes and features of hypercalcaemia and hypocalcaemia, corrected calcium, and emergency management principles.
O: Describe the regulation of calcium by PTH and vitamin D
O: Identify the main causes and features of hypercalcaemia and hypocalcaemia
O: Calculate corrected calcium and recognise emergencies
PRE: Renal physiology and glomerular filtration
H: Regulation
P: **Parathyroid hormone (PTH)** raises calcium by releasing it from bone, increasing kidney reabsorption and activating vitamin D. **Activated vitamin D** increases gut absorption of calcium. Low calcium stimulates PTH; high calcium suppresses it.
H: Hypercalcaemia
- **Causes**: **primary hyperparathyroidism** (the commonest cause in outpatients, with high or inappropriately normal PTH) and **malignancy** (the commonest in hospital inpatients, with suppressed PTH).
- **Features**: "bones, stones, groans and moans": bone pain, kidney stones, abdominal pain and constipation, and low mood or confusion; also thirst and polyuria.
- **Severe** hypercalcaemia (above 3.5 mmol/L, or with symptoms) is an emergency, treated with intravenous fluids and other measures in hospital.
H: Hypocalcaemia
- **Causes**: vitamin D deficiency, CKD, after thyroid or parathyroid surgery, low magnesium.
- **Features**: tingling around the mouth and fingers, muscle cramps, **tetany**, Chvostek's and Trousseau's signs, seizures, and prolonged QT on ECG. Severe or symptomatic hypocalcaemia needs urgent treatment.
E: Corrected calcium = measured calcium + 0.02 × (40 − albumin) :: calcium in mmol/L, albumin in g/L
X: Correcting for low albumin.
> Measured calcium is 2.40 mmol/L; albumin is 30 g/L.
> Corrected calcium = 2.40 + 0.02 × (40 − 30) = 2.40 + 0.20 = 2.60 mmol/L.
> With a reference range of about 2.2–2.6, this is at the upper limit.
> PTH should be checked if it is raised on repeat testing.
K: PTH and vitamin D regulate calcium; hypercalcaemia is mainly from primary hyperparathyroidism or malignancy and severe cases are emergencies; hypocalcaemia causes neuromuscular irritability; calcium is corrected for albumin.
!: Interpreting total calcium without correcting for albumin. Low albumin can make calcium look falsely low.
EV: established | Primary hyperparathyroidism and malignancy account for most cases of hypercalcaemia.
EV: contested | Albumin-corrected calcium is widely used, but some laboratories prefer measuring ionised calcium, as correction formulas can be inaccurate.
T: Parathyroid hormone | A hormone that raises blood calcium
T: Primary hyperparathyroidism | Excess PTH from a parathyroid gland, usually an adenoma
T: Tetany | Involuntary muscle spasm caused by low calcium
SUM: PTH and vitamin D raise calcium.
SUM: Hyperparathyroidism and malignancy cause most hypercalcaemia.
SUM: Correct calcium for albumin.
SRC: Society for Endocrinology, Endocrine Emergency Guidance: acute hypercalcaemia in adult patients, Endocrine Connections 5(5), G9–G11 | guidance | 2016
SRC: NICE, Hyperparathyroidism (primary): diagnosis, assessment and initial management (NG132) | guidance | 2019 | https://www.nice.org.uk/guidance/ng132
Q: What is the commonest cause of hypercalcaemia in outpatients? | Primary hyperparathyroidism.
Q: How is calcium corrected for albumin? | Measured calcium plus 0.02 × (40 − albumin).
M1#medicine-u06-18-q1@1: Which hormone raises blood calcium? | Parathyroid hormone | Calcitonin | Insulin | Glucagon | PTH increases calcium release, reabsorption and vitamin D activation.
M2#medicine-u06-18-q2@2: Hypercalcaemia with suppressed PTH suggests which cause? | Malignancy | Primary hyperparathyroidism | Vitamin D deficiency | Hypoparathyroidism | Suppressed PTH points away from parathyroid overactivity.
M3#medicine-u06-18-q3@3: A patient has tingling around the mouth and hand spasms after thyroid surgery. What is the likely cause? | Hypocalcaemia from parathyroid injury | Hypercalcaemia from malignancy | Hyperkalaemia from kidney failure | Hyperglycaemia from stress | Parathyroid glands can be damaged during thyroidectomy.
NUM2#medicine-u06-18-q4@3: Measured calcium is 2.40 mmol/L and albumin is 30 g/L. What is the corrected calcium, in mmol/L? | 2.60 | 0.01 | mmol/L | Corrected calcium = 2.40 + 0.02 × (40 − 30) = 2.60 mmol/L.
SA2#medicine-u06-18-q5@2,3: Explain how PTH levels help distinguish causes of hypercalcaemia. | In primary hyperparathyroidism, a parathyroid adenoma secretes PTH autonomously, so PTH is high or inappropriately normal despite high calcium. In malignancy, high calcium from bone metastases or PTH-related peptide normally suppresses PTH, so PTH is low. Measuring PTH alongside calcium therefore points towards the parathyroid or towards non-parathyroid causes such as cancer. | Normal feedback ; Primary hyperparathyroidism ; Malignancy ; Diagnostic use

## Osteoporosis and metabolic bone disease
LV: Clinical · Application
S: Osteoporosis weakens bones and causes fragility fractures, a major cause of disability in older people. This lesson covers its definition, risk assessment with FRAX, treatment under NOGG guidance, and other metabolic bone diseases.
O: Define osteoporosis and fragility fracture
O: Assess fracture risk using FRAX and DXA
O: Outline prevention and treatment, and describe osteomalacia and Paget's disease
PRE: Calcium disorders and the parathyroid glands
H: Definition
P: **Osteoporosis** is low bone mass and deterioration of bone structure, increasing fracture risk. The WHO defines it by a **DXA T-score of −2.5 or lower** at the hip or spine. A **fragility fracture** is a break from a fall from standing height or less. The Royal Osteoporosis Society estimates that half of women and one in five men over 50 will break a bone, mainly due to poor bone health.
H: Risk factors
- Age, female sex, early menopause, low body weight.
- Previous fragility fracture, parental hip fracture.
- **Long-term glucocorticoids**, smoking, alcohol, rheumatoid arthritis, low activity.
H: Assessment and treatment
P: **FRAX** estimates 10-year fracture probability from clinical risk factors, with or without bone density. The National Osteoporosis Guideline Group (NOGG, 2022) uses FRAX to guide DXA scanning and treatment. Treatment includes **bisphosphonates** first-line for many, other drugs for high risk, adequate **calcium and vitamin D**, exercise and **falls prevention**.
X: Assessing a patient.
> A 68-year-old woman fractures her wrist tripping on a kerb.
> This is a fragility fracture, and she takes long-term steroids for asthma.
> FRAX and DXA confirm high fracture risk (T-score −2.8).
> She starts treatment following NOGG guidance and is referred to a falls prevention programme.
H: Other metabolic bone disease
- **Osteomalacia**: soft bones from **vitamin D deficiency**, causing bone pain and muscle weakness (rickets in children).
- **Paget's disease of bone**: disordered bone remodelling causing pain, deformity and a raised ALP.
K: Osteoporosis is low bone mass defined by a T-score of −2.5 or lower, causing fragility fractures; FRAX and DXA guide treatment under NOGG, with bisphosphonates, calcium and vitamin D, exercise and falls prevention; osteomalacia and Paget's disease are other metabolic bone diseases.
!: Treating a fragility fracture without assessing bone health. A first fragility fracture is a strong warning of future fractures.
EV: established | A previous fragility fracture roughly doubles the risk of further fractures.
EV: established | Fracture liaison services improve identification and treatment after fragility fractures.
T: Osteoporosis | Low bone mass and deteriorated structure, increasing fracture risk
T: T-score | Bone density compared with a young adult reference, in standard deviations
T: Fragility fracture | A fracture from a fall from standing height or less
SUM: T-score −2.5 or lower defines osteoporosis.
SUM: FRAX and DXA guide treatment.
SUM: Treat after fragility fractures.
SRC: Gregson C. L. et al., "UK clinical guideline for the prevention and treatment of osteoporosis", Archives of Osteoporosis 17(1), 58 | guidance | 2022
SRC: NICE, Osteoporosis: assessing the risk of fragility fracture (CG146) | guidance | 2017 | https://www.nice.org.uk/guidance/cg146
Q: What DXA T-score defines osteoporosis? | −2.5 or lower.
Q: What is a fragility fracture? | A fracture from a fall from standing height or less.
M1#medicine-u06-19-q1@1: What does FRAX estimate? | 10-year probability of major osteoporotic and hip fracture | Bone density at the spine | Serum vitamin D level | Kidney function | Applying the standard result: FRAX combines clinical risk factors.
M2#medicine-u06-19-q2@2: Which medicine increases osteoporosis risk when used long term? | Oral glucocorticoids | Paracetamol | Penicillin | Antihistamines | Applying the standard result: Steroids reduce bone formation.
M3#medicine-u06-19-q3@3: A 70-year-old breaks a hip after a fall from standing. What should follow surgery? | Bone health assessment, treatment and falls prevention | Discharge with no further assessment | Advice to avoid all walking | A high-salt diet | Fragility fractures signal high future risk.
TF1#medicine-u06-19-q4@2: Osteomalacia is caused mainly by vitamin D deficiency. | true | Lack of vitamin D impairs bone mineralisation.
SA2#medicine-u06-19-q5@2,3: Outline the approach to preventing fractures in older people. | Identify people at risk through fragility fractures and risk factors such as steroids, then estimate risk with FRAX and DXA where indicated. Offer drug treatment, such as bisphosphonates, to those at high risk, with adequate calcium and vitamin D. Encourage weight-bearing and strength exercise, stop smoking and reduce alcohol, and provide falls prevention, such as home hazard checks and strength and balance programmes. | Identification ; Risk assessment ; Treatment ; Lifestyle and falls prevention

## Lipid disorders
LV: Clinical · Application
S: Raised cholesterol is a major modifiable cause of cardiovascular disease. This lesson covers lipid testing, cardiovascular risk assessment with QRISK3, statin treatment under NICE NG238, and familial hypercholesterolaemia.
O: Interpret a lipid profile, including non-HDL cholesterol
O: Apply NICE guidance on cardiovascular risk assessment and lipid lowering
O: Recognise and refer suspected familial hypercholesterolaemia
PRE: Type 2 diabetes
H: The lipid profile
- **Total cholesterol**, **HDL cholesterol** ("good"), **LDL cholesterol** ("bad"), **triglycerides**.
- **Non-HDL cholesterol** = total cholesterol − HDL; NICE uses it to monitor treatment.
H: Risk assessment and treatment
P: NICE NG238 (2023) recommends **QRISK3** to estimate 10-year cardiovascular risk in people aged 25–84 without CVD. Offer lifestyle advice to all; offer a **statin** to people with a QRISK3 score of **10% or more**, after discussion and shared decision-making, and to people with established CVD, CKD or type 1 diabetes meeting criteria. The aim is a **reduction in non-HDL cholesterol of more than 40%** from baseline.
X: Monitoring statin response.
> A 58-year-old has total cholesterol 6.0 mmol/L and HDL 1.2 mmol/L.
> Non-HDL cholesterol = 6.0 − 1.2 = 4.8 mmol/L.
> A 40% reduction would bring it to 4.8 × 0.6 = 2.88 mmol/L or lower.
> At three months, non-HDL is 2.6 mmol/L, a 46% reduction: the target is met.
H: Familial hypercholesterolaemia
P: **Familial hypercholesterolaemia (FH)** is an inherited condition affecting about **1 in 250** people, causing very high LDL cholesterol from birth and early heart disease. Suspect it with total cholesterol above 7.5 mmol/L in adults, a family history of premature heart disease, or tendon xanthomas. NICE recommends assessment with criteria such as Simon Broome, genetic testing and **cascade testing** of relatives.
H: Other causes
P: Secondary causes of raised lipids include hypothyroidism, diabetes, nephrotic syndrome, liver disease, alcohol and some medicines; check for these before treating.
K: Non-HDL cholesterol guides treatment; NICE recommends QRISK3 and statins for those at 10% or more 10-year risk, aiming for a 40% fall in non-HDL; familial hypercholesterolaemia affects 1 in 250 and needs genetic and cascade testing.
!: Ignoring very high cholesterol in a young adult. It may indicate familial hypercholesterolaemia, which puts relatives at risk too.
EV: established | Statins reduce cardiovascular events in proportion to LDL lowering.
EV: established | Cascade testing for familial hypercholesterolaemia identifies affected relatives early.
T: Non-HDL cholesterol | Total cholesterol minus HDL cholesterol
T: QRISK3 | A tool estimating 10-year cardiovascular risk
T: Familial hypercholesterolaemia | An inherited disorder causing very high LDL cholesterol
SUM: Use non-HDL cholesterol.
SUM: Statins at QRISK3 10% or more.
SUM: Look for familial hypercholesterolaemia.
SRC: NICE, Cardiovascular disease: risk assessment and reduction, including lipid modification (NG238) | guidance | 2023 | https://www.nice.org.uk/guidance/ng238
SRC: NICE, Familial hypercholesterolaemia: identification and management (CG71) | guidance | 2019 | https://www.nice.org.uk/guidance/cg71
Q: How is non-HDL cholesterol calculated? | Total cholesterol minus HDL cholesterol.
Q: At what QRISK3 score does NICE recommend offering a statin for primary prevention? | 10% or more.
M1#medicine-u06-20-q1@1: How common is familial hypercholesterolaemia? | About 1 in 250 people | About 1 in 10 people | About 1 in 100,000 people | About 1 in 5 people | FH is one of the commonest inherited conditions.
M2#medicine-u06-20-q2@2: Total cholesterol is 5.5 mmol/L and HDL is 1.5 mmol/L. What is non-HDL cholesterol? | 4.0 mmol/L | 7.0 mmol/L | 3.7 mmol/L | 1.5 mmol/L | Applying the standard result: 5.5 − 1.5 = 4.0 mmol/L.
M3#medicine-u06-20-q3@3: A 30-year-old has total cholesterol of 9 mmol/L and a father who had a heart attack at 45. What should be done? | Assess for familial hypercholesterolaemia and refer for genetic and cascade testing | Reassure that cholesterol does not matter at 30 | Wait until age 40 to recheck | Advise diet only and no further action | High cholesterol with premature family CVD suggests FH.
NUM2#medicine-u06-20-q4@2: Non-HDL cholesterol is 4.8 mmol/L before treatment. What level would represent a 40% reduction, in mmol/L? | 2.88 | 0.01 | mmol/L | A 40% reduction leaves 60%: 4.8 × 0.6 = 2.88 mmol/L.
SA2#medicine-u06-20-q5@2,3: Explain the role of cascade testing in familial hypercholesterolaemia. | FH is inherited in an autosomal dominant pattern, so each first-degree relative of an affected person has a 50% chance of having it. Once a genetic variant is found in the index case, relatives can be tested, identifying affected people, including children, before they develop heart disease. Early lifestyle advice and lipid-lowering treatment greatly reduce their risk. | Inheritance ; Testing relatives ; Early identification ; Prevention
`;
