// Unit 4: Classical Mechanics. Format: kit/course/notes.js
export default `
## Position, displacement, distance and time
S: Position locates an object relative to an origin; displacement is the change in position (a vector); distance is the total path length travelled (a scalar). Kinematics describes motion in these terms before asking what causes it.
LV: Introductory · Foundation
O: Distinguish position, displacement and distance
O: Read displacement and distance from a position–time graph
PRE: Scalar and vector quantities
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
T: Displacement | The change in position, a vector from start to finish
T: Distance | The total length of path travelled, a scalar
SUM: Displacement depends only on the start and end; distance adds up every part of the path.
SUM: On a position–time graph the change in height is the displacement.
SRC: OpenStax, University Physics Volume 1, section 3.1 "Position, Displacement, and Average Velocity" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/3-1-position-displacement-and-average-velocity
SRC: Halliday D., Resnick R., Walker J., Fundamentals of Physics, 10th edition, chapter 2 | secondary | 2013
EV: established | These are standard definitions of kinematics.
Q: An athlete runs one full lap of a 400 m track. What are the distance and displacement? | Distance 400 m; displacement zero.
M3@1,2: A car drives 5 km north then 12 km south. What are its distance and displacement? | 17 km; 7 km south | 17 km; 7 km north | 7 km; 17 km south | 13 km; 7 km south | Distance adds the legs (5 + 12); displacement is the net change: 12 − 5 = 7 km south.
SA2@1,2: A position–time graph rises from x = 0 to x = 6 m in 3 s, then falls to x = 2 m at 5 s. Find the distance and displacement over 5 s. | Distance: 6 m out plus 4 m back = 10 m. Displacement: final minus initial position, 2 − 0 = 2 m in the positive direction. | 6 m out ; 4 m back ; distance 10 m ; displacement +2 m

## Speed and velocity
S: Speed is the rate of change of distance; velocity is the rate of change of displacement, with direction. Instantaneous velocity is the derivative of position, and it is always tangent to the path.
LV: Introductory · Foundation
O: Calculate average speed and average velocity
O: Find instantaneous velocity from the gradient of a position–time graph
PRE: Position, displacement, distance and time
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
T: Average velocity | Displacement divided by the time taken
T: Instantaneous velocity | The rate of change of position at an instant: v = dx/dt
SUM: Average speed = distance/time; average velocity = displacement/time.
SUM: The gradient of the tangent to a position–time graph is the instantaneous velocity.
SRC: OpenStax, University Physics Volume 1, section 3.2 "Instantaneous Velocity and Speed" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/3-2-instantaneous-velocity-and-speed
SRC: Halliday D., Resnick R., Walker J., Fundamentals of Physics, 10th edition, chapter 2 | secondary | 2013
EV: established | Standard definitions.
Q: What does the gradient of a position–time graph give? | The velocity.
M3@1,2: A cyclist rides 6 km at 12 km h^{-1}, then 6 km at 6 km h^{-1}. What is the average speed? | 8 km h^{-1} | 9 km h^{-1}, the mean of the two speeds | 6 km h^{-1}, the slower speed | 10 km h^{-1}, weighted by distance | Times are 0.5 h and 1 h, so 12 km in 1.5 h = 8 km h^{-1}; more time is spent at the lower speed.
SA2@2: Explain why a car's speedometer can read 50 km h^{-1} all the way round a roundabout while its velocity changes. | Speed is the magnitude of velocity. Going round, the magnitude stays 50 km h^{-1} but the direction keeps changing, so the velocity vector changes (and the car is accelerating towards the centre). | speed is magnitude only ; direction changes ; velocity is a vector ; so velocity changes and there's acceleration

## Acceleration
S: Acceleration is the rate of change of velocity. It can change an object's speed, its direction, or both, and by Newton's second law it is always caused by a net force.
LV: Introductory · Foundation
O: Calculate acceleration from changes in velocity
O: Interpret velocity–time graphs: gradient as acceleration, area as displacement
PRE: Speed and velocity
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
T: Acceleration | The rate of change of velocity: a = dv/dt
T: Deceleration | Informal name for an acceleration opposite to the velocity, so the object slows down
SUM: a = Δv/Δt; a change of direction at constant speed is still an acceleration.
SUM: On a velocity–time graph, gradient = acceleration and area = displacement.
SRC: OpenStax, University Physics Volume 1, section 3.3 "Average and Instantaneous Acceleration" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/3-3-average-and-instantaneous-acceleration
SRC: Halliday D., Resnick R., Walker J., Fundamentals of Physics, 10th edition, chapter 2 | secondary | 2013
EV: established | Standard definitions.
Q: Can an object have zero velocity and non-zero acceleration? | Yes: a ball at the top of its flight has v = 0 but a = g downwards.
M3@2: A ball hits a wall at 8 m s^{-1} and rebounds at 6 m s^{-1} after 0.050 s of contact. What is its average acceleration? | 280 m s^{-2} away from the wall | 40 m s^{-2} away from the wall, from (8 − 6)/0.05 | 280 m s^{-2} towards the wall | 160 m s^{-2}, using only the incoming speed | Δv = 6 − (−8) = 14 m s^{-1} (direction reverses), so a = 14/0.050 = 280 m s^{-2}.
SA2@1,2: A velocity–time graph is a straight line from 0 to 20 m s^{-1} in 4 s. Find the acceleration and the displacement. | Gradient: a = 20/4 = 5.0 m s^{-2}. Area under the line: ½ × 4 × 20 = 40 m. | gradient gives a ; a = 5.0 m s^{-2} ; area gives displacement ; 40 m

## Motion in one dimension
S: Straight-line motion is described by signed position, velocity and acceleration along one axis. With calculus you can get any of x(t), v(t), a(t) from another, and graphs make the relationships visible.
LV: Introductory · Foundation
O: Use signed quantities consistently for motion along a line
O: Get velocity and position from acceleration by integration, using initial conditions
PRE: Acceleration
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
T: Sign convention | A choice of positive direction applied to every vector quantity in a problem
T: Initial condition | A known value, such as x(0) or v(0), that fixes the constant of integration
SUM: Choose a positive direction and keep it: g is −9.81 m s^{-2} if up is positive.
SUM: v = ∫a dt + v_{0}; x = ∫v dt + x_{0}.
SRC: OpenStax, University Physics Volume 1, section 3.6 "Finding Velocity and Displacement from Acceleration" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/3-6-finding-velocity-and-displacement-from-acceleration
SRC: Kleppner D., Kolenkow R., An Introduction to Mechanics, 2nd edition, chapter 1, Cambridge University Press | secondary | 2014
EV: established | Standard kinematics.
Q: If up is positive, what sign is the acceleration of a ball thrown upwards, while it rises? | Negative: −g, throughout its flight.
M3@2,3: A particle has a = 6t m s^{-2}, starting at rest from x = 0. Where is it at t = 2 s? | 8 m | 12 m, from ½at^{2} with a = 6 | 24 m, from 6t^{2} | 4 m, from 3t^{2}/3 | v = 3t^{2}, x = t^{3}; at t = 2 s, x = 8 m. The suvat equations don't apply because a isn't constant.
SA2@1: A stone is dropped from a cliff and hits the sea 3.0 s later. Taking down as positive and g = 9.8 m s^{-2}, find the cliff height and impact speed. | s = ½gt^{2} = ½ × 9.8 × 9.0 ≈ 44 m. v = gt = 9.8 × 3.0 ≈ 29 m s^{-1}. (Air resistance neglected.) | s = ½gt^{2} ; about 44 m ; v = gt ; about 29 m s^{-1}

## Motion in two and three dimensions
S: In two and three dimensions position, velocity and acceleration are vectors. The key insight is that perpendicular components evolve independently, so a 2D problem is two 1D problems linked by time.
---
M3@1,2: A particle has velocity (4, 0) m s^{-1} and constant acceleration (0, 2) m s^{-2}. What is its speed after 2 s? | About 5.7 m s^{-1} | 8 m s^{-1}, adding 4 and 2 × 2 | 4 m s^{-1}, unchanged horizontally | 6 m s^{-1}, from 4 + 2 | After 2 s the velocity is (4, 4) m s^{-1}; its magnitude is √32 ≈ 5.7 m s^{-1}.
LV: Introductory · Application
O: Treat perpendicular components of motion independently
O: Combine component results into a velocity or displacement vector
PRE: Motion in one dimension
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
P: **Investigate with the lab.** Watch the velocity arrows during a drag-free flight: the horizontal part stays constant while the vertical part changes steadily. Then compare a throw on Earth with the same throw on the Moon.
IX: projectile
Q: Why can perpendicular components of motion be treated separately? | They obey independent equations of motion linked only by time.
Q: Which way does acceleration point on a curved path at constant speed? | Towards the centre of curvature, perpendicular to the velocity.
M1: r(t) = (2t^{2}, 3t). What is the acceleration? | (4, 0) | (4t, 3) | (2, 3) | (0, 0) | Differentiate twice.
M2: A particle moves in a circle at constant speed. Which is true? | Velocity changes, speed doesn't | Velocity is constant | Acceleration is zero | Acceleration is tangential | The direction keeps changing.
M2: In drag-free projectile motion, which part of the velocity stays constant? | The horizontal component | The vertical component | The speed | Both components | Gravity acts only vertically, so with no air resistance nothing changes the horizontal velocity.
T: Position vector | r = xî + yĵ + zk̂, locating a point relative to the origin
T: Independence of components | Motion along perpendicular axes evolves separately when the forces are separable
SUM: Split into x and y, solve each as 1D, then recombine.
SUM: v = dr/dt and a = dv/dt apply component by component.
SRC: OpenStax, University Physics Volume 1, chapter 4 "Motion in Two and Three Dimensions" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/4-introduction
SRC: Kleppner D., Kolenkow R., An Introduction to Mechanics, 2nd edition, chapter 1, Cambridge University Press | secondary | 2014
EV: established | Standard kinematics.
Q: What is the speed of an object with velocity (3, 4, 12) m s^{-1}? | √(9 + 16 + 144) = 13 m s^{-1}.
SA2@1,2: A particle's position is r = (2t, 3t^{2}) m. Find its velocity and acceleration at t = 1 s. | v = dr/dt = (2, 6t), so (2, 6) m s^{-1} with speed √40 ≈ 6.3 m s^{-1}. a = (0, 6) m s^{-2}, constant. | differentiate each component ; v = (2, 6) m s^{-1} ; a = (0, 6) m s^{-2} ; speed about 6.3 m s^{-1}

## Kinematic equations
S: For constant acceleration, five quantities (s, u, v, a, t) are linked by the suvat equations. Each equation leaves out one quantity, so pick the one missing the variable you neither know nor need.
---
M3@1,2: A ball is thrown up at 15 m s^{-1} from a 20 m cliff top. When does it hit the ground below (g = 9.8 m s^{-2})? | About 4.0 s | About 1.5 s, the time to the top | About 3.1 s, twice the rise time | About 2.0 s, from the cliff height alone | Up positive: −20 = 15t − 4.9t^{2}, so 4.9t^{2} − 15t − 20 = 0 and t ≈ 4.0 s (the positive root).
LV: Introductory · Application
O: Choose the suvat equation that omits the unknown you don't need
O: Recognise when the suvat equations don't apply
PRE: Motion in one dimension
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
P: **Investigate with the lab.** With air resistance off, launch horizontally from a height and time the flight. Check the time against h = ½gt² for the vertical motion alone.
IX: projectile
Q: Which suvat equation has no time? | v^{2} = u^{2} + 2as.
Q: When are the suvat equations valid? | Only for constant acceleration.
M1: A stone dropped from rest falls for 3.0 s (g = 9.8). How far? | 44 m | 29 m | 88 m | 15 m | s = ½ × 9.8 × 9.
M2: Stopping distance at speed u with fixed deceleration scales as: | u^{2} | u | √u | u^{3} | s = u^{2}/(2a): double speed, four times the distance.
M2: A ball is thrown horizontally from a 20 m cliff (g = 9.8 m/s²). Roughly how long is it in the air? | About 2.0 s | About 4.1 s | About 1.0 s | It depends on the throwing speed | Vertical motion is independent: t = √(2h/g) = √(40/9.8) ≈ 2.0 s.
T: suvat | The constant-acceleration equations linking displacement s, initial velocity u, final velocity v, acceleration a and time t
SUM: v = u + at; s = ut + ½at^{2}; v^{2} = u^{2} + 2as; s = ½(u + v)t; s = vt − ½at^{2}.
SUM: They hold only for constant acceleration.
T: Constant acceleration | Acceleration that doesn't change in size or direction over the motion
SRC: OpenStax, University Physics Volume 1, section 3.4 "Motion with Constant Acceleration" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/3-4-motion-with-constant-acceleration
SRC: Halliday D., Resnick R., Walker J., Fundamentals of Physics, 10th edition, chapter 2 | secondary | 2013
EV: established | Exact for constant acceleration.
Q: Which suvat equation has no time in it? | v^{2} = u^{2} + 2as.
SA2@1: A car at 25 m s^{-1} brakes uniformly to rest in 50 m. Find its deceleration and the braking time. | v^{2} = u^{2} + 2as: 0 = 625 + 100a, so a = −6.25 m s^{-2}. t = (v − u)/a = −25/−6.25 = 4.0 s. | v^{2} = u^{2} + 2as ; a = −6.25 m s^{-2} ; v = u + at ; t = 4.0 s

## Projectile motion
S: A projectile moves under gravity alone: constant velocity horizontally and constant acceleration g vertically. The path is a parabola, and range, height and time of flight all follow from separating the components.
LV: Introductory · Application
O: Resolve a launch velocity and treat horizontal and vertical motion separately
O: Calculate time of flight, maximum height and range
PRE: Kinematic equations
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
P: **Investigate with the lab.** Turn air resistance off and launch at several angles at the same speed. Find the angle that gives the greatest range, then check that 30° and 60° land in the same place.
IX: projectile
Q: What angle gives maximum range on level ground (no drag)? | 45°.
Q: What is the velocity at the top of the trajectory? | Horizontal, equal to u cos θ.
M1: A ball rolls off a 1.25 m high table at 2.0 m s^{-1} (g = 10). How far from the table does it land? | 1.0 m | 0.5 m | 2.0 m | 2.5 m | Fall time 0.5 s; 2.0 × 0.5 = 1.0 m.
M2: Two projectiles are launched at the same speed at 20° and 70°. Which lands farther? | Same range | 20° | 70° | Depends on mass | sin 40° = sin 140°.
M3: A monkey drops from a branch at the instant a dart is fired straight at it. The dart: | Hits the monkey (both fall the same distance in the same time) | Passes above | Passes below | Hits only if fired at 45° | Gravity deflects both equally.
M2: Without air resistance, which pair of launch angles gives the same range at the same speed? | 30° and 60° | 30° and 45° | 20° and 40° | 45° and 90° | Range depends on sin 2θ, and sin 60° = sin 120°, so complementary angles give equal ranges.
T: Time of flight | The time a projectile spends in the air
T: Range | The horizontal distance travelled before landing
SUM: Horizontal: constant velocity u cos θ. Vertical: constant acceleration −g from u sin θ.
SUM: On level ground, R = u^{2} sin 2θ/g, greatest at 45° without air resistance.
SRC: OpenStax, University Physics Volume 1, section 4.3 "Projectile Motion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/4-3-projectile-motion
SRC: Halliday D., Resnick R., Walker J., Fundamentals of Physics, 10th edition, chapter 4 | secondary | 2013
EV: established | Exact without air resistance; drag shortens the range and lowers the best angle.
Q: Which two launch angles give the same range on level ground? | Complementary angles, such as 30° and 60°, because sin 2θ is the same.
SA2@1,2: A ball is kicked at 20 m s^{-1} at 30° above level ground. Find its time of flight and range (g = 9.8 m s^{-2}). | Vertical: u_{y} = 10 m s^{-1}, so t = 2u_{y}/g = 20/9.8 ≈ 2.0 s. Horizontal: u_{x} = 20 cos 30° ≈ 17.3 m s^{-1}; R = 17.3 × 2.04 ≈ 35 m. | components 10 and 17.3 m s^{-1} ; t ≈ 2.0 s ; R = u_{x}t ; about 35 m

## Relative motion
S: Velocities are measured relative to a frame. The velocity of A relative to C equals A relative to B plus B relative to C, the Galilean addition rule, valid when speeds are much less than c.
LV: Introductory · Application
O: Add relative velocities with the rule v_{AC} = v_{AB} + v_{BC}
O: Solve river-crossing and wind problems with vector diagrams
PRE: Motion in two and three dimensions
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
T: Relative velocity | The velocity of one object as measured from another
T: Galilean transformation | v′ = v − V for frames moving at V relative to each other, valid when speeds are much less than c
SUM: v_{AC} = v_{AB} + v_{BC}, as vectors.
SUM: To cross a river in the shortest time, head straight across; to land directly opposite, angle upstream.
SRC: OpenStax, University Physics Volume 1, section 4.5 "Relative Motion in One and Two Dimensions" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/4-5-relative-motion-in-one-and-two-dimensions
SRC: Kleppner D., Kolenkow R., An Introduction to Mechanics, 2nd edition, Cambridge University Press | secondary | 2014
EV: established | Galilean addition is accurate for speeds much less than c; relativity replaces it near c.
Q: Two trains approach each other at 30 and 40 m s^{-1}. What is their relative speed? | 70 m s^{-1}.
M3@2: A boat moves at 5 m s^{-1} relative to water in a river flowing at 3 m s^{-1}. What heading lands it directly opposite? | 37° upstream from straight across, at 4 m s^{-1} over the ground | Straight across, at 5 m s^{-1} over the ground | 53° upstream, at 3 m s^{-1} over the ground | 37° downstream, at 4 m s^{-1} over the ground | The upstream component must cancel the current: 5 sin θ = 3, θ ≈ 37°; the cross component is 4 m s^{-1}.
SA2@2: Rain falls vertically at 8 m s^{-1}. A cyclist rides at 6 m s^{-1}. At what angle does the rain appear to fall to the cyclist? | Relative to the cyclist the rain has velocity (−6, −8) m s^{-1}: speed 10 m s^{-1}, at tan^{-1}(6/8) ≈ 37° from vertical, slanting towards the cyclist's face. | subtract the cyclist's velocity ; components 6 and 8 ; speed 10 m s^{-1} ; about 37° from vertical

## Reference frames
S: A reference frame is a viewpoint with its own clocks and rulers from which motion is measured. Choosing a convenient frame (the centre of mass, a moving train, a rotating Earth) can make a problem far simpler, as long as you account correctly for the frame's own motion.
LV: Introductory · Foundation
O: Describe the same motion in different reference frames
O: Choose a frame that simplifies a problem
PRE: Relative motion
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
T: Reference frame | A coordinate system with clocks and rulers from which motion is measured
T: Centre-of-mass frame | The frame in which a system's total momentum is zero
SUM: Positions and velocities depend on the frame; accelerations are the same in all inertial frames.
SUM: The centre-of-mass frame often makes collisions symmetric and simple.
SRC: OpenStax, University Physics Volume 1, section 4.5 "Relative Motion in One and Two Dimensions" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/4-5-relative-motion-in-one-and-two-dimensions
SRC: Kleppner D., Kolenkow R., An Introduction to Mechanics, 2nd edition, chapter 8, Cambridge University Press | secondary | 2014
EV: established | Standard classical mechanics.
Q: Do two inertial observers agree on an object's acceleration? | Yes (in Newtonian mechanics): their relative velocity is constant, so accelerations are the same.
M3@2: A passenger drops a ball in a train moving steadily at 30 m s^{-1}. What path does someone on the platform see? | A parabola: the ball keeps the train's horizontal velocity as it falls | A straight vertical line downwards | A straight line slanting backwards | A circle, because the train is moving | In the train it falls straight down; on the platform it also moves forwards at 30 m s^{-1}, tracing a parabola.
SA2@1,2: Explain why the kinetic energy of an object depends on the reference frame but the work–energy theorem still holds in each frame. | Kinetic energy uses the speed, which differs between frames, so KE differs. In each inertial frame Newton's laws hold, and the work done (force × displacement measured in that frame) equals the change in that frame's KE, so the theorem holds in every inertial frame even though the numbers differ. | speed is frame-dependent ; so KE differs ; Newton's laws hold in every inertial frame ; work and KE change agree within each frame

## Newton's laws of motion
S: Newton's three laws connect force and motion. They define what force does (changes momentum), give a quantitative rule (F = dp/dt), and insist forces come in equal and opposite pairs between objects.
LV: Introductory · Foundation
O: State Newton's three laws and apply the second law as F = dp/dt
O: Identify Newton's third-law pairs correctly
PRE: Acceleration
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
T: Inertia | The tendency of a body to keep its velocity unless a net force acts
T: Newton's third-law pair | Two forces equal and opposite, of the same type, acting on two different bodies
T: Newton | The force giving a 1 kg mass an acceleration of 1 m s^{-2}
SUM: First law: no net force, no change in velocity. Second: F_{net} = dp/dt = ma for constant mass. Third: forces come in equal, opposite pairs on different bodies.
SUM: Third-law forces never cancel each other, because they act on different bodies.
SRC: Newton I., Philosophiæ Naturalis Principia Mathematica, London | primary | 1687
SRC: OpenStax, University Physics Volume 1, chapter 5 "Newton's Laws of Motion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/5-introduction
EV: established | Newton's laws are exact for speeds much less than c and outside quantum scales.
Q: What is the third-law partner of the Earth's gravitational pull on you? | Your gravitational pull on the Earth.
M3@2,3: A book rests on a table. Which pair is a Newton's third-law pair? | The table pushes up on the book; the book pushes down on the table | The book's weight and the table's push on the book | The book's weight and the table's weight | The table's push on the book and the floor's push on the table | Third-law pairs act on different bodies and are the same kind of force (here both contact forces); weight and normal force act on the same body.
SA2@1,2: A horse pulls a cart. A student says, "By the third law the cart pulls back equally, so they can't move." Explain the error. | The two forces act on different bodies, so they don't cancel. The cart moves because the horse's pull on it exceeds friction on the cart; the horse moves because the ground's forward friction on its hooves exceeds the cart's pull back on it. | third-law forces act on different bodies ; they don't cancel ; consider forces on each body separately ; ground friction drives the horse

## Inertial and non-inertial frames
S: Newton's laws hold as written only in inertial frames. In an accelerating or rotating frame, objects seem to accelerate with no force acting, so you must add fictitious (inertial) forces to use F = ma.
LV: Intermediate · Foundation
O: Distinguish inertial from non-inertial frames
O: Use fictitious forces to analyse motion in an accelerating or rotating frame
PRE: Newton's laws of motion
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
T: Inertial frame | A frame in which an object with no net force moves at constant velocity
T: Fictitious force | An apparent force (such as centrifugal or Coriolis) needed to use Newton's laws in an accelerating frame
SUM: In a frame accelerating at A, add −mA to every object.
SUM: Rotating frames add centrifugal (mω^{2}r outwards) and Coriolis (−2mω × v) forces.
SRC: Kleppner D., Kolenkow R., An Introduction to Mechanics, 2nd edition, chapter 9, Cambridge University Press | secondary | 2014
SRC: OpenStax, University Physics Volume 1, section 6.3 "Centripetal Force" (inertial and non-inertial frames) | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/6-3-centripetal-force
EV: established | Standard classical mechanics; the Earth is only approximately inertial.
Q: Why does a passenger lurch forward when a bus brakes? | In the bus's decelerating frame a fictitious force acts forwards; from the ground, the passenger simply keeps moving while the bus slows.
M3@2,3: A pendulum hangs in a train accelerating at 2.0 m s^{-2}. At what angle from vertical does it hang? | About 12° towards the back | About 12° towards the front | 0°, since gravity is vertical | About 78° towards the back | In the train frame a fictitious force −mA points backwards: tan θ = A/g = 2.0/9.8, θ ≈ 12°.
SA2@2: Explain, from the ground frame, why you feel pushed outwards on a fast roundabout. | From the ground there is no outward force. Your body tends to move in a straight line (first law); the roundabout must provide an inward centripetal force through your grip and seat. You feel that inward push and interpret it as being thrown outwards. | no outward force in the ground frame ; inertia keeps you moving straight ; inward centripetal force needed ; centrifugal is a frame effect

## Free-body diagrams
S: A free-body diagram shows one object, isolated, with every external force acting on it drawn as an arrow from its point of action. It's the essential first step in any force problem.
LV: Introductory · Foundation
O: Draw a free-body diagram showing every external force on one body
O: Use it to write Newton's second law in components
PRE: Newton's laws of motion
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
T: Free-body diagram | A sketch of one isolated body with arrows for every external force acting on it
T: Net force | The vector sum of all forces on a body
SUM: Isolate one body, draw only forces acting on it, label each by its cause, then resolve.
SUM: Never put ma on the diagram as a force; it is the result of the forces.
SRC: OpenStax, University Physics Volume 1, section 5.7 "Drawing Free-Body Diagrams" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/5-7-drawing-free-body-diagrams
SRC: Knight R. D., Physics for Scientists and Engineers, 4th edition, chapter 5, Pearson | secondary | 2017
EV: established | Standard method of mechanics.
Q: Should a free-body diagram include the forces a body exerts on other things? | No: only forces acting on the body itself.
M3@2: A lift accelerates upwards at 2.0 m s^{-2}. What is the normal force on a 60 kg passenger (g = 9.8 m s^{-2})? | About 710 N | About 590 N, equal to the weight | About 470 N, weight minus ma | About 120 N, just ma | N − mg = ma, so N = 60(9.8 + 2.0) ≈ 708 N; the passenger feels heavier.
SA2@1,2: Draw (describe) the free-body diagram for a box pushed along a rough floor by a horizontal force, and write the equations. | Forces: weight mg down, normal N up, push P forwards, friction F backwards. Vertical: N − mg = 0. Horizontal: P − F = ma, with F = μN for sliding. | four forces identified ; vertical balance N = mg ; horizontal P − F = ma ; F = μN when sliding

## Normal force and tension
S: The normal force is the perpendicular push a surface exerts to stop objects passing through it; tension is the pull transmitted along a rope or string. Both are "constraint" forces: they take whatever value the motion requires.
LV: Introductory · Foundation
O: Find normal forces and tensions from Newton's second law
O: Analyse connected bodies over a pulley
PRE: Free-body diagrams
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
T: Normal force | The perpendicular contact force a surface exerts on a body
T: Tension | The pulling force transmitted along a string, rope or cable
SUM: The normal force is whatever is needed to stop bodies passing through each other; it isn't always mg.
SUM: An ideal string has the same tension throughout; an ideal pulley only changes its direction.
SRC: OpenStax, University Physics Volume 1, section 5.6 "Common Forces" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/5-6-common-forces
SRC: Halliday D., Resnick R., Walker J., Fundamentals of Physics, 10th edition, chapter 5 | secondary | 2013
EV: established | Standard mechanics with ideal strings and pulleys.
Q: When is the normal force on a body not equal to its weight? | When the surface is tilted, other vertical forces act, or the body accelerates vertically.
M3@2,3: Masses of 3.0 kg and 2.0 kg hang either side of an ideal pulley. What is the acceleration and the tension (g = 9.8 m s^{-2})? | 1.96 m s^{-2}; 23.5 N | 9.8 m s^{-2}; 0 N, as in free fall | 1.96 m s^{-2}; 49 N, the total weight | 3.9 m s^{-2}; 29.4 N, the larger weight | a = (3 − 2)g/5 = 1.96 m s^{-2}; T = 2.0(9.8 + 1.96) ≈ 23.5 N.
SA2@2: A 2.0 kg block on a frictionless table is pulled by a string over a pulley to a hanging 1.0 kg mass. Find the acceleration and tension (g = 9.8 m s^{-2}). | Hanging mass: mg − T = ma; block: T = Ma. Adding: a = mg/(m + M) = 9.8/3 ≈ 3.3 m s^{-2}. T = 2.0 × 3.27 ≈ 6.5 N. | equation for each body ; a = mg/(m + M) ; about 3.3 m s^{-2} ; T ≈ 6.5 N

## Friction and drag
S: Friction opposes relative sliding between surfaces; drag opposes motion through a fluid. Friction is roughly independent of speed and contact area, while drag grows with speed.
LV: Introductory · Foundation
O: Use the static and kinetic friction models
O: Compare linear and quadratic drag and when each applies
PRE: Normal force and tension
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
P: **Investigate with the lab.** Switch air resistance on and off for the same launch and compare the paths. Then find the best angle with drag, which is below 45°.
IX: projectile
Q: Why does ABS braking stop cars faster? | Wheels keep rolling, using static friction (higher than kinetic) instead of skidding.
Q: How does high-speed drag depend on speed? | It's proportional to v^{2}.
M1: A 10 kg block is pushed with 20 N; μ_{s} = 0.5 (g = 10). The friction force is: | 20 N | 50 N | 0 | 30 N | Static friction matches the push until it exceeds 50 N.
M2: Doubling a car's speed multiplies the power needed to overcome drag by: | 8 | 2 | 4 | 16 | P = Fv ∝ v^{3}.
M2: With air resistance, why is the best launch angle below 45°? | Drag shortens long, high flights most, so a flatter path loses less range | Drag adds a forward force on the ball at high angles | Gravity is weaker at higher angles of launch | Drag only acts on the way down, so lower is safer | The longer and faster the flight, the more energy drag removes, favouring flatter trajectories.
T: Coefficient of friction | μ, the ratio of the friction force to the normal force
T: Static friction | Friction that prevents sliding, up to a maximum μ_{s}N
T: Drag | The resistive force on a body moving through a fluid
SUM: Static friction ≤ μ_{s}N; kinetic friction = μ_{k}N, with μ_{k} < μ_{s} usually.
SUM: Drag ∝ v at low Reynolds number; F = ½ρC_{d}Av^{2} at high Reynolds number.
SRC: OpenStax, University Physics Volume 1, sections 6.2 "Friction" and 6.4 "Drag Force and Terminal Speed" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/6-2-friction
SRC: Persson B. N. J., Sliding Friction: Physical Principles and Applications, 2nd edition, Springer | secondary | 2000
EV: established | The friction laws are empirical approximations that work well for dry surfaces; the drag laws depend on the flow regime.
Q: Why is static friction described as "up to" μ_{s}N? | It is only as large as needed to stop sliding, up to that maximum.
M3@2,3: A 10 kg box on a level floor (μ_{s} = 0.5) is pushed with 30 N. What is the friction force (g = 9.8 m s^{-2})? | 30 N, matching the push, because the box doesn't move | 49 N, the maximum static friction μ_{s}mg | 0 N, because the box isn't sliding | 19 N, the difference between 49 N and 30 N | The maximum static friction is 49 N, more than the push, so friction just balances the 30 N.
SA2@1,2: Explain why a car's top speed is limited mainly by air resistance rather than rolling friction. | Rolling resistance is roughly constant with speed, but aerodynamic drag grows as v^{2}, so the power needed to overcome it grows as v^{3}. At high speed drag dominates and the engine's maximum power sets the speed at which it is matched. | rolling resistance roughly constant ; drag ∝ v^{2} ; power ∝ v^{3} ; top speed where engine power equals drag power

## Inclined planes
S: On a slope, resolve forces parallel and perpendicular to the surface. Gravity's component down the slope, mg sin θ, drives motion; its perpendicular component, mg cos θ, sets the normal force and therefore friction.
LV: Introductory · Application
O: Resolve forces parallel and perpendicular to a slope
O: Find accelerations and the angle at which sliding starts
PRE: Friction and drag
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
T: Angle of repose | The steepest angle at which a body stays at rest on a slope: tan θ = μ_{s}
SUM: Along the slope: mg sin θ; perpendicular: N = mg cos θ.
SUM: Sliding starts when tan θ exceeds μ_{s}; mass cancels out.
T: Component of weight | The part of mg along or perpendicular to the slope
SRC: OpenStax, University Physics Volume 1, section 6.2 "Friction" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/6-2-friction
SRC: Halliday D., Resnick R., Walker J., Fundamentals of Physics, 10th edition, chapter 6 | secondary | 2013
EV: established | Standard mechanics with the friction model.
Q: What is the normal force on a block on a slope at angle θ, with no other forces? | N = mg cos θ.
M3@2: A block slides down a 30° slope with μ_{k} = 0.20. What is its acceleration (g = 9.8 m s^{-2})? | About 3.2 m s^{-2} | 4.9 m s^{-2}, as without friction | About 6.6 m s^{-2}, friction added | About 1.96 m s^{-2}, just μg | a = g(sin 30° − μ cos 30°) = 9.8(0.50 − 0.17) ≈ 3.2 m s^{-2}.
SA2@1,2: Show that the angle at which a block starts to slide depends only on μ_{s}, not on its mass. | At the point of sliding, mg sin θ = μ_{s}N = μ_{s}mg cos θ. Dividing by mg cos θ gives tan θ = μ_{s}: m and g cancel, so the angle depends only on the surfaces. | down-slope component equals maximum friction ; N = mg cos θ ; tan θ = μ_{s} ; mass cancels

## Circular motion
S: An object moving in a circle constantly changes direction, so it accelerates towards the centre even at constant speed. Angular quantities describe the motion neatly, and a net inward force is needed to sustain it.
LV: Introductory · Foundation
O: Use angular displacement, angular velocity and period
O: Relate linear and angular quantities: v = ωr
PRE: Acceleration
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
T: Angular velocity | ω = dθ/dt, the rate of rotation in rad s^{-1}
T: Period | T, the time for one revolution; ω = 2π/T
SUM: v = ωr, ω = 2πf = 2π/T.
SUM: Uniform circular motion has constant speed but a changing velocity, so there is acceleration.
SRC: OpenStax, University Physics Volume 1, section 4.4 "Uniform Circular Motion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/4-4-uniform-circular-motion
SRC: Halliday D., Resnick R., Walker J., Fundamentals of Physics, 10th edition, chapter 4 | secondary | 2013
EV: established | Standard kinematics.
Q: What is the angular velocity of a wheel turning at 120 rpm? | 120/60 = 2 rev s^{-1}, so ω = 4π ≈ 12.6 rad s^{-1}.
M3@2: Points on a turning disc at 0.10 m and 0.30 m from the centre are compared. Which is true? | Same ω; the outer point's speed is three times larger | Same speed; the outer point's ω is three times smaller | The outer point has both larger ω and larger speed | Both have the same speed and the same ω | A rigid disc has one ω; v = ωr grows with radius.
SA2@1: The Earth turns once in 24 h. Find the speed of a point on the equator (R = 6.4 × 10^{6} m). | ω = 2π/(86 400 s) ≈ 7.3 × 10^{-5} rad s^{-1}. v = ωR ≈ 7.3 × 10^{-5} × 6.4 × 10^{6} ≈ 470 m s^{-1}. (Using the sidereal day changes this slightly.) | ω = 2π/T ; T = 86 400 s ; v = ωR ; about 470 m s^{-1}

## Centripetal acceleration and force
S: Centripetal means "centre-seeking": the acceleration v^{2}/r towards the centre of a circular path, and the net force mv^{2}/r that causes it. That force is always provided by real forces: tension, gravity, friction, normal force, magnetism.
LV: Introductory · Application
O: Calculate centripetal acceleration and the net force needed for circular motion
O: Identify which real force provides the centripetal force
PRE: Circular motion
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
T: Centripetal acceleration | a = v^{2}/r = ω^{2}r, directed towards the centre of the circle
T: Centripetal force | The net inward force mv^{2}/r needed to keep a body on a circular path
SUM: Centripetal force isn't a new force: tension, gravity, friction or a normal force provides it.
SUM: At the top of a vertical loop, the minimum speed is √(gr).
SRC: OpenStax, University Physics Volume 1, section 6.3 "Centripetal Force" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/6-3-centripetal-force
SRC: Knight R. D., Physics for Scientists and Engineers, 4th edition, chapter 8, Pearson | secondary | 2017
EV: established | Standard mechanics.
Q: What provides the centripetal force on a car turning on a flat road? | Static friction between the tyres and the road.
M3@2,3: What is the minimum speed at the top of a vertical loop of radius 10 m for a car to stay on the track (g = 9.8 m s^{-2})? | About 9.9 m s^{-1} | About 14 m s^{-1}, from √(2gr) | About 98 m s^{-1}, from gr | 0, if the car is moving at all | At the top, gravity alone can provide mv^{2}/r when N = 0: v = √(gr) = √98 ≈ 9.9 m s^{-1}.
SA2@2: Find the maximum speed a car can take a flat bend of radius 50 m if μ_{s} = 0.80 (g = 9.8 m s^{-2}). | Friction provides the centripetal force: μ_{s}mg = mv^{2}/r, so v = √(μ_{s}gr) = √(0.80 × 9.8 × 50) ≈ 20 m s^{-1}. Mass cancels. | friction provides mv^{2}/r ; μ_{s}mg = mv^{2}/r ; v = √(μ_{s}gr) ; about 20 m s^{-1}

## Work and energy
S: Work is energy transferred by a force acting through a displacement. The work–energy theorem says the net work on an object equals its change in kinetic energy, which often solves problems without needing the time.
LV: Introductory · Foundation
O: Calculate work done by a constant force, including at an angle
O: Apply the work–energy theorem
PRE: Newton's laws of motion
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
T: Work | W = F·s = Fs cos θ, the energy transferred by a force acting through a displacement
T: Work–energy theorem | The net work done on a body equals its change in kinetic energy
T: Joule | The work done by 1 N acting through 1 m
SUM: Only the force component along the displacement does work; a perpendicular force does none.
SUM: W_{net} = ΔKE, for any forces.
SRC: OpenStax, University Physics Volume 1, chapter 7 "Work and Kinetic Energy" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/7-introduction
SRC: Feynman R. P., Leighton R. B., Sands M., The Feynman Lectures on Physics, vol. I, chapter 13 "Work and Potential Energy" | secondary | 1963 | https://www.feynmanlectures.caltech.edu/I_13.html
EV: established | Standard mechanics.
Q: How much work does the centripetal force do on an orbiting satellite? | None: it is perpendicular to the motion.
M3@2: A 50 N force pulls a sledge 10 m at 60° above the horizontal. How much work does it do? | 250 J | 500 J, from Fs | 433 J, from Fs sin 60° | 0 J, since the force is at an angle | W = Fs cos θ = 50 × 10 × 0.5 = 250 J.
SA2@1,2: A 1200 kg car at 20 m s^{-1} brakes to rest. Use the work–energy theorem to find the average braking force over 40 m. | ΔKE = 0 − ½ × 1200 × 400 = −240 000 J. W = −F × 40 m, so F = 240 000/40 = 6000 N. | KE change −240 kJ ; work = −F × s ; F = 6000 N ; force opposes motion

## Kinetic and potential energy
S: Kinetic energy is energy of motion; potential energy is energy stored by position or configuration in a field or a deformed body. Converting between them, with total energy conserved, is behind falling, swinging, bouncing and orbiting.
LV: Introductory · Foundation
O: Calculate kinetic, gravitational and elastic potential energy
O: Use conservation of mechanical energy when only conservative forces act
PRE: Work and energy
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
T: Kinetic energy | ½mv^{2}, energy of motion
T: Gravitational potential energy | mgh near Earth's surface, energy of position in a gravitational field
T: Elastic potential energy | ½kx^{2}, energy stored in a stretched or compressed spring
SUM: KE + PE is constant when only conservative forces do work.
SUM: Only changes in potential energy matter; the zero level is a free choice.
SRC: OpenStax, University Physics Volume 1, chapter 8 "Potential Energy and Conservation of Energy" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/8-introduction
SRC: Halliday D., Resnick R., Walker J., Fundamentals of Physics, 10th edition, chapters 7–8 | secondary | 2013
EV: established | mgh applies near the surface, where g is constant; for large heights use −GMm/r.
Q: A ball is dropped from 5.0 m. Ignoring air resistance, what is its speed on landing? | v = √(2gh) = √(2 × 9.8 × 5.0) ≈ 9.9 m s^{-1}.
M3@2,3: A 0.10 kg ball is fired upwards by a spring (k = 400 N m^{-1}) compressed 0.050 m. How high does it rise (g = 9.8 m s^{-2})? | About 0.51 m | About 1.0 m, using kx^{2}/mg | About 0.26 m, using kx^{2}/(4mg) | About 20 m, using kx/mg | ½kx^{2} = mgh: h = 400 × 0.0025/(2 × 0.10 × 9.8) ≈ 0.51 m.
SA2@2: A skier starts at rest at the top of a 20 m high slope and reaches 15 m s^{-1} at the bottom. Is mechanical energy conserved? Explain. | Without losses, v = √(2gh) = √(2 × 9.8 × 20) ≈ 19.8 m s^{-1}. The actual speed is lower, so about 43% of the potential energy per kilogram (196 J vs 112.5 J of KE) was transferred to thermal energy by friction and air resistance: mechanical energy isn't conserved, total energy is. | predicted speed about 19.8 m s^{-1} ; actual is lower ; friction and drag dissipate energy ; total energy still conserved

## Conservative and non-conservative forces
S: A conservative force does work that depends only on start and end points, so a potential energy can be defined for it. Non-conservative forces like friction depend on the path and turn mechanical energy into thermal energy.
LV: Intermediate · Foundation
O: Distinguish conservative from non-conservative forces
O: Relate a conservative force to its potential energy: F = −dU/dx
PRE: Kinetic and potential energy
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
T: Conservative force | A force whose work depends only on the start and end points
T: Dissipative force | A non-conservative force, such as friction, that turns mechanical energy into thermal energy
SUM: F = −dU/dx: the force points downhill in potential energy.
SUM: Work by non-conservative forces = change in mechanical energy.
SRC: OpenStax, University Physics Volume 1, section 8.2 "Conservative and Non-Conservative Forces" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/8-2-conservative-and-non-conservative-forces
SRC: Kleppner D., Kolenkow R., An Introduction to Mechanics, 2nd edition, chapter 5, Cambridge University Press | secondary | 2014
EV: established | Standard mechanics.
Q: Is friction conservative? | No: the work it does depends on the path length, and it is always against the motion.
M3@2: A particle's potential energy is U = 3x^{2} J. What is the force on it at x = 2 m? | −12 N | 12 N, from dU/dx | −6 N, from −U/x | 3 N, from U/x^{2} | F = −dU/dx = −6x = −12 N, pointing back towards x = 0.
SA2@1,2: Explain why there's no potential energy for friction. | A potential energy exists only if a force's work depends on the end points alone. Friction's work depends on the path length (a longer path does more negative work) and is never recovered, so no function U(x) can describe it. | potential needs path-independent work ; friction's work depends on path length ; energy isn't recoverable ; so no U(x)

## Power and efficiency
S: Power is the rate of transferring energy or doing work. Efficiency is the fraction of input energy that ends up in the useful form; the rest is "wasted", usually as heat.
LV: Introductory · Foundation
O: Calculate power from work and time, and from force and velocity
O: Calculate efficiency and explain where wasted energy goes
PRE: Work and energy
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
T: Power | The rate of energy transfer: P = dW/dt = Fv
T: Efficiency | Useful energy (or power) output divided by total input
T: Watt | One joule per second
SUM: P = W/t = Fv; efficiency = useful out/total in, always less than 100%.
SUM: Wasted energy usually ends up as thermal energy in the surroundings.
SRC: OpenStax, University Physics Volume 1, section 7.4 "Power" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/7-4-power
SRC: Halliday D., Resnick R., Walker J., Fundamentals of Physics, 10th edition, chapter 7 | secondary | 2013
EV: established | Standard definitions.
Q: What power is needed to push a car at a steady 20 m s^{-1} against 500 N of resistance? | P = Fv = 500 × 20 = 10 kW.
M3@2: A motor 60% efficient lifts 50 kg through 12 m in 10 s. What electrical power does it draw (g = 9.8 m s^{-2})? | About 980 W | About 590 W, the useful power | About 350 W, 60% of the useful power | About 5900 W, the energy | Useful power = mgh/t = 50 × 9.8 × 12/10 = 588 W; input = 588/0.60 ≈ 980 W.
SA2@1: A 2.0 kW kettle heats 1.0 kg of water from 20 °C to 100 °C in 3.0 minutes. Find its efficiency (c = 4200 J kg^{-1} K^{-1}). | Useful energy = mcΔT = 1.0 × 4200 × 80 = 336 kJ. Input = 2000 × 180 = 360 kJ. Efficiency = 336/360 ≈ 93%. | useful energy 336 kJ ; input 360 kJ ; ratio ; about 93%

## Momentum and impulse
S: Momentum p = mv measures the quantity of motion. A force changes momentum, and the total change is the impulse: force times time. Spreading a collision over a longer time reduces the force: that's how airbags, crumple zones and bent knees work.
---
M3@2,3: A 0.15 kg ball at 30 m s^{-1} is caught and stopped. Stopping in 0.10 s rather than 0.010 s changes the average force how? | It falls from 450 N to 45 N | It rises from 45 N to 450 N | It stays at 4.5 N either way | It falls from 4500 N to 450 N | Δp = 4.5 kg m s^{-1} in both cases; F = Δp/Δt is 450 N over 0.010 s and 45 N over 0.10 s.
LV: Introductory · Foundation
O: Calculate momentum and impulse
O: Use the impulse–momentum theorem and force–time graphs
PRE: Newton's laws of motion
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
P: **Investigate with the lab.** Run a sticky collision and read the momentum of each glider before and after. Work out the impulse on each glider: it is the change in its momentum.
IX: collisions
Q: What is impulse? | The product of force and time (∫F dt), equal to the change in momentum.
Q: How do crumple zones reduce injury? | They increase the collision time, reducing the average force for the same momentum change.
M1: A 0.1 kg ball hits a wall at 10 m s^{-1} and rebounds at 10 m s^{-1}. Momentum change? | 2 kg m s^{-1} | 0 | 1 kg m s^{-1} | 20 kg m s^{-1} | 0.1 × (10 − (−10)).
M2: A force–time graph is a triangle of peak 400 N and duration 0.02 s. Impulse? | 4 N s | 8 N s | 400 N s | 2 N s | Area = ½ × 0.02 × 400.
M2: Glider A's momentum changes by −0.6 kg m/s in a collision. What is the change in glider B's momentum? | +0.6 kg m/s | −0.6 kg m/s | 0 kg m/s | It can't be known without the masses | By Newton's third law the impulses are equal and opposite, so B gains what A loses.
T: Momentum | p = mv, a vector
T: Impulse | J = ∫F dt = Δp, the area under a force–time graph
SUM: Impulse = change in momentum; spreading it over a longer time lowers the peak force.
SUM: Crumple zones, airbags and bending knees all work by lengthening the collision time.
SRC: OpenStax, University Physics Volume 1, section 9.2 "Impulse and Collisions" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/9-2-impulse-and-collisions
SRC: Halliday D., Resnick R., Walker J., Fundamentals of Physics, 10th edition, chapter 9 | secondary | 2013
EV: established | Exact consequence of Newton's second law.
Q: What does the area under a force–time graph give? | The impulse, equal to the change in momentum.
SA2@1,2: Explain, using impulse, why a car airbag reduces injuries. | The driver's change in momentum in a crash is fixed (from their speed to rest). The airbag makes the stopping time longer, so for the same impulse FΔt the average force is smaller; it also spreads the force over a larger area, lowering pressure. | Δp is fixed ; longer stopping time ; F = Δp/Δt smaller ; force spread over a larger area

## Conservation of momentum
S: If no net external force acts on a system, its total momentum is constant. This follows from Newton's third law (internal forces cancel in pairs) and, more deeply, from the uniformity of space.
---
M3@2: A 50 kg person jumps forward at 4.0 m s^{-1} from a stationary 200 kg boat. What is the boat's recoil velocity? | 1.0 m s^{-1} backwards | 4.0 m s^{-1} backwards, the same speed | 0.80 m s^{-1} backwards, using 250 kg | 1.0 m s^{-1} forwards, with the person | Total momentum stays zero: 50 × 4.0 = 200v, so v = 1.0 m s^{-1} in the opposite direction.
LV: Introductory · Application
O: Derive conservation of momentum from Newton's third law
O: Apply it to recoil and separating bodies
PRE: Momentum and impulse
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
P: **Investigate with the lab.** Try every challenge, and in each one compare the total momentum before and after. It never changes, whatever the restitution.
IX: collisions
Q: When is the total momentum of a system conserved? | When the net external force on it is zero.
Q: Why does a gun recoil? | Total momentum stays zero, so the gun gains backward momentum equal to the bullet's forward momentum.
M1: A 2 kg cart at 3 m s^{-1} couples to a stationary 4 kg cart. Final speed? | 1 m s^{-1} | 1.5 m s^{-1} | 3 m s^{-1} | 2 m s^{-1} | 6 = 6v.
M2: An astronaut throws a tool to move back towards the ship. This uses: | Conservation of momentum | Conservation of energy only | Air resistance | Gravity | Throwing the tool away gives the astronaut opposite momentum.
M2: In which collisions on a frictionless track is total momentum conserved? | All of them: elastic, sticky and explosions | Only elastic collisions | Only collisions where the gliders stick | Only collisions between equal masses | With no external horizontal force, total momentum is always conserved.
T: Closed system | A system with no net external force, so its total momentum is constant
T: Recoil | The backward motion of a body when it pushes another forwards
SUM: Internal forces cancel in third-law pairs, so only external forces change total momentum.
SUM: Use it when external forces are absent, or negligible over a short collision.
SRC: OpenStax, University Physics Volume 1, section 9.3 "Conservation of Linear Momentum" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/9-3-conservation-of-linear-momentum
SRC: Feynman R. P., Leighton R. B., Sands M., The Feynman Lectures on Physics, vol. I, chapter 10 "Conservation of Momentum" | secondary | 1963 | https://www.feynmanlectures.caltech.edu/I_10.html
EV: established | Momentum conservation has never been observed to fail.
Q: A 60 kg skater pushes a 40 kg skater away; the 40 kg skater moves at 3 m s^{-1}. What is the 60 kg skater's speed? | 2 m s^{-1}, in the opposite direction (total momentum stays zero).
SA2@2: Explain why momentum is conserved in a car crash lasting 0.1 s even though friction from the road acts. | During the crash the forces between the cars are huge (tens of kN or more), while road friction is far smaller and acts only briefly. Its impulse over 0.1 s is small compared with the momenta involved, so total momentum just before and after is very nearly conserved. | internal forces very large ; external friction small ; short time so small external impulse ; momentum approximately conserved

## Collisions and explosions
S: In collisions and explosions, large internal forces act for a short time, so momentum is conserved. Kinetic energy may be conserved (elastic), partly lost (inelastic) or created from stored energy (explosions).
---
M3@2,3: A 0.010 kg bullet at 400 m s^{-1} embeds in a 2.0 kg block on a frictionless surface. What fraction of the kinetic energy is lost? | About 99.5% | About 50%, half of it | About 0.5%, very little | None, since momentum is conserved | v = 4.0/2.01 ≈ 1.99 m s^{-1}; KE falls from 800 J to about 4.0 J, so the fraction kept is m/(m + M) ≈ 0.5%.
LV: Introductory · Application
O: Analyse collisions and explosions with conservation of momentum
O: Find the kinetic energy gained in an explosion or lost in a collision
PRE: Conservation of momentum
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
T: Explosion | A process in which internal energy pushes parts of a system apart, increasing its kinetic energy
T: Perfectly inelastic collision | One in which the bodies stick together, losing the most kinetic energy allowed by momentum conservation
SUM: Momentum is conserved in both; kinetic energy is lost in collisions and gained in explosions.
SUM: In an explosion from rest the fragments' momenta sum to zero.
SRC: OpenStax, University Physics Volume 1, section 9.4 "Types of Collisions" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/9-4-types-of-collisions
SRC: Halliday D., Resnick R., Walker J., Fundamentals of Physics, 10th edition, chapter 9 | secondary | 2013
EV: established | Standard mechanics.
Q: Where does the kinetic energy of an explosion come from? | Chemical or other internal energy stored in the system.
SA2@1,2: A 2.0 kg object at rest explodes into 0.5 kg and 1.5 kg pieces; the 0.5 kg piece moves at 6.0 m s^{-1}. Find the other piece's velocity and the kinetic energy released. | Momentum: 0 = 0.5 × 6.0 + 1.5v, so v = −2.0 m s^{-1}. KE = ½ × 0.5 × 36 + ½ × 1.5 × 4 = 9 + 3 = 12 J. | total momentum zero ; v = −2.0 m s^{-1} ; KE of each piece ; 12 J released

## Elastic and inelastic collisions
S: The coefficient of restitution e measures how bouncy a collision is: e = 1 for elastic, 0 for perfectly inelastic. Combined with momentum conservation it gives final velocities in 1D collisions.
---
M3@2,3: A ball is dropped from 2.0 m onto a floor with e = 0.50. How high is its second bounce? | 0.125 m | 0.50 m, the first bounce | 1.0 m, half the drop | 0.25 m, one quarter | Each bounce multiplies the height by e^{2} = 0.25: 2.0 → 0.50 → 0.125 m.
LV: Intermediate · Application
O: Use the coefficient of restitution with momentum conservation
O: Find final velocities in a one-dimensional elastic collision
PRE: Collisions and explosions
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
T: Coefficient of restitution | e = (speed of separation)/(speed of approach)
T: Elastic collision | One in which kinetic energy is conserved (e = 1)
SUM: Elastic, equal masses, head-on: the velocities swap.
SUM: e = 1 elastic, 0 < e < 1 inelastic, e = 0 perfectly inelastic.
SRC: OpenStax, University Physics Volume 1, section 9.4 "Types of Collisions" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/9-4-types-of-collisions
SRC: Kleppner D., Kolenkow R., An Introduction to Mechanics, 2nd edition, chapter 4, Cambridge University Press | secondary | 2014
EV: established | e is an empirical model; it depends somewhat on impact speed.
Q: A ball dropped from 1.0 m bounces to 0.64 m. What is e? | e = √(0.64/1.0) = 0.80.
SA2@2: A 1.0 kg ball at 6.0 m s^{-1} hits a stationary 2.0 kg ball head-on, elastically. Find both final velocities. | Elastic results: v_{1} = (m_{1} − m_{2})u/(m_{1} + m_{2}) = (−1/3) × 6 = −2.0 m s^{-1}; v_{2} = 2m_{1}u/(m_{1} + m_{2}) = (2/3) × 6 = 4.0 m s^{-1}. Check: momentum 6 = −2 + 8; KE 18 = 2 + 16 J. | elastic collision formulas ; v_{1} = −2.0 m s^{-1} ; v_{2} = 4.0 m s^{-1} ; checked by momentum and KE

## Centre of mass
S: The centre of mass is the mass-weighted average position of a system. It moves as if all the mass were concentrated there and all external forces acted on it, whatever happens internally.
---
M3@2: Masses of 2.0 kg at x = 0 and 3.0 kg at x = 5.0 m. Where is the centre of mass? | x = 3.0 m | x = 2.5 m, the midpoint | x = 2.0 m, nearer the lighter mass | x = 3.5 m, beyond the weighted point | x_{cm} = (2.0 × 0 + 3.0 × 5.0)/5.0 = 3.0 m, nearer the heavier mass.
LV: Introductory · Application
O: Locate the centre of mass of a set of particles and of simple shapes
O: Use the centre of mass to describe a system's overall motion
PRE: Conservation of momentum
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
T: Centre of mass | The mass-weighted mean position: r_{cm} = Σm_{i}r_{i}/M
T: Centre of gravity | The point where the weight of a body acts; the same as the centre of mass in uniform g
SUM: The centre of mass moves like a single particle of mass M under the total external force.
SUM: Symmetry locates it for uniform shapes; it can lie outside the body (a ring, a boomerang).
SRC: OpenStax, University Physics Volume 1, section 9.6 "Center of Mass" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/9-6-center-of-mass
SRC: Kleppner D., Kolenkow R., An Introduction to Mechanics, 2nd edition, chapter 4, Cambridge University Press | secondary | 2014
EV: established | Standard mechanics.
Q: Where is the centre of mass of a uniform ring? | At its centre, where there is no material.
SA2@1,2: A firework is moving on a parabolic path when it explodes into pieces. Describe the motion of the centre of mass of the pieces afterwards, ignoring air resistance. | The explosion's forces are internal, so the only external force is still gravity. The centre of mass therefore continues along the same parabola as if nothing had happened, until pieces start hitting the ground. | explosion forces are internal ; gravity is the only external force ; centre of mass continues on the parabola ; until fragments land

## Systems of particles
S: Treating many particles as a system, internal forces cancel in pairs, so the system's total momentum responds only to external forces. Energy and angular momentum can be split into motion of the centre of mass plus motion relative to it.
LV: Intermediate · Foundation
O: Write Newton's second law for a system: F_{ext} = M a_{cm}
O: Separate a system's kinetic energy into centre-of-mass and internal parts
PRE: Centre of mass
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
T: Internal force | A force between parts of a system
T: External force | A force on the system from outside it
SUM: F_{ext} = dP/dt = Ma_{cm}: internal forces cancel.
SUM: KE = ½Mv_{cm}^{2} + KE relative to the centre of mass.
SRC: Kleppner D., Kolenkow R., An Introduction to Mechanics, 2nd edition, chapter 4, Cambridge University Press | secondary | 2014
SRC: OpenStax, University Physics Volume 1, section 9.6 "Center of Mass" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/9-6-center-of-mass
EV: established | Standard mechanics.
Q: Can internal forces change a system's total momentum? | No: they come in equal and opposite third-law pairs.
M3@2,3: Two 1.0 kg balls move at +3 m s^{-1} and −1 m s^{-1}. How much of their kinetic energy can be lost in a collision? | 4 J, the kinetic energy relative to the centre of mass | 5 J, all of their kinetic energy | 1 J, the KE of the centre of mass | 0 J, since momentum is conserved | v_{cm} = 1 m s^{-1}, so ½Mv_{cm}^{2} = 1 J must remain; of the total 5 J, at most 4 J can be lost.
SA2@2: Explain how a person standing on frictionless ice can never move their centre of mass horizontally. | With no friction there is no horizontal external force, so F_{ext} = Ma_{cm} gives a_{cm} = 0 horizontally. Moving limbs only rearranges mass about the centre of mass. To move, they'd need to throw something away (then the system's centre of mass still stays put, but they move). | no horizontal external force ; a_{cm} = 0 ; internal motions can't shift it ; throwing an object lets the person move

## Variable-mass systems
S: When a system gains or loses mass, as rockets, conveyor belts and raindrops do, F = ma isn't enough. Apply momentum conservation to everything including the mass being added or ejected.
LV: Intermediate · Application
O: Apply momentum conservation to systems that gain or lose mass
O: Derive and use the Tsiolkovsky rocket equation
PRE: Systems of particles
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
T: Thrust | The force on a rocket from ejecting mass: u × (rate of mass loss)
T: Exhaust velocity | The speed of the ejected gas relative to the rocket
T: Tsiolkovsky rocket equation | Δv = u ln(m_{0}/m_{f})
SUM: Thrust = u |dm/dt|; Δv = u ln(m_{0}/m_{f}) in empty space.
SUM: F = ma fails when mass changes; use F = dp/dt applied to the whole system.
SRC: Kleppner D., Kolenkow R., An Introduction to Mechanics, 2nd edition, chapter 4, Cambridge University Press | secondary | 2014
SRC: NASA Glenn Research Center, "Ideal Rocket Equation" | guidance | 2021 | https://www.grc.nasa.gov/www/k-12/rocket/rktpow.html
EV: established | The ideal rocket equation is exact without gravity and drag; real launches lose some Δv to both.
Q: Why do rockets use stages? | Dropping empty tanks reduces the mass to accelerate, giving more Δv from the same fuel.
M3@2,3: A rocket with exhaust speed 3.0 km s^{-1} must gain 9.0 km s^{-1}. What fraction of its launch mass can be payload and structure? | About 5%, since m_{0}/m_{f} = e^{3} ≈ 20 | About 33%, since 3/9 = 1/3 | About 67%, since the fuel is 1/3 | About 0.1%, since e^{9} is huge | Δv/u = 3, so m_{f}/m_{0} = e^{−3} ≈ 0.05 (ignoring gravity and drag).
SA2@1,2: Sand falls onto a conveyor belt moving at 2.0 m s^{-1} at 5.0 kg s^{-1}. What extra force keeps the belt at constant speed? | Each second 5.0 kg of sand gains 2.0 m s^{-1} of horizontal velocity, a momentum increase of 10 kg m s^{-1} per second, so F = v dm/dt = 2.0 × 5.0 = 10 N. | sand gains momentum ; F = v dm/dt ; 5.0 × 2.0 ; 10 N

## Motion under resistive forces
S: Real objects move against drag and friction, which depend on speed. Newton's second law then becomes a differential equation, and motion approaches a steady state rather than accelerating forever.
---
M3@2,3: A ball falls with linear drag (b = 0.50 kg s^{-1}, m = 0.10 kg). How long until it reaches about 63% of terminal velocity? | 0.20 s | 0.50 s, equal to b | 2.0 s, from b/m × 0.4 | 5.0 s, from b/m | v = v_{t}(1 − e^{−t/τ}) with τ = m/b = 0.20 s; at t = τ the speed is 63% of v_{t}.
LV: Intermediate · Application
O: Set up and solve Newton's second law with linear drag
O: Explain how quadratic drag changes the motion
PRE: Friction and drag
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
T: Linear drag | Resistive force proportional to speed, F = −bv, typical at low Reynolds number
T: Quadratic drag | Resistive force proportional to v^{2}, typical for everyday objects in air
SUM: With linear drag only, v = v_{0}e^{−bt/m}: speed decays exponentially with time constant m/b.
SUM: Falling with drag, the speed approaches a terminal value instead of growing without limit.
SRC: Taylor J. R., Classical Mechanics, chapter 2, University Science Books | secondary | 2005
SRC: OpenStax, University Physics Volume 1, section 6.4 "Drag Force and Terminal Speed" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/6-4-drag-force-and-terminal-speed
EV: established | The drag laws are good approximations in their flow regimes; real objects often sit between them.
Q: What is the time constant for a body of mass m slowing under linear drag F = −bv? | τ = m/b.
SA2@2: A 2.0 kg puck slides with linear drag b = 0.40 kg s^{-1} from 5.0 m s^{-1}. Find its speed after 10 s and how far it slides in total. | v = 5.0e^{−0.40 × 10/2.0} = 5.0e^{−2} ≈ 0.68 m s^{-1}. Total distance = v_{0}m/b = 5.0 × 2.0/0.40 = 25 m. | v = v_{0}e^{−bt/m} ; about 0.68 m s^{-1} ; distance = v_{0}m/b ; 25 m

## Terminal velocity
S: A falling object accelerates until drag equals its weight; then the net force is zero and it falls at constant terminal velocity. Size, shape, mass and the fluid's density and viscosity set its value.
---
M3@2,3: Two balls have the same size and shape; one has four times the mass. With quadratic drag, how do their terminal velocities compare? | The heavier one's is twice as large | The heavier one's is four times as large | They are equal, as in a vacuum | The heavier one's is half as large | v_{t} = √(2mg/(ρC_{d}A)) ∝ √m, so four times the mass doubles v_{t}.
LV: Introductory · Application
O: Explain terminal velocity with a force balance
O: Calculate terminal velocity for linear and quadratic drag
PRE: Motion under resistive forces
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
T: Terminal velocity | The constant speed reached when drag balances weight
T: Drag coefficient | C_{d}, a dimensionless number describing how streamlined a shape is
SUM: Quadratic drag: v_{t} = √(2mg/(ρC_{d}A)). Linear (Stokes) drag: v_{t} = mg/b.
SUM: Larger area or smaller mass lowers terminal velocity; that is how a parachute works.
SRC: OpenStax, University Physics Volume 1, section 6.4 "Drag Force and Terminal Speed" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/6-4-drag-force-and-terminal-speed
SRC: Stokes G. G., "On the effect of the internal friction of fluids on the motion of pendulums", Transactions of the Cambridge Philosophical Society 9, 8–106 | primary | 1851
EV: established | Stokes' law holds at low Reynolds number; quadratic drag for most falling bodies in air.
Q: Why does a parachute reduce terminal velocity? | It greatly increases area and drag coefficient, so drag equals weight at a much lower speed.
SA2@1,2: Describe how the forces on a skydiver and their speed change from jumping until after the parachute opens. | At first only weight acts, so they accelerate at g. As speed rises, drag (∝ v^{2}) grows, the net force falls, and they approach terminal velocity (about 55 m s^{-1}) when drag equals weight. The parachute raises drag far above weight, so they decelerate until a new, lower terminal velocity (about 5 m s^{-1}) is reached. | acceleration g at first ; drag rises with speed ; terminal velocity when drag equals weight ; parachute gives deceleration to a lower terminal velocity

## Equilibrium and statics
S: A body is in static equilibrium when it neither translates nor rotates: the net force and net torque on it are both zero. Statics underpins the design of bridges, buildings, cranes and the human skeleton.
LV: Introductory · Application
O: State and apply the two conditions for static equilibrium
O: Use moments to find unknown forces on a beam
PRE: Free-body diagrams
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
T: Static equilibrium | A state in which a body is at rest with zero net force and zero net torque
T: Moment | The turning effect of a force: force × perpendicular distance from the pivot
SUM: ΣF = 0 and Στ = 0 about any point.
SUM: Take moments about a point where an unknown force acts, to remove it from the equation.
SRC: OpenStax, University Physics Volume 1, chapter 12 "Static Equilibrium and Elasticity" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/12-introduction
SRC: Hibbeler R. C., Engineering Mechanics: Statics, 14th edition, Pearson | secondary | 2016
EV: established | Standard mechanics.
Q: Why take moments about the point where an unknown force acts? | That force has zero moment about it, so it drops out of the equation.
M3@2,3: A uniform 4.0 m beam of weight 200 N rests on supports at its ends. A 600 N person stands 1.0 m from the left end. What is the force from the right support? | 250 N | 400 N, half the total | 550 N, from the left end | 150 N, the person's share alone | Moments about the left end: R × 4 = 600 × 1 + 200 × 2, so R = 250 N (and the left support carries 550 N).
SA2@1,2: Explain why a ladder leaning against a smooth wall needs friction at the ground to stay up. | The smooth wall can only push horizontally. For horizontal force balance, something must push the ladder's foot towards the wall: only friction at the ground can. Without it the wall's push is unbalanced, and the moment of the ladder's weight can't be balanced either, so it slides. | smooth wall gives a horizontal force only ; horizontal balance needs ground friction ; moments also need balancing ; without friction the foot slides

## Mechanical advantage
S: Mechanical advantage (MA) is the ratio of the output force a machine delivers to the input force you apply. Machines trade force for distance; they can't create energy.
LV: Introductory · Foundation
O: Calculate mechanical advantage, velocity ratio and efficiency of a machine
O: Explain why a machine can multiply force but not energy
PRE: Power and efficiency
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
T: Mechanical advantage | Output (load) force divided by input (effort) force
T: Velocity ratio | Distance moved by the effort divided by distance moved by the load
SUM: Efficiency = MA/VR; for an ideal machine MA = VR.
SUM: A machine that multiplies force must divide distance: work out ≤ work in.
SRC: OpenStax, College Physics 2e, section 9.5 "Simple Machines" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/9-5-simple-machines
SRC: Hibbeler R. C., Engineering Mechanics: Statics, 14th edition, Pearson | secondary | 2016
EV: established | Follows from conservation of energy.
Q: Can a machine's efficiency exceed 100%? | No: that would create energy.
M3@2: A pulley system has velocity ratio 4 and lifts a 400 N load with a 125 N effort. What is its efficiency? | 80% | 100%, because VR = 4 | 31%, from 125/400 | 25%, from 1/VR | MA = 400/125 = 3.2; efficiency = MA/VR = 3.2/4 = 80%.
SA2@1,2: A jack lifts a 10 000 N car 0.20 m when the handle moves 8.0 m with a 300 N push. Find MA, VR and efficiency. | MA = 10 000/300 ≈ 33. VR = 8.0/0.20 = 40. Efficiency = 33/40 ≈ 83% (or work out/in = 2000 J/2400 J). | MA ≈ 33 ; VR = 40 ; efficiency = MA/VR ; about 83%

## Simple machines
S: The six classical simple machines (lever, wheel and axle, pulley, inclined plane, wedge, screw) all trade force against distance. Every complex machine is built from them.
LV: Introductory · Foundation
O: Describe the six classical simple machines and how each trades force for distance
O: Calculate the ideal mechanical advantage of a lever, pulley and inclined plane
PRE: Mechanical advantage
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
T: Lever | A rigid bar turning about a fulcrum; ideal MA = effort arm/load arm
T: Fulcrum | The pivot of a lever
SUM: Lever, wheel and axle, pulley, inclined plane, wedge and screw all obey work in ≥ work out.
SUM: Inclined plane: ideal MA = length/height; screw: ideal MA = 2πr/pitch.
SRC: OpenStax, College Physics 2e, section 9.5 "Simple Machines" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/9-5-simple-machines
SRC: Hibbeler R. C., Engineering Mechanics: Statics, 14th edition, Pearson | secondary | 2016
EV: established | Standard mechanics.
Q: What is the ideal mechanical advantage of a 5.0 m ramp rising 1.0 m? | 5.0: length divided by height.
M3@2: A screw jack has a 0.40 m handle radius and a 4.0 mm pitch. What is its ideal mechanical advantage? | About 630 | 100, from 0.40/0.004 | About 3.1, from 2π × 0.40 × 1.25 | 400, from 0.40/0.001 | Ideal MA = 2πr/pitch = 2π × 0.40/0.0040 ≈ 628.
SA2@1: Explain why a wheelbarrow makes it easier to lift a load. | It's a second-class lever: the wheel is the fulcrum, the load sits between the wheel and the handles, and the effort is at the handles, further from the fulcrum. Balancing moments, the effort needed is the load times (load distance/effort distance), which is smaller; the handles move further than the load. | lever with the wheel as fulcrum ; load nearer the fulcrum than the effort ; moments give a smaller effort ; effort moves further
`;
