// School 19: Numerical Analysis and Scientific Computing. Format: kit/course/notes.js. Standard: docs/CURRICULUM_CONTENT_STANDARD.md
// Errors and stability, roots and interpolation, numerical calculus and linear algebra, and scientific computing.
export default `
## Numerical Analysis
S: Numerical analysis designs and studies algorithms that compute approximate answers to mathematical problems: solving equations, integrating, simulating. It asks how accurate, stable and efficient each method is, since computers work with finite precision and finite time.
O: Describe the aims of numerical analysis: accuracy, stability and efficiency
O: Distinguish truncation error from rounding error
T: Truncation error | Error from approximating an infinite or exact process by a finite one, such as cutting off a series
T: Rounding error | Error from representing numbers with finitely many digits
H: The questions asked
- Does the method converge to the true answer, and how fast?
- How do errors in data and arithmetic affect the result (stability)?
- How much work and memory does it need (complexity)?
- Can we bound or estimate the error a posteriori?
H: Sources of error
- Modelling error: the equations simplify reality.
- Data error: measured inputs are uncertain.
- Truncation (discretisation) error: series cut off, derivatives replaced by differences.
- Rounding error: floating-point arithmetic.
H: A long history
- Babylonian square roots, Newton's method, Gaussian elimination.
- Von Neumann and Turing analysed rounding in the 1940s.
- Wilkinson's backward error analysis (1960s) shaped modern practice.
- Today: the basis of weather prediction, engineering design and machine learning.
X: Approximate e^{0.1} by 1 + x + x^{2}/2 and estimate the truncation error.
> 1 + 0.1 + 0.005 = 1.105
> The first omitted term is x^{3}/6 ≈ 0.000167
> True value 1.105171; the error 0.000171 matches the estimate
K: Numerical analysis studies approximate algorithms for accuracy, stability and cost; errors come from modelling, data, truncation and rounding; error bounds and estimates guide trust in results.
!: Assuming more digits in the output means a more accurate answer.
Q: What is truncation error? | Error from replacing an exact process by a finite approximation.
Q: Who developed backward error analysis? | James Wilkinson.
SUM: Numerical analysis makes computation trustworthy.
SUM: Know where errors come from.
SRC: Süli E, Mayers DF, An Introduction to Numerical Analysis (Cambridge University Press 2003) | textbook | 2003 | https://www.cambridge.org/
SRC: Trefethen LN, Numerical analysis, in The Princeton Companion to Mathematics (Princeton University Press 2008) | textbook | 2008 | https://people.maths.ox.ac.uk/trefethen/NAessay.pdf
NUM1#maths-u19-01-q1@1: Approximating e^{0.2} by 1 + x + x^{2}/2, what value do you get? | 1.22 | 0.0001 |  | 1 + 0.2 + 0.02 = 1.22, against the true value 1.2214; the omitted x^{3}/6 term is about 0.0013.
M1#maths-u19-01-q2@1: Which kind of error comes from cutting a Taylor series off after a few terms? | Truncation error | Rounding error | Modelling error | Data error | Overflow error | Replacing an infinite series by a finite sum is a truncation (discretisation) error.
M2#maths-u19-01-q3@2: Why can't rounding error be eliminated by using a better formula alone? | Every floating-point operation rounds its result to finitely many digits | A better formula always removes rounding, so it can be eliminated | Rounding happens only when numbers are first typed in as input | Computers store every real number exactly, so there's no rounding | Rounding only affects division, so avoiding division eliminates it | Finite precision means each arithmetic step may introduce a small error.

## Numerical Methods
S: Numerical methods are the practical recipes of numerical analysis: algorithms for roots, integrals, linear systems and differential equations. Choosing a method means weighing accuracy, speed, robustness and the structure of the problem.
O: Match common problems to standard numerical methods
O: Use order of convergence to compare methods
T: Order of convergence | p such that errors satisfy e_{k+1} ≈ C e_{k}^{p}; p = 1 is linear, p = 2 quadratic
T: Order of accuracy | For a discretisation with step h, error O(hᵖ): halving h divides the error by about 2ᵖ
H: The toolkit
- Roots: bisection, Newton, secant.
- Integrals: trapezium, Simpson, Gaussian quadrature.
- Linear systems: Gaussian elimination, LU, iterative methods.
- ODEs: Euler, Runge–Kutta, multistep methods; PDEs: finite differences and elements.
H: Comparing methods
- Convergence order and constants.
- Cost per step (function evaluations, flops).
- Robustness: does it always work, or only from good starts?
- Memory and parallelism on modern hardware.
H: Verifying results
- Convergence tests: refine h and check errors fall at the expected rate.
- Manufactured solutions: test codes on problems with known answers.
- Richardson extrapolation estimates and removes leading error terms.
X: A method's error is 0.04 with step h and 0.01 with h/2. Estimate its order of accuracy.
> Ratio of errors = 0.04/0.01 = 4
> 4 = 2ᵖ gives p = 2
> The method is second-order accurate
K: Numerical methods are matched to problem types; convergence and accuracy orders compare them; cost, robustness and verification by refinement and known solutions all matter.
!: Judging a method by one run instead of checking errors under refinement.
Q: If halving h divides the error by 8, what is the order? | 3.
Q: What does Richardson extrapolation do? | Combines results at different h to cancel the leading error term.
SUM: Choose methods by accuracy, cost and robustness.
SUM: Verify by refinement.
SRC: Burden RL, Faires JD, Burden AM, Numerical Analysis (10th edn, Cengage 2016) | textbook | 2016 | https://www.cengage.com/
SRC: Heath MT, Scientific Computing: An Introductory Survey (2nd edn, SIAM 2018) | textbook | 2018 | https://epubs.siam.org/
NUM1#maths-u19-02-q1@1: A fourth-order method has error 0.0032 with step h. Estimate its error with step h/2. | 0.0002 | 0.00001 |  | Halving h divides a fourth-order error by 2^{4} = 16: 0.0032/16 = 0.0002.
M1#maths-u19-02-q2@1: What does quadratic convergence mean for an iterative method? | The error is roughly squared each iteration, doubling the correct digits | The error is roughly halved each iteration, adding one bit per step | The error falls by a fixed amount each step until it reaches zero | The method needs two starting points and two evaluations per step | The method always converges in exactly two iterations from any start | e_{k+1} ≈ Ce_{k}^{2}, so 10^{−3} becomes about 10^{−6}.
M2#maths-u19-02-q3@2: How can you check a simulation code is implemented correctly? | Run it on a manufactured problem with a known solution and confirm errors shrink at the expected rate | Run it once with a large step size and check the output looks plausible | Check that it prints many significant digits for every output value | Compare a single run with a different input and see if the answers differ | Trust the output once the code compiles and runs without any error messages | Correct codes show the theoretical convergence order when the mesh is refined.

## Numerical Approximation
S: Approximation theory replaces complicated functions by simpler ones, usually polynomials or rational functions, that are easy to compute. The best approximations spread their error evenly, and Chebyshev's ideas explain why some choices work far better than others.
O: Compare Taylor, least-squares and minimax approximations
O: Explain the role of Chebyshev polynomials and the Weierstrass theorem
T: Minimax approximation | The polynomial p minimising the maximum error max|f(x) − p(x)| on an interval
T: Chebyshev polynomial | Tₙ(x) = cos(n arccos x), which oscillates between ±1 equally on [−1, 1]
H: Kinds of approximation
- Taylor: accurate near one point, poor far away.
- Least squares: minimise ∫ (f − p)^{2}, using orthogonal polynomials.
- Minimax (uniform): minimise the worst error; the Remez algorithm computes it.
- Rational (Padé) approximations handle poles and asymptotes.
H: Key theorems
- Weierstrass (1885): continuous functions on [a, b] can be approximated uniformly by polynomials.
- Chebyshev equioscillation: the best degree-n approximation's error attains its maximum with alternating sign at n + 2 points.
- Smooth functions have rapidly decaying Chebyshev coefficients.
H: Uses
- Library functions (sin, exp, log) use polynomial or rational approximations.
- Chebfun computes with functions via Chebyshev expansions.
- Spectral methods for differential equations.
- Data fitting and model reduction.
X: Find the best constant approximation to f(x) = x on [0, 1] in the minimax sense.
> A constant c has maximum error max(|c|, |1 − c|)
> This is minimised when c = 1 − c, so c = 0.5
> Maximum error 0.5, attained with opposite signs at x = 0 and x = 1 (equioscillation)
K: Approximation replaces functions by simple ones; Taylor is local, least squares averages, minimax controls worst error; Weierstrass guarantees polynomial approximations exist; Chebyshev polynomials are key.
!: Expecting a Taylor polynomial to be accurate across a whole interval.
Q: What does the Weierstrass theorem guarantee? | Continuous functions on a closed interval can be uniformly approximated by polynomials.
Q: What is T₂(x)? | 2x^{2} − 1.
SUM: Approximate hard functions by easy ones.
SUM: Minimax spreads error evenly.
SRC: Trefethen LN, Approximation Theory and Approximation Practice (extended edn, SIAM 2019) | textbook | 2019 | https://people.maths.ox.ac.uk/trefethen/ATAP/
SRC: Powell MJD, Approximation Theory and Methods (Cambridge University Press 1981) | textbook | 1981 | https://www.cambridge.org/
NUM1#maths-u19-03-q1@1: Evaluate the Chebyshev polynomial T₃(x) = 4x^{3} − 3x at x = 0.5. | -1 | 0 |  | 4 × 0.125 − 1.5 = 0.5 − 1.5 = −1, matching cos(3 arccos 0.5) = cos π = −1.
M1#maths-u19-03-q2@1: Which approximation minimises the largest error over an interval? | The minimax (best uniform) approximation | The Taylor polynomial at the midpoint | The least-squares polynomial | Linear interpolation at the endpoints | The constant function zero | Minimax approximation is defined by minimising the maximum absolute error.
M3#maths-u19-03-q3@2: What property identifies a best minimax polynomial of degree n? | Its error reaches its maximum size at n + 2 points with alternating signs | Its error is exactly zero at every one of the n + 1 nodes | Its coefficients are all equal to the Taylor coefficients of f | It matches f and its first n derivatives at the midpoint | Its error has the same sign everywhere on the interval | Chebyshev's equioscillation theorem characterises the best approximation this way.

## Error Analysis
S: Error analysis quantifies how far a computed answer is from the truth and where the error comes from. Forward error compares outputs, backward error asks what slightly different problem was solved exactly, and the condition number links the two.
O: Calculate absolute and relative errors
O: Use forward and backward error and the rule of thumb linking them
T: Relative error | |x̂ − x|/|x|, the error as a fraction of the true value
T: Backward error | The smallest change to the input data for which the computed answer is exact
H: Measuring error
- Absolute error |x̂ − x|; relative error |x̂ − x|/|x|.
- Significant digits ≈ −log₁₀(relative error).
- Error bounds (guaranteed) versus estimates (typical).
H: Forward and backward error
- Forward error: how wrong the output is.
- Backward error: how much the input must change for the output to be exact.
- Rule of thumb: forward error ≲ condition number × backward error.
- A backward stable algorithm has small backward error (Wilkinson).
H: Propagation
- Sums: absolute errors add (roughly).
- Products and quotients: relative errors add (roughly).
- Linearisation: δf ≈ f′(x)δx.
- Monte Carlo propagation for complex models (see Uncertainty Quantification).
X: The true value is π ≈ 3.14159 and the computed value is 3.14. Find the absolute and relative errors.
> Absolute error = |3.14 − 3.14159| = 0.00159
> Relative error = 0.00159/3.14159 ≈ 5.1 × 10^{−4}
> About 3 significant digits are correct
K: Absolute and relative errors measure accuracy; backward error asks what problem was solved; forward error ≲ condition × backward error; relative errors add in products, absolute in sums.
!: Reporting absolute error for quantities of very different sizes, where relative error is meaningful.
Q: What is backward error? | The input change needed for the computed result to be exact.
Q: How do relative errors combine in a product? | They approximately add.
SUM: Measure errors relatively.
SUM: Backward error plus conditioning gives forward error.
SRC: Higham NJ, Accuracy and Stability of Numerical Algorithms (2nd edn, SIAM 2002) | textbook | 2002 | https://epubs.siam.org/
SRC: Wilkinson JH, Rounding Errors in Algebraic Processes (Prentice Hall 1963; Dover 1994) | textbook | 1994 | https://store.doverpublications.com/
NUM1#maths-u19-04-q1@1: A length of 50 cm is measured as 50.4 cm. What is the relative error as a percentage? | 0.8 | 0.001 | % | 0.4/50 = 0.008, which is 0.8%.
M1#maths-u19-04-q2@1: If x has relative error 1% and y has relative error 2%, what is the approximate relative error of xy? | 3% | 2% | 1% | 0.02% | 1.5% | For products, relative errors approximately add: 1% + 2% = 3%.
M2#maths-u19-04-q3@2: What does a small backward error tell you about an algorithm's answer? | It is the exact answer to a problem very close to the one posed | It is always exactly the correct answer to the original problem | Its forward error must be small too, whatever the conditioning | The problem itself must be well conditioned and easy to solve | Nothing useful, since backward error ignores the actual output | Backward stability says the algorithm solved a nearby problem; conditioning decides how close that answer is.

## Floating-Point Arithmetic
S: Computers store real numbers in floating-point form, like scientific notation in binary with a fixed number of digits. IEEE 754 standardises this, and understanding machine epsilon, rounding and special values explains many surprising numerical results.
O: Describe IEEE 754 double precision and machine epsilon
O: Recognise cancellation, overflow and non-associativity
T: Machine epsilon | The gap between 1 and the next floating-point number; about 2.2 × 10^{−16} in double precision
T: Catastrophic cancellation | Loss of relative accuracy when subtracting two nearly equal numbers
H: Representation
- x = ±m × 2^{e}, with a 53-bit significand in double precision (about 16 decimal digits).
- Range about 10^{−308} to 10^{308}; beyond that, overflow to ±∞.
- Special values: ±0, ±∞, NaN (not a number), subnormals.
- Each operation is correctly rounded: fl(x ∘ y) = (x ∘ y)(1 + δ) with |δ| ≤ u.
H: Surprises
- 0.1 + 0.2 ≠ 0.3 exactly, since 0.1 isn't representable in binary.
- Addition isn't associative: (10^{16} + 1) − 10^{16} = 0, but 10^{16} − 10^{16} + 1 = 1.
- Subtracting nearly equal numbers loses digits.
H: Remedies
- Rewrite formulas: √(x + 1) − √x = 1/(√(x + 1) + √x).
- Use log1p and expm1 for small arguments.
- Compensated (Kahan) summation.
- Never test floats for exact equality; use tolerances.
X: Why does computing 1 − cos x for x = 10^{−8} in double precision give 0?
> cos(10^{−8}) ≈ 1 − 5 × 10^{−17}, which is closer to 1 than machine epsilon allows, so it rounds to exactly 1
> So 1 − cos x evaluates to 0, though the true value is 5 × 10^{−17}
> Use the identity 1 − cos x = 2 sin^{2}(x/2), which gives 5 × 10^{−17} accurately
K: IEEE doubles have about 16 significant digits and unit roundoff 1.1 × 10^{−16}; cancellation, overflow and non-associativity cause surprises; reformulate expressions to avoid them.
!: Testing two floating-point results with == instead of a tolerance.
Q: Is 0.1 exactly representable in binary floating point? | No.
Q: What is machine epsilon for IEEE double precision? | About 2.2 × 10^{−16}.
SUM: Floats are finite-precision numbers.
SUM: Reformulate to avoid cancellation.
SRC: IEEE, IEEE Standard for Floating-Point Arithmetic (IEEE 754-2019) | guideline | 2019 | https://doi.org/10.1109/IEEESTD.2019.8766229
SRC: Goldberg D, What every computer scientist should know about floating-point arithmetic, ACM Computing Surveys 23(1), 5 | journal | 1991 | https://doi.org/10.1145/103162.103163
NUM1#maths-u19-05-q1@1: How many bits does the significand of an IEEE 754 double have (including the hidden bit)? | 53 | 0 | bits | 52 stored bits plus an implicit leading 1 give 53 bits, about 15.95 decimal digits.
M1#maths-u19-05-q2@1: Which computation suffers from catastrophic cancellation? | √(x + 1) − √x for very large x | √(x + 1) + √x for very large x | x × y for moderate x and y | e^{x} for x = 1 | The sum of two positive numbers | Subtracting two nearly equal square roots loses most of the significant digits.
M2#maths-u19-05-q3@2: Why is floating-point addition not associative? | Each addition rounds its result, so the order of operations changes which digits are lost | Computers add numbers in a random order chosen by the hardware each time | Addition is undefined for very large numbers, so the order must change | Floats are stored exactly, so associativity fails only through overflow | It is associative; only multiplication fails to be associative in floating point | (a + b) + c and a + (b + c) round different intermediate sums.

## Numerical Stability
S: An algorithm is numerically stable if rounding errors don't grow out of control during the computation. Stable algorithms give answers as good as the problem's conditioning allows; unstable ones can ruin well-conditioned problems.
O: Distinguish stable and unstable algorithms with examples
O: Explain backward stability and stability of recurrences
T: Backward stable algorithm | One whose computed result is the exact result for slightly perturbed data, with perturbations of the order of machine precision
T: Unstable recurrence | A recursion in which small errors are amplified at each step
H: Examples
- Gaussian elimination without pivoting can be unstable; partial pivoting is stable in practice.
- Classical Gram–Schmidt loses orthogonality; Householder QR is backward stable.
- Computing variance by E[x^{2}] − E[x]^{2} can cancel badly; Welford's method is stable.
H: Recurrences
- Iₙ = ∫₀^{1} xⁿeˣ⁻¹ dx satisfies Iₙ = 1 − nIₙ₋₁.
- Forward recursion multiplies errors by n each step: unstable.
- Backward recursion Iₙ₋₁ = (1 − Iₙ)/n divides errors: stable.
H: Stability in ODE solvers
- Explicit Euler on y′ = −λy is stable only if hλ ≤ 2.
- Stiff problems need implicit methods (backward Euler, BDF).
- A-stability: stable for all h on decaying problems.
- Lax equivalence: consistency + stability ⇔ convergence (linear PDE schemes).
X: In Iₙ = 1 − nIₙ₋₁, an error ε in I₀ is introduced. How big is the error in I₁₀?
> Each step multiplies the error by −n
> After 10 steps: ε × 10! ≈ 3.6 × 10^{6} ε
> With ε = 10^{−16}, the error is about 4 × 10^{−10} and grows explosively beyond, so forward recursion is unstable
K: Stable algorithms keep rounding errors under control; pivoting and Householder QR are stable; recurrences can amplify errors; ODE methods have stability limits, and stiff problems need implicit methods.
!: Blaming the problem for an inaccurate result when an unstable algorithm is the cause.
Q: Is Householder QR backward stable? | Yes.
Q: What kind of method do stiff ODEs need? | Implicit methods.
SUM: Stability keeps errors bounded.
SUM: Choose algorithms that don't amplify errors.
SRC: Higham NJ, Accuracy and Stability of Numerical Algorithms (2nd edn, SIAM 2002) | textbook | 2002 | https://epubs.siam.org/
SRC: Trefethen LN, Bau D, Numerical Linear Algebra (SIAM 1997) | textbook | 1997 | https://epubs.siam.org/
NUM1#maths-u19-06-q1@1: Explicit Euler is applied to y′ = −50y. What is the largest step h for stability? | 0.04 | 0.0001 |  | Stability needs hλ ≤ 2, so h ≤ 2/50 = 0.04.
M1#maths-u19-06-q2@1: Which algorithm for QR factorisation is backward stable? | Householder reflections | Classical Gram–Schmidt | Normal equations | Cramer's rule | Unpivoted elimination | Householder QR has small backward error, while classical Gram–Schmidt loses orthogonality.
M3#maths-u19-06-q3@2: Why is backward recursion stable for Iₙ₋₁ = (1 − Iₙ)/n? | Each step divides the existing error by n, so errors shrink rather than grow | It uses fewer arithmetic operations than the forward recursion | It needs no starting value, so no initial error can enter it | Integrals of positive functions are always computed stably | It isn't stable: both directions multiply errors by n each step | The forward recursion multiplies errors by n; reversing it divides them.

## Numerical Conditioning
S: The condition number measures how sensitive a problem's answer is to small changes in its data. Ill-conditioned problems amplify errors whatever algorithm is used, so knowing the condition number tells you how many digits you can trust.
O: Compute condition numbers of functions and matrices
O: Use the condition number to estimate lost digits
T: Condition number of a function | κ(x) = |x f′(x)/f(x)|, the ratio of relative output change to relative input change
T: Matrix condition number | κ(A) = ‖A‖‖A^{−1}‖; for the 2-norm, the ratio of largest to smallest singular value
H: Functions
- f(x) = x − 1 near x = 1: κ = |x/(x − 1)| is huge, so subtraction is ill-conditioned there.
- f(x) = √x: κ = 1/2, well conditioned.
- Roots of polynomials can be extremely ill-conditioned (Wilkinson's polynomial).
H: Linear systems
- Relative error in x ≲ κ(A) × relative error in A or b.
- Lose about log₁₀ κ(A) digits.
- Hilbert matrices Hᵢⱼ = 1/(i + j − 1) are notoriously ill-conditioned.
- κ ≥ 1, with equality for orthogonal matrices.
H: Conditioning versus stability
- Conditioning belongs to the problem; stability to the algorithm.
- A stable algorithm on an ill-conditioned problem can still give poor answers.
- Remedies: reformulate, regularise, or use higher precision.
- Least squares via normal equations squares the condition number.
X: A = [[1, 0], [0, 10^{−6}]]. Find κ₂(A) and the digits lost solving Ax = b in double precision.
> Singular values are 1 and 10^{−6}
> κ₂(A) = 1/10^{−6} = 10^{6}
> About 6 of the 16 digits are lost, leaving about 10 correct digits
K: Condition numbers measure sensitivity; κ(A) = ‖A‖‖A^{−1}‖; about log₁₀ κ digits are lost; conditioning is a property of the problem, stability of the algorithm.
!: Using the normal equations for ill-conditioned least squares, which squares κ.
Q: What is the condition number of an orthogonal matrix? | 1.
Q: About how many digits are lost when κ(A) = 10^{10}? | About 10.
SUM: Conditioning is sensitivity.
SUM: It bounds achievable accuracy.
SRC: Trefethen LN, Bau D, Numerical Linear Algebra (SIAM 1997) | textbook | 1997 | https://epubs.siam.org/
SRC: Golub GH, Van Loan CF, Matrix Computations (4th edn, Johns Hopkins University Press 2013) | textbook | 2013 | https://www.press.jhu.edu/
NUM1#maths-u19-07-q1@1: What is the condition number κ(x) = |x f′(x)/f(x)| of f(x) = x^{5}? | 5 | 0 |  | x × 5x^{4}/x^{5} = 5: a 1% change in x gives about a 5% change in x^{5}.
M1#maths-u19-07-q2@1: A matrix has singular values 100 and 0.01. What is its 2-norm condition number? | 10^{4} | 100 | 0.01 | 10^{−4} | 1 | κ₂ = σ_{max}/σ_{min} = 100/0.01 = 10^{4}.
M2#maths-u19-07-q3@2: Why can a backward stable algorithm still give an inaccurate answer? | If the problem is ill-conditioned, the small backward error is magnified into a large forward error | Backward stable algorithms always give the exact answer, so they never do | Rounding errors don't exist in backward stable algorithms by definition | Stability guarantees full accuracy whenever the input data are exact | It can't: a stable algorithm on any problem gives a small forward error | Forward error ≲ κ × backward error, so large κ spoils the result.

## Interval Arithmetic
S: Interval arithmetic computes with intervals guaranteed to contain the true values, rounding outward at every step. It gives rigorous error bounds and has been used to prove mathematical theorems by computer, though careless use can make intervals grow too wide.
O: Perform interval addition, multiplication and division
O: Explain the dependency problem and uses in verified computing
T: Interval | [a, b], the set of reals between a and b, representing an uncertain value
T: Dependency problem | Overestimation when the same variable appears several times, since each occurrence is treated independently
H: Operations
- [a, b] + [c, d] = [a + c, b + d].
- [a, b] − [c, d] = [a − d, b − c].
- [a, b] × [c, d] = [min, max] of ac, ad, bc, bd.
- Division by an interval containing 0 needs extended arithmetic.
H: The dependency problem
- For x ∈ [0, 1], x − x gives [−1, 1], not [0, 0].
- Rewriting formulas so each variable appears once helps.
- Centred forms and affine arithmetic reduce overestimation.
H: Verified computing
- Outward rounding guarantees enclosures despite floating point.
- Interval Newton methods prove existence and uniqueness of roots.
- Tucker (2002) proved the Lorenz attractor exists; Hales used intervals in the Kepler proof.
- Standard: IEEE 1788.
X: Compute [1, 2] × [−1, 3] and [1, 2] − [1, 2].
> Products: 1 × −1 = −1, 1 × 3 = 3, 2 × −1 = −2, 2 × 3 = 6; so the product is [−2, 6]
> Subtraction: [1 − 2, 2 − 1] = [−1, 1]
> The second is wider than the true answer 0: the dependency problem
K: Interval arithmetic encloses true values with guaranteed bounds; multiplication takes extremes of endpoint products; repeated variables cause overestimation; it powers computer-assisted proofs.
!: Treating repeated occurrences of a variable as independent and getting needlessly wide bounds.
Q: What is [2, 3] + [−1, 1]? | [1, 4].
Q: Which famous attractor's existence was proved with interval methods? | The Lorenz attractor (Tucker 2002).
SUM: Intervals give guaranteed bounds.
SUM: Watch for the dependency problem.
SRC: Moore RE, Kearfott RB, Cloud MJ, Introduction to Interval Analysis (SIAM 2009) | textbook | 2009 | https://epubs.siam.org/
SRC: Tucker W, A rigorous ODE solver and Smale's 14th problem, Foundations of Computational Mathematics 2, 53 | journal | 2002 | https://doi.org/10.1007/s002080010018
NUM1#maths-u19-08-q1@1: What is the width of the interval [1, 3] × [2, 4]? | 10 | 0 |  | The product is [2, 12], whose width is 12 − 2 = 10.
M1#maths-u19-08-q2@1: What is [−2, 1] × [3, 4]? | [−8, 4] | [−6, 4] | [−8, 3] | [3, 4] | [−2, 4] | Endpoint products are −6, −8, 3 and 4, so the result is [−8, 4].
M3#maths-u19-08-q3@2: Why does x(1 − x) on [0, 1] give a wider interval than x − x^{2} written as ¼ − (x − ½)^{2}? | Each form treats repeated occurrences of x independently; the second uses x only once, removing the overestimation | The second form is mathematically wrong, so its narrower interval can't be trusted | Interval arithmetic ignores how a formula is written, so the widths must agree | Squares can't be computed with intervals, so the second form is just a guess | They give the same width, because both formulas describe the same function | x(1 − x) evaluates to [0, 1] × [0, 1] = [0, 1], while the single-use form gives the exact [0, ¼].

## Root-Finding Algorithms
S: Root-finding solves f(x) = 0, from computing square roots to finding equilibria. Methods range from slow but guaranteed bracketing to fast but delicate open methods, and robust codes combine both.
O: Compare bracketing and open root-finding methods
O: Choose a method by robustness, speed and available derivatives
T: Bracketing method | A method that keeps an interval [a, b] with f(a) and f(b) of opposite signs, so a root stays inside
T: Open method | A method using one or two points without a bracket, such as Newton or secant, which may diverge
H: The methods
- Bisection: linear, guaranteed if f is continuous with a sign change.
- Newton: quadratic, needs f′ and a good start.
- Secant: order about 1.618, no derivative needed.
- Fixed-point iteration: linear when |g′| < 1.
H: Hybrid methods
- Brent's method combines bisection, secant and inverse quadratic interpolation.
- Guaranteed convergence with fast local speed.
- MATLAB's fzero and SciPy's brentq use it.
H: Practical issues
- Multiple roots slow Newton to linear convergence.
- Stopping criteria: |f(x)| small, step small, or both.
- Polynomials: companion-matrix eigenvalues find all roots.
- Systems of equations: multivariate Newton with Jacobians.
X: f(x) = x^{3} − 2x − 5 has f(2) = −1 and f(3) = 16. Which methods can start from this information?
> The sign change brackets a root in [2, 3], so bisection, false position and Brent can start
> Newton can start from x₀ = 2 using f′(x) = 3x^{2} − 2
> Newton converges rapidly to the root ≈ 2.0946 (Wallis's classic example)
K: Bracketing methods are safe and slow; open methods are fast but can fail; Brent's hybrid gives both; multiplicity, stopping rules and systems need care.
!: Using Newton far from a root without safeguards.
Q: What order of convergence does the secant method have? | About 1.618.
Q: Which hybrid root-finder is widely used? | Brent's method.
SUM: Bracket for safety, open for speed.
SUM: Hybrids combine both.
SRC: Brent RP, Algorithms for Minimization without Derivatives (Prentice Hall 1973; Dover 2002) | textbook | 2002 | https://store.doverpublications.com/
SRC: Press WH, Teukolsky SA, Vetterling WT, Flannery BP, Numerical Recipes (3rd edn, Cambridge University Press 2007) | textbook | 2007 | https://numerical.recipes/
NUM1#maths-u19-09-q1@1: One Newton step for x^{3} − 2x − 5 from x₀ = 2: what is x₁? | 2.1 | 0.0001 |  | f(2) = −1 and f′(2) = 10, so x₁ = 2 + 1/10 = 2.1.
M1#maths-u19-09-q2@1: Which method is guaranteed to converge for a continuous function with a sign change? | Bisection | Newton's method | The secant method | Fixed-point iteration | Steffensen's method | Bisection always keeps a root inside a halving bracket.
M2#maths-u19-09-q3@2: Why does Newton's method slow down at a double root? | f′ also vanishes at the root, so convergence drops from quadratic to linear | Double roots don't exist for smooth functions, so it never happens | Newton's method never converges to any root, whatever its multiplicity | The derivative becomes infinite at a double root, so steps vanish | It speeds up at double roots, since the function is flatter there | With f′(x*) = 0, the error is only roughly halved each step.

## Bisection Method
S: The bisection method halves an interval containing a sign change, keeping the half where the sign still changes. It's slow but completely reliable, and you can predict in advance exactly how many steps are needed for any accuracy.
O: Carry out bisection steps
O: Calculate the number of iterations for a given tolerance
T: Intermediate value theorem | A continuous function with f(a) and f(b) of opposite signs has a root in (a, b)
T: Bisection error bound | After n steps the root lies within (b − a)/2ⁿ⁺¹ of the midpoint
H: Algorithm
- Start with [a, b] where f(a)f(b) < 0.
- Compute m = (a + b)/2 and f(m).
- Replace a or b by m, keeping the sign change.
- Stop when the interval is small enough.
H: Convergence
- The interval halves each step: linear convergence with ratio ½.
- About 3.3 steps per decimal digit.
- Needs n ≥ log₂((b − a)/tol) steps for an interval of width tol.
- Uses only signs, so it's robust to noise in f.
H: Limitations
- Needs a sign change: misses roots of even multiplicity like x^{2}.
- Finds one root even if several lie in the bracket.
- Slower than Newton or secant.
- Discontinuous functions can give false roots (1/x on [−1, 1]).
X: Use bisection on f(x) = x^{2} − 2 in [1, 2] for three steps.
> m = 1.5: f = 0.25 > 0, so the root is in [1, 1.5]
> m = 1.25: f = −0.4375 < 0, so [1.25, 1.5]
> m = 1.375: f = −0.109 < 0, so [1.375, 1.5]: √2 ≈ 1.414 lies inside
K: Bisection halves a sign-change bracket each step; it's guaranteed and predictable but linear; it can't find roots without a sign change and may be fooled by discontinuities.
!: Applying bisection to a discontinuous function and trusting the "root" it finds.
Q: By what factor does the bracket shrink per bisection step? | 2.
Q: Can bisection find the root of x^{2} = 0? | No: there's no sign change.
SUM: Halve the bracket each step.
SUM: Slow but certain.
SRC: Burden RL, Faires JD, Burden AM, Numerical Analysis (10th edn, Cengage 2016) | textbook | 2016 | https://www.cengage.com/
SRC: Süli E, Mayers DF, An Introduction to Numerical Analysis (Cambridge University Press 2003) | textbook | 2003 | https://www.cambridge.org/
NUM1#maths-u19-10-q1@1: How many bisection steps reduce a bracket of width 1 to width at most 10^{−3}? | 10 | 0 | steps | 2^{10} = 1024 ≥ 1000, while 2^{9} = 512 isn't enough, so 10 steps are needed.
M1#maths-u19-10-q2@1: On f(x) = x^{3} − x − 1 with bracket [1, 2], what is the next bracket? | [1, 1.5], since f(1.5) = 0.875 > 0 and f(1) < 0 | [1.5, 2], since f(1.5) > 0 and f(2) > 0 as well | [1, 2], unchanged, since the midpoint has no sign change | [0, 1], since the root must lie below the old bracket | [1.25, 1.5], since one bisection step always quarters it | f(1) = −1 and f(1.5) = 0.875, so the sign change is in [1, 1.5].
M2#maths-u19-10-q3@2: Why can bisection report a "root" of 1/x on [−1, 1]? | The function changes sign across its discontinuity at 0, though it has no root | 1/x really has a root at 0, so bisection reports it correctly | Bisection never stops on 1/x, so it reports the last midpoint | The bracket [−1, 1] is invalid, since 1/x has no sign change | It can't: bisection always checks continuity before it starts | The intermediate value theorem needs continuity, which 1/x lacks at 0.

## Newton–Raphson Method
S: The Newton–Raphson method finds roots by following the tangent line to where it crosses the axis. Near a simple root it converges quadratically, so it's the method of choice when derivatives are available and a good starting guess is known.
O: Apply Newton–Raphson iterations
O: Analyse convergence and failure modes
T: Newton–Raphson iteration | x_{n+1} = xₙ − f(xₙ)/f′(xₙ)
T: Basin of attraction | The set of starting points from which the iteration converges to a given root
H: Derivation and examples
- The tangent at xₙ meets the axis at xₙ − f(xₙ)/f′(xₙ).
- Square roots: f(x) = x^{2} − a gives x_{n+1} = ½(xₙ + a/xₙ) (the Babylonian method).
- Reciprocal without division: x_{n+1} = xₙ(2 − axₙ).
H: Convergence
- Quadratic near a simple root: e_{n+1} ≈ (f″/2f′) eₙ^{2}.
- Linear at multiple roots; use x − m f/f′ for multiplicity m.
- Kantorovich's theorem gives conditions guaranteeing convergence.
H: Failures
- f′ = 0 at an iterate: the step is undefined.
- Cycling: x^{3} − 2x + 2 from 0 cycles between 0 and 1.
- Divergence from poor starts; basins can be fractal (Newton fractals for z^{3} = 1).
- Safeguard with line searches or bracketing.
X: Compute √2 with Newton from x₀ = 1.
> x₁ = ½(1 + 2/1) = 1.5
> x₂ = ½(1.5 + 2/1.5) = 1.41667
> x₃ = ½(1.41667 + 1.41176) = 1.414216 (√2 = 1.414214): correct digits roughly double each step
K: Newton–Raphson follows tangents; it's quadratically convergent at simple roots, linear at multiple roots; it can cycle or diverge from poor starts, so safeguards are used.
!: Forgetting to check that f′(xₙ) isn't zero or tiny.
Q: What is the Newton iteration for √a? | x_{n+1} = ½(xₙ + a/xₙ).
Q: What convergence does Newton have at a double root? | Linear.
SUM: Follow the tangent to the axis.
SUM: Fast near roots, risky far away.
SRC: Süli E, Mayers DF, An Introduction to Numerical Analysis (Cambridge University Press 2003) | textbook | 2003 | https://www.cambridge.org/
SRC: Ypma TJ, Historical development of the Newton–Raphson method, SIAM Review 37(4), 531 | journal | 1995 | https://doi.org/10.1137/1037125
NUM1#maths-u19-11-q1@1: Apply one Newton step for √10 (f(x) = x^{2} − 10) from x₀ = 3. | 3.1667 | 0.0001 |  | x₁ = ½(3 + 10/3) = ½(6.3333) = 3.1667, against √10 ≈ 3.1623.
M1#maths-u19-11-q2@1: Newton's method on x^{3} − 2x + 2 from x₀ = 0 gives what behaviour? | It cycles between 0 and 1 forever | It converges quadratically to a root | It diverges to infinity | It stops because f′ = 0 at the start | It converges in one step | x₁ = 0 − 2/(−2) = 1 and x₂ = 1 − 1/1 = 0, so it repeats.
M3#maths-u19-11-q3@2: Why does Newton converge quadratically near a simple root? | The tangent matches f to first order, so the remaining error comes from the second-order term, proportional to eₙ^{2} | It halves the error each step because the tangent bisects the interval | It uses two starting points, so it gains two digits per iteration | Every function is exactly linear near a root, so one step suffices | It converges only linearly near simple roots, and quadratically at double roots | Taylor expansion gives e_{n+1} ≈ (f″(x*)/2f′(x*)) eₙ^{2}.

## Secant Method
S: The secant method replaces Newton's derivative with the slope through the last two points. It needs no derivatives and converges superlinearly with order about 1.618, so it's often faster than Newton per unit of work.
O: Apply the secant iteration
O: Compare the secant method with Newton and false position
T: Secant iteration | x_{n+1} = xₙ − f(xₙ)(xₙ − xₙ₋₁)/(f(xₙ) − f(xₙ₋₁))
T: Golden ratio order | The secant method's convergence order φ = (1 + √5)/2 ≈ 1.618
H: The method
- Uses two starting points and one new function evaluation per step.
- The slope (f(xₙ) − f(xₙ₋₁))/(xₙ − xₙ₋₁) approximates f′.
- Order φ ≈ 1.618: superlinear.
H: Efficiency
- Newton costs one f and one f′ per step (order 2).
- If f′ costs as much as f, two secant steps (order φ^{2} ≈ 2.618) cost the same as one Newton step.
- So secant is often more efficient.
H: Variants
- False position (regula falsi) keeps a bracket but can stall on one side.
- Illinois and Anderson–Björck modifications fix the stalling.
- Inverse quadratic interpolation uses three points (inside Brent).
- Broyden's method generalises secant to systems.
X: Apply one secant step to f(x) = x^{2} − 2 with x₀ = 1 and x₁ = 2.
> f(1) = −1 and f(2) = 2; the slope = (2 − (−1))/(2 − 1) = 3
> x₂ = 2 − 2/3 = 1.3333
> Next steps approach √2 ≈ 1.4142 superlinearly
K: The secant method approximates f′ by a difference quotient; order ≈ 1.618 with one evaluation per step; often more efficient than Newton; regula falsi and Broyden are relatives.
!: Using nearly equal xₙ and xₙ₋₁, so the slope suffers cancellation.
Q: How many function evaluations does each secant step need? | One new evaluation.
Q: Which method generalises secant to systems? | Broyden's method.
SUM: Secant swaps derivatives for differences.
SUM: Superlinear and efficient.
SRC: Burden RL, Faires JD, Burden AM, Numerical Analysis (10th edn, Cengage 2016) | textbook | 2016 | https://www.cengage.com/
SRC: Dennis JE, Schnabel RB, Numerical Methods for Unconstrained Optimization and Nonlinear Equations (SIAM 1996) | textbook | 1996 | https://epubs.siam.org/
NUM1#maths-u19-12-q1@1: Apply one secant step to f(x) = x^{2} − 4 with x₀ = 1 and x₁ = 3. | 1.75 | 0.0001 |  | f(1) = −3 and f(3) = 5, slope 8/2 = 4, so x₂ = 3 − 5/4 = 1.75.
M1#maths-u19-12-q2@1: What does the secant method use in place of f′(xₙ)? | The slope of the line through the last two iterates | The second derivative estimated at xₙ | The function value f(xₙ) divided by xₙ | A random estimate of the local slope | The midpoint of the current bracket | (f(xₙ) − f(xₙ₋₁))/(xₙ − xₙ₋₁) approximates the derivative.
M2#maths-u19-12-q3@2: Why can false position (regula falsi) converge slowly? | One endpoint can stay fixed for many steps, so the bracket shrinks from one side only | It never keeps a bracket, so it can wander away from the root | It uses exact derivatives, which are expensive to compute | It always diverges unless the function is linear | It is always fast, since it combines bisection and secant | When f is convex in the bracket, one end barely moves; Illinois-type modifications fix this.

## Fixed-Point Iteration
S: Fixed-point iteration rewrites f(x) = 0 as x = g(x) and repeats xₙ₊₁ = g(xₙ). It converges when g is a contraction near the fixed point, and the same idea underlies Newton's method, iterative linear solvers and many algorithms in analysis.
O: Rewrite equations in fixed-point form and test convergence
O: Use the contraction mapping theorem and estimate rates
T: Fixed point | A value x* with g(x*) = x*
T: Contraction | A map with |g(x) − g(y)| ≤ L|x − y| for some L < 1
H: Convergence
- If |g′(x*)| < 1, iteration converges near x* with rate about |g′(x*)|.
- If |g′(x*)| > 1, it diverges from x*.
- Banach's contraction mapping theorem: a contraction on a complete space has a unique fixed point, found by iteration.
H: Choosing g
- x^{2} − x − 2 = 0 (root 2): g(x) = √(x + 2) has |g′(2)| = 1/4: converges.
- g(x) = x^{2} − 2 has |g′(2)| = 4: diverges.
- Newton is fixed-point iteration with g′(x*) = 0: hence quadratic convergence.
H: Uses and acceleration
- Picard iteration for ODEs; Jacobi and Gauss–Seidel for linear systems.
- Aitken's Δ^{2} process accelerates linear convergence.
- Steffensen's method uses Aitken to get quadratic convergence without derivatives.
- Cobweb diagrams visualise the iteration.
X: Iterate g(x) = cos x from x₀ = 1 three times.
> x₁ = cos 1 = 0.5403
> x₂ = cos 0.5403 = 0.8576
> x₃ = cos 0.8576 = 0.6543: it oscillates towards the fixed point 0.7391, since |g′| = |sin 0.739| ≈ 0.67 < 1
K: Fixed-point iteration converges when g is a contraction, at rate |g′(x*)|; the choice of g matters; Newton is a fixed-point method with g′ = 0; Aitken and Steffensen accelerate.
!: Choosing a rearrangement with |g′(x*)| > 1 and expecting convergence.
Q: When does fixed-point iteration converge locally? | When |g′(x*)| < 1.
Q: What does Aitken's Δ^{2} process do? | Accelerates a linearly convergent sequence.
SUM: Iterate a contraction to its fixed point.
SUM: The rearrangement matters.
SRC: Süli E, Mayers DF, An Introduction to Numerical Analysis (Cambridge University Press 2003) | textbook | 2003 | https://www.cambridge.org/
SRC: Burden RL, Faires JD, Burden AM, Numerical Analysis (10th edn, Cengage 2016) | textbook | 2016 | https://www.cengage.com/
NUM1#maths-u19-13-q1@1: For g(x) = √(x + 2) at its fixed point 2, what is the asymptotic convergence rate |g′(2)|? | 0.25 | 0.001 |  | g′(x) = 1/(2√(x + 2)), so g′(2) = 1/(2 × 2) = 0.25: each step cuts the error by about 4.
M1#maths-u19-13-q2@1: Which rearrangement of x^{2} − x − 2 = 0 converges to the root x = 2? | x = √(x + 2) | x = x^{2} − 2 | x = 2/(x − 1) | x = 2x^{2} − x − 2 | x = x^{3} − 6 | Its derivative at 2 is 1/4, below 1; x = x^{2} − 2 has derivative 4 there.
M2#maths-u19-13-q3@2: Why does Newton's method converge faster than a typical fixed-point iteration? | As a fixed-point map its derivative is zero at the root, so the linear error term vanishes | It uses a contraction with constant 0.9, which is very fast | It needs no starting point, so it begins at the exact root | It always converges globally, from any starting value | It doesn't: fixed-point iteration is always faster than Newton | With g′(x*) = 0, the error is controlled by the quadratic term.

## Polynomial Interpolation
S: Polynomial interpolation finds the unique polynomial of degree at most n through n + 1 data points. It underlies numerical integration and differentiation, but high-degree interpolation at equally spaced points can oscillate wildly, the Runge phenomenon.
O: State existence and uniqueness of interpolating polynomials
O: Use the interpolation error formula and explain the Runge phenomenon
T: Interpolating polynomial | The polynomial p of degree ≤ n with p(xᵢ) = yᵢ at n + 1 distinct nodes
T: Runge phenomenon | Large oscillations near the ends of an interval when interpolating at many equally spaced points
H: Basics
- n + 1 distinct points determine a unique polynomial of degree ≤ n.
- Forms: Lagrange, Newton divided differences, barycentric.
- The Vandermonde system is ill-conditioned, so it isn't used directly.
H: Error
- f(x) − p(x) = f^{(n+1)}(ξ)/(n + 1)! × Π (x − xᵢ).
- The node polynomial Π(x − xᵢ) is smallest (in max norm) for Chebyshev nodes.
- Runge's example: f(x) = 1/(1 + 25x^{2}) on [−1, 1] diverges with equispaced nodes.
- Chebyshev nodes xᵢ = cos((2i + 1)π/(2n + 2)) fix this.
H: Uses
- Quadrature (Newton–Cotes, Gaussian) and finite differences.
- Barycentric interpolation is fast and stable.
- Splines avoid high degree altogether.
- Chebfun interpolates at Chebyshev points to machine precision.
X: Find the quadratic through (0, 1), (1, 3) and (2, 7).
> Try p(x) = ax^{2} + bx + c; p(0) = 1 gives c = 1
> p(1) = a + b + 1 = 3 and p(2) = 4a + 2b + 1 = 7, giving a + b = 2 and 2a + b = 3
> a = 1, b = 1: p(x) = x^{2} + x + 1
K: n + 1 points give a unique degree-n interpolant; the error depends on f^{(n+1)} and the node polynomial; equispaced high-degree interpolation suffers the Runge phenomenon; Chebyshev nodes avoid it.
!: Interpolating many equally spaced points with one high-degree polynomial.
Q: How many points determine a cubic interpolant? | 4.
Q: Which nodes avoid the Runge phenomenon? | Chebyshev nodes.
SUM: Unique polynomial through the data.
SUM: Node choice controls the error.
SRC: Trefethen LN, Approximation Theory and Approximation Practice (extended edn, SIAM 2019) | textbook | 2019 | https://people.maths.ox.ac.uk/trefethen/ATAP/
SRC: Berrut JP, Trefethen LN, Barycentric Lagrange interpolation, SIAM Review 46(3), 501 | journal | 2004 | https://doi.org/10.1137/S0036144502417715
NUM1#maths-u19-14-q1@1: Using the interpolant p(x) = x^{2} + x + 1 through (0, 1), (1, 3) and (2, 7), estimate the value at x = 3. | 13 | 0 |  | p(3) = 9 + 3 + 1 = 13 (an extrapolation, so less reliable than interpolation).
M1#maths-u19-14-q2@1: How many distinct nodes are needed to determine a unique polynomial of degree at most 5? | 6 | 5 | 4 | 7 | 10 | Degree ≤ n needs n + 1 conditions, so degree 5 needs 6 points.
M3#maths-u19-14-q3@2: Why do Chebyshev nodes reduce interpolation error compared with equispaced nodes? | They cluster near the ends, minimising the maximum of the node polynomial Π(x − xᵢ) | They are evenly spaced, which spreads the error uniformly | They make the function being interpolated smoother | They use fewer points, so there's less to go wrong | They don't reduce error; they only make computation faster | The error formula contains Π(x − xᵢ), which Chebyshev nodes make as small as possible in max norm.

## Lagrange Interpolation
S: The Lagrange form writes the interpolating polynomial as a weighted sum of basis polynomials, each equal to 1 at one node and 0 at the others. It's elegant for theory, and its barycentric version is a fast and stable way to compute.
O: Construct Lagrange basis polynomials and the interpolant
O: Use the barycentric formula
T: Lagrange basis polynomial | ℓᵢ(x) = Π_{j≠i} (x − xⱼ)/(xᵢ − xⱼ), with ℓᵢ(xⱼ) = 1 if i = j and 0 otherwise
T: Barycentric formula | p(x) = Σ (wᵢ/(x − xᵢ))yᵢ / Σ (wᵢ/(x − xᵢ)), with weights wᵢ = 1/Π_{j≠i}(xᵢ − xⱼ)
H: The Lagrange form
- p(x) = Σ yᵢℓᵢ(x).
- No linear system to solve.
- The basis polynomials sum to 1 (they interpolate the constant 1).
H: Computation
- Direct evaluation costs O(n^{2}) per point.
- Barycentric form: O(n) per point after O(n^{2}) setup; adding a node costs O(n).
- Numerically stable (Higham 2004).
- Chebyshev points have simple explicit weights.
H: Theory
- Lebesgue constant Λₙ = max Σ |ℓᵢ(x)| measures how interpolation amplifies errors.
- Λₙ grows like 2ⁿ for equispaced nodes but only like log n for Chebyshev nodes.
- Lagrange interpolation underlies quadrature weights and spectral methods.
X: Write the Lagrange interpolant through (1, 2) and (3, 6) and evaluate at x = 2.
> ℓ₀(x) = (x − 3)/(1 − 3) = (3 − x)/2 and ℓ₁(x) = (x − 1)/(3 − 1) = (x − 1)/2
> p(x) = 2(3 − x)/2 + 6(x − 1)/2 = (3 − x) + 3(x − 1) = 2x
> p(2) = 4
K: Lagrange basis polynomials are 1 at one node and 0 at the others; p = Σ yᵢℓᵢ; the barycentric form is fast and stable; Lebesgue constants measure error amplification and favour Chebyshev nodes.
!: Re-evaluating the full product form for every new point instead of using barycentric weights.
Q: What is Σ ℓᵢ(x) for any x? | 1.
Q: How fast does the Lebesgue constant grow for Chebyshev nodes? | Like log n.
SUM: Basis polynomials pick out each data value.
SUM: Barycentric form computes it well.
SRC: Berrut JP, Trefethen LN, Barycentric Lagrange interpolation, SIAM Review 46(3), 501 | journal | 2004 | https://doi.org/10.1137/S0036144502417715
SRC: Higham NJ, The numerical stability of barycentric Lagrange interpolation, IMA Journal of Numerical Analysis 24(4), 547 | journal | 2004 | https://doi.org/10.1093/imanum/24.4.547
NUM1#maths-u19-15-q1@1: For nodes 0, 1 and 2, evaluate the Lagrange basis polynomial ℓ₁(x) = x(x − 2)/(1 × (1 − 2)) at x = 0.5. | 0.75 | 0.001 |  | ℓ₁(0.5) = 0.5 × (−1.5)/(−1) = 0.75.
M1#maths-u19-15-q2@1: What value does the Lagrange basis polynomial ℓᵢ take at node xⱼ with j ≠ i? | 0 | 1 | yᵢ | −1 | xⱼ | Each basis polynomial vanishes at every node except its own.
M2#maths-u19-15-q3@2: What is the main computational advantage of the barycentric formula? | Evaluation costs O(n) per point and is numerically stable | It needs no data values | It makes the polynomial degree smaller | It avoids using nodes | It has no advantage | After precomputing weights, each evaluation is a short weighted sum.

## Newton Interpolation
S: Newton's form builds the interpolating polynomial term by term using divided differences. Adding a new data point just adds one term, and divided differences approximate derivatives, which links interpolation to Taylor series.
O: Compute divided difference tables
O: Build and extend the Newton form of an interpolant
T: Divided difference | f[x₀, …, xₖ], defined recursively by f[xᵢ] = f(xᵢ) and f[xᵢ, …, xⱼ] = (f[xᵢ₊₁, …, xⱼ] − f[xᵢ, …, xⱼ₋₁])/(xⱼ − xᵢ)
T: Newton form | p(x) = f[x₀] + f[x₀, x₁](x − x₀) + f[x₀, x₁, x₂](x − x₀)(x − x₁) + …
H: Building the table
- First column: function values.
- Each next column: differences of neighbours divided by the spread of nodes.
- The top diagonal gives the Newton coefficients.
H: Properties
- Adding a node adds one term; earlier coefficients stay the same.
- Evaluate efficiently by nested (Horner-like) multiplication.
- f[x₀, …, xₙ] = f^{(n)}(ξ)/n! for some ξ: a scaled derivative.
- Repeated nodes give Hermite interpolation (matching derivatives).
H: Equal spacing
- Forward differences Δfᵢ = fᵢ₊₁ − fᵢ.
- Gregory–Newton formulas for tabulated data.
- Finite-difference tables detect errors in tabulated values.
X: Build the Newton interpolant for (0, 1), (1, 3), (2, 7).
> First differences: (3 − 1)/1 = 2 and (7 − 3)/1 = 4
> Second difference: (4 − 2)/(2 − 0) = 1
> p(x) = 1 + 2x + 1 × x(x − 1) = x^{2} + x + 1, matching the earlier answer
K: Newton's form uses divided differences; it extends easily when nodes are added; divided differences approximate scaled derivatives; repeated nodes give Hermite interpolation.
!: Dividing by the wrong node spacing in higher-order divided differences.
Q: What does adding a new node do to the Newton form? | Adds one new term without changing earlier coefficients.
Q: What is f[x₀, x₁] for f(x) = x^{2}? | x₀ + x₁.
SUM: Divided differences build the interpolant.
SUM: Easy to extend.
SRC: Burden RL, Faires JD, Burden AM, Numerical Analysis (10th edn, Cengage 2016) | textbook | 2016 | https://www.cengage.com/
SRC: de Boor C, A Practical Guide to Splines (rev. edn, Springer 2001) | textbook | 2001 | https://link.springer.com/
NUM1#maths-u19-16-q1@1: For f(x) = x^{3} at nodes 0, 1, 2 and 3, what is the third divided difference f[0, 1, 2, 3]? | 1 | 0 |  | The nth divided difference of a degree-n polynomial is its leading coefficient, here 1 (f‴/3! = 6/6).
M1#maths-u19-16-q2@1: For data (1, 2), (2, 5), (4, 11), what is the second divided difference f[1, 2, 4]? | 0 | 1 | 3 | 2 | 6 | f[1, 2] = 3 and f[2, 4] = 3, so f[1, 2, 4] = (3 − 3)/(4 − 1) = 0: the data lie on a line.
M2#maths-u19-16-q3@2: Why is Newton's form convenient when data arrive one point at a time? | A new point adds a single term while existing coefficients stay unchanged | It needs no divided differences, only the raw function values | It makes the interpolating polynomial linear whatever the data | It discards old points, so only the newest point is ever used | It isn't convenient; the whole polynomial must be recomputed | The divided difference table grows by one diagonal, giving one new coefficient.

## Spline Interpolation
S: Splines join low-degree polynomial pieces smoothly at points called knots, avoiding the wild oscillations of high-degree interpolation. Cubic splines are the standard choice in computer graphics, CAD and data smoothing.
O: Define cubic splines and their continuity conditions
O: Compare natural, clamped and not-a-knot end conditions
T: Cubic spline | A piecewise cubic with continuous value, first and second derivatives at the knots
T: Natural spline | A cubic spline with zero second derivative at both ends
H: Construction
- n intervals give 4n unknown coefficients.
- Interpolation and continuity of s, s′ and s″ give 4n − 2 equations.
- Two end conditions complete the system.
- The system is tridiagonal, solved in O(n) operations.
H: End conditions
- Natural: s″ = 0 at the ends (minimises ∫ s″^{2}: the "draughtsman's spline").
- Clamped: specify s′ at the ends.
- Not-a-knot: third derivative continuous at the second and penultimate knots.
- Periodic: for closed curves.
H: Related tools
- B-splines: a local basis, stable to compute (de Boor's algorithm).
- Bézier curves and NURBS in CAD and fonts.
- Smoothing splines balance fit and roughness for noisy data.
- Error for cubic splines is O(h^{4}) for smooth functions.
X: How many unknowns and conditions does a cubic spline through 5 points have?
> 5 points give 4 intervals, each with a cubic (4 coefficients): 16 unknowns
> Interpolation: 8 equations (2 per interval); continuity of s′ and s″ at 3 interior knots: 6 equations
> That's 14, so 2 end conditions are needed
K: Cubic splines are piecewise cubics with C^{2} continuity; end conditions close the tridiagonal system; B-splines and NURBS are practical forms; error is O(h^{4}).
!: Using a single high-degree polynomial where a spline would be smoother and more stable.
Q: Which spline minimises the integral of s″^{2}? | The natural cubic spline.
Q: What kind of linear system determines a cubic spline? | A tridiagonal system.
SUM: Splines are smooth piecewise polynomials.
SUM: End conditions complete them.
SRC: de Boor C, A Practical Guide to Splines (rev. edn, Springer 2001) | textbook | 2001 | https://link.springer.com/
SRC: Schoenberg IJ, Contributions to the problem of approximation of equidistant data by analytic functions, Quarterly of Applied Mathematics 4, 45 | journal | 1946 | https://doi.org/10.1090/qam/15914
NUM1#maths-u19-17-q1@1: How many unknown coefficients does a cubic spline with 10 intervals have? | 40 | 0 |  | Each interval has a cubic with 4 coefficients: 10 × 4 = 40.
M1#maths-u19-17-q2@1: Which derivatives of a cubic spline are continuous at the interior knots? | The first and second derivatives | Only the first derivative | All derivatives of every order | Only the function values | The third derivative only | Cubic splines are C^{2}: value, slope and curvature match across knots.
M2#maths-u19-17-q3@2: Why are B-splines preferred for computation over the piecewise-power form? | Each basis function is non-zero on only a few intervals, giving local control and stable evaluation | They have higher degree than ordinary cubic splines, so they're more accurate | They need no knots, so the mesh never has to be chosen at all | They are single global polynomials, which avoids joining pieces | They aren't preferred; the piecewise-power form is the standard choice | Local support makes changes local and keeps the linear systems well conditioned.

## Numerical Differentiation
S: Numerical differentiation estimates derivatives from function values using finite differences. It's simple, but there's a trade-off: smaller steps cut truncation error but magnify rounding error, so the best step size is not the smallest.
O: Apply forward, backward and central difference formulas
O: Choose step sizes balancing truncation and rounding error
T: Central difference | f′(x) ≈ (f(x + h) − f(x − h))/(2h), with error O(h^{2})
T: Complex-step derivative | f′(x) ≈ Im f(x + ih)/h, free of subtractive cancellation
H: Formulas
- Forward: (f(x + h) − f(x))/h, error O(h).
- Central: (f(x + h) − f(x − h))/2h, error O(h^{2}).
- Second derivative: (f(x + h) − 2f(x) + f(x − h))/h^{2}, error O(h^{2}).
- Richardson extrapolation raises the order.
H: Choosing h
- Total error ≈ Ch^{p} + ε/h for unit roundoff ε.
- Forward difference: optimal h ≈ √ε ≈ 10^{−8} in double precision.
- Central difference: h ≈ ε^{1/3} ≈ 10^{−5}.
- Too small an h gives noise-dominated results.
H: Alternatives
- Automatic differentiation computes exact derivatives of code (used in machine learning).
- Complex step: accurate to machine precision with tiny h, for analytic functions.
- Spectral differentiation for smooth periodic data.
- Smoothing before differentiating noisy data.
X: Estimate the derivative of eˣ at x = 0 with h = 0.1 using forward and central differences.
> Forward: (e^{0.1} − 1)/0.1 = (1.10517 − 1)/0.1 = 1.0517 (error 0.052)
> Central: (e^{0.1} − e^{−0.1})/0.2 = (1.10517 − 0.90484)/0.2 = 1.00167 (error 0.0017)
> Central is far more accurate, as O(h^{2}) predicts
K: Finite differences approximate derivatives; central differences are second order; truncation and rounding errors trade off, giving optimal h; automatic and complex-step differentiation avoid the trade-off.
!: Taking h as small as possible, such as 10^{−15}, and getting rounding noise.
Q: What is the error order of the central difference? | O(h^{2}).
Q: What is the optimal forward-difference step in double precision? | About 10^{−8}.
SUM: Differences approximate derivatives.
SUM: Balance truncation against rounding.
SRC: Fornberg B, Generation of finite difference formulas on arbitrarily spaced grids, Mathematics of Computation 51, 699 | journal | 1988 | https://doi.org/10.1090/S0025-5718-1988-0935077-0
SRC: Griewank A, Walther A, Evaluating Derivatives: Principles and Techniques of Algorithmic Differentiation (2nd edn, SIAM 2008) | textbook | 2008 | https://epubs.siam.org/
NUM1#maths-u19-18-q1@1: Use the central difference with h = 0.1 to estimate the derivative of x^{3} at x = 1. | 3.01 | 0.0001 |  | (1.1^{3} − 0.9^{3})/0.2 = (1.331 − 0.729)/0.2 = 3.01; the exact value is 3, with error h^{2} = 0.01.
M1#maths-u19-18-q2@1: Which finite-difference formula has error O(h^{2})? | (f(x + h) − f(x − h))/(2h) | (f(x + h) − f(x))/h | (f(x) − f(x − h))/h | f(x + h)/h | (f(x + 2h) − f(x))/h | Odd error terms cancel in the symmetric central difference.
M2#maths-u19-18-q3@2: Why does a forward difference with h = 10^{−15} give a poor derivative? | Rounding error of size ε/h dominates when h is tiny | Truncation error grows as h shrinks | Derivatives don't exist at that scale | The formula needs h = 1 | It gives an excellent derivative | f(x + h) and f(x) agree in nearly all digits, so their difference is mostly rounding noise.

## Gaussian Quadrature
S: Gaussian quadrature chooses both the nodes and the weights of an integration rule to be as accurate as possible. With n points it integrates every polynomial up to degree 2n − 1 exactly, roughly twice the degree of rules with fixed equally spaced points.
O: Apply Gauss–Legendre rules with two and three points
O: Explain degree of exactness and the role of orthogonal polynomials
T: Degree of exactness | The largest degree d such that the rule integrates all polynomials of degree ≤ d exactly
T: Gauss–Legendre nodes | The roots of the Legendre polynomial Pₙ, used as quadrature points on [−1, 1]
H: The rules
- Two points on [−1, 1]: nodes ±1/√3, weights 1: exact up to cubics.
- Three points: nodes 0, ±√(3/5) with weights 8/9, 5/9, 5/9: exact up to degree 5.
- Change of variable x = (a + b)/2 + (b − a)t/2 maps to [a, b].
H: Why it works
- Nodes are roots of orthogonal polynomials for the weight function.
- Weights are positive, so the rules are stable.
- For smooth (analytic) functions, error falls exponentially with n.
- Golub–Welsch: nodes and weights from an eigenvalue problem.
H: Variants and comparisons
- Gauss–Hermite (weight e^{−x^{2}}), Gauss–Laguerre (e^{−x}), Gauss–Chebyshev.
- Gauss–Kronrod adds points to estimate the error (used in adaptive codes like QUADPACK).
- Newton–Cotes (trapezium, Simpson) use equal spacing: lower degree, simpler.
- Clenshaw–Curtis is competitive in practice.
X: Use two-point Gauss–Legendre to integrate x^{3} + x^{2} over [−1, 1].
> Nodes t = ±1/√3 ≈ ±0.57735, weights 1
> f(0.57735) + f(−0.57735) = (0.19245 + 0.33333) + (−0.19245 + 0.33333) = 0.66667
> Exact: ∫ x^{2} = 2/3 (the cubic integrates to 0), so the rule is exact
K: Gauss rules pick optimal nodes and weights; n points give degree 2n − 1 exactness; nodes are roots of orthogonal polynomials; weights are positive; Gauss–Kronrod estimates errors adaptively.
!: Forgetting to rescale nodes and weights when the interval isn't [−1, 1].
Q: What degree of exactness does an n-point Gauss rule have? | 2n − 1.
Q: What are the two-point Gauss–Legendre nodes? | ±1/√3.
SUM: Optimal nodes double the exactness.
SUM: Orthogonal polynomials supply the nodes.
SRC: Davis PJ, Rabinowitz P, Methods of Numerical Integration (2nd edn, Academic Press 1984; Dover 2007) | textbook | 2007 | https://store.doverpublications.com/
SRC: Golub GH, Welsch JH, Calculation of Gauss quadrature rules, Mathematics of Computation 23, 221 | journal | 1969 | https://doi.org/10.1090/S0025-5718-69-99647-1
NUM1#maths-u19-19-q1@1: What is the highest polynomial degree a 4-point Gauss–Legendre rule integrates exactly? | 7 | 0 |  | 2n − 1 = 2 × 4 − 1 = 7.
M1#maths-u19-19-q2@1: Which rule integrates all quintic polynomials exactly on [−1, 1]? | Three-point Gauss–Legendre | Two-point Gauss–Legendre | The trapezium rule | Simpson's rule with one panel | The midpoint rule | Three Gauss points give degree 2 × 3 − 1 = 5; Simpson is exact only to degree 3.
M3#maths-u19-19-q3@2: Why can Gaussian quadrature reach degree 2n − 1 with only n points? | Choosing the n nodes as well as the n weights gives 2n free parameters to match 2n moments | It uses equally spaced nodes with carefully tuned weights | It integrates only even functions, which halves the work | All its weights equal 1, which doubles the degree | It can't: n points always give degree n − 1 at most | With nodes at orthogonal polynomial roots, the rule matches ∫ xᵏ for k = 0 to 2n − 1.

## Iterative Solvers
S: Iterative solvers find the solution of Ax = b by improving a guess step by step, rather than factorising A. For the huge sparse systems from PDEs and networks they need far less memory and time than direct methods, especially with good preconditioning.
O: Apply Jacobi and Gauss–Seidel iterations
O: Explain convergence conditions, Krylov methods and preconditioning
T: Spectral radius | ρ(M), the largest absolute eigenvalue; a stationary iteration x ← Mx + c converges for all starts iff ρ(M) < 1
T: Preconditioner | A matrix P approximating A, chosen so P^{−1}A is better conditioned and easy to apply
H: Stationary methods
- Jacobi: update every component from the previous iterate.
- Gauss–Seidel: use new values as soon as they're computed; often twice as fast.
- SOR: over-relaxation with factor ω to accelerate Gauss–Seidel.
- Converge for strictly diagonally dominant matrices.
H: Krylov subspace methods
- Search in span{b, Ab, A^{2}b, …}.
- Conjugate gradients (symmetric positive definite), GMRES (general), BiCGSTAB.
- Convergence depends on the eigenvalue distribution.
H: Preconditioning and multigrid
- Incomplete LU and incomplete Cholesky.
- Multigrid solves Poisson problems in O(n) work.
- Domain decomposition for parallel computing.
- Direct sparse solvers remain competitive for moderate sizes.
X: Do one Jacobi step for 4x + y = 9, x + 3y = 7 from (0, 0).
> x₁ = (9 − y₀)/4 = 9/4 = 2.25
> y₁ = (7 − x₀)/3 = 7/3 ≈ 2.33
> The exact solution is (20/11, 19/11) ≈ (1.82, 1.73); iterations converge because the matrix is diagonally dominant
K: Jacobi, Gauss–Seidel and SOR converge when the spectral radius is below 1; Krylov methods like CG and GMRES are faster; preconditioning and multigrid make large sparse systems tractable.
!: Applying Jacobi to a matrix that isn't diagonally dominant without checking convergence.
Q: Which method uses updated values immediately? | Gauss–Seidel.
Q: Which Krylov method suits symmetric positive definite matrices? | Conjugate gradients.
SUM: Iterate to solve large sparse systems.
SUM: Preconditioning is the key.
SRC: Saad Y, Iterative Methods for Sparse Linear Systems (2nd edn, SIAM 2003) | textbook | 2003 | https://epubs.siam.org/
SRC: Briggs WL, Henson VE, McCormick SF, A Multigrid Tutorial (2nd edn, SIAM 2000) | textbook | 2000 | https://epubs.siam.org/
NUM1#maths-u19-20-q1@1: Do one Gauss–Seidel step for 4x + y = 9, x + 3y = 7 from (0, 0). What is the new y? | 1.5833 | 0.0001 |  | x₁ = 9/4 = 2.25, then y₁ = (7 − 2.25)/3 = 1.5833, using the new x immediately.
M1#maths-u19-20-q2@1: What condition guarantees Jacobi iteration converges? | The matrix is strictly diagonally dominant | The matrix is singular | The right-hand side is zero | The matrix has a zero diagonal | The matrix is upper triangular with zeros | Diagonal dominance makes the iteration matrix's spectral radius less than 1.
M2#maths-u19-20-q3@2: Why are iterative solvers preferred for very large sparse systems? | They need only matrix–vector products, avoiding the fill-in and memory of factorisation | They always give exact answers in a fixed number of steps | Direct methods can't solve sparse systems at all | They need no starting guess and no stopping test | They aren't preferred; direct LU is always faster | LU factors of sparse matrices can be much denser than A itself.

## Conjugate Gradient Method
S: The conjugate gradient method solves symmetric positive definite systems by minimising a quadratic along mutually conjugate directions. In exact arithmetic it finishes in at most n steps, and in practice it converges much faster when eigenvalues cluster.
O: Explain conjugacy and the minimisation view of CG
O: Use the condition-number bound on CG convergence
T: A-conjugate directions | Vectors pᵢ, pⱼ with pᵢᵀApⱼ = 0 for i ≠ j
T: Energy norm | ‖x‖_{A} = √(xᵀAx), the norm in which CG minimises the error
H: The idea
- Solving Ax = b ⇔ minimising φ(x) = ½xᵀAx − bᵀx when A is SPD.
- Each step minimises φ along a new direction conjugate to all previous ones.
- Only short recurrences: one matrix–vector product per iteration.
- Hestenes and Stiefel (1952).
H: Convergence
- Exact in at most n steps without rounding.
- ‖e_{k}‖_{A} ≤ 2((√κ − 1)/(√κ + 1))ᵏ ‖e₀‖_{A}.
- Iterations needed scale with √κ, not κ (as for steepest descent).
- Clustered eigenvalues give rapid convergence.
H: Practice
- Preconditioned CG with incomplete Cholesky or multigrid.
- Rounding causes loss of conjugacy, but CG still converges.
- Used in finite elements, image reconstruction, optimisation (Newton–CG).
- Nonlinear CG variants for optimisation.
X: A has κ = 100. Estimate the CG error reduction factor per iteration.
> √κ = 10
> Factor (√κ − 1)/(√κ + 1) = 9/11 ≈ 0.82
> About 12 iterations reduce the error bound by 10 (0.82^{12} ≈ 0.09), compared with about 115 for steepest descent
K: CG minimises a quadratic along A-conjugate directions; it terminates in n steps in exact arithmetic; convergence depends on √κ; preconditioning makes it the standard SPD solver.
!: Using CG on a matrix that isn't symmetric positive definite.
Q: In which norm does CG minimise the error? | The energy (A-) norm.
Q: Who introduced the conjugate gradient method? | Hestenes and Stiefel (1952).
SUM: CG minimises along conjugate directions.
SUM: It converges with √κ.
SRC: Hestenes MR, Stiefel E, Methods of conjugate gradients for solving linear systems, Journal of Research of the National Bureau of Standards 49(6), 409 | journal | 1952 | https://doi.org/10.6028/jres.049.044
SRC: Shewchuk JR, An Introduction to the Conjugate Gradient Method Without the Agonizing Pain (Carnegie Mellon University 1994) | review | 1994 | https://www.cs.cmu.edu/~quake-papers/painless-conjugate-gradient.pdf
NUM1#maths-u19-21-q1@1: For κ = 400, what is the CG error-bound reduction factor (√κ − 1)/(√κ + 1), to 3 decimal places? | 0.905 | 0.001 |  | √400 = 20, so the factor is 19/21 ≈ 0.905.
M1#maths-u19-21-q2@1: Which systems is the standard conjugate gradient method designed for? | Symmetric positive definite systems | Any square nonsingular system | Rectangular least-squares systems | Systems with complex eigenvalues | Singular systems | CG's minimisation view requires A to be SPD; GMRES handles general matrices.
M2#maths-u19-21-q3@2: Why does CG usually converge much faster than steepest descent? | Its iteration count scales with √κ rather than κ, because it never undoes progress in earlier directions | It uses the exact inverse matrix, so it finishes in one step | It needs no matrix–vector products, only vector additions | It only works for diagonal matrices, where it's trivially fast | It doesn't: steepest descent is usually faster than conjugate gradients | Conjugacy keeps each new step from spoiling the minimisation in previous directions.

## Gradient-Based Methods
S: Gradient-based methods use derivative information to solve numerical problems, from minimising functions to fitting models and computing sensitivities. Automatic differentiation and adjoint methods make gradients cheap even for huge simulations.
O: Describe how gradients are computed: analytic, finite difference, automatic, adjoint
O: Explain why reverse-mode differentiation costs little more than one function evaluation
T: Reverse-mode automatic differentiation | Computing all partial derivatives of a scalar output by propagating sensitivities backwards through the computation (backpropagation)
T: Adjoint method | Computing gradients of an objective constrained by a differential equation by solving one extra (adjoint) equation
H: Ways to get gradients
- Analytic formulas (error-prone by hand).
- Finite differences: n + 1 evaluations for n parameters, with truncation error.
- Forward-mode AD: one pass per input direction.
- Reverse-mode AD: one backward pass for all inputs of a scalar output.
H: Cost
- Reverse mode costs a small constant multiple (≈ 2–5) of one function evaluation, however many parameters.
- Memory to store the forward computation is the main cost (checkpointing reduces it).
- Neural network training relies on this (backpropagation).
H: Uses
- Optimisation of designs (aerodynamic shapes via adjoints).
- Parameter estimation and data assimilation (4D-Var weather forecasting).
- Sensitivity analysis.
- Libraries: JAX, PyTorch, Enzyme.
X: For f(x, y) = xy + sin x, compute ∇f at (π, 2) by reverse-mode thinking.
> Forward pass: a = xy = 2π, b = sin π = 0, f = 2π
> Backward: ∂f/∂a = 1 and ∂f/∂b = 1; ∂f/∂x = y × 1 + cos x × 1 = 2 − 1 = 1; ∂f/∂y = x = π
> ∇f(π, 2) = (1, π)
K: Gradients come from analytic formulas, finite differences, forward or reverse AD, or adjoints; reverse mode gives all partials for a constant multiple of the function cost; this powers optimisation and ML.
!: Using finite differences for gradients with millions of parameters.
Q: What is backpropagation? | Reverse-mode automatic differentiation applied to neural networks.
Q: How many finite-difference evaluations does a gradient in n variables need? | n + 1 (forward differences).
SUM: Gradients guide numerical methods.
SUM: Reverse mode makes them cheap.
SRC: Griewank A, Walther A, Evaluating Derivatives: Principles and Techniques of Algorithmic Differentiation (2nd edn, SIAM 2008) | textbook | 2008 | https://epubs.siam.org/
SRC: Baydin AG, Pearlmutter BA, Radul AA, Siskind JM, Automatic differentiation in machine learning: a survey, Journal of Machine Learning Research 18(153), 1 | journal | 2018 | https://jmlr.org/papers/v18/17-468.html
NUM1#maths-u19-22-q1@1: A model has 1000 parameters. How many function evaluations does a forward-difference gradient need? | 1001 | 0 |  | One base evaluation plus one perturbed evaluation for each of the 1000 parameters.
M1#maths-u19-22-q2@1: Which method gives the full gradient of a scalar function for roughly the cost of a few function evaluations? | Reverse-mode automatic differentiation | Forward-mode automatic differentiation | Forward finite differences | Central finite differences | Symbolic expansion by hand | One backward sweep yields every partial derivative of a scalar output.
M2#maths-u19-22-q3@2: What is the main cost of reverse-mode differentiation? | Memory to store the intermediate values of the forward pass | Many more arithmetic operations than the function | Truncation error in the derivatives | Needing a second derivative | It has no costs | The backward pass needs values from the forward pass, which checkpointing trades for recomputation.

## Numerical Optimisation
S: Numerical optimisation turns the theory of minimisation into working algorithms: line searches, trust regions, and methods from gradient descent to Newton. Robust software combines them with convergence tests and careful scaling.
O: Explain line-search and trust-region strategies
O: Choose an algorithm from the available derivatives and problem size
T: Wolfe conditions | Line-search conditions requiring sufficient decrease (Armijo) and sufficient change in slope (curvature)
T: Trust region | A region around the current point where a model of f is trusted; the step minimises the model within it
H: Globalisation
- Line search: pick a direction, then a step length meeting the Wolfe conditions.
- Trust region: pick a radius, minimise a quadratic model inside it, adjust the radius by how well the model predicted.
- Both ensure convergence from poor starting points.
H: Choosing a method
- Small, smooth problems with Hessians: Newton with a trust region.
- Medium to large with gradients: BFGS or L-BFGS.
- Very large with Hessian–vector products: Newton–CG.
- No derivatives: Nelder–Mead, pattern search, or model-based methods (BOBYQA).
H: Stopping and scaling
- Stop when ‖∇f‖ is small relative to its starting value, or steps stall.
- Scale variables to similar magnitudes.
- Check gradients against finite differences before trusting them.
- Report success flags; don't assume convergence.
X: Check Armijo's sufficient decrease condition for f(x) = x^{2} at x = 1, direction −2, step α = 0.5, constant c = 10^{−4}.
> New point x = 1 − 0.5 × 2 = 0, f = 0
> Requirement: f(0) ≤ f(1) + cα∇f·p = 1 + 10^{−4} × 0.5 × (2)(−2) = 0.9998
> 0 ≤ 0.9998, so the step is accepted
K: Line searches and trust regions globalise local methods; algorithm choice depends on derivatives and size; scaling, gradient checks and honest stopping tests make optimisation reliable.
!: Trusting an optimiser's output without checking its convergence flag.
Q: What does the Armijo condition require? | Sufficient decrease in f relative to the step and slope.
Q: Name a derivative-free optimisation method. | Nelder–Mead (or pattern search).
SUM: Globalisation makes local methods robust.
SUM: Choose by derivatives and size.
SRC: Nocedal J, Wright SJ, Numerical Optimization (2nd edn, Springer 2006) | textbook | 2006 | https://link.springer.com/
SRC: Conn AR, Gould NIM, Toint PL, Trust-Region Methods (SIAM 2000) | textbook | 2000 | https://epubs.siam.org/
NUM1#maths-u19-23-q1@1: A trust-region step predicted a decrease of 4 but the actual decrease was 3. What is the ratio ρ used to adjust the radius? | 0.75 | 0.001 |  | ρ = actual/predicted = 3/4 = 0.75, a good agreement that typically keeps or enlarges the radius.
M1#maths-u19-23-q2@1: What happens to the trust-region radius when the model predicts the decrease poorly? | It is reduced, so the next step stays closer to the current point | It is doubled, so the model can be tested further out | It stays the same regardless of how the step performed | The method stops, since the model has failed | The model is discarded and replaced by bisection | A small ratio of actual to predicted decrease means the model isn't trustworthy that far out.
M2#maths-u19-23-q3@2: Which method suits optimising a function whose derivatives are unavailable and noisy? | A derivative-free method such as Nelder–Mead or model-based trust regions | Newton's method with exact Hessians from the formula | Conjugate gradients applied to the normal equations | Reverse-mode automatic differentiation of the function | Steepest descent using exact analytic gradients | Derivative-free methods use only function values.

## Numerical Solutions of Differential Equations
S: Most differential equations can't be solved exactly, so we approximate them on a grid of time steps or spatial points. Methods range from Euler's simple step to high-order Runge–Kutta and implicit schemes, chosen by accuracy, stability and stiffness.
O: Apply Euler and Runge–Kutta methods to initial value problems
O: Explain local and global error, stiffness and finite differences for PDEs
T: Runge–Kutta method | A one-step method combining several slope evaluations per step; classical RK4 is fourth order
T: Stiff equation | An ODE with widely different time scales, forcing explicit methods to take tiny steps for stability
H: ODE methods
- Euler: y_{n+1} = yₙ + hf(tₙ, yₙ), first order.
- RK4: four slopes per step, global error O(h^{4}).
- Multistep methods (Adams, BDF) reuse past values.
- Adaptive step sizes (Dormand–Prince, ode45) control local error.
H: Error and stability
- Local truncation error per step; global error accumulates (one order lower).
- Stiff problems: chemistry, circuits; use implicit BDF or Radau methods.
- Symplectic integrators (Verlet) preserve energy behaviour in mechanics.
H: PDEs
- Finite differences: replace derivatives on a grid (heat equation: explicit needs Δt ≤ Δx^{2}/2).
- Finite volumes conserve quantities (fluid dynamics).
- Finite elements for complex geometry (next lesson).
- Spectral methods for smooth problems.
X: Apply one Euler step and one RK2 (midpoint) step to y′ = y, y(0) = 1, h = 0.1.
> Euler: y₁ = 1 + 0.1 × 1 = 1.1
> Midpoint: k₁ = 1, y_{mid} = 1.05, k₂ = 1.05, y₁ = 1 + 0.1 × 1.05 = 1.105
> Exact e^{0.1} = 1.10517: RK2 is much closer
K: Euler and Runge–Kutta methods step through time; global error is one order below local; stiff problems need implicit methods; PDEs use finite differences, volumes, elements or spectral methods.
!: Using an explicit method on a stiff problem and taking needlessly tiny steps.
Q: What is the global order of RK4? | 4.
Q: What kind of method suits stiff ODEs? | An implicit method such as BDF.
SUM: Step through time on a grid.
SUM: Match the method to stiffness and accuracy.
SRC: Hairer E, Nørsett SP, Wanner G, Solving Ordinary Differential Equations I: Nonstiff Problems (2nd edn, Springer 1993) | textbook | 1993 | https://link.springer.com/
SRC: LeVeque RJ, Finite Difference Methods for Ordinary and Partial Differential Equations (SIAM 2007) | textbook | 2007 | https://epubs.siam.org/
NUM1#maths-u19-24-q1@1: Apply two Euler steps of h = 0.5 to y′ = −2y with y(0) = 1. What is y(1)? | 0 | 0 |  | Each step multiplies by 1 − 2 × 0.5 = 0, so y₁ = 0 and y₂ = 0 (exact e^{−2} ≈ 0.135): a step at the stability edge.
M1#maths-u19-24-q2@1: Which method is fourth-order accurate? | Classical Runge–Kutta (RK4) | Forward Euler | Backward Euler | The midpoint method | The trapezium rule | RK4 combines four slope evaluations to cancel error terms up to h^{4}.
M3#maths-u19-24-q3@2: Why are implicit methods preferred for stiff ODEs? | Their large stability regions allow steps set by accuracy, not by the fastest decaying mode | They are cheaper per step than explicit methods | They are always more accurate for every step size | Explicit methods can't solve ODEs with more than one variable | They aren't preferred; explicit methods handle stiffness best | Explicit methods need h below 2/λ_{max}, which is tiny when fast modes exist.

## Finite Element Analysis
S: The finite element method breaks a complex region into small simple elements, such as triangles, and approximates the solution by simple functions on each. It's the standard tool for structural, thermal and electromagnetic analysis of real engineering designs.
O: Explain the weak form and Galerkin approximation
O: Describe assembly, element types and error behaviour
T: Weak form | An integral version of a PDE obtained by multiplying by test functions and integrating by parts
T: Galerkin method | Choosing the approximate solution from a finite-dimensional space and requiring the residual to be orthogonal to that space
H: The method
- Write the weak form: find u with a(u, v) = ℓ(v) for all test functions v.
- Mesh the domain into elements; use piecewise polynomial basis ("hat") functions.
- Assemble the stiffness matrix K and load vector f from element contributions.
- Solve the sparse system Ku = f.
H: Theory
- Céa's lemma: the Galerkin solution is nearly the best approximation in the energy norm.
- Linear elements: error O(h) in energy norm, O(h^{2}) in L^{2} for smooth problems.
- Higher-order elements (p-refinement) improve accuracy.
- Lax–Milgram guarantees well-posedness for coercive problems.
H: In practice
- Element types: triangles, quadrilaterals, tetrahedra, hexahedra, shells and beams.
- Software: Abaqus, ANSYS, COMSOL, FEniCS.
- Uses: bridges, aircraft, crash testing, heart valves.
- Post-processing: stresses, error estimates.
X: Solve −u″ = 1 on [0, 1] with u(0) = u(1) = 0 using one interior node at x = ½ and hat functions.
> With h = ½, the stiffness entry is 2/h = 4 and the load is ∫ φ dx = h = ½
> 4u₁ = ½ gives u₁ = 0.125
> The exact solution x(1 − x)/2 gives u(½) = 0.125: exact at the node
K: FEM uses weak forms, meshes and piecewise polynomial bases; Galerkin's method gives near-best approximations; stiffness matrices are assembled and solved; it's the engineering standard.
!: Trusting results from a coarse mesh without a convergence study.
Q: What does Céa's lemma say? | The Galerkin solution is quasi-optimal in the energy norm.
Q: What error does linear FEM give in the L^{2} norm for smooth problems? | O(h^{2}).
SUM: Elements approximate complex domains.
SUM: Weak forms make it rigorous.
SRC: Brenner SC, Scott LR, The Mathematical Theory of Finite Element Methods (3rd edn, Springer 2008) | textbook | 2008 | https://link.springer.com/
SRC: Zienkiewicz OC, Taylor RL, Zhu JZ, The Finite Element Method: Its Basis and Fundamentals (7th edn, Butterworth-Heinemann 2013) | textbook | 2013 | https://www.elsevier.com/
NUM1#maths-u19-25-q1@1: For −u″ = 1 on [0, 1] with zero boundary values, what is the exact solution at x = 0.25? | 0.09375 | 0.00001 |  | u = x(1 − x)/2 = 0.25 × 0.75/2 = 0.09375.
M1#maths-u19-25-q2@1: What is the weak form of a PDE? | An integral equation obtained by multiplying by test functions and integrating by parts | The PDE with all of its derivative terms removed | A version with weaker boundary conditions only | The PDE solved on a deliberately coarse grid | A linearised version of a nonlinear PDE | Integrating by parts moves derivatives onto test functions, allowing less smooth solutions.
M2#maths-u19-25-q3@2: Why does finite element analysis lead to sparse matrices? | Each basis function overlaps only its neighbours, so most matrix entries are zero | Every basis function covers the whole domain, so most products vanish | The PDE has no derivatives once it's written in weak form | Elements are always square, which forces a banded structure | It doesn't: finite element matrices are always completely dense | Local support means the stiffness entry Kᵢⱼ is non-zero only for nearby nodes.

## Mesh Generation
S: Mesh generation divides a geometric domain into elements for numerical simulation. Mesh quality, meaning element shape and size, strongly affects accuracy and solver speed, and generating good meshes for complex 3D parts is often the slowest step in engineering analysis.
O: Describe structured and unstructured meshes and Delaunay triangulation
O: Assess element quality and its effect on accuracy
T: Delaunay triangulation | A triangulation in which no point lies inside the circumcircle of any triangle, maximising the minimum angle
T: Element quality | A measure of how close an element is to an ideal shape, such as aspect ratio or minimum angle
H: Mesh types
- Structured: regular grids, simple indexing, limited geometry.
- Unstructured: triangles or tetrahedra fitting any shape.
- Hybrid: boundary layers of prisms with tetrahedra elsewhere (CFD).
- Hexahedral meshes are accurate but hard to generate automatically.
H: Algorithms
- Delaunay methods (with refinement, such as Ruppert's algorithm, guaranteeing angle bounds).
- Advancing front: grow elements inward from the boundary.
- Octree methods for 3D.
- Software: Gmsh, TetGen, Triangle.
H: Quality
- Very small or very large angles hurt accuracy and conditioning.
- Smooth grading between fine and coarse regions.
- Refine where solutions change rapidly (see Adaptive Mesh Refinement).
- Geometry cleanup (CAD repair) is often needed first.
X: Triangle vertices are (0, 0), (2, 0) and (1, 0.1). Is this a good-quality element?
> The angles at (0, 0) and (2, 0) are each about 5.7°, and the third is about 168.6°
> Such a thin, obtuse triangle has a poor minimum angle and huge aspect ratio
> It degrades accuracy and conditioning; a Delaunay refinement would replace it
K: Meshes may be structured, unstructured or hybrid; Delaunay and advancing-front methods generate them; element quality and grading strongly affect accuracy; meshing complex geometry is often the bottleneck.
!: Accepting slivers and badly shaped elements because the mesh "looks fine" overall.
Q: What does the Delaunay condition say? | No point lies inside any triangle's circumcircle.
Q: Which kind of mesh fits arbitrary geometry most easily? | Unstructured (triangles or tetrahedra).
SUM: Meshes discretise geometry.
SUM: Quality affects accuracy.
SRC: Cheng SW, Dey TK, Shewchuk JR, Delaunay Mesh Generation (CRC Press 2012) | textbook | 2012 | https://www.routledge.com/
SRC: Geuzaine C, Remacle JF, Gmsh: a 3-D finite element mesh generator, International Journal for Numerical Methods in Engineering 79(11), 1309 | journal | 2009 | https://doi.org/10.1002/nme.2579
NUM1#maths-u19-26-q1@1: What is the sum of the interior angles of any triangle element, in degrees? | 180 | 0 | ° | Angles always sum to 180°, so one very large angle forces the others to be small.
M1#maths-u19-26-q2@1: Which property does a Delaunay triangulation maximise among triangulations of a point set? | The minimum angle | The maximum angle | The number of triangles | The total edge length | The area of the largest triangle | Avoiding points in circumcircles avoids skinny triangles.
M2#maths-u19-26-q3@2: Why are poorly shaped elements harmful in finite element analysis? | They increase interpolation error and make the stiffness matrix ill-conditioned | They reduce the number of unknowns below what's needed | They make the PDE linear when it should be nonlinear | They speed up the solver but give no answer at all | They aren't harmful; only the number of elements matters | Very large or small angles degrade gradient approximations and the solver's conditioning.

## Adaptive Mesh Refinement
S: Adaptive mesh refinement concentrates computational effort where it's needed, refining elements near shocks, corners or boundary layers and coarsening elsewhere. A posteriori error estimates decide where to refine, making simulations both cheaper and more accurate.
O: Describe the solve–estimate–mark–refine loop
O: Explain a posteriori error estimators and h-, p- and hp-refinement
T: A posteriori error estimate | An estimate of the error computed from the numerical solution itself, element by element
T: hp-refinement | Combining mesh subdivision (h) with increasing polynomial degree (p) for best efficiency
H: The loop
- Solve on the current mesh.
- Estimate the error in each element.
- Mark elements with the largest errors (Dörfler marking).
- Refine (and possibly coarsen), then repeat until the estimate meets the tolerance.
H: Estimators
- Residual-based: measure how badly the PDE is satisfied and jumps across faces.
- Recovery-based (Zienkiewicz–Zhu): compare with a smoothed gradient.
- Goal-oriented (dual-weighted residual) for specific quantities of interest.
H: Uses
- Shocks in compressible flow (Berger–Oliger AMR, 1984).
- Corner singularities in elasticity: refinement restores optimal rates.
- Astrophysics and weather codes.
- Time-dependent problems need refinement that moves with features.
X: An L-shaped domain's re-entrant corner causes large errors. How does adaptive refinement help?
> The solution has a singular gradient at the corner, so uniform refinement converges slowly
> The estimator flags corner elements; repeated refinement grades the mesh towards the corner
> The optimal convergence rate is restored with far fewer elements than uniform refinement
K: Adaptive refinement loops solve, estimate, mark and refine; a posteriori estimators guide it; h-, p- and hp-refinement trade element size and degree; it handles singularities and shocks efficiently.
!: Refining uniformly when the error is concentrated in a small region.
Q: What is a posteriori error estimation? | Estimating error from the computed solution itself.
Q: What does p-refinement change? | The polynomial degree of the elements.
SUM: Refine where the error is.
SUM: Estimators guide the mesh.
SRC: Ainsworth M, Oden JT, A Posteriori Error Estimation in Finite Element Analysis (Wiley 2000) | textbook | 2000 | https://www.wiley.com/
SRC: Berger MJ, Oliger J, Adaptive mesh refinement for hyperbolic partial differential equations, Journal of Computational Physics 53(3), 484 | journal | 1984 | https://doi.org/10.1016/0021-9991(84)90073-1
NUM1#maths-u19-27-q1@1: Splitting each triangle into four (red refinement) three times turns one triangle into how many? | 64 | 0 |  | Each step multiplies the count by 4: 4^{3} = 64.
M1#maths-u19-27-q2@1: Which elements are refined in an adaptive loop? | Those whose estimated error is largest | Every element equally | Those with the smallest error | Only boundary elements | A random selection of elements | Marking focuses effort where the estimator shows the error is concentrated.
M3#maths-u19-27-q3@2: Why does adaptivity restore optimal convergence near a corner singularity? | Grading the mesh towards the corner balances the error across elements, which uniform meshes can't do | Corners have no error, so refining elsewhere fixes the rate | Adaptive meshes remove the singularity from the PDE itself | Refinement makes the exact solution smooth near the corner | It doesn't: adaptivity only reduces cost, never improves rates | Uniform meshes waste elements in smooth regions while the corner error dominates.

## Computational Mathematics
S: Computational mathematics uses computers to explore, conjecture and prove mathematical results, as well as to solve applied problems. Experiments reveal patterns, exact computations verify cases, and computer-assisted proofs settle theorems beyond hand calculation.
O: Describe experimental mathematics and computer-assisted proof
O: Recognise integer relation algorithms and high-precision computation
T: Experimental mathematics | Using computation to discover patterns, test conjectures and suggest proofs
T: Integer relation algorithm | An algorithm such as PSLQ that finds integers aᵢ with Σ aᵢxᵢ = 0 for given real numbers xᵢ
H: Discovery
- Gauss conjectured the prime number theorem from tables of primes.
- The BBP formula for π (1995) was found by the PSLQ integer relation algorithm.
- The Birch and Swinnerton-Dyer conjecture came from computer experiments in the 1960s.
H: Proof
- Four colour theorem (1976, Appel and Haken).
- Kepler conjecture (Hales, 1998; formally verified 2014).
- The Boolean Pythagorean triples problem (2016) used a 200-terabyte SAT proof.
- Interval arithmetic and formal verification make these rigorous.
H: Tools
- Arbitrary-precision arithmetic (MPFR, mpmath).
- Computer algebra (next lessons) and proof assistants.
- The OEIS for identifying integer sequences.
- Inverse symbolic calculators for recognising constants.
X: A computation gives x ≈ 1.6180339887. How might an integer relation algorithm identify it?
> Search for integers a, b, c with a + bx + cx^{2} = 0
> It finds x^{2} − x − 1 = 0
> So x = (1 + √5)/2, the golden ratio
K: Computational mathematics discovers and proves results by computer; PSLQ finds integer relations; computer-assisted proofs include the four colour and Kepler theorems; high precision and verification ensure rigour.
!: Treating a numerical pattern as proved without a rigorous argument.
Q: What did PSLQ help discover in 1995? | The BBP formula for π.
Q: Name a theorem proved with computer assistance. | The four colour theorem.
SUM: Computers suggest and prove mathematics.
SUM: Rigour needs verification.
SRC: Borwein J, Bailey D, Mathematics by Experiment: Plausible Reasoning in the 21st Century (2nd edn, A K Peters 2008) | textbook | 2008 | https://www.routledge.com/
SRC: Bailey D, Borwein P, Plouffe S, On the rapid computation of various polylogarithmic constants, Mathematics of Computation 66, 903 | journal | 1997 | https://doi.org/10.1090/S0025-5718-97-00856-9
NUM1#maths-u19-28-q1@1: In what year did Appel and Haken announce their computer-assisted proof of the four colour theorem? | 1976 | 0 |  | Appel and Haken announced the proof in 1976, checking 1,936 configurations by computer (later reduced).
M1#maths-u19-28-q2@1: What does the PSLQ algorithm find? | Integer relations among given real numbers | Prime factors of large integers | Roots of polynomials only | Shortest paths in graphs | Eigenvalues of matrices | PSLQ searches for integers a₁, …, aₙ with Σ aᵢxᵢ ≈ 0.
M2#maths-u19-28-q3@2: Why must computer-assisted proofs use rigorous arithmetic or verification? | Floating-point rounding could otherwise make a false inequality look true | Computers never make errors, so rigour is only a formality | Proofs by computer don't need the same rigour as hand proofs | Rounding always helps by making inequalities more strict | They needn't: floating-point results are accepted as proof | Interval arithmetic and formal checking turn computations into guaranteed statements.

## High-Performance Computing
S: High-performance computing (HPC) uses supercomputers with thousands to millions of processor cores to solve problems too large for ordinary computers. Achieving performance means understanding parallelism, memory hierarchies and communication, not just counting operations.
O: Describe HPC architectures and performance measures
O: Apply Amdahl's law and the roofline model
T: Amdahl's law | Speed-up on p processors is at most 1/(s + (1 − s)/p), where s is the serial fraction
T: Arithmetic intensity | Floating-point operations per byte moved from memory, which determines whether code is compute- or memory-bound
H: Architectures
- Distributed-memory clusters connected by fast networks (MPI).
- Shared-memory multicore nodes (OpenMP, threads).
- GPUs and accelerators with thousands of cores (CUDA, HIP).
- Exascale (10^{18} flop/s) systems: Frontier (2022) was the first.
H: Performance models
- Amdahl: serial parts cap speed-up.
- Gustafson: larger problems keep processors busy (weak scaling).
- Roofline: performance ≤ min(peak flops, bandwidth × intensity).
- Strong scaling (fixed size) and weak scaling (fixed work per processor).
H: Practice
- Memory bandwidth, not flops, often limits performance.
- Libraries: BLAS, LAPACK, PETSc, Trilinos.
- The TOP500 list ranks systems by the LINPACK benchmark.
- Energy use is a major design constraint.
X: A code is 5% serial. What's the maximum speed-up on 100 processors, and the limit as processors → ∞?
> Speed-up = 1/(0.05 + 0.95/100) = 1/(0.05 + 0.0095) = 1/0.0595 ≈ 16.8
> As p → ∞, speed-up → 1/0.05 = 20
> The serial fraction caps the benefit of more processors
K: HPC uses clusters, multicore and GPUs; Amdahl's law limits strong scaling; Gustafson justifies weak scaling; the roofline model shows whether code is memory- or compute-bound.
!: Expecting linear speed-up from adding processors without considering serial work and communication.
Q: What limits speed-up in Amdahl's law? | The serial fraction of the code.
Q: Which benchmark ranks the TOP500? | LINPACK (High-Performance Linpack).
SUM: HPC needs parallel thinking.
SUM: Memory and communication often dominate.
SRC: Amdahl GM, Validity of the single processor approach to achieving large scale computing capabilities, AFIPS Conference Proceedings 30, 483 | journal | 1967 | https://doi.org/10.1145/1465482.1465560
SRC: Williams S, Waterman A, Patterson D, Roofline: an insightful visual performance model for multicore architectures, Communications of the ACM 52(4), 65 | journal | 2009 | https://doi.org/10.1145/1498765.1498785
NUM1#maths-u19-29-q1@1: A program is 10% serial. What is the maximum possible speed-up with unlimited processors? | 10 | 0 |  | Amdahl's limit is 1/s = 1/0.1 = 10, however many processors are used.
M1#maths-u19-29-q2@1: A kernel does 1 flop per 8 bytes on a machine with 100 GB/s bandwidth and 10 Tflop/s peak. What limits it? | Memory bandwidth, giving about 12.5 Gflop/s | Peak compute, giving 10 Tflop/s | Network latency only | The serial fraction | Disk speed | Roofline: 100 GB/s × 0.125 flop/byte = 12.5 Gflop/s, far below peak.
M2#maths-u19-29-q3@2: What does weak scaling measure? | How run time changes when the problem size grows in proportion to the processors | Speed-up for a fixed problem size as processors are added | The fraction of the code that must run serially | The speed of one processor core running alone | The total memory capacity of the whole machine | Weak scaling keeps work per processor fixed, as Gustafson's law describes.

## Parallel Numerical Algorithms
S: Parallel numerical algorithms split computations so many processors can work at once while communicating as little as possible. Some methods parallelise naturally, others need redesign, and communication costs often matter more than arithmetic.
O: Describe domain decomposition and parallel linear algebra
O: Analyse communication and load balance
T: Domain decomposition | Splitting a computational domain into subdomains solved in parallel, with exchanges along their boundaries
T: Load balancing | Distributing work so all processors finish at about the same time
H: Patterns
- Embarrassingly parallel: Monte Carlo samples, parameter sweeps.
- Data parallel: matrix operations, stencils on grids.
- Domain decomposition: Schwarz methods for PDEs.
- Pipelining and task-based parallelism (DAG schedulers).
H: Communication
- Halo exchanges between neighbouring subdomains.
- Global reductions (dot products) synchronise all processors and limit Krylov solvers.
- Communication-avoiding algorithms (CA-CG, TSQR) reduce messages.
- Surface-to-volume ratio: bigger subdomains communicate relatively less.
H: Algorithms
- Parallel dense linear algebra (ScaLAPACK) with block-cyclic distributions.
- Parallel FFT with all-to-all communication.
- Parallel multigrid and algebraic multigrid.
- Parallel-in-time methods (Parareal).
X: A 1000 × 1000 grid is split into 4 square subdomains. Compare computation and communication per subdomain.
> Each subdomain is 500 × 500 = 250,000 points of computation
> Its boundary with neighbours is about 2 × 500 = 1000 points to exchange
> Ratio 1000/250,000 = 0.4%: communication is small, but grows relatively as subdomains shrink
K: Parallel algorithms use data, domain and task parallelism; communication (halos, reductions) and load balance limit performance; communication-avoiding and domain decomposition methods address this.
!: Ignoring global reductions, which become the bottleneck at large processor counts.
Q: What is a halo exchange? | Swapping boundary data between neighbouring subdomains.
Q: Why are dot products costly in parallel? | They need global reductions across all processors.
SUM: Divide work, minimise communication.
SUM: Balance load across processors.
SRC: Dongarra J et al. (eds), Sourcebook of Parallel Computing (Morgan Kaufmann 2003) | textbook | 2003 | https://www.elsevier.com/
SRC: Smith B, Bjørstad P, Gropp W, Domain Decomposition: Parallel Multilevel Methods for Elliptic Partial Differential Equations (Cambridge University Press 1996) | textbook | 1996 | https://www.cambridge.org/
NUM1#maths-u19-30-q1@1: A 1000 × 1000 grid is split into 100 square subdomains. How many grid points does each contain? | 10000 | 0 | points | 10^{6}/100 = 10,000 points, a 100 × 100 block.
M1#maths-u19-30-q2@1: Which task is embarrassingly parallel? | Running independent Monte Carlo samples | Solving a tridiagonal system by elimination | A single long time-stepping loop | Computing a recursive sequence | Sorting by insertion | Samples are independent, so they need no communication until the final average.
M3#maths-u19-30-q3@2: Why do communication-avoiding Krylov methods help at scale? | They combine several iterations' global reductions into one, cutting synchronisation that dominates at large core counts | They need no matrix–vector products, so the communication disappears | They avoid all arithmetic, so only communication is left to optimise | They make the matrices dense, which suits parallel machines better | They don't help; communication costs fall as more cores are added | Each global reduction stalls every processor, so fewer of them speeds up large runs.

## Symbolic Computation
S: Symbolic computation manipulates mathematical expressions exactly, rather than with approximate numbers: factorising polynomials, integrating functions in closed form and solving equations with parameters. It underlies computer algebra systems and complements numerical methods.
O: Contrast symbolic and numerical computation
O: Describe key symbolic algorithms: Gröbner bases, the Risch algorithm and polynomial factorisation
T: Gröbner basis | A special generating set of a polynomial ideal that makes membership and elimination problems algorithmic (Buchberger 1965)
T: Risch algorithm | A decision procedure for whether an elementary function has an elementary antiderivative, and finding it
H: Exact versus approximate
- Symbolic: exact rationals, algebraic numbers, formulas with parameters.
- Numerical: fast floating point, approximate.
- Expression swell: exact intermediate results can become enormous.
- Hybrid symbolic–numeric methods combine both.
H: Algorithms
- Polynomial GCD and factorisation (Berlekamp, Zassenhaus, LLL-based methods).
- Gröbner bases solve polynomial systems and eliminate variables.
- Risch: e^{x^{2}} has no elementary antiderivative.
- Cylindrical algebraic decomposition for real quantifier elimination.
H: Uses
- Deriving formulas and checking identities.
- Generating code (exact Jacobians for simulations).
- Robotics kinematics, cryptography, coding theory.
- Teaching and exploration.
X: Factorise x^{4} − 1 over ℚ and then over ℂ.
> x^{4} − 1 = (x^{2} − 1)(x^{2} + 1) = (x − 1)(x + 1)(x^{2} + 1) over ℚ
> Over ℂ, x^{2} + 1 = (x − i)(x + i)
> So x^{4} − 1 = (x − 1)(x + 1)(x − i)(x + i)
K: Symbolic computation is exact; expression swell is its cost; Gröbner bases, Risch integration and factorisation algorithms are core; it complements numerical methods.
!: Expecting every integral to have a closed form, when the Risch algorithm can prove none exists.
Q: Does e^{x^{2}} have an elementary antiderivative? | No.
Q: Who introduced Gröbner bases? | Bruno Buchberger (1965).
SUM: Symbolic means exact.
SUM: Key algorithms decide and solve.
SRC: von zur Gathen J, Gerhard J, Modern Computer Algebra (3rd edn, Cambridge University Press 2013) | textbook | 2013 | https://www.cambridge.org/
SRC: Cox DA, Little J, O'Shea D, Ideals, Varieties, and Algorithms (4th edn, Springer 2015) | textbook | 2015 | https://link.springer.com/
NUM1#maths-u19-31-q1@1: How many irreducible factors does x^{4} − 1 have over ℚ? | 3 | 0 |  | x^{4} − 1 = (x − 1)(x + 1)(x^{2} + 1), and x^{2} + 1 is irreducible over ℚ.
M1#maths-u19-31-q2@1: What problem does a Gröbner basis solve algorithmically? | Deciding polynomial ideal membership and eliminating variables from polynomial systems | Computing eigenvalues of large dense matrices accurately | Integrating stiff differential equations numerically | Finding shortest paths in weighted directed graphs | Sorting long lists of polynomials by their degree | Buchberger's algorithm reduces polynomial system questions to normal forms.
M2#maths-u19-31-q3@2: What is expression swell in symbolic computation? | Exact intermediate expressions growing much larger than the input or final answer | Rounding errors accumulating over long computations | Floating-point overflow when numbers become too large | A shortage of variable names in long computations | It isn't a real issue in modern computer algebra | Exact rational arithmetic can produce huge numerators and denominators along the way.

## Computer Algebra Systems
S: Computer algebra systems (CAS) such as Mathematica, Maple, SageMath and SymPy put symbolic algorithms in the hands of everyone. They simplify, differentiate, integrate, solve and plot, but their answers need checking because simplification and branch choices can mislead.
O: Use a CAS for common symbolic tasks
O: Recognise pitfalls such as branch cuts and assumptions
T: Computer algebra system | Software that performs symbolic mathematics: algebra, calculus, equation solving and more
T: Branch cut | A curve where a multivalued function such as √z or log z jumps, which affects simplification
H: Systems
- Commercial: Mathematica, Maple, Magma.
- Open source: SageMath, SymPy, Maxima, PARI/GP, GAP (groups).
- Many integrate numerics, plotting and notebooks.
H: Typical tasks
- Simplify and factor expressions; partial fractions.
- Differentiate, integrate, sum series, solve ODEs symbolically.
- Linear algebra with exact entries.
- Generate LaTeX or code.
H: Pitfalls
- √(x^{2}) = x only if x ≥ 0; state assumptions.
- Different but equivalent forms of an answer.
- Generic solutions can miss special cases (dividing by a parameter that may be 0).
- Check results by differentiating, substituting or comparing numerically.
X: A CAS returns ∫ 1/x dx = log x. What's missing, and how would you check it?
> The general antiderivative is log|x| + C for real x ≠ 0
> The CAS gave a particular antiderivative valid for x > 0 (or a complex one)
> Check by differentiating: d/dx log x = 1/x ✓, and remember the constant and domain
K: CAS automate symbolic mathematics; commercial and open-source systems exist; assumptions, branch cuts and generic cases can mislead, so verify results.
!: Accepting √(x^{2}) = x without stating that x is non-negative.
Q: Name an open-source computer algebra system. | SageMath (or SymPy, Maxima).
Q: When does √(x^{2}) = x hold for real x? | When x ≥ 0.
SUM: CAS make symbolic work easy.
SUM: Always check assumptions.
SRC: Stein W et al., SageMath, the Sage Mathematics Software System | dataset | 2024 | https://www.sagemath.org/
SRC: Meurer A et al., SymPy: symbolic computing in Python, PeerJ Computer Science 3, e103 | journal | 2017 | https://doi.org/10.7717/peerj-cs.103
NUM1#maths-u19-32-q1@1: A CAS solves ax = b as x = b/a. For how many values of a does this generic answer fail? | 1 | 0 |  | It fails only at a = 0, where there are no solutions or infinitely many.
M1#maths-u19-32-q2@1: Which simplification is valid for all real x? | √(x^{2}) = |x| | √(x^{2}) = x | log(eˣ) = x for complex x | (x^{2})^{1/2} = x | √(x^{2}) = −x | The principal square root is non-negative, so it equals |x|.
M2#maths-u19-32-q3@2: What is a good way to check a CAS antiderivative? | Differentiate it and compare with the integrand, also numerically at sample points | Trust the output, since computer algebra systems don't make mistakes | Integrate it again and check the result is a second antiderivative | Check that the answer is shorter than the original integrand | Ask another CAS only, without any independent mathematical check | Differentiation verifies the result exactly; numerical checks catch domain errors.

## Uncertainty Quantification
S: Uncertainty quantification (UQ) asks how uncertainty in inputs, parameters and models affects the predictions of a simulation. It turns a single "best guess" output into a distribution or range, which is essential for decisions based on models.
O: Propagate input uncertainty by Monte Carlo and polynomial chaos
O: Distinguish aleatory and epistemic uncertainty and calibration
T: Aleatory uncertainty | Inherent randomness, such as turbulence or measurement noise, that can't be reduced by more knowledge
T: Epistemic uncertainty | Uncertainty from lack of knowledge, such as unknown parameters, that more data can reduce
H: Forward propagation
- Monte Carlo: sample inputs, run the model, collect output statistics; error ∝ 1/√N.
- Latin hypercube and quasi-Monte Carlo improve on random sampling.
- Polynomial chaos expansions represent outputs as polynomials in random inputs.
- Linearised (first-order) propagation for small uncertainties.
H: Inverse problems
- Calibrate parameters from data using Bayesian inference: posterior ∝ likelihood × prior.
- Markov chain Monte Carlo samples the posterior.
- Model discrepancy terms account for model error (Kennedy–O'Hagan).
H: Uses
- Climate projections (ensembles), nuclear safety, aerospace certification.
- Epidemic models (ranges rather than single predictions).
- Communicating uncertainty to decision-makers.
X: A Monte Carlo estimate with N = 100 samples has standard error 0.4. How many samples reduce it to 0.1?
> Standard error ∝ 1/√N
> Reducing it by 4 requires 16 times as many samples
> N = 1600
K: UQ propagates input uncertainty to outputs and calibrates models; Monte Carlo errors fall as 1/√N; polynomial chaos and surrogates cut cost; aleatory and epistemic uncertainties differ.
!: Reporting a single simulation output as if it were certain.
Q: How does Monte Carlo error scale with the number of samples? | Like 1/√N.
Q: Which kind of uncertainty can more data reduce? | Epistemic uncertainty.
SUM: Quantify how uncertain predictions are.
SUM: Propagate forward, calibrate backward.
SRC: Smith RC, Uncertainty Quantification: Theory, Implementation, and Applications (SIAM 2014) | textbook | 2014 | https://epubs.siam.org/
SRC: Kennedy MC, O'Hagan A, Bayesian calibration of computer models, Journal of the Royal Statistical Society B 63(3), 425 | journal | 2001 | https://doi.org/10.1111/1467-9868.00294
NUM1#maths-u19-33-q1@1: A Monte Carlo study has standard error 0.6 with 400 samples. What is the standard error with 3600 samples? | 0.2 | 0.001 |  | Nine times the samples gives √9 = 3 times smaller error: 0.6/3 = 0.2.
M1#maths-u19-33-q2@1: Which is an example of epistemic uncertainty? | An unknown material constant that more testing could pin down | Random gusts of wind buffeting a bridge | Thermal noise in an electronic sensor | The timing of individual radioactive decays | The outcome of rolling a fair die | More data can reduce uncertainty from lack of knowledge.
M2#maths-u19-33-q3@2: Why are surrogate models often used in uncertainty quantification? | Each full simulation is expensive, and Monte Carlo needs thousands of runs | Surrogates are always more accurate than the full simulation | They remove all uncertainty, so no sampling is needed | They need no data from the expensive simulation | They aren't used, since Monte Carlo never needs many runs | A cheap approximation lets many samples be drawn at little cost.

## Sensitivity Analysis
S: Sensitivity analysis asks which inputs matter most for a model's output. Local methods use derivatives at a point; global methods such as Sobol indices measure how much of the output's variance each input explains across its whole range.
O: Compute local sensitivities and elasticities
O: Interpret Sobol indices and screening methods
T: Sobol index | Sᵢ, the fraction of output variance explained by input i alone; total-effect indices include interactions
T: Elasticity | (∂y/∂x)(x/y): the percentage change in output per percentage change in input
H: Local methods
- Partial derivatives at a nominal point (from AD or adjoints).
- Elasticities make sensitivities unit-free.
- Cheap, but valid only near the chosen point.
H: Global methods
- One-at-a-time variation misses interactions.
- Morris screening: cheap ranking of many inputs.
- Variance-based Sobol indices: first-order Sᵢ and total-effect S_{Ti}.
- Σ Sᵢ = 1 for additive models; less than 1 when interactions exist.
H: Uses
- Identify which parameters to measure better.
- Simplify models by fixing unimportant inputs.
- Regulatory model assessment (EU guidelines).
- Linked to uncertainty quantification.
X: For y = 2x₁ + x₂ with x₁ and x₂ independent with variance 1, find the first-order Sobol indices.
> Var(y) = 4 × 1 + 1 × 1 = 5
> S₁ = 4/5 = 0.8 and S₂ = 1/5 = 0.2
> They sum to 1, since the model is additive
K: Sensitivity analysis ranks inputs; local derivatives and elasticities are cheap; global Sobol indices apportion variance and capture interactions; Morris screening handles many inputs.
!: Using one-at-a-time sensitivity for models with strong interactions.
Q: What does a total-effect Sobol index include? | The input's main effect plus all its interactions.
Q: When do first-order Sobol indices sum to 1? | For additive models without interactions.
SUM: Find which inputs matter.
SUM: Global methods capture interactions.
SRC: Saltelli A et al., Global Sensitivity Analysis: The Primer (Wiley 2008) | textbook | 2008 | https://www.wiley.com/
SRC: Sobol IM, Global sensitivity indices for nonlinear mathematical models and their Monte Carlo estimates, Mathematics and Computers in Simulation 55, 271 | journal | 2001 | https://doi.org/10.1016/S0378-4754(00)00270-6
NUM1#maths-u19-34-q1@1: For y = 3x₁ + x₂ with independent unit-variance inputs, what is the first-order Sobol index of x₁? | 0.9 | 0.001 |  | Var(y) = 9 + 1 = 10, so S₁ = 9/10 = 0.9.
M1#maths-u19-34-q2@1: What is the elasticity of y = x^{2} with respect to x? | 2 | 1 | x | 0.5 | x^{2} | (dy/dx)(x/y) = 2x × x/x^{2} = 2: a 1% change in x gives about 2% change in y.
M3#maths-u19-34-q3@2: Why can one-at-a-time sensitivity analysis mislead? | It misses interactions, where an input matters only when another input changes too | It is always exact, so it can only mislead through bugs | It uses too many samples, so random noise dominates | It ranks inputs at random rather than by importance | It never misleads for any model, however nonlinear | For y = x₁x₂ around x₂ = 0, varying x₁ alone shows no effect, though it matters elsewhere.

## Surrogate Modelling
S: A surrogate model is a cheap approximation to an expensive simulation, built from a limited number of runs. Gaussian processes, polynomial chaos and neural networks act as fast stand-ins for optimisation, uncertainty quantification and real-time control.
O: Describe how surrogates are built and validated
O: Compare Gaussian process, polynomial and neural network surrogates
T: Surrogate model | A fast approximate model fitted to input–output data from an expensive simulation
T: Design of experiments | The choice of input points at which to run the expensive model, such as a Latin hypercube
H: Building surrogates
- Choose training inputs by space-filling designs (Latin hypercube, Sobol sequences).
- Run the full model at those points.
- Fit the surrogate; validate on held-out runs.
- Add points adaptively where uncertainty or error is largest.
H: Types
- Polynomial response surfaces and polynomial chaos.
- Gaussian process (kriging) emulators, with uncertainty estimates.
- Radial basis functions.
- Neural networks and reduced-order models (POD) for high-dimensional outputs.
H: Uses and cautions
- Design optimisation (aerodynamic shapes), UQ, digital twins.
- Extrapolating outside the training region is unreliable.
- Surrogate error must be counted in the uncertainty budget.
- Physics-informed surrogates add known equations.
X: A simulation takes 2 hours per run. A study needs 10,000 runs. How does a surrogate help?
> Direct study: 20,000 hours (over 2 years)
> Build a surrogate from 100 runs (200 hours) and validate it
> Evaluate it 10,000 times in seconds: the study becomes feasible
K: Surrogates approximate expensive models from limited runs; space-filling designs and validation are essential; GPs give uncertainty, neural networks handle high dimensions; avoid extrapolation.
!: Using a surrogate far outside the region where it was trained.
Q: What design is often used to choose training inputs? | A Latin hypercube.
Q: Which surrogate provides its own uncertainty estimates? | A Gaussian process.
SUM: Replace expensive models with cheap ones.
SUM: Validate and don't extrapolate.
SRC: Forrester AIJ, Sóbester A, Keane AJ, Engineering Design via Surrogate Modelling (Wiley 2008) | textbook | 2008 | https://www.wiley.com/
SRC: Santner TJ, Williams BJ, Notz WI, The Design and Analysis of Computer Experiments (2nd edn, Springer 2018) | textbook | 2018 | https://link.springer.com/
NUM1#maths-u19-35-q1@1: A Latin hypercube design uses 10 samples in each of 3 dimensions. How many expensive simulation runs does it need? | 10 | 0 | runs | A Latin hypercube with n samples needs n runs, unlike a full grid needing 10^{3} = 1000.
M1#maths-u19-35-q2@1: Why validate a surrogate on held-out simulation runs? | To check its accuracy on inputs it wasn't trained on | To make it slower | To increase its training error | To avoid using data | Validation isn't necessary | Held-out runs reveal how well the surrogate generalises.
M2#maths-u19-35-q3@2: Which surrogate type naturally reports how uncertain its predictions are? | A Gaussian process emulator | A fixed polynomial fit | A look-up table | A linear interpolant | A constant model | GP predictions come with a variance that grows away from training points.

## Scientific Simulation
S: Scientific simulation uses mathematical models and computation to study systems too large, small, fast, slow or dangerous for experiment: galaxies, proteins, climate and nuclear reactors. Good simulations combine sound models, accurate numerics, verification and validation.
O: Describe the modelling and simulation workflow
O: Distinguish verification from validation
T: Verification | Checking that the code solves the mathematical model correctly ("solving the equations right")
T: Validation | Checking that the model represents reality well enough for its purpose ("solving the right equations")
H: Workflow
- Formulate the model (PDEs, particles, agents).
- Discretise and implement (numerics and software).
- Verify (convergence tests, manufactured solutions).
- Validate against experiments and quantify uncertainty.
H: Kinds of simulation
- Continuum: fluid dynamics, weather, structural mechanics.
- Particle: molecular dynamics, N-body astrophysics.
- Stochastic: Monte Carlo, agent-based models.
- Multiscale and multiphysics coupling.
H: Good practice
- Reproducibility: version control, documented parameters.
- Report numerical resolution and convergence.
- Compare with benchmarks and observations.
- Communicate limitations and uncertainty.
X: A climate model reproduces 20th-century temperatures. Is that verification or validation, and what else is needed?
> Matching observations tests whether the model represents reality: validation
> Verification would check that the code solves its equations correctly, with convergence tests
> Both, plus uncertainty quantification (ensembles), are needed for credible projections
K: Simulation follows model, discretise, verify, validate; verification checks the code, validation checks the model; good practice includes reproducibility, convergence and honest uncertainty.
!: Confusing verification with validation, or skipping either.
Q: What does verification check? | That the code correctly solves the mathematical model.
Q: What does validation check? | That the model represents reality adequately for its purpose.
SUM: Simulation complements theory and experiment.
SUM: Verify and validate.
SRC: Oberkampf WL, Roy CJ, Verification and Validation in Scientific Computing (Cambridge University Press 2010) | textbook | 2010 | https://www.cambridge.org/
SRC: National Research Council, Assessing the Reliability of Complex Models: Mathematical and Statistical Foundations of Verification, Validation, and Uncertainty Quantification (National Academies Press 2012) | guideline | 2012 | https://doi.org/10.17226/13395
NUM1#maths-u19-36-q1@1: An N-body simulation computes all pairwise forces directly. How many pairs are there for 1000 bodies? | 499500 | 0 | pairs | n(n − 1)/2 = 1000 × 999/2 = 499,500, which is why tree and fast multipole methods are used.
M1#maths-u19-36-q2@1: Which activity is verification? | Checking that errors fall at the expected rate as the mesh is refined | Comparing predictions with wind-tunnel measurements | Asking experts whether the model seems realistic | Measuring the real system to collect new data | Choosing which physical model to implement | Convergence studies test that the equations are solved correctly.
M2#maths-u19-36-q3@2: Why is reproducibility important in scientific simulation? | Others must be able to rerun and check results, which needs code, data and parameters | It makes simulations run faster on any machine | It removes numerical error from every result | It replaces the need for validation against data | It isn't important once results are published | Without the exact setup, results can't be confirmed or built on.

## Mathematical Software
S: Mathematical software packages the best numerical algorithms into reliable, tested libraries such as BLAS, LAPACK, FFTW and SciPy. Using good libraries rather than writing your own routines gives faster, more accurate and better-tested results.
O: Identify standard numerical libraries and their purposes
O: Explain the principles of reliable mathematical software
T: BLAS | Basic Linear Algebra Subprograms: a standard interface for vector and matrix operations, optimised for each machine
T: LAPACK | A library for dense linear algebra: linear systems, least squares, eigenvalues and SVD, built on BLAS
H: Core libraries
- BLAS and LAPACK (dense linear algebra); ScaLAPACK for parallel.
- FFTW for fast Fourier transforms.
- SUNDIALS for ODEs and DAEs; PETSc for large sparse problems.
- NumPy, SciPy, Julia, MATLAB and R build on these.
H: Principles
- Backward stable algorithms, careful error handling.
- Tested against reference problems; documented accuracy.
- Portable interfaces with machine-tuned implementations (OpenBLAS, MKL).
- Netlib (1985) made such software freely available.
H: Good practice for users
- Use library routines instead of hand-coded inversion or elimination.
- Solve Ax = b with a solver rather than computing A^{−1}.
- Check condition estimates and error flags.
- Cite the software and versions used.
X: Why compute x = A \\ b (a solver) rather than x = inv(A) × b?
> Forming A^{−1} costs about 2n^{3} flops versus about (2/3)n^{3} for an LU solve
> Multiplying by an explicit inverse is also less accurate
> The solver is faster, more stable and reports conditioning
K: Libraries like BLAS, LAPACK, FFTW and PETSc encode decades of numerical expertise; they're stable, tested and fast; users should call solvers rather than form inverses and should check error flags.
!: Computing a matrix inverse to solve a linear system.
Q: What is LAPACK built on? | BLAS.
Q: Should you solve Ax = b by computing A^{−1}? | No: use a solver such as LU.
SUM: Good libraries encode expertise.
SUM: Use them rather than reinventing.
SRC: Anderson E et al., LAPACK Users' Guide (3rd edn, SIAM 1999) | textbook | 1999 | https://netlib.org/lapack/lug/
SRC: Virtanen P et al., SciPy 1.0: fundamental algorithms for scientific computing in Python, Nature Methods 17, 261 | journal | 2020 | https://doi.org/10.1038/s41592-019-0686-2
NUM1#maths-u19-37-q1@1: An LU solve costs about (2/3)n^{3} flops. Roughly how many flops for n = 3000? | 18000000000 | 100000000 | flops | (2/3) × 2.7 × 10^{10} = 1.8 × 10^{10} flops, a fraction of a second on a modern CPU.
M1#maths-u19-37-q2@1: Which library provides fast Fourier transforms? | FFTW | LAPACK | BLAS level 1 | PETSc's Krylov solvers | SUNDIALS | FFTW ("Fastest Fourier Transform in the West") adapts its algorithm to the hardware.
M2#maths-u19-37-q3@2: Why are optimised BLAS implementations so much faster than naive loops? | They are tuned to the machine's caches and vector units, reusing data in fast memory | They skip some of the arithmetic to save time | They use lower precision than requested | They run only on special-purpose hardware | They aren't faster than straightforward loops | Blocking for cache and using SIMD instructions keeps the processor busy.
`;
