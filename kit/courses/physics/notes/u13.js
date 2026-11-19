// Unit 13: Statistical Mechanics. Format: kit/course/notes.js
export default `
## Microstates and macrostates
S: A microstate specifies the exact state of every particle; a macrostate specifies only bulk properties like energy, volume and particle number. Statistical mechanics explains thermodynamics by counting how many microstates belong to each macrostate.
LV: Intermediate · Foundation
O: Distinguish microstates from macrostates and count microstates for simple systems
O: Explain why the most probable macrostate dominates for large systems
PRE: Entropy
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
T: Macrostate | A state described by bulk variables such as E, V and N
T: Multiplicity | Ω, the number of microstates belonging to a macrostate
T: Fundamental postulate | In an isolated system in equilibrium, every accessible microstate is equally likely
SUM: Probability of a macrostate ∝ its multiplicity.
SUM: For N ~ 10^{23}, the multiplicity peak is so sharp that the most probable macrostate is effectively certain.
SRC: Schroeder D. V., An Introduction to Thermal Physics, chapter 2, Addison-Wesley | secondary | 2000
SRC: Kittel C., Kroemer H., Thermal Physics, 2nd edition, chapter 1, W. H. Freeman | secondary | 1980
EV: established | The equal a priori probability postulate is the foundation of statistical mechanics and agrees with experiment.
Q: How many microstates do 4 coins have with exactly 2 heads? | 6 (= 4!/(2!2!)).
M3@2,3: 100 coins are tossed. Roughly how much more likely is 50 heads than 40 heads? | About 7 times | About 1.25 times | About 100 times | Exactly equally likely | C(100,50)/C(100,40) ≈ 1.01 × 10^{29}/1.37 × 10^{28} ≈ 7.4.
SA2@1,2: Explain why the air in a room never spontaneously gathers in one half. | Each molecule is equally likely to be in either half, so the macrostate "all in one half" has a single arrangement out of 2^{N} with N ~ 10^{27}. Its probability, 2^{−N}, is unimaginably small; the overwhelming majority of microstates have the gas spread almost evenly, so that's what we always see. | each molecule equally likely in either half ; one-half macrostate has tiny multiplicity ; probability 2^{−N} ; even spread dominates

## Statistical ensembles
S: An ensemble is an imagined collection of many copies of a system, each in a different microstate consistent with the macroscopic constraints. Averages over the ensemble give thermodynamic quantities.
LV: Advanced · Foundation
O: Define an ensemble and explain why ensemble averages replace time averages
O: State when different ensembles give the same thermodynamics
PRE: Microstates and macrostates
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
T: Ensemble | An imagined set of copies of a system, each in a microstate consistent with the given constraints
T: Ergodic hypothesis | The assumption that time averages equal ensemble averages
SUM: An ensemble assigns a probability to each microstate; averages over it give thermodynamic quantities.
SUM: For large systems all ensembles agree, because relative fluctuations scale as 1/√N.
SRC: Pathria R. K., Beale P. D., Statistical Mechanics, 3rd edition, chapter 2, Academic Press | secondary | 2011
SRC: Gibbs J. W., Elementary Principles in Statistical Mechanics, Yale University Press | primary | 1902
EV: established | Ensemble methods are foundational; ergodicity is proven only for special systems, but works in practice.
Q: Why can we use ensemble averages instead of following a system in time? | The ergodic hypothesis: over long times a system samples its accessible states in proportion to their ensemble probabilities.
M3@2,3: A gas of 10^{20} molecules has its energy fixed in one experiment and its temperature fixed in another. Do the thermodynamic results differ? | No: energy fluctuations at fixed T are about 10^{−10} of the mean, so both ensembles agree | Yes: fixed-T results are always about half as large | Yes: fixed-energy results don't define a temperature | Only the fixed-T results can be trusted | Relative fluctuations ~1/√N ≈ 10^{−10}; ensemble equivalence holds for macroscopic systems.
SA2@1,2: Explain why the choice of ensemble matters for very small systems such as a protein. | With only thousands of atoms, fluctuations of energy or particle number are not negligible compared with the mean. Fixing the energy (microcanonical) or the temperature (canonical) then gives measurably different averages and distributions, so the ensemble must match how the system is actually held. | small systems have large fluctuations ; ensembles differ ; averages and distributions change ; choose ensemble matching the conditions

## Microcanonical, canonical and grand canonical ensembles
S: The three main ensembles each have their own probability rule and their own link to thermodynamics. Knowing which to use, and how to get thermodynamic quantities from each, is the core technique of statistical mechanics.
LV: Advanced · Foundation
O: State what each ensemble holds fixed and its probability rule
O: Link each to its thermodynamic potential
PRE: Statistical ensembles
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
T: Microcanonical ensemble | Fixed N, V, E; all microstates equally likely; S = k_{B} ln Ω
T: Canonical ensemble | Fixed N, V, T; p_{i} ∝ e^{−E_{i}/k_{B}T}; F = −k_{B}T ln Z
T: Grand canonical ensemble | Fixed μ, V, T; p_{i} ∝ e^{−(E_{i} − μN_{i})/k_{B}T}; Φ = −k_{B}T ln 𝒵
SUM: Isolated → microcanonical; in a heat bath → canonical; exchanging particles too → grand canonical.
SUM: Quantum gases are easiest in the grand canonical ensemble.
SRC: Pathria R. K., Beale P. D., Statistical Mechanics, 3rd edition, chapters 2–4, Academic Press | secondary | 2011
SRC: Blundell S. J., Blundell K. M., Concepts in Thermal Physics, 2nd edition, chapters 4 and 22, Oxford University Press | secondary | 2010
EV: established | Standard statistical mechanics.
Q: Which ensemble describes a gas in a sealed flask in a water bath? | The canonical ensemble (fixed N, V, T).
M3@2,3: Which ensemble best describes electrons in a metal connected to a battery terminal at fixed temperature? | Grand canonical: electrons can flow in and out at fixed μ and T | Microcanonical: the metal's energy is fixed | Canonical: the electron number is fixed | None: electrons aren't described by ensembles | Exchange with a reservoir fixes the chemical potential (the electrochemical level), not N.
SA2@2: Show that in the canonical ensemble the mean energy is ⟨E⟩ = −∂ ln Z/∂β, with β = 1/k_{B}T. | Z = Σe^{−βE_{i}}, so ∂Z/∂β = −ΣE_{i}e^{−βE_{i}}. Then −∂ ln Z/∂β = −(1/Z)∂Z/∂β = ΣE_{i}e^{−βE_{i}}/Z = Σp_{i}E_{i} = ⟨E⟩. | define Z ; differentiate with respect to β ; divide by Z ; equals Σp_{i}E_{i}

## Boltzmann distribution
S: In thermal equilibrium at temperature T, the probability of finding a system in a state of energy E is proportional to e^{−E/k_{B}T}. Higher energy states are exponentially less populated, unless k_{B}T is comparable to the energy gap.
LV: Intermediate · Application
O: Use p ∝ e^{−E/k_{B}T} to compare populations of energy levels
O: Explain how the Boltzmann factor controls reaction rates and atmospheric density
PRE: Microcanonical, canonical and grand canonical ensembles
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
T: Boltzmann factor | e^{−E/k_{B}T}, the relative probability of a state of energy E
T: Degeneracy | g, the number of states sharing the same energy
T: Thermal energy scale | k_{B}T ≈ 25 meV (1/40 eV) at room temperature
SUM: N_{2}/N_{1} = (g_{2}/g_{1})e^{−ΔE/k_{B}T}.
SUM: Arrhenius rates and the barometric formula are Boltzmann factors in disguise.
SRC: Schroeder D. V., An Introduction to Thermal Physics, chapter 6, Addison-Wesley | secondary | 2000
SRC: OpenStax, University Physics Volume 2, section 2.4 "Distribution of Molecular Speeds" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/2-4-distribution-of-molecular-speeds
EV: established | Exact for systems in thermal equilibrium with a reservoir.
Q: What is k_{B}T at room temperature, in eV? | About 0.025 eV (1/40 eV).
M3@2,3: Two levels differ by 0.10 eV. What is the ratio of upper to lower populations at 300 K (k_{B}T = 0.0259 eV)? | About 0.021 | About 0.26 | About 0.79 | About 2.1 × 10^{−4} | e^{−0.10/0.0259} = e^{−3.86} ≈ 0.021.
SA2@1,2: Explain why many chemical reactions roughly double in rate for a 10 °C rise near room temperature. | Reactions need molecules with at least the activation energy E_{a}, a fraction ∝ e^{−E_{a}/k_{B}T}. For typical E_{a} ≈ 0.5 eV (50 kJ mol^{-1}), raising T from 298 to 308 K raises the factor by e^{(E_{a}/k_{B})(1/298 − 1/308)} ≈ 1.9: the high-energy tail grows sharply. | rate ∝ Boltzmann factor of E_{a} ; typical E_{a} ~ 0.5 eV ; ratio for 10 K rise ; about a factor of two

## Maxwell–Boltzmann distribution
S: The Maxwell–Boltzmann distribution gives the spread of molecular speeds in a gas at temperature T. Most molecules move near a typical speed, but a long tail of fast molecules drives evaporation, chemical reactions and atmospheric escape.
LV: Intermediate · Application
O: Describe the shape of the Maxwell–Boltzmann speed distribution and how it changes with T and m
O: Calculate the most probable, mean and rms speeds
PRE: Boltzmann distribution
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
P: **Investigate with the lab.** Start every particle at the same speed and watch the speeds spread into the Maxwell–Boltzmann curve.
IX: gas
Q: What is the rms speed of gas molecules? | v_{rms} = √(3k_{B}T/m).
Q: Why does the distribution start at zero for v = 0? | The number of velocity states grows as v^{2} (shells in velocity space).
M1: Doubling the absolute temperature multiplies v_{rms} by: | √2 | 2 | 4 | 1/√2 | ∝ √T.
M2: Which is largest? | v_{rms} | v_{p} | ⟨v⟩ | All equal | 1.22 vs 1 and 1.13.
M2: What does the Maxwell–Boltzmann distribution describe? | The spread of molecular speeds in a gas at one temperature | The pressure of a gas at different volumes | The speed of sound in a gas | The number of molecules in a mole | Collisions spread molecular speeds into a characteristic distribution.
T: Speed distribution | f(v) dv, the fraction of molecules with speeds between v and v + dv
T: rms speed | √⟨v^{2}⟩ = √(3k_{B}T/m)
SUM: v_{p} = √(2k_{B}T/m) < ⟨v⟩ = √(8k_{B}T/πm) < v_{rms} = √(3k_{B}T/m).
SUM: Heavier molecules and lower temperatures give slower, narrower distributions.
SRC: Maxwell J. C., "Illustrations of the dynamical theory of gases", Philosophical Magazine 19, 19–32 | primary | 1860
SRC: OpenStax, University Physics Volume 2, section 2.4 "Distribution of Molecular Speeds" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/2-4-distribution-of-molecular-speeds
EV: established | Confirmed by molecular-beam experiments.
Q: Why is the speed distribution zero at v = 0? | The number of velocity states in a shell of speed v grows as 4πv^{2}, which is zero at v = 0.
SA2@2: Explain why hydrogen escapes from Earth's atmosphere but nitrogen doesn't. | At a given temperature v_{rms} ∝ 1/√m, so H_{2} molecules move about √14 ≈ 3.7 times faster than N_{2}. A small fraction in the high-speed tail of the distribution exceeds escape velocity (11.2 km s^{-1}) at the top of the atmosphere; for H_{2} that fraction is far larger, so over geological time it leaks away. | v_{rms} ∝ 1/√m ; hydrogen much faster ; tail exceeds escape speed ; leaks over long times
M3@2,3: Nitrogen (M = 0.028 kg mol^{−1}) is at 300 K. What is its rms speed (R = 8.31 J mol^{−1} K^{−1})? | About 520 m s^{−1} | About 340 m s^{−1}, the speed of sound | About 160 m s^{−1}, from √(RT/M)/2 | About 1600 m s^{−1}, from 3RT/M | v_{rms} = √(3RT/M) = √(3 × 8.31 × 300/0.028) ≈ 517 m s^{−1}.

## Partition functions
S: The partition function Z is a weighted sum over all states. Once you have it, every thermodynamic quantity follows by differentiation: it encodes everything about a system in equilibrium.
LV: Advanced · Application
O: Calculate the partition function of simple systems
O: Derive mean energy, entropy and heat capacity from Z
PRE: Boltzmann distribution
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
T: Partition function | Z = Σg_{i}e^{−E_{i}/k_{B}T}, the normalising sum over states
T: Two-level system | A system with just two energy states, giving a Schottky heat-capacity peak
SUM: F = −k_{B}T ln Z; ⟨E⟩ = −∂ ln Z/∂β; S = (⟨E⟩ − F)/T; C = d⟨E⟩/dT.
SUM: Independent subsystems multiply partition functions: Z = Z_{1}Z_{2}.
SRC: Blundell S. J., Blundell K. M., Concepts in Thermal Physics, 2nd edition, chapter 20, Oxford University Press | secondary | 2010
SRC: Schroeder D. V., An Introduction to Thermal Physics, chapter 6, Addison-Wesley | secondary | 2000
EV: established | Exact results of statistical mechanics.
Q: What is the partition function of a two-level system with energies 0 and ε? | Z = 1 + e^{−ε/k_{B}T}.
M3@2,3: A system has a non-degenerate ground state at 0 and a doubly degenerate level at ε. At k_{B}T = ε, what fraction is in the excited level? | About 0.42 | About 0.27 | About 0.50 | About 0.67 | Z = 1 + 2e^{−1} ≈ 1.736; p = 2e^{−1}/Z ≈ 0.736/1.736 ≈ 0.42.
SA2@1,2: Explain why the partition function is called the "key" to a system's thermodynamics. | Every thermodynamic quantity follows from Z by differentiation: F = −k_{B}T ln Z, then entropy, pressure, energy and heat capacity as derivatives of ln Z with respect to T, V or β. So once the energy levels are known and Z computed, everything else follows without further physics. | F = −k_{B}T ln Z ; other quantities as derivatives ; only needs energy levels ; no further assumptions

## Entropy and probability
S: Entropy measures how probable a macrostate is: the logarithm of its number of microstates. The second law is then simply the statement that systems move to more probable states.
LV: Intermediate · Foundation
O: Use S = k_{B} ln Ω and the Gibbs formula S = −k_{B}Σp_{i} ln p_{i}
O: Interpret the second law as a statement about probability
PRE: Microstates and macrostates
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
T: Boltzmann entropy | S = k_{B} ln Ω
T: Gibbs entropy | S = −k_{B}Σp_{i} ln p_{i}, which reduces to k_{B} ln Ω for equal probabilities
SUM: Entropy rises because systems move to macrostates with more microstates, which are overwhelmingly more probable.
SUM: Gibbs entropy has the same form as Shannon's information entropy (with k_{B} and ln).
SRC: Boltzmann L., "Über die Beziehung zwischen dem zweiten Hauptsatze der mechanischen Wärmetheorie und der Wahrscheinlichkeitsrechnung", Wiener Berichte 76, 373–435 | primary | 1877
SRC: Schroeder D. V., An Introduction to Thermal Physics, chapters 2–3, Addison-Wesley | secondary | 2000
EV: established | Foundational; the link to information theory is well established.
Q: What happens to S = k_{B} ln Ω when two independent systems are combined? | Their multiplicities multiply, so their entropies add.
M3@2,3: A system's multiplicity rises by a factor of e^{10^{20}}. By how much does its entropy rise? | 10^{20}k_{B}, about 1.4 × 10^{−3} J K^{−1} | e^{10^{20}}k_{B}, an enormous value | 10^{20} J K^{−1} | 20k_{B}, about 2.8 × 10^{−22} J K^{−1} | ΔS = k_{B} ln(e^{10^{20}}) = 10^{20} × 1.38 × 10^{−23} ≈ 1.4 × 10^{−3} J K^{−1}: everyday entropy changes correspond to astronomically large multiplicity ratios.
SA2@2: Explain how the second law can be "statistical" yet never seen to fail in everyday life. | Entropy decreases are not impossible, only improbable: the probability ratio is e^{ΔS/k_{B}}. For macroscopic systems even a tiny ΔS of 10^{−10} J K^{−1} means a ratio of e^{10^{13}}, so a violation would never be seen in the age of the universe. In microscopic systems, brief decreases do occur (fluctuation theorems). | second law is statistical ; probability ratio e^{ΔS/k_{B}} ; huge for macroscopic ΔS ; small systems show fluctuations

## Multiplicity and state counting
S: Multiplicity is the number of microstates in a macrostate. Counting states, with combinatorics or phase-space volumes, is how statistical mechanics turns microscopic models into entropy and temperature.
LV: Intermediate · Application
O: Count microstates with combinatorics, including the Einstein solid
O: Use Stirling's approximation for large numbers
PRE: Entropy and probability
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
T: Einstein solid | N oscillators sharing q quanta; Ω = (q + N − 1)!/(q!(N − 1)!)
T: Stirling's approximation | ln N! ≈ N ln N − N for large N
SUM: Combinatorics counts discrete states; phase-space volume / h^{3N} counts classical ones.
SUM: Two systems exchanging energy settle where the total multiplicity is greatest: equal temperatures.
SRC: Schroeder D. V., An Introduction to Thermal Physics, chapters 2–3, Addison-Wesley | secondary | 2000
SRC: Kittel C., Kroemer H., Thermal Physics, 2nd edition, chapter 2, W. H. Freeman | secondary | 1980
EV: established | Exact combinatorics; Stirling's formula is accurate to better than 1% for N > 100.
Q: What does Stirling's approximation give for ln(100!)? | About 100 ln 100 − 100 ≈ 360.5 (exact 363.7).
M3@2,3: An Einstein solid has 3 oscillators sharing 3 quanta. How many microstates are there? | 10 | 6 | 27 | 3 | Ω = (3 + 3 − 1)!/(3! × 2!) = 120/12 = 10.
SA2@1,2: Explain how maximising total multiplicity leads to equal temperatures for two systems in thermal contact. | With total energy fixed, Ω_{tot} = Ω_{A}(E_{A})Ω_{B}(E − E_{A}). The most probable split maximises ln Ω_{tot}: ∂ ln Ω_{A}/∂E_{A} = ∂ ln Ω_{B}/∂E_{B}. Since 1/T = ∂S/∂E = k_{B}∂ ln Ω/∂E, this means T_{A} = T_{B}. | total multiplicity is a product ; maximise with total energy fixed ; equal derivatives of ln Ω ; 1/T = ∂S/∂E gives equal T

## Equipartition theorem
S: In classical thermal equilibrium, every quadratic term in a system's energy has an average value of ½k_{B}T. This quickly gives heat capacities of gases and solids, and its failures revealed the need for quantum theory.
LV: Intermediate · Application
O: Apply equipartition to find heat capacities of gases and solids
O: Explain why equipartition fails when quantum levels are widely spaced
PRE: Boltzmann distribution
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
P: **Investigate with the lab.** Double the temperature and see the mean kinetic energy of the molecules double too.
IX: gas
Q: State the equipartition theorem. | Each quadratic degree of freedom has average energy ½k_{B}T in classical equilibrium.
Q: Why don't diatomic molecules' vibrations contribute to C_{V} at room temperature? | The vibrational quantum ħω is much larger than k_{B}T, so the mode is frozen out.
M1: C_{V} of a monatomic ideal gas per mole: | (3/2)R | (5/2)R | 3R | R | Three translational terms.
M2: The ultraviolet catastrophe came from applying equipartition to: | Cavity radiation modes | Gas molecules | Solids | Electrons in metals | Infinitely many modes each with k_{B}T.
M2: How is the mean kinetic energy of ideal gas molecules related to temperature? | It is proportional to the absolute temperature | It is proportional to the square of temperature | It is independent of temperature | It is proportional to the temperature in °C | Mean translational kinetic energy = (3/2)kT.
T: Equipartition theorem | Each quadratic term in the energy has mean ½k_{B}T in classical equilibrium
T: Degree of freedom | An independent quadratic term in the energy (translation, rotation, vibration)
T: Freezing out | A degree of freedom ceasing to contribute when k_{B}T is much less than its level spacing
SUM: Monatomic gas C_{V} = 3R/2; diatomic at room temperature 5R/2; solids 3R (Dulong–Petit).
SUM: Vibrations of light molecules are frozen out at room temperature; equipartition fails at low T.
SRC: Blundell S. J., Blundell K. M., Concepts in Thermal Physics, 2nd edition, chapter 19, Oxford University Press | secondary | 2010
SRC: Schroeder D. V., An Introduction to Thermal Physics, chapter 1, Addison-Wesley | secondary | 2000
EV: established | Classical result; quantum mechanics explains its failures.
Q: What is the mean kinetic energy of a gas molecule at 300 K? | (3/2)k_{B}T ≈ 6.2 × 10^{−21} J.
SA2@2: Explain why the molar heat capacity of hydrogen gas rises from 3R/2 at 50 K to 5R/2 at room temperature and towards 7R/2 above about 2000 K. | Rotational levels of H_{2} are spaced by roughly k_{B} × 85 K, so rotation is frozen out at 50 K, leaving only translation (3R/2). At room temperature rotation is fully excited (+R). Vibrational quanta correspond to about 6000 K, so vibration (+R) only switches on at high temperature. | translation only at low T ; rotation switches on near 100 K ; vibration needs thousands of kelvin ; quantised levels freeze out
M3@2,3: A solid of N atoms vibrates in 3D. Using equipartition, what is its molar heat capacity at high temperature? | 3R, about 25 J mol^{−1} K^{−1} | 3R/2, about 12 J mol^{−1} K^{−1} | 6R, about 50 J mol^{−1} K^{−1} | R, about 8.3 J mol^{−1} K^{−1} | Each atom has 3 kinetic and 3 potential quadratic terms: 6 × ½k_{B}T = 3k_{B}T per atom, so C = 3R (Dulong–Petit).

## Classical ideal gases
S: An ideal gas is a collection of non-interacting point particles. Statistical mechanics derives its equation of state, its internal energy and its absolute entropy from first principles.
LV: Intermediate · Application
O: Derive pV = Nk_{B}T from the partition function
O: Explain the Gibbs paradox and the 1/N! factor
PRE: Partition functions
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
P: **Investigate with the lab.** Halve the volume at fixed temperature and see the pressure double. Then double the temperature at fixed volume.
IX: gas
Q: What is the Sackur–Tetrode equation? | The absolute entropy of a classical monatomic ideal gas.
Q: What is the criterion for a gas to be treated classically? | nλ^{3} ≪ 1.
M1: The ideal gas internal energy depends on: | Temperature only | Volume only | Pressure only | Both V and T | U = (3/2)Nk_{B}T.
M2: The thermal de Broglie wavelength grows when: | Temperature falls | Temperature rises | Mass increases | Density rises | λ ∝ 1/√(mT).
M2: A gas is compressed to half its volume at constant temperature. What happens to its pressure? | It doubles | It halves | It stays the same | It quadruples | Boyle's law: pV is constant at fixed temperature.
T: Thermal de Broglie wavelength | λ_{th} = h/√(2πmk_{B}T)
T: Sackur–Tetrode equation | The absolute entropy of a monatomic ideal gas
SUM: Z = Z_{1}^{N}/N! with Z_{1} = V/λ_{th}^{3}, giving pV = Nk_{B}T and U = (3/2)Nk_{B}T.
SUM: The 1/N! for identical particles makes entropy extensive and resolves the Gibbs paradox.
SRC: Pathria R. K., Beale P. D., Statistical Mechanics, 3rd edition, chapter 3, Academic Press | secondary | 2011
SRC: Schroeder D. V., An Introduction to Thermal Physics, chapter 6, Addison-Wesley | secondary | 2000
EV: established | Classical ideal gas theory works when nλ_{th}^{3} ≪ 1.
Q: When is a gas "classical"? | When the mean spacing between particles is much larger than λ_{th} (nλ_{th}^{3} ≪ 1).
SA2@1,2: Explain the Gibbs paradox and how the 1/N! resolves it. | Without the 1/N!, the entropy of two identical gas samples increases when the partition between them is removed, though nothing physical changes; entropy also wouldn't be extensive. Identical particles can't be told apart, so swapping them doesn't create a new microstate; dividing by N! removes the overcounting and gives the correct, extensive entropy. | mixing identical gases appears to raise entropy ; entropy not extensive ; identical particles indistinguishable ; 1/N! corrects the count
M3@2,3: Helium at 4.2 K and 1 atm has n ≈ 1.7 × 10^{27} m^{−3} and λ_{th} ≈ 0.43 nm. Is it well described as a classical gas? | Only roughly: nλ_{th}^{3} ≈ 0.14, so quantum corrections are noticeable | Yes: nλ_{th}^{3} is about 10^{−7}, as for air | No: nλ_{th}^{3} ≈ 140, so it is fully degenerate | Yes: helium is always classical because it is inert | (0.43 × 10^{−9})^{3} × 1.7 × 10^{27} ≈ 0.13; not ≪ 1, so quantum statistics already matter near the boiling point of helium.

## Mean free path
S: The mean free path is the average distance a molecule travels between collisions. It controls diffusion, viscosity and thermal conduction in gases, and decides when continuum fluid mechanics breaks down.
LV: Intermediate · Application
O: Calculate the mean free path and collision rate in a gas
O: Relate the mean free path to diffusion, viscosity and thermal conductivity
PRE: Classical ideal gases
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
T: Mean free path | λ = 1/(√2 nσ), the average distance between collisions
T: Collision cross-section | σ = πd^{2} for molecules of diameter d
SUM: At 1 atm and room temperature λ ≈ 70 nm in air; λ ∝ 1/p.
SUM: Kinetic theory gives D, η and κ ∝ λ⟨v⟩, so gas viscosity is independent of pressure (Maxwell's surprising result).
SRC: OpenStax, University Physics Volume 2, section 2.2 "Pressure, Temperature, and RMS Speed" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/2-2-pressure-temperature-and-rms-speed
SRC: Reif F., Fundamentals of Statistical and Thermal Physics, chapter 12, McGraw-Hill | secondary | 1965
EV: established | Simple kinetic theory gives correct scalings; numerical factors need full theory.
Q: Why is gas viscosity nearly independent of pressure? | Higher pressure means more molecules carrying momentum but a proportionally shorter mean free path; the effects cancel.
M3@2,3: The mean free path in air is 70 nm at 1 atm. What is it at the 0.010 atm of a rough-vacuum chamber? | 7.0 μm | 0.70 nm | 70 nm | 7.0 mm | λ ∝ 1/n ∝ 1/p, so 100 times lower pressure gives 100 times longer λ.
SA2@2: Explain why a smell spreads across a room in minutes, although molecules move at hundreds of metres per second. | Each molecule collides about 10^{9} times a second, after only about 70 nm, so it does a random walk. Distance grows only as √(Dt) with D ~ λ⟨v⟩/3 ≈ 10^{−5} m^{2} s^{−1}, giving about a centimetre in 10 s; in practice air currents (convection) spread smells much faster than diffusion alone. | frequent collisions ; random walk ; distance ∝ √t ; convection does most of the spreading

## Molecular speed distributions
S: Molecular speeds in a gas follow the Maxwell–Boltzmann distribution, but what a measurement sees depends on how it samples them: molecules effusing through a hole, hitting a wall, or colliding are weighted towards faster ones.
LV: Intermediate · Application
O: Distinguish the speed distribution in a gas from that of a molecular beam or effusing flux
O: Explain how speed distributions are measured
PRE: Maxwell–Boltzmann distribution
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
P: **Investigate with the lab.** Heat the gas and see the peak of the speed distribution move right and flatten.
IX: gas
Q: What is the molecular flux on a wall? | Φ = ¼n⟨v⟩.
Q: Why are escaping molecules on average more energetic than those in the gas? | Faster molecules reach the hole more often (flux weighting).
M1: Graham's law says effusion rate is proportional to: | 1/√m | m | √m | 1/m | Lighter effuse faster.
M2: Doppler broadening of a spectral line increases with: | Temperature | Mass | Density only | Magnetic field | Width ∝ √(T/m).
M2: As a gas is heated, what happens to the peak of its speed distribution? | It moves to higher speed and gets lower | It moves to lower speed and gets higher | It stays in the same place | It splits into two peaks | Higher temperature means faster molecules spread over a wider range of speeds.
T: Effusion | Escape of gas through a hole smaller than the mean free path
T: Flux-weighted distribution | The distribution of molecules crossing a surface, weighted by v: ∝ v^{3}e^{−mv^{2}/2k_{B}T}
SUM: Faster molecules hit a hole more often, so an effusing beam is faster on average than the gas.
SUM: Rotating-slit velocity selectors (Miller and Kusch, 1955) confirmed the Maxwell–Boltzmann distribution.
SRC: Miller R. C., Kusch P., "Velocity distributions in potassium and thallium atomic beams", Physical Review 99, 1314–1321 | primary | 1955 | https://doi.org/10.1103/PhysRev.99.1314
SRC: Reif F., Fundamentals of Statistical and Thermal Physics, chapter 7, McGraw-Hill | secondary | 1965
EV: established | Experimentally confirmed to high precision.
Q: Why does a leaky balloon lose helium faster than air? | Effusion rate ∝ ⟨v⟩ ∝ 1/√m: lighter helium escapes faster (Graham's law).
M3@2,3: Uranium hexafluoride containing ^{235}U and ^{238}U is enriched by effusion. What is the speed ratio of the two molecules (M ≈ 349 and 352 g mol^{−1})? | About 1.0043 | About 1.013 | About 1.43 | Exactly 1 | √(352/349) ≈ 1.0043, so thousands of stages are needed.
SA2@1,2: Explain how a rotating-slit velocity selector measures a speed distribution. | Two discs with slits offset by an angle rotate on a common axle. Only molecules whose time of flight between the discs equals the time for the discs to turn by the offset angle pass through both slits. Varying the rotation rate selects different speeds, and counting the transmitted molecules maps out the distribution. | two rotating slotted discs ; offset angle sets transit time ; selects one speed ; scan rotation rate and count

## Chemical potential
S: The chemical potential is the energy cost of adding one particle to a system. Particles flow from high to low chemical potential, so it governs diffusion, phase equilibrium, chemical reactions and the occupation of quantum states.
LV: Advanced · Foundation
O: Define the chemical potential and explain why particles flow from high to low μ
O: Calculate μ for a classical ideal gas
PRE: Partition functions
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
T: Chemical potential | μ = (∂F/∂N)_{T,V} = (∂G/∂N)_{T,p}, the free-energy cost of adding a particle
T: Diffusive equilibrium | Equal chemical potentials, so no net particle flow
SUM: Particles move from high μ to low μ, as heat moves from high T to low T.
SUM: Ideal gas: μ = k_{B}T ln(nλ_{th}^{3}), negative for a classical gas.
SRC: Kittel C., Kroemer H., Thermal Physics, 2nd edition, chapter 5, W. H. Freeman | secondary | 1980
SRC: Baierlein R., "The elusive chemical potential", American Journal of Physics 69, 423–434 | secondary | 2001 | https://doi.org/10.1119/1.1336839
EV: established | Standard statistical thermodynamics.
Q: Why is μ negative for a classical ideal gas? | nλ_{th}^{3} ≪ 1, so its logarithm is negative: adding a particle raises entropy more than energy.
M3@2,3: Gas at the same temperature is at higher concentration in box A than box B. When they are connected, which way do particles flow, and why? | From A to B, because μ = k_{B}T ln(nλ_{th}^{3}) is higher in A | From B to A, because B has more empty space to fill | Neither way, because the temperatures are equal | Both ways equally, so nothing changes | Higher density gives higher μ; particles flow down the μ gradient until densities match.
SA2@2: Explain the role of chemical potential in a battery. | A battery's electrodes are chemically different, so the electrons (or ions) in them have different electrochemical potentials. Connected by a wire, electrons flow from the higher to the lower potential, doing work; the potential difference per charge is the cell's EMF, eE = −Δμ. | electrodes have different electrochemical potentials ; electrons flow from high to low ; flow does work ; EMF set by Δμ

## Fermi–Dirac statistics
S: Fermions (electrons, protons, neutrons, ^{3}He) obey the Pauli exclusion principle: no two can share a quantum state. Their average occupation follows the Fermi–Dirac distribution, which explains metals, semiconductors, white dwarfs and neutron stars.
LV: Advanced · Application
O: Use the Fermi–Dirac distribution and explain its shape at low temperature
O: Calculate the Fermi energy of a metal
PRE: Chemical potential
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
T: Fermi–Dirac distribution | ⟨n⟩ = 1/(e^{(E − μ)/k_{B}T} + 1)
T: Fermi energy | E_{F}, the highest filled energy at T = 0: (ħ^{2}/2m)(3π^{2}n)^{2/3}
T: Fermi temperature | T_{F} = E_{F}/k_{B}, about 10^{4}–10^{5} K for metals
SUM: At T = 0 all states below E_{F} are full; at T > 0 only electrons within about k_{B}T of E_{F} can change state.
SUM: That's why the electronic heat capacity of metals is tiny: C ∝ T/T_{F}.
SRC: Kittel C., Introduction to Solid State Physics, 8th edition, chapter 6, Wiley | secondary | 2005
SRC: Ashcroft N. W., Mermin N. D., Solid State Physics, chapter 2, Holt, Rinehart and Winston | secondary | 1976
EV: established | Foundational; confirmed by heat-capacity and photoemission measurements.
Q: What is the occupancy of a state exactly at the chemical potential? | One half.
M3@2,3: Copper has 8.5 × 10^{28} free electrons per m^{3}. What is its Fermi energy? | About 7 eV | About 0.025 eV | About 70 eV | About 0.7 eV | E_{F} = (ħ^{2}/2m)(3π^{2}n)^{2/3} ≈ 1.13 × 10^{−18} J ≈ 7.0 eV, far above k_{B}T at room temperature.
SA2@1,2: Explain why only a small fraction of a metal's electrons contribute to its heat capacity. | Electrons fill states up to E_{F} (about 7 eV), far above k_{B}T (0.025 eV). An electron deep in the distribution can't take a small amount of thermal energy, because the states just above it are full (Pauli exclusion). Only those within about k_{B}T of E_{F}, a fraction T/T_{F} ~ 1%, can be excited. | E_{F} ≫ k_{B}T ; Pauli exclusion blocks deep electrons ; only those near E_{F} excited ; fraction about T/T_{F}

## Bose–Einstein statistics
S: Bosons (photons, phonons, ^{4}He atoms, many other atoms) can pile into the same quantum state. Their occupation follows the Bose–Einstein distribution, which enhances crowding and leads to lasers, superfluidity and Bose–Einstein condensation.
LV: Advanced · Application
O: Use the Bose–Einstein distribution and explain bunching of bosons
O: Explain Bose–Einstein condensation
PRE: Chemical potential
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
T: Bose–Einstein distribution | ⟨n⟩ = 1/(e^{(E − μ)/k_{B}T} − 1)
T: Bose–Einstein condensate | A state in which a large fraction of bosons occupy the lowest quantum state
SUM: For bosons μ must stay below the lowest energy; below T_{c} the extra particles pile into the ground state.
SUM: First made with rubidium atoms at about 170 nK in 1995 (Cornell and Wieman).
SRC: Anderson M. H., Ensher J. R., Matthews M. R., Wieman C. E., Cornell E. A., "Observation of Bose–Einstein condensation in a dilute atomic vapor", Science 269, 198–201 | primary | 1995 | https://doi.org/10.1126/science.269.5221.198
SRC: Pathria R. K., Beale P. D., Statistical Mechanics, 3rd edition, chapter 7, Academic Press | secondary | 2011
EV: established | BEC is routinely made and studied.
Q: How do Bose–Einstein and Fermi–Dirac distributions differ in form? | −1 in the denominator for bosons, +1 for fermions.
M3@2,3: In both quantum distributions, what happens when (E − μ) ≫ k_{B}T? | Both reduce to the classical Boltzmann factor e^{−(E − μ)/k_{B}T} | Bosons all collapse into the ground state | Fermions fill every available state | Both distributions become exactly zero | The ±1 is negligible against a huge exponential, so quantum statistics matter only at high occupancy.
SA2@1,2: Explain why Bose–Einstein condensation needs such low temperatures. | Condensation happens when the thermal de Broglie wavelength λ_{th} becomes comparable to the spacing between atoms (nλ_{th}^{3} ≈ 2.6). λ_{th} ∝ 1/√(mT), and dilute atomic gases must stay dilute to avoid forming solids, so T must be lowered to nanokelvin for λ_{th} to grow large enough. | condition nλ_{th}^{3} ≈ 2.6 ; λ_{th} ∝ 1/√(mT) ; gases must be dilute ; so nanokelvin temperatures

## Quantum gases
S: When particles are close compared with their thermal de Broglie wavelength, quantum statistics take over and gases behave very differently from classical ones. Ultracold atomic gases let physicists create and control such quantum gases precisely.
LV: Advanced · Foundation
O: Decide when a gas must be treated quantum mechanically
O: Compare the low-temperature behaviour of Fermi and Bose gases
PRE: Bose–Einstein statistics
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
T: Quantum degeneracy | The regime nλ_{th}^{3} ≳ 1, where quantum statistics dominate
T: Superfluidity | Flow without viscosity, seen in liquid ^{4}He below 2.17 K
SUM: Quantum when nλ_{th}^{3} ≳ 1: electrons in metals, liquid helium, white dwarfs, cold atoms.
SUM: Fermi gases resist compression (degeneracy pressure); Bose gases condense.
SRC: Pathria R. K., Beale P. D., Statistical Mechanics, 3rd edition, chapters 7–8, Academic Press | secondary | 2011
SRC: Kapitza P., "Viscosity of liquid helium below the λ-point", Nature 141, 74 | primary | 1938 | https://doi.org/10.1038/141074a0
EV: established | Standard quantum statistical mechanics.
Q: Why is air at room temperature a classical gas? | Its molecules are far apart compared with their thermal de Broglie wavelength (nλ_{th}^{3} ~ 10^{−7}).
M3@2,3: Why does liquid ^{3}He become superfluid only below about 2.5 mK, while ^{4}He does at 2.17 K? | ^{3}He atoms are fermions and must first pair up, which happens only at far lower temperature | ^{3}He atoms are heavier, so they move more slowly | ^{3}He is a solid at all low temperatures | ^{3}He has a larger thermal de Broglie wavelength | Fermions can't condense individually; paired ^{3}He atoms act as bosons, as in superconductivity.
SA2@1,2: Explain why electrons in a metal must be treated as a quantum gas at room temperature, while the atoms of air needn't be. | Electrons are very light, so their λ_{th} is about 4 nm at 300 K, and they are dense (about 10^{29} m^{−3}), giving nλ_{th}^{3} ≫ 1: strongly degenerate. Air molecules are heavier (λ_{th} ≈ 0.02 nm) and less dense, giving nλ_{th}^{3} ≪ 1. | electrons light, large λ_{th} ; high density ; degenerate ; air molecules heavier and dilute

## Degenerate matter
S: Degenerate matter is so dense that the Pauli exclusion principle, not temperature, provides most of its pressure. It makes up white dwarfs and neutron stars and sets limits on how massive they can be.
LV: Advanced · Application
O: Explain electron degeneracy pressure and its role in white dwarfs
O: Describe the Chandrasekhar limit and neutron degeneracy
PRE: Fermi–Dirac statistics
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
T: Degeneracy pressure | Pressure from the Pauli exclusion principle, present even at zero temperature
T: Chandrasekhar limit | About 1.4 solar masses, the maximum mass of a white dwarf
T: White dwarf | A dense stellar remnant supported by electron degeneracy pressure
SUM: Non-relativistic degeneracy pressure ∝ n^{5/3}; relativistic ∝ n^{4/3}, too weak above the Chandrasekhar mass.
SUM: Beyond the limit, collapse continues to a neutron star (neutron degeneracy and nuclear forces) or black hole.
SRC: Chandrasekhar S., "The maximum mass of ideal white dwarfs", Astrophysical Journal 74, 81–82 | primary | 1931 | https://doi.org/10.1086/143324
SRC: Carroll B. W., Ostlie D. A., An Introduction to Modern Astrophysics, 2nd edition, chapter 16, Pearson | secondary | 2007
EV: established | Confirmed by observations of white-dwarf masses, none well above about 1.4 M_{☉}.
Q: Why doesn't a white dwarf need nuclear fusion to support itself? | Electron degeneracy pressure holds it up even as it cools.
M3@2,3: A white dwarf's radius shrinks as its mass increases. Why? | Higher mass needs a higher density of electrons for enough degeneracy pressure | More mass means more fusion heats and expands it | Gravity is weaker in more massive stars | Electrons become bosons at higher mass | Balancing gravity with P ∝ n^{5/3} gives R ∝ M^{−1/3}: heavier white dwarfs are smaller.
SA2@2: Explain why relativistic electrons can't support a white dwarf above the Chandrasekhar mass. | As density rises, electrons are pushed to higher momenta until they move near c. Their degeneracy pressure then grows only as n^{4/3}, the same scaling as gravity's pull with compression, so contracting no longer increases support faster than gravity. Above about 1.4 M_{☉} no stable balance exists and the star collapses. | electrons become relativistic ; pressure ∝ n^{4/3} ; same scaling as gravity ; no stable equilibrium above the limit

## Blackbody radiation
S: A blackbody absorbs all radiation and emits a spectrum fixed only by its temperature. Planck's explanation (1900), that energy is exchanged in quanta hf, launched quantum physics.
LV: Intermediate · Application
O: Use Planck's law, Wien's displacement law and the Stefan–Boltzmann law
O: Explain how quantisation solved the ultraviolet catastrophe
PRE: Bose–Einstein statistics
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
T: Blackbody | An ideal body that absorbs all incident radiation and emits a spectrum set only by temperature
T: Wien's displacement law | λ_{max}T = 2.90 × 10^{−3} m K
T: Stefan–Boltzmann law | Power per area = σT^{4}, σ = 5.67 × 10^{−8} W m^{−2} K^{−4}
SUM: Planck's law follows from photons as bosons with μ = 0 in a cavity.
SUM: The cosmic microwave background is the most perfect blackbody known, at 2.725 K.
SRC: Planck M., "Ueber das Gesetz der Energieverteilung im Normalspectrum", Annalen der Physik 309, 553–563 | primary | 1901 | https://doi.org/10.1002/andp.19013090310
SRC: Fixsen D. J., "The temperature of the cosmic microwave background", Astrophysical Journal 707, 916–920 | primary | 2009 | https://doi.org/10.1088/0004-637X/707/2/916
EV: established | Confirmed to parts in 10^{4} by the COBE FIRAS measurement of the CMB.
Q: Why do hot objects glow red, then white, as they heat up? | The emission peak shifts to shorter wavelengths (Wien's law) and brightness rises as T^{4}.
M3@2,3: The Sun's spectrum peaks near 500 nm. What is its surface temperature? | About 5800 K | About 2900 K | About 58 000 K | About 580 K | T = 2.90 × 10^{−3}/5.0 × 10^{−7} ≈ 5800 K.
SA2@1,2: Explain the ultraviolet catastrophe and how Planck resolved it. | Classical equipartition gave every cavity mode k_{B}T, and the number of modes grows without limit at high frequency, predicting infinite energy. Planck proposed that energy comes in quanta hf; high-frequency modes then need large quanta that are rarely excited (Boltzmann factor e^{−hf/k_{B}T}), so their energy falls to zero and the total is finite. | classical prediction of infinite energy ; equipartition per mode ; quanta E = hf ; high-frequency modes suppressed

## Fluctuations and correlations
S: Thermodynamic quantities fluctuate about their averages. The size of fluctuations is linked to response functions like heat capacity and compressibility, and correlations between distant points reveal how ordered a system is.
LV: Advanced · Foundation
O: Relate the size of fluctuations to response functions
O: Describe Brownian motion and the fluctuation–dissipation theorem
PRE: Statistical ensembles
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
T: Fluctuation–dissipation theorem | The link between a system's spontaneous fluctuations and its response to a perturbation
T: Correlation function | How strongly a quantity at one place or time is related to its value at another
T: Brownian motion | Random motion of small particles driven by molecular collisions
SUM: Energy fluctuations: ⟨ΔE^{2}⟩ = k_{B}T^{2}C_{V}; relative size ~1/√N.
SUM: Einstein's 1905 analysis of Brownian motion (D = k_{B}T/6πηa) gave strong evidence for atoms; Perrin measured N_{A} from it.
SRC: Einstein A., "Über die von der molekularkinetischen Theorie der Wärme geforderte Bewegung von in ruhenden Flüssigkeiten suspendierten Teilchen", Annalen der Physik 322, 549–560 | primary | 1905 | https://doi.org/10.1002/andp.19053220806
SRC: Kubo R., "The fluctuation-dissipation theorem", Reports on Progress in Physics 29, 255–284 | primary | 1966 | https://doi.org/10.1088/0034-4885/29/1/306
EV: established | Standard statistical physics.
Q: What does the fluctuation–dissipation theorem say about Johnson noise in a resistor? | Its voltage noise ⟨V^{2}⟩ = 4k_{B}TRΔf is set by the same resistance that dissipates energy.
M3@2,3: What is the rms Johnson noise voltage across a 1.0 MΩ resistor at 300 K over a 10 kHz bandwidth? | About 13 μV | About 1.3 mV | About 13 nV | About 0.13 V | V_{rms} = √(4k_{B}TRΔf) = √(4 × 1.38 × 10^{−23} × 300 × 10^{6} × 10^{4}) ≈ 1.3 × 10^{−5} V.
SA2@1,2: Explain how Brownian motion gave evidence for the existence of atoms. | Einstein showed that a small particle's random walk in a fluid has mean-square displacement ⟨x^{2}⟩ = 2Dt with D = k_{B}T/(6πηa). Measuring ⟨x^{2}⟩ under a microscope (Perrin, 1908) gave k_{B}, and so Avogadro's number, agreeing with other methods: molecules must be real, discrete objects. | random walk of particles ; Einstein's relation for D ; measuring displacement gives k_{B} ; consistent N_{A} supports atoms

## Phase transitions
S: Statistical mechanics explains phase transitions as collective behaviour: interactions between many particles produce sudden changes in macroscopic order. Mean-field theories capture the basics; fluctuations make critical behaviour subtle.
LV: Advanced · Foundation
O: Explain phase transitions as collective behaviour of interacting particles
O: Use mean-field theory to predict a transition temperature
PRE: Fluctuations and correlations
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
T: Mean-field theory | An approximation replacing each particle's neighbours by their average effect
T: Spontaneous symmetry breaking | An ordered phase choosing one of several equivalent states, such as a magnetisation direction
SUM: Transitions need interactions and the thermodynamic limit; a finite system has no sharp transition.
SUM: Mean-field theory gives qualitatively right phase diagrams but wrong critical exponents in low dimensions.
SRC: Chaikin P. M., Lubensky T. C., Principles of Condensed Matter Physics, chapters 3–4, Cambridge University Press | secondary | 1995
SRC: Yeomans J. M., Statistical Mechanics of Phase Transitions, Oxford University Press | secondary | 1992
EV: established | Standard statistical physics.
Q: Why can't a single molecule have a phase transition? | Transitions are collective: sharp singularities appear only in the limit of infinitely many interacting particles.
M3@2,3: Mean-field theory gives k_{B}T_{c} = zJ. For a simple cubic lattice (z = 6), where the accurate value is about 4.51J, by how much does it overestimate T_{c}? | About 33% | About 6% | About 100% | It underestimates T_{c} | 6/4.51 ≈ 1.33; mean-field theory always overestimates T_{c} because it neglects fluctuations, less badly in 3D than in 2D.
SA2@1,2: Explain how interactions between spins can produce a sudden ordering at a definite temperature. | Each spin prefers to align with its neighbours, lowering energy, while temperature favours random orientations, raising entropy. Alignment is cooperative: the more spins align, the stronger the effective field on each. Below a critical temperature this feedback wins and a macroscopic magnetisation appears spontaneously; above it, entropy wins. | interactions favour alignment ; temperature favours disorder ; cooperative feedback ; ordering below T_{c}

## Critical phenomena
S: Near a continuous phase transition, physical quantities follow power laws in the distance from the critical point, with exponents that are the same for whole classes of different systems. This universality is one of the deepest results of statistical physics.
LV: Advanced · Foundation
O: Define critical exponents and describe universality classes
O: Explain the divergence of the correlation length
PRE: Phase transitions
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
T: Correlation length | ξ, the distance over which fluctuations are correlated; diverges at T_{c}
T: Universality class | A group of systems sharing the same critical exponents, set by dimension and symmetry
T: Scaling relation | An equation linking critical exponents, such as α + 2β + γ = 2
SUM: Near T_{c}: ξ ∝ |T − T_{c}|^{−ν}, M ∝ (T_{c} − T)^{β}, χ ∝ |T − T_{c}|^{−γ}.
SUM: A liquid–gas critical point and a uniaxial magnet share the 3D Ising exponents (β ≈ 0.33).
SRC: Stanley H. E., Introduction to Phase Transitions and Critical Phenomena, Oxford University Press | secondary | 1971
SRC: Pelissetto A., Vicari E., "Critical phenomena and renormalization-group theory", Physics Reports 368, 549–727 | secondary | 2002 | https://doi.org/10.1016/S0370-1573(02)00219-3
EV: established | Universality is confirmed by many experiments and simulations.
Q: Why do very different systems share critical exponents? | Near T_{c} the correlation length is huge, so microscopic details average out; only dimension and symmetry matter.
M3@2,3: Mean-field theory gives β = 1/2, but measured fluids give β ≈ 0.33. Why the difference? | Mean-field theory ignores large fluctuations that dominate near T_{c} in three dimensions | The experiments are not accurate enough to measure β | Fluids aren't in the same universality class as any model | Mean-field theory is exact only for fluids | Above four dimensions mean-field exponents are correct; below, fluctuations change them.
SA2@2: Explain what it means for the correlation length to diverge at a critical point. | Away from T_{c}, a fluctuation in one region affects others only within a finite distance ξ. As T → T_{c}, ξ grows without limit: fluctuations of all sizes appear and every part of the system is correlated with every other. There is no characteristic length, so the system looks statistically the same at every scale. | ξ finite away from T_{c} ; grows without limit ; fluctuations at all scales ; scale invariance

## Ising model
S: The Ising model places spins that can point up or down on a lattice, with neighbouring spins preferring to align. It's the simplest model of a phase transition and a workhorse for studying magnets, alloys, neural networks and opinion dynamics.
LV: Advanced · Application
O: Write the Ising Hamiltonian and describe its behaviour in 1D and 2D
O: Use mean-field theory to estimate T_{c}
PRE: Critical phenomena
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
T: Ising model | Spins s_{i} = ±1 on a lattice with energy E = −JΣs_{i}s_{j} − hΣs_{i}
T: Exchange coupling | J, the energy favouring aligned neighbours when positive
SUM: 1D: no transition at T > 0. 2D: exact solution (Onsager 1944) with k_{B}T_{c} = 2J/ln(1 + √2) ≈ 2.27J on a square lattice.
SUM: Mean-field estimate: k_{B}T_{c} = zJ, with z neighbours (4J for the square lattice, an overestimate).
SRC: Onsager L., "Crystal statistics. I. A two-dimensional model with an order-disorder transition", Physical Review 65, 117–149 | primary | 1944 | https://doi.org/10.1103/PhysRev.65.117
SRC: Yeomans J. M., Statistical Mechanics of Phase Transitions, Oxford University Press | secondary | 1992
EV: established | The 2D result is exact; 3D is known accurately from numerics.
Q: Who solved the 2D Ising model exactly? | Lars Onsager, in 1944.
M3@2,3: For a square-lattice Ising model, how does the mean-field T_{c} compare with Onsager's exact value? | About 1.8 times too high (4J vs 2.27J) | Exactly equal | About half as large | About ten times too high | Mean-field theory overestimates T_{c} because it ignores fluctuations that disorder the spins.
SA2@1,2: Explain why the Ising model is studied so much despite being very simple. | It captures the essential ingredients of a phase transition (local interactions, competition of energy and entropy, symmetry breaking) and can be solved exactly in 1D and 2D. By universality its critical exponents describe real magnets, fluids and alloys, and it is a test bed for approximations and simulations. | captures key ingredients ; exactly solvable in 1D and 2D ; universality links it to real systems ; testing methods

## Renormalisation group
S: The renormalisation group (RG) studies how a system's description changes as you zoom out, averaging over small-scale details. It explains universality and critical exponents, and the same ideas underpin quantum field theory.
LV: Advanced · Foundation
O: Describe coarse-graining and the flow of couplings under the renormalisation group
O: Explain how fixed points explain universality
PRE: Ising model
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
T: Coarse-graining | Averaging over short-distance details to describe a system at a larger scale
T: Fixed point | A set of couplings unchanged by coarse-graining, describing a scale-invariant system
T: Relevant and irrelevant perturbations | Changes that grow or shrink under repeated coarse-graining
SUM: Critical points are unstable fixed points of the RG flow; their properties set the critical exponents.
SUM: Different microscopic systems flowing to the same fixed point share exponents: universality.
SRC: Wilson K. G., "Renormalization group and critical phenomena. I.", Physical Review B 4, 3174–3183 | primary | 1971 | https://doi.org/10.1103/PhysRevB.4.3174
SRC: Cardy J., Scaling and Renormalization in Statistical Physics, Cambridge University Press | secondary | 1996
EV: established | Wilson's RG (Nobel Prize 1982) is the standard framework for critical phenomena.
Q: What does a block-spin transformation do? | Replaces a block of spins by one effective spin, then rescales lengths.
M3@2,3: Under RG coarse-graining, a system starts slightly below T_{c}. Where does it flow? | To the low-temperature ordered fixed point | To the critical fixed point | To the high-temperature disordered fixed point | It stays exactly where it started | Temperature is a relevant direction: any deviation from T_{c} grows, so the system flows away to the ordered state.
SA2@2: Explain how the renormalisation group explains why microscopic details don't affect critical exponents. | Coarse-graining repeatedly averages away short-distance details. Many details are irrelevant: their effects shrink with each step. Systems that differ only in irrelevant details all flow towards the same fixed point, whose properties set the exponents; only relevant features (dimension, symmetry of the order parameter) decide which fixed point is reached. | coarse-graining averages details ; irrelevant details shrink ; flow to the same fixed point ; exponents set by the fixed point

## Statistical field theory
S: Statistical field theory describes systems near critical points by continuous fields instead of individual particles. Its mathematics is the same as quantum field theory in imaginary time, so ideas flow between condensed matter and particle physics.
LV: Advanced · Foundation
O: Describe a continuous field description near a critical point
O: Write the Landau–Ginzburg free energy and explain each term
PRE: Renormalisation group
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
T: Landau–Ginzburg theory | A free energy F[φ] = ∫(½(∇φ)^{2} + ½rφ^{2} + ¼uφ^{4} − hφ) d^{d}x for an order-parameter field φ
T: Upper critical dimension | The dimension (4 for Ising-like systems) above which mean-field exponents are exact
SUM: The sign of r changes at T_{c}, turning one minimum into two: symmetry breaking.
SUM: The gradient term penalises rapid variation; together with r it sets the correlation length.
SRC: Chaikin P. M., Lubensky T. C., Principles of Condensed Matter Physics, chapter 4, Cambridge University Press | secondary | 1995
SRC: Kardar M., Statistical Physics of Fields, Cambridge University Press | secondary | 2007
EV: established | Standard theory; it shares its mathematics with quantum field theory.
Q: In Landau theory, what happens to the free-energy minimum as T falls through T_{c}? | A single minimum at φ = 0 splits into two at ±φ_{0}.
M3@2,3: In Landau theory with r = a(T − T_{c}) and u > 0, how does the order parameter grow below T_{c}? | φ_{0} ∝ (T_{c} − T)^{1/2} | φ_{0} ∝ (T_{c} − T) | φ_{0} ∝ (T_{c} − T)^{2} | φ_{0} jumps to a fixed value | Minimising rφ^{2}/2 + uφ^{4}/4 gives φ_{0}^{2} = −r/u ∝ (T_{c} − T): the mean-field β = 1/2.
SA2@1,2: Explain why statistical field theory and quantum field theory share the same mathematics. | Both deal with fields and sums (or integrals) over all field configurations weighted by an exponential of an action or free energy. Rotating time to imaginary values turns a quantum path integral in d dimensions into a statistical sum in d + 1, so methods like renormalisation and Feynman diagrams apply to both. | both sum over field configurations ; exponential weighting ; imaginary time links them ; same tools apply

## Monte Carlo methods
S: Monte Carlo methods use random sampling to estimate averages in systems with too many states to enumerate. The Metropolis algorithm samples states with Boltzmann probabilities, making it the standard tool for simulating thermal systems.
LV: Advanced · Application
O: Describe the Metropolis algorithm and importance sampling
O: Identify sources of error: equilibration, correlation and finite size
PRE: Ising model
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
T: Importance sampling | Choosing states with probability proportional to their Boltzmann weight
T: Metropolis algorithm | Accept a trial move with probability min(1, e^{−ΔE/k_{B}T})
T: Autocorrelation time | The number of steps needed for successive samples to become independent
SUM: Monte Carlo averages over a Markov chain of sampled states; errors fall as 1/√(independent samples).
SUM: Near T_{c} correlation times grow (critical slowing down); cluster algorithms such as Wolff's help.
SRC: Metropolis N., Rosenbluth A. W., Rosenbluth M. N., Teller A. H., Teller E., "Equation of state calculations by fast computing machines", Journal of Chemical Physics 21, 1087–1092 | primary | 1953 | https://doi.org/10.1063/1.1699114
SRC: Newman M. E. J., Barkema G. T., Monte Carlo Methods in Statistical Physics, Oxford University Press | secondary | 1999
EV: established | Standard computational method.
Q: Why does the Metropolis algorithm sometimes accept moves that raise the energy? | So the sampled states follow the Boltzmann distribution, including thermally excited states.
M3@2,3: A Metropolis move raises the energy by 2k_{B}T. With what probability is it accepted? | About 0.14 | 0 | 1 | About 0.5 | Acceptance = e^{−ΔE/k_{B}T} = e^{−2} ≈ 0.135.
SA2@1,2: Explain why you can't estimate the Ising model's average energy by sampling states uniformly at random. | There are 2^{N} states, almost all with energy near that of random spins. At low temperature the important states are a tiny, low-energy fraction carrying almost all the Boltzmann weight; uniform sampling would essentially never find them. Importance sampling picks states in proportion to their weight. | huge number of states ; uniform samples are typical high-energy states ; important states are rare ; importance sampling needed

## Nonequilibrium statistical mechanics
S: Nonequilibrium statistical mechanics describes systems driven away from equilibrium: how they relax, transport heat and particles, and fluctuate. It connects microscopic dynamics to transport laws and the arrow of time.
LV: Advanced · Foundation
O: Describe linear response and relaxation towards equilibrium
O: State the Jarzynski equality and the fluctuation theorems
PRE: Fluctuations and correlations
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
T: Linear response | The response of a system proportional to a small applied perturbation
T: Jarzynski equality | ⟨e^{−W/k_{B}T}⟩ = e^{−ΔF/k_{B}T}, linking non-equilibrium work to equilibrium free energy
T: Boltzmann equation | An equation for the evolution of the one-particle distribution in a dilute gas
SUM: Near equilibrium, Green–Kubo relations give transport coefficients from equilibrium fluctuations.
SUM: Far from equilibrium, fluctuation theorems quantify how often the second law is "violated" in small systems.
SRC: Jarzynski C., "Nonequilibrium equality for free energy differences", Physical Review Letters 78, 2690–2693 | primary | 1997 | https://doi.org/10.1103/PhysRevLett.78.2690
SRC: Liphardt J. et al., "Equilibrium information from nonequilibrium measurements in an experimental test of Jarzynski's equality", Science 296, 1832–1835 | primary | 2002 | https://doi.org/10.1126/science.1071152
EV: established | Linear response and the fluctuation theorems are established and tested; a general theory far from equilibrium is an open problem.
Q: What did experiments pulling single RNA molecules test? | Jarzynski's equality: free-energy differences recovered from repeated non-equilibrium pulling work.
M3@2,3: Pulling a single molecule quickly, a few runs need less work than ΔF. Does this break the second law? | No: the second law constrains the average work, ⟨W⟩ ≥ ΔF; small systems fluctuate | Yes: the second law fails for all molecules | Yes, but only at room temperature | No, because work isn't defined for molecules | Fluctuation theorems predict occasional W < ΔF with probability falling exponentially in (ΔF − W)/k_{B}T.
SA2@1,2: Explain how linear-response theory connects a system's equilibrium fluctuations with its transport properties. | Near equilibrium, the way a system relaxes after a small push is the same as the way its spontaneous fluctuations decay (Onsager's regression hypothesis). Green–Kubo relations express transport coefficients such as conductivity or viscosity as time integrals of equilibrium correlation functions of the corresponding currents. | small perturbations ; relaxation matches decay of fluctuations ; Green–Kubo relations ; transport from equilibrium correlations
`;
