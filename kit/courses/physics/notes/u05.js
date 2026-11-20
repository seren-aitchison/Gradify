// Unit 5: Rotational Mechanics. Format: kit/course/notes.js
export default `
## Angular displacement, velocity and acceleration
S: Rotation is described by the angle turned (angular displacement θ), its rate (angular velocity ω) and the rate of change of that (angular acceleration α). They play the roles of x, v and a for straight-line motion, and the same constant-acceleration equations carry over.
O: Convert between revolutions, degrees, rpm and radian measures
O: Apply the constant-α equations to rotating bodies
O: Explain the vector nature of ω and why finite rotations are not vectors
PRE: Acceleration
LV: A level · Foundation
H: Definitions
E: θ = s/r (radians); ω = dθ/dt; α = dω/dt
E: ω = ω_{0} + αt; θ = ω_{0}t + ½αt^{2}; ω^{2} = ω_{0}^{2} + 2αθ :: constant α
- Units: rad, rad s^{-1}, rad s^{-2}. 1 rev = 2π rad; rpm × 2π/60 = rad s^{-1}.
- For steady rotation, ω = 2π/T = 2πf.
H: Direction
- ω is a vector along the rotation axis (right-hand rule); finite rotations aren't vectors because they don't commute.
P: Turn a book 90° about x then 90° about y, and compare with the opposite order: it ends in different orientations. Infinitesimal rotations do commute, which is why ω and α are true vectors.
X: A fan speeds up from rest to 1200 rpm in 4.0 s. Find α and the turns made.
> ω = 1200 × 2π/60 = 126 rad s^{-1}; α = 126/4.0 = 31.4 rad s^{-2}
> θ = ½αt^{2} = 251 rad = 40 turns
K: Every linear kinematics result has a rotational twin: replace x, v, a by θ, ω, α.
!: Rotational formulas need radians; using degrees in v = ωr or s = rθ gives wrong answers.
T: Angular velocity | The rate of change of angular displacement, ω = dθ/dt, in rad s^{-1}
T: Angular acceleration | The rate of change of angular velocity, α = dω/dt, in rad s^{-2}
T: Radian | The angle subtended at the centre by an arc equal in length to the radius
SUM: θ, ω and α are the rotational analogues of x, v and a; with constant α the suvat equations carry over directly.
SUM: Work in radians; 1 rev = 2π rad and rpm × 2π/60 gives rad s^{-1}.
EV: established | Rotational kinematics mirrors linear kinematics with θ, ω, α
SRC: OpenStax, University Physics Volume 1, section 10.1 "Rotational Variables" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/10-1-rotational-variables
SRC: OpenStax, University Physics Volume 1, section 10.2 "Rotation with Constant Angular Acceleration" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/10-2-rotation-with-constant-angular-acceleration
SRC: AQA, A-level Physics specification (7408), section 3.11.1.3, Rotational motion | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What are the rotational equivalents of v = u + at and s = ut + ½at^{2}? | ω = ω_{0} + αt and θ = ω_{0}t + ½αt^{2}.
Q: Which way does the angular velocity vector point? | Along the axis, given by the right-hand rule (fingers curl with the rotation, thumb points along ω).
M1@1: 300 rpm in rad s^{-1} is about: | 31.4 | 5 | 300 | 1885 | Multiply by 2π/60: 300 × 2π/60 = 10π ≈ 31.4 rad s^{-1}; 5 is revolutions per second and 1885 forgets to divide by 60.
M2@2: A wheel decelerates uniformly from 20 rad s^{-1} to rest in 10 revolutions. α = ? | −3.2 rad s^{-2} | −2 rad s^{-2} | −20 rad s^{-2} | −1 rad s^{-2} | Use ω^{2} = ω_{0}^{2} + 2αθ with θ = 10 × 2π = 20π rad: α = −400/(40π) ≈ −3.2 rad s^{-2}.
NUM1@1: A wheel turns at a steady 5.0 revolutions per second. What is its angular velocity, in rad s^{-1}? | 31.4 | 0.2 | rad s^{-1} | ω = 2πf = 2π × 5.0 = 31.4 rad s^{-1}; one revolution is 2π radians, so multiply turns per second by 2π.
M2@2: A turntable starts from rest with α = 0.50 rad s^{-2}. How many radians has it turned after 4.0 s? | 4.0 rad | 2.0 rad | 8.0 rad | 1.0 rad | θ = ω_{0}t + ½αt^{2} = 0 + ½ × 0.50 × 16 = 4.0 rad; 8.0 rad forgets the half.
TF3@3: Two successive 90° rotations about different axes give the same final orientation whichever order you do them in. | false | Finite rotations do not commute, so the order matters and finite angles cannot be added as vectors; only infinitesimal rotations (and so ω) behave as vectors.
SA2@1,2: A drill reaches 3000 rpm from rest in 2.0 s with constant α. Find α and the number of revolutions made, explaining each step. | Convert: ω = 3000 × 2π/60 = 314 rad s^{-1}. Then α = Δω/Δt = 314/2.0 = 157 rad s^{-2}. The angle is θ = ½αt^{2} = ½ × 157 × 4.0 = 314 rad, or equivalently the average ω (157 rad s^{-1}) times 2.0 s. Dividing by 2π gives 50 revolutions. | Converts rpm to rad s^{-1} ; α = 157 rad s^{-2} ; θ = 314 rad by suvat or average ω ; 50 revolutions

## Angular and linear motion relationships
S: Each point on a rotating rigid body moves in a circle, with linear quantities equal to the angular ones times the radius. Points farther out move faster, which is why the rim of a wheel wears and the tip of a blade is the dangerous part.
O: Use s = rθ, v = ωr and a = αr to link linear and angular quantities
O: Find the tangential, centripetal and total acceleration of a point on a rotating body
O: Solve gear and belt problems using equal speed at the contact
PRE: Angular displacement, velocity and acceleration
LV: A level · Application
H: Links
E: s = rθ; v = ωr; a_{t} = αr; a_{c} = ω^{2}r = v^{2}/r
E: v = ω × r :: vector form
- All points share θ, ω, α; v and a grow with r.
- Total acceleration of a point: √(a_{t}^{2} + a_{c}^{2}); a_{c} exists even at constant ω.
H: Gears and belts
P: Meshing gears and belts share the same linear speed at the contact: ω_{1}r_{1} = ω_{2}r_{2}. A small gear driving a large one reduces ω and increases torque.
X: A bicycle's 22 cm-radius chainring (pedals at 1.5 rev s^{-1}) drives a 5.5 cm sprocket on a 34 cm wheel. Find the bike's speed.
> Chain speed = 2π × 1.5 × 0.22 = 2.07 m s^{-1}
> Sprocket ω = 2.07/0.055 = 37.7 rad s^{-1}; the wheel shares it, so rim v = 37.7 × 0.34 = 12.8 m s^{-1}
K: Angular quantities are the same for the whole rigid body; linear ones scale with distance from the axis.
!: For a wheel rolling along the ground, the contact point is momentarily at rest; v = ωr gives the speed of the centre, not of every point.
T: Tangential acceleration | The component of a point's acceleration along its path, a_{t} = αr
T: Centripetal acceleration | The component towards the axis, a_{c} = ω^{2}r, which changes the direction of v
SUM: Multiply angular quantities by r to get linear ones: s = rθ, v = ωr, a_{t} = αr, and a_{c} = ω^{2}r.
SUM: Belts and meshing gears share linear speed at the contact, so ω_{1}r_{1} = ω_{2}r_{2}.
EV: established | v = ωr and a = αr follow from the definition of the radian
SRC: OpenStax, University Physics Volume 1, section 10.3 "Relating Angular and Translational Quantities" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/10-3-relating-angular-and-translational-quantities
SRC: AQA, A-level Physics specification (7408), section 3.6.1.1, Circular motion | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: How do the linear speeds of two meshing gears compare? | They're equal at the point of contact.
Q: What is the tangential acceleration of a point at radius r? | a_{t} = αr.
M1@1: A disc spins at 10 rad s^{-1}. A point 0.3 m from the axis moves at: | 3 m s^{-1} | 30 m s^{-1} | 0.03 m s^{-1} | 33 m s^{-1} | v = ωr = 10 × 0.3 = 3 m s^{-1}; the other options divide instead of multiplying or misplace the decimal point.
M2@3: A 10-tooth gear drives a 40-tooth gear at 400 rpm. The large gear turns at: | 100 rpm | 1600 rpm | 400 rpm | 40 rpm | Teeth pass the contact at the same rate, so ω is inversely proportional to the number of teeth: 400 × 10/40 = 100 rpm.
NUM2@2: A wheel of radius 0.50 m has α = 4.0 rad s^{-2}. What is the tangential acceleration of a point on its rim, in m s^{-2}? | 2 | 0.05 | m s^{-2} | a_{t} = αr = 4.0 × 0.50 = 2.0 m s^{-2}; the radian is dimensionless, so rad s^{-2} times metres gives m s^{-2}.
M3@2: At one instant a rim point (r = 0.20 m) has ω = 5.0 rad s^{-1} and α = 60 rad s^{-2}. Its total acceleration is: | 13 m s^{-2} | 17 m s^{-2} | 12 m s^{-2} | 5.0 m s^{-2} | a_{c} = ω^{2}r = 25 × 0.20 = 5.0 and a_{t} = αr = 12; they are perpendicular, so a = √(5.0^{2} + 12^{2}) = 13 m s^{-2}, not their sum 17.
TF1@1: Every point of a rigid wheel spinning about its axle has the same angular velocity. | true | A rigid body turns through the same angle in the same time at every radius, so ω is shared; only the linear speed v = ωr differs.
SA2@2,3: Explain why a point on the rim of a steadily spinning wheel accelerates even though its speed is constant, and calculate that acceleration for r = 0.30 m and ω = 20 rad s^{-1}. | Acceleration is the rate of change of velocity, a vector. At constant ω the speed v = ωr is fixed, but the direction of motion changes continuously, so there is an acceleration towards the axis: the centripetal acceleration. Its size is a_{c} = ω^{2}r = 400 × 0.30 = 120 m s^{-2}. With constant ω the tangential part αr is zero. | Velocity is a vector ; Direction changes so it accelerates ; Directed towards the axis ; a = ω²r = 120 m s⁻²

## Torque and moment of force
S: Torque is the turning effect of a force: the force times its perpendicular distance from the axis. It changes rotational motion as force changes linear motion, and it depends both on the force and on where and in what direction it is applied.
O: Calculate torque from τ = rF sin θ or F × perpendicular distance
O: Describe a couple and explain why its torque is the same about every point
O: Explain everyday uses of the moment arm
PRE: Free-body diagrams
LV: GCSE and A level · Foundation
H: Definitions
E: τ = r × F; |τ| = rF sin θ = F d_{⊥}
- d_{⊥} is the perpendicular distance from the axis to the line of action (the moment arm).
- A **couple**: two equal, opposite, parallel forces; zero net force, torque Fd about any point, where d is the separation of their lines.
- Units N m (not joules, though dimensionally the same): torque is a vector, work a scalar.
H: Everyday torque
- Door handles far from hinges; long spanners; cranks and pedals (maximum torque when the crank is horizontal).
- Engines quote torque: wheel force = engine torque × gear ratio / wheel radius.
P: A force whose line of action passes through the axis has no moment arm, so it cannot turn the body however large it is. Pushing on a door's edge towards the hinge does nothing.
X: A 30 N force pushes a 0.25 m spanner at 60° to the handle. Find the torque.
> τ = rF sin θ = 0.25 × 30 × sin 60° = 6.5 N m
> Pushing at 90° would give the maximum, 7.5 N m
K: Torque = force × perpendicular distance from the axis to the line of action; direction by the right-hand rule.
!: Torque depends on where the axis is; always say about which point you take moments.
T: Torque | The turning effect of a force, τ = r × F, in N m
T: Moment arm | The perpendicular distance from the axis to the line of action of the force
T: Couple | A pair of equal, opposite, parallel forces with separate lines of action, giving torque but no net force
SUM: τ = rF sin θ = Fd_{⊥}; a force through the axis gives no torque.
SUM: A couple produces pure rotation with torque Fd about any point.
EV: established | Torque as r × F is the standard definition of the moment of a force
SRC: OpenStax, University Physics Volume 1, section 10.6 "Torque" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/10-6-torque
SRC: AQA, A-level Physics specification (7408), section 3.4.1.2, Moments | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What is the moment arm? | The perpendicular distance from the axis to the line of action of the force.
Q: What is a couple? | Two equal and opposite parallel forces with different lines of action, giving pure torque.
M1@1: A 20 N force acts 0.5 m from a pivot along a line through the pivot. Torque? | 0 | 10 N m | 40 N m | 20 N m | The line of action passes through the pivot, so the moment arm is zero and τ = 0 however large the force.
M2@3: Why is a door handle placed far from the hinges? | A larger moment arm gives more torque for the same force | It's easier to see | The door is lighter there | It reduces friction | τ = Fd_{⊥}, so the same push far from the hinge axis gives a bigger turning effect.
NUM2@1: A mechanic applies 80 N at right angles to a spanner, 0.30 m from the nut. What torque does she apply, in N m? | 24 | 0.5 | N m | τ = Fd_{⊥} = 80 × 0.30 = 24 N m, the largest possible for that force and distance.
M2@2: Two 15 N forces form a couple with lines of action 0.40 m apart. The torque is: | 6.0 N m | 12 N m | 3.0 N m | 0 N m | A couple's torque is F × separation = 15 × 0.40 = 6.0 N m, the same about any point; the net force is zero.
M3@1,3: A cyclist presses down with 400 N on a 0.17 m crank. The torque is largest when the crank is: | Horizontal | Vertical, pedal at the top | At 30° below horizontal | Vertical, pedal at the bottom | With a vertical push, d_{⊥} = 0.17 cos(angle from horizontal), greatest when horizontal: 68 N m; at top or bottom it is zero.
SA2@1,2: Explain why torque and energy are both measured in N m yet are different quantities, and why a couple has the same torque about every point. | Torque is r × F, a vector whose r is perpendicular to F; work is F·s, a scalar with the displacement along the force, so the units coincide but the quantities differ (we write J only for energy). For a couple, forces F and −F act at r_{1} and r_{2}; the total torque about any origin is r_{1} × F − r_{2} × F = (r_{1} − r_{2}) × F, which does not depend on the origin and has size Fd. | Torque is a vector cross product ; Work is a scalar dot product ; Couple torque depends only on separation ; Magnitude Fd

## Moment of inertia
S: Moment of inertia measures how hard it is to change an object's rotation. It depends not only on mass but on how far that mass sits from the axis, squared, so the same object has different I about different axes.
O: Calculate I for systems of point masses
O: Recall and compare standard moments of inertia
O: Derive I for a simple body by integration
PRE: Torque and moment of force
LV: A level · Application
H: Definition
E: I = Σm_{i}r_{i}^{2} = ∫r^{2} dm
E: I = Mk^{2} :: radius of gyration k
- r is the perpendicular distance of each piece of mass from the axis. Unit kg m^{2}.
H: Standard results (axis through the centre unless stated)
- Point mass at r: Mr^{2}. Thin ring/hoop: MR^{2}. Solid disc or cylinder: ½MR^{2}.
- Solid sphere: (2/5)MR^{2}. Thin spherical shell: (2/3)MR^{2}.
- Thin rod about centre: (1/12)ML^{2}; about one end: (1/3)ML^{2}.
- Rectangular plate about centre (axis ⊥ plate): (1/12)M(a^{2} + b^{2}).
X: Derive I for a uniform rod of length L about one end.
> dm = (M/L)dx; I = ∫_{0}^{L} x^{2}(M/L)dx
> I = ML^{2}/3
P: Flywheels put mass at the rim to maximise I for their mass; figure skaters reduce I by pulling arms in.
K: I plays the role of mass in rotation, but mass far from the axis counts much more because of the r^{2}.
!: I depends on the axis chosen. The same rod has I = ML^{2}/12 about its centre and ML^{2}/3 about an end.
T: Moment of inertia | I = Σmr^{2}, the resistance of a body to changes in its rotation about a given axis
T: Radius of gyration | The distance k at which all the mass could be placed to give the same I, I = Mk^{2}
SUM: I = Σmr^{2} depends on mass and its distribution about a chosen axis.
SUM: For equal M and R: hoop (MR^{2}) > shell (2/3) > disc (1/2) > solid sphere (2/5).
EV: established | I = Σmr^{2} is the standard definition of rotational inertia
SRC: OpenStax, University Physics Volume 1, section 10.4 "Moment of Inertia and Rotational Kinetic Energy" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/10-4-moment-of-inertia-and-rotational-kinetic-energy
SRC: OpenStax, University Physics Volume 1, section 10.5 "Calculating Moments of Inertia" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/10-5-calculating-moments-of-inertia
SRC: AQA, A-level Physics specification (7408), section 3.11.1.1, Concept of moment of inertia | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What is the moment of inertia of a solid disc about its axis? | ½MR^{2}.
Q: Why does a hoop have a larger I than a disc of the same mass and radius? | All its mass is at the maximum radius.
M1@2: Which has the largest I for equal M and R? | Hoop | Solid disc | Solid sphere | Spherical shell | The coefficients are hoop 1, shell 2/3, disc 1/2, sphere 2/5: the hoop has all its mass at the full radius.
M2@1: Two 1 kg masses sit 0.5 m either side of an axis on a light rod. I = ? | 0.5 kg m^{2} | 0.25 kg m^{2} | 1 kg m^{2} | 2 kg m^{2} | I = Σmr^{2} = 2 × 1 × 0.5^{2} = 0.5 kg m^{2}; 0.25 counts only one mass.
NUM1@1: A 3.0 kg point mass is 0.40 m from an axis. What is its moment of inertia, in kg m^{2}? | 0.48 | 0.01 | kg m^{2} | I = mr^{2} = 3.0 × 0.40^{2} = 3.0 × 0.16 = 0.48 kg m^{2}; remember to square the distance.
M2@2: A solid cylinder has M = 4.0 kg and R = 0.10 m. Its I about its axis is: | 0.020 kg m^{2} | 0.040 kg m^{2} | 0.20 kg m^{2} | 0.010 kg m^{2} | I = ½MR^{2} = ½ × 4.0 × 0.010 = 0.020 kg m^{2}; 0.040 is the hoop value MR^{2}.
M3@1,3: A rod's mass is moved so that more of it lies near the axis, keeping M fixed. Its I: | Decreases, since the r^{2} weighting favours distant mass | Stays the same, since M is unchanged | Increases, since the mass is more concentrated | Doubles, since I depends on 2r | I = ∫r^{2}dm weights each element by r^{2}, so moving mass inward lowers I even at constant total mass.
SA3@2,3: Explain, using I = ∫r^{2}dm, why a uniform rod has a smaller moment of inertia about its centre (ML^{2}/12) than about one end (ML^{2}/3). | About the centre, the farthest mass is only L/2 away; about an end, half the rod lies between L/2 and L away. Since each element counts as r^{2}, the far half contributes much more. Integrating ∫x^{2}(M/L)dx from −L/2 to L/2 gives ML^{2}/12, while from 0 to L gives ML^{2}/3, four times larger. | Elements weighted by r squared ; Mass farther away about the end ; Integration limits differ ; Ratio of four

## Rotational kinetic energy
S: A spinning body stores kinetic energy because each part of it moves. For rotation about a fixed axis it's ½Iω^{2}; a body that rolls has both translational and rotational energy, and torques do work as they turn.
O: Calculate rotational kinetic energy and the energy of a rolling body
O: Use W = τθ and P = τω for rotational work and power
O: Explain what limits the energy a flywheel can store
PRE: Moment of inertia
LV: A level · Application
H: Formulas
E: KE_{rot} = ½Iω^{2}
E: KE = ½Mv_{cm}^{2} + ½I_{cm}ω^{2} :: rolling or general motion
E: W = ∫τ dθ; P = τω :: rotational work and power
- Derivation: sum ½m_{i}v_{i}^{2} with v_{i} = ωr_{i}, giving ½(Σm_{i}r_{i}^{2})ω^{2}.
H: Flywheel storage
P: Flywheels store energy as rotation: grid frequency stabilisers, KERS in racing cars, and old steam engines smoothing power strokes. Energy is limited by the material's strength: rim stress ∝ ρv^{2}, so the best flywheels use strong, light carbon fibre spun very fast.
X: A 50 kg solid-disc flywheel of radius 0.4 m spins at 3000 rpm. Find its energy.
> I = ½ × 50 × 0.16 = 4.0 kg m^{2}; ω = 314 rad s^{-1}
> KE = ½ × 4.0 × 314^{2} = 197 kJ
K: Rotational KE is ½Iω^{2}; for rolling, add the translational ½Mv^{2} of the centre of mass.
!: For rolling objects, don't forget the rotational term; ignoring it makes them seem faster than they are.
T: Rotational kinetic energy | The kinetic energy of rotation, ½Iω^{2}
T: Flywheel | A heavy rotor used to store kinetic energy and smooth out changes in speed
SUM: KE_{rot} = ½Iω^{2}, and a rolling body has ½Mv^{2} + ½Iω^{2}.
SUM: A torque does work τθ and delivers power τω.
EV: established | ½Iω^{2} follows from summing ½mv^{2} over a rigid body
SRC: OpenStax, University Physics Volume 1, section 10.4 "Moment of Inertia and Rotational Kinetic Energy" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/10-4-moment-of-inertia-and-rotational-kinetic-energy
SRC: OpenStax, University Physics Volume 1, section 10.8 "Work and Power for Rotational Motion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/10-8-work-and-power-for-rotational-motion
SRC: AQA, A-level Physics specification (7408), section 3.11.1.2, Rotational kinetic energy | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What is the power delivered by a torque? | P = τω.
Q: What is the total KE of a rolling object? | ½Mv^{2} + ½Iω^{2}.
M1@1: Doubling a flywheel's ω multiplies its stored energy by: | 4 | 2 | 8 | √2 | KE = ½Iω^{2} depends on ω squared, so doubling ω multiplies the energy by 2^{2} = 4.
M2@2: A motor exerts 50 N m at 100 rad s^{-1}. Power? | 5 kW | 50 W | 500 W | 2 W | P = τω = 50 × 100 = 5000 W = 5 kW; power is torque times angular velocity in rad s^{-1}.
NUM2@1: A wheel with I = 2.0 kg m^{2} spins at 10 rad s^{-1}. What is its rotational kinetic energy, in J? | 100 | 1 | J | KE = ½Iω^{2} = ½ × 2.0 × 10^{2} = 100 J; the energy grows with the square of ω.
M2@2: A torque of 20 N m turns a capstan through 5.0 revolutions. The work done is about: | 630 J | 100 J | 31 J | 1300 J | W = τθ with θ in radians: 5.0 × 2π = 31.4 rad, so W = 20 × 31.4 ≈ 630 J; 100 J wrongly uses revolutions.
M3@1,3: Two flywheels of equal mass and radius spin at the same ω: one a hoop, one a solid disc. Which stores more energy? | The hoop, twice as much | The disc, twice as much | They store the same | The hoop, four times as much | KE = ½Iω^{2} and I_{hoop} = MR^{2} is twice I_{disc} = ½MR^{2}, so the hoop stores twice the energy.
SA3@1,3: Explain why flywheels for energy storage are made of strong, light materials spun very fast rather than heavy steel spun slowly. | Stored energy is ½Iω^{2}, so it grows with the square of speed but only linearly with mass. The limit is the stress in the rim, which scales as ρv^{2}: the material bursts if v is too high. Energy per unit mass therefore scales as strength/density, so a strong, low-density material such as carbon fibre can run at a high rim speed and store more energy per kilogram than steel. | Energy ∝ ω² but only ∝ mass ; Rim stress ∝ ρv² limits speed ; Energy per kg ∝ strength/density ; Carbon fibre favoured

## Angular momentum
S: Angular momentum is the rotational counterpart of linear momentum. For a rigid body about a fixed axis it's Iω; for a particle it's r × p. Net torque changes it, just as net force changes linear momentum.
O: Calculate angular momentum for particles and rigid bodies
O: Use τ = dL/dt and angular impulse τΔt = ΔL
O: Recognise that angular momentum is quantised in quantum mechanics
PRE: Moment of inertia
LV: A level · Application
H: Definitions
E: L = r × p :: particle
E: L = Iω :: rigid body about a symmetry axis
E: τ = dL/dt :: rotational Newton's second law
- Units kg m^{2} s^{-1} (or J s, the same units as Planck's constant).
- A particle moving in a straight line has angular momentum about any point not on its line: L = mvd_{⊥}.
- Angular impulse τΔt equals the change in L, as FΔt equals Δp.
H: Quantum angular momentum
P: In quantum mechanics angular momentum is quantised: orbital L = √(l(l + 1))ħ, with z-component m_{l}ħ, and particles carry intrinsic spin (½ħ for electrons). Bohr's atom started from L = nħ.
X: Find the angular momentum of the Earth's orbit (m = 6.0 × 10^{24} kg, r = 1.5 × 10^{11} m, T = 1 year).
> v = 2πr/T = 3.0 × 10^{4} m s^{-1}
> L = mvr = 2.7 × 10^{40} kg m^{2} s^{-1}
K: Angular momentum is always defined about a point or axis; torque about that same point changes it.
!: L = Iω is only parallel to ω for rotation about a principal axis; for a lopsided body, L and ω point in different directions (see rigid-body dynamics).
T: Angular momentum | L = r × p for a particle, Iω for a rigid body about a symmetry axis
T: Angular impulse | The product τΔt of torque and time, equal to the change in angular momentum
SUM: L = r × p = mvd_{⊥} for a particle and Iω for a symmetric rigid body.
SUM: Net torque is the rate of change of L: τ = dL/dt, so τΔt = ΔL.
EV: established | τ = dL/dt follows from Newton's laws for systems of particles
SRC: OpenStax, University Physics Volume 1, section 11.2 "Angular Momentum" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/11-2-angular-momentum
SRC: AQA, A-level Physics specification (7408), section 3.11.1.5, Angular momentum | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: How is torque related to angular momentum? | τ = dL/dt.
Q: What is the angular momentum of a particle about a point? | L = r × p, magnitude mvd_{⊥}.
M1@1: A 2 kg disc (r = 0.5 m) spins at 4 rad s^{-1}. L = ? | 1 kg m^{2} s^{-1} | 2 kg m^{2} s^{-1} | 4 kg m^{2} s^{-1} | 0.5 kg m^{2} s^{-1} | For a disc I = ½MR^{2} = ½ × 2 × 0.25 = 0.25 kg m^{2}, so L = Iω = 0.25 × 4 = 1 kg m^{2} s^{-1}.
M2@2: A 10 N m torque acts for 3 s on a stationary wheel. Its angular momentum becomes: | 30 kg m^{2} s^{-1} | 3.3 kg m^{2} s^{-1} | 10 kg m^{2} s^{-1} | 0 | Angular impulse equals the change in L: ΔL = τΔt = 10 × 3 = 30 kg m^{2} s^{-1}, whatever the wheel's I.
NUM1@1: A 0.50 kg ball moves at 4.0 m s^{-1} along a line passing 2.0 m from point P. What is its angular momentum about P, in kg m^{2} s^{-1}? | 4 | 0.1 | kg m^{2} s^{-1} | L = mvd_{⊥} = 0.50 × 4.0 × 2.0 = 4.0 kg m^{2} s^{-1}; a body moving in a straight line still has angular momentum about a point off its line.
TF2@1: A particle moving in a straight line at constant velocity has zero angular momentum about every point. | false | About a point off its line L = mvd_{⊥} is non-zero; it is constant, since no torque acts, but only points on the line give L = 0.
M3@2,3: The SI unit of angular momentum is the same as the unit of: | Planck's constant | Torque | Energy | Power | kg m^{2} s^{-1} = J s, the unit of h; this is why ħ sets the natural scale of quantised angular momentum.
SA2@1,2: A flywheel with I = 0.80 kg m^{2} is brought from rest to 50 rad s^{-1} by a constant torque in 4.0 s. Find its final angular momentum and the torque, and explain the link to linear impulse. | Final L = Iω = 0.80 × 50 = 40 kg m^{2} s^{-1}. Since τ = dL/dt and the torque is constant, τ = ΔL/Δt = 40/4.0 = 10 N m. This mirrors F = Δp/Δt: the angular impulse τΔt equals the change in angular momentum, as force times time equals the change in linear momentum. | L = 40 kg m² s⁻¹ ; τ = ΔL/Δt ; τ = 10 N m ; Analogy with linear impulse

## Conservation of angular momentum
S: With no net external torque, a system's total angular momentum stays constant. A skater spins faster by pulling in her arms, collapsing stars become pulsars, and planets sweep out equal areas in equal times, all because of this law.
O: Apply I_{1}ω_{1} = I_{2}ω_{2} to systems with no external torque
O: Explain why kinetic energy changes when I changes
O: Relate central forces to Kepler's second law
PRE: Angular momentum
LV: A level · Application
H: Consequences
E: I_{1}ω_{1} = I_{2}ω_{2} :: no external torque
- Reducing I increases ω; rotational KE rises, the extra energy coming from the work done pulling mass inwards.
- Central forces (gravity towards the Sun) exert no torque, so planetary L is constant: Kepler's second law.
- A cat twists to land on its feet with zero total L by rotating parts of its body in opposite directions.
- Rotational collisions (a lump dropped on a turntable) conserve L but lose kinetic energy, like inelastic linear collisions.
H: In astronomy
P: Contracting gas clouds spin up as they shrink, flattening into discs that form planetary systems and galaxies. In Kepler's second law, the area swept per unit time is dA/dt = L/(2m), constant because the Sun exerts no torque on a planet.
X: A star of radius 7 × 10^{8} m rotating once per 30 days collapses to a 10 km neutron star. Estimate its new period.
> ω ∝ 1/R^{2} for constant L (I ∝ MR^{2}, same shape assumed)
> T_{new} = 30 days × (10^{4}/7 × 10^{8})^{2} = 30 × 86 400 × 2.0 × 10^{-10} s ≈ 0.5 ms: a millisecond pulsar
K: Zero external torque means L is fixed, so ω changes inversely with I.
!: KE isn't conserved when a skater pulls in her arms; it increases. Angular momentum is the conserved quantity.
T: Conservation of angular momentum | With zero net external torque, the total angular momentum of a system is constant
T: Central force | A force always directed along the line to a fixed centre, which exerts no torque about it
SUM: No external torque ⇒ I_{1}ω_{1} = I_{2}ω_{2}; reducing I raises ω.
SUM: KE = L^{2}/(2I) rises as I falls; central forces conserve L, giving Kepler's second law.
EV: established | Angular momentum conservation holds in every known isolated system
SRC: OpenStax, University Physics Volume 1, section 11.3 "Conservation of Angular Momentum" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/11-3-conservation-of-angular-momentum
SRC: OpenStax, University Physics Volume 1, section 13.5 "Kepler's Laws of Planetary Motion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/13-5-keplers-laws-of-planetary-motion
SRC: AQA, A-level Physics specification (7408), section 3.11.1.5, Angular momentum | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: Why do planets move faster near the Sun? | Gravity exerts no torque about the Sun, so L = mvr is constant; smaller r means larger v.
Q: Where does the extra kinetic energy come from when a skater pulls in her arms? | The work she does pulling her arms inward.
M1@1: A skater halves her moment of inertia. Her angular velocity: | Doubles | Halves | Quadruples | Stays the same | With no external torque L = Iω is constant, so halving I doubles ω.
M2@1: A child jumps onto the edge of a spinning roundabout. The roundabout: | Slows down | Speeds up | Keeps the same speed | Stops | The child adds moment of inertia while L stays the same (no external torque about the axle), so ω falls.
NUM2@1: A turntable (I = 0.20 kg m^{2}) spins at 3.0 rad s^{-1}. A ring with I = 0.10 kg m^{2} is dropped onto it and sticks. What is the new ω, in rad s^{-1}? | 2 | 0.05 | rad s^{-1} | L is conserved: 0.20 × 3.0 = (0.20 + 0.10)ω, so ω = 0.60/0.30 = 2.0 rad s^{-1}.
M2@2: In that turntable collision, the fraction of kinetic energy lost is: | 1/3 | 0 | 1/2 | 2/3 | KE before ½ × 0.20 × 9 = 0.90 J; after ½ × 0.30 × 4 = 0.60 J; so 0.30 J, a third, becomes heat, like an inelastic collision.
TF3@2,3: A comet in an elliptical orbit moves fastest at its closest approach to the Sun because its angular momentum is greatest there. | false | Its angular momentum mvr is the same everywhere, since gravity is central and exerts no torque; it moves fastest where r is smallest.
SA3@1,2: A skater spins at 2.0 rev s^{-1} with arms out (I = 4.0 kg m^{2}) and pulls them in (I = 1.6 kg m^{2}). Find her new spin rate and explain what happens to her kinetic energy. | With no external torque about the vertical axis, L is conserved: 4.0 × 2.0 = 1.6 × f, so f = 5.0 rev s^{-1}. Rotational KE = L^{2}/(2I) rises by the factor 4.0/1.6 = 2.5. The extra energy comes from the work her muscles do pulling her arms inwards against their tendency to move outward. | L conserved, no external torque ; f = 5.0 rev s⁻¹ ; KE increases by 2.5 times ; Energy from muscular work

## Rotational dynamics
S: Rotational dynamics applies Στ = Iα (for a fixed axis) to find how torques change rotation. Problems with pulleys, wheels and hinged objects combine it with F = ma for the parts that translate, linked by a constraint such as a = αR.
O: Apply Στ = Iα to bodies rotating about a fixed axis
O: Combine rotational and translational equations through constraints
O: Explain why tensions differ either side of a massive pulley
PRE: Moment of inertia
LV: A level · Application
H: The laws
E: Στ = Iα :: fixed axis
E: ΣF = Ma_{cm} :: for translation of the centre of mass
- Link equations through constraints: a = αr for a string unwinding without slipping.
- Draw a separate free-body diagram for each body; choose a positive sense of rotation consistent with the direction of motion.
H: Massive pulley (Atwood machine with a real pulley)
E: a = (m_{1} − m_{2})g/(m_{1} + m_{2} + I/R^{2})
P: The pulley's inertia appears as an extra effective mass I/R^{2}; tensions on either side now differ, since a net torque (T_{1} − T_{2})R is needed to spin it up.
X: A 2.0 kg mass hangs from a string wrapped round a 4.0 kg solid cylinder (R = 0.1 m) on a fixed axle. Find a.
> mg − T = ma; TR = (½MR^{2})(a/R) ⇒ T = ½Ma
> a = mg/(m + M/2) = 19.6/4 = 4.9 m s^{-2}; T = ½ × 4.0 × 4.9 = 9.8 N
K: Torque causes angular acceleration as force causes linear acceleration: Στ = Iα.
!: With a massive pulley, the tension isn't the same on both sides; treating it as equal ignores the pulley's inertia.
T: Newton's second law for rotation | Net torque about a fixed axis equals moment of inertia times angular acceleration, Στ = Iα
T: Constraint | A geometric condition linking motions, such as a = αR for a string that does not slip
SUM: Στ = Iα for rotation and ΣF = Ma for translation, joined by a = αR.
SUM: A massive pulley adds I/R^{2} to the effective mass and needs unequal tensions.
EV: established | Στ = Iα follows from Newton's second law applied to every particle of a rigid body
SRC: OpenStax, University Physics Volume 1, section 10.7 "Newton's Second Law for Rotation" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/10-7-newtons-second-law-for-rotation
SRC: AQA, A-level Physics specification (7408), section 3.11.1.4, Torque and angular acceleration | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What is Newton's second law for rotation about a fixed axis? | Στ = Iα.
Q: How does a pulley's inertia enter an Atwood machine? | As an extra effective mass I/R^{2} in the denominator.
M1@1: A 6 N m torque acts on a body with I = 2 kg m^{2}. α = ? | 3 rad s^{-2} | 12 rad s^{-2} | 0.33 rad s^{-2} | 6 rad s^{-2} | From Στ = Iα, α = τ/I = 6/2 = 3 rad s^{-2}; 12 multiplies instead of dividing.
M2@2: A yo-yo released from rest falls with acceleration: | Less than g | Equal to g | Greater than g | Zero | The string's upward tension both reduces the net downward force and provides the torque that spins the yo-yo, so a < g.
NUM2@1: A grinding wheel with I = 0.50 kg m^{2} must reach α = 8.0 rad s^{-2}. What net torque is needed, in N m? | 4 | 0.1 | N m | Στ = Iα = 0.50 × 8.0 = 4.0 N m; the torque is proportional to both the inertia and the required angular acceleration.
M2@2,3: In an Atwood machine with a massive pulley, the heavier side's string tension compared with the lighter side's is: | Larger | Smaller | Equal | Zero | The net torque (T_{heavy} − T_{light})R must accelerate the pulley's rotation, so the tension on the heavier side is larger.
M3@2: A solid cylinder (I = ½MR^{2}) rolls down without slipping, unwound by a string fixed at the top like a yo-yo. Its acceleration is: | 2g/3 | g/2 | g/3 | g | Mg − T = Ma and TR = ½MR^{2}(a/R) give T = ½Ma, so Mg = 3Ma/2 and a = 2g/3.
SA2@2,3: A 1.0 kg mass hangs from a light string wound on a pulley of radius 0.20 m and I = 0.040 kg m^{2}. Set up the equations and find the acceleration, using g = 9.8 m s^{-2}. | For the mass: mg − T = ma. For the pulley: TR = Iα with α = a/R, so T = Ia/R^{2} = 0.040a/0.040 = 1.0a. Adding: mg = (m + I/R^{2})a, so a = 9.8/(1.0 + 1.0) = 4.9 m s^{-2}, and T = 4.9 N. The pulley behaves as an extra 1.0 kg of effective mass. | Equation for the mass ; Torque equation for the pulley ; Constraint a = αR ; a = 4.9 m s⁻²

## Rolling without slipping
S: When a wheel rolls without slipping, its contact point is momentarily at rest, linking translation and rotation by v = ωR. Objects rolling down a slope accelerate at a rate set only by how their mass is distributed, not by their mass or size.
O: Use the rolling condition v = ωR and the speed of points on a wheel
O: Calculate the acceleration and final speed of bodies rolling down a slope
O: Explain the role of static friction in rolling
PRE: Rotational kinetic energy
LV: A level · Application
H: The constraint
E: v_{cm} = ωR; a_{cm} = αR
- Top of the wheel moves at 2v; contact point at 0.
- Static friction acts at the contact point; it does no work when there's no slipping.
- Rolling is equivalent to pure rotation about the instantaneous contact point.
H: Rolling down a slope
E: a = g sin θ/(1 + I/MR^{2})
E: v = √(2gh/(1 + I/MR^{2})) :: speed after descending height h
- Race down a slope: solid sphere (I/MR^{2} = 0.4) beats solid cylinder (0.5) beats hoop (1). Mass and radius don't matter, only shape.
X: A solid ball rolls from rest down a 1.0 m high ramp. Find its speed at the bottom.
> mgh = ½mv^{2}(1 + 2/5), so v = √(2 × 9.8 × 1.0/1.4) = 3.7 m s^{-1}
> A frictionless sliding block would reach 4.4 m s^{-1}
K: The fraction of energy that goes into spin, set by I/MR^{2}, decides how fast a body rolls.
!: Friction is needed for rolling, but for pure rolling it's static and wastes no energy. (Rolling resistance from deformation is a separate effect.)
T: Rolling without slipping | Motion in which the contact point is instantaneously at rest, so v_{cm} = ωR
T: Instantaneous axis | The line through the contact point about which a rolling body is momentarily in pure rotation
SUM: Rolling without slipping means v = ωR; the top moves at 2v and the contact point is at rest.
SUM: Down a slope a = g sin θ/(1 + I/MR^{2}): sphere beats cylinder beats hoop, whatever their masses.
EV: established | Rolling dynamics follows from combining F = ma and τ = Iα with v = ωR
SRC: OpenStax, University Physics Volume 1, section 11.1 "Rolling Motion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/11-1-rolling-motion
SRC: AQA, A-level Physics specification (7408), section 3.11.1.2, Rotational kinetic energy | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: Which reaches the bottom of a slope first: a solid sphere or a hoop? | The solid sphere (smaller I/MR^{2}).
Q: How fast does the top of a rolling wheel move? | 2v, twice the speed of the centre.
M1@2: For a hoop rolling down a slope, a = ? | ½g sin θ | g sin θ | (5/7)g sin θ | (2/3)g sin θ | For a hoop I/MR^{2} = 1, so a = g sin θ/(1 + 1) = ½g sin θ; (5/7) is the solid sphere and (2/3) the solid cylinder.
M2@2: What fraction of a rolling solid cylinder's KE is rotational? | 1/3 | 1/2 | 2/5 | 2/7 | Rotational ½(½MR^{2})(v/R)^{2} = ¼Mv^{2}; total ½Mv^{2} + ¼Mv^{2} = ¾Mv^{2}; so the fraction is 1/3.
NUM2@2: A solid cylinder rolls from rest down a slope, dropping 0.60 m. What is its speed at the bottom, in m s^{-1}? (g = 9.8 m s^{-2}) | 2.8 | 0.1 | m s^{-1} | v = √(2gh/(1 + ½)) = √(4gh/3) = √(4 × 9.8 × 0.60/3) = √7.84 = 2.8 m s^{-1}.
TF1@1: For a wheel rolling without slipping, the point touching the ground is momentarily at rest. | true | The centre moves forward at v and the bottom point moves backward at ωR = v relative to the centre, so its ground speed is zero.
M3@2,3: A heavy solid sphere and a light solid sphere of different radii roll down the same slope from rest. Which reaches the bottom first? | They arrive together | The heavy sphere | The light sphere | The larger sphere | a = g sin θ/(1 + I/MR^{2}) and I/MR^{2} = 2/5 for every solid sphere, so mass and radius cancel out.
SA3@2,3: Explain why a hoop rolls down a slope more slowly than a solid sphere, and why the friction that makes them roll does not waste energy. | Released from the same height, each converts the same gpe per kilogram into kinetic energy, split between translation and rotation in the ratio set by I/MR^{2}. The hoop (1) puts half into spin, the sphere (0.4) only 2/7, so the sphere has more translational KE and moves faster at every height. Static friction acts at the contact point, which is momentarily at rest, so it does no work and dissipates nothing; it only transfers energy between translation and rotation. | Same energy per kg available ; Split set by I/MR² ; Hoop puts more into rotation ; Static friction does no work since contact point is at rest

## Rotational equilibrium
S: A body is in rotational equilibrium when the net torque on it is zero about every point. Combined with zero net force, this lets you solve for unknown forces in beams, ladders, cranes and limbs.
O: State and apply the two conditions for static equilibrium
O: Choose a pivot that eliminates unknown forces
O: Solve ladder, beam and lever problems including friction
PRE: Equilibrium and statics
LV: GCSE and A level · Application
H: Method
- Draw a free-body diagram with forces at their points of action.
- Choose a pivot point that eliminates unknowns (torque of a force through that point is zero).
- Sum clockwise and anticlockwise moments: Στ = 0 (the principle of moments).
- Add force balance in x and y as needed.
P: Three non-parallel forces in equilibrium must pass through one point: otherwise one of them would have a moment about the intersection of the other two. This is a quick check on ladder and hinge diagrams.
H: Centre of gravity
P: The weight of a body can be taken to act at its centre of gravity. To find it experimentally, hang the body from two points; the plumb lines cross at the CG. A body resting on a base is stable while the vertical line through its CG falls inside the base.
X: A uniform ladder (length 5 m, weight 200 N) leans against a smooth wall at 60° to the ground. Find the minimum friction coefficient at the floor.
> Floor: N = 200 N, friction f. Wall: horizontal force R = f
> Moments about the foot: R × 5 sin 60° = 200 × 2.5 cos 60° ⇒ R = 57.7 N
> μ ≥ 57.7/200 = 0.29
K: Equilibrium needs both ΣF = 0 and Στ = 0; either alone is not enough.
!: In equilibrium, net torque is zero about every point, so pick whichever point makes the algebra easiest.
T: Principle of moments | For a body in equilibrium, the sum of clockwise moments about any point equals the sum of anticlockwise moments
T: Centre of gravity | The point through which the whole weight of a body can be taken to act
SUM: Static equilibrium: ΣF = 0 and Στ = 0 about any point.
SUM: Take moments about the point where unknown forces act to remove them from the equation.
EV: established | The two conditions for equilibrium follow from Newton's second law for translation and rotation
SRC: OpenStax, University Physics Volume 1, section 12.1 "Conditions for Static Equilibrium" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/12-1-conditions-for-static-equilibrium
SRC: OpenStax, University Physics Volume 1, section 12.2 "Examples of Static Equilibrium" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/12-2-examples-of-static-equilibrium
SRC: AQA, A-level Physics specification (7408), section 3.4.1.2, Moments | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: Why can you choose any point as the pivot in an equilibrium problem? | If net force and net torque are zero, the torque is zero about every point.
Q: How can you find the centre of gravity of an irregular sheet? | Hang it from two points; the vertical lines through the suspension points cross at the CG.
M1@3: A 1 m metre rule balances at 50 cm. A 100 g mass at 10 cm needs what mass at 90 cm to balance? | 100 g | 50 g | 200 g | 10 g | Both masses are 40 cm from the pivot, so equal moments need equal masses: 100 g × 40 cm = m × 40 cm.
M2@3: In the forearm, the biceps attaches 4 cm from the elbow; a 30 N load is held 35 cm away. Biceps force (ignoring the arm's weight)? | 262 N | 30 N | 3.4 N | 1050 N | Moments about the elbow: F × 4 = 30 × 35, so F = 262 N; the short moment arm makes muscles exert large forces.
NUM2@3: A uniform 4.0 m plank of weight 300 N rests on supports at its two ends. A 500 N person stands 1.0 m from the left end. What is the force from the right-hand support, in N? | 275 | 1 | N | Moments about the left end: R × 4.0 = 300 × 2.0 + 500 × 1.0 = 1100, so R = 275 N (and the left support gives 525 N).
TF1@1: An object with zero net force on it must be in equilibrium. | false | A couple gives zero net force but a non-zero torque, so the body would start rotating; equilibrium needs both ΣF = 0 and Στ = 0.
M3@2,3: In the ladder problem, which pivot removes two unknown forces at once? | The foot of the ladder | The top of the ladder | The ladder's midpoint | Any point on the wall | Both the normal force and friction act at the foot, so taking moments there leaves only the wall force and the weight.
SA3@1,3: A uniform 2.0 m shelf of weight 40 N is hinged to a wall at one end and held horizontal by a vertical string at the other end. A 20 N box sits 0.50 m from the wall. Find the string tension and the hinge force, explaining your method. | Take moments about the hinge to remove its unknown force: T × 2.0 = 40 × 1.0 + 20 × 0.50 = 50, so T = 25 N. Vertical force balance then gives the hinge force: H + 25 = 40 + 20, so H = 35 N upwards. Both conditions, Στ = 0 and ΣF = 0, are needed. | Moments about the hinge ; T = 25 N ; Force balance for hinge ; H = 35 N up

## Parallel-axis theorem
S: The parallel-axis theorem gives the moment of inertia about any axis from the moment about a parallel axis through the centre of mass. It saves redoing integrals for pendulums, hinged doors and offset wheels.
O: State and apply I = I_{cm} + Md^{2}
O: Explain why I is smallest about an axis through the centre of mass
O: Use the theorem to find the period of a physical pendulum
PRE: Moment of inertia
LV: A level · Application
H: The theorem
E: I = I_{cm} + Md^{2} :: d is the distance between the parallel axes
- I is always smallest about an axis through the centre of mass.
- Only works from the CM axis; to shift between two non-CM axes, go via the CM.
P: Proof sketch: write each mass element's position as r = d + r′, measured from the CM axis. Then Σmr^{2} = Σmr′^{2} + Md^{2} + 2d·Σmr′, and the last term vanishes because Σmr′ = 0 about the centre of mass.
H: Physical pendulum
E: T = 2π√(I/(Mgd)) :: d = distance from pivot to CM
P: A rod swinging from one end has I = ML^{2}/12 + M(L/2)^{2} = ML^{2}/3 and d = L/2, giving T = 2π√(2L/3g): shorter than a simple pendulum of length L.
X: Find I for a solid disc (M = 2 kg, R = 0.2 m) about an axis through its rim, perpendicular to the disc.
> I = ½MR^{2} + MR^{2} = 1.5MR^{2}
> = 1.5 × 2 × 0.04 = 0.12 kg m^{2}
K: Shifting an axis a distance d from the centre of mass always adds Md^{2}.
!: The theorem needs one of the two axes to pass through the centre of mass.
T: Parallel-axis theorem | I about any axis equals I about a parallel axis through the centre of mass plus Md^{2}
T: Physical pendulum | A rigid body swinging about a pivot, with period 2π√(I/Mgd)
SUM: I = I_{cm} + Md^{2}, valid only when one axis passes through the CM.
SUM: It gives the moment of inertia of offset bodies and the period of physical pendulums.
EV: established | The parallel-axis theorem is an exact result of the definition of the centre of mass
SRC: OpenStax, University Physics Volume 1, section 10.5 "Calculating Moments of Inertia" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/10-5-calculating-moments-of-inertia
SRC: OpenStax, University Physics Volume 1, section 15.4 "Pendulums" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/15-4-pendulums
Q: State the parallel-axis theorem. | I = I_{cm} + Md^{2}.
Q: About which of a family of parallel axes is I smallest? | The one through the centre of mass.
M1@1: A rod's I about its centre is ML^{2}/12. About its end: | ML^{2}/3 | ML^{2}/4 | ML^{2}/12 | ML^{2} | The end is d = L/2 from the centre, so I = ML^{2}/12 + M(L/2)^{2} = ML^{2}/12 + 3ML^{2}/12 = ML^{2}/3.
M2@1: A solid sphere's I about a tangent axis is: | (7/5)MR^{2} | (2/5)MR^{2} | MR^{2} | (3/5)MR^{2} | A tangent axis is d = R from the centre: I = (2/5)MR^{2} + MR^{2} = (7/5)MR^{2}.
NUM2@1: A hoop of mass 0.50 kg and radius 0.20 m hangs on a nail through its rim. What is its I about the nail (axis perpendicular to the hoop), in kg m^{2}? | 0.04 | 0.001 | kg m^{2} | I = I_{cm} + Md^{2} = MR^{2} + MR^{2} = 2 × 0.50 × 0.040 = 0.040 kg m^{2}.
TF2@2: A body's moment of inertia about an axis 1 m from its centre of mass can be smaller than about the parallel axis through the centre of mass. | false | The theorem adds Md^{2}, which is always positive, so the CM axis gives the smallest I of any family of parallel axes.
M3@3: A uniform metre rule swings from one end. Its period is about: | 1.6 s | 2.0 s | 1.0 s | 2.8 s | T = 2π√(2L/3g) = 2π√(2 × 1.0/(3 × 9.8)) = 2π × 0.26 ≈ 1.6 s; a simple pendulum of 1 m would take 2.0 s.
SA3@1,3: Explain, using the parallel-axis theorem, why a uniform rod swinging from one end has a shorter period than a simple pendulum of the same length. | For the rod about its end, I = ML^{2}/12 + M(L/2)^{2} = ML^{2}/3, and the CM is d = L/2 below the pivot, so T = 2π√(I/Mgd) = 2π√(2L/3g). A simple pendulum has T = 2π√(L/g). The rod's mass is spread along its length, much of it nearer the pivot, so its equivalent length is only 2L/3 and it swings faster. | Uses I = I_cm + Md² to get ML²/3 ; d = L/2 ; T = 2π√(2L/3g) ; Equivalent length 2L/3 is shorter

## Perpendicular-axis theorem
S: For a flat (planar) object, the moment of inertia about an axis perpendicular to its plane equals the sum of the moments about two perpendicular axes lying in the plane and crossing at the same point.
O: State the perpendicular-axis theorem and its condition of validity
O: Use it with symmetry to find in-plane moments of inertia
O: Combine it with the parallel-axis theorem
PRE: Parallel-axis theorem
LV: Year 1 · Application
H: The theorem
E: I_{z} = I_{x} + I_{y} :: lamina in the xy-plane
- Only valid for thin flat objects (laminae).
- Combined with symmetry it finds in-plane moments quickly.
P: Proof: I_{z} = ∫(x^{2} + y^{2})dm = ∫x^{2}dm + ∫y^{2}dm = I_{y} + I_{x}, because for a lamina z = 0.
H: Worked results
X: Find I for a thin ring about a diameter.
> About its axis, I_{z} = MR^{2}
> By symmetry I_{x} = I_{y}, so I_{x} = MR^{2}/2
X: A thin disc about a diameter.
> I_{z} = ½MR^{2}, so I_{diameter} = ¼MR^{2}
- Square plate of side a: I_{z} = Ma^{2}/6, so each in-plane axis through the centre gives Ma^{2}/12.
K: For a lamina, the perpendicular-axis moment is the sum of the two in-plane moments through the same point.
!: Don't apply the perpendicular-axis theorem to 3D bodies like spheres or thick cylinders; it fails because z ≠ 0.
T: Lamina | A thin flat body whose thickness is negligible compared with its other dimensions
T: Perpendicular-axis theorem | For a lamina, I_{z} = I_{x} + I_{y} for perpendicular axes meeting at a point
SUM: For a lamina only, I_{z} = I_{x} + I_{y}.
SUM: With symmetry (I_{x} = I_{y}) it gives in-plane moments as half the perpendicular one.
EV: established | The theorem follows exactly from r^{2} = x^{2} + y^{2} for a planar body
SRC: OpenStax, University Physics Volume 1, section 10.5 "Calculating Moments of Inertia" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/10-5-calculating-moments-of-inertia
SRC: OpenStax, University Physics Volume 1, section 10.4 "Moment of Inertia and Rotational Kinetic Energy" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/10-4-moment-of-inertia-and-rotational-kinetic-energy
Q: State the perpendicular-axis theorem. | For a lamina, I_{z} = I_{x} + I_{y} about perpendicular axes meeting at a point, with z perpendicular to the plane.
Q: What is the moment of inertia of a thin disc about a diameter? | ¼MR^{2}.
M1@2: A square plate has I = A about each in-plane axis through its centre parallel to the sides. About the perpendicular axis: | 2A | A | A/2 | 4A | By the perpendicular-axis theorem I_{z} = I_{x} + I_{y} = A + A = 2A for this flat plate.
M2@1: The perpendicular-axis theorem applies to: | Thin flat objects | Any solid | Spheres only | Rods only | The proof needs z = 0 for every mass element, so the mass must lie in a plane (a lamina).
NUM2@2: A thin disc has M = 2.0 kg and R = 0.30 m. What is its I about a diameter, in kg m^{2}? | 0.045 | 0.001 | kg m^{2} | I_{z} = ½MR^{2} = 0.090 kg m^{2}; by symmetry each diameter gets half: ¼MR^{2} = 0.045 kg m^{2}.
TF1@1: The perpendicular-axis theorem gives I for a solid sphere about a diameter from its value about another diameter. | false | A sphere is not a lamina: its mass has z ≠ 0, so I_{z} ≠ I_{x} + I_{y}; in fact all three diameters give (2/5)MR^{2}.
M3@3: A thin ring (mass M, radius R) swings about a tangent line lying in its plane. Its I is: | (3/2)MR^{2} | 2MR^{2} | ½MR^{2} | MR^{2} | About a diameter I = ½MR^{2} (perpendicular-axis theorem); the parallel tangent is R away, so I = ½MR^{2} + MR^{2} = (3/2)MR^{2}.
SA2@1,2: Show how the perpendicular-axis theorem gives the moment of inertia of a thin disc about a diameter, and state why it could not be used for a thick cylinder. | For the disc lying in the xy-plane, I_{z} = ½MR^{2} about the central axis. Symmetry makes every diameter equivalent, so I_{x} = I_{y}, and I_{z} = I_{x} + I_{y} = 2I_{x} gives I_{x} = ¼MR^{2}. The theorem relies on r^{2} = x^{2} + y^{2}, which holds only if all mass has z = 0; a thick cylinder has mass spread along z, so its moments do not add this way. | I_z = ½MR² ; Symmetry gives I_x = I_y ; I_diameter = ¼MR² ; Needs z = 0, fails for thick body

## Gyroscopic motion
S: A spinning gyroscope resists changes in the direction of its axis. A torque doesn't tip it over; instead the axis swings sideways (precesses), because torque changes angular momentum in the direction of the torque.
O: Explain precession using τ = dL/dt
O: Explain spin stabilisation in terms of large angular momentum
O: Describe practical uses of gyroscopes
PRE: Angular momentum
LV: Year 1 · Physical reasoning
H: How it works
E: τ = dL/dt :: torque adds angular momentum in its own direction, perpendicular to L
- A fast-spinning wheel has large L; a small torque changes its direction slowly.
- For a gyroscope supported at one end, gravity's torque is horizontal, so L swings round horizontally instead of tipping down.
- Spin stabilisation: rifle bullets, frisbees, spinning satellites keep their orientation.
H: Uses
- Gyrocompasses align with the Earth's rotation axis, so they point to true north.
- Inertial navigation (with accelerometers) in aircraft, submarines and spacecraft.
- Control moment gyros turn the ISS and space telescopes without fuel.
- MEMS vibrating gyroscopes in phones measure rotation via the Coriolis effect.
X: Why is a moving bicycle easier to balance than a stationary one?
> Spinning wheels' gyroscopic effects contribute, but the main stabiliser is steering geometry (trail) that turns the wheel into a lean
> Experiments with counter-rotating wheels show bicycles balance even without net gyroscopic effects
K: A torque perpendicular to L changes its direction, not its size: the axis precesses.
!: A gyroscope doesn't defy gravity; gravity's torque is what drives the precession, and friction eventually lets it fall.
T: Gyroscope | A rapidly spinning rotor whose large angular momentum resists changes in the direction of its axis
T: Precession | The rotation of a spinning body's axis caused by a torque perpendicular to its angular momentum
SUM: τ = dL/dt: a torque at right angles to L rotates L rather than lengthening it.
SUM: Large spin L makes orientation hard to change, which is used for stabilisation and navigation.
EV: established | Gyroscopic precession follows from τ = dL/dt
SRC: OpenStax, University Physics Volume 1, section 11.4 "Precession of a Gyroscope" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/11-4-precession-of-a-gyroscope
SRC: OpenStax, College Physics 2e, section 10.7 "Gyroscopic Effects: Vector Aspects of Angular Momentum" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/10-7-gyroscopic-effects-vector-aspects-of-angular-momentum
Q: Why does a torque on a spinning gyroscope cause precession rather than toppling? | The torque changes L in its own direction, which is perpendicular to L, so L rotates sideways.
Q: Name two uses of gyroscopes. | Inertial navigation, gyrocompasses, spacecraft attitude control, phone motion sensing.
M1@2: Spinning a bullet makes it: | Stable in direction | Faster | Heavier | Less affected by gravity | Its spin angular momentum means aerodynamic torques only make the axis precess slightly, so it resists tumbling.
M2@3: How do phones measure rotation? | MEMS gyroscopes sensing Coriolis forces on vibrating masses | Tiny spinning wheels | GPS | Magnetometers only | A vibrating micro-structure is deflected sideways by the Coriolis effect when the phone rotates, and the deflection is measured.
TF1@1: A torque applied to a fast-spinning gyroscope changes mainly the direction of its angular momentum, not its size. | true | When τ is perpendicular to L, dL is perpendicular to L, so L turns without growing; this sideways turning is precession.
M2@1: A gyroscope's axle is horizontal and supported at one end. Gravity's torque on it points: | Horizontally, perpendicular to the axle | Vertically downwards | Along the axle | Vertically upwards | τ = r × F with r along the horizontal axle and F downward gives a horizontal torque at right angles to the axle, so L swings round horizontally.
M3@1,2: The same torque is applied to two identical gyroscopes, one spinning twice as fast. The faster one: | Precesses at half the rate | Precesses twice as fast | Topples more quickly | Precesses at the same rate | The precession rate is τ/L, and doubling the spin doubles L, so the axis turns half as fast.
SA2@1,2: A gyroscope spins with its axle horizontal, supported at one end. Explain why it precesses around the support instead of falling. | Gravity acting at the centre of mass gives a torque about the support, τ = r × mg, which is horizontal and perpendicular to the axle. Since τ = dL/dt, in a short time L gains a small horizontal piece at right angles to itself, so L (and the axle) turns sideways rather than tipping. Repeated, this makes the axle sweep round in a horizontal circle: precession. It falls only once friction has slowed the spin. | Gravity gives a horizontal torque ; τ = dL/dt adds dL perpendicular to L ; L turns rather than tips ; Continuous turning is precession

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
