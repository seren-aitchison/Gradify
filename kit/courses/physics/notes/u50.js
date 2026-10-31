// Unit 50: Philosophy and Foundations of Physics. Format: kit/course/notes.js
export default `
## Scientific realism and instrumentalism
S: Scientific realism holds that our best theories describe a real world, including unobservable things like electrons and quarks. Instrumentalism holds that theories are tools for predicting observations, not literal descriptions. The debate shapes how we interpret physics.
H: Scientific realism
- Mature, successful theories are approximately true.
- Unobservable entities (electrons, fields, black holes) really exist.
- **No-miracles argument** (Putnam): it would be a miracle if theories predicted so well without being roughly true.
- Variants: **entity realism** (Hacking: "if you can spray them, they are real"), **structural realism** (Worrall: the mathematical structure survives theory change).
H: Instrumentalism and anti-realism
- Theories are instruments for organising and predicting observations.
- **Pessimistic meta-induction** (Laudan): many past successful theories (caloric, aether) were false, so current ones may be too.
- **Constructive empiricism** (van Fraassen): aim for empirical adequacy; suspend belief about unobservables.
- Mach and early positivists doubted atoms; Duhem saw theories as classifications.
H: In physics practice
P: Physicists often act as realists about well-tested entities (Higgs boson, neutron stars) and instrumentalists about formalisms (wavefunction collapse, virtual particles). Structural realism fits physics well: Fresnel's equations survived the abandonment of the aether. The quantum wavefunction's status (real "ψ-ontic" or knowledge "ψ-epistemic") is a live realism debate.
X: How does structural realism respond to the aether example?
> The aether as substance was abandoned, but Fresnel's wave equations for light (the structure) carried over to Maxwell's theory
X: Why did Mach doubt atoms?
> They weren't directly observable; he favoured economical descriptions of observable phenomena
K: Realists take theories as true descriptions; instrumentalists see them as predictive tools; structural realism finds a middle way.
!: Predictive success doesn't automatically prove truth; history shows successful theories can rest on false entities.
Q: What is the no-miracles argument? | Science's predictive success would be miraculous unless theories were approximately true.
Q: What is the pessimistic meta-induction? | Since many past successful theories proved false, current ones may also be false.
M1: Entity realism is associated with: | Ian Hacking | Kuhn | Popper | Newton | "If you can spray them..."
M2: Constructive empiricism aims for: | Empirical adequacy | Truth about unobservables | Paradigm shifts | Falsification only | Van Fraassen.

## Explanation and prediction in physics
S: Physics both predicts what will happen and explains why it happens. Philosophers distinguish the two: a good predictive model may not explain, and a deep explanation may not predict precisely. Understanding this helps judge theories and communicate science.
H: Models of explanation
- **Deductive-nomological (Hempel)**: explain by deducing the phenomenon from laws plus initial conditions.
- **Causal-mechanical (Salmon)**: explain by showing causal processes.
- **Unificationist (Kitcher, Friedman)**: explain by fitting phenomena into a unified framework.
- **Pragmatic** views: explanations answer particular "why" questions in context.
H: Prediction versus explanation
- Prediction without explanation: Babylonian astronomy, machine-learning models, Balmer's formula before Bohr.
- Explanation without precise prediction: evolution, turbulence, earthquakes, chaotic weather beyond two weeks.
- Asymmetry problem: a flagpole's height explains its shadow, but the shadow length doesn't explain the height, even though either can be derived from the other.
E: Explanandum ← Laws + initial conditions :: Hempel's D-N schema
H: In modern physics
P: Effective field theories predict without knowing ultimate causes. Symmetry explanations (why charge is conserved) differ from dynamical ones. Statistical mechanics explains thermodynamics by microstates. Explanations at different levels (molecules, fluids) can both be valid. Prediction tests theories; explanation gives understanding.
X: Balmer's 1885 formula predicted hydrogen lines. Did it explain them?
> No: it fitted the data empirically; Bohr's model (1913) and quantum mechanics explained why
X: Why does the flagpole example challenge the D-N model?
> The model allows deriving the height from the shadow, but that isn't a genuine explanation; causation matters
K: Explaining and predicting are distinct goals; good physics often achieves both, but not always.
!: A model that predicts well, such as a neural network, may provide little physical understanding.
Q: What is the deductive-nomological model? | Explanation by logically deducing a phenomenon from general laws and initial conditions.
Q: Give an example of prediction without explanation. | Balmer's formula for hydrogen lines before quantum theory.
M1: The flagpole problem shows: | Explanation has a direction (asymmetry) | Shadows don't exist | Laws are false | Prediction is impossible | Causal asymmetry.
M2: Unificationist explanation emphasises: | Fitting many phenomena into one framework | Causal processes only | Single events | Measurement | Kitcher, Friedman.

## Laws of nature
S: Laws of nature, like Newton's gravitation or the conservation of energy, seem to express how the universe must behave. Philosophers ask what makes something a law rather than a coincidence, and whether laws describe regularities or govern them.
H: What distinguishes a law?
- Laws are universal and support counterfactuals ("if this were released, it would fall").
- Accidental generalisations don't: "all gold spheres are smaller than 1 km" vs "all uranium spheres are smaller than 1 km" (critical mass makes the latter law-like).
H: Philosophical accounts
- **Regularity (Humean)**: laws summarise patterns; **best-system account** (Lewis): laws are the axioms of the simplest, strongest system describing the world.
- **Necessitarian** (Armstrong, Dretske, Tooley): laws are relations of necessity between properties.
- **Dispositional** (Bird): laws follow from powers essential to properties (charge disposes to attract/repel).
- **Primitivism** (Maudlin): laws are fundamental and govern evolution.
E: F = Gm_{1}m_{2}/r^{2} :: an example of a law of nature
H: Laws in physics
P: Physical laws vary in type: dynamical laws (Newton, Schrödinger), conservation laws (from symmetries), constraints (Gauss's law), statistical laws (second law of thermodynamics), and phenomenological laws (Ohm's, Hooke's). Many "laws" hold only approximately or in domains (Hooke's law fails beyond elastic limits). Constants of nature and whether laws change over time are tested by observations of distant quasars and atomic clocks.
X: Why is "all uranium spheres are smaller than 1 km" law-like?
> Physics (critical mass and chain reactions) guarantees no such sphere could exist; it supports counterfactuals
X: Is Ohm's law a fundamental law?
> No: it's an empirical, approximate constitutive relation for many materials, failing for diodes and at high fields
K: Laws support counterfactuals and are universal; philosophers debate whether they merely describe patterns or govern events.
!: Many textbook "laws" are approximate empirical relations valid only in limited regimes.
Q: What is the best-system account of laws? | Laws are the axioms of the deductive system best balancing simplicity and strength in describing the world.
Q: What distinguishes laws from accidental generalisations? | Laws support counterfactuals and hold necessarily or robustly.
M1: Hooke's law is an example of: | A phenomenological law with limited validity | A fundamental conservation law | A symmetry | An accident | Fails beyond elastic limit.
M2: Humean accounts treat laws as: | Summaries of regularities | Necessary connections | Divine commands | Fictions | Patterns, not governors.

## Causality and determinism
S: Causality concerns how events bring about others; determinism holds that the present state fixes the entire future. Physics both supports and challenges these ideas, from Laplace's demon to relativistic light cones and quantum randomness.
H: Determinism in classical physics
- **Laplace's demon**: knowing all positions and momenta, and the laws, one could compute the entire future and past.
- Classical mechanics is mostly deterministic, but exceptions exist: **Norton's dome** (non-unique solutions), runaway solutions, and singularities.
- **Chaos**: deterministic but unpredictable in practice; determinism isn't predictability.
H: Causality in relativity
- Light cones define causal structure: only timelike or lightlike separated events can be causally connected.
- No signals faster than light; spacelike-separated events have no fixed time order.
- Closed timelike curves (Gödel universe, wormholes) would threaten causal order.
E: ds^{2} = c^{2}dt^{2} − dx^{2} > 0 :: timelike (causally connectable) separation
H: Quantum mechanics
P: Schrödinger evolution is deterministic, but measurement outcomes are probabilistic in standard interpretations. Many-worlds and Bohmian mechanics restore determinism differently. Bell's theorem shows quantum correlations can't be explained by local deterministic hidden variables. The arrow of time and causal asymmetry may stem from low-entropy initial conditions. Causal inference (Pearl) formalises causation via interventions.
X: Are two events 3 light-years apart, 1 year apart in time, causally connectable?
> ds^{2} = (1)^{2} − (3)^{2} < 0 (in light-year units): spacelike, so no
X: A chaotic system with λ = 1 per day: is it deterministic?
> Yes; equations determine the future, but practical prediction fails after a few Lyapunov times
K: Determinism means the state fixes the future; relativity limits causal influence to light cones; quantum mechanics complicates both.
!: Determinism and predictability are different: chaotic systems are deterministic but unpredictable.
Q: What is Laplace's demon? | A hypothetical intellect that could predict the entire future from complete knowledge of the present state and laws.
Q: What is Norton's dome? | A classical mechanics example where a particle can start moving spontaneously, showing non-uniqueness.
M1: Spacelike-separated events: | Cannot influence each other | Always have fixed order | Are simultaneous for all | Are causally linked | Outside light cones.
M2: Bohmian mechanics is: | Deterministic | Purely random | Classical only | Non-quantum | Particles guided by the wavefunction.

## Probability and chance
S: Probability is everywhere in physics, from statistical mechanics to quantum measurement. But what does a probability mean? Interpretations range from long-run frequencies and objective propensities to degrees of belief, and physics uses them in different ways.
H: Interpretations
- **Frequentist**: probability = limiting relative frequency in repeated trials.
- **Propensity** (Popper): objective dispositions of systems (a radioactive nucleus's tendency to decay).
- **Bayesian (subjective)**: degrees of belief updated by evidence.
- **Logical/objective Bayesian**: rational degrees of belief given information (Jaynes's maximum entropy).
E: P(H|D) = P(D|H)P(H)/P(D) :: Bayes' theorem
H: In physics
- **Statistical mechanics**: probabilities over microstates; justified by ergodicity, typicality or ignorance.
- **Quantum mechanics**: Born rule P = |⟨a|ψ⟩|^{2}; is this irreducible chance?
- **Deterministic chance**: coin flips or chaotic systems have well-defined probabilities despite deterministic laws.
- **Many-worlds**: deriving the Born rule (Deutsch–Wallace decision theory) is debated.
H: Practical issues
P: Experimental physics uses both frequentist (confidence intervals, p-values) and Bayesian (posteriors, credible intervals) methods. Priors matter when data are weak. The principle of indifference can give paradoxes (Bertrand's paradox) if the right symmetry isn't specified. Understanding probability prevents misinterpreting results, e.g. confusing P(data|hypothesis) with P(hypothesis|data).
X: A detector flags a rare particle (1 in 1000 events) with 99% efficiency and 1% false positives. If it flags an event, what's the probability it's real?
> P(real|flag) = 0.99 × 0.001/(0.99 × 0.001 + 0.01 × 0.999) ≈ 0.00099/0.01098 ≈ 9%
X: Why is a radioactive decay a candidate for objective chance?
> No known hidden variable determines when a given nucleus decays; quantum mechanics gives only probabilities
K: Probability can mean frequencies, propensities or degrees of belief; physics uses all, and the quantum case raises deep questions.
!: Confusing P(data|hypothesis) with P(hypothesis|data) is the prosecutor's fallacy.
Q: What is the Born rule? | The probability of a measurement outcome equals the squared magnitude of the corresponding amplitude.
Q: What is Bertrand's paradox? | Different reasonable ways of choosing a "random chord" give different probabilities, showing the need to specify sampling.
M1: Bayesian probability represents: | Degrees of belief | Only long-run frequency | Certainty | Objective propensity only | Updated by evidence.
M2: A fair coin flip is an example of: | Deterministic chance | Quantum randomness necessarily | Impossible probability | Pure belief only | Classical dynamics, probabilistic outcome.

## Measurement and observation
S: Measurement connects theory to the world, but it is never simple. Observations depend on instruments, calibration, theory and interpretation, and in quantum mechanics measurement plays a uniquely puzzling role.
H: Theory-ladenness
- Observations are interpreted through theory (Hanson, Kuhn): a physicist "sees" a particle track in a bubble chamber.
- Instruments embody theories: telescopes depend on optics, thermometers on thermal expansion.
- Coherence: different methods agreeing (Perrin's atom counting) builds confidence.
H: Metrology and units
- Measurement requires standards and traceability; SI units now defined via fixed constants.
- Uncertainty is intrinsic to measurement; results are value ± uncertainty.
- Operationalism (Bridgman): concepts are defined by measurement procedures; criticised as too restrictive.
H: The quantum case
P: In quantum mechanics measurement isn't passive: outcomes are probabilistic and states change ("collapse"). What counts as a measurement, and when, is the measurement problem. Decoherence explains why interference vanishes on macroscopic scales but not why a single outcome occurs. Quantum non-demolition and weak measurements show subtle control over disturbance.
E: u_{c} = √(Σu_{i}^{2}) :: combining measurement uncertainties
X: Perrin (1908–1909) measured Avogadro's number in several independent ways. Why was that convincing?
> Brownian motion, sedimentation, radioactivity and other methods all gave ~6 × 10^{23}, a coincidence hard to explain unless atoms are real
X: Why is a thermometer reading theory-laden?
> Its scale assumes uniform expansion of the liquid with temperature, a theoretical assumption
K: Measurement depends on theory, instruments and standards; agreement of independent methods builds trust, and quantum measurement is philosophically special.
!: "Raw data" never comes without interpretation; instruments and analysis embed assumptions.
Q: What is theory-ladenness of observation? | The idea that what we observe and how we describe it depends on theoretical background.
Q: How did Perrin support atomism? | By measuring Avogadro's number consistently using several independent methods.
M1: Operationalism defines concepts by: | Measurement procedures | Mathematics only | Intuition | Laws | Bridgman.
M2: Decoherence explains: | Loss of observable interference in large systems | Why one outcome occurs | Faster-than-light signalling | Gravity | Environment entanglement.

## The problem of induction
S: Physics generalises from finite observations to universal laws, but logic alone cannot justify this leap. Hume's problem of induction asks why past regularities should continue; responses include falsificationism, Bayesian reasoning and pragmatic justifications.
H: Hume's challenge
- Inductive inference: "the Sun has risen every day, so it will rise tomorrow."
- No deductive guarantee; justifying induction by its past success is circular.
- Yet science relies on induction constantly.
H: Responses
- **Popper**: science doesn't use induction; it proposes conjectures and tries to falsify them.
- **Bayesianism**: evidence increases probability of hypotheses; priors and likelihoods formalise learning.
- **Pragmatic (Reichenbach)**: if any method works, induction will; it's the best bet.
- **Inference to the best explanation**: accept the hypothesis that best explains the evidence.
- **Goodman's new riddle** ("grue"): which predicates project into the future?
E: P(H|E) > P(H) if P(E|H) > P(E) :: Bayesian confirmation
H: In physics
P: Physicists trust laws tested across vast ranges (e.g. constants unchanged across billions of years). Symmetries (time-translation invariance) support uniformity of nature. Extrapolation beyond tested regimes (Planck scale, early universe) is risky. Machine learning raises new versions of the problem: models generalise from training data but may fail outside it.
X: Why doesn't Popper's view fully escape induction?
> Choosing to rely on a well-corroborated theory for future predictions still assumes the future resembles the past
X: What does "grue" (green before 2030, blue after) show?
> The same evidence supports incompatible predictions depending on which predicates we project, so induction needs more than data
K: Induction can't be justified deductively; science manages it through testing, probability and the best available explanations.
!: Past success doesn't guarantee future success, especially when extrapolating far beyond tested regimes.
Q: What is Hume's problem of induction? | There is no non-circular justification for inferring future regularities from past ones.
Q: How does Popper respond to the problem of induction? | By arguing science proceeds through conjecture and falsification rather than induction.
M1: Goodman's "grue" problem concerns: | Which predicates are projectible | Colour vision | Quantum states | Measurement errors | New riddle of induction.
M2: Inference to the best explanation chooses: | The hypothesis that best explains the evidence | The simplest data | The oldest theory | Random hypotheses | Abduction.

## Reductionism and emergence
S: Reductionism holds that complex phenomena can be explained by simpler underlying parts and laws. Emergence holds that new properties and laws arise at higher levels that cannot be practically or even in principle derived from lower ones. Physics offers striking examples of both.
H: Reductionism
- **Ontological**: everything is made of fundamental particles and fields.
- **Theory reduction** (Nagel): higher-level laws derived from lower-level ones plus bridge laws (thermodynamics from statistical mechanics).
- **Methodological**: understand systems by studying parts.
- Successes: chemistry from quantum mechanics, gas laws from kinetic theory.
H: Emergence
- **Weak emergence**: higher-level behaviour follows from parts but is hard to predict without simulation (flocking, turbulence).
- **Strong emergence**: genuinely new causal powers not derivable from parts (controversial; consciousness is a proposed example).
- Anderson's "More is different" (1972): symmetry breaking, superconductivity and phases need concepts absent at lower levels.
- Universality: critical exponents independent of microscopic details.
H: Physics examples
P: Temperature and entropy are emergent from microscopic motions. Quasiparticles (phonons, holes, anyons) exist only collectively. The fractional quantum Hall effect has fractional charges absent in electrons. Effective field theories show how low-energy physics decouples from high-energy details. Some physicists speculate spacetime itself is emergent from quantum entanglement.
E: S = k_{B} ln W :: entropy as an emergent quantity from microstates
X: Is temperature reducible to molecular motion?
> Largely: it relates to average kinetic energy and statistical distributions, but only defined meaningfully for many particles in equilibrium
X: Why is superconductivity cited as emergent?
> Zero resistance and the Meissner effect arise from collective Cooper pairing, not properties of individual electrons
K: Reductionism explains wholes by parts; emergence highlights new collective properties and laws, and both are essential in physics.
!: "Emergent" doesn't mean mysterious; most physical emergence is weak and follows from the parts in principle.
Q: What did Anderson mean by "More is different"? | Each level of complexity requires new concepts and laws not obvious from lower levels.
Q: What is weak emergence? | Higher-level behaviour derivable from parts in principle but practically unpredictable without simulation.
M1: Phonons are an example of: | Quasiparticles arising collectively | Fundamental particles | Photons | Black holes | Lattice vibrations.
M2: Universality in critical phenomena supports: | Independence from microscopic details | Strict reductionism only | Strong emergence of consciousness | Determinism | Same exponents, different systems.

## Space and time
S: What are space and time? Are they containers that exist independently, or just relations between objects? The debate between Newton and Leibniz continues through relativity, cosmology and quantum gravity.
H: Substantivalism vs relationalism
- **Newton**: absolute space and time exist independently of matter.
- **Bucket argument**: water's concave surface in a rotating bucket shows rotation relative to absolute space.
- **Leibniz**: space and time are relations among objects; principle of sufficient reason and identity of indiscernibles argue against absolute space.
- **Mach**: inertia arises from relation to distant masses (Mach's principle), inspiring Einstein.
H: Time
- **Presentism**: only the present exists.
- **Eternalism (block universe)**: past, present and future equally exist; supported by relativity of simultaneity.
- **Growing block**: past and present exist; future does not.
- **Arrow of time**: thermodynamic, cosmological, psychological and causal arrows.
E: Δt' = γ(Δt − vΔx/c^{2}) :: simultaneity depends on frame
H: Modern physics
P: Special relativity merges space and time into spacetime; simultaneity is frame-dependent. General relativity makes spacetime dynamical, curved by matter. Quantum gravity approaches (loop quantum gravity, holography) suggest spacetime may be emergent. The "problem of time" arises because the Wheeler–DeWitt equation has no time variable.
X: Two flashes are simultaneous in one frame, 3 × 10^{8} m apart. In a frame moving at 0.6c along that line, what time separation?
> γ = 1.25; Δt' = −γvΔx/c^{2} = −1.25 × 0.6 × 1 s = −0.75 s
X: How does Newton's bucket argue for absolute space?
> The water's curvature appears only when it rotates, apparently relative to space itself, not to the bucket
K: The nature of space and time remains debated: substance or relations, block or flowing, fundamental or emergent.
!: Relativity of simultaneity doesn't mean "everything is relative"; spacetime intervals are invariant.
Q: What is Mach's principle? | The idea that local inertia is determined by the distribution of distant matter.
Q: What is the block universe view? | Past, present and future are all equally real in four-dimensional spacetime.
M1: Leibniz held that space is: | Relational | Absolute | Illusory | Infinite and empty | Relations between objects.
M2: The Wheeler–DeWitt equation leads to: | The problem of time | Mach's principle | Absolute space | Determinism only | No time parameter.

## The nature of spacetime
S: General relativity treats spacetime as a dynamical, curved entity that carries energy and waves. Yet the hole argument, quantum gravity and holography raise questions about whether spacetime points are real and whether spacetime is fundamental at all.
H: Spacetime in general relativity
- Geometry is determined by matter and energy via Einstein's equations.
- Spacetime has dynamical degrees of freedom: gravitational waves carry energy (LIGO).
- Diffeomorphism invariance: coordinates have no physical meaning.
E: G_{μν} = (8πG/c^{4})T_{μν} :: Einstein field equations
H: The hole argument
- Einstein (1913) worried that diffeomorphisms of spacetime inside a matter-free "hole" seem to give different solutions, threatening determinism.
- Resolution: points of spacetime have no individual identity apart from the metric; diffeomorphic solutions represent the same physical situation.
- Supports a form of relationalism or "sophisticated substantivalism".
H: Beyond classical spacetime
P: Quantum gravity programmes: string theory (spacetime from strings and branes), loop quantum gravity (discrete spatial quanta), causal set theory (spacetime as discrete events), asymptotic safety. Holography (AdS/CFT) suggests a gravitating spacetime can be equivalent to a lower-dimensional quantum theory without gravity; entanglement (ER = EPR, Ryu–Takayanagi) seems to build spacetime geometry. Planck length ~1.6 × 10^{-35} m may mark the scale where classical spacetime fails.
E: l_{P} = √(ħG/c^{3}) ≈ 1.6 × 10^{-35} m :: Planck length
X: Ratio of Planck length to proton radius (0.84 fm)?
> 1.6 × 10^{-35}/8.4 × 10^{-16} ≈ 2 × 10^{-20}
X: What does diffeomorphism invariance imply for coordinates?
> Physical predictions must not depend on the coordinate system; only invariant relations matter
K: In GR spacetime is dynamical and coordinate-free; quantum gravity hints it may emerge from deeper structures.
!: Coordinates in GR are labels, not physical things; mistaking them for physical can cause confusion (e.g. about horizons).
Q: What is the hole argument? | Einstein's argument that diffeomorphism freedom seemed to make GR indeterministic, resolved by denying spacetime points independent identity.
Q: What does the Ryu–Takayanagi formula relate? | Entanglement entropy in a boundary theory to the area of surfaces in the bulk spacetime.
M1: The Planck length is about: | 10^{-35} m | 10^{-15} m | 10^{-10} m | 10^{-20} m | √(ħG/c^{3}).
M2: Gravitational waves show spacetime: | Has its own dynamics and carries energy | Is static | Is absolute | Is illusory | Detected by LIGO.

## Interpretations of quantum mechanics
S: Quantum mechanics predicts experimental results with extraordinary accuracy, yet physicists disagree about what it says reality is like. Interpretations differ on whether the wavefunction is real, whether collapse happens and whether outcomes are determined.
H: The puzzle
- Superposition, entanglement and probabilistic measurement outcomes.
- Schrödinger evolution is linear and deterministic; measurements seem to give definite, random results.
- What is the wavefunction: physical reality, knowledge or a tool?
H: Main interpretations
- **Copenhagen** (Bohr, Heisenberg): complementarity; classical measurement apparatus; collapse on measurement.
- **Many-worlds** (Everett): no collapse; all outcomes occur in branching worlds.
- **Pilot-wave / Bohmian**: particles have definite positions guided by the wavefunction; nonlocal and deterministic.
- **Objective collapse** (GRW, Penrose): collapse is a real physical process.
- **QBism** and **relational QM**: quantum states are agents' beliefs or relative to observers.
- **Consistent histories**, **transactional**, **modal** interpretations.
H: Can experiments decide?
P: Most interpretations make identical predictions for standard experiments; they differ philosophically. Objective collapse theories are testable in principle (macroscopic superpositions, spontaneous heating); experiments with large molecules and optomechanics constrain them. Bell tests rule out local hidden variables, constraining all interpretations. Surveys show physicists divided, with Copenhagen-like and many-worlds views common.
E: |ψ⟩ = α|0⟩ + β|1⟩ → outcome 0 with P = |α|^{2} :: Born rule in all interpretations
X: Which interpretations are deterministic?
> Many-worlds (unitary evolution of the universal wavefunction) and Bohmian mechanics (particle trajectories)
X: Which interpretation could be falsified by experiment?
> Objective collapse theories, through predicted deviations such as extra heating or limits on superposition sizes
K: Interpretations agree on predictions but disagree about reality; only collapse models make distinct testable predictions.
!: "Shut up and calculate" works for predictions but leaves the measurement problem unresolved.
Q: What does QBism hold? | Quantum states represent an agent's personal degrees of belief about outcomes.
Q: Why are most interpretations experimentally equivalent? | They reproduce the same Born-rule predictions for standard quantum experiments.
M1: Many-worlds denies: | Wavefunction collapse | Superposition | Entanglement | Unitary evolution | All branches exist.
M2: GRW is an example of: | Objective collapse theory | Hidden variables | Many-worlds | QBism | Spontaneous localisation.

## Copenhagen interpretation
S: The Copenhagen interpretation, developed by Bohr, Heisenberg and others in the 1920s, became the standard view taught in textbooks. It emphasises measurement, complementarity and the role of classical concepts, though it is really a family of related views.
H: Main ideas
- **Complementarity** (Bohr): wave and particle descriptions are complementary; experiments reveal one or the other.
- **Classical apparatus**: measurement results must be described in classical language.
- **Collapse**: measurement yields a definite outcome; the wavefunction is updated (projection postulate, von Neumann).
- **Probabilistic**: outcomes governed by the Born rule; no deeper determinism.
- The wavefunction may represent knowledge or potentialities rather than physical reality (Heisenberg).
E: |ψ⟩ → |a_{i}⟩ with P = |⟨a_{i}|ψ⟩|^{2} :: projection postulate
H: Criticisms
- Vague about where the quantum–classical boundary (Heisenberg cut) lies.
- Treats measurement as primitive without physical definition.
- Einstein objected to incompleteness ("God does not play dice"); EPR (1935).
- **Wigner's friend** and extended versions (Frauchiger–Renner) stress observer-dependence.
H: Legacy
P: Copenhagen pragmatism allowed rapid progress in atomic, nuclear and solid-state physics. Decoherence theory (Zeh, Zurek) clarified why classical behaviour appears, filling in some of the "cut". Modern neo-Copenhagen views (QBism, relational QM) refine its epistemic stance. Bohr's emphasis on experimental context remains influential.
X: What is the Heisenberg cut?
> The boundary between the quantum system and the classical measuring apparatus, which Copenhagen leaves movable and unspecified
X: Wigner's friend: what's the puzzle?
> The friend measures a system and sees a result; Wigner, outside, describes friend and system in superposition; whose description is right?
K: Copenhagen emphasises measurement, complementarity and probability; it works practically but leaves the quantum–classical boundary vague.
!: There isn't a single Copenhagen interpretation; Bohr's and Heisenberg's views differed.
Q: What is complementarity? | Wave and particle aspects are mutually exclusive yet both needed for a complete description.
Q: What is the projection postulate? | Upon measurement, the state jumps to the eigenstate corresponding to the observed outcome.
M1: Einstein's objection was mainly that QM is: | Incomplete | Too accurate | Classical | Unfalsifiable only | EPR argument.
M2: Decoherence helps explain: | Why macroscopic objects appear classical | Why collapse is real | Faster-than-light signals | Nothing | Environment suppresses interference.

## Many-worlds interpretation
S: The many-worlds interpretation, proposed by Hugh Everett in 1957, takes the quantum wavefunction literally and denies collapse. Every possible measurement outcome occurs, each in a separate branch of reality, which raises deep questions about probability and identity.
H: Core ideas
- The universal wavefunction always evolves unitarily via the Schrödinger equation.
- Measurement entangles observer and system; each outcome corresponds to a branch.
- Decoherence makes branches effectively independent (no interference between them).
- No special role for observers or collapse; fully deterministic at the level of the wavefunction.
E: |ψ⟩|O⟩ → α|0⟩|O_{0}⟩ + β|1⟩|O_{1}⟩ :: measurement creates branches
H: Challenges
- **Probability problem**: if all outcomes occur, why use the Born rule |α|^{2}? Deutsch–Wallace decision-theoretic arguments and self-locating uncertainty attempt answers.
- **Preferred basis problem**: why branch in position rather than another basis? Decoherence selects pointer states.
- **Ontological extravagance**: countless worlds (though only one wavefunction).
- Personal identity across branching.
H: Appeal
P: Many-worlds is simple mathematically (no extra postulates), local in a certain sense, and fits quantum cosmology where no outside observer exists. It's popular among some cosmologists and quantum computing researchers (Deutsch). Empirically it's equivalent to standard quantum mechanics.
X: In many-worlds, what happens when you measure a qubit in (|0⟩ + |1⟩)/√2?
> You become entangled: one branch with you seeing 0, another with you seeing 1, each with weight ½
X: Why can't branches communicate?
> Decoherence makes them orthogonal and practically irreversible, eliminating interference
K: Many-worlds keeps only unitary evolution; outcomes all occur in branches, but deriving probabilities remains debated.
!: "Worlds" are not separately created universes but effectively independent components of one universal wavefunction.
Q: Who proposed the many-worlds interpretation? | Hugh Everett III, in 1957.
Q: What is the probability problem in many-worlds? | Explaining why Born-rule weights act as probabilities when all outcomes occur.
M1: Many-worlds evolution is: | Always unitary | Sometimes collapsing | Random | Classical | No collapse postulate.
M2: Branches are separated by: | Decoherence | Space | Gravity | Time travel | Interference suppressed.

## Pilot-wave theory
S: Pilot-wave theory, developed by de Broglie (1927) and revived by David Bohm (1952), says particles always have definite positions, guided by the wavefunction. It reproduces quantum predictions deterministically, at the price of explicit nonlocality.
H: The theory
- The wavefunction evolves by the Schrödinger equation, as usual.
- Particles have positions guided by the guidance equation: dx/dt = (ħ/m)Im(∇ψ/ψ).
- Initial positions distributed as |ψ|^{2} (quantum equilibrium) reproduce the Born rule.
- Measurement outcomes are determined by hidden particle positions; no collapse needed (empty branches don't affect particles).
E: dx/dt = (ħ/m) Im(∇ψ/ψ) :: guidance equation
E: Q = −(ħ^{2}/2m)∇^{2}|ψ|/|ψ| :: quantum potential
H: Features
- **Nonlocal**: the velocity of one particle depends instantaneously on others' positions in entangled states; consistent with Bell's theorem.
- **Contextual**: spin outcomes depend on measurement arrangement.
- Double slit: each particle goes through one slit; the wave goes through both and guides it to an interference pattern.
- Fits non-relativistic QM perfectly; relativistic and field versions are harder.
H: Assessment
P: Bell admired Bohmian mechanics for showing hidden variables are possible (contrary to von Neumann's flawed "proof"). Critics cite nonlocality, a preferred foliation of spacetime and the "surreal trajectories" puzzle. Walking-droplet experiments (Couder) offer classical analogues. Predictions match standard QM in equilibrium; non-equilibrium (non-|ψ|^{2}) distributions could in principle differ.
X: In Bohmian mechanics, does an electron pass through one slit or both?
> One slit; its trajectory is determined by its initial position and guided by the wave passing through both
X: Why is pilot-wave theory consistent with Bell's theorem?
> It's explicitly nonlocal; Bell's theorem only rules out local hidden variables
K: Pilot-wave theory gives definite particle trajectories guided by the wavefunction, restoring determinism with nonlocality.
!: Bohmian mechanics isn't a classical theory; its nonlocal quantum potential has no classical analogue.
Q: What is the guidance equation? | The rule giving particle velocities from the wavefunction's phase gradient.
Q: What is quantum equilibrium? | Particle positions distributed according to |ψ|^{2}, reproducing quantum predictions.
M1: Pilot-wave theory was revived by: | David Bohm | Hugh Everett | Niels Bohr | Erwin Schrödinger | 1952.
M2: Bohmian mechanics is: | Deterministic and nonlocal | Local and random | Classical | Collapse-based | Hidden positions.

## Objective collapse theories
S: Objective collapse theories modify quantum mechanics so that wavefunctions collapse spontaneously and physically, rarely for single particles but rapidly for large objects. They solve the measurement problem with new physics that can be tested experimentally.
H: GRW and CSL
- **GRW** (Ghirardi, Rimini, Weber, 1986): each particle undergoes random localisations at rate λ ≈ 10^{-16} s^{-1} with width ~100 nm.
- A macroscopic object with N ~ 10^{23} particles collapses in ~10^{-7} s, since one localisation of any particle collapses the whole entangled state.
- **CSL** (continuous spontaneous localisation): continuous version coupled to mass density.
E: Λ_{eff} = Nλ :: amplification of collapse rate
H: Gravity-related collapse
- **Diósi–Penrose**: superpositions of different mass distributions collapse with time τ ≈ ħ/E_{G}, where E_{G} is the gravitational self-energy of the difference.
- Links quantum mechanics with gravity.
E: τ ≈ ħ/E_{G} :: Diósi–Penrose collapse time
H: Testing
P: Predictions include tiny spontaneous heating, X-ray emission from collapse noise and limits on superpositions of large molecules. Experiments with matter-wave interferometry (molecules over 25 000 u), optomechanical oscillators, cold atoms, LISA Pathfinder and underground X-ray detectors (which ruled out the simplest Diósi–Penrose version in 2020) constrain parameter space. Collapse models also face challenges with relativistic formulations and energy non-conservation.
X: How long for a dust grain with 10^{16} nucleons to collapse in GRW?
> Rate = 10^{16} × 10^{-16} s^{-1} = 1 s^{-1}: about 1 s
X: How long for a single nucleon?
> 1/λ = 10^{16} s ≈ 300 million years
K: Collapse models make wavefunction collapse a real physical process, negligible for atoms, rapid for macroscopic objects, and testable.
!: Collapse theories aren't just interpretations; they predict deviations from standard quantum mechanics.
Q: What does GRW stand for? | Ghirardi–Rimini–Weber spontaneous localisation theory.
Q: How are collapse models tested? | By searching for deviations like spontaneous heating, X-ray emission or failed interference of large objects.
M1: In GRW, macroscopic objects collapse quickly because: | Collapse rates add over many particles | Gravity is stronger | They are classical | Observers watch them | Nλ amplification.
M2: Diósi–Penrose links collapse to: | Gravity | Electric charge | Spin | Temperature | Gravitational self-energy.

## Quantum measurement problem
S: The quantum measurement problem asks how definite outcomes arise from quantum superpositions, given that the Schrödinger equation never produces a single result. It is the central puzzle of quantum foundations, and different interpretations offer different solutions.
H: Statement of the problem
- Three claims are jointly inconsistent (Maudlin):
- The wavefunction is a complete description.
- The wavefunction always evolves linearly (Schrödinger).
- Measurements have single definite outcomes.
- Solutions deny one: hidden variables (deny 1), collapse (deny 2), many-worlds (deny 3).
H: The role of decoherence
- Interaction with the environment entangles the system, suppressing interference between pointer states.
- The reduced density matrix becomes diagonal: ρ ≈ |α|^{2}|0⟩⟨0| + |β|^{2}|1⟩⟨1|.
- Explains why we don't see macroscopic superpositions, but not why one outcome is realised (the "problem of outcomes").
E: ρ_{S} = Tr_{E}|Ψ⟩⟨Ψ| → diagonal in the pointer basis :: decoherence
H: Thought experiments
P: Schrödinger's cat (1935) highlights the absurdity of macroscopic superpositions. Wigner's friend and its extensions (Frauchiger–Renner 2018, Brukner) show contradictions if all observers apply quantum mechanics universally with certain assumptions. Experiments with photons test "observer-independent facts" no-go theorems. The problem remains unresolved, though many physicists consider decoherence plus an interpretation sufficient.
X: Which of Maudlin's three claims does Bohmian mechanics reject?
> That the wavefunction is complete: it adds particle positions
X: Decoherence time for a dust grain in air is ~10^{-31} s. Implication?
> Superpositions of macroscopic positions lose coherence essentially instantly, explaining classical appearance
K: The measurement problem is the conflict between linear evolution and definite outcomes; decoherence explains appearances but not uniqueness.
!: Decoherence alone doesn't solve the measurement problem; it still leaves an improper mixture of possible outcomes.
Q: What is Schrödinger's cat meant to illustrate? | The apparent absurdity of applying superposition to macroscopic objects.
Q: What does decoherence explain and not explain? | It explains suppression of interference, not why a single outcome occurs.
M1: Many-worlds resolves the problem by denying: | That measurements have single outcomes | Linear evolution | Completeness | Probability | Every outcome occurs.
M2: Collapse theories deny: | Purely linear evolution | Definite outcomes | Completeness | Probabilities | Add nonlinear collapse.

## Locality and nonlocality
S: Locality means things are influenced only by their immediate surroundings, with influences spreading no faster than light. Quantum entanglement produces correlations that violate locality assumptions, though without allowing faster-than-light signalling.
H: Concepts of locality
- **Signal locality**: no faster-than-light communication; quantum mechanics satisfies it (no-signalling theorem).
- **Local causality** (Bell): events are fully determined by the past light cone's contents; violated by quantum correlations.
- **Separability**: systems have their own states; entanglement violates it.
- **Field locality**: relativistic field theories obey microcausality (spacelike commutators vanish).
E: ⟨[φ(x), φ(y)]⟩ = 0 for spacelike x − y :: microcausality
H: EPR and entanglement
- EPR (1935): if measuring one particle instantly reveals the other's property, either QM is incomplete or there's "spooky action at a distance".
- Bell (1964) showed local hidden-variable theories make predictions different from QM.
- Experiments since the 1970s, and loophole-free tests (2015), confirm quantum nonlocality.
H: Interpretive responses
P: Bohmian mechanics is explicitly nonlocal. Many-worlds may be considered local because branching propagates locally. Retrocausal models allow future measurement settings to influence the past. Superdeterminism denies measurement independence. Quantum field theory reconciles nonlocal correlations with relativity: no signals, no preferred frame for observable effects. Nonlocality is a resource for quantum cryptography and randomness certification.
X: Can Alice signal Bob instantly by measuring her half of a Bell pair?
> No: Bob's reduced state is I/2 regardless of what Alice does; correlations appear only when comparing results via classical communication
X: Which assumption does superdeterminism drop?
> Statistical independence: measurement settings are correlated with hidden variables
K: Quantum mechanics violates local causality but respects no-signalling; this "peaceful coexistence" with relativity is subtle.
!: Nonlocal correlations aren't faster-than-light communication; they can't be used to send messages.
Q: What is the no-signalling theorem? | Local operations on one part of an entangled system cannot change the measurement statistics of the distant part.
Q: What did EPR argue? | That quantum mechanics must be incomplete if locality and realism hold.
M1: Quantum mechanics violates: | Bell's local causality | Signal locality | Energy conservation | Relativity of simultaneity | Without signalling.
M2: Superdeterminism rejects: | Statistical independence of measurement choices | Determinism | Locality always | Quantum mechanics | Settings correlated with hidden variables.

## Bell's theorem
S: Bell's theorem (1964) proves that no theory based on local hidden variables can reproduce all predictions of quantum mechanics. Experiments confirm quantum predictions, so nature is not locally realistic in Bell's sense, a profound result about reality.
H: Assumptions
- **Local causality**: outcomes depend only on local settings and shared hidden variables λ.
- **Statistical independence** (free choice): settings independent of λ.
- **Single outcomes** (and standard probability).
- From these, correlations obey inequalities such as CHSH: |S| ≤ 2.
E: S = E(a,b) − E(a,b') + E(a',b) + E(a',b'), |S| ≤ 2 :: CHSH inequality
E: |S_{QM}| ≤ 2√2 :: Tsirelson's bound
H: Experimental tests
- Freedman–Clauser (1972), Aspect (1982) with time-varying settings.
- Loopholes: locality, detection efficiency, freedom of choice.
- 2015: loophole-free tests (Delft with NV centres, Vienna, NIST with photons).
- Cosmic Bell test (2017–18) used light from distant quasars to choose settings.
- 2022 Nobel Prize: Aspect, Clauser, Zeilinger.
H: Implications
P: Any theory matching experiment must violate at least one assumption: give up locality (Bohm), statistical independence (superdeterminism), single outcomes (many-worlds), or classical reasoning (QBism, relational QM). Bell said he favoured nonlocality and hoped for a better theory. Device-independent quantum cryptography and certified randomness exploit Bell violations.
X: Quantum S for optimal angles is 2√2. By what fraction does it exceed the classical bound?
> 2.83/2 ≈ 1.41: about 41% larger
X: What does the freedom-of-choice loophole involve?
> The possibility that setting choices are correlated with hidden variables; addressed by random number generators and cosmic sources
K: Bell's theorem shows local hidden variables can't explain quantum correlations; experiments confirm violation of Bell inequalities.
!: Bell's theorem doesn't prove quantum mechanics correct; it shows local realism conflicts with experiment.
Q: What does the CHSH inequality limit? | Correlations in local hidden-variable theories to |S| ≤ 2.
Q: What did the 2015 experiments achieve? | Bell tests closing the main loopholes simultaneously.
M1: Tsirelson's bound is: | 2√2 | 2 | 4 | 1 | Maximum quantum CHSH value.
M2: The 2022 physics Nobel recognised: | Bell test experiments | The Higgs | Gravitational waves | Exoplanets | Aspect, Clauser, Zeilinger.

## Scientific explanation and unification
S: Unification, explaining diverse phenomena with fewer principles, has driven physics from Newton's gravity to Maxwell's electromagnetism and the electroweak theory. Philosophers ask why unification counts as explanatory and whether a final "theory of everything" is possible.
H: Great unifications
- Newton: terrestrial and celestial mechanics.
- Maxwell: electricity, magnetism and light.
- Statistical mechanics: thermodynamics and mechanics.
- Einstein: space and time; gravity and geometry.
- Glashow–Weinberg–Salam: electromagnetism and weak force.
- Proposed: grand unified theories (strong + electroweak at ~10^{16} GeV), string theory (all forces including gravity).
E: α_{1}^{−1}(μ) ≈ α_{2}^{−1}(μ) ≈ α_{3}^{−1}(μ) near 10^{16} GeV :: approximate coupling unification
H: Why unification explains
- Reduces the number of independent assumptions (Friedman, Kitcher).
- Reveals common mechanisms (fields, symmetry).
- Often predicts new phenomena (electromagnetic waves, W and Z bosons, proton decay in GUTs).
H: Limits and debates
P: Not all unifications succeed: Kaluza–Klein, early GUTs (proton decay not seen above 10^{34} years) and many string vacua lack confirmation. Some argue nature may be "dappled" (Cartwright) rather than unified, with many domain-specific laws. Others see unification as a methodological ideal rather than a guaranteed fact. Effective field theories show physics can be understood level by level without a final theory.
X: What new prediction followed from Maxwell's unification?
> Electromagnetic waves travelling at c, confirmed by Hertz's radio waves (1887)
X: Why haven't GUTs been confirmed?
> Proton decay predicted by simple GUTs hasn't been observed; Super-Kamiokande sets lifetimes above ~10^{34} years
K: Unification explains by reducing many phenomena to few principles and often predicts new effects, but complete unification remains unproven.
!: Unification is a powerful guide but not guaranteed; nature might not reduce to one elegant theory.
Q: What did the electroweak theory unify? | The electromagnetic and weak forces.
Q: What prediction distinguishes many GUTs? | Proton decay.
M1: Who argued nature may be "dappled"? | Nancy Cartwright | Einstein | Weinberg | Feynman | Plurality of laws.
M2: Newton's unification combined: | Terrestrial and celestial mechanics | Electricity and magnetism | Space and time | Weak and strong forces | Apple and Moon.

## Symmetry and physical law
S: Symmetry is one of physics's deepest principles: laws stay the same under certain transformations. Symmetries determine conservation laws, constrain possible interactions, classify particles and guide theory building, and philosophers ask why symmetry has such power.
H: Types of symmetry
- **Spacetime**: translations, rotations, boosts (Poincaré).
- **Internal**: gauge symmetries (U(1), SU(2), SU(3)), flavour symmetries.
- **Discrete**: parity, charge conjugation, time reversal (and CPT).
- **Global vs local**: local (gauge) symmetries are redundancies of description; global ones relate physically distinct states.
- **Broken symmetries**: spontaneous or explicit.
E: Continuous symmetry ⇒ conserved current ∂_{μ}j^{μ} = 0 :: Noether's theorem
H: Roles of symmetry
- Explain conservation laws (Noether).
- Constrain forms of laws (Lorentz invariance, gauge invariance).
- Classify particles (Wigner's representations).
- Predict new particles (Ω^{−}, W and Z, gluons).
- Heuristic for new theories (supersymmetry, GUTs).
H: Philosophical questions
P: Are symmetries fundamental, or consequences of laws? Is gauge symmetry physical or merely descriptive (redundancy)? Why does the universe have these symmetries? Symmetry breaking explains complexity: a symmetric law can have asymmetric solutions, giving structure to the world. Wigner called the effectiveness of mathematics in physics "unreasonable"; symmetry is a central part of it.
X: Which conservation law follows from rotational symmetry?
> Conservation of angular momentum
X: Why is gauge symmetry sometimes called "not a real symmetry"?
> It relates different mathematical descriptions of the same physical state, rather than distinct states
K: Symmetries constrain laws, predict particles and give conservation laws; their breaking produces the structure we observe.
!: Local gauge symmetry is a redundancy, not an observable transformation; only gauge-invariant quantities are physical.
Q: What did Wigner call "unreasonable"? | The effectiveness of mathematics in describing the natural sciences.
Q: How do symmetries predict particles? | Missing members of symmetry multiplets indicate particles yet to be found, like the Ω^{−}.
M1: CPT symmetry is: | Respected by all local Lorentz-invariant QFTs | Always violated | Only in gravity | A gauge symmetry | CPT theorem.
M2: Symmetry breaking explains: | How symmetric laws give asymmetric structures | Why laws vanish | Conservation laws | Nothing | Magnets, Higgs, crystals.

## Model dependence and idealisation
S: Physics relies on models that simplify reality: frictionless planes, point masses, ideal gases, perfect crystals. Idealisations make problems solvable and reveal essentials, but understanding their limits is crucial for reliable predictions.
H: Types of idealisation
- **Galilean idealisation**: deliberately distort to simplify, then add corrections (frictionless plane, then friction).
- **Minimalist idealisation**: include only key causal factors (Ising model for phase transitions).
- **Multiple-models idealisation**: use several incompatible models for different questions (nuclear liquid-drop and shell models).
- **Infinite idealisations**: thermodynamic limit N → ∞ needed for sharp phase transitions.
H: Models as mediators
- Models mediate between theory and world (Morgan and Morrison).
- They can be partially independent of theory (phenomenological models).
- Toy models capture qualitative behaviour (spherical cow).
- Simulations as models raise questions of verification and validation.
E: pV = Nk_{B}T :: ideal gas model (neglects interactions and volume)
H: Model dependence
P: Results can depend on model choice: climate projections use ensembles of models to estimate structural uncertainty; particle physics analyses estimate theory systematics by varying models. Stephen Hawking and Leonard Mlodinow proposed "model-dependent realism": we can only know reality through models. Good practice: state assumptions, test sensitivity, check limits and compare with data.
X: The ideal gas law fails for CO_{2} near condensation. Which model improves it?
> Van der Waals: (p + a/V_{m}^{2})(V_{m} − b) = RT accounts for attractions and finite size
X: Why does a sharp phase transition need N → ∞?
> The partition function of a finite system is analytic; non-analytic behaviour (sharp transitions) only appears in the infinite limit
K: Idealisations simplify to reveal essentials; reliable use requires knowing assumptions and validity limits.
!: Forgetting a model's assumptions leads to applying it outside its domain, often with large errors.
Q: What is a Galilean idealisation? | A deliberate simplification later corrected by adding back neglected factors.
Q: Why are nuclear models an example of multiple-models idealisation? | The liquid-drop and shell models make incompatible assumptions but each explains different phenomena.
M1: The thermodynamic limit means: | N → ∞ with density fixed | N = 1 | T → 0 | Zero volume | Needed for sharp transitions.
M2: Model-dependent realism was proposed by: | Hawking and Mlodinow | Popper | Kuhn | Bohr | Grand Design.

## Underdetermination of theory by evidence
S: Underdetermination says that evidence alone may not decide between rival theories: different theories can fit the same data. It raises questions about how physicists choose theories and whether we can know which theory is true.
H: Forms
- **Transient underdetermination**: current data don't decide, but future data might (dark matter vs modified gravity).
- **Permanent underdetermination**: empirically equivalent theories that no evidence could separate (some quantum interpretations).
- **Duhem–Quine thesis**: hypotheses are tested together with auxiliary assumptions; a failed prediction doesn't tell you which assumption is wrong.
H: Physics examples
- Newtonian gravity in absolute space at rest versus moving uniformly (unobservable difference).
- Lorentz's aether theory versus Einstein's relativity (empirically equivalent for many effects).
- Quantum interpretations (Copenhagen, many-worlds, Bohm) giving identical predictions.
- Gauge choices and dualities (AdS/CFT, T-duality) equivalent descriptions.
E: Neptune vs Vulcan: same anomaly-type, different resolution :: Duhem–Quine in practice
H: How choices are made
P: Theoretical virtues guide choices: simplicity, unification, fruitfulness, coherence with other theories, explanatory power, and fewer ad hoc assumptions. Einstein preferred relativity over Lorentz's aether because it was simpler and more principled. Some argue that empirically equivalent theories are really the same theory in different forms (dualities). Underdetermination encourages humility and multiple lines of evidence.
X: How do dark matter and MOND illustrate transient underdetermination?
> Galaxy rotation curves fit both; cluster collisions (Bullet Cluster) and CMB data favour dark matter, showing new evidence can decide
X: Why couldn't experiments distinguish Lorentz's theory from special relativity?
> Lorentz contraction and local time made the aether undetectable, giving the same predictions for many experiments
K: Data can fit multiple theories; physicists use theoretical virtues and new evidence to choose, and some equivalences may be dualities.
!: Underdetermination doesn't mean "anything goes"; rival theories still must fit all data and meet stringent standards.
Q: What is the Duhem–Quine thesis? | Hypotheses are tested only together with auxiliary assumptions, so a failed test doesn't single out which is wrong.
Q: What are theoretical virtues? | Criteria like simplicity, unification and fruitfulness used to choose among theories that fit the data.
M1: Quantum interpretations are an example of: | Possible permanent underdetermination | Transient only | Falsified theories | Measurement errors | Same predictions.
M2: The Bullet Cluster helped resolve: | Dark matter vs modified gravity | Quantum interpretations | Aether vs relativity | Copernican debates | Mass separated from gas.

## The limits of scientific knowledge
S: Physics has explained a vast range of phenomena, but are there limits to what it can know? Limits may come from practical measurement, chaos, quantum uncertainty, cosmological horizons, mathematics itself and the nature of explanation.
H: Physical limits
- **Uncertainty principle**: ΔxΔp ≥ ħ/2 limits simultaneous knowledge.
- **Chaos**: exponential sensitivity limits long-term prediction.
- **Cosmological horizons**: regions beyond the observable universe (~46 billion light-years) can never be seen.
- **Planck scale**: energies ~10^{19} GeV far beyond accelerators.
- **Black hole horizons**: interior information inaccessible to outside observers.
E: ΔxΔp ≥ ħ/2 :: Heisenberg uncertainty principle
E: E_{P} = √(ħc^{5}/G) ≈ 1.2 × 10^{19} GeV :: Planck energy
H: Logical and mathematical limits
- **Gödel's incompleteness theorems**: consistent formal systems capable of arithmetic contain true but unprovable statements.
- **Undecidability**: some physical questions (e.g. the spectral gap problem in 2D quantum lattices, 2015) are formally undecidable.
- **Computational complexity**: some simulations may be intractable even in principle.
H: Conceptual limits and open questions
P: Why is there something rather than nothing? Why these laws and constants (fine-tuning, anthropic arguments, multiverse)? Can a theory explain its own initial conditions? Some questions may lie beyond empirical testing (string landscape, multiverse), raising debates about the demarcation of science. Others think new methods and ideas will keep extending knowledge. Recognising limits is itself scientific progress.
X: Planck energy in GeV versus the LHC's 13.6 TeV?
> 1.2 × 10^{19}/1.36 × 10^{4} ≈ 10^{15}: the Planck scale is a million billion times higher
X: What did the 2015 spectral gap result show?
> Determining whether a general 2D quantum many-body Hamiltonian is gapped is undecidable: no algorithm can decide it for all cases
K: Knowledge faces physical, logical and conceptual limits, yet identifying them sharpens understanding and guides future research.
!: Limits on measurement or computation are not failures of science; they are discoveries about the world.
Q: What does Gödel's incompleteness theorem imply for physics? | Formal systems powerful enough for arithmetic have unprovable truths, suggesting possible limits to axiomatised physics.
Q: Why can't we see beyond the cosmological horizon? | Light from there hasn't had time to reach us since the Big Bang (and with acceleration, some never will).
M1: The spectral gap problem was shown to be: | Undecidable | Easy | Solved for all systems | Irrelevant | Cubitt, Pérez-García, Wolf 2015.
M2: Fine-tuning arguments ask why: | Physical constants allow complex structures | Experiments have errors | Theories are simple | Computers fail | Anthropic reasoning.
`;
