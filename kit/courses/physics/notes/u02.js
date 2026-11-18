// Unit 2: Mathematics for Physics. Format: kit/course/notes.js
export default `
## Algebraic manipulation
S: Rearranging equations is the most-used skill in physics. Treat symbols as quantities with units, keep the equation balanced, and isolate the unknown before putting numbers in.
LV: Introductory · Foundation
O: Rearrange a physics equation to make any symbol the subject
O: Check a rearranged equation with units and limiting cases
PRE: Dimensional analysis
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
T: Subject of a formula | The single symbol isolated on one side of an equation
T: Limiting case | A special value (zero, very large) used to check that a formula behaves sensibly
SUM: Do the same operation to both sides, isolate the unknown symbolically, then substitute numbers.
SUM: Check the result's units and its behaviour in a limiting case before trusting it.
SRC: Riley K. F., Hobson M. P., Bence S. J., Mathematical Methods for Physics and Engineering, 3rd edition, chapter 1, Cambridge University Press | secondary | 2006
SRC: Boas M. L., Mathematical Methods in the Physical Sciences, 3rd edition, Wiley | secondary | 2006
EV: established | The rules of algebra are exact; the habits taught (symbols first, then numbers) are standard physics practice.
Q: Why rearrange symbolically before substituting numbers? | It keeps units visible, makes errors easier to spot, lets you check limiting cases and reuse the result.
M3@1,2: Make u the subject of 1/f = 1/u + 1/v. | u = fv/(v − f) | u = f − v | u = fv/(f − v) | u = (v − f)/fv | 1/u = 1/f − 1/v = (v − f)/(fv), so u = fv/(v − f).
SA2@1,2: Rearrange T = 2π√(l/g) to find g, and check your answer's units. | Square: T^{2} = 4π^{2} l/g, so g = 4π^{2} l/T^{2}. Units: m/s^{2} = m s^{-2}, which are the units of acceleration, as they should be. | square both sides ; g = 4π^{2}l/T^{2} ; units m s^{-2} checked

## Equations and inequalities
S: An equation states that two expressions are equal; an inequality states that one is bigger. Physics uses both: equations for laws, inequalities for limits, conditions and bounds such as Δx Δp ≥ ħ/2.
LV: Introductory · Foundation
O: Solve linear and quadratic equations and inequalities
O: Handle inequalities correctly when multiplying or dividing by a negative quantity
PRE: Algebraic manipulation
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
T: Inequality | A statement that one expression is greater (or less) than another
T: Discriminant | b^{2} − 4ac: its sign decides whether a quadratic has two, one or no real roots
SUM: Multiplying or dividing an inequality by a negative number reverses it.
SUM: A physical inequality (Δx Δp ≥ ħ/2, v < c) states a limit, not a value.
SRC: Riley K. F., Hobson M. P., Bence S. J., Mathematical Methods for Physics and Engineering, 3rd edition, chapter 1, Cambridge University Press | secondary | 2006
SRC: OpenStax, College Algebra 2e, chapter 2 "Equations and Inequalities" | secondary | 2021 | https://openstax.org/details/books/college-algebra-2e
EV: established | These are exact algebraic rules.
Q: When does a quadratic equation have no real roots? | When its discriminant b^{2} − 4ac is negative.
M3@1: A ball thrown up at 20 m s^{-1} has height h = 20t − 5t^{2} (g ≈ 10 m s^{-2}). For which times is h > 15 m? | 1 s < t < 3 s | t > 3 s | 0 < t < 1 s | t < 1 s or t > 3 s | 20t − 5t^{2} > 15 gives t^{2} − 4t + 3 < 0, so (t − 1)(t − 3) < 0, true between the roots.
SA2@1,2: Solve −3x + 6 > 0 and explain the step most often done wrongly. | Subtract 6: −3x > −6. Divide by −3 and reverse the inequality: x < 2. The common mistake is to divide by a negative number without reversing the sign. | subtract 6 ; divide by −3 ; reverse the inequality ; x < 2

## Simultaneous equations
S: When several unknowns are linked by several equations, solve them together. Physics produces simultaneous equations from Kirchhoff's laws, collisions (momentum and energy), and equilibrium in two directions.
LV: Introductory · Application
O: Solve simultaneous linear equations by substitution and elimination
O: Set up simultaneous equations from a physical situation such as a circuit or collision
PRE: Equations and inequalities
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
T: Elimination | Adding or subtracting multiples of equations to remove one unknown
T: Consistent system | A set of equations with at least one common solution
SUM: n independent equations are needed for n unknowns.
SUM: Physics supplies them: Kirchhoff's laws, momentum and energy, equilibrium in each direction.
SRC: Boas M. L., Mathematical Methods in the Physical Sciences, 3rd edition, chapter 3, Wiley | secondary | 2006
SRC: OpenStax, University Physics Volume 2, section 10.3 "Kirchhoff's Rules" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/10-3-kirchhoffs-rules
EV: established | Linear systems with independent equations have unique solutions; this is exact.
Q: How many independent equations are needed to find three unknowns? | Three.
M3@2: Two resistors in series total 30 Ω; in parallel they give 6.7 Ω (to 2 s.f.). What are they? | 10 Ω and 20 Ω | 15 Ω and 15 Ω | 5 Ω and 25 Ω | 12 Ω and 18 Ω | R_{1} + R_{2} = 30 and R_{1}R_{2}/30 = 6.67 give R_{1}R_{2} = 200, so R_{1} = 10 Ω and R_{2} = 20 Ω.
SA2@2: A 1.0 kg ball at 4.0 m s^{-1} collides elastically head-on with a stationary 1.0 kg ball. Write the two equations that apply and solve them. | Momentum: 4.0 = v_{1} + v_{2}. Kinetic energy: 16 = v_{1}^{2} + v_{2}^{2} (after cancelling ½ × 1.0). Substituting v_{1} = 4 − v_{2} gives v_{2}(v_{2} − 4) = 0, so v_{2} = 4.0 m s^{-1} and v_{1} = 0: the balls swap velocities. | momentum equation ; kinetic energy equation ; substitution ; v_{1} = 0 and v_{2} = 4.0 m s^{-1}

## Trigonometry and circular functions
S: Sine, cosine and tangent relate angles to ratios of sides, and as functions of a continuous angle they describe every oscillation and wave. Physics almost always measures angles in radians.
LV: Introductory · Foundation
O: Use sine, cosine and tangent, in radians, for triangles and oscillations
O: Apply the standard identities and small-angle approximations
PRE: Algebraic manipulation
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
T: Radian | The angle subtending an arc equal to the radius; 2π rad = 360°
T: Phase | The argument of a sinusoid, ωt + φ, which fixes where in its cycle it is
SUM: sin^{2} θ + cos^{2} θ = 1 and the compound-angle formulas cover most physics.
SUM: Calculus results such as d(sin x)/dx = cos x hold only when x is in radians.
SRC: OpenStax, Algebra and Trigonometry 2e, chapters 7–9 | secondary | 2021 | https://openstax.org/details/books/algebra-and-trigonometry-2e
SRC: NIST Digital Library of Mathematical Functions, chapter 4 "Elementary Functions" | data | 2024 | https://dlmf.nist.gov/4
EV: established | These identities are exact.
Q: Why must angles be in radians when you differentiate sin x? | The result d(sin x)/dx = cos x relies on sin x ≈ x for small x, which is true only in radians.
M3@1,2: What is sin 15° exactly? | (√6 − √2)/4 | 1/4 | (√3 − 1)/2 | √2/4 | sin(45° − 30°) = sin 45° cos 30° − cos 45° sin 30° = (√2/2)(√3/2) − (√2/2)(1/2) = (√6 − √2)/4.
SA2@1: A wave is y = 0.02 sin(4πt) m. Find its amplitude, angular frequency, frequency and period. | Amplitude 0.02 m; ω = 4π rad s^{-1}; f = ω/2π = 2 Hz; T = 1/f = 0.5 s. | amplitude 0.02 m ; ω = 4π rad s^{-1} ; f = 2 Hz ; T = 0.5 s

## Exponential and logarithmic functions
S: Exponentials describe anything whose rate of change is proportional to its size: radioactive decay, capacitor discharge, population growth, absorption. Logarithms are their inverse and turn multiplication into addition.
LV: Introductory · Foundation
O: Recognise exponential growth and decay from a rate proportional to size
O: Use logarithms to solve for exponents and to linearise data
PRE: Algebraic manipulation
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
T: Time constant | τ, the time for an exponential decay to fall to 1/e of its starting value
T: Half-life | The time for a decaying quantity to halve: t_{½} = τ ln 2
SUM: dN/dt = −λN gives N = N_{0}e^{−λt}; t_{½} = ln 2/λ.
SUM: Plot ln y against t: an exponential becomes a straight line of gradient −λ.
SRC: NIST Digital Library of Mathematical Functions, chapter 4 "Elementary Functions" | data | 2024 | https://dlmf.nist.gov/4
SRC: OpenStax, University Physics Volume 3, section 10.3 "Radioactive Decay" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/10-3-radioactive-decay
EV: established | The exponential solution is exact for a rate proportional to size; real decays follow it statistically.
Q: How do you test whether data follow y = Ae^{kt}? | Plot ln y against t: a straight line confirms it, with gradient k and intercept ln A.
SA2@1,2: A capacitor discharges with τ = RC = 2.0 s. How long until its voltage falls to 10% of the start? | V = V_{0}e^{−t/τ}. 0.10 = e^{−t/2.0}, so t = 2.0 ln 10 ≈ 4.6 s. | exponential decay equation ; take natural logs ; t = τ ln 10 ; about 4.6 s

## Complex numbers
S: A complex number z = x + iy, with i^{2} = −1, is a point in a plane. Through Euler's formula complex exponentials represent oscillations neatly, which is why they run through AC circuits, waves, optics and quantum mechanics.
LV: Intermediate · Foundation
O: Convert complex numbers between Cartesian and polar (exponential) form
O: Use Euler's formula to represent oscillations
PRE: Trigonometry and circular functions
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
T: Modulus | |z| = √(x^{2} + y^{2}), the distance of z from the origin of the complex plane
T: Argument | arg z, the angle of z measured from the positive real axis
T: Euler's formula | e^{iθ} = cos θ + i sin θ
SUM: Multiply complex numbers by multiplying moduli and adding arguments.
SUM: A real oscillation is the real part of Ae^{iωt}; derivatives become multiplication by iω.
SRC: Riley K. F., Hobson M. P., Bence S. J., Mathematical Methods for Physics and Engineering, 3rd edition, chapter 3, Cambridge University Press | secondary | 2006
SRC: Feynman R. P., Leighton R. B., Sands M., The Feynman Lectures on Physics, vol. I, chapter 22 "Algebra" | secondary | 1963 | https://www.feynmanlectures.caltech.edu/I_22.html
EV: established | Euler's formula and complex arithmetic are exact.
Q: What happens to the modulus and argument when two complex numbers are multiplied? | The moduli multiply and the arguments add.
SA2@1,2: Write z = 1 + i in exponential form and use it to find z^{8}. | |z| = √2 and arg z = π/4, so z = √2 e^{iπ/4}. Then z^{8} = (√2)^{8} e^{i2π} = 16. | modulus √2 ; argument π/4 ; z^{8} = 16 e^{2πi} ; equals 16

## Vectors and vector decomposition
S: Vectors are added, scaled and multiplied using components. Resolving a vector into perpendicular components turns 2D and 3D problems into independent 1D ones.
---
M3@2: A = (1, 2, 0) and B = (0, 1, 3). What is A × B? | (6, −3, 1) | (0, 2, 0) | (−6, 3, −1) | (1, 3, 3) | A × B = (2·3 − 0·1, 0·0 − 1·3, 1·1 − 2·0) = (6, −3, 1); check: it is perpendicular to both (dot products 0).
LV: Introductory · Foundation
O: Resolve vectors into components and recombine them
O: Calculate dot and cross products and interpret them physically
PRE: Scalar and vector quantities
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
T: Dot product | a·b = ab cos θ, a scalar measuring how much two vectors point the same way
T: Cross product | a × b, of magnitude ab sin θ, perpendicular to both (right-hand rule)
T: Unit vector | A vector of length 1 giving a direction, such as î, ĵ, k̂
SUM: Work is a dot product (W = F·s); torque and magnetic force are cross products.
SUM: a·b = 0 means perpendicular; a × b = 0 means parallel.
SRC: OpenStax, University Physics Volume 1, sections 2.2–2.4 | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/2-4-products-of-vectors
SRC: Boas M. L., Mathematical Methods in the Physical Sciences, 3rd edition, chapter 3, Wiley | secondary | 2006
EV: established | Vector algebra is exact.
Q: What does a zero dot product tell you about two non-zero vectors? | They are perpendicular.
SA2@2: A force F = (3î + 4ĵ) N moves an object through s = (2î − 1ĵ) m. Find the work done and the angle between F and s. | W = F·s = 3 × 2 + 4 × (−1) = 2 J. |F| = 5 N, |s| = √5 m, so cos θ = 2/(5√5) ≈ 0.179 and θ ≈ 80°. | dot product of components ; W = 2 J ; magnitudes 5 N and √5 m ; θ ≈ 80°

## Matrices and linear algebra
S: A matrix is a rectangular array that represents a linear map: rotation, scaling, a system of equations, a set of coupled oscillators, a quantum operator. Linear algebra is the language of systems with many coupled parts.
LV: Intermediate · Foundation
O: Multiply matrices and find determinants and inverses of 2 × 2 matrices
O: Write a system of linear equations as Ax = b and decide whether it has a unique solution
PRE: Simultaneous equations
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
T: Determinant | A number from a square matrix; zero means the matrix has no inverse
T: Linear map | A transformation that preserves addition and scaling, represented by a matrix
SUM: Ax = b has a unique solution exactly when det A ≠ 0.
SUM: Matrix multiplication is not commutative: AB ≠ BA in general.
SRC: Strang G., Introduction to Linear Algebra, 5th edition, Wellesley-Cambridge Press | secondary | 2016
SRC: Riley K. F., Hobson M. P., Bence S. J., Mathematical Methods for Physics and Engineering, 3rd edition, chapter 8, Cambridge University Press | secondary | 2006
EV: established | These results of linear algebra are exact.
Q: When does a square matrix have an inverse? | When its determinant is not zero.
M3@1: What is the inverse of [[2, 1], [5, 3]]? | [[3, −1], [−5, 2]] | [[2, −1], [−5, 3]] | [[3, 1], [5, 2]] | [[−3, 1], [5, −2]] | det = 6 − 5 = 1; swap the diagonal, negate the off-diagonal, divide by 1.
SA2@2: Explain what det A = 0 means geometrically for a 2 × 2 matrix, and what it implies for Ax = b. | The matrix squashes the plane onto a line (or a point): area is scaled by |det A| = 0. Different x can map to the same point, so A can't be inverted; Ax = b has either no solution or infinitely many. | area scaled by det A ; zero squashes the plane to a line ; not invertible ; no solution or infinitely many

## Coordinate systems
S: A coordinate system assigns numbers to points in space. Choosing coordinates that match a problem's symmetry can turn a hard problem into an easy one.
LV: Introductory · Foundation
O: Choose a coordinate system that matches a problem's symmetry
O: Explain why the result of a calculation can't depend on the coordinates chosen
PRE: Vectors and vector decomposition
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
T: Coordinate system | A rule assigning numbers to each point in space
T: Origin | The point where all coordinates are zero
SUM: Pick axes along the motion or the symmetry: the physics is the same, the algebra is easier.
SUM: Physical results (lengths, energies) are independent of coordinates; components are not.
SRC: OpenStax, Calculus Volume 3, chapter 2 "Vectors in Space" | secondary | 2016 | https://openstax.org/details/books/calculus-volume-3
SRC: Boas M. L., Mathematical Methods in the Physical Sciences, 3rd edition, chapter 10, Wiley | secondary | 2006
EV: established | Coordinate independence of physical laws is a foundation of classical and relativistic physics.
Q: Why tilt axes along an inclined plane? | The acceleration is along the slope, so one equation has the acceleration and the other balances to zero.
M3@1,2: A block slides down a frictionless 30° slope. In axes along and perpendicular to the slope, what are the accelerations? | g sin 30° along the slope, 0 perpendicular | g along the slope, 0 perpendicular | g cos 30° along, g sin 30° perpendicular | 0 along, g perpendicular | Along the slope only mg sin θ is unbalanced; perpendicular, the normal force balances mg cos θ.
SA2@1,2: Explain why the length of a vector is the same in any rotated Cartesian axes, though its components change. | Rotating the axes changes how the vector is split into components, but not the vector itself. Its length √(x^{2} + y^{2} + z^{2}) is unchanged under rotation (rotations preserve distances), so any physical quantity built from lengths and angles is coordinate-independent. | components change under rotation ; the vector itself doesn't ; rotations preserve lengths ; physical results independent of axes

## Cartesian, polar, cylindrical and spherical coordinates
S: Cartesian coordinates suit boxes and straight-line motion; polar, cylindrical and spherical coordinates suit circles, wires and spheres. Know the conversions and the area and volume elements.
LV: Intermediate · Foundation
O: Convert between Cartesian, polar, cylindrical and spherical coordinates
O: Use the correct area and volume elements in each system
PRE: Coordinate systems
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
T: Volume element | The volume of a small coordinate box: dx dy dz, or r^{2} sin θ dr dθ dφ in spherical coordinates
T: Jacobian | The factor converting area or volume elements between coordinate systems
SUM: Polar: x = r cos θ, y = r sin θ, dA = r dr dθ. Spherical: dV = r^{2} sin θ dr dθ dφ.
SUM: Forgetting the Jacobian (r or r^{2} sin θ) is the commonest integration error.
SRC: OpenStax, Calculus Volume 3, section 5.5 "Triple Integrals in Cylindrical and Spherical Coordinates" | secondary | 2016 | https://openstax.org/books/calculus-volume-3/pages/5-5-triple-integrals-in-cylindrical-and-spherical-coordinates
SRC: NIST Digital Library of Mathematical Functions, section 1.5 | data | 2024 | https://dlmf.nist.gov/1.5
EV: established | The conversions and Jacobians are exact.
Q: What is the area element in plane polar coordinates? | dA = r dr dθ.
M3@2: Using spherical coordinates, what is the volume of a sphere of radius R? | (4/3)πR^{3} | 4πR^{2} | 2π^{2}R^{3} | πR^{3} | ∫r^{2} dr ∫sin θ dθ ∫dφ = (R^{3}/3)(2)(2π) = (4/3)πR^{3}.
SA2@1: Convert the point (x, y, z) = (1, 1, √2) to spherical coordinates. | r = √(1 + 1 + 2) = 2. cos θ = z/r = √2/2, so θ = π/4. tan φ = y/x = 1, so φ = π/4. | r = 2 ; θ = π/4 ; φ = π/4

## Differentiation
S: The derivative is the instantaneous rate of change: the gradient of a graph at a point. Velocity is the derivative of position, acceleration of velocity, current of charge, force of momentum.
---
M3@1,2: What is d/dx of x^{2} sin x? | 2x sin x + x^{2} cos x | 2x cos x | x^{2} cos x | 2x sin x − x^{2} cos x | Product rule: (x^{2})′ sin x + x^{2}(sin x)′ = 2x sin x + x^{2} cos x.
LV: Introductory · Foundation
O: Differentiate polynomials, exponentials, trigonometric functions, products, quotients and compositions
O: Interpret a derivative as a rate of change and find maxima and minima
PRE: Exponential and logarithmic functions
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
T: Derivative | dy/dx, the limit of Δy/Δx as Δx → 0: the instantaneous rate of change
T: Chain rule | d/dx f(g(x)) = f′(g(x)) g′(x)
SUM: v = dx/dt, a = dv/dt, I = dQ/dt, F = dp/dt.
SUM: At a maximum or minimum the derivative is zero; the second derivative tells which.
SRC: OpenStax, Calculus Volume 1, chapter 3 "Derivatives" | secondary | 2016 | https://openstax.org/details/books/calculus-volume-1
SRC: Riley K. F., Hobson M. P., Bence S. J., Mathematical Methods for Physics and Engineering, 3rd edition, chapter 2, Cambridge University Press | secondary | 2006
EV: established | The rules of differentiation are exact.
Q: What is d/dt of e^{−kt}? | −k e^{−kt}.
SA2@2: A particle's position is x = 4t^{3} − 6t^{2} m. Find when it is momentarily at rest and its acceleration then. | v = dx/dt = 12t^{2} − 12t = 12t(t − 1), zero at t = 0 and t = 1 s. a = dv/dt = 24t − 12: −12 m s^{-2} at t = 0 and +12 m s^{-2} at t = 1 s. | differentiate to v ; rest at t = 0 and 1 s ; differentiate to a ; a = −12 and +12 m s^{-2}

## Integration
S: Integration adds up infinitely many small pieces and reverses differentiation. It gives the area under a graph: displacement from velocity, work from force, charge from current, impulse from force.
LV: Introductory · Foundation
O: Integrate standard functions and use substitution and integration by parts
O: Interpret a definite integral as an accumulated quantity such as work or displacement
PRE: Differentiation
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
T: Definite integral | ∫_{a}^{b} f dx, the signed area under f between a and b
T: Integration by parts | ∫u dv = uv − ∫v du
SUM: Displacement = ∫v dt; work = ∫F dx; charge = ∫I dt; impulse = ∫F dt.
SUM: Indefinite integrals need a constant, fixed by an initial or boundary condition.
SRC: OpenStax, Calculus Volume 1, chapter 5 "Integration" | secondary | 2016 | https://openstax.org/details/books/calculus-volume-1
SRC: Boas M. L., Mathematical Methods in the Physical Sciences, 3rd edition, chapter 5, Wiley | secondary | 2006
EV: established | The fundamental theorem of calculus and these techniques are exact.
Q: What does the area under a force–displacement graph give? | The work done.
SA2@1,2: Find the work done stretching a spring (F = kx, k = 200 N m^{-1}) from x = 0.10 m to 0.20 m. | W = ∫kx dx = ½k(x_{2}^{2} − x_{1}^{2}) = ½ × 200 × (0.04 − 0.01) = 3.0 J. | integrate kx ; ½k(x_{2}^{2} − x_{1}^{2}) ; substitute ; 3.0 J

## Partial derivatives
S: When a quantity depends on several variables, a partial derivative measures how it changes with one while the others are held fixed. Thermodynamics, fields and waves all depend on them.
LV: Intermediate · Foundation
O: Calculate partial derivatives, holding the other variables fixed
O: Use the total differential to estimate small changes and propagate errors
PRE: Differentiation
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
T: Partial derivative | ∂f/∂x, the rate of change of f with x while every other variable is held fixed
T: Total differential | df = (∂f/∂x)dx + (∂f/∂y)dy
SUM: In thermodynamics always say what is held constant: (∂U/∂T)_{V} is not (∂U/∂T)_{P}.
SUM: Mixed partial derivatives of smooth functions are equal: ∂^{2}f/∂x∂y = ∂^{2}f/∂y∂x.
SRC: OpenStax, Calculus Volume 3, chapter 4 "Differentiation of Functions of Several Variables" | secondary | 2016 | https://openstax.org/details/books/calculus-volume-3
SRC: Riley K. F., Hobson M. P., Bence S. J., Mathematical Methods for Physics and Engineering, 3rd edition, chapter 5, Cambridge University Press | secondary | 2006
EV: established | These results hold for smooth (twice continuously differentiable) functions.
Q: What does the subscript in (∂P/∂T)_{V} mean? | Volume is held constant while the derivative is taken.
M3@1,2: For an ideal gas P = nRT/V, what is (∂P/∂V)_{T}? | −nRT/V^{2} | nR/V | nRT/V^{2} | −nR/V | Holding T fixed, P ∝ 1/V, so the derivative is −nRT/V^{2}.
SA2@2: The volume of a cylinder is V = πr^{2}h. Use the total differential to estimate the percentage change in V if r rises by 1% and h by 2%. | dV = 2πrh dr + πr^{2} dh, so dV/V = 2(dr/r) + dh/h = 2 × 1% + 2% = 4%. | total differential ; dV/V = 2dr/r + dh/h ; 4%

## Ordinary differential equations
S: An ordinary differential equation (ODE) relates a function of one variable to its derivatives. Newton's second law is an ODE, and so are the equations for circuits, decay, cooling and oscillation.
LV: Intermediate · Foundation
O: Classify an ODE by order and linearity
O: Solve separable first-order ODEs
PRE: Integration
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
T: Order | The highest derivative in a differential equation
T: Linear ODE | One in which the unknown and its derivatives appear only to the first power, not multiplied together
T: Separable | An ODE that can be written g(y) dy = f(x) dx and integrated on each side
SUM: Newton's second law, decay, cooling and circuits are all ODEs.
SUM: An nth-order ODE needs n conditions to fix its solution.
SRC: Boyce W. E., DiPrima R. C., Elementary Differential Equations and Boundary Value Problems, 10th edition, Wiley | secondary | 2012
SRC: OpenStax, Calculus Volume 2, chapter 4 "Introduction to Differential Equations" | secondary | 2016 | https://openstax.org/details/books/calculus-volume-2
EV: established | Existence and uniqueness theorems guarantee a unique solution for well-behaved ODEs with the right conditions.
Q: How many initial conditions does a second-order ODE need? | Two, for example the starting position and velocity.
M3@1,2: Which ODE is nonlinear? | d^{2}θ/dt^{2} + (g/l) sin θ = 0 | d^{2}x/dt^{2} + ω^{2}x = 0 | dQ/dt + Q/RC = 0 | dv/dt = g − kv | sin θ is not linear in θ; replacing it by θ (small angles) gives the linear simple harmonic equation.
SA2@1: Solve dv/dt = −kv^{2} with v(0) = v_{0}. | Separate: dv/v^{2} = −k dt. Integrate: −1/v = −kt + C. At t = 0, C = −1/v_{0}. So 1/v = 1/v_{0} + kt, and v = v_{0}/(1 + kv_{0}t). | separate variables ; integrate both sides ; apply v(0) = v_{0} ; v = v_{0}/(1 + kv_{0}t)

## Partial differential equations
S: A partial differential equation (PDE) involves partial derivatives in several variables, such as space and time. The great field equations of physics are PDEs: the wave, heat, Laplace, Schrödinger and Maxwell equations.
LV: Advanced · Foundation
O: Recognise the wave, diffusion, Laplace and Schrödinger equations
O: Outline separation of variables for a linear PDE
PRE: Partial derivatives
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
T: Separation of variables | Seeking solutions that are products of functions of one variable each, such as X(x)T(t)
T: Elliptic, parabolic, hyperbolic | The three classes of second-order PDE, typified by Laplace's, the heat and the wave equations
SUM: Wave: ∂^{2}u/∂t^{2} = c^{2}∇^{2}u. Heat: ∂u/∂t = D∇^{2}u. Laplace: ∇^{2}u = 0.
SUM: Linear PDEs obey superposition: sums of solutions are solutions.
SRC: Riley K. F., Hobson M. P., Bence S. J., Mathematical Methods for Physics and Engineering, 3rd edition, chapters 20–21, Cambridge University Press | secondary | 2006
SRC: Strauss W. A., Partial Differential Equations: An Introduction, 2nd edition, Wiley | secondary | 2008
EV: established | These are the standard equations of mathematical physics; separation works for linear PDEs on simple geometries.
Q: Which PDE describes steady-state temperature in a region with no sources? | Laplace's equation, ∇^{2}T = 0.
M3@1,2: Substituting u = X(x)T(t) into ∂u/∂t = D ∂^{2}u/∂x^{2} gives what? | T′/(DT) = X″/X = a constant | T′ = X″, with no constant needed | X/T = D, a ratio fixed by the diffusivity | T′X′ = D, a product equal to the diffusivity | Each side depends on a different variable, so both must equal the same constant (the separation constant).
SA2@1,2: Explain why a guitar string's motion can be written as a sum of standing waves. | The string obeys the linear wave equation with fixed ends. Separation of variables gives standing-wave solutions sin(nπx/L)cos(ω_{n}t), one for each harmonic n. Because the equation is linear, any sum of these is also a solution, and the initial shape and velocity fix how much of each is present. | linear wave equation ; boundary conditions fix nodes at the ends ; separation gives harmonics ; superposition of modes

## First- and second-order differential equations
S: Most of physics reduces to first- and second-order linear ODEs. Learn the standard methods and the standard solutions, because you'll recognise them everywhere.
LV: Intermediate · Application
O: Solve first-order linear ODEs with an integrating factor
O: Solve constant-coefficient second-order ODEs and identify damping regimes
PRE: Ordinary differential equations
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
T: Integrating factor | e^{∫P dx}, which turns y′ + Py = Q into an exact derivative
T: Auxiliary equation | The quadratic in m from trying y = e^{mt} in a constant-coefficient ODE
T: Critical damping | The damping at which a system returns to equilibrium fastest without oscillating
SUM: x″ + 2γx′ + ω_{0}^{2}x = 0: underdamped if γ < ω_{0}, critical if γ = ω_{0}, overdamped if γ > ω_{0}.
SUM: General solution = complementary function + particular integral.
SRC: Boyce W. E., DiPrima R. C., Elementary Differential Equations and Boundary Value Problems, 10th edition, chapters 2–3, Wiley | secondary | 2012
SRC: OpenStax, University Physics Volume 1, section 15.5 "Damped Oscillations" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/15-5-damped-oscillations
EV: established | These solution methods are exact for linear constant-coefficient equations.
Q: What does a complex pair of roots of the auxiliary equation mean physically? | Oscillation: the solution is a sinusoid inside a decaying (or growing) exponential.
M3@2: x″ + 6x′ + 9x = 0. What is the general solution? | (A + Bt)e^{−3t} | Ae^{−3t} + Be^{3t} | A cos 3t + B sin 3t | e^{−3t}(A cos 3t + B sin 3t) | m^{2} + 6m + 9 = (m + 3)^{2}: a repeated root, so the solution is (A + Bt)e^{−3t} (critical damping).
SA2@1: Solve dy/dx + 2y = 4 with y(0) = 0. | Integrating factor e^{2x}: (ye^{2x})′ = 4e^{2x}, so ye^{2x} = 2e^{2x} + C. y(0) = 0 gives C = −2. y = 2(1 − e^{−2x}). | integrating factor e^{2x} ; integrate ; apply y(0) = 0 ; y = 2(1 − e^{−2x})

## Boundary and initial conditions
S: Differential equations have families of solutions; conditions on the boundaries of the region, or at the starting time, pick out the one that describes the actual system. Often they also quantise the allowed solutions.
LV: Intermediate · Foundation
O: Distinguish initial-value from boundary-value problems
O: Explain how boundary conditions quantise allowed solutions
PRE: First- and second-order differential equations
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
T: Initial-value problem | An ODE with conditions given at one instant, such as x(0) and v(0)
T: Boundary-value problem | A differential equation with conditions at the edges of a region
T: Eigenvalue (of a boundary problem) | A value of a parameter for which a non-zero solution meets the boundary conditions
SUM: Initial conditions fix one trajectory; boundary conditions can allow only discrete solutions.
SUM: Fixed string ends give λ_{n} = 2L/n; a particle in a box gives E_{n} ∝ n^{2}.
SRC: Riley K. F., Hobson M. P., Bence S. J., Mathematical Methods for Physics and Engineering, 3rd edition, chapter 17, Cambridge University Press | secondary | 2006
SRC: OpenStax, University Physics Volume 3, section 7.4 "The Quantum Particle in a Box" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/7-4-the-quantum-particle-in-a-box
EV: established | Quantisation by boundary conditions is exact for these model systems and confirmed by spectra.
Q: Why does a string fixed at both ends only vibrate at certain frequencies? | The ends must be nodes, so only whole numbers of half-wavelengths fit: λ_{n} = 2L/n and f_{n} = nv/(2L).
M3@2: A particle is confined to a box of width L with ψ = 0 at both walls. What are the allowed wavefunctions? | sin(nπx/L) with n = 1, 2, 3… | cos(nπx/L) with n = 0, 1, 2… | e^{ikx} for any k | sin(kx) for any k | ψ(0) = 0 rules out cosine; ψ(L) = 0 needs kL = nπ; n = 0 gives no particle.
SA2@1,2: Explain the difference between the conditions needed to predict a thrown ball's flight and to find the shape of a hanging chain. | The ball is an initial-value problem: its position and velocity at launch fix the whole trajectory. The chain is a boundary-value problem: its shape is fixed by where its two ends are attached, conditions at two different places rather than one instant. | ball: initial position and velocity ; initial-value problem ; chain: fixed end points ; boundary-value problem

## Taylor and Fourier series
S: A Taylor series approximates a smooth function near a point by a polynomial; a Fourier series represents a periodic function as a sum of sines and cosines. Between them they power most approximations in physics.
LV: Intermediate · Foundation
O: Write the Taylor series of a function and use it to justify approximations
O: Express a periodic function as a Fourier series
PRE: Differentiation
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
T: Taylor series | f(x + h) = f(x) + hf′(x) + h^{2}f″(x)/2! + …
T: Fourier series | A sum of sines and cosines at multiples of a fundamental frequency that represents a periodic function
T: Harmonic | A component at a whole-number multiple of the fundamental frequency
SUM: Truncated Taylor series give the small-angle, binomial and linear approximations used everywhere.
SUM: Smooth periodic functions need few harmonics; sharp corners need many.
SRC: Boas M. L., Mathematical Methods in the Physical Sciences, 3rd edition, chapters 1 and 7, Wiley | secondary | 2006
SRC: NIST Digital Library of Mathematical Functions, section 1.8 "Fourier Series" | data | 2024 | https://dlmf.nist.gov/1.8
EV: established | Convergence conditions (Taylor: analyticity; Fourier: Dirichlet conditions) are proven theorems.
Q: What is the binomial approximation for (1 + x)^{n} when x ≪ 1? | (1 + x)^{n} ≈ 1 + nx.
M3@1,2: Using a Taylor series, what is γ = (1 − v^{2}/c^{2})^{−1/2} to first order in v^{2}/c^{2}? | 1 + v^{2}/(2c^{2}) | 1 − v^{2}/(2c^{2}) | 1 + v^{2}/c^{2} | 1 + 2v^{2}/c^{2} | (1 − x)^{−1/2} ≈ 1 + x/2 with x = v^{2}/c^{2}.
SA2@2: Explain why a square wave played through a speaker sounds harsher than a sine wave of the same frequency. | A sine wave is a single frequency. A square wave's Fourier series contains the fundamental plus odd harmonics (3f, 5f, 7f… with amplitudes 1/3, 1/5, 1/7…), so it adds many higher frequencies, which the ear hears as a harsher, brighter tone. | sine is one frequency ; square wave has odd harmonics ; amplitudes fall as 1/n ; extra high frequencies sound harsh

## Fourier transforms
S: The Fourier transform breaks a (not necessarily periodic) signal into a continuous spectrum of frequencies. It links time and frequency, or position and wavenumber, and explains diffraction, spectroscopy, signal processing and the uncertainty principle.
LV: Advanced · Foundation
O: Explain the Fourier transform as a decomposition into a continuous spectrum
O: Use the reciprocal spreading of a signal and its transform
PRE: Taylor and Fourier series
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
T: Fourier transform | F(ω) = ∫f(t)e^{−iωt} dt: the amplitude and phase of each frequency in f
T: Bandwidth | The spread of frequencies present in a signal
SUM: Narrow in time means wide in frequency: Δt Δω ≳ 1.
SUM: A lens forms the Fourier transform of an aperture in its focal plane: diffraction is Fourier optics.
SRC: Bracewell R. N., The Fourier Transform and Its Applications, 3rd edition, McGraw-Hill | secondary | 2000
SRC: NIST Digital Library of Mathematical Functions, section 1.14 "Integral Transforms" | data | 2024 | https://dlmf.nist.gov/1.14
EV: established | The transform pairs and the bandwidth relation are exact mathematical results.
Q: What is the Fourier transform of a very short pulse like? | Very broad: a short pulse contains a wide range of frequencies.
M3@2: A laser pulse lasts 10 fs. Roughly what spread of frequencies must it contain? | About 10^{14} Hz | About 10 Hz | About 10^{4} Hz | About 10^{9} Hz | Δf ≈ 1/Δt = 1/(10^{−14} s) = 10^{14} Hz, a large fraction of the optical frequency itself.
SA2@1,2: Explain how the Fourier transform links position and momentum in quantum mechanics. | A wavefunction ψ(x) can be written as a superposition of plane waves e^{ikx}, with p = ħk. The Fourier transform gives the amplitude of each k, so the momentum-space wavefunction is the Fourier transform of ψ(x). The reciprocal spreading of transform pairs gives Δx Δp ≥ ħ/2. | plane waves with p = ħk ; momentum wavefunction is the transform ; narrow in x means wide in k ; leads to the uncertainty relation

## Laplace transforms
S: The Laplace transform turns linear ODEs with initial conditions into algebra. Engineers and physicists use it for circuits, control systems and any problem where a system is switched on at t = 0.
LV: Advanced · Application
O: Use the Laplace transform to turn a linear ODE with initial conditions into algebra
O: Invert simple transforms using a table and partial fractions
PRE: First- and second-order differential equations
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
T: Laplace transform | F(s) = ∫_{0}^{∞} f(t)e^{−st} dt
T: Transfer function | Output over input in the s-domain for a linear system
SUM: L{f′} = sF(s) − f(0): derivatives become multiplication by s, with the initial value built in.
SUM: Solve in s, then invert with partial fractions and a table.
SRC: Riley K. F., Hobson M. P., Bence S. J., Mathematical Methods for Physics and Engineering, 3rd edition, section 13.2, Cambridge University Press | secondary | 2006
SRC: NIST Digital Library of Mathematical Functions, section 1.14(iii) "Laplace Transform" | data | 2024 | https://dlmf.nist.gov/1.14
EV: established | The Laplace transform properties used are exact.
Q: What is the Laplace transform of e^{−at}? | 1/(s + a).
M3@1,2: What is L{f″(t)}? | s^{2}F(s) − sf(0) − f′(0) | s^{2}F(s) | sF(s) − f′(0) | s^{2}F(s) + sf(0) + f′(0) | Apply L{f′} = sF − f(0) twice.
SA2@1,2: Solve y′ + 3y = 0, y(0) = 2, with the Laplace transform. | sY − 2 + 3Y = 0, so Y = 2/(s + 3). Inverting, y = 2e^{−3t}. | transform the derivative ; Y = 2/(s + 3) ; invert ; y = 2e^{−3t}

## Multivariable calculus
S: Multivariable calculus extends derivatives and integrals to functions of several variables: fields in 3D space, thermodynamic states, probability distributions. It is the working mathematics of fields.
LV: Intermediate · Foundation
O: Find stationary points of functions of two variables
O: Evaluate double and triple integrals, choosing the order and coordinates
PRE: Partial derivatives
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
T: Stationary point | A point where all first partial derivatives vanish
T: Saddle point | A stationary point that is a maximum in one direction and a minimum in another
T: Multiple integral | An integral over an area or volume, done as repeated single integrals
SUM: Classify stationary points with the second derivatives: f_{xx}f_{yy} − f_{xy}^{2} > 0 means a maximum or minimum, < 0 a saddle.
SUM: Choose coordinates that fit the region's shape before integrating.
SRC: OpenStax, Calculus Volume 3, chapters 4–5 | secondary | 2016 | https://openstax.org/details/books/calculus-volume-3
SRC: Boas M. L., Mathematical Methods in the Physical Sciences, 3rd edition, chapters 4–5, Wiley | secondary | 2006
EV: established | These are exact results of calculus.
Q: What is a saddle point? | A stationary point that is a maximum along one direction and a minimum along another.
M3@1: What kind of stationary point does f = x^{2} − y^{2} have at the origin? | A saddle point | A minimum | A maximum | It has no stationary point | f_{xx}f_{yy} − f_{xy}^{2} = (2)(−2) − 0 = −4 < 0.
SA2@2: Find the mass of a square plate 0 ≤ x, y ≤ 1 m with surface density σ = 2xy kg m^{-2}. | M = ∫∫2xy dx dy = 2 × (½)(½) = 0.5 kg. | set up the double integral ; separate into x and y integrals ; each gives ½ ; 0.5 kg

## Gradient, divergence and curl
S: The operator ∇ (del) builds three derivatives of fields: the gradient of a scalar field, and the divergence and curl of a vector field. Together they describe how fields vary, spread out and swirl, and they are the language of Maxwell's equations.
LV: Advanced · Foundation
O: Calculate the gradient of a scalar field and the divergence and curl of a vector field
O: Interpret each physically: steepest increase, sources and circulation
PRE: Multivariable calculus
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
T: Gradient | ∇φ, a vector pointing in the direction of steepest increase of φ
T: Divergence | ∇·F, the net outflow of F per unit volume: positive at a source
T: Curl | ∇×F, the circulation of F per unit area: non-zero where the field swirls
SUM: E = −∇V; ∇·E = ρ/ε_{0} (charges are sources); ∇·B = 0 (no magnetic monopoles).
SUM: The curl of a gradient is always zero, and the divergence of a curl is always zero.
SRC: Griffiths D. J., Introduction to Electrodynamics, 4th edition, chapter 1, Pearson | secondary | 2013
SRC: Schey H. M., Div, Grad, Curl, and All That, 4th edition, W. W. Norton | secondary | 2005
EV: established | These are exact identities of vector calculus.
Q: What does ∇·B = 0 say physically? | There are no magnetic monopoles: magnetic field lines have no beginning or end.
M3@1: What is ∇·r for r = (x, y, z)? | 3 | 1 | 0 | r | ∂x/∂x + ∂y/∂y + ∂z/∂z = 1 + 1 + 1 = 3.
SA2@1,2: For the electric potential V = kx^{2}, find the electric field and explain its direction. | E = −∇V = (−2kx, 0, 0). For k > 0 it points towards x = 0 from both sides, because the field points downhill in potential, from high V to low V. | E = −∇V ; E = −2kx in x ; field points down the potential gradient ; towards the origin for k > 0

## Line, surface and volume integrals
S: Integrals along curves, over surfaces and through volumes add up field quantities: work along a path, flux through a surface, total charge in a region. They turn the differential laws of physics into integral laws.
LV: Advanced · Foundation
O: Evaluate line integrals along a path and flux integrals through a surface
O: Identify when a line integral is path-independent
PRE: Gradient, divergence and curl
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
T: Line integral | ∫F·dl along a path, such as the work done by a force
T: Flux | ∫F·dA through a surface: how much field passes through it
T: Conservative field | A field whose line integral depends only on the end points (∇×F = 0)
SUM: Work = ∫F·dl; flux = ∫F·dA; total charge = ∫ρ dV.
SUM: Conservative fields have zero circulation around every closed loop and can be written F = −∇U.
SRC: Griffiths D. J., Introduction to Electrodynamics, 4th edition, section 1.3, Pearson | secondary | 2013
SRC: OpenStax, Calculus Volume 3, chapter 6 "Vector Calculus" | secondary | 2016 | https://openstax.org/details/books/calculus-volume-3
EV: established | These are exact definitions and results.
Q: What is special about the line integral of a conservative field? | It depends only on the end points, not on the path, and is zero around any closed loop.
M3@2: What is the flux of E = (q/4πε_{0}r^{2}) r̂ through a sphere of radius R centred on q? | q/ε_{0} | q/(4πε_{0}R^{2}) | 0 | qR/ε_{0} | E is radial and uniform on the sphere: E × 4πR^{2} = q/ε_{0}, independent of R.
SA2@1,2: A force F = (y, x) N acts in the plane. Show that it is conservative and find the work done from (0, 0) to (2, 3) m. | ∂F_{y}/∂x − ∂F_{x}/∂y = 1 − 1 = 0, so the curl is zero and F is conservative, with potential −U = xy. Work = [xy] from (0, 0) to (2, 3) = 6 J, whatever the path. | zero curl ; potential function xy ; path independence ; 6 J

## Vector calculus theorems
S: The divergence theorem and Stokes' theorem connect what happens inside a region to what happens on its boundary. They convert Maxwell's equations between differential and integral forms and underpin every conservation law.
LV: Advanced · Application
O: State the divergence theorem and Stokes' theorem
O: Use them to convert between the differential and integral forms of field laws
PRE: Line, surface and volume integrals
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
T: Divergence theorem | ∮F·dA = ∫(∇·F) dV: outflow through a closed surface equals the total divergence inside
T: Stokes' theorem | ∮F·dl = ∫(∇×F)·dA: circulation round a loop equals the total curl through any surface it bounds
SUM: The divergence theorem turns ∇·E = ρ/ε_{0} into Gauss's law ∮E·dA = Q/ε_{0}.
SUM: Stokes' theorem turns ∇×B = μ_{0}J into Ampère's law ∮B·dl = μ_{0}I.
SRC: Griffiths D. J., Introduction to Electrodynamics, 4th edition, section 1.3, Pearson | secondary | 2013
SRC: Riley K. F., Hobson M. P., Bence S. J., Mathematical Methods for Physics and Engineering, 3rd edition, chapter 11, Cambridge University Press | secondary | 2006
EV: established | Both theorems are proven for smooth fields on suitable regions.
Q: What does Stokes' theorem relate? | The circulation of a field round a closed loop to the flux of its curl through a surface bounded by the loop.
M3@1,2: A field has ∇·F = 2 everywhere. What is its outward flux through a closed cube of side 3 m? | 54 | 18 | 6 | 0 | By the divergence theorem the flux equals ∫2 dV = 2 × 27 = 54.
SA2@2: Use the divergence theorem to explain why the electric flux out of a closed surface with no charge inside is zero. | In empty space ∇·E = ρ/ε_{0} = 0. The divergence theorem gives ∮E·dA = ∫∇·E dV = 0: every field line that enters the surface must also leave it. | ∇·E = 0 where ρ = 0 ; apply the divergence theorem ; total flux zero ; field lines in equal field lines out

## Linear algebra eigenvalues and eigenvectors
S: An eigenvector of a matrix keeps its direction when the matrix acts on it, only scaling by the eigenvalue. Eigenproblems give the normal modes of vibration, principal axes of rotation, and the allowed energies of quantum systems.
LV: Advanced · Foundation
O: Find the eigenvalues and eigenvectors of a 2 × 2 matrix
O: Explain their physical meaning in normal modes, principal axes and quantum measurement
PRE: Matrices and linear algebra
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
T: Eigenvector | A non-zero vector v with Av = λv: the matrix only scales it
T: Eigenvalue | The scale factor λ, found from det(A − λI) = 0
T: Hermitian matrix | One equal to its conjugate transpose; its eigenvalues are real
SUM: Solve det(A − λI) = 0 for λ, then (A − λI)v = 0 for each v.
SUM: Normal modes, principal axes and quantum observables are all eigenproblems.
SRC: Strang G., Introduction to Linear Algebra, 5th edition, chapter 6, Wellesley-Cambridge Press | secondary | 2016
SRC: Riley K. F., Hobson M. P., Bence S. J., Mathematical Methods for Physics and Engineering, 3rd edition, chapter 8, Cambridge University Press | secondary | 2006
EV: established | These results are exact; Hermitian matrices always have real eigenvalues and orthogonal eigenvectors.
Q: Why must quantum observables be Hermitian? | Their eigenvalues, the possible measurement results, must be real.
M3@1: What are the eigenvalues of [[2, 1], [1, 2]]? | 1 and 3 | 2 and 2 | 0 and 4 | −1 and 3 | det = (2 − λ)^{2} − 1 = 0 gives λ = 1 or 3, with eigenvectors (1, −1) and (1, 1).
SA2@2: Two equal masses joined by springs between two walls have normal modes with eigenvectors (1, 1) and (1, −1). Describe each motion. | (1, 1): both masses move together in the same direction by the same amount (the middle spring isn't stretched), the lower-frequency mode. (1, −1): they move in opposite directions, stretching the middle spring, the higher-frequency mode. Any motion is a combination of the two. | in-phase mode described ; antiphase mode described ; in-phase has lower frequency ; general motion is a superposition

## Tensor algebra
S: A tensor is a quantity whose components transform in a definite way when the coordinates change. Scalars are rank 0, vectors rank 1; rank-2 tensors such as stress, the inertia tensor and the metric relate one vector to another.
LV: Advanced · Foundation
O: Define a tensor by how its components transform
O: Use index notation and the summation convention
PRE: Linear algebra eigenvalues and eigenvectors
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
T: Rank | The number of indices on a tensor: scalar 0, vector 1, matrix-like 2
T: Summation convention | A repeated index is summed over: a_{i}b_{i} means Σa_{i}b_{i}
T: Metric tensor | g_{μν}, which turns coordinate differences into lengths or intervals
SUM: A law written as a tensor equation holds in every coordinate system.
SUM: Stress, the inertia tensor and the metric are rank-2 tensors.
SRC: Riley K. F., Hobson M. P., Bence S. J., Mathematical Methods for Physics and Engineering, 3rd edition, chapter 26, Cambridge University Press | secondary | 2006
SRC: Schutz B. F., A First Course in General Relativity, 2nd edition, chapter 3, Cambridge University Press | secondary | 2009
EV: established | Tensor transformation rules are exact mathematical definitions.
Q: What does the summation convention mean for a_{i}b_{i}? | Sum over the repeated index: a_{1}b_{1} + a_{2}b_{2} + a_{3}b_{3}, the dot product.
M3@2: Why is the inertia tensor needed rather than a single moment of inertia? | Angular momentum need not be parallel to angular velocity: L_{i} = I_{ij}ω_{j} | Because mass is a vector, not a scalar | Because rotations can't be described by numbers | Because torque is a scalar in three dimensions | For an asymmetric body L and ω point in different directions, which a scalar can't express; along principal axes they line up.
SA2@1,2: Explain what it means to say a physical law should be written as a tensor equation. | If both sides of an equation are tensors of the same type, they transform the same way under a change of coordinates, so if the equation holds in one coordinate system it holds in all. That expresses the principle that the laws of physics don't depend on our choice of coordinates. | both sides tensors of the same rank ; same transformation law ; true in one frame means true in all ; coordinate independence of laws

## Probability distributions
S: A probability distribution describes how likely each outcome is. Physics needs them for measurement errors, statistical mechanics, radioactive decay and quantum mechanics.
LV: Intermediate · Foundation
O: Use the binomial, Poisson and Gaussian distributions and know when each applies
O: Calculate the mean and standard deviation of a distribution
PRE: Deterministic and probabilistic models
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
T: Probability density | p(x), where p(x) dx is the probability of a value between x and x + dx
T: Poisson distribution | P(n) = μ^{n}e^{−μ}/n!, for counts of rare independent events, with variance μ
T: Gaussian distribution | The bell curve, set by its mean and standard deviation σ
SUM: Counts (decays, photons) are Poisson: σ = √μ. Sums of many small errors are Gaussian.
SUM: For a Gaussian, about 68% of values lie within ±1σ and 95% within ±2σ.
SRC: Barlow R. J., Statistics: A Guide to the Use of Statistical Methods in the Physical Sciences, Wiley | secondary | 1989
SRC: Particle Data Group, Review of Particle Physics, "Probability" | data | 2024 | https://pdg.lbl.gov/
EV: established | These distributions follow from their assumptions; the central limit theorem explains why the Gaussian is so common.
Q: What is the standard deviation of a Poisson count with mean 400? | √400 = 20.
M3@2: A source gives a mean of 2.0 counts per second. What is the probability of zero counts in a given second? | e^{−2} ≈ 0.14 | 0, since the mean is above zero | 0.5, since half of all seconds are empty | 0.25, from (1/2)^{2} | Poisson: P(0) = μ^{0}e^{−μ}/0! = e^{−2.0} ≈ 0.135.
SA2@1: Explain why measurement errors are often Gaussian. | A measurement error is usually the sum of many small independent effects (vibration, reading, electrical noise). The central limit theorem says the sum of many independent random contributions tends to a Gaussian distribution, whatever the distribution of each one. | many small independent contributions ; their sum ; central limit theorem ; tends to a Gaussian

## Statistics and error propagation
S: Statistics turns repeated measurements into a best estimate and an honest uncertainty, and error propagation carries those uncertainties through calculations into the final result.
LV: Intermediate · Application
O: Estimate a mean and its standard error from repeated measurements
O: Propagate uncertainties through sums, products, powers and functions
PRE: Probability distributions
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
T: Standard error of the mean | s/√n, the uncertainty in an average of n measurements
T: Propagation of uncertainty | Calculating the uncertainty in a result from the uncertainties of its inputs
T: Weighted mean | An average with each value weighted by 1/σ^{2}, so precise values count more
SUM: Sums: absolute uncertainties add in quadrature. Products and quotients: relative uncertainties add in quadrature.
SUM: For z = x^{n}, Δz/z = |n| Δx/x; in general Δf = |df/dx| Δx.
SRC: JCGM 100, Evaluation of measurement data: Guide to the expression of uncertainty in measurement (GUM) | standard | 2008 | https://www.bipm.org/en/committees/jc/jcgm/publications
SRC: Taylor J. R., An Introduction to Error Analysis, 2nd edition, chapters 3–4, University Science Books | secondary | 1997
EV: established | The quadrature rules assume independent, small uncertainties; correlations need extra terms.
Q: If a length has a 2% uncertainty, what is the uncertainty in its cube? | 6%: for a power, the relative uncertainty is multiplied by the power.
M3@2: x = 10.0 ± 0.3 and y = 4.0 ± 0.4 (independent). What is the uncertainty in x − y? | 0.5 | 0.1 | 0.7 | 0.12 | For a difference, absolute uncertainties add in quadrature: √(0.3^{2} + 0.4^{2}) = 0.5.
SA2@2: A pendulum of length 1.000 ± 0.005 m has period 2.01 ± 0.02 s. Find g = 4π^{2}l/T^{2} with its uncertainty. | g = 4π^{2} × 1.000/2.01^{2} ≈ 9.77 m s^{-2}. Relative uncertainties: l 0.5%, T 1.0%, so T^{2} contributes 2.0%. Combined: √(0.5^{2} + 2.0^{2}) ≈ 2.1%, so Δg ≈ 0.2 m s^{-2}: g = 9.8 ± 0.2 m s^{-2}. | g ≈ 9.77 m s^{-2} ; T^{2} doubles T's relative uncertainty ; quadrature sum about 2.1% ; g = 9.8 ± 0.2 m s^{-2}

## Numerical methods
S: Most real problems have no closed-form solution. Numerical methods turn calculus into arithmetic a computer can do: integrating equations of motion, finding roots, evaluating integrals and solving PDEs.
LV: Intermediate · Application
O: Integrate equations of motion with Euler and higher-order methods
O: Find roots and evaluate integrals numerically, and judge the error
PRE: Ordinary differential equations
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
T: Euler method | Stepping y_{n+1} = y_{n} + h f(t_{n}, y_{n}), with error proportional to the step h
T: Newton–Raphson | Root finding by x_{n+1} = x_{n} − f(x_{n})/f′(x_{n})
T: Truncation error | The error from approximating a continuous process with finite steps
SUM: Halve the step and compare: if the answer barely changes, the step is small enough.
SUM: Simple Euler drifts in energy for orbits and oscillators; symplectic or Runge–Kutta methods do better.
SRC: Press W. H., Teukolsky S. A., Vetterling W. T., Flannery B. P., Numerical Recipes, 3rd edition, Cambridge University Press | secondary | 2007
SRC: Newman M., Computational Physics, revised edition, CreateSpace | secondary | 2013
EV: established | The order of accuracy of each method is a proven result; real performance depends on the problem.
Q: How does the error of the trapezium rule scale with step size h? | As h^{2}: halving the step cuts the error by about four.
M3@2: Newton–Raphson on f(x) = x^{2} − 2 from x_{0} = 1. What is x_{1}? | 1.5 | 1.0 | 2.0 | 1.414 | x_{1} = 1 − (1 − 2)/(2 × 1) = 1.5; x_{2} = 1.4167, converging fast to √2.
SA2@1,2: Explain why the simple Euler method makes a simulated planet spiral outwards. | Euler uses the velocity at the start of each step for the whole step, so it always moves the planet along the tangent, slightly outwards from the true curved orbit. The error adds energy every step, so the orbit grows. Smaller steps reduce it; symplectic methods such as velocity Verlet avoid the systematic drift. | uses start-of-step velocity ; tangent step lies outside the curve ; energy rises each step ; fix by smaller steps or a symplectic method

## Optimisation
S: Optimisation finds the maximum or minimum of a function, often under constraints. Nature itself optimises (least action, minimum energy, maximum entropy), and physicists optimise designs, fits and experiments.
LV: Intermediate · Application
O: Find maxima and minima with and without constraints
O: Use Lagrange multipliers for a constrained optimum
PRE: Multivariable calculus
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
T: Constraint | A condition the variables must satisfy while a function is optimised
T: Lagrange multiplier | λ in ∇f = λ∇g, which finds extrema of f subject to g = constant
SUM: Unconstrained: set the gradient to zero. Constrained: solve ∇f = λ∇g with the constraint.
SUM: Nature optimises: least action, minimum potential energy at equilibrium, maximum entropy.
SRC: Boas M. L., Mathematical Methods in the Physical Sciences, 3rd edition, chapter 4, Wiley | secondary | 2006
SRC: Nocedal J., Wright S. J., Numerical Optimization, 2nd edition, Springer | secondary | 2006
EV: established | The Lagrange multiplier condition is a proven necessary condition for constrained extrema of smooth functions.
Q: What does the Lagrange multiplier condition ∇f = λ∇g mean geometrically? | At the optimum the contour of f touches the constraint curve, so their normals (gradients) are parallel.
M3@2: Among rectangles of perimeter 20 m, which has the largest area? | A 5 m × 5 m square | A 2 m × 8 m long, thin rectangle | A 4 m × 6 m almost-square rectangle | A 1 m × 9 m very long rectangle | A = x(10 − x) is maximum where dA/dx = 10 − 2x = 0, x = 5 m.
SA2@1,2: Explain how the principle of minimum potential energy finds the equilibrium of a mass hanging on a spring. | The total potential energy is U = ½kx^{2} − mgx (spring plus gravity, x downwards). Equilibrium is where dU/dx = kx − mg = 0, so x = mg/k. d^{2}U/dx^{2} = k > 0, so it is a minimum: a stable equilibrium. | write total potential energy ; set dU/dx = 0 ; x = mg/k ; second derivative positive means stable

## Dimensional analysis
S: In mathematical physics, dimensional analysis is a tool for checking work and finding scaling laws. Every term in an equation must have the same dimensions, and the dimensionless groups of a problem fix how it scales.
LV: Intermediate · Application
O: Use dimensions to check equations and derive scaling laws
O: Use dimensionless groups to design scale models
PRE: Dimensional analysis
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
T: Scaling law | A power-law relation between quantities, such as T ∝ √(l/g)
T: Similarity | Two systems behave alike when all their dimensionless groups are equal
SUM: Write the unknown as a product of powers, match dimensions, solve for the exponents.
SUM: Scale models work only if the governing dimensionless groups (Reynolds, Froude…) match.
SRC: Barenblatt G. I., Scaling, Self-similarity, and Intermediate Asymptotics, Cambridge University Press | secondary | 1996
SRC: Buckingham E., "On physically similar systems; illustrations of the use of dimensional equations", Physical Review 4, 345 | primary | 1914 | https://doi.org/10.1103/PhysRev.4.345
EV: established | The π theorem is a proven result; G. I. Taylor's blast-wave estimate is a famous confirmation.
Q: Why can a model ship test in a tank predict the real ship's waves? | If the Froude number v/√(gL) is matched, the wave patterns are geometrically similar.
M3@2,3: The energy E of a blast wave of radius R at time t in air of density ρ: which scaling does dimensional analysis give? | R ∝ (Et^{2}/ρ)^{1/5} | R ∝ Et/ρ | R ∝ (E/ρ)^{1/3} t | R ∝ √(Et/ρ) | Matching M, L and T for R = kE^{a}t^{b}ρ^{c} gives a = 1/5, b = 2/5, c = −1/5 (G. I. Taylor's result).
SA2@1: Use dimensional analysis to find how the speed of waves on a string depends on its tension T and mass per unit length μ. | Assume v = kT^{a}μ^{b}. [T] = M L T^{-2}, [μ] = M L^{-1}. M: a + b = 0; L: a − b = 1; T: −2a = −1. So a = ½, b = −½ and v = k√(T/μ) (k = 1 in full theory). | assume a power law ; dimensions of tension and μ ; solve exponents ; v ∝ √(T/μ)

## Complex analysis
S: Complex analysis studies functions of a complex variable. Its powerful theorems evaluate hard real integrals, describe 2D fields and flows, and connect causality to the analytic structure of response functions.
LV: Advanced · Foundation
O: Identify analytic functions using the Cauchy–Riemann equations
O: Use the residue theorem to evaluate a real integral
PRE: Complex numbers
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
T: Analytic function | A complex function differentiable in a region; it satisfies the Cauchy–Riemann equations
T: Pole | A point where a function blows up like 1/(z − z_{0})^{n}
T: Residue | The coefficient of 1/(z − z_{0}) in a function's expansion about a pole
SUM: ∮f dz = 2πi × (sum of residues inside the contour).
SUM: Analytic response functions encode causality (Kramers–Kronig relations).
SRC: Riley K. F., Hobson M. P., Bence S. J., Mathematical Methods for Physics and Engineering, 3rd edition, chapters 24–25, Cambridge University Press | secondary | 2006
SRC: NIST Digital Library of Mathematical Functions, section 1.10 | data | 2024 | https://dlmf.nist.gov/1.10
EV: established | Cauchy's theorem and the residue theorem are proven results.
Q: What is the residue of 1/(z − 2) at z = 2? | 1.
M3@2: What is ∫_{−∞}^{∞} dx/(1 + x^{2}), by residues? | π | 2π | π/2 | 1 | Close in the upper half-plane: the pole at z = i has residue 1/(2i), so the integral is 2πi × 1/(2i) = π.
SA2@1: Show that f(z) = z^{2} is analytic, using the Cauchy–Riemann equations. | z^{2} = (x + iy)^{2} = x^{2} − y^{2} + 2ixy, so u = x^{2} − y^{2} and v = 2xy. ∂u/∂x = 2x = ∂v/∂y and ∂u/∂y = −2y = −∂v/∂x. The equations hold everywhere, so z^{2} is analytic everywhere. | find u and v ; ∂u/∂x = ∂v/∂y ; ∂u/∂y = −∂v/∂x ; analytic everywhere

## Group theory and mathematical symmetry
S: A group is the mathematics of symmetry: a set of transformations that can be combined and undone. Group theory classifies crystals, labels atomic and molecular states, and organises the particles and forces of the Standard Model.
LV: Advanced · Foundation
O: State the group axioms and give physical examples of groups
O: Explain how symmetry groups classify states and particles
PRE: Symmetry and invariance
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
T: Group | A set with an operation that is closed and associative, with an identity and inverses
T: Abelian | A group whose operations commute: ab = ba
T: Representation | A way of writing a group's elements as matrices acting on states
SUM: Rotations form SO(3), whose representations give angular momentum states with 2l + 1 orientations.
SUM: The Standard Model's forces follow from the gauge groups SU(3) × SU(2) × U(1).
SRC: Georgi H., Lie Algebras in Particle Physics, 2nd edition, Westview Press | secondary | 1999
SRC: Riley K. F., Hobson M. P., Bence S. J., Mathematical Methods for Physics and Engineering, 3rd edition, chapters 28–29, Cambridge University Press | secondary | 2006
EV: established | Group theory is exact mathematics; its application to the Standard Model is confirmed by experiment.
Q: Are 3D rotations an Abelian group? | No: rotating about x then y differs from y then x.
M3@1,2: Which set is a group under ordinary multiplication? | {1, −1, i, −i} | {0, 1, 2} | All integers | {1, 2, 3} | It is closed (products stay in the set), contains 1, and each element has an inverse in the set (i × −i = 1).
SA2@2: Explain how rotational symmetry explains why a p orbital comes in three orientations. | An atom's laws are symmetric under rotation, so its states fall into representations of the rotation group. States with angular momentum l form a set of 2l + 1 states that rotations mix among themselves. For p orbitals l = 1, giving 2 × 1 + 1 = 3 states (m = −1, 0, +1), all of equal energy in a free atom. | rotational symmetry of the atom ; states form representations ; 2l + 1 states ; l = 1 gives three

## Variational calculus
S: Variational calculus finds the function, rather than the number, that makes a quantity stationary. It gives the Euler–Lagrange equations and the principle of least action, from which all of classical and much of modern physics can be derived.
LV: Advanced · Foundation
O: Derive the Euler–Lagrange equation and apply it to simple problems
O: State the principle of least action
PRE: Optimisation
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
T: Functional | A rule that assigns a number to a whole function, such as the length of a curve
T: Euler–Lagrange equation | d/dx(∂F/∂y′) − ∂F/∂y = 0, the condition for a functional to be stationary
T: Action | S = ∫L dt, where L = T − V is the Lagrangian
SUM: Making ∫F(y, y′, x) dx stationary gives the Euler–Lagrange equation.
SUM: With L = T − V it reproduces Newton's second law; least action is the foundation of mechanics and field theory.
SRC: Goldstein H., Poole C., Safko J., Classical Mechanics, 3rd edition, chapter 2, Addison-Wesley | secondary | 2002
SRC: Feynman R. P., Leighton R. B., Sands M., The Feynman Lectures on Physics, vol. II, chapter 19 "The Principle of Least Action" | secondary | 1964 | https://www.feynmanlectures.caltech.edu/II_19.html
EV: established | The Euler–Lagrange equation is a proven result; least action reproduces all of classical mechanics.
Q: What is the Lagrangian of a particle in a potential V? | L = T − V = ½mv^{2} − V.
M3@2: Applying the Euler–Lagrange equation to L = ½mẋ^{2} − ½kx^{2} gives what? | mẍ = −kx | mẍ = kx | mẋ = −kx | ẍ = 0 | ∂L/∂ẋ = mẋ, d/dt gives mẍ; ∂L/∂x = −kx. So mẍ + kx = 0, simple harmonic motion.
SA2@1: Explain why the shortest path between two points in a plane is a straight line, using the Euler–Lagrange equation. | Length = ∫√(1 + y′^{2}) dx. F doesn't depend on y, so ∂F/∂y = 0 and the Euler–Lagrange equation gives ∂F/∂y′ = y′/√(1 + y′^{2}) = constant. So y′ is constant, and the path is a straight line. | length functional ; ∂F/∂y = 0 ; ∂F/∂y′ constant ; y′ constant means a straight line
`;
