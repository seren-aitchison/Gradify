// School 7: Calculus. Format: kit/course/notes.js. Standard: docs/CURRICULUM_CONTENT_STANDARD.md
// Single-variable calculus from limits to series: A level, Further Maths and first-year university.
export default `
## Precalculus
S: Precalculus is the toolkit you need before calculus: functions and their graphs, algebraic manipulation, exponentials, logarithms and trigonometry. Most errors in calculus are really precalculus errors, so these skills repay practice.
O: Identify the precalculus skills that calculus relies on
O: Rewrite expressions in forms ready for differentiation and integration
LV: GCSE and A level · Fluency
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
!: Splitting a fraction whose denominator has several terms: (x + 1)/(x^{2} + x) can't be split term by term. Factorise first: (x + 1)/(x(x + 1)) = 1/x = x^{−1}.
K: Calculus rests on algebra, indices, functions, logs and radian trigonometry; rewrite expressions as sums of powers first.
!: Using degrees in calculus: d/dx (sin x) = cos x only when x is in radians.
Q: Write 4/√x in index form. | 4x^{−1/2}.
Q: Why must trigonometric calculus use radians? | The derivative formulas (such as d/dx sin x = cos x) only hold in radians.
SUM: Calculus builds on precalculus skills.
SUM: Index form makes differentiation and integration routine.
EV: established | Differentiation and integration rules act on powers of x, so expressions must first be written as sums of terms in index form.
SRC: Department for Education, Mathematics AS and A level subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | secondary | 2020 | https://www.cengage.co.uk/
M1#maths-u07-01-q1@1: Which is 5/x^{3} in index form? | 5x^{−3} | 5x^{3} | x^{−15} | 5^{−3}x | (5x)^{−3} | Dividing by x^{3} is multiplying by x^{−3}, and the 5 stays as a coefficient.
M2#maths-u07-01-q2@2: Which is (x^{2} + 3)/√x in index form? | x^{3/2} + 3x^{−1/2} | x^{2} + 3x^{−1/2} | x^{3/2} + 3 | x + 3x^{1/2} | x^{5/2} + 3x^{−1/2} | x^{2}/x^{1/2} = x^{3/2} and 3/x^{1/2} = 3x^{−1/2}: divide each term separately.
NUM2#maths-u07-01-q3@2: Write (6x^{4} + 2x)/(2√x) as a sum of powers of x. What is the larger power? | 3.5 | 0.001 |  | 6x^{4}/(2x^{1/2}) = 3x^{7/2} and 2x/(2x^{1/2}) = x^{1/2}, so the larger power is 7/2 = 3.5.
M3#maths-u07-01-q4@2: Which is (√x + 1)^{2}/x in index form? | 1 + 2x^{−1/2} + x^{−1} | 1 + 2x^{1/2} + x^{−1} | 1 + x^{−1} | x^{−1/2} + 1 + x^{−1} | 1 + 2x^{−1/2} + x | Expand first: (√x + 1)^{2} = x + 2x^{1/2} + 1. Dividing each term by x gives 1 + 2x^{−1/2} + x^{−1}; squaring term by term would miss the middle term.
SA3#maths-u07-01-q5@1,2: Explain how you would prepare y = (x^{3} − 2√x)/x^{2} for differentiation, then differentiate it. | Split the single-term denominator: y = x^{3}/x^{2} − 2x^{1/2}/x^{2} = x − 2x^{−3/2}. Each term is now a power of x, so the power rule gives dy/dx = 1 + 3x^{−5/2}. Writing roots as fractional powers and subtracting indices correctly is the precalculus step; an index slip here makes the derivative wrong however well the rule is applied. | Splits the fraction into separate terms ; Writes √x as x^{1/2} ; Subtracts indices to get x − 2x^{−3/2} ; Applies the power rule to get 1 + 3x^{−5/2} ; Explains why index form is needed

## Infinitesimal Calculus
S: Calculus began with the idea of infinitely small changes, the "infinitesimals" of Newton and Leibniz in the 17th century. Their methods worked brilliantly, but it took until the 19th century to put them on a rigorous footing with limits.
O: Describe the historical development of calculus
O: Explain the ideas of a derivative and an integral informally
LV: A level · Fluency
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
P: The ring argument is the integral A = ∫_{0}^{r} 2πx dx. Differentiating the area πr^{2} with respect to r gives the circumference 2πr: an early glimpse of the fundamental theorem.
K: Differentiation finds rates, integration finds accumulations, and they're inverses; limits made the infinitesimal ideas rigorous.
!: Treating dy/dx as an ordinary fraction in every situation: it's a limit, though it often behaves like a fraction.
Q: Who independently invented calculus? | Isaac Newton and Gottfried Leibniz.
Q: What does integration measure? | Accumulation, such as area under a curve or total distance.
SUM: Calculus studies change and accumulation.
SUM: Limits gave calculus its rigorous foundation.
EV: established | Newton and Leibniz developed calculus independently in the late 17th century, and Cauchy and Weierstrass later grounded it in limits.
SRC: Boyer CB, The History of the Calculus and Its Conceptual Development (Dover 1959) | secondary | 1959 | https://store.doverpublications.com/
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | secondary | 2020 | https://www.cengage.co.uk/
M1#maths-u07-02-q1@1: Whose notation, dy/dx and ∫, do we use today? | Leibniz | Newton | Euler | Archimedes | Cauchy | Leibniz introduced dy/dx and the integral sign; Newton used dots and "fluxions".
M2#maths-u07-02-q2@2: What made calculus rigorous in the 19th century? | The precise definition of a limit | The invention of computers | Euclid's axioms | Decimal notation | The discovery of π | Cauchy and Weierstrass defined limits precisely, replacing vague infinitesimals.
NUM2#maths-u07-02-q3@2: Using thin rings, the area of a disc of radius r is ∫_{0}^{r} 2πx dx. Evaluate it for r = 3, to 2 decimal places. | 28.27 | 0.01 |  | The integral is [πx^{2}] from 0 to 3 = 9π ≈ 28.27, matching the formula πr^{2}.
M3#maths-u07-02-q4@1,2: Why was Bishop Berkeley's 1734 criticism of the early calculus fair? | It divided by a small increment and then set the increment to zero | Its results for areas and tangents were often numerically wrong | Newton and Leibniz refused to publish their methods | It contradicted the theorems of Euclidean geometry | It relied on decimal approximations to π | The method treated the increment as non-zero (to divide by it) and then as zero (to discard it); limits removed that inconsistency.
SA3#maths-u07-02-q5@1,2: Outline how calculus developed from Archimedes to Weierstrass, and explain why the limit concept was needed. | Archimedes found areas by exhaustion; Fermat and Barrow found tangents; Newton and Leibniz independently built a general calculus of derivatives and integrals, linked as inverse processes, using infinitesimals. Berkeley showed that infinitesimals were used inconsistently. Cauchy and Weierstrass defined limits precisely (ε–δ), so derivatives and integrals became limits of ordinary quantities and the results were rigorous. | Mentions Archimedes' method of exhaustion ; Credits Newton and Leibniz independently ; Explains differentiation and integration as inverse ; Explains the inconsistency in infinitesimals ; Says Cauchy and Weierstrass made it rigorous with limits

## Limits
S: A limit describes the value a function approaches as its input approaches some value. Limits underpin every idea in calculus: derivatives, integrals, continuity and infinite series are all defined by them.
O: Evaluate limits by substitution, factorising and standard results
O: Interpret one-sided limits and limits at infinity
LV: A level · Application
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
P: **Investigate with the lab.** Shrink h towards 0 from both sides and watch the secant gradient approach a single value. Then try |x| at x = 0, where the two sides disagree.
IX: tangent
K: Substitute if possible; for 0/0 factorise, rationalise or use standard limits; compare left and right limits.
!: Concluding that a 0/0 limit is 0, 1 or undefined without further work.
Q: What is lim_{x→1} (x^{2} − 1)/(x − 1)? | 2.
Q: When does lim_{x→a} f(x) exist? | When the left and right limits exist and are equal.
SUM: Limits describe approaching behaviour.
SUM: Indeterminate forms need algebraic work.
EV: established | Derivatives, integrals and the sums of infinite series are all defined as limits.
SRC: Spivak M, Calculus (4th edn, Publish or Perish 2008) | secondary | 2008 | https://www.publishorperish.com/
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | secondary | 2020 | https://www.cengage.co.uk/
NUM1#maths-u07-03-q1@1: Find lim_{x→2} (x^{3} − 8)/(x − 2). | 12 | 0 |  | x^{3} − 8 = (x − 2)(x^{2} + 2x + 4), so the limit is 4 + 4 + 4 = 12.
M1#maths-u07-03-q2@1: What is lim_{x→∞} (5x + 2)/(2x − 1)? | 5/2 | 0 | ∞ | −2 | 5 | Divide top and bottom by x: (5 + 2/x)/(2 − 1/x) → 5/2.
M3#maths-u07-03-q3@2: What is lim_{x→0} (sin 3x)/x? | 3 | 1 | 0 | 1/3 | It doesn't exist | (sin 3x)/x = 3 × (sin 3x)/(3x), and (sin u)/u → 1 as u → 0.
M2#maths-u07-03-q4@2: For f(x) = |x| at x = 0, what do the secant gradients from the right and left approach? | +1 from the right and −1 from the left, so the limit doesn't exist | 0 from both sides, since the graph touches the axis there | +1 from both sides, since |x| = x near 0 | Both grow without bound, since the corner is infinitely steep | −1 from the right and +1 from the left, so the limit is 0 | The one-sided limits differ, so the difference quotient has no limit at 0.
SA3#maths-u07-03-q5@1,2: Find lim_{x→0} (√(1 + x) − 1)/x, explaining each step and why direct substitution fails. | Substituting x = 0 gives 0/0, an indeterminate form, so more work is needed. Multiply top and bottom by the conjugate √(1 + x) + 1: the numerator becomes (1 + x) − 1 = x, so the expression is 1/(√(1 + x) + 1) for x ≠ 0. This is continuous at 0, so the limit is 1/(1 + 1) = 1/2. | Identifies the 0/0 indeterminate form ; Multiplies by the conjugate ; Simplifies to 1/(√(1 + x) + 1) ; Cancels only for x ≠ 0 ; Gets the limit 1/2

## Continuity
S: A function is continuous at a point if its graph has no break there: you could draw it without lifting your pen. Continuity is what lets us find roots by sign changes and guarantees that many calculus theorems apply.
O: Test whether a function is continuous at a point
O: Apply the intermediate value theorem to locate roots
LV: A level · Application
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
P: Continuity on an interval means continuity at every point of it. At an endpoint only the one-sided limit is needed, so √x is continuous on [0, ∞).
K: Continuous means the limit equals the value; a sign change of a continuous function guarantees a root.
!: Using a sign change to claim a root when the function has an asymptote in the interval.
Q: Is f(x) = 1/(x − 2) continuous at x = 2? | No: it isn't defined there (an infinite discontinuity).
Q: What does the intermediate value theorem need? | A function continuous on a closed interval.
SUM: Continuity means no breaks.
SUM: Sign changes locate roots of continuous functions.
EV: established | The intermediate value theorem guarantees a root wherever a continuous function changes sign on a closed interval.
SRC: Spivak M, Calculus (4th edn, Publish or Perish 2008) | secondary | 2008 | https://www.publishorperish.com/
SRC: Department for Education, Mathematics AS and A level subject content: numerical methods | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
M1#maths-u07-04-q1@1: Which function is continuous for all real x? | sin x + x^{2} | 1/x | ln x | tan x | 1/(x^{2} − 1) | Sums of continuous functions are continuous, and sin x and x^{2} are both continuous everywhere.
M2#maths-u07-04-q2@2: f(x) = x^{2} + k for x < 1 and 3x for x ≥ 1 is continuous. What is k? | 2 | 3 | 1 | 0 | 4 | At x = 1 the pieces must agree: 1 + k = 3, so k = 2.
NUM2#maths-u07-04-q3@1: f(x) = (x^{2} − 9)/(x − 3) for x ≠ 3 and f(3) = k. What value of k makes f continuous at x = 3? | 6 | 0 |  | For x ≠ 3, f(x) = x + 3, which tends to 6; continuity needs f(3) to equal this limit, so k = 6.
NUM3#maths-u07-04-q4@2: Evaluating f(x) = x^{3} − 4x + 1 at the integers from −3 to 3, how many roots does the intermediate value theorem guarantee? | 3 | 0 |  | The values are −14, 1, 4, 1, −2, 1, 16: signs change on (−3, −2), (0, 1) and (1, 2), so there are at least three roots, and a cubic has at most three.
SA3#maths-u07-04-q5@2: Explain why a sign change of f(x) = 1/(x − 1.5) between x = 1 and x = 2 does not show a root, and state what the intermediate value theorem needs. | f(1) = −2 and f(2) = 2, so the sign changes, but f has a vertical asymptote at x = 1.5 and is not defined or continuous there; the sign changes by jumping through infinity, and 1/(x − 1.5) is never zero. The theorem needs f to be continuous on the whole closed interval [a, b]. | Computes f(1) = −2 and f(2) = 2 ; Identifies the asymptote at x = 1.5 ; Notes that f is never zero ; States the continuity condition on [a, b]

## Differentiability
S: A function is differentiable at a point if it has a well-defined tangent there: a single slope. Differentiable functions are smooth; corners, cusps, jumps and vertical tangents break differentiability.
O: Decide whether a function is differentiable at a point
O: Explain the relationship between continuity and differentiability
LV: Year 1 · Application
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
P: **Investigate with the lab.** Choose |x| and set the point to 0. Shrink h with positive and negative values and see the secant gradients refuse to agree.
IX: tangent
K: Differentiable means a unique tangent slope; corners, jumps and vertical tangents fail; differentiable implies continuous, not conversely.
!: Assuming that a continuous function must be differentiable.
Q: Is |x − 3| differentiable at x = 3? | No: it has a corner there.
Q: Does differentiability imply continuity? | Yes.
SUM: Differentiable functions are smooth.
SUM: Continuity is necessary but not sufficient.
EV: established | Differentiability at a point implies continuity there, but continuity does not imply differentiability.
SRC: Spivak M, Calculus (4th edn, Publish or Perish 2008) | secondary | 2008 | https://www.publishorperish.com/
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | secondary | 2020 | https://www.cengage.co.uk/
M1#maths-u07-05-q1@1: Where is f(x) = |x + 2| not differentiable? | At x = −2 | At x = 0 | At x = 2 | Nowhere | Everywhere | The graph has a corner where x + 2 = 0, so the slope jumps from −1 to 1.
M2#maths-u07-05-q2@2: Which statement about continuity and differentiability is true? | Every differentiable function is continuous | Every continuous function is differentiable | |x| is differentiable at 0 | A jump discontinuity can still be differentiable | ∛x has derivative 0 at x = 0 | Differentiability at a point forces continuity there; the converse fails, as |x| shows.
M2#maths-u07-05-q3@2: Why is |x| continuous but not differentiable at 0? | Its graph has no gap, but the gradient jumps from −1 to +1 at a corner | Its graph has a gap at 0, so neither property holds | Its gradient is infinite at 0, like a vertical tangent | It isn't defined at 0, so it can't be differentiated | It is differentiable at 0, with derivative 0 there | Continuity needs no break; differentiability needs a single tangent, which a corner lacks.
NUM3#maths-u07-05-q4@1: f(x) = x^{2} + 1 for x ≤ 2 and ax + b for x > 2 is differentiable at x = 2. Find b. | -3 | 0 |  | The slopes must match: a = 2 × 2 = 4. The values must match: 5 = 2a + b = 8 + b, so b = −3.
SA2#maths-u07-05-q5@2: Explain, with an example of each, the difference between a function that is continuous but not differentiable at a point and one that is neither. | |x| at 0 is continuous (no break, the limit equals the value 0) but not differentiable, because the gradient is −1 on the left and +1 on the right. A step function with a jump at 0 is not continuous there, and so cannot be differentiable, because differentiability implies continuity. | Gives a valid corner example such as |x| ; Explains the unequal one-sided gradients ; Gives a valid jump example ; States that differentiable implies continuous

## Differential Calculus
S: Differential calculus studies how quantities change. The derivative measures the instantaneous rate of change of a function, which is the gradient of its graph at a point.
O: Interpret the derivative as a gradient and a rate of change
O: Estimate gradients using chords
LV: GCSE and A level · Fluency
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
P: **Investigate with the lab.** Try three different functions and, for each, find where the secant and tangent gradients agree to two decimal places.
IX: tangent
K: The derivative is the limit of chord gradients: the tangent's slope and the instantaneous rate of change.
!: Confusing the value of a function with its rate of change: y can be large while dy/dx is small.
Q: What does dy/dx = 0 mean graphically? | The tangent is horizontal: a stationary point.
Q: If s is displacement and t is time, what is ds/dt? | Velocity.
SUM: The derivative measures instantaneous rate of change.
SUM: Chord gradients approach it as h → 0.
EV: established | The derivative is the limit of chord gradients and measures the instantaneous rate of change.
SRC: Department for Education, Mathematics AS and A level subject content: differentiation | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | secondary | 2020 | https://www.cengage.co.uk/
NUM1#maths-u07-06-q1@1: Find the gradient of the chord of y = x^{3} from x = 1 to x = 2. | 7 | 0 |  | (8 − 1)/(2 − 1) = 7. (The tangent gradients at the ends are 3 and 12.)
M1#maths-u07-06-q2@1: What does a negative derivative tell you about a function? | It's decreasing at that point | It's negative at that point | It has a maximum | It's increasing | It's zero | The derivative is the gradient: negative gradient means the function is going down.
M2#maths-u07-06-q3@2: A chord of y = f(x) from x = 2 to x = 2 + h has gradient 5 + 3h. What is f′(2)? | 5 | 8 | 3 | 5 + 3h | 0 | The derivative is the limit as h → 0: 5 + 3h → 5.
M2#maths-u07-06-q4@2: What does the derivative measure at a point? | The instantaneous rate of change: the limit of secant gradients as h → 0 | The area under the curve up to that point | The average value of the function over an interval | The value of the function itself at the point | The distance from the point to the x-axis | The derivative is defined as the limit of the difference quotient.
NUM2#maths-u07-06-q5@2: Estimate the gradient of y = x^{3} at x = 2 using a chord with h = 0.1. | 12.61 | 0.001 |  | (2.1^{3} − 8)/0.1 = (9.261 − 8)/0.1 = 12.61, close to the exact gradient 3x^{2} = 12.
SA3#maths-u07-06-q6@1,2: A car's displacement is s = t^{2} metres after t seconds. Explain how chord gradients from t = 3 lead to its velocity at t = 3, and interpret the answer. | The chord from t = 3 to t = 3 + h has gradient ((3 + h)^{2} − 9)/h = (6h + h^{2})/h = 6 + h, the average velocity over that interval. As h → 0 this tends to 6, so the instantaneous velocity at t = 3 is 6 m/s: the gradient of the tangent to the s–t graph there. | Writes the chord gradient as a difference quotient ; Simplifies to 6 + h ; Takes the limit h → 0 ; Gives 6 m/s with units ; Interprets as the tangent gradient or instantaneous velocity

## Derivatives
S: A derivative is defined as the limit of the gradient of a chord, and computed in practice with rules. Differentiating from first principles shows where the rules come from.
O: Differentiate simple functions from first principles
O: State the derivatives of standard functions
LV: A level · Fluency
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
P: **Investigate with the lab.** Choose Differentiation (A level) and differentiate each expression term by term. Compare with the tangent lab: the derivative is the gradient you watched the secant approach.
IX: practice
P: **Investigate with the lab.** Shrink h below 0.01 and record the secant gradient. Compare it with the derivative formula's value at the same point.
IX: tangent
K: f′(x) = lim (f(x + h) − f(x))/h; in practice use the power rule and the standard derivatives.
!: Differentiating x^{n} as x^{n−1} (forgetting to multiply by n).
Q: Differentiate 4x^{5}. | 20x^{4}.
Q: What is the derivative of cos x? | −sin x.
SUM: Derivatives come from a limit.
SUM: Standard results make differentiation fast.
EV: established | Differentiating from first principles gives d/dx (x^{n}) = nx^{n−1}, the basis of the standard rules.
SRC: Department for Education, Mathematics AS and A level subject content: differentiation | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Spivak M, Calculus (4th edn, Publish or Perish 2008) | secondary | 2008 | https://www.publishorperish.com/
M1#maths-u07-07-q1@1: What is d/dx (6x^{3} − 2x + 9)? | 18x^{2} − 2 | 18x^{2} − 2x | 6x^{2} − 2 | 18x^{3} − 2 | 2x^{2} − 2 + 9 | Multiply by the power and reduce it by one; the constant 9 differentiates to 0.
M2#maths-u07-07-q2@2: What is d/dx (4/x)? | −4/x^{2} | 4 | 4/x^{2} | −4x | 4 ln x | 4/x = 4x^{−1}, which differentiates to −4x^{−2}.
NUM1#maths-u07-07-q3@1: Differentiate 4x^{3} − 2x and evaluate at x = 1. | 10 | 0 |  | The derivative is 12x^{2} − 2, which is 10 at x = 1.
NUM1#maths-u07-07-q4@1: For f(x) = x^{2} at x = 3 with h = 0.01, what is the secant gradient (f(3 + h) − f(3))/h? | 6.01 | 0.0001 |  | (9.0601 − 9)/0.01 = 6.01, approaching the derivative 6.
NUM2#maths-u07-07-q5@2: For f(x) = 6√x + 2 ln x, find f′(4). | 2 | 0 |  | f′(x) = 3x^{−1/2} + 2/x, so f′(4) = 3/2 + 1/2 = 2.
SA3#maths-u07-07-q6@1: Differentiate f(x) = 2x^{3} from first principles, showing each step. | f(x + h) − f(x) = 2(x + h)^{3} − 2x^{3} = 6x^{2}h + 6xh^{2} + 2h^{3}. Dividing by h gives 6x^{2} + 6xh + 2h^{2}. As h → 0 the terms in h vanish, so f′(x) = 6x^{2}. | Writes the difference quotient (f(x + h) − f(x))/h ; Expands (x + h)^{3} correctly ; Divides by h ; Takes the limit h → 0 ; Gets 6x^{2}

## First Derivatives
S: The first derivative f′(x) tells you the gradient of a curve everywhere: where it rises, falls and levels off. It finds tangents and normals, and stationary points where the gradient is zero.
O: Use the first derivative to find gradients, tangents and normals
O: Determine where a function is increasing or decreasing
LV: A level · Fluency
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
P: **Investigate with the lab.** Find a point where the tangent is horizontal (the lab's challenge) and check it's where the first derivative is zero.
IX: tangent
K: Tangent: gradient f′(a) through (a, f(a)); normal: gradient −1/f′(a); the sign of f′ shows increasing or decreasing.
!: Using the y-value instead of the gradient in the tangent equation.
Q: What is the gradient of the normal if the tangent's gradient is 4? | −1/4.
Q: Where is f(x) = x^{2} − 6x increasing? | For x > 3.
SUM: f′ gives tangents, normals and monotonicity.
SUM: Normals are perpendicular to tangents.
EV: established | The tangent at x = a has gradient f′(a), the normal has gradient −1/f′(a), and the sign of f′ shows where a function increases or decreases.
SRC: Department for Education, Mathematics AS and A level subject content: differentiation | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | secondary | 2020 | https://www.cengage.co.uk/
NUM1#maths-u07-08-q1@1: Find the gradient of y = x^{3} − 4x^{2} + 2 at x = 3. | 3 | 0 |  | dy/dx = 3x^{2} − 8x = 27 − 24 = 3.
M1#maths-u07-08-q2@1: What is the tangent to y = x^{2} at (3, 9)? | y = 6x − 9 | y = 6x + 9 | y = 2x + 3 | y = 9x − 18 | y = 3x | The gradient is 2x = 6, so y − 9 = 6(x − 3), giving y = 6x − 9.
M2#maths-u07-08-q3@2: For which x is f(x) = 2x^{3} − 6x decreasing? | −1 < x < 1 | x > 1 | x < −1 | x > 0 | All x | f′(x) = 6x^{2} − 6 = 6(x − 1)(x + 1) is negative between −1 and 1.
NUM1#maths-u07-08-q4@1: Where is the tangent to y = x^{2} − 6x horizontal (give x)? | 3 | 0 |  | dy/dx = 2x − 6 = 0 at x = 3.
NUM3#maths-u07-08-q5@1: The normal to y = x^{2} at (1, 1) meets the curve again. Find the x-coordinate of the second intersection. | -1.5 | 0.001 |  | The normal has gradient −1/2: y = −x/2 + 3/2. Setting x^{2} = −x/2 + 3/2 gives 2x^{2} + x − 3 = (2x + 3)(x − 1) = 0, so x = −1.5.
SA3#maths-u07-08-q6@2: Find where f(x) = x^{3} − 12x + 5 is increasing and where it is decreasing, explaining your method. | Differentiate: f′(x) = 3x^{2} − 12 = 3(x − 2)(x + 2). f is increasing where f′(x) > 0, which is x < −2 or x > 2, and decreasing where f′(x) < 0, which is −2 < x < 2. At x = ±2 the gradient is zero (stationary points). | Differentiates correctly ; Factorises f′(x) ; Uses f′ > 0 for increasing and f′ < 0 for decreasing ; States x < −2 or x > 2 increasing ; States −2 < x < 2 decreasing

## Higher-Order Derivatives
S: Differentiating a derivative gives the second derivative, and so on. The second derivative measures how the gradient changes: acceleration for motion, and concavity for graphs.
O: Find second and higher derivatives
O: Interpret the second derivative physically and graphically
LV: A level · Fluency
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
P: Patterns give any derivative directly: the nth derivative of e^{kx} is k^{n}e^{kx}, and differentiating x^{m} n times gives m(m − 1)…(m − n + 1)x^{m−n}.
K: Differentiate repeatedly; f″ is the rate of change of the gradient: acceleration, or concavity.
!: Confusing f″(x) with (f′(x))^{2}.
Q: What is the second derivative of x^{5}? | 20x^{3}.
Q: What is d^{2}s/dt^{2} for motion? | Acceleration.
SUM: Higher derivatives differentiate repeatedly.
SUM: The second derivative measures changing gradient.
EV: established | The second derivative measures how the gradient changes: acceleration in motion and concavity on a graph.
SRC: Department for Education, Mathematics AS and A level subject content: differentiation | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | secondary | 2020 | https://www.cengage.co.uk/
NUM1#maths-u07-09-q1@1: f(x) = 2x^{4} − x^{3}. Find f″(1). | 18 | 0 |  | f′(x) = 8x^{3} − 3x^{2}, f″(x) = 24x^{2} − 6x, so f″(1) = 18.
M1#maths-u07-09-q2@1: What is the 4th derivative of sin x? | sin x | cos x | −sin x | −cos x | 0 | Derivatives of sin x cycle cos x, −sin x, −cos x, sin x, so the 4th returns to sin x.
M2#maths-u07-09-q3@2: What is d^{2}/dx^{2} (e^{3x})? | 9e^{3x} | 3e^{3x} | e^{3x} | 6e^{3x} | e^{9x} | Each differentiation multiplies by 3, so twice gives 9e^{3x}.
NUM3#maths-u07-09-q4@2: A particle has displacement s = t^{3} − 6t^{2} + 9t metres. Find its acceleration, in m s^{−2}, when its velocity is zero for the second time. | 6 | 0 | m s^{−2} | v = 3(t − 1)(t − 3) is zero at t = 1 and t = 3. The acceleration a = 6t − 12 is 6 m s^{−2} at t = 3.
SA2#maths-u07-09-q5@2: At a point, f′(x) > 0 and f″(x) < 0. Describe the graph there and give an interpretation for motion, where f is displacement. | The function is increasing (positive gradient) but the gradient is decreasing, so the graph is concave down: rising and levelling off. For motion, the velocity is positive (moving forwards) and the acceleration is negative, so the object is moving forwards but slowing down. | Increasing because f′ > 0 ; Gradient decreasing because f″ < 0 ; Concave down ; Positive velocity with negative acceleration ; Moving forwards but slowing

## Chain Rule
S: The chain rule differentiates composite functions, functions of functions like (3x + 1)^{5} or e^{sin x}. Multiply the derivative of the outer function by the derivative of the inner one.
O: Differentiate composite functions with the chain rule
O: Recognise the inner and outer functions in an expression
LV: A level · Application
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
EV: established | The derivative of a composite function is the outer derivative, evaluated at the inner function, times the inner derivative.
SRC: Department for Education, Mathematics AS and A level subject content: differentiation | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | secondary | 2020 | https://www.cengage.co.uk/
M1#maths-u07-10-q1@1: What is d/dx (e^{4x})? | 4e^{4x} | e^{4x} | 4xe^{4x−1} | e^{4} | 4e^{x} | The inner function 4x has derivative 4, which multiplies e^{4x}.
M2#maths-u07-10-q2@2: What is d/dx sin(x^{2})? | 2x cos(x^{2}) | cos(x^{2}) | 2x cos(2x) | −2x cos(x^{2}) | 2 cos(x) | Outer cos(x^{2}) times inner derivative 2x.
M3#maths-u07-10-q3@2: What is d/dx (1/(2x + 3)^{2})? | −4/(2x + 3)^{3} | −2/(2x + 3)^{3} | 1/(2(2x + 3)) | −4/(2x + 3)^{2} | 4/(2x + 3)^{3} | (2x + 3)^{−2} gives −2(2x + 3)^{−3} × 2 = −4(2x + 3)^{−3}.
NUM2#maths-u07-10-q4@1: Differentiate y = (x^{2} + 1)^{3} and evaluate dy/dx at x = 1. | 24 | 0 |  | dy/dx = 3(x^{2} + 1)^{2} × 2x; at x = 1 this is 3 × 4 × 2 = 24.
SA3#maths-u07-10-q5@1,2: Differentiate y = e^{sin 2x}, naming each layer of the composite function. | There are three layers: the outer function e^{u}, the middle u = sin v and the inner v = 2x. Differentiate from the outside in: e^{sin 2x} × cos 2x × 2, so dy/dx = 2cos(2x)e^{sin 2x}. | Identifies e^{u} as the outer function ; Identifies sin and 2x as further layers ; Keeps the inside unchanged when differentiating each layer ; Multiplies by cos 2x and by 2 ; Gets 2cos(2x)e^{sin 2x}

## Product Rule
S: The product rule differentiates a product of two functions. The derivative of uv isn't u′v′: it's u′v + uv′.
O: Differentiate products using the product rule
O: Combine the product rule with the chain rule
LV: A level · Application
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
EV: established | The derivative of a product uv is u′v + uv′, not u′v′.
SRC: Department for Education, Mathematics AS and A level subject content: differentiation | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | secondary | 2020 | https://www.cengage.co.uk/
M1#maths-u07-11-q1@1: What is d/dx (x ln x)? | ln x + 1 | 1/x | ln x | x/x | 1 | u = x and v = ln x: 1 × ln x + x × 1/x = ln x + 1.
M2#maths-u07-11-q2@2: What is d/dx (x^{3}e^{2x})? | x^{2}e^{2x}(3 + 2x) | 3x^{2}e^{2x} | 6x^{2}e^{2x} | x^{3}e^{2x}(3 + 2x) | 3x^{2} + 2e^{2x} | 3x^{2}e^{2x} + 2x^{3}e^{2x} = x^{2}e^{2x}(3 + 2x).
NUM2#maths-u07-11-q3@1: Differentiate y = x^{2} ln x and evaluate dy/dx at x = e, to 3 decimal places. | 8.155 | 0.01 |  | dy/dx = 2x ln x + x; at x = e this is 2e + e = 3e ≈ 8.155.
M3#maths-u07-11-q4@2: What are the x-coordinates of the stationary points of y = x(x − 3)^{4}? | x = 3 and x = 0.6 | x = 3 only | x = 0 and x = 3 | x = 0.6 only | x = −3 and x = 0.6 | dy/dx = (x − 3)^{4} + 4x(x − 3)^{3} = (x − 3)^{3}(5x − 3), which is zero at x = 3 and x = 3/5.
SA3#maths-u07-11-q5@1,2: Differentiate y = x^{2}(3x − 1)^{5}, factorising your answer, and explain why (uv)′ is not u′v′. | With u = x^{2} and v = (3x − 1)^{5}: u′ = 2x and, by the chain rule, v′ = 15(3x − 1)^{4}. So dy/dx = 2x(3x − 1)^{5} + 15x^{2}(3x − 1)^{4} = x(3x − 1)^{4}(21x − 2). u′v′ fails: for x^{2} × x^{3} = x^{5} it gives 6x^{3}, but the derivative is 5x^{4}. | Identifies u and v ; Uses the chain rule for v′ ; Applies u′v + uv′ ; Factorises to x(3x − 1)^{4}(21x − 2) ; Gives a counterexample to u′v′

## Quotient Rule
S: The quotient rule differentiates one function divided by another. It's a combination of the product and chain rules, and it's needed for functions like tan x and rational functions.
O: Differentiate quotients using the quotient rule
O: Derive the derivative of tan x
LV: A level · Application
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
EV: established | The derivative of u/v is (vu′ − uv′)/v^{2}, from which d/dx tan x = sec^{2} x follows.
SRC: Department for Education, Mathematics AS and A level subject content: differentiation | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | secondary | 2020 | https://www.cengage.co.uk/
M1#maths-u07-12-q1@1: What is d/dx (1/x^{2}) by any method? | −2/x^{3} | −2/x | 2/x^{3} | −1/x^{3} | 1/(2x) | x^{−2} differentiates to −2x^{−3}; the quotient rule gives the same answer.
M2#maths-u07-12-q2@2: What is d/dx ((x − 1)/(x + 1))? | 2/(x + 1)^{2} | −2/(x + 1)^{2} | 1 | 2x/(x + 1)^{2} | 0 | ((x + 1) − (x − 1))/(x + 1)^{2} = 2/(x + 1)^{2}.
NUM2#maths-u07-12-q3@1: For f(x) = 3x/(x^{2} + 1), find f′(2). | -0.36 | 0.001 |  | f′(x) = (3(x^{2} + 1) − 3x × 2x)/(x^{2} + 1)^{2} = (3 − 3x^{2})/(x^{2} + 1)^{2}, so f′(2) = −9/25 = −0.36.
M3#maths-u07-12-q4@1: What is d/dx ((ln x)/x)? | (1 − ln x)/x^{2} | (ln x − 1)/x^{2} | (1 + ln x)/x^{2} | (1 − ln x)/x | 1/x^{2} | With u = ln x and v = x: (x × 1/x − ln x × 1)/x^{2} = (1 − ln x)/x^{2}; reversing the numerator flips the sign.
SA3#maths-u07-12-q5@2: Use the quotient rule to show that d/dx tan x = sec^{2} x, and hence find d/dx cot x. | tan x = sin x/cos x, so d/dx tan x = (cos x × cos x − sin x × (−sin x))/cos^{2} x = (cos^{2} x + sin^{2} x)/cos^{2} x = 1/cos^{2} x = sec^{2} x. Similarly cot x = cos x/sin x gives (sin x × (−sin x) − cos x × cos x)/sin^{2} x = −1/sin^{2} x = −cosec^{2} x. | Writes tan x as sin x/cos x ; Applies the quotient rule in the right order ; Uses sin^{2} x + cos^{2} x = 1 ; Gets sec^{2} x ; Gets −cosec^{2} x for cot x

## Implicit Differentiation
S: Implicit differentiation finds dy/dx when y isn't the subject, as on the circle x^{2} + y^{2} = 25. Differentiate every term with respect to x, using the chain rule on terms in y, then solve for dy/dx.
O: Differentiate implicit equations
O: Find tangents to implicitly defined curves
LV: A level · Application
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
EV: established | Differentiating an equation term by term, with the chain rule giving dy/dx on each term in y, finds gradients without rearranging.
SRC: Department for Education, Mathematics AS and A level subject content: differentiation | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | secondary | 2020 | https://www.cengage.co.uk/
M1#maths-u07-13-q1@1: For x^{2} + y^{2} = 13, what is dy/dx at (2, 3)? | −2/3 | 2/3 | −3/2 | 3/2 | 0 | Differentiating gives 2x + 2y dy/dx = 0, so dy/dx = −x/y = −2/3 at (2, 3).
M2#maths-u07-13-q2@2: What is dy/dx for y^{2} = 4x? | 2/y | 4 | 2y | 4/y^{2} | y/2 | Differentiating y^{2} implicitly gives 2y dy/dx = 4, so dy/dx = 2/y.
NUM2#maths-u07-13-q3@2: Find the gradient of the curve x^{3} + y^{3} = 9 at the point (1, 2). | -0.25 | 0.001 |  | 3x^{2} + 3y^{2} dy/dx = 0, so dy/dx = −x^{2}/y^{2} = −1/4 at (1, 2).
NUM3#maths-u07-13-q4@2: The tangent to x^{2} + y^{2} = 25 at (3, 4) meets the x-axis at (k, 0). Find k to 2 decimal places. | 8.33 | 0.01 |  | dy/dx = −x/y = −3/4, so the tangent is y − 4 = −3/4(x − 3). Setting y = 0 gives x − 3 = 16/3, so k = 25/3 ≈ 8.33.
SA3#maths-u07-13-q5@1,2: Show by implicit differentiation that d/dx (arcsin x) = 1/√(1 − x^{2}), explaining why the positive square root is taken. | Let y = arcsin x, so sin y = x. Differentiating with respect to x gives cos y dy/dx = 1, so dy/dx = 1/cos y. Since sin^{2} y + cos^{2} y = 1, cos y = ±√(1 − x^{2}). The range of arcsin is −π/2 ≤ y ≤ π/2, where cos y ≥ 0, so dy/dx = 1/√(1 − x^{2}). | Rewrites as sin y = x ; Differentiates implicitly to get cos y dy/dx = 1 ; Uses sin^{2} y + cos^{2} y = 1 ; Justifies the positive root from the range of arcsin ; States the result

## Logarithmic Differentiation
S: Logarithmic differentiation takes the log of both sides before differentiating. It turns products, quotients and powers into sums, making messy derivatives manageable, and handles variable powers like x^{x}.
O: Use logarithmic differentiation for products, quotients and powers
O: Differentiate functions with variable exponents
LV: A level · Problem solving
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
EV: established | Taking logarithms turns products, quotients and powers into sums, and is the standard way to differentiate variable powers such as x^{x}.
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | secondary | 2020 | https://www.cengage.co.uk/
SRC: Department for Education, Mathematics AS and A level subject content: differentiation | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
NUM1#maths-u07-14-q1@1: For y = x^{x}, find dy/dx at x = 1. | 1 | 0 |  | dy/dx = x^{x}(ln x + 1) = 1 × (0 + 1) = 1.
M1#maths-u07-14-q2@1: What is d/dx (2^{x})? | 2^{x} ln 2 | x2^{x−1} | 2^{x} | 2^{x}/ln 2 | ln 2 | ln y = x ln 2, so dy/dx = y ln 2 = 2^{x} ln 2.
M3#maths-u07-14-q3@2: Why can't the power rule differentiate x^{x}? | The exponent isn't a constant | x^{x} isn't continuous | It has no derivative | The base is negative | It's an exponential with constant base | The power rule needs x^{n} with n constant; here the exponent varies with x.
NUM2#maths-u07-14-q4@2: For y = x^{x}, find dy/dx at x = 2, to 2 decimal places. | 6.77 | 0.01 |  | dy/dx = x^{x}(ln x + 1) = 4(ln 2 + 1) ≈ 4 × 1.693 = 6.77.
SA2#maths-u07-14-q5@1: Use logarithmic differentiation to find dy/dx for y = x^{2}e^{3x}/(x + 1), x > 0. | Take logs: ln y = 2 ln x + 3x − ln(x + 1). Differentiate implicitly: (1/y) dy/dx = 2/x + 3 − 1/(x + 1). Multiply by y: dy/dx = (x^{2}e^{3x}/(x + 1))(2/x + 3 − 1/(x + 1)). | Takes ln of both sides ; Expands using the log laws ; Differentiates ln y as (1/y) dy/dx ; Differentiates each term correctly ; Multiplies back by y

## Parametric Differentiation
S: When a curve is given parametrically, x = f(t) and y = g(t), its gradient comes from the chain rule: dy/dx = (dy/dt)/(dx/dt). There's no need to find the Cartesian equation first.
O: Find gradients of parametric curves
O: Find tangents, normals and stationary points of parametric curves
LV: A level · Application
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
EV: established | For a parametric curve, dy/dx = (dy/dt)/(dx/dt) wherever dx/dt ≠ 0.
SRC: Department for Education, Mathematics AS and A level subject content: differentiation | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | secondary | 2020 | https://www.cengage.co.uk/
NUM1#maths-u07-15-q1@1: For x = t^{2} + 1, y = 4t, find dy/dx at t = 2. | 1 | 0 |  | dx/dt = 2t = 4 and dy/dt = 4, so dy/dx = 4/4 = 1.
M1#maths-u07-15-q2@1: For x = 5 cos t, y = 5 sin t, what is dy/dx? | −cot t | tan t | −tan t | cot t | 5 | dy/dt = 5 cos t and dx/dt = −5 sin t, so dy/dx = −cos t/sin t.
M2#maths-u07-15-q3@2: For x = t^{3} − 3t, y = t^{2}, where are the vertical tangents? | t = ±1 | t = 0 | t = ±3 | t = 3 | None | dx/dt = 3t^{2} − 3 = 0 at t = ±1, where dy/dt = 2t ≠ 0.
NUM3#maths-u07-15-q4@2: The curve x = t^{2}, y = t^{3} − 3t has two horizontal tangents. Find the y-coordinate of the one with t > 0. | -2 | 0 |  | dy/dt = 3t^{2} − 3 = 0 at t = ±1, where dx/dt = 2t ≠ 0. At t = 1, y = 1 − 3 = −2.
SA3#maths-u07-15-q5@2: For the curve x = t^{2} − 4t, y = t^{3} − 3t, find the points with horizontal and vertical tangents, explaining your method. | dx/dt = 2t − 4 and dy/dt = 3t^{2} − 3. Horizontal tangents need dy/dt = 0 with dx/dt ≠ 0: t = ±1, giving (−3, −2) and (5, 2). Vertical tangents need dx/dt = 0 with dy/dt ≠ 0: t = 2, where dy/dt = 9, giving (−4, 2). | Finds dx/dt and dy/dt ; Uses dy/dt = 0 for horizontal tangents ; Checks dx/dt ≠ 0 there ; Uses dx/dt = 0 for vertical tangents ; Gives (−3, −2), (5, 2) and (−4, 2)

## Rates of Change
S: Derivatives measure how fast one quantity changes with another. In science, economics and everyday life, "rate of change" problems ask how fast something is growing, shrinking or moving at an instant.
O: Interpret derivatives as rates of change in context
O: Solve problems involving velocity, growth and marginal change
LV: GCSE and A level · Application
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
!: Confusing an average rate with an instantaneous one: for s = 20t − 5t^{2}, the average velocity over 0 ≤ t ≤ 2 is 20/2 = 10 m s^{−1}, but the velocity at t = 2 is 0.
K: A rate of change is a derivative; check its units and sign, and distinguish average from instantaneous rates.
!: Giving a rate without units, or with the wrong sign for a decrease.
Q: What are the units of dV/dt if V is in cm^{3} and t in seconds? | cm^{3} s^{−1}.
Q: What is the marginal cost if C(q) = 3q^{2} + 50? | C′(q) = 6q.
SUM: Derivatives model rates of change.
SUM: Units and signs carry meaning.
EV: established | A rate of change is a derivative, with units of output per unit input and a sign showing increase or decrease.
SRC: Department for Education, Mathematics AS and A level subject content: differentiation | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | secondary | 2020 | https://www.cengage.co.uk/
NUM1#maths-u07-16-q1@1: A ball's height is h = 30t − 4.9t^{2} m. Find its velocity at t = 2 s. | 10.4 | 0.01 | m/s | dh/dt = 30 − 9.8t = 30 − 19.6 = 10.4 m s^{−1}.
M1#maths-u07-16-q2@1: P = 200e^{0.05t}. What is dP/dt when P = 400? | 20 | 10 | 400 | 0.05 | 200 | dP/dt = 0.05P, so 0.05 × 400 = 20 per unit time.
M2#maths-u07-16-q3@2: The volume of a cube of side x is V = x^{3}. What is dV/dx when x = 4? | 48 | 64 | 12 | 16 | 3 | dV/dx = 3x^{2} = 48: the volume grows by about 48 units^{3} per unit of side.
NUM3#maths-u07-16-q4@2: For C(q) = 0.01q^{2} + 4q + 200 (pounds), find the actual cost of the 101st unit, C(101) − C(100). | 6.01 | 0.001 | £ | C(101) − C(100) = 0.01(10201 − 10000) + 4 = 6.01, close to the marginal cost C′(100) = £6, which estimates it.
SA3#maths-u07-16-q5@1,2: A population is P = 500e^{0.03t} after t years. Explain what dP/dt means, find it at t = 10 and interpret your answer. | dP/dt is the instantaneous growth rate in people per year. dP/dt = 500 × 0.03e^{0.03t} = 15e^{0.03t}; at t = 10 it is 15e^{0.3} ≈ 20.2 people per year. Since P(10) ≈ 675, the population is growing at 3% of its current size, as it does at every moment for exponential growth. | Interprets dP/dt as a rate with units ; Differentiates to 15e^{0.03t} ; Evaluates about 20.2 at t = 10 ; Gives units of people per year ; Notes the rate is 3% of P

## Related Rates
S: Related rates problems connect the rates of change of several linked quantities. If a balloon's radius grows at a known rate, how fast is its volume growing? The chain rule links them.
O: Use the chain rule to connect rates of change
O: Solve related rates problems step by step
LV: A level · Problem solving
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
P: For a cone filling with water, the radius and depth are linked by similar triangles. Use that ratio to write the volume in terms of the depth alone before differentiating.
K: Link the variables with an equation, differentiate with respect to t, then substitute the instant's values.
!: Substituting numbers before differentiating, which freezes quantities that are changing.
Q: What links dA/dt and dr/dt for a circle? | dA/dt = 2πr dr/dt.
Q: When should you substitute the given values? | After differentiating.
SUM: Related rates use the chain rule in time.
SUM: Substitute values at the end.
EV: established | Rates of linked quantities are connected by differentiating their relationship with respect to time, using the chain rule.
SRC: Department for Education, Mathematics AS and A level subject content: differentiation | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | secondary | 2020 | https://www.cengage.co.uk/
NUM1#maths-u07-17-q1@1: A circle's radius grows at 2 cm/s. How fast is its area growing when r = 10 cm? Give the answer to 1 decimal place. | 125.7 | 0.1 | cm²/s | dA/dt = 2πr dr/dt = 2π × 10 × 2 = 40π ≈ 125.7 cm^{2} s^{−1}.
M1#maths-u07-17-q2@1: For a cube of side x, dx/dt = 0.1 cm/s. What is dV/dt when x = 10 cm? | 30 cm³/s | 300 cm³/s | 3 cm³/s | 100 cm³/s | 0.3 cm³/s | By the chain rule dV/dt = 3x^{2} × dx/dt = 300 × 0.1 = 30 cm^{3} s^{−1}.
M2#maths-u07-17-q3@2: A sphere's volume increases at 36π cm³/s. What is dr/dt when r = 3 cm? | 1 cm/s | 3 cm/s | 1/3 cm/s | 9 cm/s | 4 cm/s | dV/dt = 4πr^{2} dr/dt: 36π = 36π dr/dt, so dr/dt = 1.
NUM3#maths-u07-17-q4@2: An inverted cone of radius 3 m and height 6 m fills with water at 2 m³/min. How fast is the depth rising when it is 4 m? Give 3 decimal places. | 0.159 | 0.002 | m/min | Similar triangles give r = h/2, so V = πh^{3}/12 and dV/dt = (πh^{2}/4) dh/dt. At h = 4: 2 = 4π dh/dt, so dh/dt = 1/(2π) ≈ 0.159 m/min.
SA3#maths-u07-17-q5@2: A 10 m ladder leans against a wall and its foot slides away at 0.5 m/s. Explain each step to find how fast the top slides down when the foot is 6 m from the wall. | Let x be the distance of the foot from the wall and y the height of the top: x^{2} + y^{2} = 100. Differentiate with respect to t: 2x dx/dt + 2y dy/dt = 0. Only now substitute: x = 6 gives y = 8, so 2(6)(0.5) + 2(8) dy/dt = 0 and dy/dt = −0.375. The top slides down at 0.375 m/s. | Names variables and writes x^{2} + y^{2} = 100 ; Differentiates with respect to time ; Substitutes only after differentiating ; Finds y = 8 ; Gets 0.375 m/s downwards

## L'Hôpital's Rule
S: L'Hôpital's rule evaluates limits of the indeterminate forms 0/0 and ∞/∞ by differentiating the top and bottom separately. It's quick and powerful, but only applies to those forms.
O: Apply L'Hôpital's rule to 0/0 and ∞/∞ limits
O: Convert other indeterminate forms to ones the rule handles
LV: Year 1 · Application
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
EV: established | For the indeterminate forms 0/0 and ∞/∞, the limit of f/g equals the limit of f′/g′ when the latter exists.
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | secondary | 2020 | https://www.cengage.co.uk/
SRC: Spivak M, Calculus (4th edn, Publish or Perish 2008) | secondary | 2008 | https://www.publishorperish.com/
NUM1#maths-u07-18-q1@1: Find lim_{x→0} (sin 4x)/(2x). | 2 | 0 |  | 0/0, so differentiate: 4 cos 4x/2 → 4/2 = 2.
M1#maths-u07-18-q2@1: What is lim_{x→∞} ln x/x? | 0 | 1 | ∞ | e | −1 | ∞/∞, so (1/x)/1 → 0: logarithms grow more slowly than x.
M3#maths-u07-18-q3@2: Why can't L'Hôpital's rule be used for lim_{x→1} (x^{2} + 1)/(x + 1)? | It isn't an indeterminate form: the limit is simply 1 | The functions aren't differentiable | The limit is infinite | x → 1 isn't allowed | It gives the same answer anyway | Substitution gives 2/2 = 1; the rule only applies to 0/0 or ∞/∞.
NUM2#maths-u07-18-q4@1: Find lim_{x→0} (1 − cos 2x)/x^{2}. | 2 | 0 |  | 0/0, so differentiate: 2 sin 2x/(2x), still 0/0; again: 4 cos 2x/2 → 2.
SA2#maths-u07-18-q5@2: Find lim_{x→0⁺} x^{x}, explaining how you convert the indeterminate form. | x^{x} → 0^{0}, an indeterminate form. Take logs: ln y = x ln x, a 0 × ∞ form. Rewrite as ln x/(1/x), which is −∞/∞, and apply L'Hôpital's rule: (1/x)/(−1/x^{2}) = −x → 0. So ln y → 0 and y → e^{0} = 1. | Recognises the 0^{0} form ; Takes logarithms ; Rewrites x ln x as a quotient ; Applies the rule correctly ; Concludes the limit is 1

## Stationary Points
S: Stationary points are where a curve's gradient is zero: maxima, minima and stationary points of inflection. Finding and classifying them is one of the most useful skills in calculus.
O: Find stationary points by solving f′(x) = 0
O: Classify stationary points using the second derivative or the gradient either side
LV: A level · Fluency
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
P: In context, check that a stationary point makes sense: the greatest height of a projectile is where its vertical velocity is zero, and a negative length or time is rejected.
K: Solve f′ = 0; classify with f″ (positive: minimum, negative: maximum), or by the gradient's sign either side if f″ = 0.
!: Concluding that f″ = 0 means a point of inflection: x^{4} has a minimum where f″ = 0.
Q: What does f″(a) < 0 at a stationary point mean? | A local maximum.
Q: What is a stationary point of inflection? | A stationary point where the gradient has the same sign on both sides.
SUM: Stationary points have zero gradient.
SUM: The second derivative usually classifies them.
EV: established | Stationary points occur where f′(x) = 0 and are classified by the sign of f″ or of f′ either side.
SRC: Department for Education, Mathematics AS and A level subject content: differentiation | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | secondary | 2020 | https://www.cengage.co.uk/
NUM1#maths-u07-19-q1@1: Find the x-coordinate of the stationary point of y = x^{2} − 10x + 3. | 5 | 0 |  | dy/dx = 2x − 10 = 0 gives x = 5 (a minimum, since d^{2}y/dx^{2} = 2 > 0).
M1#maths-u07-19-q2@1: At a stationary point, f″(x) = 4. What kind of point is it? | A minimum | A maximum | An inflection | Not stationary | It can't be decided | A positive second derivative means the curve is concave up, so it's a minimum.
M2#maths-u07-19-q3@2: What kind of stationary point does y = x^{3} have at the origin? | A stationary point of inflection | A maximum | A minimum | It has none | A corner | The gradient 3x^{2} is positive on both sides of 0, so it's an inflection, not a turning point.
NUM3#maths-u07-19-q4@1: The curve y = x^{3} + kx^{2} has a stationary point at x = 4. Find k. | -6 | 0 |  | dy/dx = 3x^{2} + 2kx = 0 at x = 4: 48 + 8k = 0, so k = −6.
SA3#maths-u07-19-q5@1,2: Find and classify the stationary points of y = x^{4} − 2x^{2}, and explain what you would do if the second derivative test gave zero. | dy/dx = 4x^{3} − 4x = 4x(x − 1)(x + 1) = 0 at x = 0, ±1. d^{2}y/dx^{2} = 12x^{2} − 4: at x = 0 it is −4 < 0, a maximum (0, 0); at x = ±1 it is 8 > 0, minima at (1, −1) and (−1, −1). If f″ were zero, check the sign of f′ just either side of the point instead. | Differentiates and factorises ; Finds x = 0, 1 and −1 ; Finds the y-coordinates ; Classifies with f″ correctly ; Describes the first derivative test as the fallback

## Critical Points
S: Critical points are where a function's derivative is zero or doesn't exist. They're the only candidates for local maxima and minima, so finding them is the first step in any optimisation problem.
O: Identify critical points where f′ = 0 or f′ is undefined
O: Use critical points to locate extrema
LV: Year 1 · Application
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
!: Counting a point outside the domain: f′ for f(x) = 1/x is undefined at 0, but 0 isn't in the domain, so it isn't a critical point.
K: Critical points are where f′ = 0 or f′ is undefined; every interior extremum is at one, but not every one is an extremum.
!: Ignoring points where the derivative doesn't exist, such as corners and cusps.
Q: Is x = 0 a critical point of f(x) = |x|? | Yes: the derivative doesn't exist there (and it's a minimum).
Q: Does every critical point give a maximum or minimum? | No: x^{3} at 0 is a counterexample.
SUM: Critical points are candidates for extrema.
SUM: Include points where f′ doesn't exist.
EV: established | Every interior local extremum of a function occurs at a critical point, where f′ is zero or undefined, but not every critical point is an extremum.
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | secondary | 2020 | https://www.cengage.co.uk/
SRC: Spivak M, Calculus (4th edn, Publish or Perish 2008) | secondary | 2008 | https://www.publishorperish.com/
M1#maths-u07-20-q1@1: Which is a critical point of f(x) = x^{2} − 4x? | x = 2 | x = 0 | x = 4 | x = −2 | x = 1 | Critical points are where f′(x) = 0: here 2x − 4 = 0, so x = 2.
M2#maths-u07-20-q2@2: Where are the critical points of f(x) = √(x)(x − 3) for x ≥ 0? | x = 0 and x = 1 | x = 3 only | x = 1 only | x = 0 and x = 3 | x = 3/2 | f′(x) = (3x − 3)/(2√x): zero at x = 1, undefined at x = 0 (an endpoint where f is defined).
NUM2#maths-u07-20-q3@1: Find the positive critical point of f(x) = x^{4} − 8x^{2}. | 2 | 0 |  | f′(x) = 4x^{3} − 16x = 4x(x^{2} − 4), which is zero at x = 0 and x = ±2, so the positive one is 2.
NUM3#maths-u07-20-q4@2: f(x) = x^{2/3}(x − 5) has a local minimum at one of its critical points. Find the minimum value to 2 decimal places. | -4.76 | 0.01 |  | f′ = (5/3)x^{−1/3}(x − 2) changes from − to + at x = 2, so the minimum is f(2) = 2^{2/3} × (−3) ≈ −4.76. (x = 0 is a local maximum, at a cusp.)
SA3#maths-u07-20-q5@1,2: Explain why x = 0 is a critical point of f(x) = x^{2/3}, and decide whether it is an extremum. | f′(x) = (2/3)x^{−1/3}, which is undefined at x = 0, although f(0) = 0 is defined; so x = 0 is a critical point where the derivative does not exist (a cusp). Since x^{2/3} = (∛x)^{2} ≥ 0 = f(0) for every x, it is a minimum (in fact the global minimum). f′ is negative for x < 0 and positive for x > 0, confirming this. | Finds f′(x) = (2/3)x^{−1/3} ; Notes f′ is undefined at 0 while f is defined ; Calls it a critical point ; Shows it is a minimum ; Uses the sign of f′ or f ≥ 0

## Local Maxima and Minima
S: A local maximum is higher than all nearby points; a local minimum is lower. Local extrema are "peaks and valleys" of a graph, not necessarily the highest or lowest overall.
O: Distinguish local and global extrema
O: Classify local extrema with the first and second derivative tests
LV: A level · Application
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
P: The second derivative test is quicker when f″ is easy to find; the first derivative test is safer, because it also classifies points where f″ = 0 or f′ doesn't exist.
K: + to − is a maximum, − to + a minimum; local extrema needn't be global.
!: Assuming a local maximum is the largest value of the function.
Q: What does the first derivative test check? | Whether f′ changes sign at the point, and how.
Q: Can a local minimum be higher than a local maximum? | Yes.
SUM: Local extrema are peaks and valleys.
SUM: The first derivative test always works.
EV: established | A sign change of f′ from + to − marks a local maximum and from − to + a local minimum; local extrema need not be global.
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | secondary | 2020 | https://www.cengage.co.uk/
SRC: Department for Education, Mathematics AS and A level subject content: differentiation | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
M1#maths-u07-21-q1@1: f′ changes from positive to negative at x = 2. What is at x = 2? | A local maximum | A local minimum | A point of inflection | An asymptote | Nothing | The function rises then falls, so x = 2 is a peak.
M2#maths-u07-21-q2@2: What is the local minimum value of f(x) = x^{3} − 3x? | −2 | 2 | 0 | −1 | 1 | f′(x) = 3x^{2} − 3 = 0 at x = ±1; f″(1) = 6 > 0, and f(1) = −2.
NUM2#maths-u07-21-q3@2: Find the local maximum value of f(x) = 2x^{3} − 3x^{2} − 12x. | 7 | 0 |  | f′(x) = 6(x − 2)(x + 1); f″(x) = 12x − 6 is −18 at x = −1, a maximum: f(−1) = −2 − 3 + 12 = 7.
M3#maths-u07-21-q4@1: f(x) = x^{3} − 3x has a local maximum of 2 at x = −1. Which statement is true? | f(3) = 18, so on [−2, 3] the local maximum isn't the global one | 2 is the greatest value f takes for any real x | f has a global maximum on the whole real line | The local minimum −2 is the least value f takes for all x | A local maximum is always above every local minimum | Local means only "higher than nearby points"; the cubic exceeds 2 for x > 2 and has no global extrema on the real line.
SA3#maths-u07-21-q5@2: Find and classify the stationary points of f(x) = x^{5} − 5x^{4}, explaining why the second derivative test is not enough. | f′(x) = 5x^{4} − 20x^{3} = 5x^{3}(x − 4) = 0 at x = 0 and x = 4. f″(x) = 20x^{3} − 60x^{2}: f″(4) = 320 > 0, a local minimum at (4, −256). f″(0) = 0, so the test fails. The first derivative test: f′ > 0 just left of 0 and f′ < 0 just right, so (0, 0) is a local maximum. | Factorises f′ as 5x^{3}(x − 4) ; Finds x = 0 and x = 4 ; Classifies x = 4 as a minimum at (4, −256) ; Notes f″(0) = 0 is inconclusive ; Uses sign of f′ to show (0, 0) is a maximum

## Global Optimisation
S: Global optimisation finds the absolute largest or smallest value of a function, often under constraints. It answers practical questions: the cheapest design, the maximum profit, the shortest route.
O: Find absolute extrema on closed intervals
O: Solve optimisation problems from contexts
LV: A level · Problem solving
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
P: State the domain the context allows before optimising: in the box problem 0 < x < 15, so the critical point x = 15 (zero volume) is rejected and only x = 5 remains.
K: Check critical points and endpoints; in modelling, build a one-variable function from the constraint first.
!: Forgetting the endpoints of a closed interval, where the global extremum may lie.
Q: Where can the global maximum of a continuous function on [a, b] occur? | At a critical point or an endpoint.
Q: What does the extreme value theorem guarantee? | A continuous function on a closed interval has a maximum and a minimum.
SUM: Global extrema compare critical points and endpoints.
SUM: Modelling needs a one-variable function.
EV: established | A continuous function on a closed interval attains its maximum and minimum, each at a critical point or an endpoint.
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | secondary | 2020 | https://www.cengage.co.uk/
SRC: Department for Education, Mathematics AS and A level subject content: differentiation | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
NUM1#maths-u07-22-q1@1: Find the maximum value of f(x) = 12x − x^{3} on 0 ≤ x ≤ 3. | 16 | 0 |  | f′ = 12 − 3x^{2} = 0 at x = 2, f(2) = 16; f(0) = 0 and f(3) = 9, so the maximum is 16.
M1#maths-u07-22-q2@1: Two positive numbers add to 20. What is the largest possible product? | 100 | 96 | 400 | 200 | 99 | P = x(20 − x), P′ = 20 − 2x = 0 at x = 10, giving 10 × 10 = 100.
M3#maths-u07-22-q3@2: What is the minimum of f(x) = x^{2} − 6x on 4 ≤ x ≤ 7? | −8 | −9 | 0 | 7 | −5 | The critical point x = 3 is outside the interval; f(4) = −8 and f(7) = 7, so the minimum is −8 at the endpoint.
NUM2#maths-u07-22-q4@2: An open box is made from a 24 cm square sheet by cutting x cm squares from each corner. Find the maximum volume. | 1024 | 0 | cm³ | V = x(24 − 2x)^{2}, V′ = (24 − 2x)(24 − 6x) = 0 at x = 4 (x = 12 gives V = 0), so V = 4 × 16^{2} = 1,024 cm^{3}.
SA3#maths-u07-22-q5@2: A closed cylinder must hold 500 cm³. Find the radius that minimises its surface area, justifying that it is a minimum. | Volume πr^{2}h = 500 gives h = 500/(πr^{2}). Surface area A = 2πr^{2} + 2πrh = 2πr^{2} + 1000/r. A′ = 4πr − 1000/r^{2} = 0 gives r^{3} = 250/π, so r ≈ 4.30 cm (and h ≈ 8.60 cm = 2r). A″ = 4π + 2000/r^{3} > 0, so this is a minimum, and it is the only critical point for r > 0. | Uses the volume constraint to eliminate h ; Writes A = 2πr^{2} + 1000/r ; Differentiates and solves A′ = 0 ; Gets r ≈ 4.30 cm ; Justifies the minimum with A″ or the sign of A′

## Concavity and Convexity
S: Concavity describes how a graph bends: concave up (convex), like a cup, or concave down (concave), like a cap. The second derivative measures it, and convexity is central to optimisation and economics.
O: Determine intervals of concavity using f″
O: Explain the importance of convex functions in optimisation
LV: A level · Application
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
P: Geometrically, f is convex on an interval when every chord lies on or above the graph. For twice-differentiable functions this is equivalent to f″ ≥ 0, the test used in practice.
K: Convex where f″ > 0, concave where f″ < 0; convex functions have only global minima.
!: Confusing "concave" with "decreasing": a concave function can be increasing.
Q: Is e^{x} convex or concave? | Convex everywhere.
Q: What does convexity guarantee about minima? | Any local minimum is a global minimum.
SUM: The second derivative measures bending.
SUM: Convexity makes optimisation reliable.
EV: established | A twice-differentiable function is convex where f″ ≥ 0 and concave where f″ ≤ 0, and a local minimum of a convex function is global.
SRC: Department for Education, Mathematics AS and A level subject content: differentiation | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Boyd S, Vandenberghe L, Convex Optimization (Cambridge University Press 2004) | secondary | 2004 | https://web.stanford.edu/~boyd/cvxbook/
M1#maths-u07-23-q1@1: On which interval is f(x) = x^{3} − 3x^{2} concave? | x < 1 | x > 1 | x < 0 | x > 3 | All x | The curve is concave where f″(x) < 0: f″(x) = 6x − 6 < 0 when x < 1.
M2#maths-u07-23-q2@2: Which function is convex for all real x? | x^{2} + e^{x} | ln x | −x^{2} | sin x | x^{3} | Both x^{2} and e^{x} have positive second derivatives, so their sum does too.
NUM2#maths-u07-23-q3@1: f(x) = x^{3} − 9x^{2} + 4 is convex exactly for x > a. Find a. | 3 | 0 |  | f″(x) = 6x − 18, which is positive for x > 3, so a = 3.
M3#maths-u07-23-q4@2: For the convex function f(x) = x^{2}, which comparison holds for the values x = 1 and x = 5? | f(3) < (f(1) + f(5))/2, since 9 < 13 | f(3) = (f(1) + f(5))/2, since both are 13 | f(3) > (f(1) + f(5))/2, since 25 > 13 | f(3) < f(1), since the graph bends upwards | Jensen's inequality for convex f: the value at the average, f(3) = 9, is at most the average of the values, (1 + 25)/2 = 13.
SA3#maths-u07-23-q5@1,2: Explain why a local minimum of a convex function must be a global minimum, and illustrate with f(x) = e^{x} + e^{−x}. | Suppose x₀ is a local minimum but some x₁ has f(x₁) < f(x₀). The chord from x₀ to x₁ lies on or above the graph, and it slopes down from x₀, so points of the graph just beside x₀ are below f(x₀): a contradiction. For f(x) = e^{x} + e^{−x}, f″(x) = e^{x} + e^{−x} > 0, so f is convex; f′(x) = e^{x} − e^{−x} = 0 only at x = 0, so f(0) = 2 is the global minimum. | Uses the chord-above-graph property ; Argues by contradiction from a lower point ; Shows f″ > 0 for the example ; Solves f′ = 0 to get x = 0 ; States the global minimum value 2

## Points of Inflection
S: A point of inflection is where a curve changes concavity, from bending one way to bending the other. At such a point the second derivative changes sign, and the tangent crosses the curve.
O: Find points of inflection using the second derivative
O: Distinguish stationary and non-stationary inflections
LV: A level · Application
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
EV: established | A point of inflection is where f″ changes sign; f″ = 0 alone is not sufficient.
SRC: Department for Education, Mathematics AS and A level subject content: differentiation | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | secondary | 2020 | https://www.cengage.co.uk/
NUM1#maths-u07-24-q1@1: Find the x-coordinate of the point of inflection of y = x^{3} + 3x^{2} − 9x. | -1 | 0 |  | y″ = 6x + 6 = 0 at x = −1, where y″ changes sign.
M1#maths-u07-24-q2@1: Which curve has a point of inflection at the origin? | y = x^{3} | y = x^{2} | y = x^{4} | y = |x| | y = e^{x} | y″ = 6x changes sign at 0; for x^{4}, y″ = 12x^{2} doesn't.
M2#maths-u07-24-q3@2: For y = sin x on 0 < x < 2π, where is the inflection? | x = π | x = π/2 | x = 3π/2 | x = π/4 | There isn't one | y″ = −sin x is zero at x = π and changes sign there, so it's an inflection.
NUM3#maths-u07-24-q4@1,2: y = x^{4} − 4x^{3} has two points where y″ = 0. Give the x-coordinate of the non-stationary inflection. | 2 | 0 |  | y″ = 12x^{2} − 24x = 12x(x − 2) changes sign at 0 and 2. At x = 0, y′ = 0 (stationary); at x = 2, y′ = 32 − 48 = −16 ≠ 0, so x = 2 is non-stationary.
SA2#maths-u07-24-q5@1,2: Show that y = x^{3} − 3x^{2} + 3x has a stationary point of inflection, and find it. | y′ = 3x^{2} − 6x + 3 = 3(x − 1)^{2}, which is zero only at x = 1, so there is one stationary point, at (1, 1). y″ = 6(x − 1) changes from negative to positive at x = 1, so the concavity changes. The point is both stationary and an inflection: y′ ≥ 0 on both sides, so it isn't a turning point. | Differentiates to 3(x − 1)^{2} ; Finds the stationary point (1, 1) ; Shows y″ changes sign ; Notes the gradient keeps the same sign either side ; Concludes it is a stationary inflection

## Curve Sketching
S: Curve sketching uses calculus and algebra together to draw an accurate picture of a function: its intercepts, asymptotes, stationary points, inflections and end behaviour. A good sketch shows the key features, not exact plotting.
O: Combine intercepts, asymptotes and derivatives to sketch curves
O: Label key features accurately
LV: A level · Problem solving
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
P: **Investigate with the lab.** Do the cubic-roots and shifted-reciprocal challenges. Sketch each curve on paper first, then check your roots and asymptotes against the plot.
IX: grapher
K: Work through domain, symmetry, intercepts, asymptotes, stationary points and end behaviour; label key points.
!: Drawing a curve crossing a vertical asymptote, or ignoring end behaviour.
Q: Where are the vertical asymptotes of y = 1/(x^{2} − 9)? | x = 3 and x = −3.
Q: What is the horizontal asymptote of y = (2x + 1)/(x − 5)? | y = 2.
SUM: Sketches show key features.
SUM: Calculus finds turning points; algebra finds intercepts and asymptotes.
EV: established | Intercepts, asymptotes, stationary points and end behaviour together determine the shape of a graph.
SRC: Department for Education, Mathematics AS and A level subject content: algebra and functions | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | secondary | 2020 | https://www.cengage.co.uk/
M1#maths-u07-25-q1@1: What is the vertical asymptote of y = 3/(x + 4)? | x = −4 | x = 4 | y = 0 | x = 3 | y = 3 | The denominator is zero at x = −4, where y grows without bound.
M2#maths-u07-25-q2@2: What is the horizontal asymptote of y = (6x^{2} + 1)/(3x^{2} − 2)? | y = 2 | y = 6 | y = 0 | y = 1/2 | None | As x → ∞, the leading terms dominate: 6x^{2}/3x^{2} = 2.
M2#maths-u07-25-q3@2: Where are the asymptotes of y = 2/(x − 1) + 1? | x = 1 and y = 1 | x = −1 and y = 1 | x = 2 and y = 1 | x = 1 and y = 2 | There are none | The denominator is zero at x = 1, and the curve approaches y = 1 as x grows.
NUM3#maths-u07-25-q4@1: Dividing shows that y = (x^{2} − 4)/(x − 1) has an oblique asymptote y = x + k. Find k. | 1 | 0 |  | x^{2} − 4 = (x − 1)(x + 1) − 3, so y = x + 1 − 3/(x − 1), and the last term tends to 0: the asymptote is y = x + 1.
SA3#maths-u07-25-q5@1,2: Describe how to sketch y = x^{2}/(x − 1), stating its asymptotes, intercepts and stationary points. | Vertical asymptote x = 1 (denominator zero). Division gives y = x + 1 + 1/(x − 1), so the oblique asymptote is y = x + 1. The only intercept is the origin. y′ = x(x − 2)/(x − 1)^{2}, zero at x = 0 and x = 2: f′ goes + to − at 0, a local maximum (0, 0), and − to + at 2, a local minimum (2, 4). The left branch lies below both asymptotes and the right branch above. | Vertical asymptote x = 1 ; Oblique asymptote y = x + 1 by division ; Intercept at the origin ; Maximum (0, 0) and minimum (2, 4) ; Describes the two branches correctly

## Integral Calculus
S: Integral calculus is the mathematics of accumulation: adding up infinitely many small pieces to find areas, volumes, distances and totals. It's also the reverse of differentiation.
O: Describe integration as anti-differentiation and as accumulated area
O: Distinguish definite and indefinite integrals
LV: A level · Fluency
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
P: **Investigate with the lab.** Switch between left, right, midpoint and trapezium rules for the same n and rank them by error.
IX: riemann
K: Integration reverses differentiation and accumulates quantities; the definite integral is a signed area.
!: Forgetting that areas below the axis count as negative in a definite integral.
Q: What is the integrand in ∫ (x^{2} + 1) dx? | x^{2} + 1.
Q: How do you find distance from a velocity function? | Integrate the velocity over the time interval.
SUM: Integration accumulates.
SUM: It reverses differentiation.
EV: established | Integration both reverses differentiation and accumulates quantities, and the definite integral of a function is a signed area.
SRC: Department for Education, Mathematics AS and A level subject content: integration | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | secondary | 2020 | https://www.cengage.co.uk/
NUM1#maths-u07-26-q1@1: A tap's flow rate is r(t) = 2t litres per minute. How many litres flow in the first 5 minutes? | 25 | 0 | litres | ∫_{0}^{5} 2t dt = [t^{2}]_{0}^{5} = 25 litres.
M1#maths-u07-26-q2@1: Which quantity is found by integrating acceleration with respect to time? | Velocity | Displacement | Force | Jerk | Mass | Acceleration is the derivative of velocity, so integrating it gives velocity.
M2#maths-u07-26-q3@2: What does ∫_{a}^{b} f(x) dx represent if f is positive? | The area between the curve and the x-axis from a to b | The gradient at b | The average of f(a) and f(b) | The length of the curve | f(b) − f(a) | For a positive function, the definite integral is the area under the curve.
M2#maths-u07-26-q4@2: Which rule usually gives the smallest error for a smooth function with the same number of strips? | The midpoint rule (with the trapezium close behind) | The left rectangle rule, using each strip's start | The right rectangle rule, using each strip's end | All four rules give exactly the same error | Whichever rule uses the fewest strips | Midpoint and trapezium rules have O(h^{2}) error, while left and right rules are O(h).
SA3#maths-u07-26-q5@1,2: A particle moves with velocity v = 6 − 2t m/s. Explain the difference between ∫ v dt and ∫_{0}^{5} v dt, and find the total distance travelled from t = 0 to t = 5. | ∫ v dt = 6t − t^{2} + c is an indefinite integral: a family of displacement functions. ∫_{0}^{5} v dt = 30 − 25 = 5 m is a definite integral: the net displacement. Since v < 0 after t = 3, the particle turns back, so distance needs the two parts separately: ∫_{0}^{3} v dt = 9 and ∫_{3}^{5} v dt = −4, giving 9 + 4 = 13 m. | Gives the indefinite integral with + c ; Calls it a family of functions ; Evaluates the definite integral as 5 m ; Notes v changes sign at t = 3 ; Gets total distance 13 m

## Indefinite Integrals
S: An indefinite integral is the family of all antiderivatives of a function. Because constants differentiate to zero, every indefinite integral includes "+ c".
O: Integrate powers of x and standard functions
O: Use a boundary condition to find the constant of integration
LV: A level · Fluency
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
EV: established | Indefinite integrals are families of antiderivatives differing by a constant, fixed by a boundary condition.
SRC: Department for Education, Mathematics AS and A level subject content: integration | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | secondary | 2020 | https://www.cengage.co.uk/
M1#maths-u07-27-q1@1: What is ∫ (4x − 1) dx? | 2x^{2} − x + c | 4 + c | 2x^{2} − 1 + c | 4x^{2} − x + c | x^{2} − x + c | 4x integrates to 2x^{2}, −1 integrates to −x, plus the constant c.
M2#maths-u07-27-q2@2: dy/dx = 2x and y = 7 when x = 2. What is y? | x^{2} + 3 | x^{2} + 7 | x^{2} − 3 | 2x^{2} − 1 | x^{2} | y = x^{2} + c, and 7 = 4 + c gives c = 3.
M3#maths-u07-27-q3@2: What is ∫ 1/(3x) dx? | (1/3) ln|x| + c | ln|3x|/3x + c | 3 ln|x| + c | x^{0}/0 + c | ln|x|/x + c | 1/(3x) = (1/3) × 1/x, and ∫ 1/x dx = ln|x|.
NUM2#maths-u07-27-q4@2: dy/dx = 6x^{2} − 4 and the curve passes through (1, 5). Find y when x = 2. | 15 | 0 |  | y = 2x^{3} − 4x + c; 5 = 2 − 4 + c gives c = 7, so y(2) = 16 − 8 + 7 = 15.
SA2#maths-u07-27-q5@1: Find ∫ (2√x − 3/x^{2} + e^{2x}) dx, showing how you prepare each term. | Write in index form: 2x^{1/2} − 3x^{−2} + e^{2x}. Integrate term by term: 2x^{3/2}/(3/2) = (4/3)x^{3/2}; −3x^{−1}/(−1) = 3/x; e^{2x}/2. So the integral is (4/3)x^{3/2} + 3/x + ½e^{2x} + c. Check by differentiating. | Rewrites roots and reciprocals as powers ; Integrates 2x^{1/2} to (4/3)x^{3/2} ; Integrates −3x^{−2} to 3/x ; Integrates e^{2x} to ½e^{2x} ; Includes + c

## Riemann Sums
S: A Riemann sum approximates the area under a curve by adding up the areas of thin rectangles. As the rectangles get thinner, the sum approaches the definite integral, which is how integration is defined.
O: Calculate left, right and midpoint Riemann sums
O: Explain how the definite integral is defined as a limit of sums
LV: A level · Application
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
P: **Investigate with the lab.** Approximate the area with left rectangles and increase n until you're within 1% (the lab's challenge). Compare how fast left and midpoint sums improve.
IX: riemann
K: Rectangles of width Δx approximate the area; the integral is the limit as Δx → 0.
!: Forgetting to multiply the sum of heights by the strip width.
Q: Does a left Riemann sum over- or underestimate for an increasing function? | Underestimate.
Q: Where does the notation ∫ ... dx come from? | A sum (S) of f(x) times small widths Δx.
SUM: Riemann sums approximate areas with rectangles.
SUM: The definite integral is their limit.
EV: established | The definite integral is defined as the limit of Riemann sums as the strip width tends to zero.
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | secondary | 2020 | https://www.cengage.co.uk/
SRC: Spivak M, Calculus (4th edn, Publish or Perish 2008) | secondary | 2008 | https://www.publishorperish.com/
NUM1#maths-u07-28-q1@1: Estimate ∫_{0}^{3} x dx with three strips and left endpoints. | 3 | 0 |  | Δx = 1; heights 0, 1 and 2 sum to 3; 3 × 1 = 3 (exact value 4.5).
M1#maths-u07-28-q2@1: With n strips on [a, b], what is the width of each? | (b − a)/n | n/(b − a) | b − a | (a + b)/n | 1/n | The interval's length divided equally into n parts.
M2#maths-u07-28-q3@2: For a decreasing function, how does a right Riemann sum compare with the integral? | It underestimates | It overestimates | It's exact | It's always zero | It depends on n only | Right endpoints of a decreasing function are the lowest points in each strip.
M2#maths-u07-28-q4@2: For an increasing function, how does the left Riemann sum compare with the exact integral? | It underestimates, since each rectangle uses the lowest value on its strip | It overestimates, since each strip uses its highest value | It is always exact for increasing functions | It depends only on n, not on the function | It always gives zero for increasing functions | On an increasing function the left endpoint is the minimum of each strip.
SA3#maths-u07-28-q5@1,2: Estimate ∫_{0}^{2} x^{2} dx with four strips using midpoints. Compare it with the left sum, the right sum and the exact value, and explain the pattern. | Δx = 0.5; midpoints 0.25, 0.75, 1.25 and 1.75 give heights 0.0625, 0.5625, 1.5625 and 3.0625, summing to 5.25, so the estimate is 2.625. The left sum is (0 + 0.25 + 1 + 2.25) × 0.5 = 1.75 and the right sum is 3.75. The exact value is 8/3 ≈ 2.667. x^{2} is increasing, so left underestimates and right overestimates; the midpoint is far closer because its errors on each side of the midpoint largely cancel. As n → ∞ all three tend to 8/3. | Uses Δx = 0.5 and the correct midpoints ; Gets the midpoint estimate 2.625 ; Gets left 1.75 and right 3.75 ; States the exact value 8/3 ; Explains under- and overestimates and the limit

## Definite Integrals
S: A definite integral ∫_{a}^{b} f(x) dx gives a number: the net signed area between the curve and the x-axis from a to b. It's evaluated by finding an antiderivative and subtracting its values at the limits.
O: Evaluate definite integrals
O: Find areas under curves and between curves
LV: A level · Fluency
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
P: **Investigate with the lab.** Integrate over a region where f is negative and see the sum come out negative: definite integrals measure signed area.
IX: riemann
P: **Investigate with the lab.** Choose the Definite integrals topic and work through 10 problems: find an antiderivative, substitute the upper limit, subtract the value at the lower limit. Read the worked method on any you get wrong.
IX: practice
K: F(b) − F(a); split at x-intercepts for total area; area between curves is ∫ (top − bottom).
!: Reporting a negative area, or letting parts above and below the axis cancel.
Q: What is ∫_{0}^{1} 3x^{2} dx? | 1.
Q: Why is ∫_{−1}^{1} x^{3} dx = 0? | The equal areas above and below the axis cancel (x^{3} is odd).
SUM: Definite integrals give net signed areas.
SUM: Split at roots for total area.
EV: established | A definite integral equals F(b) − F(a) for any antiderivative F and gives net signed area.
SRC: Department for Education, Mathematics AS and A level subject content: integration | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | secondary | 2020 | https://www.cengage.co.uk/
NUM1#maths-u07-29-q1@1: Evaluate ∫_{1}^{4} 3√x dx. | 14 | 0 |  | [2x^{3/2}]_{1}^{4} = 2 × 8 − 2 × 1 = 14.
M1#maths-u07-29-q2@1: What is ∫_{0}^{2} (x^{3} + 1) dx? | 6 | 4 | 5 | 8 | 2 | An antiderivative is x^{4}/4 + x; evaluating from 0 to 2 gives 4 + 2 − 0 = 6.
M2#maths-u07-29-q3@2: What is the total area between y = x − 1 and the x-axis from x = 0 to x = 2? | 1 | 0 | 2 | 1/2 | −1 | Each triangle has area 1/2, one below and one above the axis; the total area is 1, though the integral is 0.
M2#maths-u07-29-q4@2: What is ∫ x dx from −1 to 1? | 0, since the negative and positive areas cancel | 1, the total area between the line and the axis | 2, the length of the interval of integration | −1, since the left half dominates the right | It is undefined, since the line crosses the axis | The area below the axis on [−1, 0] is −½ and the area above on [0, 1] is +½, so the signed areas cancel to 0.
SA3#maths-u07-29-q5@2: Find ∫_{0}^{5} (x^{2} − 4x) dx and the total area between y = x^{2} − 4x and the x-axis from x = 0 to x = 5, explaining why they differ. | An antiderivative is x^{3}/3 − 2x^{2}. The curve crosses the axis at x = 0 and x = 4. ∫_{0}^{4} = 64/3 − 32 = −32/3 (below the axis) and ∫_{4}^{5} = (125/3 − 50) − (64/3 − 32) = 7/3. So the integral is −32/3 + 7/3 = −25/3, but the total area is 32/3 + 7/3 = 13. They differ because the integral counts area below the axis as negative. | Finds the antiderivative ; Finds the root x = 4 and splits there ; Evaluates −32/3 and 7/3 ; Gives integral −25/3 and area 13 ; Explains signed area

## Fundamental Theorem of Calculus
S: The fundamental theorem of calculus links the two halves of calculus: differentiation and integration are inverse processes. It's why we can evaluate areas using antiderivatives instead of limits of sums.
O: State both parts of the fundamental theorem of calculus
O: Differentiate integrals with variable limits
LV: Year 1 · Application
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
P: **Investigate with the lab.** Compare the strip sums with the exact value the lab computes from an antiderivative. As n grows, the sums converge to F(b) − F(a).
IX: riemann
K: Differentiating an accumulated integral returns the integrand; evaluating a definite integral uses any antiderivative.
!: Forgetting the chain rule when the upper limit is a function of x.
Q: What is d/dx ∫_{2}^{x} t^{3} dt? | x^{3}.
Q: Which two processes does the theorem show are inverses? | Differentiation and integration.
SUM: Calculus has two halves linked by one theorem.
SUM: Antiderivatives evaluate definite integrals.
EV: established | Differentiation and integration are inverse processes: d/dx ∫_{a}^{x} f(t) dt = f(x) for continuous f, and ∫_{a}^{b} f = F(b) − F(a).
SRC: Spivak M, Calculus (4th edn, Publish or Perish 2008) | secondary | 2008 | https://www.publishorperish.com/
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | secondary | 2020 | https://www.cengage.co.uk/
M1#maths-u07-30-q1@1: What is d/dx ∫_{0}^{x} √(1 + t^{2}) dt? | √(1 + x^{2}) | √(1 + x^{2}) − 1 | x√(1 + x^{2}) | 0 | 1/(2√(1 + x^{2})) | Part 1 of the theorem: the derivative of the accumulation function is the integrand at x.
M2#maths-u07-30-q2@2: What is d/dx ∫_{0}^{x^{3}} sin t dt? | 3x^{2} sin(x^{3}) | sin(x^{3}) | −cos(x^{3}) | 3x^{2} cos(x^{3}) | sin x | The integrand at the upper limit, sin(x^{3}), times the derivative of x^{3}, which is 3x^{2}.
NUM1#maths-u07-30-q3@1: Using F(x) = x^{3}/3, what is ∫₀^{3} x^{2} dx? | 9 | 0 |  | F(3) − F(0) = 27/3 = 9, the value the Riemann sums approach.
NUM3#maths-u07-30-q4@2: G(x) = ∫_{1}^{x^{2}} ln t dt. Find G′(2) to 3 decimal places. | 5.545 | 0.002 |  | By part 1 with the chain rule, G′(x) = ln(x^{2}) × 2x, so G′(2) = 4 ln 4 ≈ 5.545.
SA3#maths-u07-30-q5@1: Explain why d/dx ∫_{a}^{x} f(t) dt = f(x) for continuous f, and use part 2 to evaluate ∫_{0}^{π} sin x dx. | Let A(x) = ∫_{a}^{x} f(t) dt. A(x + h) − A(x) is the area of a thin strip of width h and height about f(x), so (A(x + h) − A(x))/h → f(x) as h → 0, because f is continuous; hence A′(x) = f(x). Part 2: −cos x is an antiderivative of sin x, so ∫_{0}^{π} sin x dx = −cos π − (−cos 0) = 1 + 1 = 2. | Defines the accumulation function ; Uses the thin-strip argument ; Notes the role of continuity ; Uses −cos x as an antiderivative ; Gets 2

## Integration by Substitution
S: Integration by substitution reverses the chain rule. Replacing an awkward part of the integrand with a new variable u often turns a hard integral into a standard one.
O: Integrate using a substitution, including changing limits
O: Recognise integrals of the form ∫ f′(x)/f(x) dx and ∫ f′(x)[f(x)]^{n} dx
LV: A level · Application
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
EV: established | Integration by substitution is the chain rule in reverse, and definite integrals can be evaluated entirely in the new variable once the limits are changed.
SRC: Department for Education, Mathematics AS and A level subject content: integration | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | secondary | 2020 | https://www.cengage.co.uk/
M1#maths-u07-31-q1@1: What is ∫ 2x e^{x^{2}} dx? | e^{x^{2}} + c | 2e^{x^{2}} + c | x^{2}e^{x^{2}} + c | e^{2x} + c | e^{x^{2}}/(2x) + c | With u = x^{2}, du = 2x dx, the integral becomes ∫ e^{u} du = e^{u} + c.
M2#maths-u07-31-q2@2: What is ∫ (2x + 3)^{4} dx? | (2x + 3)^{5}/10 + c | (2x + 3)^{5}/5 + c | 2(2x + 3)^{5}/5 + c | (2x + 3)^{3}/12 + c | 4(2x + 3)^{3} + c | With u = 2x + 3, dx = du/2, so ∫ u^{4}/2 du = u^{5}/10 + c.
NUM2#maths-u07-31-q3@1: Evaluate ∫_{0}^{2} 2x(x^{2} + 1)^{3} dx. | 156 | 0 |  | With u = x^{2} + 1, du = 2x dx and the limits become 1 and 5: [u^{4}/4] from 1 to 5 = (625 − 1)/4 = 156.
NUM3#maths-u07-31-q4@1,2: Evaluate ∫_{0}^{1} x^{2}e^{x^{3}} dx to 3 decimal places. | 0.573 | 0.001 |  | With u = x^{3}, du = 3x^{2} dx, so the integral is (1/3)∫_{0}^{1} e^{u} du = (e − 1)/3 ≈ 0.573.
SA3#maths-u07-31-q5@1: Evaluate ∫_{0}^{3} x/√(x + 1) dx using u = x + 1, showing how the limits and dx change. | u = x + 1 gives x = u − 1 and dx = du; the limits x = 0 and x = 3 become u = 1 and u = 4. The integral is ∫_{1}^{4} (u − 1)u^{−1/2} du = ∫_{1}^{4} (u^{1/2} − u^{−1/2}) du = [⅔u^{3/2} − 2u^{1/2}]_{1}^{4} = (16/3 − 4) − (2/3 − 2) = 8/3. | Writes x in terms of u and dx = du ; Changes the limits to 1 and 4 ; Splits into powers of u ; Integrates correctly ; Gets 8/3

## Integration by Parts
S: Integration by parts reverses the product rule. It integrates products like x e^{x} or x sin x by trading one integral for a simpler one.
O: Integrate products using integration by parts
O: Choose u and dv/dx well, including repeated and cyclic cases
LV: A level · Application
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
EV: established | Integration by parts, ∫ u dv = uv − ∫ v du, follows from integrating the product rule.
SRC: Department for Education, Mathematics AS and A level subject content: integration | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | secondary | 2020 | https://www.cengage.co.uk/
NUM1#maths-u07-32-q1@1: Evaluate ∫_{0}^{1} x e^{x} dx. | 1 | 0 |  | [x e^{x} − e^{x}]_{0}^{1} = (e − e) − (0 − 1) = 1.
M1#maths-u07-32-q2@1: For ∫ x^{2} ln x dx, which choice of u is best? | u = ln x | u = x^{2} | u = x^{2} ln x | u = 1 | u = x | Logarithms come first in LIATE, and ln x simplifies to 1/x when differentiated.
M3#maths-u07-32-q3@2: What is ∫ ln x dx? | x ln x − x + c | 1/x + c | x ln x + c | (ln x)^{2}/2 + c | ln x − x + c | Parts with u = ln x, dv = dx gives x ln x − ∫ 1 dx.
NUM2#maths-u07-32-q4@1: Evaluate ∫_{0}^{π} x sin x dx to 3 decimal places. | 3.142 | 0.001 |  | u = x, dv = sin x dx: [−x cos x]_{0}^{π} + ∫_{0}^{π} cos x dx = π + 0 = π ≈ 3.142.
SA3#maths-u07-32-q5@2: Find ∫ e^{x} cos x dx, explaining how the cyclic case is resolved. | Let I = ∫ e^{x} cos x dx. Parts with u = cos x, dv = e^{x} dx: I = e^{x} cos x + ∫ e^{x} sin x dx. Parts again with u = sin x: ∫ e^{x} sin x dx = e^{x} sin x − I. So I = e^{x} cos x + e^{x} sin x − I, giving 2I = e^{x}(sin x + cos x) and I = ½e^{x}(sin x + cos x) + c. The original integral reappears, so treat it as an unknown and solve. | Applies parts once correctly ; Applies parts a second time with consistent choices ; Recognises the original integral reappearing ; Solves 2I = e^{x}(sin x + cos x) ; Includes + c

## Partial Fraction Integration
S: Rational functions are integrated by splitting them into partial fractions (School 3), each of which integrates to a logarithm or a power. It's essential for integrals like ∫ 1/(x^{2} − 1) dx.
O: Integrate rational functions using partial fractions
O: Handle repeated factors and improper fractions
LV: A level · Application
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
EV: established | A proper rational function splits into partial fractions whose integrals are logarithms, powers or arctangents.
SRC: Department for Education, Mathematics AS and A level subject content: integration | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stroud KA, Booth DJ, Engineering Mathematics (8th edn, Bloomsbury 2020) | secondary | 2020 | https://www.bloomsbury.com/
M1#maths-u07-33-q1@1: What is ∫ (1/x − 1/(x + 1)) dx? | ln|x/(x + 1)| + c | ln|x(x + 1)| + c | 1/x^{2} + c | ln|x| + c | −1/(x(x + 1)) + c | ln|x| − ln|x + 1| combines to ln|x/(x + 1)|.
M2#maths-u07-33-q2@2: What is ∫ 2/(x^{2} − 1) dx? | ln|(x − 1)/(x + 1)| + c | 2 ln|x^{2} − 1| + c | ln|x^{2} − 1| + c | 2 arctan x + c | ln|(x + 1)/(x − 1)| + c | 2/(x^{2} − 1) = 1/(x − 1) − 1/(x + 1), which integrates to ln|x − 1| − ln|x + 1|.
NUM2#maths-u07-33-q3@1: Evaluate ∫_{0}^{1} 1/((x + 1)(x + 2)) dx to 3 decimal places. | 0.288 | 0.001 |  | 1/((x + 1)(x + 2)) = 1/(x + 1) − 1/(x + 2), so the integral is (ln 2 − ln 3) − (0 − ln 2) = ln(4/3) ≈ 0.288.
NUM3#maths-u07-33-q4@2: Evaluate ∫_{2}^{3} x^{2}/(x − 1) dx to 3 decimal places. | 4.193 | 0.001 |  | Divide first: x^{2}/(x − 1) = x + 1 + 1/(x − 1). So [x^{2}/2 + x + ln|x − 1|]_{2}^{3} = (4.5 + 3 + ln 2) − 4 = 3.5 + ln 2 ≈ 4.193.
SA3#maths-u07-33-q5@1,2: Find ∫ (5x + 1)/((x − 1)^{2}(x + 2)) dx, showing the partial fractions. | Write (5x + 1)/((x − 1)^{2}(x + 2)) = A/(x − 1) + B/(x − 1)^{2} + C/(x + 2). Then 5x + 1 = A(x − 1)(x + 2) + B(x + 2) + C(x − 1)^{2}. x = 1: 6 = 3B, so B = 2. x = −2: −9 = 9C, so C = −1. Comparing x^{2}: A + C = 0, so A = 1. The integral is ln|x − 1| − 2/(x − 1) − ln|x + 2| + c. | Uses the form with A/(x − 1) and B/(x − 1)^{2} ; Finds B = 2 and C = −1 ; Finds A = 1 ; Integrates the repeated term to −2/(x − 1) ; Gives the log terms and + c

## Trigonometric Integration
S: Integrating trigonometric functions uses standard results, identities to rewrite powers and products, and substitutions. Double angle formulas are the key tool for squares of sin and cos.
O: Integrate standard trigonometric functions
O: Use identities to integrate sin^{2} x, cos^{2} x and products
LV: A level · Application
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
EV: established | Double angle identities lower even powers of sine and cosine, and the substitution u = cos x or u = sin x handles odd powers.
SRC: Department for Education, Mathematics AS and A level subject content: integration | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stroud KA, Booth DJ, Engineering Mathematics (8th edn, Bloomsbury 2020) | secondary | 2020 | https://www.bloomsbury.com/
NUM1#maths-u07-34-q1@1: Evaluate ∫_{0}^{π} sin x dx. | 2 | 0 |  | [−cos x]_{0}^{π} = 1 − (−1) = 2.
M1#maths-u07-34-q2@1: What is ∫ sec^{2} 2x dx? | (1/2) tan 2x + c | tan 2x + c | 2 tan 2x + c | sec 2x + c | (1/2) sec^{2} 2x + c | d/dx tan 2x = 2 sec^{2} 2x, so divide by 2.
M2#maths-u07-34-q3@2: Which identity integrates sin^{2} x? | sin^{2} x = ½(1 − cos 2x) | sin^{2} x = 1 + cos^{2} x | sin^{2} x = 2 sin x cos x | sin^{2} x = tan^{2} x + 1 | sin^{2} x = cos 2x | The double angle formula replaces the square with a first-power cosine, which integrates directly.
NUM3#maths-u07-34-q4@2: Evaluate ∫_{0}^{π/2} sin^{3} x dx to 3 decimal places. | 0.667 | 0.001 |  | sin^{3} x = (1 − cos^{2} x) sin x; with u = cos x the integral is ∫_{0}^{1} (1 − u^{2}) du = 1 − 1/3 = 2/3 ≈ 0.667.
SA3#maths-u07-34-q5@2: Find ∫ sin^{2} x cos^{2} x dx, explaining which identities you use. | sin x cos x = ½ sin 2x, so sin^{2} x cos^{2} x = ¼ sin^{2} 2x. Then sin^{2} 2x = ½(1 − cos 4x), so the integrand is ⅛(1 − cos 4x). Integrating gives x/8 − (sin 4x)/32 + c. | Uses sin x cos x = ½ sin 2x ; Uses sin^{2} θ = ½(1 − cos 2θ) with θ = 2x ; Gets ⅛(1 − cos 4x) ; Integrates cos 4x to (sin 4x)/4 ; Gets x/8 − (sin 4x)/32 + c

## Improper Integrals
S: An improper integral has an infinite limit or an integrand that blows up somewhere in the interval. It's defined as a limit, and it may converge to a finite value or diverge.
O: Evaluate improper integrals with infinite limits or infinite integrands
O: Decide whether an improper integral converges
LV: Year 1 · Application
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
EV: established | ∫_{1}^{∞} x^{−p} dx converges exactly when p > 1, and ∫_{0}^{1} x^{−p} dx converges exactly when p < 1.
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | secondary | 2020 | https://www.cengage.co.uk/
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
NUM1#maths-u07-35-q1@1: Evaluate ∫_{2}^{∞} 4/x^{3} dx. | 0.5 | 0.001 |  | [−2/x^{2}]_{2}^{∞} = 0 − (−2/4) = 1/2.
M1#maths-u07-35-q2@1: Which integral diverges? | ∫_{1}^{∞} 1/x dx | ∫_{1}^{∞} 1/x^{2} dx | ∫_{0}^{∞} e^{−x} dx | ∫_{0}^{1} 1/√x dx | ∫_{1}^{∞} x^{−1.5} dx | ∫ 1/x = ln x, which grows without bound as x → ∞.
M3#maths-u07-35-q3@2: What is wrong with computing ∫_{−1}^{1} 1/x^{2} dx = [−1/x]_{−1}^{1} = −2? | The integrand is unbounded at x = 0, and the integral diverges | Nothing: the answer is −2 | The limits should be swapped | The antiderivative should be ln|x| | It should be 2 | A positive integrand can't give a negative area; the asymptote at 0 makes it improper and divergent.
NUM2#maths-u07-35-q4@1: Evaluate ∫_{0}^{4} 1/√x dx. | 4 | 0 |  | The integrand is unbounded at 0: lim_{a→0⁺} [2√x]_{a}^{4} = 4 − 0 = 4, so it converges.
SA2#maths-u07-35-q5@2: Decide whether ∫_{1}^{∞} x^{−p} dx converges for p = 2, p = 1 and p = ½, and state the general rule. | p = 2: [−1/x]_{1}^{b} = 1 − 1/b → 1, converges. p = 1: [ln x]_{1}^{b} = ln b → ∞, diverges. p = ½: [2√x]_{1}^{b} = 2√b − 2 → ∞, diverges. For p ≠ 1 the integral is (b^{1−p} − 1)/(1 − p), which has a finite limit only when 1 − p < 0. So it converges exactly when p > 1, to 1/(p − 1). | Writes each as a limit ; Shows p = 2 converges to 1 ; Shows p = 1 and p = ½ diverge ; States convergence exactly for p > 1 ; Justifies the rule from the general antiderivative

## Numerical Integration
S: Many integrals can't be found exactly, and data often comes as a table rather than a formula. Numerical methods (the trapezium rule, Simpson's rule) estimate definite integrals with known accuracy.
O: Apply the trapezium rule and Simpson's rule
O: Explain whether an estimate is an over- or underestimate and how to improve it
LV: A level · Application
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
P: **Investigate with the lab.** Beat 0.1% error with midpoints and at most 10 strips (the lab's challenge). Then double n and check the error falls by about four.
IX: riemann
K: Trapezium: (h/2)[ends + 2 × middles]; overestimates convex curves; Simpson's rule is more accurate.
!: Using the number of ordinates instead of the number of strips to find h.
Q: Does the trapezium rule over- or underestimate ∫ x^{2} dx? | Overestimate: x^{2} is convex.
Q: How many strips does Simpson's rule need? | An even number.
SUM: Numerical methods estimate definite integrals.
SUM: Convexity decides the error's direction for the trapezium rule.
EV: established | The trapezium rule overestimates the integral of a convex function and underestimates that of a concave one, and Simpson's rule is more accurate for smooth functions.
SRC: Department for Education, Mathematics AS and A level subject content: numerical methods | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Burden RL, Faires JD, Burden AM, Numerical Analysis (10th edn, Cengage 2016) | secondary | 2016 | https://www.cengage.co.uk/
NUM1#maths-u07-36-q1@1: Use the trapezium rule with 2 strips to estimate ∫_{0}^{2} x^{2} dx. | 3 | 0 |  | h = 1; (1/2)[0 + 2(1) + 4] = 3 (exact value 8/3).
M1#maths-u07-36-q2@1: In the trapezium rule with n strips on [a, b], what is h? | (b − a)/n | n/(b − a) | (b − a)/(n + 1) | b − a | 1/n | h is the strip width: the interval's length divided by the number of strips.
M2#maths-u07-36-q3@2: Which rule is usually more accurate for a smooth function with the same points? | Simpson's rule | The trapezium rule | They're always equal | A left Riemann sum | A right Riemann sum | Simpson's rule fits parabolas, giving errors of order h^{4} instead of h^{2}.
M2#maths-u07-36-q4@2: Doubling the number of strips in the midpoint rule changes the error by roughly what factor? | It divides it by about 4, since the error is O(h^{2}) | It halves it, since the error is O(h) | It doubles it, since more strips add rounding | It leaves it unchanged for smooth functions | It divides it by 16, since the error is O(h^{4}) | Halving h in a second-order rule quarters the error.
NUM2#maths-u07-36-q5@1: Use Simpson's rule with 4 strips to estimate ∫_{0}^{2} e^{x} dx, to 3 decimal places. | 6.391 | 0.001 |  | h = 0.5: (0.5/3)[1 + 4(1.6487 + 4.4817) + 2(2.7183) + 7.3891] ≈ 6.391, against the exact e^{2} − 1 ≈ 6.389.
SA3#maths-u07-36-q6@2: Use the trapezium rule with 2 strips to estimate ∫_{1}^{3} ln x dx. Is it an over- or underestimate? Explain, and say how to improve it. | h = 1: ½[ln 1 + 2 ln 2 + ln 3] ≈ ½(0 + 1.386 + 1.099) ≈ 1.242. ln x is concave (its second derivative −1/x^{2} is negative), so the chords lie below the curve and the estimate is too small; the exact value is 3 ln 3 − 2 ≈ 1.296. More strips (halving h roughly quarters the error) or Simpson's rule improve it. | Uses h = 1 and the correct ordinates ; Gets about 1.242 ; Shows ln x is concave ; Concludes underestimate ; Suggests more strips or Simpson's rule

## Arc Length and Surface Area
S: Integration measures more than areas: the length of a curve and the surface area of a solid of revolution come from adding up tiny straight pieces. These are Further Maths and first-year university results.
O: Calculate arc lengths of curves
O: Calculate surface areas of revolution
LV: Year 1 · Application
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
EV: established | Arc length is ∫ √(1 + (dy/dx)^{2}) dx, and the area of a surface of revolution about the x-axis is 2π ∫ y √(1 + (dy/dx)^{2}) dx.
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | secondary | 2020 | https://www.cengage.co.uk/
NUM1#maths-u07-37-q1@1: Find the length of the line y = 3x/4 from x = 0 to x = 4. | 5 | 0 |  | √(1 + 9/16) = 5/4, and ∫_{0}^{4} 5/4 dx = 5 (a 3-4-5 triangle).
M1#maths-u07-37-q2@1: Which integral gives the arc length of y = x^{2} from 0 to 1? | ∫_{0}^{1} √(1 + 4x^{2}) dx | ∫_{0}^{1} √(1 + x^{4}) dx | ∫_{0}^{1} (1 + 2x) dx | ∫_{0}^{1} 2πx^{2} dx | ∫_{0}^{1} √(1 + 2x) dx | dy/dx = 2x, so (dy/dx)^{2} = 4x^{2} goes under the root.
M2#maths-u07-37-q3@2: Rotating y = x from x = 0 to x = 1 about the x-axis gives a cone. What is its curved surface area? | π√2 | 2π | π | 2π√2 | π/√2 | S = 2π ∫_{0}^{1} x√2 dx = 2π√2 × ½ = π√2, matching πrl with r = 1, l = √2.
NUM3#maths-u07-37-q4@1: Find the arc length of y = (2/3)x^{3/2} from x = 0 to x = 3, to 3 decimal places. | 4.667 | 0.001 |  | dy/dx = √x, so L = ∫_{0}^{3} √(1 + x) dx = (2/3)[(1 + x)^{3/2}]_{0}^{3} = (2/3)(8 − 1) = 14/3 ≈ 4.667.
SA3#maths-u07-37-q5@2: Show that rotating y = √(r^{2} − x^{2}), −r ≤ x ≤ r, about the x-axis gives a surface area of 4πr^{2}. | dy/dx = −x/√(r^{2} − x^{2}) = −x/y, so 1 + (dy/dx)^{2} = (y^{2} + x^{2})/y^{2} = r^{2}/y^{2}. Then y√(1 + (dy/dx)^{2}) = y × r/y = r. So S = 2π ∫_{−r}^{r} r dx = 2πr × 2r = 4πr^{2}. | Differentiates y correctly ; Simplifies 1 + (dy/dx)^{2} to r^{2}/y^{2} ; Shows the integrand reduces to r ; Uses limits −r to r ; Gets 4πr^{2}

## Volumes of Revolution
S: Rotating a region around an axis creates a solid of revolution. Its volume comes from adding up thin circular discs: ∫ πy^{2} dx. This finds the volumes of vases, nose cones and other curved shapes.
O: Find volumes of revolution about the x- and y-axes
O: Find volumes for regions between two curves
LV: A level · Application
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
EV: established | The volume of a solid of revolution about the x-axis is π ∫ y^{2} dx, with washers subtracting the inner radius squared.
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | secondary | 2020 | https://www.cengage.co.uk/
NUM1#maths-u07-38-q1@1: Find the volume when y = x is rotated about the x-axis from x = 0 to x = 3, as a multiple of π. | 9 | 0 | π | π ∫_{0}^{3} x^{2} dx = π × 9: a cone of radius 3 and height 3.
M1#maths-u07-38-q2@1: Rotating y = √x from 0 to 2 about the x-axis gives a volume of: | 2π | 4π | π | 8π/3 | √2π | V = π ∫ y^{2} dx = π ∫_{0}^{2} x dx = π × [x^{2}/2]_{0}^{2} = 2π.
M3#maths-u07-38-q3@2: Which integral gives the volume between y = 3 and y = x^{2} + 1 (from x = −√2 to √2) rotated about the x-axis? | π ∫ (9 − (x^{2} + 1)^{2}) dx | π ∫ (3 − x^{2} − 1)^{2} dx | π ∫ (x^{2} + 1)^{2} dx | 2π ∫ x(2 − x^{2}) dx | π ∫ 9 dx | Washers: outer radius 3 and inner radius x^{2} + 1, so subtract the squares.
NUM2#maths-u07-38-q4@1: The curve y = x^{2} for 0 ≤ y ≤ 4 is rotated about the y-axis. Find the volume as a multiple of π. | 8 | 0 | π | About the y-axis V = π ∫ x^{2} dy = π ∫_{0}^{4} y dy = π[y^{2}/2]_{0}^{4} = 8π.
SA2#maths-u07-38-q5@2: The region between y = x and y = x^{2} is rotated about the x-axis. Find the volume and explain why π ∫ (x − x^{2})^{2} dx is wrong. | The curves meet at x = 0 and x = 1, with y = x outside. Washers: V = π ∫_{0}^{1} (x^{2} − x^{4}) dx = π(1/3 − 1/5) = 2π/15. Each cross-section is a ring of area π(R^{2} − r^{2}), not π(R − r)^{2}; the wrong integral gives π(1/3 − 1/2 + 1/5) = π/30, the volume of a solid whose radius is the gap between the curves. | Finds the limits 0 and 1 ; Identifies outer and inner radii ; Sets up π ∫ (x^{2} − x^{4}) dx ; Gets 2π/15 ; Explains that ring area is π(R^{2} − r^{2})

## Sequences and Series
S: A sequence is a list of numbers; a series is their sum. Arithmetic and geometric series have neat formulas, and sums of sequences lead naturally to infinite series and calculus.
O: Find sums of arithmetic and geometric series
O: Use sigma notation
LV: A level · Fluency
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
- The terms can be recovered from the partial sums: u_{n} = S_{n} − S_{n−1}.
P: **Investigate with the lab.** Choose the Geometric series topic and work through 10 problems. Check that |r| < 1 before using S∞ = a ÷ (1 − r), and read the worked method on any you get wrong.
IX: practice
K: Use S_{n} formulas for arithmetic and geometric series, standard sums for Σ r, Σ r^{2}, Σ r^{3}, and telescoping where terms cancel.
!: Forgetting that Σ_{r=1}^{n} c = nc, not c.
Q: What is 1 + 2 + … + 50? | 1,275.
Q: What is the sum of the first 5 terms of 1, 2, 4, 8, …? | 31.
SUM: Series sum sequences.
SUM: Standard formulas and telescoping evaluate them.
EV: established | Arithmetic and geometric series have closed-form sums, and Σ r, Σ r^{2} and Σ r^{3} have standard formulas.
SRC: Department for Education, Mathematics AS and A level subject content: sequences and series | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
NUM1#maths-u07-39-q1@1: Find the sum of the arithmetic series 5 + 8 + 11 + … + 62. | 670 | 0 |  | There are 20 terms ((62 − 5)/3 + 1), so S = 20 × (5 + 62)/2 = 670.
M1#maths-u07-39-q2@1: What is Σ_{r=1}^{4} r^{2}? | 30 | 16 | 10 | 100 | 20 | Square each of 1 to 4 and add: 1 + 4 + 9 + 16 = 30.
M2#maths-u07-39-q3@2: What is Σ_{r=1}^{n} 1/(r(r + 1))? | 1 − 1/(n + 1) | 1/(n + 1) | n | 1/n | ln n | It telescopes: (1 − ½) + (½ − ⅓) + … + (1/n − 1/(n + 1)).
NUM3#maths-u07-39-q4@1: What is the least number of terms of 3 + 6 + 12 + … whose sum exceeds 1,000? | 9 | 0 | terms | S_{n} = 3(2^{n} − 1) > 1000 needs 2^{n} > 334.3: S_{8} = 765 and S_{9} = 1,533, so n = 9.
SA3#maths-u07-39-q5@2: Use the standard sums to show that Σ_{r=1}^{n} r(r + 1) = n(n + 1)(n + 2)/3, and check your result for n = 2. | Σ r(r + 1) = Σ r^{2} + Σ r = n(n + 1)(2n + 1)/6 + n(n + 1)/2 = n(n + 1)[(2n + 1) + 3]/6 = n(n + 1)(2n + 4)/6 = n(n + 1)(n + 2)/3. Check: for n = 2 the sum is 1 × 2 + 2 × 3 = 8, and 2 × 3 × 4/3 = 8. | Splits into Σ r^{2} + Σ r ; Uses both standard formulas ; Takes out the common factor n(n + 1)/6 ; Simplifies to n(n + 1)(n + 2)/3 ; Checks a small case

## Infinite Series
S: An infinite series adds infinitely many terms. Some add up to a finite number, like ½ + ¼ + ⅛ + … = 1, and some grow without limit. Infinite series define functions like e^{x} and sin x.
O: Find the sum to infinity of a convergent geometric series
O: Explain what it means for an infinite series to have a sum
LV: A level · Application
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
EV: established | A geometric series converges to a/(1 − r) exactly when |r| < 1, and the harmonic series diverges.
SRC: Department for Education, Mathematics AS and A level subject content: sequences and series | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Spivak M, Calculus (4th edn, Publish or Perish 2008) | secondary | 2008 | https://www.publishorperish.com/
NUM1#maths-u07-40-q1@1: Find the sum to infinity of 27 − 9 + 3 − 1 + …. | 20.25 | 0.001 |  | a = 27 and r = −1/3, so S = 27/(4/3) = 20.25.
M1#maths-u07-40-q2@1: For which r does a geometric series converge? | |r| < 1 | r > 1 | r = 1 | r < 0 | All r | The terms shrink to zero fast enough only when |r| < 1.
M3#maths-u07-40-q3@2: Why does 1 + 1/2 + 1/3 + 1/4 + … diverge although its terms tend to 0? | Its partial sums grow without bound (like ln n) | It doesn't: it converges to 2 | Its terms are negative | It's a geometric series with r = 1 | It converges to π^{2}/6 | Grouping terms shows each block of terms adds at least ½, so the sum is unbounded.
NUM2#maths-u07-40-q4@1: A geometric series has first term 12 and second term 9. Find its sum to infinity. | 48 | 0 |  | r = 9/12 = 0.75, which satisfies |r| < 1, so S_{∞} = 12/(1 − 0.75) = 48.
SA2#maths-u07-40-q5@2: Explain, using partial sums, why 0.999… = 1. | 0.999… means 9/10 + 9/100 + 9/1000 + …, a geometric series with a = 9/10 and r = 1/10. The partial sum S_{n} = 1 − (1/10)^{n}, which gets as close to 1 as we like, so the limit of the partial sums is 1. The sum to infinity a/(1 − r) = (9/10)/(9/10) = 1 confirms it. The value of an infinite series is defined as that limit, so 0.999… equals 1 exactly. | Writes the decimal as a geometric series ; Identifies a = 9/10 and r = 1/10 ; Gives S_{n} = 1 − 10^{−n} ; Takes the limit ; Explains that the sum is defined as the limit

## Convergence and Divergence
S: Deciding whether an infinite series converges is a central question in analysis. Convergence tests (comparison, ratio, integral and alternating series tests) answer it without finding the sum.
O: Apply standard convergence tests
O: Distinguish absolute and conditional convergence
LV: Year 1 · Application
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
!: Using the ratio test on a p-series: for Σ 1/n^{p} the ratio tends to 1 for every p, so it says nothing. Use the p-series, comparison or integral test instead.
K: Check the divergence test first; then compare with p-series or geometric series, or use the ratio or integral test.
!: Concluding a series converges because its terms tend to zero.
Q: Does Σ 1/n^{3} converge? | Yes: it's a p-series with p = 3 > 1.
Q: What does the ratio test conclude if L = 1? | Nothing: it's inconclusive.
SUM: Convergence tests decide behaviour without summing.
SUM: Absolute convergence is the safer kind.
EV: established | Σ 1/n^{p} converges exactly when p > 1, and a ratio limit below 1 guarantees convergence.
SRC: Spivak M, Calculus (4th edn, Publish or Perish 2008) | secondary | 2008 | https://www.publishorperish.com/
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | secondary | 2020 | https://www.cengage.co.uk/
M1#maths-u07-41-q1@1: Which series converges? | Σ 1/n^{2} | Σ 1/n | Σ 1/√n | Σ 1 | Σ n | A p-series with p = 2 > 1 converges (to π^{2}/6).
M2#maths-u07-41-q2@2: The ratio test gives L = 3 for a series. What follows? | It diverges | It converges | It's inconclusive | It converges absolutely | It sums to 3 | L > 1 means the terms eventually grow, so the series diverges.
NUM2#maths-u07-41-q3@1: What limit L does the ratio test give for Σ n^{2}/3^{n}? Give 3 decimal places. | 0.333 | 0.001 |  | a_{n+1}/a_{n} = (n + 1)^{2}/(3n^{2}) → 1/3, and 1/3 < 1, so the series converges.
M3#maths-u07-41-q4@2: Which series converges conditionally but not absolutely? | Σ (−1)^{n}/√n | Σ (−1)^{n}/n^{2} | Σ (−1)^{n} | Σ 1/√n | Σ (−1)^{n}/2^{n} | The alternating series test gives convergence, but Σ 1/√n is a p-series with p = ½ ≤ 1, which diverges; the n^{2} and 2^{n} series converge absolutely.
SA3#maths-u07-41-q5@1: Decide whether Σ 1/(n^{2} + 1) and Σ n/(n + 1) converge, naming the test you use each time. | Σ 1/(n^{2} + 1): 0 < 1/(n^{2} + 1) < 1/n^{2}, and Σ 1/n^{2} converges (p = 2 > 1), so by comparison it converges. Σ n/(n + 1): the terms tend to 1, not 0, so it diverges by the divergence test. | Uses comparison with 1/n^{2} ; States the p-series result ; Concludes the first converges ; Shows the terms of the second tend to 1 ; Concludes the second diverges by the divergence test

## Power Series
S: A power series is an infinite polynomial, Σ a_{n}(x − c)^{n}. Inside its interval of convergence it behaves like a function you can differentiate and integrate term by term.
O: Find the radius and interval of convergence of a power series
O: Differentiate and integrate power series term by term
LV: Year 1 · Application
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
EV: established | A power series converges inside its radius of convergence, where it can be differentiated and integrated term by term.
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | secondary | 2020 | https://www.cengage.co.uk/
SRC: Spivak M, Calculus (4th edn, Publish or Perish 2008) | secondary | 2008 | https://www.publishorperish.com/
NUM1#maths-u07-42-q1@1: What is the radius of convergence of Σ x^{n}/3^{n}? | 3 | 0 |  | It's geometric with ratio x/3, converging when |x/3| < 1, so R = 3.
M1#maths-u07-42-q2@1: Which function has the power series x − x^{3}/3 + x^{5}/5 − …? | arctan x | sin x | ln(1 + x) | e^{−x} | tan x | Integrating 1/(1 + x^{2}) = 1 − x^{2} + x^{4} − … term by term gives arctan x.
M2#maths-u07-42-q3@2: For Σ x^{n}/n, what is the interval of convergence? | −1 ≤ x < 1 | −1 < x < 1 | −1 ≤ x ≤ 1 | x < 1 | All real x | R = 1; at x = −1 it's the alternating harmonic series (converges), at x = 1 the harmonic series (diverges).
NUM3#maths-u07-42-q4@1: Σ_{n=1}^{∞} (x − 2)^{n}/(n × 5^{n}) converges on an interval whose left endpoint is included. What is that endpoint? | -3 | 0 |  | The ratio test gives |x − 2|/5 < 1, so R = 5 and the interval runs from −3 to 7. At x = −3 the series is Σ (−1)^{n}/n, which converges; at x = 7 it is the harmonic series, which diverges.
SA3#maths-u07-42-q5@2: Starting from 1/(1 − x) = Σ x^{n}, find a power series for x/(1 − x)^{2} and use it to find Σ_{n=1}^{∞} n/2^{n}. | Differentiate term by term for |x| < 1: 1/(1 − x)^{2} = Σ_{n=1}^{∞} n x^{n−1}. Multiply by x: x/(1 − x)^{2} = Σ_{n=1}^{∞} n x^{n}. At x = ½, inside the radius, Σ n/2^{n} = (½)/(¼) = 2. | Differentiates the geometric series term by term ; Gets Σ n x^{n−1} = 1/(1 − x)^{2} ; Multiplies by x ; Checks x = ½ is inside the radius ; Gets 2

## Taylor Series
S: A Taylor series represents a function as a power series built from its derivatives at one point. Truncating it gives Taylor polynomials, the best polynomial approximations near that point, used in physics, engineering and computing.
O: Find Taylor series and polynomials about a point
O: Use Taylor polynomials to approximate values and understand the error
LV: Year 1 · Application
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
EV: established | A Taylor polynomial of degree n approximates f near a, with error given by Taylor's remainder term.
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | secondary | 2020 | https://www.cengage.co.uk/
SRC: Spivak M, Calculus (4th edn, Publish or Perish 2008) | secondary | 2008 | https://www.publishorperish.com/
M1#maths-u07-43-q1@1: What is the coefficient of (x − a)^{2} in a Taylor series? | f″(a)/2 | f″(a) | 2f″(a) | f′(a)/2 | f(a)/2 | Each term is f^{(n)}(a)(x − a)^{n}/n!, so the x^{2} term has f″(a)/2! = f″(a)/2.
M2#maths-u07-43-q2@2: The linear approximation of e^{x} about x = 0 gives e^{0.1} ≈ | 1.1 | 1.0 | 1.105 | 0.9 | 1.01 | e^{x} ≈ 1 + x near 0, so e^{0.1} ≈ 1.1 (true value 1.105…).
NUM2#maths-u07-43-q3@2: Use the degree-2 Taylor polynomial of ln x about x = 1 to estimate ln 1.2. | 0.18 | 0.0005 |  | ln x ≈ (x − 1) − (x − 1)^{2}/2, so ln 1.2 ≈ 0.2 − 0.02 = 0.18 (true value 0.1823…).
NUM3#maths-u07-43-q4@1: Find the coefficient of (x − 1)^{3} in the Taylor series of e^{x} about x = 1, to 3 decimal places. | 0.453 | 0.001 |  | Every derivative of e^{x} at 1 is e, so the coefficient is e/3! = e/6 ≈ 0.453.
SA3#maths-u07-43-q5@2: Use sin x ≈ x − x^{3}/6 to estimate sin 0.5 and bound the error with Taylor's theorem. | sin 0.5 ≈ 0.5 − 0.125/6 ≈ 0.479167. The x^{4} term of the series is zero, so the polynomial is also the degree-4 one, and the remainder is f^{(5)}(ξ)x^{5}/5! with |f^{(5)}| = |cos ξ| ≤ 1. So the error is at most 0.5^{5}/120 ≈ 0.00026. The true value 0.479426 differs by 0.000259, within the bound. | Computes the estimate 0.4792 ; Uses the remainder f^{(n+1)}(ξ)x^{n+1}/(n + 1)! ; Bounds the derivative by 1 ; Gets an error bound of about 0.00026 ; Compares with the true value

## Maclaurin Series
S: A Maclaurin series is a Taylor series about x = 0. The Maclaurin series of e^{x}, sin x, cos x and ln(1 + x) are among the most important formulas in mathematics, and combine to give Euler's formula.
O: State and derive the standard Maclaurin series
O: Combine standard series by substitution, multiplication and differentiation
LV: A level · Application
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
P: Series also evaluate integrals with no elementary antiderivative: integrating e^{−x^{2}} term by term gives ∫_{0}^{1} e^{−x^{2}} dx ≈ 1 − 1/3 + 1/10 − 1/42 ≈ 0.743 (true value 0.747 to 3 d.p.).
K: Learn the series for e^{x}, sin x, cos x, ln(1 + x) and (1 + x)^{n}, with their validity, and combine them algebraically.
!: Using ln(1 + x) or (1 + x)^{n} series outside their ranges of validity.
Q: What is the Maclaurin series of cos x up to x^{4}? | 1 − x^{2}/2 + x^{4}/24.
Q: For which x is the series for ln(1 + x) valid? | −1 < x ≤ 1.
SUM: Maclaurin series expand functions about 0.
SUM: The standard series combine to give many more.
EV: established | e^{x}, sin x and cos x equal their Maclaurin series for all x, and ln(1 + x) for −1 < x ≤ 1.
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | secondary | 2020 | https://www.cengage.co.uk/
NUM1#maths-u07-44-q1@1: Use the first three terms of the series for e^{x} to estimate e^{0.2}, to 3 decimal places. | 1.22 | 0.0005 |  | 1 + 0.2 + 0.04/2 = 1.22 (true value 1.2214…).
M1#maths-u07-44-q2@1: What is the coefficient of x^{3} in the Maclaurin series of sin x? | −1/6 | 1/6 | 1/3 | −1/3 | 0 | sin x = x − x^{3}/3! + x^{5}/5! − …, and 3! = 6, so the coefficient is −1/6.
M3#maths-u07-44-q3@2: What is the Maclaurin series of e^{−x^{2}} up to x^{4}? | 1 − x^{2} + x^{4}/2 | 1 − x^{2} + x^{4} | 1 + x^{2} + x^{4}/2 | 1 − 2x + 2x^{2} | 1 − x^{2}/2 + x^{4}/24 | Substitute −x^{2} into e^{u} = 1 + u + u^{2}/2: 1 − x^{2} + x^{4}/2.
NUM2#maths-u07-44-q4@2: Using Maclaurin series, find lim_{x→0} (x − sin x)/x^{3}, to 3 decimal places. | 0.167 | 0.001 |  | x − sin x = x^{3}/6 − x^{5}/120 + …, so dividing by x^{3} gives 1/6 − x^{2}/120 + … → 1/6 ≈ 0.167.
SA2#maths-u07-44-q5@1,2: Derive the Maclaurin series of ln(1 + x) up to x^{3} from its derivatives, state where it is valid, and use it to estimate ln 1.1. | f(0) = 0; f′(x) = 1/(1 + x), so f′(0) = 1; f″(x) = −1/(1 + x)^{2}, so f″(0) = −1; f‴(x) = 2/(1 + x)^{3}, so f‴(0) = 2. The series is x − x^{2}/2 + 2x^{3}/3! = x − x^{2}/2 + x^{3}/3, valid for −1 < x ≤ 1. With x = 0.1: 0.1 − 0.005 + 0.000333 ≈ 0.09533 (true 0.09531). | Finds f(0), f′(0), f″(0) and f‴(0) ; Divides by the factorials ; Gets x − x^{2}/2 + x^{3}/3 ; States −1 < x ≤ 1 ; Estimates ln 1.1 ≈ 0.0953
`;
