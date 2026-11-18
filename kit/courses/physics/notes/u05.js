// Unit 5: Rotational Mechanics. Format: kit/course/notes.js
export default `
## Angular displacement, velocity and acceleration
S: Rotation is described by the angle turned (angular displacement θ), its rate (angular velocity ω) and the rate of change of that (angular acceleration α). They play the roles of x, v and a for straight-line motion.
LV: Introductory · Foundation
O: Define angular displacement, angular velocity and angular acceleration, in radians
O: Use the constant-angular-acceleration equations
PRE: Circular motion
H: Definitions
E: θ = s/r (radians); ω = dθ/dt; α = dω/dt
E: ω = ω_{0} + αt; θ = ω_{0}t + ½αt^{2}; ω^{2} = ω_{0}^{2} + 2αθ :: constant α
- Units: rad, rad s^{-1}, rad s^{-2}. 1 rev = 2π rad; rpm × 2π/60 = rad s^{-1}.
- ω is a vector along the rotation axis (right-hand rule); finite rotations aren't vectors because they don't commute.
X: A fan speeds up from rest to 1200 rpm in 4.0 s. Find α and the turns made.
> ω = 1200 × 2π/60 = 126 rad s^{-1}; α = 126/4.0 = 31.4 rad s^{-2}
> θ = ½αt^{2} = 251 rad = 40 turns
!: Rotational formulas need radians; using degrees in v = ωr or s = rθ gives wrong answers.
Q: What are the rotational equivalents of v = u + at and s = ut + ½at^{2}? | ω = ω_{0} + αt and θ = ω_{0}t + ½αt^{2}.
Q: Which way does the angular velocity vector point? | Along the axis, given by the right-hand rule (fingers curl with the rotation, thumb points along ω).
M1: 300 rpm in rad s^{-1} is about: | 31.4 | 5 | 300 | 1885 | 300 × 2π/60.
M2: A wheel decelerates uniformly from 20 rad s^{-1} to rest in 10 revolutions. α = ? | −3.2 rad s^{-2} | −2 rad s^{-2} | −20 rad s^{-2} | −1 rad s^{-2} | ω^{2} = ω_{0}^{2} + 2αθ with θ = 20π: α = −400/(40π).
T: Angular displacement | θ, the angle turned about an axis, in radians
T: Angular acceleration | α = dω/dt, the rate of change of angular velocity
SUM: The rotational suvat equations mirror the linear ones: ω = ω_{0} + αt, θ = ω_{0}t + ½αt^{2}, ω^{2} = ω_{0}^{2} + 2αθ.
SUM: Use radians throughout; one revolution is 2π rad.
SRC: OpenStax, University Physics Volume 1, sections 10.1–10.2 | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/10-1-rotational-variables
SRC: Halliday D., Resnick R., Walker J., Fundamentals of Physics, 10th edition, chapter 10 | secondary | 2013
EV: established | Standard rotational kinematics.
Q: How many radians does a wheel turn in 10 revolutions? | 20π ≈ 62.8 rad.
M3@2: A fan spinning at 30 rad s^{-1} slows uniformly to rest in 6.0 s. How many revolutions does it make while stopping? | About 14 | About 90, from 30 × 6 / 2 in radians | About 29, from 30 × 6/2π | About 5, from 30/6 | θ = ½(ω_{0} + ω)t = ½ × 30 × 6.0 = 90 rad, and 90/2π ≈ 14 revolutions.
SA2@1,2: A wheel starts from rest with α = 2.0 rad s^{-2}. Find its angular velocity and the angle turned after 5.0 s. | ω = αt = 2.0 × 5.0 = 10 rad s^{-1}. θ = ½αt^{2} = ½ × 2.0 × 25 = 25 rad (about 4.0 revolutions). | ω = ω_{0} + αt ; 10 rad s^{-1} ; θ = ½αt^{2} ; 25 rad

## Angular and linear motion relationships
S: Each point on a rotating rigid body moves in a circle, with linear quantities equal to the angular ones times the radius. Points farther out move faster, which is why the rim of a wheel wears and the tip of a blade is the dangerous part.
LV: Introductory · Foundation
O: Convert between angular and linear quantities: s = rθ, v = rω, a_{t} = rα
O: Distinguish tangential from centripetal acceleration
PRE: Angular displacement, velocity and acceleration
H: Links
E: s = rθ; v = ωr; a_{t} = αr; a_{c} = ω^{2}r = v^{2}/r
E: v = ω × r :: vector form
- All points share θ, ω, α; v and a grow with r.
- Total acceleration of a point: √(a_{t}^{2} + a_{c}^{2}).
H: Gears and belts
P: Meshing gears and belts share the same linear speed at the contact: ω_{1}r_{1} = ω_{2}r_{2}. A small gear driving a large one reduces ω and increases torque.
X: A bicycle's 22 cm-radius chainring (pedals at 1.5 rev s^{-1}) drives a 5.5 cm sprocket on a 34 cm wheel. Find the bike's speed.
> Chain speed = 2π × 1.5 × 0.22 = 2.07 m s^{-1}
> Sprocket ω = 2.07/0.055 = 37.7 rad s^{-1}; wheel rim v = 37.7 × 0.34 = 12.8 m s^{-1}
!: For a wheel rolling along the ground, the contact point is momentarily at rest; v = ωr gives the speed of the centre, not of every point.
Q: How do the linear speeds of two meshing gears compare? | They're equal at the point of contact.
Q: What is the tangential acceleration of a point at radius r? | a_{t} = αr.
M1: A disc spins at 10 rad s^{-1}. A point 0.3 m from the axis moves at: | 3 m s^{-1} | 30 m s^{-1} | 0.03 m s^{-1} | 33 m s^{-1} | v = ωr.
M2: A 10-tooth gear drives a 40-tooth gear at 400 rpm. The large gear turns at: | 100 rpm | 1600 rpm | 400 rpm | 40 rpm | Speed ratio is the inverse of the teeth ratio.
T: Tangential acceleration | a_{t} = rα, the rate of change of speed along the circle
T: Radial (centripetal) acceleration | a_{c} = ω^{2}r, pointing to the centre
SUM: s = rθ, v = rω, a_{t} = rα, a_{c} = ω^{2}r = v^{2}/r.
SUM: A speeding-up wheel has both tangential and centripetal acceleration; they are perpendicular.
SRC: OpenStax, University Physics Volume 1, section 10.3 "Relating Angular and Translational Quantities" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/10-3-relating-angular-and-translational-quantities
SRC: Halliday D., Resnick R., Walker J., Fundamentals of Physics, 10th edition, chapter 10 | secondary | 2013
EV: established | Exact for rigid rotation, with θ in radians.
Q: What is the speed of the rim of a 0.30 m radius wheel at 20 rad s^{-1}? | v = ωr = 6.0 m s^{-1}.
M3@2,3: A point 0.50 m from an axis has ω = 4.0 rad s^{-1} and α = 6.0 rad s^{-2}. What is the size of its total acceleration? | 8.5 m s^{-2}, from √(8^{2} + 3^{2}) | 11 m s^{-2}, adding 8 and 3 directly | 3.0 m s^{-2}, the tangential part only | 8.0 m s^{-2}, the centripetal part only | a_{c} = ω^{2}r = 8.0 m s^{-2}, a_{t} = αr = 3.0 m s^{-2}; they are perpendicular, so |a| = √(64 + 9) ≈ 8.5 m s^{-2}.
SA2@1: Explain why points on a turning record player have the same angular velocity but different speeds. | The record is rigid, so every point turns through the same angle in the same time: the same ω. Speed is v = rω, so points further out cover a larger circle in the same time and move faster. | rigid body has one ω ; v = rω ; larger radius means larger circle ; outer points faster

## Torque and moment of force
S: Torque is the turning effect of a force: force times its perpendicular distance from the axis. It's what changes rotational motion, as force changes linear motion.
LV: Introductory · Foundation
O: Calculate torque as τ = rF sin θ and as a cross product
O: Find the net torque from several forces
PRE: Equilibrium and statics
H: Definitions
E: τ = r × F; |τ| = rF sin θ = F d_{⊥}
- d_{⊥} is the perpendicular distance from the axis to the line of action (the moment arm).
- A **couple**: two equal, opposite, parallel forces; zero net force, torque Fd about any point.
- Units N m (not joules, though dimensionally the same).
H: Everyday torque
- Door handles far from hinges; long spanners; cranks and pedals (max torque when horizontal).
- Engines quote torque: wheel force = engine torque × gear ratio / wheel radius.
X: A 30 N force pushes a 0.25 m spanner at 60° to the handle. Find the torque.
> τ = rF sin θ = 0.25 × 30 × sin 60° = 6.5 N m
!: Torque depends on where the axis is; always say about which point you take moments.
Q: What is the moment arm? | The perpendicular distance from the axis to the line of action of the force.
Q: What is a couple? | Two equal and opposite parallel forces with different lines of action, giving pure torque.
M1: A 20 N force acts 0.5 m from a pivot along a line through the pivot. Torque? | 0 | 10 N m | 40 N m | 20 N m | The moment arm is zero.
M2: Why is a door handle placed far from the hinges? | A larger moment arm gives more torque for the same force | It's easier to see | The door is lighter there | It reduces friction | τ = Fd_{⊥}.
T: Torque | τ = r × F, the turning effect of a force about an axis
T: Lever arm | The perpendicular distance from the axis to the line of action of the force
SUM: τ = rF sin θ = F × lever arm; unit N m (not joules).
SUM: Torque direction follows the right-hand rule; anticlockwise is usually taken as positive.
SRC: OpenStax, University Physics Volume 1, section 10.6 "Torque" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/10-6-torque
SRC: Kleppner D., Kolenkow R., An Introduction to Mechanics, 2nd edition, chapter 7, Cambridge University Press | secondary | 2014
EV: established | Standard mechanics.
Q: Why is a door handle placed far from the hinges? | A larger lever arm gives more torque for the same force.
M3@2: A 40 N force acts at the end of a 0.25 m spanner, at 30° to the spanner. What is the torque? | 5.0 N m | 10 N m, from Fr | 8.7 N m, using cos 30° | 2.5 N m, half of 5 N m | τ = rF sin θ = 0.25 × 40 × 0.5 = 5.0 N m.
SA2@1,2: Explain why torque is measured in N m but isn't the same as energy, even though the joule is also N m. | Torque is a vector (r × F) describing a turning effect, with the force perpendicular to r; work is a scalar (F·s) with the force along the displacement. They share dimensions but are different physical quantities; torque times angle (in radians) gives work. | torque is r × F ; work is F·s ; different physical meaning ; work = τθ

## Moment of inertia
S: Moment of inertia measures how hard it is to change an object's rotation. It depends not only on mass but on how far the mass sits from the axis, squared.
LV: Introductory · Foundation
O: Calculate the moment of inertia of point masses and use standard results for common shapes
O: Explain why the distribution of mass matters
PRE: Torque and moment of force
H: Definition
E: I = Σm_{i}r_{i}^{2} = ∫r^{2} dm
E: I = Mk^{2} :: radius of gyration k
H: Standard results (axis through the centre unless stated)
- Point mass at r: Mr^{2}. Thin ring/hoop: MR^{2}. Solid disc or cylinder: ½MR^{2}.
- Solid sphere: (2/5)MR^{2}. Thin spherical shell: (2/3)MR^{2}.
- Thin rod about centre: (1/12)ML^{2}; about one end: (1/3)ML^{2}.
- Rectangular plate about centre (axis ⊥ plate): (1/12)M(a^{2} + b^{2}).
X: Derive I for a uniform rod of length L about one end.
> dm = (M/L)dx; I = ∫_{0}^{L} x^{2}(M/L)dx
> I = ML^{2}/3
P: Flywheels put mass at the rim to maximise I for their mass; figure skaters reduce I by pulling arms in.
!: I depends on the axis chosen. The same rod has I = ML^{2}/12 about its centre and ML^{2}/3 about an end.
Q: What is the moment of inertia of a solid disc about its axis? | ½MR^{2}.
Q: Why does a hoop have a larger I than a disc of the same mass and radius? | All its mass is at the maximum radius.
M1: Which has the largest I for equal M and R? | Hoop | Solid disc | Solid sphere | Spherical shell | MR^{2} > (2/3) > ½ > (2/5).
M2: Two 1 kg masses sit 0.5 m either side of an axis on a light rod. I = ? | 0.5 kg m^{2} | 0.25 kg m^{2} | 1 kg m^{2} | 2 kg m^{2} | 2 × 1 × 0.25.
T: Moment of inertia | I = Σmr^{2}, resistance to change in rotation about a given axis
T: Radius of gyration | k, where I = Mk^{2}: the distance at which all the mass would give the same I
SUM: Rod about centre ML^{2}/12; about end ML^{2}/3; disc MR^{2}/2; ring MR^{2}; solid sphere 2MR^{2}/5.
SUM: I depends on the axis chosen as well as the mass.
SRC: OpenStax, University Physics Volume 1, section 10.5 "Calculating Moments of Inertia" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/10-5-calculating-moments-of-inertia
SRC: Halliday D., Resnick R., Walker J., Fundamentals of Physics, 10th edition, chapter 10 | secondary | 2013
EV: established | Standard results, derived by integration.
Q: Which has the larger moment of inertia: a ring or a disc of the same mass and radius? | The ring (MR^{2} vs MR^{2}/2): all its mass is at the rim.
M3@1,2: Masses of 2.0 kg sit at each end of a light 1.0 m rod. What is I about the rod's centre? | 1.0 kg m^{2} | 2.0 kg m^{2}, using r = 1.0 m for one mass | 4.0 kg m^{2}, using r = 1.0 m for both | 0.50 kg m^{2}, using one mass only | I = Σmr^{2} = 2 × 2.0 × 0.50^{2} = 1.0 kg m^{2}.
SA2@2: A figure skater can change her moment of inertia without changing her mass. Explain how, and why that matters. | I = Σmr^{2} depends on how far the mass is from the axis. Pulling arms in brings mass closer, reducing I; spreading them increases it. Because angular momentum Iω is conserved, a smaller I makes her spin faster. | I depends on distance squared ; arms in reduce I ; arms out increase I ; links to conservation of angular momentum

## Rotational kinetic energy
S: A spinning body stores kinetic energy because each part of it moves. For rotation about a fixed axis it's ½Iω^{2}; a body that rolls has both translational and rotational energy.
LV: Introductory · Application
O: Calculate rotational kinetic energy ½Iω^{2}
O: Combine translational and rotational kinetic energy for rolling bodies
PRE: Moment of inertia
H: Formulas
E: KE_{rot} = ½Iω^{2}
E: KE = ½Mv_{cm}^{2} + ½I_{cm}ω^{2} :: rolling or general motion
E: W = ∫τ dθ; P = τω :: rotational work and power
H: Flywheel storage
P: Flywheels store energy as rotation: grid frequency stabilisers, KERS in racing cars, and old steam engines smoothing power strokes. Energy is limited by the material's strength: rim stress ∝ ρv^{2}, so the best flywheels use strong, light carbon fibre spun very fast.
X: A 50 kg solid-disc flywheel of radius 0.4 m spins at 3000 rpm. Find its energy.
> I = ½ × 50 × 0.16 = 4.0 kg m^{2}; ω = 314 rad s^{-1}
> KE = ½ × 4.0 × 314^{2} = 197 kJ
!: For rolling objects, don't forget the rotational term; ignoring it makes them seem faster than they are.
Q: What is the power delivered by a torque? | P = τω.
Q: What is the total KE of a rolling object? | ½Mv^{2} + ½Iω^{2}.
M1: Doubling a flywheel's ω multiplies its stored energy by: | 4 | 2 | 8 | √2 | ∝ ω^{2}.
M2: A motor exerts 50 N m at 100 rad s^{-1}. Power? | 5 kW | 50 W | 500 W | 2 W | P = τω.
T: Rotational kinetic energy | ½Iω^{2}, the kinetic energy of rotation
T: Flywheel | A heavy wheel used to store energy as rotation
SUM: Total KE of a rolling body = ½Mv^{2} + ½I_{cm}ω^{2}.
SUM: For rolling without slipping, v = ωR, so KE = ½(M + I/R^{2})v^{2}.
SRC: OpenStax, University Physics Volume 1, section 10.4 "Moment of Inertia and Rotational Kinetic Energy" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/10-4-moment-of-inertia-and-rotational-kinetic-energy
SRC: Halliday D., Resnick R., Walker J., Fundamentals of Physics, 10th edition, chapter 10 | secondary | 2013
EV: established | Standard mechanics.
Q: What fraction of a rolling solid cylinder's kinetic energy is rotational? | One third: ½(½MR^{2})ω^{2} = ¼Mv^{2}, out of ¾Mv^{2}.
M3@2: A flywheel (I = 2.0 kg m^{2}) spins at 300 rad s^{-1}. How much energy does it store? | 90 kJ | 600 J, from Iω | 180 kJ, from Iω^{2} | 300 J, from ½Iω | KE = ½Iω^{2} = ½ × 2.0 × 9.0 × 10^{4} = 9.0 × 10^{4} J.
SA2@1,2: A solid ball rolls from rest down a 1.0 m high slope without slipping. Find its speed at the bottom (g = 9.8 m s^{-2}). | mgh = ½mv^{2} + ½(2/5)mR^{2}(v/R)^{2} = (7/10)mv^{2}. v = √(10gh/7) = √(14) ≈ 3.7 m s^{-1}, less than √(2gh) ≈ 4.4 m s^{-1} for sliding without friction. | energy conservation ; I = 2/5 mR^{2} and v = ωR ; v = √(10gh/7) ; about 3.7 m s^{-1}

## Angular momentum
S: Angular momentum is the rotational counterpart of linear momentum. For a rigid body about a fixed axis it's Iω; for a particle it's r × p. Torque changes it, just as force changes linear momentum.
LV: Introductory · Foundation
O: Calculate angular momentum for a particle (r × p) and a rigid body (Iω)
O: Use τ = dL/dt
PRE: Rotational kinetic energy
H: Definitions
E: L = r × p :: particle
E: L = Iω :: rigid body about a symmetry axis
E: τ = dL/dt :: rotational Newton's second law
- Units kg m^{2} s^{-1} (or J s, the same units as Planck's constant).
- A particle moving in a straight line has angular momentum about any point not on its line: L = mvd_{⊥}.
H: Quantum angular momentum
P: In quantum mechanics angular momentum is quantised: orbital L = √(l(l + 1))ħ, with z-component m_{l}ħ, and particles carry intrinsic spin (½ħ for electrons). Bohr's atom started from L = nħ.
X: Find the angular momentum of the Earth's orbit (m = 6.0 × 10^{24} kg, r = 1.5 × 10^{11} m, T = 1 year).
> v = 2πr/T = 3.0 × 10^{4} m s^{-1}
> L = mvr = 2.7 × 10^{40} kg m^{2} s^{-1}
!: L = Iω is only parallel to ω for rotation about a principal axis; for a lopsided body, L and ω point in different directions (see rigid-body dynamics).
Q: How is torque related to angular momentum? | τ = dL/dt.
Q: What is the angular momentum of a particle about a point? | L = r × p, magnitude mvd_{⊥}.
M1: A 2 kg disc (r = 0.5 m) spins at 4 rad s^{-1}. L = ? | 1 kg m^{2} s^{-1} | 2 kg m^{2} s^{-1} | 4 kg m^{2} s^{-1} | 0.5 kg m^{2} s^{-1} | I = ½ × 2 × 0.25 = 0.25; L = 1.
M2: A 10 N m torque acts for 3 s on a stationary wheel. Its angular momentum becomes: | 30 kg m^{2} s^{-1} | 3.3 kg m^{2} s^{-1} | 10 kg m^{2} s^{-1} | 0 | ΔL = τΔt.
T: Angular momentum | L = r × p for a particle; L = Iω for a rigid body about a fixed axis
T: Angular impulse | ∫τ dt, equal to the change in angular momentum
SUM: τ_{net} = dL/dt is the rotational form of Newton's second law.
SUM: A particle moving in a straight line has angular momentum about any point not on its line.
SRC: OpenStax, University Physics Volume 1, section 11.2 "Angular Momentum" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/11-2-angular-momentum
SRC: Kleppner D., Kolenkow R., An Introduction to Mechanics, 2nd edition, chapter 7, Cambridge University Press | secondary | 2014
EV: established | Standard mechanics.
Q: What is the unit of angular momentum? | kg m^{2} s^{-1} (equivalently J s).
M3@2,3: A 2.0 kg ball moves at 3.0 m s^{-1} in a straight line passing 4.0 m from point O at its closest. What is its angular momentum about O? | 24 kg m^{2} s^{-1} | 0, because it moves in a straight line | 6.0 kg m^{2} s^{-1}, just mv | 96 kg m^{2} s^{-1}, using r^{2} | L = mvd = 2.0 × 3.0 × 4.0 = 24 kg m^{2} s^{-1}, where d is the perpendicular distance; it is constant along the line.
SA2@2: A torque of 5.0 N m acts on a wheel for 4.0 s. By how much does its angular momentum change, and what is the new ω if I = 2.0 kg m^{2} and it started at rest? | ΔL = τΔt = 5.0 × 4.0 = 20 kg m^{2} s^{-1}. ω = L/I = 20/2.0 = 10 rad s^{-1}. | angular impulse τΔt ; ΔL = 20 kg m^{2} s^{-1} ; ω = L/I ; 10 rad s^{-1}

## Conservation of angular momentum
S: With no net external torque, a system's total angular momentum stays constant. A skater spins faster by pulling in her arms, collapsing stars become pulsars, and planets sweep equal areas in equal times, all because of this law.
LV: Introductory · Application
O: Apply conservation of angular momentum when the net external torque is zero
O: Explain why kinetic energy can change while angular momentum is conserved
PRE: Angular momentum
H: Consequences
E: I_{1}ω_{1} = I_{2}ω_{2} :: no external torque
- Reducing I increases ω; rotational KE rises, the extra energy coming from the work done pulling mass inwards.
- Central forces (gravity towards the Sun) exert no torque, so planetary L is constant: Kepler's second law.
- A cat twists to land on its feet with zero total L by rotating parts of its body in opposite directions.
X: A star of radius 7 × 10^{8} m rotating once per 30 days collapses to a 10 km neutron star. Estimate its new period.
> ω ∝ 1/R^{2} for constant L (I ∝ MR^{2})
> T_{new} = 30 days × (10^{4}/7 × 10^{8})^{2} = 30 × 86 400 × 2.0 × 10^{-10} s ≈ 0.5 ms: a millisecond pulsar
!: KE isn't conserved when a skater pulls in her arms; it increases. Angular momentum is the conserved quantity.
Q: Why do planets move faster near the Sun? | Gravity exerts no torque about the Sun, so L = mvr is constant; smaller r means larger v.
Q: Where does the extra kinetic energy come from when a skater pulls in her arms? | The work she does pulling her arms inward.
M1: A skater halves her moment of inertia. Her angular velocity: | Doubles | Halves | Quadruples | Stays the same | L constant.
M2: A child jumps onto the edge of a spinning roundabout. The roundabout: | Slows down | Speeds up | Keeps the same speed | Stops | Total I increases, so ω decreases.
T: Isolated (rotationally) | A system on which the net external torque is zero
SUM: No net external torque: I_{1}ω_{1} = I_{2}ω_{2}.
SUM: A skater pulling in her arms gains kinetic energy from the work her muscles do.
T: Kepler's second law | A planet sweeps out equal areas in equal times: a consequence of conserved angular momentum
SRC: OpenStax, University Physics Volume 1, section 11.3 "Conservation of Angular Momentum" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/11-3-conservation-of-angular-momentum
SRC: Feynman R. P., Leighton R. B., Sands M., The Feynman Lectures on Physics, vol. I, chapter 18 "Rotation in Two Dimensions" | secondary | 1963 | https://www.feynmanlectures.caltech.edu/I_18.html
EV: established | No violation of angular-momentum conservation has been observed.
Q: Why does a collapsing star spin faster? | Its radius and so its moment of inertia fall, and with no external torque Iω stays constant.
M3@2,3: A skater spinning at 2.0 rev s^{-1} pulls in her arms, halving her moment of inertia. What happens to her kinetic energy? | It doubles | It halves | It stays the same | It quadruples | ω doubles; KE = ½Iω^{2} = L^{2}/2I, so halving I doubles KE, supplied by her muscles.
SA2@1,2: A 2.0 kg disc (R = 0.20 m) spins at 10 rad s^{-1}. A 1.0 kg ring of the same radius is dropped onto it and they spin together. Find the final ω. | I_{disc} = ½ × 2.0 × 0.04 = 0.040 kg m^{2}; I_{ring} = 1.0 × 0.04 = 0.040 kg m^{2}. L = 0.040 × 10 = 0.40. ω = 0.40/0.080 = 5.0 rad s^{-1}. | moments of inertia found ; initial L = 0.40 kg m^{2} s^{-1} ; conserve L ; ω = 5.0 rad s^{-1}

## Rotational dynamics
S: Rotational dynamics applies τ = Iα (for a fixed axis) to find how torques change rotation. Problems with pulleys, wheels and hinged objects combine it with F = ma for the parts that translate.
LV: Intermediate · Application
O: Apply τ = Iα to bodies rotating about a fixed axis
O: Solve problems combining rotation and translation, such as a mass on a string round a pulley
PRE: Moment of inertia
H: The laws
E: Στ = Iα :: fixed axis
E: ΣF = Ma_{cm} :: for translation of the centre of mass
- Link equations through constraints: a = αr for a string unwinding without slipping.
H: Massive pulley (Atwood machine with a real pulley)
E: a = (m_{1} − m_{2})g/(m_{1} + m_{2} + I/R^{2})
P: The pulley's inertia appears as an extra effective mass I/R^{2}; tensions on either side now differ, since a net torque is needed to spin it up.
X: A 2.0 kg mass hangs from a string wrapped round a 4.0 kg solid cylinder (R = 0.1 m) on a fixed axle. Find a.
> mg − T = ma; TR = (½MR^{2})(a/R) ⇒ T = ½Ma
> a = mg/(m + M/2) = 19.6/4 = 4.9 m s^{-2}
!: With a massive pulley, the tension isn't the same on both sides; treating it as equal ignores the pulley's inertia.
Q: What is Newton's second law for rotation about a fixed axis? | Στ = Iα.
Q: How does a pulley's inertia enter an Atwood machine? | As an extra effective mass I/R^{2} in the denominator.
M1: A 6 N m torque acts on a body with I = 2 kg m^{2}. α = ? | 3 rad s^{-2} | 12 rad s^{-2} | 0.33 rad s^{-2} | 6 rad s^{-2} | α = τ/I.
M2: A yo-yo released from rest falls with acceleration: | Less than g | Equal to g | Greater than g | Zero | Some energy goes into rotation; tension acts upward.
T: τ = Iα | Newton's second law for rotation about a fixed axis
T: Massive pulley | A pulley whose moment of inertia matters, so the tension differs on each side
SUM: Write F = ma for each translating body and τ = Iα for each rotating one, linked by a = αR.
SUM: With a massive pulley the string tensions on the two sides are different.
SRC: OpenStax, University Physics Volume 1, section 10.7 "Newton's Second Law for Rotation" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/10-7-newtons-second-law-for-rotation
SRC: Halliday D., Resnick R., Walker J., Fundamentals of Physics, 10th edition, chapter 10 | secondary | 2013
EV: established | Standard mechanics.
Q: Why are the tensions different on the two sides of a massive pulley? | A net torque (T_{1} − T_{2})R is needed to give the pulley angular acceleration.
M3@2,3: A 1.0 kg mass hangs from a string wound round a disc pulley (M = 2.0 kg, R = 0.10 m). What is the mass's acceleration (g = 9.8 m s^{-2})? | 4.9 m s^{-2} | 9.8 m s^{-2}, free fall | 3.3 m s^{-2}, as if the pulley were a 2 kg mass | 6.5 m s^{-2}, using I = MR^{2} | mg − T = ma and TR = (½MR^{2})(a/R) give a = mg/(m + M/2) = 9.8/2 = 4.9 m s^{-2}.
SA2@1: A grinding wheel (I = 0.50 kg m^{2}) at 100 rad s^{-1} is stopped by friction in 20 s. Find the average frictional torque. | α = −100/20 = −5.0 rad s^{-2}. τ = Iα = 0.50 × 5.0 = 2.5 N m, opposing the rotation. | find α ; −5.0 rad s^{-2} ; τ = Iα ; 2.5 N m

## Rolling without slipping
S: When a wheel rolls without slipping, its contact point is momentarily at rest, linking translation and rotation by v = ωR. Objects rolling down a slope accelerate at a rate set by how their mass is distributed.
LV: Intermediate · Application
O: Use v = ωR and a = αR for rolling without slipping
O: Rank how fast objects roll down a slope from their moments of inertia
PRE: Rotational kinetic energy
H: The constraint
E: v_{cm} = ωR; a_{cm} = αR
- Top of the wheel moves at 2v; contact point at 0.
- Static friction acts at the contact point; it does no work when there's no slipping.
H: Rolling down a slope
E: a = g sin θ/(1 + I/MR^{2})
E: v = √(2gh/(1 + I/MR^{2})) :: speed after descending height h
- Race down a slope: solid sphere (I/MR^{2} = 0.4) beats solid cylinder (0.5) beats hoop (1). Mass and radius don't matter, only shape.
X: A solid ball rolls from rest down a 1.0 m high ramp. Find its speed at the bottom.
> v = √(2 × 9.8 × 1.0/1.4) = 3.7 m s^{-1}
> A frictionless sliding block would reach 4.4 m s^{-1}
!: Friction is needed for rolling, but for pure rolling it's static and wastes no energy. (Rolling resistance from deformation is a separate effect.)
Q: Which reaches the bottom of a slope first: a solid sphere or a hoop? | The solid sphere (smaller I/MR^{2}).
Q: How fast does the top of a rolling wheel move? | 2v, twice the speed of the centre.
M1: For a hoop rolling down a slope, a = ? | ½g sin θ | g sin θ | (5/7)g sin θ | (2/3)g sin θ | I/MR^{2} = 1.
M2: What fraction of a rolling solid cylinder's KE is rotational? | 1/3 | 1/2 | 2/5 | 2/7 | Rotational ¼Mv^{2}, total ¾Mv^{2}.
T: Rolling without slipping | Rolling in which the contact point is instantaneously at rest: v = ωR
T: Static friction (rolling) | The friction that provides the torque for rolling; it does no work if there is no slipping
SUM: Down a slope, a = g sin θ/(1 + I/MR^{2}): sphere 5g sin θ/7, cylinder 2g sin θ/3, hoop g sin θ/2.
SUM: The result is independent of mass and radius; only the shape factor I/MR^{2} matters.
SRC: OpenStax, University Physics Volume 1, section 11.1 "Rolling Motion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/11-1-rolling-motion
SRC: Kleppner D., Kolenkow R., An Introduction to Mechanics, 2nd edition, chapter 7, Cambridge University Press | secondary | 2014
EV: established | Standard mechanics; rolling resistance is neglected.
Q: What is the speed of the top of a rolling wheel? | 2v: the centre moves at v and the top adds ωR = v.
M3@2: A solid sphere, a solid cylinder and a hoop roll down the same slope from rest. Which order do they reach the bottom? | Sphere, then cylinder, then hoop | Hoop, then cylinder, then sphere | All together, since mass cancels | Cylinder, then sphere, then hoop | The smaller I/MR^{2} (2/5, 1/2, 1), the less energy goes into rotation and the larger the acceleration.
SA2@1,2: Explain why friction is needed for a ball to roll down a slope, yet no energy is lost to it. | Without friction there'd be no torque about the centre and the ball would slide without spinning. Static friction at the contact point supplies the torque. Because the contact point is momentarily at rest, the friction force moves through no distance and does no work, so mechanical energy is conserved. | friction gives the torque ; without it the ball slides ; contact point at rest ; static friction does no work

## Rotational equilibrium
S: A body is in rotational equilibrium when the net torque on it is zero about every point. Combined with zero net force, this lets you solve for unknown forces in beams, ladders, cranes and limbs.
LV: Introductory · Application
O: State the conditions for rotational equilibrium
O: Solve for unknown forces using moments about a well-chosen point
PRE: Torque and moment of force
H: Method
- Draw a free-body diagram with forces at their points of action.
- Choose a pivot point that eliminates unknowns (torque of a force through that point is zero).
- Sum clockwise and anticlockwise moments: Στ = 0.
- Add force balance in x and y as needed.
H: Centre of gravity
P: The weight of a body can be taken to act at its centre of gravity. To find it experimentally, hang the body from two points; the plumb lines cross at the CG.
X: A uniform ladder (length 5 m, weight 200 N) leans against a smooth wall at 60° to the ground. Find the minimum friction coefficient at the floor.
> Floor: N = 200 N, friction f. Wall: horizontal force R = f
> Moments about the foot: R × 5 sin 60° = 200 × 2.5 cos 60° ⇒ R = 57.7 N
> μ ≥ 57.7/200 = 0.29
!: In equilibrium, net torque is zero about every point, so pick whichever point makes the algebra easiest.
Q: Why can you choose any point as the pivot in an equilibrium problem? | If net force and net torque are zero, the torque is zero about every point.
Q: How can you find the centre of gravity of an irregular sheet? | Hang it from two points; the vertical lines through the suspension points cross at the CG.
M1: A 1 m metre rule balances at 50 cm. A 100 g mass at 10 cm needs what mass at 90 cm to balance? | 100 g | 50 g | 200 g | 10 g | Equal arms.
M2: In the forearm, the biceps attaches 4 cm from the elbow; a 30 N load is held 35 cm away. Biceps force (ignoring the arm's weight)? | 262 N | 30 N | 3.4 N | 1050 N | 30 × 35/4.
T: Principle of moments | In equilibrium, total clockwise moment = total anticlockwise moment about any point
T: Couple | Two equal, opposite, parallel forces with different lines of action, giving pure torque
SUM: Equilibrium needs ΣF = 0 and Στ = 0 about every point; choose the point to remove unknowns.
SUM: A couple produces the same torque about every point.
SRC: OpenStax, University Physics Volume 1, section 12.1 "Conditions for Static Equilibrium" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/12-1-conditions-for-static-equilibrium
SRC: Hibbeler R. C., Engineering Mechanics: Statics, 14th edition, Pearson | secondary | 2016
EV: established | Standard mechanics.
Q: What is the torque of a couple of two 10 N forces 0.30 m apart? | 3.0 N m, the same about any point.
M3@2,3: A 3.0 m uniform plank of weight 120 N is hinged at a wall and held horizontal by a vertical rope at its far end. What is the rope tension? | 60 N | 120 N, the full weight | 40 N, a third of the weight | 240 N, twice the weight | Moments about the hinge: T × 3.0 = 120 × 1.5, so T = 60 N.
SA2@2: A seesaw is 4.0 m long, pivoted at the centre. A 30 kg child sits 1.6 m from the pivot. Where must a 40 kg child sit to balance it? | Moments: 30 × 1.6 = 40 × d, so d = 1.2 m on the other side (g cancels). | principle of moments ; g cancels ; 48 = 40d ; d = 1.2 m

## Parallel-axis theorem
S: The parallel-axis theorem gives the moment of inertia about any axis from the moment about a parallel axis through the centre of mass. It saves redoing integrals for pendulums, hinged doors and offset wheels.
LV: Intermediate · Application
O: State and apply the parallel-axis theorem
O: Explain why the centre-of-mass axis gives the smallest moment of inertia
PRE: Moment of inertia
H: The theorem
E: I = I_{cm} + Md^{2} :: d is the distance between the parallel axes
- I is always smallest about an axis through the centre of mass.
- Only works from the CM axis; to shift between two non-CM axes, go via the CM.
H: Physical pendulum
E: T = 2π√(I/(Mgd)) :: d = distance from pivot to CM
P: A rod swinging from one end has I = ML^{2}/12 + M(L/2)^{2} = ML^{2}/3 and d = L/2, giving T = 2π√(2L/3g): shorter than a simple pendulum of length L.
X: Find I for a solid disc (M = 2 kg, R = 0.2 m) about an axis through its rim, perpendicular to the disc.
> I = ½MR^{2} + MR^{2} = 1.5MR^{2}
> = 1.5 × 2 × 0.04 = 0.12 kg m^{2}
!: The theorem needs one of the two axes to pass through the centre of mass.
Q: State the parallel-axis theorem. | I = I_{cm} + Md^{2}.
Q: About which of a family of parallel axes is I smallest? | The one through the centre of mass.
M1: A rod's I about its centre is ML^{2}/12. About its end: | ML^{2}/3 | ML^{2}/4 | ML^{2}/12 | ML^{2} | Add M(L/2)^{2}.
M2: A solid sphere's I about a tangent axis is: | (7/5)MR^{2} | (2/5)MR^{2} | MR^{2} | (3/5)MR^{2} | (2/5) + 1.
T: Parallel-axis theorem | I = I_{cm} + Md^{2}, for an axis parallel to one through the centre of mass at distance d
SUM: I = I_{cm} + Md^{2}; the axis must be parallel to one through the centre of mass.
SUM: Of all parallel axes, the one through the centre of mass gives the smallest I.
T: Physical pendulum | A rigid body swinging about a pivot, with period 2π√(I/Mgd)
SRC: OpenStax, University Physics Volume 1, section 10.5 "Calculating Moments of Inertia" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/10-5-calculating-moments-of-inertia
SRC: Halliday D., Resnick R., Walker J., Fundamentals of Physics, 10th edition, chapter 10 | secondary | 2013
EV: established | A proven result for rigid bodies.
Q: Can the parallel-axis theorem link two axes neither of which passes through the centre of mass? | Not directly: go via the centre-of-mass axis.
M3@2: What is the moment of inertia of a uniform rod (mass M, length L) about one end, from the parallel-axis theorem? | ML^{2}/3 | ML^{2}/12, the centre value | ML^{2}/4, from Md^{2} alone | ML^{2}/2, as for a disc | I = ML^{2}/12 + M(L/2)^{2} = ML^{2}/12 + ML^{2}/4 = ML^{2}/3.
SA2@1,2: Find the moment of inertia of a solid disc (M = 2.0 kg, R = 0.10 m) about an axis through its rim, perpendicular to its face. | I_{cm} = ½MR^{2} = 0.010 kg m^{2}. Parallel-axis: I = 0.010 + 2.0 × 0.10^{2} = 0.030 kg m^{2} (= 3MR^{2}/2). | I_{cm} = ½MR^{2} ; add Md^{2} with d = R ; 0.030 kg m^{2} ; equals 3MR^{2}/2

## Perpendicular-axis theorem
S: For a flat (planar) object, the moment of inertia about an axis perpendicular to its plane equals the sum of the moments about two perpendicular axes lying in the plane and crossing at the same point.
LV: Intermediate · Application
O: State the perpendicular-axis theorem and when it applies
O: Use it to find moments of inertia of flat objects
PRE: Parallel-axis theorem
H: The theorem
E: I_{z} = I_{x} + I_{y} :: lamina in the xy-plane
- Only valid for thin flat objects (laminae).
- Combined with symmetry it finds in-plane moments quickly.
X: Find I for a thin ring about a diameter.
> About its axis, I_{z} = MR^{2}
> By symmetry I_{x} = I_{y}, so I_{x} = MR^{2}/2
X: A thin disc about a diameter.
> I_{z} = ½MR^{2}, so I_{diameter} = ¼MR^{2}
P: Proof: I_{z} = ∫(x^{2} + y^{2})dm = ∫x^{2}dm + ∫y^{2}dm = I_{y} + I_{x}, because for a lamina z = 0.
!: Don't apply the perpendicular-axis theorem to 3D bodies like spheres or thick cylinders; it fails because z ≠ 0.
Q: State the perpendicular-axis theorem. | For a lamina, I_{z} = I_{x} + I_{y} about perpendicular axes meeting at a point, with z perpendicular to the plane.
Q: What is the moment of inertia of a thin disc about a diameter? | ¼MR^{2}.
M1: A square plate has I = A about each in-plane axis through its centre parallel to the sides. About the perpendicular axis: | 2A | A | A/2 | 4A | I_{z} = I_{x} + I_{y}.
M2: The perpendicular-axis theorem applies to: | Thin flat objects | Any solid | Spheres only | Rods only | It requires the mass to lie in a plane.
T: Perpendicular-axis theorem | For a flat body in the xy-plane, I_{z} = I_{x} + I_{y}
T: Lamina | A flat object of negligible thickness
SUM: I_{z} = I_{x} + I_{y}, valid only for planar (flat) objects.
SUM: For a disc, I_{z} = ½MR^{2}, so each diameter has I = ¼MR^{2}.
SRC: Kleppner D., Kolenkow R., An Introduction to Mechanics, 2nd edition, chapter 7, Cambridge University Press | secondary | 2014
SRC: Riley K. F., Hobson M. P., Bence S. J., Mathematical Methods for Physics and Engineering, 3rd edition, Cambridge University Press | secondary | 2006
EV: established | A proven result for laminae.
Q: Why doesn't the perpendicular-axis theorem apply to a sphere? | It isn't flat: mass away from the plane contributes to I_{z} differently.
M3@2,3: What is the moment of inertia of a thin ring (mass M, radius R) about a diameter? | MR^{2}/2 | MR^{2}, as about its axis | MR^{2}/4, as for a disc | 2MR^{2}, adding two diameters | I_{z} = MR^{2} = I_{x} + I_{y}, and by symmetry I_{x} = I_{y}, so each is MR^{2}/2.
SA2@1: A square plate of mass M and side a has I = Ma^{2}/12 about each axis through its centre parallel to a side. Find I about the axis perpendicular to the plate through its centre. | By the perpendicular-axis theorem I_{z} = I_{x} + I_{y} = Ma^{2}/12 + Ma^{2}/12 = Ma^{2}/6. | plate is planar ; I_{z} = I_{x} + I_{y} ; Ma^{2}/6

## Gyroscopic motion
S: A spinning gyroscope resists changes in the direction of its axis. A torque doesn't tip it over; instead the axis swings sideways (precesses), because torque changes angular momentum in the direction of the torque.
LV: Intermediate · Foundation
O: Explain why a torque on a spinning body changes the direction of its angular momentum
O: Calculate a gyroscope's precession rate
PRE: Angular momentum
H: How it works
E: τ = dL/dt :: torque adds angular momentum in its own direction, perpendicular to L
- A fast-spinning wheel has large L; a small torque changes its direction slowly.
- Spin stabilisation: rifle bullets, frisbees, spinning satellites keep their orientation.
H: Uses
- Gyrocompasses align with the Earth's rotation axis.
- Inertial navigation (with accelerometers) in aircraft, submarines and spacecraft.
- Control moment gyros turn the ISS and space telescopes without fuel.
- MEMS vibrating gyroscopes in phones measure rotation via the Coriolis effect.
X: Why is a moving bicycle easier to balance than a stationary one?
> Spinning wheels' gyroscopic effects contribute, but the main stabiliser is steering geometry (trail) that turns the wheel into a lean
> Experiments with counter-rotating wheels show bicycles balance even without net gyroscopic effects
!: A gyroscope doesn't defy gravity; gravity's torque is what drives the precession, and friction eventually lets it fall.
Q: Why does a torque on a spinning gyroscope cause precession rather than toppling? | The torque changes L in its own direction, which is perpendicular to L, so L rotates sideways.
Q: Name two uses of gyroscopes. | Inertial navigation, gyrocompasses, spacecraft attitude control, phone motion sensing.
M1: Spinning a bullet makes it: | Stable in direction | Faster | Heavier | Less affected by gravity | Its angular momentum resists tumbling.
M2: How do phones measure rotation? | MEMS gyroscopes sensing Coriolis forces on vibrating masses | Tiny spinning wheels | GPS | Magnetometers only | Vibrating structures deflect under rotation.
T: Gyroscope | A rapidly spinning wheel whose axis resists changes in direction
T: Precession rate | Ω = τ/L = Mgr/(Iω) for a gyroscope supported at one end
SUM: τ = dL/dt: a torque perpendicular to L swings L sideways instead of tipping it.
SUM: Faster spin means slower precession.
SRC: OpenStax, University Physics Volume 1, section 11.4 "Precession of a Gyroscope" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/11-4-precession-of-a-gyroscope
SRC: Feynman R. P., Leighton R. B., Sands M., The Feynman Lectures on Physics, vol. I, chapter 20 "Rotation in Space" | secondary | 1963 | https://www.feynmanlectures.caltech.edu/I_20.html
EV: established | The simple precession formula holds when spin angular momentum dominates.
Q: Why doesn't a spinning gyroscope supported at one end fall over? | Gravity's torque changes the direction of L sideways, so the axis precesses horizontally instead of dropping.
M3@2,3: A gyroscope's spin rate is doubled while nothing else changes. What happens to its precession rate? | It halves | It doubles | It stays the same | It quadruples | Ω = τ/(Iω): τ is unchanged, L doubles, so Ω halves.
SA2@2: A gyroscope wheel (I = 2.0 × 10^{-3} kg m^{2}) spins at 200 rad s^{-1}. Its 0.50 kg mass is supported 0.10 m from the pivot. Find its precession rate (g = 9.8 m s^{-2}). | τ = Mgr = 0.50 × 9.8 × 0.10 = 0.49 N m. L = Iω = 0.40 kg m^{2} s^{-1}. Ω = τ/L ≈ 1.2 rad s^{-1}. | torque from gravity ; L = Iω ; Ω = τ/L ; about 1.2 rad s^{-1}

## Precession and nutation
S: Precession is the slow circling of a spinning body's axis under a torque; nutation is a nodding wobble superimposed on it. Both appear in tops, gyroscopes, the Earth's axis and spinning nuclei in MRI.
LV: Advanced · Foundation
O: Distinguish precession from nutation
O: Describe the precession of the Earth's axis and its effects
PRE: Gyroscopic motion
H: Precession rate
E: Ω = τ/L = Mgd/(Iω) :: gyroscope supported at one end (fast-spin approximation)
- Faster spin ⇒ slower precession.
H: Examples
- **Earth's axis** precesses with a 26 000-year period because the Sun and Moon pull on its equatorial bulge. The pole star changes; Vega will be near the pole in ~12 000 years.
- **Nutation** of the Earth: an 18.6-year nodding from the Moon's tilted orbit.
- **Larmor precession**: magnetic moments precess in a field at ω = γB, the basis of NMR and MRI (42.6 MHz per tesla for protons).
X: A gyroscope wheel (I = 0.002 kg m^{2}) spins at 300 rad s^{-1}, supported 0.05 m from its centre of mass; M = 0.4 kg. Precession rate?
> Ω = Mgd/(Iω) = 0.4 × 9.8 × 0.05/(0.6) = 0.33 rad s^{-1}
> One precession circle in ~19 s
!: The simple Ω formula assumes spin angular momentum dominates; at low spin the top nutates strongly and then falls.
Q: What causes the precession of Earth's axis? | Torques from the Sun and Moon on the Earth's equatorial bulge.
Q: What is Larmor precession? | The precession of a magnetic moment about a magnetic field at ω = γB, used in MRI.
M1: Doubling a gyroscope's spin rate changes its precession rate by: | ×1/2 | ×2 | ×4 | No change | Ω ∝ 1/ω.
M2: The period of Earth's axial precession is about: | 26 000 years | 1 year | 18.6 years | 100 000 years | The precession of the equinoxes.
T: Precession | Slow circling of a spinning body's axis under a torque
T: Nutation | A nodding oscillation of the axis superimposed on precession
T: Precession of the equinoxes | The 26 000-year circling of Earth's axis, caused by the Sun's and Moon's torques on its equatorial bulge
SUM: Precession is steady; nutation is a smaller wobble, damped by friction in a real top.
SUM: Earth's axis precesses once in about 26 000 years, so Polaris won't always be the pole star.
SRC: Goldstein H., Poole C., Safko J., Classical Mechanics, 3rd edition, chapter 5, Addison-Wesley | secondary | 2002
SRC: IERS Conventions (2010), IERS Technical Note 36, chapter 5 | standard | 2010 | https://www.iers.org/IERS/EN/Publications/TechnicalNotes/tn36.html
EV: established | Earth's precession and nutation are measured precisely and modelled by the IERS.
Q: What causes the precession of Earth's axis? | Torques from the Sun and Moon on Earth's equatorial bulge.
M3@1,2: Which describes nutation of a spinning top? | A nodding wobble of the tilt angle as the axis precesses | The steady circling of the axis around the vertical | The spinning of the top about its own axis | The top's slow fall as friction slows it | Nutation is the oscillation of the angle between the axis and the vertical, superimposed on precession.
SA2@1,2: Explain why a precise star map must say which date (epoch) its coordinates refer to. | Precession slowly shifts Earth's axis and with it the celestial pole and equinox, by about 50 arcseconds a year. Star coordinates measured relative to them therefore drift, so a catalogue gives positions for a stated epoch (such as J2000) and corrections are applied for other dates. | Earth's axis precesses ; reference frame drifts about 50″ per year ; coordinates change with time ; catalogues state an epoch

## Rigid-body dynamics
S: A rigid body's motion is the translation of its centre of mass plus rotation about it. In general, angular momentum relates to angular velocity through the inertia tensor, so they need not be parallel, and that's why unbalanced wheels wobble.
LV: Advanced · Foundation
O: Split rigid-body motion into translation of the centre of mass and rotation about it
O: Use the inertia tensor and principal axes
PRE: Systems of particles
H: The general picture
E: MA_{cm} = F_{ext}; dL/dt = τ_{ext} (about the CM or a fixed point)
E: L = Iω (tensor), L_{i} = I_{ij}ω_{j}
- The inertia tensor has three principal axes, mutually perpendicular, about which L ∥ ω.
- Principal moments I_{1}, I_{2}, I_{3}; in principal axes KE = ½(I_{1}ω_{1}^{2} + I_{2}ω_{2}^{2} + I_{3}ω_{3}^{2}).
H: Balancing
P: A wheel spinning about an axis that isn't principal has L rotating with it, so the bearings must keep supplying a torque: vibration. Static balance puts the CM on the axis; dynamic balance makes the axis principal. Tyre fitters add small weights for both.
X: A dumbbell (two masses m at ±a along a rod) spins about an axis through its centre at angle θ to the rod.
> L is perpendicular to the rod, not along ω
> As the dumbbell turns, L sweeps round, needing a rotating torque from the bearings
!: Treating L as Iω with a scalar I only works for rotation about a principal (symmetry) axis.
Q: What are principal axes? | Axes about which angular momentum is parallel to angular velocity; the inertia tensor is diagonal in them.
Q: What is dynamic balancing? | Making the rotation axis a principal axis so no wobbling torque is needed.
M1: A rigid body's general motion can be described as: | Translation of the CM plus rotation about the CM | Rotation only | Translation only | Vibration | Chasles' theorem.
M2: Why do unbalanced car wheels vibrate? | L isn't parallel to ω, so the bearings must supply a varying torque | Friction on the road | Air resistance | The tyre is too hard | Non-principal rotation.
T: Inertia tensor | The 3 × 3 matrix I_{ij} with L_{i} = I_{ij}ω_{j}
T: Principal axes | The axes in which the inertia tensor is diagonal, so L is parallel to ω
SUM: F_{ext} = Ma_{cm} and τ_{cm} = dL_{cm}/dt, independently.
SUM: L is parallel to ω only along principal axes; otherwise an unbalanced wheel wobbles its bearings.
SRC: Goldstein H., Poole C., Safko J., Classical Mechanics, 3rd edition, chapter 5, Addison-Wesley | secondary | 2002
SRC: Taylor J. R., Classical Mechanics, chapter 10, University Science Books | secondary | 2005
EV: established | Standard classical mechanics.
Q: Why are car wheels balanced? | So they spin about a principal axis; otherwise L and ω aren't parallel and the changing L shakes the axle.
M3@2,3: A rod spins about an axis through its centre but tilted from perpendicular to the rod. What do the bearings feel? | A rotating torque, because L isn't parallel to ω and keeps changing direction | Nothing, as long as the rod is balanced at its centre | A steady sideways force that doesn't rotate | Only the rod's weight | The centre of mass is on the axis, so there's no net force, but L sweeps round with the rod, needing a torque dL/dt from the bearings.
SA2@1,2: Explain why you can treat a thrown spinning hammer as a point moving on a parabola plus a rotation. | The only external force is gravity, acting at the centre of mass, so F_{ext} = Ma_{cm} makes the centre of mass follow a parabola. Gravity exerts no torque about the centre of mass, so the hammer's angular momentum about it stays constant and it keeps spinning as it flies. | gravity acts at the centre of mass ; centre of mass follows a parabola ; no torque about it ; rotation continues unchanged

## Euler's equations of rotation
S: Euler's equations give the rotational dynamics of a rigid body in its own rotating principal-axis frame. They explain tumbling, wobble and the stability of spinning bodies.
LV: Advanced · Application
O: Write Euler's equations in the principal-axis frame
O: Use them to explain the stability of rotation about the principal axes
PRE: Rigid-body dynamics
H: The equations
E: I_{1}ω̇_{1} − (I_{2} − I_{3})ω_{2}ω_{3} = τ_{1} (and cyclic permutations)
- Written in the body frame, where the inertia tensor is constant.
- Torque-free (τ = 0): energy and |L| are conserved, but ω can wander.
H: The tennis-racket theorem
P: Rotation about the axes of largest and smallest moment of inertia is stable; about the intermediate axis it's unstable. Throw a book or phone spinning about its middle axis and it flips. Astronaut Dzhanibekov saw a wing nut flip repeatedly on the ISS.
H: Free precession
P: A torque-free symmetric body spinning slightly off its symmetry axis wobbles at a rate ∝ (I_{3} − I_{1})/I_{1}. The Earth's version is the Chandler wobble (~433 days, longer than Euler's 305-day prediction because the Earth isn't rigid).
X: Why did the Explorer 1 satellite (1958) go from spinning about its long axis to tumbling?
> It spun about its axis of minimum I; flexible antennas dissipated energy
> At fixed L, losing energy pushes rotation to the axis of maximum I
!: Stability predicted for a rigid body can fail for a flexible one: with energy loss, only the maximum-I axis is stable.
Q: Which axes give stable rotation for a rigid body? | The axes of largest and smallest moment of inertia (in the rigid, no-dissipation case).
Q: What is the Chandler wobble? | The free nutation of the Earth's rotation axis, with a period of about 433 days.
M1: A book spun about its intermediate axis: | Flips over unstably | Spins steadily | Stops | Speeds up | Intermediate-axis instability.
M2: Euler's equations are written in: | The body's principal-axis frame | The lab frame | The CM frame only | Polar coordinates | The body frame makes I constant.
T: Euler's equations | I_{1}ω̇_{1} − (I_{2} − I_{3})ω_{2}ω_{3} = τ_{1}, and cyclic permutations
T: Intermediate-axis theorem | Rotation about the axis of intermediate moment of inertia is unstable
SUM: Rotation about the largest and smallest principal axes is stable; about the intermediate axis it is unstable.
SUM: A spinning body that loses energy but keeps L ends up rotating about its largest-I axis.
SRC: Goldstein H., Poole C., Safko J., Classical Mechanics, 3rd edition, chapter 5, Addison-Wesley | secondary | 2002
SRC: Landau L. D., Lifshitz E. M., Mechanics, 3rd edition, section 35, Pergamon | secondary | 1976
EV: established | Euler's equations are exact for rigid bodies; the instability is seen in the "Dzhanibekov effect" on the ISS.
Q: Which principal axis gives unstable rotation? | The one with the intermediate moment of inertia.
M3@2,3: Explorer 1 (1958), a long thin satellite spun about its long axis, began tumbling end over end. Why? | Flexing parts dissipated energy at fixed L, driving it to rotate about its maximum-I axis | The Sun's gravity pushed it into a tumble | Its long axis had the largest moment of inertia | Euler's equations don't apply to satellites | Spin about the minimum-I axis is stable only for a perfectly rigid body; energy loss moves it to the axis with the largest I.
SA2@1: Describe what happens when you spin a book about each of its three principal axes. | About the axis through the large faces (largest I) and the long axis (smallest I), it spins steadily. About the intermediate axis, it tumbles: a small wobble grows exponentially and the book flips over as it spins, as Euler's equations predict. | largest-I axis stable ; smallest-I axis stable ; intermediate axis unstable ; small wobble grows and it flips

## Rotating reference frames
S: In a frame rotating at angular velocity ω, Newton's laws need fictitious forces: centrifugal, Coriolis and (if ω changes) Euler forces. Weather systems, ocean currents and the Earth itself are best studied in such a frame.
LV: Advanced · Foundation
O: Transform velocities and accelerations into a rotating frame
O: Name the fictitious forces that appear there
PRE: Inertial and non-inertial frames
H: Transforming derivatives
E: (dA/dt)_{inertial} = (dA/dt)_{rot} + ω × A
E: ma′ = F − 2mω × v′ − mω × (ω × r) − m(dω/dt) × r
- −2mω × v′: Coriolis force (only on moving objects, ⊥ to their velocity).
- −mω × (ω × r): centrifugal force, outward from the axis, mω^{2}r_{⊥}.
- −m ω̇ × r: Euler force, if the rotation rate changes.
H: On Earth
- ω = 7.29 × 10^{-5} rad s^{-1}.
- Effective g is reduced and tilted by centrifugal effects: g at the equator ~9.78, at the poles ~9.83 m s^{-2} (also due to the equatorial bulge).
X: How much does the centrifugal effect reduce apparent g at the equator?
> ω^{2}R = (7.29 × 10^{-5})^{2} × 6.37 × 10^{6} = 0.034 m s^{-2}
> About 0.3% of g
!: In the rotating frame, a ball thrown on a merry-go-round curves; in the ground frame it goes straight. Both descriptions agree once the frame's motion is accounted for.
Q: Which fictitious forces appear in a uniformly rotating frame? | Centrifugal and Coriolis.
Q: Why is effective g smaller at the equator? | Centrifugal effects and the equatorial bulge (greater distance from the centre).
M1: The Coriolis force on a stationary object in a rotating frame is: | Zero | mω^{2}r | 2mωv | mg | It depends on velocity in the rotating frame.
M2: The Earth's angular velocity is about: | 7.3 × 10^{-5} rad s^{-1} | 2π rad s^{-1} | 1 rad s^{-1} | 4 × 10^{-3} rad s^{-1} | 2π per sidereal day (86 164 s).
T: Rotating frame | A frame turning at angular velocity ω relative to an inertial frame
T: Euler force | The fictitious force −m(dω/dt) × r, present when the rotation rate changes
SUM: In a rotating frame, ma′ = F − 2mω × v′ − mω × (ω × r) − m(dω/dt) × r.
SUM: The three terms are the Coriolis, centrifugal and Euler forces.
SRC: Taylor J. R., Classical Mechanics, chapter 9, University Science Books | secondary | 2005
SRC: Kleppner D., Kolenkow R., An Introduction to Mechanics, 2nd edition, chapter 9, Cambridge University Press | secondary | 2014
EV: established | Exact transformation of Newton's second law.
Q: Which fictitious force depends on the body's velocity in the rotating frame? | The Coriolis force, −2mω × v′.
M3@2: On a turntable spinning at a steady rate, which fictitious forces act on a stationary object sitting on it? | Centrifugal only | Coriolis only | Centrifugal, Coriolis and Euler | Euler only | Coriolis needs motion relative to the frame, and Euler needs a changing ω; a resting object feels only centrifugal force.
SA2@1,2: Explain why weather systems on Earth rotate, using a rotating frame. | Earth is a rotating frame, so moving air feels a Coriolis force, deflecting it right in the northern hemisphere and left in the southern. Air flowing into a low-pressure region is deflected sideways and ends up circulating round it: anticlockwise in the north, clockwise in the south. | Earth is a rotating frame ; Coriolis deflects moving air ; right in north, left in south ; flow circulates around lows

## Centrifugal and Coriolis forces
S: Centrifugal and Coriolis forces are fictitious forces seen in rotating frames. Centrifugal acts outward from the axis on everything; Coriolis acts sideways on moving things, and steers winds, ocean currents and long-range projectiles.
LV: Intermediate · Application
O: Calculate the centrifugal and Coriolis forces in a rotating frame
O: Explain everyday effects such as the reduction of effective g at the equator
PRE: Rotating reference frames
H: Coriolis
E: F_{Cor} = −2mω × v
- Northern hemisphere: deflects moving objects to the right; southern: to the left.
- Horizontal component ∝ sin(latitude): zero at the equator, strongest at the poles.
- Makes large storms rotate: anticlockwise lows in the northern hemisphere (hurricanes), clockwise in the south.
- Foucault's pendulum: its swing plane turns at ω sin λ: once a day at the poles, about every 30 hours at London's latitude (51.5°), and not at all at the equator.
H: Scale matters
P: The Rossby number Ro = U/(fL), with f = 2ω sin λ, compares inertia to Coriolis. Ro ≪ 1 for weather systems (Coriolis dominates); Ro ≫ 1 for a draining sink, so the Earth's rotation doesn't decide which way bathwater swirls.
X: Find the Coriolis acceleration on a 300 m s^{-1} aircraft flying north at 45° N.
> Horizontal: 2ωv sin λ = 2 × 7.29 × 10^{-5} × 300 × 0.707 = 0.031 m s^{-2}
> Small, but over an hour it would deflect the path by tens of kilometres if uncorrected
!: Sinks and toilets don't drain the other way across the equator because of Coriolis; their swirl comes from the basin's shape and leftover motion.
Q: Which way does the Coriolis force deflect moving air in the northern hemisphere? | To the right of its motion.
Q: Why doesn't Coriolis set the direction of a sink's swirl? | The Rossby number is huge: the effect is far too weak at that size and timescale.
M1: At the equator, the horizontal Coriolis effect on horizontal motion is: | Zero | Maximum | The same as at the poles | Reversed | ∝ sin(latitude).
M2: Hurricanes in the northern hemisphere rotate: | Anticlockwise | Clockwise | Either, randomly | Not at all | Air flowing in is deflected right, producing anticlockwise circulation around the low.
T: Centrifugal force | The outward fictitious force mω^{2}r in a rotating frame
T: Coriolis force | The fictitious force −2mω × v on a body moving in a rotating frame
SUM: Centrifugal: mω^{2}r outwards from the axis. Coriolis: 2mωv sin(angle), perpendicular to v.
SUM: At the equator, the centrifugal effect lowers effective g by about 0.034 m s^{-2}.
SRC: OpenStax, University Physics Volume 1, section 6.3 "Centripetal Force" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/6-3-centripetal-force
SRC: Persson A., "How do we understand the Coriolis force?", Bulletin of the American Meteorological Society 79, 1373–1385 | primary | 1998 | https://doi.org/10.1175/1520-0477(1998)079%3C1373:HDWUTC%3E2.0.CO;2
EV: established | These are exact fictitious-force terms; everyday sink drains are too small and disturbed to show Coriolis reliably.
Q: Does the Coriolis effect decide which way a household sink drains? | Not reliably: the effect is tiny at that scale compared with the water's leftover motion and the basin's shape.
M3@2,3: What is the centrifugal acceleration at Earth's equator (R = 6.4 × 10^{6} m, ω = 7.3 × 10^{-5} rad s^{-1})? | About 0.034 m s^{-2} | About 9.8 m s^{-2}, equal to g | About 470 m s^{-2}, from ωR | About 3.4 m s^{-2}, a third of g | ω^{2}R = (7.3 × 10^{-5})^{2} × 6.4 × 10^{6} ≈ 0.034 m s^{-2}, about 0.3% of g.
SA2@2: Explain why a Foucault pendulum's swing plane slowly rotates. | The pendulum swings in a fixed plane relative to the stars while the Earth turns beneath it. In the Earth's rotating frame this appears as a Coriolis force deflecting the bob, so the plane rotates once every (24 h/sin latitude) approximately (one sidereal day at the poles, not at all at the equator). | plane fixed in an inertial frame ; Earth rotates beneath ; Coriolis deflection in Earth's frame ; rate depends on sin of latitude

## Top motion and stability
S: A spinning top on a table combines spin, precession and nutation. It stays upright while spinning fast enough; as friction slows it, it passes a stability threshold, wobbles and falls. Some tops even turn themselves upside down.
LV: Advanced · Foundation
O: Explain why a fast-spinning top stays upright
O: Describe the "sleeping" top and the condition for stability
PRE: Precession and nutation
H: The sleeping top
E: ω^{2} > 4MgdI_{1}/I_{3}^{2} :: condition for a vertical ("sleeping") top to be stable
- Above this spin rate, small tilts lead only to small precession and nutation.
- Below it, the top's tilt grows and it falls.
H: Precession and nutation of a top
- Slow (steady) precession: Ω ≈ Mgd/(I_{3}ω).
- Starting a tilted top from rest in precession produces nutation: the axis traces cusps or loops.
- Friction at the tip can make a fast top rise towards vertical.
H: The tippe top
P: A tippe top (a truncated sphere with a stem) spun on its round side flips over onto its stem. Sliding friction at the contact point exerts a torque that raises the centre of mass, converting rotational energy into potential energy. The direction of spin relative to the body reverses.
X: Why must a top be spun fast?
> Stability requires ω above √(4MgdI_{1})/I_{3}
> Slower spin ⇒ larger precession and nutation ⇒ the tip slides and it topples
!: Without friction at the tip there's no rising or tippe-top flip; energy-losing contact forces drive these effects.
Q: What is a sleeping top? | A top spinning upright, fast enough to be stable against small tilts.
Q: What makes a tippe top flip? | Sliding friction torque at the contact, which raises its centre of mass.
M1: As friction slows a top, its precession rate: | Increases | Decreases | Stays constant | Becomes zero | Ω ∝ 1/ω.
M2: A sleeping top is stable if: | Its spin exceeds a critical value | It is perfectly balanced | Its mass is large | It's on a smooth surface | Gyroscopic stability needs enough angular momentum.
T: Sleeping top | A top spinning upright so fast that it shows no visible precession or wobble
T: Critical spin | The spin rate below which an upright top becomes unstable and starts to wobble and fall
SUM: Large spin angular momentum turns gravity's torque into slow precession instead of falling.
SUM: An upright top is stable only above a critical spin rate (I_{3}^{2}ω^{2} > 4I_{1}Mgl).
SRC: Goldstein H., Poole C., Safko J., Classical Mechanics, 3rd edition, chapter 5, Addison-Wesley | secondary | 2002
SRC: Taylor J. R., Classical Mechanics, chapter 10, University Science Books | secondary | 2005
EV: established | The heavy symmetric top is an exactly solvable problem of classical mechanics.
Q: Why does a top eventually fall over? | Friction slows its spin below the critical rate, so it starts to wobble, precess widely and topple.
M3@2,3: How does a top's precession rate change as friction slows its spin (before it falls)? | It increases, since Ω = Mgl/(Iω) | It decreases with the spin | It stays the same | It drops to zero | The torque is fixed, so as L = Iω shrinks the precession speeds up, which is why a dying top circles faster.
SA2@1,2: Explain why a bicycle wheel spinning fast is harder to tip than one at rest. | Tipping changes the direction of the wheel's angular momentum, which needs a torque; for a fast wheel L is large, so the same torque changes its direction only slowly, and the wheel precesses rather than tipping. A wheel at rest has no L, so the torque just tips it. | tipping changes the direction of L ; large L changes slowly ; torque produces precession ; no L at rest

## Coupled translational and rotational motion
S: Many objects translate and rotate at once, with friction or constraints coupling the two. Bowling balls skid then roll, snooker balls take spin, and wheels drive cars forward, all through the interplay of F = ma and τ = Iα.
LV: Intermediate · Application
O: Analyse a body that skids and then rolls
O: Use friction to link translation and rotation
PRE: Rolling without slipping
H: Method
- Write F = Ma_{cm} and τ_{cm} = I_{cm}α separately.
- Identify which friction applies: kinetic (slipping) or static (rolling).
- Rolling begins when v_{cm} = ωR; then switch to static friction.
H: Skidding to rolling
E: v_{final} = (5/7)v_{0} :: a solid ball launched sliding without spin
P: Kinetic friction slows the ball's translation while spinning it up. Angular momentum about the contact point is conserved (friction acts there), which gives the final speed directly. The kinetic energy lost is 2/7 of the initial.
X: A bowling ball is launched at 8.0 m s^{-1} with no spin; μ_{k} = 0.1. When does it start rolling?
> a = −μg = −0.98 m s^{-2}; α = 5μg/(2R)
> Rolls when v = ωR: v = (5/7) × 8 = 5.7 m s^{-1}, at t = (8 − 5.7)/0.98 = 2.3 s
H: Snooker spin
P: Hitting the cue ball above centre gives topspin (follow); below centre gives backspin (screw or draw). A solid ball struck horizontally at a height of 7R/5 above the table (2R/5 above its centre) rolls immediately without slipping.
!: Don't assume rolling without slipping from the start; check whether v = ωR, and if not, kinetic friction acts until it is.
Q: Why is angular momentum about the contact point conserved for a skidding ball? | Friction acts at that point, so it has no torque about it (and gravity and normal force cancel).
Q: At what height should a ball be struck to roll immediately? | 7R/5 above the table (2R/5 above the centre), for a solid sphere.
M1: A solid ball sliding with no spin ends up rolling at what fraction of its initial speed? | 5/7 | 2/7 | 1/2 | 1 | From conservation of angular momentum about the contact point.
M2: Backspin on a cue ball makes it, after hitting another ball head-on: | Move backwards | Stop dead | Follow through | Jump | Its spin makes friction pull it back.
T: Skidding | Sliding with the contact point moving relative to the surface, so kinetic friction acts
T: Pure rolling | Rolling with v = ωR, once friction has matched spin to speed
SUM: Kinetic friction slows translation and speeds rotation until v = ωR; then rolling continues.
SUM: Angular momentum about the contact point is conserved during skidding, since friction acts there.
SRC: Kleppner D., Kolenkow R., An Introduction to Mechanics, 2nd edition, chapter 7, Cambridge University Press | secondary | 2014
SRC: OpenStax, University Physics Volume 1, section 11.1 "Rolling Motion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/11-1-rolling-motion
EV: established | Standard mechanics with the Coulomb friction model.
Q: Why does a bowling ball eventually stop skidding? | Friction slows its slide and increases its spin until v = ωR, when there's no more slipping.
M3@2,3: A solid ball is launched sliding at v_{0} with no spin. What speed does it settle to when it starts rolling? | 5v_{0}/7 | v_{0}, as nothing slows it | 2v_{0}/7, the spin share | v_{0}/2, half of the start | Angular momentum about the contact point is conserved: Mv_{0}R = MvR + (2/5)MR^{2}(v/R), so v = 5v_{0}/7.
SA2@1,2: A snooker player hits the cue ball low ("backspin"). Describe and explain its motion after it hits another ball head-on. | The cue ball stops dead on impact (its forward momentum goes to the object ball) but it is still spinning backwards. Friction from the cloth acts against the slipping contact point, accelerating the ball backwards until it rolls without slipping: it screws back towards the player. | momentum transferred to the other ball ; backspin remains ; friction acts on the slipping contact ; ball rolls back
`;
