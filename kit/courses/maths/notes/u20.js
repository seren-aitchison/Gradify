// School 20: Mathematical Modelling and Applied Mathematics. Format: kit/course/notes.js. Standard: docs/CURRICULUM_CONTENT_STANDARD.md
// Modelling methods, life sciences, chemistry, physics and engineering, and complex systems.
export default `
## Applied Mathematics
S: Applied mathematics develops and uses mathematical methods to understand real-world problems in science, engineering, medicine and society. It moves between a problem and its model, using analysis, computation and data, and judges success by insight and prediction.
O: Describe the scope and methods of applied mathematics
O: Explain how applied mathematics differs from, and feeds, pure mathematics
T: Applied mathematics | Mathematics developed or used to model, analyse and solve problems arising outside mathematics
T: Well-posed problem | Hadamard's criteria: a solution exists, is unique and depends continuously on the data
H: Core methods
- Differential equations (ordinary and partial) for change in time and space.
- Asymptotic and perturbation methods for small or large parameters.
- Numerical computation and simulation (School 19).
- Probability, statistics and optimisation for uncertainty and decisions.
H: Fields of application
- Physics and engineering: fluids, solids, electromagnetism.
- Biology and medicine: populations, epidemics, physiology.
- Finance, climate, networks and data science.
H: Two-way traffic with pure mathematics
- Fourier analysis came from heat flow; distributions from physics.
- Group theory now underpins crystallography and particle physics.
- Problems from applications motivate new theory (solitons, chaos).
- Rigour checks that methods are trustworthy.
X: Is the problem "find u with u′ = u, u(0) = 1" well posed?
> Existence: u = eᵗ solves it
> Uniqueness: by the Picard–Lindelöf theorem, there's only one solution
> Continuous dependence: u(0) = 1 + ε gives (1 + ε)eᵗ, close to eᵗ on bounded intervals; so it's well posed
K: Applied mathematics models real problems with differential equations, asymptotics, computation and statistics; well-posedness matters; it exchanges ideas with pure mathematics in both directions.
!: Thinking applied mathematics is only about using existing formulas.
Q: What are Hadamard's three conditions for well-posedness? | Existence, uniqueness and continuous dependence on data.
Q: Which branch of pure mathematics grew from studying heat flow? | Fourier analysis.
SUM: Applied maths connects maths and the world.
SUM: Methods and theory develop together.
SRC: Higham NJ (ed), The Princeton Companion to Applied Mathematics (Princeton University Press 2015) | textbook | 2015 | https://press.princeton.edu/
SRC: Lin CC, Segel LA, Mathematics Applied to Deterministic Problems in the Natural Sciences (SIAM 1988) | textbook | 1988 | https://epubs.siam.org/
NUM1#maths-u20-01-q1@1: For u′ = u, u(0) = 1.01, what is u(1) to 4 decimal places? | 2.7456 | 0.0001 |  | u(1) = 1.01e ≈ 2.7456, close to e ≈ 2.7183: small data changes give small solution changes.
M1#maths-u20-01-q2@1: Which of Hadamard's conditions does the backward heat equation fail? | Continuous dependence on the data, since tiny changes grow explosively | Existence of a solution for every smooth initial state | Uniqueness of solutions for given data | Linearity of the governing equation | Having any physical meaning at all | Running diffusion backwards amplifies high-frequency errors without bound.
M2#maths-u20-01-q3@2: Why do applied mathematicians care about well-posedness? | An ill-posed model's predictions can be destroyed by small errors in data | Well-posed problems are always linear, which makes them easy to solve | Ill-posed problems have no solutions at all, so they can be ignored | It only matters in pure mathematics, never in applications | They don't care about it, since numerical methods fix any problem | Real data are never exact, so useful models must be stable under small perturbations.

## Mathematical Modelling
S: Mathematical modelling turns a real situation into mathematics, solves or simulates it, and checks the results against reality. Good models are as simple as possible while capturing what matters, and every model rests on assumptions that should be stated and tested.
O: Follow the modelling cycle from problem to validated model
O: Choose between empirical, mechanistic, deterministic and stochastic models
T: Modelling cycle | Formulate, solve, interpret and validate, then refine the model and repeat
T: Mechanistic model | A model built from underlying processes or laws, rather than fitted purely to data
H: The cycle
- Identify the question and the key variables.
- State assumptions and simplifications explicitly.
- Formulate equations, solve or simulate.
- Interpret results; compare with data; refine.
H: Types of model
- Empirical (data-driven) versus mechanistic (process-based).
- Deterministic versus stochastic.
- Discrete versus continuous; static versus dynamic.
- Lumped (ODEs) versus spatial (PDEs).
H: Judging a model
- "All models are wrong, but some are useful" (Box).
- Parsimony: fewer parameters, less overfitting.
- Predictive tests on data not used for fitting.
- Robustness of conclusions to assumptions.
X: Model a cooling cup of tea that starts at 90 °C in a 20 °C room.
> Assume the rate of cooling is proportional to the temperature difference (Newton's law): dT/dt = −k(T − 20)
> Solve: T(t) = 20 + 70e^{−kt}
> Fit k from one measurement (say 60 °C at 10 minutes: k = ln(70/40)/10 ≈ 0.056 per minute), then test against later readings
K: Modelling cycles through formulation, solution, interpretation and validation; models may be empirical or mechanistic, deterministic or stochastic; parsimony and predictive testing judge them.
!: Fitting a model to all the data and then claiming it's validated by the same data.
Q: Who said "all models are wrong, but some are useful"? | George Box.
Q: What is a mechanistic model? | One built from underlying processes or laws.
SUM: Models simplify reality on purpose.
SUM: Test them against new data.
SRC: Bender EA, An Introduction to Mathematical Modeling (Wiley 1978; Dover 2000) | textbook | 2000 | https://store.doverpublications.com/
SRC: Box GEP, Science and statistics, Journal of the American Statistical Association 71(356), 791 | journal | 1976 | https://doi.org/10.1080/01621459.1976.10480949
NUM1#maths-u20-02-q1@1: Using T(t) = 20 + 70e^{−0.056t}, predict the tea's temperature in °C after 20 minutes. | 42.9 | 0.2 | °C | 70e^{−1.12} ≈ 70 × 0.326 ≈ 22.8, so T ≈ 42.8 °C.
M1#maths-u20-02-q2@1: Which step of the modelling cycle compares predictions with independent data? | Validation | Formulation | Simplification | Non-dimensionalisation | Parameter naming | Validation tests whether the model's outputs match observations it wasn't fitted to.
M2#maths-u20-02-q3@2: Why is parsimony valued in modelling? | Models with fewer parameters are less prone to overfitting and easier to interpret and test | Simple models are always correct, so extra detail only adds risk | Complex models can't be solved, so simplicity is the only option | Parsimony guarantees accurate predictions on any new data set | It isn't valued: the most detailed model is always preferred | Each extra parameter can absorb noise rather than signal.

## Dimensional Analysis
S: Dimensional analysis uses the units of physical quantities to constrain how they can be related. The Buckingham Π theorem reduces a problem to relations between dimensionless groups, often predicting formulas up to a constant without solving any equations.
O: Check dimensional consistency and find dimensionless groups
O: Apply the Buckingham Π theorem
T: Dimension | The physical nature of a quantity expressed in base dimensions such as mass M, length L and time T
T: Buckingham Π theorem | A relation among n variables involving k independent dimensions can be rewritten as a relation among n − k dimensionless groups
H: Basics
- Every term in a valid equation has the same dimensions.
- Velocity LT^{−1}, force MLT^{−2}, energy ML^{2}T^{−2}.
- Arguments of exp, log and sin must be dimensionless.
H: The Π theorem
- List variables and their dimensions.
- Count independent dimensions k; form n − k groups.
- The physics becomes Π₁ = f(Π₂, …).
- Famous groups: Reynolds, Mach, Froude numbers.
H: Examples
- Pendulum period: T ∝ √(L/g), independent of mass.
- G. I. Taylor estimated the 1945 Trinity test's energy from photographs: E ∝ ρR^{5}/t^{2}.
- Drag force F = ½ρv^{2}A C_{D}(Re).
X: Find how a pendulum's period T depends on length L, mass m and gravity g.
> Try T = L^{a} m^{b} g^{c}: dimensions T = L^{a} M^{b} (LT^{−2})^{c}
> Matching: M: b = 0; T: −2c = 1 gives c = −½; L: a + c = 0 gives a = ½
> T = C√(L/g), with C = 2π found from the full analysis
K: Equations must be dimensionally consistent; the Π theorem reduces n variables with k dimensions to n − k dimensionless groups; it predicts scaling laws like T ∝ √(L/g).
!: Forgetting that dimensional analysis can't give dimensionless constants such as 2π.
Q: What are the dimensions of force? | MLT^{−2}.
Q: How many dimensionless groups arise from 5 variables with 3 dimensions? | 2.
SUM: Units constrain physical laws.
SUM: Π groups reduce variables.
SRC: Barenblatt GI, Scaling, Self-Similarity, and Intermediate Asymptotics (Cambridge University Press 1996) | textbook | 1996 | https://www.cambridge.org/
SRC: Taylor GI, The formation of a blast wave by a very intense explosion II, Proceedings of the Royal Society A 201, 175 | journal | 1950 | https://doi.org/10.1098/rspa.1950.0050
NUM1#maths-u20-03-q1@1: A pendulum 1 m long has period about 2 s. Using T ∝ √L, what is the period of a 4 m pendulum in seconds? | 4 | 0 | s | Quadrupling the length doubles the period: 2 × √4 = 4 s.
M1#maths-u20-03-q2@1: What are the dimensions of energy? | ML^{2}T^{−2} | MLT^{−2} | ML^{2}T^{−1} | MLT^{−1} | L^{2}T^{−2} | Energy is force times distance: MLT^{−2} × L = ML^{2}T^{−2}.
M3#maths-u20-03-q3@2: Why can't dimensional analysis determine the 2π in T = 2π√(L/g)? | Pure numbers are dimensionless, so units place no constraint on them | It always determines every constant, so 2π must come from it | 2π has units of time, so it follows from the dimensions | The formula is wrong, so there's no constant to find | It can determine it once the mass is included | Only the full dynamical solution fixes the dimensionless prefactor.

## Similarity Analysis
S: Similarity analysis finds solutions whose shape stays the same as they spread or shrink, needing only a rescaled variable. These similarity solutions turn PDEs into ODEs and describe heat spreading from a point, boundary layers and blast waves.
O: Find similarity variables for simple PDEs
O: Explain geometric, kinematic and dynamic similarity in model testing
T: Similarity solution | A solution of the form u(x, t) = t^{α} f(x/t^{β}), whose profile keeps its shape under rescaling
T: Dynamic similarity | Equality of the relevant dimensionless groups (such as Re) between a model and the full-scale system
H: Similarity solutions
- Heat equation u_{t} = Du_{xx}: similarity variable η = x/√(Dt).
- The point source gives the Gaussian u = (1/√(4πDt)) e^{−x^{2}/4Dt}.
- Blasius boundary layer on a flat plate: η = y√(U/νx).
- Self-similar solutions often describe intermediate asymptotics (Barenblatt).
H: Model testing
- Geometric similarity: same shape, scaled size.
- Kinematic similarity: similar velocity patterns.
- Dynamic similarity: matching dimensionless numbers (Reynolds, Froude, Mach).
- Often only some groups can be matched at once (ship models match Froude, not Reynolds).
H: Finding similarity variables
- Look for scaling symmetries: x → λx, t → λ^{2}t leaves the heat equation unchanged.
- Combine variables into invariants.
- Conservation laws fix exponents (total heat is constant).
X: Show the heat equation u_{t} = u_{xx} is unchanged by x → λx, t → λ^{2}t, and give the similarity variable.
> With X = λx and T = λ^{2}t: u_{T} = λ^{−2}u_{t} and u_{XX} = λ^{−2}u_{xx}
> Both sides scale equally, so the equation is invariant
> The combination η = x/√t is invariant, so seek u = f(η) (times a power of t)
K: Similarity solutions use scaling symmetries to reduce PDEs to ODEs; η = x/√(Dt) for diffusion; model tests need dynamic similarity via dimensionless groups, though not all can be matched.
!: Testing a scale model without matching the dimensionless numbers that govern the flow.
Q: What is the similarity variable for the heat equation? | η = x/√(Dt).
Q: Which number do ship models usually match? | The Froude number.
SUM: Self-similar shapes simplify PDEs.
SUM: Dimensionless numbers transfer results across scales.
SRC: Barenblatt GI, Scaling, Self-Similarity, and Intermediate Asymptotics (Cambridge University Press 1996) | textbook | 1996 | https://www.cambridge.org/
SRC: Schlichting H, Gersten K, Boundary-Layer Theory (9th edn, Springer 2017) | textbook | 2017 | https://link.springer.com/
NUM1#maths-u20-04-q1@1: For diffusion with D = 10^{−9} m^{2}/s, estimate the spreading length √(Dt) in mm after t = 1000 s. | 1 | 0.01 | mm | √(10^{−9} × 1000) = √(10^{−6}) = 10^{−3} m = 1 mm.
M1#maths-u20-04-q2@1: To test a 1:20 model aircraft wing fairly, which quantity should match full scale? | The Reynolds number (and Mach number for high speeds) | The wing's mass, scaled down by the factor 20^{3} | The air temperature only, kept the same as in flight | The model's colour and surface paint finish | The wing area, kept the same as full scale | Dynamic similarity requires the governing dimensionless numbers to be equal.
M2#maths-u20-04-q3@2: Why can't a ship model match both Froude and Reynolds numbers in water? | Matching Froude needs velocity to scale like √L, while Reynolds needs it to scale like 1/L, which conflict | Water has no viscosity, so the Reynolds number is undefined for ship models | Froude numbers don't apply to ships, only to rivers and open channels | Both are matched automatically whenever the model is geometrically similar | They can both be matched easily by running the model at the full-scale speed | With the same fluid, the two scalings are incompatible, so corrections are applied.

## Scaling Laws
S: Scaling laws describe how one quantity changes as a power of another, such as metabolic rate rising as body mass to the ¾. Seen on log–log plots as straight lines, they reveal underlying mechanisms and let us extrapolate across sizes.
O: Identify power laws and estimate exponents from log–log data
O: Explain allometric and physical scaling examples
T: Power law | A relation y = Cxᵅ, a straight line of slope α on a log–log plot
T: Allometry | The study of how biological traits scale with body size
H: Recognising power laws
- log y = log C + α log x.
- Doubling x multiplies y by 2^{α}.
- Exponents from fitting slopes on log–log plots (with care about noise and range).
H: Examples
- Kleiber's law: metabolic rate ∝ M^{3/4}.
- Square–cube law: strength ∝ L^{2}, weight ∝ L^{3}, so giants need thicker bones.
- Kepler's third law: T^{2} ∝ a^{3}.
- City metrics: infrastructure scales sublinearly, wages and innovation superlinearly (Bettencourt, West).
H: Cautions
- Many apparent power laws are better fitted by other distributions (Clauset et al.).
- Exponents hold over limited ranges.
- Correlation on log–log axes isn't mechanism.
X: Mouse mass 0.02 kg, elephant 4000 kg. If metabolic rate ∝ M^{3/4}, how many times larger is the elephant's rate?
> Mass ratio = 4000/0.02 = 200,000
> Rate ratio = 200,000^{0.75}
> log₁₀(200,000) ≈ 5.3, × 0.75 ≈ 3.98, so the ratio ≈ 9,500: much less than 200,000
K: Power laws are straight lines on log–log plots; allometric and physical examples include Kleiber's law and the square–cube law; fit exponents carefully over limited ranges.
!: Declaring a power law from a few points on a log–log plot without testing alternatives.
Q: What does Kleiber's law state? | Metabolic rate scales as body mass to the ¾.
Q: What is the slope of y = 5x^{3} on a log–log plot? | 3.
SUM: Power laws link sizes.
SUM: Fit exponents with care.
SRC: West GB, Brown JH, Enquist BJ, A general model for the origin of allometric scaling laws in biology, Science 276(5309), 122 | journal | 1997 | https://doi.org/10.1126/science.276.5309.122
SRC: Clauset A, Shalizi CR, Newman MEJ, Power-law distributions in empirical data, SIAM Review 51(4), 661 | journal | 2009 | https://doi.org/10.1137/070710111
NUM1#maths-u20-05-q1@1: If y ∝ x^{3/4}, by what factor does y grow when x increases 16-fold? | 8 | 0 |  | 16^{3/4} = (2^{4})^{3/4} = 2^{3} = 8.
M1#maths-u20-05-q2@1: Two points on a log–log plot are (x, y) = (10, 100) and (1000, 10,000). What exponent α fits? | 1 | 2 | 0.5 | 3 | 10 | Slope = (log 10,000 − log 100)/(log 1000 − log 10) = (4 − 2)/(3 − 1) = 1.
M2#maths-u20-05-q3@2: What does the square–cube law imply for scaling up an animal by a factor of 10 in length? | Weight rises 1000-fold but bone strength only 100-fold, so bones must be relatively thicker | Weight and strength both rise 1000-fold, so the proportions can stay the same | Strength rises faster than weight, so larger animals can have thinner bones | Nothing changes, since all animals scale geometrically without any problem | Weight falls as size increases, because density decreases with length | Cross-sectional areas scale as L^{2} and volumes as L^{3}.

## Asymptotic Analysis
S: Asymptotic analysis studies how functions and solutions behave when a parameter becomes very small or very large. Asymptotic expansions can be extremely accurate even when they diverge, and they reveal the dominant balance in a problem.
O: Use O, o and ~ notation and find leading-order behaviour
O: Construct and interpret asymptotic expansions, including divergent ones
T: Asymptotic equivalence | f ~ g as x → x₀ when f/g → 1
T: Asymptotic expansion | A series f ~ Σ aₙφₙ(x) where each truncation's error is smaller than the last term kept, as x → x₀
H: Notation
- f = O(g): |f| ≤ C|g| near x₀.
- f = o(g): f/g → 0.
- f ~ g: f/g → 1. Stirling: n! ~ √(2πn)(n/e)ⁿ.
H: Expansions
- Taylor series are asymptotic but often convergent.
- Asymptotic series may diverge but give excellent approximations when truncated optimally (at the smallest term).
- Example: ∫₀^{∞} e^{−t}/(1 + xt) dt ~ 1 − x + 2!x^{2} − 3!x^{3} + … as x → 0.
H: Methods
- Dominant balance: compare terms to find which balance as ε → 0.
- Laplace's method for ∫ e^{λf(t)} dt as λ → ∞.
- Stationary phase and steepest descent for oscillatory integrals.
- WKB approximations for differential equations.
X: Use Stirling's formula to estimate 10! and compare with the true value 3,628,800.
> √(2π × 10) ≈ 7.927
> (10/e)^{10} ≈ 3.6788^{10} ≈ 453,999
> Product ≈ 3,598,696: within 0.83% of the true value
K: Asymptotic analysis finds leading behaviour as parameters approach limits; O, o and ~ make it precise; divergent asymptotic series are useful when truncated optimally; dominant balance, Laplace and WKB are key methods.
!: Adding more terms of a divergent asymptotic series and expecting greater accuracy.
Q: What does f ~ g mean? | f/g → 1 in the limit.
Q: What is Stirling's approximation to n!? | √(2πn)(n/e)ⁿ.
SUM: Asymptotics captures limiting behaviour.
SUM: Divergent series can still be useful.
SRC: Bender CM, Orszag SA, Advanced Mathematical Methods for Scientists and Engineers (McGraw-Hill 1978; Springer 1999) | textbook | 1999 | https://link.springer.com/
SRC: Hinch EJ, Perturbation Methods (Cambridge University Press 1991) | textbook | 1991 | https://www.cambridge.org/
NUM1#maths-u20-06-q1@1: Using Stirling's formula n! ≈ √(2πn)(n/e)ⁿ, estimate 5! to the nearest whole number. | 118 | 1 |  | √(10π) ≈ 5.605 and (5/e)^{5} ≈ 21.06, so 5! ≈ 118.0, against the true 120.
M1#maths-u20-06-q2@1: As x → ∞, which statement is true? | x^{2} + x ~ x^{2} | x^{2} + x ~ x | eˣ = O(x^{100}) | log x ~ x | x = o(log x) | (x^{2} + x)/x^{2} = 1 + 1/x → 1, so x^{2} + x ~ x^{2}; eˣ grows faster than any power, and log x is much smaller than x.
M3#maths-u20-06-q3@2: Why can a divergent asymptotic series still give accurate approximations? | Its terms first shrink rapidly, and stopping at the smallest term gives an error about that size | Divergent series always converge eventually if enough terms are kept | Every term of a divergent series is zero, so truncation has no effect | It can't give accurate approximations; divergence makes it useless | Asymptotic series are always convergent, so the question doesn't arise | Optimal truncation exploits the initial decrease before factorial growth takes over.

## Perturbation Theory
S: Perturbation theory solves problems with a small parameter ε by expanding the solution as a power series in ε. Regular problems behave smoothly as ε → 0; singular problems change character and need boundary layers or multiple scales.
O: Solve regular perturbation problems for algebraic and differential equations
O: Recognise singular perturbations, boundary layers and secular terms
T: Regular perturbation | A problem whose solution expands as a power series in ε with the ε = 0 problem giving the leading term
T: Boundary layer | A thin region where a solution changes rapidly, arising when ε multiplies the highest derivative
H: Regular perturbations
- Write x = x₀ + εx₁ + ε^{2}x₂ + …, substitute and match powers of ε.
- x^{2} + εx − 1 = 0: x = 1 − ε/2 + ε^{2}/8 + … (positive root).
- Planetary orbits perturbed by other planets.
H: Singular perturbations
- εx^{2} + x − 1 = 0: one root stays near 1, the other runs off like −1/ε.
- εy″ + y′ + y = 0: the ε = 0 equation is first order and can't meet both boundary conditions.
- Matched asymptotic expansions join an outer solution with an inner (boundary layer) solution.
H: Multiple scales
- Naive expansions can grow with time (secular terms), such as εt sin t.
- Poincaré–Lindstedt methods rescale time.
- Multiple-scale analysis introduces slow time T = εt.
- Quantum perturbation theory computes energy corrections.
X: Find the positive root of x^{2} + εx − 1 = 0 to first order in ε.
> Substitute x = x₀ + εx₁: x₀^{2} + ε(2x₀x₁ + x₀) + O(ε^{2}) = 1
> Order 1: x₀^{2} = 1, so x₀ = 1; order ε: 2x₁ + 1 = 0, so x₁ = −½
> x ≈ 1 − ε/2 (for ε = 0.1: 0.95, exact 0.9512)
K: Regular perturbations expand in powers of ε; singular perturbations need boundary layers and matched expansions; secular terms need multiple scales or Poincaré–Lindstedt.
!: Setting ε = 0 in a singular problem and losing roots or boundary conditions.
Q: What signals a singular perturbation in an ODE? | ε multiplying the highest derivative.
Q: What is a secular term? | A term in an expansion that grows with time, breaking uniformity.
SUM: Expand in the small parameter.
SUM: Singular cases need extra structure.
SRC: Hinch EJ, Perturbation Methods (Cambridge University Press 1991) | textbook | 1991 | https://www.cambridge.org/
SRC: Holmes MH, Introduction to Perturbation Methods (2nd edn, Springer 2013) | textbook | 2013 | https://link.springer.com/
NUM1#maths-u20-07-q1@1: Using x ≈ 1 − ε/2 + ε^{2}/8, approximate the positive root of x^{2} + 0.2x − 1 = 0. | 0.905 | 0.001 |  | 1 − 0.1 + 0.005 = 0.905; the exact root is (−0.2 + √4.04)/2 ≈ 0.9050.
M1#maths-u20-07-q2@1: Which problem is a singular perturbation as ε → 0? | εy″ + y′ = 1 with two boundary conditions | y′ = εy with one initial condition | x^{2} + εx = 1 | y″ + εy = 0 with two conditions | x = 1 + εx^{2} | Setting ε = 0 drops the highest derivative, so one boundary condition can't be satisfied.
M2#maths-u20-07-q3@2: Why do naive perturbation expansions of weakly nonlinear oscillators fail at long times? | Secular terms like εt sin t grow without bound, so the expansion stops being small | The oscillator stops moving at long times, so the expansion is irrelevant | Nonlinear terms vanish at long times, leaving only the linear solution | The expansion converges too fast, overshooting the true solution | They don't fail: the naive expansion stays uniformly valid for all time | When εt is no longer small, the correction is as large as the leading term.

## Sensitivity and Uncertainty Analysis
S: In modelling practice, sensitivity and uncertainty analysis ask which assumptions drive the conclusions and how confident we can be. They identify parameters that need better data, reveal structural uncertainty between competing models, and support honest communication of results.
O: Plan a sensitivity and uncertainty study for a model
O: Distinguish parameter, structural and scenario uncertainty
T: Structural uncertainty | Uncertainty about the form of the model itself, such as which processes to include
T: Identifiability | Whether model parameters can be uniquely determined from the available data
H: Kinds of uncertainty
- Parameter uncertainty: values known only within ranges.
- Structural uncertainty: different plausible model forms.
- Scenario uncertainty: future policies or conditions.
- Data uncertainty: measurement error and bias.
H: Methods in practice
- Tornado diagrams vary each input between plausible bounds.
- Global methods (Sobol, Morris) and Monte Carlo propagation (School 19).
- Multi-model ensembles (climate, epidemics) address structural uncertainty.
- Profile likelihood checks identifiability.
H: Communicating results
- Report ranges, not just central estimates.
- State which assumptions most affect conclusions.
- Distinguish what's well known from what's speculative.
- Use scenarios when probabilities can't be assigned.
X: An epidemic model gives peak hospital demand of 500 beds. Varying R₀ from 2 to 3 changes it from 300 to 900; varying hospital stay from 5 to 9 days changes it from 400 to 650. Which matters more?
> R₀ range gives a spread of 600 beds
> Length of stay gives a spread of 250 beds
> R₀ dominates, so better estimates of transmission are the priority
K: Sensitivity and uncertainty analysis in modelling covers parameter, structural, scenario and data uncertainty; tornado plots, global methods and ensembles quantify it; results should be reported as ranges with key assumptions.
!: Presenting a single model run as a forecast without ranges.
Q: What is structural uncertainty? | Uncertainty about the form of the model itself.
Q: What does a tornado diagram show? | The output range caused by varying each input between bounds.
SUM: Know which assumptions drive results.
SUM: Report uncertainty honestly.
SRC: Saltelli A et al., Five ways to ensure that models serve society: a manifesto, Nature 582, 482 | journal | 2020 | https://doi.org/10.1038/d41586-020-01812-9
SRC: Raue A et al., Structural and practical identifiability analysis of partially observed dynamical models by exploiting the profile likelihood, Bioinformatics 25(15), 1923 | journal | 2009 | https://doi.org/10.1093/bioinformatics/btp358
NUM1#maths-u20-08-q1@1: In a tornado diagram, input A moves the output from 40 to 70 and input B from 50 to 58. What is the ratio of A's swing to B's swing? | 3.75 | 0.01 |  | A's swing is 30 and B's is 8, so the ratio is 30/8 = 3.75.
M1#maths-u20-08-q2@1: Which kind of uncertainty do multi-model ensembles mainly address? | Structural uncertainty about the model's form | Rounding error in arithmetic | Uncertainty in a single parameter only | Typing mistakes in the code | None at all | Running several plausible model structures shows how much conclusions depend on model choice.
M2#maths-u20-08-q3@2: What does it mean if a parameter is not identifiable from the data? | Different values of it fit the data equally well, so the data can't pin it down | It has no effect on the model output at all | It has been measured exactly by experiment | It must be zero for the model to fit | It is the most important parameter in the model | Non-identifiability shows up as a flat profile likelihood.

## Biological Modelling
S: Biological modelling builds mathematical descriptions of living systems, from molecules and cells to organs, populations and ecosystems. Models help explain mechanisms, design experiments and predict responses to treatments or environmental change.
O: Describe the scales and model types used in biology
O: Build a simple model of a biological process
T: Multiscale model | A model linking processes at different biological scales, such as genes, cells and tissues
T: Logistic growth | dN/dt = rN(1 − N/K), growth that slows as a population approaches its carrying capacity K
H: Scales
- Molecular: enzyme kinetics, gene regulation.
- Cellular: cell cycle, signalling, electrophysiology.
- Tissue and organ: tumour growth, cardiac models.
- Population and ecosystem: predators and prey, epidemics.
H: Model types
- ODEs for well-mixed systems; PDEs for spatial spread.
- Stochastic models for small numbers (gene expression noise).
- Agent-based models for individual behaviour.
- Statistical and machine learning models from data.
H: Challenges
- Many parameters, few measurements.
- Biological variability between individuals.
- Multiple scales and feedback loops.
- Validation with experiments designed alongside models.
X: A bacterial culture grows logistically with r = 0.5 per hour and K = 10^{9} cells. How fast does it grow at N = 5 × 10^{8}?
> dN/dt = rN(1 − N/K)
> = 0.5 × 5 × 10^{8} × (1 − 0.5)
> = 1.25 × 10^{8} cells per hour, the maximum rate (at N = K/2)
K: Biological models span molecules to ecosystems; ODEs, PDEs, stochastic and agent-based models suit different scales; parameter scarcity and variability are key challenges.
!: Using deterministic ODEs where small numbers of molecules make randomness important.
Q: At what population size is logistic growth fastest? | N = K/2.
Q: When are stochastic models preferred in biology? | When molecule or individual numbers are small.
SUM: Models span biological scales.
SUM: Choose the type to suit the system.
SRC: Murray JD, Mathematical Biology I: An Introduction (3rd edn, Springer 2002) | textbook | 2002 | https://link.springer.com/
SRC: Edelstein-Keshet L, Mathematical Models in Biology (SIAM Classics 2005) | textbook | 2005 | https://epubs.siam.org/
NUM1#maths-u20-09-q1@1: For logistic growth with r = 0.4 per day and K = 1000, what is the maximum growth rate per day? | 100 | 0 | per day | The maximum rK/4 occurs at N = K/2: 0.4 × 1000/4 = 100.
M1#maths-u20-09-q2@1: Which model type suits tracking individual cells that move and interact by local rules? | An agent-based model | A single ODE for total cell number | A linear regression | A Leslie matrix of ages | A Michaelis–Menten curve | Agent-based models represent each individual and its interactions explicitly.
M2#maths-u20-09-q3@2: Why are biological models often hard to parameterise? | Many parameters can't be measured directly and vary between individuals | Biology has no parameters, so models can't be calibrated | Every parameter is already known exactly from textbooks | Models need no data, so parameters are chosen freely | They aren't hard: all rates are easy to measure directly | Rates inside cells are often inferred indirectly and differ across organisms.

## Mathematical Biology
S: Mathematical biology is the discipline that uses mathematics to discover biological principles. Its landmarks include Turing's patterns, the Hodgkin–Huxley nerve model and the Lotka–Volterra equations, each showing how simple equations can explain complex life.
O: Describe landmark models of mathematical biology
O: Explain Turing's mechanism for pattern formation
T: Turing instability | A stable uniform state becomes unstable when two chemicals diffuse at different rates, producing spatial patterns
T: Hodgkin–Huxley model | A system of ODEs describing how ion currents generate nerve action potentials (Nobel Prize 1963)
H: Landmarks
- Lotka–Volterra predator–prey cycles (1920s).
- Fisher's equation for the spread of genes (1937).
- Hodgkin–Huxley nerve impulses (1952).
- Turing's reaction–diffusion patterns (1952).
H: Turing patterns
- A slowly diffusing activator and a fast-diffusing inhibitor.
- Local activation, long-range inhibition gives spots and stripes.
- Explains animal coat markings and digit spacing (with experimental support).
H: Modern directions
- Systems biology and gene networks.
- Mathematical oncology and immunology.
- Neuroscience: neural field models.
- Evolutionary game theory.
X: In the Lotka–Volterra model dx/dt = ax − bxy, dy/dt = −cy + dxy, find the non-trivial equilibrium.
> dx/dt = 0 with x ≠ 0: a = by, so y* = a/b
> dy/dt = 0 with y ≠ 0: c = dx, so x* = c/d
> Equilibrium (c/d, a/b), around which populations cycle
K: Mathematical biology's landmarks include Lotka–Volterra, Fisher, Hodgkin–Huxley and Turing; Turing patterns need differential diffusion; modern work spans systems biology to neuroscience.
!: Thinking Turing patterns need complicated chemistry rather than two species with different diffusion rates.
Q: What did the Hodgkin–Huxley model describe? | How ion currents generate nerve action potentials.
Q: What does Turing's mechanism require? | An activator and an inhibitor diffusing at different rates.
SUM: Simple equations explain life's patterns.
SUM: Landmarks show the power of modelling.
SRC: Turing AM, The chemical basis of morphogenesis, Philosophical Transactions of the Royal Society B 237, 37 | journal | 1952 | https://doi.org/10.1098/rstb.1952.0012
SRC: Hodgkin AL, Huxley AF, A quantitative description of membrane current and its application to conduction and excitation in nerve, Journal of Physiology 117(4), 500 | journal | 1952 | https://doi.org/10.1113/jphysiol.1952.sp004764
NUM1#maths-u20-10-q1@1: For Lotka–Volterra with a = 1, b = 0.02, c = 0.5 and d = 0.01, what is the prey equilibrium x*? | 50 | 0 |  | x* = c/d = 0.5/0.01 = 50.
M1#maths-u20-10-q2@1: Which ingredient is essential for a Turing instability? | An inhibitor that diffuses faster than the activator | Equal diffusion rates for both chemicals | No diffusion at all | A single chemical species | Constant external forcing | Long-range inhibition with short-range activation destabilises the uniform state.
M3#maths-u20-10-q3@2: Why do Lotka–Volterra populations cycle rather than settle? | The model conserves a quantity, so orbits are closed curves around the equilibrium | Populations always settle to equilibrium in the Lotka–Volterra model | Predators grow without bound, forcing the prey to oscillate | The equilibrium is a stable node, so cycles decay to it | They don't cycle; Lotka–Volterra predicts steady populations | The first integral dx − c ln x + by − a ln y is constant along solutions, giving neutral cycles.

## Biomathematics
S: Biomathematics covers the quantitative tools biologists use every day: genetics, growth and decay, allometry, phylogenetics and biostatistics. These methods turn measurements into estimates and tests of biological hypotheses.
O: Apply Hardy–Weinberg proportions and exponential growth or decay
O: Describe quantitative methods in genetics and phylogenetics
T: Hardy–Weinberg equilibrium | With allele frequencies p and q = 1 − p, genotype frequencies p^{2}, 2pq and q^{2} stay constant without selection, mutation, migration or drift
T: Doubling time | t_{d} = ln 2/r for exponential growth at rate r
H: Genetics
- Hardy–Weinberg (1908) as a null model.
- Mendelian ratios and χ^{2} tests (3 : 1 in monohybrid crosses).
- Quantitative genetics: heritability h^{2} = V_{A}/V_{P}.
H: Growth and decay
- Exponential growth N = N₀e^{rt}; doubling time ln 2/r.
- Radioactive and drug decay: half-life ln 2/k.
- Allometric scaling (see Scaling Laws).
H: Sequences and trees
- Sequence alignment by dynamic programming.
- Phylogenetic trees by distance or likelihood methods.
- Molecular clocks: divergence times from mutation rates.
- Bioinformatics combines these with statistics.
X: In a population, 16% have the recessive phenotype aa. Find the carrier frequency under Hardy–Weinberg.
> q^{2} = 0.16, so q = 0.4 and p = 0.6
> Carriers Aa: 2pq = 2 × 0.6 × 0.4
> = 0.48, so 48% are carriers
K: Biomathematics supplies Hardy–Weinberg, growth and decay, allometry, sequence alignment and phylogenetics; these quantify genetic and biological hypotheses.
!: Applying Hardy–Weinberg when strong selection or inbreeding breaks its assumptions.
Q: What are Hardy–Weinberg genotype frequencies? | p^{2}, 2pq and q^{2}.
Q: What is the doubling time for growth rate r? | ln 2/r.
SUM: Quantitative tools support biology.
SUM: Null models test hypotheses.
SRC: Hardy GH, Mendelian proportions in a mixed population, Science 28(706), 49 | journal | 1908 | https://doi.org/10.1126/science.28.706.49
SRC: Felsenstein J, Inferring Phylogenies (Sinauer 2004) | textbook | 2004 | https://global.oup.com/
NUM1#maths-u20-11-q1@1: A culture grows at r = 0.0347 per minute. What is its doubling time, to the nearest minute? | 20 | 0.5 | minutes | ln 2/0.0347 ≈ 0.693/0.0347 ≈ 20 minutes, typical of E. coli.
M1#maths-u20-11-q2@1: If the recessive allele frequency is q = 0.1, what fraction of the population are carriers? | 0.18 | 0.01 | 0.81 | 0.1 | 0.2 | Carriers are heterozygotes with frequency 2pq = 2 × 0.9 × 0.1 = 0.18; q^{2} = 0.01 are affected and p^{2} = 0.81 are unaffected non-carriers.
M2#maths-u20-11-q3@2: Which assumption must hold for Hardy–Weinberg proportions? | Random mating with no selection, mutation, migration or drift | Strong natural selection acting on one allele | Small populations with frequent genetic drift | Only asexual reproduction with no mating | Constant mutation pressure on both alleles | Departures from these conditions shift genotype frequencies away from p^{2}, 2pq, q^{2}.

## Population Dynamics
S: Population dynamics models how the number of individuals changes through births, deaths and migration. From exponential and logistic growth to age-structured and chaotic discrete models, it informs fisheries, conservation and pest control.
O: Analyse exponential, logistic and discrete-time population models
O: Use Leslie matrices for age-structured populations
T: Carrying capacity | K, the population size an environment can sustain in the long run
T: Leslie matrix | A matrix of age-specific fertilities and survival rates projecting an age-structured population one step forward
H: Continuous models
- Exponential: N′ = rN, unbounded growth.
- Logistic: N′ = rN(1 − N/K), approaching K.
- Allee effect: growth negative at very low densities.
- Harvesting: N′ = rN(1 − N/K) − h; maximum sustainable yield rK/4.
H: Discrete models
- Logistic map N_{t+1} = rN_{t}(1 − N_{t}): stable, cycling or chaotic depending on r (May 1976).
- Ricker model for fish stocks.
- Discrete models can oscillate where continuous ones can't.
H: Age structure
- Leslie matrix L: top row fertilities, sub-diagonal survival.
- Long-run growth rate = dominant eigenvalue λ; stable age distribution = its eigenvector.
- λ > 1 grows, λ < 1 declines.
X: A Leslie matrix [[0, 4], [0.5, 0]] describes juveniles and adults. Find the long-run growth rate.
> Characteristic equation λ^{2} − 4 × 0.5 = 0
> λ^{2} = 2
> λ = √2 ≈ 1.41: the population grows about 41% per time step
K: Exponential and logistic models describe unlimited and limited growth; harvesting gives MSY rK/4; discrete models can be chaotic; Leslie matrices give growth rates and stable age structure.
!: Assuming a population that is growing now will keep the same age structure.
Q: What is the maximum sustainable yield for logistic growth? | rK/4.
Q: What does the dominant eigenvalue of a Leslie matrix give? | The long-run growth rate per step.
SUM: Births, deaths and limits shape populations.
SUM: Age structure needs matrices.
SRC: May RM, Simple mathematical models with very complicated dynamics, Nature 261, 459 | journal | 1976 | https://doi.org/10.1038/261459a0
SRC: Caswell H, Matrix Population Models (2nd edn, Sinauer 2001) | textbook | 2001 | https://global.oup.com/
NUM1#maths-u20-12-q1@1: A fishery follows logistic growth with r = 0.3 per year and K = 20,000 tonnes. What is its maximum sustainable yield in tonnes per year? | 1500 | 0 | tonnes | MSY = rK/4 = 0.3 × 20,000/4 = 1500.
M1#maths-u20-12-q2@1: For the Leslie matrix [[0, 2], [0.5, 0]], what happens to the population in the long run? | It stays constant, since λ = 1 | It grows by 41% per step | It declines to zero | It grows by 100% per step | It oscillates chaotically | The characteristic equation is λ^{2} = 2 × 0.5 = 1, so the dominant eigenvalue is λ = 1 and the population neither grows nor declines in the long run.
M2#maths-u20-12-q3@2: Why can the discrete logistic map be chaotic when the continuous logistic equation isn't? | Discrete steps can overshoot the equilibrium, creating oscillations that become chaotic as r increases | Continuous logistic models are always chaotic, so the map just inherits it | The discrete map has no equilibrium, so it can never settle down | Chaos needs at least three variables in discrete time, so it can't happen | It can't be chaotic; the discrete logistic map always converges to K | A one-dimensional autonomous ODE can't oscillate, but a map can jump past K.

## Ecological Modelling
S: Ecological modelling describes interactions among species and their environment: predation, competition, mutualism and the flow of energy and nutrients. Models help manage fisheries, predict invasions and assess biodiversity under climate change.
O: Analyse competition and predator–prey models
O: Describe food webs, metapopulations and species distribution models
T: Competitive exclusion principle | Two species competing for exactly the same limiting resource can't coexist indefinitely
T: Functional response | The rate at which a predator consumes prey as a function of prey density (Holling types I–III)
H: Species interactions
- Lotka–Volterra competition: coexistence when each species limits itself more than the other.
- Predator–prey with Holling type II response gives limit cycles (Rosenzweig–MacArthur).
- Paradox of enrichment: more food can destabilise the system.
- Mutualism models with saturating benefits.
H: Spatial and community models
- Metapopulations (Levins): patches occupied and lost, dp/dt = cp(1 − p) − ep.
- Food webs and stability (May: large random webs tend to be unstable).
- Island biogeography: species number balances immigration and extinction.
H: Applications
- Fisheries and harvesting policy.
- Invasive species spread (reaction–diffusion).
- Species distribution models under climate scenarios.
- Ecosystem services and nutrient cycles.
X: In the Levins model dp/dt = cp(1 − p) − ep with colonisation c = 0.4 and extinction e = 0.1, find the equilibrium fraction of occupied patches.
> Set dp/dt = 0 with p ≠ 0: c(1 − p) = e
> 1 − p = e/c = 0.25
> p* = 0.75: three-quarters of patches occupied
K: Ecological models capture competition, predation and mutualism; functional responses shape dynamics; metapopulation and food-web models add space and community structure; they guide conservation and management.
!: Ignoring spatial structure when habitats are fragmented.
Q: What does the competitive exclusion principle say? | Two species on exactly the same limiting resource can't coexist indefinitely.
Q: What is a Holling type II response? | Predation that rises with prey density and then saturates.
SUM: Interactions drive ecological dynamics.
SUM: Space and community structure matter.
SRC: Levins R, Some demographic and genetic consequences of environmental heterogeneity for biological control, Bulletin of the Entomological Society of America 15(3), 237 | journal | 1969 | https://doi.org/10.1093/besa/15.3.237
SRC: Otto SP, Day T, A Biologist's Guide to Mathematical Modeling in Ecology and Evolution (Princeton University Press 2007) | textbook | 2007 | https://press.princeton.edu/
NUM1#maths-u20-13-q1@1: In the Levins model with c = 0.5 and e = 0.2, what fraction of patches is occupied at equilibrium? | 0.6 | 0.001 |  | p* = 1 − e/c = 1 − 0.4 = 0.6.
M1#maths-u20-13-q2@1: In the Levins model, what happens if extinction e exceeds colonisation c? | The species goes extinct across the landscape | All the patches become occupied in the long run | Occupancy oscillates forever between two values | Occupancy settles at exactly half of the patches | Nothing changes from the starting occupancy | p* = 1 − e/c is negative, so the only equilibrium is p = 0.
M3#maths-u20-13-q3@2: What is the paradox of enrichment? | Raising prey carrying capacity can destabilise the equilibrium into large cycles that risk extinction | More food always stabilises ecosystems and prevents population cycles | Predators disappear whenever the prey's food supply is enriched | Enrichment has no effect on predator–prey dynamics in any model | It isn't a real effect; it was a numerical error in early studies | In the Rosenzweig–MacArthur model, high K makes the equilibrium lose stability.

## Epidemiological Modelling
S: Epidemiological models forecast how infectious diseases spread and how interventions change their course. They estimate the reproduction number from data, compare strategies such as vaccination and distancing, and informed decisions during COVID-19.
O: Estimate R₀ and the herd immunity threshold
O: Describe how models compare interventions and are fitted to data
T: Basic reproduction number | R₀, the average number of secondary infections from one case in a fully susceptible population
T: Herd immunity threshold | The immune fraction 1 − 1/R₀ above which an epidemic can't grow
H: Key quantities
- R₀ = β/γ in the simple SIR model (transmission rate over recovery rate).
- Effective reproduction number Rₜ = R₀ × susceptible fraction, changed by interventions.
- Growth rate r and doubling time; serial interval links r and R.
H: Interventions
- Vaccination coverage above 1 − 1/R₀ (adjusted for vaccine efficacy).
- Distancing reduces β; isolation and treatment shorten infectiousness.
- Timing matters: delays let infections grow exponentially.
H: Fitting and forecasting
- Fit to case, hospital and death data, accounting for reporting delays.
- Bayesian methods give uncertainty ranges.
- Scenario projections, not predictions, when behaviour is uncertain.
- Ensembles combine models (UK SPI-M, US COVID-19 Forecast Hub).
X: Measles has R₀ ≈ 15. Find the herd immunity threshold, and the vaccine coverage needed if the vaccine is 97% effective.
> Threshold = 1 − 1/15 ≈ 0.933
> Coverage needed = 0.933/0.97
> ≈ 0.96, so about 96% coverage
K: R₀ and Rₜ summarise transmission; herd immunity needs 1 − 1/R₀ immune; models compare vaccination and distancing; fitting uses delayed data with uncertainty; projections depend on scenarios.
!: Treating scenario projections as unconditional predictions.
Q: What is R₀ in the SIR model? | β/γ.
Q: What is the herd immunity threshold for R₀ = 4? | 75%.
SUM: Models quantify spread.
SUM: They compare interventions.
SRC: Anderson RM, May RM, Infectious Diseases of Humans: Dynamics and Control (Oxford University Press 1991) | textbook | 1991 | https://global.oup.com/
SRC: Ferguson NM et al., Report 9: Impact of non-pharmaceutical interventions to reduce COVID-19 mortality and healthcare demand (Imperial College London 2020) | report | 2020 | https://doi.org/10.25561/77482
NUM1#maths-u20-14-q1@1: For R₀ = 2.5, what is the herd immunity threshold as a percentage? | 60 | 0 | % | 1 − 1/2.5 = 0.6, so 60% must be immune.
M1#maths-u20-14-q2@1: If R₀ = 3 and 50% of the population is immune, what is Rₜ? | 1.5 | 3 | 0.5 | 1 | 6 | Rₜ = R₀ × susceptible fraction = 3 × 0.5 = 1.5.
M2#maths-u20-14-q3@2: Why are epidemic model outputs often given as scenarios rather than forecasts? | Future behaviour and policy are uncertain, so outputs are conditional on assumed choices | Models can't produce numbers, only qualitative descriptions | Data are never available during an epidemic, so nothing can be fitted | Scenarios are always more accurate than forecasts | They are always forecasts; scenarios are never used | A projection says what would happen if certain measures were taken, not what will happen.

## Mathematical Epidemiology
S: Mathematical epidemiology studies the theory behind epidemic models: threshold theorems, final epidemic sizes, endemic equilibria and the next-generation matrix. These results explain why epidemics stop before everyone is infected and how heterogeneity changes R₀.
O: Derive the final size relation and threshold theorem for SIR
O: Compute R₀ with the next-generation matrix
T: Final size relation | For SIR, the fraction ever infected z satisfies z = 1 − e^{−R₀z}
T: Next-generation matrix | K = FV^{−1}, whose dominant eigenvalue gives R₀ for multi-compartment models
H: Threshold theorem
- Kermack and McKendrick (1927): an epidemic grows only if R₀S₀ > 1.
- Epidemics end with susceptibles remaining, not by exhausting them.
- Overshoot: the final size exceeds the herd immunity threshold.
H: Final size and endemicity
- z = 1 − e^{−R₀z} for a closed population.
- With births, an endemic equilibrium S* = 1/R₀.
- Damped oscillations towards endemic levels (measles cycles with seasonal forcing).
H: Heterogeneity
- Next-generation matrices for age or risk groups.
- Heterogeneous mixing raises or lowers R₀ (core groups in STIs).
- Network epidemics: R₀ depends on degree variance, ⟨k^{2}⟩/⟨k⟩.
- Stochastic models: early extinction probability 1/R₀.
X: Check numerically that z ≈ 0.8 satisfies the final size relation for R₀ = 2.
> 1 − e^{−2 × 0.8} = 1 − e^{−1.6} = 1 − 0.202 = 0.798
> So z ≈ 0.797 (the exact solution)
> About 80% are infected, more than the herd immunity threshold of 50%: overshoot
K: The threshold theorem says epidemics grow only when R₀S₀ > 1; the final size relation z = 1 − e^{−R₀z} shows overshoot; next-generation matrices give R₀ with heterogeneity; networks raise R₀ with degree variance.
!: Thinking an unmitigated epidemic stops exactly at the herd immunity threshold.
Q: What is the endemic susceptible fraction in SIR with births? | 1/R₀.
Q: Who proved the epidemic threshold theorem in 1927? | Kermack and McKendrick.
SUM: Epidemics have thresholds and final sizes.
SUM: Heterogeneity changes R₀.
SRC: Kermack WO, McKendrick AG, A contribution to the mathematical theory of epidemics, Proceedings of the Royal Society A 115, 700 | journal | 1927 | https://doi.org/10.1098/rspa.1927.0118
SRC: Diekmann O, Heesterbeek JAP, Roberts MG, The construction of next-generation matrices for compartmental epidemic models, Journal of the Royal Society Interface 7(47), 873 | journal | 2010 | https://doi.org/10.1098/rsif.2009.0386
NUM1#maths-u20-15-q1@1: In a branching-process model with R₀ = 4, what is the probability that a single introduced case causes no major outbreak? | 0.25 | 0.001 |  | For a Poisson offspring approximation the minor-outbreak probability is close to 1/R₀ (exactly 1/R₀ for geometric offspring): 0.25.
M1#maths-u20-15-q2@1: For R₀ = 2, which final infected fraction does the SIR final size relation give? | About 80% | Exactly 50% | About 20% | 100% | About 95% | Solving z = 1 − e^{−2z} numerically gives z ≈ 0.797, so about 80% are eventually infected, well above the 50% herd immunity threshold.
M3#maths-u20-15-q3@2: Why does an unmitigated epidemic infect more people than the herd immunity threshold? | When immunity reaches the threshold, many people are still infectious and keep infecting others as the epidemic declines | Herd immunity is never reached in an unmitigated epidemic, so infections continue | Infections stop instantly at the threshold, so there's no overshoot at all | The threshold is always 100%, so the final size can't exceed it | It doesn't overshoot: final size always equals the herd immunity threshold | Incidence falls after Rₜ = 1 but stays positive for a while, adding infections.

## Compartmental Models
S: Compartmental models divide a population into groups, such as susceptible, infectious and recovered, and track flows between them. The SIR model and its relatives SEIR, SIS and SIRS are the starting point for most infectious disease modelling.
O: Write and interpret SIR, SEIR and SIS equations
O: Calculate equilibria and peak conditions in SIR models
T: SIR model | dS/dt = −βSI/N, dI/dt = βSI/N − γI, dR/dt = γI
T: Infectious period | The average time 1/γ an individual stays infectious
H: Model family
- SIR: lifelong immunity (measles).
- SEIR: adds an exposed, not-yet-infectious class (incubation).
- SIS: no immunity (many bacterial infections); endemic level 1 − 1/R₀.
- SIRS: waning immunity.
H: SIR behaviour
- I grows while S/N > 1/R₀ and peaks when S/N = 1/R₀.
- Total population constant: S + I + R = N.
- Mean infectious period 1/γ; mean incubation 1/σ in SEIR.
H: Assumptions
- Homogeneous mixing (everyone equally likely to meet).
- Exponentially distributed durations.
- Large populations (deterministic).
- Extensions relax each assumption.
X: An SIR model has β = 0.3 per day and γ = 0.1 per day. Find R₀ and the susceptible fraction at the epidemic peak.
> R₀ = β/γ = 3
> The peak occurs when S/N = 1/R₀
> S/N = 1/3 at the peak
K: Compartmental models track flows between disease states; SIR, SEIR, SIS and SIRS fit different diseases; infections peak when S/N = 1/R₀; homogeneous mixing and exponential durations are key assumptions.
!: Using SIR for diseases without lasting immunity, where SIS or SIRS fits better.
Q: Which compartment does SEIR add to SIR? | Exposed (infected but not yet infectious).
Q: What is the mean infectious period in terms of γ? | 1/γ.
SUM: Compartments track disease states.
SUM: Choose the structure to match the disease.
SRC: Keeling MJ, Rohani P, Modeling Infectious Diseases in Humans and Animals (Princeton University Press 2008) | textbook | 2008 | https://press.princeton.edu/
SRC: Hethcote HW, The mathematics of infectious diseases, SIAM Review 42(4), 599 | journal | 2000 | https://doi.org/10.1137/S0036144500371907
NUM1#maths-u20-16-q1@1: In an SIR model with recovery rate γ = 0.2 per day, what is the mean infectious period in days? | 5 | 0 | days | The mean infectious period is 1/γ = 1/0.2 = 5 days.
M1#maths-u20-16-q2@1: Which model suits a disease where recovery gives no immunity? | SIS | SIR | SEIR | SIRS with lifelong immunity | SI with permanent recovery | In SIS, recovered individuals return straight to the susceptible class.
M2#maths-u20-16-q3@2: In the SIR model, why does the number of infectious people peak when S/N = 1/R₀? | Then each infection replaces itself exactly, so dI/dt = 0 | Everyone has already been infected by then | Recovery stops at that point in the epidemic | The transmission rate β becomes zero | It peaks at S/N = 1, at the very start | dI/dt = γI(R₀S/N − 1), which changes sign when S/N = 1/R₀.

## Compartmental Modelling
S: Beyond epidemics, compartmental modelling describes any system where material moves between well-mixed pools: drugs in the body, tracers in organs, carbon in the climate system. Linear compartmental models are matrix ODEs with mass balance built in.
O: Write mass-balance equations for linear compartmental systems
O: Use matrix methods to find solutions and steady states
T: Compartment | A well-mixed pool whose contents are described by one quantity, such as amount or concentration
T: Mass balance | Rate of change of a compartment = inflows − outflows
H: Linear compartmental systems
- dx/dt = Ax + u, where A has off-diagonal entries kᵢⱼ ≥ 0 (flow from j to i).
- Diagonal entries are minus the total outflow rates.
- Column sums ≤ 0: material is conserved or lost.
- Eigenvalues are real-negative for many systems, giving sums of exponentials.
H: Examples
- Two-compartment drug model: central (blood) and peripheral (tissue).
- Tracer kinetics in medical imaging (PET).
- Global carbon cycle: atmosphere, ocean, land.
- Lake pollution with inflow and outflow.
H: Analysis
- Steady state x* = −A^{−1}u.
- Mean residence time from the matrix inverse.
- Identifiability: which rates can be estimated from measured compartments.
- Nonlinear compartments for saturable transport.
X: A lake of volume 10^{6} m^{3} receives 10^{4} m^{3}/day of water containing 5 g/m^{3} of pollutant and drains at the same rate. Find the steady pollutant concentration.
> Mass balance: V dc/dt = Q c_{in} − Q c
> Steady state: c = c_{in}
> c* = 5 g/m^{3}, approached with time scale V/Q = 100 days
K: Compartmental models apply mass balance to well-mixed pools; linear systems are matrix ODEs dx/dt = Ax + u; steady states solve Ax* = −u; they model drugs, tracers, carbon and pollution.
!: Treating poorly mixed regions as single compartments.
Q: What does a compartment represent? | A well-mixed pool described by one quantity.
Q: What is the steady state of dx/dt = Ax + u? | x* = −A^{−1}u.
SUM: Mass balance on well-mixed pools.
SUM: Matrices solve linear systems of compartments.
SRC: Jacquez JA, Compartmental Analysis in Biology and Medicine (3rd edn, BioMedware 1996) | textbook | 1996 | https://www.biomedware.com/
SRC: Godfrey K, Compartmental Models and Their Application (Academic Press 1983) | textbook | 1983 | https://www.elsevier.com/
NUM1#maths-u20-17-q1@1: In the lake example (V = 10^{6} m^{3}, Q = 10^{4} m^{3}/day), what is the flushing time scale in days? | 100 | 0 | days | The time scale is V/Q = 10^{6}/10^{4} = 100 days.
M1#maths-u20-17-q2@1: In a linear compartmental matrix A, what does a diagonal entry represent? | Minus the total rate of outflow from that compartment | The inflow from outside the system | The volume of the compartment | The steady-state amount | The number of compartments | Each compartment loses material at the sum of its outgoing rate constants.
M2#maths-u20-17-q3@2: Why might only some rate constants be identifiable from data? | Different combinations of rates can produce the same measured curves when only some compartments are observed | All rate constants are always identifiable from any data set | Rates don't affect the measured data in compartmental models | Data contain no information about rates, only about volumes | Compartmental models have no rate constants to estimate | Observing only the blood compartment may not separate tissue exchange rates.

## Pharmacokinetic Modelling
S: Pharmacokinetics (PK) models what the body does to a drug: absorption, distribution, metabolism and excretion. Simple equations predict concentrations over time, guiding dose sizes and intervals so drugs stay effective and safe.
O: Use one-compartment models to calculate half-life, clearance and volume
O: Predict steady-state concentrations under repeated dosing
T: Clearance | CL, the volume of plasma cleared of drug per unit time; elimination rate k = CL/V
T: Volume of distribution | V, the apparent volume relating amount in the body to plasma concentration, V = dose/C₀
H: One-compartment IV bolus
- C(t) = (D/V)e^{−kt}.
- Half-life t_{½} = ln 2/k = 0.693V/CL.
- Area under the curve AUC = D/CL.
H: Oral dosing and infusion
- First-order absorption (Bateman function): rises then falls.
- Bioavailability F: fraction reaching circulation.
- Constant infusion at rate R: steady state C_{ss} = R/CL.
- About 4–5 half-lives to reach steady state.
H: Repeated dosing
- Accumulation factor 1/(1 − e^{−kτ}) for dosing interval τ.
- Loading doses reach target faster.
- Population PK (NONMEM) models variability between patients.
- Nonlinear (saturable) elimination for phenytoin and alcohol.
X: A 500 mg IV dose gives C₀ = 10 mg/L, and the half-life is 4 hours. Find V, k and CL.
> V = 500/10 = 50 L
> k = 0.693/4 ≈ 0.173 per hour
> CL = kV ≈ 8.7 L/hour
K: PK models absorption, distribution and elimination; t_{½} = 0.693V/CL; AUC = D/CL; steady state takes 4–5 half-lives with C_{ss} = R/CL; repeated dosing accumulates.
!: Expecting steady state after one half-life.
Q: What is the steady-state concentration for infusion rate R? | R/CL.
Q: How many half-lives does it take to reach about 97% of steady state? | About 5.
SUM: PK predicts drug concentrations.
SUM: Clearance and volume set the dose.
SRC: Rowland M, Tozer TN, Clinical Pharmacokinetics and Pharmacodynamics (5th edn, Wolters Kluwer 2020) | textbook | 2020 | https://shop.lww.com/
SRC: Gabrielsson J, Weiner D, Pharmacokinetic and Pharmacodynamic Data Analysis (5th edn, Swedish Pharmaceutical Press 2016) | textbook | 2016 | https://www.apotekarsocieteten.se/
NUM1#maths-u20-18-q1@1: A drug with clearance 5 L/h is infused at 20 mg/h. What is the steady-state concentration in mg/L? | 4 | 0 | mg/L | C_{ss} = R/CL = 20/5 = 4 mg/L.
M1#maths-u20-18-q2@1: A drug has V = 40 L and CL = 4 L/h. What is its half-life? | About 6.9 hours | About 10 hours | About 0.1 hours | About 160 hours | About 1 hour | The half-life is t_{½} = 0.693V/CL = 0.693 × 40/4 ≈ 6.9 hours, since the elimination rate constant is k = CL/V = 0.1 per hour.
M2#maths-u20-18-q3@2: Why is a loading dose sometimes given before maintenance doses? | It reaches the target concentration quickly instead of waiting 4–5 half-lives | It reduces total drug exposure over the course | It shortens the drug's half-life in the body | It increases the clearance of the drug | It isn't useful; maintenance doses suffice | Starting at the target level avoids the slow approach to steady state.

## Pharmacodynamic Modelling
S: Pharmacodynamics (PD) models what a drug does to the body: how effect depends on concentration. The Emax and Hill models describe saturating responses, and linking PK with PD predicts the effect over time from a dosing schedule.
O: Use the Emax and Hill equations
O: Explain PK/PD linking, effect compartments and therapeutic windows
T: Emax model | E = E_{max}C/(EC₅₀ + C): effect rises with concentration and saturates at E_{max}
T: Hill coefficient | n in E = E_{max}Cⁿ/(EC₅₀ⁿ + Cⁿ), controlling the steepness of the concentration–effect curve
H: Concentration–effect models
- Linear and log-linear models for limited ranges.
- Emax: half-maximal effect at C = EC₅₀.
- Hill (sigmoid Emax): n > 1 gives a steeper, switch-like response.
- Antagonists shift curves (competitive inhibition raises apparent EC₅₀).
H: Linking PK and PD
- Direct link: effect follows plasma concentration.
- Effect compartment: delay (hysteresis) between plasma level and effect.
- Indirect response models: drugs alter production or loss of a mediator.
- Turnover and tolerance models.
H: Uses
- Therapeutic window between effective and toxic levels.
- Dose selection in trials and model-informed drug development.
- Antibiotic PK/PD indices (time above MIC, AUC/MIC).
- Anaesthesia target-controlled infusion.
X: A drug has E_{max} = 100%, EC₅₀ = 2 mg/L and Hill coefficient 1. Find the effect at C = 6 mg/L.
> E = 100 × 6/(2 + 6)
> = 100 × 0.75
> = 75%
K: Emax and Hill models describe saturating concentration–effect relations; EC₅₀ gives half-maximal effect; effect compartments and indirect models explain delays; PK/PD linking guides dosing within the therapeutic window.
!: Assuming doubling the dose doubles the effect when the response is near saturation.
Q: At what concentration is the effect half-maximal? | EC₅₀.
Q: What does a Hill coefficient above 1 mean? | A steeper, more switch-like response.
SUM: PD links concentration to effect.
SUM: Saturation limits dose increases.
SRC: Holford NHG, Sheiner LB, Understanding the dose-effect relationship: clinical application of pharmacokinetic-pharmacodynamic models, Clinical Pharmacokinetics 6(6), 429 | journal | 1981 | https://doi.org/10.2165/00003088-198106060-00002
SRC: Rowland M, Tozer TN, Clinical Pharmacokinetics and Pharmacodynamics (5th edn, Wolters Kluwer 2020) | textbook | 2020 | https://shop.lww.com/
NUM1#maths-u20-19-q1@1: With E_{max} = 80, EC₅₀ = 4 and Hill coefficient 2, what is the effect at C = 4? | 40 | 0 |  | At C = EC₅₀ the effect is always half of E_{max}: 80/2 = 40, whatever the Hill coefficient.
M1#maths-u20-19-q2@1: In the Emax model with EC₅₀ = 1 mg/L, what fraction of E_{max} is reached at C = 9 mg/L? | 90% | 50% | 99% | 9% | 100% | E/E_{max} = C/(EC₅₀ + C) = 9/(1 + 9) = 0.9, so 90% of the maximum effect: raising the concentration further gains little.
M3#maths-u20-19-q3@2: What does hysteresis in a concentration–effect plot indicate? | Effect lags behind plasma concentration, often modelled with an effect compartment | The drug has no effect at any concentration measured | The pharmacokinetic model is linear in the dose | Concentrations have been measured incorrectly in the assay | Effect always leads concentration, so the drug acts early | The same concentration gives different effects when rising and falling, showing a delay.

## Systems Biology
S: Systems biology studies how networks of genes, proteins and metabolites work together to produce cell behaviour. Mathematical models of these networks explain switches, oscillators and robustness, and guide synthetic biology designs.
O: Model gene regulation with Hill functions and feedback
O: Describe network motifs, flux balance analysis and robustness
T: Network motif | A small pattern of interactions, such as a feed-forward loop, that occurs in biological networks more often than by chance
T: Flux balance analysis | A linear programming method predicting metabolic fluxes from stoichiometry, assuming steady state and an objective such as growth
H: Gene regulation
- Activation by a signal S: dx/dt = βSⁿ/(Kⁿ + Sⁿ) − αx (a Hill function for production).
- Negative feedback speeds responses and reduces noise.
- Positive feedback creates bistable switches (memory).
- Delayed negative feedback creates oscillations (circadian clocks).
H: Network properties
- Motifs: feed-forward loops filter brief signals (Alon).
- Robustness: chemotaxis adapts perfectly to background levels.
- Scale-free degree distributions (debated).
H: Metabolism and design
- Stoichiometric matrix S with steady state Sv = 0.
- FBA maximises growth subject to Sv = 0 and flux bounds.
- Synthetic biology: the repressilator (2000) and toggle switch (2000).
- Whole-cell models of Mycoplasma genitalium (2012).
X: A protein is produced at rate β = 10 nM/min and degraded at α = 0.1 per minute. Find its steady state and the response time.
> dx/dt = β − αx = 0 gives x* = β/α = 100 nM
> The response time to reach half of steady state is ln 2/α
> ≈ 6.9 minutes, set by the degradation rate
K: Systems biology models regulatory and metabolic networks; feedback creates switches and oscillators; network motifs have specific functions; FBA predicts fluxes by linear programming; synthetic circuits test designs.
!: Thinking production rate sets response time, when it's the removal rate α.
Q: What does positive feedback in gene regulation create? | Bistable switches.
Q: What does flux balance analysis assume? | Steady state Sv = 0 and an objective such as growth.
SUM: Networks generate cell behaviour.
SUM: Feedback shapes dynamics.
SRC: Alon U, An Introduction to Systems Biology: Design Principles of Biological Circuits (2nd edn, CRC Press 2019) | textbook | 2019 | https://www.routledge.com/
SRC: Elowitz MB, Leibler S, A synthetic oscillatory network of transcriptional regulators, Nature 403, 335 | journal | 2000 | https://doi.org/10.1038/35002125
NUM1#maths-u20-20-q1@1: A protein is degraded at α = 0.05 per minute. What is its response time ln 2/α in minutes, to 1 decimal place? | 13.9 | 0.1 | minutes | 0.693/0.05 ≈ 13.9 minutes.
M1#maths-u20-20-q2@1: Which network feature creates a bistable switch? | Positive feedback | Negative feedback without delay | A linear pathway | Constant production only | A single degradation step | Self-reinforcement can lock a system into one of two stable states.
M2#maths-u20-20-q3@2: What does a coherent feed-forward loop do to signals? | It filters out brief input pulses and responds only to sustained signals | It amplifies noise in the input signal | It creates chaotic oscillations in the output | It removes all responses to any input | It has no effect on how signals pass through | The output needs both direct and delayed indirect activation, so short pulses are ignored.

## Chemical Modelling
S: Chemical modelling uses mathematics to describe molecules, reactions and reactors. It ranges from quantum chemistry and molecular dynamics to reaction kinetics and reactor design, connecting atomic-scale behaviour to industrial processes.
O: Describe the scales of chemical modelling
O: Apply mass balances to simple reactors
T: Continuous stirred-tank reactor | CSTR: a well-mixed reactor with continuous inflow and outflow, modelled by ODEs
T: Residence time | τ = V/Q, the average time fluid spends in a reactor of volume V with flow rate Q
H: Scales
- Quantum chemistry: electronic structure (density functional theory).
- Molecular dynamics: atoms moving under force fields.
- Kinetics: rates of reactions in mixtures.
- Process engineering: reactors, separation, plant design.
H: Reactor models
- Batch reactor: dC/dt = −r(C).
- CSTR: V dC/dt = Q(C_{in} − C) − Vr(C).
- Plug flow reactor: concentration varies along the length.
- Heat balances with Arrhenius rates give multiple steady states.
H: Uses
- Designing catalysts and drugs.
- Combustion and atmospheric chemistry.
- Scale-up from laboratory to plant.
- Safety: thermal runaway analysis.
X: A CSTR has V = 2 m^{3}, Q = 0.5 m^{3}/min and a first-order reaction with k = 0.75 per minute. Find the outlet conversion.
> Residence time τ = V/Q = 4 minutes
> Steady state: C = C_{in}/(1 + kτ) = C_{in}/(1 + 3)
> C = 0.25 C_{in}, so 75% conversion
K: Chemical modelling spans quantum to plant scales; reactor models apply mass and energy balances; CSTR conversion for first order is kτ/(1 + kτ); heat effects can create multiple steady states.
!: Using batch-reactor formulas for a continuous stirred tank.
Q: What is the residence time of a reactor? | τ = V/Q.
Q: What is the first-order CSTR conversion? | kτ/(1 + kτ).
SUM: Models connect molecules to reactors.
SUM: Mass balances drive reactor design.
SRC: Levenspiel O, Chemical Reaction Engineering (3rd edn, Wiley 1999) | textbook | 1999 | https://www.wiley.com/
SRC: Fogler HS, Elements of Chemical Reaction Engineering (6th edn, Pearson 2020) | textbook | 2020 | https://www.pearson.com/
NUM1#maths-u20-21-q1@1: A CSTR with τ = 10 minutes runs a first-order reaction with k = 0.1 per minute. What fraction is converted? | 0.5 | 0.001 |  | kτ = 1, so conversion = 1/(1 + 1) = 0.5.
M1#maths-u20-21-q2@1: A reactor has volume 6 m^{3} and flow rate 2 m^{3}/h. What is its residence time? | 3 hours | 12 hours | 0.33 hours | 8 hours | 4 hours | The residence time is τ = V/Q = 6/2 = 3 hours, the average time a fluid element spends inside the reactor.
M2#maths-u20-21-q3@2: Why can an exothermic CSTR have several steady states? | Heat generation is a sigmoidal function of temperature, which can cross the linear heat-removal line more than once | Reactors never have steady states when the reaction releases heat | Mass balances always have exactly one solution, so it must be the flow | The flow rate keeps changing, so the reactor never settles at all | It can only have one steady state, whatever the reaction kinetics | Arrhenius kinetics make heat production rise steeply, giving low, middle and high intersections.

## Reaction Kinetics
S: Reaction kinetics measures how fast reactions go and how rates depend on concentrations. Rate laws, reaction orders and half-lives come from experiments and give integrated equations for concentrations over time.
O: Write rate laws and determine reaction order from data
O: Use integrated rate laws and half-lives
T: Rate law | rate = k[A]^{m}[B]^{n}, with rate constant k and orders m, n found experimentally
T: Half-life | The time for a reactant's concentration to halve; ln 2/k for first-order reactions
H: Orders and integrated laws
- Zero order: [A] = [A]₀ − kt; half-life [A]₀/(2k).
- First order: [A] = [A]₀e^{−kt}; half-life ln 2/k (independent of concentration).
- Second order: 1/[A] = 1/[A]₀ + kt; half-life 1/(k[A]₀).
H: Finding orders
- Method of initial rates: vary one concentration at a time.
- Linear plots: ln[A] vs t (first order) or 1/[A] vs t (second order).
- Isolation (pseudo-first-order) using large excess of one reactant.
H: Units and examples
- k has units depending on order: s^{−1} for first, M^{−1}s^{−1} for second.
- Radioactive decay is first order.
- 2NO₂ → 2NO + O₂ is second order in NO₂.
X: Doubling [A] quadruples the initial rate; doubling [B] leaves it unchanged. Find the rate law.
> Rate ∝ [A]^{m}: 2^{m} = 4 gives m = 2
> Rate ∝ [B]^{n}: 2^{n} = 1 gives n = 0
> Rate = k[A]^{2}: second order overall
K: Rate laws have experimentally determined orders; integrated laws give concentration over time; first-order half-lives are constant; initial rates and linear plots find orders.
!: Reading reaction orders from stoichiometric coefficients instead of experiments.
Q: What is the half-life of a first-order reaction? | ln 2/k.
Q: What plot is linear for a second-order reaction? | 1/[A] against t.
SUM: Rates depend on concentrations.
SUM: Orders come from experiment.
SRC: Atkins P, de Paula J, Keeler J, Atkins' Physical Chemistry (12th edn, Oxford University Press 2022) | textbook | 2022 | https://global.oup.com/
SRC: Houston PL, Chemical Kinetics and Reaction Dynamics (McGraw-Hill 2001; Dover 2006) | textbook | 2006 | https://store.doverpublications.com/
NUM1#maths-u20-22-q1@1: A first-order reaction has k = 0.0231 per minute. What is its half-life in minutes, to the nearest minute? | 30 | 0.5 | minutes | t_{½} = 0.693/0.0231 ≈ 30 minutes.
M1#maths-u20-22-q2@1: Which plot is a straight line for a first-order reaction? | ln[A] against time | [A] against time | 1/[A] against time | [A]^{2} against time | Rate against time | Integrating d[A]/dt = −k[A] gives ln[A] = ln[A]₀ − kt, a straight line of slope −k when ln[A] is plotted against time.
M2#maths-u20-22-q3@2: Why is a first-order half-life independent of starting concentration? | The fraction reacting per unit time is constant, so halving always takes ln 2/k | Concentration doesn't affect the rate of any reaction | All chemical reactions are first order in practice | The rate constant changes with concentration to compensate | It isn't independent; it doubles as concentration doubles | Exponential decay removes the same proportion in equal times.

## Chemical Kinetics
S: Chemical kinetics explains rates through mechanisms, sequences of elementary steps, and through temperature via the Arrhenius equation. Approximations such as steady state and pre-equilibrium turn complex mechanisms into usable rate laws, including Michaelis–Menten enzyme kinetics.
O: Use the Arrhenius equation to relate rate to temperature
O: Apply steady-state and rate-determining-step approximations
T: Arrhenius equation | k = A e^{−E_{a}/RT}, with activation energy E_{a}, gas constant R and temperature T
T: Steady-state approximation | Setting the rate of change of a reactive intermediate to zero to simplify a mechanism
H: Temperature dependence
- ln k = ln A − E_{a}/(RT): plot ln k against 1/T to find E_{a}.
- Rule of thumb: rates roughly double per 10 °C rise near room temperature for E_{a} ≈ 50 kJ/mol.
- Transition state theory (Eyring) explains A.
H: Mechanisms
- Elementary steps have orders equal to their molecularity.
- Rate-determining step: the slowest step limits the overall rate.
- Pre-equilibrium: fast reversible step before a slow step.
- Chain reactions with initiation, propagation and termination (H₂ + Br₂).
H: Enzyme kinetics
- Michaelis–Menten: v = V_{max}[S]/(K_{m} + [S]), from the steady-state approximation for ES.
- K_{m} is the substrate level giving half-maximal rate.
- Lineweaver–Burk plots and modern nonlinear fitting.
X: A reaction has E_{a} = 50 kJ/mol. By what factor does k increase from 300 K to 310 K?
> ln(k₂/k₁) = (E_{a}/R)(1/T₁ − 1/T₂) = (50,000/8.314)(1/300 − 1/310)
> = 6014 × 1.075 × 10^{−4} ≈ 0.647
> k₂/k₁ = e^{0.647} ≈ 1.9: nearly doubled
K: Arrhenius links rate constants to temperature and activation energy; mechanisms use elementary steps; steady-state and rate-determining-step approximations give rate laws; Michaelis–Menten follows for enzymes.
!: Applying the steady-state approximation to species that accumulate rather than stay small.
Q: What is K_{m} in Michaelis–Menten kinetics? | The substrate concentration giving half the maximum rate.
Q: What do you plot to find an activation energy? | ln k against 1/T.
SUM: Mechanisms explain rate laws.
SUM: Temperature acts through E_{a}.
SRC: Michaelis L, Menten ML, Die Kinetik der Invertinwirkung, Biochemische Zeitschrift 49, 333 | journal | 1913 | https://archive.org/
SRC: Atkins P, de Paula J, Keeler J, Atkins' Physical Chemistry (12th edn, Oxford University Press 2022) | textbook | 2022 | https://global.oup.com/
NUM1#maths-u20-23-q1@1: An enzyme has V_{max} = 100 μM/s and K_{m} = 5 μM. What is the rate at [S] = 20 μM? | 80 | 0 | μM/s | v = 100 × 20/(5 + 20) = 80 μM/s.
M1#maths-u20-23-q2@1: In a two-step mechanism with a slow first step and fast second step, what determines the overall rate? | The slow first step | The fast second step | Both steps equally | Neither step | The stoichiometry only | The rate-determining step is the bottleneck of the sequence.
M3#maths-u20-23-q3@2: Why does the steady-state approximation apply to the enzyme–substrate complex in Michaelis–Menten kinetics? | ES forms and breaks down quickly, so its concentration stays nearly constant after a brief initial phase | ES never forms in significant amounts, so its rate of change is exactly zero | Substrate concentration is always zero, so ES can't change | Enzymes are consumed by the reaction, so ES falls steadily to zero | It doesn't apply; Michaelis–Menten uses the pre-equilibrium approximation only | With enzyme much scarcer than substrate, [ES] quickly reaches a quasi-steady level.

## Reaction Network Theory
S: Reaction network theory studies what the structure of a network of chemical reactions implies about its dynamics, regardless of rate constant values. Results such as the deficiency zero theorem guarantee unique stable equilibria for large classes of networks.
O: Describe complexes, linkage classes and deficiency
O: State what the deficiency zero theorem guarantees
T: Mass-action kinetics | Each reaction proceeds at a rate proportional to the product of its reactant concentrations
T: Deficiency | δ = n − ℓ − s: number of complexes minus linkage classes minus the rank of the stoichiometric matrix
H: Structure
- Complexes: the combinations on each side of a reaction (A + B, 2C).
- Reaction graph: complexes as nodes, reactions as edges.
- Linkage classes: connected components of the graph.
- Weak reversibility: every reaction lies on a cycle.
H: The deficiency zero theorem (Horn, Jackson, Feinberg)
- If the network has deficiency zero and is weakly reversible, then for any rate constants each stoichiometric compatibility class has exactly one positive equilibrium, which is locally asymptotically stable.
- If deficiency zero but not weakly reversible, there are no positive equilibria.
- Rules out multistability and oscillation for such networks.
H: Further results
- Deficiency one theorem.
- Global attractor conjecture (persistence).
- Applications to biochemical signalling and absolute concentration robustness.
X: Find the deficiency of A ⇌ 2B.
> Complexes: A and 2B, so n = 2; one linkage class, ℓ = 1
> Stoichiometric vector (−1, 2) spans a space of rank s = 1
> δ = 2 − 1 − 1 = 0, and the network is reversible, so it has a unique stable equilibrium in each compatibility class
K: Reaction network theory links network structure to dynamics; deficiency δ = n − ℓ − s; deficiency zero plus weak reversibility gives unique stable equilibria for all rate constants.
!: Assuming complex dynamics must require exotic rate constants rather than network structure.
Q: What does deficiency zero with weak reversibility guarantee? | A unique, stable positive equilibrium in each compatibility class.
Q: What is a linkage class? | A connected component of the reaction graph.
SUM: Structure constrains dynamics.
SUM: Deficiency zero means simple behaviour.
SRC: Feinberg M, Foundations of Chemical Reaction Network Theory (Springer 2019) | textbook | 2019 | https://link.springer.com/
SRC: Horn F, Jackson R, General mass action kinetics, Archive for Rational Mechanics and Analysis 47, 81 | journal | 1972 | https://doi.org/10.1007/BF00251225
NUM1#maths-u20-24-q1@1: The network A ⇌ B ⇌ C has how many complexes? | 3 | 0 |  | The complexes are A, B and C; with one linkage class and rank 2, its deficiency is 3 − 1 − 2 = 0.
M1#maths-u20-24-q2@1: Under mass-action kinetics, what is the rate of A + B → C? | k[A][B] | k[A] + k[B] | k[C] | k[A]^{2} | k/[A][B] | Mass action makes the rate proportional to the product of reactant concentrations.
M2#maths-u20-24-q3@2: Why is the deficiency zero theorem powerful for biology? | It rules out multiple equilibria and oscillations for any rate constants, which are often unknown | It gives exact values for all the rate constants of a network | It applies only to networks with a single reaction | It predicts chaotic behaviour in large biochemical networks | It isn't useful in biology, only in industrial chemistry | Conclusions follow from network structure alone, without measuring parameters.

## Reaction-Diffusion Systems
S: Reaction–diffusion systems combine local chemical reactions with spatial diffusion. They produce travelling waves, such as spreading populations or flames, and stationary patterns, such as Turing's spots and stripes, and model processes from nerve impulses to cardiac arrhythmias.
O: Write reaction–diffusion equations and find travelling wave speeds
O: Explain diffusion-driven instability and pattern formation
T: Reaction–diffusion equation | u_{t} = D∇^{2}u + f(u), combining diffusion with local reaction or growth
T: Travelling wave | A solution u(x, t) = U(x − ct) moving at constant speed c without changing shape
H: Travelling waves
- Fisher–KPP equation u_{t} = Du_{xx} + ru(1 − u): minimum wave speed c = 2√(rD).
- Invasions of species, spread of advantageous genes.
- Bistable equations (Nagumo) give fronts with a unique speed.
- Excitable media: spiral waves in heart tissue and the Belousov–Zhabotinsky reaction.
H: Pattern formation
- Turing: two species with different diffusion rates destabilise uniform states.
- Conditions on the Jacobian and the ratio D_{v}/D_{u}.
- Patterns: spots, stripes, labyrinths; examples in zebrafish skin and digit formation.
H: Analysis
- Linear stability with Fourier modes e^{ikx + λt}: find unstable wavenumbers.
- Numerical simulation (finite differences, spectral methods).
- Applications in ecology, chemistry, physiology and tumour growth.
X: For Fisher–KPP with r = 0.5 per year and D = 2 km^{2}/year, find the invasion speed.
> c = 2√(rD)
> = 2√(0.5 × 2) = 2√1
> = 2 km per year
K: Reaction–diffusion couples local reaction with diffusion; Fisher–KPP waves travel at 2√(rD); excitable media give spirals; Turing instabilities produce patterns from differential diffusion.
!: Forgetting that diffusion alone smooths patterns: instability needs reactions with differential diffusion.
Q: What is the Fisher–KPP minimum wave speed? | 2√(rD).
Q: Which chemical reaction shows spiral waves? | The Belousov–Zhabotinsky reaction.
SUM: Reaction plus diffusion makes waves and patterns.
SUM: Speeds and wavelengths are predictable.
SRC: Fisher RA, The wave of advance of advantageous genes, Annals of Eugenics 7(4), 355 | journal | 1937 | https://doi.org/10.1111/j.1469-1809.1937.tb02153.x
SRC: Murray JD, Mathematical Biology II: Spatial Models and Biomedical Applications (3rd edn, Springer 2003) | textbook | 2003 | https://link.springer.com/
NUM1#maths-u20-25-q1@1: For Fisher–KPP with r = 2 per day and D = 0.5 mm^{2}/day, what is the wave speed in mm/day? | 2 | 0 | mm/day | c = 2√(2 × 0.5) = 2√1 = 2 mm/day.
M1#maths-u20-25-q2@1: How does the Fisher–KPP wave speed change if the diffusion coefficient quadruples? | It doubles | It quadruples | It halves | It stays the same | It increases 16-fold | c = 2√(rD) scales with √D, so 4D gives twice the speed.
M3#maths-u20-25-q3@2: Why does diffusion, which smooths things out, help create Turing patterns? | Different diffusion rates let an inhibitor spread faster than the activator, so local peaks grow while neighbours are suppressed | Diffusion always creates patterns on its own, without any reactions | Patterns need equal diffusion rates for the activator and inhibitor | Diffusion has no role in Turing patterns; reactions alone make them | It doesn't help: diffusion always destroys patterns, as intuition suggests | Differential diffusion destabilises the uniform state at certain wavelengths.

## Physical Modelling
S: Physical modelling describes the physical world with mathematics, starting from conservation laws and constitutive relations. Choosing what to keep and what to neglect, guided by scales and dimensionless numbers, is the art of making a model both accurate and solvable.
O: Build models from conservation laws and constitutive relations
O: Use scale analysis to simplify physical models
T: Conservation law | A statement that a quantity (mass, momentum, energy, charge) changes only by fluxes through boundaries and sources inside
T: Constitutive relation | A material-specific law closing the equations, such as Hooke's law, Fourier's law or Ohm's law
H: Ingredients
- Conservation: ∂ρ/∂t + ∇·(flux) = source.
- Constitutive laws link fluxes to gradients (heat flux q = −k∇T).
- Boundary and initial conditions.
- Material parameters from experiments.
H: Simplifying
- Non-dimensionalise and compare terms by size.
- Neglect small effects (thin layers, slow processes).
- Exploit symmetry (axisymmetry, steady state).
- Lumped models when spatial variation is small (Biot number ≪ 1).
H: Checking
- Dimensional consistency and limiting cases.
- Conservation in numerical results.
- Compare with experiments and simpler known solutions.
- Know the regime of validity.
X: Derive the 1D heat equation from conservation of energy and Fourier's law.
> Energy balance: ρc ∂T/∂t = −∂q/∂x
> Fourier's law: q = −k ∂T/∂x
> Combine: ∂T/∂t = (k/ρc) ∂^{2}T/∂x^{2}, the heat equation with diffusivity α = k/ρc
K: Physical models combine conservation laws with constitutive relations and boundary conditions; scale analysis simplifies them; check consistency, limits and regimes of validity.
!: Applying a model outside the regime where its simplifying assumptions hold.
Q: What is a constitutive relation? | A material-specific law, such as Hooke's or Fourier's law.
Q: What is the thermal diffusivity in terms of k, ρ and c? | α = k/(ρc).
SUM: Conservation plus constitutive laws.
SUM: Scaling decides what to keep.
SRC: Fowler AC, Mathematical Models in the Applied Sciences (Cambridge University Press 1997) | textbook | 1997 | https://www.cambridge.org/
SRC: Lin CC, Segel LA, Mathematics Applied to Deterministic Problems in the Natural Sciences (SIAM 1988) | textbook | 1988 | https://epubs.siam.org/
NUM1#maths-u20-26-q1@1: Copper has k = 400 W/(m·K), ρ = 9000 kg/m^{3} and c = 385 J/(kg·K). Find its thermal diffusivity in units of 10^{−4} m^{2}/s, to 2 decimal places. | 1.15 | 0.01 |  | α = 400/(9000 × 385) ≈ 1.15 × 10^{−4} m^{2}/s.
M1#maths-u20-26-q2@1: Which is a constitutive relation rather than a conservation law? | Fourier's law q = −k∇T | Conservation of mass | Conservation of energy | Conservation of momentum | Conservation of charge | Fourier's law describes how a particular material conducts heat.
M2#maths-u20-26-q3@2: When can a heated object be modelled with a single temperature (a lumped model)? | When the Biot number is small, so internal conduction is fast compared with surface heat loss | When the object is very large compared with its surroundings | When heat transfer to the surroundings is exactly zero | When the object is a gas rather than a solid | Never: real objects always need spatial temperature models | Small Bi means temperature is nearly uniform inside the body.

## Mathematical Physics
S: Mathematical physics develops the mathematics needed for physical theories and proves results about them rigorously. Its methods include differential equations, functional analysis, group theory and geometry, and it has produced ideas that transformed pure mathematics.
O: Describe the main areas and methods of mathematical physics
O: Explain the role of symmetry and Noether's theorem
T: Noether's theorem | Every continuous symmetry of a physical system's action corresponds to a conserved quantity
T: Variational principle | A law stating that the physical path makes a functional, such as the action, stationary
H: Areas
- Classical mechanics and its geometry (symplectic manifolds).
- Quantum mechanics and operator theory on Hilbert spaces.
- Relativity and differential geometry.
- Statistical mechanics, quantum field theory, integrable systems.
H: Symmetry
- Time translation symmetry gives energy conservation.
- Space translation gives momentum; rotation gives angular momentum.
- Lie groups classify particles (SU(3) in the quark model).
- Gauge symmetry underlies the Standard Model.
H: Influence on mathematics
- Fourier analysis, distributions, spectral theory.
- Knot invariants from quantum field theory (Witten, Jones).
- Mirror symmetry in geometry.
- Rigorous results: stability of matter (Lieb), Onsager's Ising solution.
X: A particle moves freely in a plane with Lagrangian L = ½m(ẋ^{2} + ẏ^{2}). Which quantities does Noether's theorem conserve?
> L doesn't depend on t: energy is conserved
> L doesn't depend on x or y: linear momenta mẋ and mẏ are conserved
> L is unchanged by rotations: angular momentum m(xẏ − yẋ) is conserved
K: Mathematical physics supplies and rigorises the mathematics of physics; variational principles and Noether's theorem link symmetries to conservation laws; it has enriched pure mathematics greatly.
!: Thinking conservation laws are separate assumptions rather than consequences of symmetry.
Q: Which symmetry gives conservation of energy? | Time-translation symmetry.
Q: Who proved the link between symmetries and conservation laws in 1918? | Emmy Noether.
SUM: Physics needs and inspires mathematics.
SUM: Symmetry gives conservation.
SRC: Noether E, Invariante Variationsprobleme, Nachrichten von der Gesellschaft der Wissenschaften zu Göttingen, 235 | journal | 1918 | https://eudml.org/
SRC: Arnold VI, Mathematical Methods of Classical Mechanics (2nd edn, Springer 1989) | textbook | 1989 | https://link.springer.com/
NUM1#maths-u20-27-q1@1: In what year did Emmy Noether publish her theorem on symmetries and conservation laws? | 1918 | 0 |  | Noether's "Invariante Variationsprobleme" appeared in 1918.
M1#maths-u20-27-q2@1: Rotational symmetry of a system implies conservation of which quantity? | Angular momentum | Linear momentum | Energy | Electric charge | Mass | By Noether's theorem, invariance under rotations conserves angular momentum.
M2#maths-u20-27-q3@2: Which branch of mathematics provides the setting for quantum mechanics? | Operator theory on Hilbert spaces | Euclidean geometry alone | Elementary number theory | Finite graph theory | Boolean algebra | States are vectors in a Hilbert space and observables are self-adjoint operators.

## Mathematical Physics Equations
S: A handful of partial differential equations, the wave, heat, Laplace and Schrödinger equations, describe vast areas of physics. Classifying them as hyperbolic, parabolic or elliptic tells you how information travels and which conditions give a well-posed problem.
O: Classify second-order linear PDEs
O: Solve classic equations by separation of variables
T: Hyperbolic, parabolic and elliptic | Classes of second-order PDEs (like the wave, heat and Laplace equations) by the sign of B^{2} − 4AC
T: Separation of variables | Seeking solutions u = X(x)T(t), turning a PDE into ODEs
H: The classic equations
- Wave: u_{tt} = c^{2}∇^{2}u (strings, sound, light).
- Heat or diffusion: u_{t} = D∇^{2}u.
- Laplace: ∇^{2}u = 0 (steady temperature, electrostatics, potential flow); Poisson with a source.
- Schrödinger: iħψ_{t} = −(ħ^{2}/2m)∇^{2}ψ + Vψ.
H: Classification (Au_{xx} + Bu_{xy} + Cu_{yy} + …)
- B^{2} − 4AC > 0 hyperbolic: finite-speed propagation along characteristics.
- = 0 parabolic: smoothing, infinite-speed diffusion.
- < 0 elliptic: equilibrium; boundary values everywhere.
H: Solution methods
- Separation of variables with Fourier series.
- d'Alembert's solution of the wave equation.
- Green's functions and integral transforms.
- Special functions (Bessel, Legendre) from separation in other coordinates.
X: Solve the heat equation u_{t} = u_{xx} on [0, π] with u = 0 at both ends and u(x, 0) = sin x.
> Try u = T(t) sin x: T′ sin x = −T sin x, so T′ = −T
> T = e^{−t}
> u(x, t) = e^{−t} sin x, decaying smoothly
K: The wave, heat, Laplace and Schrödinger equations underpin physics; B^{2} − 4AC classifies PDEs; separation of variables, Fourier series and Green's functions solve them.
!: Imposing initial conditions on an elliptic equation, which needs boundary conditions instead.
Q: What type is the heat equation? | Parabolic.
Q: What is d'Alembert's solution of the wave equation? | u = f(x − ct) + g(x + ct).
SUM: A few PDEs describe much of physics.
SUM: Type determines behaviour.
SRC: Evans LC, Partial Differential Equations (2nd edn, American Mathematical Society 2010) | textbook | 2010 | https://bookstore.ams.org/
SRC: Strauss WA, Partial Differential Equations: An Introduction (2nd edn, Wiley 2008) | textbook | 2008 | https://www.wiley.com/
NUM1#maths-u20-28-q1@1: For u(x, t) = e^{−4t} sin 2x (a heat equation solution), what is u(π/4, 0.25)? | 0.368 | 0.001 |  | sin(π/2) = 1 and e^{−1} ≈ 0.368.
M1#maths-u20-28-q2@1: What type is u_{xx} + u_{yy} = 0? | Elliptic | Hyperbolic | Parabolic | First-order | Nonlinear | A = C = 1, B = 0 give B^{2} − 4AC = −4 < 0.
M3#maths-u20-28-q3@2: Why do disturbances in the wave equation travel at finite speed while heat spreads instantly? | Hyperbolic equations carry information along characteristics at speed c, while parabolic smoothing affects all points at once | Heat travels at the speed of light, while waves are slower than sound | Waves have infinite speed, while heat spreads at a fixed finite speed | Both travel at the same finite speed, set by the material's density | Both spread instantly, since all linear PDEs have infinite propagation speed | The heat kernel is positive everywhere for any t > 0, unlike wave solutions.

## Classical Mechanics
S: Classical mechanics describes how bodies move under forces, from falling apples to planetary orbits. Newton's laws, and the equivalent Lagrangian and Hamiltonian formulations, give equations whose solutions predict motion with extraordinary accuracy at everyday scales.
O: Apply Newton's laws and energy conservation
O: Use Lagrangian and Hamiltonian mechanics
T: Lagrangian | L = T − V, kinetic minus potential energy, whose Euler–Lagrange equations give the equations of motion
T: Hamiltonian | H = T + V expressed in positions and momenta, generating motion through ṗ = −∂H/∂q and q̇ = ∂H/∂p
H: Newtonian mechanics
- F = ma; action and reaction.
- Conservation of energy, momentum and angular momentum.
- Central forces and Kepler's laws.
- Simple harmonic motion: ẍ = −ω^{2}x.
H: Lagrangian mechanics
- Euler–Lagrange: d/dt(∂L/∂q̇) − ∂L/∂q = 0.
- Generalised coordinates handle constraints easily.
- Principle of stationary action.
H: Hamiltonian mechanics
- Phase space (q, p); Liouville's theorem preserves phase-space volume.
- Integrable systems and action–angle variables.
- Basis for statistical and quantum mechanics.
- Small perturbations lead to KAM theory and chaos.
X: Derive the pendulum equation from L = ½mL^{2}θ̇^{2} + mgL cos θ.
> ∂L/∂θ̇ = mL^{2}θ̇, so d/dt(∂L/∂θ̇) = mL^{2}θ̈
> ∂L/∂θ = −mgL sin θ
> Euler–Lagrange: mL^{2}θ̈ + mgL sin θ = 0, so θ̈ = −(g/L) sin θ
K: Newton's laws, Lagrangian and Hamiltonian mechanics are equivalent formulations; conservation laws follow from symmetries; Hamiltonian phase space underlies statistical mechanics and chaos.
!: Using the small-angle approximation sin θ ≈ θ for large pendulum swings.
Q: What is the Lagrangian of a system? | Kinetic energy minus potential energy.
Q: What does Liouville's theorem say? | Hamiltonian flow preserves phase-space volume.
SUM: Forces determine motion.
SUM: Lagrangians and Hamiltonians generalise Newton.
SRC: Goldstein H, Poole C, Safko J, Classical Mechanics (3rd edn, Addison-Wesley 2002) | textbook | 2002 | https://www.pearson.com/
SRC: Landau LD, Lifshitz EM, Mechanics (3rd edn, Butterworth-Heinemann 1976) | textbook | 1976 | https://www.elsevier.com/
NUM1#maths-u20-29-q1@1: A small-angle pendulum has length 2.45 m with g = 9.8 m/s^{2}. What is its period in seconds, to 2 decimal places? | 3.14 | 0.01 | s | T = 2π√(L/g) = 2π√0.25 = π ≈ 3.14 s.
M1#maths-u20-29-q2@1: A 2 kg ball falls 5 m from rest (g = 10 m/s^{2}). What is its speed just before landing? | 10 m/s | 5 m/s | 50 m/s | 100 m/s | 20 m/s | Energy conservation: ½v^{2} = gh = 50, so v = 10 m/s.
M2#maths-u20-29-q3@2: What advantage does the Lagrangian formulation have over Newton's laws for constrained systems? | Generalised coordinates build constraints in, so constraint forces never need computing | It ignores energy, so friction forces drop out automatically | It only works for systems without any constraints at all | It needs more equations than Newton's laws, but each is simpler | It has no advantage; it is just Newton's laws in different notation | A pendulum needs one angle, not two coordinates plus tension.

## Continuum Mechanics
S: Continuum mechanics treats materials as continuous, ignoring atoms, and describes how they deform and flow under forces. It unifies solid and fluid mechanics through stress, strain and conservation laws, with constitutive laws distinguishing materials.
O: Define stress and strain tensors and the Cauchy momentum equation
O: Distinguish Lagrangian and Eulerian descriptions
T: Stress tensor | σ, the 3 × 3 symmetric tensor giving the force per unit area on any surface through a point: traction t = σn
T: Strain tensor | ε = ½(∇u + ∇uᵀ) for small displacements u, measuring local stretching and shearing
H: Kinematics
- Lagrangian: follow material points (natural for solids).
- Eulerian: watch fixed points in space (natural for fluids).
- Material derivative D/Dt = ∂/∂t + v·∇.
- Small and finite strain measures.
H: Balance laws
- Mass: ∂ρ/∂t + ∇·(ρv) = 0.
- Momentum (Cauchy): ρ Dv/Dt = ∇·σ + ρb.
- Angular momentum makes σ symmetric.
- Energy and the second law (entropy inequality).
H: Constitutive laws
- Elastic solids: σ depends on strain (Hooke).
- Newtonian fluids: σ = −pI + 2μ × (strain rate).
- Viscoelastic, plastic and non-Newtonian materials.
- Frame indifference restricts admissible laws.
X: A bar of cross-section 0.01 m^{2} carries a 5000 N axial load. Find the normal stress, and the stress on a plane at 45°.
> Normal stress σ = F/A = 5000/0.01 = 5 × 10^{5} Pa
> On a 45° plane: normal stress σ cos^{2}45° = 2.5 × 10^{5} Pa
> Shear stress σ sin 45° cos 45° = 2.5 × 10^{5} Pa, the maximum shear
K: Continuum mechanics uses stress and strain tensors with mass, momentum and energy balances; Lagrangian and Eulerian views suit solids and fluids; constitutive laws distinguish materials.
!: Applying continuum models at scales comparable to atomic or grain sizes.
Q: What does the material derivative represent? | The rate of change following a moving material point.
Q: Why is the stress tensor symmetric? | Balance of angular momentum.
SUM: Materials as continua.
SUM: Stress, strain and balance laws.
SRC: Gonzalez O, Stuart AM, A First Course in Continuum Mechanics (Cambridge University Press 2008) | textbook | 2008 | https://www.cambridge.org/
SRC: Gurtin ME, Fried E, Anand L, The Mechanics and Thermodynamics of Continua (Cambridge University Press 2010) | textbook | 2010 | https://www.cambridge.org/
NUM1#maths-u20-30-q1@1: A rod of cross-section 2 × 10^{−4} m^{2} carries 10,000 N. What is the axial stress in MPa? | 50 | 0 | MPa | σ = 10,000/(2 × 10^{−4}) = 5 × 10^{7} Pa = 50 MPa.
M1#maths-u20-30-q2@1: Which description follows individual material particles as they move? | The Lagrangian description | The Eulerian description | The Hamiltonian description | The spectral description | The statistical description | Lagrangian coordinates label material points, natural for solids.
M2#maths-u20-30-q3@2: In a bar under axial tension, on which plane is the shear stress largest? | Planes at 45° to the axis | Planes perpendicular to the axis | Planes parallel to the axis | All planes equally | No plane | Shear stress σ sin θ cos θ is maximised at θ = 45°.

## Solid Mechanics
S: Solid mechanics predicts how structures and components deform, carry loads and fail. Beam theory, stress concentration and failure criteria let engineers design bridges, aircraft and implants that are strong, stiff and safe.
O: Use beam theory to find bending stresses and deflections
O: Apply stress concentration factors and failure criteria
T: Euler–Bernoulli beam equation | EI d^{4}w/dx^{4} = q(x), relating deflection w to load q via bending stiffness EI
T: Von Mises stress | An equivalent stress combining principal stresses, used to predict yielding in ductile materials
H: Beams
- Bending stress σ = My/I (moment M, distance y from the neutral axis, second moment I).
- Cantilever with end load P: tip deflection PL^{3}/(3EI).
- Simply supported with central load: PL^{3}/(48EI).
- I-beams put material far from the neutral axis for high I.
H: Stress concentration
- Holes, notches and corners raise local stress.
- A circular hole in a wide plate: factor K_{t} = 3.
- Fatigue cracks start at concentrations.
H: Failure
- Ductile yielding: von Mises or Tresca criteria.
- Brittle fracture: fracture mechanics (stress intensity K_{IC}).
- Buckling of slender columns: Euler load π^{2}EI/L^{2}.
- Fatigue under cyclic loads (S–N curves).
X: A steel cantilever (E = 200 GPa, I = 8 × 10^{−6} m^{4}) of length 2 m carries 1000 N at its tip. Find the tip deflection.
> δ = PL^{3}/(3EI)
> = 1000 × 8/(3 × 200 × 10^{9} × 8 × 10^{−6})
> = 8000/(4.8 × 10^{6}) ≈ 1.67 mm
K: Beam theory gives bending stresses My/I and deflections; stress concentrations raise local stress; failure occurs by yielding, fracture, buckling or fatigue, each with its own criterion.
!: Ignoring stress concentrations at holes and corners.
Q: What is the stress concentration factor for a circular hole in a wide plate under tension? | 3.
Q: What is the Euler buckling load? | π^{2}EI/L^{2} (pinned ends).
SUM: Beams bend; structures fail in several ways.
SUM: Design guards against each failure mode.
SRC: Gere JM, Goodno BJ, Mechanics of Materials (9th edn, Cengage 2018) | textbook | 2018 | https://www.cengage.com/
SRC: Timoshenko SP, Goodier JN, Theory of Elasticity (3rd edn, McGraw-Hill 1970) | textbook | 1970 | https://www.mheducation.com/
NUM1#maths-u20-31-q1@1: How does a cantilever's tip deflection change if its length doubles (same load)? | 8 | 0 | times | δ ∝ L^{3}, so doubling L multiplies deflection by 2^{3} = 8.
M1#maths-u20-31-q2@1: Why are I-beams efficient in bending? | They place most material far from the neutral axis, giving a large second moment of area | They are lighter than every other cross-section of the same height | They have no neutral axis, so bending stresses can't develop | They resist torsion better than any other open cross-section | They aren't efficient; solid rectangular beams are always better | Bending stiffness depends on I = ∫ y^{2} dA, which rewards distance from the axis.
M2#maths-u20-31-q3@2: Which failure mode governs a long slender column under compression? | Buckling | Tensile yielding | Fatigue cracking | Creep | Corrosion | Slender columns become unstable at the Euler load, often well below the yield load.

## Elasticity Theory
S: Elasticity theory describes materials that return to their original shape when loads are removed. Hooke's law and its generalisations, with the equations of equilibrium and compatibility, predict deformation, stress fields and elastic waves.
O: Use Young's modulus, Poisson's ratio and the generalised Hooke's law
O: Describe elastic waves and classic elasticity solutions
T: Young's modulus | E = stress/strain in uniaxial tension, measuring stiffness
T: Poisson's ratio | ν, minus the ratio of lateral to axial strain; between 0 and 0.5 for most materials
H: Linear elasticity
- Uniaxial: σ = Eε.
- Isotropic 3D: σ = λ tr(ε) I + 2μ ε, with Lamé constants λ and μ (shear modulus G = μ).
- E, ν, G and bulk modulus K are linked: G = E/(2(1 + ν)).
- Incompressible materials have ν = 0.5 (rubber approximately).
H: Boundary value problems
- Navier's equations: μ∇^{2}u + (λ + μ)∇(∇·u) + body force = 0.
- Airy stress function for 2D problems.
- Kirsch solution: stress around a hole (factor 3).
- Hertz contact theory for spheres and cylinders.
H: Elastic waves
- P waves (compression) speed √((λ + 2μ)/ρ); S waves (shear) √(μ/ρ).
- P waves travel faster, so they arrive first in earthquakes.
- Rayleigh surface waves cause much damage.
X: A steel wire (E = 200 GPa) 2 m long with cross-section 10^{−6} m^{2} carries 100 N. Find its extension.
> Stress σ = 100/10^{−6} = 10^{8} Pa
> Strain ε = σ/E = 10^{8}/(2 × 10^{11}) = 5 × 10^{−4}
> Extension = εL = 1 mm
K: Elasticity links stress and strain through E, ν and the Lamé constants; Navier's equations and stress functions solve problems; P and S waves carry elastic energy at different speeds.
!: Applying linear elasticity beyond the yield point.
Q: What is Poisson's ratio for an incompressible material? | 0.5.
Q: Which seismic waves arrive first? | P waves.
SUM: Elastic materials spring back.
SUM: Moduli quantify stiffness.
SRC: Timoshenko SP, Goodier JN, Theory of Elasticity (3rd edn, McGraw-Hill 1970) | textbook | 1970 | https://www.mheducation.com/
SRC: Landau LD, Lifshitz EM, Theory of Elasticity (3rd edn, Butterworth-Heinemann 1986) | textbook | 1986 | https://www.elsevier.com/
NUM1#maths-u20-32-q1@1: A material has E = 210 GPa and ν = 0.3. What is its shear modulus G in GPa, to the nearest whole number? | 81 | 1 | GPa | G = E/(2(1 + ν)) = 210/2.6 ≈ 80.8 GPa.
M1#maths-u20-32-q2@1: A rod is stretched with axial strain 0.001 and ν = 0.25. What is its lateral strain? | −0.00025 | 0.00025 | −0.001 | 0.004 | −0.25 | Lateral strain = −ν × axial strain = −0.25 × 0.001.
M2#maths-u20-32-q3@2: Why do P waves travel faster than S waves? | P-wave speed involves λ + 2μ, which exceeds the shear modulus μ alone | S waves carry more energy, which slows them down | P waves travel only in liquids, where sound is fast | Their speeds are equal in every elastic solid | S waves are faster, since shear is stiffer than compression | Compressional stiffness is greater than shear stiffness, so √((λ + 2μ)/ρ) > √(μ/ρ).

## Plasticity Theory
S: Plasticity theory describes permanent deformation once a material yields. It needs a yield criterion, a flow rule and hardening laws, and it explains metal forming, ductile failure and why structures can carry more load than first yield suggests.
O: Apply the Tresca and von Mises yield criteria
O: Describe flow rules, hardening and limit analysis
T: Yield criterion | A condition on the stress state at which plastic flow begins, such as von Mises: σ_{vm} = σ_{Y}
T: Strain hardening | An increase in yield stress as plastic deformation proceeds
H: Yielding
- Uniaxial: yield at σ_{Y}; beyond it, permanent strain remains on unloading.
- Von Mises: √(½[(σ₁ − σ₂)^{2} + (σ₂ − σ₃)^{2} + (σ₃ − σ₁)^{2}]) = σ_{Y}.
- Tresca: maximum shear stress (σ_{max} − σ_{min})/2 = σ_{Y}/2.
- Hydrostatic pressure doesn't cause yielding in metals.
H: Flow and hardening
- Associated flow rule: plastic strain increment normal to the yield surface.
- Isotropic hardening expands the yield surface; kinematic hardening shifts it (Bauschinger effect).
- Perfect plasticity: no hardening.
H: Structural consequences
- Plastic hinges in beams and limit (collapse) load analysis.
- Shakedown under cyclic loads.
- Metal forming (rolling, forging) and crash simulation.
- Residual stresses after unloading.
X: A thin tube has principal stresses σ₁ = 200 MPa, σ₂ = 100 MPa, σ₃ = 0. Does it yield by von Mises if σ_{Y} = 250 MPa?
> σ_{vm} = √(½[(100)^{2} + (100)^{2} + (200)^{2}]) = √(½ × 60,000)
> = √30,000 ≈ 173 MPa
> 173 < 250, so it doesn't yield
K: Plasticity needs a yield criterion, flow rule and hardening law; von Mises and Tresca predict yielding in metals; hydrostatic stress doesn't cause yield; limit analysis gives collapse loads.
!: Assuming hydrostatic pressure alone can make a metal yield.
Q: Which stress component doesn't cause yielding in metals? | Hydrostatic pressure.
Q: What is the Bauschinger effect? | A lower yield stress on reversed loading after plastic deformation.
SUM: Plasticity is permanent deformation.
SUM: Yield criteria and flow rules govern it.
SRC: Hill R, The Mathematical Theory of Plasticity (Oxford University Press 1950, reissued 1998) | textbook | 1998 | https://global.oup.com/
SRC: Lubliner J, Plasticity Theory (Dover 2008) | textbook | 2008 | https://store.doverpublications.com/
NUM1#maths-u20-33-q1@1: By the Tresca criterion, what is the maximum shear stress for principal stresses 300, 100 and 0 MPa, in MPa? | 150 | 0 | MPa | (σ_{max} − σ_{min})/2 = (300 − 0)/2 = 150 MPa.
M1#maths-u20-33-q2@1: What happens to a metal bar loaded past yield and then unloaded? | It keeps a permanent plastic strain | It returns exactly to its original length | It fractures immediately | It becomes elastic with no yield stress | It shrinks below its original length | Plastic strain remains after the elastic part recovers.
M3#maths-u20-33-q3@2: Why can a steel beam carry more load than the load at first yield? | After the outer fibres yield, inner material takes more stress until a full plastic hinge forms | Steel never yields under bending, so first yield never occurs | First yield is the collapse load, so it can't carry any more | Hardening is infinite in steel, so the load can rise forever | It can't: a beam collapses as soon as any fibre yields | Plastic redistribution raises the collapse moment above the yield moment (by 1.5 for rectangles).

## Fluid Mechanics
S: Fluid mechanics studies liquids and gases at rest and in motion. Its basic principles, pressure in fluids, buoyancy, conservation of mass and Bernoulli's equation, explain why ships float, how pipes carry water and why aeroplane wings produce lift.
O: Calculate hydrostatic pressure and buoyancy
O: Apply the continuity equation and Bernoulli's equation
T: Bernoulli's equation | p + ½ρv^{2} + ρgh is constant along a streamline in steady, inviscid, incompressible flow
T: Archimedes' principle | A submerged body feels an upward force equal to the weight of fluid it displaces
H: Fluid statics
- Pressure increases with depth: p = p₀ + ρgh.
- Pascal's principle: pressure is transmitted equally (hydraulic presses).
- Buoyancy and stability of floating bodies (metacentre).
H: Flow basics
- Continuity: A₁v₁ = A₂v₂ for incompressible flow in a pipe.
- Bernoulli: faster flow means lower pressure (Venturi meters).
- Torricelli: outflow speed √(2gh).
H: Real fluids
- Viscosity causes losses: Darcy–Weisbach head loss.
- Laminar pipe flow (Poiseuille): flow rate ∝ r^{4}.
- Reynolds number decides laminar or turbulent flow (see Fluid Dynamics).
- Pumps, turbines and open channels.
X: Water flows through a pipe that narrows from 0.02 m^{2} to 0.005 m^{2}. The speed is 2 m/s in the wide section. Find the speed and pressure drop in the narrow section.
> Continuity: v₂ = 2 × 0.02/0.005 = 8 m/s
> Bernoulli: Δp = ½ρ(v₂^{2} − v₁^{2}) = ½ × 1000 × (64 − 4)
> = 30,000 Pa drop
K: Pressure rises with depth; buoyancy equals displaced weight; continuity and Bernoulli relate speed and pressure; viscosity adds losses and Poiseuille's r^{4} law.
!: Applying Bernoulli across regions with strong viscous losses or pumps.
Q: What is the pressure 10 m below a water surface (ignoring air pressure)? | About 98 kPa (ρgh).
Q: How does laminar flow rate in a pipe scale with radius? | As r^{4}.
SUM: Fluids at rest and in motion.
SUM: Continuity and Bernoulli are the basics.
SRC: White FM, Fluid Mechanics (9th edn, McGraw-Hill 2021) | textbook | 2021 | https://www.mheducation.com/
SRC: Acheson DJ, Elementary Fluid Dynamics (Oxford University Press 1990) | textbook | 1990 | https://global.oup.com/
NUM1#maths-u20-34-q1@1: Water drains from a hole 5 m below the surface of a tank (g = 9.8 m/s^{2}). What is the outflow speed in m/s, to 1 decimal place? | 9.9 | 0.1 | m/s | Torricelli: v = √(2 × 9.8 × 5) = √98 ≈ 9.9 m/s.
M1#maths-u20-34-q2@1: A block of volume 0.002 m^{3} is fully submerged in water (ρ = 1000 kg/m^{3}, g = 10 m/s^{2}). What is the buoyant force? | 20 N | 2 N | 200 N | 0.02 N | 2000 N | Weight of displaced water = 1000 × 0.002 × 10 = 20 N.
M2#maths-u20-34-q3@2: By how much does laminar flow rate increase if a pipe's radius doubles at the same pressure drop? | 16 times | 2 times | 4 times | 8 times | It stays the same | Poiseuille's law makes flow proportional to r^{4}.

## Fluid Dynamics
S: Fluid dynamics describes moving fluids with the Navier–Stokes equations. The Reynolds number decides whether flow is smooth or turbulent, and these equations model everything from blood flow to weather, though proving their solutions always stay smooth remains a Millennium Prize problem.
O: Write the incompressible Navier–Stokes equations and interpret each term
O: Use the Reynolds number and describe boundary layers and turbulence
T: Navier–Stokes equations | ρ(∂v/∂t + v·∇v) = −∇p + μ∇^{2}v + f with ∇·v = 0 for incompressible flow
T: Reynolds number | Re = ρUL/μ, the ratio of inertial to viscous forces
H: The equations
- Inertia (including the nonlinear term v·∇v), pressure gradient, viscous diffusion, body forces.
- Incompressibility ∇·v = 0.
- Euler equations when viscosity is neglected.
- Global existence and smoothness in 3D is an open Clay Millennium problem.
H: Regimes
- Low Re (≪ 1): Stokes flow, bacteria and microfluidics.
- Moderate Re: laminar flow; pipe flow becomes turbulent around Re ≈ 2300.
- High Re: thin boundary layers (Prandtl 1904) and turbulence.
- Kolmogorov (1941): energy cascade, spectrum ∝ k^{−5/3}.
H: Methods
- Exact solutions: Couette, Poiseuille, Stokes flows.
- Boundary-layer theory and potential flow.
- Computational fluid dynamics: RANS, LES and direct numerical simulation.
- Vorticity and circulation (Kelvin's theorem).
X: Water (ρ = 1000 kg/m^{3}, μ = 10^{−3} Pa·s) flows at 0.1 m/s in a 2 cm pipe. Is the flow laminar?
> Re = ρUD/μ = 1000 × 0.1 × 0.02/10^{−3}
> = 2000
> Re < 2300, so the flow is laminar (just)
K: Navier–Stokes balances inertia, pressure and viscosity; the Reynolds number sets the regime; boundary layers and turbulence dominate at high Re; CFD solves practical problems; smoothness in 3D is open.
!: Neglecting viscosity everywhere, which misses boundary layers and drag.
Q: What does the Reynolds number compare? | Inertial and viscous forces.
Q: Above roughly what Reynolds number does pipe flow become turbulent? | About 2300.
SUM: Navier–Stokes governs fluid motion.
SUM: Re decides laminar versus turbulent.
SRC: Batchelor GK, An Introduction to Fluid Dynamics (Cambridge University Press 1967) | textbook | 1967 | https://www.cambridge.org/
SRC: Fefferman CL, Existence and smoothness of the Navier–Stokes equation (Clay Mathematics Institute 2000) | report | 2000 | https://www.claymath.org/millennium/navier-stokes-equation/
NUM1#maths-u20-35-q1@1: Air (kinematic viscosity 1.5 × 10^{−5} m^{2}/s) flows at 30 m/s past a car mirror 0.15 m across. What is the Reynolds number UL/ν? | 300000 | 1000 |  | Re = 30 × 0.15/(1.5 × 10^{−5}) = 300,000, well into the high-Re regime with thin boundary layers.
M1#maths-u20-35-q2@1: Which term in the Navier–Stokes equations is nonlinear? | The convective term v·∇v | The pressure gradient −∇p | The viscous term μ∇^{2}v | The body force f | The time derivative ∂v/∂t | v·∇v multiplies the velocity by its own gradient, making the equations nonlinear.
M2#maths-u20-35-q3@2: Why can bacteria swim without coasting? | At very low Reynolds number viscous forces dominate, so motion stops as soon as propulsion stops | Bacteria are too heavy to coast, so they sink when they stop | Water has no viscosity at small scales, so they stop instantly | They swim at high Reynolds number, where coasting is short | They can coast for metres after each stroke, like fish | With Re ≈ 10^{−5}, inertia is negligible (Purcell's "life at low Reynolds number").

## Aerodynamics
S: Aerodynamics studies how air flows around moving bodies and the forces it produces: lift and drag. Thin-aerofoil theory, circulation and compressibility effects explain how wings work and how aircraft, cars and wind turbines are designed.
O: Use lift and drag coefficients and the Kutta–Joukowski theorem
O: Describe compressibility effects and the Mach number
T: Lift coefficient | C_{L} = L/(½ρv^{2}S), lift made dimensionless by dynamic pressure and wing area
T: Kutta–Joukowski theorem | Lift per unit span L′ = ρvΓ, where Γ is the circulation around the aerofoil
H: Lift and drag
- L = ½ρv^{2}SC_{L}, D = ½ρv^{2}SC_{D}.
- Thin-aerofoil theory: C_{L} ≈ 2πα for small angle of attack α (radians).
- Stall: flow separates at high α and lift drops.
- Induced drag from wingtip vortices ∝ C_{L}^{2}/(πAR) (aspect ratio AR).
H: Circulation
- The Kutta condition fixes circulation so flow leaves the sharp trailing edge smoothly.
- Lift is not "equal transit time"; it comes from circulation and flow turning.
- Vortex sheets and lifting-line theory (Prandtl).
H: Compressibility
- Mach number M = v/c; compressibility matters above M ≈ 0.3.
- Transonic flow and shock waves near M ≈ 1.
- Supersonic flow: shocks, expansion fans, Mach angle sin μ = 1/M.
- Swept wings delay transonic drag rise.
X: A thin aerofoil flies at 4° angle of attack. Estimate C_{L}, and the lift on a 20 m^{2} wing at 50 m/s in air of density 1.2 kg/m^{3}.
> α = 4° ≈ 0.0698 rad, so C_{L} ≈ 2π × 0.0698 ≈ 0.44
> Dynamic pressure ½ρv^{2} = 0.5 × 1.2 × 2500 = 1500 Pa
> Lift ≈ 1500 × 20 × 0.44 ≈ 13,200 N
K: Lift and drag scale with dynamic pressure and coefficients; circulation (Kutta–Joukowski) explains lift; thin-aerofoil theory gives C_{L} ≈ 2πα; compressibility and shocks matter at high Mach number.
!: Explaining lift by the "equal transit time" myth.
Q: What is C_{L} in thin-aerofoil theory? | About 2πα, with α in radians.
Q: Above roughly what Mach number does compressibility matter? | About 0.3.
SUM: Wings make lift through circulation.
SUM: Compressibility changes the flow at high speed.
SRC: Anderson JD, Fundamentals of Aerodynamics (6th edn, McGraw-Hill 2017) | textbook | 2017 | https://www.mheducation.com/
SRC: Babinsky H, How do wings work?, Physics Education 38(6), 497 | journal | 2003 | https://doi.org/10.1088/0031-9120/38/6/001
NUM1#maths-u20-36-q1@1: A plane flies at Mach 2. What is the Mach angle in degrees? | 30 | 0 | ° | sin μ = 1/M = 0.5, so μ = 30°.
M1#maths-u20-36-q2@1: How does lift change if airspeed doubles at the same angle of attack? | It quadruples | It doubles | It halves | It stays the same | It increases eightfold | L = ½ρv^{2}SC_{L}, so lift scales with v^{2}.
M3#maths-u20-36-q3@2: Why does the Kutta condition matter for predicting lift? | Potential flow allows any circulation, and requiring smooth flow off the sharp trailing edge selects the physically correct one | It removes viscosity from the equations, making them solvable | It sets the air density at the wing surface | It forces lift to be zero for symmetric aerofoils at any angle | It doesn't matter; potential flow fixes the lift uniquely | Without it, the circulation and hence the lift would be undetermined.

## Wave Mechanics
S: Waves carry energy and information without carrying matter: ripples, sound, light and quantum wavefunctions. Their mathematics, from the wave equation to dispersion relations, explains interference, diffraction, group velocity and standing waves.
O: Use wavelength, frequency, speed and dispersion relations
O: Explain superposition, standing waves, and phase and group velocity
T: Dispersion relation | ω(k), linking angular frequency ω to wavenumber k for a type of wave
T: Group velocity | v_{g} = dω/dk, the speed at which energy and wave packets travel
H: Basics
- v = fλ; ω = 2πf; k = 2π/λ.
- Travelling wave: A sin(kx − ωt).
- Superposition: linear waves add.
- Interference and beats: two close frequencies give a beat frequency |f₁ − f₂|.
H: Standing waves
- Strings fixed at both ends: λₙ = 2L/n, fₙ = nv/(2L).
- Nodes and antinodes.
- Musical harmonics; resonance in buildings and bridges.
H: Dispersion
- Non-dispersive (ω = ck): all wavelengths travel together.
- Deep-water waves: ω = √(gk), so long waves travel faster.
- Phase velocity ω/k versus group velocity dω/dk.
- Nonlinear waves: solitons (KdV equation), shocks.
X: For deep-water waves ω = √(gk), compare group and phase velocity.
> Phase velocity v_{p} = ω/k = √(g/k)
> Group velocity v_{g} = dω/dk = ½√(g/k)
> v_{g} = v_{p}/2: individual crests move through a wave group twice as fast as the group itself
K: Waves obey v = fλ; superposition gives interference, beats and standing waves; dispersion relations set phase and group velocities; deep-water waves have v_{g} = v_{p}/2.
!: Confusing phase velocity with the speed at which energy travels.
Q: What is the fundamental frequency of a string of length L with wave speed v? | v/(2L).
Q: What is group velocity? | dω/dk, the speed of energy transport.
SUM: Waves transport energy, not matter.
SUM: Dispersion separates phase and group speeds.
SRC: Lighthill J, Waves in Fluids (Cambridge University Press 1978) | textbook | 1978 | https://www.cambridge.org/
SRC: Whitham GB, Linear and Nonlinear Waves (Wiley 1974) | textbook | 1974 | https://www.wiley.com/
NUM1#maths-u20-37-q1@1: A guitar string 0.65 m long has wave speed 286 m/s. What is its fundamental frequency in Hz? | 220 | 0.5 | Hz | f₁ = v/(2L) = 286/1.3 = 220 Hz (the A below middle C).
M1#maths-u20-37-q2@1: Two tuning forks of 440 Hz and 444 Hz sound together. What beat frequency is heard? | 4 Hz | 442 Hz | 884 Hz | 2 Hz | 0 Hz | Beats occur at the difference frequency |444 − 440| = 4 Hz.
M2#maths-u20-37-q3@2: Why do long swell waves from a distant storm arrive before short ones? | Deep-water waves are dispersive, and longer wavelengths have higher group velocity | All ocean waves travel at the same speed, so they arrive together | Short waves are faster in deep water, so they actually arrive first | Swell is generated later in the storm than the short waves | They arrive together; the storm sends all wavelengths at once | v_{g} = ½√(g/k) grows as k falls (longer wavelength).

## Acoustics
S: Acoustics is the science of sound: pressure waves in air, water and solids. Its mathematics explains loudness in decibels, the Doppler effect, resonance in instruments and rooms, and underpins ultrasound imaging and noise control.
O: Calculate sound speed, decibel levels and Doppler shifts
O: Describe resonance, reverberation and acoustic impedance
T: Sound pressure level | L = 20 log₁₀(p/p₀) dB with reference p₀ = 20 μPa (equivalently 10 log₁₀(I/I₀))
T: Acoustic impedance | Z = ρc, which controls how much sound reflects at a boundary between media
H: Basics
- Sound speed in air c = √(γRT/M) ≈ 343 m/s at 20 °C; about 1480 m/s in water.
- Inverse square law: intensity falls by 6 dB per doubling of distance (point source).
- Adding two equal incoherent sources raises the level by 3 dB.
H: Doppler and resonance
- Moving source: f′ = f c/(c − v_{s}) approaching.
- Pipes: open–open f = nc/(2L); closed–open f = (2n − 1)c/(4L).
- Helmholtz resonators (bottles, car exhausts).
H: Rooms and applications
- Sabine's reverberation time T₆₀ = 0.161V/A (V volume, A absorption area).
- Reflection coefficient ((Z₂ − Z₁)/(Z₂ + Z₁))^{2}: gel matches impedance in ultrasound.
- Active noise cancellation uses destructive interference.
- Sonar and medical ultrasound imaging.
X: A sound is 60 dB. What level results if its intensity is multiplied by 100?
> Level change = 10 log₁₀(100)
> = 20 dB
> New level 80 dB
K: Sound speed depends on medium and temperature; decibels are logarithmic; Doppler shifts move frequencies; pipes and rooms resonate; impedance mismatch governs reflection.
!: Adding decibel values directly instead of combining intensities.
Q: How much does the level rise when two equal incoherent sources play together? | 3 dB.
Q: What is the speed of sound in air at 20 °C? | About 343 m/s.
SUM: Sound is a pressure wave.
SUM: Decibels compress huge ranges.
SRC: Kinsler LE, Frey AR, Coppens AB, Sanders JV, Fundamentals of Acoustics (4th edn, Wiley 2000) | textbook | 2000 | https://www.wiley.com/
SRC: Sabine WC, Collected Papers on Acoustics (Harvard University Press 1922) | textbook | 1922 | https://archive.org/
NUM1#maths-u20-38-q1@1: An ambulance siren at 700 Hz approaches at 30 m/s (c = 340 m/s). What frequency does a stationary listener hear, to the nearest Hz? | 768 | 1 | Hz | f′ = 700 × 340/(340 − 30) = 700 × 1.0968 ≈ 768 Hz.
M1#maths-u20-38-q2@1: What is the fundamental frequency of a 0.5 m pipe open at both ends (c = 340 m/s)? | 340 Hz | 170 Hz | 680 Hz | 85 Hz | 510 Hz | For a pipe open at both ends, f₁ = c/(2L) = 340/(2 × 0.5) = 340 Hz, with the fundamental wavelength twice the pipe length.
M2#maths-u20-38-q3@2: Why is gel applied between an ultrasound probe and the skin? | It removes the air gap, whose very different impedance would reflect almost all the sound | It cools the probe so that it can run at higher power | It increases the ultrasound frequency for sharper images | It makes the image appear in colour on the screen | It has no acoustic role; it only makes the probe glide smoothly | Air's impedance is tiny compared with tissue's, so without gel little sound enters the body.

## Thermodynamics
S: Thermodynamics describes energy, heat and work in systems of many particles, using a few universal laws. The first law conserves energy, the second introduces entropy and limits efficiency, and together they govern engines, refrigerators, chemistry and life.
O: Apply the first and second laws to processes and engines
O: Calculate Carnot efficiency and entropy changes
T: Entropy | S, a state function with dS = δQ_{rev}/T; it never decreases in an isolated system
T: Carnot efficiency | η = 1 − T_{C}/T_{H}, the maximum efficiency of a heat engine between temperatures T_{H} and T_{C}
H: The laws
- Zeroth: thermal equilibrium is transitive (defines temperature).
- First: ΔU = Q − W.
- Second: entropy of an isolated system never decreases; heat flows hot to cold.
- Third: entropy approaches a constant as T → 0.
H: Engines and refrigerators
- Carnot cycle: two isotherms and two adiabats.
- No engine beats Carnot efficiency between the same temperatures.
- Refrigerator coefficient of performance T_{C}/(T_{H} − T_{C}).
- Real cycles: Otto, Diesel, Rankine.
H: Potentials and equilibrium
- Helmholtz F = U − TS (constant T, V); Gibbs G = H − TS (constant T, p).
- Chemical reactions are spontaneous when ΔG < 0.
- Maxwell relations link measurable derivatives.
- Ideal gas: pV = nRT.
X: An engine runs between 600 K and 300 K. Find its maximum efficiency and the maximum work from 1000 J of heat input.
> η = 1 − 300/600 = 0.5
> Maximum work = 0.5 × 1000 = 500 J
> At least 500 J must be rejected to the cold reservoir
K: The four laws govern energy and entropy; Carnot sets the efficiency limit 1 − T_{C}/T_{H}; free energies decide spontaneity at constant conditions.
!: Using Celsius temperatures in efficiency formulas.
Q: What is ΔU in the first law? | Q − W, heat in minus work done by the system.
Q: When is a reaction spontaneous at constant T and p? | When ΔG < 0.
SUM: Energy is conserved; entropy grows.
SUM: Carnot limits all engines.
SRC: Callen HB, Thermodynamics and an Introduction to Thermostatistics (2nd edn, Wiley 1985) | textbook | 1985 | https://www.wiley.com/
SRC: Fermi E, Thermodynamics (Prentice Hall 1937; Dover 1956) | textbook | 1956 | https://store.doverpublications.com/
NUM1#maths-u20-39-q1@1: What is the Carnot efficiency of an engine between 500 °C and 25 °C, as a percentage to the nearest whole number? | 61 | 0.5 | % | Convert to kelvin: 1 − 298/773 ≈ 0.614, about 61%.
M1#maths-u20-39-q2@1: What is the entropy change when 3000 J of heat flows reversibly into a system at 300 K? | 10 J/K | 900,000 J/K | 0.1 J/K | 3000 J/K | 300 J/K | For reversible heat flow at constant temperature, ΔS = Q/T = 3000/300 = 10 J/K, with temperature in kelvin.
M2#maths-u20-39-q3@2: Why can't any heat engine convert all its heat input into work? | The second law requires rejecting some heat to a colder reservoir to avoid decreasing total entropy | The first law forbids converting heat into any work at all | Friction is unavoidable in principle, so some heat is always lost | Heat isn't a form of energy, so it can't become work entirely | It can, if the engine is reversible and has no friction | Turning heat entirely into work would lower the universe's entropy.

## Heat Transfer
S: Heat transfer studies how thermal energy moves by conduction, convection and radiation. Its models size heat exchangers, insulate buildings, cool electronics and keep spacecraft at safe temperatures.
O: Calculate conduction, convection and radiation heat flows
O: Use thermal resistances and the Biot number
T: Fourier's law | q = −k∇T: heat flux proportional to the temperature gradient, with conductivity k
T: Stefan–Boltzmann law | Radiated power per unit area εσT^{4}, with σ = 5.67 × 10^{−8} W/(m^{2}K^{4})
H: Three modes
- Conduction through a slab: Q = kAΔT/L.
- Convection: Q = hAΔT, with coefficient h from correlations (Nusselt number).
- Radiation: Q = εσA(T₁^{4} − T₂^{4}).
H: Thermal resistance
- Slab R = L/(kA); convection R = 1/(hA).
- Resistances in series add (walls, double glazing).
- U-values for buildings.
- Fins increase area to boost heat transfer.
H: Transient conduction
- Lumped model when Bi = hL/k < 0.1: exponential approach to ambient.
- Heat equation for larger Bi.
- Penetration depth √(αt).
- Heat exchangers: log-mean temperature difference and effectiveness–NTU.
X: A wall 0.2 m thick (k = 0.8 W/(m·K)) of area 10 m^{2} has faces at 20 °C and 0 °C. Find the heat loss.
> Q = kAΔT/L
> = 0.8 × 10 × 20/0.2
> = 800 W
- Newton's law of cooling (lumped convection) gives exponential decay towards ambient temperature.
K: Heat moves by conduction (Fourier), convection (hAΔT) and radiation (εσT^{4}); resistances in series add; Biot number decides lumped versus spatial models.
!: Forgetting radiation, which dominates at high temperatures because of the T^{4} dependence.
Q: How does radiated power depend on temperature? | As T^{4}.
Q: When can a body be treated as having one uniform temperature? | When the Biot number is below about 0.1.
SUM: Three modes of heat transfer.
SUM: Resistances combine like circuits.
SRC: Incropera FP, DeWitt DP, Bergman TL, Lavine AS, Fundamentals of Heat and Mass Transfer (8th edn, Wiley 2017) | textbook | 2017 | https://www.wiley.com/
SRC: Lienhard JH IV, Lienhard JH V, A Heat Transfer Textbook (5th edn, Phlogiston Press 2019) | textbook | 2019 | https://ahtt.mit.edu/
NUM1#maths-u20-40-q1@1: Two layers with thermal resistances 0.05 K/W and 0.15 K/W are in series with a 40 K temperature difference. What heat flow passes, in W? | 200 | 0 | W | Total R = 0.2 K/W, so Q = 40/0.2 = 200 W.
M1#maths-u20-40-q2@1: By what factor does radiated power increase when absolute temperature doubles? | 16 | 2 | 4 | 8 | 32 | Radiation scales as T^{4}, and 2^{4} = 16.
M2#maths-u20-40-q3@2: Why do cooling fins help electronics? | They increase surface area for convection, lowering the convective resistance | They raise the thermal conductivity of the chip itself | They stop radiation, which would otherwise heat the chip | They reduce air flow, keeping cool air near the chip | They don't help; fins only change the device's appearance | Convective heat flow is hAΔT, so adding fins increases the area A and lowers the convective resistance 1/(hA), carrying more heat away.

## Mass Transfer
S: Mass transfer describes how chemical species move from regions of high to low concentration, by molecular diffusion and by flow. It governs drying, distillation, drug release, gas exchange in lungs and pollutant dispersal.
O: Use Fick's law and mass transfer coefficients
O: Relate diffusion time to distance and describe interfacial transfer
T: Fick's first law | J = −D∇c: diffusive flux proportional to the concentration gradient
T: Mass transfer coefficient | k_{c}, defined by flux N = k_{c}Δc across an interface or boundary layer
H: Molecular diffusion
- Fick's second law: ∂c/∂t = D∇^{2}c.
- Diffusion time over distance L: t ~ L^{2}/D.
- Diffusivities: gases ~10^{−5} m^{2}/s, liquids ~10^{−9} m^{2}/s, solids much smaller.
- Stokes–Einstein: D = k_{B}T/(6πηr) for spheres in liquids.
H: Convective mass transfer
- N = k_{c}(c_{s} − c_{∞}) at surfaces.
- Sherwood number Sh = k_{c}L/D, from correlations like Nusselt for heat.
- Two-film theory for gas–liquid interfaces.
H: Applications
- Distillation, absorption and extraction columns.
- Drug release from tablets and patches.
- Oxygen transfer in lungs and bioreactors.
- Membranes and dialysis.
X: Estimate the time for oxygen to diffuse 100 μm into tissue with D = 2 × 10^{−9} m^{2}/s.
> t ~ L^{2}/D
> = (10^{−4})^{2}/(2 × 10^{−9}) = 10^{−8}/(2 × 10^{−9})
> = 5 seconds: why tissues need capillaries within about 100 μm of every cell
K: Fick's laws describe diffusion; t ~ L^{2}/D sets time scales; mass transfer coefficients and Sherwood numbers handle convection; applications span separation, drug delivery and physiology.
!: Assuming diffusion is fast over large distances, when time grows with distance squared.
Q: How does diffusion time scale with distance? | As distance squared (L^{2}/D).
Q: What is the Sherwood number? | k_{c}L/D, the dimensionless mass transfer coefficient.
SUM: Species move down concentration gradients.
SUM: Diffusion is slow over long distances.
SRC: Cussler EL, Diffusion: Mass Transfer in Fluid Systems (3rd edn, Cambridge University Press 2009) | textbook | 2009 | https://www.cambridge.org/
SRC: Bird RB, Stewart WE, Lightfoot EN, Transport Phenomena (2nd edn, Wiley 2002) | textbook | 2002 | https://www.wiley.com/
NUM1#maths-u20-41-q1@1: How long (in seconds) does a molecule with D = 10^{−9} m^{2}/s take to diffuse about 1 mm? | 1000 | 0 | s | t ~ L^{2}/D = 10^{−6}/10^{−9} = 1000 s, about 17 minutes.
M1#maths-u20-41-q2@1: Which law states that diffusive flux is proportional to the concentration gradient? | Fick's first law | Fourier's law | Newton's law of viscosity | Ohm's law | Henry's law | Fick's first law J = −D∇c says species diffuse down their concentration gradient at a rate set by the diffusivity D.
M2#maths-u20-41-q3@2: If the diffusion distance triples, how does the diffusion time change? | It increases 9-fold | It triples | It stays the same | It increases 27-fold | It falls by a third | Diffusion time scales as t ~ L^{2}/D, so tripling the distance multiplies the time by 3^{2} = 9.

## Transport Phenomena
S: Transport phenomena unifies the transport of momentum, heat and mass, which obey closely analogous laws. Dimensionless numbers like Prandtl and Schmidt compare their rates, and analogies let results for one process predict another.
O: Compare Newton's, Fourier's and Fick's laws as transport laws
O: Use Prandtl, Schmidt and Péclet numbers and the Reynolds–Chilton–Colburn analogies
T: Prandtl number | Pr = ν/α, the ratio of momentum diffusivity to thermal diffusivity
T: Péclet number | Pe = UL/D, the ratio of advective to diffusive transport
H: Three analogous laws
- Momentum: τ = μ dv/dy (Newton), diffusivity ν = μ/ρ.
- Heat: q = −k dT/dy (Fourier), diffusivity α = k/(ρc).
- Mass: J = −D dc/dy (Fick), diffusivity D.
- Each satisfies a diffusion equation with advection.
H: Dimensionless numbers
- Pr = ν/α: about 0.7 for air, 7 for water, very large for oils.
- Schmidt Sc = ν/D: about 1 for gases, 1000 for liquids.
- Pe = Re × Pr (heat) or Re × Sc (mass).
- Nusselt and Sherwood for convective transfer.
H: Analogies
- Reynolds analogy: friction, heat and mass transfer are linked.
- Chilton–Colburn j-factors: j_{H} = j_{D} = f/2.
- Boundary-layer thicknesses scale with Pr^{−1/3} or Sc^{−1/3}.
- Used to estimate one coefficient from another.
X: For air flowing at 2 m/s over a 0.1 m plate, with heat diffusivity 2 × 10^{−5} m^{2}/s, find the thermal Péclet number.
> Pe = UL/α
> = 2 × 0.1/(2 × 10^{−5})
> = 10,000: advection dominates diffusion
K: Momentum, heat and mass transport obey analogous gradient laws; Pr, Sc and Pe compare diffusivities and advection; analogies transfer correlations between processes.
!: Assuming heat and mass boundary layers are the same thickness when Pr or Sc differs greatly from 1.
Q: What does the Prandtl number compare? | Momentum diffusivity and thermal diffusivity.
Q: What does a large Péclet number mean? | Advection dominates diffusion.
SUM: Three kinds of transport, one structure.
SUM: Dimensionless numbers compare them.
SRC: Bird RB, Stewart WE, Lightfoot EN, Transport Phenomena (2nd edn, Wiley 2002) | textbook | 2002 | https://www.wiley.com/
SRC: Chilton TH, Colburn AP, Mass transfer (absorption) coefficients: prediction from data on heat transfer and fluid friction, Industrial and Engineering Chemistry 26(11), 1183 | journal | 1934 | https://doi.org/10.1021/ie50299a012
NUM1#maths-u20-42-q1@1: Water has ν = 10^{−6} m^{2}/s and α = 1.4 × 10^{−7} m^{2}/s. What is its Prandtl number, to 1 decimal place? | 7.1 | 0.1 |  | Pr = ν/α = 10^{−6}/(1.4 × 10^{−7}) ≈ 7.1.
M1#maths-u20-42-q2@1: Which law describes momentum transport in a Newtonian fluid? | τ = μ dv/dy | q = −k dT/dy | J = −D dc/dy | V = IR | F = ma | Shear stress proportional to velocity gradient is Newton's law of viscosity.
M2#maths-u20-42-q3@2: Why is the concentration boundary layer in a liquid much thinner than its velocity boundary layer? | The Schmidt number is about 1000, so species diffuse far more slowly than momentum | Liquids have no viscosity | Diffusion is faster than momentum transport in liquids | They are always equal | It is thicker | Boundary-layer thickness ratios scale like Sc^{−1/3}, about 0.1 for Sc = 1000.

## Diffusion Processes
S: Diffusion arises from random motion: many particles each taking tiny random steps spread out according to the diffusion equation. Einstein's 1905 analysis of Brownian motion linked this microscopic picture to measurable diffusion coefficients and helped prove atoms exist.
O: Connect random walks to the diffusion equation
O: Use mean squared displacement and the Einstein relation
T: Mean squared displacement | ⟨x^{2}⟩ = 2Dt in one dimension (2dDt in d dimensions)
T: Brownian motion | The random motion of small particles caused by molecular collisions, modelled mathematically by the Wiener process
H: From random walk to diffusion
- Steps ±Δx every Δt: ⟨x^{2}⟩ = (Δx^{2}/Δt) t.
- Continuum limit gives ∂p/∂t = D ∂^{2}p/∂x^{2} with D = Δx^{2}/(2Δt).
- The solution from a point source is Gaussian with variance 2Dt.
- Central limit theorem underlies the Gaussian.
H: Einstein and beyond
- Einstein relation D = k_{B}T/γ (mobility).
- Perrin's experiments (1908) measured Avogadro's number.
- Drift–diffusion and the Fokker–Planck equation.
- Stochastic differential equations: dX = μ dt + σ dW.
H: Anomalous diffusion
- Subdiffusion ⟨x^{2}⟩ ∝ t^{α}, α < 1 (crowded cells).
- Superdiffusion α > 1 (Lévy flights).
- First-passage times and escape problems.
- Applications: finance (Black–Scholes), neuroscience, ecology.
X: A particle has D = 10^{−12} m^{2}/s. What is its root mean squared displacement in 1D after 100 s?
> ⟨x^{2}⟩ = 2Dt = 2 × 10^{−12} × 100 = 2 × 10^{−10} m^{2}
> RMS = √(2 × 10^{−10})
> ≈ 1.4 × 10^{−5} m = 14 μm
K: Random walks produce diffusion with ⟨x^{2}⟩ = 2Dt; the point-source solution is Gaussian; Einstein linked D to temperature and friction; anomalous diffusion departs from linear growth.
!: Expecting displacement to grow linearly in time; it grows like √t.
Q: How does the RMS displacement of a diffusing particle grow with time? | As √t.
Q: What did Perrin's Brownian motion experiments determine? | Avogadro's number.
SUM: Random steps make diffusion.
SUM: Spread grows like √t.
SRC: Einstein A, Über die von der molekularkinetischen Theorie der Wärme geforderte Bewegung von in ruhenden Flüssigkeiten suspendierten Teilchen, Annalen der Physik 17, 549 | journal | 1905 | https://doi.org/10.1002/andp.19053220806
SRC: Berg HC, Random Walks in Biology (expanded edn, Princeton University Press 1993) | textbook | 1993 | https://press.princeton.edu/
NUM1#maths-u20-43-q1@1: A diffusing particle has RMS displacement 10 μm after 1 s. What is its RMS displacement after 100 s, in μm? | 100 | 0 | μm | RMS grows as √t: 10 × √100 = 100 μm.
M1#maths-u20-43-q2@1: In 3D, what is the mean squared displacement after time t with diffusion coefficient D? | 6Dt | 2Dt | 3Dt | Dt | 4Dt | In d dimensions ⟨r^{2}⟩ = 2dDt, since each of the d independent coordinates contributes 2Dt; in 3D that's 6Dt.
M3#maths-u20-43-q3@2: Why does the probability density from a point release become Gaussian? | Displacement is a sum of many independent small steps, so the central limit theorem applies | Particles all move together, so their spread stays Gaussian | Diffusion has no randomness, so the shape is fixed by the equation | The density becomes uniform at once, which looks Gaussian | It is never Gaussian; diffusion gives a triangular profile | Adding many independent increments gives a normal distribution with variance 2Dt.

## Electromagnetism
S: Electromagnetism describes electric and magnetic fields and their interactions with charges and currents. Maxwell's four equations unify electricity, magnetism and light, and they underpin power grids, motors, radio, optics and electronics.
O: State Maxwell's equations and their meanings
O: Use Coulomb's law and derive the speed of electromagnetic waves
T: Maxwell's equations | ∇·E = ρ/ε₀, ∇·B = 0, ∇ × E = −∂B/∂t, ∇ × B = μ₀J + μ₀ε₀∂E/∂t
T: Lorentz force | F = q(E + v × B), the force on a charge in electric and magnetic fields
H: The equations
- Gauss's law: charges create diverging E fields.
- No magnetic monopoles: ∇·B = 0.
- Faraday's law: changing B induces E (generators, transformers).
- Ampère–Maxwell: currents and changing E create B.
H: Waves
- In vacuum, E and B satisfy wave equations with speed c = 1/√(μ₀ε₀) ≈ 3 × 10^{8} m/s.
- Maxwell (1865) identified light as an electromagnetic wave.
- Spectrum: radio, microwave, infrared, visible, ultraviolet, X-ray, gamma.
H: Tools
- Potentials φ and A, gauge freedom.
- Boundary conditions at interfaces; reflection and refraction.
- Circuits as lumped approximations (Kirchhoff's laws).
- Computational electromagnetics (FDTD, finite elements).
X: Compute c from μ₀ = 4π × 10^{−7} H/m and ε₀ = 8.854 × 10^{−12} F/m.
> μ₀ε₀ = 4π × 10^{−7} × 8.854 × 10^{−12} ≈ 1.1127 × 10^{−17}
> √(μ₀ε₀) ≈ 3.336 × 10^{−9}
> c = 1/3.336 × 10^{−9} ≈ 3.00 × 10^{8} m/s: the speed of light
K: Maxwell's four equations unify electricity, magnetism and light; the Lorentz force moves charges; waves travel at c = 1/√(μ₀ε₀); potentials and numerical methods solve practical problems.
!: Forgetting the displacement current term, without which there are no electromagnetic waves.
Q: Which Maxwell equation says there are no magnetic monopoles? | ∇·B = 0.
Q: What does Faraday's law describe? | A changing magnetic field inducing an electric field.
SUM: Four equations govern electromagnetism.
SUM: Light is an electromagnetic wave.
SRC: Maxwell JC, A dynamical theory of the electromagnetic field, Philosophical Transactions of the Royal Society 155, 459 | journal | 1865 | https://doi.org/10.1098/rstl.1865.0008
SRC: Griffiths DJ, Introduction to Electrodynamics (5th edn, Cambridge University Press 2023) | textbook | 2023 | https://www.cambridge.org/
NUM1#maths-u20-44-q1@1: Two charges of 1 μC each are 0.1 m apart. What is the Coulomb force in N, using k = 9 × 10^{9} N·m^{2}/C^{2}? | 0.9 | 0.001 | N | F = kq₁q₂/r^{2} = 9 × 10^{9} × 10^{−12}/0.01 = 0.9 N.
M1#maths-u20-44-q2@1: Which law explains how a transformer works? | Faraday's law of induction | Gauss's law for electricity | Gauss's law for magnetism | Coulomb's law | The Lorentz force on a static charge | A changing current in one coil makes a changing B, inducing a voltage in the other.
M2#maths-u20-44-q3@2: Why was Maxwell's displacement current term essential? | It makes the equations consistent with charge conservation and predicts electromagnetic waves | It describes static charges, which Ampère's law had missed | It removes magnetic fields from situations with no current | It explains gravity as an electromagnetic effect | It wasn't essential; it was later dropped from the equations | Without ∂E/∂t in Ampère's law, there's no wave equation and no light.

## Quantum Mechanics
S: Quantum mechanics describes nature at atomic scales, where energy is quantised and particles behave as waves. Its mathematics, state vectors, operators and the Schrödinger equation, predicts atomic spectra, chemical bonds, semiconductors and lasers with remarkable precision.
O: Solve simple Schrödinger equation problems such as the particle in a box
O: Use operators, eigenvalues, the Born rule and uncertainty relations
T: Schrödinger equation | iħ ∂ψ/∂t = Ĥψ, governing the evolution of the wavefunction ψ
T: Born rule | |ψ(x)|^{2} is the probability density for finding the particle at x
H: Framework
- States are unit vectors in a Hilbert space.
- Observables are self-adjoint operators; measured values are eigenvalues.
- Time-independent equation Ĥψ = Eψ gives energy levels.
- Heisenberg uncertainty: ΔxΔp ≥ ħ/2.
H: Solvable models
- Particle in a box: Eₙ = n^{2}π^{2}ħ^{2}/(2mL^{2}).
- Harmonic oscillator: Eₙ = ħω(n + ½).
- Hydrogen atom: Eₙ = −13.6 eV/n^{2}.
- Tunnelling through barriers (scanning tunnelling microscopes).
H: Further structure
- Spin and the Pauli exclusion principle.
- Entanglement and Bell inequalities.
- Perturbation theory and variational methods.
- Quantum computing uses superposition and entanglement.
X: Find the photon energy for the hydrogen transition n = 2 → n = 1.
> E₁ = −13.6 eV and E₂ = −13.6/4 = −3.4 eV
> ΔE = −3.4 − (−13.6) = 10.2 eV
> This is the Lyman-α line, at about 122 nm in the ultraviolet
K: Quantum mechanics uses wavefunctions, operators and the Schrödinger equation; |ψ|^{2} gives probabilities; energy levels are quantised; uncertainty, spin and entanglement are distinctive features.
!: Treating the wavefunction as a physical wave of matter rather than a probability amplitude.
Q: What are the energy levels of a quantum harmonic oscillator? | ħω(n + ½).
Q: What does the Born rule state? | |ψ|^{2} gives the probability density.
SUM: Quantum states are vectors in Hilbert space.
SUM: Energy is quantised.
SRC: Griffiths DJ, Schroeter DF, Introduction to Quantum Mechanics (3rd edn, Cambridge University Press 2018) | textbook | 2018 | https://www.cambridge.org/
SRC: Dirac PAM, The Principles of Quantum Mechanics (4th edn, Oxford University Press 1958) | textbook | 1958 | https://global.oup.com/
NUM1#maths-u20-45-q1@1: For a particle in a box, how many times larger is E₃ than E₁? | 9 | 0 |  | Eₙ ∝ n^{2}, so E₃/E₁ = 9.
M1#maths-u20-45-q2@1: What is the ground-state energy of a quantum harmonic oscillator? | ½ħω | 0 | ħω | 2ħω | −½ħω | Eₙ = ħω(n + ½) with n = 0 gives ½ħω, the zero-point energy.
M3#maths-u20-45-q3@2: Why can't a quantum particle in a box have zero energy? | Zero energy would need zero momentum, so infinite position uncertainty, impossible inside a finite box | Boxes always heat the particles inside them by collisions | Energy is always negative for bound quantum particles | The Schrödinger equation forbids any motion inside a box | It can have zero energy if it sits still at the centre | Confinement to width L forces momentum uncertainty ~ħ/L, giving positive minimum energy.

## Statistical Mechanics
S: Statistical mechanics derives the thermodynamic behaviour of matter from the statistics of its many microscopic constituents. The Boltzmann distribution and the partition function link microscopic energies to temperature, pressure, entropy and phase transitions.
O: Use the Boltzmann distribution and partition function
O: Relate entropy to microstates and describe phase transitions
T: Boltzmann distribution | The probability of a state with energy E is proportional to e^{−E/k_{B}T}
T: Partition function | Z = Σ e^{−Eᵢ/k_{B}T}, from which thermodynamic quantities follow, such as F = −k_{B}T ln Z
H: Foundations
- Microstates and macrostates; Boltzmann's entropy S = k_{B} ln W.
- Ensembles: microcanonical (fixed E), canonical (fixed T), grand canonical (fixed μ).
- Equipartition: ½k_{B}T per quadratic degree of freedom.
H: Calculations
- Two-level system: occupation ratio e^{−ΔE/k_{B}T}.
- Ideal gas pressure and the Maxwell–Boltzmann speed distribution.
- Quantum statistics: Fermi–Dirac (electrons) and Bose–Einstein (photons, condensates).
H: Phase transitions
- Ising model: spins on a lattice with neighbour interactions.
- Onsager's exact 2D solution (1944) shows a critical temperature.
- Critical exponents and universality; renormalisation group (Wilson).
- Monte Carlo simulation (Metropolis algorithm).
X: A two-level system has ΔE = k_{B}T ln 3. Find the ratio of upper to lower occupation.
> Ratio = e^{−ΔE/k_{B}T}
> = e^{−ln 3}
> = 1/3: a quarter of systems are in the upper level
K: Statistical mechanics derives thermodynamics from microstates; the Boltzmann distribution and partition function are central; S = k_{B} ln W; quantum statistics and phase transitions extend it.
!: Applying classical Boltzmann statistics to electrons in metals, which need Fermi–Dirac statistics.
Q: What is Boltzmann's entropy formula? | S = k_{B} ln W.
Q: Who solved the 2D Ising model exactly? | Lars Onsager (1944).
SUM: Statistics explains thermodynamics.
SUM: Partition functions encode everything.
SRC: Sethna JP, Statistical Mechanics: Entropy, Order Parameters, and Complexity (2nd edn, Oxford University Press 2021) | textbook | 2021 | https://global.oup.com/
SRC: Onsager L, Crystal statistics I: a two-dimensional model with an order-disorder transition, Physical Review 65, 117 | journal | 1944 | https://doi.org/10.1103/PhysRev.65.117
NUM1#maths-u20-46-q1@1: A system has W = e^{100} microstates. What is its entropy in units of k_{B}? | 100 | 0 | k_{B} | S = k_{B} ln W = k_{B} × 100.
M1#maths-u20-46-q2@1: By equipartition, what is the average kinetic energy of a monatomic gas atom? | (3/2)k_{B}T | ½k_{B}T | k_{B}T | 3k_{B}T | (5/2)k_{B}T | Three translational quadratic terms each contribute ½k_{B}T.
M2#maths-u20-46-q3@2: Why does the partition function contain all thermodynamic information for a system at fixed temperature? | Derivatives of ln Z give energy, entropy, pressure and heat capacity | Z equals the temperature, which fixes every other quantity | Z counts only the ground state, which determines the rest | It contains no information beyond the number of particles | It depends only on volume, which sets the thermodynamics | F = −k_{B}T ln Z, and other quantities follow by differentiation.

## Nonlinear Dynamics
S: Nonlinear dynamics studies systems whose behaviour isn't proportional to their inputs. Fixed points, stability, limit cycles and bifurcations describe how such systems settle, oscillate or suddenly change, from lasers and heartbeats to climate tipping points.
O: Find fixed points and classify their stability with the Jacobian
O: Recognise limit cycles and common bifurcations
T: Bifurcation | A qualitative change in a system's behaviour as a parameter crosses a critical value
T: Limit cycle | An isolated closed orbit in phase space that nearby trajectories approach or leave
H: Fixed points
- Solve f(x) = 0; linearise with the Jacobian J.
- Eigenvalues with negative real parts: stable; any positive: unstable.
- Nodes, saddles, spirals and centres in 2D (trace–determinant plane).
- Hartman–Grobman: linearisation is faithful when no eigenvalue has zero real part.
H: Oscillations
- Limit cycles: van der Pol oscillator, heartbeats, predator–prey with saturation.
- Poincaré–Bendixson: in the plane, bounded trajectories without fixed points approach a closed orbit.
- No chaos in 2D autonomous flows.
H: Bifurcations
- Saddle-node: fixed points appear or vanish (ẋ = r + x^{2}).
- Transcritical and pitchfork (symmetry breaking).
- Hopf: a fixed point loses stability and a limit cycle is born.
- Tipping points and hysteresis in climate and ecology.
X: Classify the fixed point at the origin of ẋ = y, ẏ = −x − y.
> Jacobian [[0, 1], [−1, −1]] has trace −1 and determinant 1
> Eigenvalues (−1 ± i√3)/2 have negative real part and non-zero imaginary part
> The origin is a stable spiral
K: Nonlinear dynamics analyses fixed points by linearisation, oscillations by limit cycles and qualitative changes by bifurcations; Poincaré–Bendixson rules out chaos in 2D flows.
!: Trusting linearisation when an eigenvalue has zero real part.
Q: What bifurcation creates a limit cycle from a fixed point? | A Hopf bifurcation.
Q: What does ẋ = r + x^{2} show as r crosses 0? | A saddle-node bifurcation.
SUM: Nonlinear systems settle, oscillate or switch.
SUM: Bifurcations mark qualitative changes.
SRC: Strogatz SH, Nonlinear Dynamics and Chaos (2nd edn, CRC Press 2015) | textbook | 2015 | https://www.routledge.com/
SRC: Guckenheimer J, Holmes P, Nonlinear Oscillations, Dynamical Systems, and Bifurcations of Vector Fields (Springer 1983) | textbook | 1983 | https://link.springer.com/
NUM1#maths-u20-47-q1@1: For ẋ = r + x^{2} with r = −4, what is the stable fixed point? | -2 | 0 |  | Fixed points are x = ±2; f′(x) = 2x is negative at x = −2, so that one is stable.
M1#maths-u20-47-q2@1: A 2D fixed point has Jacobian trace 3 and determinant −2. What type is it? | A saddle | A stable node | An unstable spiral | A centre | A stable spiral | A negative determinant means real eigenvalues of opposite sign: a saddle.
M2#maths-u20-47-q3@2: Why can't a two-dimensional autonomous flow be chaotic? | Trajectories can't cross in the plane, so by Poincaré–Bendixson bounded orbits approach fixed points or closed orbits | 2D systems are always linear, so they can't be chaotic | Chaos needs discrete time, which 2D flows don't have | 2D flows have no fixed points, so nothing can be chaotic | They can be chaotic, as the Lorenz system shows in 2D | Chaos needs at least three dimensions in continuous time.

## Chaos and Complex Systems
S: Chaotic systems are deterministic yet unpredictable in the long run, because tiny differences in starting conditions grow exponentially. Complex systems, from ecosystems to economies, show emergence, self-organisation and power laws arising from many interacting parts.
O: Identify chaos using sensitivity, Lyapunov exponents and strange attractors
O: Describe emergence, self-organisation and features of complex systems
T: Lyapunov exponent | λ, the average exponential rate at which nearby trajectories separate; λ > 0 signals chaos
T: Strange attractor | An attractor with fractal structure on which motion is chaotic, such as the Lorenz attractor
H: Chaos
- Lorenz (1963): a simple convection model with sensitive dependence ("butterfly effect").
- Logistic map xₙ₊₁ = rxₙ(1 − xₙ): period doubling to chaos near r ≈ 3.57.
- Feigenbaum constant δ ≈ 4.669: universal ratio of successive bifurcation intervals.
- Predictability horizon ~ (1/λ) ln(tolerance/initial error).
H: Complex systems
- Emergence: collective behaviour not obvious from parts (flocking, traffic jams).
- Self-organised criticality: sandpiles and power-law avalanches (Bak).
- Networks: small worlds and hubs.
- Adaptive agents and evolution.
H: Practical consequences
- Weather forecasts lose skill after about 1–2 weeks.
- Ensemble forecasting quantifies uncertainty.
- Control of chaos with small perturbations (OGY method).
- Complexity science institutes (Santa Fe Institute).
X: Two weather states differ by 0.001 and λ = 0.5 per day. When does the difference reach 1?
> Separation grows as 0.001e^{0.5t}
> Set 0.001e^{0.5t} = 1: e^{0.5t} = 1000
> t = 2 ln 1000 ≈ 13.8 days
K: Chaos is deterministic but sensitive, measured by positive Lyapunov exponents; strange attractors and period doubling are hallmarks; complex systems show emergence and self-organisation; predictability is limited.
!: Thinking chaotic means random: chaotic systems follow deterministic rules.
Q: What sign of Lyapunov exponent indicates chaos? | Positive.
Q: Who discovered the butterfly effect in a weather model? | Edward Lorenz (1963).
SUM: Deterministic yet unpredictable.
SUM: Complex systems show emergence.
SRC: Lorenz EN, Deterministic nonperiodic flow, Journal of the Atmospheric Sciences 20(2), 130 | journal | 1963 | https://doi.org/10.1175/1520-0469(1963)020<0130:DNF>2.0.CO;2
SRC: Mitchell M, Complexity: A Guided Tour (Oxford University Press 2009) | textbook | 2009 | https://global.oup.com/
NUM1#maths-u20-48-q1@1: An initial error of 10^{−6} grows with Lyapunov exponent 1 per unit time. After how many time units does it reach 1, to 1 decimal place? | 13.8 | 0.1 |  | t = ln(10^{6})/1 ≈ 13.8.
M1#maths-u20-48-q2@1: Near which value of r does the logistic map first become chaotic? | About 3.57 | About 1 | About 2 | Exactly 4.67 | About 0.5 | Period doubling accumulates at r ≈ 3.5699, beyond which chaos appears.
M3#maths-u20-48-q3@2: Why does improving measurements only slowly extend a chaotic forecast's horizon? | The horizon grows like the logarithm of the initial accuracy, so a 10-fold improvement adds only ln 10/λ | Better measurements shorten the forecast horizon, oddly enough | Chaos removes all predictability at once, whatever the accuracy | The horizon is infinite for perfect deterministic models | It extends it greatly: ten times better data gives ten times longer | Exponential error growth means each factor of 10 buys a fixed extra time.

## Agent-Based Modelling
S: Agent-based models simulate many individual agents, such as people, animals, cells or firms, each following simple rules and interacting locally. Large-scale patterns emerge from the bottom up, making these models suited to segregation, epidemics, markets and crowds.
O: Describe the components and design of an agent-based model
O: Interpret emergent behaviour and validate agent-based models
T: Agent | An autonomous individual with state, rules of behaviour and interactions with others and its environment
T: Emergence | System-level patterns arising from individual interactions that aren't specified in any single rule
H: Ingredients
- Agents with attributes (age, location, wealth).
- Rules for movement, decisions and interaction.
- An environment (grid, network or continuous space).
- Scheduling and randomness; many runs to get distributions.
H: Classic examples
- Schelling's segregation model (1971): mild preferences produce strong segregation.
- Boids flocking (Reynolds 1987): separation, alignment, cohesion.
- Sugarscape and artificial societies.
- Epidemic models with contact networks and households.
H: Strengths and challenges
- Captures heterogeneity, space and adaptation.
- Hard to calibrate and validate; many parameters.
- The ODD protocol standardises description.
- Pattern-oriented modelling: test against several observed patterns.
X: In Schelling's model, agents move if fewer than 30% of their neighbours share their type. What typically happens?
> Initially mixed agents with few similar neighbours relocate
> Moves create clusters, which make other agents' neighbourhoods less mixed, prompting further moves
> The system ends highly segregated, though no agent demanded a majority of similar neighbours
K: Agent-based models simulate individuals with local rules; emergent patterns such as segregation and flocking arise; they handle heterogeneity but need careful calibration, documentation and validation.
!: Treating a single simulation run as representative, rather than averaging many runs.
Q: What did Schelling's model show? | Mild individual preferences can produce strong segregation.
Q: What are the three Boids rules? | Separation, alignment and cohesion.
SUM: Individuals following rules create patterns.
SUM: Validation needs multiple patterns.
SRC: Schelling TC, Dynamic models of segregation, Journal of Mathematical Sociology 1(2), 143 | journal | 1971 | https://doi.org/10.1080/0022250X.1971.9989794
SRC: Grimm V et al., The ODD protocol for describing agent-based and other simulation models: a second update, Journal of Artificial Societies and Social Simulation 23(2), 7 | journal | 2020 | https://doi.org/10.18564/jasss.4259
NUM1#maths-u20-49-q1@1: An agent on a square grid has 8 neighbours and wants at least 30% similar. What is the minimum number of similar neighbours that satisfies it? | 3 | 0 |  | 30% of 8 is 2.4, so at least 3 similar neighbours are needed.
M1#maths-u20-49-q2@1: Which feature is a key strength of agent-based models? | Representing heterogeneous individuals and local interactions explicitly | Always having closed-form analytical solutions | Needing no parameters or data to run | Being completely deterministic in every run | Avoiding the need for any computation | Individual-level detail is what ODE population models average away.
M2#maths-u20-49-q3@2: Why must agent-based models be run many times? | Their randomness means outcomes vary between runs, so distributions are needed | One run is always enough when the code is correct | They are deterministic, so runs only check the code | Running them repeatedly changes the agents' rules | They can only be run once before agents adapt | Stochastic rules give different trajectories; averages and spreads describe behaviour.

## Cellular Automata Modelling
S: Cellular automata are grids of cells that update their states simultaneously by local rules. Despite their simplicity they can produce complex patterns and even universal computation, and they model forest fires, traffic, crystal growth and biological patterns.
O: Apply update rules for elementary cellular automata and the Game of Life
O: Describe uses of cellular automata in modelling
T: Cellular automaton | A lattice of cells with finite states updated synchronously by a rule depending on each cell's neighbourhood
T: Game of Life | Conway's 2D automaton: a live cell survives with 2 or 3 live neighbours; a dead cell becomes live with exactly 3
H: Elementary automata
- 1D, two states, rules depend on a cell and its two neighbours: 256 rules.
- Wolfram's classes: fixed, periodic, chaotic, complex.
- Rule 30: chaotic, used for random numbers.
- Rule 110: proved capable of universal computation (Cook 2004).
H: The Game of Life
- Still lifes (block), oscillators (blinker), spaceships (glider).
- Turing-complete: can simulate any computer.
- Conway (1970), popularised by Martin Gardner.
H: Modelling uses
- Forest fire spread and percolation.
- Traffic: the Nagel–Schreckenberg model reproduces jams.
- Lattice gas and lattice Boltzmann methods for fluids.
- Crystal growth, tumour growth, urban development.
X: In the Game of Life, what happens to a horizontal row of three live cells (a blinker)?
> The middle cell has 2 live neighbours: it survives
> The end cells have 1 live neighbour each: they die
> The cells above and below the middle have 3 live neighbours: they're born, so the row becomes vertical, and it flips back next step
K: Cellular automata update grids by local rules; elementary automata show Wolfram's classes; the Game of Life and Rule 110 are universal; CAs model fires, traffic, fluids and growth.
!: Updating cells one at a time instead of simultaneously, which changes the dynamics.
Q: How many elementary cellular automaton rules are there? | 256.
Q: What makes a dead cell come alive in the Game of Life? | Exactly three live neighbours.
SUM: Simple local rules, complex behaviour.
SUM: Some automata are universal computers.
SRC: Wolfram S, Statistical mechanics of cellular automata, Reviews of Modern Physics 55(3), 601 | journal | 1983 | https://doi.org/10.1103/RevModPhys.55.601
SRC: Nagel K, Schreckenberg M, A cellular automaton model for freeway traffic, Journal de Physique I 2(12), 2221 | journal | 1992 | https://doi.org/10.1051/jp1:1992277
NUM1#maths-u20-50-q1@1: How many possible neighbourhood patterns (cell plus two neighbours, two states each) does an elementary cellular automaton rule specify outputs for? | 8 | 0 |  | 2^{3} = 8 patterns, and choosing an output for each gives 2^{8} = 256 rules.
M1#maths-u20-50-q2@1: In the Game of Life, what happens to a live cell with four live neighbours? | It dies of overcrowding | It survives | It splits into two | It stays alive only on even steps | It becomes a glider | Survival needs 2 or 3 live neighbours; more than 3 kills the cell.
M3#maths-u20-50-q3@2: Why is Rule 110 significant? | It was proved Turing-complete, showing a very simple 1D rule can perform any computation | It is the only elementary rule that behaves chaotically | It always reaches a fixed state from any starting row | It models motorway traffic exactly, including jams | It has no special significance among the 256 rules | Cook's proof showed universal computation in one of the simplest possible systems.

## Systems Theory
S: Systems theory studies how parts interact to form wholes with their own behaviour, using ideas such as feedback, stocks and flows, and hierarchy. It connects engineering control, ecology, organisations and system dynamics models of policy problems.
O: Describe feedback loops, stocks and flows and system dynamics models
O: Explain delays, overshoot and leverage points in systems
T: Stock and flow | A stock accumulates (a population, money, CO₂); flows change it (births, income, emissions)
T: Feedback loop | A chain of effects returning to its source: reinforcing (positive) or balancing (negative)
H: Core ideas
- General systems theory (von Bertalanffy) and cybernetics (Wiener).
- Reinforcing loops drive growth or collapse; balancing loops seek goals.
- Delays in balancing loops cause oscillation and overshoot.
- Boundaries, hierarchy and emergence.
H: System dynamics
- Forrester (1960s): models of industrial, urban and world systems.
- Stocks as integrals of net flows: dS/dt = inflow − outflow.
- Causal loop diagrams and simulation tools.
- Limits to Growth (1972) world model.
H: Applications and lessons
- Supply chains (bullwhip), healthcare capacity, climate policy.
- Policy resistance: interventions countered by feedback.
- Leverage points (Meadows): goals and paradigms matter more than parameters.
- Systems thinking in organisations.
X: A bath holds 100 L, fills at 10 L/min and drains at 6 L/min. How does the stock change?
> Net flow = 10 − 6 = 4 L/min
> dS/dt = 4, so after 10 minutes the bath holds 140 L
> The stock keeps rising until the flows balance or it overflows
K: Systems theory uses stocks, flows and feedback; reinforcing and balancing loops shape behaviour; delays cause overshoot; system dynamics models policy problems; leverage lies in structure and goals.
!: Expecting an immediate response from a system with significant delays.
Q: What do balancing feedback loops do? | Push a system towards a goal or equilibrium.
Q: Who founded system dynamics? | Jay Forrester.
SUM: Structure drives behaviour.
SUM: Feedback and delays matter most.
SRC: Meadows DH, Thinking in Systems: A Primer (Chelsea Green 2008) | textbook | 2008 | https://www.chelseagreen.com/
SRC: Sterman JD, Business Dynamics: Systems Thinking and Modeling for a Complex World (McGraw-Hill 2000) | textbook | 2000 | https://www.mheducation.com/
NUM1#maths-u20-51-q1@1: A stock of 500 units has inflow 20 per day and outflow 45 per day. After how many days is it empty? | 20 | 0 | days | Net outflow is 25 per day, so 500/25 = 20 days.
M1#maths-u20-51-q2@1: Which loop type drives exponential growth? | A reinforcing (positive) feedback loop | A balancing (negative) feedback loop | A loop with no feedback | A delay with no loop | A constant flow | Each increase feeds further increases, as in compound interest.
M2#maths-u20-51-q3@2: Why do balancing loops with long delays often overshoot their targets? | Corrective actions keep acting after the target is reached because their effects arrive late | Delays turn balancing loops into reinforcing ones | Targets move at random, so the loop can't settle | Balancing loops never reach their targets at all | They don't overshoot; delays only slow the approach | The system responds to old information, as in a slow shower thermostat.
`;
