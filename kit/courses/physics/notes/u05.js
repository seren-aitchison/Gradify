// Unit 5: Rotational Mechanics. Format: kit/course/notes.js
export default `
## Angular displacement, velocity and acceleration
S: Rotation is described by the angle turned (angular displacement θ), its rate (angular velocity ω) and the rate of change of that (angular acceleration α). They play the roles of x, v and a for straight-line motion.
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

## Angular and linear motion relationships
S: Each point on a rotating rigid body moves in a circle, with linear quantities equal to the angular ones times the radius. Points farther out move faster, which is why the rim of a wheel wears and the tip of a blade is the dangerous part.
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

## Torque and moment of force
S: Torque is the turning effect of a force: force times its perpendicular distance from the axis. It's what changes rotational motion, as force changes linear motion.
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

## Moment of inertia
S: Moment of inertia measures how hard it is to change an object's rotation. It depends not only on mass but on how far the mass sits from the axis, squared.
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

## Rotational kinetic energy
S: A spinning body stores kinetic energy because each part of it moves. For rotation about a fixed axis it's ½Iω^{2}; a body that rolls has both translational and rotational energy.
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

## Angular momentum
S: Angular momentum is the rotational counterpart of linear momentum. For a rigid body about a fixed axis it's Iω; for a particle it's r × p. Torque changes it, just as force changes linear momentum.
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

## Conservation of angular momentum
S: With no net external torque, a system's total angular momentum stays constant. A skater spins faster by pulling in her arms, collapsing stars become pulsars, and planets sweep equal areas in equal times, all because of this law.
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

## Rotational dynamics
S: Rotational dynamics applies τ = Iα (for a fixed axis) to find how torques change rotation. Problems with pulleys, wheels and hinged objects combine it with F = ma for the parts that translate.
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

## Rolling without slipping
S: When a wheel rolls without slipping, its contact point is momentarily at rest, linking translation and rotation by v = ωR. Objects rolling down a slope accelerate at a rate set by how their mass is distributed.
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

## Rotational equilibrium
S: A body is in rotational equilibrium when the net torque on it is zero about every point. Combined with zero net force, this lets you solve for unknown forces in beams, ladders, cranes and limbs.
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

## Parallel-axis theorem
S: The parallel-axis theorem gives the moment of inertia about any axis from the moment about a parallel axis through the centre of mass. It saves redoing integrals for pendulums, hinged doors and offset wheels.
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

## Perpendicular-axis theorem
S: For a flat (planar) object, the moment of inertia about an axis perpendicular to its plane equals the sum of the moments about two perpendicular axes lying in the plane and crossing at the same point.
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

## Gyroscopic motion
S: A spinning gyroscope resists changes in the direction of its axis. A torque doesn't tip it over; instead the axis swings sideways (precesses), because torque changes angular momentum in the direction of the torque.
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

## Precession and nutation
S: Precession is the slow circling of a spinning body's axis under a torque; nutation is a nodding wobble superimposed on it. Both appear in tops, gyroscopes, the Earth's axis and spinning nuclei in MRI.
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

## Rigid-body dynamics
S: A rigid body's motion is the translation of its centre of mass plus rotation about it. In general, angular momentum relates to angular velocity through the inertia tensor, so they need not be parallel, and that's why unbalanced wheels wobble.
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

## Euler's equations of rotation
S: Euler's equations give the rotational dynamics of a rigid body in its own rotating principal-axis frame. They explain tumbling, wobble and the stability of spinning bodies.
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

## Rotating reference frames
S: In a frame rotating at angular velocity ω, Newton's laws need fictitious forces: centrifugal, Coriolis and (if ω changes) Euler forces. Weather systems, ocean currents and the Earth itself are best studied in such a frame.
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

## Centrifugal and Coriolis forces
S: Centrifugal and Coriolis forces are fictitious forces seen in rotating frames. Centrifugal acts outward from the axis on everything; Coriolis acts sideways on moving things, and steers winds, ocean currents and long-range projectiles.
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

## Top motion and stability
S: A spinning top on a table combines spin, precession and nutation. It stays upright while spinning fast enough; as friction slows it, it passes a stability threshold, wobbles and falls. Some tops even turn themselves upside down.
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

## Coupled translational and rotational motion
S: Many objects translate and rotate at once, with friction or constraints coupling the two. Bowling balls skid then roll, snooker balls take spin, and wheels drive cars forward, all through the interplay of F = ma and τ = Iα.
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
`;
