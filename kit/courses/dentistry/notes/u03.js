// DentalGradify Dentistry, School 3: Foundations of Medical Science. Reused from MedGradify Medicine School 1 (kit/courses/medicine/notes/u01.js)
// by scripts/borrow-school.mjs on 2026-11-12; question ids are this course's own. Review state as qa.js records.
// School 1: Foundations of Medical Science. Written to content standard 2 (docs/CURRICULUM_CONTENT_STANDARD.md):
// objectives, key terms, summaries, typed and dated sources, evidence status (EV:) and questions at three levels
// (Foundation, Application, Evaluation) in every lesson. Explanations are original; sources are those used and cited
// for checking, pending human verification (qa.js records the review stages). Level: years 1–2 of a UK medical degree.
// Education for medical students, not clinical guidance: numbers in worked examples are illustrative.
export default `
## Cell structure and function in health
LV: Preclinical · Foundation
S: Every disease is ultimately a disorder of cells. This lesson reviews the organelles of the human cell, what each does, how cells divide, and the clinical conditions and drugs that act on each structure.
O: Describe the structure and function of the main organelles of a human cell
O: Link disorders and drugs to the organelle or cell process they affect
O: Explain how cell-cycle checkpoints protect the genome and why their failure matters in disease
H: The organelles and what they do
- **Plasma membrane**: a phospholipid bilayer with embedded proteins (channels, carriers, pumps, receptors) that controls what enters and leaves and carries the cell's signals.
- **Nucleus**: holds the genome as chromatin; DNA is transcribed to mRNA here. The nucleolus makes ribosomal RNA.
- **Rough endoplasmic reticulum**: ribosome-studded membranes that make secretory and membrane proteins (abundant in plasma cells and pancreatic acinar cells). **Smooth ER** makes lipids and steroids and, in hepatocytes, holds many cytochrome P450 enzymes that metabolise drugs.
- **Golgi apparatus**: modifies, sorts and packages proteins, for example adding mannose-6-phosphate tags that send enzymes to lysosomes.
- **Lysosomes**: acidic vesicles of hydrolases that break down engulfed and worn-out material. Inherited loss of one enzyme causes a **lysosomal storage disorder** such as Gaucher disease (glucocerebrosidase) or Tay–Sachs disease (hexosaminidase A).
- **Mitochondria**: make most ATP by oxidative phosphorylation; they carry their own small, maternally inherited genome.
- **Peroxisomes**: oxidise very-long-chain fatty acids; their absence causes Zellweger spectrum disorders.
- **Cytoskeleton**: microtubules (tubulin; the mitotic spindle and intracellular transport), actin microfilaments and intermediate filaments (such as keratins, used to type carcinomas).
H: Drugs and diseases organelle by organelle
P: Many drugs make sense once you know their cellular target. Colchicine binds tubulin and stops microtubule polymerisation, which impairs neutrophil migration into a gouty joint. Vincristine and the taxanes also act on microtubules, arresting dividing cancer cells in mitosis, and both cause peripheral neuropathy because long axons depend on microtubule transport. Aminoglycosides and macrolides target bacterial ribosomes, which differ from human cytoplasmic ribosomes; mitochondrial ribosomes resemble bacterial ones, which is one explanation offered for aminoglycoside ototoxicity in people with certain mitochondrial variants.
X: A patient with gout is treated with colchicine and develops diarrhoea. Why does a gout drug upset the gut?
> Colchicine works by blocking microtubule assembly, which neutrophils need to migrate and degranulate.
> Microtubules also form the mitotic spindle, so rapidly dividing cells are vulnerable.
> Gut epithelium renews every few days, so its turnover is disrupted first: diarrhoea is the classic dose-limiting effect.
K: Rapidly dividing tissues (gut lining, bone marrow, hair follicles) are the first to show the effects of drugs that act on DNA synthesis or the mitotic spindle.
H: The cell cycle and its checkpoints
P: Cells pass through G1 (growth), S (DNA synthesis), G2 and M (mitosis); non-dividing cells rest in G0. Cyclins and cyclin-dependent kinases drive the cycle forwards. At the G1/S checkpoint, the retinoblastoma protein (Rb) holds the E2F transcription factors until it is phosphorylated. p53 senses DNA damage and halts the cycle (via p21) for repair, or triggers apoptosis if the damage can't be repaired. Loss of these brakes lets damaged cells keep dividing, a step towards cancer.
!: Assuming all body cells can divide to replace losses. Neurones and cardiac myocytes are essentially permanent (non-dividing) cells, so their loss is replaced by scar, not new tissue.
EV: established | Mitochondrial DNA is inherited through the mother, so mitochondrial DNA disorders pass from an affected mother to all her children, with variable severity.
EV: established | p53 halts the cell cycle or triggers apoptosis in response to DNA damage, and TP53 is the gene most often mutated in human cancers.
T: Lysosomal storage disorder | An inherited deficiency of a lysosomal enzyme, so its substrate accumulates inside cells
T: Cell-cycle checkpoint | A control point (such as G1/S) where the cell checks conditions and DNA integrity before progressing
SUM: Each organelle has a defined role, and specific diseases and drugs map onto each one.
SUM: Rb and p53 control the G1/S checkpoint; their loss lets cells with damaged DNA divide.
SRC: Kumar V., Abbas A. K., Aster J. C., Robbins and Cotran Pathologic Basis of Disease, 10th edn, Elsevier | secondary | 2020
SRC: Betts J. G. et al., Anatomy and Physiology 2e, OpenStax, chapter 3 "The cellular level of organization" | secondary | 2022 | https://openstax.org/details/books/anatomy-and-physiology-2e
Q: Which organelle is defective in Tay–Sachs and Gaucher disease? | The lysosome: each is an inherited deficiency of one lysosomal enzyme, so its substrate accumulates.
Q: What does p53 do when it detects DNA damage? | Halts the cell cycle (via p21) to allow repair, or triggers apoptosis if the damage is beyond repair.
M1#dentistry-u03-17-q1@1: Which organelle is the main site of ATP production by oxidative phosphorylation? | Mitochondrion | Golgi apparatus | Rough endoplasmic reticulum | Peroxisome | Oxidative phosphorylation takes place on the inner mitochondrial membrane; the Golgi sorts proteins, the RER makes them and peroxisomes oxidise very-long-chain fatty acids.
M2#dentistry-u03-17-q2@2: A drug used for gout and the vinca alkaloids used in chemotherapy share a target. What is it? | Tubulin, the protein of microtubules | DNA topoisomerase | The bacterial-type ribosome | The Na⁺/K⁺-ATPase pump | Colchicine and vincristine both stop microtubule polymerisation: one reduces neutrophil migration, the other arrests dividing cells in mitosis.
TF1#dentistry-u03-17-q3@3: Inherited Rb loss affects the G2/M checkpoint, not the G1/S checkpoint. | false | Rb holds the E2F transcription factors at the G1/S checkpoint; its phosphorylation releases them and lets the cell enter S phase.
M3#dentistry-u03-17-q4@2,3: A child inherits a mitochondrial DNA mutation. Which statement about the family is most accurate? | The mother passes it to all her children, but severity varies with the proportion of mutant mitochondria | It passes from father to son only, like a Y-linked gene | Each child of an affected parent has a 50% risk regardless of the parent's sex | It cannot be inherited because mitochondria are made fresh in each cell | Mitochondria come from the egg, so transmission is maternal; heteroplasmy (a mix of normal and mutant copies) explains the variable severity.
SA3#dentistry-u03-17-q5@2,3: Explain why chemotherapy drugs that act on dividing cells cause hair loss, mouth ulcers and low blood counts. | These drugs target DNA synthesis or the mitotic spindle, so they harm any cell that divides often, not only cancer cells. Hair follicles, the oral and gut mucosa and the bone marrow have the highest turnover, so they show damage first: alopecia, mucositis and myelosuppression (neutropenia, anaemia, thrombocytopenia). Permanent cells such as neurones are spared these effects, though spindle poisons can cause neuropathy by disrupting axonal transport. | Drugs act on DNA synthesis or mitosis ; Not selective for cancer cells ; High-turnover tissues named ; Links each tissue to the effect ; Contrast with permanent cells or neuropathy

## Membranes, transport and the resting potential
LV: Preclinical · Foundation
S: Cells keep a different ionic composition from the fluid around them, and that difference powers nerve, muscle and heart. This lesson covers membrane transport, the Nernst equation and the resting potential, and why a high potassium can stop the heart.
O: Describe the main mechanisms of transport across cell membranes
O: Calculate an equilibrium potential with the Nernst equation and explain the resting membrane potential
O: Explain the effects of changes in plasma potassium on excitable cells
PRE: Cell structure and function in health
H: Ways across the membrane
- **Simple diffusion**: small or lipid-soluble molecules (O₂, CO₂, steroid hormones, many drugs) cross the bilayer down their concentration gradient.
- **Channels**: ions flow down their electrochemical gradient through selective pores, which may be voltage-gated (Na⁺ channels in nerve) or ligand-gated (the nicotinic acetylcholine receptor).
- **Facilitated diffusion**: carriers move a solute down its gradient, such as glucose via GLUT transporters (GLUT4 is the insulin-responsive one in muscle and fat).
- **Primary active transport**: ATP drives a pump against a gradient. The **Na⁺/K⁺-ATPase** moves 3 Na⁺ out and 2 K⁺ in per ATP, keeping intracellular K⁺ about 140 mmol/L and Na⁺ about 10–15 mmol/L. Digoxin inhibits it.
- **Secondary active transport**: the Na⁺ gradient drives another solute uphill, such as SGLT2 reabsorbing glucose in the proximal tubule (the target of the gliflozins).
H: Equilibrium potentials and the resting potential
P: Because K⁺ is concentrated inside and the resting membrane is far more permeable to K⁺ than to other ions, K⁺ leaks out until the negative charge left behind holds it back. The voltage at which this balances is the K⁺ equilibrium potential, given by the Nernst equation.
E: E = (RT / zF) · ln([ion]out / [ion]in) :: the Nernst equation for one ion
E: E ≈ 61.5 · log₁₀([ion]out / [ion]in) mV :: the same at 37 °C for a monovalent cation
P: With plasma K⁺ 4 and intracellular K⁺ 140 mmol/L, E_K ≈ 61.5 × log₁₀(4/140) ≈ −95 mV. For Na⁺ (145 outside, about 12 inside) E_Na ≈ +66 mV. The resting potential (about −70 mV in neurones and −90 mV in ventricular muscle) lies close to E_K because K⁺ permeability dominates at rest. An action potential is a brief switch to Na⁺ permeability, moving the membrane towards E_Na.
X: Plasma potassium rises from 4 to 7 mmol/L. What happens to E_K, and why does this matter?
> E_K = 61.5 × log₁₀(7/140) = 61.5 × (−1.30) ≈ −80 mV, about 15 mV less negative than before.
> The resting potential depolarises with it, so some voltage-gated Na⁺ channels are held in their inactivated state.
> Fewer available Na⁺ channels means slower conduction and less excitable myocardium: peaked T waves, widened QRS and, eventually, ventricular arrhythmia or asystole.
K: Resting potential is mainly a potassium potential. Change plasma K⁺ and you change the excitability of every nerve and muscle cell, most dangerously the heart's.
P: This is why hyperkalaemia is an emergency. Intravenous calcium doesn't lower potassium; it stabilises the myocardial membrane (it raises the threshold for excitation), buying time while insulin with glucose shifts K⁺ into cells. Local anaesthetics such as lidocaine block voltage-gated Na⁺ channels, so nerves can't fire.
!: Thinking hyperkalaemia makes cells more excitable for long. A small depolarisation first brings cells nearer threshold, but sustained depolarisation inactivates Na⁺ channels, so the net effect in the heart is depressed conduction.
EV: established | The resting membrane potential is set mainly by the K⁺ gradient and the membrane's high resting K⁺ permeability, as described by the Goldman–Hodgkin–Katz equation.
T: Equilibrium potential | The membrane voltage at which there is no net flow of a given ion, calculated by the Nernst equation
T: Secondary active transport | Movement of a solute against its gradient powered by the Na⁺ gradient, not directly by ATP
SUM: Pumps such as the Na⁺/K⁺-ATPase build ion gradients; channels and carriers use them.
SUM: The resting potential lies near E_K, so changes in plasma K⁺ alter cardiac excitability and can be fatal.
SRC: Hodgkin A. L., Huxley A. F., "A quantitative description of membrane current and its application to conduction and excitation in nerve", Journal of Physiology 117(4):500–544 | primary | 1952 | https://doi.org/10.1113/jphysiol.1952.sp004764
SRC: Hall J. E., Hall M. E., Guyton and Hall Textbook of Medical Physiology, 14th edn, Elsevier, chapters 4–5 | secondary | 2021
Q: How many Na⁺ and K⁺ ions does the Na⁺/K⁺-ATPase move per ATP? | 3 Na⁺ out and 2 K⁺ in.
Q: Why does intravenous calcium help in severe hyperkalaemia? | It stabilises the cardiac membrane (raises the threshold for excitation) and so protects against arrhythmia; it doesn't lower the potassium.
M1#dentistry-u03-18-q1@1: Which transporter do the gliflozin drugs inhibit? | SGLT2 in the proximal tubule | The Na⁺/K⁺-ATPase in cardiac muscle | GLUT4 in skeletal muscle | The H⁺/K⁺-ATPase in parietal cells | Gliflozins block sodium–glucose co-transporter 2, so glucose stays in the tubular fluid and is excreted; digoxin inhibits the Na⁺/K⁺-ATPase and proton pump inhibitors the H⁺/K⁺-ATPase.
NUM2#dentistry-u03-18-q2@2: Using E = 61.5 × log₁₀([K]out / [K]in), calculate E_K in mV when plasma K⁺ is 2.5 mmol/L and intracellular K⁺ is 140 mmol/L. Give a whole number. | -108 | 2 | mV | 61.5 × log₁₀(2.5/140) = 61.5 × (−1.748) ≈ −108 mV. Hypokalaemia makes E_K, and the resting potential, more negative (hyperpolarised).
M2#dentistry-u03-18-q3@2,3: Why is the resting membrane potential of a neurone close to the K⁺ equilibrium potential rather than the Na⁺ one? | At rest the membrane is far more permeable to K⁺ than to Na⁺ | The Na⁺/K⁺-ATPase moves more K⁺ than Na⁺ | Na⁺ cannot cross membranes under any conditions | Intracellular Na⁺ is higher than extracellular Na⁺ | The membrane potential is a permeability-weighted average of the equilibrium potentials; at rest K⁺ leak channels dominate. The pump moves more Na⁺ (3) than K⁺ (2), and intracellular Na⁺ is low.
TF1#dentistry-u03-18-q4@1: Local anaesthetics such as lidocaine work by blocking voltage-gated sodium channels in nerve membranes. | true | Without Na⁺ channel opening, the nerve cannot generate an action potential, so pain signals aren't conducted.
SA3#dentistry-u03-18-q5@3: Explain why severe hyperkalaemia can cause cardiac arrest, and why treatment has more than one step. | Raised plasma K⁺ makes E_K and the resting potential less negative. Sustained depolarisation inactivates voltage-gated Na⁺ channels, slowing conduction (peaked T waves, broad QRS) and leading to ventricular arrhythmia or asystole. Treatment stabilises the membrane first (IV calcium), then shifts K⁺ into cells (insulin with glucose, salbutamol), then removes K⁺ from the body and treats the cause, because shifting doesn't reduce total body potassium. | Nernst or E_K rises (less negative) ; Depolarised resting potential ; Na⁺ channel inactivation and slowed conduction ; ECG changes or arrhythmia ; Stabilise, shift, remove as separate steps

## Homeostasis and negative feedback
LV: Preclinical · Foundation
S: The body holds temperature, glucose, blood pressure and hormone levels within narrow limits by negative feedback. This lesson sets out the parts of a feedback loop, contrasts negative and positive feedback, and uses thyroid function tests to show how feedback logic locates disease.
O: Describe the components of a homeostatic feedback loop
O: Distinguish negative from positive feedback with physiological examples
O: Use feedback logic to interpret paired hormone results and locate the level of an endocrine fault
H: The feedback loop
P: Walter Cannon (1932) named **homeostasis**: keeping the internal environment stable despite external change. Every homeostatic loop has a **sensor** (receptor), a **control centre** that compares the input with a set point, and an **effector** that corrects the deviation. In **negative feedback** the response opposes the change, which stabilises the variable.
- **Temperature**: hypothalamic sensors detect a fall; shivering, vasoconstriction and behaviour restore heat.
- **Glucose**: a rise stimulates insulin from pancreatic β cells; glucose is taken up and stored. A fall stimulates glucagon, adrenaline, cortisol and growth hormone.
- **Blood pressure**: carotid sinus and aortic baroreceptors sense a fall and the brainstem raises heart rate and vascular tone (the baroreflex).
- **Hormone axes**: cortisol and thyroxine each inhibit their own releasing and stimulating hormones.
H: Positive feedback
P: In **positive feedback** the response amplifies the change, driving a process to completion. Examples: oxytocin and uterine contraction in labour (the Ferguson reflex), the oestrogen-triggered LH surge before ovulation, and the coagulation cascade, where thrombin activates factors that make more thrombin. Positive feedback must be ended by an external event (delivery, ovulation, inhibitors of clotting).
K: In an endocrine axis, a hormone that is high together with a high stimulating hormone points to a problem above the gland or a stimulus the gland can't ignore; a hormone that is low with a high stimulating hormone points to failure of the gland itself.
X: Interpret these thyroid results: (a) TSH high, free T4 low; (b) TSH low, free T4 low; (c) TSH low, free T4 high.
> (a) The gland is failing and the pituitary is responding: primary hypothyroidism (most often autoimmune Hashimoto's thyroiditis in the UK).
> (b) The gland is under-stimulated because TSH itself is low: secondary (pituitary) or tertiary (hypothalamic) hypothyroidism.
> (c) The gland is overproducing and feedback has suppressed TSH: primary hyperthyroidism, such as Graves' disease.
!: Calling any loop that ends a process "positive feedback". Positive feedback amplifies the original change; the event that stops it (such as delivery of the baby) is outside the loop.
EV: established | Paired measurement of a pituitary trophic hormone and its target hormone distinguishes primary from secondary endocrine failure.
EV: contested | Whether the body defends a fixed "set point" for body weight, or a range shaped by environment (a "settling point"), is debated.
T: Negative feedback | A response that opposes the initial change, returning a variable towards its set point
T: Positive feedback | A response that amplifies the initial change until an external event ends it
SUM: Homeostatic loops have sensors, a control centre and effectors; negative feedback stabilises, positive feedback amplifies.
SUM: Endocrine results are read in pairs: the stimulating hormone tells you whether the gland or its controller is at fault.
SRC: Cannon W. B., The Wisdom of the Body, W. W. Norton | primary | 1932
SRC: Hall J. E., Hall M. E., Guyton and Hall Textbook of Medical Physiology, 14th edn, Elsevier, chapter 1 | secondary | 2021
Q: Name the three components of a homeostatic control loop. | Sensor (receptor), control centre (comparator with a set point) and effector.
Q: Give three examples of positive feedback in physiology. | Oxytocin and uterine contraction in labour, the LH surge before ovulation, and the coagulation cascade (thrombin generating more thrombin).
M1#dentistry-u03-19-q1@1: Which of these is an example of positive feedback? | Oxytocin release increasing uterine contractions during labour | Insulin release after a meal | Sweating when core temperature rises | Baroreflex tachycardia after standing up | Positive feedback amplifies the change: contractions release more oxytocin, which strengthens contractions. The others oppose the change (negative feedback).
M2#dentistry-u03-19-q2@3: A patient's TSH is high and free T4 is low. Where is the fault most likely to be? | The thyroid gland itself | The anterior pituitary | The hypothalamus | The peripheral tissues' T3 receptors | Low T4 with an appropriately raised TSH means the pituitary is responding to a failing gland: primary hypothyroidism.
M2#dentistry-u03-19-q3@2: After standing up quickly, blood pressure falls briefly and the heart rate rises. Which structures sense the fall? | Baroreceptors in the carotid sinus and aortic arch | Peripheral chemoreceptors in the carotid bodies | Osmoreceptors in the hypothalamus | Juxtaglomerular cells sensing tubular sodium | Stretch-sensitive baroreceptors detect the fall in pressure and the brainstem raises heart rate and vascular tone within seconds.
SEQ1#dentistry-u03-19-q4@1: Put the parts of the glucose-lowering feedback loop in order after a meal. | Plasma glucose rises ; Pancreatic β cells sense the rise ; Insulin is secreted ; Muscle, fat and liver take up and store glucose ; Plasma glucose returns towards normal | Sensor (β cell), signal (insulin) and effectors (insulin-sensitive tissues) oppose the rise: negative feedback.
SA3#dentistry-u03-19-q5@2,3: A patient on long-term oral prednisolone has a low morning cortisol and a low ACTH. Use feedback logic to explain these results and why stopping the steroid suddenly is dangerous. | Prednisolone acts like cortisol at the hypothalamus and pituitary, suppressing CRH and ACTH by negative feedback. Without ACTH the adrenal cortex atrophies and makes little cortisol of its own, so both are low (an assay may not detect prednisolone as cortisol). If the drug is stopped abruptly, the suppressed axis can't respond quickly, leading to adrenal insufficiency, which may present as an adrenal crisis with hypotension, especially during illness. | Exogenous steroid feeds back on hypothalamus and pituitary ; Low ACTH explained ; Adrenal atrophy or reduced own cortisol ; Abrupt withdrawal causes adrenal insufficiency or crisis ; Links to the need for gradual reduction

## Body fluids, osmolality and electrolytes
LV: Preclinical · Foundation
S: Where water and salt sit in the body explains dehydration, oedema, hyponatraemia and how intravenous fluids behave. This lesson covers the fluid compartments, osmolality, Starling forces and the separate control of sodium and water.
O: Describe the body fluid compartments and their approximate volumes
O: Calculate plasma osmolality and predict where infused fluids distribute
O: Explain why sodium concentration reflects water balance while total sodium sets extracellular volume
PRE: Membranes, transport and the resting potential
H: The compartments
P: Total body water is about 60% of body weight in an adult man (about 42 L at 70 kg), less in women and older people because of more fat. About two-thirds is **intracellular fluid** (ICF, about 28 L, rich in K⁺) and one-third is **extracellular fluid** (ECF, about 14 L, rich in Na⁺). The ECF is about three-quarters interstitial fluid (about 10.5 L) and one-quarter plasma (about 3.5 L).
P: Water moves freely between compartments until osmolality is equal. Sodium is held mainly in the ECF by the Na⁺/K⁺-ATPase, so the amount of sodium in the body sets the ECF volume. Between plasma and interstitium, **Starling forces** decide the balance: capillary hydrostatic pressure pushes fluid out, plasma oncotic pressure (mostly albumin) holds it in, and lymphatics return the rest.
H: Osmolality and its control
E: Calculated osmolality ≈ 2[Na⁺] + [glucose] + [urea] :: all in mmol/L; normal measured value 275–295 mOsm/kg
E: Osmolar gap = measured − calculated osmolality :: normally under about 10; a raised gap suggests an unmeasured osmole such as ethanol, methanol or ethylene glycol
P: Hypothalamic osmoreceptors respond to a rise of a few per cent in osmolality by causing thirst and releasing **ADH** (vasopressin), which inserts aquaporin-2 channels in the collecting duct so water is reabsorbed. Volume is sensed separately (baroreceptors, the kidney's juxtaglomerular apparatus) and corrected through the renin–angiotensin–aldosterone system and natriuretic peptides. A large fall in circulating volume also triggers ADH release, even at the cost of a falling sodium.
X: Where does 1 litre of each fluid end up once distributed?
> 0.9% sodium chloride: the sodium stays in the ECF, so the litre spreads across the ECF; about a quarter (roughly 250 mL) remains in plasma.
> 5% glucose: the glucose is metabolised, leaving free water that distributes across total body water; only about one-twelfth (roughly 80 mL) remains in plasma.
> So crystalloids with sodium expand the circulation better than glucose, and glucose solutions are a source of water, not volume.
K: The plasma sodium concentration tells you about water relative to sodium, not about how much sodium the body holds. A patient can be hyponatraemic and sodium-overloaded (heart failure) or hyponatraemic and depleted (diarrhoea).
!: Treating every low sodium as a sodium deficit. Hyponatraemia must be assessed with the patient's volume status, plasma and urine osmolality and urine sodium; giving saline to someone with fluid overload or SIADH can make things worse.
EV: established | ADH secretion is regulated mainly by plasma osmolality, with a large fall in circulating volume able to override it.
EV: contested | Which crystalloid is best for resuscitation (0.9% saline or a balanced solution such as Hartmann's) is still debated for some patient groups, though trials favour balanced solutions in several settings.
T: Osmolality | The concentration of osmotically active particles per kilogram of water
T: Oncotic pressure | The osmotic pressure exerted by plasma proteins, mainly albumin, which holds fluid in the circulation
SUM: Water is about 60% of body weight: two-thirds intracellular, one-third extracellular, a quarter of which is plasma.
SUM: Sodium content sets ECF volume; water balance under ADH sets the sodium concentration.
SRC: National Institute for Health and Care Excellence, Intravenous fluid therapy in adults in hospital (CG174) | guidance | 2017 | https://www.nice.org.uk/guidance/cg174
SRC: Hall J. E., Hall M. E., Guyton and Hall Textbook of Medical Physiology, 14th edn, Elsevier, chapter 25 | secondary | 2021
Q: How is plasma osmolality calculated? | 2 × Na⁺ + glucose + urea (all in mmol/L).
Q: Roughly how much of a litre of 5% glucose stays in the plasma? | About one-twelfth (around 80 mL), because the free water spreads across total body water.
M1#dentistry-u03-20-q1@1: What proportion of total body water is intracellular? | About two-thirds | About one-quarter | About one-third | About nine-tenths | Roughly two-thirds is intracellular and one-third extracellular, of which about a quarter is plasma.
NUM2#dentistry-u03-20-q2@2: Calculate plasma osmolality (mOsm/kg) for Na⁺ 135, glucose 30 and urea 15 mmol/L. | 315 | 1 | mOsm/kg | 2 × 135 + 30 + 15 = 315 mOsm/kg: raised, mainly because of the high glucose, as in a hyperosmolar hyperglycaemic state.
M2#dentistry-u03-20-q3@2: A patient has a measured osmolality of 330 and a calculated osmolality of 295 mOsm/kg. What does the gap suggest? | An unmeasured osmotically active substance such as methanol or ethylene glycol | Pseudohyponatraemia from a laboratory error | Diabetes insipidus | Normal variation between laboratories | A gap of 35 is well above the normal of under about 10, implying an unmeasured osmole: alcohols are the classic cause and toxic alcohols need urgent treatment.
M3#dentistry-u03-20-q4@3: A patient with severe heart failure has a sodium of 126 mmol/L and ankle oedema. Which statement is correct? | Total body sodium is increased but water is retained even more | Total body sodium is reduced, so saline is needed | The low sodium proves the ECF volume is low | Oedema shows that ADH secretion is suppressed | Heart failure retains both sodium (hence oedema) and water; the reduced effective circulating volume drives ADH, so water exceeds sodium and the concentration falls.
SA3#dentistry-u03-20-q5@2,3: Explain why 5% glucose is a poor fluid for restoring circulating volume in a bleeding patient. | Once infused the glucose is metabolised, leaving free water. Water distributes across total body water in proportion to compartment size, so about two-thirds enters cells and only about one-twelfth stays in plasma. It therefore does little for blood volume and can lower sodium. Sodium-containing crystalloids stay in the ECF (about a quarter in plasma), and blood is needed for major haemorrhage. | Glucose metabolised to free water ; Water distributes across total body water ; Small fraction remains intravascular ; Risk of hyponatraemia ; Better alternatives named

## Acid–base physiology
LV: Preclinical · Application
S: Blood pH is held between 7.35 and 7.45 by buffers, the lungs and the kidneys. This lesson explains the bicarbonate buffer system, the four primary disorders, compensation and the anion gap, the tools you'll use on every blood gas.
O: Explain how buffers, the lungs and the kidneys keep blood pH stable
O: Classify a primary acid–base disorder and its compensation from pH, PaCO₂ and bicarbonate
O: Use the anion gap to narrow the causes of a metabolic acidosis
PRE: Body fluids, osmolality and electrolytes
H: The bicarbonate system
P: The body makes about 15,000 mmol of CO₂ a day from metabolism (volatile acid, removed by the lungs) and about 50–100 mmol of non-volatile acid (removed by the kidneys). The main extracellular buffer is bicarbonate, linked to CO₂ by carbonic anhydrase.
E: CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻ :: catalysed by carbonic anhydrase
E: pH = 6.1 + log₁₀([HCO₃⁻] / (0.23 × PaCO₂ in kPa)) :: the Henderson–Hasselbalch equation
P: pH depends on the *ratio* of bicarbonate (controlled by the kidneys over days) to CO₂ (controlled by ventilation within minutes). Normal values: pH 7.35–7.45, PaCO₂ 4.7–6.0 kPa, HCO₃⁻ 22–26 mmol/L, base excess −2 to +2 mmol/L.
H: Primary disorders and compensation
- **Respiratory acidosis**: CO₂ retained (hypoventilation, COPD, opioids); kidneys retain bicarbonate over days.
- **Respiratory alkalosis**: CO₂ blown off (anxiety, pulmonary embolism, early salicylate poisoning, altitude); kidneys excrete bicarbonate.
- **Metabolic acidosis**: bicarbonate consumed or lost; the lungs compensate within minutes by hyperventilating (Kussmaul breathing in ketoacidosis).
- **Metabolic alkalosis**: bicarbonate gained or acid lost (vomiting, diuretics); hypoventilation compensates only partly.
P: Compensation moves pH back towards normal but rarely all the way. A normal pH with abnormal CO₂ and bicarbonate suggests a mixed disorder.
H: The anion gap
E: Anion gap = [Na⁺] − ([Cl⁻] + [HCO₃⁻]) :: normally about 8–12 mmol/L without K⁺ (check your laboratory's range)
P: In a metabolic acidosis the gap separates acid *gain* from bicarbonate *loss*. A **raised gap** means an unmeasured acid anion: lactate, ketones, uraemia or toxins (methanol, ethylene glycol, salicylate). A **normal gap** (hyperchloraemic) acidosis means bicarbonate is lost and replaced by chloride: diarrhoea, renal tubular acidosis, ileal conduits, or large volumes of 0.9% saline.
X: pH 7.24, PaCO₂ 3.1 kPa, HCO₃⁻ 10 mmol/L, Na⁺ 138, Cl⁻ 100 mmol/L. Interpret.
> pH low: acidaemia. HCO₃⁻ low, so the primary process is metabolic acidosis.
> PaCO₂ low: the lungs are compensating. Winter's formula predicts PaCO₂ = 1.5 × 10 + 8 = 23 ± 2 mmHg ≈ 3.1 kPa, so compensation is appropriate.
> Anion gap = 138 − (100 + 10) = 28: raised. Look for lactate, ketones, renal failure or a toxin; in a young person with diabetes, check ketones and glucose first.
K: Read a gas in order: pH (acidaemia or alkalaemia), then which of CO₂ or HCO₃⁻ explains it (the primary process), then whether the other has moved to compensate, then the anion gap for metabolic acidosis.
!: Calling a disorder "compensated" just because the PaCO₂ and bicarbonate are both abnormal. Check the direction: compensation moves the second value the same way as the first (both low in metabolic acidosis); opposite movements suggest a mixed disorder.
EV: established | The anion gap divides metabolic acidoses into those caused by unmeasured acid anions and those caused by bicarbonate loss.
EV: contested | Whether the physicochemical (Stewart) approach to acid–base offers clinical advantages over the traditional bicarbonate-based approach is debated.
T: Anion gap | Na⁺ minus the sum of Cl⁻ and HCO₃⁻: an estimate of unmeasured anions in plasma
T: Compensation | The secondary respiratory or renal change that moves pH back towards normal after a primary disturbance
SUM: pH depends on the bicarbonate to CO₂ ratio; the lungs adjust CO₂ in minutes and the kidneys bicarbonate over days.
SUM: The anion gap separates acid gain (raised gap) from bicarbonate loss (normal gap) in metabolic acidosis.
SRC: Berend K., de Vries A. P. J., Gans R. O. B., "Physiological approach to assessment of acid–base disturbances", New England Journal of Medicine 371(15):1434–1445 | secondary | 2014 | https://doi.org/10.1056/NEJMra1003327
SRC: Hall J. E., Hall M. E., Guyton and Hall Textbook of Medical Physiology, 14th edn, Elsevier, chapter 31 | secondary | 2021
Q: What is the normal range for arterial pH? | 7.35–7.45.
Q: Give four causes of a raised anion gap metabolic acidosis. | Lactic acidosis, ketoacidosis, renal failure (uraemia) and toxins such as methanol, ethylene glycol or salicylate.
M1#dentistry-u03-21-q1@1: Which organ adjusts plasma bicarbonate over days to compensate for a respiratory disorder? | The kidney | The lung | The liver | The stomach | Renal compensation (retaining or excreting bicarbonate) is slow, taking days; respiratory compensation for metabolic disorders is fast.
NUM2#dentistry-u03-21-q2@2: Calculate the anion gap (mmol/L) for Na⁺ 140, Cl⁻ 112 and HCO₃⁻ 16 mmol/L. | 12 | 1 | mmol/L | 140 − (112 + 16) = 12, a normal gap, so this metabolic acidosis is hyperchloraemic: think diarrhoea, renal tubular acidosis or saline.
M2#dentistry-u03-21-q3@2: A patient has pH 7.52, PaCO₂ 6.4 kPa and HCO₃⁻ 36 mmol/L after days of vomiting. What is the disorder? | Metabolic alkalosis with partial respiratory compensation | Respiratory alkalosis with renal compensation | Respiratory acidosis with metabolic compensation | Mixed metabolic and respiratory acidosis | High pH with high bicarbonate is a metabolic alkalosis (loss of gastric acid); the mildly raised CO₂ is the expected compensatory hypoventilation.
M3#dentistry-u03-21-q4@3: A gas shows pH 7.40, PaCO₂ 2.8 kPa and HCO₃⁻ 13 mmol/L. What is the best interpretation? | A mixed disorder, such as metabolic acidosis with a primary respiratory alkalosis | A fully compensated metabolic acidosis, which is common | A normal gas, because the pH is normal | A respiratory acidosis with renal compensation | Compensation rarely restores pH fully, so a normal pH with grossly abnormal values suggests two primary processes: the classic example is salicylate poisoning.
SA3#dentistry-u03-21-q5@3: A man with type 1 diabetes has pH 7.10, PaCO₂ 2.5 kPa, HCO₃⁻ 6 mmol/L, Na⁺ 136 and Cl⁻ 98 mmol/L. Interpret the gas step by step. | Acidaemia (pH 7.10). Bicarbonate is very low, so the primary process is metabolic acidosis. PaCO₂ is low: respiratory compensation (Kussmaul breathing). Winter's formula predicts 1.5 × 6 + 8 = 17 ± 2 mmHg, about 2.3 kPa, so compensation is roughly appropriate. Anion gap = 136 − (98 + 6) = 32, raised, consistent with ketoacidosis in this context. | Identifies acidaemia ; Primary metabolic acidosis ; Respiratory compensation assessed ; Anion gap calculated as raised ; Links to diabetic ketoacidosis

## Cell injury, adaptation and death
LV: Preclinical · Foundation
S: Cells under stress first adapt, then suffer reversible injury, and finally die. This lesson covers the adaptations, the features that mark the point of no return, the patterns of necrosis and how apoptosis differs from it.
O: Define hypertrophy, hyperplasia, atrophy and metaplasia with clinical examples
O: Distinguish reversible from irreversible cell injury and the morphological patterns of necrosis
O: Compare necrosis and apoptosis and explain their clinical significance
PRE: Cell structure and function in health
H: Adaptation
- **Hypertrophy**: larger cells, as in the left ventricle in hypertension or aortic stenosis (myocytes can't divide).
- **Hyperplasia**: more cells, as in the endometrium under oestrogen or benign prostatic hyperplasia.
- **Atrophy**: smaller cells and organs from disuse, denervation, ischaemia or loss of hormonal stimulation.
- **Metaplasia**: one differentiated cell type replaced by another better able to withstand stress: squamous to columnar epithelium in the lower oesophagus with acid reflux (Barrett's oesophagus), or columnar to squamous in the bronchi of smokers. Metaplasia can progress to dysplasia and cancer.
H: Injury and the point of no return
P: Hypoxia, toxins, infection, immune attack and nutritional imbalance all injure cells, mainly by depleting ATP, damaging membranes, raising intracellular calcium, generating free radicals and damaging DNA. **Reversible injury** shows cell swelling (failure of the ion pumps) and fatty change. Injury becomes **irreversible** when mitochondrial function can't be restored and membranes are badly damaged: enzymes leak out and the nucleus shrinks (pyknosis), fragments (karyorrhexis) and dissolves (karyolysis).
K: Leakage of cell contents is the basis of many blood tests: troponin from dead myocytes, ALT from hepatocytes, creatine kinase from muscle and amylase or lipase from the pancreas.
H: Patterns of necrosis
- **Coagulative**: architecture preserved for days; typical of infarcts in solid organs (heart, kidney) except the brain.
- **Liquefactive**: tissue digested to fluid; brain infarcts and abscesses.
- **Caseous**: cheese-like, with granulomas; tuberculosis.
- **Fat necrosis**: lipases release fatty acids that bind calcium (saponification); acute pancreatitis, breast trauma.
- **Fibrinoid**: immune complexes and fibrin in vessel walls; vasculitis and malignant hypertension.
- **Gangrene**: a clinical term for necrosis of a limb or bowel, dry (ischaemic) or wet (with infection).
P: **Apoptosis** is programmed, energy-dependent death of single cells: the cell shrinks, chromatin condenses and fragments are cleared by phagocytes without inflammation. It is triggered by the intrinsic (mitochondrial) pathway, controlled by the BCL-2 family and cytochrome c release, or the extrinsic pathway (Fas ligand, TNF), both converging on caspases. It shapes development, removes self-reactive lymphocytes and kills virus-infected cells; too little contributes to cancer, too much to neurodegeneration.
X: A 55-year-old has a 6-hour history of chest pain and a raised troponin. Explain the result in terms of cell injury.
> Occlusion of a coronary artery stops oxygen delivery; ATP falls and myocytes swell (reversible injury).
> After about 20–30 minutes of severe ischaemia, injury becomes irreversible and coagulative necrosis begins.
> Damaged membranes let troponin leak into the blood, so a rising troponin is evidence of myocyte death: myocardial infarction.
!: Calling dysplasia an adaptation. Dysplasia is disordered growth with atypical cells, a pre-malignant change, unlike metaplasia, which is an orderly switch of cell type.
EV: established | Irreversible myocardial injury begins after about 20–30 minutes of severe ischaemia, which is why rapid reperfusion limits infarct size.
T: Metaplasia | Reversible replacement of one differentiated cell type by another in response to chronic stress
T: Apoptosis | Programmed, energy-dependent cell death without inflammation, executed by caspases
SUM: Stressed cells adapt by hypertrophy, hyperplasia, atrophy or metaplasia; persistent injury becomes irreversible.
SUM: Necrosis is uncontrolled death with inflammation and leaked contents; apoptosis is programmed and tidy.
SRC: Kumar V., Abbas A. K., Aster J. C., Robbins and Cotran Pathologic Basis of Disease, 10th edn, Elsevier, chapter 2 | secondary | 2020
SRC: Kerr J. F. R., Wyllie A. H., Currie A. R., "Apoptosis: a basic biological phenomenon with wide-ranging implications in tissue kinetics", British Journal of Cancer 26(4):239–257 | primary | 1972 | https://doi.org/10.1038/bjc.1972.33
Q: Which type of necrosis occurs in a cerebral infarct? | Liquefactive necrosis.
Q: Give an example of metaplasia and its stimulus. | Barrett's oesophagus: squamous epithelium replaced by columnar epithelium in response to chronic acid reflux.
M1#dentistry-u03-22-q1@1: Which type of necrosis is characteristic of tuberculosis? | Caseous necrosis | Coagulative necrosis | Fat necrosis | Fibrinoid necrosis | TB granulomas have a cheese-like caseous centre; coagulative necrosis is typical of solid-organ infarcts, fat necrosis of pancreatitis and fibrinoid of vasculitis.
M2#dentistry-u03-22-q2@2: A long-term smoker's bronchial biopsy shows stratified squamous epithelium where columnar ciliated epithelium should be. What is this? | Squamous metaplasia | Dysplasia | Hyperplasia | Carcinoma in situ | One mature cell type has replaced another in response to chronic irritation: metaplasia. It is reversible but loses cilia and can progress to dysplasia.
MS2#dentistry-u03-22-q3@1,3: Which features distinguish apoptosis from necrosis? Choose all that apply. | Cell shrinkage ; No inflammation ; Energy-dependent caspase activation | Cell swelling and membrane rupture ; Leakage of contents provoking inflammation | Apoptosis is a controlled, energy-requiring process in which the cell shrinks and is cleared quietly; swelling, rupture and inflammation are features of necrosis.
M3#dentistry-u03-22-q4@3: Why does the brain show liquefactive rather than coagulative necrosis after an infarct? | Brain tissue has little supporting stroma and abundant lysosomal enzymes, so it is digested rather than preserved | The brain has a dual blood supply that floods the infarct | Neurones die by apoptosis, which always produces liquid | Microglia secrete coagulation factors that dissolve tissue | Coagulative necrosis needs a framework of denatured proteins to persist; the lipid-rich, stroma-poor brain is broken down by enzymes, leaving a cystic cavity.
SA3#dentistry-u03-22-q5@2,3: Explain why troponin is used to diagnose myocardial infarction, using what you know about cell injury. | Troponins are structural proteins of cardiac myocytes. In reversible injury the membrane is intact and they stay inside. Once ischaemia causes irreversible injury and coagulative necrosis, the membrane is damaged and troponin leaks into the blood, so a rise above the reference limit with a rising or falling pattern indicates myocyte death. A raised troponin alone isn't specific for a coronary cause: sepsis, pulmonary embolism, myocarditis and renal failure also release it. | Troponin is a myocyte protein ; Released when membranes are damaged in irreversible injury ; Rise and fall pattern ; Indicates necrosis ; Other causes of raised troponin

## Acute inflammation
LV: Preclinical · Foundation
S: Acute inflammation is the body's rapid, stereotyped response to infection and injury. This lesson explains its vascular and cellular events, the mediators that drive them, how they produce the clinical signs and blood tests, and how inflammation ends.
O: Describe the vascular and cellular events of acute inflammation
O: Link the main chemical mediators to the clinical features and blood tests of inflammation
O: Explain the possible outcomes of acute inflammation and distinguish an exudate from a transudate
PRE: Cell injury, adaptation and death
H: Vascular events
P: Within minutes of injury, arterioles dilate (histamine, prostaglandins, nitric oxide), increasing blood flow: **redness** (rubor) and **heat** (calor). Endothelial cells contract and gaps open in post-capillary venules, so protein-rich fluid leaks into the tissue: **swelling** (tumor). Bradykinin and prostaglandins sensitise nerve endings: **pain** (dolor). Swelling and pain together cause **loss of function** (functio laesa).
H: Cellular events
- **Margination and rolling**: slowed flow pushes leucocytes to the vessel wall, where selectins make them roll.
- **Adhesion**: integrins on neutrophils bind ICAM-1 on activated endothelium.
- **Transmigration**: neutrophils squeeze between endothelial cells (diapedesis), mainly in venules.
- **Chemotaxis**: they migrate towards bacterial products, C5a, leukotriene B4 and IL-8.
- **Phagocytosis and killing**: opsonised microbes (coated with IgG or C3b) are engulfed and killed by reactive oxygen species and lysosomal enzymes.
P: Neutrophils dominate the first 6–24 hours; macrophages take over by 24–48 hours and clear debris. Inherited defects of adhesion or killing (leucocyte adhesion deficiency, chronic granulomatous disease) cause recurrent severe bacterial infection.
H: Mediators and systemic effects
P: Histamine (mast cells) and serotonin act within seconds. Arachidonic acid is converted by **cyclooxygenase** to prostaglandins (vasodilation, pain, fever) and by **lipoxygenase** to leukotrienes (bronchoconstriction, permeability, chemotaxis). Complement gives C3a and C5a (anaphylatoxins), C3b (opsonin) and the membrane attack complex. The cytokines IL-1, IL-6 and TNF act on the hypothalamus (fever), the liver (acute-phase proteins such as **CRP** and fibrinogen, which raises the ESR) and the bone marrow (neutrophilia with a left shift).
K: Every clinical sign and blood test of inflammation traces back to a mediator: fever and CRP to IL-1, IL-6 and TNF; redness and heat to vasodilators; swelling to leaky venules; pain to bradykinin and prostaglandins. NSAIDs relieve pain and fever by blocking cyclooxygenase.
H: Outcomes
P: Acute inflammation may **resolve** completely, form an **abscess** (pus walled off by fibrin and granulation tissue, needing drainage), heal by **fibrosis** where tissue can't regenerate, or progress to **chronic inflammation** if the stimulus persists. Fluid that collects in a body cavity can be an **exudate** (inflammatory, protein-rich) or a **transudate** (from altered pressures, protein-poor).
X: Pleural fluid has protein 42 g/L; serum protein is 70 g/L. Exudate or transudate?
> Light's criteria: an exudate has fluid:serum protein ratio over 0.5, fluid:serum LDH over 0.6 or fluid LDH over two-thirds the upper limit of normal serum LDH.
> 42/70 = 0.6, above 0.5: an exudate.
> Think of inflammatory and malignant causes (pneumonia, empyema, cancer, TB) rather than heart failure, which gives a transudate.
!: Equating CRP with infection. CRP rises with any significant inflammation or tissue injury, including after surgery and in autoimmune disease; it can also be only mildly raised in some viral infections and early bacterial infection.
EV: established | IL-6 is the main driver of hepatic CRP synthesis, which is why IL-6 blockade suppresses CRP even during infection.
EV: established | Light's criteria separate pleural exudates from transudates with high sensitivity, though they misclassify some transudates in patients on diuretics.
T: Exudate | Protein-rich extravascular fluid produced by increased vascular permeability in inflammation
T: Opsonisation | Coating of a microbe with IgG or C3b so phagocytes recognise and engulf it
SUM: Acute inflammation is vasodilation, leaky venules and neutrophil recruitment, driven by histamine, prostaglandins, complement and cytokines.
SUM: It resolves, forms an abscess, scars or becomes chronic; CRP, ESR and neutrophilia are its laboratory footprint.
SRC: Medzhitov R., "Origin and physiological roles of inflammation", Nature 454(7203):428–435 | secondary | 2008 | https://doi.org/10.1038/nature07201
SRC: Light R. W. et al., "Pleural effusions: the diagnostic separation of transudates and exudates", Annals of Internal Medicine 77(4):507–513 | primary | 1972 | https://doi.org/10.7326/0003-4819-77-4-507
Q: Name the five cardinal signs of inflammation. | Redness, heat, swelling, pain and loss of function (rubor, calor, tumor, dolor, functio laesa).
Q: Which cytokine is the main stimulus for CRP synthesis by the liver? | Interleukin-6 (IL-6).
M1#dentistry-u03-23-q1@1: Which leucocyte predominates in the first 24 hours of acute inflammation? | Neutrophil | Lymphocyte | Eosinophil | Plasma cell | Neutrophils arrive first; macrophages follow at 24–48 hours, and lymphocytes and plasma cells characterise chronic inflammation.
M2#dentistry-u03-23-q2@2: Which enzyme do NSAIDs inhibit to reduce pain and fever? | Cyclooxygenase | Lipoxygenase | Phospholipase A₂ | Carbonic anhydrase | NSAIDs block cyclooxygenase, cutting prostaglandin synthesis. Corticosteroids act further upstream, partly by reducing phospholipase A₂ activity.
MS2#dentistry-u03-23-q3@2: Which are acute-phase or systemic effects driven by IL-1, IL-6 and TNF? Choose all that apply. | Fever ; Raised CRP ; Neutrophilia | Bronchoconstriction ; Low ESR | Cytokines act on the hypothalamus (fever), liver (CRP, fibrinogen, which raises the ESR) and marrow (neutrophilia). Bronchoconstriction is a leukotriene and histamine effect.
M3#dentistry-u03-23-q4@3: A patient has pleural fluid with protein 18 g/L, serum protein 72 g/L and a fluid LDH well below the serum limit. Which cause best fits? | Congestive heart failure | Parapneumonic effusion | Malignant mesothelioma | Tuberculous pleurisy | A ratio of 0.25 with low LDH meets none of Light's criteria: a transudate, typical of heart failure. The other three cause exudates.
SA3#dentistry-u03-23-q5@2,3: Explain the mechanism of the redness, swelling and fever seen in cellulitis. | Bacterial products and tissue damage trigger mast cells and macrophages. Histamine, prostaglandins and nitric oxide dilate arterioles, increasing blood flow (redness and heat). Histamine, bradykinin and leukotrienes make post-capillary venules leaky, so protein-rich exudate accumulates (swelling). Macrophages release IL-1, IL-6 and TNF, which act on the hypothalamus to raise the temperature set point via prostaglandin E₂ (fever) and on the liver to raise CRP. | Vasodilator mediators and redness or heat ; Increased venular permeability and exudate ; Cytokines named ; Hypothalamic set point via PGE₂ ; Acute-phase response

## Chronic inflammation and repair
LV: Preclinical · Foundation
S: When injury persists, inflammation becomes chronic and repair runs alongside destruction. This lesson covers the causes and cells of chronic inflammation, granulomas, regeneration versus scarring, and the stages and enemies of wound healing.
O: Describe the causes and cellular features of chronic and granulomatous inflammation
O: Explain the stages of wound healing and the difference between regeneration and repair by scarring
O: Analyse the local and systemic factors that delay healing in a clinical case
PRE: Acute inflammation
H: Chronic inflammation
P: Chronic inflammation lasts weeks to years and is characterised by **macrophages, lymphocytes and plasma cells**, with tissue destruction and attempts at repair (fibrosis, new vessels) happening together. Causes: persistent infection (tuberculosis, hepatitis B and C, *Helicobacter pylori*), autoimmune disease (rheumatoid arthritis), and prolonged exposure to irritants (silica, cigarette smoke, cholesterol crystals in atherosclerosis).
P: **Granulomatous inflammation** is a distinct pattern: collections of activated (epithelioid) macrophages, often with multinucleate giant cells and a rim of lymphocytes, walling off something that can't be cleared. **Caseating** granulomas suggest tuberculosis; **non-caseating** granulomas occur in sarcoidosis, Crohn's disease, foreign-body reactions and granulomatosis with polyangiitis.
H: Regeneration or scar
- **Labile** cells divide continually (skin and gut epithelium, bone marrow): lost cells are replaced.
- **Stable** cells are quiescent but can divide when needed (hepatocytes, renal tubular cells): regeneration if the framework survives.
- **Permanent** cells can't divide (neurones, cardiac myocytes): loss heals by scar.
H: The stages of wound healing
- **Haemostasis** (minutes): platelet plug and fibrin clot.
- **Inflammation** (days 1–4): neutrophils then macrophages clear debris and release growth factors (PDGF, TGF-β, VEGF).
- **Proliferation** (days 3 to about 3 weeks): **granulation tissue** of fibroblasts and new capillaries fills the defect; myofibroblasts contract it; epithelium covers the surface.
- **Remodelling** (weeks to over a year): type III collagen is replaced by stronger type I. A mature scar reaches only about 70–80% of the strength of unwounded skin.
P: Wounds whose edges are brought together heal by **primary intention**, with a thin scar. Open wounds with tissue loss heal by **secondary intention**: more granulation tissue, more contraction, a bigger scar. Overactive repair causes hypertrophic scars and keloids; in organs, persistent injury causes fibrosis that destroys function (cirrhosis, pulmonary fibrosis).
X: A 68-year-old with poorly controlled diabetes, peripheral arterial disease and long-term prednisolone has a foot ulcer that hasn't healed in 8 weeks. Why?
> Ischaemia: poor arterial supply limits oxygen and nutrient delivery to granulation tissue.
> Hyperglycaemia impairs neutrophil function, raising infection risk; neuropathy means repeated unnoticed trauma.
> Corticosteroids suppress inflammation and fibroblast collagen synthesis, slowing every stage after haemostasis.
> Managing it means addressing each factor: offloading, revascularisation assessment, infection control, glucose and steroid review.
K: Healing needs blood supply, oxygen, nutrition (protein, vitamin C, zinc), absence of infection and freedom from repeated injury. A non-healing wound is a prompt to look for the factor that's missing, and for malignancy.
!: Thinking granulation tissue means granulomas. Granulation tissue is new fibrous tissue and capillaries in a healing wound; a granuloma is a collection of activated macrophages in chronic inflammation.
EV: established | Vitamin C is required for hydroxylation of proline and lysine in collagen synthesis, so deficiency (scurvy) causes poor wound healing and fragile vessels.
EV: contested | How much specific dressings and topical agents speed healing of chronic wounds is uncertain; Cochrane reviews often find low-quality evidence.
T: Granuloma | A focal collection of epithelioid macrophages, often with giant cells and lymphocytes, in chronic inflammation
T: Granulation tissue | Fibroblasts, new capillaries and loose matrix that fill a healing wound
SUM: Chronic inflammation combines macrophages, lymphocytes, tissue destruction and repair; granulomas suggest TB, sarcoid, Crohn's or a foreign body.
SUM: Healing passes through haemostasis, inflammation, proliferation and remodelling; ischaemia, infection, diabetes, steroids and malnutrition delay it.
SRC: Kumar V., Abbas A. K., Aster J. C., Robbins and Cotran Pathologic Basis of Disease, 10th edn, Elsevier, chapters 3 and 4 | secondary | 2020
SRC: Gurtner G. C., Werner S., Barrandon Y., Longaker M. T., "Wound repair and regeneration", Nature 453(7193):314–321 | secondary | 2008 | https://doi.org/10.1038/nature07039
Q: Which cells characterise chronic inflammation? | Macrophages, lymphocytes and plasma cells.
Q: What type of collagen replaces type III collagen during remodelling? | Type I collagen.
M1#dentistry-u03-24-q1@1: Which tissue heals mainly by scar because its cells cannot divide? | Cardiac muscle | Liver | Skin epidermis | Bone marrow | Cardiac myocytes are permanent cells, so an infarct heals as a fibrous scar; the liver is stable and the epidermis and marrow are labile.
M2#dentistry-u03-24-q2@1,2: A lymph node biopsy shows non-caseating granulomas. Which diagnosis fits best? | Sarcoidosis | Tuberculosis | Acute bacterial lymphadenitis | Reactive follicular hyperplasia | Non-caseating granulomas are typical of sarcoidosis; TB classically gives caseating ones, and acute bacterial infection gives neutrophils.
SEQ1#dentistry-u03-24-q3@2: Put the stages of wound healing in order. | Haemostasis ; Inflammation ; Proliferation with granulation tissue ; Remodelling | Clotting comes first, then neutrophils and macrophages, then granulation tissue and re-epithelialisation, and finally collagen remodelling over months.
M3#dentistry-u03-24-q4@3: A surgical wound reopens on day 7 in a patient who has been on high-dose corticosteroids. Which explanation is most complete? | Steroids suppress the inflammatory phase and fibroblast collagen synthesis, so the wound is weak when sutures are removed | Steroids increase infection only, which is the sole cause of dehiscence | Steroids prevent haemostasis, so the clot fails to form | Steroids accelerate remodelling, making collagen too stiff | Glucocorticoids blunt macrophage recruitment and growth-factor release and reduce collagen synthesis, so tensile strength at a week is lower than expected. They also raise infection risk.
SA3#dentistry-u03-24-q5@2,3: Compare healing by primary and secondary intention, with an example of each. | Primary intention: a clean wound with apposed edges, such as a sutured surgical incision, needs little granulation tissue, heals quickly with minimal contraction and leaves a thin scar. Secondary intention: a wound with tissue loss or left open, such as an excised abscess cavity or a pressure ulcer, fills with abundant granulation tissue, contracts through myofibroblasts, heals slowly and leaves a larger scar. Secondary healing is more vulnerable to infection. | Defines primary intention with an example ; Defines secondary intention with an example ; Granulation tissue amount ; Contraction by myofibroblasts ; Scar size and time

## Thrombosis, embolism and infarction
LV: Preclinical · Application
S: A thrombus is a clot in a living vessel; an embolus is anything that travels in the blood and lodges; infarction is the tissue death that follows. This lesson links Virchow's triad, arterial and venous thrombosis and the patterns of infarction to the drugs that prevent them.
O: Explain Virchow's triad and apply it to clinical situations
O: Contrast arterial with venous thrombosis and justify antiplatelet versus anticoagulant prevention
O: Describe the types of embolus and the patterns of infarction in different organs
PRE: Acute inflammation
H: Virchow's triad
- **Endothelial injury**: atherosclerotic plaque rupture, vasculitis, catheters, smoking.
- **Abnormal blood flow**: stasis (immobility, atrial fibrillation, heart failure, varicose veins) or turbulence (at bifurcations and aneurysms).
- **Hypercoagulability**: inherited (factor V Leiden, prothrombin gene variant, protein C, protein S or antithrombin deficiency) or acquired (cancer, pregnancy and the postpartum period, oestrogen-containing medicines, surgery, antiphospholipid syndrome, nephrotic syndrome).
H: Arterial versus venous thrombi
P: **Arterial thrombi** form at high flow on damaged endothelium, typically a ruptured plaque. They are platelet-rich ("white") and cause myocardial infarction, stroke and limb ischaemia; **antiplatelet** drugs (aspirin, P2Y₁₂ inhibitors) are the mainstay of prevention. **Venous thrombi** form in slow flow, mostly in the deep veins of the legs. They are fibrin- and red-cell-rich ("red") and cause deep vein thrombosis and pulmonary embolism; **anticoagulants** (heparins, direct oral anticoagulants, warfarin) prevent and treat them.
K: Match the drug to the clot: platelets dominate arterial thrombi, so antiplatelets prevent MI and ischaemic stroke; fibrin dominates venous and atrial (AF) thrombi, so anticoagulants prevent DVT, PE and cardioembolic stroke.
H: Embolism
- **Thromboembolus**: most common; DVT to the lungs (PE), left atrial thrombus in AF to the brain.
- **Paradoxical embolus**: a venous clot crosses to the arterial side through a patent foramen ovale.
- **Fat embolus**: after long-bone fractures; breathlessness, confusion and a petechial rash.
- **Air**, **amniotic fluid**, **cholesterol** (after arterial instrumentation) and **septic** emboli (infective endocarditis).
H: Infarction
P: Infarction is ischaemic necrosis. **White (pale) infarcts** occur in solid organs supplied by end arteries: heart, kidney, spleen. **Red (haemorrhagic) infarcts** occur where there is a dual blood supply or venous occlusion: lung (pulmonary and bronchial arteries), small bowel, and testis or ovary after torsion. The outcome depends on the speed of occlusion, the collateral supply and the tissue's vulnerability: neurones die within minutes, fibroblasts survive hours.
X: Two days after a hip replacement, a 72-year-old develops a swollen, tender calf. Apply Virchow's triad.
> Stasis: immobility after surgery and anaesthesia, and venous compression during the operation.
> Endothelial injury: surgical manipulation of the femoral vein.
> Hypercoagulability: the acute-phase response to surgery raises fibrinogen and factor VIII.
> All three are present: suspect DVT, assess with a Wells score and D-dimer or ultrasound. This is why orthopaedic patients receive thromboprophylaxis.
!: Assuming D-dimer confirms a clot. D-dimer is sensitive but not specific: it rises after surgery, in infection, pregnancy, cancer and old age, so it is used to rule out VTE in low-probability patients, not to diagnose it.
EV: established | Virchow's triad remains the accepted framework for the causes of thrombosis, though Virchow didn't state it in its modern form.
EV: established | Factor V Leiden is the most common inherited thrombophilia in people of European ancestry.
T: Embolus | A detached mass (thrombus, fat, air, amniotic fluid, tumour) carried in the blood to lodge in a distant vessel
T: Infarct | An area of ischaemic necrosis caused by occlusion of its arterial supply or venous drainage
SUM: Thrombosis follows endothelial injury, abnormal flow and hypercoagulability; arterial thrombi are platelet-rich, venous ones fibrin-rich.
SUM: Emboli lodge downstream; infarcts are pale in end-artery organs and haemorrhagic where supply is dual or venous.
SRC: Kumar V., Abbas A. K., Aster J. C., Robbins and Cotran Pathologic Basis of Disease, 10th edn, Elsevier, chapter 4 | secondary | 2020
SRC: National Institute for Health and Care Excellence, Venous thromboembolic diseases: diagnosis, management and thrombophilia testing (NG158) | guidance | 2020 | https://www.nice.org.uk/guidance/ng158
Q: What are the three components of Virchow's triad? | Endothelial injury, abnormal blood flow (stasis or turbulence) and hypercoagulability.
Q: Why does the lung often have haemorrhagic (red) infarcts? | It has a dual blood supply (pulmonary and bronchial arteries), so blood continues to enter the dead tissue.
M1#dentistry-u03-25-q1@1: Which organ typically develops a pale (white) infarct? | Kidney | Lung | Small bowel | Testis after torsion | The kidney is supplied by end arteries with no collateral flow; the others have dual supply or venous occlusion and give red infarcts.
M2#dentistry-u03-25-q2@2: Why are anticoagulants, not antiplatelet drugs alone, used to prevent stroke in atrial fibrillation? | The left atrial clot forms in slow flow and is fibrin-rich, like a venous thrombus | Antiplatelets don't cross into the left atrium | AF strokes are always haemorrhagic | Platelets are absent from atrial thrombi | Stasis in the fibrillating atrium produces fibrin-rich thrombus; anticoagulants target the coagulation cascade, which drives it.
M2#dentistry-u03-25-q3@3: A man has breathlessness, confusion and a petechial rash 36 hours after a femoral shaft fracture. What is the most likely cause? | Fat embolism | Pulmonary thromboembolism | Air embolism | Septic embolism | The timing after a long-bone fracture with respiratory, neurological and petechial features is classic for fat embolism syndrome.
MS1#dentistry-u03-25-q4@1,3: Which are acquired risk factors for venous thromboembolism? Choose all that apply. | Active cancer ; Pregnancy ; Major surgery ; Combined hormonal contraception | Factor V Leiden ; Regular exercise | Cancer, pregnancy, surgery and oestrogen all raise risk through hypercoagulability or stasis. Factor V Leiden is inherited, not acquired, and exercise doesn't raise risk.
SA3#dentistry-u03-25-q5@2,3: Explain why aspirin is used for secondary prevention after a myocardial infarction, whereas a DOAC is used after a pulmonary embolism. | Myocardial infarction results from an arterial thrombus forming on a ruptured plaque under high flow; it is platelet-rich, so inhibiting platelet thromboxane A₂ with aspirin reduces recurrence. A pulmonary embolism comes from a venous thrombus formed in stasis, rich in fibrin and red cells; preventing it requires inhibition of the coagulation cascade, which DOACs do by inhibiting factor Xa or thrombin. | Arterial thrombus forms on plaque under high flow ; Platelet-rich, so antiplatelet ; Venous thrombus forms in stasis ; Fibrin-rich, so anticoagulant ; Mechanism of each drug

## Neoplasia: benign and malignant tumours
LV: Preclinical · Foundation
S: A neoplasm is an abnormal mass of tissue whose growth is uncoordinated and persists after the stimulus stops. This lesson defines benign and malignant tumours, explains how they are named, graded and staged, and describes how cancers spread.
O: Distinguish benign from malignant neoplasms by their clinical and microscopic features
O: Name tumours correctly from their tissue of origin and behaviour
O: Explain the routes of metastasis and the difference between grade and stage
PRE: Cell injury, adaptation and death
H: Benign or malignant
- **Benign**: well differentiated, slow-growing, often encapsulated, expansile, no invasion or metastasis. Harm comes from position (a meningioma compressing the brain), hormone production (a pituitary adenoma) or rarely malignant change.
- **Malignant**: variable differentiation up to **anaplasia** (no resemblance to the tissue of origin), rapid growth, invasion of surrounding tissue and **metastasis**, the defining feature.
P: Before invasion, epithelium may show **dysplasia**: disordered maturation, nuclear enlargement, increased and abnormal mitoses. Full-thickness dysplasia with an intact basement membrane is **carcinoma in situ**. Once the basement membrane is breached, the cancer is invasive and can reach lymphatics and vessels. Screening for cervical and bowel cancer aims to find and remove these pre-invasive stages.
H: Naming tumours
- Benign tumours end in **-oma**: adenoma (glandular epithelium), papilloma, lipoma, leiomyoma (a uterine fibroid), chondroma.
- Malignant epithelial tumours are **carcinomas**: adenocarcinoma, squamous cell carcinoma, urothelial carcinoma.
- Malignant mesenchymal tumours are **sarcomas**: liposarcoma, leiomyosarcoma, osteosarcoma.
- Some names break the rule: lymphoma, melanoma, mesothelioma and seminoma are all malignant.
H: Spread, grade and stage
- **Local invasion** along tissue planes, nerves and vessels.
- **Lymphatic spread** to regional nodes: typical of carcinomas (breast cancer to axillary nodes).
- **Haematogenous spread**: typical of sarcomas and of some carcinomas (renal, follicular thyroid). Gut cancers go first to the liver via the portal vein; systemic venous drainage goes to the lungs. Breast, lung, prostate, kidney and thyroid cancers often metastasise to bone.
- **Transcoelomic spread** across body cavities: ovarian cancer seeding the peritoneum.
P: **Grade** describes how abnormal the cells look (differentiation, mitoses) and comes from the pathologist. **Stage** describes how far the tumour has spread, usually by the TNM system: size and local extent of the primary (T), regional nodes (N) and distant metastasis (M). Stage is generally the stronger predictor of outcome and the main guide to treatment.
X: A pathology report reads: "moderately differentiated adenocarcinoma of the sigmoid colon, invading through the muscularis propria into pericolic fat; 3 of 18 nodes positive; no distant metastasis". Interpret it.
> Adenocarcinoma: malignant tumour of glandular epithelium. "Moderately differentiated" is the grade (intermediate).
> Invasion into pericolic fat is the T stage (T3); 3 positive nodes is N1; no metastasis is M0.
> Node involvement makes this stage III, which usually means adjuvant chemotherapy is considered after surgery.
K: Invasion and metastasis define malignancy. Grade is how the cells look; stage is where the cancer has gone, and stage usually matters more.
!: Assuming every "-oma" is benign. Lymphoma, melanoma, mesothelioma and seminoma are malignant despite the ending.
EV: established | TNM stage is the strongest routine predictor of survival for most solid cancers and guides treatment decisions.
T: Metastasis | Spread of a malignant tumour to a site discontinuous with the primary
T: Carcinoma in situ | Full-thickness epithelial dysplasia that hasn't breached the basement membrane
SUM: Benign tumours stay local; malignant ones invade and metastasise, by lymphatics, blood or across body cavities.
SUM: Carcinomas are epithelial, sarcomas mesenchymal; grade describes the cells, TNM stage the spread.
SRC: Kumar V., Abbas A. K., Aster J. C., Robbins and Cotran Pathologic Basis of Disease, 10th edn, Elsevier, chapter 7 | secondary | 2020
SRC: Brierley J. D., Gospodarowicz M. K., Wittekind C. (eds), TNM Classification of Malignant Tumours, 8th edn, Union for International Cancer Control, Wiley-Blackwell | standard | 2017
Q: What feature defines a malignant tumour? | The ability to invade and metastasise.
Q: What is the difference between grade and stage? | Grade is the degree of differentiation and cellular abnormality under the microscope; stage is the extent of spread (TNM).
M1#dentistry-u03-26-q1@1: What is a malignant tumour of smooth muscle called? | Leiomyosarcoma | Leiomyoma | Rhabdomyoma | Adenocarcinoma | Malignant mesenchymal tumours are sarcomas: leiomyosarcoma. A leiomyoma is the benign counterpart, and adenocarcinoma is epithelial.
M2#dentistry-u03-26-q2@2: Which site is the most common first site of haematogenous metastasis from colorectal cancer? | Liver | Brain | Bone | Adrenal gland | Venous blood from the bowel drains through the portal vein, so the liver is the first capillary bed metastatic cells meet.
TF1#dentistry-u03-26-q3@1: Carcinoma in situ has invaded through the basement membrane. | false | By definition carcinoma in situ is confined above an intact basement membrane, so it cannot yet metastasise.
M3#dentistry-u03-26-q4@3: Two patients have breast cancer of the same grade. One has a 1 cm tumour and no nodes involved; the other has liver metastases. What best explains their different outlooks? | Stage, which describes spread, predicts outcome more strongly than grade | Grade is the only factor that matters, so their outlook is the same | The smaller tumour must be benign | The larger tumour must be a sarcoma | Equal grade means similar-looking cells; stage (here T1 N0 M0 against M1) captures how far the disease has spread and is the stronger prognostic factor.
SA3#dentistry-u03-26-q5@2,3: Explain how a carcinoma progresses from dysplasia to distant metastasis, naming the barriers it must cross. | Dysplastic epithelial cells accumulate genetic changes and become carcinoma in situ, still above the basement membrane. Invasion requires breaching the basement membrane by proteolysis and changes in adhesion (loss of E-cadherin). Cells then invade stroma, enter lymphatics or blood vessels (intravasation), survive in the circulation, leave vessels at a distant site (extravasation) and grow there, often helped by angiogenesis. Carcinomas usually spread first to regional lymph nodes. | Dysplasia to carcinoma in situ ; Basement membrane breach ; Loss of adhesion or proteolysis ; Intravasation and extravasation ; Lymphatic spread typical of carcinoma

## The hallmarks and genetics of cancer
LV: Preclinical · Application
S: Cancer is a genetic disease of somatic cells, built up mutation by mutation. This lesson covers the hallmarks of cancer, oncogenes and tumour suppressor genes, Knudson's two-hit hypothesis, inherited cancer syndromes and the carcinogens that cause mutations.
O: Describe the hallmarks of cancer
O: Distinguish oncogenes from tumour suppressor genes and apply the two-hit hypothesis
O: Relate carcinogens, inherited syndromes and targeted therapies to specific genetic changes
PRE: Neoplasia: benign and malignant tumours
H: The hallmarks
P: Hanahan and Weinberg (2000, updated 2011) summarised the capabilities a cell must acquire to become a cancer: **sustaining proliferative signalling**, **evading growth suppressors**, **resisting cell death**, **enabling replicative immortality** (telomerase), **inducing angiogenesis** and **activating invasion and metastasis**. The 2011 update added **reprogramming energy metabolism** and **evading immune destruction**, made possible by two enabling characteristics: **genome instability** and **tumour-promoting inflammation**.
H: Oncogenes and tumour suppressors
- **Proto-oncogenes** promote growth. A gain-of-function change in **one allele** (point mutation, amplification, translocation) makes an oncogene: KRAS mutation in pancreatic and colorectal cancer, HER2 (ERBB2) amplification in breast cancer, the BCR-ABL fusion of chronic myeloid leukaemia, MYC translocation in Burkitt lymphoma.
- **Tumour suppressor genes** restrain growth or repair DNA. **Both alleles** must be lost: RB1, TP53, APC, BRCA1 and BRCA2, and the mismatch repair genes.
P: Knudson (1971) noticed that inherited retinoblastoma is often bilateral and early, while sporadic cases are single and later. He proposed that two "hits" are needed: in hereditary cases every cell already carries one, so a single further hit suffices. This explains why inherited cancer syndromes are **autosomal dominant at the level of the family** although the gene behaves recessively in the cell.
K: Oncogenes are accelerators stuck on (one mutant copy is enough); tumour suppressors are brakes that fail only when both copies are lost. Inherited syndromes usually involve a tumour suppressor: you inherit the first hit.
H: Carcinogens and inherited syndromes
- **Chemical**: tobacco smoke (lung, bladder, head and neck), aflatoxin (liver), aromatic amines (bladder).
- **Radiation**: UV light (pyrimidine dimers; skin cancers), ionising radiation (leukaemia, thyroid).
- **Infection**: HPV (its E6 protein degrades p53 and E7 inactivates Rb; cervical and oropharyngeal cancer), hepatitis B and C (liver), *H. pylori* (gastric cancer and MALT lymphoma), EBV (nasopharyngeal carcinoma, some lymphomas).
- **Inherited**: BRCA1/2 (breast, ovarian, prostate, pancreas), Lynch syndrome (mismatch repair; colorectal and endometrial), familial adenomatous polyposis (APC), Li–Fraumeni (TP53).
X: Why does trastuzumab help some breast cancers but not others, and why does imatinib transform chronic myeloid leukaemia?
> About 15–20% of breast cancers amplify HER2; trastuzumab is an antibody against the HER2 receptor, so it works only when the tumour is HER2-positive, which is why HER2 is tested on every invasive breast cancer.
> In CML the Philadelphia chromosome, t(9;22), creates BCR-ABL, a constantly active tyrosine kinase that drives the disease.
> Imatinib inhibits that kinase, so a single targetable driver gives a dramatic response: the model for targeted therapy.
!: Saying people "inherit cancer". People inherit a predisposition (one faulty copy of a gene); cancer still needs further somatic changes, which is why not every carrier develops it.
EV: established | Most cancers arise from accumulated somatic mutations in oncogenes and tumour suppressor genes, and inherited syndromes supply a first germline hit.
EV: contested | How much of the variation in cancer risk between tissues is explained by the number of stem-cell divisions ("bad luck") rather than environment and inheritance remains debated.
T: Oncogene | A mutated or over-expressed proto-oncogene whose gain of function drives cell growth
T: Tumour suppressor gene | A gene that restrains growth or repairs DNA, contributing to cancer when both copies are inactivated
SUM: Cancers acquire hallmark capabilities through accumulated mutations, enabled by genome instability and inflammation.
SUM: Oncogenes need one activating hit, tumour suppressors two; inherited syndromes supply the first hit, and drivers can be targeted.
SRC: Hanahan D., Weinberg R. A., "Hallmarks of cancer: the next generation", Cell 144(5):646–674 | secondary | 2011 | https://doi.org/10.1016/j.cell.2011.02.013
SRC: Knudson A. G., "Mutation and cancer: statistical study of retinoblastoma", Proceedings of the National Academy of Sciences 68(4):820–823 | primary | 1971 | https://doi.org/10.1073/pnas.68.4.820
Q: State Knudson's two-hit hypothesis. | Both alleles of a tumour suppressor gene must be inactivated for cancer to develop; in hereditary cases one is inherited, so only one further somatic hit is needed.
Q: How does HPV promote cervical cancer at a molecular level? | Its E6 protein promotes degradation of p53 and its E7 protein inactivates Rb, removing two key tumour suppressors.
M1#dentistry-u03-27-q1@1: Which gene is a tumour suppressor rather than a proto-oncogene? | TP53 | KRAS | MYC | HER2 (ERBB2) | TP53 restrains the cell cycle and triggers apoptosis; KRAS, MYC and HER2 promote growth and become oncogenes when activated.
M2#dentistry-u03-27-q2@2: Why are inherited retinoblastomas usually bilateral and earlier in onset than sporadic ones? | Every retinal cell already carries one inactivated RB1 allele, so one more hit is enough | The inherited allele is an oncogene that acts dominantly in every cell | Inherited tumours grow faster because of telomerase | Sporadic tumours need three hits rather than two | With the first hit inherited, many cells need only one further event, so tumours appear sooner and in both eyes, exactly as Knudson predicted.
MS2#dentistry-u03-27-q3@1,2: Which of these are hallmarks of cancer as described by Hanahan and Weinberg? Choose all that apply. | Inducing angiogenesis ; Resisting cell death ; Enabling replicative immortality | Increased cell adhesion ; Dependence on growth signals from neighbouring cells | Cancers sustain their own proliferative signalling and lose adhesion to invade, so those two distractors describe the reverse of what cancer cells do.
M3#dentistry-u03-27-q4@3: A 35-year-old has colorectal cancer; her mother had endometrial cancer at 45. The tumour shows microsatellite instability. What is the most likely explanation? | Lynch syndrome, an inherited defect in DNA mismatch repair | Familial adenomatous polyposis from an APC mutation | A sporadic KRAS mutation alone | Li–Fraumeni syndrome from TP53 | Early colorectal and endometrial cancers in a family, with microsatellite instability, point to failed mismatch repair: Lynch syndrome, which has implications for screening relatives.
SA3#dentistry-u03-27-q5@2,3: Explain why imatinib is highly effective in chronic myeloid leukaemia but there is no equivalent single drug for most solid cancers. | CML is driven by one dominant genetic event, the BCR-ABL fusion from t(9;22), which encodes a constitutively active tyrosine kinase. Imatinib inhibits that kinase, removing the main driver. Most solid cancers accumulate many driver mutations across several pathways, show genome instability and heterogeneity between cells, so blocking one pathway allows resistant clones to grow, and some drivers, such as loss of tumour suppressors, can't be directly drugged. | BCR-ABL from the Philadelphia translocation ; Constitutive kinase and imatinib inhibits it ; Single dominant driver ; Solid cancers have multiple drivers and heterogeneity ; Resistance or undruggable tumour suppressor loss

## Innate immunity
LV: Preclinical · Foundation
S: Innate immunity is the fast, inborn defence that responds within minutes to hours and recognises broad classes of danger. This lesson covers barriers, pattern recognition receptors, the innate cells, complement and what goes wrong when parts are missing.
O: Describe the components of the innate immune system and how they recognise microbes
O: Explain the three complement pathways and the functions of complement fragments
O: Relate specific innate immune defects to the infections they cause
H: Barriers and recognition
P: The first defences are physical and chemical: intact skin, mucus and cilia, stomach acid, lysozyme in tears, antimicrobial peptides (defensins) and commensal bacteria that compete with pathogens. Breaches (burns, intravenous lines, urinary catheters, ventilation) bypass them and are major routes to infection in hospital.
P: Innate cells recognise **pathogen-associated molecular patterns** (PAMPs), such as bacterial lipopolysaccharide, flagellin and viral double-stranded RNA, and **damage-associated molecular patterns** (DAMPs) released from injured cells, using **pattern recognition receptors** such as the Toll-like receptors (TLR4 binds lipopolysaccharide). Recognition switches on inflammatory cytokines and interferons.
H: The cells
- **Neutrophils**: the most numerous leucocytes; phagocytose and kill bacteria and fungi. Neutropenia (especially below 0.5 × 10⁹/L) brings a high risk of severe infection.
- **Macrophages**: phagocytose, present antigen and orchestrate inflammation with cytokines.
- **Dendritic cells**: capture antigen in tissues and carry it to lymph nodes to start the adaptive response.
- **Natural killer cells**: kill virus-infected and tumour cells that have reduced their MHC class I ("missing self").
- **Mast cells, basophils and eosinophils**: release histamine and other mediators; eosinophils fight parasites.
H: Complement
P: Complement is a cascade of plasma proteins activated by three routes: the **classical pathway** (antibody bound to antigen, via C1q), the **lectin pathway** (mannose-binding lectin on microbial sugars) and the **alternative pathway** (spontaneous activation on microbial surfaces). All converge on C3 convertase, which splits C3.
- **C3b**: opsonin, coating microbes for phagocytosis, and clearing immune complexes.
- **C3a and C5a**: anaphylatoxins; C5a is also a potent neutrophil chemoattractant.
- **C5b–C9**: the membrane attack complex, which lyses some bacteria, notably *Neisseria*.
X: A 19-year-old has a second episode of meningococcal meningitis. What should you suspect?
> Recurrent *Neisseria* infection is the signature of a defect in the terminal complement components (C5–C9), which form the membrane attack complex.
> Eculizumab, which blocks C5, causes the same vulnerability, so patients receiving it are vaccinated against meningococcus.
> Check complement function (CH50 and AP50 tests) and refer to immunology; family members may share the defect.
K: The infection pattern points to the missing defence: encapsulated bacteria after splenectomy (no splenic macrophages or IgM to opsonise them), *Neisseria* with terminal complement defects, catalase-positive bacteria and *Aspergillus* in chronic granulomatous disease, and bacterial and fungal sepsis in neutropenia.
!: Thinking innate immunity is "non-specific" and so unsophisticated. Pattern recognition receptors are specific for microbial molecular classes, and innate signals decide whether, and how, adaptive immunity responds.
EV: established | Toll-like receptors recognise conserved microbial molecules and trigger innate immune responses; this work was recognised by the 2011 Nobel Prize in Physiology or Medicine.
T: Pattern recognition receptor | A germline-encoded receptor, such as a Toll-like receptor, that detects conserved microbial or damage molecules
T: Opsonin | A molecule (such as C3b or IgG) that coats a microbe and promotes its phagocytosis
SUM: Innate immunity uses barriers, phagocytes, NK cells and complement, triggered by pattern recognition receptors.
SUM: Complement opsonises (C3b), recruits (C5a) and lyses (C5b–9); specific defects produce characteristic infections.
SRC: Murphy K., Weaver C., Janeway's Immunobiology, 9th edn, Garland Science, chapters 2 and 3 | secondary | 2017
SRC: Janeway C. A., "Approaching the asymptote? Evolution and revolution in immunology", Cold Spring Harbor Symposia on Quantitative Biology 54:1–13 | primary | 1989 | https://doi.org/10.1101/sqb.1989.054.01.003
Q: Which complement fragment is the main opsonin? | C3b.
Q: What do NK cells recognise to kill a virus-infected cell? | Reduced or absent MHC class I on its surface ("missing self"), together with stress signals.
M1#dentistry-u03-28-q1@1: Which Toll-like receptor recognises bacterial lipopolysaccharide? | TLR4 | TLR3 | TLR9 | TLR5 | TLR4 binds lipopolysaccharide of Gram-negative bacteria; TLR3 detects double-stranded RNA, TLR9 unmethylated CpG DNA and TLR5 flagellin.
M2#dentistry-u03-28-q2@2: After splenectomy for trauma, a patient is at particular risk from which organisms? | Encapsulated bacteria such as Streptococcus pneumoniae | Mycobacterium tuberculosis | Herpes simplex virus | Candida albicans | The spleen filters and opsonises encapsulated bacteria; without it, overwhelming pneumococcal, meningococcal and Haemophilus infection can occur, so these patients are vaccinated and often given prophylactic antibiotics.
TF1#dentistry-u03-28-q3@1: The classical complement pathway is triggered by antibody bound to antigen. | true | C1q binds the Fc regions of IgG or IgM in immune complexes, linking adaptive antibody responses to complement.
M3#dentistry-u03-28-q4@3: A child has recurrent liver abscesses and Aspergillus pneumonia; the nitroblue tetrazolium or dihydrorhodamine test is abnormal. Which process is defective? | The respiratory burst by NADPH oxidase in phagocytes | Antibody class switching in B cells | Formation of the membrane attack complex | T-cell development in the thymus | Chronic granulomatous disease abolishes NADPH oxidase, so phagocytes can't make reactive oxygen species; catalase-positive organisms and fungi survive inside them.
SA3#dentistry-u03-28-q5@2,3: Explain why a patient with chemotherapy-induced neutropenia and a fever is treated as a medical emergency. | Neutrophils are the main phagocytes against bacteria and fungi, so profound neutropenia removes the first line of cellular defence. Infection can progress to sepsis within hours, and the usual signs of inflammation (pus, consolidation, localising features) may be absent because there are few neutrophils to produce them. Fever may be the only sign, so broad-spectrum antibiotics are started promptly after cultures, without waiting for a source. | Neutrophil role against bacteria and fungi ; Rapid progression to sepsis ; Few local signs because no neutrophils ; Fever may be the only sign ; Prompt empirical antibiotics

## Adaptive immunity
LV: Preclinical · Foundation
S: Adaptive immunity recognises specific antigens with enormous diversity and remembers them. This lesson covers B and T cells, antigen presentation on MHC, the antibody classes, primary and secondary responses, and active versus passive immunity.
O: Describe the roles of B cells, CD4 helper T cells and CD8 cytotoxic T cells
O: Explain antigen presentation on MHC class I and class II and its clinical relevance
O: Compare primary and secondary responses and active and passive immunity, with clinical examples
PRE: Innate immunity
H: Lymphocytes and antigen recognition
P: Each B and T cell carries a unique antigen receptor, generated by random rearrangement of gene segments (VDJ recombination), so the repertoire covers millions of antigens. Cells that recognise self strongly are deleted during development (central tolerance). When a lymphocyte meets its antigen with the right co-stimulatory signals it proliferates into a clone (**clonal selection**) and some daughters become long-lived **memory cells**.
H: MHC and T cells
- **MHC class I** is on almost all nucleated cells and displays peptides from inside the cell (including viral proteins) to **CD8 cytotoxic T cells**, which kill the cell.
- **MHC class II** is on antigen-presenting cells (dendritic cells, macrophages, B cells) and displays peptides from engulfed material to **CD4 helper T cells**.
- **CD4 T cells** direct the response: Th1 cells activate macrophages (intracellular bacteria such as TB), Th2 cells drive IgE and eosinophils (parasites, allergy), Th17 cells recruit neutrophils, and regulatory T cells (Tregs) restrain responses.
P: MHC molecules are the human leucocyte antigens (**HLA**), the most polymorphic genes in the genome. HLA matching matters for transplantation, and particular HLA types are linked to disease (HLA-B27 with ankylosing spondylitis, HLA-DQ2/DQ8 with coeliac disease) and to drug reactions (HLA-B*57:01 with abacavir hypersensitivity, which is why it is tested before prescribing).
H: Antibodies
- **IgM**: first antibody made; a pentamer, good at activating complement.
- **IgG**: main antibody of secondary responses; crosses the placenta, protecting newborns for months.
- **IgA**: in secretions (gut, airways, breast milk); protects mucosae.
- **IgE**: binds mast cells; allergy and anti-parasite immunity.
- **IgD**: on naive B cells, as a receptor.
P: Helper T cells let B cells **class switch** from IgM to IgG, IgA or IgE and undergo **affinity maturation** in germinal centres, so later antibodies bind more tightly.
X: A pregnant woman has a positive IgM and positive IgG to rubella, while a second woman has IgG only. Interpret.
> IgM appears early in a primary response and falls within weeks to months; IgG follows and persists.
> IgM with IgG suggests recent primary infection (to be confirmed with avidity testing, because IgM can persist or be falsely positive), which matters greatly in early pregnancy.
> IgG alone suggests past infection or vaccination, and immunity.
K: Primary responses are slow (about a week) and mainly IgM; secondary responses from memory cells are faster, larger and mainly high-affinity IgG. Vaccination works by creating that memory without the disease.
H: Active and passive immunity
P: **Active** immunity is made by the person's own immune system after infection or vaccination: slow to develop, long-lasting. **Passive** immunity is the transfer of ready-made antibody: maternal IgG across the placenta, IgA in breast milk, or therapeutic immunoglobulin (for example after exposure to rabies, hepatitis B or varicella in at-risk people): immediate but short-lived, with no memory.
!: Thinking a positive antibody test always means infection. Antibodies may reflect vaccination, past infection, passive transfer (maternal IgG in an infant under about 18 months, or recent blood products) or a false positive.
EV: established | Memory B and T cells generated by infection or vaccination produce faster, larger secondary responses on re-exposure.
T: MHC class I | Molecules on nearly all nucleated cells that present intracellular peptides to CD8 T cells
T: Class switching | The change of an activated B cell from making IgM to IgG, IgA or IgE, requiring T-cell help
SUM: B cells make antibodies; CD4 T cells help via MHC class II; CD8 T cells kill cells presenting foreign peptides on MHC class I.
SUM: Secondary responses are faster and mainly IgG; active immunity gives memory, passive immunity gives immediate, temporary protection.
SRC: Murphy K., Weaver C., Janeway's Immunobiology, 9th edn, Garland Science | secondary | 2017
SRC: Abbas A. K., Lichtman A. H., Pillai S., Cellular and Molecular Immunology, 10th edn, Elsevier | secondary | 2022
Q: Which antibody class crosses the placenta? | IgG.
Q: Which T cells recognise antigen on MHC class II? | CD4 helper T cells.
M1#dentistry-u03-29-q1@1: Which antibody class is the first produced in a primary immune response? | IgM | IgG | IgA | IgE | IgM appears first; class switching to IgG takes longer and needs T-cell help.
M2#dentistry-u03-29-q2@2: Why is HIV infection associated with opportunistic infections such as Pneumocystis pneumonia? | It depletes CD4 helper T cells, which coordinate both cell-mediated and antibody responses | It destroys neutrophils in the bone marrow | It blocks complement activation | It removes MHC class I from all cells | HIV infects and depletes CD4 T cells; risk of opportunistic infection rises steeply as the CD4 count falls, especially below about 200 cells/µL.
M2#dentistry-u03-29-q3@3: A 6-month-old has a positive HIV antibody test; the mother is HIV-positive. What is the best interpretation? | Maternal IgG may explain it, so viral nucleic acid testing is needed to diagnose the infant | The infant is definitely infected | The test must be a laboratory error | The infant has made IgM, which proves infection | Maternal IgG crosses the placenta and can persist up to about 18 months, so antibody tests can't diagnose infant infection; PCR is used.
TF1#dentistry-u03-29-q4@2: Passive immunity produces long-lived memory cells. | false | Passive immunity transfers ready-made antibody, which is catabolised over weeks; the recipient's own lymphocytes aren't stimulated, so there is no memory.
SA3#dentistry-u03-29-q5@2,3: Explain why a booster dose of a vaccine produces a faster and stronger antibody response than the first dose. | The first dose triggers a primary response: naive B and T cells specific for the antigen are activated, proliferate and some become memory cells, with mainly IgM at first and modest IgG after about one to two weeks. On the booster, the larger population of memory cells responds within days, with class-switched, affinity-matured IgG at higher levels. Germinal-centre selection between doses further improves affinity. | Primary response slow and mainly IgM ; Memory cells formed ; Secondary response faster and larger ; Class switching to IgG ; Affinity maturation

## Hypersensitivity and autoimmunity
LV: Preclinical · Application
S: The immune system can harm the body it protects, by over-reacting to harmless antigens or attacking self. This lesson classifies hypersensitivity into four types, explains how tolerance breaks down, and links autoantibodies to the diseases they mark.
O: Classify hypersensitivity reactions by the Gell and Coombs scheme with clinical examples
O: Explain central and peripheral tolerance and why autoimmunity develops
O: Match common autoantibodies to their diseases and interpret them with caution
PRE: Adaptive immunity
H: The four types (Gell and Coombs)
- **Type I, immediate (IgE)**: allergen cross-links IgE on mast cells, releasing histamine and other mediators within minutes. Anaphylaxis, allergic asthma, hay fever, food allergy.
- **Type II, antibody against cells or matrix**: IgG or IgM binds antigens on cells or tissue, causing destruction or altered function. Autoimmune haemolytic anaemia, ABO transfusion reactions, Goodpasture's disease (anti-GBM), Graves' disease (stimulating anti-TSH receptor), myasthenia gravis (blocking anti-acetylcholine receptor).
- **Type III, immune complex**: antigen–antibody complexes deposit in vessels, kidneys and joints, fix complement and recruit neutrophils. SLE, post-streptococcal glomerulonephritis, serum sickness.
- **Type IV, delayed, T-cell mediated**: sensitised T cells and macrophages act over 48–72 hours. Contact dermatitis (nickel), the tuberculin skin test, granulomas, many drug rashes, transplant rejection.
X: A nurse develops an itchy, eczematous rash on her hands two days after starting to use a new brand of gloves. Which type of reaction?
> The delay of 1–2 days and the eczematous pattern at the contact site suggest a type IV (T-cell) contact dermatitis, often to rubber accelerators.
> An immediate reaction within minutes (urticaria, wheeze) would instead suggest type I latex allergy, which can cause anaphylaxis.
> Patch testing investigates type IV allergy; specific IgE or skin-prick testing investigates type I.
K: The timing is the clue: minutes suggests IgE (type I); hours to days with tissue deposits suggests immune complexes (type III); 48–72 hours with lymphocytes suggests a T-cell reaction (type IV).
H: Tolerance and how it fails
P: **Central tolerance** deletes strongly self-reactive T cells in the thymus (helped by the AIRE gene, which makes thymic cells express tissue proteins) and B cells in the bone marrow. **Peripheral tolerance** controls those that escape: anergy without co-stimulation, and suppression by regulatory T cells (FOXP3). Autoimmune disease follows when genetic susceptibility (particular HLA types, variants in immune-regulatory genes) meets a trigger such as infection, drugs or tissue injury. **Molecular mimicry** is one mechanism: antibodies to group A streptococci cross-react with cardiac myosin in rheumatic fever. Most autoimmune diseases are commoner in women.
H: Autoantibodies
- Anti-dsDNA and anti-Smith: SLE (anti-dsDNA tracks activity, especially nephritis). ANA is sensitive but not specific.
- Anti-CCP: rheumatoid arthritis (more specific than rheumatoid factor).
- Anti-TPO: autoimmune (Hashimoto's) thyroiditis. TSH-receptor antibodies: Graves' disease.
- Anti-tissue transglutaminase IgA: coeliac disease (check total IgA, because IgA deficiency gives a false negative).
- Anti-acetylcholine receptor: myasthenia gravis. ANCA: small-vessel vasculitis.
!: Diagnosing autoimmune disease from an antibody alone. A low-titre ANA is found in a meaningful minority of healthy people, especially older women; autoantibodies support a diagnosis only with a compatible clinical picture.
EV: established | Mutations in AIRE cause autoimmune polyendocrine syndrome type 1, showing the role of thymic tolerance in preventing autoimmunity.
EV: contested | The "hygiene hypothesis", that reduced early-life microbial exposure explains rising allergy and autoimmunity, is supported in parts but debated in its original form.
T: Type I hypersensitivity | An immediate IgE- and mast-cell-mediated reaction to an allergen
T: Molecular mimicry | Cross-reaction of an immune response against a microbe with a structurally similar self antigen
SUM: Hypersensitivity is type I (IgE), II (antibody to cells), III (immune complexes) or IV (T cells), distinguished largely by timing and mechanism.
SUM: Autoimmunity follows failure of central or peripheral tolerance in susceptible people; autoantibodies support but don't make a diagnosis.
SRC: Gell P. G. H., Coombs R. R. A. (eds), Clinical Aspects of Immunology, Blackwell Scientific | primary | 1963
SRC: Abbas A. K., Lichtman A. H., Pillai S., Cellular and Molecular Immunology, 10th edn, Elsevier, chapters 15 and 19 | secondary | 2022
Q: Which type of hypersensitivity is the tuberculin (Mantoux) skin test? | Type IV, delayed (T-cell mediated), read at 48–72 hours.
Q: Which antibody is most specific for rheumatoid arthritis? | Anti-cyclic citrullinated peptide (anti-CCP).
M1#dentistry-u03-30-q1@1: Anaphylaxis to peanuts is which type of hypersensitivity? | Type I | Type II | Type III | Type IV | Peanut allergen cross-links IgE on mast cells, causing immediate mediator release: type I.
M2#dentistry-u03-30-q2@2: Graves' disease is caused by antibodies that stimulate the TSH receptor. How is it classified? | Type II hypersensitivity | Type I hypersensitivity | Type III hypersensitivity | Type IV hypersensitivity | Antibodies binding a cell-surface receptor are type II; here they stimulate rather than destroy, as blocking antibodies do in myasthenia gravis.
MS2#dentistry-u03-30-q3@1,2: Which conditions are mediated mainly by immune complex (type III) deposition? Choose all that apply. | Systemic lupus erythematosus ; Post-streptococcal glomerulonephritis ; Serum sickness | Contact dermatitis ; Hay fever | SLE, post-streptococcal GN and serum sickness are immune-complex diseases; contact dermatitis is type IV and hay fever type I.
M3#dentistry-u03-30-q4@3: A woman has fatigue and a positive ANA at a titre of 1:80, with normal examination, blood count, urine and complement. What is the best conclusion? | A low-titre ANA alone doesn't establish SLE and may occur in healthy people | She has SLE and should start treatment | The ANA proves drug-induced lupus | Anti-dsDNA testing is pointless after a positive ANA | ANA is sensitive but not specific; without clinical or laboratory features, a low titre has a low positive predictive value. More specific antibodies and clinical review help decide.
SA3#dentistry-u03-30-q5@2,3: Explain why coeliac disease screening uses IgA anti-tissue transglutaminase together with total IgA. | Coeliac disease involves an immune response to gluten in genetically susceptible people (HLA-DQ2 or DQ8), producing IgA antibodies to tissue transglutaminase. Selective IgA deficiency is more common in people with coeliac disease than in the general population; such a person can't make IgA, so the IgA tTG test would be falsely negative. Measuring total IgA identifies them, and IgG-based tests are used instead. The person must be eating gluten for the test to be valid. | Autoantibody to tissue transglutaminase ; IgA class ; IgA deficiency gives a false negative ; IgG-based alternative ; Must be on a gluten-containing diet

## Patterns of inheritance in clinical genetics
LV: Preclinical · Application
S: Many diseases run in families in predictable ways. This lesson covers autosomal dominant, autosomal recessive, X-linked and mitochondrial inheritance, how to read a pedigree, and the complications (penetrance, expressivity, anticipation, new mutations) that make real families harder than Punnett squares.
O: Recognise the main patterns of single-gene inheritance from a family history
O: Calculate recurrence and carrier risks for simple pedigrees
O: Explain penetrance, variable expressivity, anticipation and de novo mutation and how they complicate counselling
H: The main patterns
- **Autosomal dominant**: affects both sexes; seen in every generation (vertical); each child of an affected parent has a 50% risk. Huntington's disease, adult polycystic kidney disease, familial hypercholesterolaemia, neurofibromatosis type 1, Marfan syndrome, BRCA1/2-related cancer predisposition.
- **Autosomal recessive**: both sexes; often only siblings affected (horizontal); parents are usually unaffected carriers; each child of two carriers has a 1 in 4 risk; more common with consanguinity. Cystic fibrosis, sickle cell disease, β-thalassaemia, hereditary haemochromatosis, phenylketonuria.
- **X-linked recessive**: mainly males; transmitted through carrier females; no male-to-male transmission; all daughters of an affected man are carriers. Duchenne muscular dystrophy, haemophilia A and B, G6PD deficiency.
- **X-linked dominant**: rare; an affected father passes it to all his daughters and none of his sons. X-linked hypophosphataemic rickets.
- **Mitochondrial**: passed from mothers to all children; variable severity (heteroplasmy). Leber hereditary optic neuropathy, MELAS.
P: Most common diseases (type 2 diabetes, coronary disease, schizophrenia) are **multifactorial**: many genetic variants of small effect plus environment, so relatives have increased risk but no simple ratio.
X: A couple's first child has cystic fibrosis. Both parents are well. (a) What is the risk for their next child? (b) What is the chance that their healthy older daughter is a carrier?
> CF is autosomal recessive, so both parents must be carriers (Cc × Cc).
> (a) Offspring: 1/4 CC, 1/2 Cc, 1/4 cc. The risk of an affected child is 1 in 4 in each pregnancy, independent of previous children.
> (b) The daughter is unaffected, so she can't be cc. Of the three remaining equally likely outcomes (CC, Cc, cC), two are carriers: her carrier risk is 2/3.
K: In a recessive pedigree, an unaffected sibling of an affected person has a 2/3 carrier risk, not 1/2: being unaffected removes one of the four outcomes.
H: Why real families are harder
- **Incomplete penetrance**: not everyone with the variant shows the disease (BRCA1 carriers don't all develop cancer).
- **Variable expressivity**: severity differs among affected relatives (neurofibromatosis type 1).
- **Anticipation**: earlier or more severe disease in successive generations as unstable trinucleotide repeats expand (Huntington's disease, myotonic dystrophy, fragile X syndrome).
- **De novo mutation**: a new variant in the child, so there is no family history (many cases of achondroplasia and Duchenne).
- **Germline mosaicism**: a parent's gonads carry the variant though blood tests are negative, so recurrence is possible.
!: Telling parents that because they've "had their one in four", the next child will be unaffected. Each pregnancy is independent: the risk stays 1 in 4 every time.
EV: established | About 1 in 25 people of northern European ancestry carry a cystic fibrosis variant; carrier frequencies differ between populations.
EV: established | CAG repeat length in HTT correlates inversely with the age of onset of Huntington's disease, and expansion through paternal transmission explains much of the anticipation seen.
T: Penetrance | The proportion of people with a pathogenic genotype who show the disease
T: Anticipation | Earlier onset or greater severity in successive generations, typically from expanding repeat sequences
SUM: Dominant, recessive, X-linked and mitochondrial disorders each leave a recognisable pattern in a pedigree.
SUM: Penetrance, expressivity, anticipation, new mutations and mosaicism complicate risk; recurrence risk in each pregnancy is independent.
SRC: Turnpenny P. D., Ellard S., Emery's Elements of Medical Genetics, 15th edn, Elsevier | secondary | 2017
SRC: Online Mendelian Inheritance in Man (OMIM), Johns Hopkins University | data | 2026-11 | https://www.omim.org
Q: What is the risk to each child when one parent has an autosomal dominant condition with full penetrance? | 50% (1 in 2).
Q: Which X-linked disorders cause bleeding? | Haemophilia A (factor VIII deficiency) and haemophilia B (factor IX deficiency).
M1#dentistry-u03-31-q1@1: Which pattern is shown when an affected man's sons are all unaffected but all his daughters are carriers? | X-linked recessive | Autosomal dominant | Autosomal recessive | Mitochondrial | A father passes his X to every daughter and his Y to every son, so sons are unaffected and daughters obligate carriers in X-linked recessive disease.
NUM2#dentistry-u03-31-q2@2: Two carriers of sickle cell trait have a child. What is the probability (as a percentage) that the child has sickle cell disease? | 25 | 0 | % | Sickle cell disease is autosomal recessive: each child of two carriers has a 1 in 4 (25%) chance of inheriting both variant alleles.
M2#dentistry-u03-31-q3@2,3: A healthy woman's brother has Duchenne muscular dystrophy; neither her parents nor anyone else in the family is affected. Why can't her carrier risk be assumed to be 50%? | Her brother's condition may be a de novo mutation, so her mother may not be a carrier | Duchenne is autosomal dominant, so carrier risk is 0% | Females can't carry X-linked disorders | Her risk is always exactly 2/3 in X-linked disease | About a third of isolated Duchenne cases arise from new mutations; if her mother isn't a carrier, her own risk is much lower. Testing the mother (and her) clarifies it, though germline mosaicism leaves a small residual risk.
M3#dentistry-u03-31-q4@3: A man with Huntington's disease developed symptoms at 50; his son developed symptoms at 32. What explains this? | Anticipation from expansion of the CAG repeat when passed through the father | Incomplete penetrance in the father | Germline mosaicism in the mother | A second, unrelated mutation in the son | Unstable trinucleotide repeats lengthen between generations, particularly in paternal transmission, and longer repeats cause earlier onset.
SA3#dentistry-u03-31-q5@2,3: Explain why genetic counselling for an autosomal dominant cancer predisposition, such as a BRCA1 variant, is more complex than a Punnett square suggests. | A Punnett square gives a 50% chance of inheriting the variant, but penetrance is incomplete: not every carrier develops cancer, and risk varies with age, sex and other genetic and lifestyle factors. Expressivity varies (breast, ovarian, other cancers). Testing has consequences for relatives, insurance and screening or risk-reducing surgery decisions, and results may show variants of uncertain significance. Counselling therefore covers risk estimates, options, psychological impact and family communication. | 50% inheritance risk ; Incomplete penetrance and age-dependent risk ; Variable expressivity ; Implications for relatives and decisions ; Variants of uncertain significance or psychological impact

## Pharmacodynamics: receptors and dose–response
LV: Preclinical · Application
S: Pharmacodynamics is what a drug does to the body. This lesson covers drug targets and receptor families, agonists and antagonists, potency, efficacy and the dose–response curve, the therapeutic index, and tolerance.
O: Describe the main types of drug target and receptor family with examples
O: Distinguish affinity, efficacy and potency and interpret dose–response curves for agonists and antagonists
O: Explain the therapeutic index and why narrow-index drugs need monitoring
PRE: Membranes, transport and the resting potential
H: Drug targets
- **Ligand-gated ion channels** (milliseconds): nicotinic acetylcholine receptor, GABA-A receptor (enhanced by benzodiazepines).
- **G protein-coupled receptors** (seconds): β-adrenoceptors, muscarinic, opioid and histamine receptors; the largest family of drug targets.
- **Kinase-linked receptors** (minutes to hours): the insulin receptor, growth-factor receptors.
- **Nuclear receptors** (hours): steroid and thyroid hormone receptors, which alter gene transcription.
- Also **enzymes** (ACE inhibitors, statins, proton pump inhibitors), **transporters** (SSRIs, loop diuretics, digoxin's Na⁺/K⁺-ATPase) and **ion channels** (calcium channel blockers, local anaesthetics).
H: Agonists, antagonists and the dose–response curve
P: **Affinity** is how tightly a drug binds; **efficacy** is how well it activates the receptor once bound. A **full agonist** produces the maximal response; a **partial agonist** (such as buprenorphine at opioid receptors) can't, however high the dose, and can reduce the effect of a full agonist; an **antagonist** has affinity but no efficacy.
P: On a log dose–response curve, **potency** is shown by the EC₅₀ (the concentration giving half the maximum effect: further left is more potent) and **efficacy** by the maximum (Emax). A **competitive reversible antagonist** shifts the agonist curve to the right without lowering the maximum: enough agonist overcomes it (surmountable). An **irreversible or non-competitive antagonist** lowers the maximum.
X: A patient given morphine is drowsy with a respiratory rate of 7/min. Naloxone is given and they wake within minutes, but become drowsy again an hour later. Explain.
> Naloxone is a competitive antagonist at μ-opioid receptors with high affinity; it displaces morphine and reverses its effects.
> Its duration of action is shorter than that of many opioids, so as naloxone is cleared, the remaining morphine re-occupies receptors.
> Patients need observation and may need repeated doses or an infusion. Reversing buprenorphine needs much more naloxone because buprenorphine binds with very high affinity and dissociates slowly.
K: Potency (EC₅₀) tells you the dose needed; efficacy (Emax) tells you the ceiling of effect. A more potent drug isn't a better drug unless its maximum effect is also greater or its side effects fewer.
H: Therapeutic index and tolerance
E: Therapeutic index = TD₅₀ / ED₅₀ :: the ratio of the dose toxic in 50% to the dose effective in 50%
P: Drugs with a **narrow therapeutic index**, where effective and toxic concentrations are close, need careful prescribing and often plasma level monitoring: digoxin, lithium, aminoglycosides, phenytoin, theophylline, warfarin (monitored by INR), ciclosporin. Repeated exposure can cause **tolerance** (reduced effect, as with opioids and nitrates), from receptor desensitisation, down-regulation or physiological adaptation; rapid tolerance is **tachyphylaxis**.
!: Confusing potency with efficacy. Fentanyl is far more potent than morphine (a much smaller dose is needed), but both are full agonists with similar maximal effects at the μ receptor.
EV: established | Competitive antagonists cause a parallel rightward shift of the agonist log dose–response curve without reducing the maximum response, as described by Schild analysis.
T: Efficacy | The ability of a drug, once bound, to activate its receptor and produce a response (maximum effect)
T: Therapeutic index | The ratio of toxic to effective dose; a small ratio means a narrow margin of safety
SUM: Drugs act on receptors, enzymes, transporters and channels; GPCRs are the largest receptor target family.
SUM: Potency is about dose, efficacy about maximum effect; competitive antagonists are surmountable, and narrow-index drugs need monitoring.
SRC: Ritter J. M. et al., Rang and Dale's Pharmacology, 9th edn, Elsevier, chapters 2 and 3 | secondary | 2020
SRC: Black J. W., Leff P., "Operational models of pharmacological agonism", Proceedings of the Royal Society of London B 220(1219):141–162 | primary | 1983 | https://doi.org/10.1098/rspb.1983.0093
Q: What is a partial agonist? | A drug that binds and activates a receptor but can't produce the maximal response, even at full occupancy; it can partly block a full agonist.
Q: Name four drugs with a narrow therapeutic index. | Any four of: digoxin, lithium, gentamicin (aminoglycosides), phenytoin, theophylline, warfarin, ciclosporin.
M1#dentistry-u03-32-q1@1: Which receptor family do β-adrenoceptor agonists such as salbutamol act on? | G protein-coupled receptors | Ligand-gated ion channels | Nuclear receptors | Kinase-linked receptors | β₂-adrenoceptors are GPCRs coupled to Gs, raising cyclic AMP to relax airway smooth muscle.
M2#dentistry-u03-32-q2@2: In the presence of a competitive reversible antagonist, how does an agonist's log dose–response curve change? | It shifts to the right with the same maximum | It shifts to the left with a higher maximum | Its maximum falls with no shift | It becomes a straight line | A competitive antagonist raises the agonist concentration needed (lower apparent potency) but enough agonist still achieves the full response.
TF1#dentistry-u03-32-q3@1: A drug with a higher potency always produces a greater maximum effect. | false | Potency (EC₅₀) and efficacy (Emax) are independent: a highly potent drug may have a lower maximum effect than a less potent one.
M3#dentistry-u03-32-q4@3: Neostigmine is given at the end of an operation to reverse a non-depolarising neuromuscular blocker such as rocuronium. What is the mechanism? | It inhibits acetylcholinesterase, raising acetylcholine to outcompete the blocker at nicotinic receptors | It irreversibly binds and inactivates the blocker | It blocks voltage-gated calcium channels at the nerve terminal | It activates muscarinic receptors on skeletal muscle | Non-depolarising blockers are competitive antagonists at the nicotinic receptor; raising acetylcholine shifts the competition back. Muscarinic side effects (bradycardia) are why glycopyrronium is given with it.
SA3#dentistry-u03-32-q5@2,3: Explain why lithium requires plasma level monitoring whereas paracetamol at standard doses does not. | Lithium has a narrow therapeutic index: concentrations that treat bipolar disorder are close to those causing toxicity (tremor, confusion, seizures, renal and thyroid effects). It is cleared by the kidney, so dehydration, renal impairment and interacting drugs (thiazides, ACE inhibitors, NSAIDs) can push levels into the toxic range. Monitoring keeps levels within a target range. Paracetamol at standard doses has a wide margin between effective and toxic exposure, so routine levels aren't needed, though they are vital after overdose. | Narrow therapeutic index defined ; Lithium's toxic effects ; Renal clearance and interacting factors ; Monitoring keeps levels in range ; Contrast with wide margin of paracetamol

## Pharmacokinetics: absorption, distribution, metabolism and excretion
LV: Preclinical · Application
S: Pharmacokinetics is what the body does to a drug. This lesson covers bioavailability, volume of distribution, metabolism and cytochrome P450 interactions, clearance and half-life, steady state and loading doses, using illustrative numbers rather than real doses.
O: Describe absorption, distribution, metabolism and excretion and the factors that alter each
O: Use half-life, clearance and volume of distribution to predict steady state and the need for a loading dose
O: Explain clinically important enzyme induction and inhibition interactions
PRE: Pharmacodynamics: receptors and dose–response
H: Absorption and distribution
P: **Bioavailability** (F) is the fraction of a dose reaching the systemic circulation unchanged: 100% intravenously, less orally because of incomplete absorption and **first-pass metabolism** in the gut wall and liver. Glyceryl trinitrate has extensive first-pass metabolism, so it is given sublingually, bypassing the portal circulation.
P: **Volume of distribution** (Vd) relates the amount in the body to the plasma concentration. Drugs confined to plasma or extracellular fluid (heparin, gentamicin) have a small Vd; lipid-soluble drugs that concentrate in tissues (amiodarone, digoxin) have a very large one. Highly protein-bound drugs (warfarin, phenytoin) can be displaced by others, and low albumin raises the free fraction.
H: Metabolism and excretion
P: The liver converts drugs to more water-soluble forms. **Phase I** reactions (oxidation, reduction, hydrolysis), largely by **cytochrome P450** enzymes (CYP3A4, 2D6, 2C9 and others), may activate or inactivate a drug. **Phase II** reactions conjugate it (glucuronidation, sulphation, acetylation). The kidneys then excrete water-soluble drugs and metabolites by filtration and tubular secretion; renal impairment lets renally cleared drugs (gentamicin, lithium, metformin, DOACs to varying degrees) accumulate.
- **Enzyme inducers** (rifampicin, carbamazepine, phenytoin, St John's wort, chronic alcohol) speed metabolism over days to weeks, lowering levels of warfarin, combined hormonal contraceptives and ciclosporin.
- **Enzyme inhibitors** (clarithromycin, erythromycin, azole antifungals, some HIV protease inhibitors, grapefruit juice for CYP3A4) slow metabolism quickly, raising levels: simvastatin myopathy, warfarin bleeding.
H: Half-life, steady state and loading
E: t½ = 0.693 × Vd / CL :: half-life rises with a larger Vd or lower clearance
E: Loading dose = Vd × target concentration :: (÷ F if not intravenous)
P: With regular dosing, a drug accumulates until intake equals elimination: **steady state**, reached after about **4–5 half-lives**. When a drug has a long half-life and an effect is needed quickly, a **loading dose** fills the volume of distribution first (digoxin and amiodarone are examples). Most drugs follow **first-order kinetics** (a constant fraction is eliminated per unit time). When enzymes saturate, elimination becomes **zero-order** (a constant amount per unit time): phenytoin and ethanol at higher concentrations, so small dose increases can cause large rises in level.
X: A hypothetical drug has a half-life of 12 hours and is given at the same dose every 12 hours. How long until steady state, and what fraction of a single dose remains after 48 hours?
> Steady state is reached after about 4–5 half-lives: 48–60 hours.
> After 48 hours (4 half-lives), the fraction of a single dose remaining is (1/2)⁴ = 1/16, about 6%.
> If its effect were needed today, a loading dose would be needed rather than waiting two to three days. (Illustrative numbers, not a real drug.)
K: Steady state takes 4–5 half-lives whatever the dose. Changing the dose changes the steady-state level, not the time to reach it; only a loading dose gets there faster.
!: Assuming a drug interaction appears immediately. Enzyme inhibition acts within days, but induction takes one to two weeks to develop and to wear off after the inducer stops, so warfarin requirements may change weeks after starting or stopping rifampicin.
EV: established | Clinically important drug interactions often arise from CYP450 induction or inhibition, especially involving CYP3A4.
T: Bioavailability | The fraction of an administered dose that reaches the systemic circulation unchanged
T: Volume of distribution | The apparent volume into which a drug distributes, the amount in the body divided by the plasma concentration
SUM: Bioavailability, distribution, metabolism and excretion determine how much drug reaches its target and for how long.
SUM: Steady state takes 4–5 half-lives; loading doses shortcut it; enzyme inducers and inhibitors alter the levels of other drugs.
SRC: Ritter J. M. et al., Rang and Dale's Pharmacology, 9th edn, Elsevier, chapters 9–11 | secondary | 2020
SRC: Joint Formulary Committee, British National Formulary (BNF), BMJ Group and Pharmaceutical Press, appendix 1 "Interactions" | guidance | 2026
Q: How many half-lives does it take to reach steady state? | About 4–5 half-lives.
Q: Name three enzyme inducers. | Any three of: rifampicin, carbamazepine, phenytoin, St John's wort, chronic alcohol use.
M1#dentistry-u03-33-q1@1: Why is glyceryl trinitrate given sublingually for angina? | To avoid extensive first-pass metabolism in the liver | Because it isn't absorbed from the mouth | To slow its onset of action | Because it is destroyed by saliva if swallowed | Sublingual absorption enters the systemic veins directly, bypassing the portal circulation and hepatic first-pass metabolism.
NUM2#dentistry-u03-33-q2@2: A hypothetical drug has a half-life of 6 hours. What percentage of a single dose remains after 24 hours? | 6.25 | 0.1 | % | 24 hours is four half-lives: (1/2)⁴ = 1/16 = 6.25%.
M2#dentistry-u03-33-q3@2: A woman on a combined oral contraceptive starts rifampicin. What is the main concern? | Contraceptive failure, because rifampicin induces the enzymes that metabolise oestrogen and progestogen | Raised oestrogen levels causing thrombosis | Rifampicin toxicity from reduced metabolism | No interaction, because rifampicin is renally excreted | Rifampicin is a potent CYP inducer and lowers contraceptive hormone levels; additional or alternative contraception is needed and the effect persists for weeks after stopping.
M3#dentistry-u03-33-q4@3: Phenytoin levels rise sharply after a small dose increase. Which explanation is correct? | Its metabolism saturates within the therapeutic range, so elimination becomes zero-order | Its volume of distribution shrinks at higher doses | Its bioavailability falls with increasing dose | It switches to renal excretion at higher concentrations | When hepatic enzymes saturate, a fixed amount rather than a fixed fraction is eliminated per hour, so levels rise disproportionately: hence monitoring.
SA3#dentistry-u03-33-q5@2,3: Explain why a loading dose may be used for a drug with a long half-life, and why the maintenance dose, not the loading dose, determines the steady-state concentration. | With a long half-life, regular dosing takes 4–5 half-lives to reach steady state, which may be days or weeks. A loading dose, roughly Vd × target concentration, fills the volume of distribution immediately so the target is reached quickly. Thereafter, the steady-state level depends on the balance between the rate of drug input (maintenance dose ÷ interval × F) and clearance; the loading dose has no lasting effect on that balance. | Time to steady state of 4–5 half-lives ; Loading dose fills Vd ; Loading dose formula or concept ; Steady state set by maintenance rate and clearance ; Loading dose doesn't change steady-state level
`;
