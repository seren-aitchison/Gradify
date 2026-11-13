// EngineerGradify Fluid Mechanics (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## Fluid properties
LV: Year 1 · Foundation
S: A fluid deforms continuously under shear. This lesson defines density, specific gravity, viscosity and other properties, and explains Newton's law of viscosity.
O: Define density, specific weight and specific gravity
O: Apply Newton's law of viscosity
O: Distinguish dynamic and kinematic viscosity and Newtonian and non-Newtonian fluids
PRE: Convection and radiation
H: Basic properties
- **Density** ρ: mass per unit volume; water about 1000 kg/m^{3}, air about 1.2 kg/m^{3} at room conditions.
- **Specific weight** γ = ρg: weight per unit volume; water about 9.81 kN/m^{3}.
- **Specific gravity** (relative density): density relative to water at 4 °C; mercury is 13.6.
- **Bulk modulus** K: resistance to compression; liquids are often treated as incompressible.
- **Surface tension**: the force per unit length at a liquid surface, causing capillary rise in narrow tubes.
H: Viscosity
P: A fluid's resistance to shearing is its **viscosity**. For a **Newtonian fluid**, shear stress is proportional to the velocity gradient: τ = μ du/dy, where μ is the **dynamic viscosity** (Pa s). Water at 20 °C has μ of about 1.0 × 10^{-3} Pa s. **Kinematic viscosity** ν = μ ÷ ρ (m^{2}/s), about 1.0 × 10^{-6} m^{2}/s for water. Liquid viscosity falls as temperature rises; gas viscosity rises. **Non-Newtonian** fluids, such as paint, blood and toothpaste, have viscosity that varies with shear rate.
E: τ = μ du/dy :: Newton's law of viscosity
E: ν = μ ÷ ρ :: kinematic viscosity
X: Shear in an oil film.
> A plate slides at 2 m/s over a 2 mm film of oil with μ = 0.1 Pa s.
> Assuming a linear velocity profile, du/dy = 2 ÷ 0.002 = 1000 s^{-1}.
> Shear stress τ = 0.1 × 1000 = 100 Pa.
> On a plate of 0.5 m^{2}, the drag force is 100 × 0.5 = 50 N.
K: Fluids are characterised by density, specific weight, specific gravity, compressibility and surface tension; viscosity links shear stress to velocity gradient through τ = μ du/dy, with kinematic viscosity ν = μ ÷ ρ.
!: Confusing dynamic and kinematic viscosity. Check the units: Pa s for μ, m^{2}/s for ν.
EV: established | Water and air behave as Newtonian fluids under most engineering conditions.
T: Dynamic viscosity | The constant relating shear stress to velocity gradient
T: Kinematic viscosity | Dynamic viscosity divided by density
T: Newtonian fluid | A fluid whose viscosity does not depend on shear rate
SUM: Density, specific weight and specific gravity.
SUM: τ = μ du/dy.
SUM: ν = μ ÷ ρ.
SRC: Douglas J. F., Gasiorek J. M., Swaffield J. A. and Jack L. B., Fluid Mechanics, 6th edition, Pearson | secondary | 2011
SRC: Massey B. S. and Ward-Smith J., Mechanics of Fluids, 9th edition, Spon Press | secondary | 2011
Q: What happens to the viscosity of a liquid as it warms? | It decreases.
Q: What defines a fluid? | A substance that deforms continuously under shear stress, however small.
M1#engineering-u07-01-q1@1: What is the specific gravity of mercury? | About 13.6 | About 1.0 | About 0.85 | About 136 | Applying the standard result: Mercury is 13.6 times denser than water.
M2#engineering-u07-01-q2@2: Which fluid is non-Newtonian? | Toothpaste | Water | Air | Petrol | Applying the standard result: Its viscosity depends on shear rate.
NUM2#engineering-u07-01-q3@2: An oil has a density of 850 kg/m^{3}. What is its specific gravity? | 0.85 | 0.01 | – | SG = 850 ÷ 1000 = 0.85.
M3#engineering-u07-01-q4@3: The gap in an oil film halves while the plate speed is unchanged. What happens to the shear stress? | It doubles | It halves | It stays the same | It quadruples | Applying the standard result: du/dy doubles, so τ doubles.
SA2#engineering-u07-01-q5@2,3: Explain the difference between dynamic and kinematic viscosity and when each is used. | Dynamic viscosity μ relates shear stress to velocity gradient and is used to calculate shear forces, as in lubrication. Kinematic viscosity ν = μ ÷ ρ compares viscous to inertial effects per unit density and appears naturally in the Reynolds number and in flow analysis where density matters. | Definition of μ ; Shear force use ; Definition of ν ; Reynolds number use

## Pressure and manometry
LV: Year 1 · Foundation
S: Pressure in a fluid at rest increases with depth. This lesson derives the hydrostatic equation, distinguishes absolute and gauge pressure, and shows how manometers measure pressure differences.
O: Apply p = ρgh in static fluids
O: Convert between absolute and gauge pressure
O: Analyse simple and differential manometers
PRE: Fluid properties
H: Hydrostatic pressure
P: In a fluid at rest, pressure acts equally in all directions and increases with depth: **p = p_{0} + ρgh**, where p_{0} is the pressure at the surface. Pressure depends only on depth, not on the shape of the container. Water pressure rises by about 9.81 kPa for every metre of depth.
H: Absolute and gauge pressure
- **Absolute pressure** is measured from a perfect vacuum.
- **Gauge pressure** is measured relative to atmospheric pressure: absolute = gauge + atmospheric.
- Atmospheric pressure at sea level is about 101.3 kPa.
- Pressure head h = p ÷ ρg expresses pressure as an equivalent height of fluid.
H: Manometers
- **Piezometer**: a vertical tube showing the pressure head directly; suitable for small pressures in liquids.
- **U-tube manometer**: contains a denser fluid, such as mercury; equate pressures at the same level in the same fluid.
- **Differential manometer**: measures the pressure difference between two points; with manometer fluid density ρ_{m} and flowing fluid ρ, p_{A} − p_{B} = (ρ_{m} − ρ) g h.
- **Bourdon gauges** and electronic transducers are used in practice.
E: p = ρgh :: pressure due to a column of fluid
E: p_{A} − p_{B} = (ρ_{m} − ρ) g h :: differential manometer
X: A mercury differential manometer.
> A mercury manometer (ρ_{m} = 13,600 kg/m^{3}) connects two points in a water pipe, showing a level difference of 0.2 m.
> (ρ_{m} − ρ) = 13,600 − 1000 = 12,600 kg/m^{3}.
> p_{A} − p_{B} = 12,600 × 9.81 × 0.2, about 24,700 Pa.
> The pressure difference is about 24.7 kPa.
K: Static pressure increases with depth by ρgh, gauge pressure is measured from atmospheric, and manometers measure pressures and differences by balancing columns of fluid at a common level.
!: Mixing absolute and gauge pressure in one calculation. Decide which you are using and convert consistently.
EV: established | Hydrostatic pressure depends only on depth and fluid density.
T: Gauge pressure | Pressure measured relative to atmospheric pressure
T: Pressure head | Pressure expressed as an equivalent height of fluid
T: Manometer | A device measuring pressure using columns of liquid
SUM: p = ρgh.
SUM: Absolute = gauge + atmospheric.
SUM: Manometers balance fluid columns.
SRC: Douglas J. F., Gasiorek J. M., Swaffield J. A. and Jack L. B., Fluid Mechanics, 6th edition, Pearson | secondary | 2011
SRC: Çengel Y. A. and Cimbala J. M., Fluid Mechanics: Fundamentals and Applications, 4th edition, McGraw-Hill | secondary | 2018
Q: Why does a dam become thicker towards its base? | Water pressure increases with depth.
Q: What is the pressure head of 98.1 kPa of water? | About 10 m.
M1#engineering-u07-02-q1@1: What does hydrostatic pressure depend on? | Depth and fluid density | Container shape | Total volume of fluid | Surface area of the container | Since p = ρgh, only depth and density matter, not shape.
M2#engineering-u07-02-q2@2: A gauge reads 150 kPa where atmospheric pressure is 101 kPa. What is the absolute pressure? | 251 kPa | 49 kPa | 150 kPa | 101 kPa | Applying the standard result: Absolute = gauge + atmospheric.
NUM2#engineering-u07-02-q3@2: What is the gauge pressure at a depth of 5 m in water, in kPa? | 49.05 | 0.1 | kPa | p = 1000 × 9.81 × 5 = 49,050 Pa, which is 49.05 kPa.
M3#engineering-u07-02-q4@3: Why is mercury used in manometers for large pressure differences? | Its high density gives a manageable column height | It is cheaper than water | It does not need calibration | It has very low density | Applying the standard result: Dense fluids give shorter columns.
SA2#engineering-u07-02-q5@2,3: Explain how a U-tube manometer is used to find a pressure. | Starting from one end, the pressure is traced through the fluids, adding ρgh going down and subtracting going up. Pressures at the same horizontal level within the same continuous fluid are equal, which gives an equation linking the unknown pressure to atmospheric pressure and the measured column heights. | Trace through fluids ; Add and subtract ρgh ; Equal levels ; Solve for unknown

## Hydrostatic forces on surfaces
LV: Year 1 · Intermediate
S: Dams, tanks and gates must resist the force of the fluid they hold. This lesson calculates the resultant force on submerged plane surfaces and finds the centre of pressure.
O: Calculate the resultant hydrostatic force on a plane surface
O: Find the centre of pressure
O: Apply results to gates and walls
PRE: Pressure and manometry
H: Resultant force
P: Pressure on a submerged surface increases with depth, so the force is spread unevenly. The **resultant force** on a plane surface equals the pressure at its centroid times its area: **F = ρ g h_{c} A**, where h_{c} is the vertical depth of the centroid. The force acts perpendicular to the surface.
H: Centre of pressure
- The resultant acts at the **centre of pressure**, which is below the centroid because pressure increases with depth.
- Measured along the plane from the free surface: y_{p} = y_{c} + I_{xc} ÷ (y_{c} A), where I_{xc} is the second moment of area about the centroid.
- For a rectangle of height d, I_{xc} = b d^{3} ÷ 12.
- For a vertical rectangle with its top at the surface, the centre of pressure is at two-thirds of the depth.
H: Curved surfaces
- The horizontal component equals the force on the vertical projection of the surface.
- The vertical component equals the weight of fluid above the surface (real or imaginary).
E: F = ρ g h_{c} A :: resultant force on a plane surface
E: y_{p} = y_{c} + I_{xc} ÷ (y_{c} A) :: centre of pressure
X: A vertical sluice gate.
> A gate 2 m wide and 3 m high has its top at the water surface.
> The centroid depth is 1.5 m and the area is 6 m^{2}, so F = 1000 × 9.81 × 1.5 × 6, which is 88,290 N, about 88.3 kN.
> I_{xc} = 2 × 3^{3} ÷ 12 = 4.5 m^{4}.
> y_{p} = 1.5 + 4.5 ÷ (1.5 × 6) = 1.5 + 0.5 = 2.0 m below the surface, two-thirds of the depth.
K: The resultant hydrostatic force on a plane surface is ρgh_{c}A, acting perpendicular to the surface at the centre of pressure, which lies below the centroid; curved surfaces are handled by horizontal and vertical components.
!: Placing the resultant force at the centroid. It acts lower, at the centre of pressure.
EV: established | Hydrostatic force calculations are fundamental to the design of dams, gates and tanks.
T: Centroid | The geometric centre of an area
T: Centre of pressure | The point where the resultant hydrostatic force acts
T: Second moment of area | A geometric property measuring how area is distributed about an axis
SUM: F = ρgh_{c}A.
SUM: Centre of pressure is below the centroid.
SUM: Curved surfaces use components.
SRC: Massey B. S. and Ward-Smith J., Mechanics of Fluids, 9th edition, Spon Press | secondary | 2011
SRC: White F. M., Fluid Mechanics, 8th edition, McGraw-Hill | secondary | 2016
Q: Why is the centre of pressure below the centroid? | Pressure increases with depth, so more force acts on the lower part.
Q: What gives the vertical force on a curved submerged surface? | The weight of fluid above it.
M1#engineering-u07-03-q1@1: Where is the pressure taken when calculating the resultant force on a plane surface? | At the centroid of the surface | At the top edge | At the bottom edge | At the free surface | Applying the standard result: F = pressure at centroid × area.
M2#engineering-u07-03-q2@2: For a vertical rectangle with its top at the surface, where is the centre of pressure? | Two-thirds of the depth down | Half of the depth down | One-third of the depth down | At the bottom edge | Applying the standard result: It is at 2d ÷ 3.
NUM2#engineering-u07-03-q3@2: A vertical gate 1 m wide and 2 m high has its top at the water surface. What is the resultant force, in kN? | 19.62 | 0.1 | kN | h_{c} = 1 m and A = 2 m^{2}, so F = 1000 × 9.81 × 1 × 2 = 19,620 N, which is 19.62 kN.
M3#engineering-u07-03-q4@3: The water level behind a vertical gate doubles in depth, with the gate fully submerged from the surface. How does the force change? | It increases about fourfold | It doubles | It stays the same | It halves | Applying the standard result: Both h_{c} and A double.
SA2#engineering-u07-03-q5@2,3: Explain why the centre of pressure on a submerged vertical wall is below its centroid. | Pressure increases linearly with depth, so the lower parts of the wall carry greater pressure than the upper parts. The resultant of this triangular distribution acts nearer the bottom than the geometric centre, and the formula y_{p} = y_{c} + I_{xc} ÷ (y_{c} A) shows the offset, which decreases as the surface is submerged more deeply. | Linear pressure increase ; Uneven distribution ; Resultant lower ; Formula and depth effect

## Buoyancy and stability
LV: Year 1 · Intermediate
S: Ships, buoys and submarines rely on buoyancy and must remain stable. This lesson applies Archimedes' principle and explains the stability of floating bodies using the metacentre.
O: Apply Archimedes' principle
O: Determine whether an object floats and how deeply
O: Assess stability using metacentric height
PRE: Hydrostatic forces on surfaces
H: Archimedes' principle
P: A body immersed in a fluid experiences an upward **buoyant force** equal to the weight of the fluid it displaces: **F_{B} = ρ_{fluid} g V_{displaced}**. The buoyant force acts through the **centre of buoyancy**, the centroid of the displaced volume. A floating body displaces its own weight of fluid, so the fraction submerged equals the ratio of body density to fluid density.
H: Stability
- A **submerged** body is stable if its centre of gravity G is below the centre of buoyancy B.
- A **floating** body can be stable even with G above B, because B moves sideways as it tilts.
- The **metacentre** M is the point where the line of buoyancy force crosses the body's centreline after a small tilt.
- **Metacentric height** GM = BM − BG, with BM = I ÷ V, where I is the second moment of area of the waterplane and V the displaced volume.
- If GM is positive, the body is stable; if negative, it capsizes.
E: F_{B} = ρ g V :: buoyant force
E: GM = I ÷ V − BG :: metacentric height
X: A floating timber block.
> A block of timber with density 600 kg/m^{3} and volume 0.5 m^{3} floats in fresh water.
> The submerged fraction is 600 ÷ 1000 = 0.6.
> The submerged volume is 0.6 × 0.5 = 0.3 m^{3}, displacing 300 kg of water.
> Wide, flat shapes have a large waterplane second moment, giving a large BM and good stability.
K: Buoyant force equals the weight of fluid displaced; floating bodies sink until they displace their own weight, and stability depends on a positive metacentric height, GM = BM − BG.
!: Assuming a floating body is unstable whenever G is above B. Floating bodies can be stable if the metacentre lies above G.
EV: established | Ship stability regulations require a positive metacentric height with safety margins.
T: Buoyant force | The upward force equal to the weight of displaced fluid
T: Centre of buoyancy | The centroid of the displaced volume
T: Metacentric height | The distance from the centre of gravity to the metacentre
SUM: F_{B} equals the weight displaced.
SUM: Floating bodies displace their own weight.
SUM: Positive GM means stable.
SRC: Massey B. S. and Ward-Smith J., Mechanics of Fluids, 9th edition, Spon Press | secondary | 2011
SRC: Çengel Y. A. and Cimbala J. M., Fluid Mechanics: Fundamentals and Applications, 4th edition, McGraw-Hill | secondary | 2018
Q: Why does a steel ship float? | Its hull displaces a volume of water whose weight equals the ship's weight.
Q: What makes a floating body unstable? | A negative metacentric height, with G above the metacentre.
M1#engineering-u07-04-q1@1: What does Archimedes' principle state? | The buoyant force equals the weight of fluid displaced | The buoyant force equals the body's volume | Pressure is equal in all directions | Floating bodies have no weight | Displaced fluid weight equals buoyant force.
M2#engineering-u07-04-q2@2: A body of density 800 kg/m^{3} floats in water. What fraction is submerged? | 0.8 | 0.2 | 1.25 | 0.5 | Applying the standard result: Fraction = body density ÷ fluid density.
NUM2#engineering-u07-04-q3@2: A 0.02 m^{3} object is fully submerged in water. What is the buoyant force, in N? | 196.2 | 1 | N | F_{B} = 1000 × 9.81 × 0.02 = 196.2 N.
M3#engineering-u07-04-q4@3: Loading heavy cargo high on a ship's deck raises G. What happens to stability? | GM falls, reducing stability | GM rises, improving stability | Buoyancy force doubles | Nothing changes at all | Applying the standard result: Raising G reduces GM.
SA2#engineering-u07-04-q5@2,3: Explain why a floating body can be stable even when its centre of gravity is above its centre of buoyancy. | When a floating body tilts, the shape of the displaced volume changes, so the centre of buoyancy moves towards the lower side. The buoyant force then acts through the metacentre. If the metacentre lies above the centre of gravity, the buoyant force and weight form a restoring couple that returns the body upright. | Tilting shifts B ; Metacentre ; Restoring couple ; Positive GM

## Conservation of mass and continuity
LV: Year 1 · Foundation
S: Mass is neither created nor destroyed in a flow. This lesson applies the continuity equation to pipes, ducts and branching networks.
O: Relate mass flow rate, volume flow rate and velocity
O: Apply the continuity equation to changing cross-sections
O: Apply continuity at pipe junctions
PRE: Buoyancy and stability
H: Flow rates
P: The **volume flow rate** Q is the volume passing a section per second: **Q = A V**, where A is the area and V the mean velocity. The **mass flow rate** is ṁ = ρQ = ρAV. For steady flow of an incompressible fluid, such as water, the volume flow rate is the same at every section of a pipe without branches.
H: Continuity
- For incompressible steady flow: **A_{1} V_{1} = A_{2} V_{2}**.
- Halving the diameter of a pipe quarters its area, so velocity rises four times.
- At a junction, the total flow in equals the total flow out: Q_{1} = Q_{2} + Q_{3}.
- For compressible flow, the mass flow rate ρAV is conserved instead.
E: Q = A V :: volume flow rate
E: A_{1} V_{1} = A_{2} V_{2} :: continuity, incompressible flow
X: A reducing pipe.
> Water flows at 0.02 m^{3}/s through a 100 mm diameter pipe.
> Area = π × 0.05^{2}, about 0.00785 m^{2}, so V_{1} is about 2.55 m/s.
> The pipe reduces to 50 mm diameter, with a quarter of the area.
> V_{2} is four times V_{1}, about 10.2 m/s.
K: Volume flow rate is area times mean velocity; for steady incompressible flow, AV is constant along a pipe and flows balance at junctions, so narrowing a pipe raises the velocity.
!: Scaling velocity with diameter rather than area. Velocity changes with the square of the diameter ratio.
EV: established | Continuity is a direct consequence of the conservation of mass.
T: Volume flow rate | Volume of fluid passing a section per unit time
T: Mass flow rate | Mass of fluid passing a section per unit time
T: Continuity equation | A statement of mass conservation in flow
SUM: Q = AV.
SUM: A_{1}V_{1} = A_{2}V_{2}.
SUM: Flows balance at junctions.
SRC: Douglas J. F., Gasiorek J. M., Swaffield J. A. and Jack L. B., Fluid Mechanics, 6th edition, Pearson | secondary | 2011
SRC: White F. M., Fluid Mechanics, 8th edition, McGraw-Hill | secondary | 2016
Q: What happens to velocity when the pipe diameter halves? | It increases four times.
Q: What is conserved in compressible flow? | The mass flow rate, ρAV.
M1#engineering-u07-05-q1@1: What is the volume flow rate equal to? | Area times mean velocity | Pressure times area | Density times velocity | Velocity divided by area | Q = AV: flow area multiplied by mean velocity.
M2#engineering-u07-05-q2@2: A pipe of 0.04 m^{2} carries water at 2 m/s into a junction; one branch carries 0.05 m^{3}/s. What does the other carry? | 0.03 m^{3}/s | 0.08 m^{3}/s | 0.05 m^{3}/s | 0.13 m^{3}/s | Applying the standard result: Q in is 0.08, so 0.08 − 0.05 = 0.03.
NUM2#engineering-u07-05-q3@2: Water flows at 3 m/s through a pipe of area 0.01 m^{2}. What is the volume flow rate, in m^{3}/s? | 0.03 | 0.001 | m^{3}/s | Q = 0.01 × 3 = 0.03 m^{3}/s.
M3#engineering-u07-05-q4@3: A hose nozzle reduces the outlet area to one-fifth. How does the exit velocity change? | It increases five times | It increases twenty-five times | It falls to one-fifth | It stays the same | Applying the standard result: A_{1}V_{1} = A_{2}V_{2}.
SA2#engineering-u07-05-q5@2,3: Explain why a garden hose sprays further when the end is partly covered. | Partly covering the outlet reduces the flow area. With roughly the same volume flow rate from the tap, continuity requires a higher exit velocity, V = Q ÷ A. The faster jet carries further before falling, though in practice the reduced area also raises resistance and can reduce the flow somewhat. | Reduced area ; Continuity ; Higher velocity ; Practical limits

## The Bernoulli equation
LV: Year 1 · Intermediate
S: The Bernoulli equation relates pressure, velocity and height along a streamline. This lesson states it, sets out its assumptions, and applies it to tanks, pipes and nozzles.
O: State the Bernoulli equation and its assumptions
O: Apply it to find velocities and pressures
O: Explain Torricelli's result for flow from a tank
PRE: Conservation of mass and continuity
H: The equation
P: For steady, incompressible, frictionless flow along a streamline, the total energy per unit weight is constant: **p ÷ ρg + V^{2} ÷ 2g + z = constant**. The three terms are the **pressure head**, **velocity head** and **elevation head**, together the total head H. When fluid speeds up, its pressure falls, unless height changes compensate.
H: Assumptions
- **Steady** flow.
- **Incompressible** fluid (gases at low speeds, below about 0.3 of the speed of sound, are acceptable).
- **Inviscid**: no friction losses; real flows need loss terms added.
- **Along a streamline**, with no pumps or turbines between the points.
H: Applications
- **Torricelli's result**: for a large open tank draining through a small orifice a height h below the surface, V = √(2gh).
- **Pipe contractions**: pressure falls where velocity rises, the principle of the Venturi meter.
- **Siphons**: the pressure at the top of a siphon can fall low enough to cause vapour bubbles, limiting its height.
E: p ÷ ρg + V^{2} ÷ 2g + z = H :: Bernoulli equation
E: V = √(2gh) :: Torricelli's result
X: Pressure in a contracting pipe.
> Water flows horizontally from a section where V_{1} = 2 m/s and p_{1} = 200 kPa to one where V_{2} = 6 m/s.
> Bernoulli gives p_{2} = p_{1} − ½ρ (V_{2}^{2} − V_{1}^{2}).
> ½ × 1000 × (36 − 4) = 16,000 Pa.
> p_{2} = 200,000 − 16,000 = 184,000 Pa, or 184 kPa.
K: The Bernoulli equation states that pressure, velocity and elevation heads sum to a constant along a streamline in steady, incompressible, frictionless flow; it explains Torricelli's result and the pressure drop where flow speeds up.
!: Applying Bernoulli across a pump or through long pipes without losses. Add pump head and friction losses to the energy equation.
EV: established | The Bernoulli equation accurately predicts many flows where friction is small.
T: Total head | The sum of pressure, velocity and elevation heads
T: Velocity head | V^{2} ÷ 2g, kinetic energy per unit weight
T: Streamline | A line tangent to the velocity everywhere in the flow
SUM: Three heads sum to a constant.
SUM: Faster flow means lower pressure.
SUM: Torricelli: V = √(2gh).
SRC: Bernoulli D., Hydrodynamica, Johann Reinhold Dulsecker | primary | 1738
SRC: Çengel Y. A. and Cimbala J. M., Fluid Mechanics: Fundamentals and Applications, 4th edition, McGraw-Hill | secondary | 2018
Q: What happens to pressure where a horizontal pipe narrows? | It falls, because velocity rises.
Q: What is the velocity head? | V^{2} ÷ 2g, the kinetic energy per unit weight of fluid.
M1#engineering-u07-06-q1@1: Which assumption is part of the Bernoulli equation? | Frictionless flow | Turbulent flow | Compressible gas at high speed | Flow through a pump | Applying the standard result: Bernoulli neglects losses.
M2#engineering-u07-06-q2@2: In a horizontal pipe, velocity increases between two points. What happens to pressure? | It decreases | It increases | It stays the same | It becomes zero | Applying the standard result: Energy is conserved between heads.
NUM2#engineering-u07-06-q3@2: Water drains from a large open tank through a small hole 1.25 m below the surface. What is the jet velocity, in m/s? | 4.95 | 0.05 | m/s | V = √(2 × 9.81 × 1.25) = √24.525, about 4.95 m/s.
M3#engineering-u07-06-q4@3: Why is the height of a siphon limited? | Low pressure at the top can cause the liquid to vaporise | Velocity becomes zero at the top | The tank empties too slowly | Bernoulli does not apply to siphons | Applying the standard result: Pressure falls with height and velocity.
SA2#engineering-u07-06-q5@2,3: Explain the assumptions of the Bernoulli equation and the consequences of violating them. | It assumes steady, incompressible, inviscid flow along a streamline with no work done. In real pipes friction causes head losses, so the total head falls along the flow; pumps and turbines add or remove head; high-speed gases are compressible; and unsteady flows need extra terms. Violating these makes the simple equation inaccurate unless corrections are added. | Assumptions listed ; Friction losses ; Machines ; Compressibility and unsteadiness

## The momentum equation and jet forces
LV: Year 1 · Intermediate
S: Changing the momentum of a flowing fluid requires a force. This lesson applies the momentum equation to jets striking plates and to forces on pipe bends.
O: State the steady-flow momentum equation
O: Calculate the force of a jet on a plate
O: Find the forces on a pipe bend
PRE: The Bernoulli equation
H: The momentum equation
P: Newton's second law applied to a control volume gives: **ΣF = ρQ (V_{out} − V_{in})**, applied separately in each direction. The forces include pressure forces at the inlet and outlet, the force from the solid boundary and, where significant, weight. Velocities are vectors, so direction matters.
H: Jets on plates
- A jet striking a **flat plate normal** to it is turned through 90°; the force on the plate is F = ρQV = ρAV^{2}.
- A jet turned through 180° by a curved vane can exert up to twice this force, the principle of the **Pelton wheel**.
- If the plate moves away at speed u, the relative velocity (V − u) is used.
H: Pipe bends and nozzles
- A bend changes the direction of flow, so the pipe must exert a force on the fluid, and the fluid an equal and opposite force on the pipe.
- Large bends need **thrust blocks** to resist these forces.
- Nozzles on fire hoses produce a reaction that the firefighter must hold.
E: ΣF = ρQ (V_{2} − V_{1}) :: steady-flow momentum equation
E: F = ρAV^{2} :: jet striking a flat plate normally
X: Force of a water jet.
> A water jet of 50 mm diameter strikes a fixed flat plate normally at 20 m/s.
> Area = π × 0.025^{2}, about 0.00196 m^{2}, so Q is about 0.0393 m^{3}/s.
> F = ρQV = 1000 × 0.0393 × 20, about 785 N.
> If the jet were turned back through 180° by a curved vane, the force would approach 1570 N.
K: The momentum equation equates the net force on a control volume to the rate of change of momentum flow, giving jet forces such as ρAV^{2} on a flat plate and the forces that pipe bends and nozzles must resist.
!: Forgetting that velocity is a vector. A change of direction at constant speed still changes momentum.
EV: established | The momentum equation underpins the design of turbines, thrust blocks and jet propulsion.
T: Momentum flux | The rate at which momentum is carried by a flow, ρQV
T: Control volume | A fixed region in space through which fluid flows
T: Thrust block | A concrete block resisting forces at pipe bends
SUM: Force equals rate of change of momentum flow.
SUM: Flat plate: F = ρAV^{2}.
SUM: Bends and nozzles need restraint.
SRC: Douglas J. F., Gasiorek J. M., Swaffield J. A. and Jack L. B., Fluid Mechanics, 6th edition, Pearson | secondary | 2011
SRC: White F. M., Fluid Mechanics, 8th edition, McGraw-Hill | secondary | 2016
Q: Why does a pipe bend need a thrust block? | The change in flow direction produces a force on the pipe that must be resisted.
Q: Why can a Pelton wheel bucket produce nearly twice the force of a flat plate? | It turns the jet back through nearly 180°, doubling the change in momentum.
M1#engineering-u07-07-q1@1: What is the force of a jet striking a flat plate normally? | ρAV^{2} | ½ρV^{2} | ρgh | ρAV | The momentum flux is destroyed normal to the plate.
M2#engineering-u07-07-q2@2: Why does flow round a bend at constant speed need a force? | Its direction, and so its momentum, changes | Its speed must increase | Pressure always falls in bends | Bends remove all friction | Applying the standard result: Velocity is a vector.
NUM2#engineering-u07-07-q3@2: A water jet with Q = 0.01 m^{3}/s and V = 15 m/s strikes a flat plate normally. What is the force, in N? | 150 | 1 | N | F = ρQV = 1000 × 0.01 × 15 = 150 N.
M3#engineering-u07-07-q4@3: A plate moves away from a jet at half the jet speed. How does the force compare with a fixed plate? | It is about a quarter | It is about half | It is the same | It is doubled | Both relative velocity and the mass rate striking it halve.
SA2#engineering-u07-07-q5@2,3: Explain how the momentum equation is applied to find the force on a pipe bend. | A control volume is drawn around the bend. In each direction, the net force on the fluid, from inlet and outlet pressures and the bend wall, equals the mass flow rate times the change in velocity component. Solving gives the force the bend exerts on the fluid; the fluid exerts an equal and opposite force on the bend, which supports or thrust blocks must resist. | Control volume ; Component equations ; Pressure and wall forces ; Reaction on bend

## Flow measurement
LV: Year 1 · Intermediate
S: Engineers need to measure flow in pipes, channels and air streams. This lesson covers Venturi meters, orifice plates and Pitot tubes, based on the Bernoulli equation, and introduces modern electronic meters.
O: Explain how differential pressure flow meters work
O: Calculate velocity from a Pitot tube reading
O: Compare common flow measurement devices
PRE: The momentum equation and jet forces
H: Differential pressure meters
P: A **Venturi meter** has a smooth contraction to a throat and a gradual expansion. Applying continuity and Bernoulli between the inlet and throat gives the ideal flow rate from the measured pressure difference; a **discharge coefficient** C_{d}, typically about 0.98 for a Venturi, corrects for losses. An **orifice plate**, a sharp-edged hole in a plate, is cheaper and simpler but causes a larger permanent pressure loss, with C_{d} around 0.6. Standards such as ISO 5167 specify their geometry and installation.
E: Q = C_{d} A_{2} √(2Δp ÷ (ρ (1 − (A_{2} ÷ A_{1})^{2}))) :: Venturi or orifice meter
H: Pitot tubes
- A **Pitot tube** faces into the flow and measures the **stagnation pressure**, where the fluid is brought to rest.
- A **Pitot-static tube** also measures static pressure, giving the dynamic pressure ½ρV^{2}.
- Velocity is V = √(2Δp ÷ ρ).
- Pitot tubes measure aircraft airspeed and air velocity in ducts.
H: Other meters
- **Electromagnetic** meters for conducting liquids, with no obstruction.
- **Ultrasonic** meters, clamped on the outside of a pipe.
- **Turbine** and **rotameter** (variable-area) meters.
- **Weirs** and flumes for open channels.
X: Air speed from a Pitot-static tube.
> A Pitot-static tube in a duct reads a dynamic pressure of 450 Pa.
> Air density is 1.2 kg/m^{3}.
> V = √(2 × 450 ÷ 1.2) = √750.
> The air speed is about 27.4 m/s.
K: Venturi meters and orifice plates measure flow from the pressure difference across a contraction, corrected by a discharge coefficient; Pitot tubes measure local velocity from dynamic pressure; electromagnetic and ultrasonic meters avoid obstruction.
!: Ignoring the discharge coefficient. Real meters lose energy, so the ideal Bernoulli flow must be corrected.
EV: established | Orifice plates cause greater permanent pressure loss than Venturi meters.
T: Discharge coefficient | The ratio of actual to ideal flow through a meter
T: Stagnation pressure | The pressure where flow is brought to rest
T: Dynamic pressure | ½ρV^{2}, the kinetic energy per unit volume
SUM: Venturi and orifice meters use Δp.
SUM: Pitot tubes measure local velocity.
SUM: Electronic meters avoid obstruction.
SRC: International Organization for Standardization, ISO 5167-1: Measurement of fluid flow by means of pressure differential devices inserted in circular cross-section conduits running full | standard | 2022
SRC: Massey B. S. and Ward-Smith J., Mechanics of Fluids, 9th edition, Spon Press | secondary | 2011
Q: Why does a Venturi meter cause less permanent loss than an orifice plate? | Its gradual expansion recovers most of the pressure.
Q: What does a Pitot tube measure? | The stagnation pressure, from which velocity is found.
M1#engineering-u07-08-q1@1: Which device measures the airspeed of an aircraft? | A Pitot-static tube | An orifice plate | A weir | A rotameter | Applying the standard result: Pitot tubes measure dynamic pressure.
M2#engineering-u07-08-q2@2: What is the typical discharge coefficient of a sharp-edged orifice plate? | About 0.6 | About 0.98 | About 1.5 | About 0.1 | Applying the standard result: Orifice plates lose more energy.
NUM2#engineering-u07-08-q3@2: A Pitot-static tube in water (ρ = 1000 kg/m^{3}) reads a dynamic pressure of 2000 Pa. What is the velocity, in m/s? | 2 | 0.05 | m/s | V = √(2 × 2000 ÷ 1000) = √4 = 2 m/s.
M3#engineering-u07-08-q4@3: A water utility wants to measure flow with no obstruction or pressure loss. Which meter fits best? | An electromagnetic flow meter | A sharp-edged orifice plate | A Venturi meter | A Pitot tube | Applying the standard result: It has no moving parts or restriction.
SA2#engineering-u07-08-q5@2,3: Explain how a Venturi meter determines flow rate. | Fluid accelerates through the throat, so by continuity its velocity rises and, by Bernoulli, its pressure falls. Measuring the pressure difference between the inlet and the throat, and knowing the areas, allows the ideal velocity and flow rate to be calculated. A discharge coefficient corrects for small friction losses, and the gradual expansion recovers most of the pressure. | Acceleration at throat ; Pressure drop ; Calculating flow ; Discharge coefficient

## Viscous flow and the Reynolds number
LV: Year 1 · Intermediate
S: Flow can be smooth and layered or chaotic and mixing. This lesson introduces laminar and turbulent flow, the Reynolds number that predicts them, and the velocity profiles in pipes.
O: Distinguish laminar, transitional and turbulent flow
O: Calculate the Reynolds number
O: Describe the velocity profiles of laminar and turbulent pipe flow
PRE: Flow measurement
H: Reynolds' experiment
P: In 1883 Osborne Reynolds injected dye into water flowing through a glass tube. At low speeds the dye formed a straight thread (**laminar flow**); at higher speeds it mixed rapidly across the pipe (**turbulent flow**). He showed the change depends on the dimensionless **Reynolds number**, Re = ρVD ÷ μ = VD ÷ ν, the ratio of inertial to viscous forces.
H: Flow regimes in pipes
- **Laminar**: Re below about 2300; smooth layers, parabolic velocity profile, maximum velocity twice the mean.
- **Transitional**: roughly 2300 to 4000; intermittent.
- **Turbulent**: Re above about 4000; random eddies, flatter velocity profile, much greater mixing and friction.
- Most engineering pipe flows of water and air are turbulent.
H: Why it matters
- Friction and pressure loss depend strongly on the regime.
- Heat and mass transfer increase greatly in turbulent flow.
- Laminar flow occurs in viscous oils, blood in small vessels, and microfluidic devices.
E: Re = ρVD ÷ μ = VD ÷ ν :: Reynolds number for pipe flow
X: Water in a pipe.
> Water (ν = 1.0 × 10^{-6} m^{2}/s) flows at 1 m/s in a 50 mm pipe.
> Re = 1 × 0.05 ÷ (1.0 × 10^{-6}) = 50,000.
> The flow is turbulent.
> For the flow to be laminar, the velocity would need to fall below about 0.046 m/s.
K: The Reynolds number, the ratio of inertial to viscous forces, predicts whether pipe flow is laminar (below about 2300), transitional or turbulent (above about 4000), which controls velocity profile, friction and mixing.
!: Forgetting units in the Reynolds number. It must be dimensionless; use consistent SI units.
EV: established | The critical Reynolds number for pipe flow is around 2000–2300, though laminar flow can persist higher in very smooth, undisturbed conditions.
T: Reynolds number | The dimensionless ratio of inertial to viscous forces
T: Laminar flow | Smooth flow in parallel layers
T: Turbulent flow | Chaotic flow with eddies and strong mixing
SUM: Re = VD ÷ ν.
SUM: Laminar below about 2300; turbulent above about 4000.
SUM: Regime controls friction and mixing.
SRC: Reynolds O., "An experimental investigation of the circumstances which determine whether the motion of water shall be direct or sinuous", Philosophical Transactions of the Royal Society of London 174, 935–982 | primary | 1883
SRC: White F. M., Fluid Mechanics, 8th edition, McGraw-Hill | secondary | 2016
Q: What does the Reynolds number represent? | The ratio of inertial to viscous forces.
Q: What is the shape of the velocity profile in laminar pipe flow? | Parabolic, with maximum velocity twice the mean.
M1#engineering-u07-09-q1@1: Below roughly what Reynolds number is pipe flow laminar? | 2300 | 23 | 23,000 | 230,000 | Applying the standard result: Laminar flow occurs at low Re.
M2#engineering-u07-09-q2@2: Which change makes pipe flow more likely to be turbulent? | Increasing velocity | Increasing viscosity | Reducing pipe diameter | Cooling a gas | Applying the standard result: Higher velocity raises Re.
NUM2#engineering-u07-09-q3@2: Oil with ν = 1.0 × 10^{-4} m^{2}/s flows at 0.5 m/s in a 0.1 m pipe. What is the Reynolds number? | 500 | 5 | – | Re = 0.5 × 0.1 ÷ (1.0 × 10^{-4}) = 500, so the flow is laminar.
M3#engineering-u07-09-q4@3: Why is heat transfer higher in turbulent flow? | Eddies mix fluid across the pipe | The fluid is always hotter | Viscosity is zero in turbulence | The velocity profile is parabolic | Mixing carries heat to and from the wall.
SA2#engineering-u07-09-q5@2,3: Describe Reynolds' dye experiment and what it showed. | Reynolds injected dye into water flowing through a glass pipe. At low velocities the dye stayed as a straight line, showing laminar flow, but above a certain velocity it broke up and mixed across the pipe, showing turbulence. He found the transition depended on the combination ρVD ÷ μ, now the Reynolds number, rather than velocity alone. | Dye experiment ; Laminar thread ; Turbulent mixing ; Reynolds number

## Pipe flow and friction losses
LV: Year 1 · Advanced
S: Friction in pipes causes a loss of head that pumps must overcome. This lesson applies the Darcy–Weisbach equation, laminar friction factors, and the Moody chart for turbulent flow.
O: Apply the Darcy–Weisbach equation
O: Find friction factors for laminar and turbulent flow
O: Explain the effect of pipe roughness
PRE: Viscous flow and the Reynolds number
H: Darcy–Weisbach equation
P: The head lost to friction in a straight pipe is **h_{f} = f (L ÷ D) (V^{2} ÷ 2g)**, where f is the dimensionless **Darcy friction factor**, L the length and D the diameter. Head loss rises with length and with the square of velocity, and falls with larger diameters. The corresponding pressure drop is Δp = ρ g h_{f}.
E: h_{f} = f (L ÷ D) (V^{2} ÷ 2g) :: Darcy–Weisbach equation
H: Friction factor
- **Laminar flow**: f = 64 ÷ Re, independent of roughness.
- **Turbulent flow**: f depends on Re and the **relative roughness** ε ÷ D.
- The **Colebrook equation** relates them; the **Moody chart** plots it, and explicit approximations such as the Haaland equation are widely used.
- At very high Re in rough pipes, f becomes constant ("fully rough").
- Typical turbulent values for water pipes are around 0.015–0.03.
H: Effects of roughness and diameter
- Older pipes become rougher through corrosion and scale, increasing friction.
- Because velocity falls with the square of diameter for a given flow, a modestly larger pipe greatly reduces head loss.
X: Head loss in a water main.
> Water flows at 2 m/s through 100 m of 0.1 m diameter pipe with f = 0.02.
> V^{2} ÷ 2g = 4 ÷ 19.62, about 0.204 m.
> L ÷ D = 100 ÷ 0.1 = 1000.
> h_{f} = 0.02 × 1000 × 0.204, about 4.08 m of head, or about 40 kPa.
K: Friction head loss in pipes follows the Darcy–Weisbach equation; the friction factor is 64 ÷ Re for laminar flow and depends on Reynolds number and relative roughness for turbulent flow, as shown on the Moody chart.
!: Using the laminar formula f = 64 ÷ Re for turbulent flow. Check the Reynolds number first.
EV: established | The Darcy–Weisbach equation with the Colebrook friction factor is the standard method for pipe flow design.
T: Friction factor | A dimensionless coefficient in the Darcy–Weisbach equation
T: Relative roughness | Pipe wall roughness divided by diameter
T: Moody chart | A chart of friction factor against Reynolds number and relative roughness
SUM: h_{f} = f (L ÷ D) (V^{2} ÷ 2g).
SUM: Laminar: f = 64 ÷ Re.
SUM: Turbulent: use Moody or Colebrook.
SRC: Moody L. F., "Friction factors for pipe flow", Transactions of the ASME 66(8), 671–684 | primary | 1944
SRC: Colebrook C. F., "Turbulent flow in pipes, with particular reference to the transition region between the smooth and rough pipe laws", Journal of the Institution of Civil Engineers 11(4), 133–156 | primary | 1939
Q: How does head loss change if velocity doubles in turbulent flow? | It roughly quadruples, as it depends on V^{2}.
Q: What is the friction factor for laminar flow? | f = 64 ÷ Re.
M1#engineering-u07-10-q1@1: Which equation gives friction head loss in a pipe? | Darcy–Weisbach | Bernoulli | Torricelli | Archimedes | Applying the standard result: Darcy–Weisbach includes friction.
M2#engineering-u07-10-q2@2: In turbulent flow, the friction factor depends on: | Reynolds number and relative roughness | Only the pipe length | Only the fluid's density | Neither Re nor roughness | Applying the standard result: The Moody chart shows both.
NUM2#engineering-u07-10-q3@2: Laminar flow in a pipe has a Reynolds number of 1600. What is the Darcy friction factor? | 0.04 | 0.001 | – | f = 64 ÷ Re = 64 ÷ 1600 = 0.04.
M3#engineering-u07-10-q4@3: Corrosion makes an old pipe's wall much rougher. What happens to head loss at the same flow? | It increases | It decreases | It stays the same | It becomes zero | Applying the standard result: Higher roughness raises f.
SA2#engineering-u07-10-q5@2,3: Explain why increasing pipe diameter is an effective way to reduce friction losses. | For a given flow, velocity is inversely proportional to the square of the diameter. Head loss depends on V^{2} and on L ÷ D, so increasing the diameter reduces both the velocity head and the L ÷ D ratio, cutting losses sharply, though larger pipes cost more to buy and install. | Velocity and diameter ; V-squared dependence ; L over D ; Cost trade-off

## Minor losses and pipe systems
LV: Year 1 · Advanced
S: Bends, valves, entrances and exits add further losses to a pipe system. This lesson calculates minor losses and combines them with friction to analyse pipe systems.
O: Calculate minor losses using loss coefficients
O: Apply the energy equation to a pipe system
O: Analyse pipes in series and parallel
PRE: Pipe flow and friction losses
H: Minor losses
P: Fittings disturb the flow and cause losses expressed as **h_{m} = K V^{2} ÷ 2g**, where K is a **loss coefficient**. Typical values include about 0.5 for a sharp-edged entrance, 1.0 for an exit into a large tank (all kinetic energy is lost), 0.3–0.9 for a 90° elbow, and around 0.2 for a fully open gate valve, rising steeply as it closes. In long pipelines minor losses may be small, but in short systems with many fittings they can dominate.
E: h_{m} = K V^{2} ÷ 2g :: minor loss
H: The energy equation for a system
- Between two points: p_{1} ÷ ρg + V_{1}^{2} ÷ 2g + z_{1} + h_{pump} = p_{2} ÷ ρg + V_{2}^{2} ÷ 2g + z_{2} + h_{f} + Σh_{m}.
- Between two open reservoirs, pressures are atmospheric and velocities small, so the head difference equals the total losses.
H: Series and parallel pipes
- **Series**: the same flow passes through each pipe; head losses add.
- **Parallel**: the head loss is the same across each branch; flows add.
- Pipe networks, such as water mains, are solved iteratively, for example by the Hardy Cross method or software.
X: Losses in a short system.
> Water flows at 2 m/s through a short system with an entrance (K = 0.5), two elbows (K = 0.75 each) and an exit (K = 1.0).
> ΣK = 0.5 + 1.5 + 1.0 = 3.0.
> V^{2} ÷ 2g is about 0.204 m.
> The minor loss is about 3.0 × 0.204, or 0.61 m of head, added to the friction loss.
K: Minor losses from fittings are K V^{2} ÷ 2g; adding them to friction losses in the energy equation gives the head a system requires, with losses adding in series and flows adding in parallel.
!: Ignoring minor losses in short pipe systems. They can exceed friction losses when there are many fittings.
EV: established | Loss coefficients for fittings are determined experimentally and vary with design.
T: Loss coefficient | A dimensionless factor K for head loss at a fitting
T: Minor loss | A head loss caused by a fitting rather than straight pipe
T: Pipes in parallel | Branches sharing the same head loss with flows that add
SUM: h_{m} = K V^{2} ÷ 2g.
SUM: Add all losses in the energy equation.
SUM: Series: losses add; parallel: flows add.
SRC: Douglas J. F., Gasiorek J. M., Swaffield J. A. and Jack L. B., Fluid Mechanics, 6th edition, Pearson | secondary | 2011
SRC: Idelchik I. E., Handbook of Hydraulic Resistance, 4th edition, Begell House | secondary | 2007
Q: Why is the exit loss coefficient 1.0 for a pipe discharging into a large tank? | All the kinetic energy of the flow is dissipated in the tank.
Q: In pipes in parallel, what is the same for each branch? | The head loss.
M1#engineering-u07-11-q1@1: What is the typical loss coefficient for a pipe exit into a large tank? | 1.0 | 0.1 | 5.0 | 0 | Applying the standard result: All the velocity head is lost.
M2#engineering-u07-11-q2@2: For pipes in series, how are head losses combined? | They add | They are averaged | Only the largest counts | They are multiplied together | Applying the standard result: The same flow passes through each.
NUM2#engineering-u07-11-q3@2: Water leaves a pipe at 3 m/s into a large tank (K = 1.0). What is the exit loss, in m of head? | 0.459 | 0.005 | m | h_{m} = 1.0 × 9 ÷ 19.62, about 0.459 m.
M3#engineering-u07-11-q4@3: A valve is partly closed in a pipe system with a fixed pump head. What happens? | Its loss coefficient rises and flow falls | Flow increases through the system | The pump head increases | Friction losses vanish | Applying the standard result: Closing a valve adds resistance.
SA2#engineering-u07-11-q5@2,3: Explain how to determine the head a pump must supply to move water between two reservoirs. | Apply the energy equation between the reservoir surfaces, where pressures are atmospheric and velocities negligible. The pump head equals the difference in surface elevation plus the friction losses, from Darcy–Weisbach, and the sum of minor losses from entrances, bends, valves and the exit, all calculated at the design flow rate. | Energy equation ; Static lift ; Friction losses ; Minor losses

## Pumps and system curves
LV: Year 1 · Advanced
S: Pumps supply the energy to move fluid through systems. This lesson explains centrifugal pump characteristics, system curves, the operating point, power, efficiency and cavitation.
O: Interpret pump characteristic curves
O: Find the operating point from pump and system curves
O: Calculate pump power and explain cavitation and NPSH
PRE: Minor losses and pipe systems
H: Pump and system curves
P: A **centrifugal pump** adds head by spinning fluid with an impeller. Its **characteristic curve** shows head falling as flow rate increases, along with efficiency and power curves. A pipe system's **system curve** shows the head required at each flow: H = H_{static} + kQ^{2}, combining the static lift with losses that rise with the square of flow. The **operating point** is where the curves cross. Ideally it lies near the pump's **best efficiency point**.
H: Power and efficiency
- **Hydraulic power** delivered to the fluid: P_{h} = ρ g Q H.
- **Shaft power** required: P = ρ g Q H ÷ η, where η is the pump efficiency.
- Pumps in **series** add head at the same flow; pumps in **parallel** add flow at the same head.
- Changing speed shifts the pump curve; the **affinity laws** state that flow scales with speed, head with speed squared and power with speed cubed.
H: Cavitation
- If pressure at the pump inlet falls below the vapour pressure, vapour bubbles form and collapse violently, causing noise, vibration, loss of performance and erosion damage: **cavitation**.
- The **net positive suction head available** (NPSH_{A}) must exceed the pump's **required** value (NPSH_{R}).
- Risk rises with high suction lift, hot liquids and long, narrow suction pipes.
E: P = ρ g Q H ÷ η :: pump shaft power
X: Power for a pump.
> A pump delivers 0.05 m^{3}/s of water against a head of 20 m, at 75% efficiency.
> Hydraulic power: 1000 × 9.81 × 0.05 × 20 = 9810 W.
> Shaft power: 9810 ÷ 0.75 = 13,080 W, about 13.1 kW.
> If the pump speed were raised by 10%, power would rise by a factor of about 1.1^{3}, or 33%.
K: A pump's operating point is where its falling head–flow curve meets the rising system curve; shaft power is ρgQH ÷ η, the affinity laws relate speed to flow, head and power, and NPSH available must exceed NPSH required to avoid cavitation.
!: Choosing a pump that operates far from its best efficiency point. It wastes energy and may wear quickly.
EV: established | Pumping systems account for a substantial share of industrial electricity use, so efficiency matters.
T: Operating point | The intersection of pump and system curves
T: Cavitation | Formation and collapse of vapour bubbles in low-pressure regions
T: NPSH | Net positive suction head, the margin above vapour pressure at the pump inlet
SUM: Operating point where curves cross.
SUM: P = ρgQH ÷ η.
SUM: NPSH_{A} must exceed NPSH_{R}.
SRC: Karassik I. J., Messina J. P., Cooper P. and Heald C. C. (eds), Pump Handbook, 4th edition, McGraw-Hill | secondary | 2008
SRC: Çengel Y. A. and Cimbala J. M., Fluid Mechanics: Fundamentals and Applications, 4th edition, McGraw-Hill | secondary | 2018
Q: What determines a pump's operating point? | The intersection of the pump characteristic curve with the system curve.
Q: How does pump power change with speed according to the affinity laws? | It is proportional to speed cubed.
M1#engineering-u07-12-q1@1: What causes cavitation in pumps? | Inlet pressure falling below vapour pressure | Very high outlet pressure | Low fluid temperature | Too large a suction pipe | Applying the standard result: Vapour bubbles form at low pressure.
M2#engineering-u07-12-q2@2: Two identical pumps run in parallel. What mainly increases? | Flow at a given head | Head at a given flow | Fluid density | Vapour pressure | Applying the standard result: Parallel pumps add flow.
NUM2#engineering-u07-12-q3@2: A pump delivers 0.02 m^{3}/s of water against 15 m of head. What is the hydraulic power, in W? | 2943 | 10 | W | P_{h} = 1000 × 9.81 × 0.02 × 15 = 2943 W.
M3#engineering-u07-12-q4@3: A pump starts cavitating after the water temperature rises. Why? | Higher vapour pressure reduces NPSH available | Hot water is denser than cold | Viscosity increases with temperature | The pump speed falls | Applying the standard result: Warmer water vaporises more readily.
SA2#engineering-u07-12-q5@2,3: Explain how pump and system curves are used to select a pump. | The system curve is calculated from the static head plus friction and minor losses, which rise with the square of flow. Plotting candidate pump curves on the same axes shows where each would operate. A suitable pump meets the required flow and head at an operating point near its best efficiency point, with enough NPSH margin to avoid cavitation. | System curve ; Pump curves ; Operating point ; Efficiency and NPSH

## Boundary layers, drag and lift
LV: Year 1 · Advanced
S: Bodies moving through fluids experience drag and, if shaped suitably, lift. This lesson explains boundary layers and separation, and calculates drag and lift forces.
O: Describe laminar and turbulent boundary layers and separation
O: Calculate drag and lift using coefficients
O: Explain how streamlining reduces drag
PRE: Pumps and system curves
H: Boundary layers
P: In 1904 Ludwig Prandtl showed that viscous effects in a flow past a body are confined to a thin **boundary layer** near the surface, where velocity rises from zero at the wall to the free-stream value. The layer starts laminar and becomes turbulent further along. If the pressure rises along the surface, as at the back of a cylinder or a steeply angled wing, the slow fluid near the wall can be pushed back and the flow **separates**, forming a wide turbulent **wake**.
H: Drag and lift
- **Drag** F_{D} = ½ρV^{2} C_{D} A, where C_{D} is the drag coefficient and A a reference area.
- **Skin friction drag** comes from shear stress in the boundary layer; **pressure (form) drag** comes from the low pressure in the wake.
- **Lift** F_{L} = ½ρV^{2} C_{L} A acts perpendicular to the flow; aerofoils generate lift by deflecting flow and creating a pressure difference.
- At too high an angle of attack, flow separates over the wing and it **stalls**, losing lift.
H: Streamlining
- Streamlined shapes delay separation, shrinking the wake and form drag.
- A sphere's drag drops sharply when its boundary layer becomes turbulent, which delays separation; dimples on golf balls exploit this.
- Typical C_{D}: flat plate normal to flow about 2.0, sphere about 0.47, modern car about 0.25–0.35.
E: F_{D} = ½ρV^{2} C_{D} A :: drag force
X: Aerodynamic drag on a car.
> A car with C_{D} = 0.3 and frontal area 2.2 m^{2} travels at 30 m/s in air of density 1.2 kg/m^{3}.
> Dynamic pressure: ½ × 1.2 × 30^{2} = 540 Pa.
> Drag: 540 × 0.3 × 2.2, about 356 N.
> The power to overcome it is about 356 × 30, or 10.7 kW; since drag rises with V^{2}, power rises with V^{3}.
K: Viscous effects are confined to a boundary layer that may separate under adverse pressure gradients, creating a wake; drag and lift are ½ρV^{2}CA, and streamlining delays separation to reduce form drag.
!: Thinking drag rises in proportion to speed. Drag rises with the square of speed, and power with the cube.
EV: established | Prandtl's boundary layer concept underpins modern aerodynamics.
T: Boundary layer | A thin region near a surface where viscous effects are significant
T: Flow separation | Detachment of the boundary layer from a surface
T: Drag coefficient | A dimensionless measure of a body's drag
SUM: Viscous effects stay near the surface.
SUM: Drag and lift are ½ρV^{2}CA.
SUM: Streamlining delays separation.
SRC: Prandtl L., "Über Flüssigkeitsbewegung bei sehr kleiner Reibung", Verhandlungen des III. Internationalen Mathematiker-Kongresses, Heidelberg, 484–491 | primary | 1904
SRC: Anderson J. D., Fundamentals of Aerodynamics, 6th edition, McGraw-Hill | secondary | 2017
Q: What causes form drag? | Low pressure in the wake behind a body after flow separation.
Q: Why do golf balls have dimples? | They make the boundary layer turbulent, delaying separation and reducing drag.
M1#engineering-u07-13-q1@1: Who introduced the boundary layer concept? | Ludwig Prandtl | Osborne Reynolds | Daniel Bernoulli | Isaac Newton | Applying the standard result: Prandtl presented it in 1904.
M2#engineering-u07-13-q2@2: What happens when an aircraft wing stalls? | Flow separates and lift is lost | Lift increases sharply | Drag falls to zero | The boundary layer disappears | Applying the standard result: High angles cause separation.
NUM2#engineering-u07-13-q3@2: An object with C_{D} = 1.0 and area 0.5 m^{2} moves at 10 m/s through air of density 1.2 kg/m^{3}. What is the drag force, in N? | 30 | 0.5 | N | F_{D} = 0.5 × 1.2 × 100 × 1.0 × 0.5 = 30 N.
M3#engineering-u07-13-q4@3: A cyclist doubles speed. By roughly what factor does the power needed to overcome drag rise? | 8 | 2 | 4 | 16 | Applying the standard result: Power rises with V^{3}.
SA2#engineering-u07-13-q5@2,3: Explain how streamlining reduces drag on a vehicle. | Bluff shapes cause the boundary layer to separate early, leaving a large low-pressure wake that produces form drag. Streamlined shapes, with gently tapering rears, keep the pressure rise gradual so the boundary layer stays attached longer, shrinking the wake. Form drag falls substantially, although skin friction may rise slightly because of the larger wetted area. | Bluff bodies and wakes ; Delayed separation ; Reduced form drag ; Skin friction trade-off

## Dimensional analysis and similitude
LV: Year 1 · Advanced
S: Dimensional analysis reduces the number of variables in a problem and allows small-scale models to predict full-scale behaviour. This lesson covers the Buckingham Π theorem, key dimensionless groups and model testing.
O: Apply dimensional homogeneity and the Buckingham Π theorem
O: Identify key dimensionless groups
O: Use Reynolds and Froude similarity to scale model tests
PRE: Boundary layers, drag and lift
H: Dimensional analysis
P: Every valid physical equation is **dimensionally homogeneous**: each term has the same dimensions, in terms of mass, length and time. The **Buckingham Π theorem** states that a problem with n variables involving k basic dimensions can be described by n − k dimensionless groups. For example, the drag on a sphere depends on five variables (force, velocity, diameter, density, viscosity) and three dimensions, so two groups suffice: the drag coefficient and the Reynolds number.
H: Key dimensionless groups
- **Reynolds number** Re = ρVL ÷ μ: inertia to viscous forces.
- **Froude number** Fr = V ÷ √(gL): inertia to gravity, important for ships and open channels.
- **Mach number** Ma = V ÷ c: flow speed to speed of sound, important for compressibility.
- **Drag and lift coefficients**, and the **pressure coefficient**.
H: Model testing
- **Geometric similarity**: model and prototype have the same shape.
- **Dynamic similarity**: the relevant dimensionless groups are equal.
- **Reynolds similarity** is used for fully submerged bodies; with the same fluid, a smaller model needs a higher velocity.
- **Froude similarity** is used for ships and free-surface flows; V_{m} = V_{p} × √(L_{m} ÷ L_{p}).
- Matching both Re and Fr at once is usually impossible, so engineers apply corrections.
X: A ship model.
> A 1:25 scale model of a ship designed to sail at 10 m/s is tested in a towing tank.
> Froude similarity requires V_{m} = V_{p} ÷ √25.
> V_{m} = 10 ÷ 5 = 2 m/s.
> Wave patterns on the model then match those of the full ship, and friction is corrected separately.
K: Dimensional analysis, through the Buckingham Π theorem, reduces problems to dimensionless groups such as Reynolds, Froude and Mach numbers; matching the relevant groups gives dynamic similarity, letting model tests predict full-scale performance.
!: Expecting to match every dimensionless group in one model test. Usually only the most important can be matched.
EV: established | Wind tunnel and towing tank testing rely on dimensional analysis and similarity.
T: Dimensional homogeneity | Each term in an equation having the same dimensions
T: Dynamic similarity | Equality of relevant dimensionless groups between model and prototype
T: Froude number | The ratio of inertial to gravitational forces
SUM: n − k dimensionless groups.
SUM: Re, Fr and Ma are key groups.
SUM: Match groups for similarity.
SRC: Buckingham E., "On physically similar systems: illustrations of the use of dimensional equations", Physical Review 4(4), 345–376 | primary | 1914
SRC: White F. M., Fluid Mechanics, 8th edition, McGraw-Hill | secondary | 2016
Q: What does the Buckingham Π theorem state? | A problem with n variables and k dimensions can be expressed using n − k dimensionless groups.
Q: Which dimensionless group is matched for ship model tests? | The Froude number.
M1#engineering-u07-14-q1@1: Which dimensionless group compares inertial and gravitational forces? | Froude number | Reynolds number | Mach number | Drag coefficient | Applying the standard result: Fr = V ÷ √(gL).
M2#engineering-u07-14-q2@2: A problem has 6 variables and 3 basic dimensions. How many dimensionless groups are needed? | 3 | 6 | 9 | 2 | Applying the standard result: n − k = 6 − 3.
NUM2#engineering-u07-14-q3@2: A 1:16 ship model is tested under Froude similarity for a ship speed of 8 m/s. What model speed is needed, in m/s? | 2 | 0.05 | m/s | V_{m} = 8 ÷ √16 = 8 ÷ 4 = 2 m/s.
M3#engineering-u07-14-q4@3: A 1:10 model of a submarine is tested in water under Reynolds similarity. What velocity is needed relative to the prototype? | Ten times higher | One-tenth | The same | About three times higher | Applying the standard result: Same fluid: VL must be equal.
SA2#engineering-u07-14-q5@2,3: Explain why it is usually impossible to achieve full dynamic similarity in ship model tests. | Wave-making depends on the Froude number, which requires model velocity to scale with the square root of length, while friction depends on the Reynolds number, which requires model velocity to increase as length decreases if the same fluid is used. Both cannot be satisfied at once with water, so tests match Froude number and correct for friction separately. | Froude requirement ; Reynolds requirement ; Conflict ; Correction method
`;
