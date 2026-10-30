// Unit 12: Thermodynamics. Format: kit/course/notes.js
export default `
## Temperature and thermal equilibrium
S: Temperature is the property that decides which way heat flows: from hot to cold, until the two are in thermal equilibrium at the same temperature. Microscopically, it measures the average random kinetic energy of particles.
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

## Zeroth law of thermodynamics
S: The zeroth law says that if two systems are each in thermal equilibrium with a third, they're in equilibrium with each other. It makes temperature a meaningful, measurable quantity.
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

## Heat and internal energy
S: Internal energy is the total microscopic energy of a system's particles. Heat is energy transferred because of a temperature difference; work is energy transferred by other means. Heat and work are processes, not things a system contains.
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

## Specific heat capacity
S: Specific heat capacity is the energy needed to raise the temperature of 1 kg of a substance by 1 K. Water's unusually high value moderates climates and makes it an excellent coolant.
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

## Latent heat
S: Latent heat is the energy absorbed or released during a change of phase at constant temperature. It goes into breaking or forming bonds, not raising the temperature, which is why sweating cools you and steam burns badly.
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

## Thermal expansion
S: Most materials expand when heated because their atoms vibrate with larger amplitude in an asymmetric potential, increasing the average spacing. Engineers must allow for it in bridges, railways and precision instruments.
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

## First law of thermodynamics
S: The first law is energy conservation for thermodynamic systems: the change in internal energy equals the heat supplied to the system minus the work it does. No machine can produce energy from nothing.
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

## Work done by thermodynamic systems
S: A gas does work when it expands against an external pressure. On a pressure–volume diagram, this work is the area under the curve, and it depends on the path taken between two states.
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

## Pressure-volume diagrams
S: A p–V diagram plots a gas's state as it changes. Each point is a state; each curve is a process. Areas give work, enclosed loops give net work per cycle, and the shapes reveal the kind of process.
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

## Isothermal processes
S: In an isothermal process the temperature stays constant. For an ideal gas this means internal energy doesn't change, so all the heat absorbed is turned into work (or vice versa).
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
Q: For an isothermal ideal-gas process, how are Q and W related? | Q = W, since ΔU = 0.
Q: What law describes an isothermal ideal gas? | Boyle's law, pV = constant.
M1: A gas is compressed isothermally. Its pressure: | Increases inversely with volume | Stays constant | Decreases | Doubles regardless | pV = constant.
M2: Isothermal processes require: | Slow change with good thermal contact | No heat flow | Rapid change | Insulation | Heat must flow to maintain T.

## Adiabatic processes
S: In an adiabatic process no heat enters or leaves. Compressing a gas adiabatically heats it; expanding cools it. This explains diesel ignition, cloud formation and why air cools as it rises.
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

## Isobaric and isochoric processes
S: In an isobaric process the pressure is constant; in an isochoric one the volume is constant. Heating at constant pressure does work as the gas expands; heating at constant volume puts all the heat into internal energy.
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

## Heat engines
S: A heat engine takes heat from a hot source, converts part of it to work, and rejects the rest to a cold sink. The second law forbids converting all the heat to work, so some must always be discarded.
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

## Refrigerators and heat pumps
S: Refrigerators and heat pumps run a heat engine backwards: work drives heat from a cold place to a hot one. A fridge cools its inside; a heat pump warms a house using heat drawn from cold outside air or ground.
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

## Thermal efficiency
S: Thermal efficiency measures how much of the heat put into an engine becomes useful work. It's limited fundamentally by the Carnot bound and practically by friction, heat leaks, incomplete combustion and finite-rate heat transfer.
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

## Second law of thermodynamics
S: The second law says heat flows spontaneously only from hot to cold, and no cyclic process can turn heat entirely into work. Equivalently, the entropy of an isolated system never decreases. It gives time its direction.
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
Q: What do the van der Waals constants a and b represent? | a: intermolecular attraction; b: the volume occupied by molecules.
Q: What is the compressibility factor? | Z = pV/(nRT), equal to 1 for an ideal gas.
M1: An ideal gas obeys: | pV = nRT | pV^{γ} = constant always | p = ρg | pV = 0 | Definition.
M2: Real gases deviate most from ideal behaviour at: | High pressure and low temperature | Low pressure and high temperature | Room conditions | Vacuum | Molecules close together and slow.

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
