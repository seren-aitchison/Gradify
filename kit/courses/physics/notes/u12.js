// Unit 12: Thermodynamics. Format: kit/course/notes.js
export default `
## Temperature and thermal equilibrium
S: Temperature is the property that decides which way heat flows: from hot to cold, until the two are in thermal equilibrium at the same temperature. Microscopically, it measures the average random kinetic energy of particles.
LV: Introductory · Foundation
O: Define temperature as what decides the direction of heat flow
O: Convert between Celsius and kelvin and describe how thermometers work
PRE: Microscopic and macroscopic descriptions
H: Thermal equilibrium
- Two bodies in thermal contact exchange energy until no net heat flows.
- At equilibrium they have the same temperature; that's what thermometers rely on.
H: Temperature scales
E: T(K) = θ(°C) + 273.15
- Kelvin is absolute: 0 K is the lowest possible temperature.
- Since 2019 the kelvin is defined by fixing k_{B} = 1.380 649 × 10^{-23} J K^{-1}.
- Thermometers: liquid in glass, thermocouples, resistance thermometers, infrared, gas thermometers (the most fundamental).
H: Microscopic meaning
E: ⟨KE⟩ = (3/2)k_{B}T :: ideal monatomic gas, per molecule
P: More generally, temperature is defined by 1/T = ∂S/∂U: how entropy changes when energy is added. Systems with a maximum energy (spins) can even have negative absolute temperatures, which are "hotter" than any positive temperature.
X: Average KE of a nitrogen molecule's translation at 300 K?
> (3/2) × 1.38 × 10^{-23} × 300 = 6.2 × 10^{-21} J ≈ 0.039 eV
!: Temperature is not heat. A bath of warm water contains more internal energy than a red-hot spark, though the spark is hotter.
Q: What is thermal equilibrium? | The state in which bodies in thermal contact exchange no net energy, because they're at the same temperature.
Q: How is temperature defined thermodynamically? | 1/T = ∂S/∂U, the rate of change of entropy with energy.
M1: 25 °C in kelvin is: | 298 K | 248 K | 25 K | 273 K | +273.15.
M2: Two bodies in thermal equilibrium must have the same: | Temperature | Internal energy | Heat capacity | Mass | Defines equilibrium.
T: Thermal equilibrium | The state in which two systems in contact exchange no net heat
T: Kelvin | The SI unit of temperature, defined by fixing the Boltzmann constant; T(K) = θ(°C) + 273.15
T: Thermometric property | A property that changes reproducibly with temperature, such as resistance or volume
SUM: Heat flows from higher to lower temperature until temperatures are equal.
SUM: Temperature intervals are the same in kelvin and °C; only kelvin starts at absolute zero.
SRC: BIPM, The International Temperature Scale of 1990 (ITS-90) and Guides to Thermometry | standard | 1990 | https://www.bipm.org/en/committees/cc/cct/guides-to-thermometry
SRC: OpenStax, University Physics Volume 2, section 1.1 "Temperature and Thermal Equilibrium" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/1-1-temperature-and-thermal-equilibrium
EV: established | Standard definitions; the 2019 SI defines the kelvin via k_{B}.
Q: What is 37 °C in kelvin? | 310.15 K (about 310 K).
M3@2,3: A metal spoon and a wooden spoon have been in the same drawer all night. Which is hotter? | Neither: both are at room temperature, though the metal feels colder | The metal one, because it conducts heat | The wooden one, because it insulates | The metal one, because it has more internal energy | In equilibrium they're at the same temperature; metal feels colder because it conducts heat from your hand faster.
SA2@1,2: Explain why a thermometer must be left in contact with a body for a while before reading it. | A thermometer measures its own temperature. Heat flows between the body and the thermometer until they reach thermal equilibrium; only then is the thermometer's temperature equal to the body's. Reading earlier gives a value between the starting and final temperatures. | thermometer measures its own temperature ; heat flows until equilibrium ; then temperatures equal ; early readings are wrong

## Zeroth law of thermodynamics
S: The zeroth law says that if two systems are each in thermal equilibrium with a third, they're in equilibrium with each other. It makes temperature a meaningful, measurable quantity.
LV: Introductory · Foundation
O: State the zeroth law and explain why it makes temperature well defined
O: Explain why the zeroth law justifies thermometers
PRE: Temperature and thermal equilibrium
H: The law
- If A ~ C and B ~ C, then A ~ B (~ meaning thermal equilibrium).
- It was named last (1930s, by Fowler) but is logically prior to the others, hence "zeroth".
H: Why it matters
- It guarantees a single number, temperature, can label equilibrium states.
- A thermometer is the third body C: it reaches equilibrium with A, then with B; equal readings mean A and B are in equilibrium.
H: Empirical temperature
P: Choose a thermometric property that changes monotonically with hotness (mercury length, resistance, gas pressure at constant volume). Different properties give scales that agree only at the fixed points. The ideal-gas scale, and then the thermodynamic scale from the second law, removed this arbitrariness.
X: Why must a thermometer be small compared with what it measures?
> It exchanges heat with the system to reach equilibrium
> A large thermometer would change the system's temperature (loading)
!: Thermal equilibrium means no net heat flow, not no microscopic energy exchange: molecules still collide constantly.
Q: State the zeroth law. | If two systems are each in thermal equilibrium with a third, they're in thermal equilibrium with each other.
Q: Why is the zeroth law needed for thermometers? | It ensures that a thermometer's reading can compare the temperatures of separate bodies.
M1: The zeroth law establishes: | Temperature as a well-defined property | Energy conservation | Entropy increase | Absolute zero | It's the basis of temperature.
M2: Different thermometric properties (mercury, resistance) give scales that: | Agree only at fixed points in general | Always agree | Never agree | Agree only at 0 K | Different nonlinearities.
T: Zeroth law | If A and B are each in thermal equilibrium with C, then A and B are in thermal equilibrium with each other
T: Transitive relation | A relation that carries over: A ~ C and B ~ C imply A ~ B
SUM: The zeroth law lets us assign one number, temperature, that is equal for systems in equilibrium.
SUM: It's why a thermometer (C) can compare two bodies that never touch.
SRC: Blundell S. J., Blundell K. M., Concepts in Thermal Physics, 2nd edition, chapter 4, Oxford University Press | secondary | 2010
SRC: OpenStax, University Physics Volume 2, section 1.1 "Temperature and Thermal Equilibrium" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/1-1-temperature-and-thermal-equilibrium
EV: established | A foundational postulate of thermodynamics.
Q: Why is it called the "zeroth" law? | It was recognised as fundamental after the first and second laws were already named, yet logically comes first.
M3@2,3: A thermometer reads 25 °C in a bath and 25 °C in a block. What does the zeroth law let you conclude? | Bath and block are in thermal equilibrium with each other, so no net heat will flow between them | The bath and block must contain exactly the same amount of internal energy | The bath and block must have the same specific heat capacity as each other | Nothing at all can be concluded unless the bath and block touch directly | Equal temperature means no net heat flow on contact; it says nothing about energy content or heat capacity.
SA2@1: Explain how the zeroth law makes it possible to define a temperature scale. | Equilibrium with a common third body is transitive, so systems fall into classes that are all in equilibrium with one another. We label each class with a number, the temperature, using a reference body (a thermometer) and its thermometric property. | equilibrium is transitive ; systems grouped into classes ; each class labelled by a number ; measured with a thermometer

## Heat and internal energy
S: Internal energy is the total microscopic energy of a system's particles. Heat is energy transferred because of a temperature difference; work is energy transferred by other means. Heat and work are processes, not things a system contains.
LV: Introductory · Foundation
O: Distinguish heat, work and internal energy
O: Describe the three mechanisms of heat transfer
PRE: Zeroth law of thermodynamics
H: Internal energy
- Sum of random kinetic energies and intermolecular potential energies.
- A function of state: depends only on the current state, not on history.
- Ideal monatomic gas: U = (3/2)nRT (depends only on T).
H: Heat transfer mechanisms
- **Conduction**: collisions and electron motion; P = kAΔT/d (k: thermal conductivity; copper 400, glass 1, air 0.026 W m^{-1} K^{-1}).
- **Convection**: bulk fluid motion carrying energy; natural (buoyancy) or forced (fans).
- **Radiation**: EM emission; P = εσAT^{4}.
H: Joule's experiment
P: Joule showed a falling weight turning paddles in water raised its temperature by a fixed amount per joule of work: heat and work are both energy transfers. The old "caloric fluid" theory was wrong. 1 cal = 4.184 J.
X: A 1 cm glass window (A = 2 m^{2}) separates 20 °C inside from 0 °C outside. Heat loss?
> P = 1 × 2 × 20/0.01 = 4000 W
> In practice air films on each side cut this by ~5×; double glazing traps an insulating air layer
!: "Heat content" is a misleading phrase. A body has internal energy; heat is energy crossing a boundary.
Q: What's the difference between heat and internal energy? | Internal energy is a property of a system; heat is energy transferred because of a temperature difference.
Q: What did Joule's paddle-wheel experiment show? | Mechanical work and heat are equivalent forms of energy transfer.
M1: Which is a function of state? | Internal energy | Heat | Work | All of these | Q and W depend on the path.
M2: Thermal conduction rate through a slab is proportional to: | Area × temperature difference / thickness | Thickness | Temperature only | Mass | Fourier's law.
T: Internal energy | U, the total kinetic and potential energy of a system's particles
T: Heat | Q, energy transferred because of a temperature difference
T: Conduction, convection, radiation | Heat transfer by particle collisions, by bulk fluid flow, and by electromagnetic waves
SUM: Heat is energy in transit, not something a body "contains".
SUM: Conduction: P = kAΔT/L. Radiation: P = εσAT^{4}.
SRC: OpenStax, University Physics Volume 2, sections 1.4–1.6 | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/1-6-mechanisms-of-heat-transfer
SRC: Joule J. P., "On the mechanical equivalent of heat", Philosophical Transactions of the Royal Society 140, 61–82 | primary | 1850 | https://doi.org/10.1098/rstl.1850.0004
EV: established | Standard thermodynamics.
Q: What did Joule's paddle-wheel experiment show? | Mechanical work can raise the temperature of water just as heat does: heat is a form of energy transfer.
M3@2,3: A 2.0 m^{2} window of glass 4.0 mm thick (k = 0.80 W m^{-1} K^{-1}) has 10 K across it. What is the conduction rate? | 4000 W | 40 W | 16 W | 400 W | P = kAΔT/L = 0.80 × 2.0 × 10/0.0040 = 4000 W, which is why double glazing traps an air layer instead.
SA2@2: Explain why a vacuum flask keeps drinks hot. | The vacuum between its walls stops conduction and convection, which need a medium. Silvered surfaces reflect infrared, reducing radiation. A stopper limits evaporation and convection at the top, so heat escapes only slowly. | vacuum stops conduction and convection ; silvering reduces radiation ; stopper limits losses at the top ; slow heat loss

## Specific heat capacity
S: Specific heat capacity is the energy needed to raise the temperature of 1 kg of a substance by 1 K. Water's unusually high value moderates climates and makes it an excellent coolant.
LV: Introductory · Application
O: Use Q = mcΔT, including in mixing problems
O: Explain why water's specific heat capacity matters for climate and bodies
PRE: Heat and internal energy
H: Definitions
E: Q = mcΔT
E: C = mc :: heat capacity of an object (J K^{-1})
E: C_{p} − C_{V} = nR :: ideal gas (molar)
- Water 4180 J kg^{-1} K^{-1}; aluminium 900; iron 450; copper 385; lead 130.
- Gases have different values at constant pressure (c_{p}) and constant volume (c_{V}); c_{p} > c_{V} because at constant pressure the gas also does work expanding.
H: Molecular view
- Equipartition: each quadratic degree of freedom stores ½k_{B}T.
- Monatomic gas C_{V} = (3/2)R; diatomic (with rotation) (5/2)R; solids (Dulong–Petit) 3R per mole of atoms at high T.
- At low T, quantum effects freeze out modes (Einstein, Debye): C → 0 as T → 0.
H: Measuring c
P: Heat a known mass electrically (Q = VIt), record ΔT, correct for heat losses (insulation, or a cooling curve). Method of mixtures: put a hot sample in water and find the equilibrium temperature.
X: A 2.0 kW kettle heats 1.0 kg of water from 20 °C to 100 °C. Minimum time?
> Q = 1.0 × 4180 × 80 = 334 kJ
> t = 334 000/2000 = 167 s ≈ 2.8 min
!: Specific heat capacity isn't constant; it changes with temperature, especially at low temperatures.
Q: Why does water moderate coastal climates? | Its high specific heat capacity means it warms and cools slowly.
Q: Why is c_{p} larger than c_{V} for a gas? | At constant pressure, some heat goes into work as the gas expands.
M1: Energy to heat 2 kg of aluminium by 10 K: | 18 kJ | 9 kJ | 1.8 kJ | 180 kJ | 2 × 900 × 10.
M2: The Dulong–Petit law gives the molar heat capacity of solids as: | 3R | (3/2)R | R | (5/2)R | Six quadratic terms per atom.
T: Specific heat capacity | c, the energy to raise 1 kg by 1 K, in J kg^{-1} K^{-1}
T: Heat capacity | C = mc, the energy to raise a whole object by 1 K
T: Molar heat capacity | The energy to raise 1 mol by 1 K; for many solids about 3R (Dulong–Petit)
SUM: Q = mcΔT; water's c ≈ 4180 J kg^{-1} K^{-1} is unusually high.
SUM: In mixing with no losses, heat lost by hot bodies = heat gained by cold ones.
SRC: OpenStax, University Physics Volume 2, section 1.5 "Heat Transfer, Specific Heat, and Calorimetry" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/1-5-heat-transfer-specific-heat-and-calorimetry
SRC: NIST Chemistry WebBook, SRD 69 | data | 2023 | https://webbook.nist.gov/chemistry/
EV: established | Values vary slightly with temperature.
Q: Why do coastal places have milder climates than inland ones? | The sea's large heat capacity warms and cools slowly, damping temperature swings.
M3@2,3: 0.20 kg of water at 80 °C is mixed with 0.30 kg at 20 °C. What is the final temperature (no losses)? | 44 °C | 50 °C | 56 °C | 32 °C | 0.20 × (80 − T) = 0.30 × (T − 20) gives T = 44 °C.
SA2@1,2: Describe how to measure the specific heat capacity of an aluminium block with an electric heater, and name the main error. | Insert a heater and thermometer in a block of known mass; measure the energy supplied (VIt or a joulemeter) and the temperature rise; c = E/(mΔT). The main error is heat lost to the surroundings, reduced by insulating the block, and using a small temperature rise around room temperature. | energy from VIt ; temperature rise measured ; c = E/(mΔT) ; heat loss is the main error

## Latent heat
S: Latent heat is the energy absorbed or released during a change of phase at constant temperature. It goes into breaking or forming bonds, not raising the temperature, which is why sweating cools you and steam burns badly.
LV: Introductory · Application
O: Use Q = mL for changes of state
O: Explain at the particle level why temperature stays constant during a phase change
PRE: Specific heat capacity
H: Definitions
E: Q = mL
- Water: L_{fusion} = 334 kJ kg^{-1}; L_{vaporisation} = 2260 kJ kg^{-1} at 100 °C.
- Vaporisation needs much more energy than melting: molecules separate completely.
- Heating curves show flat plateaus during phase changes.
H: Effects
- Evaporative cooling: sweat, wet-bulb thermometers, swamp coolers, dogs panting.
- Steam burns: 1 g of steam condensing releases 2260 J before cooling, versus 420 J from 1 g of water cooling from 100 to 0 °C.
- Weather: latent heat released when water vapour condenses powers thunderstorms and hurricanes.
- Ice and phase-change materials store energy at constant temperature.
X: How much energy turns 0.5 kg of ice at −10 °C into steam at 100 °C? (c_{ice} = 2100)
> Ice −10 → 0: 0.5 × 2100 × 10 = 10.5 kJ; melt: 167 kJ
> Water 0 → 100: 209 kJ; boil: 1130 kJ
> Total ≈ 1517 kJ: boiling dominates
!: During a phase change, adding heat doesn't raise the temperature; a pan of boiling water stays at 100 °C (at 1 atm) however high the flame.
Q: What is specific latent heat? | The energy per kg to change phase at constant temperature.
Q: Why is steam at 100 °C more dangerous than water at 100 °C? | Condensing steam releases a large latent heat onto the skin.
M1: Energy to melt 2 kg of ice at 0 °C: | 668 kJ | 334 kJ | 4520 kJ | 8.4 kJ | 2 × 334.
M2: Why does evaporation cool a liquid? | The fastest molecules escape, lowering the average KE of those left | Air is cold | It increases pressure | It adds energy | Latent heat is taken from the liquid.
T: Specific latent heat of fusion | The energy to melt 1 kg at its melting point (ice: 334 kJ kg^{-1})
T: Specific latent heat of vaporisation | The energy to boil 1 kg at its boiling point (water: 2.26 MJ kg^{-1})
SUM: During melting or boiling, energy breaks intermolecular bonds instead of raising kinetic energy.
SUM: L_{vap} ≫ L_{fus}: boiling separates molecules completely.
SRC: OpenStax, University Physics Volume 2, section 1.6 "Phase Changes" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/1-6-phase-changes
SRC: NIST Chemistry WebBook, SRD 69 | data | 2023 | https://webbook.nist.gov/chemistry/
EV: established | Values at 1 atm.
Q: Why does steam at 100 °C cause worse burns than water at 100 °C? | Steam releases 2.26 MJ kg^{-1} of latent heat as it condenses on the skin, on top of the heat from cooling.
M3@2,3: How much energy turns 0.50 kg of ice at −10 °C into water at 20 °C (c_{ice} = 2100, c_{water} = 4180 J kg^{-1} K^{-1})? | About 219 kJ | About 167 kJ, melting only | About 52 kJ, warming only | About 1.1 MJ, using vaporisation | 0.5 × 2100 × 10 + 0.5 × 334 000 + 0.5 × 4180 × 20 = 10.5 + 167 + 41.8 ≈ 219 kJ.
SA2@2: Explain why sweating cools you, using latent heat. | Evaporating sweat needs latent heat of vaporisation, about 2.4 MJ kg^{-1} at skin temperature, taken mainly from the skin. Removing that energy cools the body. It works poorly in humid air because evaporation is slow. | evaporation needs latent heat ; energy taken from the skin ; large L gives strong cooling ; humidity slows evaporation

## Thermal expansion
S: Most materials expand when heated because their atoms vibrate with larger amplitude in an asymmetric potential, increasing the average spacing. Engineers must allow for it in bridges, railways and precision instruments.
LV: Introductory · Application
O: Calculate linear and volume expansion
O: Explain expansion from the asymmetric interatomic potential, and water's anomaly
PRE: Anharmonic oscillations
H: Coefficients
E: ΔL = αLΔT :: linear expansion
E: ΔV = βVΔT, β ≈ 3α :: volume expansion (isotropic solids)
- α: steel 12 × 10^{-6} K^{-1}; aluminium 23 × 10^{-6}; glass 9 × 10^{-6}; Pyrex 3 × 10^{-6}; Invar ~1 × 10^{-6}.
H: Applications and problems
- Expansion joints in bridges and pipes; gaps in old railways.
- Bimetallic strips bend when heated (thermostats).
- Thermal stress σ = EαΔT if expansion is prevented: large enough to crack glass and buckle rails.
- Pyrex resists thermal shock because of its low α.
H: Water's anomaly
P: Water contracts when heated from 0 to 4 °C, reaching maximum density at 4 °C, and ice is less dense than water. Lakes freeze from the top, and the 4 °C water at the bottom lets life survive the winter.
X: A 500 m steel bridge experiences a 40 K range. How much does it change length?
> ΔL = 12 × 10^{-6} × 500 × 40 = 0.24 m
!: Holes expand too when a plate is heated, as if the hole were made of the same material: heating a metal lid helps loosen it.
Q: Why do solids expand when heated? | Atoms vibrate with larger amplitude in an asymmetric (anharmonic) potential, so the mean spacing grows.
Q: Why do lakes freeze from the top? | Water is densest at 4 °C, so colder water and ice float on top.
M1: A steel rod 1 m long is heated by 100 K. It expands by: | 1.2 mm | 12 mm | 0.12 mm | 1.2 cm | 12 × 10^{-6} × 100.
M2: A bimetallic strip bends because: | Its two metals have different expansion coefficients | Both metals contract | It's magnetised | It melts | Differential expansion.
T: Linear expansivity | α, the fractional change in length per kelvin
T: Volume expansivity | β ≈ 3α for an isotropic solid
SUM: ΔL = αLΔT; ΔV = βVΔT.
SUM: Water is densest at about 4 °C, so lakes freeze from the top down.
SRC: OpenStax, University Physics Volume 2, section 1.3 "Thermal Expansion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/1-3-thermal-expansion
SRC: Kittel C., Introduction to Solid State Physics, 8th edition, chapter 5, Wiley | secondary | 2005
EV: established | Linear expansion is approximate over moderate temperature ranges.
Q: Why do railway lines have expansion gaps or are pre-stressed? | Steel rails lengthen in hot weather; without allowance they would buckle.
M3@2,3: A 1.0 km steel bridge (α = 1.2 × 10^{-5} K^{-1}) warms from −10 °C to 40 °C. How much longer does it get? | 0.60 m | 6.0 m | 0.060 m | 0.012 m | ΔL = 1.2 × 10^{-5} × 1000 × 50 = 0.60 m, which is why bridges need expansion joints.
SA2@1,2: Explain why lakes freeze from the top down and why that helps aquatic life. | As water cools towards 4 °C it becomes denser and sinks; below 4 °C it expands and stays on top, so the surface reaches 0 °C first and freezes. Ice is less dense and floats, insulating the water below, which stays near 4 °C, so fish survive. | densest at 4 °C ; colder water stays on top ; ice floats ; insulates the liquid below

## First law of thermodynamics
S: The first law is energy conservation for thermodynamic systems: the change in internal energy equals the heat supplied to the system minus the work it does. No machine can produce energy from nothing.
LV: Introductory · Application
O: State the first law with a consistent sign convention
O: Apply it to heating, compression and expansion of gases
PRE: Heat and internal energy
H: The law
E: ΔU = Q − W :: W = work done BY the system (physics convention)
E: dU = δQ − p dV :: quasi-static, only pV work
- Some texts write ΔU = Q + W with W done ON the system; check the convention.
- U is a state function; Q and W are not (δ denotes inexact differentials).
H: Applying it
- Isolated system: Q = W = 0 ⇒ ΔU = 0.
- Cycle: ΔU = 0 ⇒ net Q = net W.
- Free expansion into a vacuum: Q = 0, W = 0 ⇒ ΔU = 0 (an ideal gas's temperature doesn't change).
H: Perpetual motion
P: A perpetual motion machine of the first kind would produce work without consuming energy, violating the first law. None has ever worked, and patent offices refuse to examine them.
X: A gas absorbs 500 J of heat and does 200 J of work. Change in internal energy?
> ΔU = 500 − 200 = +300 J
!: Sign conventions are the main source of error; write the law with the convention you're using and stick to it.
Q: State the first law of thermodynamics. | ΔU = Q − W: internal energy change equals heat supplied minus work done by the system.
Q: What happens to an ideal gas's temperature in a free expansion? | It stays the same (no heat, no work, so ΔU = 0).
M1: In a complete cycle, ΔU = ? | 0 | Q | W | Q + W | U is a state function.
M2: A gas is compressed adiabatically with 300 J of work done on it. ΔU = ? | +300 J | −300 J | 0 | 600 J | Q = 0; W_{by} = −300.
T: First law | ΔU = Q − W, with Q heat added to and W work done by the system
T: State function | A quantity, such as U, that depends only on the current state, not the path
SUM: ΔU = Q − W (physics convention); some texts use ΔU = Q + W with W done on the system.
SUM: Q and W depend on the path; ΔU doesn't.
SRC: OpenStax, University Physics Volume 2, section 3.3 "First Law of Thermodynamics" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/3-3-first-law-of-thermodynamics
SRC: Blundell S. J., Blundell K. M., Concepts in Thermal Physics, 2nd edition, chapter 11, Oxford University Press | secondary | 2010
EV: established | Energy conservation, never observed to fail.
Q: What is ΔU for a complete cycle? | Zero, because U is a state function.
M3@2,3: A gas absorbs 500 J of heat while doing 200 J of work on a piston. What is its change in internal energy? | +300 J | +700 J | −300 J | +200 J | ΔU = Q − W = 500 − 200 = +300 J.
SA2@2: A bicycle pump gets hot when you pump quickly. Explain using the first law. | Pumping quickly compresses the air in the pump faster than heat can escape, so Q ≈ 0. Work is done on the gas (W negative in ΔU = Q − W), so ΔU is positive: the air's internal energy, and so its temperature, rise, warming the pump. | rapid compression, little heat lost ; work done on the gas ; ΔU positive ; temperature rises

## Work done by thermodynamic systems
S: A gas does work when it expands against an external pressure. On a pressure–volume diagram, this work is the area under the curve, and it depends on the path taken between two states.
LV: Introductory · Application
O: Calculate work done by a gas as ∫p dV
O: Show that work depends on the path between states
PRE: First law of thermodynamics
H: Expansion work
E: W = ∫p dV :: work done by the gas
E: W = pΔV :: constant pressure
E: W = nRT ln(V_{2}/V_{1}) :: isothermal ideal gas
E: W = (p_{1}V_{1} − p_{2}V_{2})/(γ − 1) :: adiabatic ideal gas
H: Path dependence
P: Going from state A to state B by different routes (heat at constant volume then expand at constant pressure, or the reverse) gives different areas, so different work. That's why work (and heat) aren't state functions, and why cycles can produce net work.
H: Other work
- Stretching a wire: dW = F dL; magnetising: dW = μ_{0}H dM; charging a capacitor: dW = V dQ; surface: γ dA.
X: 2 mol of ideal gas expand isothermally at 300 K from 10 L to 30 L. Work done?
> W = 2 × 8.31 × 300 × ln 3 = 5.5 kJ
!: Work against zero external pressure (free expansion) is zero even if the gas expands a lot.
Q: How is work represented on a p–V diagram? | As the area under the process curve.
Q: Why is work path-dependent? | Different paths between the same states enclose different areas on a p–V diagram.
M1: A gas expands at 2 × 10^{5} Pa from 1 L to 4 L. Work done: | 600 J | 800 J | 200 J | 6000 J | pΔV = 2 × 10^{5} × 3 × 10^{-3}.
M2: Work done in a constant-volume process is: | Zero | pV | nRT | Maximum | No volume change.
T: Boundary work | W = ∫p dV, the work done by a gas changing volume against its surroundings
T: Quasi-static process | One carried out so slowly that the system is always near equilibrium
SUM: Constant pressure: W = pΔV. Isothermal ideal gas: W = nRT ln(V_{2}/V_{1}).
SUM: Expansion: the gas does positive work; compression: work is done on it.
SRC: OpenStax, University Physics Volume 2, section 3.2 "Work, Heat, and Internal Energy" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/3-2-work-heat-and-internal-energy
SRC: Schroeder D. V., An Introduction to Thermal Physics, chapter 1, Addison-Wesley | secondary | 2000
EV: established | Exact for quasi-static processes.
Q: How much work does a gas do expanding by 2.0 × 10^{-3} m^{3} at a constant 1.0 × 10^{5} Pa? | W = pΔV = 200 J.
M3@2,3: 1.0 mol of ideal gas expands isothermally at 300 K to twice its volume. What work does it do (R = 8.31 J mol^{-1} K^{-1})? | About 1.7 kJ | About 2.5 kJ, from nRT | About 0.83 kJ, from nRT/3 | About 3.5 kJ, from 2nRT ln 2 | W = nRT ln 2 = 8.31 × 300 × 0.693 ≈ 1730 J.
SA2@1,2: Explain why a gas expanding freely into a vacuum does no work. | Work is done against an external pressure: W = ∫p_{ext} dV. In free expansion there is nothing to push against (p_{ext} = 0), so W = 0, even though the volume increases. For an ideal gas Q = 0 too, so ΔU = 0 and its temperature is unchanged. | work requires external pressure ; vacuum has none ; W = 0 ; ideal gas temperature unchanged

## Pressure-volume diagrams
S: A p–V diagram plots a gas's state as it changes. Each point is a state; each curve is a process. Areas give work, enclosed loops give net work per cycle, and the shapes reveal the kind of process.
LV: Introductory · Application
O: Read processes and states from a p–V diagram
O: Find work and net work in a cycle from areas
PRE: Work done by thermodynamic systems
H: Process shapes
- **Isobaric**: horizontal line.
- **Isochoric**: vertical line (no work).
- **Isothermal**: hyperbola pV = constant.
- **Adiabatic**: steeper curve pV^{γ} = constant.
H: Cycles
- Clockwise loop: net work done by the gas (engine).
- Anticlockwise: net work done on the gas (refrigerator, heat pump).
- Net work = enclosed area.
H: Related diagrams
P: Engineers also use T–S diagrams (area = heat) and p–h diagrams for refrigerants. Each makes particular quantities easy to read off.
X: A gas goes round a rectangle on a p–V diagram: p from 1 to 3 × 10^{5} Pa, V from 1 to 2 L, clockwise. Net work per cycle?
> Area = 2 × 10^{5} × 10^{-3} = 200 J done by the gas
!: On p–V diagrams only quasi-static (slow, near-equilibrium) processes can be drawn as lines; rapid irreversible processes have no well-defined path.
Q: Which way round does an engine cycle go on a p–V diagram? | Clockwise.
Q: Which curve is steeper through a point: an isotherm or an adiabat? | The adiabat.
M1: A vertical line on a p–V diagram is: | Isochoric | Isobaric | Isothermal | Adiabatic | Constant volume.
M2: The net work in a cycle equals: | The enclosed area | Zero always | The area under the top curve | The pressure range | Area of the loop.
T: p–V diagram | A graph of pressure against volume; each point is a state, each line a process
T: Isotherm | A curve of constant temperature; pV = constant for an ideal gas
SUM: Area under a process = work done; area enclosed by a cycle = net work per cycle.
SUM: Clockwise cycles are engines (net work out); anticlockwise are refrigerators.
SRC: OpenStax, University Physics Volume 2, section 3.2 "Work, Heat, and Internal Energy" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/3-2-work-heat-and-internal-energy
SRC: Blundell S. J., Blundell K. M., Concepts in Thermal Physics, 2nd edition, Oxford University Press | secondary | 2010
EV: established | Standard thermodynamics.
Q: On a p–V diagram, how do you tell that a cycle is an engine? | It runs clockwise, enclosing positive net work.
M3@2,3: A cycle is a rectangle from 1.0 to 3.0 × 10^{-3} m^{3} and from 1.0 to 2.0 × 10^{5} Pa, run clockwise. What net work does it do per cycle? | 200 J | 400 J | 600 J | 0 J | Enclosed area = Δp × ΔV = 1.0 × 10^{5} × 2.0 × 10^{-3} = 200 J.
SA2@1: On a p–V diagram, sketch (describe) an isothermal and an adiabatic expansion from the same start, and say which is steeper and why. | Both curves fall as volume rises; the adiabatic is steeper. In the isothermal, heat flows in to keep T constant (pV = const). In the adiabatic, no heat enters, so the gas cools as it does work and its pressure drops faster (pV^{γ} = const, γ > 1). | both curves fall ; adiabatic steeper ; isothermal has heat input ; pV^{γ} with γ > 1

## Isothermal processes
S: In an isothermal process the temperature stays constant. For an ideal gas this means internal energy doesn't change, so all the heat absorbed is turned into work (or vice versa).
LV: Introductory · Application
O: Apply ΔU = 0 to an ideal gas at constant temperature
O: Calculate the heat and work in an isothermal process
PRE: Pressure-volume diagrams
H: Ideal gas
E: pV = constant (Boyle's law)
E: ΔU = 0 ⇒ Q = W = nRT ln(V_{2}/V_{1})
E: ΔS = nR ln(V_{2}/V_{1})
- Needs slow processes in good thermal contact with a reservoir.
H: Examples
- Slow compression of air in a bicycle pump left to cool.
- Phase changes at constant pressure (boiling at 100 °C) are isothermal.
- Carnot cycle's heat-exchange strokes.
X: 1 mol of gas at 300 K is compressed isothermally to half its volume. Heat released?
> W = RT ln(1/2) = 8.31 × 300 × (−0.693) = −1.73 kJ (work done on the gas)
> Q = −1.73 kJ: 1.73 kJ released to the reservoir
!: Isothermal doesn't mean no heat flows; heat must flow to keep the temperature constant. It means ΔT = 0.
P: **Investigate with the lab.** Halve the volume at fixed temperature and watch the pressure double: an isothermal change.
IX: gas
Q: For an isothermal ideal-gas process, how are Q and W related? | Q = W, since ΔU = 0.
Q: What law describes an isothermal ideal gas? | Boyle's law, pV = constant.
M1: A gas is compressed isothermally. Its pressure: | Increases inversely with volume | Stays constant | Decreases | Doubles regardless | pV = constant.
M2: Isothermal processes require: | Slow change with good thermal contact | No heat flow | Rapid change | Insulation | Heat must flow to maintain T.
M2: In an isothermal compression of an ideal gas, what stays constant? | The temperature and the product pV | The pressure | The volume | The internal energy only rises | Isothermal means constant temperature, so pV is constant.
T: Isothermal process | A process at constant temperature
T: Heat reservoir | A body so large its temperature doesn't change as heat flows in or out
SUM: Ideal gas, isothermal: ΔU = 0, so Q = W = nRT ln(V_{2}/V_{1}).
SUM: Real isothermal processes must be slow, so heat can flow to keep T fixed.
SRC: OpenStax, University Physics Volume 2, section 3.5 "Thermodynamic Processes" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/3-5-thermodynamic-processes
SRC: Schroeder D. V., An Introduction to Thermal Physics, chapter 1, Addison-Wesley | secondary | 2000
EV: established | Exact for an ideal gas.
Q: Where does the work done by an isothermally expanding ideal gas come from? | From heat absorbed from the reservoir; its internal energy doesn't change.
M3@2,3: An ideal gas is compressed isothermally, with 500 J of work done on it. What heat flows, and in which direction? | 500 J leaves the gas | 500 J enters the gas | No heat flows | 1000 J leaves the gas | ΔU = 0, so Q = W = −500 J: the gas gives out 500 J to the reservoir.
SA2@2: 2.0 mol of ideal gas is compressed isothermally at 300 K from 0.040 m^{3} to 0.010 m^{3}. Find the work done on it and the heat transferred. | W_{by} = nRT ln(V_{2}/V_{1}) = 2.0 × 8.31 × 300 × ln(0.25) ≈ −6.9 kJ. So 6.9 kJ of work is done on the gas, and ΔU = 0 means 6.9 kJ of heat flows out. | W = nRT ln(V_{2}/V_{1}) ; about −6.9 kJ ; ΔU = 0 ; 6.9 kJ heat out

## Adiabatic processes
S: In an adiabatic process no heat enters or leaves. Compressing a gas adiabatically heats it; expanding cools it. This explains diesel ignition, cloud formation and why air cools as it rises.
LV: Intermediate · Application
O: Use pV^{γ} = constant and TV^{γ−1} = constant
O: Explain adiabatic heating and cooling in engines and the atmosphere
PRE: Isothermal processes
H: Ideal gas
E: pV^{γ} = constant; TV^{γ−1} = constant; T^{γ}p^{1−γ} = constant
E: γ = C_{p}/C_{V} :: 5/3 monatomic, 7/5 diatomic
E: W = −ΔU = nC_{V}(T_{1} − T_{2})
H: Real-world adiabats
- Fast processes (sound waves, engine strokes) are nearly adiabatic: no time for heat to flow.
- **Diesel engines**: compression ratio ~20:1 heats air above 500 °C, igniting fuel without spark plugs.
- **Atmosphere**: rising dry air cools at ~9.8 K per km (dry adiabatic lapse rate); moist air cools more slowly (~5–6 K per km) because condensation releases latent heat.
- **Foehn winds**: air descending a mountain warms adiabatically.
X: Air (γ = 1.4) at 300 K is compressed adiabatically by a factor of 20. Final temperature?
> T_{2} = 300 × 20^{0.4} = 300 × 3.31 = 994 K (721 °C)
!: Adiabatic isn't the same as isothermal: temperature changes even though no heat flows.
Q: Why does air cool when it rises? | It expands adiabatically as pressure falls, doing work at the expense of internal energy.
Q: How does a diesel engine ignite its fuel? | Rapid adiabatic compression heats the air above the fuel's ignition temperature.
M1: In an adiabatic expansion, the gas temperature: | Falls | Rises | Stays constant | Doubles | Work done from internal energy.
M2: For a monatomic ideal gas, γ = : | 5/3 | 7/5 | 4/3 | 1 | C_{p}/C_{V} = (5/2)/(3/2).
T: Adiabatic process | One with no heat transfer: Q = 0
T: Adiabatic index | γ = C_{p}/C_{V}: 5/3 for monatomic, 7/5 for diatomic gases at room temperature
T: Lapse rate | The rate temperature falls with height; about 9.8 K km^{-1} for dry air
SUM: Q = 0 so ΔU = −W: compressing heats, expanding cools.
SUM: Diesel engines ignite fuel by adiabatic compression; rising air cools and forms clouds.
SRC: OpenStax, University Physics Volume 2, section 3.6 "Adiabatic Processes for an Ideal Gas" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/3-6-adiabatic-processes-for-an-ideal-gas
SRC: Wallace J. M., Hobbs P. V., Atmospheric Science: An Introductory Survey, 2nd edition, chapter 3, Academic Press | secondary | 2006
EV: established | Exact for reversible adiabatic processes of an ideal gas.
Q: Why does air cool as it rises? | It expands into lower pressure, doing work, with little heat exchange: adiabatic cooling.
M3@2,3: Air (γ = 1.4) at 300 K is compressed adiabatically to 1/16 of its volume in a diesel engine. What is its temperature? | About 910 K | About 4800 K | About 300 K | About 600 K | T_{2} = T_{1}(V_{1}/V_{2})^{γ−1} = 300 × 16^{0.4} ≈ 300 × 3.03 ≈ 910 K, hot enough to ignite diesel.
SA2@1,2: Explain why spraying an aerosol can makes it feel cold. | The gas escapes quickly, expanding almost adiabatically: it does work pushing back the atmosphere with little time to absorb heat, so its internal energy and temperature fall. Liquid propellant also evaporates inside, taking latent heat from the can. | rapid expansion ; little heat exchange ; work done lowers U ; evaporation also absorbs latent heat

## Isobaric and isochoric processes
S: In an isobaric process the pressure is constant; in an isochoric one the volume is constant. Heating at constant pressure does work as the gas expands; heating at constant volume puts all the heat into internal energy.
LV: Introductory · Application
O: Apply the first law at constant pressure and at constant volume
O: Explain why C_{p} > C_{V} and derive C_{p} − C_{V} = R
PRE: First law of thermodynamics
H: Isobaric (constant p)
E: V/T = constant (Charles's law)
E: W = pΔV; Q = nC_{p}ΔT; ΔU = nC_{V}ΔT
- Examples: heating gas under a free piston; boiling water in an open pan.
H: Isochoric (constant V)
E: p/T = constant (Gay-Lussac's law)
E: W = 0; Q = ΔU = nC_{V}ΔT
- Examples: heating a sealed rigid container (pressure cooker before venting, aerosol can in a fire).
H: Mayer's relation
E: C_{p} − C_{V} = R (per mole, ideal gas)
P: The difference is exactly the work done at constant pressure per kelvin per mole: pΔV = RΔT. Measuring γ (from sound speed or Clément–Desormes experiments) tells you about molecular degrees of freedom.
X: 2 mol of diatomic gas (C_{V} = 5R/2) are heated by 50 K at constant pressure. Find Q, W, ΔU.
> ΔU = 2 × 2.5 × 8.31 × 50 = 2.08 kJ
> W = nRΔT = 0.83 kJ; Q = 2.91 kJ
!: Aerosol cans warn against heating because isochoric heating raises pressure in proportion to absolute temperature.
Q: Why does heating at constant pressure need more heat than at constant volume? | Some of the heat goes into work as the gas expands.
Q: State Charles's law. | At constant pressure, V/T is constant.
M1: In an isochoric process the work done is: | Zero | pV | nRΔT | Q | No volume change.
M2: A sealed can at 300 K and 2 atm is heated to 450 K. New pressure: | 3 atm | 2 atm | 4.5 atm | 1.3 atm | p ∝ T.
T: Isobaric | At constant pressure
T: Isochoric | At constant volume, so no boundary work is done
SUM: Isochoric: W = 0 and Q = nC_{V}ΔT. Isobaric: Q = nC_{p}ΔT and W = pΔV.
SUM: For an ideal gas C_{p} − C_{V} = R: at constant pressure some heat goes into work.
SRC: OpenStax, University Physics Volume 2, section 3.5 "Thermodynamic Processes" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/3-5-thermodynamic-processes
SRC: Blundell S. J., Blundell K. M., Concepts in Thermal Physics, 2nd edition, chapter 11, Oxford University Press | secondary | 2010
EV: established | Exact for an ideal gas.
Q: In an isochoric process, where does all the heat go? | Into internal energy: no work is done.
M3@2,3: 1.0 mol of a monatomic ideal gas (C_{V} = 3R/2) is heated by 10 K at constant pressure. How much heat is needed? | About 208 J | About 125 J | About 83 J | About 291 J | C_{p} = 5R/2, so Q = 1.0 × 2.5 × 8.31 × 10 ≈ 208 J (125 J to internal energy, 83 J as work).
SA2@2: Show that C_{p} − C_{V} = R for one mole of ideal gas. | At constant volume Q = C_{V}ΔT = ΔU. At constant pressure the same ΔT gives the same ΔU (U depends only on T), but the gas also does work pΔV = RΔT. So C_{p}ΔT = C_{V}ΔT + RΔT, giving C_{p} − C_{V} = R. | isochoric: Q = ΔU ; same ΔU at constant pressure ; extra work pΔV = RΔT ; C_{p} − C_{V} = R

## Heat engines
S: A heat engine takes heat from a hot source, converts part of it to work, and rejects the rest to a cold sink. The second law forbids converting all the heat to work, so some must always be discarded.
LV: Introductory · Application
O: Describe a heat engine by its hot source, cold sink and work output
O: Calculate efficiency from heat flows
PRE: Pressure-volume diagrams
H: The engine
E: W = Q_{h} − Q_{c}
E: η = W/Q_{h} = 1 − Q_{c}/Q_{h}
- Working substance goes round a cycle (ΔU = 0).
- Examples: steam turbines (Rankine cycle), petrol (Otto), diesel, gas turbines (Brayton), Stirling engines.
H: Real efficiencies
- Car petrol engine ~25–35%; diesel ~35–45%; combined-cycle gas power station ~60%; coal ~40%; nuclear ~33%.
- The Carnot limit sets the maximum for given temperatures.
H: Historical impact
P: Carnot (1824) asked how much work a steam engine could get from heat, decades before energy conservation was understood. His answer, that efficiency depends only on the reservoir temperatures, became the second law and the concept of entropy.
X: A power station takes in 2500 MW of heat and outputs 1000 MW of electricity. Efficiency and heat rejected?
> η = 40%
> Q_{c} = 1500 MW to cooling towers or a river
!: The "waste" heat isn't a design failure that better engineering can eliminate; the second law requires some.
Q: Why must a heat engine reject heat? | The second law forbids converting heat entirely into work in a cycle.
Q: Define the efficiency of a heat engine. | η = W/Q_{h}, the useful work divided by heat taken in.
M1: An engine takes 1000 J and rejects 700 J. Efficiency: | 30% | 70% | 43% | 100% | W = 300 J.
M2: Combined-cycle power stations are more efficient because: | They use the exhaust heat of a gas turbine to run a steam turbine | They burn less fuel | They have no cold sink | They break the Carnot limit | Two cycles in series.
T: Heat engine | A device that runs in a cycle, turning part of the heat from a hot source into work
T: Efficiency | η = W/Q_{H} = 1 − Q_{C}/Q_{H}
SUM: Q_{H} = W + Q_{C}; some heat must always be rejected to the cold sink.
SUM: Car engines are about 25–35% efficient; combined-cycle power stations about 60%.
SRC: OpenStax, University Physics Volume 2, section 4.2 "Heat Engines" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/4-2-heat-engines
SRC: Çengel Y. A., Boles M. A., Thermodynamics: An Engineering Approach, 9th edition, McGraw-Hill | secondary | 2019
EV: established | Standard thermodynamics; efficiencies are typical values.
Q: Why must a heat engine have a cold sink? | No cyclic engine can turn heat entirely into work; some must be rejected (the second law).
M3@2,3: An engine absorbs 2000 J and rejects 1400 J each cycle at 50 cycles per second. What is its power output? | 30 kW | 70 kW | 100 kW | 600 W | W = 600 J per cycle × 50 s^{-1} = 30 000 W; efficiency 30%.
SA2@1,2: Explain why power stations need cooling towers or a river. | A power station is a heat engine. The second law requires it to reject heat to a cold sink; with efficiency around 35–60%, more than a third of the fuel's energy must be dumped as low-temperature heat, so it needs a large cold reservoir such as the air via cooling towers or river or sea water. | power station is a heat engine ; must reject heat ; efficiency well below 100% ; needs a large cold reservoir

## Refrigerators and heat pumps
S: Refrigerators and heat pumps run a heat engine backwards: work drives heat from a cold place to a hot one. A fridge cools its inside; a heat pump warms a house using heat drawn from cold outside air or ground.
LV: Introductory · Application
O: Describe refrigerators and heat pumps as heat engines run in reverse
O: Calculate coefficients of performance and their Carnot limits
PRE: Heat engines
H: Coefficients of performance
E: COP_{fridge} = Q_{c}/W
E: COP_{HP} = Q_{h}/W = COP_{fridge} + 1
E: COP_{HP,max} = T_{h}/(T_{h} − T_{c}) :: Carnot limit
H: How a vapour-compression cycle works
- Compressor raises refrigerant pressure and temperature.
- Condenser (hot side) releases heat; refrigerant liquefies.
- Expansion valve drops pressure; refrigerant cools.
- Evaporator (cold side) absorbs heat; refrigerant boils.
H: Why heat pumps matter
P: A heat pump with COP 3 delivers 3 kWh of heat per kWh of electricity: 300% "efficiency", by moving existing heat rather than generating it. This makes them central to decarbonising heating. COP falls as the outside temperature drops.
X: A heat pump moves heat from 0 °C outdoors to 35 °C radiators. Maximum COP?
> T_{h}/(T_{h} − T_{c}) = 308/35 = 8.8
> Real systems reach ~3–4
!: A fridge with its door open heats the kitchen: it rejects Q_{c} + W, more than it removes.
Q: What is the coefficient of performance of a heat pump? | Heat delivered divided by work input.
Q: Why can a heat pump's COP exceed 1? | It moves heat rather than creating it; the heat delivered includes heat taken from outside.
M1: A fridge removes 300 J using 100 J of work. COP: | 3 | 4 | 0.33 | 1 | Q_{c}/W.
M2: A heat pump's COP is highest when: | The temperature difference is small | Outside is very cold | Radiators are very hot | It works hardest | Carnot COP ∝ 1/ΔT.
T: Coefficient of performance (refrigerator) | COP_{R} = Q_{C}/W
T: Coefficient of performance (heat pump) | COP_{HP} = Q_{H}/W = COP_{R} + 1
SUM: Work moves heat from cold to hot; Q_{H} = Q_{C} + W.
SUM: Carnot limits: COP_{HP} = T_{H}/(T_{H} − T_{C}); real heat pumps reach about 3–4.
SRC: OpenStax, University Physics Volume 2, section 4.3 "Refrigerators and Heat Pumps" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/4-3-refrigerators-and-heat-pumps
SRC: Çengel Y. A., Boles M. A., Thermodynamics: An Engineering Approach, 9th edition, McGraw-Hill | secondary | 2019
EV: established | Standard thermodynamics; real COPs depend strongly on the temperature difference.
Q: Can leaving a fridge door open cool a kitchen? | No: the fridge dumps Q_{C} + W into the room, so the room warms.
M3@2,3: What is the Carnot COP of a heat pump heating a house to 20 °C from outside air at 0 °C? | About 15 | About 1.0 | About 0.07 | About 3.0 | COP_{HP} = T_{H}/(T_{H} − T_{C}) = 293/20 ≈ 14.7; real units manage about 3–4.
SA2@1,2: Explain why a heat pump can deliver more heat than the electrical energy it uses, without breaking energy conservation. | It doesn't create energy: it moves heat Q_{C} from the cold outside air into the house, using work W. The house receives Q_{H} = Q_{C} + W, which exceeds W. Energy is conserved; the extra comes from the outside air. | heat moved from outside ; work used to move it ; Q_{H} = Q_{C} + W ; exceeds W without breaking conservation

## Thermal efficiency
S: Thermal efficiency measures how much of the heat put into an engine becomes useful work. It's limited fundamentally by the Carnot bound and practically by friction, heat leaks, incomplete combustion and finite-rate heat transfer.
LV: Intermediate · Application
O: Compare actual and Carnot efficiencies of engines
O: Explain why raising the hot temperature improves efficiency
PRE: Heat engines
H: Measures
E: η = W/Q_{in}
E: η_{Carnot} = 1 − T_{c}/T_{h}
E: η_{II} = η/η_{Carnot} :: second-law (exergy) efficiency
E: η_{CA} = 1 − √(T_{c}/T_{h}) :: Curzon–Ahlborn efficiency at maximum power
H: Raising efficiency
- Raise T_{h} (better turbine materials, supercritical steam) or lower T_{c}.
- Recover waste heat (combined cycles, combined heat and power, which reaches ~80% overall use).
- Reduce friction and heat losses.
H: Maximum power vs efficiency
P: An engine at Carnot efficiency must run infinitely slowly, giving zero power. Real engines trade efficiency for power. The Curzon–Ahlborn efficiency, 1 − √(T_{c}/T_{h}), predicts real power stations' efficiencies surprisingly well.
X: A plant runs between 838 K and 298 K. Compare Carnot and Curzon–Ahlborn efficiencies.
> Carnot: 1 − 298/838 = 64%
> CA: 1 − √0.356 = 40%, close to typical observed ~40%
!: Efficiency figures for electric cars and power stations aren't comparable without including the efficiency of generating the electricity.
Q: What is the Curzon–Ahlborn efficiency? | The efficiency at maximum power for an endoreversible engine: 1 − √(T_{c}/T_{h}).
Q: Why can't real engines reach Carnot efficiency? | Carnot efficiency requires infinitely slow reversible operation, giving zero power; friction and heat leaks also reduce it.
M1: Raising the hot reservoir temperature: | Increases maximum efficiency | Decreases it | Has no effect | Makes η = 1 | 1 − T_{c}/T_{h}.
M2: Combined heat and power improves overall efficiency by: | Using the rejected heat for heating | Exceeding the Carnot limit | Removing the cold sink | Burning more fuel | Waste heat becomes useful.
T: Carnot efficiency | η_{C} = 1 − T_{C}/T_{H}, the maximum for any engine between two temperatures
T: Second-law efficiency | Actual efficiency divided by the Carnot efficiency
SUM: η ≤ 1 − T_{C}/T_{H}, with temperatures in kelvin.
SUM: Higher T_{H} or lower T_{C} raise the limit; materials limit T_{H}.
SRC: OpenStax, University Physics Volume 2, section 4.5 "The Carnot Cycle" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/4-5-the-carnot-cycle
SRC: Çengel Y. A., Boles M. A., Thermodynamics: An Engineering Approach, 9th edition, McGraw-Hill | secondary | 2019
EV: established | The Carnot limit is a strict consequence of the second law.
Q: Why must Carnot efficiency use kelvin, not °C? | The formula comes from ratios of absolute temperatures; °C gives wrong (even negative) results.
M3@2,3: A steam turbine runs between 550 °C and 30 °C and is 40% efficient. What is its second-law efficiency? | About 63% | About 40% | About 95% | About 26% | η_{C} = 1 − 303/823 ≈ 0.632; 0.40/0.632 ≈ 0.63.
SA2@2: Explain why combined-cycle gas power stations are more efficient than single-cycle ones. | A gas turbine runs at very high T_{H} but exhausts hot gas (around 600 °C). In a combined cycle that exhaust heats steam for a second turbine, which rejects heat near ambient temperature. The overall cycle spans a larger temperature range, raising efficiency to about 60%. | gas turbine exhaust is hot ; used to raise steam ; second turbine extracts more work ; wider temperature range raises efficiency

## Second law of thermodynamics
S: The second law says heat flows spontaneously only from hot to cold, and no cyclic process can turn heat entirely into work. Equivalently, the entropy of an isolated system never decreases. It gives time its direction.
LV: Introductory · Foundation
O: State the second law in the Kelvin–Planck and Clausius forms
O: Explain why the two statements are equivalent
PRE: Thermal efficiency
H: Classic statements
- **Kelvin–Planck**: no cyclic engine can take heat from one reservoir and convert it entirely to work.
- **Clausius**: no cyclic device can transfer heat from cold to hot with no other effect.
- **Entropy**: ΔS_{isolated} ≥ 0.
- All three are equivalent: violating one lets you violate the others.
H: Consequences
- Maximum engine efficiency (Carnot).
- Irreversibility: friction, mixing, heat flow across finite ΔT all create entropy.
- The arrow of time: we remember the past, not the future; eggs break but don't unbreak.
H: Statistical view
P: The second law is overwhelmingly probable rather than absolute: there are vastly more disordered microstates than ordered ones. For 10^{23} particles, a spontaneous decrease of entropy is so improbable it never happens in practice, though small fluctuations are measurable in tiny systems (fluctuation theorems).
X: Why can't a ship power itself by extracting heat from the ocean and turning it all into work?
> That would take heat from a single reservoir and convert it entirely to work
> It violates Kelvin–Planck (a perpetual motion machine of the second kind)
!: Local entropy can decrease (living things, fridges) if more entropy is produced elsewhere.
Q: State the Clausius form of the second law. | Heat can't flow from cold to hot by itself, with no other effect.
Q: Is the second law absolute? | It's statistical: decreases are possible but astronomically unlikely for large systems.
M1: Which is impossible? | An engine converting all heat from one reservoir into work in a cycle | A heat pump | A fridge cooling below room temperature | An engine with 30% efficiency | Kelvin–Planck.
M2: A living cell decreases its own entropy. This is allowed because: | It increases the entropy of its surroundings more | The second law doesn't apply to life | It's not a closed system so entropy can't be defined | Cells are reversible | Total entropy still increases.
T: Kelvin–Planck statement | No cyclic process can turn heat from a single reservoir entirely into work
T: Clausius statement | Heat can't flow spontaneously from a colder to a hotter body
T: Perpetual motion machine of the second kind | A hypothetical engine converting heat entirely to work; forbidden by the second law
SUM: Violating one statement would let you violate the other, so they are equivalent.
SUM: In entropy terms: the total entropy of an isolated system never decreases.
SRC: Clausius R., "Ueber verschiedene für die Anwendung bequeme Formen der Hauptgleichungen der mechanischen Wärmetheorie", Annalen der Physik 201, 353–400 | primary | 1865 | https://doi.org/10.1002/andp.18652010702
SRC: OpenStax, University Physics Volume 2, section 4.1 "Reversible and Irreversible Processes" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/4-1-reversible-and-irreversible-processes
EV: established | The second law has never been observed to fail for macroscopic systems.
Q: Is a refrigerator a violation of the Clausius statement? | No: heat flows from cold to hot only because work is done; it isn't spontaneous.
M3@2,3: A ship engine claims to run by extracting heat from the ocean and turning it all into work. Which law forbids it? | The second law (Kelvin–Planck statement) | The first law, as it creates energy | The zeroth law, as temperatures differ | Nothing forbids it, as the ocean is huge | Energy is conserved, but turning heat from one reservoir fully into work in a cycle is forbidden.
SA2@1,2: Show that an engine violating the Kelvin–Planck statement could be used to violate the Clausius statement. | Suppose an engine turns heat Q from a hot body entirely into work W = Q. Use W to drive a refrigerator that takes Q_{C} from a cold body and delivers Q_{C} + W to the hot body. The net effect is Q_{C} moving from cold to hot with nothing else changed, violating Clausius. | assume a perfect engine ; use its work to drive a refrigerator ; net heat from cold to hot ; Clausius violated

## Entropy
S: Entropy measures how many microscopic arrangements correspond to a system's macroscopic state, or equivalently how much energy is dispersed and unavailable for work. Isolated systems evolve towards maximum entropy.
LV: Intermediate · Foundation
O: Define entropy thermodynamically (dS = dQ_{rev}/T) and statistically (S = k_{B} ln Ω)
O: Calculate entropy changes for heating and phase changes
PRE: Second law of thermodynamics
H: Definitions
E: dS = δQ_{rev}/T :: Clausius (thermodynamic)
E: S = k_{B} ln Ω :: Boltzmann (statistical)
E: S = −k_{B}Σp_{i} ln p_{i} :: Gibbs
- Units J K^{-1}; a state function.
H: Calculating ΔS
- Heating: ΔS = mc ln(T_{2}/T_{1}).
- Phase change: ΔS = mL/T.
- Ideal gas: ΔS = nC_{V} ln(T_{2}/T_{1}) + nR ln(V_{2}/V_{1}).
- Mixing two different gases: ΔS = −nR Σx_{i} ln x_{i} > 0.
H: Entropy and information
P: Shannon's information entropy has the same form as Gibbs'. Landauer's principle: erasing one bit of information dissipates at least k_{B}T ln 2 of heat. This resolved the paradox of Maxwell's demon: the demon must erase its memory, generating the entropy it seemed to remove.
X: 1 kg of ice melts at 273 K. Entropy change?
> ΔS = 334 000/273 = 1220 J K^{-1}
!: "Disorder" is a loose description; the precise meaning is the number of accessible microstates (or spread of energy).
Q: State Boltzmann's entropy formula. | S = k_{B} ln Ω.
Q: What is Landauer's principle? | Erasing a bit of information dissipates at least k_{B}T ln 2 of heat.
M1: Heat Q flows from a hot body at T_{h} to a cold body at T_{c}. Total entropy change: | Q/T_{c} − Q/T_{h} > 0 | Zero | Negative | Q/T_{h} | The cold body gains more entropy than the hot loses.
M2: The entropy change when 2 mol of ideal gas double their volume isothermally: | 2R ln 2 | R ln 2 | 0 | 2R | nR ln(V_{2}/V_{1}).
T: Entropy | A state function measuring the number of microstates consistent with a macrostate
T: Microstate | A complete specification of every particle's state
SUM: ΔS = Q_{rev}/T at constant T; ΔS = mc ln(T_{2}/T_{1}) for heating.
SUM: The total entropy of an isolated system never decreases; it rises in every real process.
SRC: Schroeder D. V., An Introduction to Thermal Physics, chapters 2–3, Addison-Wesley | secondary | 2000
SRC: OpenStax, University Physics Volume 2, section 4.6 "Entropy" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/4-6-entropy
EV: established | Both definitions agree and are foundational.
Q: What is the entropy change when 1.0 kg of ice melts at 273 K (L = 334 kJ kg^{-1})? | ΔS = Q/T = 334 000/273 ≈ 1220 J K^{-1}.
M3@2,3: 1.0 kJ of heat flows from a 500 K body to a 250 K body. What is the total entropy change? | +2.0 J K^{-1} | −2.0 J K^{-1} | +6.0 J K^{-1} | 0 J K^{-1} | ΔS = −1000/500 + 1000/250 = −2 + 4 = +2 J K^{-1}: positive, as the second law requires.
SA2@1,2: A cell builds highly ordered proteins, lowering its entropy. Explain why this doesn't break the second law. | The cell isn't isolated. It takes in food (or sunlight) and releases heat and waste to its surroundings, raising their entropy by more than the cell's entropy falls. The total entropy of cell plus surroundings increases. | cell is an open system ; releases heat and waste ; surroundings' entropy rises more ; total entropy increases

## Reversible and irreversible processes
S: A reversible process can be undone exactly, leaving no change anywhere; it happens through a sequence of equilibrium states and creates no entropy. All real processes are irreversible to some degree.
LV: Intermediate · Foundation
O: Distinguish reversible from irreversible processes and give sources of irreversibility
O: Relate irreversibility to entropy generation
PRE: Entropy
H: Reversibility requires
- Quasi-static change (infinitely slow).
- No friction or other dissipation.
- Heat transfer only across infinitesimal temperature differences.
H: Sources of irreversibility
- Friction, viscosity, electrical resistance.
- Heat flow across finite temperature differences.
- Free expansion, mixing, chemical reactions far from equilibrium.
- Inelastic deformation.
E: ΔS_{total} = 0 (reversible); ΔS_{total} > 0 (irreversible)
H: Why reversible processes matter
P: They're ideal limits: they give maximum work from engines and minimum work for refrigerators. Calculating entropy changes uses an imagined reversible path between the same end states, because entropy is a state function.
X: Find the entropy change of a gas in free expansion from V to 2V (1 mol).
> Free expansion is irreversible (no heat flows), but S is a state function
> Use a reversible isothermal path: ΔS = R ln 2 = 5.8 J K^{-1}
!: Q = 0 doesn't imply ΔS = 0 for an irreversible process; dS = δQ/T only holds for reversible heat.
Q: What makes a process reversible? | It proceeds through equilibrium states with no dissipation, so it can be undone with no net change anywhere.
Q: How do you calculate ΔS for an irreversible process? | Use any reversible path between the same initial and final states.
M1: Which is irreversible? | Friction heating a block | Very slow isothermal expansion | An ideal Carnot cycle | Infinitely slow compression | Dissipation.
M2: In a reversible process, total entropy of system plus surroundings: | Stays constant | Increases | Decreases | Is undefined | No entropy generated.
T: Reversible process | An idealised process that can be undone leaving no change anywhere; total ΔS = 0
T: Irreversibility | Friction, unrestrained expansion, heat flow across a finite temperature difference, mixing
SUM: Real processes are irreversible and generate entropy; reversible ones are limits approached slowly.
SUM: Only reversible engines reach Carnot efficiency.
SRC: OpenStax, University Physics Volume 2, section 4.1 "Reversible and Irreversible Processes" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/4-1-reversible-and-irreversible-processes
SRC: Callen H. B., Thermodynamics and an Introduction to Thermostatistics, 2nd edition, chapter 4, Wiley | secondary | 1985
EV: established | Standard thermodynamics.
Q: Why is heat flow across a large temperature difference irreversible? | It generates entropy (Q/T_{C} − Q/T_{H} > 0) and can't be undone without outside work.
M3@2,3: 1.0 mol of ideal gas expands freely into a vacuum, doubling its volume. What is the entropy change of the gas? | +5.8 J K^{-1}, although no heat flowed | 0, because no heat flowed | −5.8 J K^{-1}, as it is now spread out | +1.0 J K^{-1}, one unit per mole | Entropy is a state function: ΔS = nR ln 2 ≈ 5.76 J K^{-1}, found along a reversible isothermal path between the same states.
SA2@2: Explain why stirring a cup of tea is irreversible though stirring it the opposite way doesn't "unstir" it. | Stirring's work is turned into thermal energy by viscous friction, spreading energy among many molecules and raising entropy. Reversing the spoon doesn't collect that energy back into ordered motion: the process generates entropy and can't be undone without changing the surroundings. | work dissipated by friction ; energy spread among molecules ; entropy rises ; can't be reversed

## Carnot cycle
S: The Carnot cycle is the ideal reversible engine: two isothermal and two adiabatic steps between a hot and a cold reservoir. No engine working between the same temperatures can be more efficient.
LV: Intermediate · Application
O: Describe the four stages of the Carnot cycle
O: Derive the Carnot efficiency from the cycle
PRE: Reversible and irreversible processes
H: The four steps
- Isothermal expansion at T_{h}: absorb Q_{h}.
- Adiabatic expansion: cool from T_{h} to T_{c}.
- Isothermal compression at T_{c}: reject Q_{c}.
- Adiabatic compression: warm back to T_{h}.
E: Q_{c}/Q_{h} = T_{c}/T_{h}
E: η_{Carnot} = 1 − T_{c}/T_{h}
H: Carnot's theorem
P: All reversible engines between the same two reservoirs have the same efficiency, and no engine is more efficient. If one were, running it with a reversed Carnot engine would move heat from cold to hot for free. This lets us define the thermodynamic temperature scale independent of any substance.
X: Maximum efficiency of an engine between 500 °C and 20 °C?
> η = 1 − 293/773 = 62%
!: Use kelvin, not Celsius, in Carnot's formula.
Q: What are the four steps of the Carnot cycle? | Isothermal expansion, adiabatic expansion, isothermal compression, adiabatic compression.
Q: State Carnot's theorem. | No engine operating between two reservoirs can be more efficient than a reversible one, and all reversible engines between them are equally efficient.
M1: Carnot efficiency between 400 K and 300 K: | 25% | 75% | 33% | 100% | 1 − 300/400.
M2: To reach 100% Carnot efficiency you'd need: | A cold reservoir at 0 K | Infinite T_{h} only | No friction only | A larger engine | 1 − T_{c}/T_{h} = 1 requires T_{c} = 0.
T: Carnot cycle | A reversible cycle of two isothermal and two adiabatic stages
T: Carnot's theorem | No engine between two reservoirs can beat a reversible one, and all reversible ones are equally efficient
SUM: Isothermal expansion at T_{H}; adiabatic expansion; isothermal compression at T_{C}; adiabatic compression.
SUM: Q_{C}/Q_{H} = T_{C}/T_{H}, so η = 1 − T_{C}/T_{H}.
SRC: Carnot S., Réflexions sur la puissance motrice du feu, Paris | primary | 1824
SRC: OpenStax, University Physics Volume 2, section 4.5 "The Carnot Cycle" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/4-5-the-carnot-cycle
EV: established | Carnot's theorem follows from the second law.
Q: Why can't a real engine run a Carnot cycle? | Isothermal stages would have to be infinitely slow, giving zero power.
M3@2,3: A Carnot engine between 600 K and 300 K absorbs 1200 J per cycle. How much heat does it reject? | 600 J | 300 J | 900 J | 1200 J | Q_{C} = Q_{H}T_{C}/T_{H} = 1200 × 300/600 = 600 J; W = 600 J and η = 50%.
SA2@1,2: Show that the Carnot cycle produces no net entropy change in the reservoirs. | The hot reservoir loses Q_{H}, entropy change −Q_{H}/T_{H}; the cold one gains Q_{C}, change +Q_{C}/T_{C}. For a Carnot cycle Q_{C}/Q_{H} = T_{C}/T_{H}, so these cancel; the working fluid returns to its starting state, so total ΔS = 0, as for any reversible process. | hot reservoir loses Q_{H}/T_{H} ; cold gains Q_{C}/T_{C} ; ratio makes them equal ; total zero

## Thermodynamic potentials
S: Thermodynamic potentials (U, H, F, G) are energy-like state functions, each natural for different controlled conditions. The right potential tells you the useful work available and the direction of spontaneous change.
LV: Advanced · Foundation
O: Define U, H, F and G and their natural variables
O: Choose the right potential for given controlled conditions
PRE: Entropy
H: The four potentials
E: U :: dU = T dS − p dV (natural variables S, V)
E: H = U + pV :: dH = T dS + V dp (S, p)
E: F = U − TS :: dF = −S dT − p dV (T, V)
E: G = H − TS :: dG = −S dT + V dp (T, p)
- Related by Legendre transforms that swap a variable for its conjugate.
H: Minimum principles
- Fixed S and V: U is minimised at equilibrium.
- Fixed T and V: F is minimised.
- Fixed T and p: G is minimised (most chemistry and biology).
H: Uses
- Derivatives give other quantities: S = −(∂F/∂T)_{V}, p = −(∂F/∂V)_{T}, V = (∂G/∂p)_{T}.
- Statistical mechanics connects them to the partition function: F = −k_{B}T ln Z.
X: From F = −k_{B}T ln Z, how do you get pressure?
> p = −(∂F/∂V)_{T} = k_{B}T (∂ln Z/∂V)_{T}
> For an ideal gas Z ∝ V^{N}, giving pV = Nk_{B}T
!: Each potential is useful only with its natural variables held fixed; using G for a constant-volume process gives the wrong criterion.
Q: Which potential is minimised at constant temperature and pressure? | The Gibbs free energy G.
Q: How are the potentials related mathematically? | By Legendre transformations.
M1: Helmholtz free energy is: | U − TS | H − TS | U + pV | U − pV | Definition.
M2: The partition function gives F through: | F = −k_{B}T ln Z | F = k_{B}T Z | F = ln Z | F = −Z/k_{B}T | Bridge between statistical and thermal physics.
T: Natural variables | The variables in which a potential's differential is simplest: U(S, V), H(S, p), F(T, V), G(T, p)
T: Legendre transform | The operation (such as F = U − TS) that swaps a variable for its conjugate
SUM: dU = TdS − pdV; dH = TdS + Vdp; dF = −SdT − pdV; dG = −SdT + Vdp.
SUM: At fixed T and V, F is minimised at equilibrium; at fixed T and p, G is.
SRC: Callen H. B., Thermodynamics and an Introduction to Thermostatistics, 2nd edition, chapters 5–6, Wiley | secondary | 1985
SRC: Blundell S. J., Blundell K. M., Concepts in Thermal Physics, 2nd edition, chapter 16, Oxford University Press | secondary | 2010
EV: established | Exact thermodynamic identities.
Q: Which potential is minimised for a reaction in an open beaker at room temperature? | The Gibbs free energy G (constant T and p).
M3@2,3: From dF = −SdT − pdV, what is (∂F/∂V)_{T}? | −p | −S | T | V | Comparing with dF = (∂F/∂T)_{V}dT + (∂F/∂V)_{T}dV gives (∂F/∂V)_{T} = −p.
SA2@1,2: Explain why chemists usually use G rather than U to predict whether reactions happen. | Reactions usually occur at constant temperature and pressure, exchanging heat and volume work with the surroundings. Under those conditions the quantity that must decrease for a spontaneous change is G = H − TS, which accounts for the surroundings' entropy change through the heat exchanged; U alone doesn't. | reactions at constant T and p ; system exchanges heat and work ; G decreases for spontaneous change ; includes surroundings' entropy

## Enthalpy
S: Enthalpy H = U + pV is the energy-like quantity whose change equals the heat absorbed at constant pressure. Chemists use it for reaction heats, engineers for flowing fluids in turbines and refrigerators.
LV: Intermediate · Application
O: Define enthalpy and show ΔH = Q at constant pressure
O: Use enthalpy changes for reactions and phase changes
PRE: Thermodynamic potentials
H: Properties
E: ΔH = Q_{p} :: heat at constant pressure
E: dH = T dS + V dp
E: C_{p} = (∂H/∂T)_{p}
- Negative ΔH: exothermic; positive: endothermic.
- Hess's law: ΔH for a reaction is path-independent.
H: Flow processes
P: For steady flow through a device (turbine, compressor, nozzle, valve), energy balance per kg is Δh + Δ(v^{2}/2) + gΔz = q − w_{shaft}. The pV term accounts for the work of pushing fluid in and out. Throttling (a valve) is isenthalpic: h stays constant.
H: Joule–Thomson effect
P: Throttling a real gas changes its temperature at constant enthalpy. Below the inversion temperature (nitrogen ~620 K; hydrogen ~200 K; helium ~40 K), gases cool on expansion, which is how air and nitrogen are liquefied (Linde process).
X: Combustion of methane: ΔH = −890 kJ mol^{-1}. Heat from burning 1 kg?
> 1000/16 = 62.5 mol
> 62.5 × 890 = 55.6 MJ
!: Enthalpy isn't "heat content"; ΔH equals heat only for constant-pressure processes with only pV work.
Q: What is enthalpy? | H = U + pV; its change equals the heat absorbed at constant pressure.
Q: What is conserved in a throttling process? | Enthalpy.
M1: An exothermic reaction has: | ΔH < 0 | ΔH > 0 | ΔH = 0 | ΔS = 0 | Heat released.
M2: Helium only cools on Joule–Thomson expansion below about: | 40 K | 300 K | 620 K | 4 K | Its inversion temperature is low.
T: Enthalpy | H = U + pV
T: Exothermic / endothermic | Releasing heat (ΔH < 0) / absorbing heat (ΔH > 0) at constant pressure
SUM: At constant pressure, ΔH = Q_{p}, which is why tables list enthalpies of reaction and vaporisation.
SUM: Hess's law: ΔH for a reaction is the same whatever route is taken (H is a state function).
SRC: Atkins P., de Paula J., Keeler J., Atkins' Physical Chemistry, 11th edition, chapter 2, Oxford University Press | secondary | 2018
SRC: NIST Chemistry WebBook, SRD 69 | data | 2023 | https://webbook.nist.gov/chemistry/
EV: established | Standard thermochemistry.
Q: What is the sign of ΔH for burning methane? | Negative: combustion is exothermic.
M3@2,3: Water boils at 100 °C and 1 atm with ΔH_{vap} = 40.7 kJ mol^{-1}. What is ΔU per mole (vapour volume ≈ 0.0306 m^{3} mol^{-1})? | About 37.6 kJ mol^{-1} | About 40.7 kJ mol^{-1} | About 43.8 kJ mol^{-1} | About 3.1 kJ mol^{-1} | ΔU = ΔH − pΔV ≈ 40.7 − 101 325 × 0.0306/1000 ≈ 40.7 − 3.1 = 37.6 kJ mol^{-1}.
SA2@2: Explain why ΔH rather than ΔU equals the heat measured in a coffee-cup calorimeter. | The cup is open to the atmosphere, so the reaction happens at constant pressure. Any volume change does work pΔV against the air. The heat exchanged is then Q = ΔU + pΔV = ΔH. | constant pressure ; volume change does work on the air ; Q = ΔU + pΔV ; equals ΔH

## Helmholtz free energy
S: The Helmholtz free energy F = U − TS is the maximum work a system can do at constant temperature. At fixed temperature and volume, systems evolve to minimise F, balancing low energy against high entropy.
LV: Advanced · Foundation
O: Define F = U − TS and interpret it as available work at constant temperature
O: Relate F to the partition function
PRE: Thermodynamic potentials
H: Properties
E: F = U − TS; dF = −S dT − p dV
E: W_{max} = −ΔF :: isothermal process
E: F = −k_{B}T ln Z :: statistical mechanics
- Spontaneous at fixed T and V if ΔF < 0.
H: Energy vs entropy
P: At low T, the U term dominates: systems order (crystals form, magnets align). At high T, −TS dominates: disorder wins (melting, demagnetisation). Phase transitions happen where the two balance.
H: Applications
- Elasticity of rubber: F decreases when chains are less stretched because entropy increases, giving an entropic restoring force (rubber bands warm when stretched).
- Solid-state physics and statistical mechanics calculations are usually done via F(T, V).
X: Why does a stretched rubber band contract when heated (unlike most materials)?
> Rubber's tension is mostly entropic: f ≈ −T(∂S/∂L)_{T}
> Higher T increases the tension, so a loaded band shortens
!: "Free" means available for work, not costless.
Q: What does −ΔF represent at constant temperature? | The maximum work obtainable from the system.
Q: Why does a rubber band's tension increase with temperature? | Its elasticity is entropic: tension ∝ T.
M1: At fixed T and V, equilibrium minimises: | F | G | H | S | Helmholtz.
M2: High temperature favours states with: | High entropy | Low entropy | Low energy only | Zero energy | −TS dominates.
T: Helmholtz free energy | F = U − TS
T: Partition function | Z = Σe^{−E_{i}/k_{B}T}, the sum over states from which F = −k_{B}T ln Z
SUM: At constant T, the maximum work a system can do is −ΔF.
SUM: At fixed T and V, systems settle where F is lowest: a balance of low energy and high entropy.
SRC: Callen H. B., Thermodynamics and an Introduction to Thermostatistics, 2nd edition, chapter 6, Wiley | secondary | 1985
SRC: Schroeder D. V., An Introduction to Thermal Physics, chapter 6, Addison-Wesley | secondary | 2000
EV: established | Standard statistical thermodynamics.
Q: Why is F called "free" energy? | −ΔF is the energy available ("free") to do work at constant temperature.
M3@2,3: A rubber band's tension mostly comes from entropy. What happens to a stretched band's tension when heated at fixed length? | It increases, as the −TS term grows | It decreases, as rubber expands | It stays the same | It drops to zero | For rubber F ≈ −TS(L): tension ∝ T(∂S/∂L), so higher T means stronger pull, which is why heated rubber contracts.
SA2@1,2: Explain the competition between energy and entropy in F = U − TS, using melting as an example. | Low U favours the ordered solid; high S favours the disordered liquid. At low T the U term dominates and the solid has lower F; at high T the −TS term dominates and the liquid wins. Melting happens at the temperature where the two phases' F (or G) are equal. | U favours order ; S favours disorder ; T sets which dominates ; transition where F equal

## Gibbs free energy
S: The Gibbs free energy G = H − TS decides whether a process happens spontaneously at constant temperature and pressure, the conditions of most chemistry and biology. Reactions go downhill in G.
LV: Intermediate · Application
O: Use ΔG = ΔH − TΔS to predict spontaneity
O: Relate ΔG° to the equilibrium constant
PRE: Helmholtz free energy
H: Properties
E: G = H − TS; dG = −S dT + V dp
E: ΔG = ΔH − TΔS
E: ΔG° = −RT ln K :: link to the equilibrium constant
- ΔG < 0 spontaneous; ΔG = 0 equilibrium; ΔG > 0 non-spontaneous.
- −ΔG = maximum non-expansion work (e.g. electrical: ΔG = −nFE in a cell).
H: Four cases
- ΔH < 0, ΔS > 0: always spontaneous.
- ΔH > 0, ΔS < 0: never.
- ΔH < 0, ΔS < 0: spontaneous at low T (freezing).
- ΔH > 0, ΔS > 0: spontaneous at high T (melting, boiling, dissolving some salts).
H: Life
P: Cells drive unfavourable reactions (building proteins, ΔG > 0) by coupling them to ATP hydrolysis (ΔG ≈ −50 kJ mol^{-1} in the cell). Batteries and fuel cells turn ΔG directly into electrical work.
X: At what temperature does ice melt, given ΔH = 6.01 kJ mol^{-1}, ΔS = 22.0 J mol^{-1} K^{-1}?
> ΔG = 0 ⇒ T = ΔH/ΔS = 6010/22.0 = 273 K
!: ΔG < 0 tells you a reaction can happen, not how fast. Diamond turning into graphite is spontaneous but immeasurably slow.
Q: What sign of ΔG means a reaction is spontaneous? | Negative.
Q: How is ΔG related to cell voltage? | ΔG = −nFE.
M1: A reaction with ΔH > 0 and ΔS > 0 is spontaneous: | At high temperature | At low temperature | Never | Always | −TΔS must outweigh ΔH.
M2: ΔG° = −RT ln K. If K > 1, ΔG° is: | Negative | Positive | Zero | Undefined | Products favoured.
T: Gibbs free energy | G = H − TS, minimised at equilibrium at constant T and p
T: Standard Gibbs energy change | ΔG°, related to the equilibrium constant by ΔG° = −RT ln K
SUM: ΔG < 0: spontaneous; ΔG = 0: equilibrium; ΔG > 0: non-spontaneous as written.
SUM: −ΔG is the maximum non-expansion work, such as electrical work in a cell: ΔG = −nFE.
SRC: Atkins P., de Paula J., Keeler J., Atkins' Physical Chemistry, 11th edition, chapters 3 and 6, Oxford University Press | secondary | 2018
SRC: Callen H. B., Thermodynamics and an Introduction to Thermostatistics, 2nd edition, Wiley | secondary | 1985
EV: established | Standard chemical thermodynamics.
Q: When is a reaction with ΔH > 0 and ΔS > 0 spontaneous? | At high enough temperature, when TΔS > ΔH.
M3@2,3: A reaction has ΔH = +50 kJ mol^{-1} and ΔS = +200 J K^{-1} mol^{-1}. Above what temperature is it spontaneous? | 250 K | 4 K | 2500 K | 25 K | ΔG = ΔH − TΔS < 0 when T > 50 000/200 = 250 K.
SA2@2: Explain why ice melts above 0 °C and water freezes below it, using G. | For each phase G = H − TS. Liquid has higher H and higher S than ice. Below 273 K the TS term is small, so ice has lower G and is stable; above 273 K, TS for the liquid wins and liquid has lower G. At 273 K (1 atm) their G are equal and they coexist. | G = H − TS for each phase ; liquid has higher H and S ; TS decides the lower G ; equal at 0 °C

## Chemical and phase equilibrium
S: At equilibrium, matter has no tendency to move between phases or react further: each species has the same chemical potential everywhere it can go. This sets boiling points, solubility, osmotic pressure and reaction yields.
LV: Advanced · Foundation
O: State the equilibrium condition in terms of chemical potential
O: Use the Clausius–Clapeyron equation for phase boundaries
PRE: Gibbs free energy
H: Chemical potential
E: μ_{i} = (∂G/∂n_{i})_{T,p}
- Matter flows from high μ to low μ, as heat flows from high T to low T.
- Phase equilibrium: μ_{liquid} = μ_{vapour}; chemical equilibrium: Σν_{i}μ_{i} = 0.
H: Phase rule
E: F = C − P + 2 :: Gibbs phase rule: degrees of freedom F, components C, phases P
- Pure water: at a triple point, F = 1 − 3 + 2 = 0: fixed T and p (273.16 K, 611.657 Pa).
H: Colligative properties
- Dissolved solute lowers the solvent's μ: boiling point rises, freezing point falls (salt on roads), osmotic pressure Π = cRT (van 't Hoff).
- Le Chatelier's principle: a system at equilibrium shifts to counter imposed changes.
X: Osmotic pressure of 0.15 mol L^{-1} NaCl (two ions) at 310 K?
> c = 300 mol m^{-3} of particles
> Π = 300 × 8.31 × 310 ≈ 7.7 × 10^{5} Pa (~7.6 atm): why red blood cells burst in pure water
!: Equilibrium is dynamic: molecules still cross between phases, at equal rates.
Q: What is chemical potential? | The change in Gibbs free energy per mole of a species added, at constant T and p.
Q: State the Gibbs phase rule. | F = C − P + 2.
M1: At water's triple point, the degrees of freedom are: | 0 | 1 | 2 | 3 | Fixed T and p.
M2: Salt is spread on icy roads because it: | Lowers the freezing point of water | Raises it | Absorbs heat | Reacts with ice | Colligative effect.
T: Chemical potential | μ, the Gibbs free energy per mole (or particle) of a species
T: Clausius–Clapeyron equation | dp/dT = L/(TΔV), the slope of a phase boundary
T: Triple point | The unique temperature and pressure where solid, liquid and gas coexist
SUM: In equilibrium a species has the same μ in every phase where it is present.
SUM: Water's melting line slopes backward (ΔV < 0 on melting), so pressure lowers its melting point.
SRC: Atkins P., de Paula J., Keeler J., Atkins' Physical Chemistry, 11th edition, chapter 4, Oxford University Press | secondary | 2018
SRC: Blundell S. J., Blundell K. M., Concepts in Thermal Physics, 2nd edition, chapter 28, Oxford University Press | secondary | 2010
EV: established | Exact thermodynamic results.
Q: Why does water boil below 100 °C on a high mountain? | The air pressure is lower, so the vapour pressure reaches it at a lower temperature.
M3@2,3: Using Clausius–Clapeyron (L ≈ 40.7 kJ mol^{-1}), roughly what is water's boiling point at 0.70 atm? | About 90 °C | About 70 °C | About 100 °C | About 110 °C | ln(p_{2}/p_{1}) = −(L/R)(1/T_{2} − 1/T_{1}); ln 0.7 = −0.357 gives 1/T_{2} ≈ 1/373 + 0.357 × 8.31/40 700 ≈ 0.002754, T_{2} ≈ 363 K.
SA2@1,2: Explain why pressure-cooker food cooks faster. | The sealed cooker raises the pressure to about 2 atm. By Clausius–Clapeyron the boiling point rises (to about 120 °C), so the water and food are hotter, and cooking reactions, which speed up strongly with temperature, run faster. | sealed cooker raises pressure ; boiling point rises ; about 120 °C ; reactions faster at higher temperature

## Maxwell relations
S: Maxwell relations are equalities between partial derivatives of thermodynamic variables, following from the potentials being state functions. They let you calculate hard-to-measure quantities, like entropy changes, from easy ones like p, V and T.
LV: Advanced · Application
O: Derive the Maxwell relations from the potentials
O: Use them to express unmeasurable quantities in terms of measurable ones
PRE: Thermodynamic potentials
H: The four relations
E: (∂T/∂V)_{S} = −(∂p/∂S)_{V}
E: (∂T/∂p)_{S} = (∂V/∂S)_{p}
E: (∂S/∂V)_{T} = (∂p/∂T)_{V}
E: (∂S/∂p)_{T} = −(∂V/∂T)_{p}
- From equality of mixed partial derivatives of U, H, F, G.
H: Uses
- Entropy change with volume from the equation of state: (∂S/∂V)_{T} = (∂p/∂T)_{V}.
- General relation C_{p} − C_{V} = TVα^{2}/κ_{T} (α expansivity, κ_{T} compressibility) — always positive.
- Energy equation: (∂U/∂V)_{T} = T(∂p/∂T)_{V} − p, zero for an ideal gas (internal energy independent of volume).
X: Show U of an ideal gas doesn't depend on V.
> (∂U/∂V)_{T} = T(∂p/∂T)_{V} − p
> With p = nRT/V: T(nR/V) − nRT/V = 0
!: Always note which variable is held constant; the same derivative with a different constant is a different quantity.
Q: What makes Maxwell relations true? | Thermodynamic potentials are state functions, so their mixed second derivatives are equal.
Q: What does (∂S/∂V)_{T} = (∂p/∂T)_{V} let you do? | Find entropy changes from measurable p–V–T data.
M1: Maxwell relations come from: | Equality of mixed partial derivatives | The first law only | Experiment | Statistical mechanics only | Exact differentials.
M2: For an ideal gas, (∂U/∂V)_{T} = : | 0 | p | nR | T | Internal energy depends only on T.
T: Maxwell relation | An equality of mixed partial derivatives, such as (∂S/∂V)_{T} = (∂p/∂T)_{V}
T: Exact differential | A differential of a state function, whose mixed second derivatives are equal
SUM: From dF = −SdT − pdV: (∂S/∂V)_{T} = (∂p/∂T)_{V}. From dG: (∂S/∂p)_{T} = −(∂V/∂T)_{p}.
SUM: They turn entropy changes, which can't be measured directly, into p, V, T data.
SRC: Callen H. B., Thermodynamics and an Introduction to Thermostatistics, 2nd edition, chapter 7, Wiley | secondary | 1985
SRC: Blundell S. J., Blundell K. M., Concepts in Thermal Physics, 2nd edition, chapter 16, Oxford University Press | secondary | 2010
EV: established | Exact consequences of state functions.
Q: Why must mixed partial derivatives of a potential be equal? | The potential is a smooth state function, so the order of differentiation doesn't matter.
M3@2,3: For an ideal gas, use (∂S/∂V)_{T} = (∂p/∂T)_{V} to find (∂S/∂V)_{T}. | nR/V | nRT/V^{2} | −nR/V | 0 | p = nRT/V gives (∂p/∂T)_{V} = nR/V, so isothermal expansion raises entropy by nR ln(V_{2}/V_{1}).
SA2@2: Use a Maxwell relation to explain why stretching a rubber band at constant temperature releases heat. | For rubber, a Maxwell relation gives (∂S/∂L)_{T} = −(∂f/∂T)_{L}. Experiment shows tension f rises with T at fixed length, so (∂S/∂L)_{T} < 0: stretching lowers entropy (chains align). At constant T, dQ = TdS < 0, so heat is released. | Maxwell relation for rubber ; tension rises with T ; entropy falls on stretching ; heat released

## Third law of thermodynamics
S: The third law says the entropy of a perfect crystal approaches zero as the temperature approaches absolute zero, and that absolute zero can't be reached in a finite number of steps.
LV: Advanced · Foundation
O: State the third law and its consequences for heat capacities
O: Explain why absolute zero is unattainable in a finite number of steps
PRE: Entropy
H: Statements
- **Nernst**: entropy changes in isothermal processes vanish as T → 0.
- **Planck**: S → 0 as T → 0 for a perfect crystal (a single ground state, Ω = 1).
- **Unattainability**: no finite sequence of processes reaches T = 0.
H: Consequences
- Heat capacities → 0 as T → 0 (otherwise ΔS = ∫C dT/T would diverge).
- Thermal expansion coefficients → 0.
- Absolute entropies can be tabulated (S° values in chemistry).
H: Residual entropy
P: Some solids are frozen in disorder: ice has residual entropy (~3.4 J mol^{-1} K^{-1}) because hydrogen positions can be arranged in many ways (Pauling's estimate R ln(3/2)). Glasses too. They aren't in true equilibrium at low T.
X: Why do coolest lab temperatures approach but never reach 0 K?
> Each cooling step (e.g. adiabatic demagnetisation) reduces T by a fraction
> The steps get smaller as entropy differences vanish; reaching 0 would need infinitely many
!: Absolute zero doesn't mean zero energy: quantum zero-point motion remains.
Q: State the third law. | The entropy of a perfect crystal approaches zero as T approaches 0 K, and 0 K can't be reached in finitely many steps.
Q: Why do heat capacities vanish as T → 0? | Otherwise entropy would diverge; quantum levels freeze out.
M1: The record lowest temperatures reached are about: | Tens of picokelvin | 1 K | 1 mK | Exactly 0 K | In atom traps and nuclear spin systems.
M2: Ice has residual entropy at 0 K because: | Hydrogen positions have many possible arrangements | It's not crystalline | It contains air | The third law fails | Frozen-in disorder.
T: Third law | The entropy of a perfect crystal tends to zero as T → 0 (Nernst–Planck)
T: Residual entropy | Entropy remaining near 0 K in disordered solids, such as ice's proton disorder
SUM: As T → 0, heat capacities and expansion coefficients go to zero.
SUM: Each cooling step removes a smaller fraction of entropy, so absolute zero can't be reached in finitely many steps.
SRC: Nernst W., "Über die Berechnung chemischer Gleichgewichte aus thermischen Messungen", Nachrichten von der Gesellschaft der Wissenschaften zu Göttingen, 1–40 | primary | 1906
SRC: Pauling L., "The structure and entropy of ice and of other crystals with some randomness of atomic arrangement", Journal of the American Chemical Society 57, 2680–2684 | primary | 1935 | https://doi.org/10.1021/ja01315a102
EV: established | Well established; the lowest temperatures reached are below a nanokelvin, never zero.
Q: Why must heat capacity go to zero as T → 0? | Otherwise ΔS = ∫C dT/T would diverge, contradicting finite entropy at 0 K.
M3@2,3: Why can magnetic cooling get a sample from 1 K to a few millikelvin but never to 0 K? | Each magnetise–demagnetise cycle removes a smaller share of entropy as the entropy curves converge at 0 K | Magnets lose their strength below 1 K | Heat leaks in faster than any method can remove it at 0 K | The sample freezes solid and stops responding to fields | The third law: S(T) curves for different fields meet at T = 0, so each step achieves less and infinitely many would be needed.
SA2@1,2: Explain the practical meaning of "absolute zero is unattainable". | Cooling methods work by repeated steps (for example magnetising and demagnetising a salt), each removing entropy. Near 0 K all entropy curves converge to zero, so each step lowers the temperature by a smaller fraction; infinitely many steps would be needed, so absolute zero is approached but never reached. | cooling by repeated steps ; entropy curves converge at 0 K ; each step achieves less ; infinitely many steps needed

## Thermodynamic cycles
S: Practical engines and refrigerators follow particular cycles chosen for their working fluid and hardware. Comparing them with the Carnot ideal shows where efficiency is lost.
LV: Intermediate · Application
O: Describe the Otto, Diesel, Rankine and refrigeration cycles
O: Calculate the efficiency of the ideal Otto cycle
PRE: Carnot cycle
H: Engine cycles
- **Otto** (petrol): isentropic compression, constant-volume heat addition, expansion, constant-volume rejection. η = 1 − r^{1−γ} (r = compression ratio).
- **Diesel**: heat added at constant pressure; higher compression ratios possible.
- **Brayton** (gas turbines, jet engines): constant-pressure heat addition and rejection; η = 1 − r_{p}^{(1−γ)/γ}.
- **Rankine** (steam power): pump, boiler, turbine, condenser; uses phase change for good heat transfer.
- **Stirling**: isothermal steps with a regenerator; can approach Carnot efficiency.
H: Refrigeration cycles
- Vapour compression (fridges, air conditioners, heat pumps).
- Absorption chillers (driven by heat).
- Gas cycles for cryogenics (Linde–Hampson, Claude).
X: Ideal Otto efficiency for r = 10, γ = 1.4?
> η = 1 − 10^{−0.4} = 1 − 0.398 = 60%
> Real engines reach ~35%: friction, heat loss, incomplete combustion
!: Raising the compression ratio in petrol engines is limited by knocking (premature ignition), not by thermodynamics.
Q: What determines ideal Otto cycle efficiency? | The compression ratio (and γ): η = 1 − r^{1−γ}.
Q: Which cycle do steam power stations use? | The Rankine cycle.
M1: Jet engines run on which cycle? | Brayton | Otto | Diesel | Rankine | Gas turbine.
M2: Stirling engines can approach Carnot efficiency because: | Heat exchange is isothermal with a regenerator | They have no moving parts | They use steam | They're very fast | Reversible isothermal heat transfer.
T: Otto cycle | The ideal petrol-engine cycle: adiabatic compression, constant-volume heating, adiabatic expansion, constant-volume cooling
T: Compression ratio | r = V_{max}/V_{min}
T: Rankine cycle | The steam-power cycle: pump, boiler, turbine, condenser
SUM: Ideal Otto efficiency η = 1 − 1/r^{γ−1}; higher compression ratio, higher efficiency (limited by knock).
SUM: Real engines reach well below the ideal cycle because of friction, heat loss and incomplete combustion.
SRC: Çengel Y. A., Boles M. A., Thermodynamics: An Engineering Approach, 9th edition, chapters 9–10, McGraw-Hill | secondary | 2019
SRC: OpenStax, University Physics Volume 2, chapter 4 "The Second Law of Thermodynamics" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/4-introduction
EV: established | Ideal-cycle results assume ideal gases and reversible stages.
Q: Why do diesel engines use higher compression ratios than petrol engines? | They ignite by compression heating, with no spark, so there's no knock limit from pre-mixed fuel.
M3@2,3: What is the ideal Otto efficiency for a compression ratio of 10 (γ = 1.4)? | About 60% | About 90% | About 40% | About 75% | η = 1 − 10^{−0.4} = 1 − 0.398 ≈ 0.60; real petrol engines achieve about 25–35%.
SA2@2: Describe the four stages of the Rankine cycle and where heat enters and leaves. | Water is pumped to high pressure (small work in); the boiler heats it to steam (heat in); steam expands through the turbine doing work; the condenser turns it back to water at low pressure (heat out to cooling water). | pump raises pressure ; boiler adds heat ; turbine does work ; condenser rejects heat

## Equations of state
S: An equation of state relates pressure, volume and temperature (and amount) for a substance. The ideal gas law works for dilute gases; real substances need corrections for molecular size and attraction.
LV: Intermediate · Application
O: Use the ideal gas law and know when it fails
O: Use the van der Waals equation and interpret its constants
PRE: Isobaric and isochoric processes
H: Ideal gas
E: pV = nRT = Nk_{B}T
- Assumes point particles with no forces between them.
- Good at low pressure and high temperature.
H: Real gases
E: (p + an^{2}/V^{2})(V − nb) = nRT :: van der Waals
- b: excluded volume (molecular size); a: attraction (reduces wall pressure).
- Predicts liquid–gas transition and a critical point.
- Virial expansion: pV/(nRT) = 1 + B(T)n/V + C(T)(n/V)^{2} + …
- Compressibility factor Z = pV/(nRT): 1 for ideal; < 1 when attraction dominates, > 1 at high pressure.
H: Other equations of state
- Solids: Birch–Murnaghan (high pressure, planetary interiors).
- Stars: degenerate electron gas p ∝ ρ^{5/3} (white dwarfs).
- Cosmology: p = wρc^{2} (w = 0 matter, 1/3 radiation, −1 dark energy).
X: 1 mol of CO_{2} in 1 L at 300 K: compare ideal and van der Waals pressures (a = 0.364 Pa m^{6} mol^{-2}, b = 4.27 × 10^{-5} m^{3} mol^{-1}).
> Ideal: 8.31 × 300/10^{-3} = 24.9 bar
> VdW: 2493/(0.957 × 10^{-3}) − 0.364/10^{-6} = 26.0 − 3.6 = 22.4 bar
!: The ideal gas law fails near condensation and at high pressures; check Z before trusting it.
P: **Investigate with the lab.** Change volume and temperature in turn and check that pV/T stays constant for the gas in the box.
IX: gas
Q: What do the van der Waals constants a and b represent? | a: intermolecular attraction; b: the volume occupied by molecules.
Q: What is the compressibility factor? | Z = pV/(nRT), equal to 1 for an ideal gas.
M1: An ideal gas obeys: | pV = nRT | pV^{γ} = constant always | p = ρg | pV = 0 | Definition.
M2: Real gases deviate most from ideal behaviour at: | High pressure and low temperature | Low pressure and high temperature | Room conditions | Vacuum | Molecules close together and slow.
M2: A fixed mass of ideal gas is heated from 300 K to 600 K at constant volume. What happens to its pressure? | It doubles | It halves | It stays the same | It rises by 300 Pa | p/T is constant at fixed volume, so doubling T doubles p.
T: Equation of state | A relation between p, V, T and amount for a substance
T: van der Waals equation | (p + an^{2}/V^{2})(V − nb) = nRT, with a for attraction and b for molecular volume
T: Compressibility factor | Z = pV/(nRT), equal to 1 for an ideal gas
SUM: Ideal gas: pV = nRT; good at low pressure and high temperature.
SUM: van der Waals predicts condensation and a critical point: T_{c} = 8a/(27Rb).
SRC: van der Waals J. D., Over de Continuiteit van den Gas- en Vloeistoftoestand, PhD thesis, Leiden | primary | 1873
SRC: Atkins P., de Paula J., Keeler J., Atkins' Physical Chemistry, 11th edition, chapter 1, Oxford University Press | secondary | 2018
EV: established | The van der Waals equation is qualitatively right but quantitatively approximate.
Q: What does the constant b in the van der Waals equation represent? | The volume excluded by the molecules themselves, per mole.
SA2@1,2: Explain why real gases deviate from the ideal gas law at high pressure and low temperature. | At high pressure molecules are close together, so their own volume is a noticeable fraction of the container (raising pV above ideal). At low temperature they move slowly, so attractions matter, pulling them together and lowering the pressure on the walls (lowering pV). The ideal law ignores both. | molecules' volume matters at high pressure ; attractions matter at low temperature ; effects on pressure ; ideal law ignores both
M3@2,3: Using van der Waals, a gas has a = 0.364 Pa m^{6} mol^{-2} and b = 4.27 × 10^{-5} m^{3} mol^{-1} (CO_{2}). What critical temperature does T_{c} = 8a/(27Rb) predict? | About 304 K | About 30 K | About 3000 K | About 273 K | T_{c} = 8 × 0.364/(27 × 8.31 × 4.27 × 10^{-5}) ≈ 2.91/9.58 × 10^{-3} ≈ 304 K, matching CO_{2}'s measured value.

## Critical points
S: A critical point is where the distinction between two phases disappears: above the critical temperature, liquid and gas merge into one supercritical fluid. Near critical points, matter shows universal behaviour with huge fluctuations.
LV: Advanced · Foundation
O: Describe the critical point and supercritical fluids
O: Explain critical opalescence and universality
PRE: Equations of state
H: The liquid–gas critical point
- Water: T_{c} = 647 K, p_{c} = 22.1 MPa. CO_{2}: 304 K, 7.4 MPa.
- Above T_{c}, no amount of pressure liquefies the gas.
- Van der Waals: T_{c} = 8a/(27Rb), p_{c} = a/(27b^{2}), V_{c} = 3nb.
H: Critical phenomena
- Compressibility, heat capacity and correlation length diverge.
- **Critical opalescence**: density fluctuations at all scales scatter light, turning a clear fluid milky.
- Power laws with critical exponents (e.g. ρ_{l} − ρ_{g} ∝ (T_{c} − T)^{β}, β ≈ 0.33).
- **Universality**: the same exponents for liquid–gas points and magnets (Ising class), explained by renormalisation group theory (Wilson, Nobel 1982).
H: Supercritical fluids
P: Supercritical CO_{2} dissolves substances like a liquid but flows like a gas: used to decaffeinate coffee, dry-clean, and as a power-cycle working fluid.
X: Using van der Waals constants for CO_{2}, estimate T_{c}.
> T_{c} = 8 × 0.364/(27 × 8.31 × 4.27 × 10^{-5}) = 304 K
!: Near critical points mean-field theories (like van der Waals) give wrong exponents; fluctuations dominate.
Q: What happens above the critical temperature? | Liquid and gas phases can no longer be distinguished; a gas can't be liquefied by pressure.
Q: What is universality in critical phenomena? | Very different systems share the same critical exponents near their critical points.
M1: Critical opalescence is caused by: | Large density fluctuations scattering light | Chemical reactions | Boiling | Impurities | Fluctuations at all length scales.
M2: Supercritical CO_{2} is used to: | Decaffeinate coffee | Make ice | Generate X-rays | Store hydrogen | Solvent properties.
T: Critical point | The end of the liquid–gas coexistence line, above which the two phases are indistinguishable
T: Supercritical fluid | A substance above its critical temperature and pressure
T: Critical exponent | A power describing how a property diverges or vanishes near a critical point
SUM: Water's critical point: 647 K, 22.1 MPa; CO_{2}: 304 K, 7.38 MPa.
SUM: Near the critical point, fluctuations grow at all scales (critical opalescence), and different systems share the same exponents.
SRC: Andrews T., "The Bakerian Lecture: On the continuity of the gaseous and liquid states of matter", Philosophical Transactions of the Royal Society 159, 575–590 | primary | 1869 | https://doi.org/10.1098/rstl.1869.0021
SRC: Stanley H. E., Introduction to Phase Transitions and Critical Phenomena, Oxford University Press | secondary | 1971
EV: established | Critical behaviour and universality are well confirmed; exponents are known from theory and experiment.
Q: What is supercritical CO_{2} used for? | Decaffeinating coffee and dry cleaning: it dissolves substances like a liquid but flows like a gas.
M3@2,3: CO_{2} has T_{c} = 304 K and p_{c} = 7.38 MPa. A sealed cylinder of CO_{2} at 20 °C holds what? | Liquid and vapour together, since 293 K is below T_{c} | Only gas, since CO_{2} is a gas at room temperature | A supercritical fluid, since the pressure is high | Solid dry ice, since it is under pressure | Below T_{c} compression can liquefy it, so a full cylinder holds liquid with vapour above at about 5.7 MPa; above 31 °C it becomes supercritical.
SA2@1,2: Explain why you can't liquefy a gas by compression alone above its critical temperature. | Above T_{c} there is no liquid–gas phase boundary to cross. Compressing the gas raises its density continuously into a supercritical fluid with no sudden condensation or surface; the molecules' kinetic energy is too high for a distinct liquid phase to form. | no phase boundary above T_{c} ; density rises continuously ; no condensation ; supercritical fluid

## Phase transitions
S: A phase transition is an abrupt change in a system's properties as a control parameter (temperature, pressure, field) crosses a critical value: melting, boiling, magnetisation, superconductivity. Their classification depends on how the free energy behaves.
LV: Advanced · Foundation
O: Distinguish first-order from continuous phase transitions
O: Describe an order parameter and give examples
PRE: Critical points
H: Classification
- **First order**: latent heat, discontinuous density or magnetisation, coexistence of phases, hysteresis (supercooling, superheating). Melting, boiling.
- **Continuous (second order)**: no latent heat; order parameter grows continuously from zero; diverging fluctuations. Ferromagnetism at the Curie point, superconductivity in zero field, superfluid helium.
H: Order parameters and symmetry breaking
- Order parameter: zero in the disordered phase, non-zero in the ordered phase (magnetisation, density difference, superfluid wavefunction).
- Ordering usually breaks a symmetry (rotational for magnets).
- Landau theory expands free energy in the order parameter: F = a(T − T_{c})m^{2} + bm^{4}.
H: Clausius–Clapeyron
E: dp/dT = L/(TΔV) :: slope of a first-order phase boundary
P: Water's ice–liquid line slopes backwards (ΔV < 0), so pressure lowers the melting point slightly: ~7.4 mK per atm.
X: Find the boiling-point rise of water per 1000 Pa near 100 °C (ΔV ≈ 1.67 m^{3} kg^{-1}).
> dT/dp = TΔV/L = 373 × 1.67/2.26 × 10^{6} = 2.76 × 10^{-4} K Pa^{-1}
> 0.28 K per kPa: why pressure cookers reach ~120 °C at 2 atm
!: Ice skating isn't explained by pressure melting (the effect is far too small); surface premelting and friction heating matter more.
Q: What distinguishes first-order from continuous transitions? | First-order have latent heat and discontinuities; continuous have none but show diverging fluctuations.
Q: What is an order parameter? | A quantity that's zero in the disordered phase and non-zero in the ordered phase.
M1: Which transition is continuous? | Ferromagnet at its Curie temperature (zero field) | Water boiling | Ice melting | Sublimation of dry ice | No latent heat.
M2: The Clausius–Clapeyron equation gives: | The slope of a phase boundary | Entropy at 0 K | Heat capacity | Critical exponents | dp/dT = L/(TΔV).
T: First-order transition | One with latent heat and a jump in density or entropy, such as boiling
T: Continuous transition | One with no latent heat, in which an order parameter grows smoothly from zero
T: Order parameter | A quantity that is zero in the disordered phase and non-zero in the ordered one, such as magnetisation
SUM: First-order: discontinuous first derivatives of G. Continuous: continuous first, singular higher derivatives.
SUM: Examples of continuous transitions: ferromagnets at the Curie point, superconductors, liquid–gas at the critical point.
SRC: Stanley H. E., Introduction to Phase Transitions and Critical Phenomena, Oxford University Press | secondary | 1971
SRC: Blundell S. J., Blundell K. M., Concepts in Thermal Physics, 2nd edition, chapter 28, Oxford University Press | secondary | 2010
EV: established | Standard statistical physics.
Q: What is the order parameter of a ferromagnet? | Its magnetisation.
M3@2,3: Iron loses its magnetism smoothly as it is heated through 1043 K, with no latent heat. What kind of transition is this? | A continuous (second-order) transition at the Curie point | A first-order transition like melting | Not a phase transition at all | A chemical reaction of the iron | The magnetisation falls continuously to zero at T_{C}; no latent heat is absorbed.
SA2@1,2: Explain why water can be supercooled below 0 °C without freezing. | Freezing is first-order: a crystal must nucleate, and small nuclei have a high surface energy that makes them unstable. In pure, still water with no surfaces or impurities to start crystals, nucleation can be delayed well below 0 °C until a disturbance or seed triggers sudden freezing. | first-order transition needs nucleation ; small nuclei unstable ; pure still water lacks seeds ; disturbance triggers freezing

## Non-equilibrium thermodynamics
S: Most of the world is out of equilibrium: heat flows, currents run, chemical reactions proceed, organisms live. Non-equilibrium thermodynamics describes flows driven by gradients, the entropy they produce, and the structures they can create.
LV: Advanced · Foundation
O: Describe transport processes driven by gradients
O: State the Onsager reciprocal relations and explain entropy production
PRE: Reversible and irreversible processes
H: Near equilibrium
E: J = L X :: fluxes proportional to forces (Fourier, Ohm, Fick laws)
E: σ = Σ J_{i}X_{i} ≥ 0 :: entropy production rate
- Onsager reciprocal relations: cross-coefficients are equal (L_{ij} = L_{ji}), e.g. thermoelectric Seebeck and Peltier effects are linked.
- Minimum entropy production for steady states near equilibrium (Prigogine).
H: Far from equilibrium
- **Dissipative structures**: order maintained by energy flow (convection cells, chemical oscillators like the Belousov–Zhabotinsky reaction, hurricanes, living cells).
- **Fluctuation theorems** (Jarzynski, Crooks): exact relations for small systems, e.g. ⟨e^{−W/k_{B}T}⟩ = e^{−ΔF/k_{B}T}, letting free energies be measured from non-equilibrium experiments like pulling single molecules.
H: Life
P: Living organisms are open systems that keep their internal order by taking in low-entropy energy (sunlight, food) and exporting high-entropy heat. Earth receives ~1 visible photon for every ~20 infrared photons it emits: the entropy flow that powers the biosphere.
X: Peltier and Seebeck effects: how are they related?
> Seebeck: a temperature difference drives a voltage (thermocouples)
> Peltier: a current drives heat flow (thermoelectric coolers)
> Onsager: Π = ST (Kelvin relation) links the coefficients
!: Steady state isn't equilibrium: a constant heat flow through a rod has unchanging temperatures but continuous entropy production.
Q: What do Onsager's reciprocal relations state? | Cross-coupling coefficients between fluxes and forces are equal, L_{ij} = L_{ji}.
Q: What is a dissipative structure? | An ordered pattern maintained by a continuous flow of energy and production of entropy.
M1: Fourier's law of heat conduction is an example of: | A linear flux–force relation | A conservation law | Equilibrium | The third law | Heat flux ∝ temperature gradient.
M2: The Jarzynski equality relates: | Non-equilibrium work to equilibrium free-energy differences | Entropy to temperature | Pressure to volume | Heat to work at equilibrium | Exact for any driving speed.
T: Flux and force | A flow (heat, particles, charge) driven by a gradient (temperature, concentration, potential)
T: Onsager reciprocal relations | Symmetry of the coupling coefficients between different fluxes and forces near equilibrium
T: Dissipative structure | An ordered pattern, such as convection cells, sustained by a flow of energy
SUM: Near equilibrium, fluxes are linear in forces: Fourier's, Fick's and Ohm's laws.
SUM: Every irreversible process produces entropy at a positive rate; living things are far from equilibrium.
SRC: Onsager L., "Reciprocal relations in irreversible processes. I", Physical Review 37, 405–426 | primary | 1931 | https://doi.org/10.1103/PhysRev.37.405
SRC: de Groot S. R., Mazur P., Non-Equilibrium Thermodynamics, North-Holland (Dover reprint 1984) | secondary | 1962
EV: established | Linear non-equilibrium thermodynamics is well established; far-from-equilibrium theory is still developing.
Q: What do Fourier's, Fick's and Ohm's laws have in common? | Each says a flux is proportional to a gradient: linear response near equilibrium.
M3@2,3: A thermocouple produces a voltage from a temperature difference, and a current through it moves heat (Peltier effect). What links the two effects? | The Onsager reciprocal relations | The third law of thermodynamics | The zeroth law of thermodynamics | Bernoulli's principle | Seebeck and Peltier coefficients are related (Π = ST, the Kelvin relation), a case of Onsager reciprocity.
SA2@1,2: Explain how ordered structures like convection cells can form without breaking the second law. | They are open systems driven by a flow of energy (heat in at the bottom, out at the top). The pattern lowers entropy locally but transports heat more efficiently, raising the entropy production of the surroundings by more. Total entropy still increases. | open system with energy flow ; local order ; more entropy produced overall ; total entropy increases
`;
