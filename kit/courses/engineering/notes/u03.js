// EngineerGradify Dynamics (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## Rectilinear motion
LV: Year 1 · Foundation
S: Rectilinear motion is motion along a straight line. This lesson defines position, velocity and acceleration as derivatives, sets out the constant-acceleration equations, and shows how to solve problems when acceleration varies.
O: Relate position, velocity and acceleration using calculus
O: Apply the constant-acceleration equations to straight-line motion
O: Solve problems where acceleration varies with time or position
PRE: Differentiation and rates of change
H: Definitions
E: v = ds/dt, a = dv/dt = d^{2}s/dt^{2}, a ds = v dv :: the last form is useful when a depends on position
P: **Displacement** s is position relative to an origin; **velocity** v is its rate of change; **acceleration** a is the rate of change of velocity. Velocity is the slope of an s–t graph; displacement is the area under a v–t graph.
H: Constant acceleration
E: v = u + at; s = ut + ½at^{2}; v^{2} = u^{2} + 2as; s = ½(u + v)t :: valid only when a is constant
X: A car brakes from 20 m/s with a constant deceleration of 5 m/s^{2}.
> Use v^{2} = u^{2} + 2as with v = 0, u = 20, a = −5.
> 0 = 400 − 10s, so s = 40 m.
> Time to stop: v = u + at gives 0 = 20 − 5t, so t = 4 s.
> Doubling the speed to 40 m/s would quadruple the braking distance to 160 m.
H: Variable acceleration
P: If acceleration depends on time, integrate a(t) to find v(t), then integrate again for s(t), using initial conditions. If it depends on position, use a ds = v dv. If it depends on velocity (as with drag), separate variables: dv/a(v) = dt.
K: Velocity and acceleration are derivatives of position; the four constant-acceleration equations apply only when acceleration is constant, otherwise integrate using the appropriate form.
!: Using the constant-acceleration equations when acceleration varies. Check that a is constant before using them; otherwise integrate.
EV: established | The kinematic relations for rectilinear motion are fundamental to engineering dynamics.
EV: established | Braking distance scaling with the square of speed underlies road safety guidance such as the Highway Code stopping distances.
T: Displacement | Position relative to a chosen origin, with direction
T: Velocity | The rate of change of displacement
T: Acceleration | The rate of change of velocity
SUM: v = ds/dt and a = dv/dt.
SUM: Use the constant-acceleration equations only when a is constant.
SUM: Integrate for variable acceleration.
SRC: Hibbeler R. C., Engineering Mechanics: Dynamics, 14th edition in SI units, Pearson | secondary | 2017
SRC: Meriam J. L., Kraige L. G. and Bolton J. N., Engineering Mechanics: Dynamics, 9th edition, Wiley | secondary | 2018
Q: What does the area under a velocity–time graph represent? | Displacement.
Q: Which equation links v, u, a and s without time? | v^{2} = u^{2} + 2as.
M1#engineering-u03-01-q1@1: A body starts from rest with a = 2 m/s^{2}. What is its speed after 5 s? | 10 m/s | 2.5 m/s | 25 m/s | 7 m/s | With constant acceleration, v = u + at = 0 + 2 × 5 = 10 m/s.
M2#engineering-u03-01-q2@2: A train accelerates uniformly from 10 m/s to 30 m/s over 400 m. What is its acceleration? | 1.0 m/s^{2} | 0.05 m/s^{2} | 2.0 m/s^{2} | 0.5 m/s^{2} | v^{2} = u^{2} + 2as: 900 = 100 + 800a, so a = 1.0 m/s^{2}.
M3#engineering-u03-01-q3@3: A particle's acceleration is a = 6t m/s^{2}, starting from rest at the origin. What is its displacement at t = 2 s? | 8 m | 12 m | 24 m | 6 m | Integrate: v = 3t^{2}, s = t^{3}; at t = 2, s = 8 m. The constant-acceleration equations don't apply.
NUM1#engineering-u03-01-q4@1: A cyclist starts from rest with constant acceleration 3 m/s^{2}. How far do they travel in 4 s, in m? | 24 | 1% | m | s = ut + ½at^{2} = 0 + ½ × 3 × 16 = 24 m.
SA2#engineering-u03-01-q5@2,3: Explain why stopping distance increases with the square of speed, and the engineering significance. | From v^{2} = u^{2} + 2as with v = 0 and constant deceleration, s = u^{2}/2|a|, so doubling initial speed quadruples braking distance. Reaction distance adds a term proportional to speed. This explains why speed limits matter for safety, why braking systems must be sized for maximum speed, and how stopping distances are calculated in road design. | Derivation from kinematics ; Square law ; Reaction distance ; Engineering or safety application

## Curvilinear motion: rectangular components
LV: Year 1 · Foundation
S: When a particle moves along a curved path, its position, velocity and acceleration are vectors. This lesson treats curvilinear motion in x–y components, showing how to find velocity and acceleration by differentiating each component.
O: Express position, velocity and acceleration as vectors in rectangular components
O: Differentiate component functions to find velocity and acceleration
O: Find speed and direction of motion from components
PRE: Rectilinear motion
H: Vector description
E: r = x i + y j; v = dx/dt i + dy/dt j; a = d^{2}x/dt^{2} i + d^{2}y/dt^{2} j
P: Each component behaves like rectilinear motion, so x and y can be treated separately and combined at the end. The velocity is always **tangent** to the path; acceleration generally isn't.
X: A particle has x = t^{2} m and y = 2t m.
> v_{x} = 2t, v_{y} = 2. At t = 3 s: v = 6i + 2j m/s.
> Speed = √(6^{2} + 2^{2}) = 6.32 m/s, at tan^{-1}(2/6) = 18.4° to the x-axis.
> a_{x} = 2, a_{y} = 0: a = 2i m/s^{2}, constant.
> The path is a parabola: x = (y/2)^{2}.
H: When to use rectangular components
- When the motion is naturally described by x and y, as in projectiles (constant acceleration in one direction).
- When forces act along fixed directions.
- For motion along curves with changing direction, normal and tangential components are often clearer.
IX: projectile
K: In curvilinear motion, treat each rectangular component as rectilinear motion; velocity is tangent to the path, and speed is the magnitude of the velocity vector.
!: Adding speeds instead of velocity components. Speed is √(v_{x}^{2} + v_{y}^{2}), not v_{x} + v_{y}.
EV: established | Rectangular component analysis of curvilinear motion is standard in engineering dynamics.
EV: established | Component methods are the basis of numerical trajectory simulation in engineering software.
T: Curvilinear motion | Motion along a curved path
T: Position vector | A vector from the origin to a particle's location
T: Speed | The magnitude of the velocity vector
SUM: Differentiate each component separately.
SUM: Velocity is tangent to the path.
SUM: Combine components for speed and direction.
SRC: Hibbeler R. C., Engineering Mechanics: Dynamics, 14th edition in SI units, Pearson | secondary | 2017
SRC: Meriam J. L., Kraige L. G. and Bolton J. N., Engineering Mechanics: Dynamics, 9th edition, Wiley | secondary | 2018
Q: How is velocity found from a position vector r(t)? | By differentiating each component with respect to time.
Q: In which direction is a particle's velocity always directed? | Tangent to its path.
M1#engineering-u03-02-q1@1: A particle's velocity is 3i + 4j m/s. What is its speed? | 5 m/s | 7 m/s | 1 m/s | 12 m/s | Speed is the magnitude of velocity: √(3^{2} + 4^{2}) = 5 m/s.
M2#engineering-u03-02-q2@2: A particle has x = 4t and y = t^{3}. What is its acceleration at t = 2 s? | 12j m/s^{2} | 4i + 12j m/s^{2} | 4i m/s^{2} | 12i m/s^{2} | a_{x} = 0 (x is linear); a_{y} = 6t = 12 at t = 2.
M3#engineering-u03-02-q3@3: A drone flies with v = 5i + (2t)j m/s. When is its velocity at 45° to the x-axis? | t = 2.5 s | t = 5 s | t = 1 s | Never | At 45°, v_{y} = v_{x}: 2t = 5, so t = 2.5 s.
NUM1#engineering-u03-02-q4@1: A particle's velocity components are v_{x} = 6 m/s and v_{y} = 2 m/s. What is its speed, in m/s? | 6.32 | 1% | m/s | Speed = √(36 + 4) = √40 = 6.32 m/s.
SA2#engineering-u03-02-q5@2,3: Explain why curvilinear motion can be analysed by splitting it into rectangular components. | Position, velocity and acceleration are vectors, and the x and y components are independent: each obeys the rectilinear relations v = ds/dt and a = dv/dt. Analysing them separately turns a two-dimensional problem into two one-dimensional ones, which are combined at the end for speed and direction. This is especially convenient when acceleration is constant in a fixed direction, as with gravity. | Vectors and independence ; Each component as rectilinear ; Combining results ; Convenience for fixed-direction forces

## Normal and tangential components
LV: Year 1 · Intermediate
S: Normal and tangential components describe motion along a curve relative to the path itself. This lesson explains tangential acceleration (change of speed) and normal (centripetal) acceleration (change of direction), with applications to vehicles on curves.
O: Resolve acceleration into tangential and normal components
O: Calculate centripetal acceleration from speed and radius of curvature
O: Apply normal and tangential components to vehicle and machine problems
PRE: Curvilinear motion: rectangular components
H: The components
E: a_{t} = dv/dt; a_{n} = v^{2}/ρ; a = √(a_{t}^{2} + a_{n}^{2}) :: ρ is the radius of curvature
- **Tangential acceleration** a_{t} changes the **speed**; it acts along the path.
- **Normal acceleration** a_{n} changes the **direction**; it points towards the centre of curvature.
P: Even at constant speed, motion on a curve involves normal acceleration. For a circle, ρ is the radius.
X: A car on a curve of radius 50 m travels at 15 m/s and accelerates at 2 m/s^{2} along the road.
> a_{n} = 15^{2} ÷ 50 = 4.5 m/s^{2}, towards the centre of the curve.
> a_{t} = 2 m/s^{2}, along the road.
> Total acceleration = √(4.5^{2} + 2^{2}) = 4.92 m/s^{2}.
> Friction between tyres and road must supply the horizontal force m × 4.92.
H: Applications
- **Road and rail design**: curve radius and banking limit safe speed.
- **Rotating machinery**: points on a wheel have a_{n} = ω^{2}r.
- **Roller coasters**: forces on riders depend on v^{2}/ρ at loops.
K: Tangential acceleration changes speed; normal acceleration v^{2}/ρ changes direction and points to the centre of curvature; total acceleration combines the two.
!: Thinking an object moving at constant speed on a curve has no acceleration. Its direction is changing, so it has normal acceleration v^{2}/ρ.
EV: established | Normal–tangential analysis is standard for vehicle, rail and machine dynamics.
EV: established | Highway design standards set minimum curve radii for given design speeds based on v^{2}/ρ and friction.
T: Tangential acceleration | The component of acceleration along the path, changing speed
T: Normal acceleration | The component towards the centre of curvature, v^{2}/ρ, changing direction
T: Radius of curvature | The radius of the circle that best fits the path at a point
SUM: a_{t} = dv/dt; a_{n} = v^{2}/ρ.
SUM: Constant speed on a curve still means acceleration.
SUM: Used in road, rail and machine design.
SRC: Hibbeler R. C., Engineering Mechanics: Dynamics, 14th edition in SI units, Pearson | secondary | 2017
SRC: Meriam J. L., Kraige L. G. and Bolton J. N., Engineering Mechanics: Dynamics, 9th edition, Wiley | secondary | 2018
Q: What is the normal acceleration of a particle moving at speed v on a curve of radius ρ? | v^{2}/ρ, directed towards the centre of curvature.
Q: What does tangential acceleration change? | The speed of the particle.
M1#engineering-u03-03-q1@1: A particle moves at constant speed around a circle. Which acceleration does it have? | Normal acceleration only | Tangential acceleration only | No acceleration | Both, equal in size | Constant speed means a_{t} = 0, but direction changes, so a_{n} = v^{2}/r.
M2#engineering-u03-03-q2@2: A train travels at 30 m/s round a curve of radius 900 m. What is its normal acceleration? | 1.0 m/s^{2} | 0.033 m/s^{2} | 30 m/s^{2} | 3.0 m/s^{2} | a_{n} = v^{2}/ρ = 900 ÷ 900 = 1.0 m/s^{2}.
M3#engineering-u03-03-q3@3: If a car doubles its speed on the same curve, what happens to the friction force needed to keep it on the curve? | It quadruples, because normal acceleration depends on v^{2} | It doubles | It halves | It stays the same | a_{n} = v^{2}/ρ, so doubling v quadruples a_{n} and the required force.
NUM2#engineering-u03-03-q4@2: A car on a curve of radius 50 m travels at 15 m/s with tangential acceleration 2 m/s^{2}. What is the magnitude of its total acceleration, in m/s^{2}? | 4.92 | 1% | m/s^{2} | a_{n} = 225/50 = 4.5; total = √(4.5^{2} + 2^{2}) = 4.92 m/s^{2}.
SA2#engineering-u03-03-q5@2,3: Explain why roads have speed limits on sharp bends, using normal acceleration. | A vehicle on a bend needs normal acceleration v^{2}/ρ towards the centre, supplied by friction between tyres and road (and banking). The maximum friction force is limited by the friction coefficient and the vehicle's weight. Since required acceleration rises with the square of speed and falls with radius, sharp bends can only be taken safely at lower speeds; above the limit the vehicle skids outwards. | a_n = v^2/ρ ; Supplied by friction ; Limited maximum friction ; Square of speed and radius

## Projectile motion
LV: Year 1 · Foundation
S: A projectile moves under gravity alone after launch, giving constant downward acceleration and constant horizontal velocity. This lesson derives the equations for time of flight, range and maximum height, and discusses the effect of air resistance.
O: Resolve projectile motion into horizontal and vertical components
O: Calculate time of flight, range and maximum height
O: Explain the limitations of the vacuum projectile model
PRE: Curvilinear motion: rectangular components
H: The model
P: Ignoring air resistance, a projectile has **constant horizontal velocity** and **constant vertical acceleration** g = 9.81 m/s^{2} downwards. For launch speed u at angle θ above the horizontal:
E: u_{x} = u cos θ, u_{y} = u sin θ; x = u_{x}t; y = u_{y}t − ½gt^{2}
E: Time of flight (level ground) T = 2u sin θ/g; range R = u^{2} sin 2θ/g; maximum height H = u^{2} sin^{2} θ/(2g)
X: A ball is kicked at 20 m/s at 30° above level ground.
> u_{x} = 20 cos 30° = 17.3 m/s; u_{y} = 20 sin 30° = 10.0 m/s.
> Time of flight = 2 × 10 ÷ 9.81 = 2.04 s.
> Range = 17.3 × 2.04 = 35.3 m.
> Maximum height = 10^{2} ÷ (2 × 9.81) = 5.10 m.
IX: projectile
H: Air resistance
P: In a vacuum, the maximum range on level ground is at 45°. With air resistance, range is shorter, the trajectory is no longer symmetrical, and the best angle is usually less than 45°. Drag matters greatly for fast or light objects such as golf balls and shuttlecocks.
K: Projectiles have constant horizontal velocity and constant vertical acceleration g; range is u^{2} sin 2θ/g, maximum at 45° in a vacuum, but air resistance shortens range and lowers the best angle.
!: Using the level-ground range formula when launch and landing heights differ. Solve the vertical equation for the actual landing height instead.
EV: established | The parabolic projectile model is exact in a vacuum with uniform gravity.
EV: established | Real trajectories with drag are computed numerically; ballistics and sports engineering use such models.
T: Projectile | An object moving under gravity alone after launch
T: Range | The horizontal distance travelled by a projectile
T: Time of flight | The time a projectile spends in the air
SUM: Horizontal velocity constant; vertical acceleration g.
SUM: T = 2u sin θ/g; R = u^{2} sin 2θ/g; H = u^{2} sin^{2} θ/(2g).
SUM: Air resistance shortens range and lowers the best angle.
SRC: Hibbeler R. C., Engineering Mechanics: Dynamics, 14th edition in SI units, Pearson | secondary | 2017
SRC: Mehta R. D., "Aerodynamics of sports balls", Annual Review of Fluid Mechanics 17, 151–189 | secondary | 1985
Q: What is the horizontal acceleration of a projectile in the vacuum model? | Zero: horizontal velocity is constant.
Q: At what launch angle is range greatest on level ground in a vacuum? | 45°.
M1#engineering-u03-04-q1@1: What is the vertical acceleration of a projectile, ignoring air resistance? | 9.81 m/s^{2} downwards | Zero | 9.81 m/s^{2} upwards | It depends on the launch angle | Gravity gives constant downward acceleration g.
M2#engineering-u03-04-q2@2: A stone is thrown horizontally at 15 m/s from a cliff 20 m high. How long does it take to reach the sea? | 2.02 s | 1.33 s | 4.08 s | 0.75 s | Vertical motion from rest: 20 = ½ × 9.81 × t^{2}, so t = √(40/9.81) = 2.02 s.
M3#engineering-u03-04-q3@3: A golf ball's real range is much less than the vacuum formula predicts, and the best launch angle is lower than 45°. What is the best explanation? | Air resistance slows the ball and changes the trajectory, so the vacuum model overestimates range | Gravity is weaker near the ground | The vacuum formula is wrong even in a vacuum | Golf balls accelerate horizontally after launch | Drag removes energy and makes trajectories asymmetric; lift from spin also matters.
NUM1#engineering-u03-04-q4@1: A projectile is launched at 15 m/s at 45° on level ground. Ignoring air resistance, what is its range, in m? | 22.9 | 1% | m | R = u^{2} sin 2θ/g = 225 × 1 ÷ 9.81 = 22.9 m.
SA2#engineering-u03-04-q5@2,3: Derive the range of a projectile launched at speed u and angle θ on level ground. | Resolve: u_{x} = u cos θ, u_{y} = u sin θ. Vertically, y = u_{y}t − ½gt^{2}; on landing y = 0, so t = 2u sin θ/g. Horizontally, R = u_{x}t = u cos θ × 2u sin θ/g = u^{2} × 2 sin θ cos θ/g = u^{2} sin 2θ/g. The maximum, when sin 2θ = 1, is at θ = 45°. | Resolve components ; Time of flight ; Range expression ; Maximum at 45°

## Relative motion
LV: Year 1 · Intermediate
S: Motion depends on the frame of reference. This lesson explains relative position, velocity and acceleration between two particles, and solves classic problems such as crossing a river and wind on aircraft.
O: Write relative velocity equations between two moving bodies
O: Solve river-crossing and wind problems with vector addition
O: Explain the importance of reference frames in engineering
PRE: Forces as vectors
H: Relative motion equations
E: r_{B} = r_{A} + r_{B/A}; v_{B} = v_{A} + v_{B/A}; a_{B} = a_{A} + a_{B/A} :: B/A means "B relative to A"
P: The velocity of B **relative to A** is v_{B/A} = v_{B} − v_{A}: the velocity A would observe if it treated itself as stationary.
X: A boat crosses a 60 m river at 4 m/s relative to the water, pointing straight across. The river flows at 3 m/s.
> Boat's ground velocity = 4 (across) + 3 (downstream) = 5 m/s at tan^{-1}(3/4) = 36.9° downstream of straight across.
> Time to cross = 60 ÷ 4 = 15 s (only the cross-river component matters).
> Downstream drift = 3 × 15 = 45 m.
> To land directly opposite, the boat must head upstream at sin^{-1}(3/4) = 48.6° to the cross-river line, crossing at √(4^{2} − 3^{2}) = 2.65 m/s.
H: Applications
- **Aircraft navigation**: airspeed plus wind velocity gives ground velocity.
- **Collision avoidance**: ships and aircraft compute relative velocity to find closest approach.
- **Mechanisms**: velocity of one link relative to another.
K: Relative velocity is the vector difference of two velocities, v_{B/A} = v_{B} − v_{A}; river and wind problems add velocity vectors to find ground velocity.
!: Subtracting speeds instead of velocity vectors. Relative velocity must be found by vector subtraction, accounting for direction.
EV: established | Galilean relative motion is exact for engineering speeds far below the speed of light.
EV: established | Relative velocity methods underpin collision-avoidance systems in shipping and aviation.
T: Relative velocity | The velocity of one body as observed from another, v_{B/A} = v_{B} − v_{A}
T: Frame of reference | A set of axes from which motion is measured
SUM: v_{B} = v_{A} + v_{B/A}.
SUM: Use vector addition for river and wind problems.
SUM: Relative motion matters in navigation and mechanisms.
SRC: Hibbeler R. C., Engineering Mechanics: Dynamics, 14th edition in SI units, Pearson | secondary | 2017
SRC: Meriam J. L., Kraige L. G. and Bolton J. N., Engineering Mechanics: Dynamics, 9th edition, Wiley | secondary | 2018
Q: How is the velocity of B relative to A defined? | v_{B/A} = v_{B} − v_{A}.
Q: In a river crossing, which component of the boat's velocity sets the crossing time? | The component perpendicular to the river banks.
M1#engineering-u03-05-q1@1: Car A travels east at 20 m/s and car B east at 25 m/s. What is B's velocity relative to A? | 5 m/s east | 45 m/s east | 5 m/s west | 25 m/s east | Relative velocity is v_{B} − v_{A} = 25 − 20 = 5 m/s east.
M2#engineering-u03-05-q2@2: An aircraft has an airspeed of 200 m/s due north and the wind blows at 30 m/s due east. What is its ground speed? | 202 m/s | 230 m/s | 170 m/s | 200 m/s | The velocities are perpendicular, so ground speed = √(200^{2} + 30^{2}) = √40,900 = 202 m/s.
M3#engineering-u03-05-q3@3: Two ships move at constant velocity. Ship B's velocity relative to A points directly at A. What does this mean? | They are on a collision course unless one changes course or speed | They will never meet | They are moving in parallel | Ship B is stationary | If the relative velocity points along the line joining them, the separation will shrink to zero.
NUM2#engineering-u03-05-q4@2: A swimmer heads straight across a 40 m river at 1.0 m/s relative to the water; the current is 0.5 m/s. How far downstream does the swimmer land, in m? | 20 | 1% | m | Crossing time = 40 ÷ 1.0 = 40 s; drift = 0.5 × 40 = 20 m.
SA2#engineering-u03-05-q5@2,3: Explain how a pilot corrects for a crosswind to fly along a desired track. | The ground velocity is the vector sum of the aircraft's velocity relative to the air and the wind velocity. To fly along a chosen track, the pilot heads partly into the wind so that the crosswind component is cancelled: the heading is offset by an angle whose sine equals the crosswind component divided by airspeed. Ground speed along the track is then reduced or increased depending on the wind's headwind or tailwind component. | Vector sum ; Heading into wind ; Angle relation ; Effect on ground speed

## Newton's second law for particles
LV: Year 1 · Intermediate
S: Newton's second law links force and acceleration and is the basis of kinetics. This lesson applies ΣF = ma to particles in straight-line and curved motion, using free-body and kinetic diagrams, with examples including lifts, inclines and vehicles on bends.
O: Apply ΣF = ma using free-body and kinetic diagrams
O: Solve straight-line kinetics problems including friction and inclines
O: Apply Newton's second law in normal and tangential components
PRE: Free-body diagrams
H: The law
E: ΣF = ma :: in components, ΣF_{x} = ma_{x}, ΣF_{y} = ma_{y}; or ΣF_{t} = ma_{t}, ΣF_{n} = mv^{2}/ρ
P: Draw a **free-body diagram** (forces) and a **kinetic diagram** (ma); equate them component by component. Units: newtons, with 1 N = 1 kg m/s^{2}.
X: An 800 kg lift accelerates upwards at 1.5 m/s^{2}. Find the cable tension.
> Forces: tension T upwards, weight mg = 800 × 9.81 = 7,848 N downwards.
> ΣF = ma (taking up as positive): T − 7,848 = 800 × 1.5.
> T = 7,848 + 1,200 = 9,048 N.
> When accelerating downwards at 1.5 m/s^{2}, T = 800 × (9.81 − 1.5) = 6,648 N.
H: Common situations
- **Inclines**: resolve along and perpendicular to the slope; friction μN opposes motion.
- **Connected bodies**: a string under tension links accelerations; treat each body separately.
- **Curves**: friction or banking supplies the force mv^{2}/ρ towards the centre.
K: Newton's second law ΣF = ma is applied component by component using free-body and kinetic diagrams; in curved motion, the normal force sum provides mv^{2}/ρ.
!: Treating ma as a force on the free-body diagram. ma is the result of the forces, shown on the kinetic diagram; adding it as an extra force double-counts.
EV: established | Newton's second law is exact for engineering applications at speeds far below the speed of light.
EV: established | Lift and hoist standards specify cable safety factors that account for dynamic loads from acceleration.
T: Kinetic diagram | A diagram showing ma for a body, equated to the free-body diagram
T: Newton's second law | The resultant force on a particle equals its mass times its acceleration
SUM: ΣF = ma in components.
SUM: Use free-body and kinetic diagrams.
SUM: On curves, ΣF_{n} = mv^{2}/ρ.
SRC: Hibbeler R. C., Engineering Mechanics: Dynamics, 14th edition in SI units, Pearson | secondary | 2017
SRC: Meriam J. L., Kraige L. G. and Bolton J. N., Engineering Mechanics: Dynamics, 9th edition, Wiley | secondary | 2018
Q: What is 1 newton in base SI units? | 1 kg m/s^{2}.
Q: What supplies the centripetal force for a car on a flat bend? | Friction between the tyres and the road.
M1#engineering-u03-06-q1@1: A net force of 50 N acts on a 10 kg mass. What is its acceleration? | 5 m/s^{2} | 500 m/s^{2} | 0.2 m/s^{2} | 60 m/s^{2} | From Newton's second law, a = F/m = 50/10 = 5 m/s^{2}.
M2#engineering-u03-06-q2@2: A 2 kg block slides down a frictionless slope at 30°. What is its acceleration? | 4.91 m/s^{2} | 9.81 m/s^{2} | 8.50 m/s^{2} | 2.45 m/s^{2} | Along the slope, a = g sin 30° = 9.81 × 0.5 = 4.91 m/s^{2}.
M3#engineering-u03-06-q3@3: A 1,000 kg car takes a flat bend of radius 40 m at 12 m/s. What is the minimum friction coefficient needed? | 0.37 | 0.12 | 3.6 | 0.04 | Required force = mv^{2}/r = 1,000 × 144/40 = 3,600 N; μ = 3,600/(1,000 × 9.81) = 0.37.
NUM2#engineering-u03-06-q4@2: An 800 kg lift accelerates upwards at 1.5 m/s^{2}. What is the tension in the cable, in N (g = 9.81 m/s^{2})? | 9048 | 1% | N | T − mg = ma, so T = 800 × (9.81 + 1.5) = 9,048 N.
SA2#engineering-u03-06-q5@2,3: Explain why a person in a lift feels heavier when it starts moving up and lighter when it starts moving down. | The floor's normal reaction is what a person feels as weight. Moving up with acceleration a, Newton's second law gives N − mg = ma, so N = m(g + a), larger than mg. Accelerating down, mg − N = ma, so N = m(g − a), smaller. At constant velocity, N = mg. Scales in the lift would read these values. | Normal reaction as felt weight ; Upward acceleration case ; Downward acceleration case ; Constant velocity

## Work and energy
LV: Year 1 · Intermediate
S: The work–energy principle relates the work done by forces to the change in kinetic energy, avoiding the need to find accelerations. This lesson defines work, kinetic and potential energy, and applies conservation of mechanical energy to particles, including springs.
O: Calculate the work done by constant and variable forces
O: Apply the principle of work and energy to particles
O: Use conservation of energy with gravitational and elastic potential energy
PRE: Newton's second law for particles
H: Work and energy
E: W = F d cos θ :: work done by a constant force F over displacement d at angle θ
E: KE = ½mv^{2}; PE_{grav} = mgh; PE_{spring} = ½kx^{2}
E: T_{1} + ΣU_{1→2} = T_{2} :: principle of work and energy; T is kinetic energy, U is work done
P: Work is measured in joules (1 J = 1 N m). Forces perpendicular to motion, such as the normal reaction on a flat surface, do no work. Friction does negative work, converting mechanical energy into heat.
H: Conservation of energy
P: If only **conservative forces** (gravity, springs) do work, mechanical energy is conserved: KE_{1} + PE_{1} = KE_{2} + PE_{2}. With friction, the loss equals the work done against friction.
X: A 2 kg block slides from rest down a frictionless slope, dropping 5 m vertically.
> Initial: KE = 0; PE = mgh = 2 × 9.81 × 5 = 98.1 J.
> At the bottom: all PE becomes KE: ½ × 2 × v^{2} = 98.1.
> v = √98.1 = 9.90 m/s, independent of the slope angle.
> If friction does 30 J of negative work, KE at the bottom is 68.1 J and v = 8.25 m/s.
K: The work done by all forces equals the change in kinetic energy; when only gravity and springs do work, mechanical energy is conserved, and friction removes energy as heat.
!: Including the normal reaction or other perpendicular forces in the work calculation. Forces perpendicular to the displacement do no work.
EV: established | The work–energy principle follows from integrating Newton's second law along the path.
EV: established | Energy methods are widely used in engineering because they avoid solving for accelerations at every instant.
T: Work | The product of force and displacement in the direction of the force, measured in joules
T: Kinetic energy | Energy of motion, ½mv^{2}
T: Conservative force | A force, such as gravity or a spring force, whose work depends only on start and end positions
SUM: W = Fd cos θ; KE = ½mv^{2}; PE = mgh or ½kx^{2}.
SUM: Work done equals change in kinetic energy.
SUM: Mechanical energy is conserved without friction.
SRC: Hibbeler R. C., Engineering Mechanics: Dynamics, 14th edition in SI units, Pearson | secondary | 2017
SRC: Meriam J. L., Kraige L. G. and Bolton J. N., Engineering Mechanics: Dynamics, 9th edition, Wiley | secondary | 2018
Q: What is the elastic potential energy stored in a spring? | ½kx^{2}, where k is the stiffness and x the extension or compression.
Q: Why does the normal reaction do no work on a block sliding on a flat floor? | It acts perpendicular to the displacement.
M1#engineering-u03-07-q1@1: A 50 N force pushes a box 4 m in the direction of the force. How much work is done? | 200 J | 12.5 J | 54 J | 46 J | Work is force times displacement along it: W = 50 × 4 = 200 J.
M2#engineering-u03-07-q2@2: A 1,000 kg car speeds up from 10 m/s to 20 m/s. What net work is done on it? | 150 kJ | 50 kJ | 200 kJ | 100 kJ | Change in KE = ½ × 1,000 × (20^{2} − 10^{2}) = 500 × 300 = 150,000 J.
M3#engineering-u03-07-q3@3: A spring of stiffness 2,000 N/m is compressed 0.1 m and launches a 0.5 kg ball on a frictionless surface. What is the ball's speed? | 6.32 m/s | 20 m/s | 0.45 m/s | 4.47 m/s | Spring energy ½ × 2,000 × 0.01 = 10 J becomes ½ × 0.5 × v^{2}, so v^{2} = 40 and v = 6.32 m/s.
NUM2#engineering-u03-07-q4@2: A 2 kg block slides from rest down a frictionless slope, dropping 5 m vertically. What is its speed at the bottom, in m/s (g = 9.81 m/s^{2})? | 9.90 | 1% | m/s | mgh = ½mv^{2}, so v = √(2 × 9.81 × 5) = √98.1 = 9.90 m/s.
SA2#engineering-u03-07-q5@2,3: Explain when energy methods are more convenient than Newton's second law in solving dynamics problems. | Energy methods relate speeds at two positions directly, without finding the acceleration at every point, so they are useful when forces vary with position (springs, gravity on curved paths) or when only speeds are needed. They handle curved paths easily since gravity's work depends only on height change. Newton's law is needed when accelerations, forces or times are required. | Speeds between positions ; Position-dependent forces ; Curved paths ; When Newton's law is needed

## Power and efficiency
LV: Year 1 · Foundation
S: Power is the rate of doing work, and efficiency compares useful output with input. This lesson defines power for forces and torques, calculates efficiency, and applies these ideas to motors, vehicles and lifting machines.
O: Calculate power from work and time, force and velocity, and torque and angular speed
O: Calculate the efficiency of a machine and the input power required
O: Apply power calculations to engineering systems
PRE: Work and energy
H: Power
E: P = W ÷ t = F v :: for a force F moving at velocity v along its line
E: P = T ω :: for a torque T rotating at angular velocity ω (rad/s)
P: Power is measured in watts (1 W = 1 J/s). Engines and motors are often rated in kilowatts.
H: Efficiency
E: η = useful power output ÷ power input
P: Efficiency is always less than 1 (100%) because of friction, heat, electrical resistance and other losses. For machines in series, overall efficiency is the product of the individual efficiencies.
X: A motor lifts a 500 kg load at a steady 0.4 m/s with 80% efficiency.
> Force to lift at steady speed = mg = 500 × 9.81 = 4,905 N.
> Useful output power = F v = 4,905 × 0.4 = 1,962 W.
> Input power = 1,962 ÷ 0.8 = 2,453 W, about 2.45 kW.
> Losses = 2,453 − 1,962 = 491 W, mainly as heat.
H: Vehicles and machines
- A car at steady speed needs power to overcome drag and rolling resistance: P = F_{resistive} × v.
- Drag force rises roughly with v^{2}, so power rises roughly with v^{3} at high speed.
- A gearbox and motor in series with efficiencies 0.95 and 0.90 have overall efficiency 0.855.
K: Power is the rate of doing work (P = Fv or Tω); efficiency is useful output over input, always less than 1, and series efficiencies multiply.
!: Confusing energy and power. Energy (J) is the total work done; power (W) is how fast it is done.
EV: established | Power and efficiency calculations are fundamental in mechanical and electrical engineering design.
EV: established | The cubic dependence of aerodynamic power on speed explains why fuel use rises sharply at high motorway speeds.
T: Power | The rate of doing work, measured in watts
T: Efficiency | The ratio of useful output power to input power
T: Torque | The turning moment of a force about an axis, measured in N m
SUM: P = W/t = Fv = Tω.
SUM: η = output ÷ input, always below 1.
SUM: Series efficiencies multiply.
SRC: Hibbeler R. C., Engineering Mechanics: Dynamics, 14th edition in SI units, Pearson | secondary | 2017
SRC: Bird J. and Ross C., Mechanical Engineering Principles, 4th edition, Routledge | secondary | 2019
Q: What is the power of a torque T at angular velocity ω? | P = Tω, with ω in radians per second.
Q: Why is efficiency always less than 100%? | Some input energy is lost, mainly as heat from friction and resistance.
M1#engineering-u03-08-q1@1: A machine does 6,000 J of work in 20 s. What is its power output? | 300 W | 120,000 W | 6,020 W | 30 W | Power is work divided by time: P = 6,000 ÷ 20 = 300 W.
M2#engineering-u03-08-q2@2: A pump has an output of 3 kW and an efficiency of 75%. What is its input power? | 4 kW | 2.25 kW | 3.75 kW | 2 kW | Input = output ÷ efficiency = 3 ÷ 0.75 = 4 kW.
M3#engineering-u03-08-q3@3: A motor (efficiency 0.9) drives a gearbox (efficiency 0.8) that drives a pump (efficiency 0.7). What is the overall efficiency? | 0.504 | 0.8 | 2.4 | 0.7 | Series efficiencies multiply: 0.9 × 0.8 × 0.7 = 0.504, about 50%.
NUM2#engineering-u03-08-q4@2: A motor lifts a 500 kg load at a steady 0.4 m/s with 80% efficiency. What input power is needed, in W (g = 9.81 m/s^{2})? | 2452.5 | 1% | W | Output = 500 × 9.81 × 0.4 = 1,962 W; input = 1,962 ÷ 0.8 = 2,452.5 W.
SA2#engineering-u03-08-q5@2,3: Explain why a car's fuel consumption rises sharply at high speed. | At steady speed, the engine's power must overcome resistive forces. Aerodynamic drag rises roughly with the square of speed, and power is force times velocity, so the power needed rises roughly with the cube of speed. Energy per kilometre therefore rises with speed squared, so fuel use per kilometre increases sharply, along with engine and drivetrain losses. | Drag rises with v squared ; P = Fv ; Power rises with v cubed ; Fuel per distance

## Impulse and momentum
LV: Year 1 · Intermediate
S: Impulse and momentum methods relate forces acting over time to changes in velocity. This lesson defines linear momentum and impulse, applies the impulse–momentum principle, and uses conservation of momentum for systems with no external impulse.
O: Define linear momentum and impulse
O: Apply the principle of impulse and momentum to particles
O: Apply conservation of linear momentum to systems of particles
PRE: Newton's second law for particles
H: Impulse and momentum
E: p = mv :: linear momentum, a vector in kg m/s
E: ∫F dt = mv_{2} − mv_{1} :: impulse equals change in momentum; for a constant force, FΔt = mΔv
P: Impulse is measured in N s (equal to kg m/s). The **average force** in a collision is the change in momentum divided by the contact time, so longer contact times mean smaller forces.
X: A 0.15 kg ball reaches a bat at 30 m/s and leaves at 20 m/s in the opposite direction; contact lasts 0.01 s.
> Take the ball's final direction as positive: u = −30 m/s, v = +20 m/s.
> Change in momentum = 0.15 × (20 − (−30)) = 0.15 × 50 = 7.5 N s.
> Average force = 7.5 ÷ 0.01 = 750 N.
> Doubling contact time with a "follow-through" would halve the average force for the same change in momentum.
IX: collisions
H: Conservation of momentum
P: If no external impulse acts on a system, its total momentum is conserved: Σmv_{1} = Σmv_{2}. This applies to collisions, explosions and recoil, even when kinetic energy isn't conserved.
K: Impulse equals change in momentum; average force equals change in momentum over contact time; with no external impulse, the total momentum of a system is conserved.
!: Forgetting that momentum is a vector. A ball reversing direction changes momentum by m(u + v), not m(v − u) using speeds only.
EV: established | Conservation of linear momentum follows from Newton's third law.
EV: established | Crumple zones, airbags and cycle helmets work by extending contact time to reduce peak forces.
T: Linear momentum | The product of mass and velocity, mv
T: Impulse | The integral of force over time, equal to the change in momentum
T: Conservation of momentum | The total momentum of a system is constant if no external impulse acts
SUM: p = mv; impulse = Δp.
SUM: Average force = Δp ÷ Δt.
SUM: Momentum is conserved without external impulse.
SRC: Hibbeler R. C., Engineering Mechanics: Dynamics, 14th edition in SI units, Pearson | secondary | 2017
SRC: Meriam J. L., Kraige L. G. and Bolton J. N., Engineering Mechanics: Dynamics, 9th edition, Wiley | secondary | 2018
Q: What is impulse equal to? | The change in momentum of a body.
Q: How do airbags reduce injury? | They extend the stopping time, reducing the average force for the same change in momentum.
M1#engineering-u03-09-q1@1: What is the momentum of a 1,200 kg car moving at 15 m/s? | 18,000 kg m/s | 80 kg m/s | 1,215 kg m/s | 135,000 kg m/s | Momentum is mass times velocity: 1,200 × 15 = 18,000 kg m/s.
M2#engineering-u03-09-q2@2: A 60 kg skater at rest pushes off a 40 kg skater, who moves away at 3 m/s. What is the first skater's speed? | 2 m/s in the opposite direction | 3 m/s in the same direction | 4.5 m/s in the opposite direction | 0 m/s | Total momentum stays zero: 60v = 40 × 3, so v = 2 m/s the other way.
M3#engineering-u03-09-q3@3: Why does a crumple zone reduce injury in a car crash, even though the change in momentum is the same? | It increases the collision time, reducing the average force on occupants | It reduces the car's mass during the crash | It increases the car's speed before impact | It makes the crash elastic so no energy is lost | FΔt = mΔv: a longer Δt gives a smaller average force for the same Δp.
NUM2#engineering-u03-09-q4@2: A 0.15 kg ball arrives at 30 m/s and leaves in the opposite direction at 20 m/s after 0.01 s of contact. What is the average force, in N? | 750 | 1% | N | Δp = 0.15 × (20 + 30) = 7.5 N s; F = 7.5 ÷ 0.01 = 750 N.
SA2#engineering-u03-09-q5@2,3: Explain why momentum is conserved in a collision between two bodies even if kinetic energy isn't. | During the collision, the bodies exert equal and opposite forces on each other for the same time (Newton's third law), so their impulses are equal and opposite and their momentum changes cancel. With no external impulse, total momentum is unchanged. Kinetic energy, however, can be converted to heat, sound and deformation, so it is conserved only in perfectly elastic collisions. | Newton's third law ; Equal and opposite impulses ; No external impulse ; Energy converted to other forms

## Impacts
LV: Year 1 · Intermediate
S: An impact is a short, violent collision between two bodies. This lesson defines the coefficient of restitution, solves direct central impacts using momentum and restitution, and calculates energy loss.
O: Define the coefficient of restitution and the range of its values
O: Solve direct central impact problems using momentum and restitution
O: Calculate the kinetic energy lost in an impact
PRE: Impulse and momentum
H: Restitution
E: e = (v_{2} − v_{1}) ÷ (u_{1} − u_{2}) :: velocity of separation ÷ velocity of approach
- **e = 1**: perfectly elastic; no kinetic energy lost.
- **e = 0**: perfectly plastic; bodies stick together.
- **0 < e < 1**: real impacts, with some energy lost.
P: e depends on the materials, speeds and shapes involved.
H: Solving impacts
P: For a direct central impact, use two equations: **conservation of momentum** and **restitution**. Solve simultaneously for the two final velocities.
X: A 2 kg ball moving at 6 m/s strikes a 3 kg ball at rest; e = 0.5.
> Momentum: 2 × 6 = 2v_{1} + 3v_{2}, so 12 = 2v_{1} + 3v_{2}.
> Restitution: v_{2} − v_{1} = 0.5 × (6 − 0) = 3.
> Substitute v_{2} = v_{1} + 3: 12 = 5v_{1} + 9, so v_{1} = 0.6 m/s and v_{2} = 3.6 m/s.
> KE before = ½ × 2 × 36 = 36 J; after = 0.36 + 19.44 = 19.8 J: 16.2 J lost.
IX: collisions
H: Applications
- Crash testing and vehicle safety.
- Pile driving: energy transfer from hammer to pile.
- Sports equipment: the "bounce" of balls is tested by dropping them and measuring rebound height; e = √(rebound height ÷ drop height).
K: Impacts are solved with conservation of momentum and the coefficient of restitution, which ranges from 0 (perfectly plastic) to 1 (perfectly elastic); real impacts lose kinetic energy.
!: Forgetting signs in the restitution equation. Use consistent directions; separation and approach velocities are differences in velocity, not speeds.
EV: established | The coefficient of restitution model (Newton's experimental law) is a good approximation for many engineering impacts.
EV: established | Sports governing bodies specify ball rebound tests using restitution, such as for tennis and golf balls.
T: Coefficient of restitution | The ratio of separation velocity to approach velocity in an impact
T: Perfectly plastic impact | An impact in which the bodies stick together, e = 0
T: Direct central impact | An impact in which the velocities lie along the line joining the centres of mass
SUM: e = separation ÷ approach velocity.
SUM: Solve impacts with momentum and restitution together.
SUM: Kinetic energy is lost unless e = 1.
SRC: Hibbeler R. C., Engineering Mechanics: Dynamics, 14th edition in SI units, Pearson | secondary | 2017
SRC: Goldsmith W., Impact: The Theory and Physical Behaviour of Colliding Solids, Edward Arnold | primary | 1960
Q: What value of e describes a perfectly elastic impact? | e = 1.
Q: Which two equations are used to solve a direct central impact? | Conservation of momentum and the coefficient of restitution equation.
M1#engineering-u03-10-q1@1: Two bodies stick together after colliding. What is the coefficient of restitution? | 0 | 1 | 0.5 | It can't be determined | Sticking together means zero separation velocity, so e = 0.
M2#engineering-u03-10-q2@2: A ball dropped from 2.0 m rebounds to 0.5 m. What is the coefficient of restitution? | 0.5 | 0.25 | 4 | 0.75 | e = √(rebound ÷ drop) = √(0.5 ÷ 2.0) = √0.25 = 0.5.
M3#engineering-u03-10-q3@3: In the worked example, why is kinetic energy lost but momentum conserved? | Momentum is conserved by equal and opposite impulses; energy is converted to heat, sound and deformation because e < 1 | Momentum is lost because the balls slow down overall | Energy is conserved because no external forces act | Both are always lost in every collision | Internal impulses cancel, so momentum is conserved; e < 1 means some kinetic energy becomes other forms.
NUM2#engineering-u03-10-q4@2: A 2 kg ball at 6 m/s hits a 3 kg ball at rest with e = 0.5. What is the speed of the 3 kg ball after impact, in m/s? | 3.6 | 1% | m/s | Solving 12 = 2v_{1} + 3v_{2} and v_{2} − v_{1} = 3 gives v_{1} = 0.6 m/s and v_{2} = 3.6 m/s.
SA2#engineering-u03-10-q5@2,3: Explain how the coefficient of restitution can be measured for a ball and what affects it. | Drop the ball from a known height onto a rigid surface and measure the rebound height. Since speeds just before and after impact are √(2gh), e = √(rebound height ÷ drop height). The value depends on the materials of the ball and surface, temperature, impact speed and shape; for example, a cold squash ball bounces less. | Drop test ; Formula from heights ; Material and temperature ; Impact speed

## Rotation about a fixed axis
LV: Year 1 · Intermediate
S: Many machine parts rotate about a fixed axis. This lesson defines angular position, velocity and acceleration, relates them to the linear motion of points on the body, and applies the constant angular acceleration equations.
O: Relate angular displacement, velocity and acceleration
O: Calculate the velocity and acceleration of a point on a rotating body
O: Apply the equations of constant angular acceleration
PRE: Normal and tangential components
H: Angular quantities
E: ω = dθ/dt; α = dω/dt :: θ in radians, ω in rad/s, α in rad/s^{2}
E: v = ωr; a_{t} = αr; a_{n} = ω^{2}r :: for a point at radius r
P: Convert rpm to rad/s: ω = rpm × 2π ÷ 60.
H: Constant angular acceleration
E: ω = ω_{0} + αt; θ = ω_{0}t + ½αt^{2}; ω^{2} = ω_{0}^{2} + 2αθ :: direct analogues of the linear equations
X: A flywheel accelerates uniformly from rest to 300 rpm in 10 s.
> ω = 300 × 2π ÷ 60 = 31.4 rad/s.
> α = 31.4 ÷ 10 = 3.14 rad/s^{2}.
> θ = ½ × 3.14 × 10^{2} = 157 rad = 25 revolutions.
> At radius 0.5 m, at 10 s: v = 15.7 m/s, a_{n} = 31.4^{2} × 0.5 = 493 m/s^{2}.
H: Applications
- Pulleys and belts: belt speed = ωr at each pulley.
- Gears: tangential speed at the contact point is equal for both gears, so ω_{1}r_{1} = ω_{2}r_{2}.
K: In fixed-axis rotation, ω and α relate to the linear velocity and acceleration of points by v = ωr, a_{t} = αr and a_{n} = ω^{2}r; constant angular acceleration equations mirror the linear ones.
!: Using rpm or degrees in v = ωr. Angular velocity must be in radians per second.
EV: established | Fixed-axis rotation kinematics is fundamental to machine design.
EV: established | Gear ratio relations follow from equal tangential speeds at the pitch circle.
T: Angular velocity | The rate of change of angular position, in rad/s
T: Angular acceleration | The rate of change of angular velocity, in rad/s^{2}
T: Gear ratio | The ratio of angular speeds of meshing gears, inversely proportional to their radii
SUM: ω = dθ/dt; α = dω/dt.
SUM: v = ωr; a_{t} = αr; a_{n} = ω^{2}r.
SUM: Constant α equations mirror linear motion.
SRC: Hibbeler R. C., Engineering Mechanics: Dynamics, 14th edition in SI units, Pearson | secondary | 2017
SRC: Meriam J. L., Kraige L. G. and Bolton J. N., Engineering Mechanics: Dynamics, 9th edition, Wiley | secondary | 2018
Q: How do you convert rpm to rad/s? | Multiply by 2π and divide by 60.
Q: What is the normal acceleration of a point at radius r on a body rotating at ω? | ω^{2}r, towards the axis.
M1#engineering-u03-11-q1@1: A wheel turns at 60 rpm. What is its angular velocity in rad/s? | 6.28 rad/s | 60 rad/s | 1 rad/s | 377 rad/s | Convert rpm to rad/s: ω = 60 × 2π ÷ 60 = 2π = 6.28 rad/s.
M2#engineering-u03-11-q2@2: A pulley of radius 0.2 m turns at 50 rad/s. What is the belt speed? | 10 m/s | 250 m/s | 0.004 m/s | 50.2 m/s | Belt speed equals the rim speed: v = ωr = 50 × 0.2 = 10 m/s.
M3#engineering-u03-11-q3@3: A small gear of radius 30 mm drives a large gear of radius 90 mm. The small gear turns at 1,500 rpm. What is the speed of the large gear? | 500 rpm | 4,500 rpm | 1,500 rpm | 167 rpm | Equal tangential speed: ω_{1}r_{1} = ω_{2}r_{2}, so ω_{2} = 1,500 × 30/90 = 500 rpm.
NUM2#engineering-u03-11-q4@2: A flywheel accelerates uniformly from rest to 300 rpm in 10 s. How many revolutions does it make in that time? | 25 | 1% | rev | ω = 31.4 rad/s, α = 3.14 rad/s^{2}; θ = ½αt^{2} = 157 rad = 25 revolutions.
SA2#engineering-u03-11-q5@2,3: Explain how gear ratios change speed and torque. | Meshing gears share the same tangential speed at the contact point, so ω_{1}r_{1} = ω_{2}r_{2}: a larger gear driven by a smaller one turns more slowly. Ignoring losses, power Tω is transmitted unchanged, so the slower gear delivers proportionally more torque. Gearboxes use this to match motors to loads, such as reducing speed and increasing torque for a winch. | Equal tangential speed ; Speed ratio ; Power conservation and torque ; Application

## General plane motion and the instantaneous centre
LV: Year 1 · Advanced
S: General plane motion combines translation and rotation, as in rolling wheels and connecting rods. This lesson uses relative velocity to analyse it and introduces the instantaneous centre of zero velocity as a quick method.
O: Describe general plane motion as translation plus rotation
O: Apply the relative velocity equation v_{B} = v_{A} + ω × r_{B/A}
O: Locate and use the instantaneous centre of zero velocity
PRE: Rotation about a fixed axis
H: Translation plus rotation
E: v_{B} = v_{A} + v_{B/A}, with |v_{B/A}| = ω r_{AB} perpendicular to AB
P: Any plane motion of a rigid body can be described as translation with a reference point A plus rotation about A.
H: The instantaneous centre
P: At any instant, a body in plane motion has a point (possibly off the body) with zero velocity: the **instantaneous centre (IC)**. Every point moves as if the body were rotating about the IC at that instant: v = ω × distance from the IC.
- To find the IC, draw lines perpendicular to the velocities of two points; they meet at the IC.
- For a wheel **rolling without slipping**, the contact point is the IC.
X: A wheel of radius 0.3 m rolls without slipping; its centre moves at 6 m/s.
> IC = contact point with the ground.
> ω = v_{centre} ÷ r = 6 ÷ 0.3 = 20 rad/s.
> Top of the wheel is 0.6 m from the IC: v = 20 × 0.6 = 12 m/s.
> The contact point has zero velocity at that instant.
H: Applications
- Slider–crank mechanisms (engines, pumps): find piston velocity from crank speed.
- Linkages in robots and suspension systems.
P: The IC has zero velocity but generally non-zero acceleration, so it can't be used for acceleration analysis.
K: Plane motion is translation plus rotation; velocities can be found with the relative velocity equation or, more quickly, by rotation about the instantaneous centre, which for rolling wheels is the contact point.
!: Using the instantaneous centre to find accelerations. The IC has zero velocity only at that instant; its acceleration isn't zero, so acceleration analysis needs relative acceleration equations.
EV: established | Instantaneous centre methods are standard in mechanism analysis.
EV: established | Rolling without slipping requires sufficient friction; with slip, the contact point isn't the IC.
T: General plane motion | Motion of a rigid body combining translation and rotation in a plane
T: Instantaneous centre of zero velocity | The point about which a body appears to rotate at a given instant
T: Rolling without slipping | Rolling in which the contact point has zero velocity relative to the surface
SUM: Plane motion = translation + rotation.
SUM: v_{B} = v_{A} + ω × r_{B/A}.
SUM: The IC gives velocities quickly; for rolling it is the contact point.
SRC: Hibbeler R. C., Engineering Mechanics: Dynamics, 14th edition in SI units, Pearson | secondary | 2017
SRC: Meriam J. L., Kraige L. G. and Bolton J. N., Engineering Mechanics: Dynamics, 9th edition, Wiley | secondary | 2018
Q: Where is the instantaneous centre of a wheel rolling without slipping? | At the point of contact with the ground.
Q: How is the instantaneous centre found from two known velocity directions? | By drawing lines perpendicular to the two velocities; they intersect at the IC.
M1#engineering-u03-12-q1@1: What is the speed of the contact point of a wheel rolling without slipping? | Zero | Equal to the centre's speed | Twice the centre's speed | Half the centre's speed | In rolling without slipping, the contact point has zero velocity at that instant.
M2#engineering-u03-12-q2@2: A wheel of radius 0.4 m rolls without slipping at 8 m/s. What is its angular velocity? | 20 rad/s | 3.2 rad/s | 32 rad/s | 0.05 rad/s | For rolling, ω = v ÷ r = 8 ÷ 0.4 = 20 rad/s.
M3#engineering-u03-12-q3@3: A student uses the IC of a rolling wheel to find the acceleration of the contact point and gets zero. What is wrong? | The IC has zero velocity but not zero acceleration; acceleration needs relative acceleration analysis | Nothing: the IC always has zero acceleration | The contact point isn't the IC for rolling | Rolling wheels have no acceleration at any point | The contact point accelerates upwards (towards the centre); the IC method applies only to velocities.
NUM2#engineering-u03-12-q4@2: A wheel of radius 0.3 m rolls without slipping with its centre moving at 6 m/s. What is the speed of the top of the wheel, in m/s? | 12 | 1% | m/s | ω = 6 ÷ 0.3 = 20 rad/s; top is 0.6 m from the IC: v = 20 × 0.6 = 12 m/s.
SA2#engineering-u03-12-q5@2,3: Explain how to find the velocity of the piston in a slider–crank mechanism using the instantaneous centre. | The crank end of the connecting rod moves perpendicular to the crank; the piston end moves along the cylinder. Draw lines perpendicular to these two velocities: they meet at the IC of the connecting rod. The rod's angular velocity is the crank pin velocity divided by its distance from the IC; the piston velocity is that angular velocity times the piston's distance from the IC. | Velocity directions ; Locate IC ; Rod angular velocity ; Piston velocity

## Mass moment of inertia
LV: Year 1 · Intermediate
S: The mass moment of inertia measures a body's resistance to angular acceleration about an axis. This lesson defines it, gives standard results, introduces the radius of gyration, and applies the parallel axis theorem.
O: Define mass moment of inertia and radius of gyration
O: Use standard formulas for common shapes
O: Apply the parallel axis theorem to find inertia about other axes
PRE: Rotation about a fixed axis
H: Definition
E: I = ∫r^{2} dm = Σmr^{2} :: units kg m^{2}
E: I = mk^{2} :: k is the radius of gyration
P: Mass far from the axis contributes most, because it counts with r^{2}. A flywheel with its mass in a heavy rim stores more rotational energy than a solid disc of the same mass.
H: Standard results
- **Thin ring** of radius r about its axis: I = mr^{2}.
- **Solid disc or cylinder** about its axis: I = ½mr^{2}.
- **Solid sphere** about a diameter: I = (2/5)mr^{2}.
- **Slender rod** of length L about its centre: I = mL^{2}/12; about one end: I = mL^{2}/3.
H: Parallel axis theorem
E: I = I_{G} + md^{2} :: I_{G} about the centre of mass, d the distance to the parallel axis
X: A 20 kg solid disc of radius 0.25 m.
> About its central axis: I = ½ × 20 × 0.25^{2} = 0.625 kg m^{2}.
> Radius of gyration: k = √(0.625 ÷ 20) = 0.177 m.
> About a parallel axis through its rim (d = 0.25 m): I = 0.625 + 20 × 0.0625 = 1.875 kg m^{2}.
> A ring of the same mass and radius has I = 1.25 kg m^{2}, twice the disc's.
K: Mass moment of inertia I = Σmr^{2} resists angular acceleration; standard shapes have known formulas, and the parallel axis theorem moves I from the centre of mass to other axes.
!: Confusing mass moment of inertia (kg m^{2}, for dynamics) with second moment of area (m^{4}, for bending). They are different quantities with similar mathematics.
EV: established | Standard moment of inertia formulas are derived by integration and are exact for uniform bodies.
EV: established | Flywheels for energy storage are designed with mass concentrated at the rim to maximise I for a given mass.
T: Mass moment of inertia | A measure of a body's resistance to angular acceleration, I = Σmr^{2}
T: Radius of gyration | The distance k at which all the mass could be concentrated to give the same I
T: Parallel axis theorem | I about any axis equals I about a parallel axis through the centre of mass plus md^{2}
SUM: I = Σmr^{2}; mass far from the axis counts most.
SUM: Disc ½mr^{2}; ring mr^{2}; rod mL^{2}/12 or mL^{2}/3.
SUM: I = I_{G} + md^{2}.
SRC: Hibbeler R. C., Engineering Mechanics: Dynamics, 14th edition in SI units, Pearson | secondary | 2017
SRC: Meriam J. L., Kraige L. G. and Bolton J. N., Engineering Mechanics: Dynamics, 9th edition, Wiley | secondary | 2018
Q: What is the moment of inertia of a solid disc about its axis? | ½mr^{2}.
Q: What is the radius of gyration? | The distance from the axis at which the whole mass could be concentrated to give the same moment of inertia.
M1#engineering-u03-13-q1@1: What are the units of mass moment of inertia? | kg m^{2} | m^{4} | N m | kg m/s | Applying the standard result: it is mass times distance squared.
M2#engineering-u03-13-q2@2: A slender rod of mass 3 kg and length 2 m rotates about one end. What is its moment of inertia? | 4 kg m^{2} | 1 kg m^{2} | 12 kg m^{2} | 6 kg m^{2} | About one end, I = mL^{2}/3 = 3 × 4 ÷ 3 = 4 kg m^{2}.
M3#engineering-u03-13-q3@3: A ring and a solid disc have the same mass and radius. Which is harder to spin up with the same torque, and why? | The ring, because all its mass is at the rim, giving twice the disc's moment of inertia | The disc, because it has more material near the axis | They are equally hard, because their masses are equal | The disc, because its radius of gyration is larger | I_{ring} = mr^{2} and I_{disc} = ½mr^{2}; a larger I means smaller α for the same torque.
NUM2#engineering-u03-13-q4@2: A 20 kg solid disc of radius 0.25 m rotates about its central axis. What is its moment of inertia, in kg m^{2}? | 0.625 | 1% | kg m^{2} | I = ½mr^{2} = 0.5 × 20 × 0.0625 = 0.625 kg m^{2}.
SA2#engineering-u03-13-q5@2,3: Explain why flywheels are designed with heavy rims. | Kinetic energy of rotation is ½Iω^{2}, and I = Σmr^{2} grows with the square of distance from the axis. Concentrating mass at the rim gives the largest moment of inertia for a given mass, so the flywheel stores more energy and smooths speed fluctuations better. A solid disc of the same mass would have only half the moment of inertia of a thin ring. | Rotational energy formula ; r squared weighting ; More energy for same mass ; Comparison with disc

## Kinetics of rigid bodies in plane motion
LV: Year 1 · Advanced
S: Rigid bodies in plane motion obey Newton's second law for translation and a moment equation for rotation. This lesson applies ΣF = ma_{G} and ΣM_{G} = I_{G}α to rotating and rolling bodies.
O: Write the equations of motion for a rigid body in plane motion
O: Solve fixed-axis rotation problems using ΣM = Iα
O: Analyse rolling bodies with and without slipping
PRE: Mass moment of inertia
H: The equations
E: ΣF_{x} = m a_{Gx}; ΣF_{y} = m a_{Gy}; ΣM_{G} = I_{G} α :: G is the centre of mass
P: For **rotation about a fixed axis O**, it is often easier to use ΣM_{O} = I_{O} α, with I_{O} from the parallel axis theorem.
X: A 20 kg disc (I = 0.625 kg m^{2}) on a frictionless axle is acted on by a torque of 10 N m.
> ΣM = Iα: 10 = 0.625α.
> α = 16 rad/s^{2}.
> After 2 s from rest: ω = 32 rad/s.
> A rope wound on its rim (radius 0.25 m) would have accelerated 0.25 × 16 = 4 m/s^{2}.
H: Rolling
P: For a wheel **rolling without slipping**, a_{G} = αr. Friction at the contact point provides the moment needed for angular acceleration. Check that the required friction doesn't exceed μN; if it does, the wheel slips.
H: Applications
- Hoists and winches: tension, load acceleration and drum rotation are linked.
- Vehicle wheels: driving torque, friction and acceleration.
- Pendulums and swinging bodies: rotation about a pivot.
K: Rigid bodies obey ΣF = ma_{G} and ΣM_{G} = I_{G}α; for fixed axes use ΣM_{O} = I_{O}α, and for rolling without slipping link a_{G} = αr and check friction.
!: Taking moments about an accelerating point other than G without the correction terms. Use the centre of mass, or a fixed axis, for ΣM = Iα.
EV: established | The rigid-body equations of plane motion follow from Newton's laws applied to a system of particles.
EV: established | Wheel slip limits in vehicle dynamics are analysed using these equations with tyre friction models.
T: Equations of plane motion | ΣF = ma_{G} and ΣM_{G} = I_{G}α for a rigid body in planar motion
T: Angular acceleration | The rate of change of angular velocity, produced by a resultant moment
SUM: ΣF = ma_{G}; ΣM_{G} = I_{G}α.
SUM: For fixed axes, ΣM_{O} = I_{O}α.
SUM: For rolling without slipping, a_{G} = αr and check friction.
SRC: Hibbeler R. C., Engineering Mechanics: Dynamics, 14th edition in SI units, Pearson | secondary | 2017
SRC: Meriam J. L., Kraige L. G. and Bolton J. N., Engineering Mechanics: Dynamics, 9th edition, Wiley | secondary | 2018
Q: What equation governs the rotation of a rigid body about its centre of mass? | ΣM_{G} = I_{G}α.
Q: What is the condition linking linear and angular acceleration for rolling without slipping? | a_{G} = αr.
M1#engineering-u03-14-q1@1: A torque of 12 N m acts on a wheel with I = 3 kg m^{2}. What is its angular acceleration? | 4 rad/s^{2} | 36 rad/s^{2} | 0.25 rad/s^{2} | 15 rad/s^{2} | Applying the standard result: from ΣM = Iα, α = 12 ÷ 3 = 4 rad/s^{2}.
M2#engineering-u03-14-q2@2: A wheel of radius 0.5 m rolls without slipping with α = 6 rad/s^{2}. What is the acceleration of its centre? | 3 m/s^{2} | 12 m/s^{2} | 0.083 m/s^{2} | 6 m/s^{2} | Applying the standard result: a_{G} = αr = 6 × 0.5 = 3 m/s^{2}.
M3#engineering-u03-14-q3@3: A driving torque on a car wheel is increased until the wheel spins on ice. What has happened? | The friction needed for rolling exceeded μN, so the contact point slips | The wheel's moment of inertia has fallen to zero | Rolling without slipping always continues regardless of torque | The torque has reversed direction | Rolling needs a friction force; if it exceeds the maximum μN, the wheel slips.
NUM2#engineering-u03-14-q4@2: A torque of 10 N m acts on a disc with I = 0.625 kg m^{2} on a frictionless axle. What is its angular acceleration, in rad/s^{2}? | 16 | 1% | rad/s^{2} | α = M ÷ I = 10 ÷ 0.625 = 16 rad/s^{2}.
SA2#engineering-u03-14-q5@2,3: Explain how to find the acceleration of a load lowered by a rope wound on a drum with significant moment of inertia. | Draw free-body diagrams of the load (weight down, tension up) and drum (tension at the rim). For the load: mg − T = ma. For the drum: Tr = Iα. Link them with a = αr. Solve simultaneously: a = mg ÷ (m + I/r^{2}). The drum's inertia reduces the load's acceleration below g. | Free-body diagrams ; Load equation ; Drum equation ; Kinematic link and result

## Energy methods for rigid bodies
LV: Year 1 · Advanced
S: The work–energy principle extends to rigid bodies by including rotational kinetic energy. This lesson covers kinetic energy in translation and rotation, the work done by moments, and conservation of energy for rolling bodies.
O: Calculate kinetic energy of a rigid body in plane motion
O: Calculate the work done by a moment
O: Apply conservation of energy to rolling and rotating bodies
PRE: Kinetics of rigid bodies in plane motion
H: Kinetic energy
E: T = ½mv_{G}^{2} + ½I_{G}ω^{2} :: translational plus rotational
E: Work of a constant moment = Mθ
P: For pure rotation about a fixed axis O, T = ½I_{O}ω^{2}.
H: Rolling down a slope
P: For a body rolling without slipping, friction at the contact point does **no work** (the contact point doesn't slide), so mechanical energy is conserved. Some of the potential energy goes into rotation, so rolling bodies arrive more slowly than sliding ones on a frictionless slope.
X: A solid disc rolls from rest down a slope, dropping 2 m.
> Energy: mgh = ½mv^{2} + ½(½mr^{2})(v/r)^{2} = ¾mv^{2}.
> v = √(4gh/3) = √(4 × 9.81 × 2 ÷ 3) = 5.11 m/s.
> A frictionless sliding block would reach √(2gh) = 6.26 m/s.
> The disc's mass cancels: all solid discs reach the same speed.
H: Comparing shapes
- Rolling speeds depend on I/(mr^{2}): sphere (0.4) fastest, then disc (0.5), then ring (1.0).
- This explains why a solid ball beats a hoop in a downhill race.
K: Rigid-body kinetic energy is ½mv_{G}^{2} + ½I_{G}ω^{2}; rolling without slipping conserves mechanical energy, and bodies with smaller I/(mr^{2}) roll down slopes faster.
!: Forgetting rotational energy when a body rolls. A rolling body has both translational and rotational kinetic energy; ignoring rotation overestimates its speed.
EV: established | Energy methods for rigid bodies are standard in mechanism and vehicle analysis.
EV: established | The rolling race between shapes is a classic demonstration of moment of inertia effects.
T: Rotational kinetic energy | ½Iω^{2}, the kinetic energy of rotation
T: Rolling without slipping | Rolling in which the contact point has no velocity relative to the surface
SUM: T = ½mv_{G}^{2} + ½I_{G}ω^{2}.
SUM: Rolling without slipping conserves mechanical energy.
SUM: Smaller I/(mr^{2}) rolls faster.
SRC: Hibbeler R. C., Engineering Mechanics: Dynamics, 14th edition in SI units, Pearson | secondary | 2017
SRC: Meriam J. L., Kraige L. G. and Bolton J. N., Engineering Mechanics: Dynamics, 9th edition, Wiley | secondary | 2018
Q: What is the kinetic energy of a rigid body in plane motion? | ½mv_{G}^{2} + ½I_{G}ω^{2}.
Q: Why does friction do no work on a body rolling without slipping? | The contact point has zero velocity, so the friction force doesn't move through any distance.
M1#engineering-u03-15-q1@1: What is the rotational kinetic energy of a flywheel with I = 2 kg m^{2} spinning at 10 rad/s? | 100 J | 20 J | 200 J | 10 J | Rotational KE = ½Iω^{2} = ½ × 2 × 100 = 100 J.
M2#engineering-u03-15-q2@2: A ring, a disc and a sphere of equal mass and radius roll from rest down the same slope. Which reaches the bottom first? | The sphere | The ring | The disc | They arrive together | The sphere has the smallest I/(mr^{2}), so less energy goes into rotation and it moves fastest.
M3#engineering-u03-15-q3@3: A student calculates a rolling disc's speed using mgh = ½mv^{2} only and gets 6.26 m/s from a 2 m drop. What is wrong? | Rotational kinetic energy is ignored; including it gives 5.11 m/s | Nothing: rolling bodies have no rotational energy | Friction must be added as extra energy | Mass should not cancel in the calculation | For a disc, total KE = ¾mv^{2}, so v = √(4gh/3).
NUM2#engineering-u03-15-q4@2: A solid disc rolls from rest without slipping down a slope, dropping 2 m. What is its speed at the bottom, in m/s (g = 9.81 m/s^{2})? | 5.11 | 1% | m/s | mgh = ¾mv^{2}, so v = √(4 × 9.81 × 2 ÷ 3) = 5.11 m/s.
SA2#engineering-u03-15-q5@2,3: Explain why a solid ball rolls down a slope faster than a hoop of the same mass and radius. | Both lose the same potential energy, which becomes translational plus rotational kinetic energy. The hoop has all its mass at the rim, so I = mr^{2}, while a solid ball has I = 0.4mr^{2}. More of the hoop's energy goes into rotation, leaving less for translation, so its centre moves more slowly. | Same PE lost ; KE split between translation and rotation ; Different moments of inertia ; Speed difference

## Free undamped vibration
LV: Year 1 · Intermediate
S: A mass on a spring vibrates at its natural frequency when disturbed. This lesson derives the equation of motion for free undamped vibration, the natural frequency, and the static deflection method, with engineering examples.
O: Derive the equation of motion for a mass–spring system
O: Calculate natural frequency and period
O: Use static deflection to find natural frequency
PRE: Second-order differential equations
H: The equation of motion
E: m ẍ + kx = 0 :: mass m on a spring of stiffness k, displacement x from equilibrium
E: ω_{n} = √(k/m); f_{n} = ω_{n}/(2π); T = 1/f_{n}
P: The solution is simple harmonic motion: x = A sin(ω_{n}t + φ), with amplitude and phase set by initial conditions.
X: A 2 kg mass on a spring with k = 800 N/m.
> ω_{n} = √(800 ÷ 2) = 20 rad/s.
> f_{n} = 20 ÷ 2π = 3.18 Hz.
> Period T = 1 ÷ 3.18 = 0.314 s.
> Doubling the mass reduces ω_{n} by a factor of √2, to 14.1 rad/s.
IX: oscillator
H: Static deflection
E: ω_{n} = √(g/δ_{st}) :: δ_{st} is the static deflection under the mass's weight
P: Measuring how far a mounting compresses under load gives the natural frequency quickly: a machine that compresses its mounts by 10 mm has ω_{n} = √(9.81/0.01) = 31.3 rad/s (5.0 Hz).
K: Free undamped vibration is simple harmonic with natural frequency ω_{n} = √(k/m); stiffer springs raise and heavier masses lower the frequency, and static deflection gives ω_{n} = √(g/δ).
!: Mixing ω_{n} (rad/s) and f_{n} (Hz). Divide ω_{n} by 2π to get frequency in hertz.
EV: established | The mass–spring model is the foundation of vibration analysis.
EV: established | Real structures have many natural frequencies (modes); single-degree-of-freedom models capture the first mode.
T: Natural frequency | The frequency at which a system vibrates when disturbed and left free
T: Simple harmonic motion | Oscillation with acceleration proportional to displacement and opposite in direction
T: Static deflection | The deflection of a spring or support under the steady weight of the mass
SUM: m ẍ + kx = 0 gives simple harmonic motion.
SUM: ω_{n} = √(k/m); f_{n} = ω_{n}/2π.
SUM: Static deflection gives ω_{n} = √(g/δ).
SRC: Rao S. S., Mechanical Vibrations, 6th edition (SI), Pearson | secondary | 2017
SRC: Hibbeler R. C., Engineering Mechanics: Dynamics, 14th edition in SI units, Pearson | secondary | 2017
Q: What is the natural frequency of a mass–spring system in rad/s? | ω_{n} = √(k/m).
Q: How can static deflection be used to find natural frequency? | ω_{n} = √(g/δ_{st}), where δ_{st} is the deflection under the weight.
M1#engineering-u03-16-q1@1: What happens to the natural frequency if the spring stiffness is increased? | It increases | It decreases | It stays the same | It becomes zero | Applying the standard result: ω_{n} = √(k/m) rises with stiffness.
M2#engineering-u03-16-q2@2: A 5 kg mass hangs on a spring with k = 500 N/m. What is its natural frequency in hertz? | 1.59 Hz | 10 Hz | 100 Hz | 0.16 Hz | ω_{n} = √(500/5) = 10 rad/s; f = 10 ÷ 2π = 1.59 Hz.
M3#engineering-u03-16-q3@3: A machine compresses its rubber mounts by 2.5 mm under its own weight. What is its approximate natural frequency? | About 10 Hz | About 1 Hz | About 63 Hz | About 0.1 Hz | ω_{n} = √(9.81/0.0025) = 62.6 rad/s; f = 62.6 ÷ 2π ≈ 10 Hz.
NUM2#engineering-u03-16-q4@2: A 2 kg mass is attached to a spring of stiffness 800 N/m. What is its natural frequency, in Hz? | 3.18 | 1% | Hz | ω_{n} = √(800/2) = 20 rad/s; f_{n} = 20 ÷ 2π = 3.18 Hz.
SA2#engineering-u03-16-q5@2,3: Derive the natural frequency of a mass on a spring and explain what affects it. | Displacing the mass by x gives a restoring force −kx. Newton's second law: m ẍ = −kx, so ẍ + (k/m)x = 0, the equation of simple harmonic motion with ω_{n}^{2} = k/m. Natural frequency rises with stiffness and falls with mass. Gravity shifts the equilibrium position but doesn't change the frequency. | Restoring force ; Equation of motion ; ω_n = √(k/m) ; Effects of k and m

## Damped vibration
LV: Year 1 · Advanced
S: Real vibrations die away because of damping. This lesson introduces viscous damping, the damping ratio, the underdamped, critically damped and overdamped cases, the damped natural frequency, and the logarithmic decrement.
O: Write the equation of motion for a damped mass–spring system
O: Calculate the damping ratio and classify the response
O: Use the logarithmic decrement to estimate damping from measurements
PRE: Free undamped vibration
H: The equation and damping ratio
E: m ẍ + c ẋ + kx = 0 :: c is the viscous damping coefficient
E: ζ = c ÷ c_{c}, with c_{c} = 2√(km) :: critical damping coefficient
- **ζ < 1: underdamped**: oscillates with decaying amplitude.
- **ζ = 1: critically damped**: returns to equilibrium fastest without oscillating.
- **ζ > 1: overdamped**: returns slowly without oscillating.
E: ω_{d} = ω_{n}√(1 − ζ^{2}) :: damped natural frequency
X: The 2 kg mass on the 800 N/m spring now has a damper with c = 16 N s/m.
> c_{c} = 2√(800 × 2) = 2 × 40 = 80 N s/m.
> ζ = 16 ÷ 80 = 0.2: underdamped.
> ω_{d} = 20 × √(1 − 0.04) = 19.6 rad/s, slightly below ω_{n}.
> The amplitude falls by about 72% each cycle (logarithmic decrement 1.28).
IX: oscillator
H: Logarithmic decrement
E: δ = ln(x_{1}/x_{2}) = 2πζ ÷ √(1 − ζ^{2}) :: x_{1}, x_{2} are successive peak amplitudes
P: Measuring successive peaks of a free vibration gives δ and hence ζ. For light damping, ζ ≈ δ/(2π).
H: Applications
- **Car suspension**: dampers set ζ to about 0.2–0.4 for a balance of comfort and control.
- **Measuring instruments** and **door closers**: near-critical damping to settle quickly without overshoot.
K: Damping ratio ζ = c/(2√(km)) sets the response: underdamped oscillation (ζ < 1), critical damping (ζ = 1) or overdamped creep (ζ > 1); the logarithmic decrement measures ζ from decaying peaks.
!: Assuming more damping always gives a faster return. Overdamped systems return more slowly than critically damped ones.
EV: established | The viscous damping model and damping ratio are standard in vibration engineering.
EV: established | Real damping is often not viscous (for example, friction or material hysteresis), so equivalent viscous damping is used as an approximation.
T: Damping ratio | The ratio of actual damping to critical damping, ζ
T: Critical damping | The smallest damping that prevents oscillation
T: Logarithmic decrement | The natural logarithm of the ratio of successive peak amplitudes
SUM: m ẍ + c ẋ + kx = 0; ζ = c/(2√(km)).
SUM: Underdamped, critically damped and overdamped responses.
SUM: Logarithmic decrement estimates ζ.
SRC: Rao S. S., Mechanical Vibrations, 6th edition (SI), Pearson | secondary | 2017
SRC: Inman D. J., Engineering Vibration, 4th edition, Pearson | secondary | 2014
Q: What damping ratio gives critical damping? | ζ = 1.
Q: What does the logarithmic decrement measure? | The rate of decay of free vibration, from the ratio of successive peak amplitudes.
M1#engineering-u03-17-q1@1: Which response oscillates with decaying amplitude? | Underdamped | Critically damped | Overdamped | Undamped | ζ < 1 gives oscillation that decays over time.
M2#engineering-u03-17-q2@2: A system has m = 4 kg, k = 400 N/m and c = 20 N s/m. What is ζ? | 0.25 | 0.5 | 0.05 | 2.5 | c_{c} = 2√(400 × 4) = 80; ζ = 20 ÷ 80 = 0.25.
M3#engineering-u03-17-q3@3: A car's dampers are worn, reducing ζ from 0.3 to 0.05. What is the most likely effect? | The car keeps bouncing after bumps, reducing control and comfort | The car returns instantly to level with no bounce | The car becomes overdamped and stiff | No change, since damping doesn't affect ride | Low damping lets oscillations persist, reducing tyre contact and stability.
NUM2#engineering-u03-17-q4@2: A 2 kg mass on an 800 N/m spring has a damper with c = 16 N s/m. What is the damping ratio? | 0.2 | 1% | ratio | c_{c} = 2√(800 × 2) = 80 N s/m; ζ = 16 ÷ 80 = 0.2.
SA2#engineering-u03-17-q5@2,3: Explain why door closers and measuring instruments are designed to be close to critical damping. | Critical damping returns a system to equilibrium in the shortest time without oscillating. A door closer that is underdamped would swing and bang; one that is overdamped would close too slowly. An instrument needle that overshoots and oscillates is hard to read; one that is overdamped responds slowly. Near-critical damping gives a quick, smooth settling. | Fastest return without oscillation ; Underdamped problems ; Overdamped problems ; Application examples

## Forced vibration and resonance
LV: Year 1 · Advanced
S: When a periodic force drives a system, it vibrates at the driving frequency, and the response can be very large near the natural frequency. This lesson covers the steady-state response, the magnification factor, resonance, vibration isolation and engineering case studies.
O: Describe the steady-state response of a damped system to harmonic forcing
O: Calculate the magnification factor and explain resonance
O: Explain the principles of vibration isolation
PRE: Damped vibration
H: Steady-state response
E: m ẍ + c ẋ + kx = F_{0} sin ωt :: harmonic force of amplitude F_{0} and frequency ω
E: M = X ÷ (F_{0}/k) = 1 ÷ √[(1 − r^{2})^{2} + (2ζr)^{2}], r = ω/ω_{n} :: magnification factor
- At **low frequency** (r ≪ 1), M ≈ 1: the response follows the static deflection.
- At **resonance** (r ≈ 1), M ≈ 1/(2ζ): very large for light damping.
- At **high frequency** (r ≫ 1), M falls towards zero: the mass can't follow the force.
X: The system with ζ = 0.2 is driven near its natural frequency.
> At r = 1: M = 1 ÷ (2 × 0.2) = 2.5.
> The amplitude is 2.5 times the static deflection F_{0}/k.
> With ζ = 0.05, M = 10 at resonance: four times larger.
> At r = 3: M = 1 ÷ √((1 − 9)^{2} + (1.2)^{2}) = 1 ÷ 8.09 = 0.12.
IX: oscillator
H: Isolation and case studies
- **Vibration isolation**: mounting a machine on soft springs so that its operating frequency is well above √2 times the natural frequency (r > √2) reduces the force transmitted to the floor.
- **London Millennium Bridge** (2000): pedestrians' footsteps synchronised with a lateral natural frequency, causing large sway; dampers were fitted.
- **Tacoma Narrows Bridge** (1940): often cited as resonance, but its collapse was caused by aerodynamic flutter, a self-excited instability.
K: Forced vibration follows the driving frequency; near resonance the amplitude is magnified by about 1/(2ζ), and isolation requires operating well above √2 times the natural frequency.
!: Describing the Tacoma Narrows collapse as simple resonance. It was aeroelastic flutter: wind interacting with the deck's motion fed energy in, not a periodic force at the natural frequency.
EV: established | Resonance and isolation theory are fundamental to machine, building and bridge design.
EV: established | The Millennium Bridge's lateral motion was caused by synchronous lateral excitation from pedestrians (Dallard et al., 2001).
T: Resonance | Large-amplitude response when the driving frequency is near a natural frequency
T: Magnification factor | The ratio of dynamic to static amplitude in forced vibration
T: Vibration isolation | Reducing transmitted vibration by mounting a system so that its operating frequency is well above its natural frequency
SUM: Steady state vibrates at the driving frequency.
SUM: At resonance M ≈ 1/(2ζ).
SUM: Isolation needs r > √2.
SRC: Rao S. S., Mechanical Vibrations, 6th edition (SI), Pearson | secondary | 2017
SRC: Dallard P. et al., "The London Millennium Footbridge", The Structural Engineer 79(22), 17–33 | primary | 2001
SRC: Billah K. Y. and Scanlan R. H., "Resonance, Tacoma Narrows bridge failure, and undergraduate physics textbooks", American Journal of Physics 59(2), 118–124 | primary | 1991
Q: What is the magnification factor at resonance for damping ratio ζ? | Approximately 1/(2ζ).
Q: What frequency ratio is needed for vibration isolation? | r = ω/ω_{n} greater than √2.
M1#engineering-u03-18-q1@1: At what frequency ratio does resonance occur? | r ≈ 1 | r = 0 | r = √2 | r = 10 | Resonance occurs when the driving frequency is close to the natural frequency.
M2#engineering-u03-18-q2@2: A system with ζ = 0.1 is driven at resonance. What is the approximate magnification factor? | 5 | 0.2 | 10 | 1 | Applying the standard result: M ≈ 1/(2ζ) = 1 ÷ 0.2 = 5.
M3#engineering-u03-18-q3@3: A pump running at 25 Hz shakes the floor. Its mounts give a natural frequency of 20 Hz. What is the best fix? | Use softer mounts to lower the natural frequency so that 25 Hz is well above √2 times it | Use stiffer mounts to raise the natural frequency to 25 Hz | Remove all damping from the mounts | Run the pump at exactly 20 Hz | With r = 1.25, the system is near resonance; softer mounts lower ω_{n} so r exceeds √2 and transmission falls.
NUM2#engineering-u03-18-q4@2: A system with damping ratio 0.2 is driven at three times its natural frequency (r = 3). What is the magnification factor, to two decimal places? | 0.12 | 2% | ratio | M = 1 ÷ √((1 − 9)^{2} + (2 × 0.2 × 3)^{2}) = 1 ÷ √(64 + 1.44) = 1 ÷ 8.09 = 0.12.
SA2#engineering-u03-18-q5@3: Evaluate the explanations given for the failures or problems of the Tacoma Narrows Bridge and the London Millennium Bridge. | The Millennium Bridge's sway is well explained by synchronous lateral excitation: pedestrians adjusted their steps to the bridge's motion at a natural frequency, a form of resonance, solved with added damping. Tacoma Narrows is often wrongly described as resonance with wind gusts; analysis shows it was aeroelastic flutter, a self-excited instability in which deck motion and wind interacted to extract energy. The cases show the need to distinguish forced resonance from instability. | Millennium Bridge explanation ; Tacoma Narrows misconception ; Flutter explanation ; Engineering lesson
`;
