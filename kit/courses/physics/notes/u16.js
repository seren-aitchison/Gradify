// Unit 16: Electric Circuits. Format: kit/course/notes.js
export default `
## Electric current
S: Electric current is the rate of flow of charge. In metals it's carried by electrons drifting slowly through the lattice; in electrolytes and plasmas, ions carry it too.
O: Define current and use I = ΔQ/Δt
O: Use I = nAvq to calculate drift velocity
O: Explain why a lamp lights at once although electrons drift slowly
PRE: Electric charge
LV: GCSE and A level · Foundation
H: Definitions
E: I = dQ/dt (amperes, 1 A = 1 C s^{-1})
E: I = nAv_{d}q :: n = carrier density, v_{d} = drift velocity
E: J = I/A = nqv_{d} :: current density
- Conventional current flows from + to −; electrons move the opposite way.
H: Drift velocity
P: Electrons in copper (n ≈ 8.5 × 10^{28} m^{-3}) carrying 1 A through a 1 mm^{2} wire drift at only ~0.07 mm s^{-1}. Yet a lamp lights at once because the electric field (the signal) travels along the wire at a large fraction of the speed of light, setting electrons everywhere moving almost together.
X: How many electrons pass a point per second for 2 A?
> N = I/e = 2/1.6 × 10^{-19} = 1.25 × 10^{19} per second
K: Current is the same at every point in a series loop: charge is neither created nor destroyed as it flows.
!: Current isn't "used up" in a component; the same current enters and leaves. Energy is what's transferred.
T: Current | The rate of flow of charge past a point, I = ΔQ/Δt, in amperes
T: Drift velocity | The small average velocity of charge carriers along a conductor, superimposed on their random motion
SUM: I = ΔQ/Δt; 1 A is 1 C per second.
SUM: I = nAvq: carriers drift slowly, but the field that drives them sets up almost instantly.
EV: established | The free-electron picture of conduction and I = nAvq are standard and agree with Hall-effect measurements of n.
SRC: OpenStax, University Physics Volume 2, section 9.1 "Electrical Current" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/9-1-electrical-current
SRC: AQA, A-level Physics specification (7408), section 3.5.1.1 Basics of electricity | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: Define current. | The rate of flow of charge, I = dQ/dt.
Q: Why does a lamp light immediately when drift speeds are so slow? | The electric field propagates at near the speed of light, starting electrons moving everywhere at once.
M1@1: 3 A for 2 minutes transfers: | 360 C | 6 C | 1.5 C | 180 C | Q = It = 3 A × 120 s = 360 C; using 2 s instead of 120 s gives the 6 C distractor.
M2@2: Halving a wire's cross-section at the same current makes the drift speed: | Double | Half | Unchanged | Four times | v_{d} = I/(nAq): with I, n and q fixed, halving A doubles the drift speed.
M3@2: A copper wire (n = 8.5 × 10^{28} m^{-3}) of area 2.0 mm^{2} carries 3.4 A. The drift speed is about: | 0.13 mm s^{-1} | 1.3 m s^{-1} | 13 mm s^{-1} | 3 × 10^{8} m s^{-1} | v = I/(nAe) = 3.4/(8.5 × 10^{28} × 2.0 × 10^{-6} × 1.6 × 10^{-19}) = 1.25 × 10^{-4} m s^{-1}.
NUM1@1: A charge of 45 C flows through a lamp in 15 s. What is the current, in A? | 3.0 | 1% | A | I = Q/t = 45/15 = 3.0 A.
SA2@3: Explain why a light comes on almost instantly when switched on, although electrons drift at less than a millimetre per second. | The wire is already full of free electrons. Closing the switch sets up an electric field along the whole circuit, and that change travels at a large fraction of the speed of light. Electrons everywhere, including those in the filament, start drifting almost at once, so energy is transferred immediately; no electron needs to travel from the switch to the lamp. | Wire already full of free electrons ; Field travels at near light speed ; All electrons start drifting together

## Resistance and resistivity
S: Resistance measures how much a component opposes current: the voltage needed per ampere. Resistivity is the material property behind it, independent of shape and size.
O: Define resistance and resistivity and use R = ρL/A
O: Describe how resistance of metals and thermistors changes with temperature
O: Explain resistance using a microscopic model of electron scattering
PRE: Electric current
LV: GCSE and A level · Application
H: Definitions
E: R = V/I (ohms)
E: R = ρL/A :: resistivity ρ (Ω m)
- Copper 1.7 × 10^{-8} Ω m; nichrome 1.1 × 10^{-6}; silicon ~10^{3}; glass ~10^{12}.
H: Temperature dependence
E: R = R_{0}(1 + αΔT) :: metals (α ≈ 0.004 K^{-1} for copper)
- Metals: resistance rises with T (more lattice vibrations scatter electrons).
- Semiconductors and NTC thermistors: resistance falls with T (more carriers freed).
- Superconductors: zero resistivity below a critical temperature T_{c}.
H: Microscopic picture
P: Electrons accelerate in the field, then scatter off vibrating ions and defects about every 10^{-14} s. Drude's model gives ρ = m/(ne^{2}τ). Impurities cause residual resistivity even near absolute zero (Matthiessen's rule).
X: Resistance of 10 m of copper wire, 0.5 mm diameter?
> A = π(0.25 × 10^{-3})^{2} = 1.96 × 10^{-7} m^{2}
> R = 1.7 × 10^{-8} × 10/1.96 × 10^{-7} = 0.87 Ω
K: Measure resistivity by plotting R against L for one wire: the gradient is ρ/A, so ρ = gradient × A, with A from a micrometer reading of diameter.
!: Resistance depends on shape; resistivity doesn't. Stretching a wire to twice its length (same volume) quadruples its resistance.
T: Resistance | The ratio of potential difference across a component to the current through it, R = V/I
T: Resistivity | The material property ρ = RA/L, the resistance of a unit cube of the material
SUM: R = ρL/A; resistivity depends on the material and temperature only.
SUM: Metals' resistance rises with temperature; NTC thermistors' falls.
EV: established | R = ρL/A and the temperature behaviour of metals and semiconductors are well established experimentally.
SRC: OpenStax, University Physics Volume 2, section 9.3 "Resistivity and Resistance" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/9-3-resistivity-and-resistance
SRC: AQA, A-level Physics specification (7408), section 3.5.1.3 Resistivity | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: How does resistance depend on a wire's length and area? | R = ρL/A.
Q: Why does metal resistance rise with temperature? | Increased lattice vibrations scatter electrons more often.
M1@1: Doubling a wire's diameter changes its resistance by: | ×1/4 | ×1/2 | ×2 | ×4 | A ∝ d^{2}, so doubling d makes the area four times larger and R = ρL/A four times smaller.
M2@1: A wire stretched to twice its length (constant volume) has resistance: | 4R | 2R | R/2 | R | L doubles and, with volume fixed, A halves; R = ρL/A therefore rises by 2 × 2 = 4.
M3@2: An NTC thermistor and a copper wire are both warmed from 20 °C to 60 °C. Which is correct? | The thermistor's resistance falls; the wire's rises | Both resistances rise | Both resistances fall | The thermistor's rises; the wire's falls | Heating frees more charge carriers in the semiconductor thermistor, while in copper the carrier number is fixed and extra lattice vibration increases scattering.
NUM2@1: A 2.0 m length of wire of cross-section 5.0 × 10^{-7} m^{2} has resistance 4.4 Ω. Find its resistivity, in units of 10^{-6} Ω m. | 1.1 | 2% | × 10^{-6} Ω m | ρ = RA/L = 4.4 × 5.0 × 10^{-7}/2.0 = 1.1 × 10^{-6} Ω m, the value for nichrome.
SA2@1: Describe how to determine the resistivity of a metal wire in the laboratory, including how the data are analysed. | Measure the wire's diameter at several points with a micrometer and calculate the mean area A = πd^{2}/4. Pass a small current and use an ammeter and voltmeter to find R = V/I for several lengths L, keeping the current low so the wire doesn't heat. Plot R against L: the gradient is ρ/A, so ρ = gradient × A. | Micrometer, several readings, A = πd^{2}/4 ; R = V/I for several lengths, small current ; Gradient of R–L graph × A gives ρ

## Ohm's law
S: Ohm's law states that the current through a conductor is proportional to the voltage across it, at constant temperature. It holds for metals and resistors, but many components (diodes, lamps) are non-ohmic.
O: State Ohm's law and distinguish it from the definition R = V/I
O: Sketch and explain I–V characteristics of a resistor, filament lamp and diode
O: Use V = IR in calculations
PRE: Resistance and resistivity
LV: GCSE and A level · Foundation
H: The law
E: V = IR, with R constant
E: J = σE :: microscopic form
H: I–V characteristics
- **Ohmic resistor**: straight line through the origin.
- **Filament lamp**: curve flattening at higher V (gets hotter, R rises).
- **Diode**: tiny current in reverse; conducts above ~0.6 V forward (silicon).
- **Thermistor (NTC)**: curve bending upward (warms, R falls). **LDR**: R falls as light intensity rises.
H: Measuring R
P: Measure V across and I through the component at several values, and plot I against V. For an ohmic conductor the line is straight and R = V/I is the same at every point. For low resistances, four-wire (Kelvin) measurement removes lead resistance.
X: A resistor has 4.5 V across it and 0.30 A through it. R? What current at 9.0 V?
> R = V/I = 4.5/0.30 = 15 Ω
> I = 9.0/15 = 0.60 A
K: Ohm's law is not a universal law: it is the observation that some materials keep R constant under constant physical conditions.
!: V = IR defines resistance for any component at a point; Ohm's law is the claim that R stays constant.
P: **Investigate with the lab.** Set up a single resistor and change the voltage, recording the current each time. Check that V/I stays constant.
IX: circuits
T: Ohmic conductor | A conductor whose current is proportional to the voltage across it at constant temperature
T: I–V characteristic | A graph of current against potential difference for a component
SUM: Ohm's law: I ∝ V under constant physical conditions.
SUM: Lamps, diodes and thermistors are non-ohmic: their R changes with V.
EV: established | Ohm's law holds accurately for metals at constant temperature and fails for many devices.
SRC: OpenStax, University Physics Volume 2, section 9.4 "Ohm's Law" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/9-4-ohms-law
SRC: AQA, A-level Physics specification (7408), section 3.5.1.2 Current–voltage characteristics | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: State Ohm's law. | For a conductor at constant temperature, current is proportional to potential difference.
Q: Why is a filament lamp non-ohmic? | Its temperature, and so resistance, increases with current.
M1@2: Which component is ohmic? | A metal resistor at constant temperature | A diode | A filament lamp | An LED | Only the resistor has a straight-line I–V graph through the origin; the others' resistance changes with voltage.
M2@1: The microscopic form of Ohm's law is: | J = σE | V = IR only | P = IV | Q = CV | Current density is proportional to the local field, with the conductivity σ as the constant; V = IR follows for a uniform wire.
M2@3: A 12 Ω resistor has 6 V across it. What current flows? | 0.5 A | 2 A | 72 A | 18 A | I = V/R = 6/12 = 0.5 A; multiplying gives the 72 A distractor.
M3@2: A filament lamp draws 0.20 A at 2.0 V and 0.30 A at 6.0 V. Its resistance: | Rises from 10 Ω to 20 Ω | Falls from 10 Ω to 5 Ω | Stays at 10 Ω | Rises from 10 Ω to 40 Ω | R = V/I gives 2.0/0.20 = 10 Ω and 6.0/0.30 = 20 Ω: the hotter filament has higher resistance, as expected.
SA2@2: Describe and explain the shape of the I–V characteristic of a filament lamp. | The graph passes through the origin and is symmetrical for both polarities. At low voltages it is nearly straight, but it curves, getting less steep, as the voltage increases. The larger current heats the filament, the metal ions vibrate more and scatter electrons more, so resistance rises and each extra volt produces less extra current. | Curve through origin, symmetric ; Gradient decreases at higher V ; Heating raises resistance via more lattice scattering

## Conductivity
S: Conductivity σ is the reciprocal of resistivity: how readily a material carries current. It spans more orders of magnitude than almost any other physical property, from the best metals to the best insulators.
O: Relate conductivity to resistivity, carrier density and mobility
O: Calculate carrier mobility from conductivity data
O: Explain how doping changes semiconductor conductivity
PRE: Resistance and resistivity
LV: Year 1 · Application
H: Definitions
E: σ = 1/ρ (S m^{-1})
E: σ = nqμ :: carrier density × charge × mobility
E: μ = v_{d}/E = qτ/m :: mobility
H: Range
- Silver 6.3 × 10^{7} S m^{-1}; copper 6.0 × 10^{7}; seawater ~5; pure water 5.5 × 10^{-6}; glass ~10^{-12}; PTFE ~10^{-23}.
- Over 30 orders of magnitude.
H: Semiconductors
P: In semiconductors both electrons and holes conduct: σ = e(nμ_{n} + pμ_{p}). Doping with one impurity atom per million silicon atoms can raise conductivity about a million times. Electron mobility in silicon is ~1400 cm^{2} V^{-1} s^{-1}; in clean graphene it can exceed 10^{5}.
X: Electron mobility in copper (n = 8.5 × 10^{28} m^{-3})?
> μ = σ/(ne) = 6 × 10^{7}/(8.5 × 10^{28} × 1.6 × 10^{-19}) = 4.4 × 10^{-3} m^{2} V^{-1} s^{-1}
K: Conductivity is the product of how many carriers there are (n) and how easily each one moves (μ).
!: High conductivity doesn't always mean high mobility: metals have huge carrier densities but modest mobilities.
T: Conductivity | The reciprocal of resistivity, σ = 1/ρ, measured in siemens per metre
T: Mobility | Drift speed per unit electric field, μ = v_{d}/E
SUM: σ = 1/ρ = nqμ.
SUM: Metals conduct through huge n; semiconductors' n is set by doping and temperature.
EV: established | σ = nqμ is the standard relation and is confirmed by Hall-effect and conductivity measurements.
SRC: OpenStax, University Physics Volume 2, section 9.2 "Model of Conduction in Metals" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/9-2-model-of-conduction-in-metals
SRC: OpenStax, University Physics Volume 3, section 9.6 "Semiconductors and Doping" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/9-6-semiconductors-and-doping
Q: How is conductivity related to carrier density and mobility? | σ = nqμ.
Q: What is mobility? | Drift speed per unit electric field.
M1@1: The SI unit of conductivity is: | S m^{-1} | Ω m | Ω | A | Conductivity is 1/ρ, and the reciprocal of Ω m is siemens per metre.
M2@3: Seawater conducts electricity mainly through: | Dissolved ions | Free electrons | Holes | Protons only | Seawater is an electrolyte: dissolved Na^{+} and Cl^{−} ions carry the current in opposite directions.
M3@2: Material X has twice the carrier density and one tenth the mobility of material Y. Its conductivity is: | One fifth of Y's | Twice Y's | Twenty times Y's | Equal to Y's | σ = nqμ with the same q, so σ_{X}/σ_{Y} = 2 × 0.1 = 0.2.
NUM2@2: A semiconductor has σ = 2.0 S m^{-1} and electrons are the only carriers, with μ = 0.14 m^{2} V^{-1} s^{-1}. Find n, in units of 10^{20} m^{-3}. | 0.89 | 3% | × 10^{20} m^{-3} | n = σ/(eμ) = 2.0/(1.6 × 10^{-19} × 0.14) = 8.9 × 10^{19} m^{-3} = 0.89 × 10^{20} m^{-3}.
SA2@3: Explain why adding a tiny amount of phosphorus to pure silicon increases its conductivity enormously. | Phosphorus has five outer electrons; four bond with neighbouring silicon atoms and the fifth is only weakly bound, so at room temperature it is freed into the conduction band. Pure silicon has very few thermally freed carriers, so even one dopant per million atoms adds far more carriers than were there, and since σ = neμ the conductivity rises by a similar factor. | Phosphorus donates a loosely bound electron ; Intrinsic carrier density is very small ; σ = neμ rises with n

## Series and parallel circuits
S: Components in series share the same current; in parallel they share the same voltage. These two arrangements, and their rules for combining resistances, underlie every circuit.
O: Calculate total resistance for series and parallel combinations
O: Find currents and voltages in mixed circuits
O: Use the potential divider equation, including with sensors
PRE: Ohm's law
LV: GCSE and A level · Application
H: Series
E: R = R_{1} + R_{2} + …
- Same I; voltages add; V divides in proportion to R.
- One break stops all current.
H: Parallel
E: 1/R = 1/R_{1} + 1/R_{2} + … ; two resistors: R = R_{1}R_{2}/(R_{1} + R_{2})
- Same V; currents add; I divides inversely with R.
- Total resistance is less than the smallest branch.
- Household wiring is parallel: each appliance gets full voltage and switches independently.
H: Potential divider
E: V_{out} = V_{in}R_{2}/(R_{1} + R_{2})
- With a sensor (LDR, thermistor) as one resistor, V_{out} responds to light or temperature.
- Loading: connecting a load in parallel with R_{2} lowers V_{out}.
X: 6 Ω and 3 Ω in parallel, in series with 4 Ω, across 12 V. Total current?
> Parallel: 6 × 3/(6 + 3) = 2 Ω; total 6 Ω
> I = 12/6 = 2 A; the pair gets 4 V: 0.67 A through 6 Ω, 1.33 A through 3 Ω
K: Series rules follow from conservation of charge (one current) and energy (voltages add); parallel rules from the same laws applied the other way round.
!: Adding resistors in parallel decreases total resistance and increases total current drawn.
P: **Investigate with the lab.** Wire the same three resistors in series, then in parallel. Which arrangement draws more current from the battery?
IX: circuits
T: Potential divider | Two or more resistors in series across a supply, giving an output voltage that is a fraction of the input
T: Equivalent resistance | The single resistance that would draw the same current from the supply as a network
SUM: Series: R adds, same I. Parallel: 1/R adds, same V.
SUM: A potential divider gives V_{out} = V_{in}R_{2}/(R_{1} + R_{2}).
EV: established | The combination rules follow from conservation of charge and energy in circuits.
SRC: OpenStax, University Physics Volume 2, section 10.2 "Resistors in Series and Parallel" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/10-2-resistors-in-series-and-parallel
SRC: AQA, A-level Physics specification (7408), section 3.5.1.5 Potential divider | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: How do resistors combine in parallel? | Reciprocals add: 1/R = Σ1/R_{i}.
Q: Why are house circuits wired in parallel? | Each appliance gets the full voltage and can be switched independently.
M1@1: Two 10 Ω resistors in parallel: | 5 Ω | 20 Ω | 10 Ω | 100 Ω | 1/R = 1/10 + 1/10 = 1/5, so two equal resistors in parallel give half of one: 5 Ω.
M2@3: A potential divider of 2 kΩ and 8 kΩ across 10 V. V across 8 kΩ: | 8 V | 2 V | 5 V | 10 V | The voltage divides in proportion to resistance: 10 × 8/(2 + 8) = 8 V.
M2@1: Three equal resistors are connected first in series, then in parallel. Which draws more current? | Parallel | Series | They draw the same current | It depends on the battery | Parallel resistance is R/3 and series 3R, so the parallel arrangement draws nine times the current.
M3@3: An NTC thermistor is R_{2} in a potential divider (V_{out} across it). As the room warms, V_{out}: | Falls | Rises | Stays the same | Rises then falls | Warming lowers the thermistor's resistance, so it takes a smaller share of the supply voltage.
NUM2@2: A 4.0 Ω resistor is in series with a parallel pair of 12 Ω and 6.0 Ω, across 9.0 V. What current flows through the 12 Ω resistor, in A? | 0.375 | 2% | A | The pair is 4.0 Ω, total 8.0 Ω, I = 1.125 A; the pair has 4.5 V, so I_{12} = 4.5/12 = 0.375 A.
SA2@3: Explain why connecting a voltmeter of resistance 10 kΩ across the lower 10 kΩ resistor of a 10 kΩ + 10 kΩ divider on 6 V gives a reading below 3 V. | The voltmeter is in parallel with the lower resistor, so together they form 5 kΩ. The divider is now 10 kΩ and 5 kΩ, and the output is 6 × 5/15 = 2 V. The meter draws current and changes the circuit it is measuring (loading); an ideal voltmeter would need infinite resistance. | Meter in parallel lowers resistance to 5 kΩ ; New output 6 × 5/15 = 2 V ; Loading effect; ideal voltmeter has infinite R

## Kirchhoff's laws
S: Kirchhoff's laws express conservation of charge and energy in circuits. With them you can analyse any network of resistors and sources, however complicated.
O: State Kirchhoff's junction and loop laws and the conservation laws behind them
O: Apply sign conventions to set up loop equations
O: Solve multi-loop circuits with simultaneous equations
PRE: Series and parallel circuits
LV: A level · Application
H: The laws
- **Junction (current) law**: ΣI_{in} = ΣI_{out} at any node (charge conservation).
- **Loop (voltage) law**: ΣEMFs = ΣIR around any closed loop (energy conservation; ΣΔV = 0).
H: Method
- Label currents with assumed directions in each branch.
- Write junction equations (nodes − 1 independent ones) and loop equations for independent loops.
- Solve simultaneously; negative answers mean the current flows the other way.
H: Systematic methods
- **Mesh analysis**: loop currents; one equation per mesh.
- **Nodal analysis**: unknown node voltages; one equation per node (used by circuit simulators like SPICE).
X: A 6 V cell and a 2 V cell are connected in a single loop so that they oppose each other, with 4 Ω of total resistance. Find the current.
> Net EMF = 6 − 2 = 4 V
> I = 4/4 = 1 A, driven by the 6 V cell
K: The loop law holds because potential is single-valued: going round any loop returns you to the starting potential.
!: Watch signs: going through a resistor along the current is a drop (−IR); through a cell from − to + is a rise (+ε).
P: **Investigate with the lab.** In a mixed network, read the currents into and out of each junction and the voltages round each loop. Check both of Kirchhoff's laws.
IX: circuits
T: Junction | A point in a circuit where three or more conductors meet
T: Loop | Any closed path round a circuit
SUM: Junction law: charge conservation. Loop law: energy conservation.
SUM: Assume directions, write equations, solve; a negative current just runs the other way.
EV: established | Kirchhoff's laws are exact for lumped circuits without changing magnetic flux through the loops.
SRC: OpenStax, University Physics Volume 2, section 10.3 "Kirchhoff's Rules" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/10-3-kirchhoffs-rules
SRC: AQA, A-level Physics specification (7408), section 3.5.1.4 Circuits | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What does Kirchhoff's junction law express? | Conservation of charge.
Q: What does Kirchhoff's loop law express? | Conservation of energy: the sum of EMFs equals the sum of potential drops around a loop.
M1@1: Currents of 3 A and 2 A enter a junction; 4 A leaves on one wire. The other wire carries: | 1 A out | 1 A in | 9 A | 5 A | Charge is conserved at the junction: 5 A in must equal 5 A out, so the other wire carries 1 A away.
M2@1: Kirchhoff's loop law fails when: | Changing magnetic flux threads the loop | Resistors are in parallel | The current is large | Never | An induced EMF from changing flux makes ∮E·dl non-zero, so potential is no longer single-valued round the loop.
M2@1: What does Kirchhoff's first law express? | Conservation of charge at a junction | Conservation of energy round a loop | Ohm's law for each resistor | The power in a circuit | The current into a junction equals the current out of it, because charge cannot pile up there.
M3@2,3: Two cells, 12 V and 6 V, are in parallel (positive terminals joined) across a 4 Ω resistor. The 12 V cell has internal resistance 2 Ω; the 6 V cell has none. The current in the 4 Ω resistor is: | 1.5 A | 3 A | 4.5 A | 0 A | The 6 V cell fixes the voltage across the 4 Ω resistor at 6 V, so its current is 6/4 = 1.5 A; the 12 V cell sends (12 − 6)/2 = 3 A, of which 1.5 A charges the 6 V cell.
NUM2@3: A 9.0 V cell drives current round a loop containing a 3.0 V opposing cell and resistors of 2.0 Ω and 4.0 Ω. Find the current, in A. | 1.0 | 1% | A | Net EMF = 9.0 − 3.0 = 6.0 V; total resistance 6.0 Ω; I = 6.0/6.0 = 1.0 A.
SA2@1: Explain the physical basis of each of Kirchhoff's laws. | The junction law follows from conservation of charge: charge cannot build up at a junction in a steady circuit, so the current flowing in must equal the current flowing out. The loop law follows from conservation of energy: a coulomb going round a closed loop returns to the same potential, so the energy it gains from EMFs equals the energy it transfers in the components. | Junction law: charge conserved, none accumulates ; Loop law: energy conserved ; Potential is single-valued round a loop

## Electromotive force
S: Electromotive force (EMF) is the energy a source gives each coulomb of charge passing through it. Despite the name it's not a force: it's measured in volts, like potential difference, but describes energy supplied rather than used.
O: Define EMF and distinguish it from potential difference
O: Use ε = W/Q and battery capacity to calculate charge and energy
O: Name sources of EMF and the energy conversions involved
PRE: Voltage and potential difference
LV: A level · Foundation
H: Definitions
E: ε = W/Q :: energy converted to electrical per unit charge
- Sources: chemical (batteries), electromagnetic induction (generators), photovoltaic (solar cells), thermoelectric, piezoelectric.
- p.d. is the energy transferred from electrical to other forms per coulomb.
H: Typical EMFs
- Alkaline cell 1.5 V; lithium-ion 3.6–3.7 V; lead–acid cell 2.0 V; silicon solar cell ~0.6 V open circuit.
H: Batteries
P: A battery's EMF comes from the free-energy change of its cell reaction: ε = −ΔG/(nF). Capacity (A h) tells how much charge it can deliver; energy = capacity × voltage. A phone battery of 4000 mA h at 3.8 V stores ~15 W h (55 kJ).
X: A 12 V battery delivers 0.5 A for 1 hour. Charge and energy supplied?
> Q = It = 0.5 × 3600 = 1800 C
> W = εQ = 12 × 1800 = 21.6 kJ
K: EMF is energy put into each coulomb by the source; p.d. is energy taken out of each coulomb by a component.
!: EMF is measured across a source when no current flows; with current, terminal p.d. is lower because of internal resistance.
P: **Investigate with the lab.** Change the load resistance and watch the terminal voltage change while the emf stays fixed.
IX: circuits
T: Electromotive force | The energy converted into electrical energy per unit charge passing through a source
T: Battery capacity | The total charge a battery can deliver, usually in ampere-hours (1 A h = 3600 C)
SUM: ε = W/Q, in volts, for energy supplied by a source.
SUM: Battery energy = capacity × voltage.
EV: established | EMF as energy per unit charge supplied is the standard definition; cell EMFs follow from electrochemistry.
SRC: OpenStax, University Physics Volume 2, section 10.1 "Electromotive Force" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/10-1-electromotive-force
SRC: AQA, A-level Physics specification (7408), section 3.5.1.6 Electromotive force and internal resistance | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: Define EMF. | The energy converted into electrical energy per unit charge by a source.
Q: How is a cell's EMF related to its chemistry? | ε = −ΔG/(nF), from the free energy change of the cell reaction.
M1@1: EMF is measured in: | Volts | Newtons | Amperes | Joules | EMF is energy per unit charge, J C^{-1}, which is the volt, despite the word "force" in its name.
M2@2: A 3000 mA h battery at 3.7 V stores about: | 40 kJ | 11 J | 3 kJ | 400 kJ | Charge = 3 A × 3600 s = 10 800 C; energy = 10 800 × 3.7 ≈ 40 000 J.
M2@1: What is the emf of a cell? | The energy it supplies per coulomb of charge | The voltage across the external resistor | The current it can deliver | Its internal resistance | Emf is the energy transferred to each unit of charge by the source, before any is lost inside it.
M3@1,3: A solar cell gives 0.60 V on open circuit and delivers 0.50 V at 2.0 A in sunlight. Which is correct? | Its EMF is 0.60 V; 0.10 V is lost inside the cell | Its EMF is 0.50 V | Its EMF rises when current flows | The light energy per coulomb is 0.50 J | The open-circuit voltage equals the EMF; with current flowing, Ir = 0.10 V is lost internally, leaving 0.50 V at the terminals.
SA2@1: Explain the difference between EMF and potential difference in terms of energy. | EMF is the energy transferred to each coulomb of charge by a source, from chemical, mechanical or light energy into electrical energy. Potential difference across a component is the energy transferred from each coulomb into other forms, such as heat or light, in that component. Both are in J C^{-1} (volts), but they describe energy going into and out of the circuit. | EMF: energy into electrical per coulomb, at a source ; p.d.: electrical energy out per coulomb, in a component ; Both measured in volts

## Internal resistance
S: Every real source has internal resistance, so its terminal voltage drops when it supplies current. These "lost volts" set how much current and power a battery can deliver.
O: Use ε = I(R + r) and V = ε − Ir
O: Determine ε and r from a graph of terminal p.d. against current
O: Apply the maximum power transfer condition and its efficiency
PRE: Electromotive force
LV: A level · Application
H: The model
E: ε = I(R + r) ⇒ V = ε − Ir
- r: internal resistance; Ir: lost volts.
- Short-circuit current: ε/r (dangerous for low-r sources like car batteries).
H: Measuring ε and r
P: Vary an external resistance, record terminal p.d. V and current I, and plot V against I. The graph is a straight line with intercept ε and gradient −r. Keep currents modest and switch off between readings so the cell doesn't warm and change r.
H: Maximum power transfer
E: P_{load} = ε^{2}R/(R + r)^{2}, maximum when R = r
- At maximum power, efficiency is only 50%.
- Used in audio and radio (impedance matching); not in power grids, which aim for high efficiency.
X: A cell (ε = 1.5 V, r = 0.5 Ω) drives a 2.5 Ω lamp. Current and terminal voltage?
> I = ε/(R + r) = 1.5/3.0 = 0.5 A
> V = ε − Ir = 1.5 − 0.25 = 1.25 V
K: The terminal p.d. equals the EMF only when no current flows; the more current drawn, the more is lost inside the source.
!: A battery's internal resistance rises as it ages and as it gets cold, which is why old batteries fail under load though they read the full voltage unloaded.
P: **Investigate with the lab.** Increase the internal resistance and see the terminal voltage drop as the current rises. Then find the load that takes the most power: it matches r.
IX: circuits
T: Internal resistance | The resistance of the materials inside a source, which dissipates energy when current flows
T: Terminal potential difference | The p.d. across a source's terminals when it supplies current, V = ε − Ir
SUM: V = ε − Ir; a V–I graph gives ε (intercept) and r (−gradient).
SUM: Load power peaks when R = r, at 50% efficiency.
EV: established | A source modelled as an ideal EMF in series with a fixed r describes cells well over moderate currents.
SRC: OpenStax, University Physics Volume 2, section 10.1 "Electromotive Force" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/10-1-electromotive-force
SRC: AQA, A-level Physics specification (7408), section 3.5.1.6 Electromotive force and internal resistance | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: Why does terminal voltage fall when more current is drawn? | More voltage is dropped across the internal resistance.
Q: When is maximum power delivered to a load? | When the load resistance equals the source's internal resistance.
M1@2: A V–I graph for a cell has intercept 9 V and gradient −2 Ω. The internal resistance is: | 2 Ω | 9 Ω | 4.5 Ω | 18 Ω | V = ε − Ir is a straight line of gradient −r, so r = 2 Ω; the intercept is the EMF, 9 V.
M2@3: At maximum power transfer, efficiency is: | 50% | 100% | 25% | 0% | With R = r the same current flows through both, so equal power is dissipated in the load and inside the source.
M2@3: A cell has emf 6 V and internal resistance 1 Ω. What load resistance takes the most power? | 1 Ω | 6 Ω | 0 Ω | As large as possible | Maximum power transfer happens when the load equals the internal resistance, here 1 Ω.
M3@1: A battery reads 12.6 V on open circuit and 11.8 V while supplying 4.0 A. Its internal resistance is: | 0.20 Ω | 2.95 Ω | 3.15 Ω | 0.80 Ω | The lost volts are 12.6 − 11.8 = 0.8 V, so r = 0.8/4.0 = 0.20 Ω; dividing the terminal p.d. by I gives the load, not r.
SA2@2: Describe how to measure the EMF and internal resistance of a cell, and how the results are obtained from a graph. | Connect the cell in series with an ammeter, a variable resistor and a switch, with a voltmeter across the cell. Record terminal p.d. V and current I for a range of resistor settings, closing the switch only briefly. Plot V against I: the straight line has y-intercept ε and gradient −r. | Circuit with variable resistor, ammeter, voltmeter across cell ; Range of V and I readings, switch off between ; Intercept = ε, gradient = −r

## Electrical power and energy
S: Electrical power is the rate at which energy is transferred by a current. It's what you pay for (in kilowatt-hours) and what heats wires, lights lamps and turns motors.
O: Calculate power using P = IV, I^{2}R and V^{2}/R
O: Calculate energy transferred and its cost in kilowatt-hours
O: Explain why electricity is transmitted at high voltage
PRE: Ohm's law
LV: GCSE and A level · Foundation
H: Formulas
E: P = IV = I^{2}R = V^{2}/R
E: E = Pt = IVt
E: 1 kWh = 3.6 MJ
- I^{2}R: power losses in wires; why transmission lines use high voltage.
H: Transmission
P: For a fixed power P = IV, raising V lowers I, and the cable losses I^{2}R fall as 1/V^{2}. The UK grid transmits at 275–400 kV; China has built lines at up to 1100 kV (HVDC). Transformers step the voltage back down for homes.
H: Fuses and ratings
- Fuse rating just above normal current; protects wiring from overheating.
- Appliance ratings: kettle ~3 kW (13 A at 230 V); LED bulb ~8 W; phone charger ~20 W.
X: A 3 kW heater runs 4 h a day for 30 days at 30p per kWh. Cost?
> Energy = 3 kW × 4 h × 30 = 360 kWh
> Cost = 360 × £0.30 = £108
K: Choose the power formula that uses the quantity held fixed: V^{2}/R for a fixed-voltage supply, I^{2}R for a fixed current such as a cable carrying a given load.
!: P = V^{2}/R shows that for fixed voltage, lower resistance means more power: a 2 kW heater has a smaller resistance than a 1 kW one.
P: **Investigate with the lab.** Change the load and watch the power in it rise and fall. Calculate P = IV for two settings and compare with the lab.
IX: circuits
T: Power | The rate of energy transfer, in watts (J s^{-1})
T: Kilowatt-hour | The energy transferred by 1 kW in 1 hour, 3.6 × 10^{6} J
SUM: P = IV = I^{2}R = V^{2}/R; E = Pt.
SUM: High-voltage transmission cuts I^{2}R losses as 1/V^{2}.
EV: established | P = IV follows from the definitions of current and potential difference.
SRC: OpenStax, University Physics Volume 2, section 9.5 "Electrical Energy and Power" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/9-5-electrical-energy-and-power
SRC: AQA, A-level Physics specification (7408), section 3.5.1.4 Circuits | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: Give three formulas for electrical power. | P = IV = I^{2}R = V^{2}/R.
Q: Why is electricity transmitted at high voltage? | Lower current for the same power reduces I^{2}R losses.
M1@1: A 60 W lamp at 230 V draws: | 0.26 A | 3.8 A | 13.8 A | 0.026 A | I = P/V = 60/230 = 0.26 A; dividing the other way gives the 3.8 A distractor.
M2@3: Doubling transmission voltage (same power) changes line losses by: | ×1/4 | ×1/2 | ×2 | ×4 | Current halves for the same power, and losses I^{2}R fall to a quarter.
M2@1: A device draws 2 A at 12 V. What is its power? | 24 W | 6 W | 14 W | 0.17 W | P = IV = 2 × 12 = 24 W; dividing or adding the numbers gives the distractors.
M3@1: A 2.0 kW kettle and a 1.0 kW kettle run on the same 230 V supply. Which is correct? | The 2.0 kW kettle has half the resistance | The 2.0 kW kettle has twice the resistance | They have the same resistance | The 1.0 kW kettle draws more current | At fixed V, P = V^{2}/R, so doubling power means halving resistance (26 Ω against 53 Ω).
NUM2@2: A 1.5 kW microwave runs for 20 minutes. How much energy does it transfer, in kWh? | 0.50 | 1% | kWh | E = Pt = 1.5 kW × (20/60) h = 0.50 kWh, which is 1.8 MJ.
SA3@3: A power station sends 10 MW through cables of total resistance 5.0 Ω. Compare the power lost when transmitting at 25 kV and at 400 kV, and explain the result. | At 25 kV, I = P/V = 400 A and the loss is I^{2}R = 400^{2} × 5 = 800 kW, 8% of the power. At 400 kV, I = 25 A and the loss is 25^{2} × 5 = 3.1 kW, about 0.03%. For fixed power the current is inversely proportional to voltage, and the loss depends on I^{2}, so raising V by 16 times cuts losses by 256 times. | Current from I = P/V in each case ; Losses 800 kW and about 3 kW from I^{2}R ; Loss ∝ 1/V^{2}

## Resistor networks
S: Complex resistor networks can often be simplified by combining series and parallel parts, using symmetry, or converting between star and delta shapes. When they can't, Kirchhoff's laws always work.
O: Reduce networks step by step using series and parallel rules
O: Use symmetry and star–delta transforms to simplify networks
O: State and apply the balance condition of a Wheatstone bridge
PRE: Series and parallel circuits
LV: A level · Physical reasoning
H: Techniques
- Combine series and parallel step by step.
- **Symmetry**: points at equal potential can be joined (or a resistor between them removed) without changing currents.
- **Star–delta (Y–Δ) transforms**: convert three resistors in a triangle to three in a star and back.
- **Wheatstone bridge**: balanced when R_{1}/R_{2} = R_{3}/R_{4}; no current flows through the galvanometer.
H: Wheatstone bridge in practice
P: Balancing a bridge measures an unknown resistance precisely, independent of the supply voltage. Strain gauges, thermistors and platinum resistance thermometers are read with bridges, where small resistance changes give small, measurable imbalance voltages.
H: Infinite networks
P: For an infinite ladder of equal resistors r, adding one more section doesn't change the resistance: R = r + rR/(r + R), which gives R = r(1 + √5)/2, the golden ratio times r.
X: A cube of twelve 1 Ω resistors. Resistance between opposite corners?
> By symmetry, current splits 3 ways, then 6 ways, then rejoins 3 ways
> R = 1/3 + 1/6 + 1/3 = 5/6 Ω
K: Before calculating, look for points that symmetry puts at equal potential: no current flows between them.
!: Don't combine resistors as "parallel" unless both ends of each are joined to the same two nodes.
P: **Investigate with the lab.** Make the two parallel branches share the current equally, then build a mixed network and calculate its total resistance before checking.
IX: circuits
T: Wheatstone bridge | Four resistors in a diamond with a detector across the middle, balanced when the resistance ratios on each side are equal
T: Star–delta transform | Replacing three resistors joined in a triangle by three joined at a point (or the reverse) with the same behaviour at the terminals
SUM: Reduce networks with series/parallel rules, symmetry and Y–Δ transforms.
SUM: A bridge is balanced when R_{1}/R_{2} = R_{3}/R_{4}.
EV: established | All these techniques are consequences of Kirchhoff's laws for linear resistors.
SRC: OpenStax, University Physics Volume 2, section 10.2 "Resistors in Series and Parallel" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/10-2-resistors-in-series-and-parallel
SRC: OpenStax, University Physics Volume 2, section 10.3 "Kirchhoff's Rules" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/10-3-kirchhoffs-rules
Q: When is a Wheatstone bridge balanced? | When R_{1}/R_{2} = R_{3}/R_{4}, so no current flows through the detector.
Q: How does symmetry simplify networks? | Points at equal potential can be connected or separated without changing any currents.
M1@3: In a balanced bridge, the current through the galvanometer is: | Zero | Maximum | Equal to the supply current | Negative | At balance the two midpoints are at the same potential, so there is no p.d. across the meter and no current.
M2@2: Three 3 Ω resistors in delta are equivalent to a star of: | Three 1 Ω | Three 3 Ω | Three 9 Ω | One 1 Ω | For equal resistors R_{Y} = R_{Δ}/3, so a delta of 3 Ω resistors becomes a star of 1 Ω resistors.
M2@1: What is the total resistance of 6 Ω and 3 Ω in parallel? | 2 Ω | 9 Ω | 4.5 Ω | 18 Ω | 1/R = 1/6 + 1/3 = 1/2, so R = 2 Ω, less than the smaller resistor.
M3@3: A bridge has 100 Ω and 200 Ω on one side, and 150 Ω and an unknown X on the other, in the same order. At balance X is: | 300 Ω | 75 Ω | 133 Ω | 450 Ω | Balance needs 100/200 = 150/X, so X = 300 Ω.
NUM2@1: Find the resistance, in Ω, of a 2.0 Ω resistor in series with a parallel combination of three 6.0 Ω resistors. | 4.0 | 1% | Ω | Three 6.0 Ω in parallel give 2.0 Ω; adding the 2.0 Ω in series gives 4.0 Ω.
SA3@2,3: Explain why a Wheatstone bridge measures resistance independently of the supply voltage and why this makes it useful for sensors. | At balance no current flows through the detector, which happens when the two midpoints are at the same potential. Each side is a potential divider, so balance depends only on the ratios R_{1}/R_{2} and R_{3}/R_{4}, not on the supply voltage. With a sensor in one arm, a small change in its resistance gives a small out-of-balance voltage that can be amplified and measured sensitively. | Balance means equal midpoint potentials, zero detector current ; Condition depends only on ratios, not the supply ; Small sensor changes give a measurable imbalance

## Capacitor charging and discharging
S: When a capacitor charges or discharges through a resistor, the current doesn't change instantly: voltage and charge follow exponential curves with time constant RC. This sets the timing of countless circuits.
O: Use exponential equations for Q, V and I during charge and discharge
O: Define and calculate the time constant and the time to halve
O: Determine RC from experimental data using a log-linear graph
PRE: Exponential and logarithmic functions
LV: A level · Application
H: Discharging
E: Q = Q_{0}e^{−t/RC}; V = V_{0}e^{−t/RC}; I = I_{0}e^{−t/RC}
E: τ = RC :: time to fall to 1/e ≈ 37%
E: t_{1/2} = RC ln 2 ≈ 0.69RC
H: Charging
E: V = ε(1 − e^{−t/RC}); Q = Q_{0}(1 − e^{−t/RC}); I = (ε/R)e^{−t/RC}
- After 1τ: 63% charged; after 5τ: > 99%.
H: Measuring RC
P: Record V against time during discharge, then plot ln V against t: a straight line of gradient −1/RC. Or find the time to halve and divide by ln 2.
X: A 470 μF capacitor discharges through 10 kΩ from 9 V. Voltage after 10 s?
> τ = RC = 470 × 10^{-6} × 10^{4} = 4.7 s
> V = 9e^{−10/4.7} = 1.07 V
K: The rate of discharge is proportional to the charge left (dQ/dt = −Q/RC), which is exactly what gives an exponential decay.
!: The current during charging is largest at the start, not the end, and it falls to zero as the capacitor fills.
P: **Investigate with the lab.** Charge the capacitor and stop the clock at one time constant (63%). Then discharge it and find the half-life: τ ln 2.
IX: transients
T: Time constant | τ = RC, the time for a discharging capacitor's charge to fall to 1/e of its initial value
T: Time to halve | t_{1/2} = 0.69RC, the time for charge, voltage or current to fall to half
SUM: Discharge: Q = Q_{0}e^{−t/RC}; charge: V = ε(1 − e^{−t/RC}).
SUM: A graph of ln V against t has gradient −1/RC.
EV: established | Exponential RC behaviour follows from Kirchhoff's laws and matches measurements closely.
SRC: OpenStax, University Physics Volume 2, section 10.5 "RC Circuits" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/10-5-rc-circuits
SRC: AQA, A-level Physics specification (7408), section 3.7.4.4 Capacitor charge and discharge | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What is the time constant of an RC circuit? | τ = RC: the time to fall to 1/e (37%) of the initial value when discharging.
Q: How long does a capacitor take to charge nearly fully? | About 5RC.
M1@1: After one time constant of charging, V reaches: | 63% of ε | 37% of ε | 50% of ε | 100% of ε | V = ε(1 − e^{−1}) = 0.63ε; 37% is what remains during a discharge after one time constant.
M2@2: The half-life of a discharge with RC = 10 s is: | 6.9 s | 10 s | 5 s | 14.4 s | t_{1/2} = RC ln 2 = 10 × 0.693 = 6.9 s, shorter than one time constant.
M2@1: A capacitor charges through a resistor from a d.c. supply. After a time RC, what fraction of the final voltage has it reached? | About 63% | 50% | About 37% | 100% | V = V_{0}(1 − e^{−t/RC}); at t = RC this is 1 − 1/e ≈ 0.63.
M3@3: A graph of ln V against t for a discharge has gradient −0.25 s^{-1}. With R = 100 kΩ, the capacitance is: | 40 μF | 25 μF | 4.0 μF | 2.5 mF | The gradient is −1/RC, so RC = 4.0 s and C = 4.0/10^{5} = 4.0 × 10^{-5} F = 40 μF.
NUM2@1,2: A 220 μF capacitor charged to 12 V discharges through 47 kΩ. Find the voltage after 20 s, in V. | 1.73 | 3% | V | τ = 220 × 10^{-6} × 47 × 10^{3} = 10.3 s; V = 12e^{−20/10.3} = 12 × 0.144 = 1.73 V.
SA2@1,3: Describe how the current changes while a capacitor charges from a d.c. supply through a resistor, and explain why. | At the instant the switch closes the capacitor is uncharged, so there is no p.d. across it and the whole supply voltage is across the resistor: the current is largest, ε/R. As charge builds up, the capacitor's p.d. rises and opposes the supply, so the p.d. across the resistor and the current fall. The current decays exponentially to zero, with time constant RC, as the capacitor's p.d. approaches ε. | Initial current ε/R with no p.d. across C ; Rising capacitor p.d. reduces resistor p.d. ; Exponential decay to zero with τ = RC

## RC circuits
S: RC circuits combine resistors and capacitors to shape signals: they set delays, smooth ripple, block DC and filter frequencies. Their behaviour in time (exponentials) and in frequency (filters) are two views of one system.
O: Write and solve the differential equation of an RC circuit
O: Calculate capacitive reactance and the cut-off frequency of an RC filter
O: Identify low-pass and high-pass arrangements and their uses
PRE: Capacitor charging and discharging
LV: Year 1 · Application
H: Time domain
E: RC dV/dt + V = V_{in}
- Step input: exponential approach with τ = RC.
- Square-wave input: output rounded (low-pass) or spiky (high-pass), depending on which component is the output.
H: Frequency domain
E: X_{C} = 1/(ωC)
E: f_{c} = 1/(2πRC)
- Low-pass (output across C): passes below f_{c}; falls at 20 dB per decade above.
- High-pass (output across R): passes above f_{c}.
- At f_{c}: gain 1/√2 (−3 dB), phase shift 45°.
H: Uses
- Smoothing capacitors after rectifiers; coupling capacitors between amplifier stages.
- Timers (the 555 chip), switch debouncing, camera flashes; integrators and differentiators with op-amps.
X: Design an RC low-pass filter with f_{c} = 1 kHz using C = 100 nF.
> R = 1/(2πf_{c}C) = 1/(2π × 1000 × 10^{-7}) = 1.6 kΩ
K: The cut-off frequency is where the capacitor's reactance equals the resistance: f_{c} = 1/(2πRC) is just X_{C} = R.
!: A high-pass RC filter blocks DC completely; an RC low-pass passes it.
P: **Investigate with the lab.** Double R and see the charging take twice as long. Then double C instead and compare.
IX: transients
T: Capacitive reactance | The opposition of a capacitor to alternating current, X_{C} = 1/(ωC), in ohms
T: Cut-off frequency | The frequency at which a filter's output falls to 1/√2 of its passband value (−3 dB)
SUM: Time constant RC and cut-off frequency 1/(2πRC) describe the same circuit.
SUM: Output across C gives low-pass; across R gives high-pass.
EV: established | RC filter behaviour follows from the linear circuit equations and is used throughout electronics.
SRC: OpenStax, University Physics Volume 2, section 10.5 "RC Circuits" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/10-5-rc-circuits
SRC: OpenStax, University Physics Volume 2, section 15.2 "Simple AC Circuits" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/15-2-simple-ac-circuits
Q: What is the cut-off frequency of an RC filter? | f_{c} = 1/(2πRC).
Q: What's the capacitive reactance? | X_{C} = 1/(ωC).
M1@2: A capacitor's reactance at high frequency is: | Small | Large | Zero at DC | Independent of frequency | X_{C} = 1/(2πfC) falls as frequency rises, so a capacitor passes high frequencies easily.
M2@3: Output across the capacitor in an RC circuit makes: | A low-pass filter | A high-pass filter | A band-stop filter | An amplifier | At high frequency the capacitor's small reactance shorts the output, while at low frequency it takes almost all the input.
M2@1: An RC circuit has R = 10 kΩ and C = 100 μF. What is its time constant? | 1 s | 0.1 s | 10 s | 1000 s | τ = RC = 10 000 Ω × 0.0001 F = 1 s; convert kΩ and μF to base units first.
M3@2,3: An RC high-pass filter has R = 10 kΩ and C = 10 nF. At 160 Hz its output is: | Much smaller than the input | Equal to the input | About 0.71 of the input | Larger than the input | f_{c} = 1/(2π × 10^{4} × 10^{-8}) ≈ 1.6 kHz; 160 Hz is a decade below cut-off, so the output is about 0.1 of the input.
NUM2@2: Find the reactance of a 2.2 μF capacitor at 50 Hz, in Ω. | 1450 | 2% | Ω | X_{C} = 1/(2πfC) = 1/(2π × 50 × 2.2 × 10^{-6}) = 1447 Ω.
SA2@3: Explain how an RC low-pass filter passes low frequencies and blocks high ones, with the output taken across the capacitor. | The resistor and capacitor form a frequency-dependent potential divider. At low frequency the capacitor's reactance 1/(ωC) is much larger than R, so most of the input appears across it. At high frequency its reactance is much smaller than R, so most of the voltage is dropped across the resistor and little appears at the output. The changeover is at f_{c} = 1/(2πRC). | Acts as a potential divider ; X_{C} large at low f, small at high f ; Changeover at f_{c} = 1/(2πRC)

## RL circuits
S: An inductor opposes changes in current by generating a back EMF. In an RL circuit, current rises and falls exponentially with time constant L/R, and switching off can produce dangerous voltage spikes.
O: Describe how an inductor's back EMF opposes changes in current
O: Calculate the time constant and current growth or decay in an RL circuit
O: Explain switching spikes and how flyback diodes prevent damage
PRE: Capacitor charging and discharging
LV: Year 1 · Application
H: Inductance
E: ε = −L dI/dt
E: L = μ_{0}N^{2}A/l :: long solenoid
E: U = ½LI^{2} :: energy stored in the magnetic field
H: Transients
E: I = (ε/R)(1 − e^{−Rt/L}) :: switch on
E: I = I_{0}e^{−Rt/L} :: switch off through R
E: τ = L/R
H: Switching spikes
P: Interrupting current in an inductor suddenly makes dI/dt huge, so the back EMF can reach kilovolts: it sparks across switch contacts and can destroy transistors. Flyback diodes across relay coils give the current a path to decay safely. Car ignition coils exploit the effect deliberately to make sparks.
H: Frequency response
E: X_{L} = ωL
- Inductors pass DC and oppose high frequencies: chokes in power supplies, RL filters.
X: L = 0.5 H, R = 10 Ω, ε = 12 V. Time constant and final current? Current after 0.05 s?
> τ = L/R = 0.05 s; I_{max} = ε/R = 1.2 A
> I = 1.2(1 − e^{−1}) = 0.76 A
K: An inductor's current can't change instantly, just as a capacitor's voltage can't.
!: Inductors resist changes in current, not current itself; a steady DC current flows through an ideal inductor with no voltage across it.
P: **Investigate with the lab.** Switch to the inductor and watch the current rise to E/R while the inductor's voltage dies away.
IX: transients
T: Inductance | The back EMF per unit rate of change of current, L = −ε/(dI/dt), in henries
T: Back EMF | The EMF induced in an inductor that opposes the change in current through it
SUM: τ = L/R; current grows to ε/R and decays exponentially.
SUM: Fast switch-off gives large spikes; flyback diodes give the current a safe path.
EV: established | Self-induction follows from Faraday's and Lenz's laws; RL transients match experiment.
SRC: OpenStax, University Physics Volume 2, section 14.4 "RL Circuits" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/14-4-rl-circuits
SRC: OpenStax, University Physics Volume 2, section 14.2 "Self-Inductance and Inductors" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/14-2-self-inductance-and-inductors
Q: What is the time constant of an RL circuit? | τ = L/R.
Q: Why are flyback diodes placed across relay coils? | To give the coil's current a safe path when switched off, preventing a large voltage spike.
M1@2: The energy stored in a 2 H inductor carrying 3 A is: | 9 J | 6 J | 18 J | 3 J | U = ½LI^{2} = ½ × 2 × 3^{2} = 9 J; forgetting the ½ gives 18 J.
M2@1: An inductor's reactance: | Increases with frequency | Decreases with frequency | Is constant | Is zero at high frequency | X_{L} = ωL = 2πfL, so the faster the current changes, the larger the back EMF and the opposition.
M2@2: When an RL circuit is switched on, how does the current change? | It rises gradually towards E/R | It jumps instantly to E/R | It rises without limit | It stays at zero | The inductor's back emf opposes the change, so the current grows exponentially towards E/R.
M3@3: A coil carrying 2.0 A is switched off in 1.0 ms with L = 0.40 H. The average induced EMF is about: | 800 V | 0.8 V | 80 V | 8 kV | |ε| = L ΔI/Δt = 0.40 × 2.0/10^{-3} = 800 V, far above the supply voltage: hence sparks and damaged switches.
NUM2@2: In an RL circuit L = 0.20 H and R = 50 Ω. Find the time constant, in ms. | 4.0 | 1% | ms | τ = L/R = 0.20/50 = 4.0 × 10^{-3} s = 4.0 ms.
SA3@1,3: A relay coil is switched off by a transistor. Explain why the transistor may be damaged, and how a diode across the coil prevents this. | The coil's current cannot stop instantly. When the transistor turns off, the current tries to fall to zero very quickly, so dI/dt is huge and the back EMF L dI/dt can reach hundreds of volts, breaking down the transistor. A diode connected in reverse across the coil gives the current a path: it circulates through the diode and decays gradually, and the voltage is limited to about 0.7 V above the supply. | Inductor current cannot change instantly ; Rapid switch-off gives huge L dI/dt ; Diode provides decay path, limiting the voltage

## RLC circuits
S: An RLC circuit combines resistance, inductance and capacitance. Energy sloshes between the capacitor's electric field and the inductor's magnetic field, so the circuit oscillates like a mass on a spring, damped by the resistance.
O: Write the equation of a series RLC circuit and its mechanical analogue
O: Calculate the natural frequency and the critical damping resistance
O: Classify a circuit as underdamped, critically damped or overdamped
PRE: Damped oscillations
LV: Year 1 · Physical reasoning
H: The equation
E: L d^{2}q/dt^{2} + R dq/dt + q/C = ε(t)
E: ω_{0} = 1/√(LC) :: natural frequency
- Analogy: L ↔ mass, R ↔ friction, 1/C ↔ spring constant, q ↔ displacement.
H: Damping
E: R_{crit} = 2√(L/C)
- R < R_{crit}: underdamped oscillation at ω_{d} = √(ω_{0}^{2} − (R/2L)^{2}).
- R = R_{crit}: critically damped. R > R_{crit}: overdamped.
E: Q = (1/R)√(L/C) :: quality factor (series)
H: Uses
- Radio tuning, oscillators, filters, induction heating, wireless charging (resonant coupling), MRI coils.
X: L = 10 mH, C = 1 μF. Natural frequency?
> ω_{0} = 1/√(10^{-2} × 10^{-6}) = 1/√(10^{-8}) = 10^{4} rad s^{-1}
> f_{0} = ω_{0}/2π = 1.59 kHz
K: The energy oscillates between ½q^{2}/C in the capacitor and ½LI^{2} in the inductor, while R turns some into heat each cycle.
!: With no resistance an LC circuit would oscillate forever; in reality resistance and radiation damp it.
T: Natural frequency | The frequency ω_{0} = 1/√(LC) at which an undamped LC circuit oscillates
T: Critical damping | The damping (R = 2√(L/C)) at which the circuit returns to equilibrium fastest without oscillating
SUM: ω_{0} = 1/√(LC); the circuit is a damped harmonic oscillator.
SUM: R below 2√(L/C) gives ringing; above it, a slow non-oscillating return.
EV: established | The RLC circuit obeys the same linear second-order equation as a damped mass–spring system.
SRC: OpenStax, University Physics Volume 2, section 14.6 "RLC Series Circuits" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/14-6-rlc-series-circuits
SRC: OpenStax, University Physics Volume 2, section 14.5 "Oscillations in an LC Circuit" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/14-5-oscillations-in-an-lc-circuit
Q: What is the natural frequency of an LC circuit? | ω_{0} = 1/√(LC).
Q: What mechanical system is the RLC circuit analogous to? | A damped mass–spring oscillator.
M1@3: Increasing R in a series RLC circuit makes Q: | Smaller | Larger | Unchanged | Infinite | Q = (1/R)√(L/C): more resistance removes energy faster each cycle, so the quality factor falls.
M2@1: In an LC oscillation, when the capacitor is fully charged the current is: | Zero | Maximum | Half its maximum | Reversed | At that instant all the energy is in the capacitor's electric field, so the inductor's energy ½LI^{2}, and the current, are zero.
M3@2,3: A series circuit has L = 4.0 mH and C = 10 μF. The resistance for critical damping is: | 40 Ω | 20 Ω | 400 Ω | 4 Ω | R_{crit} = 2√(L/C) = 2√(4.0 × 10^{-3}/10^{-5}) = 2√400 = 40 Ω.
NUM2@2: Find the natural frequency f_{0}, in Hz, of an LC circuit with L = 0.10 H and C = 10 μF. | 159 | 2% | Hz | ω_{0} = 1/√(0.10 × 10^{-5}) = 1000 rad s^{-1}; f_{0} = 1000/2π = 159 Hz.
TF1@1: In the RLC–mechanical analogy, the inductance plays the part of mass. | true | Inductance resists changes in current just as mass resists changes in velocity: L d^{2}q/dt^{2} matches m d^{2}x/dt^{2}.
SA3@2,3: Describe the energy changes in an LC circuit during one cycle, and explain the effect of adding resistance. | With the capacitor fully charged all the energy is in its electric field. It discharges through the inductor, and the energy moves into the inductor's magnetic field, which is greatest when the capacitor is empty and the current is maximum. The inductor keeps the current flowing, recharging the capacitor with reverse polarity, and the process repeats. Resistance converts some energy to heat each cycle, so the oscillations decay, and if R exceeds 2√(L/C) they don't occur at all. | Energy alternates between electric (C) and magnetic (L) fields ; Current maximum when capacitor is uncharged ; Resistance dissipates energy: decay, or no oscillation above critical damping

## Transient responses
S: A transient is a circuit's temporary response when something changes suddenly, like a switch closing. It dies away, leaving the steady state. Understanding transients prevents spikes, ringing and damage.
O: State which circuit quantities are continuous at a switching instant
O: Find initial and final values and write the first-order transient response
O: Describe second-order transients such as ringing and overshoot
PRE: RL circuits
LV: Year 1 · Physical reasoning
H: General approach
- Before the change: find steady-state values (for DC, capacitors act as open circuits, inductors as short circuits).
- Continuity: capacitor voltages and inductor currents can't jump instantly.
- After the change: total response = transient (decaying) + steady state.
E: x(t) = x_{∞} + (x_{0} − x_{∞})e^{−t/τ} :: first-order circuits, τ = RC or L/R
H: Second-order transients
- RLC circuits can ring at ω_{d} after a step, decaying as e^{−Rt/2L}.
- Overshoot and settling time matter in control systems and digital signals.
H: Practical examples
- Inrush current when switching on transformers, motors or capacitor banks.
- Ringing on fast digital lines (stray L and C), fixed with termination resistors; snubber circuits damp switching transients in power electronics.
X: A switch connects 10 V to an uncharged 1 μF capacitor through 1 kΩ. Current just after closing? After a long time?
> Just after: V_{C} = 0 (it can't jump), so I = 10/1000 = 10 mA
> Long after: I = 0, V_{C} = 10 V; τ = RC = 1 ms
K: Three numbers solve any first-order transient: the initial value, the final value and the time constant.
!: Capacitor voltage and inductor current are continuous; capacitor current and inductor voltage can jump.
P: **Investigate with the lab.** Compare the RC charging curve and the RL current curve: both approach their final values exponentially with a time constant.
IX: transients
T: Transient | The temporary part of a circuit's response after a sudden change, which decays away
T: Steady state | The condition reached once all transients have died away
SUM: x(t) = x_{∞} + (x_{0} − x_{∞})e^{−t/τ} for first-order circuits.
SUM: Second-order circuits may overshoot and ring before settling.
EV: established | Transient analysis follows from the linear differential equations of circuits and matches measurement.
SRC: OpenStax, University Physics Volume 2, section 10.5 "RC Circuits" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/10-5-rc-circuits
SRC: OpenStax, University Physics Volume 2, section 14.4 "RL Circuits" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/14-4-rl-circuits
Q: Which quantities can't change instantaneously in circuits? | Capacitor voltage and inductor current.
Q: What makes up the full response after a change? | The decaying transient plus the steady-state response.
M1@1: At DC steady state, a capacitor behaves like: | An open circuit | A short circuit | A resistor | An inductor | Once charged, its voltage is constant, so dQ/dt = 0 and no current flows through it.
M2@1: At DC steady state, an ideal inductor behaves like: | A short circuit | An open circuit | A capacitor | A battery | With a steady current dI/dt = 0, so the back EMF L dI/dt is zero and there is no voltage across it.
M2@2: What do RC charging and RL current growth have in common? | Both approach their final value exponentially | Both change at a constant rate | Both oscillate before settling | Both reach their final value instantly | Both are first-order transients with a single time constant.
M3@1,2: A 12 V supply has been connected for a long time to a 4 Ω resistor in series with an inductor. The switch is moved so the inductor discharges through a 20 Ω resistor. Just after switching, the voltage across the 20 Ω resistor is: | 60 V | 12 V | 2.4 V | 0 V | The inductor current (3 A) can't change instantly, so 3 A flows through 20 Ω, giving 60 V: larger than the supply.
NUM2@2: A capacitor's voltage starts at 2.0 V and approaches 10 V with τ = 5.0 ms. What is its voltage after 5.0 ms, in V? | 7.06 | 1% | V | V = 10 + (2.0 − 10)e^{−1} = 10 − 8.0 × 0.368 = 7.06 V.
SA3@1,3: Explain why switching off the current in an inductive circuit can produce a voltage much larger than the supply, using the idea of continuity. | The inductor's current is proportional to the energy in its magnetic field and cannot change instantly. At the moment of switching it keeps flowing, so it must pass through whatever path is available. If that path has high resistance, or is an opening switch gap, V = IR across it becomes very large, and the back EMF L dI/dt is huge because the current is forced to fall quickly. | Inductor current continuous at switching ; Same current forced through a high-resistance path ; V = IR (or L dI/dt) far exceeds the supply

## Alternating current
S: Alternating current (AC) reverses direction periodically, usually sinusoidally. It's used for mains power because transformers can easily change its voltage for efficient transmission.
O: Describe a sinusoidal alternating voltage by its peak value, frequency and period
O: Calculate peak, peak-to-peak and rms values for mains electricity
O: Explain why AC is used for power distribution
PRE: Trigonometry and circular functions
LV: A level · Foundation
H: Description
E: V = V_{0} sin(ωt); I = I_{0} sin(ωt + φ); ω = 2πf
- UK/Europe: 230 V rms, 50 Hz; North America: 120 V, 60 Hz.
- Peak V_{0} = √2 × 230 = 325 V; peak-to-peak 650 V.
H: Why AC won
P: In the "war of the currents" (1880s–90s), the AC system of Westinghouse and Tesla beat Edison's DC because transformers could step AC up for low-loss transmission and down for safe use. Today high-voltage DC (HVDC) is used for very long lines and undersea cables, with power electronics for conversion.
H: Three-phase power
- Three sinusoids 120° apart; constant total power, efficient motors, less conductor material.
- Line voltage = √3 × phase voltage (400 V and 230 V in the UK).
H: Oscilloscope
- The trace shows peak and peak-to-peak values; the period is the horizontal length of one cycle × the time-base setting.
X: Mains peak and period?
> V_{0} = 230√2 = 325 V
> T = 1/f = 1/50 = 20 ms
K: AC power is quoted in rms values; the peak voltage of 230 V mains is 325 V.
!: An oscilloscope shows peak values; meters show rms values. The "230 V" of mains is rms.
T: Alternating current | Current that reverses direction periodically, usually varying sinusoidally with time
T: Peak value | The maximum value V_{0} (or I_{0}) of an alternating quantity in a cycle
SUM: V = V_{0} sin(2πft); UK mains is 230 V rms, 50 Hz, 325 V peak.
SUM: AC dominates distribution because transformers change its voltage easily.
EV: established | Mains values are set by standards: 230 V and 50 Hz in the UK.
SRC: OpenStax, University Physics Volume 2, section 15.1 "AC Sources" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/15-1-ac-sources
SRC: AQA, A-level Physics specification (7408), section 3.7.5.5 Alternating currents | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: Why is AC used for power distribution? | Transformers can efficiently step its voltage up and down.
Q: What is three-phase power? | Three AC supplies 120° apart, giving constant total power and efficient motors.
M1@1: UK mains frequency is: | 50 Hz | 60 Hz | 230 Hz | 100 Hz | UK and European mains alternates at 50 Hz; 60 Hz is the North American standard.
M2@2: The peak voltage of 230 V rms mains is about: | 325 V | 230 V | 163 V | 460 V | For a sine wave V_{0} = √2 × V_{rms} = 1.414 × 230 = 325 V.
M3@1: An oscilloscope trace of a sine wave spans 4.0 divisions per cycle with the time base at 5 ms per division. Its frequency is: | 50 Hz | 20 Hz | 200 Hz | 0.05 Hz | The period is 4.0 × 5 ms = 20 ms, so f = 1/T = 50 Hz.
NUM2@2: A sinusoidal supply has an rms voltage of 120 V. What is its peak-to-peak voltage, in V? | 339 | 1% | V | V_{0} = 120√2 = 170 V, and peak-to-peak is 2V_{0} = 339 V.
SA2@3: Explain why electricity is generated and distributed as AC rather than DC for most of the grid. | Transmission losses are I^{2}R, so power is best sent at high voltage and low current. AC can be stepped up and down efficiently by transformers, which work only with changing current, so it can be sent at hundreds of kilovolts and reduced to 230 V for homes. DC cannot be transformed this simply; HVDC is used only where power electronics are worth their cost, such as very long or undersea links. | Losses ∝ I^{2}, so high voltage is needed ; Transformers change AC voltage efficiently ; DC needs costly converters (HVDC for special cases)

## Root-mean-square values
S: The root-mean-square (rms) value of an alternating quantity is the steady DC value that would deliver the same average power to a resistor. It's how AC voltages and currents are normally quoted.
O: Define the rms value and relate it to the peak for a sinusoid
O: Calculate rms currents, voltages and average power in resistive AC circuits
O: Explain the power factor
PRE: Alternating current
LV: A level · Application
H: Definitions
E: V_{rms} = √(⟨V^{2}⟩)
E: V_{rms} = V_{0}/√2; I_{rms} = I_{0}/√2 :: sinusoid
E: P_{avg} = V_{rms}I_{rms} cos φ :: power factor cos φ
H: Other waveforms
- Square wave (±V_{0}): V_{rms} = V_{0}. Triangle or sawtooth: V_{0}/√3. Half-wave rectified sine: V_{0}/2.
- "True rms" meters handle non-sinusoidal waveforms; cheaper meters assume a sine.
H: Power factor
P: When current and voltage aren't in phase (inductive loads like motors), part of the current does no useful work but still heats the wires. Power factor correction (adding capacitors) brings them back into phase, reducing the current needed for the same real power.
X: A 230 V rms supply feeds a 46 Ω heater. I_{rms}, peak current, average power?
> I_{rms} = 230/46 = 5 A; I_{0} = 5√2 = 7.07 A
> P = 230 × 5 = 1150 W
K: For a resistor the average power is V_{rms}I_{rms} = ½V_{0}I_{0}, because sin^{2} averages to ½ over a cycle.
!: Average voltage of a sine over a cycle is zero; rms is the meaningful measure for power.
T: Root-mean-square value | The square root of the mean of the squared values over a cycle: the DC value giving the same heating
T: Power factor | cos φ, the fraction of apparent power V_{rms}I_{rms} that is real power
SUM: V_{rms} = V_{0}/√2 for a sinusoid; P = V_{rms}I_{rms} for a resistor.
SUM: Out-of-phase current reduces real power by the factor cos φ.
EV: established | The rms definition follows from the time-average of I^{2}R heating.
SRC: OpenStax, University Physics Volume 2, section 15.4 "Power in an AC Circuit" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/15-4-power-in-an-ac-circuit
SRC: AQA, A-level Physics specification (7408), section 3.7.5.5 Alternating currents | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: Define the rms value of an AC voltage. | The square root of the mean of the squared voltage; the DC equivalent for heating.
Q: What is the power factor? | cos φ, the fraction of apparent power that's real power.
M1@1: A sine wave with peak 10 V has rms: | 7.07 V | 10 V | 5 V | 14.1 V | V_{rms} = V_{0}/√2 = 10/1.414 = 7.07 V for a sinusoid.
M2@1: The rms of a square wave of amplitude 5 V is: | 5 V | 3.5 V | 2.5 V | 7.1 V | V^{2} = 25 V^{2} at every instant, so its mean is 25 and the rms is 5 V; the √2 factor applies only to sinusoids.
M3@2: A lamp is rated 12 V, 24 W for DC. On an AC supply it gives the same brightness when the AC peak voltage is: | 17 V | 12 V | 8.5 V | 24 V | Equal brightness needs equal average power, so V_{rms} = 12 V and V_{0} = 12√2 = 17 V.
NUM2@2: An AC supply of 230 V rms drives 2.0 A rms through a motor with power factor 0.80. Find the real power, in W. | 368 | 1% | W | P = V_{rms}I_{rms} cos φ = 230 × 2.0 × 0.80 = 368 W.
SA2@1,3: Explain why the rms value, rather than the average value, is used to describe an alternating current. | Over a full cycle a sinusoidal current is positive half the time and negative half the time, so its average is zero, yet it still heats a resistor. Heating depends on I^{2}R, which is positive whatever the direction. The rms value is the square root of the mean of I^{2}, so it is the steady current that would produce the same average heating, making power calculations work as for DC. | Mean of a sine over a cycle is zero ; Heating depends on I^{2}, always positive ; rms gives the equivalent DC heating current

## Impedance and reactance
S: Impedance generalises resistance to AC: it includes the resistance and the reactances of capacitors and inductors, which depend on frequency and shift the phase between voltage and current.
O: Calculate inductive and capacitive reactance and state their phase relationships
O: Calculate the impedance and phase angle of a series RLC circuit
O: Explain why only resistance dissipates average power
PRE: Root-mean-square values
LV: Year 1 · Application
H: Reactances
E: X_{L} = ωL :: current lags voltage by 90°
E: X_{C} = 1/(ωC) :: current leads voltage by 90°
- Mnemonic: CIVIL (in a capacitor C, I leads V; V leads I in an inductor L).
H: Impedance
E: Z = R + i(X_{L} − X_{C}) :: series, complex form
E: |Z| = √(R^{2} + (X_{L} − X_{C})^{2}); tan φ = (X_{L} − X_{C})/R
E: V_{rms} = I_{rms}|Z|
- Complex impedances combine like resistances (series add, parallel reciprocals add).
- Reactances store and return energy; only R dissipates it.
X: R = 30 Ω, X_{L} = 80 Ω, X_{C} = 40 Ω in series at 100 V rms. Current and phase?
> |Z| = √(30^{2} + 40^{2}) = 50 Ω
> I = 100/50 = 2 A; φ = arctan(40/30) = 53°, current lagging
K: Reactance is frequency-dependent: inductors oppose high frequencies, capacitors oppose low ones.
!: Impedances don't add as plain numbers unless they're in phase; use complex numbers or phasors.
T: Reactance | The opposition of an inductor or capacitor to AC, X = V_{rms}/I_{rms}, with a 90° phase shift
T: Impedance | The total opposition to AC, Z = V_{rms}/I_{rms}, combining resistance and reactance
SUM: X_{L} = ωL, X_{C} = 1/ωC; |Z| = √(R^{2} + (X_{L} − X_{C})^{2}).
SUM: Reactances shift phase and store energy; resistance dissipates it.
EV: established | Complex impedance is the standard, exact method for linear AC circuits in steady state.
SRC: OpenStax, University Physics Volume 2, section 15.2 "Simple AC Circuits" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/15-2-simple-ac-circuits
SRC: OpenStax, University Physics Volume 2, section 15.3 "RLC Series Circuits with AC" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/15-3-rlc-series-circuits-with-ac
Q: What is the reactance of a capacitor? | X_{C} = 1/(ωC).
Q: Which component makes current lead the voltage? | A capacitor.
M1@1: The reactance of a 0.1 H inductor at 50 Hz is: | 31 Ω | 5 Ω | 0.1 Ω | 314 Ω | X_{L} = 2πfL = 2π × 50 × 0.1 = 31.4 Ω; forgetting the 2π gives 5 Ω.
M2@3: A pure inductor dissipates: | No average power | Maximum power | Power I^{2}X_{L} | Power V^{2}/X_{L} | With a 90° phase difference, energy taken in one quarter cycle is returned in the next, so the average power is zero.
M3@2: A series circuit has R = 40 Ω, X_{L} = 20 Ω and X_{C} = 50 Ω. Its impedance and phase are: | 50 Ω, current leading | 110 Ω, current lagging | 50 Ω, current lagging | 70 Ω, in phase | X_{L} − X_{C} = −30 Ω, so |Z| = √(40^{2} + 30^{2}) = 50 Ω; the net reactance is capacitive, so the current leads.
NUM2@1: Find the reactance, in Ω, of a 10 μF capacitor at 1.0 kHz. | 15.9 | 2% | Ω | X_{C} = 1/(2πfC) = 1/(2π × 1000 × 10^{-5}) = 15.9 Ω.
SA3@1,3: Explain why the current through a capacitor connected to a sinusoidal supply leads the voltage by 90°. | The capacitor's charge is Q = CV, so the current I = dQ/dt = C dV/dt. The current is therefore proportional to the rate of change of voltage, not to the voltage itself. For V = V_{0} sin ωt, dV/dt is greatest when V crosses zero and zero when V is at its peak, so I = ωCV_{0} cos ωt, which reaches its maximum a quarter cycle before V. | I = C dV/dt ; Current peaks when V is changing fastest (V = 0) ; cos ωt leads sin ωt by 90°

## Phasor diagrams
S: Phasors represent sinusoidal quantities as rotating arrows: length for amplitude, angle for phase. They turn AC calculus into vector geometry, making phase relationships in circuits easy to see.
O: Represent sinusoids as phasors and add them as vectors
O: Draw a phasor diagram for a series RLC circuit and find the supply voltage
O: Explain why component voltages can exceed the supply voltage
PRE: Complex numbers
LV: Year 1 · Application
H: The idea
- V_{0} cos(ωt + φ) = Re(V_{0}e^{iφ}e^{iωt}): the phasor is V_{0}e^{iφ}.
- All phasors rotate at ω together, so we draw them frozen at one instant.
- Adding sinusoids of the same frequency = adding phasors as vectors.
H: Series RLC phasor diagram
- Draw current I as the reference (it's the same through all components).
- V_{R} in phase with I; V_{L} 90° ahead; V_{C} 90° behind.
- Total V is the vector sum: |V| = √(V_{R}^{2} + (V_{L} − V_{C})^{2}).
H: Parallel circuits
- Voltage is common (the reference); branch currents are drawn and added.
X: V_{R} = 6 V, V_{L} = 12 V, V_{C} = 4 V in a series circuit. Supply voltage?
> V = √(6^{2} + (12 − 4)^{2}) = √(36 + 64) = 10 V
> V_{L} alone exceeds the supply voltage
K: Choose as reference whatever is common: current in series circuits, voltage in parallel ones.
!: Individual component voltages in an AC circuit can exceed the supply; they don't add arithmetically.
T: Phasor | A rotating vector (complex number) whose length is a sinusoid's amplitude and whose angle is its phase
T: Phase angle | The angle by which one sinusoid leads or lags another
SUM: Phasors add as vectors; V_{L} and V_{C} point in opposite directions.
SUM: |V| = √(V_{R}^{2} + (V_{L} − V_{C})^{2}) in a series circuit.
EV: established | Phasor addition is exact for sinusoids of the same frequency.
SRC: OpenStax, University Physics Volume 2, section 15.3 "RLC Series Circuits with AC" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/15-3-rlc-series-circuits-with-ac
SRC: OpenStax, University Physics Volume 2, section 15.2 "Simple AC Circuits" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/15-2-simple-ac-circuits
Q: What is a phasor? | A complex number (rotating vector) representing a sinusoid's amplitude and phase.
Q: In a series circuit, which phasor is used as the reference? | The current, since it's common to all components.
M1@2: In a series RLC phasor diagram, V_{L} and V_{C} point: | In opposite directions | In the same direction | Perpendicular to each other | Along I | V_{L} is 90° ahead of I and V_{C} is 90° behind it, so they are 180° apart and partly cancel.
M2@1: Two sinusoids of amplitude 3 and 4 with 90° phase difference add to amplitude: | 5 | 7 | 1 | 12 | Perpendicular phasors add by Pythagoras: √(3^{2} + 4^{2}) = 5; 7 would need them in phase.
M3@2,3: In a series RLC circuit at 20 V supply, V_{R} = 12 V and V_{C} = 30 V. V_{L} could be: | 46 V | 38 V | 2 V | 22 V | 20^{2} = 12^{2} + (V_{L} − 30)^{2} gives V_{L} − 30 = ±16, so V_{L} = 46 V or 14 V; only 46 V is offered.
NUM2@2: In a series RC circuit V_{R} = 8.0 V rms and V_{C} = 6.0 V rms. Find the supply voltage, in V rms. | 10 | 1% | V | V_{R} and V_{C} are 90° apart, so V = √(8.0^{2} + 6.0^{2}) = 10 V.
SA2@3: A student measures 6 V across R, 12 V across L and 4 V across C in a series circuit on a 10 V supply, and says the meter must be faulty because 6 + 12 + 4 ≠ 10. Explain why the readings are consistent. | The voltages are not in phase, so they add as phasors, not as numbers. V_{R} is in phase with the current, V_{L} leads by 90° and V_{C} lags by 90°. V_{L} and V_{C} partly cancel, leaving 8 V at 90° to V_{R}, and √(6^{2} + 8^{2}) = 10 V, which equals the supply. | Component voltages differ in phase ; V_{L} and V_{C} oppose: net 8 V ; Pythagoras with V_{R} gives 10 V

## Resonance in AC circuits
S: A series RLC circuit resonates when the inductive and capacitive reactances cancel. The impedance is then smallest and the current largest and in phase with the voltage. Resonance lets circuits pick out one frequency.
O: State the conditions at series resonance and calculate the resonant frequency
O: Relate quality factor to bandwidth and voltage magnification
O: Contrast series and parallel resonance and their uses
PRE: Impedance and reactance
LV: Year 1 · Physical reasoning
H: Series resonance
E: ω_{0} = 1/√(LC); X_{L} = X_{C}; Z = R
E: Q = ω_{0}L/R; bandwidth Δω = ω_{0}/Q
- Voltage across L or C at resonance = Q × supply voltage (can be large).
H: Parallel resonance
- Impedance is maximum at resonance (ideally infinite): current from the supply is minimum.
- Used as a "tank circuit" in oscillators and to reject (or select) frequencies.
H: Applications
- Radio tuners: a variable C sets f_{0} to the station's frequency.
- Wireless charging and RFID: coupled resonant coils; metal detectors, induction hobs, MRI coils.
X: A radio tuner with L = 2 μH must receive 100 MHz. Required C?
> C = 1/(ω_{0}^{2}L) = 1/((2π × 10^{8})^{2} × 2 × 10^{-6})
> C = 1.3 pF
K: At resonance the inductor and capacitor exchange energy with each other, so the supply only has to make up the losses in R.
!: High-Q resonance gives large voltages across L and C even from a small supply; components must be rated accordingly.
T: Resonant frequency | The frequency f_{0} = 1/(2π√(LC)) at which X_{L} = X_{C}
T: Bandwidth | The width of the frequency range over which the response is within half power (−3 dB) of its peak
SUM: At series resonance Z = R, I is maximum and in phase with V.
SUM: High Q means a narrow bandwidth and large voltages across L and C.
EV: established | Resonance in RLC circuits is exactly described by the series impedance formula.
SRC: OpenStax, University Physics Volume 2, section 15.5 "Resonance in an AC Circuit" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/15-5-resonance-in-an-ac-circuit
SRC: AQA, A-level Physics specification (7408), section 3.13.3.1 LC resonance filters | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What happens to impedance at series resonance? | It's minimum, equal to R.
Q: What is the bandwidth of a resonant circuit? | Δω = ω_{0}/Q.
M1@1: At series resonance, current and voltage are: | In phase | 90° apart | 180° apart | Both zero | X_{L} and X_{C} cancel, leaving pure resistance, so there is no phase difference between supply voltage and current.
M2@3: A parallel LC circuit at resonance draws: | Minimum current from the supply | Maximum current | Infinite current | Zero voltage | Its impedance is at a maximum, so the supply current is smallest while current circulates between L and C.
M3@2: A series RLC circuit has f_{0} = 10 kHz and Q = 50. Its bandwidth is: | 200 Hz | 500 kHz | 50 Hz | 10 kHz | Bandwidth is f_{0}/Q, so Δf = 10 000/50 = 200 Hz: a higher Q gives a narrower peak.
NUM2@1: Find the resonant frequency, in kHz, of a series circuit with L = 1.0 mH and C = 0.25 μF. | 10.1 | 2% | kHz | f_{0} = 1/(2π√(10^{-3} × 2.5 × 10^{-7})) = 1/(2π × 1.58 × 10^{-5}) = 1.01 × 10^{4} Hz.
SA3@1,2: Explain how a radio receiver uses resonance to select one station, and why a high Q helps. | The aerial picks up signals from many stations at different frequencies. A tuned LC circuit has a large response only near its resonant frequency 1/(2π√(LC)); adjusting C moves this frequency to match the wanted station. A high Q gives a narrow bandwidth, so neighbouring stations' frequencies fall outside the peak and are rejected, although Q must not be so high that the band needed for the signal itself is cut. | LC response peaks at f_{0} = 1/(2π√(LC)) ; Variable C tunes f_{0} to the station ; High Q: narrow bandwidth rejects neighbours

## Transformers
S: A transformer changes AC voltage using electromagnetic induction between two coils on an iron core. It's why electricity can be generated at moderate voltage, transmitted at very high voltage and used safely at low voltage.
O: Use the transformer equations for voltage and current
O: Explain how a transformer works and why it needs AC
O: Describe the causes of energy loss and how they are reduced
PRE: Electrical power and energy
LV: GCSE and A level · Application
H: The equations
E: V_{s}/V_{p} = N_{s}/N_{p}
E: I_{s}/I_{p} = N_{p}/N_{s} :: ideal, 100% efficient
E: efficiency = I_{s}V_{s}/(I_{p}V_{p})
- Step-up: N_{s} > N_{p}; step-down: N_{s} < N_{p}.
- The alternating primary current makes an alternating flux in the core, which induces an EMF in the secondary. DC gives no changing flux, so no output.
H: Losses
- Copper (I^{2}R) losses in the windings.
- Eddy currents in the core: reduced by laminations.
- Hysteresis in the core: reduced with soft iron or silicon steel.
- Flux leakage: reduced by winding the coils on top of each other.
- Large power transformers exceed 99% efficiency.
H: Impedance transformation
E: Z_{p} = (N_{p}/N_{s})^{2}Z_{s}
P: Transformers can match a load to a source: an 8 Ω speaker can look like a few kΩ to a valve amplifier. Isolation transformers separate circuits for safety while passing power.
X: A transformer steps 230 V down to 12 V with 920 primary turns. Secondary turns? Primary current if the secondary gives 2 A (ideal)?
> N_{s} = 920 × 12/230 = 48
> I_{p} = 2 × 12/230 = 0.104 A
K: A transformer trades voltage for current: in an ideal one the power in equals the power out.
!: Transformers don't create power: stepping voltage up steps current down.
T: Turns ratio | The ratio N_{s}/N_{p} of secondary to primary turns, which sets the voltage ratio
T: Eddy currents | Circulating currents induced in a conducting core by changing flux, which waste energy as heat
SUM: V_{s}/V_{p} = N_{s}/N_{p}; ideally V_{p}I_{p} = V_{s}I_{s}.
SUM: Laminated soft-iron cores and thick windings keep losses small.
EV: established | Transformer action follows from Faraday's law; real transformers approach the ideal equations closely.
SRC: OpenStax, University Physics Volume 2, section 15.6 "Transformers" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/15-6-transformers
SRC: AQA, A-level Physics specification (7408), section 3.7.5.6 The operation of a transformer | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: State the transformer equation. | V_{s}/V_{p} = N_{s}/N_{p}.
Q: Why are transformer cores laminated? | To reduce eddy-current losses.
M1@1: A transformer with 100 primary and 2000 secondary turns on 12 V AC gives: | 240 V | 0.6 V | 12 V | 2400 V | V_{s} = V_{p}N_{s}/N_{p} = 12 × 2000/100 = 240 V, a step-up by 20 times.
M2@2: Why don't transformers work on DC? | There's no changing flux to induce an EMF | DC is too high a voltage | Cores saturate only on AC | DC flows backwards | Faraday's law needs a changing flux, dΦ/dt; steady DC gives a constant flux and no induced EMF.
M3@1,3: A transformer takes 0.50 A from 230 V and delivers 9.0 A at 12 V. Its efficiency is: | 94% | 100% | 52% | 106% | Input 230 × 0.50 = 115 W, output 12 × 9.0 = 108 W; efficiency = 108/115 = 0.94.
NUM2@1: A step-down transformer has 4600 primary turns on 230 V. How many secondary turns give 5.0 V? | 100 | 1% | turns | N_{s} = N_{p}V_{s}/V_{p} = 4600 × 5.0/230 = 100 turns.
SA3@2,3: Explain how a transformer steps down voltage and name two ways its energy losses are reduced. | An alternating current in the primary coil produces an alternating magnetic flux, which the iron core links to the secondary coil. The changing flux linkage induces an EMF in the secondary by Faraday's law; with fewer secondary turns the induced voltage is smaller, in the ratio N_{s}/N_{p}. Losses are reduced by laminating the core (eddy currents), using soft iron (hysteresis) and thick low-resistance windings (I^{2}R heating). | Alternating primary current gives alternating flux in core ; Changing flux induces EMF in secondary, ratio N_{s}/N_{p} ; Laminations, soft iron or thick windings reduce losses

## Rectification
S: Rectification converts AC into DC using diodes, which conduct one way only. With smoothing capacitors and regulators, it turns mains power into the steady low-voltage DC that electronics need.
H: Circuits
- **Half-wave**: one diode; passes one half of each cycle; ripple at f.
- **Full-wave (bridge)**: four diodes; both halves pass with the same polarity; ripple at 2f.
- **Centre-tapped**: two diodes and a centre-tapped transformer.
H: Smoothing
E: ΔV ≈ I/(fC) (half-wave), I/(2fC) (full-wave) :: ripple voltage
- A large capacitor charges at peaks and supplies current between them.
- Larger C or higher frequency (switch-mode supplies at tens of kHz) means less ripple and smaller components.
H: Regulation
- Zener diodes or linear regulator chips give a stable output despite ripple and load changes.
- Switch-mode power supplies are much more efficient (phone chargers ~90%).
X: Full-wave rectified 50 Hz supply delivers 0.5 A; smoothing capacitor 2200 μF. Ripple?
> ΔV = 0.5/(2 × 50 × 2.2 × 10^{-3}) = 2.3 V
!: Each silicon diode in the conducting path drops ~0.7 V; a bridge loses ~1.4 V from the peak.
Q: Why does full-wave rectification give less ripple than half-wave? | The capacitor is recharged twice per cycle (ripple at 2f).
Q: What does a smoothing capacitor do? | Stores charge at the peaks and supplies current between them, reducing ripple.
M1: A bridge rectifier uses: | Four diodes | One diode | Two transistors | A capacitor only | Full-wave.
M2: Increasing the smoothing capacitance: | Reduces ripple | Increases ripple | Has no effect | Lowers DC level to zero | ΔV ∝ 1/C.

## Filters and frequency response
S: Filters pass some frequencies and block others. Built from resistors, capacitors, inductors and amplifiers, they clean up signals, separate audio bands, select radio stations and remove noise.
H: Types
- **Low-pass**: passes below f_{c} (anti-aliasing, smoothing).
- **High-pass**: passes above f_{c} (removing DC offsets, rumble).
- **Band-pass**: passes a band (radio tuning).
- **Band-stop (notch)**: removes a band (50 Hz hum).
H: Characteristics
E: H(ω) = V_{out}/V_{in}; gain in dB = 20 log_{10}|H|
- Order: each reactive element adds −20 dB per decade of roll-off.
- Passive filters (R, L, C) can't amplify; active filters (with op-amps) can, and avoid inductors.
- Classic designs: Butterworth (flattest passband), Chebyshev (steeper, ripple), Bessel (best phase/pulse response).
H: Digital filters
P: Most filtering now happens in software on sampled signals: FIR and IIR filters in phones, audio processing and communications. Analogue filters remain essential before sampling (anti-aliasing) and in RF front ends.
X: A second-order Butterworth low-pass at 1 kHz. Attenuation at 10 kHz?
> −40 dB per decade beyond f_{c}
> About −40 dB (a factor of 100 in amplitude)
!: Every real filter shifts phase as well as amplitude; that matters for audio and control systems.
Q: What is a notch filter used for? | Removing a narrow band of frequencies, like mains hum.
Q: How steeply does an nth-order filter roll off? | About 20n dB per decade.
M1: A Butterworth filter is designed for: | A maximally flat passband | The steepest roll-off | Perfect phase | Amplification only | Flat response.
M2: Gain of −6 dB corresponds to an amplitude ratio of about: | 0.5 | 0.25 | 0.1 | 0.7 | 20 log 0.5.

## Electrical measurement
S: Measuring voltage, current and resistance accurately means choosing the right instrument and connecting it so it disturbs the circuit as little as possible.
H: Meters
- **Ammeter**: in series; ideally zero resistance.
- **Voltmeter**: in parallel; ideally infinite resistance (digital meters ~10 MΩ).
- **Ohmmeter**: passes a known current; measure with power off.
- **Multimeters** combine all three; **clamp meters** measure current by its magnetic field without breaking the circuit.
H: Loading errors
P: A 10 MΩ voltmeter across a 1 MΩ resistor forms a parallel combination of 0.91 MΩ, changing the very voltage it measures. For low resistances, lead resistance dominates; four-wire (Kelvin) measurement separates current-carrying and voltage-sensing leads.
H: Precision methods
- Potentiometers and bridges compare against standards with null detection (no current drawn).
- Standards: the volt from the Josephson effect; the ohm from the quantum Hall effect.
X: A voltmeter (R_{V} = 100 kΩ) reads across 100 kΩ in a divider with another 100 kΩ on 10 V. Reading?
> Parallel 100 kΩ ∥ 100 kΩ = 50 kΩ
> V = 10 × 50/150 = 3.3 V instead of 5 V
!: Never connect an ammeter in parallel across a voltage source: its tiny resistance draws a huge current.
Q: Why should voltmeters have high resistance? | To draw negligible current and not change the circuit's voltages.
Q: What is four-wire measurement? | Separate leads carry current and sense voltage, eliminating lead resistance errors.
M1: An ammeter is connected: | In series | In parallel | Either | Across the supply | Same current flows through.
M2: Today the volt is realised using: | The Josephson effect | A standard cell | A thermocouple | A capacitor | Quantum standard.

## Circuit analysis methods
S: Beyond series and parallel rules, systematic methods solve any linear circuit: nodal and mesh analysis, superposition, and source transformations. They're how engineers and circuit simulators handle complex networks.
H: Methods
- **Nodal analysis**: unknown node voltages; KCL at each node. Best when there are many parallel branches.
- **Mesh analysis**: unknown loop currents; KVL in each mesh. Best for planar circuits with many series elements.
- **Superposition**: in a linear circuit, find the response to each source alone (others replaced by their internal resistance) and add.
- **Source transformation**: a voltage source ε with series R ↔ a current source ε/R with parallel R.
H: AC circuits
- The same methods work with complex impedances and phasors.
- Circuit simulators (SPICE) build a nodal admittance matrix and solve it, including nonlinear components by iteration.
X: Superposition: 10 V source with 2 Ω, and a 2 A current source, both feeding a 3 Ω load in parallel arrangement. Current in 3 Ω?
> Voltage source alone (current source open): 10/(2 + 3) = 2 A
> Current source alone (voltage source shorted): 2 × 2/(2 + 3) = 0.8 A
> Total 2.8 A
!: Superposition works for currents and voltages in linear circuits but not for power (power is quadratic).
P: **Investigate with the lab.** Balance the Wheatstone bridge so the meter reads zero (below 1 mA). Use the balance condition to find the unknown resistor.
IX: circuits
Q: What is the principle of superposition in circuits? | In a linear circuit, the response to several sources equals the sum of responses to each source acting alone.
Q: When is nodal analysis preferable? | When the circuit has fewer nodes than meshes, often with many parallel branches.
M1: In superposition, an inactive voltage source is replaced by: | A short circuit | An open circuit | A resistor of 1 Ω | A capacitor | Ideal source has zero internal resistance.
M2: Can superposition be applied directly to power? | No, power isn't linear in current | Yes, always | Only in AC | Only for resistors | P ∝ I^{2}.
M2: When a Wheatstone bridge is balanced, what is true? | No current flows through the meter | The current through every resistor is equal | All four resistors are equal | The battery supplies no current | At balance, the two midpoints are at the same potential, so the meter reads zero.

## Thevenin and Norton equivalents
S: Any linear network seen from two terminals behaves like a single voltage source with a series resistance (Thevenin) or a current source with a parallel resistance (Norton). This simplifies analysing how a network drives different loads.
H: Thevenin equivalent
E: V_{Th} = open-circuit voltage at the terminals
E: R_{Th} = resistance seen with sources turned off (or V_{oc}/I_{sc})
H: Norton equivalent
E: I_{N} = short-circuit current; R_{N} = R_{Th}
E: V_{Th} = I_{N}R_{Th}
H: Uses
- Find load current for many different loads quickly: I = V_{Th}/(R_{Th} + R_{L}).
- Maximum power transfer: R_{L} = R_{Th}.
- Model sensors, batteries and amplifier outputs.
X: A 12 V source with a 4 Ω and 6 Ω potential divider; output across the 6 Ω. Thevenin equivalent?
> V_{Th} = 12 × 6/10 = 7.2 V
> R_{Th} = 4 ∥ 6 = 2.4 Ω
!: Thevenin equivalents only describe behaviour at the terminals; they don't tell you the power dissipated inside the original network.
Q: How do you find the Thevenin resistance? | Turn off all independent sources and find the resistance between the terminals (or V_{oc}/I_{sc}).
Q: How are Thevenin and Norton equivalents related? | Same resistance; V_{Th} = I_{N}R_{Th}.
M1: A network's open-circuit voltage is 10 V and short-circuit current 2 A. R_{Th} = ? | 5 Ω | 20 Ω | 10 Ω | 0.2 Ω | V_{oc}/I_{sc}.
M2: Maximum power is delivered to a load when R_{L} equals: | R_{Th} | 0 | Infinity | 2R_{Th} | Matching.

## Operational amplifiers
S: An operational amplifier (op-amp) is a high-gain differential amplifier on a chip. With negative feedback, simple resistor networks make it amplify, add, subtract, integrate, differentiate and filter signals precisely.
H: Ideal op-amp rules (with negative feedback)
- Open-loop gain → ∞; input currents → 0; output adjusts so V_{+} = V_{−} (virtual short).
H: Standard circuits
E: G = −R_{f}/R_{in} :: inverting amplifier
E: G = 1 + R_{f}/R_{1} :: non-inverting amplifier
E: V_{out} = −R_{f}(V_{1}/R_{1} + V_{2}/R_{2} + …) :: summing amplifier
E: V_{out} = −(1/RC)∫V_{in}dt :: integrator
- Voltage follower (G = 1): buffers a high-impedance source.
- Comparator (no feedback): output saturates high or low.
H: Real limitations
- Gain–bandwidth product (e.g. 1 MHz): gain of 100 only up to 10 kHz.
- Slew rate, offset voltage, bias currents, output swing limited by supply rails.
X: Non-inverting amplifier with R_{f} = 90 kΩ, R_{1} = 10 kΩ, input 0.2 V. Output?
> G = 1 + 9 = 10
> V_{out} = 2.0 V
!: The "virtual short" rule only holds with negative feedback and when the output isn't saturated.
Q: What is the gain of an inverting amplifier? | −R_{f}/R_{in}.
Q: What is a voltage follower used for? | Buffering: high input impedance, low output impedance, gain 1.
M1: An inverting amplifier with R_{f} = 50 kΩ, R_{in} = 5 kΩ has gain: | −10 | 10 | −11 | 11 | −R_{f}/R_{in}.
M2: An op-amp with a 1 MHz gain–bandwidth product set to gain 50 has bandwidth: | 20 kHz | 50 MHz | 1 MHz | 50 kHz | GBP/G.

## Semiconductor circuit fundamentals
S: Semiconductor devices, chiefly diodes and transistors, control current in ways resistors can't: one-way flow, amplification and switching. Billions of transistors make every modern processor.
H: Diodes
E: I = I_{s}(e^{V/(nV_{T})} − 1), V_{T} = k_{B}T/e ≈ 26 mV :: Shockley equation
- Forward drop ~0.6–0.7 V (silicon); ~0.3 V (Schottky); LEDs 1.8–3.5 V depending on colour.
- Zener diodes break down at a set reverse voltage: voltage references.
H: Bipolar transistors (BJT)
- Small base current controls large collector current: I_{C} = βI_{B} (β ~ 100).
- Used as amplifiers (common emitter) and switches.
H: MOSFETs
- Gate voltage controls a channel; almost no gate current.
- Switch on above the threshold voltage (~0.5–2 V).
- CMOS logic pairs n- and p-type MOSFETs: power only drawn when switching.
- Power MOSFETs switch hundreds of amps in electric vehicles.
H: Switching circuits
P: As a switch, a transistor is either fully off or saturated on. Logic gates, memory and microprocessors are built from CMOS switches. Moore's law: transistor counts doubled roughly every two years, from 2300 in 1971 to over 100 billion today.
X: An LED (2.0 V, 20 mA) from 5 V. Series resistor?
> R = (5 − 2.0)/0.020 = 150 Ω
!: Always use a current-limiting resistor with an LED; its current rises steeply with voltage and it will burn out.
Q: What is the forward voltage of a silicon diode? | About 0.6–0.7 V.
Q: Why does CMOS logic use little power when idle? | Only one of each complementary transistor pair conducts, so there's no static current path.
M1: In a BJT, collector current is controlled by: | Base current | Collector voltage only | Emitter resistance | Temperature only | I_{C} = βI_{B}.
M2: A MOSFET's gate draws: | Almost no current | Large current | The same as the drain | Negative current | Insulated gate.
`;
