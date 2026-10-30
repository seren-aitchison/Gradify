// Unit 34: Biophysics. Format: kit/course/notes.js
export default `
## Physical principles of living systems
S: Living things obey the same physical laws as everything else, but they operate far from equilibrium, at scales where thermal noise matters, using energy flows to build and maintain order. Biophysics applies physics to understand how life works.
H: Key principles
- **Energy flow**: organisms take in free energy (food, light) and export entropy (heat).
- **Thermal fluctuations**: at the nanoscale, k_{B}T ≈ 4 pN nm (4.1 × 10^{-21} J at 310 K) is comparable to molecular forces and motor steps.
- **Low Reynolds number**: microorganisms live in a world dominated by viscosity.
- **Information**: DNA stores ~2 bits per base pair; cells process signals.
- **Self-assembly**: membranes, proteins and viruses form spontaneously via weak interactions.
H: Scaling laws
P: Biological properties scale with size: metabolic rate ∝ M^{3/4} (Kleiber's law), heart rate ∝ M^{−1/4}, lifespan ∝ M^{1/4}. A mouse's heart beats ~600 times per minute, an elephant's ~30, but both get ~1–2 billion beats per lifetime. Surface-to-volume ratios limit cell size and set heat loss.
H: Schrödinger's question
- "What is Life?" (1944) asked how physics explains heredity and order; it inspired Crick and Watson. Life maintains low entropy by consuming free energy.
X: Energy of one ATP hydrolysis in units of k_{B}T at 310 K (ΔG ≈ 50 kJ mol^{-1})?
> Per molecule: 50 000/6.02 × 10^{23} = 8.3 × 10^{-20} J
> /4.3 × 10^{-21} ≈ 20 k_{B}T
!: Life doesn't violate the second law; it decreases entropy locally by increasing it more in the environment.
Q: What is k_{B}T at body temperature? | About 4.3 × 10^{-21} J, or ~4 pN nm.
Q: What is Kleiber's law? | Metabolic rate scales as body mass to the 3/4 power.
M1: ATP hydrolysis releases about: | 20 k_{B}T | 1 k_{B}T | 1000 k_{B}T | 0.1 k_{B}T | ~50 kJ mol^{-1}.
M2: Who wrote "What is Life?"? | Erwin Schrödinger | Francis Crick | Darwin | Einstein | 1944.

## Biomechanics
S: Biomechanics applies mechanics to living bodies: how bones carry loads, muscles produce force, joints move and animals walk, run, swim and fly. It informs sports science, medicine, prosthetics and robotics.
H: The body as a machine
- Bones as levers; muscles as actuators; joints as pivots.
- Most limb levers are third-class: muscles attach near joints, sacrificing force for speed and range.
- Forces in joints can be several times body weight (hip ~3–5× during walking; knee ~7× running).
H: Locomotion
- Walking: inverted pendulum, exchanging kinetic and potential energy; preferred speed ~1.3 m s^{-1}.
- Running: spring–mass model; tendons store and return elastic energy (kangaroos, the human Achilles tendon).
- Froude number v^{2}/(gL) predicts walk–run transition at ~0.5 across species.
- Swimming and flying need fluid dynamics: thrust, lift, drag.
H: Scaling
P: Strength ∝ cross-sectional area (L^{2}), weight ∝ volume (L^{3}): larger animals need disproportionately thick bones (Galileo noticed this). That's why insects can carry many times their weight and why giants can't simply be scaled-up humans. A cat survives falls that kill larger animals partly because of lower terminal velocity relative to strength.
X: Biceps force to hold 100 N in the hand (load 35 cm from elbow, muscle 4 cm)?
> F × 4 = 100 × 35 ⇒ F = 875 N (plus forearm weight)
!: Muscles are weak in mechanical advantage but fast; the body trades force for speed and range of motion.
Q: Why are most human limb levers third-class? | Muscles attach close to joints, giving speed and range at the cost of force.
Q: How do tendons save energy in running? | They store elastic energy on landing and return it at push-off.
M1: Walking resembles: | An inverted pendulum | A spring | A rocket | A wheel | Energy exchange.
M2: Larger animals need relatively thicker bones because: | Weight grows as L^{3}, strength as L^{2} | Bones are lighter | Gravity is stronger | Muscles are weaker | Scaling.

## Biological fluid dynamics
S: Fluids flow throughout living things: blood in vessels, air in lungs, water around swimming cells and fish. Biological fluid dynamics explains how organisms pump, breathe, swim and fly, from bacteria to whales.
H: Blood flow
E: Q = πr^{4}ΔP/(8ηL) :: Poiseuille: flow ∝ r^{4}
- Blood is non-Newtonian (shear-thinning); ~45% red cells.
- Capillaries (~5–10 μm) are narrower than red blood cells, which squeeze through.
- Murray's law: optimal branching r_{parent}^{3} = Σr_{child}^{3}.
- Turbulence at constrictions creates murmurs heard with stethoscopes.
H: Breathing
- Laminar airflow in small airways; surfactant reduces alveolar surface tension.
- Gas exchange by diffusion across ~0.5 μm membranes over ~70 m^{2}.
H: Swimming and flying
- **Low Re** (bacteria, sperm): viscous; flagella rotate like corkscrews (Purcell's scallop theorem forbids reciprocal strokes).
- **High Re** (fish, birds): vortex shedding, lift-based propulsion; Strouhal number St ≈ 0.2–0.4 for efficient swimmers and flyers.
- Insects use unsteady aerodynamics (leading-edge vortices) to hover.
X: Narrowing an artery's radius by 25% reduces flow at the same pressure by how much?
> Q ∝ r^{4}: 0.75^{4} = 0.32
> Flow falls to about a third
!: Blood flow in large arteries is pulsatile and not exactly Poiseuille; the r^{4} rule is still a good guide for small vessels.
Q: Why does arterial narrowing matter so much? | Flow depends on the fourth power of radius.
Q: How do bacteria swim at low Reynolds number? | By rotating helical flagella, a non-reciprocal motion.
M1: Murray's law describes: | Optimal branching of blood vessels | Heart rate | Swimming speed | Diffusion | r^{3} conservation.
M2: Efficient swimmers and flyers have Strouhal numbers of about: | 0.2–0.4 | 10 | 0.001 | 100 | Vortex shedding.

## Diffusion and transport
S: Diffusion, the random spreading of molecules, moves substances within cells and across short distances in the body. It's fast over micrometres but painfully slow over centimetres, which shapes the design of all living things.
H: Diffusion laws
E: J = −D dc/dx :: Fick's first law
E: ∂c/∂t = D∇^{2}c :: Fick's second law
E: ⟨x^{2}⟩ = 2Dt (1D); 6Dt (3D)
E: D = k_{B}T/(6πηr) :: Stokes–Einstein
- Small molecule in water: D ~ 10^{-9} m^{2} s^{-1}; protein ~10^{-10}.
H: Timescales
- Across a 10 μm cell: ~0.1 s.
- Across a synapse (20 nm): microseconds.
- 1 cm: ~1 day; 1 m: ~years.
H: Consequences
P: Because diffusion time ∝ distance^{2}, organisms larger than ~1 mm need circulatory systems, lungs and gills to move material by bulk flow. Cells use motor proteins and cytoplasmic streaming for long distances (nerve axons up to 1 m long transport cargo actively). Berg and Purcell showed bacteria sense chemicals near the diffusion-limited optimum.
X: Time for oxygen (D = 2 × 10^{-9} m^{2} s^{-1}) to diffuse 1 mm?
> t ≈ x^{2}/(2D) = 10^{-6}/(4 × 10^{-9}) = 250 s
!: Diffusion doesn't "push" molecules in a direction; net flux arises statistically from concentration differences.
Q: State Fick's first law. | Diffusive flux is proportional to the concentration gradient: J = −D dc/dx.
Q: Why do large organisms need circulatory systems? | Diffusion is far too slow over large distances (time ∝ distance squared).
M1: Diffusion time scales with distance as: | Distance squared | Distance | Square root of distance | Distance cubed | ⟨x^{2}⟩ = 2Dt.
M2: The Stokes–Einstein relation links D to: | Temperature, viscosity and particle size | Mass only | Charge | Pressure | k_{B}T/(6πηr).

## Osmosis and membrane transport
S: Cell membranes control what enters and leaves cells. Water moves by osmosis towards higher solute concentration, while ions and molecules cross by diffusion, through channels, or are pumped against gradients using energy.
H: Osmosis
E: Π = cRT :: van 't Hoff osmotic pressure (c = total solute particle concentration)
- Blood plasma: ~300 mOsm, Π ≈ 7.7 atm.
- Cells in pure water swell and burst (lysis); in concentrated solutions they shrink (crenation).
- Plants use turgor pressure for rigidity; reverse osmosis purifies water.
H: Membrane transport
- **Passive diffusion**: small non-polar molecules (O_{2}, CO_{2}).
- **Facilitated diffusion**: channels and carriers (aquaporins, glucose transporters).
- **Active transport**: pumps use ATP (Na^{+}/K^{+}-ATPase: 3 Na^{+} out, 2 K^{+} in per ATP).
- **Secondary active transport**: uses ion gradients (Na^{+}–glucose symport).
H: The sodium–potassium pump
P: Consuming ~20–40% of a resting body's ATP (up to ~70% in neurons), the pump maintains ion gradients that set the membrane potential, drive nerve signals and power secondary transport. Skou discovered it (Nobel Chemistry 1997).
X: Osmotic pressure difference for 0.1 mol L^{-1} glucose at 310 K?
> Π = 100 mol m^{-3} × 8.31 × 310 ≈ 2.6 × 10^{5} Pa ≈ 2.5 atm
!: Osmosis moves water, not solute; water flows towards higher solute concentration.
Q: What is osmotic pressure? | The pressure needed to stop water flowing across a semipermeable membrane into a more concentrated solution.
Q: What does the sodium–potassium pump do? | Uses ATP to pump 3 Na^{+} out and 2 K^{+} into cells.
M1: Red blood cells placed in pure water: | Swell and burst | Shrink | Stay the same | Freeze | Hypotonic.
M2: Aquaporins transport: | Water | Glucose | Sodium | Proteins | Water channels.

## Thermodynamics of biological systems
S: Living systems obey the laws of thermodynamics, using free energy from food or light to drive the reactions that build and maintain them. Free-energy coupling, efficiency and heat production are central to understanding metabolism.
H: Free energy in biology
E: ΔG = ΔG° + RT ln Q
- Cells couple unfavourable reactions (ΔG > 0) to ATP hydrolysis (ΔG ≈ −50 kJ mol^{-1} in cells).
- Chemiosmosis (Mitchell, Nobel Chemistry 1978): proton gradients across membranes (~200 mV) drive ATP synthase.
H: Energy budgets
- Human basal metabolism ~80 W; ~100 W average; marathon ~1 kW.
- Muscle efficiency ~25%; the rest is heat.
- Photosynthesis: ~1–2% overall efficiency (theoretical maximum ~11%).
- Brain: 2% of body mass, ~20% of energy (~20 W).
H: Thermoregulation
- Mammals hold ~37 °C by balancing metabolic heat with radiation, convection, evaporation (sweating ~2.4 MJ per litre).
- Small animals lose heat faster (high surface-to-volume ratio) and need higher metabolic rates.
H: Non-equilibrium life
P: Cells are open systems maintained far from equilibrium by continuous energy flow. Their order (low entropy) is paid for by exporting heat and high-entropy waste. Stopping energy flow leads to equilibrium: death.
X: How much food energy does a 100 W human use per day?
> 100 × 86 400 = 8.6 MJ ≈ 2060 kcal
!: Metabolic "calories" are kilocalories: a food Calorie = 4.184 kJ.
Q: How do cells drive unfavourable reactions? | By coupling them to favourable ones, usually ATP hydrolysis.
Q: What is chemiosmosis? | Using a proton gradient across a membrane to drive ATP synthesis.
M1: The human brain uses about what fraction of resting energy? | 20% | 2% | 50% | 80% | ~20 W.
M2: Muscle efficiency is about: | 25% | 90% | 5% | 100% | Rest is heat.

## Molecular motors
S: Molecular motors are proteins that turn chemical energy into mechanical work, walking along tracks, spinning or contracting. They move cargo in cells, power muscles, divide chromosomes and make ATP.
H: Types
- **Linear motors**: myosin on actin (muscle); kinesin and dynein on microtubules (cargo transport).
- **Rotary motors**: ATP synthase (F_{0}F_{1}, rotates ~100 times per second); bacterial flagellar motor (driven by proton or sodium ion flow, rotating at up to ~300 Hz, about 18 000 rpm).
- **Nucleic acid motors**: RNA polymerase, helicases, viral DNA packaging motors.
H: How kinesin walks
- Two heads step hand-over-hand, 8 nm per step, one ATP per step.
- Stall force ~6 pN; speed ~800 nm s^{-1}.
- Work per step 6 pN × 8 nm = 48 pN nm ≈ 12 k_{B}T: about 50% efficient.
H: Brownian ratchets
P: At the nanoscale, thermal noise is huge. Motors don't fight it; they rectify it, using ATP binding and hydrolysis to bias random motion in one direction. This "ratchet" principle respects the second law because energy is consumed. Single-molecule optical tweezers measured individual motor steps (Block, 1993).
X: ATP synthase makes 3 ATP per turn at ~100 turns per second. ATP per second?
> 300 ATP per second per enzyme
!: The bacterial flagellar motor's speed varies by species; it's driven by ion flow, not ATP.
Q: How does kinesin move? | Hand-over-hand along microtubules, 8 nm per ATP.
Q: What powers ATP synthase? | A proton gradient driving rotation of its F_{0} unit.
M1: Myosin interacts with: | Actin | Microtubules | DNA | Lipids | Muscle contraction.
M2: Molecular motors work in a thermal environment by: | Rectifying Brownian motion using chemical energy | Ignoring heat | Being very large | Using light only | Brownian ratchets.

## Protein dynamics
S: Proteins aren't rigid: they fold, flex, breathe and change shape to function. Protein dynamics spans femtosecond vibrations to millisecond conformational changes, and folding itself is a physics problem of searching a vast energy landscape.
H: Protein folding
- Chain of amino acids folds into a unique 3D structure determined by its sequence (Anfinsen, Nobel 1972).
- **Levinthal's paradox**: random search would take longer than the age of the universe.
- **Energy landscape (funnel)** theory: biased search towards the native state.
- Driven by the hydrophobic effect, hydrogen bonds, electrostatics; stability only ~20–60 kJ mol^{-1}.
H: Prediction
P: AlphaFold (2020–21; Nobel Chemistry 2024 to Hassabis, Jumper and Baker) predicts structures from sequences with near-experimental accuracy, using deep learning on known structures. Physics-based simulation (molecular dynamics, Anton supercomputers) still reveals folding pathways and dynamics.
H: Dynamics and function
- Allostery: binding at one site changes another site's shape (haemoglobin cooperativity).
- Enzymes sample conformations; motion helps catalysis.
- Misfolding and aggregation cause diseases (Alzheimer's, Parkinson's, prions).
H: Measurement
- X-ray crystallography, cryo-EM (Nobel 2017), NMR, FRET, hydrogen–deuterium exchange.
X: Why does Levinthal's paradox not apply in practice?
> Folding isn't random search; local interactions bias the chain downhill on a funnel-shaped energy landscape
> Small proteins fold in microseconds to milliseconds
!: A protein's structure isn't static; function often depends on motions between conformations.
Q: What is Levinthal's paradox? | Random conformational search would take impossibly long, yet proteins fold quickly.
Q: What did AlphaFold achieve? | Highly accurate protein structure prediction from amino acid sequences.
M1: Protein folding is driven mainly by: | The hydrophobic effect | Gravity | Magnetism | Covalent bonds forming | Burying non-polar groups.
M2: Cryo-electron microscopy is used to: | Determine biomolecular structures | Freeze food | Measure temperature | Detect radiation | Nobel 2017.

## DNA mechanics
S: DNA is a long, stiff-but-flexible polymer storing genetic information. Its mechanical properties, bending, twisting and stretching, govern how it's packed into cells, read and copied.
H: Structure
- Double helix: 2 nm diameter; 0.34 nm per base pair; 10.5 bp per turn.
- Human genome: ~3.2 × 10^{9} bp per set; ~2 m of DNA per cell, packed into a ~6 μm nucleus.
H: Mechanical properties
- Persistence length ~50 nm (~150 bp): stiff on short scales.
- Worm-like chain model describes force–extension; entropic elasticity at low force.
- Overstretching transition at ~65 pN.
- Twist and supercoiling: topoisomerases relieve tension during replication.
H: Packaging
P: DNA wraps ~1.7 turns (147 bp) around histone proteins forming nucleosomes, which fold into chromatin. Tight bending costs energy, so packaging relies on electrostatics and protein binding. How DNA is packed affects which genes can be read (epigenetics). Viruses pack DNA into capsids at enormous pressures (~60 atm).
H: Single-molecule experiments
- Magnetic and optical tweezers stretch and twist individual DNA molecules, measuring forces in piconewtons.
X: Length of DNA in a human cell's 6.4 × 10^{9} bp?
> L = 6.4 × 10^{9} × 0.34 nm = 2.2 m
!: DNA's information isn't affected by its mechanics directly, but mechanics controls access: tightly wound regions are harder to transcribe.
Q: What is DNA's persistence length? | About 50 nm (~150 base pairs).
Q: How is 2 m of DNA packed into a cell nucleus? | Wrapped around histones into nucleosomes and folded into chromatin.
M1: DNA's rise per base pair is: | 0.34 nm | 3.4 nm | 2 nm | 50 nm | B-DNA.
M2: Overstretching of DNA occurs at about: | 65 pN | 1 pN | 1 nN | 1000 pN | Single-molecule.

## Membrane biophysics
S: Cell membranes are thin, fluid sheets of lipids with embedded proteins. Their physics, self-assembly, elasticity, fluidity and electrical properties, underpins how cells compartmentalise, signal, divide and move.
H: Structure
- Lipid bilayer ~4–5 nm thick; hydrophilic heads outward, hydrophobic tails inward.
- Self-assembles because exposing tails to water is unfavourable (hydrophobic effect).
- Fluid mosaic model (Singer and Nicolson, 1972): lipids and proteins diffuse laterally (D ~ 1 μm^{2} s^{-1}).
- Lipid rafts: cholesterol-rich domains.
H: Mechanics
E: E = (κ/2)∫(2H)^{2}dA :: Helfrich bending energy, κ ≈ 10–20 k_{B}T
- Easy to bend, hard to stretch (rupture at ~3–5% area strain).
- Shapes of red blood cells, vesicles and organelles minimise bending energy.
H: Electrical properties
- Capacitance ~1 μF cm^{-2} (thin insulator).
- Resting potential ~−70 mV: field ~10^{7} V m^{-1} across the membrane.
- Electroporation: strong pulses open pores (used to deliver DNA and drugs).
H: Curvature and proteins
P: Proteins sense and generate curvature (BAR domains, dynamin, clathrin) to bud vesicles, divide cells and form organelles. Membrane tension regulates cell motility and spreading.
X: Electric field across a 5 nm membrane at −70 mV?
> E = 0.07/5 × 10^{-9} = 1.4 × 10^{7} V m^{-1}
!: Membranes aren't rigid walls; they're 2D fluids constantly flexing with thermal fluctuations.
Q: Why do lipids self-assemble into bilayers? | The hydrophobic effect drives tails away from water.
Q: What is the fluid mosaic model? | Membranes as 2D fluids with lipids and proteins free to move laterally.
M1: Membrane capacitance is about: | 1 μF cm^{-2} | 1 F m^{-2} only in nerves | 1 pF cm^{-2} | 100 μF cm^{-2} | Thin dielectric.
M2: Membranes are: | Easy to bend, hard to stretch | Hard to bend | Rigid | Gaseous | Low bending rigidity.

## Electrophysiology
S: Electrophysiology studies electrical activity in cells and tissues: membrane potentials, ion currents, nerve impulses and heartbeats. It underlies ECG and EEG diagnostics and much of neuroscience.
H: Membrane potential
E: V = (k_{B}T/(ze)) ln(c_{out}/c_{in}) :: Nernst potential for one ion
E: V = (k_{B}T/e) ln((P_{K}[K]_{o} + P_{Na}[Na]_{o} + P_{Cl}[Cl]_{i})/(P_{K}[K]_{i} + P_{Na}[Na]_{i} + P_{Cl}[Cl]_{o})) :: Goldman–Hodgkin–Katz
- K^{+} Nernst ~−90 mV; Na^{+} ~+60 mV; resting potential ~−70 mV (dominated by K^{+} permeability).
H: Measuring
- Microelectrodes; **patch clamp** (Neher and Sakmann, Nobel 1991): currents through single ion channels (pA).
- Voltage clamp: holding potential, measuring currents (Hodgkin–Huxley).
- Optical voltage and calcium indicators; multi-electrode arrays.
H: Clinical electrophysiology
P: ECGs record the heart's electrical activity from the skin (~1 mV); EEGs record brain rhythms (~10–100 μV); EMGs muscles. Pacemakers and defibrillators control heart rhythm electrically; deep brain stimulation treats Parkinson's disease; cochlear implants restore hearing.
X: Nernst potential for K^{+} with 140 mM inside, 5 mM outside at 310 K?
> V = (26.7 mV) ln(5/140) = 26.7 × (−3.33) ≈ −89 mV
!: The resting potential isn't set by the pump directly; the pump maintains gradients, and permeability (mainly to K^{+}) sets the potential.
Q: What is the Nernst potential? | The membrane voltage at which an ion's diffusive and electrical driving forces balance.
Q: What does patch clamping measure? | Currents through individual ion channels or small membrane patches.
M1: The resting membrane potential is mainly set by permeability to: | K^{+} | Na^{+} | Ca^{2+} | Cl^{−} | Leak channels.
M2: An ECG signal at the skin is about: | 1 mV | 1 V | 1 μV | 100 V | Heart's electrical activity.

## Ion channels
S: Ion channels are protein pores that let specific ions cross membranes rapidly, opening and closing in response to voltage, chemicals or force. They make nerve signals, heartbeats, senses and muscle contraction possible.
H: Properties
- Conduct ~10^{6}–10^{8} ions per second when open (pA currents).
- **Selectivity**: potassium channels pass K^{+} ~10 000 times more than smaller Na^{+}, by mimicking water's coordination of K^{+} in the selectivity filter (MacKinnon, Nobel Chemistry 2003).
- **Gating**: voltage-gated (Na_{v}, K_{v}, Ca_{v}), ligand-gated (acetylcholine receptors), mechanosensitive (Piezo; touch and hearing, Nobel 2021), temperature-sensitive (TRPV1 for heat and capsaicin).
H: Voltage gating
P: Charged amino acids in the S4 helix sense membrane voltage and move, opening the pore. Single-channel recordings show channels flicking between open and closed states randomly; the macroscopic current is the average of many stochastic channels.
H: Medicine and toxins
- Channelopathies: cystic fibrosis (CFTR chloride channel), epilepsy, long-QT syndrome.
- Drugs: local anaesthetics (Na^{+} channel blockers), calcium channel blockers.
- Toxins: tetrodotoxin (pufferfish), scorpion and snake venoms.
X: A channel conducts 5 pA. Ions per second?
> 5 × 10^{-12}/1.6 × 10^{-19} ≈ 3 × 10^{7} ions per second
!: Selectivity doesn't come from pore size alone; smaller Na^{+} is excluded by the energetics of shedding water.
Q: How do potassium channels select K^{+} over smaller Na^{+}? | The selectivity filter mimics K^{+}'s water shell, making it energetically favourable only for K^{+}.
Q: What are mechanosensitive channels? | Channels opened by membrane tension, used in touch and hearing.
M1: Tetrodotoxin blocks: | Voltage-gated sodium channels | Potassium channels | Water channels | Chloride channels | Pufferfish toxin.
M2: An open ion channel passes roughly: | 10^{7} ions per second | 1 ion per second | 10^{15} | 100 | pA currents.

## Nerve impulses and action potentials
S: Neurons send signals as action potentials: brief, all-or-nothing spikes of membrane voltage that travel along axons. Hodgkin and Huxley's model of ion currents explaining them is a triumph of biophysics.
H: The action potential
- Stimulus depolarises the membrane past threshold (~−55 mV).
- Voltage-gated Na^{+} channels open: Na^{+} rushes in; potential rises to ~+40 mV.
- Na^{+} channels inactivate; K^{+} channels open: repolarisation and undershoot.
- Refractory period (~1–2 ms) limits firing rate and ensures one-way travel.
- Lasts ~1 ms.
H: Hodgkin–Huxley model
E: C dV/dt = −g_{Na}m^{3}h(V − E_{Na}) − g_{K}n^{4}(V − E_{K}) − g_{L}(V − E_{L}) + I
P: From voltage-clamp experiments on squid giant axons, Hodgkin and Huxley (1952, Nobel 1963) described Na^{+} and K^{+} conductances with gating variables. The model predicts spike shape and speed, decades before channels were seen.
H: Propagation
- Cable theory: signals spread passively and decay over the length constant.
- Unmyelinated axons: ~1 m s^{-1}; speed ∝ √diameter (squid giant axons up to 1 mm wide).
- Myelinated axons: saltatory conduction between nodes of Ranvier; up to ~120 m s^{-1}.
- Multiple sclerosis damages myelin, slowing or blocking signals.
X: Time for a signal to travel 1 m along a myelinated axon at 100 m s^{-1}?
> 10 ms
!: Action potentials don't weaken with distance; they're regenerated along the axon.
Q: What causes the rising phase of an action potential? | Opening of voltage-gated sodium channels letting Na^{+} flow in.
Q: How does myelination speed conduction? | Signals jump between nodes of Ranvier (saltatory conduction).
M1: Hodgkin and Huxley studied: | Squid giant axons | Frog hearts | Human brains | Plants | Large axons.
M2: The refractory period ensures that action potentials: | Travel in one direction | Are larger | Never end | Reverse | Inactivated Na^{+} channels.

## Neural signal processing
S: Neurons combine thousands of inputs, transform them and encode information in spike patterns. The physics of neural computation, from single synapses to networks, inspires both neuroscience and artificial intelligence.
H: Synapses
- Chemical synapses: neurotransmitters released in vesicles (quantal release), binding receptors.
- Excitatory and inhibitory inputs summed in dendrites (spatial and temporal summation).
- Synaptic plasticity: strengths change with activity (long-term potentiation; Hebb: "cells that fire together wire together").
H: Coding
- Rate coding: information in firing rates.
- Temporal coding: precise spike timing, phase relative to brain rhythms.
- Population coding: many neurons jointly.
- Noise from stochastic channels and synapses.
H: Models
- Integrate-and-fire neurons; Hodgkin–Huxley; network models.
- Neural networks in AI loosely inspired by these (Hopfield and Hinton, Nobel Physics 2024 for foundations of machine learning).
H: Energy efficiency
P: The brain's ~86 billion neurons and ~10^{14} synapses run on ~20 W. Spikes are energetically costly, so sparse coding is favoured. Neuromorphic chips mimic spiking computation for efficient hardware.
X: Energy per synaptic event if the brain (20 W) handles ~10^{15} synaptic events per second?
> 20/10^{15} = 2 × 10^{-14} J per event (~5 × 10^{6} k_{B}T)
!: Artificial neural networks are inspired by, but differ greatly from, biological neurons and their spiking dynamics.
Q: What is synaptic plasticity? | Activity-dependent changes in synapse strength, underlying learning and memory.
Q: What is rate coding? | Encoding information in neurons' firing frequency.
M1: The human brain has about: | 86 billion neurons | 1 million | 86 trillion | 1000 | ~10^{11}.
M2: The 2024 Nobel Prize in Physics recognised work on: | Neural networks and machine learning | Exoplanets | Graphene | Gravitational waves | Hopfield and Hinton.

## Muscle contraction
S: Muscles contract when myosin motors pull on actin filaments, sliding them past each other. Driven by ATP and triggered by calcium, this sliding filament mechanism powers every movement and heartbeat.
H: Sliding filament theory
- Sarcomeres (~2.5 μm) contain overlapping thick (myosin) and thin (actin) filaments.
- Myosin heads bind actin, pull (power stroke ~10 nm), release with ATP, re-cock.
- Calcium released from the sarcoplasmic reticulum uncovers binding sites (troponin–tropomyosin).
- H. E. Huxley and A. F. Huxley (1954, separately).
H: Mechanics
E: (F + a)(v + b) = constant :: Hill's force–velocity relation
- Maximum force at zero velocity (isometric); maximum speed at zero load.
- Maximum power at ~⅓ max speed and force.
- Force depends on sarcomere length (overlap).
- Muscle stress ~0.3 MPa regardless of species.
H: Types
- Skeletal (voluntary, striated), cardiac (striated, involuntary), smooth (organs, vessels).
- Fast and slow fibres (sprinting vs endurance).
- Efficiency ~25%; heat production (shivering).
H: Scale
P: Because force ∝ cross-sectional area and muscle stress is roughly constant, small animals appear relatively stronger. Insect flight muscles contract hundreds of times per second using stretch activation.
X: Force from a muscle of cross-section 20 cm^{2} (stress 0.3 MPa)?
> F = 0.3 × 10^{6} × 20 × 10^{-4} = 600 N
!: Muscles can only pull, not push; they work in antagonistic pairs (biceps and triceps).
Q: What triggers muscle contraction? | Calcium release exposing myosin binding sites on actin.
Q: What is Hill's force–velocity relation? | Muscle force decreases hyperbolically as shortening speed increases.
M1: Muscle contraction is powered by: | ATP hydrolysis by myosin | Electricity directly | Heat | Gravity | Molecular motors.
M2: Peak muscle power occurs at about: | One third of maximum speed | Maximum speed | Zero speed | Twice max speed | Hill curve.

## Cellular mechanics
S: Cells are mechanical objects: they have shape, stiffness and the ability to move, divide and exert forces. Their internal skeleton and adhesions let them sense and respond to mechanical cues, which guides development and disease.
H: The cytoskeleton
- **Actin filaments**: cortex, protrusions (lamellipodia, filopodia), contractility with myosin.
- **Microtubules**: stiff (persistence length ~mm), tracks for transport, spindle in division.
- **Intermediate filaments**: tough, resist large strains.
- Dynamic: filaments grow and shrink continuously (treadmilling, dynamic instability).
H: Cell mechanics
- Stiffness ~0.1–10 kPa (brain cells soft, bone cells stiff).
- Viscoelastic; measured by AFM, micropipette aspiration, optical and magnetic tweezers.
- Cancer cells are often softer, aiding invasion.
H: Mechanotransduction
P: Cells sense stiffness and force through focal adhesions, stretch-activated channels and nuclear deformation. Stem cells cultured on soft gels become neurons; on stiff gels, bone-like cells (Engler, 2006). Mechanical forces shape embryos as tissues fold and flow.
H: Motility
- Crawling: actin polymerisation pushes the front; myosin contracts the rear; adhesions grip.
- Speeds ~μm per minute (fibroblasts) to ~20 μm per minute (immune cells).
X: Force from a single actin filament polymerising against a membrane (stall force ~1–2 pN)?
> Hundreds of filaments in a lamellipodium give ~nN total
!: Cells aren't bags of fluid; their mechanics is controlled actively by the cytoskeleton.
Q: What is mechanotransduction? | The process by which cells sense and respond to mechanical forces.
Q: What are the three cytoskeletal filament types? | Actin filaments, microtubules and intermediate filaments.
M1: Stem cells on stiff substrates tend to become: | Bone-like cells | Neurons | Fat cells always | Blood cells | Matrix stiffness.
M2: Cell stiffness is commonly measured with: | Atomic force microscopy | X-rays | MRI only | Thermometers | AFM indentation.

## Tissue mechanics
S: Tissues combine cells and extracellular matrix into materials with remarkable mechanical properties, from soft brain to stiff bone. Their mechanics determines how organs function, heal and fail.
H: Materials
- **Bone**: composite of collagen and hydroxyapatite; E ~10–20 GPa; strong in compression; remodels to load (Wolff's law).
- **Cartilage**: poroelastic, low friction (μ ~0.001).
- **Tendon and ligament**: collagen fibres; E ~1 GPa; toe region at low strain.
- **Skin**: anisotropic, nonlinear; Langer's lines guide surgical incisions.
- **Arteries**: elastin and collagen; stiffening with age raises blood pressure.
- **Brain**: very soft (~1 kPa).
H: Nonlinear and viscoelastic behaviour
- Soft tissues stiffen as collagen fibres straighten (J-shaped stress–strain).
- Creep and relaxation; hysteresis.
- Hyperelastic models (Mooney–Rivlin, Fung).
H: Applications
P: Tissue mechanics guides implant design (matching stiffness to avoid stress shielding), tissue engineering scaffolds, surgical simulation and injury biomechanics (helmet design, crash safety). Elastography imaging (ultrasound, MRI) maps tissue stiffness to detect tumours and liver fibrosis.
X: Why do bone implants of very stiff metal sometimes cause bone loss nearby?
> Stiff implants carry most of the load (stress shielding)
> Bone adapts to reduced stress by resorbing (Wolff's law)
!: Biological tissues aren't simple Hookean materials; most are nonlinear, anisotropic and time-dependent.
Q: What is Wolff's law? | Bone remodels to adapt its structure to the loads it carries.
Q: What is elastography? | Imaging that maps tissue stiffness, often using ultrasound or MRI.
M1: Bone's Young's modulus is about: | 10–20 GPa | 1 kPa | 200 GPa | 1 MPa | Composite.
M2: Soft tissues typically show a stress–strain curve that is: | J-shaped (stiffening) | Linear | Softening | Flat | Collagen recruitment.

## Medical imaging physics
S: Medical imaging uses physics to see inside the body without surgery: X-rays and CT for structure, MRI for soft tissue, ultrasound for real-time images, and nuclear medicine for function. Each relies on a different interaction of radiation or waves with tissue.
H: Main modalities
- **X-ray radiography and CT**: attenuation differences (bone vs soft tissue).
- **MRI**: nuclear magnetic resonance of hydrogen; soft tissue contrast from relaxation times.
- **Ultrasound**: echoes from acoustic impedance changes; Doppler for flow.
- **Nuclear medicine** (SPECT, PET): radioactive tracers reveal metabolism and function.
- **Optical**: endoscopy, OCT, fluorescence.
H: Image quality
- Spatial resolution, contrast, noise (signal-to-noise ratio).
- Trade-offs with dose, scan time and cost.
- Contrast agents: iodine (CT), gadolinium (MRI), microbubbles (ultrasound).
H: Choosing a modality
P: Bone fractures: X-ray. Brain tumour detail: MRI. Pregnancy and heart valves: ultrasound. Cancer spread: PET-CT. Clinicians weigh diagnostic benefit against radiation dose, availability and patient factors.
X: Why can't ultrasound image the brain in adults?
> The skull's bone has very different acoustic impedance and attenuates strongly
> Most energy reflects or is absorbed
!: Every imaging modality shows a physical property (attenuation, relaxation, impedance), not "anatomy" directly; interpretation needs physics.
Q: What does CT measure? | X-ray attenuation in thin slices, reconstructed into 3D images.
Q: Why is MRI good for soft tissue? | Its contrast depends on proton density and relaxation times, which differ between soft tissues.
M1: Which modality uses no ionising radiation? | MRI | CT | PET | X-ray | Magnetic and RF fields.
M2: Iodine contrast agents enhance: | X-ray/CT images | MRI | Ultrasound | PET | High Z absorption.

## Radiation biology
S: Radiation biology studies how ionising radiation damages cells and tissues. Understanding it underpins radiotherapy, which kills tumours, and radiation protection, which keeps doses safe.
H: Damage mechanisms
- **Direct**: radiation ionises DNA.
- **Indirect**: radiation splits water, producing free radicals (OH·) that damage DNA (~⅔ of damage for X-rays).
- DNA damage: base damage, single-strand breaks (repaired easily), double-strand breaks (lethal if misrepaired).
- ~1 Gy causes ~40 double-strand breaks per cell.
H: Cell survival
E: S = e^{−(αD + βD^{2})} :: linear–quadratic model
- α/β ratio: ~10 Gy for tumours and fast-responding tissues; ~3 Gy for late-responding normal tissues.
- Fractionation (spreading dose over sessions) spares normal tissue, which repairs better.
H: The 4 Rs of radiotherapy
- Repair, Reoxygenation (oxygen enhances damage: hypoxic tumours resist), Redistribution (cell-cycle sensitivity), Repopulation.
- Plus radiosensitivity.
H: Effects on people
P: Deterministic effects above thresholds (skin burns, cataracts, radiation sickness: ~1 Gy whole body). Stochastic effects (cancer risk ~5% per Sv, assumed linear without threshold for protection). Linear energy transfer (LET) matters: alphas and neutrons are more damaging per gray (higher RBE).
X: Surviving fraction after 2 Gy with α = 0.3 Gy^{-1}, β = 0.03 Gy^{-2}?
> αD + βD^{2} = 0.6 + 0.12 = 0.72
> S = e^{−0.72} ≈ 0.49
!: Radiation doesn't make the body radioactive (external beams); it damages molecules, chiefly DNA.
Q: What is the linear–quadratic model? | Cell survival S = e^{−(αD + βD^{2})} after dose D.
Q: Why is radiotherapy fractionated? | Normal tissues repair between fractions better than tumours, improving the therapeutic ratio.
M1: Most X-ray DNA damage is: | Indirect, via free radicals | Direct only | From heat | From magnetism | Water radiolysis.
M2: Hypoxic tumour cells are: | More radioresistant | More sensitive | Unaffected | Killed instantly | Oxygen enhancement.

## Optical microscopy
S: Optical microscopes magnify small structures using lenses and visible light. Their resolution is limited by diffraction to about half the wavelength, but clever contrast methods reveal transparent cells in detail.
H: Resolution
E: d = 0.61λ/NA (Rayleigh); d = λ/(2NA) (Abbe)
- NA = n sin θ; oil immersion NA up to ~1.4.
- Best resolution ~200 nm laterally, ~500 nm axially.
H: Contrast methods
- **Bright field**: absorption (needs staining).
- **Dark field**: scattered light only.
- **Phase contrast** (Zernike, Nobel 1953): converts phase shifts in transparent cells to brightness.
- **DIC**: gradients of optical path, 3D-looking relief.
- **Polarised light**: birefringent structures (spindles, collagen).
H: Advanced optics
- **Confocal**: pinhole rejects out-of-focus light: optical sectioning.
- **Two-photon**: deep tissue imaging with infrared; less scattering and photodamage.
- **Light-sheet**: fast, gentle 3D imaging of whole embryos.
- **Adaptive optics**: corrects aberrations in tissue.
X: Resolution of a 1.4 NA oil objective at 500 nm?
> d = 0.61 × 500/1.4 ≈ 220 nm
!: Magnification beyond what the optics can resolve ("empty magnification") reveals no new detail.
Q: What limits optical microscope resolution? | Diffraction: about 0.61λ/NA.
Q: How does phase contrast microscopy work? | It converts phase shifts from transparent specimens into intensity differences.
M1: Confocal microscopy improves: | Optical sectioning by rejecting out-of-focus light | Lateral resolution beyond diffraction greatly | Colour | Speed | Pinhole.
M2: Two-photon microscopy uses: | Infrared light for deep tissue imaging | X-rays | Electrons | Ultraviolet only | Nonlinear excitation.

## Fluorescence microscopy
S: Fluorescence microscopy labels molecules with fluorescent tags and images them with high contrast. It reveals where specific proteins are in living cells and, with super-resolution methods, beats the diffraction limit.
H: Principles
- Excite with one wavelength; collect longer-wavelength emission; filters block excitation light.
- Labels: dyes, quantum dots, fluorescent proteins (GFP from jellyfish, Nobel Chemistry 2008).
- Multicolour imaging; live-cell imaging; biosensors (calcium, voltage).
H: Super-resolution
- **STED** (Hell): depletes fluorescence around a tiny spot: ~30 nm resolution.
- **PALM/STORM** (Betzig, Zhuang, Moerner): switch on sparse single molecules, localise each to ~10–20 nm.
- **SIM**: structured illumination doubles resolution.
- **MINFLUX**: ~1–3 nm.
- Nobel Chemistry 2014 (Betzig, Hell, Moerner).
H: Limits and artefacts
P: Photobleaching (fluorophores destroyed), phototoxicity (light damages cells), labelling density and linkage errors limit what can be seen. Expansion microscopy physically swells samples in a gel to improve effective resolution with ordinary microscopes.
X: How precisely can a single molecule be localised if it emits 1000 photons and the PSF width is 250 nm?
> σ ≈ 250/√1000 ≈ 8 nm
!: Super-resolution methods don't violate diffraction; they use molecular switching or nonlinear effects to sidestep it.
Q: What is GFP? | Green fluorescent protein from jellyfish, used to tag proteins genetically.
Q: How do PALM and STORM beat the diffraction limit? | By activating sparse single molecules and localising each precisely.
M1: STED microscopy uses: | A depletion beam to narrow the fluorescent spot | X-rays | Electrons | Sound | Stimulated emission depletion.
M2: Localisation precision improves with photon number N as: | 1/√N | 1/N | N | √N | Statistical.

## Single-molecule methods
S: Single-molecule techniques watch and manipulate individual biomolecules rather than averages over billions. They reveal heterogeneity, rare events and the step-by-step mechanics of molecular machines.
H: Techniques
- **Optical tweezers** (Ashkin, Nobel 2018): focused lasers trap beads attached to molecules; measure forces ~0.1–100 pN and steps of nanometres.
- **Magnetic tweezers**: apply force and torque; DNA supercoiling.
- **AFM force spectroscopy**: unfold proteins one domain at a time; high-speed AFM films moving proteins.
- **Single-molecule FRET**: distances of 2–10 nm changing in real time.
- **Nanopores**: DNA threaded through pores; current changes read bases (nanopore sequencing).
H: Discoveries
- Kinesin's 8 nm steps; myosin's power stroke.
- RNA polymerase pausing and backtracking.
- Protein folding pathways under force.
- Heterogeneity hidden in bulk averages.
H: Fluctuation theorems
P: Pulling single RNA hairpins repeatedly gives non-equilibrium work distributions; the Jarzynski equality and Crooks theorem recover equilibrium free energies from them (Liphardt, Bustamante, 2002), a direct test of non-equilibrium statistical mechanics.
X: Optical trap stiffness 0.05 pN nm^{-1}; bead displaced 20 nm. Force?
> F = kx = 1 pN
!: Single-molecule results vary from molecule to molecule; that variability is real information, not just noise.
Q: What can optical tweezers measure? | Piconewton forces and nanometre displacements of single molecules.
Q: How does nanopore sequencing work? | DNA passing through a pore changes the ionic current in base-specific ways.
M1: Optical tweezers were developed by: | Arthur Ashkin | Watson | Rutherford | Planck | Nobel 2018.
M2: Single-molecule FRET measures: | Distances of a few nanometres | Masses | Charges | Temperatures | Molecular ruler.

## Biological networks
S: Cells process information through networks of interacting genes, proteins and metabolites. Physics and network theory help explain how these networks produce reliable decisions, rhythms and patterns despite noise.
H: Network types
- Gene regulatory networks: transcription factors switching genes on and off.
- Protein interaction and signalling networks.
- Metabolic networks.
- Neural networks.
H: Motifs and dynamics
- **Negative feedback**: stability, homeostasis, oscillations (circadian clocks).
- **Positive feedback**: bistable switches (cell fate decisions, memory).
- **Feed-forward loops**: filtering noise, timing.
- Synthetic biology built the toggle switch and repressilator (2000).
H: Noise
P: With few molecules per cell, gene expression is noisy (intrinsic and extrinsic noise; Elowitz, 2002). Cells exploit noise (bet-hedging in bacteria, persistence against antibiotics) and suppress it (feedback). Information theory quantifies how much a signalling pathway can transmit (~1–2 bits).
H: Patterns
- Turing patterns: reaction–diffusion creates spots and stripes (zebrafish, digits).
- Morphogen gradients set positional information in embryos (Bicoid in fruit flies).
X: Why does negative feedback with delay produce oscillations?
> Production rises until feedback suppresses it, but the delay overshoots
> Levels fall, feedback releases, production rises again: a cycle (circadian clocks ~24 h)
!: Network diagrams aren't enough; behaviour depends on rates, delays and noise.
Q: What does positive feedback enable in cells? | Bistable switches and irreversible decisions.
Q: What are Turing patterns? | Spatial patterns formed by reaction–diffusion of interacting chemicals.
M1: The repressilator is a: | Synthetic oscillating gene circuit | Protein | Virus | Microscope | Three repressors in a loop.
M2: Gene expression noise is large because: | Molecules are present in small numbers | Cells are hot | DNA is long | Light is bright | Stochastic events.

## Statistical physics of living systems
S: Statistical physics helps explain how collective behaviour in biology emerges from many interacting parts: flocks of birds, bacterial colonies, protein folding, neural activity and evolution itself.
H: Active matter
- Systems of self-propelled units (bacteria, cells, birds, molecular motors) driven out of equilibrium.
- Vicsek model: aligning particles form flocks: a non-equilibrium phase transition.
- Motility-induced phase separation; active turbulence in bacterial suspensions.
H: Criticality and collective behaviour
- Bird flocks (starling murmurations) show scale-free correlations.
- Neural avalanches and the critical brain hypothesis.
- Maximum entropy models of neural and protein data.
H: Evolution as physics
P: Population genetics resembles statistical mechanics: selection acts like an energy, genetic drift like temperature, and fitness landscapes like energy landscapes. Mutation–selection balance, evolutionary game theory and phylodynamics of viruses (tracking SARS-CoV-2 variants) use physical methods.
H: Thermodynamic costs
- Cells spend energy to sense accurately, proofread (kinetic proofreading, Hopfield 1974), and keep time.
- Trade-offs between speed, accuracy and dissipation (thermodynamic uncertainty relations).
X: How does kinetic proofreading improve accuracy?
> An energy-consuming delay step gives wrong substrates extra chances to dissociate
> Error rates multiply: e.g. 10^{-2} × 10^{-2} = 10^{-4}
!: Living systems aren't at thermal equilibrium; equilibrium statistical mechanics applies only partly.
Q: What is active matter? | Systems made of self-propelled units that consume energy, showing collective motion.
Q: What is kinetic proofreading? | An energy-consuming mechanism that improves molecular recognition accuracy beyond equilibrium limits.
M1: The Vicsek model describes: | Flocking of self-propelled particles | Protein folding | DNA replication | Muscle contraction | Collective motion.
M2: In population genetics, genetic drift is analogous to: | Temperature (noise) | Energy | Mass | Pressure | Random fluctuations.

## Computational biophysics
S: Computational biophysics uses simulations and data analysis to study biological molecules and systems, from atomic motions of proteins to whole-cell models. It complements experiments and increasingly predicts biology.
H: Methods
- **Molecular dynamics**: atomistic (fs time steps, μs–ms reach with specialised hardware), coarse-grained (Martini).
- **Quantum mechanics/molecular mechanics (QM/MM)**: enzyme reactions (Karplus, Levitt, Warshel, Nobel Chemistry 2013).
- **Monte Carlo** and enhanced sampling (metadynamics, replica exchange).
- **Free energy calculations** for drug binding.
- **Continuum models**: membranes, cells, tissues (finite elements).
- **Systems biology models**: ODEs and stochastic simulations of networks.
H: Machine learning
P: AlphaFold and RoseTTAFold predict protein structures; generative models design new proteins and drugs; ML force fields approach quantum accuracy at classical cost. Combining physics-based and data-driven methods is now standard.
H: Challenges
- Timescale gap: biology spans femtoseconds to years.
- Force field accuracy; validation against experiment.
- Computational cost; reproducibility.
X: How many time steps to simulate 1 ms of protein dynamics at 2 fs per step?
> 10^{-3}/2 × 10^{-15} = 5 × 10^{11} steps: hence specialised supercomputers
!: A simulation is only as reliable as its model; validate against experimental data.
Q: What is QM/MM? | Treating a reactive region quantum mechanically and the rest with classical force fields.
Q: Why are coarse-grained models used? | They group atoms into larger beads, reaching longer times and sizes.
M1: AlphaFold predicts: | Protein structures | Weather | Galaxies | Stock prices | From sequence.
M2: The main limitation of atomistic MD is: | Short accessible timescales | Too few atoms | Too slow computers only for gases | Lack of physics | Femtosecond steps.
`;
