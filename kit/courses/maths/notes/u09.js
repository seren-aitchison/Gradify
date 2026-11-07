// School 9: Analysis. Format: kit/course/notes.js. Standard: docs/CURRICULUM_CONTENT_STANDARD.md
// Rigorous real and complex analysis, measure and integration, then functional analysis and operator algebras.
export default `
## Real Analysis
S: Real analysis puts calculus on rigorous foundations: precise definitions of limits, continuity and convergence, built on the completeness of the real numbers. It's where students learn to write ε–δ proofs and to see why the theorems of calculus are true.
O: Prove limits of sequences using the ε–N definition
O: State key theorems such as completeness and Bolzano–Weierstrass
T: Limit of a sequence | a_{n} → L if for every ε > 0 there is N with |a_{n} − L| < ε for all n > N
T: Completeness | Every non-empty set of reals bounded above has a least upper bound (supremum)
H: Definitions
- Sequences: the ε–N definition above.
- Continuity at a: for every ε > 0 there is δ > 0 with |x − a| < δ ⇒ |f(x) − f(a)| < ε.
- Uniform continuity and uniform convergence: one δ (or N) works everywhere at once.
H: Completeness and its consequences
- ℚ isn't complete: {q : q^{2} < 2} has no rational supremum.
- Monotone convergence: bounded monotone sequences converge.
- Bolzano–Weierstrass: every bounded sequence has a convergent subsequence.
- Intermediate and extreme value theorems follow.
H: Why rigour?
- Intuition fails: continuous nowhere-differentiable functions exist (Weierstrass, 1872).
- Pointwise limits of continuous functions can be discontinuous (xⁿ on [0, 1]); uniform limits can't.
- Swapping limits, sums and integrals needs justification.
X: Prove that (2n + 1)/(n + 3) → 2.
> |(2n + 1)/(n + 3) − 2| = |−5/(n + 3)| = 5/(n + 3)
> Given ε > 0, choose N > 5/ε − 3
> Then for n > N, 5/(n + 3) < ε, as required ∎
K: Limits and continuity have ε definitions; completeness of ℝ drives monotone convergence and Bolzano–Weierstrass; uniform convergence preserves continuity.
!: Choosing N that depends on n rather than only on ε.
Q: Is ℚ complete? | No: some bounded sets, like {q : q^{2} < 2}, have no rational supremum.
Q: What does Bolzano–Weierstrass guarantee? | Every bounded sequence has a convergent subsequence.
SUM: Analysis makes calculus rigorous.
SUM: Completeness is the key property of ℝ.
SRC: Abbott S, Understanding Analysis (2nd edn, Springer 2015) | textbook | 2015 | https://link.springer.com/
SRC: Rudin W, Principles of Mathematical Analysis (3rd edn, McGraw-Hill 1976) | textbook | 1976 | https://www.mheducation.com/
NUM1#maths-u09-01-q1@1: For ε = 0.01, find the smallest whole N such that 5/(n + 3) < ε for all n > N. | 497 | 0 |  | Need n + 3 > 500, so n > 497: N = 497 works and no smaller N does.
M1#maths-u09-01-q2@1: Which sequence converges? | (1 + 1/n) | (−1)^{n} | n^{2} | sin(n) | (−2)^{n} | 1 + 1/n → 1; the others oscillate or diverge.
M3#maths-u09-01-q3@2: The functions f_{n}(x) = x^{n} on [0, 1] converge pointwise. Why isn't the convergence uniform? | The limit is discontinuous at 1, but uniform limits of continuous functions are continuous | The functions aren't continuous | They don't converge at all | Uniform convergence needs differentiability | The convergence is uniform, because every f_{n} is bounded by 1 | The limit is 0 for x < 1 and 1 at x = 1, a jump that uniform convergence would forbid.

## Complex Analysis
S: Complex analysis studies differentiable functions of a complex variable. Complex differentiability is so strong that such functions are infinitely differentiable and given by power series, and contour integration evaluates real integrals that resist other methods.
O: Test functions with the Cauchy–Riemann equations
O: Evaluate integrals using Cauchy's theorem and residues
T: Holomorphic function | A function complex-differentiable on an open set
T: Residue | The coefficient of 1/(z − a) in the Laurent series of f about a
H: Holomorphic functions
- f = u + iv is holomorphic iff the Cauchy–Riemann equations u_{x} = v_{y}, u_{y} = −v_{x} hold (with continuous partials).
- z^{2}, e^{z}, sin z are holomorphic; conj(z) and |z| aren't.
- Holomorphic functions are analytic (power series), and their real and imaginary parts are harmonic.
H: Cauchy's theorems
- Cauchy's theorem: ∮ f dz = 0 around closed curves in a simply connected region where f is holomorphic.
- Cauchy's integral formula: f(a) = (1/2πi) ∮ f(z)/(z − a) dz.
- Liouville: bounded entire functions are constant, giving a quick proof of the fundamental theorem of algebra.
H: Residues
- Residue theorem: ∮ f dz = 2πi × (sum of residues inside).
- Simple pole at a: Res = lim (z − a)f(z).
- Evaluates real integrals such as ∫ dx/(1 + x^{2}) and Fourier-type integrals.
X: Use residues to evaluate ∫_{−∞}^{∞} dx/(1 + x^{2}).
> Close the contour with a large upper semicircle; 1/(1 + z^{2}) has a simple pole at i inside
> Res at i = lim (z − i)/((z − i)(z + i)) = 1/(2i)
> Integral = 2πi × 1/(2i) = π (the arc contributes 0 as its radius grows)
K: Holomorphic ⇔ Cauchy–Riemann; holomorphic functions are analytic; ∮ f dz = 2πi Σ residues; Liouville and contour methods give powerful results.
!: Including poles outside the contour in the sum of residues.
Q: What is ∮ dz/z around the unit circle? | 2πi.
Q: Is f(z) = conj(z) holomorphic? | No: it fails the Cauchy–Riemann equations.
SUM: Complex differentiability is very strong.
SUM: Residues evaluate integrals.
SRC: Stein EM, Shakarchi R, Complex Analysis (Princeton University Press 2003) | textbook | 2003 | https://press.princeton.edu/
SRC: Ahlfors LV, Complex Analysis (3rd edn, McGraw-Hill 1979) | textbook | 1979 | https://www.mheducation.com/
NUM1#maths-u09-02-q1@1: What is the residue of e^{z}/z at z = 0? | 1 | 0 |  | A simple pole: lim z × e^{z}/z = e^{0} = 1.
M1#maths-u09-02-q2@1: Which function is entire (holomorphic everywhere)? | e^{z} | 1/z | |z|^{2} | conj(z) | 1/(1 − z) | e^{z} has a convergent power series everywhere; the others have poles or fail Cauchy–Riemann.
M2#maths-u09-02-q3@2: How does Liouville's theorem prove the fundamental theorem of algebra? | If p had no roots, 1/p would be bounded and entire, hence constant | It shows all polynomials are linear | It computes roots explicitly | It applies only to real polynomials | It bounds every polynomial on ℂ, forcing all of them to be constant | A non-constant polynomial p makes 1/p non-constant, so p must have a root.

## Harmonic Analysis
S: Harmonic analysis decomposes functions into basic waves and studies how well the pieces reconstruct the whole. Beginning with Fourier series, it now spans Fourier transforms on groups, wavelets and deep convergence theorems.
O: Use Parseval's identity and orthogonality in Fourier analysis
O: Describe convergence results and modern developments
T: Parseval's identity | For f in L^{2}, the energy (1/π)∫|f|^{2} equals a₀^{2}/2 + Σ (a_{n}^{2} + b_{n}^{2})
T: L^{2} convergence | Convergence in mean square: ∫|f − S_{N}|^{2} → 0
H: Convergence
- For L^{2} functions, Fourier series converge in mean square.
- Pointwise convergence is subtle: Kolmogorov found an L¹ function whose Fourier series diverges everywhere.
- Carleson (1966): Fourier series of L^{2} functions converge almost everywhere.
H: Tools
- Orthogonality of sines and cosines, Bessel's inequality and Parseval's identity.
- Convolution and approximate identities (Fejér's theorem: Cesàro means converge for continuous functions).
- The Fourier transform on ℝ and Plancherel's theorem.
H: Beyond Fourier
- Fourier analysis on groups (characters) unifies series, transforms and the discrete transform.
- Wavelets localise in time and frequency (JPEG 2000).
- Applications: PDEs, number theory (exponential sums), signal processing.
X: Use Parseval's identity for f(x) = x on (−π, π) to find Σ 1/n^{2}.
> f is odd: a_{n} = 0 and b_{n} = 2(−1)^{n+1}/n, so Σ b_{n}^{2} = 4Σ 1/n^{2}
> (1/π)∫_{−π}^{π} x^{2} dx = 2π^{2}/3
> 4Σ 1/n^{2} = 2π^{2}/3, so Σ 1/n^{2} = π^{2}/6
K: Parseval equates energy in the function and its coefficients; L^{2} series converge in mean and (Carleson) almost everywhere; harmonic analysis extends to groups and wavelets.
!: Assuming every Fourier series converges at every point.
Q: What did Carleson prove? | Fourier series of L^{2} functions converge almost everywhere.
Q: What does Fejér's theorem say? | Cesàro means of the Fourier series of a continuous periodic function converge uniformly.
SUM: Harmonic analysis studies decomposition into waves.
SUM: Convergence is deep and subtle.
SRC: Stein EM, Shakarchi R, Fourier Analysis: An Introduction (Princeton University Press 2003) | textbook | 2003 | https://press.princeton.edu/
SRC: Carleson L, On convergence and growth of partial sums of Fourier series, Acta Mathematica 116, 135 | journal | 1966 | https://doi.org/10.1007/BF02392815
NUM1#maths-u09-03-q1@1: Evaluate π^{2}/6 to 4 decimal places. | 1.6449 | 0.0001 |  | π^{2}/6 ≈ 9.8696/6 ≈ 1.6449, the sum of 1/n^{2}.
M1#maths-u09-03-q2@1: What guarantees that Fourier series of square-integrable functions converge in mean square? | Completeness of the trigonometric system in L^{2} | Every function is continuous | Fourier series are finite | Pointwise convergence everywhere | Carleson's theorem alone | The sines and cosines form an orthonormal basis of L^{2}.
M2#maths-u09-03-q3@2: Why are wavelets useful where Fourier series struggle? | They localise in both time and frequency, capturing short events | Their coefficients never need computing, as they come from tables | They need no computation | They converge everywhere always | They ignore high frequencies | Sines spread over the whole interval; wavelets capture transients and edges compactly.

## Measure Theory
S: Measure theory generalises length, area and probability to assign sizes to very complicated sets. It underlies modern integration and probability, and it explains surprises such as uncountable sets with zero length.
O: Define σ-algebras and measures
O: Calculate measures of simple sets and recognise sets of measure zero
T: σ-algebra | A collection of sets closed under complements and countable unions, containing the whole space
T: Measure | A function μ on a σ-algebra with μ(∅) = 0 and countable additivity for disjoint sets
H: Lebesgue measure
- Extends length: the measure of [a, b] is b − a.
- Countable sets have measure 0, so ℚ ∩ [0, 1] has measure 0 although it's dense.
- The Cantor set is uncountable with measure 0.
H: Limits of measure
- Not every set can be measured: Vitali's set (built with the axiom of choice) isn't Lebesgue measurable.
- The Banach–Tarski paradox shows why: non-measurable pieces can be rearranged into two balls.
- So measures are defined on σ-algebras, not all subsets.
H: Probability
- Kolmogorov (1933): a probability space is a measure space with total measure 1.
- Events are measurable sets; random variables are measurable functions.
- "Almost surely" means except on a set of probability 0.
X: Show that the Cantor set has measure 0.
> Remove the middle third (length 1/3), then 2 middle ninths (2/9), then 4 pieces of 1/27, …
> Total removed = 1/3 + 2/9 + 4/27 + … = (1/3)/(1 − 2/3) = 1
> The remaining Cantor set has measure 1 − 1 = 0
K: Measures are countably additive set functions on σ-algebras; Lebesgue measure extends length; countable and some uncountable sets have measure 0; not every set is measurable.
!: Assuming that a set with measure zero must be countable.
Q: What is the Lebesgue measure of ℚ? | 0.
Q: Why are measures defined on σ-algebras rather than all subsets? | Some sets can't be consistently measured.
SUM: Measures generalise length and probability.
SUM: Measure-zero sets can still be large.
SRC: Folland GB, Real Analysis: Modern Techniques and Their Applications (2nd edn, Wiley 1999) | textbook | 1999 | https://www.wiley.com/
SRC: Tao T, An Introduction to Measure Theory (American Mathematical Society 2011) | textbook | 2011 | https://terrytao.files.wordpress.com/2012/12/gsm-126-tao5-measure-book.pdf
NUM1#maths-u09-04-q1@1: Find the total length removed from [0, 1] after the first three steps of the Cantor construction, to 4 decimal places. | 0.7037 | 0.0001 |  | 1/3 + 2/9 + 4/27 = 19/27 ≈ 0.7037.
M1#maths-u09-04-q2@1: Which set has Lebesgue measure zero? | The integers | The interval [0, 0.001] | The irrationals in [0, 1] | The interval (2, 3) | The real line | Countable sets such as ℤ have measure 0; the others have positive measure.
M3#maths-u09-04-q3@2: The irrational numbers in [0, 1] have what Lebesgue measure? | 1 | 0 | ½ | It's undefined | π/4 | [0, 1] has measure 1 and the rationals have measure 0, so the irrationals have measure 1.

## Lebesgue Integration
S: Lebesgue integration slices the range of a function rather than its domain. It integrates far more functions than the Riemann integral, and its convergence theorems make it safe to swap limits and integrals, which is essential in probability and PDEs.
O: Explain the Lebesgue integral and compare it with the Riemann integral
O: Apply the monotone and dominated convergence theorems
T: Simple function | A finite combination Σ c_{i} 1_{A_{i}} of indicator functions of measurable sets
T: Dominated convergence theorem | If f_{n} → f pointwise and |f_{n}| ≤ g with ∫ g < ∞, then ∫ f_{n} → ∫ f
H: The integral
- ∫ Σ c_{i} 1_{A_{i}} = Σ c_{i} μ(A_{i}) for simple functions.
- For f ≥ 0: the supremum of integrals of simple functions below f.
- Lebesgue's analogy: count coins by sorting them by value, not in the order received.
H: More functions
- Dirichlet's function (1 on rationals, 0 on irrationals) isn't Riemann integrable, but its Lebesgue integral on [0, 1] is 0.
- Every Riemann integrable function is Lebesgue integrable with the same value.
- L^{p} spaces of functions with ∫|f|^{p} < ∞ are complete (Riesz–Fischer).
H: Convergence theorems
- Monotone convergence: 0 ≤ f_{n} ↑ f implies ∫ f_{n} ↑ ∫ f.
- Dominated convergence: needs a single integrable bound g.
- Fubini–Tonelli: when iterated integrals can be swapped.
X: Use dominated convergence to find lim ∫₀¹ x^{n} dx.
> x^{n} → 0 for 0 ≤ x < 1 (and 1 at the single point x = 1, a set of measure 0)
> |x^{n}| ≤ 1, and ∫₀¹ 1 dx = 1 < ∞
> So lim ∫₀¹ x^{n} dx = ∫₀¹ 0 dx = 0 (directly: 1/(n + 1) → 0)
K: Lebesgue integration slices the range; it integrates more functions; monotone and dominated convergence justify swapping limits and integrals.
!: Swapping a limit and an integral without a dominating function: f_{n} = n·1_{(0, 1/n)} → 0 but ∫ f_{n} = 1.
Q: What is the Lebesgue integral of Dirichlet's function on [0, 1]? | 0.
Q: What does the dominated convergence theorem need? | Pointwise convergence and a single integrable bound.
SUM: Lebesgue integration slices by value.
SUM: Its convergence theorems are its power.
SRC: Folland GB, Real Analysis: Modern Techniques and Their Applications (2nd edn, Wiley 1999) | textbook | 1999 | https://www.wiley.com/
SRC: Rudin W, Real and Complex Analysis (3rd edn, McGraw-Hill 1987) | textbook | 1987 | https://www.mheducation.com/
NUM1#maths-u09-05-q1@1: Find ∫₀¹ x^{9} dx. | 0.1 | 0.0001 |  | 1/(9 + 1) = 0.1.
M1#maths-u09-05-q2@1: Which function is Lebesgue but not Riemann integrable on [0, 1]? | The indicator of the rationals | x^{2} | sin x | A step function | The constant 1 | It's discontinuous everywhere, defeating Riemann sums, but its Lebesgue integral is 0.
M3#maths-u09-05-q3@2: Why doesn't ∫ f_{n} → ∫ f for f_{n} = n on (0, 1/n) and 0 elsewhere? | No integrable function dominates all the f_{n} | The f_{n} don't converge | The limit isn't measurable | Lebesgue integrals can't be computed | It does converge | f_{n} → 0 pointwise but each has integral 1; the bound sup f_{n} isn't integrable.

## Distribution Theory
S: Distributions, or generalised functions, give rigorous meaning to objects like the Dirac delta, which physicists used long before mathematicians could justify them. Every distribution can be differentiated, making PDE theory much more flexible.
O: Work with the Dirac delta and test functions
O: Differentiate distributions such as the Heaviside function
T: Test function | A smooth function that vanishes outside a bounded set
T: Dirac delta | The distribution δ with ⟨δ, φ⟩ = φ(0) for every test function φ
H: Definition
- A distribution is a continuous linear functional on test functions.
- Ordinary functions act by ⟨f, φ⟩ = ∫ fφ dx.
- δ isn't a function: no ordinary f has ∫ fφ = φ(0) for all φ.
- Informally, ∫ δ(x − a)φ(x) dx = φ(a).
H: Derivatives
- ⟨T′, φ⟩ = −⟨T, φ′⟩ (from integration by parts).
- The Heaviside step H has H′ = δ.
- |x| has derivative sign(x) and second derivative 2δ.
H: Uses
- Green's functions: solutions of L G = δ build solutions of Lu = f by convolution.
- Weak solutions of PDEs; Fourier transforms of tempered distributions (the transform of 1 is 2πδ).
- Laurent Schwartz developed the theory around 1950 (Fields Medal).
X: Evaluate ∫ δ(x − 2) x^{3} dx and find the second derivative of |x| as a distribution.
> The delta picks out the value at 2: 2^{3} = 8
> |x|′ = sign(x), which jumps by 2 at 0
> So |x|″ = 2δ
K: Distributions act on test functions; δ samples at a point; derivatives are defined by moving them onto test functions; H′ = δ; Green's functions solve Lu = δ.
!: Treating δ as an ordinary function with a value at 0.
Q: What is the derivative of the Heaviside step function? | The Dirac delta δ.
Q: What is ∫ δ(x) cos x dx? | 1.
SUM: Distributions generalise functions.
SUM: They can always be differentiated.
SRC: Strichartz RS, A Guide to Distribution Theory and Fourier Transforms (World Scientific 2003) | textbook | 2003 | https://www.worldscientific.com/
SRC: Schwartz L, Théorie des distributions (Hermann 1950) | textbook | 1950 | https://www.editions-hermann.fr/
NUM1#maths-u09-06-q1@1: Evaluate ∫ δ(x − 1)(x^{2} + 3) dx. | 4 | 0 |  | The delta samples the function at x = 1: 1 + 3 = 4.
M1#maths-u09-06-q2@1: How is the derivative of a distribution T defined? | ⟨T′, φ⟩ = −⟨T, φ′⟩ | ⟨T′, φ⟩ = ⟨T, φ⟩′ | ⟨T′, φ⟩ = ⟨T, φ⟩^{2} | ⟨T′, φ⟩ = φ(0) | It can't be defined | Integration by parts moves the derivative onto the smooth test function.
M2#maths-u09-06-q3@2: What is a Green's function for a linear operator L? | A solution of LG = δ, used to solve Lu = f by convolution | Any harmonic function | The inverse of a matrix only | The eigenvalue of L | A harmonic function chosen to vanish on the boundary of the region | Superposing responses to point sources gives the solution for any source f.

## Functional Analysis
S: Functional analysis studies infinite-dimensional vector spaces of functions, equipped with norms or inner products, and the linear maps between them. It provides the framework for PDEs, quantum mechanics, optimisation and signal processing.
O: Recognise normed function spaces and how infinite dimensions differ from finite ones
O: State the main theorems of functional analysis
T: Normed space | A vector space with a norm ‖·‖ measuring the size of vectors
T: Bounded linear functional | A linear map from the space to the scalars with |f(x)| ≤ C‖x‖
H: Spaces of functions
- C[a, b] with ‖f‖_{∞} = max |f|; L^{p} with ‖f‖_{p} = (∫|f|^{p})^{1/p}; sequence spaces ℓ^{p}.
- In infinite dimensions, different norms aren't equivalent, and the closed unit ball isn't compact.
- Linear maps can be unbounded (differentiation on C[0, 1]).
H: The big theorems
- Hahn–Banach: bounded functionals extend from subspaces; there are enough functionals to separate points.
- Uniform boundedness: pointwise-bounded families of operators are uniformly bounded.
- Open mapping and closed graph theorems: control inverses of operators.
H: Uses
- Existence of solutions to PDEs (Sobolev spaces, Lax–Milgram).
- Quantum mechanics in Hilbert space.
- Optimisation and duality in infinite dimensions.
X: Show that the closed unit ball of ℓ^{2} isn't compact.
> The unit vectors e₁ = (1, 0, 0, …), e₂ = (0, 1, 0, …), … all lie in the ball
> ‖e_{n} − e_{m}‖ = √2 for n ≠ m
> So no subsequence is Cauchy, and none converges: the ball isn't compact
K: Function spaces are normed vector spaces; infinite dimensions break compactness and norm equivalence; Hahn–Banach, uniform boundedness and open mapping are the pillars.
!: Assuming a bounded sequence in an infinite-dimensional space must have a convergent subsequence.
Q: Is differentiation a bounded operator on C[0, 1] with the max norm? | No: ‖(sin nx)′‖ = n can be huge while ‖sin nx‖ = 1.
Q: What does the Hahn–Banach theorem allow? | Extending bounded linear functionals from a subspace to the whole space.
SUM: Functional analysis is linear algebra in infinite dimensions.
SUM: Compactness and boundedness need care.
SRC: Kreyszig E, Introductory Functional Analysis with Applications (Wiley 1978) | textbook | 1978 | https://www.wiley.com/
SRC: Brezis H, Functional Analysis, Sobolev Spaces and Partial Differential Equations (Springer 2011) | textbook | 2011 | https://link.springer.com/
NUM1#maths-u09-07-q1@1: Find the ℓ^{2} norm of the sequence (3, 4, 0, 0, …). | 5 | 0 |  | √(3^{2} + 4^{2}) = 5.
M1#maths-u09-07-q2@1: Which property fails in infinite-dimensional normed spaces? | The closed unit ball is compact | Vectors can be added | Norms satisfy the triangle inequality | Scalars can multiply vectors | Zero is a vector | Riesz's lemma shows the closed unit ball is compact only in finite dimensions.
M2#maths-u09-07-q3@2: What does the uniform boundedness principle say? | A family of bounded operators on a Banach space bounded at each point is bounded in norm | Every operator is bounded | Every linear operator between Banach spaces is automatically bounded | Every sequence converges | Functionals can be extended | Pointwise bounds on a complete space force a uniform bound on the operator norms.

## Banach Spaces
S: A Banach space is a complete normed vector space: Cauchy sequences always converge. Completeness is what makes iterative methods, series and fixed-point arguments work, including the proof that ordinary differential equations have solutions.
O: Recognise Banach spaces and incomplete normed spaces
O: Apply the Banach fixed-point theorem
T: Banach space | A normed vector space in which every Cauchy sequence converges
T: Contraction | A map T with ‖Tx − Ty‖ ≤ k‖x − y‖ for some k < 1
H: Examples
- ℝ^{n}, C[a, b] with the max norm, ℓ^{p} and L^{p} for 1 ≤ p ≤ ∞.
- Not complete: polynomials on [0, 1] with the max norm (their uniform limits include e^{x}).
- Any normed space can be completed, as ℚ completes to ℝ.
H: Banach fixed-point theorem
- A contraction on a complete metric space has exactly one fixed point.
- Iterating x_{n+1} = Tx_{n} from any start converges to it, with error at most kⁿ/(1 − k) × ‖x₁ − x₀‖.
- Picard–Lindelöf: rewriting y′ = f(t, y) as an integral equation gives a contraction, so solutions exist and are unique.
H: Operators
- Bounded linear operators between Banach spaces form a Banach space with the operator norm.
- Series Σ xₙ converge if Σ ‖xₙ‖ does (absolute convergence works in complete spaces).
X: Find the fixed point of T(x) = x/2 + 1 on ℝ by iteration from x₀ = 0.
> T is a contraction with k = ½
> Iterates: 1, 1.5, 1.75, 1.875, … approaching 2
> Check: T(2) = 1 + 1 = 2, the unique fixed point
K: Banach spaces are complete normed spaces; contractions on them have unique fixed points found by iteration; this proves existence for ODEs.
!: Applying the fixed-point theorem without checking completeness or k < 1.
Q: Are polynomials on [0, 1] with the max norm a Banach space? | No: they aren't complete.
Q: What does the Banach fixed-point theorem need? | A contraction on a complete metric space.
SUM: Completeness makes limits exist.
SUM: Contractions have unique fixed points.
SRC: Kreyszig E, Introductory Functional Analysis with Applications (Wiley 1978) | textbook | 1978 | https://www.wiley.com/
SRC: Banach S, Sur les opérations dans les ensembles abstraits et leur application aux équations intégrales, Fundamenta Mathematicae 3, 133 | journal | 1922 | https://doi.org/10.4064/fm-3-1-133-181
NUM1#maths-u09-08-q1@1: Find the max norm of f(x) = x − x^{2} on [0, 1]. | 0.25 | 0.0001 |  | The maximum is at x = ½: ½ − ¼ = ¼.
M1#maths-u09-08-q2@1: Which space is a Banach space? | C[0, 1] with the maximum norm | The rationals with |·| | Polynomials on [0, 1] with the maximum norm | Continuous functions on [0, 1] with the L¹ norm | Finite sequences with the ℓ^{2} norm | Uniform limits of continuous functions are continuous, so C[0, 1] is complete in the max norm.
M2#maths-u09-08-q3@2: Why does the Banach fixed-point theorem prove that y′ = f(t, y), y(0) = y₀ has a unique solution (for Lipschitz f, on a short interval)? | The integral form defines a contraction on a complete space of functions | Linear ODEs are the only ones it covers, through matrix powers | Solutions are always polynomials | Fixed points never exist | It doesn't prove it | Picard's operator y ↦ y₀ + ∫ f(s, y(s)) ds is a contraction for small t.

## Hilbert Spaces
S: A Hilbert space is a complete space with an inner product, so it has lengths, angles and orthogonal projections, even in infinite dimensions. L^{2} is the main example, and Hilbert spaces are the setting for Fourier series and quantum mechanics.
O: Use inner products, orthonormal bases and projections in Hilbert spaces
O: Apply Parseval's identity and the Riesz representation theorem
T: Hilbert space | A complete inner product space
T: Orthonormal basis | Orthonormal vectors e_{n} with x = Σ ⟨x, e_{n}⟩e_{n} for every x
H: Geometry
- ⟨x, y⟩ gives ‖x‖ = √⟨x, x⟩; Cauchy–Schwarz: |⟨x, y⟩| ≤ ‖x‖‖y‖.
- Projection theorem: every closed subspace M has a unique nearest point to x, and x − Px ⟂ M.
- Pythagoras holds for orthogonal vectors, even infinitely many.
H: Bases
- L^{2}[−π, π]: {1/√(2π), cos nx/√π, sin nx/√π} is an orthonormal basis (Fourier series).
- Bessel: Σ |⟨x, e_{n}⟩|^{2} ≤ ‖x‖^{2}, with equality (Parseval) for a basis.
- Every separable infinite-dimensional Hilbert space is isomorphic to ℓ^{2}.
H: Duality and physics
- Riesz representation: every bounded linear functional is f(x) = ⟨x, y⟩ for a unique y.
- Quantum states are unit vectors; observables are self-adjoint operators (Spectral Theory).
- Least squares and best approximations are projections.
X: Find ‖sin x‖ in L^{2}[−π, π].
> ‖sin x‖^{2} = ∫_{−π}^{π} sin^{2} x dx
> = ∫ (1 − cos 2x)/2 dx = π
> ‖sin x‖ = √π ≈ 1.772
K: Inner products give length, angle and projection; orthonormal bases expand every vector; Parseval and Riesz representation hold; L^{2} and ℓ^{2} are the models.
!: Forgetting to normalise basis functions, such as using sin nx instead of sin nx/√π.
Q: What does Cauchy–Schwarz state? | |⟨x, y⟩| ≤ ‖x‖‖y‖.
Q: Which Hilbert space is every separable infinite-dimensional one isomorphic to? | ℓ^{2}.
SUM: Hilbert spaces have geometry in infinite dimensions.
SUM: They host Fourier series and quantum mechanics.
SRC: Kreyszig E, Introductory Functional Analysis with Applications (Wiley 1978) | textbook | 1978 | https://www.wiley.com/
SRC: Reed M, Simon B, Methods of Modern Mathematical Physics I: Functional Analysis (revised edn, Academic Press 1980) | textbook | 1980 | https://www.sciencedirect.com/
NUM1#maths-u09-09-q1@1: Find ⟨x, y⟩ in ℓ^{2} for x = (1, 2, 0, …) and y = (3, −1, 5, …) with all other entries zero. | 1 | 0 |  | 1 × 3 + 2 × (−1) + 0 × 5 = 1.
M1#maths-u09-09-q2@1: What does the projection theorem guarantee in a Hilbert space? | A unique closest point in any closed subspace | Every subspace is finite-dimensional | All vectors are orthogonal | Every operator is bounded | Every functional is zero | Completeness and the inner product guarantee a unique best approximation.
M2#maths-u09-09-q3@2: What does the Riesz representation theorem say? | Every bounded linear functional is an inner product with a fixed vector | Bounded operators on Hilbert spaces always have eigenvalues | Every Banach space is a Hilbert space | Fourier series converge pointwise | Hilbert spaces are finite-dimensional | Each bounded linear functional f has the form f(x) = ⟨x, y_{f}⟩ for one unique vector y_{f}.

## Operator Theory
S: Operator theory studies linear maps between infinite-dimensional spaces: their norms, adjoints, inverses and special classes such as compact, self-adjoint and unitary operators. These are the infinite-dimensional matrices of analysis and physics.
O: Calculate operator norms and adjoints in simple cases
O: Classify operators as self-adjoint, unitary, normal or compact
T: Operator norm | ‖T‖ = sup{‖Tx‖ : ‖x‖ ≤ 1}
T: Adjoint | T*, defined by ⟨Tx, y⟩ = ⟨x, T*y⟩
H: Classes of operators
- Self-adjoint: T = T* (like symmetric matrices; real spectrum).
- Unitary: T*T = TT* = I (preserves inner products).
- Normal: T*T = TT*.
- Compact: maps bounded sets to sets with compact closure; limits of finite-rank operators.
H: Infinite-dimensional surprises
- The right shift S(x₁, x₂, …) = (0, x₁, x₂, …) on ℓ^{2} is an isometry but not onto: S*S = I but SS* ≠ I.
- Injective doesn't imply surjective.
- Differential operators are unbounded and need careful domains.
H: Uses
- Integral operators (Kf)(x) = ∫ k(x, y)f(y) dy are compact for nice kernels.
- Quantum observables are self-adjoint; time evolution is unitary.
X: Find the operator norm of the diagonal matrix diag(3, −5) and explain the shift's behaviour.
> For a diagonal matrix, ‖T‖ is the largest |entry|: 5
> The right shift preserves norms (‖Sx‖ = ‖x‖), so ‖S‖ = 1
> But e₁ = (1, 0, 0, …) isn't in the range of S, so S isn't unitary
K: ‖T‖ is the largest stretching; adjoints move T across the inner product; self-adjoint, unitary, normal and compact operators generalise matrix classes; the shift shows infinite-dimensional surprises.
!: Assuming an isometry on an infinite-dimensional space must be unitary.
Q: What is the adjoint of a real matrix? | Its transpose.
Q: Is the right shift on ℓ^{2} surjective? | No: nothing maps to e₁.
SUM: Operators generalise matrices.
SUM: Infinite dimensions bring new behaviour.
SRC: Conway JB, A Course in Functional Analysis (2nd edn, Springer 1990) | textbook | 1990 | https://link.springer.com/
SRC: Kreyszig E, Introductory Functional Analysis with Applications (Wiley 1978) | textbook | 1978 | https://www.wiley.com/
NUM1#maths-u09-10-q1@1: Find the operator norm of the matrix diag(2, −7). | 7 | 0 |  | A diagonal matrix's norm is its largest absolute entry, |−7| = 7.
M1#maths-u09-10-q2@1: Which operator is self-adjoint? | A real symmetric matrix | The right shift on ℓ^{2} | A rotation by 90° | A non-symmetric real matrix | Differentiation with no domain conditions | Real symmetric matrices satisfy A = Aᵀ = A*.
M2#maths-u09-10-q3@2: The right shift S on ℓ^{2} satisfies S*S = I. Why isn't it unitary? | SS* ≠ I: S isn't onto, so it has no two-sided inverse | It doesn't preserve norms | S* doesn't exist | It's not linear | It is unitary | Unitary operators must also be surjective; e₁ is missed by S.

## Spectral Theory
S: Spectral theory generalises eigenvalues to operators on infinite-dimensional spaces. The spectrum may include continuous ranges as well as eigenvalues, and the spectral theorem diagonalises self-adjoint operators, which is the mathematics of quantum measurement.
O: Find spectra of simple operators and matrices
O: State the spectral theorem for compact self-adjoint operators
T: Spectrum | σ(T), the set of λ for which T − λI has no bounded inverse
T: Spectral radius | r(T) = max{|λ| : λ ∈ σ(T)} = lim ‖Tⁿ‖^{1/n}
H: The spectrum
- For matrices, the spectrum is the set of eigenvalues.
- In infinite dimensions there can be continuous spectrum with no eigenvectors.
- Multiplication by x on L^{2}[0, 1] has spectrum [0, 1] and no eigenvalues.
- The spectrum of a bounded operator is non-empty and compact.
H: Spectral theorem
- Compact self-adjoint operators have real eigenvalues accumulating only at 0, and an orthonormal basis of eigenvectors.
- General self-adjoint operators are "multiplication operators" in disguise (via spectral measures).
- Normal matrices are unitarily diagonalisable.
H: Physics and applications
- Quantum observables are self-adjoint; measurement outcomes are spectral values.
- Hydrogen's energy levels are the discrete spectrum of its Hamiltonian; its ionised states form continuous spectrum.
- Vibrations, stability analysis and graph theory (spectral graph theory) use spectra.
X: Find the spectrum and spectral radius of A = [[2, 1], [1, 2]].
> det(A − λI) = (2 − λ)^{2} − 1 = 0
> λ = 1 or λ = 3
> σ(A) = {1, 3}; spectral radius 3 (A is symmetric, so it's diagonalisable with orthonormal eigenvectors)
K: The spectrum generalises eigenvalues and can be continuous; compact self-adjoint operators diagonalise with real eigenvalues; spectral theory underlies quantum mechanics.
!: Thinking every point of the spectrum is an eigenvalue.
Q: What is the spectrum of multiplication by x on L^{2}[0, 1]? | [0, 1].
Q: Are the eigenvalues of a self-adjoint operator real? | Yes.
SUM: Spectra generalise eigenvalues.
SUM: The spectral theorem diagonalises.
SRC: Reed M, Simon B, Methods of Modern Mathematical Physics I: Functional Analysis (revised edn, Academic Press 1980) | textbook | 1980 | https://www.sciencedirect.com/
SRC: Conway JB, A Course in Functional Analysis (2nd edn, Springer 1990) | textbook | 1990 | https://link.springer.com/
NUM1#maths-u09-11-q1@1: Find the spectral radius of [[2, 1], [1, 2]]. | 3 | 0 |  | The eigenvalues are 1 and 3, so the spectral radius is 3.
M1#maths-u09-11-q2@1: Which statement holds for every bounded operator on a complex Banach space? | Its spectrum is non-empty and compact | Its spectrum is empty | Every spectral value is an eigenvalue | Its spectrum is all of ℂ | Its spectrum is a single point | Gelfand proved non-emptiness; closedness and boundedness give compactness.
M3#maths-u09-11-q3@2: Why does multiplication by x on L^{2}[0, 1] have no eigenvalues? | xf(x) = λf(x) forces f = 0 except at the single point λ, a set of measure 0 | The operator is unbounded | Multiplication by x is unbounded, so eigenvalues can't be defined | Every function is an eigenvector | It has eigenvalue 1 only | (x − λ)f = 0 almost everywhere means f = 0 in L^{2}.

## Banach Algebras
S: A Banach algebra is a Banach space with a multiplication compatible with the norm. Bounded operators, continuous functions and convolution algebras are examples, and Gelfand's theory turns commutative Banach algebras into algebras of functions.
O: Recognise Banach algebras and compute spectra of elements
O: Use the Neumann series and state the Gelfand–Mazur theorem
T: Banach algebra | A Banach space with an associative multiplication satisfying ‖xy‖ ≤ ‖x‖‖y‖
T: Neumann series | (1 − x)^{−1} = Σ xⁿ, which converges when ‖x‖ < 1
H: Examples
- B(X): bounded operators on a Banach space, with composition.
- C(K): continuous functions on a compact space, with pointwise product and max norm.
- L¹(ℝ) with convolution: the setting for Wiener's work on Fourier series.
H: Spectrum
- σ(x) = {λ : x − λ1 not invertible}; non-empty and compact (Gelfand).
- In C[0, 1], the spectrum of f is its range.
- Neumann series: if ‖x‖ < 1, 1 − x is invertible with ‖(1 − x)^{−1}‖ ≤ 1/(1 − ‖x‖).
H: Gelfand theory
- Gelfand–Mazur: a complex Banach algebra in which every non-zero element is invertible is ℂ.
- Commutative Banach algebras map into C(K) via the Gelfand transform.
- Wiener's lemma (non-vanishing absolutely convergent Fourier series have absolutely convergent reciprocals) has a short Gelfand proof.
X: In C[0, 1], find the spectrum of f(x) = x^{2} + 1.
> f − λ is invertible exactly when it never vanishes on [0, 1]
> f takes all values from 1 to 2
> So σ(f) = [1, 2], the range of f
K: Banach algebras combine completeness and multiplication; spectra are non-empty and compact; Neumann series invert 1 − x for ‖x‖ < 1; Gelfand theory turns commutative ones into function algebras.
!: Forgetting the submultiplicative condition ‖xy‖ ≤ ‖x‖‖y‖.
Q: What is the spectrum of a function in C[0, 1]? | Its range.
Q: What does the Gelfand–Mazur theorem say? | A complex Banach division algebra is ℂ.
SUM: Banach algebras add multiplication to Banach spaces.
SUM: Gelfand theory represents them as functions.
SRC: Conway JB, A Course in Functional Analysis (2nd edn, Springer 1990) | textbook | 1990 | https://link.springer.com/
SRC: Rudin W, Functional Analysis (2nd edn, McGraw-Hill 1991) | textbook | 1991 | https://www.mheducation.com/
NUM1#maths-u09-12-q1@1: If ‖x‖ = 0.2 in a Banach algebra, what bound does the Neumann series give for ‖(1 − x)^{−1}‖? | 1.25 | 0.0001 |  | 1/(1 − 0.2) = 1.25.
M1#maths-u09-12-q2@1: Which is a Banach algebra under its natural product? | The bounded operators on a Banach space | The natural numbers | Polynomials with the max norm on [0, 1] | The rationals | Finite sets | B(X) is complete in the operator norm, and composition satisfies ‖ST‖ ≤ ‖S‖‖T‖.
M2#maths-u09-12-q3@2: Why does 1 − x have an inverse when ‖x‖ < 1? | The series 1 + x + x^{2} + … converges in the complete space and inverts it | Every element is invertible | Banach algebras make all elements invertible, whatever their norm | Because ‖1‖ = 0 | It needn't have one | Absolute convergence (Σ‖x‖ⁿ < ∞) in a Banach space gives a convergent geometric series.

## C*-Algebras
S: A C*-algebra is a Banach algebra with an adjoint operation whose norm obeys ‖x*x‖ = ‖x‖^{2}. They abstract algebras of operators on Hilbert space, and the commutative ones are exactly algebras of continuous functions, leading to "noncommutative geometry".
O: Check the C*-identity in simple examples
O: State the Gelfand–Naimark theorems
T: C*-algebra | A Banach algebra with an involution x ↦ x* satisfying ‖x*x‖ = ‖x‖^{2}
T: Involution | A map with (x*)* = x, (xy)* = y*x*, (λx)* = conj(λ)x*
H: Examples
- B(H), bounded operators on a Hilbert space, with the adjoint.
- Matrices M_{n}(ℂ) with the conjugate transpose and operator norm.
- C₀(X): continuous functions vanishing at infinity, with f* = conj(f).
H: Gelfand–Naimark
- Commutative C*-algebras are exactly C₀(X) for a locally compact space X.
- Every C*-algebra is isomorphic to a closed *-subalgebra of some B(H).
- So C*-algebras are "algebras of operators", and non-commutative ones behave like functions on "non-commutative spaces" (Connes).
H: Uses
- Quantum mechanics: observables form a C*-algebra; states are positive functionals.
- K-theory of C*-algebras and index theorems.
- Quantum information and quantum statistical mechanics.
X: Check ‖x*x‖ = ‖x‖^{2} for x = diag(2, 3i) in M₂(ℂ).
> x* = diag(2, −3i), so x*x = diag(4, 9)
> ‖x*x‖ = 9 (largest entry)
> ‖x‖ = max(|2|, |3i|) = 3, and 3^{2} = 9 ✓
K: C*-algebras satisfy ‖x*x‖ = ‖x‖^{2}; commutative ones are function algebras; all are operator algebras on Hilbert space (Gelfand–Naimark).
!: Confusing the C*-identity with ‖x*‖ = ‖x‖, which is weaker.
Q: What is the involution on C₀(X)? | Complex conjugation of functions.
Q: What are commutative C*-algebras, by Gelfand–Naimark? | Algebras C₀(X) of continuous functions.
SUM: C*-algebras abstract operator algebras.
SUM: Commutative ones are function algebras.
SRC: Murphy GJ, C*-Algebras and Operator Theory (Academic Press 1990) | textbook | 1990 | https://www.sciencedirect.com/
SRC: Davidson KR, C*-Algebras by Example (American Mathematical Society 1996) | textbook | 1996 | https://bookstore.ams.org/
NUM1#maths-u09-13-q1@1: In a C*-algebra, ‖x‖ = 4. What is ‖x*x‖? | 16 | 0 |  | The C*-identity gives ‖x*x‖ = ‖x‖^{2} = 16.
M1#maths-u09-13-q2@1: Which is a C*-algebra? | B(H) with the operator adjoint | ℓ¹ with convolution and no involution | Polynomials with the max norm | The integers | Any Banach space | B(H) is complete, closed under adjoints, and satisfies the C*-identity ‖T*T‖ = ‖T‖^{2}.
M2#maths-u09-13-q3@2: What is the significance of the second Gelfand–Naimark theorem? | Every C*-algebra can be realised concretely as operators on a Hilbert space | Every C*-algebra is commutative | C*-algebras are all commutative, so they're spaces of functions | All operators are compact | Hilbert spaces are finite | Abstract C*-algebras embed isometrically into some B(H).

## Operator Algebras
S: Operator algebras are algebras of operators on Hilbert space closed under adjoints and suitable limits: C*-algebras and von Neumann algebras. Murray and von Neumann's classification of factors led to deep connections with quantum physics, knot theory and quantum information.
O: Define von Neumann algebras and the double commutant theorem
O: Describe the classification of factors and some applications
T: Commutant | M′ = {T : TS = ST for all S in M}
T: von Neumann algebra | A *-algebra of operators containing I with M = M″ (equivalently, closed in the weak operator topology)
H: von Neumann algebras
- Double commutant theorem: a unital *-algebra is weakly closed iff it equals its double commutant.
- Factors: von Neumann algebras whose centre is just the scalars; every one decomposes into factors.
- Murray–von Neumann types: I (like matrix algebras), II and III (with no minimal projections).
H: Landmarks
- Connes' classification of injective factors (Fields Medal, 1982).
- Jones's subfactor theory led to the Jones polynomial of knots (Fields Medal, 1990).
- Popa and others built deformation-rigidity theory.
H: Applications
- Quantum field theory: algebras of observables in regions of spacetime are type III factors.
- Quantum information: entanglement and quantum channels.
- Free probability (Voiculescu) for large random matrices.
X: Find the commutant of the algebra of 2 × 2 diagonal matrices.
> A matrix [[a, b], [c, d]] commutes with diag(1, 2): comparing products gives 2b = b and 2c = c
> So b = c = 0: the commutant is the diagonal matrices again
> Its double commutant is also the diagonals, so this algebra is a von Neumann algebra (dimension 2)
K: von Neumann algebras equal their double commutants; factors have trivial centre and come in types I, II, III; they connect to physics, knots and quantum information.
!: Thinking every operator algebra is finite-dimensional like a matrix algebra.
Q: What is a factor? | A von Neumann algebra with trivial centre.
Q: Which knot invariant came from subfactor theory? | The Jones polynomial.
SUM: Operator algebras study symmetry and observables.
SUM: Factors are their building blocks.
SRC: Jones VFR, A polynomial invariant for knots via von Neumann algebras, Bulletin of the American Mathematical Society 12(1), 103 | journal | 1985 | https://doi.org/10.1090/S0273-0979-1985-15304-2
SRC: Murray FJ, von Neumann J, On rings of operators, Annals of Mathematics 37(1), 116 | journal | 1936 | https://doi.org/10.2307/1968693
NUM1#maths-u09-14-q1@1: What is the dimension of the commutant of the diagonal 2 × 2 matrices? | 2 | 0 |  | The commutant consists of diagonal matrices, which form a 2-dimensional algebra.
M1#maths-u09-14-q2@1: What does the double commutant theorem characterise? | Weakly closed unital *-algebras of operators | Finite groups | Banach spaces | Prime ideals | Measure-zero sets | A unital *-algebra M is a von Neumann algebra iff M = M″.
M2#maths-u09-14-q3@2: Which field uses type III factors? | Quantum field theory | Elementary number theory | Euclidean geometry | Linear programming | Classical mechanics only | Algebras of local observables in relativistic quantum field theory are type III.
`;
