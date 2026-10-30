// Unit 4: Classical Mechanics. Format: kit/course/notes.js
export default `
## Position, displacement, distance and time
S: Position locates an object relative to an origin; displacement is the change in position (a vector); distance is the total path length travelled (a scalar). Kinematics describes motion in these terms before asking what causes it.
H: Definitions
E: Δr = r_{2} − r_{1} :: displacement: depends only on start and end points
- Distance ≥ |displacement|; equal only for straight-line motion without reversing.
- Time is measured from a chosen zero; intervals Δt are what physics uses.
- A sign convention (e.g. right and up positive) turns 1D vectors into signed numbers.
H: Graphs
- Position–time graph: gradient = velocity.
- A horizontal line means at rest; a curve means changing velocity.
X: A runner completes one lap of a 400 m track in 80 s.
> Distance = 400 m; displacement = 0 (same start and end)
> Average speed = 5 m s^{-1}; average velocity = 0
!: Displacement can be zero or negative even when an object has moved a long way.
Q: What is the difference between distance and displacement? | Distance is total path length (scalar); displacement is the straight-line change in position with direction (vector).
Q: What does the gradient of a position–time graph give? | Velocity.
M1: A car drives 3 km east then 4 km north. What is the size of its displacement? | 5 km | 7 km | 1 km | 12 km | √(3^{2} + 4^{2}) = 5 km, at 53° north of east; the distance travelled is 7 km.
M2: An object moves from x = +4 m to x = −2 m. Its displacement is: | −6 m | 6 m | 2 m | −2 m | Δx = −2 − 4.

## Speed and velocity
S: Speed is the rate of change of distance; velocity is the rate of change of displacement, with direction. Instantaneous velocity is the derivative of position, and it is always tangent to the path.
H: Definitions
E: v̄ = Δr/Δt :: average velocity
E: v = dr/dt :: instantaneous velocity
E: speed = |v|
- Average speed = total distance / total time; not the magnitude of average velocity in general.
- Velocity changes if either speed or direction changes: uniform circular motion has constant speed but changing velocity.
H: Average speeds over legs
P: For equal distances at speeds v_{1} and v_{2}, the average is the harmonic mean 2v_{1}v_{2}/(v_{1} + v_{2}), not the arithmetic mean; you spend longer at the lower speed.
X: A cyclist rides 10 km at 20 km h^{-1} and returns at 30 km h^{-1}. Average speed?
> Times: 0.5 h and 0.333 h; total 0.833 h for 20 km
> Average speed = 24 km h^{-1}, not 25
!: Speedometers show speed, not velocity: a car going round a bend at a steady 50 km h^{-1} is accelerating.
Q: How is instantaneous velocity defined? | v = dr/dt, the derivative of position with respect to time.
Q: Can an object have constant speed but changing velocity? | Yes: in circular motion the direction changes.
M1: Which is a vector? | Velocity | Speed | Distance | Time | Velocity has direction.
M2: The average speed for equal distances at 40 and 60 km h^{-1} is: | 48 km h^{-1} | 50 km h^{-1} | 45 km h^{-1} | 52 km h^{-1} | 2 × 40 × 60/100 = 48.

## Acceleration
S: Acceleration is the rate of change of velocity. It can change an object's speed, its direction, or both, and by Newton's second law it is always caused by a net force.
H: Definitions
E: a = dv/dt = d^{2}r/dt^{2}
- Velocity–time graph: gradient = acceleration; area = displacement.
- In 2D, acceleration has tangential (changes speed) and normal (changes direction) components: a_{t} = dv/dt, a_{n} = v^{2}/r.
- Deceleration usually means acceleration opposite to velocity, not negative acceleration.
H: Typical sizes
- g = 9.81 m s^{-2}; sports car 0–100 km h^{-1} in 3 s ≈ 9 m s^{-2}; fighter pilots tolerate ~9g briefly; car crash ~50–100g.
X: A car slows from 30 m s^{-1} to rest in 5.0 s. Find its acceleration.
> a = (0 − 30)/5.0 = −6.0 m s^{-2}
> Magnitude 6.0 m s^{-2}, opposite to the motion (about 0.6g)
!: Zero velocity doesn't mean zero acceleration: a ball at the top of its flight has v = 0 but a = g downward.
Q: What does the area under a velocity–time graph represent? | Displacement.
Q: What are the tangential and normal components of acceleration? | Tangential dv/dt changes speed; normal v^{2}/r changes direction.
M1: At the top of a vertical throw, the ball's acceleration is: | 9.8 m s^{-2} downward | Zero | 9.8 m s^{-2} upward | Undefined | Gravity still acts.
M2: An object's velocity changes from (3, 0) to (0, 4) m s^{-1} in 2 s. Average acceleration magnitude? | 2.5 m s^{-2} | 0.5 m s^{-2} | 3.5 m s^{-2} | 1 m s^{-2} | Δv = (−3, 4), |Δv| = 5, divided by 2.

## Motion in one dimension
S: Straight-line motion is described by signed position, velocity and acceleration along one axis. With calculus you can get any of x(t), v(t), a(t) from another, and graphs make the relationships visible.
H: Calculus links
E: v = dx/dt, a = dv/dt; x = x_{0} + ∫v dt, v = v_{0} + ∫a dt
E: a = v dv/dx :: useful when acceleration depends on position
H: Reading graphs
- x–t: gradient = v. v–t: gradient = a, area = Δx. a–t: area = Δv.
- Where v–t crosses zero, the object reverses.
- Displacement is the signed area; distance is the total unsigned area.
X: v(t) = 6 − 2t m s^{-1} from t = 0 to 5 s. Find the displacement and distance.
> x(t) = 6t − t^{2}; displacement at 5 s = 30 − 25 = 5 m
> Reverses at t = 3 s (x = 9 m), then back to 5 m: distance = 9 + 4 = 13 m
!: Area under the time axis on a v–t graph is negative displacement; add magnitudes only when you want distance.
Q: When is a = v dv/dx useful? | When acceleration is given as a function of position rather than time.
Q: How do you find when an object reverses direction? | Find when v = 0 (and changes sign).
M1: The area under an acceleration–time graph gives: | Change in velocity | Displacement | Speed | Jerk | ∫a dt = Δv.
M2: x = t^{3} − 3t. When is the object momentarily at rest? | t = 1 s | t = 0 | t = 3 s | t = √3 s | v = 3t^{2} − 3 = 0.

## Motion in two and three dimensions
S: In two and three dimensions position, velocity and acceleration are vectors. The key insight is that perpendicular components evolve independently, so a 2D problem is two 1D problems linked by time.
H: Vector kinematics
E: r(t) = x(t)i + y(t)j + z(t)k; v = dr/dt; a = dv/dt
- Each component obeys its own 1D equations; they share the same t.
- Velocity is tangent to the trajectory; acceleration points towards the inside of a curve (plus any speeding up).
H: Examples
- Projectile: constant a = (0, −g); a parabola.
- Uniform circular motion: |v| constant, a = v^{2}/r towards the centre.
- Helical motion of a charge in a magnetic field: circular in the plane ⊥ B, uniform along B.
X: r(t) = (3t, 4t − 5t^{2}) m. Find v and a at t = 1 s.
> v = (3, 4 − 10t) = (3, −6) m s^{-1}, speed 6.7 m s^{-1}
> a = (0, −10) m s^{-2}: constant, like a projectile
!: You can't add speeds in different directions as numbers; add velocity vectors component by component.
Q: Why can perpendicular components of motion be treated separately? | They obey independent equations of motion linked only by time.
Q: Which way does acceleration point on a curved path at constant speed? | Towards the centre of curvature, perpendicular to the velocity.
M1: r(t) = (2t^{2}, 3t). What is the acceleration? | (4, 0) | (4t, 3) | (2, 3) | (0, 0) | Differentiate twice.
M2: A particle moves in a circle at constant speed. Which is true? | Velocity changes, speed doesn't | Velocity is constant | Acceleration is zero | Acceleration is tangential | The direction keeps changing.

## Kinematic equations
S: For constant acceleration, five quantities (s, u, v, a, t) are linked by the suvat equations. Each equation leaves out one quantity, so pick the one missing the variable you neither know nor need.
H: The equations
E: v = u + at :: no s
E: s = ut + ½at^{2} :: no v
E: s = vt − ½at^{2} :: no u
E: v^{2} = u^{2} + 2as :: no t
E: s = ½(u + v)t :: no a
H: Using them
- Choose a positive direction; give every vector quantity a sign.
- Only valid for constant acceleration; split motion into stages if a changes.
- Quadratic solutions in t: interpret both roots.
X: A car at 25 m s^{-1} brakes at 5.0 m s^{-2}. Find the stopping distance.
> Missing t: v^{2} = u^{2} + 2as with v = 0, a = −5.0
> s = 625/10 = 62.5 m
H: Derivation
P: From a = constant, integrate: v = u + at; integrate again: s = ut + ½at^{2}. Eliminate t to get v^{2} = u^{2} + 2as. The "no a" equation says the average velocity is the mean of u and v, true only when a is constant.
!: Don't use suvat for non-constant acceleration (drag, springs): use calculus or energy instead.
Q: Which suvat equation has no time? | v^{2} = u^{2} + 2as.
Q: When are the suvat equations valid? | Only for constant acceleration.
M1: A stone dropped from rest falls for 3.0 s (g = 9.8). How far? | 44 m | 29 m | 88 m | 15 m | s = ½ × 9.8 × 9.
M2: Stopping distance at speed u with fixed deceleration scales as: | u^{2} | u | √u | u^{3} | s = u^{2}/(2a): double speed, four times the distance.

## Projectile motion
S: A projectile moves under gravity alone: constant velocity horizontally and constant acceleration g vertically. The path is a parabola, and range, height and time of flight all follow from separating the components.
H: Results (launch speed u at angle θ, level ground, no drag)
E: x = u cos θ t; y = u sin θ t − ½gt^{2}
E: T = 2u sin θ/g :: time of flight
E: H = u^{2}sin^{2}θ/(2g) :: maximum height
E: R = u^{2}sin 2θ/g :: range: maximum at θ = 45°
E: y = x tan θ − gx^{2}/(2u^{2}cos^{2}θ) :: the parabolic path
- Complementary angles (30° and 60°) give the same range.
- At the top, v is horizontal: u cos θ.
H: With air resistance
P: Drag shortens range and height, makes the descent steeper than the ascent, and lowers the optimum angle below 45° (around 30–40° for a golf ball, but backspin lift changes things).
X: A ball is kicked at 20 m s^{-1} at 30° (g = 9.8). Find its range and maximum height.
> R = 400 × sin 60°/9.8 = 35 m
> H = 400 × 0.25/19.6 = 5.1 m
!: The horizontal velocity doesn't change during flight (no drag); only the vertical component is affected by g.
Q: What angle gives maximum range on level ground (no drag)? | 45°.
Q: What is the velocity at the top of the trajectory? | Horizontal, equal to u cos θ.
M1: A ball rolls off a 1.25 m high table at 2.0 m s^{-1} (g = 10). How far from the table does it land? | 1.0 m | 0.5 m | 2.0 m | 2.5 m | Fall time 0.5 s; 2.0 × 0.5 = 1.0 m.
M2: Two projectiles are launched at the same speed at 20° and 70°. Which lands farther? | Same range | 20° | 70° | Depends on mass | sin 40° = sin 140°.
M3: A monkey drops from a branch at the instant a dart is fired straight at it. The dart: | Hits the monkey (both fall the same distance in the same time) | Passes above | Passes below | Hits only if fired at 45° | Gravity deflects both equally.

## Relative motion
S: Velocities are measured relative to a frame. The velocity of A relative to C equals A relative to B plus B relative to C, the Galilean addition rule, valid when speeds are much less than c.
H: The rule
E: v_{AC} = v_{AB} + v_{BC}; v_{AB} = −v_{BA}
- Relative velocity of A seen from B: v_{A} − v_{B}.
- Accelerations are the same in all frames moving at constant velocity relative to each other.
H: Classic problems
- **River crossing**: aim upstream so the resultant is straight across: sin θ = v_{river}/v_{boat}.
- **Aircraft in wind**: heading vs track.
- **Closest approach**: work in the frame of one object; the other moves in a straight line.
X: A swimmer (1.5 m s^{-1} in still water) crosses a 60 m river flowing at 0.9 m s^{-1}. Aiming straight across, where does she land, and how long does it take?
> Time = 60/1.5 = 40 s (the current doesn't change the across-component)
> Drift = 0.9 × 40 = 36 m downstream
!: Galilean addition fails near c: no object can be seen moving faster than light. Use relativistic velocity addition there.
Q: State the Galilean velocity addition rule. | v_{AC} = v_{AB} + v_{BC}.
Q: To cross a river in the shortest time, which way should you aim? | Straight across (perpendicular to the bank).
M1: Two cars approach each other at 20 and 30 m s^{-1}. Their relative speed is: | 50 m s^{-1} | 10 m s^{-1} | 25 m s^{-1} | 600 m s^{-1} | Opposite directions add.
M2: A plane flies at 200 m s^{-1} relative to air in a 50 m s^{-1} crosswind. Its ground speed (heading perpendicular to wind) is: | 206 m s^{-1} | 250 m s^{-1} | 150 m s^{-1} | 200 m s^{-1} | √(200^{2} + 50^{2}).

## Reference frames
S: A reference frame is a viewpoint with its own clocks and rulers from which motion is measured. Choosing a convenient frame (the centre of mass, a moving train, a rotating Earth) can make a problem far simpler, as long as you account correctly for the frame's own motion.
H: Kinds of frame
- **Inertial**: not accelerating; Newton's first law holds.
- **Non-inertial**: accelerating or rotating; fictitious forces appear.
- **Centre-of-mass frame**: total momentum zero; the natural frame for collisions.
- **Lab frame**: where the apparatus is at rest.
H: Galilean relativity
E: x' = x − Vt, y' = y, z' = z, t' = t :: frame S' moving at V along x
P: The laws of mechanics are the same in all inertial frames: no mechanical experiment inside a smoothly moving train can tell you its speed. Einstein extended this to all of physics, including light, which forced the Lorentz transformations.
X: In the centre-of-mass frame, analyse a 2 kg ball at 3 m s^{-1} hitting a stationary 1 kg ball.
> v_{cm} = (2 × 3)/3 = 2 m s^{-1}
> In the CM frame the balls approach at +1 and −2 m s^{-1}; in an elastic collision they simply reverse
> Back in the lab: v_{1} = 2 − 1 = 1 m s^{-1}, v_{2} = 2 + 2 = 4 m s^{-1}
!: Energies are frame-dependent (kinetic energy differs between frames), but energy conservation holds in each inertial frame.
Q: What is the Galilean principle of relativity? | The laws of mechanics are the same in every inertial frame.
Q: Why is the centre-of-mass frame useful for collisions? | Total momentum is zero there, so the analysis is symmetric and simple.
M1: Which quantity is the same in all inertial frames (Galilean)? | Acceleration | Velocity | Kinetic energy | Momentum | Constant relative velocity doesn't change acceleration.
M2: A ball dropped in a train moving at constant velocity lands: | Directly below the release point (in the train's frame) | Behind it | In front of it | Depends on the train's speed | Galilean relativity.

## Newton's laws of motion
S: Newton's three laws connect force and motion. They define what force does (changes momentum), give a quantitative rule (F = dp/dt), and insist forces come in equal and opposite pairs between objects.
H: The laws
- **First**: an object stays at rest or moves with constant velocity unless a net external force acts. (Defines inertial frames.)
- **Second**: F_{net} = dp/dt = ma for constant mass.
- **Third**: if A exerts a force on B, B exerts an equal and opposite force on A, of the same type, along the same line.
E: ΣF = ma :: vector equation; apply to each component separately
H: Using the second law
- Isolate one body; draw all forces on it (free-body diagram).
- Choose axes (along the acceleration); write ΣF = ma per axis.
- For connected bodies, use one equation per body plus a constraint (same acceleration if the string is taut).
X: A 2.0 kg block is pulled by a 10 N horizontal force on a surface with 4.0 N of friction. Find a.
> ΣF = 10 − 4 = 6 N
> a = 6/2 = 3.0 m s^{-2}
!: Third-law pairs act on different bodies, so they never cancel each other in one body's free-body diagram. Weight and the normal force on a book are not a third-law pair.
Q: State Newton's second law in terms of momentum. | The net force equals the rate of change of momentum, F = dp/dt.
Q: What is the third-law partner of the Earth's gravitational pull on you? | Your gravitational pull on the Earth.
M1: A 1000 kg car accelerates at 2 m s^{-2}. The net force is: | 2000 N | 500 N | 1000 N | 4000 N | F = ma.
M2: A horse pulls a cart forward. Why can they accelerate if the cart pulls the horse back equally? | The forces act on different bodies; the ground pushes the horse forward more than the cart pulls back | They can't | The horse's force is larger | Friction is zero | Consider each body's net force separately.

## Inertial and non-inertial frames
S: Newton's laws hold as written only in inertial frames. In an accelerating or rotating frame, objects seem to accelerate with no force acting, so you must add fictitious (inertial) forces to use F = ma.
H: Fictitious forces
E: F_{fict} = −mA :: in a frame accelerating at A
E: centrifugal: mω^{2}r outward; Coriolis: −2mω × v′ :: in a frame rotating at ω
- They aren't interactions: there's no third-law partner.
- They're proportional to mass, like gravity, which hints at Einstein's equivalence principle.
H: Examples
- Lurching forward when a bus brakes.
- Apparent weight in a lift: R = m(g + a) going up with acceleration a.
- The Earth is slightly non-inertial: Coriolis deflects winds and long-range shells; Foucault's pendulum precesses.
X: A 60 kg person stands on scales in a lift accelerating upward at 2.0 m s^{-2}. What do the scales read?
> R − mg = ma ⇒ R = 60(9.8 + 2.0) = 708 N
> In the lift's frame: an extra downward fictitious force of 120 N
!: In an inertial frame, "centrifugal force" doesn't exist: an object in circular motion is pulled inward and has no outward force acting on it.
Q: What is a fictitious force? | An apparent force needed to apply Newton's laws in a non-inertial frame; it has no physical source or reaction partner.
Q: What do scales read in a freely falling lift? | Zero (apparent weightlessness).
M1: In a lift accelerating downward at g/2, your apparent weight is: | mg/2 | mg | 3mg/2 | 0 | R = m(g − a).
M2: Which shows the Earth is a rotating (non-inertial) frame? | Foucault's pendulum precessing | Tides | Ocean waves | The Moon's phases | The swing plane rotates relative to the ground.

## Free-body diagrams
S: A free-body diagram shows one object, isolated, with every external force acting on it drawn as an arrow from its point of action. It's the essential first step in any force problem.
H: How to draw one
- Isolate the body; draw it as a box or dot (or to shape if torques matter).
- Add every force from contact (normal, friction, tension, drag, push) and from fields (weight, electric, magnetic).
- Label each force by type and by what exerts it ("tension from rope").
- Do not include forces the body exerts on others, or "ma" as a force.
- Mark the acceleration separately, beside the diagram.
H: Checks
- Each force must have a physical source.
- If the body is in equilibrium, the arrows must form a closed polygon.
- Choose axes along the acceleration to minimise components.
X: A box is pushed up a rough slope by a horizontal force P. List the forces.
> Weight mg (down), normal force N (perpendicular to slope), friction f (down the slope, opposing motion), push P (horizontal)
> Resolve along and perpendicular to the slope: N = mg cos θ + P sin θ
!: "Centripetal force" isn't an extra force to draw; it's the net inward force supplied by real forces (tension, gravity, friction).
Q: What forces go on a free-body diagram? | All external forces acting on the chosen body, and nothing else.
Q: Why is "ma" never drawn as a force? | It's the result of the net force, not a separate force.
M1: A ball hangs from a string at rest. Its free-body diagram has: | Weight and tension | Weight, tension and the ball's pull on the string | Tension only | Weight only | Only forces on the ball.
M2: A car rounds a flat bend. What provides the centripetal force? | Friction from the road | Centrifugal force | The engine | Air resistance | Sideways static friction on the tyres.

## Normal force and tension
S: The normal force is the perpendicular push a surface exerts to stop objects passing through it; tension is the pull transmitted along a rope or string. Both are "constraint" forces: they take whatever value the motion requires.
H: Normal force
- Perpendicular to the contact surface; can only push.
- Not always mg: on a slope N = mg cos θ; in an accelerating lift N = m(g + a); pulling up on a box reduces it.
- When N falls to zero, contact is lost (a car over a hump, a roller-coaster loop).
H: Tension
- Along the string, pulling on whatever it's attached to.
- Light (massless) string: same tension throughout. Ideal pulley: changes direction, not size.
- A heavy rope has tension that varies along its length.
X: Two masses, 3.0 kg and 2.0 kg, hang over a frictionless pulley (Atwood machine). Find a and T.
> a = (m_{1} − m_{2})g/(m_{1} + m_{2}) = (1/5)(9.8) = 1.96 m s^{-2}
> T = 2m_{1}m_{2}g/(m_{1} + m_{2}) = 2 × 6 × 9.8/5 = 23.5 N
!: Ropes can't push; if a calculation gives negative tension, the string has gone slack and the model changes.
Q: What is the normal force on a block on a slope of angle θ? | mg cos θ (if no other forces have perpendicular components).
Q: When does a car lose contact going over a hump of radius r? | When v^{2}/r ≥ g, so N would have to be negative.
M1: A 5 kg mass hangs from a rope in a lift accelerating up at 2 m s^{-2} (g = 10). Tension? | 60 N | 50 N | 40 N | 10 N | T = m(g + a).
M2: In the Atwood machine, if m_{1} = m_{2}, then: | a = 0 and T = mg | a = g | T = 0 | T = 2mg | Balanced.

## Friction and drag
S: Friction opposes relative sliding between surfaces; drag opposes motion through a fluid. Friction is roughly independent of speed and contact area, while drag grows with speed.
H: Friction
E: f_{s} ≤ μ_{s}N :: static friction: as large as needed, up to a maximum
E: f_{k} = μ_{k}N :: kinetic friction, usually μ_{k} < μ_{s}
- Microscopically, friction comes from bonds and interlocking at the small true contact area, which is ∝ N.
- Friction is what lets you walk, drive and grip; on wheels rolling without slipping it's static friction.
H: Drag
E: F_{D} ≈ bv :: low speed, small objects, viscous (Stokes: b = 6πηr)
E: F_{D} = ½ρC_{d}Av^{2} :: high speed, turbulent: most everyday objects
- The Reynolds number Re = ρvL/η decides which regime applies.
- Streamlining reduces C_{d} (car ≈ 0.3, flat plate ≈ 1.2).
X: A 20 kg box on a floor with μ_{s} = 0.5, μ_{k} = 0.4. What force starts it moving, and what keeps it moving at constant speed? (g = 9.8)
> Start: μ_{s}mg = 98 N
> Keep moving: μ_{k}mg = 78 N
!: Static friction isn't always μ_{s}N; that's only its maximum. On a stationary box pushed with 30 N, static friction is exactly 30 N.
Q: Why does ABS braking stop cars faster? | Wheels keep rolling, using static friction (higher than kinetic) instead of skidding.
Q: How does high-speed drag depend on speed? | It's proportional to v^{2}.
M1: A 10 kg block is pushed with 20 N; μ_{s} = 0.5 (g = 10). The friction force is: | 20 N | 50 N | 0 | 30 N | Static friction matches the push until it exceeds 50 N.
M2: Doubling a car's speed multiplies the power needed to overcome drag by: | 8 | 2 | 4 | 16 | P = Fv ∝ v^{3}.

## Inclined planes
S: On a slope, resolve forces parallel and perpendicular to the surface. Gravity's component down the slope, mg sin θ, drives motion; its perpendicular component, mg cos θ, sets the normal force and therefore friction.
H: Key results
E: a = g sin θ :: frictionless slope
E: a = g(sin θ − μ_{k} cos θ) :: sliding down with friction
E: tan θ = μ_{s} :: angle at which a block starts to slip
- Up the slope with friction: a = −g(sin θ + μ_{k} cos θ) while it moves up.
X: A block slides from rest down a 30° slope with μ_{k} = 0.2. Find its speed after 4.0 m (g = 9.8).
> a = 9.8(0.5 − 0.2 × 0.866) = 3.2 m s^{-2}
> v = √(2 × 3.2 × 4.0) = 5.1 m s^{-1}
H: Measuring μ
P: Tilt the slope until the block just slips: μ_{s} = tan θ_{c}. Then find the angle at which it slides at constant speed once started: μ_{k} = tan θ.
!: The normal force on a slope isn't mg; it's mg cos θ (plus any other perpendicular forces).
Q: What component of weight acts down a slope? | mg sin θ.
Q: How can you measure μ_{s} with a tilting ramp? | Increase the angle until the block just slips; μ_{s} = tan θ.
M1: A block is at rest on a 20° slope. What is the friction force for m = 5 kg (g = 10)? | 17 N | 47 N | 50 N | 0 | mg sin 20° = 50 × 0.342.
M2: On a frictionless slope, a heavier block's acceleration is: | The same as a lighter block's | Larger | Smaller | Zero | a = g sin θ, independent of mass.

## Circular motion
S: An object moving in a circle constantly changes direction, so it accelerates towards the centre even at constant speed. Angular quantities describe the motion neatly, and a net inward force is needed to sustain it.
H: Quantities
E: ω = dθ/dt = 2π/T = 2πf :: angular velocity
E: v = ωr :: linear speed
E: a = v^{2}/r = ω^{2}r :: centripetal acceleration
- Period T, frequency f = 1/T; angles in radians.
- Non-uniform circular motion has a tangential acceleration rα too.
H: Vertical circles
- At the top of a loop the net inward force is mg + N (or mg + T); at the bottom N − mg.
- Minimum speed at the top to stay in contact: v = √(gr).
- Energy conservation links speeds at top and bottom: v_{bottom}^{2} = v_{top}^{2} + 4gr.
X: A 0.2 kg ball whirls on a 0.5 m string in a vertical circle. What is the minimum speed at the top, and the tension at the bottom?
> v_{top} = √(9.8 × 0.5) = 2.21 m s^{-1}
> v_{bottom}^{2} = 4.9 + 19.6 = 24.5; T = mg + mv^{2}/r = 1.96 + 9.8 = 11.8 N
!: Circular motion at constant speed is still accelerated motion; there must be a net force.
Q: What is the minimum speed at the top of a vertical circle of radius r? | √(gr).
Q: How are v and ω related? | v = ωr.
M1: A wheel turns at 600 rpm. Its angular velocity is: | 63 rad s^{-1} | 10 rad s^{-1} | 600 rad s^{-1} | 3770 rad s^{-1} | 10 rev/s × 2π.
M2: In a loop-the-loop, the normal force is largest at: | The bottom | The top | The sides | It's constant | At the bottom N must exceed mg to provide the inward force.

## Centripetal acceleration and force
S: Centripetal means "centre-seeking": the acceleration v^{2}/r towards the centre of a circular path, and the net force mv^{2}/r that causes it. That force is always provided by real forces: tension, gravity, friction, normal force, magnetism.
H: Derivation
P: In time Δt the velocity vector turns through Δθ = vΔt/r, so |Δv| = vΔθ = v^{2}Δt/r, pointing towards the centre. Dividing by Δt gives a = v^{2}/r.
E: F_{c} = mv^{2}/r = mω^{2}r
H: Examples
- Car on a flat bend: friction, v_{max} = √(μ_{s}gr).
- Banked track (no friction): tan θ = v^{2}/(rg).
- Satellite: gravity, GMm/r^{2} = mv^{2}/r.
- Conical pendulum: horizontal component of tension.
- Charged particle in B: qvB = mv^{2}/r, so r = mv/(qB).
X: At what speed does a 15° banked curve of radius 100 m need no friction?
> v = √(rg tan θ) = √(100 × 9.8 × 0.268) = 16 m s^{-1} (58 km h^{-1})
!: Don't add mv^{2}/r as an extra force on the free-body diagram; set the sum of real inward forces equal to mv^{2}/r.
Q: What provides the centripetal force for a satellite? | Gravity.
Q: What is the design speed of a frictionless banked curve? | v = √(rg tan θ).
M1: A 1000 kg car takes a 50 m radius bend at 10 m s^{-1}. The friction needed is: | 2000 N | 200 N | 500 N | 20 000 N | mv^{2}/r = 1000 × 100/50.
M2: Doubling the speed on a bend multiplies the required centripetal force by: | 4 | 2 | √2 | 8 | ∝ v^{2}.

## Work and energy
S: Work is energy transferred by a force acting through a displacement. The work–energy theorem says the net work on an object equals its change in kinetic energy, which often solves problems without needing the time.
H: Definitions
E: W = F·s = Fs cos θ :: constant force
E: W = ∫F·dr :: varying force: area under F–x graph
E: W_{net} = ΔKE :: work–energy theorem
- Work is positive when force has a component along the motion, negative when against, zero when perpendicular (centripetal force does no work).
- Unit: joule, 1 J = 1 N m.
H: Energy
P: Energy is conserved and comes in many stores (kinetic, gravitational, elastic, thermal, chemical, nuclear). Work and heating are the two ways energy moves between systems.
X: A 1500 kg car accelerates from 10 to 20 m s^{-1}. How much net work is done?
> ΔKE = ½ × 1500 × (400 − 100) = 225 kJ
!: Holding a heavy bag still does no mechanical work on it (no displacement), even though your muscles use chemical energy.
Q: Why does a centripetal force do no work? | It is perpendicular to the velocity at every instant.
Q: State the work–energy theorem. | The net work done on an object equals its change in kinetic energy.
M1: A 50 N force pulls a sledge 10 m at 60° to the ground. Work done: | 250 J | 500 J | 433 J | 0 | 50 × 10 × cos 60°.
M2: Friction does −200 J of work on a sliding box. This means: | 200 J of kinetic energy is transferred away (mostly to heating) | The box gains 200 J | No energy is transferred | Momentum is lost but not energy | Negative work removes energy from the box.

## Kinetic and potential energy
S: Kinetic energy is energy of motion; potential energy is energy stored by position or configuration in a field or a deformed body. Converting between them, with total energy conserved, is behind falling, swinging, bouncing and orbiting.
H: Formulas
E: KE = ½mv^{2} = p^{2}/(2m)
E: ΔU = mgΔh :: near Earth's surface
E: U = −GMm/r :: general gravitational PE (zero at infinity)
E: U = ½kx^{2} :: elastic PE of a spring
E: F = −dU/dx :: force from potential energy
H: Potential energy curves
- Equilibria where dU/dx = 0: minima are stable, maxima unstable.
- A particle with total energy E is confined where U(x) ≤ E; turning points are where U = E.
X: A 0.5 kg ball is dropped from 20 m. Find its speed just before landing (no drag, g = 9.8).
> mgh = ½mv^{2} ⇒ v = √(2gh) = √392 = 19.8 m s^{-1}
!: Only changes in potential energy matter; the zero point is a free choice, but use the same one throughout a problem.
Q: How is force related to the potential energy curve? | F = −dU/dx: force points downhill on the U(x) curve.
Q: What is the elastic energy stored in a spring stretched by x? | ½kx^{2}.
M1: Doubling a car's speed multiplies its kinetic energy by: | 4 | 2 | √2 | 8 | ∝ v^{2}.
M2: A spring (k = 200 N m^{-1}) is compressed 0.1 m and launches a 0.05 kg ball. Launch speed? | 6.3 m s^{-1} | 20 m s^{-1} | 2 m s^{-1} | 40 m s^{-1} | ½kx^{2} = 1 J = ½mv^{2} ⇒ v = √40.

## Conservative and non-conservative forces
S: A conservative force does work that depends only on start and end points, so a potential energy can be defined for it. Non-conservative forces like friction depend on the path and turn mechanical energy into thermal energy.
H: Tests for conservative forces
- Work around any closed loop is zero: ∮F·dr = 0.
- Equivalent: F = −∇U, or ∇ × F = 0.
- Conservative: gravity, electrostatic forces, ideal springs.
- Non-conservative: friction, drag, a motor's push.
E: ΔKE + ΔU = W_{nc} :: mechanical energy changes only by the work of non-conservative forces
X: A 2.0 kg block slides 5.0 m down a 30° slope with friction 4.0 N, starting from rest. Find its final speed.
> mgh = 2 × 9.8 × 2.5 = 49 J; friction work = −20 J
> ½mv^{2} = 29 J ⇒ v = 5.4 m s^{-1}
P: Even friction is conservative at the atomic level; mechanical energy isn't lost, it spreads into many microscopic degrees of freedom (heat) where we can't easily recover it.
!: Magnetic forces do no work (F ⊥ v) but aren't described by a potential energy in the usual sense; "zero work" and "conservative" are different properties.
Q: How can you tell if a force is conservative? | The work round any closed path is zero (equivalently its curl is zero).
Q: Why can't friction have a potential energy? | The work it does depends on the path taken, not just the end points.
M1: Which force is non-conservative? | Air resistance | Gravity | Spring force | Electrostatic force | Drag depends on path and speed.
M2: A ball thrown up returns to your hand slower than it left. This shows: | A non-conservative force (drag) acted | Gravity is non-conservative | Energy isn't conserved | Momentum was conserved | Drag removed mechanical energy.

## Power and efficiency
S: Power is the rate of transferring energy or doing work. Efficiency is the fraction of input energy that ends up in the useful form; the rest is "wasted", usually as heat.
H: Formulas
E: P = dW/dt = E/t
E: P = F·v :: power delivered by a force on a moving object
E: η = useful output/total input (× 100%)
- 1 W = 1 J s^{-1}; 1 kWh = 3.6 MJ; 1 horsepower ≈ 746 W.
- Typical efficiencies: electric motor 85–95%, car engine 25–35%, LED 40%, solar cell 20%, human muscle ~25%.
X: A 1200 kg car climbs a 5% slope at a steady 20 m s^{-1} against 400 N of drag. Find the power output.
> Force along slope = mg sin θ + drag = 1200 × 9.8 × 0.05 + 400 = 988 N
> P = Fv = 988 × 20 ≈ 20 kW
H: Limits
P: No device is 100% efficient for converting heat to work; the Carnot limit 1 − T_{c}/T_{h} applies to heat engines. Electrical and mechanical conversions can approach 100% but never reach it.
!: Efficiency can't exceed 100%. Heat pumps quoting "300%" use a coefficient of performance, moving heat rather than creating it.
Q: How is the power delivered by a force on a moving object found? | P = F·v.
Q: What happens to the "wasted" energy in machines? | Mostly it's transferred to thermal energy in the surroundings.
M1: A 60 kg person climbs 3.0 m of stairs in 4.0 s. Power? | 441 W | 45 W | 180 W | 1764 W | mgh/t = 60 × 9.8 × 3/4.
M2: A motor takes 500 W and lifts 20 kg at 2.0 m s^{-1}. Efficiency? | 78% | 40% | 100% | 92% | Useful power mgv = 392 W.

## Momentum and impulse
S: Momentum p = mv measures the quantity of motion. A force changes momentum, and the total change is the impulse: force times time. Spreading a collision over a longer time reduces the force: that's how airbags, crumple zones and bent knees work.
H: Definitions
E: p = mv
E: J = ∫F dt = Δp :: impulse–momentum theorem
E: F_{avg} = Δp/Δt
- Area under a force–time graph = impulse.
- Momentum is a vector; direction changes count (a ball bouncing back has Δp = 2mv).
X: A 0.15 kg ball at 30 m s^{-1} is caught and stopped in 0.05 s. Find the average force. If the catcher's hands move back to stop it in 0.20 s?
> Δp = 4.5 kg m s^{-1}
> F = 4.5/0.05 = 90 N; with 0.20 s, F = 22.5 N
!: Bouncing back produces a larger momentum change (and force) than stopping: Δp = m(v_{f} − v_{i}) with signs.
Q: What is impulse? | The product of force and time (∫F dt), equal to the change in momentum.
Q: How do crumple zones reduce injury? | They increase the collision time, reducing the average force for the same momentum change.
M1: A 0.1 kg ball hits a wall at 10 m s^{-1} and rebounds at 10 m s^{-1}. Momentum change? | 2 kg m s^{-1} | 0 | 1 kg m s^{-1} | 20 kg m s^{-1} | 0.1 × (10 − (−10)).
M2: A force–time graph is a triangle of peak 400 N and duration 0.02 s. Impulse? | 4 N s | 8 N s | 400 N s | 2 N s | Area = ½ × 0.02 × 400.

## Conservation of momentum
S: If no net external force acts on a system, its total momentum is constant. This follows from Newton's third law (internal forces cancel in pairs) and, more deeply, from the uniformity of space.
H: The law
E: Σp_{initial} = Σp_{final} :: isolated system
- Holds in collisions, explosions, recoil, rocket propulsion and particle decays.
- Short collisions: external forces like gravity or friction act only briefly, so momentum is almost conserved during impact.
- Applies to each component separately: in 2D you get two equations.
X: A 50 g bullet fired at 400 m s^{-1} from a 4.0 kg rifle. Find the recoil speed.
> 0 = 0.05 × 400 + 4.0v
> v = −5.0 m s^{-1} (backwards)
H: Why it's conserved
P: Internal forces come in third-law pairs, so their impulses cancel in the total. Noether's theorem gives the deeper reason: the laws of physics are the same everywhere in space.
!: Momentum is conserved only for the whole isolated system; the momentum of one part (the bullet alone) certainly changes.
Q: When is the total momentum of a system conserved? | When the net external force on it is zero.
Q: Why does a gun recoil? | Total momentum stays zero, so the gun gains backward momentum equal to the bullet's forward momentum.
M1: A 2 kg cart at 3 m s^{-1} couples to a stationary 4 kg cart. Final speed? | 1 m s^{-1} | 1.5 m s^{-1} | 3 m s^{-1} | 2 m s^{-1} | 6 = 6v.
M2: An astronaut throws a tool to move back towards the ship. This uses: | Conservation of momentum | Conservation of energy only | Air resistance | Gravity | Throwing the tool away gives the astronaut opposite momentum.

## Collisions and explosions
S: In collisions and explosions, large internal forces act for a short time, so momentum is conserved. Kinetic energy may be conserved (elastic), partly lost (inelastic) or created from stored energy (explosions).
H: Types
- **Elastic**: KE conserved (atomic collisions, ideal billiard balls).
- **Inelastic**: KE not conserved, some converted to heat, sound, deformation.
- **Perfectly inelastic**: bodies stick together; maximum KE loss consistent with momentum.
- **Explosion**: stored chemical or elastic energy becomes KE; total momentum stays the same (zero if initially at rest).
H: Explosions from rest
E: m_{1}v_{1} = −m_{2}v_{2}; KE_{1}/KE_{2} = m_{2}/m_{1}
P: The lighter fragment gets more of the kinetic energy. In alpha decay the alpha particle carries about 98% of the released energy.
X: A 3.0 kg shell at rest explodes into 1.0 kg and 2.0 kg pieces, releasing 600 J. Find their speeds.
> 1.0v_{1} = 2.0v_{2}; ½(1.0)v_{1}^{2} + ½(2.0)v_{2}^{2} = 600
> v_{1} = 2v_{2}: 2v_{2}^{2} + v_{2}^{2} = 600 ⇒ v_{2} = 14.1 m s^{-1}, v_{1} = 28.3 m s^{-1}
!: Momentum is conserved in every type of collision; only kinetic energy behaves differently between types.
Q: In an explosion from rest, which fragment gets more kinetic energy? | The lighter one.
Q: What is a perfectly inelastic collision? | One in which the bodies stick together, losing the maximum kinetic energy.
M1: In which type of collision is KE conserved? | Elastic | Inelastic | Perfectly inelastic | Explosion | By definition.
M2: A uranium-238 nucleus at rest emits an alpha particle (mass 4). The daughter's KE is roughly what fraction of the total? | 2% | 50% | 98% | 0 | KE ratio = mass ratio inverted: 4/234 of the alpha's.

## Elastic and inelastic collisions
S: The coefficient of restitution e measures how bouncy a collision is: e = 1 for elastic, 0 for perfectly inelastic. Combined with momentum conservation it gives final velocities in 1D collisions.
H: Coefficient of restitution
E: e = (v_{2} − v_{1})/(u_{1} − u_{2}) :: separation speed / approach speed
E: h_{bounce} = e^{2}h_{drop} :: dropped ball on a fixed surface
H: 1D elastic collision formulas
E: v_{1} = [(m_{1} − m_{2})u_{1} + 2m_{2}u_{2}]/(m_{1} + m_{2})
E: v_{2} = [(m_{2} − m_{1})u_{2} + 2m_{1}u_{1}]/(m_{1} + m_{2})
- Equal masses, target at rest: they swap velocities (Newton's cradle).
- Heavy hits light at rest: light one leaves at ~2u.
- Light hits heavy: bounces back at ~u.
H: Glancing collisions
P: Two equal masses in an elastic glancing collision (one at rest) move off at 90° to each other: snooker players rely on this.
X: A tennis ball dropped from 2.0 m rebounds to 1.3 m. Find e.
> e = √(1.3/2.0) = 0.81
!: The kinetic energy that can be lost in a collision is only the part relative to the centre of mass, ½μ(u_{1} − u_{2})^{2} with μ = m_{1}m_{2}/(m_{1} + m_{2}); the centre-of-mass motion must carry on.
Q: What is the coefficient of restitution? | The ratio of relative speed of separation to relative speed of approach.
Q: What happens when equal masses collide elastically, one at rest? | They exchange velocities.
M1: A ball with e = 0.5 is dropped from 4 m. It rebounds to: | 1 m | 2 m | 0.5 m | 3 m | h = e^{2} × 4.
M2: A neutron collides elastically head-on with a stationary carbon-12 nucleus. What fraction of its speed does it keep? | 11/13 | 1/12 | 1/2 | 0 | v_{1} = (1 − 12)/(1 + 12) u: magnitude 11/13. This is why moderators use light nuclei.

## Centre of mass
S: The centre of mass is the mass-weighted average position of a system. It moves as if all the mass were concentrated there and all external forces acted on it, whatever happens internally.
H: Definition
E: R = Σm_{i}r_{i}/M or R = (1/M)∫r dm
E: MA_{cm} = ΣF_{ext}
- Uniform symmetric bodies: CM at the geometric centre.
- CM can lie outside the material (a ring, a boomerang, a high jumper's Fosbury flop).
- In a uniform gravitational field, CM = centre of gravity.
H: Stability
P: An object resting on a base is stable if a vertical line through its CM falls inside the base. Lowering the CM or widening the base increases stability (racing cars, wide-stance tripods).
X: Find the CM of a 2 kg mass at x = 0 and a 3 kg mass at x = 5 m.
> X = (0 + 15)/5 = 3 m
!: The centre of mass of a fragmenting projectile keeps following the original parabola, until a fragment hits the ground.
Q: How does the centre of mass of a system move? | As if all the mass were there and all external forces acted there.
Q: When is an object resting on a base stable? | When the vertical line through its centre of mass passes within its base.
M1: A uniform 4 m plank has a 20 kg child at one end; the plank is 10 kg. CM from that end? | 0.67 m | 2 m | 1 m | 1.33 m | (20 × 0 + 10 × 2)/30.
M2: A firework explodes mid-air. The CM of the fragments: | Continues on the original trajectory | Stops | Moves straight down | Moves upward | Only external forces (gravity) affect CM motion.

## Systems of particles
S: Treating many particles as a system, internal forces cancel in pairs, so the system's total momentum responds only to external forces. Energy and angular momentum can be split into motion of the centre of mass plus motion relative to it.
H: Key results
E: P = Σp_{i} = MV_{cm}; dP/dt = F_{ext}
E: KE = ½MV_{cm}^{2} + Σ½m_{i}v_{i}′^{2} :: KE of CM + KE relative to CM
E: L = R × MV_{cm} + L_{about cm}
- Internal forces can change internal energy (and KE) but not total momentum.
- The reduced mass μ = m_{1}m_{2}/(m_{1} + m_{2}) turns a two-body problem into one body.
X: Two skaters (60 kg and 40 kg) push apart from rest; the lighter moves at 3 m s^{-1}. Where's the CM afterwards, and what's the total KE?
> CM stays at rest
> v_{heavy} = 2 m s^{-1}; KE = ½(40)(9) + ½(60)(4) = 300 J from their muscles
H: Two-body problems
P: Earth and Moon orbit their common CM (about 4700 km from Earth's centre, inside the Earth). Exoplanets are found from the wobble of their star around the system's CM.
!: Kinetic energy isn't just ½MV_{cm}^{2}; the internal part (rotation, vibration, relative motion) can be most of it.
Q: What is the reduced mass of two bodies? | μ = m_{1}m_{2}/(m_{1} + m_{2}).
Q: Can internal forces change a system's total momentum? | No, only external forces can.
M1: A system's internal forces can change its: | Kinetic energy | Total momentum | Centre-of-mass velocity | Total mass | Explosions create KE without changing P.
M2: The Earth–Moon CM lies: | Inside the Earth, ~4700 km from its centre | At the Earth's centre | Halfway between them | At the Moon | Mass ratio ~81:1 over 384 000 km.

## Variable-mass systems
S: When a system gains or loses mass, as rockets, conveyor belts and raindrops do, F = ma isn't enough. Apply momentum conservation to everything including the mass being added or ejected.
H: The rocket equation
E: M dv/dt = u dm/dt (thrust = u × mass flow rate) :: u = exhaust speed relative to the rocket
E: Δv = u ln(m_{0}/m_{f}) :: Tsiolkovsky rocket equation
- To double Δv you must square the mass ratio: why rockets are mostly fuel and use stages.
- Thrust in space doesn't need anything to "push against".
H: Other examples
- Conveyor belt with sand dropped on: extra force F = v dm/dt needed to keep speed constant (and half the work goes into heating as the sand skids).
- Falling raindrop gathering mass, chains falling off tables.
X: A rocket with u = 3000 m s^{-1} burns from 100 t to 25 t. Find Δv (no gravity).
> Δv = 3000 ln 4 = 4160 m s^{-1}
!: F = d(mv)/dt = m dv/dt + v dm/dt only applies when the added or lost mass is at rest in your frame; in general, use momentum conservation directly.
Q: State the Tsiolkovsky rocket equation. | Δv = u ln(m_{0}/m_{f}).
Q: What is rocket thrust? | Exhaust speed (relative to the rocket) times mass flow rate.
M1: Rocket exhaust speed 2500 m s^{-1}, mass flow 400 kg s^{-1}. Thrust? | 1.0 MN | 10 kN | 6.25 kN | 100 kN | 2500 × 400.
M2: Why do rockets use stages? | Dropping empty tanks improves the mass ratio of later stages | Each stage burns faster | To reduce drag only | Engines can't run long | Less dead mass to accelerate.

## Motion under resistive forces
S: Real objects move against drag and friction, which depend on speed. Newton's second law then becomes a differential equation, and motion approaches a steady state rather than accelerating forever.
H: Linear drag (F = −bv)
E: m dv/dt = mg − bv ⇒ v = v_{t}(1 − e^{−t/τ}), v_{t} = mg/b, τ = m/b
- Horizontal motion with linear drag: v = v_{0}e^{−t/τ}, coasting distance v_{0}τ.
H: Quadratic drag (F = −cv^{2})
E: v(t) = v_{t} tanh(gt/v_{t}), v_{t} = √(mg/c) :: falling from rest
- Coasting: v = v_{0}/(1 + cv_{0}t/m); no finite stopping time.
- Projectiles with drag need numerical solution; trajectories become asymmetric.
X: A 10 μm water droplet falls in air (η = 1.8 × 10^{-5} Pa s). Find its terminal speed using linear (Stokes) drag.
> m = (4/3)π(10^{-5})^{3} × 1000 = 4.2 × 10^{-12} kg; b = 6πηr = 3.4 × 10^{-9} kg s^{-1}
> v_{t} = mg/b = 1.2 cm s^{-1}; τ = m/b = 1.2 ms
> Check: Re = ρ_{air}v(2r)/η ≈ 0.016 ≪ 1, so linear drag is right. That's why clouds float.
!: Assuming linear drag outside its regime can be wildly wrong; check the Reynolds number.
Q: What is the time constant for linear drag? | τ = m/b.
Q: Does a body coasting under quadratic drag ever stop? | Not in finite time in the ideal model; its speed falls as 1/t.
M1: With linear drag, after one time constant a falling object reaches: | 63% of terminal velocity | 37% | 100% | 50% | 1 − 1/e.
M2: Terminal velocity under quadratic drag scales with mass as: | √m | m | m^{2} | 1/m | v_{t} = √(mg/c).

## Terminal velocity
S: A falling object accelerates until drag equals its weight; then the net force is zero and it falls at constant terminal velocity. Size, shape, mass and the fluid's density and viscosity set its value.
H: Balance of forces
E: mg = ½ρC_{d}Av_{t}^{2} ⇒ v_{t} = √(2mg/(ρC_{d}A)) :: high Re
E: v_{t} = 2r^{2}(ρ_{s} − ρ_{f})g/(9η) :: Stokes (small sphere, low Re, with buoyancy)
- Skydiver belly-down: ~55 m s^{-1}; head-down: ~80 m s^{-1}; with parachute ~5 m s^{-1}.
- Large animals fall faster than small ones: v_{t} ∝ √(size) for similar shapes.
H: Millikan and viscometers
P: Millikan measured oil drops' terminal speeds to find their radii (Stokes' law), then balanced them with an electric field to find the charge: always a multiple of e. Falling-ball viscometers use the same law to measure η.
X: A steel ball (r = 1.0 mm, ρ = 7800 kg m^{-3}) falls in glycerol (ρ = 1260, η = 1.4 Pa s). Find v_{t}.
> v_{t} = 2 × 10^{-6} × 6540 × 9.8/(9 × 1.4) = 0.010 m s^{-1}
!: At terminal velocity the object still moves; it's the acceleration that's zero.
Q: What is the condition for terminal velocity? | Drag (plus buoyancy) balances weight, so the net force is zero.
Q: How did Millikan use terminal velocity? | Stokes' law gave each drop's radius and hence mass from its terminal speed.
M1: At terminal velocity, a skydiver's acceleration is: | Zero | g | g/2 | Increasing | Forces balance.
M2: Under Stokes' law, doubling a sphere's radius changes v_{t} by: | ×4 | ×2 | ×8 | ×√2 | v_{t} ∝ r^{2}.

## Equilibrium and statics
S: A body is in static equilibrium when it neither translates nor rotates: the net force and net torque on it are both zero. Statics underpins the design of bridges, buildings, cranes and the human skeleton.
H: Conditions
E: ΣF = 0 :: translational equilibrium (each component)
E: Στ = 0 about any point :: rotational equilibrium
- In 2D, that's three equations (Fx, Fy, torque), so up to three unknowns can be found.
- Take moments about the point where unknown forces act, to eliminate them.
- Three non-parallel forces in equilibrium must meet at a point.
H: Types of equilibrium
- **Stable**: displaced, it returns (potential minimum). **Unstable**: it moves further away (maximum). **Neutral**: it stays (flat).
X: A 4.0 m uniform beam (200 N) rests on supports at its ends. A 600 N person stands 1.0 m from the left end. Find the support forces.
> Moments about left: R_{R} × 4 = 600 × 1 + 200 × 2 ⇒ R_{R} = 250 N
> R_{L} = 800 − 250 = 550 N
!: Zero net force isn't enough: a couple (two equal, opposite, offset forces) has zero net force but makes things rotate.
Q: What are the two conditions for static equilibrium? | Zero net force and zero net torque.
Q: Why take moments about an unknown force's point of action? | Its moment is zero there, eliminating it from the equation.
M1: A uniform 2 m seesaw pivoted at its centre has a 30 kg child 0.8 m from the pivot. Where must a 40 kg child sit? | 0.6 m on the other side | 0.8 m | 1.07 m | 0.4 m | 30 × 0.8 = 40 × d.
M2: A ladder leaning on a smooth wall slips at the floor. Which force prevents slipping? | Friction at the floor | Friction at the wall | The weight | The normal force at the wall | The smooth wall exerts only a horizontal normal force.

## Mechanical advantage
S: Mechanical advantage (MA) is the ratio of the output force a machine delivers to the input force you apply. Machines trade force for distance; they can't create energy.
H: Definitions
E: MA = F_{out}/F_{in} :: actual (force) mechanical advantage
E: VR = d_{in}/d_{out} :: velocity ratio (ideal MA)
E: η = MA/VR :: efficiency
- An ideal, frictionless machine has MA = VR and η = 100%.
- Work in ≥ work out: F_{in}d_{in} ≥ F_{out}d_{out}.
H: Examples
- Lever: VR = effort arm/load arm.
- Pulley system with n supporting ropes: VR = n.
- Gear train: VR = ratio of teeth (driven/driver for torque gain).
- Hydraulic press: VR = A_{2}/A_{1}.
X: A 4-rope pulley system lifts 800 N with an effort of 250 N. Find MA and efficiency.
> MA = 800/250 = 3.2; VR = 4
> η = 3.2/4 = 80%
!: A large mechanical advantage means you move the effort through a large distance; the work is never less than the useful work out.
Q: What is velocity ratio? | Distance moved by the effort divided by distance moved by the load.
Q: How are MA, VR and efficiency related? | η = MA/VR.
M1: A lever has effort arm 1.5 m and load arm 0.3 m. Ideal MA? | 5 | 0.2 | 1.8 | 4.5 | 1.5/0.3.
M2: A hydraulic jack has pistons of area 2 cm^{2} and 100 cm^{2}. A 50 N push gives: | 2500 N | 50 N | 1 N | 5000 N | Pressure is equal: force scales with area ratio 50.

## Simple machines
S: The six classical simple machines (lever, wheel and axle, pulley, inclined plane, wedge, screw) all trade force against distance. Every complex machine is built from them.
H: The six
- **Lever**: rigid bar on a pivot. First class (pivot between: seesaw, crowbar), second (load between: wheelbarrow), third (effort between: tweezers, your forearm).
- **Wheel and axle**: VR = R/r (steering wheel, screwdriver).
- **Pulley**: fixed (changes direction), movable and block-and-tackle (VR = number of supporting ropes).
- **Inclined plane**: VR = length/height.
- **Wedge**: a moving inclined plane (axe, knife).
- **Screw**: an inclined plane wrapped around a cylinder; VR = 2πR/pitch, enormous for fine threads.
X: A car jack's screw has a 2 mm pitch, turned by a 0.25 m handle. Find VR.
> VR = 2π × 0.25/0.002 ≈ 785
> With 50% efficiency, a 20 N effort lifts ~7.9 kN
H: Friction as a feature
P: Screws and wedges usually have efficiency below 50%, which makes them self-locking: the load can't drive them backwards. That's why a car jack stays up when you let go.
!: Third-class levers (like your forearm, where the biceps attaches near the elbow) have MA < 1; they trade force for speed and range of movement.
Q: Name the six simple machines. | Lever, wheel and axle, pulley, inclined plane, wedge, screw.
Q: Why is a screw jack self-locking? | Its efficiency is below 50%, so friction prevents the load driving it backwards.
M1: A ramp is 6 m long and rises 1.5 m. Ideal MA? | 4 | 1.5 | 6 | 0.25 | Length/height.
M2: Your forearm is a lever of which class? | Third | First | Second | It's not a lever | The effort (biceps) is between the pivot (elbow) and the load (hand).
`;
