// School 18: Optimisation and Operations Research. Format: kit/course/notes.js. Standard: docs/CURRICULUM_CONTENT_STANDARD.md
// Optimisation theory, linear and integer programming, algorithms and operations research.
export default `
## Mathematical Optimisation
S: Optimisation is choosing the best option from a set of possibilities: the cheapest route, the strongest design or the most accurate model. Every problem has the same parts, decision variables, an objective and constraints, and recognising its type tells you which method to use.
O: Formulate problems with variables, objective and constraints
O: Classify problems as linear, convex, integer or nonlinear
T: Objective function | The quantity f(x) to be minimised or maximised
T: Feasible set | The set of decision vectors x that satisfy every constraint
H: Formulation
- Decision variables x = (x₁, …, xₙ): what we choose.
- Objective: minimise f(x) (maximising f is minimising −f).
- Constraints: gᵢ(x) ≤ 0, hⱼ(x) = 0, and bounds or integrality.
- A solution x* is optimal if f(x*) ≤ f(x) for every feasible x.
H: Problem classes
- Linear programming: linear objective and constraints.
- Convex optimisation: convex objective and feasible set; local optima are global.
- Integer and combinatorial: some variables must be whole numbers.
- Nonlinear and nonconvex: general, possibly with many local optima.
H: Local and global
- Local minimum: best in a neighbourhood. Global minimum: best overall.
- Weierstrass: a continuous f on a non-empty compact set attains its minimum.
- Infeasible problems have no feasible point; unbounded ones have no finite optimum.
- Sensitivity analysis asks how the optimum changes with the data.
X: A farmer has 100 m of fencing for a rectangle against a wall (wall on one side). Maximise the area.
> Variables: width x (two sides) and length y (one side); constraint 2x + y = 100
> Area A = xy = x(100 − 2x); dA/dx = 100 − 4x = 0 gives x = 25
> y = 50, so the maximum area is 25 × 50 = 1250 m^{2}
K: Optimisation problems have variables, an objective and constraints; their class (linear, convex, integer, nonconvex) determines the method; local and global optima can differ.
!: Forgetting to check that a stationary point is a maximum and is feasible.
Q: How do you turn a maximisation into a minimisation? | Minimise the negative of the objective.
Q: What guarantees that a continuous function has a minimum on a set? | The set being non-empty and compact (Weierstrass).
SUM: Optimisation picks the best feasible choice.
SUM: Problem class guides the method.
SRC: Boyd S, Vandenberghe L, Convex Optimization (Cambridge University Press 2004) | textbook | 2004 | https://web.stanford.edu/~boyd/cvxbook/
SRC: Nocedal J, Wright SJ, Numerical Optimization (2nd edn, Springer 2006) | textbook | 2006 | https://link.springer.com/
NUM1#maths-u18-01-q1@1: With 60 m of fencing and a wall on one side, what is the maximum rectangular area in m^{2}? | 450 | 0 | m^{2} | 2x + y = 60 gives A = x(60 − 2x), maximised at x = 15, y = 30, so A = 450 m^{2}.
M1#maths-u18-01-q2@1: Which part of an optimisation problem describes the choices being made? | The decision variables | The objective function value | The optimal value only | The sensitivity report | The feasible region's boundary | Decision variables are the unknowns we set; the objective and constraints are written in terms of them.
M2#maths-u18-01-q3@2: What does it mean if an optimisation problem is unbounded? | The objective can be improved without limit over the feasible set | No point satisfies all of the constraints | The optimum lies exactly on a boundary | Every feasible point gives the same value | The constraints are all nonlinear ones | Unbounded means feasible points exist but the objective has no finite best value.

## Unconstrained Optimisation
S: Unconstrained optimisation finds minima of a function over all of ℝⁿ. Calculus gives the conditions: the gradient vanishes at a minimum, and the Hessian matrix tells whether a stationary point is a minimum, maximum or saddle.
O: Find stationary points and classify them with the Hessian
O: State first- and second-order optimality conditions
T: Stationary point | A point where the gradient ∇f(x) = 0
T: Hessian matrix | The matrix of second partial derivatives, H_{ij} = ∂^{2}f/∂x_{i}∂x_{j}
H: Conditions
- First-order necessary: ∇f(x*) = 0 at a local minimum.
- Second-order necessary: H(x*) positive semidefinite.
- Second-order sufficient: ∇f = 0 and H positive definite give a strict local minimum.
- For convex f, any stationary point is a global minimum.
H: Classifying in two variables
- D = f_{xx}f_{yy} − f_{xy}^{2}.
- D > 0 and f_{xx} > 0: minimum. D > 0 and f_{xx} < 0: maximum.
- D < 0: saddle point. D = 0: test inconclusive.
- In general use the signs of the Hessian's eigenvalues.
H: In practice
- Closed-form solutions are rare; iterative methods are used (see Algorithms).
- Least squares: minimise ‖Ax − b‖^{2}, giving the normal equations AᵀAx = Aᵀb.
- Rosenbrock's function is a classic hard test, with a curved narrow valley.
- Scaling variables well makes problems easier.
X: Find and classify the stationary points of f(x, y) = x^{2} + xy + y^{2} − 3x.
> ∇f = (2x + y − 3, x + 2y) = 0 gives x = 2, y = −1
> Hessian [[2, 1], [1, 2]] has D = 4 − 1 = 3 > 0 and f_{xx} = 2 > 0
> So (2, −1) is a minimum, with f = 4 − 2 + 1 − 6 = −3
K: Minima have zero gradient and positive semidefinite Hessian; positive definite Hessian is sufficient; the discriminant classifies 2D points; convexity makes stationary points global.
!: Concluding a point is a minimum from ∇f = 0 alone.
Q: What does a negative-definite Hessian at a stationary point indicate? | A local maximum.
Q: What are the normal equations for least squares? | AᵀAx = Aᵀb.
SUM: Gradients find candidates.
SUM: Hessians classify them.
SRC: Nocedal J, Wright SJ, Numerical Optimization (2nd edn, Springer 2006) | textbook | 2006 | https://link.springer.com/
SRC: Luenberger DG, Ye Y, Linear and Nonlinear Programming (4th edn, Springer 2016) | textbook | 2016 | https://link.springer.com/
NUM1#maths-u18-02-q1@1: Find the minimum value of f(x) = x^{2} − 6x + 11. | 2 | 0 |  | f′(x) = 2x − 6 = 0 at x = 3, and f(3) = 9 − 18 + 11 = 2; f″ = 2 > 0 confirms a minimum.
M1#maths-u18-02-q2@1: For f(x, y) = x^{2} − y^{2}, what kind of point is the origin? | A saddle point, with D = −4 < 0 | A strict local minimum of f | A strict local maximum of f | A global minimum of the function | Not a stationary point at all | The Hessian diag(2, −2) has eigenvalues of both signs, so f rises one way and falls the other.
M2#maths-u18-02-q3@2: Why is a stationary point of a convex function a global minimum? | Convexity puts the graph above every tangent plane, so the flat tangent at that point lies below all values | Convex functions have no stationary points, so the question never arises in practice | Convex functions are always linear, so every point has the same objective value | Every stationary point of a convex function is a maximum, never a minimum | It is only a local minimum; convexity says nothing about other regions | f(y) ≥ f(x) + ∇f(x)ᵀ(y − x) = f(x) when ∇f(x) = 0.

## Constrained Optimisation
S: Most real problems have constraints: budgets, capacities, physical laws. Constrained optimisation finds the best point inside a feasible region, where the optimum often sits on the boundary and the gradient need not vanish.
O: Distinguish equality, inequality and bound constraints
O: Solve simple constrained problems by substitution and boundary checks
T: Active constraint | An inequality constraint holding with equality at a point, gᵢ(x) = 0
T: Penalty method | Replacing constraints by adding a cost for violating them to the objective
H: Types of constraint
- Equality h(x) = 0, inequality g(x) ≤ 0 and simple bounds l ≤ x ≤ u.
- The feasible set may be empty, bounded or unbounded.
- At the optimum, only active constraints matter locally.
- Inactive constraints could be removed without changing the local solution.
H: Approaches
- Substitution: eliminate variables using equality constraints.
- Lagrange multipliers for equalities; KKT conditions for inequalities.
- Penalty and barrier methods turn constrained into unconstrained problems.
- Projection: step, then map back onto the feasible set.
H: Checking boundaries
- On a closed interval [a, b], compare f at stationary points and endpoints.
- On polygons, check vertices and edges.
- The optimum of a linear objective over a polytope is at a vertex.
- Always check feasibility of candidate points.
X: Minimise f(x) = (x − 3)^{2} subject to 0 ≤ x ≤ 2.
> Unconstrained minimum x = 3 is infeasible
> f is decreasing on [0, 2], so check the endpoint x = 2
> Minimum f(2) = 1 at x = 2, where the constraint x ≤ 2 is active
K: Constraints shape the feasible set; optima often lie on the boundary with active constraints; substitution, multipliers, penalties and projection handle them.
!: Taking the unconstrained optimum without checking it's feasible.
Q: What is an active constraint? | One that holds with equality at the point.
Q: What does a penalty method do? | Adds a cost for violating constraints to the objective.
SUM: Constraints define the feasible set.
SUM: Optima often sit on the boundary.
SRC: Nocedal J, Wright SJ, Numerical Optimization (2nd edn, Springer 2006) | textbook | 2006 | https://link.springer.com/
SRC: Bertsekas DP, Nonlinear Programming (3rd edn, Athena Scientific 2016) | textbook | 2016 | http://www.athenasc.com/
NUM1#maths-u18-03-q1@1: Minimise f(x) = (x − 5)^{2} subject to 1 ≤ x ≤ 3. What is the minimum value? | 4 | 0 |  | The unconstrained minimiser 5 is infeasible; f decreases on [1, 3], so the minimum is f(3) = 4.
M1#maths-u18-03-q2@1: Where must the minimum of a linear function over a bounded polygon occur? | At a vertex of the polygon (possibly along a whole edge) | At the centroid of the polygon | Strictly inside the polygon | At the midpoint of the longest edge | Wherever the gradient equals zero | A linear objective improves steadily in one direction, so the best point is a corner.
M3#maths-u18-03-q3@2: Why can the gradient of the objective be non-zero at a constrained minimum? | Moving in the downhill direction would leave the feasible set, so the constraint blocks further improvement | Gradients are always zero at minima, so a non-zero gradient means a mistake | Constraints make the objective constant near the boundary of the feasible set | The gradient is undefined on boundaries, so its value there is arbitrary | It must be zero: every constrained minimum is also an unconstrained one | At a boundary optimum, −∇f points out of the feasible region.

## Lagrange Multipliers
S: Lagrange multipliers solve optimisation problems with equality constraints. At the optimum, the gradient of the objective is parallel to the gradient of the constraint, and the multiplier measures how much the optimum changes when the constraint is relaxed.
O: Solve equality-constrained problems with the Lagrangian
O: Interpret multipliers as shadow prices
T: Lagrangian | L(x, λ) = f(x) + λh(x) for a constraint h(x) = 0
T: Shadow price | The multiplier's value: the rate of change of the optimal objective as the constraint level changes
H: Method
- Form L = f + λh (or f − λh; conventions differ).
- Solve ∇ₓL = 0 and h(x) = 0 together.
- Geometrically, ∇f is parallel to ∇h at the optimum: level curves of f touch the constraint.
- With several constraints, add one multiplier per constraint.
H: Interpretation
- If the constraint is g(x) = c, then dƒ*/dc = λ (with L = f − λ(g − c)).
- Economics: λ is the marginal value of an extra unit of a resource.
- Physics: multipliers are constraint forces.
H: Cautions
- Candidates still need checking: compare values or use second-order conditions.
- A constraint qualification (∇h ≠ 0) is needed.
- Inequalities need the KKT conditions instead.
- On unbounded constraint sets a minimum may not exist.
X: Maximise f = xy subject to x + y = 10.
> L = xy − λ(x + y − 10); ∂L/∂x = y − λ = 0 and ∂L/∂y = x − λ = 0
> So x = y = λ, and x + y = 10 gives x = y = 5
> Maximum f = 25, with λ = 5: raising the total to 11 increases the maximum by about 5
K: At an equality-constrained optimum ∇f = λ∇h; solve ∇L = 0 with the constraint; λ is the shadow price of the constraint; check candidates and qualifications.
!: Forgetting to include the constraint equation itself when solving.
Q: What is the geometric meaning of the Lagrange condition? | ∇f is parallel to ∇h.
Q: What does λ measure in economics? | The marginal value of the constrained resource.
SUM: Multipliers handle equality constraints.
SUM: They are shadow prices.
SRC: Bertsekas DP, Nonlinear Programming (3rd edn, Athena Scientific 2016) | textbook | 2016 | http://www.athenasc.com/
SRC: Stewart J, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.com/
NUM1#maths-u18-04-q1@1: Maximise xy subject to x + y = 16. What is the maximum value? | 64 | 0 |  | The Lagrange conditions give x = y = 8, so the maximum is 8 × 8 = 64.
M1#maths-u18-04-q2@1: What condition holds at the optimum of f subject to h(x) = 0? | ∇f(x) = −λ∇h(x) for some multiplier λ | ∇f(x) = 0 and ∇h(x) = 0 together | f(x) = h(x) at the optimal point | ∇f is perpendicular to ∇h there | λ must equal zero at the optimum | The objective's gradient must lie along the constraint's normal, so no feasible move improves f.
M2#maths-u18-04-q3@2: If the optimal cost is 200 and the budget constraint's multiplier is 3, roughly what happens if the budget rises by 1 unit? | The optimal objective changes by about 3 | The optimal objective changes by about 200 | The optimum stays exactly the same | The problem becomes infeasible | The multiplier becomes zero | The multiplier is the derivative of the optimal value with respect to the constraint level.

## Karush–Kuhn–Tucker Conditions
S: The KKT conditions extend Lagrange multipliers to inequality constraints. They add sign conditions and complementary slackness: a multiplier can be positive only if its constraint is active. For convex problems they are both necessary and sufficient.
O: Write the KKT conditions for a problem with inequalities
O: Use complementary slackness to find optimal points
T: Complementary slackness | μᵢgᵢ(x*) = 0: each inequality multiplier is zero unless its constraint is active
T: Dual feasibility | μᵢ ≥ 0 for inequality constraints gᵢ(x) ≤ 0
H: The conditions (minimise f subject to gᵢ ≤ 0, hⱼ = 0)
- Stationarity: ∇f + Σ μᵢ∇gᵢ + Σ λⱼ∇hⱼ = 0.
- Primal feasibility: gᵢ(x) ≤ 0, hⱼ(x) = 0.
- Dual feasibility: μᵢ ≥ 0.
- Complementary slackness: μᵢgᵢ(x) = 0.
H: When they apply
- Necessary at a local minimum under a constraint qualification (such as LICQ or Slater's condition).
- Sufficient for convex problems: any KKT point is a global minimum.
- Karush (1939), then Kuhn and Tucker (1951).
H: Solving by cases
- Guess which constraints are active, solve, then check signs and feasibility.
- Each pattern of active constraints is a case.
- Algorithms like active-set and interior-point methods automate this.
- Support vector machines are derived from the KKT conditions.
X: Minimise x^{2} subject to x ≥ 1, written as g(x) = 1 − x ≤ 0.
> Stationarity: 2x − μ = 0. Complementary slackness: μ(1 − x) = 0
> Case μ = 0 gives x = 0, which is infeasible; so the constraint is active, x = 1
> Then μ = 2 ≥ 0 ✓, so x* = 1 with minimum value 1
K: KKT conditions are stationarity, primal and dual feasibility and complementary slackness; they need a constraint qualification; for convex problems they are sufficient.
!: Allowing negative multipliers for ≤ constraints in a minimisation.
Q: What does complementary slackness say? | Each multiplier is zero unless its constraint is active.
Q: Are the KKT conditions sufficient for convex problems? | Yes.
SUM: KKT handles inequalities.
SUM: Complementary slackness picks the active set.
SRC: Kuhn HW, Tucker AW, Nonlinear programming, Proceedings of the Second Berkeley Symposium, 481 | journal | 1951 | https://projecteuclid.org/
SRC: Boyd S, Vandenberghe L, Convex Optimization (Cambridge University Press 2004) | textbook | 2004 | https://web.stanford.edu/~boyd/cvxbook/
NUM1#maths-u18-05-q1@1: Minimise x^{2} subject to x ≥ 3. What is the KKT multiplier μ at the optimum? | 6 | 0 |  | The constraint is active at x = 3, and stationarity 2x − μ = 0 gives μ = 6 ≥ 0.
M1#maths-u18-05-q2@1: Which condition is part of the KKT conditions but not the Lagrange conditions? | Complementary slackness μᵢgᵢ(x) = 0 | Stationarity of the Lagrangian in x | Feasibility of the equality constraints | Differentiability of the objective | Continuity of the constraint functions | Complementary slackness and sign conditions are what inequality constraints add.
M3#maths-u18-05-q3@2: Why must the multiplier of an inactive constraint be zero? | An inactive constraint has slack, so small moves don't touch it and it can't influence the optimum | Inactive constraints are always violated, so their multiplier is set to zero | The multiplier of an inactive constraint would otherwise become infinite | Inactive constraints are really equality constraints in disguise | It needn't be zero: inactive constraints usually have the largest multipliers | Removing a slack constraint leaves the local solution unchanged, so its shadow price is zero.

## Convex Optimisation
S: In convex optimisation the objective is convex and the feasible set is convex. This structure means every local minimum is global, duality is strong, and efficient algorithms can solve huge problems reliably, so recognising convexity is a key modelling skill.
O: Recognise convex functions and convex sets
O: Use duality and the hierarchy of convex problem classes
T: Convex function | f(θx + (1 − θ)y) ≤ θf(x) + (1 − θ)f(y) for all x, y and 0 ≤ θ ≤ 1
T: Lagrange dual | The problem of maximising the dual function g(μ, λ) = inf over x of the Lagrangian, which bounds the primal optimum from below
H: Recognising convexity
- Convex: linear functions, x^{2}, eˣ, −log x, norms, max of convex functions.
- Twice differentiable f is convex iff its Hessian is positive semidefinite everywhere.
- Operations preserving convexity: non-negative sums, composition with affine maps, pointwise maximum.
- Sets: half-spaces, balls, polyhedra and intersections of convex sets.
H: Problem classes
- LP ⊂ QP ⊂ SOCP ⊂ SDP: linear, quadratic, second-order cone and semidefinite programming.
- Modelling tools (CVX, CVXPY) check convexity by disciplined rules.
- Interior-point methods solve them in polynomial time.
H: Duality
- Weak duality: dual value ≤ primal value, always.
- Strong duality (equality) holds under Slater's condition (a strictly feasible point).
- Dual variables give sensitivity and certificates of optimality.
- The duality gap measures how far a candidate is from optimal.
X: Is f(x, y) = x^{2} + 2xy + 3y^{2} convex?
> Hessian = [[2, 2], [2, 6]]
> Leading minors: 2 > 0 and 2 × 6 − 4 = 8 > 0, so it's positive definite
> So f is (strictly) convex
K: Convex problems have convex objectives and feasible sets; local minima are global; LP, QP, SOCP and SDP are convex classes; strong duality holds under Slater's condition.
!: Thinking a function with one minimum must be convex.
Q: Is the maximum of two convex functions convex? | Yes.
Q: What does weak duality state? | The dual optimum is a lower bound on the primal optimum.
SUM: Convexity makes optimisation tractable.
SUM: Duality gives bounds and certificates.
SRC: Boyd S, Vandenberghe L, Convex Optimization (Cambridge University Press 2004) | textbook | 2004 | https://web.stanford.edu/~boyd/cvxbook/
SRC: Rockafellar RT, Convex Analysis (Princeton University Press 1970) | textbook | 1970 | https://press.princeton.edu/
NUM1#maths-u18-06-q1@1: A minimisation problem has primal optimum 10 and dual optimum 7. What is the duality gap? | 3 | 0 |  | The duality gap is primal minus dual, 10 − 7 = 3; strong duality would make it zero.
M1#maths-u18-06-q2@1: Which function is convex on ℝ? | f(x) = eˣ | f(x) = sin x | f(x) = −x^{2} | f(x) = x^{3} | f(x) = log x | eˣ has second derivative eˣ > 0 everywhere, so it is convex.
M2#maths-u18-06-q3@2: What does Slater's condition guarantee for a convex problem? | Strong duality: the primal and dual optimal values are equal | That the problem has integer solutions | That every point is optimal | That the dual is unbounded | That the objective is linear | A strictly feasible point closes the duality gap for convex problems.

## Nonconvex Optimisation
S: Nonconvex problems can have many local minima, saddle points and flat regions, so finding the global optimum is generally hard. They are everywhere, from protein folding to training neural networks, and practitioners combine local methods, restarts and global strategies.
O: Explain why nonconvex problems are hard
O: Describe local, global and heuristic strategies for nonconvex problems
T: Local minimum | A point better than all nearby points but not necessarily the best overall
T: Global optimisation | Methods aiming to find or certify the best solution over the whole feasible set
H: Difficulties
- Many local minima: a descent method finds whichever is nearest.
- Saddle points: common in high dimensions, and slow down gradient methods.
- General nonconvex problems are NP-hard, even quadratic ones.
- Certificates of global optimality are rarely available.
H: Strategies
- Multi-start local search from many random initial points.
- Branch and bound with convex relaxations (spatial branch and bound).
- Metaheuristics: simulated annealing, genetic algorithms (see Algorithms).
- Reformulation: convex relaxations, changes of variable.
H: Neural networks
- Training losses are highly nonconvex, yet stochastic gradient descent finds good solutions.
- Over-parameterisation makes many local minima nearly as good as global ones.
- Noise in stochastic gradients helps escape saddle points.
- Theory explaining this is an active research area.
X: Find the local minima of f(x) = x^{4} − 4x^{2} + x and say which is global.
> f′(x) = 4x^{3} − 8x + 1 = 0 has roots near x ≈ −1.47, 0.13 and 1.35
> f″ > 0 at −1.47 and 1.35 (minima); f″ < 0 at 0.13 (maximum)
> f(−1.47) ≈ −5.44 and f(1.35) ≈ −2.62, so x ≈ −1.47 is the global minimum
K: Nonconvex problems have multiple local minima and saddles and are often NP-hard; multi-start, branch and bound, relaxations and metaheuristics help; deep learning is nonconvex yet trainable.
!: Assuming a local optimiser's answer is the global optimum.
Q: Are general nonconvex quadratic programs easy? | No: they are NP-hard.
Q: What is multi-start? | Running a local method from many starting points.
SUM: Nonconvexity creates many local optima.
SUM: Global methods and heuristics help.
SRC: Floudas CA, Deterministic Global Optimization (Springer 2000) | textbook | 2000 | https://link.springer.com/
SRC: Goodfellow I, Bengio Y, Courville A, Deep Learning (MIT Press 2016) | textbook | 2016 | https://www.deeplearningbook.org/
NUM1#maths-u18-07-q1@1: How many local minima does f(x) = x^{4} − 4x^{2} + x have? | 2 | 0 |  | f′ has three real roots: two are minima (near −1.47 and 1.35) and the middle one is a maximum.
M1#maths-u18-07-q2@1: Why might gradient descent on a nonconvex function return a poor answer? | It converges to whichever local minimum is nearest its starting point | It always diverges on nonconvex functions, whatever the step | It can only find maxima, never minima, of nonconvex functions | It needs the function to be linear before it can take a step | It never stops moving, since the gradient is never zero | Local methods follow the slope downhill and stop at the first minimum reached.
M2#maths-u18-07-q3@2: Which technique gives a certified global optimum for small nonconvex problems? | Spatial branch and bound with convex relaxations | A single run of gradient descent | Random sampling of one point | Simulated annealing with fast cooling | Newton's method from the origin | Relaxations give lower bounds that prune regions until the gap closes.

## Nonlinear Programming
S: Nonlinear programming (NLP) covers problems where the objective or constraints are nonlinear functions. It sits between linear programming and general global optimisation, and methods such as sequential quadratic programming and interior-point solvers handle thousands of variables.
O: Formulate nonlinear programs and identify their structure
O: Describe SQP, interior-point and augmented Lagrangian methods
T: Sequential quadratic programming | SQP: solving a sequence of quadratic programs that approximate the NLP near the current point
T: Augmented Lagrangian | A Lagrangian plus a quadratic penalty, L + (ρ/2)‖h(x)‖^{2}, combining multiplier and penalty ideas
H: Formulation
- Minimise f(x) subject to g(x) ≤ 0 and h(x) = 0 with smooth nonlinear f, g, h.
- Examples: portfolio risk, chemical process design, trajectory planning.
- Solutions satisfy KKT conditions under constraint qualifications.
- Convex NLPs are easier; nonconvex ones give local solutions.
H: Methods
- SQP: Newton's method on the KKT conditions; fast local convergence.
- Interior-point (barrier) methods: IPOPT, used widely in engineering.
- Augmented Lagrangian (method of multipliers) and ADMM.
- Penalty methods are simple but can be ill-conditioned.
H: Practical issues
- Good starting points matter for nonconvex NLPs.
- Derivatives come from automatic differentiation in modelling languages (AMPL, JuMP, Pyomo).
- Scaling and constraint qualification failures cause trouble.
- Globalisation strategies (line searches, trust regions) ensure progress.
X: For a quadratic penalty method on minimise x subject to x = 1, find the minimiser of x + (ρ/2)(x − 1)^{2}.
> Derivative: 1 + ρ(x − 1) = 0
> x = 1 − 1/ρ
> As ρ → ∞, x → 1; but large ρ makes the problem ill-conditioned, which augmented Lagrangians avoid
K: NLPs have nonlinear objective or constraints; SQP, interior-point and augmented Lagrangian methods solve them; KKT conditions characterise solutions; modelling tools supply derivatives.
!: Pushing penalty parameters to huge values instead of using multiplier updates.
Q: What does SQP solve at each step? | A quadratic programming approximation.
Q: Name a widely used interior-point NLP solver. | IPOPT.
SUM: NLP handles smooth nonlinear models.
SUM: SQP and interior points are the workhorses.
SRC: Nocedal J, Wright SJ, Numerical Optimization (2nd edn, Springer 2006) | textbook | 2006 | https://link.springer.com/
SRC: Wächter A, Biegler LT, On the implementation of an interior-point filter line-search algorithm for large-scale nonlinear programming, Mathematical Programming 106, 25 | journal | 2006 | https://doi.org/10.1007/s10107-004-0559-y
NUM1#maths-u18-08-q1@1: For the penalty problem x + (ρ/2)(x − 1)^{2} with ρ = 20, what is the minimiser x? | 0.95 | 0.001 |  | x = 1 − 1/ρ = 1 − 0.05 = 0.95, which approaches the true solution 1 as ρ grows.
M1#maths-u18-08-q2@1: Which method solves an NLP by repeatedly solving quadratic programming subproblems? | Sequential quadratic programming | The simplex algorithm on a linear model | Branch and bound on integer variables | Dynamic programming over stages | A genetic algorithm on random points | SQP applies Newton-type steps to the KKT conditions through QP approximations.
M2#maths-u18-08-q3@2: Why are augmented Lagrangian methods preferred to pure penalty methods? | They reach feasibility with moderate penalty parameters, avoiding ill-conditioning | They need no derivatives of any kind, unlike penalty methods | They always find global optima, even for nonconvex problems | They only work for linear problems, where penalties are exact | They ignore the constraints, so the subproblems are simpler | Multiplier updates do the work that would otherwise need a huge penalty weight.

## Quadratic Programming
S: Quadratic programming minimises a quadratic objective subject to linear constraints. It models portfolio selection, least squares with constraints and support vector machines, and convex QPs can be solved almost as efficiently as linear programs.
O: Write problems in standard QP form
O: Solve small QPs and recognise convex QPs
T: Quadratic program | Minimise ½xᵀQx + cᵀx subject to Ax ≤ b (and possibly Ex = d)
T: Positive semidefinite matrix | A symmetric Q with xᵀQx ≥ 0 for all x; it makes the QP convex
H: Structure
- Convex when Q is positive semidefinite; then KKT conditions are sufficient.
- Unconstrained: solve Qx = −c.
- Equality constraints only: solve one linear KKT system.
- With Q indefinite, the QP is nonconvex and NP-hard in general.
H: Applications
- Markowitz portfolio: minimise risk wᵀΣw subject to expected return and budget.
- Constrained least squares and model predictive control.
- Support vector machines: maximise the margin via a QP.
H: Algorithms
- Active-set methods (good for small, warm-started problems).
- Interior-point methods (large problems).
- First-order methods like OSQP for embedded use.
- QPs are the subproblems inside SQP.
X: Minimise x^{2} + y^{2} subject to x + y = 2.
> KKT: 2x = λ, 2y = λ, so x = y
> x + y = 2 gives x = y = 1
> Minimum value 2: the closest point to the origin on the line
K: QPs have quadratic objectives and linear constraints; positive semidefinite Q makes them convex; they model portfolios, SVMs and control; active-set and interior-point methods solve them.
!: Treating every QP as convex without checking Q.
Q: When is a QP convex? | When Q is positive semidefinite.
Q: Which machine learning model is trained by solving a QP? | The support vector machine.
SUM: QPs combine quadratic cost with linear constraints.
SUM: Convex QPs are efficiently solvable.
SRC: Nocedal J, Wright SJ, Numerical Optimization (2nd edn, Springer 2006) | textbook | 2006 | https://link.springer.com/
SRC: Markowitz H, Portfolio selection, Journal of Finance 7(1), 77 | journal | 1952 | https://doi.org/10.1111/j.1540-6261.1952.tb01525.x
NUM1#maths-u18-09-q1@1: Minimise x^{2} + y^{2} subject to x + y = 6. What is the minimum value? | 18 | 0 |  | Symmetry and the KKT conditions give x = y = 3, so the minimum is 9 + 9 = 18.
M1#maths-u18-09-q2@1: Which QP is guaranteed to be convex? | One whose matrix Q is positive semidefinite | One whose matrix Q has a negative eigenvalue | One with more constraints than variables | One with integer-valued variables | One whose objective has no linear term | Positive semidefinite Q makes the quadratic objective convex.
M2#maths-u18-09-q3@2: In the Markowitz portfolio QP, what does the quadratic term wᵀΣw represent? | The variance (risk) of the portfolio's return | The expected return of the portfolio | The number of assets held | The transaction costs paid | The budget constraint | Σ is the covariance matrix, so wᵀΣw is the variance of the weighted return.

## Multiobjective Optimisation
S: Many decisions involve several conflicting goals, such as cost against quality or profit against emissions. Multiobjective optimisation finds the Pareto front of trade-offs where no goal can improve without another getting worse, and leaves the final choice to the decision-maker.
O: Identify Pareto-optimal solutions
O: Use weighted-sum and ε-constraint methods
T: Pareto optimal | A solution where no objective can be improved without worsening at least one other
T: Pareto front | The set of objective values of all Pareto-optimal solutions
H: Dominance
- x dominates y if it's at least as good in every objective and strictly better in one.
- Pareto-optimal points are those dominated by no feasible point.
- The front shows the best possible trade-offs.
- Choosing among Pareto points needs preferences.
H: Methods
- Weighted sum: minimise Σ wᵢfᵢ; finds only convex parts of the front.
- ε-constraint: minimise one objective with bounds fᵢ ≤ εᵢ on the others; finds non-convex parts too.
- Goal programming: minimise deviations from targets.
- Evolutionary methods (NSGA-II) approximate the whole front.
H: Applications
- Engineering design (weight against strength).
- Portfolio selection (return against risk: the efficient frontier).
- Environmental planning and healthcare resource decisions.
X: Which of A = (cost 3, emissions 5), B = (4, 4), C = (5, 5) and D = (2, 7) are Pareto optimal (minimising both)?
> C is dominated by B (4 ≤ 5 and 4 ≤ 5, strictly better in both)
> A, B and D: none is better in both objectives than another
> Pareto optimal: A, B and D
K: Pareto optimality means no objective can improve without another worsening; weighted sums miss non-convex parts of the front; ε-constraints and evolutionary methods map it.
!: Thinking a single "optimal" answer exists without stating preferences.
Q: What is the Pareto front? | The set of best achievable trade-offs between objectives.
Q: Which method can find non-convex parts of the front? | The ε-constraint method.
SUM: Conflicting goals give trade-off curves.
SUM: Pareto points are undominated.
SRC: Ehrgott M, Multicriteria Optimization (2nd edn, Springer 2005) | textbook | 2005 | https://link.springer.com/
SRC: Deb K, Pratap A, Agarwal S, Meyarivan T, A fast and elitist multiobjective genetic algorithm: NSGA-II, IEEE Transactions on Evolutionary Computation 6(2), 182 | journal | 2002 | https://doi.org/10.1109/4235.996017
NUM1#maths-u18-10-q1@1: Of the points (1, 9), (3, 6), (4, 7), (6, 2) and (7, 3), minimising both coordinates, how many are Pareto optimal? | 3 | 0 |  | (4, 7) is dominated by (3, 6) and (7, 3) by (6, 2), leaving (1, 9), (3, 6) and (6, 2).
M1#maths-u18-10-q2@1: What does it mean for solution x to dominate solution y? | x is no worse in every objective and strictly better in at least one | x is better in exactly one objective | x has a lower weighted sum for some weights | x and y lie on the same front | x is feasible and y isn't | Dominance requires no losses and at least one gain.
M3#maths-u18-10-q3@2: Why can the weighted-sum method miss some Pareto-optimal points? | It only reaches points on the convex hull of the front, so points in non-convex dents are never optimal for any weights | It always returns infeasible points, which can't lie on the Pareto front at all | Its weights must be negative, so it searches in the wrong direction entirely | It doesn't miss any: weighted sums find every point on the front for some weights | It works only with one objective, so a second objective is simply ignored | Minimising a weighted sum is minimising a linear function, which favours the front's convex hull.

## Stochastic Optimisation
S: Stochastic optimisation handles problems where data are random or the objective is only observed with noise. It optimises expected outcomes or uses random sampling, and stochastic gradient descent, its best-known method, trains almost every modern machine learning model.
O: Formulate expected-value and two-stage stochastic programs
O: Explain sample average approximation and stochastic gradient methods
T: Two-stage stochastic program | Choose first-stage decisions now, then recourse decisions after uncertainty is revealed, minimising expected total cost
T: Sample average approximation | Replacing an expectation by an average over sampled scenarios
H: Formulations
- Minimise E[F(x, ξ)] where ξ is random.
- Two-stage: buy capacity now, then adjust once demand is known.
- Chance constraints: P(g(x, ξ) ≤ 0) ≥ 1 − α.
- The value of the stochastic solution measures the gain over planning with averages.
H: Methods
- Sample average approximation (SAA): solve the deterministic problem on N scenarios.
- Stochastic approximation (Robbins–Monro 1951): noisy gradient steps with decreasing step sizes.
- Stochastic gradient descent: use gradients on random mini-batches.
- Scenario trees for multistage problems.
H: Step sizes
- Robbins–Monro conditions: Σ αₖ = ∞ and Σ αₖ^{2} < ∞, such as αₖ = 1/k.
- Constant steps converge only to a neighbourhood.
- Averaging iterates (Polyak–Ruppert) reduces noise.
X: A newsvendor buys at £3 and sells at £5; demand is 10 or 20 with equal probability. Compare ordering 10 or 20.
> Order 10: sells 10 always, profit 50 − 30 = £20
> Order 20: profit 50 − 60 = −£10 if demand 10, or 100 − 60 = £40 if 20; expected £15
> Ordering 10 has higher expected profit (£20 vs £15)
K: Stochastic optimisation optimises expectations or probabilities under uncertainty; two-stage programs model recourse; SAA and stochastic gradients solve them; step sizes must decrease suitably.
!: Planning with average demand and assuming the expected cost is the same.
Q: What does SAA replace an expectation with? | An average over sampled scenarios.
Q: Give step sizes satisfying the Robbins–Monro conditions. | αₖ = 1/k.
SUM: Optimise under randomness.
SUM: Sampling and noisy gradients do the work.
SRC: Shapiro A, Dentcheva D, Ruszczyński A, Lectures on Stochastic Programming (3rd edn, SIAM 2021) | textbook | 2021 | https://epubs.siam.org/
SRC: Robbins H, Monro S, A stochastic approximation method, Annals of Mathematical Statistics 22(3), 400 | journal | 1951 | https://doi.org/10.1214/aoms/1177729586
NUM1#maths-u18-11-q1@1: In the newsvendor example (cost £3, price £5, demand 10 or 20 equally likely), what is the expected profit in £ of ordering 15? | 17.5 | 0.01 | £ | Demand 10 gives 50 − 45 = £5 and demand 20 gives 75 − 45 = £30, so the average is £17.50, still below ordering 10.
M1#maths-u18-11-q2@1: Which step-size sequence satisfies the Robbins–Monro conditions? | αₖ = 1/k | αₖ = 1/k^{2} | αₖ = 0.1 for every k | αₖ = k | αₖ = 2^{−k} | Σ 1/k diverges while Σ 1/k^{2} converges, as the conditions require.
M2#maths-u18-11-q3@2: What is a recourse decision in a two-stage stochastic program? | An adjustment made after the uncertain data are revealed | A decision made before any planning starts | A constraint that can never be relaxed | The expected value of the objective | A random sample of scenarios | Recourse lets the second stage react to the realised scenario.

## Robust Optimisation
S: Robust optimisation protects against the worst case within a set of possible data values, rather than averaging. It gives solutions that stay feasible for every scenario in an uncertainty set, which suits safety-critical design and problems without reliable probabilities.
O: Formulate robust counterparts with uncertainty sets
O: Compare robust and stochastic approaches
T: Uncertainty set | The set U of data values the solution must withstand, such as a box or ellipsoid
T: Robust counterpart | The problem requiring constraints to hold for every data value in U
H: Formulation
- Minimise max over u ∈ U of f(x, u), subject to g(x, u) ≤ 0 for all u ∈ U.
- Box uncertainty: each coefficient in an interval.
- Ellipsoidal uncertainty: leads to second-order cone programs.
- Budgeted uncertainty (Bertsimas–Sim): only Γ coefficients deviate at once.
H: Tractability
- A robust linear constraint with box uncertainty becomes a linear constraint with absolute values.
- Ellipsoids give SOCPs, polyhedra give LPs.
- Robust problems stay convex when the original is.
H: Trade-offs
- The price of robustness: worse nominal objective for protection.
- Robust ignores probabilities; stochastic needs them.
- Distributionally robust optimisation hedges over a set of distributions.
- Adjustable robust optimisation allows recourse decisions.
X: Make x₁ + a x₂ ≤ 10 robust for a ∈ [1, 3], with x₂ ≥ 0.
> The worst case is the largest a, since x₂ ≥ 0
> Robust constraint: x₁ + 3x₂ ≤ 10
> This holds for every a in [1, 3], at the cost of a smaller feasible set
K: Robust optimisation guards against the worst case in an uncertainty set; box, ellipsoid and budget sets keep it tractable; it trades nominal performance for protection.
!: Choosing an uncertainty set so large that the solution becomes useless.
Q: What problem class does ellipsoidal uncertainty in an LP lead to? | A second-order cone program.
Q: What is the price of robustness? | The loss in nominal objective from protecting against uncertainty.
SUM: Robust means safe in the worst case.
SUM: Uncertainty sets keep it tractable.
SRC: Ben-Tal A, El Ghaoui L, Nemirovski A, Robust Optimization (Princeton University Press 2009) | textbook | 2009 | https://press.princeton.edu/
SRC: Bertsimas D, Sim M, The price of robustness, Operations Research 52(1), 35 | journal | 2004 | https://doi.org/10.1287/opre.1030.0065
NUM1#maths-u18-12-q1@1: With the robust constraint x₁ + 3x₂ ≤ 10 and x₁ = 4, what is the largest feasible x₂? | 2 | 0 |  | 4 + 3x₂ ≤ 10 gives x₂ ≤ 2, the most allowed so that every a in [1, 3] is safe.
M1#maths-u18-12-q2@1: What does robust optimisation require of its solution? | Feasibility for every data value in the uncertainty set | Feasibility only for the average data | Feasibility with probability 0.5 | Optimality for one sampled scenario | Feasibility for most scenarios only | Robust counterparts impose constraints for all u ∈ U.
M2#maths-u18-12-q3@2: When is robust optimisation preferable to stochastic programming? | When probabilities are unknown or unreliable and failures must be avoided | When probability distributions are known exactly | When there is no uncertainty at all | When the problem has no constraints | It is never preferable | Robust methods need only an uncertainty set, not a distribution.

## Optimal Control
S: Optimal control chooses inputs to a dynamical system over time to minimise a cost, such as steering a rocket with least fuel. Pontryagin's maximum principle and dynamic programming give the conditions, and the linear–quadratic regulator gives explicit feedback laws.
O: Formulate optimal control problems with dynamics, controls and costs
O: Describe Pontryagin's principle, the Hamilton–Jacobi–Bellman equation and LQR
T: Pontryagin's maximum principle | Necessary conditions: the optimal control optimises a Hamiltonian H(x, u, p) at each time, with costate p
T: Linear–quadratic regulator | LQR: linear dynamics with quadratic cost, solved by state feedback u = −Kx
H: Formulation
- State x(t), control u(t), dynamics ẋ = f(x, u).
- Minimise J = ∫ L(x, u) dt + terminal cost.
- Constraints on controls (bounded thrust) and states.
H: Conditions
- Pontryagin (1956): costate equations ṗ = −∂H/∂x and optimisation of H in u.
- Bang-bang control: with bounded linear controls, the optimum often switches between extremes.
- Hamilton–Jacobi–Bellman equation: dynamic programming in continuous time.
- Model predictive control solves a finite-horizon problem repeatedly.
H: LQR
- ẋ = Ax + Bu, J = ∫ (xᵀQx + uᵀRu) dt.
- Optimal u = −R^{−1}BᵀPx, where P solves the algebraic Riccati equation.
- Used in aerospace, robotics and process control.
X: For ẋ = u with cost ∫₀^{∞} (x^{2} + u^{2}) dt, find the LQR feedback.
> A = 0, B = 1, Q = 1, R = 1; the Riccati equation AP + PA − PBR^{−1}BP + Q = 0 gives −P^{2} + 1 = 0
> P = 1 (the positive root)
> u = −R^{−1}BPx = −x: feed back the state with gain 1
K: Optimal control minimises a cost over trajectories; Pontryagin's principle and HJB give conditions; bounded controls are often bang-bang; LQR gives linear feedback via the Riccati equation.
!: Ignoring control limits, which can make "optimal" commands impossible to implement.
Q: What equation does P satisfy in infinite-horizon LQR? | The algebraic Riccati equation.
Q: What is bang-bang control? | Switching between the extreme control values.
SUM: Control chooses inputs over time.
SUM: LQR gives linear feedback.
SRC: Kirk DE, Optimal Control Theory: An Introduction (Prentice Hall 1970; Dover 2004) | textbook | 2004 | https://store.doverpublications.com/
SRC: Bertsekas DP, Dynamic Programming and Optimal Control (4th edn, Athena Scientific 2017) | textbook | 2017 | http://www.athenasc.com/
NUM1#maths-u18-13-q1@1: For ẋ = u with cost ∫ (4x^{2} + u^{2}) dt, the Riccati equation gives −P^{2} + 4 = 0. What is the feedback gain K in u = −Kx? | 2 | 0 |  | P = 2 (positive root) and K = R^{−1}BP = 2, so u = −2x.
M1#maths-u18-13-q2@1: Which equation is the continuous-time dynamic programming condition for optimal control? | The Hamilton–Jacobi–Bellman equation | The heat equation | The Navier–Stokes equation | The wave equation | Laplace's equation | HJB is a PDE for the value function, from Bellman's principle of optimality.
M3#maths-u18-13-q3@2: Why are optimal controls with bounded inputs often bang-bang? | When the Hamiltonian is linear in u, it's optimised at an extreme of the allowed range | Controls must be discontinuous by law in engineering standards | Smooth controls are always infeasible when inputs are bounded | The cost function forbids zero control at every moment | They are never bang-bang; optimal controls are always smooth | A linear function of u on an interval is minimised at an endpoint, so the control switches between limits.

## Linear Programming
S: Linear programming optimises a linear objective subject to linear inequalities. Developed in the 1940s for military logistics, it now plans production, blends fuels and schedules airlines, and its feasible regions are polyhedra whose corners hold the optimum.
O: Formulate and graphically solve two-variable linear programs
O: Use LP duality and interpret dual values
T: Linear program | Minimise or maximise cᵀx subject to Ax ≤ b and x ≥ 0 (or other linear constraints)
T: LP duality | Every LP has a dual LP with the same optimal value when either has a finite optimum
H: Formulation
- Decision variables, a linear objective and linear constraints.
- Standard form: maximise cᵀx subject to Ax ≤ b, x ≥ 0.
- Outcomes: a unique optimum, multiple optima, infeasible, or unbounded.
- The feasible region is a convex polyhedron.
H: Graphical method (two variables)
- Plot constraints and shade the feasible region.
- Evaluate the objective at every vertex (or slide the objective line).
- The best vertex is optimal (fundamental theorem of LP).
H: Duality
- Primal max cᵀx, Ax ≤ b, x ≥ 0 has dual min bᵀy, Aᵀy ≥ c, y ≥ 0.
- Weak duality: any feasible primal value ≤ any feasible dual value.
- Strong duality: optimal values are equal.
- Dual values are shadow prices of the resources.
X: Maximise 3x + 2y subject to x + y ≤ 4, x + 3y ≤ 6, x, y ≥ 0.
> Vertices: (0, 0), (4, 0), (0, 2) and the intersection of x + y = 4 with x + 3y = 6, which is (3, 1)
> Objective values: 0, 12, 4 and 11
> The optimum is 12 at (4, 0)
K: LPs optimise linear objectives over polyhedra; optima occur at vertices; graphs solve 2D cases; every LP has a dual with equal optimal value and shadow-price interpretation.
!: Checking only intersection points that lie outside the feasible region.
Q: Where does an LP's optimum occur, if it exists? | At a vertex of the feasible region (possibly along an edge too).
Q: What does weak duality say for a maximisation primal? | Every feasible primal value is at most every feasible dual value.
SUM: LPs optimise over polyhedra.
SUM: Duality gives bounds and prices.
SRC: Dantzig GB, Thapa MN, Linear Programming 1: Introduction (Springer 1997) | textbook | 1997 | https://link.springer.com/
SRC: Vanderbei RJ, Linear Programming: Foundations and Extensions (5th edn, Springer 2020) | textbook | 2020 | https://link.springer.com/
NUM1#maths-u18-14-q1@1: Maximise 2x + 5y subject to x + y ≤ 4, x + 3y ≤ 6, x, y ≥ 0. What is the optimal value? | 11 | 0 |  | The vertices (0, 0), (4, 0), (0, 2) and (3, 1) give 0, 8, 10 and 11, so the optimum is 11.
M1#maths-u18-14-q2@1: What is the dual of maximise cᵀx subject to Ax ≤ b, x ≥ 0? | Minimise bᵀy subject to Aᵀy ≥ c, y ≥ 0 | Maximise bᵀy subject to Aᵀy ≤ c, y ≥ 0 | Minimise cᵀy subject to Ay ≥ b, y ≥ 0 | Maximise cᵀx subject to Ax ≥ b | Minimise bᵀx subject to x ≥ 0 only | Each primal constraint gives a dual variable and each primal variable a dual constraint.
M2#maths-u18-14-q3@2: What does a positive dual value for a resource constraint indicate? | The resource is fully used, and one more unit would raise the optimum by about that value | The resource is unused and plentiful at the optimum | The problem has no feasible solution at all | The primal objective can grow without limit | The constraint can be deleted without any effect | Complementary slackness: positive shadow prices go with binding constraints.

## Simplex Algorithm
S: The simplex algorithm, invented by George Dantzig in 1947, solves linear programs by moving from vertex to neighbouring vertex, improving the objective each step. It is exponential in the worst case but remarkably fast in practice and still underpins commercial solvers.
O: Perform simplex pivots on a tableau
O: Recognise optimality, unboundedness and degeneracy
T: Basic feasible solution | A vertex of the feasible region, obtained by setting non-basic variables to zero
T: Pivot | Swapping an entering variable into the basis and a leaving variable out, moving to an adjacent vertex
H: The method
- Add slack variables to turn ≤ into equalities.
- Start at a basic feasible solution (often the origin).
- Entering variable: one with a positive reduced cost (for maximisation).
- Leaving variable: the minimum ratio test keeps the solution feasible.
H: Stopping
- Optimal when no reduced cost can improve the objective.
- Unbounded if an entering column has no positive entries.
- Phase I (or big-M) finds a starting vertex when the origin isn't feasible.
H: Practical points
- Degeneracy can cause cycling; Bland's rule prevents it.
- Klee–Minty cubes force exponentially many pivots.
- Smoothed analysis (Spielman–Teng) explains its typical speed.
- The revised simplex method and warm starts are used in branch and bound.
X: Do the first pivot for maximise 3x + 2y subject to x + y + s₁ = 4, x + 3y + s₂ = 6.
> Start at x = y = 0, s₁ = 4, s₂ = 6; x has the largest reduced cost, 3, so x enters
> Ratio test: 4/1 = 4 for s₁ and 6/1 = 6 for s₂; the minimum is s₁, which leaves
> New vertex x = 4, y = 0 with objective 12; y's reduced cost is now 2 − 3 = −1 < 0, so it's optimal
K: Simplex pivots between adjacent vertices using reduced costs and the ratio test; it detects optimality and unboundedness; Bland's rule stops cycling; it's fast in practice.
!: Choosing the leaving variable by largest ratio instead of smallest.
Q: Who invented the simplex algorithm? | George Dantzig (1947).
Q: Which rule prevents cycling? | Bland's rule.
SUM: Simplex walks along vertices.
SUM: It is fast in practice.
SRC: Dantzig GB, Thapa MN, Linear Programming 1: Introduction (Springer 1997) | textbook | 1997 | https://link.springer.com/
SRC: Spielman DA, Teng SH, Smoothed analysis of algorithms: why the simplex algorithm usually takes polynomial time, Journal of the ACM 51(3), 385 | journal | 2004 | https://doi.org/10.1145/990308.990310
NUM1#maths-u18-15-q1@1: In a ratio test, the right-hand sides are 12, 10 and 9 and the entering column has entries 3, 5 and −1. What is the minimum ratio? | 2 | 0 |  | Only positive entries count: 12/3 = 4 and 10/5 = 2; the minimum, 2, picks the second row to leave.
M1#maths-u18-15-q2@1: What does the minimum ratio test choose? | The leaving variable, keeping the next vertex feasible | The entering variable with best reduced cost | The final optimal objective value | Whether the problem is infeasible | The starting vertex for Phase I | The smallest ratio is the first constraint to become tight as the entering variable grows.
M3#maths-u18-15-q3@2: Why does the simplex method run fast in practice despite exponential worst cases? | Smoothed analysis shows small random perturbations make the expected pivot count polynomial | It always takes exactly one pivot from any starting vertex | Worst cases are impossible to construct for the simplex method | It checks every vertex of the polyhedron at once in parallel | It is polynomial in the worst case, as Dantzig proved in 1947 | Spielman and Teng proved Klee–Minty-type cases are fragile under perturbation.

## Interior-Point Methods
S: Interior-point methods solve linear and convex programs by travelling through the interior of the feasible region rather than along its edges. Karmarkar's 1984 algorithm made them practical, and they solve huge problems in polynomial time.
O: Explain barrier functions and the central path
O: Compare interior-point and simplex methods
T: Logarithmic barrier | −μ Σ log(sᵢ), added to the objective to keep slack variables sᵢ positive
T: Central path | The curve of barrier-problem minimisers x(μ), which tends to an optimal solution as μ → 0
H: Idea
- Replace x ≥ 0 by a barrier −μ Σ log xᵢ that blows up at the boundary.
- For each μ, minimise the barrier problem; then shrink μ.
- Newton steps follow the central path.
- Primal–dual methods update primal and dual variables together.
H: Complexity
- Khachiyan's ellipsoid method (1979) first proved LP is polynomial, but was slow.
- Karmarkar (1984): a practical polynomial algorithm.
- Interior-point methods need about O(√n log(1/ε)) iterations.
H: Interior points versus simplex
- Interior points excel on large, sparse problems.
- Simplex gives exact vertices and warm-starts well (useful in branch and bound).
- Crossover converts an interior solution to a vertex.
- Both are in commercial solvers; neither dominates.
X: Minimise x subject to x ≥ 0 using the barrier problem x − μ log x.
> Derivative: 1 − μ/x = 0
> x(μ) = μ
> As μ → 0, x(μ) → 0, the true minimiser, approached from inside
K: Interior-point methods add log barriers and follow the central path as μ → 0; they're polynomial; they suit large problems, while simplex suits warm starts.
!: Thinking interior-point methods land exactly on a vertex (they approach it; crossover finds one).
Q: Who introduced the practical interior-point method in 1984? | Narendra Karmarkar.
Q: What happens to the barrier parameter μ? | It is reduced towards zero.
SUM: Interior points cut through the middle.
SUM: They are polynomial and scale well.
SRC: Karmarkar N, A new polynomial-time algorithm for linear programming, Combinatorica 4(4), 373 | journal | 1984 | https://doi.org/10.1007/BF02579150
SRC: Wright SJ, Primal-Dual Interior-Point Methods (SIAM 1997) | textbook | 1997 | https://epubs.siam.org/
NUM1#maths-u18-16-q1@1: For the barrier problem minimise x − μ log x, what is x(μ) when μ = 0.01? | 0.01 | 0.0001 |  | Setting 1 − μ/x = 0 gives x = μ = 0.01, close to the true minimiser 0.
M1#maths-u18-16-q2@1: What does the logarithmic barrier prevent? | Iterates from reaching or crossing the boundary of the feasible region | The objective from decreasing during any of the iterations | Newton steps from being computed at points near the centre | The dual problem from being formed alongside the primal | Convergence to the optimum, which is why μ is never reduced | −log s → ∞ as s → 0, so iterates stay strictly inside.
M2#maths-u18-16-q3@2: Why is simplex often preferred inside branch and bound? | It warm-starts quickly from the previous vertex after a bound changes | It is polynomial in the worst case, unlike interior points | It never needs pivots once the root node is solved | Interior-point methods can't solve linear programs at all | It ignores integer constraints, so branching is unnecessary | Re-solving after a small change takes few simplex pivots from the old basis.

## Integer Programming
S: Integer programming requires some or all variables to take whole-number values. That models yes/no decisions, indivisible items and logical conditions, but makes problems NP-hard; even so, modern solvers handle many practical instances.
O: Formulate decisions with binary variables
O: Explain LP relaxations, bounds and the integrality gap
T: Binary variable | A variable restricted to {0, 1}, representing a yes/no decision
T: LP relaxation | The linear program obtained by dropping integrality constraints, giving a bound on the integer optimum
H: Modelling with integers
- Yes/no choices: open a facility (y = 1) or not.
- Logical constraints: x ≤ My links continuous x to binary y (big-M).
- At most k of n options: Σ yᵢ ≤ k.
- Either-or constraints and fixed costs.
H: Relaxations and bounds
- The LP relaxation bounds the integer optimum (from above when maximising).
- Rounding an LP solution may be infeasible or poor.
- Integrality gap: the ratio or difference between relaxation and integer optima.
- Tighter formulations have smaller gaps.
H: Solving
- Branch and bound, cutting planes and branch-and-cut.
- Totally unimodular constraint matrices give integer LP vertices (assignment, network flow).
- Solvers: Gurobi, CPLEX, SCIP, HiGHS.
X: Knapsack: items of value 6, 5, 4 and weight 4, 3, 2, capacity 6. Find the integer optimum and the LP bound.
> Integer: items 1 and 3 weigh 6 with value 10; items 2 and 3 weigh 5 with value 9; items 1 and 2 weigh 7, too much. Best: 10
> LP relaxation: take items by value per weight (item 3: 2, item 2: 1.67, item 1: 1.5): item 3 (2), item 2 (3), then 1/4 of item 1: value 4 + 5 + 1.5 = 10.5
> Integer optimum 10, LP bound 10.5: gap 0.5
K: Integer programs model discrete decisions with binaries and big-M; LP relaxations give bounds; tight formulations shrink the gap; totally unimodular problems are easy.
!: Rounding an LP solution and assuming it's optimal or feasible.
Q: Is integer programming NP-hard in general? | Yes.
Q: What does the LP relaxation provide? | A bound on the integer optimum.
SUM: Integers model discrete choices.
SUM: Relaxations give bounds.
SRC: Wolsey LA, Integer Programming (2nd edn, Wiley 2020) | textbook | 2020 | https://www.wiley.com/
SRC: Conforti M, Cornuéjols G, Zambelli G, Integer Programming (Springer 2014) | textbook | 2014 | https://link.springer.com/
NUM1#maths-u18-17-q1@1: A knapsack has items of value 8, 5, 3 and weight 5, 4, 2 with capacity 7. What is the best integer value? | 11 | 0 |  | Options: items 1 and 3 (weight 7, value 11), items 2 and 3 (weight 6, value 8), or item 1 alone (8); the best is 11.
M1#maths-u18-17-q2@1: How is "open facility j before shipping from it" modelled with a binary yⱼ? | xᵢⱼ ≤ M yⱼ, so shipping is zero unless yⱼ = 1 | xᵢⱼ ≥ M yⱼ for every customer | yⱼ ≤ xᵢⱼ / M with no other link | xᵢⱼ + yⱼ = 1 for each pair | yⱼ = xᵢⱼ for every customer i | Big-M constraints switch off continuous flows when the binary is zero.
M2#maths-u18-17-q3@2: Why do totally unimodular constraint matrices make integer programs easy? | With integer data, every LP vertex is integral, so the LP relaxation solves the integer problem | They make the problem infeasible, so there is nothing left to solve | They force all variables to zero, which is trivially integral | They remove the objective function, leaving a pure feasibility problem | They only appear in nonlinear problems, where integrality is automatic | Assignment and network-flow matrices are totally unimodular, so simplex returns integer solutions.

## Mixed-Integer Programming
S: Mixed-integer programs combine continuous and integer variables, modelling problems such as unit commitment in power systems, where plants are on or off but output levels vary continuously. MIP solvers have sped up by many orders of magnitude since the 1990s.
O: Formulate mixed-integer models with fixed costs and logic
O: Describe how MIP solvers work
T: Mixed-integer linear program | MILP: a linear program in which some variables must be integers
T: Fixed-charge constraint | Cost f·y + c·x with x ≤ My, modelling a set-up cost paid only when x > 0
H: Modelling patterns
- Fixed charges and minimum batch sizes (x = 0 or l ≤ x ≤ u).
- Piecewise-linear costs with SOS2 constraints or binaries.
- Indicator constraints: if y = 1 then a constraint holds.
- Scheduling with sequencing binaries.
H: Inside a MIP solver
- Presolve simplifies and tightens the model.
- Branch and cut: branch and bound plus cutting planes (Gomory, cover cuts).
- Primal heuristics find good feasible solutions early.
- The optimality gap reports how close the best solution is to the bound.
H: Applications
- Power-system unit commitment and airline crew scheduling.
- Supply-chain network design and vehicle routing.
- Sports scheduling and kidney exchange programmes.
X: A plant has fixed cost £100 if used and £5 per unit; demand is 30 units, capacity 50. Write the cost and constraints.
> Variables: production x ≥ 0 and y ∈ {0, 1}
> Cost 100y + 5x; constraints x ≥ 30 and x ≤ 50y
> The optimum is y = 1, x = 30, with cost 100 + 150 = £250
K: MILPs mix continuous and integer variables; fixed charges, indicators and piecewise costs are standard patterns; solvers use presolve, branch and cut and heuristics; the gap measures progress.
!: Choosing an enormous big-M, which weakens the relaxation and slows the solver.
Q: What does the MIP optimality gap measure? | The relative difference between the best solution and the best bound.
Q: What are Gomory cuts? | Cutting planes derived from simplex tableaux to remove fractional solutions.
SUM: MIPs mix discrete and continuous choices.
SUM: Branch and cut solves them.
SRC: Wolsey LA, Integer Programming (2nd edn, Wiley 2020) | textbook | 2020 | https://www.wiley.com/
SRC: Bixby RE, A brief history of linear and mixed-integer programming computation, Documenta Mathematica Extra Volume ISMP, 107 | journal | 2012 | https://www.math.uni-bielefeld.de/documenta/
NUM1#maths-u18-18-q1@1: A solver's best solution costs 104 and its best lower bound is 100. What is the optimality gap as a percentage of the solution value, to 1 decimal place? | 3.8 | 0.1 | % | (104 − 100)/104 ≈ 0.0385, about 3.8%.
M1#maths-u18-18-q2@1: Why should big-M constants be chosen as small as valid? | Smaller M gives a tighter LP relaxation and faster solving | Larger M always speeds up the solver | M has no effect on solver performance | Small M makes the model nonlinear | M must equal the optimal objective value | Loose big-M values let fractional solutions cheat, weakening the bound.
M3#maths-u18-18-q3@2: Why do MIP solvers run primal heuristics alongside branch and bound? | Good feasible solutions found early give incumbents that prune many nodes | Heuristics prove optimality on their own | Branch and bound can't find feasible solutions | Heuristics replace the LP relaxation | They don't use heuristics | A strong incumbent lets nodes with worse bounds be discarded immediately.

## Branch and Bound
S: Branch and bound solves integer and combinatorial problems by splitting them into smaller subproblems and discarding any whose bound shows they can't beat the best solution found so far. It turns exhaustive search into something practical.
O: Run branch and bound with LP relaxations on small problems
O: Explain branching, bounding, pruning and search strategies
T: Incumbent | The best feasible solution found so far
T: Pruning | Discarding a subproblem because it is infeasible, integral, or its bound is no better than the incumbent
H: The algorithm
- Solve the relaxation at the root.
- If a variable is fractional (say x = 2.4), branch: x ≤ 2 and x ≥ 3.
- Solve each child's relaxation; update the incumbent when solutions are integral.
- Prune by infeasibility, by integrality or by bound.
H: Strategy choices
- Node selection: depth-first (finds incumbents fast), best-bound (improves the bound).
- Variable selection: most fractional, strong branching, pseudo-costs.
- Bounds from LP, Lagrangian or problem-specific relaxations.
H: Beyond integer programming
- Travelling salesman, scheduling, global nonconvex optimisation.
- Branch and price (column generation) for crew scheduling.
- Branch and cut adds cutting planes at nodes.
- Search trees can still grow exponentially in the worst case.
X: Maximise 5x + 4y subject to 6x + 4y ≤ 24, x + 2y ≤ 6, x, y integer ≥ 0. The LP optimum is (3, 1.5), value 21. Branch on y.
> y ≤ 1: LP optimum x = 3.33, y = 1 (value 20.67); branching further gives (3, 1), value 19, and x ≥ 4 gives (4, 0), value 20
> y ≥ 2: LP optimum x = 2, y = 2, value 18, integral but worse than 20
> The best integer solution is (4, 0) with value 20
K: Branch and bound splits on fractional variables, bounds with relaxations and prunes dominated nodes; node and variable selection matter; it powers MIP and combinatorial solvers.
!: Pruning a node whose bound is better than the incumbent.
Q: What is the incumbent? | The best feasible solution found so far.
Q: Name three reasons to prune a node. | Infeasible, integral, or bound no better than the incumbent.
SUM: Branch to split, bound to prune.
SUM: Strategy choices matter.
SRC: Land AH, Doig AG, An automatic method of solving discrete programming problems, Econometrica 28(3), 497 | journal | 1960 | https://doi.org/10.2307/1910129
SRC: Wolsey LA, Integer Programming (2nd edn, Wiley 2020) | textbook | 2020 | https://www.wiley.com/
NUM1#maths-u18-19-q1@1: In a maximisation, the incumbent has value 50. A node's LP bound is 48. Should it be explored (1 = yes, 0 = no)? | 0 | 0 |  | No solution in that subtree can exceed 48, which is worse than 50, so the node is pruned by bound.
M1#maths-u18-19-q2@1: If an LP relaxation gives x = 3.7, which pair of branches is created? | x ≤ 3 and x ≥ 4 | x ≤ 3.7 and x ≥ 3.7 | x = 3 and x = 4 only | x ≤ 4 and x ≥ 3 | x ≥ 0 and x ≤ 10 | Branching excludes the fractional value while keeping every integer option.
M2#maths-u18-19-q3@2: What is the advantage of depth-first node selection? | It reaches integer solutions quickly, giving early incumbents for pruning | It always proves optimality first | It uses the least memory and the best bound at once | It avoids solving relaxations | It explores every node in parallel | Diving deep tends to find feasible leaves fast, though the bound improves slowly.

## Combinatorial Optimisation
S: Combinatorial optimisation seeks the best object from a finite but huge set, such as a tour, schedule, matching or tree. Some problems have fast exact algorithms, others are NP-hard and need approximation algorithms, heuristics or clever search.
O: Recognise classic combinatorial problems and their complexity
O: Use greedy algorithms and approximation guarantees
T: NP-hard | At least as hard as every problem in NP; no polynomial algorithm is known
T: Approximation ratio | A guarantee that an algorithm's answer is within a factor of the optimum
H: Easy problems (polynomial)
- Shortest paths (Dijkstra), minimum spanning trees (Kruskal, Prim).
- Maximum flow and bipartite matching.
- Assignment problems (Hungarian algorithm).
H: Hard problems
- Travelling salesman, graph colouring, maximum clique, knapsack, set cover.
- NP-hard: exponential search space, no known polynomial algorithm.
- Pseudo-polynomial dynamic programming works for knapsack.
- Exact methods: branch and bound, branch and cut (Concorde solves large TSPs).
H: Approximation
- Greedy set cover achieves ratio about ln n.
- Christofides' algorithm: within 1.5 of optimal for metric TSP.
- Vertex cover: 2-approximation by taking both endpoints of a maximal matching.
- Some problems can't be approximated well unless P = NP.
X: Find a minimum spanning tree of edges AB 1, BC 4, AC 3, CD 2, BD 5 using Kruskal's algorithm.
> Sort edges: AB 1, CD 2, AC 3, BC 4, BD 5
> Take AB, CD, AC (no cycles); BC would form a cycle, so skip; all four vertices are now connected
> MST weight 1 + 2 + 3 = 6
K: Combinatorial optimisation picks the best discrete structure; MST, shortest path, flow and matching are polynomial; TSP, colouring and knapsack are NP-hard; approximations bound the error.
!: Assuming a greedy algorithm is optimal for every combinatorial problem.
Q: Is the minimum spanning tree problem NP-hard? | No: Kruskal and Prim solve it in polynomial time.
Q: What ratio does Christofides guarantee for metric TSP? | 1.5.
SUM: Huge finite search spaces.
SUM: Exact, approximate or heuristic methods.
SRC: Korte B, Vygen J, Combinatorial Optimization: Theory and Algorithms (6th edn, Springer 2018) | textbook | 2018 | https://link.springer.com/
SRC: Williamson DP, Shmoys DB, The Design of Approximation Algorithms (Cambridge University Press 2011) | textbook | 2011 | https://www.designofapproxalgs.com/
NUM1#maths-u18-20-q1@1: How many distinct tours (ignoring direction and start) does a symmetric TSP with 6 cities have? | 60 | 0 |  | (n − 1)!/2 = 5!/2 = 60 tours, a number that explodes as n grows.
M1#maths-u18-20-q2@1: Which problem has a polynomial-time algorithm? | Minimum spanning tree | Travelling salesman | Graph 3-colouring | Maximum clique | Minimum set cover | Kruskal's greedy algorithm finds an MST in O(m log m) time.
M3#maths-u18-20-q3@2: Why does taking both endpoints of a maximal matching give a 2-approximation for vertex cover? | Any cover must contain one endpoint of each matched edge, and we take only two per edge | Maximal matchings are always perfect, so the cover is exact | It finds the optimal vertex cover exactly in every graph | Vertex cover is easy, so any reasonable rule gives factor 2 | It gives a factor of 10, not 2, in the worst case | The optimum is at least the matching size k, and our cover has 2k vertices.

## Dynamic Programming
S: Dynamic programming solves problems by breaking them into overlapping subproblems and reusing their solutions. Bellman's principle of optimality says an optimal policy's remaining decisions must themselves be optimal, and this gives efficient algorithms for routing, inventory and sequence alignment.
O: Write Bellman recursions for staged problems
O: Solve knapsack and shortest path problems by dynamic programming
T: Principle of optimality | Whatever the first decision, the remaining decisions must be optimal for the resulting state (Bellman 1957)
T: Value function | V(s), the best achievable value starting from state s
H: Method
- Define stages and states.
- Write a recursion: V(s) = best over decisions a of [reward(s, a) + V(next state)].
- Solve from the base cases (backward) or with memoisation (forward).
- Recover the decisions by tracing back.
H: Examples
- Knapsack: V(i, w) = max(V(i − 1, w), vᵢ + V(i − 1, w − wᵢ)).
- Shortest paths: Bellman–Ford and Floyd–Warshall.
- Sequence alignment and edit distance in bioinformatics.
- Inventory control, resource allocation, option pricing.
H: Limits
- The curse of dimensionality: state spaces grow exponentially with the number of variables.
- Knapsack DP is pseudo-polynomial, O(nW).
- Approximate DP and reinforcement learning tackle large problems.
X: Find the edit distance between "cat" and "cut".
> Align c–c (match, 0), a–u (substitution, 1), t–t (match, 0)
> The DP table confirms no cheaper alignment exists
> Edit distance = 1
K: DP solves overlapping subproblems with Bellman recursions; it powers knapsack, shortest paths and alignment; the curse of dimensionality limits it; approximate DP extends it.
!: Applying DP when the problem lacks optimal substructure.
Q: What does the principle of optimality say? | Remaining decisions of an optimal policy are optimal for the resulting state.
Q: What is the time complexity of knapsack DP with n items and capacity W? | O(nW).
SUM: DP reuses subproblem answers.
SUM: Bellman's principle justifies it.
SRC: Bellman R, Dynamic Programming (Princeton University Press 1957) | textbook | 1957 | https://press.princeton.edu/
SRC: Cormen TH, Leiserson CE, Rivest RL, Stein C, Introduction to Algorithms (4th edn, MIT Press 2022) | textbook | 2022 | https://mitpress.mit.edu/
NUM1#maths-u18-21-q1@1: What is the edit distance between "kitten" and "sitting"? | 3 | 0 |  | Substitute k→s and e→i, then insert g: three operations, the classic minimum.
M1#maths-u18-21-q2@1: Which recursion gives the 0–1 knapsack value V(i, w)? | max(V(i − 1, w), vᵢ + V(i − 1, w − wᵢ)) | V(i − 1, w) + vᵢ for every item | min(V(i − 1, w), V(i, w − 1)) | vᵢ × V(i − 1, w) | V(i, w − wᵢ) − vᵢ | Item i is either skipped or taken, and the better choice is kept.
M2#maths-u18-21-q3@2: What is the curse of dimensionality in dynamic programming? | The number of states grows exponentially with the number of state variables | DP fails for one-dimensional problems with many stages | Recursions can't be written for problems with large data | DP always needs exponential time, whatever the state space | It doesn't affect DP, only Monte Carlo methods | Ten state variables with 100 values each give 10^{20} states to tabulate.

## Gradient Descent
S: Gradient descent minimises a function by repeatedly stepping in the direction of steepest decrease, the negative gradient. It's simple, scales to millions of variables and, with stochastic and momentum variants, is the engine of machine learning.
O: Apply gradient descent updates and choose step sizes
O: Describe convergence rates and stochastic, momentum and adaptive variants
T: Gradient descent update | x_{k+1} = x_{k} − α∇f(x_{k}) with step size (learning rate) α
T: Condition number | κ = L/m, the ratio of largest to smallest curvature, which governs convergence speed
H: Step size
- Too large: oscillation or divergence. Too small: slow progress.
- For L-smooth f, α ≤ 1/L guarantees decrease.
- Line searches (Armijo backtracking) choose α adaptively.
H: Convergence
- Convex L-smooth: error O(1/k).
- Strongly convex: linear (geometric) convergence, with rate depending on κ.
- Ill-conditioned problems zigzag in narrow valleys.
H: Variants
- Stochastic gradient descent: gradients on random mini-batches.
- Momentum and Nesterov acceleration: O(1/k^{2}) for convex problems.
- Adaptive methods: AdaGrad, RMSProp, Adam.
- Preconditioning rescales to reduce κ.
X: Apply two steps of gradient descent to f(x) = x^{2} from x₀ = 4 with α = 0.25.
> f′(x) = 2x, so x₁ = 4 − 0.25 × 8 = 2
> x₂ = 2 − 0.25 × 4 = 1
> Each step halves x, converging geometrically to 0
K: Gradient descent steps against the gradient; the step size must suit the curvature; convergence depends on convexity and conditioning; stochastic, momentum and adaptive variants dominate ML.
!: Using a step size above 2/L, which makes gradient descent diverge on quadratics.
Q: What happens if the learning rate is too large? | The iterates can oscillate or diverge.
Q: What rate does Nesterov acceleration achieve for smooth convex functions? | O(1/k^{2}).
SUM: Step downhill repeatedly.
SUM: Step size and conditioning matter.
SRC: Nocedal J, Wright SJ, Numerical Optimization (2nd edn, Springer 2006) | textbook | 2006 | https://link.springer.com/
SRC: Kingma DP, Ba J, Adam: A method for stochastic optimization, arXiv:1412.6980 | journal | 2014 | https://arxiv.org/abs/1412.6980
NUM1#maths-u18-22-q1@1: Gradient descent on f(x) = x^{2} with α = 0.1 starts at x₀ = 10. What is x₂? | 6.4 | 0.01 |  | Each step multiplies x by 1 − 2α = 0.8, so x₂ = 10 × 0.8^{2} = 6.4.
M1#maths-u18-22-q2@1: For f(x) = x^{2}, which step size makes gradient descent diverge? | α = 1.5 | α = 0.1 | α = 0.5 | α = 0.25 | α = 0.9 | x is multiplied by 1 − 2α each step; for α = 1.5 that's −2, so |x| doubles.
M2#maths-u18-22-q3@2: Why does gradient descent zigzag on ill-conditioned problems? | The gradient points across the narrow valley rather than along it, so steps bounce between the walls | The function has no minimum, so the iterates wander without settling down | Ill-conditioned functions are linear, so the gradient never changes direction | The step size is always zero on ill-conditioned problems, causing oscillation | It doesn't zigzag: ill-conditioning only slows each step, not its direction | A large condition number makes contours long ellipses, and the steepest direction is nearly perpendicular to the valley.

## Newton's Method
S: Newton's method for optimisation uses both gradient and curvature, stepping to the minimum of a local quadratic model. Near a minimum it converges quadratically, roughly doubling the correct digits each step, but each step needs the Hessian and may misbehave far from the solution.
O: Apply Newton steps for one- and multi-variable minimisation
O: Explain quadratic convergence and safeguards
T: Newton step | x_{k+1} = x_{k} − H(x_{k})^{−1}∇f(x_{k})
T: Quadratic convergence | Error e_{k+1} ≤ C e_{k}^{2}, so correct digits roughly double per step
H: The method
- In 1D: x_{k+1} = x_{k} − f′(x_{k})/f″(x_{k}).
- It minimises the second-order Taylor model at each step.
- Exact in one step for a quadratic function.
- Invariant to linear changes of variables.
H: Strengths and weaknesses
- Quadratic convergence near a strict local minimum.
- Each step solves an n × n linear system: costly for large n.
- Can move towards maxima or saddles if the Hessian isn't positive definite.
- May diverge from poor starting points.
H: Safeguards
- Line search or trust region (damped Newton).
- Modify the Hessian to be positive definite.
- Inexact Newton: solve the system approximately with conjugate gradients.
- Quasi-Newton methods approximate the Hessian cheaply.
X: Minimise f(x) = x − ln x from x₀ = 0.5 with Newton's method.
> f′(x) = 1 − 1/x, f″(x) = 1/x^{2}; the step is x − (1 − 1/x)x^{2} = 2x − x^{2}
> x₁ = 1 − 0.25 = 0.75, x₂ = 1.5 − 0.5625 = 0.9375
> x₃ ≈ 0.9961: the error 1 − x squares each step (0.5, 0.25, 0.0625, 0.0039)
K: Newton steps minimise a local quadratic model; they converge quadratically near a minimum but cost a Hessian solve; line searches, trust regions and Hessian modifications keep them safe.
!: Using raw Newton steps far from a minimum or where the Hessian is indefinite.
Q: How many Newton steps minimise a positive definite quadratic exactly? | One.
Q: What is the 1D Newton step for minimisation? | x − f′(x)/f″(x).
SUM: Newton uses curvature.
SUM: It converges quadratically near the minimum.
SRC: Nocedal J, Wright SJ, Numerical Optimization (2nd edn, Springer 2006) | textbook | 2006 | https://link.springer.com/
SRC: Boyd S, Vandenberghe L, Convex Optimization (Cambridge University Press 2004) | textbook | 2004 | https://web.stanford.edu/~boyd/cvxbook/
NUM1#maths-u18-23-q1@1: In the example minimising x − ln x, the error is 1 − x. If the error is 0.01 at one step, what is it at the next? | 0.0001 | 0.000001 |  | The update 2x − x^{2} gives 1 − x_{new} = (1 − x)^{2}, so the error squares: 0.01^{2} = 0.0001.
M1#maths-u18-23-q2@1: What does each Newton step for minimisation require? | The gradient and the Hessian (or a linear solve with it) | Only function values at random points | Only the gradient, never curvature | A list of all local minima | The global minimum in advance | x − H^{−1}∇f uses both first and second derivatives.
M3#maths-u18-23-q3@2: Why can pure Newton steps head towards a maximum? | They find stationary points of the quadratic model, which is a maximum when the Hessian is negative definite | Newton's method only ever finds maxima, whatever the starting point | Gradients always point towards maxima, so Newton follows them uphill | The Newton step is always zero, so the iterate drifts at random | They can't: Newton steps always decrease the objective function | Newton solves ∇f = 0 without checking curvature, so modifications are needed for minimisation.

## Quasi-Newton Methods
S: Quasi-Newton methods build an approximation to the Hessian from the gradients seen so far, getting fast convergence without computing second derivatives. BFGS and its limited-memory version L-BFGS are among the most widely used optimisation algorithms.
O: State the secant condition and the BFGS update idea
O: Compare quasi-Newton with Newton and gradient descent
T: Secant condition | B_{k+1}s_{k} = y_{k}, where s_{k} = x_{k+1} − x_{k} and y_{k} = ∇f_{k+1} − ∇f_{k}
T: L-BFGS | Limited-memory BFGS, storing only the last m pairs (s, y) instead of a full matrix
H: The idea
- Gradient changes reveal curvature: y ≈ H s.
- Update the approximation B (or its inverse) with a low-rank correction satisfying the secant condition.
- BFGS (Broyden, Fletcher, Goldfarb, Shanno, 1970) keeps B positive definite if sᵀy > 0.
- DFP and SR1 are other updates.
H: Performance
- Superlinear convergence near a minimum: faster than linear, slower than quadratic.
- Cost per step O(n^{2}) for BFGS, O(mn) for L-BFGS.
- No second derivatives needed.
H: Practice
- L-BFGS handles millions of variables (m ≈ 5–20).
- Wolfe line search conditions ensure sᵀy > 0.
- Default in many libraries (SciPy's minimize, statistical model fitting).
- L-BFGS-B adds bound constraints.
X: In 1D, x₀ = 0, x₁ = 1, f′(0) = −4 and f′(1) = −2. Find the secant curvature estimate and the next step.
> B = (f′(1) − f′(0))/(1 − 0) = (−2 + 4)/1 = 2
> Quasi-Newton step: x₂ = x₁ − f′(x₁)/B = 1 + 2/2 = 2
> For a quadratic with f″ = 2 this lands exactly on the minimum
K: Quasi-Newton methods approximate the Hessian from gradient differences using the secant condition; BFGS keeps positive definiteness; L-BFGS scales to huge problems; convergence is superlinear.
!: Skipping the line search conditions, which can break positive definiteness.
Q: What does L-BFGS store? | The most recent m pairs of step and gradient differences.
Q: What kind of convergence does BFGS achieve near a minimum? | Superlinear.
SUM: Learn curvature from gradients.
SUM: BFGS and L-BFGS are workhorses.
SRC: Nocedal J, Wright SJ, Numerical Optimization (2nd edn, Springer 2006) | textbook | 2006 | https://link.springer.com/
SRC: Liu DC, Nocedal J, On the limited memory BFGS method for large scale optimization, Mathematical Programming 45, 503 | journal | 1989 | https://doi.org/10.1007/BF01589116
NUM1#maths-u18-24-q1@1: In 1D, f′(2) = 6 and f′(3) = 10. What curvature B does the secant condition give? | 4 | 0 |  | B = (10 − 6)/(3 − 2) = 4, an estimate of f″ from two gradient values.
M1#maths-u18-24-q2@1: What information do quasi-Newton methods use to approximate the Hessian? | Differences of successive gradients and steps | Exact second derivatives at every step | Function values at random points | The global minimum location | Integer constraints | The secant condition B s = y builds curvature from gradient changes.
M2#maths-u18-24-q3@2: Why is L-BFGS suited to problems with millions of variables? | It stores a few vector pairs instead of an n × n matrix, costing O(mn) per step | It computes the exact Hessian cheaply using sparse matrices | It needs no gradients at all, only function values | It converges in one step for every smooth function | It isn't suited to them; it is meant for small problems | A dense n × n matrix would need 10^{12} entries for a million variables.

## Heuristic Optimisation
S: Heuristics are practical rules that find good solutions quickly without guaranteeing optimality. When exact methods are too slow, constructive heuristics and local search give usable answers for scheduling, routing and design problems.
O: Apply constructive and local search heuristics
O: Explain local optima and neighbourhoods in discrete search
T: Local search | Repeatedly moving to a better neighbouring solution until none exists
T: Neighbourhood | The set of solutions reachable by a small change, such as swapping two cities in a tour
H: Constructive heuristics
- Nearest neighbour for TSP: always visit the closest unvisited city.
- Greedy for knapsack: add items in order of value per weight.
- Savings algorithm (Clarke–Wright) for vehicle routing.
- Quick, but quality varies.
H: Local search
- 2-opt for TSP: reverse a segment of the tour if it shortens it.
- Swap and insertion moves for scheduling.
- Stops at a local optimum for the chosen neighbourhood.
- Larger neighbourhoods give better local optima at more cost.
H: Judging heuristics
- Compare with bounds (LP relaxations) to measure the gap.
- Benchmark on standard instance libraries (TSPLIB).
- Use them for initial solutions in exact methods.
- Metaheuristics add ways to escape local optima.
X: Cities on a line at positions 0, 1, 5 and 6. Run nearest neighbour from 0 and give the tour length (returning to 0).
> From 0 the nearest is 1; from 1 the nearest unvisited is 5; then 6
> Tour 0 → 1 → 5 → 6 → 0
> Length 1 + 4 + 1 + 6 = 12, which here is optimal
K: Heuristics trade guarantees for speed; constructive methods build solutions; local search improves them within a neighbourhood; quality is judged against bounds and benchmarks.
!: Assuming a local optimum under one neighbourhood is globally optimal.
Q: What does a 2-opt move do? | Reverses a segment of the tour to remove two crossing edges.
Q: What does nearest neighbour do for TSP? | Always travels to the closest unvisited city.
SUM: Heuristics are fast and good enough.
SUM: Local search improves solutions.
SRC: Aarts E, Lenstra JK (eds), Local Search in Combinatorial Optimization (Princeton University Press 2003) | textbook | 2003 | https://press.princeton.edu/
SRC: Applegate DL, Bixby RE, Chvátal V, Cook WJ, The Traveling Salesman Problem: A Computational Study (Princeton University Press 2006) | textbook | 2006 | https://press.princeton.edu/
NUM1#maths-u18-25-q1@1: For cities at 0, 2, 3 and 10 on a line, what is the nearest-neighbour tour length from 0, returning to 0? | 20 | 0 |  | 0 → 2 → 3 → 10 → 0 gives 2 + 1 + 7 + 10 = 20.
M1#maths-u18-25-q2@1: Which statement about local search is true? | It stops at a solution with no better neighbour, which may not be globally optimal | It always finds the global optimum if run long enough | It never improves on the solution it started from | It needs the LP relaxation to choose its next move | It explores every solution before deciding which is best | Local optima depend on the neighbourhood, and better solutions may lie further away.
M2#maths-u18-25-q3@2: How can a heuristic solution's quality be judged without knowing the optimum? | By comparing it with a lower bound, such as an LP relaxation | By running it once more | By checking it is feasible only | By its running time | It can't be judged | The gap to a valid bound limits how far from optimal it can be.

## Metaheuristic Algorithms
S: Metaheuristics are general strategies that guide heuristics to explore beyond local optima. Tabu search, simulated annealing, genetic algorithms and swarm methods balance exploring new regions with exploiting good ones, and they apply to almost any problem.
O: Describe the main families of metaheuristics
O: Explain the exploration–exploitation trade-off and tuning
T: Metaheuristic | A high-level strategy for guiding search heuristics, not tied to one problem
T: Tabu search | Local search that forbids recently visited moves for a while, to avoid cycling and escape local optima
H: Families
- Trajectory methods: tabu search, simulated annealing, iterated local search, variable neighbourhood search.
- Population methods: genetic algorithms, particle swarm, ant colony optimisation.
- Hybrids: memetic algorithms (evolution plus local search).
H: Exploration and exploitation
- Exploration samples new regions; exploitation refines good ones.
- Too much exploration: random search. Too much exploitation: stuck in a local optimum.
- Parameters (temperatures, population sizes, tabu tenure) set the balance.
- No free lunch theorem: no method beats others on all problems.
H: Good practice
- Tune on representative instances; report variability over runs.
- Compare with simple baselines and exact bounds.
- Exploit problem structure in move design.
- Beware of over-claiming novel "nature-inspired" methods.
X: Why does tabu search forbid reversing recent moves?
> Without it, after a move out of a local optimum, the best next move is often to step straight back
> The tabu list blocks that return for a set number of iterations
> This forces the search into new regions while still choosing good moves
K: Metaheuristics guide heuristics past local optima; trajectory and population methods differ in style; balance exploration and exploitation; no free lunch, so tune and benchmark carefully.
!: Expecting a single metaheuristic to perform best on every problem.
Q: What does the no free lunch theorem say? | Averaged over all problems, no search method beats another.
Q: Name a population-based metaheuristic. | A genetic algorithm (or particle swarm, ant colony).
SUM: Metaheuristics escape local optima.
SUM: Balance exploration and exploitation.
SRC: Glover F, Tabu search, Part I, ORSA Journal on Computing 1(3), 190 | journal | 1989 | https://doi.org/10.1287/ijoc.1.3.190
SRC: Wolpert DH, Macready WG, No free lunch theorems for optimization, IEEE Transactions on Evolutionary Computation 1(1), 67 | journal | 1997 | https://doi.org/10.1109/4235.585893
NUM1#maths-u18-26-q1@1: A tabu search forbids a move for 7 iterations after it's used. If move m is used at iteration 12, at what iteration can it next be used? | 20 | 0 |  | It's tabu during iterations 13 to 19 (seven iterations), so it becomes allowed again at iteration 20.
M1#maths-u18-26-q2@1: Which metaheuristic keeps a short-term memory of forbidden moves? | Tabu search | Simulated annealing | Particle swarm optimisation | Gradient descent | The simplex method | The tabu list stores recent moves so they can't be undone immediately.
M3#maths-u18-26-q3@2: Why does the no free lunch theorem warn against claims that one metaheuristic is universally best? | Averaged over all possible problems, every search algorithm performs equally, so advantages come from matching structure | It proves genetic algorithms are always best, whatever the problem structure | It shows metaheuristics never work, so exact methods must be used instead | It applies only to convex problems, where gradient methods are always best | It supports such claims, since one method must win on average over all problems | Gains on one problem class are balanced by losses on others.

## Genetic Algorithms
S: Genetic algorithms evolve a population of candidate solutions using selection, crossover and mutation, inspired by natural evolution. They need only a way to evaluate fitness, so they handle discontinuous, discrete and black-box problems.
O: Describe the genetic algorithm loop and its operators
O: Choose encodings and parameters for simple problems
T: Crossover | Combining parts of two parent solutions to make offspring
T: Fitness function | The measure of solution quality that drives selection
H: The loop
- Initialise a random population.
- Evaluate fitness; select parents (tournament or roulette-wheel selection).
- Apply crossover and mutation to create offspring.
- Replace the population (keeping the best: elitism) and repeat.
H: Encodings
- Binary strings, permutations (for TSP, using order crossover), real vectors.
- Constraint handling: penalties or repair operators.
- Representation strongly affects performance.
H: Behaviour
- Holland's schema theorem (1975) describes how good building blocks spread.
- Mutation maintains diversity; crossover combines good parts.
- Premature convergence: the population loses diversity too early.
- Evolution strategies (CMA-ES) adapt mutation distributions for real-valued problems.
X: One-point crossover of parents 110011 and 001100 after position 3.
> Split: 110 | 011 and 001 | 100
> Child 1: 110100
> Child 2: 001011
K: GAs evolve populations by selection, crossover and mutation; encoding and operators matter; elitism keeps the best; diversity prevents premature convergence; CMA-ES suits continuous problems.
!: Setting mutation so low that the population converges prematurely.
Q: What does elitism do? | Copies the best individuals unchanged into the next generation.
Q: Who introduced genetic algorithms in the 1970s? | John Holland.
SUM: Evolve solutions by selection and variation.
SUM: Encodings and diversity matter.
SRC: Holland JH, Adaptation in Natural and Artificial Systems (University of Michigan Press 1975) | textbook | 1975 | https://press.umich.edu/
SRC: Goldberg DE, Genetic Algorithms in Search, Optimization and Machine Learning (Addison-Wesley 1989) | textbook | 1989 | https://www.pearson.com/
NUM1#maths-u18-27-q1@1: In roulette-wheel selection with fitnesses 2, 3 and 5, what is the probability (as a decimal) of selecting the fittest individual? | 0.5 | 0.001 |  | Selection probability is fitness over total: 5/(2 + 3 + 5) = 0.5.
M1#maths-u18-27-q2@1: Which operator mainly preserves diversity in a genetic algorithm? | Mutation | Elitism | Selection | Fitness evaluation | Sorting the population | Random changes reintroduce variation that selection would otherwise remove.
M2#maths-u18-27-q3@2: Why can standard one-point crossover fail for TSP permutations? | Children may repeat some cities and miss others, so they aren't valid tours | Tours have no fitness function, so offspring can't be compared | Crossover only works on real numbers, never on lists of cities | Permutations can't be mutated, so crossover is the only operator | It works perfectly: every child of two tours is itself a tour | Permutation encodings need operators like order crossover that preserve validity.

## Simulated Annealing
S: Simulated annealing explores solutions like a cooling metal: it accepts worse moves with a probability that falls as the "temperature" decreases. Early on it wanders widely; later it settles into a deep minimum, escaping local optima along the way.
O: Apply the Metropolis acceptance rule
O: Design cooling schedules and explain convergence
T: Metropolis criterion | Accept a move with cost change Δ if Δ ≤ 0, or with probability e^{−Δ/T} if Δ > 0
T: Cooling schedule | The rule for decreasing temperature, such as T_{k+1} = αT_{k} with α ≈ 0.95
H: The algorithm
- Start with a solution and a high temperature T.
- Propose a random neighbour; accept by the Metropolis rule.
- Lower T gradually and repeat until frozen.
- Kirkpatrick, Gelatt and Vecchi (1983) applied it to chip layout and TSP.
H: Temperature
- High T: almost any move accepted (exploration).
- Low T: only improvements accepted (exploitation).
- Logarithmic cooling T_{k} = c/log k guarantees convergence to a global optimum, but is impractically slow.
- Geometric cooling is the usual practical choice.
H: Practice
- Tune initial temperature so a good share of worse moves is accepted at first.
- Reheating and restarts can help.
- Works with any neighbourhood and cost function.
- Related: quantum annealing hardware.
X: At T = 10, a move worsens the cost by Δ = 5. What's the acceptance probability, and at T = 1?
> At T = 10: e^{−5/10} = e^{−0.5} ≈ 0.61
> At T = 1: e^{−5} ≈ 0.0067
> Cooling makes uphill moves much rarer
K: Simulated annealing accepts worse moves with probability e^{−Δ/T}; temperature controls exploration; slow cooling converges in theory, geometric cooling works in practice.
!: Cooling too fast, which turns it into greedy local search.
Q: What is the acceptance probability for an improving move? | 1.
Q: Who introduced simulated annealing for optimisation in 1983? | Kirkpatrick, Gelatt and Vecchi.
SUM: Accept uphill moves sometimes.
SUM: Cool slowly to settle low.
SRC: Kirkpatrick S, Gelatt CD, Vecchi MP, Optimization by simulated annealing, Science 220(4598), 671 | journal | 1983 | https://doi.org/10.1126/science.220.4598.671
SRC: Aarts E, Korst J, Simulated Annealing and Boltzmann Machines (Wiley 1989) | textbook | 1989 | https://www.wiley.com/
NUM1#maths-u18-28-q1@1: At temperature T = 4, what is the probability of accepting a move that worsens the cost by 2, to 3 decimal places? | 0.607 | 0.001 |  | e^{−2/4} = e^{−0.5} ≈ 0.607.
M1#maths-u18-28-q2@1: What happens to the acceptance of worse moves as the temperature falls? | It becomes less likely, so the search settles into a minimum | It becomes more likely as the search proceeds | It stays constant throughout the run | It becomes certain at low temperature | It depends only on the step count | e^{−Δ/T} shrinks towards zero as T decreases.
M2#maths-u18-28-q3@2: Why isn't the logarithmic cooling schedule used in practice? | It guarantees convergence but cools far too slowly for realistic run times | It never converges at all | It accepts no moves | It makes the algorithm greedy | It is used everywhere | T = c/log k decreases so slowly that useful runs would take astronomically long.

## Particle Swarm Optimisation
S: Particle swarm optimisation moves a swarm of candidate points through the search space, each pulled towards its own best position and the swarm's best. Inspired by bird flocking, it's easy to implement and works on continuous black-box problems.
O: Write the PSO velocity and position updates
O: Explain the roles of inertia and the cognitive and social terms
T: Personal best | p_{i}, the best position particle i has visited
T: Global best | g, the best position found by any particle
H: Updates
- vᵢ ← w vᵢ + c₁r₁(pᵢ − xᵢ) + c₂r₂(g − xᵢ), with random r₁, r₂ in [0, 1].
- xᵢ ← xᵢ + vᵢ.
- w is inertia; c₁ the cognitive (own memory) weight; c₂ the social weight.
- Typical values: w ≈ 0.7, c₁ ≈ c₂ ≈ 1.5.
H: Behaviour
- Large w and c₁ favour exploration; large c₂ favours convergence.
- Velocity clamping prevents particles flying off.
- Neighbourhood topologies (ring, star) control how fast information spreads.
- Kennedy and Eberhart (1995).
H: Uses and limits
- Tuning controllers and antenna design.
- Hyperparameter tuning.
- No convergence guarantee to a global optimum.
- Performance degrades in very high dimensions.
X: A particle at x = 2 with v = 1 has personal best 3 and global best 5. With w = 0.5, c₁ = c₂ = 1 and r₁ = r₂ = 0.5, update it.
> v = 0.5 × 1 + 1 × 0.5 × (3 − 2) + 1 × 0.5 × (5 − 2) = 0.5 + 0.5 + 1.5 = 2.5
> x = 2 + 2.5 = 4.5
> The particle moves towards both bests, overshooting its own
K: PSO updates velocities using inertia, personal-best and global-best pulls; parameters balance exploration and convergence; it suits continuous black-box problems without guarantees.
!: Using a very high inertia weight, so the swarm never settles.
Q: What does the social term pull a particle towards? | The global best position.
Q: Who introduced PSO? | Kennedy and Eberhart (1995).
SUM: Swarms share information.
SUM: Inertia, memory and social pull.
SRC: Kennedy J, Eberhart R, Particle swarm optimization, Proceedings of ICNN'95 4, 1942 | journal | 1995 | https://doi.org/10.1109/ICNN.1995.488968
SRC: Clerc M, Particle Swarm Optimization (ISTE 2006) | textbook | 2006 | https://www.wiley.com/
NUM1#maths-u18-29-q1@1: A particle at x = 0 with v = 0, personal best 2 and global best 4 uses w = 0.7, c₁ = c₂ = 1 and r₁ = r₂ = 1. What is its new position? | 6 | 0 |  | v = 0 + 1 × (2 − 0) + 1 × (4 − 0) = 6, so x = 0 + 6 = 6.
M1#maths-u18-29-q2@1: What does the inertia weight w control in PSO? | How much of the previous velocity a particle keeps | How far the global best moves each step | The number of particles in the swarm | The fitness function's scale | The random numbers r₁ and r₂ | Higher w keeps particles moving and exploring; lower w lets them settle.
M2#maths-u18-29-q3@2: What risk does a very large social weight c₂ create? | The swarm converges prematurely on the current global best | Particles stop sharing information | The swarm never moves | Velocities become negative | There is no risk | Strong attraction to one point reduces diversity, risking a local optimum.

## Bayesian Optimisation
S: Bayesian optimisation finds the best settings of expensive black-box functions, such as machine learning hyperparameters or experiments, using few evaluations. It fits a probabilistic surrogate, usually a Gaussian process, and chooses each next point by balancing predicted value and uncertainty.
O: Explain surrogate models and acquisition functions
O: Apply expected improvement and upper confidence bound rules
T: Gaussian process | A distribution over functions, giving a mean prediction and uncertainty at every point
T: Acquisition function | A rule scoring candidate points for the next evaluation, such as expected improvement
H: The loop
- Evaluate a few initial points.
- Fit a Gaussian process to the data.
- Maximise the acquisition function to choose the next point.
- Evaluate it, update the model and repeat.
H: Acquisition functions
- Expected improvement (EI): E[max(f_{best} − f(x), 0)] when minimising.
- Upper (lower) confidence bound: μ(x) ∓ κσ(x), with κ trading exploration and exploitation.
- Probability of improvement and Thompson sampling.
H: Uses and limits
- Hyperparameter tuning, materials discovery, A/B tests, robotics.
- Efficient when each evaluation costs minutes to days.
- Struggles above roughly 20 dimensions without special structure.
- Kernel choice encodes smoothness assumptions.
X: Two candidates have GP predictions (minimising): A with mean 1.0 and σ = 0.1; B with mean 1.2 and σ = 0.5. Use the lower confidence bound μ − 2σ.
> A: 1.0 − 0.2 = 0.8
> B: 1.2 − 1.0 = 0.2
> B has the lower bound, so it's chosen: its uncertainty makes it promising
K: Bayesian optimisation fits a GP surrogate and picks points by an acquisition function; EI and confidence bounds balance exploration and exploitation; it suits expensive low-dimensional problems.
!: Using Bayesian optimisation when evaluations are cheap, where simpler methods are faster.
Q: What surrogate model is most commonly used? | A Gaussian process.
Q: What does a high σ(x) indicate? | High uncertainty about f at x.
SUM: Model the function, then sample wisely.
SUM: Acquisition balances explore and exploit.
SRC: Frazier PI, A tutorial on Bayesian optimization, arXiv:1807.02811 | review | 2018 | https://arxiv.org/abs/1807.02811
SRC: Rasmussen CE, Williams CKI, Gaussian Processes for Machine Learning (MIT Press 2006) | textbook | 2006 | https://gaussianprocess.org/gpml/
NUM1#maths-u18-30-q1@1: Minimising with lower confidence bound μ − 2σ, a point has μ = 3 and σ = 0.4. What is its score? | 2.2 | 0.001 |  | 3 − 2 × 0.4 = 2.2; lower scores are more attractive to evaluate next.
M1#maths-u18-30-q2@1: When is Bayesian optimisation most appropriate? | When each function evaluation is expensive and the dimension is modest | When the function is cheap and has a known formula | When there are thousands of variables | When gradients are cheap and exact | When the function is linear | It spends computation choosing points to save costly evaluations.
M3#maths-u18-30-q3@2: Why does expected improvement sometimes choose a point with a worse predicted mean? | High uncertainty gives a real chance of a big improvement, which raises the expected gain | EI ignores uncertainty entirely and looks only at the mean | EI always picks the worst predicted point to learn from it | Means are never used by EI, only the variance at each point | It never does this; EI always picks the lowest predicted mean | EI integrates over the predicted distribution, rewarding variance as well as mean.

## Operations Research
S: Operations research (OR) applies mathematical models and analysis to decisions in organisations: how many staff to roster, where to put depots, how to route deliveries. It began with military planning in Britain in the Second World War and now supports logistics, healthcare and finance.
O: Describe the OR modelling process from problem to implementation
O: Recognise the main OR techniques and where they're used
T: Operations research | The discipline of applying analytical methods, such as optimisation, simulation and probability, to improve decisions
T: Model validation | Checking that a model's outputs match reality well enough for its intended use
H: History
- Radar deployment and convoy studies in the Second World War (Blackett's circus).
- Linear programming and the simplex method followed in the late 1940s.
- OR societies formed in the UK (1948) and the US (1952).
H: The process
- Define the problem and the decision-makers' objectives.
- Collect data and build a model (optimisation, simulation, queueing, statistics).
- Solve, validate and test sensitivity.
- Implement, then monitor and update.
H: Techniques and uses
- Optimisation, simulation, queueing theory, forecasting, decision analysis.
- Airline scheduling and pricing, hospital capacity planning, supply chains.
- Sports scheduling, energy systems, public services.
- The Franz Edelman award recognises high-impact OR applications.
X: A hospital wants to cut A&E waiting times. Outline an OR approach.
> Define the objective (such as the 4-hour standard) and constraints (staff, beds, budget)
> Model patient arrivals and treatment as a queueing or simulation model, using real data
> Test options such as extra staff at peak times, validate against past data, then implement and monitor
K: OR applies analytical models to organisational decisions; the process runs from problem definition through modelling, validation and implementation; techniques include optimisation, simulation and queueing.
!: Building a sophisticated model before clearly defining the decision and objectives.
Q: Where did operations research begin? | In British military planning during the Second World War.
Q: Name three OR techniques. | Optimisation, simulation and queueing theory.
SUM: OR models decisions.
SUM: Validation and implementation matter.
SRC: Hillier FS, Lieberman GJ, Introduction to Operations Research (11th edn, McGraw-Hill 2021) | textbook | 2021 | https://www.mheducation.com/
SRC: Kirby MW, Operational Research in War and Peace: The British Experience from the 1930s to 1970 (Imperial College Press 2003) | textbook | 2003 | https://www.worldscientific.com/
NUM1#maths-u18-31-q1@1: In what year was the UK's Operational Research Society founded (as the OR Club)? | 1948 | 0 |  | The Operational Research Club was formed in 1948 and became the Operational Research Society in 1953.
M1#maths-u18-31-q2@1: Which step comes first in an OR study? | Defining the problem, objectives and constraints with the decision-makers | Choosing the solver software | Running a large simulation | Implementing the solution | Writing the final report | A precise problem statement guides which data and model are needed.
M2#maths-u18-31-q3@2: Why is sensitivity analysis important before implementing an OR model? | It shows how the recommendation changes if data or assumptions are wrong | It makes the model run faster | It removes all uncertainty | It proves the model is correct | It isn't important | Robust recommendations shouldn't flip when uncertain inputs vary slightly.

## Decision Analysis
S: Decision analysis structures choices under uncertainty using decision trees, probabilities and utilities. It identifies the option with the best expected value or utility and calculates how much new information is worth before you pay for it.
O: Solve decision trees by expected value
O: Calculate the expected value of perfect information and use utility
T: Expected value of perfect information | EVPI: the expected gain from knowing the uncertain outcome before deciding
T: Utility function | A function giving the decision-maker's preference for outcomes, capturing attitudes to risk
H: Decision trees
- Decision nodes (squares), chance nodes (circles), outcomes at the leaves.
- Roll back: average at chance nodes, choose the best at decision nodes.
- Sequential decisions, such as testing before launching.
H: Value of information
- EVPI = expected value with perfect information − best expected value without it.
- Never pay more than EVPI for any information.
- Expected value of sample information (EVSI) for imperfect tests.
H: Risk attitudes
- Risk-averse decision-makers have concave utility, such as u(x) = √x or log x.
- Certainty equivalent: the sure amount equal in utility to the gamble.
- Prospect theory (Kahneman and Tversky) describes how people actually decide.
- Multi-attribute utility handles several criteria.
X: Launch a product: success (p = 0.6) gains £100k, failure loses £50k; not launching gives £0. Find the best choice and EVPI.
> Launch EV = 0.6 × 100 − 0.4 × 50 = £40k > £0, so launch
> With perfect information: launch only on success, EV = 0.6 × 100 + 0.4 × 0 = £60k
> EVPI = 60 − 40 = £20k
K: Decision trees roll back expected values; EVPI caps what information is worth; utility functions capture risk attitudes; certainty equivalents compare gambles with sure amounts.
!: Paying more for a forecast or test than the EVPI.
Q: How are chance nodes evaluated when rolling back a tree? | By probability-weighted averages.
Q: What shape is a risk-averse utility function? | Concave.
SUM: Trees structure uncertain choices.
SUM: Information has a calculable value.
SRC: Clemen RT, Reilly T, Making Hard Decisions with DecisionTools (3rd edn, Cengage 2014) | textbook | 2014 | https://www.cengage.com/
SRC: Kahneman D, Tversky A, Prospect theory: an analysis of decision under risk, Econometrica 47(2), 263 | journal | 1979 | https://doi.org/10.2307/1914185
NUM1#maths-u18-32-q1@1: A gamble pays £100 or £0 with equal probability. For utility u(x) = √x, what is its certainty equivalent in £? | 25 | 0 | £ | Expected utility is 0.5 × 10 + 0.5 × 0 = 5, and √CE = 5 gives CE = £25.
M1#maths-u18-32-q2@1: How is a decision node evaluated when rolling back a decision tree? | By choosing the branch with the best expected value | By averaging all its branches equally | By multiplying its branch values together | By choosing the riskiest branch | By ignoring it entirely | The decision-maker controls decision nodes, so the best option is taken.
M2#maths-u18-32-q3@2: Why is EVPI an upper limit on what any forecast is worth? | No real forecast can do better than knowing the outcome exactly | Forecasts are always worthless | EVPI is the cost of a forecast | Information always has zero value | It isn't an upper limit | Perfect information gives the most possible improvement in expected value.

## Queueing Theory
S: Queueing theory models waiting lines at checkouts, call centres, hospitals and computer servers. Simple formulas link arrival rates, service rates and waiting times, showing why queues explode as utilisation approaches 100%.
O: Use Kendall notation and M/M/1 formulas
O: Apply Little's law and explain the effect of utilisation
T: Little's law | L = λW: the average number in the system equals arrival rate times average time in the system
T: Utilisation | ρ = λ/μ for a single server: the fraction of time the server is busy
H: Kendall notation
- A/B/c: arrival process, service distribution, number of servers.
- M = Markovian (Poisson arrivals or exponential service), D = deterministic, G = general.
- M/M/1, M/M/c, M/G/1 are standard models.
H: M/M/1 results (ρ < 1)
- Average number in system L = ρ/(1 − ρ).
- Average time in system W = 1/(μ − λ).
- Average queue length L_{q} = ρ^{2}/(1 − ρ).
- As ρ → 1, L and W blow up.
H: Using the results
- Little's law holds for very general systems.
- Pooling servers into one queue cuts waiting (M/M/c beats c separate M/M/1 queues).
- Variability matters: Pollaczek–Khinchine for M/G/1.
- Erlang's formulas size call centres (Erlang C).
X: Customers arrive at 8 per hour; one server serves 10 per hour. Find ρ, L and W.
> ρ = 8/10 = 0.8
> L = 0.8/0.2 = 4 customers
> W = 1/(10 − 8) = 0.5 hours; check Little's law: L = λW = 8 × 0.5 = 4 ✓
K: Kendall notation names queues; M/M/1 gives L = ρ/(1 − ρ) and W = 1/(μ − λ); Little's law L = λW is general; waits explode as utilisation nears 1; pooling helps.
!: Planning for 100% utilisation, which makes queues grow without bound.
Q: What does Little's law state? | L = λW.
Q: What does M stand for in Kendall notation? | Markovian (memoryless): Poisson arrivals or exponential service.
SUM: Queues depend on utilisation.
SUM: Little's law links length and time.
SRC: Kleinrock L, Queueing Systems, Volume 1: Theory (Wiley 1975) | textbook | 1975 | https://www.wiley.com/
SRC: Little JDC, A proof for the queuing formula L = λW, Operations Research 9(3), 383 | journal | 1961 | https://doi.org/10.1287/opre.9.3.383
NUM1#maths-u18-33-q1@1: In an M/M/1 queue with λ = 9 and μ = 10 per hour, what is the average number in the system? | 9 | 0 |  | ρ = 0.9, so L = 0.9/0.1 = 9: a small rise in load from 0.8 has more than doubled the queue.
M1#maths-u18-33-q2@1: A shop averages 20 customers inside and each spends 0.5 hours there. What is the arrival rate? | 40 per hour | 10 per hour | 20 per hour | 0.5 per hour | 80 per hour | Little's law λ = L/W = 20/0.5 = 40 per hour.
M3#maths-u18-33-q3@2: Why does average waiting time in M/M/1 grow so sharply as ρ approaches 1? | W = 1/(μ − λ), and the denominator shrinks to zero, so random bursts take ever longer to clear | Service rates fall as queues grow, because servers tire | Customers leave when queues are long, raising waiting time | It grows linearly, not sharply, as utilisation increases | It doesn't grow: waiting time is independent of utilisation | With little spare capacity, any backlog from random arrivals persists.

## Inventory Theory
S: Inventory theory decides how much stock to order and when, balancing ordering costs against holding costs and the risk of running out. The economic order quantity formula from 1913 is still the starting point, extended for uncertain demand and service levels.
O: Calculate the economic order quantity and reorder points
O: Use safety stock and the newsvendor critical ratio
T: Economic order quantity | EOQ = √(2DS/H), with annual demand D, cost per order S and holding cost per unit per year H
T: Safety stock | Extra stock held to protect against demand uncertainty during the lead time
H: EOQ model
- Constant demand, instant replenishment, no shortages.
- Total cost = (D/Q)S + (Q/2)H, minimised at Q* = √(2DS/H).
- At Q*, annual ordering cost equals annual holding cost.
- The total cost curve is flat near Q*, so small errors cost little.
H: Uncertain demand
- Reorder point = lead-time demand + safety stock.
- Safety stock = zσ_{L} for a service level with z-score z.
- (s, S) and periodic review (R, S) policies.
H: Newsvendor model
- One-period decision with perishable stock.
- Order so that P(D ≤ Q) = cᵤ/(cᵤ + cₒ), the critical ratio.
- cᵤ: cost of under-stocking per unit; cₒ: cost of over-stocking per unit.
X: D = 1200 units/year, S = £50 per order, H = £3 per unit per year. Find the EOQ and the number of orders per year.
> EOQ = √(2 × 1200 × 50/3) = √40000 = 200 units
> Orders per year = 1200/200 = 6
> Ordering cost 6 × 50 = £300 equals holding cost (200/2) × 3 = £300
K: EOQ balances ordering and holding costs; reorder points add safety stock for uncertain demand; the newsvendor orders to the critical ratio; cost curves are flat near the optimum.
!: Ignoring lead-time variability when setting safety stock.
Q: At the EOQ, how do ordering and holding costs compare? | They're equal.
Q: What is the newsvendor critical ratio? | cᵤ/(cᵤ + cₒ).
SUM: Balance ordering and holding costs.
SUM: Safety stock buffers uncertainty.
SRC: Harris FW, How many parts to make at once, Factory, The Magazine of Management 10(2), 135 | journal | 1913 | https://doi.org/10.1287/opre.38.6.947
SRC: Silver EA, Pyke DF, Thomas DJ, Inventory and Production Management in Supply Chains (4th edn, CRC Press 2017) | textbook | 2017 | https://www.routledge.com/
NUM1#maths-u18-34-q1@1: Find the EOQ for D = 800 units/year, S = £25 per order and H = £4 per unit per year. | 100 | 0 | units | √(2 × 800 × 25/4) = √10000 = 100 units.
M1#maths-u18-34-q2@1: A newspaper costs 40p and sells for £1, and unsold copies are worthless. What is the critical ratio? | 0.6 | 0.4 | 0.5 | 1.0 | 0.29 | cᵤ = 60p lost profit and cₒ = 40p wasted, so 60/(60 + 40) = 0.6.
M2#maths-u18-34-q3@2: Why does using a slightly wrong order quantity usually cost little in the EOQ model? | The total cost curve is flat near its minimum, so small deviations change cost only slightly | EOQ costs are always zero, so any order quantity is optimal | Holding costs vanish near the optimum, leaving only ordering costs | The EOQ model has no minimum, so every quantity costs about the same | It costs a great deal: total cost rises steeply away from the EOQ | Ordering 20% too much raises total cost by under 2%.

## Scheduling Theory
S: Scheduling theory decides when and where to process jobs on machines, staff or processors to meet deadlines or minimise completion times. A few simple rules are optimal for single machines, while most multi-machine problems are NP-hard.
O: Apply SPT, EDD and Johnson's rule
O: Classify scheduling problems with Graham's notation
T: Makespan | C_{max}, the time when the last job finishes
T: Shortest processing time rule | SPT: sequencing jobs in increasing processing time, which minimises total (and mean) completion time on one machine
H: Single machine
- SPT minimises ΣCⱼ.
- Earliest due date (EDD) minimises maximum lateness.
- Weighted SPT (Smith's rule): order by pⱼ/wⱼ to minimise Σ wⱼCⱼ.
- Moore–Hodgson minimises the number of late jobs.
H: Several machines
- Two-machine flow shop: Johnson's rule minimises makespan.
- Parallel machines: minimising makespan is NP-hard; list scheduling gives a 2-approximation.
- Job shops are notoriously hard (a famous 10 × 10 instance went unsolved for 25 years).
H: Notation and practice
- Graham's α | β | γ: machines, constraints, objective (for example 1 || ΣCⱼ).
- Constraint programming and MIP for real rosters and timetables.
- Applications: manufacturing, operating theatres, cloud computing, sports fixtures.
X: Jobs with processing times 3, 1 and 4 on one machine. Find the SPT order and total completion time.
> SPT order: 1, 3, 4
> Completion times: 1, 4, 8
> Total completion time 1 + 4 + 8 = 13 (any other order is worse)
K: SPT minimises total completion time, EDD maximum lateness; Johnson's rule solves two-machine flow shops; most multi-machine problems are NP-hard; Graham's notation classifies them.
!: Using SPT when the objective is meeting deadlines (EDD is the right rule).
Q: Which rule minimises maximum lateness on one machine? | Earliest due date.
Q: What does 1 || ΣCⱼ mean? | One machine, no special constraints, minimise total completion time.
SUM: Simple rules solve single machines.
SUM: Multi-machine problems are hard.
SRC: Pinedo ML, Scheduling: Theory, Algorithms, and Systems (6th edn, Springer 2022) | textbook | 2022 | https://link.springer.com/
SRC: Johnson SM, Optimal two- and three-stage production schedules with setup times included, Naval Research Logistics Quarterly 1(1), 61 | journal | 1954 | https://doi.org/10.1002/nav.3800010110
NUM1#maths-u18-35-q1@1: Jobs with processing times 5, 2, 7 and 1 are sequenced by SPT on one machine. What is the total completion time? | 28 | 0 |  | Order 1, 2, 5, 7 gives completion times 1, 3, 8 and 15, totalling 28.
M1#maths-u18-35-q2@1: Which rule minimises the maximum lateness on a single machine? | Earliest due date first | Shortest processing time first | Longest processing time first | Random order | Highest weight first | Jackson's rule (EDD) is optimal for maximum lateness.
M2#maths-u18-35-q3@2: What does Johnson's rule optimise? | The makespan of a two-machine flow shop | Total lateness on parallel machines | The number of late jobs on one machine | Weighted completion time in job shops | The cost of machines | It sequences jobs to finish all work on both machines as early as possible.

## Supply Chain Optimisation
S: Supply chain optimisation coordinates suppliers, factories, warehouses and retailers to deliver products at low cost and high service. It combines network design, inventory, transport and forecasting, and must cope with uncertainty and disruption.
O: Describe decision levels in supply chain management
O: Explain the bullwhip effect and coordination strategies
T: Bullwhip effect | The amplification of order variability moving upstream from customers to suppliers
T: Network design | Choosing locations and capacities of plants and warehouses, and the flows between them
H: Decision levels
- Strategic: network design, sourcing, capacity (years).
- Tactical: production and distribution planning (months).
- Operational: scheduling, routing and replenishment (days).
- Models: MILPs for design, LPs for planning, simulation for testing.
H: The bullwhip effect
- Causes: demand forecast updating, order batching, price promotions, shortage gaming.
- Lee, Padmanabhan and Whang (1997) analysed it; the Beer Game demonstrates it.
- Remedies: share point-of-sale data, smaller batches, everyday low prices, vendor-managed inventory.
H: Resilience
- Disruptions (pandemics, natural disasters) expose lean chains.
- Dual sourcing, buffer stock and flexible capacity add resilience.
- Robust and stochastic optimisation model these trade-offs.
- Sustainability: carbon costs in network design.
X: Retail sales vary by ±10 units a week, the wholesaler's orders by ±25 and the factory's by ±60. What does this show?
> Variability grows at each stage upstream: 10 → 25 → 60
> This amplification is the bullwhip effect
> Sharing retail sales data with upstream stages reduces it
K: Supply chains are optimised at strategic, tactical and operational levels; the bullwhip effect amplifies variability upstream; information sharing and resilience strategies counter it.
!: Optimising each stage separately, which can make the whole chain worse.
Q: What is the bullwhip effect? | Growing order variability moving upstream in a supply chain.
Q: Name a remedy for the bullwhip effect. | Sharing point-of-sale demand data.
SUM: Coordinate the whole chain.
SUM: Information sharing tames bullwhip.
SRC: Lee HL, Padmanabhan V, Whang S, Information distortion in a supply chain: the bullwhip effect, Management Science 43(4), 546 | journal | 1997 | https://doi.org/10.1287/mnsc.43.4.546
SRC: Chopra S, Supply Chain Management: Strategy, Planning, and Operation (7th edn, Pearson 2019) | textbook | 2019 | https://www.pearson.com/
NUM1#maths-u18-36-q1@1: If order variance doubles at each of three stages above retail, by what factor has variance grown at the top stage? | 8 | 0 |  | Doubling three times gives 2^{3} = 8 times the retail variance.
M1#maths-u18-36-q2@1: Which decision is strategic in supply chain management? | Where to build a new distribution centre | Today's delivery routes for vans | This week's production schedule | Which order to pick first | The next replenishment quantity | Facility location shapes the network for years, so it's a strategic decision.
M3#maths-u18-36-q3@2: Why does order batching contribute to the bullwhip effect? | Steady customer demand turns into occasional large orders upstream, which look like extreme variability | Batching removes all variability from orders, which confuses suppliers | Batching makes forecasts perfect, so upstream stages over-react | Suppliers ignore batched orders and plan only from past sales | It doesn't contribute; only price promotions cause the bullwhip effect | Ordering monthly in bulk creates spikes and gaps that upstream stages misread as demand changes.

## Network Optimisation
S: Network optimisation solves problems on graphs: shortest paths, maximum flows and minimum-cost flows. These models route traffic, data and goods, and they have fast algorithms and integer solutions, which makes them unusually tractable.
O: Solve shortest path and maximum flow problems
O: State the max-flow min-cut theorem and the minimum-cost flow model
T: Max-flow min-cut theorem | The maximum flow from source to sink equals the minimum capacity of a cut separating them
T: Minimum-cost flow | Sending required flow through a network at least total cost, subject to capacities and conservation
H: Shortest paths
- Dijkstra's algorithm: non-negative weights, O(m + n log n) with a heap.
- Bellman–Ford: handles negative weights and detects negative cycles.
- A* uses a heuristic estimate for faster route finding.
H: Flows
- Flow conservation at every node except source and sink.
- Ford–Fulkerson augments along paths with spare capacity; Edmonds–Karp uses shortest augmenting paths.
- Max-flow equals min-cut (Ford and Fulkerson 1956).
- Integer capacities give integer optimal flows.
H: Minimum-cost flow
- Generalises shortest path, max flow, transportation and assignment.
- Network simplex is very fast in practice.
- Applications: logistics, telecommunications, image segmentation (via min cut).
X: A network has edges s→a (3), s→b (2), a→t (2), b→t (3), a→b (1). Find the maximum flow.
> Send 2 along s→a→t and 2 along s→b→t (total 4)
> s→a has 1 spare: send it a→b→t (b→t has 1 spare): total 5
> The cut {s→a, s→b} has capacity 3 + 2 = 5, so 5 is maximum
K: Dijkstra and Bellman–Ford find shortest paths; augmenting paths find maximum flows; max-flow equals min-cut; minimum-cost flow unifies many network problems with integral solutions.
!: Using Dijkstra's algorithm with negative edge weights.
Q: What does the max-flow min-cut theorem say? | The maximum flow equals the minimum cut capacity.
Q: Which shortest-path algorithm handles negative weights? | Bellman–Ford.
SUM: Graphs model routes and flows.
SUM: Max-flow equals min-cut.
SRC: Ahuja RK, Magnanti TL, Orlin JB, Network Flows: Theory, Algorithms, and Applications (Prentice Hall 1993) | textbook | 1993 | https://www.pearson.com/
SRC: Ford LR, Fulkerson DR, Maximal flow through a network, Canadian Journal of Mathematics 8, 399 | journal | 1956 | https://doi.org/10.4153/CJM-1956-045-5
NUM1#maths-u18-37-q1@1: A network has only two parallel paths from s to t, with edge capacities 4 then 6 on one, and 5 then 3 on the other. What is the maximum flow? | 7 | 0 |  | Each path is limited by its smallest edge: 4 + 3 = 7, matching the min cut.
M1#maths-u18-37-q2@1: Which algorithm finds shortest paths with non-negative weights efficiently? | Dijkstra's algorithm | Bellman–Ford only | Kruskal's algorithm | The Hungarian algorithm | Johnson's rule | Dijkstra settles vertices in order of distance, using non-negativity.
M2#maths-u18-37-q3@2: Why do network flow problems with integer capacities have integer optimal flows? | Their constraint matrices are totally unimodular, so LP vertices are integral | Flows are always zero | The objective is integer-valued | Capacities are irrelevant | They don't | Node–arc incidence matrices are totally unimodular, giving integral basic solutions.

## Facility Location
S: Facility location chooses where to open warehouses, hospitals, fire stations or cell towers to serve demand at least cost or best coverage. The models range from simple geometric medians to large integer programs with fixed costs.
O: Formulate the uncapacitated facility location problem
O: Compare p-median, p-centre and covering models
T: Uncapacitated facility location | Choose facilities to open (fixed cost fⱼ) and assign customers (cost cᵢⱼ) to minimise total cost
T: p-median problem | Locate p facilities to minimise total (demand-weighted) distance from customers to their nearest facility
H: Formulations
- UFL: minimise Σ fⱼyⱼ + Σ cᵢⱼxᵢⱼ with Σⱼ xᵢⱼ = 1 and xᵢⱼ ≤ yⱼ.
- Capacitated versions limit what each facility can serve.
- On a line, the 1-median is the (weighted) median of customer positions.
H: Objectives
- p-median: average access (efficiency).
- p-centre: worst-case distance (equity, emergency services).
- Set covering: fewest facilities so everyone is within distance r.
- Maximal covering: most demand covered with p facilities.
H: Solving
- MILP solvers, Lagrangian relaxation and greedy heuristics.
- Metric UFL has constant-factor approximation algorithms.
- GIS data supply travel distances.
- Applications: ambulance bases, retail stores, data centres.
X: Customers sit at 1, 2, 3, 10 and 12 on a line, one each. Where should one facility go to minimise total distance?
> The 1-median is the median of the positions
> The median of 1, 2, 3, 10, 12 is 3
> Total distance 2 + 1 + 0 + 7 + 9 = 19
K: Facility location chooses sites to serve demand; UFL balances fixed and assignment costs; p-median targets efficiency, p-centre equity, covering models service standards.
!: Placing a single facility at the mean rather than the median when minimising total distance.
Q: Which model minimises the worst-case distance? | The p-centre problem.
Q: Where is the 1-median on a line? | At the median of the customer positions.
SUM: Location models trade cost and access.
SUM: Choose the objective carefully.
SRC: Daskin MS, Network and Discrete Location: Models, Algorithms, and Applications (2nd edn, Wiley 2013) | textbook | 2013 | https://www.wiley.com/
SRC: Laporte G, Nickel S, Saldanha da Gama F (eds), Location Science (2nd edn, Springer 2019) | textbook | 2019 | https://link.springer.com/
NUM1#maths-u18-38-q1@1: Customers at 0, 4, 5, 9 and 20 on a line. What is the minimum total distance to one facility? | 25 | 0 |  | The median is 5, giving distances 5 + 1 + 0 + 4 + 15 = 25.
M1#maths-u18-38-q2@1: Which model suits placing ambulance stations so no one is too far away? | A p-centre or set covering model | A p-median model with total distance | An EOQ inventory model | A minimum spanning tree | A queueing model only | Emergency services care about the worst-case response, not just the average.
M2#maths-u18-38-q3@2: In the UFL model, what does the constraint xᵢⱼ ≤ yⱼ ensure? | Customers can only be assigned to facilities that are open | Every facility is opened | Customers are split equally | Fixed costs are zero | Distances are symmetric | If yⱼ = 0, no customer may use facility j.

## Transportation Problems
S: The transportation problem ships goods from supply points to demand points at least total cost. It's a special linear program with an elegant structure: integer solutions, simple starting methods and a tailored optimality test.
O: Formulate balanced transportation problems
O: Find initial solutions and test optimality
T: Balanced transportation problem | One where total supply equals total demand (achieved by adding a dummy source or sink if needed)
T: Northwest corner rule | A starting method that fills the table from the top-left cell, moving right or down as supplies and demands run out
H: Formulation
- Minimise Σ cᵢⱼxᵢⱼ subject to Σⱼ xᵢⱼ = sᵢ (supply) and Σᵢ xᵢⱼ = dⱼ (demand), x ≥ 0.
- m sources and n destinations give m + n − 1 basic variables.
- Integer supplies and demands give integer optimal shipments.
H: Starting solutions
- Northwest corner: simple but ignores costs.
- Least cost method: fill the cheapest cells first.
- Vogel's approximation: uses penalty differences, often near optimal.
H: Improving
- MODI (u–v) method: compute uᵢ + vⱼ = cᵢⱼ on basic cells.
- Reduced cost cᵢⱼ − uᵢ − vⱼ < 0 shows an improving cell.
- Shift flow round a loop (stepping-stone) until no reduced cost is negative.
X: Two factories supply 30 and 20; two shops need 25 and 25. Costs: F1→S1 £2, F1→S2 £4, F2→S1 £3, F2→S2 £1. Find the optimum.
> F2→S2 is cheapest at £1: ship 20; S2 still needs 5
> F1 ships 25 to S1 (£2) and 5 to S2 (£4)
> Cost 20 + 50 + 20 = £90; the reduced cost of F2→S1 is 3 − (2 + (−3)) = 4 ≥ 0, so it's optimal
K: Transportation problems are structured LPs with integral solutions; northwest corner, least cost and Vogel give starting points; MODI tests optimality with reduced costs.
!: Forgetting to balance supply and demand with a dummy row or column.
Q: How many basic variables does an m × n transportation problem have? | m + n − 1.
Q: What does a negative reduced cost indicate? | Shipping on that route would lower total cost.
SUM: Ship at least cost.
SUM: Structure makes it easy.
SRC: Hillier FS, Lieberman GJ, Introduction to Operations Research (11th edn, McGraw-Hill 2021) | textbook | 2021 | https://www.mheducation.com/
SRC: Hitchcock FL, The distribution of a product from several sources to numerous localities, Journal of Mathematics and Physics 20, 224 | journal | 1941 | https://doi.org/10.1002/sapm1941201224
NUM1#maths-u18-39-q1@1: How many basic variables does a transportation problem with 4 sources and 6 destinations have? | 9 | 0 |  | m + n − 1 = 4 + 6 − 1 = 9, since one supply–demand equation is redundant.
M1#maths-u18-39-q2@1: Supply totals 100 and demand totals 80. How is the problem balanced? | Add a dummy destination with demand 20 and zero costs | Add a dummy source with supply 20 | Reduce every supply by 20% | Delete the cheapest route | Nothing: it's already balanced | Excess supply is "shipped" to a dummy sink, representing unused capacity.
M2#maths-u18-39-q3@2: Why is Vogel's method often better than the northwest corner rule? | It uses cost differences to avoid expensive cells, giving a near-optimal start | It ignores costs completely | It always gives the exact optimum | It needs fewer basic variables | It isn't better | The northwest corner rule fills cells by position only, regardless of cost.

## Assignment Problems
S: The assignment problem matches n workers to n tasks, one each, at least total cost. It's a special transportation problem solved efficiently by the Hungarian algorithm, and it appears in staffing, ride-hailing, kidney exchange and tracking objects in video.
O: Formulate assignment problems
O: Solve small assignment problems with the Hungarian algorithm
T: Assignment problem | Minimise Σ cᵢⱼxᵢⱼ with each worker and each task used exactly once, xᵢⱼ ∈ {0, 1}
T: Hungarian algorithm | Kuhn's 1955 method using row and column reductions and zero covers to find an optimal assignment
H: Formulation
- Σⱼ xᵢⱼ = 1 for each worker, Σᵢ xᵢⱼ = 1 for each task.
- Totally unimodular: the LP relaxation has integer solutions.
- There are n! possible assignments, so enumeration fails quickly.
H: Hungarian method
- Subtract each row's minimum, then each column's minimum.
- Cover all zeros with the fewest lines.
- If n lines are needed, an optimal assignment exists among the zeros.
- Otherwise adjust by the smallest uncovered value and repeat; runs in O(n^{3}).
H: Variants
- Maximisation: subtract costs from the largest value.
- Unbalanced problems: add dummy rows or columns.
- Bottleneck assignment minimises the largest cost.
- Stable matching (Gale–Shapley) uses preferences instead of costs.
X: Costs (rows workers, columns tasks): [[4, 1], [2, 3]]. Find the optimal assignment.
> Options: W1→T1, W2→T2 costs 4 + 3 = 7; W1→T2, W2→T1 costs 1 + 2 = 3
> The Hungarian reductions give zeros at (1, 2) and (2, 1)
> Optimal: W1→T2, W2→T1, total cost 3
K: Assignment problems match n workers to n tasks; total unimodularity makes the LP integral; the Hungarian algorithm solves them in O(n^{3}); variants handle maximisation and imbalance.
!: Trying to enumerate all n! assignments for more than a handful of workers.
Q: What is the running time of the Hungarian algorithm? | O(n^{3}).
Q: How many possible assignments are there for 10 workers and 10 tasks? | 10! = 3,628,800.
SUM: Match one-to-one at least cost.
SUM: The Hungarian algorithm is efficient.
SRC: Kuhn HW, The Hungarian method for the assignment problem, Naval Research Logistics Quarterly 2(1–2), 83 | journal | 1955 | https://doi.org/10.1002/nav.3800020109
SRC: Burkard R, Dell'Amico M, Martello S, Assignment Problems (rev. edn, SIAM 2012) | textbook | 2012 | https://epubs.siam.org/
NUM1#maths-u18-40-q1@1: For costs [[3, 7], [5, 4]], what is the minimum total assignment cost? | 7 | 0 |  | The options are 3 + 4 = 7 or 7 + 5 = 12, so the minimum is 7.
M1#maths-u18-40-q2@1: What is the first step of the Hungarian algorithm? | Subtract each row's minimum from every entry in that row | Assign each worker its cheapest task | Add a dummy worker to every problem | Multiply all costs by −1 | Sort tasks by cost | Row and column reductions create zeros without changing which assignment is optimal.
M2#maths-u18-40-q3@2: How is a maximisation assignment problem converted for the Hungarian method? | Replace each value by (largest value − value), then minimise | Take the reciprocal of each value | Add the largest value to each entry | Swap rows and columns | It can't be converted | Minimising the regret relative to the maximum is equivalent to maximising the total.

## Resource Allocation
S: Resource allocation distributes limited budget, staff, equipment or time among competing activities to achieve the most benefit. Models range from linear programs to marginal analysis and fair-division rules, with applications from healthcare budgets to cloud computing.
O: Allocate resources by linear programming and marginal analysis
O: Consider efficiency and fairness in allocation
T: Diminishing returns | Each extra unit of resource adds less benefit than the previous one, giving concave benefit functions
T: Max–min fairness | An allocation that maximises the smallest share, then the next smallest, and so on
H: Methods
- Linear programs with resource constraints (product mix, staffing).
- Marginal analysis: with concave returns, give each unit where its marginal benefit is highest.
- Dynamic programming for discrete allocations across stages.
- Knapsack models for project selection.
H: Fairness
- Utilitarian: maximise total benefit.
- Max–min (Rawlsian): maximise the worst-off.
- Proportional fairness: maximise Σ log xᵢ (used in network bandwidth).
- Trade-offs between efficiency and equity must be made explicit.
H: Applications
- Healthcare: QALY-based allocation and NICE thresholds.
- Cloud and network bandwidth sharing.
- Disaster relief and vaccine distribution.
- Portfolio and R&D project selection.
X: Allocate 3 staff between two clinics. Extra patients seen: clinic A gains 10, 6, 2 for its 1st, 2nd, 3rd staff; clinic B gains 8, 5, 1.
> Allocate one at a time to the highest marginal gain: A1 (10), B1 (8), A2 (6)
> Next would be B2 (5), but staff are used up
> Allocation: 2 to A, 1 to B, total 10 + 6 + 8 = 24 patients
K: Resource allocation uses LP, marginal analysis, DP and knapsack models; concave returns make greedy marginal allocation optimal; fairness criteria such as max–min must be chosen explicitly.
!: Maximising total benefit without considering whether the distribution is acceptable.
Q: What does proportional fairness maximise? | The sum of the logarithms of allocations.
Q: When is greedy marginal allocation optimal? | When benefits have diminishing returns (concave).
SUM: Allocate scarce resources well.
SUM: Efficiency and fairness can conflict.
SRC: Ibaraki T, Katoh N, Resource Allocation Problems: Algorithmic Approaches (MIT Press 1988) | textbook | 1988 | https://mitpress.mit.edu/
SRC: Kelly FP, Maulloo AK, Tan DKH, Rate control for communication networks: shadow prices, proportional fairness and stability, Journal of the Operational Research Society 49(3), 237 | journal | 1998 | https://doi.org/10.1057/palgrave.jors.2600523
NUM1#maths-u18-41-q1@1: In the clinic example, with 4 staff to allocate, how many extra patients are seen in total? | 29 | 0 |  | The fourth unit goes to B2 (gain 5), so the total is 24 + 5 = 29.
M1#maths-u18-41-q2@1: Which allocation rule maximises the benefit to the worst-off party? | Max–min fairness | Utilitarian total maximisation | Proportional fairness | First come, first served | Random allocation | Max–min fairness raises the smallest share as far as possible.
M2#maths-u18-41-q3@2: Why is allocating each unit to the highest marginal gain optimal under diminishing returns? | Concave benefits mean earlier units are always worth more, so greedy choices never need revisiting | Marginal gains are all equal under diminishing returns, so any order works | It is never optimal: dynamic programming is always needed for allocation | Diminishing returns make benefits linear, so greedy is trivially correct | Resources are unlimited under diminishing returns, so allocation is free | With concave returns, the greedy order matches the order of the optimal allocation.

## Markov Decision Processes
S: A Markov decision process models sequential decisions under uncertainty: in each state you choose an action, receive a reward and move randomly to a new state. Solving an MDP gives a policy, a rule for what to do in every state, and it underlies reinforcement learning.
O: Define states, actions, transitions, rewards and discounting
O: Solve small MDPs with the Bellman equation and value iteration
T: Policy | A rule π(s) giving the action to take in each state s
T: Bellman optimality equation | V*(s) = maxₐ [R(s, a) + γ Σₛ′ P(s′ | s, a) V*(s′)]
H: The model
- States S, actions A, transition probabilities P(s′ | s, a), rewards R(s, a).
- Markov property: the future depends only on the current state and action.
- Discount factor 0 ≤ γ < 1 values near rewards more than distant ones.
- Objective: maximise expected discounted total reward.
H: Solution methods
- Value iteration: repeat V ← max over a of [R + γPV] until it converges.
- Policy iteration: evaluate a policy, then improve it greedily.
- Linear programming formulations.
- Convergence follows from the contraction mapping theorem.
H: Applications
- Inventory and maintenance policies.
- Medical treatment planning.
- Robotics and game playing.
- Partially observable MDPs (POMDPs) when the state is hidden.
X: One state, two actions: "safe" gives reward 1 and stays; "risky" gives 3 but ends the process. With γ = 0.9, which is better?
> Always safe: V = 1 + 0.9V, so V = 10
> Risky now: value 3
> Safe forever is better (10 > 3)
K: MDPs have states, actions, transitions, rewards and discounting; the Bellman equation characterises optimal values; value and policy iteration solve them; RL learns them from experience.
!: Ignoring the discount factor, which can make infinite-horizon values diverge.
Q: What does the Markov property say? | The future depends only on the current state and action.
Q: Name two methods for solving MDPs exactly. | Value iteration and policy iteration.
SUM: MDPs model sequential decisions.
SUM: Bellman's equation gives optimal policies.
SRC: Puterman ML, Markov Decision Processes: Discrete Stochastic Dynamic Programming (Wiley 1994) | textbook | 1994 | https://www.wiley.com/
SRC: Bellman R, A Markovian decision process, Journal of Mathematics and Mechanics 6(5), 679 | journal | 1957 | https://www.jstor.org/stable/24900506
NUM1#maths-u18-42-q1@1: A policy earns reward 2 every step forever with γ = 0.8. What is its discounted value? | 10 | 0 |  | V = 2 + 0.8V gives V = 2/(1 − 0.8) = 10.
M1#maths-u18-42-q2@1: What does a policy specify in an MDP? | The action to take in each state | The reward of every action | The transition probabilities | The discount factor | The initial state only | Solving the MDP means finding the best state-to-action rule.
M3#maths-u18-42-q3@2: Why does value iteration converge for γ < 1? | The Bellman update is a contraction by factor γ, so successive errors shrink geometrically | Values are always zero, so the iteration starts at the fixed point | It converges only for γ = 1, where rewards are not discounted | Every MDP has one state, so a single update is always enough | It doesn't converge; value iteration only approximates V* loosely | By the contraction mapping theorem, repeated application reaches the unique fixed point V*.

## Reinforcement Learning Mathematics
S: Reinforcement learning learns good policies from experience when the MDP's transitions and rewards are unknown. Temporal-difference learning, Q-learning and policy gradients estimate values or improve policies from sampled rewards, powering systems from game players to robot controllers.
O: Apply TD and Q-learning updates
O: Explain exploration, function approximation and policy gradients
T: Q-learning | Update Q(s, a) ← Q(s, a) + α[r + γ maxₐ′ Q(s′, a′) − Q(s, a)] from observed transitions
T: Temporal-difference error | δ = r + γV(s′) − V(s), the gap between a one-step target and the current estimate
H: Value-based learning
- TD(0): V(s) ← V(s) + αδ.
- Q-learning (Watkins 1989) is off-policy and converges in tabular cases under suitable conditions.
- SARSA is the on-policy counterpart.
- Deep Q-networks approximate Q with neural networks (Atari, 2015).
H: Exploration
- ε-greedy: random action with probability ε.
- Upper confidence bounds and Thompson sampling (from bandits).
- The exploration–exploitation trade-off.
H: Policy gradients
- Optimise parameters θ of a policy πθ directly.
- REINFORCE: ∇J = E[∇ log πθ(a | s) G].
- Actor–critic methods combine policy gradients with value estimates.
- PPO is widely used, including in fine-tuning language models.
X: With α = 0.5, γ = 0.9, Q(s, a) = 2, reward 1 and maxₐ′ Q(s′, a′) = 4, perform one Q-learning update.
> Target = 1 + 0.9 × 4 = 4.6
> TD error = 4.6 − 2 = 2.6
> New Q(s, a) = 2 + 0.5 × 2.6 = 3.3
K: RL learns from sampled experience; TD and Q-learning bootstrap from one-step targets; exploration is essential; policy gradients and actor–critic optimise policies directly.
!: Acting purely greedily from the start, which can lock in a poor policy.
Q: Is Q-learning on-policy or off-policy? | Off-policy.
Q: What is the TD error? | r + γV(s′) − V(s).
SUM: Learn values from experience.
SUM: Balance exploration and exploitation.
SRC: Sutton RS, Barto AG, Reinforcement Learning: An Introduction (2nd edn, MIT Press 2018) | textbook | 2018 | http://incompleteideas.net/book/the-book-2nd.html
SRC: Mnih V et al., Human-level control through deep reinforcement learning, Nature 518, 529 | journal | 2015 | https://doi.org/10.1038/nature14236
NUM1#maths-u18-43-q1@1: With V(s) = 5, reward 2, γ = 0.5 and V(s′) = 4, what is the TD error δ? | -1 | 0 |  | δ = 2 + 0.5 × 4 − 5 = 4 − 5 = −1, so V(s) will be lowered.
M1#maths-u18-43-q2@1: What does ε-greedy exploration do? | Takes a random action with probability ε and the best-known one otherwise | Always takes the best-known action | Always takes random actions | Picks actions by their rewards' variance | Stops learning after ε steps | A small chance of random actions keeps discovering better options.
M2#maths-u18-43-q3@2: What distinguishes policy-gradient methods from Q-learning? | They adjust a parameterised policy directly using gradients of expected return | They never use rewards, only state visit counts | They need the full transition model of the MDP | They only work for problems with one state | There is no difference; the names are synonyms | Policy gradients optimise πθ, while Q-learning learns action values and acts greedily on them.
`;
