// Unit 8: Fluid Mechanics. Format: kit/course/notes.js
export default `
## Density and pressure
S: Density is mass per unit volume; pressure is force per unit area acting perpendicular to a surface. In fluids, pressure acts equally in all directions at a point and is the key variable for both still and moving fluids.
LV: Introductory · Foundation
O: Calculate density and pressure, with SI units
O: Explain why pressure in a fluid acts equally in all directions
PRE: SI base and derived units
H: Definitions
E: ρ = m/V :: kg m^{-3}
E: p = F/A :: pascal, 1 Pa = 1 N m^{-2}
- Water 1000 kg m^{-3}; air ~1.2; mercury 13 600; osmium 22 600 (densest element).
- Atmospheric pressure 101 325 Pa ≈ 1 bar; tyre ~2.4 bar gauge.
- **Gauge pressure** = absolute − atmospheric.
H: Molecular origin
P: Gas pressure is the average momentum transferred per second per unit area by molecules hitting a surface: p = ⅓ρ⟨c^{2}⟩. In liquids it comes from molecules pushing against each other under the weight of the liquid above and any external load.
X: A 60 kg person stands on one stiletto heel of area 1 cm^{2}. Find the pressure.
> p = 588/10^{-4} = 5.9 × 10^{6} Pa (about 58 atm)
> An elephant's foot (~0.1 m^{2}, 1 t on it) gives only ~10^{5} Pa
!: Pressure isn't a vector; force on a surface is p times area, directed along the surface normal.
Q: What is gauge pressure? | Pressure measured relative to atmospheric pressure.
Q: Why does pressure act in all directions in a fluid at rest? | A fluid can't sustain shear stress at rest, so the force on any small surface is normal and the same whatever its orientation.
M1: 1 bar is approximately: | 10^{5} Pa | 10^{3} Pa | 1 Pa | 10^{6} Pa | By definition.
M2: A 2 m^{3} block of 5400 kg has density: | 2700 kg m^{-3} | 10 800 kg m^{-3} | 5400 kg m^{-3} | 0.37 kg m^{-3} | Aluminium.
T: Density | ρ = m/V, mass per unit volume, in kg m^{-3}
T: Pressure | p = F/A, the perpendicular force per unit area, in pascals (N m^{-2})
T: Gauge pressure | Pressure above atmospheric pressure
SUM: Water ≈ 1000 kg m^{-3}; air ≈ 1.2 kg m^{-3}; atmospheric pressure ≈ 101 kPa.
SUM: At a point in a fluid at rest, pressure is the same in every direction.
SRC: OpenStax, University Physics Volume 1, section 14.1 "Fluids, Density, and Pressure" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/14-1-fluids-density-and-pressure
SRC: White F. M., Fluid Mechanics, 8th edition, chapter 1, McGraw-Hill | secondary | 2016
EV: established | Standard definitions; densities quoted are at room temperature and 1 atm.
Q: Why does a sharp knife cut better than a blunt one? | The same force on a smaller area gives a much larger pressure.
M3@2,3: A 60 kg person stands on one stiletto heel of area 1.0 cm^{2}. What pressure does it exert (g = 9.8 m s^{-2})? | About 5.9 × 10^{6} Pa | About 590 Pa, using 1 m^{2} | About 5.9 × 10^{4} Pa, using 10 cm^{2} | About 5.9 × 10^{2} kPa, using 10^{-3} m^{2} | p = mg/A = 588/(1.0 × 10^{-4}) ≈ 5.9 × 10^{6} Pa, about 58 atmospheres.
SA2@1: A gold-coloured 200 g bar has a volume of 25 cm^{3}. Is it pure gold (ρ = 19 300 kg m^{-3})? Show your working. | ρ = 0.200 kg/(25 × 10^{-6} m^{3}) = 8000 kg m^{-3}. That is far below 19 300 kg m^{-3}, so it isn't pure gold (it's closer to steel or brass). | convert to SI units ; ρ = m/V ; 8000 kg m^{-3} ; compare with gold's density

## Hydrostatic equilibrium
S: In a fluid at rest, pressure increases with depth because each layer supports the weight of the fluid above it. The same balance between pressure gradient and gravity holds up oceans, atmospheres and stars.
LV: Introductory · Foundation
O: Derive p = p_{0} + ρgh for a fluid at rest
O: Apply hydrostatic equilibrium to the atmosphere and stars
PRE: Density and pressure
H: The hydrostatic equation
E: dp/dz = −ρg :: z upward
E: p = p_{0} + ρgh :: incompressible liquid at depth h
- Pressure depends only on depth, not on the shape of the container (hydrostatic paradox).
- Every 10 m of water adds about 1 atm.
H: Atmospheres and stars
E: p = p_{0}e^{−z/H}, H = k_{B}T/(mg) :: isothermal atmosphere, scale height H ≈ 8.4 km on Earth
P: Stars are held up by hydrostatic equilibrium: inward gravity balanced by the outward pressure gradient of hot gas (and radiation). When the pressure source fails, the star collapses.
X: Find the pressure at the bottom of the Mariana Trench (10 900 m, ρ ≈ 1030 kg m^{-3}).
> ρgh = 1030 × 9.8 × 10 900 ≈ 1.1 × 10^{8} Pa
> About 1100 atm
!: The pressure on a dam depends on the water depth, not on how far the reservoir stretches behind it.
Q: Why does pressure in a liquid not depend on the container's shape? | Pressure at a depth is set by ρgh plus surface pressure; walls supply whatever extra force balance is needed.
Q: What is the scale height of Earth's atmosphere? | About 8 km.
M1: Pressure 20 m below a lake surface (ρ = 1000, g = 10, p_{0} = 10^{5} Pa) is: | 3 × 10^{5} Pa | 2 × 10^{5} Pa | 10^{5} Pa | 2 × 10^{4} Pa | 10^{5} + 2 × 10^{5}.
M2: A star is in hydrostatic equilibrium when: | Pressure gradient balances gravity | Fusion stops | It rotates | Its temperature is uniform | dp/dr = −ρg.
T: Hydrostatic equilibrium | Balance between a pressure gradient and gravity in a fluid at rest: dp/dz = −ρg
T: Scale height | The height over which an isothermal atmosphere's pressure falls by a factor e
SUM: Liquids: p = p_{0} + ρgh; 10 m of water adds about 1 atmosphere.
SUM: The atmosphere thins exponentially, with a scale height of about 8 km.
SRC: OpenStax, University Physics Volume 1, section 14.2 "Measuring Pressure" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/14-2-measuring-pressure
SRC: Wallace J. M., Hobbs P. V., Atmospheric Science: An Introductory Survey, 2nd edition, Academic Press | secondary | 2006
EV: established | Exact for a fluid at rest; the scale height depends on temperature.
Q: Why does pressure in a liquid depend only on depth, not on the container's shape? | Each layer only supports the fluid directly above it; dp/dz = −ρg has no reference to the walls.
M3@2,3: A diver is at 25 m in seawater (ρ = 1030 kg m^{-3}). What is the absolute pressure (p_{0} = 101 kPa, g = 9.8 m s^{-2})? | About 350 kPa | About 250 kPa, the gauge pressure only | About 101 kPa, the surface value | About 2.5 MPa, using 100 kPa per metre | ρgh = 1030 × 9.8 × 25 ≈ 252 kPa; adding p_{0} gives about 353 kPa, roughly 3.5 atm.
SA2@2: Explain why a star doesn't collapse under its own gravity. | Each layer of a star is in hydrostatic equilibrium: the inward pull of gravity on it is balanced by the pressure difference across it, with higher pressure below. The pressure comes from the hot gas (and radiation), kept hot by nuclear fusion in the core. | hydrostatic equilibrium in each layer ; pressure gradient balances gravity ; pressure from hot gas and radiation ; fusion maintains the temperature

## Pascal's principle
S: Pascal's principle states that a pressure change applied to an enclosed incompressible fluid is transmitted undiminished to every part of the fluid and its container walls. It's the basis of hydraulic machines.
LV: Introductory · Application
O: State Pascal's principle
O: Calculate the force multiplication and piston travel in a hydraulic system
PRE: Hydrostatic equilibrium
H: Hydraulics
E: F_{1}/A_{1} = F_{2}/A_{2} ⇒ F_{2} = F_{1}A_{2}/A_{1}
E: A_{1}d_{1} = A_{2}d_{2} :: volume moved is the same
- Force multiplied, distance divided: work in = work out (ideally).
- Uses: car brakes, hydraulic jacks, excavators, aircraft control surfaces, presses.
H: Why liquids
P: Liquids are nearly incompressible (water's bulk modulus 2.2 GPa), so pressure changes travel through them almost instantly. Air in brake lines compresses, making brakes "spongy": that's why they're bled.
X: A car brake pedal applies 300 N to a 2 cm^{2} master cylinder. The four wheel cylinders are 10 cm^{2} each. Force at each wheel?
> p = 300/2 × 10^{-4} = 1.5 MPa
> F = 1.5 × 10^{6} × 10 × 10^{-4} = 1500 N per wheel (plus lever and servo gains in real cars)
!: Hydraulics don't give free energy: the large piston moves a much smaller distance.
Q: State Pascal's principle. | A pressure change in an enclosed fluid is transmitted equally to all parts of the fluid.
Q: Why does air in brake lines reduce braking? | Air compresses, so pedal movement compresses gas instead of transmitting pressure.
M1: A hydraulic lift has pistons of 0.01 m^{2} and 0.5 m^{2}. To lift 10 000 N you need: | 200 N | 500 N | 10 000 N | 50 N | Ratio 50.
M2: If the small piston moves 25 cm, the large one (area ratio 50) moves: | 0.5 cm | 25 cm | 12.5 m | 5 cm | Volume conserved.
T: Pascal's principle | A pressure change in an enclosed fluid is transmitted undiminished to every part of it
T: Hydraulic press | A device using two pistons of different areas to multiply force
SUM: F_{2}/F_{1} = A_{2}/A_{1}: the force is multiplied by the area ratio.
SUM: Energy is conserved: the small piston moves further by the same ratio.
SRC: OpenStax, University Physics Volume 1, section 14.3 "Pascal's Principle and Hydraulics" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/14-3-pascals-principle-and-hydraulics
SRC: Halliday D., Resnick R., Walker J., Fundamentals of Physics, 10th edition, chapter 14 | secondary | 2013
EV: established | Exact for an incompressible fluid; air bubbles make real brakes spongy.
Q: Why do air bubbles in hydraulic brakes make them less effective? | Air compresses, so pedal movement squashes the bubbles instead of moving the brake pistons.
M3@2,3: A hydraulic lift has pistons of 2.0 cm and 20 cm diameter. A 100 N push moves the small piston 0.50 m. How far does the load rise? | 5.0 mm | 5.0 cm, using the diameter ratio | 0.50 m, the same distance | 5.0 m, multiplied by 10 | The area ratio is (20/2.0)^{2} = 100, so the load rises 0.50/100 = 5.0 mm while 10 000 N is lifted.
SA2@1,2: Explain how a car's hydraulic brake system multiplies the driver's force. | The pedal pushes a small master-cylinder piston, raising the pressure in the brake fluid. By Pascal's principle that pressure reaches every wheel cylinder. Those pistons have larger areas, so F = pA is larger there, pressing the pads hard against the discs. | pedal pushes small piston ; pressure transmitted through fluid ; larger pistons at wheels ; F = pA multiplies force

## Buoyancy and Archimedes' principle
S: A body immersed in a fluid feels an upward buoyant force equal to the weight of fluid it displaces. Whether it floats or sinks depends on whether its average density is less or more than the fluid's.
LV: Introductory · Application
O: State Archimedes' principle and calculate buoyant forces
O: Predict whether an object floats and how much of it is submerged
PRE: Hydrostatic equilibrium
H: Archimedes' principle
E: F_{B} = ρ_{fluid}V_{displaced}g
- Arises from the pressure difference between the bottom and top of the object.
- Floating: F_{B} = weight, so fraction submerged = ρ_{object}/ρ_{fluid}.
- Icebergs (917 vs 1025 kg m^{-3}): ~89% under water.
H: Applications
- Ships float though steel is dense: the hull encloses air, lowering average density.
- Submarines and fish adjust buoyancy with ballast tanks or swim bladders.
- Hot-air balloons: lift = (ρ_{cold} − ρ_{hot})Vg.
- Hydrometers measure liquid density by how deep they float.
X: A crown weighs 7.84 N in air and 6.86 N in water. What's its density?
> F_{B} = 0.98 N ⇒ V = 0.98/(1000 × 9.8) = 10^{-4} m^{3}
> m = 0.8 kg ⇒ ρ = 8000 kg m^{-3}: not pure gold (19 300)
!: Buoyant force depends on the displaced volume, not on the object's weight or depth (for incompressible fluids).
Q: State Archimedes' principle. | The buoyant force equals the weight of fluid displaced.
Q: What fraction of a floating object is submerged? | The ratio of its density to the fluid's density.
M1: A block of density 600 kg m^{-3} floats in water. Fraction submerged: | 0.6 | 0.4 | 1 | 0.06 | ρ_{obj}/ρ_{water}.
M2: An ice cube floats in a glass of water. When it melts the water level: | Stays the same | Rises | Falls | Overflows | Melted ice exactly fills the volume it displaced.
T: Buoyant force | The upward force on an immersed body, equal to the weight of the fluid displaced
T: Apparent weight | The weight of an object minus the buoyant force on it
SUM: F_{b} = ρ_{fluid}V_{displaced}g; it arises from the pressure being greater on the bottom.
SUM: A floating body displaces its own weight; fraction submerged = ρ_{object}/ρ_{fluid}.
SRC: OpenStax, University Physics Volume 1, section 14.4 "Archimedes' Principle and Buoyancy" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/14-4-archimedes-principle-and-buoyancy
SRC: Halliday D., Resnick R., Walker J., Fundamentals of Physics, 10th edition, chapter 14 | secondary | 2013
EV: established | Exact consequence of hydrostatic pressure.
Q: What fraction of an iceberg (ρ = 920 kg m^{-3}) is under seawater (ρ = 1030 kg m^{-3})? | About 89%.
M3@2,3: A 2.0 kg rock weighs 12 N when hanging in water (g = 9.8 m s^{-2}). What is its density? | About 2.6 × 10^{3} kg m^{-3} | About 1.6 × 10^{3} kg m^{-3}, using 12 N | About 1.0 × 10^{3} kg m^{-3}, like water | About 6.0 × 10^{3} kg m^{-3}, using 19.6/3.3 | Buoyant force = 19.6 − 12 = 7.6 N, so V = 7.6/(1000 × 9.8) ≈ 7.8 × 10^{-4} m^{3} and ρ = 2.0/V ≈ 2600 kg m^{-3}.
SA2@2: Explain why a steel ship floats although steel is about eight times denser than water. | The ship's hull encloses a large volume of air, so its average density (steel plus air inside) is less than water's. It sinks until it displaces a weight of water equal to its own weight, which happens before the deck reaches the water. | hull encloses air ; average density less than water ; displaces its own weight ; floats before the deck submerges

## Fluid statics
S: Fluid statics covers fluids at rest: pressure distributions, forces on submerged surfaces, manometers and the stability of floating bodies. Because fluids at rest can't resist shear, every problem reduces to pressure balance.
LV: Intermediate · Application
O: Calculate forces on submerged surfaces and readings of manometers
O: Explain the stability of floating bodies using the metacentre
PRE: Buoyancy and Archimedes' principle
H: Pressure measurement
- **Barometer**: mercury column of 760 mm balances 1 atm (Torricelli).
- **U-tube manometer**: Δp = ρgΔh between the two arms.
- **Bourdon gauge**: a curved tube straightens under pressure.
H: Forces on submerged surfaces
E: F = ρg h_{c}A :: h_{c} = depth of the surface's centroid
- The resultant acts below the centroid (centre of pressure), because pressure grows with depth.
- Dam walls are thicker at the base.
H: Stability of floating bodies
P: A floating body is stable if its metacentre lies above its centre of gravity. Ships keep heavy ballast low and use wide hulls. Loading too much high on deck raises the centre of gravity and risks capsizing.
X: A rectangular gate 2 m wide holds water 3 m deep. Find the total force.
> h_{c} = 1.5 m; A = 6 m^{2}
> F = 1000 × 9.8 × 1.5 × 6 = 88 kN, acting at 2 m depth (2/3 of the way down)
!: The force on a vertical wall isn't ρghA with the full depth; use the centroid depth.
Q: What does a U-tube manometer measure? | A pressure difference, Δp = ρgΔh.
Q: When is a floating ship stable? | When its metacentre is above its centre of gravity.
M1: A water barometer would need a column about: | 10 m | 76 cm | 1 m | 100 m | 13.6 × 0.76 m.
M2: The centre of pressure on a vertical submerged wall is: | Below the centroid | At the centroid | Above the centroid | At the surface | Pressure increases with depth.
T: Manometer | A U-tube of liquid whose height difference measures a pressure difference
T: Centre of pressure | The point where the total pressure force on a surface acts
T: Metacentre | The point about which a tilted floating body's buoyancy acts; it must lie above the centre of mass for stability
SUM: Force on a submerged vertical wall = average pressure × area, acting below the centroid.
SUM: A floating body is stable if its metacentre is above its centre of mass.
SRC: White F. M., Fluid Mechanics, 8th edition, chapter 2, McGraw-Hill | secondary | 2016
SRC: OpenStax, University Physics Volume 1, section 14.2 "Measuring Pressure" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/14-2-measuring-pressure
EV: established | Standard hydrostatics.
Q: What does a 76 cm column of mercury in a barometer measure? | Atmospheric pressure: about 101 kPa.
M3@2,3: A dam holds water 20 m deep against a 50 m wide wall. What is the total horizontal force on it (g = 9.8 m s^{-2})? | About 9.8 × 10^{7} N | About 2.0 × 10^{8} N, using full-depth pressure | About 9.8 × 10^{6} N, using a 2 m depth | About 4.9 × 10^{7} N, using a quarter depth | Average gauge pressure = ρgh/2 = 98 kPa; times area 20 × 50 = 1000 m^{2} gives 9.8 × 10^{7} N.
SA2@1,2: Explain why dams are much thicker at the bottom than at the top. | Pressure increases linearly with depth (p = ρgh), so the force per unit area on the wall is greatest at the base. The wall must be strongest there to resist the larger force and the bending moment, so it is built thicker at the bottom. | pressure rises with depth ; largest force near the base ; bending moment greatest there ; thicker base needed

## Fluid dynamics
S: Fluid dynamics studies fluids in motion: rivers, blood, weather, aircraft, stars. Flows are described by velocity fields v(r, t), and governed by conservation of mass, momentum and energy.
LV: Introductory · Foundation
O: Describe a flow with velocity fields, streamlines and pathlines
O: Distinguish steady, unsteady, uniform and rotational flows
PRE: Fluid statics
H: Describing flow
- **Steady flow**: v at each point doesn't change with time.
- **Streamlines**: everywhere tangent to v; in steady flow they're the paths of fluid particles.
- **Ideal fluid**: incompressible, inviscid (no viscosity), irrotational: a useful first model.
- **Eulerian** (fields at fixed points) vs **Lagrangian** (follow particles) descriptions.
E: Dv/Dt = ∂v/∂t + (v·∇)v :: material (convective) derivative: acceleration of a fluid particle
H: Key ideas
- Mass conservation → continuity equation.
- Momentum conservation → Euler (inviscid) or Navier–Stokes (viscous) equations.
- Energy along a streamline → Bernoulli.
- Dimensionless numbers (Reynolds, Mach, Froude) decide which effects dominate.
X: Why does water in a steady river speed up where it narrows?
> Steady flow: ∂v/∂t = 0 everywhere, but each parcel accelerates as it moves into the narrow part
> The (v·∇)v term captures this convective acceleration
!: "Steady" flow doesn't mean no acceleration; fluid particles can accelerate as they move to places of different velocity.
Q: What is a streamline? | A line everywhere tangent to the flow velocity.
Q: What is the material derivative? | The rate of change following a fluid particle: ∂/∂t + v·∇.
M1: In steady flow, streamlines: | Are the paths of fluid particles | Cross each other | Change with time | Are always straight | Steady ⇒ pathlines = streamlines.
M2: An ideal fluid is: | Incompressible and inviscid | Highly viscous | Compressible | Turbulent | The simplest model.
T: Streamline | A line everywhere tangent to the velocity of the flow
T: Steady flow | Flow in which the velocity at each point doesn't change with time
T: Velocity field | The fluid velocity v(r, t) at every point and time
SUM: In steady flow streamlines, pathlines and streaklines coincide; streamlines never cross.
SUM: The Eulerian view watches fixed points; the Lagrangian view follows fluid parcels.
SRC: Batchelor G. K., An Introduction to Fluid Dynamics, chapter 2, Cambridge University Press | secondary | 1967
SRC: OpenStax, University Physics Volume 1, section 14.5 "Fluid Dynamics" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/14-5-fluid-dynamics
EV: established | Standard description of flows.
Q: Why can't streamlines cross? | The fluid would need two velocities at the crossing point.
M3@2,3: Close-together streamlines in a steady incompressible flow mean what? | Faster flow, since the same volume passes through a narrower gap | Slower flow, since the fluid is squeezed into a narrower space | Higher pressure, since the fluid piles up where the lines converge | Turbulence, since streamlines that nearly meet must break into eddies | Between streamlines the volume flow rate is fixed, so a narrower gap means higher speed (and lower pressure, by Bernoulli).
SA2@1: Explain the difference between the Eulerian and Lagrangian descriptions of a river's flow. | Eulerian: you stand at fixed points (a gauge on a bridge) and record the velocity there over time. Lagrangian: you follow individual parcels of water (a floating leaf) and record their positions and velocities as they move. | Eulerian: fixed points ; example ; Lagrangian: follows parcels ; example

## Continuity equation
S: The continuity equation expresses conservation of mass in a flow. For an incompressible fluid in a pipe, the volume flow rate is the same everywhere, so the fluid speeds up where the pipe narrows.
LV: Introductory · Application
O: Apply A_{1}v_{1} = A_{2}v_{2} to incompressible flow in pipes
O: Explain flow rate in terms of volume per second
PRE: Fluid dynamics
H: Forms
E: A_{1}v_{1} = A_{2}v_{2} :: incompressible flow in a pipe (volume flow rate Q = Av)
E: ρ_{1}A_{1}v_{1} = ρ_{2}A_{2}v_{2} :: compressible, steady
E: ∂ρ/∂t + ∇·(ρv) = 0 :: general differential form
E: ∇·v = 0 :: incompressible flow
H: Examples
- Thumb over a hose end: smaller area, faster jet.
- Blood: the aorta (~3 cm^{2}) carries ~5 L min^{-1} at ~30 cm s^{-1}; capillaries' huge total area (~3000 cm^{2}) slows blood to ~0.03 cm s^{-1}, allowing exchange.
- Rivers flow faster through narrows and rapids.
X: Water flows at 2 m s^{-1} through a 4 cm diameter pipe into a 2 cm diameter pipe. New speed?
> v_{2} = v_{1}(d_{1}/d_{2})^{2} = 2 × 4 = 8 m s^{-1}
!: Speed scales with the inverse of area, which goes as diameter squared: halving the diameter quadruples the speed.
Q: What is the continuity equation for incompressible pipe flow? | A_{1}v_{1} = A_{2}v_{2}.
Q: Why does blood slow down in capillaries? | Their total cross-sectional area is far larger than the aorta's.
M1: A pipe's diameter triples. The flow speed: | Falls to 1/9 | Falls to 1/3 | Triples | Is unchanged | v ∝ 1/d^{2}.
M2: For incompressible flow, ∇·v = ? | 0 | 1 | ρ | −∂ρ/∂t | No net outflow from any volume.
T: Volume flow rate | Q = Av, the volume passing a point per second, in m^{3} s^{-1}
T: Incompressible flow | Flow in which density stays constant, so volume flow rate is conserved
SUM: A_{1}v_{1} = A_{2}v_{2}: halving the area doubles the speed.
SUM: For compressible flow the mass flow rate ρAv is conserved instead.
SRC: OpenStax, University Physics Volume 1, section 14.5 "Fluid Dynamics" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/14-5-fluid-dynamics
SRC: White F. M., Fluid Mechanics, 8th edition, chapter 3, McGraw-Hill | secondary | 2016
EV: established | Exact consequence of mass conservation.
Q: Why does putting your thumb over a hose make the water squirt further? | The smaller opening forces the same flow rate through a smaller area, so the water leaves faster.
M3@2,3: Blood flows at 0.30 m s^{-1} in the aorta (radius 1.0 cm). The capillaries' total cross-section is 0.20 m^{2}. What is the mean speed in capillaries? | About 0.47 mm s^{-1} | About 0.30 m s^{-1}, the same speed | About 4.7 cm s^{-1}, using the radius in cm | About 190 m s^{-1}, as capillaries are tiny | Q = π(0.010)^{2} × 0.30 ≈ 9.4 × 10^{-5} m^{3} s^{-1}; v = Q/A = 9.4 × 10^{-5}/0.20 ≈ 4.7 × 10^{-4} m s^{-1}.
SA2@1,2: A pipe narrows from 4.0 cm to 2.0 cm diameter. Water enters at 1.5 m s^{-1}. Find its speed in the narrow part and the volume flow rate. | Area ratio (4.0/2.0)^{2} = 4, so v = 4 × 1.5 = 6.0 m s^{-1}. Q = π(0.020)^{2} × 1.5 ≈ 1.9 × 10^{-3} m^{3} s^{-1}. | area ∝ diameter squared ; v = 6.0 m s^{-1} ; Q = Av ; about 1.9 × 10^{-3} m^{3} s^{-1}

## Conservation of mass in fluid flow
S: Mass can't be created or destroyed in a flow; it can only move. Writing this for a fixed control volume gives a balance between what flows in, what flows out and what accumulates, the template for all conservation laws in continuum physics.
LV: Intermediate · Foundation
O: Write a mass balance for a control volume
O: State the differential continuity equation and its incompressible form
PRE: Continuity equation
H: Control-volume form
E: dM/dt = ṁ_{in} − ṁ_{out}; ṁ = ρAv
E: d/dt ∭ρ dV = −∯ρv·dA
- Steady state: what goes in comes out.
- Unsteady: filling or emptying tanks, inflating balloons.
H: Applications
- Tank draining: dV/dt = −A_{hole}v_{out} with v_{out} = √(2gh) (Torricelli) gives draining time.
- Jet engines: air mass flow in plus fuel flow out.
- Hydrology: catchment water balance; rivers' discharge.
X: A cylindrical tank (A = 1 m^{2}) fills at 20 L s^{-1} and drains at 12 L s^{-1}. How fast does the level rise?
> Net inflow 8 L s^{-1} = 0.008 m^{3} s^{-1}
> dh/dt = 0.008/1 = 8 mm s^{-1}
!: For compressible flows (gases), volume flow rate isn't conserved; mass flow rate is.
Q: What is mass flow rate? | ṁ = ρAv, the mass passing a cross-section per second.
Q: Why is the integral form of mass conservation useful? | It works for any control volume, including unsteady flows with accumulation.
M1: Air enters a duct at 2 kg s^{-1} and leaves at 1.5 kg s^{-1}. The mass inside: | Increases at 0.5 kg s^{-1} | Decreases | Stays constant | Can't be determined | Accumulation = in − out.
M2: For a gas heated as it flows through a constant-area pipe, the velocity: | Increases (density falls) | Decreases | Stays constant | Becomes zero | ρv = constant.
T: Control volume | A fixed region of space through which fluid flows, used to write balance equations
T: Mass flux | ρv, the mass crossing unit area per second
SUM: ∂ρ/∂t + ∇·(ρv) = 0; incompressible flow gives ∇·v = 0.
SUM: Rate of mass increase inside = mass flow in − mass flow out.
SRC: Batchelor G. K., An Introduction to Fluid Dynamics, chapter 2, Cambridge University Press | secondary | 1967
SRC: White F. M., Fluid Mechanics, 8th edition, chapter 4, McGraw-Hill | secondary | 2016
EV: established | Exact statement of mass conservation.
Q: What does ∇·v = 0 mean physically? | No net outflow from any small volume: the fluid neither compresses nor expands.
M3@2,3: A tank has water entering at 3.0 kg s^{-1} and leaving at 2.0 kg s^{-1}. What happens to the water inside? | Its mass rises by 1.0 kg each second | Its mass stays constant, as flow is steady | Its mass falls by 1.0 kg each second | Its mass rises by 5.0 kg each second | The control-volume balance gives dM/dt = 3.0 − 2.0 = +1.0 kg s^{-1}.
SA2@1,2: Explain why ∇·v = 0 for water flow but not for air in a fast jet engine. | Water is nearly incompressible, so its density barely changes and volume is conserved, giving ∇·v = 0. In a jet engine air is compressed and heated and moves at high Mach number, so its density changes a lot; mass, not volume, is conserved, and ∇·v ≠ 0. | water nearly incompressible ; density constant gives ∇·v = 0 ; air in a jet compresses ; must use ∇·(ρv) form

## Bernoulli's equation
S: Along a streamline in steady, incompressible, frictionless flow, pressure energy, kinetic energy and potential energy per unit volume add to a constant. Where fluid speeds up, its pressure falls.
LV: Introductory · Application
O: State Bernoulli's equation and the conditions for it to hold
O: Apply it to Venturi meters, Torricelli's law and pitot tubes
PRE: Continuity equation
H: The equation
E: p + ½ρv^{2} + ρgh = constant (along a streamline)
- ½ρv^{2} is the dynamic pressure; p the static pressure.
- It's energy conservation per unit volume: pressure does work on the fluid.
H: Applications
- **Torricelli's law**: water from a hole a depth h below the surface leaves at v = √(2gh).
- **Venturi meter**: measure Δp across a constriction to find flow rate.
- **Pitot tube**: stagnation pressure p + ½ρv^{2} gives aircraft airspeed.
- Atomisers, carburettors, the curve of a spinning ball (partly).
X: Air at 1.2 kg m^{-3} speeds up from 20 to 40 m s^{-1} over a surface. What's the pressure drop?
> Δp = ½ρ(v_{2}^{2} − v_{1}^{2}) = 0.6 × (1600 − 400) = 720 Pa
!: The "equal transit time" explanation of lift (air over the top must meet air underneath) is wrong; lift comes from the wing turning the flow downward, with Bernoulli describing the pressure field that results.
Q: State Bernoulli's equation. | p + ½ρv^{2} + ρgh is constant along a streamline (steady, incompressible, inviscid flow).
Q: How does a Pitot tube measure airspeed? | From the difference between stagnation and static pressure, ½ρv^{2}.
M1: Water leaves a hole 5 m below the surface at (g = 9.8): | 9.9 m s^{-1} | 5 m s^{-1} | 49 m s^{-1} | 98 m s^{-1} | √(2 × 9.8 × 5).
M2: Bernoulli's equation assumes: | Steady, incompressible, inviscid flow | Turbulent flow | Compressible gas | High viscosity | It neglects friction.
T: Bernoulli's equation | p + ½ρv^{2} + ρgh = constant along a streamline
T: Dynamic pressure | ½ρv^{2}, the kinetic-energy term in Bernoulli's equation
T: Venturi effect | Lower pressure where a flow speeds up through a constriction
SUM: Valid for steady, incompressible, inviscid flow along a streamline.
SUM: Faster flow means lower pressure; Torricelli: v = √(2gh) from a hole at depth h.
SRC: OpenStax, University Physics Volume 1, section 14.6 "Bernoulli's Equation" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/14-6-bernoullis-equation
SRC: Batchelor G. K., An Introduction to Fluid Dynamics, chapter 3, Cambridge University Press | secondary | 1967
EV: established | Exact under its assumptions; viscosity and turbulence cause losses in real pipes.
Q: Water leaks from a hole 0.80 m below the surface of a tank. How fast does it come out (g = 9.8 m s^{-2})? | v = √(2gh) ≈ 4.0 m s^{-1}.
M3@2,3: Water at 2.0 m s^{-1} and 150 kPa enters a horizontal pipe that narrows to half the area. What is the pressure in the narrow part? | 144 kPa | 150 kPa, unchanged | 156 kPa, higher in the narrow part | 75 kPa, halved with the area | v doubles to 4.0 m s^{-1}; Δp = ½ρ(v_{2}^{2} − v_{1}^{2}) = ½ × 1000 × 12 = 6.0 kPa, so p = 144 kPa.
SA2@2: Explain how a pitot tube measures an aircraft's airspeed. | It compares the stagnation pressure in a forward-facing tube, where the air is brought to rest, with the static pressure from side holes. By Bernoulli, the difference equals ½ρv^{2}, so v = √(2Δp/ρ). (At high speed, compressibility corrections are needed.) | stagnation pressure from forward tube ; static pressure from side holes ; difference is ½ρv^{2} ; v = √(2Δp/ρ)

## Viscosity
S: Viscosity is a fluid's internal friction: its resistance to layers sliding past each other. Honey is viscous, air barely so, but viscosity governs everything from blood flow to the drag on a bacterium.
LV: Introductory · Foundation
O: Define dynamic viscosity from shear stress and velocity gradient
O: Describe how viscosity depends on temperature for liquids and gases
PRE: Fluid dynamics
H: Newtonian fluids
E: τ = η dv/dy :: shear stress ∝ velocity gradient; η = dynamic viscosity (Pa s)
E: ν = η/ρ :: kinematic viscosity (m^{2} s^{-1})
- Water ~1.0 × 10^{-3} Pa s at 20 °C; air 1.8 × 10^{-5}; olive oil ~0.08; honey ~10; glass at room temperature ~10^{20}.
- Liquids get less viscous when heated; gases more viscous (molecules carry more momentum across layers).
H: Non-Newtonian fluids
- **Shear-thinning**: ketchup, paint, blood (flow more easily when stirred).
- **Shear-thickening**: cornflour in water (oobleck) stiffens under sudden stress.
- **Bingham plastic**: toothpaste needs a yield stress to flow.
- **Viscoelastic**: silly putty bounces but flows slowly.
X: A plate of area 0.1 m^{2} slides at 0.2 m s^{-1} on a 1 mm oil film (η = 0.1 Pa s). Find the drag force.
> τ = 0.1 × 0.2/0.001 = 20 Pa
> F = τA = 2 N
!: Viscosity isn't density. Olive oil is about 80 times more viscous than water but less dense, so it floats; mercury is 13.6 times denser than water but only about 1.5 times as viscous.
Q: Define dynamic viscosity. | The ratio of shear stress to velocity gradient in a Newtonian fluid.
Q: How does gas viscosity change with temperature? | It increases (faster molecules transfer more momentum between layers).
M1: Ketchup flowing more easily when shaken is: | Shear-thinning | Shear-thickening | Newtonian | Inviscid | Viscosity falls with shear rate.
M2: The SI unit of dynamic viscosity is: | Pa s | Pa | m^{2} s^{-1} | N | Stress over shear rate.
T: Dynamic viscosity | η, the ratio of shear stress to velocity gradient: τ = η dv/dy, in Pa s
T: Newtonian fluid | A fluid with viscosity independent of shear rate
T: Kinematic viscosity | ν = η/ρ, in m^{2} s^{-1}
SUM: Water η ≈ 1.0 × 10^{-3} Pa s; air ≈ 1.8 × 10^{-5} Pa s; honey ~10 Pa s (room temperature).
SUM: Liquid viscosity falls with temperature; gas viscosity rises.
SRC: OpenStax, University Physics Volume 1, section 14.7 "Viscosity and Turbulence" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/14-7-viscosity-and-turbulence
SRC: Kaye G. W. C., Laby T. H., Tables of Physical and Chemical Constants (online edition), National Physical Laboratory | data | 2005
EV: established | Values quoted are approximate at about 20 °C.
Q: Why does gas viscosity rise with temperature? | Faster molecules carry momentum between layers more effectively.
M3@2,3: Ketchup flows more easily after shaking. What kind of fluid is it? | Shear-thinning: its viscosity falls as the shear rate rises | Newtonian: its viscosity never changes | Shear-thickening: its viscosity rises when stirred | Inviscid: it has no viscosity at all | Non-Newtonian fluids have shear-rate-dependent viscosity; ketchup and paint thin, cornflour in water thickens.
SA2@1: A plate slides at 0.20 m s^{-1} over a 1.0 mm layer of oil (η = 0.10 Pa s). Find the shear stress and the force on a 0.50 m^{2} plate. | Velocity gradient = 0.20/0.0010 = 200 s^{-1}. τ = η dv/dy = 0.10 × 200 = 20 Pa. F = τA = 20 × 0.50 = 10 N. | velocity gradient 200 s^{-1} ; τ = η dv/dy ; 20 Pa ; F = 10 N

## Laminar and turbulent flow
S: In laminar flow, fluid moves in smooth parallel layers; in turbulent flow, it churns in irregular eddies at many scales. Which one occurs depends on the balance between inertia and viscosity, measured by the Reynolds number.
LV: Introductory · Foundation
O: Distinguish laminar and turbulent flow by their features
O: Explain the consequences of turbulence for mixing, drag and pipe losses
PRE: Viscosity
H: Laminar flow
- Smooth, predictable, layers don't mix (except by diffusion).
- Low speeds, small scales or high viscosity: blood in capillaries, syrup, microfluidics.
- Drag and pressure drop ∝ speed.
H: Turbulent flow
- Chaotic eddies; strong mixing of momentum, heat and pollutants.
- Energy cascades from large eddies to small ones, where viscosity dissipates it (Kolmogorov).
- Drag and pressure drop ∝ speed^{2}; most flows in nature and engineering.
H: Transition
P: In a pipe, flow is typically laminar below Re ≈ 2000 and turbulent above ~4000, but careful experiments keep it laminar to Re ~ 10^{5}. Turbulence first appears as "puffs" that can split or decay, a process studied as a statistical phase transition.
X: Smoke rising from a candle starts smooth then breaks into swirls. Why?
> The plume accelerates upward and widens: Re = vL/ν grows with height
> Above a critical Re, small disturbances grow and the flow becomes turbulent
!: Turbulent doesn't mean random noise added to laminar flow; it's a different, deterministic but chaotic regime.
Q: What distinguishes laminar from turbulent flow? | Laminar flow moves in smooth layers; turbulent flow has chaotic eddies and strong mixing.
Q: What is the energy cascade in turbulence? | Energy passes from large eddies to ever smaller ones until viscosity dissipates it as heat.
M1: Flow in a pipe at Re = 500 is most likely: | Laminar | Turbulent | Supersonic | Inviscid | Below ~2000.
M2: Turbulence increases: | Mixing and drag | Laminar stability | Viscosity of the fluid | Density | Eddies transfer momentum and heat.
T: Laminar flow | Smooth flow in parallel layers, with little mixing across them
T: Turbulent flow | Irregular flow with eddies at many scales and strong mixing
SUM: Laminar at low speed or high viscosity; turbulent at high speed, large size or low viscosity.
SUM: Turbulence mixes heat and momentum strongly and raises pressure losses in pipes.
SRC: Tritton D. J., Physical Fluid Dynamics, 2nd edition, Oxford University Press | secondary | 1988
SRC: Reynolds O., "An experimental investigation of the circumstances which determine whether the motion of water shall be direct or sinuous", Philosophical Transactions of the Royal Society 174, 935–982 | primary | 1883 | https://doi.org/10.1098/rstl.1883.0029
EV: established | The transition is well characterised for pipes; a complete theory of turbulence doesn't yet exist.
Q: What did Reynolds use to see the transition to turbulence? | A thin stream of dye in water flowing through a glass pipe.
M3@2,3: Why does a turbulent pipe flow need more pumping power than a laminar one at the same mean speed? | Eddies transfer momentum to the wall far more effectively, raising wall friction | Turbulent water is denser, so it is heavier to pump | Turbulent flow has a lower mean speed at the centre | Laminar flow has no friction with the wall at all | Turbulent mixing steepens the velocity gradient at the wall, raising shear stress and pressure drop.
SA2@1,2: Explain why rising smoke from a candle is laminar at first and then becomes turbulent. | Near the flame the smoke rises slowly in a narrow column, so the Reynolds number is low and the flow is smooth. As it accelerates upward and widens, the Reynolds number increases past the critical value, small disturbances grow, and the plume breaks into eddies. | low speed and size at first ; low Reynolds number ; speed and width increase ; Reynolds number passes the transition

## Reynolds number
S: The Reynolds number is the ratio of inertial to viscous forces in a flow. It predicts whether flow is laminar or turbulent and lets engineers test scale models: flows with the same Re (and shape) behave the same way.
LV: Intermediate · Application
O: Calculate the Reynolds number for a flow
O: Use it to predict laminar or turbulent flow and to scale models
PRE: Laminar and turbulent flow
H: Definition
E: Re = ρvL/η = vL/ν
- L is a characteristic length (pipe diameter, wing chord, body length).
H: Typical values
- Bacterium swimming: ~10^{-5} (viscosity dominates; coasting stops in nanometres).
- Blood in the aorta: ~3000.
- Human swimming: ~10^{6}; car: ~10^{6}; airliner wing: ~10^{7}; atmosphere: ~10^{9+}.
H: Life at low Re
P: At very low Re, inertia is irrelevant: motion stops the moment force stops, and reciprocal motions (like a scallop opening and closing) produce no net movement (Purcell's scallop theorem). Bacteria swim with rotating corkscrew flagella instead.
X: Find Re for water (ν = 10^{-6} m^{2} s^{-1}) at 1 m s^{-1} in a 2 cm pipe.
> Re = 1 × 0.02/10^{-6} = 2 × 10^{4}: turbulent
!: Re depends on the chosen length scale; quote which L you used, and compare only with critical values defined the same way.
Q: What does the Reynolds number compare? | Inertial forces to viscous forces.
Q: Why can't bacteria coast? | At Re ~ 10^{-5}, viscous forces dominate completely and stop them almost instantly.
M1: Increasing pipe diameter at the same speed makes Re: | Larger | Smaller | Unchanged | Zero | Re ∝ L.
M2: To test a car in a wind tunnel with a 1/4 scale model in air, matching Re needs: | 4 times the speed | 1/4 the speed | The same speed | 16 times the speed | vL constant.
T: Reynolds number | Re = ρvL/η = vL/ν, the ratio of inertial to viscous forces
SUM: Pipe flow is laminar below Re ≈ 2000 and usually turbulent above about 4000.
SUM: Flows with the same Re (and geometry) are dynamically similar.
T: Dynamic similarity | Two flows behaving alike because their dimensionless groups match
SRC: White F. M., Fluid Mechanics, 8th edition, chapter 6, McGraw-Hill | secondary | 2016
SRC: Purcell E. M., "Life at low Reynolds number", American Journal of Physics 45, 3–11 | primary | 1977 | https://doi.org/10.1119/1.10903
EV: established | The transition values are typical for smooth pipes; disturbances can shift them.
Q: Why do bacteria "swim in treacle"? | At Re ~ 10^{-4} viscous forces dominate completely; they stop instantly when they stop swimming.
M3@2,3: Water (ν = 1.0 × 10^{-6} m^{2} s^{-1}) flows at 0.50 m s^{-1} in a 2.0 cm pipe. Is the flow laminar? | No: Re = 10 000, well above 2000, so it is turbulent | Yes: Re = 100, well below the laminar limit of about 2000 | Yes: Re = 1000, below the laminar limit of about 2000 | It depends only on whether the pipe is smooth glass or rough steel | Re = vD/ν = 0.50 × 0.020/1.0 × 10^{-6} = 10^{4}.
SA2@2: A 1:10 model of a submarine is tested in the same water. To match the Reynolds number, how fast must the model move compared with the real submarine, and why is this awkward? | Re = vL/ν with the same ν: L is ten times smaller, so v must be ten times larger. That needs very high speeds in the test tank, so engineers often use a different fluid or accept partial similarity with corrections. | Re = vL/ν ; L ten times smaller ; v ten times larger ; impractical speeds, hence different fluids or corrections

## Poiseuille flow
S: Poiseuille flow is steady laminar flow through a pipe. The velocity profile is parabolic, and the flow rate depends on the fourth power of the radius, which is why narrowed arteries matter so much.
LV: Intermediate · Application
O: Describe the parabolic velocity profile of laminar pipe flow
O: Use Poiseuille's law and its r^{4} dependence
PRE: Viscosity
H: Results
E: v(r) = (Δp/(4ηL))(R^{2} − r^{2}) :: parabolic profile, fastest at the centre
E: Q = πR^{4}Δp/(8ηL) :: Hagen–Poiseuille law
E: R_{flow} = 8ηL/(πR^{4}) :: hydraulic resistance (Δp = QR_{flow})
- Maximum speed is twice the mean speed.
- Like Ohm's law: pressure difference ↔ voltage, flow rate ↔ current.
H: Medicine
P: Narrowing an artery's radius by 20% cuts flow by 59% at the same pressure (0.8^{4} = 0.41). The body adjusts flow to organs by slightly constricting or dilating arterioles. In atherosclerosis, the heart must raise blood pressure to compensate.
X: A needle (R = 0.2 mm, L = 3 cm) delivers water (η = 10^{-3} Pa s) at Δp = 50 kPa. Flow rate?
> Q = π(2 × 10^{-4})^{4} × 5 × 10^{4}/(8 × 10^{-3} × 0.03)
> = 1.0 × 10^{-6} m^{3} s^{-1} = 1 mL s^{-1}
!: Poiseuille's law only holds for laminar, fully developed flow of a Newtonian fluid; blood in large arteries is pulsatile and non-Newtonian.
Q: How does flow rate depend on pipe radius in laminar flow? | Q ∝ R^{4}.
Q: What is the velocity profile in Poiseuille flow? | Parabolic, maximum at the centre, zero at the wall.
M1: Halving a pipe's radius (same Δp) changes Q by: | ×1/16 | ×1/2 | ×1/4 | ×1/8 | R^{4}.
M2: In Poiseuille flow, the speed at the wall is: | Zero | Maximum | Half maximum | Equal to the mean | No-slip condition.
T: Poiseuille's law | Q = πr^{4}Δp/(8ηL) for laminar flow through a pipe
T: Hydraulic resistance | Δp/Q = 8ηL/(πr^{4}), the pipe's opposition to flow
SUM: Laminar pipe flow has a parabolic profile; the centre speed is twice the mean.
SUM: Q ∝ r^{4}: halving the radius cuts the flow sixteenfold at the same pressure.
SRC: OpenStax, University Physics Volume 1, section 14.7 "Viscosity and Turbulence" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/14-7-viscosity-and-turbulence
SRC: Sutera S. P., Skalak R., "The history of Poiseuille's law", Annual Review of Fluid Mechanics 25, 1–20 | secondary | 1993 | https://doi.org/10.1146/annurev.fl.25.010193.000245
EV: established | Exact for steady laminar flow of a Newtonian fluid in a long straight pipe; blood is only approximately Newtonian.
Q: What is the shape of the velocity profile in Poiseuille flow? | A parabola: zero at the wall, maximum at the centre.
M3@2,3: An artery narrows to 80% of its radius. By what factor must the pressure difference rise to keep the same flow? | About 2.4 | About 1.25, from 1/0.8 | About 1.6, from 1/0.8^{2} | About 2.0, from 1/0.8^{3} | Δp ∝ 1/r^{4} at fixed Q: 1/0.8^{4} = 1/0.41 ≈ 2.4.
SA2@1,2: Explain why small changes in blood-vessel radius are so effective at controlling blood flow. | By Poiseuille's law flow is proportional to r^{4}. A 10% widening of an arteriole raises flow by about 1.1^{4} ≈ 1.46, 46% more at the same pressure, so the body controls flow to tissues mainly by small changes in vessel radius. | Q ∝ r^{4} ; small radius change, large flow change ; example calculation ; used by the body to regulate flow

## Drag and lift
S: A body moving through a fluid feels a force with two components: drag, opposing the relative motion, and lift, perpendicular to it. They come from pressure differences around the body and from viscous shear on its surface.
LV: Intermediate · Application
O: Use drag and lift coefficients to calculate forces
O: Explain how a wing produces lift
PRE: Bernoulli's equation
H: Drag
E: F_{D} = ½ρv^{2}C_{D}A
- **Form (pressure) drag**: from flow separation and the low-pressure wake.
- **Skin friction**: viscous shear on the surface.
- **Induced drag**: from producing lift (wingtip vortices).
- **Wave drag**: shock waves at transonic and supersonic speeds.
- C_{D}: sphere ~0.47; streamlined body ~0.04; flat plate ~1.2. Golf-ball dimples trigger turbulent boundary layers that delay separation and halve drag.
H: Lift
E: F_{L} = ½ρv^{2}C_{L}A
- A wing turns air downward; by Newton's third law, air pushes the wing up. The pressure is lower above, higher below.
- C_{L} rises with angle of attack until the flow separates: stall (~15°).
- Kutta–Joukowski: lift per unit span = ρvΓ, with Γ the circulation round the wing.
X: A 70 000 kg airliner lands at 70 m s^{-1}, wing area 120 m^{2}, sea-level air. What C_{L} is needed?
> mg = ½ρv^{2}C_{L}A ⇒ C_{L} = 686 000/(0.5 × 1.2 × 4900 × 120)
> C_{L} ≈ 1.9, needing flaps and slats
!: Lift isn't always upward: it's perpendicular to the relative airflow. Racing car wings make downforce.
Q: What are the main types of drag? | Form (pressure) drag, skin friction, induced drag and wave drag.
Q: What causes a wing to stall? | At high angle of attack the boundary layer separates, so lift falls and drag rises.
M1: Doubling airspeed multiplies lift (same C_{L}) by: | 4 | 2 | √2 | 8 | ∝ v^{2}.
M2: Golf-ball dimples reduce drag by: | Making the boundary layer turbulent, delaying separation | Making the ball smoother | Reducing mass | Increasing lift only | Smaller wake, less form drag.
T: Drag coefficient | C_{d}, in F_{D} = ½ρv^{2}C_{d}A
T: Lift coefficient | C_{L}, in F_{L} = ½ρv^{2}C_{L}A
T: Angle of attack | The angle between a wing's chord and the oncoming air
SUM: Both drag and lift scale as ½ρv^{2}A times a coefficient that depends on shape and Re.
SUM: A wing turns the air downward; the reaction and the pressure difference (lower above) give lift.
SRC: Anderson J. D., Fundamentals of Aerodynamics, 6th edition, McGraw-Hill | secondary | 2017
SRC: NASA Glenn Research Center, "Incorrect Lift Theory: Equal Transit" | guidance | 2021 | https://www.grc.nasa.gov/www/k-12/airplane/wrong1.html
EV: established | Lift is well understood via circulation (Kutta–Joukowski); the "equal transit time" explanation is wrong.
Q: Why is the "equal transit time" explanation of lift wrong? | Air over the top doesn't need to meet the air underneath at the trailing edge; it actually arrives earlier.
M3@2,3: An aircraft's speed doubles at the same angle of attack and air density. What happens to its lift? | It quadruples | It doubles | It stays the same | It halves | F_{L} = ½ρv^{2}C_{L}A ∝ v^{2}, so doubling v gives four times the lift.
SA2@2: Explain why aircraft extend flaps for landing. | Landing needs low speed, but lift ∝ v^{2}. Flaps increase the wing's camber and area, raising C_{L} and A, so enough lift is produced at a lower speed. They also add drag, which helps slow the aircraft. | low landing speed reduces lift ; flaps raise C_{L} and area ; same lift at lower speed ; extra drag helps slowing

## Boundary layers
S: At a solid surface a real fluid sticks (no-slip), so a thin boundary layer forms in which the velocity rises from zero to the free-stream value. Prandtl's insight (1904) that viscosity matters only in this layer made aerodynamics calculable.
LV: Advanced · Foundation
O: Explain the no-slip condition and the formation of a boundary layer
O: Describe boundary-layer separation and its effect on drag
PRE: Viscosity
H: Properties
E: δ ≈ 5x/√(Re_{x}) :: laminar boundary-layer thickness at distance x along a plate
- Outside the layer the flow is nearly inviscid (Euler/Bernoulli applies).
- The layer thickens downstream and turns turbulent at Re_{x} ~ 5 × 10^{5}.
- Turbulent layers are thicker, have more skin friction, but resist separation better.
H: Separation
P: Where pressure rises downstream (adverse pressure gradient, as at the back of a sphere or the top of a stalling wing), slow fluid near the wall can't push on, reverses and lifts the flow off the surface. Separation creates wakes and form drag. Vortex generators on wings energise the layer to delay it.
X: Find the laminar boundary-layer thickness 0.5 m along a plate in air at 10 m s^{-1} (ν = 1.5 × 10^{-5}).
> Re_{x} = 10 × 0.5/1.5 × 10^{-5} = 3.3 × 10^{5}
> δ ≈ 5 × 0.5/577 ≈ 4.3 mm
!: The no-slip condition holds even for "slippery" fluids like air; it's the velocity gradient in the thin layer that creates skin friction.
Q: What is the no-slip condition? | A viscous fluid in contact with a solid surface moves with the surface (zero relative velocity).
Q: What causes boundary-layer separation? | An adverse pressure gradient slows near-wall fluid until it reverses.
M1: Outside the boundary layer, the flow can often be treated as: | Inviscid | Highly viscous | Stationary | Supersonic | Prandtl's division.
M2: Vortex generators on wings: | Delay separation by mixing faster air into the boundary layer | Increase weight | Generate thrust | Reduce lift deliberately | They re-energise the boundary layer.
T: No-slip condition | A viscous fluid has zero velocity relative to a solid surface it touches
T: Boundary layer | The thin layer near a surface in which viscosity slows the flow
T: Flow separation | Detachment of the boundary layer from a surface, leaving a wake
SUM: Outside the boundary layer the flow is nearly inviscid; inside it viscosity dominates (Prandtl, 1904).
SUM: Laminar thickness grows as √(νx/U); separation in an adverse pressure gradient causes pressure drag and stall.
SRC: Prandtl L., "Über Flüssigkeitsbewegung bei sehr kleiner Reibung", Proceedings of the Third International Mathematical Congress, Heidelberg, 484–491 | primary | 1904
SRC: Schlichting H., Gersten K., Boundary-Layer Theory, 9th edition, Springer | secondary | 2017
EV: established | Boundary-layer theory is foundational and well verified.
Q: Why does a dimpled golf ball fly further than a smooth one? | The dimples make the boundary layer turbulent, so it stays attached longer, the wake narrows and drag falls.
M3@2,3: What causes an aircraft wing to stall at high angle of attack? | The boundary layer separates from the upper surface, collapsing lift | The air becomes compressible over the wing's upper surface | The engines can no longer supply enough thrust to hold speed | Air density falls suddenly when the angle of attack is high | A steep adverse pressure gradient on the upper surface makes the flow detach, so lift falls and drag rises.
SA2@1,2: Explain how Prandtl's boundary-layer idea resolved d'Alembert's paradox (that inviscid flow predicts zero drag). | Inviscid theory ignores the thin layer where viscosity acts, so it predicts symmetric pressure and no drag. Prandtl showed viscosity matters in a thin boundary layer, which can separate and form a wake; the low pressure in the wake and skin friction give the real drag. | inviscid theory predicts zero drag ; viscosity confined to a thin layer ; separation creates a wake ; wake pressure and friction cause drag

## Surface tension
S: Molecules at a liquid's surface are pulled inward by their neighbours, so the surface behaves like a stretched membrane. Surface tension lets insects walk on water, shapes droplets and bubbles, and drives capillary rise.
LV: Introductory · Foundation
O: Define surface tension as force per length and energy per area
O: Calculate the extra pressure inside drops and bubbles
PRE: Density and pressure
H: Definitions
E: γ = F/L = surface energy per unit area (N m^{-1} = J m^{-2})
E: Δp = 2γ/R :: pressure inside a droplet (Laplace)
E: Δp = 4γ/R :: soap bubble (two surfaces)
- Water 0.072 N m^{-1} at 20 °C; mercury 0.49; ethanol 0.022.
- Surfactants (soap) lower γ; temperature lowers it too.
H: Effects
- Droplets are spherical (minimum surface for volume).
- Small bubbles have higher internal pressure than large ones: connected bubbles, the small one empties into the large one.
- Lungs use surfactant to stop small alveoli collapsing.
- The Marangoni effect: flow from low to high surface tension (tears of wine).
X: Find the excess pressure inside a 1 μm radius water droplet.
> Δp = 2 × 0.072/10^{-6} = 1.4 × 10^{5} Pa: over an atmosphere
!: Soap bubbles have two surfaces, so their excess pressure is 4γ/R, twice that of a droplet.
Q: Why are small droplets spherical? | Surface tension minimises surface area, and a sphere has the least area for its volume.
Q: What is the excess pressure inside a soap bubble? | 4γ/R.
M1: Adding soap to water: | Lowers its surface tension | Raises it | Has no effect | Makes it zero | Surfactants accumulate at the surface.
M2: Two connected soap bubbles of different sizes will: | The smaller empties into the larger | The larger empties into the smaller | They equalise in size | Nothing happens | Smaller R ⇒ higher pressure.
T: Surface tension | γ, the force per unit length along a liquid surface, or its energy per unit area
T: Laplace pressure | The pressure excess inside a curved surface: 2γ/r for a drop
SUM: Water γ ≈ 0.072 N m^{-1} at 25 °C; detergents lower it.
SUM: Drop: Δp = 2γ/r; soap bubble (two surfaces): Δp = 4γ/r.
SRC: de Gennes P.-G., Brochard-Wyart F., Quéré D., Capillarity and Wetting Phenomena, Springer | secondary | 2004
SRC: OpenStax, College Physics 2e, section 11.8 "Cohesion and Adhesion in Liquids" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/11-8-cohesion-and-adhesion-in-liquids-surface-tension-and-capillary-action
EV: established | Standard surface physics; values depend on temperature and purity.
Q: Why are small drops nearly spherical? | Surface tension minimises surface area, and for small drops it dominates gravity.
M3@2,3: Two soap bubbles of different sizes are joined by a tube. What happens? | The small one shrinks into the large one, since its pressure 4γ/r is higher | The large one shrinks into the small one, since it holds more air | They exchange air until they reach exactly equal sizes | Nothing happens, because the pressures inside are already equal | Smaller r means higher internal pressure, so air flows from the small bubble to the large one.
SA2@1: Find the pressure excess inside a water droplet of radius 1.0 μm (γ = 0.072 N m^{-1}). | Δp = 2γ/r = 2 × 0.072/(1.0 × 10^{-6}) = 1.4 × 10^{5} Pa, about 1.4 atmospheres above the surroundings. | Δp = 2γ/r ; substitute r in metres ; 1.4 × 10^{5} Pa ; about 1.4 atm

## Capillary action
S: Capillary action is the rise or fall of a liquid in a narrow tube because of the balance between adhesion to the walls, cohesion within the liquid and surface tension. It moves water in soil, paper towels and plants.
LV: Introductory · Application
O: Explain capillary rise from adhesion, cohesion and the contact angle
O: Calculate the height of capillary rise
PRE: Surface tension
H: Jurin's law
E: h = 2γ cos θ/(ρgr)
- θ is the contact angle: < 90° (wetting, e.g. water on glass, rises); > 90° (non-wetting, e.g. mercury on glass, falls).
- Height ∝ 1/r: narrower tubes, higher rise.
H: Wetting
- Contact angle set by surface energies (Young's equation: γ_{SV} = γ_{SL} + γ_{LV} cos θ).
- Hydrophobic surfaces (lotus leaves, θ > 150°) make water bead and roll off, self-cleaning.
- Capillary forces make wet sand stick together and wet hair clump.
H: In plants
P: Capillarity alone raises water only centimetres in xylem (r ~ 20 μm gives ~0.7 m). Tall trees rely on transpiration: evaporation from leaves pulls water up under tension (cohesion–tension theory), with negative pressures of −1 to −2 MPa.
X: How high does water rise in a 0.1 mm radius glass capillary (θ ≈ 0)?
> h = 2 × 0.072/(1000 × 9.8 × 10^{-4}) = 0.15 m
!: Capillary rise in a tube doesn't create perpetual motion: water won't drip from the top, because the meniscus that lifts it also holds it there.
Q: State Jurin's law. | h = 2γ cos θ/(ρgr).
Q: Why does mercury fall in a glass capillary? | Its contact angle exceeds 90° (it doesn't wet glass).
M1: Halving a capillary tube's radius makes the rise: | Twice as high | Half as high | Four times higher | Unchanged | h ∝ 1/r.
M2: How do tall trees lift water? | Transpiration pull with cohesion–tension | Capillary rise alone | Root pressure alone | Atmospheric pressure | Capillarity gives under a metre.
T: Contact angle | θ, the angle a liquid surface makes with a solid; below 90° the liquid wets it
T: Capillary rise | Jurin's law: h = 2γ cos θ/(ρgr)
SUM: Water rises in clean glass (θ ≈ 0); mercury falls (θ ≈ 140°).
SUM: h ∝ 1/r: narrower tubes give higher rise.
SRC: de Gennes P.-G., Brochard-Wyart F., Quéré D., Capillarity and Wetting Phenomena, chapter 1, Springer | secondary | 2004
SRC: OpenStax, College Physics 2e, section 11.8 "Cohesion and Adhesion in Liquids" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/11-8-cohesion-and-adhesion-in-liquids-surface-tension-and-capillary-action
EV: established | Jurin's law is accurate for narrow tubes; sap rise in tall trees also needs transpiration-driven tension.
Q: Why does mercury fall in a glass capillary? | It doesn't wet glass (contact angle above 90°), so cos θ is negative.
M3@2,3: How high does water rise in a clean glass tube of radius 0.10 mm (γ = 0.072 N m^{-1}, g = 9.8 m s^{-2})? | About 15 cm | About 1.5 cm, using r = 1 mm | About 1.5 m, using r = 10 μm | About 7.3 cm, missing the factor 2 | h = 2γ/(ρgr) = 0.144/(1000 × 9.8 × 1.0 × 10^{-4}) ≈ 0.147 m.
SA2@2: Explain why capillary action alone can't lift water to the top of a 100 m redwood tree. | Xylem vessels are about 20–200 μm wide; Jurin's law gives rises of under a metre for these sizes. Trees instead pull water up by evaporation from leaves (transpiration), which puts the water column under tension; cohesion holds the column together. | xylem radius gives capillary rise under a metre ; far less than 100 m ; transpiration pulls water ; cohesion keeps the column intact

## Compressible and incompressible fluids
S: Liquids barely change volume under pressure; gases compress easily. But what matters for flow is the Mach number: gas flows slower than about 0.3 of the speed of sound can be treated as incompressible.
LV: Intermediate · Foundation
O: Use the Mach number to decide when compressibility matters
O: Calculate the speed of sound from the bulk modulus
PRE: Bernoulli's equation
H: Compressibility
E: β = −(1/V)(∂V/∂p) = 1/K :: K = bulk modulus
E: c = √(K/ρ) :: speed of sound; for ideal gases c = √(γRT/M)
E: Ma = v/c :: Mach number
- Density changes ∝ Ma^{2}: at Ma = 0.3, about 4.5%.
H: Regimes
- **Ma < 0.3**: incompressible approximation fine (most liquids, cars, birds).
- **0.3 < Ma < 0.8**: subsonic compressible.
- **0.8–1.2**: transonic; local shocks on wings.
- **> 1**: supersonic; shock waves. **> 5**: hypersonic.
H: Water hammer
P: Even "incompressible" water transmits pressure at ~1500 m s^{-1}, not instantly. Shutting a valve suddenly creates a pressure wave Δp = ρcΔv, which can burst pipes (and makes pipes bang).
X: Is airflow around a car at 30 m s^{-1} compressible?
> c ≈ 343 m s^{-1}; Ma ≈ 0.09
> Density changes ~0.4%: treat as incompressible
!: Incompressible doesn't mean absolutely rigid: sound still travels through it at a finite speed.
Q: When can a gas flow be treated as incompressible? | When the Mach number is below about 0.3.
Q: What is water hammer? | A pressure surge when flow in a pipe is stopped suddenly, Δp = ρcΔv.
M1: An aircraft at Mach 0.85 is in which regime? | Transonic | Incompressible | Hypersonic | Supersonic | Local supersonic regions form on the wing.
M2: Sound travels faster in water than in air mainly because: | Water's bulk modulus is much higher | Water is denser | Water is warmer | Air is compressible only at high speed | c = √(K/ρ): K is ~15 000 times larger.
T: Mach number | Ma = v/c, the flow speed divided by the speed of sound
T: Bulk modulus | K = −V dp/dV, resistance to compression; c = √(K/ρ)
SUM: Below about Ma = 0.3, density changes under 5% and flow can be treated as incompressible.
SUM: Sound speed: air about 343 m s^{-1} at 20 °C, water about 1480 m s^{-1}.
SRC: White F. M., Fluid Mechanics, 8th edition, chapter 9, McGraw-Hill | secondary | 2016
SRC: Anderson J. D., Modern Compressible Flow, 3rd edition, McGraw-Hill | secondary | 2003
EV: established | Standard gas dynamics.
Q: At what Mach number does compressibility start to matter in air flow? | About 0.3 (about 100 m s^{-1} at sea level).
M3@2,3: Water has K ≈ 2.2 × 10^{9} Pa. What is its speed of sound? | About 1500 m s^{-1} | About 340 m s^{-1}, as in air | About 47 m s^{-1}, from √(K)/ρ | About 2.2 × 10^{6} m s^{-1}, from K/ρ | c = √(K/ρ) = √(2.2 × 10^{6}) ≈ 1480 m s^{-1}.
SA2@1,2: Explain why airflow around a car at 30 m s^{-1} is treated as incompressible but around an airliner at 250 m s^{-1} isn't. | For the car Ma ≈ 30/340 ≈ 0.09, so density changes are under 1% and can be ignored. For the airliner Ma ≈ 0.85, so pressure changes compress the air substantially and shock waves can form; compressible equations are needed. | car Ma about 0.09 ; small density changes ; airliner Ma about 0.85 ; compressibility and shocks matter

## Navier–Stokes equations
S: The Navier–Stokes equations are Newton's second law for a viscous fluid. They describe almost all fluid flow, from blood to weather to galaxies, yet whether smooth solutions always exist in 3D is one of the Millennium Prize problems.
LV: Advanced · Foundation
O: Interpret each term of the incompressible Navier–Stokes equation
O: Explain why the equations are hard to solve
PRE: Conservation of mass in fluid flow
H: The equations (incompressible)
E: ρ(∂v/∂t + (v·∇)v) = −∇p + η∇^{2}v + f
E: ∇·v = 0
- Left: mass × acceleration of a fluid parcel. Right: pressure gradient, viscous force, body forces (gravity).
- The (v·∇)v term is nonlinear: the source of turbulence and of the equations' difficulty.
H: Limits
- Low Re: drop the inertial terms → Stokes flow (linear, reversible).
- High Re away from walls: drop viscosity → Euler equations.
- Exact solutions exist only for simple geometries (Poiseuille, Couette, Stokes' sphere).
H: Open problem
P: The Clay Institute offers $1 million for proving that 3D Navier–Stokes solutions stay smooth for all time (or finding a counterexample). In practice, they're solved numerically, and turbulence modelling is needed at high Re.
X: Derive Stokes' drag on a small sphere (outline).
> At low Re, solve η∇^{2}v = ∇p with ∇·v = 0, no-slip at the sphere
> Integrating stress over the surface gives F = 6πηrv
!: Navier–Stokes assumes a continuum; in very rarefied gases (mean free path comparable to the size), it breaks down and kinetic theory is needed.
Q: What does the (v·∇)v term represent? | Convective (inertial) acceleration, the nonlinear term responsible for turbulence.
Q: What is the Navier–Stokes Millennium problem? | To prove or disprove that smooth solutions of the 3D equations always exist for smooth initial conditions.
M1: The Navier–Stokes equations express conservation of: | Momentum | Charge | Entropy | Energy only | Newton's second law for fluids.
M2: At very low Reynolds number they reduce to: | Stokes flow | Euler equations | Bernoulli's equation | The wave equation | Inertial terms negligible.
T: Navier–Stokes equation | ρ(∂v/∂t + (v·∇)v) = −∇p + η∇^{2}v + f, Newton's second law for a viscous fluid
T: Advective term | (v·∇)v, the nonlinear term carrying momentum with the flow
SUM: Terms: acceleration (local + advective) = pressure gradient + viscous force + body force.
SUM: The nonlinear advective term causes turbulence; whether smooth 3D solutions always exist is an unsolved Millennium Prize problem.
SRC: Batchelor G. K., An Introduction to Fluid Dynamics, chapter 3, Cambridge University Press | secondary | 1967
SRC: Fefferman C. L., "Existence and smoothness of the Navier–Stokes equation", Clay Mathematics Institute Millennium Problems | primary | 2000 | https://www.claymath.org/millennium/navier-stokes-equation/
EV: established | The equations are extremely well tested for Newtonian fluids; their mathematical regularity in 3D is unproven.
Q: Which term of the Navier–Stokes equation makes it nonlinear? | The advective term (v·∇)v.
M3@2,3: In a very slow, viscous flow (Re ≪ 1), which terms dominate the Navier–Stokes equation? | Pressure gradient and viscous terms (Stokes flow) | Advective and time-derivative terms | Gravity alone | Advective term and pressure only | At low Re inertia is negligible, so the equation reduces to ∇p = η∇^{2}v, which is linear and reversible.
SA2@1,2: Explain the physical meaning of the viscous term η∇^{2}v. | It is the net viscous force per unit volume: viscosity diffuses momentum from faster to slower fluid, smoothing out velocity differences. ∇^{2}v is large where velocity varies sharply, as near walls, so that is where viscous forces matter most. | net viscous force per volume ; diffuses momentum ; smooths velocity differences ; largest where velocity varies sharply

## Euler equations for fluids
S: The Euler equations describe an inviscid fluid: Navier–Stokes without viscosity. They govern fast flows away from walls, sound waves, shock waves and much of astrophysical and atmospheric dynamics.
LV: Advanced · Foundation
O: State the Euler equations as Navier–Stokes without viscosity
O: Explain where inviscid flow is a good approximation
PRE: Navier–Stokes equations
H: The equations
E: ρ(∂v/∂t + (v·∇)v) = −∇p + ρg
E: ∂ρ/∂t + ∇·(ρv) = 0
- With an energy equation and an equation of state for compressible flow.
- Integrating along a streamline (steady flow) gives Bernoulli's equation.
H: Potential flow
P: If the flow is also irrotational (∇ × v = 0), v = ∇φ and, for incompressible flow, ∇^{2}φ = 0. Laplace's equation can be solved by superposing sources, sinks, vortices and uniform flow, giving flow round cylinders and wing sections.
H: D'Alembert's paradox
P: Steady potential flow around any body gives zero drag, contradicting experience. The resolution is the thin viscous boundary layer, which separates and leaves a wake. Viscosity matters even when it's tiny.
X: What is the pressure at the front stagnation point of a cylinder in a 50 m s^{-1} airflow?
> Bernoulli: Δp = ½ρv^{2} = 0.5 × 1.2 × 2500 = 1500 Pa above free-stream
!: Inviscid models predict lift reasonably (with the Kutta condition) but fail completely for drag.
Q: What is d'Alembert's paradox? | Inviscid, irrotational flow predicts zero drag on any body, contradicting observation.
Q: What equation does the velocity potential satisfy in incompressible potential flow? | Laplace's equation, ∇^{2}φ = 0.
M1: The Euler equations neglect: | Viscosity | Pressure | Inertia | Gravity | They're the inviscid limit.
M2: Integrating Euler's equation along a streamline in steady flow gives: | Bernoulli's equation | Poiseuille's law | Stokes' law | The continuity equation | Energy per unit volume conserved.
T: Inviscid flow | Idealised flow with no viscosity
T: Potential flow | Irrotational inviscid flow in which v = ∇φ
SUM: ρ Dv/Dt = −∇p + f; with irrotational flow they integrate to Bernoulli's equation.
SUM: Good far from walls at high Re; useless for drag without a boundary layer.
SRC: Batchelor G. K., An Introduction to Fluid Dynamics, chapters 3 and 6, Cambridge University Press | secondary | 1967
SRC: Acheson D. J., Elementary Fluid Dynamics, Oxford University Press | secondary | 1990
EV: established | Standard fluid dynamics.
Q: What do the Euler equations predict for the drag on a body in steady flow? | Zero (d'Alembert's paradox), because they omit viscosity.
M3@2,3: Why does potential-flow theory predict a wing's lift well but not its drag? | Lift comes from circulation, captured by the theory; drag comes from viscous effects the theory leaves out | Potential flow includes viscosity but leaves out the pressure field | Wings at cruise speed have no drag, so there is nothing to predict | Lift depends mainly on viscosity, while drag doesn't depend on it at all | With circulation set by the Kutta condition, the Kutta–Joukowski theorem gives lift; skin friction and wakes need viscosity.
SA2@2: Show how Bernoulli's equation follows from the Euler equations for steady flow along a streamline. | For steady flow the Euler equation is ρ(v·∇)v = −∇p − ρg ẑ. Along a streamline, (v·∇)v becomes v dv/ds. Integrating ρv dv + dp + ρg dz = 0 for constant ρ gives p + ½ρv^{2} + ρgz = constant. | steady Euler equation ; component along a streamline ; integrate with constant ρ ; Bernoulli's equation

## Vorticity and circulation
S: Vorticity measures local spinning of a fluid; circulation measures the total rotation around a loop. Vortices, from whirlpools to tornadoes to wingtip trails, are the "sinews" of fluid motion.
LV: Advanced · Foundation
O: Define vorticity and circulation and relate them by Stokes' theorem
O: Use Kelvin's circulation theorem and the Kutta–Joukowski lift theorem
PRE: Vector calculus theorems
H: Definitions
E: ω = ∇ × v :: vorticity, twice the local angular velocity of a fluid element
E: Γ = ∮v·dl = ∬ω·dA :: circulation (Stokes' theorem)
- Irrotational flow: ω = 0 (but a free vortex v = Γ/(2πr) is irrotational everywhere except its core).
H: Kelvin's circulation theorem
P: In an inviscid, barotropic fluid, circulation round a loop moving with the fluid stays constant. Vortex lines move with the fluid, and stretching a vortex makes it spin faster (like a skater): this concentrates rotation in tornadoes and in the drain vortex of a bath.
H: Examples
- Wingtip vortices: the trailing consequence of circulation around a lifting wing; a hazard for following aircraft.
- Smoke rings: stable vortex rings that carry fluid along.
- Kármán vortex streets behind cylinders: alternating vortices that can shake chimneys and power lines (Strouhal number ~0.2).
X: A vortex has Γ = 2 m^{2} s^{-1}. Find the speed 0.1 m from its axis.
> v = Γ/(2πr) = 2/(0.628) = 3.2 m s^{-1}
!: A fluid moving in circles needn't have vorticity, and a fluid moving in straight lines can (shear flow has vorticity).
Q: What is vorticity? | The curl of the velocity field, measuring local rotation of fluid elements.
Q: What does Kelvin's circulation theorem state? | In an ideal barotropic fluid, circulation around a material loop is conserved.
M1: Lift on a wing is related to: | Circulation around it (Kutta–Joukowski) | Its vorticity being zero | Its weight | Viscosity alone | L′ = ρvΓ.
M2: Stretching a vortex makes it: | Spin faster | Spin slower | Disappear | Reverse | Conservation of circulation with a smaller core.
T: Vorticity | ω = ∇ × v, twice the local angular velocity of a fluid element
T: Circulation | Γ = ∮v·dl, the total rotation around a closed loop
T: Kutta–Joukowski theorem | Lift per unit span = ρUΓ
SUM: Γ = ∫ω·dA (Stokes' theorem).
SUM: Kelvin: in inviscid flow circulation around a loop moving with the fluid is constant; vorticity can't be created there.
SRC: Acheson D. J., Elementary Fluid Dynamics, chapter 5, Oxford University Press | secondary | 1990
SRC: Saffman P. G., Vortex Dynamics, Cambridge University Press | secondary | 1992
EV: established | Standard results of fluid dynamics.
Q: Why does a bath plughole vortex spin faster as it narrows? | Angular momentum (circulation) is nearly conserved, so speed rises as the radius shrinks.
M3@2,3: A wing of span 30 m in 1.2 kg m^{-3} air at 70 m s^{-1} has circulation 150 m^{2} s^{-1}. What lift does Kutta–Joukowski give? | About 3.8 × 10^{5} N | About 1.3 × 10^{4} N, per metre only | About 1.3 × 10^{6} N, using v^{2} | About 6.3 × 10^{3} N, omitting the span | Lift = ρUΓ × span = 1.2 × 70 × 150 × 30 ≈ 3.8 × 10^{5} N.
SA2@1,2: Explain why smoke rings travel so far without breaking up. | A smoke ring is a vortex ring: fluid circulates around its core, and the circulation induces the ring to move forward. In nearly inviscid air Kelvin's theorem keeps the circulation almost constant, so the ring holds together until viscosity slowly diffuses it. | smoke ring is a vortex ring ; circulation drives it forward ; circulation conserved in near-inviscid flow ; viscosity eventually dissipates it

## Flow instabilities
S: A steady flow is unstable if small disturbances grow instead of dying out. Instabilities create waves, vortices, convection cells and eventually turbulence; they shape clouds, ocean currents and stars.
LV: Advanced · Foundation
O: Describe the Kelvin–Helmholtz, Rayleigh–Taylor and Rayleigh–Bénard instabilities
O: Explain the role of a dimensionless number in each onset
PRE: Vorticity and circulation
H: Classic instabilities
- **Kelvin–Helmholtz**: shear between two layers rolls up into billows (wind over water, cloud bands, Jupiter's belts).
- **Rayleigh–Taylor**: heavy fluid above light fluid under gravity; fingers of heavy fluid sink (supernova remnants, inertial-confinement fusion).
- **Rayleigh–Bénard**: fluid heated from below forms convection cells when the Rayleigh number exceeds ~1708.
- **Plateau–Rayleigh**: a liquid jet breaks into drops (inkjet printers, a dripping tap).
- **Taylor–Couette**: flow between rotating cylinders forms stacked toroidal vortices.
H: Linear stability analysis
P: Add a small perturbation e^{σt + ikx} to the steady state, linearise the equations, and find σ(k). If any mode has Re σ > 0, it grows: the flow is unstable, and the fastest-growing k sets the pattern's size.
X: Why does a thin stream of water from a tap break into drops?
> Surface tension favours smaller surface area
> Perturbations with wavelength longer than the jet's circumference (λ > 2πr) reduce area and grow: Plateau–Rayleigh
!: An instability's linear growth eventually saturates through nonlinear effects; linear theory predicts onset, not the final state.
Q: What causes Kelvin–Helmholtz instability? | Velocity shear across an interface between fluid layers.
Q: What is Rayleigh–Taylor instability? | The instability of a dense fluid above a lighter one in a gravitational field (or accelerating frame).
M1: Convection cells in a pan of heated oil come from: | Rayleigh–Bénard instability | Kelvin–Helmholtz | Plateau–Rayleigh | Taylor–Couette | Heating from below.
M2: In linear stability analysis, a flow is unstable if: | Some mode has a positive growth rate | All modes decay | The flow is steady | Re = 0 | Re σ > 0 for some k.
T: Kelvin–Helmholtz instability | Waves and rollers formed at a shear layer between two flows
T: Rayleigh–Taylor instability | Fingering when a heavy fluid sits on top of a lighter one
T: Rayleigh number | The dimensionless number setting the onset of convection in a heated layer (about 1708 for rigid plates)
SUM: An instability appears when a small disturbance grows instead of decaying.
SUM: Onset is set by a dimensionless number: Re for shear, Ra for convection, Richardson number for stratified shear.
SRC: Drazin P. G., Reid W. H., Hydrodynamic Stability, 2nd edition, Cambridge University Press | secondary | 2004
SRC: Chandrasekhar S., Hydrodynamic and Hydromagnetic Stability, Oxford University Press | secondary | 1961
EV: established | Classic, experimentally confirmed results of stability theory.
Q: What instability makes billow clouds look like breaking waves? | Kelvin–Helmholtz, at a shear between air layers.
M3@2,3: A thin layer of oil is heated from below. What happens once the Rayleigh number passes a critical value? | Convection cells form, as buoyancy beats viscosity and conduction | The layer freezes from the top down | Kelvin–Helmholtz waves form at the surface | Nothing: heat always conducts through | Below Ra_{c} heat conducts; above it buoyant plumes overcome viscous damping and thermal diffusion, forming Bénard cells.
SA2@1,2: Explain why a heavy fluid resting on a lighter one is unstable even if the interface starts flat. | Any tiny ripple lets heavy fluid dip down and light fluid rise, lowering the potential energy. Gravity drives the disturbance to grow, so fingers of heavy fluid fall and light fluid bubbles up; surface tension or viscosity can only delay short wavelengths. | ripple lowers potential energy ; gravity drives growth ; fingers form ; surface tension only stabilises short wavelengths

## Shock waves
S: When a disturbance moves through a fluid faster than sound, pressure waves can't get ahead of it and pile up into a shock: an extremely thin jump in pressure, density, temperature and velocity. Shocks produce sonic booms and heat supernova remnants.
LV: Advanced · Foundation
O: Explain how a shock wave forms in supersonic flow
O: Calculate the Mach cone angle
PRE: Compressible and incompressible fluids
H: Properties
- Thickness ~ a few mean free paths (micrometres in air).
- Flow behind a normal shock is subsonic; entropy increases across a shock (irreversible).
- Rankine–Hugoniot relations link the states either side from conservation of mass, momentum and energy.
E: sin μ = 1/Ma :: Mach cone half-angle
H: Examples
- Sonic booms from supersonic aircraft (double "N-wave").
- Bow shocks around supersonic bodies; Earth's magnetosphere's bow shock in the solar wind.
- Explosions and blast waves (Taylor–Sedov solution).
- Supernova shocks accelerate cosmic rays; shock-wave lithotripsy breaks kidney stones.
X: Find the Mach cone angle at Ma = 2.
> sin μ = 1/2 ⇒ μ = 30°
!: A sonic boom isn't heard only when an aircraft "breaks the sound barrier"; it's dragged continuously along the ground for as long as the plane flies supersonically.
Q: What is the Mach angle? | The half-angle of the shock cone: sin μ = 1/Ma.
Q: What happens to entropy across a shock? | It increases: shocks are irreversible.
M1: Behind a normal shock, flow is: | Subsonic | Supersonic | Stationary | At Mach 1 exactly | A normal shock decelerates flow to subsonic.
M2: A bullet's shock cone is narrower when it travels: | Faster | Slower | At Mach 1 | It doesn't depend on speed | sin μ = 1/Ma.
T: Shock wave | A thin region where pressure, density and temperature jump abruptly
T: Mach cone | The cone of pressure waves trailing a supersonic object, half-angle sin^{-1}(1/Ma)
T: Sonic boom | The pressure jump heard on the ground as a supersonic aircraft's shock passes
SUM: Sound waves can't move ahead of a supersonic object, so they pile up into a shock.
SUM: Across a normal shock, flow goes from supersonic to subsonic and entropy increases.
SRC: Anderson J. D., Modern Compressible Flow, 3rd edition, chapters 3–4, McGraw-Hill | secondary | 2003
SRC: OpenStax, University Physics Volume 1, section 17.8 "The Doppler Effect" (shock waves) | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/17-8-the-doppler-effect
EV: established | Standard gas dynamics.
Q: Is a sonic boom made only once, when the aircraft "breaks the sound barrier"? | No: it is produced continuously and sweeps the ground all the time the aircraft flies supersonically.
M3@2,3: An aircraft flies at Mach 2.0. What is the half-angle of its Mach cone? | 30° | 60°, from cos^{-1}(½) | 45°, as for any supersonic flight | 2°, equal to the Mach number | sin θ = 1/Ma = 0.5, so θ = 30°.
SA2@1,2: Explain why a bullwhip cracks. | As the whip unrolls, the moving loop carries energy into ever less mass towards the tip, so the tip accelerates. It exceeds the speed of sound (over 343 m s^{-1}), creating a small shock wave: the crack is a miniature sonic boom. | energy concentrates in a smaller mass ; tip accelerates ; exceeds the speed of sound ; shock wave produces the crack

## Turbulence modelling
S: Turbulence spans a huge range of scales, so simulating every eddy is usually impossible. Turbulence models represent the effect of unresolved eddies on the resolved flow, trading accuracy for computational cost.
LV: Advanced · Foundation
O: Describe the energy cascade and the Kolmogorov scale
O: Compare DNS, LES and RANS approaches
PRE: Laminar and turbulent flow
H: Kolmogorov theory
E: E(k) ∝ ε^{2/3}k^{−5/3} :: energy spectrum in the inertial range
E: η_{K} = (ν^{3}/ε)^{1/4} :: smallest (dissipation) eddy size
- Resolving all scales needs ~Re^{9/4} grid points: ~10^{16} for an aircraft wing (Re ~ 10^{7}).
H: Approaches
- **DNS** (direct numerical simulation): resolves everything; research only, low Re.
- **LES** (large-eddy simulation): resolves large eddies; models small ones with a subgrid model.
- **RANS** (Reynolds-averaged Navier–Stokes): solves for mean flow; models all fluctuations via eddy viscosity (k–ε, k–ω SST models). The industrial workhorse.
H: The closure problem
P: Averaging Navier–Stokes produces Reynolds stresses −ρ⟨v′_{i}v′_{j}⟩, new unknowns with no exact equations. Every model is an approximation that closes this system, validated against experiments; none is universal.
X: Estimate the smallest eddies in a room where a fan dissipates ε = 0.01 W kg^{-1} (ν = 1.5 × 10^{-5}).
> η_{K} = ((1.5 × 10^{-5})^{3}/0.01)^{1/4} ≈ 0.7 mm
!: RANS models give time-averaged results; they can't predict individual eddies, noise or unsteady loads well.
Q: What is Kolmogorov's −5/3 law? | In the inertial range, turbulent kinetic energy per wavenumber scales as k^{−5/3}.
Q: What is the turbulence closure problem? | Averaging Navier–Stokes creates unknown Reynolds stresses that must be modelled.
M1: Which approach resolves all scales of turbulence? | DNS | RANS | LES | k–ε model | Direct numerical simulation.
M2: LES models: | Only the smallest eddies | All eddies | Only the mean flow | Nothing; it's exact | Large eddies resolved, subgrid modelled.
T: Energy cascade | Transfer of kinetic energy from large eddies to smaller ones until viscosity dissipates it
T: Kolmogorov scale | η = (ν^{3}/ε)^{1/4}, the size of the smallest eddies
T: RANS | Reynolds-averaged Navier–Stokes: solving for the mean flow with a model for turbulent stresses
SUM: Kolmogorov 1941: in the inertial range, energy spectrum E(k) ∝ k^{−5/3}.
SUM: DNS resolves every eddy (cost ~Re^{3}); LES resolves large eddies and models small ones; RANS models all fluctuations.
SRC: Pope S. B., Turbulent Flows, Cambridge University Press | secondary | 2000
SRC: Kolmogorov A. N., "The local structure of turbulence in incompressible viscous fluid for very large Reynolds numbers", Doklady Akademii Nauk SSSR 30, 301–305 | primary | 1941
EV: established | The −5/3 law is well confirmed; small corrections (intermittency) remain an active research topic.
Q: Why is direct numerical simulation of an airliner's airflow impossible today? | The range of eddy sizes is so large that the grid points needed scale roughly as Re^{9/4}, far beyond any computer at Re ~ 10^{7}.
M3@2,3: How does the ratio of largest to smallest eddy size scale with Reynolds number? | As Re^{3/4} | As Re | As Re^{1/2} | As Re^{2} | Kolmogorov scaling gives L/η ~ Re^{3/4}, so a 3D grid needs about Re^{9/4} points.
SA2@1,2: Explain the idea of the turbulent energy cascade in a stirred cup of tea. | Stirring makes eddies the size of the cup. These break up into smaller eddies, passing their energy down a chain of sizes with little loss, until eddies are so small (around a tenth of a millimetre) that viscosity turns their energy into heat. | energy put in at large scales ; large eddies break into smaller ones ; energy passed down with little loss ; dissipated by viscosity at the smallest scale

## Computational fluid dynamics
S: Computational fluid dynamics (CFD) solves the equations of fluid flow numerically. It's used to design aircraft, cars, turbines, heart valves and buildings, and to forecast weather, but its results are only as good as the mesh, models and validation behind them.
LV: Advanced · Application
O: Outline the steps of a CFD simulation: geometry, mesh, model, solve, verify
O: Explain how CFD results are verified and validated
PRE: Turbulence modelling
H: The workflow
- **Geometry and mesh**: divide the domain into cells; refine near walls and in regions of strong gradients.
- **Discretise**: finite volume (most common), finite element, finite difference, spectral, or particle methods (SPH, lattice Boltzmann).
- **Physics models**: turbulence, multiphase, combustion, heat transfer.
- **Solve** iteratively; check convergence (residuals fall).
- **Verify and validate**: mesh-independence study; compare with experiment.
H: Numerical issues
- CFL condition for explicit time-stepping: vΔt/Δx ≤ 1.
- Numerical diffusion can smear sharp features; shock-capturing schemes handle discontinuities.
- Boundary conditions (inlet, outlet, walls) often dominate errors.
X: How do you check a CFD drag prediction is mesh-independent?
> Run on coarse, medium and fine meshes (e.g. 1, 2, 4 million cells)
> If drag changes by less than ~1% between medium and fine, the mesh is adequate (Richardson extrapolation estimates the remaining error)
!: Colourful CFD plots aren't evidence. Without verification and validation, a converged simulation can be precisely wrong.
Q: What is the CFL condition? | For explicit schemes, information mustn't travel more than one cell per time step: vΔt/Δx ≤ 1.
Q: What is a mesh-independence study? | Refining the mesh until results stop changing significantly.
M1: The most common CFD discretisation in industry is: | Finite volume | Analytical solution | Monte Carlo | Lattice gauge | It conserves fluxes cell by cell.
M2: Validation in CFD means: | Comparing results with experimental data | Checking the code compiles | Making plots | Refining the mesh | Verification checks the maths; validation checks the physics.
T: Mesh | The grid of cells into which the flow domain is divided
T: Grid convergence | Refining the mesh until the results stop changing appreciably
T: Validation | Comparing simulation results with experiments
SUM: Steps: geometry → mesh → physics and turbulence model → boundary conditions → solve → check convergence → validate.
SUM: Verification asks "are we solving the equations right?"; validation asks "are we solving the right equations?"
SRC: Anderson J. D., Computational Fluid Dynamics: The Basics with Applications, McGraw-Hill | secondary | 1995
SRC: Oberkampf W. L., Roy C. J., Verification and Validation in Scientific Computing, Cambridge University Press | secondary | 2010
EV: established | Standard engineering practice; accuracy depends heavily on mesh and turbulence model.
Q: What is a grid-convergence study? | Running the simulation on finer and finer meshes to show the answer no longer depends on the mesh.
M3@2,3: A CFD drag prediction changes by 12% when the mesh is refined. What should the engineer conclude? | The result isn't mesh-converged yet; refine further before trusting it | The finer mesh must be wrong, as it's more complex | The turbulence model must be replaced at once | 12% is close enough for any design decision | A converged result changes little under refinement; a 12% change means discretisation error is still large.
SA2@1,2: Explain why wind tunnels are still used even though CFD is widely available. | CFD depends on turbulence models, meshes and boundary conditions that can give wrong answers, especially for separated flow. Wind-tunnel experiments validate the simulations and catch these errors; in practice the two are used together, with CFD for wide design searches and tunnels to confirm. | CFD relies on models and meshes ; can be wrong for complex flows ; experiments validate it ; used together
`;
