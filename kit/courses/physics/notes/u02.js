// Unit 2: Mathematics for Physics. Format: kit/course/notes.js
export default `
## Algebraic manipulation
S: Rearranging equations is the most-used skill in physics. Treat symbols as quantities with units, keep the equation balanced, and isolate the unknown before putting numbers in.
H: The rules
- Do the same operation to both sides; undo operations in reverse order (BIDMAS backwards).
- Index laws: a^{m}a^{n} = a^{m+n}, (a^{m})^{n} = a^{mn}, a^{-n} = 1/a^{n}, a^{1/n} = ⁿ√a.
- Expand and factorise: (a + b)^{2} = a^{2} + 2ab + b^{2}; a^{2} − b^{2} = (a − b)(a + b).
- Fractions: a/b + c/d = (ad + bc)/bd. Never cancel terms across a sum: (a + b)/a ≠ b.
H: Work symbolically first
P: Solving with symbols lets you check dimensions, spot limiting cases and reuse the result. Substitute numbers at the end.
X: Make v the subject of KE = ½mv^{2}, then find v for KE = 50 J, m = 4.0 kg.
> 2KE = mv^{2}, so v^{2} = 2KE/m
> v = √(2KE/m) = √(2 × 50/4.0) = 5.0 m s^{-1}
X: Make R_{2} the subject of 1/R = 1/R_{1} + 1/R_{2}.
> 1/R_{2} = 1/R − 1/R_{1} = (R_{1} − R)/(R R_{1})
> R_{2} = R R_{1}/(R_{1} − R)
!: √(a^{2} + b^{2}) is not a + b, and 1/(a + b) is not 1/a + 1/b.
Q: What is a^{m} × a^{n}? | a^{m+n}.
Q: Why solve symbolically before substituting numbers? | It allows dimension checks, limiting-case checks and reuse, and avoids rounding errors.
M1: Rearrange T = 2π√(l/g) for g. | g = 4π^{2}l/T^{2} | g = 2πl/T | g = 4π^{2}T^{2}/l | g = l/(2πT)^{2} | Square both sides: T^{2} = 4π^{2}l/g, so g = 4π^{2}l/T^{2}.
M2: Simplify (x^{2}y^{-1})^{3} × y^{4}. | x^{6}y | x^{5}y^{3} | x^{6}y^{7} | x^{6}y^{-1} | (x^{2}y^{-1})^{3} = x^{6}y^{-3}; times y^{4} gives x^{6}y.

## Equations and inequalities
S: An equation states that two expressions are equal; an inequality states that one is bigger. Physics uses both: equations for laws, inequalities for limits, conditions and bounds such as Δx Δp ≥ ħ/2.
H: Solving equations
- Linear: one solution. Quadratic ax^{2} + bx + c = 0 has x = (−b ± √(b^{2} − 4ac))/2a.
- The discriminant b^{2} − 4ac tells you: > 0 two real roots, = 0 one, < 0 two complex roots.
- Physically, check each root: a negative time or a speed above c is usually rejected.
H: Inequalities
- Multiply or divide by a negative number and the inequality reverses.
- Squaring is only safe when both sides are non-negative.
- Physics bounds: v ≤ c, efficiency η ≤ 1 − T_{c}/T_{h}, ΔS_{universe} ≥ 0.
X: A ball is thrown up at 20 m s^{-1}. When is it 15 m above the launch point? (g = 10 m s^{-2})
> 15 = 20t − 5t^{2}, so 5t^{2} − 20t + 15 = 0, t^{2} − 4t + 3 = 0
> (t − 1)(t − 3) = 0: t = 1 s (going up) and t = 3 s (coming down). Both are physical.
!: Don't divide both sides by an expression that could be zero; you can lose solutions (x^{2} = x gives x = 0 as well as x = 1).
Q: What does a negative discriminant mean? | The quadratic has no real roots (two complex conjugate roots).
Q: What happens to an inequality when you multiply both sides by −1? | It reverses direction.
M1: Solve 3 − 2x > 7. | x < −2 | x > −2 | x < 2 | x > 2 | −2x > 4; dividing by −2 reverses: x < −2.
M2: For which k does x^{2} + kx + 9 = 0 have exactly one root? | k = ±6 | k = ±3 | k = 9 | k = 0 | Discriminant k^{2} − 36 = 0.

## Simultaneous equations
S: When several unknowns are linked by several equations, solve them together. Physics produces simultaneous equations from Kirchhoff's laws, collisions (momentum and energy), and equilibrium in two directions.
H: Methods
- **Substitution**: make one variable the subject and substitute into the other.
- **Elimination**: add or subtract multiples of equations to remove a variable.
- **Matrices**: write Ax = b and solve x = A^{-1}b (for large systems, use Gaussian elimination).
- You need as many independent equations as unknowns. Dependent equations (one a multiple of another) give infinitely many solutions; inconsistent ones give none.
X: A 1.0 kg ball at 6.0 m s^{-1} collides elastically head-on with a stationary 2.0 kg ball. Find both final velocities.
> Momentum: 6 = v_{1} + 2v_{2}. Elastic (relative speed reverses): v_{2} − v_{1} = 6
> Adding: 3v_{2} = 12, v_{2} = 4.0 m s^{-1}; then v_{1} = −2.0 m s^{-1} (it bounces back)
H: Geometric view
P: Two linear equations in x and y are two lines. One intersection = unique solution; parallel = none; identical = infinite. In three unknowns each equation is a plane.
!: Check that equations are independent: three Kirchhoff loop equations in a two-loop circuit include one that's redundant.
Q: How many independent equations do you need for n unknowns? | n.
Q: What does it mean geometrically when two linear equations have no solution? | Their lines are parallel.
M1: Solve x + y = 10, x − y = 4. | x = 7, y = 3 | x = 6, y = 4 | x = 3, y = 7 | x = 5, y = 5 | Add: 2x = 14.
M2: Currents satisfy I_{1} = I_{2} + I_{3}, 11 = 4I_{1} + 2I_{2} and 2I_{2} = 6I_{3}. What is I_{1}? | 2.0 A | 1.5 A | 0.5 A | 2.75 A | From the third, I_{2} = 3I_{3}, so I_{1} = 4I_{3}. Then 11 = 16I_{3} + 6I_{3}, so I_{3} = 0.5 A and I_{1} = 2.0 A.

## Trigonometry and circular functions
S: Sine, cosine and tangent relate angles to ratios of sides, and as functions of a continuous angle they describe every oscillation and wave. Physics almost always measures angles in radians.
H: Definitions
E: sin θ = opp/hyp, cos θ = adj/hyp, tan θ = sin θ/cos θ
E: θ (rad) = arc length/radius; 2π rad = 360°
E: sin^{2}θ + cos^{2}θ = 1
E: sin(A ± B) = sin A cos B ± cos A sin B; cos(A ± B) = cos A cos B ∓ sin A sin B
E: sin 2A = 2 sin A cos A; cos 2A = cos^{2}A − sin^{2}A = 1 − 2 sin^{2}A
H: Circular functions
P: A point moving round a unit circle at angular speed ω has x = cos ωt, y = sin ωt. That's why simple harmonic motion, AC voltages and waves are sinusoidal: they are projections of uniform circular motion.
- Period 2π/ω; frequency f = ω/2π.
- Adding two sinusoids of the same frequency gives another: a sin ωt + b cos ωt = R sin(ωt + φ), R = √(a^{2} + b^{2}), tan φ = b/a.
H: Small angles
E: sin θ ≈ tan θ ≈ θ, cos θ ≈ 1 − θ^{2}/2 :: θ in radians, θ ≪ 1
X: Find the maximum of 3 sin ωt + 4 cos ωt.
> R = √(3^{2} + 4^{2}) = 5, so 3 sin ωt + 4 cos ωt = 5 sin(ωt + φ)
> Maximum value 5
!: Calculators default to degrees on many devices; calculus results like d(sin x)/dx = cos x only hold in radians.
Q: Why are oscillations sinusoidal? | They are projections of uniform circular motion, and they solve ẍ = −ω^{2}x.
Q: Express a sin ωt + b cos ωt as one sinusoid. | R sin(ωt + φ) with R = √(a^{2} + b^{2}) and tan φ = b/a.
M1: How many radians is 45°? | π/4 | π/2 | π/8 | 1/4 | 45° = 180°/4 = π/4.
M2: What is cos^{2}θ in terms of cos 2θ? | (1 + cos 2θ)/2 | (1 − cos 2θ)/2 | 2 cos 2θ | cos 2θ − 1 | From cos 2θ = 2cos^{2}θ − 1. The average of cos^{2} over a cycle is therefore 1/2, the origin of V_{rms} = V_{0}/√2.

## Exponential and logarithmic functions
S: Exponentials describe anything whose rate of change is proportional to its size: radioactive decay, capacitor discharge, population growth, absorption. Logarithms are their inverse and turn multiplication into addition.
H: The exponential
E: d(e^{kx})/dx = k e^{kx} :: the defining property
E: N = N_{0} e^{−λt}; t_{1/2} = ln 2/λ :: decay and half-life
E: Q = Q_{0} e^{−t/RC} :: capacitor discharge, time constant τ = RC
- After one time constant τ the quantity falls to 1/e ≈ 37%; after 5τ to under 1%.
H: Logarithms
E: log(ab) = log a + log b; log(a^{n}) = n log a; ln e = 1
E: y = A e^{kx} ⇒ ln y = ln A + kx :: a straight line on a ln-y plot
E: y = A x^{n} ⇒ log y = log A + n log x :: a straight line on a log-log plot
P: Logarithmic scales compress huge ranges: decibels (10 log_{10}(I/I_{0})), pH, the magnitude scale for stars and earthquakes.
X: A source's activity falls from 800 Bq to 100 Bq in 30 days. Find the half-life.
> 800 → 400 → 200 → 100: three halvings
> t_{1/2} = 30/3 = 10 days
!: ln is log base e; log on many calculators is base 10. ln x = 2.303 log_{10} x.
Q: How do you test whether data follow y = Ae^{kx}? | Plot ln y against x; a straight line means yes, with gradient k and intercept ln A.
Q: What fraction remains after one time constant? | 1/e ≈ 0.37.
M1: What is the half-life if λ = 0.0693 s^{-1}? | 10 s | 0.0693 s | 6.93 s | 100 s | t_{1/2} = ln 2/λ = 0.693/0.0693 = 10 s.
M2: Sound intensity rises by a factor of 1000. By how many decibels does the level change? | 30 dB | 3 dB | 1000 dB | 300 dB | 10 log_{10}(1000) = 30 dB.
M3: On a log-log plot, data give a straight line of gradient −2. What is the relationship? | y ∝ x^{-2} | y ∝ e^{-2x} | y ∝ −2x | y ∝ ln x | log y = log A + n log x with n = −2: an inverse-square law.

## Complex numbers
S: A complex number z = x + iy, with i^{2} = −1, is a point in a plane. Through Euler's formula complex exponentials represent oscillations neatly, which is why they run through AC circuits, waves, optics and quantum mechanics.
H: Forms
E: z = x + iy = r(cos θ + i sin θ) = re^{iθ}
E: r = |z| = √(x^{2} + y^{2}); θ = arg z, tan θ = y/x
E: e^{iθ} = cos θ + i sin θ :: Euler's formula
E: z* = x − iy; |z|^{2} = zz*
- Multiplying multiplies moduli and adds arguments: r_{1}e^{iθ1} × r_{2}e^{iθ2} = r_{1}r_{2}e^{i(θ1+θ2)}.
- De Moivre: (cos θ + i sin θ)^{n} = cos nθ + i sin nθ.
H: Why physics uses them
P: Write an oscillation as the real part of A e^{iωt}. Then d/dt becomes multiplication by iω, and differential equations become algebra. In AC circuits impedances are Z_{R} = R, Z_{L} = iωL, Z_{C} = 1/(iωC). In quantum mechanics the wavefunction is genuinely complex, and only |ψ|^{2} is observable.
X: Find |Z| and the phase for R = 30 Ω in series with an inductor of reactance 40 Ω.
> Z = 30 + 40i Ω
> |Z| = 50 Ω; phase φ = arctan(40/30) = 53°, voltage leading current
!: When you use complex notation for real signals, take the real part only at the end, and never multiply two complex representations to get a physical product (like power) without care.
Q: State Euler's formula. | e^{iθ} = cos θ + i sin θ.
Q: What does multiplying two complex numbers do to their moduli and arguments? | Multiplies the moduli and adds the arguments.
M1: What is |3 − 4i|? | 5 | 7 | 1 | 25 | √(9 + 16) = 5.
M2: What is e^{iπ}? | −1 | 1 | i | 0 | cos π + i sin π = −1.
M3: What is the impedance of a capacitor in complex form? | 1/(iωC) = −i/(ωC) | iωC | iω/C | −iωC | The capacitor current leads the voltage by 90°, giving a factor −i.

## Vectors and vector decomposition
S: Vectors are added, scaled and multiplied using components. Resolving a vector into perpendicular components turns 2D and 3D problems into independent 1D ones.
H: Components
E: A = A_{x}i + A_{y}j + A_{z}k; |A| = √(A_{x}^{2} + A_{y}^{2} + A_{z}^{2})
E: A_{x} = A cos θ, A_{y} = A sin θ :: θ measured from the x-axis
H: Products
E: A·B = AB cos θ = A_{x}B_{x} + A_{y}B_{y} + A_{z}B_{z} :: scalar (dot) product
E: |A × B| = AB sin θ, direction by the right-hand rule :: vector (cross) product
- Dot product: work W = F·s, power P = F·v, flux Φ = B·A. Zero when perpendicular.
- Cross product: torque τ = r × F, angular momentum L = r × p, force F = qv × B. Zero when parallel.
- The component of A along unit vector n̂ is A·n̂.
X: A 50 N force acts at 30° above the horizontal on a crate moving 4.0 m horizontally. Find the work done.
> Horizontal component = 50 cos 30° = 43.3 N
> W = 43.3 × 4.0 = 173 J ≈ 170 J (the vertical component does no work)
H: Choosing axes
P: Choose axes to make components simple: along and perpendicular to a slope, along the motion, or along a symmetry axis. The physics doesn't depend on the choice, only the algebra does.
!: The cross product is anticommutative: A × B = −B × A. Order matters for torque and the magnetic force.
Q: When is the dot product of two non-zero vectors zero? | When they are perpendicular.
Q: Give three physical quantities defined by cross products. | Torque r × F, angular momentum r × p, magnetic force qv × B.
M1: What is (2, 3, 0)·(4, −1, 5)? | 5 | 8 | 13 | 3 | 8 − 3 + 0 = 5.
M2: What is i × j? | k | −k | 0 | 1 | Right-handed axes: i × j = k.
M2: A block sits on a 30° slope. What fraction of its weight acts down the slope? | sin 30° = 0.5 | cos 30° = 0.87 | tan 30° = 0.58 | 1 | The component along the slope is mg sin θ.

## Matrices and linear algebra
S: A matrix is a rectangular array that represents a linear map: rotation, scaling, a system of equations, a set of coupled oscillators, a quantum operator. Linear algebra is the language of systems with many coupled parts.
H: Operations
- Multiply rows into columns: (AB)_{ij} = Σ_{k} A_{ik}B_{kj}. In general AB ≠ BA.
- Identity I: AI = IA = A. Inverse: AA^{-1} = I, exists only if det A ≠ 0.
- Transpose (A^{T})_{ij} = A_{ji}; Hermitian conjugate A† = (A*)^{T}.
E: det [[a, b], [c, d]] = ad − bc; A^{-1} = (1/det A) [[d, −b], [−c, a]]
H: Meaning
- det A is the factor by which A scales areas or volumes; det = 0 means some direction is squashed flat and information is lost.
- A rotation matrix R(θ) = [[cos θ, −sin θ], [sin θ, cos θ]] has det 1 and R^{T} = R^{-1}.
- Solving Ax = b: unique solution iff det A ≠ 0.
X: Solve 2x + y = 5, x + 3y = 10 using a matrix inverse.
> A = [[2, 1], [1, 3]], det = 5, A^{-1} = (1/5)[[3, −1], [−1, 2]]
> x = (1/5)(3 × 5 − 10) = 1; y = (1/5)(−5 + 20) = 3
P: In quantum mechanics observables are Hermitian matrices (A = A†), which guarantees real measurement results. The non-commuting of matrices is the mathematical root of the uncertainty principle.
!: Matrix multiplication isn't commutative: rotating about x then y differs from y then x.
Q: When does a square matrix have no inverse? | When its determinant is zero.
Q: What does the determinant of a 2×2 matrix tell you geometrically? | The factor by which it scales areas (and whether it flips orientation, if negative).
M1: What is det [[3, 2], [1, 4]]? | 10 | 14 | 11 | 5 | 3 × 4 − 2 × 1 = 10.
M2: Which property must a quantum observable's matrix have? | It is Hermitian | It is diagonal | It has determinant 1 | It is symmetric and real | Hermitian matrices have real eigenvalues, the possible measurement results.

## Coordinate systems
S: A coordinate system assigns numbers to points in space. Choosing coordinates that match a problem's symmetry can turn a hard problem into an easy one.
H: Frames and coordinates
- A **reference frame** is a physical viewpoint (a lab, a moving train); **coordinates** are a labelling of points within it.
- A coordinate system needs an origin, axes (directions) and a scale.
- Right-handed systems: x × y = z. Physics conventions assume them.
- Inertial frames move at constant velocity relative to each other; Newton's laws hold in them.
H: Transformations
E: x' = x − vt, t' = t :: Galilean transformation between frames
E: x' = x cos θ + y sin θ, y' = −x sin θ + y cos θ :: rotating axes by θ
P: Physical laws must take the same form in all equivalent frames (covariance). Lengths, dot products and the laws themselves are invariant under rotation; components are not.
X: A ball is thrown at 10 m s^{-1} forwards on a train moving at 30 m s^{-1}. Find its speed relative to the ground.
> Galilean: u = u' + v = 10 + 30 = 40 m s^{-1}
> (Valid for v ≪ c; relativity changes the rule near c.)
!: The answer to a physics question can't depend on your choice of coordinates. If it does, there's an error.
Q: What is the difference between a frame of reference and a coordinate system? | A frame is a physical state of motion of the observer; coordinates are a way of labelling points within it.
Q: What is a right-handed coordinate system? | One where x × y = z (curl the fingers of the right hand from x to y; the thumb points along z).
M1: Which quantity is invariant under rotation of the axes? | The length of a vector | Its x-component | Its angle to the x-axis | Its y-component | Rotation changes components but not magnitudes.
M2: Choosing axes along and perpendicular to a slope is useful because: | The acceleration lies along one axis | It makes gravity vanish | It is the only correct choice | It makes the normal force zero | The motion is along the slope, so one equation describes it.

## Cartesian, polar, cylindrical and spherical coordinates
S: Cartesian coordinates suit boxes and straight-line motion; polar, cylindrical and spherical coordinates suit circles, wires and spheres. Know the conversions and the area and volume elements.
H: The systems
E: Polar (2D): x = r cos θ, y = r sin θ; dA = r dr dθ
E: Cylindrical: x = s cos φ, y = s sin φ, z = z; dV = s ds dφ dz
E: Spherical: x = r sin θ cos φ, y = r sin θ sin φ, z = r cos θ; dV = r^{2} sin θ dr dθ dφ
- θ (polar angle) from the +z axis, 0 to π; φ (azimuth) from +x, 0 to 2π. (Physics convention.)
- Unit vectors r̂, θ̂, φ̂ change direction from point to point; Cartesian ones don't.
H: Matching symmetry
- Point charge, planet, atom: spherical.
- Long wire, pipe, solenoid: cylindrical.
- Circular motion in a plane: polar, where v = r θ̇ θ̂ for constant r and a = −rθ̇^{2}r̂ + rθ̈θ̂.
X: Find the volume of a sphere by integration.
> V = ∫_{0}^{R} ∫_{0}^{π} ∫_{0}^{2π} r^{2} sin θ dφ dθ dr
> = (R^{3}/3) × 2 × 2π = (4/3)πR^{3}
!: The factor r^{2} sin θ in the spherical volume element is easy to forget, and without it integrals are wrong (and dimensionally inconsistent).
Q: What is the volume element in spherical coordinates? | dV = r^{2} sin θ dr dθ dφ.
Q: Which coordinates suit the field of a long straight wire? | Cylindrical.
M1: Convert the point (r, θ) = (2, π/3) to Cartesian. | (1, √3) | (√3, 1) | (2, 1) | (1, 2) | x = 2 cos 60° = 1; y = 2 sin 60° = √3.
M2: What is the area element in plane polar coordinates? | r dr dθ | dr dθ | r^{2} dr dθ | dr dθ/r | A small patch is dr wide and r dθ long.

## Differentiation
S: The derivative is the instantaneous rate of change: the gradient of a graph at a point. Velocity is the derivative of position, acceleration of velocity, current of charge, force of momentum.
H: Definition and rules
E: dy/dx = lim_{δx→0} [y(x + δx) − y(x)]/δx
E: d(x^{n})/dx = nx^{n−1}; d(e^{kx})/dx = ke^{kx}; d(ln x)/dx = 1/x
E: d(sin kx)/dx = k cos kx; d(cos kx)/dx = −k sin kx
E: (uv)' = u'v + uv'; (u/v)' = (u'v − uv')/v^{2}; dy/dx = (dy/du)(du/dx)
H: Using derivatives
- Stationary points: dy/dx = 0; second derivative < 0 for a maximum, > 0 for a minimum.
- Linear approximation: δy ≈ (dy/dx) δx, the basis of uncertainty propagation.
- Physics: v = dx/dt, a = dv/dt = d^{2}x/dt^{2}, F = dp/dt, I = dQ/dt, P = dW/dt, F = −dU/dx.
X: x = 5t^{2} − 2t^{3} (m, s). Find the velocity and acceleration at t = 1 s.
> v = 10t − 6t^{2} = 4 m s^{-1}
> a = 10 − 12t = −2 m s^{-2}
!: The derivative of a constant is zero, and the gradient of a graph has units (y units per x units), not just a number.
Q: How is force related to potential energy in 1D? | F = −dU/dx.
Q: What is the chain rule? | dy/dx = (dy/du)(du/dx).
M1: Differentiate y = 3 sin(2x). | 6 cos(2x) | 3 cos(2x) | −6 cos(2x) | 6 sin(2x) | Chain rule: 3 × 2 cos(2x).
M2: U(x) = kx^{2}/2. What is the force? | −kx | kx | −kx^{2} | kx^{3}/6 | F = −dU/dx = −kx (Hooke's law).
M2: Find the maximum height of h = 20t − 5t^{2}. | 20 m | 40 m | 10 m | 25 m | dh/dt = 20 − 10t = 0 at t = 2; h = 40 − 20 = 20 m.

## Integration
S: Integration adds up infinitely many small pieces and reverses differentiation. It gives the area under a graph: displacement from velocity, work from force, charge from current, impulse from force.
H: Rules
E: ∫x^{n} dx = x^{n+1}/(n + 1) + C (n ≠ −1); ∫(1/x) dx = ln|x| + C
E: ∫e^{kx} dx = e^{kx}/k + C; ∫sin kx dx = −cos(kx)/k + C
E: ∫_{a}^{b} f(x) dx = F(b) − F(a) :: fundamental theorem of calculus
- Substitution reverses the chain rule; integration by parts reverses the product rule: ∫u v' dx = uv − ∫u' v dx.
H: Physics as integrals
- Displacement s = ∫v dt; work W = ∫F dx; impulse J = ∫F dt; charge Q = ∫I dt.
- Mass from density: M = ∫ρ dV; centre of mass x̄ = (1/M)∫xρ dV; moment of inertia I = ∫r^{2} dm.
- Average value: f̄ = (1/(b − a))∫_{a}^{b} f dx.
X: Find the work done stretching a spring (F = kx) from 0 to x.
> W = ∫_{0}^{x} kx' dx' = ½kx^{2}
> This is the area of the triangle under the F–x graph.
!: Definite integrals need consistent limits after substitution, and areas below the axis count as negative.
Q: What is the physical meaning of the area under a velocity–time graph? | The displacement.
Q: What is integration by parts? | ∫u v' dx = uv − ∫u' v dx.
M1: ∫_{0}^{2} 3x^{2} dx = ? | 8 | 12 | 6 | 4 | [x^{3}]_{0}^{2} = 8.
M2: The force on an object is F = 6t N for 0 ≤ t ≤ 3 s. What impulse does it receive? | 27 N s | 18 N s | 54 N s | 9 N s | ∫_{0}^{3} 6t dt = 3t^{2} from 0 to 3 = 27 N s.
M3: What is the mean value of sin^{2}(ωt) over a full cycle? | 1/2 | 0 | 1 | 1/√2 | sin^{2} = (1 − cos 2ωt)/2, and the cosine averages to zero.

## Partial derivatives
S: When a quantity depends on several variables, a partial derivative measures how it changes with one while the others are held fixed. Thermodynamics, fields and waves all depend on them.
H: Notation and rules
E: ∂f/∂x :: differentiate with respect to x treating y, z, t as constants
E: df = (∂f/∂x)dx + (∂f/∂y)dy :: the total differential
E: ∂^{2}f/∂x∂y = ∂^{2}f/∂y∂x :: mixed partials are equal for smooth functions
- In thermodynamics, write which variables are held fixed: (∂U/∂T)_{V} = C_{V}, and (∂H/∂T)_{P} = C_{P}.
- Equality of mixed partials gives the Maxwell relations, such as (∂S/∂V)_{T} = (∂P/∂T)_{V}.
H: Uses
- Uncertainty propagation: Δf ≈ √[(∂f/∂x Δx)^{2} + (∂f/∂y Δy)^{2}].
- Field gradients: E = −∇V, with components −∂V/∂x, etc.
- Waves: ∂^{2}y/∂t^{2} = v^{2}∂^{2}y/∂x^{2}.
X: For an ideal gas P = nRT/V, find ∂P/∂T and ∂P/∂V.
> ∂P/∂T (V fixed) = nR/V
> ∂P/∂V (T fixed) = −nRT/V^{2} = −P/V
!: In thermodynamics "∂U/∂T" is ambiguous until you say what is held constant; (∂U/∂T)_{V} and (∂U/∂T)_{P} differ.
Q: What does ∂f/∂x mean? | The rate of change of f with x, with all other variables held constant.
Q: Write the total differential of f(x, y). | df = (∂f/∂x)dx + (∂f/∂y)dy.
M1: f = x^{2}y^{3}. What is ∂f/∂y? | 3x^{2}y^{2} | 2xy^{3} | 6xy^{2} | x^{2}y^{3} | Treat x as a constant.
M2: For f = e^{xy}, what is ∂^{2}f/∂x∂y? | (1 + xy)e^{xy} | xye^{xy} | e^{xy} | x^{2}e^{xy} | ∂f/∂y = xe^{xy}; then ∂/∂x gives e^{xy} + xye^{xy}.

## Ordinary differential equations
S: An ordinary differential equation (ODE) relates a function of one variable to its derivatives. Newton's second law is an ODE, and so are the equations for circuits, decay, cooling and oscillation.
H: Classifying ODEs
- **Order**: the highest derivative (first order: decay; second order: Newton's law).
- **Linear**: y and its derivatives appear only to the first power, not multiplied together. Linear ODEs obey superposition.
- **Homogeneous**: no term free of y (no driving force).
- **Constant coefficients**: solved by trying y = e^{λt}.
H: Key examples
E: dN/dt = −λN ⇒ N = N_{0}e^{−λt} :: decay, discharge, cooling
E: ẍ + ω^{2}x = 0 ⇒ x = A cos(ωt + φ) :: simple harmonic motion
E: ẍ + γẋ + ω_{0}^{2}x = 0 :: damped oscillator
E: L dI/dt + RI = V :: RL circuit
P: An nth-order ODE needs n constants, fixed by initial conditions. If an ODE has no analytic solution, solve it numerically (Euler, Runge–Kutta).
X: Solve dv/dt = g − kv with v(0) = 0 (falling with linear drag).
> Separate: dv/(g − kv) = dt ⇒ −(1/k) ln(g − kv) = t + C
> With v(0) = 0: v(t) = (g/k)(1 − e^{−kt}); terminal velocity g/k
!: A general solution of a second-order ODE has two arbitrary constants; quoting one solution with none is incomplete.
Q: What makes an ODE linear? | The unknown and its derivatives appear only to the first power and are not multiplied together.
Q: How many initial conditions does a second-order ODE need? | Two (e.g. initial position and velocity).
M1: What is the order of d^{2}x/dt^{2} + 3 dx/dt = 0? | Second | First | Third | Zero | The highest derivative is the second.
M2: Which trial solution suits ay'' + by' + cy = 0? | y = e^{λt} | y = t^{n} | y = ln t | y = constant | It turns the ODE into the characteristic equation aλ^{2} + bλ + c = 0.

## Partial differential equations
S: A partial differential equation (PDE) involves partial derivatives in several variables, such as space and time. The great field equations of physics are PDEs: the wave, heat, Laplace, Schrödinger and Maxwell equations.
H: The classic three
E: ∂^{2}u/∂t^{2} = c^{2}∇^{2}u :: wave equation (hyperbolic): disturbances travel at c
E: ∂u/∂t = D∇^{2}u :: diffusion or heat equation (parabolic): spreading and smoothing
E: ∇^{2}φ = 0 (Laplace) or ∇^{2}φ = −ρ/ε_{0} (Poisson) :: equilibrium and static fields (elliptic)
E: iħ ∂ψ/∂t = −(ħ^{2}/2m)∇^{2}ψ + Vψ :: Schrödinger equation
H: Solving PDEs
- **Separation of variables**: try u(x, t) = X(x)T(t); each factor satisfies an ODE.
- **Fourier methods**: expand in sine and cosine modes; each mode evolves independently.
- **Green's functions**: build the response to any source from the response to a point source.
- **Numerical**: finite differences, finite elements, spectral methods.
X: Separate the 1D wave equation.
> u = X(x)T(t) gives X''/X = T''/(c^{2}T) = −k^{2} (a constant)
> X = sin kx, T = cos ωt with ω = ck: standing-wave modes
!: A PDE alone has infinitely many solutions; boundary and initial conditions pick the physical one.
Q: Which PDE governs diffusion and heat flow? | ∂u/∂t = D∇^{2}u.
Q: What is separation of variables? | Assuming a product solution such as X(x)T(t) so the PDE splits into ODEs.
M1: Which is Laplace's equation? | ∇^{2}φ = 0 | ∂φ/∂t = ∇^{2}φ | ∂^{2}φ/∂t^{2} = ∇^{2}φ | ∇φ = 0 | It describes potentials in charge-free regions.
M2: Why does heat diffusion smooth out sharp features? | High-wavenumber modes decay fastest, as e^{−Dk^{2}t} | Heat travels at a fixed speed | The equation is second order in time | Energy is not conserved | Each Fourier mode decays with rate Dk^{2}.

## First- and second-order differential equations
S: Most of physics reduces to first- and second-order linear ODEs. Learn the standard methods and the standard solutions, because you'll recognise them everywhere.
H: First order
- **Separable**: dy/dx = f(x)g(y) ⇒ ∫dy/g(y) = ∫f(x) dx.
- **Linear**: dy/dx + P(x)y = Q(x). Multiply by the integrating factor e^{∫P dx}.
E: dy/dt + y/τ = Q ⇒ y = Qτ + (y_{0} − Qτ)e^{−t/τ} :: approach to equilibrium (charging a capacitor)
H: Second order, constant coefficients
E: ay'' + by' + cy = 0; try e^{λt}: aλ^{2} + bλ + c = 0
- Two real roots: y = Ae^{λ1t} + Be^{λ2t} (overdamped).
- Repeated root: y = (A + Bt)e^{λt} (critically damped).
- Complex roots λ = −γ/2 ± iω_{d}: y = e^{−γt/2}(A cos ω_{d}t + B sin ω_{d}t) (underdamped).
- Inhomogeneous (driven): general solution = complementary function + one particular integral.
X: Solve y'' + 4y = 0 with y(0) = 1, y'(0) = 0.
> λ^{2} + 4 = 0, λ = ±2i ⇒ y = A cos 2t + B sin 2t
> y(0) = 1 ⇒ A = 1; y'(0) = 2B = 0 ⇒ B = 0. So y = cos 2t
!: For a driven oscillator the transient (complementary function) dies away, leaving the steady state; don't forget it at early times.
Q: What is the integrating factor for dy/dx + P(x)y = Q(x)? | e^{∫P dx}.
Q: What does the general solution of a driven linear ODE consist of? | The complementary function (homogeneous solution) plus a particular integral.
M1: Solve dy/dt = −3y with y(0) = 2. | y = 2e^{−3t} | y = −3e^{2t} | y = 2 − 3t | y = 2e^{3t} | Separable: y = y_{0}e^{−3t}.
M2: The characteristic equation of y'' + 2y' + y = 0 has a repeated root. What's the solution? | y = (A + Bt)e^{−t} | y = Ae^{−t} | y = A cos t + B sin t | y = Ae^{t} + Be^{−t} | λ = −1 twice, so multiply the second solution by t. This is critical damping.

## Boundary and initial conditions
S: Differential equations have families of solutions; conditions on the boundaries of the region, or at the starting time, pick out the one that describes the actual system. Often they also quantise the allowed solutions.
H: Types
- **Initial conditions** (time): position and velocity at t = 0 for Newton's law.
- **Dirichlet** (value fixed on the boundary): a string clamped at both ends, a conductor held at fixed potential.
- **Neumann** (derivative fixed): an insulated boundary (zero heat flux), a free end of a string.
- **Periodic**: ψ(x + L) = ψ(x), used for rings and crystals.
- **Behaviour at infinity**: wavefunctions → 0, fields fall off.
H: Boundary conditions quantise
P: A string fixed at x = 0 and x = L only allows sin(nπx/L): wavelengths λ_{n} = 2L/n. A particle in a box has the same modes, so its energies are quantised: E_{n} = n^{2}h^{2}/(8mL^{2}). Quantisation in quantum mechanics is a boundary-condition effect.
X: A guitar string is 0.65 m long with wave speed 420 m s^{-1}. Find its first three frequencies.
> f_{n} = nv/(2L) = n × 420/1.3
> 323 Hz, 646 Hz, 969 Hz
!: An open pipe end is an antinode of displacement (a Neumann-type condition), not a node; get this wrong and the harmonics are wrong.
Q: What is a Dirichlet boundary condition? | One that fixes the value of the solution on the boundary.
Q: Why are energies in a box quantised? | Only standing waves that fit the boundary conditions (zero at the walls) are allowed.
M1: How many conditions fix the solution of ẍ = −ω^{2}x? | 2 | 1 | 3 | 0 | Second order: two constants.
M2: A pipe closed at one end has length L. Which wavelengths are allowed? | 4L/n for odd n | 2L/n for all n | L/n | 4L/n for all n | Node at the closed end, antinode at the open end: odd quarter-wavelengths fit.

## Taylor and Fourier series
S: A Taylor series approximates a smooth function near a point by a polynomial; a Fourier series represents a periodic function as a sum of sines and cosines. Between them they power most approximations in physics.
H: Taylor series
E: f(x) = f(a) + f'(a)(x − a) + f''(a)(x − a)^{2}/2! + …
E: e^{x} = 1 + x + x^{2}/2! + …; sin x = x − x^{3}/3! + …; cos x = 1 − x^{2}/2! + …
E: (1 + x)^{n} ≈ 1 + nx :: binomial approximation for |x| ≪ 1
- Any smooth potential near a minimum is ≈ U_{0} + ½U''(x_{0})(x − x_{0})^{2}: a harmonic oscillator, with ω = √(U''/m). That's why SHM is everywhere.
- Relativistic energy: γmc^{2} ≈ mc^{2} + ½mv^{2} + …
H: Fourier series
E: f(t) = a_{0}/2 + Σ [a_{n} cos(nωt) + b_{n} sin(nωt)]
E: a_{n} = (2/T)∫f(t) cos(nωt) dt; b_{n} = (2/T)∫f(t) sin(nωt) dt
- Odd functions have only sine terms; even functions only cosines.
- A square wave contains odd harmonics with amplitudes ∝ 1/n.
- At a jump, the series overshoots by ~9% (the Gibbs phenomenon).
X: Use a Taylor step to find how g changes at a small height h above the Earth's surface.
> g(h) = GM/(R + h)^{2} = g_{0}(1 + h/R)^{-2} ≈ g_{0}(1 − 2h/R)
> At h = 10 km: g falls by 2 × 10/6400 ≈ 0.3%
!: A truncated Taylor series is only good near the expansion point; check the size of the next term.
Q: Why are small oscillations about any equilibrium simple harmonic? | The Taylor expansion of the potential about a minimum is quadratic to leading order.
Q: Which harmonics does a symmetric square wave contain? | Odd harmonics only, with amplitude ∝ 1/n.
M1: What is the binomial approximation to (1 + x)^{-1/2} for small x? | 1 − x/2 | 1 + x/2 | 1 − 2x | 1 + 2x | (1 + x)^{n} ≈ 1 + nx with n = −1/2.
M2: An even periodic function's Fourier series contains: | Only cosine terms (and a constant) | Only sine terms | Only odd harmonics | No constant term | Cosines are even; sines are odd.

## Fourier transforms
S: The Fourier transform breaks a (not necessarily periodic) signal into a continuous spectrum of frequencies. It links time and frequency, or position and wavenumber, and explains diffraction, spectroscopy, signal processing and the uncertainty principle.
H: Definitions
E: F(ω) = ∫ f(t) e^{−iωt} dt; f(t) = (1/2π)∫F(ω) e^{iωt} dω
- A spike in time spreads over all frequencies; a pure tone is a spike in frequency.
- Gaussian ↔ Gaussian; rectangle ↔ sinc function sin(x)/x.
- Convolution in one domain becomes multiplication in the other.
- Parseval: total energy is the same in both domains.
H: The bandwidth theorem
E: Δt Δω ≳ 1 (and Δx Δk ≳ 1)
P: A short pulse needs a broad range of frequencies: a 10 fs laser pulse spans ~100 nm of wavelengths. In quantum mechanics p = ħk, so Δx Δk ≳ 1 becomes Δx Δp ≳ ħ: the uncertainty principle is a Fourier fact.
H: Applications
- Far-field (Fraunhofer) diffraction pattern = Fourier transform of the aperture.
- FFT spectrum analysers; JPEG and MP3 compression; MRI image reconstruction; X-ray crystallography.
X: A radar pulse lasts 1 μs. Estimate its bandwidth.
> Δf ≈ 1/Δt = 1 MHz
!: The FFT of sampled data is periodic and limited by the Nyquist frequency (half the sampling rate); undersampling aliases high frequencies into low ones.
Q: What is the Fourier transform of a Gaussian? | Another Gaussian (narrow in one domain means wide in the other).
Q: How is the uncertainty principle related to Fourier transforms? | A wave packet localised in x must contain a spread of wavenumbers, Δx Δk ≳ 1, and p = ħk.
M1: Convolution in the time domain corresponds to what in the frequency domain? | Multiplication | Addition | Differentiation | Convolution | The convolution theorem.
M2: A signal is sampled at 1 kHz. What is the highest frequency it can represent? | 500 Hz | 1 kHz | 2 kHz | 250 Hz | The Nyquist frequency is half the sampling rate.

## Laplace transforms
S: The Laplace transform turns linear ODEs with initial conditions into algebra. Engineers and physicists use it for circuits, control systems and any problem where a system is switched on at t = 0.
H: Definition and key transforms
E: F(s) = ∫_{0}^{∞} f(t) e^{−st} dt
E: 1 → 1/s; e^{at} → 1/(s − a); t^{n} → n!/s^{n+1}
E: sin ωt → ω/(s^{2} + ω^{2}); cos ωt → s/(s^{2} + ω^{2})
E: f'(t) → sF(s) − f(0); f''(t) → s^{2}F(s) − sf(0) − f'(0)
H: The method
- Transform the ODE (initial conditions enter automatically).
- Solve the algebraic equation for F(s).
- Split into partial fractions and invert using a table.
- The **transfer function** H(s) = output/input describes a linear system; its poles (where H → ∞) give stability: poles with negative real part decay.
X: Solve y' + 2y = 0, y(0) = 3.
> sY − 3 + 2Y = 0 ⇒ Y = 3/(s + 2)
> y = 3e^{−2t}
!: The Laplace transform only uses t ≥ 0; it's built for initial-value problems, unlike the Fourier transform, which covers all t.
Q: What is the Laplace transform of f'(t)? | sF(s) − f(0).
Q: What do the poles of a transfer function tell you? | The system's natural modes; poles in the left half-plane mean stable, decaying behaviour.
M1: What is the Laplace transform of e^{−3t}? | 1/(s + 3) | 1/(s − 3) | 3/s | s/(s + 3) | e^{at} → 1/(s − a) with a = −3.
M2: A system's transfer function has a pole at s = +2. The system is: | Unstable (a mode grows as e^{2t}) | Stable | Critically damped | Oscillatory but bounded | A pole with positive real part gives exponential growth.

## Multivariable calculus
S: Multivariable calculus extends derivatives and integrals to functions of several variables: fields in 3D space, thermodynamic states, probability distributions. It is the working mathematics of fields.
H: Derivatives
- Partial derivatives, total differentials and the chain rule: df/dt = (∂f/∂x)(dx/dt) + (∂f/∂y)(dy/dt).
- Stationary points: all partial derivatives zero; classify using the Hessian matrix of second derivatives.
- Directional derivative of f along unit vector n̂: n̂·∇f.
H: Multiple integrals
E: ∬ f dA, ∭ f dV :: integrate over areas and volumes
E: dA = dx dy = r dr dθ; dV = dx dy dz = r^{2} sin θ dr dθ dφ
- Change of variables multiplies by the Jacobian determinant |∂(x, y)/∂(u, v)|.
- Order of integration can be swapped for well-behaved functions (Fubini).
X: Find the mass of a disc of radius R with surface density σ = σ_{0}r/R.
> M = ∫_{0}^{2π}∫_{0}^{R} (σ_{0}r/R) r dr dθ
> = 2π(σ_{0}/R)(R^{3}/3) = (2/3)πσ_{0}R^{2}
H: The Gaussian integral
E: ∫_{−∞}^{∞} e^{−ax^{2}} dx = √(π/a)
P: Proved by squaring and switching to polar coordinates. It underlies the normal distribution, the Maxwell–Boltzmann distribution and path integrals.
!: When changing coordinates in a multiple integral, don't forget the Jacobian (the r in r dr dθ).
Q: What is the Jacobian used for? | Scaling area or volume elements when changing variables in a multiple integral.
Q: What is ∫_{−∞}^{∞} e^{−x^{2}} dx? | √π.
M1: What is ∫_{0}^{1}∫_{0}^{2} xy dx dy? | 1 | 2 | 0.5 | 4 | ∫x dx from 0 to 2 = 2; ∫y dy from 0 to 1 = 1/2; product 1.
M2: The directional derivative of f along unit vector n̂ is: | n̂·∇f | |∇f| | ∇·(fn̂) | n̂ × ∇f | It's the component of the gradient along n̂.

## Gradient, divergence and curl
S: The operator ∇ (del) builds three derivatives of fields: the gradient of a scalar field, and the divergence and curl of a vector field. Together they describe how fields vary, spread out and swirl, and they are the language of Maxwell's equations.
H: The three operations
E: ∇f = (∂f/∂x, ∂f/∂y, ∂f/∂z) :: gradient: points uphill, magnitude = steepest slope
E: ∇·F = ∂F_{x}/∂x + ∂F_{y}/∂y + ∂F_{z}/∂z :: divergence: net outflow per unit volume
E: ∇×F :: curl: circulation per unit area, axis by the right-hand rule
E: ∇^{2}f = ∇·∇f :: the Laplacian
H: In physics
- E = −∇V: the field points down the potential gradient.
- ∇·E = ρ/ε_{0} (charges are sources); ∇·B = 0 (no magnetic monopoles).
- ∇×E = −∂B/∂t (Faraday); ∇×B = μ_{0}J + μ_{0}ε_{0}∂E/∂t (Ampère–Maxwell).
- Conservative fields have zero curl: ∇×(∇f) = 0. Curls have no divergence: ∇·(∇×F) = 0.
X: Find the divergence and curl of F = (x, y, 0) and of G = (−y, x, 0).
> ∇·F = 1 + 1 = 2 (it spreads out); ∇×F = 0
> ∇·G = 0; ∇×G = (0, 0, 2) (it swirls about z)
!: Gradient acts on scalars and gives a vector; divergence acts on vectors and gives a scalar; curl acts on vectors and gives a vector. Mixing these up gives nonsense.
Q: What does the divergence of a vector field measure? | The net outflow (source strength) per unit volume at a point.
Q: What property does a conservative field have? | Zero curl; it can be written as the gradient of a potential.
M1: What is ∇(x^{2} + y^{2})? | (2x, 2y, 0) | 2x + 2y | (x, y, 0) | 0 | Take each partial derivative.
M2: Which Maxwell equation says there are no magnetic monopoles? | ∇·B = 0 | ∇·E = ρ/ε_{0} | ∇×E = −∂B/∂t | ∇×B = μ_{0}J | Zero divergence: field lines never start or end.

## Line, surface and volume integrals
S: Integrals along curves, over surfaces and through volumes add up field quantities: work along a path, flux through a surface, total charge in a region. They turn the differential laws of physics into integral laws.
H: The three integrals
E: ∫_{C} F·dl :: line integral: work done by F along C, or circulation if C is closed
E: ∬_{S} F·dA :: surface integral: flux of F through S (dA points along the normal)
E: ∭_{V} ρ dV :: volume integral: total of a density
- For a conservative field the line integral depends only on the end points: ∫F·dl = −ΔU, and ∮F·dl = 0.
- Closed surfaces take outward normals.
H: Strategy
- Parametrise the curve r(t) or surface r(u, v); then dl = r'(t) dt, dA = (∂r/∂u × ∂r/∂v) du dv.
- Use symmetry: on a Gaussian sphere around a point charge, E is radial and constant in size, so ∯E·dA = E × 4πr^{2}.
X: Find the flux of E from a point charge Q through a sphere of radius r.
> E = Q/(4πε_{0}r^{2}) radially; E·dA = E dA everywhere on the sphere
> Φ = E × 4πr^{2} = Q/ε_{0}, independent of r: Gauss's law
!: Flux depends on orientation: only the component of F normal to the surface counts.
Q: What does the line integral ∫F·dl represent for a force? | The work done by the force along the path.
Q: What is ∮F·dl for a conservative field? | Zero.
M1: A uniform field of 5 N C^{-1} passes at 60° to the normal through a 2 m^{2} flat surface. What is the flux? | 5 N m^{2} C^{-1} | 10 N m^{2} C^{-1} | 8.7 N m^{2} C^{-1} | 0 | Φ = EA cos 60° = 5 × 2 × 0.5.
M2: Why is the flux of a point charge's field through a closed sphere independent of radius? | E falls as 1/r^{2} while the area grows as r^{2} | The field is uniform | Flux is always zero | Charge density is constant | The two factors cancel, giving Q/ε_{0}.

## Vector calculus theorems
S: The divergence theorem and Stokes' theorem connect what happens inside a region to what happens on its boundary. They convert Maxwell's equations between differential and integral forms and underpin every conservation law.
H: The theorems
E: ∭_{V} (∇·F) dV = ∯_{S} F·dA :: Gauss's (divergence) theorem
E: ∬_{S} (∇×F)·dA = ∮_{C} F·dl :: Stokes' theorem
E: ∫_{a}^{b} ∇f·dl = f(b) − f(a) :: gradient theorem
P: All three are versions of the fundamental theorem of calculus: integrating a derivative over a region gives the function on its boundary.
H: Using them
- Gauss's law: ∇·E = ρ/ε_{0} integrates to ∯E·dA = Q_{enc}/ε_{0}.
- Ampère's law: ∇×B = μ_{0}J integrates to ∮B·dl = μ_{0}I_{enc}.
- Conservation: ∂ρ/∂t + ∇·J = 0 integrates to "the rate of change of charge inside = −current out".
X: Use Ampère's law to find B at distance r from a long straight wire carrying I.
> By symmetry B circles the wire with constant size on a circle of radius r
> ∮B·dl = B × 2πr = μ_{0}I, so B = μ_{0}I/(2πr)
!: Stokes' theorem works for any surface bounded by the curve; the result can't depend on which you choose (this is how Maxwell found the displacement current).
Q: State the divergence theorem. | The volume integral of ∇·F equals the outward flux of F through the closed bounding surface.
Q: State Stokes' theorem. | The flux of ∇×F through a surface equals the circulation of F round its boundary.
M1: Which theorem turns ∇·E = ρ/ε_{0} into Gauss's law in integral form? | The divergence theorem | Stokes' theorem | The gradient theorem | Green's second identity | Integrate over a volume and convert to a surface flux.
M2: A field has zero curl everywhere in a simply connected region. What follows? | It can be written as −∇V | Its divergence is zero | It is uniform | Its flux through any surface is zero | Stokes: zero circulation round every loop, so line integrals are path-independent.

## Linear algebra eigenvalues and eigenvectors
S: An eigenvector of a matrix keeps its direction when the matrix acts on it, only scaling by the eigenvalue. Eigenproblems give the normal modes of vibration, principal axes of rotation, and the allowed energies of quantum systems.
H: Finding them
E: Av = λv ⇒ det(A − λI) = 0 :: the characteristic equation
- Solve for λ, then substitute each λ back to find v.
- Sum of eigenvalues = trace; product = determinant.
- Hermitian (real symmetric) matrices have real eigenvalues and orthogonal eigenvectors: they can be diagonalised.
H: In physics
- **Normal modes**: coupled oscillators x'' = −Kx; eigenvectors of K are the modes, eigenvalues ω^{2}.
- **Quantum mechanics**: Ĥψ = Eψ; energy levels are eigenvalues of the Hamiltonian.
- **Rigid bodies**: eigenvectors of the inertia tensor are the principal axes.
- **Stability**: eigenvalues of a linearised system tell you whether a perturbation grows or decays.
X: Find the eigenvalues of [[2, 1], [1, 2]].
> det [[2 − λ, 1], [1, 2 − λ]] = (2 − λ)^{2} − 1 = 0
> λ = 1 (eigenvector (1, −1)) and λ = 3 (eigenvector (1, 1))
P: Two equal masses joined by springs have exactly this structure: the in-phase mode and the out-of-phase mode, with different frequencies.
!: An eigenvector is defined only up to a scale factor; (1, 1) and (5, 5) are the same eigenvector.
Q: What is the characteristic equation? | det(A − λI) = 0.
Q: Why must quantum energy levels be real? | The Hamiltonian is Hermitian, and Hermitian operators have real eigenvalues.
M1: The eigenvalues of [[4, 0], [0, 7]] are: | 4 and 7 | 0 and 11 | 28 | 4 and 0 | A diagonal matrix's eigenvalues are its diagonal entries.
M2: A 2×2 matrix has trace 5 and determinant 6. What are its eigenvalues? | 2 and 3 | 1 and 6 | 5 and 6 | −2 and −3 | λ_{1} + λ_{2} = 5, λ_{1}λ_{2} = 6.

## Tensor algebra
S: A tensor is a quantity whose components transform in a definite way when the coordinates change. Scalars are rank 0, vectors rank 1; rank-2 tensors such as stress, the inertia tensor and the metric relate one vector to another.
H: Index notation
- Write components with indices: a vector A_{i}, a rank-2 tensor T_{ij}.
- **Summation convention**: a repeated index is summed: A_{i}B_{i} = A·B.
- Kronecker delta δ_{ij} (1 if i = j, else 0); Levi-Civita symbol ε_{ijk} for cross products: (A × B)_{i} = ε_{ijk}A_{j}B_{k}.
H: Physical tensors
E: L_{i} = I_{ij}ω_{j} :: inertia tensor: L need not be parallel to ω
E: F_{i} = σ_{ij}n_{j} :: stress tensor: force per area on a surface with normal n
E: ds^{2} = g_{μν}dx^{μ}dx^{ν} :: the metric of spacetime (general relativity)
- Conductivity, permittivity and susceptibility are tensors in anisotropic crystals (birefringence).
H: Why tensors
P: A tensor equation true in one coordinate system is true in all. That makes tensors the right language for laws of physics, and the only language for general relativity.
X: Show that A_{i}B_{i} is a scalar.
> Under rotation A'_{i} = R_{ij}A_{j}; then A'_{i}B'_{i} = R_{ij}R_{ik}A_{j}B_{k}
> R is orthogonal, so R_{ij}R_{ik} = δ_{jk}, giving A_{j}B_{j}: unchanged
!: Not every array of numbers is a tensor; it has to transform correctly under coordinate changes.
Q: What does the summation convention mean? | Any index repeated in a term is summed over all its values.
Q: Why can angular momentum point in a different direction from angular velocity? | The inertia tensor I_{ij} relates them, and it isn't a multiple of the identity unless the body is symmetric enough.
M1: What is δ_{ii} in 3D? | 3 | 1 | 0 | 9 | Summed over i: 1 + 1 + 1.
M2: What is the rank of the stress tensor? | 2 | 1 | 0 | 3 | It relates two vectors: a surface normal and a force.

## Probability distributions
S: A probability distribution describes how likely each outcome is. Physics needs them for measurement errors, statistical mechanics, radioactive decay and quantum mechanics.
H: Basics
E: ⟨x⟩ = Σ x P(x) or ∫ x p(x) dx :: mean (expectation value)
E: σ^{2} = ⟨x^{2}⟩ − ⟨x⟩^{2} :: variance
- For a continuous variable, p(x) dx is the probability of lying between x and x + dx; ∫p dx = 1.
H: The key distributions
- **Binomial**: n trials with probability p each: mean np, variance np(1 − p).
- **Poisson**: counts of random independent events (decays, photons): P(k) = λ^{k}e^{−λ}/k!, mean = variance = λ, so σ = √λ.
- **Normal (Gaussian)**: p(x) = e^{−(x−μ)^{2}/2σ^{2}}/(σ√2π); 68% within ±1σ, 95% within ±2σ, 99.7% within ±3σ.
- **Exponential**: waiting times between Poisson events: p(t) = λe^{−λt}.
- **Boltzmann**: P(E) ∝ e^{−E/k_{B}T} for states in thermal equilibrium.
H: The central limit theorem
P: The sum of many independent random variables tends to a Gaussian whatever their individual distributions. That's why measurement errors are usually normal.
X: A detector records 400 counts in a minute. What is the uncertainty?
> Poisson: σ = √400 = 20 counts
> Rate = 400 ± 20 per minute (5%)
!: The Poisson σ = √N applies to raw counts, not to rates or to counts after background subtraction (propagate those properly).
Q: What is the standard deviation of a Poisson distribution with mean λ? | √λ.
Q: What fraction of a normal distribution lies within ±2σ of the mean? | About 95%.
M1: Which distribution describes the number of decays detected in a fixed time? | Poisson | Normal only | Uniform | Exponential | Independent random events in a fixed interval are Poisson-distributed.
M2: A measured count is 100. What is its fractional uncertainty? | 10% | 1% | 3% | 100% | √100/100 = 0.1.

## Statistics and error propagation
S: Statistics turns repeated measurements into a best estimate and an honest uncertainty, and error propagation carries those uncertainties through calculations into the final result.
H: From data to a result
E: x̄ = (1/n)Σx_{i}; s = √[Σ(x_{i} − x̄)^{2}/(n − 1)] :: sample mean and standard deviation
E: σ_{x̄} = s/√n :: standard error of the mean
E: x̄_{w} = Σ(x_{i}/σ_{i}^{2})/Σ(1/σ_{i}^{2}) :: weighted mean of results with different uncertainties
H: Propagation (independent errors)
E: z = x ± y: σ_{z}^{2} = σ_{x}^{2} + σ_{y}^{2}
E: z = xy or x/y: (σ_{z}/z)^{2} = (σ_{x}/x)^{2} + (σ_{y}/y)^{2}
E: z = x^{n}: σ_{z}/z = |n| σ_{x}/x
E: general: σ_{z}^{2} = Σ (∂z/∂x_{i})^{2} σ_{i}^{2}
X: g is found from T = 2π√(l/g) with l = 1.000 ± 0.002 m and T = 2.006 ± 0.004 s.
> g = 4π^{2}l/T^{2} = 9.81 m s^{-2}
> (σ_{g}/g)^{2} = (0.002/1.000)^{2} + (2 × 0.004/2.006)^{2} ⇒ σ_{g}/g = 0.45%
> g = 9.81 ± 0.04 m s^{-2}
H: Comparing results
P: Two values agree if their difference is within about 2 combined standard uncertainties. The χ^{2} statistic measures how well a model fits data: χ^{2} = Σ[(y_{i} − f(x_{i}))/σ_{i}]^{2}, and χ^{2}/ν ≈ 1 for a good fit.
!: Adding uncertainties linearly overestimates them when errors are independent; add in quadrature. But correlated errors need covariance terms.
Q: How do fractional uncertainties combine for a product of independent quantities? | In quadrature: (σ_{z}/z)^{2} = (σ_{x}/x)^{2} + (σ_{y}/y)^{2}.
Q: What is the fractional uncertainty in x^{3} if x has 2%? | 6%.
M1: Why use n − 1 in the sample standard deviation? | The mean was estimated from the same data, using up one degree of freedom | It's a rounding convention | To make s larger for safety | It only matters for n = 1 | Bessel's correction gives an unbiased variance estimate.
M2: A χ^{2} per degree of freedom of 15 means: | The model fits badly or the uncertainties are underestimated | An excellent fit | Uncertainties are overestimated | Not enough data | χ^{2}/ν ≫ 1 signals disagreement beyond the stated errors.

## Numerical methods
S: Most real problems have no closed-form solution. Numerical methods turn calculus into arithmetic a computer can do: integrating equations of motion, finding roots, evaluating integrals and solving PDEs.
H: Core methods
- **Root finding**: bisection (robust), Newton–Raphson x_{n+1} = x_{n} − f(x_{n})/f'(x_{n}) (fast, needs a good start).
- **Integration**: trapezium rule (error ∝ h^{2}), Simpson's rule (error ∝ h^{4}), Monte Carlo for many dimensions.
- **ODEs**: Euler y_{n+1} = y_{n} + h f(y_{n}) (first order, drifts); Runge–Kutta 4 (fourth order); Verlet/leapfrog (symplectic, conserves energy well in orbits).
- **PDEs**: finite differences (∂^{2}u/∂x^{2} ≈ [u_{i+1} − 2u_{i} + u_{i−1}]/h^{2}), finite elements, spectral methods.
H: Errors and stability
- **Truncation error** comes from the approximation (shrinks with smaller step h).
- **Round-off error** comes from finite precision (grows with more steps).
- **Stability**: explicit diffusion schemes need h_{t} ≤ h_{x}^{2}/(2D) (the CFL-type condition), or errors blow up.
X: Use Newton–Raphson to find √2 from f(x) = x^{2} − 2, starting at x_{0} = 1.
> x_{1} = 1 − (1 − 2)/2 = 1.5
> x_{2} = 1.5 − 0.25/3 = 1.4167; x_{3} = 1.41422 (the digits double each step)
!: A simulation that conserves energy badly (Euler for an orbit spirals outwards) can look plausible but be wrong. Always check conserved quantities.
Q: Why is the Euler method poor for orbits? | It doesn't conserve energy, so orbits spiral outward over time.
Q: How does the error of Simpson's rule scale with step size h? | As h^{4}.
M1: Which method is symplectic and good for long orbital simulations? | Velocity Verlet (leapfrog) | Forward Euler | Bisection | Trapezium rule | Symplectic integrators keep energy errors bounded.
M2: Halving h in the trapezium rule reduces the error by about: | 4 times | 2 times | 16 times | Not at all | Error ∝ h^{2}.

## Optimisation
S: Optimisation finds the maximum or minimum of a function, often under constraints. Nature itself optimises (least action, minimum energy, maximum entropy), and physicists optimise designs, fits and experiments.
H: Unconstrained
- Set the gradient to zero; check second derivatives (the Hessian) for the type of stationary point.
- Numerically: gradient descent x → x − η∇f; Newton's method; for many local minima, simulated annealing or genetic algorithms.
H: Constrained: Lagrange multipliers
E: ∇f = λ∇g at the optimum, with g(x) = 0
P: At the optimum the level curves of f and the constraint touch, so their gradients are parallel. In statistical mechanics maximising entropy with fixed total energy, using a multiplier, produces the Boltzmann distribution, and the multiplier turns out to be 1/k_{B}T.
X: Find the rectangle of perimeter 20 m with the largest area.
> Maximise A = xy with 2x + 2y = 20
> ∇A = (y, x) = λ(2, 2) ⇒ x = y = 5 m, A = 25 m^{2}
H: Nature's optima
- Fermat: light takes the path of least time, giving Snell's law.
- Equilibrium: minimum potential energy (stable) or free energy (thermal).
- Least action: the path that makes S = ∫L dt stationary (see Variational calculus).
!: A stationary point is not always a minimum; check the second derivative, and remember numerical methods can stop at a local minimum.
Q: What does a Lagrange multiplier do? | Finds extrema of a function subject to a constraint, using ∇f = λ∇g.
Q: Which principle gives Snell's law by optimisation? | Fermat's principle of least time.
M1: f(x) = x^{2} − 6x + 11 has its minimum at: | x = 3 | x = 6 | x = −3 | x = 11 | f' = 2x − 6 = 0.
M2: Gradient descent can fail to find the global minimum because: | It can get stuck in a local minimum | It always diverges | It needs the second derivative | It only works in one dimension | It follows the local slope downhill.

## Dimensional analysis
S: In mathematical physics, dimensional analysis is a tool for checking work and finding scaling laws. Every term in an equation must have the same dimensions, and the dimensionless groups of a problem fix how it scales.
H: As a checking tool
- After every derivation, check dimensions term by term.
- Arguments of exp, log and trig functions must be dimensionless: e^{−t/τ} needs τ in seconds.
- Derivatives carry dimensions: d/dx has dimension L^{-1}; ∫dx has L.
H: Scaling laws
- With natural scales you can non-dimensionalise equations: write x = Lx̃, t = Tt̃ so only dimensionless groups remain.
- Reynolds number Re = ρvL/μ (inertia vs viscosity); Froude number Fr = v/√(gL) (inertia vs gravity).
- Matching dimensionless groups makes a model and a prototype behave identically (wind tunnels, ship tanks).
X: G. I. Taylor estimated the energy of the first atomic bomb from photos of the fireball.
> The radius R depends on energy E, time t and air density ρ
> Dimensions force R = k(Et^{2}/ρ)^{1/5}
> From R(t) in published photographs he estimated E ≈ 10^{14} J (about 20 kilotons), then classified
!: Dimensionless constants (like 2π) are invisible to this method, and so are dimensionless functions of dimensionless groups.
Q: What do non-dimensionalised equations show? | Which dimensionless groups control the behaviour, and so how the system scales.
Q: What does the Reynolds number compare? | Inertial forces to viscous forces.
M1: What are the dimensions of d^{2}x/dt^{2}? | L T^{-2} | L T^{-1} | L^{2} T^{-2} | T^{-2} | Each d/dt contributes T^{-1}.
M2: A ship model at 1/25 scale must match the Froude number. How fast should it go relative to the ship? | 1/5 as fast | 1/25 as fast | The same speed | 5 times as fast | v ∝ √L, so √(1/25) = 1/5.

## Complex analysis
S: Complex analysis studies functions of a complex variable. Its powerful theorems evaluate hard real integrals, describe 2D fields and flows, and connect causality to the analytic structure of response functions.
H: Analytic functions
E: ∂u/∂x = ∂v/∂y, ∂u/∂y = −∂v/∂x :: Cauchy–Riemann equations for f = u + iv
- Analytic (differentiable) functions have real and imaginary parts that both satisfy Laplace's equation, so they describe 2D electrostatics and ideal fluid flow.
- Conformal maps (angle-preserving) transform hard geometries into easy ones.
H: Contour integration
E: ∮_{C} f(z) dz = 0 if f is analytic inside C :: Cauchy's theorem
E: ∮_{C} f(z) dz = 2πi Σ Res(f, z_{k}) :: residue theorem
- Residue at a simple pole z_{0}: lim (z − z_{0})f(z).
X: Evaluate ∫_{−∞}^{∞} dx/(1 + x^{2}).
> Close in the upper half-plane; the pole there is z = i
> Res = 1/(2i); integral = 2πi × 1/(2i) = π
H: Physics
P: A causal response function (no effect before cause) is analytic in the upper half of the complex frequency plane. This gives the Kramers–Kronig relations: the absorption of a material fixes its refractive index at all frequencies.
!: Contour integrals depend on which poles the contour encloses; choose and close contours carefully, and check that the arc's contribution vanishes.
Q: State the residue theorem. | A closed contour integral equals 2πi times the sum of residues of the poles inside it.
Q: What do the Kramers–Kronig relations connect? | The real (dispersive) and imaginary (absorptive) parts of a causal response function.
M1: What is the residue of 1/(z − 2) at z = 2? | 1 | 2 | 0 | 1/2 | lim (z − 2) × 1/(z − 2) = 1.
M2: Why do analytic functions solve 2D electrostatics problems? | Their real and imaginary parts satisfy Laplace's equation | They are always real | They have no poles | They are periodic | Cauchy–Riemann ⇒ ∇^{2}u = ∇^{2}v = 0.

## Group theory and mathematical symmetry
S: A group is the mathematics of symmetry: a set of transformations that can be combined and undone. Group theory classifies crystals, labels atomic and molecular states, and organises the particles and forces of the Standard Model.
H: Group axioms
- Closure: combining two elements gives another element.
- Associativity: (ab)c = a(bc).
- Identity: there's an e with ae = a.
- Inverses: each a has a^{-1} with aa^{-1} = e.
- Abelian groups commute (ab = ba); rotations in 3D do not.
H: Examples in physics
- Discrete: the symmetries of a square (D_{4}); the 230 space groups of crystals; parity, time reversal.
- Continuous (Lie groups): rotations SO(3); U(1) phase (electromagnetism); SU(2) (spin, weak isospin); SU(3) (quark colour).
- Lorentz and Poincaré groups: the symmetries of spacetime in special relativity.
H: Representations
P: A representation assigns matrices to group elements. States of a system come in multiplets that are representations: spin-1/2 is the 2D representation of SU(2); the eightfold way grouped hadrons in SU(3) representations and predicted the Ω^{−} before it was found. Degeneracies in spectra are fingerprints of symmetry.
X: Show the rotations of an equilateral triangle form a group.
> Elements: 0°, 120°, 240° rotations
> Closed (120° + 240° = 360° ≡ 0°), identity 0°, inverse of 120° is 240°: a group (C_{3}), and abelian
!: Combining group elements in a different order can give a different result: rotations by 90° about x then y differ from y then x.
Q: What is a Lie group? | A continuous group whose elements depend smoothly on parameters, like rotations.
Q: Which group describes quark colour? | SU(3).
M1: Which is NOT a group axiom? | Commutativity | Closure | Identity | Inverse | Only abelian groups commute.
M2: Why do energy levels show degeneracies? | States related by a symmetry of the Hamiltonian have the same energy | Measurement is imprecise | Electrons repel | All quantum systems are degenerate | Symmetry operations commute with H and map states to equal-energy states.

## Variational calculus
S: Variational calculus finds the function, rather than the number, that makes a quantity stationary. It gives the Euler–Lagrange equations and the principle of least action, from which all of classical and much of modern physics can be derived.
H: The Euler–Lagrange equation
E: S[y] = ∫ F(y, y', x) dx is stationary ⇒ ∂F/∂y − d/dx(∂F/∂y') = 0
- The shortest path between two points on a plane: a straight line.
- The brachistochrone (fastest slide under gravity): a cycloid.
- A hanging chain: a catenary, y = a cosh(x/a).
H: The principle of least action
E: S = ∫ L dt, L = T − V :: the action, with the Lagrangian
E: d/dt(∂L/∂q̇) − ∂L/∂q = 0 :: Lagrange's equations of motion
P: The path a system actually follows makes the action stationary. Lagrange's equations work in any coordinates, make constraints easy, and connect symmetries to conservation laws (Noether). Quantum mechanics generalises this with Feynman's sum over all paths, weighted by e^{iS/ħ}.
X: Derive the equation of motion for a mass on a spring.
> L = ½mẋ^{2} − ½kx^{2}
> ∂L/∂ẋ = mẋ, d/dt gives mẍ; ∂L/∂x = −kx
> mẍ + kx = 0: simple harmonic motion
!: "Least" action is really stationary action; for some paths it's a saddle point, not a minimum.
Q: What is the Lagrangian in classical mechanics? | L = T − V, kinetic minus potential energy.
Q: What curve solves the brachistochrone problem? | A cycloid.
M1: In Lagrangian mechanics, if L doesn't depend on a coordinate q, then: | ∂L/∂q̇ (its conjugate momentum) is conserved | q is constant | The energy is zero | The system is at rest | Lagrange's equation gives d/dt(∂L/∂q̇) = 0.
M2: Which physical principle is the optics analogue of least action? | Fermat's principle of least time | Huygens' principle | The superposition principle | Malus's law | Light rays make the optical path stationary.
`;
