// DentalGradify Dental Radiography and Radiation Protection (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## Production of X-rays
LV: Preclinical · Foundation
S: Dental radiographs depend on X-rays generated in a small tube head. This lesson explains how the X-ray tube works, the two processes that produce X-rays and how exposure factors change the beam.
O: Describe the components of a dental X-ray tube
O: Explain how bremsstrahlung and characteristic radiation are produced
O: Relate kilovoltage, tube current, time and filtration to the X-ray beam
H: The X-ray tube
P: X-rays are high-energy **electromagnetic radiation** produced when fast electrons hit a metal target. In the dental tube head, a heated **tungsten filament** in the **cathode** releases electrons by **thermionic emission**. A high voltage, measured in **kilovolts (kV)**, accelerates them across a vacuum to a **tungsten target** set in a **copper anode**. The electrons stop suddenly in the target, and their energy is converted to **heat (about 99%)** and **X-rays (about 1%)**. The copper conducts heat away, and the small area where electrons strike, the **focal spot**, is kept small to give sharp images. The tube is surrounded by oil and a lead-lined casing, with an aluminium filter and a collimator at the exit.
H: How X-ray photons arise
- **Bremsstrahlung** ("braking radiation") is produced when electrons are slowed and deflected by the nuclei of target atoms.
- It gives a **continuous spectrum** of photon energies up to a maximum set by the peak kilovoltage.
- **Characteristic radiation** arises when an incoming electron ejects an inner-shell electron and an outer electron drops in, releasing a photon of fixed energy.
- In dental sets most of the useful beam is bremsstrahlung.
- Low-energy photons are absorbed in the skin and add dose without contributing to the image.
H: Exposure factors
- **Kilovoltage (kV)** controls photon energy, or beam **quality**; dental intraoral sets usually run at 60 to 70 kV.
- **Tube current (mA)** and **exposure time** together control the **quantity** of photons.
- **Aluminium filtration** removes low-energy photons; 1.5 mm aluminium equivalent is needed up to 70 kV.
- The **inverse square law** means intensity falls with the square of distance from the focal spot.
- The **collimator** limits the beam size, reducing dose and scatter.
X: Using the inverse square law.
> A beam has an intensity of 40 units at 20 cm from the focal spot.
> At 40 cm, twice the distance, intensity falls to a quarter.
> The new intensity is 10 units.
> This is why staff stand well back from the tube head during exposure.
K: X-rays are produced when electrons from a heated tungsten filament are accelerated by a high voltage into a tungsten target, giving mainly continuous bremsstrahlung plus characteristic radiation, with kV setting beam quality, mA and time the quantity, and filtration and collimation reducing patient dose.
!: Thinking that higher mA makes X-rays more penetrating. Tube current changes the number of photons; kilovoltage changes their energy.
EV: established | Only about 1% of the electron energy in a diagnostic X-ray tube is converted into X-rays; the rest becomes heat.
T: Thermionic emission | Release of electrons from a heated filament
T: Bremsstrahlung | X-rays produced when electrons are slowed by the nuclei of target atoms
T: Filtration | Removal of low-energy photons from the beam, usually by aluminium
SUM: Heated filament, tungsten target.
SUM: kV for quality, mA for quantity.
SUM: Filter and collimate.
SRC: Whaites E. and Drage N., Essentials of Dental Radiography and Radiology, 6th edition, Elsevier | secondary | 2021
SRC: Mallya S. M. and Lam E. W. N. (eds), White and Pharoah's Oral Radiology: Principles and Interpretation, 8th edition, Elsevier | secondary | 2019
Q: What proportion of electron energy in an X-ray tube becomes X-rays? | About 1%; the rest is heat.
Q: What is the role of aluminium filtration? | To remove low-energy photons that add skin dose but not image information.
M1#dentistry-u08-01-q1@1: Which process releases electrons from the filament of an X-ray tube? | Thermionic emission | Photoelectric absorption | Compton scattering | Radioactive decay | Heating the tungsten filament releases electrons.
M2#dentistry-u08-01-q2@2: Which exposure factor mainly controls the energy of the X-ray photons? | Kilovoltage | Tube current | Exposure time | Film speed | Higher kV accelerates electrons more, giving more energetic photons.
NUM2#dentistry-u08-01-q3@2: A beam has an intensity of 36 units at 20 cm. What is its intensity at 60 cm, using the inverse square law? | 4 | 0.1 | units | Distance triples, so intensity falls by 3 squared, 9: 36 ÷ 9 = 4 units.
M3#dentistry-u08-01-q4@3: Why is a copper block used to hold the tungsten target? | It conducts heat away from the target | It produces most of the X-rays | It filters low-energy photons | It focuses the electron beam | Most electron energy becomes heat, which copper removes.
SA2#dentistry-u08-01-q5@1,2: Explain how X-rays are produced in a dental X-ray tube. | A tungsten filament in the cathode is heated so that it releases electrons by thermionic emission. A high voltage accelerates these electrons across a vacuum to a tungsten target in a copper anode. When they hit the target, most of their energy becomes heat, and about 1% becomes X-rays, mainly as bremsstrahlung when electrons are slowed by nuclei, with some characteristic radiation from inner-shell transitions. The beam then passes through aluminium filtration and a collimator. | Filament and thermionic emission ; Acceleration by kV ; Bremsstrahlung and characteristic ; Heat and filtration

## Interaction of X-rays with matter
LV: Preclinical · Foundation
S: An X-ray image is a map of how much radiation passes through each part of the patient. This lesson explains attenuation, the photoelectric effect and Compton scatter, and how they create contrast and affect dose.
O: Define attenuation and the factors that affect it
O: Compare the photoelectric effect and Compton scatter
O: Explain how these interactions create radiographic contrast and scatter dose
H: Attenuation
P: As an X-ray beam passes through tissue, some photons pass straight through, some are **absorbed** and some are **scattered**. The reduction in beam intensity is **attenuation**. It increases with the **thickness** and **density** of the tissue and with its **atomic number (Z)**, and decreases as **photon energy** rises. Enamel, dentine and bone, which contain calcium and phosphorus, attenuate more than soft tissue, so fewer photons reach the receptor behind them. Areas that let few photons through appear white (**radiopaque**), and areas that let many through appear dark (**radiolucent**). Metal restorations, with very high atomic number, appear brightest of all.
H: The two main interactions
- In the **photoelectric effect**, a photon is completely absorbed by ejecting an inner-shell electron.
- Photoelectric absorption depends strongly on atomic number, roughly as Z cubed, so it creates **contrast** between tissues.
- It also contributes much of the **patient dose**.
- In **Compton scatter**, a photon ejects an outer-shell electron and continues with less energy in a new direction.
- Compton scatter depends mainly on tissue density, not atomic number, and **reduces image contrast** by fogging.
- Scattered photons are the main source of **dose to staff** in the surgery.
H: Consequences for practice
- Lower kV increases photoelectric absorption and contrast but raises patient dose.
- Higher kV reduces dose and contrast and increases scatter.
- **Collimation** reduces the volume irradiated and so reduces scatter.
- Staff are protected from scatter mainly by **distance** and by standing outside the primary beam.
- Lead protection works because lead's high atomic number gives strong photoelectric absorption.
X: Why an amalgam looks white.
> A bitewing shows a bright white shape in a lower molar and grey enamel and dentine around it.
> The amalgam contains silver, tin and mercury, with high atomic numbers.
> It absorbs almost all photons by the photoelectric effect, so none reach the sensor.
> Composite with radiopaque glass filler appears whiter than dentine but less bright than amalgam.
K: Attenuation depends on thickness, density, atomic number and photon energy; the photoelectric effect absorbs photons, depends on atomic number and creates contrast and patient dose, while Compton scatter depends on density, reduces contrast and is the main dose to staff.
!: Assuming radiolucent areas are where the beam was absorbed. Dark areas are where many photons passed through; white areas are where they were absorbed.
EV: established | Photoelectric absorption increases sharply with atomic number, producing contrast between hard and soft tissues.
T: Attenuation | Reduction of beam intensity as it passes through matter
T: Photoelectric effect | Complete absorption of a photon by ejection of an inner-shell electron
T: Compton scatter | Partial transfer of photon energy to an outer-shell electron, with a deflected photon
SUM: Dense, high-Z tissue is white.
SUM: Photoelectric gives contrast.
SUM: Compton gives scatter.
SRC: Whaites E. and Drage N., Essentials of Dental Radiography and Radiology, 6th edition, Elsevier | secondary | 2021
SRC: Bushberg J. T. et al., The Essential Physics of Medical Imaging, 4th edition, Wolters Kluwer | secondary | 2020
Q: What does radiolucent mean? | An area that lets many X-ray photons through and appears dark.
Q: Which interaction is the main source of dose to staff? | Compton scatter.
M1#dentistry-u08-02-q1@1: Which tissue would appear most radiopaque on a dental radiograph? | Enamel | Pulp | Periodontal ligament | Gingiva | Enamel is the most mineralised natural tissue, attenuating most.
M2#dentistry-u08-02-q2@2: Which interaction is most responsible for contrast between enamel and soft tissue? | Photoelectric absorption | Compton scatter | Coherent scatter | Pair production | Photoelectric absorption rises steeply with atomic number.
TF2#dentistry-u08-02-q3@2: Increasing the kilovoltage generally increases image contrast and patient dose. | false | Higher kV makes photons more penetrating, reducing contrast and generally reducing patient dose.
M3#dentistry-u08-02-q4@3: Why is lead effective as a shielding material in X-ray rooms? | Its high atomic number absorbs photons | Its low density lets scatter escape | It converts X-rays into heat only | It reflects photons back to the tube | Lead's high Z gives strong photoelectric absorption.
SA2#dentistry-u08-02-q5@2,3: Compare the photoelectric effect and Compton scatter and explain their importance in dental radiography. | In the photoelectric effect a photon is completely absorbed as it ejects an inner-shell electron; this depends strongly on atomic number and creates the contrast between teeth, bone and soft tissue, but it also gives much of the patient dose. In Compton scatter a photon gives some energy to an outer electron and is deflected; this depends on density and produces scattered radiation. Scatter fogs the image, reducing contrast, and is the main source of dose to staff. Collimation and distance reduce its effects. | Photoelectric mechanism ; Contrast and dose ; Compton mechanism ; Scatter effects and control

## Biological effects of ionising radiation
LV: Preclinical · Foundation
S: Ionising radiation can damage DNA and living cells. This lesson explains how damage occurs, the difference between deterministic and stochastic effects and why even low dental doses are kept as low as reasonably practicable.
O: Describe direct and indirect radiation damage to DNA
O: Distinguish deterministic effects from stochastic effects
O: Explain the linear no-threshold model and its implications for dentistry
H: How radiation damages cells
P: X-rays are **ionising**: they remove electrons from atoms, creating charged particles and **free radicals**. Damage to **DNA** can be **direct**, when the radiation breaks DNA strands itself, or **indirect**, when radiation splits water molecules into reactive free radicals, such as the hydroxyl radical, that then attack DNA. Since cells are mostly water, **indirect damage** predominates for X-rays. Cells can repair many breaks, but faulty repair can cause **cell death**, **mutation** or **carcinogenesis**. Rapidly dividing, poorly differentiated cells are the most **radiosensitive**, so children are more sensitive than adults and have longer to express late effects.
H: Deterministic and stochastic effects
- **Deterministic effects** (tissue reactions) have a **threshold dose**, and severity increases with dose.
- Examples include skin erythema, cataract, hair loss and the oral mucositis and **xerostomia** seen after radiotherapy for head and neck cancer.
- Dental diagnostic doses are far below deterministic thresholds.
- **Stochastic effects**, mainly **cancer** and heritable effects, have **no safe threshold**; the probability rises with dose, but severity does not.
- Stochastic risk is the main concern in diagnostic dental radiography.
H: The linear no-threshold model
- The **linear no-threshold (LNT)** model assumes risk is proportional to dose with no safe lower limit.
- The International Commission on Radiological Protection uses LNT to set protection standards.
- It underpins the principle that doses should be **as low as reasonably practicable (ALARP)**.
- Risk per unit dose is higher in **children and young adults** and falls with age.
- Whether LNT accurately predicts risk at very low doses is debated, but it remains the basis of UK regulation.
X: Explaining risk to a parent.
> A parent asks whether bitewings will harm her 9-year-old.
> The dentist explains that each radiograph gives a very small dose with a very small added cancer risk.
> Children are more sensitive, so radiographs are taken only when they will change care, with rectangular collimation and fast receptors.
> Missing caries in a high-risk child would carry a greater risk of harm.
K: X-rays damage DNA mainly indirectly through free radicals; deterministic effects have thresholds far above dental doses, while stochastic effects such as cancer have no threshold, so under the linear no-threshold model every exposure must be justified and kept as low as reasonably practicable.
!: Saying dental X-rays carry no risk. The stochastic risk is very small but not zero, so exposures must be justified and optimised.
EV: established | Deterministic effects of radiation have a threshold dose, while stochastic effects are assumed to have none.
EV: contested | Whether the linear no-threshold model accurately predicts cancer risk at very low doses.
T: Deterministic effect | A tissue reaction with a threshold dose whose severity increases with dose
T: Stochastic effect | A chance effect, such as cancer, whose probability increases with dose without a threshold
T: ALARP | As low as reasonably practicable, the principle of keeping doses to a minimum
SUM: Mostly indirect damage.
SUM: Deterministic has a threshold.
SUM: Stochastic risk matters in dentistry.
SRC: International Commission on Radiological Protection, The 2007 Recommendations of the ICRP, ICRP Publication 103, Annals of the ICRP 37(2–4) | guidance | 2007 | https://www.icrp.org/publication.asp?id=ICRP%20Publication%20103
SRC: Whaites E. and Drage N., Essentials of Dental Radiography and Radiology, 6th edition, Elsevier | secondary | 2021
Q: Why does indirect DNA damage predominate with X-rays? | Cells are mostly water, which radiation splits into free radicals.
Q: Why are children more sensitive to radiation? | Their cells divide more rapidly and they have longer to develop late effects.
M1#dentistry-u08-03-q1@1: Which effect of radiation has no threshold dose? | Cancer induction | Skin erythema | Cataract | Hair loss | Cancer is a stochastic effect with probability rising with dose.
M2#dentistry-u08-03-q2@2: Which describes a deterministic effect? | Severity increases with dose above a threshold | Probability increases with no threshold | It only affects future generations | It cannot occur at any dose | Tissue reactions need a threshold and worsen with dose.
MATCH2#dentistry-u08-03-q3@2: Match each term to its description. | Direct damage = Radiation breaks DNA itself ; Indirect damage = Free radicals attack DNA ; Stochastic = Chance of cancer rises with dose ; Deterministic = Threshold then dose-related severity | These concepts underpin radiation protection.
M3#dentistry-u08-03-q4@3: Which patient group has the highest risk per unit of dose from a dental radiograph? | Children | Adults over 60 | Adults aged 40 | All groups equally | Risk per unit dose is highest in the young and falls with age.
SA2#dentistry-u08-03-q5@2,3: Explain why dental radiographs must be justified even though doses are low. | Diagnostic dental doses are far below the threshold for deterministic effects, but stochastic effects such as cancer are assumed to have no threshold. Under the linear no-threshold model, every exposure carries a small added risk proportional to dose. Children and young people are more sensitive. So each exposure must offer a net benefit, such as detecting disease that will change management, and doses must be kept as low as reasonably practicable. | Below deterministic thresholds ; Stochastic risk without threshold ; LNT and children ; Net benefit and ALARP

## Radiation doses in dentistry
LV: Preclinical · Application
S: Comparing doses helps dentists explain risk and choose the right examination. This lesson explains absorbed, equivalent and effective dose and gives typical doses from dental radiographs compared with natural background.
O: Distinguish absorbed, equivalent and effective dose
O: Compare typical effective doses from dental examinations
O: Explain dental doses to patients in context
H: Dose quantities
P: **Absorbed dose** is the energy deposited per kilogram of tissue, measured in **grays (Gy)**. **Equivalent dose** adjusts absorbed dose for the type of radiation using a **radiation weighting factor**; for X-rays this is 1, so equivalent dose in **sieverts (Sv)** equals absorbed dose in grays. **Effective dose** adds up the equivalent doses to each organ multiplied by a **tissue weighting factor** that reflects its sensitivity to cancer induction. It allows different examinations to be compared on a single scale of stochastic risk, but it is an estimate for a reference person, not an exact dose for an individual patient. In dentistry, doses are usually given in **microsieverts (μSv)**.
H: Typical doses
- **Intraoral** radiographs (bitewing or periapical) give effective doses of only a few microsieverts each, lowest with rectangular collimation and fast receptors.
- A **panoramic** radiograph gives roughly a few to around 20 μSv, depending on the machine.
- **Cone beam CT** doses vary widely, from tens to several hundred μSv, depending on field of view and settings.
- Medical **CT** of the head gives far higher doses than dental imaging.
- The UK average dose from natural **background radiation** is about 2.7 mSv per year, much of it from radon.
H: Talking about dose
- Compare doses with days of natural background, a figure patients can understand.
- Explain that radiographs are taken only when they are likely to change care.
- Avoid saying "no risk"; say the risk is very small.
- Rectangular collimation, digital receptors and correct technique to avoid retakes all reduce dose.
- Record the justification and the exposure in the clinical notes.
X: Putting a panoramic dose in context.
> A panoramic radiograph gives an effective dose of about 13.5 μSv on a particular unit.
> UK background radiation is about 2.7 mSv, or 2,700 μSv, per year, roughly 7.4 μSv per day.
> 13.5 ÷ 7.4 gives roughly two days of background radiation.
> The dentist uses this comparison when obtaining consent.
K: Absorbed dose is in grays, equivalent and effective doses are in sieverts, and effective dose uses tissue weighting factors to compare risk; intraoral films give a few microsieverts, panoramics a few to about 20, and CBCT much more, against UK background of about 2.7 mSv a year.
!: Treating effective dose as the exact dose to one patient. It is a risk-weighted estimate for a reference person, useful for comparison only.
EV: established | Effective doses from intraoral dental radiographs are of the order of a few microsieverts.
T: Gray | The unit of absorbed dose, one joule per kilogram
T: Sievert | The unit of equivalent and effective dose
T: Tissue weighting factor | A factor reflecting an organ's contribution to stochastic risk
SUM: Gy absorbed, Sv effective.
SUM: Intraoral is a few μSv.
SUM: Compare with background.
SRC: UK Health Security Agency, Ionising radiation: dose comparisons | guidance | 2011 | https://www.gov.uk/government/publications/ionising-radiation-dose-comparisons
SRC: Whaites E. and Drage N., Essentials of Dental Radiography and Radiology, 6th edition, Elsevier | secondary | 2021
SRC: European Commission, Radiation Protection No 172: Cone beam CT for dental and maxillofacial radiology, evidence-based guidelines | guidance | 2012
Q: What is the unit of absorbed dose? | The gray (Gy).
Q: What is the approximate average annual background dose in the UK? | About 2.7 mSv.
M1#dentistry-u08-04-q1@1: Which quantity is used to compare the stochastic risk of different examinations? | Effective dose | Absorbed dose | Exposure time | Tube current | Effective dose weights organ doses by sensitivity.
NUM2#dentistry-u08-04-q2@2: An examination gives 27 μSv. Background is 2.7 mSv per year. What fraction of a year's background is this, as a percentage? | 1 | 0.05 | % | 27 μSv ÷ 2,700 μSv × 100 = 1% of a year's background.
M2#dentistry-u08-04-q3@2: Which dental examination typically gives the highest effective dose? | Large field of view cone beam CT | A pair of bitewings | A single periapical | An upper occlusal | CBCT doses are many times those of intraoral films.
M3#dentistry-u08-04-q4@3: A patient refuses all radiographs, saying they cause cancer. What is the best response? | Explain the very small risk and the benefit, and respect an informed refusal | Insist they cannot be treated without them | Tell them there is no risk at all | Take the radiographs without consent | Balanced information supports consent; record any informed refusal.
SA2#dentistry-u08-04-q5@1,3: Explain the difference between absorbed and effective dose and how you would explain the dose of a bitewing to a patient. | Absorbed dose is the energy deposited per kilogram of tissue, in grays. Effective dose weights organ doses by radiation type and tissue sensitivity, in sieverts, so examinations can be compared by stochastic risk. A bitewing gives an effective dose of only a few microsieverts, comparable to about a day of natural background. I would explain that the risk is very small but not zero, and that the radiograph is taken because it is likely to find disease that changes treatment. | Absorbed dose ; Effective dose and weighting ; Bitewing dose in context ; Benefit and honest risk

## IRR17 and IR(ME)R in dentistry
LV: Clinical · Foundation
S: Two sets of UK regulations govern the use of X-rays in dental practice. This lesson explains the Ionising Radiations Regulations 2017, which protect workers and the public, and the Ionising Radiation (Medical Exposure) Regulations 2017, which protect patients.
O: Describe the purpose and main requirements of IRR17
O: Describe the duty holders and requirements of IR(ME)R 2017
O: Apply the regulations to everyday dental practice
H: IRR17: protecting staff and public
P: The **Ionising Radiations Regulations 2017 (IRR17)** are enforced by the **Health and Safety Executive (HSE)** and protect employees and members of the public. A dental practice must **register** its use of X-rays with the HSE, carry out a **radiation risk assessment**, appoint a **Radiation Protection Adviser (RPA)** and a **Radiation Protection Supervisor (RPS)**, and write **local rules**. New equipment needs a **critical examination** after installation. Annual **dose limits** include 20 mSv effective dose for employees and 1 mSv for members of the public, though staff doses in a well-run dental practice are tiny. A **controlled area** is defined around the equipment where special procedures apply.
H: IR(ME)R: protecting patients
- The **Ionising Radiation (Medical Exposure) Regulations 2017** protect patients and are enforced in England by the **Care Quality Commission**.
- The **employer** must provide written procedures, training records and quality assurance.
- The **referrer** supplies clinical information to justify an exposure.
- The **practitioner** justifies the exposure, deciding it gives a net benefit.
- The **operator** carries out any practical aspect, such as positioning or processing.
- One dentist may act as referrer, practitioner and operator, but must be trained for each role.
- A **Medical Physics Expert (MPE)** must be involved for advice on optimisation and dose.
H: In practice
- **Diagnostic reference levels** set expected doses for standard examinations.
- Every exposure must be **justified**, **authorised** and its **clinical evaluation** recorded in the notes.
- Significant accidental or unintended exposures must be investigated and may need reporting.
- Regular training keeps staff up to date, as required by the GDC's continuing professional development scheme.
X: Roles in a typical practice.
> A dentist examines a patient and decides bitewings are needed.
> She is the referrer, gives the clinical reasons and, as practitioner, justifies the exposure.
> A trained dental nurse acts as operator, positioning the holder and sensor.
> The dentist records the justification and her report of the images in the notes.
K: IRR17 protects staff and the public through HSE registration, risk assessment, an RPA and RPS, local rules and dose limits, while IR(ME)R 2017 protects patients through the roles of employer, referrer, practitioner and operator, written procedures, justification and recorded evaluation.
!: Mixing up the two sets of regulations. IRR17 is about workers and the public; IR(ME)R is about patients.
EV: established | In the UK, IRR17 regulates occupational and public exposure, while IR(ME)R 2017 regulates medical exposure of patients.
T: Radiation Protection Adviser | A qualified expert who advises the employer on compliance with IRR17
T: Practitioner (IR(ME)R) | The person who justifies a medical exposure
T: Local rules | Written instructions for safe working with X-ray equipment in a specific area
SUM: IRR17 protects staff and public.
SUM: IR(ME)R protects patients.
SUM: Referrer, practitioner, operator.
SRC: UK Health Security Agency and College of General Dentistry, Guidance notes for dental practitioners on the safe use of dental X-ray equipment, 2nd edition | guidance | 2020
SRC: The Ionising Radiations Regulations 2017, SI 2017/1075 | guidance | 2017 | https://www.legislation.gov.uk/uksi/2017/1075/contents
SRC: The Ionising Radiation (Medical Exposure) Regulations 2017, SI 2017/1322 | guidance | 2017 | https://www.legislation.gov.uk/uksi/2017/1322/contents
Q: Who justifies a medical exposure under IR(ME)R? | The practitioner.
Q: What is the annual effective dose limit for members of the public under IRR17? | 1 mSv.
M1#dentistry-u08-05-q1@1: Which body enforces IRR17? | The Health and Safety Executive | The General Dental Council | NHS England | The Care Quality Commission only | IRR17 is health and safety law enforced by the HSE.
M2#dentistry-u08-05-q2@2: Under IR(ME)R, who carries out the practical aspects of an exposure? | The operator | The referrer | The Radiation Protection Adviser | The employer | Applying the standard result: Operators position, expose and process.
MATCH2#dentistry-u08-05-q3@2: Match each duty holder to its role. | Referrer = Supplies clinical information ; Practitioner = Justifies the exposure ; Operator = Carries out practical aspects ; Employer = Provides written procedures | These are the IR(ME)R 2017 duty holders.
M3#dentistry-u08-05-q4@3: A nurse takes a radiograph that the dentist has not justified. What has gone wrong? | An exposure without justification breaches IR(ME)R | Nothing, if the nurse is trained | It breaches IRR17 dose limits | It is acceptable if the image is good | Every medical exposure must be justified by a practitioner first.
SA2#dentistry-u08-05-q5@1,2: Compare the purpose and main requirements of IRR17 and IR(ME)R 2017 in a dental practice. | IRR17 protects employees and the public; it requires registration with the HSE, a radiation risk assessment, appointment of a Radiation Protection Adviser and Supervisor, local rules, critical examination of new equipment and dose limits. IR(ME)R 2017 protects patients; it defines the employer, referrer, practitioner and operator. It requires written procedures, justification and authorisation of every exposure, optimisation with a Medical Physics Expert, and a recorded clinical evaluation. | IRR17 purpose ; IRR17 requirements ; IR(ME)R duty holders ; Justification and evaluation

## Justification and optimisation
LV: Clinical · Application
S: Justification and optimisation are the core principles of patient radiation protection. This lesson explains how to decide whether a radiograph is needed and how to keep the dose as low as reasonably practicable once it is.
O: Explain the principle of justification under IR(ME)R
O: Describe the main methods of dose optimisation in dental radiography
O: Apply justification and optimisation to clinical decisions
H: Justification
P: **Justification** means deciding that an exposure will give a **net benefit** to the patient, weighing the expected diagnostic information against the risk. It is a legal requirement under IR(ME)R and is the practitioner's responsibility. A radiograph should be taken only after a **history and clinical examination**, and only if the result is likely to **change management**. Previous images should be obtained where possible to avoid repeats. **Routine** or "screening" radiographs at fixed intervals for every patient, without considering individual risk, are not justified. The **FGDP selection criteria** give evidence-based guidance on when each type of radiograph is appropriate.
H: Optimisation
- **Rectangular collimation** reduces the irradiated area and dose compared with a round beam.
- Use **fast receptors**: F-speed film or digital sensors.
- Use **film holders** with beam-aiming devices to ensure alignment and avoid retakes.
- Run intraoral sets at 60 to 70 kV with a suitable focus-to-skin distance.
- Use the lowest exposure that gives a diagnostic image, guided by diagnostic reference levels.
- Thyroid collars are used only when the thyroid is in or near the primary beam, for example some occlusal views.
H: Limitation and records
- Patients are not subject to dose limits, because justification and optimisation protect them instead.
- Record the reason for every radiograph, the views taken and a **clinical evaluation** of the findings.
- An unreported radiograph has given dose without benefit.
- Audit retake rates and image quality to drive improvement.
X: Avoiding an unjustified radiograph.
> A new adult patient with no symptoms says a previous dentist took bitewings three months ago.
> The dentist requests the images from the previous practice rather than repeating them.
> They show no caries, and the patient's risk is assessed as low.
> Further bitewings are planned in line with the selection criteria rather than repeated now.
K: Justification means every radiograph must give a net benefit after history and examination and be likely to change management, and optimisation keeps dose as low as reasonably practicable with rectangular collimation, fast receptors, holders and good technique, with justification and evaluation recorded.
!: Taking a full set of radiographs for every new patient "to be safe". Radiographs must be justified individually after examination, in line with selection criteria.
EV: established | Rectangular collimation substantially reduces patient effective dose from intraoral radiographs compared with round collimation.
T: Justification | Deciding an exposure gives a net benefit to the patient
T: Optimisation | Keeping each exposure as low as reasonably practicable while obtaining a diagnostic image
T: Diagnostic reference level | An expected dose level for a standard examination used to guide optimisation
SUM: Examine before you expose.
SUM: Only if it changes care.
SUM: Collimate, hold, use fast receptors.
SRC: Faculty of General Dental Practice (UK), Selection Criteria for Dental Radiography, 3rd edition | guidance | 2018
SRC: UK Health Security Agency and College of General Dentistry, Guidance notes for dental practitioners on the safe use of dental X-ray equipment, 2nd edition | guidance | 2020
Q: When should a radiograph be taken? | Only after history and examination, when it is likely to change management.
Q: Why are patients not given dose limits? | Justification and optimisation protect them instead.
M1#dentistry-u08-06-q1@1: What does justification of an exposure mean? | It gives the patient a net benefit | It uses the lowest kV setting | It is the operator's job alone | It applies only to children | Justification weighs diagnostic benefit against risk.
TF2#dentistry-u08-06-q2@2: Patients undergoing dental radiography are subject to an annual dose limit of 1 mSv. | false | Dose limits apply to staff and public; patients are protected by justification and optimisation.
M2#dentistry-u08-06-q3@2: Which change most reduces patient dose from an intraoral radiograph? | Rectangular instead of round collimation | Using D-speed film instead of F-speed | Running the set at 50 kV | Removing the film holder | Rectangular collimation reduces the area irradiated.
M3#dentistry-u08-06-q4@3: Which of these is a justified radiograph? | Bitewings for a high caries risk patient after examination | Panoramic for every new patient before examination | Repeat bitewings one week after the last set | Periapicals of all teeth at each recall | Justification needs individual assessment and likely change in care.
SA2#dentistry-u08-06-q5@2,3: Describe how a dentist should justify and optimise a periapical radiograph for a painful lower molar. | The dentist first takes a history and examines the tooth, including pulp tests, and checks for recent images. If a periapical is likely to change management, for example by confirming apical pathology before root canal treatment, it is justified and the reason recorded. Optimisation uses a film holder with rectangular collimation, a digital sensor or F-speed film and the correct exposure to avoid retakes. The image is then reported and the evaluation recorded. | History, examination and previous images ; Net benefit and record ; Collimation, holder, receptor ; Reporting the image

## Radiation protection in the dental surgery
LV: Clinical · Foundation
S: Good radiation protection keeps staff and public doses tiny and patient doses as low as reasonably practicable. This lesson covers the controlled area, distance and shielding, equipment features and the special cases of pregnancy and children.
O: Describe the controlled area and staff protection measures in a dental surgery
O: Identify equipment features that reduce patient dose
O: Apply protection principles to pregnant patients, pregnant staff and children
H: Protecting staff and the public
P: The three basic tools of protection are **time**, **distance** and **shielding**. For intraoral sets, the UK guidance notes define a **controlled area** extending **1.5 metres** from the X-ray tube and the patient, and anywhere in the **primary beam** until it has been sufficiently attenuated by distance or shielding. During exposure, staff should be **outside the controlled area**, ideally out of the room or behind a protective screen, and never hold a sensor or the tube head. A warning light or sign shows when the equipment is ready to expose. Walls and doors may need extra shielding where the primary beam points at an occupied area, as decided in the **risk assessment** with the Radiation Protection Adviser.
H: Equipment and patient protection
- Intraoral sets should operate at **60 to 70 kV**, with appropriate aluminium filtration.
- **Rectangular collimation** should be fitted to intraoral sets, as recommended in the guidance notes.
- Beam-aiming devices and holders improve alignment and reduce retakes.
- A minimum **focus-to-skin distance** is set by the guidance for intraoral sets, typically 20 cm at 60 kV or above.
- **Lead aprons** are not needed for routine dental radiography, as the abdomen is not in the beam.
- **Thyroid collars** are used only where the thyroid is in the primary beam.
H: Special cases
- For **pregnant patients**, the abdomen is not in the primary beam and fetal dose from dental radiography is negligible; justification is the same as for any patient, though some may prefer to wait.
- **Pregnant staff** should tell their employer; a specific risk assessment is done, but normal working practices give doses well below the fetal limit.
- **Children** are more radiosensitive, so justification and optimisation are especially important.
- Never ask a member of staff to hold a patient during exposure; a carer may hold, with information and protection, as set out in written procedures.
X: Setting up a new surgery.
> A practice installs a new intraoral X-ray set.
> The RPA reviews the room plan and confirms the controlled area is 1.5 m from the tube and patient.
> The operator's exposure switch is placed outside the room with a view of the patient.
> A critical examination is carried out before the set is used clinically.
K: Staff are protected by time, distance and shielding and by staying outside the 1.5 m controlled area and primary beam; patients are protected by 60 to 70 kV sets, rectangular collimation and holders, while lead aprons are not routinely needed and thyroid collars are used only when the thyroid is in the beam.
!: Putting a lead apron on every patient. It gives no meaningful protection for intraoral views and can obstruct positioning; thyroid collars are used only where the thyroid is in the beam.
EV: established | Fetal dose from dental radiography is negligible because the abdomen is not in the primary beam.
T: Controlled area | An area around X-ray equipment where special procedures apply to restrict exposure
T: Primary beam | The useful X-ray beam emerging from the tube head
T: Critical examination | A check by the installer, with RPA advice, that safety features work after installation
SUM: Time, distance, shielding.
SUM: 1.5 m controlled area.
SUM: No routine lead aprons.
SRC: UK Health Security Agency and College of General Dentistry, Guidance notes for dental practitioners on the safe use of dental X-ray equipment, 2nd edition | guidance | 2020
SRC: Whaites E. and Drage N., Essentials of Dental Radiography and Radiology, 6th edition, Elsevier | secondary | 2021
Q: What is the controlled area for a typical intraoral X-ray set? | Within 1.5 m of the tube and patient, and in the primary beam until attenuated.
Q: When should a thyroid collar be used? | Only when the thyroid is in or near the primary beam.
M1#dentistry-u08-07-q1@1: What are the three basic tools of radiation protection? | Time, distance and shielding | Speed, film and angle | Kilovoltage, current and filter | Holder, apron and collar | Reducing time, increasing distance and using shielding all lower dose.
M2#dentistry-u08-07-q2@2: Where should the operator stand during an intraoral exposure? | Outside the controlled area | Holding the sensor in place | Beside the tube head | In line with the primary beam | Staying outside 1.5 m and the beam keeps staff dose minimal.
TF2#dentistry-u08-07-q3@2: A pregnant patient needing a justified bitewing should be told that dental radiography gives a negligible fetal dose. | true | The abdomen is not in the primary beam, so fetal dose is negligible; the patient may still choose to delay.
M3#dentistry-u08-07-q4@3: A child cannot keep still for a periapical. Who may hold the sensor? | A parent or carer, with information and protection | The dental nurse, at every visit | The dentist, wearing a lead apron | Any member of staff on a rota | Staff must not hold; a carer may, under written procedures.
SA2#dentistry-u08-07-q5@1,3: Describe how staff in a dental practice are protected from radiation. | Staff use time, distance and shielding: they stand outside the controlled area, which for intraoral sets extends 1.5 m from the tube and patient and along the primary beam, ideally outside the room or behind a screen. They never hold sensors or the tube head. A risk assessment with the Radiation Protection Adviser decides shielding and the controlled area, and local rules set working instructions. Pregnant staff have a specific risk assessment. | Distance and controlled area ; Never hold sensors ; Risk assessment and local rules ; Pregnant staff

## Quality assurance in dental radiography
LV: Clinical · Application
S: Quality assurance makes sure radiographs are diagnostic, doses are low and equipment works safely. This lesson covers image quality grading, audit, equipment testing and the written quality assurance programme.
O: Describe the components of a radiographic quality assurance programme
O: Apply the current image quality rating system
O: Use audit to improve radiographic practice
H: The quality assurance programme
P: Under IR(ME)R the employer must have a **quality assurance (QA) programme**. It covers **image quality**, **patient dose** and **diagnostic reference levels**, **equipment** performance, **receptor and processing** checks, **staff training** and **audit**. Equipment must have a **critical examination** on installation and routine testing, typically by a qualified physicist at least every three years, with daily or weekly checks by staff. Digital systems need checks of sensors, plates and **monitors**, as poor display can hide disease. Each check, fault and action should be recorded, and a named person should be responsible.
H: Image quality rating
- The current UK guidance uses a two-point scale: **A (diagnostically acceptable)** and **N (diagnostically not acceptable)**.
- The target is that at least **95%** of radiographs are rated A.
- Not more than 5% should be rated N, with the reasons recorded.
- Previously a three-point scale (excellent, acceptable, unacceptable) was used, which students may meet in older audits.
- Every radiograph should be graded and reported in the clinical notes.
H: Audit
- Regular **audit** of image quality, retakes and justification is a requirement of the QA programme.
- Audit compares practice with standards, identifies causes of failure and plans changes.
- Common causes of N grades are positioning errors, cone cutting and wrong exposure.
- Re-audit closes the loop and confirms improvement.
- Results support CPD and the practice's clinical governance.
X: An image quality audit.
> A practice reviews 200 recent intraoral radiographs.
> 184 are rated A and 16 are rated N, mostly for cone cutting.
> 184 ÷ 200 is 92%, below the 95% target.
> Staff receive training in using beam-aiming devices, and a re-audit is planned in six months.
K: A radiographic QA programme covers image quality, dose, equipment testing, receptors and monitors, training and audit; current UK guidance grades images A or N with a target of at least 95% acceptable, and audit with re-audit drives improvement.
!: Grading images but not acting on the results. QA needs audit, analysis of causes and re-audit.
EV: established | Image quality audit is a required part of the dental radiography quality assurance programme in UK guidance.
T: Quality assurance | A planned programme ensuring consistent, high-quality and safe radiography
T: Diagnostically acceptable | An image graded A, adequate for its clinical purpose
T: Clinical audit | Comparing practice with standards and acting to improve it
SUM: Grade A or N.
SUM: Target 95% A.
SUM: Audit, act, re-audit.
SRC: UK Health Security Agency and College of General Dentistry, Guidance notes for dental practitioners on the safe use of dental X-ray equipment, 2nd edition | guidance | 2020
SRC: Faculty of General Dental Practice (UK), Selection Criteria for Dental Radiography, 3rd edition | guidance | 2018
Q: What is the current UK image quality target? | At least 95% of radiographs rated diagnostically acceptable (A).
Q: Why should display monitors be included in QA? | Poor monitor display can hide disease on digital images.
M1#dentistry-u08-08-q1@1: What does a grade N mean in the current image quality rating? | Diagnostically not acceptable | Normal anatomy shown | Needs a second opinion | No exposure recorded | The two-point scale grades images A or N.
NUM2#dentistry-u08-08-q2@2: In an audit, 285 of 300 radiographs are rated A. What percentage is diagnostically acceptable? | 95 | 0.1 | % | 285 ÷ 300 × 100 = 95% rated A, meeting the target.
M2#dentistry-u08-08-q3@2: Which element is required in a radiographic quality assurance programme? | Regular audit of image quality | Lead aprons for all patients | Annual dose limits for patients | Daily panoramic of each staff member | Audit is a core part of the QA programme.
M3#dentistry-u08-08-q4@3: An audit shows many N grades due to cone cutting. What is the best action? | Train staff in beam-aiming devices and re-audit | Increase the exposure time | Stop taking intraoral radiographs | Change to D-speed film | Cone cutting is a positioning fault, solved by correct use of aiming devices.
SA2#dentistry-u08-08-q5@1,3: Describe how you would carry out an image quality audit in a dental practice. | I would agree the standard, which is at least 95% of radiographs diagnostically acceptable. A sample of recent radiographs would be graded A or N, with the reasons for N grades recorded. Results would be compared with the standard and the causes analysed, such as positioning errors or wrong exposure. Changes such as training would be made and a re-audit planned to confirm improvement. | Set standard ; Sample and grade ; Analyse causes ; Act and re-audit

## Image receptors: film and digital
LV: Preclinical · Foundation
S: The receptor captures the X-ray pattern and turns it into an image. This lesson compares film with the two main digital systems, solid-state sensors and phosphor plates, and their effect on dose, workflow and infection control.
O: Describe the structure and processing of radiographic film
O: Compare solid-state sensors and photostimulable phosphor plates
O: Evaluate the advantages and limitations of digital radiography
H: Film
P: Dental **film** has a plastic base coated with an **emulsion** of **silver halide** crystals. X-ray photons convert some crystals into a **latent image**. In **processing**, a **developer** reduces exposed crystals to black metallic silver, and a **fixer** removes unexposed crystals, leaving clear areas. The film is then washed and dried. Film speed is graded by letter; **F-speed** film needs less exposure than D- or E-speed and is recommended. Intraoral film packets contain a **lead foil** behind the film to absorb back-scatter, and placing a packet the wrong way round gives a light, patterned image. Processing chemicals must be maintained and disposed of as hazardous waste.
H: Digital receptors
- **Solid-state sensors** (CCD or CMOS) are connected by a cable or wirelessly and give an image almost instantly.
- They are thick and rigid, which some patients find uncomfortable, and have a smaller active area than film.
- **Photostimulable phosphor (PSP) plates** are thin and flexible like film and are read in a laser scanner after exposure.
- PSP plates can be scratched or bent, producing artefacts, and must be kept from light before scanning.
- Both are protected by single-use barrier envelopes, cleaned between patients as set out in HTM 01-05.
H: Pros and cons of digital
- Digital receptors need less exposure than D-speed film, though F-speed film is similar to PSP.
- No chemical processing, quicker images and easy storage and sharing.
- Images can be enhanced in brightness and contrast, but over-processing can mislead.
- Wide exposure latitude can hide overexposure (**dose creep**), so settings must be audited.
- Images must be stored securely in line with data protection law.
X: A patterned, pale film.
> A bitewing on film comes out pale with a herringbone pattern over it.
> The film packet was placed back to front, so the beam passed through the lead foil first.
> The image is graded N and a retake is justified only if still needed.
> The operator is reminded to place the plain, coloured side of the packet towards the tube.
K: Film uses silver halide emulsion developed and fixed into an image, with F-speed recommended; digital radiography uses instant solid-state sensors or thin phosphor plates read by a scanner, removing chemical processing but needing care to avoid dose creep, artefacts and cross-infection.
!: Assuming digital always means a lower dose. PSP plates have similar sensitivity to F-speed film, and wide latitude can hide overexposure.
EV: established | F-speed film needs less exposure than D-speed film for an equivalent image.
T: Latent image | The invisible image formed in film before processing
T: PSP plate | A photostimulable phosphor plate read by laser after exposure
T: Dose creep | Gradual increase in exposures that digital systems can hide
SUM: Developer then fixer.
SUM: Sensor or phosphor plate.
SUM: Beware dose creep.
SRC: Whaites E. and Drage N., Essentials of Dental Radiography and Radiology, 6th edition, Elsevier | secondary | 2021
SRC: Department of Health, Health Technical Memorandum 01-05: Decontamination in primary care dental practices | guidance | 2013 | https://www.gov.uk/government/publications/decontamination-in-primary-care-dental-practices
Q: What does the fixer do in film processing? | Removes unexposed silver halide crystals.
Q: Why is there a lead foil in an intraoral film packet? | To absorb back-scattered radiation.
M1#dentistry-u08-09-q1@1: What is the light-sensitive part of radiographic film emulsion? | Silver halide crystals | Barium fluorohalide | Silicon pixels | Lead foil | Silver halide crystals form the latent image.
M2#dentistry-u08-09-q2@2: Which digital receptor is thin and flexible and read by laser scanning? | Photostimulable phosphor plate | CMOS sensor | CCD sensor | Intensifying screen | PSP plates resemble film and are scanned after exposure.
MATCH2#dentistry-u08-09-q3@2: Match each receptor to a feature. | F-speed film = Needs chemical processing ; CMOS sensor = Near-instant image ; PSP plate = Scanned by laser ; Lead foil = Absorbs back-scatter | These features guide receptor choice and handling.
M3#dentistry-u08-09-q4@3: A practice finds its digital images look fine but exposure settings have risen over a year. What is the risk? | Patients receive unnecessary dose | Images become uninterpretable | Sensors stop working | Film will be needed instead | Digital latitude can hide overexposure, so QA must monitor settings.
SA2#dentistry-u08-09-q5@2,3: Compare solid-state sensors and phosphor plates for intraoral radiography. | Solid-state CCD or CMOS sensors give an image almost instantly on screen and need relatively low exposure, but they are thick and rigid, can be uncomfortable and have a smaller active area. Phosphor plates are thin and flexible, similar to film in comfort and size, but must be scanned, taking more time. Plates can be scratched or bent, causing artefacts, and must be protected from light. Both need barrier envelopes and QA to prevent dose creep. | Sensor speed and dose ; Sensor bulk ; Plate comfort and scanning ; Artefacts and QA

## Intraoral techniques: bitewing and periapical
LV: Clinical · Application
S: Bitewings and periapicals are the most common dental radiographs. This lesson explains what each shows, the paralleling and bisecting angle techniques and how to position holders for diagnostic images.
O: Describe the uses of bitewing and periapical radiographs
O: Explain the paralleling and bisecting angle techniques
O: Apply correct positioning to obtain diagnostic intraoral images
H: Bitewing radiographs
P: **Bitewings** show the **crowns** of upper and lower posterior teeth and the **alveolar crest** on one image. They are the main radiograph for detecting **approximal caries** and assessing **restoration margins** and crestal bone. The receptor is placed lingually, parallel to the crowns, and held with a **bitewing holder** and beam-aiming device. The beam is aimed **horizontally** through the contact points, at right angles to the receptor, with slight downward angulation of about 5 to 10 degrees. Correct horizontal angulation is critical to avoid **overlapping contacts**, which hide caries. **Vertical bitewings** are used where bone loss is more advanced, to show more of the bone.
H: Periapical radiographs
- **Periapicals** show the whole tooth, including the **root apex** and at least 2 to 3 mm of surrounding bone.
- Uses include apical pathology, root morphology, trauma, before extraction and during root canal treatment.
- The **paralleling technique** places the receptor parallel to the long axis of the tooth in a holder, with the beam at right angles to both.
- Paralleling gives accurate, reproducible images with little distortion and is preferred.
- The **bisecting angle technique** aims the beam at right angles to the line bisecting the angle between tooth and receptor; it is used when paralleling is impossible.
- Bisecting angle images are prone to elongation, foreshortening and superimposition of the zygomatic buttress.
H: Positioning tips
- Explain the procedure and remove spectacles, dentures and removable appliances from the area.
- Assemble holders correctly before placing them in the mouth.
- Place the receptor far enough from the tooth to be parallel, especially in the upper arch.
- Align the rectangular collimator with the aiming ring to avoid cone cutting.
- Check the image immediately and report it.
X: Overlapping contacts.
> Bitewings of a 15-year-old show the premolar contacts overlapping on the left side.
> The beam was not aimed through the contacts at the correct horizontal angle.
> Caries between those teeth cannot be assessed.
> Using a holder and aligning the beam with the contacts would prevent the problem.
K: Bitewings show posterior crowns and crestal bone and are the key view for approximal caries, while periapicals show whole teeth and apical tissues; the paralleling technique with holders gives accurate, reproducible images and is preferred to the bisecting angle technique.
!: Placing the periapical receptor tight against the palate in the upper arch. This tilts it away from parallel; move it towards the midline so it lies parallel to the tooth.
EV: established | The paralleling technique produces less geometric distortion than the bisecting angle technique.
T: Bitewing | An intraoral view of upper and lower posterior crowns and crestal bone
T: Paralleling technique | Receptor parallel to the tooth, beam at right angles to both
T: Bisecting angle technique | Beam at right angles to the bisector of the tooth–receptor angle
SUM: Bitewings for approximal caries.
SUM: Periapicals show the apex.
SUM: Paralleling is preferred.
SRC: Whaites E. and Drage N., Essentials of Dental Radiography and Radiology, 6th edition, Elsevier | secondary | 2021
SRC: Faculty of General Dental Practice (UK), Selection Criteria for Dental Radiography, 3rd edition | guidance | 2018
Q: How much bone beyond the apex should a periapical show? | At least 2 to 3 mm.
Q: What causes overlapping contacts on a bitewing? | Incorrect horizontal angulation of the beam.
M1#dentistry-u08-10-q1@1: Which radiograph shows the entire tooth including its apex? | Periapical | Bitewing | Lateral cephalogram | Upper standard occlusal | Periapicals include the root apex and surrounding bone.
M2#dentistry-u08-10-q2@2: In the paralleling technique, how is the beam aimed? | At right angles to the tooth and receptor | Along the bisector of the angle | Parallel to the receptor | Steeply downwards at 45 degrees | Paralleling places tooth and receptor parallel, with the beam perpendicular.
SEQ2#dentistry-u08-10-q3@2: Put these steps for a periapical in order. | Justify and explain to the patient ; Assemble holder and receptor ; Position receptor parallel to the tooth ; Align aiming ring and collimator, then expose | Correct order reduces errors and retakes.
M3#dentistry-u08-10-q4@3: A bisecting angle periapical of an upper molar shows roots overlapped by a white shadow. What is it most likely to be? | The zygomatic buttress | The mental foramen | The genial tubercles | The mandibular canal | The zygomatic buttress commonly overlies upper molar apices in bisecting angle views.
SA2#dentistry-u08-10-q5@2,3: Compare the paralleling and bisecting angle techniques for periapical radiography. | In the paralleling technique the receptor is held in a holder parallel to the long axis of the tooth and the beam is aimed at right angles to both, giving accurate, reproducible images with little distortion. In the bisecting angle technique the receptor lies against the tooth and the beam is aimed at right angles to the line bisecting the tooth–receptor angle. This is useful where a holder cannot be placed, but it is prone to elongation, foreshortening and superimposition. Paralleling is preferred wherever possible. | Paralleling method ; Paralleling accuracy ; Bisecting method ; Bisecting distortion

## Occlusal radiographs
LV: Clinical · Application
S: Occlusal radiographs show larger areas of the jaws than periapicals. This lesson explains the main upper and lower occlusal views, their uses, and how parallax localises unerupted teeth.
O: Describe the main occlusal projections and their uses
O: Explain localisation of objects using parallax
O: Apply occlusal views and parallax in clinical scenarios
H: Occlusal projections
P: In **occlusal radiography** a large receptor is placed between the teeth in the occlusal plane. The **upper standard occlusal** is taken with the beam angled down through the bridge of the nose at about 65 to 70 degrees; it shows the anterior maxilla and is used for **unerupted canines**, **supernumeraries**, cysts and trauma. The **lower true occlusal** aims the beam vertically up through the floor of the mouth at 90 degrees to the receptor, giving a cross-section of the mandible; it is used for **submandibular duct stones** and expansion of the jaw. **Lower oblique occlusals** show the submandibular gland region and lower teeth. Occlusal views are also helpful for children and patients who cannot tolerate other receptors.
H: Parallax
- **Parallax** is the apparent movement of an object when viewed from two positions.
- Two radiographs are taken with the tube moved between them, either horizontally or vertically.
- The **SLOB rule**: Same Lingual, Opposite Buccal.
- If the object moves in the **same** direction as the tube, it is **palatal or lingual**; if it moves in the **opposite** direction, it is **buccal**.
- Vertical parallax often uses a panoramic and an upper standard occlusal together.
H: Clinical use
- Localising an **impacted upper canine** guides orthodontic and surgical planning.
- A thyroid collar may be appropriate for the upper standard occlusal if the thyroid is in line with the beam.
- CBCT may be justified where root resorption of adjacent teeth is suspected.
- Report on the position, the state of adjacent roots and any pathology.
X: Localising an impacted canine.
> A 12-year-old has a retained upper primary canine and no palpable permanent canine.
> A panoramic and an upper standard occlusal are taken.
> The tube is higher for the occlusal, and the canine crown moves upwards relative to the incisors, the same direction as the tube.
> By the SLOB rule the canine is palatal, and the child is referred for an orthodontic opinion.
K: The upper standard occlusal shows the anterior maxilla for canines and supernumeraries, the lower true occlusal shows the floor of the mouth for duct stones, and parallax with the SLOB rule localises objects: same direction as the tube means lingual, opposite means buccal.
!: Reversing the SLOB rule. An object that moves with the tube is lingual or palatal; one that moves against it is buccal.
EV: established | Parallax radiography using the SLOB rule is a validated method for localising impacted canines.
T: Occlusal radiograph | An intraoral view with the receptor in the occlusal plane, showing a large area
T: Parallax | Apparent shift of an object when viewed from two positions
T: SLOB rule | Same Lingual, Opposite Buccal, for localising objects
SUM: Upper standard for canines.
SUM: Lower true for duct stones.
SUM: Same lingual, opposite buccal.
SRC: Whaites E. and Drage N., Essentials of Dental Radiography and Radiology, 6th edition, Elsevier | secondary | 2021
SRC: Husain J., Burden D. and McSherry P., Management of the palatally ectopic maxillary canine, Royal College of Surgeons of England Faculty of Dental Surgery clinical guideline | guidance | 2016
Q: Which occlusal view is used to look for a submandibular duct stone? | The lower true occlusal.
Q: What does SLOB stand for? | Same Lingual, Opposite Buccal.
M1#dentistry-u08-11-q1@1: Which view is commonly used for unerupted upper canines and supernumeraries? | Upper standard occlusal | Lower true occlusal | Bitewing | Lateral oblique | Applying the standard result: It shows the anterior maxilla.
M2#dentistry-u08-11-q2@2: The tube is moved mesially and a tooth crown moves distally. Where is the tooth? | Buccal | Palatal | In the midline | It cannot be localised | Moving opposite to the tube means buccal under the SLOB rule.
TF2#dentistry-u08-11-q3@2: In the lower true occlusal projection, the beam is aimed at right angles to the receptor through the floor of the mouth. | true | The 90 degree beam gives a cross-sectional view of the mandible and floor of the mouth.
M3#dentistry-u08-11-q4@3: Parallax suggests an impacted canine is resorbing the root of the lateral incisor. What is the most appropriate next step? | Consider CBCT and refer for specialist opinion | Extract the lateral incisor at once | Repeat the occlusal in a week | Reassure and review in five years | Suspected resorption may justify CBCT and needs prompt orthodontic referral.
SA2#dentistry-u08-11-q5@1,2: Explain how parallax can be used to localise an unerupted upper canine. | Two radiographs are taken with the X-ray tube in different positions, horizontally between two periapicals or vertically with a panoramic and an upper standard occlusal. The apparent movement of the canine is compared with that of a reference such as the incisor roots. If the canine moves in the same direction as the tube it is palatal, and if it moves in the opposite direction it is buccal, the SLOB rule. Its position, and any resorption of adjacent roots, guide orthodontic and surgical planning. | Two views with tube shift ; Compare with reference ; SLOB rule ; Planning implications

## Panoramic radiography
LV: Clinical · Application
S: A panoramic radiograph shows both jaws and all teeth in one image. This lesson explains how panoramic tomography works, its indications and limitations, and the common positioning errors.
O: Explain how panoramic radiography uses tomography and the focal trough
O: Identify indications and limitations of panoramic radiographs
O: Recognise and correct common positioning errors
H: How it works
P: **Panoramic radiography** (dental panoramic tomography, DPT) uses a narrow vertical beam from a tube that rotates behind the patient's head while the receptor rotates in front. Only structures within a curved, horseshoe-shaped zone called the **focal trough** are shown sharply; structures outside it are blurred. The patient must be positioned so the dental arches lie within the trough. Because the beam passes upwards slightly and objects on the far side can project onto the image, **ghost images** appear, for example of the opposite ramus or earrings. Panoramics show the teeth, both jaws, the temporomandibular joints and the maxillary sinuses, but with less detail than intraoral views.
H: Indications and limitations
- Useful for assessing **third molars**, developing dentitions, large lesions and jaw fractures.
- Helpful in orthodontic assessment alongside clinical examination.
- Less sharp than intraoral views, so poor for detecting early caries or fine periapical detail.
- Anterior regions are often blurred by the cervical spine shadow.
- Not justified as a routine screening tool for all new patients, as the FGDP selection criteria stress.
H: Positioning errors
- **Head tipped down** (chin low): "smiling" occlusal plane, with lower incisors blurred and narrowed.
- **Head tipped up** (chin high): flattened or "frowning" occlusal plane and the hard palate overlying the upper apices.
- **Patient too far forward**: narrow, blurred anterior teeth; **too far back**: wide, blurred anterior teeth.
- **Head rotated**: teeth on one side wider than the other.
- **Tongue not against the palate**: a dark band over the upper tooth apices.
- Remove earrings, glasses and dentures to avoid ghost images.
X: A smiling panoramic.
> A panoramic shows the occlusal plane curving up sharply at both ends and blurred lower incisors.
> The chin was tipped too far down.
> The Frankfort plane was not horizontal.
> Careful use of the positioning lights and chin rest would prevent a retake.
K: Panoramic radiography uses a rotating narrow beam and a focal trough to image both jaws on one image; it suits third molars, developing dentitions and large lesions but gives less detail than intraoral views, and errors such as tipping, rotation and tongue position are avoided by careful positioning.
!: Using a panoramic to detect early approximal caries. Its resolution is too low; bitewings are needed.
EV: established | Panoramic radiographs have lower sensitivity than bitewings for approximal caries.
T: Focal trough | The curved zone within which structures are sharply imaged in panoramic radiography
T: Ghost image | A blurred, magnified image of an object on the opposite side of the patient
T: Frankfort plane | A line from the lower orbital rim to the top of the ear canal, positioned horizontally
SUM: Focal trough must hold the arches.
SUM: Less detail than intraoral.
SUM: Tongue up, chin level.
SRC: Whaites E. and Drage N., Essentials of Dental Radiography and Radiology, 6th edition, Elsevier | secondary | 2021
SRC: Faculty of General Dental Practice (UK), Selection Criteria for Dental Radiography, 3rd edition | guidance | 2018
Q: What causes a dark band over the upper apices on a panoramic? | The tongue not held against the palate.
Q: What is a ghost image? | A blurred image of an object on the opposite side of the head projected onto the film.
M1#dentistry-u08-12-q1@1: What name is given to the zone in which structures appear sharp on a panoramic? | The focal trough | The controlled area | The primary beam | The penumbra | Only structures in the focal trough are in focus.
M2#dentistry-u08-12-q2@2: A panoramic shows narrow, blurred lower incisors. What is the most likely error? | Patient positioned too far forward | Patient positioned too far back | Tongue against the palate | Exposure time too short | Anterior teeth in front of the trough appear narrow and blurred.
MATCH2#dentistry-u08-12-q3@3: Match each panoramic appearance to its cause. | Smiling occlusal plane = Chin tipped down ; Frowning occlusal plane = Chin tipped up ; One side wider = Head rotated ; Dark band over upper apices = Tongue not on palate | Recognising these errors guides repositioning.
M3#dentistry-u08-12-q4@3: A 25-year-old with pericoronitis around a partly erupted lower third molar is being considered for extraction. Which radiograph is most appropriate? | Panoramic radiograph | Bitewings only | Upper standard occlusal | No radiograph is ever needed | A panoramic shows the whole tooth, its roots and the inferior alveolar canal.
SA2#dentistry-u08-12-q5@1,3: Explain how panoramic radiography produces an image and why patient positioning is so important. | The tube and receptor rotate around the patient's head with a narrow vertical beam, so only structures in a curved focal trough are sharp and others are blurred out. The dental arches must therefore lie in the trough. If the head is too far forward or back, anterior teeth appear narrow or wide and blurred; tipping the chin changes the occlusal plane; rotation makes one side wider. The tongue must rest on the palate to avoid a dark band, and metal objects are removed to avoid ghost images. | Rotating tomography ; Focal trough ; Positioning errors ; Tongue and ghost images

## Cone beam CT
LV: Clinical · Evaluation
S: Cone beam computed tomography gives three-dimensional images of the teeth and jaws. This lesson explains how CBCT works, when it is justified, its doses and limitations, and the responsibilities for reporting it.
O: Explain how cone beam CT produces three-dimensional images
O: Identify justified indications for CBCT in dentistry
O: Evaluate the dose, limitations and reporting duties of CBCT
H: How CBCT works
P: **Cone beam CT (CBCT)** uses a cone- or pyramid-shaped X-ray beam and a flat-panel detector that rotate once around the patient's head, capturing hundreds of projections. A computer reconstructs these into a **volume** made of cubic **voxels**, which can be viewed in any plane: axial, coronal, sagittal and curved panoramic reconstructions. The **field of view (FOV)** can be small, covering a few teeth, or large, covering the whole face. Smaller FOVs and voxel sizes give higher resolution and lower dose. Compared with medical CT, CBCT gives lower doses and good bone and tooth detail but **poor soft tissue contrast**, and **metal artefacts** such as streaking from crowns and root fillings can mimic or hide disease.
H: Justified uses
- **Implant planning** where bone dimensions or vital structures need assessing.
- Relationship of a **lower third molar** to the inferior alveolar canal when plain imaging suggests a close relationship.
- Localisation of **impacted teeth** and assessment of root resorption.
- Complex **endodontics**, such as suspected root fracture or resorption, where conventional imaging is inconclusive.
- Assessment of some jaw lesions and trauma.
- CBCT should not be used routinely or as a first-line image when intraoral or panoramic views would answer the question.
H: Dose and reporting
- Doses vary widely, from tens to hundreds of microsieverts, depending on FOV and settings.
- The **smallest FOV** and lowest settings that answer the clinical question should be used.
- The **SEDENTEXCT** guidelines and the European Commission's Radiation Protection 172 set evidence-based basic principles.
- The **whole volume** must be evaluated and reported, not just the area of interest, by someone with suitable training.
- Large FOVs including the skull base and airway may need reporting by a specialist dental and maxillofacial radiologist.
X: A third molar near the canal.
> A panoramic shows darkening of the root of a lower third molar and interruption of the canal's white lines.
> These signs suggest a close relationship to the inferior alveolar nerve.
> A small-FOV CBCT is justified to show the three-dimensional relationship before surgery.
> The whole volume is reported, and the findings inform consent about nerve injury risk.
K: CBCT reconstructs a three-dimensional volume from a rotating cone beam, giving good hard tissue detail at lower doses than medical CT but more than plain dental views; it is justified for specific problems such as implant planning and third molar assessment, using the smallest field of view, with the whole volume reported by a trained person.
!: Reporting only the area of interest on a CBCT volume. The whole volume must be evaluated, as incidental findings may be significant.
EV: established | CBCT doses are generally higher than those of intraoral and panoramic radiography but lower than conventional medical CT.
EV: contested | The added clinical benefit of CBCT over panoramic radiography for routine lower third molar surgery planning.
T: Voxel | A three-dimensional pixel, the unit of a CBCT volume
T: Field of view | The size of the volume imaged in a CBCT scan
T: SEDENTEXCT | A European project that produced evidence-based guidelines on dental CBCT
SUM: 3D volume from a cone beam.
SUM: Justify; use the smallest FOV.
SUM: Report the whole volume.
SRC: European Commission, Radiation Protection No 172: Cone beam CT for dental and maxillofacial radiology, evidence-based guidelines | guidance | 2012
SRC: Health Protection Agency, Guidance on the safe use of dental cone beam CT equipment (HPA-CRCE-010) | guidance | 2010
SRC: Whaites E. and Drage N., Essentials of Dental Radiography and Radiology, 6th edition, Elsevier | secondary | 2021
Q: What is the unit of a CBCT volume called? | A voxel.
Q: Why does CBCT poorly show soft tissue? | It has low soft tissue contrast compared with medical CT.
M1#dentistry-u08-13-q1@1: What shape of beam does CBCT use? | A cone or pyramid beam | A narrow vertical slit | A pencil beam | A parallel sheet beam | CBCT captures a volume in one rotation with a cone beam.
M2#dentistry-u08-13-q2@2: How should the field of view be chosen for a CBCT? | The smallest that answers the question | The largest available, to be safe | Always the full skull | Whatever the patient prefers | Smaller FOVs reduce dose and improve resolution.
TF2#dentistry-u08-13-q3@2: Only the region of clinical interest needs to be reported on a CBCT scan. | false | The whole volume must be evaluated, as significant incidental findings can occur anywhere in it.
M3#dentistry-u08-13-q4@3: A periapical shows an unclear radiolucency on a root-filled tooth with a suspected vertical root fracture. What is the best imaging step? | Consider a small-FOV CBCT if it will change management | Take a large-FOV CBCT of the whole skull | Take a panoramic radiograph instead | Repeat the periapical every month | Limited CBCT can help when conventional imaging is inconclusive, though metal artefact limits it.
SA2#dentistry-u08-13-q5@2,3: Discuss when CBCT is justified in general dental practice and what responsibilities come with it. | CBCT is justified only when conventional radiographs cannot answer a specific question that will change management, such as implant planning, the relationship of a third molar to the inferior alveolar canal, impacted teeth with suspected resorption, or complex endodontic problems. The smallest field of view and lowest settings should be used, following the SEDENTEXCT and Radiation Protection 172 principles. The whole volume must be reported by someone with suitable training, with referral to a specialist radiologist where needed. Operators and practitioners need specific CBCT training under IR(ME)R. | Specific indications ; Smallest field of view ; Whole volume reporting ; Training and referral

## Selection criteria for dental radiographs
LV: Clinical · Application
S: Selection criteria help dentists decide which radiograph to take and when. This lesson applies the FGDP selection criteria to new patients, recall intervals for bitewings by caries risk, and other common situations.
O: Explain the purpose of radiographic selection criteria
O: Apply bitewing intervals according to caries risk
O: Select appropriate radiographs for common clinical problems
H: Purpose of selection criteria
P: **Selection criteria** are evidence-based recommendations describing the clinical situations in which a radiograph is likely to provide information that changes management. In the UK, the main source is the **FGDP Selection Criteria for Dental Radiography**, now published by the **College of General Dentistry**. They support **justification** under IR(ME)R and reduce unnecessary exposure. The criteria emphasise that radiographs follow a **history and clinical examination**, that **caries risk** determines the interval for bitewings, and that **routine panoramic screening** is not justified. Clinical judgement remains essential, and reasons for departing from the criteria should be recorded.
H: Bitewing intervals by caries risk
- **High caries risk**: bitewings every **6 months** until no new or active lesions are seen and the patient moves to a lower risk.
- **Moderate risk**: every **12 months**.
- **Low risk** in adults: every **24 months**.
- **Low risk** in children: every 12 to 18 months in the primary dentition and about 2 years in the permanent dentition.
- Caries risk should be reassessed at every recall, as it can change.
H: Other common situations
- **New patients** with likely caries or periodontal disease usually need bitewings after examination.
- **Symptomatic teeth** with suspected apical pathology need a periapical.
- **Periodontal disease** with probing depths of 6 mm or more may need periapicals or vertical bitewings to assess bone.
- **Third molars** being considered for removal usually need a panoramic.
- **Orthodontic assessment** may need a panoramic after clinical examination, with other views only if they change treatment.
X: Setting a bitewing interval.
> A 35-year-old has had no new caries for four years, brushes twice daily with fluoride toothpaste and has a low sugar diet.
> The dentist assesses her caries risk as low.
> Her last bitewings were taken 24 months ago.
> Bitewings are justified now, and the next set will be due in about 2 years if her risk remains low.
K: Selection criteria, mainly the FGDP guidance, support justification by linking each radiograph to the clinical problem; bitewing intervals depend on caries risk, about 6 months for high, 12 months for moderate and 24 months for low-risk adults, and routine screening panoramics are not justified.
!: Taking bitewings at every six-monthly check-up for every patient. Intervals should depend on individual caries risk.
EV: established | Bitewing intervals in UK selection criteria are based on caries risk assessment rather than fixed intervals for all patients.
T: Selection criteria | Evidence-based guidance on when a radiograph is likely to change management
T: Caries risk | The likelihood that a patient will develop new carious lesions
T: Recall interval | The time between routine examinations, set by risk
SUM: Examine, then select.
SUM: Risk sets the bitewing interval.
SUM: No routine screening panoramics.
SRC: Faculty of General Dental Practice (UK), Selection Criteria for Dental Radiography, 3rd edition | guidance | 2018
SRC: National Institute for Health and Care Excellence, Dental checks: intervals between oral health reviews (CG19) | guidance | 2004 | https://www.nice.org.uk/guidance/cg19
Q: How often should a high caries risk patient have bitewings? | About every 6 months, until no new or active lesions are seen.
Q: Who now publishes the UK selection criteria for dental radiography? | The College of General Dentistry (formerly FGDP UK).
M1#dentistry-u08-14-q1@1: What is the recommended bitewing interval for a low-risk adult? | About 24 months | Every 3 months | Every 6 months | Only once in a lifetime | Low-risk adults need bitewings about every two years.
M2#dentistry-u08-14-q2@2: Which radiograph is usually indicated for a tooth with suspected apical pathology? | A periapical | A bitewing | An upper standard occlusal | A lateral skull view | Periapicals show the apex and surrounding bone.
MATCH2#dentistry-u08-14-q3@2: Match each caries risk to its usual bitewing interval. | High risk = 6 months ; Moderate risk = 12 months ; Low-risk adult = 24 months ; Low-risk child, primary teeth = 12 to 18 months | Intervals follow FGDP selection criteria.
M3#dentistry-u08-14-q4@3: A new adult patient asks for a panoramic "check-up" with no symptoms or clinical findings. What is the best response? | Explain it is not justified without a clinical reason | Take a panoramic as requested | Take a full-mouth periapical series instead | Take a CBCT to be thorough | Routine screening panoramics are not justified under selection criteria.
SA2#dentistry-u08-14-q5@1,3: Explain how selection criteria help a dentist decide on bitewing radiographs. | Selection criteria, such as the FGDP guidance, link radiographs to clinical situations in which they are likely to change management, supporting justification under IR(ME)R. Bitewings are considered after history and examination, and the interval depends on caries risk: about 6 months for high risk, 12 months for moderate and 24 months for low-risk adults, with 12 to 18 months for low-risk children in the primary dentition. Risk is reassessed at each recall. Any departure from the criteria is justified and recorded. | Purpose and justification ; Examination first ; Risk-based intervals ; Reassessment and records

## Radiographic interpretation: caries and periodontal bone
LV: Clinical · Application
S: Reading bitewings and periapicals systematically finds caries and bone loss that are hidden clinically. This lesson explains a systematic approach, how caries and periodontal bone loss appear, and the main pitfalls.
O: Use a systematic approach to report intraoral radiographs
O: Describe the radiographic appearance and depth of carious lesions
O: Assess periodontal bone levels and patterns of bone loss
H: A systematic approach
P: Every radiograph should be **reported** and the findings recorded. Start by checking the patient details, date, view and **image quality**. Then look systematically: **teeth** (crowns, restorations, caries, roots), **periodontal tissues** (crestal bone, lamina dura, periodontal ligament space), **periapical tissues** and the rest of the image, including the surrounding bone. Compare with previous images where available. A **radiolucency** is darker and a **radiopacity** is lighter. Viewing should be in dim light on a suitable monitor. Radiographs supplement clinical examination, which remains essential, as radiographs show only a two-dimensional shadow.
H: Caries
- **Approximal caries** appears as a radiolucent triangle or notch just below the contact point.
- Lesions are described by depth: outer or inner half of enamel, outer, middle or inner third of dentine.
- Radiographs **underestimate** the true depth of a carious lesion.
- **Occlusal caries** is often seen only once it is well into dentine, appearing as a radiolucency under intact-looking enamel.
- **Cervical burnout**, a dark band at the neck of the tooth between enamel and bone, can mimic root caries.
- Secondary caries appears as radiolucency at a restoration margin and must be distinguished from radiolucent liners.
H: Periodontal bone
- In health the **alveolar crest** lies about 1 to 2 mm apical to the cementoenamel junction.
- **Horizontal bone loss** affects several teeth evenly; **vertical (angular) defects** affect one tooth surface.
- **Furcation involvement** shows as radiolucency between the roots of molars.
- Bone loss is expressed as a percentage of root length, used for staging periodontitis.
- **Calculus** may appear as radiopaque spurs on root surfaces.
- Radiographs do not show early bone loss or the buccal and lingual plates well.
X: Reporting a bitewing.
> A right bitewing of a 22-year-old is of acceptable quality.
> There is a radiolucency in the outer third of dentine on the distal of the upper first premolar.
> Crestal bone lies 1 to 2 mm below the cementoenamel junctions, with intact lamina dura.
> The dentist records the caries depth, the healthy bone levels and a plan for preventive or operative care.
K: Reports should follow a systematic order covering image quality, teeth, periodontal and periapical tissues and surrounding bone; caries shows as radiolucency whose depth is underestimated, and bone loss is described as horizontal or vertical and as a percentage of root length.
!: Diagnosing root caries from cervical burnout. Burnout is a normal dark band; check clinically and look for a defined lesion.
EV: established | Bitewing radiographs underestimate the histological depth of approximal carious lesions.
T: Cervical burnout | A radiolucent band at the tooth neck caused by less tissue thickness, mimicking caries
T: Vertical bone defect | Angular bone loss along one root surface
T: Alveolar crest | The most coronal part of the alveolar bone between teeth
SUM: Report systematically.
SUM: Caries is deeper than it looks.
SUM: Bone loss as a percentage.
SRC: Whaites E. and Drage N., Essentials of Dental Radiography and Radiology, 6th edition, Elsevier | secondary | 2021
SRC: Tonetti M. S., Greenwell H. and Kornman K. S., "Staging and grading of periodontitis: framework and proposal of a new classification and case definition", Journal of Clinical Periodontology 45(Suppl 20), S149–S161 | primary | 2018 | https://doi.org/10.1111/jcpe.12945
Q: How far below the cementoenamel junction does the alveolar crest normally lie? | About 1 to 2 mm.
Q: Do radiographs overestimate or underestimate carious lesion depth? | They underestimate it.
M1#dentistry-u08-15-q1@1: How does approximal caries usually appear on a bitewing? | A radiolucency just below the contact point | A radiopacity at the root apex | A white line around the root | A dark band at the alveolar crest | Approximal lesions start just cervical to the contact.
M2#dentistry-u08-15-q2@2: Which pattern of bone loss affects one root surface more than adjacent teeth? | Vertical (angular) bone loss | Horizontal bone loss | Cervical burnout | Furcation calculus | Angular defects affect individual surfaces.
NUM2#dentistry-u08-15-q3@3: A root is 15 mm long and bone loss measures 6 mm from the cementoenamel junction, allowing 1 mm as normal. What percentage of the root has lost support? | 33 | 1 | % | (6 − 1) ÷ 15 × 100 = 33% bone loss.
M3#dentistry-u08-15-q4@3: A dark band at the neck of a lower premolar is seen on a bitewing, but the tooth feels hard and smooth clinically. What is the likely explanation? | Cervical burnout | Deep root caries | Internal resorption | Fractured root | Burnout is an artefact of tissue thickness; clinical findings guide diagnosis.
SA2#dentistry-u08-15-q5@1,3: Describe how you would systematically report a periapical radiograph. | I would check patient details, date and image quality first. Then I would examine the crown for caries and restorations, the root for shape and canals, and the periodontal tissues including crestal bone level, lamina dura and periodontal ligament space. I would assess the periapical region for radiolucency or radiopacity and look at the surrounding bone and structures. Findings would be compared with previous images and recorded with the clinical evaluation in the notes. | Quality check ; Crown and root ; Periodontal tissues ; Periapical, surroundings and record

## Radiographic interpretation: periapical and jaw lesions
LV: Clinical · Evaluation
S: Periapical and jaw lesions range from common inflammatory changes to rare tumours. This lesson explains the radiographic features of apical periodontitis, a structured description of jaw lesions and the features that need urgent referral.
O: Describe the radiographic signs of apical periodontitis and its variants
O: Use a structured method to describe a jaw lesion
O: Recognise features suggesting malignancy and act on them
H: Periapical changes
P: Pulp necrosis leads to **apical periodontitis**, which on a radiograph first shows as **widening of the periodontal ligament space** and **loss of the lamina dura** at the apex. Later a well-defined **periapical radiolucency** develops, which may be a **granuloma** or a **radicular cyst**; these cannot be reliably told apart radiographically. **Condensing osteitis** is a localised radiopacity around the apex of a tooth with chronic low-grade inflammation. Radiographs lag behind disease, so an acute abscess may show little change. Diagnosis combines the image with history, pulp testing and examination. Normal structures such as the **mental foramen** and **incisive canal** can mimic periapical lesions; a second view or pulp tests help.
H: Describing a jaw lesion
- **Site**: which bone, and its relation to teeth.
- **Size** and **shape**: unilocular or multilocular.
- **Margins**: well-defined and corticated, well-defined without a cortex, or **ill-defined**.
- **Internal structure**: radiolucent, radiopaque or mixed.
- **Effect on surrounding structures**: displacement or resorption of teeth, expansion or perforation of cortices.
- This structure narrows the differential diagnosis and helps communication with specialists.
H: Red flags and referral
- **Ill-defined, ragged margins** and "moth-eaten" bone suggest an aggressive or malignant lesion.
- **Floating teeth**, with bone destroyed around them, and irregular widening of the periodontal ligament space are warning signs.
- Unexplained **numbness of the lip**, rapidly growing swelling or non-healing extraction sockets need urgent attention.
- Suspected malignancy should be referred via a **suspected cancer pathway** (two-week wait) in line with NICE NG12.
- Most well-defined, corticated lesions are benign, but large or unusual lesions still need specialist assessment.
X: A worrying radiolucency.
> A 60-year-old has a loose lower molar and lip numbness for four weeks.
> A periapical shows an ill-defined, ragged radiolucency with teeth appearing to float.
> These features suggest malignancy rather than infection.
> The dentist refers urgently on the suspected cancer pathway and informs the patient honestly.
K: Apical periodontitis begins as widened ligament space and lost lamina dura before a periapical radiolucency appears; jaw lesions are described by site, size, shape, margins, internal structure and effects, and ill-defined margins, floating teeth and numbness need urgent referral under NICE NG12.
!: Assuming a periapical radiolucency always means a cyst. Granulomas and cysts look alike; normal anatomy can also mimic lesions, so correlate with pulp tests and clinical findings.
EV: established | Periapical granulomas and radicular cysts cannot be reliably distinguished on conventional radiographs.
T: Lamina dura | The radiopaque line of the socket wall around a healthy root
T: Condensing osteitis | A localised radiopacity around an apex caused by chronic low-grade inflammation
T: Corticated margin | A well-defined radiopaque rim around a lesion, suggesting slow growth
SUM: Widened PDL comes first.
SUM: Site, size, shape, margins, contents, effects.
SUM: Ill-defined means refer.
SRC: Whaites E. and Drage N., Essentials of Dental Radiography and Radiology, 6th edition, Elsevier | secondary | 2021
SRC: National Institute for Health and Care Excellence, Suspected cancer: recognition and referral (NG12) | guidance | 2015 | https://www.nice.org.uk/guidance/ng12
SRC: Mallya S. M. and Lam E. W. N. (eds), White and Pharoah's Oral Radiology: Principles and Interpretation, 8th edition, Elsevier | secondary | 2019
Q: What is the earliest radiographic sign of apical periodontitis? | Widening of the periodontal ligament space and loss of the apical lamina dura.
Q: Which normal structure can mimic a lesion at the apex of a lower premolar? | The mental foramen.
M1#dentistry-u08-16-q1@1: What does loss of the lamina dura at an apex suggest? | Apical periodontitis | Normal ageing | Cervical burnout | Successful root filling | Loss of lamina dura is an early sign of periapical inflammation.
M2#dentistry-u08-16-q2@2: Which margin type most suggests an aggressive or malignant lesion? | Ill-defined and ragged | Well-defined and corticated | Smooth and scalloped | Well-defined without a cortex | Destructive lesions do not form a clear edge.
SEQ2#dentistry-u08-16-q3@2: Put the elements of a structured lesion description in a logical order. | Site ; Size and shape ; Margins and internal structure ; Effect on surrounding structures | Working from location to effects builds a clear description.
M3#dentistry-u08-16-q4@3: A radiolucency lies near the apex of a lower second premolar that responds normally to pulp testing. What is the most likely explanation? | The mental foramen | A radicular cyst | An apical abscess | Condensing osteitis | A vital tooth suggests normal anatomy; a second view at a different angle helps.
SA2#dentistry-u08-16-q5@2,3: Describe a radiographic lesion that would prompt urgent referral and explain what you would do. | A lesion with ill-defined, ragged margins and moth-eaten bone, irregular widening of the periodontal ligament spaces or teeth that appear to float in destroyed bone suggests malignancy. Associated features such as lip numbness, rapid swelling or a non-healing socket add to concern. I would refer urgently on the suspected cancer pathway in line with NICE NG12, sending the images and a clear description. I would explain the referral honestly to the patient and record it. | Ill-defined margins ; Floating teeth and PDL change ; Clinical red flags ; Urgent referral and communication

## Radiographic faults and artefacts
LV: Clinical · Application
S: Faulty radiographs give extra dose without benefit. This lesson describes common positioning, exposure, processing and digital faults and how to recognise and prevent them.
O: Identify common positioning and geometric faults on intraoral radiographs
O: Recognise exposure, processing and digital artefacts
O: Plan corrective actions to prevent repeated faults
H: Positioning and geometric faults
P: Most faulty images come from **positioning errors**. **Elongation** (teeth look too long) occurs when the vertical angle of the beam is too shallow in the bisecting angle technique; **foreshortening** (teeth too short) when it is too steep. **Overlapping contacts** result from wrong horizontal angulation. **Cone cutting** is a clear, unexposed area where the beam missed part of the receptor, usually because the collimator was not aligned with the aiming ring. **Apices cut off** occur when the receptor is not placed deep enough. **Motion blur** happens if the patient, tube or receptor moves. Using holders and beam-aiming devices prevents most of these errors.
H: Exposure and processing faults
- **Underexposure** gives a pale, grainy image; **overexposure** gives a dark image with burnt-out detail.
- With film, a **back-to-front** packet gives a pale image with the foil pattern.
- **Processing faults** include fogging from light leaks or old chemicals, and stains from poor fixing or washing.
- A **fixer** fault leaves a milky film that darkens with time.
- Contaminated or exhausted chemicals cause poor contrast.
H: Digital artefacts and prevention
- **PSP plate scratches** and bends appear as white lines or marks.
- Delays before scanning PSP plates allow the image to fade.
- **Bent or creased** sensors or plates in holders cause artefacts.
- Saturation of sensors occurs with overexposure, losing detail.
- Prevention relies on training, regular image quality audit, QA checks and care of receptors.
- A retake must be **justified** again; it should not be taken automatically.
X: Cone cutting.
> A periapical of an upper canine shows a sharp, clear curved area covering half the image.
> The rectangular collimator was not aligned with the aiming ring.
> The image is graded N and the fault recorded.
> A retake is justified as the apex is still needed, with careful alignment.
K: Common faults include elongation, foreshortening, overlapping contacts, cone cutting, cut-off apices and blur from positioning; under- and overexposure and processing errors affect film; plate damage and fading affect digital images; holders, training, QA and audit prevent them, and retakes must be re-justified.
!: Retaking a faulty radiograph straight away without thinking. A retake is a new exposure and must be justified; sometimes the original image answers the question.
EV: established | Use of film holders and beam-aiming devices reduces positioning errors and retake rates in intraoral radiography.
T: Elongation | Teeth appear longer than real, from too shallow a vertical beam angle
T: Foreshortening | Teeth appear shorter than real, from too steep a vertical beam angle
T: Cone cutting | An unexposed area where the beam missed part of the receptor
SUM: Holders prevent most faults.
SUM: Pale or dark points to exposure.
SUM: Re-justify every retake.
SRC: Whaites E. and Drage N., Essentials of Dental Radiography and Radiology, 6th edition, Elsevier | secondary | 2021
SRC: UK Health Security Agency and College of General Dentistry, Guidance notes for dental practitioners on the safe use of dental X-ray equipment, 2nd edition | guidance | 2020
Q: What causes foreshortening in the bisecting angle technique? | Too steep a vertical beam angle.
Q: What produces a clear, sharp-edged unexposed area on an image? | Cone cutting from misaligned collimation.
M1#dentistry-u08-17-q1@1: Which fault makes teeth appear too long? | Elongation | Foreshortening | Cone cutting | Overexposure | Elongation results from too shallow a vertical angle.
M2#dentistry-u08-17-q2@2: A digital image shows thin white lines in the same place on several images. What is the likely cause? | A scratched phosphor plate | Patient movement | Overlapping contacts | Underexposure | Physical plate damage gives repeating white artefacts.
MATCH2#dentistry-u08-17-q3@2: Match each fault to its cause. | Cone cutting = Collimator misaligned ; Overlapping contacts = Wrong horizontal angle ; Blurred image = Movement during exposure ; Pale grainy image = Underexposure | Identifying the cause guides correction.
M3#dentistry-u08-17-q4@3: A bitewing shows overlapping contacts on one side but the other side is diagnostic. What should the dentist do? | Consider whether a retake will change care before repeating | Always retake both sides at once | Take a panoramic instead | Ignore the fault and record nothing | A retake is a new exposure that needs justification; record the fault.
SA2#dentistry-u08-17-q5@1,3: Describe three common faults on intraoral radiographs and how each can be prevented. | Cone cutting is a clear, unexposed area from misaligned collimation, prevented by aligning the rectangular collimator with the holder's aiming ring. Overlapping contacts come from wrong horizontal angulation and are prevented by aiming the beam through the contact points using a holder. Elongation or foreshortening come from wrong vertical angles in the bisecting technique and are best avoided with the paralleling technique. Training and audit reduce all of these errors. | Cone cutting and correction ; Overlapping contacts and correction ; Elongation or foreshortening ; Training and audit
`;
