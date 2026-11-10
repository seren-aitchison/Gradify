// EngineerGradify Statics (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## Forces as vectors
LV: Year 1 · Foundation
S: A force has size and direction, so it is a vector. This lesson shows how to resolve forces into components, add them to find a resultant, and write forces in Cartesian vector form, the basic operations of all statics.
O: Resolve a force into perpendicular components
O: Find the resultant of several coplanar forces by adding components
O: Express a force in Cartesian vector form using unit vectors
PRE: Vectors in engineering
H: Resolving forces
P: A **force** is a vector: it has magnitude (in newtons, N), direction and a line of action. In two dimensions a force F at angle θ to the x-axis has components:
E: F_{x} = F cos θ, F_{y} = F sin θ :: θ measured from the positive x-axis
P: The components replace the force exactly. Adding components is far more reliable than adding forces graphically with the parallelogram rule.
X: Find the resultant of 300 N along +x and 400 N at 90° (along +y), then add 250 N at 30°.
> First two: R = √(300^{2} + 400^{2}) = 500 N, at tan^{-1}(400/300) = 53.1° to x.
> Third force components: 250 cos 30° = 216.5 N; 250 sin 30° = 125.0 N.
> Totals: R_{x} = 300 + 216.5 = 516.5 N; R_{y} = 400 + 125.0 = 525.0 N.
> R = √(516.5^{2} + 525.0^{2}) = 736.5 N at tan^{-1}(525.0/516.5) = 45.5° to x.
IX: trig
H: Cartesian vectors
P: In three dimensions a force is written **F** = F_{x}**i** + F_{y}**j** + F_{z}**k**, with magnitude √(F_{x}^{2} + F_{y}^{2} + F_{z}^{2}). Its direction is given by the **unit vector** **u** = **F**/F, whose components are the direction cosines (cos α, cos β, cos γ).
P: A force along a cable from point A to point B is F times the unit vector from A to B: find the position vector **r**_{AB}, divide by its length, multiply by F.
K: Resolve every force into components, add the components, and rebuild the resultant; in 3D write forces as Cartesian vectors using unit vectors along their lines of action.
!: Using the wrong trigonometric function after measuring the angle from the y-axis. Always check which axis θ is measured from: sin and cos swap if it is measured from the vertical.
EV: established | Resolution of forces into components is the foundation of statics in every engineering mechanics text.
EV: established | Treating forces as vectors assumes small deformations so that geometry doesn't change under load.
T: Resultant | The single force with the same effect as a system of forces acting at a point
T: Component | The part of a vector acting along a chosen axis
T: Unit vector | A vector of magnitude one used to specify direction
SUM: F_{x} = F cos θ and F_{y} = F sin θ.
SUM: Add components to find the resultant.
SUM: In 3D, F = F_{x}i + F_{y}j + F_{z}k; a cable force is F times the unit vector along the cable.
SRC: Hibbeler R. C., Engineering Mechanics: Statics, 14th edition in SI units, Pearson | secondary | 2017
SRC: Meriam J. L., Kraige L. G. and Bolton J. N., Engineering Mechanics: Statics, 9th edition, Wiley | secondary | 2018
Q: What are the components of a force F at angle θ to the x-axis? | F_{x} = F cos θ and F_{y} = F sin θ.
Q: How is the magnitude of a 3D force found from its components? | F = √(F_{x}^{2} + F_{y}^{2} + F_{z}^{2}).
M1#engineering-u02-01-q1@1: A 100 N force acts at 90° to the x-axis. What is its x-component? | 0 N | 100 N | 50 N | 70.7 N | cos 90° = 0, so a force along the y-axis has no x-component.
M2#engineering-u02-01-q2@2: Forces of 6 kN along +x and 8 kN along −y act at a point. What is the resultant? | 10 kN at 53.1° below the x-axis | 14 kN along the x-axis | 2 kN at 45° below the x-axis | 10 kN at 36.9° above the x-axis | R = √(6^{2} + 8^{2}) = 10 kN; tan^{-1}(8/6) = 53.1°, below the axis because the y-component is negative.
M3#engineering-u02-01-q3@3: A cable runs from A(0, 0, 0) to B(2, 3, 6) m and carries 700 N. What is the force on A? | 200i + 300j + 600k N | 700i + 700j + 700k N | 2i + 3j + 6k N | 100i + 150j + 300k N | Length AB = √(4 + 9 + 36) = 7 m; unit vector (2/7, 3/7, 6/7); F = 700 × that = (200, 300, 600) N.
NUM1#engineering-u02-01-q4@1: A 600 N force acts at 40° above the horizontal. What is its horizontal component, in N? | 459.6 | 1% | N | F_{x} = 600 cos 40° = 600 × 0.766 = 459.6 N.
SA2#engineering-u02-01-q5@2,3: Explain why resolving into components is preferred to graphical addition of forces. | Components turn vector addition into simple addition of numbers along each axis, which works for any number of forces, is accurate, extends directly to three dimensions and can be checked algebraically. Graphical methods are limited by drawing accuracy and become impractical in 3D or with many forces. | Components add as scalars ; Works for many forces ; Extends to 3D ; Accuracy compared with drawing

## Moments and couples
LV: Year 1 · Foundation
S: A moment is the turning effect of a force about a point or axis. This lesson defines moment, applies the principle of moments and Varignon's theorem, introduces the vector cross product, and explains couples.
O: Calculate the moment of a force about a point in 2D
O: Use Varignon's theorem and the cross product to find moments
O: Define a couple and explain why its moment is the same about any point
PRE: Forces as vectors
H: Moment of a force
E: M = F d :: d is the perpendicular distance from the point to the line of action
P: Moments are measured in N m (or kN m). In 2D, take anticlockwise as positive by convention and state it.
P: **Varignon's theorem**: the moment of a force about a point equals the sum of the moments of its components about that point. This is often easier than finding the perpendicular distance.
X: A spanner 0.25 m long has 80 N applied at its end.
> Force perpendicular to the spanner: M = 80 × 0.25 = 20 N m.
> Force at 60° to the spanner: perpendicular component = 80 sin 60° = 69.3 N.
> M = 69.3 × 0.25 = 17.3 N m.
> Force along the spanner: perpendicular distance zero, so M = 0.
H: The vector moment
E: M_{O} = r × F :: r is a position vector from O to any point on the line of action
P: The cross product gives both magnitude and direction (by the right-hand rule) and works in 3D. Its z-component in 2D is M = xF_{y} − yF_{x}.
H: Couples
P: A **couple** is two equal and opposite parallel forces separated by a distance d. Its moment is **M = F d**, and it is the same about every point: a couple has no resultant force, only a pure turning effect.
K: Moment = force × perpendicular distance; Varignon's theorem lets you sum the moments of components; a couple is a pure moment, the same about any point.
!: Multiplying force by the distance to the point of application rather than the perpendicular distance to the line of action. Only the perpendicular distance gives the moment.
EV: established | The principle of moments and Varignon's theorem are standard results of rigid-body mechanics.
EV: established | Sign conventions for 2D moments vary between texts; consistency within a calculation is what matters.
T: Moment | The turning effect of a force, equal to force times perpendicular distance from the point
T: Couple | Two equal, opposite, parallel forces whose only effect is a moment
T: Varignon's theorem | The moment of a force equals the sum of the moments of its components
SUM: M = Fd, using perpendicular distance.
SUM: M = r × F gives moments in vector form.
SUM: A couple's moment Fd is the same about every point.
SRC: Hibbeler R. C., Engineering Mechanics: Statics, 14th edition in SI units, Pearson | secondary | 2017
SRC: Beer F. P., Johnston E. R. et al., Vector Mechanics for Engineers: Statics, 12th edition, McGraw-Hill | secondary | 2019
Q: What is a couple? | Two equal and opposite parallel forces, not collinear, producing a pure moment.
Q: What is Varignon's theorem? | The moment of a force about a point equals the sum of the moments of its components about that point.
M1#engineering-u02-02-q1@1: What unit is used for moments in SI? | N m | N | N/m | J/m | Moment is force times distance, so newton-metres.
M2#engineering-u02-02-q2@2: Two 50 N forces form a couple, 0.4 m apart. What is the moment of the couple about a point 2 m away? | 20 N m | 100 N m | 120 N m | 0 N m | A couple's moment is Fd = 50 × 0.4 = 20 N m about any point.
M3#engineering-u02-02-q3@3: A force F = 30i + 40j N acts at r = 2i + 1j m from O. What is the moment about O? | 50 N m anticlockwise | 110 N m anticlockwise | 50 N m clockwise | 100 N m anticlockwise | M = xF_{y} − yF_{x} = 2 × 40 − 1 × 30 = 80 − 30 = 50 N m, positive so anticlockwise.
NUM1#engineering-u02-02-q4@1: A 150 N force acts perpendicular to the end of a 0.6 m bar. What is its moment about the other end, in N m? | 90 | 1% | N m | M = F d = 150 × 0.6 = 90 N m.
SA2#engineering-u02-02-q5@2,3: Explain why a couple has the same moment about every point, and give an engineering example. | Take moments of the two forces about any point: the distances to each line of action differ by d, and since the forces are equal and opposite, the terms combine to F × d whatever point is chosen. The resultant force is zero, so only a moment remains. Examples: turning a tap or steering wheel with two hands, or a shaft carrying torque. | Sum of moments gives F × d ; Independence of point ; Zero resultant force ; Example

## Equivalent force systems
LV: Year 1 · Intermediate
S: Any system of forces and couples on a rigid body can be replaced by a simpler equivalent system. This lesson shows how to move a force to a new point by adding a couple, reduce a system to a force–couple pair, and find the single resultant of parallel forces.
O: Replace a force by an equivalent force and couple at another point
O: Reduce a system of forces to a resultant force and couple
O: Locate the line of action of the resultant of parallel forces
PRE: Moments and couples
H: Moving a force
P: Two systems are **equivalent** if they have the same resultant force and the same resultant moment about every point. A force F at point A can be moved to point O if a **couple** M = r × F is added, where r runs from O to A.
X: A 2 kN force acts vertically downward 0.3 m to the right of a bolt O.
> Move the force to O: 2 kN downward at O.
> Add a couple equal to its moment about O: 2 × 0.3 = 0.6 kN m, clockwise.
> The bolt "feels" a 2 kN shear and a 0.6 kN m moment.
> This is how bracket and connection designers find the loads on fixings.
H: Reducing a system
- Resultant force **F**_{R} = Σ**F**.
- Resultant moment about O: **M**_{RO} = Σ(**r** × **F**) + Σ**M**.
P: In 2D, a force–couple system can always be reduced to a **single force** whose line of action is offset from O by d = M_{RO}/F_{R} (unless F_{R} = 0, when the system is a pure couple).
H: Parallel forces
E: R = ΣF, x̄ = Σ(F x) ÷ ΣF :: location of the resultant of parallel forces
P: This is the same calculation as finding a centre of gravity.
K: A force can be moved to any point by adding a couple equal to its moment about that point; any 2D system reduces to one force or one couple.
!: Forgetting the couple when moving a force. Sliding a force along its own line of action changes nothing, but moving it sideways changes its moment, which must be added back as a couple.
EV: established | Equivalence of force systems follows from the rigid-body assumption: only resultant force and moment matter for external effects.
EV: established | Internal stresses do depend on where loads act, so equivalent systems aren't interchangeable for stress analysis (Saint-Venant's principle limits the difference to a local region).
T: Equivalent system | A system with the same resultant force and resultant moment about every point
T: Force–couple system | A single force at a point together with a couple
SUM: Moving a force sideways requires adding a couple.
SUM: Any system reduces to a resultant force and a resultant moment.
SUM: The resultant of parallel forces acts at x̄ = Σ(Fx)/ΣF.
SRC: Hibbeler R. C., Engineering Mechanics: Statics, 14th edition in SI units, Pearson | secondary | 2017
SRC: Meriam J. L., Kraige L. G. and Bolton J. N., Engineering Mechanics: Statics, 9th edition, Wiley | secondary | 2018
Q: What must be added when a force is moved parallel to itself to a new point? | A couple equal to the moment of the force about the new point.
Q: When can a 2D force system not be reduced to a single force? | When its resultant force is zero but its moment isn't: it is then a pure couple.
M1#engineering-u02-03-q1@1: Two systems are equivalent if they have the same resultant force and the same what? | Resultant moment about every point | Number of forces | Points of application | Internal stresses | External effects on a rigid body depend only on resultant force and resultant moment.
M2#engineering-u02-03-q2@2: Downward loads of 3 kN at x = 1 m and 5 kN at x = 4 m act on a beam. Where does the resultant act? | x = 2.875 m | x = 2.5 m | x = 4 m | x = 3.2 m | Taking moments about x = 0: x̄ = (3 × 1 + 5 × 4)/8 = 23/8 = 2.875 m.
M3#engineering-u02-03-q3@3: A system reduces to F_{R} = 10 kN upward at O and M_{RO} = 25 kN m anticlockwise. Where does the single equivalent force act? | 2.5 m to the right of O | 2.5 m to the left of O | 0.4 m to the right of O | At O, with the couple ignored | An upward force at x to the right of O has moment +10x about O (anticlockwise). Setting 10x = 25 gives x = 2.5 m to the right; to the left it would turn the other way.
NUM2#engineering-u02-03-q4@2: Forces of 4 kN at x = 2 m and 6 kN at x = 5 m act downward on a beam. At what x does their resultant act, in m? | 3.8 | 1% | m | x̄ = (4 × 2 + 6 × 5)/(4 + 6) = 38/10 = 3.8 m.
SA2#engineering-u02-03-q5@2,3: Explain why a designer replacing a load on a bracket with a force and couple at the bolt gets the right answer for the bolt but not necessarily for stresses in the bracket. | The force–couple system at the bolt is statically equivalent: it gives the same resultant force and moment, so the bolt reactions are correct. But stresses inside the bracket depend on where loads actually act; moving the load changes internal forces between the original point and the bolt. Equivalence holds for external effects on a rigid body, not for internal stress. | Same resultant force and moment ; Correct for support reactions ; Internal stresses depend on load location ; Rigid-body limitation

## Free-body diagrams
LV: Year 1 · Foundation
S: A free-body diagram isolates a body and shows every external force and moment acting on it. This lesson sets out how to draw one, the reactions provided by common supports, and the errors that most often make statics answers wrong.
O: Draw a correct free-body diagram for a body or structure
O: Represent the reactions at pins, rollers, fixed supports, cables and contact surfaces
O: Identify common errors in free-body diagrams
PRE: Moments and couples
H: Drawing a free-body diagram
- **1. Isolate** the body: draw it free of everything it touches.
- **2. Add applied loads**: weights at the centre of gravity, applied forces and couples.
- **3. Replace every support or contact** with the reactions it can provide.
- **4. Label** dimensions, angles and unknowns, and choose axes.
P: Unknown reactions can be drawn in an assumed direction; a negative answer means the actual direction is opposite.
H: Supports and their reactions
- **Cable or rope**: one tension, along the cable, pulling away from the body.
- **Roller or smooth surface**: one force perpendicular to the surface.
- **Smooth pin or hinge**: two force components (or a force of unknown direction); no moment.
- **Fixed support** (built-in): two force components and a moment.
- **Rough surface**: a normal force and a friction force.
X: A uniform ladder of weight W leans against a smooth wall on rough ground.
> Isolate the ladder.
> Weight W acts at its midpoint.
> At the wall (smooth): one horizontal force N_{W}, perpendicular to the wall.
> At the ground (rough): a vertical normal force N_{G} and a horizontal friction force F towards the wall.
> Three unknowns, three equilibrium equations: solvable.
K: A free-body diagram shows the isolated body with every external force and moment, each support replaced by exactly the reactions it can provide.
!: Including internal forces or forces the body exerts on something else. A free-body diagram shows only forces acting on the body from outside.
EV: established | Errors in free-body diagrams are the most common source of wrong answers in introductory statics, a finding repeated in engineering education research.
EV: established | Real supports are only approximately pins, rollers or fixed; idealisation is an engineering judgement.
T: Free-body diagram | A sketch of a body isolated from its surroundings showing all external forces and moments on it
T: Reaction | A force or moment exerted on a body by a support or contact
T: Fixed support | A support that prevents translation and rotation, providing two force components and a moment in 2D
SUM: Isolate the body, add loads, replace supports with reactions, label.
SUM: Cables pull, rollers push perpendicular, pins give two forces, fixed supports add a moment.
SUM: Show only external forces on the body.
SRC: Hibbeler R. C., Engineering Mechanics: Statics, 14th edition in SI units, Pearson | secondary | 2017
SRC: Steif P. S. and Dantzler J. A., "A Statics Concept Inventory: development and psychometric analysis", Journal of Engineering Education 94(4), 363–371 | primary | 2005
Q: How many reactions does a pin support provide in 2D? | Two force components; no moment.
Q: In which direction does a cable force act on a body? | Along the cable, pulling away from the body.
M1#engineering-u02-04-q1@1: Which support provides a moment reaction? | A fixed support | A roller | A smooth pin | A cable | Only a fixed (built-in) support prevents rotation, so only it provides a moment.
M2#engineering-u02-04-q2@2: A beam has a pin at A and a roller on a horizontal surface at B. How many unknown reactions are there? | Three | Two | Four | Five | The pin gives two components and the roller one vertical force: three in total.
M3#engineering-u02-04-q3@3: A student's free-body diagram of a crate on a ramp shows its weight, a normal force and "the force of the crate on the ramp". What is wrong? | The force of the crate on the ramp acts on the ramp, so it doesn't belong on the crate's diagram | Nothing: all forces involving the crate should be shown | The weight should be omitted because it is internal | The normal force acts horizontally and must be redrawn | A free-body diagram shows only forces acting on the isolated body; the crate's push on the ramp is a force on the ramp.
NUM1#engineering-u02-04-q4@1: What is the weight of a 20 kg machine part, in N, taking g = 9.81 m s^{-2}? | 196.2 | 1% | N | W = mg = 20 × 9.81 = 196.2 N.
SA2#engineering-u02-04-q5@2,3: Draw in words the free-body diagram of a cantilever beam built into a wall with a point load at its free end, and explain each reaction. | Isolate the beam. Show the point load at the free end and the beam's weight at its centre if significant. At the wall, show a horizontal and a vertical reaction force and a moment, because a fixed support prevents movement in both directions and rotation. These three reactions balance the loads. | Isolated beam with loads ; Two force reactions ; Moment reaction ; Reason: fixed support prevents translation and rotation

## Equilibrium of a particle
LV: Year 1 · Foundation
S: A particle is in equilibrium when the resultant force on it is zero. This lesson applies the equations of equilibrium to particles in two and three dimensions, uses Lami's theorem, and shows why shallow cables carry large tensions.
O: Apply ΣF_{x} = 0 and ΣF_{y} = 0 to a particle
O: Use Lami's theorem for three concurrent forces
O: Solve for cable tensions in 2D and 3D particle problems
PRE: Free-body diagrams
H: The equations
P: A body can be treated as a **particle** when all forces act through one point, so moments don't arise. Equilibrium requires the resultant force to be zero:
E: ΣF_{x} = 0, ΣF_{y} = 0 (and ΣF_{z} = 0 in 3D) :: two equations in 2D, three in 3D
P: So a 2D particle problem can solve for two unknowns; a 3D problem for three.
H: Lami's theorem
E: F_{1}/sin α = F_{2}/sin β = F_{3}/sin γ :: for three concurrent forces in equilibrium, each angle is between the other two forces
X: A 100 kg load hangs from two cables, each at 30° to the horizontal.
> Weight W = 100 × 9.81 = 981 N.
> By symmetry the tensions are equal, T.
> Vertical: 2T sin 30° = 981, so T = 981 N.
> Each cable carries a tension equal to the whole weight.
> At 10° to the horizontal, T = 981/(2 sin 10°) = 2,825 N: shallower cables carry far larger forces.
H: In three dimensions
P: Write each cable force as its tension times a unit vector along the cable, then set the sum of the i, j and k components to zero, giving three equations for three tensions.
K: For a particle in equilibrium the components of all forces sum to zero; shallow cables need large tensions to support a vertical load.
!: Assuming each of two cables carries half the weight. That is only true if both are vertical; inclined cables carry more, and the tension grows rapidly as they flatten.
EV: established | Particle equilibrium follows directly from Newton's first law.
EV: established | The large tensions in nearly horizontal cables explain why overhead lines and slacklines are designed with visible sag.
T: Particle | A body whose size is negligible for the analysis, so all forces act through one point
T: Equilibrium | A state in which the resultant force (and, for a rigid body, the resultant moment) is zero
T: Lami's theorem | For three concurrent forces in equilibrium, each force is proportional to the sine of the angle between the other two
SUM: For a particle, ΣF = 0 in each direction.
SUM: Lami's theorem solves three concurrent forces.
SUM: Shallow cables carry large tensions.
SRC: Hibbeler R. C., Engineering Mechanics: Statics, 14th edition in SI units, Pearson | secondary | 2017
SRC: Meriam J. L., Kraige L. G. and Bolton J. N., Engineering Mechanics: Statics, 9th edition, Wiley | secondary | 2018
Q: How many unknowns can be found from particle equilibrium in 2D? | Two.
Q: Why does a nearly horizontal cable carry a large tension? | Only its small vertical component supports the load, so the tension must be large.
M1#engineering-u02-05-q1@1: Which conditions define equilibrium of a particle in 2D? | ΣF_{x} = 0 and ΣF_{y} = 0 | ΣM = 0 only | ΣF_{x} = ΣF_{y} | ΣF = mg | A particle has no moments, so only the two force sums must be zero.
M2#engineering-u02-05-q2@2: A 50 N weight hangs from a ring held by a horizontal rope and a rope at 45° to the horizontal. What is the tension in the inclined rope? | 70.7 N | 50 N | 35.4 N | 100 N | Vertical: T sin 45° = 50, so T = 50/0.7071 = 70.7 N.
M3#engineering-u02-05-q3@3: A sign of weight W hangs from two cables at 30° and 60° to the horizontal. Which cable carries more tension? | The cable at 60°, because it is steeper and takes more of the vertical load | The cable at 30°, because shallow cables always carry more | They are equal by symmetry | Neither: they each carry W/2 | Horizontal balance: T_{30} cos 30° = T_{60} cos 60°, so T_{60} = 1.732 T_{30}. The steeper cable carries more.
NUM2#engineering-u02-05-q4@2: A 40 kg mass hangs from two symmetric cables, each at 60° to the horizontal. What is the tension in each cable, in N (g = 9.81 m s^{-2})? | 226.5 | 1% | N | W = 392.4 N; 2T sin 60° = 392.4; T = 392.4/1.732 = 226.5 N.
SA2#engineering-u02-05-q5@2,3: Explain why overhead power cables are allowed to sag rather than being pulled taut. | A cable supports its own weight through the vertical component of its tension. If it is nearly horizontal, the vertical component is a tiny fraction of the tension, so the tension needed becomes enormous and could exceed the cable's strength or overload the pylons. Allowing sag steepens the cable near its supports, reducing tension to a safe level; sag also allows for thermal expansion. | Vertical component supports weight ; Small angle gives huge tension ; Sag reduces tension ; Additional reason such as thermal expansion

## Equilibrium of a rigid body in two dimensions
LV: Year 1 · Intermediate
S: A rigid body is in equilibrium when both the resultant force and the resultant moment are zero. This lesson applies the three equations of 2D equilibrium to beams and brackets, and shows how to choose moment centres to simplify the algebra.
O: Apply the three equations of equilibrium to a rigid body in 2D
O: Calculate support reactions for beams and frames
O: Choose moment points and equations to solve efficiently
PRE: Free-body diagrams
H: The three equations
E: ΣF_{x} = 0, ΣF_{y} = 0, ΣM_{A} = 0 :: about any point A
P: Three independent equations allow three unknowns to be found. Alternative sets are valid, such as two moment equations and one force equation, as long as the moment points don't lie on a line perpendicular to the force direction used.
H: Solving efficiently
- Take moments about a point where **two unknown forces act**: they drop out, leaving one unknown.
- Use the remaining force equations to find the others.
- **Check** with an equation you haven't used, such as moments about another point.
X: A simply supported beam 6 m long, pin at A and roller at B, with a 12 kN downward load 2 m from A.
> Free-body diagram: A_{x}, A_{y} at A; B_{y} at B; 12 kN load.
> ΣM_{A} = 0: B_{y} × 6 − 12 × 2 = 0, so B_{y} = 4 kN.
> ΣF_{y} = 0: A_{y} + 4 − 12 = 0, so A_{y} = 8 kN.
> ΣF_{x} = 0: A_{x} = 0.
> Check, ΣM_{B}: −A_{y} × 6 + 12 × 4 = −48 + 48 = 0. Correct.
H: Two-force and three-force members
- A **two-force member** has forces at two points only: the forces are equal, opposite and along the line joining the points.
- A **three-force member** in equilibrium has its three forces either concurrent or parallel.
K: In 2D, ΣF_{x} = 0, ΣF_{y} = 0 and ΣM = 0 give three equations; taking moments about a point on two unknown lines of action makes the solution quick.
!: Forgetting the moment of a load when taking moments about a point not on its line of action, or adding forces and moments together in one equation. Each equation must contain only forces or only moments.
EV: established | Rigid-body equilibrium equations are the basis of structural and mechanical design calculations.
EV: established | Real structures deform; treating them as rigid is valid when deflections are small compared with dimensions.
T: Simply supported beam | A beam with a pin at one end and a roller at the other
T: Two-force member | A member loaded at two points only, so the forces act along the line between them
T: Rigid body | A body whose deformation is negligible for the analysis
SUM: Three equations: ΣF_{x}, ΣF_{y} and ΣM equal zero.
SUM: Take moments where unknowns meet; check with an unused equation.
SUM: Two-force members carry axial forces only.
SRC: Hibbeler R. C., Engineering Mechanics: Statics, 14th edition in SI units, Pearson | secondary | 2017
SRC: Hulse R. and Cain J., Structural Mechanics, 2nd edition, Palgrave | secondary | 2000
Q: Why take moments about a support with two unknown reactions? | Both unknowns pass through that point, so they drop out of the moment equation.
Q: What can be said about the forces on a two-force member? | They are equal, opposite and act along the line joining the two points.
M1#engineering-u02-06-q1@1: How many independent equilibrium equations are there for a rigid body in 2D? | Three | Two | Six | One | Two force equations and one moment equation.
M2#engineering-u02-06-q2@2: A 4 m simply supported beam carries 20 kN at its midpoint. What is the reaction at each support? | 10 kN | 20 kN | 5 kN | 40 kN | By symmetry each support takes half: 10 kN. Moments about either support confirm it.
M3#engineering-u02-06-q3@3: A 5 m beam, pin at A and roller at B, carries 10 kN 1.5 m from A and a clockwise couple of 5 kN m. What is B_{y}? | 4 kN | 3 kN | 2 kN | 7 kN | ΣM_{A} (anticlockwise positive): 5B_{y} − 10 × 1.5 − 5 = 0, so 5B_{y} = 20 and B_{y} = 4 kN.
NUM2#engineering-u02-06-q4@2: A 5 m simply supported beam carries a 10 kN load 1.5 m from support A. What is the reaction at A, in kN? | 7 | 1% | kN | ΣM_{A}: 5B_{y} = 10 × 1.5, B_{y} = 3 kN; ΣF_{y}: A_{y} = 10 − 3 = 7 kN.
SA2#engineering-u02-06-q5@2,3: Explain how you would find the reactions of a beam with a pin, a roller and several loads, and how you would check your answer. | Draw the free-body diagram with the pin's two reactions, the roller's one reaction and all loads. Take moments about the pin to eliminate its two unknowns and find the roller reaction. Use ΣF_{y} = 0 and ΣF_{x} = 0 for the pin reactions. Check with moments about the roller, which should also give zero. | Free-body diagram ; Moments about pin first ; Force equations for remaining unknowns ; Independent check

## Equilibrium in three dimensions
LV: Year 1 · Intermediate
S: In three dimensions a rigid body has six equilibrium equations: three for forces and three for moments. This lesson sets out the 3D support reactions, applies the six equations, and shows how choosing moment axes cuts the algebra.
O: State the six equations of equilibrium for a rigid body in 3D
O: Represent common 3D supports by their reactions
O: Solve 3D equilibrium problems by taking moments about well-chosen axes
PRE: Equilibrium of a rigid body in two dimensions
H: Six equations
E: ΣF_{x} = ΣF_{y} = ΣF_{z} = 0; ΣM_{x} = ΣM_{y} = ΣM_{z} = 0 :: six scalar equations, so up to six unknowns
P: In vector form: Σ**F** = **0** and Σ**M**_{O} = Σ(**r** × **F**) + Σ**M** = **0**.
H: 3D supports
- **Ball-and-socket**: three force components, no moments.
- **Smooth surface or single roller**: one force normal to the surface.
- **Journal bearing** (properly aligned, with others): two force components perpendicular to the shaft.
- **Thrust bearing**: three force components.
- **Fixed support**: three forces and three moments.
X: A rectangular plate lies in the xy-plane, 2 m along x and 1 m along y, resting on vertical supports at A(0, 0), B(2, 0) and C(0, 1). A 600 N load acts downward at (0.8, 0.4) m.
> Moments about the x-axis (only y-positions matter): C × 1 − 600 × 0.4 = 0, so C = 240 N.
> Moments about the y-axis (only x-positions matter): B × 2 − 600 × 0.8 = 0, so B = 240 N.
> ΣF_{z}: A + 240 + 240 − 600 = 0, so A = 120 N.
> Each moment equation contained only one unknown because the axes passed through the other supports.
K: A 3D rigid body needs six equations; taking moments about axes that pass through several unknown forces isolates one unknown at a time.
!: Using too many journal-bearing reactions. With two aligned bearings on one shaft, bearing moments are normally neglected; including them makes the problem appear indeterminate.
EV: established | The six 3D equilibrium equations follow from Newton's laws for a rigid body.
EV: established | Real bearing reactions depend on stiffness and clearance; the idealised reactions are design approximations.
T: Ball-and-socket joint | A support preventing translation in all three directions but allowing rotation, with three force reactions
T: Journal bearing | A bearing supporting a shaft radially, giving two force reactions perpendicular to the shaft
T: Moment about an axis | The component along an axis of the moment of a force about a point on that axis
SUM: Six equations: three force sums and three moment sums.
SUM: 3D supports provide between one and six reactions.
SUM: Moments about well-chosen axes isolate unknowns.
SRC: Hibbeler R. C., Engineering Mechanics: Statics, 14th edition in SI units, Pearson | secondary | 2017
SRC: Beer F. P., Johnston E. R. et al., Vector Mechanics for Engineers: Statics, 12th edition, McGraw-Hill | secondary | 2019
Q: How many reactions does a ball-and-socket joint provide? | Three force components and no moments.
Q: How many independent equilibrium equations does a 3D rigid body have? | Six.
M1#engineering-u02-07-q1@1: Which 3D support provides three forces and three moments? | A fixed support | A ball-and-socket joint | A smooth surface | A journal bearing | A fixed support prevents all translation and rotation, so it gives six reactions.
M2#engineering-u02-07-q2@2: Why take moments about an axis through two supports in a 3D problem? | Forces through or parallel to that axis have no moment about it, so they drop out | It makes all forces zero | It doubles the number of equations | Moments are only valid about supports | A force intersecting or parallel to an axis has zero moment about it, leaving fewer unknowns.
M3#engineering-u02-07-q3@3: In the plate example, the load moves to (1.0, 0.5) m. What happens to the reaction at A? | It becomes zero | It doubles to 240 N | It stays at 120 N | It becomes negative | C = 600 × 0.5 = 300 N, B = 600 × 1.0/2 = 300 N, so A = 600 − 600 = 0: the load lies on the line through B and C.
NUM2#engineering-u02-07-q4@2: A plate on vertical supports at A(0, 0), B(3, 0) and C(0, 2) m carries 900 N downward at (1, 1) m. What is the reaction at C, in N? | 450 | 1% | N | Moments about the x-axis: C × 2 = 900 × 1, so C = 450 N.
SA2#engineering-u02-07-q5@2,3: Explain why a shaft supported by two journal bearings is usually modelled without bearing moment reactions. | Each journal bearing could in principle resist small moments, but with two aligned bearings the shaft's rotation is controlled by the pair acting together, and bearings are designed to allow slight misalignment. Including moments would add unknowns and make the problem statically indeterminate; neglecting them gives four force reactions plus axial restraint, which is solvable and matches real behaviour closely. | Pair of bearings controls rotation ; Bearings allow misalignment ; Including moments makes it indeterminate ; Resulting model is solvable

## Statical determinacy and stability
LV: Year 1 · Intermediate
S: A structure is statically determinate if equilibrium alone can find all its reactions and internal forces. This lesson shows how to count unknowns and equations, how to spot improper supports that make a structure unstable, and why engineers sometimes choose indeterminate structures.
O: Classify a structure as statically determinate, indeterminate or unstable
O: Apply m + r = 2j to plane trusses
O: Identify partial and improper constraints
PRE: Equilibrium of a rigid body in two dimensions
H: Counting unknowns
P: In 2D, a rigid body has three equilibrium equations. With **r** unknown reactions:
- r < 3: **unstable** (a mechanism): the body can move.
- r = 3 and properly arranged: **statically determinate**.
- r > 3: **statically indeterminate** to degree r − 3: equilibrium alone can't find the reactions.
P: For a plane **truss** with m members, r reactions and j joints, each joint gives two equations:
E: m + r = 2j :: determinate (if stable); m + r > 2j indeterminate; m + r < 2j unstable
H: Stability and improper constraints
P: Counting is necessary but not sufficient. Supports must also be **properly arranged**:
- **Parallel reactions**: three rollers on a horizontal surface give three vertical reactions but nothing resists sideways movement.
- **Concurrent reactions**: if all reaction lines meet at one point, nothing resists rotation about it.
X: Check a simply supported truss.
> A triangle of three members on a pin and roller: m = 3, r = 3, j = 3.
> m + r = 6 = 2j: determinate.
> Replace the roller with a second pin: r = 4, m + r = 7 > 6: indeterminate to degree 1.
> Replace the pin with a roller: r = 2, m + r = 5 < 6: unstable, it slides sideways.
H: Why choose indeterminate structures?
- **Redundancy**: if one member fails, loads redistribute.
- **Stiffness**: smaller deflections and moments.
- **Cost**: indeterminate structures need compatibility of deformation as well as equilibrium to analyse, and are sensitive to settlement and temperature.
K: Determinacy needs as many independent equations as unknowns and supports arranged so no movement is possible; indeterminate structures give redundancy but need deformation analysis.
!: Declaring a structure determinate from the count alone. A structure with the right number of reactions can still be unstable if they are all parallel or all meet at one point.
EV: established | Determinacy counts and stability criteria are standard in structural analysis.
EV: established | Redundancy is a deliberate design principle in bridges and aircraft structures, where single-member failure must not cause collapse.
T: Statically determinate | Able to be fully analysed using equilibrium equations alone
T: Statically indeterminate | Having more unknowns than independent equilibrium equations
T: Mechanism | A structure that can move without deforming its members, and so can't carry general loads
SUM: In 2D, r = 3 properly arranged is determinate.
SUM: Trusses: compare m + r with 2j.
SUM: Parallel or concurrent reactions cause instability.
SRC: Hibbeler R. C., Structural Analysis, 10th edition in SI units, Pearson | secondary | 2018
SRC: Hulse R. and Cain J., Structural Mechanics, 2nd edition, Palgrave | secondary | 2000
Q: What is the determinacy condition for a plane truss? | m + r = 2j, with the structure also stable.
Q: Why are three parallel reactions unstable? | Nothing resists movement perpendicular to them.
M1#engineering-u02-08-q1@1: A 2D beam has four unknown reactions. What is it? | Statically indeterminate to degree one | Statically determinate | Unstable | A mechanism | Four unknowns and three equations: one more than equilibrium can solve.
M2#engineering-u02-08-q2@2: A plane truss has 9 members, 6 joints and 3 reactions. Is it determinate? | Yes: m + r = 12 = 2j | No: it is unstable | No: it is indeterminate to degree 3 | No: m must equal j | 9 + 3 = 12 and 2 × 6 = 12, so it passes the count (stability must still be checked).
M3#engineering-u02-08-q3@3: A beam is supported by three rollers, all on horizontal surfaces. What is the problem? | All reactions are vertical, so horizontal loads can't be resisted | It is statically indeterminate to degree three | It has too many reactions for equilibrium | Nothing: three reactions make it determinate | Three reactions match three equations, but parallel reactions leave horizontal movement unrestrained: an improper constraint.
NUM2#engineering-u02-08-q4@2: A plane truss has 14 members and 8 joints and is supported by two pins. To what degree is it statically indeterminate? | 2 | 0 | degree | Two pins give r = 4; m + r = 14 + 4 = 18 and 2j = 16, so it is indeterminate to degree 18 − 16 = 2 (if stable).
SA2#engineering-u02-08-q5@3: Evaluate the advantages and disadvantages of statically indeterminate structures. | Advantages: redundancy, so loads redistribute if a member fails; greater stiffness and lower maximum moments, allowing lighter members. Disadvantages: analysis needs material properties and compatibility as well as equilibrium; settlement, temperature changes and fabrication errors induce extra stresses. The choice depends on safety, stiffness, cost and ground conditions. | Redundancy ; Stiffness or efficiency ; Analysis complexity ; Induced stresses from settlement or temperature

## Plane trusses: the method of joints
LV: Year 1 · Intermediate
S: A truss is a framework of straight members joined at their ends. This lesson states the assumptions of ideal truss analysis, solves member forces by equilibrium of each joint, and shows how to recognise zero-force members.
O: State the assumptions of ideal truss analysis
O: Find member forces using the method of joints
O: Identify zero-force members by inspection
PRE: Statical determinacy and stability
H: Ideal trusses
- Members are straight and connected by **smooth pins** at their ends.
- Loads act only at **joints**.
- Member weights are neglected or shared between joints.
P: So each member is a **two-force member**, carrying a pure **tension** or **compression** along its axis.
H: The method of joints
- **1.** Find the support reactions from the whole truss.
- **2.** Start at a joint with no more than **two unknown** member forces.
- **3.** Assume every unknown member is in tension (force pointing away from the joint).
- **4.** Apply ΣF_{x} = 0 and ΣF_{y} = 0. A negative result means compression.
- **5.** Move to the next joint with two unknowns.
X: A triangular truss: A(0, 0) pin, B(4, 0) roller, C(2, 2) m, with 10 kN downward at C.
> Reactions by symmetry: A_{y} = B_{y} = 5 kN; A_{x} = 0.
> Joint A: AC is at 45°. ΣF_{y}: 5 + F_{AC} sin 45° = 0, so F_{AC} = −7.07 kN (compression).
> ΣF_{x}: F_{AB} + F_{AC} cos 45° = 0, so F_{AB} = +5.0 kN (tension).
> By symmetry F_{BC} = −7.07 kN. Check joint C: 2 × 7.07 sin 45° = 10 kN up, balancing the load.
H: Zero-force members
- At an unloaded joint with **two non-collinear members**, both carry zero force.
- At an unloaded joint with **three members, two collinear**, the third carries zero force.
P: Zero-force members still matter: they brace compression members against buckling and carry loads in other load cases.
K: Each truss joint gives two equations; start where there are two unknowns, assume tension, and read a negative answer as compression.
!: Removing zero-force members from a real design. They are zero only for that load case and often prevent slender compression members from buckling.
EV: established | Ideal truss analysis predicts axial forces in real trusses well when joints are compact and loads are applied at joints.
EV: established | Real joints are often bolted or welded, introducing small secondary bending moments that are usually checked separately.
T: Truss | A structure of straight members joined at their ends to form triangles
T: Method of joints | Finding member forces by applying force equilibrium at each joint in turn
T: Zero-force member | A truss member carrying no force under a given loading
SUM: Ideal truss members are two-force members in tension or compression.
SUM: Solve joint by joint, starting with two unknowns.
SUM: Zero-force members can be spotted by inspection but still matter.
SRC: Hibbeler R. C., Engineering Mechanics: Statics, 14th edition in SI units, Pearson | secondary | 2017
SRC: Hibbeler R. C., Structural Analysis, 10th edition in SI units, Pearson | secondary | 2018
Q: Why does each ideal truss member carry only axial force? | Pins transmit no moment and loads act only at joints, so each member is a two-force member.
Q: What does a negative member force mean if tension was assumed? | The member is in compression.
M1#engineering-u02-09-q1@1: How many equilibrium equations does each 2D truss joint provide? | Two | Three | One | Six | A joint is a particle: ΣF_{x} = 0 and ΣF_{y} = 0. Moments are automatically satisfied.
M2#engineering-u02-09-q2@2: At an unloaded joint, members 1 and 2 are collinear and member 3 is at an angle. What is the force in member 3? | Zero | Equal to member 1 | Twice member 1 | It can't be found without numbers | Resolving perpendicular to the collinear pair leaves only member 3's component, which must therefore be zero.
M3#engineering-u02-09-q3@3: In the triangular truss example, the load at C is doubled to 20 kN. What is the force in AB? | 10 kN tension | 5 kN tension | 14.1 kN compression | 10 kN compression | All forces scale linearly with load in a determinate truss: AB doubles from 5 to 10 kN, still in tension.
NUM2#engineering-u02-09-q4@2: In the triangular truss example, what is the magnitude of the force in member AC, in kN? | 7.07 | 1% | kN | ΣF_{y} at A: 5 + F_{AC} sin 45° = 0, so F_{AC} = −5/0.7071 = −7.07 kN, compression of magnitude 7.07 kN.
SA2#engineering-u02-09-q5@2,3: Explain the assumptions of ideal truss analysis and how real trusses differ. | Ideal trusses have straight members joined by frictionless pins, with loads only at joints, so members carry pure axial force. Real trusses have bolted or welded joints that transmit some moment, member self-weight acts along the members, and loads may act between joints. These cause secondary bending, usually small, which designers check separately. | Straight members and smooth pins ; Loads at joints ; Pure axial force ; Real differences and secondary bending

## Plane trusses: the method of sections
LV: Year 1 · Intermediate
S: The method of sections finds the forces in particular truss members directly, by cutting the truss and applying equilibrium to one part. This lesson explains how to choose the cut and the moment points, with a worked example on a parallel-chord truss.
O: Use the method of sections to find forces in selected truss members
O: Choose cuts and moment points that give one unknown per equation
O: Relate chord forces to the bending moment in the truss
PRE: Plane trusses: the method of joints
H: The method
- **1.** Find the reactions.
- **2.** Cut the truss through the members of interest, **no more than three** unknown members (in 2D).
- **3.** Draw the free-body diagram of one part, with unknown member forces assumed in tension.
- **4.** Take moments about the point where **two** of the unknown forces meet; the third is found directly.
P: The method is quickest when only a few member forces are needed, for example the most heavily loaded members at mid-span.
X: A parallel-chord truss spans 12 m in four 3 m panels, 3 m deep, with 10 kN at each of the three interior bottom joints. The diagonal in the second panel runs from the top joint at x = 3 m to the bottom joint at x = 6 m.
> Reactions: 15 kN at each end (total 30 kN, symmetric).
> Cut through the top chord, the diagonal and the bottom chord in the second panel; keep the left part.
> Moments about the bottom joint at x = 6 m (where the diagonal and bottom chord meet): 15 × 6 − 10 × 3 + F_{top} × 3 = 0.
> F_{top} = −60/3 = −20 kN: 20 kN compression.
> The bending moment there is 60 kN m; dividing by the depth (3 m) gives the chord force.
H: Trusses as deep beams
P: A truss carries bending moment as a **couple** between its chords: top chord in compression and bottom chord in tension (for downward loads on a simply supported truss), with chord force ≈ M/h. The **diagonals** carry the **shear force**. Deeper trusses have smaller chord forces.
K: Cut through at most three unknown members and take moments where two of them meet; chord forces equal the bending moment divided by the truss depth.
!: Cutting through four unknown members in a 2D problem. With only three equations, one part can't then be solved on its own.
EV: established | The method of sections (Ritter's method, 1862) is standard for finding selected truss forces.
EV: established | The chord force ≈ M/h relationship is the basis of preliminary truss sizing.
T: Method of sections | Finding member forces by cutting a truss and applying equilibrium to one part
T: Chord | A top or bottom longitudinal member of a truss
T: Web member | A diagonal or vertical member connecting the chords
SUM: Cut through three or fewer unknowns and take moments where two meet.
SUM: Chords carry bending as a couple; webs carry shear.
SUM: Chord force ≈ bending moment ÷ depth.
SRC: Hibbeler R. C., Engineering Mechanics: Statics, 14th edition in SI units, Pearson | secondary | 2017
SRC: Ritter A., Elementare Theorie und Berechnung eiserner Dach- und Brücken-Constructionen, Carl Rümpler | primary | 1862
Q: What is the maximum number of unknown member forces a 2D section should cut? | Three.
Q: Which truss members mainly carry the shear force? | The web members (diagonals and verticals).
M1#engineering-u02-10-q1@1: When is the method of sections more efficient than the method of joints? | When only a few member forces are needed | When every member force is needed | When the truss has no supports | When loads act between joints | Sections reach a particular member directly without solving every joint on the way.
M2#engineering-u02-10-q2@2: In a simply supported truss with downward loads, what is the force in the bottom chord at mid-span? | Tension | Compression | Zero | It alternates with each panel | The bottom chord is the tension side of the bending couple, like the bottom of a sagging beam.
M3#engineering-u02-10-q3@3: A designer doubles the depth of a truss while keeping its span and loads. What happens to the chord forces at mid-span? | They roughly halve, because chord force ≈ M/h | They double, because the members are longer | They stay the same, since loads are unchanged | They fall to zero, because depth removes bending | The bending moment is unchanged; doubling the lever arm h halves the couple forces.
NUM2#engineering-u02-10-q4@2: A truss 2.5 m deep has a bending moment of 150 kN m at a section. What is the approximate force in each chord, in kN? | 60 | 2% | kN | Chord force ≈ M/h = 150/2.5 = 60 kN.
SA2#engineering-u02-10-q5@2,3: Explain how the method of sections shows that a truss behaves like a deep beam. | Cutting a truss and taking moments shows that the top and bottom chord forces form a couple equal to the bending moment at the cut, with lever arm equal to the depth. Resolving vertically shows the diagonals carry the shear force. So the chords play the role of a beam's flanges and the web members the role of its web. | Chord forces form a couple ; Couple equals bending moment ; Diagonals carry shear ; Analogy to flanges and web

## Frames and machines
LV: Year 1 · Intermediate
S: Frames and machines are structures with at least one multi-force member, so their members carry bending as well as axial force. This lesson shows how to dismember them into free-body diagrams, apply Newton's third law at the pins, and find forces in pliers, linkages and frames.
O: Distinguish frames and machines from trusses
O: Dismember a frame and apply equilibrium to each member
O: Find the mechanical advantage of simple machines such as pliers
PRE: Equilibrium of a rigid body in two dimensions
H: What makes them different
P: A **frame** is a stationary structure that supports loads; a **machine** contains moving parts and transmits or changes forces. Both contain **multi-force members**: members with three or more forces or with loads between their ends, which bend as well as carry axial force.
H: The method
- **1.** If possible, find the external reactions from the whole structure.
- **2.** **Dismember**: draw a free-body diagram of each member.
- **3.** At each pin, forces on connected members are **equal and opposite** (Newton's third law).
- **4.** Identify **two-force members** first: their force is along their line, reducing unknowns.
- **5.** Apply three equilibrium equations to each multi-force member.
P: A frame that is rigid on its own (it keeps its shape when removed from its supports) lets you find external reactions from the whole structure first. A non-rigid frame, such as a three-pin arch, collapses without its supports, so the reactions can only be found by combining equations from the separate members.
X: A pair of pliers: handle grip force 100 N applied 120 mm from the pivot, jaws gripping 30 mm from the pivot.
> Free-body diagram of one half: grip force, jaw reaction and pin force.
> Moments about the pin: 100 × 120 = F_{jaw} × 30.
> F_{jaw} = 12,000/30 = 400 N.
> Mechanical advantage = 400/100 = 4: the ratio of lever arms.
> Pin force (vertical balance of one half): 100 + 400 = 500 N.
K: Frames and machines are solved by dismembering them, applying equal and opposite forces at shared pins, and using three equilibrium equations per member.
!: Treating a multi-force member as a two-force member. Only a member loaded at exactly two points, with no moments or loads between, has its force along the line joining those points.
EV: established | Dismembering structures into free bodies is the standard method for frames and machines in all statics texts.
EV: established | Real machines lose some force to friction at pins and bearings, so actual mechanical advantage is less than the ideal value.
T: Frame | A stationary structure with at least one multi-force member
T: Machine | A structure with moving parts designed to transmit or change forces
T: Mechanical advantage | The ratio of output force to input force
SUM: Frames and machines contain multi-force members that bend.
SUM: Dismember, apply equal and opposite pin forces, use two-force members.
SUM: Mechanical advantage follows from moment balance.
SRC: Hibbeler R. C., Engineering Mechanics: Statics, 14th edition in SI units, Pearson | secondary | 2017
SRC: Meriam J. L., Kraige L. G. and Bolton J. N., Engineering Mechanics: Statics, 9th edition, Wiley | secondary | 2018
Q: What principle relates the forces at a pin shared by two members? | Newton's third law: the forces on the two members are equal and opposite.
Q: What is a multi-force member? | A member with three or more forces, or loads between its ends, so it carries bending.
M1#engineering-u02-11-q1@1: What distinguishes a frame from a truss? | A frame contains at least one multi-force member | A frame has more joints than a truss | A frame has no supports | A frame carries only tension | Truss members are all two-force members; a frame has at least one that carries bending.
M2#engineering-u02-11-q2@2: Bolt cutters have handles 600 mm from the pivot and blades 40 mm from it. A 200 N grip force gives what blade force, ignoring friction? | 3,000 N | 1,200 N | 4,800 N | 300 N | 200 × 600 = F × 40, so F = 120,000/40 = 3,000 N.
M3#engineering-u02-11-q3@3: In a frame, a student finds a pin force on member AB acting left, and draws the same pin force on member BC also acting left. What is wrong? | The force on BC must act right: pin forces on connected members are equal and opposite | Nothing: both members feel the same force direction | The pin force should be zero for a frame | Pin forces act only on two-force members | Newton's third law requires the force from the pin on one member to be matched by an opposite force on the other.
NUM1#engineering-u02-11-q4@1: A lever has an effort arm of 0.9 m and a load arm of 0.15 m. What is its ideal mechanical advantage? | 6 | 1% | × | MA = effort arm/load arm = 0.9/0.15 = 6.
SA2#engineering-u02-11-q5@2,3: Explain how to find the force in a hydraulic cylinder that lifts the boom of an excavator. | Draw the free-body diagram of the boom, which is a multi-force member: its pin at the base, the load at the bucket end, its own weight and the cylinder force. The cylinder is a two-force member, so its force acts along its axis. Take moments about the base pin: cylinder force × its perpendicular distance equals the moments of the load and weight. The pin reactions follow from force equilibrium. | Boom free-body diagram ; Cylinder as two-force member ; Moments about base pin ; Pin reactions from force balance

## Distributed loads
LV: Year 1 · Foundation
S: Many loads are spread along a beam rather than acting at a point: self-weight, floor loads, snow, water pressure. This lesson shows how to replace a distributed load by its resultant, with uniform and triangular cases and the general integral.
O: Describe uniformly distributed and linearly varying loads
O: Find the magnitude and position of the resultant of a distributed load
O: Use resultants of distributed loads to find beam reactions
PRE: Equivalent force systems
H: Load intensity
P: A **distributed load** is described by its **intensity** w(x), force per unit length in N/m or kN/m. Its resultant is the area under the load diagram, acting through the **centroid** of that area.
E: F_{R} = ∫ w(x) dx; x̄ = ∫ x w(x) dx ÷ ∫ w(x) dx :: magnitude and position of the resultant
- **Uniformly distributed load (UDL)** of w over length L: resultant **wL** at the **midpoint**.
- **Triangular load** rising from 0 to w over L: resultant **wL/2** at **L/3 from the large end** (2L/3 from the zero end).
- A **trapezoidal** load can be split into a rectangle and a triangle.
X: A 6 m simply supported beam carries a UDL of 4 kN/m over its whole length and a triangular load from 0 at A to 6 kN/m at x = 3 m.
> UDL resultant: 4 × 6 = 24 kN at x = 3 m.
> Triangle resultant: 6 × 3/2 = 9 kN at x = 2/3 × 3 = 2 m from A.
> ΣM_{A}: 6B_{y} = 24 × 3 + 9 × 2 = 90, so B_{y} = 15 kN.
> ΣF_{y}: A_{y} = 24 + 9 − 15 = 18 kN.
H: Where distributed loads come from
- **Self-weight**: a steel beam of 50 kg/m weighs about 0.49 kN/m.
- **Floor loads**: imposed load in kN/m^{2} times the width of floor each beam supports gives kN/m.
- **Fluid pressure**: increases linearly with depth, giving triangular loads on walls and dam faces.
K: A distributed load's resultant equals the area under the load diagram and acts through its centroid: wL at mid-span for a UDL, wL/2 at one third from the large end for a triangle.
!: Using the resultant to find internal forces at points inside the loaded length. The resultant gives correct reactions, but shear force and bending moment within the loaded region must use only the part of the load on one side of the section.
EV: established | Replacing distributed loads by statically equivalent resultants is exact for support reactions on rigid bodies.
EV: established | Design values of imposed floor and snow loads are set by codes such as Eurocode 1 (BS EN 1991) and differ by use and location.
T: Distributed load | A load spread over a length or area, described by its intensity
T: Uniformly distributed load | A distributed load with constant intensity along its length
T: Load intensity | Force per unit length (or area) of a distributed load
SUM: Resultant = area under the load diagram, through its centroid.
SUM: UDL: wL at mid-span; triangle: wL/2 at L/3 from the large end.
SUM: Use resultants for reactions, not for internal forces inside the loaded length.
SRC: Hibbeler R. C., Engineering Mechanics: Statics, 14th edition in SI units, Pearson | secondary | 2017
SRC: BSI, BS EN 1991-1-1: Eurocode 1, Actions on structures, Part 1-1: General actions | standard | 2002
Q: Where does the resultant of a triangular load act? | At one third of its length from the larger end, through the centroid of the triangle.
Q: What is the resultant of a UDL of w over length L? | wL, acting at the midpoint of the loaded length.
M1#engineering-u02-12-q1@1: What is the resultant of a UDL of 3 kN/m over 5 m? | 15 kN at the midpoint | 15 kN at one end | 1.67 kN at the midpoint | 7.5 kN at one third of the length | Resultant = wL = 3 × 5 = 15 kN, at the centre of the loaded length.
M2#engineering-u02-12-q2@2: A triangular load rises from 0 to 12 kN/m over 4 m. What is its resultant and where does it act from the zero end? | 24 kN at 2.67 m | 48 kN at 2 m | 24 kN at 1.33 m | 12 kN at 2.67 m | Area = 12 × 4/2 = 24 kN, at 2/3 × 4 = 2.67 m from the zero end.
M3#engineering-u02-12-q3@3: A water tank wall 3 m high holds water to its top. Taking ρg = 9.81 kN/m^{3}, what is the resultant water force per metre of wall and where does it act? | 44.1 kN/m at 1 m above the base | 29.4 kN/m at 1.5 m above the base | 88.3 kN/m at 1 m above the base | 44.1 kN/m at 2 m above the base | Pressure at the base = 9.81 × 3 = 29.43 kPa; resultant = 29.43 × 3/2 = 44.1 kN/m, at one third of the height from the base.
NUM2#engineering-u02-12-q4@2: A simply supported beam 8 m long carries a UDL of 5 kN/m over its whole length. What is each support reaction, in kN? | 20 | 1% | kN | Total load = 5 × 8 = 40 kN; by symmetry each support carries 20 kN.
SA2#engineering-u02-12-q5@2,3: Explain why the resultant of a distributed load gives the correct reactions but can't be used directly to find the bending moment at mid-span. | For the whole beam, the resultant has the same total force and moment as the distributed load, so external reactions are identical. At an internal section, only the load on one side of the cut acts on that part; replacing the whole load by one resultant puts load on the wrong side or at the wrong point. The load on each part must be taken separately. | Static equivalence for whole body ; Reactions correct ; Internal section sees only part of load ; Must treat each segment separately

## Centroids and centres of gravity
LV: Year 1 · Foundation
S: The centre of gravity is where a body's weight acts; the centroid is the geometric centre of a shape. This lesson defines both, finds centroids by integration and by composite parts, and works through a T-section.
O: Distinguish centre of gravity, centre of mass and centroid
O: Find the centroid of a composite area
O: Use symmetry and composite parts to locate centroids quickly
PRE: Equivalent force systems
H: Definitions
- **Centre of gravity**: the point through which the resultant weight acts.
- **Centre of mass**: the mass-weighted average position; the same as the centre of gravity in uniform gravity.
- **Centroid**: the geometric centre of a line, area or volume; the same as the centre of mass for a uniform material.
E: x̄ = Σ(A_{i} x_{i}) ÷ ΣA_{i}, ȳ = Σ(A_{i} y_{i}) ÷ ΣA_{i} :: centroid of a composite area
P: For continuous shapes the sums become integrals: x̄ = ∫x dA ÷ ∫dA. Standard results: rectangle at its centre; triangle at one third of its height from the base; semicircle at 4r/(3π) from the diameter.
H: Composite areas
- Split the shape into simple parts.
- Choose a reference axis.
- Tabulate area, centroid position and their product for each part.
- Treat holes as **negative areas**.
- Use **symmetry**: the centroid lies on any axis of symmetry.
X: A T-section: flange 200 mm wide × 20 mm thick on top of a web 20 mm wide × 180 mm deep. Find ȳ from the bottom.
> Flange: A = 4,000 mm^{2}, centroid at y = 180 + 10 = 190 mm. A y = 760,000 mm^{3}.
> Web: A = 3,600 mm^{2}, centroid at y = 90 mm. A y = 324,000 mm^{3}.
> ȳ = (760,000 + 324,000)/(4,000 + 3,600) = 1,084,000/7,600 = 142.6 mm.
> By symmetry, x̄ is on the centre line of the web.
K: The centroid of a composite area is the area-weighted average of its parts' centroids; holes count as negative areas, and symmetry fixes one coordinate for free.
!: Measuring part centroids from different reference axes. Every y_{i} must be measured from the same axis, or the result is meaningless.
EV: established | Centroid calculations are exact geometric results used throughout structural and mechanical design.
EV: established | The centre of gravity and centre of mass differ only in non-uniform gravitational fields, negligible for ordinary engineering structures.
T: Centroid | The geometric centre of a shape
T: Centre of gravity | The point through which the resultant weight of a body acts
T: Composite area | A shape made up of simple parts whose centroids are known
SUM: Centroid = Σ(A x)/ΣA for composite areas.
SUM: Use symmetry and negative areas for holes.
SUM: Centre of gravity equals centroid for uniform material in uniform gravity.
SRC: Hibbeler R. C., Engineering Mechanics: Statics, 14th edition in SI units, Pearson | secondary | 2017
SRC: Gere J. M. and Goodno B. J., Mechanics of Materials, 9th edition (SI), Cengage | secondary | 2018
Q: Where is the centroid of a triangle? | At one third of its height from the base (the intersection of its medians).
Q: How is a hole treated in a composite centroid calculation? | As a negative area.
M1#engineering-u02-13-q1@1: Where does the centroid of a symmetrical I-beam section lie? | At the centre, on both axes of symmetry | At the top flange | At the bottom flange | Anywhere along the web | A centroid lies on every axis of symmetry, so a doubly symmetric section's centroid is at its centre.
M2#engineering-u02-13-q2@2: A 100 × 100 mm square has a 50 × 50 mm square hole whose centre is 25 mm right of the square's centre. How far is the centroid from the square's centre? | 8.33 mm to the left | 8.33 mm to the right | 25 mm to the left | 12.5 mm to the left | x̄ = (10,000 × 0 − 2,500 × 25)/(10,000 − 2,500) = −62,500/7,500 = −8.33 mm: the centroid shifts away from the hole.
M3#engineering-u02-13-q3@3: A student finds the T-section centroid is 142.6 mm from the bottom and wants it from the top. Total depth is 200 mm. Which statement is correct? | 57.4 mm from the top, and the centroid lies in the web just below the flange | 142.6 mm from the top, because centroids are the same from either side | 100 mm from the top, because the centroid is always at mid-depth | 57.4 mm from the top, which places it inside the flange | 200 − 142.6 = 57.4 mm from the top. The flange occupies the top 20 mm, so the centroid is in the web, nearer the wide flange.
NUM2#engineering-u02-13-q4@2: A shape is made of a 100 × 50 mm rectangle (lying flat, centroid 25 mm up) with a 50 × 100 mm rectangle standing on top (centroid 100 mm up). What is ȳ from the bottom, in mm? | 62.5 | 1% | mm | Areas are 5,000 mm^{2} each: ȳ = (5,000 × 25 + 5,000 × 100)/10,000 = 625,000/10,000 = 62.5 mm.
SA2#engineering-u02-13-q5@2,3: Explain why the position of the centroid matters in structural engineering. | The centroid of a cross-section is where the neutral axis lies in elastic bending, so stresses are measured from it and the second moment of area is calculated about it. Axial loads through the centroid cause no bending; offset loads cause bending. The centre of gravity also sets where self-weight acts for stability checks. | Neutral axis in bending ; Basis for second moment of area ; Eccentric loads cause bending ; Self-weight or stability

## Second moment of area
LV: Year 1 · Intermediate
S: The second moment of area measures how a cross-section's area is distributed about an axis, and so how well it resists bending. This lesson defines it, gives standard results, applies the parallel axis theorem, and shows why I-beams are efficient.
O: Define the second moment of area and calculate it for a rectangle
O: Use the parallel axis theorem for composite sections
O: Explain why deep and flanged sections resist bending efficiently
PRE: Centroids and centres of gravity
H: Definition
E: I_{x} = ∫ y^{2} dA :: y measured from the axis
P: Units are mm^{4} or m^{4}. Because area far from the axis counts with y^{2}, moving material away from the axis increases I rapidly. In bending, stress σ = My/I, so a larger I means lower stress and smaller deflection.
- **Rectangle**, width b, depth h, about its centroidal axis: **I = bh^{3}/12**.
- **Solid circle**, diameter d: **I = πd^{4}/64**.
H: Parallel axis theorem
E: I = I_{c} + A d^{2} :: I_{c} about the part's own centroid, d the distance to the new axis
X: The T-section from the centroids lesson (flange 200 × 20, web 20 × 180, ȳ = 142.6 mm from the bottom).
> Flange: I_{c} = 200 × 20^{3}/12 = 0.133 × 10^{6} mm^{4}; d = 190 − 142.6 = 47.4 mm; A d^{2} = 4,000 × 47.4^{2} = 8.98 × 10^{6}. Total 9.11 × 10^{6} mm^{4}.
> Web: I_{c} = 20 × 180^{3}/12 = 9.72 × 10^{6} mm^{4}; d = 142.6 − 90 = 52.6 mm; A d^{2} = 3,600 × 52.6^{2} = 9.97 × 10^{6}. Total 19.69 × 10^{6} mm^{4}.
> I = 9.11 + 19.69 = 28.8 × 10^{6} mm^{4} about the centroidal axis.
H: Efficient sections
P: A rectangle 100 mm wide and 200 mm deep has I = 100 × 200^{3}/12 = 66.7 × 10^{6} mm^{4} on edge, but only 200 × 100^{3}/12 = 16.7 × 10^{6} mm^{4} laid flat: four times less. **I-beams** put most of their area in flanges far from the neutral axis, giving a large I for little material.
K: I = ∫y^{2} dA; material far from the axis counts most; the parallel axis theorem adds Ad^{2} to each part's own I.
!: Applying the parallel axis theorem from an axis that isn't through the part's own centroid. I_{c} must be about the part's centroidal axis, or the Ad^{2} term double-counts.
EV: established | The second moment of area and the bending formula σ = My/I are standard results of elastic beam theory.
EV: established | Beam theory assumes plane sections remain plane and linear elastic behaviour; deep beams and plastic design need other methods.
T: Second moment of area | A property of a cross-section, ∫y^{2} dA, measuring its resistance to bending about an axis
T: Parallel axis theorem | I about any axis equals I about a parallel centroidal axis plus area times the square of the distance between them
T: Neutral axis | The line in a bent beam's cross-section where bending stress is zero, through the centroid
SUM: I = bh^{3}/12 for a rectangle; πd^{4}/64 for a circle.
SUM: Parallel axis theorem: I = I_{c} + Ad^{2}.
SUM: Deep and flanged sections give large I for little material.
SRC: Gere J. M. and Goodno B. J., Mechanics of Materials, 9th edition (SI), Cengage | secondary | 2018
SRC: Hibbeler R. C., Engineering Mechanics: Statics, 14th edition in SI units, Pearson | secondary | 2017
Q: What is the second moment of area of a rectangle about its centroidal axis? | bh^{3}/12, with h the depth perpendicular to the axis.
Q: Why are I-beams efficient in bending? | Most of their area is in flanges far from the neutral axis, where it contributes most to I.
M1#engineering-u02-14-q1@1: What are the units of second moment of area? | mm^{4} | mm^{2} | mm^{3} | N mm | It is area times distance squared, so length to the fourth power.
M2#engineering-u02-14-q2@2: How much stiffer in bending is a plank on edge than laid flat, if it is 50 mm × 200 mm? | 16 times | 4 times | 2 times | 8 times | On edge: 50 × 200^{3}/12; flat: 200 × 50^{3}/12. The ratio is (200/50)^{2} = 16.
M3#engineering-u02-14-q3@3: Doubling the depth of a rectangular beam while halving its width keeps the area the same. What happens to I? | It increases fourfold | It doubles | It stays the same | It halves | I = bh^{3}/12: (b/2)(2h)^{3} = 4bh^{3}, so I is four times larger for the same material.
NUM2#engineering-u02-14-q4@2: What is the second moment of area of a 100 mm wide, 200 mm deep rectangle about its horizontal centroidal axis, in units of 10^{6} mm^{4}? | 66.7 | 1% | × 10^{6} mm^{4} | I = bh^{3}/12 = 100 × 200^{3}/12 = 66.7 × 10^{6} mm^{4}.
SA2#engineering-u02-14-q5@2,3: Explain why the parallel axis theorem is needed for a T-section and how it is applied. | The parts of a T-section have their own centroids, which don't lie on the section's centroidal axis. The parallel axis theorem transfers each part's own I_{c} to the section's axis by adding A d^{2}, where d is the distance between the part's centroid and the section centroid. Summing the transferred values gives the total I. | Parts' centroids differ from section centroid ; I_{c} of each part ; Add A d^{2} ; Sum the parts

## Dry friction
LV: Year 1 · Intermediate
S: Dry friction resists sliding between surfaces in contact. This lesson sets out Coulomb's laws of friction, the difference between static and kinetic friction, the angle of friction, and how to solve tipping-or-sliding and ladder problems.
O: State the laws of dry friction and the meaning of μ_{s} and μ_{k}
O: Solve equilibrium problems involving impending slip
O: Distinguish sliding from tipping and determine which occurs first
PRE: Free-body diagrams
H: Coulomb friction
E: F ≤ μ_{s} N (no slip); F = μ_{k} N (sliding) :: N is the normal force
- Friction acts **along the surface**, opposing the motion or impending motion.
- Before slip, friction is **whatever is needed** for equilibrium, up to μ_{s}N.
- The kinetic coefficient μ_{k} is usually smaller than μ_{s}.
- To a first approximation, friction doesn't depend on the apparent contact area.
P: The **angle of friction** φ satisfies tan φ = μ_{s}: a block on an incline is on the point of slipping when the slope angle equals φ.
X: A uniform ladder of length L and weight W leans on a smooth wall, with μ_{s} = 0.4 at the ground. Find the smallest angle θ to the ground before it slips.
> Ground: normal N_{G}, friction F. Wall (smooth): normal N_{W} only.
> ΣF_{y}: N_{G} = W. ΣF_{x}: F = N_{W}.
> Moments about the foot: N_{W} L sin θ = W (L/2) cos θ, so N_{W} = W/(2 tan θ).
> No slip needs F ≤ μ_{s} N_{G}: W/(2 tan θ) ≤ 0.4 W, so tan θ ≥ 1.25 and θ ≥ 51.3°.
H: Sliding or tipping?
P: A tall block pushed sideways may **tip** before it slides. Compare the force to cause sliding (μ_{s}W) with the force to cause tipping (from moments about the leading edge). Whichever is smaller happens first.
K: Friction is whatever equilibrium needs up to μ_{s}N; at impending slip F = μ_{s}N, and the angle of friction is tan^{-1}μ_{s}.
!: Setting F = μ_{s}N in every friction problem. That is only true when slip is about to happen; otherwise friction is found from equilibrium and is less than μ_{s}N.
EV: established | Coulomb's laws describe dry friction well for many engineering materials over a moderate range of loads.
EV: contested | Friction coefficients vary with surface condition, humidity, temperature and speed, so published values are only approximate guides.
T: Coefficient of static friction | The ratio μ_{s} of maximum friction force to normal force before slipping
T: Angle of friction | The angle φ with tan φ = μ_{s}; the steepest slope a block can rest on
T: Impending motion | The state at which slipping is just about to begin, when F = μ_{s}N
SUM: F ≤ μ_{s}N before slip; F = μ_{k}N while sliding.
SUM: tan φ = μ_{s} gives the angle of friction.
SUM: Check whether a body tips or slides first.
SRC: Hibbeler R. C., Engineering Mechanics: Statics, 14th edition in SI units, Pearson | secondary | 2017
SRC: Bowden F. P. and Tabor D., The Friction and Lubrication of Solids, Oxford University Press | primary | 1950
Q: What is the angle of friction? | The angle φ with tan φ = μ_{s}: the slope at which a block is about to slide.
Q: When does F equal μ_{s}N? | Only when slipping is about to occur.
M1#engineering-u02-15-q1@1: Which is usually true of the friction coefficients for a pair of surfaces? | μ_{k} is smaller than μ_{s} | μ_{k} is larger than μ_{s} | μ_{k} equals μ_{s} exactly | μ_{s} is always greater than 1 | Starting motion usually needs more force than keeping it going, so kinetic friction is lower.
M2#engineering-u02-15-q2@2: A 50 kg crate rests on a floor with μ_{s} = 0.4. What horizontal force is needed to start it moving? | 196 N | 490 N | 20 N | 123 N | N = mg = 490.5 N; F = μ_{s}N = 0.4 × 490.5 = 196 N.
M3#engineering-u02-15-q3@3: A 30 kg crate on a floor with μ_{s} = 0.5 is pushed with 100 N. What is the friction force? | 100 N, since friction is only what equilibrium needs | 147 N, since F = μ_{s}N always | 0 N, since the crate doesn't move | 50 N, since friction is half the push | Maximum friction is 0.5 × 294.3 = 147 N. The push of 100 N is less, so the crate stays put and friction equals 100 N.
NUM2#engineering-u02-15-q4@2: At what slope angle, in degrees, will a block with μ_{s} = 0.35 begin to slide? | 19.3 | 1% | ° | Slip begins when tan θ = μ_{s}: θ = tan^{-1}(0.35) = 19.3°.
SA2#engineering-u02-15-q5@3: Explain how to decide whether a tall box pushed sideways near its top will tip or slide. | Find the push needed to slide: P = μ_{s}W. Find the push needed to tip: taking moments about the leading bottom edge, P × h = W × b/2, so P = Wb/(2h), where h is the push height and b the width. Whichever push is smaller is reached first. Tall boxes pushed high tend to tip; low pushes or low friction favour sliding. | Sliding force μ_{s}W ; Tipping moment about edge ; Compare the two ; Effect of height or friction

## Shear force and bending moment diagrams
LV: Year 1 · Advanced
S: Shear force and bending moment diagrams show how internal forces vary along a beam, and so where it is most highly stressed. This lesson defines shear force and bending moment, sets out sign conventions and the relationships with load, and draws diagrams for point loads and UDLs.
O: Calculate the shear force and bending moment at any section of a beam
O: Draw shear force and bending moment diagrams for point loads and UDLs
O: Use the relationships between load, shear and moment to check diagrams
PRE: Distributed loads
H: Internal forces
P: At any cut through a beam, the part on each side exerts on the other a **shear force** V (perpendicular to the beam) and a **bending moment** M. They are found from the equilibrium of the part on one side of the cut.
- **Sign convention** (common in UK texts): positive shear when the left part tends to move up relative to the right; positive (sagging) moment when the beam bends concave upwards.
E: dV/dx = −w, dM/dx = V :: w is the downward load intensity
- Under no load, V is constant and M is linear.
- Under a UDL, V is linear and M is parabolic.
- A point load causes a **jump** in V; M has a **kink**.
- **M is a maximum where V = 0** (or changes sign).
X: A 6 m simply supported beam with 12 kN at 2 m from A. Reactions A = 8 kN, B = 4 kN.
> Shear: +8 kN from A to the load; jumps down by 12 to −4 kN; stays −4 kN to B.
> Moment: 0 at A, rising linearly to 8 × 2 = 16 kN m at the load.
> Then falling linearly to 0 at B (check from the right: 4 × 4 = 16 kN m).
> Maximum moment is 16 kN m, where V changes sign.
H: Standard results
- Simply supported, central point load P, span L: **M_{max} = PL/4** at mid-span.
- Simply supported, UDL w over span L: **M_{max} = wL^{2}/8** at mid-span; V varies linearly from wL/2 to −wL/2.
- Cantilever, point load P at the free end: **M_{max} = PL** (hogging) at the support.
K: V and M come from equilibrium of one side of a cut; dM/dx = V, so the maximum moment is where shear passes through zero.
!: Placing the maximum bending moment where the largest load acts. The maximum is where the shear force changes sign, which isn't always under the biggest load.
EV: established | Shear force and bending moment diagrams are the basis of beam design in every structural code.
EV: established | Sign conventions differ between texts; any consistent convention gives correct results.
T: Shear force | The internal force perpendicular to a beam's axis at a section
T: Bending moment | The internal moment at a section of a beam, equal to the sum of moments of forces on one side
T: Sagging | Bending in which the beam becomes concave upward, taken as positive moment
SUM: V and M are found from equilibrium of one side of a cut.
SUM: dV/dx = −w and dM/dx = V; M peaks where V = 0.
SUM: PL/4, wL^{2}/8 and PL are the key standard maxima.
SRC: Gere J. M. and Goodno B. J., Mechanics of Materials, 9th edition (SI), Cengage | secondary | 2018
SRC: Hulse R. and Cain J., Structural Mechanics, 2nd edition, Palgrave | secondary | 2000
Q: Where does the maximum bending moment occur? | Where the shear force is zero or changes sign.
Q: What is the maximum bending moment of a simply supported beam with a UDL? | wL^{2}/8, at mid-span.
M1#engineering-u02-16-q1@1: What shape is the bending moment diagram under a uniformly distributed load? | Parabolic | Linear | Constant | Stepped | dM/dx = V and V is linear under a UDL, so M is a quadratic curve.
M2#engineering-u02-16-q2@2: A simply supported beam of span 4 m carries a central point load of 30 kN. What is the maximum bending moment? | 30 kN m | 60 kN m | 120 kN m | 15 kN m | For a central point load, M_{max} = PL/4 = 30 × 4/4 = 30 kN m.
M3#engineering-u02-16-q3@3: A cantilever 3 m long carries 5 kN at its tip and a UDL of 2 kN/m along its length. What is the bending moment at the support? | 24 kN m hogging | 15 kN m hogging | 9 kN m hogging | 33 kN m hogging | Point load: 5 × 3 = 15 kN m. UDL: 2 × 3 × 1.5 = 9 kN m. Total 24 kN m, hogging at the fixed end.
NUM2#engineering-u02-16-q4@2: A simply supported beam spans 8 m and carries a UDL of 5 kN/m. What is the maximum bending moment, in kN m? | 40 | 1% | kN m | M_{max} = wL^{2}/8 = 5 × 64/8 = 40 kN m at mid-span.
SA2#engineering-u02-16-q5@2,3: Explain how the relationships between load, shear force and bending moment help check a beam diagram. | dV/dx = −w means the slope of the shear diagram equals minus the load intensity: flat where there is no load, sloping under a UDL, jumping at point loads. dM/dx = V means the slope of the moment diagram equals the shear: so M is linear where V is constant, curved where V varies, and has its maximum where V = 0. If a diagram breaks these rules, it is wrong. | dV/dx = −w ; dM/dx = V ; Maximum M where V = 0 ; Using them to spot errors
`;
