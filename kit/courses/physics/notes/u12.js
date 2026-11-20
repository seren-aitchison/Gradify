// Unit 12: Thermodynamics. Format: kit/course/notes.js
export default `
## Temperature and thermal equilibrium
S: Temperature is the property that decides which way heat flows: from hot to cold, until the two are in thermal equilibrium at the same temperature. Microscopically, it measures the average random kinetic energy of particles.
O: Explain thermal equilibrium and the direction of heat flow
O: Convert between Celsius and kelvin and describe how temperature is measured
O: Relate temperature to the mean kinetic energy of gas molecules
PRE: Microscopic and macroscopic descriptions
LV: GCSE and A level · Foundation
H: Thermal equilibrium
- Two bodies in thermal contact exchange energy until no net heat flows.
- At equilibrium they have the same temperature; that's what thermometers rely on.
H: Temperature scales
E: T(K) = θ(°C) + 273.15
- Kelvin is absolute: 0 K is the lowest possible temperature.
- Since 2019 the kelvin is defined by fixing k_{B} = 1.380 649 × 10^{-23} J K^{-1}.
- Thermometers: liquid in glass, thermocouples, resistance thermometers, infrared, gas thermometers (the most fundamental).
H: Microscopic meaning
E: ⟨KE⟩ = (3/2)k_{B}T :: ideal monatomic gas, mean translational KE per molecule
P: More generally, temperature is defined by 1/T = ∂S/∂U: how entropy changes when energy is added. Systems with a maximum energy (spins) can even have negative absolute temperatures, which are "hotter" than any positive temperature.
X: Average KE of a nitrogen molecule's translation at 300 K?
> (3/2) × 1.38 × 10^{-23} × 300 = 6.2 × 10^{-21} J ≈ 0.039 eV
K: Heat flows from higher to lower temperature until the temperatures are equal; temperature, not energy content, decides the direction.
!: Temperature is not heat. A bath of warm water contains more internal energy than a red-hot spark, though the spark is hotter.
T: Thermal equilibrium | The state of bodies in thermal contact when there is no net flow of energy between them
T: Absolute zero | 0 K (−273.15 °C), the lowest possible temperature, at which a system has its minimum possible energy
T: Kelvin | The SI unit of thermodynamic temperature, defined by fixing the Boltzmann constant
SUM: Bodies in contact reach the same temperature; heat flows from hot to cold.
SUM: T(K) = θ(°C) + 273.15; for an ideal gas the mean translational KE per molecule is (3/2)k_{B}T.
EV: established | The mean translational kinetic energy of ideal gas molecules is proportional to absolute temperature, (3/2)k_{B}T
SRC: OpenStax, University Physics Volume 2, section 1.1 "Temperature and Thermal Equilibrium" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/1-1-temperature-and-thermal-equilibrium
SRC: OpenStax, University Physics Volume 2, section 2.2 "Pressure, Temperature, and RMS Speed" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/2-2-pressure-temperature-and-rms-speed
SRC: AQA, A-level Physics specification (7408), section 3.6.2.3 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What is thermal equilibrium? | The state in which bodies in thermal contact exchange no net energy, because they're at the same temperature.
Q: How is temperature defined thermodynamically? | 1/T = ∂S/∂U, the rate of change of entropy with energy.
M1@2: 25 °C in kelvin is: | 298 K | 248 K | 25 K | 273 K | Add 273.15 to the Celsius temperature: 25 + 273 = 298 K; subtracting gives the 248 K distractor.
M2@1: Two bodies in thermal equilibrium must have the same: | Temperature | Internal energy | Heat capacity | Mass | Equilibrium means no net heat flow, which happens exactly when the temperatures are equal; their energies can differ greatly.
M3@3: The absolute temperature of a helium gas is doubled. By what factor does the rms speed of its atoms change? | √2 | 2 | 4 | 1/√2 | Mean KE = ½m⟨v^{2}⟩ = (3/2)k_{B}T, so ⟨v^{2}⟩ ∝ T and v_{rms} ∝ √T: doubling T multiplies it by √2.
NUM1@2: What is −196 °C (liquid nitrogen) in kelvin? Give a whole number. | 77 | 1 | K | T = −196 + 273 = 77 K.
TF1@1: When a hot cup and a cold spoon reach thermal equilibrium, they have the same internal energy. | false | They reach the same temperature; their internal energies depend on their masses and materials and are generally different.
SA2@1,3: Explain, in terms of molecules, what happens when a hot gas and a cold gas are put in thermal contact through a thin wall. | Molecules of the hot gas have a higher mean kinetic energy. Collisions with the wall and through it pass energy on average from the faster molecules to the slower ones. The hot gas's mean KE falls and the cold gas's rises until the two are equal; then energy still moves both ways but with no net transfer, so they are in thermal equilibrium at the same temperature. | Temperature measures mean molecular KE ; Collisions transfer energy, on average from hot to cold ; Mean KEs converge ; Equilibrium when temperatures equal ; Exchange continues but no net flow

## Zeroth law of thermodynamics
S: The zeroth law says that if two systems are each in thermal equilibrium with a third, they're in equilibrium with each other. It makes temperature a meaningful, measurable quantity.
O: State the zeroth law and explain why it makes temperature well defined
O: Explain how a thermometer uses the zeroth law
O: Explain why thermometric scales based on different properties disagree except at fixed points
PRE: Temperature and thermal equilibrium
LV: A level · Foundation
H: The law
- If A ~ C and B ~ C, then A ~ B (~ meaning thermal equilibrium).
- It was named last (by Fowler, around 1939) but is logically prior to the others, hence "zeroth".
H: Why it matters
- It guarantees a single number, temperature, can label equilibrium states.
- A thermometer is the third body C: it reaches equilibrium with A, then with B; equal readings mean A and B are in equilibrium.
H: Empirical temperature
P: Choose a thermometric property that changes monotonically with hotness (mercury length, resistance, gas pressure at constant volume). Different properties give scales that agree only at the fixed points. The ideal-gas scale, and then the thermodynamic scale from the second law, removed this arbitrariness.
X: Why must a thermometer be small compared with what it measures?
> It exchanges heat with the system to reach equilibrium
> A large thermometer would change the system's temperature (loading)
K: Equilibrium with a common third body is transitive, so a thermometer can compare bodies that never touch.
!: Thermal equilibrium means no net heat flow, not no microscopic energy exchange: molecules still collide constantly.
T: Zeroth law | If two systems are each in thermal equilibrium with a third, they are in thermal equilibrium with each other
T: Thermometric property | A physical property, such as length, resistance or pressure, that changes steadily with temperature and is used to measure it
SUM: The zeroth law makes "same temperature" a consistent label for equilibrium.
SUM: Thermometers rely on it; scales from different properties agree only at fixed points.
EV: established | Thermal equilibrium is transitive, so temperature can be assigned consistently to systems
SRC: OpenStax, University Physics Volume 2, section 1.1 "Temperature and Thermal Equilibrium" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/1-1-temperature-and-thermal-equilibrium
SRC: OpenStax, University Physics Volume 2, section 1.2 "Thermometers and Temperature Scales" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/1-2-thermometers-and-temperature-scales
Q: State the zeroth law. | If two systems are each in thermal equilibrium with a third, they're in thermal equilibrium with each other.
Q: Why is the zeroth law needed for thermometers? | It ensures that a thermometer's reading can compare the temperatures of separate bodies.
M1@1: The zeroth law establishes: | Temperature as a well-defined property | Conservation of energy in heat flow | That entropy never decreases | That absolute zero is unreachable | Because equilibrium is transitive, systems can be grouped by a single label, temperature.
M2@3: Different thermometric properties (mercury, resistance) give scales that: | Agree only at fixed points in general | Always agree at every temperature | Never agree, even at fixed points | Agree only at absolute zero | Each property varies with temperature in its own non-linear way, so scales calibrated at two fixed points differ in between.
M3@2: A thermometer reads 40.0 °C in liquid A and 40.0 °C in liquid B. A and B are then mixed. What does the zeroth law let you conclude? | No net heat flows between A and B, so the mixture stays at 40.0 °C | Heat flows from A to B because A was measured first | The mixture reaches 80.0 °C | Nothing, unless A and B are the same liquid | Both are in equilibrium with the thermometer, so they are in equilibrium with each other: mixing causes no net heat flow (ignoring losses).
TF1@1: The zeroth law was formulated before the first and second laws, which is why it is called the zeroth. | false | It was stated last, in the twentieth century, but was given the number zero because the other laws logically depend on it.
NUM2@3: A resistance thermometer reads 100.0 Ω at 0 °C and 138.5 Ω at 100 °C. Assuming it is linear, what temperature gives 119.25 Ω? | 50 | 0.5 | °C | The resistance rises 0.385 Ω per °C; (119.25 − 100.0)/0.385 = 50 °C.
SA2@1,2: Explain why the zeroth law of thermodynamics is needed before a thermometer can be used to compare two objects that are never placed in contact. | A thermometer comes into equilibrium with object A and gives a reading, then with object B. On its own this only says the thermometer was in equilibrium with each in turn. The zeroth law states that if A and B are each in equilibrium with the thermometer, they are in equilibrium with each other. So equal readings mean no net heat would flow if A and B touched: they have the same temperature. | Thermometer reaches equilibrium with each object separately ; Zeroth law: A ~ C and B ~ C implies A ~ B ; Equal readings mean no net heat flow between A and B ; Makes temperature a consistent property

## Heat and internal energy
S: Internal energy is the total microscopic energy of a system's particles. Heat is energy transferred because of a temperature difference; work is energy transferred by other means. Heat and work are processes, not things a system contains.
O: Define internal energy and distinguish it from heat and work
O: Describe conduction, convection and radiation, and calculate conduction rates
O: Explain the significance of Joule's experiment
PRE: Temperature and thermal equilibrium
LV: GCSE and A level · Foundation
H: Internal energy
- Sum of the random kinetic energies and intermolecular potential energies of the particles.
- A function of state: depends only on the current state, not on history.
- Ideal monatomic gas: U = (3/2)nRT (depends only on T).
H: Heat transfer mechanisms
- **Conduction**: collisions and electron motion; P = kAΔT/d (k: thermal conductivity; copper 400, glass 1, air 0.026 W m^{-1} K^{-1}).
- **Convection**: bulk fluid motion carrying energy; natural (buoyancy) or forced (fans).
- **Radiation**: EM emission; P = εσAT^{4}.
H: Joule's experiment
P: Joule showed a falling weight turning paddles in water raised its temperature by a fixed amount per joule of work: heat and work are both energy transfers. The old "caloric fluid" theory was wrong. 1 cal = 4.184 J.
X: A 1 cm glass window (A = 2 m^{2}) separates 20 °C inside from 0 °C outside. Heat loss?
> P = kAΔT/d = 1 × 2 × 20/0.01 = 4000 W
> In practice still air films on each side cut this by ~5×; double glazing traps an insulating air layer
K: Internal energy belongs to a system; heat and work are energy crossing its boundary.
!: "Heat content" is a misleading phrase. A body has internal energy; heat is energy crossing a boundary.
T: Internal energy | The sum of the random kinetic and potential energies of all the particles in a system
T: Heat | Energy transferred between systems because of a temperature difference
T: Thermal conductivity | k, the rate of heat flow per unit area per unit temperature gradient through a material, in W m^{-1} K^{-1}
SUM: U is a state function made of molecular KE and PE; heat and work change it.
SUM: Heat moves by conduction (P = kAΔT/d), convection and radiation.
EV: established | Heat and work are both forms of energy transfer, as Joule's paddle-wheel experiment showed
SRC: OpenStax, University Physics Volume 2, section 3.2 "Work, Heat, and Internal Energy" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/3-2-work-heat-and-internal-energy
SRC: OpenStax, University Physics Volume 2, section 1.6 "Mechanisms of Heat Transfer" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/1-6-mechanisms-of-heat-transfer
SRC: AQA, A-level Physics specification (7408), section 3.6.2.1 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What's the difference between heat and internal energy? | Internal energy is a property of a system; heat is energy transferred because of a temperature difference.
Q: What did Joule's paddle-wheel experiment show? | Mechanical work and heat are equivalent forms of energy transfer.
M1@1: Which is a function of state? | Internal energy | Heat | Work | All of these | U depends only on the present state; heat and work depend on the path taken between states.
M2@2: Thermal conduction rate through a slab is proportional to: | Area × temperature difference / thickness | Thickness × temperature difference | The temperature of the hot side only | Mass × specific heat capacity | Fourier's law gives P = kAΔT/d: more area or temperature difference increases the flow, more thickness reduces it.
M3@2,3: A copper rod (k = 400 W m^{-1} K^{-1}) 0.50 m long and 1.0 × 10^{-4} m^{2} in cross-section joins baths at 100 °C and 0 °C. What is the heat flow? | 8 W | 80 W | 0.8 W | 20 W | P = kAΔT/d = 400 × 1.0 × 10^{-4} × 100/0.50 = 8.0 W.
TF1@1: When a gas is compressed quickly, its internal energy can rise even though no heat is supplied. | true | Work done on the gas also transfers energy to it; heat is only one of the two ways of changing U.
NUM2@2: A wall 0.20 m thick with k = 0.80 W m^{-1} K^{-1} has area 10 m^{2} and a 15 K temperature difference across it. What is the heat flow in watts? | 600 | 5 | W | P = kAΔT/d = 0.80 × 10 × 15/0.20 = 600 W.
SA2@1,2: Explain the difference between internal energy, heat and temperature, using a pan of water on a hob as an example. | The water's internal energy is the total random kinetic and potential energy of its molecules, a property of the water. Its temperature measures the mean random kinetic energy per molecule and decides the direction of heat flow. Heat is the energy transferred from the hotter hob to the water because of their temperature difference; it increases the water's internal energy (and its temperature, until boiling). | Internal energy: total random KE + PE of molecules ; Temperature: measure of mean KE, sets direction of flow ; Heat: energy transferred due to temperature difference ; Heat into the water raises its internal energy

## Specific heat capacity
S: Specific heat capacity is the energy needed to raise the temperature of 1 kg of a substance by 1 K. Water's unusually high value moderates climates and makes it an excellent coolant.
O: Use Q = mcΔT, including for electrical heating and mixtures
O: Explain why c_{p} > c_{V} for gases and use equipartition values for molar heat capacities
O: Describe how to measure c and reduce its errors
PRE: Heat and internal energy
LV: GCSE and A level · Application
H: Definitions
E: Q = mcΔT
E: C = mc :: heat capacity of an object (J K^{-1})
E: C_{p} − C_{V} = nR :: ideal gas
- Water 4180 J kg^{-1} K^{-1}; aluminium 900; iron 450; copper 385; lead 130.
- Gases have different values at constant pressure (c_{p}) and constant volume (c_{V}); c_{p} > c_{V} because at constant pressure the gas also does work expanding.
H: Molecular view
- Equipartition: each quadratic degree of freedom stores ½k_{B}T.
- Monatomic gas C_{V} = (3/2)R; diatomic (with rotation) (5/2)R; solids (Dulong–Petit) 3R per mole of atoms at high T.
- At low T, quantum effects freeze out modes (Einstein, Debye): C → 0 as T → 0.
H: Measuring c
P: Heat a known mass electrically (Q = VIt), record ΔT, and correct for heat losses (insulation, or a cooling curve). Method of mixtures: put a hot sample in water and find the equilibrium temperature; energy lost by one equals energy gained by the other.
X: A 2.0 kW kettle heats 1.0 kg of water from 20 °C to 100 °C. Minimum time?
> Q = 1.0 × 4180 × 80 = 334 kJ
> t = 334 000/2000 = 167 s ≈ 2.8 min
K: The same energy raises a high-c material's temperature less: c measures thermal inertia per kilogram.
!: Specific heat capacity isn't constant; it changes with temperature, especially at low temperatures.
T: Specific heat capacity | The energy needed to raise the temperature of 1 kg of a substance by 1 K, in J kg^{-1} K^{-1}
T: Equipartition | The classical result that each quadratic degree of freedom of a system in equilibrium has mean energy ½k_{B}T
SUM: Q = mcΔT; water's high c (4180 J kg^{-1} K^{-1}) makes it slow to heat and cool.
SUM: For gases C_{p} − C_{V} = nR; equipartition gives (3/2)R and (5/2)R; solids approach 3R.
EV: established | Classical equipartition predicts molar heat capacities of 3R for solids at high temperature, while quantum effects make heat capacities fall towards zero at low temperature
SRC: OpenStax, University Physics Volume 2, section 1.4 "Heat Transfer, Specific Heat, and Calorimetry" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/1-4-heat-transfer-specific-heat-and-calorimetry
SRC: OpenStax, University Physics Volume 2, section 2.3 "Heat Capacity and Equipartition of Energy" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/2-3-heat-capacity-and-equipartition-of-energy
SRC: AQA, A-level Physics specification (7408), section 3.6.2.1 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: Why does water moderate coastal climates? | Its high specific heat capacity means it warms and cools slowly.
Q: Why is c_{p} larger than c_{V} for a gas? | At constant pressure, some heat goes into work as the gas expands.
M1@1: Energy to heat 2 kg of aluminium by 10 K: | 18 kJ | 9 kJ | 1.8 kJ | 180 kJ | Q = mcΔT = 2 × 900 × 10 = 18 000 J = 18 kJ.
M2@2: The Dulong–Petit law gives the molar heat capacity of solids as: | 3R | (3/2)R | R | (5/2)R | Each atom vibrates in three directions with kinetic and potential terms: six quadratic terms, 6 × ½R = 3R per mole.
M3@1: 0.20 kg of copper at 100 °C is dropped into 0.50 kg of water at 20 °C. Ignoring losses, what is the final temperature? (c_{Cu} = 385, c_{water} = 4180 J kg^{-1} K^{-1}) | 22.8 °C | 60 °C | 26.4 °C | 20.4 °C | 0.20 × 385 × (100 − T) = 0.50 × 4180 × (T − 20), so 77(100 − T) = 2090(T − 20) and T = 22.8 °C.
NUM2@3: An electric heater supplies 12 V and 4.0 A to a 1.0 kg aluminium block for 300 s, raising it by 15.0 K. What value of c does this give, in J kg^{-1} K^{-1}? | 960 | 5 | J kg^{-1} K^{-1} | Q = VIt = 12 × 4.0 × 300 = 14 400 J; c = Q/(mΔT) = 14 400/15 = 960 J kg^{-1} K^{-1}, above the true 900 because of heat losses.
TF1@2: A mole of helium needs more heat to warm by 1 K at constant pressure than at constant volume. | true | At constant pressure the gas also does work pΔV = RΔT per mole, so C_{p} = C_{V} + R.
SA2@3: Describe how you would measure the specific heat capacity of a metal block electrically, and how you would reduce the main source of error. | Insert an electrical heater and a thermometer into holes in a block of known mass. Record V, I and the time, and the temperature rise. Then c = VIt/(mΔθ). The main error is heat lost to the surroundings, which makes c too large; reduce it by lagging the block, using a small temperature rise, starting slightly below room temperature, or plotting temperature against time and correcting with a cooling curve. | Known mass, heater and thermometer in the block ; Measure V, I, t and Δθ ; c = VIt/(mΔθ) ; Heat loss makes c too high ; Insulation/lagging or cooling correction to reduce loss

## Latent heat
S: Latent heat is the energy absorbed or released during a change of phase at constant temperature. It goes into breaking or forming bonds, not raising the temperature, which is why sweating cools you and steam burns badly.
O: Use Q = mL and combine it with Q = mcΔT for multi-stage heating
O: Explain in molecular terms why temperature stays constant during a change of state
O: Explain evaporative cooling and other effects of latent heat
PRE: Specific heat capacity
LV: GCSE and A level · Application
H: Definitions
E: Q = mL
- Water: L_{fusion} = 334 kJ kg^{-1}; L_{vaporisation} = 2260 kJ kg^{-1} at 100 °C.
- Vaporisation needs much more energy than melting: molecules separate completely.
- Heating curves show flat plateaus during phase changes: the potential energy of the particles changes, their mean kinetic energy does not.
H: Effects
- Evaporative cooling: sweat, wet-bulb thermometers, swamp coolers, dogs panting.
- Steam burns: 1 g of steam condensing releases 2260 J before cooling, versus 420 J from 1 g of water cooling from 100 to 0 °C.
- Weather: latent heat released when water vapour condenses powers thunderstorms and hurricanes.
- Ice and phase-change materials store energy at constant temperature.
X: How much energy turns 0.5 kg of ice at −10 °C into steam at 100 °C? (c_{ice} = 2100)
> Ice −10 → 0: 0.5 × 2100 × 10 = 10.5 kJ; melt: 0.5 × 334 = 167 kJ
> Water 0 → 100: 0.5 × 4180 × 100 = 209 kJ; boil: 0.5 × 2260 = 1130 kJ
> Total ≈ 1517 kJ: boiling dominates
K: During a change of state energy changes the particles' potential energy, not their kinetic energy, so the temperature stays constant.
!: During a phase change, adding heat doesn't raise the temperature; a pan of boiling water stays at 100 °C (at 1 atm) however high the flame.
T: Specific latent heat | The energy needed to change the state of 1 kg of a substance without changing its temperature, in J kg^{-1}
T: Evaporative cooling | Cooling of a liquid because its most energetic molecules escape, lowering the mean kinetic energy of those left
SUM: Q = mL; vaporisation of water needs almost seven times the energy of melting.
SUM: Temperature is constant during a phase change because energy goes into particle potential energy.
EV: established | During a change of state at constant pressure, energy supplied changes the potential energy of the particles while the temperature stays constant
SRC: OpenStax, University Physics Volume 2, section 1.5 "Phase Changes" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/1-5-phase-changes
SRC: OpenStax, College Physics 2e, section 14.3 "Phase Change and Latent Heat" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/14-3-phase-change-and-latent-heat
SRC: AQA, A-level Physics specification (7408), section 3.6.2.1 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What is specific latent heat? | The energy per kg to change phase at constant temperature.
Q: Why is steam at 100 °C more dangerous than water at 100 °C? | Condensing steam releases a large latent heat onto the skin.
M1@1: Energy to melt 2 kg of ice at 0 °C: | 668 kJ | 334 kJ | 4520 kJ | 8.4 kJ | Q = mL_{f} = 2 × 334 kJ = 668 kJ; 4520 kJ wrongly uses the latent heat of vaporisation.
M2@3: Why does evaporation cool a liquid? | The fastest molecules escape, lowering the average KE of those left | The surrounding air is always colder than the liquid | The vapour raises the pressure above the liquid | Evaporating molecules transfer energy into the liquid | Only molecules with enough energy escape, taking latent heat with them, so the remaining liquid's mean KE and temperature fall.
M3@1: How much ice at 0 °C must be added to 0.40 kg of water at 30 °C to cool it to 0 °C, with all the ice just melting? | 0.15 kg | 0.40 kg | 0.036 kg | 1.5 kg | Energy from the water: 0.40 × 4180 × 30 = 50 160 J. Ice melted: 50 160/334 000 = 0.15 kg.
TF1@2: While ice is melting at 0 °C, the mean kinetic energy of its molecules is increasing. | false | At constant temperature the mean KE is unchanged; the energy supplied increases the molecules' potential energy as bonds break.
NUM2@1: A 1.5 kW kettle keeps water boiling. How much water boils away in 5.0 minutes, in grams? (L = 2.26 × 10^{6} J kg^{-1}) | 199 | 2 | g | Q = Pt = 1500 × 300 = 4.5 × 10^{5} J; m = Q/L = 0.199 kg = 199 g.
SA2@2,3: Explain why sweating cools the body, and why it works less well on a humid day. | Sweat is water on the skin. The fastest molecules escape as vapour, carrying away energy (latent heat of vaporisation), so the remaining liquid, and the skin it touches, cools. About 2.4 MJ is removed per kilogram evaporated. On a humid day the air already holds much water vapour, so the rate of net evaporation is lower and less energy is removed. | Evaporation of sweat from the skin ; Most energetic molecules escape, mean KE of the rest falls ; Latent heat of vaporisation taken from the skin ; Humid air slows net evaporation ; Less cooling on humid days

## Thermal expansion
S: Most materials expand when heated because their atoms vibrate with larger amplitude in an asymmetric potential, increasing the average spacing. Engineers must allow for it in bridges, railways and precision instruments.
O: Use ΔL = αLΔT and ΔV = βVΔT
O: Explain thermal expansion with the asymmetric interatomic potential
O: Describe the consequences and uses of expansion, including thermal stress and water's anomaly
PRE: Stress and strain
LV: A level · Application
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
K: Larger vibrations in an asymmetric potential well push atoms further apart on average, so length grows in proportion to ΔT.
!: Holes expand too when a plate is heated, as if the hole were made of the same material: heating a metal lid helps loosen it.
T: Linear expansivity | α, the fractional change in length per kelvin, ΔL/(LΔT), in K^{-1}
T: Thermal stress | The stress produced in a body when its thermal expansion or contraction is prevented, σ = EαΔT
SUM: ΔL = αLΔT and ΔV ≈ 3αVΔT; expansion comes from anharmonic atomic vibrations.
SUM: Constrained expansion causes thermal stress; water is densest at 4 °C.
EV: established | Most solids expand on heating because the interatomic potential is asymmetric, while water is densest near 4 °C
SRC: OpenStax, University Physics Volume 2, section 1.3 "Thermal Expansion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/1-3-thermal-expansion
SRC: OpenStax, College Physics 2e, section 13.2 "Thermal Expansion of Solids and Liquids" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/13-2-thermal-expansion-of-solids-and-liquids
Q: Why do solids expand when heated? | Atoms vibrate with larger amplitude in an asymmetric (anharmonic) potential, so the mean spacing grows.
Q: Why do lakes freeze from the top? | Water is densest at 4 °C, so colder water and ice float on top.
M1@1: A steel rod 1 m long is heated by 100 K. It expands by: | 1.2 mm | 12 mm | 0.12 mm | 0.012 mm | ΔL = αLΔT = 12 × 10^{-6} × 1 × 100 = 1.2 × 10^{-3} m = 1.2 mm.
M2@3: A bimetallic strip bends because: | Its two metals have different expansion coefficients | Both metals contract by the same amount | Heating magnetises one of the two metals | One metal softens and starts to melt | The metal with larger α lengthens more, so the bonded strip curves with that metal on the outside.
M3@3: A steel rail (E = 2.0 × 10^{11} Pa, α = 12 × 10^{-6} K^{-1}) is clamped at both ends and warms by 30 K. What compressive stress develops? | 72 MPa | 7.2 MPa | 720 MPa | 0.36 MPa | σ = EαΔT = 2.0 × 10^{11} × 12 × 10^{-6} × 30 = 7.2 × 10^{7} Pa = 72 MPa.
TF1@2: When a metal plate with a hole in it is heated, the hole gets smaller. | false | Every dimension of the plate scales up, including the hole, which expands as if it were made of the same metal.
NUM2@1: An aluminium rod (α = 23 × 10^{-6} K^{-1}) is 2.0 m long. How much longer is it after warming by 50 K, in mm? | 2.3 | 0.05 | mm | ΔL = 23 × 10^{-6} × 2.0 × 50 = 2.3 × 10^{-3} m = 2.3 mm.
SA2@2: Explain, in terms of the forces between atoms, why most solids expand when heated. | Atoms sit at the bottom of a potential well formed by attraction at long range and strong repulsion at short range. The well is asymmetric: steep on the near side, shallow on the far side. As temperature rises the atoms vibrate with greater amplitude, and because the far side is shallower they spend more time at larger separations. The mean spacing grows, so the solid expands. | Interatomic potential well with attraction and repulsion ; Well is asymmetric (anharmonic) ; Higher temperature gives larger vibration amplitude ; Atoms spend more time at larger separation ; Mean spacing and size increase

## First law of thermodynamics
S: The first law is energy conservation for thermodynamic systems: the change in internal energy equals the heat supplied to the system minus the work it does. No machine can produce energy from nothing.
O: State the first law and apply it with a consistent sign convention
O: Apply the first law to cycles, isolated systems and free expansion
O: Explain why heat and work are path functions while internal energy is a state function
PRE: Heat and internal energy
LV: A level · Application
H: The law
E: ΔU = Q − W :: W = work done BY the system (physics convention)
E: dU = δQ − p dV :: quasi-static, only pV work
- Some texts write ΔU = Q + W with W done ON the system; AQA writes Q = ΔU + W. Check the convention.
- U is a state function; Q and W are not (δ denotes inexact differentials).
H: Applying it
- Isolated system: Q = W = 0 ⇒ ΔU = 0.
- Cycle: ΔU = 0 ⇒ net Q = net W.
- Free expansion into a vacuum: Q = 0, W = 0 ⇒ ΔU = 0 (an ideal gas's temperature doesn't change).
H: Perpetual motion
P: A perpetual motion machine of the first kind would produce work without consuming energy, violating the first law. None has ever worked, and patent offices refuse to examine them.
X: A gas absorbs 500 J of heat and does 200 J of work. Change in internal energy?
> ΔU = 500 − 200 = +300 J
K: The first law is energy conservation: heat in minus work out equals the rise in internal energy.
!: Sign conventions are the main source of error; write the law with the convention you're using and stick to it.
T: First law of thermodynamics | The increase in internal energy of a system equals the heat supplied to it minus the work it does, ΔU = Q − W
T: State function | A property, such as U, p, V or T, that depends only on the present state of a system and not on how it got there
SUM: ΔU = Q − W (W by the system); in a cycle net heat in equals net work out.
SUM: Free expansion: no heat, no work, no change in U for an ideal gas.
EV: established | Energy is conserved in all thermodynamic processes, so the change in internal energy equals heat supplied minus work done by the system
SRC: OpenStax, University Physics Volume 2, section 3.3 "First Law of Thermodynamics" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/3-3-first-law-of-thermodynamics
SRC: AQA, A-level Physics specification (7408), section 3.11.2 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: State the first law of thermodynamics. | ΔU = Q − W: internal energy change equals heat supplied minus work done by the system.
Q: What happens to an ideal gas's temperature in a free expansion? | It stays the same (no heat, no work, so ΔU = 0).
M1@2: In a complete cycle, ΔU = ? | 0 | Q | W | Q + W | U is a state function and the system returns to its starting state, so its internal energy is unchanged.
M2@1: A gas is compressed adiabatically with 300 J of work done on it. ΔU = ? | +300 J | −300 J | 0 | 600 J | Adiabatic means Q = 0, and work done by the gas is −300 J, so ΔU = 0 − (−300) = +300 J.
M3@1,3: A gas is taken from state A to state B by two different paths. On path 1 it absorbs 800 J and does 300 J of work. On path 2 it does 100 J of work. How much heat does it absorb on path 2? | 600 J | 800 J | 200 J | 400 J | ΔU = 800 − 300 = 500 J on any path between A and B. On path 2, Q = ΔU + W = 500 + 100 = 600 J.
TF1@3: Heat and work are both state functions, so their values depend only on the initial and final states. | false | Only their difference, ΔU, is path-independent; Q and W individually depend on the route between the states.
NUM1@1: A gas has 250 J of work done on it and loses 100 J of heat. What is the change in its internal energy, in joules? | 150 | 0 | J | Q = −100 J and W (by the gas) = −250 J, so ΔU = Q − W = −100 + 250 = +150 J.
SA2@1,2: A bicycle pump is used to compress air quickly. Use the first law to explain why the pump gets warm. | Fast compression leaves little time for heat to escape, so Q ≈ 0. Work is done on the air, so W (by the air) is negative. By ΔU = Q − W, the internal energy of the air rises, so its temperature rises; the warm air then heats the pump barrel. Friction of the piston adds a little more. | Rapid compression is nearly adiabatic (Q ≈ 0) ; Work is done on the gas (W by gas negative) ; ΔU = Q − W is positive ; Internal energy and temperature of the air rise ; Warm air heats the pump

## Work done by thermodynamic systems
S: A gas does work when it expands against an external pressure. On a pressure–volume diagram, this work is the area under the curve, and it depends on the path taken between two states.
O: Calculate work done by a gas for constant-pressure, isothermal and adiabatic changes
O: Interpret work as the area under a p–V curve and explain why it depends on path
O: Identify other forms of thermodynamic work
PRE: First law of thermodynamics
LV: A level · Application
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
> W = nRT ln(V_{2}/V_{1}) = 2 × 8.31 × 300 × ln 3 = 5.5 kJ
K: Work done by a gas is the area under its p–V path; different paths between the same states give different work.
!: Work against zero external pressure (free expansion) is zero even if the gas expands a lot.
T: Expansion work | The work W = ∫p dV done by a fluid as its volume changes against an external pressure
T: Path function | A quantity, such as work or heat, whose value depends on the route taken between two states
SUM: W = ∫p dV: pΔV at constant pressure, nRT ln(V_{2}/V_{1}) isothermally.
SUM: Work is the area under the p–V curve and depends on the path.
EV: established | The work done by a gas in a quasi-static process equals the area under its path on a p–V diagram
SRC: OpenStax, University Physics Volume 2, section 3.2 "Work, Heat, and Internal Energy" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/3-2-work-heat-and-internal-energy
SRC: AQA, A-level Physics specification (7408), section 3.6.2.2 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: How is work represented on a p–V diagram? | As the area under the process curve.
Q: Why is work path-dependent? | Different paths between the same states enclose different areas on a p–V diagram.
M1@1: A gas expands at 2 × 10^{5} Pa from 1 L to 4 L. Work done: | 600 J | 800 J | 200 J | 6000 J | W = pΔV = 2 × 10^{5} Pa × 3 × 10^{-3} m^{3} = 600 J; remember 1 L = 10^{-3} m^{3}.
M2@2: Work done in a constant-volume process is: | Zero | pV | nRT | Maximum | With no change in volume, ∫p dV = 0: a vertical line on a p–V diagram has no area beneath it.
M3@2: A gas goes from (1 L, 1 × 10^{5} Pa) to (3 L, 2 × 10^{5} Pa). How much more work does it do if it first raises its pressure at constant volume and then expands at constant pressure, than if it first expands and then raises its pressure? | 200 J | 0 J | 400 J | 100 J | High-pressure route: 2 × 10^{5} × 2 × 10^{-3} = 400 J. Low-pressure route: 1 × 10^{5} × 2 × 10^{-3} = 200 J. Difference 200 J.
TF1@3: Stretching a rubber band, charging a capacitor and expanding a gas can all be treated as thermodynamic work. | true | Each is a generalised force times the change in a generalised displacement (F dL, V dQ, p dV).
NUM2@1: 1.0 mol of ideal gas expands isothermally at 400 K to twice its volume. How much work does it do, in joules? (R = 8.31 J mol^{-1} K^{-1}) | 2300 | 20 | J | W = nRT ln 2 = 1.0 × 8.31 × 400 × 0.693 = 2.30 × 10^{3} J.
SA2@1,2: Explain why the work done by a gas between two states depends on the path, using a p–V diagram. | Work by the gas equals the area under its path on a p–V diagram. Between the same two states, one path might expand at high pressure and then lower the pressure, while another lowers the pressure first and expands at low pressure. The areas under them differ, so the work differs. Since ΔU is the same for both, the heat absorbed must differ too. | W = ∫p dV is the area under the path ; Two paths between the same states have different areas ; Higher-pressure expansion does more work ; ΔU same, so Q also differs

## Pressure-volume diagrams
S: A p–V diagram plots a gas's state as it changes. Each point is a state; each curve is a process. Areas give work, enclosed loops give net work per cycle, and the shapes reveal the kind of process.
O: Identify isobaric, isochoric, isothermal and adiabatic processes on a p–V diagram
O: Find work done from areas, including net work per cycle
O: Explain which direction round a loop corresponds to an engine or a refrigerator
PRE: Work done by thermodynamic systems
LV: A level · Application
H: Process shapes
- **Isobaric**: horizontal line.
- **Isochoric**: vertical line (no work).
- **Isothermal**: hyperbola pV = constant.
- **Adiabatic**: steeper curve pV^{γ} = constant.
H: Cycles
- Clockwise loop: net work done by the gas (engine).
- Anticlockwise: net work done on the gas (refrigerator, heat pump).
- Net work = enclosed area.
P: For an irregular loop, estimate the area by counting squares and multiplying by the work each square represents (Δp × ΔV).
H: Related diagrams
P: Engineers also use T–S diagrams (area = heat) and p–h diagrams for refrigerants. Each makes particular quantities easy to read off.
X: A gas goes round a rectangle on a p–V diagram: p from 1 to 3 × 10^{5} Pa, V from 1 to 2 L, clockwise. Net work per cycle?
> Area = Δp × ΔV = 2 × 10^{5} × 10^{-3} = 200 J done by the gas
K: Area under a path is the work for that process; area inside a loop is the net work per cycle.
!: On p–V diagrams only quasi-static (slow, near-equilibrium) processes can be drawn as lines; rapid irreversible processes have no well-defined path.
T: Isobaric | At constant pressure: a horizontal line on a p–V diagram
T: Isochoric | At constant volume: a vertical line on a p–V diagram, with no work done
T: Indicator diagram | A p–V diagram recorded from a real engine cylinder, whose loop area gives the work per cycle
SUM: Each process has a characteristic shape; adiabats are steeper than isotherms.
SUM: Clockwise loops are engines; loop area is net work per cycle.
EV: established | The net work done in a thermodynamic cycle equals the area enclosed by its loop on a p–V diagram
SRC: OpenStax, University Physics Volume 2, section 3.4 "Thermodynamic Processes" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/3-4-thermodynamic-processes
SRC: AQA, A-level Physics specification (7408), section 3.11.2 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: Which way round does an engine cycle go on a p–V diagram? | Clockwise.
Q: Which curve is steeper through a point: an isotherm or an adiabat? | The adiabat.
M1@1: A vertical line on a p–V diagram is: | Isochoric | Isobaric | Isothermal | Adiabatic | A vertical line means the volume is fixed while pressure changes, which is a constant-volume (isochoric) process.
M2@2: The net work in a cycle equals: | The enclosed area | Zero always | The area under the top curve | The pressure range | Work out under the expansion minus work in under the compression is the area of the loop.
M3@1,3: Through the same starting point, a gas can expand either isothermally or adiabatically to the same final volume. Which statement is correct? | The adiabatic curve ends at lower pressure, so less work is done | The adiabatic curve ends at higher pressure, so more work is done | Both end at the same pressure | The isothermal curve is steeper | pV^{γ} falls faster than pV since γ > 1, so the adiabat lies below the isotherm and encloses less area beneath it.
TF1@3: A loop traversed anticlockwise on a p–V diagram represents a refrigerator or heat pump: net work is done on the gas. | true | Anticlockwise, the compression happens at higher pressure than the expansion, so more work goes in than comes out.
NUM2@2: An engine's indicator loop encloses 40 squares, each 0.5 × 10^{5} Pa by 0.1 L. What is the work per cycle in joules? | 200 | 5 | J | One square is 0.5 × 10^{5} × 1 × 10^{-4} = 5 J, so 40 squares give 200 J.
SA2@1,2: Sketch-describe a simple engine cycle made of two isobars and two isochores on a p–V diagram, and explain how to find the net work done per cycle. | The cycle is a rectangle: heat at constant volume (vertical up), expand at high constant pressure (horizontal right), cool at constant volume (vertical down), compress at low constant pressure (horizontal left). It runs clockwise. Work is done only on the horizontal sides: p_{high}ΔV out and p_{low}ΔV in, so net work = (p_{high} − p_{low})ΔV, the area of the rectangle. | Rectangle of two isochores and two isobars ; Runs clockwise for an engine ; No work on the vertical (isochoric) sides ; Net work = (p_{high} − p_{low})ΔV ; Equals enclosed area

## Isothermal processes
S: In an isothermal process the temperature stays constant. For an ideal gas this means internal energy doesn't change, so all the heat absorbed is turned into work (or vice versa).
O: Apply Boyle's law and the first law to isothermal ideal-gas changes
O: Calculate isothermal work, heat and entropy change
O: State the conditions needed for a process to be isothermal
PRE: First law of thermodynamics
LV: A level · Application
H: Ideal gas
E: pV = constant (Boyle's law)
E: ΔU = 0 ⇒ Q = W = nRT ln(V_{2}/V_{1})
E: ΔS = nR ln(V_{2}/V_{1})
- Needs slow processes in good thermal contact with a reservoir.
H: Examples
- Slow compression of air in a bicycle pump left to cool.
- Phase changes at constant pressure (boiling at 100 °C) are isothermal, though there U does change.
- The Carnot cycle's heat-exchange strokes.
X: 1 mol of gas at 300 K is compressed isothermally to half its volume. Heat released?
> W = RT ln(1/2) = 8.31 × 300 × (−0.693) = −1.73 kJ (work done on the gas)
> Q = W = −1.73 kJ: 1.73 kJ released to the reservoir
K: For an ideal gas at constant temperature, U is fixed, so the heat in equals the work out.
!: Isothermal doesn't mean no heat flows; heat must flow to keep the temperature constant. It means ΔT = 0.
P: **Investigate with the lab.** Halve the volume at fixed temperature and watch the pressure double: an isothermal change.
IX: gas
T: Isothermal process | A change at constant temperature
T: Boyle's law | For a fixed mass of gas at constant temperature, pressure is inversely proportional to volume, pV = constant
SUM: Isothermal ideal gas: pV constant, ΔU = 0, Q = W = nRT ln(V_{2}/V_{1}).
SUM: It needs slow change and good contact with a heat reservoir.
EV: established | For a fixed mass of ideal gas at constant temperature the product pV is constant
SRC: OpenStax, University Physics Volume 2, section 3.4 "Thermodynamic Processes" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/3-4-thermodynamic-processes
SRC: AQA, A-level Physics specification (7408), section 3.6.2.2 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: For an isothermal ideal-gas process, how are Q and W related? | Q = W, since ΔU = 0.
Q: What law describes an isothermal ideal gas? | Boyle's law, pV = constant.
M1@1: A gas is compressed isothermally. Its pressure: | Increases inversely with volume | Stays constant throughout | Decreases as volume falls | Doubles whatever the volume | At constant temperature pV is constant, so halving V doubles p and so on: p ∝ 1/V.
M2@3: Isothermal processes require: | Slow change with good thermal contact | No heat flow across the boundary | Rapid change with good insulation | A perfectly insulated container | Heat must flow to or from a reservoir to keep T constant, so the change must be slow and well coupled.
M2@1: In an isothermal compression of an ideal gas, what stays constant? | The temperature and the product pV | The pressure | The volume | The internal energy only rises | Isothermal means constant temperature, so pV is constant.
M3@2: 2.0 mol of ideal gas expand isothermally at 350 K from 5.0 L to 20 L. How much heat is absorbed? | 8.1 kJ | 4.0 kJ | 0 J | 2.9 kJ | Q = W = nRT ln 4 = 2.0 × 8.31 × 350 × 1.386 = 8.06 kJ; ΔU = 0, so all the heat becomes work.
NUM2@1: Air at 1.0 × 10^{5} Pa in a 30 cm^{3} syringe is slowly compressed to 12 cm^{3} at constant temperature. What is the new pressure, ×10^{5} Pa? | 2.5 | 0.05 | ×10^{5} Pa | p_{2} = p_{1}V_{1}/V_{2} = 1.0 × 30/12 = 2.5 × 10^{5} Pa.
TF1@3: In an isothermal process no heat enters or leaves the gas. | false | That describes an adiabatic process. An isothermal process needs heat flow to hold the temperature constant while work is done.
SA2@1,3: An ideal gas expands slowly in a cylinder held in a water bath at constant temperature. Explain where the energy for the work comes from. | The gas does work pushing the piston out. Because the temperature is constant, the internal energy of an ideal gas (which depends only on T) is unchanged, ΔU = 0. By the first law Q = ΔU + W = W, so exactly as much heat flows in from the water bath as the work done. The process must be slow so the gas stays in thermal equilibrium with the bath. | Gas does work on the piston ; Ideal-gas U depends only on T, so ΔU = 0 ; First law gives Q = W ; Energy comes as heat from the bath ; Slow change keeps the temperature equal to the bath's

## Adiabatic processes
S: In an adiabatic process no heat enters or leaves. Compressing a gas adiabatically heats it; expanding cools it. This explains diesel ignition, cloud formation and why air cools as it rises.
O: Use pV^{γ} = constant and TV^{γ−1} = constant for an ideal gas
O: Apply the first law with Q = 0 to find work and temperature change
O: Explain adiabatic effects in engines and the atmosphere
PRE: First law of thermodynamics
LV: A level · Application
H: Ideal gas
E: pV^{γ} = constant; TV^{γ−1} = constant; T^{γ}p^{1−γ} = constant
E: γ = C_{p}/C_{V} :: 5/3 monatomic, 7/5 diatomic
E: W = −ΔU = nC_{V}(T_{1} − T_{2})
P: An adiabat is steeper than an isotherm because, as the gas expands, its temperature falls as well as its density, so its pressure drops faster than 1/V.
H: Real-world adiabats
- Fast processes (sound waves, engine strokes) are nearly adiabatic: no time for heat to flow.
- **Diesel engines**: compression ratio ~20:1 heats air above 500 °C, igniting fuel without spark plugs.
- **Atmosphere**: rising dry air cools at ~9.8 K per km (dry adiabatic lapse rate); moist air cools more slowly (~5–6 K per km) because condensation releases latent heat.
- **Foehn winds**: air descending a mountain warms adiabatically.
X: Air (γ = 1.4) at 300 K is compressed adiabatically by a factor of 20. Final temperature?
> T_{2} = T_{1}(V_{1}/V_{2})^{γ−1} = 300 × 20^{0.4} = 300 × 3.31 = 994 K (721 °C)
K: With Q = 0, all work done on the gas raises its internal energy; all work it does comes from it.
!: Adiabatic isn't the same as isothermal: temperature changes even though no heat flows.
T: Adiabatic process | A change in which no heat enters or leaves the system, Q = 0
T: Ratio of heat capacities | γ = C_{p}/C_{V}, which sets how steeply an adiabat falls on a p–V diagram
SUM: Adiabatic: Q = 0, pV^{γ} constant; compression heats, expansion cools.
SUM: Fast processes are nearly adiabatic: diesel ignition, sound, rising air.
EV: established | A quasi-static adiabatic change of an ideal gas follows pV^{γ} = constant
SRC: OpenStax, University Physics Volume 2, section 3.6 "Adiabatic Processes for an Ideal Gas" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/3-6-adiabatic-processes-for-an-ideal-gas
SRC: AQA, A-level Physics specification (7408), section 3.11.2 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: Why does air cool when it rises? | It expands adiabatically as pressure falls, doing work at the expense of internal energy.
Q: How does a diesel engine ignite its fuel? | Rapid adiabatic compression heats the air above the fuel's ignition temperature.
M1@2: In an adiabatic expansion, the gas temperature: | Falls | Rises | Stays constant | Doubles | With no heat in, the work done by the gas comes from its internal energy, so U and T fall.
M2@1: For a monatomic ideal gas, γ = : | 5/3 | 7/5 | 4/3 | 1 | C_{V} = (3/2)R and C_{p} = (5/2)R, so γ = (5/2)/(3/2) = 5/3; 7/5 applies to diatomic gases.
M3@1: Helium (γ = 5/3) at 1.0 × 10^{5} Pa is compressed adiabatically to one eighth of its volume. What is the final pressure? | 3.2 × 10^{6} Pa | 8.0 × 10^{5} Pa | 4.0 × 10^{5} Pa | 1.3 × 10^{7} Pa | p_{2} = p_{1}(V_{1}/V_{2})^{γ} = 1.0 × 10^{5} × 8^{5/3} = 1.0 × 10^{5} × 32 = 3.2 × 10^{6} Pa.
TF1@3: Air descending the lee side of a mountain warms even though no heat is added to it. | true | Pressure rises as it descends, so it is compressed adiabatically; the work done on it raises its temperature (the foehn effect).
NUM2@2: 2.0 mol of monatomic ideal gas cool from 400 K to 300 K in an adiabatic expansion. How much work does the gas do, in joules? (R = 8.31) | 2493 | 10 | J | W = −ΔU = nC_{V}(T_{1} − T_{2}) = 2.0 × 1.5 × 8.31 × 100 = 2.49 × 10^{3} J.
SA2@2,3: Explain why a diesel engine needs no spark plug, using the first law of thermodynamics. | Air is compressed very quickly by about 20:1, so there is no time for heat to escape: the compression is nearly adiabatic, Q ≈ 0. The piston does work on the air, so by ΔU = Q − W the internal energy, and therefore the temperature, rises sharply, to several hundred °C. Fuel injected into this hot air is above its ignition temperature and ignites spontaneously. | Rapid compression, nearly adiabatic (Q ≈ 0) ; Work done on the air increases U ; Temperature rises above the fuel's ignition point ; Fuel ignites on injection without a spark

## Isobaric and isochoric processes
S: In an isobaric process the pressure is constant; in an isochoric one the volume is constant. Heating at constant pressure does work as the gas expands; heating at constant volume puts all the heat into internal energy.
O: Apply Charles's and the pressure law to isobaric and isochoric changes
O: Calculate Q, W and ΔU for both processes using C_{p} and C_{V}
O: Explain Mayer's relation C_{p} − C_{V} = R
PRE: First law of thermodynamics
LV: A level · Application
H: Isobaric (constant p)
E: V/T = constant (Charles's law)
E: W = pΔV; Q = nC_{p}ΔT; ΔU = nC_{V}ΔT
- Examples: heating gas under a free piston; boiling water in an open pan.
H: Isochoric (constant V)
E: p/T = constant (the pressure law, or Gay-Lussac's law)
E: W = 0; Q = ΔU = nC_{V}ΔT
- Examples: heating a sealed rigid container (pressure cooker before venting, aerosol can in a fire).
H: Mayer's relation
E: C_{p} − C_{V} = R (per mole, ideal gas)
P: The difference is exactly the work done at constant pressure per kelvin per mole: pΔV = RΔT. Measuring γ (from sound speed or Clément–Desormes experiments) tells you about molecular degrees of freedom.
X: 2 mol of diatomic gas (C_{V} = 5R/2) are heated by 50 K at constant pressure. Find Q, W, ΔU.
> ΔU = nC_{V}ΔT = 2 × 2.5 × 8.31 × 50 = 2.08 kJ
> W = nRΔT = 0.83 kJ; Q = ΔU + W = 2.91 kJ
K: Heating at constant volume raises U only; at constant pressure the same ΔT needs extra heat for the expansion work.
!: Aerosol cans warn against heating because isochoric heating raises pressure in proportion to absolute temperature.
T: Charles's law | For a fixed mass of gas at constant pressure, volume is proportional to absolute temperature
T: Pressure law | For a fixed mass of gas at constant volume, pressure is proportional to absolute temperature
SUM: Isobaric: W = pΔV, Q = nC_{p}ΔT. Isochoric: W = 0, Q = ΔU = nC_{V}ΔT.
SUM: C_{p} − C_{V} = R per mole is the expansion work per kelvin.
EV: established | For an ideal gas the molar heat capacities differ by exactly R, C_{p} − C_{V} = R
SRC: OpenStax, University Physics Volume 2, section 3.5 "Heat Capacities of an Ideal Gas" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/3-5-heat-capacities-of-an-ideal-gas
SRC: AQA, A-level Physics specification (7408), section 3.6.2.2 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: Why does heating at constant pressure need more heat than at constant volume? | Some of the heat goes into work as the gas expands.
Q: State Charles's law. | At constant pressure, V/T is constant.
M1@2: In an isochoric process the work done is: | Zero | pV | nRΔT | Q | Work needs a change in volume, W = ∫p dV; at constant volume it is zero and all heat goes into internal energy.
M2@1: A sealed can at 300 K and 2 atm is heated to 450 K. New pressure: | 3 atm | 2 atm | 4.5 atm | 1.3 atm | At constant volume p ∝ T (in kelvin): p = 2 × 450/300 = 3 atm.
M3@2,3: 1.0 mol of monatomic ideal gas is heated by 20 K at constant pressure. What fraction of the heat supplied goes into work? | 2/5 | 3/5 | 1/2 | 0 | Q = C_{p}ΔT = (5/2)RΔT and W = RΔT, so W/Q = 1/(5/2) = 2/5; the other 3/5 raises U.
TF1@1: At constant pressure, doubling the Celsius temperature of a gas doubles its volume. | false | V ∝ T only for absolute temperature: 20 °C to 40 °C is 293 K to 313 K, a rise of about 7%.
NUM2@1: A gas occupies 2.0 L at 27 °C. At constant pressure, what is its volume at 177 °C, in litres? | 3 | 0.02 | L | V_{2} = V_{1}T_{2}/T_{1} = 2.0 × 450/300 = 3.0 L.
SA2@2,3: Explain why more heat is needed to raise the temperature of a gas by 1 K at constant pressure than at constant volume. | At constant volume the gas does no work, so all the heat supplied raises its internal energy: Q = nC_{V}ΔT. At constant pressure the gas expands as it warms and does work pΔV = nRΔT against its surroundings. The same rise in internal energy is needed for the same ΔT, so extra heat equal to this work must be supplied: C_{p} = C_{V} + R. | Constant volume: no work, Q = ΔU ; Constant pressure: gas expands and does work pΔV ; Same ΔU for same ΔT (ideal gas) ; Extra heat equals the work, nRΔT ; C_{p} − C_{V} = R

## Heat engines
S: A heat engine takes heat from a hot source, converts part of it to work, and rejects the rest to a cold sink. The second law forbids converting all the heat to work, so some must always be discarded.
O: Describe the energy flows in a heat engine and calculate its efficiency
O: Explain why every heat engine must reject heat to a cold sink
O: Compare real engines and power stations with the Carnot limit
PRE: First law of thermodynamics
LV: A level · Application
H: The engine
E: W = Q_{h} − Q_{c}
E: η = W/Q_{h} = 1 − Q_{c}/Q_{h}
- Working substance goes round a cycle (ΔU = 0).
- Examples: steam turbines (Rankine cycle), petrol (Otto), diesel, gas turbines (Brayton), Stirling engines.
H: Real efficiencies
- Car petrol engine ~25–35%; diesel ~35–45%; combined-cycle gas power station ~60%; coal ~40%; nuclear ~33%.
- The Carnot limit, 1 − T_{c}/T_{h}, sets the maximum for given temperatures.
H: Historical impact
P: Carnot (1824) asked how much work a steam engine could get from heat, decades before energy conservation was understood. His answer, that efficiency depends only on the reservoir temperatures, became the second law and the concept of entropy.
X: A power station takes in 2500 MW of heat and outputs 1000 MW of electricity. Efficiency and heat rejected?
> η = 1000/2500 = 40%
> Q_{c} = 2500 − 1000 = 1500 MW to cooling towers or a river
K: In a cycle ΔU = 0, so work out equals heat in minus heat rejected; efficiency is W/Q_{h}.
!: The "waste" heat isn't a design failure that better engineering can eliminate; the second law requires some.
T: Heat engine | A device operating in a cycle that takes heat from a hot reservoir, does work and rejects heat to a cold reservoir
T: Thermal efficiency | η = W/Q_{h}, the fraction of the heat taken in that is converted to work
SUM: W = Q_{h} − Q_{c} and η = 1 − Q_{c}/Q_{h}.
SUM: Some heat must be rejected; real engines reach roughly 25–60%.
EV: established | No heat engine operating in a cycle can convert all the heat it absorbs into work
SRC: OpenStax, University Physics Volume 2, section 4.2 "Heat Engines" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/4-2-heat-engines
SRC: AQA, A-level Physics specification (7408), section 3.11.2 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: Why must a heat engine reject heat? | The second law forbids converting heat entirely into work in a cycle.
Q: Define the efficiency of a heat engine. | η = W/Q_{h}, the useful work divided by heat taken in.
M1@1: An engine takes 1000 J and rejects 700 J. Efficiency: | 30% | 70% | 43% | 100% | W = 1000 − 700 = 300 J, so η = 300/1000 = 30%; 70% is the fraction rejected.
M2@3: Combined-cycle power stations are more efficient because: | They use the exhaust heat of a gas turbine to run a steam turbine | They burn far less fuel per hour than a single turbine | They need no cold sink at all, unlike other stations | They run hotter than the Carnot limit allows | The gas turbine's hot exhaust becomes the heat source for a steam cycle, so two cycles share one heat input.
M3@1,3: A car engine has efficiency 30% and delivers 45 kW of mechanical power. At what rate does it reject heat? | 105 kW | 150 kW | 31.5 kW | 13.5 kW | Q_{h} rate = 45/0.30 = 150 kW, so heat rejected = 150 − 45 = 105 kW.
TF1@2: With perfect engineering and no friction, a heat engine could convert all of its heat input into work. | false | Even an ideal reversible engine must reject heat Q_{c} = Q_{h}T_{c}/T_{h}; only a cold sink at 0 K would avoid it.
NUM2@1: An engine does 400 J of work per cycle and rejects 600 J. What is its efficiency, in percent? | 40 | 0.5 | % | Q_{h} = W + Q_{c} = 1000 J, so η = 400/1000 = 40%.
SA2@1,2: Draw-describe the energy flow diagram for a heat engine and explain why its efficiency must be less than 100%. | Heat Q_{h} flows from the hot reservoir into the engine; work W comes out; heat Q_{c} flows to the cold reservoir. Over a cycle ΔU = 0, so W = Q_{h} − Q_{c}. The second law (Kelvin–Planck) says no cyclic engine can take heat from one reservoir and turn it all into work, so Q_{c} > 0 and η = W/Q_{h} < 1. The best possible is the Carnot efficiency 1 − T_{c}/T_{h}. | Q_{h} in from hot reservoir, W out, Q_{c} to cold reservoir ; Cycle: ΔU = 0 so W = Q_{h} − Q_{c} ; Second law requires Q_{c} > 0 ; Hence η < 1 ; Maximum is Carnot 1 − T_{c}/T_{h}

## Refrigerators and heat pumps
S: Refrigerators and heat pumps run a heat engine backwards: work drives heat from a cold place to a hot one. A fridge cools its inside; a heat pump warms a house using heat drawn from cold outside air or ground.
O: Calculate coefficients of performance for refrigerators and heat pumps
O: Describe the stages of the vapour-compression cycle
O: Explain why heat pumps deliver more heat than the work they use, and what limits their COP
PRE: Heat engines
LV: A level · Application
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
K: Work lets heat flow from cold to hot; the heat delivered is the heat moved plus the work, Q_{h} = Q_{c} + W.
!: A fridge with its door open heats the kitchen: it rejects Q_{c} + W, more than it removes.
T: Coefficient of performance | The useful heat transfer divided by the work input: Q_{c}/W for a fridge, Q_{h}/W for a heat pump
T: Heat pump | A device that uses work to move heat from a cold reservoir to a hotter space that it is used to heat
SUM: COP_{fridge} = Q_{c}/W; COP_{HP} = Q_{h}/W = COP_{fridge} + 1.
SUM: The Carnot COP T_{h}/(T_{h} − T_{c}) is largest for small temperature differences.
EV: established | The coefficient of performance of a heat pump is limited by T_{h}/(T_{h} − T_{c}) and falls as the temperature difference grows
SRC: OpenStax, University Physics Volume 2, section 4.3 "Refrigerators and Heat Pumps" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/4-3-refrigerators-and-heat-pumps
SRC: AQA, A-level Physics specification (7408), section 3.11.2 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What is the coefficient of performance of a heat pump? | Heat delivered divided by work input.
Q: Why can a heat pump's COP exceed 1? | It moves heat rather than creating it; the heat delivered includes heat taken from outside.
M1@1: A fridge removes 300 J using 100 J of work. COP: | 3 | 4 | 0.33 | 1 | COP_{fridge} = Q_{c}/W = 300/100 = 3; 4 would be the heat pump COP, (300 + 100)/100.
M2@3: A heat pump's COP is highest when: | The temperature difference is small | Outside is very cold | Radiators are very hot | It works hardest | The Carnot COP T_{h}/(T_{h} − T_{c}) grows as the temperature gap shrinks, which is why low-temperature underfloor heating suits heat pumps.
M3@1: A freezer at −18 °C sits in a kitchen at 22 °C. What is the maximum possible COP for removing heat from it? | 6.4 | 7.4 | 0.81 | 0.55 | COP_{fridge,max} = T_{c}/(T_{h} − T_{c}) = 255/40 = 6.4.
TF1@2: Leaving a fridge door open on a hot day will cool the kitchen. | false | The fridge rejects Q_{c} + W into the room, more than it absorbs, so the kitchen gets warmer overall.
NUM2@1: A heat pump delivers 12 kW of heat using 3.0 kW of electrical power. What is its COP? | 4 | 0 |  | COP_{HP} = Q_{h}/W = 12/3.0 = 4; it extracts the other 9 kW from outside.
SA2@2,3: Explain how a heat pump can supply 3 kW of heat to a house while using only 1 kW of electricity, without breaking energy conservation. | The heat pump does not convert electricity into heat; it uses the 1 kW of work to move heat from the cold outdoors to the warm house. A refrigerant evaporates outside, absorbing about 2 kW from the air or ground, is compressed (using the 1 kW), and condenses inside, releasing 2 + 1 = 3 kW. Energy is conserved: Q_{h} = Q_{c} + W. The second law allows this because work is supplied. | Work moves heat rather than creating it ; Heat absorbed outside in the evaporator ; Compressor adds the work ; Heat released inside: Q_{h} = Q_{c} + W ; Allowed by the second law because work is supplied

## Thermal efficiency
S: Thermal efficiency measures how much of the heat put into an engine becomes useful work. It's limited fundamentally by the Carnot bound and practically by friction, heat leaks, incomplete combustion and finite-rate heat transfer.
O: Calculate thermal, Carnot, second-law and Curzon–Ahlborn efficiencies
O: Explain how raising T_{h}, lowering T_{c} and recovering waste heat improve efficiency
O: Explain the trade-off between efficiency and power output
PRE: Heat engines
LV: Year 1 · Application
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
> CA: 1 − √0.356 = 1 − 0.597 = 40%, close to typical observed ~40%
K: The reservoir temperatures set the ceiling; finite-speed heat transfer and losses set where real engines sit below it.
!: Efficiency figures for electric cars and power stations aren't comparable without including the efficiency of generating the electricity.
T: Carnot efficiency | The maximum efficiency of any heat engine between reservoirs at T_{h} and T_{c}, 1 − T_{c}/T_{h}
T: Second-law efficiency | The ratio of an engine's actual efficiency to the Carnot efficiency for the same reservoirs
SUM: η ≤ 1 − T_{c}/T_{h}; raising T_{h} or recovering waste heat helps most.
SUM: Maximum power comes at lower efficiency, roughly 1 − √(T_{c}/T_{h}).
EV: established | The efficiency of any heat engine is bounded by the Carnot efficiency 1 − T_{c}/T_{h}
SRC: OpenStax, University Physics Volume 2, section 4.5 "The Carnot Cycle" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/4-5-the-carnot-cycle
SRC: AQA, A-level Physics specification (7408), section 3.11.2 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What is the Curzon–Ahlborn efficiency? | The efficiency at maximum power for an endoreversible engine: 1 − √(T_{c}/T_{h}).
Q: Why can't real engines reach Carnot efficiency? | Carnot efficiency requires infinitely slow reversible operation, giving zero power; friction and heat leaks also reduce it.
M1@2: Raising the hot reservoir temperature: | Increases maximum efficiency | Decreases maximum efficiency | Has no effect on efficiency | Makes the efficiency exactly 1 | η_{Carnot} = 1 − T_{c}/T_{h}; a larger T_{h} makes the fraction T_{c}/T_{h} smaller and the limit higher.
M2@2: Combined heat and power improves overall efficiency by: | Using the rejected heat for heating | Exceeding the Carnot limit | Removing the cold sink | Burning more fuel | The heat that must be rejected is piped to buildings, so it is used rather than wasted; the Carnot limit for work is unchanged.
M3@1: An engine working between 600 K and 300 K has an actual efficiency of 30%. What is its second-law efficiency? | 60% | 30% | 50% | 15% | η_{Carnot} = 1 − 300/600 = 50%, so η_{II} = 30/50 = 60%.
TF1@3: An engine running at its maximum Carnot efficiency would deliver its maximum power. | false | Carnot efficiency needs reversible heat transfer across vanishing temperature differences, which takes infinitely long: the power is zero.
NUM2@1: What is the Carnot efficiency of an engine between 900 K and 300 K, in percent? Give a whole number. | 67 | 1 | % | η = 1 − 300/900 = 0.667, about 67%.
SA3@2,3: Explain why power stations do not operate at the Carnot efficiency, and describe two ways their overall use of fuel can be improved. | Carnot efficiency needs reversible operation: heat transfer across infinitesimal temperature differences, which would take infinitely long and give no power. Real plants must transfer heat quickly across finite temperature differences, and also lose energy to friction and heat leaks, so they run well below the limit (near 1 − √(T_{c}/T_{h}) at maximum power). Fuel use improves by raising the turbine inlet temperature (higher T_{h}), by combined cycles that use gas-turbine exhaust to raise steam, or by combined heat and power that uses rejected heat. | Carnot needs reversible, infinitely slow operation ; Real plants need finite rates, so finite temperature differences ; Friction and heat losses ; Raise T_{h} / combined cycle ; Use rejected heat (CHP)

## Second law of thermodynamics
S: The second law says heat flows spontaneously only from hot to cold, and no cyclic process can turn heat entirely into work. Equivalently, the entropy of an isolated system never decreases. It gives time its direction.
O: State the Kelvin–Planck, Clausius and entropy forms of the second law
O: Explain why the statements are equivalent and identify processes they forbid
O: Explain the statistical nature of the second law and how local entropy can decrease
PRE: Heat engines
LV: A level · Physical reasoning
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
K: Heat will not flow from cold to hot by itself, and heat from one reservoir cannot all become work; both say isolated entropy never falls.
!: Local entropy can decrease (living things, fridges) if more entropy is produced elsewhere.
T: Kelvin–Planck statement | No cyclic process can take heat from a single reservoir and convert it completely into work
T: Clausius statement | Heat cannot flow from a colder body to a hotter one without some other effect, such as work being done
SUM: Kelvin–Planck, Clausius and ΔS_{isolated} ≥ 0 are equivalent forms of the second law.
SUM: The law is statistical; entropy can fall locally if it rises more elsewhere.
EV: established | The entropy of an isolated system never decreases, apart from fluctuations that are negligible for macroscopic systems
SRC: OpenStax, University Physics Volume 2, section 4.4 "Statements of the Second Law of Thermodynamics" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/4-4-statements-of-the-second-law-of-thermodynamics
SRC: AQA, A-level Physics specification (7408), section 3.11.2 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: State the Clausius form of the second law. | Heat can't flow from cold to hot by itself, with no other effect.
Q: Is the second law absolute? | It's statistical: decreases are possible but astronomically unlikely for large systems.
M1@1,2: Which is impossible? | An engine converting all heat from one reservoir into work in a cycle | A heat pump delivering more heat than the electrical work it uses | A fridge cooling its contents well below room temperature | An engine between two reservoirs with 30% efficiency | This is exactly what the Kelvin–Planck statement forbids; the other devices reject heat or use work and are allowed.
M2@3: A living cell decreases its own entropy. This is allowed because: | It increases the entropy of its surroundings more | The second law doesn't apply to life | It's not a closed system so entropy can't be defined | Cells are reversible | The cell exports heat and waste, raising the entropy of its surroundings by more than its own falls, so the total still increases.
M3@2: Suppose a device could move heat from a cold body to a hot body with no work input. Why would that also violate the Kelvin–Planck statement? | Combined with an ordinary engine, it would return all the rejected heat to the hot reservoir, giving net work from a single reservoir | It would create energy from nothing, violating the first law only | It would make the cold body reach absolute zero | It would make the engine's efficiency fall to zero | The engine's rejected Q_{c} is pumped straight back, so the combination takes only Q_{h} − Q_{c} from the hot reservoir and turns it all into work.
TF1@3: A cup of tea cooling in a room is an example of entropy increasing in the tea itself. | false | The tea's entropy falls as it loses heat; the room gains more entropy (Q/T_{room} > Q/T_{tea}), so the total increases.
NUM2@2: 1000 J of heat flows from a body at 400 K to one at 300 K. What is the total entropy change, in J K^{-1}? Give two decimal places. | 0.83 | 0.02 | J K^{-1} | ΔS = 1000/300 − 1000/400 = 3.33 − 2.50 = +0.83 J K^{-1}: positive, as the second law requires.
SA2@1,2: Show that if the Clausius statement were false, the Kelvin–Planck statement would also be false. | Suppose a device could move heat Q_{c} from cold to hot with no work. Run an ordinary engine between the same reservoirs: it takes Q_{h}, does work W and rejects Q_{c}. Use the device to return that Q_{c} to the hot reservoir. The cold reservoir now has no net change, and the combination takes Q_{h} − Q_{c} from the hot reservoir and converts it all into work W, a cyclic process turning heat from one reservoir entirely into work, which Kelvin–Planck forbids. | Assume a work-free cold-to-hot heat transfer device ; Pair it with an ordinary engine rejecting Q_{c} ; Device returns Q_{c} to the hot reservoir ; Net: heat Q_{h} − Q_{c} from one reservoir all turned into work ; Contradicts Kelvin–Planck, so the statements are equivalent

## Entropy
S: Entropy measures how many microscopic arrangements correspond to a system's macroscopic state, or equivalently how much energy is dispersed and unavailable for work. Isolated systems evolve towards maximum entropy.
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

## Reversible and irreversible processes
S: A reversible process can be undone exactly, leaving no change anywhere; it happens through a sequence of equilibrium states and creates no entropy. All real processes are irreversible to some degree.
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

## Carnot cycle
S: The Carnot cycle is the ideal reversible engine: two isothermal and two adiabatic steps between a hot and a cold reservoir. No engine working between the same temperatures can be more efficient.
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

## Thermodynamic potentials
S: Thermodynamic potentials (U, H, F, G) are energy-like state functions, each natural for different controlled conditions. The right potential tells you the useful work available and the direction of spontaneous change.
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

## Enthalpy
S: Enthalpy H = U + pV is the energy-like quantity whose change equals the heat absorbed at constant pressure. Chemists use it for reaction heats, engineers for flowing fluids in turbines and refrigerators.
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

## Helmholtz free energy
S: The Helmholtz free energy F = U − TS is the maximum work a system can do at constant temperature. At fixed temperature and volume, systems evolve to minimise F, balancing low energy against high entropy.
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

## Gibbs free energy
S: The Gibbs free energy G = H − TS decides whether a process happens spontaneously at constant temperature and pressure, the conditions of most chemistry and biology. Reactions go downhill in G.
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

## Chemical and phase equilibrium
S: At equilibrium, matter has no tendency to move between phases or react further: each species has the same chemical potential everywhere it can go. This sets boiling points, solubility, osmotic pressure and reaction yields.
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

## Maxwell relations
S: Maxwell relations are equalities between partial derivatives of thermodynamic variables, following from the potentials being state functions. They let you calculate hard-to-measure quantities, like entropy changes, from easy ones like p, V and T.
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

## Third law of thermodynamics
S: The third law says the entropy of a perfect crystal approaches zero as the temperature approaches absolute zero, and that absolute zero can't be reached in a finite number of steps.
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

## Thermodynamic cycles
S: Practical engines and refrigerators follow particular cycles chosen for their working fluid and hardware. Comparing them with the Carnot ideal shows where efficiency is lost.
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

## Equations of state
S: An equation of state relates pressure, volume and temperature (and amount) for a substance. The ideal gas law works for dilute gases; real substances need corrections for molecular size and attraction.
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

## Critical points
S: A critical point is where the distinction between two phases disappears: above the critical temperature, liquid and gas merge into one supercritical fluid. Near critical points, matter shows universal behaviour with huge fluctuations.
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

## Phase transitions
S: A phase transition is an abrupt change in a system's properties as a control parameter (temperature, pressure, field) crosses a critical value: melting, boiling, magnetisation, superconductivity. Their classification depends on how the free energy behaves.
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

## Non-equilibrium thermodynamics
S: Most of the world is out of equilibrium: heat flows, currents run, chemical reactions proceed, organisms live. Non-equilibrium thermodynamics describes flows driven by gradients, the entropy they produce, and the structures they can create.
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
`;
