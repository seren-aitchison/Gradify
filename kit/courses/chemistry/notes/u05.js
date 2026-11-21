// SciGradify States of Matter and Physical Chemistry (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## Gases
LV: Year 1 · Foundation
S: Gases have properties that differ sharply from liquids and solids. This lesson describes the properties of gases and how they are measured.
O: Describe the properties of gases
O: Describe how gas pressure arises and is measured
O: Convert between units of pressure and temperature
H: Properties
- Gases have **no fixed shape or volume** and fill their container.
- They are highly **compressible** because particles are far apart.
- They **mix** completely and diffuse quickly.
- Gas densities are low, roughly a thousandth of liquid densities.
D: chem-gas-particles
H: Pressure and units
- **Pressure** is force per unit area, caused by particles colliding with walls.
- SI unit: the **pascal** (Pa) = 1 N m⁻²; 1 atm = 101,325 Pa = 101.3 kPa.
- Temperature in gas calculations must be in **kelvin**: K = °C + 273.
- **Standard temperature and pressure** values vary; IUPAC uses 273.15 K and 100 kPa.
P: A barometer measures atmospheric pressure, first demonstrated by Torricelli with mercury in 1643. Gas behaviour depends on the amount of gas, volume, temperature and pressure, which are linked by the gas laws. Using kelvin avoids negative temperatures in proportional relationships.
X: Converting units.
> A gas is at 25 °C and 2.0 atm.
> Temperature = 25 + 273 = 298 K.
> Pressure = 2.0 × 101,325 = 202,650 Pa.
> This is about 203 kPa.
K: Gases fill their containers, are compressible and mix readily; pressure arises from particle collisions, is measured in pascals and temperatures for gas calculations must be in kelvin.
!: Using degrees Celsius in gas law calculations. Temperature must be converted to kelvin.
EV: established | IUPAC defines standard pressure as 100 kPa (IUPAC, 2014).
T: Pressure | Force per unit area
T: Pascal | The SI unit of pressure, 1 N m⁻²
T: Kelvin | The SI unit of temperature, starting at absolute zero
SUM: Compressible and mixing.
SUM: Pressure from collisions.
SUM: Use kelvin.
SRC: IUPAC, Compendium of Chemical Terminology (the Gold Book): standard pressure | standard | 2014 | https://goldbook.iupac.org/
SRC: OpenStax, Chemistry 2e, section 9.1 "Gas Pressure" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/9-1-gas-pressure
Q: What causes gas pressure? | Particles colliding with the walls of the container.
Q: Convert 50 °C to kelvin. | 323 K.
M1#chemistry-u05-01-q1@1: What is the SI unit of pressure? | The pascal | The atmosphere | The bar | The millimetre of mercury | One pascal is one newton per square metre of area.
M2#chemistry-u05-01-q2@2: Why are gases easily compressed? | Their particles are far apart with much empty space | Their particles are tightly packed together | Their particles cannot move at all | Their particles are much larger than in liquids | Large gaps between particles let the volume shrink.
NUM1#chemistry-u05-01-q3@1: Convert 127 °C to kelvin. | 400 | 0 | K | Kelvin = 127 + 273 = 400 K.
M3#chemistry-u05-01-q4@3: Why must temperature be in kelvin for gas calculations? | Gas laws are proportional relationships starting from absolute zero | Kelvin values are always smaller than Celsius | Celsius cannot measure gases | Kelvin is the only unit for liquids | Proportionality only works on an absolute scale without negatives.
SA2#chemistry-u05-01-q5@1,3: Describe the properties of gases and how pressure is measured. | Gases have no fixed shape or volume, fill their containers, are highly compressible because particles are far apart and mix readily. Pressure is force per unit area caused by particles colliding with walls, measured in pascals, where 1 atm is 101,325 Pa. Gas calculations require temperatures in kelvin, found by adding 273 to Celsius, because the gas laws are proportional from absolute zero. IUPAC standard pressure is 100 kPa. | Properties ; Compressibility ; Pressure ; Units ; Kelvin

## Gas laws
LV: Year 1 · Foundation
S: The gas laws describe how pressure, volume and temperature of a gas are related. This lesson covers Boyle's, Charles's and Gay-Lussac's laws.
O: State Boyle's, Charles's and Gay-Lussac's laws
O: Use the gas laws in calculations
O: Explain the gas laws using particle ideas
H: The laws
- **Boyle's law**: at constant temperature, pV = constant (pressure inversely proportional to volume).
- **Charles's law**: at constant pressure, V/T = constant.
- **Gay-Lussac's law**: at constant volume, p/T = constant.
- **Avogadro's law**: at constant p and T, volume is proportional to amount of gas.
D: chem-boyle
H: Combined gas law
- p₁V₁/T₁ = p₂V₂/T₂ for a fixed amount of gas.
- Temperatures must be in kelvin.
- Units of p and V must match on both sides.
- These laws hold best at low pressure and high temperature.
P: Robert Boyle published his law in 1662 from experiments with air trapped in a J-shaped tube. Heating a gas in a rigid container raises its pressure because particles move faster and hit the walls harder and more often. Weather balloons expand as they rise because outside pressure falls.
X: Using Boyle's law.
> A gas occupies 6.0 L at 100 kPa.
> It is compressed at constant temperature to 200 kPa.
> V₂ = p₁V₁ ÷ p₂ = (100 × 6.0) ÷ 200.
> V₂ = 3.0 L.
K: Boyle's law links pressure and volume, Charles's law volume and temperature, Gay-Lussac's law pressure and temperature, and Avogadro's law volume and amount; the combined gas law p₁V₁/T₁ = p₂V₂/T₂ applies to a fixed amount of gas with kelvin temperatures.
!: Doubling the Celsius temperature and expecting volume to double. Only doubling the kelvin temperature doubles volume.
EV: established | Boyle's law was published in 1662 from experiments on trapped air (Boyle, 1662).
T: Boyle's law | pV is constant at constant temperature
T: Charles's law | V/T is constant at constant pressure
T: Combined gas law | p₁V₁/T₁ = p₂V₂/T₂
SUM: Three classic laws.
SUM: Combined gas law.
SUM: Particle explanations.
SRC: Boyle R., A Defence of the Doctrine Touching the Spring and Weight of the Air, Thomas Robinson | primary | 1662
SRC: OpenStax, Chemistry 2e, section 9.2 "Relating Pressure, Volume, Amount, and Temperature: The Ideal Gas Law" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/9-2-relating-pressure-volume-amount-and-temperature-the-ideal-gas-law
Q: State Boyle's law. | At constant temperature, pressure is inversely proportional to volume.
Q: State Charles's law. | At constant pressure, volume is proportional to kelvin temperature.
M1#chemistry-u05-02-q1@1: Which law relates pressure and volume at constant temperature? | Boyle's law | Charles's law | Gay-Lussac's law | Avogadro's law | Boyle showed pV stays constant when temperature is fixed.
M2#chemistry-u05-02-q2@2: Why does pressure rise when a sealed gas is heated? | Particles move faster and hit the walls harder and more often | Particles become larger and fill more space | New particles form when the gas is heated | The container walls shrink inwards when heated | Faster particles exert more force on the walls.
NUM1#chemistry-u05-02-q3@2: A gas has volume 2.0 L at 300 K. At constant pressure, what is its volume in L at 450 K? | 3 | 0.05 | L | V₂ = V₁ × T₂ ÷ T₁ = 2.0 × 450 ÷ 300 = 3.0 L.
M3#chemistry-u05-02-q4@3: Why does a weather balloon expand as it rises? | Atmospheric pressure outside falls, so the gas expands | The gas inside gets hotter as it rises | More gas enters the balloon at altitude | Gravity pulls the balloon fabric outwards | Lower external pressure lets the gas occupy more volume.
SA2#chemistry-u05-02-q5@1,3: State and explain the gas laws. | Boyle's law states that at constant temperature pressure is inversely proportional to volume; Charles's law that at constant pressure volume is proportional to kelvin temperature; Gay-Lussac's law that at constant volume pressure is proportional to temperature; and Avogadro's law that volume is proportional to amount. They combine as p₁V₁/T₁ = p₂V₂/T₂, using kelvin. Heating a sealed gas raises pressure because particles hit walls harder and more often, and balloons expand as pressure falls. | Boyle ; Charles ; Gay-Lussac and Avogadro ; Combined law ; Particle explanation

## Ideal gas equation
LV: Year 1 · Application
S: The ideal gas equation links pressure, volume, temperature and amount of gas. This lesson explains how to use it.
O: State the ideal gas equation and its units
O: Calculate moles, volume or pressure using pV = nRT
O: Calculate molar mass from gas data
H: The equation
- **pV = nRT**.
- p in pascals, V in m³, n in moles, T in kelvin.
- R = **8.314 J K⁻¹ mol⁻¹**, the gas constant.
- 1 dm³ = 1 × 10⁻³ m³; 1 cm³ = 1 × 10⁻⁶ m³.
D: chem-charles
H: Uses
- Find the **amount** of gas: n = pV ÷ RT.
- Find **molar mass**: M = mRT ÷ pV.
- **Molar volume**: one mole of gas occupies about 24.0 dm³ at 298 K and 101 kPa.
- The equation assumes ideal behaviour.
P: The ideal gas equation combines Boyle's, Charles's and Avogadro's laws. Most errors come from unit conversions, especially volumes. It allows the molar mass of volatile liquids to be found by vaporising a known mass.
X: Finding molar mass.
> 0.50 g of a gas occupies 3.0 × 10⁻⁴ m³ at 298 K and 100,000 Pa.
> n = pV ÷ RT = (100,000 × 3.0 × 10⁻⁴) ÷ (8.314 × 298) = 0.0121 mol.
> M = 0.50 ÷ 0.0121.
> M ≈ 41 g mol⁻¹.
K: The ideal gas equation pV = nRT uses SI units with R = 8.314 J K⁻¹ mol⁻¹, allowing calculation of amount, volume, pressure and molar mass, with one mole occupying about 24 dm³ at room conditions.
!: Using volume in dm³ with pressure in pascals. Volume must be in m³ when pressure is in pascals.
EV: established | The gas constant R is defined exactly via the 2019 SI redefinition (NIST, 2019).
T: Ideal gas equation | pV = nRT
T: Gas constant | R = 8.314 J K⁻¹ mol⁻¹
T: Molar volume | Volume of one mole of gas under stated conditions
SUM: pV = nRT.
SUM: SI units.
SUM: Amount and molar mass.
SRC: NIST, CODATA recommended values of the fundamental physical constants (2018) | standard | 2019 | https://physics.nist.gov/cuu/Constants/
SRC: OpenStax, Chemistry 2e, section 9.2 "Relating Pressure, Volume, Amount, and Temperature: The Ideal Gas Law" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/9-2-relating-pressure-volume-amount-and-temperature-the-ideal-gas-law
Q: What is the value of the gas constant R? | 8.314 J K⁻¹ mol⁻¹.
Q: Convert 250 cm³ to m³. | 2.5 × 10⁻⁴ m³.
M1#chemistry-u05-03-q1@1: What is the approximate molar volume of a gas at room temperature and pressure? | 24 dm³ | 2.4 dm³ | 240 dm³ | 0.24 dm³ | One mole occupies about 24 dm³ at 298 K and 101 kPa.
M2#chemistry-u05-03-q2@2: Which rearrangement gives the amount of gas? | n = pV ÷ RT | n = RT ÷ pV | n = pVRT | n = p ÷ VRT | Dividing both sides of pV = nRT by RT isolates n.
NUM1#chemistry-u05-03-q3@2: How many moles of gas occupy 0.024 m³ at 100,000 Pa and 300 K? Give your answer to two decimal places. | 0.96 | 0.01 | mol | n = (100,000 × 0.024) ÷ (8.314 × 300) = 0.96 mol.
M3#chemistry-u05-03-q4@3: Why must volume be in m³ when using pressure in Pa? | SI units must be consistent with R in J K⁻¹ mol⁻¹ | Pascals only work with litres | m³ is always smaller than dm³ | R changes value with every unit | Mixing units gives answers wrong by factors of a thousand.
SA2#chemistry-u05-03-q5@1,3: Explain how the ideal gas equation is used. | The ideal gas equation pV = nRT links pressure in pascals, volume in m³, amount in moles and temperature in kelvin, with R = 8.314 J K⁻¹ mol⁻¹. Volumes must be converted, as 1 dm³ = 10⁻³ m³. Rearranging gives n = pV ÷ RT, and molar mass M = mRT ÷ pV, allowing volatile liquids to be identified. One mole of gas occupies about 24 dm³ at room conditions. The equation combines the gas laws and assumes ideal behaviour. | Equation ; Units ; Amount ; Molar mass ; Molar volume

## Real gases
LV: Year 1 · Chemical reasoning
S: Real gases deviate from ideal behaviour under some conditions. This lesson explains why and how to describe the deviations.
O: State the assumptions of the ideal gas model
O: Explain when and why real gases deviate from ideal behaviour
O: Describe the van der Waals equation
H: Ideal assumptions
- Gas particles have **negligible volume**.
- There are **no intermolecular forces** between particles.
- Collisions are **perfectly elastic**.
- Particles move randomly in straight lines.
D: chem-real-gas-z
H: Deviations
- Real gases deviate at **high pressure** and **low temperature**.
- At high pressure, particle volume becomes significant compared with the container.
- At low temperature, intermolecular attractions reduce pressure and can cause condensation.
- The **compressibility factor** Z = pV/nRT equals 1 for an ideal gas.
P: The **van der Waals equation** corrects for particle volume and attraction: (p + an²/V²)(V − nb) = nRT, where a reflects attraction and b particle volume. Gases with strong intermolecular forces, such as ammonia, deviate more than helium. Real gases behave most ideally at low pressure and high temperature.
X: Ammonia versus helium.
> At high pressure, helium's Z stays close to 1.
> Ammonia's Z falls below 1 at moderate pressures.
> Ammonia molecules attract each other through hydrogen bonds.
> These attractions make ammonia occupy less volume than predicted.
K: The ideal model assumes negligible particle volume, no intermolecular forces and elastic collisions; real gases deviate at high pressure and low temperature, measured by the compressibility factor and modelled by the van der Waals equation.
!: Thinking real gases always behave ideally. Deviations are significant at high pressure and low temperature.
EV: established | Van der Waals introduced corrections for particle volume and attraction in 1873 (van der Waals, 1873).
T: Ideal gas | A gas obeying pV = nRT exactly
T: Compressibility factor | Z = pV/nRT
T: Van der Waals equation | A gas equation correcting for size and attraction
SUM: Ideal assumptions.
SUM: High pressure and low temperature deviate.
SUM: Van der Waals corrections.
SRC: van der Waals J. D., Over de Continuiteit van den Gas- en Vloeistoftoestand, PhD thesis, Leiden University | primary | 1873
SRC: Atkins P. and de Paula J., Atkins' Physical Chemistry, 11th edition, Oxford University Press | secondary | 2018
Q: Name two assumptions of the ideal gas model. | Negligible particle volume and no intermolecular forces.
Q: Under what conditions do real gases deviate most from ideal behaviour? | High pressure and low temperature.
M1#chemistry-u05-04-q1@1: What is the compressibility factor of an ideal gas? | 1 | 0 | 8.314 | 22.4 | Z = pV/nRT equals exactly one when the gas is ideal.
M2#chemistry-u05-04-q2@2: Why do real gases deviate at low temperature? | Intermolecular attractions become significant as particles slow | Particles become larger as they cool down | Collisions become more elastic when cold | Particle volume disappears at low temperature | Slower particles are held by attractions, lowering pressure.
MATCH1#chemistry-u05-04-q3@2: Match each van der Waals term to its meaning. | a = Attraction correction ; b = Particle volume ; Z = Compressibility factor ; Ideal gas = Z equals one | Real gas models correct the ideal model.
M3#chemistry-u05-04-q4@3: Why does ammonia deviate from ideal behaviour more than helium? | Ammonia has much stronger intermolecular forces | Helium has a larger molecular volume | Ammonia molecules are perfectly elastic | Helium forms hydrogen bonds | Stronger attractions make ammonia less ideal.
SA2#chemistry-u05-04-q5@1,3: Explain why real gases deviate from ideal behaviour. | The ideal gas model assumes negligible particle volume, no intermolecular forces, elastic collisions and random motion. Real gases deviate at high pressure, where particle volume becomes significant, and at low temperature, where attractions reduce pressure and may cause condensation. The compressibility factor Z = pV/nRT is 1 for an ideal gas. The van der Waals equation corrects with a for attraction and b for volume. Ammonia deviates more than helium because of stronger forces. | Assumptions ; High pressure ; Low temperature ; Compressibility factor ; Van der Waals

## Kinetic molecular theory
LV: Year 1 · Application
S: Kinetic molecular theory explains gas behaviour from the motion of particles. This lesson connects particle speeds, temperature and energy.
O: State the postulates of kinetic molecular theory
O: Relate temperature to the average kinetic energy of particles
O: Describe the Maxwell-Boltzmann distribution of speeds
H: Postulates
- Gases consist of particles in constant, random motion.
- Particles have negligible volume and no forces between them except during collisions.
- Collisions are elastic.
- **Average kinetic energy is proportional to kelvin temperature**.
D: chem-maxwell-boltzmann-T
H: Speeds
- At a given temperature, particles have a **range of speeds**.
- The **Maxwell-Boltzmann distribution** shows the spread.
- Higher temperature shifts the peak to higher speeds and broadens the curve.
- Lighter particles move faster at the same temperature.
P: Average kinetic energy is (3/2)kT per particle, so all gases at the same temperature have the same average kinetic energy. Because kinetic energy is ½mv², lighter molecules such as hydrogen move faster than heavier ones such as oxygen. The theory explains pressure, diffusion and the gas laws.
X: Hydrogen versus oxygen.
> At 300 K, H₂ and O₂ have the same average kinetic energy.
> O₂ is 16 times heavier than H₂.
> Since ½mv² is equal, H₂'s average speed is √16 = 4 times greater.
> H₂ molecules move about 1,900 m s⁻¹; O₂ about 480 m s⁻¹.
K: Kinetic molecular theory treats gases as randomly moving particles with elastic collisions, whose average kinetic energy is proportional to kelvin temperature; the Maxwell-Boltzmann distribution shows speeds spread out more at higher temperature, and lighter particles move faster.
!: Thinking all particles in a gas move at the same speed. They have a distribution of speeds.
EV: established | Maxwell and Boltzmann derived the distribution of molecular speeds (Maxwell, 1860).
T: Kinetic energy | Energy of motion, ½mv²
T: Maxwell-Boltzmann distribution | The spread of particle speeds or energies
T: Elastic collision | A collision in which kinetic energy is conserved
SUM: Random motion.
SUM: Energy proportional to T.
SUM: Distribution of speeds.
SRC: Maxwell J. C., "Illustrations of the dynamical theory of gases", Philosophical Magazine 19(124), 19–32 | primary | 1860
SRC: OpenStax, Chemistry 2e, section 9.5 "The Kinetic-Molecular Theory" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/9-5-the-kinetic-molecular-theory
Q: What is average kinetic energy proportional to? | Kelvin temperature.
Q: What does the Maxwell-Boltzmann distribution show? | The spread of particle speeds or energies in a gas.
M1#chemistry-u05-05-q1@1: What happens to the Maxwell-Boltzmann peak when temperature rises? | It shifts to higher speeds | It shifts to lower speeds | It stays exactly the same | It disappears completely | More particles move faster at higher temperatures.
M2#chemistry-u05-05-q2@2: Why do hydrogen molecules move faster than oxygen molecules at the same temperature? | They have equal kinetic energy but much smaller mass | They have much more kinetic energy | Hydrogen molecules are larger than oxygen | Oxygen molecules collide inelastically | With equal ½mv², lighter particles must move faster.
NUM1#chemistry-u05-05-q3@3: Gas A has molar mass 4 and gas B 64. At the same temperature, how many times faster does A move on average? | 4 | 0 | times | Speed ratio = √(64 ÷ 4) = √16 = 4.
M3#chemistry-u05-05-q4@3: Why do all gases at the same temperature have the same average kinetic energy? | Average kinetic energy depends only on kelvin temperature | Their particles all have the same mass | They all move at exactly the same speed | Heavier gases have less energy at any temperature | Temperature measures average kinetic energy directly.
SA2#chemistry-u05-05-q5@1,3: Explain kinetic molecular theory and the distribution of speeds. | Kinetic molecular theory states that gas particles move randomly, have negligible volume, exert no forces except in collisions and collide elastically, and their average kinetic energy is proportional to kelvin temperature. The Maxwell-Boltzmann distribution shows a range of speeds, shifting to higher speeds and broadening as temperature rises. Because all gases at a given temperature have equal average kinetic energy, lighter molecules such as hydrogen move faster than heavier ones such as oxygen, by the square root of the mass ratio. | Postulates ; Temperature and energy ; Distribution ; Mass and speed ; Applications

## Liquids
LV: Year 1 · Foundation
S: Liquids have particles close together but free to move. This lesson describes the properties of liquids and how intermolecular forces control them.
O: Describe the particle arrangement in liquids
O: Explain the properties of liquids
O: Relate liquid properties to intermolecular forces
H: Particles
- Particles are **close together** but **not fixed** in position.
- They move past each other, so liquids **flow** and take the shape of their container.
- Liquids have a **fixed volume** and are only slightly compressible.
- Particles have short-range order but no long-range order.
D: chem-liquid-particles
H: Properties
- Stronger intermolecular forces give higher **boiling points**, **viscosity** and **surface tension**.
- Weaker forces give more **volatile** liquids that evaporate easily.
- Liquids **evaporate** from their surface at any temperature.
- Liquids can dissolve substances with similar intermolecular forces.
P: Water is unusual among small molecules for being liquid at room temperature, because of hydrogen bonding. Liquid properties lie between those of gases and solids. Evaporation cools a liquid because the fastest-moving particles escape.
X: Comparing ethanol and water.
> Ethanol boils at 78 °C; water at 100 °C.
> Both form hydrogen bonds.
> Water forms more hydrogen bonds per molecule.
> So water has stronger forces, a higher boiling point and evaporates more slowly.
K: Liquid particles are close but mobile, so liquids flow with fixed volume; stronger intermolecular forces raise boiling point, viscosity and surface tension and lower volatility, and evaporation cools a liquid.
!: Thinking evaporation only happens at the boiling point. Evaporation occurs from the surface at any temperature.
EV: established | Liquid properties are governed by intermolecular forces (Atkins and de Paula, 2018).
T: Volatile | Easily evaporating
T: Evaporation | Escape of particles from a liquid surface
T: Short-range order | Local arrangement without a repeating pattern
SUM: Close but mobile.
SUM: Forces control properties.
SUM: Evaporation cools.
SRC: Atkins P. and de Paula J., Atkins' Physical Chemistry, 11th edition, Oxford University Press | secondary | 2018
SRC: OpenStax, Chemistry 2e, section 10.2 "Properties of Liquids" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/10-2-properties-of-liquids
Q: Why can liquids flow? | Their particles can move past one another.
Q: Why does evaporation cool a liquid? | The fastest particles escape, lowering the average energy.
M1#chemistry-u05-06-q1@1: Which describes particles in a liquid? | Close together and able to move past each other | Far apart and moving freely | Fixed in a regular lattice | Not moving at all | Liquids combine closeness of particles with freedom to move past each other.
M2#chemistry-u05-06-q2@2: Why does water boil higher than ethanol? | Water forms more hydrogen bonds per molecule | Ethanol forms more hydrogen bonds | Water has much weaker intermolecular forces | Ethanol is an ionic compound | More hydrogen bonding needs more energy to separate molecules.
MATCH1#chemistry-u05-06-q3@1: Match each property to its link with forces. | Viscosity = Resistance to flow ; Volatility = Ease of evaporating ; Boiling point = Change to gas ; Surface tension = Skin-like surface | Forces control liquid properties.
M3#chemistry-u05-06-q4@3: Why are liquids only slightly compressible? | Their particles are already close together | Their particles are far apart | Their particles are fixed in place | Liquids have no volume | Little empty space remains between particles.
SA2#chemistry-u05-06-q5@1,3: Describe the properties of liquids and explain them using intermolecular forces. | In liquids particles are close together but not fixed, so liquids flow, take their container's shape, have a fixed volume and are only slightly compressible. Stronger intermolecular forces give higher boiling points, viscosity and surface tension and lower volatility, so water, with more hydrogen bonds, boils above ethanol. Liquids evaporate from their surface at any temperature, and evaporation cools them because the fastest particles escape. | Particle arrangement ; Flow and volume ; Forces and properties ; Volatility ; Evaporation

## Vapour pressure
LV: Year 1 · Application
S: Vapour pressure is the pressure of a vapour in equilibrium with its liquid. This lesson explains vapour pressure and its link to boiling.
O: Define vapour pressure
O: Explain how temperature and intermolecular forces affect vapour pressure
O: Relate vapour pressure to boiling point
H: Definition
- In a closed container, evaporation and condensation reach **dynamic equilibrium**.
- The pressure of the vapour then is the **vapour pressure**.
- It depends only on the substance and temperature, not on the amount of liquid.
- Volatile liquids have high vapour pressures.
D: chem-vapour-pressure
H: Boiling
- Vapour pressure **increases with temperature**.
- A liquid **boils** when its vapour pressure equals the external pressure.
- **Normal boiling point** is the temperature at which vapour pressure is 101.3 kPa.
- Lower external pressure lowers the boiling point.
P: At the top of Mount Everest, atmospheric pressure is about a third of sea level, so water boils at about 70 °C. Pressure cookers raise the pressure, so water boils above 100 °C and food cooks faster. Stronger intermolecular forces give lower vapour pressures.
X: Boiling at altitude.
> At sea level, water boils at 100 °C, where its vapour pressure is 101.3 kPa.
> On Everest, external pressure is about 34 kPa.
> Water's vapour pressure reaches 34 kPa at about 70 °C.
> So water boils at about 70 °C there.
K: Vapour pressure is the pressure of vapour in equilibrium with its liquid, rising with temperature and falling with stronger intermolecular forces; a liquid boils when vapour pressure equals external pressure, so boiling point changes with altitude and in pressure cookers.
!: Thinking more liquid gives a higher vapour pressure. Vapour pressure depends only on substance and temperature.
EV: established | Boiling occurs when vapour pressure equals external pressure (Atkins and de Paula, 2018).
T: Vapour pressure | Pressure of vapour in equilibrium with its liquid
T: Normal boiling point | Temperature at which vapour pressure is 101.3 kPa
T: Dynamic equilibrium | Equal rates of opposing processes
SUM: Equilibrium vapour pressure.
SUM: Rises with temperature.
SUM: Boiling when equal to external.
SRC: Atkins P. and de Paula J., Atkins' Physical Chemistry, 11th edition, Oxford University Press | secondary | 2018
SRC: OpenStax, Chemistry 2e, section 10.3 "Phase Transitions" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/10-3-phase-transitions
Q: When does a liquid boil? | When its vapour pressure equals the external pressure.
Q: Why does water boil below 100 °C on high mountains? | The external pressure is lower.
M1#chemistry-u05-07-q1@1: How does vapour pressure change as temperature rises? | It increases | It decreases | It stays the same | It falls to zero | More particles have enough energy to escape as temperature rises.
M2#chemistry-u05-07-q2@2: Why do pressure cookers cook food faster? | Higher pressure raises water's boiling point | Higher pressure lowers water's boiling point | They remove all the water vapour | They reduce the cooking temperature | Water stays liquid above 100 °C, so food heats faster.
MATCH1#chemistry-u05-07-q3@2: Match each condition to its effect. | High altitude = Lower boiling point ; Pressure cooker = Higher boiling point ; Strong forces = Low vapour pressure ; Volatile liquid = High vapour pressure | Pressure and forces affect boiling.
M3#chemistry-u05-07-q4@3: Why doesn't the amount of liquid affect vapour pressure? | Equilibrium depends only on temperature and the substance | More liquid always raises vapour pressure | Vapour pressure depends on container size | Less liquid evaporates faster | Evaporation and condensation rates balance regardless of amount.
SA2#chemistry-u05-07-q5@1,3: Explain vapour pressure and its relationship to boiling. | In a closed container, evaporation and condensation reach dynamic equilibrium, and the vapour then exerts the vapour pressure, which depends only on the substance and temperature. Vapour pressure rises with temperature and is lower for liquids with stronger intermolecular forces. A liquid boils when its vapour pressure equals the external pressure, and the normal boiling point is at 101.3 kPa. So water boils at about 70 °C on Everest and above 100 °C in a pressure cooker. | Definition ; Temperature ; Intermolecular forces ; Boiling ; Altitude and pressure cookers

## Boiling and melting
LV: Year 1 · Foundation
S: Melting and boiling are changes of state that require energy. This lesson explains heating curves and latent heat.
O: Describe changes of state and their names
O: Interpret a heating curve
O: Explain why temperature stays constant during a change of state
H: Changes of state
- **Melting** (solid → liquid) and **freezing** (liquid → solid).
- **Boiling** or **evaporation** (liquid → gas) and **condensation** (gas → liquid).
- **Sublimation** (solid → gas) and **deposition** (gas → solid).
- Melting, boiling and sublimation are **endothermic**.
D: chem-heating-curve
H: Heating curves
- On heating, temperature rises until a change of state begins.
- During melting and boiling, temperature stays **constant**.
- Energy is used to overcome forces between particles (**latent heat**), not to raise kinetic energy.
- The **enthalpy of vaporisation** is larger than the **enthalpy of fusion**.
P: Vaporisation needs more energy than fusion because particles must be fully separated, not just loosened. Pure substances have sharp melting points, while impure substances melt over a range, which chemists use to check purity. Steam burns are severe because condensing steam releases latent heat.
X: Reading a heating curve.
> Ice at −20 °C is heated steadily.
> Temperature rises to 0 °C, then stays constant while the ice melts.
> Temperature rises to 100 °C, then stays constant while the water boils.
> The boiling plateau is longer because vaporisation needs more energy.
K: Changes of state include melting, boiling, sublimation and their reverses; heating curves show flat sections where energy overcomes intermolecular forces as latent heat, with vaporisation needing more energy than fusion, and impurities widen melting ranges.
!: Thinking temperature rises during melting. It stays constant until all the solid has melted.
EV: established | Latent heat explains constant temperature during changes of state (Atkins and de Paula, 2018).
T: Latent heat | Energy absorbed or released during a change of state
T: Enthalpy of fusion | Energy needed to melt one mole of solid
T: Sublimation | Direct change from solid to gas
SUM: Names of changes.
SUM: Flat sections on heating curves.
SUM: Vaporisation needs more energy.
SRC: Atkins P. and de Paula J., Atkins' Physical Chemistry, 11th edition, Oxford University Press | secondary | 2018
SRC: OpenStax, Chemistry 2e, section 10.3 "Phase Transitions" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/10-3-phase-transitions
Q: What is sublimation? | A direct change from solid to gas.
Q: Why does an impure solid melt over a range? | Impurities disrupt the lattice, so it melts unevenly.
M1#chemistry-u05-08-q1@1: What happens to temperature while a pure solid melts? | It stays constant | It rises steadily | It falls steadily | It rises then falls | Energy goes into overcoming forces, not raising temperature.
M2#chemistry-u05-08-q2@2: Why is the enthalpy of vaporisation larger than the enthalpy of fusion? | Boiling must separate particles completely | Melting separates particles completely | Liquids have stronger forces than gases | Boiling needs no energy | Gas particles are fully separated, needing more energy.
MATCH1#chemistry-u05-08-q3@1: Match each change to its name. | Solid to liquid = Melting ; Liquid to gas = Boiling ; Solid to gas = Sublimation ; Gas to solid = Deposition | Changes of state have names.
M3#chemistry-u05-08-q4@3: Why do steam burns cause more damage than boiling water burns? | Condensing steam releases extra latent heat onto the skin | Steam is always much hotter than 100 °C | Boiling water contains no energy | Steam contains harmful chemicals | Latent heat of condensation adds to the heat delivered.
SA2#chemistry-u05-08-q5@1,3: Explain changes of state and heating curves. | Changes of state include melting, freezing, boiling, condensation, sublimation and deposition; melting, boiling and sublimation are endothermic. On a heating curve, temperature rises until a change begins, then stays constant while energy, the latent heat, overcomes intermolecular forces. The boiling plateau is longer because vaporisation separates particles completely, needing more energy than fusion. Pure substances melt sharply while impure ones melt over a range, and condensing steam releases latent heat. | Changes of state ; Heating curve ; Latent heat ; Fusion and vaporisation ; Purity

## Phase diagrams
LV: Year 1 · Application
S: Phase diagrams show which state a substance is in at any temperature and pressure. This lesson explains how to read them.
O: Identify regions, lines and points on a phase diagram
O: Explain the triple point and critical point
O: Compare the phase diagrams of water and carbon dioxide
H: Features
- Regions show where **solid**, **liquid** and **gas** are stable.
- Lines show conditions where two phases coexist in equilibrium.
- The **triple point** is where all three phases coexist.
- The **critical point** is beyond which liquid and gas become a single **supercritical fluid**.
D: chem-phase-water
H: Water and CO₂
- Water's solid-liquid line slopes **backwards**: increasing pressure can melt ice, because ice is less dense.
- CO₂'s triple point is at 5.1 atm, so at 1 atm solid CO₂ **sublimes**.
- Dry ice sublimes at −78 °C.
- Supercritical CO₂ is used to decaffeinate coffee.
P: Phase diagrams explain why ice skates glide partly because pressure and friction melt a thin layer, and why liquid CO₂ only exists above 5.1 atm. Supercritical fluids combine gas-like diffusion with liquid-like dissolving power.
X: Reading CO₂'s diagram.
> At 1 atm and −100 °C, CO₂ is solid.
> As it warms at 1 atm, it crosses into the gas region at −78 °C.
> It never passes through the liquid region.
> So dry ice sublimes rather than melting.
K: Phase diagrams show stable phases at each temperature and pressure, with lines of coexistence, a triple point and a critical point; water's negative solid-liquid slope reflects less dense ice, while CO₂ sublimes at 1 atm because its triple point is above 1 atm.
!: Thinking every substance melts at atmospheric pressure. CO₂ sublimes because its triple point is above 1 atm.
EV: established | Supercritical CO₂ is widely used for decaffeination (McHugh and Krukonis, 1994).
T: Triple point | Conditions where solid, liquid and gas coexist
T: Critical point | Conditions beyond which liquid and gas become one phase
T: Supercritical fluid | A phase beyond the critical point
SUM: Regions, lines, points.
SUM: Triple and critical points.
SUM: Water and CO₂ differ.
SRC: McHugh M. A. and Krukonis V. J., Supercritical Fluid Extraction, 2nd edition, Butterworth-Heinemann | secondary | 1994
SRC: OpenStax, Chemistry 2e, section 10.4 "Phase Diagrams" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/10-4-phase-diagrams
Q: What is the triple point? | The conditions where solid, liquid and gas coexist.
Q: Why does dry ice sublime at 1 atm? | CO₂'s triple point is above 1 atm, so the liquid is not stable there.
M1#chemistry-u05-09-q1@1: What do lines on a phase diagram represent? | Conditions where two phases coexist | Conditions where only gas exists | The boiling points of mixtures | The density of each phase | Each line marks an equilibrium between two phases.
M2#chemistry-u05-09-q2@2: Why does water's solid-liquid line slope backwards? | Ice is less dense than liquid water | Ice is denser than liquid water | Water has no triple point | Pressure always freezes water | Raising pressure favours the denser liquid phase.
MATCH1#chemistry-u05-09-q3@2: Match each feature to its meaning. | Triple point = Three phases ; Critical point = Supercritical beyond ; Line = Two phases ; Region = One phase | Phase diagrams have features.
M3#chemistry-u05-09-q4@3: Why is supercritical CO₂ useful for extraction? | It diffuses like a gas but dissolves like a liquid | It is a solid at room temperature | It reacts with caffeine chemically | It is more toxic than organic solvents | Combining properties gives efficient, clean extraction.
SA2#chemistry-u05-09-q5@1,3: Explain how to read phase diagrams, using water and carbon dioxide. | Phase diagrams show regions where solid, liquid or gas are stable, lines where two phases coexist, a triple point where all three coexist and a critical point beyond which a supercritical fluid forms. Water's solid-liquid line slopes backwards because ice is less dense, so pressure can melt ice. CO₂'s triple point is at 5.1 atm, so at 1 atm it sublimes at −78 °C as dry ice. Supercritical CO₂ diffuses like a gas and dissolves like a liquid, used in decaffeination. | Regions and lines ; Triple point ; Critical point ; Water ; Carbon dioxide

## Solids
LV: Year 1 · Foundation
S: Solids have fixed shapes because their particles are held in place. This lesson describes the general properties of solids.
O: Describe the particle arrangement in solids
O: Distinguish crystalline and amorphous solids
O: Relate solid properties to bonding type
H: Particles
- Particles are **closely packed** and **vibrate** about fixed positions.
- Solids have a **fixed shape and volume**.
- They are generally incompressible.
- Particles gain vibrational energy when heated until the solid melts.
D: chem-solid-types-lattice
H: Types
- **Crystalline** solids have a regular, repeating arrangement.
- **Amorphous** solids lack long-range order, such as glass.
- Properties depend on bonding: ionic, molecular, giant covalent or metallic.
- Solids expand slightly when heated.
P: Thermal expansion matters in engineering: bridges have expansion joints and railway tracks have gaps. The density of most solids is greater than their liquids, but ice is an exception. The particle model explains why solids hold their shape.
X: Expansion joints.
> A steel bridge is 100 m long.
> On a hot day its temperature rises by 30 °C.
> Steel expands by about 0.0012% per °C.
> The bridge lengthens by about 36 mm, so joints are needed.
K: Solid particles are closely packed and vibrate about fixed positions, giving fixed shape and volume; solids are crystalline or amorphous, their properties depend on bonding and they expand slightly on heating.
!: Thinking particles in a solid do not move. They vibrate about fixed positions.
EV: established | Thermal expansion of solids requires expansion joints in structures (Callister and Rethwisch, 2018).
T: Crystalline | Having a regular repeating arrangement
T: Amorphous | Lacking long-range order
T: Thermal expansion | Increase in size on heating
SUM: Vibrating in fixed positions.
SUM: Crystalline or amorphous.
SUM: Bonding controls properties.
SRC: Callister W. D. and Rethwisch D. G., Materials Science and Engineering: An Introduction, 10th edition, Wiley | secondary | 2018
SRC: OpenStax, Chemistry 2e, section 10.5 "The Solid State of Matter" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/10-5-the-solid-state-of-matter
Q: How do particles move in a solid? | They vibrate about fixed positions.
Q: Give an example of an amorphous solid. | Glass.
M1#chemistry-u05-10-q1@1: Why do solids have a fixed shape? | Particles are held in fixed positions | Particles move freely past each other | Particles are far apart | Particles have no energy | Strong forces keep the particles vibrating about fixed positions.
M2#chemistry-u05-10-q2@2: Why do bridges have expansion joints? | Solids expand when heated and need space | Solids contract when heated | Joints make bridges lighter | Steel does not change with temperature | Joints allow the steel to expand on hot days without damage.
NUM1#chemistry-u05-10-q3@2: A 50 m steel rail expands by 0.0012% per °C. How many mm does it lengthen when heated by 20 °C? | 12 | 0.5 | mm | 50,000 mm × 0.000012 × 20 = 12 mm.
M3#chemistry-u05-10-q4@3: Why is ice less dense than liquid water, unlike most solids? | Hydrogen bonds hold ice in an open lattice | Ice particles move faster than in water | Ice contains trapped air bubbles only | Liquid water has an open lattice | The open hydrogen-bonded structure takes up more space.
SA2#chemistry-u05-10-q5@1,3: Describe the properties of solids. | In solids, particles are closely packed and vibrate about fixed positions, so solids have a fixed shape and volume and are generally incompressible. Crystalline solids have regular repeating arrangements, while amorphous solids such as glass lack long-range order. Properties depend on bonding type. Solids expand slightly when heated, so bridges need expansion joints. Most solids are denser than their liquids, but ice is an exception because hydrogen bonds form an open lattice. | Particles ; Shape and volume ; Crystalline and amorphous ; Thermal expansion ; Density

## Crystalline solids
LV: Year 1 · Application
S: Crystalline solids have long-range order that gives them sharp melting points and flat faces. This lesson explores their properties and defects.
O: Describe the features of crystalline solids
O: Explain anisotropy and cleavage in crystals
O: Describe crystal defects and their effects
H: Features
- Particles arranged in a **regular, repeating lattice** with long-range order.
- **Sharp melting points**, because all bonds are equivalent.
- Flat faces and characteristic angles.
- Can be ionic, molecular, covalent network or metallic.
D: chem-cubic-cells
H: Directions and defects
- **Anisotropy**: some properties vary with direction, such as graphite conducting along layers.
- **Cleavage**: crystals split along planes of weakness.
- **Point defects**: vacancies or extra atoms.
- **Dislocations**: misaligned rows that let metals deform.
P: Defects matter: doping silicon introduces controlled point defects, and dislocations explain why metals bend rather than shatter. Large single crystals of silicon are grown for computer chips. Gemstones are prized for their crystal faces and optical properties.
X: Cleaving calcite.
> A calcite crystal is tapped along a particular direction.
> It splits cleanly into smaller rhombohedral pieces.
> The cleavage follows planes of weaker bonding in the lattice.
> The angles of the faces stay the same.
K: Crystalline solids have long-range order, sharp melting points and characteristic faces; they can be anisotropic and cleave along planes, and defects such as vacancies and dislocations strongly affect their properties.
!: Thinking crystals are always perfect. Real crystals contain defects that affect their properties.
EV: established | Dislocations explain plastic deformation of metals (Callister and Rethwisch, 2018).
T: Anisotropy | Variation of properties with direction
T: Cleavage | Splitting along planes of weakness
T: Dislocation | A line defect in a crystal
SUM: Long-range order.
SUM: Anisotropy and cleavage.
SUM: Defects matter.
SRC: Callister W. D. and Rethwisch D. G., Materials Science and Engineering: An Introduction, 10th edition, Wiley | secondary | 2018
SRC: OpenStax, Chemistry 2e, section 10.5 "The Solid State of Matter" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/10-5-the-solid-state-of-matter
Q: Why do crystalline solids have sharp melting points? | All their bonds are equivalent, so they break at the same temperature.
Q: What is anisotropy? | Variation of properties with direction.
M1#chemistry-u05-11-q1@1: Which is an example of anisotropy? | Graphite conducting better along its layers | Glass softening over a range | Water flowing in any direction | Salt dissolving in water | Graphite's properties differ along and across layers.
M2#chemistry-u05-11-q2@2: Why do metals bend instead of shattering? | Dislocations let rows of atoms slip | Metals contain no defects at all | Metal bonds are directional | Metals are amorphous | Moving dislocations allow plastic deformation.
MATCH1#chemistry-u05-11-q3@2: Match each term to its meaning. | Vacancy = Missing atom ; Dislocation = Misaligned row ; Cleavage = Splitting plane ; Anisotropy = Direction-dependent | Crystals have features and defects.
M3#chemistry-u05-11-q4@3: Why are controlled point defects useful in silicon? | Doping atoms change its electrical conductivity | They make the silicon melt at lower temperatures | They remove all electrons | They make silicon amorphous | Dopants create the charge carriers used in chips.
SA2#chemistry-u05-11-q5@1,3: Describe crystalline solids and the importance of defects. | Crystalline solids have particles in regular repeating lattices with long-range order, giving sharp melting points and characteristic faces, and may be ionic, molecular, network or metallic. Some properties vary with direction, such as graphite's conductivity, and crystals cleave along planes of weakness, as calcite does. Point defects such as vacancies and dopants change properties, as in doped silicon, and dislocations let metals deform rather than shatter. | Order ; Melting ; Anisotropy ; Cleavage ; Defects

## Amorphous solids
LV: Year 1 · Application
S: Amorphous solids lack long-range order. This lesson explains how they form and how they differ from crystals.
O: Describe the structure of amorphous solids
O: Explain the glass transition
O: Compare amorphous and crystalline forms of the same substance
H: Structure
- Particles have **short-range order** but no repeating pattern.
- Examples: **glass**, many **polymers**, amorphous silicon and candyfloss.
- They often form when liquids are **cooled rapidly**, so particles cannot arrange.
- They **soften over a range** of temperatures instead of melting sharply.
D: chem-crystalline-amorphous
H: Glass transition and comparison
- The **glass transition temperature** (Tg) is where an amorphous solid changes from hard and brittle to soft and rubbery.
- Quartz is crystalline SiO₂; glass is amorphous SiO₂.
- Amorphous forms are often more soluble and isotropic.
- Some drugs are made amorphous to dissolve faster.
P: Glass breaks with curved conchoidal fractures rather than clean cleavage planes. Polymers such as PET can be crystalline or amorphous depending on cooling. Metallic glasses, made by very rapid cooling, can be very strong.
X: Making glass.
> Silica is melted with sodium carbonate and limestone.
> The melt is cooled quickly.
> The atoms freeze in a disordered network.
> The result is transparent soda-lime glass.
K: Amorphous solids have short-range but no long-range order, often forming by rapid cooling; they soften over a range at the glass transition rather than melting sharply, and differ from crystalline forms in solubility and isotropy.
!: Thinking glass is a slow-flowing liquid. It is an amorphous solid; old windows are thicker at the bottom because of how they were made.
EV: established | Medieval window glass does not flow measurably at room temperature (Zanotto, 1998).
T: Amorphous solid | A solid without long-range order
T: Glass transition temperature | Temperature where an amorphous solid softens
T: Isotropic | Having the same properties in all directions
SUM: No long-range order.
SUM: Glass transition.
SUM: Different from crystals.
SRC: Zanotto E. D., "Do cathedral glasses flow?", American Journal of Physics 66(5), 392–395 | primary | 1998
SRC: Callister W. D. and Rethwisch D. G., Materials Science and Engineering: An Introduction, 10th edition, Wiley | secondary | 2018
Q: What is the glass transition temperature? | The temperature where an amorphous solid changes from hard to soft.
Q: How do amorphous solids usually form? | By rapid cooling of liquids.
M1#chemistry-u05-12-q1@1: Which is an amorphous form of SiO₂? | Glass | Quartz | Diamond | Graphite | Glass is disordered silica, while quartz is crystalline.
M2#chemistry-u05-12-q2@2: Why do amorphous solids soften over a range of temperatures? | Their bonds vary in strength because of disorder | All of their bonds are identical in strength | They have no bonds | They are always liquids | Different local environments break down at different temperatures.
MATCH1#chemistry-u05-12-q3@2: Match each material to its structure. | Quartz = Crystalline ; Window glass = Amorphous ; Table salt = Crystalline ionic ; Candyfloss = Amorphous sugar | Solids may be ordered or disordered.
M3#chemistry-u05-12-q4@3: Why are some drugs made in amorphous form? | They dissolve faster than crystalline forms | They are always more stable | They have sharper melting points | They cannot dissolve at all | Disordered solids need less energy to dissolve.
SA2#chemistry-u05-12-q5@1,3: Compare amorphous and crystalline solids. | Amorphous solids have short-range but no long-range order and often form when liquids cool too quickly for particles to arrange, as in glass and many polymers. They soften over a range at the glass transition temperature instead of melting sharply, and fracture with curved surfaces. Crystalline solids such as quartz have long-range order and sharp melting points. Amorphous forms are isotropic and often more soluble, so some drugs are made amorphous. Glass is a solid, not a slow liquid. | Structure ; Formation ; Glass transition ; Comparison ; Uses

## Solutions
LV: Year 1 · Foundation
S: A solution is a homogeneous mixture of a solute in a solvent. This lesson explains how solutions form and the energy changes involved.
O: Define solute, solvent and solution
O: Explain the dissolving process in terms of interactions
O: Describe energy changes when dissolving
H: Terms
- **Solute**: the substance dissolved.
- **Solvent**: the substance it dissolves in.
- **Solution**: a homogeneous mixture.
- Solutions can be solid (alloys), liquid or gaseous (air).
D: chem-dissolving
H: Dissolving
- Solute-solute and solvent-solvent attractions are broken.
- New solute-solvent attractions form.
- Ions in water are **hydrated**: surrounded by water molecules.
- Dissolving can be exothermic or endothermic overall.
P: Ammonium nitrate dissolving in water is endothermic, which is used in instant cold packs. Calcium chloride dissolving is exothermic, used in some heat packs. Whether something dissolves depends on both energy changes and entropy.
X: Dissolving sodium chloride.
> Water molecules surround Na⁺ ions with their δ− oxygen ends.
> They surround Cl⁻ ions with their δ+ hydrogen ends.
> These ion-dipole attractions pull ions from the lattice.
> The hydrated ions spread throughout the water.
K: Solutions are homogeneous mixtures of solute in solvent; dissolving breaks solute-solute and solvent-solvent attractions and forms solute-solvent ones, with ions hydrated in water, and can be exothermic or endothermic.
!: Thinking dissolving is a chemical reaction that destroys the solute. The solute can usually be recovered by evaporation.
EV: established | Hydration of ions explains the dissolution of ionic compounds in water (Atkins and de Paula, 2018).
T: Solute | The substance dissolved
T: Solvent | The substance that dissolves the solute
T: Hydration | Surrounding of ions by water molecules
SUM: Solute in solvent.
SUM: Break and make attractions.
SUM: Energy changes either way.
SRC: Atkins P. and de Paula J., Atkins' Physical Chemistry, 11th edition, Oxford University Press | secondary | 2018
SRC: OpenStax, Chemistry 2e, section 11.1 "The Dissolution Process" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/11-1-the-dissolution-process
Q: What is a solvent? | The substance in which a solute dissolves.
Q: What is hydration of an ion? | Surrounding of the ion by water molecules.
M1#chemistry-u05-13-q1@1: Which is a solution? | Salt dissolved in water | Sand mixed with water | Oil floating on water | Chalk dust in air | A solution is a uniform mixture at the particle level.
M2#chemistry-u05-13-q2@2: How do water molecules surround a sodium ion? | With their δ− oxygen ends pointing towards it | With their δ+ hydrogen ends towards it | They do not surround it at all | They bond covalently to sodium | Opposite charges attract the oxygen end to Na⁺.
MATCH1#chemistry-u05-13-q3@1: Match each term to its example. | Solute = Sugar ; Solvent = Water ; Solid solution = Brass ; Gaseous solution = Air | Solutions take many forms.
M3#chemistry-u05-13-q4@3: Why do instant cold packs get cold? | Dissolving ammonium nitrate absorbs energy from the surroundings | The pack releases heat when squeezed | Water freezes inside the pack | The salt reacts with oxygen | An endothermic dissolution takes in heat.
SA2#chemistry-u05-13-q5@1,3: Explain how substances dissolve. | A solution is a homogeneous mixture of a solute in a solvent, which may be solid, liquid or gas. Dissolving breaks solute-solute and solvent-solvent attractions and forms new solute-solvent attractions. Ionic compounds dissolve in water as ions are hydrated: water's δ− oxygen surrounds cations and δ+ hydrogen surrounds anions. Dissolving can be endothermic, as in ammonium nitrate cold packs, or exothermic, as with calcium chloride, and the solute can usually be recovered. | Terms ; Breaking attractions ; Forming attractions ; Hydration ; Energy changes

## Solubility
LV: Year 1 · Application
S: Solubility is the maximum amount of solute that dissolves in a solvent. This lesson explains factors affecting solubility and solubility curves.
O: Define solubility and saturated solution
O: Explain the "like dissolves like" principle
O: Interpret solubility curves and the effect of temperature and pressure
H: Definitions
- **Solubility**: the maximum mass of solute that dissolves in a given amount of solvent at a given temperature.
- A **saturated** solution holds the maximum; an **unsaturated** one holds less.
- **Supersaturated** solutions hold more than the equilibrium amount and are unstable.
- Often expressed as g per 100 g of water.
D: chem-solubility-curve
H: Factors
- **Like dissolves like**: polar solutes in polar solvents, non-polar in non-polar.
- Solubility of most solids **increases** with temperature.
- Solubility of gases **decreases** with temperature.
- Gas solubility **increases** with pressure (**Henry's law**).
P: Fizzy drinks are bottled under high CO₂ pressure; opening the bottle lowers pressure and gas escapes. Warm rivers hold less oxygen, which can harm fish. Solubility curves let chemists plan crystallisation by cooling.
X: Using a solubility curve.
> Potassium nitrate's solubility is 110 g per 100 g water at 60 °C.
> At 20 °C it is 32 g per 100 g water.
> A saturated solution in 100 g water at 60 °C is cooled to 20 °C.
> 110 − 32 = 78 g of crystals form.
K: Solubility is the maximum solute dissolving in a given solvent at a set temperature; like dissolves like, solids usually become more soluble when hot, gases less soluble when hot and more soluble at higher pressure, as Henry's law states.
!: Thinking all substances become more soluble when heated. Gases become less soluble at higher temperatures.
EV: established | Henry's law states gas solubility is proportional to its partial pressure (Henry, 1803).
T: Solubility | Maximum amount of solute that dissolves at a given temperature
T: Saturated solution | A solution holding the maximum solute
T: Henry's law | Gas solubility is proportional to its pressure
SUM: Maximum dissolved.
SUM: Like dissolves like.
SUM: Temperature and pressure effects.
SRC: Henry W., "Experiments on the quantity of gases absorbed by water", Philosophical Transactions of the Royal Society 93, 29–42 | primary | 1803
SRC: OpenStax, Chemistry 2e, section 11.3 "Solubility" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/11-3-solubility
Q: What is a saturated solution? | A solution holding the maximum amount of dissolved solute at that temperature.
Q: State Henry's law. | Gas solubility is proportional to the pressure of the gas.
M1#chemistry-u05-14-q1@1: Which solvent dissolves iodine, a non-polar solid, best? | Hexane | Water | Salt water | Ethanoic acid solution | Non-polar solutes dissolve in non-polar solvents.
M2#chemistry-u05-14-q2@2: Why do fizzy drinks go flat faster when warm? | Gas solubility decreases as temperature rises | Gas solubility increases with temperature | Warm drinks have higher pressure | Sugar traps the gas better when warm | Warmer liquid holds less dissolved CO₂, so gas escapes faster.
NUM1#chemistry-u05-14-q3@2: A salt dissolves at 80 g per 100 g water at 50 °C and 30 g at 10 °C. What mass crystallises when a saturated solution in 100 g water is cooled from 50 °C to 10 °C? | 50 | 0 | g | Crystals formed = 80 − 30 = 50 g.
M3#chemistry-u05-14-q4@3: Why can warm river water harm fish? | It holds less dissolved oxygen | It holds more dissolved oxygen | Fish cannot swim in warm water | Warm water has more pressure | Lower oxygen solubility reduces oxygen available to fish.
SA2#chemistry-u05-14-q5@1,3: Explain solubility and the factors affecting it. | Solubility is the maximum mass of solute dissolving in a given amount of solvent at a set temperature; saturated solutions hold this maximum and supersaturated ones hold more but are unstable. Like dissolves like, so polar solutes dissolve in polar solvents. Most solids become more soluble when heated, allowing crystallisation by cooling, as calculated from solubility curves. Gases become less soluble when warm, harming fish in warm rivers, and more soluble at higher pressure by Henry's law, as in fizzy drinks. | Definitions ; Like dissolves like ; Temperature and solids ; Gases ; Henry's law

## Concentration
LV: Year 1 · Application
S: This lesson extends concentration beyond mol dm⁻³ to other units used in physical chemistry and everyday life.
O: Convert between mass and molar concentrations
O: Use percentage, ppm and molality units
O: Choose appropriate concentration units
H: Units
- **Molar concentration**: mol dm⁻³ (moles per litre of solution).
- **Mass concentration**: g dm⁻³.
- **Percentage**: % by mass (w/w) or by volume (v/v).
- **Parts per million** (ppm): for very dilute solutions, 1 ppm ≈ 1 mg per kg.
- **Molality**: mol per kg of solvent.
H: Choosing units
- Molarity changes slightly with temperature because volume changes.
- Molality does not change with temperature, so it is used for colligative properties.
- ppm is used for pollutants and trace elements.
- Mass concentration (g dm⁻³) = molarity × molar mass.
P: UK drinking water limits for nitrate are 50 mg per litre, often described as 50 ppm. Blood alcohol limits for driving are expressed in mg per 100 cm³. Choosing the right unit makes communication clear.
X: Converting units.
> A solution contains 0.20 mol dm⁻³ sodium hydroxide (M = 40 g mol⁻¹).
> Mass concentration = 0.20 × 40 = 8.0 g dm⁻³.
> Since 1 dm³ of dilute solution has a mass of about 1,000 g, this is about 0.8% by mass.
> It is also about 8,000 ppm.
K: Concentration can be expressed as mol dm⁻³, g dm⁻³, percentage, ppm or molality; molality is independent of temperature and suits colligative properties, ppm suits trace substances and units are converted using molar mass.
!: Confusing molarity and molality. Molarity uses litres of solution; molality uses kilograms of solvent.
EV: established | UK drinking water standards set a nitrate limit of 50 mg per litre (Water Supply (Water Quality) Regulations 2016).
T: Molarity | Moles of solute per dm³ of solution
T: Molality | Moles of solute per kg of solvent
T: Parts per million | A unit for very dilute concentrations
SUM: Many units.
SUM: Molality is temperature-independent.
SUM: ppm for traces.
SRC: The Water Supply (Water Quality) Regulations 2016, SI 2016/614 | legislation | 2016 | https://www.legislation.gov.uk/uksi/2016/614/contents
SRC: OpenStax, Chemistry 2e, section 3.4 "Other Units for Solution Concentrations" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/3-4-other-units-for-solution-concentrations
Q: What is molality? | Moles of solute per kilogram of solvent.
Q: When is ppm used? | For very dilute solutions such as pollutants.
M1#chemistry-u05-15-q1@1: Which unit does not change with temperature? | Molality | Molarity | Mass per volume | Volume percentage | Molality uses masses, which do not change with temperature.
M2#chemistry-u05-15-q2@2: How is mass concentration found from molarity? | Multiply by molar mass | Divide by molar mass | Multiply by volume | Divide by Avogadro's constant | g dm⁻³ = mol dm⁻³ × g mol⁻¹, so multiply by the molar mass.
NUM1#chemistry-u05-15-q3@2: A solution is 0.50 mol dm⁻³ glucose (M = 180 g mol⁻¹). What is its mass concentration in g dm⁻³? | 90 | 0 | g dm⁻³ | 0.50 × 180 = 90 g dm⁻³.
M3#chemistry-u05-15-q4@3: Why is molality preferred for colligative property calculations? | It does not change as temperature changes volume | It is easier to measure volumes | Molarity is never accurate | Molality ignores the solute | Mass-based units stay constant across temperatures.
SA2#chemistry-u05-15-q5@1,3: Describe different units of concentration and when they are used. | Concentration can be expressed as molarity in mol dm⁻³, mass concentration in g dm⁻³, percentages by mass or volume, parts per million and molality in mol per kg of solvent. Mass concentration equals molarity times molar mass, so 0.20 mol dm⁻³ NaOH is 8.0 g dm⁻³. Molarity changes slightly with temperature, while molality does not, so molality suits colligative properties. ppm suits trace substances, such as nitrate limits of 50 mg per litre in drinking water. | Molarity ; Mass concentration ; Percentage and ppm ; Molality ; Choosing units

## Colligative properties
LV: Year 1 · Chemical reasoning
S: Colligative properties depend on the number of solute particles, not their identity. This lesson explains these effects and their uses.
O: Define colligative properties
O: Explain vapour pressure lowering, boiling point elevation and freezing point depression
O: Calculate freezing point depression
H: The properties
- **Colligative properties** depend on the **number** of solute particles.
- **Vapour pressure lowering**: solute particles reduce evaporation.
- **Boiling point elevation**: ΔTb = Kb × m.
- **Freezing point depression**: ΔTf = Kf × m.
- **Osmotic pressure** is also colligative.
D: chem-colligative
H: Particles and uses
- m is molality; for water, Kf = 1.86 K kg mol⁻¹.
- Ionic solutes give more particles: NaCl gives two, CaCl₂ three (the **van 't Hoff factor**, i).
- Road salt lowers the freezing point of water on icy roads.
- Antifreeze in car engines lowers freezing point and raises boiling point.
P: Colligative properties were used historically to measure molar masses. Calcium chloride is more effective than sodium chloride as a de-icer because it gives three ions per formula and works at lower temperatures. Real solutions deviate from ideal predictions at high concentrations.
X: Salting a road.
> A solution contains 1.0 mol of NaCl per kg of water.
> NaCl gives two ions, so i = 2.
> ΔTf = i × Kf × m = 2 × 1.86 × 1.0 = 3.72 K.
> The water freezes at about −3.7 °C instead of 0 °C.
K: Colligative properties depend on the number of solute particles: vapour pressure lowering, boiling point elevation, freezing point depression and osmotic pressure; ΔT = i × K × m, so ionic solutes have larger effects, used in de-icing and antifreeze.
!: Thinking the type of solute determines freezing point depression. Only the number of particles matters.
EV: established | Colligative properties depend on the number of dissolved particles (van 't Hoff, 1887).
T: Colligative property | A property depending on number of solute particles
T: Van 't Hoff factor | Number of particles produced per formula unit
T: Freezing point depression | Lowering of freezing point by solute
SUM: Number, not identity.
SUM: ΔT = i K m.
SUM: De-icing and antifreeze.
SRC: van 't Hoff J. H., "Die Rolle des osmotischen Druckes in der Analogie zwischen Lösungen und Gasen", Zeitschrift für Physikalische Chemie 1, 481–508 | primary | 1887
SRC: OpenStax, Chemistry 2e, section 11.4 "Colligative Properties" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/11-4-colligative-properties
Q: What are colligative properties? | Properties depending on the number of solute particles, not their identity.
Q: What is the van 't Hoff factor for CaCl₂? | 3.
M1#chemistry-u05-16-q1@1: Which is a colligative property? | Freezing point depression | Colour of the solution | Smell of the solute | Chemical reactivity | It depends only on how many particles are dissolved.
M2#chemistry-u05-16-q2@2: Why is calcium chloride a more effective de-icer than sodium chloride? | It produces three ions per formula instead of two | It produces fewer ions in solution than NaCl | It is a covalent compound | It does not dissolve in water | More particles lower the freezing point further.
NUM1#chemistry-u05-16-q3@3: Glucose (i = 1) is dissolved at 0.50 mol per kg of water (Kf = 1.86). What is the freezing point depression in K? | 0.93 | 0.01 | K | ΔTf = 1 × 1.86 × 0.50 = 0.93 K.
M3#chemistry-u05-16-q4@3: Why do colligative properties depend only on particle number? | Solute particles dilute the solvent regardless of their identity | Each solute has a unique effect | Only ionic solutes have any effect | Heavy solutes have larger effects | Any particle reduces the solvent's tendency to escape or freeze.
SA2#chemistry-u05-16-q5@1,3: Explain colligative properties and their uses. | Colligative properties depend on the number of solute particles, not their identity. They include vapour pressure lowering, boiling point elevation, freezing point depression and osmotic pressure. ΔTf = i × Kf × m, where m is molality, Kf for water is 1.86 K kg mol⁻¹ and i is the van 't Hoff factor, 2 for NaCl and 3 for CaCl₂. So 1 mol kg⁻¹ NaCl lowers the freezing point by 3.72 K. Road salt de-ices roads and antifreeze protects engines. | Definition ; Four properties ; Equation ; Ionic solutes ; Uses

## Osmosis
LV: Year 1 · Application
S: Osmosis is the movement of solvent through a semipermeable membrane. This lesson explains osmotic pressure and its applications in chemistry.
O: Define osmosis and osmotic pressure
O: Calculate osmotic pressure using the van 't Hoff equation
O: Describe applications including reverse osmosis
H: Osmosis
- **Osmosis**: net movement of solvent through a **semipermeable membrane** from dilute to concentrated solution.
- **Osmotic pressure** (Π) is the pressure needed to stop osmosis.
- **Π = iMRT**, where M is molarity, R the gas constant and T kelvin temperature.
- Osmotic pressure is a colligative property.
D: chem-osmosis
H: Applications
- **Isotonic** intravenous drips match the osmotic pressure of blood.
- **Reverse osmosis**: applying pressure greater than Π forces solvent from concentrated to dilute.
- Reverse osmosis **desalinates seawater**.
- Osmotic pressure measurements give molar masses of large molecules such as proteins.
P: Seawater has an osmotic pressure of about 27 atm, so desalination plants must apply higher pressures. Osmotic pressure is large even for dilute solutions, which makes it sensitive for measuring molar masses of polymers. Red blood cells burst in pure water because water enters by osmosis.
X: Osmotic pressure of seawater.
> Seawater is roughly 0.55 mol dm⁻³ NaCl, so i = 2.
> M = 550 mol m⁻³; T = 298 K.
> Π = 2 × 550 × 8.314 × 298.
> Π ≈ 2.7 × 10⁶ Pa, about 27 atm.
K: Osmosis is net solvent movement through a semipermeable membrane towards the more concentrated solution; osmotic pressure Π = iMRT, and reverse osmosis applies greater pressure to desalinate water, while osmotic pressure also measures molar masses.
!: Thinking solute moves through the membrane in osmosis. Only the solvent passes through.
EV: established | Reverse osmosis is the main technology for seawater desalination (Elimelech and Phillip, 2011).
T: Osmosis | Net movement of solvent through a semipermeable membrane
T: Osmotic pressure | Pressure needed to stop osmosis
T: Reverse osmosis | Forcing solvent through a membrane against its natural flow
SUM: Solvent moves to concentrated side.
SUM: Π = iMRT.
SUM: Desalination.
SRC: Elimelech M. and Phillip W. A., "The future of seawater desalination: energy, technology, and the environment", Science 333(6043), 712–717 | primary | 2011
SRC: OpenStax, Chemistry 2e, section 11.4 "Colligative Properties" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/11-4-colligative-properties
Q: What is osmotic pressure? | The pressure needed to stop osmosis.
Q: What is reverse osmosis used for? | Desalinating seawater.
M1#chemistry-u05-17-q1@1: In osmosis, which direction does solvent move? | From dilute to more concentrated solution | From concentrated to dilute solution | It does not move at all | Only solute moves | Solvent flows to dilute the more concentrated side.
M2#chemistry-u05-17-q2@2: Why do red blood cells burst in pure water? | Water enters by osmosis and swells the cells | Salt leaves the cells and they shrink | Pure water dissolves the cell membrane | Blood cells absorb salt from water | The cell interior is more concentrated, so water flows in.
NUM1#chemistry-u05-17-q3@3: Using Π = MRT for a non-electrolyte, what is Π in kPa for 0.010 mol dm⁻³ (10 mol m⁻³) at 300 K? | 24.9 | 0.2 | kPa | Π = 10 × 8.314 × 300 = 24,942 Pa ≈ 24.9 kPa.
M3#chemistry-u05-17-q4@3: Why must desalination plants apply more than 27 atm? | Pressure must exceed seawater's osmotic pressure to reverse osmosis | Seawater freezes below that pressure | Salt only dissolves above 27 atm | Membranes need pressure to stay intact | Only pressure above Π drives water from salty to fresh.
SA2#chemistry-u05-17-q5@1,3: Explain osmosis, osmotic pressure and reverse osmosis. | Osmosis is the net movement of solvent through a semipermeable membrane from a dilute to a more concentrated solution. Osmotic pressure is the pressure needed to stop it, given by Π = iMRT, and is colligative. Isotonic drips match blood, while cells burst in pure water. Seawater's osmotic pressure is about 27 atm, so reverse osmosis applies greater pressure to force water through membranes, desalinating it. Osmotic pressure also measures the molar masses of proteins and polymers. | Osmosis ; Osmotic pressure ; Equation ; Reverse osmosis ; Applications

## Diffusion
LV: Year 1 · Foundation
S: Diffusion is the spreading of particles from high to low concentration. This lesson explains diffusion in gases and liquids and Graham's law.
O: Define diffusion and explain it using particle motion
O: Explain factors affecting the rate of diffusion
O: Apply Graham's law of effusion
H: Diffusion
- **Diffusion**: net movement of particles from high to low concentration due to random motion.
- It continues until concentrations are **uniform**.
- Faster in gases than liquids and very slow in solids.
- Rate increases with **temperature** and **concentration gradient**.
D: chem-diffusion
H: Graham's law
- **Effusion** is the escape of gas through a tiny hole.
- **Graham's law**: rate of effusion ∝ 1/√M.
- Lighter gases effuse and diffuse faster.
- This was used to separate uranium isotopes as UF₆.
P: In the classic experiment, ammonia and hydrogen chloride diffuse from opposite ends of a tube; a white ring of ammonium chloride forms nearer the HCl end because NH₃ (M = 17) moves faster than HCl (M = 36.5). Diffusion in liquids is slower because particles collide far more often.
X: The ammonia and HCl tube.
> Cotton wool soaked in ammonia is placed at one end of a glass tube.
> Cotton wool soaked in hydrochloric acid is placed at the other.
> A white ring of NH₄Cl forms closer to the HCl end.
> Lighter NH₃ molecules travelled further in the same time.
K: Diffusion is net movement from high to low concentration by random motion, faster in gases, at higher temperature and with steeper gradients; Graham's law states effusion rate is inversely proportional to the square root of molar mass.
!: Thinking diffusion stops at equilibrium because particles stop moving. Particles keep moving; there is just no net change.
EV: established | Graham formulated his law of effusion in 1846 (Graham, 1846).
T: Diffusion | Net spreading of particles down a concentration gradient
T: Effusion | Escape of gas through a tiny hole
T: Graham's law | Effusion rate is proportional to 1/√M
SUM: High to low concentration.
SUM: Faster in gases and when hot.
SUM: Lighter is faster.
SRC: Graham T., "On the motion of gases", Philosophical Transactions of the Royal Society 136, 573–631 | primary | 1846
SRC: OpenStax, Chemistry 2e, section 9.4 "Effusion and Diffusion of Gases" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/9-4-effusion-and-diffusion-of-gases
Q: State Graham's law. | Rate of effusion is inversely proportional to the square root of molar mass.
Q: Why is diffusion faster in gases than in liquids? | Gas particles move faster and collide less often.
M1#chemistry-u05-18-q1@1: Where does the white ring form in the NH₃ and HCl tube experiment? | Nearer the HCl end | Nearer the NH₃ end | Exactly in the middle | Outside the tube | NH₃ is lighter, so it travels further before meeting HCl.
M2#chemistry-u05-18-q2@2: How does temperature affect the rate of diffusion? | Higher temperature increases the rate | Higher temperature decreases the rate | Temperature has no effect | Diffusion stops when warm | Faster-moving particles spread out more quickly when warmer.
NUM1#chemistry-u05-18-q3@2: Gas A has molar mass 16 and gas B 64. How many times faster does A effuse than B? | 2 | 0 | times | Rate ratio = √(64 ÷ 16) = √4 = 2.
M3#chemistry-u05-18-q4@3: Why does diffusion continue at the molecular level after concentrations are uniform? | Particles keep moving randomly, with no net change | Particles stop moving at equilibrium | Diffusion reverses at equilibrium | New particles are created | Equal movement in all directions gives no overall change.
SA2#chemistry-u05-18-q5@1,3: Explain diffusion and Graham's law. | Diffusion is the net movement of particles from high to low concentration caused by random motion, continuing until concentrations are uniform, though particles keep moving. It is fastest in gases, slower in liquids and very slow in solids, and increases with temperature and concentration gradient. Graham's law states that effusion rate is inversely proportional to √M, so lighter gases move faster: NH₃ meets HCl nearer the HCl end of a tube. It was used to separate uranium isotopes. | Definition ; States ; Factors ; Graham's law ; Example

## Surface tension
LV: Year 1 · Application
S: Surface tension makes liquid surfaces behave like a stretched skin. This lesson explains its cause and effects.
O: Explain surface tension using intermolecular forces
O: Describe effects such as droplets and capillary action
O: Explain how surfactants reduce surface tension
H: Cause
- Molecules inside a liquid are pulled equally in all directions.
- Molecules at the surface are pulled **inwards** and sideways only.
- This creates **surface tension**, minimising surface area.
- Stronger intermolecular forces give higher surface tension; water's is high due to hydrogen bonding.
D: chem-surface-tension
H: Effects and surfactants
- Droplets form **spheres**, the shape with smallest surface area.
- Some insects, such as pond skaters, walk on water.
- **Capillary action**: liquids rise in narrow tubes when adhesion to the walls exceeds cohesion.
- **Surfactants**, such as detergents, gather at the surface and lower surface tension.
P: Mercury forms a convex meniscus because its cohesive forces exceed adhesion to glass, while water forms a concave meniscus. Lung surfactant reduces surface tension in alveoli, preventing collapse. Detergents help water wet and remove greasy dirt.
X: Water versus mercury in a tube.
> Water in a glass tube curves upwards at the edges.
> Water molecules are attracted to the glass more than to each other.
> Mercury curves downwards at the edges.
> Mercury atoms attract each other more strongly than the glass.
K: Surface tension arises because surface molecules are pulled inwards, minimising surface area; it is high in water due to hydrogen bonding, causes spherical drops and capillary action and is lowered by surfactants.
!: Thinking pond skaters float because they are less dense than water. They are supported by surface tension.
EV: established | Pulmonary surfactant lowers surface tension and prevents alveolar collapse (Avery and Mead, 1959).
T: Surface tension | Energy needed to increase a liquid's surface area
T: Capillary action | Rise of liquid in a narrow tube
T: Surfactant | A substance that lowers surface tension
SUM: Inward pull at the surface.
SUM: Drops, insects, capillaries.
SUM: Surfactants lower it.
SRC: Avery M. E. and Mead J., "Surface properties in relation to atelectasis and hyaline membrane disease", American Journal of Diseases of Children 97(5), 517–523 | primary | 1959
SRC: OpenStax, Chemistry 2e, section 10.2 "Properties of Liquids" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/10-2-properties-of-liquids
Q: What causes surface tension? | Surface molecules being pulled inwards by neighbours.
Q: What is a surfactant? | A substance that lowers surface tension.
M1#chemistry-u05-19-q1@1: Why are small drops of liquid spherical? | A sphere has the smallest surface area for its volume | Gravity pulls drops into spheres | Spheres have the largest surface area | Air pressure squashes them into spheres | Surface tension minimises surface area, and a sphere has the least.
M2#chemistry-u05-19-q2@2: Why does water rise in a narrow glass tube? | Adhesion to glass exceeds cohesion between water molecules | Cohesion exceeds adhesion | Glass repels water molecules | Air pressure pushes water downward | Water climbs as it is attracted to the walls.
MATCH1#chemistry-u05-19-q3@2: Match each effect to its cause. | Pond skater = Surface tension ; Concave meniscus = Strong adhesion ; Convex meniscus = Strong cohesion ; Detergent = Lowers surface tension | Surface effects have causes.
M3#chemistry-u05-19-q4@3: Why does water have a high surface tension compared with most liquids? | Hydrogen bonds pull surface molecules strongly inwards | Water has very weak intermolecular forces | Water is a non-polar liquid | Water molecules are very large | Strong attractions resist expanding the surface.
SA2#chemistry-u05-19-q5@1,3: Explain surface tension and its effects. | Molecules inside a liquid are pulled equally in all directions, but surface molecules are pulled inwards, creating surface tension that minimises surface area. Water's surface tension is high due to hydrogen bonding, so drops are spherical and pond skaters are supported. Capillary action occurs when adhesion to the walls exceeds cohesion, giving water a concave meniscus, while mercury's strong cohesion gives a convex one. Surfactants, such as detergents and lung surfactant, lower surface tension. | Cause ; Water ; Drops and insects ; Capillary action ; Surfactants

## Viscosity
LV: Year 1 · Application
S: Viscosity is a liquid's resistance to flow. This lesson explains what affects viscosity and why it matters.
O: Define viscosity
O: Explain how intermolecular forces, molecular size and temperature affect viscosity
O: Describe applications and non-Newtonian fluids
H: Viscosity
- **Viscosity** is resistance to flow.
- Stronger intermolecular forces give higher viscosity.
- Longer molecules can **tangle**, increasing viscosity.
- Viscosity **decreases** as temperature rises.
H: Examples and uses
- Glycerol (three –OH groups) is much more viscous than ethanol.
- Long-chain hydrocarbons, such as lubricating oils, are more viscous than petrol.
- Motor oils are graded by viscosity at different temperatures.
- **Non-Newtonian fluids**, such as cornflour and water, change viscosity under stress.
P: Honey flows more easily when warmed because molecules have more energy to overcome attractions. Fractional distillation of crude oil separates fractions with different viscosities. Blood viscosity matters in medicine, as thick blood increases clot risk.
X: Comparing alcohols.
> Ethanol has one –OH group per molecule.
> Glycerol has three –OH groups.
> Glycerol forms many more hydrogen bonds per molecule.
> Glycerol is about 1,000 times more viscous than ethanol.
K: Viscosity is resistance to flow, increasing with stronger intermolecular forces and longer, tangled molecules and decreasing with temperature; it matters for oils, fuels and blood, and non-Newtonian fluids change viscosity under stress.
!: Thinking viscous liquids are always denser. Viscosity and density are different properties.
EV: established | Viscosity of liquids generally decreases with temperature (Atkins and de Paula, 2018).
T: Viscosity | Resistance of a fluid to flow
T: Non-Newtonian fluid | A fluid whose viscosity changes with stress
T: Lubricant | A substance reducing friction between surfaces
SUM: Resistance to flow.
SUM: Forces, size, temperature.
SUM: Uses and non-Newtonian fluids.
SRC: Atkins P. and de Paula J., Atkins' Physical Chemistry, 11th edition, Oxford University Press | secondary | 2018
SRC: OpenStax, Chemistry 2e, section 10.2 "Properties of Liquids" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/10-2-properties-of-liquids
Q: What is viscosity? | A fluid's resistance to flow.
Q: How does temperature affect viscosity? | Viscosity decreases as temperature rises.
M1#chemistry-u05-20-q1@1: Which liquid is most viscous? | Glycerol | Ethanol | Water | Propanone | Three –OH groups give glycerol extensive hydrogen bonding.
M2#chemistry-u05-20-q2@2: Why are long-chain hydrocarbons more viscous than short ones? | Their molecules tangle and have stronger London forces | Their molecules are smaller and lighter | They form hydrogen bonds with each other | They are ionic compounds | Longer chains interact and entangle more.
MATCH1#chemistry-u05-20-q3@2: Match each substance to its viscosity. | Glycerol = High ; Petrol = Low ; Honey = High when cold ; Cornflour mix = Changes under stress | Viscosity varies widely.
M3#chemistry-u05-20-q4@3: Why does warming honey make it flow more easily? | Molecules gain energy to overcome attractions | Warming adds water to the honey | Honey molecules shrink when warm | Warming increases intermolecular forces | Higher energy lets molecules slide past each other.
SA2#chemistry-u05-20-q5@1,3: Explain viscosity and the factors affecting it. | Viscosity is a liquid's resistance to flow. It increases with stronger intermolecular forces, so glycerol with three –OH groups is far more viscous than ethanol, and with longer molecules that tangle, so lubricating oils are more viscous than petrol. Viscosity decreases with temperature as molecules gain energy, so warm honey flows easily. Motor oils are graded by viscosity, blood viscosity matters medically and non-Newtonian fluids change viscosity under stress. | Definition ; Intermolecular forces ; Molecular size ; Temperature ; Applications

## Intermolecular interactions
LV: Year 1 · Chemical reasoning
S: This lesson compares all the interactions between particles and uses them to predict and explain physical properties.
O: Rank intermolecular interactions by strength
O: Predict relative boiling points and solubilities from structure
O: Explain anomalies using combined interactions
H: The range of interactions
- **Ion-ion** (ionic bonding): strongest, in lattices.
- **Ion-dipole**: between ions and polar molecules, important in dissolving.
- **Hydrogen bonding**: strong dipole interaction involving N, O or F.
- **Dipole-dipole** and **London forces**: weaker; London forces grow with size.
H: Predicting properties
- Compare molecules of similar size first, then consider size.
- Identify the strongest interaction each substance can form.
- Solubility requires solute-solvent interactions comparable to those broken.
- Several interactions act together in real molecules.
P: Butan-1-ol (M = 74) boils at 118 °C, ethoxyethane (M = 74) at 35 °C, because only the alcohol forms hydrogen bonds. Large non-polar molecules, such as long alkanes, can boil higher than small hydrogen-bonded ones, because London forces scale with size. Predictions must weigh all interactions.
X: Ranking boiling points.
> Compare pentane (M = 72), butanal (M = 72) and butan-1-ol (M = 74).
> Pentane has only London forces: boils at 36 °C.
> Butanal adds dipole-dipole forces: boils at 75 °C.
> Butan-1-ol adds hydrogen bonding: boils at 118 °C.
K: Interactions range from ion-ion through ion-dipole and hydrogen bonding to dipole-dipole and London forces; comparing molecules of similar size and identifying the strongest interaction predicts boiling points and solubility, while size can outweigh polarity.
!: Assuming hydrogen-bonded substances always boil higher than non-polar ones. Very large non-polar molecules can boil higher.
EV: established | Boiling point trends of similar-mass compounds reflect their intermolecular interactions (Clayden et al., 2012).
T: Ion-dipole interaction | Attraction between an ion and a polar molecule
T: Isomer | A compound with the same formula but different structure
T: Volatility | Tendency to evaporate
SUM: Range of interactions.
SUM: Compare similar sizes.
SUM: Weigh all interactions.
SRC: Clayden J., Greeves N. and Warren S., Organic Chemistry, 2nd edition, Oxford University Press | secondary | 2012
SRC: Israelachvili J. N., Intermolecular and Surface Forces, 3rd edition, Academic Press | secondary | 2011
Q: Which is the strongest type of interaction listed? | Ion-ion attraction.
Q: Why does butan-1-ol boil much higher than ethoxyethane? | Only butan-1-ol forms hydrogen bonds.
M1#chemistry-u05-21-q1@1: Which interaction helps ionic solids dissolve in water? | Ion-dipole interaction | London dispersion force | Covalent bonding | Metallic bonding | Water dipoles attract and surround the ions.
M2#chemistry-u05-21-q2@2: Why does butanal boil higher than pentane of similar mass? | Butanal has dipole-dipole forces as well as London forces | Pentane forms hydrogen bonds | Butanal is much heavier | Pentane is an ionic compound | The polar C=O adds dipole-dipole attraction.
SEQ1#chemistry-u05-21-q3@2: Order these by increasing boiling point. | Pentane ; Butanal ; Butan-1-ol ; Glycerol | Stronger interactions give higher boiling points.
M3#chemistry-u05-21-q4@3: Why can octadecane (C₁₈H₃₈) boil higher than water? | Its huge size gives very strong London forces | It forms more hydrogen bonds than water | It is an ionic compound | It is lighter than water | Large non-polar molecules have strong total London forces.
SA2#chemistry-u05-21-q5@1,3: Compare intermolecular interactions and use them to predict properties. | Interactions range from strong ion-ion attractions through ion-dipole, which dissolves ionic solids, hydrogen bonding, dipole-dipole and London forces, which grow with size. To predict boiling points, compare molecules of similar size and identify the strongest interaction: pentane boils at 36 °C, butanal at 75 °C and butan-1-ol at 118 °C. Size can outweigh polarity, so large alkanes boil above water. Solubility needs solute-solvent interactions comparable to those broken. | Range ; Similar size ; Examples ; Size effects ; Solubility

## Materials properties
LV: Year 1 · Application
S: The properties of materials come from their structure and bonding. This lesson links particle-level structure to useful properties.
O: Relate bonding and structure to mechanical properties
O: Relate structure to thermal and electrical properties
O: Explain how materials are chosen for applications
H: Mechanical properties
- **Strength**, **hardness**, **toughness** and **brittleness** depend on bonding.
- Metals are **ductile** due to non-directional bonding and dislocations.
- Ceramics are **hard and brittle** due to ionic and covalent networks.
- Polymers can be **flexible** or **rigid** depending on chain arrangement.
H: Thermal and electrical properties
- Metals conduct heat and electricity through delocalised electrons.
- Ceramics and polymers are usually **insulators**.
- Strong bonding gives high melting points and heat resistance.
- **Composites** combine materials, such as carbon fibre in resin.
P: Materials are chosen by matching properties to needs: copper for wires, silica glass for windows, Kevlar for body armour and alumina ceramics for heat shields. Nanomaterials such as graphene have unusual strength and conductivity due to their structure.
X: Choosing a material for a saucepan.
> The base must conduct heat well and be strong: stainless steel or copper.
> The handle must insulate: a thermosetting polymer.
> The coating may be non-stick PTFE.
> Each part's material matches its required properties.
K: Material properties follow from bonding and structure: metals are ductile and conductive, ceramics hard, brittle and insulating, polymers flexible or rigid, and composites combine strengths; materials are chosen by matching properties to needs.
!: Thinking strong materials are always tough. Ceramics are strong and hard but brittle.
EV: established | Material properties are determined by bonding and microstructure (Callister and Rethwisch, 2018).
T: Ductile | Able to be drawn into wires
T: Brittle | Breaking without bending
T: Composite | A material combining two or more components
SUM: Bonding sets properties.
SUM: Metals, ceramics, polymers.
SUM: Choose by need.
SRC: Callister W. D. and Rethwisch D. G., Materials Science and Engineering: An Introduction, 10th edition, Wiley | secondary | 2018
SRC: Royal Society of Chemistry, Materials science | guidance | 2024 | https://edu.rsc.org/
Q: What is a composite? | A material combining two or more components.
Q: Why are ceramics brittle? | Their rigid ionic and covalent networks cannot deform without breaking.
M1#chemistry-u05-22-q1@1: Which material is best for electrical wiring? | Copper | Glass | Polythene | Alumina ceramic | Copper conducts electricity well and is ductile.
M2#chemistry-u05-22-q2@2: Why are saucepan handles made of thermosetting polymers? | They insulate and do not soften when heated | They conduct heat very well | They are ductile metals | They melt easily on heating | Cross-linked polymers resist heat and insulate.
MATCH1#chemistry-u05-22-q3@2: Match each material to its use. | Copper = Wires ; Kevlar = Body armour ; Alumina = Heat shields ; PTFE = Non-stick coating | Materials are matched to uses.
M3#chemistry-u05-22-q4@3: Why are carbon fibre composites used in aircraft? | They combine high strength with low weight | They conduct heat better than metals | They are cheap and heavy | They melt at low temperatures | Strong fibres in light resin give an excellent strength-to-weight ratio.
SA2#chemistry-u05-22-q5@1,3: Explain how material properties depend on structure and bonding. | Metals are strong, ductile and conductive because of non-directional metallic bonding, dislocations and delocalised electrons. Ceramics are hard, brittle and insulating because of rigid ionic and covalent networks, and polymers can be flexible or rigid depending on chain arrangement. Strong bonding gives heat resistance. Composites, such as carbon fibre in resin, combine high strength with low weight. Materials are chosen by matching properties to needs, such as copper wires, thermosetting handles and alumina heat shields. | Metals ; Ceramics ; Polymers ; Composites ; Selection
`;
