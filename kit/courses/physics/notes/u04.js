// Unit 4: Classical Mechanics. Format: kit/course/notes.js
export default `
## Position, displacement, distance and time
S: Position locates an object relative to an origin; displacement is the change in position (a vector); distance is the total path length travelled (a scalar). Kinematics describes motion in these terms before asking what causes it.
O: Distinguish distance from displacement and calculate each
O: Use a sign convention to describe one-dimensional positions and displacements
O: Interpret the gradient of a position–time graph
PRE: Scalar and vector quantities
LV: GCSE and A level · Foundation
H: Definitions
E: Δr = r_{2} − r_{1} :: displacement: depends only on start and end points
- Distance ≥ size of displacement; they are equal only for straight-line motion without reversing.
- Time is measured from a chosen zero; intervals Δt are what physics uses.
- A sign convention (e.g. right and up positive) turns 1D vectors into signed numbers.
H: Graphs
- Position–time graph: gradient = velocity.
- A horizontal line means at rest; a curve means changing velocity.
P: In two dimensions, combine perpendicular displacements with Pythagoras and give a direction (an angle or a bearing); distance just adds the lengths of each leg.
X: A runner completes one lap of a 400 m track in 80 s.
> Distance = 400 m; displacement = 0 (same start and end)
> Average speed = 5 m s^{-1}; average velocity = 0
K: Displacement is a vector from start to finish; distance is the scalar length of the actual path.
!: Displacement can be zero or negative even when an object has moved a long way.
T: Displacement | The change in position, a vector from the start point to the end point
T: Distance | The total length of the path travelled, a scalar
SUM: Displacement depends only on start and end; distance counts the whole path.
SUM: With a sign convention, 1D displacements are signed numbers; the gradient of x–t is velocity.
EV: established | Displacement and distance are standard kinematic definitions
SRC: OpenStax, University Physics Volume 1, section 3.1 "Position, Displacement, and Average Velocity" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/3-1-position-displacement-and-average-velocity
SRC: AQA, A-level Physics specification (7408), section 3.4.1.3, Motion along a straight line | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What is the difference between distance and displacement? | Distance is total path length (scalar); displacement is the straight-line change in position with direction (vector).
Q: What does the gradient of a position–time graph give? | Velocity.
M1@1: A car drives 3 km east then 4 km north. What is the size of its displacement? | 5 km | 7 km | 1 km | 12 km | √(3^{2} + 4^{2}) = 5 km, at 53° north of east; the distance travelled is 7 km.
M2@2: An object moves from x = +4 m to x = −2 m. Its displacement is: | −6 m | 6 m | 2 m | −2 m | Δx = x_{final} − x_{initial} = −2 − 4 = −6 m: 6 m in the negative direction.
NUM1@1: A ball is thrown 5.0 m straight up and caught at the same height. What is the distance it travels, in metres? | 10 | 0 | m | It goes up 5.0 m and down 5.0 m: distance 10 m, while the displacement is zero.
M3@2,3: An x–t graph rises steeply, flattens, then falls back to x = 0. Which describes the motion? | Moves away fast, stops, returns to the start | Speeds up, then slows down, never reversing | Moves at constant velocity throughout | Falls freely, then bounces to rest | Positive gradient means moving away, zero gradient means at rest, negative gradient means returning.
SA1@1,2: A dog runs 30 m east, then 50 m west. Find the distance and displacement, and explain why they differ. | Distance = 30 + 50 = 80 m. Taking east as positive, displacement = +30 − 50 = −20 m, i.e. 20 m west. Distance counts every metre of the path and is a scalar; displacement only compares start and end positions and has a direction, so reversing makes them differ. | Distance 80 m ; Displacement 20 m west with sign convention ; Scalar versus vector ; Reversal explains the difference

## Speed and velocity
S: Speed is the rate of change of distance; velocity is the rate of change of displacement, with direction. Instantaneous velocity is the derivative of position, and it is always tangent to the path.
O: Calculate average speed and average velocity for a journey
O: Define instantaneous velocity as the gradient of a position–time graph
O: Explain why constant speed need not mean constant velocity
PRE: Position, displacement, distance and time
LV: GCSE and A level · Foundation
H: Definitions
E: v̄ = Δr/Δt :: average velocity
E: v = dr/dt :: instantaneous velocity
E: speed = magnitude of v
- Average speed = total distance / total time; it is not in general the size of the average velocity.
- Velocity changes if either speed or direction changes: uniform circular motion has constant speed but changing velocity.
H: Average speeds over legs
P: For equal distances at speeds v_{1} and v_{2}, the average is the harmonic mean 2v_{1}v_{2}/(v_{1} + v_{2}), not the arithmetic mean: you spend longer at the lower speed.
X: A cyclist rides 10 km at 20 km h^{-1} and returns at 30 km h^{-1}. Average speed?
> Times: 0.5 h and 0.333 h; total 0.833 h for 20 km
> Average speed = 24 km h^{-1}, not 25
K: Instantaneous velocity is the gradient of the tangent to the x–t graph at that moment.
!: Speedometers show speed, not velocity: a car going round a bend at a steady 50 km h^{-1} is accelerating.
T: Velocity | The rate of change of displacement, a vector
T: Speed | The rate of change of distance, a scalar
T: Instantaneous velocity | The velocity at one moment, v = dr/dt
SUM: Average velocity = displacement/time; average speed = distance/time.
SUM: Instantaneous velocity is the tangent gradient on an x–t graph; for equal distances average speed is the harmonic mean.
EV: established | These are the standard definitions of speed and velocity
SRC: OpenStax, University Physics Volume 1, section 3.2 "Instantaneous Velocity and Speed" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/3-2-instantaneous-velocity-and-speed
SRC: AQA, A-level Physics specification (7408), section 3.4.1.3, Motion along a straight line | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: How is instantaneous velocity defined? | v = dr/dt, the derivative of position with respect to time.
Q: Can an object have constant speed but changing velocity? | Yes: in circular motion the direction changes.
M1@3: Which of these motion quantities is a vector? | Velocity | Speed | Distance | Time | Velocity has both magnitude and direction; speed, distance and time are scalars.
M2@1: The average speed for equal distances at 40 and 60 km h^{-1} is: | 48 km h^{-1} | 50 km h^{-1} | 45 km h^{-1} | 52 km h^{-1} | Harmonic mean: 2 × 40 × 60/(40 + 60) = 4800/100 = 48 km h^{-1}.
NUM2@2: Position is x = 3t^{2} m. What is the instantaneous velocity at t = 2.0 s, in m s^{-1}? | 12 | 0.1 | m s^{-1} | v = dx/dt = 6t = 6 × 2.0 = 12 m s^{-1}.
M3@1: A walker goes 400 m north in 200 s, then 300 m east in 300 s. What is her average velocity? | 1.0 m s^{-1} | 1.4 m s^{-1} | 0.7 m s^{-1} | 2.0 m s^{-1} | Displacement = √(400^{2} + 300^{2}) = 500 m in 500 s, so 1.0 m s^{-1}; her average speed is 700/500 = 1.4 m s^{-1}.
SA2@1,3: Explain why a car travelling round a roundabout at a steady 30 km h^{-1} has a changing velocity, and how its average speed and average velocity differ after one full lap. | Velocity is a vector; going round, its direction changes continuously even though its size stays 30 km h^{-1}, so velocity changes and the car accelerates towards the centre. After a full lap the displacement is zero, so average velocity is zero, but the average speed is still 30 km h^{-1} because distance is the full circumference. | Velocity is a vector ; Direction changes so velocity changes ; Average velocity zero after a lap ; Average speed equals 30 km per hour

## Acceleration
S: Acceleration is the rate of change of velocity. It can change an object's speed, its direction, or both, and by Newton's second law it is always caused by a net force.
O: Calculate acceleration from changes in velocity, including vector changes
O: Interpret gradients and areas of velocity–time graphs
O: Distinguish tangential and centripetal components of acceleration
PRE: Speed and velocity
LV: GCSE and A level · Foundation
H: Definitions
E: a = dv/dt = d^{2}r/dt^{2}
- Velocity–time graph: gradient = acceleration; area = displacement.
- In 2D, acceleration has tangential (changes speed) and normal (changes direction) components: a_{t} = dv/dt, a_{n} = v^{2}/r.
- Deceleration usually means acceleration opposite to velocity, not simply negative acceleration.
H: Typical sizes
- g = 9.81 m s^{-2}; sports car 0–100 km h^{-1} in 3 s ≈ 9 m s^{-2}; fighter pilots tolerate about 9g briefly; car crashes reach about 50–100g.
X: A car slows from 30 m s^{-1} to rest in 5.0 s. Find its acceleration.
> a = (0 − 30)/5.0 = −6.0 m s^{-2}
> Magnitude 6.0 m s^{-2}, opposite to the motion (about 0.6g)
K: Acceleration measures how fast velocity changes, in size or direction.
!: Zero velocity doesn't mean zero acceleration: a ball at the top of its flight has v = 0 but a = g downward.
T: Acceleration | The rate of change of velocity, a vector, in m s^{-2}
T: Deceleration | Acceleration directed opposite to the velocity, so the speed falls
SUM: a = Δv/Δt; on a v–t graph the gradient is a and the area is displacement.
SUM: Tangential acceleration changes speed; centripetal acceleration v^{2}/r changes direction.
EV: established | Acceleration as the derivative of velocity is the standard kinematic definition
SRC: OpenStax, University Physics Volume 1, section 3.3 "Average and Instantaneous Acceleration" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/3-3-average-and-instantaneous-acceleration
SRC: AQA, A-level Physics specification (7408), section 3.4.1.3, Motion along a straight line | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What does the area under a velocity–time graph represent? | Displacement.
Q: What are the tangential and normal components of acceleration? | Tangential dv/dt changes speed; normal v^{2}/r changes direction.
M1@1: At the top of a vertical throw, the ball's acceleration is: | 9.8 m s^{-2} downward | Zero | 9.8 m s^{-2} upward | Undefined | Gravity still acts at the top, so the acceleration is g downward even though v = 0 for an instant.
M2@1,3: An object's velocity changes from (3, 0) to (0, 4) m s^{-1} in 2 s. Average acceleration magnitude? | 2.5 m s^{-2} | 0.5 m s^{-2} | 3.5 m s^{-2} | 1 m s^{-2} | Δv = (−3, 4) m s^{-1}, of size 5 m s^{-1}; dividing by 2 s gives 2.5 m s^{-2}.
NUM1@1: A train speeds up from 12 m s^{-1} to 20 m s^{-1} in 16 s. What is its acceleration, in m s^{-2}? | 0.5 | 0.01 | m s^{-2} | a = Δv/Δt = (20 − 12)/16 = 0.50 m s^{-2}.
M3@2: A v–t graph is a straight line from 10 m s^{-1} down to −10 m s^{-1} over 4 s. What is the displacement over the 4 s? | 0 m | 20 m | 40 m | −20 m | The positive area (first 2 s) and negative area (last 2 s) are equal, so displacement is zero though the distance is 20 m.
SA2@1,2: A ball is thrown straight up and caught. Sketch in words the velocity–time graph and explain what its gradient and area show. | Taking up as positive, v starts positive and falls in a straight line through zero at the top to an equal negative value when caught. The constant negative gradient is the acceleration, −g, throughout, including at the top. The area above the axis equals the area below, so the total displacement is zero, while their sum is the distance travelled. | Straight line from +u to −u ; Gradient is −g throughout ; Zero velocity at top but a not zero ; Areas cancel for displacement

## Motion in one dimension
S: Straight-line motion is described by signed position, velocity and acceleration along one axis. With calculus you can get any of x(t), v(t), a(t) from another, and graphs make the relationships visible.
O: Differentiate and integrate to move between x(t), v(t) and a(t)
O: Find when an object reverses and calculate distance as well as displacement
O: Use a = v dv/dx when acceleration depends on position
PRE: Differentiation
LV: Year 1 · Application
H: Calculus links
E: v = dx/dt, a = dv/dt; x = x_{0} + ∫v dt, v = v_{0} + ∫a dt
E: a = v dv/dx :: useful when acceleration depends on position
H: Reading graphs
- x–t: gradient = v. v–t: gradient = a, area = Δx. a–t: area = Δv.
- Where the v–t graph crosses zero, the object reverses.
- Displacement is the signed area; distance is the total unsigned area.
X: v(t) = 6 − 2t m s^{-1} from t = 0 to 5 s. Find the displacement and distance.
> x(t) = 6t − t^{2}; displacement at 5 s = 30 − 25 = 5 m
> Reverses at t = 3 s (x = 9 m), then back to 5 m: distance = 9 + 4 = 13 m
K: Differentiate to go from x to v to a; integrate, adding the initial value, to go back.
!: Area under the time axis on a v–t graph is negative displacement; add magnitudes only when you want distance.
P: When acceleration isn't constant (springs, drag), the suvat equations fail and these calculus relations are the tools to use.
T: Kinematics | The description of motion without reference to its causes
T: Signed area | Area counted positive above the time axis and negative below it
SUM: v = dx/dt and a = dv/dt; integrate with initial conditions to go back.
SUM: Split the motion where v = 0 to find distance; a = v dv/dx handles position-dependent forces.
EV: established | The calculus relations between position, velocity and acceleration are exact
SRC: OpenStax, University Physics Volume 1, section 3.6 "Finding Velocity and Displacement from Acceleration" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/3-6-finding-velocity-and-displacement-from-acceleration
SRC: OpenStax, College Physics 2e, section 2.8 "Graphical Analysis of One-Dimensional Motion" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/2-8-graphical-analysis-of-one-dimensional-motion
Q: When is a = v dv/dx useful? | When acceleration is given as a function of position rather than time.
Q: How do you find when an object reverses direction? | Find when v = 0 (and changes sign).
M1@1: The area under an acceleration–time graph gives: | Change in velocity | Displacement | Speed | Jerk | Integrating a over time gives Δv, the change in velocity over the interval.
M2@2: x = t^{3} − 3t. When is the object momentarily at rest? | t = 1 s | t = 0 | t = 3 s | t = √3 s | v = dx/dt = 3t^{2} − 3, which is zero at t = 1 s (for t > 0).
NUM2@1: An object starts from rest at the origin with a = 6t m s^{-2}. What is its position at t = 2.0 s, in metres? | 8 | 0.1 | m | v = 3t^{2} and x = t^{3}, so x(2) = 8 m.
M3@2: v(t) = 4 − 2t m s^{-1} for 0–4 s. What distance is travelled? | 8 m | 0 m | 4 m | 16 m | It moves +4 m until reversing at t = 2 s, then −4 m back: displacement 0, distance 8 m.
SA3@1,3: A particle's acceleration is a = −kx (k > 0). Use a = v dv/dx to find how its speed depends on position if it has speed v_{0} at x = 0. | Write v dv/dx = −kx and integrate: ∫v dv = −k∫x dx, giving ½v^{2} = ½v_{0}^{2} − ½kx^{2}, so v = √(v_{0}^{2} − kx^{2}). The speed is greatest at x = 0 and the particle stops at x = ±v_{0}/√k, which is simple harmonic motion. | Uses v dv/dx form ; Separates and integrates ; Correct result for v ; Interprets turning points

## Motion in two and three dimensions
S: In two and three dimensions position, velocity and acceleration are vectors. The key insight is that perpendicular components evolve independently, so a 2D problem is two 1D problems linked by time.
O: Differentiate a position vector to find velocity and acceleration
O: Treat perpendicular components of motion independently, linked by time
O: Describe the direction of acceleration on a curved path
PRE: Motion in one dimension
LV: A level · Application
H: Vector kinematics
E: r(t) = x(t)i + y(t)j + z(t)k; v = dr/dt; a = dv/dt
- Each component obeys its own 1D equations; they share the same t.
- Velocity is tangent to the trajectory; acceleration points towards the inside of a curve (plus any speeding up).
H: Examples
- Projectile: constant a = (0, −g); a parabola.
- Uniform circular motion: constant speed, a = v^{2}/r towards the centre.
- Helical motion of a charge in a magnetic field: circular in the plane perpendicular to B, uniform along B.
X: r(t) = (3t, 4t − 5t^{2}) m. Find v and a at t = 1 s.
> v = (3, 4 − 10t) = (3, −6) m s^{-1}, speed 6.7 m s^{-1}
> a = (0, −10) m s^{-2}: constant, like a projectile
K: Split vectors into perpendicular components, solve each as a 1D problem, and link them through the shared time.
!: You can't add speeds in different directions as numbers; add velocity vectors component by component.
P: **Investigate with the lab.** Watch the velocity arrows during a drag-free flight: the horizontal part stays constant while the vertical part changes steadily. Then compare a throw on Earth with the same throw on the Moon.
IX: projectile
T: Position vector | A vector r from the origin to the object's position
T: Component | The part of a vector along one chosen axis
SUM: Differentiate r(t) component by component to get v and a.
SUM: Perpendicular components are independent, sharing only time; acceleration on a curve points inwards.
EV: established | Independence of perpendicular components follows from vector form of Newton's laws
SRC: OpenStax, University Physics Volume 1, section 4.1 "Displacement and Velocity Vectors" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/4-1-displacement-and-velocity-vectors
SRC: OpenStax, University Physics Volume 1, section 4.2 "Acceleration Vector" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/4-2-acceleration-vector
Q: Why can perpendicular components of motion be treated separately? | They obey independent equations of motion linked only by time.
Q: Which way does acceleration point on a curved path at constant speed? | Towards the centre of curvature, perpendicular to the velocity.
M1@1: r(t) = (2t^{2}, 3t). What is the acceleration? | (4, 0) | (4t, 3) | (2, 3) | (0, 0) | Differentiate twice: v = (4t, 3), then a = (4, 0).
M2@3: A particle moves in a circle at constant speed. Which is true? | Velocity changes, speed doesn't | Velocity is constant | Acceleration is zero | Acceleration is tangential | The direction of velocity keeps changing, so there is an acceleration towards the centre, while the speed stays fixed.
M2@2: In drag-free projectile motion, which part of the velocity stays constant? | The horizontal component | The vertical component | The speed | Both components | Gravity acts only vertically, so with no air resistance nothing changes the horizontal velocity.
NUM2@1: r(t) = (2t, t^{2}) m. What is the speed at t = 2.0 s, in m s^{-1}? | 4.5 | 0.1 | m s^{-1} | v = (2, 2t) = (2, 4) m s^{-1}; speed = √(4 + 16) = 4.47 m s^{-1}.
M3@2,3: A boat moves north at 3 m s^{-1} while accelerating east at 1 m s^{-2} from zero east speed. What is its speed after 4 s? | 5 m s^{-1} | 7 m s^{-1} | 3 m s^{-1} | 4 m s^{-1} | The components are independent: north 3, east 1 × 4 = 4 m s^{-1}; speed = √(9 + 16) = 5 m s^{-1}.
SA2@2,3: Explain, using components, why a ball rolled off a table and a ball dropped at the same moment from the same height land together. | Vertically both start with zero velocity and have the same acceleration g, so their vertical positions are identical at every instant and they reach the floor at the same time. The rolled ball's horizontal velocity is constant and independent of the vertical motion; it only changes where the ball lands, not when. | Vertical motions identical ; Same initial vertical velocity and acceleration ; Horizontal motion independent ; Affects landing point not time

## Kinematic equations
S: For constant acceleration, five quantities (s, u, v, a, t) are linked by the suvat equations. Each equation leaves out one quantity, so pick the one missing the variable you neither know nor need.
O: Select and apply the appropriate constant-acceleration equation
O: Derive the suvat equations from constant acceleration
O: Recognise when the equations don't apply
PRE: Acceleration
LV: GCSE and A level · Application
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
K: List what you know and what you want; the equation missing the remaining quantity solves the problem in one step.
!: Don't use suvat for non-constant acceleration (drag, springs): use calculus or energy instead.
P: **Investigate with the lab.** With air resistance off, launch horizontally from a height and time the flight. Check the time against h = ½gt² for the vertical motion alone.
IX: projectile
T: Uniform acceleration | Acceleration that is constant in size and direction
T: suvat equations | The five equations linking s, u, v, a and t for uniform acceleration
SUM: Five equations, each missing one of s, u, v, a, t; valid only for constant acceleration.
SUM: Choose a positive direction, sign every vector, and interpret both roots of a quadratic.
EV: established | The suvat equations follow exactly from constant acceleration
SRC: OpenStax, University Physics Volume 1, section 3.4 "Motion with Constant Acceleration" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/3-4-motion-with-constant-acceleration
SRC: AQA, A-level Physics specification (7408), section 3.4.1.3, Motion along a straight line | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: Which suvat equation has no time? | v^{2} = u^{2} + 2as.
Q: When are the suvat equations valid? | Only for constant acceleration.
M1@1: A stone dropped from rest falls for 3.0 s (g = 9.8). How far? | 44 m | 29 m | 88 m | 15 m | s = ut + ½at^{2} = 0 + ½ × 9.8 × 3.0^{2} = 44.1 m.
M2@1: Stopping distance at speed u with fixed deceleration scales as: | u^{2} | u | √u | u^{3} | From v^{2} = u^{2} + 2as with v = 0, s = u^{2}/(2a): double the speed, four times the distance.
M2@1: A ball is thrown horizontally from a 20 m cliff (g = 9.8 m/s²). Roughly how long is it in the air? | About 2.0 s | About 4.1 s | About 1.0 s | It depends on the throwing speed | Vertical motion is independent: t = √(2h/g) = √(40/9.8) ≈ 2.0 s.
NUM2@1: A ball is thrown upwards at 15 m s^{-1} (g = 9.8 m s^{-2}). How high does it rise, in metres? | 11.5 | 0.1 | m | At the top v = 0: s = u^{2}/(2g) = 225/19.6 = 11.5 m.
M3@1,3: A ball thrown up at 10 m s^{-1} from a 15 m high roof (g = 10). When does it hit the ground? | 3 s | 1 s | 2 s | 1.5 s | Up positive: −15 = 10t − 5t^{2}, so t^{2} − 2t − 3 = 0, t = 3 s (the root t = −1 s is unphysical).
SA2@2,3: Derive v^{2} = u^{2} + 2as from v = u + at and s = ½(u + v)t, and state when it may be used. | From v = u + at, t = (v − u)/a. Substitute into s = ½(u + v)t: s = (u + v)(v − u)/(2a) = (v^{2} − u^{2})/(2a), so v^{2} = u^{2} + 2as. It applies only when the acceleration is constant, in straight-line motion with consistent signs. | Eliminate t ; Correct algebra ; Final result ; Condition of constant acceleration

## Projectile motion
S: A projectile moves under gravity alone: constant velocity horizontally and constant acceleration g vertically. The path is a parabola, and range, height and time of flight all follow from separating the components.
O: Resolve a launch velocity and solve horizontal and vertical motion separately
O: Calculate time of flight, maximum height and range
O: Describe qualitatively how air resistance changes a trajectory
PRE: Kinematic equations
LV: GCSE and A level · Application
H: Results (launch speed u at angle θ, level ground, no drag)
E: x = u cos θ t; y = u sin θ t − ½gt^{2}
E: T = 2u sin θ/g :: time of flight
E: H = u^{2}sin^{2}θ/(2g) :: maximum height
E: R = u^{2}sin 2θ/g :: range: maximum at θ = 45°
E: y = x tan θ − gx^{2}/(2u^{2}cos^{2}θ) :: the parabolic path
- Complementary angles (30° and 60°) give the same range.
- At the top, v is horizontal: u cos θ.
H: With air resistance
P: Drag shortens range and height, makes the descent steeper than the ascent, and lowers the best launch angle below 45°. Spinning balls also feel lift: backspin keeps a golf ball up, so drives are launched at much lower angles.
X: A ball is kicked at 20 m s^{-1} at 30° (g = 9.8). Find its range and maximum height.
> R = 400 × sin 60°/9.8 = 35 m
> H = 400 × 0.25/19.6 = 5.1 m
K: Horizontally, constant velocity; vertically, constant acceleration g; time links the two.
!: The horizontal velocity doesn't change during flight (no drag); only the vertical component is affected by g.
P: **Investigate with the lab.** Turn air resistance off and launch at several angles at the same speed. Find the angle that gives the greatest range, then check that 30° and 60° land in the same place.
IX: projectile
T: Projectile | An object moving under gravity alone after launch
T: Range | The horizontal distance travelled before returning to the launch height
T: Time of flight | The time a projectile spends in the air
SUM: Resolve u into u cos θ and u sin θ; use suvat vertically and distance = speed × time horizontally.
SUM: On level ground with no drag the range peaks at 45°; drag lowers range, height and the best angle.
EV: established | Drag-free projectile motion is an exact consequence of uniform gravity
SRC: OpenStax, University Physics Volume 1, section 4.3 "Projectile Motion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/4-3-projectile-motion
SRC: AQA, A-level Physics specification (7408), section 3.4.1.4, Projectile motion | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What angle gives maximum range on level ground (no drag)? | 45°.
Q: What is the velocity at the top of the trajectory? | Horizontal, equal to u cos θ.
M1@1: A ball rolls off a 1.25 m high table at 2.0 m s^{-1} (g = 10). How far from the table does it land? | 1.0 m | 0.5 m | 2.0 m | 2.5 m | Fall time t = √(2h/g) = √0.25 = 0.5 s; horizontal distance = 2.0 × 0.5 = 1.0 m.
M2@2: Two projectiles are launched at the same speed at 20° and 70°. Which lands farther? | Same range | 20° | 70° | Depends on mass | R ∝ sin 2θ and sin 40° = sin 140°, so complementary angles give equal ranges.
M3@1: A monkey drops from a branch at the instant a dart is fired straight at it. The dart: | Hits the monkey (both fall the same distance in the same time) | Passes above the monkey's head | Passes below the monkey's feet | Hits only if it is fired at 45° | Gravity makes both fall the same distance below their straight-line paths in the same time, so the aim stays true.
M2@2: Without air resistance, which pair of launch angles gives the same range at the same speed? | 30° and 60° | 30° and 45° | 20° and 40° | 45° and 90° | Range depends on sin 2θ, and sin 60° = sin 120°, so complementary angles give equal ranges.
NUM2@2: A ball is launched at 25 m s^{-1} at 53° (sin 53° = 0.80, g = 10). What is its time of flight on level ground, in seconds? | 4 | 0.05 | s | Vertical component 25 × 0.80 = 20 m s^{-1}; T = 2u sin θ/g = 40/10 = 4.0 s.
SA2@1,3: A shot-putter wants maximum range. Explain why the ideal angle in drag-free theory is 45° and give reasons why the best real angle is lower. | With no drag and launch and landing at the same height, R = u^{2}sin 2θ/g, which is greatest when 2θ = 90°, so θ = 45°. In reality the shot is released above the ground, which favours a flatter launch; athletes can also throw faster at lower angles; and drag slightly reduces long, high flights. So the best angle is below 45°, typically under 40°. | Range formula and maximum at 45 degrees ; Release height lowers optimum ; Speed depends on angle for a person ; Drag reduces range of high flights

## Relative motion
S: Velocities are measured relative to a frame. The velocity of A relative to C equals A relative to B plus B relative to C: the Galilean addition rule, valid when speeds are much less than c.
O: Apply Galilean velocity addition in one and two dimensions
O: Solve river-crossing and crosswind problems
O: State the limits of Galilean addition
PRE: Motion in two and three dimensions
LV: A level · Application
H: The rule
E: v_{AC} = v_{AB} + v_{BC}; v_{AB} = −v_{BA}
- Relative velocity of A seen from B: v_{A} − v_{B}.
- Accelerations are the same in all frames moving at constant velocity relative to each other.
H: Classic problems
- **River crossing**: aim upstream so the resultant is straight across: sin θ = v_{river}/v_{boat}.
- **Aircraft in wind**: heading versus track.
- **Closest approach**: work in the frame of one object; the other moves in a straight line.
X: A swimmer (1.5 m s^{-1} in still water) crosses a 60 m river flowing at 0.9 m s^{-1}. Aiming straight across, where does she land, and how long does it take?
> Time = 60/1.5 = 40 s (the current doesn't change the across-component)
> Drift = 0.9 × 40 = 36 m downstream
K: Velocities add as vectors: velocity relative to the ground = velocity relative to the medium + velocity of the medium.
!: Galilean addition fails near c: no object can be seen moving faster than light. Use relativistic velocity addition there.
T: Relative velocity | The velocity of one object as measured by an observer moving with another
T: Galilean velocity addition | The rule v_{AC} = v_{AB} + v_{BC}, valid at speeds much less than c
SUM: Relative velocities add as vectors; v_{AB} = v_{A} − v_{B}.
SUM: Aim straight across for the shortest time, upstream for the shortest path.
EV: established | Galilean addition is accurate at everyday speeds; relativity corrects it near c
SRC: OpenStax, University Physics Volume 1, section 4.5 "Relative Motion in One and Two Dimensions" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/4-5-relative-motion-in-one-and-two-dimensions
SRC: OpenStax, College Physics 2e, section 3.5 "Addition of Velocities" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/3-5-addition-of-velocities
Q: State the Galilean velocity addition rule. | v_{AC} = v_{AB} + v_{BC}.
Q: To cross a river in the shortest time, which way should you aim? | Straight across (perpendicular to the bank).
M1@1: Two cars approach each other at 20 and 30 m s^{-1}. Their relative speed is: | 50 m s^{-1} | 10 m s^{-1} | 25 m s^{-1} | 600 m s^{-1} | Moving in opposite directions, v_{A} − v_{B} = 20 − (−30) = 50 m s^{-1}.
M2@2: A plane flies at 200 m s^{-1} relative to air in a 50 m s^{-1} crosswind. Its ground speed (heading perpendicular to wind) is: | 206 m s^{-1} | 250 m s^{-1} | 150 m s^{-1} | 200 m s^{-1} | The velocities are perpendicular: √(200^{2} + 50^{2}) = 206 m s^{-1}.
NUM3@2: A boat moves at 2.0 m s^{-1} through water in a river flowing at 1.0 m s^{-1}. At what angle upstream from straight across must it aim to land directly opposite, in degrees? | 30 | 1 | ° | sin θ = v_{river}/v_{boat} = 1.0/2.0 = 0.5, so θ = 30° upstream.
M3@1,3: Rain falls vertically at 8 m s^{-1}. A cyclist rides at 6 m s^{-1}. What speed does the rain have relative to her? | 10 m s^{-1} | 14 m s^{-1} | 2 m s^{-1} | 8 m s^{-1} | v_{rain,cyclist} = v_{rain} − v_{cyclist}: perpendicular components 8 and 6, so √(64 + 36) = 10 m s^{-1}, slanting towards her.
SA2@1,2: A pilot wants to fly due north at an airspeed of 100 m s^{-1} with a 30 m s^{-1} wind blowing from the west. Explain how she must head and find her ground speed. | Ground velocity = air velocity + wind velocity. The wind pushes east, so she must head west of north so that her westward component cancels the 30 m s^{-1} wind: sin θ = 30/100, θ ≈ 17° west of north. Her northward ground speed is then √(100^{2} − 30^{2}) ≈ 95 m s^{-1}. | Vector addition of air and wind velocities ; Head into the wind, west of north ; Angle from sine ratio ; Ground speed about 95 m per second

## Reference frames
S: A reference frame is a viewpoint with its own clocks and rulers from which motion is measured. Choosing a convenient frame (the centre of mass, a moving train, a rotating Earth) can make a problem far simpler, as long as you account correctly for the frame's own motion.
O: Distinguish inertial, non-inertial, lab and centre-of-mass frames
O: Transform positions and velocities between frames with the Galilean transformation
O: Solve a collision by working in the centre-of-mass frame
PRE: Relative motion
LV: A level · Physical reasoning
H: Kinds of frame
- **Inertial**: not accelerating; Newton's first law holds.
- **Non-inertial**: accelerating or rotating; fictitious forces appear.
- **Centre-of-mass frame**: total momentum zero; the natural frame for collisions.
- **Lab frame**: where the apparatus is at rest.
H: Galilean relativity
E: x' = x − Vt, y' = y, z' = z, t' = t :: frame S' moving at V along x
P: The laws of mechanics are the same in all inertial frames: no mechanical experiment inside a smoothly moving train can tell you its speed. Einstein extended this to all of physics, including light, which forced the Lorentz transformations.
X: In the centre-of-mass frame, analyse a 2 kg ball at 3 m s^{-1} hitting a stationary 1 kg ball elastically.
> v_{cm} = (2 × 3)/3 = 2 m s^{-1}
> In the CM frame the balls approach at +1 and −2 m s^{-1}; in an elastic collision they simply reverse
> Back in the lab: v_{1} = 2 − 1 = 1 m s^{-1}, v_{2} = 2 + 2 = 4 m s^{-1}
K: Velocities depend on the frame; accelerations, forces and the laws of mechanics are the same in every inertial frame.
!: Energies are frame-dependent (kinetic energy differs between frames), but energy conservation holds in each inertial frame.
T: Reference frame | A coordinate system with clocks and rulers from which positions and times are measured
T: Inertial frame | A frame that is not accelerating, in which Newton's first law holds
T: Centre-of-mass frame | The frame moving with the centre of mass, in which total momentum is zero
SUM: Galilean transformation: x' = x − Vt, v' = v − V, a' = a.
SUM: Pick the frame that simplifies the problem, often the centre-of-mass frame for collisions.
EV: established | Galilean relativity holds for mechanics at speeds much less than c
SRC: OpenStax, University Physics Volume 1, section 4.5 "Relative Motion in One and Two Dimensions" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/4-5-relative-motion-in-one-and-two-dimensions
SRC: OpenStax, University Physics Volume 1, section 5.2 "Newton's First Law" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/5-2-newtons-first-law
Q: What is the Galilean principle of relativity? | The laws of mechanics are the same in every inertial frame.
Q: Why is the centre-of-mass frame useful for collisions? | Total momentum is zero there, so the analysis is symmetric and simple.
M1@2: Which quantity is the same in all inertial frames (Galilean)? | Acceleration | Velocity | Kinetic energy | Momentum | A constant relative velocity V subtracts the same amount from every velocity, so changes in velocity, and hence accelerations, are unchanged.
M2@1: A ball dropped in a train moving at constant velocity lands: | Directly below the release point (in the train's frame) | Behind the release point | In front of the release point | It depends on the train's speed | The train is an inertial frame, so the ball falls just as it would in a stationary room.
NUM2@2: A train moves at 30 m s^{-1}; a passenger walks towards the front at 1.5 m s^{-1}. What is her speed relative to the ground, in m s^{-1}? | 31.5 | 0.1 | m s^{-1} | Galilean addition: v_{ground} = v_{train} + v_{passenger} = 30 + 1.5 = 31.5 m s^{-1}.
M3@2,3: A 4.0 kg cart at 6.0 m s^{-1} approaches a stationary 2.0 kg cart. What is the velocity of the centre of mass? | 4.0 m s^{-1} | 6.0 m s^{-1} | 3.0 m s^{-1} | 2.0 m s^{-1} | v_{cm} = total momentum/total mass = (4.0 × 6.0)/6.0 = 4.0 m s^{-1}, unchanged by the collision.
SA3@1,3: Explain why an elastic collision is easy to analyse in the centre-of-mass frame, and outline the steps. | In the centre-of-mass frame the total momentum is zero, so the two bodies approach with equal and opposite momenta. In an elastic head-on collision kinetic energy is also conserved, which is only possible if each simply reverses its velocity. So: find v_{cm}, subtract it from each velocity, reverse both, then add v_{cm} back to return to the lab frame. | Total momentum zero in CM frame ; Elastic means velocities reverse ; Transform into and out of the frame ; Steps stated in order

## Newton's laws of motion
S: Newton's three laws connect force and motion. They say what force does (changes momentum), give a quantitative rule (F = dp/dt), and insist that forces come in equal and opposite pairs between objects.
O: State Newton's three laws and identify third-law pairs
O: Apply ΣF = ma to single and connected bodies
O: Explain motion using the forces on each separate body
PRE: Acceleration
LV: GCSE and A level · Foundation
H: The laws
- **First**: an object stays at rest or moves with constant velocity unless a net external force acts. (This defines inertial frames.)
- **Second**: F_{net} = dp/dt, which is ma for constant mass.
- **Third**: if A exerts a force on B, B exerts an equal and opposite force on A, of the same type, along the same line.
E: ΣF = ma :: vector equation; apply to each component separately
H: Using the second law
- Isolate one body; draw all the forces on it (free-body diagram).
- Choose axes (one along the acceleration); write ΣF = ma per axis.
- For connected bodies, use one equation per body plus a constraint (same acceleration if the string is taut).
X: A 2.0 kg block is pulled by a 10 N horizontal force on a surface with 4.0 N of friction. Find a.
> ΣF = 10 − 4 = 6 N
> a = 6/2 = 3.0 m s^{-2}
K: Only the net force on a body determines its acceleration; forces on other bodies don't appear in its equation.
!: Third-law pairs act on different bodies, so they never cancel each other in one body's free-body diagram. Weight and the normal force on a book are not a third-law pair.
T: Net force | The vector sum of all the forces acting on a body
T: Inertia | The tendency of a body to keep its velocity; mass measures it
T: Third-law pair | Two equal and opposite forces of the same type that two bodies exert on each other
SUM: No net force, no change in velocity; F_{net} = ma; forces come in pairs on different bodies.
SUM: Isolate each body, sum the forces on it, and add constraints for connected bodies.
EV: established | Newton's laws describe motion accurately at speeds much less than c and on scales above the atomic
SRC: OpenStax, University Physics Volume 1, section 5.3 "Newton's Second Law" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/5-3-newtons-second-law
SRC: AQA, A-level Physics specification (7408), section 3.4.1.5, Newton's laws of motion | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: State Newton's second law in terms of momentum. | The net force equals the rate of change of momentum, F = dp/dt.
Q: What is the third-law partner of the Earth's gravitational pull on you? | Your gravitational pull on the Earth.
M1@2: A 1000 kg car accelerates at 2 m s^{-2}. The net force is: | 2000 N | 500 N | 1000 N | 4000 N | F = ma = 1000 × 2 = 2000 N, the resultant of engine force, friction and drag.
M2@1,3: A horse pulls a cart forward. Why can they accelerate if the cart pulls the horse back equally? | The forces act on different bodies; the ground pushes the horse forward more than the cart pulls back | They can't accelerate at all | The horse's force on the cart is larger | Friction on the cart is zero | The third-law pair acts on different bodies; each body accelerates according to the net force on it alone.
NUM2@2: Blocks of 3.0 kg and 1.0 kg on a frictionless table are pushed together by 8.0 N applied to the 3.0 kg block. What force does the 3.0 kg block exert on the 1.0 kg block, in newtons? | 2 | 0.05 | N | a = 8.0/4.0 = 2.0 m s^{-2}; the 1.0 kg block needs F = 1.0 × 2.0 = 2.0 N.
TF1@1: A book resting on a table: its weight and the normal force from the table are a Newton's third-law pair. | false | Both act on the book, so they can't be a third-law pair; the partner of the book's weight is the book's gravitational pull on the Earth.
M3@3: A lorry and a small car collide head-on. Which experiences the larger force? | Both experience forces of equal size | The car, because it has less mass | The lorry, because it has more momentum | Whichever vehicle was moving faster | By the third law the forces are equal and opposite; the car has the larger acceleration because its mass is smaller.
SA2@1,3: Explain using Newton's laws why a passenger without a seatbelt moves forward relative to the car when it brakes sharply. | The braking force from the road acts on the car, which decelerates. No equal horizontal force acts on the unbelted passenger (friction from the seat is small), so by the first law she continues at the original velocity. Relative to the decelerating car she therefore moves forward until the dashboard or windscreen exerts a large force on her. A seatbelt supplies the force needed to decelerate her with the car. | Force acts on the car, not the passenger ; First law: passenger keeps velocity ; Relative motion forward ; Seatbelt provides decelerating force

## Inertial and non-inertial frames
S: Newton's laws hold as written only in inertial frames. In an accelerating or rotating frame, objects seem to accelerate with no force acting, so you must add fictitious (inertial) forces to use F = ma.
O: Identify whether a frame is inertial
O: Calculate apparent weight in an accelerating lift
O: Explain centrifugal and Coriolis effects as fictitious forces
PRE: Newton's laws of motion
LV: Year 1 · Physical reasoning
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
K: In an inertial frame, use only real forces; in an accelerating frame, add −mA to each body to use F = ma.
!: In an inertial frame, "centrifugal force" doesn't exist: an object in circular motion is pulled inward and has no outward force acting on it.
T: Non-inertial frame | An accelerating or rotating frame, in which Newton's laws need fictitious forces
T: Fictitious force | An apparent force, proportional to mass, with no physical source or third-law partner
T: Apparent weight | The reading of a scale supporting a body, equal to the normal force
SUM: Apparent weight in a lift is m(g + a) going up and m(g − a) going down; zero in free fall.
SUM: Centrifugal and Coriolis forces appear only in rotating frames.
EV: established | Fictitious forces correctly account for motion observed from accelerating frames
SRC: OpenStax, University Physics Volume 1, section 6.3 "Centripetal Force" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/6-3-centripetal-force
SRC: OpenStax, University Physics Volume 1, section 5.2 "Newton's First Law" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/5-2-newtons-first-law
Q: What is a fictitious force? | An apparent force needed to apply Newton's laws in a non-inertial frame; it has no physical source or reaction partner.
Q: What do scales read in a freely falling lift? | Zero (apparent weightlessness).
M1@2: In a lift accelerating downward at g/2, your apparent weight is: | mg/2 | mg | 3mg/2 | 0 | mg − R = ma with a = g/2, so R = m(g − g/2) = mg/2.
M2@1,3: Which shows the Earth is a rotating (non-inertial) frame? | Foucault's pendulum precessing | Tides | Ocean waves | The Moon's phases | The swing plane turns relative to the ground because the Earth rotates beneath it.
NUM2@2: A 50 kg person stands in a lift decelerating at 1.5 m s^{-2} while moving upward (g = 9.8). What does the scale read, in newtons? | 415 | 2 | N | Acceleration is 1.5 m s^{-2} downward: R = m(g − a) = 50 × 8.3 = 415 N.
M3@3: A pendulum hangs in a train accelerating forward at a. Seen from the train, at what angle from vertical does it hang? | tan θ = a/g, tilted backward | tan θ = g/a, tilted forward | It stays exactly vertical | tan θ = a/g, tilted forward | In the train's frame a fictitious force ma acts backward; balancing it with mg gives tan θ = a/g, the bob hanging towards the rear.
SA2@1,3: Explain from an inertial frame and from the rotating frame why a passenger in a car on a sharp bend feels pushed outwards. | In the inertial (road) frame there is no outward force: the passenger tends to continue in a straight line (first law), and the door or seat must push her inward to give the centripetal force mv^{2}/r. In the car's rotating frame she is at rest, so a fictitious centrifugal force mv^{2}/r outward is added to balance the real inward push. Both descriptions predict the same experience. | Inertial: tendency to go straight ; Real inward force provides centripetal force ; Rotating frame adds centrifugal force ; Same outcome either way

## Free-body diagrams
S: A free-body diagram shows one object, isolated, with every external force acting on it drawn as an arrow from its point of action. It's the essential first step in any force problem.
O: Draw a free-body diagram showing every force acting on one body
O: Resolve forces along convenient axes
O: Avoid including fictitious or reaction forces wrongly
PRE: Newton's laws of motion
LV: GCSE and A level · Foundation
H: How to draw one
- Isolate the body; draw it as a box or dot (or to shape if torques matter).
- Add every force from contact (normal, friction, tension, drag, push) and from fields (weight, electric, magnetic).
- Label each force by type and by what exerts it ("tension from rope").
- Don't include forces the body exerts on others, or "ma" as a force.
- Mark the acceleration separately, beside the diagram.
H: Checks
- Each force must have a physical source.
- If the body is in equilibrium, the arrows must form a closed polygon.
- Choose axes along the acceleration to minimise components.
X: A box is pushed up a rough slope by a horizontal force P. List the forces.
> Weight mg (down), normal force N (perpendicular to slope), friction f (down the slope, opposing motion), push P (horizontal)
> Resolve along and perpendicular to the slope: N = mg cos θ + P sin θ
K: One body, every force on it, each with a named source: nothing more, nothing less.
!: "Centripetal force" isn't an extra force to draw; it's the net inward force supplied by real forces (tension, gravity, friction).
P: Arrow lengths should roughly show the sizes of the forces, so the diagram itself suggests whether the net force is zero or which way the body accelerates.
T: Free-body diagram | A sketch of one isolated body showing all external forces acting on it
T: Resolving | Splitting a force into perpendicular components along chosen axes
SUM: Isolate one body and draw every external force with its source; mark acceleration separately.
SUM: Choose axes along the acceleration; never draw ma or centripetal force as an extra force.
EV: established | Free-body diagrams are the standard method for applying Newton's second law
SRC: OpenStax, University Physics Volume 1, section 5.7 "Drawing Free-Body Diagrams" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/5-7-drawing-free-body-diagrams
SRC: AQA, A-level Physics specification (7408), section 3.4.1.1, Scalars and vectors | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What forces go on a free-body diagram? | All external forces acting on the chosen body, and nothing else.
Q: Why is "ma" never drawn as a force? | It's the result of the net force, not a separate force.
M1@1: A ball hangs from a string at rest. Its free-body diagram has: | Weight and tension | Weight, tension and the ball's pull on the string | Tension only, pulling upwards | Weight only, pulling downwards | Only forces acting on the ball belong: Earth's pull (weight) and the string's pull (tension).
M2@3: A car rounds a flat bend. What provides the centripetal force? | Friction from the road | Centrifugal force | The engine | Air resistance | Sideways static friction from the road on the tyres is the only horizontal force pointing towards the centre.
NUM2@2: A 2.0 kg box rests on a floor while pulled upward by a 5.0 N string (g = 9.8). What is the normal force, in newtons? | 14.6 | 0.1 | N | Vertical equilibrium: N + 5.0 = 2.0 × 9.8 = 19.6, so N = 14.6 N.
M3@2,3: A box on a smooth 30° slope is held by a rope parallel to the slope. Which set of forces belongs on its free-body diagram? | Weight, normal force, tension | Weight, normal force, tension, mg sin θ | Weight, tension, a down-slope force | Normal force, tension, friction | mg sin θ is a component of the weight, not an extra force; the slope is smooth, so there is no friction.
SA2@1,2: Draw (in words) the free-body diagram for a skydiver falling at terminal velocity and explain what it shows. | The skydiver is drawn as a single body with two forces: weight mg acting downward from the centre of mass, and air resistance (drag) acting upward, drawn the same length. No other forces act. Because the arrows are equal and opposite, the net force is zero, so by the first law the velocity is constant. | Body isolated ; Weight down and drag up ; Equal sizes ; Net force zero means constant velocity

## Normal force and tension
S: The normal force is the perpendicular push a surface exerts to stop objects passing through it; tension is the pull transmitted along a rope or string. Both are constraint forces: they take whatever value the motion requires.
O: Calculate the normal force in situations where it isn't equal to mg
O: Solve connected-body problems including the Atwood machine
O: Identify when contact is lost or a string goes slack
PRE: Free-body diagrams
LV: GCSE and A level · Application
H: Normal force
- Perpendicular to the contact surface; can only push.
- Not always mg: on a slope N = mg cos θ; in an accelerating lift N = m(g + a); pulling up on a box reduces it.
- When N falls to zero, contact is lost (a car over a hump, the top of a roller-coaster loop).
H: Tension
- Along the string, pulling on whatever it's attached to.
- Light (massless) string: the same tension throughout. Ideal pulley: changes direction, not size.
- A heavy rope has tension that varies along its length.
P: Both forces come from the electromagnetic forces between atoms: a surface or rope deforms very slightly until the restoring force is exactly what is needed. That is why they have no formula of their own and must be found from the equations of motion.
X: Two masses, 3.0 kg and 2.0 kg, hang over a frictionless pulley (Atwood machine). Find a and T.
> a = (m_{1} − m_{2})g/(m_{1} + m_{2}) = (1/5)(9.8) = 1.96 m s^{-2}
> T = 2m_{1}m_{2}g/(m_{1} + m_{2}) = 2 × 6 × 9.8/5 = 23.5 N
K: Normal force and tension are found from Newton's second law: they adjust to whatever the constraint requires.
!: Ropes can't push; if a calculation gives negative tension, the string has gone slack and the model changes.
T: Normal force | The contact force perpendicular to a surface, preventing objects passing through it
T: Tension | The pulling force transmitted along a string, rope or cable
SUM: N equals mg only on level ground with no vertical acceleration or other vertical forces.
SUM: A light string over an ideal pulley has one tension; write F = ma for each mass.
EV: established | Treating normal force and tension as constraint forces is standard Newtonian mechanics
SRC: OpenStax, College Physics 2e, section 4.5 "Normal, Tension, and Other Examples of Forces" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/4-5-normal-tension-and-other-examples-of-forces
SRC: OpenStax, University Physics Volume 1, section 6.1 "Solving Problems with Newton's Laws" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/6-1-solving-problems-with-newtons-laws
Q: What is the normal force on a block on a slope of angle θ? | mg cos θ (if no other forces have perpendicular components).
Q: When does a car lose contact going over a hump of radius r? | When v^{2}/r ≥ g, so N would have to be negative.
M1@1: A 5 kg mass hangs from a rope in a lift accelerating up at 2 m s^{-2} (g = 10). Tension? | 60 N | 50 N | 40 N | 10 N | T − mg = ma, so T = m(g + a) = 5 × 12 = 60 N.
M2@2: In the Atwood machine, if m_{1} = m_{2}, then: | a = 0 and T = mg | a = g and T = 0 | T = 0 and a = 0 | T = 2mg and a = 0 | With equal masses the system is balanced: a = (m_{1} − m_{2})g/(m_{1} + m_{2}) = 0 and the tension equals each weight.
NUM2@3: What is the greatest speed at which a car can pass over the top of a hump of radius 10 m without losing contact (g = 9.8), in m s^{-1}? | 9.9 | 0.1 | m s^{-1} | Contact is lost when N = 0, i.e. mg = mv^{2}/r: v = √(gr) = √98 = 9.9 m s^{-1}.
M3@2: A 4.0 kg block on a smooth table is joined by a string over a pulley to a hanging 1.0 kg mass (g = 10). What is the tension? | 8.0 N | 10 N | 2.0 N | 40 N | a = 1.0 × 10/5.0 = 2.0 m s^{-2}; the table block needs T = 4.0 × 2.0 = 8.0 N, less than the hanging weight.
SA2@1,2: Explain why the tension in a lift cable is greater when the lift accelerates upward than when it moves upward at constant speed. | At constant speed the acceleration is zero, so the net force is zero and the tension equals the total weight, mg. When accelerating upward the net force must be ma upward, so T − mg = ma and T = m(g + a), larger than mg. The cable must both support the weight and provide the extra force to accelerate the lift. | Constant speed means zero net force ; T equals mg then ; Upward acceleration requires T − mg = ma ; T = m(g + a)

## Friction and drag
S: Friction opposes relative sliding between surfaces; drag opposes motion through a fluid. Dry friction is roughly independent of speed and contact area, while drag grows with speed.
O: Apply the static and kinetic friction laws
O: Choose between linear and quadratic drag using the Reynolds number
O: Explain the power needed to overcome drag at speed
PRE: Normal force and tension
LV: A level · Application
H: Friction
E: f_{s} ≤ μ_{s}N :: static friction: as large as needed, up to a maximum
E: f_{k} = μ_{k}N :: kinetic friction, usually μ_{k} < μ_{s}
- Microscopically, friction comes from bonds and interlocking at the small true contact area, which is proportional to N.
- Friction is what lets you walk, drive and grip; on wheels rolling without slipping it's static friction.
H: Drag
E: F_{D} ≈ bv :: low speed, small objects, viscous flow (Stokes: b = 6πηr)
E: F_{D} = ½ρC_{d}Av^{2} :: high speed, turbulent flow: most everyday objects
- The Reynolds number Re = ρvL/η decides which regime applies.
- Streamlining reduces C_{d} (car about 0.3, flat plate about 1.2).
X: A 20 kg box on a floor has μ_{s} = 0.5, μ_{k} = 0.4. What force starts it moving, and what keeps it moving at constant speed? (g = 9.8)
> Start: μ_{s}mg = 98 N
> Keep moving: μ_{k}mg = 78 N
K: Static friction matches the applied force up to μ_{s}N; once sliding, kinetic friction is μ_{k}N whatever the speed.
!: Static friction isn't always μ_{s}N; that's only its maximum. On a stationary box pushed with 30 N, static friction is exactly 30 N.
P: **Investigate with the lab.** Switch air resistance on and off for the same launch and compare the paths. Then find the best angle with drag, which is below 45°.
IX: projectile
T: Coefficient of friction | The ratio of the friction force to the normal force, μ = f/N
T: Drag | The resistive force on a body moving through a fluid
T: Reynolds number | Re = ρvL/η, the ratio of inertial to viscous effects in a flow
SUM: Static friction ≤ μ_{s}N, kinetic friction = μ_{k}N, both independent of contact area.
SUM: Drag is ∝ v at low Re and ∝ v^{2} at high Re, so the power to overcome it rises as v^{3}.
EV: established | The friction laws are good empirical approximations, not fundamental laws
SRC: OpenStax, University Physics Volume 1, section 6.2 "Friction" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/6-2-friction
SRC: OpenStax, College Physics 2e, section 5.2 "Drag Forces" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/5-2-drag-forces
Q: How does ABS help when braking hard? | It stops the wheels locking, so they use static friction (usually higher than kinetic) and the driver can still steer.
Q: How does high-speed drag depend on speed? | It's proportional to v^{2}.
M1@1: A 10 kg block is pushed with 20 N; μ_{s} = 0.5 (g = 10). The friction force is: | 20 N | 50 N | 0 | 30 N | The maximum static friction is 50 N, so the block stays put and friction exactly matches the 20 N push.
M2@3: Doubling a car's speed multiplies the power needed to overcome drag by: | 8 | 2 | 4 | 16 | Drag ∝ v^{2} and power P = Fv, so P ∝ v^{3}: doubling v multiplies the power by 8.
M2@2: With air resistance, why is the best launch angle below 45°? | Drag shortens long, high flights most, so a flatter path loses less range | Drag adds a forward force on the ball at high angles | Gravity is weaker at higher angles of launch | Drag only acts on the way down, so lower is safer | The longer and faster the flight, the more energy drag removes, favouring flatter trajectories.
NUM2@1: A 15 kg crate slides across a floor with μ_{k} = 0.30 (g = 9.8). What is the friction force, in newtons? | 44 | 0.5 | N | f_{k} = μ_{k}mg = 0.30 × 15 × 9.8 = 44.1 N.
M3@1: A 50 kg crate needs 200 N to start moving but only 150 N to keep it moving at constant speed (g = 10). What are μ_{s} and μ_{k}? | 0.40 and 0.30 | 0.30 and 0.40 | 4.0 and 3.0 | 0.40 and 0.40 | μ_{s} = 200/500 = 0.40 and μ_{k} = 150/500 = 0.30; kinetic is usually the smaller.
SA2@1,3: Explain why a cyclist's top speed is limited mostly by air resistance, and why halving the frontal area helps so much. | At cycling speeds the flow is turbulent, so drag = ½ρC_{d}Av^{2}, and the power needed is drag × v, proportional to v^{3}. The cyclist's maximum power is limited, so the top speed is where this power equals the drag power. Since P ∝ Av^{3}, halving A (crouching, aero kit) raises the top speed by a factor 2^{1/3} ≈ 1.26 for the same power. | Drag proportional to v squared ; Power proportional to v cubed ; Top speed where power output equals drag power ; Smaller area raises top speed

## Inclined planes
S: On a slope, resolve forces parallel and perpendicular to the surface. Gravity's component down the slope, mg sin θ, drives motion; its perpendicular component, mg cos θ, sets the normal force and therefore friction.
O: Resolve weight into components parallel and perpendicular to a slope
O: Calculate acceleration on a slope with and without friction
O: Measure coefficients of friction with a tilting ramp
PRE: Friction and drag
LV: GCSE and A level · Application
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
K: Take axes along and perpendicular to the slope: along it, mg sin θ minus friction gives ma; perpendicular, N = mg cos θ.
!: The normal force on a slope isn't mg; it's mg cos θ (plus any other perpendicular forces).
T: Component of weight down the slope | mg sin θ, the part of the weight parallel to an incline of angle θ
T: Angle of friction | The slope angle at which a block just starts to slide, with tan θ = μ_{s}
SUM: Down-slope component mg sin θ; normal force mg cos θ; friction ≤ μN.
SUM: Frictionless a = g sin θ, independent of mass; slipping starts at tan θ = μ_{s}.
EV: established | Resolving forces on an incline follows directly from Newton's second law
SRC: OpenStax, University Physics Volume 1, section 6.2 "Friction" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/6-2-friction
SRC: AQA, A-level Physics specification (7408), section 3.4.1.1, Scalars and vectors | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What component of weight acts down a slope? | mg sin θ.
Q: How can you measure μ_{s} with a tilting ramp? | Increase the angle until the block just slips; μ_{s} = tan θ.
M1@1: A block is at rest on a 20° slope. What is the friction force for m = 5 kg (g = 10)? | 17 N | 47 N | 50 N | 0 | At rest, friction balances the down-slope component: mg sin 20° = 50 × 0.342 = 17 N.
M2@2: On a frictionless slope, a heavier block's acceleration is: | The same as a lighter block's | Larger | Smaller | Zero | a = g sin θ: both the driving force and the inertia are proportional to m, so mass cancels.
NUM2@3: A block just starts to slide when a ramp is tilted to 25°. What is μ_{s}? | 0.47 | 0.01 | – | At the point of slipping mg sin θ = μ_{s}mg cos θ, so μ_{s} = tan 25° = 0.466.
M3@2: A block is pushed up a 30° slope at 6.0 m s^{-1}; μ_{k} = 0.20 (g = 9.8). How far up does it travel? | 2.7 m | 3.7 m | 1.8 m | 6.0 m | a = −9.8(0.5 + 0.2 × 0.866) = −6.6 m s^{-2}; s = u^{2}/(2 × 6.6) = 36/13.2 = 2.7 m.
SA2@1,3: Describe how to measure the coefficients of static and kinetic friction between a block and a board, and explain the physics. | Place the block on the board and slowly raise one end, measuring the angle when the block just begins to slide. At that point mg sin θ = μ_{s}mg cos θ, so μ_{s} = tan θ. Then lower the angle and tap the block to start it; find the angle at which it slides at constant speed, where acceleration is zero and μ_{k} = tan θ. Repeat several times and average, measuring angles with a protractor or from height and length. | Tilt until slip ; Balance gives tan theta for static ; Constant speed gives kinetic ; Repeats and angle measurement

## Circular motion
S: An object moving in a circle constantly changes direction, so it accelerates towards the centre even at constant speed. Angular quantities describe the motion neatly, and a net inward force is needed to sustain it.
O: Convert between angular velocity, frequency, period and linear speed
O: Calculate centripetal acceleration
O: Analyse forces at the top and bottom of a vertical circle
PRE: Motion in two and three dimensions
LV: A level · Application
H: Quantities
E: ω = dθ/dt = 2π/T = 2πf :: angular velocity
E: v = ωr :: linear speed
E: a = v^{2}/r = ω^{2}r :: centripetal acceleration
- Period T, frequency f = 1/T; angles in radians.
- Non-uniform circular motion also has a tangential acceleration rα.
H: Vertical circles
- At the top of a loop the net inward force is mg + N (or mg + T); at the bottom N − mg.
- Minimum speed at the top to stay in contact: v = √(gr).
- Energy conservation links speeds at top and bottom: v_{bottom}^{2} = v_{top}^{2} + 4gr.
X: A 0.2 kg ball whirls on a 0.5 m string in a vertical circle. What is the minimum speed at the top, and the tension at the bottom?
> v_{top} = √(9.8 × 0.5) = 2.21 m s^{-1}
> v_{bottom}^{2} = 4.9 + 19.6 = 24.5; T = mg + mv^{2}/r = 1.96 + 9.8 = 11.8 N
K: Uniform circular motion needs a net force mv^{2}/r towards the centre; without it the object moves off along a tangent.
!: Circular motion at constant speed is still accelerated motion; there must be a net force.
T: Angular velocity | The rate of change of angle, ω = 2π/T, in rad s^{-1}
T: Centripetal acceleration | The acceleration v^{2}/r directed towards the centre of a circular path
SUM: ω = 2πf, v = ωr, a = v^{2}/r = ω^{2}r towards the centre.
SUM: In a vertical circle the minimum speed at the top is √(gr); tension or normal force is greatest at the bottom.
EV: established | The kinematics of circular motion follow exactly from vector geometry
SRC: OpenStax, University Physics Volume 1, section 4.4 "Uniform and Nonuniform Circular Motion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/4-4-uniform-circular-motion
SRC: AQA, A-level Physics specification (7408), section 3.6.1.1, Circular motion | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What is the minimum speed at the top of a vertical circle of radius r? | √(gr).
Q: How are v and ω related? | v = ωr.
M1@1: A wheel turns at 600 rpm. Its angular velocity is: | 63 rad s^{-1} | 10 rad s^{-1} | 600 rad s^{-1} | 3770 rad s^{-1} | 600 rpm = 10 rev s^{-1}; ω = 2π × 10 = 63 rad s^{-1}.
M2@3: In a loop-the-loop, the normal force is largest at: | The bottom | The top | The sides | It's constant | At the bottom N − mg = mv^{2}/r and the speed is greatest, so N is largest there.
NUM2@2: A point on a 0.30 m radius wheel turns at 5.0 revolutions per second. What is its centripetal acceleration, in m s^{-2}? | 296 | 3 | m s^{-2} | ω = 2π × 5.0 = 31.4 rad s^{-1}; a = ω^{2}r = 986 × 0.30 = 296 m s^{-2}.
M3@3: A bucket of water is swung in a vertical circle of radius 1.0 m. What is the minimum speed at the top for the water to stay in (g = 9.8)? | 3.1 m s^{-1} | 9.8 m s^{-1} | 1.0 m s^{-1} | 4.4 m s^{-1} | At minimum speed gravity alone supplies the centripetal force: v = √(gr) = √9.8 = 3.1 m s^{-1}.
SA2@1,3: Explain why a satellite in a circular orbit is accelerating even though its speed is constant, and what provides the force. | Velocity is a vector; in a circular orbit its direction changes continuously, so the velocity changes and the satellite accelerates. The acceleration v^{2}/r points towards the centre of the orbit. The force producing it is the gravitational attraction of the Earth, which acts towards the Earth's centre, perpendicular to the velocity, so it changes direction without changing speed. | Velocity changes direction ; Acceleration towards centre, v squared over r ; Gravity provides the force ; Force perpendicular to velocity so speed constant

## Centripetal acceleration and force
S: Centripetal means "centre-seeking": the acceleration v^{2}/r towards the centre of a circular path, and the net force mv^{2}/r that causes it. That force is always provided by real forces: tension, gravity, friction, normal force, magnetism.
O: Derive a = v^{2}/r from the change in the velocity vector
O: Identify the real force that provides the centripetal force in a given situation
O: Solve banked-curve, flat-bend and orbit problems
PRE: Circular motion
LV: A level · Application
H: Derivation
P: In time Δt the velocity vector turns through Δθ = vΔt/r, so the size of Δv is vΔθ = v^{2}Δt/r, pointing towards the centre. Dividing by Δt gives a = v^{2}/r.
E: F_{c} = mv^{2}/r = mω^{2}r
H: Examples
- Car on a flat bend: friction, v_{max} = √(μ_{s}gr).
- Banked track (no friction): tan θ = v^{2}/(rg).
- Satellite: gravity, GMm/r^{2} = mv^{2}/r.
- Conical pendulum: horizontal component of tension.
- Charged particle in B: qvB = mv^{2}/r, so r = mv/(qB).
X: At what speed does a 15° banked curve of radius 100 m need no friction?
> v = √(rg tan θ) = √(100 × 9.8 × 0.268) = 16 m s^{-1} (58 km h^{-1})
K: Find which real forces point towards the centre; their resultant must equal mv^{2}/r.
!: Don't add mv^{2}/r as an extra force on the free-body diagram; set the sum of real inward forces equal to mv^{2}/r.
T: Centripetal force | The resultant force towards the centre needed for circular motion, mv^{2}/r
T: Banking | Tilting a road or track so the normal force has a component towards the centre of the bend
SUM: a = v^{2}/r towards the centre; the net inward force is mv^{2}/r.
SUM: Friction, banking, tension, gravity or magnetic force can supply it: never draw it as a separate force.
EV: established | Centripetal force analysis follows directly from Newton's second law
SRC: OpenStax, University Physics Volume 1, section 6.3 "Centripetal Force" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/6-3-centripetal-force
SRC: AQA, A-level Physics specification (7408), section 3.6.1.1, Circular motion | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What provides the centripetal force for a satellite? | Gravity.
Q: What is the design speed of a frictionless banked curve? | v = √(rg tan θ).
M1@3: A 1000 kg car takes a 50 m radius bend at 10 m s^{-1}. The friction needed is: | 2000 N | 200 N | 500 N | 20 000 N | Friction supplies the centripetal force: mv^{2}/r = 1000 × 100/50 = 2000 N.
M2@3: Doubling the speed on a bend multiplies the required centripetal force by: | 4 | 2 | √2 | 8 | F = mv^{2}/r, so doubling v multiplies the force by 2^{2} = 4.
NUM2@3: What is the greatest speed at which a car can take a flat bend of radius 40 m if μ_{s} = 0.60 (g = 9.8), in m s^{-1}? | 15.3 | 0.2 | m s^{-1} | μ_{s}mg = mv^{2}/r gives v = √(μ_{s}gr) = √(0.60 × 9.8 × 40) = √235 = 15.3 m s^{-1}.
TF1@2: In a conical pendulum, the centripetal force is provided by the horizontal component of the string's tension. | true | The vertical component of tension balances the weight; the horizontal component points towards the centre of the circle.
M3@1,2: A proton (m = 1.67 × 10^{-27} kg, q = 1.6 × 10^{-19} C) moves at 2.0 × 10^{6} m s^{-1} perpendicular to a 0.50 T field. What is its orbit radius? | 4.2 cm | 0.42 cm | 42 cm | 4.2 m | r = mv/(qB) = (1.67 × 10^{-27} × 2.0 × 10^{6})/(1.6 × 10^{-19} × 0.50) = 0.042 m.
SA2@2,3: Explain how banking a race track allows cars to corner without relying on friction, and derive the design speed. | On a banked track the normal force is perpendicular to the surface, so it tilts towards the centre of the bend. Its vertical component balances the weight, N cos θ = mg, and its horizontal component provides the centripetal force, N sin θ = mv^{2}/r. Dividing gives tan θ = v^{2}/(rg), so v = √(rg tan θ): at this speed no friction is needed. | Normal force tilted towards centre ; Vertical component balances weight ; Horizontal component gives centripetal force ; tan theta = v squared over rg

## Work and energy
S: Work is energy transferred by a force acting through a displacement. The work–energy theorem says the net work on an object equals its change in kinetic energy, which often solves problems without needing the time.
O: Calculate the work done by a constant force at an angle to the displacement
O: Find work from the area under a force–displacement graph
O: Apply the work–energy theorem
PRE: Newton's laws of motion
LV: GCSE and A level · Foundation
H: Definitions
E: W = F·s = Fs cos θ :: constant force
E: W = ∫F·dr :: varying force: area under the F–x graph
E: W_{net} = ΔKE :: work–energy theorem
- Work is positive when the force has a component along the motion, negative when against it, zero when perpendicular (centripetal force does no work).
- Unit: joule, 1 J = 1 N m.
H: Energy
P: Energy is conserved and is stored in many ways (kinetic, gravitational, elastic, thermal, chemical, nuclear). Work and heating are the two ways energy moves between systems.
X: A 1500 kg car accelerates from 10 to 20 m s^{-1}. How much net work is done?
> ΔKE = ½ × 1500 × (400 − 100) = 225 kJ
K: Only the component of force along the displacement does work; the net work equals the change in kinetic energy.
!: Holding a heavy bag still does no mechanical work on it (no displacement), even though your muscles use chemical energy.
T: Work | Energy transferred by a force, W = Fs cos θ
T: Work–energy theorem | The net work done on a body equals its change in kinetic energy
SUM: W = Fs cos θ for a constant force; area under F–x for a varying one.
SUM: Net work = ΔKE; perpendicular forces do no work.
EV: established | The work–energy theorem follows from Newton's second law
SRC: OpenStax, University Physics Volume 1, section 7.1 "Work" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/7-1-work
SRC: AQA, A-level Physics specification (7408), section 3.4.1.7, Work, energy and power | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: Why does a centripetal force do no work? | It is perpendicular to the velocity at every instant.
Q: State the work–energy theorem. | The net work done on an object equals its change in kinetic energy.
M1@1: A 50 N force pulls a sledge 10 m at 60° to the ground. Work done: | 250 J | 500 J | 433 J | 0 | W = Fs cos θ = 50 × 10 × cos 60° = 250 J; only the horizontal component does work.
M2@3: Friction does −200 J of work on a sliding box. This means: | 200 J of kinetic energy is transferred away (mostly to heating) | The box gains 200 J of kinetic energy | No energy is transferred by friction | Momentum is lost but energy is not | Negative work removes energy from the box; it ends up as internal energy of the box and the floor.
NUM2@2: A force rises steadily from 0 to 40 N as a spring is stretched 0.10 m. How much work is done, in joules? | 2 | 0.05 | J | Area under the F–x graph = ½ × 40 × 0.10 = 2.0 J.
M3@1,3: A 2.0 kg trolley at rest is pushed by a 6.0 N net force over 3.0 m. What is its final speed? | 4.2 m s^{-1} | 9.0 m s^{-1} | 3.0 m s^{-1} | 18 m s^{-1} | Net work 18 J = ½ × 2.0 × v^{2}, so v = √18 = 4.2 m s^{-1}.
SA2@1,2: A crate is dragged at constant speed across a floor by a rope at an angle above the horizontal. Explain which forces do work on it and why its kinetic energy doesn't change. | The rope's tension does positive work, Fs cos θ, through its horizontal component. Friction does equal negative work, transferring energy to heating. Weight and the normal force are perpendicular to the motion, so they do no work. The net work is zero, so by the work–energy theorem the kinetic energy is unchanged, as constant speed requires. | Tension does positive work via horizontal component ; Friction does negative work ; Weight and normal force do none ; Net work zero so KE constant

## Kinetic and potential energy
S: Kinetic energy is energy of motion; potential energy is energy stored by position or configuration in a field or a deformed body. Converting between them, with total energy conserved, is behind falling, swinging, bouncing and orbiting.
O: Calculate kinetic, gravitational and elastic potential energies
O: Use energy conservation to find speeds and heights
O: Relate force to the gradient of a potential energy curve
PRE: Work and energy
LV: GCSE and A level · Foundation
H: Formulas
E: KE = ½mv^{2} = p^{2}/(2m)
E: ΔU = mgΔh :: near Earth's surface
E: U = −GMm/r :: general gravitational PE (zero at infinity)
E: U = ½kx^{2} :: elastic PE of a spring
E: F = −dU/dx :: force from potential energy
H: Potential energy curves
- Equilibria are where dU/dx = 0: minima are stable, maxima unstable.
- A particle with total energy E is confined where U(x) ≤ E; turning points are where U = E.
P: Near the Earth's surface mgh is the small-height approximation of −GMm/r; use the general form for orbits and escape, where g changes over the distance moved.
X: A 0.5 kg ball is dropped from 20 m. Find its speed just before landing (no drag, g = 9.8).
> mgh = ½mv^{2} ⇒ v = √(2gh) = √392 = 19.8 m s^{-1}
K: With only conservative forces, KE + PE stays constant: what one loses, the other gains.
!: Only changes in potential energy matter; the zero point is a free choice, but use the same one throughout a problem.
T: Kinetic energy | Energy of motion, ½mv^{2}
T: Potential energy | Energy stored because of position in a field or configuration of a system
SUM: KE = ½mv^{2}; ΔU = mgΔh near Earth; ½kx^{2} for a spring.
SUM: Force points down the potential energy slope, F = −dU/dx; minima of U are stable equilibria.
EV: established | Kinetic and potential energy and their conservation are core classical mechanics
SRC: OpenStax, University Physics Volume 1, section 7.2 "Kinetic Energy" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/7-2-kinetic-energy
SRC: OpenStax, University Physics Volume 1, section 8.1 "Potential Energy of a System" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/8-1-potential-energy-of-a-system
Q: How is force related to the potential energy curve? | F = −dU/dx: force points downhill on the U(x) curve.
Q: What is the elastic energy stored in a spring stretched by x? | ½kx^{2}.
M1@1: Doubling a car's speed multiplies its kinetic energy by: | 4 | 2 | √2 | 8 | KE = ½mv^{2} ∝ v^{2}, so doubling the speed quadruples the kinetic energy.
M2@2: A spring (k = 200 N m^{-1}) is compressed 0.1 m and launches a 0.05 kg ball. Launch speed? | 6.3 m s^{-1} | 20 m s^{-1} | 2 m s^{-1} | 40 m s^{-1} | ½kx^{2} = ½ × 200 × 0.01 = 1 J = ½mv^{2}, so v = √(2/0.05) = √40 = 6.3 m s^{-1}.
NUM2@2: A pendulum bob passes its lowest point at 2.8 m s^{-1}. How high above that point does it rise (g = 9.8), in metres? | 0.4 | 0.01 | m | ½mv^{2} = mgh gives h = v^{2}/(2g) = 7.84/19.6 = 0.40 m.
M3@3: U(x) has a minimum at x = 2 m and a maximum at x = 5 m. A particle at rest at x = 5 m is nudged. What happens? | It moves away: x = 5 m is unstable equilibrium | It returns to x = 5 m: stable equilibrium | It stays at x = 5 m: neutral equilibrium | It accelerates towards x = 5 m from both sides | At a maximum of U the force −dU/dx points away on both sides, so any displacement grows.
SA2@2,3: A roller-coaster car starts from rest at the top of a 30 m drop. Explain how energy conservation gives its speed at the bottom and why the real speed is lower. | Ignoring friction and drag, gravitational potential energy mgh becomes kinetic energy ½mv^{2}, so v = √(2gh) = √(2 × 9.8 × 30) ≈ 24 m s^{-1}, independent of mass and the shape of the track. In reality friction in the wheels and air resistance do negative work, transferring some energy to heating the surroundings, so the speed at the bottom is less. | mgh = half mv squared ; Speed about 24 m per second ; Independent of mass and path ; Friction and drag reduce it

## Conservative and non-conservative forces
S: A conservative force does work that depends only on start and end points, so a potential energy can be defined for it. Non-conservative forces like friction depend on the path and turn mechanical energy into thermal energy.
O: Classify forces as conservative or non-conservative
O: Use ΔKE + ΔU = W_{nc} to solve problems with friction
O: Explain where "lost" mechanical energy goes
PRE: Kinetic and potential energy
LV: A level · Application
H: Tests for conservative forces
- Work around any closed loop is zero: ∮F·dr = 0.
- Equivalent: F = −∇U, or ∇ × F = 0.
- Conservative: gravity, electrostatic forces, ideal springs.
- Non-conservative: friction, drag, a motor's push.
E: ΔKE + ΔU = W_{nc} :: mechanical energy changes only by the work of non-conservative forces
H: Energy accounting with friction
X: A 2.0 kg block slides 5.0 m down a 30° slope with friction 4.0 N, starting from rest. Find its final speed.
> mgh = 2 × 9.8 × 2.5 = 49 J; friction work = −20 J
> ½mv^{2} = 29 J ⇒ v = 5.4 m s^{-1}
P: At the atomic level the energy isn't destroyed: friction spreads it into many microscopic degrees of freedom (thermal energy), where it can't easily be recovered.
K: For conservative forces use potential energy; add the work of non-conservative forces separately.
!: Magnetic forces do no work (F ⊥ v) but aren't described by a potential energy in the usual sense; "zero work" and "conservative" are different properties.
T: Conservative force | A force whose work depends only on the start and end points, so a potential energy exists
T: Mechanical energy | The sum of kinetic and potential energy of a system
SUM: Conservative forces do zero work round a closed path and have a potential energy.
SUM: Non-conservative work changes mechanical energy: ΔKE + ΔU = W_{nc}.
EV: established | The classification of forces as conservative or not is standard mechanics
SRC: OpenStax, University Physics Volume 1, section 8.2 "Conservative and Non-Conservative Forces" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/8-2-conservative-and-non-conservative-forces
SRC: OpenStax, University Physics Volume 1, section 8.3 "Conservation of Energy" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/8-3-conservation-of-energy
Q: How can you tell if a force is conservative? | The work round any closed path is zero (equivalently its curl is zero).
Q: Why can't friction have a potential energy? | The work it does depends on the path taken, not just the end points.
M1@1: Which force is non-conservative? | Air resistance | Gravity | Spring force | Electrostatic force | Drag always opposes motion, so the work it does depends on the path and speed, not only the end points.
M2@3: A ball thrown up returns to your hand slower than it left. This shows: | A non-conservative force (drag) acted | Gravity is non-conservative | Energy isn't conserved | Momentum was conserved | Gravity alone would return the ball at its launch speed; drag removed mechanical energy on the way.
NUM2@2: A 0.50 kg ball falls 10 m and lands at 12 m s^{-1} (g = 9.8). How much work did air resistance do, in joules (give the magnitude)? | 13 | 0.5 | J | mgh = 49 J; KE = ½ × 0.50 × 144 = 36 J; drag did −13 J of work.
M3@1,2: A box is pushed round a closed path on a rough floor back to its start. What is the total work done by friction? | Negative, and larger for a longer path | Zero, because the box returns to its start | Positive, because friction acts at the floor | Zero, because friction is perpendicular to the motion | Friction opposes motion all the way round, so its work is negative and grows with path length: the test of a non-conservative force.
SA2@2,3: A skier of mass 70 kg starts from rest and descends 40 m vertically, reaching 20 m s^{-1} at the bottom. Calculate the energy transferred by non-conservative forces and say where it goes. | Loss of PE = mgh = 70 × 9.8 × 40 = 27 400 J. Gain in KE = ½ × 70 × 20^{2} = 14 000 J. W_{nc} = ΔKE + ΔU = 14 000 − 27 400 = −13 400 J, so about 13 kJ was transferred by friction and air resistance, mostly to thermal energy of the snow, skis and air. | PE lost calculated ; KE gained calculated ; Difference about 13 kJ ; Energy goes to heating via friction and drag

## Power and efficiency
S: Power is the rate of transferring energy or doing work. Efficiency is the fraction of input energy that ends up in the useful form; the rest is "wasted", usually as heat.
O: Calculate power from energy and time, and from force and velocity
O: Calculate efficiency
O: Explain why efficiencies are below 100%
PRE: Work and energy
LV: GCSE and A level · Foundation
H: Formulas
E: P = dW/dt = E/t
E: P = F·v :: power delivered by a force on a moving object
E: η = useful output/total input (× 100%)
- 1 W = 1 J s^{-1}; 1 kWh = 3.6 MJ; 1 horsepower ≈ 746 W.
- Typical efficiencies: electric motor 85–95%, car petrol engine 25–35%, solar cell about 20%, human muscle about 25%.
X: A 1200 kg car climbs a 5% slope at a steady 20 m s^{-1} against 400 N of drag. Find the power output.
> Force along slope = mg sin θ + drag = 1200 × 9.8 × 0.05 + 400 = 988 N
> P = Fv = 988 × 20 ≈ 20 kW
H: Limits
P: No heat engine can be 100% efficient: the Carnot limit 1 − T_{c}/T_{h} applies. Electrical and mechanical conversions can approach 100% but never reach it.
K: Power is energy per second; at steady speed the driving power is force × velocity.
!: Efficiency can't exceed 100%. Heat pumps quoting "300%" use a coefficient of performance: they move heat rather than create it.
T: Power | The rate of transferring energy or doing work, in watts
T: Efficiency | Useful energy (or power) output divided by total input
SUM: P = E/t = Fv; 1 kWh = 3.6 MJ.
SUM: η = useful/total; the rest usually becomes thermal energy in the surroundings.
EV: established | Power and efficiency definitions are standard; the Carnot limit follows from the second law
SRC: OpenStax, University Physics Volume 1, section 7.4 "Power" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/7-4-power
SRC: AQA, A-level Physics specification (7408), section 3.4.1.7, Work, energy and power | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: How is the power delivered by a force on a moving object found? | P = F·v.
Q: What happens to the "wasted" energy in machines? | Mostly it's transferred to thermal energy in the surroundings.
M1@1: A 60 kg person climbs 3.0 m of stairs in 4.0 s. Power? | 441 W | 45 W | 180 W | 1764 W | P = mgh/t = 60 × 9.8 × 3.0/4.0 = 1764 J/4.0 s = 441 W.
M2@2: A motor takes 500 W and lifts 20 kg at 2.0 m s^{-1}. Efficiency? | 78% | 40% | 100% | 92% | Useful power = mgv = 20 × 9.8 × 2.0 = 392 W; η = 392/500 = 78%.
NUM1@1: A 2.0 kW kettle runs for 3.0 minutes. How much energy does it transfer, in kilojoules? | 360 | 1 | kJ | E = Pt = 2000 × 180 = 360 000 J = 360 kJ.
M3@1,3: A car's engine delivers 30 kW at a steady 25 m s^{-1} on a level road. What is the total resistive force? | 1200 N | 750 N | 30 000 N | 4800 N | At steady speed driving force = resistance, and P = Fv gives F = 30 000/25 = 1200 N.
SA2@2,3: A 60 W filament lamp and a 9 W LED give about the same light. Compare their efficiencies and explain where the rest of the energy goes. | Both give the same useful light output, so the LED wastes far less: if the useful light power is about 2 W, the filament lamp's efficiency is about 2/60 ≈ 3% and the LED's about 2/9 ≈ 20% or more. In both, the remaining energy heats the lamp and surroundings; the filament must be very hot to glow, so most of its output is infrared. | Same useful output ; Efficiency is useful over total ; LED far more efficient ; Waste goes to heating, mainly infrared for filament

## Momentum and impulse
S: Momentum p = mv measures the quantity of motion. A force changes momentum, and the total change is the impulse: force times time. Spreading a collision over a longer time reduces the force: that's how airbags, crumple zones and bent knees work.
O: Calculate momentum and momentum change, including direction changes
O: Use impulse = FΔt = Δp and the area under a force–time graph
O: Explain safety features using impulse
PRE: Newton's laws of motion
LV: GCSE and A level · Application
H: Definitions
E: p = mv
E: J = ∫F dt = Δp :: impulse–momentum theorem
E: F_{avg} = Δp/Δt
- Area under a force–time graph = impulse.
- Momentum is a vector; direction changes count (a ball bouncing straight back has Δp = 2mv).
X: A 0.15 kg ball at 30 m s^{-1} is caught and stopped in 0.05 s. Find the average force. If the catcher's hands move back to stop it in 0.20 s?
> Δp = 4.5 kg m s^{-1}
> F = 4.5/0.05 = 90 N; with 0.20 s, F = 22.5 N
H: Spreading the force
K: For a fixed momentum change, a longer stopping time means a smaller average force.
!: Bouncing back produces a larger momentum change (and force) than stopping: Δp = m(v_{f} − v_{i}) with signs.
P: **Investigate with the lab.** Run a sticky collision and read the momentum of each glider before and after. Work out the impulse on each glider: it is the change in its momentum.
IX: collisions
T: Momentum | Mass times velocity, a vector, in kg m s^{-1}
T: Impulse | Force times the time it acts (∫F dt), equal to the change in momentum, in N s
SUM: p = mv; impulse FΔt = Δp, the area under F–t.
SUM: Extending collision time (airbags, crumple zones) reduces the force for the same Δp.
EV: established | The impulse–momentum theorem is Newton's second law integrated over time
SRC: OpenStax, University Physics Volume 1, section 9.2 "Impulse and Collisions" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/9-2-impulse-and-collisions
SRC: AQA, A-level Physics specification (7408), section 3.4.1.6, Momentum | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What is impulse? | The product of force and time (∫F dt), equal to the change in momentum.
Q: How do crumple zones reduce injury? | They increase the collision time, reducing the average force for the same momentum change.
M1@1: A 0.1 kg ball hits a wall at 10 m s^{-1} and rebounds at 10 m s^{-1}. Momentum change? | 2 kg m s^{-1} | 0 | 1 kg m s^{-1} | 20 kg m s^{-1} | Δp = m(v_{f} − v_{i}) = 0.1 × (10 − (−10)) = 2 kg m s^{-1}: the direction reverses.
M2@2: A force–time graph is a triangle of peak 400 N and duration 0.02 s. Impulse? | 4 N s | 8 N s | 400 N s | 2 N s | Impulse is the area under the graph: ½ × 0.02 × 400 = 4 N s.
M2@2: Glider A's momentum changes by −0.6 kg m/s in a collision. What is the change in glider B's momentum? | +0.6 kg m/s | −0.6 kg m/s | 0 kg m/s | It can't be known without the masses | By Newton's third law the impulses are equal and opposite, so B gains what A loses.
NUM2@1,2: A 0.45 kg football is kicked from rest to 20 m s^{-1}; contact lasts 0.010 s. What is the average force, in newtons? | 900 | 5 | N | Δp = 0.45 × 20 = 9.0 kg m s^{-1}; F = Δp/Δt = 9.0/0.010 = 900 N.
M3@3: Why does a gymnast land on a thick mat rather than a hard floor? | The mat lengthens the stopping time, so the force is smaller for the same Δp | The mat reduces the gymnast's change in momentum | The mat absorbs the gymnast's momentum completely | The mat removes the need for any impulse | Δp is fixed by the landing speed; spreading it over a longer time reduces F = Δp/Δt.
SA2@1,3: Explain, using impulse and momentum, how a car airbag reduces injury in a crash. | In a crash the occupant's momentum must fall from mv to zero, a fixed change. Without an airbag this can happen in a very short time when the head hits the dashboard, giving a large force. The airbag inflates and deforms as the occupant moves into it, increasing the stopping time and spreading the force over a larger area. Since F = Δp/Δt, the average force, and so the pressure on the body, is reduced. | Momentum change fixed ; Airbag increases stopping time ; F = delta p over delta t smaller ; Larger area reduces pressure

## Conservation of momentum
S: If no net external force acts on a system, its total momentum is constant. This follows from Newton's third law (internal forces cancel in pairs) and, more deeply, from the uniformity of space.
O: State the conditions for momentum conservation
O: Apply conservation of momentum to collisions, recoil and explosions in one dimension
O: Explain why momentum is conserved using Newton's third law
PRE: Momentum and impulse
LV: GCSE and A level · Application
H: The law
E: Σp_{initial} = Σp_{final} :: isolated system
- Holds in collisions, explosions, recoil, rocket propulsion and particle decays.
- Short collisions: external forces like gravity or friction act only briefly, so momentum is almost conserved during impact.
- Applies to each component separately: in 2D you get two equations.
X: A 50 g bullet is fired at 400 m s^{-1} from a 4.0 kg rifle. Find the recoil speed.
> 0 = 0.05 × 400 + 4.0v
> v = −5.0 m s^{-1} (backwards)
H: Why it's conserved
P: Internal forces come in third-law pairs, so their impulses cancel in the total. Noether's theorem gives the deeper reason: the laws of physics are the same everywhere in space.
K: Total momentum before = total momentum after, for any system with no net external force.
!: Momentum is conserved only for the whole isolated system; the momentum of one part (the bullet alone) certainly changes.
P: **Investigate with the lab.** Try every challenge, and in each one compare the total momentum before and after. It never changes, whatever the restitution.
IX: collisions
T: Isolated system | A system on which no net external force acts
T: Recoil | The backward motion of a body when it ejects or launches another forward
SUM: With no net external force, total momentum is constant, component by component.
SUM: It follows from Newton's third law; explosions from rest share equal and opposite momenta.
EV: established | Conservation of momentum has no known exceptions for isolated systems
SRC: OpenStax, University Physics Volume 1, section 9.3 "Conservation of Linear Momentum" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/9-3-conservation-of-linear-momentum
SRC: AQA, A-level Physics specification (7408), section 3.4.1.6, Momentum | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: When is the total momentum of a system conserved? | When the net external force on it is zero.
Q: Why does a gun recoil? | Total momentum stays zero, so the gun gains backward momentum equal to the bullet's forward momentum.
M1@2: A 2 kg cart at 3 m s^{-1} couples to a stationary 4 kg cart. Final speed? | 1 m s^{-1} | 1.5 m s^{-1} | 3 m s^{-1} | 2 m s^{-1} | Momentum before 2 × 3 = 6 kg m s^{-1} = (2 + 4)v, so v = 1 m s^{-1}.
M2@3: An astronaut throws a tool to move back towards the ship. This uses: | Conservation of momentum | Conservation of energy only | Air resistance | Gravity | Throwing the tool one way gives the astronaut equal and opposite momentum, with nothing to push against.
M2@1: In which collisions on a frictionless track is total momentum conserved? | All of them: elastic, sticky and explosions | Only elastic collisions | Only collisions where the gliders stick | Only collisions between equal masses | With no external horizontal force, total momentum is always conserved.
NUM2@2: A 1200 kg car at 15 m s^{-1} hits a stationary 800 kg car and they lock together. What is their speed just after, in m s^{-1}? | 9 | 0.05 | m s^{-1} | 1200 × 15 = (1200 + 800)v, so v = 18 000/2000 = 9.0 m s^{-1}.
M3@1,3: A ball falls towards the Earth. Why is the ball's momentum not conserved, and what system conserves it? | Gravity is an external force on the ball; the ball–Earth system conserves momentum | Energy is lost to air, so no system conserves momentum | Momentum is only conserved in collisions | The ball's momentum is conserved because its mass is constant | For the ball–Earth system the gravitational forces are internal third-law pairs, so the Earth gains tiny equal upward momentum.
SA2@2,3: Explain, using Newton's laws, why the total momentum of two colliding trolleys is conserved. | During the collision trolley A exerts a force on B and B exerts an equal and opposite force on A (third law), for the same time. So the impulses on them are equal and opposite and their momentum changes are equal and opposite (second law, FΔt = Δp). The changes cancel, so the total momentum is unchanged, provided no net external force (e.g. friction) acts. | Third law equal and opposite forces ; Same contact time ; Equal and opposite momentum changes ; No external force condition

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
P: **Investigate with the lab.** Start both gliders at rest and set off the explosion. Check that total momentum stays zero while kinetic energy appears from nowhere in the lab's bookkeeping.
IX: collisions
Q: In an explosion from rest, which fragment gets more kinetic energy? | The lighter one.
Q: What is a perfectly inelastic collision? | One in which the bodies stick together, losing the maximum kinetic energy.
M1: In which type of collision is KE conserved? | Elastic | Inelastic | Perfectly inelastic | Explosion | By definition.
M2: A uranium-238 nucleus at rest emits an alpha particle (mass 4). The daughter's KE is roughly what fraction of the total? | 2% | 50% | 98% | 0 | KE ratio = mass ratio inverted: 4/234 of the alpha's.
M2: Two gliders at rest push apart. Glider A (1 kg) moves at 3 m/s. How fast does glider B (2 kg) move? | 1.5 m/s the other way | 3 m/s the other way | 6 m/s the other way | 1.5 m/s the same way | Total momentum stays zero: 1 × 3 = 2 × v, so v = 1.5 m/s in the opposite direction.

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
P: **Investigate with the lab.** Set restitution to 1, then to 0, with the same starting velocities. Compare the kinetic energy after each collision with the energy before.
IX: collisions
Q: What is the coefficient of restitution? | The ratio of relative speed of separation to relative speed of approach.
Q: What happens when equal masses collide elastically, one at rest? | They exchange velocities.
M1: A ball with e = 0.5 is dropped from 4 m. It rebounds to: | 1 m | 2 m | 0.5 m | 3 m | h = e^{2} × 4.
M2: A neutron collides elastically head-on with a stationary carbon-12 nucleus. What fraction of its speed does it keep? | 11/13 | 1/12 | 1/2 | 0 | v_{1} = (1 − 12)/(1 + 12) u: magnitude 11/13. This is why moderators use light nuclei.
M2: What is conserved in a perfectly inelastic collision? | Momentum, but not kinetic energy | Kinetic energy, but not momentum | Both momentum and kinetic energy | Neither momentum nor kinetic energy | Momentum is always conserved; when objects stick, the most kinetic energy possible is lost.

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
P: **Investigate with the lab.** Watch the centre-of-mass marker during an explosion and a sticky collision. However the gliders move, the centre of mass carries on at constant velocity.
IX: collisions
Q: How does the centre of mass of a system move? | As if all the mass were there and all external forces acted there.
Q: When is an object resting on a base stable? | When the vertical line through its centre of mass passes within its base.
M1: A uniform 4 m plank has a 20 kg child at one end; the plank is 10 kg. CM from that end? | 0.67 m | 2 m | 1 m | 1.33 m | (20 × 0 + 10 × 2)/30.
M2: A firework explodes mid-air. The CM of the fragments: | Continues on the original trajectory | Stops | Moves straight down | Moves upward | Only external forces (gravity) affect CM motion.
M2: Two gliders collide on a frictionless track. What happens to the velocity of their centre of mass? | It stays the same throughout | It drops to zero at the moment of impact | It reverses direction after the collision | It doubles during the collision | With no external force, the centre of mass moves at constant velocity.

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
P: **Investigate with the lab.** Launch with drag on and watch the horizontal velocity fall during the flight. Compare the shape of the path: it is no longer a symmetric parabola.
IX: projectile
Q: What is the time constant for linear drag? | τ = m/b.
Q: Does a body coasting under quadratic drag ever stop? | Not in finite time in the ideal model; its speed falls as 1/t.
M1: With linear drag, after one time constant a falling object reaches: | 63% of terminal velocity | 37% | 100% | 50% | 1 − 1/e.
M2: Terminal velocity under quadratic drag scales with mass as: | √m | m | m^{2} | 1/m | v_{t} = √(mg/c).
M2: With quadratic drag, how does the descending half of a trajectory compare with the rising half? | It is steeper, because the ball has lost horizontal speed | It is a mirror image, as in drag-free motion | It is flatter, because drag pushes the ball forward | It is identical, since drag cancels out over a flight | Drag steadily removes horizontal speed, so the ball falls more steeply than it rose.

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
P: **Investigate with the lab.** Launch straight down from a height with drag on and watch the vertical speed level off. Compare the terminal speed on Earth and on Jupiter.
IX: projectile
Q: What is the condition for terminal velocity? | Drag (plus buoyancy) balances weight, so the net force is zero.
Q: How did Millikan use terminal velocity? | Stokes' law gave each drop's radius and hence mass from its terminal speed.
M1: At terminal velocity, a skydiver's acceleration is: | Zero | g | g/2 | Increasing | Forces balance.
M2: Under Stokes' law, doubling a sphere's radius changes v_{t} by: | ×4 | ×2 | ×8 | ×√2 | v_{t} ∝ r^{2}.
M2: What happens at terminal velocity? | Drag equals weight, so the acceleration is zero | The ball stops accelerating because gravity switches off | The speed keeps rising at a constant rate | Drag becomes larger than weight forever | When drag balances weight, the resultant force and so the acceleration are zero.

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
