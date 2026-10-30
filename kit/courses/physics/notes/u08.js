// Unit 8: Fluid Mechanics. Format: kit/course/notes.js
export default `
## Density and pressure
S: Density is mass per unit volume; pressure is force per unit area acting perpendicular to a surface. In fluids, pressure acts equally in all directions at a point and is the key variable for both still and moving fluids.
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

## Hydrostatic equilibrium
S: In a fluid at rest, pressure increases with depth because each layer supports the weight of the fluid above it. The same balance between pressure gradient and gravity holds up oceans, atmospheres and stars.
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

## Pascal's principle
S: Pascal's principle states that a pressure change applied to an enclosed incompressible fluid is transmitted undiminished to every part of the fluid and its container walls. It's the basis of hydraulic machines.
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

## Buoyancy and Archimedes' principle
S: A body immersed in a fluid feels an upward buoyant force equal to the weight of fluid it displaces. Whether it floats or sinks depends on whether its average density is less or more than the fluid's.
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

## Fluid statics
S: Fluid statics covers fluids at rest: pressure distributions, forces on submerged surfaces, manometers and the stability of floating bodies. Because fluids at rest can't resist shear, every problem reduces to pressure balance.
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

## Fluid dynamics
S: Fluid dynamics studies fluids in motion: rivers, blood, weather, aircraft, stars. Flows are described by velocity fields v(r, t), and governed by conservation of mass, momentum and energy.
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

## Continuity equation
S: The continuity equation expresses conservation of mass in a flow. For an incompressible fluid in a pipe, the volume flow rate is the same everywhere, so the fluid speeds up where the pipe narrows.
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

## Conservation of mass in fluid flow
S: Mass can't be created or destroyed in a flow; it can only move. Writing this for a fixed control volume gives a balance between what flows in, what flows out and what accumulates, the template for all conservation laws in continuum physics.
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

## Bernoulli's equation
S: Along a streamline in steady, incompressible, frictionless flow, pressure energy, kinetic energy and potential energy per unit volume add to a constant. Where fluid speeds up, its pressure falls.
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

## Viscosity
S: Viscosity is a fluid's internal friction: its resistance to layers sliding past each other. Honey is viscous, air barely so, but viscosity governs everything from blood flow to the drag on a bacterium.
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

## Laminar and turbulent flow
S: In laminar flow, fluid moves in smooth parallel layers; in turbulent flow, it churns in irregular eddies at many scales. Which one occurs depends on the balance between inertia and viscosity, measured by the Reynolds number.
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

## Reynolds number
S: The Reynolds number is the ratio of inertial to viscous forces in a flow. It predicts whether flow is laminar or turbulent and lets engineers test scale models: flows with the same Re (and shape) behave the same way.
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

## Poiseuille flow
S: Poiseuille flow is steady laminar flow through a pipe. The velocity profile is parabolic, and the flow rate depends on the fourth power of the radius, which is why narrowed arteries matter so much.
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

## Drag and lift
S: A body moving through a fluid feels a force with two components: drag, opposing the relative motion, and lift, perpendicular to it. They come from pressure differences around the body and from viscous shear on its surface.
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

## Boundary layers
S: At a solid surface a real fluid sticks (no-slip), so a thin boundary layer forms in which the velocity rises from zero to the free-stream value. Prandtl's insight (1904) that viscosity matters only in this layer made aerodynamics calculable.
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

## Surface tension
S: Molecules at a liquid's surface are pulled inward by their neighbours, so the surface behaves like a stretched membrane. Surface tension lets insects walk on water, shapes droplets and bubbles, and drives capillary rise.
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

## Capillary action
S: Capillary action is the rise or fall of a liquid in a narrow tube because of the balance between adhesion to the walls, cohesion within the liquid and surface tension. It moves water in soil, paper towels and plants.
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

## Compressible and incompressible fluids
S: Liquids barely change volume under pressure; gases compress easily. But what matters for flow is the Mach number: gas flows slower than about 0.3 of the speed of sound can be treated as incompressible.
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

## Navier–Stokes equations
S: The Navier–Stokes equations are Newton's second law for a viscous fluid. They describe almost all fluid flow, from blood to weather to galaxies, yet whether smooth solutions always exist in 3D is one of the Millennium Prize problems.
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

## Euler equations for fluids
S: The Euler equations describe an inviscid fluid: Navier–Stokes without viscosity. They govern fast flows away from walls, sound waves, shock waves and much of astrophysical and atmospheric dynamics.
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

## Vorticity and circulation
S: Vorticity measures local spinning of a fluid; circulation measures the total rotation around a loop. Vortices, from whirlpools to tornadoes to wingtip trails, are the "sinews" of fluid motion.
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

## Flow instabilities
S: A steady flow is unstable if small disturbances grow instead of dying out. Instabilities create waves, vortices, convection cells and eventually turbulence; they shape clouds, ocean currents and stars.
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

## Shock waves
S: When a disturbance moves through a fluid faster than sound, pressure waves can't get ahead of it and pile up into a shock: an extremely thin jump in pressure, density, temperature and velocity. Shocks produce sonic booms and heat supernova remnants.
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

## Turbulence modelling
S: Turbulence spans a huge range of scales, so simulating every eddy is usually impossible. Turbulence models represent the effect of unresolved eddies on the resolved flow, trading accuracy for computational cost.
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

## Computational fluid dynamics
S: Computational fluid dynamics (CFD) solves the equations of fluid flow numerically. It's used to design aircraft, cars, turbines, heart valves and buildings, and to forecast weather, but its results are only as good as the mesh, models and validation behind them.
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
`;
