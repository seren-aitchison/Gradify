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
D: phys-u05-fan-spin-up
!: Rotational formulas need radians; using degrees in v = ωr or s = rθ gives wrong answers.
Q: What are the rotational equivalents of v = u + at and s = ut + ½at^{2}? | ω = ω_{0} + αt and θ = ω_{0}t + ½αt^{2}.
Q: Which way does the angular velocity vector point? | Along the axis, given by the right-hand rule (fingers curl with the rotation, thumb points along ω).
M1: 300 rpm in rad s^{-1} is about: | 31.4 | 5 | 300 | 1885 | 300 × 2π/60.
M2: A wheel decelerates uniformly from 20 rad s^{-1} to rest in 10 revolutions. α = ? | −3.2 rad s^{-2} | −2 rad s^{-2} | −20 rad s^{-2} | −1 rad s^{-2} | ω^{2} = ω_{0}^{2} + 2αθ with θ = 20π: α = −400/(40π).
Q: What is angular displacement in terms of arc length? | θ = s/r, in radians.
Q: What is angular velocity? | The rate of change of angle: ω = dθ/dt.
Q: What is angular acceleration? | The rate of change of angular velocity: α = dω/dt.
Q: What is the rotational equivalent of v^{2} = u^{2} + 2as? | ω^{2} = ω_{0}^{2} + 2αθ.
Q: How many radians are in one revolution? | 2π rad.
Q: How do you convert rpm to rad s^{-1}? | Multiply by 2π/60.
Q: Why are finite rotations not vectors? | They don't commute: the order of rotations changes the result.
Q: A fan reaches 1200 rpm from rest in 4.0 s. What is its angular acceleration? | About 31.4 rad s^{-2}.
Q: How many turns does that fan make while speeding up? | About 40 turns (251 rad).
Q: What goes wrong if degrees are used in v = ωr or s = rθ? | The answers are wrong: these formulas need radians.

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
Q: What angular quantities do all points on a rigid rotating body share? | The same θ, ω and α.
Q: How does linear speed vary across a rotating rigid body? | It grows with radius: v = ωr.
Q: What is the centripetal acceleration of a point on a rotating body? | a_{c} = ω^{2}r = v^{2}/r.
Q: What is the vector form of v = ωr? | v = ω × r.
Q: What is the total acceleration of a point on a speeding-up wheel? | √(a_{t}^{2} + a_{c}^{2}).
Q: What equation links two meshing gears or a belt drive? | ω_{1}r_{1} = ω_{2}r_{2}.
Q: What happens when a small gear drives a large one? | The angular speed falls and the torque increases.
Q: Why is the tip of a rotating blade the dangerous part? | Points farther out move faster.
Q: In the bicycle example, what is the chain speed? | About 2.07 m s^{-1}.
Q: What is the speed of the contact point of a wheel rolling on the ground? | Zero: it is momentarily at rest.

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
D: phys-u05-torque-angle
!: Torque depends on where the axis is; always say about which point you take moments.
Q: What is the moment arm? | The perpendicular distance from the axis to the line of action of the force.
Q: What is a couple? | Two equal and opposite parallel forces with different lines of action, giving pure torque.
M1: A 20 N force acts 0.5 m from a pivot along a line through the pivot. Torque? | 0 | 10 N m | 40 N m | 20 N m | The moment arm is zero.
M2: Why is a door handle placed far from the hinges? | A larger moment arm gives more torque for the same force | It's easier to see | The door is lighter there | It reduces friction | τ = Fd_{⊥}.
Q: What is torque? | The turning effect of a force: force times its perpendicular distance from the axis.
Q: What is the vector definition of torque? | τ = r × F.
Q: What is the magnitude of torque at angle θ? | τ = rF sin θ.
Q: What is the torque of a couple? | Fd about any point, with zero net force.
Q: What are the units of torque? | N m, which are not called joules even though they are dimensionally the same.
Q: Why are door handles placed far from the hinges? | A larger moment arm gives more torque for the same force.
Q: When does a bicycle pedal crank give maximum torque? | When it is horizontal.
Q: How is wheel force found from engine torque? | Wheel force = engine torque × gear ratio ÷ wheel radius.
Q: A 30 N force pushes a 0.25 m spanner at 60° to the handle. What is the torque? | About 6.5 N m.
Q: Why must you state the point about which torque is taken? | Torque depends on where the axis is.

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
Q: What does moment of inertia measure? | How hard it is to change an object's rotation.
Q: What is the definition of moment of inertia? | I = Σm_{i}r_{i}^{2} = ∫r^{2} dm.
Q: What is the radius of gyration? | The distance k defined by I = Mk^{2}.
Q: What is the moment of inertia of a thin hoop about its axis? | MR^{2}.
Q: What is the moment of inertia of a solid sphere? | (2/5)MR^{2}.
Q: What is the moment of inertia of a thin spherical shell? | (2/3)MR^{2}.
Q: What is the moment of inertia of a thin rod about its centre? | (1/12)ML^{2}.
Q: What is the moment of inertia of a thin rod about one end? | (1/3)ML^{2}.
Q: Why do flywheels have mass at the rim? | To maximise moment of inertia for their mass.
Q: How does a figure skater reduce her moment of inertia? | By pulling her arms in.

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
Q: What is the kinetic energy of a body rotating about a fixed axis? | KE_{rot} = ½Iω^{2}.
Q: How is work done by a torque calculated? | W = ∫τ dθ.
Q: Give two uses of flywheel energy storage. | Grid frequency stabilisers, KERS in racing cars, or smoothing steam engine power strokes.
Q: What limits the energy a flywheel can store? | The material's strength, since rim stress is proportional to ρv^{2}.
Q: Why do the best flywheels use carbon fibre? | It is strong and light, so it can be spun very fast.
Q: A 50 kg solid-disc flywheel of radius 0.4 m spins at 3000 rpm. What is its moment of inertia? | 4.0 kg m^{2}.
Q: How much energy does that flywheel store? | About 197 kJ.
Q: What mistake makes rolling objects seem faster than they are? | Forgetting the rotational kinetic energy term.
Q: Why does a spinning body store kinetic energy? | Every part of it is moving.
Q: What two kinds of kinetic energy does a rolling body have? | Translational and rotational.

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
Q: What is angular momentum? | The rotational counterpart of linear momentum.
Q: What is the angular momentum of a rigid body about a symmetry axis? | L = Iω.
Q: What are the units of angular momentum? | kg m^{2} s^{-1}, or J s, the same as Planck's constant.
Q: Does a particle moving in a straight line have angular momentum? | Yes, about any point not on its line: L = mvd_{⊥}.
Q: What is the quantised orbital angular momentum in quantum mechanics? | L = √(l(l + 1))ħ.
Q: What is the z-component of orbital angular momentum? | m_{l}ħ.
Q: What is the spin of an electron? | ½ħ.
Q: What did Bohr's atomic model assume about angular momentum? | L = nħ.
Q: What is the angular momentum of the Earth's orbit? | About 2.7 × 10^{40} kg m^{2} s^{-1}.
Q: When is L = Iω not parallel to ω? | When the body does not rotate about a principal axis.

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
Q: When is angular momentum conserved? | When there is no net external torque.
Q: What is the conservation equation when I changes? | I_{1}ω_{1} = I_{2}ω_{2}.
Q: What happens to ω when I decreases with no external torque? | ω increases.
Q: Why do central forces conserve angular momentum? | They act along the line to the centre, so they exert no torque about it.
Q: Which of Kepler's laws follows from conservation of angular momentum? | The second law: equal areas swept in equal times.
Q: How does a falling cat turn to land on its feet? | It rotates parts of its body in opposite directions, keeping total angular momentum zero.
Q: How does ω scale with radius for a collapsing star at constant L? | ω is proportional to 1/R^{2}.
Q: A Sun-sized star rotating every 30 days collapses to 10 km. What is its new period? | About 0.5 ms: a millisecond pulsar.
Q: Is kinetic energy conserved when a skater pulls in her arms? | No, it increases; angular momentum is conserved.
Q: Give three examples of angular momentum conservation. | Spinning skaters, pulsars from collapsing stars and planetary orbits.

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
D: phys-u05-unwinding-mass
!: With a massive pulley, the tension isn't the same on both sides; treating it as equal ignores the pulley's inertia.
Q: What is Newton's second law for rotation about a fixed axis? | Στ = Iα.
Q: How does a pulley's inertia enter an Atwood machine? | As an extra effective mass I/R^{2} in the denominator.
M1: A 6 N m torque acts on a body with I = 2 kg m^{2}. α = ? | 3 rad s^{-2} | 12 rad s^{-2} | 0.33 rad s^{-2} | 6 rad s^{-2} | α = τ/I.
M2: A yo-yo released from rest falls with acceleration: | Less than g | Equal to g | Greater than g | Zero | Some energy goes into rotation; tension acts upward.
Q: What is rotational dynamics? | Using τ = Iα to find how torques change rotation.
Q: What equation describes the centre of mass's translation? | ΣF = Ma_{cm}.
Q: What constraint links a string unwinding without slipping to the rotation? | a = αr.
Q: What is the acceleration of an Atwood machine with a massive pulley? | a = (m_{1} − m_{2})g/(m_{1} + m_{2} + I/R^{2}).
Q: Why do tensions on either side of a massive pulley differ? | A net torque is needed to spin the pulley up.
Q: A 2.0 kg mass hangs from a string around a 4.0 kg solid cylinder. What is its acceleration? | 4.9 m s^{-2}.
Q: For a mass on a string wound round a solid cylinder, what is the tension? | T = ½Ma, where M is the cylinder's mass.
Q: What kinds of problem combine τ = Iα with F = ma? | Pulleys, wheels and hinged objects with translating parts.
Q: What mistake is made by treating a massive pulley's tensions as equal? | It ignores the pulley's inertia.
Q: What is the formula for the acceleration of a mass on a string around a solid cylinder? | a = mg/(m + M/2).

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
D: phys-u05-rolling-race
!: Friction is needed for rolling, but for pure rolling it's static and wastes no energy. (Rolling resistance from deformation is a separate effect.)
Q: Which reaches the bottom of a slope first: a solid sphere or a hoop? | The solid sphere (smaller I/MR^{2}).
Q: How fast does the top of a rolling wheel move? | 2v, twice the speed of the centre.
M1: For a hoop rolling down a slope, a = ? | ½g sin θ | g sin θ | (5/7)g sin θ | (2/3)g sin θ | I/MR^{2} = 1.
M2: What fraction of a rolling solid cylinder's KE is rotational? | 1/3 | 1/2 | 2/5 | 2/7 | Rotational ¼Mv^{2}, total ¾Mv^{2}.
Q: What is the condition for rolling without slipping? | v_{cm} = ωR.
Q: What is the acceleration condition for rolling without slipping? | a_{cm} = αR.
Q: What kind of friction acts on a wheel rolling without slipping? | Static friction at the contact point.
Q: Does static friction do work in pure rolling? | No.
Q: What is the acceleration of a body rolling down a slope? | a = g sin θ/(1 + I/MR^{2}).
Q: What is the speed of a rolling body after descending height h? | v = √(2gh/(1 + I/MR^{2})).
Q: Which wins a race down a slope: a solid cylinder or a hoop? | The solid cylinder, with I/MR^{2} = 0.5 against 1.
Q: Do the mass and radius of a rolling object affect its race time down a slope? | No, only its shape (the ratio I/MR^{2}).
Q: A solid ball rolls from rest down a 1.0 m high ramp. What is its speed at the bottom? | About 3.7 m s^{-1}.
Q: Is rolling resistance the same as the friction that allows rolling? | No. Rolling resistance comes from deformation and is a separate effect.

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
Q: When is a body in rotational equilibrium? | When the net torque on it is zero about every point.
Q: What two conditions solve for unknown forces in beams and ladders? | Zero net torque and zero net force.
Q: How should a pivot point be chosen in an equilibrium problem? | So that it eliminates unknown forces, whose torque about it is zero.
Q: What is summed to find rotational equilibrium? | Clockwise and anticlockwise moments, so that Στ = 0.
Q: Where can a body's weight be taken to act? | At its centre of gravity.
Q: In the ladder problem, what is the wall's horizontal force? | About 57.7 N.
Q: What is the minimum friction coefficient for the 5 m ladder at 60°? | About 0.29.
Q: What is the normal force from the floor on the 200 N ladder against a smooth wall? | 200 N.
Q: Why does the wall's force equal floor friction for a ladder on a smooth wall? | Horizontal forces must balance.
Q: Give three applications of rotational equilibrium. | Beams, ladders, cranes and limbs.

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
Q: What does the parallel-axis theorem do? | Gives the moment of inertia about any axis from that about a parallel axis through the centre of mass.
Q: What is d in the parallel-axis theorem? | The distance between the two parallel axes.
Q: How do you move between two axes that don't pass through the centre of mass? | Go via the centre-of-mass axis.
Q: What is the period of a physical pendulum? | T = 2π√(I/(Mgd)), where d is the pivot-to-CM distance.
Q: What is the period of a rod swinging from one end? | T = 2π√(2L/3g).
Q: How does a rod pendulum's period compare with a simple pendulum of the same length? | It is shorter.
Q: How is the moment of inertia of a rod about one end found using the theorem? | ML^{2}/12 + M(L/2)^{2} = ML^{2}/3.
Q: What is I for a solid disc about a perpendicular axis through its rim? | 1.5MR^{2}.
Q: What is I for a 2 kg disc of radius 0.2 m about its rim? | 0.12 kg m^{2}.
Q: What condition must the theorem's axes meet? | One axis must pass through the centre of mass, parallel to the other.

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
Q: To which objects does the perpendicular-axis theorem apply? | Only thin flat objects (laminae).
Q: How does symmetry help with the perpendicular-axis theorem? | If I_{x} = I_{y}, each in-plane moment is half of I_{z}.
Q: What is the moment of inertia of a thin ring about a diameter? | MR^{2}/2.
Q: How is the perpendicular-axis theorem proved? | I_{z} = ∫(x^{2} + y^{2})dm = I_{y} + I_{x}, since z = 0 for a lamina.
Q: Why does the theorem fail for a sphere? | It is a 3D body, so z is not zero for its mass.
Q: Where must the three axes meet in the perpendicular-axis theorem? | At the same point.
Q: Which axis is z in the perpendicular-axis theorem? | The axis perpendicular to the plane of the lamina.
Q: What is I_{z} for a thin disc? | ½MR^{2}.
Q: What is I_{z} for a thin ring? | MR^{2}.
Q: Can the theorem be used for a thick cylinder? | No, only for thin flat objects.

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
Q: What does a spinning gyroscope resist? | Changes in the direction of its axis.
Q: What does a torque do to a spinning gyroscope? | Makes its axis swing sideways (precess) instead of tipping over.
Q: Why does a fast-spinning wheel change direction only slowly under a small torque? | It has a large angular momentum.
Q: What is spin stabilisation? | Keeping orientation by spinning, as in rifle bullets, frisbees and satellites.
Q: How does a gyrocompass find north? | It aligns with the Earth's rotation axis.
Q: How do control moment gyros help spacecraft? | They turn the ISS and space telescopes without fuel.
Q: How do phone gyroscopes measure rotation? | MEMS vibrating gyroscopes use the Coriolis effect.
Q: What is the main reason a moving bicycle is easy to balance? | Steering geometry (trail) that turns the wheel into a lean.
Q: Do bicycles balance without net gyroscopic effects? | Yes. Experiments with counter-rotating wheels show they do.
Q: What drives a gyroscope's precession? | Gravity's torque.

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
Q: What is precession? | The slow circling of a spinning body's axis under a torque.
Q: What is nutation? | A nodding wobble superimposed on precession.
Q: What is the precession rate of a gyroscope supported at one end? | Ω = Mgd/(Iω).
Q: How does spin rate affect precession rate? | Faster spin gives slower precession.
Q: What is the period of Earth's axial precession? | About 26 000 years.
Q: Which star will be near the pole in about 12 000 years? | Vega.
Q: What causes Earth's 18.6-year nutation? | The Moon's tilted orbit.
Q: What is the Larmor frequency of protons? | 42.6 MHz per tesla.
Q: What is the precession rate of the example gyroscope wheel? | About 0.33 rad s^{-1}, one circle in about 19 s.
Q: When does the simple precession formula fail? | At low spin, when spin angular momentum no longer dominates; the top nutates strongly and falls.

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
Q: How can a rigid body's motion be split? | Translation of its centre of mass plus rotation about it.
Q: What relates angular momentum to angular velocity in general? | The inertia tensor: L_{i} = I_{ij}ω_{j}.
Q: How many principal axes does a rigid body have? | Three, mutually perpendicular.
Q: What is a rigid body's kinetic energy in principal axes? | KE = ½(I_{1}ω_{1}^{2} + I_{2}ω_{2}^{2} + I_{3}ω_{3}^{2}).
Q: Why do unbalanced wheels wobble? | Rotating about a non-principal axis, L rotates with the wheel, so the bearings must keep supplying torque.
Q: What is static balancing? | Putting the centre of mass on the rotation axis.
Q: How do tyre fitters balance wheels? | They add small weights for both static and dynamic balance.
Q: Which way does L point for a dumbbell spinning at an angle to its rod? | Perpendicular to the rod, not along ω.
Q: What equations govern a rigid body's motion? | MA_{cm} = F_{ext} and dL/dt = τ_{ext}.
Q: When can L = Iω be used with a scalar I? | Only for rotation about a principal or symmetry axis.

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
Q: What do Euler's equations describe? | The rotational dynamics of a rigid body in its own rotating principal-axis frame.
Q: Why are Euler's equations written in the body frame? | The inertia tensor is constant there.
Q: What is conserved for a torque-free rigid body? | Its energy and the magnitude of its angular momentum.
Q: What is the tennis-racket theorem? | Rotation about the intermediate axis is unstable, while rotation about the largest and smallest axes is stable.
Q: What happens when a phone is thrown spinning about its middle axis? | It flips.
Q: Who saw a wing nut flip repeatedly on the ISS? | Astronaut Dzhanibekov.
Q: How does the free precession rate of a symmetric body depend on its moments? | It is proportional to (I_{3} − I_{1})/I_{1}.
Q: Why is the Chandler wobble longer than Euler's 305-day prediction? | The Earth isn't rigid.
Q: Why did Explorer 1 start tumbling? | It spun about its minimum-I axis, and flexible antennas dissipated energy.
Q: With energy loss at fixed L, which axis is the only stable one? | The axis of maximum moment of inertia.

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
Q: Which fictitious force appears if the rotation rate changes? | The Euler force, −m ω̇ × r.
Q: How are time derivatives transformed between inertial and rotating frames? | (dA/dt)_{inertial} = (dA/dt)_{rot} + ω × A.
Q: What is the centrifugal force in a rotating frame? | −mω × (ω × r), outward from the axis with size mω^{2}r_{⊥}.
Q: On which objects does the Coriolis force act? | Only on moving objects, perpendicular to their velocity.
Q: What is the Earth's angular velocity? | 7.29 × 10^{-5} rad s^{-1}.
Q: What is g at the equator and at the poles? | About 9.78 m s^{-2} at the equator and 9.83 m s^{-2} at the poles.
Q: By how much does the centrifugal effect reduce apparent g at the equator? | About 0.034 m s^{-2}, roughly 0.3% of g.
Q: What does centrifugal force do to effective g besides reducing it? | Tilts it.
Q: What path does a ball thrown on a merry-go-round follow in the ground frame? | A straight line, though it curves in the rotating frame.
Q: What systems are best studied in a rotating frame? | Weather systems, ocean currents and the Earth itself.

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
Q: What is the formula for the Coriolis force? | F_{Cor} = −2mω × v.
Q: Which way does Coriolis deflect moving objects in the southern hemisphere? | To the left.
Q: How does the horizontal Coriolis effect depend on latitude? | It is proportional to sin(latitude): zero at the equator, strongest at the poles.
Q: Which way do low-pressure storms rotate in the northern hemisphere? | Anticlockwise.
Q: How fast does a Foucault pendulum's plane turn at latitude λ? | At ω sin λ.
Q: How long does a Foucault pendulum take to turn once at London's latitude? | About 30 hours.
Q: What is the Rossby number? | Ro = U/(fL), comparing inertia to the Coriolis effect.
Q: Is the Rossby number large or small for weather systems? | Much less than 1, so Coriolis dominates.
Q: What is the Coriolis acceleration on a 300 m s^{-1} aircraft at 45° N? | About 0.031 m s^{-2}.
Q: What actually sets the direction a sink swirls? | The basin's shape and leftover motion, not Coriolis.

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
Q: What three motions combine in a spinning top? | Spin, precession and nutation.
Q: What is the stability condition for a sleeping top? | ω^{2} > 4MgdI_{1}/I_{3}^{2}.
Q: Why does a top eventually fall? | Friction slows it below the stability threshold, so its tilt grows.
Q: What is the steady precession rate of a top? | Ω ≈ Mgd/(I_{3}ω).
Q: What happens when a tilted top is released from rest in precession? | It nutates, with its axis tracing cusps or loops.
Q: What can make a fast top rise towards vertical? | Friction at the tip.
Q: What is a tippe top? | A truncated sphere with a stem that flips onto its stem when spun on its round side.
Q: What energy change happens when a tippe top flips? | Rotational energy becomes potential energy as its centre of mass rises.
Q: What happens to a tippe top's spin direction relative to the body when it flips? | It reverses.
Q: Why must a top be spun fast? | Slow spin gives larger precession and nutation, so the tip slides and it topples.

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
D: phys-u05-skid-to-roll
H: Snooker spin
P: Hitting the cue ball above centre gives topspin (follow); below centre gives backspin (screw or draw). A solid ball struck horizontally at a height of 7R/5 above the table (2R/5 above its centre) rolls immediately without slipping.
!: Don't assume rolling without slipping from the start; check whether v = ωR, and if not, kinetic friction acts until it is.
Q: Why is angular momentum about the contact point conserved for a skidding ball? | Friction acts at that point, so it has no torque about it (and gravity and normal force cancel).
Q: At what height should a ball be struck to roll immediately? | 7R/5 above the table (2R/5 above the centre), for a solid sphere.
M1: A solid ball sliding with no spin ends up rolling at what fraction of its initial speed? | 5/7 | 2/7 | 1/2 | 1 | From conservation of angular momentum about the contact point.
M2: Backspin on a cue ball makes it, after hitting another ball head-on: | Move backwards | Stop dead | Follow through | Jump | Its spin makes friction pull it back.
Q: What two equations are written for coupled translation and rotation? | F = Ma_{cm} and τ_{cm} = I_{cm}α.
Q: Which friction acts while a ball is slipping? | Kinetic friction.
Q: When does a skidding ball begin rolling? | When v_{cm} = ωR; then static friction applies.
Q: What is the final speed of a solid ball launched sliding without spin? | (5/7)v_{0}.
Q: What fraction of kinetic energy is lost as a sliding ball begins to roll? | 2/7 of the initial kinetic energy.
Q: What does kinetic friction do to a skidding ball? | It slows its translation while spinning it up.
Q: A bowling ball is launched at 8.0 m s^{-1} with no spin and μ_{k} = 0.1. When does it start rolling? | After about 2.3 s, at about 5.7 m s^{-1}.
Q: What spin does hitting a cue ball above centre give? | Topspin, or follow.
Q: What spin does hitting a cue ball below centre give? | Backspin, called screw or draw.
Q: What mistake is made with balls that start sliding? | Assuming rolling without slipping from the start instead of checking whether v = ωR.
`;
