// Unit 20: Quantum Mechanics. Format: kit/course/notes.js
export default `
## Origins of quantum theory
S: Quantum theory began around 1900 when classical physics failed to explain how hot objects glow, how light ejects electrons, and why atoms are stable with sharp spectral lines. Each puzzle was solved by assuming energy and angular momentum come in discrete amounts.
H: The crises
- **Blackbody radiation** (Planck, 1900): energy exchanged in quanta E = hf.
- **Photoelectric effect** (Einstein, 1905): light itself comes in photons.
- **Specific heats of solids** (Einstein, 1907): vibrations quantised.
- **Atomic spectra and stability** (Bohr, 1913): quantised electron orbits.
- **Compton scattering** (1923): photons carry momentum.
H: The new mechanics
- de Broglie (1924): matter has waves, λ = h/p.
- Heisenberg's matrix mechanics (1925) and Schrödinger's wave mechanics (1926), shown equivalent.
- Born (1926): the wavefunction gives probabilities.
- Dirac (1928): relativistic electron, predicted antimatter.
H: Planck's constant
E: h = 6.626 070 15 × 10^{-34} J s; ħ = h/2π = 1.055 × 10^{-34} J s
P: h sets the scale where quantum effects matter: when actions (energy × time, momentum × distance) are comparable to h. For everyday objects they're ~10^{34} times larger, so the world looks classical.
X: Energy of one quantum of 1 GHz radiation?
> E = hf = 6.6 × 10^{-34} × 10^{9} = 6.6 × 10^{-25} J ≈ 4 μeV
!: Quantum mechanics doesn't stop applying to large objects; its effects are just too small to notice, unless carefully isolated.
Q: What did Planck assume to explain blackbody radiation? | That energy is exchanged in discrete quanta E = hf.
Q: What sets the scale at which quantum effects become important? | Planck's constant: when actions are comparable to h.
M1: Who proposed that matter has wave properties? | de Broglie | Bohr | Planck | Einstein | 1924.
M2: Quantum mechanics was formulated as matrix mechanics and wave mechanics by: | Heisenberg and Schrödinger | Newton and Leibniz | Bohr and Rutherford | Maxwell and Faraday | 1925–26.

## Blackbody radiation
S: Classical physics predicted a hot cavity would radiate infinite energy at short wavelengths. Planck's assumption that oscillators exchange energy only in units of hf gave a formula matching experiment perfectly, launching quantum physics.
H: The classical failure
E: u(f) = 8πf^{2}k_{B}T/c^{3} :: Rayleigh–Jeans (equipartition)
- Matches at low frequency; integrates to infinity (the ultraviolet catastrophe).
H: Planck's law
E: u(f) = (8πhf^{3}/c^{3})/(e^{hf/k_{B}T} − 1)
- At low f: reduces to Rayleigh–Jeans.
- At high f: suppressed exponentially because quanta hf ≫ k_{B}T are rarely excited.
- Gives Wien's law and the Stefan–Boltzmann law (with σ in terms of h, c, k_{B}).
H: Photon gas view
P: Einstein and Bose reinterpreted Planck's law as a gas of photons obeying Bose–Einstein statistics: mean number per mode 1/(e^{hf/k_{B}T} − 1). Each mode's energy is quantised like a harmonic oscillator.
X: Ratio of Planck to Rayleigh–Jeans energy density at hf = 5k_{B}T?
> Ratio = x/(e^{x} − 1) with x = 5 ⇒ 5/147 ≈ 0.034
> The quantum suppression is huge at high frequency
!: Planck initially viewed quantisation as a mathematical trick; Einstein took it physically, as quanta of light.
Q: What was the ultraviolet catastrophe? | The classical prediction of infinite emitted energy at high frequencies.
Q: Why does Planck's law avoid the catastrophe? | High-frequency modes need large quanta hf ≫ k_{B}T, which are exponentially unlikely to be excited.
M1: At low frequencies, Planck's law reduces to: | The Rayleigh–Jeans law | Wien's law | Zero | Stefan's law | Classical limit.
M2: Planck's law corresponds to photons obeying: | Bose–Einstein statistics | Fermi–Dirac | Maxwell–Boltzmann | No statistics | Photons are bosons.

## Photoelectric effect
S: When light shines on a metal, electrons are emitted only if the light's frequency exceeds a threshold, however intense it is. Einstein explained this with photons: each delivers energy hf to one electron.
H: Observations
- No emission below the threshold frequency f_{0}, whatever the intensity.
- Maximum electron energy depends on frequency, not intensity.
- Intensity changes only the number of electrons.
- Emission is instantaneous (no build-up time).
H: Einstein's equation
E: hf = φ + KE_{max}
E: eV_{s} = hf − φ :: stopping potential
- φ: work function (caesium 2.1 eV, sodium 2.3 eV, zinc 4.3 eV, platinum 5.6 eV).
- A graph of V_{s} against f has gradient h/e (Millikan, 1916).
H: Applications
P: Photomultipliers, photodiodes and image sensors use the photoelectric effect (internal photoeffect in semiconductors). Photoemission spectroscopy (ARPES) maps electrons' energies and momenta in materials. Einstein's 1921 Nobel Prize was for this work.
X: UV of 250 nm hits zinc (φ = 4.3 eV). Maximum KE of electrons?
> hf = 1240/250 = 4.96 eV
> KE_{max} = 0.66 eV
!: Brighter light below threshold still ejects no electrons; a classical wave picture can't explain this.
Q: State Einstein's photoelectric equation. | hf = φ + KE_{max}.
Q: What does the intensity of light affect in the photoelectric effect? | The number of emitted electrons, not their maximum energy.
M1: Increasing frequency above threshold increases: | Maximum KE of electrons | Number of electrons only | Work function | Nothing | KE = hf − φ.
M2: A V_{s}–f graph has gradient: | h/e | e/h | h | φ | eV_{s} = hf − φ.

## Compton scattering
S: When X-rays scatter off electrons, their wavelength increases by an amount depending on the scattering angle. Compton (1923) explained it as a collision between a photon carrying momentum h/λ and an electron: strong evidence that light quanta are particles.
H: The Compton formula
E: Δλ = (h/(m_{e}c))(1 − cos θ)
E: λ_{C} = h/(m_{e}c) = 2.43 pm :: Compton wavelength
- Maximum shift 2λ_{C} at θ = 180°.
- Derived from conservation of energy and relativistic momentum.
H: Significance
- Photons carry momentum p = h/λ = E/c.
- The shift is only noticeable for short wavelengths (X-rays, gamma rays).
H: Applications
P: Compton scattering dominates gamma-ray interactions in tissue at medical energies (affecting radiotherapy and imaging). Compton cameras image gamma sources. Inverse Compton scattering, where energetic electrons boost photons, produces X-rays and gamma rays in astrophysical jets and the Sunyaev–Zel'dovich effect in galaxy clusters.
X: X-rays of 70 pm scatter at 90°. New wavelength?
> Δλ = 2.43 × (1 − 0) = 2.43 pm
> λ′ = 72.4 pm
!: The Compton shift is independent of the incident wavelength; only its relative size changes.
Q: What does Compton scattering demonstrate? | Photons carry momentum and scatter like particles.
Q: What is the Compton wavelength of the electron? | h/(m_{e}c) ≈ 2.43 pm.
M1: The maximum Compton shift occurs at scattering angle: | 180° | 90° | 0° | 45° | 1 − cos θ = 2.
M2: Compton shifts are hard to see with visible light because: | Δλ (pm) is tiny compared with λ (hundreds of nm) | Visible photons have no momentum | Electrons don't scatter visible light | It doesn't occur | Relative shift negligible.

## Wave-particle duality
S: Light and matter both show wave and particle behaviour. Which appears depends on the experiment: interference reveals waves, detection at points reveals particles. Quantum mechanics describes both with one mathematical object, the wavefunction.
H: Evidence
- Light as particle: photoelectric effect, Compton scattering, single-photon detection.
- Light as wave: interference, diffraction, polarisation.
- Matter as wave: electron diffraction (Davisson–Germer, G. P. Thomson, 1927), neutron and atom interferometry, interference of C_{60} molecules.
- Matter as particle: tracks in detectors, discrete counts.
H: Complementarity
P: Bohr argued that wave and particle descriptions are complementary: both are needed, but an experiment designed to reveal one aspect hides the other. Which-path information destroys interference. Modern quantum mechanics simply describes quantum objects as neither classical waves nor particles.
H: Energy and momentum
E: E = hf; p = h/λ = ħk
- These relations hold for photons and matter particles alike.
X: Does a 1 kg ball at 1 m s^{-1} show wave behaviour?
> λ = h/p = 6.6 × 10^{-34} m: far below any measurable scale
!: "Duality" doesn't mean a quantum object switches between being a wave and a particle; it's a single quantum entity whose behaviour shows both features.
Q: Give evidence that electrons behave as waves. | Electron diffraction from crystals and interference in double slits.
Q: What is complementarity? | Bohr's idea that wave and particle aspects are both needed but can't be observed simultaneously in one experiment.
M1: The photoelectric effect is evidence of light's: | Particle nature | Wave nature | Polarisation | Speed | Photons.
M2: The largest objects shown to interfere include: | Molecules of ~2000 atoms | Bacteria | Dust grains | Footballs | Matter-wave interferometry.

## de Broglie wavelength
S: De Broglie proposed that every particle has a wavelength inversely proportional to its momentum. For electrons it's comparable to atomic spacings, making electron microscopes and diffraction possible.
H: The relation
E: λ = h/p = h/(mv)
E: λ = h/√(2mqV) :: particle accelerated through V (non-relativistic)
E: λ ≈ 1.23/√V nm :: electrons
H: Examples
- Electron at 100 V: 0.12 nm (atomic spacing: diffraction).
- Thermal neutron (~0.025 eV): 0.18 nm: neutron scattering probes crystal and magnetic structures.
- Electron microscope (200 kV): ~2.5 pm: atomic-resolution imaging.
H: Bohr orbits
P: De Broglie explained Bohr's quantisation: an electron's orbit must fit a whole number of wavelengths, 2πr = nλ, giving mvr = nħ. Standing matter waves are why atomic energy levels are discrete.
X: Wavelength of an electron accelerated through 150 V?
> λ = 1.23/√150 nm = 0.10 nm
!: Use relativistic momentum for fast particles; at 200 kV electrons move at 0.7c.
Q: State de Broglie's relation. | λ = h/p.
Q: Why can electron microscopes resolve atoms? | Fast electrons have wavelengths of picometres, far shorter than light.
M1: Doubling a particle's momentum makes its wavelength: | Half | Double | Unchanged | Four times | λ ∝ 1/p.
M2: Neutron diffraction is useful because thermal neutrons have wavelengths: | Comparable to atomic spacings | Much larger than atoms | Of metres | Zero | ~0.1–0.2 nm.

## Double-slit experiments
S: Sending particles one at a time through two slits builds up an interference pattern dot by dot. Each particle's quantum amplitude passes through both slits; trying to learn which slit it took destroys the pattern. Feynman called it the central mystery of quantum mechanics.
H: Key results
- Electrons (Jönsson 1961; Tonomura 1989, single electrons), neutrons, atoms, molecules up to ~2000 atoms.
- Probability P = |ψ_{1} + ψ_{2}|^{2} = |ψ_{1}|^{2} + |ψ_{2}|^{2} + interference terms.
- Classical particles would give P_{1} + P_{2} (no fringes).
H: Which-path information
- Any measurement or environmental record of the path makes the terms incoherent: no fringes.
- Even unread information counts if it exists in principle.
- **Quantum eraser**: erasing which-path information (by a later measurement) recovers fringes in correlated subsets of data.
H: Delayed choice
P: Wheeler's delayed-choice experiments decide whether to measure path or interference after the particle has passed the slits; results match quantum predictions, showing no particle "decides" in advance how to behave.
X: Electrons at 50 keV (λ ≈ 5.4 pm) through slits 1 μm apart, screen 1 m away. Fringe spacing?
> x = λD/d = 5.4 × 10^{-12}/10^{-6} = 5.4 μm (needs magnification to see)
!: The pattern isn't due to particles interfering with each other; one particle at a time still builds it.
Q: What happens to the interference pattern if which-path information is available? | It disappears.
Q: How is probability computed for two indistinguishable paths? | Add the amplitudes first, then square: |ψ_{1} + ψ_{2}|^{2}.
M1: With single electrons sent one at a time, the screen shows: | An interference pattern building up dot by dot | Two bands only | A uniform blur | Nothing | Each electron interferes with itself.
M2: A quantum eraser shows that: | Removing which-path information can restore interference | Particles go backwards in time | Measurement is impossible | Light has mass | Coherence depends on available information.

## Heisenberg uncertainty principle
S: The uncertainty principle states that certain pairs of quantities, like position and momentum, can't both have precisely defined values. It's a property of waves and of quantum states, not just a limitation of measurement equipment.
H: Relations
E: Δx Δp_{x} ≥ ħ/2
E: ΔE Δt ≳ ħ/2 :: energy–time (Δt = lifetime or measurement time)
E: ΔA ΔB ≥ ½|⟨[Â, B̂]⟩| :: general (Robertson)
H: Consequences
- **Zero-point energy**: a confined particle can't be at rest (harmonic oscillator ground state ½ħω).
- **Atom size**: confining an electron raises its kinetic energy; balancing against Coulomb attraction gives the Bohr radius.
- **Natural linewidth**: excited states with lifetime τ have energy spread ~ħ/τ.
- **Virtual particles**: brief energy fluctuations in field theory.
H: Not just disturbance
P: Heisenberg's microscope argument (measuring position with light kicks the particle) is a useful picture, but the principle holds for the state itself, whatever measurement is made. Modern work distinguishes preparation uncertainty from measurement–disturbance relations (Ozawa).
X: An electron is confined to 0.1 nm. Minimum momentum spread and energy scale?
> Δp ≥ ħ/(2Δx) = 5.3 × 10^{-25} kg m s^{-1}
> KE ~ (Δp)^{2}/2m ≈ 1 eV: atomic energies
!: The uncertainty principle isn't about clumsy instruments; it would hold for perfect ones.
Q: State the position–momentum uncertainty relation. | Δx Δp ≥ ħ/2.
Q: How does the uncertainty principle explain zero-point energy? | Confining a particle forces a momentum spread, so its kinetic energy can't be zero.
M1: An excited state with lifetime 10^{-8} s has energy width about: | 3 × 10^{-8} eV | 1 eV | 10^{-3} eV | 0 | ħ/τ ≈ 6.6 × 10^{-8} eV.
M2: Which pair obeys an uncertainty relation? | x and p_{x} | x and p_{y} | E and m | p and λ | Non-commuting observables.

## Wavefunctions
S: The wavefunction ψ is the mathematical object describing a quantum system's state. It's generally complex, evolves by the Schrödinger equation, and its squared magnitude gives probabilities.
H: Properties
- ψ(x, t): complex amplitude; |ψ|^{2} = probability density.
- **Normalised**: ∫|ψ|^{2}dx = 1.
- Single-valued, finite, continuous (and with continuous derivative where the potential is finite).
- Overall phase is unobservable; relative phases matter (interference).
H: Examples
E: ψ = Ae^{i(kx − ωt)} :: free particle (plane wave; not normalisable, idealisation)
E: ψ_{n} = √(2/L) sin(nπx/L) :: infinite square well
E: ψ_{0} = (mω/πħ)^{1/4}e^{−mωx^{2}/2ħ} :: harmonic oscillator ground state
H: Interpretation
P: Whether ψ is physically real or just knowledge is debated (Copenhagen, many-worlds, pilot-wave, QBism…). All interpretations agree on predictions. The PBR theorem (2012) argues ψ can't be merely information about an underlying definite state, under reasonable assumptions.
X: Normalise ψ = A for 0 < x < L (zero elsewhere).
> ∫_{0}^{L}|A|^{2}dx = |A|^{2}L = 1 ⇒ A = 1/√L
!: ψ itself isn't a probability; probabilities come from |ψ|^{2}, and ψ can be negative or complex.
Q: What does |ψ|^{2} represent? | Probability density of finding the particle at a position.
Q: Why must wavefunctions be normalised? | Total probability of finding the particle somewhere must be 1.
M1: Multiplying ψ by e^{iθ} (a global phase): | Changes nothing observable | Changes probabilities | Flips the spin | Doubles energy | Global phase is unobservable.
M2: An acceptable wavefunction must be: | Normalisable, single-valued and continuous | Real | Positive | Constant | Physical requirements.

## Probability amplitudes
S: In quantum mechanics, each way an event can happen has a complex probability amplitude. Amplitudes for indistinguishable alternatives add before squaring; this is the source of interference and all quantum weirdness.
H: Rules (Feynman)
- Probability = |amplitude|^{2}.
- Indistinguishable alternatives: add amplitudes, then square.
- Distinguishable alternatives: add probabilities.
- Sequential steps: multiply amplitudes.
H: Bra–ket notation
E: amplitude to find |ψ⟩ in |φ⟩ = ⟨φ|ψ⟩
E: P = |⟨φ|ψ⟩|^{2}
- Expand states in a basis: |ψ⟩ = Σc_{n}|n⟩, c_{n} = ⟨n|ψ⟩, P(n) = |c_{n}|^{2}.
H: Path integral
P: Feynman's formulation sums amplitudes e^{iS/ħ} over every possible path. Paths near the classical one add constructively; others cancel. In the limit ħ → 0, only the classical path of stationary action survives: classical mechanics emerges.
X: A photon reaches a detector by two indistinguishable paths with amplitudes 0.5 and 0.5e^{iπ}. Probability?
> Total amplitude = 0.5 − 0.5 = 0
> P = 0: destructive interference
!: You can't add probabilities for indistinguishable paths; doing so misses interference entirely.
Q: When do you add amplitudes rather than probabilities? | When the alternatives are indistinguishable (no record of which occurred).
Q: What does the path integral sum over? | Amplitudes e^{iS/ħ} for all possible paths.
M1: Two indistinguishable paths each with amplitude 1/2, in phase. Probability: | 1 | 1/2 | 1/4 | 0 | |1/2 + 1/2|^{2}.
M2: In Dirac notation, the amplitude to find state ψ in state φ is: | ⟨φ|ψ⟩ | |ψ⟩⟨φ| | ⟨ψ|ψ⟩ | |φ⟩ | Inner product.

## Born rule
S: The Born rule connects quantum theory to experiment: the probability of a measurement outcome is the squared magnitude of the corresponding amplitude. Max Born proposed it in 1926 (Nobel 1954).
H: Statements
E: P(x)dx = |ψ(x)|^{2}dx :: position
E: P(a_{n}) = |⟨a_{n}|ψ⟩|^{2} :: outcome a_{n} of observable A
- Outcomes are eigenvalues of the observable; probabilities sum to 1.
- After measurement, the state is (effectively) the corresponding eigenstate.
H: Testing it
- Verified to high precision in interference experiments; triple-slit tests confirm no higher-order interference (consistent with |ψ|^{2}).
- Gleason's theorem shows the Born rule is essentially the only consistent probability assignment for Hilbert spaces of dimension ≥ 3.
H: Interpretation
P: The Born rule is the one place probabilities enter quantum mechanics. Many-worlds proponents try to derive it from decision theory; in Copenhagen it's a postulate; in pilot-wave theory it reflects an equilibrium distribution of particle positions.
X: A state (|0⟩ + 2|1⟩)/√5 is measured. Probabilities?
> P(0) = 1/5 = 0.2; P(1) = 4/5 = 0.8
!: The Born rule gives probabilities for outcomes of measurements, not for what the system "was" before measurement.
Q: State the Born rule. | The probability of an outcome is the squared magnitude of its amplitude.
Q: What does Gleason's theorem show? | The Born rule is the only consistent way to assign probabilities to quantum measurements (in dimension ≥ 3).
M1: ψ = (3|a⟩ + 4i|b⟩)/5. P(b) = | 0.64 | 0.8 | 0.36 | 0.16 | |4i/5|^{2}.
M2: Who proposed the probabilistic interpretation of ψ? | Max Born | Schrödinger | Heisenberg | Bohr | 1926.

## Schrödinger equation
S: The Schrödinger equation governs how quantum states evolve in time. It's the quantum analogue of Newton's second law: given the potential and the initial wavefunction, it determines the wavefunction at all later times.
H: The equation
E: iħ ∂ψ/∂t = Ĥψ
E: Ĥ = −(ħ^{2}/2m)∇^{2} + V(r) :: Hamiltonian for one particle
- Linear: superpositions of solutions are solutions.
- Deterministic and unitary: probabilities are conserved.
H: Where it comes from
P: Schrödinger (1926) sought a wave equation consistent with de Broglie's waves: E = ħω and p = ħk with E = p^{2}/2m + V. Replacing E → iħ∂/∂t and p → −iħ∇ gives the equation. It can't be derived from classical physics; it's justified by its success.
H: Successes and limits
- Explains hydrogen's spectrum, chemical bonding, solids, tunnelling.
- Non-relativistic: replaced by the Dirac and Klein–Gordon equations and quantum field theory at high speeds.
- Exact solutions are rare; most real problems are solved numerically or approximately.
X: Check that ψ = e^{i(kx − ωt)} solves the free Schrödinger equation.
> iħ∂ψ/∂t = ħωψ; −(ħ^{2}/2m)∂^{2}ψ/∂x^{2} = (ħ^{2}k^{2}/2m)ψ
> Solution if ħω = ħ^{2}k^{2}/2m: E = p^{2}/2m
!: The Schrödinger equation is first order in time, unlike the classical wave equation, so you need only ψ at t = 0 (not ∂ψ/∂t).
Q: What is the Hamiltonian? | The operator for total energy, kinetic plus potential.
Q: Why is the Schrödinger equation called linear? | Any superposition of solutions is also a solution.
M1: The momentum operator in position representation is: | −iħ∇ | iħ∂/∂t | ħk | mv | Canonical quantisation.
M2: Schrödinger's equation fails for: | Particles near the speed of light | Electrons in atoms | Tunnelling | Molecules | Non-relativistic.

## Time-dependent and time-independent Schrödinger equations
S: For potentials that don't change in time, the Schrödinger equation separates. The time-independent equation finds the allowed energies and stationary states; the time dependence is then just a rotating phase for each.
H: Separation of variables
E: ψ(x, t) = φ(x)e^{−iEt/ħ}
E: −(ħ^{2}/2m)d^{2}φ/dx^{2} + Vφ = Eφ :: time-independent equation
- Stationary states have time-independent probability densities.
- Boundary conditions make E discrete for bound states.
H: General solutions
E: ψ(x, t) = Σc_{n}φ_{n}(x)e^{−iE_{n}t/ħ}
- Superpositions of different energies change in time: probability sloshes at frequencies (E_{n} − E_{m})/h.
- This is how atoms radiate at transition frequencies, and how wave packets move.
H: Solving in practice
- Analytic: square wells, harmonic oscillator, hydrogen, some others.
- Numerical: shooting method, matrix diagonalisation on a grid, finite elements.
X: A particle in a box in the superposition (φ_{1} + φ_{2})/√2. At what frequency does |ψ|^{2} oscillate?
> f = (E_{2} − E_{1})/h = 3E_{1}/h
!: A single energy eigenstate doesn't "move"; motion arises only from superpositions of different energies.
Q: What is a stationary state? | An energy eigenstate whose probability density doesn't change in time.
Q: Why do superpositions of energy eigenstates evolve? | Each component has a different phase rotation rate, so their interference changes in time.
M1: The time dependence of an energy eigenstate is: | e^{−iEt/ħ} | e^{−Et/ħ} | cos(Et) only | None at all | Phase factor.
M2: For a bound particle, discrete energies come from: | Boundary conditions on φ | The time-dependent part | Measurement | Relativity | Normalisable solutions only for certain E.

## Quantum states and observables
S: A quantum state contains everything that can be predicted about a system. Observables, the measurable quantities, are represented by operators; their eigenvalues are the possible results, and the state gives each result's probability.
H: Postulates (standard)
- States are unit vectors |ψ⟩ in a Hilbert space (rays: overall phase irrelevant).
- Observables are Hermitian operators Â.
- Measuring A gives an eigenvalue a_{n} with probability |⟨a_{n}|ψ⟩|^{2}.
- After measurement, the state is projected onto the eigenspace.
- Between measurements, evolution is unitary: iħ d|ψ⟩/dt = Ĥ|ψ⟩.
H: Common observables
- Position x̂, momentum p̂ = −iħ∂/∂x, energy Ĥ, angular momentum L̂ = r̂ × p̂, spin Ŝ.
- Discrete spectra (energy of bound states, spin) or continuous (position, free momentum).
H: Pictures
P: In the Schrödinger picture states evolve and operators are fixed; in the Heisenberg picture operators evolve, dÂ/dt = (i/ħ)[Ĥ, Â]. They give identical predictions; the Heisenberg picture makes the link to classical equations of motion clearer.
X: A spin-½ particle is in |↑_{x}⟩ = (|↑_{z}⟩ + |↓_{z}⟩)/√2. Measure S_{z}. Results?
> ±ħ/2, each with probability 1/2
!: A state isn't a list of definite values for all observables; incompatible observables don't have simultaneous definite values.
Q: What are the possible results of measuring an observable? | The eigenvalues of its operator.
Q: What is the Heisenberg picture? | A formulation where operators evolve in time and states are fixed.
M1: Observables are represented by: | Hermitian operators | Any matrices | Real numbers | Wavefunctions | Real eigenvalues.
M2: Measuring S_{z} on |↑_{z}⟩ gives: | +ħ/2 with certainty | ±ħ/2 equally | 0 | ħ | Eigenstate.

## Operators and eigenvalues
S: Operators act on quantum states to produce new states. An eigenstate of an operator is unchanged except for scaling by its eigenvalue; for observables, eigenvalues are the possible measurement outcomes.
H: Eigenvalue equation
E: Â|a⟩ = a|a⟩
H: Hermitian operators
E: ⟨φ|Âψ⟩ = ⟨Âφ|ψ⟩, i.e. Â = Â†
- Real eigenvalues.
- Eigenstates for different eigenvalues are orthogonal.
- Eigenstates form a complete basis (spectral theorem).
H: Other important operators
- **Unitary** (Û†Û = 1): time evolution e^{−iĤt/ħ}, rotations, quantum gates; preserve probabilities.
- **Projection** P̂ = |a⟩⟨a|: measurement outcomes.
- **Ladder operators** â, â†: raise and lower energy in the harmonic oscillator; create and destroy particles in field theory.
X: Find the eigenvalues of σ_{x} = [[0, 1], [1, 0]].
> det(σ_{x} − λI) = λ^{2} − 1 = 0 ⇒ λ = ±1
> Eigenvectors (1, 1)/√2 and (1, −1)/√2
!: Operators generally don't commute: ÂB̂ ≠ B̂Â, and order matters in quantum calculations.
Q: Why are observables Hermitian? | Hermitian operators have real eigenvalues and orthogonal, complete eigenstates.
Q: What property do time-evolution operators have? | They're unitary, preserving normalisation.
M1: The eigenvalues of a Hermitian operator are: | Real | Complex | Imaginary | Zero | Guaranteed real.
M2: Eigenstates of a Hermitian operator with different eigenvalues are: | Orthogonal | Parallel | Identical | Undefined | Spectral theorem.

## Expectation values
S: The expectation value of an observable is the average of many measurements on identically prepared systems. It's what classical physics sees, and Ehrenfest's theorem shows expectation values often obey classical equations of motion.
H: Formulas
E: ⟨A⟩ = ⟨ψ|Â|ψ⟩ = Σa_{n}|c_{n}|^{2}
E: ⟨x⟩ = ∫x|ψ|^{2}dx; ⟨p⟩ = ∫ψ*(−iħ∂/∂x)ψ dx
E: ΔA = √(⟨A^{2}⟩ − ⟨A⟩^{2}) :: uncertainty
H: Ehrenfest's theorem
E: d⟨x⟩/dt = ⟨p⟩/m; d⟨p⟩/dt = −⟨dV/dx⟩
P: If the wave packet is narrow compared with the scale over which the force varies, ⟨dV/dx⟩ ≈ dV/dx at ⟨x⟩, and the centre of the packet follows Newton's laws. This is one way classical mechanics emerges.
X: For the infinite well ground state, ⟨x⟩?
> |ψ_{1}|^{2} is symmetric about L/2
> ⟨x⟩ = L/2
!: An expectation value needn't be a possible measurement result: for a spin in an equal superposition of ±ħ/2, ⟨S_{z}⟩ = 0, which is never measured.
Q: What is an expectation value? | The average result of many measurements on identically prepared systems: ⟨ψ|Â|ψ⟩.
Q: What does Ehrenfest's theorem show? | Expectation values obey equations resembling classical equations of motion.
M1: A state has 30% chance of energy 2 eV and 70% of 4 eV. ⟨E⟩ = | 3.4 eV | 3 eV | 6 eV | 2.6 eV | 0.3 × 2 + 0.7 × 4.
M2: ⟨p⟩ for a real, stationary bound-state wavefunction is: | 0 | ħk | Infinite | Undefined | Real ψ gives zero mean momentum.

## Hilbert spaces
S: A Hilbert space is the complete vector space with an inner product in which quantum states live. Its structure, including superposition, orthogonality and dimension, is the mathematical backbone of quantum mechanics.
H: Properties
- Vectors can be added and scaled by complex numbers (superposition).
- Inner product ⟨φ|ψ⟩: gives lengths, angles, probabilities.
- Complete: limits of sequences stay in the space.
- Dimension: 2 for a qubit or spin-½; infinite for a particle in space.
H: Bases
- Orthonormal basis {|n⟩}: ⟨m|n⟩ = δ_{mn}; Σ|n⟩⟨n| = 1.
- Continuous bases: |x⟩ (position), |p⟩ (momentum), with δ-function normalisation.
- Changing basis is a unitary transformation; position and momentum wavefunctions are Fourier transforms of each other.
H: Composite systems
E: H_{AB} = H_{A} ⊗ H_{B}; dim = d_{A} × d_{B}
P: Joining systems multiplies dimensions: n qubits live in a 2^{n}-dimensional space. Fifty qubits need 2^{50} ≈ 10^{15} amplitudes, which is why quantum systems are hard to simulate classically and why quantum computers might be powerful.
X: Dimension of the Hilbert space of 3 spin-½ particles?
> 2^{3} = 8
!: Hilbert space dimension grows exponentially with the number of particles, not linearly.
Q: What is the tensor product used for? | Combining Hilbert spaces of subsystems into the space of the composite system.
Q: How are position and momentum wavefunctions related? | By Fourier transformation.
M1: The Hilbert space of a qubit has dimension: | 2 | 1 | 4 | Infinite | Two basis states.
M2: Ten qubits have a state space of dimension: | 1024 | 20 | 100 | 10 | 2^{10}.

## Superposition
S: The superposition principle says that if two states are possible, any normalised complex combination of them is also a possible state. It allows interference, entanglement and quantum computing.
H: Statement
E: |ψ⟩ = α|A⟩ + β|B⟩, |α|^{2} + |β|^{2} = 1
- Not "both at once" nor "one or the other unknown": a distinct state with its own measurable properties (relative phase matters).
H: Examples
- Electron through both slits.
- Spin up along x = equal superposition of up and down along z.
- Atomic orbitals as superpositions forming chemical bonds (hybridisation).
- Superconducting qubits in superpositions of current directions; large superpositions of ~10^{9} electrons.
H: Schrödinger's cat
P: Schrödinger linked a radioactive atom's superposition to a cat's fate to show how absurd it seems to apply superposition to everyday objects. Decoherence explains why we never observe such macroscopic superpositions: interactions with the environment rapidly destroy their coherence.
X: A qubit (|0⟩ + i|1⟩)/√2 is measured in the basis (|0⟩ ± |1⟩)/√2. Probabilities?
> Amplitude for + : (1 + i)/2 ⇒ P = 1/2
> P(−) = 1/2
!: A superposition isn't the same as a statistical mixture: superpositions can interfere; mixtures can't.
Q: State the superposition principle. | Any linear combination of allowed quantum states is also an allowed state.
Q: How does a superposition differ from a mixture? | A superposition has definite relative phases and can interfere; a mixture is classical uncertainty with no interference.
M1: The relative phase in a superposition: | Affects interference and measurement outcomes in other bases | Is irrelevant | Must be zero | Is the global phase | Observable.
M2: Why don't we see cats in superposition? | Decoherence rapidly destroys macroscopic coherence | Cats aren't quantum | Superposition is forbidden for large objects | Gravity collapses it always | Environmental entanglement.

## Quantum measurement
S: Measurement in quantum mechanics gives a definite outcome with Born-rule probabilities and leaves the system in a corresponding state. How and why a definite result emerges from superposition is the measurement problem.
H: The projection postulate
- Outcome a_{n} with probability |⟨a_{n}|ψ⟩|^{2}; afterwards the state is |a_{n}⟩ (projective measurement).
- Repeated immediate measurement gives the same result.
- **Quantum Zeno effect**: frequent measurement freezes evolution.
H: Generalised measurements
- POVMs: more general outcomes, unsharp or weak measurements.
- **Weak measurement**: small disturbance, little information per run; averaged gives "weak values".
- **Quantum non-demolition measurement**: measures an observable without disturbing it for later measurements.
H: The measurement problem
P: The Schrödinger equation is linear and deterministic, but measurements yield single outcomes. Interpretations differ: collapse (Copenhagen, objective collapse models like GRW), branching (many-worlds), hidden variables (pilot-wave), or treating the wavefunction as information (QBism, relational). Decoherence explains why outcomes look classical but not, by itself, why one occurs.
X: A spin in |↑_{z}⟩ is measured along x, then z. Probability of finding ↑_{z} again?
> x-measurement gives ↑_{x} or ↓_{x} (each 1/2), resetting the state
> Then P(↑_{z}) = 1/2: the intermediate measurement destroyed the original state
!: Measurement isn't passive observation; it generally changes the state.
Q: What is the measurement problem? | Explaining how definite single outcomes arise from linear, unitary quantum evolution.
Q: What is the quantum Zeno effect? | Frequent measurement inhibits a system's evolution.
M1: After a projective measurement giving a_{n}, the state is: | The eigenstate |a_{n}⟩ | Unchanged | Random | Zero | Projection.
M2: Which interpretation has no collapse but branching worlds? | Many-worlds | Copenhagen | GRW | Pilot-wave | Everett.

## Commutators
S: The commutator of two operators measures whether the order of applying them matters. Non-commuting observables can't be simultaneously sharp, and the canonical commutator [x, p] = iħ is the heart of quantum mechanics.
H: Definition
E: [Â, B̂] = ÂB̂ − B̂Â
E: [x̂, p̂_{x}] = iħ
E: [L̂_{x}, L̂_{y}] = iħL̂_{z} (and cyclic)
E: [Ĥ, Â] = 0 ⇒ ⟨A⟩ conserved :: from dÂ/dt = (i/ħ)[Ĥ, Â]
H: Uses
- Uncertainty relation: ΔA ΔB ≥ ½|⟨[Â, B̂]⟩|.
- Conservation laws: operators commuting with Ĥ are constants of motion and share eigenstates with it (good quantum numbers).
- Ladder operators: [â, â†] = 1 builds the harmonic oscillator spectrum.
H: Classical correspondence
P: Dirac noticed commutators replace classical Poisson brackets: {A, B} → [Â, B̂]/(iħ). Canonical quantisation imposes this rule; as ħ → 0, the commutators vanish and quantities commute, as in classical physics.
X: Show [x̂, p̂]f = iħf.
> x̂p̂f = −iħx df/dx; p̂x̂f = −iħ(f + x df/dx)
> Difference: iħf
!: Commuting observables can be measured together sharply; non-commuting ones can't, however good the apparatus.
Q: What is the canonical commutation relation? | [x̂, p̂] = iħ.
Q: How do you tell if a quantity is conserved? | If its operator commutes with the Hamiltonian.
M1: [L̂_{z}, L̂_{x}] = | iħL̂_{y} | 0 | −iħL̂_{y} | iħL̂_{z} | Cyclic.
M2: If [Ĥ, Â] = 0 then: | ⟨A⟩ is constant in time | A is zero | H is zero | A is unobservable | Conserved quantity.

## Compatible and incompatible observables
S: Compatible observables can have definite values at the same time and share a set of eigenstates; incompatible observables can't. This is why quantum states are labelled by a maximal set of compatible quantum numbers.
H: Compatibility
- Compatible ⇔ the operators commute ⇔ a common eigenbasis exists.
- Measuring one doesn't disturb the other's value.
- Complete set of commuting observables (CSCO): enough to label states uniquely.
H: Examples
- Hydrogen: Ĥ, L̂^{2}, L̂_{z}, Ŝ_{z} commute: quantum numbers n, l, m_{l}, m_{s}.
- Incompatible: x and p; S_{x} and S_{z}; different components of angular momentum.
- Position x and momentum p_{y} are compatible.
H: Sequential measurements
P: Measure S_{z}, then S_{x}, then S_{z} again: the second S_{z} result is random, because S_{x} measurement erased the earlier S_{z} information. With compatible observables the order doesn't matter, and repeated results agree.
X: Can a hydrogen atom have definite L^{2} and L_{z}? L_{z} and L_{x}?
> L^{2} and L_{z} commute: yes (states |l, m⟩)
> L_{z} and L_{x} don't: no, except when l = 0
!: Incompatibility isn't measurement clumsiness: there's no state with definite values for both.
Q: When are two observables compatible? | When their operators commute.
Q: What labels hydrogen's states? | Eigenvalues of a complete set of commuting observables: n, l, m_{l}, m_{s}.
M1: Which pair is compatible? | x and p_{y} | x and p_{x} | S_{x} and S_{y} | L_{x} and L_{y} | Different directions commute.
M2: A complete set of commuting observables: | Uniquely labels basis states | Must include x and p | Has one operator | Doesn't exist | CSCO.

## Infinite and finite potential wells
S: A particle confined in a potential well can only have certain energies. The infinite square well is the simplest example; finite wells allow the wavefunction to leak into the walls, lowering energies and permitting tunnelling.
H: Infinite square well (width L)
E: E_{n} = n^{2}h^{2}/(8mL^{2}) = n^{2}π^{2}ħ^{2}/(2mL^{2})
E: ψ_{n} = √(2/L) sin(nπx/L)
- n = 1, 2, 3…; zero-point energy E_{1} > 0.
- Narrower wells give larger energies.
H: Finite well (depth V_{0})
- Inside: oscillating; outside: decaying e^{−κx}, κ = √(2m(V_{0} − E))/ħ.
- Finite number of bound states (at least one in 1D).
- Energies lower than the infinite-well values.
H: Real examples
P: Quantum dots are nanocrystals whose size sets the energy gap: smaller dots emit bluer light (QLED displays; Nobel Chemistry 2023). Semiconductor quantum wells make efficient laser diodes. Electrons in conjugated molecules behave like particles in a box, explaining dye colours.
X: Ground-state energy of an electron in a 1 nm infinite well?
> E_{1} = h^{2}/(8mL^{2}) = (6.63 × 10^{-34})^{2}/(8 × 9.11 × 10^{-31} × 10^{-18})
> = 6.0 × 10^{-20} J ≈ 0.38 eV
!: The particle can't have zero energy in a well; zero would violate the uncertainty principle.
Q: How do infinite-well energies depend on n and L? | E ∝ n^{2}/L^{2}.
Q: Why do smaller quantum dots emit bluer light? | Stronger confinement raises the energy levels and gap.
M1: The ratio E_{3}/E_{1} in an infinite well is: | 9 | 3 | 6 | 27 | n^{2}.
M2: Compared with an infinite well, a finite well's energies are: | Lower | Higher | The same | Zero | Wavefunction spreads out.

## Quantum tunnelling
S: A quantum particle can pass through a barrier higher than its energy, because its wavefunction decays inside the barrier but doesn't vanish. Tunnelling powers the Sun, alpha decay, flash memory and the scanning tunnelling microscope.
H: Transmission
E: T ≈ e^{−2κd}, κ = √(2m(V_{0} − E))/ħ :: thick barrier
- Extremely sensitive to barrier width d and to √(mass × height).
- Electrons tunnel easily; protons less; macroscopic objects effectively never.
H: Examples
- **Alpha decay**: Gamow (1928) explained half-lives ranging from 10^{-7} s to 10^{10} years by tunnelling through the Coulomb barrier.
- **Nuclear fusion in stars**: protons tunnel through their Coulomb repulsion at "only" 15 million K.
- **Scanning tunnelling microscope** (Binnig and Rohrer, Nobel 1986): tunnelling current changes ~10× per Å of gap: atomic resolution.
- **Flash memory**: electrons tunnel onto a floating gate.
- **Tunnel diodes, Josephson junctions**, enzyme reactions transferring protons.
X: An electron (E = 1 eV) meets a 5 eV, 0.5 nm barrier. Estimate T.
> κ = √(2 × 9.11 × 10^{-31} × 4 × 1.6 × 10^{-19})/1.055 × 10^{-34} = 1.02 × 10^{10} m^{-1}
> T ≈ e^{−10.2} ≈ 4 × 10^{-5}
!: Tunnelling doesn't violate energy conservation; the particle is never found inside the barrier with negative kinetic energy in any measurement.
Q: Why does the STM have atomic resolution? | Tunnelling current depends exponentially on gap width, changing about 10 times per ångström.
Q: How does tunnelling explain alpha decay? | Alpha particles tunnel through the Coulomb barrier; tiny changes in energy change the rate enormously.
M1: Tunnelling probability increases if the barrier is: | Thinner or lower | Thicker | Higher | Heavier particle | e^{−2κd}.
M2: Which technology relies on tunnelling? | Flash memory | Incandescent lamps | Transformers | Solar thermal panels | Floating gate.

## Quantum harmonic oscillator
S: The quantum harmonic oscillator has evenly spaced energy levels and a nonzero ground-state energy. Because small vibrations are harmonic, it describes molecular vibrations, phonons, photons in a cavity and quantum fields.
H: Energies and states
E: E_{n} = (n + ½)ħω, n = 0, 1, 2…
E: ψ_{0} ∝ e^{−mωx^{2}/(2ħ)} :: Gaussian ground state
- Higher states: Hermite polynomials times the Gaussian.
- Zero-point energy ½ħω: atoms vibrate even at absolute zero (why helium stays liquid at 0 K under normal pressure).
H: Ladder operators
E: â = √(mω/2ħ)(x̂ + ip̂/(mω)); Ĥ = ħω(â†â + ½)
E: â†|n⟩ = √(n + 1)|n + 1⟩; â|n⟩ = √n|n − 1⟩
- Raising and lowering by one quantum ħω.
- In quantum field theory, â† creates a particle; â destroys one.
H: Applications
- Molecular vibrational spectra (IR spectroscopy, selection rule Δn = ±1).
- Phonons in solids; photons in each EM mode.
- Coherent states (laser light), squeezed states (LIGO uses squeezed light to beat shot noise).
X: CO vibrates at 6.4 × 10^{13} Hz. Zero-point energy and level spacing?
> ħω = hf = 0.265 eV
> Zero-point 0.13 eV; spacing 0.265 eV (absorbs at 4.7 μm)
!: The quantum oscillator's ground state isn't at rest at the bottom of the potential; it's spread out with zero-point motion.
Q: What are the energy levels of the quantum harmonic oscillator? | E_{n} = (n + ½)ħω.
Q: What do ladder operators do? | Raise or lower the oscillator's state by one quantum ħω.
M1: The energy spacing in the quantum harmonic oscillator is: | ħω, constant | Increasing with n | Decreasing with n | Zero | Evenly spaced.
M2: The ground state wavefunction is: | A Gaussian | A sine wave | A step | Zero | e^{−αx^{2}}.

## Quantum barriers and scattering
S: Quantum scattering describes how particles bounce off or pass through potentials. Unlike classical particles, quantum ones can reflect from drops as well as steps, tunnel through barriers, and show resonances.
H: Potential step (E > V_{0})
E: R = ((k_{1} − k_{2})/(k_{1} + k_{2}))^{2}; T = 1 − R
- Partial reflection even when the particle has enough energy: a wave effect.
- For E < V_{0}: total reflection with an evanescent tail.
H: Barriers and wells
- **Resonant transmission**: T = 1 when the barrier or well width fits whole half-wavelengths (Ramsauer–Townsend effect: slow electrons pass through noble gas atoms almost unscattered).
- **Resonant tunnelling diodes**: double barriers with a quantum well between them.
H: 3D scattering
E: σ = ∫(dσ/dΩ)dΩ :: cross-section
- Partial waves: s-wave scattering dominates at low energy.
- Born approximation for weak potentials: amplitude ∝ Fourier transform of V.
- Rutherford's formula is recovered quantum mechanically for Coulomb scattering.
X: Electrons (E = 5 eV) meet a step of 3 eV. Reflection probability?
> k ∝ √E: k_{1}/k_{2} = √(5/2) = 1.58
> R = ((1.58 − 1)/2.58)^{2} = 0.05
!: Quantum particles can reflect off a step even when they have more than enough energy to climb it.
Q: What is the Ramsauer–Townsend effect? | Low-energy electrons pass almost unscattered through noble gas atoms because of resonant transmission.
Q: What does a scattering cross-section measure? | The effective target area for a scattering process.
M1: A particle with E > V_{0} at a step: | Can still partly reflect | Always transmits | Always reflects | Stops | Wave mismatch.
M2: At low energies, scattering is dominated by: | s-waves (l = 0) | High-l partial waves | Magnetic forces | Gravity | Centrifugal barrier suppresses higher l.

## Angular momentum
S: In quantum mechanics angular momentum is quantised in both magnitude and direction. Only one component can be known at a time, and allowed values come in steps of ħ.
H: Eigenvalues
E: L̂^{2}|l, m⟩ = l(l + 1)ħ^{2}|l, m⟩
E: L̂_{z}|l, m⟩ = mħ|l, m⟩, m = −l, …, +l
- Orbital l = 0, 1, 2…; general j can be half-integer (spin).
- 2l + 1 states for each l.
- |L| = √(l(l + 1))ħ > the maximum L_{z} = lħ: L can never point exactly along z.
H: Algebra
E: [L̂_{i}, L̂_{j}] = iħε_{ijk}L̂_{k}; [L̂^{2}, L̂_{i}] = 0
E: L̂_{±} = L̂_{x} ± iL̂_{y} :: raise and lower m by 1
H: Physical consequences
- Atomic orbitals: s (l = 0), p (1), d (2), f (3).
- Rotational spectra of molecules: E = ħ^{2}l(l + 1)/(2I).
- Selection rules for photon transitions: Δl = ±1 (photon carries one unit).
- Zeeman effect: m levels split in a magnetic field.
X: For l = 2, list possible L_{z} and |L|.
> L_{z} = −2ħ, −ħ, 0, ħ, 2ħ
> |L| = √6 ħ ≈ 2.45ħ
!: The vector model's "cone" is a picture; L_{x} and L_{y} aren't definite while L_{z} is.
Q: What are the eigenvalues of L^{2}? | l(l + 1)ħ^{2}.
Q: How many m values are there for a given l? | 2l + 1.
M1: For l = 1, the magnitude of L is: | √2 ħ | ħ | 2ħ | 0 | √(1 × 2).
M2: The selection rule for electric dipole transitions is: | Δl = ±1 | Δl = 0 | Δl = ±2 | Any Δl | Photon spin 1.

## Spin
S: Spin is an intrinsic angular momentum carried by particles, with no classical analogue as literal rotation. Electrons have spin ½: measured along any axis it's always +ħ/2 or −ħ/2. Spin explains magnetism, the periodic table and MRI.
H: Spin-½
E: S_{z} = ±ħ/2; |S| = (√3/2)ħ
E: Ŝ = (ħ/2)σ :: Pauli matrices σ_{x}, σ_{y}, σ_{z}
- States |↑⟩, |↓⟩; general state α|↑⟩ + β|↓⟩ (a point on the Bloch sphere).
- Rotating a spin-½ state by 360° multiplies it by −1; 720° returns it (shown with neutron interferometry).
H: Discovery and origin
- Stern–Gerlach (1922): silver atoms split into two beams.
- Uhlenbeck and Goudsmit (1925): electron spin explains fine structure and the anomalous Zeeman effect.
- Dirac (1928): spin arises naturally from relativistic quantum mechanics, with g = 2 (QED corrects to 2.00232).
H: Spin of particles
- Fermions: half-integer (electrons, quarks, protons, neutrons: ½).
- Bosons: integer (photon 1, gluon 1, W/Z 1, Higgs 0, graviton 2 hypothetically).
- Spin–statistics theorem links spin to whether particles obey Pauli exclusion.
X: A spin in state (|↑⟩ + |↓⟩)/√2 is in a field along z. What happens over time?
> The two components acquire different phases at rate ΔE/ħ
> The spin precesses about z at the Larmor frequency
!: Spin isn't literally a spinning ball; a point electron spinning fast enough to give ħ/2 would need surface speeds far above c.
Q: What values can an electron's spin component along any axis take? | ±ħ/2.
Q: What is the spin–statistics theorem? | Half-integer spin particles are fermions; integer spin particles are bosons.
M1: The Pauli matrix σ_{z} has eigenvalues: | ±1 | ±½ | 0 and 1 | ±ħ | Then S_{z} = ±ħ/2.
M2: A photon has spin: | 1 | ½ | 0 | 2 | Vector boson.

## Addition of angular momentum
S: When two angular momenta combine (orbital and spin, or two particles' spins), the total takes a range of quantum numbers. Working out the combined states, using Clebsch–Gordan coefficients, explains atomic fine structure and multiplets.
H: Rules
E: J = J_{1} + J_{2}; j = |j_{1} − j_{2}|, …, j_{1} + j_{2}
E: m = m_{1} + m_{2}
- Number of states conserved: (2j_{1} + 1)(2j_{2} + 1) = Σ(2j + 1).
H: Two spin-½ particles
- Triplet (S = 1): |↑↑⟩, (|↑↓⟩ + |↓↑⟩)/√2, |↓↓⟩: symmetric.
- Singlet (S = 0): (|↑↓⟩ − |↓↑⟩)/√2: antisymmetric; maximally entangled.
- 2 × 2 = 3 + 1.
H: In atoms
- Spin–orbit coupling: J = L + S gives fine structure (sodium D lines: 2P_{1/2} and 2P_{3/2}).
- LS (Russell–Saunders) coupling for light atoms; jj coupling for heavy ones.
- Term symbols ^{2S+1}L_{J}.
- Hyperfine structure: nuclear spin I couples to J (hydrogen 21 cm line: F = 1 ↔ 0).
X: An electron with l = 1 and s = ½. Possible j values and state counts?
> j = ½ (2 states) or 3/2 (4 states): total 6 = 3 × 2 ✓
!: Total angular momentum quantum numbers don't simply add; they range from the difference to the sum.
Q: What total spins can two spin-½ particles have? | S = 1 (triplet) or S = 0 (singlet).
Q: What causes fine structure? | Spin–orbit coupling between the electron's spin and orbital angular momentum.
M1: Combining j_{1} = 1 and j_{2} = 1 gives j = : | 0, 1, 2 | 2 only | 1 only | 0 and 2 | |1 − 1| to 1 + 1.
M2: The hydrogen 21 cm line comes from: | Hyperfine flip between electron and proton spins | Fine structure | Lyman alpha | Rotational states | F = 1 ↔ 0.

## Identical particles
S: Identical quantum particles are truly indistinguishable: swapping two can't change any measurable result. So the total wavefunction must be symmetric (bosons) or antisymmetric (fermions) under exchange, with dramatic physical consequences.
H: Exchange symmetry
E: ψ(x_{2}, x_{1}) = ±ψ(x_{1}, x_{2})
- + for bosons: symmetric; − for fermions: antisymmetric.
- Classical particles could in principle be tracked; quantum ones can't.
H: Consequences
- Fermions: Pauli exclusion; atomic shell structure; degeneracy pressure.
- Bosons: bunching; Bose–Einstein condensation; lasers.
- **Exchange interaction**: symmetry of the spatial wavefunction depends on spin state, giving an effective spin–spin energy (ferromagnetism, covalent bonds).
- **Hong–Ou–Mandel effect**: two identical photons meeting at a 50:50 beam splitter always leave together.
H: Anyons
P: In two dimensions, exchange can give any phase e^{iθ}: anyons. They occur in the fractional quantum Hall effect, and non-abelian anyons are proposed for topologically protected quantum computing.
X: Build an antisymmetric spatial state of two particles in single-particle states a and b.
> ψ = [φ_{a}(x_{1})φ_{b}(x_{2}) − φ_{b}(x_{1})φ_{a}(x_{2})]/√2
> If a = b, ψ = 0: Pauli exclusion
!: Indistinguishability isn't about our lack of labels; it's a fundamental symmetry with observable effects.
Q: What symmetry must fermion wavefunctions have? | Antisymmetric under exchange of any two particles.
Q: What is the Hong–Ou–Mandel effect? | Two identical photons entering a 50:50 beam splitter from opposite sides always exit together.
M1: Bosons have wavefunctions that are: | Symmetric under exchange | Antisymmetric | Zero | Unchanged in sign only for one particle | +.
M2: Anyons can exist in: | Two dimensions | Three dimensions | One dimension only | Vacuum | Exchange paths differ topologically.

## Bosons and fermions
S: All particles are either bosons (integer spin, sociable: any number can share a state) or fermions (half-integer spin, antisocial: one per state). This split shapes matter (fermions) and forces (bosons).
H: Fermions
- Electrons, quarks, neutrinos, protons, neutrons, ^{3}He atoms.
- Obey Fermi–Dirac statistics; Pauli exclusion.
- Matter is stable and occupies space because of fermion exclusion.
H: Bosons
- Photons, gluons, W and Z, Higgs, mesons, ^{4}He atoms, phonons.
- Obey Bose–Einstein statistics; stimulated emission; condensation.
- Force carriers in the Standard Model are bosons.
H: Composite particles
- Odd number of fermions: fermion (^{3}He: 2p, 1n, 2e = 5).
- Even number: boson (^{4}He: 2p, 2n, 2e = 6).
- So ^{4}He becomes superfluid at 2.17 K, ^{3}He only at ~2.5 mK (after pairing).
H: Pairs
P: Fermions can pair into bosons: Cooper pairs of electrons cause superconductivity; ^{3}He atoms pair to form a superfluid; ultracold fermionic atoms form molecular BECs.
X: Is a deuterium atom (1p, 1n, 1e) a boson or fermion?
> 3 fermions: fermion
!: Whether a composite particle behaves as a boson holds only when probed at energies too low to resolve its internal structure.
Q: How do you tell if a composite particle is a boson or fermion? | Count its constituent fermions: even means boson, odd means fermion.
Q: Why does superconductivity involve bosons? | Electrons form Cooper pairs, which act as bosons and condense.
M1: Which is a fermion? | Neutrino | Photon | Gluon | Higgs boson | Spin ½.
M2: ^{4}He is a: | Boson | Fermion | Anyon | Neither | 6 fermions.

## Pauli exclusion principle
S: No two identical fermions can occupy the same quantum state. This simple rule, a consequence of antisymmetric wavefunctions, builds the periodic table, makes matter rigid and holds up white dwarfs and neutron stars.
H: Statement
- In an atom, no two electrons can share all four quantum numbers (n, l, m_{l}, m_{s}).
- Each spatial orbital holds at most two electrons, with opposite spins.
H: Consequences
- **Shell structure**: electrons fill successive shells (2, 8, 18…), giving chemistry and periodicity.
- **Stability of matter**: Lieb and Thirring showed exclusion is essential for bulk matter not to collapse.
- **Degeneracy pressure**: white dwarfs and neutron stars.
- **Fermi sea in metals**: electrons fill up to the Fermi energy.
- **Covalent bonding and magnetism** via exchange.
H: Discovery
P: Pauli (1925) proposed exclusion to explain atomic spectra and the periodic table, before electron spin was understood; later he connected it to the spin–statistics theorem (1940). Nobel 1945.
X: Maximum electrons in the n = 3 shell?
> l = 0, 1, 2: orbitals 1 + 3 + 5 = 9
> × 2 spins = 18 = 2n^{2}
!: The exclusion principle isn't a force; it's a symmetry constraint whose effects look like a strong repulsion.
Q: State the Pauli exclusion principle. | No two identical fermions can occupy the same quantum state.
Q: How many electrons can a shell n hold? | 2n^{2}.
M1: An atomic orbital holds at most: | 2 electrons | 1 | 8 | 18 | Opposite spins.
M2: Pauli exclusion is essential for: | The stability and size of matter | Superconductivity only | Photons | Gravity | Lieb–Thirring.

## Hydrogen atom
S: Hydrogen, one electron bound to a proton, is the only atom the Schrödinger equation solves exactly. Its energy levels, orbitals and spectrum underpin all of atomic physics and chemistry.
H: Energy levels
E: E_{n} = −13.6 eV/n^{2}
E: a_{0} = 4πε_{0}ħ^{2}/(m_{e}e^{2}) = 0.0529 nm :: Bohr radius
E: 1/λ = R_{H}(1/n_{f}^{2} − 1/n_{i}^{2}), R_{H} = 1.097 × 10^{7} m^{-1}
- Lyman (to n = 1, UV), Balmer (to n = 2, visible: Hα 656 nm), Paschen (to n = 3, IR).
- Degeneracy n^{2} (2n^{2} with spin) in the simple model.
H: Wavefunctions
E: ψ_{nlm} = R_{nl}(r)Y_{lm}(θ, φ)
- Quantum numbers n ≥ 1, 0 ≤ l ≤ n − 1, −l ≤ m ≤ l.
- Ground state ψ_{100} ∝ e^{−r/a_{0}}; most probable radius a_{0}.
H: Beyond the basic model
- Fine structure (relativity and spin–orbit, ~10^{-4} eV).
- Lamb shift (QED, ~4 μeV: 2s and 2p_{1/2} split).
- Hyperfine structure (21 cm line).
- Hydrogen's 1s–2s transition is measured to 15 significant figures, testing QED and fundamental constants.
X: Wavelength of Hα (n = 3 → 2)?
> 1/λ = 1.097 × 10^{7}(1/4 − 1/9) = 1.52 × 10^{6} m^{-1}
> λ = 656 nm (red)
!: Electrons don't orbit in neat circles; orbitals are probability clouds.
Q: What are hydrogen's energy levels? | E_{n} = −13.6 eV/n^{2}.
Q: Which series of hydrogen lines is visible? | The Balmer series (transitions to n = 2).
M1: Ionisation energy of hydrogen from the ground state: | 13.6 eV | 3.4 eV | 10.2 eV | 1 eV | E_{∞} − E_{1}.
M2: The number of states (ignoring spin) for n = 3 is: | 9 | 3 | 6 | 18 | n^{2}.

## Orbital angular momentum
S: An electron moving around a nucleus has orbital angular momentum, quantised by l and m. Its value fixes an orbital's shape (s, p, d, f) and orientation, and governs which spectral transitions are allowed.
H: Operators
E: L̂ = r̂ × p̂; L̂_{z} = −iħ ∂/∂φ
E: Y_{lm}(θ, φ) :: spherical harmonics, eigenfunctions of L̂^{2} and L̂_{z}
- l = 0 (s): spherical; l = 1 (p): dumbbells; l = 2 (d): cloverleaves; l = 3 (f).
- Parity (−1)^{l}.
H: Magnetic moment
E: μ_{L} = −(e/2m_{e})L; μ_{z} = −m_{l}μ_{B}
- Normal Zeeman effect: levels split by m_{l}μ_{B}B.
H: Effective potential
E: V_{eff} = V(r) + ħ^{2}l(l + 1)/(2mr^{2})
P: The centrifugal term keeps electrons with l > 0 away from the nucleus. In multi-electron atoms, s electrons penetrate inner shells more than p, d or f, feeling more nuclear charge: so 4s fills before 3d, explaining the transition metals' place in the periodic table.
X: Normal Zeeman splitting between adjacent m_{l} levels in 1 T?
> ΔE = μ_{B}B = 9.27 × 10^{-24} J = 5.8 × 10^{-5} eV
!: Orbital shapes are |ψ|^{2} plots of real combinations of Y_{lm}; the m = ±1 complex states are doughnut-shaped.
Q: What functions describe the angular part of orbitals? | Spherical harmonics Y_{lm}.
Q: Why does 4s fill before 3d? | s electrons penetrate closer to the nucleus, experiencing less shielding and lower energy.
M1: A d orbital has l = : | 2 | 1 | 0 | 3 | s, p, d, f.
M2: The normal Zeeman effect splits a level into: | 2l + 1 components | 2 components | l components | n components | m_{l} values.

## Approximation methods
S: Most quantum problems can't be solved exactly. Approximation methods (perturbation theory, the variational method, WKB, numerical methods) give accurate answers by building on solvable problems or clever guesses.
H: The toolbox
- **Perturbation theory**: small corrections to a solved problem.
- **Variational method**: upper bounds on ground-state energies from trial wavefunctions.
- **WKB**: semiclassical, for slowly varying potentials (tunnelling, quantisation rules).
- **Adiabatic approximation**: slowly changing Hamiltonians keep systems in instantaneous eigenstates (Born–Oppenheimer separation of electrons and nuclei in molecules).
- **Mean-field / Hartree–Fock**: each particle in the average field of the others.
- **Numerical**: matrix diagonalisation, density functional theory (DFT, the workhorse of chemistry and materials science), quantum Monte Carlo, tensor networks.
H: Choosing a method
P: Perturbation theory suits weak extra effects (fields, small couplings); variational methods suit ground states of strongly interacting systems; WKB suits high quantum numbers and smooth potentials. Modern computational physics combines them; DFT is behind most predictions of new materials and drugs.
X: Why can the Born–Oppenheimer approximation treat nuclei as fixed?
> Nuclei are thousands of times heavier, moving much more slowly
> Solve for electrons at fixed nuclear positions, then move the nuclei on the resulting energy surface
!: Approximations have domains of validity; perturbation series can diverge when the "small" term isn't small.
Q: What is the Born–Oppenheimer approximation? | Separating fast electron motion from slow nuclear motion in molecules.
Q: What is DFT used for? | Calculating electronic structure of molecules and materials from the electron density.
M1: Which method gives an upper bound on the ground-state energy? | Variational method | Perturbation theory | WKB | Born approximation | Any trial ψ.
M2: WKB is most accurate for: | Slowly varying potentials | Rapidly varying potentials | Low quantum numbers only | Free particles | Semiclassical.

## Perturbation theory
S: Perturbation theory finds approximate energies and states when a small extra term is added to a Hamiltonian we can solve. It explains the Stark and Zeeman effects, fine structure and transition rates.
H: Time-independent (non-degenerate)
E: Ĥ = Ĥ_{0} + λĤ′
E: E_{n}^{(1)} = ⟨n|Ĥ′|n⟩ :: first-order energy shift
E: E_{n}^{(2)} = Σ_{m≠n}|⟨m|Ĥ′|n⟩|^{2}/(E_{n} − E_{m}) :: second order
- Second-order shifts of the ground state are always negative.
- Degenerate levels: diagonalise Ĥ′ within the degenerate subspace first.
H: Time-dependent and Fermi's golden rule
E: Γ_{i→f} = (2π/ħ)|⟨f|Ĥ′|i⟩|^{2}ρ(E_{f})
- Transition rates for absorption, emission, decay and scattering.
- Selection rules come from zero matrix elements.
H: Examples
- Stark effect: shifts in electric fields (linear for hydrogen's degenerate n = 2; quadratic in general).
- Zeeman effect.
- Spontaneous emission rates; beta decay rates (Fermi's theory).
- QED's Feynman diagrams are perturbation theory in α ≈ 1/137.
X: A particle in a box gets a small uniform potential V_{0} across the whole box. First-order shift?
> E^{(1)} = ⟨n|V_{0}|n⟩ = V_{0} (exact, as it happens)
!: Perturbation theory fails when the matrix elements are comparable to energy differences; near-degenerate levels need special treatment.
Q: What is the first-order energy correction? | The expectation value of the perturbation in the unperturbed state.
Q: State Fermi's golden rule. | Transition rate = (2π/ħ)|matrix element|^{2} × density of final states.
M1: The second-order correction to the ground-state energy is: | Always negative | Always positive | Zero | Undefined | Denominators all negative.
M2: Selection rules arise when: | Matrix elements vanish by symmetry | Energies are large | States are degenerate | Perturbations are strong | ⟨f|Ĥ′|i⟩ = 0.

## Variational method
S: The variational method estimates a ground-state energy by guessing a trial wavefunction with adjustable parameters and minimising its energy. The result is always an upper bound on the true value.
H: The principle
E: E_{0} ≤ ⟨ψ_{trial}|Ĥ|ψ_{trial}⟩/⟨ψ_{trial}|ψ_{trial}⟩
- Choose a physically sensible trial function, minimise over parameters.
- Errors in energy are second order in errors in the wavefunction: decent guesses give good energies.
H: Examples
- Helium atom: trial ψ ∝ e^{−Z_{eff}(r_{1} + r_{2})/a_{0}} gives Z_{eff} = 27/16 (screening) and E = −77.5 eV vs measured −79.0 eV.
- Hydrogen molecule ion and covalent bonds (LCAO).
- Quantum chemistry: Hartree–Fock and configuration interaction.
- Variational quantum eigensolvers on quantum computers.
H: Neural-network wavefunctions
P: Recent methods use neural networks as flexible trial wavefunctions (FermiNet, PauliNet), optimised with variational Monte Carlo, reaching chemical accuracy for small molecules.
X: Use a Gaussian trial ψ = e^{−αx^{2}} for the harmonic oscillator.
> ⟨H⟩ = ħ^{2}α/(2m) + mω^{2}/(8α)
> Minimise: α = mω/(2ħ), ⟨H⟩ = ħω/2: exact, because the true ground state is Gaussian
!: The variational method gives an upper bound to the energy but doesn't guarantee the wavefunction itself is accurate for other properties.
Q: State the variational principle. | The expectation value of H in any trial state is at least the true ground-state energy.
Q: Why do variational energies converge faster than wavefunctions? | Energy errors are second order in wavefunction errors.
M1: A variational estimate of the ground-state energy is: | Always ≥ the true value | Always ≤ | Exact | Random | Upper bound.
M2: Helium's variational effective charge 27/16 shows: | Each electron partly screens the nucleus from the other | Helium has fractional protons | Electrons don't interact | Z_{eff} > 2 | Screening.

## WKB approximation
S: The WKB approximation solves the Schrödinger equation when the potential varies slowly compared with the wavelength. It gives semiclassical quantisation rules and tunnelling rates, bridging quantum and classical physics.
H: The approximation
E: ψ(x) ≈ (C/√p(x))e^{±(i/ħ)∫p(x)dx}, p(x) = √(2m(E − V(x)))
- Local wavelength λ(x) = h/p(x); valid when λ changes little over one wavelength.
- Fails near classical turning points; connection formulas patch across them.
H: Quantisation
E: ∮p dx = (n + ½)h :: Bohr–Sommerfeld with Maslov correction
- Exact for the harmonic oscillator; excellent for high n.
H: Tunnelling
E: T ≈ exp(−(2/ħ)∫√(2m(V − E))dx)
P: Gamow used this to explain alpha-decay half-lives (Geiger–Nuttall law: log t_{1/2} ∝ 1/√E), spanning 24 orders of magnitude for a factor of two in alpha energy. The same integral gives fusion rates in stars (the Gamow peak).
X: Apply ∮p dx = (n + ½)h to the harmonic oscillator.
> The phase-space orbit is an ellipse of area 2πE/ω
> 2πE/ω = (n + ½)h ⇒ E = (n + ½)ħω: exact
!: WKB breaks down where the classical momentum is zero (turning points) and in rapidly varying potentials.
Q: When is WKB valid? | When the potential varies slowly over the local de Broglie wavelength.
Q: What does the WKB tunnelling formula explain in nuclear physics? | The enormous range of alpha-decay half-lives (Geiger–Nuttall law).
M1: WKB quantisation gives exact energies for: | The harmonic oscillator | Hydrogen | All potentials | No potentials | Special case.
M2: WKB fails near: | Classical turning points | Potential minima | Free regions | Infinity | p → 0 there.

## Density matrices
S: The density matrix describes quantum states including classical uncertainty about which state a system is in. It's essential for open systems, thermal states, entanglement and quantum information.
H: Definition
E: ρ = Σp_{i}|ψ_{i}⟩⟨ψ_{i}|
E: ⟨A⟩ = Tr(ρÂ)
- Properties: Hermitian, positive, Tr ρ = 1.
- Diagonal elements: populations; off-diagonal: coherences.
H: Evolution
E: dρ/dt = −(i/ħ)[Ĥ, ρ] :: closed system (von Neumann equation)
E: Lindblad master equation :: open systems with decay and dephasing
H: Reduced density matrices
E: ρ_{A} = Tr_{B}(ρ_{AB}) :: partial trace
P: For an entangled pair, each particle alone is described by a mixed reduced density matrix even though the pair is in a pure state. This is how subsystems of entangled systems lose their individual definiteness.
X: Density matrix for a qubit that's |0⟩ with probability 0.7 and |1⟩ with 0.3?
> ρ = [[0.7, 0], [0, 0.3]]
> No off-diagonal terms: a classical mixture, no coherence
!: Different ensembles of pure states can give the same density matrix; ρ captures everything measurable, not the "true" preparation.
Q: How do you find an expectation value from a density matrix? | ⟨A⟩ = Tr(ρÂ).
Q: What do off-diagonal density-matrix elements represent? | Quantum coherences between basis states.
M1: The trace of any density matrix equals: | 1 | 0 | The number of states | Its purity | Normalisation.
M2: The reduced state of one particle from a Bell pair is: | Maximally mixed | Pure | Zero | Undefined | ρ = I/2.

## Mixed and pure states
S: A pure state is a single quantum state vector; a mixed state is a statistical mixture, arising from classical ignorance or from entanglement with something else. Purity and entropy quantify how mixed a state is.
H: Measures
E: Tr(ρ^{2}) = 1 (pure); < 1 (mixed); 1/d (maximally mixed)
E: S = −Tr(ρ ln ρ) :: von Neumann entropy (0 for pure)
H: Bloch sphere (qubit)
E: ρ = ½(I + r·σ)
- Pure states on the surface (|r| = 1), mixed inside, maximally mixed at the centre.
- Decoherence shrinks the Bloch vector towards the axis or centre.
H: Proper vs improper mixtures
P: A proper mixture comes from preparing different states at random; an improper one from tracing out an entangled partner. They're described by the same density matrix and are experimentally indistinguishable locally, but differ in interpretation. This matters for the measurement problem.
X: Purity of ρ = [[0.5, 0.5], [0.5, 0.5]]?
> ρ^{2} = ρ, Tr = 1: pure (it's |+⟩⟨+|)
!: A 50:50 mixture of |0⟩ and |1⟩ is not the same as the superposition (|0⟩ + |1⟩)/√2, though both give 50:50 in the z basis.
Q: How can you tell if a state is pure from ρ? | Tr(ρ^{2}) = 1.
Q: Where are mixed states on the Bloch sphere? | Inside the sphere, not on the surface.
M1: The von Neumann entropy of a pure state is: | 0 | 1 | ln 2 | Infinite | No uncertainty.
M2: A maximally mixed qubit has Bloch vector: | Zero length | Length 1 | Length 2 | Along z | Centre of sphere.

## Quantum entanglement
S: Entangled particles share a joint quantum state that can't be written as separate states for each. Measurements on them are correlated more strongly than any local classical theory allows, as Bell's theorem proves and experiments confirm.
H: Definition
E: |ψ⟩_{AB} ≠ |a⟩_{A} ⊗ |b⟩_{B}
E: |Φ^{+}⟩ = (|00⟩ + |11⟩)/√2 :: a Bell state
H: EPR and Bell
- Einstein, Podolsky and Rosen (1935): entanglement suggests quantum mechanics is incomplete.
- Bell (1964): any local hidden-variable theory obeys inequalities (CHSH: S ≤ 2) that quantum mechanics violates (up to 2√2).
- Experiments: Aspect (1982), loophole-free tests (2015). Nobel 2022: Aspect, Clauser, Zeilinger.
H: No signalling
P: Measuring one particle instantly fixes correlations with the other, but each outcome alone is random, so no information travels faster than light. Comparing results still needs a classical channel.
H: Uses
- Quantum key distribution (Ekert protocol), teleportation, superdense coding, quantum computing, quantum sensing beyond classical limits.
X: Measure both qubits of |Φ^{+}⟩ in the z basis. Possible outcomes?
> 00 or 11, each with probability 1/2; never 01 or 10
!: Entanglement can't be used to send messages faster than light.
Q: What did Bell's theorem show? | No local hidden-variable theory can reproduce all predictions of quantum mechanics.
Q: Why can't entanglement send signals faster than light? | Each local outcome is random; correlations only appear when results are compared via a classical channel.
M1: The maximum quantum value of the CHSH quantity is: | 2√2 | 2 | 4 | 1 | Tsirelson's bound.
M2: The 2022 Nobel Prize in Physics recognised: | Experiments with entangled photons testing Bell inequalities | Gravitational waves | Exoplanets | Graphene | Aspect, Clauser, Zeilinger.

## Decoherence
S: Decoherence is the loss of quantum coherence when a system interacts with its environment, which effectively measures it. It explains why superpositions of macroscopic objects are never seen and is the main obstacle to building quantum computers.
H: Mechanism
- System–environment interactions create entanglement: |ψ⟩|E_{0}⟩ → α|0⟩|E_{0}⟩ + β|1⟩|E_{1}⟩.
- If ⟨E_{0}|E_{1}⟩ → 0, the system's reduced density matrix loses off-diagonal terms.
- The superposition hasn't vanished; it's spread into system plus environment.
H: Timescales
- T_{1}: energy relaxation; T_{2}: dephasing (T_{2} ≤ 2T_{1}).
- Macroscopic objects decohere extremely fast: a dust grain in air ~10^{-31} s.
- Superconducting qubits: T_{2} ~ 100 μs; trapped ions: seconds; nuclear spins: hours.
H: Pointer states
P: The environment "selects" which states are stable (pointer states, Zurek), usually positions for macroscopic objects because interactions depend on position. Quantum Darwinism: many environmental fragments record the same information, so observers agree on a classical world.
X: A qubit with T_{2} = 100 μs and gate time 50 ns. How many gates before coherence is badly degraded?
> 100 μs/50 ns = 2000 gate times
> Error correction is needed for long algorithms
!: Decoherence explains why interference disappears, but not why we see one particular outcome; the measurement problem remains.
Q: What is decoherence? | The loss of quantum coherence through entanglement with an environment.
Q: What do T_{1} and T_{2} measure? | Energy relaxation time and dephasing (coherence) time.
M1: Decoherence affects which density matrix elements? | Off-diagonal coherences | Diagonal populations only | The trace | None | Coherences decay.
M2: Why do quantum computers need cooling and isolation? | To slow decoherence | To speed gates | To reduce mass | For safety only | Environment destroys coherence.

## Quantum information fundamentals
S: Quantum information theory studies how information is stored, processed and transmitted using quantum systems. Its basic unit, the qubit, can be in superposition and entangled, enabling tasks impossible classically.
H: Qubits
E: |ψ⟩ = α|0⟩ + β|1⟩ = cos(θ/2)|0⟩ + e^{iφ}sin(θ/2)|1⟩
- Measurement gives one classical bit; Holevo's bound: n qubits carry at most n classical bits.
- Physical qubits: superconducting circuits, trapped ions, photons, spins in silicon, neutral atoms, topological proposals.
H: Key results
- **No-cloning theorem**: unknown quantum states can't be copied (secures quantum cryptography).
- **Teleportation**: transfer a qubit state using shared entanglement plus 2 classical bits.
- **Superdense coding**: send 2 classical bits with 1 qubit plus shared entanglement.
- **Quantum gates**: unitary operations (Hadamard, CNOT, phase); a universal set builds any computation.
H: Algorithms and limits
P: Shor's algorithm factors integers exponentially faster than known classical methods (threatening RSA); Grover's search gives a quadratic speedup; quantum simulation of molecules and materials is likely the first major application. Error correction (surface codes) needs many physical qubits per logical qubit.
X: Apply a Hadamard gate to |0⟩.
> H|0⟩ = (|0⟩ + |1⟩)/√2
> Measuring gives 0 or 1 with probability 1/2 each
!: Quantum computers aren't faster at everything; speedups exist only for specific problems.
Q: What is the no-cloning theorem? | It's impossible to make an exact copy of an unknown quantum state.
Q: What does quantum teleportation transfer? | A quantum state, using shared entanglement and two classical bits; nothing travels faster than light.
M1: Shor's algorithm efficiently solves: | Integer factorisation | Sorting | Searching unsorted lists exponentially faster | NP-complete problems | Breaks RSA.
M2: A CNOT gate: | Flips the target qubit if the control is 1 | Measures both qubits | Copies a qubit | Applies a Hadamard | Two-qubit entangling gate.
`;
