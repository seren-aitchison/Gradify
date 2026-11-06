// School 8: Multivariable and Vector Calculus. Format: kit/course/notes.js. Standard: docs/CURRICULUM_CONTENT_STANDARD.md
// Partial derivatives and multiple integrals, the operators of vector calculus and the integral theorems, then matrix, tensor, variational and fractional calculus.
export default `
## Multivariable Calculus
S: Multivariable calculus extends derivatives and integrals to functions of several variables, like temperature across a room or profit depending on price and advertising. Partial derivatives measure change in one direction at a time, and tangent planes give linear approximations.
O: Calculate partial derivatives, including mixed second derivatives
O: Find tangent planes and linear approximations
T: Partial derivative | ∂f/∂x: the rate of change of f as x varies with the other variables held fixed
T: Tangent plane | z = f(a, b) + f_{x}(a, b)(x − a) + f_{y}(a, b)(y − b), the best linear approximation near (a, b)
H: Functions of several variables
- f(x, y) can be pictured as a surface z = f(x, y) or by level curves f(x, y) = c (contour maps).
- Limits must agree along every path: f = xy/(x^{2} + y^{2}) has no limit at the origin (0 along the axes, ½ along y = x).
- Continuity and differentiability need more care than in one variable.
H: Partial derivatives
- Differentiate with respect to one variable, treating the others as constants.
- Second partials: f_{xx}, f_{yy} and the mixed f_{xy}, f_{yx}.
- Clairaut's theorem: if the second partials are continuous, f_{xy} = f_{yx}.
H: Approximation
- Linear approximation: Δf ≈ f_{x}Δx + f_{y}Δy.
- Useful for error propagation in measurements.
- Critical points (both partials zero) are classified with the Hessian (see Optimisation, School 18).
X: For f(x, y) = x^{2}y + 3xy^{2}, find f_{x}, f_{y} and the tangent plane at (1, 2).
> f_{x} = 2xy + 3y^{2} = 4 + 12 = 16 at (1, 2); f_{y} = x^{2} + 6xy = 1 + 12 = 13
> f(1, 2) = 2 + 12 = 14
> Tangent plane: z = 14 + 16(x − 1) + 13(y − 2)
K: Partial derivatives hold other variables fixed; mixed partials agree when continuous; the tangent plane gives Δf ≈ f_{x}Δx + f_{y}Δy.
!: Concluding a limit exists after checking only one or two paths.
Q: Find ∂/∂y of x^{3}y^{2}. | 2x^{3}y.
Q: What does Clairaut's theorem say? | Mixed second partials are equal if they're continuous.
SUM: Partial derivatives measure change one direction at a time.
SUM: Tangent planes approximate surfaces.
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
SRC: Marsden JE, Tromba AJ, Vector Calculus (6th edn, W. H. Freeman 2012) | textbook | 2012 | https://www.macmillanlearning.com/
NUM1#maths-u08-01-q1@1: For f(x, y) = x^{3}y^{2}, find f_{xy} at (1, 1). | 6 | 0 |  | f_{x} = 3x^{2}y^{2}, then f_{xy} = 6x^{2}y = 6 at (1, 1).
M1#maths-u08-01-q2@1: What is ∂/∂x of x^{2}y + y^{3}? | 2xy | x^{2} + 3y^{2} | 2x + 3y^{2} | 2xy + 3y^{2} | x^{2}y | Treat y as a constant: the y^{3} term vanishes and x^{2}y gives 2xy.
M2#maths-u08-01-q3@2: Why does xy/(x^{2} + y^{2}) have no limit at (0, 0)? | Different paths give different values: 0 on the axes, ½ on y = x | It's undefined at every point | The numerator grows faster | Both partials are infinite there | It does have a limit of 0 | A limit must be the same along every path of approach.

## Directional Derivatives
S: A directional derivative measures how fast a function changes as you move in any chosen direction, not just along the axes. It's the gradient dotted with a unit vector, and it explains why the gradient points uphill.
O: Calculate directional derivatives using the gradient
O: Find the direction and size of the greatest rate of increase
T: Directional derivative | D_{u}f = ∇f · u, the rate of change of f in the direction of the unit vector u
T: Unit vector | A vector of length 1; divide any vector by its length to get one
H: Calculating
- Find ∇f at the point; turn the direction into a unit vector u; take the dot product.
- D_{u}f = |∇f| cos θ, where θ is the angle between ∇f and u.
- Along the axes, D_{u}f reduces to the partial derivatives.
H: Extremes
- Greatest increase: in the direction of ∇f, at rate |∇f|.
- Greatest decrease: in the direction of −∇f.
- Zero change: perpendicular to ∇f, along the level curve.
H: Uses
- Hikers on a contour map: the steepest path crosses contours at right angles.
- Gradient descent in machine learning moves in the direction −∇f (School 24).
- Heat flows in the direction of −∇T.
X: For f(x, y) = x^{2} + y^{2}, find the rate of change at (1, 2) in the direction of (3, 4).
> ∇f = (2x, 2y) = (2, 4)
> Unit vector u = (3, 4)/5
> D_{u}f = (2 × 3 + 4 × 4)/5 = 22/5 = 4.4
- In 3D the same formula works with ∇f = (f_{x}, f_{y}, f_{z}) and a unit vector in space.
K: D_{u}f = ∇f · u with u a unit vector; the maximum rate is |∇f| in the direction of ∇f; along level curves the rate is zero.
!: Forgetting to normalise the direction vector to length 1.
Q: In which direction does f decrease fastest? | −∇f.
Q: What is the directional derivative along a level curve? | 0.
SUM: Directional derivatives use the gradient.
SUM: The gradient gives the steepest ascent.
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
SRC: Apostol TM, Calculus, vol 2 (2nd edn, Wiley 1969) | textbook | 1969 | https://www.wiley.com/
NUM1#maths-u08-02-q1@1: For f = x^{2} + y^{2} at (1, 2), find the greatest rate of increase, to 3 decimal places. | 4.472 | 0.001 |  | |∇f| = |(2, 4)| = √20 ≈ 4.472.
M1#maths-u08-02-q2@1: ∇f = (3, 4) at a point. What is the rate of change in the direction (0, 1)? | 4 | 3 | 5 | 7 | 0 | (0, 1) is already a unit vector, and (3, 4) · (0, 1) = 4.
M2#maths-u08-02-q3@2: ∇f = (6, 8) at P. What is the rate of change in the direction of (−8, 6)? | 0, since it's perpendicular to ∇f | 10, the length of the gradient | −10, the steepest descent | 14, the sum of components | 2, the difference of components | (6, 8) · (−8, 6) = −48 + 48 = 0: that direction runs along the level curve.

## Gradient
S: The gradient ∇f collects all the partial derivatives of a function into a vector. It points in the direction of steepest increase, is perpendicular to level curves and surfaces, and is the basis of optimisation algorithms and conservative force fields.
O: Calculate gradients and use them to find normals to curves and surfaces
O: Interpret gradient fields physically
T: Gradient | ∇f = (∂f/∂x, ∂f/∂y, ∂f/∂z)
T: Conservative field | A vector field F = ∇φ for some scalar potential φ
H: Geometry
- ∇f is perpendicular to the level curve (or surface) through each point.
- So ∇f gives normal vectors: the tangent plane to F(x, y, z) = c at P is ∇F(P) · (x − P) = 0.
- |∇f| measures how steep the function is; closely spaced contours mean a large gradient.
H: Physics and optimisation
- Gravitational and electric fields are gradients of potentials (with a minus sign).
- Conservative fields do work independent of path.
- Gradient descent: repeatedly step x ← x − η∇f(x) to minimise f.
H: Rules
- ∇(f + g) = ∇f + ∇g; ∇(fg) = f∇g + g∇f.
- Chain rule: d/dt f(r(t)) = ∇f · r′(t).
- At a smooth local maximum or minimum, ∇f = 0.
X: For f(x, y) = x^{2}y + y^{3}, find ∇f at (1, 1) and the tangent line to the level curve there.
> ∇f = (2xy, x^{2} + 3y^{2}) = (2, 4) at (1, 1)
> The gradient is normal to the level curve
> Tangent line: 2(x − 1) + 4(y − 1) = 0, or x + 2y = 3
K: ∇f points uphill, perpendicular to level sets; it gives normals to curves and surfaces; conservative fields are gradients; ∇f = 0 at smooth extrema.
!: Using the gradient as a tangent direction instead of a normal to the level curve.
Q: What is ∇ of f = xyz? | (yz, xz, xy).
Q: What is ∇f at a smooth local minimum? | The zero vector.
SUM: The gradient points uphill.
SUM: It's normal to level sets.
SRC: Marsden JE, Tromba AJ, Vector Calculus (6th edn, W. H. Freeman 2012) | textbook | 2012 | https://www.macmillanlearning.com/
SRC: Schey HM, Div, Grad, Curl, and All That (4th edn, W. W. Norton 2005) | textbook | 2005 | https://wwnorton.com/
NUM1#maths-u08-03-q1@1: Find |∇f| for f(x, y) = 3x + 4y. | 5 | 0 |  | ∇f = (3, 4) everywhere, with length √(9 + 16) = 5.
M1#maths-u08-03-q2@1: Which vector is normal to the sphere x^{2} + y^{2} + z^{2} = 9 at (1, 2, 2)? | (2, 4, 4) | (1, −2, 2) | (2, −1, 0) | (0, 2, −2) | (1, 1, 1) | ∇(x^{2} + y^{2} + z^{2}) = (2x, 2y, 2z) = (2, 4, 4), along the radius.
M2#maths-u08-03-q3@2: What does one step of gradient descent do? | Moves x a small step in the direction −∇f(x) | Moves x along a level curve of f | Sets x to the point where f is largest | Moves x in the direction +∇f(x) | Doubles the gradient each time | Stepping against the gradient decreases f fastest locally.

## Multiple Integrals
S: Multiple integrals add up quantities over areas and volumes: mass from density, probability from a joint density, average temperature over a region. They're computed as repeated single integrals, one variable at a time.
O: Evaluate multiple integrals over rectangles and boxes using Fubini's theorem
O: Use multiple integrals for mass, averages and probabilities
T: Double integral | ∬_{R} f dA, the limit of Riemann sums over small rectangles in R
T: Fubini's theorem | For continuous f on a rectangle, ∬ f dA equals either iterated integral
H: Definition and computation
- Divide the region into small pieces, multiply f by each piece's area or volume, add, and take the limit.
- Fubini: integrate in one variable with the others fixed, then the next.
- On rectangles the limits are constants; on other regions the inner limits depend on outer variables.
H: Interpretations
- If f ≥ 0, ∬ f dA is the volume under the surface.
- Mass = ∬ density dA; average value = (1/area) ∬ f dA.
- Probability = ∬ joint density over the event (School 12).
H: Separable integrands
- If f(x, y) = g(x)h(y) on a rectangle, the integral is (∫g dx)(∫h dy).
- This shortcut is common in probability with independent variables.
X: Evaluate ∬ 6xy dA over the rectangle 0 ≤ x ≤ 1, 0 ≤ y ≤ 2.
> Inner (y): ∫₀² 6xy dy = 6x × [y^{2}/2]₀² = 12x
> Outer (x): ∫₀¹ 12x dx = 6
> Check by separating: 6 × (∫₀¹ x dx)(∫₀² y dy) = 6 × ½ × 2 = 6
K: Compute multiple integrals by iterating; Fubini lets you choose the order; they give volumes, masses, averages and probabilities.
!: Using constant limits for the inner integral when the region isn't a rectangle.
Q: What does ∬_{R} 1 dA give? | The area of R.
Q: How do you find the average of f over R? | Divide ∬_{R} f dA by the area of R.
SUM: Multiple integrals add over regions.
SUM: Fubini turns them into repeated integrals.
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
SRC: Apostol TM, Calculus, vol 2 (2nd edn, Wiley 1969) | textbook | 1969 | https://www.wiley.com/
NUM1#maths-u08-04-q1@1: Find the average value of f(x, y) = x + y over the square 0 ≤ x, y ≤ 2. | 2 | 0 |  | ∬(x + y) dA = 8 and the area is 4, giving an average of 2.
M1#maths-u08-04-q2@1: What does ∬_{R} ρ(x, y) dA give if ρ is a density in kg per m^{2}? | The total mass of the plate in kg | The plate's average density | The plate's area in m^{2} | The plate's centre of mass | The density's maximum value | Integrating mass per unit area over the region gives total mass.
M2#maths-u08-04-q3@2: Why can ∬ e^{x} sin y dA over a rectangle be computed as a product of two integrals? | The integrand separates into a function of x times a function of y | Every double integral splits this way | e^{x} and sin y are both periodic | The rectangle has equal sides | It can't be split | For f = g(x)h(y) on a rectangle, ∬ f dA = (∫ g dx)(∫ h dy).

## Double Integrals
S: Double integrals over general regions need careful limits, and some become easy only after swapping the order of integration or switching to polar coordinates. Polar coordinates even evaluate the famous Gaussian integral.
O: Set up double integrals over general regions and reverse the order of integration
O: Evaluate double integrals in polar coordinates
T: Type I region | A region a ≤ x ≤ b, g₁(x) ≤ y ≤ g₂(x), integrated dy then dx
T: Polar area element | dA = r dr dθ
H: General regions
- Sketch the region; decide which variable runs between constants.
- Type I: vertical strips (dy dx); type II: horizontal strips (dx dy).
- Reversing the order can turn an impossible inner integral into an easy one: ∫₀¹∫_{y}¹ e^{x^{2}} dx dy becomes ∫₀¹∫₀^{x} e^{x^{2}} dy dx = (e − 1)/2.
H: Polar coordinates
- x = r cos θ, y = r sin θ, and dA = r dr dθ (don't forget the r).
- Ideal for discs, annuli, sectors and integrands involving x^{2} + y^{2}.
- Area of a disc of radius a: ∫₀^{2π}∫₀^{a} r dr dθ = πa^{2}.
H: The Gaussian integral
- I = ∫_{−∞}^{∞} e^{−x^{2}} dx; then I^{2} = ∬ e^{−(x^{2}+y^{2})} dA.
- In polar coordinates: ∫₀^{2π}∫₀^{∞} e^{−r^{2}} r dr dθ = π, so I = √π.
- This gives the normal distribution's constant 1/√(2π).
X: Evaluate ∬ xy dA over the triangle 0 ≤ y ≤ x ≤ 1.
> Type I: x from 0 to 1, y from 0 to x
> Inner: ∫₀^{x} xy dy = x^{3}/2
> Outer: ∫₀¹ x^{3}/2 dx = 1/8
K: Sketch regions to set limits; swap the order when the inner integral is hard; polar coordinates use dA = r dr dθ; the Gaussian integral is √π.
!: Leaving out the factor r in the polar area element.
Q: What is ∫_{−∞}^{∞} e^{−x^{2}} dx? | √π.
Q: In polar coordinates, what replaces dx dy? | r dr dθ.
SUM: Limits come from the region.
SUM: Polar coordinates suit circular regions.
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
SRC: Riley KF, Hobson MP, Bence SJ, Mathematical Methods for Physics and Engineering (3rd edn, Cambridge University Press 2006) | textbook | 2006 | https://www.cambridge.org/
NUM1#maths-u08-05-q1@1: Use polar coordinates to find the area of a disc of radius 3, to 2 decimal places. | 28.27 | 0.01 |  | ∫₀^{2π}∫₀³ r dr dθ = 2π × 9/2 = 9π ≈ 28.27.
M1#maths-u08-05-q2@1: What are the limits for ∬ over the region between y = x^{2} and y = x, integrating dy first? | x from 0 to 1, y from x^{2} to x | x from 0 to 1, y from x to x^{2} | x from −1 to 1, y from 0 to 1 | y from 0 to 1, x from x^{2} to x | x from 0 to 2, y from x^{2} to 2x | The curves meet at x = 0 and 1, and x ≥ x^{2} between them.
M3#maths-u08-05-q3@2: Why reverse the order in ∫₀¹∫_{y}¹ e^{x^{2}} dx dy? | e^{x^{2}} has no elementary antiderivative in x, but after swapping the inner integral is in y | Reversing always makes integrals smaller | The original limits are wrong | Polar coordinates would be needed otherwise | The integral is zero either way | Swapping gives ∫₀¹ x e^{x^{2}} dx = (e − 1)/2, which is elementary.

## Triple Integrals
S: Triple integrals add up quantities over solid regions: volume, mass and centre of mass. Cylindrical and spherical coordinates make them manageable for cylinders, cones and balls.
O: Evaluate triple integrals in Cartesian, cylindrical and spherical coordinates
O: Calculate volumes, masses and centres of mass of solids
T: Cylindrical coordinates | (r, θ, z) with dV = r dr dθ dz
T: Spherical coordinates | (ρ, φ, θ) with x = ρ sin φ cos θ, y = ρ sin φ sin θ, z = ρ cos φ and dV = ρ^{2} sin φ dρ dφ dθ
H: Setting up
- Describe the solid with inequalities, from the innermost variable outwards.
- Volume = ∭ 1 dV; mass = ∭ ρ dV; centre of mass x̄ = (1/M) ∭ xρ dV.
- Use symmetry to spot zero integrals and shortcuts.
H: Choosing coordinates
- Boxes and prisms: Cartesian.
- Cylinders and cones about an axis: cylindrical.
- Balls and cones from the origin: spherical (φ from the positive z-axis, 0 to π).
H: Physics
- Moments of inertia: I = ∭ r_{⊥}^{2} ρ dV.
- Electric charge, total energy, probability in 3D.
X: Use spherical coordinates to find the volume of a ball of radius R.
> V = ∫₀^{2π}∫₀^{π}∫₀^{R} ρ^{2} sin φ dρ dφ dθ
> = (2π) × [−cos φ]₀^{π} × R^{3}/3 = 2π × 2 × R^{3}/3
> = 4πR^{3}/3
- Example: a cone of height h and base radius a has volume ∫₀^{2π}∫₀^{h}∫₀^{az/h} r dr dz dθ = πa^{2}h/3.
- Sketch the solid and its projection onto a coordinate plane before writing limits.
- Check answers by known formulas (cylinder πr^{2}h, ball 4πR^{3}/3).
K: Describe the solid with nested inequalities; choose coordinates to match its shape; include the Jacobian factors r and ρ^{2} sin φ.
!: Letting φ run from 0 to 2π in spherical coordinates (it runs from 0 to π).
Q: What is dV in cylindrical coordinates? | r dr dθ dz.
Q: What range does φ cover in spherical coordinates? | 0 to π.
SUM: Triple integrals measure solids.
SUM: Match coordinates to the shape.
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
SRC: Boas ML, Mathematical Methods in the Physical Sciences (3rd edn, Wiley 2006) | textbook | 2006 | https://www.wiley.com/
NUM1#maths-u08-06-q1@1: Evaluate ∭ xyz dV over the unit cube [0, 1]^{3}. | 0.125 | 0.0001 |  | The integral separates: (½)(½)(½) = 1/8.
M1#maths-u08-06-q2@1: Which coordinates suit a solid cylinder of radius 2 and height 5? | Cylindrical | Spherical | Polar in 2D only | Cartesian with no change | Elliptic | A cylinder about the z-axis is simply 0 ≤ r ≤ 2, 0 ≤ z ≤ 5.
M2#maths-u08-06-q3@2: A solid has constant density. Where is its centre of mass if it's symmetric about the z-axis? | On the z-axis | At the origin always | At its highest point | On the x-axis | Outside the solid | Symmetry makes the x and y moments cancel, so x̄ = ȳ = 0.

## Jacobians
S: The Jacobian matrix collects all first partial derivatives of a transformation, and its determinant measures how the transformation stretches area or volume. It's the key to changing variables in integrals and to inverting functions locally.
O: Calculate Jacobian matrices and determinants
O: Interpret the Jacobian determinant as a local scaling factor
T: Jacobian matrix | For (x, y) = T(u, v), the matrix [[∂x/∂u, ∂x/∂v], [∂y/∂u, ∂y/∂v]]
T: Jacobian determinant | det J, the factor by which T scales small areas (its sign shows orientation)
H: Computing
- Write each output as a function of the inputs and take all partial derivatives.
- Polar: x = r cos θ, y = r sin θ gives det J = r.
- Spherical: det J = ρ^{2} sin φ.
- Linear maps: the Jacobian is the matrix itself.
H: Meaning
- A small rectangle du × dv maps to roughly a parallelogram of area |det J| du dv.
- det J > 0 preserves orientation; det J < 0 reverses it.
- det J = 0 means the map collapses dimensions locally.
H: Inverse function theorem
- If det J ≠ 0 at a point, the map has a smooth local inverse there.
- The inverse's Jacobian is the inverse matrix.
- Jacobians also appear in Newton's method for systems (School 19) and in robotics.
X: Find the Jacobian determinant of x = u + v, y = u − v.
> J = [[∂x/∂u, ∂x/∂v], [∂y/∂u, ∂y/∂v]] = [[1, 1], [1, −1]]
> det J = (1)(−1) − (1)(1) = −2
> Areas are doubled (|det J| = 2) and orientation is reversed
K: The Jacobian holds all first partials; |det J| scales areas and volumes; det J ≠ 0 guarantees a local inverse.
!: Using det J itself (possibly negative) instead of |det J| when changing variables in integrals.
Q: What is the Jacobian determinant for polar coordinates? | r.
Q: What does det J = 0 at a point mean? | The map collapses area there and may have no local inverse.
SUM: Jacobians measure local stretching.
SUM: They make changes of variables work.
SRC: Marsden JE, Tromba AJ, Vector Calculus (6th edn, W. H. Freeman 2012) | textbook | 2012 | https://www.macmillanlearning.com/
SRC: Apostol TM, Mathematical Analysis (2nd edn, Addison-Wesley 1974) | textbook | 1974 | https://www.pearson.com/
NUM1#maths-u08-07-q1@1: Find the Jacobian determinant of x = 2u + v, y = u + 3v. | 5 | 0 |  | det [[2, 1], [1, 3]] = 6 − 1 = 5.
M1#maths-u08-07-q2@1: What does |det J| = 3 mean for a transformation at a point? | Small areas near the point are tripled | Lengths are tripled in every direction | The map is not invertible there | Angles are tripled | The function value is 3 | The Jacobian determinant is the local area scaling factor.
M2#maths-u08-07-q3@2: When does the inverse function theorem guarantee a local inverse? | When the Jacobian determinant is non-zero at the point | When the Jacobian is the identity matrix | When all partial derivatives are positive | When the map is linear only | When the determinant is negative | det J ≠ 0 means the linear approximation is invertible, and so is the map nearby.

## Change of Variables
S: Changing variables in a multiple integral replaces awkward regions or integrands with simple ones, at the cost of a Jacobian factor. It's how polar, cylindrical and spherical coordinates work, and it handles ellipses, parallelograms and more.
O: Apply the change of variables formula to double integrals
O: Choose substitutions that simplify a region or integrand
T: Change of variables formula | ∬_{R} f(x, y) dx dy = ∬_{S} f(x(u, v), y(u, v)) |∂(x, y)/∂(u, v)| du dv
T: Image region | The region S in the uv-plane that maps onto R
H: The method
- Choose u, v to simplify the region's boundaries (or the integrand).
- Express x and y in terms of u and v (or find the Jacobian of the inverse and take its reciprocal).
- Find the new region S, multiply by |det J| and integrate.
H: Examples
- Parallelograms bounded by x + y = c and x − y = d: use u = x + y, v = x − y, with |det J| = ½.
- Ellipses x^{2}/a^{2} + y^{2}/b^{2} ≤ 1: x = ar cos θ, y = br sin θ gives |det J| = abr and area πab.
- Probability: the density of transformed random variables picks up the same Jacobian.
H: Tips
- ∂(x, y)/∂(u, v) = 1/[∂(u, v)/∂(x, y)]: sometimes the reverse Jacobian is easier.
- Check the new region by mapping its boundary curves.
X: Use x = ar cos θ, y = br sin θ to find the area of the ellipse x^{2}/a^{2} + y^{2}/b^{2} ≤ 1.
> The ellipse becomes 0 ≤ r ≤ 1, 0 ≤ θ ≤ 2π
> |det J| = abr (a scaled polar Jacobian)
> Area = ∫₀^{2π}∫₀¹ abr dr dθ = ab × ½ × 2π = πab
K: Substitute to simplify the region, multiply by |det J| and transform the limits; the inverse Jacobian is the reciprocal.
!: Forgetting the Jacobian factor, or not converting the limits to the new variables.
Q: What is |∂(x, y)/∂(u, v)| if |∂(u, v)/∂(x, y)| = 2? | ½.
Q: What is the area of an ellipse with semi-axes 5 and 2? | 10π.
SUM: Change variables to simplify.
SUM: Always include |det J|.
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
SRC: Marsden JE, Tromba AJ, Vector Calculus (6th edn, W. H. Freeman 2012) | textbook | 2012 | https://www.macmillanlearning.com/
NUM1#maths-u08-08-q1@1: Find the area of the ellipse x^{2}/9 + y^{2}/4 ≤ 1, to 2 decimal places. | 18.85 | 0.01 |  | πab = π × 3 × 2 = 6π ≈ 18.85.
M1#maths-u08-08-q2@1: With u = x + y and v = x − y, what is |∂(x, y)/∂(u, v)|? | ½ | 2 | 1 | −2 | 4 | ∂(u, v)/∂(x, y) = −2, so the inverse Jacobian has absolute value ½.
M2#maths-u08-08-q3@2: A region is bounded by xy = 1, xy = 4, y = x and y = 2x. Which substitution helps? | u = xy, v = y/x | u = x + y, v = x − y | Polar coordinates centred at the origin | u = x^{2}, v = y^{2} | Spherical coordinates | Each boundary becomes a constant: u from 1 to 4 and v from 1 to 2.

## Vector Calculus
S: Vector calculus studies vector fields, such as wind velocity, electric fields and fluid flow, using three differential operators (gradient, divergence and curl) and integral theorems that link them. It's the mathematical language of electromagnetism and fluid dynamics.
O: Describe vector fields and the operators grad, div and curl
O: Verify key identities such as curl(grad f) = 0
T: Vector field | A function assigning a vector to each point, such as F(x, y, z) = (P, Q, R)
T: Del operator | ∇ = (∂/∂x, ∂/∂y, ∂/∂z), used to write ∇f, ∇ · F and ∇ × F
H: The operators
- Gradient ∇f: scalar field to vector field (steepest ascent).
- Divergence ∇ · F: vector field to scalar (net outflow per unit volume).
- Curl ∇ × F: vector field to vector field (rotation).
- Laplacian ∇^{2}f = ∇ · ∇f: scalar to scalar.
H: Identities
- curl(grad f) = 0: gradient fields are irrotational.
- div(curl F) = 0: curl fields are divergence-free.
- Product rules: ∇ · (fF) = ∇f · F + f ∇ · F.
H: Integral theorems
- Fundamental theorem for line integrals, Green's, Stokes' and the divergence theorem all say: integrating a derivative over a region equals integrating the field over the boundary.
- Maxwell's equations of electromagnetism are four statements in this language.
X: Verify that curl(∇φ) = 0 for φ = x^{2}y.
> ∇φ = (2xy, x^{2}, 0)
> curl: (∂0/∂y − ∂x^{2}/∂z, ∂(2xy)/∂z − ∂0/∂x, ∂x^{2}/∂x − ∂(2xy)/∂y)
> = (0, 0, 2x − 2x) = (0, 0, 0) ✓
K: Vector fields are acted on by grad, div, curl and the Laplacian; curl grad = 0 and div curl = 0; integral theorems relate a region to its boundary.
!: Taking the curl of a scalar or the gradient of a vector field in elementary vector calculus.
Q: What is div(curl F) for any smooth F? | 0.
Q: What kind of object is ∇ · F? | A scalar field.
SUM: Vector calculus studies fields with three operators.
SUM: Integral theorems connect regions and boundaries.
SRC: Schey HM, Div, Grad, Curl, and All That (4th edn, W. W. Norton 2005) | textbook | 2005 | https://wwnorton.com/
SRC: Griffiths DJ, Introduction to Electrodynamics (5th edn, Cambridge University Press 2023) | textbook | 2023 | https://www.cambridge.org/
NUM1#maths-u08-09-q1@1: For F = (x^{2}, y^{2}, z^{2}), find ∇ · F at (1, 1, 1). | 6 | 0 |  | ∇ · F = 2x + 2y + 2z = 6 at (1, 1, 1).
M1#maths-u08-09-q2@1: Which operator takes a scalar field to a vector field? | The gradient | The divergence | The Laplacian | The line integral | The determinant | The gradient ∇f turns a scalar field into a vector field, one vector at each point.
M3#maths-u08-09-q3@2: Why must a gradient field be irrotational? | curl(∇f) = 0 because mixed partial derivatives are equal | Gradients are always constant | All vector fields are irrotational | Gradients have zero divergence | Gradient fields can't be differentiated | Each curl component is a difference of equal mixed partials, like f_{xy} − f_{yx}.

## Divergence
S: The divergence of a vector field measures how much it spreads out from a point: positive at sources, negative at sinks, zero for an incompressible flow. It's central to fluid dynamics, heat flow and Gauss's law for electric fields.
O: Calculate the divergence of a vector field
O: Interpret divergence as net outflow per unit volume
T: Divergence | ∇ · F = ∂P/∂x + ∂Q/∂y + ∂R/∂z for F = (P, Q, R)
T: Solenoidal field | A field with zero divergence everywhere
H: Calculating
- Add the derivative of each component with respect to its own variable.
- F = (x, y, z): ∇ · F = 3 (spreading out from the origin).
- F = (−y, x, 0): ∇ · F = 0 (pure rotation, no spreading).
H: Meaning
- ∇ · F at P = limit of (flux out of a small closed surface)/(its volume).
- Incompressible fluids (like water, approximately) have ∇ · v = 0.
- Continuity equation: ∂ρ/∂t + ∇ · (ρv) = 0 expresses conservation of mass.
H: Physics
- Gauss's law: ∇ · E = ρ/ε₀ (charges are sources of electric field).
- ∇ · B = 0: no magnetic monopoles.
- Heat flow: the heat equation involves the divergence of the temperature gradient.
X: Find the divergence of F = (xy, yz, zx) at (1, 2, 3).
> ∂(xy)/∂x = y; ∂(yz)/∂y = z; ∂(zx)/∂z = x
> ∇ · F = x + y + z
> At (1, 2, 3): 6, a source there
- In cylindrical and spherical coordinates the divergence formula gains extra factors such as (1/r^{2}) ∂(r^{2}F_{r})/∂r.
K: ∇ · F adds each component's own partial derivative; it's outflow per unit volume; zero for incompressible flows and magnetic fields.
!: Differentiating each component with respect to the wrong variable.
Q: What is the divergence of F = (−y, x, 0)? | 0.
Q: What does ∇ · B = 0 tell us physically? | There are no magnetic monopoles.
SUM: Divergence measures spreading.
SUM: Zero divergence means no sources.
SRC: Schey HM, Div, Grad, Curl, and All That (4th edn, W. W. Norton 2005) | textbook | 2005 | https://wwnorton.com/
SRC: Griffiths DJ, Introduction to Electrodynamics (5th edn, Cambridge University Press 2023) | textbook | 2023 | https://www.cambridge.org/
NUM1#maths-u08-10-q1@1: Find ∇ · F for F = (3x, −2y, 5z). | 6 | 0 |  | 3 − 2 + 5 = 6.
M1#maths-u08-10-q2@1: A flow has negative divergence at a point. What is happening there? | Fluid is converging: the point acts as a sink | Fluid is spreading out from a source | The fluid is rotating without spreading | The flow is incompressible there | The velocity is zero | Negative divergence means net inflow per unit volume.
M2#maths-u08-10-q3@2: Which field is solenoidal (divergence-free)? | (y, z, x) | (x, y, z) | (x^{2}, 0, 0) | (x, 0, 0) | (0, y^{2}, 0) | Each component is independent of its own variable: ∂y/∂x + ∂z/∂y + ∂x/∂z = 0 + 0 + 0.

## Curl
S: The curl of a vector field measures its local rotation: the axis and strength of the swirl a tiny paddle wheel would feel. It describes vorticity in fluids and the relationship between electric and magnetic fields.
O: Calculate the curl of a vector field using the determinant form
O: Interpret curl as rotation and link it to conservative fields
T: Curl | ∇ × F = (∂R/∂y − ∂Q/∂z, ∂P/∂z − ∂R/∂x, ∂Q/∂x − ∂P/∂y)
T: Irrotational field | A field with zero curl everywhere
H: Calculating
- Expand the determinant with rows (i, j, k), (∂/∂x, ∂/∂y, ∂/∂z), (P, Q, R).
- In 2D, only the k-component matters: ∂Q/∂x − ∂P/∂y.
- F = (−y, x, 0) has curl (0, 0, 2): uniform anticlockwise rotation.
H: Meaning
- The component of curl along n gives circulation per unit area around n (Stokes' theorem).
- Vorticity in fluid dynamics is the curl of the velocity field.
- A field can curve without having curl, and can have curl without curving (shear flow (y, 0, 0) has curl (0, 0, −1)).
H: Conservative fields
- On a simply connected region, curl F = 0 iff F = ∇φ for some φ.
- Then line integrals are path-independent.
- Faraday's law: ∇ × E = −∂B/∂t (changing magnetic fields create circulating electric fields).
X: Find the curl of F = (−y, x, 0).
> i: ∂0/∂y − ∂x/∂z = 0; j: ∂(−y)/∂z − ∂0/∂x = 0
> k: ∂x/∂x − ∂(−y)/∂y = 1 + 1 = 2
> curl F = (0, 0, 2): rotation about the z-axis
K: Expand the curl determinant; in 2D use ∂Q/∂x − ∂P/∂y; curl measures local rotation; zero curl on simply connected regions means conservative.
!: Thinking a field with curved streamlines must have non-zero curl.
Q: What is the curl of a gradient field? | Zero.
Q: What does curl of fluid velocity measure? | Vorticity: the local spinning of the fluid.
SUM: Curl measures rotation.
SUM: Zero curl signals a potential.
SRC: Schey HM, Div, Grad, Curl, and All That (4th edn, W. W. Norton 2005) | textbook | 2005 | https://wwnorton.com/
SRC: Marsden JE, Tromba AJ, Vector Calculus (6th edn, W. H. Freeman 2012) | textbook | 2012 | https://www.macmillanlearning.com/
NUM1#maths-u08-11-q1@1: For F = (y^{2}, x^{2}, 0), find the k-component of curl F at (1, 2). | -2 | 0 |  | ∂Q/∂x − ∂P/∂y = 2x − 2y = 2 − 4 = −2.
M1#maths-u08-11-q2@1: Which field is irrotational? | (2x, 2y, 2z) | (−y, x, 0) | (y, 0, 0) | (0, x, 0) | (z, 0, −x) | (2x, 2y, 2z) = ∇(x^{2} + y^{2} + z^{2}), and gradients have zero curl.
M2#maths-u08-11-q3@2: The shear flow v = (y, 0, 0) has straight streamlines. What is its curl? | (0, 0, −1), so it still rotates small paddles | (0, 0, 0), because the lines are straight | (1, 0, 0), along the flow | (0, 1, 0), across the flow | (0, 0, 1), anticlockwise | ∂Q/∂x − ∂P/∂y = 0 − 1 = −1: faster flow on one side spins a paddle wheel.

## Laplacian Operator
S: The Laplacian ∇^{2}f is the divergence of the gradient: it compares a function's value at a point with its average nearby. It appears in the heat, wave, Laplace and Schrödinger equations, and its solutions (harmonic functions) are remarkably smooth.
O: Calculate the Laplacian in Cartesian coordinates
O: Recognise harmonic functions and the PDEs built on the Laplacian
T: Laplacian | ∇^{2}f = ∂^{2}f/∂x^{2} + ∂^{2}f/∂y^{2} + ∂^{2}f/∂z^{2}
T: Harmonic function | A function with ∇^{2}f = 0
H: Meaning
- ∇^{2}f(P) > 0: f at P is below its average on small spheres around P (a "valley").
- ∇^{2}f(P) < 0: f at P is above its average (a "peak").
- Harmonic functions equal the average of their values on any sphere (mean value property) and have no interior maxima or minima.
H: Equations
- Heat: ∂u/∂t = k∇^{2}u. Wave: ∂^{2}u/∂t^{2} = c^{2}∇^{2}u.
- Laplace: ∇^{2}φ = 0 (steady temperature, electrostatics in empty space).
- Poisson: ∇^{2}φ = −ρ/ε₀ (electrostatics with charges).
- These are studied in School 10.
H: Other coordinates
- Polar (2D): ∇^{2}f = f_{rr} + (1/r)f_{r} + (1/r^{2})f_{θθ}.
- Radially symmetric 3D: ∇^{2}f = f″ + (2/r)f′; 1/r is harmonic away from the origin.
X: Find the Laplacian of f = x^{2} − y^{2} and of g = x^{2} + y^{2} + z^{2}.
> f: f_{xx} = 2, f_{yy} = −2, so ∇^{2}f = 0: f is harmonic
> g: 2 + 2 + 2 = 6
> g is positive-Laplacian everywhere: it's a "bowl", below the average of its neighbours
K: ∇^{2}f = sum of unmixed second partials = div grad f; harmonic functions satisfy the mean value property; the Laplacian drives the heat, wave and Laplace equations.
!: Including mixed partial derivatives in the Laplacian.
Q: Is f = xy harmonic? | Yes: f_{xx} + f_{yy} = 0 + 0 = 0.
Q: Which equation is ∇^{2}φ = 0? | Laplace's equation.
SUM: The Laplacian compares a value with its neighbours.
SUM: It underlies the classical PDEs.
SRC: Evans LC, Partial Differential Equations (2nd edn, American Mathematical Society 2010) | textbook | 2010 | https://bookstore.ams.org/
SRC: Riley KF, Hobson MP, Bence SJ, Mathematical Methods for Physics and Engineering (3rd edn, Cambridge University Press 2006) | textbook | 2006 | https://www.cambridge.org/
NUM1#maths-u08-12-q1@1: Find ∇^{2}(x^{3} + y^{3}) at (1, 1). | 12 | 0 |  | ∇^{2} = 6x + 6y = 12 at (1, 1).
M1#maths-u08-12-q2@1: Which function is harmonic in the plane? | e^{x} cos y | x^{2} + y^{2} | x^{3} | e^{x} e^{y} | sin x sin y | f_{xx} = e^{x} cos y and f_{yy} = −e^{x} cos y sum to 0.
M3#maths-u08-12-q3@2: Why can't a non-constant harmonic function have a maximum inside its domain? | Its value equals the average over any small sphere, so it can't exceed all nearby values | Harmonic functions are always linear | Their gradient is never zero | They're unbounded | It can have one | The mean value property rules out strict interior maxima (the maximum principle).

## Line Integrals
S: A line integral adds up a quantity along a curve: the mass of a wire, or the work done by a force along a path. For conservative fields, the work depends only on the endpoints, a vector version of the fundamental theorem of calculus.
O: Evaluate scalar and vector line integrals by parametrising curves
O: Use potential functions to evaluate line integrals of conservative fields
T: Line integral of a vector field | ∫_{C} F · dr = ∫ₐ^{b} F(r(t)) · r′(t) dt, the work done by F along C
T: Fundamental theorem for line integrals | ∫_{C} ∇φ · dr = φ(end) − φ(start)
H: Computing
- Parametrise C as r(t), a ≤ t ≤ b.
- Scalar: ∫_{C} f ds = ∫ f(r(t)) |r′(t)| dt (gives mass or arc length).
- Vector: substitute r(t) into F, dot with r′(t), integrate.
- Reversing the direction changes the sign of a vector line integral.
H: Conservative fields
- If F = ∇φ, the integral depends only on endpoints, and is zero around closed loops.
- Test: curl F = 0 on a simply connected region.
- Find φ by integrating components and matching.
H: Physics
- Work by gravity or a spring depends only on start and end: potential energy.
- Friction isn't conservative: work depends on the path.
- Circulation ∮ F · dr measures rotation around a loop (see Green's and Stokes' theorems).
X: Find ∫_{C} F · dr for F = (y, x) along r(t) = (t, t^{2}), 0 ≤ t ≤ 1, and check with a potential.
> F(r(t)) = (t^{2}, t); r′(t) = (1, 2t); dot product t^{2} + 2t^{2} = 3t^{2}
> ∫₀¹ 3t^{2} dt = 1
> F = ∇(xy), so the answer is φ(1, 1) − φ(0, 0) = 1 ✓
K: Parametrise, substitute and integrate F · r′ dt; conservative fields give φ(end) − φ(start) and zero around loops.
!: Forgetting the factor r′(t) (or |r′(t)| for scalar integrals).
Q: What is ∮ ∇φ · dr around any closed curve? | 0.
Q: What happens to ∫_{C} F · dr if C is reversed? | It changes sign.
SUM: Line integrals add along curves.
SUM: Potentials make them path-independent.
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
SRC: Marsden JE, Tromba AJ, Vector Calculus (6th edn, W. H. Freeman 2012) | textbook | 2012 | https://www.macmillanlearning.com/
NUM1#maths-u08-13-q1@1: F = (2x, 2y) is conservative. Find the work done moving from (0, 0) to (3, 4). | 25 | 0 |  | φ = x^{2} + y^{2}, so the work is 25 − 0 = 25.
M1#maths-u08-13-q2@1: Which quantity is a line integral of a vector field? | The work done by a force along a path | The area enclosed by a curve | The volume under a surface | The flux through a surface | The length of a vector | Work is the line integral ∫ F · dr of the force along the path taken.
M2#maths-u08-13-q3@2: Why does the work done by gravity on a closed loop equal zero? | Gravity is conservative, so loop integrals of its field vanish | Gravity is zero on average | The path has zero length | Work is always zero | Gravity acts only vertically | A gradient field gives φ(end) − φ(start), which is 0 when they coincide.

## Surface Integrals
S: Surface integrals add up quantities over curved surfaces: the area of a dome, the mass of a shell, or the flux of a fluid or field through a membrane. Flux integrals are the surface version of work integrals.
O: Parametrise surfaces and calculate surface area
O: Calculate the flux of a vector field through a surface
T: Surface element | dS = |r_{u} × r_{v}| du dv for a parametrised surface r(u, v)
T: Flux | ∬_{S} F · n dS, the rate at which F flows through S in the direction of the unit normal n
H: Parametrising surfaces
- Graphs z = g(x, y): r(x, y) = (x, y, g(x, y)); dS = √(1 + g_{x}^{2} + g_{y}^{2}) dx dy.
- Spheres: r(φ, θ) = R(sin φ cos θ, sin φ sin θ, cos φ); dS = R^{2} sin φ dφ dθ.
- Cylinders: r(θ, z) = (R cos θ, R sin θ, z); dS = R dθ dz.
H: Flux
- Choose an orientation (outward for closed surfaces).
- ∬ F · n dS = ∬ F(r(u, v)) · (r_{u} × r_{v}) du dv (check the normal's direction).
- Flux of a constant field through a flat region = (component of F along n) × area.
H: Uses
- Fluid flow rate through a pipe cross-section or membrane.
- Electric flux in Gauss's law; heat flux through walls.
- Surface area: ∬ 1 dS.
X: Use the sphere parametrisation to find the surface area of a sphere of radius R.
> dS = R^{2} sin φ dφ dθ
> Area = ∫₀^{2π}∫₀^{π} R^{2} sin φ dφ dθ = R^{2} × 2 × 2π
> = 4πR^{2}
K: Parametrise the surface, find |r_{u} × r_{v}|, and integrate; flux uses F · n with a chosen orientation; constant fields through flat regions are easy.
!: Ignoring orientation, which can flip the sign of a flux.
Q: What is dS on a sphere of radius R? | R^{2} sin φ dφ dθ.
Q: What does a flux integral measure? | The rate a field flows through a surface.
SUM: Surface integrals add over curved surfaces.
SUM: Flux measures flow through them.
SRC: Marsden JE, Tromba AJ, Vector Calculus (6th edn, W. H. Freeman 2012) | textbook | 2012 | https://www.macmillanlearning.com/
SRC: Griffiths DJ, Introduction to Electrodynamics (5th edn, Cambridge University Press 2023) | textbook | 2023 | https://www.cambridge.org/
NUM1#maths-u08-14-q1@1: Find the upward flux of F = (0, 0, 3) through the square 0 ≤ x, y ≤ 2 in the plane z = 0. | 12 | 0 |  | F · k = 3 over an area of 4, giving 12.
M1#maths-u08-14-q2@1: What is the flux of F = (1, 0, 0) through the square 0 ≤ y, z ≤ 1 in the plane z = 0, with normal k? | 0, because F runs parallel to the surface | 1, the square's area | −1, flowing backwards | 2, counting both sides | π, a circle's area | F · k = 0: the field skims along the plane without crossing it.
M2#maths-u08-14-q3@2: For the graph z = g(x, y), what is dS? | √(1 + g_{x}^{2} + g_{y}^{2}) dx dy | (1 + g_{x} + g_{y}) dx dy | g_{x}g_{y} dx dy | √(g_{x}^{2} + g_{y}^{2}) dx dy | dx dy only | The cross product of (1, 0, g_{x}) and (0, 1, g_{y}) has that length.

## Volume Integrals
S: Volume integrals add a scalar or vector quantity over a three-dimensional region: total mass, charge, energy or the volume itself. In vector calculus they appear on one side of the divergence theorem, balancing flux through the boundary.
O: Set up volume integrals for mass, charge and energy
O: Relate volume integrals to fluxes through boundaries
T: Volume integral | ∭_{V} f dV, the total of a scalar density f over a region V
T: Density | A quantity per unit volume, such as mass density ρ (kg/m^{3}) or charge density
H: Setting up
- Total = ∭ density dV.
- Choose coordinates matching the region (Cartesian, cylindrical, spherical).
- Vector volume integrals are taken component by component.
H: Physics
- Mass and centre of mass of solids with varying density.
- Total charge Q = ∭ ρ dV; electrostatic energy (ε₀/2)∭ |E|^{2} dV.
- Conservation laws: rate of change of ∭ ρ dV = minus the flux through the boundary.
H: Linking to boundaries
- The divergence theorem: ∭ ∇ · F dV = ∯ F · n dS.
- So a volume integral of a divergence can be computed on the boundary, or vice versa.
X: Find the mass of the cube [0, 2]^{3} with density ρ = x + y + z.
> By symmetry, mass = 3 × ∭ x dV
> ∭ x dV = (∫₀² x dx)(∫₀² dy)(∫₀² dz) = 2 × 2 × 2 = 8
> Mass = 3 × 8 = 24
- Spherical coordinates make radially symmetric densities easy: ∭ f(ρ) dV = 4π∫ f(ρ)ρ^{2} dρ.
K: Volume integrals total densities over solids; use symmetry and suitable coordinates; the divergence theorem links them to boundary fluxes.
!: Mixing units, such as integrating a density in g/cm^{3} over a volume in m^{3}.
Q: How do you find the total charge in a region? | Integrate the charge density over the volume.
Q: Which theorem turns a volume integral of a divergence into a surface integral? | The divergence theorem.
SUM: Volume integrals total quantities in solids.
SUM: They balance boundary fluxes.
SRC: Riley KF, Hobson MP, Bence SJ, Mathematical Methods for Physics and Engineering (3rd edn, Cambridge University Press 2006) | textbook | 2006 | https://www.cambridge.org/
SRC: Griffiths DJ, Introduction to Electrodynamics (5th edn, Cambridge University Press 2023) | textbook | 2023 | https://www.cambridge.org/
NUM1#maths-u08-15-q1@1: A ball of radius 1 has constant density 3. Find its mass, to 2 decimal places. | 12.57 | 0.01 |  | Mass = 3 × 4π/3 = 4π ≈ 12.57.
M1#maths-u08-15-q2@1: What does ∭_{V} ρ dV give if ρ is charge density? | The total charge in V | The electric field in V | The charge density at the centre | The voltage across V | The surface area of V | Integrating charge per unit volume gives total charge.
M2#maths-u08-15-q3@2: Fluid mass inside a fixed region is decreasing. What does conservation of mass imply about the boundary? | There's a net outward flux of mass through it | There's a net inward flux through it | The fluid's density must be constant | The boundary's area is shrinking | Nothing about the boundary | The rate of change of ∭ρ dV equals minus the outward flux of ρv.

## Green's Theorem
S: Green's theorem links a line integral around a closed plane curve with a double integral over the region inside. It turns circulation into total curl, and it explains how a planimeter measures area by tracing a boundary.
O: State and apply Green's theorem
O: Use Green's theorem to compute areas from boundary integrals
T: Green's theorem | ∮_{C} (P dx + Q dy) = ∬_{D} (∂Q/∂x − ∂P/∂y) dA, with C traversed anticlockwise
T: Positive orientation | Travelling around C with the region on the left (anticlockwise for the outer boundary)
H: The theorem
- Circulation around the boundary equals the integral of the 2D curl over the region.
- Conditions: C simple, closed, piecewise smooth; P, Q with continuous partials on D.
- Regions with holes: include inner boundaries traversed clockwise.
H: Area formulas
- Area = ∮ x dy = −∮ y dx = ½∮ (x dy − y dx).
- Planimeters (mechanical area-measuring devices) use this principle.
- The shoelace formula for polygon areas is Green's theorem for straight edges.
H: Uses
- Converting hard line integrals into easy area integrals, or the reverse.
- If ∂Q/∂x = ∂P/∂y on a simply connected region, F is conservative.
- Green's theorem is the 2D case of Stokes' theorem.
X: Use Green's theorem to find ∮ (−y dx + x dy) around the unit circle.
> P = −y, Q = x, so ∂Q/∂x − ∂P/∂y = 1 + 1 = 2
> ∬_{D} 2 dA = 2 × area = 2π
> Equivalently, half of this integral, π, is the area of the disc
K: ∮ P dx + Q dy = ∬ (Q_{x} − P_{y}) dA anticlockwise; area = ½∮(x dy − y dx); Green is Stokes in the plane.
!: Traversing the curve clockwise, which flips the sign.
Q: Give a line integral formula for area. | ½∮ (x dy − y dx).
Q: Which orientation does Green's theorem use for the outer boundary? | Anticlockwise (region on the left).
SUM: Green's theorem links boundary and region.
SUM: It turns circulation into area integrals.
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
SRC: Marsden JE, Tromba AJ, Vector Calculus (6th edn, W. H. Freeman 2012) | textbook | 2012 | https://www.macmillanlearning.com/
NUM1#maths-u08-16-q1@1: Use Green's theorem to find ∮ (−y dx + x dy) anticlockwise around the square [0, 1]^{2}. | 2 | 0 |  | The integrand of the double integral is 2, over area 1.
M1#maths-u08-16-q2@1: By Green's theorem, ∮ (x^{2} dx + y^{2} dy) around any simple closed curve equals what? | 0, since ∂Q/∂x − ∂P/∂y = 0 | The enclosed area | Twice the enclosed area | The curve's length | It depends on the curve | Q_{x} = 0 and P_{y} = 0, so the double integral vanishes.
M2#maths-u08-16-q3@2: How does a planimeter find the area of a shape? | By tracing the boundary, computing a line integral equal to the area | By counting grid squares inside | By weighing a cut-out shape | By measuring the longest diameter | By using the shape's perimeter squared | Green's theorem turns the area integral into a boundary integral the instrument accumulates.

## Stokes' Theorem
S: Stokes' theorem says the circulation of a field around a closed curve equals the flux of its curl through any surface bounded by that curve. It generalises Green's theorem to curved surfaces in space and underlies Faraday's law of induction.
O: State and apply Stokes' theorem with correct orientation
O: Use Stokes' theorem to swap between line and surface integrals
T: Stokes' theorem | ∮_{C} F · dr = ∬_{S} (∇ × F) · n dS, where C is the boundary of S
T: Right-hand rule | With fingers curling along C, the thumb points along the normal n
H: The theorem
- Any surface with boundary C gives the same flux of curl: choose the easiest.
- Orientation: n and the direction of C must follow the right-hand rule.
- If ∇ × F = 0, circulation around every closed curve (on a simply connected region) is zero.
H: Using it
- Replace a hard line integral with a flux through a flat disc.
- Replace a surface integral of a curl with a line integral around its rim.
- A closed surface has no boundary, so the flux of a curl through it is zero.
H: Physics
- Faraday's law: ∮ E · dr = −d/dt ∬ B · n dS, so changing magnetic flux induces voltage (generators, transformers).
- Ampère's law: ∮ B · dr = μ₀I_{enclosed}.
- Kelvin's circulation theorem in fluid dynamics.
X: For F = (−y, x, 0), verify Stokes' theorem using the upper unit hemisphere and the unit circle.
> Line integral around the circle (anticlockwise from above): 2π
> curl F = (0, 0, 2); its flux through the flat unit disc (normal k) is 2 × π = 2π
> The hemisphere has the same boundary, so its flux is also 2π ✓
K: Circulation around C = flux of curl through any surface it bounds; use the right-hand rule; pick the simplest surface; Faraday's law is Stokes in physics.
!: Mismatching the orientation of the curve and the surface normal.
Q: What is the flux of ∇ × F through a closed surface? | 0.
Q: Which law of electromagnetism uses Stokes' theorem with changing magnetic flux? | Faraday's law.
SUM: Stokes links circulation and curl.
SUM: Any bounding surface works.
SRC: Marsden JE, Tromba AJ, Vector Calculus (6th edn, W. H. Freeman 2012) | textbook | 2012 | https://www.macmillanlearning.com/
SRC: Griffiths DJ, Introduction to Electrodynamics (5th edn, Cambridge University Press 2023) | textbook | 2023 | https://www.cambridge.org/
NUM1#maths-u08-17-q1@1: For F = (−y, x, 0), find ∮ F · dr anticlockwise around the circle of radius 2 in the xy-plane, to 2 decimal places. | 25.13 | 0.01 |  | Flux of curl (0, 0, 2) through the disc: 2 × 4π = 8π ≈ 25.13.
M1#maths-u08-17-q2@1: Two surfaces share the same boundary curve. What does Stokes' theorem say about the flux of curl F through them? | It's the same through both (with matching orientation) | It's always zero through both | The larger surface has more flux | They're negatives of each other | It depends on their areas | Both equal the same line integral around the shared boundary.
M3#maths-u08-17-q3@2: Why is the flux of curl F through a closed sphere zero? | A closed surface has no boundary curve to integrate around | Curl fields are always zero | Spheres have no normal vector | The divergence is non-zero | It isn't zero | Splitting the sphere into two hemispheres gives equal and opposite boundary integrals (equivalently, div curl = 0).

## Divergence Theorem
S: The divergence theorem says that the total outward flux through a closed surface equals the integral of the divergence over the volume inside. It's the mathematical form of conservation laws and of Gauss's law for electric fields.
O: State and apply the divergence theorem
O: Use it to compute fluxes and derive conservation laws
T: Divergence theorem | ∯_{S} F · n dS = ∭_{V} ∇ · F dV, with n the outward normal of the closed surface S
T: Gauss's law | ∯ E · n dS = Q_{enclosed}/ε₀
H: The theorem
- Net outflow through the boundary = total of sources inside.
- Applies to closed surfaces enclosing a solid region.
- Often easier: a hard flux over several faces becomes one volume integral.
H: Applications
- Gauss's law: compute fields of symmetric charge distributions (field of a point charge falls as 1/r^{2}).
- Conservation: ∂ρ/∂t + ∇ · J = 0 follows from balancing flow out of every small region.
- Derivations of the heat and diffusion equations.
H: Checking
- Verify by computing both sides for simple fields.
- F = (x, y, z) through a sphere: ∇ · F = 3, so flux = 3 × volume.
- Fields with singularities inside (like 1/r^{2}) need care: the point source contributes.
X: Find the outward flux of F = (x, y, z) through the sphere of radius R, both ways.
> Divergence theorem: ∇ · F = 3, so flux = 3 × (4/3)πR^{3} = 4πR^{3}
> Directly: on the sphere F · n = R, so flux = R × 4πR^{2} = 4πR^{3}
> Both agree ✓
K: Outward flux = ∭ div F dV; use it to swap hard surface integrals for volume ones; it's the basis of Gauss's law and conservation equations.
!: Applying the theorem to an open surface, or using an inward normal.
Q: What is the flux of F = (x, y, z) through the boundary of the unit cube? | 3 (divergence 3 times volume 1).
Q: What physical law is the divergence theorem applied to electric fields? | Gauss's law.
SUM: Flux out equals sources in.
SUM: It underpins conservation laws.
SRC: Griffiths DJ, Introduction to Electrodynamics (5th edn, Cambridge University Press 2023) | textbook | 2023 | https://www.cambridge.org/
SRC: Schey HM, Div, Grad, Curl, and All That (4th edn, W. W. Norton 2005) | textbook | 2005 | https://wwnorton.com/
NUM1#maths-u08-18-q1@1: Find the outward flux of F = (2x, 0, 0) through the boundary of the box [0, 1] × [0, 2] × [0, 3]. | 12 | 0 |  | ∇ · F = 2 and the volume is 6, so the flux is 12.
M1#maths-u08-18-q2@1: What does the divergence theorem require of the surface? | It must be closed, with an outward normal | It must be flat | It must be a sphere | It must have a boundary curve | It must be infinite | The theorem relates a closed surface to the volume it encloses.
M2#maths-u08-18-q3@2: The flux of a field through every closed surface is zero. What can you conclude? | Its divergence is zero everywhere | Its curl is zero everywhere | The field is zero everywhere | The field is conservative | Nothing at all | Shrinking surfaces around any point shows the divergence there must vanish.

## Matrix Calculus
S: Matrix calculus differentiates functions of vectors and matrices with respect to those vectors and matrices. It's essential in statistics, optimisation and machine learning, where gradients of losses with millions of parameters drive training.
O: Compute gradients of linear and quadratic forms
O: Derive the least squares normal equations using matrix calculus
T: Gradient with respect to a vector | ∇_{x}f, the vector of partial derivatives ∂f/∂x_{i}
T: Hessian | The matrix of second partial derivatives ∂^{2}f/∂x_{i}∂x_{j}
H: Key rules
- ∇_{x}(aᵀx) = a.
- ∇_{x}(xᵀAx) = (A + Aᵀ)x, which is 2Ax for symmetric A.
- ∇_{x}‖Ax − b‖^{2} = 2Aᵀ(Ax − b).
- ∂ tr(AX)/∂X = Aᵀ; ∂ ln det X/∂X = X^{−ᵀ}.
H: Least squares
- Minimise ‖Xβ − y‖^{2}: setting the gradient to zero gives XᵀXβ = Xᵀy (the normal equations).
- The Hessian 2XᵀX is positive semi-definite, so this is a minimum.
- Ridge regression adds λ‖β‖^{2}, giving (XᵀX + λI)β = Xᵀy (School 13).
H: Conventions and tools
- Numerator and denominator layout conventions differ by a transpose: be consistent.
- Automatic differentiation (backpropagation) computes these gradients efficiently (School 24).
- The Matrix Cookbook is a standard reference for identities.
X: Minimise f(x) = xᵀAx − 2bᵀx for symmetric positive definite A.
> ∇f = 2Ax − 2b
> Set to zero: Ax = b, so x = A^{−1}b
> The Hessian 2A is positive definite, so this is the minimum
K: ∇(aᵀx) = a; ∇(xᵀAx) = (A + Aᵀ)x; least squares gives XᵀXβ = Xᵀy; check the Hessian for minima; mind layout conventions.
!: Writing ∇(xᵀAx) = 2Ax for a non-symmetric A.
Q: What is ∇_{x}(3x₁ + 5x₂)? | (3, 5).
Q: What are the least squares normal equations? | XᵀXβ = Xᵀy.
SUM: Matrix calculus differentiates in many dimensions.
SUM: It yields the normal equations.
SRC: Petersen KB, Pedersen MS, The Matrix Cookbook (Technical University of Denmark 2012) | guidance | 2012 | https://www.math.uwaterloo.ca/~hwolkowi/matrixcookbook.pdf
SRC: Magnus JR, Neudecker H, Matrix Differential Calculus with Applications in Statistics and Econometrics (3rd edn, Wiley 2019) | textbook | 2019 | https://www.wiley.com/
NUM1#maths-u08-19-q1@1: For f(x) = x₁^{2} + 3x₁x₂, find ∂f/∂x₁ at (1, 1). | 5 | 0 |  | ∂f/∂x₁ = 2x₁ + 3x₂ = 2 + 3 = 5.
M1#maths-u08-19-q2@1: What is ∇_{x}(xᵀAx) for a symmetric matrix A? | 2Ax | Ax | xᵀA | Aᵀx + 1 | 2xᵀ | In general ∇(xᵀAx) = (A + Aᵀ)x, which equals 2Ax when A is symmetric.
M2#maths-u08-19-q3@2: Why do automatic differentiation libraries matter for machine learning? | They compute gradients of losses with many parameters efficiently and exactly | They avoid needing any gradients | They solve the normal equations symbolically | They compute only numerical estimates by finite differences | They replace matrix calculus with guesswork | Reverse-mode differentiation (backpropagation) gets the whole gradient in about the cost of one function evaluation.

## Tensor Calculus
S: Tensor calculus extends vector calculus to curved spaces and to quantities with several indices, like stress or curvature. It uses index notation and the metric tensor, and it's the language of general relativity and continuum mechanics.
O: Use index notation with the Einstein summation convention
O: Describe the metric tensor and covariant differentiation
T: Einstein summation convention | A repeated index in a term is summed over: a_{i}b_{i} means Σ a_{i}b_{i}
T: Metric tensor | g_{ij}, which gives lengths and angles: ds^{2} = g_{ij} dx^{i} dx^{j}
H: Index notation
- Kronecker delta δ_{ij} (1 if i = j, else 0): δ_{ii} = n in n dimensions.
- Levi-Civita symbol ε_{ijk}: cross products are (a × b)_{i} = ε_{ijk}a_{j}b_{k}.
- Identities like ε_{ijk}ε_{imn} = δ_{jm}δ_{kn} − δ_{jn}δ_{km} prove vector identities quickly.
H: Tensors
- A tensor's components change in a definite way under coordinate changes; upper (contravariant) and lower (covariant) indices transform differently.
- Examples: stress tensor in materials, inertia tensor, electromagnetic field tensor.
- Contracting indices (summing an upper with a lower) gives invariants.
H: Curved spaces
- The metric tensor encodes geometry: polar coordinates give ds^{2} = dr^{2} + r^{2} dθ^{2}.
- Ordinary derivatives of tensors aren't tensors; covariant derivatives add Christoffel symbols to fix this.
- Curvature (the Riemann tensor) measures how parallel transport around loops fails.
- Einstein's field equations relate curvature to energy and momentum.
X: Find the metric tensor for polar coordinates in the plane.
> x = r cos θ, y = r sin θ
> ds^{2} = dx^{2} + dy^{2} = dr^{2} + r^{2} dθ^{2}
> So g = diag(1, r^{2}): g_{rr} = 1, g_{θθ} = r^{2}, g_{rθ} = 0
K: Sum over repeated indices; δ_{ij} and ε_{ijk} handle dot and cross products; the metric tensor gives geometry; covariant derivatives and curvature extend calculus to curved spaces.
!: Summing over an index that appears only once, or three times, in a term.
Q: What is δ_{ii} in three dimensions? | 3.
Q: What does the metric tensor determine? | Lengths and angles (the geometry of the space).
SUM: Tensors carry many-indexed quantities.
SUM: The metric encodes geometry.
SRC: Schutz B, A First Course in General Relativity (3rd edn, Cambridge University Press 2022) | textbook | 2022 | https://www.cambridge.org/
SRC: Riley KF, Hobson MP, Bence SJ, Mathematical Methods for Physics and Engineering (3rd edn, Cambridge University Press 2006) | textbook | 2006 | https://www.cambridge.org/
NUM1#maths-u08-20-q1@1: In four-dimensional spacetime, what is δ_{ii} (summed)? | 4 | 0 |  | Each of the four diagonal entries is 1, summing to 4.
M1#maths-u08-20-q2@1: In index notation, what does a_{i}b_{i} represent? | The dot product a · b | The cross product a × b | The matrix ab^{T} | A single component a₁b₁ only | The sum a + b | The repeated index i is summed: Σ a_{i}b_{i}.
M2#maths-u08-20-q3@2: Why are Christoffel symbols needed in curved coordinates? | Basis vectors change from point to point, so derivatives must correct for that | They replace the metric tensor entirely | They make all derivatives zero | Coordinates in flat space never need them | They convert vectors into scalars | Covariant derivatives add Christoffel terms so the result transforms as a tensor.

## Calculus of Variations
S: The calculus of variations finds functions that make an integral as small or large as possible: the shortest path, the fastest slide, the shape of a hanging chain. Its Euler–Lagrange equation also generates the equations of motion in physics.
O: Derive the Euler–Lagrange equation for a functional
O: Solve classic problems such as the shortest path
T: Functional | A rule assigning a number to a function, such as J[y] = ∫ L(x, y, y′) dx
T: Euler–Lagrange equation | ∂L/∂y − d/dx(∂L/∂y′) = 0, satisfied by extremals of J
H: The method
- Perturb y to y + εη (with η = 0 at the ends) and require dJ/dε = 0 at ε = 0.
- Integration by parts gives the Euler–Lagrange equation.
- If L doesn't depend on x, the Beltrami identity L − y′ ∂L/∂y′ = constant is a first integral.
H: Classic problems
- Shortest path in the plane: L = √(1 + y′^{2}) gives y″ = 0, a straight line.
- Brachistochrone (Johann Bernoulli, 1696): the curve of fastest descent is a cycloid.
- Catenary: a hanging chain minimises potential energy, giving y = a cosh(x/a).
- Isoperimetric problem: the circle encloses the most area for a given perimeter (constraints use Lagrange multipliers).
H: Physics
- Hamilton's principle: motion makes the action ∫(T − V) dt stationary.
- The Euler–Lagrange equations then give Newton's laws in any coordinates.
- Fermat's principle of least time gives Snell's law of refraction.
X: Find the curves that extremise J[y] = ∫ √(1 + y′^{2}) dx (arc length).
> L doesn't depend on y, so ∂L/∂y = 0 and d/dx(∂L/∂y′) = 0
> ∂L/∂y′ = y′/√(1 + y′^{2}) = constant, so y′ is constant
> y = mx + c: straight lines are the shortest paths
K: Extremals of ∫L dx satisfy ∂L/∂y − d/dx(∂L/∂y′) = 0; straight lines, cycloids and catenaries are classic answers; Hamilton's principle gives mechanics.
!: Treating y and y′ as dependent when taking the partial derivatives of L (they're treated as independent variables).
Q: What curve solves the brachistochrone problem? | A cycloid.
Q: What does Hamilton's principle make stationary? | The action, ∫ (T − V) dt.
SUM: Variational problems optimise functionals.
SUM: Euler–Lagrange finds the extremals.
SRC: Gelfand IM, Fomin SV, Calculus of Variations (Dover 2000, from the 1963 edn) | textbook | 2000 | https://store.doverpublications.com/
SRC: Goldstein H, Poole C, Safko J, Classical Mechanics (3rd edn, Addison-Wesley 2002) | textbook | 2002 | https://www.pearson.com/
NUM1#maths-u08-21-q1@1: For L = y′^{2} + 4y, the Euler–Lagrange equation gives y″ = c. Find c. | 2 | 0 |  | ∂L/∂y = 4 and d/dx(2y′) = 2y″, so 4 − 2y″ = 0 and y″ = 2.
M1#maths-u08-21-q2@1: For L = y′^{2} − y^{2}, what does the Euler–Lagrange equation give? | y″ = −y | y″ = y | y′ = y | y″ = 0 | y = 0 only | ∂L/∂y = −2y and d/dx(2y′) = 2y″, so −2y − 2y″ = 0.
M2#maths-u08-21-q3@2: Which principle gives Snell's law of refraction? | Fermat's principle of least time | The principle of least distance | Conservation of momentum | The isoperimetric inequality | Newton's third law | Light takes the path of stationary travel time, giving sin θ₁/v₁ = sin θ₂/v₂.

## Fractional Calculus
S: Fractional calculus defines derivatives and integrals of non-integer order, such as a half-derivative. These operators have memory (they depend on the whole history of a function), which makes them useful for modelling viscoelastic materials and anomalous diffusion.
O: Use the Riemann–Liouville integral and the fractional power rule
O: Explain why fractional operators are non-local and where they're used
T: Riemann–Liouville integral | I^{α}f(x) = (1/Γ(α)) ∫₀^{x} (x − t)^{α−1} f(t) dt, for α > 0
T: Fractional power rule | D^{α}x^{k} = [Γ(k + 1)/Γ(k − α + 1)] x^{k−α}
H: Definitions
- Cauchy's formula for repeated integration extends to non-integer orders with the gamma function.
- A fractional derivative of order α: differentiate the fractional integral of order n − α, n times.
- Riemann–Liouville and Caputo definitions differ in where the derivative is taken; Caputo suits initial value problems.
H: Properties
- D^{½}D^{½}f = Df for suitable f.
- Fractional derivatives are non-local: they depend on values over the whole interval, a kind of memory.
- The derivative of a constant can be non-zero in the Riemann–Liouville sense (but is zero for Caputo).
H: Applications
- Viscoelastic materials between springs and dashpots.
- Anomalous diffusion where spread grows like t^{α} rather than t.
- Control engineering (fractional PID controllers) and electrochemistry.
X: Find the half-derivative of f(x) = x, and check that applying it twice gives 1.
> D^{½}x = Γ(2)/Γ(3/2) x^{½} = 1/(√π/2) × √x = 2√x/√π
> Apply again: (2/√π) D^{½}x^{½} = (2/√π) × Γ(3/2)/Γ(1) x^{0}
> = (2/√π)(√π/2) = 1, the ordinary derivative of x ✓
K: Fractional operators use the gamma function; D^{α}x^{k} = Γ(k + 1)/Γ(k − α + 1) x^{k−α}; they're non-local, modelling memory in materials and diffusion.
!: Assuming fractional derivatives are local like ordinary ones.
Q: What is Γ(3/2)? | √π/2.
Q: Why are fractional derivatives said to have memory? | They depend on the function's values over the whole interval, not just near the point.
SUM: Fractional calculus generalises order.
SUM: Its operators remember the past.
SRC: Podlubny I, Fractional Differential Equations (Academic Press 1999) | textbook | 1999 | https://www.sciencedirect.com/
SRC: Oldham KB, Spanier J, The Fractional Calculus (Academic Press 1974) | textbook | 1974 | https://store.doverpublications.com/
NUM1#maths-u08-22-q1@1: Find Γ(3/2) to 4 decimal places. | 0.8862 | 0.0001 |  | Γ(3/2) = ½Γ(½) = √π/2 ≈ 0.8862.
M1#maths-u08-22-q2@1: What is D^{½} applied twice to a suitable function f? | The first derivative f′ | The second derivative f″ | f itself | The integral of f | Zero | Two half-derivatives compose to an ordinary first derivative.
M3#maths-u08-22-q3@2: Why are fractional derivatives used to model viscoelastic materials? | Their memory captures behaviour between a pure spring and a pure fluid damper | They're simpler than ordinary derivatives | They remove the need for any data | Viscoelastic materials are always fractals | They make every equation linear | Stress depends on the whole strain history, which non-local operators represent naturally.
`;
