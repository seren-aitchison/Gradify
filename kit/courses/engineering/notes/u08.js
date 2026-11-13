// EngineerGradify Electrical Circuits and Electronics (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## Charge, current, voltage and power
LV: Year 1 · Foundation
S: Every circuit calculation rests on four quantities: charge, current, voltage and power. This lesson defines them, relates them through simple equations and introduces energy and the passive sign convention.
O: Define charge, current, voltage, power and energy with their SI units
O: Calculate current, power and energy in simple circuits
O: Apply the passive sign convention to decide whether an element absorbs or delivers power
PRE: SI units and dimensional analysis
H: The basic quantities
- **Charge** Q is measured in coulombs (C). An electron carries −1.602 × 10^{-19} C.
- **Current** I is the rate of flow of charge, in amperes (A). By convention, **conventional current** flows from positive to negative, opposite to electron flow.
- **Voltage** (potential difference) V is the energy transferred per unit charge, in volts (V): 1 V = 1 J/C.
- **Power** P is the rate of energy transfer, in watts (W).
E: I = dQ/dt, or Q = It for a steady current :: current is rate of flow of charge
E: V = W ÷ Q :: voltage is energy per unit charge
E: P = VI :: power in any element
E: W = Pt :: energy over time t; 1 kWh = 3.6 MJ
H: The passive sign convention
P: If current enters an element at its positive voltage terminal, the element **absorbs** power P = VI (a resistor, or a battery being charged). If current leaves at the positive terminal, the element **delivers** power. In any circuit, total power delivered equals total power absorbed, a statement of conservation of energy.
X: An electric kettle.
> A 3 kW kettle runs from a 230 V supply.
> Current: I = P ÷ V = 3000 ÷ 230 = 13.0 A.
> In 5 minutes it uses W = Pt = 3000 × 300 = 900 kJ.
> In kilowatt-hours: 3 kW × (5 ÷ 60) h = 0.25 kWh.
K: Current is flow of charge, voltage is energy per charge, and power is their product; energy is power multiplied by time.
!: Confusing power (W) with energy (J or kWh). Electricity bills charge for energy, in kilowatt-hours, not for power.
EV: established | The definitions of the ampere, volt and watt follow the International System of Units, revised in 2019 to fix the value of the elementary charge.
T: Current | The rate of flow of electric charge, measured in amperes
T: Voltage | Energy transferred per unit charge between two points, measured in volts
T: Passive sign convention | Current entering the positive terminal means the element absorbs power
SUM: I = Q/t, V = W/Q, P = VI.
SUM: Energy is power × time; 1 kWh = 3.6 MJ.
SUM: Power delivered equals power absorbed.
SRC: Bureau International des Poids et Mesures, The International System of Units (SI Brochure), 9th edition | standard | 2019 | https://www.bipm.org/en/publications/si-brochure
SRC: Hughes E. (rev. Hiley J., Brown K. and McKenzie Smith I.), Electrical and Electronic Technology, 12th edition, Pearson | secondary | 2016
Q: What is one volt? | One joule of energy transferred per coulomb of charge.
Q: How many joules are in one kilowatt-hour? | 3.6 × 10^{6} J (3.6 MJ).
M1#engineering-u08-01-q1@1: What is the SI unit of electric charge? | The coulomb | The ampere | The volt | The watt | Charge is measured in coulombs; the ampere is one coulomb per second.
M2#engineering-u08-01-q2@2: A current of 2 A flows for 30 s. How much charge passes? | 60 C | 15 C | 0.067 C | 32 C | Charge is current multiplied by time: Q = It = 2 × 30 = 60 C.
NUM2#engineering-u08-01-q3@2: A 60 W lamp runs on a 230 V supply. What current does it draw, in A? | 0.261 | 0.005 | A | I = P ÷ V = 60 ÷ 230 = 0.261 A.
M3#engineering-u08-01-q4@3: Current of 2 A leaves the positive terminal of a 12 V element. What is happening? | It delivers 24 W | It absorbs 24 W | It absorbs 6 W | It delivers 6 W | Current leaving the positive terminal means the element is a source delivering P = VI = 24 W.
SA3#engineering-u08-01-q5@2,3: A 2 kW heater runs for 3 hours a day for 30 days at 25p per kWh. Calculate the energy used and the cost, and explain the difference between power and energy in your answer. | Energy = 2 kW × 3 h × 30 = 180 kWh, costing 180 × £0.25 = £45. Power (2 kW) is the rate of energy use; energy is power multiplied by time, which is what the supplier charges for. | Energy 180 kWh ; Cost £45 ; Power is a rate ; Energy = power × time

## Ohm's law and resistor networks
LV: Year 1 · Foundation
S: Ohm's law links voltage, current and resistance, and lets complicated networks of resistors be reduced to a single equivalent. This lesson covers resistance and resistivity, series and parallel combinations, and the voltage and current divider rules.
O: Apply Ohm's law and calculate resistance from resistivity
O: Reduce series and parallel resistor networks to an equivalent resistance
O: Use the voltage divider and current divider rules
PRE: Charge, current, voltage and power
H: Resistance
E: V = IR :: Ohm's law, for a linear (ohmic) resistor
E: R = ρL ÷ A :: resistance from resistivity ρ, length L and area A
P: Power dissipated in a resistor is P = I^{2}R = V^{2}/R. Resistance of metals rises with temperature. Not every device is ohmic: a filament lamp or a diode has a non-linear current-voltage graph.
H: Series and parallel
- **Series**: the same current flows through each resistor; R_{eq} = R_{1} + R_{2} + …
- **Parallel**: the same voltage is across each resistor; 1/R_{eq} = 1/R_{1} + 1/R_{2} + …; for two, R_{eq} = R_{1}R_{2} ÷ (R_{1} + R_{2}).
- The equivalent of resistors in parallel is always **less than** the smallest of them.
H: Divider rules
- **Voltage divider**: for two resistors in series across V, the voltage across R_{2} is V × R_{2} ÷ (R_{1} + R_{2}).
- **Current divider**: for two resistors in parallel carrying total current I, the current in R_{1} is I × R_{2} ÷ (R_{1} + R_{2}): the larger share goes through the smaller resistor.
X: A series-parallel network.
> A 6 Ω resistor is in series with a parallel pair of 12 Ω and 6 Ω, across a 20 V supply.
> Parallel pair: 12 × 6 ÷ (12 + 6) = 4 Ω. Total: 6 + 4 = 10 Ω.
> Supply current: 20 ÷ 10 = 2 A. Voltage across the pair: 2 × 4 = 8 V.
> Currents: 8 ÷ 12 = 0.667 A in the 12 Ω and 8 ÷ 6 = 1.333 A in the 6 Ω, which sum to 2 A.
K: Series resistances add; parallel conductances add; the divider rules give voltages and currents without solving the whole circuit.
!: Using the voltage divider rule when a load is connected across the output. The load is in parallel with R_{2} and changes the result.
EV: established | Ohm's law holds closely for metallic conductors at constant temperature.
T: Resistance | Opposition to current, the ratio of voltage to current, in ohms
T: Resistivity | A material property giving the resistance of a unit cube, in ohm metres
T: Equivalent resistance | A single resistance that draws the same current from the same voltage as a network
SUM: V = IR and R = ρL/A.
SUM: Series add; parallel combine as product over sum for two.
SUM: Divider rules share voltage and current.
SRC: Alexander C. K. and Sadiku M. N. O., Fundamentals of Electric Circuits, 6th edition, McGraw-Hill | secondary | 2017
SRC: Bird J., Electrical Circuit Theory and Technology, 6th edition, Routledge | secondary | 2017
Q: What is the equivalent of two equal resistors R in parallel? | R ÷ 2.
Q: In a current divider, which resistor carries more current? | The smaller resistance.
M1#engineering-u08-02-q1@1: Three 10 Ω resistors are connected in series. What is the total resistance? | 30 Ω | 3.33 Ω | 10 Ω | 1000 Ω | Series resistances add: 10 + 10 + 10 = 30 Ω.
NUM2#engineering-u08-02-q2@2: What is the equivalent resistance of 10 Ω and 40 Ω in parallel, in Ω? | 8 | 0.1 | Ω | R = 10 × 40 ÷ (10 + 40) = 400 ÷ 50 = 8 Ω.
M2#engineering-u08-02-q3@3: A 12 V supply feeds 2 kΩ and 1 kΩ in series. What is the voltage across the 1 kΩ? | 4 V | 8 V | 6 V | 12 V | By the voltage divider rule, V = 12 × 1 ÷ (2 + 1) = 4 V.
M3#engineering-u08-02-q4@1: A copper wire is replaced by one twice as long with half the cross-sectional area. How does its resistance change? | It becomes four times larger | It stays the same | It doubles | It halves | R = ρL/A: doubling L doubles R, halving A doubles it again.
SA3#engineering-u08-02-q5@3: A 9 V supply feeds two 10 kΩ resistors in series, and a 10 kΩ load is connected across the lower resistor. Explain why the load voltage is not 4.5 V and calculate it. | The load is in parallel with the lower resistor, giving 10 × 10 ÷ 20 = 5 kΩ. The divider is now 10 kΩ and 5 kΩ, so the output is 9 × 5 ÷ 15 = 3 V. Loading reduces the output of an unbuffered divider. | Load in parallel ; 5 kΩ equivalent ; 3 V result ; Loading effect

## Kirchhoff's laws
LV: Year 1 · Intermediate
S: Kirchhoff's two laws express conservation of charge and of energy in a circuit and are the basis of all circuit analysis. This lesson states the laws, explains sign conventions and applies them to circuits that cannot be reduced by series and parallel rules.
O: State Kirchhoff's current and voltage laws and the principles behind them
O: Apply consistent sign conventions when writing KCL and KVL equations
O: Solve circuits with more than one source using Kirchhoff's laws
PRE: Ohm's law and resistor networks
H: The laws
E: Σ I = 0 at a node :: Kirchhoff's current law (KCL): currents entering = currents leaving
E: Σ V = 0 around a loop :: Kirchhoff's voltage law (KVL): rises = drops around any closed loop
- KCL follows from **conservation of charge**: charge cannot build up at a node.
- KVL follows from **conservation of energy**: a charge returning to its starting point has no net change in energy.
- A **node** is a point where two or more elements join; a **loop** is any closed path; a **mesh** is a loop with no other loop inside it.
H: Sign conventions
- Assign a direction to each unknown current. If the answer comes out negative, the current flows the other way: the analysis is still correct.
- Going round a loop, count a voltage as a **drop** when moving from + to − across an element, and a **rise** from − to +. For a resistor, the drop is IR in the direction of the assumed current.
- For a circuit with b branches and n nodes, there are n − 1 independent KCL equations and b − n + 1 independent KVL equations.
H: Using the laws
P: Kirchhoff's laws apply to any circuit, linear or not, AC or DC (using instantaneous values or phasors). They are used to check results, and nodal and mesh analysis are systematic ways of applying them.
X: Two sources.
> A 12 V source with internal resistance 1 Ω and a 6 V source with internal resistance 2 Ω are connected in parallel (positive to positive) across a 3 Ω load.
> Let V be the load voltage. KCL at the top node: (12 − V) ÷ 1 + (6 − V) ÷ 2 = V ÷ 3.
> Multiply by 6: 72 − 6V + 18 − 3V = 2V, so 11V = 90 and V = 8.18 V.
> Source currents: (12 − 8.18) ÷ 1 = 3.82 A from the 12 V source; (6 − 8.18) ÷ 2 = −1.09 A, so the 6 V source is being charged; the load takes 8.18 ÷ 3 = 2.73 A.
K: KCL (charge conservation) and KVL (energy conservation) apply to every circuit; a negative answer only means the true direction is opposite to the one assumed.
!: Mixing sign conventions within one loop equation. Choose a direction round the loop and apply rises and drops consistently.
EV: established | Kirchhoff's laws hold for lumped circuits, where dimensions are small compared with the wavelength of the signals.
T: Node | A point in a circuit where two or more elements are connected
T: Loop | Any closed path through a circuit
T: Kirchhoff's current law | The algebraic sum of currents at a node is zero
SUM: KCL: current in equals current out.
SUM: KVL: voltages round a loop sum to zero.
SUM: A negative current just flows the other way.
SRC: Kirchhoff G., "Ueber den Durchgang eines elektrischen Stromes durch eine Ebene, insbesondere durch eine kreisförmige", Annalen der Physik 140(4), 497–514 | primary | 1845
SRC: Alexander C. K. and Sadiku M. N. O., Fundamentals of Electric Circuits, 6th edition, McGraw-Hill | secondary | 2017
Q: Which conservation law underlies KVL? | Conservation of energy.
Q: What does a negative current in your answer mean? | The current flows in the opposite direction to the one you assumed.
M1#engineering-u08-03-q1@1: Kirchhoff's current law is a consequence of what? | Conservation of charge | Conservation of energy | Ohm's law | Conservation of momentum | Charge cannot accumulate at a node, so currents in equal currents out.
NUM2#engineering-u08-03-q2@2: Currents of 3 A and 4 A enter a node, and 1 A leaves through one branch. What current leaves through the only other branch, in A? | 6 | 0.01 | A | KCL: 3 + 4 = 1 + I, so I = 6 A.
M2#engineering-u08-03-q3@2: A 24 V source drives a loop containing 4 Ω and 8 Ω. What is the drop across the 8 Ω? | 16 V | 8 V | 12 V | 24 V | I = 24 ÷ 12 = 2 A, so the drop is 2 × 8 = 16 V; KVL: 24 − 8 − 16 = 0.
M3#engineering-u08-03-q4@3: A circuit has 5 branches and 3 nodes. How many independent KVL equations are there? | 3 | 2 | 5 | 8 | Independent loop equations number b − n + 1 = 5 − 3 + 1 = 3.
SA3#engineering-u08-03-q5@1,3: Explain, with reference to the example, how one source in a parallel pair can absorb power. | When two sources of different voltage are paralleled, the common voltage settles between them. The higher-voltage source drives current into the lower one, which is then charged: current enters its positive terminal, so it absorbs power. In the example the 6 V source carries −1.09 A, meaning current flows into it. | Common terminal voltage ; Higher source drives current ; Current into positive terminal ; Absorbs power

## Nodal and mesh analysis
LV: Year 1 · Intermediate
S: Nodal and mesh analysis turn Kirchhoff's laws into a systematic method that always gives the right number of equations. This lesson sets out each method, including supernodes and supermeshes, and shows how to choose between them.
O: Apply nodal analysis using node voltages and KCL
O: Apply mesh analysis using mesh currents and KVL
O: Choose the more efficient method and handle sources between nodes or meshes
PRE: Kirchhoff's laws
H: Nodal analysis
- Choose a **reference node** (ground), usually the one with most connections.
- Label the voltage of each other node relative to ground.
- Write **KCL** at each non-reference node, expressing each current as a voltage difference divided by resistance.
- Solve the simultaneous equations, often in matrix form G**v** = **i**.
- A voltage source between two non-reference nodes forms a **supernode**: write KCL for the combined node plus the source's constraint equation.
H: Mesh analysis
- Assign a **mesh current**, usually clockwise, to each mesh of a planar circuit.
- Write **KVL** round each mesh; a resistor shared by two meshes carries the difference of their currents.
- Solve for the mesh currents; branch currents follow.
- A current source shared by two meshes creates a **supermesh**.
H: Which method?
P: Nodal analysis needs n − 1 equations; mesh analysis needs b − n + 1. Choose the one with fewer equations, and prefer nodal analysis when there are many current sources or non-planar layouts, and mesh analysis when there are many voltage sources in series with resistors. Circuit simulators such as SPICE use a form of nodal analysis.
X: The same circuit both ways.
> A 10 V source in series with 2 Ω feeds node A; from A, 4 Ω and another 4 Ω each go to ground.
> Nodal: (V_{A} − 10) ÷ 2 + V_{A} ÷ 4 + V_{A} ÷ 4 = 0, so V_{A} − 10 + V_{A} = 0 and V_{A} = 5 V.
> Mesh: mesh 1 has the source, 2 Ω and the first 4 Ω; mesh 2 has the two 4 Ω resistors. KVL: 10 = 6I_{1} − 4I_{2} and 0 = 8I_{2} − 4I_{1}, so I_{1} = 2I_{2}.
> Then 10 = 12I_{2} − 4I_{2}, giving I_{2} = 1.25 A and I_{1} = 2.5 A. Check: V_{A} = 4 × (2.5 − 1.25) = 5 V.
K: Nodal analysis writes KCL in terms of node voltages; mesh analysis writes KVL in terms of mesh currents; both give the same answers, so choose the one with fewer equations.
!: Forgetting that a shared resistor carries the difference of two mesh currents. Write the voltage across it as R(I_{1} − I_{2}) in mesh 1 and R(I_{2} − I_{1}) in mesh 2.
EV: established | Modified nodal analysis is the basis of SPICE and most modern circuit simulators.
T: Reference node | The node chosen as zero volts, against which other node voltages are measured
T: Mesh current | A current assumed to circulate round a mesh
T: Supernode | Two nodes joined by a voltage source, treated together in nodal analysis
SUM: Nodal: KCL at n − 1 nodes.
SUM: Mesh: KVL round each mesh.
SUM: Pick the method with fewer equations.
SRC: Alexander C. K. and Sadiku M. N. O., Fundamentals of Electric Circuits, 6th edition, McGraw-Hill | secondary | 2017
SRC: Nagel L. W. and Pederson D. O., SPICE (Simulation Program with Integrated Circuit Emphasis), Memorandum ERL-M382, University of California, Berkeley | primary | 1973
Q: How many equations does nodal analysis need for n nodes? | n − 1, one for each non-reference node.
Q: What is a supermesh? | Two meshes sharing a current source, treated together with KVL round their combined boundary.
M1#engineering-u08-04-q1@1: Which law is written at each node in nodal analysis? | Kirchhoff's current law | Kirchhoff's voltage law | Faraday's law | Lenz's law | Nodal analysis applies KCL with currents written in terms of node voltages.
M2#engineering-u08-04-q2@2: In mesh analysis, what current flows in a 5 Ω resistor shared by meshes with currents 3 A and 1 A in the same direction around their own meshes? | 2 A | 4 A | 3 A | 1 A | The shared branch carries the difference, 3 − 1 = 2 A.
NUM3#engineering-u08-04-q3@3: In the nodal example, the 2 Ω resistor is changed to 4 Ω. What is the new V_{A}, in V? | 3.33 | 0.02 | V | (V_{A} − 10) ÷ 4 + V_{A} ÷ 4 + V_{A} ÷ 4 = 0, so 3V_{A} = 10 and V_{A} = 3.33 V.
MATCH2#engineering-u08-04-q4@3: Match each feature to the better method. | Many current sources = Nodal analysis ; Non-planar circuit = Nodal analysis ; Voltage sources in series with resistors = Mesh analysis ; Fewer meshes than nodes = Mesh analysis | Choose the method with fewer, simpler equations.
SA3#engineering-u08-04-q5@1,2: Explain how a voltage source between two non-reference nodes is handled in nodal analysis. | The current through the source cannot be written as a voltage difference over a resistance. The two nodes are combined into a supernode: KCL is written for all currents leaving the combined region, and the source gives a constraint equation V_{a} − V_{b} = V_{s}. Together these replace the two separate KCL equations. | Current unknown ; Supernode ; KCL on combined node ; Constraint equation

## Thévenin and Norton equivalents
LV: Year 1 · Intermediate
S: Any linear two-terminal network, however complex, behaves like a single source with a single resistance. This lesson explains Thévenin's and Norton's theorems, how to find the equivalents and how to convert between them.
O: State Thévenin's and Norton's theorems
O: Find the Thévenin and Norton equivalents of a linear network
O: Use an equivalent circuit to calculate the current in a changing load
PRE: Nodal and mesh analysis
H: The theorems
- **Thévenin's theorem**: a linear two-terminal network can be replaced by a voltage source V_{Th} in series with a resistance R_{Th}.
- **Norton's theorem**: the same network can be replaced by a current source I_{N} in parallel with a resistance R_{N} = R_{Th}.
- **V_{Th}** is the **open-circuit** voltage at the terminals; **I_{N}** is the **short-circuit** current; and I_{N} = V_{Th} ÷ R_{Th}.
H: Finding R_{Th}
- With only independent sources, set them to zero (voltage sources become **short circuits**, current sources become **open circuits**) and find the resistance seen from the terminals.
- With dependent sources, apply a test voltage or current, or use R_{Th} = V_{oc} ÷ I_{sc}.
- In the laboratory, measure the open-circuit voltage, then load the terminals and measure the drop.
H: Why they help
P: Equivalents simplify repeated calculations when only a load changes, explain loading effects (a real source's terminal voltage falls with current), and underpin **source transformation**, swapping a voltage source in series with R for a current source V/R in parallel with R.
X: A divider as a source.
> A 12 V source in series with 4 Ω feeds a 12 Ω resistor; the output terminals are across the 12 Ω.
> V_{Th} (open circuit) = 12 × 12 ÷ (4 + 12) = 9 V.
> R_{Th}: short the source, so 4 Ω is in parallel with 12 Ω: 3 Ω. Norton: I_{N} = 9 ÷ 3 = 3 A.
> With a 6 Ω load: I = 9 ÷ (3 + 6) = 1 A. With a 15 Ω load: I = 9 ÷ 18 = 0.5 A.
K: A linear two-terminal network is equivalent to V_{Th} in series with R_{Th}, or I_{N} in parallel with the same resistance; V_{Th} is the open-circuit voltage and I_{N} the short-circuit current.
!: Opening a voltage source when finding R_{Th}. An ideal voltage source is replaced by a short circuit; a current source by an open circuit.
EV: established | Thévenin's and Norton's theorems are exact for linear circuits and are standard tools of circuit analysis.
T: Thévenin equivalent | A voltage source in series with a resistance that reproduces a network's terminal behaviour
T: Norton equivalent | A current source in parallel with a resistance that reproduces a network's terminal behaviour
T: Source transformation | Replacing a voltage source and series resistor with a current source and parallel resistor, or the reverse
SUM: V_{Th} = open-circuit voltage; I_{N} = short-circuit current.
SUM: R_{Th} with sources zeroed.
SUM: Use equivalents when a load changes.
SRC: Thévenin L., "Sur un nouveau théorème d'électricité dynamique", Comptes rendus hebdomadaires des séances de l'Académie des Sciences 97, 159–161 | primary | 1883
SRC: Hughes E. (rev. Hiley J., Brown K. and McKenzie Smith I.), Electrical and Electronic Technology, 12th edition, Pearson | secondary | 2016
Q: How is V_{Th} found? | As the open-circuit voltage at the network's terminals.
Q: How are R_{Th}, V_{Th} and I_{N} related? | R_{Th} = V_{Th} ÷ I_{N}.
M1#engineering-u08-05-q1@1: When finding R_{Th}, what replaces an ideal voltage source? | A short circuit | An open circuit | A 1 Ω resistor | A current source | Setting a voltage source to zero leaves zero volts across it: a short circuit.
M2#engineering-u08-05-q2@2: A network has V_{Th} = 10 V and R_{Th} = 2 Ω. What is its Norton current? | 5 A | 20 A | 0.2 A | 12 A | The Norton current is the short-circuit current: I_{N} = V_{Th} ÷ R_{Th} = 10 ÷ 2 = 5 A.
NUM2#engineering-u08-05-q3@2: A 20 V source in series with 10 Ω feeds 10 Ω to ground; the terminals are across the second resistor. What is R_{Th}, in Ω? | 5 | 0.05 | Ω | Shorting the source puts 10 Ω in parallel with 10 Ω: R_{Th} = 5 Ω.
M3#engineering-u08-05-q4@3: A source reads 12.0 V on open circuit and 10.0 V when supplying 2 A. What is its Thévenin resistance? | 1 Ω | 5 Ω | 6 Ω | 0.17 Ω | The drop of 2 V at 2 A gives R_{Th} = 2 ÷ 2 = 1 Ω.
SA3#engineering-u08-05-q5@2,3: Explain why a Thévenin equivalent is useful when a designer must test many different loads on the same network. | Once V_{Th} and R_{Th} are found, the load current for any load R_{L} is simply V_{Th} ÷ (R_{Th} + R_{L}), without re-solving the whole network each time. It also shows directly how terminal voltage falls with load, and how much power can be delivered. | One-off calculation ; Simple load formula ; Shows loading ; Power available

## Maximum power transfer
LV: Year 1 · Intermediate
S: A source delivers the most power to a load when the load is matched to the source's internal resistance. This lesson derives the maximum power transfer theorem, examines the efficiency at that point and explains where matching is and is not used.
O: State and apply the maximum power transfer theorem
O: Calculate the maximum power and the efficiency at maximum power
O: Explain why power systems are not designed for maximum power transfer
PRE: Thévenin and Norton equivalents
H: The theorem
E: P_{L} = V_{Th}^{2} R_{L} ÷ (R_{Th} + R_{L})^{2} :: power in a load R_{L} fed from a Thévenin equivalent
E: P_{max} = V_{Th}^{2} ÷ 4R_{Th}, when R_{L} = R_{Th} :: maximum power transfer
P: Setting dP_{L}/dR_{L} = 0 gives R_{L} = R_{Th}. With a smaller load, more current flows but more power is lost in R_{Th}; with a larger load, less current flows. For AC circuits, maximum power is delivered when the load impedance is the **complex conjugate** of the source impedance.
H: Efficiency
- At maximum power transfer, the same current flows through R_{Th} and R_{L}, which are equal, so half the power is lost in the source: **efficiency is 50%**.
- As R_{L} becomes much larger than R_{Th}, efficiency approaches 100%, but the power delivered falls.
H: Where matching is used
- **Signal and communication circuits**, such as antennas, transmission lines and audio amplifiers, match impedances to get the most signal power and to prevent reflections.
- **Power systems** are never run at maximum power transfer: a 50% efficiency would waste half the energy and overheat equipment. Generators and supplies have very low internal impedance compared with their loads, giving high efficiency and a stable voltage.
X: Finding the best load.
> A network has V_{Th} = 9 V and R_{Th} = 3 Ω.
> Maximum power occurs with R_{L} = 3 Ω: P_{max} = 81 ÷ 12 = 6.75 W.
> With R_{L} = 6 Ω: I = 9 ÷ 9 = 1 A and P = 1^{2} × 6 = 6 W, less than the maximum.
> Efficiency at R_{L} = 3 Ω is 50%; at R_{L} = 6 Ω it is 6 ÷ (6 + 3) = 67%.
K: Maximum power reaches the load when R_{L} = R_{Th}, giving P_{max} = V_{Th}^{2}/4R_{Th} at only 50% efficiency; matching suits signal circuits, not power supply.
!: Thinking maximum power transfer means maximum efficiency. At the matched point, half the power is lost inside the source.
EV: established | The maximum power transfer theorem follows directly from the Thévenin model and is used in impedance matching.
T: Maximum power transfer | The condition that a load receives the most power when its resistance equals the source resistance
T: Impedance matching | Choosing a load impedance to suit the source, for maximum power or minimum reflection
T: Efficiency | Useful output power as a fraction of total power supplied
SUM: R_{L} = R_{Th} for maximum power.
SUM: P_{max} = V_{Th}^{2}/4R_{Th}, at 50% efficiency.
SUM: Signal circuits match; power systems do not.
SRC: Hughes E. (rev. Hiley J., Brown K. and McKenzie Smith I.), Electrical and Electronic Technology, 12th edition, Pearson | secondary | 2016
SRC: Alexander C. K. and Sadiku M. N. O., Fundamentals of Electric Circuits, 6th edition, McGraw-Hill | secondary | 2017
Q: What is the efficiency at maximum power transfer? | 50%.
Q: What load gives maximum power in an AC circuit? | A load impedance equal to the complex conjugate of the source impedance.
M1#engineering-u08-06-q1@1: For maximum power transfer, what should the load resistance equal? | The Thévenin resistance of the source | Zero | Twice the Thévenin resistance | Infinity | Power in the load peaks when R_{L} = R_{Th}.
NUM2#engineering-u08-06-q2@2: A source has V_{Th} = 10 V and R_{Th} = 5 Ω. What is the maximum power it can deliver to a load, in W? | 5 | 0.05 | W | P_{max} = V_{Th}^{2} ÷ 4R_{Th} = 100 ÷ 20 = 5 W.
M2#engineering-u08-06-q3@3: Why is a power station not operated at maximum power transfer? | Half the power would be lost in the source | Matching is impossible at 50 Hz | Loads would receive too much voltage | It would make the frequency unstable | Matching gives only 50% efficiency, wasting half the energy as heat in the source.
M3#engineering-u08-06-q4@2: A source with R_{Th} = 4 Ω supplies a 12 Ω load. What is the efficiency? | 75% | 50% | 25% | 33% | Efficiency = R_{L} ÷ (R_{L} + R_{Th}) = 12 ÷ 16 = 75%.
SA3#engineering-u08-06-q5@1,3: Explain why maximum power occurs when R_{L} = R_{Th}, without using calculus. | If R_{L} is very small, current is large but almost all the voltage, and so the power, is dropped across R_{Th}; if R_{L} is very large, the current and therefore the power are small. Between these extremes power in the load rises then falls, peaking at the balance point where R_{L} = R_{Th} and the source voltage divides equally. | Small load extreme ; Large load extreme ; Rise and fall ; Equal division of voltage

## Capacitors and inductors
LV: Year 1 · Foundation
S: Capacitors store energy in an electric field and inductors store it in a magnetic field. This lesson covers their defining equations, how they combine, the energy they store and how they behave in DC circuits.
O: State the current-voltage relationships for capacitors and inductors
O: Calculate capacitance, inductance combinations and stored energy
O: Explain why capacitor voltage and inductor current cannot change instantaneously
PRE: Charge, current, voltage and power
H: Capacitors
E: Q = CV :: charge stored on a capacitor of capacitance C (farads)
E: C = ε_{0}ε_{r}A ÷ d :: parallel-plate capacitor with plate area A and spacing d
E: i = C dv/dt :: capacitor current depends on the rate of change of voltage
E: W = ½CV^{2} :: energy stored in the electric field
- Capacitors in **parallel** add: C = C_{1} + C_{2}. In **series**: 1/C = 1/C_{1} + 1/C_{2}.
- In a DC steady state no current flows: a capacitor acts as an **open circuit**.
H: Inductors
E: v = L di/dt :: inductor voltage depends on the rate of change of current (L in henries)
E: W = ½LI^{2} :: energy stored in the magnetic field
- Inductors in **series** add; in **parallel** they combine like resistors.
- In a DC steady state the voltage is zero: an ideal inductor acts as a **short circuit**.
H: Continuity
P: Because i = C dv/dt, an instant jump in capacitor voltage would need infinite current, so **capacitor voltage is continuous**. Because v = L di/dt, **inductor current is continuous**. Interrupting the current in an inductor suddenly produces a large voltage spike, which is why relay coils are fitted with a **flyback diode**.
X: Stored energy.
> A 100 µF capacitor is charged to 12 V.
> Charge: Q = CV = 100 × 10^{-6} × 12 = 1.2 mC.
> Energy: W = ½ × 100 × 10^{-6} × 144 = 7.2 mJ.
> A 50 mH inductor carrying 2 A stores W = ½ × 0.05 × 4 = 0.1 J.
K: i = C dv/dt and v = L di/dt; capacitors block steady DC and inductors pass it; capacitor voltage and inductor current cannot change instantly.
!: Combining capacitors like resistors. Capacitors in parallel add directly; in series they combine as reciprocals.
EV: established | The capacitor and inductor equations follow from Maxwell's equations for lumped components.
T: Capacitance | Charge stored per volt, measured in farads
T: Inductance | Voltage induced per unit rate of change of current, measured in henries
T: Flyback diode | A diode across an inductive load that gives the current a path when it is switched off
SUM: Capacitor: Q = CV, i = C dv/dt, W = ½CV^{2}.
SUM: Inductor: v = L di/dt, W = ½LI^{2}.
SUM: At DC: capacitor open, inductor short.
SRC: Hughes E. (rev. Hiley J., Brown K. and McKenzie Smith I.), Electrical and Electronic Technology, 12th edition, Pearson | secondary | 2016
SRC: Alexander C. K. and Sadiku M. N. O., Fundamentals of Electric Circuits, 6th edition, McGraw-Hill | secondary | 2017
Q: How does a capacitor behave in a DC steady state? | As an open circuit: no current flows once it is charged.
Q: What quantity cannot change instantaneously in an inductor? | The current through it.
M1#engineering-u08-07-q1@1: What is the unit of inductance? | The henry | The farad | The tesla | The weber | Inductance is measured in henries; capacitance is measured in farads.
M2#engineering-u08-07-q2@2: Two 10 µF capacitors are connected in series. What is the total capacitance? | 5 µF | 20 µF | 10 µF | 100 µF | In series, 1/C = 1/10 + 1/10, so C = 5 µF, half of either capacitor.
NUM2#engineering-u08-07-q3@2: How much energy does a 470 µF capacitor store at 10 V, in mJ? | 23.5 | 0.2 | mJ | W = ½ × 470 × 10^{-6} × 10^{2} = 0.0235 J, or 23.5 mJ.
M3#engineering-u08-07-q4@3: Why is a diode placed across a relay coil driven by a transistor? | To clamp the voltage spike when the coil current is switched off | To increase the coil's inductance permanently | To allow AC to flow through the coil | To reduce the supply voltage at switch-on | Interrupting inductor current causes a large L di/dt spike; the diode gives the current a safe path.
SA3#engineering-u08-07-q5@1,3: Explain, using the defining equations, why a capacitor smooths voltage and an inductor smooths current. | Since i = C dv/dt, changing a capacitor's voltage quickly needs a large current, so a capacitor resists rapid voltage changes and smooths ripple. Since v = L di/dt, changing an inductor's current quickly needs a large voltage, so an inductor resists rapid current changes and smooths current. | i = C dv/dt ; Resists voltage change ; v = L di/dt ; Resists current change

## RC and RL transients
LV: Year 1 · Intermediate
S: When a circuit containing a capacitor or inductor is switched, voltages and currents change exponentially before settling. This lesson derives the RC and RL step responses, explains the time constant and applies them to timing and switching problems.
O: Derive and apply the step response of RC and RL circuits
O: Calculate and interpret the time constant
O: Use initial and final values to sketch and solve transient responses
PRE: Capacitors and inductors
H: RC circuits
E: τ = RC :: time constant of an RC circuit, in seconds
E: v_{C} = V(1 − e^{-t/τ}) :: capacitor voltage when charging from zero towards V
E: v_{C} = V_{0}e^{-t/τ} :: capacitor voltage when discharging from V_{0}
- After one time constant the capacitor reaches **63.2%** of its final voltage; after **5τ** it is within 1% and is treated as fully charged.
- The charging current starts at V/R and decays as e^{-t/τ}.
H: RL circuits
E: τ = L ÷ R :: time constant of an RL circuit
E: i = (V ÷ R)(1 − e^{-t/τ}) :: inductor current rising after a step
- The inductor voltage starts at V and decays to zero as the current builds to V/R.
H: A general method
P: Every first-order transient follows x(t) = x_{final} + (x_{initial} − x_{final})e^{-t/τ}. Find the **initial value** from continuity (capacitor voltage or inductor current just before switching), the **final value** from the DC steady state (capacitor open, inductor short), and τ using the Thévenin resistance seen by the capacitor or inductor.
X: Charging a capacitor.
> A 100 µF capacitor charges through 10 kΩ from a 12 V supply, starting from 0 V.
> τ = RC = 10 × 10^{3} × 100 × 10^{-6} = 1 s.
> At t = 1 s: v_{C} = 12(1 − e^{-1}) = 12 × 0.632 = 7.59 V.
> At t = 2 s: v_{C} = 12(1 − e^{-2}) = 12 × 0.865 = 10.4 V. After about 5 s it is effectively 12 V.
K: First-order circuits respond exponentially with time constant τ = RC or L/R; use initial value, final value and τ to write any step response.
!: Using the wrong resistance for τ. Use the Thévenin resistance seen from the capacitor or inductor terminals, with sources zeroed.
EV: established | First-order exponential responses are exact solutions of the linear differential equations for RC and RL circuits.
T: Time constant | The time for a first-order response to cover 63.2% of the change from initial to final value
T: Transient | The temporary response of a circuit between switching and reaching steady state
T: Steady state | The condition reached when currents and voltages no longer change with time
SUM: τ = RC or L/R.
SUM: 63.2% after one τ, complete after about 5τ.
SUM: x(t) = final + (initial − final)e^{-t/τ}.
SRC: Alexander C. K. and Sadiku M. N. O., Fundamentals of Electric Circuits, 6th edition, McGraw-Hill | secondary | 2017
SRC: Bird J., Electrical Circuit Theory and Technology, 6th edition, Routledge | secondary | 2017
Q: What percentage of the final value does a charging capacitor reach after one time constant? | About 63.2%.
Q: What is the time constant of an RL circuit? | τ = L ÷ R.
M1#engineering-u08-08-q1@1: What is the time constant of a 1 MΩ resistor with a 2 µF capacitor? | 2 s | 0.5 s | 2 ms | 500 s | τ = RC = 10^{6} × 2 × 10^{-6} = 2 s, the time to reach 63.2% of the change.
NUM2#engineering-u08-08-q2@2: An RL circuit has L = 0.5 H and R = 100 Ω. What is its time constant, in ms? | 5 | 0.05 | ms | τ = L ÷ R = 0.5 ÷ 100 = 0.005 s, which is 5 ms.
M2#engineering-u08-08-q3@3: A capacitor charged to 10 V discharges through a resistor. What is its voltage after two time constants? | 1.35 V | 3.68 V | 5.00 V | 0.07 V | v = 10e^{-2} = 10 × 0.135 = 1.35 V, since e^{-2} is about 0.135.
M3#engineering-u08-08-q4@2: Immediately after a DC supply is switched onto an uncharged capacitor in series with a resistor, what is the current? | V ÷ R | Zero | V ÷ 2R | Infinite | The capacitor voltage is zero at first (continuity), so all of V appears across R.
SA3#engineering-u08-08-q5@2,3: A 10 V step is applied to a series RL circuit with R = 20 Ω and L = 0.2 H. Write the current as a function of time and explain each part. | Initial current is 0 (inductor current is continuous). Final current is V/R = 0.5 A (inductor acts as a short at DC). τ = L/R = 0.01 s. So i(t) = 0.5(1 − e^{-100t}) A, reaching 0.316 A after 10 ms and effectively 0.5 A after 50 ms. | Initial value ; Final value ; Time constant ; Expression

## AC fundamentals
LV: Year 1 · Foundation
S: Mains electricity and most signals are alternating. This lesson describes a sinusoidal waveform, defines frequency, period, phase and RMS values, and introduces phasors as a way of representing sinusoids.
O: Describe a sinusoidal waveform by amplitude, frequency, period and phase
O: Calculate RMS, peak and average values
O: Represent sinusoids as phasors and interpret phase differences
PRE: Complex numbers and phasors
H: Describing a sinusoid
E: v = V_{m} sin(ωt + φ) :: a sinusoidal voltage with peak V_{m}, angular frequency ω and phase φ
E: ω = 2πf and T = 1 ÷ f :: angular frequency, frequency and period
- UK mains is nominally **230 V RMS at 50 Hz**, so its peak is about 325 V and its period 20 ms.
- AC is used for power distribution because transformers can change its voltage efficiently.
H: RMS and average values
E: V_{rms} = V_{m} ÷ √2 :: RMS value of a sinusoid
- The **RMS** (root mean square) value is the DC value that would dissipate the same power in a resistor. Meters and ratings usually give RMS values.
- The average over a full cycle is zero; the average over a half cycle is 2V_{m}/π ≈ 0.637V_{m}.
- **Peak factor** = V_{m}/V_{rms} = 1.414; **form factor** = V_{rms}/V_{avg} = 1.11 for a sinusoid. These ratios differ for other waveforms.
H: Phase and phasors
P: Two sinusoids of the same frequency can be shifted in time: the one reaching its peak first **leads**. A **phasor** represents a sinusoid as a rotating vector, or a complex number, whose length is the RMS (or peak) value and whose angle is the phase. Adding sinusoids becomes adding complex numbers, and the time variation is left implicit.
X: UK mains.
> V_{rms} = 230 V, so V_{m} = 230 × √2 = 325 V.
> f = 50 Hz, so T = 20 ms and ω = 2π × 50 = 314 rad/s.
> v = 325 sin(314t) V. A 1 kW heater on this supply takes I_{rms} = 1000 ÷ 230 = 4.35 A.
> As a phasor, the supply is 230∠0° V.
K: A sinusoid is described by amplitude, frequency and phase; RMS values equal the DC value giving the same heating, V_{m}/√2 for a sine; phasors turn sinusoids into complex numbers.
!: Using peak values in power calculations. P = V_{rms}I_{rms} for a resistor; using peak values gives twice the true power.
EV: established | RMS values are the standard basis for AC ratings and measurements.
T: RMS value | The equivalent DC value that produces the same power in a resistor
T: Phasor | A complex number representing the magnitude and phase of a sinusoid
T: Period | The time for one complete cycle of a waveform
SUM: v = V_{m} sin(ωt + φ), ω = 2πf.
SUM: V_{rms} = V_{m}/√2 for a sinusoid.
SUM: Phasors carry magnitude and phase.
SRC: Hughes E. (rev. Hiley J., Brown K. and McKenzie Smith I.), Electrical and Electronic Technology, 12th edition, Pearson | secondary | 2016
SRC: The Electricity Safety, Quality and Continuity Regulations 2002 (SI 2002/2665) | legislation | 2002 | https://www.legislation.gov.uk/uksi/2002/2665/contents
Q: What is the peak value of UK mains? | About 325 V (230 V × √2).
Q: What does the RMS value represent? | The DC value that would dissipate the same power in a resistor.
M1#engineering-u08-09-q1@1: What is the period of a 50 Hz waveform? | 20 ms | 50 ms | 2 ms | 0.5 s | T = 1/f = 1/50 = 0.02 s, which is 20 milliseconds.
NUM2#engineering-u08-09-q2@2: What is the peak value of a 12 V RMS sinusoid, in V? | 16.97 | 0.05 | V | V_{m} = 12 × √2 = 16.97 V.
M2#engineering-u08-09-q3@2: What is the angular frequency of a 60 Hz supply? | 377 rad/s | 60 rad/s | 188 rad/s | 3600 rad/s | Angular frequency is 2π times the frequency: ω = 2π × 60 = 377 rad/s.
M3#engineering-u08-09-q4@3: v_{1} = 10 sin(ωt + 30°) and v_{2} = 10 sin(ωt − 15°). What is the relationship? | v_{1} leads v_{2} by 45° | v_{2} leads v_{1} by 45° | They are in phase | v_{1} lags v_{2} by 15° | The phase difference is 30° − (−15°) = 45°, with v_{1} ahead.
SA3#engineering-u08-09-q5@1,3: Explain why AC voltages are usually quoted as RMS values and why the RMS of a sinusoid is V_{m}/√2. | Power in a resistor depends on v^{2}, which varies through the cycle. The RMS value is the square root of the mean of v^{2}, so it gives the same average power as a DC voltage of that size. For a sinusoid, the mean of sin^{2} over a cycle is ½, so V_{rms} = V_{m}√(½) = V_{m}/√2. | Power depends on v^{2} ; Mean of square ; Equivalent DC ; Mean of sin^{2} is ½

## Impedance and AC circuit analysis
LV: Year 1 · Intermediate
S: In AC circuits, resistors, inductors and capacitors are represented by complex impedances, so the DC methods of circuit analysis carry over. This lesson defines reactance and impedance, analyses series and parallel AC circuits and introduces resonance.
O: Calculate inductive and capacitive reactance and complex impedance
O: Analyse series and parallel AC circuits using phasors
O: Explain series resonance and calculate the resonant frequency
PRE: AC fundamentals
H: Impedance
E: Z_{R} = R, Z_{L} = jωL, Z_{C} = 1 ÷ (jωC) = −j ÷ (ωC) :: impedances of the three passive elements
E: X_{L} = 2πfL and X_{C} = 1 ÷ (2πfC) :: inductive and capacitive reactance, in ohms
- **Impedance** Z = R + jX, with magnitude |Z| = √(R^{2} + X^{2}) and angle θ = arctan(X/R).
- Ohm's law becomes **V** = **I**Z, and series and parallel rules, Kirchhoff's laws, nodal and mesh analysis and Thévenin's theorem all apply with complex numbers.
- In an inductor, current **lags** voltage by 90°; in a capacitor, current **leads** by 90° (remember "CIVIL": in C, I leads V; V leads I in L).
H: Resonance
E: f_{0} = 1 ÷ (2π√(LC)) :: resonant frequency of an LC circuit
- At series resonance X_{L} = X_{C}, the reactances cancel, impedance is a minimum (just R) and current is in phase with voltage and at its maximum.
- The voltages across L and C can be much larger than the supply. The **quality factor** Q = X_{L}/R measures sharpness; resonance is used in filters and tuned circuits.
H: Method
P: Convert each element to its impedance at the operating frequency, combine them with complex arithmetic, solve for phasor currents and voltages, then convert back to magnitudes and phase angles. A phasor diagram helps to check the result.
X: A series RL circuit.
> A coil has R = 30 Ω and X_{L} = 40 Ω and is connected to 230 V, 50 Hz.
> Z = 30 + j40 Ω, so |Z| = 50 Ω and θ = arctan(40/30) = 53.1°.
> I = 230 ÷ 50 = 4.6 A, lagging the voltage by 53.1°.
> V_{R} = 4.6 × 30 = 138 V and V_{L} = 4.6 × 40 = 184 V; these add as phasors, not arithmetically, to 230 V.
K: Impedance extends Ohm's law to AC: Z_{L} = jωL, Z_{C} = 1/jωC; all DC methods apply with phasors; at resonance the reactances cancel.
!: Adding AC voltages arithmetically. In the example, 138 V + 184 V is 322 V, but the phasor sum is 230 V because the voltages are 90° apart.
EV: established | Phasor analysis is exact for linear circuits in sinusoidal steady state.
T: Impedance | The complex ratio of voltage phasor to current phasor, R + jX, in ohms
T: Reactance | The imaginary part of impedance, from inductance or capacitance
T: Resonance | The condition in which inductive and capacitive reactances are equal and cancel
SUM: X_{L} = 2πfL; X_{C} = 1/(2πfC).
SUM: Z = R + jX; all DC methods apply with phasors.
SUM: Resonance at f_{0} = 1/(2π√(LC)).
SRC: Alexander C. K. and Sadiku M. N. O., Fundamentals of Electric Circuits, 6th edition, McGraw-Hill | secondary | 2017
SRC: Steinmetz C. P., "Complex quantities and their use in electrical engineering", Proceedings of the International Electrical Congress, Chicago | primary | 1893
Q: How does capacitive reactance change with frequency? | It falls as frequency rises: X_{C} = 1/(2πfC).
Q: What happens to impedance at series resonance? | It falls to its minimum, equal to the resistance, because X_{L} and X_{C} cancel.
M1#engineering-u08-10-q1@1: In a pure inductor, how does current relate to voltage? | Current lags voltage by 90° | Current leads voltage by 90° | They are in phase | Current lags voltage by 180° | For an inductor, v = L di/dt, so the current lags by 90°.
NUM2#engineering-u08-10-q2@2: What is the reactance of a 0.1 H inductor at 50 Hz, in Ω? | 31.4 | 0.1 | Ω | X_{L} = 2π × 50 × 0.1 = 31.4 Ω.
M2#engineering-u08-10-q3@3: What is the resonant frequency of L = 10 mH and C = 1 µF? | 1.59 kHz | 159 Hz | 10 kHz | 100 Hz | f_{0} = 1/(2π√(10^{-2} × 10^{-6})) = 1/(2π × 10^{-4}) = 1.59 kHz.
M3#engineering-u08-10-q4@2: A series circuit has R = 6 Ω and X_{C} = 8 Ω. What is the magnitude of its impedance? | 10 Ω | 14 Ω | 2 Ω | 48 Ω | |Z| = √(6^{2} + 8^{2}) = 10 Ω, since the components are at right angles.
SA3#engineering-u08-10-q5@1,3: Explain why the voltage across the capacitor in a series RLC circuit at resonance can be larger than the supply voltage. | At resonance X_{L} = X_{C} so the reactive voltages are equal and opposite and cancel in the supply loop, leaving only R to limit the current. The current is therefore large, and each reactive voltage is I × X, which can be Q times the supply voltage, where Q = X_{L}/R. | Reactances cancel ; Current limited only by R ; V_{C} = IX_{C} ; Quality factor

## AC power and power factor
LV: Year 1 · Intermediate
S: In AC circuits with reactance, not all the current does useful work. This lesson defines real, reactive and apparent power, explains power factor and shows how power factor correction reduces current.
O: Distinguish real, reactive and apparent power and draw the power triangle
O: Calculate power factor and the power quantities for an AC load
O: Design simple power factor correction with capacitors
PRE: Impedance and AC circuit analysis
H: The three powers
E: P = VI cos φ :: real (active) power, in watts
E: Q = VI sin φ :: reactive power, in volt-amperes reactive (var)
E: S = VI and S^{2} = P^{2} + Q^{2} :: apparent power, in volt-amperes (VA)
- φ is the phase angle between voltage and current (V and I are RMS values).
- **Real power** does useful work and is dissipated in resistance.
- **Reactive power** flows back and forth to charge inductors' magnetic fields and capacitors' electric fields; it does no net work but still needs current.
- The three form a **power triangle**.
H: Power factor
- **Power factor** = cos φ = P/S. It is **lagging** for inductive loads (motors, transformers) and **leading** for capacitive loads.
- A low power factor means more current for the same real power, causing larger cable losses (I^{2}R), voltage drop and bigger equipment ratings. Large customers may pay charges for reactive power.
H: Correction
P: Adding **capacitors in parallel** with an inductive load supplies the reactive power locally. The load's own current is unchanged, but the supply current falls. The capacitor's reactive power is Q_{C} = V^{2}ωC, so the capacitance needed is C = Q_{C} ÷ (ωV^{2}). Correction is usually to about 0.95, not 1, to avoid over-correction and resonance.
X: Correcting the coil from the impedance lesson.
> The coil takes 4.6 A at 230 V with φ = 53.1°, so cos φ = 0.6.
> P = 230 × 4.6 × 0.6 = 635 W; Q = 230 × 4.6 × 0.8 = 846 var; S = 1058 VA.
> To correct fully, the capacitor must supply 846 var: C = 846 ÷ (314.2 × 230^{2}) = 50.9 µF.
> Supply current then falls to 635 ÷ 230 = 2.76 A, from 4.6 A, for the same useful power.
K: Real power P = VI cos φ does work, reactive power Q = VI sin φ circulates, and apparent power S = VI sets the current; parallel capacitors improve a lagging power factor.
!: Thinking power factor correction reduces the load's real power. It reduces the supply current and losses, while the useful power is unchanged.
EV: established | Power factor correction reduces line current, losses and voltage drop in distribution systems.
T: Real power | The average power converted to useful work or heat, in watts
T: Reactive power | Power that oscillates between source and reactive elements, in var
T: Power factor | The ratio of real power to apparent power, cos φ for sinusoids
SUM: P = VI cos φ, Q = VI sin φ, S = VI.
SUM: Low power factor means more current for the same work.
SUM: Parallel capacitors correct lagging power factor.
SRC: Hughes E. (rev. Hiley J., Brown K. and McKenzie Smith I.), Electrical and Electronic Technology, 12th edition, Pearson | secondary | 2016
SRC: Bird J., Electrical Circuit Theory and Technology, 6th edition, Routledge | secondary | 2017
Q: What are the units of reactive power? | Volt-amperes reactive (var).
Q: Why does a low power factor matter? | More current is needed for the same real power, increasing losses, voltage drop and equipment size.
M1#engineering-u08-11-q1@1: Which quantity is measured in volt-amperes? | Apparent power | Real power | Reactive power | Energy | Apparent power S = VI is measured in VA; real power in watts; reactive power in var.
NUM2#engineering-u08-11-q2@2: A load takes 10 kW at a power factor of 0.8. What is its apparent power, in kVA? | 12.5 | 0.05 | kVA | S = P ÷ cos φ = 10 ÷ 0.8 = 12.5 kVA.
M2#engineering-u08-11-q3@3: A motor load has a lagging power factor. What correction is used? | Capacitors in parallel with the load | Inductors in series with the load | Resistors in parallel with the load | A higher supply voltage | Capacitors supply the reactive power that the inductive load needs.
M3#engineering-u08-11-q4@2: A load draws 10 A at 230 V with a power factor of 0.5. What is its real power? | 1150 W | 2300 W | 460 W | 1992 W | Real power uses the power factor: P = VI cos φ = 230 × 10 × 0.5 = 1150 W.
SA3#engineering-u08-11-q5@2,3: A factory's supply shows real power 400 kW at power factor 0.7 lagging. Explain the effect of correcting to 0.95 on the supply current and why full correction to 1.0 is not usually chosen. | Apparent power falls from 400/0.7 = 571 kVA to 400/0.95 = 421 kVA, so supply current falls by about a quarter, cutting I^{2}R losses and voltage drop and freeing capacity. Full correction risks over-correction to leading power factor when load falls, and resonance with system inductance, and the last few per cent need disproportionately large capacitors. | 571 to 421 kVA ; Lower current and losses ; Over-correction risk ; Diminishing returns

## Three-phase systems
LV: Year 1 · Intermediate
S: Electricity is generated, transmitted and used in large amounts as three-phase AC. This lesson explains three-phase voltages, star and delta connections, the relationships between line and phase quantities, and three-phase power.
O: Describe a balanced three-phase supply and its phase sequence
O: Apply the line and phase relationships for star and delta connections
O: Calculate power in a balanced three-phase load
PRE: AC power and power factor
H: Three-phase supply
- Three sinusoidal voltages of equal magnitude, displaced by **120°**, with phase sequence L1, L2, L3.
- In a **balanced** system the three voltages, and the three currents in a balanced load, sum to zero, so a star-connected balanced load needs no neutral current.
- Advantages over single phase: less conductor material for the same power, **constant total power** (smooth torque in motors) and a natural **rotating magnetic field** for induction motors.
- The UK low-voltage supply is **400 V between lines** and 230 V between line and neutral.
H: Star and delta
E: Star (Y): V_{L} = √3 V_{ph}, I_{L} = I_{ph} :: line and phase quantities in a star connection
E: Delta (Δ): V_{L} = V_{ph}, I_{L} = √3 I_{ph} :: line and phase quantities in a delta connection
- **Star** provides a neutral and two voltages (line and phase); **delta** has no neutral.
- The same load impedances connected in delta draw **three times** the power of a star connection on the same supply, which is the basis of star-delta motor starting.
H: Power
E: P = √3 V_{L} I_{L} cos φ :: total real power in a balanced three-phase load
P: Here φ is the angle between phase voltage and phase current. Reactive and apparent power follow as Q = √3 V_{L}I_{L} sin φ and S = √3 V_{L}I_{L}. Power can be measured with the two-wattmeter method.
X: A three-phase motor.
> A balanced star-connected motor runs from 400 V lines, taking 20 A per line at power factor 0.85.
> Phase voltage: 400 ÷ √3 = 231 V.
> Power: P = √3 × 400 × 20 × 0.85 = 11.8 kW.
> Apparent power: S = √3 × 400 × 20 = 13.9 kVA.
K: Balanced three-phase systems have three voltages 120° apart; in star V_{L} = √3V_{ph}, in delta I_{L} = √3I_{ph}; total power is √3V_{L}I_{L} cos φ.
!: Using phase values in P = √3V_{L}I_{L} cos φ. The formula uses line values; with phase values the power is 3V_{ph}I_{ph} cos φ.
EV: established | Three-phase AC has been the standard for large-scale generation and distribution since the late nineteenth century.
T: Phase sequence | The order in which the three phase voltages reach their maxima
T: Star connection | Three windings or loads joined at a common neutral point
T: Delta connection | Three windings or loads connected end to end in a closed triangle
SUM: Three voltages, 120° apart, sum to zero when balanced.
SUM: Star: V_{L} = √3V_{ph}; delta: I_{L} = √3I_{ph}.
SUM: P = √3V_{L}I_{L} cos φ.
SRC: Hughes E. (rev. Hiley J., Brown K. and McKenzie Smith I.), Electrical and Electronic Technology, 12th edition, Pearson | secondary | 2016
SRC: British Standards Institution, BS 7671:2018+A2:2022 Requirements for Electrical Installations (IET Wiring Regulations, 18th edition) | standard | 2022
Q: What is the line voltage of a UK three-phase low-voltage supply? | 400 V (230 V line to neutral).
Q: Why does a balanced star load need no neutral current? | The three phase currents are equal and 120° apart, so they sum to zero.
M1#engineering-u08-12-q1@1: What is the phase displacement between voltages in a three-phase supply? | 120° | 90° | 180° | 60° | The three voltages are displaced by a third of a cycle, 120°.
NUM2#engineering-u08-12-q2@2: A star-connected load is fed from 400 V lines. What is its phase voltage, in V? | 230.9 | 1 | V | V_{ph} = V_{L} ÷ √3 = 400 ÷ 1.732 = 230.9 V.
M2#engineering-u08-12-q3@2: In a delta connection the phase current is 10 A. What is the line current? | 17.3 A | 10 A | 5.8 A | 30 A | In delta, I_{L} = √3 × I_{ph} = 1.732 × 10 = 17.3 A.
M3#engineering-u08-12-q4@3: Three identical resistors are reconnected from star to delta on the same supply. How does the total power change? | It becomes three times larger | It halves | It stays the same | It becomes √3 times larger | Each resistor's voltage rises by √3, so power per resistor rises by 3.
SA3#engineering-u08-12-q5@1,3: Explain why three-phase supply is preferred to single-phase for large motors and power transmission. | Total instantaneous power in a balanced three-phase system is constant, giving smooth torque and less vibration. Three-phase windings create a rotating magnetic field, so induction motors are self-starting. For the same power, three-phase needs less conductor material than single-phase, reducing transmission cost and losses. | Constant power ; Rotating field ; Self-starting motors ; Less conductor material

## Diodes and rectifiers
LV: Year 1 · Intermediate
S: A diode lets current flow easily in one direction only. This lesson explains the p-n junction diode, its characteristic, and its use in rectifiers, smoothing circuits, voltage regulation with Zener diodes, and LEDs.
O: Describe the current-voltage characteristic of a p-n junction diode
O: Explain half-wave and full-wave bridge rectifiers and capacitor smoothing
O: Design simple diode circuits, including an LED current-limiting resistor and a Zener regulator
PRE: AC fundamentals
H: The diode
- A **p-n junction** conducts when **forward biased** (anode positive) once the voltage exceeds about **0.7 V** for silicon (around 0.3 V for Schottky diodes), and blocks when **reverse biased**, passing only a tiny leakage current.
- Too much reverse voltage causes **breakdown**. A **Zener diode** is designed to break down at a precise voltage and is used as a voltage reference.
- An **LED** emits light when forward biased, with a forward voltage of about 1.8 to 3.5 V depending on colour; its current must be limited by a series resistor.
E: R = (V_{s} − V_{f}) ÷ I :: series resistor for an LED or diode at current I
H: Rectifiers and smoothing
- A **half-wave** rectifier passes one half of each cycle; output ripple is at the supply frequency.
- A **full-wave bridge** uses four diodes so both halves are used; two diodes conduct at a time, so the output peak is V_{m} − 1.4 V, and ripple is at **twice** the supply frequency.
- A **reservoir capacitor** smooths the output; peak-to-peak ripple is roughly ΔV ≈ I ÷ (f_{r}C), where f_{r} is the ripple frequency.
- A **Zener regulator** (series resistor and Zener) or an integrated regulator then holds a steady output voltage.
H: Diodes for protection
P: Diodes protect circuits from reverse polarity, clamp spikes (flyback diodes across coils) and protect inputs from overvoltage. Rectifier diodes must be rated for the peak inverse voltage and the surge current when the reservoir capacitor first charges.
X: Smoothing a bridge rectifier.
> A bridge rectifier on 50 Hz mains supplies 0.5 A to a load through a 2200 µF reservoir capacitor.
> Ripple frequency is 100 Hz (full wave).
> ΔV ≈ 0.5 ÷ (100 × 2200 × 10^{-6}) = 2.27 V peak to peak.
> Doubling C to 4700 µF would reduce the ripple to about 1.06 V.
K: Diodes conduct one way above about 0.7 V; bridge rectifiers and reservoir capacitors turn AC into smoothed DC with ripple ΔV ≈ I/(f_{r}C); LEDs need a series resistor.
!: Connecting an LED directly to a supply. Its current rises steeply with voltage, so without a series resistor it will be destroyed.
EV: established | The Shockley diode equation describes the exponential forward characteristic of p-n junctions.
T: Forward bias | Applying a voltage that makes the anode positive relative to the cathode, allowing conduction
T: Rectifier | A circuit that converts AC to unidirectional current
T: Ripple | The residual AC variation on a rectified and smoothed DC output
SUM: Diodes conduct above about 0.7 V forward.
SUM: Bridge rectifier plus capacitor gives smoothed DC.
SUM: Limit LED current with a resistor.
SRC: Horowitz P. and Hill W., The Art of Electronics, 3rd edition, Cambridge University Press | secondary | 2015
SRC: Sedra A. S. and Smith K. C., Microelectronic Circuits, 7th edition, Oxford University Press | secondary | 2015
Q: What is the forward voltage of a silicon diode? | About 0.7 V.
Q: What is the ripple frequency of a full-wave rectifier on 50 Hz mains? | 100 Hz.
M1#engineering-u08-13-q1@1: When does a diode conduct? | When forward biased above its threshold voltage | When reverse biased by any voltage | Only when an AC supply is used | Whenever current is applied | A diode conducts when the anode is more positive than the cathode by about 0.7 V for silicon.
NUM2#engineering-u08-13-q2@3: An LED with forward voltage 2.1 V is run at 20 mA from 9 V. What series resistance is needed, in Ω? | 345 | 3 | Ω | R = (9 − 2.1) ÷ 0.02 = 345 Ω; a 330 Ω or 360 Ω standard value would be chosen.
M2#engineering-u08-13-q3@2: Why does a bridge rectifier output peak at about 1.4 V below the input peak? | Two diodes conduct in series at any time | The capacitor absorbs 1.4 V | Transformers always lose 1.4 V | The load drops half the voltage | In a bridge, current passes through two forward-biased diodes, each dropping about 0.7 V.
M3#engineering-u08-13-q4@2: How does doubling the reservoir capacitance affect ripple? | It roughly halves the ripple | It doubles the ripple | It has no effect on ripple | It removes ripple entirely | Ripple ΔV ≈ I/(f_{r}C), so it is inversely proportional to C.
SA3#engineering-u08-13-q5@2,3: Describe how a mains power supply produces a steady 5 V DC output. | A transformer reduces and isolates the mains voltage. A bridge rectifier converts AC to pulsating DC using both halves of the cycle. A reservoir capacitor smooths it, leaving ripple at 100 Hz. A regulator, such as a Zener circuit or integrated linear or switching regulator, then holds the output at 5 V despite ripple and load changes. | Transformer ; Bridge rectifier ; Reservoir capacitor ; Regulator

## Transistors as switches and amplifiers
LV: Year 1 · Intermediate
S: Transistors are the building blocks of modern electronics, used as switches in digital and power circuits and as amplifiers in analogue circuits. This lesson explains bipolar transistors and MOSFETs and how each is used in both roles.
O: Describe how bipolar junction transistors and MOSFETs control current
O: Design a transistor switch for a load such as a relay or LED
O: Explain the operation and voltage gain of a common-emitter amplifier
PRE: Diodes and rectifiers
H: Two families
- A **bipolar junction transistor (BJT)** has base, collector and emitter. A small base current controls a larger collector current: I_{C} = βI_{B}, where the current gain β is typically 100 or more. The base-emitter junction needs about 0.7 V.
- A **MOSFET** has gate, drain and source. The gate voltage, above a **threshold voltage**, controls the drain current; the gate draws almost no steady current. When fully on, it behaves like a small resistance R_{DS(on)}.
- MOSFETs dominate digital chips (CMOS) and power switching; BJTs remain common in analogue circuits.
H: Transistor as a switch
- In a switch, the transistor is either **cut off** (no current) or **saturated** (fully on, with V_{CE(sat)} about 0.2 V for a BJT).
- To saturate a BJT, supply base current I_{B} > I_{C} ÷ β_{min}, usually with a safety factor of 2 to 10.
E: R_{B} = (V_{in} − 0.7) ÷ I_{B} :: base resistor for a BJT switch
- Power lost in the switch is small in both states; most loss occurs during switching transitions.
H: Transistor as an amplifier
P: For amplification, a transistor is **biased** in its active region, so that small input changes cause larger output changes. In a **common-emitter** amplifier, the voltage gain with an emitter resistor is approximately −R_{C} ÷ R_{E}; the minus sign shows the output is inverted. Emitter degeneration makes the gain stable and less dependent on β. Coupling capacitors block DC bias from the signal source and load.
X: Switching a relay.
> A 5 V microcontroller output drives a 12 V relay coil taking 100 mA through an NPN transistor with β_{min} = 100.
> Minimum base current: 100 mA ÷ 100 = 1 mA. Use 2 mA to ensure saturation.
> R_{B} = (5 − 0.7) ÷ 0.002 = 2150 Ω; choose 2.2 kΩ.
> A flyback diode across the coil protects the transistor when it switches off.
K: Transistors use a small input (base current or gate voltage) to control a larger current; as switches they run fully off or saturated, as amplifiers they are biased in the active region.
!: Designing a BJT switch with exactly I_{C}/β of base current. β varies widely between devices and with temperature, so overdrive the base to guarantee saturation.
EV: established | CMOS technology based on MOSFETs underlies almost all modern digital integrated circuits.
T: Current gain | The ratio of collector current to base current in a BJT, β
T: Saturation | The fully-on state of a transistor switch, with minimal voltage across it
T: Threshold voltage | The gate-source voltage above which a MOSFET begins to conduct
SUM: BJT: I_{C} = βI_{B}; MOSFET: gate voltage controls drain current.
SUM: Switch: off or saturated, with base overdrive.
SUM: Amplifier: biased active, gain ≈ −R_{C}/R_{E}.
SRC: Horowitz P. and Hill W., The Art of Electronics, 3rd edition, Cambridge University Press | secondary | 2015
SRC: Sedra A. S. and Smith K. C., Microelectronic Circuits, 7th edition, Oxford University Press | secondary | 2015
Q: What controls the current in a MOSFET? | The gate-source voltage, above the threshold voltage.
Q: What is V_{CE(sat)} for a saturated BJT? | About 0.2 V.
M1#engineering-u08-14-q1@1: In a BJT, what does a small base current control? | A larger collector current | The supply voltage | The gate threshold | The emitter's resistance | The collector current is approximately β times the base current.
M2#engineering-u08-14-q2@2: A BJT with β = 200 carries a collector current of 50 mA in the active region. What is the base current? | 0.25 mA | 10 mA | 4 mA | 2.5 mA | I_{B} = I_{C} ÷ β = 50 mA ÷ 200 = 0.25 mA.
NUM2#engineering-u08-14-q3@2: A 3.3 V logic output must supply 1.5 mA of base current to a BJT switch. What base resistor is needed, in Ω? | 1733 | 20 | Ω | R_{B} = (3.3 − 0.7) ÷ 0.0015 = 1733 Ω; a 1.8 kΩ or 1.5 kΩ resistor would be chosen.
M3#engineering-u08-14-q4@3: A common-emitter amplifier has R_{C} = 4.7 kΩ and an unbypassed R_{E} = 470 Ω. What is its approximate voltage gain? | −10 | +10 | −100 | −0.1 | Gain ≈ −R_{C} ÷ R_{E} = −4700 ÷ 470 = −10, inverted.
SA3#engineering-u08-14-q5@1,2: Compare a BJT and a MOSFET as a switch for a 2 A DC motor controlled by a microcontroller. | A BJT needs a continuous base current of at least I_{C}/β, perhaps 20 to 100 mA, more than a microcontroller pin can give, so a driver is needed; it has a saturation voltage drop. A logic-level MOSFET needs only a gate voltage and negligible steady current, and with low R_{DS(on)} dissipates little power. Both need a flyback diode for the motor. The MOSFET is usually preferred. | Base current demand ; Gate voltage drive ; Losses ; Flyback diode ; Choice

## Operational amplifiers
LV: Year 1 · Intermediate
S: The operational amplifier is a versatile integrated circuit used for amplification, filtering, signal conditioning and comparison. This lesson explains the ideal op-amp, the golden rules for negative feedback and the standard inverting and non-inverting circuits.
O: State the properties of an ideal op-amp and the golden rules
O: Analyse inverting, non-inverting, follower and summing amplifiers
O: Explain the limits of real op-amps, including saturation and gain-bandwidth
PRE: Transistors as switches and amplifiers
H: The ideal op-amp
- Very high open-loop gain, very high input impedance and very low output impedance.
- With **negative feedback**, two golden rules apply: the voltages at the two inputs are equal (V_{+} = V_{−}), and **no current** flows into the inputs.
- Without feedback, the op-amp acts as a **comparator**: its output swings to the positive or negative supply depending on which input is higher.
H: Standard circuits
E: Inverting: V_{out} = −(R_{f} ÷ R_{in})V_{in} :: the inverting input is a virtual earth
E: Non-inverting: V_{out} = (1 + R_{f} ÷ R_{1})V_{in} :: high input impedance
- **Voltage follower** (buffer): output connected to the inverting input; gain 1, very high input impedance, used to stop a source being loaded.
- **Summing amplifier**: several inputs through resistors to a virtual earth; the output is a weighted sum.
- Adding capacitors makes **integrators**, **differentiators** and active **filters**.
H: Real op-amps
P: The output cannot exceed the supply rails, so large gains on large signals cause **saturation** (clipping). The **gain-bandwidth product** is roughly constant: an op-amp with a 1 MHz gain-bandwidth product gives a gain of 10 only up to about 100 kHz. Other limits are slew rate, input offset voltage and input bias currents.
X: Two amplifiers.
> Inverting: R_{in} = 10 kΩ, R_{f} = 100 kΩ, so gain = −10. A 0.2 V input gives −2 V.
> Non-inverting: R_{1} = 10 kΩ, R_{f} = 90 kΩ, so gain = 1 + 9 = 10. A 0.2 V input gives +2 V.
> With ±12 V supplies, a 1.5 V input to either would ask for 15 V and the output would saturate near the rail.
K: With negative feedback, an ideal op-amp holds its inputs at equal voltage and draws no input current; inverting gain is −R_{f}/R_{in}, non-inverting gain is 1 + R_{f}/R_{1}.
!: Forgetting the supply rails. An op-amp output cannot exceed its supply voltage, so the formulas fail once the output saturates.
EV: established | The ideal op-amp model gives accurate results for most low-frequency circuits with negative feedback.
T: Virtual earth | The inverting input of an inverting amplifier held at 0 V by negative feedback
T: Negative feedback | Feeding part of the output back to the inverting input to stabilise gain
T: Gain-bandwidth product | The roughly constant product of closed-loop gain and bandwidth for an op-amp
SUM: Golden rules: V_{+} = V_{−}, no input current.
SUM: Inverting −R_{f}/R_{in}; non-inverting 1 + R_{f}/R_{1}.
SUM: Real limits: rails, gain-bandwidth, slew rate.
SRC: Horowitz P. and Hill W., The Art of Electronics, 3rd edition, Cambridge University Press | secondary | 2015
SRC: Franco S., Design with Operational Amplifiers and Analog Integrated Circuits, 4th edition, McGraw-Hill | secondary | 2015
Q: What is the gain of a voltage follower? | 1, with very high input impedance and low output impedance.
Q: What happens to an op-amp output if the calculated output exceeds the supply? | It saturates near the supply rail and the signal clips.
M1#engineering-u08-15-q1@1: What is the voltage at the inverting input of an inverting amplifier? | Approximately 0 V, a virtual earth | Equal to the input voltage | Equal to the supply voltage | Equal to the output voltage | Negative feedback holds V_{−} equal to V_{+}, which is at ground.
NUM2#engineering-u08-15-q2@2: A non-inverting amplifier has R_{f} = 47 kΩ and R_{1} = 10 kΩ. What is its gain? | 5.7 | 0.05 | – | Gain = 1 + 47 ÷ 10 = 5.7.
M2#engineering-u08-15-q3@2: An inverting amplifier has R_{in} = 2 kΩ and R_{f} = 20 kΩ. What is the output for a 0.3 V input? | −3 V | +3 V | −6 V | +0.3 V | The gain is −R_{f}/R_{in} = −10, so V_{out} = −10 × 0.3 = −3 V.
M3#engineering-u08-15-q4@3: An op-amp has a gain-bandwidth product of 1 MHz. Up to what frequency can it give a gain of 50? | About 20 kHz | About 50 MHz | About 1 MHz | About 50 kHz | Bandwidth ≈ GBW ÷ gain = 1 MHz ÷ 50 = 20 kHz.
SA3#engineering-u08-15-q5@1,3: Explain why a voltage follower is useful between a sensor with high output resistance and a low-resistance load. | Connected directly, the load and sensor resistance form a divider, so most of the signal would be lost. A follower draws almost no input current, so the sensor is not loaded, and its low output impedance can drive the load with the same voltage. Gain is 1, but the signal is preserved. | Loading effect ; High input impedance ; Low output impedance ; Unity gain

## Digital logic
LV: Year 1 · Foundation
S: Digital systems represent information with two states and process it with logic gates. This lesson covers binary numbers, logic gates and truth tables, Boolean algebra and De Morgan's theorems, and the difference between combinational and sequential logic.
O: Convert between binary and decimal and describe logic levels
O: Write truth tables and Boolean expressions for logic gates and simple circuits
O: Distinguish combinational from sequential logic and describe flip-flops
PRE: Transistors as switches and amplifiers
H: Binary and gates
- Digital signals have two **logic levels**, 0 and 1, represented by voltage ranges (for example near 0 V and near 3.3 V or 5 V).
- In binary, each place is a power of 2: 1011_{2} = 8 + 0 + 2 + 1 = 11.
- **NOT** inverts; **AND** gives 1 only if all inputs are 1; **OR** gives 1 if any input is 1; **NAND** and **NOR** are AND and OR followed by NOT; **XOR** gives 1 if the inputs differ.
- **NAND** (and NOR) gates are **universal**: any logic function can be built from them alone.
H: Boolean algebra
E: (A · B)' = A' + B' and (A + B)' = A' · B' :: De Morgan's theorems
- Rules such as A + A' = 1, A · A' = 0 and A + A · B = A simplify expressions, reducing the number of gates.
- **Karnaugh maps** give a visual way of simplifying functions of up to about four variables.
H: Combinational and sequential logic
P: In **combinational** logic, outputs depend only on current inputs: adders, multiplexers, decoders. In **sequential** logic, outputs also depend on past inputs, stored in memory elements. A **flip-flop** stores one bit; a **D flip-flop** copies its input to its output on a clock edge. Flip-flops form registers, counters and state machines, the basis of processors.
X: A half adder.
> Adding two one-bit numbers A and B gives a sum bit S and a carry bit C.
> Truth table: 0 + 0 gives S = 0, C = 0; 0 + 1 or 1 + 0 gives S = 1, C = 0; 1 + 1 gives S = 0, C = 1.
> So S = A XOR B and C = A AND B.
> Chaining full adders, which also take a carry in, adds binary numbers of any length.
K: Logic gates implement Boolean functions; De Morgan's theorems and Karnaugh maps simplify them; combinational circuits depend only on current inputs, sequential circuits also store state.
!: Applying De Morgan's theorem without changing the operator. Inverting a product gives a sum of inverses, and the reverse.
EV: established | Boolean algebra, applied to switching circuits by Claude Shannon in 1938, is the foundation of digital design.
T: Logic gate | A circuit that performs a Boolean operation on one or more binary inputs
T: Truth table | A table listing the output of a logic circuit for every combination of inputs
T: Flip-flop | A sequential circuit that stores one bit of information
SUM: Binary uses powers of 2.
SUM: NAND and NOR are universal; De Morgan simplifies.
SUM: Combinational versus sequential logic.
SRC: Shannon C. E., "A symbolic analysis of relay and switching circuits", Transactions of the American Institute of Electrical Engineers 57(12), 713–723 | primary | 1938
SRC: Harris D. M. and Harris S. L., Digital Design and Computer Architecture, 2nd edition, Morgan Kaufmann | secondary | 2012
Q: What is the decimal value of 1101_{2}? | 13 (8 + 4 + 0 + 1).
Q: Why are NAND gates called universal? | Any logic function can be built using only NAND gates.
M1#engineering-u08-16-q1@1: Which gate gives an output of 1 only when its inputs are different? | XOR | AND | NOR | NAND | Exclusive-OR outputs 1 when exactly one input is 1.
M2#engineering-u08-16-q2@2: By De Morgan's theorem, what is (A + B)'? | A' · B' | A' + B' | A · B | (A · B)' | Inverting a sum gives the product of the inverted terms.
NUM1#engineering-u08-16-q3@1: What is the binary number 101101 in decimal? | 45 | 0.5 | – | 32 + 0 + 8 + 4 + 0 + 1 = 45.
M3#engineering-u08-16-q4@3: Which of these is a sequential circuit? | A binary counter | A half adder | A multiplexer | A decoder | A counter must remember its previous state, so it uses flip-flops.
SA3#engineering-u08-16-q5@2,3: Use Boolean algebra to show that a NOT gate and an AND gate can be made from NAND gates. | NOT: connect both inputs of a NAND together, giving (A · A)' = A'. AND: follow a NAND with a NAND-based NOT, giving ((A · B)')' = A · B. This shows NAND is universal, since OR can then be made using De Morgan: A + B = (A' · B')'. | NAND as NOT ; NAND then NOT gives AND ; De Morgan for OR ; Universality

## Transformers
LV: Year 1 · Intermediate
S: Transformers change AC voltages efficiently and make long-distance electricity transmission possible. This lesson explains how transformers work, the ideal transformer equations, losses and efficiency, and their role in the power system.
O: Explain the operation of a transformer using Faraday's law
O: Apply the ideal transformer equations for voltage, current and impedance
O: Describe transformer losses and why high-voltage transmission is used
PRE: AC power and power factor
H: How it works
P: An alternating current in the **primary** winding sets up an alternating magnetic flux in a laminated iron core. The changing flux links the **secondary** winding and induces a voltage there (Faraday's law, e = N dΦ/dt). Because only a **changing** flux induces voltage, transformers do not work with steady DC. They also provide **electrical isolation** between circuits.
H: Ideal transformer equations
E: V_{1} ÷ V_{2} = N_{1} ÷ N_{2} :: voltage ratio equals turns ratio
E: I_{1} ÷ I_{2} = N_{2} ÷ N_{1} :: current ratio is the inverse
E: Z_{1} = (N_{1} ÷ N_{2})^{2} Z_{2} :: a load impedance referred to the primary
- A **step-down** transformer has fewer secondary turns; a **step-up** transformer has more.
- In an ideal transformer, input and output apparent power are equal: V_{1}I_{1} = V_{2}I_{2}.
H: Losses and transmission
- **Copper losses**: I^{2}R heating in the windings, varying with load.
- **Iron (core) losses**: **hysteresis** and **eddy currents**, roughly constant at fixed voltage; reduced by laminating the core and using special steels.
- Large power transformers exceed 99% efficiency.
- Transmitting at high voltage reduces current for the same power, cutting I^{2}R losses. In Great Britain the transmission network runs at 400 kV and 275 kV, with distribution at 132 kV and below, stepped down to 230/400 V for homes and businesses.
X: A mains adaptor.
> A transformer steps 230 V down to 12 V; the primary has 1150 turns.
> Secondary turns: N_{2} = 1150 × 12 ÷ 230 = 60 turns.
> If the secondary supplies 2 A, it delivers 24 VA, so the ideal primary current is 24 ÷ 230 = 0.104 A.
> Seen from the primary, a 6 Ω load appears as (1150 ÷ 60)^{2} × 6 = 2204 Ω.
K: Transformers use a changing flux to change AC voltage in proportion to the turns ratio, with current in inverse proportion; high-voltage transmission reduces I^{2}R losses.
!: Thinking a step-up transformer increases power. Voltage rises but current falls, so power stays the same, minus losses.
EV: established | Transformer action follows from Faraday's law of electromagnetic induction.
T: Turns ratio | The ratio of primary to secondary turns, N_{1}/N_{2}
T: Eddy currents | Circulating currents induced in a conductive core that cause heating losses
T: Hysteresis loss | Energy lost in repeatedly magnetising and demagnetising the core
SUM: V_{1}/V_{2} = N_{1}/N_{2}; I_{1}/I_{2} = N_{2}/N_{1}.
SUM: Copper and iron losses; laminations reduce eddy currents.
SUM: High-voltage transmission cuts losses.
SRC: Hughes E. (rev. Hiley J., Brown K. and McKenzie Smith I.), Electrical and Electronic Technology, 12th edition, Pearson | secondary | 2016
SRC: National Grid Electricity Transmission, Electricity Ten Year Statement | data | 2023
Q: Why do transformers not work on steady DC? | Steady DC gives a constant flux, and only a changing flux induces a voltage in the secondary.
Q: Why are transformer cores laminated? | To reduce eddy current losses by breaking up the circulating current paths.
M1#engineering-u08-17-q1@1: A transformer has twice as many secondary turns as primary turns. What does it do? | Doubles the voltage and halves the current | Doubles both voltage and current | Halves the voltage and doubles the power | Doubles the power output | Voltage scales with the turns ratio and current inversely; power is unchanged.
NUM2#engineering-u08-17-q2@2: A transformer has a turns ratio of 20:1 and 230 V on the primary. What is the secondary voltage, in V? | 11.5 | 0.1 | V | V_{2} = 230 × 1 ÷ 20 = 11.5 V.
M2#engineering-u08-17-q3@2: Which loss is reduced by laminating a transformer core? | Eddy current loss | Copper loss | Hysteresis loss only | Dielectric loss | Laminations break up the paths of eddy currents induced in the core.
M3#engineering-u08-17-q4@3: Power of 100 MW is sent at 400 kV instead of 100 kV over the same line. How do I^{2}R losses change? | They fall to one sixteenth | They fall to a quarter | They are unchanged | They rise four times | Current falls by a factor of 4, so I^{2}R losses fall by 16.
SA3#engineering-u08-17-q5@1,3: Explain why electricity is transmitted at very high voltages and then stepped down near users. | For a given power P = VI, raising the voltage reduces the current. Losses in the lines are I^{2}R, so higher voltage greatly reduces losses and allows thinner conductors. Transformers make the change efficiently. High voltages are unsafe for use and need large insulation, so they are stepped down in stages to 230/400 V near consumers. | P = VI ; I^{2}R losses ; Transformer efficiency ; Safety at point of use

## Electric motors and generators
LV: Year 1 · Intermediate
S: Electric machines convert between electrical and mechanical energy and account for a large share of electricity use. This lesson explains the principles of motors and generators, DC machines, induction motors and synchronous machines.
O: Explain motor and generator action using the force on a conductor and Faraday's law
O: Analyse a DC motor using back EMF
O: Calculate synchronous speed and slip for an induction motor
PRE: Transformers
H: Principles
E: F = BIL :: force on a conductor of length L carrying current I in field B
E: e = N dΦ/dt :: induced EMF (Faraday's law), opposing the change (Lenz's law)
- **Motor action**: a current-carrying conductor in a magnetic field feels a force (Fleming's left-hand rule).
- **Generator action**: a conductor moving through a field has an EMF induced in it (Fleming's right-hand rule).
- Every motor also generates a **back EMF**, and every generator also feels a braking force: the same machine can do both.
H: DC motors
E: V = E + I_{a}R_{a} :: armature supply voltage, back EMF E and armature resistance R_{a}
- Speed is proportional to back EMF divided by flux; torque is proportional to flux times armature current.
- At start-up there is no back EMF, so the starting current can be very large unless limited.
- Brushless DC motors, with electronic commutation, are now common in drones, fans and electric vehicles.
H: AC machines
E: n_{s} = 120f ÷ p :: synchronous speed in rpm for frequency f and p poles
E: s = (n_{s} − n) ÷ n_{s} :: slip of an induction motor running at speed n
- An **induction motor** has a rotating stator field that induces currents in the rotor; the rotor must run slightly slower than synchronous speed (slip, typically 2 to 5%). It is rugged, cheap and the workhorse of industry.
- A **synchronous machine** runs at exactly synchronous speed; large synchronous generators produce most grid power.
- **Variable speed drives** (inverters) change the supply frequency to control motor speed efficiently.
X: An induction motor.
> A 4-pole induction motor runs on a 50 Hz supply at 1440 rpm.
> Synchronous speed: n_{s} = 120 × 50 ÷ 4 = 1500 rpm.
> Slip: s = (1500 − 1440) ÷ 1500 = 0.04, or 4%.
> At full load the slip would rise slightly; the motor can never reach 1500 rpm unaided.
K: Motors and generators rely on F = BIL and Faraday's law; DC motors obey V = E + I_{a}R_{a}; induction motors run at a slip below synchronous speed n_{s} = 120f/p.
!: Expecting an induction motor to run at synchronous speed. With no slip, no current would be induced in the rotor and there would be no torque.
EV: established | Electric motor systems account for a large share of global electricity consumption, estimated by the International Energy Agency at over 40%.
T: Back EMF | The voltage generated in a motor's windings by its rotation, opposing the supply
T: Synchronous speed | The speed of the rotating magnetic field, 120f/p rpm
T: Slip | The fractional difference between synchronous speed and rotor speed in an induction motor
SUM: F = BIL for motors; e = N dΦ/dt for generators.
SUM: DC motor: V = E + I_{a}R_{a}.
SUM: Induction motor speed below n_{s} = 120f/p.
SRC: Hughes E. (rev. Hiley J., Brown K. and McKenzie Smith I.), Electrical and Electronic Technology, 12th edition, Pearson | secondary | 2016
SRC: Waide P. and Brunner C. U., Energy-Efficiency Policy Opportunities for Electric Motor-Driven Systems, International Energy Agency Working Paper | data | 2011
Q: What is the synchronous speed of a 2-pole motor on 50 Hz? | 3000 rpm.
Q: Why does a DC motor draw a large current when starting? | There is no back EMF at standstill, so only the small armature resistance limits the current.
M1#engineering-u08-18-q1@1: Which rule gives the direction of force on a current-carrying conductor in a motor? | Fleming's left-hand rule | Fleming's right-hand rule | Lenz's law alone | The right-hand grip rule | The left-hand rule relates field, current and force for motor action.
NUM2#engineering-u08-18-q2@2: A 240 V DC motor has armature resistance 0.5 Ω and armature current 20 A. What is the back EMF, in V? | 230 | 0.5 | V | E = V − I_{a}R_{a} = 240 − 20 × 0.5 = 230 V.
M2#engineering-u08-18-q3@3: A 6-pole induction motor on a 50 Hz supply has 5% slip. What is its speed? | 950 rpm | 1000 rpm | 1500 rpm | 900 rpm | n_{s} = 120 × 50 ÷ 6 = 1000 rpm; n = 1000 × (1 − 0.05) = 950 rpm.
M3#engineering-u08-18-q4@2: How do variable speed drives control an induction motor's speed? | By changing the supply frequency | By changing the number of poles while running | By adding resistance in the supply line | By reversing the phase sequence repeatedly | Synchronous speed is proportional to frequency, so an inverter varies frequency to control speed.
SA3#engineering-u08-18-q5@1,3: Explain why an induction motor cannot produce torque at synchronous speed. | Torque depends on currents induced in the rotor, which need relative motion between the rotating field and the rotor conductors (Faraday's law). At synchronous speed the rotor turns with the field, there is no relative motion, no induced EMF and no rotor current, so no torque. Under load the motor slows slightly, slip appears and torque is produced. | Induction needs relative motion ; Zero slip means zero EMF ; No rotor current ; Slip under load
`;
