// SciGradify Chemical Kinetics (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## Introduction to reaction rates
LV: Year 1 · Foundation
S: Reaction rate measures how quickly reactants are used up or products form. This lesson explains how rates are defined and measured.
O: Define rate of reaction
O: Calculate rates from experimental data
O: Describe methods for measuring rates
H: Defining rate
- **Rate** = change in concentration ÷ time, often in **mol dm⁻³ s⁻¹**.
- Can also be measured as change in mass, volume of gas or colour per unit time.
- **Initial rate** is the rate at the start, found from the gradient of the tangent at t = 0.
- Rate usually **decreases** as reactants are used up.
D: chem-rate-curve
H: Measuring rates
- **Gas volume**: gas syringe or upturned measuring cylinder.
- **Mass loss**: balance, when gas escapes.
- **Colour change**: colorimeter.
- **Precipitate**: time to obscure a cross ("disappearing cross").
P: The gradient of a concentration-time graph at any point gives the rate at that moment. Rates matter in industry, where faster reactions save time and money, and in safety, where uncontrolled fast reactions can be dangerous.
X: Rate from gas volume.
> Magnesium reacts with acid, producing hydrogen.
> In the first 20 s, 40 cm³ of gas is collected.
> Mean rate = 40 ÷ 20 = 2.0 cm³ s⁻¹.
> The rate slows as the acid is used up.
K: Rate is the change in concentration or another measurable quantity per unit time, found from gradients of graphs, with initial rate from the tangent at t = 0; methods include gas volume, mass loss, colour change and precipitate formation.
!: Thinking rate stays constant throughout a reaction. It usually decreases as reactants are used up.
EV: established | Rates are measured from changes in concentration or related properties over time (Atkins and de Paula, 2018).
T: Rate of reaction | Change in concentration per unit time
T: Initial rate | The rate at the start of a reaction
T: Tangent | A straight line touching a curve at one point
SUM: Change per unit time.
SUM: Gradients give rates.
SUM: Several measuring methods.
SRC: Atkins P. and de Paula J., Atkins' Physical Chemistry, 11th edition, Oxford University Press | secondary | 2018
SRC: OpenStax, Chemistry 2e, section 12.1 "Chemical Reaction Rates" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/12-1-chemical-reaction-rates
Q: What are the usual units of rate? | mol dm⁻³ s⁻¹.
Q: How is the initial rate found from a graph? | From the gradient of the tangent at t = 0.
M1#chemistry-u07-01-q1@1: Which method suits a reaction that produces a gas? | Collecting the gas in a gas syringe | Timing a colour change only | Measuring the pH once | Weighing the reactants before starting | Gas volume collected over time shows the rate.
M2#chemistry-u07-01-q2@2: Why does the rate of most reactions decrease over time? | Reactants are used up, so collisions become less frequent | Products speed up the reaction | Temperature always rises | Catalysts are consumed | Lower concentration means fewer collisions per second.
NUM1#chemistry-u07-01-q3@1: 60 cm³ of gas is produced in 30 s. What is the mean rate in cm³ s⁻¹? | 2 | 0 | cm³ s⁻¹ | Rate = 60 ÷ 30 = 2 cm³ s⁻¹.
M3#chemistry-u07-01-q4@3: Why is a colorimeter useful for measuring rate? | It measures concentration changes continuously without disturbing the reaction | It measures the gas produced | It speeds up the reaction | It weighs the products | Absorbance tracks coloured species as they change.
SA2#chemistry-u07-01-q5@1,3: Explain how reaction rates are defined and measured. | Rate is the change in concentration of a reactant or product per unit time, often in mol dm⁻³ s⁻¹, or the change in mass, gas volume or colour per unit time. The gradient of a concentration-time graph gives the rate, and the tangent at t = 0 gives the initial rate. Rates usually fall as reactants are used up. Methods include gas syringes, balances for mass loss, colorimeters for colour change and the disappearing cross for precipitates. | Definition ; Units ; Gradients ; Decreasing rate ; Methods

## Collision theory
LV: Year 1 · Foundation
S: Collision theory explains why reactions happen and what changes their rates. This lesson explains successful collisions and the factors affecting rate.
O: State the requirements for a successful collision
O: Explain the effect of concentration, pressure and surface area on rate
O: Explain the effect of temperature on rate
H: Successful collisions
- Particles must **collide**.
- They must collide with energy at least equal to the **activation energy**.
- They must collide with the correct **orientation**.
- Only a small fraction of collisions are successful.
D: chem-collision-ea
H: Factors
- **Concentration** or **pressure**: more particles per volume, more frequent collisions.
- **Surface area**: smaller pieces expose more particles to collision.
- **Temperature**: particles move faster, colliding more often and with more energy.
- **Catalysts**: provide a route with lower activation energy.
P: Temperature has the biggest effect because it increases the fraction of collisions with enough energy, not just the collision frequency. Powdered reactants, such as flour dust, can react explosively because of their large surface area.
X: Marble chips and acid.
> Large marble chips react slowly with hydrochloric acid.
> Powdered marble of the same mass reacts much faster.
> The powder has a much larger surface area.
> More acid particles collide with the solid each second.
K: Successful collisions require enough energy and correct orientation; higher concentration, pressure and surface area increase collision frequency, higher temperature increases both frequency and energy, and catalysts lower the activation energy.
!: Thinking every collision causes a reaction. Most collisions lack enough energy or the right orientation.
EV: established | Collision theory explains rate in terms of the frequency and energy of collisions (Atkins and de Paula, 2018).
T: Collision theory | Reactions occur when particles collide with enough energy and orientation
T: Successful collision | A collision that leads to reaction
T: Surface area | The exposed area of a solid
SUM: Energy and orientation.
SUM: Frequency factors.
SUM: Temperature matters most.
SRC: Atkins P. and de Paula J., Atkins' Physical Chemistry, 11th edition, Oxford University Press | secondary | 2018
SRC: OpenStax, Chemistry 2e, section 12.5 "Collision Theory" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/12-5-collision-theory
Q: What two conditions must a collision meet to be successful? | Enough energy and the correct orientation.
Q: Why does powder react faster than lumps? | It has a larger surface area for collisions.
M1#chemistry-u07-02-q1@1: How does increasing concentration affect rate? | It increases rate by making collisions more frequent | It decreases rate by crowding particles | It has no effect on the rate | It lowers the activation energy | More particles in the same volume collide more often.
M2#chemistry-u07-02-q2@2: Why does temperature have a large effect on rate? | More collisions have energy above the activation energy | It changes the orientation of all particles | It increases the number of particles | It lowers the concentration | The fraction of energetic collisions rises sharply.
MATCH1#chemistry-u07-02-q3@1: Match each factor to its effect. | Concentration = More frequent collisions ; Surface area = More exposed particles ; Temperature = More energetic collisions ; Catalyst = Lower activation energy | Factors change rate in different ways.
M3#chemistry-u07-02-q4@3: Why can flour dust explode in a mill? | Its huge surface area allows extremely rapid combustion | Flour is a strong oxidising agent | Dust lowers the temperature | Flour particles are radioactive | Fine particles burn almost instantly in air.
SA2#chemistry-u07-02-q5@1,3: Explain collision theory and how it accounts for factors affecting rate. | Reactions occur when particles collide with energy at least equal to the activation energy and with the correct orientation; most collisions fail. Higher concentration or pressure and larger surface area increase collision frequency, so powdered marble reacts faster than chips and flour dust can explode. Higher temperature makes particles move faster, increasing frequency and especially the proportion of collisions with enough energy. Catalysts provide a route with lower activation energy. | Requirements ; Concentration and pressure ; Surface area ; Temperature ; Catalysts

## Activation energy
LV: Year 1 · Foundation
S: Activation energy is the minimum energy needed for a reaction to occur. This lesson explains its role using energy distributions.
O: Define activation energy
O: Use the Maxwell-Boltzmann distribution to explain the effect of temperature
O: Explain how catalysts lower activation energy
H: Definition
- **Activation energy** (Ea) is the **minimum energy** colliding particles need to react.
- It is needed to break bonds and start the reaction.
- Reactions with high Ea are slow at room temperature.
- Shown as the energy gap between reactants and the top of the energy profile.
D: chem-activation-energy
H: Energy distributions
- The **Maxwell-Boltzmann distribution** shows the energies of particles.
- Only particles in the tail beyond Ea can react.
- At higher temperature, the curve flattens and shifts right; the area beyond Ea **increases** a lot.
- A **catalyst** moves Ea to the left, so more particles exceed it.
P: The total area under the curve represents the total number of particles and stays the same when temperature changes. A 10 °C rise often roughly doubles the rate of many reactions near room temperature because the fraction above Ea grows rapidly.
X: Effect of temperature.
> At 300 K, a small fraction of particles have energy above Ea.
> At 310 K, the distribution spreads to higher energies.
> The area beyond Ea roughly doubles.
> The rate roughly doubles.
K: Activation energy is the minimum energy for reaction; on a Maxwell-Boltzmann distribution, only particles beyond Ea react, so raising temperature or using a catalyst greatly increases the fraction able to react.
!: Thinking catalysts give particles more energy. Catalysts lower the activation energy instead.
EV: established | The fraction of molecules exceeding Ea explains the temperature sensitivity of rates (Atkins and de Paula, 2018).
T: Activation energy | Minimum energy for colliding particles to react
T: Maxwell-Boltzmann distribution | Distribution of particle energies
T: Catalyst | A substance lowering activation energy without being used up
SUM: Minimum energy needed.
SUM: Tail beyond Ea reacts.
SUM: Temperature and catalysts.
SRC: Atkins P. and de Paula J., Atkins' Physical Chemistry, 11th edition, Oxford University Press | secondary | 2018
SRC: OpenStax, Chemistry 2e, section 12.5 "Collision Theory" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/12-5-collision-theory
Q: What is activation energy? | The minimum energy colliding particles need to react.
Q: What does the area under a Maxwell-Boltzmann curve represent? | The total number of particles.
M1#chemistry-u07-03-q1@1: Which particles can react on a Maxwell-Boltzmann distribution? | Those with energy above the activation energy | Those with the most common energy | Those with the lowest energy | All particles equally | Only energetic enough collisions succeed.
M2#chemistry-u07-03-q2@2: How does a catalyst affect the Maxwell-Boltzmann distribution? | It does not change the curve but lowers Ea | It shifts the whole curve to higher energy | It increases the number of particles | It raises the temperature | More particles exceed a lower activation energy.
MATCH1#chemistry-u07-03-q3@2: Match each change to its effect. | Higher temperature = Curve spreads right ; Catalyst = Lower Ea ; Total area = Unchanged ; High Ea = Slow reaction | Distributions explain rate changes.
M3#chemistry-u07-03-q4@3: Why can a 10 °C rise roughly double the rate? | The fraction of particles above Ea increases greatly | The number of particles doubles | The activation energy halves | Collisions become twice as long | The energetic tail grows much more than the average energy.
SA2#chemistry-u07-03-q5@1,3: Explain activation energy and how temperature and catalysts affect the fraction of successful collisions. | Activation energy is the minimum energy colliding particles need to react, shown as the gap from reactants to the peak of the energy profile. On a Maxwell-Boltzmann distribution, only particles in the tail beyond Ea can react. Raising temperature spreads the curve to higher energies while keeping the area constant, greatly increasing the area beyond Ea, so a 10 °C rise may double the rate. A catalyst lowers Ea, so more particles exceed it. | Definition ; Distribution ; Temperature ; Catalyst ; Rate doubling

## Reaction profiles
LV: Year 1 · Application
S: Reaction profiles show how energy changes as a reaction proceeds. This lesson explains how to draw and interpret them.
O: Identify features of reaction profiles
O: Distinguish transition states and intermediates
O: Interpret multi-step profiles
H: Features
- The **x-axis** is reaction progress; the **y-axis** is energy.
- **Reactants** and **products** are shown as levels.
- The **peak** is the **transition state**, the highest-energy arrangement.
- Ea is the height from reactants to the peak; ΔH is the gap from reactants to products.
D: chem-reaction-profile-steps
H: Multi-step reactions
- Each step has its own transition state.
- **Intermediates** sit in **troughs** between peaks.
- Intermediates have a finite lifetime and can sometimes be detected.
- The step with the highest peak relative to the starting point is usually rate-determining.
P: Transition states cannot be isolated because they exist only momentarily at the energy maximum. A catalysed profile has lower peaks, often with more steps, but the same overall ΔH. Reaction profiles link thermodynamics (ΔH) and kinetics (Ea).
X: A two-step profile.
> A reaction has two peaks with a trough between them.
> The trough is an intermediate.
> The first peak is higher than the second.
> The first step has the larger activation energy and controls the rate.
K: Reaction profiles plot energy against reaction progress, showing reactants, products, transition states at peaks, intermediates in troughs, Ea and ΔH; catalysts lower peaks without changing ΔH.
!: Confusing transition states with intermediates. Transition states are peaks; intermediates are troughs.
EV: established | Transition state theory describes the highest-energy point on a reaction pathway (Eyring, 1935).
T: Transition state | The highest-energy arrangement during a reaction step
T: Intermediate | A species formed and used up during a reaction
T: Reaction progress | Extent of conversion from reactants to products
SUM: Peaks and troughs.
SUM: Ea and ΔH.
SUM: Multi-step profiles.
SRC: Eyring H., "The activated complex in chemical reactions", Journal of Chemical Physics 3(2), 107–115 | primary | 1935
SRC: OpenStax, Chemistry 2e, section 12.5 "Collision Theory" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/12-5-collision-theory
Q: What is a transition state? | The highest-energy arrangement at a peak of a reaction profile.
Q: Where are intermediates shown on a profile? | In troughs between peaks.
M1#chemistry-u07-04-q1@1: What does the height from reactants to the peak show? | The activation energy | The enthalpy change | The rate constant | The equilibrium constant | Ea is the barrier from reactants to the transition state.
M2#chemistry-u07-04-q2@2: How does a catalyst change a reaction profile? | It lowers the peaks but keeps ΔH the same | It raises the product level | It changes the overall ΔH | It removes all transition states | Catalysts alter the pathway, not the start and end energies.
MATCH1#chemistry-u07-04-q3@2: Match each feature to its meaning. | Peak = Transition state ; Trough = Intermediate ; Reactant to product gap = ΔH ; Reactant to peak = Ea | Profiles have key features.
M3#chemistry-u07-04-q4@3: Why can't transition states be isolated? | They exist only momentarily at an energy maximum | They are too stable to separate | They are always gases | They are intermediates | A maximum-energy arrangement immediately falls to reactants or products.
SA2#chemistry-u07-04-q5@1,3: Explain how to interpret reaction profiles. | Reaction profiles plot energy against reaction progress, showing reactant and product levels. The peak is the transition state, the highest-energy arrangement; the height from reactants to the peak is Ea and the gap from reactants to products is ΔH. Multi-step reactions have several peaks with intermediates in troughs, which have finite lifetimes, and the highest peak usually controls the rate. Catalysts lower peaks without changing ΔH. Transition states cannot be isolated. | Axes and levels ; Transition state ; Ea and ΔH ; Intermediates ; Catalysts

## Catalysts
LV: Year 1 · Foundation
S: Catalysts speed up reactions without being used up. This lesson explains how catalysts work and why they are important.
O: Define a catalyst
O: Explain how catalysts increase rate
O: Describe the economic and environmental importance of catalysts
H: How catalysts work
- A **catalyst** increases the rate without being permanently changed.
- It provides an **alternative pathway** with **lower activation energy**.
- It does not change ΔH or the position of equilibrium.
- It speeds up forward and reverse reactions equally.
D: chem-catalysed-profile
H: Importance
- Lower temperatures can be used, saving energy and costs.
- Reduces waste by increasing selectivity.
- Most industrial chemical processes use catalysts.
- **Catalytic converters** reduce vehicle pollution.
P: Catalysts can be **poisoned** by impurities that block active sites, such as lead in old petrol poisoning catalytic converters. Developing better catalysts is central to green chemistry. Many catalysts contain transition metals.
X: Decomposing hydrogen peroxide.
> Hydrogen peroxide decomposes slowly to water and oxygen.
> Adding manganese(IV) oxide makes it fizz rapidly.
> After the reaction, the MnO₂ is recovered unchanged.
> It acted as a catalyst.
K: Catalysts increase rate by providing an alternative pathway with lower activation energy, are not used up, do not change ΔH or equilibrium position and allow lower temperatures, saving energy and reducing waste.
!: Thinking catalysts increase the yield at equilibrium. They speed up reaching equilibrium but do not shift it.
EV: established | Catalysis is involved in the production of most industrial chemicals (Hagen, 2015).
T: Catalyst | A substance increasing rate without being used up
T: Catalyst poisoning | Loss of activity due to impurities
T: Alternative pathway | A different reaction route with lower Ea
SUM: Lower activation energy.
SUM: Not used up.
SUM: Saves energy.
SRC: Hagen J., Industrial Catalysis: A Practical Approach, 3rd edition, Wiley-VCH | secondary | 2015
SRC: OpenStax, Chemistry 2e, section 12.7 "Catalysis" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/12-7-catalysis
Q: What is a catalyst? | A substance that increases rate without being permanently changed.
Q: What is catalyst poisoning? | Loss of catalyst activity due to impurities blocking active sites.
M1#chemistry-u07-05-q1@1: Which catalyst speeds up decomposition of hydrogen peroxide? | Manganese(IV) oxide | Sodium chloride | Copper sulfate solution | Calcium carbonate | MnO₂ provides a lower-energy pathway and is recovered unchanged.
M2#chemistry-u07-05-q2@2: How does a catalyst affect the position of equilibrium? | It does not change it | It shifts it towards products | It shifts it towards reactants | It removes equilibrium | Forward and reverse rates increase equally.
MATCH1#chemistry-u07-05-q3@1: Match each term to its meaning. | Catalyst = Speeds reaction ; Poisoning = Blocked active sites ; Converter = Reduces exhaust pollution ; Alternative pathway = Lower Ea | Catalysis has key ideas.
M3#chemistry-u07-05-q4@3: Why are catalysts important for sustainable chemistry? | They let reactions run at lower temperatures with less waste | They are consumed and replaced cheaply | They increase energy use | They make reactions more dangerous | Lower energy and greater selectivity reduce environmental impact.
SA2#chemistry-u07-05-q5@1,3: Explain how catalysts work and why they are important. | A catalyst increases the rate of a reaction without being permanently changed by providing an alternative pathway with lower activation energy; MnO₂, for example, speeds up hydrogen peroxide decomposition and is recovered. Catalysts do not change ΔH or equilibrium position, speeding forward and reverse reactions equally. They allow lower temperatures, saving energy, and increase selectivity, reducing waste, and catalytic converters cut pollution. Impurities can poison catalysts. | Definition ; Mechanism ; Equilibrium ; Benefits ; Poisoning

## Homogeneous catalysis
LV: Year 1 · Application
S: Homogeneous catalysts are in the same phase as the reactants. This lesson explains how they work through intermediates.
O: Define homogeneous catalysis
O: Explain how homogeneous catalysts form intermediates
O: Describe examples including Fe²⁺ with peroxodisulfate and ozone depletion
H: Homogeneous catalysts
- The catalyst is in the **same phase** as the reactants, usually in solution or gas.
- It forms an **intermediate** with a reactant.
- The intermediate reacts to give products and regenerate the catalyst.
- Often involves changes in oxidation state.
D: chem-catalyst-distribution
H: Examples
- **Fe²⁺ catalyses** S₂O₈²⁻ + 2I⁻ → 2SO₄²⁻ + I₂.
- Fe²⁺ reduces S₂O₈²⁻ to SO₄²⁻, becoming Fe³⁺; Fe³⁺ oxidises I⁻ to I₂, returning to Fe²⁺.
- **Chlorine radicals** catalyse ozone breakdown in the stratosphere.
- Acid catalysis in esterification.
P: The direct reaction between S₂O₈²⁻ and I⁻ is slow because both ions are negative and repel. Going through Fe²⁺ and Fe³⁺ avoids this repulsion. One chlorine radical can destroy thousands of ozone molecules because it is regenerated each cycle.
X: Ozone depletion.
> Cl· + O₃ → ClO· + O₂.
> ClO· + O → Cl· + 2O₂.
> Overall: O₃ + O → 2O₂.
> The chlorine radical is regenerated and continues destroying ozone.
K: Homogeneous catalysts share the reactants' phase and work by forming intermediates, often changing oxidation state, as Fe²⁺ does with peroxodisulfate and iodide and chlorine radicals do in ozone depletion.
!: Thinking homogeneous catalysts are unchanged at every step. They change temporarily but are regenerated.
EV: established | Chlorine radicals from CFCs catalyse stratospheric ozone destruction (Molina and Rowland, 1974).
T: Homogeneous catalyst | A catalyst in the same phase as the reactants
T: Intermediate | A species formed and then used up during a reaction
T: Radical | A species with an unpaired electron
SUM: Same phase.
SUM: Intermediates and regeneration.
SUM: Fe²⁺ and Cl·.
SRC: Molina M. J. and Rowland F. S., "Stratospheric sink for chlorofluoromethanes: chlorine atom-catalysed destruction of ozone", Nature 249, 810–812 | primary | 1974
SRC: Housecroft C. E. and Sharpe A. G., Inorganic Chemistry, 5th edition, Pearson | secondary | 2018
Q: What is a homogeneous catalyst? | A catalyst in the same phase as the reactants.
Q: Why is the uncatalysed reaction between S₂O₈²⁻ and I⁻ slow? | Both ions are negative and repel each other.
M1#chemistry-u07-06-q1@1: Which ion catalyses the reaction between peroxodisulfate and iodide? | Fe²⁺ | Na⁺ | Cl⁻ | SO₄²⁻ | Iron switches between Fe²⁺ and Fe³⁺ during the cycle.
M2#chemistry-u07-06-q2@2: Why can one chlorine radical destroy thousands of ozone molecules? | It is regenerated at the end of each cycle | It is a very large molecule | It reacts only once | It absorbs all UV light | Catalytic cycles reuse the radical many times.
SEQ1#chemistry-u07-06-q3@3: Order the steps of Fe²⁺ catalysis. | Fe²⁺ reduces S₂O₈²⁻ ; Fe³⁺ forms ; Fe³⁺ oxidises I⁻ ; Fe²⁺ regenerated | The catalyst cycles between oxidation states.
M3#chemistry-u07-06-q4@3: Why does using Fe²⁺ speed up the S₂O₈²⁻ and I⁻ reaction? | Each step involves oppositely charged ions that attract | Fe²⁺ increases the temperature | Fe²⁺ makes iodide positive | It removes all activation energy | Avoiding repulsion between like charges lowers Ea.
SA2#chemistry-u07-06-q5@1,3: Explain homogeneous catalysis with examples. | Homogeneous catalysts are in the same phase as the reactants and work by forming intermediates, often by changing oxidation state, then being regenerated. Fe²⁺ catalyses S₂O₈²⁻ + 2I⁻: Fe²⁺ reduces peroxodisulfate and becomes Fe³⁺, which oxidises iodide and returns to Fe²⁺, avoiding repulsion between the negative ions. In the stratosphere, chlorine radicals catalyse ozone breakdown via ClO·, being regenerated so each destroys thousands of molecules. | Definition ; Intermediates ; Iron example ; Ozone example ; Regeneration

## Heterogeneous catalysis
LV: Year 1 · Application
S: Heterogeneous catalysts are in a different phase from the reactants. This lesson explains adsorption and surface catalysis.
O: Define heterogeneous catalysis
O: Describe the adsorption mechanism on catalyst surfaces
O: Describe industrial examples and how catalysts are made efficient
H: Mechanism
- The catalyst is in a **different phase**, usually a solid with gaseous or liquid reactants.
- **Adsorption**: reactants bond to **active sites** on the surface.
- Bonds in reactants weaken, and new bonds form.
- **Desorption**: products leave the surface.
H: Industrial use
- **Iron** in the Haber process.
- **Vanadium(V) oxide** in the Contact process.
- **Platinum, palladium and rhodium** in catalytic converters.
- Catalysts are spread on supports with high surface area, such as honeycombs.
P: Adsorption must be strong enough to weaken bonds but weak enough for products to leave: tungsten adsorbs too strongly and silver too weakly, while nickel and platinum are just right. Using thin coatings on ceramic supports reduces the amount of expensive metal needed.
X: A catalytic converter.
> Exhaust gases pass over a honeycomb coated with platinum and rhodium.
> CO and NO adsorb onto the metal surface.
> They react: 2CO + 2NO → 2CO₂ + N₂.
> The products desorb and leave in the exhaust.
K: Heterogeneous catalysts are in a different phase, working by adsorption at active sites, bond weakening, reaction and desorption; adsorption strength must be moderate, and high surface area supports reduce costs, as in the Haber process and catalytic converters.
!: Thinking stronger adsorption always makes a better catalyst. Too strong adsorption stops products leaving.
EV: established | Surface catalysis on platinum group metals reduces vehicle emissions (Heck and Farrauto, 2001).
T: Heterogeneous catalyst | A catalyst in a different phase from reactants
T: Adsorption | Bonding of molecules to a surface
T: Active site | A surface location where reaction occurs
SUM: Different phase.
SUM: Adsorb, react, desorb.
SUM: Supports and industry.
SRC: Heck R. M. and Farrauto R. J., "Automobile exhaust catalysts", Applied Catalysis A 221(1–2), 443–457 | primary | 2001
SRC: Hagen J., Industrial Catalysis: A Practical Approach, 3rd edition, Wiley-VCH | secondary | 2015
Q: What is adsorption? | Bonding of molecules to a surface.
Q: Which catalyst is used in the Haber process? | Iron.
M1#chemistry-u07-07-q1@1: Which metals are used in catalytic converters? | Platinum, palladium and rhodium | Sodium, potassium and lithium | Iron, copper and zinc only | Lead, tin and mercury | Precious metals catalyse removal of CO, NO and hydrocarbons.
M2#chemistry-u07-07-q2@2: Why are catalysts spread on high surface area supports? | More active sites are available while using less metal | Supports increase activation energy | Supports react with the gases | It makes catalysts heavier | Thin coatings on supports maximise the number of exposed metal atoms.
SEQ1#chemistry-u07-07-q3@2: Order the steps of heterogeneous catalysis. | Reactants adsorb ; Bonds weaken ; Products form ; Products desorb | Surface catalysis follows a sequence.
M3#chemistry-u07-07-q4@3: Why is silver a poor catalyst for many reactions? | It adsorbs reactants too weakly to weaken their bonds | It adsorbs too strongly | It is too reactive | It melts easily | Weak adsorption fails to activate the reactants.
SA2#chemistry-u07-07-q5@1,3: Explain heterogeneous catalysis. | Heterogeneous catalysts are in a different phase from the reactants, usually solids with gases or liquids. Reactants adsorb onto active sites, their bonds weaken, new bonds form and products desorb. Adsorption must be moderate: too strong stops products leaving and too weak fails to activate reactants. Examples include iron in the Haber process, V₂O₅ in the Contact process and platinum, palladium and rhodium in catalytic converters, coated thinly on honeycomb supports to maximise surface area and save metal. | Definition ; Adsorption mechanism ; Adsorption strength ; Industrial examples ; Supports

## Enzyme catalysis
LV: Year 1 · Application
S: Enzymes are biological catalysts with remarkable speed and selectivity. This lesson explains enzyme kinetics from a chemical perspective.
O: Explain how enzymes lower activation energy
O: Describe the Michaelis-Menten model
O: Explain the effects of temperature and pH on enzyme-catalysed rates
H: Enzymes as catalysts
- Enzymes are proteins with an **active site** that binds the **substrate**.
- They stabilise the **transition state**, lowering Ea.
- They are highly **specific**.
- They can speed reactions by factors of millions or more.
D: chem-michaelis-menten
H: Kinetics
- At low substrate concentration, rate rises proportionally (first order in substrate).
- At high concentration, active sites are saturated and rate reaches **Vmax** (zero order).
- **Km** is the substrate concentration giving half of Vmax.
- Rates fall at high temperatures (denaturation) and away from optimum pH.
P: The Michaelis-Menten equation, rate = Vmax[S] ÷ (Km + [S]), describes this behaviour. Low Km means high affinity for the substrate. Enzymes are used industrially in detergents, food processing and drug synthesis because they work under mild conditions.
X: Saturating an enzyme.
> An enzyme has Vmax = 100 µmol min⁻¹ and Km = 2 mmol dm⁻³.
> At [S] = 2 mmol dm⁻³, rate = 100 × 2 ÷ (2 + 2) = 50.
> At [S] = 98 mmol dm⁻³, rate = 100 × 98 ÷ 100 = 98.
> At high [S], the rate approaches Vmax.
K: Enzymes are protein catalysts that bind substrates at active sites and stabilise transition states; Michaelis-Menten kinetics shows rate rising to Vmax as active sites saturate, with Km at half Vmax, and rates depend on temperature and pH.
!: Thinking adding more substrate always increases enzyme rate. Once active sites are saturated, rate stops rising.
EV: established | Michaelis and Menten described enzyme kinetics in 1913 (Michaelis and Menten, 1913).
T: Active site | The region of an enzyme where substrate binds
T: Vmax | The maximum rate when active sites are saturated
T: Km | Substrate concentration giving half of Vmax
SUM: Transition state stabilisation.
SUM: Saturation and Vmax.
SUM: Temperature and pH.
SRC: Michaelis L. and Menten M. L., "Die Kinetik der Invertinwirkung", Biochemische Zeitschrift 49, 333–369 | primary | 1913
SRC: Berg J. M. et al., Biochemistry, 9th edition, W. H. Freeman | secondary | 2019
Q: What is Km? | The substrate concentration that gives half of Vmax.
Q: Why does enzyme rate level off at high substrate concentration? | All active sites are occupied.
M1#chemistry-u07-08-q1@1: How do enzymes lower activation energy? | By stabilising the transition state at the active site | By raising the temperature of the solution | By supplying energy to the substrate | By increasing the substrate concentration | Binding favours the transition state, lowering the barrier.
M2#chemistry-u07-08-q2@2: What does a low Km indicate? | High affinity of the enzyme for its substrate | Low affinity for the substrate | A very fast maximum rate | A denatured enzyme | Half-maximum rate is reached at low concentration.
NUM1#chemistry-u07-08-q3@3: Vmax = 80 and Km = 4 mmol dm⁻³. What is the rate when [S] = 4 mmol dm⁻³? | 40 | 0 | µmol min⁻¹ | Rate = 80 × 4 ÷ (4 + 4) = 40, half of Vmax.
M3#chemistry-u07-08-q4@3: Why do enzyme-catalysed rates fall at high temperatures? | The enzyme denatures, losing its active site shape | Substrates stop moving | Activation energy increases with temperature | Products block all enzymes | Heat disrupts the bonds holding the protein's shape.
SA2#chemistry-u07-08-q5@1,3: Explain enzyme catalysis and Michaelis-Menten kinetics. | Enzymes are protein catalysts whose active sites bind specific substrates and stabilise the transition state, lowering activation energy and speeding reactions enormously. At low substrate concentration the rate rises proportionally, but at high concentration active sites saturate and the rate approaches Vmax. The Michaelis-Menten equation, rate = Vmax[S] ÷ (Km + [S]), gives Km as the concentration at half Vmax, with low Km meaning high affinity. Rates fall at high temperatures through denaturation and away from optimum pH. | Active site ; Transition state ; Saturation ; Km and Vmax ; Temperature and pH

## Rate equations
LV: Year 1 · Application
S: Rate equations show how rate depends on the concentrations of reactants. This lesson explains rate equations and their components.
O: Write a rate equation
O: Explain the meaning of orders and the rate constant
O: Explain why orders must be found experimentally
H: The rate equation
- **Rate = k[A]ᵐ[B]ⁿ**.
- k is the **rate constant**.
- m and n are the **orders** with respect to A and B.
- The **overall order** is m + n.
D: chem-rate-vs-conc-orders
H: Key points
- Orders are usually 0, 1 or 2.
- Orders are found by **experiment**, not from the balanced equation.
- Species not in the rate equation do not affect the rate (zero order).
- The rate equation reflects the **mechanism**, especially the slow step.
P: For 2NO + O₂ → 2NO₂, the rate equation is rate = k[NO]²[O₂], which happens to match the coefficients, but this is not true in general. For example, the reaction of propanone with iodine is zero order in iodine.
X: Using a rate equation.
> Rate = k[A]²[B].
> If [A] doubles, rate increases by 2² = 4 times.
> If [B] doubles, rate doubles.
> If both double, rate increases 8 times.
K: Rate equations have the form rate = k[A]ᵐ[B]ⁿ, where orders are found experimentally and overall order is their sum; k is the rate constant, and the equation reflects the mechanism rather than the balanced equation.
!: Taking orders from the balanced equation coefficients. Orders must be determined by experiment.
EV: established | Reaction orders are determined experimentally and reflect mechanisms (Atkins and de Paula, 2018).
T: Rate equation | An expression linking rate to concentrations
T: Rate constant | The proportionality constant k in a rate equation
T: Order of reaction | The power of a concentration in the rate equation
SUM: Rate = k[A]ᵐ[B]ⁿ.
SUM: Orders by experiment.
SUM: Linked to mechanism.
SRC: Atkins P. and de Paula J., Atkins' Physical Chemistry, 11th edition, Oxford University Press | secondary | 2018
SRC: OpenStax, Chemistry 2e, section 12.3 "Rate Laws" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/12-3-rate-laws
Q: What is the overall order of rate = k[A][B]²? | 3.
Q: How are orders of reaction determined? | By experiment.
M1#chemistry-u07-09-q1@1: What does k represent in a rate equation? | The rate constant | The concentration of a catalyst | The equilibrium constant | The activation energy | k links rate to concentrations at a given temperature.
M2#chemistry-u07-09-q2@2: Why can't orders be taken from the balanced equation? | The rate depends on the mechanism, not the overall stoichiometry | Balanced equations are always wrong | Orders are always equal to one | Coefficients only apply to products | Only steps up to the slow step affect rate.
NUM1#chemistry-u07-09-q3@2: Rate = k[X]². By what factor does the rate change if [X] is tripled? | 9 | 0 | times | Rate rises by 3² = 9 times.
M3#chemistry-u07-09-q4@3: What does a zero-order dependence on a reactant tell you? | It is not involved in the rate-determining step or earlier | It is a catalyst that is used up | It is the only reactant in the slow step | Its concentration controls the rate | Changing its concentration does not change the rate.
SA2#chemistry-u07-09-q5@1,3: Explain rate equations and orders of reaction. | A rate equation has the form rate = k[A]ᵐ[B]ⁿ, where k is the rate constant and m and n are the orders with respect to A and B, with overall order m + n. Orders, usually 0, 1 or 2, are found by experiment and reflect the mechanism, especially the slow step, not the balanced equation. A zero-order reactant does not affect the rate. For rate = k[A]²[B], doubling [A] quadruples the rate and doubling both increases it eightfold. | Form ; Rate constant ; Orders ; Experimental determination ; Using the equation

## Reaction order
LV: Year 1 · Application
S: Reaction orders can be found from initial rates or from graphs. This lesson explains both methods.
O: Determine orders using the initial rates method
O: Identify orders from rate-concentration graphs
O: Calculate the rate constant and its units
H: Initial rates method
- Run several experiments, changing one concentration at a time.
- Compare how the initial rate changes.
- Doubling [A] with no change in rate: zero order; rate doubles: first order; rate quadruples: second order.
- Then substitute into the rate equation to find k.
D: chem-orders-conc-time
H: Graphs and units
- **Rate-concentration graphs**: zero order is horizontal, first order a straight line through the origin, second order a curve.
- Units of k depend on overall order.
- Zero order: mol dm⁻³ s⁻¹; first order: s⁻¹; second order: dm³ mol⁻¹ s⁻¹.
- Units are derived by rearranging the rate equation.
P: The initial rates method avoids complications from products as the reaction proceeds. Clock reactions, such as the iodine clock, measure the time to reach a fixed point, and 1/time is proportional to initial rate.
X: Using initial rates.
> Exp 1: [A] = 0.10, [B] = 0.10, rate = 2.0 × 10⁻⁴.
> Exp 2: [A] = 0.20, [B] = 0.10, rate = 8.0 × 10⁻⁴ (×4, so second order in A).
> Exp 3: [A] = 0.10, [B] = 0.20, rate = 4.0 × 10⁻⁴ (×2, so first order in B).
> Rate = k[A]²[B]; k = 2.0 × 10⁻⁴ ÷ (0.01 × 0.10) = 0.20 dm⁶ mol⁻² s⁻¹.
K: Orders are found by varying one concentration at a time and comparing initial rates, or from rate-concentration graph shapes; k is then calculated, with units depending on overall order.
!: Changing two concentrations at once in initial rate experiments. Only one variable should change at a time.
EV: established | The initial rates method is a standard way to determine reaction orders (Atkins and de Paula, 2018).
T: Initial rates method | Finding orders by comparing initial rates
T: Clock reaction | A reaction timed to a sudden visible change
T: Overall order | The sum of individual orders
SUM: Change one concentration.
SUM: Graph shapes.
SUM: Units of k.
SRC: Atkins P. and de Paula J., Atkins' Physical Chemistry, 11th edition, Oxford University Press | secondary | 2018
SRC: OpenStax, Chemistry 2e, section 12.3 "Rate Laws" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/12-3-rate-laws
Q: What are the units of k for a first-order reaction? | s⁻¹.
Q: What shape is a rate-concentration graph for a zero-order reactant? | A horizontal line.
M1#chemistry-u07-10-q1@1: When [A] doubles, the rate quadruples. What is the order in A? | Second order | First order | Zero order | Third order | 2² = 4, so the rate depends on [A] squared.
M2#chemistry-u07-10-q2@2: Why is the initial rate used rather than a later rate? | Concentrations are known exactly and products have not built up | The rate is slowest at the start | Later rates are always zero | It removes the need for a rate equation | Starting conditions are controlled and uncomplicated.
NUM1#chemistry-u07-10-q3@3: Rate = k[A] with [A] = 0.50 mol dm⁻³ and rate = 0.010 mol dm⁻³ s⁻¹. What is k in s⁻¹? | 0.02 | 0.001 | s⁻¹ | k = 0.010 ÷ 0.50 = 0.020 s⁻¹.
M3#chemistry-u07-10-q4@3: What does 1/time measure in a clock reaction? | A value proportional to the initial rate | The equilibrium constant | The activation energy | The concentration of the product | A fixed amount of product formed in time t gives rate ∝ 1/t.
SA2#chemistry-u07-10-q5@1,3: Explain how reaction orders and rate constants are determined. | In the initial rates method, experiments are run changing one concentration at a time: no change in rate when [A] doubles means zero order, doubling means first order and quadrupling second order. Rate-concentration graphs are horizontal for zero order, straight through the origin for first order and curved for second order. k is calculated by substituting values, with units from the overall order: s⁻¹ for first order and dm³ mol⁻¹ s⁻¹ for second. Clock reactions give rate ∝ 1/t. | Initial rates ; Interpreting changes ; Graphs ; Calculating k ; Units

## Zero-order reactions
LV: Year 1 · Application
S: In a zero-order reaction, rate does not depend on concentration. This lesson explains zero-order kinetics and where it occurs.
O: Describe the rate equation for a zero-order reaction
O: Interpret concentration-time graphs for zero order
O: Explain why some reactions are zero order
H: Zero order
- **Rate = k**: the rate is constant.
- The concentration-time graph is a **straight line** with gradient −k.
- Units of k: mol dm⁻³ s⁻¹.
- Half-life **decreases** as concentration falls.
D: chem-zero-order
H: Why zero order happens
- A reactant is in large excess and its concentration barely changes.
- A surface or enzyme is **saturated**, so adding more reactant does not increase rate.
- Example: decomposition of ammonia on a hot platinum surface.
- Alcohol is removed from the body at a roughly constant rate because liver enzymes are saturated.
P: Zero order with respect to one reactant often means that reactant is not involved in the rate-determining step. In the acid-catalysed iodination of propanone, the rate is zero order in iodine because iodine reacts only after the slow step.
X: Alcohol elimination.
> A person's blood alcohol is 80 mg per 100 cm³.
> The liver removes about 15 mg per 100 cm³ per hour, regardless of level.
> After 4 hours, blood alcohol is about 80 − 60 = 20 mg per 100 cm³.
> The constant rate shows zero-order kinetics.
K: Zero-order reactions have rate = k, giving straight-line concentration-time graphs with gradient −k; they occur when surfaces or enzymes are saturated or a reactant is not in the slow step, as in alcohol elimination.
!: Thinking zero order means the reactant is not needed. It is needed but does not affect the rate.
EV: established | Ethanol is eliminated from blood at an approximately constant rate due to enzyme saturation (Jones, 2010).
T: Zero order | Rate independent of concentration
T: Saturation | All active sites or surfaces being occupied
T: Gradient | The slope of a graph
SUM: Rate = k.
SUM: Straight-line decline.
SUM: Saturation causes it.
SRC: Jones A. W., "Evidence-based survey of the elimination rates of ethanol from blood with applications in forensic casework", Forensic Science International 200(1–3), 1–20 | primary | 2010
SRC: OpenStax, Chemistry 2e, section 12.4 "Integrated Rate Laws" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/12-4-integrated-rate-laws
Q: What is the rate equation for a zero-order reaction? | Rate = k.
Q: What shape is the concentration-time graph for zero order? | A straight line sloping downwards.
M1#chemistry-u07-11-q1@1: What are the units of k for a zero-order reaction? | mol dm⁻³ s⁻¹ | s⁻¹ | dm³ mol⁻¹ s⁻¹ | mol dm⁻³ | For rate = k, k has the same units as rate.
M2#chemistry-u07-11-q2@2: Why is ammonia decomposition on hot platinum zero order? | The platinum surface is saturated with ammonia | Ammonia is not a reactant | Platinum is used up | The reaction has no activation energy | Extra ammonia cannot find free surface sites.
NUM1#chemistry-u07-11-q3@2: A zero-order reaction has k = 0.002 mol dm⁻³ s⁻¹. How long in s to fall from 0.10 to 0.04 mol dm⁻³? | 30 | 0 | s | Time = 0.06 ÷ 0.002 = 30 s.
M3#chemistry-u07-11-q4@3: Why is propanone iodination zero order in iodine? | Iodine reacts only after the rate-determining step | Iodine is a catalyst | Iodine is in the slow step | Iodine concentration is always zero | Species after the slow step do not appear in the rate equation.
SA2#chemistry-u07-11-q5@1,3: Explain zero-order kinetics. | In a zero-order reaction, rate = k, so the rate is constant and the concentration-time graph is a straight line with gradient −k, with k in mol dm⁻³ s⁻¹ and half-life shortening as concentration falls. Zero order arises when a surface or enzyme is saturated, as in ammonia decomposing on platinum or alcohol removal by the liver, or when the reactant is not involved in the rate-determining step, as with iodine in propanone iodination. | Rate equation ; Graph ; Units ; Saturation ; Mechanism

## First-order reactions
LV: Year 1 · Application
S: In a first-order reaction, rate is proportional to concentration. This lesson explains first-order kinetics and its constant half-life.
O: Describe the rate equation for first-order reactions
O: Interpret concentration-time and rate-concentration graphs
O: Explain why first-order half-life is constant
H: First order
- **Rate = k[A]**.
- Rate-concentration graph: straight line through the origin with gradient k.
- Concentration-time graph: **exponential decay**.
- Units of k: **s⁻¹**.
D: chem-first-order-decay
H: Half-life
- The **half-life** is constant: t½ = ln 2 ÷ k ≈ 0.693 ÷ k.
- Independent of starting concentration.
- **Radioactive decay** is a first-order process.
- Many drug eliminations from the body are first order.
P: A constant half-life is the signature of a first-order reaction and can be used to identify it from a concentration-time graph. The decomposition of N₂O₅ and hydrolysis of some halogenoalkanes are first-order examples. Carbon-14 dating relies on its constant half-life of 5,730 years.
X: Drug elimination.
> A drug has a half-life of 4 hours.
> The initial blood level is 80 mg dm⁻³.
> After 4 h: 40; after 8 h: 20; after 12 h: 10 mg dm⁻³.
> Each 4-hour period halves the concentration.
K: First-order reactions have rate = k[A], straight rate-concentration graphs, exponential concentration decay, k in s⁻¹ and a constant half-life t½ = 0.693 ÷ k, as in radioactive decay and many drug eliminations.
!: Thinking half-life depends on starting concentration for first-order reactions. It is constant.
EV: established | Radioactive decay follows first-order kinetics with constant half-life (Atkins and de Paula, 2018).
T: First order | Rate proportional to concentration
T: Half-life | Time for concentration to halve
T: Exponential decay | Decrease by a constant fraction per unit time
SUM: Rate = k[A].
SUM: Exponential decay.
SUM: Constant half-life.
SRC: Atkins P. and de Paula J., Atkins' Physical Chemistry, 11th edition, Oxford University Press | secondary | 2018
SRC: OpenStax, Chemistry 2e, section 12.4 "Integrated Rate Laws" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/12-4-integrated-rate-laws
Q: What is the relationship between half-life and k for first order? | t½ = 0.693 ÷ k.
Q: What are the units of k for a first-order reaction? | s⁻¹.
M1#chemistry-u07-12-q1@1: Which process is first order? | Radioactive decay | Ammonia decomposing on saturated platinum | Alcohol removal by a saturated liver | A reaction with rate = k | Decay rate is proportional to the number of nuclei.
M2#chemistry-u07-12-q2@2: How can you identify a first-order reaction from a concentration-time graph? | Successive half-lives are equal | The graph is a straight line | The half-life doubles each time | The rate is constant | Constant half-life is characteristic of first order.
NUM1#chemistry-u07-12-q3@2: A first-order reaction has k = 0.0231 s⁻¹. What is its half-life in s? | 30 | 0.5 | s | t½ = 0.693 ÷ 0.0231 = 30 s.
M3#chemistry-u07-12-q4@3: Why is half-life constant for first-order reactions? | Rate is proportional to concentration, so the same fraction reacts per unit time | Rate depends on concentration squared at all times | Rate depends on concentration squared | The reaction stops halfway | Proportional rate gives exponential decay with fixed halving time.
SA2#chemistry-u07-12-q5@1,3: Explain first-order kinetics and half-life. | First-order reactions have rate = k[A], so the rate-concentration graph is a straight line through the origin and concentration decays exponentially, with k in s⁻¹. The half-life is constant, t½ = 0.693 ÷ k, independent of starting concentration, because the same fraction reacts in each time interval. Constant successive half-lives identify first order. Examples include radioactive decay, carbon-14 dating with a 5,730-year half-life and many drug eliminations. | Rate equation ; Graphs ; Units ; Half-life ; Examples

## Second-order reactions
LV: Year 1 · Application
S: In a second-order reaction, rate depends on the square of a concentration or on two concentrations. This lesson explains second-order kinetics.
O: Describe the rate equations for second-order reactions
O: Interpret graphs for second-order reactions
O: Explain how half-life changes for second-order reactions
H: Second order
- **Rate = k[A]²** or **rate = k[A][B]**.
- Doubling [A] in rate = k[A]² quadruples the rate.
- Units of k: **dm³ mol⁻¹ s⁻¹**.
- Rate-concentration graph: a curve; rate against [A]² is a straight line.
D: chem-second-order-inverse
H: Half-life and examples
- Half-life **increases** as concentration falls: t½ = 1 ÷ (k[A]₀).
- Each successive half-life is double the previous one.
- Example: 2NO₂ → 2NO + O₂.
- Hydrolysis of primary halogenoalkanes by OH⁻: rate = k[RX][OH⁻].
P: Plotting 1/[A] against time gives a straight line for second-order reactions, which is one way to confirm the order. When one reactant is in large excess, a second-order reaction can appear first order, called pseudo-first-order.
X: Increasing half-lives.
> A second-order reaction starts at 0.80 mol dm⁻³.
> First half-life: 10 s to reach 0.40.
> Second half-life: 20 s to reach 0.20.
> Third half-life: 40 s; each is double the last.
K: Second-order reactions have rate = k[A]² or k[A][B], with k in dm³ mol⁻¹ s⁻¹; half-life increases as concentration falls, 1/[A] against time is linear, and excess of one reactant gives pseudo-first-order behaviour.
!: Applying t½ = 0.693 ÷ k to second-order reactions. That formula applies only to first order.
EV: established | Second-order kinetics give a linear plot of 1/[A] against time (Atkins and de Paula, 2018).
T: Second order | Rate depends on concentration squared or two concentrations
T: Pseudo-first-order | Apparent first order because one reactant is in excess
T: Integrated rate law | An equation relating concentration to time
SUM: Rate = k[A]².
SUM: Half-life lengthens.
SUM: 1/[A] is linear.
SRC: Atkins P. and de Paula J., Atkins' Physical Chemistry, 11th edition, Oxford University Press | secondary | 2018
SRC: OpenStax, Chemistry 2e, section 12.4 "Integrated Rate Laws" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/12-4-integrated-rate-laws
Q: What are the units of k for a second-order reaction? | dm³ mol⁻¹ s⁻¹.
Q: What is a pseudo-first-order reaction? | A second-order reaction that appears first order because one reactant is in excess.
M1#chemistry-u07-13-q1@1: Rate = k[A]². If [A] is halved, what happens to the rate? | It falls to a quarter | It halves | It doubles | It stays the same | (½)² = ¼, so the rate drops to one quarter.
M2#chemistry-u07-13-q2@2: How does the half-life change during a second-order reaction? | It increases as concentration falls | It stays constant | It decreases as concentration falls | It is always zero | t½ = 1 ÷ k[A]₀, so lower concentration gives longer half-life.
NUM1#chemistry-u07-13-q3@3: Rate = k[A][B] with k = 0.50 dm³ mol⁻¹ s⁻¹, [A] = 0.20 and [B] = 0.10 mol dm⁻³. What is the rate in mol dm⁻³ s⁻¹? | 0.01 | 0.001 | mol dm⁻³ s⁻¹ | Rate = 0.50 × 0.20 × 0.10 = 0.010.
M3#chemistry-u07-13-q4@3: Why does a large excess of one reactant make a second-order reaction look first order? | Its concentration barely changes, so it is absorbed into k | It stops reacting entirely | It becomes a catalyst | It doubles the activation energy | A constant [B] makes rate depend only on [A].
SA2#chemistry-u07-13-q5@1,3: Explain second-order kinetics. | Second-order reactions have rate = k[A]² or rate = k[A][B], with k in dm³ mol⁻¹ s⁻¹, so doubling [A] quadruples rate in the first case. The half-life, t½ = 1 ÷ k[A]₀, increases as concentration falls, each one double the last. Plotting 1/[A] against time gives a straight line. Examples include 2NO₂ decomposition and OH⁻ hydrolysis of primary halogenoalkanes. With one reactant in large excess, the reaction appears pseudo-first-order. | Rate equations ; Units ; Half-life ; Graphical test ; Pseudo-first-order

## Rate constants
LV: Year 1 · Application
S: The rate constant links rate to concentration and depends on temperature. This lesson explores what the rate constant tells us.
O: Explain what the rate constant represents
O: Derive units of k for different orders
O: Explain how temperature and catalysts affect k
H: The rate constant
- k is the proportionality constant in the rate equation.
- A **larger k** means a **faster** reaction at the same concentrations.
- k is constant at a given temperature.
- It does **not** change with concentration.
D: chem-rate-constant-T
H: Units and changes
- Units follow from rate ÷ concentration terms: (mol dm⁻³)¹⁻ⁿ s⁻¹ for overall order n.
- Third order: dm⁶ mol⁻² s⁻¹.
- k **increases with temperature**.
- A catalyst increases k by lowering activation energy.
P: Because k reflects the fraction of collisions that succeed, it combines collision frequency, orientation and energy. Comparing k values at different temperatures allows the activation energy to be found using the Arrhenius equation.
X: Deriving units.
> Rate = k[A]²[B], overall third order.
> k = rate ÷ ([A]²[B]).
> Units = mol dm⁻³ s⁻¹ ÷ (mol dm⁻³)³.
> k has units dm⁶ mol⁻² s⁻¹.
K: The rate constant k links rate to concentrations, is fixed at a given temperature, has units depending on overall order and increases with temperature or when a catalyst is added.
!: Thinking k changes when concentration changes. k depends on temperature, not concentration.
EV: established | Rate constants depend on temperature through the Arrhenius equation (Arrhenius, 1889).
T: Rate constant | The constant k in a rate equation
T: Overall order | Sum of the orders in the rate equation
T: Units of k | Units that make the rate equation consistent
SUM: Larger k, faster.
SUM: Units from order.
SUM: Changes with temperature.
SRC: Arrhenius S., "Über die Reaktionsgeschwindigkeit bei der Inversion von Rohrzucker durch Säuren", Zeitschrift für Physikalische Chemie 4, 226–248 | primary | 1889
SRC: OpenStax, Chemistry 2e, section 12.3 "Rate Laws" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/12-3-rate-laws
Q: Does k change with concentration? | No; it changes with temperature.
Q: What are the units of k for a third-order reaction? | dm⁶ mol⁻² s⁻¹.
M1#chemistry-u07-14-q1@1: What does a larger rate constant indicate? | A faster reaction at the same concentrations | A slower reaction at all concentrations | A higher equilibrium yield | A larger activation energy | k measures how fast a reaction is intrinsically.
M2#chemistry-u07-14-q2@2: How does a catalyst affect k? | It increases k by lowering activation energy | It decreases k | It has no effect on k | It changes the order | More successful collisions raise the rate constant.
MATCH1#chemistry-u07-14-q3@2: Match each order to the units of k. | Zero = mol dm⁻³ s⁻¹ ; First = s⁻¹ ; Second = dm³ mol⁻¹ s⁻¹ ; Third = dm⁶ mol⁻² s⁻¹ | Units depend on overall order.
M3#chemistry-u07-14-q4@3: Why does k increase with temperature? | A greater fraction of collisions exceed the activation energy | Concentrations increase with temperature | The order changes with temperature | Particles become larger | More energetic collisions succeed, so the rate constant rises.
SA2#chemistry-u07-14-q5@1,3: Explain the rate constant and what affects it. | The rate constant k is the proportionality constant in the rate equation; a larger k means a faster reaction at the same concentrations. It is fixed at a given temperature and does not change with concentration. Its units depend on overall order: s⁻¹ for first order, dm³ mol⁻¹ s⁻¹ for second and dm⁶ mol⁻² s⁻¹ for third. k increases with temperature because more collisions exceed Ea, and catalysts increase k by lowering Ea. | Meaning ; Independence of concentration ; Units ; Temperature ; Catalysts

## Half-life
LV: Year 1 · Application
S: Half-life is the time for a concentration to fall to half its value. This lesson compares half-lives for different orders and applies them.
O: Define half-life
O: Compare half-life behaviour for zero, first and second order
O: Use half-life in calculations
H: Definition and orders
- **Half-life** (t½) is the time for concentration to halve.
- **Zero order**: t½ = [A]₀ ÷ 2k, decreases as concentration falls.
- **First order**: t½ = 0.693 ÷ k, constant.
- **Second order**: t½ = 1 ÷ k[A]₀, increases as concentration falls.
D: chem-first-order-decay
H: Uses
- Identifying reaction order from data.
- **Radioactive dating**: carbon-14 and uranium-lead.
- **Drug dosing**: deciding how often medicine is taken.
- After n half-lives, the fraction remaining is (½)ⁿ.
P: Medicines with short half-lives must be taken more often to keep levels effective. Radioactive waste management depends on half-lives, from seconds to millions of years. Half-life is a convenient way to describe how persistent a substance is.
X: Fraction remaining.
> A first-order reaction has t½ = 15 min.
> After 1 hour, 60 ÷ 15 = 4 half-lives have passed.
> Fraction remaining = (½)⁴ = 1/16.
> About 6.25% of the reactant remains.
K: Half-life is the time for concentration to halve; it decreases for zero order, is constant for first order and increases for second order, and is used to identify order, date materials and plan drug dosing, with (½)ⁿ remaining after n half-lives.
!: Thinking all reactant is gone after two half-lives. A quarter remains after two half-lives.
EV: established | Carbon-14 has a half-life of about 5,730 years, used in radiocarbon dating (Godwin, 1962).
T: Half-life | Time for concentration to halve
T: Radiocarbon dating | Dating using carbon-14 decay
T: Dosing interval | Time between doses of a medicine
SUM: Time to halve.
SUM: Order changes behaviour.
SUM: Dating and dosing.
SRC: Godwin H., "Half-life of radiocarbon", Nature 195, 984 | primary | 1962
SRC: OpenStax, Chemistry 2e, section 12.4 "Integrated Rate Laws" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/12-4-integrated-rate-laws
Q: What fraction remains after three half-lives? | One eighth.
Q: For which order is half-life constant? | First order.
M1#chemistry-u07-15-q1@1: How does half-life change during a zero-order reaction? | It decreases as concentration falls | It stays constant | It increases as concentration falls | It equals zero | t½ = [A]₀ ÷ 2k shrinks with concentration.
M2#chemistry-u07-15-q2@2: Why are drugs with short half-lives taken more often? | Their levels fall quickly below effective concentrations | They are less effective at all doses | They build up dangerously | Short half-lives mean slow removal | Frequent doses maintain effective blood levels.
NUM1#chemistry-u07-15-q3@2: A first-order reaction has t½ = 20 s. What percentage remains after 60 s? | 12.5 | 0.1 | % | 60 ÷ 20 = 3 half-lives; (½)³ = 12.5%.
M3#chemistry-u07-15-q4@3: How can half-lives reveal reaction order? | Constant half-lives mean first order; changing ones mean zero or second | Half-lives are identical for every possible order | Half-life only depends on temperature | Order cannot be found from half-life | The pattern of successive half-lives is order-specific.
SA2#chemistry-u07-15-q5@1,3: Explain half-life and how it depends on order. | Half-life is the time for concentration to halve. For zero order it decreases as concentration falls, t½ = [A]₀ ÷ 2k; for first order it is constant, t½ = 0.693 ÷ k; and for second order it increases, t½ = 1 ÷ k[A]₀, so patterns of successive half-lives reveal order. After n half-lives, (½)ⁿ remains. Half-lives are used in radiocarbon dating, with carbon-14 at about 5,730 years, and drug dosing, where short half-lives need frequent doses. | Definition ; Zero order ; First order ; Second order ; Applications

## Integrated rate laws
LV: Year 1 · Chemical reasoning
S: Integrated rate laws give concentration as a function of time. This lesson uses them to find orders and rate constants from data.
O: State integrated rate laws for zero, first and second order
O: Use linear plots to determine order
O: Calculate concentration at a given time
H: The equations
- **Zero order**: [A] = [A]₀ − kt.
- **First order**: ln[A] = ln[A]₀ − kt.
- **Second order**: 1/[A] = 1/[A]₀ + kt.
- Each gives a straight line when the right quantity is plotted against t.
D: chem-ln-first-order
H: Using plots
- Plot [A], ln[A] and 1/[A] against time.
- The plot that is a **straight line** shows the order.
- The **gradient** gives k (negative for zero and first order, positive for second).
- Equations predict concentration at any time.
P: Integrated rate laws are derived by calculus from differential rate equations. Graphical methods are more reliable than single measurements because they use all the data. Computer fitting is commonly used today.
X: First-order calculation.
> A first-order reaction has k = 0.010 s⁻¹ and [A]₀ = 0.50 mol dm⁻³.
> After 100 s: ln[A] = ln 0.50 − (0.010 × 100) = −0.693 − 1.000 = −1.693.
> [A] = e⁻¹·⁶⁹³.
> [A] ≈ 0.18 mol dm⁻³.
K: Integrated rate laws [A] = [A]₀ − kt, ln[A] = ln[A]₀ − kt and 1/[A] = 1/[A]₀ + kt describe zero, first and second order; the straight-line plot identifies the order and its gradient gives k.
!: Plotting only [A] against time to decide order. Compare [A], ln[A] and 1/[A] plots.
EV: established | Linear plots of integrated rate laws are standard methods for determining order (Atkins and de Paula, 2018).
T: Integrated rate law | An equation giving concentration as a function of time
T: Linear plot | A graph forming a straight line
T: Natural logarithm | Logarithm to base e, written ln
SUM: Three integrated laws.
SUM: Straight line shows order.
SUM: Gradient gives k.
SRC: Atkins P. and de Paula J., Atkins' Physical Chemistry, 11th edition, Oxford University Press | secondary | 2018
SRC: OpenStax, Chemistry 2e, section 12.4 "Integrated Rate Laws" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/12-4-integrated-rate-laws
Q: State the integrated rate law for a first-order reaction. | ln[A] = ln[A]₀ − kt.
Q: Which plot is linear for a second-order reaction? | 1/[A] against time.
M1#chemistry-u07-16-q1@1: Which plot is a straight line for a zero-order reaction? | [A] against time | ln[A] against time | 1/[A] against time | [A]² against time | Zero order gives [A] = [A]₀ − kt, a straight line against time.
M2#chemistry-u07-16-q2@2: What does the gradient of a ln[A] against t plot give? | −k for a first-order reaction | The half-life directly | The initial concentration | The activation energy | ln[A] = ln[A]₀ − kt, so the slope of the line equals −k.
NUM1#chemistry-u07-16-q3@3: A second-order reaction has k = 0.20 dm³ mol⁻¹ s⁻¹ and [A]₀ = 0.50 mol dm⁻³. What is 1/[A] in dm³ mol⁻¹ after 10 s? | 4 | 0 | dm³ mol⁻¹ | 1/[A] = 1/0.50 + 0.20 × 10 = 2 + 2 = 4.
M3#chemistry-u07-16-q4@3: Why are graphical methods preferred to single measurements? | They use all the data, reducing the effect of random errors | They need fewer experiments | They avoid calculating k | Single measurements are always exact | Fitting many points gives more reliable values.
SA2#chemistry-u07-16-q5@1,3: Explain how integrated rate laws are used to find order and rate constants. | Integrated rate laws give concentration against time: zero order [A] = [A]₀ − kt, first order ln[A] = ln[A]₀ − kt and second order 1/[A] = 1/[A]₀ + kt. Plotting [A], ln[A] and 1/[A] against time, the straight-line plot reveals the order, and its gradient gives k. The equations predict concentrations at any time; a first-order reaction with k = 0.010 s⁻¹ falls from 0.50 to about 0.18 mol dm⁻³ in 100 s. Graphical methods use all data. | Zero order ; First order ; Second order ; Plots and gradients ; Prediction

## Arrhenius equation
LV: Year 1 · Chemical reasoning
S: The Arrhenius equation links the rate constant to temperature and activation energy. This lesson explains how to use it.
O: State the Arrhenius equation
O: Use an Arrhenius plot to find activation energy
O: Calculate rate constants at different temperatures
H: The equation
- **k = A e^(−Ea/RT)**.
- A is the **pre-exponential factor**, related to collision frequency and orientation.
- e^(−Ea/RT) is the fraction of collisions with enough energy.
- Ea in J mol⁻¹, R = 8.314 J K⁻¹ mol⁻¹, T in K.
D: chem-arrhenius-plot
H: Arrhenius plots
- Taking logs: **ln k = ln A − Ea/RT**.
- Plotting ln k against 1/T gives a straight line.
- **Gradient = −Ea/R**, so Ea = −gradient × R.
- Intercept = ln A.
P: Two rate constants at different temperatures give Ea using ln(k₂/k₁) = (Ea/R)(1/T₁ − 1/T₂). Reactions with large Ea are more sensitive to temperature. Svante Arrhenius proposed the equation in 1889.
X: Finding Ea from a plot.
> A plot of ln k against 1/T has gradient −6,000 K.
> Ea = −(−6,000) × 8.314.
> Ea = 49,884 J mol⁻¹.
> Ea ≈ 50 kJ mol⁻¹.
K: The Arrhenius equation k = A e^(−Ea/RT) relates k to temperature and activation energy; plotting ln k against 1/T gives a line with gradient −Ea/R, allowing Ea to be found, and large Ea makes rates very temperature-sensitive.
!: Forgetting to convert Ea to J mol⁻¹. R is in J K⁻¹ mol⁻¹, so units must match.
EV: established | Arrhenius proposed the exponential dependence of rate constants on temperature (Arrhenius, 1889).
T: Arrhenius equation | k = A e^(−Ea/RT)
T: Pre-exponential factor | A, related to collision frequency and orientation
T: Arrhenius plot | ln k against 1/T
SUM: k = A e^(−Ea/RT).
SUM: ln k against 1/T.
SUM: Gradient = −Ea/R.
SRC: Arrhenius S., "Über die Reaktionsgeschwindigkeit bei der Inversion von Rohrzucker durch Säuren", Zeitschrift für Physikalische Chemie 4, 226–248 | primary | 1889
SRC: OpenStax, Chemistry 2e, section 12.5 "Collision Theory" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/12-5-collision-theory
Q: State the Arrhenius equation. | k = A e^(−Ea/RT).
Q: What is plotted in an Arrhenius plot? | ln k against 1/T.
M1#chemistry-u07-17-q1@1: What is the gradient of an Arrhenius plot? | −Ea/R | Ea/R | −R/Ea | ln A | Rearranging gives ln k = ln A − (Ea/R)(1/T).
M2#chemistry-u07-17-q2@2: What does the pre-exponential factor A represent? | Collision frequency and orientation | The activation energy | The temperature | The equilibrium constant | A captures how often molecules collide in the right way.
NUM1#chemistry-u07-17-q3@3: An Arrhenius plot has gradient −10,000 K. What is Ea in kJ mol⁻¹? (one decimal place) | 83.1 | 0.2 | kJ mol⁻¹ | Ea = 10,000 × 8.314 = 83,140 J mol⁻¹ = 83.1 kJ mol⁻¹.
M3#chemistry-u07-17-q4@3: Why are reactions with large Ea more temperature-sensitive? | The fraction e^(−Ea/RT) changes more steeply with T | Large Ea makes A larger | They have no collisions at low temperature | Temperature does not affect small Ea reactions at all | A large exponent amplifies changes in temperature.
SA2#chemistry-u07-17-q5@1,3: Explain the Arrhenius equation and how activation energy is found. | The Arrhenius equation, k = A e^(−Ea/RT), links the rate constant to temperature and activation energy, where A reflects collision frequency and orientation and the exponential term the fraction of collisions with enough energy. Taking logs gives ln k = ln A − Ea/RT, so plotting ln k against 1/T gives a straight line with gradient −Ea/R and intercept ln A. A gradient of −6,000 K gives Ea of about 50 kJ mol⁻¹. Reactions with large Ea are more temperature-sensitive. | Equation ; Terms ; Log form ; Arrhenius plot ; Temperature sensitivity

## Temperature effects
LV: Year 1 · Application
S: Temperature has a strong effect on reaction rates. This lesson applies kinetic ideas to everyday and industrial situations.
O: Explain the effect of temperature on rate using kinetic theory
O: Apply the rule of thumb that rates roughly double per 10 °C
O: Describe practical consequences in food, biology and industry
H: Explaining the effect
- Higher temperature increases particle speed and collision frequency.
- More importantly, a larger fraction of collisions exceed Ea.
- Many reactions near room temperature roughly **double** in rate per 10 °C rise.
- The exact factor depends on Ea.
D: chem-maxwell-boltzmann-ea
H: Consequences
- **Refrigeration** slows food spoilage.
- Body temperature regulates enzyme reaction rates.
- Industrial processes balance rate against cost and equilibrium yield.
- Cooling can control dangerously fast reactions.
P: Fever slightly increases metabolic rate, while hypothermia slows it. Cooking speeds up chemical changes in food. Industrial reactors often need cooling to remove heat from exothermic reactions and prevent **thermal runaway**, where a hotter reaction goes faster and releases even more heat.
X: Thermal runaway.
> An exothermic reaction warms its container.
> The higher temperature speeds up the reaction.
> Faster reaction releases heat more quickly.
> Without cooling, temperature and rate rise uncontrollably.
K: Higher temperature speeds reactions mainly by increasing the fraction of collisions above Ea, roughly doubling many rates per 10 °C, with consequences for food storage, biology and industrial safety, including thermal runaway.
!: Thinking temperature affects rate only by increasing collision frequency. The main effect is more collisions exceeding Ea.
EV: established | Thermal runaway is a major hazard in chemical reactors (Health and Safety Executive, 2024).
T: Thermal runaway | Uncontrolled acceleration of an exothermic reaction
T: Refrigeration | Cooling to slow chemical and biological processes
T: Collision frequency | Number of collisions per unit time
SUM: Fraction above Ea rises.
SUM: Roughly double per 10 °C.
SUM: Food, biology, safety.
SRC: Health and Safety Executive, Chemical reaction hazards and the risk of thermal runaway | guidance | 2024 | https://www.hse.gov.uk/pubns/indg254.htm
SRC: Atkins P. and de Paula J., Atkins' Physical Chemistry, 11th edition, Oxford University Press | secondary | 2018
Q: What is thermal runaway? | Uncontrolled acceleration of an exothermic reaction as it heats itself.
Q: Why does refrigeration slow food spoilage? | Lower temperature slows the reactions and microbial processes.
M1#chemistry-u07-18-q1@1: By roughly how much do many reaction rates increase per 10 °C rise? | About double | About ten times | About half | They do not change | A rule of thumb for many reactions near room temperature.
M2#chemistry-u07-18-q2@2: What is the main reason temperature increases rate? | More collisions have energy above Ea | Particles become larger | Activation energy decreases | Concentration increases | The energetic fraction grows much faster than collision frequency.
NUM1#chemistry-u07-18-q3@2: A rate doubles for each 10 °C rise. By what factor does it increase from 20 °C to 50 °C? | 8 | 0 | times | Three 10 °C steps: 2³ = 8 times.
M3#chemistry-u07-18-q4@3: Why must exothermic industrial reactors be cooled? | Heat would speed the reaction, risking thermal runaway | Cooling increases the yield of all reactions | Exothermic reactions stop when hot | Reactors melt at room temperature | Removing heat prevents an uncontrolled feedback loop.
SA2#chemistry-u07-18-q5@1,3: Explain the effect of temperature on rate and its practical consequences. | Higher temperature makes particles move faster, increasing collision frequency, but mainly increases the fraction of collisions with energy above Ea, so many rates roughly double per 10 °C. Refrigeration therefore slows food spoilage, body temperature controls enzyme rates and cooking speeds changes in food. Exothermic reactors must be cooled to prevent thermal runaway, where heat speeds the reaction, releasing heat faster still. Industry balances rate with cost and yield. | Kinetic explanation ; Rule of thumb ; Food ; Biology ; Industrial safety

## Reaction mechanisms
LV: Year 1 · Chemical reasoning
S: A reaction mechanism is the sequence of elementary steps by which reactants become products. This lesson explains how mechanisms are proposed and tested.
O: Define elementary steps and molecularity
O: Relate a mechanism to the rate equation
O: Evaluate whether a proposed mechanism is consistent with data
H: Mechanisms
- Most reactions occur in several **elementary steps**.
- **Molecularity** is the number of particles in an elementary step: unimolecular, bimolecular or termolecular.
- Steps add up to the overall equation.
- **Intermediates** are formed in one step and used in another.
D: chem-mechanism-profile
H: Linking to rate
- For an elementary step, the rate equation follows its molecularity.
- The **rate-determining step** controls the overall rate.
- Species in the rate equation appear in or before the slow step.
- A mechanism must match the experimental rate equation and the overall equation.
P: Termolecular steps are rare because three particles rarely collide at once. A proposed mechanism can be shown to be wrong if it conflicts with data, but it can never be proved correct, only supported. Mechanisms explain stereochemistry and product distributions as well as rates.
X: Testing a mechanism.
> For 2NO₂ + F₂ → 2NO₂F, rate = k[NO₂][F₂].
> Proposed: Step 1 (slow) NO₂ + F₂ → NO₂F + F; Step 2 (fast) NO₂ + F → NO₂F.
> The slow step involves one NO₂ and one F₂, matching the rate equation.
> The steps add to the overall equation, so the mechanism is consistent.
K: Mechanisms are sequences of elementary steps with defined molecularity that add to the overall equation; the rate-determining step and earlier steps determine the rate equation, so mechanisms are tested against experimental rate equations.
!: Thinking a mechanism is proved by matching the rate equation. Data can only support or rule out a mechanism.
EV: established | Mechanisms are tested by comparing predicted and observed rate laws (Atkins and de Paula, 2018).
T: Elementary step | A single step in a mechanism
T: Molecularity | The number of particles in an elementary step
T: Mechanism | The sequence of steps from reactants to products
SUM: Elementary steps.
SUM: Slow step sets rate.
SUM: Consistent with data.
SRC: Atkins P. and de Paula J., Atkins' Physical Chemistry, 11th edition, Oxford University Press | secondary | 2018
SRC: OpenStax, Chemistry 2e, section 12.6 "Reaction Mechanisms" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/12-6-reaction-mechanisms
Q: What is molecularity? | The number of particles taking part in an elementary step.
Q: Why are termolecular steps rare? | Three particles rarely collide at the same time.
M1#chemistry-u07-19-q1@1: What must the steps of a mechanism add up to? | The overall balanced equation | The rate equation only | The activation energy | The equilibrium constant | Intermediates cancel when steps are summed.
M2#chemistry-u07-19-q2@2: Which species appear in the rate equation? | Those in or before the rate-determining step | Only the products | Only species after the slow step | Every species in the overall equation | Steps after the slow step do not limit the rate.
MATCH1#chemistry-u07-19-q3@2: Match each term to its meaning. | Unimolecular = One particle ; Bimolecular = Two particles ; Termolecular = Three particles ; Intermediate = Formed then used | Mechanisms have key terms.
M3#chemistry-u07-19-q4@3: Why can a mechanism never be proved correct? | Other mechanisms might also fit the data | Mechanisms are always wrong | Rate equations cannot be measured | Intermediates never exist | Agreement with data supports but does not prove a mechanism.
SA2#chemistry-u07-19-q5@1,3: Explain reaction mechanisms and how they are tested. | A mechanism is a sequence of elementary steps, each with a molecularity of one, two or rarely three particles, adding to the overall equation, with intermediates formed and used up. For elementary steps, rate equations follow molecularity, and the rate-determining step and earlier steps decide the overall rate equation. A mechanism must match the experimental rate equation and overall equation, as for NO₂ and F₂ with a slow bimolecular first step. Data can support or rule out but never prove a mechanism. | Elementary steps ; Molecularity ; Rate-determining step ; Testing ; Limits of proof

## Rate-determining steps
LV: Year 1 · Chemical reasoning
S: The slowest step in a mechanism controls the overall rate. This lesson explains how to identify and use the rate-determining step.
O: Define the rate-determining step
O: Deduce a rate equation from a mechanism
O: Propose a mechanism consistent with a rate equation
H: The slow step
- The **rate-determining step** (RDS) is the slowest step in a mechanism.
- The overall rate cannot be faster than this step.
- It is like the narrowest point of a bottleneck.
- It usually has the highest activation energy.
D: chem-rds-profile
H: Using the RDS
- The rate equation contains species in the RDS and any steps before it.
- Species only involved after the RDS are zero order.
- If an intermediate appears in the RDS, its formation from earlier species is included.
- Example: SN1 hydrolysis of tertiary halogenoalkanes has rate = k[RX].
P: In SN1 reactions, the slow step is the C–X bond breaking to form a carbocation, so hydroxide ions do not appear in the rate equation. In SN2 reactions, both RX and OH⁻ are in the single step, so rate = k[RX][OH⁻]. The rate equation therefore reveals mechanism.
X: SN1 versus SN2.
> 2-bromo-2-methylpropane + OH⁻: rate = k[RBr].
> So the slow step involves only RBr, forming a carbocation.
> Bromoethane + OH⁻: rate = k[RBr][OH⁻].
> So the single step involves both species colliding.
K: The rate-determining step is the slowest step and controls the overall rate; the rate equation includes species in or before it, so rate equations distinguish mechanisms such as SN1 (rate = k[RX]) and SN2 (rate = k[RX][OH⁻]).
!: Assuming the first step is always the slowest. The rate-determining step can be any step in the sequence.
EV: established | Rate equations distinguish SN1 and SN2 mechanisms (Hughes and Ingold, 1935).
T: Rate-determining step | The slowest step controlling overall rate
T: SN1 | Unimolecular nucleophilic substitution
T: SN2 | Bimolecular nucleophilic substitution
SUM: Slowest step controls rate.
SUM: Species up to the RDS.
SUM: Rate equations reveal mechanisms.
SRC: Hughes E. D. and Ingold C. K., "Mechanism of substitution at a saturated carbon atom", Journal of the Chemical Society, 244–255 | primary | 1935
SRC: Clayden J., Greeves N. and Warren S., Organic Chemistry, 2nd edition, Oxford University Press | secondary | 2012
Q: What is the rate-determining step? | The slowest step in a reaction mechanism.
Q: What is the rate equation for an SN1 reaction? | Rate = k[RX].
M1#chemistry-u07-20-q1@1: Which step usually has the highest activation energy? | The rate-determining step | The fastest step | The final step always | The first step always | The slowest step has the biggest barrier.
M2#chemistry-u07-20-q2@2: Why does OH⁻ not appear in the SN1 rate equation? | It reacts only after the slow carbocation-forming step | It is a catalyst that is regenerated | It is not a reactant | It is in the slow step | Species after the RDS do not affect rate.
MATCH1#chemistry-u07-20-q3@3: Match each mechanism to its rate equation. | SN1 = Only RX in rate equation ; SN2 = RX and OH⁻ in rate equation ; Zero order in X = X reacts after slow step ; Bimolecular slow step = Two species in rate | Rate equations reveal mechanisms.
M3#chemistry-u07-20-q4@3: A reaction has rate = k[A]. Which mechanism fits? | A slow step involving only A, then fast steps with B | A single step where A and B collide | A slow step involving two B molecules | A fast step with A followed by slow B | Only A appears in the slow step, so only A is in the rate equation.
SA2#chemistry-u07-20-q5@1,3: Explain the rate-determining step and how it links mechanisms to rate equations. | The rate-determining step is the slowest step of a mechanism, usually with the highest activation energy, and it limits the overall rate like a bottleneck. The rate equation includes species in the RDS and steps before it, while those reacting afterwards are zero order. For tertiary halogenoalkanes, SN1 has a slow ionisation step, so rate = k[RX]; for primary halogenoalkanes, SN2 occurs in one step, so rate = k[RX][OH⁻]. Rate equations therefore reveal mechanisms. | Definition ; Bottleneck ; Species in rate equation ; SN1 ; SN2

## Catalytic cycles
LV: Year 1 · Chemical reasoning
S: Catalytic cycles show how catalysts are used and regenerated in repeating loops. This lesson explains how to read and analyse them.
O: Describe the features of a catalytic cycle
O: Identify catalyst, intermediates, reactants and products in a cycle
O: Explain turnover number and frequency
H: Features
- A catalytic cycle is a loop of steps returning the catalyst to its original form.
- Reactants enter and products leave at different points.
- Intermediates are catalyst-bound species within the loop.
- Many involve **oxidative addition**, insertion and **reductive elimination** at metal centres.
H: Measuring performance
- **Turnover number** (TON): moles of product per mole of catalyst before it deactivates.
- **Turnover frequency** (TOF): turnovers per unit time.
- High TON makes catalysts economical.
- Deactivation and poisoning end the cycle.
P: Enzymes can have turnover frequencies of thousands per second. The Monsanto and Cativa processes make ethanoic acid using rhodium and iridium catalysts in catalytic cycles. Palladium-catalysed cross-coupling, recognised by the 2010 Nobel Prize, is widely used to make medicines.
X: Calculating turnover number.
> 0.001 mol of catalyst produces 50 mol of product before deactivating.
> TON = 50 ÷ 0.001.
> TON = 50,000.
> Each catalyst molecule makes 50,000 product molecules.
K: Catalytic cycles are loops in which catalysts form intermediates and are regenerated, with reactants entering and products leaving; performance is measured by turnover number and turnover frequency, and cycles underpin industrial and pharmaceutical processes.
!: Thinking the catalyst appears only at the start of a cycle. It appears throughout as intermediates and is regenerated.
EV: established | Palladium-catalysed cross-coupling won the 2010 Nobel Prize in Chemistry (Nobel Assembly, 2010).
T: Catalytic cycle | A loop of steps regenerating a catalyst
T: Turnover number | Moles of product per mole of catalyst
T: Turnover frequency | Turnovers per unit time
SUM: Loops regenerate catalyst.
SUM: TON and TOF.
SUM: Industrial importance.
SRC: Nobel Assembly, The Nobel Prize in Chemistry 2010: Heck, Negishi and Suzuki | guidance | 2010 | https://www.nobelprize.org/prizes/chemistry/2010/summary/
SRC: Hagen J., Industrial Catalysis: A Practical Approach, 3rd edition, Wiley-VCH | secondary | 2015
Q: What is turnover number? | Moles of product formed per mole of catalyst before deactivation.
Q: What happens to the catalyst at the end of a cycle? | It is regenerated in its original form.
M1#chemistry-u07-21-q1@1: What does turnover frequency measure? | Turnovers per unit time | Total product formed | Catalyst mass | Activation energy | TOF expresses how fast each catalyst works.
M2#chemistry-u07-21-q2@2: In a catalytic cycle, where do products leave? | At a step where they are released from the catalyst | At the very start only | They never leave | Only when the catalyst dies | Products are released at a specific step of the loop.
NUM1#chemistry-u07-21-q3@2: 0.002 mol of catalyst makes 40 mol of product. What is the turnover number? | 20000 | 0 | turnovers | TON = 40 ÷ 0.002 = 20,000.
M3#chemistry-u07-21-q4@3: Why is a high turnover number economically important? | Less expensive catalyst is needed per mole of product | It makes products more expensive | It increases waste | It slows the reaction | Each catalyst molecule makes more product.
SA2#chemistry-u07-21-q5@1,3: Explain catalytic cycles and how catalyst performance is measured. | A catalytic cycle is a loop in which a catalyst binds reactants, passes through intermediates, releases products and returns to its original form; metal catalysts often use oxidative addition, insertion and reductive elimination. Turnover number is moles of product per mole of catalyst before deactivation, and turnover frequency is turnovers per unit time. High TON makes catalysts economical. Cycles underpin ethanoic acid production with rhodium and iridium and palladium cross-coupling for medicines. | Cycle features ; Intermediates ; TON ; TOF ; Applications

## Experimental kinetics
LV: Year 1 · Application
S: Kinetics experiments require careful planning and analysis. This lesson brings together methods, control of variables and error analysis.
O: Plan a kinetics experiment controlling variables
O: Choose continuous or discontinuous monitoring methods
O: Evaluate errors and uncertainties in kinetics data
H: Methods
- **Continuous monitoring**: measuring a property throughout, such as colorimetry, gas volume or conductivity.
- **Discontinuous (sampling)**: withdrawing samples, **quenching** them and titrating.
- **Clock reactions**: timing to a sudden colour change.
- Temperature is controlled with a **water bath**.
D: chem-initial-rates
H: Errors
- Keep all variables constant except the one being changed.
- Start timing accurately when reactants mix.
- Repeat runs to check reliability.
- Uncertainties in timing and volume measurements limit precision.
P: Quenching stops a reaction in a sample, for example by rapid cooling or by neutralising a catalyst, so the concentration at that moment can be measured. Data loggers and computers allow many readings and accurate graphs. Fast reactions need special methods such as stopped-flow spectroscopy.
X: Sampling and quenching.
> An ester is hydrolysed with acid catalyst at 25 °C.
> Every 5 minutes, 5 cm³ is withdrawn into ice-cold water.
> Cooling quenches the reaction.
> Each sample is titrated to find the acid concentration at that time.
K: Kinetics experiments use continuous methods such as colorimetry or gas collection, discontinuous sampling with quenching and titration, or clock reactions, controlling temperature and other variables and repeating runs to reduce errors.
!: Letting the temperature drift during a kinetics run. Temperature strongly affects rate, so it must be controlled.
EV: established | Stopped-flow methods allow measurement of very fast reactions (Gibson, 1954).
T: Quenching | Stopping a reaction in a sample
T: Continuous monitoring | Measuring a property throughout a reaction
T: Stopped-flow | A method for studying very fast reactions
SUM: Continuous or sampling.
SUM: Control temperature.
SUM: Repeat and evaluate.
SRC: Gibson Q. H., "Stopped-flow apparatus for the study of rapid reactions", Discussions of the Faraday Society 17, 137–139 | primary | 1954
SRC: Royal Society of Chemistry, Rates of reaction practicals | guidance | 2024 | https://edu.rsc.org/
Q: What is quenching? | Stopping a reaction in a sample so its composition can be measured.
Q: Why is a water bath used in kinetics experiments? | To keep temperature constant.
M1#chemistry-u07-22-q1@1: Which is a continuous monitoring method? | Using a colorimeter throughout the reaction | Titrating quenched samples | Weighing products at the end only | Measuring pH once at the start | Colorimeters record absorbance throughout.
M2#chemistry-u07-22-q2@2: How can a sample be quenched? | By rapid cooling or neutralising the catalyst | By heating it strongly | By adding more reactant | By stirring vigorously | Stopping the reaction freezes its composition.
SEQ1#chemistry-u07-22-q3@2: Order the steps in a sampling kinetics experiment. | Mix reactants and start timer ; Withdraw sample ; Quench sample ; Titrate to find concentration | Sampling follows a sequence.
M3#chemistry-u07-22-q4@3: Why are fast reactions studied using stopped-flow methods? | They mix and measure within milliseconds | They slow reactions down chemically | They avoid measuring anything | They use only titrations | Ordinary mixing is too slow for rapid reactions.
SA2#chemistry-u07-22-q5@1,3: Describe how kinetics experiments are carried out and evaluated. | Rates are measured continuously, using colorimetry, gas volume or conductivity, or discontinuously by withdrawing samples, quenching them by cooling or neutralising the catalyst and titrating. Clock reactions time a sudden colour change. Temperature is controlled with a water bath and other variables kept constant, timing starts at mixing and runs are repeated. Uncertainties in time and volume limit precision, data loggers improve accuracy and stopped-flow methods study very fast reactions. | Continuous methods ; Sampling and quenching ; Clock reactions ; Controlling variables ; Errors and fast reactions
`;
