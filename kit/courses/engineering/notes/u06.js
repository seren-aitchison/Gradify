// EngineerGradify Thermodynamics (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## Systems, properties and states
LV: Year 1 · Foundation
S: Thermodynamics begins by drawing a boundary around the thing being studied. This lesson defines closed, open and isolated systems, intensive and extensive properties, state, equilibrium, processes and cycles, and the units used throughout the school.
O: Distinguish closed, open and isolated systems
O: Classify properties as intensive or extensive
O: Define state, process, cycle and the state postulate
PRE: Normal stress and strain
H: Systems and boundaries
- **Closed system (control mass)**: a fixed quantity of matter; energy can cross the boundary as heat or work, but mass cannot. Example: gas in a piston–cylinder.
- **Open system (control volume)**: mass flows in and out through the boundary. Examples: a turbine, a pump, a car radiator.
- **Isolated system**: neither mass nor energy crosses the boundary. A well-insulated sealed flask comes close.
H: Properties
P: A **property** is any measurable characteristic of a system, such as pressure p, temperature T, volume V or mass m. **Extensive** properties depend on the size of the system (V, m, total energy E). **Intensive** properties do not (p, T, density). Dividing an extensive property by mass gives a **specific** property, such as specific volume v = V ÷ m, which behaves as an intensive property.
H: State, process and cycle
- **State**: the condition of a system described by its properties. The **state postulate** says that the state of a simple compressible substance is fixed by two independent intensive properties.
- **Equilibrium**: no unbalanced driving forces remain, so properties are uniform and unchanging.
- **Process**: a change from one state to another. A **quasi-equilibrium** process passes slowly through equilibrium states, which lets us draw it on a p–V diagram.
- **Cycle**: a series of processes returning the system to its initial state, so every property ends where it started.
X: Classifying a hot-water cylinder.
> With all valves shut, the water inside is a closed system.
> When hot water is drawn off and cold water enters, it becomes an open system.
> Temperature (60 °C) is intensive; the 150 litres of water stored is extensive.
> Specific volume of the water, about 0.001 m^{3}/kg, is a specific (intensive) property.
K: Choosing the system boundary carefully is the first step in every thermodynamic analysis; two independent intensive properties then fix the state of a simple substance, and processes and cycles describe how that state changes.
!: Treating absolute and gauge pressure as the same. Thermodynamic equations use absolute pressure: absolute = gauge + atmospheric (about 101.3 kPa at sea level).
EV: established | The state postulate for simple compressible systems is a foundation of classical thermodynamics.
T: Closed system | A fixed mass across whose boundary only energy can pass
T: Control volume | A region in space through which mass flows
T: Intensive property | A property independent of the size of the system
SUM: Systems are closed, open or isolated.
SUM: Properties are intensive or extensive.
SUM: Two independent intensive properties fix a simple state.
SRC: Çengel Y. A. and Boles M. A., Thermodynamics: An Engineering Approach, 9th edition, McGraw-Hill | secondary | 2019
SRC: Rogers G. F. C. and Mayhew Y. R., Engineering Thermodynamics: Work and Heat Transfer, 4th edition, Longman | secondary | 1992
Q: Why is a steam turbine analysed as an open system? | Steam flows continuously in and out across its boundary.
Q: Why does a property return to its starting value after a cycle? | A cycle ends at the initial state, and properties depend only on state.
M1#engineering-u06-01-q1@1: Which is an intensive property? | Temperature | Total volume | Total mass | Total internal energy | Temperature does not depend on the amount of matter.
M2#engineering-u06-01-q2@2: A gauge reads 300 kPa where atmospheric pressure is 100 kPa. Which pressure goes into thermodynamic equations? | 400 kPa absolute | 300 kPa gauge | 200 kPa difference | 100 kPa atmospheric | Absolute pressure is gauge plus atmospheric pressure.
M3#engineering-u06-01-q3@3: Why can a quasi-equilibrium process be drawn as a line on a p–V diagram? | Each point along it is an equilibrium state with defined properties | The process happens too fast to have any states | Only cycles can be plotted on such diagrams | Pressure stays exactly constant in every such process | Non-equilibrium states have no single values of p and V.
MATCH1#engineering-u06-01-q4@1: Match each example to its system type. | Gas in a sealed piston–cylinder = Closed system ; Jet engine in flight = Open system ; Ideal insulated sealed flask = Isolated system ; Garden hose nozzle = Control volume | The boundary and what crosses it define the type.
SA2#engineering-u06-01-q5@2,3: Explain why specific volume is treated as an intensive property even though volume is extensive. | Volume and mass are both extensive, doubling when the system doubles. Their ratio, specific volume v = V ÷ m, stays the same however much substance is present, so it behaves as an intensive property and can be used with another intensive property to fix the state. | Volume extensive ; Ratio to mass ; Independent of size ; Used to fix state

## Energy, work and heat
LV: Year 1 · Foundation
S: Energy crosses a system boundary in only two ways: as work or as heat. This lesson defines both, sets out the sign convention, and shows how boundary work is the area under a p–V curve.
O: Distinguish heat and work as energy in transit
O: Apply a consistent sign convention
O: Calculate boundary work for constant-pressure and polytropic processes
PRE: Systems, properties and states
H: Forms of energy
- **Internal energy U**: energy of molecular motion and bonding, stored within the system.
- **Kinetic energy** ½mc^{2} and **potential energy** mgz: energy due to motion and height.
- **Heat Q**: energy crossing the boundary because of a temperature difference.
- **Work W**: energy crossing the boundary by any other means, such as a moving piston or rotating shaft.
H: Heat and work are path functions
P: Heat and work are not properties. A system does not "contain" heat or work; they exist only while crossing the boundary, and their amount depends on the path taken between two states. In this school, heat **added to** the system and work **done by** the system are positive, so Q − W gives the energy retained.
E: Boundary work W = ∫ p dV :: area under the process curve on a p–V diagram
E: Constant pressure W = p (V_{2} − V_{1}) :: isobaric expansion or compression
E: Polytropic W = (p_{2}V_{2} − p_{1}V_{1}) ÷ (1 − n) :: pV^{n} = constant, n ≠ 1
X: Expansion at constant pressure.
> A gas at 200 kPa expands from 0.05 m^{3} to 0.15 m^{3}.
> V_{2} − V_{1} = 0.15 − 0.05 = 0.10 m^{3}.
> W = 200 × 0.10 = 20 kJ, done by the gas.
> Shaft work in a rotating machine is torque × angular speed × time.
K: Energy crosses a boundary as heat, driven by temperature difference, or as work; both depend on the path, and boundary work equals the area under the p–V curve of the process.
!: Saying a hot object "has a lot of heat". It has high internal energy; heat is only the energy transferred because of a temperature difference.
EV: established | Heat and work are path functions, while internal energy is a property.
T: Heat | Energy transfer driven by a temperature difference
T: Boundary work | Work done by a moving system boundary, ∫ p dV
T: Path function | A quantity whose value depends on the process path
SUM: Heat and work are energy in transit.
SUM: Both depend on the path, not just end states.
SUM: Boundary work is the area under p–V.
SRC: Çengel Y. A. and Boles M. A., Thermodynamics: An Engineering Approach, 9th edition, McGraw-Hill | secondary | 2019
SRC: Eastop T. D. and McConkey A., Applied Thermodynamics for Engineering Technologists, 5th edition, Longman | secondary | 1993
Q: Why is heat not a property of a system? | Its amount depends on the process path, not only on the end states.
Q: What does the area under a p–V curve represent? | The boundary work done during the process.
M1#engineering-u06-02-q1@1: What drives heat transfer across a boundary? | A temperature difference | A pressure difference | A change in volume | A rotating shaft | Heat flows because of a temperature difference.
M2#engineering-u06-02-q2@2: In this school's sign convention, which is positive? | Heat added to the system and work done by it | Heat lost and work done on the system | Only heat lost by the system | Only work done on the system | Applying the standard result: Q in and W out are both positive.
NUM2#engineering-u06-02-q3@2: A gas at a constant 150 kPa is compressed from 0.30 m^{3} to 0.10 m^{3}. What is the magnitude of the boundary work, in kJ? | 30 | 0.5 | kJ | W = 150 × (0.30 − 0.10) = 150 × 0.20 = 30 kJ, done on the gas.
M3#engineering-u06-02-q4@3: Two processes link the same two states, one with more area under its p–V curve. What follows? | It involves more boundary work | It ends with higher internal energy | It must be faster | It involves exactly the same work | Work is a path function equal to the area.
SA2#engineering-u06-02-q5@2,3: Explain why two processes between the same states can involve different amounts of heat. | Heat and work are path functions. The change in internal energy between the states is fixed, but if one path does more boundary work, the first law requires a correspondingly different heat transfer, so the heat depends on the path taken. | Path functions ; Fixed ΔU ; Different work ; Different heat

## Properties of pure substances and steam tables
LV: Year 1 · Intermediate
S: Water is the working fluid of most power stations, and it changes phase. This lesson explains saturation, quality and superheat, and shows how to read and interpolate steam tables.
O: Describe compressed liquid, saturated and superheated states
O: Use dryness fraction to find wet-steam properties
O: Interpolate in steam tables
PRE: Energy, work and heat
H: Phases of a pure substance
- **Compressed (subcooled) liquid**: below the saturation temperature for its pressure.
- **Saturated liquid** (subscript f) and **saturated vapour** (subscript g): at the boiling point for that pressure.
- **Wet steam**: a mixture of saturated liquid and vapour, at one fixed temperature for a given pressure.
- **Superheated vapour**: above the saturation temperature; pressure and temperature are now independent.
H: Dryness fraction
P: The **dryness fraction** (quality) x is the mass of vapour divided by the total mass. For wet steam, any specific property follows from x and the saturated values: v = v_{f} + x v_{fg}, and likewise h = h_{f} + x h_{fg}, where h_{fg} = h_{g} − h_{f} is the latent heat. Above the critical point (22.06 MPa, 374 °C) there is no distinct boiling.
E: h = h_{f} + x h_{fg} :: specific enthalpy of wet steam
E: Linear interpolation y = y_{1} + (x − x_{1})(y_{2} − y_{1}) ÷ (x_{2} − x_{1}) :: between two table rows
X: Wet steam at 1 bar.
> From the tables at 1 bar: T_{sat} = 99.6 °C, h_{f} = 417.5 kJ/kg, h_{fg} = 2257.5 kJ/kg.
> Steam with x = 0.9: x h_{fg} = 0.9 × 2257.5 = 2031.75 kJ/kg.
> h = 417.5 + 2031.75 = 2449.25 kJ/kg, about 2449 kJ/kg.
> If the measured temperature were above 99.6 °C at 1 bar, the steam would be superheated instead.
K: For a pure substance, pressure and temperature are linked during boiling, so wet steam needs the dryness fraction to fix its state; steam tables give saturated and superheated properties, read directly or by linear interpolation.
!: Using temperature and pressure to fix the state of wet steam. In the two-phase region they are not independent; you need x or another property.
EV: established | Steam table data derive from the IAPWS formulations for water and steam.
T: Dryness fraction | The mass fraction of vapour in wet steam
T: Saturation temperature | The boiling temperature at a given pressure
T: Superheated vapour | Vapour at a temperature above saturation for its pressure
SUM: Phase depends on pressure and temperature.
SUM: Wet steam needs a dryness fraction.
SUM: Steam tables are read or interpolated.
SRC: Rogers G. F. C. and Mayhew Y. R., Thermodynamic and Transport Properties of Fluids: SI Units, 5th edition, Blackwell | secondary | 1995
SRC: Çengel Y. A. and Boles M. A., Thermodynamics: An Engineering Approach, 9th edition, McGraw-Hill | secondary | 2019
Q: What is the dryness fraction of saturated vapour? | 1, because all the mass is vapour.
Q: Why does wet steam at 1 bar stay at 99.6 °C while heating? | The added energy changes liquid to vapour rather than raising temperature.
M1#engineering-u06-03-q1@1: What does a dryness fraction of 0.8 mean? | 80% of the mass is vapour | 80% of the volume is liquid | The steam is 80 °C above saturation | 80% of the energy is latent heat | Applying the standard result: Quality is the vapour mass fraction.
M2#engineering-u06-03-q2@2: Water at 1 bar is at 150 °C. What state is it in? | Superheated vapour | Compressed liquid | Wet steam | Saturated liquid | 150 °C is above the 99.6 °C saturation temperature.
NUM2#engineering-u06-03-q3@2: At a pressure where h_{f} = 500 kJ/kg and h_{fg} = 2200 kJ/kg, what is the enthalpy of steam with x = 0.75, in kJ/kg? | 2150 | 1 | kJ/kg | h = 500 + 0.75 × 2200 = 500 + 1650 = 2150 kJ/kg.
M3#engineering-u06-03-q4@3: Why are pressure and temperature not enough to fix the state of wet steam? | They are linked during phase change and not independent | Steam tables list no pressures for wet steam | Wet steam has no defined temperature | Pressure is always unknown in boilers | In the two-phase region a second independent property such as x is needed.
SA2#engineering-u06-03-q5@2,3: Describe what happens to the temperature and state of water heated at constant 1 bar from 20 °C to 200 °C. | It starts as compressed liquid and warms to 99.6 °C, becoming saturated liquid. It then boils at constant temperature as wet steam while the dryness fraction rises from 0 to 1. Once saturated vapour, further heating raises its temperature as superheated vapour up to 200 °C. | Compressed liquid ; Boiling at constant T ; Rising dryness fraction ; Superheated vapour

## Ideal gases
LV: Year 1 · Intermediate
S: Air and combustion gases behave very nearly as ideal gases at the pressures used in engines. This lesson applies the ideal gas equation, specific heats and the relations between them.
O: Apply pV = mRT using absolute values
O: Relate R, c_{p}, c_{v} and γ
O: Calculate internal energy and enthalpy changes of an ideal gas
PRE: Properties of pure substances and steam tables
H: The ideal gas equation
P: An ideal gas obeys **pV = mRT**, where R is the specific gas constant: the universal constant 8.314 kJ/(kmol K) divided by molar mass. For air, R = 0.287 kJ/(kg K). Temperatures must be in kelvin and pressures absolute. The model is good when the gas is far from condensing, at low pressure and high temperature relative to its critical point.
H: Specific heats
- **c_{v}**: energy to raise 1 kg by 1 K at constant volume; for air about 0.718 kJ/(kg K).
- **c_{p}**: at constant pressure; for air about 1.005 kJ/(kg K).
- **c_{p} − c_{v} = R**, and **γ = c_{p} ÷ c_{v}**, about 1.4 for air.
- For an ideal gas, internal energy and enthalpy depend on temperature only: Δu = c_{v} ΔT and Δh = c_{p} ΔT.
E: pV = mRT :: ideal gas equation, absolute p and T
E: p_{1}V_{1} ÷ T_{1} = p_{2}V_{2} ÷ T_{2} :: fixed mass of ideal gas
X: Volume of air in a tank.
> 2 kg of air at 100 kPa and 27 °C, so T = 300 K.
> V = mRT ÷ p = 2 × 0.287 × 300 ÷ 100 = 1.722 m^{3}.
> Heating it at constant volume to 400 K: ΔU = 2 × 0.718 × 100 = 143.6 kJ.
> The pressure rises to 100 × 400 ÷ 300, about 133 kPa.
K: Ideal gases obey pV = mRT with absolute pressure and temperature; their internal energy and enthalpy depend only on temperature, with c_{p} − c_{v} = R and γ about 1.4 for air.
!: Using degrees Celsius in pV = mRT. Always convert to kelvin by adding 273.15.
EV: established | Air behaves as an ideal gas to within a few per cent at typical engine and atmospheric conditions.
EV: established | Real-gas equations of state are needed for high-pressure hydrogen storage and supercritical carbon dioxide cycles.
T: Specific gas constant | The universal gas constant divided by molar mass
T: Ratio of specific heats | γ = c_{p} ÷ c_{v}
T: Ideal gas | A gas obeying pV = mRT, with u and h depending only on T
SUM: pV = mRT needs absolute values.
SUM: c_{p} − c_{v} = R; γ is about 1.4 for air.
SUM: Ideal-gas u and h depend on T only.
SRC: Çengel Y. A. and Boles M. A., Thermodynamics: An Engineering Approach, 9th edition, McGraw-Hill | secondary | 2019
SRC: Eastop T. D. and McConkey A., Applied Thermodynamics for Engineering Technologists, 5th edition, Longman | secondary | 1993
Q: Why is c_{p} larger than c_{v}? | At constant pressure the gas also does expansion work as it is heated.
Q: What is R for air? | About 0.287 kJ/(kg K).
M1#engineering-u06-04-q1@1: For an ideal gas, which quantity depends only on temperature? | Specific internal energy | Specific volume | Absolute pressure | Total boundary work | Applying the standard result: u = u(T) for an ideal gas.
M2#engineering-u06-04-q2@2: What is c_{p} − c_{v} equal to for an ideal gas? | The specific gas constant R | The ratio γ | The universal constant 8.314 | Zero at all temperatures | Applying the standard result: The difference equals R.
NUM2#engineering-u06-04-q3@2: What is the mass of air in a 3 m^{3} tank at 200 kPa and 300 K, with R = 0.287 kJ/(kg K), in kg? | 6.97 | 0.05 | kg | m = pV ÷ RT = 600 ÷ 86.1 = 6.97 kg.
M3#engineering-u06-04-q4@3: A tyre is checked cold at 20 °C, then after driving at 50 °C. Ignoring volume change, by what factor has absolute pressure risen? | About 1.10, from 323 ÷ 293 | Exactly 2.5, from 50 ÷ 20 | About 0.40, from 20 ÷ 50 | It does not change at all | Pressure scales with absolute temperature.
SA2#engineering-u06-04-q5@2,3: Explain why the ideal gas equation must use kelvin rather than degrees Celsius. | pV = mRT is a proportional relationship in which pressure and volume go to zero at absolute zero. Celsius has an arbitrary zero, so ratios and products using it give wrong answers; only the absolute kelvin scale makes the proportionality valid. | Proportional relation ; Absolute zero ; Arbitrary Celsius zero ; Kelvin required

## The first law for closed systems
LV: Year 1 · Intermediate
S: Energy is conserved. This lesson applies the first law to closed systems, Q − W = ΔU, through constant-volume, constant-pressure, isothermal and polytropic processes.
O: State and apply the first law for a closed system
O: Analyse standard ideal-gas processes
O: Apply the first law over a cycle
PRE: Ideal gases
H: The first law
P: For a closed system, **Q − W = ΔU** (ignoring changes in kinetic and potential energy). Over a complete cycle the system returns to its initial state, so ΔU = 0 and the **net heat equals the net work**. This is the principle every heat engine relies on.
H: Standard processes for an ideal gas
- **Constant volume**: W = 0, so Q = ΔU = m c_{v} ΔT.
- **Constant pressure**: W = p ΔV, and Q = ΔH = m c_{p} ΔT.
- **Isothermal**: ΔU = 0, so Q = W = p_{1}V_{1} ln(V_{2} ÷ V_{1}).
- **Polytropic** pV^{n} = C: W = (p_{2}V_{2} − p_{1}V_{1}) ÷ (1 − n); n = γ gives the reversible adiabatic case with Q = 0.
E: Q − W = ΔU :: first law, closed system
E: Isothermal W = p_{1}V_{1} ln(V_{2} ÷ V_{1}) :: ideal gas at constant T
X: Heating a gas in a piston–cylinder.
> A gas receives Q = 50 kJ and does W = 20 kJ of work.
> ΔU = Q − W = 50 − 20 = 30 kJ.
> If instead the piston were locked, W = 0 and all 50 kJ would raise U.
> In a cycle with 120 kJ heat in and 80 kJ heat out, net work = 120 − 80 = 40 kJ.
K: For a closed system Q − W = ΔU; constant-volume, constant-pressure, isothermal and polytropic processes are special cases, and around any cycle the net heat in equals the net work out.
!: Forgetting the sign of work. Work done on the gas during compression is negative in this convention, so it adds to ΔU.
EV: established | The first law of thermodynamics has no known exceptions in engineering practice.
T: First law | Energy conservation: Q − W = ΔU for a closed system
T: Isothermal process | A process at constant temperature
T: Adiabatic process | A process with no heat transfer
SUM: Q − W = ΔU for a closed system.
SUM: Each standard process simplifies the equation.
SUM: Over a cycle, net heat equals net work.
SRC: Rogers G. F. C. and Mayhew Y. R., Engineering Thermodynamics: Work and Heat Transfer, 4th edition, Longman | secondary | 1992
SRC: Çengel Y. A. and Boles M. A., Thermodynamics: An Engineering Approach, 9th edition, McGraw-Hill | secondary | 2019
Q: Why is ΔU zero for an ideal gas in an isothermal process? | Its internal energy depends only on temperature, which stays constant.
Q: What is the net change in internal energy over a cycle? | Zero, because the system returns to its initial state.
M1#engineering-u06-05-q1@1: In a constant-volume process, which term is zero? | Boundary work | Heat transfer | Change in internal energy | Temperature change | Applying the standard result: No volume change means no boundary work.
M2#engineering-u06-05-q2@2: In an adiabatic compression, where does the work done on the gas go? | It raises the gas's internal energy | It leaves as heat to the surroundings | It disappears from the system | It lowers the gas temperature | Applying the standard result: With Q = 0, ΔU = −W, which is positive.
NUM2#engineering-u06-05-q3@2: A closed system receives 80 kJ of heat while 25 kJ of work is done on it. What is ΔU, in kJ? | 105 | 0.5 | kJ | W = −25 kJ, so ΔU = 80 − (−25) = 105 kJ.
M3#engineering-u06-05-q4@3: Over one cycle, an engine takes in 500 kJ of heat and rejects 300 kJ. What is its net work output? | 200 kJ | 800 kJ | 500 kJ | 0 kJ | Applying the standard result: Net work equals net heat over a cycle.
SA2#engineering-u06-05-q5@2,3: Explain why, for an ideal gas expanding isothermally, all the heat added is converted to work. | For an ideal gas, internal energy depends only on temperature. At constant temperature ΔU = 0, so the first law Q − W = ΔU gives Q = W: every kilojoule of heat entering leaves as boundary work. | U depends on T ; ΔU = 0 ; Q = W ; First law

## The first law for steady-flow systems
LV: Year 1 · Intermediate
S: Turbines, pumps and boilers run with fluid flowing steadily through them. This lesson develops mass conservation and the steady-flow energy equation, using enthalpy to account for flow work.
O: Apply conservation of mass to a control volume
O: State the steady-flow energy equation
O: Explain why enthalpy appears in flow analysis
PRE: The first law for closed systems
H: Conservation of mass
P: In steady flow, nothing inside the control volume changes with time, so the mass flow rate in equals the mass flow rate out: **ṁ = ρ A c**, where A is the flow area and c the mean velocity. Equivalently, ṁ = A c ÷ v using specific volume.
H: The steady-flow energy equation
P: Fluid entering a control volume is pushed in by the fluid behind it, which does **flow work** pv per kilogram. Combining this with internal energy gives **enthalpy**, h = u + pv. The steady-flow energy equation (SFEE) per unit time is: Q̇ − Ẇ = ṁ [(h_{2} − h_{1}) + (c_{2}^{2} − c_{1}^{2}) ÷ 2 + g (z_{2} − z_{1})].
- Q̇ is heat added per second and Ẇ is shaft power produced.
- Velocity terms in m^{2}/s^{2} must be divided by 1000 to give kJ/kg.
- Height changes are often negligible in machines.
E: ṁ = ρ A c :: continuity
E: h = u + pv :: enthalpy includes flow work
X: Air flow in a duct.
> Air at 1.2 kg/m^{3} flows at 10 m/s through a duct of area 0.5 m^{2}.
> ṁ = 1.2 × 0.5 × 10 = 6 kg/s.
> If the area halves downstream at the same density, the velocity doubles to 20 m/s.
> Kinetic energy rises by (20^{2} − 10^{2}) ÷ 2 = 150 J/kg, which is only 0.15 kJ/kg.
K: In steady flow the mass flow in equals the mass flow out, and the steady-flow energy equation balances heat and shaft work against changes in enthalpy, kinetic and potential energy, with enthalpy including the flow work.
!: Mixing units in the SFEE. Velocities give J/kg, while steam-table enthalpies are in kJ/kg.
EV: established | The SFEE is the standard basis for analysing turbomachines and heat exchangers.
T: Enthalpy | h = u + pv, internal energy plus flow work
T: Steady flow | Flow in which properties at each point do not change with time
T: Flow work | The work needed to push fluid into or out of a control volume
SUM: Mass in equals mass out in steady flow.
SUM: Enthalpy includes flow work.
SUM: The SFEE balances heat, work and energy changes.
SRC: Eastop T. D. and McConkey A., Applied Thermodynamics for Engineering Technologists, 5th edition, Longman | secondary | 1993
SRC: Çengel Y. A. and Boles M. A., Thermodynamics: An Engineering Approach, 9th edition, McGraw-Hill | secondary | 2019
Q: Why is enthalpy used for flowing fluids? | It combines internal energy with the flow work needed to push fluid across the boundary.
Q: What does steady flow mean? | Properties at each point do not change with time.
M1#engineering-u06-06-q1@1: What does the continuity equation conserve? | Mass flow rate | Velocity | Enthalpy | Pressure | Applying the standard result: Mass in equals mass out in steady flow.
M2#engineering-u06-06-q2@2: Why must velocity terms in the SFEE often be divided by 1000? | They come out in J/kg while enthalpy is in kJ/kg | Velocity is always given in km/s | The SFEE requires dimensionless terms | Kinetic energy is negligible otherwise | Applying the standard result: Units must match before adding.
NUM2#engineering-u06-06-q3@2: Water at 1000 kg/m^{3} flows at 2 m/s through a pipe of area 0.01 m^{2}. What is the mass flow rate, in kg/s? | 20 | 0.1 | kg/s | ṁ = ρAc = 1000 × 0.01 × 2 = 20 kg/s.
M3#engineering-u06-06-q4@3: In a pipe, the flow area halves while density stays constant. What happens to velocity? | It doubles | It halves | It stays the same | It quadruples | ṁ = ρAc is constant, so c is inversely proportional to A.
SA2#engineering-u06-06-q5@2,3: Explain what flow work is and why it is included in enthalpy. | To push a kilogram of fluid into a control volume, the fluid behind must do work against the pressure, equal to pv per kilogram. This energy is carried across the boundary with the flow, so combining it with internal energy as enthalpy, h = u + pv, accounts for it automatically in the energy equation. | Pushing fluid in ; Equal to pv ; Carried with flow ; h = u + pv

## Nozzles, turbines, compressors and heat exchangers
LV: Year 1 · Intermediate
S: The steady-flow energy equation simplifies neatly for each common device. This lesson applies it to nozzles, turbines, compressors and pumps, throttling valves and heat exchangers.
O: Simplify the SFEE for each standard device
O: Calculate nozzle exit velocity and turbine or compressor power
O: Apply an energy balance to a heat exchanger
PRE: The first law for steady-flow systems
H: Device-by-device simplifications
- **Nozzle**: no work, nearly adiabatic; enthalpy falls as kinetic energy rises: c_{2}^{2} ÷ 2 = h_{1} − h_{2} (with c_{1} small). A **diffuser** does the reverse.
- **Turbine**: adiabatic, kinetic energy changes small; power Ẇ = ṁ (h_{1} − h_{2}).
- **Compressor or pump**: power input Ẇ_{in} = ṁ (h_{2} − h_{1}); for a liquid pump, approximately ṁ v Δp.
- **Throttling valve**: no work, no heat, negligible kinetic change, so **h_{1} = h_{2}**. Pressure drops and, for steam or refrigerant, temperature usually falls.
- **Heat exchanger**: no work; with good insulation, heat lost by the hot stream equals heat gained by the cold stream.
H: Choosing the assumptions
P: Each simplification is a judgement, not a rule. Check whether the device is insulated, whether velocities change much, and whether a shaft crosses the boundary. A compressor with a water-cooled casing, for example, has a significant heat term, and a nozzle's kinetic energy term is the whole point of the device.
X: Power from a steam turbine.
> Steam flows at 5 kg/s, entering at h_{1} = 3200 kJ/kg and leaving at h_{2} = 2400 kJ/kg.
> Ẇ = 5 × (3200 − 2400) = 5 × 800 = 4000 kW, or 4 MW.
> If the inlet and outlet velocities were 50 and 150 m/s, the kinetic term would be (150^{2} − 50^{2}) ÷ 2 = 10,000 J/kg, only 10 kJ/kg.
> This is just over 1% of the enthalpy drop, which is why it is usually neglected.
X: Exit velocity of a nozzle.
> Enthalpy falls by 200 kJ/kg, or 200,000 J/kg, and the inlet velocity is negligible.
> c_{2} = √(2 × 200,000) = √400,000, about 632 m/s.
K: The SFEE reduces to a simple form for each device: enthalpy drop gives turbine power or nozzle velocity, enthalpy rise gives compressor power, enthalpy is constant across a throttle, and heat exchangers balance hot and cold streams.
!: Assuming temperature is constant across a throttle. Enthalpy is constant; for steam and refrigerants the temperature usually drops.
EV: established | The SFEE device models are standard in power and refrigeration plant design.
T: Nozzle | A device that accelerates a fluid by reducing its enthalpy and pressure
T: Throttling | An adiabatic, work-free pressure drop at constant enthalpy
T: Heat exchanger | A device transferring heat between two fluid streams
SUM: Turbines produce ṁ Δh of power.
SUM: Throttles keep enthalpy constant.
SUM: Heat exchangers balance two streams.
SRC: Eastop T. D. and McConkey A., Applied Thermodynamics for Engineering Technologists, 5th edition, Longman | secondary | 1993
SRC: Çengel Y. A. and Boles M. A., Thermodynamics: An Engineering Approach, 9th edition, McGraw-Hill | secondary | 2019
Q: What property is constant across a throttling valve? | Specific enthalpy.
Q: Why are kinetic energy changes often ignored in turbines? | They are small compared with the enthalpy drop, typically around 1%.
M1#engineering-u06-07-q1@1: Which device converts enthalpy into fluid velocity? | A nozzle | A diffuser | A pump | A throttling valve | Applying the standard result: Nozzles accelerate the flow.
M2#engineering-u06-07-q2@2: Which assumptions give h_{1} = h_{2} for a throttling valve? | No work, no heat and negligible kinetic change | Constant temperature and constant pressure | Constant volume and no friction | Constant entropy and no heat | Applying the standard result: All other SFEE terms vanish.
NUM2#engineering-u06-07-q3@2: Air flows at 2 kg/s through a compressor, with c_{p} = 1.005 kJ/(kg K) and a temperature rise of 200 K. What is the power input, in kW? | 402 | 1 | kW | Ẇ = ṁ c_{p} ΔT = 2 × 1.005 × 200 = 402 kW.
M3#engineering-u06-07-q4@3: In an insulated heat exchanger, the hot stream loses 300 kW. What does the cold stream gain? | 300 kW | 150 kW | 600 kW | Nothing, as heat is lost | With no losses, heat lost equals heat gained.
SA2#engineering-u06-07-q5@2,3: Explain why a nozzle increases fluid velocity without any work input. | The SFEE for an adiabatic, work-free nozzle reduces to a balance between enthalpy and kinetic energy. As the fluid expands to a lower pressure, its enthalpy falls, and that energy appears as kinetic energy, so c_{2}^{2} ÷ 2 = h_{1} − h_{2}. | SFEE simplification ; No work or heat ; Enthalpy falls ; Kinetic energy rises

## The second law and heat engines
LV: Year 1 · Intermediate
S: The first law says energy is conserved; the second says which way processes go and limits how much heat can become work. This lesson introduces heat engines, refrigerators, thermal efficiency and the Kelvin–Planck and Clausius statements.
O: State the Kelvin–Planck and Clausius statements
O: Calculate thermal efficiency and coefficient of performance
O: Explain reversible and irreversible processes
PRE: The first law for closed systems
H: Heat engines
P: A **heat engine** receives heat Q_{H} from a hot reservoir, produces net work W and rejects heat Q_{L} to a cold reservoir. Its **thermal efficiency** is η = W ÷ Q_{H} = 1 − Q_{L} ÷ Q_{H}. Power stations, car engines and jet engines are all heat engines.
H: Statements of the second law
- **Kelvin–Planck**: no cyclic device can produce work while exchanging heat with only one reservoir. Some heat must always be rejected, so η < 100%.
- **Clausius**: no cyclic device can transfer heat from a colder body to a hotter one with no other effect. Refrigerators need a work input.
- The two statements are equivalent: violating one allows a device that violates the other.
H: Reversibility
P: A **reversible** process could be reversed leaving no trace on the system or surroundings. Real processes are **irreversible** because of friction, unrestrained expansion, mixing, and heat transfer across a finite temperature difference. Irreversibilities reduce the work a device can deliver.
E: η = W ÷ Q_{H} = 1 − Q_{L} ÷ Q_{H} :: thermal efficiency of a heat engine
X: Efficiency of an engine.
> An engine takes in Q_{H} = 1000 kJ and rejects Q_{L} = 650 kJ per cycle.
> W = 1000 − 650 = 350 kJ.
> η = 350 ÷ 1000 = 0.35, or 35%.
> The 650 kJ rejected is not a design fault to be eliminated; the second law requires some rejection.
K: The second law forbids converting heat entirely into work in a cycle and forbids spontaneous heat flow from cold to hot; heat engines therefore have efficiencies below 100%, and irreversibilities reduce them further.
!: Believing a perfect engine would reject no heat. Even an ideal reversible engine must reject heat to a cold reservoir.
EV: established | No verified device has ever violated the Kelvin–Planck or Clausius statements.
T: Heat engine | A cyclic device converting part of the heat supplied into work
T: Thermal efficiency | Net work out divided by heat supplied
T: Irreversibility | Any effect, such as friction, that prevents a process from being reversed
SUM: Heat engines must reject some heat.
SUM: Heat does not flow cold to hot unaided.
SUM: Irreversibilities reduce work output.
SRC: Rogers G. F. C. and Mayhew Y. R., Engineering Thermodynamics: Work and Heat Transfer, 4th edition, Longman | secondary | 1992
SRC: Çengel Y. A. and Boles M. A., Thermodynamics: An Engineering Approach, 9th edition, McGraw-Hill | secondary | 2019
Q: Why must a heat engine reject heat? | The Kelvin–Planck statement forbids producing work from a single reservoir.
Q: Name two sources of irreversibility. | Friction and heat transfer across a finite temperature difference.
M1#engineering-u06-08-q1@1: What does the Kelvin–Planck statement forbid? | A cyclic engine converting all heat from one reservoir into work | Any conversion of heat into work at all | Heat flowing from hot bodies to cold ones | Refrigerators using electrical work | Applying the standard result: Some heat must be rejected.
M2#engineering-u06-08-q2@2: Which is an irreversibility? | Friction in a bearing | A slow frictionless compression | Heat transfer across zero temperature difference | A quasi-equilibrium expansion | Friction cannot be undone without a trace.
NUM2#engineering-u06-08-q3@2: An engine produces 400 kJ of work from 1250 kJ of heat. What is its thermal efficiency, in per cent? | 32 | 0.5 | % | η = 400 ÷ 1250 = 0.32, or 32%.
M3#engineering-u06-08-q4@3: An inventor claims an engine takes 100 kJ from one hot source and delivers 100 kJ of work each cycle. What is wrong? | It violates the second law by rejecting no heat | It violates the first law by creating energy | It is possible if friction is removed | Nothing; it simply has 100% efficiency | Energy balances, but the second law forbids it.
SA2#engineering-u06-08-q5@2,3: Explain why the Kelvin–Planck and Clausius statements are equivalent. | If a refrigerator could move heat from cold to hot with no work (violating Clausius), pairing it with a normal engine would give a combined device taking heat from one reservoir and producing work only, violating Kelvin–Planck. The reverse argument also holds, so violating either statement implies violating the other. | Combine devices ; Clausius violation ; Leads to Kelvin–Planck violation ; Reverse also true

## The Carnot cycle
LV: Year 1 · Advanced
S: The Carnot cycle sets the maximum efficiency any heat engine can reach between two temperatures. This lesson describes its four processes and uses the Carnot efficiency to judge real engines.
O: Describe the four processes of the Carnot cycle
O: Calculate Carnot efficiency from reservoir temperatures
O: Explain why the Carnot limit cannot be reached in practice
PRE: The second law and heat engines
H: The four processes
- **1–2 Isothermal heat addition** at T_{H}, as the working fluid expands.
- **2–3 Reversible adiabatic (isentropic) expansion**, cooling from T_{H} to T_{L}.
- **3–4 Isothermal heat rejection** at T_{L}, as the fluid is compressed.
- **4–1 Reversible adiabatic compression** back to T_{H}.
H: The Carnot principles
P: No engine operating between two reservoirs can be more efficient than a reversible engine between the same reservoirs, and all reversible engines between them have the same efficiency. That efficiency depends only on the absolute temperatures: **η_{Carnot} = 1 − T_{L} ÷ T_{H}**. Raising T_{H} or lowering T_{L} raises the limit.
H: Why it is not built
- Isothermal heat transfer needs infinitely slow processes or infinitely large surfaces.
- With a gas, the net work is small compared with the gross work, so friction losses dominate.
- With steam, compressing a wet mixture is impractical; the Rankine cycle is used instead.
E: η_{Carnot} = 1 − T_{L} ÷ T_{H} :: temperatures in kelvin
X: The limit for a power station.
> Steam is supplied at about 800 K, and cooling water is at 300 K.
> T_{L} ÷ T_{H} = 300 ÷ 800 = 0.375.
> η_{Carnot} = 1 − 0.375 = 0.625, or 62.5%.
> Real steam plants reach around 35–45%, because heat is not all added at the top temperature and processes are irreversible.
K: The Carnot cycle of two isothermal and two isentropic processes is the most efficient engine possible between two temperatures, with η = 1 − T_{L} ÷ T_{H}; it is a benchmark, not a practical design.
!: Using degrees Celsius in the Carnot formula. With 527 °C and 27 °C, Celsius gives a wrong 95%; kelvin gives the correct 62.5%.
EV: established | The Carnot efficiency is the upper bound on heat-engine efficiency and defines the thermodynamic temperature scale.
T: Carnot cycle | A reversible cycle of two isothermal and two isentropic processes
T: Carnot efficiency | 1 − T_{L} ÷ T_{H}, the maximum possible engine efficiency
T: Thermodynamic temperature | An absolute scale defined from reversible heat ratios
SUM: Carnot has four reversible processes.
SUM: Its efficiency depends only on T_{H} and T_{L}.
SUM: Real engines fall well below it.
SRC: Rogers G. F. C. and Mayhew Y. R., Engineering Thermodynamics: Work and Heat Transfer, 4th edition, Longman | secondary | 1992
SRC: Çengel Y. A. and Boles M. A., Thermodynamics: An Engineering Approach, 9th edition, McGraw-Hill | secondary | 2019
Q: What are the two ways to raise the Carnot efficiency? | Raise the hot temperature or lower the cold temperature.
Q: Why is the Carnot cycle not built? | Isothermal heat transfer is impractically slow and friction losses would swamp the small net work.
M1#engineering-u06-09-q1@1: Which processes make up the Carnot cycle? | Two isothermal and two isentropic | Two isobaric and two isochoric | Four adiabatic processes | Two isobaric and two isentropic | Heat is exchanged only at constant temperature.
M2#engineering-u06-09-q2@2: How does the efficiency of a reversible engine compare with an irreversible one between the same reservoirs? | It is higher | It is lower | It is the same | It cannot be compared | The Carnot principles make the reversible engine the most efficient.
NUM2#engineering-u06-09-q3@2: What is the Carnot efficiency between 1000 K and 300 K, in per cent? | 70 | 0.5 | % | η = 1 − 300 ÷ 1000 = 1 − 0.3 = 0.70, or 70%.
M3#engineering-u06-09-q4@3: An inventor claims 55% efficiency between 600 K and 300 K. What do you conclude? | The claim is impossible, as the limit is 50% | The claim is plausible but optimistic | The claim is too low for these temperatures | The temperatures do not matter | Applying the standard result: η_{Carnot} = 1 − 300 ÷ 600 = 0.5.
SA2#engineering-u06-09-q5@2,3: Explain why real steam power stations achieve much lower efficiency than the Carnot limit for their peak temperature. | The Carnot limit assumes all heat is added at the top temperature and all processes are reversible. In real plants much of the heat is added while water warms below the peak temperature, lowering the average hot temperature, and friction, heat transfer across finite temperature differences and pump and turbine losses add irreversibility. | Heat added below peak ; Lower mean T_{H} ; Irreversibilities ; Gap from Carnot

## Entropy
LV: Year 1 · Advanced
S: Entropy turns the second law into numbers. This lesson defines entropy, applies the increase-of-entropy principle and uses T–s diagrams, where area represents heat.
O: Define entropy change for a reversible process
O: Apply the increase-of-entropy principle
O: Calculate entropy changes for phase change and ideal gases
PRE: The Carnot cycle
H: Defining entropy
P: Entropy S is a property defined by dS = δQ_{rev} ÷ T for a reversible process. Because it is a property, the entropy change between two states is the same however the process happens; for an irreversible process we calculate it along any reversible path between the same states. On a **T–s diagram**, the area under a reversible process line equals the heat transferred per kilogram.
H: The increase-of-entropy principle
- For an isolated system, ΔS ≥ 0: entropy can stay constant (reversible) or increase (irreversible), never decrease.
- **Entropy generation** S_{gen} measures irreversibility; it is zero only in ideal processes.
- A system's entropy can fall if heat leaves it, but the surroundings then gain more.
E: ΔS = Q ÷ T :: reversible heat transfer at constant T
E: Δs = c_{p} ln(T_{2} ÷ T_{1}) − R ln(p_{2} ÷ p_{1}) :: ideal gas
X: Heat flowing between two reservoirs.
> 100 kJ flows directly from a reservoir at 500 K to one at 300 K.
> Hot reservoir: ΔS = −100 ÷ 500 = −0.200 kJ/K.
> Cold reservoir: ΔS = +100 ÷ 300, about 0.333 kJ/K.
> Total S_{gen} is about 0.133 kJ/K, positive, so the process is irreversible, as expected.
X: Boiling water.
> 1 kg of water boils at 100 °C (373.15 K), absorbing 2257 kJ.
> ΔS = 2257 ÷ 373.15, about 6.05 kJ/K.
K: Entropy is a property with dS = δQ_{rev} ÷ T; the entropy of an isolated system never decreases, and entropy generation measures how far a real process falls short of the reversible ideal.
!: Thinking entropy can never decrease anywhere. A system that loses heat can lose entropy; only the total for an isolated system cannot fall.
EV: established | The increase-of-entropy principle is a general statement of the second law.
T: Entropy | A property defined by dS = δQ_{rev} ÷ T
T: Entropy generation | Entropy created by irreversibilities
T: Isentropic process | A process at constant entropy
SUM: Entropy is a property measured via reversible heat.
SUM: Isolated systems never lose entropy.
SUM: T–s areas represent heat.
SRC: Çengel Y. A. and Boles M. A., Thermodynamics: An Engineering Approach, 9th edition, McGraw-Hill | secondary | 2019
SRC: Rogers G. F. C. and Mayhew Y. R., Engineering Thermodynamics: Work and Heat Transfer, 4th edition, Longman | secondary | 1992
Q: What does an isentropic process mean? | A process at constant entropy, such as a reversible adiabatic one.
Q: What does the area under a reversible line on a T–s diagram represent? | The heat transferred per kilogram.
M1#engineering-u06-10-q1@1: For an isolated system, which is always true? | ΔS ≥ 0 | ΔS ≤ 0 | ΔS = 0 always | ΔS equals the work done | Entropy of an isolated system never decreases.
M2#engineering-u06-10-q2@2: Why can a system's entropy decrease? | Heat leaves it, while the surroundings gain more entropy | The second law does not apply to systems | Entropy is not a property | Work done on it always lowers entropy | Applying the standard result: Only the total must not fall.
NUM2#engineering-u06-10-q3@2: A reservoir at 400 K receives 1200 kJ of heat. What is its entropy change, in kJ/K? | 3 | 0.05 | kJ/K | ΔS = Q ÷ T = 1200 ÷ 400 = 3 kJ/K.
M3#engineering-u06-10-q4@3: Heat flows from a hot body to a cold body. Why is entropy generated? | The cold body gains more entropy than the hot body loses | The hot body gains entropy too | Energy is destroyed in the transfer | The process is perfectly reversible | Q ÷ T is larger at the lower temperature.
SA2#engineering-u06-10-q5@2,3: Explain how entropy generation shows that heat transfer across a finite temperature difference is irreversible. | The hot body loses entropy Q ÷ T_{H} and the cold body gains Q ÷ T_{L}. Because T_{L} is lower, the gain exceeds the loss, so total entropy rises and S_{gen} is positive. A reversible process would have zero entropy generation, so this transfer is irreversible. | Loss Q ÷ T_{H} ; Gain Q ÷ T_{L} ; Net increase ; Positive S_{gen}

## Isentropic efficiency
LV: Year 1 · Advanced
S: Real turbines and compressors fall short of the ideal reversible process. This lesson defines isentropic efficiency, uses the isentropic relation for ideal gases and finds actual outlet states.
O: Define isentropic efficiency for turbines and compressors
O: Apply T_{2s} ÷ T_{1} = (p_{2} ÷ p_{1})^{(γ−1)/γ}
O: Calculate actual outlet temperature or enthalpy
PRE: Entropy
H: The ideal comparison
P: The best an adiabatic turbine or compressor can do is to operate reversibly, which means at constant entropy. The **isentropic efficiency** compares the actual device with this ideal between the same inlet state and outlet pressure.
- **Turbine**: η_{t} = actual work ÷ isentropic work = (h_{1} − h_{2}) ÷ (h_{1} − h_{2s}).
- **Compressor**: η_{c} = isentropic work ÷ actual work = (h_{2s} − h_{1}) ÷ (h_{2} − h_{1}).
- Typical values: large steam and gas turbines 85–92%; compressors 80–90%.
H: Finding the outlet state
E: T_{2s} ÷ T_{1} = (p_{2} ÷ p_{1})^{(γ−1)/γ} :: ideal gas, isentropic
X: An air compressor.
> Air enters at 300 K and is compressed through a pressure ratio of 8, with γ = 1.4.
> (γ − 1) ÷ γ = 0.2857, and 8^{0.2857} is about 1.811.
> T_{2s} is about 300 × 1.811, or 543.4 K: an ideal rise of 243.4 K.
> With η_{c} = 0.85, the actual rise is 243.4 ÷ 0.85, about 286.4 K, so T_{2} is about 586.4 K.
X: A steam turbine.
> h_{1} = 3400 kJ/kg and the isentropic outlet h_{2s} = 2400 kJ/kg.
> With η_{t} = 0.85, the actual drop is 0.85 × 1000 = 850 kJ/kg, so h_{2} = 2550 kJ/kg.
K: Isentropic efficiency measures how close an adiabatic turbine or compressor comes to the ideal constant-entropy process; turbines deliver less work and compressors need more than the ideal, with outlet states found from the efficiency.
!: Inverting the compressor formula. For a compressor the isentropic work is on top, because the actual work is larger.
EV: established | Isentropic efficiency is the standard performance measure for adiabatic turbomachines.
T: Isentropic efficiency | Ratio of actual to ideal performance of an adiabatic device
T: Pressure ratio | Outlet pressure divided by inlet pressure
T: Isentropic outlet state | The outlet state if the process were reversible and adiabatic
SUM: Turbines: actual ÷ ideal work.
SUM: Compressors: ideal ÷ actual work.
SUM: Losses raise compressor outlet temperature.
SRC: Eastop T. D. and McConkey A., Applied Thermodynamics for Engineering Technologists, 5th edition, Longman | secondary | 1993
SRC: Saravanamuttoo H. I. H. et al., Gas Turbine Theory, 7th edition, Pearson | secondary | 2017
Q: Why is the actual compressor outlet hotter than the isentropic one? | Friction and other losses add entropy and require extra work, raising the temperature.
Q: What is the isentropic efficiency of a perfect turbine? | 100%.
M1#engineering-u06-11-q1@1: How is turbine isentropic efficiency defined? | Actual work divided by isentropic work | Isentropic work divided by actual work | Heat out divided by heat in | Outlet over inlet temperature | Real turbines deliver less than the ideal.
M2#engineering-u06-11-q2@2: Compared with the ideal, a real adiabatic compressor needs: | More work and gives a hotter outlet | Less work and gives a cooler outlet | The same work but a hotter outlet | More work and gives a cooler outlet | Losses increase work and outlet temperature.
NUM2#engineering-u06-11-q3@2: Air enters a compressor at 300 K, the isentropic outlet is 540 K and η_{c} = 0.80. What is the actual outlet temperature, in K? | 600 | 1 | K | ΔT = 240 ÷ 0.80 = 300 K, so T_{2} = 300 + 300 = 600 K.
M3#engineering-u06-11-q4@3: A turbine's isentropic enthalpy drop is 500 kJ/kg and η_{t} = 0.9. What is the actual drop? | 450 kJ/kg | 556 kJ/kg | 500 kJ/kg | 90 kJ/kg | Applying the standard result: Actual drop = 0.9 × 500.
SA2#engineering-u06-11-q5@2,3: Explain why the compressor efficiency has the isentropic work on top while the turbine efficiency has it on the bottom. | Efficiency must be below one for a real device. A turbine produces less work than the ideal, so actual ÷ isentropic is less than one. A compressor needs more work than the ideal, so isentropic ÷ actual is less than one. Each definition compares the useful outcome with what it costs. | Efficiency below one ; Turbine gives less ; Compressor needs more ; Ratio orientation

## The Rankine cycle
LV: Year 1 · Advanced
S: Most of the world's electricity from coal, nuclear, biomass and concentrated solar plants comes from the Rankine steam cycle. This lesson analyses its four components and the main ways to raise its efficiency.
O: Describe the four processes of the ideal Rankine cycle
O: Calculate net work, heat input and cycle efficiency
O: Explain superheating, reheating and regeneration
PRE: Isentropic efficiency
H: The four components
- **1–2 Pump**: saturated liquid from the condenser is pumped to boiler pressure. The work is small because liquid has a small specific volume.
- **2–3 Boiler**: heat is added at constant pressure, raising the water to superheated steam.
- **3–4 Turbine**: steam expands, ideally isentropically, producing work.
- **4–1 Condenser**: wet steam is condensed at constant low pressure, rejecting heat to cooling water.
H: Improving efficiency
- **Lower condenser pressure**: lowers the temperature of heat rejection.
- **Superheating**: raises the mean temperature of heat addition and keeps turbine exhaust drier.
- **Reheating**: steam is returned to the boiler partway through expansion, limiting moisture in the final turbine stages.
- **Regenerative feedwater heating**: steam bled from the turbine preheats the feedwater, so less heat is added at low temperature.
E: η = (W_{turbine} − W_{pump}) ÷ Q_{in} :: Rankine cycle efficiency
X: A simple Rankine cycle.
> Pump inlet h_{1} = 191.8 kJ/kg; pump work 4 kJ/kg, so h_{2} = 195.8 kJ/kg.
> Turbine inlet h_{3} = 3375 kJ/kg; turbine exit h_{4} = 2200 kJ/kg, so W_{turbine} = 1175 kJ/kg.
> W_{net} = 1175 − 4 = 1171 kJ/kg; Q_{in} = 3375 − 195.8 = 3179.2 kJ/kg.
> η = 1171 ÷ 3179.2, about 0.368, or 36.8%.
> The back work ratio is only 4 ÷ 1175, about 0.3%, far below that of gas cycles.
K: The Rankine cycle pumps liquid, boils it, expands the steam through a turbine and condenses it; small pump work gives it a favourable back work ratio, and superheat, reheat, regeneration and low condenser pressure raise its efficiency.
!: Ignoring turbine exit moisture. A dryness fraction much below about 0.88 erodes turbine blades, which is why superheat and reheat are used.
EV: established | Modern supercritical steam plants reach efficiencies of around 45% on a higher heating value basis.
T: Rankine cycle | The ideal vapour power cycle of pump, boiler, turbine and condenser
T: Back work ratio | Pump or compressor work divided by turbine work
T: Regeneration | Preheating feedwater with steam bled from the turbine
SUM: Pump, boiler, turbine, condenser.
SUM: Pump work is very small.
SUM: Superheat, reheat and regeneration raise efficiency.
SRC: Rogers G. F. C. and Mayhew Y. R., Engineering Thermodynamics: Work and Heat Transfer, 4th edition, Longman | secondary | 1992
SRC: Çengel Y. A. and Boles M. A., Thermodynamics: An Engineering Approach, 9th edition, McGraw-Hill | secondary | 2019
Q: Why is pump work small in a Rankine cycle? | Liquid water has a very small specific volume, so ∫ v dp is small.
Q: What does reheating achieve? | It limits moisture in the later turbine stages and can raise efficiency.
M1#engineering-u06-12-q1@1: In which component is heat rejected in a Rankine cycle? | The condenser | The boiler | The turbine | The feed pump | The condenser transfers heat to cooling water.
M2#engineering-u06-12-q2@2: Why is superheating used? | It raises mean heat-addition temperature and keeps exhaust drier | It reduces the pump work to zero | It increases the condenser pressure | It allows the turbine to run on liquid water | Applying the standard result: Both efficiency and blade life benefit.
NUM2#engineering-u06-12-q3@2: A Rankine cycle has turbine work 1000 kJ/kg, pump work 10 kJ/kg and heat input 2750 kJ/kg. What is its efficiency, in per cent? | 36 | 0.5 | % | η = (1000 − 10) ÷ 2750 = 990 ÷ 2750 = 0.36, or 36%.
M3#engineering-u06-12-q4@3: Lowering condenser pressure raises efficiency. What limits how low it can go? | The temperature of the available cooling water | The maximum boiler temperature | The pump's power rating | The steam's critical pressure | Condensing temperature cannot fall below the coolant temperature.
SA2#engineering-u06-12-q5@2,3: Explain how regenerative feedwater heating improves Rankine cycle efficiency. | Without regeneration, cold feedwater is heated in the boiler from a low temperature, lowering the mean temperature of heat addition. Bleeding steam from the turbine to preheat the feedwater means the boiler adds heat at a higher average temperature, so, as the Carnot principle suggests, efficiency rises even though the bled steam does less turbine work. | Cold feedwater ; Bled steam ; Higher mean T of heat addition ; Efficiency rises

## Gas power cycles: Otto, Diesel and Brayton
LV: Year 1 · Advanced
S: Petrol engines, diesel engines and gas turbines are modelled with air-standard cycles. This lesson analyses the Otto, Diesel and Brayton cycles and how compression or pressure ratio controls their efficiency.
O: Describe the Otto, Diesel and Brayton cycles
O: Calculate air-standard efficiencies
O: Compare the cycles and their applications
PRE: Isentropic efficiency
H: Air-standard assumptions
P: The working fluid is treated as air, an ideal gas with constant specific heats; combustion is replaced by heat addition and exhaust by heat rejection, and all processes are internally reversible. The results overstate real efficiency but show the trends correctly.
H: The cycles
- **Otto (spark ignition)**: isentropic compression, constant-volume heat addition, isentropic expansion, constant-volume heat rejection. η = 1 − 1 ÷ r^{γ−1}, where r is the compression ratio.
- **Diesel (compression ignition)**: as Otto, but heat is added at constant pressure. For the same r it is less efficient than Otto, but diesels run at higher r (about 15–22) because only air is compressed, so there is no knock.
- **Brayton (gas turbine)**: isentropic compression, constant-pressure heat addition, isentropic expansion, constant-pressure heat rejection. η = 1 − 1 ÷ r_{p}^{(γ−1)/γ}, where r_{p} is the pressure ratio. Its back work ratio is high, often 40–60%.
E: η_{Otto} = 1 − 1 ÷ r^{γ−1} :: air-standard Otto
E: η_{Brayton} = 1 − 1 ÷ r_{p}^{(γ−1)/γ} :: air-standard Brayton
X: Otto and Brayton efficiencies.
> Otto with r = 9 and γ = 1.4: 9^{0.4} is about 2.408.
> η = 1 − 1 ÷ 2.408 = 1 − 0.415 = 0.585, or 58.5%.
> Brayton with r_{p} = 8: 8^{0.2857} is about 1.811.
> η = 1 − 1 ÷ 1.811 = 1 − 0.552 = 0.448, or 44.8%.
> Real engines achieve much less, roughly 25–40%, because of friction, heat loss and non-ideal combustion.
K: The Otto, Diesel and Brayton cycles model spark-ignition engines, compression-ignition engines and gas turbines; efficiency rises with compression or pressure ratio, and the gas turbine's large compressor work makes component efficiency critical.
!: Concluding that the Diesel cycle is always less efficient than Otto. That is true only at equal compression ratio; diesels run at much higher ratios.
EV: established | Combined-cycle plants pairing a Brayton gas turbine with a Rankine steam cycle exceed 60% efficiency.
T: Compression ratio | Maximum cylinder volume divided by minimum volume
T: Air-standard cycle | An idealised cycle using air as an ideal gas
T: Brayton cycle | The ideal gas-turbine cycle with constant-pressure heat exchange
SUM: Otto adds heat at constant volume.
SUM: Diesel adds heat at constant pressure.
SUM: Brayton is the gas-turbine cycle.
SRC: Heywood J. B., Internal Combustion Engine Fundamentals, 2nd edition, McGraw-Hill | secondary | 2018
SRC: Saravanamuttoo H. I. H. et al., Gas Turbine Theory, 7th edition, Pearson | secondary | 2017
Q: Why can diesel engines use higher compression ratios than petrol engines? | They compress only air, so there is no fuel to knock.
Q: Why is component efficiency critical in gas turbines? | The compressor absorbs a large fraction of the turbine work.
M1#engineering-u06-13-q1@1: In the Otto cycle, how is heat added? | At constant volume | At constant pressure | At constant temperature | At constant entropy | Spark ignition is modelled as rapid heat addition.
M2#engineering-u06-13-q2@2: What mainly sets air-standard Otto efficiency? | The compression ratio | The engine speed | The fuel's heating value | The cylinder bore | Applying the standard result: η = 1 − 1 ÷ r^{γ−1}.
NUM2#engineering-u06-13-q3@2: What is the air-standard Otto efficiency for r = 8 and γ = 1.4, given 8^{0.4} = 2.297, in per cent? | 56.5 | 0.5 | % | η = 1 − 1 ÷ 2.297 = 1 − 0.435 = 0.565, or 56.5%.
M3#engineering-u06-13-q4@3: At the same compression ratio, how does Diesel efficiency compare with Otto? | Lower, because heat is added at constant pressure | Higher, because diesel fuel has more energy | Exactly the same, since both are air-standard | Higher, because there is no throttle loss | Constant-pressure addition lowers mean temperature.
SA2#engineering-u06-13-q5@2,3: Explain why a gas turbine's back work ratio makes it sensitive to compressor and turbine efficiency. | In a Brayton cycle the compressor may absorb 40–60% of the turbine's gross work. Net work is the small difference between two large quantities, so a few per cent loss in either machine reduces the net output by a much larger proportion, and very poor components could give no net output at all. | High back work ratio ; Net work a small difference ; Losses amplified ; Need efficient components

## Refrigeration and heat pumps
LV: Year 1 · Advanced
S: Refrigerators and heat pumps use work to move heat from cold to hot. This lesson analyses the vapour-compression cycle, defines coefficients of performance and considers refrigerant choice.
O: Describe the vapour-compression refrigeration cycle
O: Calculate COP for refrigerators and heat pumps
O: Compare actual and Carnot COP
PRE: The second law and heat engines
H: The vapour-compression cycle
- **Compressor**: low-pressure vapour is compressed to high pressure and temperature.
- **Condenser**: the refrigerant rejects heat Q_{H} and condenses.
- **Expansion valve**: liquid is throttled at constant enthalpy to low pressure, becoming a cold wet mixture.
- **Evaporator**: it absorbs heat Q_{L} from the cold space and evaporates.
H: Coefficients of performance
P: A refrigerator's useful effect is Q_{L}, so **COP_{R} = Q_{L} ÷ W**. A heat pump's useful effect is Q_{H}, so **COP_{HP} = Q_{H} ÷ W**. Because Q_{H} = Q_{L} + W, COP_{HP} = COP_{R} + 1. COPs are normally greater than one; this does not break any law, because the device moves heat rather than creating it.
H: Refrigerants
P: Older CFCs damaged the ozone layer and were phased out under the Montreal Protocol. Many HFCs have high global warming potential and are being phased down; low-GWP options include ammonia, carbon dioxide, hydrocarbons such as propane, and HFOs.
E: COP_{R} = Q_{L} ÷ W :: refrigerator
E: COP_{HP,Carnot} = T_{H} ÷ (T_{H} − T_{L}) :: reversible heat pump
X: A domestic heat pump.
> An air-source heat pump delivers 8 kW of heat using 2.5 kW of electricity.
> COP_{HP} = 8 ÷ 2.5 = 3.2.
> It extracts 8 − 2.5 = 5.5 kW from the outside air.
> Carnot limit for 268 K outside and 318 K flow: 318 ÷ 50, about 6.4.
K: A vapour-compression cycle uses compressor work to move heat from a cold evaporator to a hot condenser; refrigerator and heat pump COPs measure useful heat per unit work, are usually above one, and fall as the temperature lift increases.
!: Thinking a COP above 1 is impossible. A heat pump moves existing heat rather than converting work into heat, so more heat arrives than the work supplied.
EV: established | Heat pump COP falls as the temperature difference between source and sink grows.
T: Coefficient of performance | Useful heat transferred divided by work input
T: Evaporator | The heat exchanger where refrigerant absorbs heat and boils
T: Global warming potential | A refrigerant's warming effect relative to carbon dioxide
SUM: Work moves heat from cold to hot.
SUM: COP_{HP} = COP_{R} + 1.
SUM: Smaller temperature lifts give higher COP.
SRC: Çengel Y. A. and Boles M. A., Thermodynamics: An Engineering Approach, 9th edition, McGraw-Hill | secondary | 2019
SRC: Eastop T. D. and McConkey A., Applied Thermodynamics for Engineering Technologists, 5th edition, Longman | secondary | 1993
Q: Why does heat pump COP fall in very cold weather? | The temperature lift between the outside air and the heating flow increases.
Q: What happens to the refrigerant in the expansion valve? | It is throttled at constant enthalpy to low pressure and temperature.
M1#engineering-u06-14-q1@1: Where does the refrigerant absorb heat from the cold space? | In the evaporator | In the condenser | In the compressor | In the expansion valve | The evaporator boils refrigerant using heat from the space.
M2#engineering-u06-14-q2@2: How are COP_{HP} and COP_{R} related for the same cycle? | COP_{HP} = COP_{R} + 1 | COP_{HP} = COP_{R} − 1 | COP_{HP} = 1 ÷ COP_{R} | They are always equal | Applying the standard result: Q_{H} = Q_{L} + W.
NUM2#engineering-u06-14-q3@2: A fridge removes 300 W from its interior using a 100 W compressor. What is its COP? | 3 | 0.05 | COP | COP_{R} = Q_{L} ÷ W = 300 ÷ 100 = 3.
M3#engineering-u06-14-q4@3: Why do underfloor heating systems suit heat pumps better than high-temperature radiators? | The lower flow temperature reduces the lift and raises COP | Underfloor pipes need no electricity at all | Radiators cannot be used with any heat pump | Underfloor systems increase the outdoor temperature | COP depends on the temperature difference.
SA2#engineering-u06-14-q5@2,3: Explain why a heat pump can deliver more heat than the electrical energy it uses without breaking the first law. | The heat delivered equals the work input plus heat extracted from the cold source, such as outside air: Q_{H} = Q_{L} + W. The heat pump moves existing energy rather than creating it, so energy is conserved and a COP above one is entirely consistent with the first law. | Q_{H} = Q_{L} + W ; Extracts ambient heat ; Moves rather than creates ; Energy conserved

## Heat transfer by conduction
LV: Year 1 · Intermediate
S: Thermodynamics says how much heat flows; heat transfer says how fast. This lesson applies Fourier's law, thermal resistance and U-values to walls and composite layers.
O: Apply Fourier's law to plane walls
O: Combine layers using thermal resistances in series
O: Interpret U-values for building elements
PRE: Energy, work and heat
H: Fourier's law
P: Conduction is heat transfer through a material by molecular and electronic interaction. For steady one-dimensional conduction through a plane wall, **Q̇ = k A ΔT ÷ L**, where k is the thermal conductivity, A the area, ΔT the temperature difference across the wall and L its thickness. Copper has k of about 400 W/(m K), brick about 0.7 and mineral wool about 0.04.
H: Thermal resistance
- The resistance of a layer is **R = L ÷ (k A)**, in K/W, so Q̇ = ΔT ÷ R, like Ohm's law.
- Layers in series add: R_{total} = R_{1} + R_{2} + …
- Surface (convective) resistances 1 ÷ (h A) are added in the same way.
- The **U-value** is the overall heat transfer coefficient per unit area, U = 1 ÷ (R_{total} A), in W/(m^{2} K).
E: Q̇ = k A ΔT ÷ L :: Fourier's law, plane wall
E: R = L ÷ (k A) :: conduction resistance
X: Heat loss through a brick wall.
> Brick wall: k = 0.7 W/(m K), A = 10 m^{2}, L = 0.2 m, ΔT = 20 K.
> Q̇ = 0.7 × 10 × 20 ÷ 0.2 = 700 W.
> Adding 0.1 m of mineral wool (k = 0.04) adds R = 0.1 ÷ (0.04 × 10) = 0.25 K/W.
> The brick's R is 0.2 ÷ (0.7 × 10), about 0.029 K/W, so the total is about 0.279 K/W and the loss falls to about 72 W.
K: Steady conduction follows Fourier's law; treating each layer as a thermal resistance L ÷ kA lets layers be added in series, and a thin layer of a low-conductivity insulant can dominate the total resistance.
!: Adding conductivities instead of resistances for layers in series. Resistances add; conductivities do not.
EV: established | Fourier's law accurately describes conduction in solids at engineering scales.
T: Thermal conductivity | A material's ability to conduct heat, in W/(m K)
T: Thermal resistance | Temperature difference per unit heat flow, in K/W
T: U-value | Overall heat transfer coefficient, in W/(m^{2} K)
SUM: Q̇ = k A ΔT ÷ L.
SUM: Series resistances add.
SUM: Insulation dominates total resistance.
SRC: Incropera F. P., DeWitt D. P., Bergman T. L. and Lavine A. S., Fundamentals of Heat and Mass Transfer, 7th edition, Wiley | secondary | 2011
SRC: Rogers G. F. C. and Mayhew Y. R., Engineering Thermodynamics: Work and Heat Transfer, 4th edition, Longman | secondary | 1992
Q: Why does insulation work so well in a wall? | Its very low conductivity gives a large thermal resistance, which dominates the series total.
Q: What does a lower U-value mean? | Less heat loss per square metre per kelvin.
M1#engineering-u06-15-q1@1: What does Fourier's law relate? | Conductive heat flow to the temperature gradient | Radiant heat to the fourth power of temperature | Convective heat to fluid velocity alone | Work to change in internal energy | Conduction is driven by the temperature gradient.
M2#engineering-u06-15-q2@2: How do the resistances of layers in series combine? | They add together | Their reciprocals add | Only the largest one counts | They multiply together | Series thermal resistances add like electrical ones.
NUM2#engineering-u06-15-q3@2: A steel plate with k = 50 W/(m K), area 0.5 m^{2} and thickness 0.01 m has a 2 K temperature difference across it. What is the heat flow, in W? | 5000 | 10 | W | Q̇ = 50 × 0.5 × 2 ÷ 0.01 = 5000 W.
M3#engineering-u06-15-q4@3: Doubling the thickness of a single-layer wall has what effect on steady heat loss? | It halves it | It doubles it | It quarters it | It has no effect | Applying the standard result: Q̇ is inversely proportional to L.
SA2#engineering-u06-15-q5@2,3: Explain why adding a thin insulating layer can cut a wall's heat loss far more than adding the same thickness of brick. | Thermal resistance is L ÷ kA. Mineral wool has a conductivity around twenty times lower than brick, so the same thickness gives about twenty times the resistance. Since resistances add in series and heat flow is ΔT divided by the total, the insulation dominates and the heat loss falls sharply. | R = L ÷ kA ; Much lower k ; Series addition ; Dominant resistance

## Convection and radiation
LV: Year 1 · Intermediate
S: Heat also leaves surfaces by convection to fluids and by radiation. This lesson applies Newton's law of cooling and the Stefan–Boltzmann law, and shows how the mechanisms combine.
O: Apply Newton's law of cooling
O: Calculate radiative heat exchange with the Stefan–Boltzmann law
O: Distinguish natural and forced convection
PRE: Heat transfer by conduction
H: Convection
P: Convection transfers heat between a surface and a moving fluid. **Newton's law of cooling** gives Q̇ = h A (T_{s} − T_{∞}), where h is the heat transfer coefficient. In **natural convection** the flow is driven by buoyancy, and h is typically 2–25 W/(m^{2} K) for gases. In **forced convection** a fan or pump drives the flow, and h for gases is typically 25–250 W/(m^{2} K). Boiling and condensation give much higher values.
H: Radiation
- All surfaces emit electromagnetic radiation; no medium is needed.
- A black body emits σT^{4} per unit area, with σ = 5.67 × 10^{-8} W/(m^{2} K^{4}).
- A real (grey) surface emits εσT^{4}, where ε is its emissivity between 0 and 1.
- A small surface in large surroundings exchanges Q̇ = ε σ A (T_{s}^{4} − T_{sur}^{4}), with temperatures in kelvin.
E: Q̇ = h A ΔT :: Newton's law of cooling
E: Q̇ = ε σ A (T_{s}^{4} − T_{sur}^{4}) :: radiation exchange
X: A hot surface losing heat.
> Convection: h = 25 W/(m^{2} K), A = 2 m^{2}, ΔT = 40 K, so Q̇ = 25 × 2 × 40 = 2000 W.
> Radiation: ε = 0.9, A = 1 m^{2}, T_{s} = 400 K, T_{sur} = 300 K.
> 400^{4} − 300^{4} is about 1.75 × 10^{10} K^{4}.
> Q̇ is about 0.9 × 5.67 × 10^{-8} × 1.75 × 10^{10}, which is about 893 W.
> At high temperatures, radiation grows rapidly because of the fourth-power law.
K: Convection follows Q̇ = hAΔT, with h much higher for forced flow; radiation follows εσA(T_{s}^{4} − T_{sur}^{4}) and needs no medium, dominating at high temperatures.
!: Using Celsius in the radiation equation. The fourth-power law requires absolute temperatures in kelvin.
EV: established | The Stefan–Boltzmann law is exact for black bodies; real surfaces are approximated using emissivity.
T: Heat transfer coefficient | h in Q̇ = hAΔT, in W/(m^{2} K)
T: Emissivity | The ratio of a surface's emission to that of a black body
T: Forced convection | Convection driven by a fan, pump or external flow
SUM: Convection: Q̇ = hAΔT.
SUM: Radiation: εσA(T^{4} − T_{sur}^{4}).
SUM: Radiation dominates at high temperature.
SRC: Incropera F. P., DeWitt D. P., Bergman T. L. and Lavine A. S., Fundamentals of Heat and Mass Transfer, 7th edition, Wiley | secondary | 2011
SRC: Çengel Y. A. and Ghajar A. J., Heat and Mass Transfer: Fundamentals and Applications, 6th edition, McGraw-Hill | secondary | 2020
Q: Why does a fan cool you faster than still air? | Forced convection gives a much higher heat transfer coefficient.
Q: Why is a vacuum flask silvered? | Low emissivity surfaces reduce radiative heat transfer across the vacuum.
M1#engineering-u06-16-q1@1: Which mechanism can transfer heat through a vacuum? | Radiation | Conduction | Natural convection | Forced convection | Applying the standard result: Radiation needs no medium.
M2#engineering-u06-16-q2@2: How does black-body emission vary with absolute temperature? | With the fourth power of temperature | Linearly with temperature | With the square of temperature | With the square root of temperature | Applying the standard result: Stefan–Boltzmann: σT^{4}.
NUM2#engineering-u06-16-q3@2: A surface at 60 °C is cooled by air at 30 °C with h = 10 W/(m^{2} K) over 3 m^{2}. What is the convective heat loss, in W? | 900 | 5 | W | Q̇ = hAΔT = 10 × 3 × 30 = 900 W.
M3#engineering-u06-16-q4@3: Doubling a radiator's absolute temperature, with cold surroundings, multiplies its emission by about: | 16 | 2 | 4 | 8 | Applying the standard result: 2^{4} = 16.
SA2#engineering-u06-16-q5@2,3: Compare natural and forced convection and explain which gives higher heat transfer. | In natural convection, fluid moves only because heated fluid becomes less dense and rises, so velocities and heat transfer coefficients are low. In forced convection a fan or pump drives the fluid faster, thinning the boundary layer near the surface and giving much higher heat transfer coefficients, so forced convection transfers more heat for the same temperature difference. | Buoyancy-driven flow ; Fan or pump driven ; Thinner boundary layer ; Higher h
`;
