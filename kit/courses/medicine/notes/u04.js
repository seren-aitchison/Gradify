// MedGradify Respiratory Medicine (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## Ventilation, gas exchange and oxygen transport
LV: Preclinical · Foundation
S: The lungs move air in and out, exchange oxygen and carbon dioxide with the blood, and haemoglobin carries oxygen to the tissues. This lesson covers ventilation–perfusion matching, the oxygen–haemoglobin dissociation curve and normal arterial blood gas values.
O: Explain ventilation, perfusion and their matching
O: Describe the oxygen–haemoglobin dissociation curve and factors that shift it
O: Interpret normal arterial blood gas values
PRE: Gas exchange and breathing
H: Ventilation and perfusion
- **Ventilation** (V) brings air to the alveoli; **perfusion** (Q) brings blood to them.
- Gas exchange works best when V and Q are matched. **Dead space** is ventilated but not perfused (as in pulmonary embolism); **shunt** is perfused but not ventilated (as in pneumonia or collapse).
- **Hypoxic pulmonary vasoconstriction** diverts blood away from poorly ventilated areas, improving matching.
P: Carbon dioxide diffuses about 20 times more readily than oxygen, so V/Q mismatch usually lowers PaO_{2} before PaCO_{2} rises; increased breathing can blow off CO_{2} but can't fully correct hypoxaemia from shunt.
H: Oxygen transport
P: About 98% of oxygen in blood is bound to **haemoglobin**. The **oxygen–haemoglobin dissociation curve** is sigmoid: on the flat upper part, saturations stay high despite falls in PaO_{2}; on the steep part, small falls in PaO_{2} cause large falls in saturation.
- **Right shift** (oxygen released more easily): raised CO_{2}, raised H^{+} (acidosis), raised temperature, raised 2,3-DPG. This is the **Bohr effect** and helps unload oxygen in active tissues.
- **Left shift**: the opposite, and with fetal haemoglobin and carbon monoxide.
H: Normal blood gases (on air)
- pH 7.35–7.45; PaO_{2} about 10–13 kPa; PaCO_{2} about 4.7–6.0 kPa; bicarbonate about 22–26 mmol/L. Reference ranges vary between laboratories.
X: Reading a blood gas.
> A breathless patient on room air: pH 7.47, PaO_{2} 8.1 kPa, PaCO_{2} 3.9 kPa.
> Low PaO_{2}: hypoxaemia. Low PaCO_{2} with high pH: respiratory alkalosis from hyperventilation.
> Pattern suggests V/Q mismatch, such as pulmonary embolism or pneumonia.
> Interpret alongside the clinical picture and oxygen given; escalate a hypoxic patient promptly.
K: Gas exchange depends on matched ventilation and perfusion; oxygen is carried mainly by haemoglobin, whose sigmoid dissociation curve shifts right with acidosis, CO_{2}, heat and 2,3-DPG.
!: Interpreting PaO_{2} without knowing the inspired oxygen. A PaO_{2} of 12 kPa is normal on air but shows a large gas exchange defect on 60% oxygen.
EV: established | The physiology of V/Q matching and the dissociation curve is well established.
EV: established | Pulse oximetry can overestimate saturation in people with darker skin, a recognised source of hidden hypoxaemia (Sjoding et al., 2020).
T: Ventilation–perfusion matching | The balance between air reaching the alveoli and blood flow through the pulmonary capillaries
T: Shunt | Blood passing through the lungs without being oxygenated, because alveoli aren't ventilated
T: Bohr effect | The right shift of the oxygen dissociation curve caused by raised CO_{2} and acidity
SUM: Gas exchange requires matched ventilation and perfusion.
SUM: The dissociation curve shifts right with acidosis, CO_{2}, heat and 2,3-DPG.
SUM: Interpret blood gases with the inspired oxygen and clinical picture.
SRC: West J. B. and Luks A. M., West's Respiratory Physiology: The Essentials, 11th edition, Wolters Kluwer | secondary | 2020
SRC: Sjoding M. W. et al., "Racial bias in pulse oximetry measurement", New England Journal of Medicine 383(25), 2477–2478 | primary | 2020
Q: What is dead space ventilation? | Ventilation of alveoli that aren't perfused, so no gas exchange occurs.
Q: Name three factors that shift the oxygen dissociation curve to the right. | Any three of: raised CO2, acidosis, raised temperature, raised 2,3-DPG.
M1#medicine-u04-01-q1@1: What happens to oxygen release from haemoglobin when the curve shifts to the right? | Oxygen is released more easily to the tissues | Oxygen is held more tightly by haemoglobin | Haemoglobin can no longer carry oxygen | Carbon dioxide transport stops | A right shift lowers haemoglobin's affinity for oxygen, helping unloading in active tissues.
M2#medicine-u04-01-q2@2: In lobar pneumonia, consolidated alveoli are perfused but not ventilated. What is this called? | Shunt | Dead space | Hypoventilation | Diffusion limitation | Perfused but unventilated alveoli create a shunt, causing hypoxaemia that responds poorly to oxygen.
M3#medicine-u04-01-q3@3: A patient on 60% oxygen has a PaO_{2} of 12 kPa. What is the best interpretation? | Severe impairment of gas exchange, as this value is far below what 60% oxygen should give | A normal result, since 12 kPa is within the normal range | Hyperoxia needing the oxygen to be stopped | An error, because PaO_{2} can't be measured on oxygen | On high inspired oxygen, PaO_{2} should be much higher; the result shows a large A–a gradient.
TF1#medicine-u04-01-q4@1: Pulse oximetry can overestimate oxygen saturation in people with darker skin. | true | Studies have shown occult hypoxaemia is more often missed in people with darker skin.
SA2#medicine-u04-01-q5@2,3: Explain why V/Q mismatch usually causes hypoxaemia without a raised PaCO_{2}. | Carbon dioxide diffuses much more readily than oxygen and its content in blood is nearly linear with partial pressure, so increased ventilation of normal alveoli can remove extra CO_{2}. Oxygen saturation in well-ventilated alveoli is already near maximal on the flat part of the curve, so extra ventilation can't compensate for blood from poorly ventilated areas. The result is low PaO_{2} with normal or low PaCO_{2}. | CO2 diffusion and linear content ; Hyperventilation clears CO2 ; Flat top of oxygen curve ; Resulting pattern

## Lung function tests
LV: Clinical · Foundation
S: Lung function tests measure how much air the lungs hold and how quickly it can be moved. This lesson covers spirometry, peak flow, obstructive and restrictive patterns, reversibility, FeNO and gas transfer.
O: Interpret spirometry results as normal, obstructive or restrictive
O: Explain the uses of peak flow, FeNO and bronchodilator reversibility testing
O: Describe what gas transfer (TLCO) measures and when it is reduced
PRE: Ventilation, gas exchange and oxygen transport
H: Spirometry
- **FEV_{1}**: volume forcibly exhaled in the first second.
- **FVC**: the total volume forcibly exhaled.
- **FEV_{1}/FVC ratio**: normally above about 0.7 (lower limits fall with age).
P: **Obstructive** pattern: FEV_{1}/FVC below 0.7 (or below the lower limit of normal), as in asthma and COPD. **Restrictive** pattern: reduced FVC with a normal or high ratio, as in interstitial lung disease, chest wall disease or obesity.
H: Other tests
- **Peak expiratory flow (PEF)**: a quick measure of airflow; serial readings show variability in asthma.
- **Bronchodilator reversibility**: a significant rise in FEV_{1} after a bronchodilator supports asthma.
- **FeNO** (fractional exhaled nitric oxide): a marker of type 2 airway inflammation, used in the 2024 BTS/NICE/SIGN asthma guideline as part of diagnosis.
- **Gas transfer (TLCO or DLCO)**: how well gas crosses from alveoli to blood. Reduced in emphysema, interstitial lung disease, pulmonary vascular disease and anaemia.
X: Interpreting two results.
> Patient A: FEV_{1} 1.6 L (55% predicted), FVC 3.4 L (90%), ratio 0.47: obstructive.
> Patient B: FEV_{1} 1.9 L (65%), FVC 2.2 L (60%), ratio 0.86: restrictive pattern.
> A could be COPD or asthma; reversibility testing and history help.
> B needs further tests, such as gas transfer and imaging, to look for interstitial lung disease.
K: An FEV_{1}/FVC ratio below 0.7 shows obstruction; a low FVC with a normal ratio suggests restriction; peak flow variability, reversibility and FeNO support asthma; TLCO shows gas transfer.
!: Labelling a restrictive pattern on spirometry as proven restrictive lung disease. Spirometry suggests restriction; full lung volumes (total lung capacity) are needed to confirm it.
EV: established | Spirometry is the standard test for diagnosing airflow obstruction in COPD (NICE NG115).
EV: contested | Using a fixed FEV_{1}/FVC cut-off of 0.7 can over-diagnose obstruction in older people and under-diagnose it in younger people; lower limit of normal values are increasingly preferred.
T: FEV_{1} | Forced expiratory volume in one second
T: FVC | Forced vital capacity, the total volume exhaled forcibly after a full breath in
T: TLCO | Transfer factor for carbon monoxide, a measure of gas exchange across the alveolar membrane
SUM: Obstructive: ratio below 0.7. Restrictive: low FVC with normal ratio.
SUM: Peak flow, reversibility and FeNO support asthma diagnosis.
SUM: TLCO measures gas transfer.
SRC: NICE, Chronic obstructive pulmonary disease in over 16s: diagnosis and management (NG115) | guidance | 2019 | https://www.nice.org.uk/guidance/ng115
SRC: BTS, NICE and SIGN, Asthma: diagnosis, monitoring and chronic asthma management (NG245) | guidance | 2024 | https://www.nice.org.uk/guidance/ng245
Q: What FEV_{1}/FVC ratio indicates airflow obstruction? | Below 0.7 (or below the lower limit of normal).
Q: What does FeNO measure? | Fractional exhaled nitric oxide, a marker of type 2 airway inflammation.
M1#medicine-u04-02-q1@1: Which spirometry pattern is typical of COPD? | Reduced FEV_{1}/FVC ratio below 0.7 | Normal ratio with reduced FVC | Raised FEV_{1} and FVC | Normal FEV_{1} with low ratio above 1 | COPD causes airflow obstruction, reducing FEV_{1} more than FVC.
M2#medicine-u04-02-q2@2: A patient has FEV_{1} 2.0 L, FVC 2.4 L and a reduced TLCO. Which condition is most consistent? | Interstitial lung disease | Asthma | Chronic bronchitis with normal gas transfer | Normal lungs | A ratio of 0.83 with low FVC suggests restriction; low TLCO suggests a disorder of the alveolar membrane such as fibrosis.
M3#medicine-u04-02-q3@3: An 80-year-old never-smoker without symptoms has an FEV_{1}/FVC of 0.68. What is the most appropriate interpretation? | The fixed 0.7 cut-off may over-diagnose obstruction with ageing; compare with the lower limit of normal and clinical context | This definitely confirms COPD and needs inhalers | The result is impossible in a never-smoker | Spirometry is invalid in people over 75 | The ratio falls with age; using the lower limit of normal and the clinical picture avoids over-diagnosis.
MATCH1#medicine-u04-02-q4@1: Match each result to its likely meaning. | Ratio 0.5 = Obstruction ; Low FVC with ratio 0.9 = Possible restriction ; Large rise in FEV_{1} after salbutamol = Reversibility suggesting asthma ; Low TLCO with normal spirometry = Possible pulmonary vascular disease or anaemia | Each pattern points towards a different group of conditions.
SA2#medicine-u04-02-q5@2,3: Explain how spirometry distinguishes obstructive from restrictive lung disease. | In obstruction, narrowed airways slow expiration, so FEV_{1} falls more than FVC and the ratio drops below 0.7, as in COPD and asthma. In restriction, the lungs or chest wall can't expand fully, so both FEV_{1} and FVC fall in proportion and the ratio is normal or high, as in fibrosis. Lung volumes and gas transfer help confirm the type. | Obstruction mechanism ; Obstruction values ; Restriction mechanism and values ; Further tests

## Respiratory failure: type 1 and type 2
LV: Clinical · Application
S: Respiratory failure occurs when the lungs fail to oxygenate the blood or remove carbon dioxide adequately. This lesson defines type 1 and type 2 failure, their causes, how to target oxygen therapy safely, and when non-invasive ventilation is used.
O: Define type 1 and type 2 respiratory failure using blood gas values
O: List the causes of each type
O: Apply BTS principles of target-range oxygen therapy and indications for NIV
PRE: Ventilation, gas exchange and oxygen transport
H: Definitions
- **Type 1** (hypoxaemic): PaO_{2} below 8 kPa with normal or low PaCO_{2}. Caused by V/Q mismatch or shunt: pneumonia, pulmonary oedema, pulmonary embolism, asthma, ARDS, fibrosis.
- **Type 2** (hypercapnic): PaO_{2} below 8 kPa with PaCO_{2} above about 6.0 kPa. Caused by alveolar **hypoventilation**: COPD, severe asthma (late, exhaustion), neuromuscular disease, chest wall deformity, obesity hypoventilation, opioid or sedative overdose.
P: In type 2 failure, a low pH shows **acute** (or acute-on-chronic) failure; a normal pH with raised bicarbonate suggests chronic, compensated failure.
H: Oxygen therapy (BTS guideline)
- Oxygen is a **drug**: it should be prescribed with a **target saturation range**.
- Most acutely ill patients: **94–98%**.
- Patients at risk of hypercapnic respiratory failure (such as COPD, obesity hypoventilation, neuromuscular disease): **88–92%**, adjusted by blood gas results.
- In critical illness (such as cardiac arrest, shock), give high-concentration oxygen immediately and seek senior help.
H: Non-invasive ventilation
P: **NIV** (BiPAP) is recommended for acute hypercapnic respiratory failure in COPD when respiratory acidosis (pH below 7.35 and PaCO_{2} above 6.5 kPa) persists despite optimal initial treatment (BTS/ICS, 2016). A ceiling of treatment and escalation plan should be agreed.
X: A woman with COPD is drowsy after high-flow oxygen in the ambulance.
> Blood gas: pH 7.26, PaCO_{2} 9.4 kPa, PaO_{2} 11.5 kPa, bicarbonate 31 mmol/L.
> Acute-on-chronic type 2 respiratory failure, worsened by uncontrolled oxygen.
> Reduce oxygen to target 88–92%, give nebulised bronchodilators and treat the exacerbation.
> If acidosis persists, NIV is indicated; involve senior and critical care teams.
K: Type 1 failure is low oxygen with normal or low CO_{2}; type 2 adds raised CO_{2} from hypoventilation; prescribe oxygen to a target range (88–92% for those at risk of hypercapnia) and use NIV for persisting hypercapnic acidosis in COPD.
!: Withholding oxygen from a hypoxic patient with COPD for fear of CO_{2} retention. Hypoxaemia kills; give controlled oxygen to the 88–92% target and monitor with blood gases.
EV: established | Uncontrolled high-flow oxygen increases mortality in COPD exacerbations compared with titrated oxygen (Austin et al., 2010).
EV: established | NIV reduces mortality and intubation in acute hypercapnic respiratory failure due to COPD.
T: Type 1 respiratory failure | PaO_{2} below 8 kPa with normal or low PaCO_{2}
T: Type 2 respiratory failure | PaO_{2} below 8 kPa with raised PaCO_{2}, caused by hypoventilation
T: Non-invasive ventilation | Ventilatory support through a tight-fitting mask without intubation
SUM: Type 1: hypoxaemia; type 2: hypoxaemia with hypercapnia.
SUM: Prescribe oxygen to a target range: 94–98% or 88–92%.
SUM: NIV for persisting hypercapnic acidosis in COPD.
SRC: O'Driscoll B. R. et al., "BTS guideline for oxygen use in healthcare and emergency settings", Thorax 72(Suppl 1), ii1–ii90 | guidance | 2017
SRC: Davidson A. C. et al., "BTS/ICS guideline for the ventilatory management of acute hypercapnic respiratory failure in adults", Thorax 71(Suppl 2), ii1–ii35 | guidance | 2016
SRC: Austin M. A. et al., "Effect of high flow oxygen on mortality in chronic obstructive pulmonary disease patients in prehospital setting: randomised controlled trial", BMJ 341, c5462 | primary | 2010
Q: What blood gas values define type 2 respiratory failure? | PaO_{2} below 8 kPa with PaCO_{2} above about 6.0 kPa.
Q: What target saturation range is used for patients at risk of hypercapnic respiratory failure? | 88–92%.
M1#medicine-u04-03-q1@1: Which condition typically causes type 1 respiratory failure? | Pneumonia | Opioid overdose | Motor neurone disease | Severe kyphoscoliosis | Pneumonia causes V/Q mismatch and shunt without hypoventilation.
M2#medicine-u04-03-q2@2: A blood gas shows pH 7.38, PaCO_{2} 7.2 kPa, bicarbonate 33 mmol/L and PaO_{2} 7.6 kPa. What does it show? | Chronic compensated type 2 respiratory failure | Acute type 1 respiratory failure | Acute uncompensated type 2 failure | Normal blood gases | Raised CO_{2} with a normal pH and raised bicarbonate indicates chronic compensation.
M3#medicine-u04-03-q3@3: An acutely breathless woman with no lung disease has saturations of 85% on air. What is the immediate oxygen target? | 94–98% | 88–92% | 100% for every patient | No oxygen until a blood gas is available | Without risk factors for hypercapnia, the BTS target is 94–98%; start oxygen and escalate.
TF1#medicine-u04-03-q4@1: Oxygen should be prescribed with a target saturation range. | true | BTS guidance treats oxygen as a drug with a prescribed target range.
SA2#medicine-u04-03-q5@2,3: Explain why patients with COPD can develop worsening hypercapnia when given uncontrolled high-flow oxygen. | High oxygen releases hypoxic pulmonary vasoconstriction, worsening V/Q mismatch and increasing dead space; the Haldane effect reduces CO_{2} carriage by haemoglobin; and in some patients reduced respiratory drive contributes. CO_{2} rises, causing acidosis and drowsiness. Controlled oxygen to 88–92% avoids this while treating hypoxaemia. | V/Q mismatch from loss of vasoconstriction ; Haldane effect ; Reduced drive ; Controlled oxygen target

## Asthma
LV: Clinical · Application
S: Asthma is a chronic inflammatory airway disease with variable symptoms and airflow obstruction. This lesson covers diagnosis and management under the 2024 BTS/NICE/SIGN guideline, the shift away from SABA-only treatment, and the recognition and initial management of acute asthma.
O: Describe the features and diagnosis of asthma in adults
O: Outline the 2024 BTS/NICE/SIGN approach to treatment, including anti-inflammatory reliever therapy
O: Classify the severity of acute asthma and describe initial management
PRE: Lung function tests
H: Features and diagnosis
- **Symptoms**: wheeze, breathlessness, chest tightness and cough, variable over time, often worse at night or with triggers (allergens, exercise, cold air, infections).
- **Diagnosis** (2024 guideline, adults): objective tests are needed. Tests include **blood eosinophils or FeNO** (to show type 2 inflammation), then **bronchodilator reversibility** with spirometry, and **peak flow variability** or bronchial challenge testing if needed.
H: Management
- **Anti-inflammatory reliever (AIR)**: for newly diagnosed adults, an as-needed **low-dose ICS–formoterol** inhaler.
- **MART** (maintenance and reliever therapy) with ICS–formoterol if symptoms aren't controlled.
- Further steps include higher-dose MART, adding other agents, and specialist referral for biologics in severe asthma.
- **SABA alone isn't recommended**: overuse of SABA without ICS is linked to asthma deaths.
- Check **inhaler technique**, adherence and triggers; give a **personalised action plan**.
H: Acute asthma (BTS/SIGN)
- **Moderate**: PEF 50–75% of best or predicted.
- **Acute severe**: PEF 33–50%, respiratory rate 25 or more, heart rate 110 or more, can't complete sentences.
- **Life-threatening**: PEF below 33%, SpO_{2} below 92%, silent chest, cyanosis, poor respiratory effort, arrhythmia, exhaustion, altered consciousness, hypotension.
- **Near-fatal**: raised PaCO_{2} or need for ventilation.
P: Initial treatment: oxygen to 94–98%, nebulised short-acting bronchodilators, systemic corticosteroids, nebulised ipratropium in severe attacks, and IV magnesium for acute severe or life-threatening asthma, following local protocols. **Life-threatening features need immediate senior and critical care involvement.**
X: A 24-year-old with asthma attends with breathlessness.
> She can't complete sentences; respiratory rate 28; heart rate 118; PEF 40% of best.
> SpO_{2} 94% on air; chest isn't silent.
> Classification: acute severe asthma.
> Start oxygen, nebulised bronchodilators and steroids; senior review; reassess frequently. A normal or rising PaCO_{2} would be a danger sign.
K: Asthma needs objective diagnosis; adults now start on as-needed ICS–formoterol rather than SABA alone; acute asthma is graded by PEF and clinical features, and life-threatening features demand immediate escalation.
!: Being reassured by a normal PaCO_{2} in acute asthma. In a severe attack, CO_{2} should be low from hyperventilation; a normal or raised level suggests exhaustion and near-fatal asthma.
EV: established | The National Review of Asthma Deaths (2014) found many deaths involved excessive SABA use and under-use of preventer therapy.
EV: contested | The 2024 guideline's move to AIR therapy for all newly diagnosed adults is supported by trials such as SYGMA and Novel START, but implementation and cost effects are still being evaluated.
T: Anti-inflammatory reliever | An as-needed inhaler containing ICS and formoterol, used to relieve symptoms while treating inflammation
T: MART | Maintenance and reliever therapy with a single ICS–formoterol inhaler
T: Silent chest | Very poor air entry in severe asthma, a life-threatening sign
SUM: Diagnose asthma with objective tests: eosinophils or FeNO, reversibility, peak flow variability.
SUM: Start adults on as-needed ICS–formoterol; avoid SABA alone.
SUM: Grade acute asthma and escalate life-threatening features immediately.
SRC: BTS, NICE and SIGN, Asthma: diagnosis, monitoring and chronic asthma management (NG245) | guidance | 2024 | https://www.nice.org.uk/guidance/ng245
SRC: Royal College of Physicians, Why asthma still kills: the National Review of Asthma Deaths | guidance | 2014 | https://www.rcp.ac.uk/improving-care/resources/why-asthma-still-kills/
SRC: British Thoracic Society and SIGN, British guideline on the management of asthma (SIGN 158) | guidance | 2019
Q: Name three life-threatening features of acute asthma. | Any three of: PEF below 33%, SpO2 below 92%, silent chest, cyanosis, poor respiratory effort, arrhythmia, exhaustion, altered consciousness, hypotension.
Q: What is the recommended initial treatment for a newly diagnosed adult with asthma under the 2024 guideline? | As-needed low-dose ICS–formoterol (anti-inflammatory reliever therapy).
M1#medicine-u04-04-q1@1: Which PEF range defines acute severe asthma? | 33–50% of best or predicted | 75–100% of best or predicted | 50–75% of best or predicted | Below 20% only | Acute severe asthma is PEF 33–50%, with other features such as being unable to complete sentences.
M2#medicine-u04-04-q2@2: Why does current guidance advise against treating asthma with SABA alone? | SABA overuse without inhaled steroids is associated with severe attacks and asthma deaths | SABAs are no longer licensed in the UK for any use | SABAs are more expensive than every other inhaler | SABAs cause type 2 inflammation directly | Relying on SABA treats symptoms but not inflammation; reviews of asthma deaths found excessive SABA use.
M3#medicine-u04-04-q3@3: A man in a severe asthma attack has a PaCO_{2} of 5.8 kPa and appears tired. What is the most important interpretation? | A normal PaCO_{2} in a severe attack suggests exhaustion and possible near-fatal asthma; escalate immediately | A normal PaCO_{2} shows the attack is mild | It shows he is hyperventilating normally | It means no further treatment is needed | In severe asthma, CO_{2} should be low; normal or rising CO_{2} with fatigue warns of respiratory failure.
SEQ1#medicine-u04-04-q4@2: Order the steps in confirming asthma in an adult under the 2024 guideline. | Clinical history suggesting asthma ; Blood eosinophils or FeNO ; Spirometry with bronchodilator reversibility ; Peak flow variability or challenge test if still unclear | Objective tests are used in sequence to confirm the diagnosis.
SA2#medicine-u04-04-q5@2,3: Describe the recognition and initial management of acute severe asthma in an adult. | Recognise acute severe asthma from PEF 33–50%, respiratory rate 25 or more, heart rate 110 or more, or inability to complete sentences, and check for life-threatening features. Give oxygen to 94–98%, nebulised short-acting bronchodilators and systemic corticosteroids, add nebulised ipratropium and consider IV magnesium as per protocol. Seek senior help, monitor closely with repeat PEF, saturations and blood gases, and escalate to critical care if features worsen. | Recognition criteria ; Oxygen and bronchodilators ; Steroids and additional therapy ; Monitoring and escalation

## Chronic obstructive pulmonary disease (COPD)
LV: Clinical · Application
S: COPD is a common, progressive lung disease with airflow obstruction, mainly caused by smoking. This lesson covers its diagnosis, NICE's approach to treatment, pulmonary rehabilitation, long-term oxygen and the management of exacerbations.
O: Describe the causes, features and diagnosis of COPD
O: Outline NICE NG115's approach to non-drug and inhaled treatment
O: Recognise and manage an acute exacerbation of COPD
PRE: Respiratory failure: type 1 and type 2
H: Causes and diagnosis
- **Causes**: smoking (the main cause in the UK), occupational dusts and fumes, biomass smoke, and rarely alpha-1 antitrypsin deficiency.
- **Features**: progressive exertional breathlessness, chronic cough, sputum, frequent winter "bronchitis".
- **Diagnosis**: post-bronchodilator spirometry showing FEV_{1}/FVC below 0.7 in someone with symptoms and risk factors. The **MRC dyspnoea scale** grades breathlessness.
H: Management (NICE NG115)
- **Fundamentals for all**: stopping smoking (the only intervention shown to slow decline in lung function), influenza and pneumococcal vaccination, **pulmonary rehabilitation** for those functionally limited (MRC grade 3 or above), self-management plans and treatment of comorbidities.
- **Inhaled therapy**: short-acting bronchodilator as needed; then, if no asthmatic or steroid-responsive features, **LAMA + LABA**; if asthmatic features (such as raised eosinophils, previous asthma diagnosis, marked variability), **LABA + ICS**; triple therapy (LAMA + LABA + ICS) for ongoing symptoms or exacerbations.
- **Long-term oxygen therapy**: assessed for people with a stable PaO_{2} below 7.3 kPa, or below 8 kPa with polycythaemia, peripheral oedema or pulmonary hypertension, who don't smoke.
H: Exacerbations
P: An **exacerbation** is a sustained worsening of breathlessness, cough or sputum. Common triggers are viral and bacterial infections. Treatment includes increased bronchodilators, oral corticosteroids, antibiotics if sputum is purulent or there are signs of pneumonia, controlled oxygen to 88–92%, and NIV for persisting hypercapnic acidosis.
X: A 68-year-old ex-smoker with COPD.
> MRC grade 3 (stops for breath after 100 m); FEV_{1} 48% predicted; no asthmatic features.
> Offer pulmonary rehabilitation and check vaccinations.
> Inhaled therapy: LAMA + LABA, with technique checked.
> Agree a self-management plan, including when to start rescue medicines and when to seek help.
K: COPD is diagnosed by post-bronchodilator obstruction in a person with risk factors; smoking cessation, vaccination and pulmonary rehabilitation come first, then inhaled therapy guided by asthmatic features; exacerbations need controlled oxygen and escalation when needed.
!: Starting inhaled corticosteroids routinely in COPD. ICS increases pneumonia risk and is reserved for those with asthmatic or steroid-responsive features or frequent exacerbations.
EV: established | Smoking cessation slows the decline of lung function in COPD (Lung Health Study, Anthonisen et al., 1994).
EV: established | Pulmonary rehabilitation improves exercise capacity and quality of life and reduces admissions after exacerbations.
T: COPD | A chronic lung disease with persistent, usually progressive airflow obstruction, mainly caused by smoking
T: MRC dyspnoea scale | A five-point scale grading how breathlessness limits activity
T: Exacerbation of COPD | A sustained worsening of symptoms beyond normal day-to-day variation
SUM: Diagnosis needs post-bronchodilator obstruction and a compatible history.
SUM: Smoking cessation, vaccination and rehabilitation for all; LAMA + LABA or LABA + ICS by phenotype.
SUM: Exacerbations: bronchodilators, steroids, antibiotics if indicated, controlled oxygen, NIV.
SRC: NICE, Chronic obstructive pulmonary disease in over 16s: diagnosis and management (NG115) | guidance | 2019 | https://www.nice.org.uk/guidance/ng115
SRC: Anthonisen N. R. et al., "Effects of smoking intervention and the use of an inhaled anticholinergic bronchodilator on the rate of decline of FEV1: the Lung Health Study", JAMA 272(19), 1497–1505 | primary | 1994
Q: What is the only intervention shown to slow the decline of lung function in COPD? | Stopping smoking.
Q: When is pulmonary rehabilitation offered in COPD? | To people functionally limited by breathlessness, usually MRC grade 3 or above, including after an exacerbation.
M1#medicine-u04-05-q1@1: Which test confirms the diagnosis of COPD? | Post-bronchodilator spirometry | Chest X-ray alone | Peak flow measured once | Full blood count | Spirometry after a bronchodilator shows persistent airflow obstruction.
M2#medicine-u04-05-q2@2: A man with COPD has no asthmatic features and ongoing breathlessness on a short-acting bronchodilator. What does NICE recommend next? | LAMA plus LABA | LABA plus ICS | Oral steroids long term | Theophylline alone | Without asthmatic or steroid-responsive features, NICE recommends LAMA + LABA.
M3#medicine-u04-05-q3@3: A woman with COPD who still smokes 15 cigarettes a day has a resting PaO_{2} of 7.0 kPa. What is the most appropriate step regarding long-term oxygen? | Support her to stop smoking first, as oxygen isn't offered to people who smoke because of fire risk | Prescribe home oxygen immediately regardless of smoking | Prescribe oxygen only at night while she continues smoking | Refuse all treatment until she stops | NICE advises not offering long-term oxygen to people who smoke, because of fire risk and reduced benefit; smoking cessation is the priority.
TF1#medicine-u04-05-q4@1: Inhaled corticosteroids increase the risk of pneumonia in people with COPD. | true | This risk is why ICS is reserved for people with asthmatic features or frequent exacerbations.
SA2#medicine-u04-05-q5@2,3: Describe the management of an acute exacerbation of COPD in hospital. | Assess using ABCDE and blood gases; give controlled oxygen to target 88–92%; nebulised bronchodilators; oral corticosteroids; antibiotics if sputum is purulent or there is pneumonia; chest X-ray to look for pneumonia or pneumothorax. If respiratory acidosis persists after initial treatment, start NIV with a ceiling of treatment agreed. Plan rehabilitation and follow-up on recovery. | Assessment and controlled oxygen ; Bronchodilators and steroids ; Antibiotics if indicated ; NIV and escalation or follow-up

## Bronchiectasis and cystic fibrosis
LV: Clinical · Application
S: Bronchiectasis is permanent dilatation of the airways with chronic infection; cystic fibrosis is an inherited cause. This lesson covers causes, presentation and diagnosis of bronchiectasis, and the genetics, screening and modern treatment of cystic fibrosis.
O: Describe the causes, features and diagnosis of bronchiectasis
O: Explain the genetics, diagnosis and screening of cystic fibrosis
O: Outline principles of management, including airway clearance and CFTR modulators
PRE: Lung function tests
H: Bronchiectasis
- **Pathology**: damaged, permanently widened bronchi that clear mucus poorly, leading to a cycle of infection and inflammation.
- **Causes**: previous severe infection (including whooping cough, measles, TB), cystic fibrosis, immune deficiency, allergic bronchopulmonary aspergillosis, primary ciliary dyskinesia, rheumatoid arthritis and inflammatory bowel disease; often no cause is found.
- **Features**: daily productive cough with large volumes of sputum, recurrent chest infections, haemoptysis, coarse crackles, clubbing in some.
- **Diagnosis**: **high-resolution CT** (airways wider than accompanying arteries, lack of tapering).
- **Management** (BTS 2019): airway clearance physiotherapy, treating exacerbations with antibiotics guided by sputum cultures (watch for *Pseudomonas aeruginosa*), vaccination, and long-term macrolides for frequent exacerbations in selected patients.
P: Bronchiectasis is often under-recognised. Many people are first diagnosed with "recurrent chest infections" or COPD, so a history of daily sputum and frequent infections should prompt imaging.
H: Cystic fibrosis
- **Genetics**: autosomal recessive mutations in the **CFTR** gene, which codes for a chloride channel. The most common mutation is **F508del**. About 1 in 25 people of white European ancestry carry a mutation.
- **Effects**: thick secretions in lungs, pancreas (malabsorption, diabetes), liver, gut and reproductive tract.
- **Diagnosis**: newborn **heel-prick screening** (immunoreactive trypsinogen) followed by **sweat chloride test** and genetic testing.
- **Treatment**: specialist CF centres; airway clearance, antibiotics, pancreatic enzyme replacement, nutrition; **CFTR modulators** such as elexacaftor–tezacaftor–ivacaftor have transformed lung function and survival for most people with CF.
X: A 45-year-old woman with daily cough and recurrent infections.
> She produces a cupful of green sputum daily and had whooping cough as a child.
> HRCT shows dilated bronchi in both lower lobes.
> Sputum grows *Pseudomonas aeruginosa*.
> Management: airway clearance, specialist follow-up and treatment of exacerbations guided by cultures.
K: Bronchiectasis is permanent airway dilatation with chronic infection, diagnosed by HRCT and managed with airway clearance and targeted antibiotics; cystic fibrosis is an autosomal recessive CFTR disorder detected by newborn screening and now treated with CFTR modulators.
!: Labelling chronic productive cough as COPD without considering bronchiectasis. Large daily sputum volumes, especially in a non-smoker or with recurrent infections, should prompt HRCT.
EV: established | CFTR modulator therapy markedly improves lung function and outcomes in eligible people with CF (Middleton et al., 2019).
EV: established | *Pseudomonas aeruginosa* colonisation is associated with worse outcomes in bronchiectasis.
T: Bronchiectasis | Permanent, abnormal dilatation of the bronchi with impaired mucus clearance
T: CFTR | Cystic fibrosis transmembrane conductance regulator, a chloride channel defective in cystic fibrosis
T: Sweat test | A test measuring chloride in sweat, raised in cystic fibrosis
SUM: Bronchiectasis: chronic sputum and infections; HRCT for diagnosis; airway clearance.
SUM: CF: autosomal recessive CFTR mutation; newborn screening and sweat test.
SUM: CFTR modulators have transformed CF outcomes.
SRC: Hill A. T. et al., "British Thoracic Society guideline for bronchiectasis in adults", Thorax 74(Suppl 1), 1–69 | guidance | 2019
SRC: Middleton P. G. et al., "Elexacaftor–tezacaftor–ivacaftor for cystic fibrosis with a single Phe508del allele", New England Journal of Medicine 381(19), 1809–1819 | primary | 2019
Q: How is bronchiectasis diagnosed? | High-resolution CT showing permanently dilated bronchi.
Q: What is the inheritance pattern of cystic fibrosis? | Autosomal recessive.
M1#medicine-u04-06-q1@1: Which gene is mutated in cystic fibrosis? | CFTR | BRCA1 | HFE | APC | CF is caused by mutations in the CFTR chloride channel gene.
M2#medicine-u04-06-q2@2: Two parents are both carriers of a CFTR mutation. What is the chance that each child has cystic fibrosis? | 1 in 4 | 1 in 2 | 1 in 25 | 1 in 100 | With autosomal recessive inheritance and two carrier parents, each child has a 25% chance of CF.
M3#medicine-u04-06-q3@3: A non-smoker with daily large-volume purulent sputum and recurrent infections is labelled as having COPD. What is the best next step? | Arrange HRCT to look for bronchiectasis and test for underlying causes | Start inhaled steroids for COPD without further tests | Reassure, as this is normal for older adults | Stop all antibiotics to reduce resistance | This pattern suggests bronchiectasis, which needs HRCT and cause-finding.
TF1#medicine-u04-06-q4@1: Newborn screening for cystic fibrosis in the UK uses the heel-prick blood test. | true | Immunoreactive trypsinogen is measured in the newborn blood spot, followed by confirmatory tests.
SA2#medicine-u04-06-q5@2,3: Explain how cystic fibrosis causes lung disease and how CFTR modulators help. | Defective CFTR reduces chloride and water secretion on airway surfaces, making mucus thick and sticky. Mucociliary clearance fails, so bacteria such as *Staphylococcus aureus* and *Pseudomonas* colonise the airways, causing chronic infection, inflammation and bronchiectasis. CFTR modulators improve the folding, trafficking or opening of the faulty channel, restoring some function, improving lung function and reducing exacerbations. | Chloride and water transport ; Thick mucus and failed clearance ; Infection and inflammation ; Modulator mechanism

## Community-acquired pneumonia
LV: Clinical · Application
S: Community-acquired pneumonia (CAP) is infection of the lung tissue acquired outside hospital. This lesson covers its causes and features, severity assessment with CURB-65, investigations and the principles of management in line with NICE.
O: Describe the common causes and clinical features of community-acquired pneumonia
O: Calculate and use the CURB-65 and CRB-65 scores
O: Outline investigation and management, including timing of antibiotics and follow-up
PRE: Respiratory failure: type 1 and type 2
H: Causes and features
- **Organisms**: *Streptococcus pneumoniae* (most common), *Haemophilus influenzae*, *Mycoplasma pneumoniae*, *Staphylococcus aureus* (after influenza), *Legionella*, viruses including influenza and SARS-CoV-2.
- **Features**: cough, fever, breathlessness, pleuritic chest pain, purulent sputum; in older people, confusion or falls may be the main sign.
- **Signs**: raised respiratory rate, crackles, bronchial breathing, dullness to percussion over consolidation.
H: Severity assessment
E: CURB-65: Confusion; Urea over 7 mmol/L; Respiratory rate 30 or more; Blood pressure systolic below 90 or diastolic 60 or less; age 65 or over :: one point each
- **0–1**: low severity; consider home treatment.
- **2**: moderate; consider hospital-based care.
- **3–5**: high severity; urgent hospital admission and consider critical care.
P: In the community, **CRB-65** (without urea) is used. Scores support but don't replace clinical judgement; NEWS2 and oxygen saturation also guide escalation.
H: Investigations and management (NICE CG191, NG138)
- **Chest X-ray** to confirm consolidation in hospital; blood tests including CRP, urea and electrolytes; blood and sputum cultures and urinary antigens for moderate or high severity.
- **Antibiotics** within **4 hours** of presentation to hospital, chosen by severity and local guidance.
- **Oxygen** to target saturations; fluids; analgesia; sepsis pathway if indicated.
- Explain expected recovery (cough may last 6 weeks) and safety-net.
X: A 72-year-old man with pneumonia.
> Confused (new), urea 9 mmol/L, respiratory rate 24, BP 128/76, age 72.
> CURB-65: confusion 1 + urea 1 + age 1 = 3: high severity.
> Admit, start antibiotics within 4 hours following local guidance, take cultures, give oxygen to target.
> Senior review and consider critical care involvement.
K: CAP is most often caused by *S. pneumoniae*; CURB-65 (or CRB-65) guides where and how to treat; give antibiotics within 4 hours in hospital and escalate high-severity cases.
!: Relying on the CURB-65 score alone. A young patient with a low score but very low oxygen saturation or sepsis needs urgent hospital care; the score supports judgement.
EV: established | CURB-65 predicts 30-day mortality in CAP (Lim et al., 2003).
EV: contested | The benefit of routine follow-up chest X-ray after pneumonia is debated; NICE advises against routine repeat X-ray in people whose symptoms have resolved.
T: CURB-65 | A pneumonia severity score using confusion, urea, respiratory rate, blood pressure and age 65 or over
T: Consolidation | Lung tissue filled with fluid or inflammatory cells, seen on X-ray in pneumonia
T: Bronchial breathing | Harsh breath sounds heard over consolidated lung
SUM: *S. pneumoniae* is the most common cause.
SUM: CURB-65: 0–1 low, 2 moderate, 3–5 high severity.
SUM: Antibiotics within 4 hours in hospital; oxygen and sepsis care as needed.
SRC: NICE, Pneumonia in adults: diagnosis and management (CG191) | guidance | 2023 | https://www.nice.org.uk/guidance/cg191
SRC: NICE, Pneumonia (community-acquired): antimicrobial prescribing (NG138) | guidance | 2019 | https://www.nice.org.uk/guidance/ng138
SRC: Lim W. S. et al., "Defining community acquired pneumonia severity on presentation to hospital: an international derivation and validation study", Thorax 58(5), 377–382 | primary | 2003
Q: What does CURB-65 stand for? | Confusion, urea over 7 mmol/L, respiratory rate 30 or more, low blood pressure, age 65 or over.
Q: What is the most common cause of community-acquired pneumonia? | Streptococcus pneumoniae.
M1#medicine-u04-07-q1@1: What CURB-65 score suggests high-severity pneumonia? | 3 to 5 | 0 to 1 | 2 | Only exactly 5 | A score of 3 or more indicates high severity with higher mortality.
M2#medicine-u04-07-q2@2: A 70-year-old with pneumonia has a respiratory rate of 32, BP 100/58, no confusion and urea 6 mmol/L. What is the CURB-65 score? | 3 | 2 | 4 | 1 | Respiratory rate 30 or more (1), diastolic 60 or less (1) and age 65 or over (1) give 3.
M3#medicine-u04-07-q3@3: A 30-year-old with pneumonia has a CURB-65 of 0 but saturations of 87% on air. What is the best action? | Arrange hospital assessment and oxygen, as hypoxaemia overrides the low score | Treat at home because the score is 0 | Prescribe antibiotics and review in two weeks | Repeat the score tomorrow | Scores support judgement; significant hypoxaemia needs hospital care.
NUM1#medicine-u04-07-q4@1: A patient with pneumonia is 82, confused, has urea 8.5 mmol/L, respiratory rate 22 and BP 132/80. What is the CURB-65 score? | 3 | 0 | points | Confusion 1, urea over 7 1, age 65 or over 1: a total of 3.
SA2#medicine-u04-07-q5@2,3: Describe the hospital management of high-severity community-acquired pneumonia. | Assess with ABCDE and NEWS2; give oxygen to target saturations; take blood cultures, sputum cultures and urinary antigens; start antibiotics within 4 hours following local guidance for high severity; give fluids and follow the sepsis pathway if indicated; seek senior review and consider critical care involvement; monitor closely and review antibiotics with culture results. | Assessment and oxygen ; Cultures and investigations ; Antibiotics within 4 hours ; Escalation and monitoring

## Tuberculosis
LV: Clinical · Application
S: Tuberculosis (TB) is a bacterial infection, usually of the lungs, that remains a major global cause of death. This lesson covers latent and active TB, who is at risk, diagnosis, standard treatment and the public health response in the UK.
O: Distinguish latent from active tuberculosis and identify risk factors
O: Describe the investigation of suspected pulmonary TB
O: Outline standard treatment, drug adverse effects and public health measures
PRE: Community-acquired pneumonia
H: Infection and risk
P: *Mycobacterium tuberculosis* spreads by airborne droplets from people with active pulmonary TB. Most infected people control it as **latent TB infection** (no symptoms, not infectious); about 5–10% develop **active TB** in their lifetime, most often in the first two years.
- **Risk factors**: birth in or travel to countries with high TB incidence, close contact with a case, HIV, diabetes, immunosuppression (including biologics), homelessness, prison, alcohol or drug dependence.
H: Features and diagnosis
- **Pulmonary TB**: persistent cough over 3 weeks, haemoptysis, fever, night sweats, weight loss.
- **Extrapulmonary TB**: lymph nodes, spine (Pott's disease), meninges, abdomen and others.
- **Investigations**: chest X-ray (upper lobe consolidation or cavitation); **three sputum samples** for microscopy (acid-fast bacilli, Ziehl–Neelsen stain), **culture** (the gold standard, taking weeks) and rapid **nucleic acid amplification tests** that also detect rifampicin resistance.
- **Latent TB testing**: interferon-gamma release assay (IGRA) or tuberculin skin test.
H: Treatment and public health
- **Standard regimen** for drug-sensitive active TB (NICE NG33): **rifampicin, isoniazid, pyrazinamide and ethambutol** for 2 months, then rifampicin and isoniazid for 4 more months (6 months in total).
- **Adverse effects**: rifampicin (orange body fluids, liver enzyme induction reducing the effect of other drugs, including contraceptives), isoniazid (peripheral neuropathy, prevented with pyridoxine; hepatitis), pyrazinamide (hepatitis, gout), ethambutol (optic neuritis: check vision).
- **Adherence** is essential; directly observed therapy is used for people at risk of not completing.
- TB is a **notifiable disease** in the UK; UKHSA organises **contact tracing**.
X: A 32-year-old with cough for 6 weeks and night sweats.
> He moved from a high-incidence country 18 months ago.
> Chest X-ray shows right upper lobe cavitation.
> Sputum NAAT detects *M. tuberculosis* with no rifampicin resistance.
> Isolate appropriately, notify, refer to the TB service for standard 6-month treatment and contact tracing.
K: TB spreads by droplets; latent infection can reactivate; diagnose active disease with X-ray, sputum microscopy, culture and NAAT; treat with RIPE for 2 months then RI for 4, with support for adherence and public health notification.
!: Forgetting rifampicin's interactions. As a strong enzyme inducer, it reduces the effect of many drugs, including hormonal contraceptives, anticoagulants and antiretrovirals; check interactions with a pharmacist.
EV: established | Six-month rifampicin-based regimens cure most drug-sensitive TB when completed.
EV: contested | Shorter regimens for drug-sensitive TB, such as 4-month rifapentine-based treatment, are supported by trials but not yet standard in UK guidance.
T: Latent TB infection | Infection with *M. tuberculosis* without symptoms or infectiousness
T: IGRA | Interferon-gamma release assay, a blood test for TB infection
T: Directly observed therapy | Supervised taking of TB medicines to support adherence
SUM: Latent TB is asymptomatic; active TB causes symptoms and can spread.
SUM: Diagnose with X-ray, sputum smear, culture and NAAT.
SUM: Treat with RIPE then RI for 6 months; notify and contact trace.
SRC: NICE, Tuberculosis (NG33) | guidance | 2024 | https://www.nice.org.uk/guidance/ng33
SRC: UK Health Security Agency, Tuberculosis in England: 2024 report | data | 2024 | https://www.gov.uk/government/publications/tuberculosis-in-england-2024-report
SRC: World Health Organization, Global Tuberculosis Report 2024 | data | 2024 | https://www.who.int/teams/global-tuberculosis-programme/tb-reports
Q: What is the standard treatment for drug-sensitive active TB? | Rifampicin, isoniazid, pyrazinamide and ethambutol for 2 months, then rifampicin and isoniazid for 4 months.
Q: Which TB drug can cause optic neuritis? | Ethambutol.
M1#medicine-u04-08-q1@1: Which stain is used to identify acid-fast bacilli in sputum? | Ziehl–Neelsen | Gram stain | Giemsa | Haematoxylin and eosin | Mycobacteria resist decolourisation and are shown by Ziehl–Neelsen staining.
M2#medicine-u04-08-q2@2: A woman taking rifampicin for TB uses the combined oral contraceptive. What advice is needed? | Rifampicin reduces contraceptive effectiveness, so she needs a reliable alternative method | No change: rifampicin doesn't interact with any medicines | She should stop TB treatment to protect contraception | She should double her contraceptive dose without advice | Rifampicin induces liver enzymes; specialist advice on contraception is needed.
M3#medicine-u04-08-q3@3: A patient on isoniazid develops tingling in his feet. What is the most likely cause and prevention? | Peripheral neuropathy from isoniazid, prevented with pyridoxine | Optic neuritis from ethambutol, prevented with eye drops | Gout from pyrazinamide, prevented by stopping fluids | Orange urine from rifampicin, which is harmless | Isoniazid interferes with pyridoxine metabolism; pyridoxine is given to prevent neuropathy.
TF1#medicine-u04-08-q4@1: Tuberculosis is a notifiable disease in the UK. | true | Clinicians must notify cases so UKHSA can organise contact tracing.
SA2#medicine-u04-08-q5@2,3: Explain why adherence is so important in TB treatment and how it is supported. | Incomplete treatment risks relapse and the development of drug-resistant TB, which is harder, longer and more toxic to treat, and continued transmission to others. Treatment lasts at least 6 months and people often feel better early. Support includes clear explanation, TB nurse case management, directly observed therapy for those at risk, help with housing or other social needs, and managing side effects. | Relapse and resistance ; Transmission ; Long treatment and early improvement ; Support measures

## Pleural effusion
LV: Clinical · Application
S: A pleural effusion is fluid in the pleural space. This lesson covers the signs, the distinction between transudates and exudates using Light's criteria, the main causes, and the principles of investigation, including when a chest drain is needed.
O: Recognise the clinical and radiological signs of a pleural effusion
O: Apply Light's criteria to distinguish transudates from exudates
O: Outline investigation and management, including parapneumonic effusion and empyema
PRE: Community-acquired pneumonia
H: Recognition
- **Symptoms**: breathlessness, pleuritic pain (in inflammatory causes), or none if small.
- **Signs**: reduced chest expansion, **stony dull** percussion, reduced breath sounds and vocal resonance over the fluid.
- **Chest X-ray**: blunting of the costophrenic angle, a meniscus; large effusions may push the mediastinum away.
- **Thoracic ultrasound**: more sensitive and used to guide aspiration.
H: Transudate or exudate
P: Pleural fluid is sampled by ultrasound-guided aspiration. **Light's criteria**: the fluid is an **exudate** if at least one of the following applies:
- Pleural fluid protein ÷ serum protein above 0.5.
- Pleural fluid LDH ÷ serum LDH above 0.6.
- Pleural fluid LDH above two-thirds of the upper limit of normal for serum LDH.
- **Transudates** (from altered pressure): heart failure (most common), cirrhosis, nephrotic syndrome, hypoalbuminaemia.
- **Exudates** (from inflammation or leaky capillaries): pneumonia (parapneumonic), malignancy, TB, pulmonary embolism, rheumatoid arthritis.
H: Further tests and treatment
- Fluid sent for cytology, microbiology, pH, glucose and protein.
- **Parapneumonic effusion with pH below 7.2**, frank pus (empyema) or positive Gram stain: chest drain needed (BTS 2023).
- Treat the cause; recurrent malignant effusions may need an indwelling pleural catheter or pleurodesis.
X: A 70-year-old ex-smoker with a new unilateral effusion.
> Weight loss and a large right effusion; no heart failure.
> Aspirate: protein ratio 0.7, so exudate.
> Cytology shows adenocarcinoma cells: malignant pleural effusion.
> Refer to the lung cancer team and pleural service for management of the effusion.
K: Effusions cause stony dullness and reduced breath sounds; Light's criteria separate exudates (infection, malignancy, PE) from transudates (heart failure, cirrhosis); infected effusions with low pH need drainage.
!: Assuming bilateral effusions in heart failure need aspiration. Typical bilateral effusions in known heart failure are usually treated with diuretics; aspirate if atypical, unilateral, painful or febrile.
EV: established | Light's criteria identify exudates with high sensitivity (Light et al., 1972).
EV: established | Light's criteria can misclassify some heart failure effusions after diuretics as exudates; a serum–fluid albumin gradient can help.
T: Exudate | Pleural fluid rich in protein and LDH, caused by inflammation or increased capillary permeability
T: Transudate | Pleural fluid low in protein, caused by altered hydrostatic or oncotic pressure
T: Empyema | Pus in the pleural space
SUM: Stony dullness and reduced breath sounds suggest effusion; ultrasound confirms.
SUM: Light's criteria distinguish exudates from transudates.
SUM: pH below 7.2 or pus in a parapneumonic effusion needs a drain.
SRC: Roberts M. E. et al., "British Thoracic Society guideline for pleural disease", Thorax 78(Suppl 3), s1–s42 | guidance | 2023
SRC: Light R. W. et al., "Pleural effusions: the diagnostic separation of transudates and exudates", Annals of Internal Medicine 77(4), 507–513 | primary | 1972
Q: What percussion note is heard over a pleural effusion? | Stony dull.
Q: What is the most common cause of a transudative pleural effusion? | Heart failure.
M1#medicine-u04-09-q1@1: Which finding classifies pleural fluid as an exudate under Light's criteria? | Pleural fluid to serum protein ratio above 0.5 | Pleural fluid to serum protein ratio below 0.3 | Normal LDH in both fluid and serum | Clear, straw-coloured fluid | Any one of Light's three criteria makes the fluid an exudate.
M2#medicine-u04-09-q2@2: A patient with pneumonia has an effusion with pH 7.05. What does BTS guidance recommend? | Chest drain insertion | Diuretics | Observation only | Repeat chest X-ray in 6 weeks | A low pH in a parapneumonic effusion indicates complicated infection needing drainage.
M3#medicine-u04-09-q3@3: A man with known heart failure has small bilateral effusions with no fever or pain. What is the most appropriate management? | Optimise heart failure treatment, including diuretics, without routine aspiration | Aspirate both sides immediately | Insert bilateral chest drains | Start antibiotics for empyema | Typical bilateral transudates in heart failure respond to treating the cause; aspirate only if atypical.
TF1#medicine-u04-09-q4@1: Thoracic ultrasound is more sensitive than chest X-ray for detecting small pleural effusions. | true | Ultrasound detects smaller volumes and guides safe aspiration.
SA2#medicine-u04-09-q5@2,3: Explain how to investigate a new unilateral pleural effusion in an adult. | Take a history and examine; confirm with chest X-ray and thoracic ultrasound. Perform ultrasound-guided aspiration and send fluid for protein, LDH, pH, glucose, cytology and microbiology, with paired serum protein and LDH to apply Light's criteria. Further tests such as CT, pleural biopsy or TB testing depend on results. Refer to a pleural or respiratory team, especially if malignancy is suspected. | Imaging ; Aspiration and fluid tests ; Light's criteria ; Further tests and referral

## Pneumothorax
LV: Clinical · Application
S: A pneumothorax is air in the pleural space, causing the lung to collapse. This lesson covers primary and secondary spontaneous pneumothorax, the 2023 BTS approach focused on symptoms, tension pneumothorax as an emergency, and advice after recovery.
O: Distinguish primary from secondary spontaneous pneumothorax and recognise tension pneumothorax
O: Outline the 2023 BTS approach to management
O: Give appropriate advice on smoking, flying and diving after pneumothorax
PRE: Ventilation, gas exchange and oxygen transport
H: Types
- **Primary spontaneous**: no known lung disease; typically tall, young adults, especially smokers.
- **Secondary spontaneous**: underlying lung disease such as COPD, cystic fibrosis or interstitial lung disease; more dangerous, as reserve is lower.
- **Traumatic** and **iatrogenic** (after procedures such as central line insertion).
- **Tension pneumothorax**: air enters but can't leave, raising pressure, pushing the mediastinum across and impairing venous return. A life-threatening emergency.
H: Recognition
- Sudden pleuritic chest pain and breathlessness.
- Reduced breath sounds and hyper-resonance on the affected side.
- **Tension**: severe distress, hypoxia, tachycardia, hypotension, tracheal deviation away from the affected side (a late sign), raised JVP.
H: Management (BTS 2023)
- The 2023 guideline bases management mainly on **symptoms and risk** rather than size alone.
- **Minimal symptoms** in primary pneumothorax: **conservative management** with follow-up may be appropriate.
- **Significant symptoms**: needle aspiration, an ambulatory device or a chest drain, depending on the case and local practice.
- **Secondary** pneumothorax usually needs admission and intervention.
- **Tension pneumothorax**: call for help immediately and perform emergency decompression without waiting for an X-ray, following trauma and resuscitation guidance, then insert a chest drain.
H: After recovery
- **Stop smoking**, which greatly increases recurrence risk.
- **Flying**: avoid until resolution is confirmed (check current airline and BTS advice).
- **Diving**: permanently avoid unless definitive surgical treatment has been done.
X: A 22-year-old tall man has sudden left chest pain while studying.
> Mildly breathless, saturations 98%, normal blood pressure.
> Chest X-ray: left primary spontaneous pneumothorax.
> With minimal symptoms, conservative management with close follow-up may be offered, per BTS 2023 and local policy.
> Advise to return immediately if breathlessness worsens; support to stop smoking.
K: Primary pneumothorax occurs in healthy lungs and may be managed conservatively if symptoms are minimal; secondary pneumothorax is more dangerous; tension pneumothorax is a clinical diagnosis needing immediate decompression.
!: Waiting for a chest X-ray in suspected tension pneumothorax. It is a clinical diagnosis; delay can be fatal.
EV: established | Conservative management of selected primary spontaneous pneumothorax is non-inferior to intervention (Brown et al., 2020).
EV: established | Smoking substantially increases the risk of primary pneumothorax and its recurrence.
T: Primary spontaneous pneumothorax | Pneumothorax without underlying lung disease
T: Tension pneumothorax | Pneumothorax with rising pressure that compresses the heart and great vessels
T: Hyper-resonance | An increased resonant percussion note over air-filled space
SUM: Primary affects healthy lungs; secondary occurs with lung disease.
SUM: BTS 2023 bases management mainly on symptoms; conservative care may suit some.
SUM: Tension pneumothorax needs immediate decompression.
SRC: Roberts M. E. et al., "British Thoracic Society guideline for pleural disease", Thorax 78(Suppl 3), s1–s42 | guidance | 2023
SRC: Brown S. G. A. et al., "Conservative versus interventional treatment for spontaneous pneumothorax", New England Journal of Medicine 382(5), 405–415 | primary | 2020
Q: What is a secondary spontaneous pneumothorax? | A pneumothorax in someone with underlying lung disease such as COPD.
Q: What advice is given about scuba diving after a pneumothorax? | Avoid it permanently unless definitive surgical treatment has been performed.
M1#medicine-u04-10-q1@1: A patient has a large left pneumothorax. What percussion note is expected on the left? | Hyper-resonant | Stony dull | Dull | Normal | Air in the pleural space gives an increased, hyper-resonant note.
M2#medicine-u04-10-q2@2: A young woman with a small primary pneumothorax is barely breathless and has normal observations. What may BTS 2023 guidance support? | Conservative management with close follow-up | Immediate surgical pleurodesis | Emergency needle decompression | High-dose steroids | The 2023 guideline focuses on symptoms; minimal symptoms may be managed conservatively.
M3#medicine-u04-10-q3@3: A ventilated trauma patient becomes suddenly hypotensive and hypoxic, with absent breath sounds on the right and a raised JVP. What is the priority? | Immediate decompression for suspected tension pneumothorax, then a chest drain | Arrange a chest X-ray before any intervention | Give a fluid bolus and wait | Increase the ventilator pressure | Tension pneumothorax is a clinical diagnosis; decompression must not wait for imaging.
TF1#medicine-u04-10-q4@1: Stopping smoking reduces the risk of pneumothorax recurrence. | true | Smoking is a major risk factor for primary pneumothorax and recurrence.
SA2#medicine-u04-10-q5@2,3: Explain why tension pneumothorax is life-threatening and how it is recognised. | A one-way valve effect lets air enter the pleural space but not leave, so pressure rises, collapsing the lung, shifting the mediastinum and kinking the great veins, which reduces venous return and cardiac output. It presents with severe distress, hypoxia, tachycardia, hypotension, raised JVP, absent breath sounds and late tracheal deviation. It needs immediate decompression without waiting for imaging. | One-way valve and rising pressure ; Reduced venous return ; Clinical signs ; Immediate decompression

## Interstitial lung disease
LV: Clinical · Application
S: Interstitial lung diseases (ILDs) are a group of conditions causing inflammation and scarring of the lung tissue. This lesson focuses on idiopathic pulmonary fibrosis, other causes of ILD, investigation and the role of antifibrotic treatment.
O: Describe the features of idiopathic pulmonary fibrosis and other ILDs
O: Identify causes of ILD, including drugs, occupations and connective tissue disease
O: Outline investigation and management, including antifibrotic therapy
PRE: Lung function tests
H: Idiopathic pulmonary fibrosis
- The most common ILD of unknown cause: usually in people over 60, more often men, often ex-smokers.
- **Features**: progressive exertional breathlessness, dry cough, **fine end-inspiratory ("velcro") crackles** at the bases, finger clubbing.
- **HRCT**: a **usual interstitial pneumonia (UIP)** pattern, with basal, subpleural reticulation and honeycombing.
- **Prognosis**: poor, with a median survival of about 3–5 years from diagnosis, though variable.
H: Other ILDs
- **Hypersensitivity pneumonitis**: an immune reaction to inhaled antigens such as bird proteins or mould.
- **Connective tissue disease–associated ILD**: rheumatoid arthritis, systemic sclerosis, myositis.
- **Drug-induced**: amiodarone, methotrexate, nitrofurantoin, some chemotherapy.
- **Occupational**: asbestosis, silicosis.
- **Sarcoidosis** (see next lesson).
H: Investigation and management
- **Spirometry**: restrictive pattern; **TLCO** reduced; desaturation on walking tests.
- **HRCT** and specialist **multidisciplinary team** discussion are central to diagnosis.
- **Antifibrotics** (pirfenidone or nintedanib) slow decline in lung function in IPF and some other progressive fibrosing ILDs (NICE technology appraisals).
- Remove exposures or culprit drugs; pulmonary rehabilitation; oxygen; vaccination; palliative care and symptom control; lung transplantation for selected patients.
X: A 72-year-old ex-smoker with 18 months of breathlessness.
> Bibasal fine crackles and clubbing on examination.
> Spirometry: FVC 68% predicted, ratio 0.85; TLCO 48% predicted.
> HRCT: basal subpleural honeycombing (UIP pattern).
> After MDT review, diagnosed with IPF; offered antifibrotic therapy, pulmonary rehabilitation and support.
K: IPF causes progressive breathlessness, velcro crackles and clubbing with a UIP pattern on HRCT and restrictive spirometry with low TLCO; antifibrotics slow progression, and exposures and drug causes of other ILDs must be sought.
!: Missing a drug or exposure cause. Always take a full occupational, environmental and drug history; removing the cause can halt some ILDs.
EV: established | Pirfenidone and nintedanib slow decline in FVC in IPF (King et al., 2014; Richeldi et al., 2014).
EV: contested | Whether antifibrotics improve survival, as well as slowing lung function decline, is still being clarified.
T: Interstitial lung disease | A group of disorders causing inflammation and fibrosis of the lung interstitium
T: Usual interstitial pneumonia | The radiological and histological pattern typical of idiopathic pulmonary fibrosis
T: Honeycombing | Clustered cystic airspaces on CT, indicating advanced fibrosis
SUM: IPF: older adults, velcro crackles, clubbing, UIP on HRCT.
SUM: Other causes: hypersensitivity, connective tissue disease, drugs, occupations.
SUM: Antifibrotics slow decline; MDT diagnosis is key.
SRC: Raghu G. et al., "Idiopathic pulmonary fibrosis (an update) and progressive pulmonary fibrosis in adults: an official ATS/ERS/JRS/ALAT clinical practice guideline", American Journal of Respiratory and Critical Care Medicine 205(9), e18–e47 | guidance | 2022
SRC: Richeldi L. et al., "Efficacy and safety of nintedanib in idiopathic pulmonary fibrosis", New England Journal of Medicine 370(22), 2071–2082 | primary | 2014
Q: What crackles are typical of idiopathic pulmonary fibrosis? | Fine, end-inspiratory ("velcro") crackles at the lung bases.
Q: Name two drugs that can cause interstitial lung disease. | Any two of: amiodarone, methotrexate, nitrofurantoin, some chemotherapy drugs.
M1#medicine-u04-11-q1@1: Which spirometry pattern is typical of interstitial lung disease? | Restrictive, with low FVC and a normal or high ratio | Obstructive, with FEV_{1}/FVC below 0.7 | Completely normal in all cases | Raised FVC with low ratio | Fibrosis stiffens the lungs, reducing volumes in proportion.
M2#medicine-u04-11-q2@2: A pigeon breeder has breathlessness and ILD features on CT. Which diagnosis is most likely? | Hypersensitivity pneumonitis | Asbestosis | Idiopathic pulmonary fibrosis | Sarcoidosis | Inhaled avian proteins can cause hypersensitivity pneumonitis.
M3#medicine-u04-11-q3@3: A man on long-term amiodarone develops progressive breathlessness and new ILD on CT. What is the most important step? | Consider amiodarone toxicity and seek specialist advice about stopping or changing it | Increase the amiodarone dose | Start antifibrotics without reviewing medicines | Reassure, as amiodarone never affects the lungs | Amiodarone is a recognised cause of pulmonary toxicity; removing the culprit is key.
TF1#medicine-u04-11-q4@1: Finger clubbing is a recognised feature of idiopathic pulmonary fibrosis. | true | Clubbing occurs in many people with IPF.
SA2#medicine-u04-11-q5@2,3: Describe how idiopathic pulmonary fibrosis is diagnosed. | Clinical features of progressive breathlessness, dry cough, velcro crackles and clubbing in an older adult raise suspicion. Spirometry shows restriction and TLCO is reduced. HRCT shows a UIP pattern of basal subpleural reticulation and honeycombing. Other causes such as drugs, exposures and connective tissue disease are excluded, and the diagnosis is confirmed at a specialist ILD multidisciplinary meeting. | Clinical features ; Lung function ; HRCT pattern ; Exclusion of causes and MDT

## Sarcoidosis
LV: Clinical · Application
S: Sarcoidosis is a multisystem disease of unknown cause characterised by non-caseating granulomas. This lesson covers its presentations, particularly in the lungs, investigation, staging and the principles of treatment.
O: Describe the pathology and common presentations of sarcoidosis
O: Recognise Löfgren syndrome and the radiological stages of pulmonary sarcoidosis
O: Outline investigation and indications for treatment
PRE: Interstitial lung disease
H: Pathology and presentation
P: Sarcoidosis forms **non-caseating granulomas** in affected organs. It most often affects adults aged 20–40 and is more common and often more severe in people of Black African and Caribbean heritage.
- **Lungs** (over 90%): bilateral hilar lymphadenopathy, cough, breathlessness, or found incidentally on X-ray.
- **Skin**: erythema nodosum, lupus pernio.
- **Eyes**: uveitis.
- **Others**: heart (arrhythmias, heart block), nervous system, liver, kidneys; **hypercalcaemia**.
- **Löfgren syndrome**: erythema nodosum, bilateral hilar lymphadenopathy, arthralgia (often ankles) and fever; usually resolves spontaneously with a good prognosis.
H: Staging and investigation
- **Scadding chest X-ray stages**: 0 normal; I bilateral hilar lymphadenopathy; II lymphadenopathy with lung infiltrates; III infiltrates without lymphadenopathy; IV fibrosis.
- **Tests**: calcium, serum ACE (raised in many but not specific), HRCT, lung function, ECG, eye examination; **tissue biopsy** (often by endobronchial ultrasound) showing non-caseating granulomas, with exclusion of TB and lymphoma.
H: Treatment
- Many people, especially with stage I disease or Löfgren syndrome, **don't need treatment** and improve spontaneously.
- **Corticosteroids** are used for organ-threatening disease (cardiac, neurological, ocular, severe or progressive lung disease) or hypercalcaemia; steroid-sparing drugs such as methotrexate may follow.
X: A 32-year-old woman with painful red shins and swollen ankles.
> She has a fever; chest X-ray shows bilateral hilar lymphadenopathy.
> This is Löfgren syndrome, a form of acute sarcoidosis.
> Management is usually supportive, with NSAIDs for symptoms and monitoring.
> Most cases resolve within months.
K: Sarcoidosis forms non-caseating granulomas, most often with bilateral hilar lymphadenopathy; Löfgren syndrome has a good prognosis; many need no treatment, while organ-threatening disease needs corticosteroids.
!: Diagnosing sarcoidosis from a raised ACE alone. ACE is neither sensitive nor specific; diagnosis needs compatible features, usually biopsy, and exclusion of TB and lymphoma.
EV: established | Löfgren syndrome has a high rate of spontaneous remission.
EV: contested | The cause of sarcoidosis remains unknown; genetic and environmental triggers are being studied.
T: Non-caseating granuloma | A cluster of immune cells without central necrosis, characteristic of sarcoidosis
T: Löfgren syndrome | Acute sarcoidosis with erythema nodosum, bilateral hilar lymphadenopathy, arthralgia and fever
T: Bilateral hilar lymphadenopathy | Enlarged lymph nodes at both lung hila
SUM: Sarcoidosis forms non-caseating granulomas in many organs.
SUM: Bilateral hilar lymphadenopathy is typical; Löfgren syndrome has a good prognosis.
SUM: Many need no treatment; steroids for organ-threatening disease.
SRC: Crouser E. D. et al., "Diagnosis and detection of sarcoidosis: an official American Thoracic Society clinical practice guideline", American Journal of Respiratory and Critical Care Medicine 201(8), e26–e51 | guidance | 2020
SRC: Baughman R. P. et al., "ERS clinical practice guidelines on treatment of sarcoidosis", European Respiratory Journal 58(6), 2004079 | guidance | 2021
Q: What type of granuloma is characteristic of sarcoidosis? | Non-caseating granuloma.
Q: What four features make up Löfgren syndrome? | Erythema nodosum, bilateral hilar lymphadenopathy, arthralgia and fever.
M1#medicine-u04-12-q1@1: Which Scadding stage shows bilateral hilar lymphadenopathy without lung infiltrates? | Stage I | Stage 0 | Stage III | Stage IV | Stage I is lymphadenopathy alone; infiltrates appear in stages II and III, fibrosis in IV.
M2#medicine-u04-12-q2@2: Which electrolyte abnormality is associated with sarcoidosis? | Hypercalcaemia | Hypokalaemia | Hypermagnesaemia | Hyponatraemia only | Granulomas produce active vitamin D, raising calcium.
M3#medicine-u04-12-q3@3: A patient with sarcoidosis develops palpitations and a new heart block on ECG. What is the priority? | Urgent specialist assessment for cardiac sarcoidosis, which can cause sudden death | Reassure, since sarcoidosis never affects the heart | Wait for the lung disease to resolve | Start antibiotics for endocarditis | Cardiac involvement is organ-threatening and needs urgent investigation and treatment.
TF1#medicine-u04-12-q4@1: A raised serum ACE level alone confirms sarcoidosis. | false | ACE is neither sensitive nor specific; diagnosis needs clinical features, imaging, usually biopsy, and exclusion of other causes.
SA2#medicine-u04-12-q5@2,3: Explain why many people with sarcoidosis are not treated with corticosteroids. | Many cases, especially stage I lung disease and Löfgren syndrome, resolve spontaneously. Corticosteroids have significant side effects, including weight gain, diabetes, osteoporosis and infection, and may be associated with relapse when stopped. Treatment is reserved for organ-threatening disease, such as cardiac, neurological or ocular involvement, progressive lung disease or hypercalcaemia. | Spontaneous resolution ; Steroid side effects ; Indications for treatment ; Monitoring

## Pulmonary embolism
LV: Clinical · Application
S: Pulmonary embolism (PE) ranges from small, low-risk clots to massive PE causing shock. This lesson builds on the diagnostic pathway covered in School 3 to focus on the pathophysiology, ECG and imaging findings, risk stratification, and when outpatient treatment or thrombolysis is appropriate.
O: Explain how a pulmonary embolism affects gas exchange and the right ventricle
O: Stratify PE risk using haemodynamic status, right ventricular strain and the PESI score
O: Identify which patients may be treated as outpatients and who needs thrombolysis
PRE: Venous thromboembolism
H: Pathophysiology
- Thrombus, usually from the deep veins of the legs, lodges in the pulmonary arteries.
- **Dead space** and V/Q mismatch cause hypoxaemia, often with low PaCO_{2} from hyperventilation.
- A large clot raises pulmonary vascular resistance, straining and dilating the **right ventricle**; in massive PE, right ventricular failure reduces left ventricular filling, causing **shock**.
H: Findings
- **ECG**: sinus tachycardia is the most common finding; signs of right heart strain (right bundle branch block, right axis deviation, T-wave inversion in V1–V4); the classic "S1Q3T3" pattern is uncommon.
- **CTPA** confirms PE and can show right ventricular dilatation.
- **Echocardiography** shows right ventricular strain; **troponin** and **BNP** may be raised.
H: Risk stratification
- **High risk (massive)**: hypotension or shock. Call for senior help immediately; systemic **thrombolysis** is indicated unless contraindicated.
- **Intermediate risk**: normal blood pressure but right ventricular dysfunction and/or raised troponin; admit and monitor closely for deterioration.
- **Low risk**: a validated tool such as the **PESI** or simplified PESI shows low risk; NICE NG158 recommends considering **outpatient treatment** for suitable patients, with follow-up.
X: A 45-year-old with a confirmed PE.
> Blood pressure 128/80, heart rate 96, saturations 96% on air.
> Simplified PESI 0; CT shows no right ventricular dilatation.
> Low-risk PE: consider outpatient anticoagulation per NICE and local pathways.
> Give clear safety-netting: return immediately with worsening breathlessness, chest pain, collapse or bleeding.
K: PE causes dead space and right ventricular strain; risk is stratified by shock, RV dysfunction, troponin and PESI; high-risk PE needs thrombolysis, while low-risk PE can often be treated as an outpatient.
!: Relying on the S1Q3T3 ECG pattern to diagnose PE. It is uncommon and non-specific; sinus tachycardia is far more common, and a normal ECG doesn't exclude PE.
EV: established | Thrombolysis is recommended for PE with haemodynamic instability (ESC 2019).
EV: contested | Routine thrombolysis in intermediate-risk PE reduced haemodynamic collapse but increased major bleeding, including intracranial bleeding (PEITHO trial, Meyer et al., 2014).
T: Massive pulmonary embolism | PE causing hypotension or shock, also called high-risk PE
T: PESI | Pulmonary Embolism Severity Index, a score predicting 30-day mortality in PE
T: Right ventricular strain | Dilatation or dysfunction of the right ventricle caused by raised pulmonary pressure
SUM: PE causes dead space, hypoxaemia and right ventricular strain.
SUM: Stratify by shock, RV dysfunction, troponin and PESI.
SUM: Thrombolysis for high-risk PE; outpatient care for selected low-risk PE.
SRC: Konstantinides S. V. et al., "2019 ESC Guidelines for the diagnosis and management of acute pulmonary embolism", European Heart Journal 41(4), 543–603 | guidance | 2020
SRC: NICE, Venous thromboembolic diseases: diagnosis, management and thrombophilia testing (NG158) | guidance | 2023 | https://www.nice.org.uk/guidance/ng158
SRC: Meyer G. et al., "Fibrinolysis for patients with intermediate-risk pulmonary embolism", New England Journal of Medicine 370(15), 1402–1411 | primary | 2014
Q: What is the most common ECG finding in pulmonary embolism? | Sinus tachycardia.
Q: Which PE patients are given systemic thrombolysis? | Those with high-risk (massive) PE causing hypotension or shock, unless contraindicated.
M1#medicine-u04-13-q1@1: Why does a pulmonary embolism cause hypoxaemia? | It creates ventilated but unperfused lung, causing V/Q mismatch | It blocks the airways with mucus | It reduces haemoglobin concentration | It increases blood flow to all alveoli equally | Embolised areas are ventilated but not perfused (dead space), while blood flows to other areas, causing mismatch.
M2#medicine-u04-13-q2@2: A patient with confirmed PE is normotensive but has a dilated right ventricle on CT and a raised troponin. How is this classified? | Intermediate-risk PE needing admission and close monitoring | High-risk PE needing immediate thrombolysis | Low-risk PE suitable for discharge | Not a PE, because blood pressure is normal | Normal blood pressure with RV dysfunction and troponin rise is intermediate risk.
M3#medicine-u04-13-q3@3: A woman with a large PE becomes hypotensive and confused. What is the priority after calling for senior help? | Systemic thrombolysis, unless contraindicated | Outpatient anticoagulation and review in a week | A repeat CT scan before any treatment | Oral aspirin alone | Shock indicates high-risk PE; thrombolysis is recommended to restore flow.
TF1#medicine-u04-13-q4@1: A normal ECG rules out pulmonary embolism. | false | Many patients with PE have a normal ECG or only sinus tachycardia.
SA2#medicine-u04-13-q5@2,3: Explain how a large pulmonary embolism can cause shock. | A large clot blocks the pulmonary arteries, sharply raising pulmonary vascular resistance. The right ventricle, which is thin-walled, dilates and fails as it can't generate enough pressure. The dilated right ventricle pushes the septum into the left ventricle, reducing left ventricular filling and cardiac output. Reduced coronary perfusion of the strained right ventricle worsens failure, producing hypotension and shock. | Raised pulmonary resistance ; Right ventricular failure ; Reduced left ventricular filling ; Spiral to shock

## Pulmonary hypertension
LV: Clinical · Application
S: Pulmonary hypertension is raised pressure in the pulmonary arteries, which strains the right heart. This lesson covers its definition, the five clinical groups, symptoms and signs, investigation and the principles of management.
O: Define pulmonary hypertension and classify it into its five groups
O: Recognise its symptoms and signs
O: Outline investigation and the role of specialist centres
PRE: Pulmonary embolism
H: Definition and groups
P: The 2022 ESC/ERS guidelines define pulmonary hypertension as a **mean pulmonary arterial pressure above 20 mmHg** at rest, measured by right heart catheterisation.
- **Group 1: pulmonary arterial hypertension (PAH)**: idiopathic, heritable, drug-induced, or associated with connective tissue disease, HIV or congenital heart disease.
- **Group 2: left heart disease**: the most common cause.
- **Group 3: lung disease or hypoxia**: COPD, ILD, sleep-disordered breathing.
- **Group 4: chronic thromboembolic pulmonary hypertension (CTEPH)** after PE.
- **Group 5: unclear or multifactorial mechanisms**.
H: Features and investigation
- **Symptoms**: progressive exertional breathlessness, fatigue, chest pain, syncope on exertion, leg swelling.
- **Signs**: loud pulmonary component of S2, right ventricular heave, raised JVP, peripheral oedema.
- **Echocardiography** estimates pulmonary pressure and shows right ventricular function; it is the key screening test.
- **Right heart catheterisation** confirms the diagnosis.
- Further tests look for the cause: lung function, CT, V/Q scan (for CTEPH), sleep studies, autoimmune tests.
H: Management
- Treat the underlying cause in groups 2 and 3 (heart failure, oxygen for hypoxic lung disease).
- **Group 1 PAH**: specific drugs (such as endothelin receptor antagonists and PDE5 inhibitors) prescribed in designated **specialist centres**.
- **CTEPH**: lifelong anticoagulation; **pulmonary endarterectomy** can be curative in suitable patients.
X: A 40-year-old woman with systemic sclerosis.
> Increasing breathlessness over a year; exertional dizziness.
> Loud P2 and a right ventricular heave.
> Echocardiogram suggests high pulmonary pressure; referral to a pulmonary hypertension centre.
> Right heart catheterisation confirms PAH associated with connective tissue disease.
K: Pulmonary hypertension is mean pulmonary pressure above 20 mmHg; left heart and lung disease are the commonest causes; echocardiography screens, catheterisation confirms, and PAH and CTEPH are managed in specialist centres.
!: Attributing breathlessness after a PE to deconditioning without considering CTEPH. Persistent breathlessness months after PE should prompt echocardiography and specialist review, as CTEPH is treatable.
EV: established | The ESC/ERS 2022 guidelines lowered the haemodynamic threshold to a mean PAP above 20 mmHg.
EV: established | Pulmonary endarterectomy can cure CTEPH in suitable patients.
T: Pulmonary hypertension | Mean pulmonary arterial pressure above 20 mmHg at rest
T: CTEPH | Chronic thromboembolic pulmonary hypertension, caused by unresolved clots after PE
T: Right heart catheterisation | Invasive measurement of pressures in the right heart and pulmonary arteries
SUM: Five groups; left heart disease is the most common cause.
SUM: Echocardiography screens; right heart catheterisation confirms.
SUM: PAH and CTEPH are managed in specialist centres.
SRC: Humbert M. et al., "2022 ESC/ERS Guidelines for the diagnosis and treatment of pulmonary hypertension", European Heart Journal 43(38), 3618–3731 | guidance | 2022
SRC: NHS England, Service specification: pulmonary hypertension (adults) | guidance | 2018
Q: How is pulmonary hypertension defined haemodynamically? | A mean pulmonary arterial pressure above 20 mmHg at rest on right heart catheterisation.
Q: What is the most common cause of pulmonary hypertension? | Left heart disease (group 2).
M1#medicine-u04-14-q1@1: Which investigation confirms pulmonary hypertension? | Right heart catheterisation | Spirometry | Chest X-ray | Peak flow | Catheterisation directly measures pulmonary arterial pressure.
M2#medicine-u04-14-q2@2: A patient with severe COPD and chronic hypoxaemia develops pulmonary hypertension. Which group is this? | Group 3 | Group 1 | Group 2 | Group 4 | Pulmonary hypertension due to lung disease or hypoxia is group 3.
M3#medicine-u04-14-q3@3: Six months after a PE, a man remains breathless despite anticoagulation. What should be considered? | Chronic thromboembolic pulmonary hypertension, with echo and specialist referral | Normal recovery that needs no further investigation | Asthma, treated with a salbutamol inhaler only | Anxiety alone | Persistent breathlessness after PE should prompt assessment for CTEPH, which can be treated surgically.
TF1#medicine-u04-14-q4@1: A loud pulmonary component of the second heart sound can be a sign of pulmonary hypertension. | true | Raised pulmonary pressure makes pulmonary valve closure louder.
SA2#medicine-u04-14-q5@2,3: Explain why treatment of pulmonary hypertension depends on its cause. | Groups differ in mechanism. In group 2, the problem is raised left heart pressure, so treatment targets heart failure or valve disease; PAH drugs may be harmful. In group 3, treating lung disease and hypoxia helps. In group 1 PAH, specific vasodilator drugs target the pulmonary vessels. In group 4 CTEPH, anticoagulation and surgery remove the clot burden. Correct classification at a specialist centre is therefore essential. | Group 2 treatment ; Group 3 treatment ; Group 1 specific drugs ; Group 4 surgery or anticoagulation

## Lung cancer
LV: Clinical · Application
S: Lung cancer is the leading cause of cancer death in the UK. This lesson covers its types and risk factors, presenting features and NICE referral criteria, paraneoplastic syndromes and emergencies, and the principles of diagnosis, staging and screening.
O: Describe the main types of lung cancer and their risk factors
O: Apply NICE NG12 criteria for chest X-ray and urgent referral
O: Recognise paraneoplastic syndromes and oncological emergencies associated with lung cancer
PRE: Lung function tests
H: Types and risks
- **Non-small cell lung cancer (NSCLC)**, about 85%: **adenocarcinoma** (most common, including in never-smokers), **squamous cell carcinoma**, large cell.
- **Small cell lung cancer (SCLC)**, about 15%: strongly linked to smoking, fast-growing, often spread at diagnosis.
- **Risk factors**: smoking (the cause of most cases), second-hand smoke, radon, asbestos, air pollution, family history.
H: Presentation and referral (NICE NG12)
- **Symptoms**: persistent cough, haemoptysis, breathlessness, chest pain, weight loss, appetite loss, hoarseness, recurrent chest infections, finger clubbing.
- **Urgent chest X-ray** (within 2 weeks) for people aged 40 and over with two or more unexplained symptoms (cough, fatigue, breathlessness, chest pain, weight loss, appetite loss), or one if they have ever smoked.
- **Suspected cancer pathway referral** if the chest X-ray suggests lung cancer, or for people aged 40 and over with unexplained haemoptysis.
H: Paraneoplastic syndromes and emergencies
- **SIADH** and **Cushing's syndrome** (ectopic ACTH): mainly SCLC.
- **Hypercalcaemia** (PTH-related peptide): mainly squamous cell carcinoma.
- **Lambert–Eaton myasthenic syndrome**: SCLC.
- **Superior vena cava obstruction**: facial swelling, distended neck veins, breathlessness; urgent oncology referral.
- **Metastatic spinal cord compression**: back pain with neurological signs; emergency assessment.
H: Diagnosis, treatment and screening
- CT chest, abdomen and pelvis; PET-CT; tissue biopsy (bronchoscopy, EBUS or CT-guided); **molecular testing** (for example EGFR, ALK, PD-L1) to guide targeted therapy and immunotherapy.
- Treatment depends on type, stage and fitness: surgery, radiotherapy, chemotherapy, targeted therapy and immunotherapy, discussed at a lung cancer MDT.
- **Lung cancer screening**: England is rolling out targeted screening with low-dose CT for people aged 55–74 with a history of smoking, building on the Targeted Lung Health Check programme.
X: A 63-year-old smoker with a cough for 4 weeks and weight loss.
> Two unexplained symptoms in someone aged 40 or over who smokes.
> NICE NG12: offer an urgent chest X-ray within 2 weeks.
> The X-ray shows a hilar mass: refer on the suspected cancer pathway.
> Offer smoking cessation support alongside investigation.
K: Lung cancer is mostly NSCLC (adenocarcinoma commonest) and linked to smoking; NICE NG12 sets thresholds for urgent X-ray and referral; know the paraneoplastic syndromes and emergencies such as SVC obstruction.
!: Ruling out lung cancer with a normal chest X-ray when symptoms persist. Chest X-rays miss some cancers; persistent or worsening symptoms, or haemoptysis, need further assessment.
EV: established | Low-dose CT screening reduces lung cancer mortality in high-risk smokers (NELSON trial, de Koning et al., 2020).
EV: established | Adenocarcinoma is the most common type in never-smokers, often with targetable mutations such as EGFR.
T: Non-small cell lung cancer | The group of lung cancers that includes adenocarcinoma and squamous cell carcinoma
T: Paraneoplastic syndrome | A syndrome caused by substances produced by a tumour, distant from the tumour itself
T: Superior vena cava obstruction | Blockage of the SVC causing facial and arm swelling and distended veins
SUM: NSCLC is about 85%, SCLC about 15%; smoking causes most cases.
SUM: NICE NG12 sets X-ray and referral thresholds.
SUM: Know paraneoplastic syndromes, emergencies and targeted screening.
SRC: NICE, Suspected cancer: recognition and referral (NG12) | guidance | 2023 | https://www.nice.org.uk/guidance/ng12
SRC: de Koning H. J. et al., "Reduced lung-cancer mortality with volume CT screening in a randomized trial", New England Journal of Medicine 382(6), 503–513 | primary | 2020
SRC: Cancer Research UK, Lung cancer statistics | data | 2024 | https://www.cancerresearchuk.org/health-professional/cancer-statistics/statistics-by-cancer-type/lung-cancer
Q: What is the most common type of lung cancer? | Adenocarcinoma, a type of non-small cell lung cancer.
Q: When does NICE recommend a suspected cancer pathway referral for lung cancer without an X-ray? | For people aged 40 and over with unexplained haemoptysis.
M1#medicine-u04-15-q1@1: Which paraneoplastic syndrome is most associated with squamous cell lung cancer? | Hypercalcaemia from PTH-related peptide | Lambert–Eaton myasthenic syndrome | SIADH | Ectopic ACTH secretion | Squamous cell carcinoma commonly secretes PTHrP; the others are typical of SCLC.
M2#medicine-u04-15-q2@2: A 55-year-old non-smoker has an unexplained cough and fatigue for 4 weeks. What does NICE NG12 recommend? | An urgent chest X-ray within 2 weeks | Immediate referral for surgery | No action until symptoms last 6 months | A course of antibiotics only | Two unexplained symptoms at 40 or over prompt an urgent chest X-ray.
M3#medicine-u04-15-q3@3: A man with lung cancer develops facial swelling, distended neck veins and breathlessness lying flat. What is the most likely diagnosis? | Superior vena cava obstruction needing urgent oncology referral | Anaphylaxis to his chemotherapy | Heart failure from fluid overload alone | A simple allergic reaction to pollen | These are classic features of SVC obstruction, an oncological emergency.
TF1#medicine-u04-15-q4@1: Low-dose CT screening of high-risk smokers reduces lung cancer deaths. | true | Trials such as NLST and NELSON showed reduced lung cancer mortality.
SA2#medicine-u04-15-q5@2,3: Explain why molecular testing is important in non-small cell lung cancer. | Some NSCLCs, especially adenocarcinomas in never-smokers, carry driver mutations such as EGFR or ALK rearrangements that can be treated with targeted tablets, often with better response and fewer side effects than chemotherapy. PD-L1 expression helps predict response to immunotherapy. Testing guides the choice of first-line treatment and improves outcomes. | Driver mutations ; Targeted therapy ; PD-L1 and immunotherapy ; Guides treatment choice

## Obstructive sleep apnoea
LV: Clinical · Application
S: Obstructive sleep apnoea (OSA) is repeated collapse of the upper airway during sleep, causing disturbed sleep and daytime sleepiness. This lesson covers risk factors, assessment with the Epworth Sleepiness Scale and sleep studies, CPAP treatment under NICE NG202, and driving advice.
O: Describe the features and risk factors of obstructive sleep apnoea
O: Explain the assessment of OSA, including the Epworth Sleepiness Scale and the apnoea–hypopnoea index
O: Outline treatment and the implications for driving
PRE: Respiratory failure: type 1 and type 2
H: Features and risks
- **Mechanism**: the upper airway narrows or closes during sleep, causing pauses in breathing (apnoeas) or reduced breathing (hypopnoeas), drops in oxygen and repeated arousals.
- **Symptoms**: loud snoring, witnessed pauses in breathing, choking at night, unrefreshing sleep, **excessive daytime sleepiness**, morning headaches, poor concentration.
- **Risk factors**: obesity (especially neck circumference), male sex, older age, alcohol and sedatives, nasal obstruction, enlarged tonsils, retrognathia.
- **Associations**: hypertension, atrial fibrillation, type 2 diabetes, road traffic collisions.
H: Assessment (NICE NG202)
- **Epworth Sleepiness Scale**: a questionnaire scoring the likelihood of dozing in eight situations; scores above 10 suggest excessive sleepiness.
- **STOP-Bang** questionnaire to estimate risk.
- **Sleep studies** (home respiratory polygraphy or polysomnography) measure the **apnoea–hypopnoea index (AHI)**: 5–14 events an hour mild, 15–29 moderate, 30 or more severe.
H: Treatment and driving
- **Lifestyle**: weight loss, reducing alcohol, avoiding sedatives, sleeping position.
- **CPAP** (continuous positive airway pressure) for moderate or severe OSA, and for mild OSA with symptoms affecting quality of life; it splints the airway open.
- **Mandibular advancement devices** for some people with mild OSA or who can't tolerate CPAP.
- **Driving**: people with excessive sleepiness from moderate or severe OSA must tell the DVLA and stop driving until symptoms are controlled; check current DVLA guidance.
X: A 52-year-old lorry driver with loud snoring.
> His partner reports pauses in breathing; he falls asleep in meetings.
> BMI 36; Epworth score 15.
> Home sleep study: AHI 34 events an hour: severe OSA.
> Start CPAP; advise him not to drive and to inform the DVLA until symptoms are controlled; support weight loss.
K: OSA causes snoring, apnoeas and daytime sleepiness, especially with obesity; diagnosis uses symptoms, the Epworth score and sleep studies (AHI); CPAP treats moderate to severe OSA, and sleepy drivers must stop driving and inform the DVLA.
!: Dismissing snoring as harmless. Snoring with witnessed apnoeas and daytime sleepiness suggests OSA, which increases the risk of road crashes and cardiovascular disease.
EV: established | CPAP reduces daytime sleepiness and improves quality of life in symptomatic OSA.
EV: contested | Whether CPAP reduces cardiovascular events in OSA without sleepiness is uncertain; the SAVE trial found no reduction (McEvoy et al., 2016).
T: Apnoea–hypopnoea index | The number of apnoeas and hypopnoeas per hour of sleep
T: Epworth Sleepiness Scale | A questionnaire measuring daytime sleepiness
T: CPAP | Continuous positive airway pressure, delivered by mask to keep the upper airway open during sleep
SUM: OSA causes snoring, apnoeas and daytime sleepiness.
SUM: Assess with Epworth, STOP-Bang and sleep studies (AHI).
SUM: CPAP for moderate to severe OSA; inform the DVLA if sleepy.
SRC: NICE, Obstructive sleep apnoea/hypopnoea syndrome and obesity hypoventilation syndrome in over 16s (NG202) | guidance | 2021 | https://www.nice.org.uk/guidance/ng202
SRC: McEvoy R. D. et al., "CPAP for prevention of cardiovascular events in obstructive sleep apnea", New England Journal of Medicine 375(10), 919–931 | primary | 2016
SRC: Driver and Vehicle Licensing Agency, Excessive sleepiness and driving | guidance | 2024 | https://www.gov.uk/government/publications/excessive-sleepiness-and-driving
Q: What does an apnoea–hypopnoea index of 30 or more indicate? | Severe obstructive sleep apnoea.
Q: How does CPAP treat obstructive sleep apnoea? | It delivers air at constant pressure, splinting the upper airway open during sleep.
M1#medicine-u04-16-q1@1: Which is a major risk factor for obstructive sleep apnoea? | Obesity | Low alcohol intake | Being underweight | Regular aerobic exercise | Excess fat around the neck narrows the upper airway.
M2#medicine-u04-16-q2@2: A sleep study shows an AHI of 22 events an hour. How is the OSA classified? | Moderate | Mild | Severe | Normal | On the standard AHI bands (5–14 mild, 15–29 moderate, 30 or more severe), 22 is moderate OSA.
M3#medicine-u04-16-q3@3: A taxi driver has moderate OSA with excessive daytime sleepiness. What is the correct advice? | Stop driving and inform the DVLA until symptoms are controlled with treatment | Continue driving but drink coffee on long shifts | Drive only at night when roads are quieter | There is no need to inform anyone | Excessive sleepiness from moderate or severe OSA is a legal reporting duty and a road safety risk.
TF1#medicine-u04-16-q4@1: An Epworth Sleepiness Scale score above 10 suggests excessive daytime sleepiness. | true | Scores above 10 indicate more sleepiness than normal.
SA2#medicine-u04-16-q5@2,3: Describe the assessment of a patient with suspected obstructive sleep apnoea. | Take a history of snoring, witnessed apnoeas, choking, unrefreshing sleep and daytime sleepiness, ideally with a bed partner's account, plus alcohol, sedatives and occupation, especially driving. Measure BMI, neck circumference and blood pressure. Use the Epworth Sleepiness Scale and STOP-Bang. Refer for a sleep study to measure the AHI. Advise on driving and the DVLA. | History including partner ; Examination ; Questionnaires ; Sleep study and driving advice
`;
