// School 2: Veterinary Physiology. Written to content standard 2 (docs/CURRICULUM_CONTENT_STANDARD.md): objectives,
// key terms, summaries, typed and dated sources, evidence status (EV:) and questions at three levels (Foundation,
// Application, Evaluation) in every lesson. Explanations are original; sources are those used and cited for checking,
// pending review by a veterinary surgeon (qa.js records the review stages). Level: first and second year of a UK
// veterinary degree. Reference values are approximate and vary with laboratory, breed and method; worked numbers are
// illustrative. Education, not veterinary advice: nothing here is guidance for a real animal, and no dose is given.
export default `
## Homeostasis and body fluids
LV: Preclinical · Foundation
S: Physiology is the study of how an animal keeps its internal environment stable while the world around it changes. This lesson introduces homeostasis and feedback control, and the body's fluid compartments, their volumes and composition, and the forces that move water between them, the basis of fluid therapy.
O: Explain homeostasis and distinguish negative from positive feedback with veterinary examples
O: Describe the body fluid compartments, their approximate volumes and their ionic composition
O: Apply Starling forces and osmolality to explain oedema and the distribution of water between compartments
H: Homeostasis and feedback
P: **Homeostasis**, Cannon's term (1929), is the maintenance of a stable internal environment: body temperature, blood glucose, plasma osmolality, pH, blood pressure and oxygen supply are held within narrow limits. A control system has a **sensor**, an **integrator** that compares the signal with a set point, and an **effector** that corrects it.
- **Negative feedback** opposes the change and is how most variables are controlled: a rise in plasma osmolality triggers antidiuretic hormone (ADH) release, the kidney retains water, and osmolality falls back.
- **Positive feedback** amplifies a change until an event is complete: in parturition, pressure of the fetus on the cervix releases oxytocin, which strengthens contractions, which push the fetus harder (the Ferguson reflex).
- **Feedforward** control anticipates a change: the cephalic phase of gastric secretion begins at the sight and smell of food.
H: Body fluid compartments
P: Water makes up about 60% of an adult animal's body weight, more in neonates (around 70–80%) and less in fat animals, because fat holds little water. About two-thirds of it is **intracellular fluid** (ICF, about 40% of body weight) and one-third **extracellular fluid** (ECF, about 20%). The ECF is mostly **interstitial fluid** (about 15% of body weight) with the **plasma** (about 5%) and small transcellular volumes such as CSF and synovial fluid. In herbivores the gut contents add a large transcellular reservoir: the rumen or equine colon can hold many litres that the animal can draw on, or lose, in disease.
E: Total body water ≈ 0.6 × body weight (kg) :: litres, in an adult of normal body condition
E: ECF ≈ 0.2 × body weight; plasma ≈ 0.05 × body weight :: plasma is about a quarter of the ECF
X: Illustrative numbers for a 20 kg adult dog (not reference values for any real animal).
> Total body water ≈ 0.6 × 20 = 12 litres.
> Intracellular ≈ 8 litres; extracellular ≈ 4 litres, of which plasma ≈ 1 litre and interstitial fluid ≈ 3 litres.
> If isotonic fluid (same composition as the ECF) enters the circulation it stays in the ECF and spreads between plasma and interstitium in about a 1:3 ratio, so only about a quarter remains in the blood vessels once it has equilibrated. This is why isotonic crystalloids expand the plasma volume only modestly.
P: The compartments differ in composition: the ECF is rich in **sodium** and **chloride**; the ICF is rich in **potassium**, phosphate and proteins, the gradient kept by the Na⁺/K⁺-ATPase. Water moves freely across most cell membranes by osmosis, so all compartments share the same **osmolality** (about 300 mOsm/kg in most domestic mammals, a little higher in the cat). Sodium, the main ECF solute, therefore determines ECF volume.
H: Moving water: Starling forces
P: Across the capillary wall, filtration depends on the balance of **hydrostatic pressure** (pushing fluid out) and **colloid osmotic (oncotic) pressure**, mainly from albumin (holding fluid in). Fluid filtered out of capillaries is returned by the lymphatics. **Oedema** develops when filtration exceeds lymphatic return: raised venous pressure (right-sided heart failure, giving ascites in the dog), low plasma albumin (protein-losing enteropathy, liver failure, heavy parasite burdens such as the "bottle jaw" of sheep with *Haemonchus* or *Fasciola*), increased capillary permeability (inflammation) or blocked lymphatics.
K: Water follows osmolality between cells and ECF, and follows Starling forces between plasma and interstitium. Sodium sets ECF volume; albumin holds water in the vessels.
!: Thinking a dehydrated animal has lost only plasma. Most fluid losses (vomiting, diarrhoea, reduced intake) come from the whole ECF and, with time, the ICF; plasma volume is a small part of the deficit.
EV: established | Body water is about 60% of adult body weight, divided about two-thirds intracellular and one-third extracellular, with plasma about a quarter of the ECF; values vary with age and body condition.
EV: contested | The classic Starling model has been revised by the "glycocalyx" model of the capillary wall, which suggests filtration is largely one-way in most tissues; how much this changes fluid therapy in animals is still debated.
T: Homeostasis | The maintenance of a stable internal environment by physiological control systems
T: Negative feedback | Control in which a change triggers responses that oppose it, returning the variable towards its set point
T: Oncotic pressure | The osmotic pressure exerted by plasma proteins, mainly albumin, which holds fluid within the vessels
SUM: Most physiological variables are held stable by negative feedback; positive feedback drives events to completion, as in parturition.
SUM: Body water is about 60% of weight (two-thirds intracellular); Starling forces and lymphatic drainage govern plasma–interstitial exchange, and their imbalance causes oedema.
SRC: Cannon W. B., "Organization for physiological homeostasis", Physiological Reviews 9(3):399–431 | primary | 1929 | https://doi.org/10.1152/physrev.1929.9.3.399
SRC: Klein B. G. (ed.), Cunningham's Textbook of Veterinary Physiology, 6th edn, Elsevier | secondary | 2020
Q: Roughly what proportion of an adult animal's body weight is water? | About 60%, two-thirds of it intracellular and one-third extracellular.
Q: Give a veterinary example of positive feedback. | The Ferguson reflex in parturition: cervical stretch releases oxytocin, which strengthens contractions and increases stretch.
M1#veterinary-u02-01-q1@1: Which ion is most concentrated in the intracellular fluid? | Potassium | Sodium | Chloride | Calcium | The Na⁺/K⁺-ATPase keeps potassium high inside cells and sodium high outside; chloride and calcium are mainly extracellular.
M2#veterinary-u02-01-q2@3: A ewe with a heavy liver fluke burden develops a soft swelling under the jaw. What is the most likely mechanism? | Low plasma albumin reduces oncotic pressure, so fluid leaves the capillaries faster than lymph returns it | High plasma albumin draws water into the tissues | Raised plasma sodium causes water to move into cells | Lymphatic vessels are blocked by fluke eggs | Fluke and *Haemonchus* cause protein loss, and hypoalbuminaemia lowers oncotic pressure, giving dependent oedema ("bottle jaw").
M2#veterinary-u02-01-q3@2: Illustratively, a 10 kg dog has a total body water of about how many litres? | 6 | 2 | 10 | 0.5 | Total body water is about 0.6 × body weight: 0.6 × 10 = 6 litres. About 2 litres is ECF and 0.5 litre plasma.
TF2#veterinary-u02-01-q4@3: Isotonic crystalloid given intravenously stays mostly in the plasma, because it has the same osmolality as plasma. | false | Isotonic fluid distributes throughout the ECF, so only about a quarter remains in the plasma once it has equilibrated with the interstitium.
SA3#veterinary-u02-01-q5@2,3: Explain why oedema can develop in an animal with right-sided heart failure and in one with protein-losing enteropathy, using Starling forces. | Capillary exchange depends on hydrostatic pressure pushing fluid out and oncotic pressure (mainly albumin) holding it in, with lymphatics returning filtered fluid. In right-sided heart failure, raised venous and capillary hydrostatic pressure increases filtration, causing ascites or peripheral oedema. In protein-losing enteropathy, albumin is lost, oncotic pressure falls and filtration increases. In both, oedema forms when filtration exceeds lymphatic return. | Hydrostatic versus oncotic pressure ; Role of lymphatic return ; Heart failure raises hydrostatic pressure ; Protein loss lowers oncotic pressure ; Oedema when filtration exceeds return

## Membrane potentials and nerve conduction
LV: Preclinical · Application
S: Nerves and muscles signal with electrical changes across their membranes. This lesson explains the resting membrane potential, the action potential and its propagation, and how drugs, toxins and disturbances of potassium and calcium change excitability in animals.
O: Explain how ion gradients and selective permeability produce the resting membrane potential
O: Describe the phases of the action potential, the refractory period and saltatory conduction
O: Apply this physiology to local anaesthetics, hyperkalaemia and hypocalcaemia in veterinary patients
PRE: Homeostasis and body fluids
H: The resting potential
P: The **Na⁺/K⁺-ATPase** pumps three sodium ions out of the cell and two potassium ions in, building gradients. At rest the membrane is far more permeable to potassium than to sodium (through leak channels), so potassium diffuses out until the inside is negative enough to hold it back. The resting potential of a neurone is about −70 mV, close to the potassium equilibrium potential given by the **Nernst equation**.
E: E = (RT / zF) ln([ion]outside / [ion]inside) :: the equilibrium potential of one ion; for potassium about −90 mV
H: The action potential
- A stimulus depolarises the membrane to **threshold** (about −55 mV); **voltage-gated sodium channels** open, sodium rushes in and the inside becomes positive (about +30 mV).
- Sodium channels **inactivate** and **voltage-gated potassium channels** open; potassium leaves and the membrane repolarises, briefly overshooting (hyperpolarisation).
- During the **absolute refractory period** no new action potential can start, because the sodium channels are inactivated; during the **relative refractory period** a stronger stimulus is needed. This makes the impulse travel one way and limits firing frequency.
- The action potential is **all-or-none**: stimulus strength is coded by frequency, not size.
P: The impulse spreads as local currents depolarise the next patch. In **myelinated** axons the myelin (Schwann cells in peripheral nerve, oligodendrocytes centrally) insulates the axon and the action potential jumps between **nodes of Ranvier** (saltatory conduction), much faster than in unmyelinated fibres. Large myelinated A fibres carry touch and motor signals; thin Aδ fibres fast, sharp pain; unmyelinated C fibres slow, burning pain.
IX: action-potential
H: Drugs, toxins and electrolytes
- **Local anaesthetics** (lidocaine, bupivacaine) block voltage-gated sodium channels from inside the axon; thin fibres are blocked first, so pain goes before touch and motor function. Cats are more sensitive to their toxic effects than dogs.
- **Tetrodotoxin** (puffer fish) blocks sodium channels from outside, causing paralysis.
- **Hyperkalaemia** (as in a blocked male cat) partly depolarises the resting membrane, which inactivates some sodium channels: cells become less excitable, and the heart slows and develops arrhythmias.
- **Hypocalcaemia** makes nerves *more* excitable, because extracellular calcium normally stabilises sodium channels; a lower threshold produces twitching and tetany, as in puerperal tetany (eclampsia) of the nursing bitch.
X: Why does a hypocalcaemic bitch have tetany while a hypocalcaemic dairy cow with milk fever is weak and recumbent?
> In both, low extracellular calcium lowers the threshold of nerve membranes, increasing excitability.
> But calcium is also needed for acetylcholine release at the neuromuscular junction and for contraction of smooth and cardiac muscle.
> In the cow with milk fever the failure of neuromuscular transmission and muscle contraction dominates, so she becomes flaccid and recumbent; in the bitch the increased nerve excitability dominates, causing tremors and tetany. Both are emergencies needing a vet.
K: The resting potential is set mainly by potassium; the action potential is the opening of voltage-gated sodium then potassium channels. Raising potassium reduces excitability; lowering calcium increases nerve excitability.
!: Saying hyperkalaemia makes cells more excitable because the resting potential is closer to threshold. Sustained depolarisation inactivates sodium channels, so excitability falls; this is why severe hyperkalaemia causes bradycardia and cardiac arrest.
EV: established | The ionic mechanism of the action potential, described by Hodgkin and Huxley in 1952, applies to mammalian nerve, with the same channels as targets of local anaesthetics and toxins.
EV: contested | Why milk fever presents mainly as flaccid paresis in cattle but as tetany in the bitch is often explained by differences in magnesium status and in the speed of the fall in calcium, but the full explanation is not settled.
T: Threshold | The membrane potential at which enough voltage-gated sodium channels open to trigger an action potential
T: Refractory period | The time after an action potential during which a new one cannot be triggered (absolute) or needs a stronger stimulus (relative)
T: Saltatory conduction | Conduction in myelinated axons in which the action potential jumps between nodes of Ranvier
SUM: Ion gradients made by the Na⁺/K⁺-ATPase and potassium permeability set a resting potential of about −70 mV; action potentials are all-or-none.
SUM: Local anaesthetics and tetrodotoxin block sodium channels; hyperkalaemia lowers and hypocalcaemia raises nerve excitability.
SRC: Hodgkin A. L. & Huxley A. F., "A quantitative description of membrane current and its application to conduction and excitation in nerve", Journal of Physiology 117(4):500–544 | primary | 1952 | https://doi.org/10.1113/jphysiol.1952.sp004764
SRC: Klein B. G. (ed.), Cunningham's Textbook of Veterinary Physiology, 6th edn, Elsevier, section II | secondary | 2020
Q: What does the Na⁺/K⁺-ATPase do? | Pumps three sodium ions out of the cell and two potassium ions in, using ATP.
Q: Why do myelinated axons conduct faster? | Myelin insulates the axon, so the action potential jumps between nodes of Ranvier (saltatory conduction).
M1#veterinary-u02-02-q1@2: Which channels open first during the rising phase of an action potential? | Voltage-gated sodium channels | Voltage-gated potassium channels | Ligand-gated chloride channels | Calcium-activated potassium channels | Opening of voltage-gated sodium channels causes the rapid depolarisation; potassium channels open later and repolarise the membrane.
M2#veterinary-u02-02-q2@3: A local anaesthetic is injected around a nerve. Which function is usually lost first? | Pain sensation carried by small fibres | Motor function carried by large fibres | Proprioception carried by large fibres | All functions at exactly the same moment | Thin Aδ and C fibres are blocked by lower concentrations than large myelinated fibres, so pain is lost before touch and motor function.
TF1#veterinary-u02-02-q3@1: The resting membrane potential of a neurone is close to the equilibrium potential for potassium. | true | Because the resting membrane is mainly permeable to potassium, its potential lies near potassium's equilibrium potential.
M3#veterinary-u02-02-q4@1,3: A male cat with urethral obstruction has a plasma potassium far above normal and a slow heart rate. Which explanation is best? | Sustained depolarisation of cardiac cells inactivates sodium channels, reducing excitability and conduction | Potassium hyperpolarises cardiac cells so they cannot reach threshold | Potassium blocks acetylcholine release at the sinoatrial node | High potassium increases sodium channel opening, causing rapid firing | Raised extracellular potassium makes the resting potential less negative; the resulting inactivation of sodium channels slows conduction and can cause bradycardia, arrhythmias and arrest.
SA3#veterinary-u02-02-q5@1,2: Describe how the resting membrane potential is established and the sequence of events in an action potential. | The Na⁺/K⁺-ATPase moves three sodium out and two potassium in, creating gradients. At rest the membrane is mainly permeable to potassium, which diffuses out until the negative interior balances it, giving about −70 mV, near the potassium equilibrium potential. A stimulus depolarises to threshold, voltage-gated sodium channels open and sodium entry makes the interior positive; sodium channels inactivate and voltage-gated potassium channels open, repolarising the membrane with a brief hyperpolarisation. The refractory period follows. | Pump creates gradients ; Potassium permeability sets potential near E_K ; Threshold and sodium influx ; Sodium inactivation and potassium efflux ; Refractory period

## The neuromuscular junction and muscle contraction
LV: Preclinical · Application
S: Every voluntary movement depends on acetylcholine crossing the neuromuscular junction and calcium switching on actin and myosin. This lesson explains neuromuscular transmission, excitation–contraction coupling and the sliding filament mechanism, and the diseases, toxins and drugs that act on them in animals.
O: Describe the events of neuromuscular transmission and the role of acetylcholinesterase
O: Explain excitation–contraction coupling and the cross-bridge cycle in skeletal muscle, and how smooth and cardiac muscle differ
O: Apply this physiology to myasthenia gravis, botulism, tetanus, organophosphate poisoning, neuromuscular blocking drugs and malignant hyperthermia in pigs
PRE: Membrane potentials and nerve conduction
H: Neuromuscular transmission
- An action potential reaches the motor nerve terminal and opens **voltage-gated calcium channels**.
- Calcium triggers fusion of vesicles and release of **acetylcholine** (ACh) into the synaptic cleft.
- ACh binds **nicotinic receptors** on the motor end-plate, opening cation channels; the end-plate potential triggers a muscle action potential.
- **Acetylcholinesterase** in the cleft breaks ACh down within milliseconds, ending the signal.
IX: synapse
H: Excitation–contraction coupling
P: The muscle action potential runs along the sarcolemma and down the **T-tubules**, where voltage sensors (dihydropyridine receptors) are linked to **ryanodine receptors** (RYR1) on the sarcoplasmic reticulum. These release calcium into the cytoplasm. Calcium binds **troponin C**, which shifts **tropomyosin** off the myosin-binding sites on actin. Myosin heads then bind actin, pivot (the power stroke) and, after binding **ATP**, detach and re-cock: the **cross-bridge cycle**. The filaments slide past each other and the sarcomere shortens; the filaments themselves do not shorten. Relaxation needs ATP to pump calcium back into the sarcoplasmic reticulum.
P: After death, ATP runs out and cross-bridges cannot detach: **rigor mortis**, whose timing affects meat quality. **Smooth muscle** uses calmodulin and myosin light-chain kinase rather than troponin; **cardiac muscle** depends on calcium entering from outside the cell to trigger calcium release (calcium-induced calcium release).
K: ACh released by calcium opens nicotinic receptors; acetylcholinesterase ends the signal. In the muscle fibre, calcium released through ryanodine receptors binds troponin, and ATP both powers the stroke and detaches myosin.
H: When it goes wrong
- **Acquired myasthenia gravis** (dogs, occasionally cats): antibodies against nicotinic receptors cause weakness that worsens with exercise and often megaoesophagus with regurgitation.
- **Botulism**: botulinum toxin blocks ACh release, causing flaccid paralysis; outbreaks in cattle and sheep are often linked to poultry litter or carcasses in feed.
- **Tetanus**: tetanus toxin blocks release of inhibitory transmitters (glycine and GABA) in the spinal cord, so motor neurones fire uncontrolled: rigid spastic paralysis, "sawhorse" stance and third eyelid prolapse. Horses are highly susceptible, which is why they are vaccinated.
- **Organophosphates and carbamates** inhibit acetylcholinesterase: ACh accumulates, causing muscle twitching then paralysis, with muscarinic signs (salivation, diarrhoea, constricted pupils).
- **Neuromuscular blocking drugs** used under anaesthesia (atracurium, rocuronium) compete with ACh at nicotinic receptors; their effect can be reversed by anticholinesterases such as neostigmine.
X: A pig collapses during transport with very high temperature, rigid muscles and rapid breathing. What is the mechanism of porcine stress syndrome?
> Affected pigs carry a mutation in the ryanodine receptor RYR1 (the halothane gene), inherited as a recessive trait.
> Stress, or halothane anaesthesia, causes uncontrolled calcium release from the sarcoplasmic reticulum, so muscles contract continuously and generate heat, consuming ATP and producing lactic acid.
> The result is malignant hyperthermia: rigidity, hyperthermia, acidosis and often death, and in surviving pigs pale, soft, exudative (PSE) meat. Breeding programmes have largely removed the gene from many commercial lines.
!: Confusing tetanus with botulism. Tetanus blocks inhibition centrally, causing spastic rigidity; botulism blocks ACh release peripherally, causing flaccid weakness.
EV: established | Porcine malignant hyperthermia is caused by a single point mutation in the RYR1 gene (Arg615Cys), identified in 1991.
EV: contested | Whether megaoesophagus in some dogs without detectable receptor antibodies represents seronegative myasthenia gravis or a different disease is uncertain.
T: Acetylcholinesterase | The enzyme in the synaptic cleft that hydrolyses acetylcholine, ending neuromuscular transmission
T: Excitation–contraction coupling | The link between the muscle action potential and calcium release that triggers contraction
T: Ryanodine receptor | The calcium-release channel of the sarcoplasmic reticulum (RYR1 in skeletal muscle)
SUM: At the neuromuscular junction, calcium-triggered ACh release opens nicotinic receptors; acetylcholinesterase ends the signal.
SUM: Calcium from the sarcoplasmic reticulum binds troponin and ATP drives the cross-bridge cycle; toxins, antibodies, drugs and the RYR1 mutation act at specific steps.
SRC: Fujii J. et al., "Identification of a mutation in porcine ryanodine receptor associated with malignant hyperthermia", Science 253(5018):448–451 | primary | 1991 | https://doi.org/10.1126/science.1862346
SRC: Huxley A. F. & Niedergerke R., "Structural changes in muscle during contraction: interference microscopy of living muscle fibres", Nature 173:971–973 | primary | 1954 | https://doi.org/10.1038/173971a0
Q: What triggers release of acetylcholine at the motor nerve terminal? | Calcium entry through voltage-gated calcium channels opened by the action potential.
Q: Why does rigor mortis develop? | After death ATP is depleted, so myosin heads cannot detach from actin and the muscles stay locked.
M1#veterinary-u02-03-q1@1: Which type of receptor does acetylcholine act on at the skeletal neuromuscular junction? | Nicotinic | Muscarinic | Alpha-adrenergic | Beta-adrenergic | The motor end-plate carries nicotinic receptors, ligand-gated cation channels. Muscarinic receptors are on parasympathetic target organs.
M2#veterinary-u02-03-q2@3: A dog is presented with muscle tremors, drooling, diarrhoea and pinpoint pupils after access to a garden insecticide. Which mechanism best explains the signs? | Inhibition of acetylcholinesterase, so acetylcholine accumulates at nicotinic and muscarinic synapses | Blockade of acetylcholine release, as in botulism | Antibodies against nicotinic receptors | Blockade of inhibitory glycine release in the spinal cord | Organophosphate and carbamate insecticides inhibit acetylcholinesterase, causing nicotinic (tremors) and muscarinic (salivation, diarrhoea, miosis) signs. It is an emergency.
SEQ2#veterinary-u02-03-q3@2: Put the events of skeletal muscle contraction in order. | Acetylcholine binds nicotinic receptors ; Muscle action potential travels down the T-tubules ; Calcium is released from the sarcoplasmic reticulum ; Calcium binds troponin and tropomyosin moves ; Myosin binds actin and performs the power stroke | This is excitation–contraction coupling followed by the cross-bridge cycle; ATP then detaches myosin.
M3#veterinary-u02-03-q4@3: A horse has a stiff, sawhorse stance, flared nostrils and prolapse of the third eyelid when startled, two weeks after a deep hoof wound. Which mechanism is responsible? | A toxin blocking release of inhibitory transmitters in the spinal cord, causing uncontrolled motor activity | A toxin blocking acetylcholine release at the neuromuscular junction | Antibodies against acetylcholine receptors | Excess calcium release from a ryanodine receptor mutation | These are signs of tetanus: *Clostridium tetani* toxin blocks glycine and GABA release from inhibitory interneurones, causing spastic paralysis. Botulism causes flaccid paralysis, and the tempting distractor reverses tetanus and botulism.
SA3#veterinary-u02-03-q5@2,3: Explain the mechanism of porcine stress syndrome and why it affects both welfare and meat quality. | Affected pigs are homozygous for a mutation of the skeletal muscle ryanodine receptor (RYR1, the halothane gene). Stressors such as transport, mixing or halothane trigger uncontrolled calcium release from the sarcoplasmic reticulum, so muscle contracts continuously, consuming ATP and producing heat and lactic acid: rigidity, hyperthermia, acidosis, and often death (malignant hyperthermia), a severe welfare problem. Rapid post-mortem acidification while carcasses are still hot denatures muscle proteins, giving pale, soft, exudative meat. Genetic testing and selection have reduced the gene's frequency. | RYR1 mutation and recessive inheritance ; Triggers such as stress or halothane ; Uncontrolled calcium release and sustained contraction ; Hyperthermia, acidosis, death as welfare issue ; PSE meat from rapid acidification

## The autonomic nervous system
LV: Preclinical · Application
S: The autonomic nervous system controls the heart, blood vessels, glands and gut without conscious effort. This lesson covers the sympathetic and parasympathetic divisions, their transmitters and receptors, their effects on each organ, and the species differences that matter when drugs acting on them are used in animals.
O: Compare the anatomy and transmitters of the sympathetic and parasympathetic divisions
O: Predict the effects of sympathetic and parasympathetic activity on the major organs and the receptors involved
O: Apply autonomic physiology to species differences in drug responses, such as α2-agonists in ruminants, atropine in rabbits and sweating in the horse
PRE: The neuromuscular junction and muscle contraction
H: Two divisions
- **Sympathetic** (thoracolumbar): preganglionic neurones in the thoracic and cranial lumbar spinal cord synapse in the paravertebral chain or prevertebral ganglia; long postganglionic fibres release **noradrenaline** onto **α and β adrenergic receptors**. The **adrenal medulla** is a modified ganglion that releases adrenaline into the blood.
- **Parasympathetic** (craniosacral): preganglionic fibres leave in cranial nerves III, VII, IX and X and sacral nerves, synapsing in ganglia near or in the target organ; short postganglionic fibres release **acetylcholine** onto **muscarinic receptors**. The vagus (X) supplies the heart and most of the gut.
- In both, preganglionic fibres release ACh onto **nicotinic** receptors in the ganglia.
P: The sympathetic system prepares for "fight or flight": it raises heart rate and contractility (β1), constricts skin and gut vessels (α1), relaxes bronchi (β2), dilates pupils, mobilises glucose, and inhibits gut motility. The parasympathetic system supports "rest and digest": it slows the heart, increases salivation and gut motility and secretion, constricts the pupil and bronchi, and empties the bladder. Most organs receive both, with a resting **tone**; the heart of a fit horse at rest is dominated by vagal tone.
E: β1 (heart): ↑ rate and force; α1 (vessels): constriction; β2 (bronchi, some vessels): relaxation; α2 (presynaptic and central): ↓ noradrenaline release, sedation :: the main adrenergic receptors
H: Species differences
- **α2-agonists** (xylazine, detomidine, medetomidine and dexmedetomidine) sedate and relieve pain by reducing central noradrenaline release, and cause bradycardia and initial hypertension. Ruminants are much more sensitive to xylazine than horses, so doses differ greatly between species; they also cause hyperglycaemia and, in pregnant cattle, can increase uterine tone.
- Many **rabbits** produce atropinesterase, an enzyme that breaks atropine down quickly, so atropine may be ineffective; glycopyrronium is often used instead.
- The **horse's sweating** is driven mainly by adrenaline acting on β2 receptors, not by cholinergic nerves as in human sweat glands; horses sweat when frightened or in pain, and an anhidrotic horse cannot sweat.
- The ruminant forestomachs depend on vagal reflexes: damage to the vagus produces **vagal indigestion**, with a distended, poorly emptying rumen.
X: A dog under anaesthesia has a heart rate that falls steeply after an α2-agonist. Explain the physiology (illustrative, not a treatment plan).
> α2-agonists reduce central sympathetic outflow and, initially, constrict vessels (peripheral α2), raising blood pressure.
> The baroreceptor reflex responds to the high pressure with increased vagal activity, and reduced sympathetic tone removes support for heart rate, so bradycardia follows.
> Whether to treat, and how, is a decision for the veterinary anaesthetist, who weighs pressure, heart rate and the risk of increasing cardiac work.
K: Sympathetic postganglionic fibres release noradrenaline onto α and β receptors; parasympathetic fibres release acetylcholine onto muscarinic receptors; all ganglia use nicotinic receptors.
!: Assuming drugs act the same way in every species. Responses to autonomic drugs differ widely (α2-agonists in ruminants, atropine in rabbits), so species-specific data sheets and formularies are essential; nothing here is a dose.
SAFE: Drugs named here are given only by or under the direction of a veterinary surgeon, at doses set for the species and individual, following the product's data sheet or the prescribing cascade.
EV: established | Ruminants are considerably more sensitive than horses and dogs to the sedative effects of xylazine.
EV: contested | Whether α2-agonist-induced bradycardia should routinely be treated with an anticholinergic is debated, because doing so can raise myocardial work and blood pressure.
T: Muscarinic receptor | An acetylcholine receptor on parasympathetic target organs, blocked by atropine
T: Adrenergic receptor | A receptor for noradrenaline and adrenaline: α1, α2, β1 or β2
T: Vagal tone | The resting parasympathetic activity of the vagus nerve, which slows the heart and maintains gut motility
SUM: The sympathetic (thoracolumbar) system uses noradrenaline at α and β receptors; the parasympathetic (craniosacral) system uses acetylcholine at muscarinic receptors.
SUM: Species differ in autonomic drug responses: ruminants are very sensitive to xylazine, many rabbits break down atropine, and horses sweat via β2 receptors.
SRC: Klein B. G. (ed.), Cunningham's Textbook of Veterinary Physiology, 6th edn, Elsevier, chapter on the autonomic nervous system | secondary | 2020
SRC: Riviere J. E. & Papich M. G. (eds), Veterinary Pharmacology and Therapeutics, 10th edn, Wiley-Blackwell | secondary | 2018
Q: Which neurotransmitter do sympathetic postganglionic fibres usually release? | Noradrenaline (norepinephrine).
Q: Why may atropine be ineffective in some rabbits? | Many rabbits produce atropinesterase, which rapidly breaks atropine down.
M1#veterinary-u02-04-q1@1: Which cranial nerve carries most parasympathetic fibres to the heart and gut? | The vagus (X) | The facial (VII) | The trigeminal (V) | The hypoglossal (XII) | The vagus supplies the thoracic and most abdominal viscera; VII carries parasympathetic fibres to the lacrimal and some salivary glands.
M2#veterinary-u02-04-q2@2: Which effect would you expect from stimulating β2 adrenergic receptors? | Bronchodilation | Constriction of skin blood vessels | Pupil constriction | Increased gut motility | β2 receptors relax bronchial smooth muscle. α1 receptors constrict vessels, and pupil constriction and increased gut motility are parasympathetic effects.
MS2#veterinary-u02-04-q3@2: Which are effects of parasympathetic activity? | Slowing of the heart ; Increased salivation ; Constriction of the pupil | Dilation of the bronchi ; Release of glucose from the liver | Parasympathetic activity slows the heart, stimulates secretion and constricts the pupil; bronchodilation and glucose release are sympathetic effects.
M3#veterinary-u02-04-q4@3: A cow is sedated with the same dose per kilogram of xylazine that is used in horses and becomes deeply recumbent. What is the best explanation? | Ruminants are far more sensitive to xylazine than horses, so doses per kilogram are much lower | Cows lack α2 receptors, so the drug acts on muscarinic receptors instead | Horses metabolise xylazine more slowly than cows | The cow's rumen concentrates the drug | Species sensitivity to α2-agonists differs greatly; ruminant doses are a fraction of equine doses. This is why doses must be species-specific and never extrapolated.
SA3#veterinary-u02-04-q5@1,2: Compare the sympathetic and parasympathetic divisions in their anatomy, transmitters and effects on the heart, bronchi, pupil and gut. | Sympathetic: thoracolumbar origin, short preganglionic fibres to chain or prevertebral ganglia, long postganglionic fibres releasing noradrenaline at α and β receptors (with adrenaline from the adrenal medulla); it raises heart rate and force (β1), dilates bronchi (β2), dilates pupils and inhibits gut motility. Parasympathetic: craniosacral origin (III, VII, IX, X and sacral), long preganglionic fibres to ganglia near targets, short postganglionic fibres releasing ACh at muscarinic receptors; it slows the heart, constricts bronchi and pupil and increases gut motility and secretion. Ganglia in both use nicotinic receptors. | Origins thoracolumbar and craniosacral ; Transmitters and receptors ; Nicotinic ganglionic transmission ; Effects on heart and bronchi ; Effects on pupil and gut

## The cardiac cycle
LV: Preclinical · Application
S: The heart is two pumps in series whose valves open and close as pressures change. This lesson explains the conducting system, the electrocardiogram, the phases of the cardiac cycle and the heart sounds, and the species differences vets meet when auscultating dogs, cats, horses and cattle.
O: Describe the conducting system of the heart and relate the waves of the ECG to electrical events
O: Explain the pressure, volume and valve changes in each phase of the cardiac cycle and the origin of the heart sounds
O: Apply cardiac physiology to normal species differences in heart rate, heart sounds and rhythm
PRE: The thorax, heart and lungs
H: Electrical activity
- The **sinoatrial (SA) node** in the right atrium depolarises spontaneously and sets the rate (the pacemaker).
- The impulse spreads across the atria to the **atrioventricular (AV) node**, which delays it so the atria finish contracting before the ventricles start.
- It then passes down the **bundle of His**, the bundle branches and the **Purkinje fibres** to excite the ventricles from apex to base.
P: On the **electrocardiogram** (ECG) the **P wave** is atrial depolarisation, the **QRS complex** ventricular depolarisation and the **T wave** ventricular repolarisation. In horses and cattle the Purkinje network penetrates the ventricular wall deeply, so ventricular depolarisation is less useful for estimating chamber size from the ECG than in dogs.
H: The cycle
- **Atrial systole**: the atria contract, topping up ventricular filling (more important at high heart rates).
- **Isovolumetric contraction**: the ventricles contract, AV valves close (first heart sound, S1), and pressure rises with all valves shut.
- **Ejection**: ventricular pressure exceeds aortic and pulmonary pressure, the semilunar valves open and blood is ejected (the **stroke volume**).
- **Isovolumetric relaxation**: the ventricles relax, the semilunar valves close (second heart sound, S2), and pressure falls with all valves shut.
- **Filling**: when ventricular pressure falls below atrial pressure, the AV valves open and the ventricles fill, rapidly at first (the third sound, S3, may be heard) then slowly; atrial contraction (S4) completes it.
E: Cardiac output = heart rate × stroke volume :: litres per minute
P: Stroke volume rises with **preload** (end-diastolic filling, the Frank–Starling mechanism: a more stretched ventricle contracts more forcefully) and **contractility** (sympathetic stimulation), and falls with **afterload** (the pressure the ventricle must eject against).
IX: heart
X: A fit horse at rest has a heart rate of 32 beats per minute and the vet hears an occasional dropped beat in which a P wave is not followed by a QRS. Is this abnormal?
> Resting horses have high vagal tone, which slows the SA node and conduction through the AV node.
> Occasional failure of AV conduction (second-degree AV block) is common in fit horses at rest.
> If it disappears when heart rate rises with exercise or excitement, it is usually considered physiological; persistence during exercise, or signs such as weakness, would need investigation.
K: S1 marks AV valve closure at the start of systole and S2 semilunar valve closure at its end; murmurs between S1 and S2 are systolic. Horses often have audible S3 and S4 sounds, and second-degree AV block at rest, without disease.
H: Species differences
- Approximate resting heart rates: horse about 28–44, adult cattle about 48–84, dog about 60–160 (lower in large breeds), cat about 140–220 beats per minute; values in a clinic are often higher because of stress.
- Small mammals have higher rates because their metabolic rate per kilogram is higher.
- **Sinus arrhythmia**, a rate that rises with inspiration and falls with expiration, is normal in dogs, reflecting changes in vagal tone; it is uncommon in cats in the clinic.
!: Treating every irregular rhythm as disease. Sinus arrhythmia in dogs and second-degree AV block in resting horses are normal vagal effects; atrial fibrillation, by contrast, is the commonest pathological arrhythmia affecting performance in horses.
EV: established | Second-degree AV block at rest that resolves with exercise is common and usually physiological in horses.
EV: contested | The upper limit of a normal heart rate for a cat examined in a clinic is uncertain, because stress raises rates and home recordings are lower than clinic values.
T: Stroke volume | The volume of blood ejected by a ventricle in one beat
T: Frank–Starling mechanism | The increase in the force of ventricular contraction with greater end-diastolic stretch
T: Sinus arrhythmia | A normal variation of heart rate with breathing, caused by changing vagal tone
SUM: The SA node sets the rate; the AV node delays conduction; P, QRS and T record atrial depolarisation and ventricular depolarisation and repolarisation.
SUM: S1 and S2 mark valve closure at the start and end of systole; heart rates, sounds and normal rhythms differ between species.
SRC: Klein B. G. (ed.), Cunningham's Textbook of Veterinary Physiology, 6th edn, Elsevier, section III | secondary | 2020
SRC: Marr C. M. & Bowen I. M. (eds), Cardiology of the Horse, 2nd edn, Saunders Elsevier | secondary | 2010
Q: What causes the first heart sound? | Closure of the atrioventricular (mitral and tricuspid) valves at the start of ventricular systole.
Q: What does the QRS complex represent? | Depolarisation of the ventricles.
M1#veterinary-u02-05-q1@1: Which structure normally acts as the heart's pacemaker? | The sinoatrial node | The atrioventricular node | The bundle of His | The Purkinje fibres | The SA node depolarises fastest and sets the heart rate; the others are slower, backup pacemakers.
M2#veterinary-u02-05-q2@2: During isovolumetric contraction, which valves are open? | None: all four valves are closed | The aortic and pulmonic valves | The mitral and tricuspid valves | The mitral valve only | Isovolumetric means the volume does not change: the AV valves have closed and the semilunar valves have not yet opened.
M2#veterinary-u02-05-q3@3: Illustratively, an animal's heart rate is 100 beats per minute and its stroke volume 40 mL. What is its cardiac output? | 4 litres per minute | 140 mL per minute | 2.5 litres per minute | 400 litres per minute | Cardiac output = heart rate × stroke volume = 100 × 40 mL = 4000 mL, or 4 litres, per minute.
TF1#veterinary-u02-05-q4@3: Sinus arrhythmia, a heart rate that varies with breathing, is a normal finding in many dogs. | true | It reflects changing vagal tone during the respiratory cycle and usually disappears when heart rate rises.
SA3#veterinary-u02-05-q5@2,3: Explain why the Frank–Starling mechanism matters in a dog given intravenous fluids, and how contractility and afterload also affect stroke volume. | The Frank–Starling mechanism means that increased end-diastolic volume (preload) stretches the ventricular muscle and increases the force of contraction, so stroke volume rises with filling. Intravenous fluids increase venous return and preload, so cardiac output rises in an animal with a normal heart, up to a point beyond which extra filling causes congestion. Stroke volume also rises with contractility (sympathetic stimulation via β1 receptors) and falls with afterload (higher arterial pressure or resistance). In a failing heart the response to preload is blunted, so fluids can cause oedema. | Preload increases stretch and force ; Fluids raise venous return and preload ; Limit and risk of congestion ; Contractility via sympathetic β1 ; Afterload reduces stroke volume

## Blood pressure and its control
LV: Preclinical · Application
S: Blood pressure drives blood through the tissues and must be held within limits from moment to moment. This lesson covers the determinants of arterial pressure, its short-term control by the baroreceptor reflex and longer-term control by the kidney and hormones, and hypertension and hypotension in veterinary patients.
O: Explain how cardiac output and systemic vascular resistance determine arterial pressure, and calculate mean arterial pressure
O: Describe the baroreceptor reflex and the renin–angiotensin–aldosterone system, ADH and natriuretic peptides
O: Apply this physiology to hypertension in cats and dogs and to hypotension during anaesthesia
PRE: The cardiac cycle
H: Determinants of pressure
E: Mean arterial pressure (MAP) = cardiac output × systemic vascular resistance :: plus a small venous pressure term, usually ignored
E: MAP ≈ diastolic pressure + ⅓ × (systolic − diastolic) :: because diastole lasts longer than systole at normal heart rates
P: Resistance depends mostly on the radius of the **arterioles**: by Poiseuille's law, flow varies with the fourth power of the radius, so a small constriction raises resistance greatly. **Pulse pressure** (systolic minus diastolic) increases when stroke volume rises or arteries stiffen; a "bounding" pulse in a dog with a patent ductus arteriosus reflects a wide pulse pressure from run-off of blood into the pulmonary artery in diastole.
X: Illustrative calculation: an anaesthetised dog has a systolic pressure of 120 mmHg and a diastolic of 60 mmHg. What is its approximate MAP?
> Pulse pressure = 120 − 60 = 60 mmHg.
> MAP ≈ 60 + 60/3 = 80 mmHg.
> Organs such as the kidney and brain autoregulate their blood flow over a range of MAP; below roughly 60–70 mmHg autoregulation fails, which is why anaesthetists aim to keep MAP above that range.
H: Control
- **Baroreceptor reflex** (seconds): stretch receptors in the carotid sinus and aortic arch signal to the medulla; a fall in pressure reduces vagal and increases sympathetic activity, raising heart rate, contractility and vasoconstriction. It buffers rapid changes, such as on standing or during haemorrhage.
- **Renin–angiotensin–aldosterone system** (minutes to days): reduced renal perfusion releases **renin** from the juxtaglomerular cells; renin converts angiotensinogen to angiotensin I, and angiotensin-converting enzyme (ACE) makes **angiotensin II**, a vasoconstrictor that stimulates **aldosterone** (sodium retention) and thirst.
- **ADH** (vasopressin) retains water and, at high levels, constricts vessels.
- **Natriuretic peptides** (ANP from the atria, BNP from the ventricles) are released by stretch and promote sodium loss; NT-proBNP is measured in dogs and cats as a marker of heart disease.
K: Arterial pressure is cardiac output times resistance. The baroreceptor reflex corrects it within seconds; the kidney, through renin–angiotensin–aldosterone and sodium balance, sets it in the long term.
H: Hypertension and hypotension
P: In cats and dogs, systemic hypertension is usually **secondary**, most often to chronic kidney disease, hyperthyroidism in cats and hyperadrenocorticism in dogs. Sustained high pressure damages **target organs**: the eye (retinal haemorrhage and detachment, causing sudden blindness), kidney, heart (left ventricular hypertrophy) and brain. The ACVIM consensus (2018) classifies risk of target-organ damage by systolic pressure measured carefully under standard conditions, with values of 160 mmHg or more considered hypertensive. Measurements are repeated because stress ("white-coat" effect) raises pressure.
P: Under general anaesthesia most anaesthetic drugs cause vasodilation and depress the heart, so **hypotension** is common; it reduces kidney and gut perfusion and, in horses, contributes to post-anaesthetic myopathy.
!: Relying on one blood pressure reading in a nervous cat. Stress can raise systolic pressure markedly; readings are taken after acclimatisation, repeated, and interpreted with the clinical findings.
EV: established | Systemic hypertension in cats and dogs causes target-organ damage, especially to the eyes, kidneys, heart and brain, and is usually secondary to another disease.
EV: contested | The best method for measuring blood pressure in conscious cats (Doppler or oscillometric) and how closely either agrees with direct arterial pressure is debated.
T: Mean arterial pressure | The average arterial pressure over a cardiac cycle, approximately diastolic plus one-third of the pulse pressure
T: Baroreceptor reflex | The rapid reflex by which stretch receptors in the carotid sinus and aortic arch adjust heart rate and vascular tone
T: Target-organ damage | Injury to the eyes, kidneys, heart or brain caused by sustained hypertension
SUM: Arterial pressure equals cardiac output times resistance, dominated by arteriolar radius; MAP ≈ diastolic plus a third of pulse pressure.
SUM: Baroreceptors act in seconds and the renin–angiotensin–aldosterone system and ADH over longer periods; hypertension in cats and dogs is usually secondary and damages target organs.
SRC: Acierno M. J. et al., "ACVIM consensus statement: Guidelines for the identification, evaluation, and management of systemic hypertension in dogs and cats", Journal of Veterinary Internal Medicine 32(6):1803–1822 | guidance | 2018 | https://doi.org/10.1111/jvim.15331
SRC: Klein B. G. (ed.), Cunningham's Textbook of Veterinary Physiology, 6th edn, Elsevier, section III | secondary | 2020
Q: Where are the arterial baroreceptors? | In the carotid sinus and the aortic arch.
Q: What does angiotensin II do? | Constricts arterioles, stimulates aldosterone release (sodium retention) and thirst, raising blood pressure.
M1#veterinary-u02-06-q1@2: Which enzyme is released by the juxtaglomerular cells of the kidney when renal perfusion falls? | Renin | Angiotensin-converting enzyme | Aldosterone | Erythropoietin | Renin starts the cascade by converting angiotensinogen to angiotensin I. ACE is mainly in the lung endothelium; aldosterone is an adrenal hormone; erythropoietin controls red cell production.
M2#veterinary-u02-06-q2@1: Illustratively, a cat has a systolic pressure of 150 mmHg and a diastolic of 90 mmHg. What is its approximate mean arterial pressure? | 110 mmHg | 120 mmHg | 100 mmHg | 140 mmHg | MAP ≈ 90 + (150 − 90)/3 = 90 + 20 = 110 mmHg.
TF2#veterinary-u02-06-q3@2: Halving the radius of an arteriole roughly doubles its resistance to flow. | false | By Poiseuille's law resistance varies with the fourth power of the radius, so halving the radius increases resistance about sixteen-fold.
M3#veterinary-u02-06-q4@3: An elderly cat with chronic kidney disease suddenly goes blind and has dilated pupils. Which is the most likely mechanism? | Retinal detachment or haemorrhage from systemic hypertension | Hypotension causing optic nerve ischaemia | Taurine deficiency causing cataracts overnight | Hyperkalaemia blocking the optic nerve | Chronic kidney disease is a common cause of feline hypertension, and the eye is a classic target organ; sudden blindness from retinal detachment is a common presentation.
SA3#veterinary-u02-06-q5@2,3: Describe how the body responds within seconds and over hours to days to a moderate haemorrhage in a dog. | Within seconds, reduced arterial pressure lowers baroreceptor firing in the carotid sinus and aortic arch; the medulla reduces vagal and increases sympathetic outflow, raising heart rate and contractility and constricting arterioles and veins, and the adrenal medulla releases adrenaline. Over minutes to days, reduced renal perfusion releases renin, generating angiotensin II (vasoconstriction, thirst, aldosterone and sodium retention); ADH is released, retaining water; fluid shifts from the interstitium into the plasma because capillary hydrostatic pressure falls. These restore pressure and volume while red cells are replaced over days to weeks. | Baroreceptor reflex mechanism ; Sympathetic effects on heart and vessels ; Renin–angiotensin–aldosterone and sodium retention ; ADH and thirst ; Transcapillary refill or slower red cell replacement

## Blood: cells, clotting and blood groups in animals
LV: Preclinical · Application
S: Blood carries oxygen, fights infection and seals its own leaks, and its cells and blood groups differ between species. This lesson covers red cells, white cells and platelets in the domestic species, haemostasis and the coagulation cascade, and the blood group systems that make transfusion and neonatal isoerythrolysis matter in cats, dogs and horses.
O: Describe the formation, function and species differences of red cells, leucocytes and platelets
O: Explain primary and secondary haemostasis and the role of vitamin K, and relate them to common bleeding disorders
O: Apply knowledge of blood groups to transfusion in dogs and cats and to neonatal isoerythrolysis in kittens and foals
PRE: Homeostasis and body fluids
H: Blood cells
P: Blood cells are made in the bone marrow from stem cells (**haematopoiesis**). Red cell production is driven by **erythropoietin** from the kidney, which is why chronic kidney disease causes a non-regenerative anaemia. Mammalian red cells are anucleate biconcave discs (elliptical in camelids); birds and reptiles have **nucleated** red cells.
- Packed cell volume (PCV), approximately: dog 37–55%, cat 30–45%, horse 32–52%, cattle 24–46% (laboratories and breeds differ).
- Red cell lifespan is roughly 110–120 days in the dog, about 70 days in the cat and about 140–160 days in the horse and cow.
- The **spleen** stores red cells: in an excited horse (and to a lesser extent the dog) splenic contraction can raise the PCV markedly, so a sample from a frightened animal may overestimate it.
- Horse red cells form **rouleaux** (stacks) and settle quickly in a tube; horses rarely release reticulocytes into the blood, so regeneration is judged by other means.
P: **Neutrophils** are the main phagocytes in most species; in birds, reptiles and rabbits the equivalent cell is the **heterophil**. Ruminants normally have more lymphocytes than neutrophils, whereas dogs and cats have more neutrophils. **Eosinophils** rise with parasites and allergy; **monocytes** become tissue macrophages; **lymphocytes** run the adaptive immune response. **Platelets** (thrombocytes in birds, which are nucleated) start haemostasis.
H: Haemostasis
- **Primary haemostasis**: the vessel constricts; platelets adhere to exposed collagen via **von Willebrand factor** and aggregate into a plug. Defects cause mucosal bleeding and petechiae.
- **Secondary haemostasis**: the coagulation cascade generates **thrombin**, which turns fibrinogen into **fibrin**, stabilising the plug. Defects cause bleeding into body cavities, joints and haematomas.
- **Fibrinolysis**: plasmin later dissolves the clot.
P: Factors II, VII, IX and X need **vitamin K** to become active. Anticoagulant rodenticides block the recycling of vitamin K, so after a delay of a few days, as existing factors run out, a poisoned dog bleeds, often into the chest. **Haemophilia A** (factor VIII deficiency) is X-linked, so it is seen mostly in males; **von Willebrand disease** is common in Dobermanns and other breeds.
H: Blood groups
P: **Cats** have the AB system: types A, B and the rare AB. Type B cats have strong naturally occurring anti-A antibodies, so a single transfusion of type A blood into a type B cat can cause a fatal reaction; type A cats have weaker anti-B. Every cat must be blood typed (and ideally cross-matched) before transfusion. The frequency of type B varies by breed and region, being higher in breeds such as the British Shorthair and Devon Rex.
P: **Dogs** have the dog erythrocyte antigen (DEA) system; **DEA 1** is the most antigenic. Dogs have no clinically important naturally occurring antibodies against DEA 1, so a first mismatched transfusion rarely causes an immediate reaction, but it sensitises the recipient and later transfusions can be dangerous. Typing before the first transfusion is still recommended.
X: A litter of type A kittens is born to a type B queen. Why do some kittens become jaundiced and die within days of suckling?
> The queen's colostrum contains strong anti-A antibodies.
> Newborn kittens absorb intact antibodies from colostrum across the gut for about the first day.
> The absorbed anti-A destroys the kittens' type A red cells: **neonatal isoerythrolysis**. It is prevented by knowing the blood types of the queen and tom, and keeping at-risk kittens from suckling their mother for the first day.
K: Type B cats carry strong anti-A antibodies, so mismatched transfusion or suckling can destroy type A red cells; dogs lack strong natural antibodies but are sensitised by a first transfusion. Blood typing comes before any transfusion.
!: Assuming a dog's or cat's first transfusion is always safe. In dogs a first DEA 1 mismatch sensitises the recipient; in cats a first mismatch can kill. Typing and cross-matching are done by the veterinary team.
P: In **horses**, neonatal isoerythrolysis occurs when a mare has been sensitised (by an earlier pregnancy or transfusion) to red cell antigens, most often Aa or Qa, that the foal inherits from the stallion; the foal is normal at birth and becomes weak and jaundiced after suckling.
EV: established | Type B cats have naturally occurring anti-A alloantibodies that can cause fatal haemolytic transfusion reactions and neonatal isoerythrolysis.
EV: contested | How often clinically important reactions follow a first unmatched transfusion in dogs, and whether cross-matching is needed before every first transfusion, is debated.
T: Packed cell volume | The percentage of blood volume occupied by red cells, measured by centrifugation
T: Neonatal isoerythrolysis | Destruction of a newborn's red cells by maternal antibodies absorbed from colostrum
T: Von Willebrand factor | A plasma protein that bridges platelets to exposed collagen in primary haemostasis
SUM: Red cells, leucocytes and platelets vary between species (nucleated red cells and heterophils in birds; lymphocyte predominance in ruminants; splenic contraction in horses).
SUM: Primary haemostasis forms a platelet plug, secondary haemostasis a fibrin clot; vitamin K antagonists cause delayed bleeding. Blood groups make typing essential in cats and important in dogs and horses.
SRC: Day M. J. & Kohn B. (eds), BSAVA Manual of Canine and Feline Haematology and Transfusion Medicine, 2nd edn, British Small Animal Veterinary Association | secondary | 2012
SRC: Giger U. & Bucheler J., "Transfusion of type-A and type-B blood to cats", Journal of the American Veterinary Medical Association 198(3):411–418 | primary | 1991
Q: Which coagulation factors depend on vitamin K? | Factors II, VII, IX and X.
Q: Why must cats be blood typed before transfusion? | Type B cats have strong natural anti-A antibodies, so type A blood can cause a fatal reaction.
M1#veterinary-u02-07-q1@1: Which hormone drives red cell production? | Erythropoietin, from the kidney | Thrombopoietin, from the spleen | Aldosterone, from the adrenal cortex | Renin, from the liver | Erythropoietin is produced mainly by the kidney in response to low tissue oxygen, which is why kidney failure causes anaemia.
M2#veterinary-u02-07-q2@2: A dog that ate rat bait four days ago now has a swollen abdomen and difficulty breathing from bleeding into the chest. Why did signs take days to appear? | Existing vitamin K–dependent factors had to be used up before clotting failed | The poison takes days to be absorbed from the gut | Platelets are destroyed slowly over several days | The bait first causes liver failure, which takes days | Anticoagulant rodenticides stop vitamin K recycling, but circulating factors persist for a time, so bleeding appears after a delay.
MATCH2#veterinary-u02-07-q3@1: Match each finding with the species in which it is normal. | Nucleated red cells = birds ; Lymphocytes outnumber neutrophils = cattle ; Marked rouleaux formation = horses ; Heterophils as the main granulocyte = rabbits | These normal species differences prevent misreading a blood smear.
M3#veterinary-u02-07-q4@3: A type B Devon Rex queen is to be mated with a type A tom. What is the main risk to the kittens? | Type A kittens may develop neonatal isoerythrolysis after absorbing anti-A antibodies from colostrum | All the kittens will be born anaemic | The kittens will inherit haemophilia | The queen will reject type B kittens | Type A kittens of a type B queen are at risk because her colostrum carries strong anti-A antibodies; type B kittens are not affected.
SA3#veterinary-u02-07-q5@2,3: Explain the difference between primary and secondary haemostasis and how a disorder of each presents clinically. | Primary haemostasis is vasoconstriction and formation of a platelet plug: platelets adhere to exposed collagen via von Willebrand factor and aggregate. Disorders (thrombocytopenia, von Willebrand disease) cause surface and mucosal bleeding: petechiae, nosebleeds, bleeding gums and prolonged bleeding from small wounds. Secondary haemostasis is the coagulation cascade producing thrombin and fibrin, which stabilises the plug. Disorders (haemophilia, anticoagulant rodenticide toxicity) cause deep bleeding into body cavities, joints and muscles and large haematomas, often delayed. | Primary: vessel and platelet plug ; Role of von Willebrand factor ; Primary defects give mucosal and petechial bleeding ; Secondary: cascade, thrombin and fibrin ; Secondary defects give cavity, joint and haematoma bleeding

## Respiration and gas exchange
LV: Preclinical · Application
S: Breathing brings oxygen to the blood and removes carbon dioxide, and the haemoglobin–oxygen curve explains how oxygen is loaded in the lung and unloaded in the tissues. This lesson covers ventilation and its control, diffusion, the oxygen dissociation curve, ventilation–perfusion matching and species differences, including the anaesthetised horse.
O: Describe the mechanics of ventilation, lung volumes and the control of breathing
O: Explain diffusion across the alveolar membrane and the shape and shifts of the haemoglobin–oxygen dissociation curve
O: Apply knowledge of ventilation–perfusion matching to hypoxaemia in the anaesthetised horse and to species differences in breathing
PRE: The thorax, heart and lungs
H: Ventilation
P: Inspiration is active: the **diaphragm** contracts and flattens and the external intercostals lift the ribs, lowering pressure in the pleural space so the lungs expand. Quiet expiration is mostly passive recoil; horses also have an active phase of expiration using the abdominal muscles, seen as a "heave line" in horses with severe equine asthma. **Tidal volume** in most mammals is roughly 10–15 mL/kg. Part of each breath fills the airways where no exchange occurs (**dead space**), so **alveolar ventilation** is what matters for gas exchange.
- Breathing is driven by the brainstem; its main chemical stimulus is **carbon dioxide** acting through pH at the central chemoreceptors in the medulla. Low oxygen stimulates the **peripheral chemoreceptors** of the carotid and aortic bodies, important only when PaO₂ falls substantially.
- Horses are **obligate nasal breathers**, so nasal obstruction is serious; dogs pant to lose heat, moving air over the nasal and oral mucosa with little alveolar ventilation.
H: Diffusion and the oxygen dissociation curve
P: Oxygen and carbon dioxide cross the alveolar wall by **diffusion**, at a rate proportional to the area and the partial pressure difference and inversely proportional to the thickness (Fick's law). Each haemoglobin molecule binds up to four oxygen molecules, cooperatively, so the dissociation curve is **sigmoid**: it is flat at high PO₂, so saturation stays high even if alveolar PO₂ falls a little, and steep in the tissue range, so a small fall in PO₂ releases a lot of oxygen.
E: PAO₂ ≈ FiO₂ × (Patm − PH₂O) − PaCO₂ / 0.8 :: the alveolar gas equation (0.8 is the usual respiratory quotient)
X: Illustrative calculation at sea level breathing air (Patm 760 mmHg, water vapour 47 mmHg, PaCO₂ 40 mmHg).
> FiO₂ × (Patm − PH₂O) = 0.21 × 713 ≈ 150 mmHg.
> PaCO₂ / 0.8 = 50 mmHg.
> PAO₂ ≈ 150 − 50 = 100 mmHg. If the animal hypoventilates and PaCO₂ doubles to 80 mmHg, PAO₂ falls to about 50 mmHg on air, which is why hypoventilation under anaesthesia causes hypoxaemia unless oxygen is supplemented.
P: The curve shifts **right** (lower affinity, easier unloading) with higher CO₂, acidity, temperature and 2,3-bisphosphoglycerate: the **Bohr effect**, which helps working muscle. Fetal haemoglobin, or in species without a separate fetal haemoglobin a lower fetal 2,3-BPG binding, shifts the fetal curve **left**, so the fetus can load oxygen from the maternal blood. In general smaller mammals have a curve further to the right (a higher P₅₀), matching their higher metabolic rate.
IX: gas
H: Ventilation–perfusion matching
P: Gas exchange works only where ventilation (V) and blood flow (Q) are matched. **Low V/Q** units (perfused but poorly ventilated) and **shunt** (perfused but not ventilated) lower arterial oxygen; **high V/Q** units add to dead space.
X: Why do large horses become hypoxaemic under general anaesthesia in dorsal recumbency?
> The large abdominal organs press on the diaphragm and the dependent lung collapses (atelectasis), while blood flow continues to it.
> These dependent areas become low V/Q or shunt units, so blood passes through without being oxygenated.
> Supplementary oxygen helps low V/Q units but not true shunt, so the veterinary anaesthetist may need ventilation strategies; the problem is worse in larger horses and in dorsal than lateral recumbency.
K: The sigmoid dissociation curve protects saturation at high PO₂ and releases oxygen in the tissues; it shifts right with CO₂, acid and heat. Most hypoxaemia in clinical animals comes from ventilation–perfusion mismatch or hypoventilation.
!: Thinking oxygen drives breathing. In healthy animals CO₂ (through pH) is the main stimulus; hypoxia drives breathing strongly only when arterial PO₂ is well below normal.
EV: established | Ventilation–perfusion mismatch from atelectasis of the dependent lung is a major cause of hypoxaemia in anaesthetised horses.
EV: contested | The best way to prevent and treat hypoxaemia in anaesthetised horses (recruitment manoeuvres, positive end-expiratory pressure, inspired oxygen fraction) is still debated, and evidence for effects on outcome is limited.
T: Dead space | The part of each breath that does not take part in gas exchange (airways and unperfused alveoli)
T: Bohr effect | The rightward shift of the haemoglobin–oxygen curve with raised CO₂, acidity and temperature
T: Shunt | Blood that passes through the lung without contact with ventilated alveoli
SUM: Inspiration is active (diaphragm and intercostals); CO₂ through pH is the main drive to breathe; tidal volume is about 10–15 mL/kg.
SUM: The sigmoid haemoglobin curve and the Bohr effect govern oxygen loading and unloading; V/Q mismatch and hypoventilation explain most clinical hypoxaemia.
SRC: West J. B. & Luks A. M., West's Respiratory Physiology: The Essentials, 10th edn, Wolters Kluwer | secondary | 2016
SRC: Klein B. G. (ed.), Cunningham's Textbook of Veterinary Physiology, 6th edn, Elsevier, section V | secondary | 2020
Q: What is the main chemical stimulus to breathing in a healthy animal? | Carbon dioxide, acting through pH on the central chemoreceptors in the medulla.
Q: What shifts the haemoglobin–oxygen curve to the right? | Raised CO₂, raised acidity (lower pH), raised temperature and more 2,3-bisphosphoglycerate.
M1#veterinary-u02-08-q1@1: Which muscle is the main muscle of inspiration? | The diaphragm | The internal intercostals | The rectus abdominis | The trapezius | The diaphragm contracts and flattens, enlarging the thorax; abdominal muscles assist expiration.
M2#veterinary-u02-08-q2@2: Illustratively, breathing air at sea level, what happens to alveolar PO₂ if PaCO₂ rises from 40 to 60 mmHg? | It falls by about 25 mmHg, to about 75 mmHg | It rises by about 25 mmHg | It does not change, because oxygen and CO₂ are independent | It falls to zero | By the alveolar gas equation, PAO₂ falls by ΔPaCO₂ / 0.8 = 20 / 0.8 = 25 mmHg.
TF2#veterinary-u02-08-q3@1: Horses are obligate nasal breathers, so obstruction of the nasal passages seriously limits their breathing. | true | The horse's soft palate seals the oral cavity off from the larynx, so it cannot breathe through its mouth.
M3#veterinary-u02-08-q4@3: A large horse under general anaesthesia on its back has a low arterial PO₂ despite breathing a high oxygen concentration. Which mechanism is most likely? | Shunt from collapsed dependent lung that is still perfused | Reduced diffusion from thickened alveolar walls | A leftward shift of the dissociation curve | Excessive ventilation of the dorsal lung only | Atelectasis of the dependent lung creates shunt, which extra inspired oxygen cannot correct because the blood never meets ventilated alveoli.
SA3#veterinary-u02-08-q5@2,3: Explain how the shape of the haemoglobin–oxygen dissociation curve and the Bohr effect help an exercising animal deliver oxygen to muscle. | The curve is sigmoid because haemoglobin binds oxygen cooperatively. At the high PO₂ of the lung it is flat, so haemoglobin stays nearly saturated even if alveolar PO₂ falls somewhat. At tissue PO₂ it is steep, so a small fall in PO₂ releases a large amount of oxygen. Working muscle produces CO₂, acid and heat, which shift the curve to the right (the Bohr effect), lowering affinity so more oxygen is unloaded exactly where it is needed, while loading in the lung is little affected. | Cooperative binding and sigmoid shape ; Flat upper part protects loading ; Steep part favours unloading ; Bohr effect with CO₂, acid and heat ; Rightward shift increases unloading in muscle

## Avian respiration
LV: Preclinical · Application
S: Birds breathe with rigid lungs ventilated by air sacs, a system more efficient than the mammalian lung. This lesson explains avian respiratory anatomy, the one-way flow of air through the parabronchi over two breathing cycles, cross-current gas exchange, and why these features matter for restraint, anaesthesia and disease in poultry and pet birds.
O: Describe the avian lungs, parabronchi and air sacs and how a bird ventilates without a diaphragm
O: Explain the unidirectional flow of air through the lung over two breathing cycles and cross-current exchange
O: Apply avian respiratory physiology to handling, anaesthesia, airborne toxins and respiratory disease
PRE: Avian anatomy
H: Lungs and air sacs
P: The avian lung is small, rigid and fixed to the ribs; it does not inflate and deflate. Gas exchange happens in **parabronchi**, tubes surrounded by a mesh of tiny air capillaries and blood capillaries with a very thin barrier. Most domestic birds, including the chicken, have nine **air sacs**: paired cervical, a single clavicular, paired cranial thoracic, paired caudal thoracic and paired abdominal. The air sacs have few blood vessels and take no significant part in gas exchange; they act as bellows, and extend into pneumatic bones.
P: Birds have **no diaphragm**. Breathing is driven by muscles that move the sternum and ribs: inspiration moves the keel ventrally and cranially, enlarging the body cavity and drawing air into the sacs; expiration is also active. Holding a bird so tightly that the keel cannot move stops it breathing.
H: One-way flow
- **First inspiration**: most inhaled air goes past the lung through the primary bronchus into the **caudal air sacs** (caudal thoracic and abdominal).
- **First expiration**: air from the caudal sacs is pushed forward through the **parabronchi** of the lung, where exchange occurs.
- **Second inspiration**: that air moves from the lung into the **cranial air sacs** (cervical, clavicular, cranial thoracic).
- **Second expiration**: air from the cranial sacs leaves through the trachea.
P: So air passes through the parabronchi in the same direction during both inspiration and expiration, and a given breath takes two cycles to pass through. Blood flows across the parabronchi at an angle (**cross-current exchange**), so arterial PO₂ can exceed that of the exhaled air, which a mammalian alveolus cannot achieve. Birds have a larger tracheal dead space than mammals of the same size, compensated by a slower, deeper breathing pattern.
X: A cockatiel is caught in a towel and held firmly around the body for a long examination. It becomes weak and gasps. What has happened?
> A bird has no diaphragm and ventilates by moving its sternum and ribs.
> Firm pressure on the body prevents keel movement, so the air sacs cannot fill and empty and the lung is not ventilated.
> Restraint of birds should hold the head and support the body without compressing the coelom, and should be brief; a distressed or weak bird needs an avian vet.
K: Air sacs, not the lungs, change volume; air flows one way through the rigid parabronchi over two breathing cycles, and cross-current blood flow makes avian gas exchange very efficient.
H: Clinical consequences
- **Airborne toxins**: efficient exchange means birds absorb inhaled toxins fast. Fumes from overheated non-stick (PTFE) cookware can kill pet birds within minutes, and canaries were once used to detect gas in mines.
- **Inhalant anaesthesia**: depth changes quickly with the inspired concentration, and anaesthetised birds hypoventilate easily, so careful monitoring is essential.
- **Air sacculitis**: infections such as *Mycoplasma gallisepticum* in poultry and *Aspergillus* in many birds involve the air sacs, which have poor blood supply and clear infection slowly.
- **Avian influenza** and other respiratory viruses spread readily in flocks; highly pathogenic avian influenza is notifiable in the UK.
!: Picturing bird lungs as small mammalian lungs that inflate. The lung is fixed in volume; the air sacs are the bellows, and gas exchange does not occur in them.
EV: established | Air flows unidirectionally through the parabronchi of birds during both inspiration and expiration, driven by the air sacs.
EV: contested | Exactly how aerodynamic valving at the bronchial openings achieves one-way flow without anatomical valves is still being studied, and models differ.
T: Parabronchus | The tubular gas-exchange unit of the avian lung, surrounded by air and blood capillaries
T: Air sac | A thin-walled, poorly vascularised sac that acts as a bellows to move air through the avian lung
T: Cross-current exchange | Blood flow across the parabronchi at an angle to the air flow, allowing very efficient oxygen uptake
SUM: Birds have rigid lungs with parabronchi and usually nine air sacs; with no diaphragm, sternal and rib movement ventilates them.
SUM: Air flows one way through the lung over two cycles with cross-current exchange; this makes birds efficient breathers but vulnerable to inhaled toxins and restraint that stops keel movement.
SRC: Scanes C. G. (ed.), Sturkie's Avian Physiology, 6th edn, Academic Press, chapter on respiration | secondary | 2015
SRC: King A. S. & McLelland J., Birds: Their Structure and Function, 2nd edn, Baillière Tindall | secondary | 1984
Q: Do avian air sacs exchange gas with the blood? | No; they are poorly vascularised and act as bellows; gas exchange happens in the parabronchi.
Q: How many breathing cycles does a breath take to pass through a bird's respiratory system? | Two inspirations and two expirations.
M1#veterinary-u02-09-q1@1: How many air sacs does a chicken usually have? | Nine | Two | Four | Twelve | Most domestic birds have nine: paired cervical, a single clavicular, and paired cranial thoracic, caudal thoracic and abdominal sacs.
M2#veterinary-u02-09-q2@2: Where does most inhaled air go during a bird's first inspiration? | To the caudal air sacs | Directly into the parabronchi | To the cranial air sacs | Into the pneumatic bones only | Most fresh air passes to the caudal sacs and is pushed through the lung on the following expiration.
SEQ2#veterinary-u02-09-q3@2: Put the path of one breath through a bird's respiratory system in order. | Trachea and primary bronchus ; Caudal air sacs ; Parabronchi of the lung ; Cranial air sacs ; Trachea on the way out | The breath reaches the caudal sacs on the first inspiration, crosses the lung on the first expiration, enters the cranial sacs on the second inspiration and leaves on the second expiration.
M3#veterinary-u02-09-q4@1,3: Why can a pet parrot die within minutes in a kitchen where a non-stick pan has overheated? | Its highly efficient one-way respiratory system rapidly absorbs the toxic fumes | Birds have no sense of smell, so they cannot avoid the fumes | Fumes block the bird's diaphragm | The fumes destroy feathers, causing hypothermia | Efficient, unidirectional ventilation and cross-current exchange mean inhaled toxins such as overheated PTFE fumes are absorbed fast; birds have no diaphragm at all.
SA3#veterinary-u02-09-q5@2,3: Explain why a bird's respiratory system is more efficient than a mammal's, and one clinical consequence. | In birds the lung is rigid and air sacs act as bellows, so fresh air flows one way through the parabronchi during both inspiration and expiration; there is no tidal mixing of fresh and stale air in the exchange surface as in mammalian alveoli. Blood crosses the parabronchi in a cross-current arrangement, so arterial PO₂ can exceed that of expired air. The blood–gas barrier is very thin. A consequence is rapid uptake of inhaled toxins and anaesthetics: overheated PTFE fumes can kill quickly, and inhalant anaesthetic depth changes fast. Restraint that stops keel movement prevents ventilation because there is no diaphragm. | Rigid lung and air-sac bellows ; Unidirectional flow without tidal mixing ; Cross-current exchange ; Thin blood–gas barrier ; A correct clinical consequence

## Rumen fermentation and volatile fatty acids
LV: Preclinical · Application
S: A ruminant feeds its microbes, and its microbes feed it. This lesson explains the rumen environment, the microbes that live there, how carbohydrates become volatile fatty acids and methane, how microbial protein is made, and the disorders that follow when diet upsets the rumen: acidosis, bloat and milk fat depression.
O: Describe the rumen environment, its microbial populations and the roles of saliva, rumination and eructation
O: Explain how fibre and starch are fermented to volatile fatty acids and methane, and how dietary protein and non-protein nitrogen become microbial protein
O: Apply rumen physiology to explain rumen acidosis, frothy and free-gas bloat, urea toxicity and milk fat depression
PRE: The ruminant stomach
H: The rumen environment
P: The rumen is a continuous, warm (about 39 °C), anaerobic fermentation vat. Its pH is usually about 6–7 on forage, lower on high-starch diets. It holds a dense community of **bacteria**, **protozoa**, **fungi** and **methanogenic archaea**; together they digest cellulose, which no mammal can digest with its own enzymes.
- **Saliva**: a cow produces over 100 litres a day, rich in bicarbonate and phosphate, buffering the acids of fermentation. Long fibre stimulates chewing and so saliva.
- **Rumination**: boluses of coarse digesta are regurgitated, re-chewed and re-swallowed ("chewing the cud"), reducing particle size so microbes can attack them.
- **Contractions**: primary (mixing) cycles roughly one to two times a minute and secondary (eructation) cycles move gas to the cardia so it can be belched.
H: Fermentation products
P: Microbes break carbohydrates into sugars and ferment them to **volatile fatty acids** (VFAs) plus CO₂ and methane. VFAs are absorbed through the rumen papillae and supply the ruminant with most of its energy, roughly 70% in cattle.
- **Acetate**: the main VFA on forage diets; used for energy and for milk fat synthesis in the udder.
- **Propionate**: increased by starch; the main substrate for **gluconeogenesis** in the liver, because a ruminant absorbs very little glucose from its gut.
- **Butyrate**: largely converted to β-hydroxybutyrate by the rumen wall; stimulates papilla growth.
E: Typical molar proportions on forage: acetate ≈ 65–70%, propionate ≈ 15–20%, butyrate ≈ 10–15% :: concentrates shift the balance towards propionate
P: Methane is the main sink for hydrogen; it is energy lost to the animal (a few per cent of gross energy intake) and a greenhouse gas. Microbes also **biohydrogenate** unsaturated dietary fats, so ruminant meat and milk fats are more saturated than the diet.
H: Nitrogen
P: Dietary protein is partly degraded to peptides, amino acids and **ammonia**, which microbes use to make **microbial protein**. Microbes leaving the rumen are digested in the abomasum and small intestine and supply most of the ruminant's amino acids. Non-protein nitrogen such as **urea** can be converted to ammonia and used, provided energy is available for microbial growth; the liver recycles urea back to the rumen in saliva and across the rumen wall. Too much urea, too fast, overwhelms the liver and causes **ammonia toxicity**.
X: A group of beef cattle break into a store and eat a large quantity of wheat. Two days later several are depressed, with diarrhoea, dehydration and lameness. Explain.
> Rapid fermentation of starch produces VFAs faster than they can be absorbed and buffered, so rumen pH falls.
> Below about pH 5.5, lactate-producing bacteria (*Streptococcus bovis*, then lactobacilli) multiply, and lactic acid, a stronger acid, accumulates: **acute rumen acidosis** (grain overload).
> Lactic acid raises rumen osmolality, drawing water into the rumen (dehydration); it is absorbed, causing systemic acidosis; the damaged rumen wall lets bacteria and toxins escape, leading to liver abscesses and laminitis. Affected animals need urgent veterinary attention.
K: Rumen microbes turn fibre into acetate and starch into propionate; saliva buffers the acids. Sudden starch overload drops the pH, favours lactic acid producers and causes rumen acidosis.
H: Other disorders
- **Frothy bloat**: on lush legume pasture (clover, lucerne), soluble proteins create a stable foam that traps gas so it cannot be belched; the left flank distends. **Free-gas bloat** occurs when eructation is physically blocked, for example by an oesophageal obstruction.
- **Subacute ruminal acidosis** (SARA) in dairy herds causes reduced intake, loose faeces and lameness.
- **Milk fat depression**: low-fibre, high-starch diets, or unsaturated fats, alter biohydrogenation so intermediate fatty acids that inhibit milk fat synthesis reach the udder.
!: Thinking cattle absorb glucose like dogs. Very little dietary carbohydrate reaches the small intestine as glucose; the ruminant depends on hepatic gluconeogenesis from propionate, which is why energy shortage around calving leads to ketosis.
EV: established | Volatile fatty acids from microbial fermentation supply the majority of the energy absorbed by ruminants.
EV: contested | The best dietary and additive strategies to reduce enteric methane from cattle without harming productivity or welfare are under active research, and their long-term effects are uncertain.
T: Volatile fatty acids | Short-chain fatty acids (acetate, propionate, butyrate) produced by microbial fermentation and absorbed as the ruminant's main energy source
T: Rumination | Regurgitation, re-chewing and re-swallowing of digesta
T: Microbial protein | Protein synthesised by rumen microbes, digested lower in the tract as the ruminant's main amino acid supply
SUM: The rumen is an anaerobic, buffered vat whose microbes ferment carbohydrates to VFAs (acetate, propionate, butyrate), CO₂ and methane, and make microbial protein from ammonia.
SUM: Diet changes the fermentation: starch overload causes acidosis, legumes frothy bloat, low fibre milk fat depression, and excess urea ammonia toxicity.
SRC: Bergman E. N., "Energy contributions of volatile fatty acids from the gastrointestinal tract in various species", Physiological Reviews 70(2):567–590 | primary | 1990 | https://doi.org/10.1152/physrev.1990.70.2.567
SRC: Van Soest P. J., Nutritional Ecology of the Ruminant, 2nd edn, Cornell University Press | secondary | 1994
Q: Which volatile fatty acid is the main glucose precursor in ruminants? | Propionate, converted to glucose by gluconeogenesis in the liver.
Q: What causes frothy bloat? | Soluble proteins from lush legumes form a stable foam in the rumen that traps fermentation gas, so it cannot be belched.
M1#veterinary-u02-10-q1@1: Which volatile fatty acid predominates in the rumen on a forage diet? | Acetate | Propionate | Butyrate | Lactate | Acetate makes up most of the VFA on forage diets; propionate rises with starch; lactate is not normally a major product.
M2#veterinary-u02-10-q2@3: A dairy cow fed a high-concentrate, low-fibre ration produces milk with a low fat percentage. Which is the best explanation? | Altered fermentation and biohydrogenation produce intermediates that inhibit milk fat synthesis | Too much acetate is reaching the udder | The cow is absorbing glucose directly from the rumen | Saliva production has risen, diluting the milk | Low-fibre, high-starch rations lower rumen pH and change biohydrogenation pathways, producing fatty acid intermediates that suppress fat synthesis in the mammary gland.
TF2#veterinary-u02-10-q3@2: Ruminants can use urea as a nitrogen source because rumen microbes convert its ammonia into microbial protein. | true | Microbes need ammonia and energy to grow, so urea can replace some protein, though excess causes ammonia toxicity.
M3#veterinary-u02-10-q4@2,3: Why does acute grain overload cause dehydration as well as acidosis? | Accumulated lactic acid and glucose raise rumen osmolality, drawing body water into the rumen | Lactic acid stops the kidneys conserving water | Grain absorbs water in the rumen and the cow stops drinking | Methane production causes water loss through the lungs | High rumen osmolality pulls water from the circulation into the rumen, so the animal dehydrates even though fluid is in its gut.
SA3#veterinary-u02-10-q5@2,3: Explain how a sudden change from forage to a high-starch diet can cause rumen acidosis, and the systemic consequences. | On forage, fermentation is slow, producing mostly acetate, and saliva from chewing buffers the acids. Sudden starch is fermented rapidly; VFAs accumulate faster than they are absorbed and buffered, and less chewing reduces saliva. As pH falls below about 5.5, lactate producers such as Streptococcus bovis and lactobacilli proliferate; lactic acid accumulates and pH falls further, killing fibre-digesting microbes. Rumen osmolality rises, drawing water in and dehydrating the animal; lactate absorption causes systemic acidosis; the damaged rumen wall lets bacteria reach the liver (abscesses), and endotoxins and other mediators contribute to laminitis. | Rapid fermentation outpaces absorption and buffering ; Reduced saliva ; Lactate producers proliferate below pH 5.5 ; Dehydration from osmotic effect ; Systemic acidosis, liver abscesses or laminitis

## Monogastric and hindgut digestion
LV: Preclinical · Application
S: Dogs, cats and pigs digest mainly with their own enzymes, horses and rabbits rely on microbes in the hindgut, and the cat has metabolic needs that make it a true carnivore. This lesson compares enzymatic and fermentative digestion, the cat's special requirements, starch overload in the horse and caecotrophy in the rabbit.
O: Describe enzymatic digestion and absorption of carbohydrate, protein and fat in the stomach and small intestine
O: Explain the metabolic adaptations that make the cat an obligate carnivore
O: Apply hindgut physiology to starch overload in the horse and caecotrophy in the rabbit
PRE: Rumen fermentation and volatile fatty acids
H: Enzymatic digestion
- **Stomach**: hydrochloric acid from parietal cells denatures protein and kills microbes; **pepsin** begins protein digestion. Dogs and cats have little or no salivary amylase, so starch digestion begins mainly in the small intestine.
- **Pancreas**: secretes bicarbonate to neutralise acid, and enzymes: amylase, lipase and proteases (trypsin, chymotrypsin) released as inactive precursors and activated in the duodenum.
- **Liver**: bile salts emulsify fat so lipase can act, and form micelles that carry fatty acids and fat-soluble vitamins to the enterocytes.
- **Brush border**: disaccharidases (maltase, sucrase, lactase) and peptidases finish digestion; sugars and amino acids are absorbed by sodium-linked transport, which is why oral rehydration solutions contain glucose and sodium.
P: In **exocrine pancreatic insufficiency** (EPI), common in German Shepherd dogs from pancreatic acinar atrophy, too few enzymes are secreted; the dog loses weight despite a ravenous appetite and passes large volumes of pale, fatty faeces. Lactase activity declines after weaning in many animals, so large amounts of cow's milk can cause diarrhoea in adult dogs and cats.
H: The cat as an obligate carnivore
- High **protein** requirement, because the liver's enzymes for breaking down amino acids for gluconeogenesis stay active all the time, even on a low-protein diet.
- Requires **taurine** in the diet: cats conjugate bile acids only with taurine and synthesise little; deficiency causes retinal degeneration and dilated cardiomyopathy.
- Requires **arginine**: a single meal lacking it can cause hyperammonaemia, because arginine is needed for the urea cycle.
- Requires preformed **vitamin A** (cannot convert β-carotene), **arachidonic acid** and **niacin**.
- Limited **glucuronidation** in the liver, so drugs such as paracetamol are dangerous to cats (see School 7).
X: In the 1970s and 1980s cats fed some commercial diets developed blindness and heart failure. What was the link?
> Hayes and colleagues (1975) linked feline central retinal degeneration to taurine deficiency.
> Pion and colleagues (1987) showed that dilated cardiomyopathy in cats was associated with low plasma taurine and could be reversed by supplementation.
> Manufacturers raised taurine levels in cat foods, and taurine-deficient cardiomyopathy became rare: a clear example of physiology changing practice.
K: Cats need dietary taurine, arginine, preformed vitamin A, arachidonic acid and niacin, and a high protein intake; they are obligate carnivores, not small dogs.
H: Hindgut fermenters
P: The **horse** digests starch and protein enzymatically in the small intestine and ferments fibre in the caecum and colon, absorbing VFAs there. Its small-intestinal capacity to digest starch is limited. A large starch meal overflows to the hindgut, where rapid fermentation produces lactic acid; hindgut pH falls, bacteria die and release endotoxin, and the gut wall becomes leaky, which is one recognised route to colic and **laminitis**. Feeding little and often, and keeping starch per meal low, protects the hindgut.
P: The **rabbit** separates digesta in the proximal colon: large fibre particles pass out as hard faecal pellets, while fluid and small particles are returned to the caecum and fermented. The caecum then produces soft **caecotrophs**, rich in microbial protein and B vitamins, which the rabbit eats directly from the anus, usually at night (**caecotrophy**). A rabbit that cannot reach its anus (obesity, dental or spinal disease) or is fed too little fibre develops caecal dysbiosis and gut stasis.
!: Thinking a rabbit eating its droppings is abnormal. Caecotrophy is essential for its nutrition; a build-up of uneaten caecotrophs around the tail is the abnormal sign, and suggests the rabbit cannot reach or is overproducing them.
EV: established | Taurine deficiency causes retinal degeneration and dilated cardiomyopathy in cats, and dietary taurine prevents them.
EV: contested | The role of grain-free and pulse-rich diets in a form of dilated cardiomyopathy reported in some dogs is unresolved; investigations have not established a cause.
T: Obligate carnivore | An animal that must eat animal tissue to meet nutrient needs it cannot synthesise, such as the cat's need for taurine and preformed vitamin A
T: Caecotrophy | The rabbit's re-ingestion of soft, nutrient-rich caecotrophs produced by caecal fermentation
T: Exocrine pancreatic insufficiency | Inadequate secretion of digestive enzymes by the pancreas, causing maldigestion
SUM: Monogastric digestion uses acid, pepsin, pancreatic enzymes, bile and brush-border enzymes; EPI in German Shepherds shows what follows when enzymes fail.
SUM: The cat needs taurine, arginine, vitamin A, arachidonic acid, niacin and much protein; horses ferment fibre in the hindgut and suffer when starch overflows; rabbits depend on caecotrophy.
SRC: Pion P. D., Kittleson M. D., Rogers Q. R. & Morris J. G., "Myocardial failure in cats associated with low plasma taurine: a reversible cardiomyopathy", Science 237(4816):764–768 | primary | 1987 | https://doi.org/10.1126/science.3616607
SRC: National Research Council, Nutrient Requirements of Dogs and Cats, National Academies Press | standard | 2006
Q: Why do cats need dietary taurine? | They synthesise little taurine and use it to conjugate bile acids; deficiency causes retinal degeneration and dilated cardiomyopathy.
Q: What are caecotrophs? | Soft faecal pellets from caecal fermentation, rich in microbial protein and B vitamins, which rabbits eat directly from the anus.
M1#veterinary-u02-11-q1@1: Where are the brush-border enzymes that complete carbohydrate digestion found? | On the surface of the small intestinal enterocytes | In the parietal cells of the stomach | In the pancreatic acini | In the bile canaliculi | Disaccharidases such as maltase and lactase are on the brush border of small intestinal cells.
M2#veterinary-u02-11-q2@3: A two-year-old German Shepherd has lost weight despite eating ravenously and passes large amounts of pale, greasy faeces. What is the most likely explanation? | Exocrine pancreatic insufficiency causing maldigestion | Excess bile acid secretion | Hyperthyroidism | Overproduction of gastric acid | Weight loss with polyphagia and voluminous, pale, fatty faeces in a young German Shepherd suggests pancreatic acinar atrophy and EPI.
MS2#veterinary-u02-11-q3@2: Which nutrients must a cat obtain from its diet? | Taurine ; Arginine ; Preformed vitamin A | Glucose ; Vitamin C | Cats cannot make enough taurine or arginine or convert β-carotene to vitamin A. They make their own glucose by gluconeogenesis and synthesise vitamin C.
M3#veterinary-u02-11-q4@1,3: Why can a large meal of cereal concentrate trigger laminitis in a horse? | Starch exceeds small-intestinal digestion, is fermented in the hindgut to lactic acid, and the damaged gut releases endotoxin and other mediators | The horse absorbs too much glucose, which crystallises in the hoof | Concentrate blocks the pelvic flexure, cutting blood flow to the feet | The horse's stomach ferments the starch to methane, which reaches the laminae | Starch overflow to the hindgut causes rapid fermentation, acidosis, bacterial death and a leaky gut wall; these are linked to laminitis.
SA3#veterinary-u02-11-q5@2,3: Explain why a rabbit fed a low-fibre diet, or unable to groom its rear end, is at risk of digestive disease. | The rabbit separates digesta in the proximal colon: indigestible long fibre leaves as hard pellets, and fine material returns to the caecum for fermentation. Fibre drives gut motility and this separation. The caecum produces caecotrophs rich in protein and B vitamins, which the rabbit eats from the anus. Low fibre slows motility and favours abnormal caecal fermentation (dysbiosis), leading to gut stasis and possibly enterotoxaemia. A rabbit that cannot reach its anus (obesity, dental or spinal pain) cannot eat caecotrophs, losing nutrients and accumulating soiling that risks fly strike. | Colonic separation mechanism ; Fibre maintains motility ; Caecotrophs and caecotrophy ; Low fibre causes dysbiosis and stasis ; Inability to reach the anus and its consequences

## Thermoregulation
LV: Preclinical · Application
S: Mammals and birds hold their core temperature within narrow limits by balancing heat production and heat loss. This lesson covers the hypothalamic control of temperature, the routes of heat loss and the species strategies of sweating, panting, wallowing and selective brain cooling, then distinguishes fever from heatstroke and covers neonatal hypothermia.
O: Describe how the hypothalamus regulates body temperature and the four routes of heat exchange
O: Compare the strategies used by dogs, cats, horses, cattle, pigs and birds to lose and conserve heat
O: Distinguish fever from hyperthermia and apply thermoregulation to heatstroke and neonatal hypothermia
PRE: The autonomic nervous system
H: Control
P: The **preoptic area of the hypothalamus** integrates signals from central and skin thermoreceptors and compares them with a set point. When the animal is too warm, it increases skin blood flow, sweating or panting and seeks shade; when too cold, it constricts skin vessels, raises its coat (piloerection), shivers, increases non-shivering thermogenesis (brown fat, especially in neonates) and huddles or shelters. The range of environmental temperature over which an animal needs no extra energy to stay warm or cool is its **thermoneutral zone**.
- Heat is exchanged by **radiation**, **conduction**, **convection** and **evaporation**. Only evaporation removes heat when the air is hotter than the body, and it fails when humidity is high.
- Approximate normal rectal temperatures: dog 38.3–39.2 °C, cat 38.0–39.2 °C, horse 37.5–38.5 °C, cattle about 38.0–39.0 °C, sheep about 38.5–40.0 °C, pig about 38.5–39.5 °C; birds are higher, around 41 °C. Exercise, excitement and hot weather raise them.
H: Species strategies
- **Dog**: pants, evaporating water from the tongue, nasal mucosa and upper airway; shallow, rapid panting moves air over these surfaces with little extra alveolar ventilation. Footpad sweat glands play a minor role.
- **Cat**: pants less readily; grooms saliva onto its coat; open-mouth breathing in a cat is a warning sign.
- **Horse**: sweats profusely; a horse in hard work can lose many litres of sweat an hour, with large losses of electrolytes.
- **Cattle**: sweat moderately and pant; high-yielding dairy cows produce much metabolic heat and suffer **heat stress** at quite moderate temperatures, measured with a temperature–humidity index.
- **Pig**: has few functional sweat glands and wallows; housed pigs need cooling such as sprinklers.
- **Birds**: no sweat glands; they pant and use **gular flutter** (fast vibration of the throat).
- **Selective brain cooling**: in cats, sheep and cattle a **carotid rete**, a network of arteries bathed in venous blood cooled in the nose, cools the blood reaching the brain during heat or exercise.
H: Fever and heatstroke
P: In **fever**, pyrogens (bacterial products, and the cytokines IL-1, IL-6 and TNF) cause the hypothalamus to make **prostaglandin E2**, which raises the set point: the animal feels cold, shivers and conserves heat until its temperature reaches the new set point. NSAIDs lower fever by blocking prostaglandin synthesis. In **hyperthermia**, the set point is normal but heat gain overwhelms heat loss, as in heatstroke, exercise in hot weather or malignant hyperthermia; antipyretic drugs do not help, and active cooling does.
X: A bulldog collapses after a walk on a hot, humid day with a rectal temperature far above normal. Explain the physiology.
> Dogs rely on evaporation from the upper airway; a brachycephalic dog's narrowed nostrils, long soft palate and crowded airway reduce this, and the extra work of breathing makes more heat.
> High humidity reduces evaporation, so heat gain exceeds heat loss and core temperature rises without any change in set point: heatstroke.
> At very high temperatures proteins denature, causing multi-organ damage including disseminated intravascular coagulation. This is an emergency: the dog should be cooled and taken to a vet or emergency vet at once.
K: Fever is a raised set point mediated by prostaglandin E2; hyperthermia is heat gain exceeding heat loss with a normal set point. Heatstroke needs cooling and an emergency vet, not antipyretics.
!: Treating a high temperature as fever without asking why. A hot dog after exercise in summer is more likely to be hyperthermic; giving an NSAID will not cool it, and it needs urgent veterinary care.
H: The newborn
P: Neonates have a large surface area for their mass, little fat and a wet coat at birth, so they lose heat fast. Lambs and calves rely on **brown adipose tissue** and shivering, fuelled by colostrum. **Hypothermia** with starvation is a leading cause of death in newborn lambs, especially twins and triplets born outdoors in cold, wet, windy weather; puppies and kittens cannot shiver effectively in the first week and depend on the dam and a warm nest.
EV: established | Brachycephalic dogs are at increased risk of heat-related illness compared with dogs of medium skull shape.
EV: contested | The best method of cooling dogs with heatstroke (for example, cold-water immersion compared with evaporative cooling) is debated, though prompt cooling of some kind is agreed to improve survival.
T: Thermoneutral zone | The range of environmental temperature over which an animal maintains core temperature without extra energy for heat production or loss
T: Fever | A raised hypothalamic set point for body temperature, caused by pyrogens via prostaglandin E2
T: Carotid rete | A network of arteries at the base of the brain, cooled by venous blood from the nose, that cools blood reaching the brain
SUM: The hypothalamus balances heat production and loss by radiation, conduction, convection and evaporation; evaporation alone works when the air is hotter than the body.
SUM: Species cool by panting (dogs), sweating (horses), wallowing (pigs) and gular flutter (birds); fever is a raised set point, heatstroke a failure of heat loss, and neonates are prone to hypothermia.
SRC: Hall E. J., Carter A. J. & O'Neill D. G., "Incidence and risk factors for heat-related illness (heatstroke) in UK dogs under primary veterinary care in 2016", Scientific Reports 10:9128 | primary | 2020
SRC: Reece W. O., Erickson H. H., Goff J. P. & Uemura E. E. (eds), Dukes' Physiology of Domestic Animals, 13th edn, Wiley-Blackwell | secondary | 2015
Q: What is the difference between fever and hyperthermia? | Fever is a raised hypothalamic set point; hyperthermia is a rise in temperature with a normal set point because heat gain exceeds heat loss.
Q: How do pigs lose heat, given their few functional sweat glands? | By wallowing in water or mud and by behavioural cooling; housed pigs need sprinklers or other cooling.
M1#veterinary-u02-12-q1@2: Which species relies mainly on sweating to lose heat during hard exercise? | Horse | Dog | Pig | Chicken | Horses have numerous active sweat glands. Dogs pant, pigs wallow and birds pant and use gular flutter.
M2#veterinary-u02-12-q2@3: A cat has an infection and a raised rectal temperature, and is shivering. Why does it shiver? | Pyrogens have raised the hypothalamic set point, so it senses its body as too cold and generates heat | It is losing too much heat because the infection has damaged its skin | Shivering lowers body temperature by using energy | Its set point has fallen, so it is hypothermic | In fever, prostaglandin E2 resets the hypothalamus higher; until core temperature reaches the new set point the animal shivers and conserves heat.
TF2#veterinary-u02-12-q3@1: Evaporation is the only route by which an animal can lose heat when the environmental temperature is above body temperature. | true | Radiation, conduction and convection then add heat to the animal; only evaporation (sweating, panting) can remove it, and it fails in high humidity.
M3#veterinary-u02-12-q4@1,3: Newborn twin lambs born outdoors on a cold, wet night are weak and cold. Which combination of factors best explains why they are at risk? | A large surface area to mass, a wet coat, limited energy reserves and the need for colostrum to fuel brown fat thermogenesis | They have no brown fat and cannot shiver at all | Their hypothalamic set point is lower than an adult's | They lose heat only by sweating | Neonates lose heat fast and have small energy stores; brown fat and shivering need fuel from colostrum, and twins may get less. Hypothermia with starvation is a major cause of lamb deaths.
SA3#veterinary-u02-12-q5@2,3: Explain why a brachycephalic dog is at greater risk of heatstroke than a dog with a normal muzzle, and why an antipyretic drug would not help. | Dogs lose heat mainly by evaporation from the tongue, nasal mucosa and upper airway during panting. In brachycephalic dogs the narrowed nostrils, elongated soft palate and crowded nasal passages reduce the surface area and airflow for evaporative cooling, and obstructed breathing increases muscular work and heat production; humidity reduces evaporation further. Heat gain then exceeds heat loss and core temperature rises: hyperthermia. The hypothalamic set point is normal, so drugs that lower a prostaglandin-raised set point (antipyretics) have nothing to act on; active cooling and urgent veterinary care are needed. | Dogs cool by evaporation in the upper airway ; Brachycephalic airway reduces evaporative cooling ; Extra work of breathing adds heat ; Hyperthermia with normal set point ; Antipyretics act on set point so do not help

## Renal function and urine concentration
LV: Preclinical · Application
S: The kidneys filter the plasma, reclaim what the body needs and excrete the rest, adjusting water and electrolyte balance minute by minute. This lesson covers glomerular filtration, tubular reabsorption and secretion, the countercurrent mechanism and ADH, and how urine specific gravity and azotaemia are interpreted in dogs and cats.
O: Describe glomerular filtration and the reabsorption and secretion carried out by each part of the nephron
O: Explain how the loop of Henle, the medullary gradient and ADH produce concentrated urine
O: Apply renal physiology to interpret urine specific gravity, glucosuria and azotaemia, and classify azotaemia as prerenal, renal or postrenal
PRE: Homeostasis and body fluids
H: Filtration
P: Each nephron begins with a **glomerulus**, a tuft of capillaries in Bowman's capsule. The **glomerular filtration rate** (GFR) is driven by glomerular capillary pressure, opposed by the pressure in Bowman's space and the oncotic pressure of plasma proteins. The filter holds back cells and most proteins, so the filtrate resembles plasma without protein. GFR is autoregulated over a range of arterial pressures by constriction and dilation of the afferent arteriole and by tubuloglomerular feedback.
H: Along the tubule
- **Proximal tubule**: reabsorbs about two-thirds of filtered sodium and water, and normally all filtered glucose and amino acids, by sodium-linked transport; secretes many drugs.
- **Loop of Henle**: the thin descending limb is permeable to water; the thick ascending limb pumps sodium, potassium and chloride out but is impermeable to water. This builds a concentration gradient in the medullary interstitium (the **countercurrent multiplier**), helped by urea recycling.
- **Distal tubule and collecting duct**: fine adjustment. **Aldosterone** increases sodium reabsorption and potassium secretion; **ADH** inserts aquaporin-2 water channels into the collecting duct, so water leaves into the hypertonic medulla and the urine is concentrated.
IX: kidney
E: Glucose appears in urine when filtered glucose exceeds the tubular transport maximum :: the renal threshold, roughly 10–12 mmol/L in the dog and higher, about 14–16 mmol/L, in the cat
P: The kidney also makes **erythropoietin**, **renin** and active vitamin D (**calcitriol**), and excretes acid (see Acid–base balance).
H: Interpreting urine and blood
P: **Urine specific gravity** (USG) measures concentration. A healthy dehydrated dog should produce urine above about 1.030 and a cat above about 1.035; cats, descended from desert-dwelling ancestors, concentrate urine very efficiently. Urine of 1.008–1.012, the same as filtrate, is **isosthenuric**: the kidney is neither concentrating nor diluting. A sample is interpreted with the animal's hydration and any drugs (diuretics, corticosteroids) in mind.
- **Azotaemia** is a raised blood urea and creatinine. **Prerenal**: reduced renal perfusion (dehydration, shock) with concentrated urine. **Renal**: loss of functioning nephrons, with inadequately concentrated urine. **Postrenal**: obstruction or rupture of the urinary tract.
- About two-thirds of nephrons are lost before concentrating ability fails, and about three-quarters before azotaemia appears, so kidney disease is advanced by the time creatinine rises; symmetric dimethylarginine (SDMA) may rise earlier.
X: A dehydrated, vomiting dog has raised urea and creatinine. Its USG is 1.010. How is the azotaemia classified?
> Dehydration should make healthy kidneys concentrate urine well above 1.030.
> Isosthenuric urine in a dehydrated, azotaemic dog means the kidneys cannot concentrate: the azotaemia has a renal component.
> Had the USG been 1.045, a prerenal cause would be likely. The vet would still check for obstruction (postrenal), drugs and conditions such as hypoadrenocorticism that can impair concentration without kidney disease.
K: Concentrated urine with azotaemia suggests prerenal causes; inadequately concentrated urine with azotaemia in a dehydrated animal suggests renal disease; obstruction or rupture is postrenal.
!: Interpreting urea and creatinine without a urine specific gravity taken before fluids are given. Fluid therapy dilutes the urine, so a sample after treatment can mislead.
EV: established | Loss of urine-concentrating ability precedes azotaemia in progressive kidney disease, which becomes evident in blood tests only after most nephron function is lost.
EV: contested | How much SDMA adds to creatinine for early detection and staging of chronic kidney disease in dogs and cats, and how it should change management, is still being evaluated.
T: Glomerular filtration rate | The volume of plasma filtered by all the glomeruli per unit time
T: Isosthenuria | Urine with the same specific gravity as glomerular filtrate (about 1.008–1.012)
T: Azotaemia | Raised blood concentrations of urea and creatinine
SUM: The glomerulus filters plasma; the proximal tubule reclaims most sodium, water and all glucose; the loop builds a medullary gradient; ADH and aldosterone fine-tune water and sodium.
SUM: USG with blood urea and creatinine classifies azotaemia as prerenal, renal or postrenal; kidney disease is advanced before azotaemia appears.
SRC: International Renal Interest Society, IRIS Staging of CKD | guidance | 2023 | https://www.iris-kidney.com/
SRC: Elliott J., Grauer G. F. & Westropp J. L. (eds), BSAVA Manual of Canine and Feline Nephrology and Urology, 3rd edn, British Small Animal Veterinary Association | secondary | 2017
Q: What does ADH do in the kidney? | Inserts aquaporin-2 water channels into the collecting duct so water is reabsorbed into the hypertonic medulla, concentrating urine.
Q: What urine specific gravity range is isosthenuric? | About 1.008 to 1.012, the same as glomerular filtrate.
M1#veterinary-u02-13-q1@1: Which part of the nephron reabsorbs most of the filtered sodium and water? | The proximal tubule | The thick ascending limb of the loop of Henle | The collecting duct | The glomerulus | About two-thirds of filtered sodium and water are reabsorbed in the proximal tubule; the collecting duct makes fine adjustments.
M2#veterinary-u02-13-q2@2: Why does glucose appear in the urine of a diabetic cat? | Plasma glucose is so high that filtered glucose exceeds the proximal tubule's transport maximum | Insulin deficiency damages the glomerular filter | ADH stops glucose reabsorption | The collecting duct secretes glucose | Glucosuria occurs when the filtered load exceeds the tubular maximum; the feline renal threshold is higher than the dog's.
TF1#veterinary-u02-13-q3@3: About two-thirds of nephrons must be lost before an animal loses the ability to concentrate its urine. | true | Kidney reserve is large; concentrating ability fails at about two-thirds loss and azotaemia appears at about three-quarters.
M3#veterinary-u02-13-q4@3: A dehydrated cat has raised urea and creatinine and a USG of 1.050. Which interpretation is best? | Prerenal azotaemia is likely, because the kidneys are concentrating urine well | Chronic kidney disease is confirmed | The cat has postrenal obstruction | The USG is irrelevant to the classification | Well-concentrated urine shows the kidneys can respond; azotaemia here most likely reflects reduced renal perfusion from dehydration, to be confirmed by response to rehydration.
SA3#veterinary-u02-13-q5@2,3: Explain how the loop of Henle and ADH allow a dehydrated dog to produce concentrated urine. | The thick ascending limb actively pumps sodium, potassium and chloride into the interstitium but is impermeable to water, while the descending limb is permeable to water; the counterflow multiplies a small gradient into a large osmotic gradient from cortex to inner medulla, helped by urea recycling, and the vasa recta preserve it. In dehydration, raised plasma osmolality and reduced volume trigger ADH release from the posterior pituitary. ADH inserts aquaporin-2 channels into collecting duct cells, so as tubular fluid passes through the hypertonic medulla water leaves it, and small volumes of concentrated urine are produced. | Ascending limb pumps salt, impermeable to water ; Countercurrent multiplication and gradient ; Urea recycling or vasa recta ; ADH release triggered by osmolality or volume ; Aquaporin-2 in collecting duct

## Acid–base balance
LV: Preclinical · Application
S: Enzymes work only within a narrow pH range, so the body buffers acid, breathes off carbon dioxide and excretes acid in urine. This lesson explains the bicarbonate buffer system, the four primary acid–base disorders and compensation, and the disorders vets see most often, from calf diarrhoea to the cow with an abomasal displacement.
O: Explain the bicarbonate buffer system and the roles of the lungs and kidneys in acid–base balance
O: Identify metabolic and respiratory acidosis and alkalosis and their compensation from blood gas values
O: Apply acid–base physiology to common veterinary conditions, including diarrhoea, vomiting, abomasal displacement and urethral obstruction
PRE: Renal function and urine concentration
H: Buffers and regulation
P: Normal arterial pH is about 7.35–7.45. Metabolism produces large amounts of CO₂ (volatile acid) and smaller amounts of fixed acids. The main extracellular buffer is bicarbonate:
E: CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻ :: the reaction is speeded by carbonic anhydrase
E: pH = 6.1 + log₁₀ ( [HCO₃⁻] / (0.03 × PCO₂) ) :: the Henderson–Hasselbalch equation, with HCO₃⁻ in mmol/L and PCO₂ in mmHg
P: The **lungs** control PCO₂ (in minutes), and the **kidneys** control bicarbonate by reclaiming filtered bicarbonate and excreting acid as ammonium and phosphate (over hours to days). Haemoglobin, proteins and phosphate are other buffers.
H: The four primary disorders
- **Metabolic acidosis**: low HCO₃⁻; compensated by hyperventilation lowering PCO₂.
- **Metabolic alkalosis**: high HCO₃⁻; compensated by hypoventilation raising PCO₂.
- **Respiratory acidosis**: high PCO₂ from hypoventilation; compensated over days by renal bicarbonate retention.
- **Respiratory alkalosis**: low PCO₂ from hyperventilation (pain, anxiety, hypoxaemia, heat); compensated by renal bicarbonate loss.
P: Compensation moves the pH back towards normal but rarely all the way; overcompensation does not occur. Mixed disorders are common in sick animals. The **anion gap** (Na⁺ + K⁺ − Cl⁻ − HCO₃⁻) helps classify metabolic acidosis: it rises when unmeasured acids such as lactate, ketones or uraemic acids accumulate.
X: A calf with diarrhoea has a venous pH of 7.15, PCO₂ 35 mmHg and HCO₃⁻ 12 mmol/L (illustrative values). Interpret it.
> pH is low: acidaemia.
> HCO₃⁻ is low, so the primary process is metabolic acidosis; PCO₂ is slightly low, showing partial respiratory compensation.
> In diarrhoeic calves the acidosis comes from loss of bicarbonate in faeces, D-lactate from colonic fermentation and poor tissue perfusion; it causes depression and a weak suck reflex, which is why fluid and alkalinising therapy is planned by the vet from the calf's clinical signs and, where possible, blood gas results.
K: Read the pH first, then decide whether HCO₃⁻ (metabolic) or PCO₂ (respiratory) explains it; the other value shows compensation.
H: Veterinary examples
- **Vomiting of gastric contents** (pyloric obstruction in a dog) and **abomasal displacement or volvulus** in cattle sequester or lose hydrochloric acid, causing **hypochloraemic metabolic alkalosis**, often with hypokalaemia. Cattle with abomasal outflow obstruction can produce acidic urine despite alkalaemia (paradoxical aciduria), because the kidney retains sodium in exchange for hydrogen ions when chloride is depleted.
- **Acute rumen acidosis**, **diabetic ketoacidosis** and **shock** (lactic acidosis) cause metabolic acidosis with a high anion gap.
- **Urethral obstruction** in a male cat causes metabolic acidosis with hyperkalaemia because the kidney cannot excrete acid or potassium.
- **Anaesthesia** depresses breathing, causing respiratory acidosis; a **panting** dog may develop respiratory alkalosis.
!: Expecting vomiting always to cause alkalosis. Loss of gastric acid alone does, but many vomiting dogs also lose duodenal bicarbonate, become dehydrated and produce lactate, and are acidotic.
EV: established | Abomasal displacement and volvulus in cattle are characteristically associated with hypochloraemic, hypokalaemic metabolic alkalosis.
EV: contested | Whether the traditional bicarbonate approach or Stewart's strong ion approach better explains and guides treatment of acid–base disorders is debated; both are used in veterinary medicine.
T: Compensation | The secondary change in the other system (respiratory or renal) that moves pH back towards normal
T: Anion gap | The difference between measured cations and anions (Na⁺ + K⁺ − Cl⁻ − HCO₃⁻), raised when unmeasured acids accumulate
T: Paradoxical aciduria | Acidic urine in an animal with metabolic alkalosis, from chloride depletion forcing sodium–hydrogen exchange
SUM: The bicarbonate buffer links pH to HCO₃⁻ and PCO₂; the lungs adjust PCO₂ in minutes and the kidneys HCO₃⁻ over days.
SUM: Metabolic and respiratory acidosis and alkalosis are identified from pH, HCO₃⁻ and PCO₂; diarrhoea causes acidosis, loss of gastric or abomasal acid causes alkalosis.
SRC: DiBartola S. P. (ed.), Fluid, Electrolyte, and Acid–Base Disorders in Small Animal Practice, 4th edn, Elsevier Saunders | secondary | 2012
SRC: Stewart P. A., "Modern quantitative acid–base chemistry", Canadian Journal of Physiology and Pharmacology 61(12):1444–1461 | primary | 1983 | https://doi.org/10.1139/y83-207
Q: Which organ controls PCO₂, and which controls bicarbonate? | The lungs control PCO₂ (minutes); the kidneys control bicarbonate (hours to days).
Q: What acid–base disturbance is typical of abomasal displacement in cattle? | Hypochloraemic, hypokalaemic metabolic alkalosis.
M1#veterinary-u02-14-q1@1: What is the main extracellular buffer system? | The bicarbonate–carbonic acid system | The phosphate system | Haemoglobin | Plasma albumin | Bicarbonate is the main ECF buffer, and it is open: the lungs adjust CO₂ and the kidneys HCO₃⁻.
M2#veterinary-u02-14-q2@2: A dog's blood gas shows pH 7.30, PCO₂ 60 mmHg and HCO₃⁻ 28 mmol/L under anaesthesia (illustrative values). What is the primary disorder? | Respiratory acidosis | Metabolic acidosis | Metabolic alkalosis | Respiratory alkalosis | Low pH with high PCO₂ is respiratory acidosis from hypoventilation; the slightly raised bicarbonate is a small acute buffering change.
M2#veterinary-u02-14-q3@3: A male cat has been unable to urinate for two days. Which acid–base and electrolyte pattern is most likely? | Metabolic acidosis with hyperkalaemia | Metabolic alkalosis with hypokalaemia | Respiratory alkalosis with hypokalaemia | A normal acid–base status | Obstruction prevents excretion of acid and potassium, so metabolic acidosis and hyperkalaemia develop, both dangerous.
TF2#veterinary-u02-14-q4@2: Respiratory compensation for metabolic acidosis lowers PCO₂ by increasing ventilation. | true | Hyperventilation removes CO₂, raising the HCO₃⁻ to PCO₂ ratio and pH towards normal.
M3#veterinary-u02-14-q5@1,3: A dairy cow with a right abomasal volvulus has metabolic alkalosis but acidic urine. Which explanation is best? | Chloride depletion forces the kidney to reabsorb sodium in exchange for hydrogen ions, acidifying the urine | The kidney is failing, so it cannot excrete bicarbonate | Rumen acidosis is producing acid that is excreted in urine | Hyperventilation is acidifying the urine | Hydrochloric acid is sequestered in the abomasum, leaving the cow hypochloraemic and hypokalaemic; to conserve sodium without chloride the kidney excretes hydrogen and potassium, the paradoxical aciduria.
SA3#veterinary-u02-14-q6@2,3: A vomiting dog has a pH of 7.52, HCO₃⁻ 34 mmol/L and PCO₂ 46 mmHg (illustrative values). Interpret these values and explain a likely cause. | pH is high: alkalaemia. HCO₃⁻ is high, so the primary disorder is metabolic alkalosis; PCO₂ is mildly raised, showing respiratory compensation by hypoventilation. A likely cause is loss of gastric hydrochloric acid by vomiting, as with a pyloric or upper intestinal obstruction, producing hypochloraemic metabolic alkalosis, often with hypokalaemia; volume depletion and chloride depletion make the kidney retain bicarbonate and perpetuate it. | Identifies alkalaemia ; Primary metabolic alkalosis from raised bicarbonate ; Respiratory compensation from raised PCO₂ ; Loss of gastric HCl as cause ; Hypochloraemia or hypokalaemia and renal maintenance

## The hypothalamus and pituitary
LV: Preclinical · Application
S: The hypothalamus links the nervous system to the endocrine system through the pituitary gland. This lesson covers the hypothalamic releasing hormones, the hormones of the anterior pituitary, pars intermedia and posterior pituitary, negative feedback, and the pituitary diseases of dogs, cats and horses.
O: Describe the anatomical and functional links between the hypothalamus and the anterior and posterior pituitary
O: Name the hormones of the pituitary, their targets and their control by negative feedback
O: Apply this physiology to pituitary-dependent hyperadrenocorticism, feline acromegaly, central diabetes insipidus and equine pituitary pars intermedia dysfunction
PRE: The autonomic nervous system
H: Two connections
P: The **posterior pituitary** (neurohypophysis) is an extension of the brain: neurones in the hypothalamus make **ADH** (vasopressin) and **oxytocin**, which travel down their axons and are released into the blood. The **anterior pituitary** (adenohypophysis) is glandular tissue, controlled by **releasing and inhibiting hormones** carried from the hypothalamus in the **hypophyseal portal veins**. Between them, the **pars intermedia** produces melanocyte-stimulating hormone (MSH) and other products of pro-opiomelanocortin (POMC), under inhibitory control by dopamine neurones.
H: The hormones
- **TRH → TSH** → thyroid (thyroxine).
- **CRH → ACTH** → adrenal cortex (cortisol).
- **GnRH → FSH and LH** → gonads (oestrogen, progesterone, testosterone; ovulation).
- **GHRH → growth hormone** (inhibited by somatostatin) → liver (insulin-like growth factor 1) and tissues.
- **Prolactin**, held down by hypothalamic **dopamine**, → mammary gland (lactation) and maternal behaviour.
- **ADH** → kidney (water retention); **oxytocin** → uterus and myoepithelial cells of the mammary gland (milk let-down).
P: Most axes are governed by **negative feedback**: cortisol inhibits CRH and ACTH, thyroxine inhibits TRH and TSH. Daylength acts on the reproductive axis through **melatonin** from the pineal gland, which is how seasonal breeders time their cycles (see Reproductive cycles in domestic species).
K: The hypothalamus controls the anterior pituitary by hormones in portal blood and releases ADH and oxytocin directly from the posterior pituitary; target-gland hormones feed back to switch the axis off.
H: Pituitary disease
- **Pituitary-dependent hyperadrenocorticism** (Cushing's disease) in dogs: a pituitary tumour secretes excess ACTH, causing bilateral adrenal enlargement and cortisol excess; it accounts for most canine hyperadrenocorticism.
- **Feline acromegaly** (hypersomatotropism): a growth hormone–secreting adenoma causes insulin resistance, so many affected cats present as diabetics needing high insulin doses, with broad faces, enlarged paws and organomegaly.
- **Central diabetes insipidus**: lack of ADH causes large volumes of dilute urine and great thirst.
- **Pituitary dwarfism**, in German Shepherd dogs and related breeds, from a recessive mutation affecting pituitary development (LHX3).
X: An older pony has a long, curly coat that fails to shed, muscle loss along the topline, a pot belly and recurrent laminitis. What is the physiology of pituitary pars intermedia dysfunction (PPID)?
> With age, the dopaminergic neurones from the hypothalamus that inhibit the pars intermedia degenerate.
> Released from inhibition, the pars intermedia enlarges and overproduces POMC-derived peptides, including ACTH and MSH.
> These cause hypertrichosis and the other signs; associated insulin dysregulation increases the risk of laminitis. Treatment with a dopamine agonist replaces the lost inhibition, and is prescribed by a vet.
!: Interpreting an equine ACTH result without the season. ACTH rises normally in autumn in horses and ponies, so reference ranges are seasonal.
EV: established | Equine PPID results from loss of dopaminergic inhibition of the pars intermedia, and ACTH concentrations in normal horses rise seasonally in late summer and autumn.
EV: contested | How best to diagnose early PPID, including the use of the TRH stimulation test and seasonal cut-off values, is still being refined.
T: Hypophyseal portal system | Veins carrying hypothalamic releasing hormones directly to the anterior pituitary
T: Pars intermedia | The middle lobe of the pituitary, producing POMC-derived peptides under dopaminergic inhibition
T: Negative feedback (endocrine) | Inhibition of hypothalamic and pituitary hormone release by the hormones of the target gland
SUM: The hypothalamus controls the anterior pituitary through portal blood and releases ADH and oxytocin from the posterior pituitary; the pars intermedia is held down by dopamine.
SUM: Pituitary diseases include canine pituitary-dependent hyperadrenocorticism, feline acromegaly, diabetes insipidus and equine PPID.
SRC: Feldman E. C., Nelson R. W., Reusch C. E., Scott-Moncrieff J. C. R. & Behrend E. N., Canine and Feline Endocrinology, 4th edn, Elsevier Saunders | secondary | 2015
SRC: McFarlane D., "Equine pituitary pars intermedia dysfunction", Veterinary Clinics of North America: Equine Practice 27(1):93–113 | secondary | 2011
Q: Which hormones are released from the posterior pituitary? | Antidiuretic hormone (vasopressin) and oxytocin, made in hypothalamic neurones.
Q: What normally inhibits the equine pars intermedia? | Dopamine from hypothalamic neurones.
M1#veterinary-u02-15-q1@1: Which pituitary hormone stimulates cortisol secretion? | Adrenocorticotropic hormone (ACTH) | Thyroid-stimulating hormone | Luteinising hormone | Prolactin | ACTH acts on the zona fasciculata of the adrenal cortex; TSH acts on the thyroid, LH on the gonads.
M2#veterinary-u02-15-q2@3: A diabetic cat needs very high insulin doses and has a broad face and enlarged paws. Which pituitary disorder is most likely? | Acromegaly from a growth hormone–secreting adenoma | Central diabetes insipidus | Pituitary dwarfism | Pituitary pars intermedia dysfunction | Growth hormone excess causes insulin resistance and the physical changes of acromegaly; it is an important cause of hard-to-control feline diabetes.
MATCH2#veterinary-u02-15-q3@2: Match each hypothalamic hormone with the pituitary hormone it controls. | GnRH = FSH and LH ; TRH = TSH ; CRH = ACTH ; Dopamine = prolactin (inhibited) | These hypothalamic signals reach the anterior pituitary through the portal veins.
M3#veterinary-u02-15-q4@2,3: An equine ACTH sample taken in October from an older horse is above the reference interval used for spring samples. What is the best interpretation? | It must be compared with a seasonally adjusted reference interval, because ACTH rises normally in autumn | It proves the horse has PPID whatever the season | ACTH is never useful in horses | The sample must have come from the posterior pituitary | Seasonal increases in ACTH mean autumn samples need autumn reference values; otherwise healthy horses may be misdiagnosed.
SA3#veterinary-u02-15-q5@1,2: Explain how the hypothalamus controls cortisol secretion and how negative feedback keeps it stable, then describe what changes in pituitary-dependent hyperadrenocorticism in the dog. | Hypothalamic neurones release CRH into the hypophyseal portal veins; CRH stimulates corticotroph cells of the anterior pituitary to secrete ACTH, which stimulates the adrenal cortex (zona fasciculata) to produce cortisol. Cortisol feeds back on the hypothalamus and pituitary to reduce CRH and ACTH, keeping cortisol within limits. In pituitary-dependent hyperadrenocorticism a pituitary adenoma secretes ACTH autonomously and is resistant to feedback, so both adrenals enlarge and cortisol is persistently high. | CRH via portal system ; ACTH from anterior pituitary ; Cortisol from zona fasciculata ; Negative feedback by cortisol ; Adenoma resistant to feedback with bilateral adrenal hyperplasia

## Thyroid, adrenal and endocrine pancreas
LV: Preclinical · Application
S: The thyroid sets metabolic rate, the adrenal glands manage stress, salt and water, and the endocrine pancreas controls blood glucose. This lesson covers the physiology of these glands and calcium regulation, with the common endocrine diseases of dogs, cats, horses and cattle that the physiology explains.
O: Describe the synthesis and actions of thyroid hormones and of the hormones of the adrenal cortex and medulla
O: Explain the control of blood glucose by insulin and glucagon and of blood calcium by parathyroid hormone and vitamin D
O: Apply this physiology to hypothyroidism, hyperthyroidism, hyper- and hypoadrenocorticism, diabetes mellitus and milk fever
PRE: The hypothalamus and pituitary
H: The thyroid
P: The thyroid makes **thyroxine** (T4) and the more active **triiodothyronine** (T3), using iodine; most T3 is made from T4 in the tissues. They raise metabolic rate, heat production, heart rate and the effects of catecholamines. **Hypothyroidism** is common in middle-aged dogs, usually from immune-mediated destruction of the gland, causing lethargy, weight gain, cold intolerance and skin and coat changes. **Hyperthyroidism** is common in older cats, usually from benign nodular hyperplasia or adenoma, causing weight loss despite a good appetite, hyperactivity, tachycardia and often hypertension. Iodine deficiency causes **goitre** in newborn lambs, kids and calves in deficient areas.
H: The adrenal glands
- **Zona glomerulosa** → **aldosterone**: sodium retention and potassium excretion, controlled mainly by angiotensin II and potassium.
- **Zona fasciculata** → **cortisol**: raises blood glucose by gluconeogenesis, breaks down protein, suppresses inflammation and immunity, controlled by ACTH.
- **Zona reticularis** → small amounts of sex steroids.
- **Medulla** → **adrenaline** and noradrenaline, released by sympathetic stimulation.
P: **Hyperadrenocorticism** (Cushing's syndrome) in dogs causes increased thirst and urination, a pot belly, panting, thin skin and hair loss. **Hypoadrenocorticism** (Addison's disease) in dogs, often young to middle-aged, destroys the adrenal cortex: lack of aldosterone causes sodium loss and potassium retention (a low sodium to potassium ratio), and lack of cortisol causes weakness and gastrointestinal signs. A dog may present in an **Addisonian crisis** with collapse, bradycardia from hyperkalaemia and shock: an emergency.
H: The endocrine pancreas
P: In the islets of Langerhans, **β cells** secrete **insulin**, which promotes glucose uptake and storage; **α cells** secrete **glucagon**, which raises glucose by glycogenolysis and gluconeogenesis; **δ cells** secrete somatostatin. **Diabetes mellitus** in dogs usually resembles human type 1 (loss of β cells, insulin-dependent for life); in cats it usually resembles type 2 (insulin resistance with β-cell dysfunction, linked to obesity), and some cats go into remission with good glucose control and diet. Uncontrolled diabetes leads to ketoacidosis. In horses, **insulin dysregulation** in equine metabolic syndrome is a major risk factor for laminitis. Ruminants normally have lower blood glucose than monogastric animals and rely on gluconeogenesis from propionate.
H: Calcium
P: Blood calcium is held stable by **parathyroid hormone** (PTH), which releases calcium from bone, increases renal reabsorption and stimulates the kidney to make **calcitriol** (active vitamin D), which increases gut absorption; **calcitonin** has a smaller lowering effect.
X: Why do high-yielding dairy cows develop milk fever around calving?
> At the start of lactation, colostrum and milk suddenly draw large amounts of calcium from the blood.
> PTH and calcitriol take a day or two to increase bone resorption and gut absorption, especially if the cow was fed a high-calcium, high-potassium (alkalogenic) diet before calving, which blunts the response.
> Blood calcium falls: the cow becomes weak, cold and recumbent, often in sternal recumbency with her head turned to her flank. It is an emergency for a vet. Prevention includes manipulating the dry-cow diet's dietary cation–anion difference.
K: Thyroid hormones set metabolic rate; cortisol and aldosterone manage stress, glucose, sodium and potassium; insulin and glucagon balance glucose; PTH and calcitriol hold calcium. Canine Addison's disease, feline hyperthyroidism and bovine milk fever all follow directly from this physiology.
!: Testing for hypothyroidism in a dog that is ill with another disease. Non-thyroidal illness and some drugs lower T4 in euthyroid dogs ("sick euthyroid"), so a low T4 alone does not prove hypothyroidism.
EV: established | Feline hyperthyroidism is usually caused by benign adenomatous hyperplasia of the thyroid, and canine hypothyroidism usually by immune-mediated or idiopathic destruction of the gland.
EV: contested | The causes of the rise in feline hyperthyroidism since the late 1970s are not established; dietary iodine, goitrogens and environmental chemicals such as flame retardants have been proposed.
T: Hypoadrenocorticism | Deficiency of adrenocortical hormones (aldosterone and cortisol), Addison's disease
T: Insulin resistance | A reduced response of tissues to insulin, typical of feline and equine metabolic disease
T: Parathyroid hormone | The hormone that raises blood calcium by mobilising bone, increasing renal reabsorption and stimulating calcitriol
SUM: Thyroid hormones set metabolic rate; hypothyroidism is a canine disease and hyperthyroidism a feline one. The adrenal cortex makes aldosterone and cortisol; the medulla adrenaline.
SUM: Insulin and glucagon control glucose (canine diabetes is usually insulin-deficient, feline usually insulin-resistant); PTH and calcitriol control calcium, whose sudden demand causes milk fever.
SRC: Mooney C. T. & Peterson M. E. (eds), BSAVA Manual of Canine and Feline Endocrinology, 4th edn, British Small Animal Veterinary Association | secondary | 2012
SRC: Goff J. P., "The monitoring, prevention, and treatment of milk fever and subclinical hypocalcemia in dairy cows", The Veterinary Journal 176(1):50–57 | secondary | 2008
Q: Which hormones are lacking in canine primary hypoadrenocorticism? | Usually both aldosterone and cortisol, from destruction of the adrenal cortex.
Q: How does diabetes mellitus usually differ between dogs and cats? | Dogs usually have insulin deficiency like human type 1; cats usually have insulin resistance and β-cell dysfunction like type 2, and may go into remission.
M1#veterinary-u02-16-q1@2: Which zone of the adrenal cortex secretes aldosterone? | Zona glomerulosa | Zona fasciculata | Zona reticularis | Adrenal medulla | The outer zona glomerulosa makes aldosterone; the fasciculata makes cortisol, the reticularis sex steroids and the medulla catecholamines.
M2#veterinary-u02-16-q2@3: A young dog collapses with weakness, a slow heart rate, a low sodium and a high potassium. Which condition fits best? | Hypoadrenocorticism (Addison's disease) | Hyperadrenocorticism | Hyperthyroidism | Diabetes mellitus | Aldosterone deficiency causes sodium loss and potassium retention; hyperkalaemia slows the heart. An Addisonian crisis is an emergency.
TF2#veterinary-u02-16-q3@1: Parathyroid hormone raises blood calcium partly by stimulating the kidney to produce calcitriol, which increases calcium absorption from the gut. | true | PTH acts on bone and kidney directly and on the gut indirectly through calcitriol.
M3#veterinary-u02-16-q4@1,3: An older cat has lost weight despite a ravenous appetite and has a fast heart rate and a palpable neck nodule. Which explanation is most likely? | Hyperthyroidism from a functional thyroid adenoma or hyperplasia | Hypothyroidism from immune-mediated thyroiditis | Hypoadrenocorticism | Iodine-deficiency goitre | These are classic signs of feline hyperthyroidism; hypothyroidism is mainly a canine disease, and goitre from iodine deficiency is seen in neonatal farm animals.
SA3#veterinary-u02-16-q5@2,3: Explain why high-yielding dairy cows are at risk of milk fever at calving and how the physiology of calcium control explains prevention by dietary management. | At calving, colostrum and milk production suddenly remove large amounts of calcium from a small blood pool. Blood calcium is normally restored by PTH, which mobilises bone calcium, increases renal reabsorption and stimulates calcitriol production to raise gut absorption; these responses take time to increase. If the dry-cow diet is high in calcium the PTH system is inactive at calving, and an alkalogenic (high potassium) diet makes tissues less responsive to PTH. Feeding a diet with a negative dietary cation–anion difference before calving induces a mild metabolic acidosis that increases tissue responsiveness to PTH, so calcium is mobilised quickly when lactation starts. | Sudden calcium demand at lactation ; PTH actions on bone, kidney, calcitriol ; Response lags behind demand ; High calcium or potassium dry diets blunt response ; Negative DCAD improves PTH responsiveness

## Reproductive cycles in domestic species
LV: Preclinical · Application
S: Each domestic species has its own breeding pattern, from the cow's year-round 21-day cycle to the bitch's single long cycle and the cat's induced ovulation. This lesson explains the hormonal control of the oestrous cycle, the phases of the cycle and the patterns of each species, the knowledge behind breeding management and several common diseases.
O: Explain the hormonal events of the oestrous cycle, including follicle growth, ovulation, the corpus luteum and luteolysis
O: Compare the cycles of the cow, ewe, mare, sow, bitch and queen, including seasonality and spontaneous or induced ovulation
O: Apply cycle physiology to breeding management, pyometra in the bitch and prolonged oestrus in the ferret
PRE: The hypothalamus and pituitary
H: Hormonal control
- **Follicular phase**: FSH stimulates follicles to grow; they secrete **oestrogen**, which causes oestrous behaviour and, at high levels, switches from negative to **positive feedback**, triggering the **LH surge** and ovulation.
- **Luteal phase**: the ruptured follicle becomes the **corpus luteum** (CL), secreting **progesterone**, which prepares the uterus for pregnancy and suppresses further ovulation.
- **Luteolysis**: in the non-pregnant cow, ewe, mare and sow, the uterus releases **prostaglandin F2α** (PGF2α), which destroys the CL and starts a new cycle. Pregnancy prevents this (maternal recognition of pregnancy): interferon-tau from the ruminant conceptus, oestrogens from the pig conceptus, and migration of the equine conceptus around the uterus.
P: The cycle's phases are **proestrus**, **oestrus** (sexual receptivity), **metoestrus**, **dioestrus** (CL active) and, in seasonal or monoestrous species, **anoestrus** (inactivity).
H: Species patterns
- **Cow**: polyoestrous all year; cycle about 21 days; standing oestrus about 12–18 hours; ovulation roughly 10–14 hours after oestrus ends.
- **Ewe**: seasonally polyoestrous, a **short-day breeder** (breeding in autumn as days shorten, via melatonin); cycle about 17 days.
- **Mare**: seasonally polyoestrous, a **long-day breeder** (spring and summer); cycle about 21 days; oestrus lasts about 5–7 days, with ovulation towards its end.
- **Sow**: polyoestrous all year; cycle about 21 days; oestrus 2–3 days; returns to oestrus within about a week of weaning.
- **Bitch**: **monoestrous**, not seasonal; usually one or two cycles a year. Proestrus and oestrus each last about 9 days on average but vary widely; ovulation follows the LH surge by about two days, and canine oocytes need a further 2–3 days to mature. The luteal phase lasts about two months whether or not she is pregnant, followed by anoestrus.
- **Queen**: seasonally polyoestrous, a long-day breeder; an **induced (reflex) ovulator**: mating triggers the LH surge. Rabbits, ferrets and camelids are also induced ovulators.
X: Why does a bitch's long progesterone phase matter clinically?
> After every oestrus the bitch has about two months of high progesterone, pregnant or not.
> Progesterone stimulates the endometrium and suppresses local immunity and myometrial contraction, so bacteria from the vagina can colonise the uterus: **pyometra**, typically weeks after a season in an older entire bitch. It is a life-threatening emergency.
> The same luteal phase, followed by falling progesterone and rising prolactin, explains **pseudopregnancy**, with nesting and milk production in non-pregnant bitches.
K: Oestrogen from follicles triggers the LH surge; progesterone from the corpus luteum maintains the luteal phase; PGF2α from the uterus ends it in farm species. Species differ in season, cycle length and whether ovulation is spontaneous or induced.
!: Treating the bitch like a cow. She is monoestrous and has no uterine luteolysis; her luteal phase lasts as long as a pregnancy, and her receptive period and ovulation vary so much that breeding is timed by progesterone measurement and vaginal cytology, not the calendar.
EV: established | The bitch has a luteal phase of similar length whether pregnant or not, and the queen, rabbit, ferret and camelids are induced ovulators.
EV: contested | Cats can sometimes ovulate without mating (spontaneous ovulation has been documented in a proportion of queens), so describing them simply as induced ovulators is an oversimplification.
T: Luteolysis | Regression of the corpus luteum, caused by uterine PGF2α in farm species
T: Induced ovulator | A species in which ovulation is triggered by mating rather than occurring spontaneously
T: Maternal recognition of pregnancy | The signal by which the conceptus prevents luteolysis and maintains the corpus luteum
SUM: FSH and oestrogen drive the follicular phase and the LH surge; the corpus luteum makes progesterone until PGF2α causes luteolysis or pregnancy prevents it.
SUM: Cows and sows cycle all year; ewes are short-day and mares and queens long-day breeders; the bitch is monoestrous with a long luteal phase; queens, rabbits, ferrets and camelids ovulate on mating.
SRC: Noakes D. E., Parkinson T. J. & England G. C. W. (eds), Veterinary Reproduction and Obstetrics, 10th edn, Elsevier | secondary | 2019
SRC: England G. & von Heimendahl A. (eds), BSAVA Manual of Canine and Feline Reproduction and Neonatology, 2nd edn, British Small Animal Veterinary Association | secondary | 2010
Q: What triggers ovulation in the queen? | Mating, which triggers the LH surge (induced or reflex ovulation).
Q: What causes luteolysis in the non-pregnant cow? | Prostaglandin F2α released from the uterus.
M1#veterinary-u02-17-q1@1: Which hormone causes ovulation? | Luteinising hormone (the LH surge) | Progesterone | Prolactin | Oxytocin | The LH surge, triggered by high oestrogen through positive feedback, causes the follicle to rupture.
M2#veterinary-u02-17-q2@2: Which species is a short-day breeder, coming into season as daylength falls in autumn? | Ewe | Mare | Queen | Sow | Sheep breed in autumn in response to increasing melatonin; mares and queens are long-day breeders, and sows cycle all year.
MATCH1#veterinary-u02-17-q3@2: Match each species with its approximate oestrous cycle length or pattern. | Cow = about 21 days, all year ; Ewe = about 17 days, seasonal ; Bitch = monoestrous, usually one or two cycles a year ; Queen = induced ovulator, seasonally polyoestrous | Knowing each pattern is the basis of breeding management and of interpreting reproductive history.
M3#veterinary-u02-17-q4@3: An entire nine-year-old bitch is drinking more, has a vaginal discharge and is lethargic six weeks after her season. Which explanation is most likely? | Pyometra, developing under the influence of luteal-phase progesterone | Normal pseudopregnancy needing no attention | A second oestrus | Hypothyroidism caused by the season | The timing in the luteal phase, the discharge and systemic signs suggest pyometra, a life-threatening emergency that needs a vet promptly. Pseudopregnancy does not cause systemic illness.
SA3#veterinary-u02-17-q5@1,2: Describe the hormonal events of a bovine oestrous cycle and explain how pregnancy prevents a return to oestrus. | In the follicular phase FSH promotes follicle growth; the dominant follicle secretes oestrogen, causing oestrous behaviour; high oestrogen exerts positive feedback, producing the LH surge and ovulation about 10–14 hours after the end of oestrus. The follicle becomes a corpus luteum secreting progesterone through dioestrus. If the cow is not pregnant, oxytocin and the uterus generate pulses of PGF2α around days 16–17, causing luteolysis, a fall in progesterone and a new cycle about 21 days after the last. If an embryo is present, it secretes interferon-tau, which suppresses the uterine release of PGF2α, so the corpus luteum persists and progesterone maintains pregnancy. | FSH and follicle growth ; Oestrogen positive feedback and LH surge ; Corpus luteum and progesterone ; PGF2α luteolysis around day 16–17 ; Interferon-tau prevents luteolysis

## Pregnancy, parturition and lactation
LV: Preclinical · Application
S: Pregnancy, birth and milk production are controlled by the placenta, the fetus and the mother's hormones, and they differ between species in ways that matter for every vet. This lesson covers placentation and the transfer of antibodies, gestation lengths and the hormones that maintain pregnancy, the triggering and stages of parturition, and the physiology of lactation and colostrum.
O: Compare placentation in the domestic species and explain why the placenta determines how newborns receive antibodies
O: Describe the hormonal maintenance of pregnancy, the initiation and stages of parturition, and approximate gestation lengths
O: Explain the control of lactation and milk let-down and apply it to retained fetal membranes and colostrum management
PRE: Reproductive cycles in domestic species
H: Placentation
- **Diffuse, epitheliochorial** (mare, sow): attachment over the whole surface, with six tissue layers between maternal and fetal blood.
- **Cotyledonary, synepitheliochorial** (cow, ewe, goat): fetal **cotyledons** attach to maternal **caruncles**, forming **placentomes**.
- **Zonary, endotheliochorial** (bitch, queen): a band around the middle of the conceptus, with fewer layers.
P: Antibodies (immunoglobulin G) cannot cross the epitheliochorial or synepitheliochorial placenta, so foals, piglets, calves and lambs are born with almost no antibodies and depend entirely on **colostrum**, absorbed intact across the gut for roughly the first 24 hours (gut closure). Puppies and kittens receive a small proportion of their maternal antibody across the placenta but still depend mainly on colostrum. Failure of passive transfer leaves the newborn highly susceptible to infection.
H: Maintaining pregnancy
- **Progesterone** keeps the uterus quiet and the cervix closed. Its source varies: the corpus luteum throughout in the bitch, goat and sow (removing the CL ends pregnancy); the CL early and then the placenta in the ewe (from about 50 days) and partly in the cow; in the mare, **endometrial cups** produce equine chorionic gonadotrophin (eCG) from about day 35–40, supporting extra corpora lutea before the placenta takes over.
- Approximate gestation lengths: bitch about 63 days from ovulation; queen about 63–65 days; sow about 114 days ("three months, three weeks and three days"); ewe about 147 days; goat about 150 days; cow about 283 days; mare about 340 days, with wide variation.
H: Parturition
P: In ruminants the fetus decides when birth begins: maturing of the **fetal hypothalamic–pituitary–adrenal axis** raises fetal cortisol, which makes the placenta convert progesterone to **oestrogen** and release **PGF2α**; PGF2α causes luteolysis where the CL is still needed and stimulates uterine contraction; **relaxin** softens the cervix and pelvic ligaments. Pressure of the fetus on the cervix and vagina releases **oxytocin** (the Ferguson reflex), a positive feedback loop.
- **Stage 1**: cervical dilation and uterine contractions; restlessness and nesting.
- **Stage 2**: expulsion of the fetus, with abdominal straining.
- **Stage 3**: expulsion of the fetal membranes.
X: A mare foals normally, but four hours later her placenta has not been passed. Why does this need a vet, when a cow could be monitored for longer?
> In the mare, membranes are usually passed within about three hours; retention beyond that is abnormal.
> Mares with retained membranes are prone to metritis, endotoxaemia and laminitis, which can be fatal or crippling, so a vet should be called.
> In cattle, membranes are considered retained after about 24 hours; manual removal is generally not advised, and the cow is monitored for metritis. Species physiology sets very different thresholds.
K: Epitheliochorial and synepitheliochorial placentas block antibody transfer, so foals, calves, lambs and piglets depend on colostrum in their first day. In ruminants the fetal adrenal axis triggers birth.
H: Lactation
P: The mammary gland develops during pregnancy under oestrogen, progesterone, prolactin and placental hormones. At birth the fall in progesterone allows **prolactin** to initiate copious milk secretion; continued milking or suckling maintains it. **Oxytocin**, released when the teat is stimulated, contracts the myoepithelial cells around the alveoli, causing **milk let-down**; fear and pain release adrenaline, which blocks let-down. **Colostrum** is the first secretion, rich in immunoglobulins, energy and vitamins; its antibody content falls quickly after birth.
!: Assuming a newborn calf will drink enough colostrum on its own. Many do not suckle enough, or early enough; colostrum quality, quantity and speed of feeding all matter, and herd protocols, agreed with the vet, set how this is managed.
EV: established | Antibodies are not transferred across the epitheliochorial and synepitheliochorial placentas, so calves, lambs, foals and piglets depend on colostrum absorbed before gut closure.
EV: contested | The exact signal that initiates parturition in species other than sheep (in which the fetal adrenal mechanism was shown experimentally) is less clear, and may differ between species.
T: Placentome | The unit formed by a fetal cotyledon and a maternal caruncle in ruminants
T: Failure of passive transfer | Inadequate absorption of colostral antibodies by a newborn, leaving it susceptible to infection
T: Milk let-down | The ejection of milk from the alveoli caused by oxytocin acting on myoepithelial cells
SUM: Placentation type determines antibody transfer: farm animals and foals depend wholly on colostrum in their first day; puppies and kittens gain a little across the placenta.
SUM: Progesterone maintains pregnancy (from the CL, placenta or both); the fetal adrenal axis, PGF2α, oestrogen, relaxin and oxytocin drive parturition in three stages; prolactin and oxytocin govern lactation.
SRC: Noakes D. E., Parkinson T. J. & England G. C. W. (eds), Veterinary Reproduction and Obstetrics, 10th edn, Elsevier | secondary | 2019
SRC: Klein B. G. (ed.), Cunningham's Textbook of Veterinary Physiology, 6th edn, Elsevier, section VIII | secondary | 2020
Q: Why do calves depend on colostrum for antibodies? | The bovine synepitheliochorial placenta does not let maternal antibodies cross, so the calf must absorb them from colostrum before gut closure.
Q: What causes milk let-down? | Oxytocin, released when the teat is stimulated, contracts the myoepithelial cells around the alveoli.
M1#veterinary-u02-18-q1@2: Approximately how long is gestation in the sow? | About 114 days | About 63 days | About 147 days | About 283 days | The sow's gestation is about 114 days (three months, three weeks and three days); 63 days is the bitch, 147 the ewe and 283 the cow.
M2#veterinary-u02-18-q2@1: Which type of placenta does the mare have? | Diffuse epitheliochorial | Cotyledonary synepitheliochorial | Zonary endotheliochorial | Discoid haemochorial | The mare and sow have a diffuse epitheliochorial placenta; ruminants a cotyledonary one, and dogs and cats a zonary endotheliochorial one.
TF2#veterinary-u02-18-q3@3: In the bitch, pregnancy depends on progesterone from the corpus luteum throughout gestation. | true | The canine placenta does not take over progesterone production, so loss of the corpora lutea ends pregnancy.
M3#veterinary-u02-18-q4@3: A foal born six hours ago has not stood or suckled. Which is the most important physiological concern? | It may not absorb enough colostral antibodies before gut closure, leaving it without passive immunity | It will develop neonatal isoerythrolysis because it has not suckled | Its placenta will continue to supply antibodies until it suckles | Foals receive all their antibodies before birth, so suckling is unimportant | The equine placenta transfers no antibodies, and absorption falls steeply within the first day; a foal that has not suckled needs a vet promptly.
SA3#veterinary-u02-18-q5@2,3: Explain how parturition is initiated in the ewe and why oxytocin acts as positive feedback during labour. | Near term, maturation of the fetal hypothalamic–pituitary–adrenal axis increases fetal ACTH and cortisol. Fetal cortisol induces placental enzymes that convert progesterone to oestrogen, so progesterone falls and oestrogen rises; this increases PGF2α production by the uterus and placenta, oxytocin receptors and gap junctions in the myometrium, and relaxin softens the cervix. Uterine contractions push the fetus into the cervix and vagina; stretch receptors trigger oxytocin release from the posterior pituitary (the Ferguson reflex), which strengthens contractions, increasing stretch and further oxytocin release: positive feedback that continues until the fetus is delivered. | Fetal HPA axis and cortisol ; Progesterone to oestrogen conversion ; PGF2α and myometrial changes ; Ferguson reflex from cervical stretch ; Positive feedback loop until delivery
`;
