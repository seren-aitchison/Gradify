// Unit 13: Statistical Mechanics. Format: kit/course/notes.js
export default `
## Microstates and macrostates
S: A microstate specifies the exact state of every particle; a macrostate specifies only bulk properties like energy, volume and particle number. Statistical mechanics explains thermodynamics by counting how many microstates belong to each macrostate.
H: Counting
E: Ω(macrostate) = number of compatible microstates
- Fundamental postulate: in an isolated system at equilibrium, all accessible microstates are equally likely.
- The observed macrostate is the one with by far the most microstates.
H: Coins as a model
P: Toss 100 coins. The macrostate "50 heads" has C(100, 50) ≈ 10^{29} microstates; "100 heads" has 1. With 10^{23} particles, the most likely macrostate is so dominant that fluctuations away from it are never seen: that's why thermodynamics is deterministic.
X: 4 coins: how many microstates in each macrostate?
> 0 heads: 1; 1: 4; 2: 6; 3: 4; 4: 1 (total 16)
> "2 heads" is most likely (6/16)
!: The equal-probability postulate applies to microstates, not macrostates; macrostates differ enormously in probability.
Q: What is the fundamental postulate of statistical mechanics? | All accessible microstates of an isolated system in equilibrium are equally probable.
Q: Why does the most probable macrostate dominate for large systems? | Its number of microstates vastly exceeds all others', so relative fluctuations scale as 1/√N.
M1: With 10 coins, the macrostate with most microstates is: | 5 heads | 10 heads | 0 heads | 1 head | C(10, 5) = 252.
M2: A macrostate is specified by: | Bulk variables like E, V, N | Every particle's position | One particle | Its entropy only | Coarse description.

## Statistical ensembles
S: An ensemble is an imagined collection of many copies of a system, each in a different microstate consistent with the macroscopic constraints. Averages over the ensemble give thermodynamic quantities.
H: Why ensembles
- We can't track one system's microstate, but we can compute probabilities.
- Ergodic hypothesis: time averages for one system equal ensemble averages.
- Different constraints (fixed E, fixed T, fixed μ) give different ensembles, which agree for large systems.
H: The main ensembles
- **Microcanonical**: isolated, fixed N, V, E.
- **Canonical**: fixed N, V, T (in contact with a heat bath).
- **Grand canonical**: fixed μ, V, T (exchanging energy and particles).
- **Isothermal–isobaric**: fixed N, p, T.
H: Ensemble equivalence
P: For large N, fluctuations of energy in the canonical ensemble are tiny (relative size ~1/√N), so canonical and microcanonical averages agree. Choose whichever makes the maths easiest; canonical is usually simplest.
X: Why use the canonical ensemble for a cup of coffee in a room?
> The coffee exchanges energy with the room, which acts as a heat bath at fixed T
> Its energy fluctuates slightly; N and V are fixed
!: Ensembles can disagree for small systems or near phase transitions with long-range forces (like self-gravitating systems).
Q: What is the ergodic hypothesis? | That time averages over a single system's evolution equal averages over the ensemble.
Q: Which ensemble describes a system exchanging energy and particles with a reservoir? | The grand canonical ensemble.
M1: The canonical ensemble fixes: | N, V and T | N, V and E | μ, V and T | N, p and T | Heat bath.
M2: Relative energy fluctuations in the canonical ensemble scale as: | 1/√N | N | 1/N^{2} | Constant | Large N ⇒ sharp energy.

## Microcanonical, canonical and grand canonical ensembles
S: The three main ensembles each have their own probability rule and their own link to thermodynamics. Knowing which to use, and how to get thermodynamic quantities from each, is the core technique of statistical mechanics.
H: Microcanonical (N, V, E)
E: P = 1/Ω; S = k_{B} ln Ω; 1/T = ∂S/∂E
H: Canonical (N, V, T)
E: P_{i} = e^{−E_{i}/k_{B}T}/Z; Z = Σe^{−E_{i}/k_{B}T}
E: F = −k_{B}T ln Z; ⟨E⟩ = −∂ln Z/∂β, β = 1/k_{B}T
H: Grand canonical (μ, V, T)
E: P_{i} = e^{−(E_{i} − μN_{i})/k_{B}T}/𝒵
E: Φ_{G} = −k_{B}T ln 𝒵 = −pV
- Natural for quantum gases, adsorption, chemical reactions.
H: Deriving the Boltzmann factor
P: Put a small system in contact with a huge reservoir. The probability of the small system having energy E_{i} is proportional to the reservoir's number of states with energy E_{tot} − E_{i}: Ω_{R} ∝ e^{S_{R}/k_{B}} ≈ e^{(S_{R}(E_{tot}) − E_{i}/T)/k_{B}}. Hence P ∝ e^{−E_{i}/k_{B}T}.
X: Two-level system (energies 0 and ε) at temperature T. Mean energy?
> Z = 1 + e^{−βε}
> ⟨E⟩ = ε/(e^{βε} + 1): 0 at low T, ε/2 at high T
!: The partition function sums over states, not energy levels; degenerate levels count once per state.
Q: How is free energy obtained from the canonical partition function? | F = −k_{B}T ln Z.
Q: Why is the grand canonical ensemble convenient for quantum gases? | Particle number fluctuates, so occupation of each state can be treated independently.
M1: In the microcanonical ensemble, temperature is defined by: | 1/T = ∂S/∂E | T = ∂E/∂N | T = Z | T = −k_{B} ln Ω | From entropy.
M2: The high-T limit of a two-level system's mean energy is: | ε/2 | ε | 0 | ∞ | Both levels equally occupied.

## Boltzmann distribution
S: In thermal equilibrium at temperature T, the probability of finding a system in a state of energy E is proportional to e^{−E/k_{B}T}. Higher energy states are exponentially less populated, unless k_{B}T is comparable to the energy gap.
H: The distribution
E: P(E_{i}) = g_{i}e^{−E_{i}/k_{B}T}/Z :: g_{i} = degeneracy
E: N_{2}/N_{1} = (g_{2}/g_{1})e^{−ΔE/k_{B}T}
- k_{B}T at 300 K ≈ 0.026 eV ≈ 1/40 eV.
H: Applications
- **Barometric formula**: n(h) = n_{0}e^{−mgh/k_{B}T}.
- **Arrhenius law**: reaction rates ∝ e^{−E_{a}/k_{B}T} (why cooking is faster at higher T and food keeps in the fridge).
- **Semiconductors**: carrier density ∝ e^{−E_{g}/2k_{B}T}.
- **Spectroscopy**: line intensities depend on populations; lasers need population inversion, impossible in equilibrium.
X: What fraction of hydrogen atoms in a star at 10 000 K are in n = 2 (ΔE = 10.2 eV, g_{2}/g_{1} = 4)?
> k_{B}T = 0.862 eV
> N_{2}/N_{1} = 4e^{−11.8} = 3 × 10^{-5}: small, but enough to give strong Balmer lines
!: The Boltzmann factor compares individual states; with degeneracies, higher levels can hold more particles if they have many more states.
Q: What is k_{B}T at room temperature in eV? | About 0.025 eV (1/40 eV).
Q: Why can't lasers work in thermal equilibrium? | The Boltzmann distribution always has fewer particles in higher levels; lasing needs population inversion.
M1: As T → ∞, populations of all non-degenerate states become: | Equal | Zero | Concentrated in the ground state | Inverted | e^{−E/k_{B}T} → 1.
M2: A rate doubles for a 10 K rise near room temperature. This suggests activation energy of roughly: | 0.5 eV | 0.005 eV | 5 eV | 50 eV | ln 2 = E_{a}ΔT/(k_{B}T^{2}) ⇒ E_{a} ≈ 0.53 eV.

## Maxwell–Boltzmann distribution
S: The Maxwell–Boltzmann distribution gives the spread of molecular speeds in a gas at temperature T. Most molecules move near a typical speed, but a long tail of fast molecules drives evaporation, chemical reactions and atmospheric escape.
H: The distribution
E: f(v) = 4π(m/(2πk_{B}T))^{3/2}v^{2}e^{−mv^{2}/(2k_{B}T)}
E: v_{p} = √(2k_{B}T/m); ⟨v⟩ = √(8k_{B}T/πm); v_{rms} = √(3k_{B}T/m)
- v_{p} < ⟨v⟩ < v_{rms} (ratio 1 : 1.13 : 1.22).
- Each velocity component is Gaussian; the v^{2} factor counts the growing shell of directions.
H: Dependence
- Higher T or lower m: broader, shifted to higher speeds.
- Nitrogen at 300 K: v_{rms} ≈ 517 m s^{-1}; hydrogen ≈ 1930 m s^{-1}.
H: Experimental test
P: Rotating-disc velocity selectors and time-of-flight molecular beams (Stern, Miller and Kusch) confirmed the distribution precisely. The effusing beam's distribution has an extra factor of v (faster molecules hit the hole more often).
X: Compare v_{rms} of O_{2} and H_{2} at the same temperature.
> v_{rms} ∝ 1/√m: ratio √(32/2) = 4
> Hydrogen molecules are 4 times faster
!: The average speed isn't the speed of the average kinetic energy; v_{rms} relates to ⟨KE⟩.
Q: What is the rms speed of gas molecules? | v_{rms} = √(3k_{B}T/m).
Q: Why does the distribution start at zero for v = 0? | The number of velocity states grows as v^{2} (shells in velocity space).
M1: Doubling the absolute temperature multiplies v_{rms} by: | √2 | 2 | 4 | 1/√2 | ∝ √T.
M2: Which is largest? | v_{rms} | v_{p} | ⟨v⟩ | All equal | 1.22 vs 1 and 1.13.

## Partition functions
S: The partition function Z is a weighted sum over all states. Once you have it, every thermodynamic quantity follows by differentiation: it encodes everything about a system in equilibrium.
H: Definition and uses
E: Z = Σ_{i}e^{−βE_{i}}, β = 1/k_{B}T
E: F = −k_{B}T ln Z; ⟨E⟩ = −∂ln Z/∂β; S = k_{B}(ln Z + β⟨E⟩)
E: C_{V} = ∂⟨E⟩/∂T; p = k_{B}T(∂ln Z/∂V)_{T}
H: Factorisation
- Independent parts multiply: Z_{total} = Z_{trans}Z_{rot}Z_{vib}Z_{elec}.
- N indistinguishable, independent particles (classical): Z_{N} = Z_{1}^{N}/N!.
H: Standard results
E: Z_{trans} = V/λ^{3}, λ = h/√(2πmk_{B}T) :: thermal de Broglie wavelength
E: Z_{vib} = 1/(1 − e^{−βħω}) (from ground) :: quantum oscillator
E: Z_{rot} ≈ k_{B}T/(hcB) :: linear rotor at high T
X: Find ⟨E⟩ for a quantum harmonic oscillator.
> Z = e^{−βħω/2}/(1 − e^{−βħω})
> ⟨E⟩ = ħω/2 + ħω/(e^{βħω} − 1): k_{B}T at high T, ħω/2 at low T
!: The N! for indistinguishable particles is essential: without it, entropy isn't extensive (the Gibbs paradox).
Q: How do you get mean energy from Z? | ⟨E⟩ = −∂ln Z/∂β.
Q: Why divide by N! for identical particles? | Swapping identical particles doesn't create a new state; omitting it gives the Gibbs paradox.
M1: For independent subsystems, partition functions: | Multiply | Add | Subtract | Are equal | Energies add, exponentials multiply.
M2: At very low T, Z approaches: | The ground-state degeneracy times e^{−βE_{0}} | Infinity | Zero always | The number of states | Only the ground state contributes.

## Entropy and probability
S: Entropy measures how probable a macrostate is: the logarithm of its number of microstates. The second law is then simply the statement that systems move to more probable states.
H: Formulas
E: S = k_{B} ln Ω :: microcanonical
E: S = −k_{B}Σp_{i} ln p_{i} :: Gibbs (any distribution)
- Maximum when all accessible states are equally likely.
- Extensive: for independent systems Ω multiplies, so S adds.
H: Maximum entropy
P: Maximising S = −k_{B}Σp ln p subject to fixed total probability and mean energy (using Lagrange multipliers) gives the Boltzmann distribution, with β = 1/k_{B}T as the multiplier. Jaynes argued statistical mechanics is just inference: choose the least-biased distribution consistent with what you know.
H: Probability of fluctuations
E: P ∝ e^{ΔS/k_{B}}
- A fluctuation lowering entropy by ΔS has probability ~e^{−|ΔS|/k_{B}}. For macroscopic ΔS (say 10^{-10} J K^{-1}), the exponent is ~10^{13}: never observed.
X: Gas in a box: probability all N molecules are in the left half?
> (1/2)^{N}
> N = 100: 8 × 10^{-31}; N = 10^{23}: effectively zero
!: Entropy depends on what you count as distinguishable; the choice of macrostate variables matters.
Q: How is the second law explained statistically? | Systems evolve towards macrostates with more microstates, which are overwhelmingly more probable.
Q: What distribution maximises entropy at fixed mean energy? | The Boltzmann distribution.
M1: For two independent systems, total entropy is: | S_{1} + S_{2} | S_{1}S_{2} | max(S_{1}, S_{2}) | ln(S_{1}S_{2}) | ln(Ω_{1}Ω_{2}).
M2: Gibbs entropy is largest when: | All states are equally probable | One state is certain | T = 0 | Energy is minimal | Uniform distribution.

## Multiplicity and state counting
S: Multiplicity is the number of microstates in a macrostate. Counting states, with combinatorics or phase-space volumes, is how statistical mechanics turns microscopic models into entropy and temperature.
H: Combinatorics
E: Ω = N!/(n!(N − n)!) :: n of N two-state units in one state
E: Ω = (q + N − 1)!/(q!(N − 1)!) :: Einstein solid: q energy quanta among N oscillators
E: ln N! ≈ N ln N − N :: Stirling's approximation
H: Classical phase space
E: Ω = (phase-space volume)/h^{3N}
- Each particle has 3 position and 3 momentum coordinates; quantum mechanics sets the cell size h^{3}.
- Ideal gas: the Sackur–Tetrode equation for absolute entropy.
H: Two systems in contact
P: Share energy between two Einstein solids. The total multiplicity Ω_{A}Ω_{B} peaks extremely sharply at one division of energy: the one where ∂ln Ω_{A}/∂E_{A} = ∂ln Ω_{B}/∂E_{B}, i.e. equal temperatures. Thermal equilibrium emerges from counting.
X: Einstein solid with N = 3 oscillators and q = 3 quanta. Multiplicity?
> Ω = 5!/(3! 2!) = 10
!: Stirling's approximation is excellent for large N but poor for small numbers; use exact factorials for small systems.
Q: What is Stirling's approximation? | ln N! ≈ N ln N − N for large N.
Q: Why is phase space divided into cells of size h^{3} per particle? | Quantum mechanics (uncertainty) sets the minimum distinguishable volume, giving absolute entropies.
M1: Number of ways to choose 2 heads from 5 coins: | 10 | 5 | 20 | 25 | C(5, 2).
M2: Thermal equilibrium between two solids corresponds to: | Maximum total multiplicity | Equal energies | Equal numbers of oscillators | Minimum multiplicity | Equal ∂ln Ω/∂E.

## Equipartition theorem
S: In classical thermal equilibrium, every quadratic term in a system's energy has an average value of ½k_{B}T. This quickly gives heat capacities of gases and solids, and its failures revealed the need for quantum theory.
H: The theorem
E: ⟨½mv_{x}^{2}⟩ = ½k_{B}T; ⟨½kx^{2}⟩ = ½k_{B}T
H: Applications
- Monatomic gas: 3 translational ⇒ U = (3/2)Nk_{B}T, C_{V} = (3/2)R.
- Diatomic: + 2 rotational ⇒ (5/2)R; + vibration (KE and PE) ⇒ (7/2)R at high T.
- Solid: 3 KE + 3 PE terms per atom ⇒ 3R (Dulong–Petit).
- Brownian motion: ⟨½mv^{2}⟩ = (3/2)k_{B}T even for pollen grains.
- Thermal noise: each mode of a circuit has ½k_{B}T (Johnson noise).
H: Failure and quantum freeze-out
P: Diatomic gases at room temperature have C_{V} = (5/2)R, not (7/2)R: vibrations are "frozen out" because ħω ≫ k_{B}T. Equipartition applied to EM modes in a cavity predicted infinite energy (the ultraviolet catastrophe). Quantum theory fixes both: modes contribute only when k_{B}T is large compared with their level spacing.
X: Mean speed fluctuation of a 1 μm, 10^{-15} kg particle in water at 300 K (one direction)?
> ½m⟨v_{x}^{2}⟩ = ½k_{B}T ⇒ v_{rms,x} = √(k_{B}T/m) = √(4.1 × 10^{-21}/10^{-15}) = 2 mm s^{-1}
!: Equipartition is classical; it fails for modes where the quantum spacing exceeds k_{B}T.
Q: State the equipartition theorem. | Each quadratic degree of freedom has average energy ½k_{B}T in classical equilibrium.
Q: Why don't diatomic molecules' vibrations contribute to C_{V} at room temperature? | The vibrational quantum ħω is much larger than k_{B}T, so the mode is frozen out.
M1: C_{V} of a monatomic ideal gas per mole: | (3/2)R | (5/2)R | 3R | R | Three translational terms.
M2: The ultraviolet catastrophe came from applying equipartition to: | Cavity radiation modes | Gas molecules | Solids | Electrons in metals | Infinitely many modes each with k_{B}T.

## Classical ideal gases
S: An ideal gas is a collection of non-interacting point particles. Statistical mechanics derives its equation of state, its internal energy and its absolute entropy from first principles.
H: Results from the partition function
E: Z_{N} = (V/λ^{3})^{N}/N!, λ = h/√(2πmk_{B}T)
E: pV = Nk_{B}T; U = (3/2)Nk_{B}T
E: S = Nk_{B}[ln(V/(Nλ^{3})) + 5/2] :: Sackur–Tetrode
E: μ = k_{B}T ln(nλ^{3}) :: chemical potential, n = N/V
H: When is a gas classical?
- Classical if nλ^{3} ≪ 1: particles are far apart compared with their thermal de Broglie wavelength.
- Room-temperature air: nλ^{3} ~ 10^{-7}. Electrons in metals: ~10^{3} (quantum). Ultracold atoms: ~1 (Bose–Einstein condensation).
H: Kinetic theory
P: The same pV = Nk_{B}T follows from Newtonian collisions: p = ⅓nm⟨v^{2}⟩. Comparing gives ⟨½mv^{2}⟩ = (3/2)k_{B}T, linking temperature to molecular motion.
X: Thermal de Broglie wavelength of helium at 300 K?
> λ = 6.63 × 10^{-34}/√(2π × 6.6 × 10^{-27} × 1.38 × 10^{-23} × 300) = 5 × 10^{-11} m
> Much smaller than spacing (~3 nm): classical
!: The ideal gas is classical only when nλ^{3} ≪ 1; at high density or low temperature, quantum statistics take over.
Q: What is the Sackur–Tetrode equation? | The absolute entropy of a classical monatomic ideal gas.
Q: What is the criterion for a gas to be treated classically? | nλ^{3} ≪ 1.
M1: The ideal gas internal energy depends on: | Temperature only | Volume only | Pressure only | Both V and T | U = (3/2)Nk_{B}T.
M2: The thermal de Broglie wavelength grows when: | Temperature falls | Temperature rises | Mass increases | Density rises | λ ∝ 1/√(mT).

## Mean free path
S: The mean free path is the average distance a molecule travels between collisions. It controls diffusion, viscosity and thermal conduction in gases, and decides when continuum fluid mechanics breaks down.
H: Formulas
E: λ = 1/(√2 nσ) = k_{B}T/(√2 πd^{2}p) :: σ = πd^{2} collision cross-section
E: τ = λ/⟨v⟩ :: mean time between collisions
- Air at STP: λ ≈ 70 nm; collision rate ~7 × 10^{9} s^{-1}.
- At 10^{-4} Pa: λ ~ 70 m.
H: Transport coefficients
E: D ≈ ⅓λ⟨v⟩; η ≈ ⅓nmλ⟨v⟩; κ ≈ ⅓nc_{v}λ⟨v⟩
P: A surprising prediction: gas viscosity is independent of pressure (n rises but λ falls in proportion). Maxwell predicted it and confirmed it experimentally. It fails only at very low pressure, when λ exceeds the container size.
H: Knudsen number
E: Kn = λ/L :: continuum valid for Kn ≪ 0.01; free molecular flow for Kn > 10
X: Find λ for N_{2} (d = 0.37 nm) at 300 K and 1 atm.
> λ = 1.38 × 10^{-23} × 300/(√2 π (3.7 × 10^{-10})^{2} × 1.01 × 10^{5}) = 67 nm
!: Mean free path doesn't depend on molecular speed; it's geometric (density and size).
Q: How does mean free path depend on pressure? | Inversely: λ ∝ 1/p at fixed T.
Q: Why is gas viscosity independent of pressure? | More molecules carry momentum, but each travels proportionally less far between collisions.
M1: Halving gas pressure at constant T changes λ by: | ×2 | ×1/2 | ×4 | Unchanged | λ ∝ 1/n.
M2: The Knudsen number compares: | Mean free path to system size | Viscosity to inertia | Speed to sound speed | Heat to work | Kn = λ/L.

## Molecular speed distributions
S: Molecular speeds in a gas follow the Maxwell–Boltzmann distribution, but what a measurement sees depends on how it samples them: molecules effusing through a hole, hitting a wall, or colliding are weighted towards faster ones.
H: Flux-weighted distributions
E: Φ = ¼n⟨v⟩ :: number of molecules hitting unit area per second
- Effusion through a small hole: speed distribution ∝ v^{3}e^{−mv^{2}/2k_{B}T}; mean KE of escaping molecules 2k_{B}T (not 3/2 k_{B}T).
- Graham's law: effusion rate ∝ 1/√m. Used to enrich uranium by gaseous diffusion of UF_{6}.
H: Evaporation and reaction rates
- Only molecules in the high-speed tail overcome barriers; small changes in T change the tail dramatically.
- Atmospheric escape: Jeans escape of light gases from the tail above escape velocity.
H: Doppler broadening
P: Spectral lines from a gas are broadened because emitters move with Maxwellian line-of-sight velocities: Δλ/λ ≈ √(8k_{B}T ln 2/(mc^{2})). Measuring it gives temperatures of stellar atmospheres and plasmas.
X: Ratio of effusion rates of ^{235}UF_{6} and ^{238}UF_{6}.
> √(352/349) = 1.0043
> Tiny: thousands of stages were needed
!: The distribution of speeds you measure depends on the sampling method; a beam isn't the same as the gas inside the oven.
Q: What is the molecular flux on a wall? | Φ = ¼n⟨v⟩.
Q: Why are escaping molecules on average more energetic than those in the gas? | Faster molecules reach the hole more often (flux weighting).
M1: Graham's law says effusion rate is proportional to: | 1/√m | m | √m | 1/m | Lighter effuse faster.
M2: Doppler broadening of a spectral line increases with: | Temperature | Mass | Density only | Magnetic field | Width ∝ √(T/m).

## Chemical potential
S: The chemical potential is the energy cost of adding one particle to a system. Particles flow from high to low chemical potential, so it governs diffusion, phase equilibrium, chemical reactions and the occupation of quantum states.
H: Definitions
E: μ = (∂F/∂N)_{T,V} = (∂G/∂N)_{T,p} = −T(∂S/∂N)_{E,V}
E: μ = k_{B}T ln(n/n_{Q}), n_{Q} = 1/λ^{3} :: classical ideal gas
- Classical gases have μ very negative (n ≪ n_{Q}).
- Equilibrium between phases or regions: equal μ.
H: Examples
- **Diffusion**: particles move from high to low concentration (high to low μ).
- **Atmosphere**: μ = k_{B}T ln(n/n_{Q}) + mgh constant gives the barometric formula.
- **Semiconductors**: the Fermi level is the electron chemical potential; at a p–n junction, Fermi levels align, creating the built-in voltage.
- **Photons**: μ = 0 because their number isn't conserved.
X: Derive the barometric formula from equal chemical potential.
> k_{B}T ln(n(h)/n_{Q}) + mgh = k_{B}T ln(n(0)/n_{Q})
> n(h) = n(0)e^{−mgh/k_{B}T}
!: Chemical potential isn't just chemical; it's the "pressure" for particle number in any system.
Q: Which way do particles flow in terms of chemical potential? | From high to low μ.
Q: Why is the chemical potential of photons zero? | Photon number isn't conserved; they're freely created and absorbed.
M1: In equilibrium between liquid and vapour: | μ_{liquid} = μ_{vapour} | Densities are equal | Pressures differ | Energies are equal | Equal chemical potential.
M2: The electron chemical potential in a semiconductor is called: | The Fermi level | The band gap | The work function | The donor level | Same concept.

## Fermi–Dirac statistics
S: Fermions (electrons, protons, neutrons, ^{3}He) obey the Pauli exclusion principle: no two can share a quantum state. Their average occupation follows the Fermi–Dirac distribution, which explains metals, semiconductors, white dwarfs and neutron stars.
H: The distribution
E: f(E) = 1/(e^{(E−μ)/k_{B}T} + 1)
- At T = 0: f = 1 below the Fermi energy E_{F}, 0 above (a sharp step).
- At finite T: the step blurs over ~k_{B}T around μ.
- At high T or low density: reduces to Maxwell–Boltzmann.
H: Free electron gas
E: E_{F} = (ħ^{2}/2m)(3π^{2}n)^{2/3}
- Copper: E_{F} ≈ 7 eV, T_{F} = E_{F}/k_{B} ≈ 80 000 K. Electrons in metals are highly degenerate at room temperature.
- Only electrons within ~k_{B}T of E_{F} can be excited: electronic heat capacity ∝ T and tiny, explaining why metals' C_{V} is close to 3R.
H: Consequences
P: Fermi pressure (degeneracy pressure) resists compression even at T = 0. It holds up white dwarfs (electrons) and neutron stars (neutrons), and makes ordinary matter incompressible enough to be stable.
X: E_{F} for sodium (n = 2.5 × 10^{28} m^{-3})?
> E_{F} = (1.05 × 10^{-34})^{2}/(2 × 9.11 × 10^{-31}) × (3π^{2} × 2.5 × 10^{28})^{2/3}
> ≈ 5.0 × 10^{-19} J ≈ 3.1 eV
!: Electrons at the Fermi level move fast (~10^{6} m s^{-1}) even at T = 0; "cold" fermions are far from still.
Q: What is the Fermi energy? | The energy of the highest occupied state at absolute zero.
Q: Why is the electronic heat capacity of metals small? | Only electrons within ~k_{B}T of the Fermi energy can be excited.
M1: At T = 0, the Fermi–Dirac occupation above E_{F} is: | 0 | 1 | ½ | e^{−1} | Step function.
M2: Electron degeneracy pressure supports: | White dwarfs | Main-sequence stars | Planets' atmospheres | Black holes | Pauli exclusion.

## Bose–Einstein statistics
S: Bosons (photons, phonons, ^{4}He atoms, many other atoms) can pile into the same quantum state. Their occupation follows the Bose–Einstein distribution, which enhances crowding and leads to lasers, superfluidity and Bose–Einstein condensation.
H: The distribution
E: n(E) = 1/(e^{(E−μ)/k_{B}T} − 1)
- μ must be below the lowest energy (else n < 0).
- For photons and phonons μ = 0: n = 1/(e^{ħω/k_{B}T} − 1) (Planck distribution).
- Low occupation: reduces to Maxwell–Boltzmann.
H: Bose–Einstein condensation
E: T_{c} = (2πħ^{2}/(mk_{B}))(n/2.612)^{2/3}
- Below T_{c}, a macroscopic fraction of particles occupies the ground state.
- Achieved in 1995 (Cornell, Wieman, Ketterle) with rubidium and sodium at ~100 nK.
- A BEC is a single coherent matter wave: interference between two condensates was observed.
H: Bosonic enhancement
P: The probability of a boson entering a state is multiplied by (1 + n) when n bosons are already there. That's stimulated emission (lasers) and the reason superfluid ^{4}He flows without friction below 2.17 K.
X: Why do photons in a cavity have μ = 0?
> The walls absorb and emit photons freely: N isn't conserved
> Minimising F with respect to N gives μ = 0
!: Not every boson system shows BEC; in 2D at finite T there's no true condensate, and interacting systems are more complex.
Q: What is Bose–Einstein condensation? | A macroscopic occupation of the lowest quantum state by bosons below a critical temperature.
Q: What sign must E − μ have for bosons? | Positive for all states, so μ < lowest energy.
M1: The Planck distribution is Bose–Einstein with: | μ = 0 | μ = E_{F} | μ → ∞ | μ = k_{B}T | Photons.
M2: The first gaseous BEC was made in: | 1995 | 1925 | 1938 | 2010 | Rubidium at JILA.

## Quantum gases
S: When particles are close compared with their thermal de Broglie wavelength, quantum statistics take over and gases behave very differently from classical ones. Ultracold atomic gases let physicists create and control such quantum gases precisely.
H: The degeneracy criterion
E: nλ^{3} ≳ 1, λ = h/√(2πmk_{B}T)
- Fermions: Fermi pressure, Pauli blocking.
- Bosons: bunching, BEC.
H: Ultracold atoms
- Laser cooling (Doppler, Sisyphus) to ~μK, then evaporative cooling to ~nK.
- Magnetic and optical traps hold atoms.
- Feshbach resonances tune interactions with magnetic fields: from strongly repulsive to attractive.
- Optical lattices (standing waves of light) mimic crystals: quantum simulation of the Hubbard model and Mott insulators.
- Degenerate Fermi gases: BEC–BCS crossover from molecular BEC to Cooper pairing.
H: Why it matters
P: Quantum gases are clean, tunable models of hard problems in condensed matter (high-T_{c} superconductivity, magnetism) and tools for precision measurement (atom interferometers, optical lattice clocks).
X: At what temperature does a gas of ^{87}Rb at n = 10^{20} m^{-3} reach nλ^{3} = 2.6 (the condensation point)?
> λ = (2.6/n)^{1/3} = 3.0 × 10^{-7} m
> T = h^{2}/(2πmk_{B}λ^{2}) = (6.63 × 10^{-34})^{2}/(2π × 1.44 × 10^{-25} × 1.38 × 10^{-23} × 9.0 × 10^{-14})
> T ≈ 4 × 10^{-7} K: about 0.4 μK
!: Ultracold gases are extremely dilute (a million times thinner than air); it's the low temperature, not high density, that makes them quantum.
Q: What is the condition for quantum degeneracy? | nλ^{3} ≳ 1: interparticle spacing comparable to the thermal de Broglie wavelength.
Q: What is a Feshbach resonance used for? | Tuning the interaction strength between ultracold atoms with a magnetic field.
M1: Optical lattices are made with: | Standing waves of laser light | Crystals | Magnets only | Electric wires | Periodic light potentials.
M2: Ultracold gases are quantum because: | Their temperature is very low, making λ large | They're very dense | They're charged | They're hot | λ ∝ 1/√T.

## Degenerate matter
S: Degenerate matter is so dense that the Pauli exclusion principle, not temperature, provides most of its pressure. It makes up white dwarfs and neutron stars and sets limits on how massive they can be.
H: Degeneracy pressure
E: p ∝ n^{5/3} :: non-relativistic
E: p ∝ n^{4/3} :: ultra-relativistic
- Doesn't depend on temperature: cooling doesn't make the star collapse.
H: White dwarfs
- Electron degeneracy; ~0.6 M_{⊙} in an Earth-sized sphere; density ~10^{9} kg m^{-3}.
- More massive white dwarfs are smaller (R ∝ M^{−1/3}).
- **Chandrasekhar limit** ~1.4 M_{⊙}: electrons become relativistic, pressure grows only as n^{4/3}, and gravity wins. Exceeding it triggers collapse or a type Ia supernova.
H: Neutron stars
- Neutron degeneracy plus nuclear forces; ~1.4–2.3 M_{⊙} in ~12 km radius; density ~10^{17} kg m^{-3}.
- Maximum mass ~2–3 M_{⊙} (Tolman–Oppenheimer–Volkoff limit); above it, a black hole.
- Interior possibly exotic: superfluid neutrons, superconducting protons, quark matter.
X: Estimate a white dwarf's density (0.6 M_{⊙}, R = 6000 km).
> V = (4/3)π(6 × 10^{6})^{3} = 9 × 10^{20} m^{3}
> ρ = 1.2 × 10^{30}/9 × 10^{20} ≈ 1.3 × 10^{9} kg m^{-3}: a teaspoon weighs ~6 t
!: Electrons in metals are degenerate too; degeneracy isn't exotic, only its extreme densities are.
Q: What is the Chandrasekhar limit? | About 1.4 solar masses, the maximum mass of a white dwarf supported by electron degeneracy pressure.
Q: Why do more massive white dwarfs have smaller radii? | Greater gravity compresses them until the higher degeneracy pressure balances it.
M1: Degeneracy pressure arises from: | The Pauli exclusion principle | Thermal motion | Radiation | Magnetic fields | Fermions can't share states.
M2: Neutron stars have radii of about: | 12 km | 6000 km | 1 km | 700 000 km | Extremely compact.

## Blackbody radiation
S: A blackbody absorbs all radiation and emits a spectrum fixed only by its temperature. Planck's explanation (1900), that energy is exchanged in quanta hf, launched quantum physics.
H: Planck's law
E: u(f, T) = (8πhf^{3}/c^{3})/(e^{hf/k_{B}T} − 1)
- Low frequency: Rayleigh–Jeans (∝ f^{2}T), the classical result.
- High frequency: Wien tail, exponentially suppressed.
- Classically each mode gets k_{B}T, and infinitely many modes give infinite energy: the ultraviolet catastrophe.
H: Derived laws
E: λ_{max}T = 2.898 × 10^{-3} m K :: Wien's displacement law
E: P = σAT^{4}, σ = 5.67 × 10^{-8} W m^{-2} K^{-4} :: Stefan–Boltzmann law
E: n_{γ} ≈ 2 × 10^{7}T^{3} m^{-3} :: photon number density
H: Real blackbodies
- Stars (approximately), the cosmic microwave background (the most perfect blackbody measured: 2.725 K, by COBE).
- Cavity with a small hole; carbon black; furnaces.
X: The Sun's spectrum peaks at about 500 nm. Estimate its surface temperature.
> T = 2.898 × 10^{-3}/5 × 10^{-7} = 5800 K
!: A blackbody isn't black when hot: it glows. "Black" refers to perfect absorption.
Q: What problem did Planck's quantum hypothesis solve? | The ultraviolet catastrophe in the classical theory of blackbody radiation.
Q: State Wien's displacement law. | λ_{max}T = 2.9 × 10^{-3} m K.
M1: Doubling a blackbody's temperature multiplies its emitted power by: | 16 | 2 | 4 | 8 | T^{4}.
M2: The CMB peaks in the: | Microwave region | Visible | X-ray | Radio below 1 MHz | 2.7 K ⇒ ~1 mm.

## Fluctuations and correlations
S: Thermodynamic quantities fluctuate about their averages. The size of fluctuations is linked to response functions like heat capacity and compressibility, and correlations between distant points reveal how ordered a system is.
H: Fluctuation formulas
E: ⟨ΔE^{2}⟩ = k_{B}T^{2}C_{V}
E: ⟨ΔN^{2}⟩/⟨N⟩^{2} = k_{B}Tκ_{T}/V
- Relative fluctuations ~1/√N: negligible for macroscopic systems, important for nanoscale ones.
H: Fluctuation–dissipation theorem
P: The same microscopic processes that cause random fluctuations also cause dissipation. Einstein's relation D = μk_{B}T links diffusion to mobility (Brownian motion); Johnson–Nyquist noise ⟨V^{2}⟩ = 4k_{B}TRΔf links voltage noise to resistance.
H: Correlations
E: G(r) = ⟨δφ(0)δφ(r)⟩ ~ e^{−r/ξ}
- ξ is the correlation length: how far order extends.
- At critical points ξ → ∞ and correlations decay as power laws; that's why fluctuations become visible (critical opalescence).
X: Energy fluctuation of 1 mol of monatomic gas at 300 K, relative to its mean?
> ⟨ΔE^{2}⟩^{1/2}/⟨E⟩ = √(k_{B}T^{2}C_{V})/((3/2)Nk_{B}T) = √(2/(3N))
> ≈ 10^{-12}
!: Fluctuations don't violate thermodynamics; they're part of it, and they matter at small scales (molecular motors, nanoelectronics).
Q: What does the fluctuation–dissipation theorem relate? | Spontaneous fluctuations in equilibrium to the dissipative response of the system.
Q: What happens to the correlation length at a critical point? | It diverges.
M1: Einstein's relation D = μk_{B}T links: | Diffusion and mobility | Energy and mass | Pressure and volume | Heat and work | Fluctuation–dissipation.
M2: Johnson noise increases with: | Temperature and resistance | Current | Capacitance | Frequency only | ⟨V^{2}⟩ = 4k_{B}TRΔf.

## Phase transitions
S: Statistical mechanics explains phase transitions as collective behaviour: interactions between many particles produce sudden changes in macroscopic order. Mean-field theories capture the basics; fluctuations make critical behaviour subtle.
H: Mean-field theory
P: Replace each particle's interactions with an average field from its neighbours. For a magnet, each spin feels H_{eff} = H + λM. Self-consistency gives spontaneous magnetisation below T_{c}. Van der Waals for liquids and Weiss for magnets are mean-field theories.
H: Landau theory
E: F(m) = F_{0} + a(T − T_{c})m^{2} + bm^{4} − hm
- Above T_{c}: minimum at m = 0. Below: two minima ±m_{0} ∝ (T_{c} − T)^{1/2}.
- Predicts mean-field exponents: β = 1/2, γ = 1, δ = 3.
H: Beyond mean field
- In low dimensions fluctuations destroy order: no spontaneous magnetisation in 1D (Ising) at T > 0; Mermin–Wagner theorem in 2D for continuous symmetries.
- Real critical exponents differ from mean field (3D Ising β ≈ 0.326).
- Kosterlitz–Thouless transition in 2D (vortex unbinding, Nobel 2016).
X: In Landau theory, how does magnetisation grow just below T_{c}?
> Minimise: 2a(T − T_{c})m + 4bm^{3} = 0
> m_{0} = √(a(T_{c} − T)/(2b)) ∝ (T_{c} − T)^{1/2}
!: Mean-field theory works better in higher dimensions; above 4 dimensions it gives exact exponents.
Q: What is mean-field theory? | Approximating interactions by an average field produced by all other particles.
Q: What is the Landau free energy? | An expansion of free energy in powers of the order parameter, consistent with symmetry.
M1: Mean-field theory predicts the magnetisation exponent β = : | 1/2 | 1/3 | 1 | 0 | m ∝ (T_{c} − T)^{1/2}.
M2: The 1D Ising model has a phase transition at: | No finite temperature | T = 1 K | Any T | Only in a field | Fluctuations destroy order in 1D.

## Critical phenomena
S: Near a continuous phase transition, physical quantities follow power laws in the distance from the critical point, with exponents that are the same for whole classes of different systems. This universality is one of the deepest results of statistical physics.
H: Critical exponents
E: C ∝ |t|^{−α}; m ∝ (−t)^{β}; χ ∝ |t|^{−γ}; ξ ∝ |t|^{−ν}, t = (T − T_{c})/T_{c}
- Scaling relations link them: α + 2β + γ = 2 (Rushbrooke); dν = 2 − α (hyperscaling).
H: Universality classes
- Determined by dimension, symmetry of the order parameter and range of interactions, not microscopic details.
- 3D Ising class: liquid–gas critical points, uniaxial magnets, binary alloys, binary liquid mixtures.
- 3D XY: superfluid helium's lambda transition. 3D Heisenberg: isotropic magnets.
H: Scale invariance
P: At the critical point the correlation length is infinite: the system looks statistically the same at every scale (fractal clusters). Only the dimension and symmetry survive "zooming out", which is why details don't matter, and why the renormalisation group explains universality.
X: Near water's critical point, why do the liquid and vapour densities converge as (T_{c} − T)^{0.33}?
> It's the 3D Ising exponent β ≈ 0.326, the same as for uniaxial magnets
> Mean-field van der Waals would wrongly give 0.5
!: Universal exponents don't imply identical critical temperatures; T_{c} depends on microscopic details.
Q: What is universality? | Different systems with the same dimension and symmetry share the same critical exponents.
Q: Which universality class contains the liquid–gas critical point? | The 3D Ising class.
M1: At a critical point the correlation length is: | Infinite | Zero | One lattice spacing | Constant | Scale invariance.
M2: Critical exponents depend on: | Dimension and order-parameter symmetry | The material's chemistry | The critical temperature | The sample size | Universality.

## Ising model
S: The Ising model places spins that can point up or down on a lattice, with neighbouring spins preferring to align. It's the simplest model of a phase transition and a workhorse for studying magnets, alloys, neural networks and opinion dynamics.
H: The model
E: H = −JΣ_{⟨ij⟩}s_{i}s_{j} − hΣs_{i}, s_{i} = ±1
- J > 0: ferromagnetic; J < 0: antiferromagnetic.
H: Solutions
- **1D**: solved by Ising (1925) via the transfer matrix; no phase transition at T > 0.
- **2D** (square lattice, h = 0): Onsager's exact solution (1944): T_{c} = 2J/(k_{B} ln(1 + √2)) ≈ 2.27J/k_{B}; exponents β = 1/8, ν = 1, α = 0 (log).
- **3D**: no exact solution; known numerically to high precision (T_{c} ≈ 4.51J/k_{B} for a cubic lattice); exponents also from the conformal bootstrap.
- Mean field predicts T_{c} = zJ/k_{B} (z = number of neighbours), overestimating.
H: Mappings
P: The same model describes binary alloys (A/B atoms), lattice gases (occupied/empty sites, giving liquid–gas transitions), and Hopfield neural networks. Quantum versions underlie quantum annealing and some quantum computing benchmarks.
X: Mean-field vs exact T_{c} for the 2D square lattice.
> Mean field: zJ/k_{B} = 4J/k_{B}
> Exact: 2.27J/k_{B}; fluctuations lower T_{c} substantially
!: The Ising model's simplicity is deceptive: its 3D exact solution remains unknown after a century.
Q: Who solved the 2D Ising model exactly? | Lars Onsager (1944).
Q: Why is there no phase transition in the 1D Ising model at T > 0? | A domain wall costs finite energy but gains entropy ∝ ln N, so thermal fluctuations always destroy long-range order.
M1: The lattice gas model is equivalent to: | The Ising model | The ideal gas | The Einstein solid | The Debye model | Occupied/empty ↔ up/down.
M2: Mean-field theory gives a T_{c} that is: | Too high | Exact | Too low | Zero | It ignores fluctuations.

## Renormalisation group
S: The renormalisation group (RG) studies how a system's description changes as you zoom out, averaging over small-scale details. It explains universality and critical exponents, and the same ideas underpin quantum field theory.
H: The idea
- **Coarse-grain**: replace blocks of spins with single effective spins (Kadanoff block spins).
- **Rescale** lengths so the lattice looks the same.
- The couplings change: K → K′ = R(K). Repeat.
- **Fixed points** of R are scale-invariant: they correspond to critical points.
H: Fixed points and flows
- Near a fixed point, perturbations are relevant (grow, e.g. temperature), irrelevant (shrink, e.g. microscopic details) or marginal.
- Irrelevant variables explain universality: different microscopic systems flow to the same fixed point.
- Critical exponents come from eigenvalues of the linearised RG map at the fixed point.
H: In quantum field theory
P: Coupling "constants" change with the energy scale: the electromagnetic coupling grows at high energy (α ≈ 1/128 at the Z mass); the strong coupling falls (asymptotic freedom, Nobel 2004). Wilson's RG (Nobel 1982) unified the two fields' understanding of scale.
X: 1D Ising RG (decimation): summing out every other spin gives tanh K′ = tanh^{2}K.
> For finite K, tanh K < 1, so K′ < K: the coupling shrinks on zooming out
> Flows to K = 0 (disorder): no transition at finite T, as expected
!: RG doesn't directly give T_{c} accurately; its strength is exponents and universality.
Q: What is a fixed point in RG? | A set of couplings unchanged by coarse-graining: a scale-invariant state, like a critical point.
Q: How does the RG explain universality? | Microscopic differences are irrelevant perturbations that shrink under coarse-graining, so different systems flow to the same fixed point.
M1: Asymptotic freedom means the strong coupling: | Weakens at high energy | Strengthens at high energy | Is constant | Vanishes at low energy | QCD's running coupling.
M2: An irrelevant perturbation under RG: | Shrinks as you zoom out | Grows | Stays constant | Creates a phase transition | It doesn't affect critical behaviour.

## Statistical field theory
S: Statistical field theory describes systems near critical points by continuous fields instead of individual particles. Its mathematics is the same as quantum field theory in imaginary time, so ideas flow between condensed matter and particle physics.
H: Landau–Ginzburg–Wilson theory
E: Z = ∫Dφ e^{−F[φ]/k_{B}T}, F[φ] = ∫d^{d}x[½(∇φ)^{2} + ½rφ^{2} + (u/4!)φ^{4} − hφ]
- Gradient term penalises spatial variation; r ∝ T − T_{c}.
- Gaussian (u = 0) gives mean-field-like behaviour; φ^{4} interactions matter below 4 dimensions.
- ε-expansion (d = 4 − ε) gives critical exponents as series (Wilson–Fisher fixed point).
H: Field theory link
P: Rotating real time to imaginary time (t → −iτ) turns the quantum path integral e^{iS/ħ} into a Boltzmann weight e^{−S_{E}/ħ}. A d-dimensional quantum system at zero temperature maps onto a (d + 1)-dimensional classical statistical system. Lattice QCD uses this to compute hadron masses with Monte Carlo.
H: Conformal field theory
- At critical points, scale invariance often extends to conformal invariance.
- In 2D, CFT gives exact exponents (Ising: c = 1/2). In 3D, the conformal bootstrap pins down Ising exponents to many decimals.
X: Why is d = 4 the upper critical dimension for φ^{4} theory?
> Dimensional analysis: u has dimension (length)^{d−4}
> For d > 4, u is irrelevant at long distances: mean-field exponents are exact
!: Continuous field descriptions apply only on scales much larger than the lattice spacing; they describe universal, not microscopic, behaviour.
Q: What connects statistical field theory to quantum field theory? | Wick rotation to imaginary time maps quantum amplitudes to Boltzmann weights.
Q: What is the upper critical dimension for the Ising universality class? | Four.
M1: Lattice QCD calculations use: | Monte Carlo on a Euclidean (imaginary-time) lattice | Perturbation theory only | Experiment only | Classical mechanics | Statistical-mechanics methods.
M2: The φ^{4} term represents: | Interactions between field fluctuations | Kinetic energy | External field | Temperature | Non-Gaussian coupling.

## Monte Carlo methods
S: Monte Carlo methods use random sampling to estimate averages in systems with too many states to enumerate. The Metropolis algorithm samples states with Boltzmann probabilities, making it the standard tool for simulating thermal systems.
H: Metropolis algorithm
- Start from any configuration.
- Propose a random change (flip a spin, move a particle).
- Compute ΔE; accept if ΔE ≤ 0, else accept with probability e^{−ΔE/k_{B}T}.
- Repeat; after equilibration, measure averages over the sampled configurations.
- It satisfies detailed balance, so it converges to the Boltzmann distribution.
H: Practicalities
- Statistical error ∝ 1/√(number of independent samples).
- Successive samples are correlated; near critical points correlation times blow up (critical slowing down). Cluster algorithms (Swendsen–Wang, Wolff) flip whole clusters to beat it.
- Finite-size scaling extracts critical exponents from simulations of different sizes.
H: Beyond statistical physics
P: Monte Carlo integrates in many dimensions (error independent of dimension), designs radiotherapy doses, prices financial options, and underpins Bayesian inference (Markov chain Monte Carlo). It originated at Los Alamos in the 1940s (Ulam, von Neumann, Metropolis).
X: A proposed spin flip raises energy by 2J at k_{B}T = J. Acceptance probability?
> e^{−2} = 0.135
!: A Monte Carlo run that hasn't equilibrated, or whose samples are strongly correlated, gives misleadingly small error bars.
Q: What is the Metropolis acceptance rule? | Accept downhill moves; accept uphill moves with probability e^{−ΔE/k_{B}T}.
Q: What is critical slowing down? | The divergence of correlation times near critical points, making local Monte Carlo updates inefficient.
M1: Metropolis Monte Carlo samples states according to: | The Boltzmann distribution | A uniform distribution | Energy order | Time evolution | By detailed balance.
M2: Monte Carlo integration error scales with sample number N as: | 1/√N | 1/N | 1/N^{2} | Independent of N | Central limit theorem.

## Nonequilibrium statistical mechanics
S: Nonequilibrium statistical mechanics describes systems driven away from equilibrium: how they relax, transport heat and particles, and fluctuate. It connects microscopic dynamics to transport laws and the arrow of time.
H: Kinetic theory
E: ∂f/∂t + v·∇_{r}f + (F/m)·∇_{v}f = (∂f/∂t)_{coll} :: Boltzmann equation
- Boltzmann's H-theorem: H = ∫f ln f decreases, giving entropy increase (with the molecular chaos assumption).
- Gives transport coefficients (viscosity, conductivity) from collisions.
H: Stochastic descriptions
- **Langevin equation**: m dv/dt = −γv + ξ(t) (friction plus random force): Brownian motion.
- **Fokker–Planck equation**: evolution of the probability distribution.
- **Master equations**: transition rates between discrete states (chemical kinetics, gene expression).
H: Linear response and beyond
- Green–Kubo relations: transport coefficients from integrals of equilibrium correlation functions.
- Fluctuation theorems: P(ΔS)/P(−ΔS) = e^{ΔS/k_{B}}: exact for small systems far from equilibrium.
- Active matter (bacteria, bird flocks) breaks detailed balance and shows new collective behaviour.
X: Mean square displacement of a Brownian particle (D = 2 × 10^{-13} m^{2} s^{-1}) in 10 s (3D)?
> ⟨r^{2}⟩ = 6Dt = 1.2 × 10^{-11} m^{2}
> rms ≈ 3.5 μm
!: The H-theorem's irreversibility comes from the molecular chaos assumption, not from the reversible microscopic laws themselves (Loschmidt's paradox).
Q: What is the Langevin equation? | An equation of motion with a friction force plus a random fluctuating force, describing Brownian motion.
Q: What do Green–Kubo relations give? | Transport coefficients from time integrals of equilibrium correlation functions.
M1: Boltzmann's H-theorem shows: | Entropy increases in a dilute gas | Energy decreases | Momentum is not conserved | Temperature is constant | With molecular chaos.
M2: Mean square displacement in diffusion grows: | Linearly with time | Quadratically | Exponentially | Not at all | ⟨x^{2}⟩ = 2Dt.
`;
