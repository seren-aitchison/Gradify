// School 10: Differential Equations. Format: kit/course/notes.js. Standard: docs/CURRICULUM_CONTENT_STANDARD.md
// Ordinary differential equations and their solution methods, transforms, the classical PDEs, numerical methods and dynamical systems.
export default `
## Ordinary Differential Equations (ODEs)
S: An ordinary differential equation relates an unknown function of one variable to its derivatives. ODEs describe how things change, from cooling coffee and population growth to orbits and electrical circuits.
O: Classify ODEs by order and linearity
O: Verify solutions and use initial conditions to find particular solutions
T: Order | The highest derivative in the equation: y″ + y = 0 is second order
T: Linear ODE | An equation linear in y and its derivatives: a_{n}(x)y^{(n)} + … + a₀(x)y = g(x)
H: Classification
- Order: the highest derivative present.
- Linear vs nonlinear: y″ + 3y′ + 2y = sin x is linear; y′ = y^{2} and θ″ + sin θ = 0 aren't.
- Homogeneous linear: g(x) = 0 (zero right-hand side); superposition then holds.
H: Solutions
- A solution makes the equation true when substituted; check by differentiating.
- General solutions contain n arbitrary constants for an nth-order equation.
- Initial or boundary conditions fix the constants, giving a particular solution.
H: Existence and understanding
- Picard–Lindelöf: y′ = f(x, y), y(x₀) = y₀ has a unique local solution if f is continuous and Lipschitz in y.
- Direction fields show solution curves without solving.
- Most ODEs have no closed-form solution; numerical and qualitative methods fill the gap.
X: Check that y = Ce^{2x} solves y′ = 2y, and find the solution with y(0) = 3.
> y′ = 2Ce^{2x} = 2y ✓
> y(0) = C = 3
> The particular solution is y = 3e^{2x}
K: Classify by order and linearity; verify by substitution; n constants for order n, fixed by conditions; existence and uniqueness need f Lipschitz in y.
!: Forgetting that the general solution of an nth-order equation needs n constants.
Q: What is the order of y‴ + xy′ = 0? | 3.
Q: Is y′ = sin y linear? | No: sin y isn't linear in y.
SUM: ODEs relate functions to their derivatives.
SUM: Conditions pick out particular solutions.
SRC: Boyce WE, DiPrima RC, Meade DB, Elementary Differential Equations and Boundary Value Problems (12th edn, Wiley 2022) | textbook | 2022 | https://www.wiley.com/
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
NUM1#maths-u10-01-q1@1: How many arbitrary constants does the general solution of a fourth-order linear ODE contain? | 4 | 0 |  | An nth-order equation needs n constants, one per integration.
M1#maths-u10-01-q2@1: Which equation is linear? | y″ + x^{2}y′ + y = e^{x} | y′ = y^{2} + 1 | yy″ = 1 | y′ + sin y = 0 | (y′)^{2} = x | y and its derivatives appear only to the first power, multiplied by functions of x.
M2#maths-u10-01-q3@2: Why does a direction field help even without solving the ODE? | It shows the slope at each point, so solution curves can be sketched | It gives the exact solution formula | It only works for linear equations | It replaces initial conditions | Each arrow points to where the equation has an equilibrium | Each arrow has slope f(x, y); solutions follow the arrows.

## First-Order Differential Equations
S: First-order ODEs y′ = f(x, y) model rates of change: cooling, decay, growth, mixing tanks and simple circuits. Several standard types have reliable solution methods, and recognising the type is the first skill.
O: Recognise the main types of first-order ODE
O: Model and solve Newton's law of cooling
T: Newton's law of cooling | dT/dt = −k(T − T_{s}): the rate of cooling is proportional to the difference from the surroundings
T: Equilibrium solution | A constant solution, where f(x, y) = 0 for all x
H: Types and methods
- Separable: y′ = g(x)h(y). Linear: y′ + P(x)y = Q(x) (integrating factor).
- Exact: M dx + N dy = 0 with M_{y} = N_{x}. Homogeneous: y′ = F(y/x).
- Bernoulli: y′ + Py = Qyⁿ (substitute v = y^{1−n}).
- Many equations fit more than one type; choose the easiest.
H: Modelling
- Write "rate of change = in − out" for quantities like salt in a tank.
- Exponential growth and decay: y′ = ky.
- Electrical RC circuits: RQ′ + Q/C = V.
H: Qualitative tools
- Direction fields and isoclines (curves where the slope is constant).
- Equilibrium solutions and their stability (see Autonomous Differential Equations).
- Euler's method for numerical approximation (see Numerical Solutions of ODEs).
X: Coffee at 90°C cools in a 20°C room to 60°C in 10 minutes. Find T(t).
> T = 20 + 70e^{−kt}, from the cooling law with T(0) = 90
> 60 = 20 + 70e^{−10k}, so e^{−10k} = 4/7 and k = ln(7/4)/10 ≈ 0.056 per minute
> T(t) = 20 + 70(4/7)^{t/10}
K: Identify the type (separable, linear, exact, homogeneous, Bernoulli) and apply its method; model with rates in minus out; use direction fields for insight.
!: Using the actual temperature T instead of the difference T − T_{s} in Newton's law.
Q: What type is y′ + 3y = e^{x}? | Linear first-order.
Q: What is an equilibrium solution of y′ = y(1 − y)? | y = 0 or y = 1.
SUM: First-order ODEs model rates.
SUM: Recognising the type is the key step.
SRC: Boyce WE, DiPrima RC, Meade DB, Elementary Differential Equations and Boundary Value Problems (12th edn, Wiley 2022) | textbook | 2022 | https://www.wiley.com/
SRC: Zill DG, A First Course in Differential Equations with Modeling Applications (11th edn, Cengage 2018) | textbook | 2018 | https://www.cengage.co.uk/
NUM1#maths-u10-02-q1@1: Using T(t) = 20 + 70(4/7)^{t/10}, find T(20) to 2 decimal places. | 42.86 | 0.01 | °C | 20 + 70 × (4/7)^{2} = 20 + 70 × 16/49 ≈ 42.86°C.
M1#maths-u10-02-q2@1: Which method suits y′ = x^{2}y^{3}? | Separation of variables | An integrating factor for a linear ODE | The exact equation test | Undetermined coefficients | Laplace transforms only | The right side factorises into a function of x times a function of y.
M2#maths-u10-02-q3@2: A tank holds 100 L of water with 5 kg of salt. Brine at 0.2 kg/L flows in at 3 L/min, and the mixture flows out at 3 L/min. Which ODE models the salt S(t)? | S′ = 0.6 − 3S/100 | S′ = 0.6 + 3S/100 | S′ = 3 − 0.2S | S′ = 0.2S − 0.6 | S′ = −3S | In: 3 × 0.2 = 0.6 kg/min; out: 3 L/min at concentration S/100.

## Separable Differential Equations
S: A separable equation can be rearranged so that all the y terms are on one side and all the x terms on the other, then each side is integrated. It's the simplest solution method and covers exponential growth, logistic growth and many physical models.
O: Solve separable ODEs and apply initial conditions
O: Solve the logistic equation and interpret its solution
T: Separable equation | dy/dx = g(x)h(y), rearranged to dy/h(y) = g(x) dx
T: Logistic equation | dP/dt = rP(1 − P/K), with carrying capacity K
H: Method
- Separate: dy/h(y) = g(x) dx.
- Integrate both sides; one constant is enough.
- Solve for y if possible; apply the initial condition.
- Check for constant solutions with h(y) = 0, which dividing may lose.
H: Logistic growth
- Solution: P(t) = K/(1 + Ae^{−rt}), with A = (K − P₀)/P₀.
- Growth is fastest at P = K/2, giving an S-shaped curve.
- Used for populations, the spread of innovations and epidemics in early models.
H: Other examples
- Radioactive decay: N = N₀e^{−λt}.
- Torricelli's law for a draining tank: dh/dt = −k√h.
- Chemical reactions with rate depending on concentration.
X: Solve dy/dx = xy with y(0) = 2.
> Separate: dy/y = x dx
> Integrate: ln|y| = x^{2}/2 + c, so y = Ae^{x^{2}/2}
> y(0) = A = 2, so y = 2e^{x^{2}/2}
- Always check the answer by differentiating it and substituting back.
K: Separate, integrate both sides, solve and apply conditions; check for lost constant solutions; the logistic solution is K/(1 + Ae^{−rt}).
!: Dividing by h(y) and losing the solution where h(y) = 0.
Q: Solve dy/dx = 3y. | y = Ae^{3x}.
Q: At what population is logistic growth fastest? | K/2.
SUM: Separate variables and integrate.
SUM: The logistic curve is S-shaped.
SRC: Boyce WE, DiPrima RC, Meade DB, Elementary Differential Equations and Boundary Value Problems (12th edn, Wiley 2022) | textbook | 2022 | https://www.wiley.com/
SRC: Department for Education, Mathematics AS and A level subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
NUM1#maths-u10-03-q1@1: Using y = 2e^{x^{2}/2}, find y(2) to 2 decimal places. | 14.78 | 0.01 |  | 2e^{2} ≈ 2 × 7.389 = 14.78.
M1#maths-u10-03-q2@1: A logistic population has K = 1,000. At what size is it growing fastest? | 500 | 1,000 | 250 | 0 | 750 | rP(1 − P/K) is a parabola in P with its maximum at P = K/2.
M2#maths-u10-03-q3@2: Solving dy/dx = y^{2} by dividing by y^{2}, which solution can be lost? | The constant solution y = 0 | The solution y = 1 | All solutions with y < 0 | The solution y = x | No solution is lost | Dividing by y^{2} assumes y ≠ 0, but y = 0 also satisfies the equation.

## Linear Differential Equations
S: A first-order linear ODE y′ + P(x)y = Q(x) can always be solved with an integrating factor, which turns the left side into the derivative of a product. Linear equations describe circuits, mixing and many systems with external inputs.
O: Solve first-order linear ODEs with an integrating factor
O: Interpret transient and steady-state parts of solutions
T: Integrating factor | μ(x) = e^{∫P(x) dx}, which makes μy′ + μPy = (μy)′
T: Steady state | The part of the solution that remains as x → ∞, after transients decay
H: Method
- Write in standard form y′ + P(x)y = Q(x).
- Multiply by μ = e^{∫P dx}: the left side becomes (μy)′.
- Integrate: μy = ∫ μQ dx + C, then divide by μ.
H: Structure of solutions
- General solution = homogeneous solution (Ce^{−∫P}) + a particular solution.
- With constant P > 0, the homogeneous part decays: it's the transient.
- The particular part is often the steady state.
H: Applications
- RC circuit: Q′ + Q/(RC) = V/R, charging to Q = CV(1 − e^{−t/RC}).
- Mixing problems and drug concentration with constant infusion.
- Linear equations of higher order use superposition in the same way.
X: Solve y′ + 2y = 4 with y(0) = 0.
> μ = e^{2x}; (e^{2x}y)′ = 4e^{2x}
> e^{2x}y = 2e^{2x} + C, so y = 2 + Ce^{−2x}
> y(0) = 0 gives C = −2: y = 2 − 2e^{−2x} (steady state 2, transient −2e^{−2x})
K: Standard form, multiply by e^{∫P}, integrate the product; solution = transient + steady state.
!: Forgetting to put the equation in standard form (coefficient of y′ equal to 1) before finding μ.
Q: What is the integrating factor for y′ + 3y = x? | e^{3x}.
Q: What is the integrating factor for y′ − y/x = x (x > 0)? | 1/x.
SUM: Integrating factors solve linear equations.
SUM: Solutions split into transient and steady parts.
SRC: Boyce WE, DiPrima RC, Meade DB, Elementary Differential Equations and Boundary Value Problems (12th edn, Wiley 2022) | textbook | 2022 | https://www.wiley.com/
SRC: Stroud KA, Booth DJ, Advanced Engineering Mathematics (6th edn, Bloomsbury 2020) | textbook | 2020 | https://www.bloomsbury.com/
NUM1#maths-u10-04-q1@1: Using y = 2 − 2e^{−2x}, find y(1) to 4 decimal places. | 1.7293 | 0.0001 |  | 2 − 2e^{−2} ≈ 2 − 0.2707 = 1.7293.
M1#maths-u10-04-q2@1: What is the general solution of y′ − y/x = x for x > 0? | y = x^{2} + Cx | y = x^{2} + C | y = Cx^{2} | y = x + C/x | y = e^{x} + C | With μ = 1/x, (y/x)′ = 1, so y/x = x + C.
M2#maths-u10-04-q3@2: An RC circuit charges according to Q′ + Q/(RC) = V/R. What does Q approach as t → ∞? | CV | V/R | RC | 0 | V | The transient decays, leaving the steady state Q = CV.

## Exact Differential Equations
S: An exact equation M dx + N dy = 0 is the total differential of some function F(x, y), so its solutions are the level curves F = C. Testing for exactness and finding F are quick once you see the pattern.
O: Test whether an equation is exact
O: Find the potential function F and the implicit solution
T: Exact equation | M dx + N dy = 0 with ∂M/∂y = ∂N/∂x (on a simply connected region)
T: Potential function | F with F_{x} = M and F_{y} = N; solutions are F(x, y) = C
H: Testing and solving
- Check M_{y} = N_{x}.
- Integrate M with respect to x: F = ∫M dx + g(y).
- Differentiate with respect to y, compare with N, and find g′(y).
- Solutions: F(x, y) = C, often left implicit.
H: Integrating factors
- If not exact, a factor μ may make it exact.
- If (M_{y} − N_{x})/N depends only on x, μ(x) = e^{∫(M_{y} − N_{x})/N dx} works.
- Similarly for μ(y) with (N_{x} − M_{y})/M.
H: Connections
- Exactness is the condition for a 2D vector field (M, N) to be conservative (School 8).
- F is like a potential energy; solution curves are its contours.
X: Solve (2xy + 3) dx + (x^{2} − 1) dy = 0.
> M_{y} = 2x = N_{x}, so it's exact
> F = ∫(2xy + 3) dx = x^{2}y + 3x + g(y); F_{y} = x^{2} + g′(y) = x^{2} − 1, so g = −y
> Solution: x^{2}y + 3x − y = C
- Example: y dx + x dy = 0 is d(xy) = 0, so xy = C: hyperbolas.
- Solutions may be left implicit if solving for y is awkward.
K: Exact means M_{y} = N_{x}; build F from ∫M dx + g(y); solutions are F = C; integrating factors can create exactness.
!: Forgetting the "+ g(y)" when integrating M with respect to x.
Q: Is (y dx + x dy) = 0 exact? | Yes: M_{y} = 1 = N_{x}.
Q: What are the solution curves of an exact equation? | Level curves F(x, y) = C.
SUM: Exact equations are total differentials.
SUM: Their solutions are level curves.
SRC: Zill DG, A First Course in Differential Equations with Modeling Applications (11th edn, Cengage 2018) | textbook | 2018 | https://www.cengage.co.uk/
SRC: Boyce WE, DiPrima RC, Meade DB, Elementary Differential Equations and Boundary Value Problems (12th edn, Wiley 2022) | textbook | 2022 | https://www.wiley.com/
NUM1#maths-u10-05-q1@1: For x^{2}y + 3x − y = C passing through (1, 2), find C. | 3 | 0 |  | 1 × 2 + 3 − 2 = 3.
M1#maths-u10-05-q2@1: Which equation is exact? | (3x^{2} + y) dx + (x + 2y) dy = 0 | (x + y) dx + (x − y)^{2} dy = 0 | y dx − x dy = 0 | x^{2}y dx + y dy = 0 | (y + 1) dx + y^{2} dy = 0 | M_{y} = 1 and N_{x} = 1, so they're equal.
M2#maths-u10-05-q3@2: Why is exactness linked to conservative vector fields? | Both need ∂M/∂y = ∂N/∂x, so (M, N) is the gradient of a potential | Exact equations are always linear | Conservative fields have zero divergence | Neither involves derivatives | Only linear equations can ever be exact, like linear vector fields | M dx + N dy = dF exactly when (M, N) = ∇F.

## Homogeneous Differential Equations
S: A first-order equation is homogeneous (in this sense) if it can be written y′ = F(y/x). The substitution v = y/x turns it into a separable equation. The word "homogeneous" also describes linear equations with zero right-hand side, a different idea.
O: Recognise and solve equations of the form y′ = F(y/x)
O: Distinguish the two meanings of "homogeneous"
T: Homogeneous equation (first-order) | y′ = F(y/x), equivalently M and N are homogeneous functions of the same degree
T: Substitution v = y/x | Writes y = vx, so y′ = v + xv′
H: Method
- Check that y′ can be written as a function of y/x (each term has the same total degree).
- Substitute y = vx and y′ = v + xv′.
- Separate: dv/(F(v) − v) = dx/x.
- Integrate and substitute back v = y/x.
H: Two meanings
- First-order homogeneous: y′ = F(y/x), as here.
- Homogeneous linear: a linear ODE with zero right-hand side (y″ + y = 0), where solutions can be added.
- Context tells you which is meant.
H: Uses
- Geometric problems (curves whose tangents meet axes in fixed ratios).
- Pursuit curves and some flow problems.
X: Solve y′ = (x + y)/x for x > 0.
> y′ = 1 + y/x: substitute y = vx, so v + xv′ = 1 + v
> xv′ = 1, so v = ln x + C
> y = x ln x + Cx
- After integrating, write the answer in terms of x and y and check it in the original equation.
- Initial conditions are applied after substituting back, or to v = y/x directly.
K: Write y′ = F(y/x), substitute y = vx, separate and integrate; don't confuse with homogeneous linear equations.
!: Substituting y = vx but forgetting the product rule term in y′ = v + xv′.
Q: Is y′ = (x^{2} + y^{2})/(xy) homogeneous? | Yes: it's (x/y) + (y/x), a function of y/x.
Q: What is y′ after substituting y = vx? | v + xv′.
SUM: Substitution makes homogeneous equations separable.
SUM: "Homogeneous" has two meanings.
SRC: Zill DG, A First Course in Differential Equations with Modeling Applications (11th edn, Cengage 2018) | textbook | 2018 | https://www.cengage.co.uk/
SRC: Stroud KA, Booth DJ, Engineering Mathematics (8th edn, Bloomsbury 2020) | textbook | 2020 | https://www.bloomsbury.com/
NUM1#maths-u10-06-q1@1: For y = x ln x + Cx with y(1) = 2, find y(e) to 3 decimal places. | 8.155 | 0.001 |  | C = 2, so y(e) = e × 1 + 2e = 3e ≈ 8.155.
M1#maths-u10-06-q2@1: Which equation is homogeneous in the y/x sense? | y′ = (2x − y)/(x + y) | y′ = x + y^{2} | y′ = e^{x}y | y′ = x^{2} + 1 | y′ = y + 1 | Dividing top and bottom by x gives (2 − y/x)/(1 + y/x).
M2#maths-u10-06-q3@2: In "y″ + 4y = 0 is homogeneous", what does homogeneous mean? | The linear equation has zero right-hand side | It can be written as F(y/x) | Its coefficients are all equal | It has constant solutions only | It's separable | For linear ODEs, homogeneous means there's no forcing term.

## Bernoulli Equations
S: A Bernoulli equation y′ + P(x)y = Q(x)yⁿ is nonlinear when n ≠ 0, 1, but the substitution v = y^{1−n} turns it into a linear equation. It models logistic growth and some drag and population problems.
O: Recognise Bernoulli equations and choose the right substitution
O: Solve Bernoulli equations by reducing them to linear form
T: Bernoulli equation | y′ + P(x)y = Q(x)yⁿ, with n a real number other than 0 or 1
T: Linearising substitution | v = y^{1−n}, which gives v′ + (1 − n)Pv = (1 − n)Q
H: Method
- Divide by yⁿ: y^{−n}y′ + Py^{1−n} = Q.
- Let v = y^{1−n}, so v′ = (1 − n)y^{−n}y′.
- Get the linear equation v′ + (1 − n)Pv = (1 − n)Q and solve with an integrating factor.
- Convert back: y = v^{1/(1−n)}; check y = 0 separately if n > 0.
H: Examples
- Logistic: P′ = rP − (r/K)P^{2} is Bernoulli with n = 2.
- Motion with drag proportional to velocity squared.
- Some models of learning and chemical kinetics.
H: Why it works
- The substitution clears the nonlinear term by matching powers.
- It's named after Jacob Bernoulli, who posed it in 1695; Leibniz found the substitution.
X: Solve y′ + y = y^{2}.
> n = 2, so v = 1/y and v′ = −y′/y^{2}
> Divide by y^{2}: y′/y^{2} + 1/y = 1 becomes −v′ + v = 1, so v′ − v = −1
> v = 1 + Ce^{x}, so y = 1/(1 + Ce^{x}) (and y = 0 is also a solution)
- Example of choosing n: y′ = y + xy^{3} has n = 3, so use v = y^{−2}.
K: For y′ + Py = Qyⁿ, set v = y^{1−n} to get a linear equation; solve with an integrating factor; convert back and check y = 0.
!: Using v = yⁿ instead of v = y^{1−n}.
Q: What substitution solves y′ + y = xy^{3}? | v = y^{−2}.
Q: Which famous growth model is a Bernoulli equation? | The logistic equation.
SUM: Bernoulli equations linearise by substitution.
SUM: v = y^{1−n} is the key.
SRC: Boyce WE, DiPrima RC, Meade DB, Elementary Differential Equations and Boundary Value Problems (12th edn, Wiley 2022) | textbook | 2022 | https://www.wiley.com/
SRC: Zill DG, A First Course in Differential Equations with Modeling Applications (11th edn, Cengage 2018) | textbook | 2018 | https://www.cengage.co.uk/
NUM1#maths-u10-07-q1@1: With y = 1/(1 + Ce^{x}) and y(0) = ½, find y(ln 2) to 4 decimal places. | 0.3333 | 0.0001 |  | y(0) = 1/(1 + C) = ½ gives C = 1; y(ln 2) = 1/(1 + 2) = 1/3.
M1#maths-u10-07-q2@1: Which substitution linearises y′ − 2y = 3y^{4}? | v = y^{−3} | v = y^{4} | v = y^{3} | v = 1/y | v = ln y | For a Bernoulli equation use v = y^{1−n}; with n = 4 that gives v = y^{−3}.
M3#maths-u10-07-q3@2: After substituting v = y^{1−n}, what equation does v satisfy? | v′ + (1 − n)P v = (1 − n)Q | v′ + Pv = Qvⁿ | v′ = Qv | v″ + Pv′ = Q | v′ + nPv = nQ | Multiplying the divided equation by (1 − n) gives this linear form.

## Second-Order Differential Equations
S: Second-order linear ODEs ay″ + by′ + cy = f(x) describe vibrating springs, swinging pendulums (approximately) and electrical oscillators. Constant-coefficient equations are solved completely using the characteristic equation and a particular integral.
O: Solve homogeneous second-order equations using the characteristic equation
O: Find particular integrals by undetermined coefficients and interpret damping
T: Characteristic equation | ar^{2} + br + c = 0, obtained by trying y = e^{rx}
T: Complementary function and particular integral | The general solution of the homogeneous equation (CF), plus any one solution of the full equation (PI)
H: Homogeneous case
- Distinct real roots r₁, r₂: y = Ae^{r₁x} + Be^{r₂x}.
- Repeated root r: y = (A + Bx)e^{rx}.
- Complex roots α ± iβ: y = e^{αx}(A cos βx + B sin βx).
H: Non-homogeneous case
- General solution = CF + PI.
- Undetermined coefficients: guess a PI of the same form as f (polynomial, exponential, sine/cosine).
- If the guess is part of the CF, multiply by x (resonance).
H: Oscillations
- my″ + cy′ + ky = 0: underdamped (oscillates), critically damped or overdamped.
- Forcing at the natural frequency without damping gives resonance, with growing amplitude.
- RLC circuits obey the same equation (L, R, 1/C).
X: Solve y″ − 3y′ + 2y = 4.
> Characteristic: r^{2} − 3r + 2 = 0, so r = 1, 2: CF = Ae^{x} + Be^{2x}
> PI: try y = k constant: 2k = 4, so k = 2
> General solution: y = Ae^{x} + Be^{2x} + 2
K: Try e^{rx} to get the characteristic equation; three root cases; add a PI matching the forcing; multiply by x in resonant cases.
!: Choosing a particular integral that's already part of the complementary function.
Q: Solve y″ + 9y = 0. | y = A cos 3x + B sin 3x.
Q: What does critically damped mean? | The characteristic equation has a repeated root: return to equilibrium fastest without oscillating.
SUM: Characteristic roots give the CF.
SUM: Add a PI for the forcing.
SRC: Boyce WE, DiPrima RC, Meade DB, Elementary Differential Equations and Boundary Value Problems (12th edn, Wiley 2022) | textbook | 2022 | https://www.wiley.com/
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
NUM1#maths-u10-08-q1@1: For y″ + 4y′ + 13y = 0, the roots are α ± iβ. Find β. | 3 | 0 |  | r = (−4 ± √(16 − 52))/2 = −2 ± 3i, so β = 3.
M1#maths-u10-08-q2@1: What form of PI should you try for y″ + y = e^{2x}? | ke^{2x} | kxe^{2x} | k sin 2x | kx^{2} | k | The forcing is e^{2x}, which isn't in the CF (cos x, sin x).
M3#maths-u10-08-q3@2: Why does y″ + y = cos x need a particular integral of the form x(a cos x + b sin x)? | cos x and sin x already solve the homogeneous equation, so plain multiples can't be a PI | The forcing is too large | Cosine has no derivative | Undetermined coefficients never works for trig | Trigonometric forcing always needs an extra factor of x, whatever the CF | Forcing at the natural frequency is resonance, so the guess is multiplied by x.

## Higher-Order Differential Equations
S: Linear ODEs of order three and above work like second-order ones: a characteristic polynomial gives the homogeneous solutions, and particular integrals handle the forcing. Beam deflection and control systems produce such equations.
O: Solve higher-order constant-coefficient linear ODEs
O: Use the Wronskian to test independence of solutions
T: Characteristic polynomial | a_{n}rⁿ + … + a₁r + a₀ = 0 for a_{n}y^{(n)} + … + a₀y = 0
T: Wronskian | W = det of the matrix of the functions and their derivatives; non-zero implies linear independence
H: Homogeneous solutions
- Each real root r gives e^{rx}; a root of multiplicity m gives e^{rx}, xe^{rx}, …, x^{m−1}e^{rx}.
- Complex pairs α ± iβ give e^{αx} cos βx and e^{αx} sin βx (times powers of x if repeated).
- The general solution has n independent solutions.
H: Particular solutions
- Undetermined coefficients for polynomial, exponential and trigonometric forcing.
- Variation of parameters works for any forcing (but needs integration).
H: Systems view
- An nth-order equation becomes a system of n first-order equations (y₁ = y, y₂ = y′, …).
- This is how numerical solvers handle it.
- Euler–Bernoulli beams: EI y⁗ = w(x), a fourth-order equation.
X: Solve y‴ − y′ = 0.
> Characteristic: r^{3} − r = r(r − 1)(r + 1) = 0
> Roots 0, 1, −1
> y = A + Be^{x} + Ce^{−x}
K: Roots of the characteristic polynomial give solutions, with powers of x for repeats; the Wronskian tests independence; higher-order equations convert to systems.
!: Missing the x and x^{2} factors for repeated roots.
Q: What solutions does a triple root r = 2 give? | e^{2x}, xe^{2x} and x^{2}e^{2x}.
Q: How many independent solutions does a fifth-order linear homogeneous ODE have? | 5.
SUM: Higher-order equations generalise second-order methods.
SUM: Repeated roots need powers of x.
SRC: Kreyszig E, Advanced Engineering Mathematics (10th edn, Wiley 2011) | textbook | 2011 | https://www.wiley.com/
SRC: Boyce WE, DiPrima RC, Meade DB, Elementary Differential Equations and Boundary Value Problems (12th edn, Wiley 2022) | textbook | 2022 | https://www.wiley.com/
NUM1#maths-u10-09-q1@1: Find the Wronskian of 1 and x. | 1 | 0 |  | W = det [[1, x], [0, 1]] = 1, non-zero, so they're independent.
M1#maths-u10-09-q2@1: What is the general solution of (D − 1)^{3}y = 0, where D = d/dx? | (A + Bx + Cx^{2})e^{x} | Ae^{x} + Be^{2x} + Ce^{3x} | A + Bx + Cx^{2} | Ae^{x} | (A + Bx)e^{x} | A triple root at 1 gives e^{x}, xe^{x} and x^{2}e^{x}.
M2#maths-u10-09-q3@2: How is a third-order ODE usually solved numerically? | Rewrite it as a system of three first-order equations | Integrate three times by hand | Differentiate it once more | Solvers apply the quadratic formula to its characteristic equation | It can't be solved numerically | Setting y₁ = y, y₂ = y′, y₃ = y″ gives a first-order system for standard solvers.

## Nonlinear Differential Equations
S: Nonlinear ODEs, where y or its derivatives appear non-linearly, describe real pendulums, populations, chemical reactions and much more. They rarely have formula solutions, can blow up in finite time, and need qualitative and numerical methods.
O: Recognise distinctive behaviours of nonlinear ODEs
O: Linearise a nonlinear equation near an equilibrium
T: Superposition | Adding solutions to get new solutions; true for linear homogeneous equations, false for nonlinear ones
T: Finite-time blow-up | A solution that becomes infinite at a finite time
H: What changes
- No superposition: the sum of two solutions usually isn't a solution.
- Solutions may exist only for a limited time: y′ = y^{2}, y(0) = 1 gives y = 1/(1 − x), which blows up at x = 1.
- Behaviour can depend sensitively on initial conditions (chaos, in three or more dimensions).
H: Methods
- Exact methods for special forms (separable, Bernoulli, exact).
- Linearisation: near an equilibrium, replace f by its first-order Taylor approximation.
- Phase plane analysis, energy methods and numerical solution.
H: The pendulum
- θ″ + (g/L) sin θ = 0 is nonlinear.
- For small angles, sin θ ≈ θ gives simple harmonic motion with period 2π√(L/g).
- For large swings the period grows, and the linear model fails.
X: Solve y′ = y^{2} with y(0) = 2 and find where the solution blows up.
> Separate: −1/y = x + C; y(0) = 2 gives C = −½
> y = 1/(½ − x) = 2/(1 − 2x)
> y → ∞ as x → ½: the solution exists only for x < ½
K: Nonlinear ODEs lack superposition, can blow up, and are studied by linearisation, phase planes and numerics; the small-angle pendulum is the classic linearisation.
!: Assuming solutions of nonlinear ODEs exist for all time.
Q: What is the period of a small-angle pendulum of length L? | 2π√(L/g).
Q: Does superposition hold for y′ = y^{2}? | No.
SUM: Nonlinear ODEs behave in new ways.
SUM: Linearisation gives local insight.
SRC: Strogatz SH, Nonlinear Dynamics and Chaos (2nd edn, CRC Press 2015) | textbook | 2015 | https://www.routledge.com/
SRC: Jordan DW, Smith P, Nonlinear Ordinary Differential Equations (4th edn, Oxford University Press 2007) | textbook | 2007 | https://global.oup.com/
NUM1#maths-u10-10-q1@1: For y′ = y^{2} with y(0) = 4, at what x does the solution blow up? | 0.25 | 0.0001 |  | y = 1/(¼ − x), which blows up at x = ¼.
M1#maths-u10-10-q2@1: Which equation is nonlinear? | y″ + sin y = 0 | y″ + 4y = cos x | y′ + xy = 1 | y″ − y = e^{x} | x^{2}y″ + y = 0 | sin y isn't linear in y; the others are linear in y.
M2#maths-u10-10-q3@2: Why do large-amplitude pendulums disagree with the period 2π√(L/g)? | That formula uses sin θ ≈ θ, which fails for large angles | Gravity changes with amplitude | Large pendulums have more mass | The formula is for springs only | Air resistance grows with amplitude and dominates large swings | The linear approximation is only accurate for small θ; the true period grows with amplitude.

## Autonomous Differential Equations
S: An autonomous equation y′ = f(y) has no explicit dependence on the independent variable. Its behaviour can be read from a phase line: equilibria where f(y) = 0, and arrows showing whether solutions rise or fall between them.
O: Find equilibria and classify their stability
O: Analyse population models with harvesting
T: Equilibrium | A value y* with f(y*) = 0, giving a constant solution
T: Stable equilibrium | One that nearby solutions approach; f′(y*) < 0 is a sufficient test
H: Phase line
- Mark the zeros of f on a line.
- Where f > 0, arrows point up (y increases); where f < 0, they point down.
- Stable: arrows point towards it; unstable: away; semi-stable: mixed.
H: Stability test
- f′(y*) < 0: stable. f′(y*) > 0: unstable. f′(y*) = 0: inconclusive.
- Solutions can't cross equilibria, so they're monotone between them.
- Time translation: if y(t) solves it, so does y(t − c).
H: Population models
- Logistic: y′ = ry(1 − y/K) has unstable 0 and stable K.
- Constant harvesting h: y′ = ry(1 − y/K) − h. The largest sustainable h is rK/4; above it the population collapses.
- Allee effect: populations below a threshold die out.
X: Classify the equilibria of y′ = y(3 − y).
> Equilibria where y(3 − y) = 0: y = 0 and y = 3
> f′(y) = 3 − 2y: f′(0) = 3 > 0 (unstable), f′(3) = −3 < 0 (stable)
> Any positive starting value tends to 3
K: Equilibria solve f(y) = 0; f′ < 0 means stable; read the phase line; harvesting beyond rK/4 causes collapse.
!: Concluding stability from f′(y*) = 0, which needs further analysis.
Q: Is y = 2 stable for y′ = 2 − y? | Yes: f′ = −1 < 0.
Q: What is the maximum sustainable constant harvest for logistic growth? | rK/4.
SUM: Phase lines reveal autonomous behaviour.
SUM: The sign of f′ decides stability.
SRC: Strogatz SH, Nonlinear Dynamics and Chaos (2nd edn, CRC Press 2015) | textbook | 2015 | https://www.routledge.com/
SRC: Murray JD, Mathematical Biology I: An Introduction (3rd edn, Springer 2002) | textbook | 2002 | https://link.springer.com/
NUM1#maths-u10-11-q1@1: A fish population grows logistically with r = 0.4 per year and K = 1,000. What is the maximum sustainable constant harvest per year? | 100 | 0 | fish | rK/4 = 0.4 × 1,000/4 = 100.
M1#maths-u10-11-q2@1: For y′ = y^{2} − 4, which equilibrium is stable? | y = −2 | y = 2 | Both | Neither | y = 0 | f′(y) = 2y: f′(−2) = −4 < 0 (stable), f′(2) = 4 > 0 (unstable).
M2#maths-u10-11-q3@2: Why can't two different solutions of an autonomous ODE cross? | Uniqueness forbids two solutions through the same point | Autonomous equations have only one solution | Solutions are always parallel lines | Crossing would make f negative | They can cross | With f Lipschitz, the solution through any point is unique.

## Systems of Differential Equations
S: Systems of ODEs track several interacting quantities: predators and prey, coupled springs, chemical species. Linear systems x′ = Ax are solved with eigenvalues and eigenvectors, and their phase portraits show every possible behaviour at a glance.
O: Solve linear systems x′ = Ax using eigenvalues and eigenvectors
O: Classify equilibria of 2D linear systems
T: Linear system | x′ = Ax, with x a vector and A a constant matrix
T: Phase portrait | A picture of solution trajectories in the (x, y) plane
H: Solving
- If Av = λv, then e^{λt}v is a solution.
- With distinct eigenvalues: x(t) = c₁e^{λ₁t}v₁ + c₂e^{λ₂t}v₂.
- Complex eigenvalues α ± iβ give spirals (rotating at rate β, growing or decaying with α).
H: Classifying 2D equilibria
- Real eigenvalues, same sign: node (stable if negative).
- Opposite signs: saddle (unstable).
- Complex: spiral (stable if α < 0), or centre if α = 0.
- Trace and determinant: det < 0 means saddle; det > 0 with trace < 0 means stable.
H: Models
- Lotka–Volterra: x′ = ax − bxy, y′ = −cy + dxy gives predator–prey cycles.
- Coupled oscillators and normal modes.
- Compartment models in epidemiology (SIR) and pharmacology.
X: Solve x′ = Ax with A = [[1, 2], [2, 1]].
> Eigenvalues: (1 − λ)^{2} − 4 = 0, so λ = 3 or −1
> Eigenvectors: (1, 1) for 3 and (1, −1) for −1
> x(t) = c₁e^{3t}(1, 1) + c₂e^{−t}(1, −1): a saddle (det A = −3 < 0)
K: Solutions combine e^{λt}v over eigenpairs; eigenvalues classify nodes, saddles, spirals and centres; trace and determinant give a quick test.
!: Forgetting to pair each eigenvalue with its own eigenvector in the solution.
Q: What equilibrium type occurs when eigenvalues are ±2i? | A centre.
Q: What does det A < 0 imply for a 2D linear system? | A saddle.
SUM: Eigenvalues solve linear systems.
SUM: They classify phase portraits.
SRC: Hirsch MW, Smale S, Devaney RL, Differential Equations, Dynamical Systems, and an Introduction to Chaos (3rd edn, Academic Press 2013) | textbook | 2013 | https://www.sciencedirect.com/
SRC: Boyce WE, DiPrima RC, Meade DB, Elementary Differential Equations and Boundary Value Problems (12th edn, Wiley 2022) | textbook | 2022 | https://www.wiley.com/
NUM1#maths-u10-12-q1@1: For A = [[−3, 1], [0, −2]], find the larger eigenvalue. | -2 | 0 |  | Triangular matrix: eigenvalues are the diagonal entries −3 and −2, so the larger is −2 (a stable node).
M1#maths-u10-12-q2@1: Eigenvalues −1 ± 2i describe which equilibrium? | A stable spiral | An unstable spiral | A saddle | A centre | An unstable node | Negative real part means decay; non-zero imaginary part means rotation.
M3#maths-u10-12-q3@2: Trace 4 and determinant 3. What kind of equilibrium is it? | An unstable node | A stable node | A saddle | A centre | A stable spiral | Eigenvalues 1 and 3 (from λ^{2} − 4λ + 3 = 0) are both positive and real.

## Initial Value Problems
S: An initial value problem gives an ODE together with the value of the solution (and enough derivatives) at a starting point. Whether a unique solution exists depends on how well-behaved the equation is, and the answer matters for physics and for numerical methods.
O: Solve initial value problems and apply existence and uniqueness theorems
O: Recognise cases where uniqueness fails
T: Initial value problem | An ODE with conditions such as y(x₀) = y₀ (and y′(x₀) = y₁ for second order) at one point
T: Lipschitz condition | |f(x, y₁) − f(x, y₂)| ≤ L|y₁ − y₂|, guaranteeing uniqueness
H: Existence and uniqueness
- Picard–Lindelöf: if f is continuous and Lipschitz in y near (x₀, y₀), there's a unique solution on some interval.
- Peano: continuity alone gives existence but not uniqueness.
- For linear equations with continuous coefficients, solutions exist on the whole interval.
H: Failure of uniqueness
- y′ = 3y^{2/3}, y(0) = 0 has y = 0 and y = x^{3} (and others): f isn't Lipschitz at y = 0.
- Physically, this would mean a system's future isn't determined by its present.
H: Solving
- Find the general solution, then use the initial conditions to fix constants.
- Second-order IVPs need two conditions (position and velocity).
- Laplace transforms build the initial conditions in automatically (see Laplace Transforms).
X: Solve y″ + y = 0 with y(0) = 1, y′(0) = 0.
> General solution: y = A cos x + B sin x
> y(0) = A = 1; y′(0) = B = 0
> y = cos x, unique since the equation is linear with constant coefficients
K: IVPs specify values at one point; Picard–Lindelöf gives uniqueness for Lipschitz f; non-Lipschitz cases like y′ = 3y^{2/3} can have many solutions.
!: Assuming every IVP has a unique solution.
Q: How many initial conditions does a second-order IVP need? | Two.
Q: Why does y′ = 3y^{2/3}, y(0) = 0 have more than one solution? | f isn't Lipschitz in y at y = 0.
SUM: IVPs fix solutions by starting values.
SUM: Lipschitz conditions ensure uniqueness.
SRC: Teschl G, Ordinary Differential Equations and Dynamical Systems (American Mathematical Society 2012) | textbook | 2012 | https://www.mat.univie.ac.at/~gerald/ftp/book-ode/
SRC: Boyce WE, DiPrima RC, Meade DB, Elementary Differential Equations and Boundary Value Problems (12th edn, Wiley 2022) | textbook | 2022 | https://www.wiley.com/
NUM1#maths-u10-13-q1@1: Solve y′ = −2y with y(0) = 5 and find y(1), to 4 decimal places. | 0.6767 | 0.0001 |  | y = 5e^{−2x}, so y(1) = 5e^{−2} ≈ 0.6767.
M1#maths-u10-13-q2@1: Which IVP is guaranteed a unique solution near x = 0? | y′ = x^{2} + y, y(0) = 1 | y′ = 3y^{2/3}, y(0) = 0 | y′ = √|y|, y(0) = 0 | y′ = y^{1/3}, y(0) = 0 | None of them | x^{2} + y is smooth, so Lipschitz in y; the others fail at y = 0.
M2#maths-u10-13-q3@2: Why does determinism in physics need uniqueness theorems? | Uniqueness means the present state determines one future | It guarantees all solutions are periodic | It makes equations linear | It removes the need for initial conditions | It doesn't need them | Without uniqueness, the same initial state could evolve in different ways.

## Boundary Value Problems
S: A boundary value problem specifies conditions at two or more points, such as both ends of a beam or a string. Unlike initial value problems, they may have no solution, exactly one, or infinitely many, and they lead naturally to eigenvalue problems.
O: Solve simple boundary value problems
O: Explain how BVPs can have none, one or infinitely many solutions
T: Boundary value problem | An ODE with conditions at different points, such as y(0) = a and y(L) = b
T: Eigenvalue problem | A BVP like y″ + λy = 0, y(0) = y(L) = 0 that has non-zero solutions only for special λ
H: Behaviour
- y″ + y = 0 with y(0) = 0, y(π/2) = 1: unique solution sin x.
- Same equation with y(0) = 0, y(π) = 0: infinitely many (B sin x).
- With y(0) = 0, y(π) = 1: no solution, since every solution with y(0) = 0 vanishes at π.
H: Eigenvalue problems
- y″ + λy = 0, y(0) = y(L) = 0 has non-zero solutions only for λ = (nπ/L)^{2}, with eigenfunctions sin(nπx/L).
- These give the vibration modes of a string and the basis for Fourier series.
- Sturm–Liouville theory generalises this (later in this school).
H: Applications and methods
- Beam deflection, steady heat flow along a rod, electrostatics between plates.
- Shooting method: guess a missing initial slope and adjust until the far condition is met.
- Finite differences turn BVPs into linear systems (see Finite Difference Methods).
X: Solve y″ = 6x with y(0) = 0 and y(1) = 0.
> Integrate twice: y = x^{3} + Cx + D
> y(0) = D = 0; y(1) = 1 + C = 0, so C = −1
> y = x^{3} − x
K: BVPs fix conditions at different points; they may have no, one or infinitely many solutions; eigenvalue problems have non-zero solutions only for special λ.
!: Assuming a BVP has a unique solution because an IVP would.
Q: For what λ does y″ + λy = 0, y(0) = y(π) = 0 have non-zero solutions? | λ = n^{2} for n = 1, 2, 3, …
Q: What is the shooting method? | Solving IVPs with guessed initial slopes and adjusting until the boundary condition is met.
SUM: BVPs set conditions at two points.
SUM: Eigenvalue problems give modes.
SRC: Boyce WE, DiPrima RC, Meade DB, Elementary Differential Equations and Boundary Value Problems (12th edn, Wiley 2022) | textbook | 2022 | https://www.wiley.com/
SRC: Kreyszig E, Advanced Engineering Mathematics (10th edn, Wiley 2011) | textbook | 2011 | https://www.wiley.com/
NUM1#maths-u10-14-q1@1: Using y = x^{3} − x, find y(0.5). | -0.375 | 0.0001 |  | 0.125 − 0.5 = −0.375.
M1#maths-u10-14-q2@1: How many solutions does y″ + y = 0, y(0) = 0, y(π) = 1 have? | None | One | Two | Infinitely many | Three | Every solution with y(0) = 0 is B sin x, which is 0 at π, never 1.
M2#maths-u10-14-q3@2: What is the smallest eigenvalue λ for y″ + λy = 0, y(0) = y(2) = 0? | π^{2}/4 | π^{2} | 2π | 4π^{2} | π/2 | The eigenvalues are λ = (nπ/L)^{2}; the smallest, n = 1 with L = 2, is π^{2}/4.

## Laplace Transforms
S: The Laplace transform turns a function of time into a function of a complex variable s, converting derivatives into multiplication by s. Differential equations become algebra, which is why engineers use it for circuits and control systems.
O: Calculate Laplace transforms from the definition and a table
O: Transform derivatives and use the shift theorems
T: Laplace transform | F(s) = L{f}(s) = ∫₀^∞ e^{−st} f(t) dt
T: Derivative rule | L{f′} = sF(s) − f(0); L{f″} = s^{2}F(s) − sf(0) − f′(0)
H: Standard transforms
- L{1} = 1/s; L{tⁿ} = n!/s^{n+1}; L{e^{at}} = 1/(s − a).
- L{sin ωt} = ω/(s^{2} + ω^{2}); L{cos ωt} = s/(s^{2} + ω^{2}).
- Linearity: L{af + bg} = aF + bG.
H: Rules
- First shift: L{e^{at}f(t)} = F(s − a).
- Second shift: L{H(t − c)f(t − c)} = e^{−cs}F(s), handling switched-on inputs.
- L{δ(t − c)} = e^{−cs}: impulses become exponentials.
- Convolution: L{f * g} = F(s)G(s).
H: Why it helps
- Initial conditions enter through the derivative rule automatically.
- Discontinuous and impulsive forcing (switches, hammer blows) is easy to handle.
- Transfer functions in control theory are Laplace transforms of system responses (School 25).
X: Find L{3e^{2t} + t^{2}} and L{e^{−t} sin 2t}.
> L{3e^{2t}} = 3/(s − 2); L{t^{2}} = 2/s^{3}
> So L{3e^{2t} + t^{2}} = 3/(s − 2) + 2/s^{3}
> First shift with a = −1: L{e^{−t} sin 2t} = 2/((s + 1)^{2} + 4)
K: F(s) = ∫e^{−st}f dt; learn the table; derivatives become sF − f(0); shifts handle exponentials and delays; convolution becomes multiplication.
!: Forgetting the initial-value terms in the transform of a derivative.
Q: What is L{e^{5t}}? | 1/(s − 5).
Q: What is L{f′} in terms of F? | sF(s) − f(0).
SUM: Laplace transforms make calculus algebraic.
SUM: Initial conditions come built in.
SRC: Kreyszig E, Advanced Engineering Mathematics (10th edn, Wiley 2011) | textbook | 2011 | https://www.wiley.com/
SRC: Schiff JL, The Laplace Transform: Theory and Applications (Springer 1999) | textbook | 1999 | https://link.springer.com/
NUM1#maths-u10-15-q1@1: Evaluate L{t^{3}} at s = 2. | 0.375 | 0.0001 |  | L{t^{3}} = 3!/s^{4} = 6/16 = 0.375.
M1#maths-u10-15-q2@1: What is L{cos 3t}? | s/(s^{2} + 9) | 3/(s^{2} + 9) | s/(s^{2} − 9) | 1/(s − 3) | 3s/(s^{2} + 9) | The table gives s/(s^{2} + ω^{2}) with ω = 3.
M2#maths-u10-15-q3@2: Why are Laplace transforms suited to circuits switched on at t = 2? | The second shift theorem turns delayed inputs into factors e^{−2s} | Laplace transforms ignore switches | Switching makes the circuit equations linear for the first time | The transform only works after t = 2 | Switches make the transform zero | H(t − 2)f(t − 2) transforms to e^{−2s}F(s), keeping the algebra simple.

## Inverse Laplace Transforms
S: The inverse Laplace transform recovers a time function from its transform. With partial fractions and a table, it completes the Laplace method for solving initial value problems in a few lines of algebra.
O: Find inverse Laplace transforms using partial fractions and tables
O: Solve initial value problems by the Laplace method
T: Inverse Laplace transform | L^{−1}{F} = f, the function whose transform is F
T: Partial fractions | Splitting a rational function into simpler terms with standard inverses
H: Method
- Write F(s) as partial fractions: A/(s − a), B/(s − a)^{2}, (Cs + D)/(s^{2} + ω^{2}), and so on.
- Complete the square for irreducible quadratics to use the shift theorem.
- Read off each inverse from the table.
H: Solving IVPs
- Transform the ODE using the derivative rule and initial values.
- Solve the algebraic equation for Y(s).
- Invert to get y(t).
H: Extra tools
- e^{−cs}F(s) inverts to H(t − c)f(t − c).
- F(s)G(s) inverts to the convolution (f * g)(t) = ∫₀^{t} f(τ)g(t − τ) dτ.
- The formal inverse is a complex contour integral (the Bromwich integral), rarely needed by hand.
X: Solve y′ + 2y = 4 with y(0) = 0 using Laplace transforms.
> Transform: sY − 0 + 2Y = 4/s, so Y = 4/(s(s + 2))
> Partial fractions: Y = 2/s − 2/(s + 2)
> Invert: y = 2 − 2e^{−2t}
- Repeated factors (s − a)^{2} in the denominator give terms like te^{at}.
K: Use partial fractions and the table; complete the square for quadratics; transform, solve for Y, invert; shifts and convolution extend the method.
!: Making sign errors in partial fractions; check by recombining.
Q: What is L^{−1}{1/(s + 3)}? | e^{−3t}.
Q: What is L^{−1}{e^{−2s}/s}? | H(t − 2), the unit step switched on at t = 2.
SUM: Inverting completes the Laplace method.
SUM: Partial fractions do most of the work.
SRC: Kreyszig E, Advanced Engineering Mathematics (10th edn, Wiley 2011) | textbook | 2011 | https://www.wiley.com/
SRC: Stroud KA, Booth DJ, Advanced Engineering Mathematics (6th edn, Bloomsbury 2020) | textbook | 2020 | https://www.bloomsbury.com/
NUM1#maths-u10-16-q1@1: Evaluate L^{−1}{5/(s^{2} + 25)} at t = π/10. | 1 | 0.0001 |  | The inverse is sin 5t, and sin(π/2) = 1.
M1#maths-u10-16-q2@1: What is L^{−1}{1/(s − 2)^{2}}? | te^{2t} | e^{2t} | t^{2}e^{2t} | 2e^{t} | e^{−2t} | L{t} = 1/s^{2}, and the first shift theorem replaces s by s − 2, multiplying by e^{2t}.
M3#maths-u10-16-q3@2: What is L^{−1}{(s + 1)/((s + 1)^{2} + 4)}? | e^{−t} cos 2t | e^{−t} sin 2t | cos 2t | e^{t} cos 2t | ½e^{−t} sin 2t | It's s/(s^{2} + 4) shifted by −1, so cos 2t times e^{−t}.

## Fourier Transform Methods
S: The Fourier transform turns derivatives in space into multiplication by frequency, so linear PDEs on infinite domains become ODEs that are easy to solve. It's the standard way to solve the heat equation on the whole real line.
O: Use the Fourier transform to turn PDEs into ODEs
O: Solve the heat equation on the real line and interpret the heat kernel
T: Fourier transform | f̂(ξ) = ∫ f(x)e^{−iξx} dx, with inverse f(x) = (1/2π)∫ f̂(ξ)e^{iξx} dξ
T: Heat kernel | Φ(x, t) = (1/√(4πkt)) e^{−x^{2}/(4kt)}, the solution starting from a point source
H: Key properties
- Derivatives: the transform of f′ is iξ f̂; of f″ is −ξ^{2} f̂.
- Convolution becomes multiplication.
- The Gaussian e^{−x^{2}/2} transforms to another Gaussian.
H: Solving the heat equation
- u_{t} = ku_{xx} on ℝ becomes û_{t} = −kξ^{2}û for each ξ.
- So û(ξ, t) = û(ξ, 0)e^{−kξ^{2}t}: high frequencies decay fastest (smoothing).
- Inverting gives u = Φ(·, t) * u(·, 0): the initial data spread out by a Gaussian of width √(2kt).
H: Other uses
- Wave and Schrödinger equations on infinite domains.
- Signal processing and imaging (School 23).
- The discrete Fourier transform and FFT for numerical PDE solvers (see Spectral Methods).
X: Explain why the heat equation smooths out a sharp initial temperature profile.
> Each Fourier mode e^{iξx} decays by the factor e^{−kξ^{2}t}
> Sharp features need high frequencies ξ, which decay fastest
> So corners round off immediately, and the solution is smooth for every t > 0
K: Fourier transforms turn ∂_{x} into iξ; the heat equation becomes û_{t} = −kξ^{2}û; the solution convolves the initial data with the heat kernel.
!: Mixing Fourier transform conventions (2π factors and signs) between formulas.
Q: What does the Fourier transform turn f″ into? | −ξ^{2} f̂.
Q: How wide does a point of heat spread after time t? | About √(2kt).
SUM: Fourier transforms diagonalise derivatives.
SUM: The heat kernel smooths.
SRC: Stein EM, Shakarchi R, Fourier Analysis: An Introduction (Princeton University Press 2003) | textbook | 2003 | https://press.princeton.edu/
SRC: Strauss WA, Partial Differential Equations: An Introduction (2nd edn, Wiley 2008) | textbook | 2008 | https://www.wiley.com/
NUM1#maths-u10-17-q1@1: Find the heat kernel's value at x = 0 when k = 1 and t = 1, to 4 decimal places. | 0.2821 | 0.0001 |  | 1/√(4π) ≈ 0.2821.
M1#maths-u10-17-q2@1: Under the Fourier transform, what does convolution become? | Multiplication | Addition | Differentiation | Integration | Division | The convolution theorem: the transform of f * g is f̂ ĝ.
M2#maths-u10-17-q3@2: In the transformed heat equation, why do high frequencies disappear first? | They decay like e^{−kξ^{2}t}, faster for larger ξ | They have more energy | They travel faster | They're reflected at boundaries | They don't disappear | The decay rate kξ^{2} grows with frequency.

## Green's Functions
S: A Green's function is the response of a linear system to a point source. Once you have it, the solution for any source is an integral of the Green's function against that source: superposition in its most powerful form.
O: Construct the Green's function for a simple boundary value problem
O: Use it to solve problems with arbitrary forcing
T: Green's function | G(x, s) satisfying LG = δ(x − s) and the boundary conditions
T: Superposition integral | u(x) = ∫ G(x, s) f(s) ds solves Lu = f
H: Construction for −u″ = f on [0, 1], u(0) = u(1) = 0
- For x ≠ s, G is linear in x and vanishes at the ends.
- G is continuous at x = s, and G′ jumps by −1 there (from the delta).
- Result: G(x, s) = x(1 − s) for x ≤ s and s(1 − x) for x ≥ s.
H: Properties
- Symmetric G(x, s) = G(s, x) for self-adjoint problems (reciprocity).
- The Green's function exists when the homogeneous problem has only the zero solution.
- In 3D, the Green's function for −∇^{2} in free space is 1/(4π|x − y|), the potential of a point charge.
H: Uses
- Electrostatics, acoustics, quantum scattering (propagators).
- Engineering: influence functions for beams.
- Numerical methods: boundary element methods use free-space Green's functions.
X: Use G(x, s) to solve −u″ = 1 on [0, 1] with u(0) = u(1) = 0.
> u(x) = ∫₀^{x} s(1 − x) ds + ∫ₓ¹ x(1 − s) ds
> = (1 − x)x^{2}/2 + x(1 − x)^{2}/2
> = x(1 − x)/2 (check: −u″ = 1 and u(0) = u(1) = 0 ✓)
K: G solves LG = δ with the boundary conditions; u = ∫Gf ds for any f; G is continuous with a derivative jump at the source; free-space G in 3D is 1/(4πr).
!: Forgetting that G must satisfy the same boundary conditions as u.
Q: What equation does a Green's function satisfy? | LG = δ(x − s), with the boundary conditions.
Q: What is the free-space Green's function of −∇^{2} in 3D? | 1/(4π|x − y|).
SUM: Green's functions are point-source responses.
SUM: Superposition builds every solution.
SRC: Stakgold I, Holst M, Green's Functions and Boundary Value Problems (3rd edn, Wiley 2011) | textbook | 2011 | https://www.wiley.com/
SRC: Duffy DG, Green's Functions with Applications (2nd edn, CRC Press 2015) | textbook | 2015 | https://www.routledge.com/
NUM1#maths-u10-18-q1@1: Using u(x) = x(1 − x)/2, find u(0.5). | 0.125 | 0.0001 |  | 0.5 × 0.5/2 = 0.125.
M1#maths-u10-18-q2@1: What does a Green's function represent physically? | The response to a unit point source | The total energy of the system | The boundary values only | The average of the solution | The eigenvalue of the operator | G is the field produced by a delta source at s.
M2#maths-u10-18-q3@2: When does a Green's function fail to exist for Lu = f with given boundary conditions? | When the homogeneous problem has a non-zero solution | When f is discontinuous | When the domain is bounded | Whenever the forcing f has a jump discontinuity in the domain | It always exists | A non-trivial homogeneous solution means L isn't invertible.

## Sturm–Liouville Theory
S: Sturm–Liouville problems are second-order eigenvalue problems whose eigenfunctions form orthogonal families: sines and cosines, Legendre polynomials, Bessel functions. They justify expanding solutions of PDEs in these functions.
O: Write equations in Sturm–Liouville form and identify the weight function
O: State the main properties of eigenvalues and eigenfunctions
T: Sturm–Liouville equation | (p(x)y′)′ + q(x)y + λw(x)y = 0, with suitable boundary conditions
T: Weight function | w(x) > 0, defining the inner product ⟨f, g⟩ = ∫ fgw dx
H: The theory
- Eigenvalues are real and can be ordered λ₁ < λ₂ < … → ∞.
- Eigenfunctions for different eigenvalues are orthogonal with weight w.
- They form a complete set: functions can be expanded as Σ c_{n}y_{n}.
- The nth eigenfunction has n − 1 zeros inside the interval.
H: Examples
- y″ + λy = 0, y(0) = y(L) = 0: sines, the Fourier sine series.
- Legendre's equation: polynomials P_{n} on [−1, 1], used in spherical problems.
- Bessel's equation: Bessel functions for vibrating drums and cylinders.
H: Uses
- Separation of variables in PDEs produces Sturm–Liouville problems.
- Quantum mechanics: energy levels in one dimension.
- Vibrations: normal modes of strings, beams and membranes.
X: Find the eigenvalues and eigenfunctions of y″ + λy = 0 with y(0) = 0 and y′(L) = 0.
> y(0) = 0 gives y = B sin(√λ x)
> y′(L) = B√λ cos(√λ L) = 0 requires √λ L = (2n − 1)π/2
> λ_{n} = ((2n − 1)π/(2L))^{2}, with eigenfunctions sin((2n − 1)πx/(2L))
K: Write (py′)′ + qy + λwy = 0; eigenvalues are real and increase to infinity; eigenfunctions are orthogonal with weight w and complete.
!: Using the wrong weight function in orthogonality integrals.
Q: Are Sturm–Liouville eigenvalues real? | Yes.
Q: Which special functions solve Bessel's equation? | Bessel functions.
SUM: Sturm–Liouville problems give orthogonal families.
SUM: They justify series solutions of PDEs.
SRC: Zettl A, Sturm–Liouville Theory (American Mathematical Society 2005) | textbook | 2005 | https://bookstore.ams.org/
SRC: Haberman R, Applied Partial Differential Equations (5th edn, Pearson 2013) | textbook | 2013 | https://www.pearson.com/
NUM1#maths-u10-19-q1@1: For L = 1, find the smallest eigenvalue λ₁ = (π/2)^{2}, to 4 decimal places. | 2.4674 | 0.0001 |  | (π/2)^{2} ≈ 2.4674.
M1#maths-u10-19-q2@1: How many zeros inside the interval does the third eigenfunction have? | 2 | 3 | 1 | 0 | 4 | The nth eigenfunction has n − 1 interior zeros.
M2#maths-u10-19-q3@2: Why can solutions of the heat equation be written as sine series? | The spatial problem is Sturm–Liouville, so its sine eigenfunctions are complete and orthogonal | Sines are the only functions | The heat equation is linear in time only | Sine series converge for every function pointwise | Temperature is always shaped like a sine wave, whatever the start | Separation gives y″ + λy = 0 with boundary conditions, a Sturm–Liouville problem.

## Partial Differential Equations (PDEs)
S: Partial differential equations involve functions of several variables and their partial derivatives. They describe heat, waves, fluids, electromagnetism and quantum mechanics, and they fall into three main types with very different behaviour.
O: Classify second-order linear PDEs as elliptic, parabolic or hyperbolic
O: Explain well-posedness and separation of variables
T: Classification | For Au_{xx} + Bu_{xy} + Cu_{yy} + … = 0: elliptic if B^{2} − 4AC < 0, parabolic if = 0, hyperbolic if > 0
T: Well-posed problem | One with a solution that exists, is unique and depends continuously on the data (Hadamard)
H: The three types
- Elliptic (Laplace, Poisson): equilibrium, smooth solutions, boundary data everywhere.
- Parabolic (heat): diffusion, smoothing, initial plus boundary data.
- Hyperbolic (wave): propagation at finite speed, sharp features persist.
H: Methods
- Separation of variables: u = X(x)T(t) gives ODEs and series solutions.
- Transforms (Fourier, Laplace), characteristics for first-order and hyperbolic equations.
- Green's functions and numerical methods (finite differences, elements, volumes, spectral).
H: Well-posedness
- Getting the right number and type of conditions matters: the heat equation backwards in time is ill-posed.
- Nonlinear PDEs (Navier–Stokes, Einstein's equations) raise deep open questions.
X: Classify u_{xx} + 4u_{xy} + 3u_{yy} = 0.
> A = 1, B = 4, C = 3
> B^{2} − 4AC = 16 − 12 = 4 > 0
> The equation is hyperbolic, like the wave equation
K: Classify by B^{2} − 4AC; elliptic, parabolic and hyperbolic equations need different data and behave differently; well-posedness requires existence, uniqueness and stability.
!: Giving initial conditions only for an elliptic problem, which needs boundary data all round.
Q: What type is the heat equation? | Parabolic.
Q: Name Hadamard's three conditions for well-posedness. | Existence, uniqueness and continuous dependence on data.
SUM: PDEs have three main types.
SUM: Each needs its own data and methods.
SRC: Evans LC, Partial Differential Equations (2nd edn, American Mathematical Society 2010) | textbook | 2010 | https://bookstore.ams.org/
SRC: Strauss WA, Partial Differential Equations: An Introduction (2nd edn, Wiley 2008) | textbook | 2008 | https://www.wiley.com/
NUM1#maths-u10-20-q1@1: Find B^{2} − 4AC for u_{xx} + 2u_{xy} + u_{yy} = 0. | 0 | 0 |  | 4 − 4 = 0, so the equation is parabolic.
M1#maths-u10-20-q2@1: Which PDE is elliptic? | u_{xx} + u_{yy} = 0 | u_{t} = u_{xx} | u_{tt} = u_{xx} | u_{t} + u_{x} = 0 | u_{xx} − u_{yy} = 0 | Laplace's equation has B^{2} − 4AC = −4 < 0.
M2#maths-u10-20-q3@2: Why is the backward heat equation ill-posed? | Tiny changes in data cause huge changes in the solution, breaking continuous dependence | It has no solutions ever | Running time backwards turns it into an elliptic equation | It needs no boundary conditions | It's well-posed | Running diffusion backwards amplifies high frequencies by e^{+kξ^{2}t}.

## Heat Equation
S: The heat equation u_{t} = ku_{xx} describes how temperature spreads through a material, and more generally any diffusion process. Its solutions smooth out over time and approach a steady state.
O: Solve the heat equation on a finite rod by separation of variables
O: Describe the smoothing and maximum principle properties
T: Heat equation | u_{t} = k∇^{2}u, with diffusivity k > 0
T: Separation of variables | Seeking solutions u = X(x)T(t) and superposing them
H: Separation on a rod
- Rod 0 ≤ x ≤ L with ends held at 0: X″ + λX = 0, X(0) = X(L) = 0 gives sin(nπx/L).
- T′ = −kλT gives e^{−k(nπ/L)^{2}t}.
- u = Σ b_{n}e^{−k(nπ/L)^{2}t} sin(nπx/L), with b_{n} the sine coefficients of the initial profile.
H: Properties
- Higher modes decay faster: solutions become smooth and dominated by the first mode.
- Maximum principle: the maximum is reached initially or on the boundary.
- Heat spreads with infinite speed (in the model): any change is felt everywhere at once, though tiny far away.
H: Other boundary conditions
- Insulated ends (u_{x} = 0): cosine series, approaching the average temperature.
- Non-zero fixed ends: subtract the linear steady state first.
X: Solve u_{t} = u_{xx} on 0 ≤ x ≤ π with u = 0 at both ends and u(x, 0) = 3 sin x + sin 2x.
> Each sine mode evolves independently: sin nx decays like e^{−n^{2}t}
> u = 3e^{−t} sin x + e^{−4t} sin 2x
> The sin 2x part dies out four times faster
K: Separate variables to get sine modes decaying like e^{−k(nπ/L)^{2}t}; solutions smooth out; the maximum principle holds.
!: Forgetting to square n in the exponential decay rate.
Q: Which mode decays slowest in the heat equation on a rod? | The first (n = 1).
Q: What does the maximum principle say for the heat equation? | The maximum occurs initially or on the boundary.
SUM: Heat diffuses and smooths.
SUM: Modes decay at rates n^{2}.
SRC: Haberman R, Applied Partial Differential Equations (5th edn, Pearson 2013) | textbook | 2013 | https://www.pearson.com/
SRC: Fourier J, Théorie analytique de la chaleur (Firmin Didot 1822) | textbook | 1822 | https://archive.org/
NUM1#maths-u10-21-q1@1: With u = 3e^{−t} sin x + e^{−4t} sin 2x, find u(π/2, 1) to 4 decimal places. | 1.1036 | 0.0001 |  | sin 2x = 0 at π/2, so u = 3e^{−1} ≈ 1.1036.
M1#maths-u10-21-q2@1: What is the long-term temperature of a rod with both ends held at 0? | 0 everywhere | The initial average | The initial maximum | It oscillates forever | It grows without limit | Each sine mode decays exponentially, so with ends held at 0 the whole rod tends to 0.
M3#maths-u10-21-q3@2: A rod has insulated ends. What does its temperature approach? | The average of the initial temperature | Zero everywhere | The initial maximum | A linear profile | It never settles | With u_{x} = 0 at the ends, the constant (n = 0) cosine mode survives: the mean.

## Wave Equation
S: The wave equation u_{tt} = c^{2}u_{xx} describes vibrating strings, sound, light and water waves. Unlike heat, waves travel at a finite speed and keep their shape, and on a finite string they form standing waves with musical harmonics.
O: Use d'Alembert's formula and standing wave solutions
O: Relate string modes to musical frequencies
T: Wave equation | u_{tt} = c^{2}u_{xx}, with wave speed c
T: d'Alembert's solution | u = F(x − ct) + G(x + ct): right- and left-moving waves
H: Infinite string
- Any shape F(x − ct) moves right at speed c; G(x + ct) moves left.
- With initial displacement f and zero velocity: u = ½[f(x − ct) + f(x + ct)].
- Information travels at speed c: a domain of dependence.
H: Finite string
- Fixed ends at 0 and L: modes sin(nπx/L) cos(nπct/L) (and sin).
- Frequencies f_{n} = nc/(2L): the fundamental and its harmonics.
- c = √(T/μ) for a string with tension T and mass per length μ: tighter strings sound higher.
H: Energy and beyond
- Energy (kinetic plus potential) is conserved; nothing smooths out.
- In 2D and 3D: drums (Bessel functions), sound, electromagnetic waves.
- Damping adds a u_{t} term; dispersion makes speed depend on frequency.
X: A guitar string 0.65 m long has wave speed 286 m/s. Find its fundamental frequency.
> f₁ = c/(2L)
> = 286/(2 × 0.65) = 286/1.3
> = 220 Hz (the note A₃)
K: u = F(x − ct) + G(x + ct); finite strings vibrate in modes with frequencies nc/(2L); c = √(T/μ); waves keep their shape and conserve energy.
!: Using c/L instead of c/(2L) for the fundamental frequency.
Q: What is the second harmonic of a 220 Hz string? | 440 Hz.
Q: What happens to pitch if string tension is quadrupled? | It doubles (c ∝ √T).
SUM: Waves travel at finite speed.
SUM: Strings vibrate in harmonic modes.
SRC: Strauss WA, Partial Differential Equations: An Introduction (2nd edn, Wiley 2008) | textbook | 2008 | https://www.wiley.com/
SRC: Haberman R, Applied Partial Differential Equations (5th edn, Pearson 2013) | textbook | 2013 | https://www.pearson.com/
NUM1#maths-u10-22-q1@1: Find the fundamental frequency, in Hz, of a 0.5 m string with wave speed 330 m/s. | 330 | 0 | Hz | c/(2L) = 330/1 = 330 Hz.
M1#maths-u10-22-q2@1: Which function solves u_{tt} = 4u_{xx}? | sin(x − 2t) | sin(x − 4t) | e^{−4t} sin x | sin x + t | sin(2x − t) | Waves move at speed c = 2, so any F(x − 2t) works.
M2#maths-u10-22-q3@2: How does wave behaviour differ from heat diffusion? | Waves travel at finite speed and keep sharp features | Waves smooth out faster | Both have infinite speed | Heat oscillates and waves don't | They behave the same | Hyperbolic equations propagate shapes; parabolic ones diffuse them.

## Laplace Equation
S: Laplace's equation ∇^{2}u = 0 describes steady states: equilibrium temperature, electrostatic potential in empty space, ideal fluid flow. Its solutions (harmonic functions) are as smooth as possible and determined by their boundary values.
O: Solve Laplace's equation in a rectangle by separation of variables
O: Use the mean value property and maximum principle
T: Laplace's equation | ∇^{2}u = 0
T: Dirichlet problem | Find u with ∇^{2}u = 0 inside a region and given values on its boundary
H: Properties
- Mean value property: u at a point is the average over any surrounding circle or sphere.
- Maximum principle: extremes occur on the boundary.
- Uniqueness of the Dirichlet problem follows.
- Harmonic functions are infinitely differentiable.
H: Solving
- Rectangles: separate u = X(x)Y(y), giving sines in one direction and sinh/cosh in the other.
- Discs: polar separation gives rⁿ cos nθ and rⁿ sin nθ; the Poisson integral formula gives the solution directly.
- 2D harmonic functions are real parts of holomorphic functions (School 9).
H: Applications
- Steady temperature in plates.
- Electrostatic potential in charge-free regions.
- Potential flow around wings (with complex analysis).
X: Solve ∇^{2}u = 0 on the unit square with u = sin πx on the top edge y = 1 and u = 0 on the other edges.
> Separate: X = sin πx, so Y″ = π^{2}Y with Y(0) = 0: Y = sinh πy
> u = sin(πx) sinh(πy)/sinh π
> At the centre: sinh(π/2)/sinh π ≈ 2.301/11.549 ≈ 0.199
K: Laplace's equation describes steady states; harmonic functions satisfy the mean value and maximum principles; separate variables in rectangles and discs.
!: Choosing exponentials in both directions; one direction must oscillate to fit zero boundary values.
Q: Where does a harmonic function attain its maximum on a closed bounded region? | On the boundary.
Q: Which type of PDE is Laplace's equation? | Elliptic.
SUM: Laplace's equation describes equilibrium.
SUM: Boundary values determine the solution.
SRC: Evans LC, Partial Differential Equations (2nd edn, American Mathematical Society 2010) | textbook | 2010 | https://bookstore.ams.org/
SRC: Farlow SJ, Partial Differential Equations for Scientists and Engineers (Dover 1993) | textbook | 1993 | https://store.doverpublications.com/
NUM1#maths-u10-23-q1@1: Find u at the centre of the square, sinh(π/2)/sinh π, to 3 decimal places. | 0.199 | 0.001 |  | sinh(π/2) ≈ 2.3013 and sinh π ≈ 11.5487, ratio ≈ 0.199.
M1#maths-u10-23-q2@1: A harmonic function on a disc has boundary values averaging 20. What is its value at the centre? | 20 | 0 | 40 | 10 | It can't be determined | The mean value property: the centre equals the average over the boundary circle.
M2#maths-u10-23-q3@2: Why is the solution of the Dirichlet problem for Laplace's equation unique? | The difference of two solutions is harmonic with zero boundary values, so it's zero | Laplace's equation is nonlinear | Boundaries are always circles | It isn't unique | Harmonic functions are constant | By the maximum principle, a harmonic function zero on the boundary is zero inside.

## Poisson Equation
S: Poisson's equation ∇^{2}u = f adds a source term to Laplace's equation. It gives the electric potential of charges, the gravitational potential of masses and the steady temperature with internal heating.
O: Solve simple Poisson problems
O: Connect Poisson's equation to gravity and electrostatics
T: Poisson's equation | ∇^{2}u = f, with f a source density
T: Particular solution | Any one solution of ∇^{2}u = f; add a harmonic function to fit boundary conditions
H: Physics
- Electrostatics: ∇^{2}φ = −ρ/ε₀ (Gauss's law with E = −∇φ).
- Gravity: ∇^{2}Φ = 4πGρ.
- Steady heat with sources: −k∇^{2}T = heat generated per unit volume.
H: Solving
- Find a particular solution (by inspection, polynomials or Green's functions), then add a harmonic function to meet the boundary conditions.
- Example: u = (x^{2} + y^{2})/4 satisfies ∇^{2}u = 1 in 2D.
- Free space in 3D: u(x) = −∫ f(y)/(4π|x − y|) dy.
H: Uniqueness and numerics
- With Dirichlet boundary conditions, solutions are unique.
- With Neumann conditions, they're unique up to a constant, and the data must be compatible (∫f = ∮ ∂u/∂n).
- Finite differences and multigrid methods solve large Poisson problems fast.
X: Solve ∇^{2}u = 1 in the unit disc with u = 0 on the boundary.
> Particular solution: u_{p} = r^{2}/4 (since ∇^{2}(x^{2} + y^{2}) = 4)
> On r = 1, u_{p} = ¼, so subtract the constant ¼ (which is harmonic)
> u = (r^{2} − 1)/4
K: Poisson = Laplace plus sources; find a particular solution and add a harmonic function; it governs gravity, electrostatics and heated bodies.
!: Forgetting that Neumann problems need the compatibility condition between source and boundary flux.
Q: What is ∇^{2}(x^{2} + y^{2})? | 4.
Q: What is Poisson's equation for gravity? | ∇^{2}Φ = 4πGρ.
SUM: Poisson's equation adds sources.
SUM: Particular plus harmonic fits the boundary.
SRC: Evans LC, Partial Differential Equations (2nd edn, American Mathematical Society 2010) | textbook | 2010 | https://bookstore.ams.org/
SRC: Griffiths DJ, Introduction to Electrodynamics (5th edn, Cambridge University Press 2023) | textbook | 2023 | https://www.cambridge.org/
NUM1#maths-u10-24-q1@1: Using u = (r^{2} − 1)/4, find u at the centre of the disc. | -0.25 | 0.0001 |  | r = 0 gives −¼.
M1#maths-u10-24-q2@1: Which source makes ∇^{2}φ = −ρ/ε₀ the right model? | A charge density ρ | A mass density in gravity | A heat flux | A fluid velocity | A magnetic field | It's Gauss's law for electrostatics in potential form.
M2#maths-u10-24-q3@2: Why must ∫f equal the boundary flux for the Neumann problem ∇^{2}u = f? | The divergence theorem gives ∫∇^{2}u = ∮ ∂u/∂n | Neumann problems have no solutions | f must be zero | The boundary must be circular | It isn't required | Integrating the equation over the region turns the left side into the boundary flux.

## Diffusion Equations
S: Diffusion equations describe how substances spread from high to low concentration: perfume in a room, oxygen in tissue, pollutants in groundwater. They link microscopic random motion to smooth, predictable spreading.
O: Derive the diffusion equation from Fick's law and conservation
O: Use the diffusion length and time scales
T: Fick's law | Flux J = −D∇c: substances move down concentration gradients
T: Diffusion coefficient | D, in m^{2}/s; spreading distance grows like √(Dt)
H: The equation
- Conservation ∂c/∂t + ∇ · J = 0 plus Fick's law gives ∂c/∂t = D∇^{2}c.
- Mathematically it's the heat equation, with concentration in place of temperature.
- Variable D or added flows give more general forms.
H: Random walks
- Particles taking random steps spread with mean squared displacement 2Dt in each dimension (Einstein, 1905).
- So the distance spread grows like √t, not t: diffusion is fast over short distances, slow over long ones.
- Small molecules in water have D around 10^{−9} m^{2}/s: crossing 1 mm takes minutes, 1 cm takes hours.
H: Applications
- Drug release, cell biology (why cells are small), semiconductor doping, groundwater contamination.
- Combined with flow: advection–diffusion equations.
- Combined with reactions: reaction–diffusion equations (next lesson).
X: Estimate how long a small molecule (D = 10^{−9} m^{2}/s) takes to diffuse 1 mm, using L^{2} ≈ 2Dt.
> t ≈ L^{2}/(2D)
> = (10^{−3})^{2}/(2 × 10^{−9}) = 10^{−6}/(2 × 10^{−9})
> = 500 s, about 8 minutes (and 100 times longer, about 14 hours, for 1 cm)
K: ∂c/∂t = D∇^{2}c from Fick and conservation; spreading distance ~ √(2Dt); diffusion is quick over micrometres, slow over centimetres.
!: Assuming diffusion distance grows linearly with time.
Q: By what factor does diffusion time increase if distance is multiplied by 10? | 100.
Q: What is Fick's first law? | J = −D∇c.
SUM: Diffusion spreads down gradients.
SUM: Distance grows like √t.
SRC: Crank J, The Mathematics of Diffusion (2nd edn, Oxford University Press 1975) | textbook | 1975 | https://global.oup.com/
SRC: Berg HC, Random Walks in Biology (expanded edn, Princeton University Press 1993) | textbook | 1993 | https://press.princeton.edu/
NUM1#maths-u10-25-q1@1: With D = 10^{−9} m^{2}/s, find the root-mean-square 1D displacement √(2Dt) after 100 s, in millimetres to 3 decimal places. | 0.447 | 0.001 | mm | √(2 × 10^{−9} × 100) = √(2 × 10^{−7}) ≈ 4.47 × 10^{−4} m = 0.447 mm.
M1#maths-u10-25-q2@1: Which equation describes diffusion? | ∂c/∂t = D∇^{2}c | ∂^{2}c/∂t^{2} = D∇^{2}c | ∇^{2}c = 0 | ∂c/∂t + D∂c/∂x = 0 | ∂c/∂t = Dc | Fick's law plus conservation gives the diffusion (heat) equation.
M2#maths-u10-25-q3@2: Why do large animals need circulatory systems rather than diffusion alone? | Diffusion time grows with distance squared, far too slow over centimetres | Diffusion stops in large bodies | Oxygen molecules are too large to move by random motion | Large animals have no gradients | They don't need them | Diffusing across centimetres would take hours.

## Reaction-Diffusion Equations
S: Reaction–diffusion equations combine local reactions (growth, decay, chemistry) with diffusion. They produce travelling waves, such as the spread of an advantageous gene or an invading species, and Turing's stripes and spots.
O: Describe the Fisher–KPP equation and its travelling wave speed
O: Explain how Turing patterns arise
T: Reaction–diffusion equation | u_{t} = D∇^{2}u + f(u), combining spread and local kinetics
T: Turing instability | Diffusion destabilising a uniform steady state, creating spatial patterns
H: Fisher–KPP
- u_{t} = Du_{xx} + ru(1 − u): logistic growth plus spread.
- Travelling waves u(x − ct) connect u = 1 (occupied) to u = 0 (empty).
- The minimum (and typically observed) wave speed is c = 2√(rD).
- Models spread of genes (Fisher, 1937), invasions and epidemics.
H: Turing patterns
- Two chemicals diffusing at different rates (a short-range activator and a long-range inhibitor).
- A uniform state stable without diffusion becomes unstable with it.
- Patterns: animal coat spots and stripes, digit formation, vegetation bands.
- Turing proposed the mechanism in 1952.
H: Other examples
- Nerve impulses (FitzHugh–Nagumo), flame fronts, chemical waves (Belousov–Zhabotinsky).
- Epidemic spread in space.
X: A species spreads with r = 0.5 per year and D = 2 km^{2}/year. Estimate its invasion speed.
> c = 2√(rD)
> = 2√(0.5 × 2) = 2√1
> = 2 km per year
K: Reaction–diffusion = local kinetics + diffusion; Fisher–KPP waves move at 2√(rD); Turing instabilities create patterns.
!: Expecting diffusion always to make things more uniform; with reactions it can create patterns.
Q: What is the Fisher–KPP wave speed? | 2√(rD).
Q: Who proposed diffusion-driven pattern formation? | Alan Turing (1952).
SUM: Reactions plus diffusion make waves and patterns.
SUM: Speed scales with √(rD).
SRC: Murray JD, Mathematical Biology II: Spatial Models and Biomedical Applications (3rd edn, Springer 2003) | textbook | 2003 | https://link.springer.com/
SRC: Turing AM, The chemical basis of morphogenesis, Philosophical Transactions of the Royal Society B 237(641), 37 | journal | 1952 | https://doi.org/10.1098/rstb.1952.0012
NUM1#maths-u10-26-q1@1: An invasion has r = 2 per year and D = 0.5 km^{2}/year. Find the Fisher–KPP speed in km per year. | 2 | 0 | km/yr | 2√(2 × 0.5) = 2.
M1#maths-u10-26-q2@1: Which term in u_{t} = Du_{xx} + ru(1 − u) represents local growth? | ru(1 − u) | Du_{xx} | u_{t} | D | u(1 − u) only when r = 0 | The logistic reaction term models local population growth.
M3#maths-u10-26-q3@2: How does Turing's mechanism create patterns? | An inhibitor diffusing faster than an activator destabilises the uniform state at certain wavelengths | Diffusion always smooths patterns away | Random initial noise is frozen in place, with diffusion playing no part | Equal diffusion rates are required | Patterns come from initial conditions only | Short-range activation and long-range inhibition select a characteristic spacing.

## Transport Equations
S: Transport equations describe how a quantity is carried and conserved as it moves: traffic along a road, pollutants in a river, particles in a reactor. They come from conservation laws, rate of change plus flux out equals zero.
O: Write conservation laws in differential form
O: Analyse a traffic flow model and its maximum flow
T: Conservation law | u_{t} + (q(u))_{x} = 0, with q the flux
T: Shock | A discontinuity that forms when faster information overtakes slower information
H: Conservation
- Amount in [a, b] changes only through flux at the ends: d/dt ∫u dx = q(a) − q(b).
- Shrinking the interval gives u_{t} + q_{x} = 0.
- With sources: u_{t} + q_{x} = s.
H: Traffic flow (Lighthill–Whitham–Richards)
- Density ρ, speed v(ρ) = v_{max}(1 − ρ/ρ_{max}), flux q = ρv.
- Flux is greatest at ρ = ρ_{max}/2: q_{max} = v_{max}ρ_{max}/4.
- Characteristics carry density at speed q′(ρ); when they cross, shocks (traffic jams) form.
H: Other transport
- Boltzmann's equation for gas particles; neutron transport in reactors.
- Advection (next lesson) is the simplest linear case.
- Numerical schemes must conserve the quantity (finite volume methods).
X: A road has v_{max} = 100 km/h and jam density ρ_{max} = 200 cars/km. Find the maximum flow.
> q(ρ) = 100ρ(1 − ρ/200), maximised at ρ = 100 cars/km
> q_{max} = 100 × 100 × ½
> = 5,000 cars per hour
K: Conservation gives u_{t} + q_{x} = 0; traffic flux is maximised at half the jam density; crossing characteristics form shocks.
!: Thinking traffic flows best when the road is nearly empty: flow (cars per hour) peaks at moderate density.
Q: At what density is LWR traffic flow greatest? | Half the jam density.
Q: What is a shock in a conservation law? | A moving discontinuity where characteristics collide.
SUM: Transport equations express conservation.
SUM: Nonlinear flux creates shocks.
SRC: Lighthill MJ, Whitham GB, On kinematic waves II: a theory of traffic flow on long crowded roads, Proceedings of the Royal Society A 229(1178), 317 | journal | 1955 | https://doi.org/10.1098/rspa.1955.0089
SRC: LeVeque RJ, Finite Volume Methods for Hyperbolic Problems (Cambridge University Press 2002) | textbook | 2002 | https://www.cambridge.org/
NUM1#maths-u10-27-q1@1: With v_{max} = 80 km/h and ρ_{max} = 150 cars/km, find the maximum flow in cars per hour. | 3000 | 0 | cars/h | v_{max}ρ_{max}/4 = 80 × 150/4 = 3,000.
M1#maths-u10-27-q2@1: What does the conservation law u_{t} + q_{x} = 0 say? | Changes in a region come only from flux through its ends | The quantity is constant everywhere | The flux is zero | The quantity diffuses | Nothing moves | Integrating over [a, b] gives d/dt ∫u = q(a) − q(b).
M2#maths-u10-27-q3@2: Why do traffic jams form as shocks in the LWR model? | Information from lighter traffic upstream catches up with denser traffic ahead | Drivers brake randomly | The model includes diffusion | Speed increases with density | They don't form | Characteristics move at q′(ρ), which decreases with density, so they converge.

## Advection Equations
S: The advection equation u_{t} + cu_{x} = 0 moves a profile along at constant speed c without changing its shape. It's the simplest transport model, and its numerical solution reveals key ideas such as upwinding and the CFL stability condition.
O: Solve the advection equation by characteristics
O: Apply the CFL condition to numerical schemes
T: Characteristics | Lines x − ct = constant along which u is constant
T: CFL condition | For explicit schemes, |c|Δt/Δx ≤ 1: information mustn't travel more than one cell per time step
H: Exact solution
- u(x, t) = f(x − ct): the initial profile f shifted right by ct.
- Along each characteristic x = x₀ + ct, u stays at f(x₀).
- Variable speed c(x, t) curves the characteristics.
H: Numerical schemes
- Upwind: use the neighbour the flow comes from (for c > 0, the left neighbour).
- Central differences with forward Euler are unstable for pure advection.
- The CFL condition (Courant, Friedrichs and Lewy, 1928) limits the time step.
- Upwind schemes add numerical diffusion, smearing sharp profiles.
H: Applications
- Pollutants carried by a river; weather variables carried by wind.
- Advection–diffusion: u_{t} + cu_{x} = Du_{xx}, with the Péclet number Pe = cL/D comparing the two.
X: A profile u(x, 0) = e^{−x^{2}} is advected with c = 3. Where is the peak at t = 2?
> u(x, t) = e^{−(x − 3t)^{2}}
> At t = 2: u = e^{−(x − 6)^{2}}
> The peak has moved from x = 0 to x = 6, unchanged in shape
K: u = f(x − ct) moves profiles unchanged along characteristics; numerically use upwind schemes and respect |c|Δt/Δx ≤ 1.
!: Using a time step that violates the CFL condition, giving exploding numerical solutions.
Q: What is the solution of u_{t} + 2u_{x} = 0 with u(x, 0) = sin x? | u = sin(x − 2t).
Q: What does the CFL condition limit? | The time step relative to the grid spacing and wave speed.
SUM: Advection shifts profiles.
SUM: Numerics must respect the CFL limit.
SRC: LeVeque RJ, Finite Volume Methods for Hyperbolic Problems (Cambridge University Press 2002) | textbook | 2002 | https://www.cambridge.org/
SRC: Courant R, Friedrichs K, Lewy H, Über die partiellen Differenzengleichungen der mathematischen Physik, Mathematische Annalen 100, 32 | journal | 1928 | https://doi.org/10.1007/BF01448839
NUM1#maths-u10-28-q1@1: With c = 2 and Δx = 0.1, what is the largest time step allowed by the CFL condition? | 0.05 | 0.0001 |  | Δt ≤ Δx/|c| = 0.1/2 = 0.05.
M1#maths-u10-28-q2@1: In which direction does u_{t} − 4u_{x} = 0 move profiles? | Left, at speed 4 | Right, at speed 4 | Left, at speed ¼ | It doesn't move them | Right, at speed ¼ | The equation is u_{t} + cu_{x} = 0 with c = −4.
M2#maths-u10-28-q3@2: Why does an upwind scheme smear a sharp step over time? | Its truncation error acts like an added diffusion term | It moves the step too fast | It violates the CFL condition | Exact solutions also smear | It doesn't smear | First-order upwinding introduces numerical diffusion proportional to Δx.

## Fluid Dynamics Equations
S: The equations of fluid dynamics express conservation of mass, momentum and energy for liquids and gases. Even their simplest consequences, such as Bernoulli's principle and the Reynolds number, explain lift, pipe flow and the onset of turbulence.
O: Apply the continuity equation and Bernoulli's principle
O: Calculate and interpret the Reynolds number
T: Continuity equation | ∂ρ/∂t + ∇ · (ρv) = 0; for incompressible flow, ∇ · v = 0
T: Reynolds number | Re = ρvL/μ, the ratio of inertial to viscous forces
H: Basic equations
- Mass: continuity; incompressible flow through a pipe has A₁v₁ = A₂v₂.
- Momentum: Euler's equations (no viscosity) or Navier–Stokes (with viscosity).
- Energy equation for compressible or heated flows.
H: Bernoulli's principle
- Along a streamline in steady, inviscid, incompressible flow: p + ½ρv^{2} + ρgh = constant.
- Faster flow means lower pressure (venturi meters, aspects of lift).
- Torricelli: water leaves a hole at depth h with speed √(2gh).
H: Reynolds number
- Low Re: smooth laminar flow (honey, bacteria swimming).
- High Re: turbulence; pipe flow typically becomes turbulent above about 2,300.
- Similar Re means similar flow: the basis of wind-tunnel scale models.
X: Water (ρ = 1,000 kg/m^{3}, μ = 0.001 Pa s) flows at 0.5 m/s in a pipe of diameter 0.02 m. Find Re.
> Re = ρvD/μ = 1,000 × 0.5 × 0.02/0.001
> = 10,000
> Well above 2,300, so the flow is turbulent
K: Continuity conserves mass (A₁v₁ = A₂v₂); Bernoulli links pressure, speed and height; Re = ρvL/μ predicts laminar or turbulent flow.
!: Applying Bernoulli's equation across regions with strong viscous losses or between different streamlines in rotational flow.
Q: Water flows from a 4 cm^{2} pipe at 2 m/s into a 1 cm^{2} pipe. What is its new speed? | 8 m/s.
Q: Is flow with Re = 100 laminar or turbulent? | Laminar.
SUM: Fluid equations conserve mass and momentum.
SUM: Re decides laminar or turbulent.
SRC: Acheson DJ, Elementary Fluid Dynamics (Oxford University Press 1990) | textbook | 1990 | https://global.oup.com/
SRC: Reynolds O, An experimental investigation of the circumstances which determine whether the motion of water shall be direct or sinuous, Philosophical Transactions of the Royal Society 174, 935 | journal | 1883 | https://doi.org/10.1098/rstl.1883.0029
NUM1#maths-u10-29-q1@1: Water leaves a hole 5 m below the surface of a tank. Using v = √(2gh) with g = 9.8, find v to 2 decimal places. | 9.9 | 0.01 | m/s | √(2 × 9.8 × 5) = √98 ≈ 9.90 m/s.
M1#maths-u10-29-q2@1: By continuity, what happens to the speed of incompressible flow where a pipe narrows? | It increases | It decreases | It stays the same | It becomes zero | It reverses | A₁v₁ = A₂v₂, so smaller area means higher speed.
M2#maths-u10-29-q3@2: Why can a small wind-tunnel model predict the flow round a full-size aircraft? | Matching the Reynolds number (and Mach number) makes the flows dynamically similar | Air behaves the same at any size | Models are always accurate | Viscosity is irrelevant | It can't | Dimensionless numbers determine the flow pattern, so equal values give similar flows.

## Navier–Stokes Equations
S: The Navier–Stokes equations describe the motion of viscous fluids: water, air, blood. They're used in every weather forecast and aircraft design, yet whether smooth solutions always exist in three dimensions is one of the Millennium Prize problems.
O: Interpret the terms of the incompressible Navier–Stokes equations
O: Use the Poiseuille flow solution
T: Navier–Stokes equations | ρ(∂v/∂t + (v · ∇)v) = −∇p + μ∇^{2}v + f, with ∇ · v = 0 for incompressible flow
T: Poiseuille flow | Steady pipe flow with parabolic profile u = (G/4μ)(R^{2} − r^{2}), where G is the pressure gradient
H: The terms
- ∂v/∂t + (v · ∇)v: acceleration following a fluid particle; the second term is nonlinear.
- −∇p: pressure pushes fluid from high to low pressure.
- μ∇^{2}v: viscous friction smooths velocity differences.
- f: body forces such as gravity.
H: Exact solutions
- Few exist: Couette flow (between sliding plates) and Poiseuille flow (pipes).
- Poiseuille: flow rate Q = πGR^{4}/(8μ); halving the radius cuts flow sixteen-fold (important for blood vessels).
- Stokes flow (very low Re): the nonlinear term is dropped.
H: Computation and open problems
- Computational fluid dynamics solves them numerically for weather, cars, aircraft and medicine.
- Turbulence remains hard: models such as RANS and LES approximate it.
- Clay Millennium Prize: prove that smooth 3D solutions exist for all time, or find a breakdown.
X: By Poiseuille's law, how does flow change if an artery's radius narrows by 20% (same pressure drop)?
> Q ∝ R^{4}
> New flow ratio = 0.8^{4} = 0.4096
> Flow falls to about 41%: a 59% reduction from a 20% narrowing
K: Navier–Stokes balances acceleration, pressure, viscosity and forces with incompressibility; Poiseuille flow gives Q ∝ R^{4}; 3D smoothness is an open Millennium Prize problem.
!: Assuming flow is proportional to cross-sectional area (R^{2}) in viscous pipe flow.
Q: Which term makes the Navier–Stokes equations nonlinear? | (v · ∇)v, the convective acceleration.
Q: How does Poiseuille flow rate depend on radius? | As R^{4}.
SUM: Navier–Stokes governs viscous flow.
SUM: Their mathematics is still incomplete.
SRC: Batchelor GK, An Introduction to Fluid Dynamics (Cambridge University Press 1967) | textbook | 1967 | https://www.cambridge.org/
SRC: Clay Mathematics Institute, Navier–Stokes equation: Millennium Prize problem | guidance | 2000 | https://www.claymath.org/millennium/navier-stokes-equation/
NUM1#maths-u10-30-q1@1: If a pipe's radius doubles (same pressure gradient and fluid), by what factor does Poiseuille flow increase? | 16 | 0 |  | Q ∝ R^{4}, and 2^{4} = 16.
M1#maths-u10-30-q2@1: What does the μ∇^{2}v term represent? | Viscous forces | Pressure forces | Gravity | Acceleration | Mass conservation | Viscosity diffuses momentum, smoothing velocity differences.
M3#maths-u10-30-q3@2: What exactly is the Navier–Stokes Millennium Prize problem? | Prove that smooth solutions exist for all time in 3D, or show they can break down | Solve the equations in closed form | Compute turbulence exactly | Prove the equations are linear | Find a closed-form formula solving the equations in every case | The question is global existence and smoothness of 3D solutions.

## Maxwell's Equations
S: Maxwell's four equations unify electricity, magnetism and light. They show that changing electric and magnetic fields sustain each other as waves travelling at the speed of light, which is the basis of radio, optics and electrical engineering.
O: State Maxwell's equations and interpret each one
O: Derive the electromagnetic wave speed
T: Maxwell's equations | ∇ · E = ρ/ε₀; ∇ · B = 0; ∇ × E = −∂B/∂t; ∇ × B = μ₀J + μ₀ε₀ ∂E/∂t
T: Displacement current | Maxwell's term μ₀ε₀ ∂E/∂t, which makes the equations consistent and predicts waves
H: The four laws
- Gauss: charges are sources of electric field.
- No magnetic monopoles: magnetic field lines have no ends.
- Faraday: changing magnetic fields induce electric fields (generators).
- Ampère–Maxwell: currents and changing electric fields create magnetic fields.
H: Waves
- In empty space, taking the curl of Faraday's law and using Ampère–Maxwell gives ∇^{2}E = μ₀ε₀ ∂^{2}E/∂t^{2}.
- Wave speed c = 1/√(μ₀ε₀) ≈ 3 × 10^{8} m/s: light is electromagnetic.
- Hertz confirmed radio waves in 1887.
H: Mathematics
- Integral forms use the divergence and Stokes' theorems (School 8).
- Potentials: E = −∇φ − ∂A/∂t and B = ∇ × A.
- Maxwell's equations are consistent with special relativity, which inspired Einstein.
X: Calculate c from μ₀ = 4π × 10^{−7} H/m and ε₀ = 8.854 × 10^{−12} F/m.
> μ₀ε₀ = 4π × 10^{−7} × 8.854 × 10^{−12} ≈ 1.1127 × 10^{−17}
> √(μ₀ε₀) ≈ 3.336 × 10^{−9}
> c = 1/3.336 × 10^{−9} ≈ 2.998 × 10^{8} m/s
K: Gauss, no monopoles, Faraday, Ampère–Maxwell; the displacement current gives waves at c = 1/√(μ₀ε₀); integral forms come from the vector calculus theorems.
!: Leaving out the displacement current, which breaks charge conservation and predicts no waves.
Q: Which Maxwell equation says there are no magnetic monopoles? | ∇ · B = 0.
Q: What is the speed of electromagnetic waves in vacuum? | c = 1/√(μ₀ε₀) ≈ 3 × 10^{8} m/s.
SUM: Maxwell's equations unify electromagnetism.
SUM: They predict light as a wave.
SRC: Griffiths DJ, Introduction to Electrodynamics (5th edn, Cambridge University Press 2023) | textbook | 2023 | https://www.cambridge.org/
SRC: Maxwell JC, A dynamical theory of the electromagnetic field, Philosophical Transactions of the Royal Society 155, 459 | journal | 1865 | https://doi.org/10.1098/rstl.1865.0008
NUM1#maths-u10-31-q1@1: Give c in units of 10^{8} m/s, to 3 decimal places. | 2.998 | 0.001 | 10^{8} m/s | c ≈ 2.998 × 10^{8} m/s.
M1#maths-u10-31-q2@1: Which law explains how a generator produces voltage? | Faraday's law | Gauss's law | ∇ · B = 0 | Coulomb's law alone | Ohm's law alone | A changing magnetic flux induces a circulating electric field.
M2#maths-u10-31-q3@2: Why was Maxwell's displacement current essential? | It made the equations consistent with charge conservation and predicted electromagnetic waves | It removed the need for Faraday's law | It explained magnetism in iron, which the other laws couldn't | It's only a historical curiosity | It made the equations nonlinear | Without it, ∇ · (∇ × B) = 0 would contradict changing charge densities.

## Schrödinger Equation
S: The Schrödinger equation governs how quantum states evolve. Its wave function gives probabilities, and solving it for simple systems explains the discrete energy levels of atoms and the behaviour of particles in boxes and wells.
O: Interpret the Schrödinger equation and the wave function
O: Solve the particle in a box and find its energy levels
T: Time-dependent Schrödinger equation | iħ ∂ψ/∂t = Ĥψ, with Ĥ = −(ħ^{2}/2m)∇^{2} + V
T: Born rule | |ψ(x)|^{2} is the probability density for finding the particle at x
H: The equation
- Linear, so superpositions of solutions are solutions.
- Stationary states: ψ = φ(x)e^{−iEt/ħ}, with Ĥφ = Eφ (the time-independent equation).
- Energies are eigenvalues of the Hamiltonian: a Sturm–Liouville problem in 1D.
H: Particle in a box
- V = 0 for 0 < x < L, infinite outside: φ_{n} = √(2/L) sin(nπx/L).
- Energies E_{n} = n^{2}h^{2}/(8mL^{2}): discrete, growing like n^{2}.
- The lowest energy isn't zero: zero-point energy, linked to the uncertainty principle.
H: Beyond
- Harmonic oscillator: E_{n} = (n + ½)ħω.
- Hydrogen atom: E_{n} = −13.6 eV/n^{2}.
- Tunnelling through barriers explains radioactive decay and scanning tunnelling microscopes.
X: Normalise φ = A sin(πx/L) on [0, L] and find E₂/E₁ for a particle in a box.
> ∫₀^{L} A^{2} sin^{2}(πx/L) dx = A^{2}L/2 = 1, so A = √(2/L)
> E_{n} ∝ n^{2}
> E₂/E₁ = 4
K: iħψ_{t} = Ĥψ; |ψ|^{2} is probability density; stationary states solve Ĥφ = Eφ; box energies grow like n^{2} with non-zero ground state.
!: Treating ψ itself as a probability rather than |ψ|^{2}.
Q: What does |ψ|^{2} represent? | The probability density for the particle's position.
Q: How do particle-in-a-box energies scale with n? | As n^{2}.
SUM: Schrödinger's equation evolves quantum states.
SUM: Energies are eigenvalues.
SRC: Griffiths DJ, Schroeter DF, Introduction to Quantum Mechanics (3rd edn, Cambridge University Press 2018) | textbook | 2018 | https://www.cambridge.org/
SRC: Schrödinger E, Quantisierung als Eigenwertproblem, Annalen der Physik 384(4), 361 | journal | 1926 | https://doi.org/10.1002/andp.19263840404
NUM1#maths-u10-32-q1@1: For a particle in a box, find E₃/E₁. | 9 | 0 |  | E_{n} ∝ n^{2}, so E₃/E₁ = 9.
M1#maths-u10-32-q2@1: Why is the Schrödinger equation's linearity important? | Superpositions of solutions are also solutions | It makes all energies equal | It removes the need for boundary conditions | It means particles move in straight lines | It isn't linear | Linearity underlies superposition and interference in quantum mechanics.
M2#maths-u10-32-q3@2: Why can't a particle in a box have zero energy? | The zero-energy solution is identically zero, which can't be normalised | Boxes always add energy | Zero isn't an eigenvalue of any operator | Energy is always negative | Quantum particles always carry an extra unit of rest energy | E = 0 gives φ = 0, not a valid state; the ground state has E₁ > 0.

## Numerical Solutions of ODEs
S: Most differential equations can't be solved exactly, so computers step forward in small increments. Euler's method shows the idea; Runge–Kutta methods make it accurate; and stiff problems need implicit methods.
O: Apply Euler's method and describe Runge–Kutta methods
O: Explain order of accuracy, stability and stiffness
T: Euler's method | y_{n+1} = y_{n} + hf(x_{n}, y_{n}), stepping along the tangent
T: Order of a method | Global error proportional to h^{p}: Euler has p = 1, classical RK4 has p = 4
H: Methods
- Euler: simple, first order; halving h roughly halves the error.
- Improved Euler (Heun) and midpoint: second order.
- Classical Runge–Kutta (RK4): four slope evaluations per step, fourth order.
- Adaptive solvers (such as RK45) estimate the error and adjust h automatically.
H: Stability and stiffness
- Stiff equations have components decaying at very different rates (chemistry, circuits).
- Explicit methods need tiny steps for stability on stiff problems, even when the solution is smooth.
- Implicit methods such as backward Euler y_{n+1} = y_{n} + hf(x_{n+1}, y_{n+1}) stay stable with large steps.
H: Good practice
- Check convergence by halving h and comparing.
- Systems and higher-order equations are solved as first-order systems.
- Conserve important quantities (energy) with symplectic methods for long orbital simulations.
X: Use Euler's method with h = 0.5 to estimate y(1) for y′ = y, y(0) = 1.
> y₁ = 1 + 0.5 × 1 = 1.5
> y₂ = 1.5 + 0.5 × 1.5 = 2.25
> Estimate 2.25 against the true value e ≈ 2.718: first-order methods need small steps
K: Euler steps along tangents with O(h) error; RK4 gives O(h^{4}); stiff problems need implicit methods; verify by refining the step.
!: Trusting one numerical run without checking how the answer changes as h shrinks.
Q: What is the order of RK4? | Fourth order.
Q: What kind of method suits stiff equations? | Implicit methods, such as backward Euler.
SUM: Numerical solvers step through time.
SUM: Accuracy and stability both matter.
SRC: Iserles A, A First Course in the Numerical Analysis of Differential Equations (2nd edn, Cambridge University Press 2009) | textbook | 2009 | https://www.cambridge.org/
SRC: Burden RL, Faires JD, Burden AM, Numerical Analysis (10th edn, Cengage 2016) | textbook | 2016 | https://www.cengage.co.uk/
NUM1#maths-u10-33-q1@1: One Euler step of size 0.1 for y′ = 2y from y(0) = 1 gives what value? | 1.2 | 0.0001 |  | y₁ = 1 + 0.1 × 2 × 1 = 1.2.
M1#maths-u10-33-q2@1: Halving the step size in RK4 reduces the global error by roughly what factor? | 16 | 2 | 4 | 8 | 32 | RK4 is fourth order, so halving h multiplies the error by (½)^{4} = 1/16.
M2#maths-u10-33-q3@2: Why does an explicit method struggle with a stiff equation? | Stability forces tiny steps set by the fastest decaying component | Stiff equations have no solutions | Explicit methods can't handle systems | The solution oscillates wildly | It doesn't struggle | Fast-decaying modes impose a step limit long after they've vanished.

## Numerical Solutions of PDEs
S: Numerical methods for PDEs replace continuous space and time with grids, meshes or basis functions, turning the equation into a large system of algebraic equations. Stability, consistency and convergence decide whether the computed answer can be trusted.
O: Describe the main approaches to solving PDEs numerically
O: Apply the stability condition for the explicit heat equation scheme
T: Method of lines | Discretise space only, leaving a large system of ODEs in time
T: Lax equivalence theorem | For a consistent scheme for a well-posed linear problem, stability is equivalent to convergence
H: Approaches
- Finite differences: replace derivatives by differences on a grid.
- Finite elements: piecewise basis functions on a mesh, good for complex shapes.
- Finite volumes: balance fluxes through cells, good for conservation laws.
- Spectral methods: global basis functions for very smooth problems.
H: Stability
- Explicit heat scheme u_{i}^{n+1} = u_{i}^{n} + r(u_{i+1}^{n} − 2u_{i}^{n} + u_{i−1}^{n}) with r = kΔt/Δx^{2} is stable only if r ≤ ½.
- Von Neumann analysis checks whether Fourier modes grow.
- Implicit schemes (Crank–Nicolson) are unconditionally stable but need linear solves.
H: Practice
- Refine the mesh and check results converge.
- Large linear systems use sparse and iterative solvers (multigrid).
- Validate against exact solutions or experiments.
X: For the explicit heat scheme with k = 1 and Δx = 0.1, what time step is allowed?
> Stability needs r = kΔt/Δx^{2} ≤ ½
> Δt ≤ ½ × 0.01/1
> Δt ≤ 0.005: halving Δx would cut the allowed Δt by four
K: Discretise by differences, elements, volumes or spectral bases; stability plus consistency gives convergence; the explicit heat scheme needs kΔt/Δx^{2} ≤ ½.
!: Refining the spatial grid without reducing the time step in an explicit scheme.
Q: What does the method of lines leave you with? | A system of ODEs in time.
Q: Is Crank–Nicolson stable for any time step on the heat equation? | Yes, it's unconditionally stable.
SUM: Numerical PDEs build algebraic systems.
SUM: Stability is essential.
SRC: Morton KW, Mayers DF, Numerical Solution of Partial Differential Equations (2nd edn, Cambridge University Press 2005) | textbook | 2005 | https://www.cambridge.org/
SRC: LeVeque RJ, Finite Difference Methods for Ordinary and Partial Differential Equations (SIAM 2007) | textbook | 2007 | https://epubs.siam.org/
NUM1#maths-u10-34-q1@1: With k = 2 and Δx = 0.2, what is the largest stable Δt for the explicit heat scheme? | 0.01 | 0.0001 |  | Δt ≤ Δx^{2}/(2k) = 0.04/4 = 0.01.
M1#maths-u10-34-q2@1: Which method suits a complicated 3D engine part best? | Finite elements on an unstructured mesh | Finite differences on a square grid | A Fourier spectral method | Euler's method alone | Separation of variables | Unstructured element meshes fit irregular geometry and can be refined where needed.
M2#maths-u10-34-q3@2: What does the Lax equivalence theorem say? | For consistent schemes on well-posed linear problems, stability ⇔ convergence | All schemes converge | Stability is irrelevant | Implicit schemes are always wrong | Consistency implies stability | It's the basic guarantee linking stability to convergence.

## Finite Difference Methods
S: Finite difference methods approximate derivatives by differences of function values at nearby grid points. They're the simplest way to discretise differential equations and to estimate derivatives from data.
O: Derive and compare forward, backward and central difference formulas
O: Turn a boundary value problem into a linear system
T: Central difference | f′(x) ≈ (f(x + h) − f(x − h))/(2h), with error O(h^{2})
T: Second difference | f″(x) ≈ (f(x + h) − 2f(x) + f(x − h))/h^{2}, with error O(h^{2})
H: Formulas
- Forward: (f(x + h) − f(x))/h, error O(h). Backward: (f(x) − f(x − h))/h, error O(h).
- Central: second-order accurate.
- Taylor series give the errors and higher-order formulas.
- Too small an h causes rounding error: there's an optimal step.
H: Solving BVPs
- −u″ = f on a grid becomes (−u_{i−1} + 2u_{i} − u_{i+1})/h^{2} = f_{i}.
- This is a tridiagonal linear system, solved quickly (Thomas algorithm).
- Boundary conditions fix the end values.
H: In PDEs
- Combine differences in space and time (explicit, implicit, Crank–Nicolson schemes).
- Grids are easiest on rectangles; curved boundaries need care.
X: Approximate the derivative of e^{x} at 0 with h = 0.1 using forward and central differences.
> Forward: (e^{0.1} − 1)/0.1 ≈ (1.10517 − 1)/0.1 = 1.0517
> Central: (e^{0.1} − e^{−0.1})/0.2 ≈ 0.20033/0.2 = 1.0017
> Exact 1: the central formula's error (0.0017) is much smaller than the forward one's (0.052)
K: Forward and backward differences are O(h), central O(h^{2}); second differences approximate f″; BVPs become tridiagonal systems; very small h amplifies rounding.
!: Choosing h extremely small, so rounding error swamps the truncation error.
Q: What is the error order of the central difference for f′? | O(h^{2}).
Q: What kind of linear system does a 1D second-order BVP give? | A tridiagonal system.
SUM: Differences approximate derivatives.
SUM: Central differences are more accurate.
SRC: LeVeque RJ, Finite Difference Methods for Ordinary and Partial Differential Equations (SIAM 2007) | textbook | 2007 | https://epubs.siam.org/
SRC: Burden RL, Faires JD, Burden AM, Numerical Analysis (10th edn, Cengage 2016) | textbook | 2016 | https://www.cengage.co.uk/
NUM1#maths-u10-35-q1@1: Use the second difference with h = 0.1 to approximate f″(1) for f = x^{3}. | 6 | 0.0001 |  | (1.331 − 2 + 0.729)/0.01 = 6, exact because the error depends on the fourth derivative.
M1#maths-u10-35-q2@1: Which formula approximates f′(x) with second-order accuracy? | (f(x + h) − f(x − h))/(2h) | (f(x + h) − f(x))/h | (f(x) − f(x − h))/h | f(x + h)/h | (f(x + 2h) − f(x))/h | Odd error terms cancel in the central difference.
M2#maths-u10-35-q3@2: Why does making h tiny eventually increase the error of a difference formula? | Subtracting nearly equal values magnifies rounding error | Taylor series stop working | Derivatives become infinite | The formula changes order | It doesn't | Truncation error falls with h but rounding error grows like ε/h.

## Finite Element Methods
S: The finite element method splits a domain into small elements and approximates the solution by simple functions on each. Based on the weak form of the equation, it handles complex shapes and is the workhorse of structural engineering and many physics simulations.
O: Write a simple problem in weak form
O: Assemble and solve a small finite element system
T: Weak form | An integral version of the equation tested against functions v, needing fewer derivatives of u
T: Stiffness matrix | The matrix K with K_{ij} = ∫ φ_{i}′φ_{j}′ dx (for −u″ = f), from basis functions φ_{i}
H: The idea
- Multiply −u″ = f by a test function v and integrate by parts: ∫u′v′ dx = ∫fv dx.
- Approximate u by Σ u_{i}φ_{i} with "hat" functions φ_{i} on a mesh (Galerkin method).
- This gives the linear system Ku = F.
H: Strengths
- Meshes of triangles or tetrahedra fit complicated geometry.
- Mesh refinement where needed (adaptive FEM).
- Solid theory: the Galerkin solution is the best approximation in the energy norm.
H: Uses
- Stress analysis of bridges, aircraft and implants.
- Heat transfer, electromagnetics, fluid–structure interaction.
- Origins in structural engineering (1950s) and Courant's 1943 work; commercial codes now dominate engineering.
X: Solve −u″ = 1 on [0, 1], u(0) = u(1) = 0, with two linear elements (one interior node at 0.5).
> h = 0.5; the stiffness entry is 2/h = 4; the load is ∫φ₁ × 1 dx = h = 0.5
> 4u₁ = 0.5, so u₁ = 0.125
> The exact value u(0.5) = 0.5 × 0.5/2 = 0.125 matches (linear elements are exact at nodes for this 1D problem)
K: FEM uses the weak form, piecewise basis functions and a stiffness matrix; it handles complex geometry and gives best approximations in the energy norm.
!: Using a mesh too coarse to capture stress concentrations near corners or holes.
Q: What does integration by parts achieve in the weak form? | It moves a derivative onto the test function, needing less smoothness of u.
Q: What are the typical basis functions in linear FEM? | Hat (tent) functions.
SUM: FEM builds solutions from elements.
SUM: It fits complex geometry.
SRC: Strang G, Fix G, An Analysis of the Finite Element Method (2nd edn, Wellesley-Cambridge Press 2008) | textbook | 2008 | https://math.mit.edu/~gs/
SRC: Johnson C, Numerical Solution of Partial Differential Equations by the Finite Element Method (Dover 2009) | textbook | 2009 | https://store.doverpublications.com/
NUM1#maths-u10-36-q1@1: In the two-element example, find the nodal value u₁. | 0.125 | 0.0001 |  | 4u₁ = 0.5 gives u₁ = 0.125.
M1#maths-u10-36-q2@1: Why is the finite element method popular in structural engineering? | Element meshes fit complex shapes and refine where stresses are high | It needs no linear algebra | It only works on rectangles | It's exact for every problem | It avoids boundary conditions | Flexible meshes and solid theory suit real geometries.
M2#maths-u10-36-q3@2: What is the Galerkin method? | Choosing the approximate solution so the residual is orthogonal to the same basis functions | Guessing the solution at random | Using finite differences on a grid | Solving the strong form exactly | Ignoring the boundary | Test and trial functions come from the same space.

## Finite Volume Methods
S: Finite volume methods divide a domain into cells and track the average of a conserved quantity in each, updating it by the fluxes through cell faces. They conserve mass, momentum and energy exactly, so they dominate computational fluid dynamics.
O: Write a finite volume update for a conservation law
O: Explain why finite volume methods suit fluid flow and shocks
T: Control volume | A cell over which the conservation law is integrated
T: Numerical flux | An approximation F_{i+½} of the flux through the face between cells i and i + 1
H: The update
- Integrate u_{t} + q(u)_{x} = 0 over cell i: ū_{i}^{n+1} = ū_{i}^{n} − (Δt/Δx)(F_{i+½} − F_{i−½}).
- What leaves one cell enters its neighbour, so the total is conserved.
- Flux choice matters: upwind, Lax–Friedrichs, Godunov (exact Riemann problems), higher-order reconstructions.
H: Shocks and stability
- Conservative schemes capture shocks at the right speed.
- Limiters prevent spurious oscillations near discontinuities.
- Time steps are limited by the CFL condition.
H: Uses
- Aerodynamics, combustion, weather and ocean models, oil reservoirs.
- Software such as OpenFOAM and commercial CFD codes.
- Works on unstructured meshes in complex geometries.
X: A cell has average 2, Δt/Δx = 0.5, flux in from the left F_{i−½} = 1 and flux out to the right F_{i+½} = 3. Find the new average.
> ū_{i}^{n+1} = 2 − 0.5 × (3 − 1)
> = 2 − 1
> = 1: more leaves than enters, so the cell's content falls
K: Update cell averages by face flux differences; this conserves exactly; good flux choices and limiters capture shocks; CFD relies on it.
!: Using a non-conservative scheme for a problem with shocks, which gives wrong shock speeds.
Q: Why do finite volume schemes conserve quantities exactly? | Each face flux leaves one cell and enters the next.
Q: What do limiters do? | Prevent spurious oscillations near sharp gradients.
SUM: Finite volumes balance fluxes.
SUM: They conserve exactly and handle shocks.
SRC: Versteeg HK, Malalasekera W, An Introduction to Computational Fluid Dynamics: The Finite Volume Method (2nd edn, Pearson 2007) | textbook | 2007 | https://www.pearson.com/
SRC: LeVeque RJ, Finite Volume Methods for Hyperbolic Problems (Cambridge University Press 2002) | textbook | 2002 | https://www.cambridge.org/
NUM1#maths-u10-37-q1@1: A cell average is 5, Δt/Δx = 0.2, F_{i−½} = 4 and F_{i+½} = 2. Find the new average. | 5.4 | 0.0001 |  | 5 − 0.2 × (2 − 4) = 5 + 0.4 = 5.4.
M1#maths-u10-37-q2@1: Which field relies most heavily on finite volume methods? | Computational fluid dynamics | Number theory | Graph colouring | Cryptography | Combinatorics | Conservation of mass, momentum and energy makes them natural for fluids.
M2#maths-u10-37-q3@2: Why must schemes for shock problems be conservative? | Otherwise shocks travel at the wrong speed | Shocks don't exist numerically | Conservative schemes are always faster | Non-conservative schemes are unstable for smooth flows | It doesn't matter | The Lax–Wendroff theorem: convergent conservative schemes give correct weak solutions.

## Spectral Methods
S: Spectral methods represent the solution with global smooth functions such as Fourier modes or Chebyshev polynomials. For smooth problems their errors fall exponentially fast, so a few dozen modes can beat thousands of grid points.
O: Explain spectral differentiation with Fourier series
O: Compare the convergence of spectral and grid-based methods
T: Spectral accuracy | Error decreasing faster than any power of 1/N (often like e^{−cN}) for smooth solutions
T: Chebyshev points | x_{j} = cos(jπ/N), clustered near the ends of [−1, 1] to avoid Runge's phenomenon
H: How they work
- Expand u in basis functions; differentiate exactly in that basis.
- Fourier: d/dx of e^{ikx} is ik e^{ikx}, so differentiation is multiplication by ik.
- The FFT moves between point values and coefficients in O(N log N) time.
- Chebyshev polynomials handle non-periodic problems.
H: Strengths and limits
- Exponential convergence for smooth solutions.
- Global coupling makes matrices dense; best on simple geometries.
- Discontinuities cause Gibbs oscillations and slow convergence.
H: Uses
- Turbulence simulations in periodic boxes.
- Global weather and climate models (spherical harmonics).
- Quantum mechanics and wave propagation.
X: Differentiate u = sin 3x spectrally.
> sin 3x = (e^{3ix} − e^{−3ix})/(2i)
> Multiply each mode by ik: 3i × e^{3ix}/(2i) and (−3i) × (−e^{−3ix})/(2i)
> The result is 3 cos 3x, exactly, as expected
K: Spectral methods use global bases, differentiate exactly in coefficient space, and converge exponentially for smooth problems; Chebyshev points tame non-periodic cases.
!: Using spectral methods for solutions with shocks or discontinuities without special treatment.
Q: What does differentiation become in Fourier space? | Multiplication by ik.
Q: Why use Chebyshev points rather than equally spaced points? | To avoid Runge's oscillations near the ends.
SUM: Spectral methods use global smooth bases.
SUM: Smooth problems converge exponentially.
SRC: Trefethen LN, Spectral Methods in MATLAB (SIAM 2000) | textbook | 2000 | https://people.maths.ox.ac.uk/trefethen/spectral.html
SRC: Boyd JP, Chebyshev and Fourier Spectral Methods (2nd edn, Dover 2001) | textbook | 2001 | https://store.doverpublications.com/
NUM1#maths-u10-38-q1@1: Find the Chebyshev point x₁ = cos(π/4) for N = 4, to 4 decimal places. | 0.7071 | 0.0001 |  | cos(π/4) = √2/2 ≈ 0.7071.
M1#maths-u10-38-q2@1: For a very smooth periodic solution, which method usually converges fastest as N grows? | A Fourier spectral method | A first-order finite difference scheme | Euler's method | A finite volume upwind scheme | Linear finite elements | Spectral methods converge exponentially for smooth periodic functions.
M2#maths-u10-38-q3@2: What limits spectral methods for problems with shocks? | Gibbs oscillations near discontinuities slow convergence | They can't represent smooth functions | They need unstructured meshes | They don't use the FFT | Nothing limits them | Global smooth bases struggle to represent jumps.

## Dynamical Systems
S: Dynamical systems theory studies how states evolve under fixed rules, whether continuous flows from ODEs or discrete maps iterated step by step. It focuses on long-term behaviour: fixed points, cycles, attractors and chaos.
O: Find fixed points of flows and maps and test their stability
O: Describe orbits, attractors and the logistic map
T: Fixed point of a map | x* with f(x*) = x*; stable if |f′(x*)| < 1
T: Attractor | A set that nearby trajectories approach over time
H: Flows and maps
- Flows: x′ = f(x), continuous time; equilibria where f = 0.
- Maps: x_{n+1} = f(x_{n}), discrete time (populations by generation, Poincaré sections).
- Phase space: all possible states; trajectories never cross in autonomous flows.
H: Long-term behaviour
- Fixed points, periodic orbits (limit cycles), quasi-periodic motion, chaotic attractors.
- Basins of attraction: which starting points go where.
- Conserved quantities (energy) and dissipation shape the possibilities.
H: The logistic map
- x_{n+1} = rx_{n}(1 − x_{n}) for 0 ≤ r ≤ 4.
- Fixed point x* = 1 − 1/r is stable for 1 < r < 3.
- Period doubling begins at r = 3, leading to chaos around r ≈ 3.57.
X: For the logistic map with r = 2.5, find the non-zero fixed point and test its stability.
> x* = 1 − 1/2.5 = 0.6
> f′(x) = r(1 − 2x), so f′(0.6) = 2.5 × (−0.2) = −0.5
> |f′(x*)| = 0.5 < 1: stable, and iterates approach 0.6
K: Fixed points solve f(x) = x (maps) or f(x) = 0 (flows); |f′| < 1 for stable map fixed points; long-term behaviour includes cycles and chaos.
!: Using the flow stability test (f′ < 0) for a map, which needs |f′| < 1.
Q: What is the non-zero fixed point of the logistic map? | 1 − 1/r.
Q: At what r does period doubling begin in the logistic map? | r = 3.
SUM: Dynamical systems study long-term evolution.
SUM: Maps and flows have different stability tests.
SRC: Strogatz SH, Nonlinear Dynamics and Chaos (2nd edn, CRC Press 2015) | textbook | 2015 | https://www.routledge.com/
SRC: May RM, Simple mathematical models with very complicated dynamics, Nature 261, 459 | journal | 1976 | https://doi.org/10.1038/261459a0
NUM1#maths-u10-39-q1@1: Find the non-zero fixed point of the logistic map with r = 3.2, to 4 decimal places. | 0.6875 | 0.0001 |  | 1 − 1/3.2 = 0.6875.
M1#maths-u10-39-q2@1: When is a fixed point x* of a map stable? | When |f′(x*)| < 1 | When f′(x*) < 0 | When f(x*) = 0 | When |f′(x*)| > 1 | Always | Small perturbations are multiplied by f′(x*) each step.
M2#maths-u10-39-q3@2: Why can't trajectories of an autonomous flow cross in phase space? | Uniqueness of solutions means each point has one future | Flows always move in straight lines | Phase space is one-dimensional | Crossing would require a map | They can | Two trajectories through the same point would violate uniqueness.

## Stability Analysis
S: Stability analysis asks whether a system returns to equilibrium after a small disturbance. Linearisation and eigenvalues answer it locally, and Lyapunov functions can prove stability without solving anything.
O: Classify equilibria using the Jacobian's eigenvalues
O: Construct simple Lyapunov functions
T: Jacobian at an equilibrium | The matrix of partial derivatives of f, giving the linearised system
T: Lyapunov function | A function V > 0 (except at the equilibrium) with V′ ≤ 0 along trajectories
H: Linearisation
- Hartman–Grobman: near a hyperbolic equilibrium (no eigenvalues with zero real part), the system behaves like its linearisation.
- All eigenvalues with negative real part: asymptotically stable.
- Any eigenvalue with positive real part: unstable.
- Zero real parts: linearisation can't decide.
H: Lyapunov's method
- Find V like an energy: positive definite and non-increasing along trajectories.
- V′ < 0 (away from the equilibrium) gives asymptotic stability.
- Useful for nonlinear systems and in control design.
H: Applications
- Engineering stability (aircraft, power grids), ecology (stable coexistence), economics (equilibrium).
- Routh–Hurwitz criteria test polynomial roots without computing them (School 25).
X: Analyse the equilibrium (0, 0) of x′ = y, y′ = −x − y.
> Jacobian [[0, 1], [−1, −1]]: trace −1, determinant 1
> λ = (−1 ± i√3)/2: negative real part, so a stable spiral
> Lyapunov check: V = x^{2} + y^{2} gives V′ = 2xy + 2y(−x − y) = −2y^{2} ≤ 0
K: Linearise with the Jacobian; negative real parts mean stable (for hyperbolic points); Lyapunov functions prove stability without solving.
!: Concluding stability from linearisation when an eigenvalue has zero real part.
Q: What does Hartman–Grobman guarantee? | Near hyperbolic equilibria, nonlinear behaviour matches the linearisation.
Q: What must a Lyapunov function's derivative satisfy for stability? | V′ ≤ 0 along trajectories.
SUM: Eigenvalues decide local stability.
SUM: Lyapunov functions prove it directly.
SRC: Khalil HK, Nonlinear Systems (3rd edn, Prentice Hall 2002) | textbook | 2002 | https://www.pearson.com/
SRC: Strogatz SH, Nonlinear Dynamics and Chaos (2nd edn, CRC Press 2015) | textbook | 2015 | https://www.routledge.com/
NUM1#maths-u10-40-q1@1: For the Jacobian [[0, 1], [−1, −1]], find the real part of the eigenvalues. | -0.5 | 0.0001 |  | λ = (−1 ± i√3)/2, so the real part is −0.5.
M1#maths-u10-40-q2@1: Eigenvalues at an equilibrium are −2 and 3. What is it? | An unstable saddle | A stable node | A stable spiral | A centre | An unstable spiral | One positive eigenvalue makes it unstable; opposite signs give a saddle.
M3#maths-u10-40-q3@2: The linearisation at an equilibrium has eigenvalues ±i. What can you conclude about the nonlinear system? | Nothing definite: it could be a centre or a slow spiral either way | It's certainly a centre | It's certainly stable | It's certainly unstable | It's a saddle | Purely imaginary eigenvalues are non-hyperbolic, so nonlinear terms decide.

## Bifurcation Theory
S: Bifurcation theory studies how the qualitative behaviour of a system changes as a parameter varies: equilibria appearing, disappearing or swapping stability, and oscillations being born. It explains tipping points in climate, ecology and engineering.
O: Identify saddle-node, transcritical, pitchfork and Hopf bifurcations
O: Draw and interpret simple bifurcation diagrams
T: Bifurcation | A qualitative change in a system's behaviour as a parameter crosses a critical value
T: Hopf bifurcation | An equilibrium losing stability as a pair of complex eigenvalues crosses the imaginary axis, giving birth to a limit cycle
H: One-dimensional types
- Saddle-node: x′ = r + x^{2}; two equilibria merge and vanish as r increases through 0.
- Transcritical: x′ = rx − x^{2}; equilibria exchange stability.
- Pitchfork: x′ = rx − x^{3}; one equilibrium splits into three (symmetry breaking).
H: Oscillations
- Hopf bifurcations create oscillations: supercritical (small stable cycles) or subcritical (sudden large jumps).
- Examples: chemical oscillators, heartbeat models, aircraft wing flutter.
H: Tipping points and hysteresis
- Near a saddle-node, a small parameter change can cause an abrupt jump.
- Reversing the parameter may not reverse the jump (hysteresis).
- Proposed for ice sheets, lake ecosystems and ocean circulation.
X: For x′ = r + x^{2}, describe the equilibria as r changes.
> r < 0: x = ±√(−r); f′(x) = 2x, so −√(−r) is stable and +√(−r) unstable
> r = 0: they merge at x = 0
> r > 0: no equilibria; x increases without limit (a saddle-node bifurcation)
K: Saddle-node, transcritical and pitchfork bifurcations change equilibria; Hopf creates cycles; saddle-nodes cause tipping points with hysteresis.
!: Assuming systems always respond gradually to gradual parameter changes.
Q: Which bifurcation creates a limit cycle from an equilibrium? | A Hopf bifurcation.
Q: What is hysteresis? | The system doesn't return the same way when the parameter is reversed.
SUM: Bifurcations change behaviour qualitatively.
SUM: They underlie tipping points.
SRC: Kuznetsov YA, Elements of Applied Bifurcation Theory (3rd edn, Springer 2004) | textbook | 2004 | https://link.springer.com/
SRC: Strogatz SH, Nonlinear Dynamics and Chaos (2nd edn, CRC Press 2015) | textbook | 2015 | https://www.routledge.com/
NUM1#maths-u10-41-q1@1: For x′ = r + x^{2} with r = −4, find the stable equilibrium. | -2 | 0 |  | Equilibria ±2; f′(x) = 2x is negative at −2.
M1#maths-u10-41-q2@1: Which normal form shows a pitchfork bifurcation? | x′ = rx − x^{3} | x′ = r + x^{2} | x′ = rx − x^{2} | x′ = r − x | x′ = x^{2} | Symmetric under x → −x, one equilibrium splits into three as r passes 0.
M2#maths-u10-41-q3@2: Why do saddle-node bifurcations make tipping points dangerous? | Past the critical value the equilibrium vanishes, causing an abrupt jump that may not reverse | They're always reversible | They slow everything down | They create stable cycles only | Equilibria multiply without limit, making the system unpredictable | Hysteresis means undoing the change needn't restore the old state.

## Chaos Theory
S: Chaos is deterministic behaviour that's unpredictable in practice because tiny differences in starting conditions grow exponentially. Weather, dripping taps and population cycles can all be chaotic, and Lorenz's 1963 model made the idea famous.
O: Describe sensitive dependence and Lyapunov exponents
O: Explain period-doubling routes to chaos and prediction limits
T: Sensitive dependence on initial conditions | Nearby trajectories separate exponentially, roughly as e^{λt}
T: Lyapunov exponent | λ, the average exponential rate of separation; λ > 0 signals chaos
H: Hallmarks
- Deterministic rules, aperiodic long-term behaviour, sensitive dependence.
- Strange attractors with fractal structure (Lorenz's butterfly).
- Chaos needs nonlinearity and at least three dimensions for flows (one for maps).
H: Routes to chaos
- Period doubling in the logistic map: cycles of period 2, 4, 8, … accumulating at r ≈ 3.5699.
- Feigenbaum's constant δ ≈ 4.669 governs the spacing, universal across many systems.
- Intermittency and quasi-periodic routes also occur.
H: Prediction
- The prediction horizon grows only logarithmically with measurement accuracy.
- Weather forecasting uses ensembles of runs to estimate uncertainty.
- Chaos isn't randomness: short-term prediction and statistical properties remain possible.
X: An error of 10^{−6} doubles every day. How long until it reaches size 1?
> Size after n days: 10^{−6} × 2ⁿ
> Need 2ⁿ = 10^{6}, so n = log₂(10^{6}) ≈ 19.9
> About 20 days; a thousand times better measurement buys only about 10 more days
K: Chaos is deterministic but unpredictable long-term; positive Lyapunov exponents; period doubling and Feigenbaum's constant; prediction horizons grow only logarithmically.
!: Equating chaos with randomness.
Q: What sign of Lyapunov exponent indicates chaos? | Positive.
Q: Who discovered sensitive dependence in a weather model in 1963? | Edward Lorenz.
SUM: Chaos is deterministic unpredictability.
SUM: Errors grow exponentially.
SRC: Lorenz EN, Deterministic nonperiodic flow, Journal of the Atmospheric Sciences 20(2), 130 | journal | 1963 | https://doi.org/10.1175/1520-0469(1963)020<0130:DNF>2.0.CO;2
SRC: Feigenbaum MJ, Quantitative universality for a class of nonlinear transformations, Journal of Statistical Physics 19, 25 | journal | 1978 | https://doi.org/10.1007/BF01020332
NUM1#maths-u10-42-q1@1: An error of 10^{−3} doubles every hour. After how many hours does it exceed 1 (to the nearest whole hour)? | 10 | 0 | hours | 2^{10} = 1,024 > 1,000, so about 10 hours.
M1#maths-u10-42-q2@1: What is the minimum dimension for chaos in an autonomous continuous flow? | 3 | 1 | 2 | 4 | 10 | The Poincaré–Bendixson theorem rules out chaos in planar flows.
M3#maths-u10-42-q3@2: Improving initial measurements by a factor of 1,000 extends a chaotic forecast how much? | By a fixed, modest amount (log of 1,000 over the growth rate) | By a factor of 1,000 | Indefinitely | Not at all | By a factor of 3 | Separation grows like e^{λt}, so the horizon grows like (ln 1,000)/λ.

## Solitons
S: A soliton is a solitary wave that keeps its shape while travelling and survives collisions with other solitons. First seen by John Scott Russell on a canal in 1834, solitons arise in shallow water, optical fibres and many integrable equations.
O: Describe the KdV equation and its soliton solution
O: Explain the balance between nonlinearity and dispersion
T: Korteweg–de Vries (KdV) equation | u_{t} + 6uu_{x} + u_{xxx} = 0, modelling shallow water waves
T: Soliton | A localised wave that keeps its shape and emerges from collisions unchanged apart from a shift
H: The balance
- Nonlinearity (6uu_{x}) steepens waves; dispersion (u_{xxx}) spreads them.
- When they balance, a stable solitary wave forms.
- KdV soliton: u = (c/2) sech^{2}(√c(x − ct)/2): taller solitons are narrower and faster (speed c = 2 × amplitude).
H: Remarkable properties
- Zabusky and Kruskal (1965) found numerically that solitons pass through each other.
- The inverse scattering transform solves KdV exactly, like a nonlinear Fourier transform.
- Integrable equations have infinitely many conserved quantities.
H: Applications
- Tidal bores and internal waves in oceans.
- Optical solitons carry data in fibres without spreading (nonlinear Schrödinger equation).
- Models in plasma physics and biology.
X: A KdV soliton has amplitude 3. Find its speed and compare with a soliton of amplitude 1.
> Amplitude = c/2, so c = 2 × amplitude
> Amplitude 3: speed 6; amplitude 1: speed 2
> The taller soliton overtakes the shorter one, and both emerge unchanged
K: Solitons balance nonlinearity and dispersion; KdV solitons have speed proportional to amplitude; they survive collisions; inverse scattering solves integrable equations.
!: Expecting solitary waves to spread out like ordinary linear waves.
Q: What two effects balance in a soliton? | Nonlinear steepening and dispersion.
Q: Who first observed a soliton? | John Scott Russell, on the Union Canal in 1834.
SUM: Solitons keep their shape.
SUM: They pass through each other.
SRC: Drazin PG, Johnson RS, Solitons: An Introduction (Cambridge University Press 1989) | textbook | 1989 | https://www.cambridge.org/
SRC: Zabusky NJ, Kruskal MD, Interaction of "solitons" in a collisionless plasma and the recurrence of initial states, Physical Review Letters 15(6), 240 | journal | 1965 | https://doi.org/10.1103/PhysRevLett.15.240
NUM1#maths-u10-43-q1@1: A KdV soliton has speed 10. What is its amplitude? | 5 | 0 |  | Amplitude = c/2 = 5.
M1#maths-u10-43-q2@1: What happens when two KdV solitons collide? | They pass through each other and keep their shapes, with a phase shift | They merge into one larger wave | They cancel each other out | They break into many small waves | Both are destroyed, leaving a train of small linear ripples | Integrability means solitons interact elastically.
M2#maths-u10-43-q3@2: Why are solitons useful in optical fibre communication? | They don't spread as they travel, so pulses stay distinct | They travel faster than light | They need no power | They avoid all losses | They're easier to generate than any other pulse | Nonlinearity balances dispersion, keeping pulses compact over long distances.

## Delay Differential Equations
S: A delay differential equation makes the rate of change depend on past states as well as the present: populations responding to resources a generation ago, control systems with lag, physiological feedback. Delays can turn stable systems into oscillating ones.
O: Solve simple DDEs with the method of steps
O: Explain why delays cause oscillations and need history functions
T: Delay differential equation | x′(t) = f(x(t), x(t − τ)) with delay τ > 0
T: History function | The values of x on [−τ, 0], needed instead of a single initial value
H: Features
- The state is a whole function segment, so DDEs are infinite-dimensional.
- Solutions can be less smooth initially, with derivative jumps at multiples of τ.
- The characteristic equation (for linear DDEs) is transcendental, with infinitely many roots.
H: Delays and oscillation
- Hutchinson's delayed logistic N′(t) = rN(t)(1 − N(t − τ)/K) oscillates when rτ > π/2.
- Feedback with lag overshoots: thermostats, traffic, blood cell production.
- Many physiological "dynamical diseases" are explained by delays (Mackey and Glass).
H: Solving
- Method of steps: on each interval of length τ, the delayed term is known, so solve an ODE.
- Numerical solvers store the history and interpolate.
X: Solve x′(t) = −x(t − 1) with x(t) = 1 for t ≤ 0, up to t = 2.
> On [0, 1]: x′ = −1, so x = 1 − t (x(1) = 0)
> On [1, 2]: x′ = −(1 − (t − 1)) = −(2 − t), so x = −(2t − t^{2}/2) + 1.5
> At t = 2: x = −(4 − 2) + 1.5 = −0.5: the solution overshoots below zero
K: DDEs depend on past states, need history functions and are infinite-dimensional; delays cause oscillations; the method of steps solves them piece by piece.
!: Giving only an initial value x(0) for a DDE instead of a history on [−τ, 0].
Q: What extra data does a DDE need compared with an ODE? | A history function over the delay interval.
Q: When does Hutchinson's delayed logistic equation oscillate? | When rτ > π/2.
SUM: Delays add memory.
SUM: They often create oscillations.
SRC: Smith H, An Introduction to Delay Differential Equations with Applications to the Life Sciences (Springer 2011) | textbook | 2011 | https://link.springer.com/
SRC: Mackey MC, Glass L, Oscillation and chaos in physiological control systems, Science 197(4300), 287 | journal | 1977 | https://doi.org/10.1126/science.267326
NUM1#maths-u10-44-q1@1: In the example, find x(2). | -0.5 | 0.0001 |  | x(2) = −(2 × 2 − 2^{2}/2) + 1.5 = −2 + 1.5 = −0.5.
M1#maths-u10-44-q2@1: Why are DDEs called infinite-dimensional? | Their state is a whole function over the delay interval | They have infinitely many variables written out | They never have solutions | They involve infinite delays | They aren't | Predicting the future needs the entire recent history, a function.
M2#maths-u10-44-q3@2: For N′ = rN(1 − N(t − τ)/K), what happens as the delay τ increases past π/(2r)? | The equilibrium K loses stability and oscillations appear | Growth stops | The population becomes negative | Nothing changes | The equation becomes linear | The delayed logistic undergoes a Hopf bifurcation at rτ = π/2.

## Stochastic Differential Equations
S: Stochastic differential equations add random noise to differential equations, modelling share prices, particles jostled by molecules and populations with random environments. They need a new calculus, Itô's, because Brownian paths are too rough for ordinary derivatives.
O: Interpret SDEs with drift and diffusion terms
O: Use Itô's lemma and the geometric Brownian motion solution
T: Brownian motion | W_{t}, a continuous random process with independent normal increments: W_{t} − W_{s} ~ N(0, t − s)
T: Itô's lemma | For dX = a dt + b dW: df(X) = (f′a + ½f″b^{2}) dt + f′b dW
H: SDEs
- dX = a(X, t) dt + b(X, t) dW: drift a plus noise of size b.
- Brownian paths are continuous but nowhere differentiable, with (dW)^{2} = dt.
- The extra ½f″b^{2} term in Itô's lemma comes from that quadratic variation.
H: Geometric Brownian motion
- dS = μS dt + σS dW, a standard model of share prices.
- Solution: S_{t} = S₀ exp((μ − σ^{2}/2)t + σW_{t}).
- E(S_{t}) = S₀e^{μt}, but the median is S₀e^{(μ − σ^{2}/2)t}: volatility drags typical outcomes down.
- Basis of the Black–Scholes model (School 21).
H: Numerics and uses
- Euler–Maruyama: X_{n+1} = X_{n} + aΔt + b√Δt Z, with Z ~ N(0, 1).
- Monte Carlo averages many simulated paths.
- Langevin equations in physics, stochastic population models, filtering and control.
X: For GBM with S₀ = 100, μ = 0.08, σ = 0.2 and t = 1, find the mean and median of S₁.
> Mean = 100e^{0.08} ≈ 108.33
> Median = 100e^{0.08 − 0.02} = 100e^{0.06} ≈ 106.18
> The mean exceeds the median because of the skewed (log-normal) distribution
K: SDEs add dW noise; Itô's lemma has an extra ½f″b^{2} term; GBM gives log-normal prices with mean S₀e^{μt}; simulate with Euler–Maruyama.
!: Applying the ordinary chain rule to functions of Brownian motion, missing the Itô correction.
Q: What is the variance of W_{t}? | t.
Q: What extra term does Itô's lemma add? | ½f″b^{2} dt.
SUM: SDEs model noisy dynamics.
SUM: Itô calculus handles rough paths.
SRC: Øksendal B, Stochastic Differential Equations (6th edn, Springer 2003) | textbook | 2003 | https://link.springer.com/
SRC: Higham DJ, An algorithmic introduction to numerical simulation of stochastic differential equations, SIAM Review 43(3), 525 | journal | 2001 | https://doi.org/10.1137/S0036144500378302
NUM1#maths-u10-45-q1@1: Using the example, find E(S₁) to 2 decimal places. | 108.33 | 0.01 |  | 100e^{0.08} ≈ 108.33.
M1#maths-u10-45-q2@1: Which is the Euler–Maruyama step for dX = a dt + b dW? | X + aΔt + b√Δt Z with Z ~ N(0, 1) | X + aΔt + bΔt Z | X + aΔt only | X + b Z only | X × e^{aΔt} | Brownian increments over Δt have standard deviation √Δt.
M3#maths-u10-45-q3@2: Why does Itô's lemma include the term ½f″b^{2}? | Brownian increments satisfy (dW)^{2} = dt, so second-order terms don't vanish | It's a rounding correction | Ordinary calculus always has it | Because b is constant | It corrects rounding errors in numerical simulations of noise | Quadratic variation makes the second-order Taylor term first order in dt.

## Fractional Differential Equations
S: Fractional differential equations use derivatives of non-integer order to model systems with memory: anomalous diffusion in crowded cells, viscoelastic materials and long-tailed relaxation. Their solutions involve the Mittag-Leffler function rather than the exponential.
O: Recognise fractional relaxation and diffusion equations
O: Interpret Mittag-Leffler decay and anomalous diffusion scaling
T: Caputo derivative | A fractional derivative suited to initial value problems, using ordinary initial conditions
T: Mittag-Leffler function | E_{α}(z) = Σ z^{k}/Γ(αk + 1), which reduces to e^{z} when α = 1
H: Fractional relaxation
- D^{α}y = −λy (0 < α < 1, Caputo) has solution y = y₀E_{α}(−λt^{α}).
- It decays like a stretched exponential at first and a power law later: much slower than e^{−λt}.
- Fits stress relaxation in polymers and dielectric relaxation.
H: Anomalous diffusion
- Fractional diffusion equations give mean squared displacement ∝ t^{α}.
- α < 1: subdiffusion (crowded cytoplasm, porous media); α > 1: superdiffusion.
- Arise from random walks with long waiting times or long jumps.
H: Computing
- Memory makes numerical schemes costly: each step uses the whole history (Grünwald–Letnikov formulas).
- Fast algorithms compress the memory.
- Parameter estimation from data must check whether a fractional model is really needed.
X: For α = ½, the Mittag-Leffler function satisfies E_{½}(−z) = e^{z^{2}} erfc(z). Compare E_{½}(−1) with e^{−1}.
> E_{½}(−1) = e × erfc(1) ≈ 2.718 × 0.1573 ≈ 0.428
> e^{−1} ≈ 0.368
> The fractional relaxation is slower at this point, and its long tail decays only like a power law
K: Fractional ODEs and PDEs model memory; relaxation follows Mittag-Leffler functions; anomalous diffusion has MSD ∝ t^{α}; numerics must handle long memory.
!: Fitting a fractional model to data without checking that ordinary models fail.
Q: What does E_{α}(z) reduce to when α = 1? | e^{z}.
Q: What is subdiffusion? | Mean squared displacement growing like t^{α} with α < 1.
SUM: Fractional equations model memory.
SUM: Their decay is slower than exponential.
SRC: Podlubny I, Fractional Differential Equations (Academic Press 1999) | textbook | 1999 | https://www.sciencedirect.com/
SRC: Metzler R, Klafter J, The random walk's guide to anomalous diffusion: a fractional dynamics approach, Physics Reports 339(1), 1 | journal | 2000 | https://doi.org/10.1016/S0370-1573(00)00070-3
NUM1#maths-u10-46-q1@1: For subdiffusion with MSD ∝ t^{0.5}, by what factor does MSD increase when time is quadrupled? | 2 | 0 |  | 4^{0.5} = 2 (normal diffusion would give 4).
M1#maths-u10-46-q2@1: Which function solves fractional relaxation D^{α}y = −λy? | A Mittag-Leffler function | A pure exponential | A sine wave | A polynomial | A logarithm | y = y₀E_{α}(−λt^{α}), which is exponential only when α = 1.
M2#maths-u10-46-q3@2: Why are fractional equations expensive to solve numerically? | Each step depends on the entire past history | They have no solutions | They need complex numbers | They're always stiff | They aren't expensive | Non-local operators couple every time step to all earlier ones.
`;
