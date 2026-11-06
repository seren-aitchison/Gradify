// School 7: Calculus. Format: kit/course/notes.js. Standard: docs/CURRICULUM_CONTENT_STANDARD.md
// Single-variable calculus from limits to series: A level, Further Maths and first-year university.
export default `
## Precalculus
S: Precalculus is the toolkit you need before calculus: functions and their graphs, algebraic manipulation, exponentials, logarithms and trigonometry. Most errors in calculus are really precalculus errors, so these skills repay practice.
O: Identify the precalculus skills that calculus relies on
O: Rewrite expressions in forms ready for differentiation and integration
T: Index form | Writing roots and reciprocals as powers, such as 1/√x = x^{−1/2}, so the power rule applies
T: Standard functions | The functions calculus works with most: polynomials, powers, e^{x}, ln x, sin x, cos x and tan x
H: The skills calculus uses
- **Algebra**: expanding, factorising, simplifying fractions and solving equations (School 3).
- **Indices**: rewriting √x as x^{1/2}, 3/x^{2} as 3x^{−2} and (x^{2} + 1)/x as x + x^{−1}.
- **Functions**: domain, range, composition (for the chain rule), inverses and graph shapes.
- **Exponentials and logarithms**: e^{x}, ln x and their laws.
- **Trigonometry in radians**: calculus formulas for sin and cos only hold in radians.
H: Getting expressions ready
- Split fractions with a single-term denominator: (x^{3} − 4x)/x^{2} = x − 4x^{−1}.
- Expand products before differentiating term by term, unless you'll use the product rule.
- Know the graphs of y = x^{n}, e^{x}, ln x, sin x, cos x and 1/x: calculus describes their slopes and areas.
X: Write (3x^{2} − 2√x + 5)/x in index form, ready to differentiate.
> Split into separate terms: 3x^{2}/x − 2x^{1/2}/x + 5/x
> Subtract powers: 3x − 2x^{−1/2} + 5x^{−1}
> Each term is now a power of x, so the power rule applies to each
K: Calculus rests on algebra, indices, functions, logs and radian trigonometry; rewrite expressions as sums of powers first.
!: Using degrees in calculus: d/dx (sin x) = cos x only when x is in radians.
Q: Write 4/√x in index form. | 4x^{−1/2}.
Q: Why must trigonometric calculus use radians? | The derivative formulas (such as d/dx sin x = cos x) only hold in radians.
SUM: Calculus builds on precalculus skills.
SUM: Index form makes differentiation and integration routine.
SRC: Department for Education, Mathematics AS and A level subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
M1#maths-u07-01-q1@1: Which is 5/x^{3} in index form? | 5x^{−3} | 5x^{3} | x^{−15} | 5^{−3}x | (5x)^{−3} | Dividing by x^{3} is multiplying by x^{−3}, and the 5 stays as a coefficient.
M2#maths-u07-01-q2@2: Which is (x^{2} + 3)/√x in index form? | x^{3/2} + 3x^{−1/2} | x^{2} + 3x^{−1/2} | x^{3/2} + 3 | x + 3x^{1/2} | x^{5/2} + 3x^{−1/2} | x^{2}/x^{1/2} = x^{3/2} and 3/x^{1/2} = 3x^{−1/2}: divide each term separately.

## Infinitesimal Calculus
S: Calculus began with the idea of infinitely small changes, the "infinitesimals" of Newton and Leibniz in the 17th century. Their methods worked brilliantly, but it took until the 19th century to put them on a rigorous footing with limits.
O: Describe the historical development of calculus
O: Explain the ideas of a derivative and an integral informally
T: Infinitesimal | An informally "infinitely small" quantity; made rigorous later by limits, and in the 20th century by non-standard analysis
T: Leibniz notation | dy/dx for derivatives and ∫ f(x) dx for integrals, suggesting ratios and sums of tiny quantities
H: Two big ideas
- **Differentiation** measures instantaneous rates of change: the slope of a curve at a point, the speed of a moving object at an instant.
- **Integration** measures accumulation: the area under a curve, the distance travelled from a speed, total quantities from rates.
- The **fundamental theorem of calculus** says these are inverse processes.
H: History
- Archimedes found areas and volumes by exhaustion (about 250 BCE). Fermat and Barrow found tangents in the 1600s.
- Newton ("fluxions") and Leibniz independently created calculus around 1665–1684; Leibniz's notation is the one we use.
- Bishop Berkeley mocked infinitesimals as "the ghosts of departed quantities" (1734).
- Cauchy and Weierstrass made calculus rigorous with limits and the ε–δ definition in the 1800s.
X: Explain informally why the area of a circle is πr^{2}, using thin rings.
> Split the disc into thin rings of radius x and width dx; each has area about circumference × width = 2πx dx
> Add them all from x = 0 to x = r: ∫ 2πx dx
> = πr^{2}: the integral adds up infinitely many thin pieces
K: Differentiation finds rates, integration finds accumulations, and they're inverses; limits made the infinitesimal ideas rigorous.
!: Treating dy/dx as an ordinary fraction in every situation: it's a limit, though it often behaves like a fraction.
Q: Who independently invented calculus? | Isaac Newton and Gottfried Leibniz.
Q: What does integration measure? | Accumulation, such as area under a curve or total distance.
SUM: Calculus studies change and accumulation.
SUM: Limits gave calculus its rigorous foundation.
SRC: Boyer CB, The History of the Calculus and Its Conceptual Development (Dover 1959) | textbook | 1959 | https://store.doverpublications.com/
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
M1#maths-u07-02-q1@1: Whose notation, dy/dx and ∫, do we use today? | Leibniz | Newton | Euler | Archimedes | Cauchy | Leibniz introduced dy/dx and the integral sign; Newton used dots and "fluxions".
M2#maths-u07-02-q2@2: What made calculus rigorous in the 19th century? | The precise definition of a limit | The invention of computers | Euclid's axioms | Decimal notation | The discovery of π | Cauchy and Weierstrass defined limits precisely, replacing vague infinitesimals.

## Limits
S: A limit describes the value a function approaches as its input approaches some value. Limits underpin every idea in calculus: derivatives, integrals, continuity and infinite series are all defined by them.
O: Evaluate limits by substitution, factorising and standard results
O: Interpret one-sided limits and limits at infinity
T: Limit | lim_{x→a} f(x) = L means f(x) gets arbitrarily close to L as x gets close to a (but not equal to a)
T: Indeterminate form | An expression like 0/0 or ∞/∞ whose value can't be decided without further work
H: Evaluating limits
- If f is continuous at a, substitute: lim_{x→2} (x^{2} + 1) = 5.
- 0/0 forms: factorise and cancel: lim_{x→3} (x^{2} − 9)/(x − 3) = lim (x + 3) = 6.
- Standard limits: lim_{x→0} (sin x)/x = 1 (x in radians); lim_{h→0} (e^{h} − 1)/h = 1.
- At infinity, divide by the highest power: lim_{x→∞} (3x^{2} + 1)/(x^{2} − 5) = 3.
H: One-sided limits and formal definition
- lim_{x→0⁺} 1/x = +∞ and lim_{x→0⁻} 1/x = −∞, so lim_{x→0} 1/x doesn't exist.
- The limit exists only if the left and right limits are equal.
- Formally: for every ε > 0 there's δ > 0 such that 0 < |x − a| < δ implies |f(x) − L| < ε (School 9).
X: Find lim_{x→4} (√x − 2)/(x − 4).
> Substituting gives 0/0, so rewrite x − 4 = (√x − 2)(√x + 2)
> (√x − 2)/((√x − 2)(√x + 2)) = 1/(√x + 2)
> As x → 4, this approaches 1/(2 + 2) = 1/4
- Limits needn't equal the function's value: f could even be undefined at a.
K: Substitute if possible; for 0/0 factorise, rationalise or use standard limits; compare left and right limits.
!: Concluding that a 0/0 limit is 0, 1 or undefined without further work.
Q: What is lim_{x→1} (x^{2} − 1)/(x − 1)? | 2.
Q: When does lim_{x→a} f(x) exist? | When the left and right limits exist and are equal.
SUM: Limits describe approaching behaviour.
SUM: Indeterminate forms need algebraic work.
SRC: Spivak M, Calculus (4th edn, Publish or Perish 2008) | textbook | 2008 | https://www.publishorperish.com/
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
NUM1#maths-u07-03-q1@1: Find lim_{x→2} (x^{3} − 8)/(x − 2). | 12 | 0 |  | x^{3} − 8 = (x − 2)(x^{2} + 2x + 4), so the limit is 4 + 4 + 4 = 12.
M1#maths-u07-03-q2@1: What is lim_{x→∞} (5x + 2)/(2x − 1)? | 5/2 | 0 | ∞ | −2 | 5 | Divide top and bottom by x: (5 + 2/x)/(2 − 1/x) → 5/2.
M3#maths-u07-03-q3@2: What is lim_{x→0} (sin 3x)/x? | 3 | 1 | 0 | 1/3 | It doesn't exist | (sin 3x)/x = 3 × (sin 3x)/(3x), and (sin u)/u → 1 as u → 0.

## Continuity
S: A function is continuous at a point if its graph has no break there: you could draw it without lifting your pen. Continuity is what lets us find roots by sign changes and guarantees that many calculus theorems apply.
O: Test whether a function is continuous at a point
O: Apply the intermediate value theorem to locate roots
T: Continuous at a | lim_{x→a} f(x) exists and equals f(a)
T: Intermediate value theorem | If f is continuous on [a, b] and k lies between f(a) and f(b), then f(c) = k for some c in [a, b]
H: Testing continuity
- Three conditions: f(a) is defined, the limit as x → a exists, and they're equal.
- Polynomials, e^{x}, sin x and cos x are continuous everywhere; rational functions are continuous except where the denominator is zero; ln x is continuous for x > 0.
- Types of discontinuity: removable (a hole, as in (x^{2} − 1)/(x − 1) at x = 1), jump (as in step functions) and infinite (as in 1/x at 0).
H: The intermediate value theorem
- If f is continuous and changes sign between a and b, there's a root between them: f(x) = x^{3} − x − 1 has f(1) = −1 and f(2) = 5, so there's a root in (1, 2).
- This justifies numerical root-finding (bisection, School 19).
- It fails for discontinuous functions: 1/x changes sign between −1 and 1 but has no root.
X: Show that x^{5} + 3x = 7 has a solution between 1 and 2.
> Let f(x) = x^{5} + 3x − 7, which is continuous (a polynomial)
> f(1) = 1 + 3 − 7 = −3 < 0 and f(2) = 32 + 6 − 7 = 31 > 0
> f changes sign, so by the intermediate value theorem there's a root between 1 and 2
K: Continuous means the limit equals the value; a sign change of a continuous function guarantees a root.
!: Using a sign change to claim a root when the function has an asymptote in the interval.
Q: Is f(x) = 1/(x − 2) continuous at x = 2? | No: it isn't defined there (an infinite discontinuity).
Q: What does the intermediate value theorem need? | A function continuous on a closed interval.
SUM: Continuity means no breaks.
SUM: Sign changes locate roots of continuous functions.
SRC: Spivak M, Calculus (4th edn, Publish or Perish 2008) | textbook | 2008 | https://www.publishorperish.com/
SRC: Department for Education, Mathematics AS and A level subject content: numerical methods | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
M1#maths-u07-04-q1@1: Which function is continuous for all real x? | sin x + x^{2} | 1/x | ln x | tan x | 1/(x^{2} − 1) | Sums of continuous functions are continuous, and sin x and x^{2} are both continuous everywhere.
M2#maths-u07-04-q2@2: f(x) = x^{2} + k for x < 1 and 3x for x ≥ 1 is continuous. What is k? | 2 | 3 | 1 | 0 | 4 | At x = 1 the pieces must agree: 1 + k = 3, so k = 2.

## Differentiability
S: A function is differentiable at a point if it has a well-defined tangent there: a single slope. Differentiable functions are smooth; corners, cusps, jumps and vertical tangents break differentiability.
O: Decide whether a function is differentiable at a point
O: Explain the relationship between continuity and differentiability
T: Differentiable at a | The limit lim_{h→0} (f(a + h) − f(a))/h exists
T: Cusp | A sharp point where the slopes from either side approach ±∞ in opposite directions
H: When derivatives fail to exist
- **Corners**: |x| at x = 0 has slope −1 on the left and +1 on the right, so no single derivative.
- **Discontinuities**: a jump means no tangent.
- **Vertical tangents**: ∛x at x = 0 has an infinitely steep tangent.
- **Wild oscillation**: x sin(1/x) is continuous at 0 but not differentiable there.
H: Continuity versus differentiability
- Differentiable implies continuous: if the derivative exists at a, f is continuous at a.
- Continuous doesn't imply differentiable: |x| is continuous everywhere but not differentiable at 0.
- Weierstrass (1872) found a function continuous everywhere and differentiable nowhere.
- Piecewise functions are differentiable at a join only if the values and the slopes match.
X: f(x) = x^{2} for x ≤ 1 and ax + b for x > 1. Find a and b so that f is differentiable at x = 1.
> Continuity: 1 = a + b
> Slopes must match: 2x = 2 at x = 1, so a = 2
> Then b = −1: f(x) = 2x − 1 for x > 1
K: Differentiable means a unique tangent slope; corners, jumps and vertical tangents fail; differentiable implies continuous, not conversely.
!: Assuming that a continuous function must be differentiable.
Q: Is |x − 3| differentiable at x = 3? | No: it has a corner there.
Q: Does differentiability imply continuity? | Yes.
SUM: Differentiable functions are smooth.
SUM: Continuity is necessary but not sufficient.
SRC: Spivak M, Calculus (4th edn, Publish or Perish 2008) | textbook | 2008 | https://www.publishorperish.com/
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
M1#maths-u07-05-q1@1: Where is f(x) = |x + 2| not differentiable? | At x = −2 | At x = 0 | At x = 2 | Nowhere | Everywhere | The graph has a corner where x + 2 = 0, so the slope jumps from −1 to 1.
M2#maths-u07-05-q2@2: Which statement about continuity and differentiability is true? | Every differentiable function is continuous | Every continuous function is differentiable | |x| is differentiable at 0 | A jump discontinuity can still be differentiable | ∛x has derivative 0 at x = 0 | Differentiability at a point forces continuity there; the converse fails, as |x| shows.

## Differential Calculus
S: Differential calculus studies how quantities change. The derivative measures the instantaneous rate of change of a function, which is the gradient of its graph at a point.
O: Interpret the derivative as a gradient and a rate of change
O: Estimate gradients using chords
T: Derivative | The instantaneous rate of change of a function, dy/dx or f′(x)
T: Chord | A straight line joining two points on a curve; its gradient approximates the tangent's
H: Gradients of curves
- A straight line has the same gradient everywhere; a curve's gradient changes.
- The gradient at a point is the gradient of the tangent there.
- A chord from (x, f(x)) to (x + h, f(x + h)) has gradient (f(x + h) − f(x))/h. As h → 0, it approaches the tangent's gradient: the derivative.
H: Rates of change
- If s is distance and t is time, ds/dt is velocity; dv/dt is acceleration.
- In economics, marginal cost is dC/dq; in biology, growth rates are dP/dt.
- Notation: dy/dx (Leibniz), f′(x) (Lagrange), ẏ for time derivatives (Newton).
- A positive derivative means increasing; negative means decreasing; zero means a stationary point.
X: Estimate the gradient of y = x^{2} at x = 3 using chords with h = 0.1 and h = 0.01.
> h = 0.1: (3.1^{2} − 9)/0.1 = (9.61 − 9)/0.1 = 6.1
> h = 0.01: (3.01^{2} − 9)/0.01 = 0.0601/0.01 = 6.01
> The estimates approach 6, the derivative 2x at x = 3
K: The derivative is the limit of chord gradients: the tangent's slope and the instantaneous rate of change.
!: Confusing the value of a function with its rate of change: y can be large while dy/dx is small.
Q: What does dy/dx = 0 mean graphically? | The tangent is horizontal: a stationary point.
Q: If s is displacement and t is time, what is ds/dt? | Velocity.
SUM: The derivative measures instantaneous rate of change.
SUM: Chord gradients approach it as h → 0.
SRC: Department for Education, Mathematics AS and A level subject content: differentiation | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
NUM1#maths-u07-06-q1@1: Find the gradient of the chord of y = x^{3} from x = 1 to x = 2. | 7 | 0 |  | (8 − 1)/(2 − 1) = 7. (The tangent gradients at the ends are 3 and 12.)
M1#maths-u07-06-q2@1: What does a negative derivative tell you about a function? | It's decreasing at that point | It's negative at that point | It has a maximum | It's increasing | It's zero | The derivative is the gradient: negative gradient means the function is going down.
M2#maths-u07-06-q3@2: A chord of y = f(x) from x = 2 to x = 2 + h has gradient 5 + 3h. What is f′(2)? | 5 | 8 | 3 | 5 + 3h | 0 | The derivative is the limit as h → 0: 5 + 3h → 5.

## Derivatives
S: A derivative is defined as the limit of the gradient of a chord, and computed in practice with rules. Differentiating from first principles shows where the rules come from.
O: Differentiate simple functions from first principles
O: State the derivatives of standard functions
T: First principles | Finding f′(x) directly from the limit definition
T: Power rule | d/dx (x^{n}) = nx^{n−1}
H: First principles
E: f′(x) = lim_{h→0} (f(x + h) − f(x))/h
- For f(x) = x^{2}: ((x + h)^{2} − x^{2})/h = (2xh + h^{2})/h = 2x + h → 2x.
- For f(x) = x^{3}: (3x^{2}h + 3xh^{2} + h^{3})/h → 3x^{2}.
H: Standard derivatives
- d/dx x^{n} = nx^{n−1} for any real n: d/dx √x = ½x^{−1/2}.
- d/dx e^{x} = e^{x}; d/dx e^{kx} = ke^{kx}; d/dx ln x = 1/x.
- d/dx sin x = cos x; d/dx cos x = −sin x; d/dx tan x = sec^{2} x (radians).
- Constant multiples and sums: (af + bg)′ = af′ + bg′. Constants differentiate to 0.
X: Differentiate x^{2} − 3x from first principles.
> f(x + h) − f(x) = (x + h)^{2} − 3(x + h) − x^{2} + 3x = 2xh + h^{2} − 3h
> Divide by h: 2x + h − 3
> As h → 0: f′(x) = 2x − 3
- A derivative is itself a function: f′(x) gives the gradient at every x.
- Differentiation is linear: the derivative of a sum is the sum of the derivatives, which is why polynomials are differentiated term by term.
K: f′(x) = lim (f(x + h) − f(x))/h; in practice use the power rule and the standard derivatives.
!: Differentiating x^{n} as x^{n−1} (forgetting to multiply by n).
Q: Differentiate 4x^{5}. | 20x^{4}.
Q: What is the derivative of cos x? | −sin x.
SUM: Derivatives come from a limit.
SUM: Standard results make differentiation fast.
SRC: Department for Education, Mathematics AS and A level subject content: differentiation | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Spivak M, Calculus (4th edn, Publish or Perish 2008) | textbook | 2008 | https://www.publishorperish.com/
M1#maths-u07-07-q1@1: What is d/dx (6x^{3} − 2x + 9)? | 18x^{2} − 2 | 18x^{2} − 2x | 6x^{2} − 2 | 18x^{3} − 2 | 2x^{2} − 2 + 9 | Multiply by the power and reduce it by one; the constant 9 differentiates to 0.
M2#maths-u07-07-q2@2: What is d/dx (4/x)? | −4/x^{2} | 4 | 4/x^{2} | −4x | 4 ln x | 4/x = 4x^{−1}, which differentiates to −4x^{−2}.

## First Derivatives
S: The first derivative f′(x) tells you the gradient of a curve everywhere: where it rises, falls and levels off. It finds tangents and normals, and stationary points where the gradient is zero.
O: Use the first derivative to find gradients, tangents and normals
O: Determine where a function is increasing or decreasing
T: Tangent | The straight line touching a curve at a point with the same gradient as the curve there
T: Normal | The line through a point on a curve perpendicular to the tangent; its gradient is −1/m
H: Tangents and normals
- At x = a, the tangent has gradient f′(a) and passes through (a, f(a)): y − f(a) = f′(a)(x − a).
- The normal has gradient −1/f′(a) (if f′(a) ≠ 0).
- y = x^{3} − 2x at x = 1: y = −1 and f′(1) = 1, so the tangent is y = x − 2 and the normal is y = −x.
H: Increasing and decreasing
- f is increasing where f′(x) > 0 and decreasing where f′(x) < 0.
- f(x) = x^{3} − 3x has f′(x) = 3x^{2} − 3 = 3(x − 1)(x + 1): increasing for x < −1 and x > 1, decreasing for −1 < x < 1.
- Find points with a given gradient by solving f′(x) = m.
X: Find the equation of the normal to y = 2x^{2} − 5x + 1 at x = 2.
> y(2) = 8 − 10 + 1 = −1; dy/dx = 4x − 5 = 3 at x = 2
> Normal gradient = −1/3
> y + 1 = −1/3(x − 2), so y = −x/3 − 1/3 (or x + 3y + 1 = 0)
- Finding where a curve has a given gradient: y = x^{2} − 4x has gradient 2 where 2x − 4 = 2, at x = 3.
K: Tangent: gradient f′(a) through (a, f(a)); normal: gradient −1/f′(a); the sign of f′ shows increasing or decreasing.
!: Using the y-value instead of the gradient in the tangent equation.
Q: What is the gradient of the normal if the tangent's gradient is 4? | −1/4.
Q: Where is f(x) = x^{2} − 6x increasing? | For x > 3.
SUM: f′ gives tangents, normals and monotonicity.
SUM: Normals are perpendicular to tangents.
SRC: Department for Education, Mathematics AS and A level subject content: differentiation | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
NUM1#maths-u07-08-q1@1: Find the gradient of y = x^{3} − 4x^{2} + 2 at x = 3. | 3 | 0 |  | dy/dx = 3x^{2} − 8x = 27 − 24 = 3.
M1#maths-u07-08-q2@1: What is the tangent to y = x^{2} at (3, 9)? | y = 6x − 9 | y = 6x + 9 | y = 2x + 3 | y = 9x − 18 | y = 3x | The gradient is 2x = 6, so y − 9 = 6(x − 3), giving y = 6x − 9.
M2#maths-u07-08-q3@2: For which x is f(x) = 2x^{3} − 6x decreasing? | −1 < x < 1 | x > 1 | x < −1 | x > 0 | All x | f′(x) = 6x^{2} − 6 = 6(x − 1)(x + 1) is negative between −1 and 1.

## Higher-Order Derivatives
S: Differentiating a derivative gives the second derivative, and so on. The second derivative measures how the gradient changes: acceleration for motion, and concavity for graphs.
O: Find second and higher derivatives
O: Interpret the second derivative physically and graphically
T: Second derivative | f″(x) or d^{2}y/dx^{2}: the derivative of the derivative
T: nth derivative | f^{(n)}(x): the result of differentiating n times
H: Finding them
- f(x) = x^{4} − 3x^{2}: f′(x) = 4x^{3} − 6x, f″(x) = 12x^{2} − 6, f‴(x) = 24x, f^{(4)}(x) = 24, f^{(5)}(x) = 0.
- A polynomial of degree n has a zero (n + 1)th derivative.
- Patterns: the derivatives of sin x cycle every four: cos x, −sin x, −cos x, sin x. Every derivative of e^{x} is e^{x}.
H: Interpretations
- Motion: displacement s, velocity v = ds/dt, acceleration a = dv/dt = d^{2}s/dt^{2}; jerk is the third derivative.
- Graphs: f″ > 0 means the gradient is increasing (concave up, "smiling"); f″ < 0 means concave down.
- Taylor series (later in this school) use all the derivatives at a point to build a polynomial approximation.
X: A particle's displacement is s = t^{3} − 6t^{2} + 9t metres. Find its acceleration when its velocity is first zero.
> v = ds/dt = 3t^{2} − 12t + 9 = 3(t − 1)(t − 3), so v = 0 first at t = 1
> a = dv/dt = 6t − 12
> At t = 1: a = −6 m s^{−2}
K: Differentiate repeatedly; f″ is the rate of change of the gradient: acceleration, or concavity.
!: Confusing f″(x) with (f′(x))^{2}.
Q: What is the second derivative of x^{5}? | 20x^{3}.
Q: What is d^{2}s/dt^{2} for motion? | Acceleration.
SUM: Higher derivatives differentiate repeatedly.
SUM: The second derivative measures changing gradient.
SRC: Department for Education, Mathematics AS and A level subject content: differentiation | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
NUM1#maths-u07-09-q1@1: f(x) = 2x^{4} − x^{3}. Find f″(1). | 18 | 0 |  | f′(x) = 8x^{3} − 3x^{2}, f″(x) = 24x^{2} − 6x, so f″(1) = 18.
M1#maths-u07-09-q2@1: What is the 4th derivative of sin x? | sin x | cos x | −sin x | −cos x | 0 | Derivatives of sin x cycle cos x, −sin x, −cos x, sin x, so the 4th returns to sin x.
M2#maths-u07-09-q3@2: What is d^{2}/dx^{2} (e^{3x})? | 9e^{3x} | 3e^{3x} | e^{3x} | 6e^{3x} | e^{9x} | Each differentiation multiplies by 3, so twice gives 9e^{3x}.

## Chain Rule
S: The chain rule differentiates composite functions, functions of functions like (3x + 1)^{5} or e^{sin x}. Multiply the derivative of the outer function by the derivative of the inner one.
O: Differentiate composite functions with the chain rule
O: Recognise the inner and outer functions in an expression
T: Chain rule | dy/dx = dy/du × du/dx, where y is a function of u and u a function of x
T: Inner function | The function applied first, such as u = 3x + 1 in (3x + 1)^{5}
H: The rule
E: dy/dx = (dy/du)(du/dx); equivalently d/dx f(g(x)) = f′(g(x)) g′(x)
- (3x + 1)^{5}: outer u^{5}, inner u = 3x + 1. Derivative 5(3x + 1)^{4} × 3 = 15(3x + 1)^{4}.
- e^{x^{2}}: derivative e^{x^{2}} × 2x.
- ln(x^{2} + 1): derivative (2x)/(x^{2} + 1). In general d/dx ln f(x) = f′(x)/f(x).
- sin(5x): 5cos(5x); cos^{2} x = (cos x)^{2}: 2cos x × (−sin x) = −2 sin x cos x.
H: Using it well
- Several layers: d/dx sin^{3}(2x) = 3 sin^{2}(2x) × cos(2x) × 2.
- Related to inverse functions: dy/dx = 1/(dx/dy), so for x = y^{3} + y, dy/dx = 1/(3y^{2} + 1).
X: Differentiate y = √(x^{2} + 4x).
> Write y = (x^{2} + 4x)^{1/2}
> Outer derivative: ½(x^{2} + 4x)^{−1/2}; inner derivative: 2x + 4
> dy/dx = (2x + 4)/(2√(x^{2} + 4x)) = (x + 2)/√(x^{2} + 4x)
- In Leibniz notation the chain rule looks like cancelling fractions, dy/du × du/dx, which helps you remember it (though it's a theorem, not cancellation).
- It underlies implicit, parametric and logarithmic differentiation.
K: Differentiate the outside, keep the inside, then multiply by the derivative of the inside.
!: Forgetting to multiply by the inner derivative, as in d/dx (3x + 1)^{5} = 5(3x + 1)^{4}.
Q: Differentiate (2x − 7)^{4}. | 8(2x − 7)^{3}.
Q: Differentiate ln(3x^{2} + 1). | 6x/(3x^{2} + 1).
SUM: The chain rule handles functions of functions.
SUM: Multiply the outer derivative by the inner derivative.
SRC: Department for Education, Mathematics AS and A level subject content: differentiation | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
M1#maths-u07-10-q1@1: What is d/dx (e^{4x})? | 4e^{4x} | e^{4x} | 4xe^{4x−1} | e^{4} | 4e^{x} | The inner function 4x has derivative 4, which multiplies e^{4x}.
M2#maths-u07-10-q2@2: What is d/dx sin(x^{2})? | 2x cos(x^{2}) | cos(x^{2}) | 2x cos(2x) | −2x cos(x^{2}) | 2 cos(x) | Outer cos(x^{2}) times inner derivative 2x.
M3#maths-u07-10-q3@2: What is d/dx (1/(2x + 3)^{2})? | −4/(2x + 3)^{3} | −2/(2x + 3)^{3} | 1/(2(2x + 3)) | −4/(2x + 3)^{2} | 4/(2x + 3)^{3} | (2x + 3)^{−2} gives −2(2x + 3)^{−3} × 2 = −4(2x + 3)^{−3}.

## Product Rule
S: The product rule differentiates a product of two functions. The derivative of uv isn't u′v′: it's u′v + uv′.
O: Differentiate products using the product rule
O: Combine the product rule with the chain rule
T: Product rule | d/dx (uv) = u′v + uv′
T: Factorising a derivative | Taking out common factors after using the product rule, to simplify and solve f′(x) = 0
H: The rule
E: d/dx (uv) = (du/dx)v + u(dv/dx)
- x^{2}e^{x}: u = x^{2}, v = e^{x}: 2xe^{x} + x^{2}e^{x} = xe^{x}(2 + x).
- x sin x: sin x + x cos x.
- x^{3} ln x: 3x^{2} ln x + x^{2}.
H: Combining rules
- x(2x − 1)^{4}: (2x − 1)^{4} + x × 4(2x − 1)^{3} × 2 = (2x − 1)^{3}(2x − 1 + 8x) = (2x − 1)^{3}(10x − 1).
- Factorise the result: it makes stationary points easy to find.
- Three factors: (uvw)′ = u′vw + uv′w + uvw′.
X: Find the x-coordinates of the stationary points of y = x^{2}e^{−x}.
> dy/dx = 2xe^{−x} + x^{2}(−e^{−x}) = xe^{−x}(2 − x)
> e^{−x} is never zero, so xe^{−x}(2 − x) = 0 gives x = 0 or x = 2
> Stationary points at x = 0 and x = 2
- Why it works: (u + Δu)(v + Δv) − uv = vΔu + uΔv + ΔuΔv; dividing by Δx and letting Δx → 0 leaves u′v + uv′.
- Check by expanding when possible: (x^{2})(x^{3}) has derivative 2x × x^{3} + x^{2} × 3x^{2} = 5x^{4}, the same as d/dx x^{5}.
- The product rule is symmetric: u′v + uv′ = uv′ + u′v.
- Quotients can be done as products: x/(x + 1) = x(x + 1)^{−1}.
- It extends to dot and cross products of vectors.
K: (uv)′ = u′v + uv′; use the chain rule inside; factorise the answer.
!: Writing (uv)′ = u′v′.
Q: Differentiate x e^{2x}. | e^{2x} + 2xe^{2x} = e^{2x}(1 + 2x).
Q: Differentiate x^{2} cos x. | 2x cos x − x^{2} sin x.
SUM: Products need the product rule.
SUM: Factorise to simplify.
SRC: Department for Education, Mathematics AS and A level subject content: differentiation | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
M1#maths-u07-11-q1@1: What is d/dx (x ln x)? | ln x + 1 | 1/x | ln x | x/x | 1 | u = x and v = ln x: 1 × ln x + x × 1/x = ln x + 1.
M2#maths-u07-11-q2@2: What is d/dx (x^{3}e^{2x})? | x^{2}e^{2x}(3 + 2x) | 3x^{2}e^{2x} | 6x^{2}e^{2x} | x^{3}e^{2x}(3 + 2x) | 3x^{2} + 2e^{2x} | 3x^{2}e^{2x} + 2x^{3}e^{2x} = x^{2}e^{2x}(3 + 2x).

## Quotient Rule
S: The quotient rule differentiates one function divided by another. It's a combination of the product and chain rules, and it's needed for functions like tan x and rational functions.
O: Differentiate quotients using the quotient rule
O: Derive the derivative of tan x
T: Quotient rule | d/dx (u/v) = (u′v − uv′)/v^{2}
T: Rational function | A quotient of polynomials, such as (2x + 1)/(x − 3)
H: The rule
E: d/dx (u/v) = (v u′ − u v′)/v^{2}
- Order matters in the numerator: v u′ first, then minus u v′ ("low d-high minus high d-low, over low squared").
- (2x + 1)/(x − 3): ((x − 3)(2) − (2x + 1)(1))/(x − 3)^{2} = −7/(x − 3)^{2}.
- tan x = sin x/cos x: (cos^{2} x + sin^{2} x)/cos^{2} x = 1/cos^{2} x = sec^{2} x.
H: Alternatives
- Simple denominators: write as a product with a negative power and use the product rule: x^{2}(x + 1)^{−1}.
- Single-term denominators: divide first: (x^{3} + 1)/x = x^{2} + x^{−1}.
- Derivatives of sec x, cosec x and cot x follow from the quotient rule: d/dx sec x = sec x tan x.
X: Differentiate y = e^{x}/(x^{2} + 1).
> u = e^{x}, u′ = e^{x}; v = x^{2} + 1, v′ = 2x
> dy/dx = ((x^{2} + 1)e^{x} − e^{x}(2x))/(x^{2} + 1)^{2}
> = e^{x}(x − 1)^{2}/(x^{2} + 1)^{2}
- Check: the quotient rule on 1/x gives (0 × x − 1 × 1)/x^{2} = −1/x^{2}, matching the power rule.
K: (u/v)′ = (vu′ − uv′)/v^{2}; keep the order in the numerator; divide first when you can.
!: Reversing the order in the numerator, which flips the sign.
Q: Differentiate x/(x + 1). | 1/(x + 1)^{2}.
Q: What is d/dx tan x? | sec^{2} x.
SUM: Quotients need the quotient rule.
SUM: Order matters in the numerator.
SRC: Department for Education, Mathematics AS and A level subject content: differentiation | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
M1#maths-u07-12-q1@1: What is d/dx (1/x^{2}) by any method? | −2/x^{3} | −2/x | 2/x^{3} | −1/x^{3} | 1/(2x) | x^{−2} differentiates to −2x^{−3}; the quotient rule gives the same answer.
M2#maths-u07-12-q2@2: What is d/dx ((x − 1)/(x + 1))? | 2/(x + 1)^{2} | −2/(x + 1)^{2} | 1 | 2x/(x + 1)^{2} | 0 | ((x + 1) − (x − 1))/(x + 1)^{2} = 2/(x + 1)^{2}.

## Implicit Differentiation
S: Implicit differentiation finds dy/dx when y isn't the subject, as on the circle x^{2} + y^{2} = 25. Differentiate every term with respect to x, using the chain rule on terms in y, then solve for dy/dx.
O: Differentiate implicit equations
O: Find tangents to implicitly defined curves
T: Implicit differentiation | Differentiating both sides of an equation in x and y with respect to x, treating y as a function of x
T: d/dx (y^{n}) | ny^{n−1} dy/dx, by the chain rule
H: Method
- Differentiate each term: d/dx (x^{2}) = 2x; d/dx (y^{2}) = 2y dy/dx; d/dx (xy) = y + x dy/dx (product rule).
- Collect the dy/dx terms on one side and factorise.
- x^{2} + y^{2} = 25: 2x + 2y dy/dx = 0, so dy/dx = −x/y. At (3, 4), the gradient is −3/4.
H: Uses
- Curves that can't be rearranged: x^{3} + y^{3} = 6xy.
- Derivatives of inverse functions: y = arcsin x means sin y = x, so cos y dy/dx = 1 and dy/dx = 1/√(1 − x^{2}).
- Exponentials with variable bases: y = 2^{x} means ln y = x ln 2, so dy/dx = 2^{x} ln 2.
X: Find dy/dx for x^{2} + 3xy + y^{2} = 11, and the gradient at (1, 2).
> 2x + 3y + 3x dy/dx + 2y dy/dx = 0
> dy/dx(3x + 2y) = −(2x + 3y), so dy/dx = −(2x + 3y)/(3x + 2y)
> At (1, 2): −(2 + 6)/(3 + 4) = −8/7
- Second derivatives can be found implicitly too: differentiate dy/dx again, remembering y is a function of x.
- Stationary points of implicit curves occur where the numerator of dy/dx is zero.
K: Differentiate every term in x; each y term gains a dy/dx factor; collect and solve.
!: Differentiating y^{2} as 2y without the dy/dx.
Q: What is d/dx (y^{3})? | 3y^{2} dy/dx.
Q: What is d/dx (xy)? | y + x dy/dx.
SUM: Implicit differentiation needs no rearranging.
SUM: The chain rule supplies the dy/dx factors.
SRC: Department for Education, Mathematics AS and A level subject content: differentiation | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
M1#maths-u07-13-q1@1: For x^{2} + y^{2} = 13, what is dy/dx at (2, 3)? | −2/3 | 2/3 | −3/2 | 3/2 | 0 | Differentiating gives 2x + 2y dy/dx = 0, so dy/dx = −x/y = −2/3 at (2, 3).
M2#maths-u07-13-q2@2: What is dy/dx for y^{2} = 4x? | 2/y | 4 | 2y | 4/y^{2} | y/2 | Differentiating y^{2} implicitly gives 2y dy/dx = 4, so dy/dx = 2/y.

## Logarithmic Differentiation
S: Logarithmic differentiation takes the log of both sides before differentiating. It turns products, quotients and powers into sums, making messy derivatives manageable, and handles variable powers like x^{x}.
O: Use logarithmic differentiation for products, quotients and powers
O: Differentiate functions with variable exponents
T: Logarithmic differentiation | Taking ln of both sides, simplifying with log laws, then differentiating implicitly
T: Variable exponent | A power where both base and exponent depend on x, such as x^{x}
H: Method
- Take ln of both sides and expand with the log laws.
- Differentiate implicitly: d/dx ln y = (1/y) dy/dx.
- Multiply by y to get dy/dx.
H: Examples
- y = x^{x}: ln y = x ln x, so (1/y) dy/dx = ln x + 1 and dy/dx = x^{x}(ln x + 1).
- y = a^{x}: ln y = x ln a, so dy/dx = a^{x} ln a.
- Products: y = x^{2}(x + 1)^{3}/√(x − 1): ln y = 2 ln x + 3 ln(x + 1) − ½ ln(x − 1), so dy/dx = y(2/x + 3/(x + 1) − 1/(2(x − 1))).
X: Differentiate y = (sin x)^{x} for 0 < x < π.
> ln y = x ln(sin x)
> (1/y) dy/dx = ln(sin x) + x cos x/sin x = ln(sin x) + x cot x
> dy/dx = (sin x)^{x}(ln(sin x) + x cot x)
- It's often faster than repeated product and quotient rules for expressions with many factors.
- It works only where y > 0, but the result usually extends to other x.
- It also proves the power rule for any real n: ln y = n ln x gives dy/dx = ny/x = nx^{n−1}.
K: Take logs, expand, differentiate implicitly, multiply by y; essential for x^{x}-type functions.
!: Differentiating x^{x} as x × x^{x−1} (the power rule needs a constant exponent).
Q: What is d/dx (3^{x})? | 3^{x} ln 3.
Q: What is d/dx (x^{x})? | x^{x}(ln x + 1).
SUM: Logs turn products and powers into sums.
SUM: They handle variable exponents.
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
SRC: Department for Education, Mathematics AS and A level subject content: differentiation | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
NUM1#maths-u07-14-q1@1: For y = x^{x}, find dy/dx at x = 1. | 1 | 0 |  | dy/dx = x^{x}(ln x + 1) = 1 × (0 + 1) = 1.
M1#maths-u07-14-q2@1: What is d/dx (2^{x})? | 2^{x} ln 2 | x2^{x−1} | 2^{x} | 2^{x}/ln 2 | ln 2 | ln y = x ln 2, so dy/dx = y ln 2 = 2^{x} ln 2.
M3#maths-u07-14-q3@2: Why can't the power rule differentiate x^{x}? | The exponent isn't a constant | x^{x} isn't continuous | It has no derivative | The base is negative | It's an exponential with constant base | The power rule needs x^{n} with n constant; here the exponent varies with x.


## Parametric Differentiation
S: When a curve is given parametrically, x = f(t) and y = g(t), its gradient comes from the chain rule: dy/dx = (dy/dt)/(dx/dt). There's no need to find the Cartesian equation first.
O: Find gradients of parametric curves
O: Find tangents, normals and stationary points of parametric curves
T: Parametric derivative | dy/dx = (dy/dt) ÷ (dx/dt), provided dx/dt ≠ 0
T: Vertical tangent | Where dx/dt = 0 but dy/dt ≠ 0, so the gradient is infinite
H: Method
E: dy/dx = (dy/dt) / (dx/dt)
- x = t^{2}, y = t^{3}: dx/dt = 2t, dy/dt = 3t^{2}, so dy/dx = 3t/2.
- x = cos θ, y = sin θ: dy/dx = cos θ/(−sin θ) = −cot θ.
- Find the parameter value at a point, then substitute to get the gradient.
H: Tangents and stationary points
- At t = 2 on x = t^{2}, y = t^{3}: the point is (4, 8) and dy/dx = 3, so the tangent is y = 3x − 4.
- Horizontal tangents where dy/dt = 0 (and dx/dt ≠ 0); vertical tangents where dx/dt = 0 (and dy/dt ≠ 0).
- In motion, (dx/dt, dy/dt) is the velocity vector and its length is the speed.
X: Find the equation of the tangent to x = 2t + 1, y = t^{2} − 3t at t = 2.
> At t = 2: x = 5, y = −2
> dx/dt = 2 and dy/dt = 2t − 3 = 1, so dy/dx = 1/2
> Tangent: y + 2 = ½(x − 5), so y = ½x − 9/2
- Second derivatives: d^{2}y/dx^{2} = (d/dt (dy/dx))/(dx/dt), not (d^{2}y/dt^{2})/(d^{2}x/dt^{2}).
- Speed along the curve is √((dx/dt)^{2} + (dy/dt)^{2}).
K: dy/dx = (dy/dt)/(dx/dt); horizontal tangents where dy/dt = 0, vertical where dx/dt = 0.
!: Dividing the wrong way round: dy/dx is dy/dt over dx/dt.
Q: For x = 3t, y = t^{2}, what is dy/dx? | 2t/3.
Q: Where does a parametric curve have a vertical tangent? | Where dx/dt = 0 and dy/dt ≠ 0.
SUM: The chain rule gives parametric gradients.
SUM: Use the parameter value at the point.
SRC: Department for Education, Mathematics AS and A level subject content: differentiation | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
NUM1#maths-u07-15-q1@1: For x = t^{2} + 1, y = 4t, find dy/dx at t = 2. | 1 | 0 |  | dx/dt = 2t = 4 and dy/dt = 4, so dy/dx = 4/4 = 1.
M1#maths-u07-15-q2@1: For x = 5 cos t, y = 5 sin t, what is dy/dx? | −cot t | tan t | −tan t | cot t | 5 | dy/dt = 5 cos t and dx/dt = −5 sin t, so dy/dx = −cos t/sin t.
M2#maths-u07-15-q3@2: For x = t^{3} − 3t, y = t^{2}, where are the vertical tangents? | t = ±1 | t = 0 | t = ±3 | t = 3 | None | dx/dt = 3t^{2} − 3 = 0 at t = ±1, where dy/dt = 2t ≠ 0.

## Rates of Change
S: Derivatives measure how fast one quantity changes with another. In science, economics and everyday life, "rate of change" problems ask how fast something is growing, shrinking or moving at an instant.
O: Interpret derivatives as rates of change in context
O: Solve problems involving velocity, growth and marginal change
T: Rate of change | The derivative of a quantity with respect to another, usually time
T: Marginal | In economics, the rate of change with respect to quantity: marginal cost dC/dq
H: Examples
- **Motion**: s = 20t − 5t^{2} gives velocity v = 20 − 10t and acceleration −10 m s^{−2}.
- **Growth**: a population P = 500e^{0.03t} grows at dP/dt = 15e^{0.03t}, which is 3% of P at every moment.
- **Cost**: C(q) = 0.01q^{2} + 4q + 200 gives marginal cost C′(q) = 0.02q + 4; at q = 100, about £6 per extra unit.
- **Area and volume**: dV/dr = 4πr^{2} for a sphere: the rate of change of volume equals the surface area.
H: Interpreting
- Units: a rate's units are output units per input unit (m s^{−1}, £ per item, people per year).
- Sign: positive means increasing, negative decreasing.
- Average rate over an interval is a chord's gradient; instantaneous rate is the derivative.
X: Water drains so the depth is h = (10 − 0.5t)^{2} cm after t minutes (0 ≤ t ≤ 20). How fast is the depth falling at t = 6?
> dh/dt = 2(10 − 0.5t) × (−0.5) = −(10 − 0.5t)
> At t = 6: dh/dt = −7
> The depth is falling at 7 cm per minute
K: A rate of change is a derivative; check its units and sign, and distinguish average from instantaneous rates.
!: Giving a rate without units, or with the wrong sign for a decrease.
Q: What are the units of dV/dt if V is in cm^{3} and t in seconds? | cm^{3} s^{−1}.
Q: What is the marginal cost if C(q) = 3q^{2} + 50? | C′(q) = 6q.
SUM: Derivatives model rates of change.
SUM: Units and signs carry meaning.
SRC: Department for Education, Mathematics AS and A level subject content: differentiation | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
NUM1#maths-u07-16-q1@1: A ball's height is h = 30t − 4.9t^{2} m. Find its velocity at t = 2 s. | 10.4 | 0.01 | m/s | dh/dt = 30 − 9.8t = 30 − 19.6 = 10.4 m s^{−1}.
M1#maths-u07-16-q2@1: P = 200e^{0.05t}. What is dP/dt when P = 400? | 20 | 10 | 400 | 0.05 | 200 | dP/dt = 0.05P, so 0.05 × 400 = 20 per unit time.
M2#maths-u07-16-q3@2: The volume of a cube of side x is V = x^{3}. What is dV/dx when x = 4? | 48 | 64 | 12 | 16 | 3 | dV/dx = 3x^{2} = 48: the volume grows by about 48 units^{3} per unit of side.

## Related Rates
S: Related rates problems connect the rates of change of several linked quantities. If a balloon's radius grows at a known rate, how fast is its volume growing? The chain rule links them.
O: Use the chain rule to connect rates of change
O: Solve related rates problems step by step
T: Related rates | Rates of change of quantities that are connected by an equation
T: Connected rates | dy/dt = dy/dx × dx/dt
H: Method
- Draw a diagram and name the variables.
- Write the equation linking them (geometry, Pythagoras, a formula).
- Differentiate with respect to time using the chain rule.
- Substitute the values at the instant in question, only after differentiating.
H: Examples
- A spherical balloon: V = (4/3)πr^{3}, so dV/dt = 4πr^{2} dr/dt. If air enters at 100 cm^{3} s^{−1}, then at r = 5 cm, dr/dt = 100/(100π) ≈ 0.32 cm s^{−1}.
- A ladder sliding down a wall: x^{2} + y^{2} = L^{2}, so 2x dx/dt + 2y dy/dt = 0.
- Ripples on a pond: A = πr^{2}, so dA/dt = 2πr dr/dt.
X: A 5 m ladder leans against a wall. Its foot slides away at 0.3 m s^{−1}. How fast is the top sliding down when the foot is 3 m from the wall?
> x^{2} + y^{2} = 25, so 2x dx/dt + 2y dy/dt = 0
> When x = 3, y = 4; so 2(3)(0.3) + 2(4) dy/dt = 0
> dy/dt = −1.8/8 = −0.225: the top slides down at 0.225 m s^{−1}
K: Link the variables with an equation, differentiate with respect to t, then substitute the instant's values.
!: Substituting numbers before differentiating, which freezes quantities that are changing.
Q: What links dA/dt and dr/dt for a circle? | dA/dt = 2πr dr/dt.
Q: When should you substitute the given values? | After differentiating.
SUM: Related rates use the chain rule in time.
SUM: Substitute values at the end.
SRC: Department for Education, Mathematics AS and A level subject content: differentiation | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
NUM1#maths-u07-17-q1@1: A circle's radius grows at 2 cm/s. How fast is its area growing when r = 10 cm? Give the answer to 1 decimal place. | 125.7 | 0.1 | cm²/s | dA/dt = 2πr dr/dt = 2π × 10 × 2 = 40π ≈ 125.7 cm^{2} s^{−1}.
M1#maths-u07-17-q2@1: For a cube of side x, dx/dt = 0.1 cm/s. What is dV/dt when x = 10 cm? | 30 cm³/s | 300 cm³/s | 3 cm³/s | 100 cm³/s | 0.3 cm³/s | By the chain rule dV/dt = 3x^{2} × dx/dt = 300 × 0.1 = 30 cm^{3} s^{−1}.
M2#maths-u07-17-q3@2: A sphere's volume increases at 36π cm³/s. What is dr/dt when r = 3 cm? | 1 cm/s | 3 cm/s | 1/3 cm/s | 9 cm/s | 4 cm/s | dV/dt = 4πr^{2} dr/dt: 36π = 36π dr/dt, so dr/dt = 1.

## L'Hôpital's Rule
S: L'Hôpital's rule evaluates limits of the indeterminate forms 0/0 and ∞/∞ by differentiating the top and bottom separately. It's quick and powerful, but only applies to those forms.
O: Apply L'Hôpital's rule to 0/0 and ∞/∞ limits
O: Convert other indeterminate forms to ones the rule handles
T: L'Hôpital's rule | If f(x)/g(x) → 0/0 or ∞/∞ as x → a, then lim f/g = lim f′/g′ (if the latter exists)
T: Indeterminate forms | 0/0, ∞/∞, 0 × ∞, ∞ − ∞, 1^{∞}, 0^{0} and ∞^{0}
H: Using the rule
- lim_{x→0} (sin x)/x: 0/0, so lim cos x/1 = 1.
- lim_{x→0} (1 − cos x)/x^{2}: 0/0, then sin x/(2x): 0/0 again, then cos x/2 → ½.
- lim_{x→∞} x^{2}/e^{x}: ∞/∞, then 2x/e^{x}, then 2/e^{x} → 0: exponentials beat powers.
- Differentiate top and bottom separately: not the quotient rule.
H: Other forms
- 0 × ∞: rewrite as a quotient: x ln x = ln x/(1/x) → (1/x)/(−1/x^{2}) = −x → 0 as x → 0⁺.
- 1^{∞}: take logs: lim (1 + 1/n)^{n} = e, because n ln(1 + 1/n) → 1.
- Check the form before every application: using it on a non-indeterminate limit gives wrong answers.
X: Find lim_{x→0} (e^{x} − 1 − x)/x^{2}.
> Substituting gives 0/0; differentiate top and bottom: (e^{x} − 1)/(2x), still 0/0
> Again: e^{x}/2
> As x → 0 this tends to 1/2
- Algebra or standard limits are often quicker: check them first.
- It also works for one-sided limits and limits at infinity.
K: Only for 0/0 or ∞/∞; differentiate numerator and denominator separately; repeat if needed; rewrite other forms first.
!: Applying the rule to a limit that isn't indeterminate, such as lim_{x→0} (x + 1)/(x + 2).
Q: What is lim_{x→0} (e^{3x} − 1)/x? | 3.
Q: Does L'Hôpital's rule use the quotient rule? | No: differentiate the top and bottom separately.
SUM: L'Hôpital's rule handles 0/0 and ∞/∞.
SUM: Other indeterminate forms must be rewritten first.
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
SRC: Spivak M, Calculus (4th edn, Publish or Perish 2008) | textbook | 2008 | https://www.publishorperish.com/
NUM1#maths-u07-18-q1@1: Find lim_{x→0} (sin 4x)/(2x). | 2 | 0 |  | 0/0, so differentiate: 4 cos 4x/2 → 4/2 = 2.
M1#maths-u07-18-q2@1: What is lim_{x→∞} ln x/x? | 0 | 1 | ∞ | e | −1 | ∞/∞, so (1/x)/1 → 0: logarithms grow more slowly than x.
M3#maths-u07-18-q3@2: Why can't L'Hôpital's rule be used for lim_{x→1} (x^{2} + 1)/(x + 1)? | It isn't an indeterminate form: the limit is simply 1 | The functions aren't differentiable | The limit is infinite | x → 1 isn't allowed | It gives the same answer anyway | Substitution gives 2/2 = 1; the rule only applies to 0/0 or ∞/∞.

## Stationary Points
S: Stationary points are where a curve's gradient is zero: maxima, minima and stationary points of inflection. Finding and classifying them is one of the most useful skills in calculus.
O: Find stationary points by solving f′(x) = 0
O: Classify stationary points using the second derivative or the gradient either side
T: Stationary point | A point where dy/dx = 0
T: Point of inflection | A point where the concavity changes; a stationary one has zero gradient too
H: Finding them
- Solve f′(x) = 0, then find the y-coordinates.
- y = x^{3} − 3x^{2} − 9x + 5: dy/dx = 3x^{2} − 6x − 9 = 3(x − 3)(x + 1) = 0 at x = 3 and x = −1, giving (3, −22) and (−1, 10).
H: Classifying
- **Second derivative**: f″ > 0 gives a minimum, f″ < 0 a maximum. Here f″ = 6x − 6: f″(3) = 12 > 0 (minimum) and f″(−1) = −12 < 0 (maximum).
- If f″ = 0, the test fails: check the sign of f′ on each side (+ then − is a maximum; − then + a minimum; same sign either side is a stationary inflection).
- y = x^{4} has f″(0) = 0 but is a minimum; y = x^{3} has a stationary inflection at 0.
X: Find and classify the stationary points of y = x^{3} − 12x.
> dy/dx = 3x^{2} − 12 = 0 gives x = ±2, so points (2, −16) and (−2, 16)
> d^{2}y/dx^{2} = 6x: at x = 2 it's 12 > 0, a minimum; at x = −2 it's −12 < 0, a maximum
> Minimum (2, −16), maximum (−2, 16)
K: Solve f′ = 0; classify with f″ (positive: minimum, negative: maximum), or by the gradient's sign either side if f″ = 0.
!: Concluding that f″ = 0 means a point of inflection: x^{4} has a minimum where f″ = 0.
Q: What does f″(a) < 0 at a stationary point mean? | A local maximum.
Q: What is a stationary point of inflection? | A stationary point where the gradient has the same sign on both sides.
SUM: Stationary points have zero gradient.
SUM: The second derivative usually classifies them.
SRC: Department for Education, Mathematics AS and A level subject content: differentiation | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
NUM1#maths-u07-19-q1@1: Find the x-coordinate of the stationary point of y = x^{2} − 10x + 3. | 5 | 0 |  | dy/dx = 2x − 10 = 0 gives x = 5 (a minimum, since d^{2}y/dx^{2} = 2 > 0).
M1#maths-u07-19-q2@1: At a stationary point, f″(x) = 4. What kind of point is it? | A minimum | A maximum | An inflection | Not stationary | It can't be decided | A positive second derivative means the curve is concave up, so it's a minimum.
M2#maths-u07-19-q3@2: What kind of stationary point does y = x^{3} have at the origin? | A stationary point of inflection | A maximum | A minimum | It has none | A corner | The gradient 3x^{2} is positive on both sides of 0, so it's an inflection, not a turning point.

## Critical Points
S: Critical points are where a function's derivative is zero or doesn't exist. They're the only candidates for local maxima and minima, so finding them is the first step in any optimisation problem.
O: Identify critical points where f′ = 0 or f′ is undefined
O: Use critical points to locate extrema
T: Critical point | A point in the domain where f′(x) = 0 or f′(x) doesn't exist
T: Fermat's theorem | If f has a local extremum at an interior point c and f′(c) exists, then f′(c) = 0
H: Finding critical points
- Solve f′(x) = 0 (stationary points).
- Also find points in the domain where f′ isn't defined: |x| at 0, x^{2/3} at 0 (its derivative (2/3)x^{−1/3} is undefined there).
- Critical points are candidates, not guarantees: x^{3} has a critical point at 0 but no extremum.
H: Why they matter
- Fermat's theorem: interior extrema of differentiable functions occur where f′ = 0.
- On a closed interval, the absolute extremes are at critical points or endpoints (next lessons).
- In several variables (School 8), critical points are where all partial derivatives vanish.
X: Find the critical points of f(x) = x^{2/3}(x − 5).
> f(x) = x^{5/3} − 5x^{2/3}, so f′(x) = (5/3)x^{2/3} − (10/3)x^{−1/3} = (5/3)x^{−1/3}(x − 2)
> f′ = 0 at x = 2
> f′ is undefined at x = 0 (in the domain), so the critical points are x = 0 and x = 2
K: Critical points are where f′ = 0 or f′ is undefined; every interior extremum is at one, but not every one is an extremum.
!: Ignoring points where the derivative doesn't exist, such as corners and cusps.
Q: Is x = 0 a critical point of f(x) = |x|? | Yes: the derivative doesn't exist there (and it's a minimum).
Q: Does every critical point give a maximum or minimum? | No: x^{3} at 0 is a counterexample.
SUM: Critical points are candidates for extrema.
SUM: Include points where f′ doesn't exist.
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
SRC: Spivak M, Calculus (4th edn, Publish or Perish 2008) | textbook | 2008 | https://www.publishorperish.com/
M1#maths-u07-20-q1@1: Which is a critical point of f(x) = x^{2} − 4x? | x = 2 | x = 0 | x = 4 | x = −2 | x = 1 | Critical points are where f′(x) = 0: here 2x − 4 = 0, so x = 2.
M2#maths-u07-20-q2@2: Where are the critical points of f(x) = √(x)(x − 3) for x ≥ 0? | x = 0 and x = 1 | x = 3 only | x = 1 only | x = 0 and x = 3 | x = 3/2 | f′(x) = (3x − 3)/(2√x): zero at x = 1, undefined at x = 0 (an endpoint where f is defined).

## Local Maxima and Minima
S: A local maximum is higher than all nearby points; a local minimum is lower. Local extrema are "peaks and valleys" of a graph, not necessarily the highest or lowest overall.
O: Distinguish local and global extrema
O: Classify local extrema with the first and second derivative tests
T: Local maximum | f(c) ≥ f(x) for all x near c
T: First derivative test | If f′ changes from + to − at c, f has a local maximum; from − to +, a local minimum
H: The two tests
- **First derivative test**: look at the sign of f′ just before and after: + then − is a maximum; − then + is a minimum; no change means neither.
- **Second derivative test**: at a stationary point, f″ < 0 is a maximum and f″ > 0 a minimum; f″ = 0 is inconclusive.
- The first derivative test always works, including at critical points where f′ doesn't exist.
H: Local versus global
- A local maximum can be lower than a local minimum elsewhere: y = x^{3} − 3x has a local max at (−1, 2) and is larger than 2 for x > 2.
- A function may have local extrema but no global ones (on the whole real line), or global extrema at endpoints.
X: Classify the stationary points of f(x) = x^{4} − 4x^{3}.
> f′(x) = 4x^{3} − 12x^{2} = 4x^{2}(x − 3) = 0 at x = 0 and x = 3
> Near x = 0: f′ is negative on both sides, so no extremum (a stationary inflection)
> Near x = 3: f′ goes from − to +, so a local minimum at (3, −27)
K: + to − is a maximum, − to + a minimum; local extrema needn't be global.
!: Assuming a local maximum is the largest value of the function.
Q: What does the first derivative test check? | Whether f′ changes sign at the point, and how.
Q: Can a local minimum be higher than a local maximum? | Yes.
SUM: Local extrema are peaks and valleys.
SUM: The first derivative test always works.
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
SRC: Department for Education, Mathematics AS and A level subject content: differentiation | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
M1#maths-u07-21-q1@1: f′ changes from positive to negative at x = 2. What is at x = 2? | A local maximum | A local minimum | A point of inflection | An asymptote | Nothing | The function rises then falls, so x = 2 is a peak.
M2#maths-u07-21-q2@2: What is the local minimum value of f(x) = x^{3} − 3x? | −2 | 2 | 0 | −1 | 1 | f′(x) = 3x^{2} − 3 = 0 at x = ±1; f″(1) = 6 > 0, and f(1) = −2.

## Global Optimisation
S: Global optimisation finds the absolute largest or smallest value of a function, often under constraints. It answers practical questions: the cheapest design, the maximum profit, the shortest route.
O: Find absolute extrema on closed intervals
O: Solve optimisation problems from contexts
T: Global (absolute) maximum | The largest value of f over its whole domain
T: Extreme value theorem | A continuous function on a closed interval [a, b] attains a maximum and a minimum
H: Closed intervals
- Evaluate f at every critical point inside the interval and at both endpoints; the largest is the maximum, the smallest the minimum.
- f(x) = x^{3} − 3x on [0, 3]: critical point x = 1 gives f = −2; f(0) = 0; f(3) = 18. Max 18, min −2.
H: Modelling problems
- Write the quantity to optimise as a function of one variable (use the constraint to eliminate others).
- Differentiate, solve for critical points, and check they give the right type of extremum and fit the context.
- Example: an open box from a 30 cm square sheet by cutting x cm squares from the corners: V = x(30 − 2x)^{2}, V′ = (30 − 2x)(30 − 6x) = 0 at x = 5 (x = 15 gives V = 0). Maximum volume 2,000 cm^{3}.
X: A farmer has 200 m of fencing to make a rectangular pen against a wall (three sides fenced). Find the largest area.
> Let the sides perpendicular to the wall be x: the third side is 200 − 2x, so A = x(200 − 2x) = 200x − 2x^{2}
> A′ = 200 − 4x = 0 at x = 50; A″ = −4 < 0, a maximum
> Largest area = 50 × 100 = 5,000 m^{2}
K: Check critical points and endpoints; in modelling, build a one-variable function from the constraint first.
!: Forgetting the endpoints of a closed interval, where the global extremum may lie.
Q: Where can the global maximum of a continuous function on [a, b] occur? | At a critical point or an endpoint.
Q: What does the extreme value theorem guarantee? | A continuous function on a closed interval has a maximum and a minimum.
SUM: Global extrema compare critical points and endpoints.
SUM: Modelling needs a one-variable function.
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
SRC: Department for Education, Mathematics AS and A level subject content: differentiation | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
NUM1#maths-u07-22-q1@1: Find the maximum value of f(x) = 12x − x^{3} on 0 ≤ x ≤ 3. | 16 | 0 |  | f′ = 12 − 3x^{2} = 0 at x = 2, f(2) = 16; f(0) = 0 and f(3) = 9, so the maximum is 16.
M1#maths-u07-22-q2@1: Two positive numbers add to 20. What is the largest possible product? | 100 | 96 | 400 | 200 | 99 | P = x(20 − x), P′ = 20 − 2x = 0 at x = 10, giving 10 × 10 = 100.
M3#maths-u07-22-q3@2: What is the minimum of f(x) = x^{2} − 6x on 4 ≤ x ≤ 7? | −8 | −9 | 0 | 7 | −5 | The critical point x = 3 is outside the interval; f(4) = −8 and f(7) = 7, so the minimum is −8 at the endpoint.

## Concavity and Convexity
S: Concavity describes how a graph bends: concave up (convex), like a cup, or concave down (concave), like a cap. The second derivative measures it, and convexity is central to optimisation and economics.
O: Determine intervals of concavity using f″
O: Explain the importance of convex functions in optimisation
T: Convex (concave up) | A function whose graph lies below its chords; f″ ≥ 0 for twice-differentiable functions
T: Concave (concave down) | A function whose graph lies above its chords; f″ ≤ 0
H: Using the second derivative
- f″(x) > 0 on an interval: convex (gradient increasing).
- f″(x) < 0: concave (gradient decreasing).
- f(x) = x^{3}: f″ = 6x, so concave for x < 0 and convex for x > 0.
- e^{x} is convex everywhere; ln x is concave for x > 0.
H: Why convexity matters
- For a convex function, any local minimum is a global minimum: a key fact in optimisation (School 18) and machine learning.
- Jensen's inequality: for convex f, f(average) ≤ average of f.
- Economics: diminishing marginal returns correspond to concave production functions.
- Note that "concave" and "convex" conventions vary: say "concave up" or "convex" clearly.
X: Find where f(x) = x^{4} − 6x^{2} is convex.
> f′(x) = 4x^{3} − 12x, f″(x) = 12x^{2} − 12 = 12(x − 1)(x + 1)
> f″ > 0 when x < −1 or x > 1
> f is convex for x < −1 and x > 1, and concave for −1 < x < 1
K: Convex where f″ > 0, concave where f″ < 0; convex functions have only global minima.
!: Confusing "concave" with "decreasing": a concave function can be increasing.
Q: Is e^{x} convex or concave? | Convex everywhere.
Q: What does convexity guarantee about minima? | Any local minimum is a global minimum.
SUM: The second derivative measures bending.
SUM: Convexity makes optimisation reliable.
SRC: Department for Education, Mathematics AS and A level subject content: differentiation | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Boyd S, Vandenberghe L, Convex Optimization (Cambridge University Press 2004) | textbook | 2004 | https://web.stanford.edu/~boyd/cvxbook/
M1#maths-u07-23-q1@1: On which interval is f(x) = x^{3} − 3x^{2} concave? | x < 1 | x > 1 | x < 0 | x > 3 | All x | The curve is concave where f″(x) < 0: f″(x) = 6x − 6 < 0 when x < 1.
M2#maths-u07-23-q2@2: Which function is convex for all real x? | x^{2} + e^{x} | ln x | −x^{2} | sin x | x^{3} | Both x^{2} and e^{x} have positive second derivatives, so their sum does too.

## Points of Inflection
S: A point of inflection is where a curve changes concavity, from bending one way to bending the other. At such a point the second derivative changes sign, and the tangent crosses the curve.
O: Find points of inflection using the second derivative
O: Distinguish stationary and non-stationary inflections
T: Point of inflection | A point where the graph changes from convex to concave or vice versa
T: Non-stationary inflection | An inflection where the gradient isn't zero
H: Finding them
- Solve f″(x) = 0, then check that f″ changes sign there.
- f(x) = x^{3} − 6x^{2} + 4: f″(x) = 6x − 12 = 0 at x = 2, and f″ changes from − to +, so (2, −12) is an inflection. f′(2) = 12 − 24 = −12 ≠ 0, so it's non-stationary.
- f″ = 0 isn't enough: x^{4} has f″(0) = 0 but no inflection (f″ ≥ 0 on both sides).
H: Interpretations
- The gradient is at a local maximum or minimum at an inflection: the steepest point of a curve.
- In growth models, the inflection of a logistic curve marks the fastest growth.
- Stationary inflections (like x^{3} at 0) are both stationary points and inflections.
X: Find the point of inflection of y = xe^{x}.
> y′ = e^{x}(x + 1), y″ = e^{x}(x + 2)
> y″ = 0 at x = −2, and changes sign there (e^{x} > 0, x + 2 changes sign)
> Inflection at (−2, −2e^{−2}) ≈ (−2, −0.271)
- At a non-stationary inflection, the tangent crosses the curve.
K: Solve f″ = 0 and check that f″ changes sign; an inflection is where the gradient is steepest locally.
!: Calling every point with f″ = 0 an inflection, without checking the sign change.
Q: What happens to f″ at a point of inflection? | It changes sign.
Q: Does y = x^{4} have an inflection at x = 0? | No: f″ = 12x^{2} doesn't change sign.
SUM: Inflections change concavity.
SUM: Check the sign change of f″.
SRC: Department for Education, Mathematics AS and A level subject content: differentiation | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
NUM1#maths-u07-24-q1@1: Find the x-coordinate of the point of inflection of y = x^{3} + 3x^{2} − 9x. | -1 | 0 |  | y″ = 6x + 6 = 0 at x = −1, where y″ changes sign.
M1#maths-u07-24-q2@1: Which curve has a point of inflection at the origin? | y = x^{3} | y = x^{2} | y = x^{4} | y = |x| | y = e^{x} | y″ = 6x changes sign at 0; for x^{4}, y″ = 12x^{2} doesn't.
M2#maths-u07-24-q3@2: For y = sin x on 0 < x < 2π, where is the inflection? | x = π | x = π/2 | x = 3π/2 | x = π/4 | There isn't one | y″ = −sin x is zero at x = π and changes sign there, so it's an inflection.

## Curve Sketching
S: Curve sketching uses calculus and algebra together to draw an accurate picture of a function: its intercepts, asymptotes, stationary points, inflections and end behaviour. A good sketch shows the key features, not exact plotting.
O: Combine intercepts, asymptotes and derivatives to sketch curves
O: Label key features accurately
T: Asymptote | A line a curve approaches but doesn't reach (vertical, horizontal or oblique)
T: End behaviour | What the function does as x → ±∞
H: A checklist
- **Domain** and any symmetry (even: f(−x) = f(x); odd: f(−x) = −f(x)).
- **Intercepts**: x = 0 for the y-intercept; solve f(x) = 0 for x-intercepts.
- **Asymptotes**: vertical where a denominator is zero (and the numerator isn't); horizontal from limits at ±∞; oblique by division.
- **Stationary points** and their nature; **inflections**.
- **End behaviour**, then draw smoothly through the features.
H: Example: y = x/(x^{2} + 1)
- Odd function; passes through the origin; no vertical asymptotes; y → 0 as x → ±∞ (horizontal asymptote y = 0).
- y′ = (1 − x^{2})/(x^{2} + 1)^{2}: maximum (1, ½), minimum (−1, −½).
- So the curve rises from 0 to a peak at x = 1 and decays back towards the axis.
X: Sketch y = (x + 1)/(x − 2), stating its asymptotes and intercepts.
> Vertical asymptote x = 2; as x → ±∞, y → 1, so horizontal asymptote y = 1
> Intercepts: (−1, 0) and (0, −1/2)
> y′ = −3/(x − 2)^{2} < 0: decreasing on each branch, a hyperbola in the regions above-right and below-left of the asymptotes' crossing
K: Work through domain, symmetry, intercepts, asymptotes, stationary points and end behaviour; label key points.
!: Drawing a curve crossing a vertical asymptote, or ignoring end behaviour.
Q: Where are the vertical asymptotes of y = 1/(x^{2} − 9)? | x = 3 and x = −3.
Q: What is the horizontal asymptote of y = (2x + 1)/(x − 5)? | y = 2.
SUM: Sketches show key features.
SUM: Calculus finds turning points; algebra finds intercepts and asymptotes.
SRC: Department for Education, Mathematics AS and A level subject content: algebra and functions | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
M1#maths-u07-25-q1@1: What is the vertical asymptote of y = 3/(x + 4)? | x = −4 | x = 4 | y = 0 | x = 3 | y = 3 | The denominator is zero at x = −4, where y grows without bound.
M2#maths-u07-25-q2@2: What is the horizontal asymptote of y = (6x^{2} + 1)/(3x^{2} − 2)? | y = 2 | y = 6 | y = 0 | y = 1/2 | None | As x → ∞, the leading terms dominate: 6x^{2}/3x^{2} = 2.

## Integral Calculus
S: Integral calculus is the mathematics of accumulation: adding up infinitely many small pieces to find areas, volumes, distances and totals. It's also the reverse of differentiation.
O: Describe integration as anti-differentiation and as accumulated area
O: Distinguish definite and indefinite integrals
T: Integral | Either an antiderivative (indefinite integral) or an accumulated total over an interval (definite integral)
T: Integrand | The function being integrated, f(x) in ∫ f(x) dx
H: Two views of integration
- **Reverse of differentiation**: ∫ 2x dx = x^{2} + c, because d/dx (x^{2}) = 2x.
- **Accumulation**: ∫_{a}^{b} f(x) dx adds up f(x) × dx over [a, b], giving the signed area under the curve.
- The fundamental theorem of calculus connects them (later in this school).
H: Applications
- Distance from velocity: s = ∫ v dt; velocity from acceleration.
- Areas and volumes of curved shapes; centres of mass; work done by a variable force.
- Probability: areas under probability density functions (School 12).
- Total change from a rate: if water flows at r(t) litres per minute, ∫_{0}^{10} r(t) dt is the total in 10 minutes.
X: A car's velocity is v = 3t^{2} m s^{−1}. How far does it travel from t = 0 to t = 4 s?
> Distance = ∫_{0}^{4} 3t^{2} dt
> An antiderivative is t^{3}
> 4^{3} − 0^{3} = 64 m
- Not every function has an elementary antiderivative: e^{−x^{2}} doesn't, though its definite integrals can still be computed.
K: Integration reverses differentiation and accumulates quantities; the definite integral is a signed area.
!: Forgetting that areas below the axis count as negative in a definite integral.
Q: What is the integrand in ∫ (x^{2} + 1) dx? | x^{2} + 1.
Q: How do you find distance from a velocity function? | Integrate the velocity over the time interval.
SUM: Integration accumulates.
SUM: It reverses differentiation.
SRC: Department for Education, Mathematics AS and A level subject content: integration | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
NUM1#maths-u07-26-q1@1: A tap's flow rate is r(t) = 2t litres per minute. How many litres flow in the first 5 minutes? | 25 | 0 | litres | ∫_{0}^{5} 2t dt = [t^{2}]_{0}^{5} = 25 litres.
M1#maths-u07-26-q2@1: Which quantity is found by integrating acceleration with respect to time? | Velocity | Displacement | Force | Jerk | Mass | Acceleration is the derivative of velocity, so integrating it gives velocity.
M2#maths-u07-26-q3@2: What does ∫_{a}^{b} f(x) dx represent if f is positive? | The area between the curve and the x-axis from a to b | The gradient at b | The average of f(a) and f(b) | The length of the curve | f(b) − f(a) | For a positive function, the definite integral is the area under the curve.

## Indefinite Integrals
S: An indefinite integral is the family of all antiderivatives of a function. Because constants differentiate to zero, every indefinite integral includes "+ c".
O: Integrate powers of x and standard functions
O: Use a boundary condition to find the constant of integration
T: Antiderivative | A function F with F′(x) = f(x)
T: Constant of integration | The arbitrary constant c in an indefinite integral
H: Standard integrals
E: ∫ x^{n} dx = x^{n+1}/(n + 1) + c (n ≠ −1); ∫ 1/x dx = ln|x| + c
E: ∫ e^{kx} dx = e^{kx}/k + c; ∫ sin kx dx = −cos(kx)/k + c; ∫ cos kx dx = sin(kx)/k + c
- Integrate term by term: ∫ (6x^{2} − 4x + 3) dx = 2x^{3} − 2x^{2} + 3x + c.
- Rewrite roots and reciprocals first: ∫ 3/√x dx = ∫ 3x^{−1/2} dx = 6x^{1/2} + c.
- ∫ sec^{2} x dx = tan x + c.
H: Finding c
- If dy/dx = 3x^{2} − 2 and the curve passes through (1, 4): y = x^{3} − 2x + c, so 4 = 1 − 2 + c and c = 5.
- Check any integral by differentiating your answer.
X: Find ∫ (x^{3} + 2)/x^{2} dx.
> Split: ∫ (x + 2x^{−2}) dx
> = x^{2}/2 + 2x^{−1}/(−1) + c
> = x^{2}/2 − 2/x + c
- Integrate expanded forms: ∫ (x + 1)^{2} dx = ∫ (x^{2} + 2x + 1) dx = x^{3}/3 + x^{2} + x + c.
- ∫ a^{x} dx = a^{x}/ln a + c.
- There's no product rule for integrals: ∫ fg dx isn't ∫ f dx × ∫ g dx.
- ∫ f′(x)/f(x) dx = ln|f(x)| + c is a standard pattern.
K: Raise the power by one and divide by the new power; ∫ 1/x = ln|x|; always add c; check by differentiating.
!: Integrating 1/x as x^{0}/0: the power rule fails for n = −1.
Q: What is ∫ 5x^{4} dx? | x^{5} + c.
Q: What is ∫ e^{2x} dx? | ½e^{2x} + c.
SUM: Indefinite integrals are families of antiderivatives.
SUM: Boundary conditions fix the constant.
SRC: Department for Education, Mathematics AS and A level subject content: integration | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
M1#maths-u07-27-q1@1: What is ∫ (4x − 1) dx? | 2x^{2} − x + c | 4 + c | 2x^{2} − 1 + c | 4x^{2} − x + c | x^{2} − x + c | 4x integrates to 2x^{2}, −1 integrates to −x, plus the constant c.
M2#maths-u07-27-q2@2: dy/dx = 2x and y = 7 when x = 2. What is y? | x^{2} + 3 | x^{2} + 7 | x^{2} − 3 | 2x^{2} − 1 | x^{2} | y = x^{2} + c, and 7 = 4 + c gives c = 3.
M3#maths-u07-27-q3@2: What is ∫ 1/(3x) dx? | (1/3) ln|x| + c | ln|3x|/3x + c | 3 ln|x| + c | x^{0}/0 + c | ln|x|/x + c | 1/(3x) = (1/3) × 1/x, and ∫ 1/x dx = ln|x|.

## Riemann Sums
S: A Riemann sum approximates the area under a curve by adding up the areas of thin rectangles. As the rectangles get thinner, the sum approaches the definite integral, which is how integration is defined.
O: Calculate left, right and midpoint Riemann sums
O: Explain how the definite integral is defined as a limit of sums
T: Riemann sum | Σ f(x_{i}*) Δx, the sum of rectangle areas approximating ∫_{a}^{b} f(x) dx
T: Partition | A division of [a, b] into subintervals of width Δx
H: Building the sum
- Split [a, b] into n strips of width Δx = (b − a)/n.
- Choose a height in each strip: the left endpoint, right endpoint or midpoint.
- Area ≈ Σ f(x_{i}) Δx.
- For an increasing function, left sums underestimate and right sums overestimate.
H: The limit
E: ∫_{a}^{b} f(x) dx = lim_{n→∞} Σ_{i=1}^{n} f(x_{i}) Δx
- The ∫ sign is an elongated S for "sum", and dx comes from Δx.
- For ∫_{0}^{1} x^{2} dx with right endpoints: Σ (i/n)^{2}(1/n) = (n + 1)(2n + 1)/(6n^{2}) → 1/3.
X: Estimate ∫_{0}^{2} x^{2} dx with four strips and right endpoints.
> Δx = 0.5; right endpoints 0.5, 1, 1.5, 2
> Heights 0.25, 1, 2.25, 4, which sum to 7.5
> Estimate = 7.5 × 0.5 = 3.75 (the exact value is 8/3 ≈ 2.67: an overestimate, since x^{2} is increasing)
- Midpoint sums are usually much more accurate than left or right sums.
- Riemann sums are how computers estimate integrals (School 19).
K: Rectangles of width Δx approximate the area; the integral is the limit as Δx → 0.
!: Forgetting to multiply the sum of heights by the strip width.
Q: Does a left Riemann sum over- or underestimate for an increasing function? | Underestimate.
Q: Where does the notation ∫ ... dx come from? | A sum (S) of f(x) times small widths Δx.
SUM: Riemann sums approximate areas with rectangles.
SUM: The definite integral is their limit.
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
SRC: Spivak M, Calculus (4th edn, Publish or Perish 2008) | textbook | 2008 | https://www.publishorperish.com/
NUM1#maths-u07-28-q1@1: Estimate ∫_{0}^{3} x dx with three strips and left endpoints. | 3 | 0 |  | Δx = 1; heights 0, 1 and 2 sum to 3; 3 × 1 = 3 (exact value 4.5).
M1#maths-u07-28-q2@1: With n strips on [a, b], what is the width of each? | (b − a)/n | n/(b − a) | b − a | (a + b)/n | 1/n | The interval's length divided equally into n parts.
M2#maths-u07-28-q3@2: For a decreasing function, how does a right Riemann sum compare with the integral? | It underestimates | It overestimates | It's exact | It's always zero | It depends on n only | Right endpoints of a decreasing function are the lowest points in each strip.

## Definite Integrals
S: A definite integral ∫_{a}^{b} f(x) dx gives a number: the net signed area between the curve and the x-axis from a to b. It's evaluated by finding an antiderivative and subtracting its values at the limits.
O: Evaluate definite integrals
O: Find areas under curves and between curves
T: Limits of integration | The values a and b in ∫_{a}^{b}
T: Signed area | Area above the x-axis counts positive; below counts negative
H: Evaluating
E: ∫_{a}^{b} f(x) dx = [F(x)]_{a}^{b} = F(b) − F(a)
- ∫_{1}^{3} (2x + 1) dx = [x^{2} + x]_{1}^{3} = 12 − 2 = 10.
- No + c is needed: it cancels.
- Properties: ∫_{a}^{a} f = 0; ∫_{b}^{a} f = −∫_{a}^{b} f; ∫_{a}^{b} f + ∫_{b}^{c} f = ∫_{a}^{c} f.
H: Areas
- For area (not signed area), split at the x-intercepts and add the absolute values of each part.
- ∫_{0}^{2π} sin x dx = 0, but the area between sin x and the axis is 4.
- Area between curves: ∫_{a}^{b} (top − bottom) dx, where a and b are the intersection points.
X: Find the area enclosed by y = x^{2} and y = 2x.
> Intersections: x^{2} = 2x gives x = 0 and x = 2
> On [0, 2], 2x is on top: area = ∫_{0}^{2} (2x − x^{2}) dx = [x^{2} − x^{3}/3]_{0}^{2}
> = 4 − 8/3 = 4/3
- Even functions: ∫_{−a}^{a} f = 2∫_{0}^{a} f; odd functions: ∫_{−a}^{a} f = 0.
- The average value of f on [a, b] is (1/(b − a)) ∫_{a}^{b} f(x) dx.
K: F(b) − F(a); split at x-intercepts for total area; area between curves is ∫ (top − bottom).
!: Reporting a negative area, or letting parts above and below the axis cancel.
Q: What is ∫_{0}^{1} 3x^{2} dx? | 1.
Q: Why is ∫_{−1}^{1} x^{3} dx = 0? | The equal areas above and below the axis cancel (x^{3} is odd).
SUM: Definite integrals give net signed areas.
SUM: Split at roots for total area.
SRC: Department for Education, Mathematics AS and A level subject content: integration | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
NUM1#maths-u07-29-q1@1: Evaluate ∫_{1}^{4} 3√x dx. | 14 | 0 |  | [2x^{3/2}]_{1}^{4} = 2 × 8 − 2 × 1 = 14.
M1#maths-u07-29-q2@1: What is ∫_{0}^{2} (x^{3} + 1) dx? | 6 | 4 | 5 | 8 | 2 | An antiderivative is x^{4}/4 + x; evaluating from 0 to 2 gives 4 + 2 − 0 = 6.
M2#maths-u07-29-q3@2: What is the total area between y = x − 1 and the x-axis from x = 0 to x = 2? | 1 | 0 | 2 | 1/2 | −1 | Each triangle has area 1/2, one below and one above the axis; the total area is 1, though the integral is 0.

## Fundamental Theorem of Calculus
S: The fundamental theorem of calculus links the two halves of calculus: differentiation and integration are inverse processes. It's why we can evaluate areas using antiderivatives instead of limits of sums.
O: State both parts of the fundamental theorem of calculus
O: Differentiate integrals with variable limits
T: Accumulation function | A(x) = ∫_{a}^{x} f(t) dt, the area from a to x
T: Fundamental theorem (part 1) | If f is continuous, then d/dx ∫_{a}^{x} f(t) dt = f(x)
H: The two parts
- **Part 1**: the rate at which the accumulated area grows equals the height of the curve: A′(x) = f(x).
- **Part 2**: if F′ = f, then ∫_{a}^{b} f(x) dx = F(b) − F(a).
- Why part 1 holds: A(x + h) − A(x) is a thin strip of area about f(x) × h, so (A(x + h) − A(x))/h → f(x).
H: Using part 1
- d/dx ∫_{0}^{x} cos(t^{2}) dt = cos(x^{2}), even though cos(t^{2}) has no elementary antiderivative.
- With a variable upper limit g(x), use the chain rule: d/dx ∫_{0}^{x^{2}} e^{t} dt = e^{x^{2}} × 2x.
- The theorem was understood by Barrow, Newton and Leibniz, and proved rigorously in the 19th century.
X: Find d/dx ∫_{1}^{3x} ln t dt.
> By part 1 with the chain rule, the derivative is ln(3x) × d/dx (3x)
> = 3 ln(3x)
> (Check: ∫ ln t dt = t ln t − t, and differentiating 3x ln(3x) − 3x gives 3 ln(3x) + 3 − 3)
K: Differentiating an accumulated integral returns the integrand; evaluating a definite integral uses any antiderivative.
!: Forgetting the chain rule when the upper limit is a function of x.
Q: What is d/dx ∫_{2}^{x} t^{3} dt? | x^{3}.
Q: Which two processes does the theorem show are inverses? | Differentiation and integration.
SUM: Calculus has two halves linked by one theorem.
SUM: Antiderivatives evaluate definite integrals.
SRC: Spivak M, Calculus (4th edn, Publish or Perish 2008) | textbook | 2008 | https://www.publishorperish.com/
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
M1#maths-u07-30-q1@1: What is d/dx ∫_{0}^{x} √(1 + t^{2}) dt? | √(1 + x^{2}) | √(1 + x^{2}) − 1 | x√(1 + x^{2}) | 0 | 1/(2√(1 + x^{2})) | Part 1 of the theorem: the derivative of the accumulation function is the integrand at x.
M2#maths-u07-30-q2@2: What is d/dx ∫_{0}^{x^{3}} sin t dt? | 3x^{2} sin(x^{3}) | sin(x^{3}) | −cos(x^{3}) | 3x^{2} cos(x^{3}) | sin x | The integrand at the upper limit, sin(x^{3}), times the derivative of x^{3}, which is 3x^{2}.

## Integration by Substitution
S: Integration by substitution reverses the chain rule. Replacing an awkward part of the integrand with a new variable u often turns a hard integral into a standard one.
O: Integrate using a substitution, including changing limits
O: Recognise integrals of the form ∫ f′(x)/f(x) dx and ∫ f′(x)[f(x)]^{n} dx
T: Substitution | Replacing x with a function of u (or u with a function of x) to simplify an integral
T: du | The differential of u: du = (du/dx) dx
H: Method
- Choose u (often the inside of a composite), find du in terms of dx, rewrite everything in u, integrate, then substitute back.
- ∫ 2x(x^{2} + 1)^{5} dx: u = x^{2} + 1, du = 2x dx, so ∫ u^{5} du = u^{6}/6 + c = (x^{2} + 1)^{6}/6 + c.
- Definite integrals: change the limits to u-values and don't substitute back.
H: Recognising patterns
- ∫ f′(x)/f(x) dx = ln|f(x)| + c: ∫ 2x/(x^{2} + 3) dx = ln(x^{2} + 3) + c; ∫ tan x dx = −ln|cos x| + c.
- ∫ f′(x)e^{f(x)} dx = e^{f(x)} + c.
- Trigonometric substitutions: x = sin θ for √(1 − x^{2}).
X: Evaluate ∫_{0}^{1} x√(1 − x^{2}) dx using u = 1 − x^{2}.
> du = −2x dx, so x dx = −½ du; limits: x = 0 → u = 1, x = 1 → u = 0
> ∫_{1}^{0} −½ u^{1/2} du = ½ ∫_{0}^{1} u^{1/2} du
> = ½ × [⅔u^{3/2}]_{0}^{1} = 1/3
- Sometimes the substitution is given as x = g(u) instead: then dx = g′(u) du.
- Always check by differentiating the final answer.
K: Choose u, convert dx and the limits, integrate in u; spot f′/f and f′e^{f} patterns.
!: Changing the variable but forgetting to change the limits (or the dx).
Q: What is ∫ 3x^{2}/(x^{3} + 1) dx? | ln|x^{3} + 1| + c.
Q: What substitution suits ∫ cos x e^{sin x} dx? | u = sin x.
SUM: Substitution reverses the chain rule.
SUM: Change limits in definite integrals.
SRC: Department for Education, Mathematics AS and A level subject content: integration | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
M1#maths-u07-31-q1@1: What is ∫ 2x e^{x^{2}} dx? | e^{x^{2}} + c | 2e^{x^{2}} + c | x^{2}e^{x^{2}} + c | e^{2x} + c | e^{x^{2}}/(2x) + c | With u = x^{2}, du = 2x dx, the integral becomes ∫ e^{u} du = e^{u} + c.
M2#maths-u07-31-q2@2: What is ∫ (2x + 3)^{4} dx? | (2x + 3)^{5}/10 + c | (2x + 3)^{5}/5 + c | 2(2x + 3)^{5}/5 + c | (2x + 3)^{3}/12 + c | 4(2x + 3)^{3} + c | With u = 2x + 3, dx = du/2, so ∫ u^{4}/2 du = u^{5}/10 + c.

## Integration by Parts
S: Integration by parts reverses the product rule. It integrates products like x e^{x} or x sin x by trading one integral for a simpler one.
O: Integrate products using integration by parts
O: Choose u and dv/dx well, including repeated and cyclic cases
T: Integration by parts | ∫ u (dv/dx) dx = uv − ∫ v (du/dx) dx
T: LIATE | A guide for choosing u: Logarithms, Inverse trig, Algebraic, Trigonometric, Exponential (earlier in the list first)
H: The formula
E: ∫ u dv = uv − ∫ v du
- ∫ x e^{x} dx: u = x, dv = e^{x} dx; so du = dx, v = e^{x}: x e^{x} − ∫ e^{x} dx = x e^{x} − e^{x} + c.
- ∫ ln x dx: u = ln x, dv = dx: x ln x − ∫ x × (1/x) dx = x ln x − x + c.
- Choose u to get simpler when differentiated, and dv to be easy to integrate.
H: Repeated and cyclic cases
- ∫ x^{2} e^{x} dx needs parts twice: e^{x}(x^{2} − 2x + 2) + c.
- ∫ e^{x} sin x dx returns to itself after two applications: solve for the integral: ½e^{x}(sin x − cos x) + c.
- Definite integrals: [uv]_{a}^{b} − ∫_{a}^{b} v du.
X: Find ∫ x cos x dx.
> u = x, dv/dx = cos x, so du/dx = 1 and v = sin x
> ∫ x cos x dx = x sin x − ∫ sin x dx
> = x sin x + cos x + c
- It comes from integrating the product rule: (uv)′ = u′v + uv′, so uv = ∫ u′v + ∫ uv′.
- Inverse trig functions: ∫ arctan x dx = x arctan x − ½ ln(1 + x^{2}) + c, with u = arctan x.
- Tabular integration speeds up repeated parts with a polynomial times e^{x} or sin x.
K: ∫ u dv = uv − ∫ v du; pick u by LIATE; repeat or solve cyclically when needed.
!: Choosing u = e^{x} and dv = x dx, which makes the new integral harder.
Q: What is ∫ x e^{2x} dx? | ½x e^{2x} − ¼e^{2x} + c.
Q: How do you integrate ln x by parts? | Take u = ln x and dv/dx = 1.
SUM: Parts reverses the product rule.
SUM: Choose u to simplify when differentiated.
SRC: Department for Education, Mathematics AS and A level subject content: integration | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
NUM1#maths-u07-32-q1@1: Evaluate ∫_{0}^{1} x e^{x} dx. | 1 | 0 |  | [x e^{x} − e^{x}]_{0}^{1} = (e − e) − (0 − 1) = 1.
M1#maths-u07-32-q2@1: For ∫ x^{2} ln x dx, which choice of u is best? | u = ln x | u = x^{2} | u = x^{2} ln x | u = 1 | u = x | Logarithms come first in LIATE, and ln x simplifies to 1/x when differentiated.
M3#maths-u07-32-q3@2: What is ∫ ln x dx? | x ln x − x + c | 1/x + c | x ln x + c | (ln x)^{2}/2 + c | ln x − x + c | Parts with u = ln x, dv = dx gives x ln x − ∫ 1 dx.

## Partial Fraction Integration
S: Rational functions are integrated by splitting them into partial fractions (School 3), each of which integrates to a logarithm or a power. It's essential for integrals like ∫ 1/(x^{2} − 1) dx.
O: Integrate rational functions using partial fractions
O: Handle repeated factors and improper fractions
T: Partial fractions | A sum of simpler fractions equal to a rational function
T: Improper fraction | One where the numerator's degree is at least the denominator's; divide first
H: Method
- Divide first if the fraction is improper.
- Split into partial fractions; integrate each: ∫ A/(x − a) dx = A ln|x − a| + c; ∫ B/(x − a)^{2} dx = −B/(x − a) + c.
- 1/(x^{2} − 1) = ½(1/(x − 1) − 1/(x + 1)), so ∫ = ½ ln|(x − 1)/(x + 1)| + c.
H: Further cases
- Irreducible quadratic factors lead to arctan: ∫ 1/(x^{2} + a^{2}) dx = (1/a) arctan(x/a) + c.
- Definite integrals give answers as logarithms; combine them with the log laws.
- Partial fractions also appear in solving differential equations (School 10), such as the logistic equation.
X: Evaluate ∫_{2}^{3} 5/((x − 1)(x + 4)) dx.
> 5/((x − 1)(x + 4)) = 1/(x − 1) − 1/(x + 4)
> ∫ = [ln|x − 1| − ln|x + 4|]_{2}^{3} = (ln 2 − ln 7) − (ln 1 − ln 6)
> = ln(12/7) ≈ 0.539
- Improper example: (x^{2} + 1)/(x − 1) = x + 1 + 2/(x − 1), which integrates to x^{2}/2 + x + 2 ln|x − 1| + c.
- The answer can be checked by differentiating.
K: Split into partial fractions, integrate each term to a log or power, and combine logs.
!: Integrating 1/(x − 1)^{2} as ln|x − 1|^{2}: it's −1/(x − 1).
Q: What is ∫ 1/(x + 3) dx? | ln|x + 3| + c.
Q: What is ∫ 1/(x − 2)^{2} dx? | −1/(x − 2) + c.
SUM: Partial fractions make rational integrals routine.
SUM: Repeated factors give non-log terms.
SRC: Department for Education, Mathematics AS and A level subject content: integration | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stroud KA, Booth DJ, Engineering Mathematics (8th edn, Bloomsbury 2020) | textbook | 2020 | https://www.bloomsbury.com/
M1#maths-u07-33-q1@1: What is ∫ (1/x − 1/(x + 1)) dx? | ln|x/(x + 1)| + c | ln|x(x + 1)| + c | 1/x^{2} + c | ln|x| + c | −1/(x(x + 1)) + c | ln|x| − ln|x + 1| combines to ln|x/(x + 1)|.
M2#maths-u07-33-q2@2: What is ∫ 2/(x^{2} − 1) dx? | ln|(x − 1)/(x + 1)| + c | 2 ln|x^{2} − 1| + c | ln|x^{2} − 1| + c | 2 arctan x + c | ln|(x + 1)/(x − 1)| + c | 2/(x^{2} − 1) = 1/(x − 1) − 1/(x + 1), which integrates to ln|x − 1| − ln|x + 1|.

## Trigonometric Integration
S: Integrating trigonometric functions uses standard results, identities to rewrite powers and products, and substitutions. Double angle formulas are the key tool for squares of sin and cos.
O: Integrate standard trigonometric functions
O: Use identities to integrate sin^{2} x, cos^{2} x and products
T: Double angle identity | cos 2x = 1 − 2 sin^{2} x = 2 cos^{2} x − 1, used to lower powers
T: Reverse chain rule | ∫ f′(x) g′(f(x)) dx = g(f(x)) + c
H: Standard results
- ∫ sin kx dx = −(1/k) cos kx + c; ∫ cos kx dx = (1/k) sin kx + c.
- ∫ sec^{2} x dx = tan x + c; ∫ tan x dx = ln|sec x| + c; ∫ sec x tan x dx = sec x + c.
H: Using identities
- sin^{2} x = ½(1 − cos 2x), so ∫ sin^{2} x dx = x/2 − (sin 2x)/4 + c.
- cos^{2} x = ½(1 + cos 2x), so ∫ cos^{2} x dx = x/2 + (sin 2x)/4 + c.
- tan^{2} x = sec^{2} x − 1, so ∫ tan^{2} x dx = tan x − x + c.
- Odd powers: ∫ sin^{3} x dx = ∫ (1 − cos^{2} x) sin x dx; substitute u = cos x.
- Products: sin x cos x = ½ sin 2x; or use u = sin x.
X: Evaluate ∫_{0}^{π/2} cos^{2} x dx.
> cos^{2} x = ½(1 + cos 2x)
> ∫ = [x/2 + (sin 2x)/4]_{0}^{π/2}
> = π/4 + 0 − 0 = π/4
- Products of different angles: sin 3x cos x = ½(sin 4x + sin 2x), using the product-to-sum identities.
- Integrals of trig functions over a full period are often zero, which is used in Fourier series (School 6).
K: Know the standard trig integrals; lower powers with double angle identities; use substitution for odd powers.
!: Integrating sin^{2} x as sin^{3} x/3.
Q: What is ∫ sin^{2} x dx? | x/2 − (sin 2x)/4 + c.
Q: What is ∫ cos 3x dx? | (1/3) sin 3x + c.
SUM: Identities turn powers into integrable forms.
SUM: Substitution handles odd powers.
SRC: Department for Education, Mathematics AS and A level subject content: integration | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stroud KA, Booth DJ, Engineering Mathematics (8th edn, Bloomsbury 2020) | textbook | 2020 | https://www.bloomsbury.com/
NUM1#maths-u07-34-q1@1: Evaluate ∫_{0}^{π} sin x dx. | 2 | 0 |  | [−cos x]_{0}^{π} = 1 − (−1) = 2.
M1#maths-u07-34-q2@1: What is ∫ sec^{2} 2x dx? | (1/2) tan 2x + c | tan 2x + c | 2 tan 2x + c | sec 2x + c | (1/2) sec^{2} 2x + c | d/dx tan 2x = 2 sec^{2} 2x, so divide by 2.
M2#maths-u07-34-q3@2: Which identity integrates sin^{2} x? | sin^{2} x = ½(1 − cos 2x) | sin^{2} x = 1 + cos^{2} x | sin^{2} x = 2 sin x cos x | sin^{2} x = tan^{2} x + 1 | sin^{2} x = cos 2x | The double angle formula replaces the square with a first-power cosine, which integrates directly.

## Improper Integrals
S: An improper integral has an infinite limit or an integrand that blows up somewhere in the interval. It's defined as a limit, and it may converge to a finite value or diverge.
O: Evaluate improper integrals with infinite limits or infinite integrands
O: Decide whether an improper integral converges
T: Improper integral | ∫ with an infinite limit, or an integrand unbounded on the interval
T: Converges | Has a finite limiting value
H: Infinite limits
E: ∫_{a}^{∞} f(x) dx = lim_{b→∞} ∫_{a}^{b} f(x) dx
- ∫_{1}^{∞} 1/x^{2} dx = lim [−1/x]_{1}^{b} = 1: converges.
- ∫_{1}^{∞} 1/x dx = lim ln b = ∞: diverges.
- In general ∫_{1}^{∞} 1/x^{p} dx converges exactly when p > 1.
- ∫_{0}^{∞} e^{−x} dx = 1.
H: Infinite integrands
- ∫_{0}^{1} 1/√x dx = lim_{a→0⁺} [2√x]_{a}^{1} = 2: converges, though the integrand is unbounded near 0.
- ∫_{0}^{1} 1/x dx diverges.
- Watch for hidden problems inside the interval: ∫_{−1}^{1} 1/x^{2} dx isn't −2; it diverges.
X: Evaluate ∫_{0}^{∞} x e^{−x^{2}} dx.
> With u = x^{2}: ∫ x e^{−x^{2}} dx = −½e^{−x^{2}}
> ∫_{0}^{b} = −½e^{−b^{2}} + ½
> As b → ∞ this tends to ½, so the integral converges to ½
- The Gaussian integral ∫_{−∞}^{∞} e^{−x^{2}} dx = √π converges, underpinning the normal distribution.
- Comparison tests decide convergence when the antiderivative is unknown.
K: Replace the problem point by a variable, integrate, take the limit; 1/x^{p} converges at ∞ for p > 1 and at 0 for p < 1.
!: Ignoring a vertical asymptote inside the interval of integration.
Q: Does ∫_{1}^{∞} 1/x^{3} dx converge? | Yes, to 1/2.
Q: Does ∫_{1}^{∞} 1/√x dx converge? | No: p = 1/2 ≤ 1.
SUM: Improper integrals are limits.
SUM: They converge or diverge.
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
NUM1#maths-u07-35-q1@1: Evaluate ∫_{2}^{∞} 4/x^{3} dx. | 0.5 | 0.001 |  | [−2/x^{2}]_{2}^{∞} = 0 − (−2/4) = 1/2.
M1#maths-u07-35-q2@1: Which integral diverges? | ∫_{1}^{∞} 1/x dx | ∫_{1}^{∞} 1/x^{2} dx | ∫_{0}^{∞} e^{−x} dx | ∫_{0}^{1} 1/√x dx | ∫_{1}^{∞} x^{−1.5} dx | ∫ 1/x = ln x, which grows without bound as x → ∞.
M3#maths-u07-35-q3@2: What is wrong with computing ∫_{−1}^{1} 1/x^{2} dx = [−1/x]_{−1}^{1} = −2? | The integrand is unbounded at x = 0, and the integral diverges | Nothing: the answer is −2 | The limits should be swapped | The antiderivative should be ln|x| | It should be 2 | A positive integrand can't give a negative area; the asymptote at 0 makes it improper and divergent.

## Numerical Integration
S: Many integrals can't be found exactly, and data often comes as a table rather than a formula. Numerical methods (the trapezium rule, Simpson's rule) estimate definite integrals with known accuracy.
O: Apply the trapezium rule and Simpson's rule
O: Explain whether an estimate is an over- or underestimate and how to improve it
T: Trapezium rule | ∫_{a}^{b} y dx ≈ (h/2)[y_{0} + 2(y_{1} + … + y_{n−1}) + y_{n}], with h = (b − a)/n
T: Simpson's rule | ∫_{a}^{b} y dx ≈ (h/3)[y_{0} + 4(odd ys) + 2(even interior ys) + y_{n}], with n even
H: The trapezium rule
- Join the points with straight lines and add the trapezium areas.
- It overestimates for convex curves (the chords lie above) and underestimates for concave ones.
- Halving h roughly quarters the error.
H: Simpson's rule and other methods
- Fits parabolas through triples of points: much more accurate for smooth functions (error proportional to h^{4}).
- Gaussian quadrature (School 19) chooses the points cleverly for even greater accuracy.
- Used for integrals like ∫ e^{−x^{2}} dx, which has no elementary antiderivative, and for experimental data.
X: Use the trapezium rule with 4 strips to estimate ∫_{0}^{2} e^{x} dx.
> h = 0.5; y-values at 0, 0.5, 1, 1.5, 2: 1, 1.6487, 2.7183, 4.4817, 7.3891
> Estimate = 0.25 × [1 + 2(1.6487 + 2.7183 + 4.4817) + 7.3891] = 0.25 × 26.0865
> ≈ 6.52 (exact: e^{2} − 1 ≈ 6.39; an overestimate, since e^{x} is convex)
K: Trapezium: (h/2)[ends + 2 × middles]; overestimates convex curves; Simpson's rule is more accurate.
!: Using the number of ordinates instead of the number of strips to find h.
Q: Does the trapezium rule over- or underestimate ∫ x^{2} dx? | Overestimate: x^{2} is convex.
Q: How many strips does Simpson's rule need? | An even number.
SUM: Numerical methods estimate definite integrals.
SUM: Convexity decides the error's direction for the trapezium rule.
SRC: Department for Education, Mathematics AS and A level subject content: numerical methods | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Burden RL, Faires JD, Burden AM, Numerical Analysis (10th edn, Cengage 2016) | textbook | 2016 | https://www.cengage.co.uk/
NUM1#maths-u07-36-q1@1: Use the trapezium rule with 2 strips to estimate ∫_{0}^{2} x^{2} dx. | 3 | 0 |  | h = 1; (1/2)[0 + 2(1) + 4] = 3 (exact value 8/3).
M1#maths-u07-36-q2@1: In the trapezium rule with n strips on [a, b], what is h? | (b − a)/n | n/(b − a) | (b − a)/(n + 1) | b − a | 1/n | h is the strip width: the interval's length divided by the number of strips.
M2#maths-u07-36-q3@2: Which rule is usually more accurate for a smooth function with the same points? | Simpson's rule | The trapezium rule | They're always equal | A left Riemann sum | A right Riemann sum | Simpson's rule fits parabolas, giving errors of order h^{4} instead of h^{2}.

## Arc Length and Surface Area
S: Integration measures more than areas: the length of a curve and the surface area of a solid of revolution come from adding up tiny straight pieces. These are Further Maths and first-year university results.
O: Calculate arc lengths of curves
O: Calculate surface areas of revolution
T: Arc length | The length of a curve between two points
T: Surface of revolution | The surface made by rotating a curve about an axis
H: Arc length
E: L = ∫_{a}^{b} √(1 + (dy/dx)^{2}) dx; parametric: L = ∫ √((dx/dt)^{2} + (dy/dt)^{2}) dt
- A tiny piece of curve is the hypotenuse of a triangle with sides dx and dy: √(dx^{2} + dy^{2}).
- For y = x^{3/2} from 0 to 4: dy/dx = (3/2)x^{1/2}, so L = ∫_{0}^{4} √(1 + 9x/4) dx = (8/27)(10^{3/2} − 1) ≈ 9.07.
- Circle check: x = r cos t, y = r sin t gives L = ∫_{0}^{2π} r dt = 2πr.
H: Surface area
E: S = 2π ∫_{a}^{b} y √(1 + (dy/dx)^{2}) dx (rotation about the x-axis)
- Each tiny piece sweeps out a band of circumference 2πy.
- A sphere of radius r (rotating y = √(r^{2} − x^{2})) gives S = 4πr^{2}.
- Many arc length integrals have no elementary antiderivative: use numerical integration.
X: Find the length of the parametric curve x = t^{2}, y = (2/3)t^{3} for 0 ≤ t ≤ 1.
> dx/dt = 2t, dy/dt = 2t^{2}, so √(4t^{2} + 4t^{4}) = 2t√(1 + t^{2})
> L = ∫_{0}^{1} 2t√(1 + t^{2}) dt = [(2/3)(1 + t^{2})^{3/2}]_{0}^{1}
> = (2/3)(2√2 − 1) ≈ 1.22
K: Arc length integrates √(1 + (dy/dx)^{2}); surface area adds the factor 2πy; parametric forms use √((dx/dt)^{2} + (dy/dt)^{2}).
!: Forgetting the square root, or integrating (dy/dx)^{2} alone.
Q: What is the arc length element? | ds = √(1 + (dy/dx)^{2}) dx.
Q: What is the surface area of a sphere of radius r? | 4πr^{2}.
SUM: Arc length sums tiny hypotenuses.
SUM: Surface area sums bands of circumference 2πy.
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
NUM1#maths-u07-37-q1@1: Find the length of the line y = 3x/4 from x = 0 to x = 4. | 5 | 0 |  | √(1 + 9/16) = 5/4, and ∫_{0}^{4} 5/4 dx = 5 (a 3-4-5 triangle).
M1#maths-u07-37-q2@1: Which integral gives the arc length of y = x^{2} from 0 to 1? | ∫_{0}^{1} √(1 + 4x^{2}) dx | ∫_{0}^{1} √(1 + x^{4}) dx | ∫_{0}^{1} (1 + 2x) dx | ∫_{0}^{1} 2πx^{2} dx | ∫_{0}^{1} √(1 + 2x) dx | dy/dx = 2x, so (dy/dx)^{2} = 4x^{2} goes under the root.
M2#maths-u07-37-q3@2: Rotating y = x from x = 0 to x = 1 about the x-axis gives a cone. What is its curved surface area? | π√2 | 2π | π | 2π√2 | π/√2 | S = 2π ∫_{0}^{1} x√2 dx = 2π√2 × ½ = π√2, matching πrl with r = 1, l = √2.

## Volumes of Revolution
S: Rotating a region around an axis creates a solid of revolution. Its volume comes from adding up thin circular discs: ∫ πy^{2} dx. This finds the volumes of vases, nose cones and other curved shapes.
O: Find volumes of revolution about the x- and y-axes
O: Find volumes for regions between two curves
T: Solid of revolution | A solid formed by rotating a region about an axis
T: Disc method | Summing circular cross-sections: V = π ∫ y^{2} dx
H: The disc method
E: V = π ∫_{a}^{b} y^{2} dx (about the x-axis); V = π ∫_{c}^{d} x^{2} dy (about the y-axis)
- Rotating y = √x from 0 to 4 about the x-axis: V = π ∫_{0}^{4} x dx = 8π.
- A cone: y = (r/h)x from 0 to h gives π(r^{2}/h^{2})(h^{3}/3) = πr^{2}h/3, the familiar formula.
- A sphere: y = √(r^{2} − x^{2}) from −r to r gives (4/3)πr^{3}.
H: Washers and parametric curves
- A region between y = f(x) (outer) and y = g(x) (inner): V = π ∫ (f^{2} − g^{2}) dx: subtract the hole.
- Parametric: V = π ∫ y^{2} (dx/dt) dt.
- Applications: volumes of containers, engineering components, and modelling real objects by curves.
X: The region between y = x^{2} and y = 2x is rotated about the x-axis. Find the volume.
> The curves meet at x = 0 and x = 2; on [0, 2], 2x is the outer curve
> V = π ∫_{0}^{2} (4x^{2} − x^{4}) dx = π[4x^{3}/3 − x^{5}/5]_{0}^{2}
> = π(32/3 − 32/5) = 64π/15
K: V = π ∫ y^{2} dx; for washers subtract the inner radius squared; about the y-axis integrate x^{2} dy.
!: Squaring the difference of radii, (f − g)^{2}, instead of subtracting the squares, f^{2} − g^{2}.
Q: What is the volume when y = 2 from x = 0 to 3 is rotated about the x-axis? | 12π (a cylinder).
Q: What's the formula for the volume about the y-axis? | V = π ∫ x^{2} dy.
SUM: Discs sum to volumes.
SUM: Washers handle hollow solids.
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
NUM1#maths-u07-38-q1@1: Find the volume when y = x is rotated about the x-axis from x = 0 to x = 3, as a multiple of π. | 9 | 0 | π | π ∫_{0}^{3} x^{2} dx = π × 9: a cone of radius 3 and height 3.
M1#maths-u07-38-q2@1: Rotating y = √x from 0 to 2 about the x-axis gives a volume of: | 2π | 4π | π | 8π/3 | √2π | V = π ∫ y^{2} dx = π ∫_{0}^{2} x dx = π × [x^{2}/2]_{0}^{2} = 2π.
M3#maths-u07-38-q3@2: Which integral gives the volume between y = 3 and y = x^{2} + 1 (from x = −√2 to √2) rotated about the x-axis? | π ∫ (9 − (x^{2} + 1)^{2}) dx | π ∫ (3 − x^{2} − 1)^{2} dx | π ∫ (x^{2} + 1)^{2} dx | 2π ∫ x(2 − x^{2}) dx | π ∫ 9 dx | Washers: outer radius 3 and inner radius x^{2} + 1, so subtract the squares.

## Sequences and Series
S: A sequence is a list of numbers; a series is their sum. Arithmetic and geometric series have neat formulas, and sums of sequences lead naturally to infinite series and calculus.
O: Find sums of arithmetic and geometric series
O: Use sigma notation
T: Series | The sum of the terms of a sequence
T: Sigma notation | Σ_{r=1}^{n} f(r) means f(1) + f(2) + … + f(n)
H: Arithmetic and geometric series
E: Arithmetic: S_{n} = n/2 (2a + (n − 1)d); Geometric: S_{n} = a(1 − r^{n})/(1 − r) (r ≠ 1)
- 3 + 7 + 11 + … to 20 terms: 10(6 + 76) = 820.
- 2 + 6 + 18 + … to 8 terms: 2(1 − 3^{8})/(1 − 3) = 6,560.
- Gauss's trick: 1 + 2 + … + 100 = 100 × 101/2 = 5,050.
H: Sigma notation and standard sums
- Σ_{r=1}^{n} r = n(n + 1)/2; Σ r^{2} = n(n + 1)(2n + 1)/6; Σ r^{3} = (n(n + 1)/2)^{2}.
- Split sums: Σ (3r + 2) = 3Σ r + 2n.
- Method of differences (Further Maths): Σ 1/(r(r + 1)) = Σ (1/r − 1/(r + 1)) = 1 − 1/(n + 1), as terms cancel ("telescoping").
X: Find Σ_{r=1}^{10} (2r^{2} − 3).
> 2Σ r^{2} = 2 × 10 × 11 × 21/6 = 770
> Σ 3 over 10 terms = 30
> 770 − 30 = 740
- Geometric series grow or decay quickly: compound interest and loan repayments are geometric series.
- The sum of a series can be found from its partial sums S_{n} by u_{n} = S_{n} − S_{n−1}.
K: Use S_{n} formulas for arithmetic and geometric series, standard sums for Σ r, Σ r^{2}, Σ r^{3}, and telescoping where terms cancel.
!: Forgetting that Σ_{r=1}^{n} c = nc, not c.
Q: What is 1 + 2 + … + 50? | 1,275.
Q: What is the sum of the first 5 terms of 1, 2, 4, 8, …? | 31.
SUM: Series sum sequences.
SUM: Standard formulas and telescoping evaluate them.
SRC: Department for Education, Mathematics AS and A level subject content: sequences and series | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
NUM1#maths-u07-39-q1@1: Find the sum of the arithmetic series 5 + 8 + 11 + … + 62. | 670 | 0 |  | There are 20 terms ((62 − 5)/3 + 1), so S = 20 × (5 + 62)/2 = 670.
M1#maths-u07-39-q2@1: What is Σ_{r=1}^{4} r^{2}? | 30 | 16 | 10 | 100 | 20 | Square each of 1 to 4 and add: 1 + 4 + 9 + 16 = 30.
M2#maths-u07-39-q3@2: What is Σ_{r=1}^{n} 1/(r(r + 1))? | 1 − 1/(n + 1) | 1/(n + 1) | n | 1/n | ln n | It telescopes: (1 − ½) + (½ − ⅓) + … + (1/n − 1/(n + 1)).

## Infinite Series
S: An infinite series adds infinitely many terms. Some add up to a finite number, like ½ + ¼ + ⅛ + … = 1, and some grow without limit. Infinite series define functions like e^{x} and sin x.
O: Find the sum to infinity of a convergent geometric series
O: Explain what it means for an infinite series to have a sum
T: Sum to infinity | The limit of the partial sums S_{n} as n → ∞, if it exists
T: Partial sum | S_{n}, the sum of the first n terms
H: Geometric series
E: S_{∞} = a/(1 − r), valid only for |r| < 1
- ½ + ¼ + ⅛ + … = (½)/(1 − ½) = 1.
- 0.333… = 3/10 + 3/100 + … = (3/10)/(1 − 1/10) = 1/3.
- If |r| ≥ 1 the series diverges: 1 + 2 + 4 + … has no sum.
H: Meaning and famous examples
- The sum is the limit of the partial sums: S_{n} = 1 − (½)^{n} → 1.
- The harmonic series 1 + ½ + ⅓ + ¼ + … diverges, even though its terms tend to zero (it grows like ln n).
- Σ 1/n^{2} = π^{2}/6 (Euler, the Basel problem).
- Zeno's paradoxes are resolved by convergent series.
X: A ball dropped from 10 m rebounds to 60% of its previous height each time. Find the total distance it travels.
> Down 10, then up and down 6, 3.6, … each twice
> Total = 10 + 2(6 + 3.6 + 2.16 + …) = 10 + 2 × 6/(1 − 0.6)
> = 10 + 30 = 40 m
- Changing the first few terms changes the sum but not whether it converges.
- Recurring decimals are geometric series, which is why they're rational.
K: S_{∞} = a/(1 − r) when |r| < 1; a series' sum is the limit of its partial sums; terms tending to 0 isn't enough.
!: Using a/(1 − r) when |r| ≥ 1.
Q: What is the sum to infinity of 8 + 4 + 2 + …? | 16.
Q: Does the harmonic series converge? | No: it diverges.
SUM: Some infinite series have finite sums.
SUM: Geometric series converge when |r| < 1.
SRC: Department for Education, Mathematics AS and A level subject content: sequences and series | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Spivak M, Calculus (4th edn, Publish or Perish 2008) | textbook | 2008 | https://www.publishorperish.com/
NUM1#maths-u07-40-q1@1: Find the sum to infinity of 27 − 9 + 3 − 1 + …. | 20.25 | 0.001 |  | a = 27 and r = −1/3, so S = 27/(4/3) = 20.25.
M1#maths-u07-40-q2@1: For which r does a geometric series converge? | |r| < 1 | r > 1 | r = 1 | r < 0 | All r | The terms shrink to zero fast enough only when |r| < 1.
M3#maths-u07-40-q3@2: Why does 1 + 1/2 + 1/3 + 1/4 + … diverge although its terms tend to 0? | Its partial sums grow without bound (like ln n) | It doesn't: it converges to 2 | Its terms are negative | It's a geometric series with r = 1 | It converges to π^{2}/6 | Grouping terms shows each block of terms adds at least ½, so the sum is unbounded.

## Convergence and Divergence
S: Deciding whether an infinite series converges is a central question in analysis. Convergence tests (comparison, ratio, integral and alternating series tests) answer it without finding the sum.
O: Apply standard convergence tests
O: Distinguish absolute and conditional convergence
T: Convergent series | A series whose partial sums approach a finite limit
T: Absolute convergence | Σ |a_{n}| converges; it implies Σ a_{n} converges
H: The tests
- **Divergence test**: if a_{n} doesn't tend to 0, the series diverges. (If it does, the test is inconclusive.)
- **Comparison**: if 0 ≤ a_{n} ≤ b_{n} and Σ b_{n} converges, so does Σ a_{n}.
- **p-series**: Σ 1/n^{p} converges if and only if p > 1.
- **Ratio test**: if |a_{n+1}/a_{n}| → L, the series converges if L < 1 and diverges if L > 1 (inconclusive if L = 1).
- **Integral test**: Σ f(n) and ∫_{1}^{∞} f(x) dx converge or diverge together (f positive, decreasing).
H: Alternating series
- Σ (−1)^{n+1}/n = 1 − ½ + ⅓ − … converges (to ln 2), by the alternating series test, though Σ 1/n diverges: conditional convergence.
- Conditionally convergent series can be rearranged to sum to any value (Riemann's rearrangement theorem); absolutely convergent ones can't.
X: Does Σ_{n=1}^{∞} n/2^{n} converge?
> Ratio: (n + 1)/2^{n+1} ÷ n/2^{n} = (n + 1)/(2n)
> As n → ∞ this tends to ½
> ½ < 1, so the series converges (its sum is 2)
K: Check the divergence test first; then compare with p-series or geometric series, or use the ratio or integral test.
!: Concluding a series converges because its terms tend to zero.
Q: Does Σ 1/n^{3} converge? | Yes: it's a p-series with p = 3 > 1.
Q: What does the ratio test conclude if L = 1? | Nothing: it's inconclusive.
SUM: Convergence tests decide behaviour without summing.
SUM: Absolute convergence is the safer kind.
SRC: Spivak M, Calculus (4th edn, Publish or Perish 2008) | textbook | 2008 | https://www.publishorperish.com/
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
M1#maths-u07-41-q1@1: Which series converges? | Σ 1/n^{2} | Σ 1/n | Σ 1/√n | Σ 1 | Σ n | A p-series with p = 2 > 1 converges (to π^{2}/6).
M2#maths-u07-41-q2@2: The ratio test gives L = 3 for a series. What follows? | It diverges | It converges | It's inconclusive | It converges absolutely | It sums to 3 | L > 1 means the terms eventually grow, so the series diverges.

## Power Series
S: A power series is an infinite polynomial, Σ a_{n}(x − c)^{n}. Inside its interval of convergence it behaves like a function you can differentiate and integrate term by term.
O: Find the radius and interval of convergence of a power series
O: Differentiate and integrate power series term by term
T: Power series | Σ_{n=0}^{∞} a_{n}(x − c)^{n}, centred at c
T: Radius of convergence | R such that the series converges for |x − c| < R and diverges for |x − c| > R
H: Convergence
- Use the ratio test: Σ x^{n}/n! has ratio |x|/(n + 1) → 0 for every x, so R = ∞.
- Σ x^{n} (geometric) converges for |x| < 1: R = 1, and it equals 1/(1 − x).
- Check the endpoints separately: Σ x^{n}/n converges at x = −1 but not at x = 1, so its interval is [−1, 1).
H: Working with power series
- Differentiate or integrate term by term inside the radius.
- From 1/(1 − x) = 1 + x + x^{2} + …, substitute −x: 1/(1 + x) = 1 − x + x^{2} − …; integrate: ln(1 + x) = x − x^{2}/2 + x^{3}/3 − … for −1 < x ≤ 1.
- Power series solve differential equations and define special functions.
X: Find the radius of convergence of Σ_{n=0}^{∞} (2x)^{n}/(n + 1).
> Ratio: |2x|(n + 1)/(n + 2)
> As n → ∞ this tends to |2x|
> Converges when |2x| < 1, so R = 1/2
- A power series is continuous and infinitely differentiable inside its radius.
- Two power series that agree near c are identical, term by term (uniqueness).
K: Find R with the ratio test, check endpoints separately, and differentiate or integrate term by term inside R.
!: Assuming a power series converges at the endpoints of its interval without checking.
Q: What is the radius of convergence of Σ x^{n}/n!? | Infinite.
Q: What function is 1 + x + x^{2} + … for |x| < 1? | 1/(1 − x).
SUM: Power series are infinite polynomials.
SUM: They converge within a radius.
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
SRC: Spivak M, Calculus (4th edn, Publish or Perish 2008) | textbook | 2008 | https://www.publishorperish.com/
NUM1#maths-u07-42-q1@1: What is the radius of convergence of Σ x^{n}/3^{n}? | 3 | 0 |  | It's geometric with ratio x/3, converging when |x/3| < 1, so R = 3.
M1#maths-u07-42-q2@1: Which function has the power series x − x^{3}/3 + x^{5}/5 − …? | arctan x | sin x | ln(1 + x) | e^{−x} | tan x | Integrating 1/(1 + x^{2}) = 1 − x^{2} + x^{4} − … term by term gives arctan x.
M2#maths-u07-42-q3@2: For Σ x^{n}/n, what is the interval of convergence? | −1 ≤ x < 1 | −1 < x < 1 | −1 ≤ x ≤ 1 | x < 1 | All real x | R = 1; at x = −1 it's the alternating harmonic series (converges), at x = 1 the harmonic series (diverges).

## Taylor Series
S: A Taylor series represents a function as a power series built from its derivatives at one point. Truncating it gives Taylor polynomials, the best polynomial approximations near that point, used in physics, engineering and computing.
O: Find Taylor series and polynomials about a point
O: Use Taylor polynomials to approximate values and understand the error
T: Taylor series | f(x) = Σ f^{(n)}(a)(x − a)^{n}/n!
T: Taylor polynomial | The series truncated after the (x − a)^{n} term, an approximation of degree n
H: The formula
E: f(x) = f(a) + f′(a)(x − a) + f″(a)(x − a)^{2}/2! + f‴(a)(x − a)^{3}/3! + …
- About a = 1 for ln x: f(1) = 0, f′(1) = 1, f″(1) = −1, f‴(1) = 2, so ln x ≈ (x − 1) − (x − 1)^{2}/2 + (x − 1)^{3}/3.
- The first-order polynomial is the tangent line (linear approximation).
H: Accuracy
- Taylor's theorem bounds the remainder: the error after the degree n term is f^{(n+1)}(ξ)(x − a)^{n+1}/(n + 1)! for some ξ between a and x.
- Approximations are best near a, and improve with more terms (within the radius of convergence).
- Physics uses low-order approximations: sin θ ≈ θ for small angles gives simple harmonic motion of a pendulum.
X: Use a Taylor polynomial of degree 2 about a = 4 to estimate √4.1.
> f(x) = √x: f(4) = 2, f′(4) = 1/(2√4) = 1/4, f″(4) = −1/(4 × 4^{3/2}) = −1/32
> √x ≈ 2 + (x − 4)/4 − (x − 4)^{2}/64
> √4.1 ≈ 2 + 0.025 − 0.000156 = 2.024844 (true value 2.024846…)
K: The Taylor series uses derivatives at a; truncate it for polynomial approximations, which are most accurate near a.
!: Forgetting the factorials in the denominators.
Q: What is the first-order Taylor polynomial of f about a? | f(a) + f′(a)(x − a): the tangent line.
Q: Why is sin θ ≈ θ for small θ? | It's the first term of the Taylor (Maclaurin) series of sin.
SUM: Taylor series build functions from derivatives.
SUM: Truncations give accurate local approximations.
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
SRC: Spivak M, Calculus (4th edn, Publish or Perish 2008) | textbook | 2008 | https://www.publishorperish.com/
M1#maths-u07-43-q1@1: What is the coefficient of (x − a)^{2} in a Taylor series? | f″(a)/2 | f″(a) | 2f″(a) | f′(a)/2 | f(a)/2 | Each term is f^{(n)}(a)(x − a)^{n}/n!, so the x^{2} term has f″(a)/2! = f″(a)/2.
M2#maths-u07-43-q2@2: The linear approximation of e^{x} about x = 0 gives e^{0.1} ≈ | 1.1 | 1.0 | 1.105 | 0.9 | 1.01 | e^{x} ≈ 1 + x near 0, so e^{0.1} ≈ 1.1 (true value 1.105…).

## Maclaurin Series
S: A Maclaurin series is a Taylor series about x = 0. The Maclaurin series of e^{x}, sin x, cos x and ln(1 + x) are among the most important formulas in mathematics, and combine to give Euler's formula.
O: State and derive the standard Maclaurin series
O: Combine standard series by substitution, multiplication and differentiation
T: Maclaurin series | f(x) = Σ f^{(n)}(0) x^{n}/n!
T: Euler's formula | e^{iθ} = cos θ + i sin θ, which follows from the series
H: The standard series
E: e^{x} = 1 + x + x^{2}/2! + x^{3}/3! + … (all x)
E: sin x = x − x^{3}/3! + x^{5}/5! − …; cos x = 1 − x^{2}/2! + x^{4}/4! − … (all x)
E: ln(1 + x) = x − x^{2}/2 + x^{3}/3 − … (−1 < x ≤ 1); (1 + x)^{n} = 1 + nx + n(n − 1)x^{2}/2! + … (|x| < 1)
H: Combining series
- Substitute: e^{−x^{2}} = 1 − x^{2} + x^{4}/2 − …, which lets you integrate it term by term.
- Multiply: e^{x} sin x = x + x^{2} + x^{3}/3 + ….
- Differentiate: d/dx sin x series gives the cos x series.
- Euler's formula: substitute iθ into e^{x} and separate real and imaginary parts; with θ = π it gives e^{iπ} + 1 = 0.
- Limits: (sin x)/x = 1 − x^{2}/6 + … → 1 as x → 0.
X: Find the Maclaurin series of e^{2x} cos x up to the x^{2} term.
> e^{2x} = 1 + 2x + 2x^{2} + …; cos x = 1 − x^{2}/2 + …
> Multiply, keeping terms up to x^{2}: 1 + 2x + 2x^{2} − x^{2}/2
> = 1 + 2x + (3/2)x^{2} + …
K: Learn the series for e^{x}, sin x, cos x, ln(1 + x) and (1 + x)^{n}, with their validity, and combine them algebraically.
!: Using ln(1 + x) or (1 + x)^{n} series outside their ranges of validity.
Q: What is the Maclaurin series of cos x up to x^{4}? | 1 − x^{2}/2 + x^{4}/24.
Q: For which x is the series for ln(1 + x) valid? | −1 < x ≤ 1.
SUM: Maclaurin series expand functions about 0.
SUM: The standard series combine to give many more.
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
NUM1#maths-u07-44-q1@1: Use the first three terms of the series for e^{x} to estimate e^{0.2}, to 3 decimal places. | 1.22 | 0.0005 |  | 1 + 0.2 + 0.04/2 = 1.22 (true value 1.2214…).
M1#maths-u07-44-q2@1: What is the coefficient of x^{3} in the Maclaurin series of sin x? | −1/6 | 1/6 | 1/3 | −1/3 | 0 | sin x = x − x^{3}/3! + x^{5}/5! − …, and 3! = 6, so the coefficient is −1/6.
M3#maths-u07-44-q3@2: What is the Maclaurin series of e^{−x^{2}} up to x^{4}? | 1 − x^{2} + x^{4}/2 | 1 − x^{2} + x^{4} | 1 + x^{2} + x^{4}/2 | 1 − 2x + 2x^{2} | 1 − x^{2}/2 + x^{4}/24 | Substitute −x^{2} into e^{u} = 1 + u + u^{2}/2: 1 − x^{2} + x^{4}/2.
`;
