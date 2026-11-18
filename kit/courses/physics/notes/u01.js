// Unit 1: Foundations of Physics. Format: kit/course/notes.js
export default `
## Scope and aims of physics
S: Physics is the study of matter, energy, space and time, and of the laws that connect them. It aims to explain the widest range of phenomena with the fewest principles, and to make predictions precise enough to be proved wrong.
---
X: Decide which theory you need for an electron in a hydrogen atom moving at about c/137.
> Size ~10^{-10} m: atomic scale, so quantum mechanics is needed
> v/c ≈ 1/137 ≈ 0.007: relativistic corrections are about (v/c)^{2} ≈ 5 × 10^{-5}, small
> Non-relativistic quantum mechanics works; relativity appears only as the fine structure of the spectrum
Q: What makes a theory falsifiable? | Some possible observation could show it to be wrong.
LV: Introductory · Foundation
O: State the four aims of physics: to describe, explain, predict and unify
O: Name which theory applies at a given scale of length, speed or gravity
O: Explain why physics tests theories rather than proving them
H: What physics tries to do
- **Describe**: give quantities, units and mathematical relations for what happens (kinematics, field maps, spectra).
- **Explain**: show why it happens from deeper principles (Newton's laws explain Kepler's orbits; statistical mechanics explains thermodynamics).
- **Predict**: compute outcomes of situations not yet observed, such as the return of a comet or the existence of the Higgs boson.
- **Unify**: show that apparently separate phenomena are one (electricity, magnetism and light in Maxwell's equations; the electroweak theory).
H: The scales of physics
P: Physics spans about 60 orders of magnitude in length, from the Planck length (~10^{-35} m) to the observable universe (~10^{27} m). Different theories are accurate in different regimes: classical mechanics for everyday speeds and sizes, relativity near c or in strong gravity, quantum mechanics at atomic scales, quantum field theory where both matter.
K: A good physical theory is economical (few assumptions), general (wide range of validity), quantitative and falsifiable.
H: Branches and links
- Core branches: mechanics, thermodynamics and statistical physics, electromagnetism, optics, quantum physics, relativity, nuclear and particle physics, condensed matter, astrophysics.
- Physics underpins chemistry (atomic structure, bonding), biology (biophysics, imaging), engineering and computing (semiconductors, lasers).
- Experiment, theory and computation are the three legs of modern physics: each checks and drives the others.
!: Physics does not "prove" theories true. It tests them, and a theory survives only as long as no reliable measurement contradicts it within its domain.
Q: What are the four main aims of physics? | To describe, explain, predict and unify natural phenomena using as few principles as possible.
Q: Roughly how many orders of magnitude in length does physics span? | About 60, from the Planck length (~10^{-35} m) to the observable universe (~10^{27} m).
Q: Give an example of unification in physics. | Maxwell's equations unified electricity, magnetism and light; the electroweak theory unified electromagnetism with the weak force.
M1: Which statement best describes the aim of physics? | To explain the widest range of phenomena with the fewest principles | To list every natural phenomenon | To prove theories with certainty | To replace mathematics with experiment | Physics seeks economical, general, testable laws, not certainty or mere cataloguing.
M2: Which regime needs both quantum mechanics and special relativity? | High-energy particle collisions | A pendulum clock | Planetary orbits in the Solar System | Heat flow through a wall | When particles move near c and quantum effects matter, you need quantum field theory.
T: Falsifiable | Able, in principle, to be shown wrong by some possible observation
T: Unification | Showing that apparently separate phenomena follow from one set of laws
T: Regime | The range of conditions (scale, speed, field strength) in which a theory is accurate
SUM: Physics aims to describe, explain, predict and unify, using the fewest principles that work.
SUM: Each theory has a regime: classical mechanics, relativity, quantum mechanics and quantum field theory cover different scales.
SRC: Feynman R. P., Leighton R. B., Sands M., The Feynman Lectures on Physics, vol. I, chapters 1–3 | secondary | 1963 | https://www.feynmanlectures.caltech.edu/I_toc.html
SRC: OpenStax, University Physics Volume 1, section 1.1 "The Scope and Scale of Physics" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/1-1-the-scope-and-scale-of-physics
EV: established | Classical mechanics, relativity and quantum theory are each accurate in their own regimes, and reduce to one another where the regimes overlap.
M3@2,3: A theory predicts a pendulum's period to 0.1% but fails for an electron in an atom. What is the best conclusion? | The theory is accurate in its regime, and the atom lies outside that regime | The theory is now proved false in every regime | The pendulum measurement must have been wrong | Physics has no way to describe electrons in atoms | A failure outside a theory's domain marks where the domain ends; classical mechanics still predicts pendulums superbly.
SA2@1,3: Explain, with an example, what it means for physics to "unify" phenomena, and why unification is valued. | Unification shows that phenomena once thought separate follow from the same laws. Maxwell's equations showed that electricity, magnetism and light are one phenomenon, and predicted radio waves. Unification is valued because one theory with fewer assumptions explains more and makes new, testable predictions. | separate phenomena explained by one set of laws ; a correct example such as Maxwell or electroweak theory ; fewer assumptions explain more ; leads to new testable predictions

## Physical quantities and observables
S: A physical quantity is a property that can be measured and expressed as a number times a unit. An observable is a quantity that a measurement can actually return; in quantum mechanics this idea becomes precise and surprising.
---
X: Is the energy stored in a battery extensive or intensive? What about its voltage?
> Two identical batteries together store twice the energy: energy is extensive
> Joining them in parallel keeps the same voltage: voltage (energy per charge) is intensive
Q: Is density extensive or intensive, and why? | Intensive: it is the ratio of two extensive quantities, mass and volume, so the size dependence cancels.
LV: Introductory · Foundation
O: Express a physical quantity as a number times a unit, and convert it without changing the quantity
O: Classify quantities as base, derived or dimensionless, and as extensive or intensive
O: Explain what an observable is, classically and in quantum mechanics
PRE: Scope and aims of physics
H: Quantity = number × unit
E: Q = {Q}[Q] :: the numerical value {Q} times the unit [Q]
P: "3.2 m" means 3.2 × (one metre). Change the unit and the number changes inversely: 3.2 m = 320 cm. The quantity itself is unchanged.
- **Base quantities** are chosen as independent (length, mass, time, current, temperature, amount, luminous intensity).
- **Derived quantities** are built from them: velocity (m s^{-1}), force (kg m s^{-2}), energy (kg m^{2} s^{-2}).
- **Dimensionless quantities** are pure numbers: strain, refractive index, the fine-structure constant α ≈ 1/137.
H: Kinds of quantity
- **Extensive** quantities scale with the size of the system (mass, energy, volume, entropy).
- **Intensive** quantities do not (temperature, pressure, density). Ratios of extensive quantities are intensive.
- **Scalars, vectors and tensors**: a direction may or may not be needed (see Scalar and vector quantities).
H: Observables
P: Classically, every property has a definite value that measurement reveals. In quantum mechanics an observable is represented by an operator; a measurement returns one of its eigenvalues, with probabilities set by the state. Position and momentum cannot both have sharp values.
K: An operational definition says how to measure a quantity. Physics only admits quantities that have one.
!: Do not treat a unit as optional. "The length is 3.2" is meaningless; units carry half the information.
Q: What is an operational definition? | A definition of a quantity by the procedure used to measure it.
Q: Is temperature extensive or intensive? | Intensive: joining two identical systems doesn't double the temperature.
Q: In quantum mechanics, what does a measurement of an observable return? | One of the eigenvalues of its operator, with a probability set by the state.
M1: Which of these is an extensive quantity? | Internal energy | Temperature | Pressure | Density | Extensive quantities add when systems combine; energy does, the others don't.
M2: 3.2 m is converted to millimetres. What happens? | The number is multiplied by 1000; the quantity is unchanged | The quantity becomes 1000 times larger | The number is divided by 1000 | The unit stays the same but the number changes | Number and unit change inversely so the product (the quantity) is invariant.
T: Physical quantity | A measurable property, written as a numerical value times a unit
T: Extensive quantity | One that scales with the size of the system, such as mass or energy
T: Intensive quantity | One that does not scale with size, such as temperature or density
T: Operational definition | A definition of a quantity by the procedure used to measure it
SUM: Quantity = numerical value × unit; changing the unit changes the number, not the quantity.
SUM: Extensive quantities add when systems are combined; intensive ones do not.
SUM: In quantum mechanics an observable is an operator, and a measurement returns one of its eigenvalues.
SRC: BIPM, The International System of Units (SI Brochure), 9th edition, section 2 | standard | 2019 | https://www.bipm.org/en/publications/si-brochure
SRC: OpenStax, University Physics Volume 1, section 1.2 "Units and Standards" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/1-2-units-and-standards
EV: established | Every SI quantity is defined operationally through the 2019 SI, and the operator picture of observables is standard quantum mechanics.
M3@2: Two identical 1.0 kg blocks of copper at 300 K are joined. Which describes the combined block? | 2.0 kg at 300 K | 2.0 kg at 600 K | 1.0 kg at 300 K | 2.0 kg at 150 K | Mass is extensive and doubles; temperature is intensive and stays the same.
SA2@1,2: Density is mass divided by volume. Use this to explain why a ratio of two extensive quantities is intensive. | Doubling the size of a system doubles both its mass and its volume, so their ratio, the density, is unchanged. Any ratio of two extensive quantities cancels the size dependence, which is the definition of an intensive quantity. | mass and volume both scale with size ; the scaling cancels in the ratio ; intensive means independent of size

## SI base and derived units
S: The International System of Units (SI) defines seven base units by fixing exact values of seven constants of nature. Every other unit is a product of powers of these.
---
Q: Why has no SI unit depended on a physical object since 2019? | Every base unit is now defined by fixing the exact value of a constant of nature (c, h, e, k_{B}, N_{A}, Δν_{Cs}, K_{cd}).
LV: Introductory · Foundation
O: Name the seven SI base units and the constant that defines each
O: Express a derived unit, such as the volt or pascal, in base units
PRE: Physical quantities and observables
H: The seven base units
- **second (s)**: fixed by the caesium-133 hyperfine frequency Δν_{Cs} = 9 192 631 770 Hz.
- **metre (m)**: fixed by the speed of light c = 299 792 458 m s^{-1}.
- **kilogram (kg)**: fixed by the Planck constant h = 6.626 070 15 × 10^{-34} J s (realised with a Kibble balance).
- **ampere (A)**: fixed by the elementary charge e = 1.602 176 634 × 10^{-19} C.
- **kelvin (K)**: fixed by the Boltzmann constant k_{B} = 1.380 649 × 10^{-23} J K^{-1}.
- **mole (mol)**: fixed by the Avogadro constant N_{A} = 6.022 140 76 × 10^{23} mol^{-1}.
- **candela (cd)**: fixed by the luminous efficacy K_{cd} = 683 lm W^{-1} at 540 THz.
H: Derived units
E: N = kg m s^{-2} :: newton, force
E: J = N m = kg m^{2} s^{-2} :: joule, energy
E: W = J s^{-1} :: watt, power
E: Pa = N m^{-2} :: pascal, pressure
E: C = A s; V = W A^{-1}; Ω = V A^{-1} :: coulomb, volt, ohm
E: Hz = s^{-1}; T = kg s^{-2} A^{-1} :: hertz, tesla
K: Since 2019 no SI unit depends on a physical artefact; all are defined by exact constants, so they can be realised anywhere with the right experiment.
X: Express the volt in base units.
> V = W/A = (J s^{-1})/A
> J = kg m^{2} s^{-2}, so V = kg m^{2} s^{-3} A^{-1}
!: The radian and steradian are dimensionless derived units. Leaving "rad" out of ω in s^{-1} is legal but can hide errors between angular frequency ω and frequency f.
Q: How many SI base units are there? | Seven: s, m, kg, A, K, mol, cd.
Q: Which constant now defines the kilogram? | The Planck constant h, fixed at 6.626 070 15 × 10^{-34} J s.
Q: What is the pascal in base units? | kg m^{-1} s^{-2}.
M1: Which is NOT an SI base unit? | Newton | Kelvin | Mole | Ampere | The newton is derived: kg m s^{-2}.
M2: What is the tesla in SI base units? | kg s^{-2} A^{-1} | kg m s^{-2} A^{-1} | kg A s^{-2} m^{-1} | kg m^{2} s^{-3} A^{-1} | From F = BIL: B = N/(A m) = kg m s^{-2}/(A m) = kg s^{-2} A^{-1}.
M3: The metre is defined by fixing which quantity? | The speed of light | The wavelength of krypton-86 light | A platinum-iridium bar | The second and Avogadro's number | Since 1983 c is exact, so the metre is the distance light travels in 1/299 792 458 s.
T: Base unit | One of the seven SI units (s, m, kg, A, K, mol, cd) from which all others are built
T: Derived unit | A unit formed from products and powers of base units, such as N = kg m s^{-2}
T: Defining constant | A constant of nature given an exact value in order to define an SI unit
SUM: Since 2019 the seven SI base units are fixed by seven exact constants, including c, h, e, k_{B} and N_{A}.
SUM: Every derived unit reduces to base units: write it as a formula, then substitute.
SRC: BIPM, The International System of Units (SI Brochure), 9th edition | standard | 2019 | https://www.bipm.org/en/publications/si-brochure
SRC: NIST, CODATA Internationally recommended values of the fundamental physical constants | data | 2018 | https://physics.nist.gov/cuu/Constants/
EV: established | The 2019 redefinition fixed h, e, k_{B} and N_{A} exactly; c and Δν_{Cs} were already exact.
M1@1: Which constant now defines the kilogram? | The Planck constant h | The gravitational constant G | The mass of a platinum-iridium cylinder | The Avogadro constant alone | Since 2019 the kilogram is defined by fixing h exactly; it is realised with a Kibble balance or by counting silicon atoms.
SA2@2: Express the pascal in SI base units, showing each step. | Pa = N m^{-2}. A newton is kg m s^{-2}, so Pa = kg m s^{-2} × m^{-2} = kg m^{-1} s^{-2}. | start from pressure = force / area ; N = kg m s^{-2} ; result kg m^{-1} s^{-2}

## Dimensional analysis
S: Every physical quantity has dimensions: powers of the base dimensions mass [M], length [L], time [T], current [I], temperature [Θ], amount [N] and luminous intensity [J]. Equations must balance dimensionally, which lets you check results and even derive formulas.
---
Q: What can't dimensional analysis tell you? | The values of dimensionless constants such as 2π or ½, or whether a whole dimensionally consistent term is missing.
LV: Introductory · Application
O: Check whether an equation is dimensionally consistent
O: Use Rayleigh's method to find how a quantity depends on others
O: Count dimensionless groups with the Buckingham π theorem
PRE: SI base and derived units
H: The rules
- Only quantities with the same dimensions can be added, subtracted or equated.
- Arguments of exp, ln, sin and cos must be dimensionless.
- Dimensions multiply and divide like algebra: [velocity] = L T^{-1}, [force] = M L T^{-2}, [energy] = M L^{2} T^{-2}.
- Dimensionless constants (2, π, 1/2) are invisible to dimensional analysis.
H: Deriving relations (Rayleigh's method)
X: Find how the period T of a simple pendulum depends on length l, mass m and g.
> Assume T = k l^{a} m^{b} g^{c}. Dimensions: T = L^{a} M^{b} (L T^{-2})^{c}
> M: b = 0. T: -2c = 1 so c = -1/2. L: a + c = 0 so a = 1/2
> T = k √(l/g). The full theory gives k = 2π, which dimensional analysis cannot.
H: The Buckingham π theorem
P: If a problem involves n variables built from k independent dimensions, the physics can be written as a relation between n − k dimensionless groups. This is why fluid dynamics speaks of the Reynolds number Re = ρvL/μ and why scale models work: match the dimensionless groups and the flows are similar.
!: A dimensionally correct equation can still be wrong (it may miss a factor of 2π, or a whole term). Dimensional analysis can rule things out, never fully rule them in.
Q: What are the dimensions of energy? | M L^{2} T^{-2}.
Q: What does the Buckingham π theorem say? | n variables with k independent dimensions can be combined into n − k independent dimensionless groups that the physics depends on.
Q: Why must the argument of e^{x} be dimensionless? | Its power series adds 1 + x + x^{2}/2 + …, and only like dimensions can be added.
M1: What are the dimensions of power? | M L^{2} T^{-3} | M L^{2} T^{-2} | M L T^{-2} | M L^{2} T^{-1} | Power is energy per time: M L^{2} T^{-2} ÷ T.
M2: The speed of deep-water waves depends only on g and wavelength λ. Which form must it take? | v = k √(gλ) | v = k gλ | v = k g/λ | v = k √(g/λ) | √(gλ) has dimensions √(L T^{-2} · L) = L T^{-1}, the only combination giving a speed.
M3: A drag force depends on ρ, v, a size L and viscosity μ. How many dimensionless groups govern it? | 2 | 1 | 3 | 5 | Five variables (F, ρ, v, L, μ) with three dimensions (M, L, T) give 5 − 3 = 2 groups: a drag coefficient and the Reynolds number.
T: Dimension | The combination of base quantities (M, L, T, I, Θ, N, J) a quantity is built from
T: Dimensionless group | A product of variables whose dimensions cancel, such as the Reynolds number
T: Rayleigh's method | Finding a relation by assuming a product of powers and matching dimensions
SUM: Equations must balance dimensionally, and the arguments of exp, ln and trigonometric functions must be dimensionless.
SUM: Dimensional analysis finds how a result scales but never the dimensionless constants such as 2π.
SUM: n variables with k independent dimensions give n − k dimensionless groups.
SRC: Bridgman P. W., Dimensional Analysis, Yale University Press | secondary | 1922
SRC: Buckingham E., "On physically similar systems; illustrations of the use of dimensional equations", Physical Review 4, 345 | primary | 1914 | https://doi.org/10.1103/PhysRev.4.345
EV: established | The Buckingham π theorem is a proven mathematical result for physically meaningful (dimensionally homogeneous) relations.
SA2@1: A student writes v^{2} = u^{2} + 2a t for motion with constant acceleration. Use dimensions to show the equation is wrong and suggest what is missing. | v^{2} and u^{2} have dimensions L^{2} T^{-2}, but 2at has dimensions L T^{-2} × T = L T^{-1}, so the terms can't be added. The correct last term is 2as, where s is displacement: L T^{-2} × L = L^{2} T^{-2}. | dimensions of v^{2} are L^{2} T^{-2} ; dimensions of at are L T^{-1} ; terms with different dimensions can't be added ; the correct term is 2as

## Unit conversions and prefixes
S: SI prefixes scale units by powers of ten; conversions multiply by factors equal to one. Doing this carefully, with units written in, removes a whole class of errors.
---
Q: How many cubic centimetres are in one cubic metre? | 10^{6}: (100 cm)^{3} = 1 000 000 cm^{3}.
LV: Introductory · Foundation
O: Use SI prefixes to scale units by powers of ten
O: Convert units by multiplying by factors equal to one
O: Convert squared and cubed units correctly
PRE: SI base and derived units
H: The prefixes to know
- quecto q 10^{-30}, ronto r 10^{-27}, yocto y 10^{-24}, zepto z 10^{-21}, atto a 10^{-18}, femto f 10^{-15}, pico p 10^{-12}, nano n 10^{-9}, micro μ 10^{-6}, milli m 10^{-3}
- kilo k 10^{3}, mega M 10^{6}, giga G 10^{9}, tera T 10^{12}, peta P 10^{15}, exa E 10^{18}, zetta Z 10^{21}, yotta Y 10^{24}, ronna R 10^{27}, quetta Q 10^{30}
- centi (10^{-2}), deci (10^{-1}) and hecto (10^{2}) are used but not in the 10^{3n} pattern.
H: Conversion factors
P: Write the conversion as a fraction equal to one and multiply, cancelling units like algebra.
X: Convert 72 km h^{-1} to m s^{-1}.
> 72 km h^{-1} × (1000 m / 1 km) × (1 h / 3600 s)
> = 72 000 / 3600 m s^{-1} = 20 m s^{-1}
H: Powers of units
P: A prefix applies to the unit before any power: 1 cm^{3} = (10^{-2} m)^{3} = 10^{-6} m^{3}, not 10^{-2} m^{3}. So 1 m^{3} = 10^{6} cm^{3} = 1000 litres.
- Energy: 1 eV = 1.602 × 10^{-19} J; 1 kWh = 3.6 MJ; 1 cal = 4.184 J.
- Angle: π rad = 180°. Pressure: 1 atm = 101 325 Pa; 1 bar = 10^{5} Pa.
!: Squared and cubed units trip people up: 1 mm^{2} = 10^{-6} m^{2}, not 10^{-3} m^{2}.
Q: How many m^{3} are in 1 cm^{3}? | 10^{-6} m^{3}.
Q: How do you convert km h^{-1} to m s^{-1}? | Divide by 3.6.
Q: What is 1 kWh in joules? | 3.6 × 10^{6} J.
M1: What is 4.7 μF in farads? | 4.7 × 10^{-6} F | 4.7 × 10^{-3} F | 4.7 × 10^{-9} F | 4.7 × 10^{6} F | Micro means 10^{-6}.
M2: A wire has a cross-section of 0.50 mm^{2}. What is it in m^{2}? | 5.0 × 10^{-7} m^{2} | 5.0 × 10^{-4} m^{2} | 5.0 × 10^{-3} m^{2} | 5.0 × 10^{-10} m^{2} | 1 mm^{2} = (10^{-3} m)^{2} = 10^{-6} m^{2}, so 0.50 mm^{2} = 5.0 × 10^{-7} m^{2}.
M2: What is a density of 1.0 g cm^{-3} in kg m^{-3}? | 1000 kg m^{-3} | 1.0 kg m^{-3} | 0.001 kg m^{-3} | 100 kg m^{-3} | g → kg divides by 10^{3}; cm^{-3} → m^{-3} multiplies by 10^{6}: net × 10^{3}.
K: A prefix belongs to the unit before any power is applied: (1 cm)^{3} = 10^{-6} m^{3}.
T: SI prefix | A symbol that multiplies a unit by a power of ten, such as k = 10^{3} or μ = 10^{-6}
T: Conversion factor | A ratio equal to one, such as (1000 m / 1 km), used to change units
SUM: Write each conversion as a fraction equal to one and cancel units like algebra.
SUM: Apply the power to the prefix too: 1 mm^{2} = 10^{-6} m^{2}, 1 cm^{3} = 10^{-6} m^{3}.
SRC: BIPM, The International System of Units (SI Brochure), 9th edition, section 3 "Decimal multiples and sub-multiples" | standard | 2019 | https://www.bipm.org/en/publications/si-brochure
SRC: BIPM, Resolution 3 of the 27th CGPM, "On the extension of the range of SI prefixes" (ronna, quetta, ronto, quecto) | standard | 2022 | https://www.bipm.org/en/cgpm-2022/resolution-3
EV: established | The SI prefixes, including the four added in 2022, are fixed by resolutions of the CGPM.
M3@3: A density is 7.9 g cm^{-3}. What is it in kg m^{-3}? | 7900 kg m^{-3} | 7.9 kg m^{-3} | 790 kg m^{-3} | 79 000 kg m^{-3} | 7.9 g cm^{-3} × (10^{-3} kg / 1 g) × (10^{6} cm^{3} / 1 m^{3}) = 7.9 × 10^{3} kg m^{-3}.
SA2@2,3: Convert a speed of 30 m s^{-1} to km h^{-1}, showing your conversion factors. | 30 m s^{-1} × (1 km / 1000 m) × (3600 s / 1 h) = 30 × 3.6 = 108 km h^{-1}. | factor of 1 km / 1000 m ; factor of 3600 s / 1 h ; answer 108 km h^{-1}

## Scalar and vector quantities
S: A scalar has magnitude only; a vector has magnitude and direction and adds by the parallelogram rule. Deciding which a quantity is determines how it combines with others.
---
Q: How do you find the magnitude of a vector from its components? | |R| = √(R_{x}^{2} + R_{y}^{2}) (plus R_{z}^{2} in three dimensions).
LV: Introductory · Foundation
O: Classify quantities as scalars or vectors
O: Add vectors by components and find the magnitude and direction of the resultant
O: Explain why speed and velocity differ over a round trip
PRE: Physical quantities and observables
H: Examples
- Scalars: mass, time, temperature, energy, power, charge, speed, distance, pressure, potential.
- Vectors: displacement, velocity, acceleration, force, momentum, electric and magnetic fields, torque, angular momentum.
- Some scalars can be negative (charge, potential, work); negative does not mean "vector".
H: Adding vectors
E: R = A + B; |R|^{2} = A^{2} + B^{2} + 2AB cos θ :: θ is the angle between A and B
P: Resolve into perpendicular components and add those: R_{x} = A_{x} + B_{x}, R_{y} = A_{y} + B_{y}; then |R| = √(R_{x}^{2} + R_{y}^{2}) and tan φ = R_{y}/R_{x}.
X: A boat heads north at 4.0 m s^{-1} across a river flowing east at 3.0 m s^{-1}. Find its velocity over the ground.
> Components are perpendicular: |v| = √(4.0^{2} + 3.0^{2}) = 5.0 m s^{-1}
> Direction: tan φ = 3.0/4.0, φ = 37° east of north
H: Beyond vectors
P: Under rotation of axes, scalars stay the same and vector components mix in a fixed way. Quantities like the stress or the moment of inertia need two indices: they are rank-2 tensors. Pseudovectors (torque, angular momentum, B) behave like vectors under rotation but don't flip under reflection.
!: Speed and velocity are not interchangeable: average speed over a round trip is positive, but average velocity is zero.
Q: Is work a scalar or a vector? | A scalar (the dot product of force and displacement), though it can be negative.
Q: How do you find the magnitude of a vector from its components? | |A| = √(A_{x}^{2} + A_{y}^{2} + A_{z}^{2}).
Q: What is a pseudovector? | A quantity like angular momentum that rotates like a vector but does not change sign under reflection.
M1: Which is a vector? | Momentum | Kinetic energy | Temperature | Power | Momentum p = mv has the direction of v.
M2: Forces of 6 N and 8 N act at 90° to each other. What is the size of the resultant? | 10 N | 14 N | 2 N | 48 N | √(6^{2} + 8^{2}) = 10 N.
M3: Two forces of 5 N give a resultant of 5 N. What is the angle between them? | 120° | 60° | 90° | 45° | R^{2} = 25 + 25 + 50 cos θ = 25, so cos θ = −1/2 and θ = 120°.
T: Scalar | A quantity with magnitude only, unchanged by rotating the axes
T: Vector | A quantity with magnitude and direction, which adds by the parallelogram rule
T: Component | The part of a vector along one axis, such as A_{x} = A cos θ
SUM: Add vectors by components: R_{x} = A_{x} + B_{x}, R_{y} = A_{y} + B_{y}, then |R| = √(R_{x}^{2} + R_{y}^{2}).
SUM: A negative scalar (charge, work) is still a scalar; sign is not direction.
SRC: OpenStax, University Physics Volume 1, chapter 2 "Vectors" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/2-introduction
SRC: Halliday D., Resnick R., Walker J., Fundamentals of Physics, 10th edition, chapter 3 | secondary | 2013
EV: established | Vector addition and the scalar/vector classification are standard results of classical mechanics.
SA2@2: A walker goes 3.0 km east then 4.0 km north. Find their displacement and the distance walked, and explain why they differ. | Displacement is a vector: √(3.0^{2} + 4.0^{2}) = 5.0 km at tan^{-1}(4/3) ≈ 53° north of east. Distance is a scalar, the total path length: 7.0 km. They differ because displacement depends only on the start and end points, while distance adds every part of the path. | displacement 5.0 km ; direction about 53° north of east ; distance 7.0 km ; displacement depends only on start and end points

## Significant figures and scientific notation
S: Significant figures carry the precision of a measurement; scientific notation (a × 10^{n}, 1 ≤ a < 10) makes size and precision explicit. A result should never claim more precision than its data.
---
Q: How many significant figures are in 0.004 050? | Four (4, 0, 5 and the trailing 0); the leading zeros don't count.
LV: Introductory · Foundation
O: Count significant figures and write numbers in scientific notation
O: Round a calculated result to a justified precision
PRE: Unit conversions and prefixes
H: Counting significant figures
- Non-zero digits always count; zeros between them count (4.05 has 3).
- Leading zeros never count (0.0042 has 2).
- Trailing zeros after a decimal point count (2.50 has 3); in 2500 it's ambiguous, so write 2.5 × 10^{3} or 2.50 × 10^{3}.
H: Rules for results
- **Multiplying or dividing**: keep the fewest significant figures of the inputs.
- **Adding or subtracting**: keep the fewest decimal places.
- Keep extra digits during the working; round once, at the end.
X: A car travels 125.0 m in 4.2 s. What is its average speed?
> 125.0/4.2 = 29.761… m s^{-1}
> 4.2 has 2 significant figures, so v = 30 m s^{-1} (or 3.0 × 10^{1} m s^{-1})
H: Precision vs uncertainty
P: Significant figures are a rough guide. The proper statement is a value with an uncertainty: g = 9.81 ± 0.02 m s^{-2}. Quote the uncertainty to 1 (or 2) significant figures, and the value to the same decimal place.
!: Rounding in the middle of a long calculation lets errors build up; carry guard digits.
Q: How many significant figures are in 0.00340? | Three (3, 4 and the trailing 0).
Q: What sets the significant figures of a product? | The input with the fewest significant figures.
Q: How should 1 250 000 with 3 significant figures be written? | 1.25 × 10^{6}.
M1: How many significant figures in 6.020 × 10^{23}? | 4 | 3 | 24 | 2 | All digits of the coefficient count, including the trailing zero.
M2: 12.11 m + 18.0 m + 1.013 m = ? | 31.1 m | 31.123 m | 31.12 m | 31 m | Addition keeps the fewest decimal places (one, from 18.0).
M2: A value is 9.8165 with uncertainty 0.023. How should it be quoted? | 9.82 ± 0.02 | 9.8165 ± 0.023 | 9.8 ± 0.023 | 9.817 ± 0.02 | Round the uncertainty to 1 s.f. and the value to the same decimal place.
T: Significant figures | The digits of a number that carry meaning about its precision
T: Scientific notation | Writing a number as a × 10^{n} with 1 ≤ a < 10
T: Guard digit | An extra digit carried through working to avoid rounding errors
SUM: Multiply or divide: keep the fewest significant figures; add or subtract: keep the fewest decimal places.
SUM: Round once, at the end; the proper statement of precision is an uncertainty.
SRC: JCGM 100, Evaluation of measurement data: Guide to the expression of uncertainty in measurement (GUM), section 7 | standard | 2008 | https://www.bipm.org/en/committees/jc/jcgm/publications
SRC: OpenStax, University Physics Volume 1, section 1.6 "Significant Figures" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/1-6-significant-figures
EV: established | Significant-figure rules are conventions; the GUM's uncertainty statement is the international standard for reporting precision.
M3@2: A student adds 12.31 m, 4.2 m and 0.065 m. How should the total be written? | 16.6 m | 16.575 m | 16.58 m | 17 m | In addition the result keeps the fewest decimal places of the inputs: 4.2 has one, so 16.575 m rounds to 16.6 m.
SA2@1,2: A resistor has V = 4.52 V across it and I = 0.37 A through it. Find R to an appropriate precision and justify it. | R = V/I = 4.52/0.37 = 12.216… Ω. The current has only two significant figures, so the result should have two: R = 12 Ω. | R = V/I calculated ; division rule: fewest significant figures ; 0.37 has two ; R = 12 Ω

## Estimation and order-of-magnitude calculations
S: An order-of-magnitude estimate gets the answer to within a factor of about 10 using rough inputs. It tests whether a result is sensible, guides experiment design, and is a core physicist's skill (a "Fermi problem").
---
Q: Why do errors in a Fermi estimate partly cancel? | The factors are guessed independently, so some are too high and some too low; the product is usually closer than the worst single guess.
LV: Introductory · Application
O: Break a Fermi problem into factors that can be estimated
O: Use reference values to check whether a result is sensible
PRE: Significant figures and scientific notation
H: How to estimate
- Break the problem into factors you can guess (Fermi decomposition).
- Use round numbers and powers of ten; errors in different factors tend to cancel.
- Keep track of units throughout.
- Sanity-check against something known.
H: Useful numbers
- Human: mass ~70 kg, height ~1.7 m, power output ~100 W, walking speed ~1.5 m s^{-1}.
- Earth: radius 6.4 × 10^{6} m, mass 6 × 10^{24} kg, g ≈ 10 m s^{-2}; Earth–Sun 1.5 × 10^{11} m.
- Atom ~10^{-10} m; nucleus ~10^{-15} m; visible light ~5 × 10^{-7} m.
- Water: density 10^{3} kg m^{-3}; specific heat 4.2 kJ kg^{-1} K^{-1}.
X: Estimate the number of air molecules in a classroom.
> Volume ≈ 10 m × 8 m × 3 m ≈ 240 m^{3}
> At room conditions 1 mol occupies ~0.024 m^{3}, so n ≈ 10^{4} mol
> N ≈ 10^{4} × 6 × 10^{23} ≈ 6 × 10^{27} molecules
H: Order of magnitude
P: The order of magnitude of x is the power of ten nearest to it (often taken as round(log_{10} x)). Two quantities "differ by three orders of magnitude" when their ratio is about 1000.
!: Don't give an estimate to several significant figures. "About 6 × 10^{27}" is honest; "5.97 × 10^{27}" is false precision.
Q: What is a Fermi problem? | An estimation problem solved by breaking it into factors that can be roughly guessed.
Q: What is the order of magnitude of the Earth's radius in metres? | 10^{7} m (6.4 × 10^{6} m).
Q: Why do Fermi estimates often work well? | Over- and under-estimates of separate factors tend to partly cancel.
M1: Roughly how many seconds are in a year? | 3 × 10^{7} | 3 × 10^{5} | 9 × 10^{9} | 5 × 10^{6} | 365 × 24 × 3600 ≈ 3.2 × 10^{7} s.
M2: Estimate the kinetic energy of a sprinter at top speed. | ~4 kJ | ~40 J | ~400 kJ | ~4 MJ | ½ × 70 kg × (10 m s^{-1})^{2} ≈ 3.5 kJ.
M3: About how many atoms are in a human body? | 10^{27} to 10^{28} | 10^{23} | 10^{33} | 10^{18} | ~70 kg mostly water (~0.018 kg mol^{-1}, 3 atoms per molecule): ~4000 mol × 3 × 6 × 10^{23} ≈ 7 × 10^{27}.
T: Fermi problem | An estimate built by multiplying rough guesses for several factors
T: Order of magnitude | The power of ten nearest to a value
SUM: Decompose, use round numbers and powers of ten, keep units, then check against something known.
SUM: Quote an estimate to one significant figure; more digits are false precision.
SRC: Weinstein L., Adam J. A., Guesstimation: Solving the World's Problems on the Back of a Cocktail Napkin, Princeton University Press | secondary | 2008
SRC: OpenStax, University Physics Volume 1, section 1.5 "Estimates and Fermi Calculations" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/1-5-estimates-and-fermi-calculations
EV: established | Independent errors in the factors partly cancel, which is why Fermi estimates are usually within a factor of a few.
SA2@1: Estimate the energy needed to boil a full kettle of water from room temperature, stating your assumptions. | Assume 1.5 kg of water heated from 20 °C to 100 °C, a rise of 80 K, with specific heat 4.2 kJ kg^{-1} K^{-1}. E = mcΔT ≈ 1.5 × 4200 × 80 ≈ 5 × 10^{5} J, about 0.5 MJ (ignoring heat lost to the kettle and air). | stated mass of water ; temperature rise of about 80 K ; E = mcΔT ; answer of order 10^{5} to 10^{6} J

## Physical constants
S: Physical constants are quantities that appear in the laws of nature and have the same value everywhere. Some are now exact by definition; others are measured; the dimensionless ones are the deep mysteries.
---
Q: Which fundamental constant is the least precisely measured? | The gravitational constant G, known to about 2 parts in 10^{5}.
LV: Introductory · Foundation
O: Distinguish exact defining constants from measured ones
O: Explain why only dimensionless constants say something about nature itself
PRE: SI base and derived units
H: The defining constants (exact)
- c = 299 792 458 m s^{-1}; h = 6.626 070 15 × 10^{-34} J s; e = 1.602 176 634 × 10^{-19} C
- k_{B} = 1.380 649 × 10^{-23} J K^{-1}; N_{A} = 6.022 140 76 × 10^{23} mol^{-1}
H: Measured constants
- G = 6.674 × 10^{-11} N m^{2} kg^{-2}: the least precisely known (about 2 parts in 10^{5}).
- ε_{0} = 8.854 × 10^{-12} F m^{-1} and μ_{0} ≈ 4π × 10^{-7} H m^{-1}, with c^{2} = 1/(μ_{0}ε_{0}).
- m_{e} = 9.109 × 10^{-31} kg; m_{p} = 1.673 × 10^{-27} kg.
- R = N_{A}k_{B} = 8.314 J mol^{-1} K^{-1}; σ = 5.670 × 10^{-8} W m^{-2} K^{-4}.
H: Dimensionless constants
E: α = e^{2}/(4πε_{0}ħc) ≈ 1/137.036 :: the fine-structure constant, the strength of electromagnetism
E: m_{p}/m_{e} ≈ 1836.15 :: proton-to-electron mass ratio
P: A dimensionless constant has the same value in any system of units, so only these say something about nature rather than about our unit choices. Why they have the values they do is unknown.
K: Constants with dimensions can be set to 1 by choosing units (natural units: c = ħ = 1). Dimensionless constants cannot.
!: Don't confuse g (local gravitational field strength, ~9.81 N kg^{-1}) with G (the universal gravitational constant).
Q: Which fundamental constant is known least precisely? | The gravitational constant G.
Q: What is the fine-structure constant, approximately? | α ≈ 1/137, a dimensionless measure of the strength of electromagnetism.
Q: How are c, ε_{0} and μ_{0} related? | c^{2} = 1/(μ_{0}ε_{0}).
M1: Which constant has an exact defined value in the SI? | Boltzmann constant | Gravitational constant | Electron mass | Fine-structure constant | k_{B} was fixed exactly in 2019 to define the kelvin.
M2: Why are dimensionless constants considered more fundamental? | Their values don't depend on the choice of units | They are always exact | They can be calculated from theory | They are all close to 1 | Only unit-independent numbers can tell different possible universes apart.
M2: What is R/N_{A}? | The Boltzmann constant | The Stefan constant | The Faraday constant | Planck's constant | R = N_{A}k_{B}, so k_{B} = R/N_{A}.
T: Fine-structure constant | α = e^{2}/(4πε_{0}ħc) ≈ 1/137, the dimensionless strength of electromagnetism
T: Natural units | A unit system in which constants such as c and ħ are set equal to 1
SUM: c, h, e, k_{B} and N_{A} are exact by definition; G is the least precisely known constant.
SUM: Dimensionless constants (α, m_{p}/m_{e}) are the same in every unit system.
SRC: NIST, CODATA Internationally recommended values of the fundamental physical constants | data | 2018 | https://physics.nist.gov/cuu/Constants/
SRC: Tiesinga E. et al., "CODATA recommended values of the fundamental physical constants: 2018", Reviews of Modern Physics 93, 025010 | data | 2021 | https://doi.org/10.1103/RevModPhys.93.025010
EV: established | The values quoted are CODATA 2018; measured constants are revised slightly in each CODATA adjustment.
M3@2: Why can't the fine-structure constant be set to 1 by choosing units, as c can? | It is dimensionless, so its value is the same in every system of units | It is too small a number to be rescaled to 1 | It is fixed by the definition of the kilogram | It changes whenever the speed of light changes | Choosing units can only rescale quantities that have dimensions; a pure number such as α ≈ 1/137 is unit-independent.
SA2@1: Explain the difference between g and G, giving a value and unit for each. | G is the universal gravitational constant, 6.674 × 10^{-11} N m^{2} kg^{-2}, the same everywhere. g is the local gravitational field strength (or free-fall acceleration), about 9.81 N kg^{-1} at Earth's surface, which varies with place: g = GM/r^{2}. | G is universal ; G ≈ 6.67 × 10^{-11} N m^{2} kg^{-2} ; g is local and varies ; g ≈ 9.81 N kg^{-1} ; g = GM/r^{2}

## Mathematical modelling
S: A mathematical model represents a physical system with variables and equations so its behaviour can be predicted. Building one means choosing what matters, writing laws as equations, solving, and testing against reality.
---
Q: What does Newton's law of cooling assume? | The rate of heat loss is proportional to the temperature difference from the surroundings, so the excess temperature decays exponentially.
LV: Introductory · Application
O: Describe the stages of the modelling cycle
O: Build and test a simple model, such as Newton's law of cooling
O: Recognise overfitting
PRE: Estimation and order-of-magnitude calculations
H: The modelling cycle
- **Identify** the system, the question and the quantities that matter.
- **Assume**: decide what to neglect (friction, air resistance, the size of an object).
- **Formulate**: apply laws (Newton's second law, conservation of energy, Kirchhoff's rules) to get equations.
- **Solve** analytically, approximately or numerically.
- **Validate**: compare with data; check limits, units and orders of magnitude.
- **Refine**: add what was neglected if the model fails.
H: Types of model
- Analytic (closed-form) vs numerical (simulation).
- Continuous (differential equations) vs discrete (difference equations, cellular automata).
- Linear vs nonlinear: linear models obey superposition; nonlinear ones can be chaotic.
- Empirical (fitted to data) vs mechanistic (derived from principles).
X: Model a cooling cup of tea.
> Assume the heat loss rate is proportional to the temperature difference: dT/dt = −k(T − T_{room})
> Solve: T(t) = T_{room} + (T_{0} − T_{room}) e^{−kt}
> Validate: measure T(t); a straight line of ln(T − T_{room}) against t confirms the model and gives k
K: "All models are wrong, but some are useful" (George Box). A model is judged by how well it predicts in its domain, not by being literally true.
!: Fitting many parameters to a few data points can match anything and predict nothing (overfitting).
Q: What are the main stages of the modelling cycle? | Identify, assume, formulate, solve, validate, refine.
Q: What property do linear models have that nonlinear ones generally lack? | Superposition: the response to a sum of inputs is the sum of the responses.
Q: How can you test an exponential cooling model with data? | Plot ln(T − T_{room}) against t; a straight line supports it and its gradient gives −k.
M1: Which step checks a model against measurements? | Validation | Formulation | Idealisation | Discretisation | Validation compares predictions with data.
M2: A model with 12 parameters fits 10 data points perfectly. What is the concern? | Overfitting: it may have no predictive power | It must be correct | It is underdetermined so cannot be solved | It violates conservation of energy | More free parameters than data can fit noise, not physics.
T: Mathematical model | A representation of a system by variables and equations, used to predict its behaviour
T: Validation | Comparing a model's predictions with independent data
T: Overfitting | Using so many adjustable parameters that a model fits noise and fails to predict
SUM: Identify, assume, formulate, solve, validate, refine.
SUM: A model is judged by its predictions within its domain, not by being literally true.
SRC: Box G. E. P., "Science and Statistics", Journal of the American Statistical Association 71, 791–799 | primary | 1976 | https://doi.org/10.1080/01621459.1976.10480949
SRC: Fowler A. C., Mathematical Models in the Applied Sciences, Cambridge University Press | secondary | 1997
EV: established | Newton's law of cooling is a good model when convection dominates and the temperature difference is modest; radiation makes it less accurate at large differences.
M3@2,3: Tea cools from 80 °C to 50 °C in 10 minutes in a 20 °C room. Using Newton's law of cooling, what is its temperature after another 10 minutes? | 35 °C | 20 °C | 30 °C | 40 °C | The excess over the room falls by the same factor in equal times: 60 → 30 K is a factor of 1/2, so 30 → 15 K, giving 20 + 15 = 35 °C.
SA2@1,3: A student fits a 9th-degree polynomial exactly through 10 measured points. Explain why this may be a poor model. | With as many parameters as data points, the curve can pass through every point, including its random errors, so it fits noise rather than the physics. Between and beyond the points it can oscillate wildly and predict badly. A simpler model with a physical basis, tested on new data, is more trustworthy. | as many parameters as points ; fits the noise ; poor prediction between or beyond the data ; prefer a simpler physically motivated model tested on new data

## Idealisation and simplifying assumptions
S: Idealisation replaces a messy real system with a simpler one that keeps the essential physics: point masses, frictionless surfaces, ideal gases, thin lenses. The skill is knowing when the simplification is valid.
---
Q: When is a simplifying assumption justified? | When the effect neglected is much smaller than the effect kept; check by estimating their ratio.
LV: Introductory · Application
O: Name common idealisations in mechanics, thermal physics and circuits
O: Justify or reject a simplification by estimating the ratio of the neglected effect to the main one
PRE: Mathematical modelling
H: Common idealisations
- **Point particle**: size irrelevant when it is much smaller than the distances involved.
- **Rigid body**: deformation negligible.
- **Frictionless, massless, inextensible**: strings, pulleys and surfaces in mechanics.
- **Ideal gas**: point molecules with no forces between them except in collisions.
- **Ideal components**: zero-resistance wires, ideal voltmeters (infinite resistance), ideal ammeters (zero resistance).
- **Small-angle approximation**: sin θ ≈ θ, cos θ ≈ 1 − θ^{2}/2 for θ ≪ 1 rad.
H: Justifying a simplification
P: An approximation is justified when the neglected effect is small compared with the effect kept. Compare their sizes: estimate the ratio of the neglected term to the main term. If it is ≪ 1, you are safe; if it is close to 1, the model needs that term.
X: When can air resistance on a falling ball be neglected?
> Drag ≈ ½ρC_{d}Av^{2}; weight = mg
> For a 0.06 kg tennis ball at 5 m s^{-1}: drag ≈ ½ × 1.2 × 0.5 × 0.0034 × 25 ≈ 0.026 N; weight ≈ 0.59 N
> Ratio ~4%: fine for a rough model, not for a precise one; at 30 m s^{-1} drag exceeds the weight
K: Idealisations are not errors. They are controlled approximations, and a good physicist states them and checks their limits.
!: An idealisation valid in one regime can fail badly in another (the small-angle pendulum at 60°, ideal gas at high pressure).
Q: When can an object be treated as a point particle? | When its size is negligible compared with the other distances in the problem, and rotation doesn't matter.
Q: What is the small-angle approximation for sin θ? | sin θ ≈ θ (in radians) for θ ≪ 1.
Q: How do you check an approximation is valid? | Estimate the ratio of the neglected effect to the retained one; it should be ≪ 1.
M1: An ideal voltmeter has what resistance? | Infinite | Zero | Equal to the circuit's | 1 MΩ exactly | It should draw no current from the circuit it measures.
M2: The small-angle approximation for a pendulum is about 1% wrong at around which amplitude? | 0.4 rad (about 23°) | 0.04 rad | 1.0 rad | 1.5 rad | The period's correction is about θ_{0}^{2}/16; this reaches 1% near θ_{0} ≈ 0.4 rad.
T: Idealisation | Replacing a real system with a simpler one that keeps the essential physics
T: Small-angle approximation | sin θ ≈ θ and cos θ ≈ 1 − θ^{2}/2 for θ ≪ 1 rad
SUM: A simplification is safe when the neglected effect is much smaller than the effect kept: estimate the ratio.
SUM: State every idealisation, and check its limits when the conditions change.
SRC: OpenStax, University Physics Volume 1, section 15.4 "Pendulums" (small-angle approximation) | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/15-4-pendulums
SRC: Feynman R. P., Leighton R. B., Sands M., The Feynman Lectures on Physics, vol. I, chapter 12 "Characteristics of Force" | secondary | 1963 | https://www.feynmanlectures.caltech.edu/I_12.html
EV: established | The size of the neglected term can be estimated in each case; the error of the small-angle period is under 1% below about 23°.
M3@2: For which angle is sin θ ≈ θ accurate to better than 1%? | 0.2 rad | 1.0 rad | 0.8 rad | 1.5 rad | sin θ ≈ θ − θ^{3}/6, so the relative error is about θ^{2}/6; at 0.2 rad that is 0.7%, at 1.0 rad about 16%.
SA2@2: An ammeter with resistance 0.5 Ω is placed in series with a 1000 Ω resistor. Is it reasonable to treat the ammeter as ideal? Justify with a ratio. | The ammeter adds 0.5 Ω to 1000 Ω, a ratio of 0.5/1000 = 0.05%, so it changes the current by about 0.05%. That is far below typical measurement uncertainty, so treating the ammeter as ideal (zero resistance) is justified. With a 1 Ω resistor it would not be. | ideal ammeter has zero resistance ; ratio 0.5/1000 ; effect about 0.05% ; justified here but not for a small resistance

## Deterministic and probabilistic models
S: A deterministic model gives one future from a given present; a probabilistic model gives a distribution of possible outcomes. Physics uses both: probability enters through ignorance (statistical mechanics, chaos) or, in quantum mechanics, fundamentally.
---
Q: How do relative fluctuations depend on the number of particles N? | They scale as 1/√N, so they are negligible for N ~ 10^{23}.
LV: Introductory · Foundation
O: Distinguish deterministic from probabilistic models
O: Explain the three routes by which probability enters physics: many particles, chaos and quantum mechanics
O: Use 1/√N to judge when a random process looks smooth
PRE: Mathematical modelling
H: Deterministic models
P: Newtonian mechanics and Maxwell's equations are deterministic: exact initial conditions fix the whole future. Laplace imagined an intellect that could predict everything from the present state.
H: Where probability comes in
- **Many degrees of freedom**: we cannot track 10^{23} molecules, so we describe them with distributions (Maxwell–Boltzmann). This is statistical mechanics.
- **Chaos**: deterministic but sensitive to initial conditions; errors grow like e^{λt} (λ is the Lyapunov exponent), so long-term prediction becomes probabilistic in practice.
- **Quantum mechanics**: the Born rule gives probabilities |ψ|^{2}; according to standard quantum mechanics, the randomness of outcomes (e.g. which nucleus decays next) is fundamental, not due to ignorance.
- **Measurement noise**: every measurement is modelled as a value plus a random error.
E: P(x) = |ψ(x)|^{2} :: Born rule: probability density of finding a particle at x
E: N(t) = N_{0} e^{−λt} :: radioactive decay: deterministic for large N, random for single nuclei
X: A sample has 10^{20} nuclei; another has 10. Which follows N_{0}e^{−λt} closely?
> Fluctuations scale like √N, so relative fluctuations are 1/√N
> 10^{20}: 10^{-10} (smooth exponential); 10: about 30% (visibly random)
!: Chaotic does not mean random. A chaotic system follows exact laws; it is unpredictable only because we can't know the initial state perfectly.
Q: What is the Born rule? | The probability density for finding a particle at x is |ψ(x)|^{2}.
Q: How do relative fluctuations scale with the number N of independent events? | As 1/√N.
Q: Is a chaotic system deterministic? | Yes; it follows deterministic laws but is extremely sensitive to initial conditions.
M1: Which is a fundamentally probabilistic process in standard physics? | The decay time of a single radioactive nucleus | The orbit of the Moon | A ball rolling down a ramp | Current in a resistor | Quantum decay of an individual nucleus is random in principle.
M2: Weather can't be forecast beyond about two weeks mainly because: | Small errors in initial conditions grow exponentially (chaos) | The laws of fluid dynamics are unknown | Weather is a quantum process | Computers are too slow | Atmospheric dynamics are chaotic, with a short Lyapunov time.
T: Deterministic model | One in which the present state fixes a single future
T: Chaos | Deterministic behaviour so sensitive to initial conditions that long-term prediction fails in practice
T: Born rule | The probability density of a measurement outcome is |ψ|^{2}
SUM: Probability enters physics through many degrees of freedom, through chaos, and fundamentally through quantum mechanics.
SUM: Relative fluctuations scale as 1/√N, so large systems look deterministic.
SRC: Lorenz E. N., "Deterministic nonperiodic flow", Journal of the Atmospheric Sciences 20, 130–141 | primary | 1963 | https://doi.org/10.1175/1520-0469(1963)020%3C0130:DNF%3E2.0.CO;2
SRC: OpenStax, University Physics Volume 3, section 7.1 "Wave Functions" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/7-1-wave-functions
EV: established | Chaos and the statistics of large N are established. Whether quantum randomness is fundamental depends on the interpretation of quantum mechanics; the standard view treats it as fundamental.
M3@2,3: A chaotic system's prediction error grows as e^{λt} with λ = 1 per day. Improving the initial measurement a thousandfold extends the useful forecast by about how long? | About 7 days | About 1000 days | About 3 days | It makes no difference | The error reaches a given size when e^{λt} grows by a fixed factor; a factor 1000 smaller start buys ln 1000 ≈ 6.9 days.
SA2@3: A detector records about 100 counts per second from a radioactive source. Explain why successive one-second counts differ, and estimate the typical size of the variation. | Each decay is random, so the number in each second fluctuates about the mean. For a Poisson process the standard deviation is √N ≈ √100 = 10 counts, about 10% of the mean. Counting for longer reduces the relative fluctuation as 1/√N. | individual decays are random ; Poisson statistics ; spread about √N = 10 ; relative fluctuation falls as 1/√N

## Conservation laws
S: A conservation law states that some quantity of an isolated system stays constant however the system changes. Energy, momentum, angular momentum and charge are conserved in every known interaction, and conservation laws are often the fastest route to an answer.
---
Q: Which quantities are conserved in an inelastic collision? | Momentum and total energy; kinetic energy is not.
LV: Introductory · Application
O: State the main conservation laws and the conditions under which each applies
O: Use conservation of momentum and energy to solve a collision
PRE: Scalar and vector quantities
H: The main conservation laws
- **Energy**: total energy is constant; it changes form (kinetic, potential, thermal, radiation, mass via E = mc^{2}).
- **Linear momentum**: constant when the net external force is zero.
- **Angular momentum**: constant when the net external torque is zero.
- **Electric charge**: conserved locally (a continuity equation).
- **Baryon and lepton number**: conserved in all observed processes.
- Approximately conserved: strangeness (broken by the weak force), parity.
E: Σp_{before} = Σp_{after} :: isolated system
E: ∂ρ/∂t + ∇·J = 0 :: local conservation of charge (continuity equation)
X: A 2.0 kg trolley at 3.0 m s^{-1} hits and sticks to a stationary 1.0 kg trolley. Find the final speed and the kinetic energy lost.
> Momentum: 2.0 × 3.0 = 3.0 v, so v = 2.0 m s^{-1}
> KE before = ½ × 2 × 9 = 9.0 J; after = ½ × 3 × 4 = 6.0 J; 3.0 J becomes heat and sound
H: Local vs global
P: Local conservation is stronger than global: charge can't vanish here and appear on the Moon; it must flow through the space in between. Field theories express this with continuity equations.
K: Conservation laws let you relate "before" and "after" without knowing the details of what happened in between.
!: Kinetic energy is not conserved in inelastic collisions, but total energy and momentum still are.
Q: When is linear momentum conserved? | When the net external force on the system is zero.
Q: What does local conservation of charge mean? | Charge can only change in a region by flowing through its boundary (∂ρ/∂t + ∇·J = 0).
Q: In an inelastic collision what is conserved? | Momentum and total energy; kinetic energy is not.
M1: A skater pulls in their arms and spins faster. Which quantity is conserved? | Angular momentum | Kinetic energy | Angular velocity | Moment of inertia | No external torque, so L = Iω is constant; I falls so ω rises.
M2: A 60 kg person jumps off a 140 kg boat at 2.0 m s^{-1}. The boat was at rest. What is the boat's speed? | 0.86 m s^{-1} | 2.0 m s^{-1} | 4.7 m s^{-1} | 0.43 m s^{-1} | 0 = 60 × 2.0 − 140v, so v = 0.86 m s^{-1} the other way.
M3: Which process is forbidden by a conservation law? | p → e^{+} + γ | n → p + e^{−} + ν̄_{e} | γ → e^{−} + e^{+} near a nucleus | π^{0} → γ + γ | p → e^{+} + γ would violate baryon number (and lepton number).
T: Isolated system | A system with no net external force, torque or exchange of the conserved quantity
T: Inelastic collision | One in which kinetic energy is not conserved, though momentum and total energy are
T: Continuity equation | ∂ρ/∂t + ∇·J = 0: the local form of a conservation law
SUM: Energy, momentum, angular momentum and charge are conserved in every known interaction.
SUM: Momentum is conserved in all collisions; kinetic energy only in elastic ones.
SRC: OpenStax, University Physics Volume 1, chapter 9 "Linear Momentum and Collisions" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/9-introduction
SRC: Particle Data Group, Review of Particle Physics, "Tests of conservation laws" | data | 2024 | https://pdg.lbl.gov/
EV: established | No violation of energy, momentum, angular momentum or charge conservation has ever been observed; the proton's lifetime exceeds 10^{34} years, consistent with baryon-number conservation.
SA2@2: A 0.20 kg ball moving at 5.0 m s^{-1} hits a stationary 0.30 kg ball head-on. The first ball stops. Find the second ball's speed and decide whether the collision is elastic. | Momentum: 0.20 × 5.0 = 0.30 v, so v = 3.3 m s^{-1}. KE before = ½ × 0.20 × 25 = 2.5 J; after = ½ × 0.30 × 3.33^{2} ≈ 1.7 J. KE fell, so the collision is inelastic. | momentum conserved ; v ≈ 3.3 m s^{-1} ; KE before 2.5 J and after about 1.7 J ; inelastic because KE decreased

## Symmetry and invariance
S: A symmetry is a transformation that leaves the laws of physics unchanged. Noether's theorem shows that every continuous symmetry of the laws corresponds to a conserved quantity: the deepest reason conservation laws exist.
---
X: Use symmetry to find the electric field at the centre of a uniformly charged ring.
> Every element of charge has a partner directly opposite it
> Their fields at the centre are equal and opposite, so they cancel in pairs
> E = 0 at the centre, with no integration needed
Q: Which symmetry gives conservation of linear momentum? | Space-translation symmetry: the laws are the same at every place.
LV: Intermediate · Foundation
O: State Noether's theorem and match each continuous symmetry to its conserved quantity
O: Distinguish continuous from discrete, and global from local, symmetries
O: Explain spontaneous symmetry breaking with an example
PRE: Conservation laws
H: Noether's theorem
- Time-translation symmetry (laws the same today and tomorrow) → **energy** conservation.
- Space-translation symmetry (same here and there) → **linear momentum** conservation.
- Rotational symmetry (no preferred direction) → **angular momentum** conservation.
- Global phase (gauge) symmetry of the wavefunction → **charge** conservation.
H: Kinds of symmetry
- **Continuous** (rotations by any angle) vs **discrete** (reflection P, time reversal T, charge conjugation C).
- **Global** vs **local (gauge)**: requiring local gauge symmetry forces the existence of force fields; electromagnetism follows from local U(1) symmetry.
- **Invariance** of a quantity (the spacetime interval in relativity) vs **covariance** of an equation (keeps its form).
H: Broken symmetries
P: A symmetry of the laws need not be a symmetry of the state. A ferromagnet's laws have no preferred direction, but below the Curie temperature the magnetisation picks one: spontaneous symmetry breaking. The Higgs mechanism is the same idea for particle masses. The weak force violates P and CP outright.
K: Symmetry arguments often solve problems with no calculation: by symmetry, the field at the centre of a uniform ring of charge is zero.
!: Energy is not conserved in systems whose laws change in time (an expanding universe, a driven oscillator); Noether tells you exactly why.
Q: State Noether's theorem informally. | Every continuous symmetry of the laws of physics corresponds to a conserved quantity.
Q: Which symmetry gives conservation of energy? | Invariance under translation in time.
Q: What is spontaneous symmetry breaking? | When the laws have a symmetry but the system's lowest-energy state does not.
M1: Conservation of angular momentum follows from which symmetry? | Rotational invariance | Time-translation invariance | Reflection symmetry | Gauge invariance | Noether: rotations ↔ angular momentum.
M2: Which interaction violates parity symmetry? | The weak interaction | Electromagnetism | Gravity | The strong interaction | Wu's 1957 cobalt-60 experiment showed the weak force distinguishes left from right.
M3: In cosmology, why isn't the energy of light conserved as the universe expands? | The expanding spacetime isn't time-translation invariant | Photons are absorbed by dark matter | Energy is never conserved in relativity | Light loses energy to friction with space | Without time-translation symmetry, Noether's theorem gives no energy conservation; photons redshift.
T: Symmetry | A transformation that leaves the laws of physics unchanged
T: Noether's theorem | Every continuous symmetry of the action corresponds to a conserved quantity
T: Spontaneous symmetry breaking | A state that lacks a symmetry the laws have, such as a magnet choosing a direction
SUM: Time translation → energy; space translation → momentum; rotation → angular momentum; global phase → charge.
SUM: The laws can be symmetric while the state is not: that is spontaneous symmetry breaking.
SRC: Noether E., "Invariante Variationsprobleme", Nachrichten von der Gesellschaft der Wissenschaften zu Göttingen, 235–257 | primary | 1918
SRC: Feynman R. P., Leighton R. B., Sands M., The Feynman Lectures on Physics, vol. I, chapter 52 "Symmetry in Physical Laws" | secondary | 1963 | https://www.feynmanlectures.caltech.edu/I_52.html
EV: established | Noether's theorem is a proven mathematical result for systems described by an action.
SA2@1,3: Explain why angular momentum is conserved for a planet orbiting the Sun, first using torque and then using symmetry. | Torque: gravity acts along the line to the Sun, so r × F = 0 and there is no torque to change L. Symmetry: the Sun's gravity is the same in every direction (spherically symmetric), so the laws are unchanged by rotation about the Sun, and Noether's theorem gives conservation of angular momentum. | central force gives zero torque ; rotational symmetry of the potential ; Noether's theorem links rotation to angular momentum

## Physical laws, principles and theories
S: Physicists use these words for different things. A law summarises a regularity, often as an equation; a principle is a broad guiding statement; a theory is an explanatory framework that ties laws together and makes new predictions.
---
Q: Name a principle used to build theories. | Examples: conservation of energy, the principle of relativity, least action, the equivalence principle, the Pauli exclusion principle.
LV: Introductory · Foundation
O: Distinguish a law, a principle, a theory, a hypothesis and a model
O: Explain how a newer theory contains an older one as a limit
PRE: Conservation laws
H: Definitions
- **Law**: a concise, empirically tested regularity: Hooke's law, Ohm's law, Newton's law of gravitation, Snell's law. Many hold only in a range (Hooke's law up to the limit of proportionality).
- **Principle**: a general rule used to build theories: conservation of energy, the principle of relativity, least action, the Pauli exclusion principle, the equivalence principle.
- **Theory**: a well-tested framework of concepts, laws and mathematics: Newtonian mechanics, electromagnetism, quantum mechanics, general relativity.
- **Hypothesis**: a testable proposed explanation, not yet well established.
- **Model**: a simplified representation used to apply a theory to a particular system.
H: Theories in science
P: In everyday speech "theory" means a guess. In science it is the highest status an explanation reaches: general relativity is "only a theory" in the same sense as the theory that matter is made of atoms. Theories are never final; they are superseded by broader ones that reduce to them in a limit (correspondence).
X: How Newtonian gravity relates to general relativity.
> For weak fields and speeds ≪ c, GR's equations reduce to Newton's
> GR predicts what Newton can't: Mercury's 43″ per century extra perihelion shift, light bending, gravitational waves
K: Empirical laws (Ohm's law) describe; theories (the Drude model, band theory) explain why the law holds and when it fails.
!: Laws are not "proved" theories. Laws describe; theories explain. A law can be very well established and still only approximately true.
Q: What is the difference between a law and a theory? | A law describes a regularity (often an equation); a theory is an explanatory framework that accounts for laws and predicts new phenomena.
Q: What is the correspondence principle? | A new theory must reproduce the old, successful theory in the domain where the old one worked.
Q: Give two examples of physical principles. | Conservation of energy; the principle of relativity; least action; Pauli exclusion; equivalence principle.
M1: Ohm's law is best described as: | An empirical law with a limited range of validity | A fundamental principle | A complete theory of conduction | A hypothesis | V ∝ I holds for metallic conductors at constant temperature, not for diodes or lamps.
M2: Which observation could Newtonian gravity NOT explain? | The extra precession of Mercury's perihelion | The shape of planetary orbits | The tides | The period of the Moon | General relativity accounts for the extra 43″ per century.
T: Law | A concise, tested regularity, often an equation, that may hold only in a range
T: Theory | A well-tested explanatory framework of concepts, laws and mathematics
T: Correspondence | A newer theory reproducing an older one in the older one's regime
SUM: Laws describe regularities; theories explain them; principles guide how theories are built.
SUM: A theory in science is the highest status an explanation reaches, not a guess.
SRC: Will C. M., "The Confrontation between General Relativity and Experiment", Living Reviews in Relativity 17, 4 | primary | 2014 | https://doi.org/10.12942/lrr-2014-4
SRC: Feynman R. P., The Character of Physical Law, MIT Press | secondary | 1965
EV: established | General relativity reduces to Newtonian gravity for weak fields and low speeds, and has passed every precision test so far.
M3@1,2: Ohm's law fails for a filament lamp. What does this show about the law? | It is an empirical law that holds only in a range (constant temperature, ohmic materials) | It shows Ohm's law has now been disproved | It shows the lamp breaks conservation of energy | It shows laws apply only to ideal components | A law summarises a regularity within its domain; a theory of conduction explains why resistance changes with temperature.
SA2@2: Use special relativity and Newtonian mechanics to explain what it means for a new theory to contain an old one. | Special relativity gives the kinetic energy (γ − 1)mc^{2}. For v ≪ c, γ ≈ 1 + v^{2}/(2c^{2}), so the kinetic energy becomes ½mv^{2}, Newton's result. The old theory is recovered as a limit of the new one, which is why Newtonian mechanics still works at everyday speeds. | relativistic expression stated ; limit v ≪ c ; reduces to ½mv^{2} ; old theory valid in its regime

## Classical and modern physics
S: Classical physics (mechanics, thermodynamics, electromagnetism before 1900) works superbly for everyday scales. Modern physics (relativity and quantum mechanics) was needed where it failed: at speeds near c, in strong gravity and at atomic scales.
---
Q: When do relativistic corrections become significant? | When v/c is about 0.1 or more (γ − 1 ≈ 0.5%), or when gravity is strong.
LV: Introductory · Foundation
O: Describe the experimental failures of classical physics that led to relativity and quantum theory
O: Use simple criteria to decide when relativistic or quantum effects matter
PRE: Physical laws, principles and theories
H: The failures that started modern physics
- **Black-body radiation**: classical theory predicted infinite UV emission (the ultraviolet catastrophe); Planck's quantum hypothesis E = hf fixed it (1900).
- **Photoelectric effect**: electron energy depends on frequency, not intensity; Einstein's photons (1905).
- **Atomic stability and spectra**: classical electrons should spiral into the nucleus; Bohr (1913), then quantum mechanics (1925–26).
- **Constancy of the speed of light**: Michelson–Morley found no ether drift; special relativity (1905).
- **Mercury's perihelion**: general relativity (1915).
H: When do you need modern physics?
E: v/c ≳ 0.1 :: relativistic corrections become significant (γ − 1 ≈ 0.5%)
E: λ_{dB} = h/p ≳ size of the system :: quantum effects matter
E: GM/(rc^{2}) not ≪ 1 :: strong gravity needs general relativity
K: Modern physics doesn't make classical physics wrong in its domain; it shows where that domain ends. Engineers still design bridges with Newton.
!: Quantum effects are not only microscopic: superconductivity, lasers, semiconductors, the stability of matter and the colour of gold are quantum (and relativistic) phenomena you can see.
Q: What was the ultraviolet catastrophe? | The classical prediction that a black body emits infinite power at short wavelengths.
Q: Which experiment found no evidence for the ether? | The Michelson–Morley experiment (1887).
Q: When are quantum effects important for a particle? | When its de Broglie wavelength is comparable to or larger than the size of the system.
M1: Which phenomenon required the photon concept? | The photoelectric effect | Refraction | Diffraction of sound | Thermal expansion | Electron emission depends on frequency, not intensity: light comes in quanta hf.
M2: At what speed is γ about 1.005? | About 0.1c | About 0.01c | About 0.5c | About 0.9c | γ ≈ 1 + v^{2}/(2c^{2}) = 1.005 when v/c ≈ 0.1.
T: Ultraviolet catastrophe | The classical prediction of infinite short-wavelength emission from a black body
T: de Broglie wavelength | λ = h/p, the wavelength associated with a particle of momentum p
SUM: Black-body radiation, the photoelectric effect, atomic stability and the constancy of c broke classical physics.
SUM: Relativity matters for v ≳ 0.1c; quantum effects matter when λ = h/p is comparable to the system's size.
SRC: OpenStax, University Physics Volume 3, chapter 6 "Photons and Matter Waves" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/6-introduction
SRC: Einstein A., "Über einen die Erzeugung und Verwandlung des Lichtes betreffenden heuristischen Gesichtspunkt", Annalen der Physik 17, 132–148 | primary | 1905
EV: established | Each historical failure listed is well documented, and modern physics resolves it quantitatively.
M3@2: An electron has a de Broglie wavelength of about 0.1 nm. Should it be treated quantum mechanically inside an atom of size 0.1 nm? | Yes: its wavelength is comparable to the size of the system | No: electrons can always be treated classically | No: only light needs a quantum description | Only if the electron moves faster than light | When λ = h/p is comparable to the system, wave effects dominate and classical trajectories are meaningless.
SA2@2: A spacecraft travels at 11 km s^{-1}. Estimate v/c and decide whether relativity is needed to calculate its kinetic energy to 1%. | v/c = 1.1 × 10^{4} / 3.0 × 10^{8} ≈ 4 × 10^{-5}. The relativistic correction to kinetic energy is about (3/4)(v/c)^{2} ≈ 10^{-9} of the total, far below 1%, so Newtonian ½mv^{2} is enough. (Precise navigation timing, though, can need relativistic corrections.) | v/c ≈ 4 × 10^{-5} ; correction of order (v/c)^{2} ; far below 1% ; Newtonian mechanics suffices

## Microscopic and macroscopic descriptions
S: A macroscopic description uses a few bulk variables (pressure, temperature, volume); a microscopic one tracks the constituents (molecules, electrons). Statistical mechanics connects them, explaining bulk laws as averages over huge numbers of particles.
---
Q: What does S = k_{B} ln Ω relate? | The entropy of a macrostate to the number Ω of microstates consistent with it.
LV: Intermediate · Foundation
O: Distinguish macrostates from microstates
O: Explain how bulk properties such as pressure and temperature emerge from molecular motion
O: Explain why fluctuations are invisible in large systems
PRE: Deterministic and probabilistic models
H: Two levels
- **Macrostate**: specified by bulk variables like P, V, T, U.
- **Microstate**: the exact state of every particle. One macrostate corresponds to an enormous number Ω of microstates.
E: S = k_{B} ln Ω :: Boltzmann's entropy: the bridge between levels
E: ½m⟨c^{2}⟩ = (3/2)k_{B}T :: temperature measures mean molecular kinetic energy (ideal gas)
H: Emergence
P: Some properties exist only at the macroscopic level: temperature, pressure, entropy, rigidity, superconductivity, phase transitions. They emerge from collective behaviour. "More is different" (P. W. Anderson): new laws appear at each level of complexity, even though nothing violates the microscopic laws.
X: Derive pressure from molecular collisions (outline).
> A molecule hitting a wall reverses its x-momentum: Δp = 2mc_{x}
> Summing over N molecules in volume V gives pV = (1/3)Nm⟨c^{2}⟩
> Combined with pV = Nk_{B}T, this gives ½m⟨c^{2}⟩ = (3/2)k_{B}T
K: Fluctuations relative to the mean scale as 1/√N; with N ~ 10^{23} they are invisible, which is why thermodynamics looks deterministic.
!: Temperature is not a property of a single molecule; it describes the distribution of energies in a large collection.
Q: What is the difference between a microstate and a macrostate? | A microstate specifies every particle; a macrostate gives bulk variables, and corresponds to many microstates.
Q: What is Boltzmann's entropy formula? | S = k_{B} ln Ω, where Ω is the number of microstates.
Q: What does "emergent" mean in physics? | A property of the collective system that its individual parts don't have, like temperature or rigidity.
M1: Which is a macroscopic variable? | Pressure | The velocity of one molecule | An electron's spin | A nucleus's position | Pressure is a bulk average.
M2: The mean kinetic energy of an ideal gas molecule at 300 K is about: | 6 × 10^{-21} J | 4 × 10^{-23} J | 1 eV | 6 × 10^{-19} J | (3/2)k_{B}T = 1.5 × 1.38 × 10^{-23} × 300 ≈ 6.2 × 10^{-21} J (≈ 0.04 eV).
T: Macrostate | The state of a system given by bulk variables such as P, V, T and U
T: Microstate | The exact state of every particle in a system
T: Emergence | Properties that exist only for large collections, such as temperature or rigidity
SUM: One macrostate corresponds to an enormous number of microstates; S = k_{B} ln Ω links the two.
SUM: Temperature measures mean molecular kinetic energy: ½m⟨c^{2}⟩ = (3/2)k_{B}T for an ideal gas.
SRC: Blundell S. J., Blundell K. M., Concepts in Thermal Physics, 2nd edition, Oxford University Press | secondary | 2010
SRC: Anderson P. W., "More is different", Science 177, 393–396 | primary | 1972 | https://doi.org/10.1126/science.177.4047.393
EV: established | Kinetic theory and Boltzmann's entropy are established; the ideal-gas result applies to dilute gases.
M3@2,3: How does the root-mean-square speed of gas molecules change when the absolute temperature is quadrupled? | It doubles | It quadruples | It is unchanged | It increases sixteenfold | ½m⟨c^{2}⟩ ∝ T, so c_{rms} ∝ √T; four times T gives twice the speed.
SA2@2: Outline how the pressure of a gas arises from molecular collisions with a wall. | Each molecule hitting the wall reverses its momentum component, a change of 2mc_{x}. Many molecules hit per second, so the wall receives a steady rate of momentum transfer, which is a force; force per unit area is pressure. Summing over N molecules gives pV = (1/3)Nm⟨c^{2}⟩. | momentum change 2mc_{x} per collision ; rate of momentum change is force ; force per area is pressure ; pV = (1/3)Nm⟨c^{2}⟩

## Uncertainty and measurement limitations
S: No measurement is exact. Every result carries an uncertainty from random scatter, systematic bias and instrument resolution, and ultimately from fundamental quantum limits. Reporting a value without its uncertainty tells only half the story.
---
Q: How does the uncertainty in a mean fall with the number of repeats n? | As 1/√n: the standard error is σ/√n.
LV: Introductory · Application
O: Distinguish random, systematic and resolution uncertainties
O: Calculate the standard error of a mean and combine uncertainties
O: Explain why averaging cannot remove a systematic error
PRE: Significant figures and scientific notation
H: Sources of uncertainty
- **Random**: scatter that averages down with repeats (uncertainty in the mean ∝ 1/√n).
- **Systematic**: a consistent bias (zero error, calibration, parallax); repeats don't reduce it. Find it by calibration or a different method.
- **Resolution**: the smallest scale division or digit; reading uncertainty is often taken as half a division.
H: Precision, accuracy, repeatability
- **Precise**: small spread. **Accurate**: close to the true value. A result can be precise and inaccurate (systematic error).
- **Repeatable**: same method, same person. **Reproducible**: different people, methods or labs.
E: σ_{mean} = σ/√n :: standard error of the mean from n repeats
E: (Δz/z)^{2} = (Δx/x)^{2} + (Δy/y)^{2} :: for z = xy or x/y with independent errors
H: Fundamental limits
P: Quantum mechanics sets limits no apparatus can beat: Δx Δp ≥ ħ/2, and shot noise in light (√N fluctuations in photon number). Thermal (Johnson) noise limits electrical measurements. LIGO measures displacements of 10^{-19} m by fighting all of these, including using squeezed light.
X: Five timings of a pendulum's 10 oscillations: 15.2, 15.4, 15.1, 15.3, 15.5 s. Find T with uncertainty.
> Mean = 15.30 s; standard deviation ≈ 0.16 s; standard error = 0.16/√5 ≈ 0.07 s
> 10 oscillations: T = 1.530 ± 0.007 s
!: Repeating a biased measurement 1000 times gives a precise wrong answer. Averaging only fights random error.
Q: What's the difference between accuracy and precision? | Accuracy is closeness to the true value; precision is the closeness of repeated results to each other.
Q: How does the uncertainty in a mean scale with the number of readings? | As 1/√n.
Q: Why time many oscillations rather than one? | The reaction-time uncertainty is spread over many periods, reducing the fractional uncertainty in T.
M1: A zero error on a micrometer is an example of: | A systematic error | A random error | A resolution limit | A quantum limit | It shifts every reading by the same amount.
M2: Length 2.00 ± 0.02 m and width 1.00 ± 0.02 m. What is the percentage uncertainty in the area (adding in quadrature)? | About 2.2% | 3% | 1% | 0.04% | √(1^{2} + 2^{2})% ≈ 2.2%.
M3: To halve the random uncertainty in a mean, you need: | 4 times as many readings | twice as many readings | half as many readings | 8 times as many readings | σ_{mean} ∝ 1/√n.
T: Random uncertainty | Scatter that averages down with repeated measurements
T: Systematic error | A consistent bias that repeated measurements do not reduce
T: Standard error | The uncertainty in a mean, σ/√n
SUM: Random error falls as 1/√n with repeats; systematic error needs calibration or a different method.
SUM: For products and quotients, relative uncertainties add in quadrature.
SRC: JCGM 100, Evaluation of measurement data: Guide to the expression of uncertainty in measurement (GUM) | standard | 2008 | https://www.bipm.org/en/committees/jc/jcgm/publications
SRC: Taylor J. R., An Introduction to Error Analysis, 2nd edition, University Science Books | secondary | 1997
EV: established | The combination rules assume independent uncertainties; correlated ones need extra terms.
SA2@2: A rectangle measures 20.0 ± 0.2 cm by 10.0 ± 0.2 cm. Find its area with an uncertainty, assuming independent errors. | A = 200 cm^{2}. Relative uncertainties are 1% and 2%, combined in quadrature: √(1^{2} + 2^{2}) ≈ 2.2%. ΔA ≈ 0.022 × 200 ≈ 4 cm^{2}, so A = 200 ± 4 cm^{2}. | area 200 cm^{2} ; relative uncertainties 1% and 2% ; combined in quadrature about 2.2% ; 200 ± 4 cm^{2}

## Scientific reasoning and falsifiability
S: Science advances by proposing hypotheses that make risky predictions and testing them against observation. Karl Popper argued that what makes a claim scientific is falsifiability: some possible observation must be able to show it wrong.
---
Q: What is abduction in scientific reasoning? | Inference to the best explanation: choosing the hypothesis that best accounts for the evidence.
LV: Introductory · Foundation
O: Distinguish deduction, induction, abduction and Bayesian reasoning
O: Decide whether a claim is falsifiable
O: Explain why a failed prediction may point to an auxiliary assumption rather than the theory
PRE: Uncertainty and measurement limitations
H: Ways of reasoning
- **Deduction**: from general laws to specific predictions (if Newton is right, Halley's comet returns in 1758).
- **Induction**: from many observations to a general law (every metal tested expands when heated). Never logically certain.
- **Abduction** (inference to the best explanation): choose the hypothesis that best explains the evidence (dark matter explains rotation curves).
- **Bayesian reasoning**: update degrees of belief in hypotheses as evidence arrives.
E: P(H|D) = P(D|H) P(H) / P(D) :: Bayes' theorem: the probability of hypothesis H given data D
H: Falsifiability
P: "All swans are white" is falsifiable: one black swan refutes it. "Invisible undetectable fairies push the planets" is not. Popper saw science as conjecture and refutation. Real practice is messier: a failed prediction may point to a faulty auxiliary assumption (the Duhem–Quine problem). Uranus's odd orbit didn't refute Newton; it predicted Neptune (1846). Mercury's did refute it.
X: The 2011 OPERA "faster-than-light neutrinos".
> The result contradicted relativity at 6σ, a risky test passed or failed
> Rather than discarding relativity, physicists checked auxiliary assumptions: a loose fibre-optic cable was found
> Corrected, the neutrinos travelled at c within error
K: Good scientific claims are precise, risky and testable; extraordinary claims require extraordinary evidence.
!: A theory that can explain any possible result explains nothing. Accommodating every outcome is a weakness, not a strength.
Q: What is falsifiability? | A claim is falsifiable if some possible observation could show it to be false.
Q: What is the Duhem–Quine problem? | A failed prediction refutes the whole set of assumptions used, so it's not clear which one is wrong.
Q: What is abduction? | Inference to the best explanation of the evidence.
M1: Which statement is falsifiable? | All electrons have the same charge | Some unobservable force guides history | The universe is exactly as it should be | Everything happens for a reason | Finding one electron with a different charge would refute it.
M2: The discovery of Neptune from Uranus's orbit is an example of: | Questioning an auxiliary assumption instead of the core theory | A refutation of Newtonian gravity | Induction from a single case | An unfalsifiable hypothesis | Le Verrier kept Newton's law and changed the assumption that there were no unseen planets.
M3: A test of a hypothesis has P(D|H) = 0.9 and P(D|not H) = 0.1, with prior P(H) = 0.5. What is P(H|D)? | 0.9 | 0.5 | 0.1 | 0.45 | P(H|D) = 0.9 × 0.5 / (0.9 × 0.5 + 0.1 × 0.5) = 0.9.
T: Falsifiability | Popper's criterion: a claim is scientific if some possible observation could refute it
T: Auxiliary assumption | A background assumption, such as how an instrument works, needed to test a theory
T: Bayes' theorem | P(H|D) = P(D|H) P(H) / P(D): how evidence updates belief in a hypothesis
SUM: Scientific claims make risky predictions that could fail.
SUM: A surprising result is tested by checking auxiliary assumptions before discarding a well-tested theory.
SRC: Popper K., The Logic of Scientific Discovery, Hutchinson (English edition of Logik der Forschung, 1934) | secondary | 1959
SRC: OPERA Collaboration, "Measurement of the neutrino velocity with the OPERA detector in the CNGS beam", Journal of High Energy Physics 2012(10), 093 | primary | 2012 | https://doi.org/10.1007/JHEP10(2012)093
EV: contested | Falsifiability is widely used but philosophers of science debate whether it fully separates science from non-science; the OPERA correction itself is established.
SA2@2,3: A homeopathic remedy's supporters say it works but its effects are too subtle for any trial to detect. Is the claim scientific? Explain using falsifiability. | As stated it is not falsifiable: if no trial can detect the effect, no possible observation could show the claim wrong, so it makes no testable prediction. To be scientific it must predict a measurable difference from placebo in a controlled trial, which could then be tested. | the claim excludes every test ; no observation could refute it ; therefore not scientific as stated ; a scientific version predicts a measurable effect versus placebo
`;
