// Unit 42: Quantum Field Theory. Format: kit/course/notes.js
export default `
## Quantum fields and particles
S: In quantum field theory, the fundamental objects are fields filling all of space, and particles are their quantised excitations. This picture explains why identical particles are truly identical, how particles are created and destroyed, and why antimatter exists.
H: From fields to particles
- Each type of particle corresponds to a field: electron field, photon field, quark fields, Higgs field.
- A free field decomposes into independent momentum modes, each a quantum harmonic oscillator.
- The n-th excited state of a mode is n particles with that momentum; the ground state of all modes is the vacuum.
- Particle energy E_{p} = √(p^{2}c^{2} + m^{2}c^{4}) comes from the mode's oscillation frequency.
E: E_{p} = ħω_{p} = √(p^{2}c^{2} + m^{2}c^{4}) :: one-particle energy
H: Why we need fields
- Relativity plus quantum mechanics allows E = mc^{2} conversion: particle number changes.
- Causality: field operators at spacelike separation commute, so measurements can't signal faster than light.
- Antiparticles arise from the negative-frequency parts of complex fields.
- Spin–statistics follows from Lorentz invariance and causality.
H: The vacuum
P: The QFT vacuum has zero-point energy ½ħω per mode (formally infinite, usually subtracted) and fluctuations measurable through the Casimir force, the Lamb shift and spontaneous emission. Different observers can disagree about particle content: an accelerated observer sees thermal radiation in the Minkowski vacuum (Unruh effect), so "particle" is not as basic as "field".
E: T_{Unruh} = ħa/(2πck_{B}) :: Unruh temperature
X: Unruh temperature for acceleration 10^{20} m s^{-2}?
> T = 1.055 × 10^{-34} × 10^{20}/(2π × 3 × 10^{8} × 1.38 × 10^{-23}) ≈ 0.4 K
X: How many oscillators describe a free scalar field in a box?
> One for each allowed momentum mode: infinitely many (cut off in practice)
K: Fields are fundamental; particles are quantised ripples, all identical because they come from the same field.
!: The particle concept is observer-dependent in general; the field is the more basic object.
Q: What is a particle in QFT? | A quantised excitation of a field mode.
Q: What is the Unruh effect? | An accelerating observer perceives the vacuum as a thermal bath at T = ħa/(2πck_{B}).
M1: Each free-field momentum mode behaves like: | A harmonic oscillator | A free particle | A spin-½ system | A rigid rotor | Quantised amplitudes.
M2: Microcausality means field operators: | Commute at spacelike separation | Never commute | Are classical | Vanish | No faster-than-light signalling.

## Creation and annihilation operators
S: Creation and annihilation operators add or remove a quantum of a field mode. They build every multi-particle state from the vacuum, encode statistics through their commutation rules, and make interactions look like particles being absorbed and emitted.
H: Bosons
- a_{p}^{†} creates a particle with momentum p; a_{p} destroys one; a_{p}|0⟩ = 0.
- [a_{p}, a_{q}^{†}] = (2π)^{3}δ^{3}(p − q) (relativistic normalisation varies); other commutators vanish.
- Number operator N_{p} = a_{p}^{†}a_{p}; a^{†}|n⟩ = √(n + 1)|n + 1⟩, a|n⟩ = √n|n − 1⟩.
- Multi-particle states are automatically symmetric.
E: a^{†}|n⟩ = √(n+1)|n+1⟩, a|n⟩ = √n|n−1⟩ :: ladder action
H: Fermions
- {b_{p}, b_{q}^{†}} = (2π)^{3}δ^{3}(p − q), {b, b} = 0.
- (b_{p}^{†})^{2} = 0: no two fermions in the same state (Pauli exclusion).
- States are antisymmetric under exchange.
- Separate operators for particles (b) and antiparticles (d).
E: {b, b^{†}} = 1, b^{2} = 0 :: fermionic algebra
H: Fock space and uses
P: Fock space is built from all possible numbers of quanta: |0⟩, a^{†}|0⟩, a^{†}a^{†}|0⟩, …. Interactions are written with these operators: in QED, ψ̄γ^{μ}ψA_{μ} contains terms that annihilate an electron and create an electron plus a photon (emission). The same formalism (second quantisation) is used in condensed matter for electrons, phonons and magnons, and in quantum optics for photons.
X: Compute a^{†}a^{†}|0⟩ normalisation.
> a^{†}|0⟩ = |1⟩; a^{†}|1⟩ = √2|2⟩
> So |2⟩ = (a^{†})^{2}|0⟩/√2
X: Show two identical fermions can't occupy one state.
> (b^{†})^{2} = ½{b^{†}, b^{†}} = 0, so (b^{†})^{2}|0⟩ = 0
K: Creation and annihilation operators build Fock space; commutators give bosons, anticommutators give fermions.
!: Using commutators for fermion fields leads to inconsistencies (negative energies or acausality); spin and statistics are tied.
Q: What does the number operator a^{†}a measure? | The number of quanta in that mode.
Q: Why are fermion states antisymmetric? | Fermion creation operators anticommute.
M1: a|0⟩ equals: | 0 | |1⟩ | |0⟩ | √2|0⟩ | Annihilating the vacuum gives zero.
M2: Second quantisation is used in: | Condensed matter and quantum optics | Only cosmology | Classical mechanics | Thermodynamics only | Same Fock-space tools.

## Canonical quantisation
S: Canonical quantisation turns a classical field theory into a quantum one by promoting fields and conjugate momenta to operators with equal-time commutation relations. Expanding in modes then reveals particles as quanta.
H: The steps
- Start with a Lagrangian density; find π = ∂ℒ/∂φ̇ and ℋ.
- Impose [φ(x, t), π(y, t)] = iδ^{3}(x − y) (with ħ = 1).
- Expand φ in plane waves: φ = ∫d^{3}p/((2π)^{3}√(2E_{p}))(a_{p}e^{−ip·x} + a_{p}^{†}e^{ip·x}).
- The field commutator implies [a_{p}, a_{q}^{†}] = (2π)^{3}δ^{3}(p − q).
- Normal-order the Hamiltonian to remove the infinite zero-point constant.
E: [φ(x), π(y)] = iδ^{3}(x − y) :: equal-time commutator
E: H = ∫d^{3}p/(2π)^{3} E_{p}a_{p}^{†}a_{p} :: normal-ordered Hamiltonian
H: Different fields
- **Real scalar**: one type of particle, its own antiparticle.
- **Complex scalar**: particles and antiparticles (a and b operators) with opposite U(1) charge.
- **Dirac**: four-component spinor, anticommutators, electrons and positrons each with two spin states.
- **Photon**: gauge redundancy; Gupta–Bleuler or Coulomb-gauge quantisation leaves two physical polarisations.
H: Limitations
P: Canonical quantisation singles out time, obscuring Lorentz invariance, and is awkward for gauge theories and gravity. It is straightforward for free fields; interacting fields are treated with the interaction picture and Dyson series. The path-integral approach is often more convenient for non-abelian gauge theories.
X: A real scalar field: is the particle its own antiparticle?
> Yes, φ = φ^{†} means a and a^{†} create and destroy the same particle (like π^{0} or the Higgs)
X: How many independent creation operators per momentum for the Dirac field?
> Four: electron spin up/down and positron spin up/down
K: Promote fields to operators with canonical commutators; mode expansions then give creation and annihilation operators.
!: The infinite zero-point energy is removed by normal ordering; only differences in vacuum energy are observable (except perhaps in gravity).
Q: What is normal ordering? | Placing all annihilation operators to the right of creation operators, removing the zero-point constant.
Q: Why does a complex scalar field have antiparticles? | Its two independent real components give two particle types with opposite charge.
M1: The photon field after quantisation has how many physical polarisations? | 2 | 4 | 3 | 1 | Transverse only.
M2: The Dirac field is quantised using: | Anticommutators | Commutators | Poisson brackets | No rules | Fermions.

## Path-integral quantisation
S: Path-integral quantisation computes quantum amplitudes by integrating over all possible field configurations, each weighted by e^{iS/ħ}. It keeps Lorentz invariance manifest, handles gauge theories elegantly and connects QFT to statistical mechanics.
H: The generating functional
- Z[J] = ∫Dφ exp(i∫d^{4}x[ℒ + Jφ]).
- Correlation functions from derivatives: ⟨0|T φ(x_{1})…φ(x_{n})|0⟩ = (1/Z)(−iδ/δJ)^{n}Z|_{J=0}.
- For free fields, Z[J] is Gaussian: Z[J] = Z[0]exp(−½∫J(x)D_{F}(x − y)J(y)).
E: Z[J] = ∫Dφ e^{i(S[φ] + ∫Jφ)} :: generating functional
H: Perturbation theory and fermions
- Expand e^{iS_{int}} in powers of the coupling; Wick's theorem pairs fields into propagators: Feynman diagrams.
- Fermions use Grassmann (anticommuting) variables; ∫dθ̄dθ e^{−θ̄Aθ} = det A.
- The effective action Γ[φ] generates one-particle-irreducible diagrams.
E: ∫Dψ̄Dψ e^{−ψ̄Mψ} = det M :: Grassmann Gaussian integral
H: Gauge theories
P: Integrating over all gauge field configurations overcounts physically equivalent ones. Faddeev–Popov gauge fixing inserts a gauge condition and a determinant represented by ghost fields, which are unphysical but needed for consistency in non-abelian theories. Euclidean path integrals connect to partition functions of statistical mechanics and are the basis of lattice QCD; instantons are classical solutions in Euclidean time responsible for tunnelling.
X: Why do Faddeev–Popov ghosts not appear as real particles?
> They are anticommuting scalars that cancel unphysical gauge polarisations in loops
> BRST symmetry ensures they never appear in physical asymptotic states
K: Path integrals sum over all field histories; derivatives of Z[J] give correlation functions and Feynman diagrams.
!: Gauge theories need gauge fixing; without it, the path integral overcounts and diverges.
Q: What are Grassmann variables used for? | Representing fermion fields in path integrals; they anticommute.
Q: What are Faddeev–Popov ghosts? | Unphysical fields introduced by gauge fixing in non-abelian path integrals.
M1: Correlation functions are obtained by: | Differentiating Z[J] with respect to J | Integrating over J | Setting J to infinity | Squaring Z | Functional derivatives.
M2: Euclidean path integrals relate QFT to: | Statistical mechanics | Classical optics | Celestial mechanics | Chemistry | Partition functions.

## Propagators
S: A propagator gives the amplitude for a particle to travel from one spacetime point to another. It is the Green's function of the field equation with Feynman boundary conditions, and it forms the internal lines of every Feynman diagram.
H: Scalar propagator
- D_{F}(x − y) = ⟨0|Tφ(x)φ(y)|0⟩.
- In momentum space: D_{F}(p) = i/(p^{2} − m^{2} + iε).
- The iε prescription propagates positive energies forward and negative energies backward in time (antiparticles).
- Pole at p^{2} = m^{2}: the physical mass.
E: D_{F}(p) = i/(p^{2} − m^{2} + iε) :: Feynman propagator
H: Other propagators
- **Dirac fermion**: S_{F}(p) = i(γ^{μ}p_{μ} + m)/(p^{2} − m^{2} + iε).
- **Photon** (Feynman gauge): −ig_{μν}/(p^{2} + iε).
- **Massive vector (W, Z)**: −i(g_{μν} − p_{μ}p_{ν}/M^{2})/(p^{2} − M^{2} + iε).
- **Unstable particles**: p^{2} − M^{2} + iMΓ in the denominator, giving Breit–Wigner peaks.
E: −i(g_{μν} − p_{μ}p_{ν}/M^{2})/(p^{2} − M^{2} + iMΓ) :: massive vector with width
H: Physical meaning
P: Off-shell (virtual) particles have p^{2} ≠ m^{2}; exchanging them produces forces. Massless exchange gives long-range 1/r potentials (Coulomb); massive exchange gives Yukawa e^{−mr}/r with range ħ/(mc): the W's ~10^{-18} m range explains the weakness of the weak force. Full propagators include self-energy corrections, shifting the pole to the physical mass.
X: Range of a force carried by a pion (m ≈ 140 MeV)?
> ħc/mc^{2} = 197 MeV fm/140 MeV ≈ 1.4 fm, the nuclear force range
X: Range of the weak force (M_{W} = 80 GeV)?
> 0.197 GeV fm/80 GeV ≈ 2.5 × 10^{-3} fm = 2.5 × 10^{-18} m
K: Propagators are Green's functions with causal boundary conditions; their poles are physical masses, and exchange gives forces.
!: Virtual particles in propagators don't satisfy E^{2} = p^{2}c^{2} + m^{2}c^{4}; they are mathematical terms, not observable particles.
Q: What sets the range of a force mediated by a massive particle? | The Compton wavelength ħ/(mc).
Q: What does the iε in the propagator do? | Selects causal (Feynman) boundary conditions.
M1: Massless exchange produces a potential: | ∝ 1/r | ∝ e^{−mr}/r | Constant | ∝ r | Long range.
M2: The pole of a propagator is at: | p^{2} = m^{2} (physical mass) | p = 0 | Infinite momentum | Negative energy only | Physical particle.

## Feynman rules
S: Feynman rules translate diagrams into mathematical expressions for scattering amplitudes. Each line, vertex and loop contributes a specific factor derived from the Lagrangian, so computing a process becomes systematic bookkeeping.
H: General rules (momentum space)
- **External lines**: wavefunction factors (1 for scalars, spinors u, v, ū, v̄ for fermions, polarisation vectors ε for photons).
- **Internal lines**: propagators.
- **Vertices**: −i × coupling × (matrices) from the interaction term; momentum conservation δ^{4}.
- **Loops**: integrate ∫d^{4}k/(2π)^{4} over undetermined momenta.
- **Fermion loops**: factor −1; symmetry factors for identical lines.
H: QED rules
- Vertex: −ieγ^{μ}.
- Electron propagator: i(γ·p + m)/(p^{2} − m^{2}).
- Photon propagator: −ig_{μν}/q^{2}.
- Incoming electron u(p), outgoing ū(p); incoming positron v̄, outgoing v.
E: iM = ū(p')(−ieγ^{μ})u(p) (−ig_{μν}/q^{2}) ū(k')(−ieγ^{ν})u(k) :: e^{−}μ^{−} scattering at tree level
H: From amplitude to observables
P: Square |M|^{2}, average over initial spins and sum over final spins (trace technology with γ matrices), then integrate over phase space with flux factors to get cross-sections and decay rates. Example: e^{+}e^{−} → μ^{+}μ^{−} gives σ = 4πα^{2}/(3s) at high energy. Computer programs (MadGraph, FeynArts) automate this for complex processes.
E: σ(e^{+}e^{−} → μ^{+}μ^{−}) = 4πα^{2}/(3s) :: tree-level QED
X: Estimate σ(e^{+}e^{−} → μ^{+}μ^{−}) at √s = 10 GeV.
> σ = 4π/(3 × 137^{2} × 100 GeV^{2}) ≈ 2.2 × 10^{-6} GeV^{-2}
> × 0.389 mb GeV^{2} ≈ 8.7 × 10^{-7} mb ≈ 0.87 nb
K: Feynman rules turn diagrams into amplitudes: propagators for lines, couplings for vertices, integrals for loops.
!: Relative signs between diagrams with identical fermions matter; missing a minus sign breaks the Pauli principle.
Q: What is the QED vertex factor? | −ieγ^{μ}.
Q: What extra factor does a closed fermion loop carry? | −1.
M1: The cross-section for e^{+}e^{−} → μ^{+}μ^{−} scales with energy as: | 1/s | s | Constant | e^{−s} | Dimensional analysis.
M2: Loop momenta are: | Integrated over | Fixed by external momenta | Always zero | Infinite | Undetermined internal momentum.

## Scattering amplitudes
S: Scattering amplitudes are the central predictions of QFT: complex numbers whose squared magnitudes give probabilities of particles scattering into particular final states. Their study has revealed hidden simplicity and new structures beyond Feynman diagrams.
H: The S-matrix
- S relates incoming and outgoing states: S = 1 + iT.
- ⟨f|iT|i⟩ = (2π)^{4}δ^{4}(p_{f} − p_{i}) iM.
- Unitarity S^{†}S = 1 gives the optical theorem: Im M(forward) ∝ σ_{tot}.
- Lorentz invariance: M depends on Mandelstam variables s, t, u.
E: s = (p_{1} + p_{2})^{2}, t = (p_{1} − p_{3})^{2}, u = (p_{1} − p_{4})^{2} :: Mandelstam variables
E: s + t + u = Σm_{i}^{2} :: constraint
H: Properties
- **Crossing**: M for one process gives others by analytic continuation.
- **Analyticity**: poles for bound states and resonances, branch cuts for multi-particle thresholds.
- **Partial-wave unitarity**: limits growth with energy; WW scattering would violate it without the Higgs.
H: Modern methods
P: Spinor-helicity variables make gluon amplitudes compact: the Parke–Taylor formula gives the maximally helicity-violating n-gluon amplitude in one line, replacing thousands of diagrams. BCFW recursion builds amplitudes from smaller ones. Generalised unitarity computes loops from tree pieces. The "amplituhedron" geometrises amplitudes in N = 4 super-Yang–Mills, and double copy relates gravity amplitudes to gauge theory squared.
X: For 2 → 2 scattering of massless particles at √s = 100 GeV and 90° in the CM frame, find t.
> t = −(s/2)(1 − cos θ) = −(10^{4}/2)(1) = −5000 GeV^{2}
X: Why did WW scattering demand a Higgs or new physics below ~1 TeV?
> Without it, the longitudinal WW amplitude grows as s/v^{2}, violating unitarity near √s ~ 1 TeV
K: Amplitudes encode all scattering predictions; symmetry, analyticity and unitarity constrain them strongly.
!: Feynman diagrams are one way to compute amplitudes, not the amplitude itself; gauge-dependent pieces cancel in the sum.
Q: What does unitarity of the S-matrix guarantee? | Probabilities sum to one; it implies the optical theorem.
Q: What is the Parke–Taylor formula? | A compact expression for maximally helicity-violating gluon amplitudes.
M1: The Mandelstam variable s is: | The squared centre-of-mass energy | Momentum transfer | Spin | Scattering angle | (p_{1} + p_{2})^{2}.
M2: Double copy relates: | Gravity amplitudes to gauge-theory amplitudes squared | QED to QCD | Leptons to quarks | Bosons to fermions | Gravity ~ (gauge)^{2}.

## Perturbation theory
S: Perturbation theory in QFT expands amplitudes in powers of small couplings, with each order corresponding to Feynman diagrams with more vertices and loops. It has given the most precise agreement between theory and experiment in all of science.
H: The interaction picture
- Split H = H_{0} + H_{int}; evolve operators with H_{0}, states with H_{int}.
- Dyson series: U = T exp(−i∫H_{int}dt).
- **Wick's theorem**: time-ordered products become sums of contractions (propagators).
- **LSZ reduction**: connects correlation functions to S-matrix elements.
E: U(t, t_{0}) = T exp[−i∫_{t_{0}}^{t}H_{I}(t')dt'] :: Dyson series
H: Orders in QED
- Tree level: O(α).
- One loop: O(α^{2}) in cross-sections; electron g − 2 at order α/2π.
- The electron anomalous moment is known to 5 loops (~13 000 diagrams); theory and experiment agree to ~1 part in 10^{12}.
E: a_{e} = α/2π − 0.328(α/π)^{2} + 1.18(α/π)^{3} + … :: electron g − 2
H: Limits
P: In QCD, α_{s} ≈ 0.1 at high energies allows perturbation theory (jets, Higgs production with NNLO and N3LO corrections), but at ~1 GeV, α_{s} ~ 1 and expansion fails, so hadron masses need lattice or effective theories. Series in QFT are asymptotic; renormalons and instantons limit their accuracy. Large logarithms of scale ratios require resummation.
X: Estimate the size of a two-loop QED correction relative to tree level.
> (α/π)^{2} ≈ (0.00232)^{2} ≈ 5 × 10^{-6}
X: Why is perturbative QCD reliable for jets at the LHC but not for the proton mass?
> At Q ~ 100 GeV, α_{s} ≈ 0.11; at Q ~ 1 GeV, α_{s} ~ 0.5–1, too large to expand
K: Perturbation theory organises QFT calculations by powers of coupling, giving extraordinary precision when couplings are small.
!: Perturbative series are asymptotic; adding terms beyond an optimal order makes predictions worse.
Q: What does Wick's theorem do? | Expresses time-ordered products of free fields as sums of products of propagators.
Q: What does the LSZ formula connect? | Correlation functions to scattering amplitudes.
M1: Schwinger's one-loop result for a_{e} is: | α/2π | α | α^{2} | 2π/α | ~0.00116.
M2: Perturbative QCD fails at: | Low energies (~1 GeV) | High energies | All energies | Only in QED | Coupling becomes large.

## Divergences and regularisation
S: Loop diagrams in QFT often give infinite integrals because virtual particles can have arbitrarily large momenta. Regularisation temporarily makes these integrals finite so they can be handled consistently, before renormalisation removes dependence on the regulator.
H: Types of divergence
- **Ultraviolet (UV)**: large loop momenta; from short-distance physics.
- **Infrared (IR)**: soft or collinear massless particles; cancel between virtual and real emission (Bloch–Nordsieck, KLN theorems).
- **Superficial degree of divergence** D = 4 − (number of external boson lines) − (3/2)(external fermion lines) in QED; D ≥ 0 signals possible divergence.
E: D = 4 − E_{B} − (3/2)E_{F} :: QED power counting
H: Regularisation schemes
- **Momentum cutoff** Λ: simple but breaks gauge and Lorentz invariance.
- **Pauli–Villars**: subtract heavy fictitious particles.
- **Dimensional regularisation**: compute in d = 4 − 2ε dimensions; divergences appear as 1/ε poles; preserves gauge symmetry; standard today.
- **Lattice**: spacing a provides a cutoff ~π/a.
E: ∫d^{d}k/(2π)^{d} 1/(k^{2} − Δ)^{2} = (i/(4π)^{2})(1/ε − γ_{E} + ln(4π/Δ) + …) :: typical dim-reg result
H: Physical meaning
P: UV divergences reflect our ignorance of physics at very short distances, but in renormalisable theories they only affect a few parameters. IR divergences signal that "exclusive" quantities (exactly one electron, no soft photons) are unphysical; detectors can't resolve infinitely soft photons, and inclusive rates are finite. Divergences are not mistakes: they are messages about which questions are physical.
X: Superficial degree of divergence of the QED photon self-energy (two external photons)?
> D = 4 − 2 = 2: quadratically divergent by power counting
> Gauge invariance reduces it to logarithmic in practice
X: Electron self-energy (two external electrons)?
> D = 4 − 3 = 1, linear by counting, logarithmic after symmetry
K: Regulate divergences to compute consistently; dimensional regularisation is preferred because it respects gauge symmetry.
!: Infrared divergences cancel only when soft real emissions are included; virtual corrections alone give nonsense.
Q: What is dimensional regularisation? | Evaluating loop integrals in d = 4 − 2ε dimensions so divergences appear as poles in ε.
Q: Why do IR divergences cancel? | Virtual loop divergences cancel against real emission of unresolvable soft or collinear particles.
M1: A momentum cutoff breaks: | Gauge and Lorentz invariance | Nothing | Unitarity only | Charge conservation always | Hence dim reg is preferred.
M2: The QED vertex (3 external lines: 1 photon, 2 electrons) has D equal to: | 0 | 1 | 2 | −1 | 4 − 1 − 3.

## Renormalisation
S: Renormalisation turns divergent loop calculations into finite predictions by expressing results in terms of measured quantities. It shows that physics at accessible energies depends on short-distance details only through a few parameters, and it predicts how couplings change with scale.
H: Counterterms
- Split bare parameters: m_{0} = m + δm, e_{0} = Z_{e}e, φ_{0} = √Z φ.
- Counterterms cancel divergences order by order.
- Renormalisation conditions fix finite parts (on-shell scheme or MS-bar at a scale μ).
- In renormalisable theories, finitely many counterterms suffice at all orders.
E: e_{0} = Z_{e} e(μ) :: charge renormalisation
H: Running couplings
- Physical predictions don't depend on μ, so couplings must change with μ: the β function.
- QED: β(e) = e^{3}/(12π^{2}) > 0, α grows at short distances.
- QCD: β(g) = −(11 − 2n_{f}/3)g^{3}/(16π^{2}) < 0 for n_{f} ≤ 16: asymptotic freedom.
E: β(α) = 2α^{2}/(3π) (QED, one lepton) :: QED running
E: 1/α(Q) = 1/α(μ) − (2/3π) ln(Q/μ) :: one-loop QED
H: Renormalisability and beyond
P: Couplings with negative mass dimension (Fermi's G_{F}, Newton's G) give non-renormalisable theories, needing infinitely many counterterms but still fine as effective theories at low energy. Renormalisability was used to select the Standard Model ('t Hooft–Veltman). Wilson reinterpreted renormalisation as flow between scales: relevant, marginal and irrelevant operators.
X: Estimate α at Q = 91 GeV starting from α(m_{e}) = 1/137 with only the electron.
> ln(91/0.000511) ≈ 12.1; (2/3π) × 12.1 ≈ 2.57
> 1/α ≈ 137 − 2.6 ≈ 134.4 (including all charged fermions gives ≈ 128)
K: Renormalisation expresses predictions in physical parameters; couplings run with scale according to β functions.
!: The running coupling depends on scheme; physical observables do not.
Q: What is a renormalisable theory? | One needing only finitely many counterterms, with couplings of non-negative mass dimension.
Q: What sign is QCD's β function? | Negative (for n_{f} ≤ 16), giving asymptotic freedom.
M1: Newton's constant G has: | Negative mass dimension | Zero mass dimension | Positive mass dimension | No units | Gravity non-renormalisable.
M2: In QED the coupling at high energy: | Increases | Decreases | Is zero | Unchanged | Positive β.

## Gauge invariance
S: In quantum field theory, gauge invariance is the principle that fixes how matter couples to force carriers. It guarantees consistency, unitarity and renormalisability, and it ensures that unphysical polarisations of gauge bosons never appear in physical results.
H: Local symmetry and coupling
- Matter fields ψ → e^{iα(x)T}ψ; the covariant derivative D_{μ} = ∂_{μ} − igA_{μ}^{a}T^{a} transforms covariantly.
- Gauge fields transform as A_{μ} → UA_{μ}U^{†} − (i/g)(∂_{μ}U)U^{†}.
- Minimal coupling fixes the form of interactions.
E: D_{μ} = ∂_{μ} − igA^{a}_{μ}T^{a} :: non-abelian covariant derivative
H: Quantum consequences
- **Ward–Takahashi identities**: q_{μ}M^{μ} = 0 for photon amplitudes; charge renormalisation is universal (Z_{1} = Z_{2}), so electron and muon charges stay equal.
- Gauge fixing (Lorenz, R_{ξ} gauges) needed to quantise; physical results ξ-independent.
- **BRST symmetry** ensures only transverse physical states contribute.
- Gauge invariance protects the photon mass at zero to all orders.
E: q_{μ}M^{μ}(q) = 0 :: Ward identity
H: What gauge invariance is
P: Gauge symmetry is a redundancy of description, not a symmetry of physical states: gauge-equivalent configurations are the same physical state. Elitzur's theorem says local gauge symmetry can't be spontaneously broken; the Higgs mechanism is better described as a change of variables. Gauge-invariant observables include field strengths, Wilson loops tr P exp(ig∮A) and S-matrix elements.
X: Why do the electron and proton have exactly opposite charges after renormalisation, despite different interactions?
> Ward identity: charge renormalisation comes only from the photon's vacuum polarisation, common to all particles
X: In R_{ξ} gauge, does the W propagator's ξ-dependence affect physical predictions?
> No: it cancels against Goldstone and ghost contributions in physical amplitudes
K: Gauge invariance dictates couplings, protects massless photons and, via Ward identities, guarantees consistent charge renormalisation.
!: Individual Feynman diagrams can be gauge-dependent; only the sum for a physical process is gauge-invariant.
Q: What is a Ward identity? | A relation from gauge invariance, e.g. q_{μ}M^{μ} = 0, constraining amplitudes.
Q: What is a Wilson loop? | The trace of the path-ordered exponential of the gauge field around a closed loop, a gauge-invariant observable.
M1: Elitzur's theorem states that local gauge symmetry: | Cannot be spontaneously broken | Is always broken | Is global | Has no observables | Only global symmetries break.
M2: BRST symmetry ensures: | Only physical states contribute | Ghosts are physical | Charge is not conserved | Gauge bosons are massive | Unitarity in gauge theories.

## Quantum electrodynamics
S: Quantum electrodynamics is the quantum field theory of electrons, positrons and photons. Developed by Feynman, Schwinger, Tomonaga and Dyson, it is the most precisely tested theory in physics, predicting magnetic moments and atomic energy levels to many decimal places.
H: The Lagrangian
- ℒ = ψ̄(iγ^{μ}D_{μ} − m)ψ − ¼F_{μν}F^{μν}, D_{μ} = ∂_{μ} + ieA_{μ}.
- One coupling, α = e^{2}/(4π) ≈ 1/137.036.
- Single vertex: electron–electron–photon.
E: ℒ_{QED} = ψ̄(iγ^{μ}D_{μ} − m)ψ − ¼F_{μν}F^{μν} :: QED Lagrangian
H: Processes
- Compton scattering (eγ → eγ), Møller (ee → ee), Bhabha (e^{+}e^{−} → e^{+}e^{−}), pair annihilation (e^{+}e^{−} → γγ), bremsstrahlung, pair production.
- Thomson cross-section at low energy: σ_{T} = (8π/3)r_{e}^{2} ≈ 6.65 × 10^{-29} m^{2}.
E: σ_{T} = (8π/3)r_{e}^{2} :: Thomson cross-section
H: Precision tests
P: The electron's anomalous magnetic moment a_{e} = (g − 2)/2 ≈ 0.00115965218 agrees between theory and experiment to ~0.1 ppb, among the best tests in science; it gives the most precise value of α. The Lamb shift (2S–2P splitting in hydrogen, ~1058 MHz) comes from vacuum fluctuations and polarisation. Positronium spectroscopy and the muon g − 2 test QED alongside hadronic and electroweak contributions. Light-by-light scattering was observed at the LHC in heavy-ion collisions.
X: Thomson cross-section from r_{e} = 2.82 × 10^{-15} m?
> σ_{T} = (8π/3)(2.82 × 10^{-15})^{2} ≈ 6.65 × 10^{-29} m^{2}
X: Why can't a free electron absorb a photon?
> Energy and momentum can't both be conserved: the invariant mass would have to change
K: QED's single coupling and vertex explain all electromagnetic phenomena of electrons and photons, tested to parts per trillion.
!: A free electron cannot emit or absorb a single real photon; processes need a third body or a second photon.
Q: What is the Lamb shift? | A small splitting of hydrogen's 2S and 2P levels caused by QED vacuum effects.
Q: What is the fine-structure constant's value? | α ≈ 1/137.036.
M1: Bhabha scattering is: | e^{+}e^{−} → e^{+}e^{−} | e^{−}e^{−} → e^{−}e^{−} | eγ → eγ | γγ → γγ | Electron–positron elastic scattering.
M2: The electron g − 2 is used to determine: | The fine-structure constant | Electron mass | Proton radius | Speed of light | Most precise α.

## Quantum chromodynamics
S: Quantum chromodynamics is the SU(3) gauge theory of quarks and gluons, describing the strong force that binds quarks into protons, neutrons and other hadrons. It shows asymptotic freedom at high energies and confinement at low energies.
H: Ingredients
- Quarks carry three colours; antiquarks anticolours.
- Eight gluons carry colour themselves and interact with each other.
- ℒ = Σ_{q} q̄(iγ^{μ}D_{μ} − m_{q})q − ¼G^{a}_{μν}G^{aμν}.
- Colour factors: C_{F} = 4/3 (quarks), C_{A} = 3 (gluons).
E: G^{a}_{μν} = ∂_{μ}A^{a}_{ν} − ∂_{ν}A^{a}_{μ} + g_{s}f^{abc}A^{b}_{μ}A^{c}_{ν} :: gluon field strength
H: Asymptotic freedom and confinement
- α_{s}(M_{Z}) ≈ 0.118, decreasing at higher energy (Gross, Wilczek, Politzer; Nobel 2004).
- At ~1 fm, α_{s} becomes large; the force between quarks becomes roughly constant (string tension ~1 GeV fm^{-1}), so separating quarks creates new quark–antiquark pairs.
- Only colour-singlet hadrons are observed.
E: V(r) ≈ −(4/3)α_{s}/r + κr :: Cornell potential, κ ≈ 0.9 GeV fm^{-1}
H: Phenomena
P: High-energy quarks and gluons become jets of hadrons. Deep inelastic scattering revealed quarks as point-like partons with parton distribution functions. ~99% of the proton's mass comes from QCD binding energy, not quark masses (lattice QCD reproduces hadron masses to ~1%). At high temperature (~150 MeV) QCD becomes a quark–gluon plasma, created at RHIC and the LHC. The strong CP problem (why θ_{QCD} ≈ 0) motivates axions.
X: Energy stored in a 1 fm flux tube between quarks?
> κ × r ≈ 0.9 GeV: enough to create a quark–antiquark pair, so the string breaks
X: Estimate how much of the proton's mass comes from quark masses (m_{u} ≈ 2 MeV, m_{d} ≈ 5 MeV).
> 2 × 2 + 5 = 9 MeV out of 938 MeV, about 1%
K: QCD is asymptotically free at short distances and confining at long distances; most visible mass comes from its dynamics.
!: Hadrons are not just three quarks; they are seething with gluons and quark–antiquark pairs.
Q: What is confinement? | Quarks and gluons cannot be isolated; only colour-neutral hadrons exist freely.
Q: What fraction of proton mass comes from Higgs-generated quark masses? | About 1%; the rest is QCD energy.
M1: Gluons interact with each other because: | SU(3) is non-abelian | They are massive | They carry electric charge | QCD is abelian | f^{abc} ≠ 0.
M2: Quark–gluon plasma forms at temperatures around: | 150 MeV (~2 × 10^{12} K) | 1 eV | 1 keV | 1 TeV only | Lattice QCD crossover.

## Electroweak theory
S: Electroweak theory unifies electromagnetism and the weak force in an SU(2) × U(1) gauge theory. Developed by Glashow, Weinberg and Salam, it predicted neutral currents and the W and Z bosons, all confirmed experimentally.
H: Structure
- SU(2)_{L}: weak isospin, acting only on left-handed fermions; gauge fields W^{1,2,3}.
- U(1)_{Y}: weak hypercharge; gauge field B.
- Electric charge: Q = T_{3} + Y/2.
- Left-handed doublets (ν_{e}, e)_{L}, (u, d)_{L}; right-handed singlets e_{R}, u_{R}, d_{R}.
E: Q = T_{3} + Y/2 :: Gell-Mann–Nishijima relation
H: Mixing
- After symmetry breaking: W^{±} = (W^{1} ∓ iW^{2})/√2.
- Z = cos θ_{W}W^{3} − sin θ_{W}B; γ = sin θ_{W}W^{3} + cos θ_{W}B.
- sin^{2}θ_{W} ≈ 0.231; e = g sin θ_{W}.
- M_{W} = M_{Z}cos θ_{W} at tree level; M_{W} ≈ 80.4 GeV, M_{Z} ≈ 91.19 GeV.
E: M_{W} = M_{Z}cos θ_{W} :: tree-level mass relation
H: Features and tests
P: Parity is maximally violated: only left-handed particles feel charged currents. Neutral currents were discovered at CERN in 1973; W and Z in 1983 (UA1, UA2). LEP measured Z properties precisely: 3 light neutrino species from the Z width. Quark mixing (CKM matrix) and lepton mixing (PMNS) include CP-violating phases. Precision electroweak fits predicted top and Higgs masses before their discovery.
X: Check M_{W} from M_{Z} and sin^{2}θ_{W} = 0.231.
> cos θ_{W} = √0.769 ≈ 0.877
> M_{W} ≈ 91.19 × 0.877 ≈ 80.0 GeV (loop corrections bring it to 80.4)
X: Hypercharge of the left-handed electron (T_{3} = −½, Q = −1)?
> Y = 2(Q − T_{3}) = 2(−1 + ½) = −1
K: Electroweak theory unites EM and weak forces; mixing of W^{3} and B gives the Z and photon.
!: Right-handed neutrinos (if they exist) have no SU(2) × U(1) charges; they are "sterile".
Q: What is the weak mixing angle? | θ_{W}, describing how W^{3} and B mix into Z and γ; sin^{2}θ_{W} ≈ 0.231.
Q: How did LEP show there are three light neutrinos? | From the Z boson's invisible decay width.
M1: Weak charged currents couple only to: | Left-handed fermions (and right-handed antifermions) | Right-handed fermions | Photons | Gluons | V − A structure.
M2: Neutral currents were discovered in: | 1973 | 1983 | 2012 | 1956 | Gargamelle at CERN.

## Spontaneous symmetry breaking
S: Spontaneous symmetry breaking occurs when the laws are symmetric but the lowest-energy state is not. It explains magnetism, superconductivity, the masses of W and Z bosons and light pions, and gives rise to massless Goldstone bosons.
H: How it happens
- A potential like V = −μ^{2}|φ|^{2} + λ|φ|^{4} has a ring of minima at |φ| = v = √(μ^{2}/2λ).
- The vacuum chooses one point; the symmetry is hidden.
- Excitations along the ring (Goldstone modes) cost no energy; radial excitations are massive.
E: V(φ) = −μ^{2}|φ|^{2} + λ|φ|^{4}, v = √(μ^{2}/2λ) :: Mexican hat potential
H: Goldstone's theorem
- Each broken generator of a continuous global symmetry gives a massless spin-0 boson.
- Examples: spin waves (magnons) in ferromagnets, phonons in crystals and superfluids, pions from chiral symmetry breaking in QCD (approximately massless because quark masses explicitly break the symmetry slightly).
- Number of Goldstones = dim(G) − dim(H) for G broken to H (relativistic case).
E: m_{π}^{2}f_{π}^{2} = (m_{u} + m_{d})|⟨q̄q⟩| :: Gell-Mann–Oakes–Renner relation
H: Context
P: SSB requires infinitely many degrees of freedom (finite quantum systems tunnel between vacua). Order parameters (magnetisation, ⟨φ⟩, ⟨q̄q⟩) measure the breaking. Mermin–Wagner forbids continuous SSB at finite temperature in 2D. Cosmologically, SSB in the early universe could create topological defects (domain walls, strings, monopoles). When the symmetry is gauged, Goldstones become longitudinal gauge boson modes (Higgs mechanism).
X: A theory with SO(3) symmetry breaks to SO(2). How many Goldstone bosons?
> dim SO(3) − dim SO(2) = 3 − 1 = 2
X: Chiral SU(2)_{L} × SU(2)_{R} → SU(2)_{V}. Goldstones?
> 6 − 3 = 3 pions (π^{+}, π^{0}, π^{−})
K: Symmetric laws can have asymmetric ground states; broken continuous symmetries give massless Goldstone modes.
!: Spontaneous breaking doesn't remove the symmetry; it constrains low-energy physics through Goldstone theorems.
Q: Why are pions so light? | They are approximate Goldstone bosons of spontaneously broken chiral symmetry.
Q: What does the Mermin–Wagner theorem state? | Continuous symmetries can't be spontaneously broken at finite temperature in 2D systems with short-range interactions.
M1: The number of Goldstone bosons equals: | Number of broken generators | Number of unbroken generators | Always one | Zero | dim G − dim H.
M2: SSB requires: | Infinitely many degrees of freedom | A single particle | Zero temperature only | Gauge fields | No tunnelling between vacua.

## Higgs mechanism
S: The Higgs mechanism gives mass to the W and Z bosons through spontaneous breaking of electroweak gauge symmetry by the Higgs field. It also gives quarks and charged leptons their masses, and its remaining excitation, the Higgs boson, was discovered at CERN in 2012.
H: The mechanism
- The Higgs doublet Φ has potential V = −μ^{2}Φ^{†}Φ + λ(Φ^{†}Φ)^{2}; vacuum ⟨Φ⟩ = (0, v/√2), v ≈ 246 GeV.
- Of four real components, three would-be Goldstones are "eaten" by W^{±} and Z, becoming longitudinal polarisations.
- The fourth is the physical Higgs boson h with mass m_{h} = √(2λ)v ≈ 125 GeV.
- The photon stays massless: U(1)_{EM} is unbroken.
E: M_{W} = gv/2, M_{Z} = √(g^{2} + g'^{2})v/2 :: gauge boson masses
E: m_{f} = y_{f}v/√2 :: fermion masses from Yukawa couplings
H: Fermion masses
- Yukawa couplings y_{f}Φψ̄_{L}ψ_{R} give masses after symmetry breaking.
- Higgs coupling ∝ mass: the top quark (y_{t} ≈ 1) couples most strongly.
- Neutrino masses may need a different mechanism (seesaw).
H: Discovery and open questions
P: ATLAS and CMS found the Higgs in 2012 via H → γγ and H → ZZ* → 4ℓ; Englert and Higgs received the 2013 Nobel Prize. Measured couplings match the Standard Model to ~10%. Open questions: why is m_{h} so light compared with the Planck scale (hierarchy problem)? Is the vacuum stable? What is the Higgs self-coupling? Is there more than one Higgs? Future colliders aim to measure the Higgs precisely.
X: Compute v from G_{F} = 1.166 × 10^{-5} GeV^{-2}.
> v = (√2 G_{F})^{−1/2} = (1.649 × 10^{-5})^{−1/2} ≈ 246 GeV
X: Top Yukawa coupling from m_{t} = 173 GeV?
> y_{t} = √2 m_{t}/v = 1.414 × 173/246 ≈ 0.99
K: Electroweak symmetry breaking gives W and Z masses via eaten Goldstones; Yukawa couplings give fermion masses.
!: The Higgs gives mass to elementary particles, not to most of the mass of ordinary matter (that's QCD binding).
Q: What is the Higgs vacuum expectation value? | v ≈ 246 GeV.
Q: What happens to the three would-be Goldstone bosons? | They become the longitudinal polarisations of W^{+}, W^{−} and Z.
M1: The Higgs couples most strongly to: | The top quark | The electron | The photon | Neutrinos | Coupling ∝ mass.
M2: The Higgs was discovered in: | 2012 | 1983 | 1995 | 2016 | ATLAS and CMS.

## Effective field theory
S: Effective field theory describes physics at a chosen energy scale using only the relevant fields, with heavier physics summarised by higher-dimension operators. It systematises approximation, makes predictions with controlled errors, and is now the standard way to interpret precision measurements.
H: Building an EFT
- Identify light degrees of freedom and symmetries.
- Write all allowed operators, organised by mass dimension.
- Power counting: an operator of dimension d has coefficient ~1/Λ^{d−4}.
- Truncate at the desired precision (E/Λ)^{n}.
E: ℒ = ℒ_{d≤4} + Σ_{i}(c_{i}/Λ^{d_{i}−4})O_{i} :: EFT expansion
H: Top-down and bottom-up
- **Top-down**: known full theory; integrate out heavy fields (e.g. Fermi theory from W exchange; heavy quark effective theory).
- **Bottom-up**: unknown UV; measure coefficients (SMEFT with 59 independent dimension-6 operators in one generation, Warsaw basis).
- **Matching** at the heavy scale and **running** with RG equations connect scales.
H: Examples
P: Weinberg's dimension-5 operator (LH)^{2}/Λ gives neutrino masses m_{ν} ~ v^{2}/Λ, suggesting Λ ~ 10^{14–15} GeV. Chiral perturbation theory describes pions; NRQED/NRQCD describe bound states; soft-collinear effective theory resums jets. General relativity is an EFT of gravity with corrections suppressed by (E/M_{Pl})^{2}. Condensed-matter examples: Fermi liquids, Ginzburg–Landau, elasticity.
X: Neutrino mass ~0.05 eV from the Weinberg operator: estimate Λ.
> m_{ν} ~ v^{2}/Λ ⇒ Λ ~ (246 GeV)^{2}/(5 × 10^{-11} GeV) ≈ 1.2 × 10^{15} GeV
X: A dimension-6 operator with Λ = 2 TeV: size of effect at 200 GeV?
> (E/Λ)^{2} = (0.1)^{2} = 1%
K: EFTs keep only light physics and organise unknown heavy effects by power counting.
!: An EFT is only valid well below Λ; near the cutoff the expansion fails and new particles appear.
Q: What does the Weinberg operator explain? | Small neutrino masses from new physics at a very high scale.
Q: What is matching? | Fixing EFT coefficients by requiring agreement with the full theory at the heavy scale.
M1: A dimension-8 operator is suppressed by: | 1/Λ^{4} | 1/Λ^{2} | 1/Λ | Λ^{4} | d − 4 = 4.
M2: SMEFT is a: | Bottom-up EFT for new physics beyond the Standard Model | Lattice method | Gravity theory | Fermi theory | Parametrises unknown heavy physics.

## Renormalisation group
S: The renormalisation group describes how a theory's couplings and effective description change with the scale at which it is probed. It explains asymptotic freedom, universality of critical phenomena and why low-energy physics is insensitive to short-distance details.
H: The RG equation
- β(g) = μ dg/dμ describes running.
- Callan–Symanzik equation: [μ∂_{μ} + β∂_{g} + nγ]G^{(n)} = 0 for correlation functions.
- Anomalous dimensions γ: fields acquire scaling dimensions different from classical values.
E: [μ∂/∂μ + β(g)∂/∂g + nγ(g)]G^{(n)} = 0 :: Callan–Symanzik equation
H: Fixed points and flows
- Fixed points β(g*) = 0: scale-invariant (often conformal) theories.
- **UV fixed point** g* = 0: asymptotic freedom (QCD).
- **IR fixed points**: describe critical phenomena (Wilson–Fisher in d = 4 − ε).
- Operators classified: **relevant** (grow toward IR, e.g. mass terms), **marginal**, **irrelevant** (shrink; why effective theories work).
E: β(λ) = −ελ + 3λ^{2}/(16π^{2}) ⇒ λ* = 16π^{2}ε/3 :: Wilson–Fisher fixed point
H: Wilson's picture
P: Integrate out short-wavelength modes, rescale, and see how couplings change: a flow in theory space. Near a fixed point, critical exponents are determined by scaling dimensions, explaining universality: water at its critical point and a uniaxial magnet share exponents (3D Ising class). Wilson won the 1982 Nobel Prize. The RG also resums large logarithms in collider predictions and governs grand unification (couplings nearly meet at ~10^{16} GeV).
X: In d = 3 (ε = 1), what does the leading ε-expansion give for the Ising exponent ν?
> ν ≈ ½ + ε/12 ≈ 0.58 (true value 0.630)
X: Mass term is relevant: what happens to a small mass at long distances?
> Its importance grows as the scale increases until it dominates, gapping the theory
K: The RG tracks how theories change with scale; fixed points govern universality and asymptotic behaviour.
!: "Irrelevant" operators are not unimportant: they set small but measurable corrections and can encode new physics.
Q: What is a relevant operator? | One whose effect grows at long distances (low energies).
Q: What explains universality in critical phenomena? | Different systems flow to the same RG fixed point.
M1: Asymptotic freedom corresponds to: | A UV fixed point at zero coupling | An IR fixed point | No fixed point | Infinite coupling | Coupling → 0 at high energy.
M2: The Wilson–Fisher fixed point describes: | Critical phenomena in d < 4 | QED | Black holes | Fermi liquids | ε-expansion.

## Anomalies
S: An anomaly is a classical symmetry broken by quantum effects. Anomalies explain why the neutral pion decays into two photons, constrain which particles can exist in the Standard Model, and underpin topological phenomena in condensed matter.
H: The chiral anomaly
- Classically, massless fermions conserve the axial current j^{μ5} = ψ̄γ^{μ}γ^{5}ψ.
- Quantum triangle diagrams break it: ∂_{μ}j^{μ5} = (e^{2}/16π^{2})ε^{μνρσ}F_{μν}F_{ρσ} (Adler–Bell–Jackiw).
- Predicts π^{0} → γγ with rate Γ = α^{2}m_{π}^{3}N_{c}^{2}(Q_{u}^{2} − Q_{d}^{2})^{2}/(64π^{3}f_{π}^{2}), confirming 3 colours.
E: ∂_{μ}j^{μ5} = (e^{2}/2π^{2}) E·B :: ABJ anomaly in natural units (overall sign is convention-dependent)
E: Γ(π^{0} → γγ) ≈ 7.7 eV :: anomaly prediction with N_{c} = 3
H: Gauge anomalies must cancel
- Anomalies in gauge currents would break gauge invariance and spoil consistency.
- In the Standard Model they cancel generation by generation: Σ charges^{3} over left-handed fermions = 0, needing quarks and leptons together.
- Example condition: Σ Y = 0 and Σ Y^{3} = 0 over each generation.
H: Other anomalies
P: The trace (conformal) anomaly makes the QCD coupling run and generates hadron masses from a scale-free classical theory. The U(1)_{A} problem (η' mass) is solved by the anomaly plus instantons. Gravitational anomalies constrain string theories (Green–Schwarz mechanism in 1984). In condensed matter, the chiral anomaly appears in Weyl semimetals as negative magnetoresistance, and anomaly inflow explains edge modes of topological phases.
X: Check the U(1)_{Y} anomaly sum Σ Y^{3} for one generation (left-handed Weyl fields, using Y with Q = T_{3} + Y/2): Q_{L}: 6 × (1/3)^{3}, L: 2 × (−1)^{3}, u^{c}: 3 × (−4/3)^{3}, d^{c}: 3 × (2/3)^{3}, e^{c}: 1 × 2^{3}.
> 6/27 − 2 − 3 × 64/27 + 3 × 8/27 + 8
> = 0.222 − 2 − 7.111 + 0.889 + 8 = 0 ✓
K: Anomalies are quantum breakings of classical symmetries; global ones are physical predictions, gauge ones must cancel.
!: Anomaly cancellation in the Standard Model works only with complete generations of quarks and leptons.
Q: What does the chiral anomaly explain? | The decay π^{0} → γγ and its rate, which confirms three quark colours.
Q: What is the trace anomaly? | Quantum breaking of scale invariance, related to running couplings.
M1: Gauge anomalies must: | Cancel | Be large | Be ignored | Give mass | Otherwise the theory is inconsistent.
M2: Weyl semimetals show the chiral anomaly as: | Negative longitudinal magnetoresistance | Superconductivity | Ferromagnetism | Optical transparency | Charge pumping between Weyl nodes.

## Non-Abelian gauge theories
S: Non-Abelian gauge theories, or Yang–Mills theories, use symmetry groups whose transformations don't commute. Their gauge bosons carry charge and interact with each other, producing the rich behaviour of the strong and weak forces, including asymptotic freedom and confinement.
H: Yang–Mills structure
- Gauge group G (SU(N)); fields A^{a}_{μ}, one per generator.
- Field strength includes a commutator: F_{μν} = ∂_{μ}A_{ν} − ∂_{ν}A_{μ} − ig[A_{μ}, A_{ν}].
- Self-interactions: three- and four-gauge-boson vertices.
- ℒ = −(1/2)tr F_{μν}F^{μν} (with tr(T^{a}T^{b}) = ½δ^{ab}).
E: F_{μν} = ∂_{μ}A_{ν} − ∂_{ν}A_{μ} − ig[A_{μ}, A_{ν}] :: non-abelian field strength
H: Quantum properties
- Faddeev–Popov ghosts are needed in covariant gauges.
- β function for SU(N) with n_{f} fermions: β_{0} = (11N − 2n_{f})/3 (times g^{3}/16π^{2} with a minus sign): asymptotic freedom when 11N > 2n_{f}.
- Pure Yang–Mills has a mass gap (glueballs ~1.5–2 GeV from lattice), proving it rigorously is a Millennium Prize problem.
E: β(g) = −(g^{3}/16π^{2})(11N/3 − 2n_{f}/3) :: one-loop β function
H: Topology and phases
P: Non-abelian theories have topologically distinct vacua connected by instantons, giving the θ-term and tunnelling effects. Monopoles and vortices appear when they're broken by Higgs fields ('t Hooft–Polyakov monopoles). Phases: confining (QCD), Higgs (electroweak), Coulomb. Large-N expansions ('t Hooft) organise diagrams by topology, connecting gauge theories to strings (AdS/CFT).
X: Is SU(3) with 6 quark flavours asymptotically free?
> 11 × 3 − 2 × 6 = 33 − 12 = 21 > 0: yes
X: Maximum number of flavours for asymptotic freedom in SU(3)?
> 33 > 2n_{f} ⇒ n_{f} ≤ 16
K: Non-abelian gauge bosons self-interact; this leads to asymptotic freedom, confinement and topological vacuum structure.
!: Yang–Mills theory has massless gauge fields classically, but the quantum theory is believed to have a mass gap.
Q: What is the Yang–Mills mass gap problem? | Proving that quantum Yang–Mills theory has a positive lower bound on particle masses; a Millennium Prize problem.
Q: What do instantons describe? | Tunnelling between topologically distinct gauge vacua.
M1: Gluon self-interaction vertices include: | Three- and four-gluon vertices | Only quark–gluon | No vertices | Photon–gluon | From the commutator term.
M2: Large-N expansions organise diagrams by: | Topology (genus) | Energy only | Spin | Charge | 't Hooft's insight.

## Lattice field theory
S: Lattice field theory discretises spacetime into a grid so quantum field theories can be computed numerically from first principles. Lattice QCD computes hadron masses, decay constants and the properties of hot quark matter, where perturbation theory fails.
H: Setting up
- Euclidean spacetime with lattice spacing a and finite volume L^{4}.
- Gauge fields live on links as group elements U_{μ}(x) = e^{iagA_{μ}}; quarks on sites.
- Wilson action: S = β Σ_{plaquettes}(1 − (1/N)Re tr U_{□}), β = 2N/g^{2}.
- Gauge invariance is exact on the lattice.
E: S_{W} = β Σ_{□}[1 − (1/N)Re tr U_{□}] :: Wilson gauge action
H: Computing
- Monte Carlo (hybrid Monte Carlo) samples gauge configurations with weight e^{−S}.
- Correlation functions decay as e^{−mt}, giving masses.
- Fermions: doubling problem (naive discretisation gives 16 species); solutions include Wilson, staggered, domain-wall and overlap fermions.
- Extrapolate to a → 0 (continuum), L → ∞ and physical quark masses.
E: C(t) ∝ e^{−m_{H}t} :: extracting hadron masses
H: Achievements and challenges
P: Lattice QCD reproduces the light hadron spectrum to ~1%, computes the proton–neutron mass difference, quark masses, α_{s}, CKM-related matrix elements and the hadronic contribution to the muon g − 2. It shows the QCD transition at T_{c} ≈ 155 MeV is a crossover. The fermion sign problem blocks direct simulations at high baryon density (neutron star cores) and real-time dynamics; quantum computers may help.
X: A correlator falls by e^{−1} every 0.21 fm in Euclidean time. Hadron mass?
> m = 1/0.21 fm^{-1} × 197 MeV fm ≈ 938 MeV: the nucleon
X: Lattice spacing 0.1 fm: momentum cutoff?
> π/a ≈ π × 1973 MeV ≈ 6.2 GeV
K: Discretising spacetime lets QFTs be simulated numerically, giving non-perturbative QCD predictions with controlled errors.
!: Lattice results need continuum, infinite-volume and physical-mass extrapolations; raw numbers at one spacing aren't final.
Q: What is the fermion doubling problem? | Naive lattice fermions produce extra unwanted species (16 in 4D).
Q: What blocks lattice simulations of dense quark matter? | The sign problem: the path-integral weight becomes complex.
M1: Lattice gauge fields live on: | Links | Sites only | Nowhere | Plaquette centres | Parallel transporters.
M2: Lattice QCD shows the finite-temperature transition is: | A crossover around 155 MeV | First-order at 1 GeV | Absent | At 1 MeV | For physical quark masses.

## Quantum field theory in curved spacetime
S: Quantum field theory in curved spacetime studies quantum fields on a classical, curved background geometry. It predicts that black holes emit Hawking radiation, that expanding universes create particles, and that the notion of a particle depends on the observer.
H: Main ideas
- Fields obey curved-space wave equations, e.g. (□_{g} + m^{2} + ξR)φ = 0.
- No unique vacuum without a timelike symmetry; different observers define different particles.
- Bogoliubov transformations relate creation/annihilation operators of different observers: a_{out} = αa_{in} + β*b_{in}^{†}; |β|^{2} gives created particles.
E: N = |β|^{2} :: particles created between in and out vacua
H: Key predictions
- **Hawking radiation**: black holes radiate thermally at T_{H} = ħc^{3}/(8πGMk_{B}).
- **Unruh effect**: accelerated observers see thermal radiation at T = ħa/(2πck_{B}).
- **Cosmological particle creation**: inflation stretches quantum fluctuations into density perturbations, seeding galaxies (and possibly primordial gravitational waves).
- **Gibbons–Hawking** temperature of de Sitter space.
E: T_{H} = ħc^{3}/(8πGMk_{B}) ≈ 6 × 10^{-8} K × (M_{☉}/M) :: Hawking temperature
H: Open problems
P: The information paradox asks whether Hawking radiation destroys information; recent work (Page curves, islands, replica wormholes) suggests unitarity is preserved. Backreaction requires the renormalised stress tensor ⟨T_{μν}⟩ as a source in semiclassical gravity. A full quantum theory of gravity (strings, loop quantum gravity, holography) is still needed. Analogue experiments in fluids and Bose–Einstein condensates have observed Hawking-like radiation.
X: Hawking temperature of a 10 solar-mass black hole?
> 6 × 10^{-8}/10 ≈ 6 × 10^{-9} K, far colder than the 2.7 K CMB
X: Evaporation time scales as M^{3}. A 10^{12} kg black hole lives ~10^{10} years; how about 10^{11} kg?
> (0.1)^{3} × 10^{10} ≈ 10^{7} years
K: Curved spacetime makes the vacuum observer-dependent, leading to particle creation and Hawking radiation.
!: Astrophysical black holes absorb more CMB than they emit; Hawking radiation dominates only for tiny or very old black holes.
Q: What is a Bogoliubov transformation? | A linear relation between different observers' creation and annihilation operators that mixes particles and antiparticles.
Q: How does inflation seed galaxies? | Quantum fluctuations of fields are stretched to cosmic scales, becoming density perturbations.
M1: Hawking temperature is inversely proportional to: | Black hole mass | Surface area | Spin squared | Charge | T ∝ 1/M.
M2: The information paradox concerns: | Whether black hole evaporation preserves unitarity | Light speed | Dark matter | Neutrino mass | Page curve.
`;
