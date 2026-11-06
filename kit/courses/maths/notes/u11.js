// School 11: Linear Algebra and Matrices. Format: kit/course/notes.js. Standard: docs/CURRICULUM_CONTENT_STANDARD.md
// Vectors, spaces and matrices; linear maps; eigenvalues; orthogonality; decompositions and computation; multilinear algebra.
export default `
## Vectors
S: A vector has both size and direction: a displacement, velocity or force. Written as a list of components, vectors let geometry be done with arithmetic, and they're the basic objects of linear algebra.
O: Represent vectors in components and calculate magnitudes and unit vectors
O: Add vectors and multiply them by scalars, geometrically and algebraically
T: Magnitude | The length of a vector: |v| = √(v₁^{2} + v₂^{2} + v₃^{2})
T: Unit vector | A vector of length 1, found as v/|v|
H: Representing vectors
- Components: v = (3, 4) or 3i + 4j; column vectors are the standard in linear algebra.
- Position vectors locate points from the origin; the vector from A to B is b − a.
- Vectors with the same length and direction are equal wherever they're drawn.
H: Operations
- Addition: add components; geometrically, the parallelogram or nose-to-tail rule.
- Scalar multiplication: kv stretches by |k| and reverses direction if k < 0.
- Midpoint of AB: (a + b)/2; a point dividing AB in ratio m:n: (na + mb)/(m + n).
H: Uses
- Physics: forces, velocities, fields.
- Data: a list of n measurements is a vector in ℝⁿ.
- Computer graphics: positions, directions and normals.
X: Find the magnitude of v = (3, 4, 12) and the unit vector in its direction.
> |v| = √(9 + 16 + 144) = √169 = 13
> Unit vector = v/13
> = (3/13, 4/13, 12/13)
- Vectors in ℝⁿ need n components; the same rules hold in any dimension.
K: Vectors have size and direction; |v| = √(Σv_{i}^{2}); unit vector v/|v|; add componentwise; AB = b − a.
!: Writing the vector from A to B as a − b instead of b − a.
Q: What is the vector from A(1, 2) to B(4, 6)? | (3, 4).
Q: What is the magnitude of (1, 1)? | √2.
SUM: Vectors combine size and direction.
SUM: Components make geometry algebraic.
SRC: Strang G, Introduction to Linear Algebra (6th edn, Wellesley-Cambridge Press 2023) | textbook | 2023 | https://math.mit.edu/~gs/linearalgebra/
SRC: Department for Education, Mathematics AS and A level subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
NUM1#maths-u11-01-q1@1: Find the magnitude of (2, −1, 2). | 3 | 0 |  | √(4 + 1 + 4) = 3.
M1#maths-u11-01-q2@1: What is the midpoint of A(2, 6) and B(8, 0)? | (5, 3) | (6, −6) | (10, 6) | (3, 5) | (4, 3) | Average the coordinates: ((2 + 8)/2, (6 + 0)/2).
M2#maths-u11-01-q3@2: What is −2(1, −3)? | (−2, 6) | (2, −6) | (−2, −6) | (−1, 3) | (−3, 1) | Scalar multiplication scales every component: −2 × 1 = −2 and −2 × (−3) = 6.

## Vector Algebra
S: Vector algebra multiplies vectors in two useful ways. The dot product gives angles and projections; the cross product gives perpendicular vectors and areas. Together they solve problems in geometry, physics and graphics.
O: Calculate dot and cross products and use them to find angles, areas and volumes
O: Find the projection of one vector onto another
T: Dot product | a · b = Σ a_{i}b_{i} = |a||b| cos θ, a scalar
T: Cross product | a × b, a vector perpendicular to a and b with length |a||b| sin θ (in 3D)
H: Dot product
- a · b = 0 exactly when a and b are perpendicular (and non-zero).
- Angle: cos θ = a · b/(|a||b|).
- Projection of b onto a: (a · b/|a|^{2}) a.
- Work done by a force: F · d.
H: Cross product
- a × b = (a₂b₃ − a₃b₂, a₃b₁ − a₁b₃, a₁b₂ − a₂b₁).
- |a × b| is the area of the parallelogram on a and b.
- Anticommutative: b × a = −(a × b); a × a = 0.
- Torque τ = r × F; normals to planes in graphics.
H: Triple product
- a · (b × c) is the volume of the parallelepiped (with sign).
- Zero exactly when a, b, c are coplanar.
X: Find the angle between a = (1, 2, 2) and b = (2, −1, 2).
> a · b = 2 − 2 + 4 = 4
> |a| = 3 and |b| = 3
> cos θ = 4/9, so θ ≈ 63.6°
- Example: the angle between (1, 0) and (1, 1) is 45°, since cos θ = 1/√2.
- Component of b along a unit vector u: b · u.
K: a · b = |a||b| cos θ (zero means perpendicular); a × b is perpendicular with length = parallelogram area; a · (b × c) is volume.
!: Taking the cross product of 2D vectors or confusing its order (it's anticommutative).
Q: What is i × j? | k.
Q: When is a · b negative? | When the angle between a and b is obtuse.
SUM: Dot products give angles.
SUM: Cross products give perpendiculars and areas.
SRC: Strang G, Introduction to Linear Algebra (6th edn, Wellesley-Cambridge Press 2023) | textbook | 2023 | https://math.mit.edu/~gs/linearalgebra/
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
NUM1#maths-u11-02-q1@1: Find the area of the parallelogram spanned by (1, 2, 0) and (3, 1, 0). | 5 | 0 |  | The cross product is (0, 0, 1 − 6) = (0, 0, −5), with length 5.
M1#maths-u11-02-q2@1: Are (2, −1, 3) and (1, 5, 1) perpendicular? | Yes: their dot product is 0 | No: their dot product is 6 | Yes: their cross product is 0 | No: they have different lengths | It can't be decided | The dot product is 2 − 5 + 3 = 0, and a zero dot product means perpendicular.
M2#maths-u11-02-q3@2: What does a · (b × c) = 0 tell you? | a, b and c lie in one plane | a, b and c are all perpendicular | a is a unit vector | b and c are parallel only | The vectors have equal length | Zero volume means the parallelepiped is flat: the vectors are coplanar.

## Vector Spaces
S: A vector space is any collection of objects that can be added and scaled following the familiar rules. Arrows, lists of numbers, polynomials, matrices and functions are all vector spaces, so one theory covers them all.
O: Check whether a set with operations is a vector space
O: Recognise standard examples of vector spaces
T: Vector space | A set V with addition and scalar multiplication over a field, satisfying the eight axioms (associativity, commutativity, zero, negatives, distributivity, …)
T: Field of scalars | The numbers you can multiply by: usually ℝ or ℂ
H: Examples
- ℝⁿ and ℂⁿ: lists of numbers.
- P_{n}: polynomials of degree at most n (dimension n + 1).
- M_{m×n}: all m × n matrices.
- Function spaces: all continuous functions on [0, 1]; solutions of a linear homogeneous ODE.
H: Non-examples
- Positive real numbers under ordinary addition: no zero vector and no negatives.
- A line not through the origin: adding two points leaves the line.
- Integer vectors ℤ^{2} over ℝ: scaling by ½ leaves the set.
H: Why abstraction helps
- Results about bases, dimension and linear maps apply to every example.
- Fourier series treat functions as vectors in an infinite-dimensional space.
- Quantum states live in complex vector spaces.
X: Is the set of 2 × 2 symmetric matrices a vector space?
> The zero matrix is symmetric
> If A and B are symmetric, (A + B)ᵀ = A + B and (kA)ᵀ = kA
> It's closed under both operations inside the vector space M₂ₓ₂, so it is a vector space (of dimension 3)
K: Vector spaces satisfy the addition and scaling axioms; ℝⁿ, polynomials, matrices and functions are examples; check for a zero vector and closure.
!: Forgetting that a vector space must contain the zero vector.
Q: What is the dimension of P₂ (polynomials of degree at most 2)? | 3.
Q: Is the set {(x, y) : y = 2x + 1} a vector space? | No: it doesn't contain (0, 0).
SUM: Vector spaces share one set of rules.
SUM: Many familiar objects are vectors.
SRC: Axler S, Linear Algebra Done Right (4th edn, Springer 2024) | textbook | 2024 | https://linear.axler.net/
SRC: Halmos PR, Finite-Dimensional Vector Spaces (Springer 1974) | textbook | 1974 | https://link.springer.com/
NUM1#maths-u11-03-q1@1: What is the dimension of P₃, the polynomials of degree at most 3? | 4 | 0 |  | A basis is 1, x, x^{2}, x^{3}: four elements.
M1#maths-u11-03-q2@1: Which set is a vector space under the usual operations? | All polynomials of degree at most 4 | Polynomials of degree exactly 4 | Positive real numbers | Integer pairs over ℝ | Vectors of length 1 | Degree at most 4 is closed under addition and scaling and contains 0.
M2#maths-u11-03-q3@2: Why aren't polynomials of degree exactly 3 a vector space? | x^{3} + (−x^{3}) = 0 isn't of degree 3, so the set isn't closed | They have too many terms | They can't be scaled | Their degree is odd | They are a vector space | Sums can drop in degree, and the zero polynomial is missing.

## Subspaces
S: A subspace is a vector space sitting inside a larger one: a line or plane through the origin, or the solutions of a homogeneous linear system. Subspaces are where solutions, ranges and eigenvectors live.
O: Test whether a subset is a subspace
O: Describe subspaces of ℝ^{2} and ℝ^{3}
T: Subspace | A subset containing 0 and closed under addition and scalar multiplication
T: Trivial subspaces | {0} and the whole space
H: The test
- Contains the zero vector.
- Closed under addition: u, v in W ⇒ u + v in W.
- Closed under scaling: v in W ⇒ kv in W.
- If any test fails, it's not a subspace.
H: Examples
- In ℝ^{2}: {0}, lines through the origin, ℝ^{2} itself.
- In ℝ^{3}: {0}, lines and planes through the origin, ℝ^{3}.
- Solutions of Ax = 0 (the null space), the span of any set, the intersection of subspaces.
H: Non-examples
- Solutions of Ax = b with b ≠ 0 (no zero vector).
- The union of two lines (not closed under addition).
- The first quadrant (not closed under negative scaling).
X: Is W = {(x, y, z) : x + 2y − z = 0} a subspace of ℝ^{3}? What about x + 2y − z = 1?
> (0, 0, 0) satisfies x + 2y − z = 0; sums and multiples of solutions are solutions (the equation is linear and homogeneous)
> So W is a subspace: a plane through the origin, of dimension 2
> For x + 2y − z = 1, the origin fails, so it isn't a subspace
K: Subspaces contain 0 and are closed under addition and scaling; lines and planes through 0 and null spaces are subspaces; shifted planes and unions usually aren't.
!: Checking only closure under addition and forgetting scaling (or the zero vector).
Q: Is the intersection of two subspaces a subspace? | Yes.
Q: Is the union of the x-axis and y-axis a subspace of ℝ^{2}? | No: (1, 0) + (0, 1) isn't in it.
SUM: Subspaces are vector spaces inside vector spaces.
SUM: Zero, closure under + and × are the tests.
SRC: Lay DC, Lay SR, McDonald JJ, Linear Algebra and Its Applications (6th edn, Pearson 2021) | textbook | 2021 | https://www.pearson.com/
SRC: Axler S, Linear Algebra Done Right (4th edn, Springer 2024) | textbook | 2024 | https://linear.axler.net/
NUM1#maths-u11-04-q1@1: What is the dimension of the plane x + 2y − z = 0 in ℝ^{3}? | 2 | 0 |  | One linear condition on three variables leaves two free parameters.
M1#maths-u11-04-q2@1: Which subset of ℝ^{2} is a subspace? | The line y = 3x | The line y = 3x + 1 | The circle x^{2} + y^{2} = 1 | The first quadrant | The set {(1, 1)} | Only y = 3x passes through the origin and is closed under both operations.
M3#maths-u11-04-q3@2: Why is the set of solutions of Ax = b (with b ≠ 0) never a subspace? | A·0 = 0 ≠ b, so the zero vector isn't a solution | It has too many solutions | A must be square | It's always empty | It is a subspace | Every subspace contains 0, which fails Ax = b when b ≠ 0.

## Linear Combinations
S: A linear combination adds scalar multiples of vectors: c₁v₁ + c₂v₂ + … + c_{k}v_{k}. Asking which vectors can be built this way, and with which coefficients, is the central question behind linear systems, span and bases.
O: Form and recognise linear combinations
O: Find coefficients by solving a linear system
T: Linear combination | c₁v₁ + … + c_{k}v_{k} for scalars c_{i}
T: Coefficient | The scalar c_{i} multiplying each vector
H: Building vectors
- (5, 5) = 2(1, 2) + 1(3, 1).
- Every vector in ℝ^{2} is xi + yj, a combination of the standard basis.
- The zero vector is always a combination (all coefficients 0).
H: Finding coefficients
- Set up equations component by component; solve the system.
- Matrix form: [v₁ v₂ … v_{k}]c = b; a solution exists iff b is in the column space.
- Coefficients may be unique, non-unique or non-existent.
H: Uses
- Mixing ingredients or alloys to hit target compositions.
- Colour mixing (RGB) as combinations of primaries.
- Superposition of solutions to linear equations.
X: Write (5, 5) as a combination of (1, 2) and (3, 1).
> a(1, 2) + b(3, 1) = (5, 5) gives a + 3b = 5 and 2a + b = 5
> From the second, b = 5 − 2a; then a + 15 − 6a = 5, so a = 2
> b = 1: (5, 5) = 2(1, 2) + (3, 1)
K: Linear combinations add scaled vectors; find coefficients by solving the system [v₁ … v_{k}]c = b; solutions may be unique, many or none.
!: Assuming every vector can be written as a combination of any given vectors.
Q: Is (0, 0) a linear combination of any vectors? | Yes: take all coefficients 0.
Q: In matrix form, what system gives the coefficients? | [v₁ … v_{k}]c = b.
SUM: Linear combinations build vectors.
SUM: Coefficients come from linear systems.
SRC: Strang G, Introduction to Linear Algebra (6th edn, Wellesley-Cambridge Press 2023) | textbook | 2023 | https://math.mit.edu/~gs/linearalgebra/
SRC: Lay DC, Lay SR, McDonald JJ, Linear Algebra and Its Applications (6th edn, Pearson 2021) | textbook | 2021 | https://www.pearson.com/
NUM1#maths-u11-05-q1@1: Write (4, 7) = a(1, 1) + b(1, 2). Find b. | 3 | 0 |  | a + b = 4 and a + 2b = 7, so b = 3 (and a = 1).
M1#maths-u11-05-q2@1: Which vector is a linear combination of (1, 0, 0) and (0, 1, 0)? | (3, −2, 0) | (0, 0, 1) | (1, 1, 1) | (2, 0, 5) | (0, 3, 4) | Combinations of these have third component 0.
M2#maths-u11-05-q3@2: When does [v₁ v₂ v₃]c = b have a solution? | When b lies in the span of v₁, v₂ and v₃ | Always | Only when b = 0 | Only when the v_{i} are unit vectors | Never | Solvability means b is some combination of the columns.

## Span
S: The span of a set of vectors is everything you can build from them by linear combinations. It's always a subspace: a line, a plane or more, and spanning sets describe subspaces economically.
O: Describe the span of a set of vectors geometrically and algebraically
O: Test whether a vector lies in a span
T: Span | span{v₁, …, v_{k}}, the set of all linear combinations of the v_{i}
T: Spanning set | A set whose span is the whole space (or a given subspace)
H: Geometry
- One non-zero vector spans a line through the origin.
- Two non-parallel vectors in ℝ^{3} span a plane through the origin.
- Three vectors not in one plane span ℝ^{3}.
- Adding a vector already in the span doesn't enlarge it.
H: Testing membership
- b is in span{v₁, …, v_{k}} iff the system [v₁ … v_{k}]c = b is consistent.
- Row reduce the augmented matrix and look for a row [0 … 0 | non-zero].
H: Facts
- A span is always a subspace, the smallest containing the vectors.
- To span ℝⁿ you need at least n vectors.
- Spans of different sets can be equal: span{(1, 0), (0, 1)} = span{(1, 1), (1, −1)} = ℝ^{2}.
X: Is (1, 1, 1) in span{(1, 0, 1), (0, 1, 0)}? Is (1, 2, 3)?
> a(1, 0, 1) + b(0, 1, 0) = (a, b, a)
> (1, 1, 1): a = 1, b = 1 works, so yes
> (1, 2, 3) would need a = 1 and a = 3: impossible, so no
- The columns of a matrix span its column space (see Column Space).
K: The span is all combinations, always a subspace; test membership by solving a system; spanning ℝⁿ needs at least n vectors.
!: Thinking two vectors in ℝ^{3} can span all of ℝ^{3}.
Q: What does one non-zero vector in ℝ^{3} span? | A line through the origin.
Q: What is the minimum number of vectors needed to span ℝ^{4}? | 4.
SUM: The span is everything you can build.
SUM: It's always a subspace.
SRC: Lay DC, Lay SR, McDonald JJ, Linear Algebra and Its Applications (6th edn, Pearson 2021) | textbook | 2021 | https://www.pearson.com/
SRC: Axler S, Linear Algebra Done Right (4th edn, Springer 2024) | textbook | 2024 | https://linear.axler.net/
NUM1#maths-u11-06-q1@1: What is the dimension of span{(1, 2), (2, 4)}? | 1 | 0 |  | (2, 4) = 2(1, 2), so the span is a single line.
M1#maths-u11-06-q2@1: What is span{(1, 0, 0), (0, 1, 0)} in ℝ^{3}? | The xy-plane | All of ℝ^{3} | The x-axis | A line through (1, 1, 0) | The z-axis | Combinations (a, b, 0) fill the plane z = 0.
M2#maths-u11-06-q3@2: Adding a vector w to a set S doesn't change span(S). What does that tell you? | w is already a linear combination of the vectors in S | w is the zero vector only | S spans the whole space | w is perpendicular to S | Nothing | A new vector enlarges the span only if it's outside it.

## Linear Independence
S: Vectors are linearly independent when none of them can be built from the others. Independence means no redundancy, and it's exactly what makes coordinates unique and bases efficient.
O: Test sets of vectors for linear independence
O: Find a dependence relation when vectors are dependent
T: Linearly independent | c₁v₁ + … + c_{k}v_{k} = 0 only when every c_{i} = 0
T: Dependence relation | A non-trivial combination equal to 0, showing one vector depends on others
H: Tests
- Two vectors: dependent iff one is a multiple of the other.
- n vectors in ℝⁿ: independent iff the matrix with them as columns has non-zero determinant.
- General: row reduce; independent iff every column is a pivot column.
- More than n vectors in ℝⁿ are always dependent.
H: Facts
- Any set containing 0 is dependent.
- Subsets of independent sets are independent.
- Functions: 1, x, x^{2} are independent; sin^{2} x, cos^{2} x, 1 are dependent (sin^{2} + cos^{2} − 1 = 0).
H: Why it matters
- Independent spanning sets are bases: no wasted vectors.
- In data, dependent columns (multicollinearity) make regression unstable (School 13).
- Solutions of linear ODEs need n independent functions (Wronskian test, School 10).
X: Are (1, 2, 3), (4, 5, 6) and (7, 8, 9) independent?
> det [[1, 4, 7], [2, 5, 8], [3, 6, 9]] = 0
> So they're dependent; indeed (7, 8, 9) = 2(4, 5, 6) − (1, 2, 3)
> Dependence relation: (1, 2, 3) − 2(4, 5, 6) + (7, 8, 9) = 0
K: Independent means only the trivial combination gives 0; test by determinant or pivots; more than n vectors in ℝⁿ are dependent; any set with 0 is dependent.
!: Concluding independence because no vector is a multiple of another single vector (it might be a combination of several).
Q: Are (1, 0) and (2, 0) independent? | No: (2, 0) = 2(1, 0).
Q: Can four vectors in ℝ^{3} be independent? | No.
SUM: Independence means no redundancy.
SUM: Determinants and pivots test it.
SRC: Strang G, Introduction to Linear Algebra (6th edn, Wellesley-Cambridge Press 2023) | textbook | 2023 | https://math.mit.edu/~gs/linearalgebra/
SRC: Lay DC, Lay SR, McDonald JJ, Linear Algebra and Its Applications (6th edn, Pearson 2021) | textbook | 2021 | https://www.pearson.com/
NUM1#maths-u11-07-q1@1: Find det [[1, 3], [2, 4]], and so decide whether (1, 2) and (3, 4) are independent. | -2 | 0 |  | 1 × 4 − 3 × 2 = −2 ≠ 0, so they're independent.
M1#maths-u11-07-q2@1: Which set is linearly dependent? | {(1, 2), (2, 4)} | {(1, 0), (0, 1)} | {(1, 1), (1, −1)} | {(2, 3), (3, 2)} | {(1, 2), (0, 5)} | (2, 4) = 2(1, 2), so one vector is a multiple of the other and the set is dependent.
M2#maths-u11-07-q3@2: Why is any set containing the zero vector dependent? | 1 × 0 = 0 is a non-trivial combination giving 0 | The zero vector has no direction | Zero can't be scaled | It isn't dependent | Zero is always a multiple of every vector only in ℝ^{2} | A coefficient of 1 on the zero vector, 0 elsewhere, gives a non-trivial relation.

## Basis and Dimension
S: A basis is an independent set that spans the space: the smallest complete set of building blocks. Every basis of a space has the same number of vectors, its dimension, which measures how many independent directions the space has.
O: Find bases for subspaces and state their dimensions
O: Use coordinates relative to a basis
T: Basis | A linearly independent spanning set
T: Dimension | The number of vectors in any basis of the space
H: Key facts
- Every vector has unique coordinates relative to a basis.
- Standard basis of ℝⁿ: e₁, …, eₙ; of P_{n}: 1, x, …, xⁿ.
- In an n-dimensional space, n independent vectors automatically span, and n spanning vectors are automatically independent.
H: Finding bases
- Plane x + 2y − z = 0: z = x + 2y, so (1, 0, 1) and (0, 1, 2) form a basis.
- Column space: the pivot columns of the original matrix.
- Null space: one vector per free variable.
H: Dimension counts
- dim M_{m×n} = mn; dim P_{n} = n + 1.
- Rank–nullity: for an m × n matrix, rank + nullity = n.
- Infinite-dimensional spaces (all polynomials, function spaces) have no finite basis.
X: Find a basis and the dimension of the plane x + 2y − z = 0.
> Solve for z: z = x + 2y, with x and y free
> (x, y, z) = x(1, 0, 1) + y(0, 1, 2)
> Basis {(1, 0, 1), (0, 1, 2)}; dimension 2
K: A basis is independent and spanning; all bases have the same size (the dimension); coordinates are unique; free variables give null space bases.
!: Listing a spanning set that contains dependent vectors and calling it a basis.
Q: What is the dimension of M_{2×3}? | 6.
Q: In ℝ^{3}, do any three independent vectors form a basis? | Yes.
SUM: Bases are minimal complete building sets.
SUM: Dimension counts independent directions.
SRC: Axler S, Linear Algebra Done Right (4th edn, Springer 2024) | textbook | 2024 | https://linear.axler.net/
SRC: Strang G, Introduction to Linear Algebra (6th edn, Wellesley-Cambridge Press 2023) | textbook | 2023 | https://math.mit.edu/~gs/linearalgebra/
NUM1#maths-u11-08-q1@1: What is the dimension of the space of 3 × 3 matrices? | 9 | 0 |  | Nine independent entries, one basis matrix for each.
M1#maths-u11-08-q2@1: Which set is a basis for ℝ^{2}? | {(1, 1), (1, −1)} | {(1, 2), (2, 4)} | {(1, 0)} | {(0, 0), (1, 1)} | {(1, 0), (0, 1), (1, 1)} | Two independent vectors in ℝ^{2} span it; the others are dependent or too few.
M3#maths-u11-08-q3@2: What are the coordinates of (5, 1) relative to the basis {(1, 1), (1, −1)}? | (3, 2) | (5, 1) | (2, 3) | (6, 4) | (1, 5) | Solve a(1, 1) + b(1, −1) = (5, 1): a + b = 5 and a − b = 1 give a = 3, b = 2.

## Matrices
S: A matrix is a rectangular array of numbers. Matrices store data, represent systems of linear equations and describe linear transformations, so they're the main computational tool of linear algebra.
O: Describe matrices by size and entries, and recognise special types
O: Use matrices to represent systems and data
T: m × n matrix | A matrix with m rows and n columns; a_{ij} is the entry in row i, column j
T: Identity matrix | I, square with 1s on the diagonal and 0s elsewhere; AI = IA = A
H: Special matrices
- Square, diagonal, upper and lower triangular.
- Zero matrix, identity matrix.
- Symmetric (Aᵀ = A) and skew-symmetric (Aᵀ = −A).
- Row and column vectors are 1 × n and n × 1 matrices.
H: What matrices represent
- Systems: the coefficient matrix of 2x + 3y = 5, x − y = 1 is [[2, 3], [1, −1]].
- Linear maps: rotations, reflections and projections act by multiplication.
- Data tables: rows as cases, columns as variables; images as pixel arrays.
- Networks: adjacency matrices of graphs (School 15).
H: Notation
- Capital letters for matrices, a_{ij} for entries.
- The size must match for operations: check before calculating.
X: Write the system 2x + 3y − z = 4, x − y + 2z = 0 as a matrix equation, and give the size of the coefficient matrix.
> Coefficients: [[2, 3, −1], [1, −1, 2]]
> Ax = b with x = (x, y, z) and b = (4, 0)
> A is 2 × 3: 2 equations, 3 unknowns
K: An m × n matrix has m rows and n columns; know the special types; matrices represent systems, maps, data and networks.
!: Writing the size as columns × rows.
Q: What size is a matrix with 3 rows and 5 columns? | 3 × 5.
Q: What is AI for any compatible A? | A.
SUM: Matrices organise numbers in rows and columns.
SUM: They represent systems, maps and data.
SRC: Strang G, Introduction to Linear Algebra (6th edn, Wellesley-Cambridge Press 2023) | textbook | 2023 | https://math.mit.edu/~gs/linearalgebra/
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
NUM1#maths-u11-09-q1@1: How many entries does a 4 × 5 matrix have? | 20 | 0 |  | 4 rows × 5 columns = 20.
M1#maths-u11-09-q2@1: Which matrix is upper triangular? | [[1, 2], [0, 3]] | [[1, 0], [2, 3]] | [[0, 1], [1, 0]] | [[1, 2], [3, 4]] | [[0, 0], [1, 0]] | Upper triangular means every entry below the main diagonal is zero, as in [[1, 2], [0, 3]].
M2#maths-u11-09-q3@2: In [[5, 2, 7], [1, 9, 4]], what is a₂₃? | 4 | 7 | 9 | 2 | 1 | a₂₃ is the entry in row 2, column 3, which is 4.

## Matrix Algebra
S: Matrix algebra has its own rules. Addition behaves like ordinary addition, but multiplication isn't commutative, products can be zero without either factor being zero, and cancellation can fail.
O: Apply the rules of matrix algebra correctly
O: Recognise where matrix algebra differs from number algebra
T: Non-commutativity | In general AB ≠ BA
T: Zero divisor | Non-zero matrices A and B with AB = 0
H: Rules that hold
- (A + B) + C = A + (B + C); A + B = B + A.
- (AB)C = A(BC); A(B + C) = AB + AC; (A + B)C = AC + BC.
- k(AB) = (kA)B = A(kB); AI = IA = A.
H: Rules that fail
- AB ≠ BA in general; order matters (rotate then reflect ≠ reflect then rotate).
- AB = 0 doesn't imply A = 0 or B = 0.
- AB = AC doesn't imply B = C unless A is invertible.
- (A + B)^{2} = A^{2} + AB + BA + B^{2}, not A^{2} + 2AB + B^{2}.
H: Polynomials and powers
- A^{2} = AA; p(A) = a₀I + a₁A + a₂A^{2} + ….
- Cayley–Hamilton: every square matrix satisfies its own characteristic polynomial.
X: For A = [[1, 1], [0, 1]] and B = [[1, 0], [1, 1]], compare AB and BA.
> AB = [[2, 1], [1, 1]]
> BA = [[1, 1], [1, 2]]
> AB ≠ BA: matrix multiplication isn't commutative
- Example: A = [[0, 1], [0, 0]] satisfies A^{2} = 0, though A ≠ 0.
K: Addition is commutative, multiplication is associative and distributive but not commutative; zero divisors exist; cancellation needs invertibility; expand (A + B)^{2} carefully.
!: Writing (A + B)^{2} = A^{2} + 2AB + B^{2} for matrices that don't commute.
Q: Expand (A + B)^{2} for matrices. | A^{2} + AB + BA + B^{2}.
Q: If AB = AC and A is invertible, what follows? | B = C.
SUM: Matrix algebra mostly follows familiar rules.
SUM: Commutativity and cancellation fail.
SRC: Strang G, Introduction to Linear Algebra (6th edn, Wellesley-Cambridge Press 2023) | textbook | 2023 | https://math.mit.edu/~gs/linearalgebra/
SRC: Horn RA, Johnson CR, Matrix Analysis (2nd edn, Cambridge University Press 2013) | textbook | 2013 | https://www.cambridge.org/
NUM1#maths-u11-10-q1@1: For AB = [[2, 1], [1, 1]] above, find its trace. | 3 | 0 |  | 2 + 1 = 3 (and BA has the same trace, as always).
M1#maths-u11-10-q2@1: Which pair of non-zero matrices has product zero? | [[1, 0], [0, 0]] and [[0, 0], [0, 1]] | [[1, 0], [0, 1]] and [[1, 0], [0, 1]] | [[1, 1], [1, 1]] and [[1, 0], [0, 1]] | [[2, 0], [0, 2]] and [[1, 1], [0, 1]] | None exist | The first kills the second coordinate, the second kills the first.
M2#maths-u11-10-q3@2: Which property holds for all compatible matrices? | A(BC) = (AB)C | AB = BA | AB = 0 implies A = 0 | AB = AC implies B = C | (AB)^{2} = A^{2}B^{2} | Associativity holds; the others fail in general.

## Matrix Operations
S: The basic matrix operations are addition, scalar multiplication, the trace and elementary row operations. Row operations are the engine of Gaussian elimination, used to solve systems and find inverses and ranks.
O: Carry out addition, scalar multiplication and the trace
O: Perform elementary row operations and understand their effects
T: Trace | tr A, the sum of the diagonal entries of a square matrix
T: Elementary row operations | Swapping two rows, multiplying a row by a non-zero scalar, adding a multiple of one row to another
H: Entrywise operations
- A + B and kA work entry by entry (same sizes for addition).
- tr(A + B) = tr A + tr B; tr(AB) = tr(BA).
- The Hadamard (entrywise) product is used in statistics and machine learning, but isn't the usual matrix product.
H: Row operations
- They don't change the solution set of a system.
- Effect on determinants: swap multiplies by −1; scaling a row by k multiplies by k; adding a multiple leaves it unchanged.
- Each corresponds to multiplying on the left by an elementary matrix.
H: Row echelon form
- Leading entries (pivots) step down and to the right.
- Reduced row echelon form: pivots are 1 with zeros above and below.
- Reveals rank, solutions and bases of row and column spaces.
X: Reduce [[1, 2, 3], [2, 5, 8]] to row echelon form.
> R₂ → R₂ − 2R₁: [[1, 2, 3], [0, 1, 2]]
> R₁ → R₁ − 2R₂: [[1, 0, −1], [0, 1, 2]]
> This is reduced row echelon form, with pivots in columns 1 and 2
K: Add and scale entrywise; tr(AB) = tr(BA); three row operations preserve solutions and change determinants predictably; echelon forms reveal structure.
!: Multiplying a row by zero, which isn't an allowed row operation.
Q: What does swapping two rows do to the determinant? | Multiplies it by −1.
Q: What is tr([[3, 1], [4, 7]])? | 10.
SUM: Row operations drive elimination.
SUM: Trace and entrywise operations are simple tools.
SRC: Lay DC, Lay SR, McDonald JJ, Linear Algebra and Its Applications (6th edn, Pearson 2021) | textbook | 2021 | https://www.pearson.com/
SRC: Strang G, Introduction to Linear Algebra (6th edn, Wellesley-Cambridge Press 2023) | textbook | 2023 | https://math.mit.edu/~gs/linearalgebra/
NUM1#maths-u11-11-q1@1: Find tr(2A − B) for A = [[1, 0], [0, 3]] and B = [[2, 5], [1, 1]]. | 5 | 0 |  | 2A − B has diagonal 0 and 5, so the trace is 5.
M1#maths-u11-11-q2@1: Which is an elementary row operation? | Adding 3 times row 1 to row 2 | Multiplying row 2 by 0 | Squaring every entry of row 1 | Swapping two columns | Adding 1 to every entry | Adding a multiple of one row to another is allowed and keeps solutions.
M2#maths-u11-11-q3@2: Adding a multiple of one row to another changes the determinant how? | It doesn't change it | It doubles it | It changes its sign | It makes it zero | It multiplies it by the multiple | That operation's elementary matrix has determinant 1.

## Matrix Multiplication
S: Matrix multiplication combines rows of the first matrix with columns of the second. It represents composing linear maps, chaining transformations and applying systems to data, and its cost dominates scientific computing.
O: Multiply matrices and check compatibility of sizes
O: Interpret matrix products as composition of linear maps
T: Matrix product | (AB)_{ij} = Σ_{k} a_{ik}b_{kj}, the dot product of row i of A with column j of B
T: Compatibility | AB is defined when A is m × n and B is n × p; the result is m × p
H: Computing
- Each entry is a row of A dotted with a column of B.
- Column view: AB's columns are A times B's columns.
- Row view: AB's rows are A's rows times B.
- An n × n product takes about n^{3} multiplications by the standard method.
H: Meaning
- If A and B represent linear maps, AB means "apply B, then A".
- Powers Aⁿ apply the map n times (Markov chains, population models).
- Matrix-vector products Ax combine A's columns with weights from x.
H: Fast multiplication
- Strassen (1969) showed it can be done in about n^{2.81} operations.
- Theoretical exponents now lie below 2.38; practical code uses blocked algorithms tuned to hardware.
X: Compute [[1, 2], [3, 4]][[5, 6], [7, 8]].
> Row 1 · columns: 1 × 5 + 2 × 7 = 19; 1 × 6 + 2 × 8 = 22
> Row 2 · columns: 3 × 5 + 4 × 7 = 43; 3 × 6 + 4 × 8 = 50
> Result [[19, 22], [43, 50]]
K: (AB)_{ij} = row i of A · column j of B; inner sizes must match; AB means apply B then A; standard cost ~ n^{3}.
!: Multiplying entry by entry instead of row by column.
Q: What size is the product of a 2 × 3 and a 3 × 4 matrix? | 2 × 4.
Q: Is the product of a 3 × 2 and a 3 × 2 matrix defined? | No: the inner sizes (2 and 3) don't match.
SUM: Multiply rows by columns.
SUM: Products compose linear maps.
SRC: Strang G, Introduction to Linear Algebra (6th edn, Wellesley-Cambridge Press 2023) | textbook | 2023 | https://math.mit.edu/~gs/linearalgebra/
SRC: Strassen V, Gaussian elimination is not optimal, Numerische Mathematik 13, 354 | journal | 1969 | https://doi.org/10.1007/BF02165411
NUM1#maths-u11-12-q1@1: In [[1, 2], [3, 4]][[5, 6], [7, 8]], what is the (2, 2) entry? | 50 | 0 |  | 3 × 6 + 4 × 8 = 18 + 32 = 50.
M1#maths-u11-12-q2@1: Which product is defined? | (2 × 3)(3 × 5) | (2 × 3)(2 × 3) | (4 × 1)(4 × 1) | (3 × 2)(3 × 2) | (5 × 2)(3 × 5) | Only (2 × 3)(3 × 5) has matching inner sizes.
M2#maths-u11-12-q3@2: R rotates by 90° and F reflects in the x-axis. What does the product FR do to a vector? | Rotates it, then reflects it | Reflects it, then rotates it | Only rotates it | Only reflects it | Nothing | In FRv the matrix nearest v acts first, so R rotates and then F reflects.

## Matrix Transposition
S: The transpose of a matrix swaps its rows and columns. It turns column vectors into row vectors, defines symmetric matrices, and appears everywhere from dot products to least squares.
O: Calculate transposes and use the rules for transposes of products
O: Recognise symmetric and skew-symmetric matrices
T: Transpose | Aᵀ with (Aᵀ)_{ij} = a_{ji}
T: Symmetric matrix | A square matrix with Aᵀ = A
H: Rules
- (Aᵀ)ᵀ = A; (A + B)ᵀ = Aᵀ + Bᵀ; (kA)ᵀ = kAᵀ.
- (AB)ᵀ = BᵀAᵀ: the order reverses.
- (A^{−1})ᵀ = (Aᵀ)^{−1}; det Aᵀ = det A.
H: Uses
- Dot product: x · y = xᵀy.
- AᵀA is always square and symmetric (and positive semi-definite): it appears in least squares.
- Any square matrix splits as symmetric + skew-symmetric: A = (A + Aᵀ)/2 + (A − Aᵀ)/2.
H: Complex matrices
- The conjugate transpose A* (or A^{H}) replaces transpose for complex matrices (see Hermitian Matrices).
X: For A = [[1, 2, 3], [4, 5, 6]], find Aᵀ and the size of AᵀA.
> Aᵀ = [[1, 4], [2, 5], [3, 6]]
> A is 2 × 3, so AᵀA is (3 × 2)(2 × 3) = 3 × 3
> AᵀA is symmetric, as always
- Example: x = (1, 2) and y = (3, 4) give xᵀy = 11, a 1 × 1 matrix.
- Orthogonal matrices satisfy Qᵀ = Q^{−1}.
- Transposing turns a row of data into a column for matrix calculations.
- For complex data the conjugate transpose plays the same role in inner products.
K: Transpose swaps rows and columns; (AB)ᵀ = BᵀAᵀ; x · y = xᵀy; AᵀA is symmetric; symmetric means Aᵀ = A.
!: Writing (AB)ᵀ = AᵀBᵀ, which usually isn't even defined.
Q: What is (ABC)ᵀ? | CᵀBᵀAᵀ.
Q: Is AᵀA always symmetric? | Yes.
SUM: Transposes swap rows and columns.
SUM: Products transpose in reverse order.
SRC: Strang G, Introduction to Linear Algebra (6th edn, Wellesley-Cambridge Press 2023) | textbook | 2023 | https://math.mit.edu/~gs/linearalgebra/
SRC: Horn RA, Johnson CR, Matrix Analysis (2nd edn, Cambridge University Press 2013) | textbook | 2013 | https://www.cambridge.org/
NUM1#maths-u11-13-q1@1: A is 3 × 5. How many entries does AᵀA have? | 25 | 0 |  | AᵀA is 5 × 5.
M1#maths-u11-13-q2@1: Which matrix is symmetric? | [[2, 7], [7, 3]] | [[2, 7], [−7, 3]] | [[1, 2], [3, 4]] | [[0, 1], [0, 0]] | [[1, 2, 3]] | A symmetric matrix equals its transpose: the entries above and below the diagonal match.
M2#maths-u11-13-q3@2: What is the symmetric part of A = [[1, 4], [2, 3]]? | [[1, 3], [3, 3]] | [[1, 4], [4, 3]] | [[0, 1], [−1, 0]] | [[1, 2], [4, 3]] | [[2, 6], [6, 6]] | The symmetric part is (A + Aᵀ)/2 = [[2, 6], [6, 6]]/2 = [[1, 3], [3, 3]].

## Matrix Inversion
S: The inverse of a square matrix undoes it: A^{−1}A = I. Inverses exist exactly when the determinant is non-zero, and they express solutions of linear systems, though in practice systems are solved without forming the inverse.
O: Find inverses of 2 × 2 matrices and by Gauss–Jordan elimination
O: Use the rules for inverses and know when inverses exist
T: Inverse matrix | A^{−1} with AA^{−1} = A^{−1}A = I
T: Singular matrix | A square matrix with determinant 0, which has no inverse
H: Finding inverses
- 2 × 2: [[a, b], [c, d]]^{−1} = (1/(ad − bc))[[d, −b], [−c, a]].
- Gauss–Jordan: row reduce [A | I] to [I | A^{−1}].
- Adjugate formula A^{−1} = adj(A)/det A (useful in theory, slow in practice).
H: Rules
- (AB)^{−1} = B^{−1}A^{−1}; (Aᵀ)^{−1} = (A^{−1})ᵀ; det(A^{−1}) = 1/det A.
- A is invertible ⇔ det A ≠ 0 ⇔ rank n ⇔ Ax = 0 has only x = 0 ⇔ columns independent.
H: In practice
- Solving Ax = b by computing A^{−1}b is slower and less accurate than elimination (LU).
- Ill-conditioned matrices (nearly singular) amplify errors.
- Inverses are useful for theory, small systems and change of basis.
X: Find the inverse of [[2, 1], [5, 3]].
> det = 2 × 3 − 1 × 5 = 1
> Swap the diagonal, negate the off-diagonal: [[3, −1], [−5, 2]]
> Divide by det 1: inverse [[3, −1], [−5, 2]] (check: product is I)
- Check an inverse by multiplying: AA^{−1} should be I.
K: Inverses exist iff det ≠ 0; use the 2 × 2 formula or Gauss–Jordan; (AB)^{−1} = B^{−1}A^{−1}; solve systems by elimination, not inversion.
!: Writing (AB)^{−1} = A^{−1}B^{−1}.
Q: When does a square matrix have no inverse? | When its determinant is 0.
Q: What is det(A^{−1}) if det A = 5? | ⅕.
SUM: Inverses undo matrices.
SUM: They exist only for non-zero determinants.
SRC: Lay DC, Lay SR, McDonald JJ, Linear Algebra and Its Applications (6th edn, Pearson 2021) | textbook | 2021 | https://www.pearson.com/
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
NUM1#maths-u11-14-q1@1: A has determinant 4. Find det(A^{−1}). | 0.25 | 0.0001 |  | det(A^{−1}) = 1/det A = ¼.
M1#maths-u11-14-q2@1: Which matrix is singular? | [[2, 4], [1, 2]] | [[1, 2], [3, 4]] | [[1, 0], [0, 1]] | [[0, 1], [1, 0]] | [[3, 1], [1, 3]] | det [[2, 4], [1, 2]] = 2 × 2 − 4 × 1 = 0, so it has no inverse.
M3#maths-u11-14-q3@2: Why is solving Ax = b by computing A^{−1}b usually avoided numerically? | Elimination is cheaper and less sensitive to rounding | Inverses never exist | It gives the wrong answer exactly | It needs complex numbers | It isn't avoided | Forming A^{−1} costs more and amplifies rounding errors.

## Determinants
S: The determinant of a square matrix is a single number that tells you whether the matrix is invertible and how it scales area or volume. It appears in inverses, eigenvalues, changes of variables and Cramer's rule.
O: Calculate 2 × 2 and 3 × 3 determinants
O: Use properties of determinants and interpret them geometrically
T: Determinant | det A; for 2 × 2, ad − bc; in general a signed sum over permutations, computed by cofactor expansion or elimination
T: Cofactor expansion | Expanding along a row or column: det A = Σ (−1)^{i+j}a_{ij}M_{ij}, with M_{ij} the minor
H: Calculating
- 2 × 2: ad − bc.
- 3 × 3: cofactor expansion along the row or column with most zeros.
- Triangular matrices: the product of the diagonal.
- Large matrices: row reduce to triangular form, tracking swaps and scalings.
H: Properties
- det(AB) = det A det B; det Aᵀ = det A; det(kA) = kⁿ det A for n × n.
- Swapping rows changes the sign; equal or proportional rows give 0.
- det A ≠ 0 ⇔ A invertible.
H: Geometry
- |det A| is the factor by which A scales areas (2D) or volumes (3D).
- The sign shows whether orientation is preserved or reversed.
- The Jacobian determinant in multivariable calculus is the same idea (School 8).
X: Find det [[2, 0, 1], [1, 3, 2], [0, 1, 1]].
> Expand along row 1: 2 × det [[3, 2], [1, 1]] − 0 + 1 × det [[1, 3], [0, 1]]
> = 2(3 − 2) + 1(1 − 0)
> = 3
- Example: a triangular matrix with diagonal 2, 3, 4 has determinant 24.
K: det = ad − bc for 2 × 2; expand by cofactors or reduce to triangular form; det(AB) = det A det B; |det| scales volume; det ≠ 0 means invertible.
!: Forgetting the alternating signs in cofactor expansion.
Q: What is det(kA) for a 3 × 3 matrix? | k^{3} det A.
Q: What does det A = 0 mean geometrically? | A flattens space into a lower dimension.
SUM: Determinants test invertibility.
SUM: They measure volume scaling.
SRC: Strang G, Introduction to Linear Algebra (6th edn, Wellesley-Cambridge Press 2023) | textbook | 2023 | https://math.mit.edu/~gs/linearalgebra/
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
NUM1#maths-u11-15-q1@1: A is 3 × 3 with det A = 5. Find det(2A). | 40 | 0 |  | det(2A) = 2^{3} × 5 = 40.
M1#maths-u11-15-q2@1: What is det [[4, 7], [2, 3]]? | −2 | 2 | 26 | −26 | 12 | For a 2 × 2 matrix det = ad − bc = 4 × 3 − 7 × 2 = 12 − 14 = −2.
M2#maths-u11-15-q3@2: A linear map of the plane has determinant −3. What does it do to areas and orientation? | Triples areas and reverses orientation | Triples areas and keeps orientation | Divides areas by 3 | Leaves areas unchanged | Collapses the plane | |det| = 3 scales area; the negative sign flips orientation.

## Rank of a Matrix
S: The rank of a matrix is the number of independent rows (or columns), equal to the number of pivots after row reduction. It measures how much information a matrix carries and decides whether systems have solutions.
O: Find the rank of a matrix by row reduction
O: Apply the rank–nullity theorem
T: Rank | The dimension of the column space (equal to the dimension of the row space)
T: Rank–nullity theorem | For an m × n matrix, rank + nullity = n, the number of columns
H: Computing rank
- Row reduce to echelon form and count the pivots.
- Row rank equals column rank, a non-obvious theorem.
- rank ≤ min(m, n); full rank means equality.
H: What rank tells you
- An n × n matrix is invertible iff its rank is n.
- Ax = b is solvable iff rank A = rank [A | b].
- Nullity n − rank counts the free variables, so the dimension of the solution set of Ax = 0.
H: Uses
- Low-rank approximation compresses data (via the SVD, later in this school).
- Rank deficiency signals redundant equations or collinear data.
- Numerical rank uses a tolerance, since rounding makes exact zeros rare.
X: Find the rank of [[1, 2, 3], [2, 4, 6], [1, 0, 1]].
> Row 2 is twice row 1, so it adds nothing
> Rows 1 and 3 are independent (not multiples)
> Rank 2; nullity = 3 − 2 = 1
- A rank-1 matrix is an outer product uvᵀ of two vectors.
K: Rank = number of pivots = dimension of the column (and row) space; rank + nullity = number of columns; full rank square matrices are invertible.
!: Counting non-zero rows before reducing to echelon form.
Q: What is the largest possible rank of a 4 × 6 matrix? | 4.
Q: What does rank A < rank [A | b] mean? | The system Ax = b has no solution.
SUM: Rank counts independent rows and columns.
SUM: Rank and nullity add to the number of columns.
SRC: Strang G, Introduction to Linear Algebra (6th edn, Wellesley-Cambridge Press 2023) | textbook | 2023 | https://math.mit.edu/~gs/linearalgebra/
SRC: Lay DC, Lay SR, McDonald JJ, Linear Algebra and Its Applications (6th edn, Pearson 2021) | textbook | 2021 | https://www.pearson.com/
NUM1#maths-u11-16-q1@1: A 3 × 5 matrix has rank 3. What is its nullity? | 2 | 0 |  | Nullity = 5 − 3 = 2.
M1#maths-u11-16-q2@1: What is the rank of [[1, 1], [1, 1]]? | 1 | 2 | 0 | 4 | 3 | The rows are equal, so only one is independent.
M3#maths-u11-16-q3@2: A 5 × 5 matrix has rank 4. Which statement is true? | Ax = 0 has non-zero solutions | A is invertible | det A ≠ 0 | Ax = b always has a unique solution | The columns are independent | Nullity 1 means a one-dimensional space of solutions to Ax = 0.

## Column Space
S: The column space of a matrix is the span of its columns: every vector Ax can produce. It answers the question "for which b does Ax = b have a solution?", and its dimension is the rank.
O: Find a basis for the column space
O: Decide whether a vector lies in the column space
T: Column space | col(A), the span of the columns of A, a subspace of ℝ^{m} for an m × n matrix
T: Pivot columns | The columns of the original matrix that correspond to pivots in its echelon form
H: Meaning
- Ax is a combination of A's columns with weights from x.
- So Ax = b is solvable exactly when b is in col(A).
- col(A) is also called the range or image of the linear map.
H: Finding a basis
- Row reduce A; note the pivot positions.
- Take the corresponding columns of the original A (not the reduced one).
- dim col(A) = rank A.
H: Links
- col(A) is orthogonal to the null space of Aᵀ (the left null space).
- Least squares projects b onto col(A) when Ax = b has no solution.
X: For A = [[1, 2], [2, 4]], describe col(A) and test b = (3, 6) and b = (1, 0).
> The second column is twice the first, so col(A) = span{(1, 2)}, a line
> (3, 6) = 3(1, 2) lies on it: solvable
> (1, 0) isn't a multiple of (1, 2): Ax = (1, 0) has no solution
- Example: an invertible n × n matrix has column space all of ℝⁿ.
- The column space of AB lies inside the column space of A.
K: col(A) = span of the columns = all Ax; Ax = b solvable iff b ∈ col(A); basis from the original pivot columns; dimension = rank.
!: Taking basis vectors from the reduced matrix instead of the original.
Q: What is col(I) for the 3 × 3 identity? | All of ℝ^{3}.
Q: In which space does the column space of a 4 × 2 matrix lie? | ℝ^{4}.
SUM: The column space is all possible outputs.
SUM: It decides solvability.
SRC: Strang G, Introduction to Linear Algebra (6th edn, Wellesley-Cambridge Press 2023) | textbook | 2023 | https://math.mit.edu/~gs/linearalgebra/
SRC: Lay DC, Lay SR, McDonald JJ, Linear Algebra and Its Applications (6th edn, Pearson 2021) | textbook | 2021 | https://www.pearson.com/
NUM1#maths-u11-17-q1@1: What is the dimension of the column space of a 4 × 6 matrix with rank 3? | 3 | 0 |  | dim col(A) = rank = 3.
M1#maths-u11-17-q2@1: Which vector is in the column space of [[1, 0], [0, 1], [0, 0]]? | (2, 5, 0) | (0, 0, 1) | (1, 1, 1) | (3, 0, 2) | (0, 1, 4) | Combinations of the columns have third component 0.
M2#maths-u11-17-q3@2: Why take basis vectors from the original matrix's pivot columns rather than the reduced matrix? | Row operations change the column space but keep column dependencies | The reduced matrix has no columns | The original has fewer columns | They give the same vectors | It doesn't matter | Row operations preserve which columns are independent, not the columns themselves.

## Row Space
S: The row space of a matrix is the span of its rows. Row operations don't change it, so the non-zero rows of an echelon form give a basis, and it's the orthogonal complement of the null space.
O: Find a basis for the row space by row reduction
O: Relate the row space to the null space and rank
T: Row space | row(A), the span of the rows of A, a subspace of ℝⁿ for an m × n matrix
T: Orthogonal complement | The set of all vectors perpendicular to every vector in a subspace
H: Finding a basis
- Row operations replace rows by combinations of rows, so row(A) is unchanged.
- The non-zero rows of any echelon form are a basis.
- dim row(A) = rank A = dim col(A).
H: Geometry
- Every x in the null space satisfies r · x = 0 for each row r, so null(A) ⟂ row(A).
- In fact null(A) is exactly the orthogonal complement of row(A) in ℝⁿ.
- So ℝⁿ splits into row(A) ⊕ null(A).
H: The four fundamental subspaces
- Column space and left null space (in ℝ^{m}); row space and null space (in ℝⁿ).
- Dimensions r, m − r, r, n − r for rank r (Strang's "fundamental theorem").
X: Find a basis for the row space of [[1, 2, 3], [2, 4, 6], [1, 0, 1]].
> R₂ → R₂ − 2R₁ gives a zero row; R₃ → R₃ − R₁ gives (0, −2, −2)
> Echelon rows: (1, 2, 3) and (0, −2, −2), or scaled (0, 1, 1)
> Basis {(1, 2, 3), (0, 1, 1)}; dimension 2 = rank
K: Row operations preserve the row space; echelon non-zero rows form a basis; dim = rank; null(A) is the orthogonal complement of row(A).
!: Assuming row operations preserve the column space too (they don't).
Q: Do row operations change the row space? | No.
Q: What is the relationship between row(A) and null(A)? | They're orthogonal complements in ℝⁿ.
SUM: Row spaces survive row operations.
SUM: They're perpendicular to null spaces.
SRC: Strang G, Introduction to Linear Algebra (6th edn, Wellesley-Cambridge Press 2023) | textbook | 2023 | https://math.mit.edu/~gs/linearalgebra/
SRC: Strang G, The fundamental theorem of linear algebra, American Mathematical Monthly 100(9), 848 | journal | 1993 | https://doi.org/10.2307/2324660
NUM1#maths-u11-18-q1@1: What is the dimension of the row space in the example? | 2 | 0 |  | Two non-zero echelon rows remain, so the rank is 2.
M1#maths-u11-18-q2@1: In which space does the row space of a 3 × 5 matrix lie? | ℝ^{5} | ℝ^{3} | ℝ^{15} | ℝ^{8} | ℝ^{2} | Each row of a 3 × 5 matrix has 5 entries, so the rows (and their span) live in ℝ^{5}.
M2#maths-u11-18-q3@2: x is in null(A) and r is a row of A. What is r · x? | 0 | 1 | |r||x| | It depends on A | Undefined | Ax = 0 means each row dotted with x is zero.

## Null Space
S: The null space (kernel) of a matrix is the set of solutions of Ax = 0. It tells you whether solutions of Ax = b are unique and describes all of them: one particular solution plus anything in the null space.
O: Find a basis for the null space
O: Describe the general solution of Ax = b using the null space
T: Null space | null(A) = {x : Ax = 0}, a subspace of ℝⁿ
T: Nullity | The dimension of the null space, equal to the number of free variables
H: Finding a basis
- Row reduce to reduced echelon form.
- Write pivot variables in terms of free variables.
- Set each free variable to 1 in turn (others 0) to get basis vectors.
H: Structure of solutions
- If x_{p} solves Ax = b, all solutions are x_{p} + n for n in null(A).
- Unique solutions need null(A) = {0}.
- For square A: null(A) = {0} ⇔ A invertible.
H: Uses
- Balancing chemical equations: the null space of the composition matrix.
- Network flows and equilibrium in circuits.
- The kernel of a linear map (see Linear Transformations).
X: Find a basis for the null space of A = [[1, 2, 3], [2, 4, 6]].
> Row reduce: [[1, 2, 3], [0, 0, 0]], so x₁ = −2x₂ − 3x₃ with x₂, x₃ free
> x₂ = 1, x₃ = 0 gives (−2, 1, 0); x₂ = 0, x₃ = 1 gives (−3, 0, 1)
> Basis {(−2, 1, 0), (−3, 0, 1)}; nullity 2
K: Solve Ax = 0 via reduced echelon form; one basis vector per free variable; general solution = particular + null space; trivial null space means uniqueness.
!: Including pivot columns as null space vectors instead of solving for them.
Q: What is the nullity of an invertible n × n matrix? | 0.
Q: What do all solutions of Ax = b look like? | One particular solution plus any null space vector.
SUM: The null space solves Ax = 0.
SUM: It governs uniqueness.
SRC: Lay DC, Lay SR, McDonald JJ, Linear Algebra and Its Applications (6th edn, Pearson 2021) | textbook | 2021 | https://www.pearson.com/
SRC: Strang G, Introduction to Linear Algebra (6th edn, Wellesley-Cambridge Press 2023) | textbook | 2023 | https://math.mit.edu/~gs/linearalgebra/
NUM1#maths-u11-19-q1@1: A is 4 × 7 with rank 4. What is the nullity? | 3 | 0 |  | 7 − 4 = 3 free variables.
M1#maths-u11-19-q2@1: Which vector is in the null space of [[1, 1], [2, 2]]? | (1, −1) | (1, 1) | (2, 1) | (0, 1) | (1, 2) | Multiplying gives (1 − 1, 2 − 2) = (0, 0), so (1, −1) is in the null space.
M3#maths-u11-19-q3@2: Ax = b has a solution x_{p}, and null(A) is a line. How many solutions are there? | Infinitely many, forming a line through x_{p} | Exactly one | Exactly two | None | It depends on b only | Every x_{p} + tn (n spanning the null space) solves the system.

## Systems of Linear Equations
S: Systems of linear equations appear everywhere: balancing chemical reactions, network flows, economics, circuits and fitting curves. Gaussian elimination solves them systematically and shows whether there are no, one or infinitely many solutions.
O: Solve systems by Gaussian elimination on the augmented matrix
O: Classify systems as inconsistent, uniquely solvable or underdetermined
T: Augmented matrix | [A | b], the coefficients with the right-hand side attached
T: Consistent system | A system with at least one solution
H: Elimination
- Use row operations to reach echelon form, then back-substitute.
- A row [0 … 0 | c] with c ≠ 0 means no solution.
- Free variables (non-pivot columns) mean infinitely many solutions.
- Otherwise there's exactly one.
H: Counting
- Unique solution of a square system ⇔ det A ≠ 0.
- More unknowns than equations: never a unique solution (if consistent, infinitely many).
- More equations than unknowns: often inconsistent; least squares finds the best fit.
H: Cost and stability
- Elimination takes about n^{3}/3 multiplications for n × n.
- Partial pivoting (choosing the largest available pivot) controls rounding errors.
- Cramer's rule is elegant but impractical for large systems.
X: Solve x + y + z = 6, 2x − y + z = 3, x + 2y − z = 2.
> Eliminate x: R₂ − 2R₁ gives −3y − z = −9; R₃ − R₁ gives y − 2z = −4
> From these: y = 2z − 4, then −3(2z − 4) − z = −9, so −7z = −21 and z = 3
> y = 2, x = 6 − 2 − 3 = 1: the unique solution is (1, 2, 3)
K: Row reduce [A | b]; a [0 … 0 | c ≠ 0] row means inconsistent; free variables mean infinitely many; otherwise unique; use pivoting for stability.
!: Stopping at echelon form and misreading a zero row as "no solution" when the right-hand side is also zero.
Q: What does a row [0 0 0 | 5] in the reduced augmented matrix mean? | The system has no solution.
Q: Can 2 equations in 3 unknowns have a unique solution? | No.
SUM: Elimination solves linear systems.
SUM: Echelon form reveals how many solutions there are.
SRC: Lay DC, Lay SR, McDonald JJ, Linear Algebra and Its Applications (6th edn, Pearson 2021) | textbook | 2021 | https://www.pearson.com/
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
NUM1#maths-u11-20-q1@1: Solve x + y = 5, x − y = 1. Give x. | 3 | 0 |  | Adding gives 2x = 6, so x = 3 (and y = 2).
M1#maths-u11-20-q2@1: The system x + y = 2, 2x + 2y = 5 has how many solutions? | None | One | Two | Infinitely many | Three | The second equation would need x + y = 2.5, contradicting the first.
M2#maths-u11-20-q3@2: Why is partial pivoting used in Gaussian elimination? | Choosing large pivots limits the growth of rounding errors | It reduces the number of equations | It makes matrices symmetric | It avoids back-substitution | It's required for exact arithmetic | Dividing by tiny pivots magnifies errors.

## Linear Transformations
S: A linear transformation is a function between vector spaces that respects addition and scaling. Every linear map between finite-dimensional spaces is given by a matrix, so rotations, reflections, projections and shears can all be computed by multiplication.
O: Check linearity and find the matrix of a linear map
O: Describe kernels, images and common geometric transformations
T: Linear transformation | T with T(u + v) = T(u) + T(v) and T(cv) = cT(v)
T: Standard matrix | The matrix whose columns are T(e₁), …, T(eₙ)
H: Matrices of maps
- Find where each basis vector goes; those images are the columns.
- Rotation by θ in ℝ^{2}: [[cos θ, −sin θ], [sin θ, cos θ]].
- Reflection in the x-axis: [[1, 0], [0, −1]]; shear: [[1, k], [0, 1]]; projection onto the x-axis: [[1, 0], [0, 0]].
H: Kernel and image
- Kernel = null space; image = column space.
- Rank–nullity: dim ker + dim image = dim of the domain.
- One-to-one ⇔ trivial kernel; onto ⇔ image is everything.
H: Non-examples and uses
- Translations x ↦ x + a aren't linear (they move 0); affine maps add a translation.
- Composition of maps corresponds to matrix multiplication.
- Differentiation is a linear map on polynomials.
X: Find the matrix of the anticlockwise rotation by 90° in ℝ^{2}.
> e₁ = (1, 0) goes to (0, 1)
> e₂ = (0, 1) goes to (−1, 0)
> Matrix [[0, −1], [1, 0]]
K: Linear maps preserve + and scaling; their matrices have T(e_{i}) as columns; kernel and image satisfy rank–nullity; translations aren't linear.
!: Thinking every map that draws a straight line is linear (translations aren't).
Q: What does a linear map always do to the zero vector? | Sends it to zero.
Q: What is the matrix of reflection in the line y = x? | [[0, 1], [1, 0]].
SUM: Linear maps are matrices.
SUM: Columns are images of basis vectors.
SRC: Axler S, Linear Algebra Done Right (4th edn, Springer 2024) | textbook | 2024 | https://linear.axler.net/
SRC: Strang G, Introduction to Linear Algebra (6th edn, Wellesley-Cambridge Press 2023) | textbook | 2023 | https://math.mit.edu/~gs/linearalgebra/
NUM1#maths-u11-21-q1@1: The shear [[1, 2], [0, 1]] maps (3, 1) to (x, y). Find x. | 5 | 0 |  | x = 3 + 2 × 1 = 5 (and y = 1).
M1#maths-u11-21-q2@1: Which map from ℝ^{2} to ℝ^{2} is linear? | (x, y) ↦ (2x, x − y) | (x, y) ↦ (x + 1, y) | (x, y) ↦ (x^{2}, y) | (x, y) ↦ (xy, y) | (x, y) ↦ (|x|, y) | Each component is a linear combination of x and y with no constant.
M2#maths-u11-21-q3@2: What is the kernel of the projection onto the x-axis? | The y-axis | The x-axis | Only the origin | All of ℝ^{2} | The line y = x | Projection onto the x-axis sends (0, y) to the origin, so the kernel is the y-axis.

## Change of Basis
S: The same vector has different coordinates in different bases, and the same linear map has different matrices. Change of basis converts between them, and choosing a clever basis can make a problem much simpler.
O: Convert coordinates between bases using a change-of-basis matrix
O: Write the matrix of a linear map in a new basis
T: Change-of-basis matrix | P, whose columns are the new basis vectors written in old coordinates
T: Coordinates | [v]_{B}, the coefficients expressing v in the basis B
H: Coordinates
- [v]_{old} = P[v]_{new}.
- [v]_{new} = P^{−1}[v]_{old}.
- Check by rebuilding v from the new coordinates.
H: Matrices of maps
- If A is a map's matrix in the old basis, its matrix in the new basis is P^{−1}AP.
- In an eigenvector basis, the matrix becomes diagonal (see Diagonalisation).
- Orthonormal bases make P^{−1} = Pᵀ, which is easy.
H: Uses
- Rotating axes to align with a problem's symmetry.
- Principal axes of an ellipse or of inertia.
- Coordinates in signal processing (Fourier and wavelet bases are changes of basis).
X: With new basis b₁ = (2, 1), b₂ = (1, 1), find the new coordinates of v = (4, 3).
> P = [[2, 1], [1, 1]], det 1, so P^{−1} = [[1, −1], [−1, 2]]
> [v]_{new} = P^{−1}(4, 3) = (4 − 3, −4 + 6) = (1, 2)
> Check: 1 × (2, 1) + 2 × (1, 1) = (4, 3) ✓
- Example: in the eigenvector basis of a diagonalisable A, the matrix is diagonal.
K: P's columns are new basis vectors; old = P × new, new = P^{−1} × old; maps transform as P^{−1}AP; choose bases to simplify.
!: Using P instead of P^{−1} when converting old coordinates to new.
Q: What is P^{−1} if P's columns form an orthonormal basis? | Pᵀ.
Q: How does a map's matrix change under change of basis? | It becomes P^{−1}AP.
SUM: Coordinates depend on the basis.
SUM: A good basis simplifies problems.
SRC: Axler S, Linear Algebra Done Right (4th edn, Springer 2024) | textbook | 2024 | https://linear.axler.net/
SRC: Lay DC, Lay SR, McDonald JJ, Linear Algebra and Its Applications (6th edn, Pearson 2021) | textbook | 2021 | https://www.pearson.com/
NUM1#maths-u11-22-q1@1: In the example, what is the second new coordinate of v = (4, 3)? | 2 | 0 |  | [v]_{new} = (1, 2).
M1#maths-u11-22-q2@1: The basis {(1, 0), (0, 2)} is used. What are the coordinates of (3, 4)? | (3, 2) | (3, 4) | (3, 8) | (1, 2) | (4, 3) | Solve a(1, 0) + b(0, 2) = (3, 4): a = 3 and 2b = 4, so the coordinates are (3, 2).
M2#maths-u11-22-q3@2: Why are orthonormal bases convenient for changing coordinates? | The inverse of the change-of-basis matrix is just its transpose | They have no coordinates | They make every matrix diagonal | They only exist in 2D | They aren't convenient | With orthonormal columns PᵀP = I, so P^{−1} = Pᵀ and no matrix inversion is needed.

## Similarity Transformations
S: Two matrices are similar when they represent the same linear map in different bases: B = P^{−1}AP. Similar matrices share all basis-independent features (eigenvalues, trace, determinant, rank), so similarity is how we find the simplest form of a map.
O: Recognise similar matrices and their shared invariants
O: Use similarity to simplify computations
T: Similar matrices | A and B with B = P^{−1}AP for some invertible P
T: Similarity invariant | A property shared by similar matrices: characteristic polynomial, eigenvalues, trace, determinant, rank
H: Invariants
- Same characteristic polynomial, so same eigenvalues with multiplicities.
- Same trace and determinant (sum and product of eigenvalues).
- Same rank and the same Jordan normal form.
- Different invariants prove two matrices aren't similar.
H: Simplifying
- Diagonalisable matrices are similar to diagonal ones: A = PDP^{−1}.
- Then A^{k} = PD^{k}P^{−1} and e^{A} = Pe^{D}P^{−1}.
- Every complex matrix is similar to a Jordan form.
H: Cautions
- Same eigenvalues don't guarantee similarity: I and [[1, 1], [0, 1]] both have eigenvalue 1 twice but aren't similar.
- Orthogonal similarity (P orthogonal) also preserves lengths and angles.
X: Show A = [[1, 1], [0, 2]] is similar to D = diag(1, 2).
> Eigenvalues 1 and 2 (triangular), distinct, so A is diagonalisable
> Eigenvectors (1, 0) for 1 and (1, 1) for 2: P = [[1, 1], [0, 1]]
> P^{−1}AP = diag(1, 2) = D
K: Similar matrices represent one map in two bases; they share eigenvalues, trace, determinant and rank; equal eigenvalues alone don't prove similarity.
!: Concluding two matrices are similar just because their eigenvalues match.
Q: What is the trace of any matrix similar to [[3, 1], [0, 5]]? | 8.
Q: Are I and [[1, 1], [0, 1]] similar? | No: only I is similar to I.
SUM: Similarity changes basis, not the map.
SUM: Invariants survive similarity.
SRC: Horn RA, Johnson CR, Matrix Analysis (2nd edn, Cambridge University Press 2013) | textbook | 2013 | https://www.cambridge.org/
SRC: Strang G, Introduction to Linear Algebra (6th edn, Wellesley-Cambridge Press 2023) | textbook | 2023 | https://math.mit.edu/~gs/linearalgebra/
NUM1#maths-u11-23-q1@1: B is similar to A, and det A = 7. Find det B. | 7 | 0 |  | det(P^{−1}AP) = det A.
M1#maths-u11-23-q2@1: Which property do similar matrices always share? | Their eigenvalues | Their entries | Their eigenvectors | Their first columns | Their inverses' entries | Eigenvalues are basis-independent; eigenvectors change with the basis.
M3#maths-u11-23-q3@2: A has trace 5 and B has trace 6. What can you conclude? | They aren't similar | They are similar | They have equal determinants | They have the same eigenvectors | Nothing at all | Trace is a similarity invariant, so different traces rule similarity out.

## Eigenvalues
S: An eigenvalue λ of a square matrix A is a number for which Av = λv has a non-zero solution v. Eigenvalues reveal how a linear map stretches space, and they govern stability, vibrations, Markov chains and quantum energy levels.
O: Find eigenvalues by solving the characteristic equation
O: Use the trace and determinant as checks
T: Eigenvalue | λ with Av = λv for some non-zero v
T: Characteristic equation | det(A − λI) = 0, whose roots are the eigenvalues
H: Finding eigenvalues
- Solve det(A − λI) = 0.
- 2 × 2: λ^{2} − (tr A)λ + det A = 0.
- Triangular matrices: the diagonal entries.
- Real matrices may have complex eigenvalues (rotations).
H: Checks and facts
- Sum of eigenvalues = trace; product = determinant.
- A is invertible ⇔ 0 isn't an eigenvalue.
- Eigenvalues of A^{k} are λ^{k}; of A^{−1}, 1/λ; of A + cI, λ + c.
H: Uses
- Stability of differential equations and iterations (School 10).
- Natural frequencies of structures; principal components (later in this school).
- Google's PageRank uses the dominant eigenvector of a link matrix.
X: Find the eigenvalues of A = [[4, 1], [2, 3]].
> tr A = 7, det A = 12 − 2 = 10
> λ^{2} − 7λ + 10 = 0, so (λ − 2)(λ − 5) = 0
> λ = 2 and λ = 5 (check: sum 7 = trace, product 10 = det)
- Example: the identity matrix has every non-zero vector as an eigenvector, with eigenvalue 1.
K: Solve det(A − λI) = 0; for 2 × 2 use trace and determinant; eigenvalues sum to the trace and multiply to the determinant; 0 is an eigenvalue iff A is singular.
!: Forgetting to subtract λ from every diagonal entry.
Q: What are the eigenvalues of [[3, 7], [0, −2]]? | 3 and −2.
Q: Does a 90° rotation matrix have real eigenvalues? | No: its eigenvalues are ±i.
SUM: Eigenvalues are the stretching factors.
SUM: They sum to the trace.
SRC: Strang G, Introduction to Linear Algebra (6th edn, Wellesley-Cambridge Press 2023) | textbook | 2023 | https://math.mit.edu/~gs/linearalgebra/
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
NUM1#maths-u11-24-q1@1: Find the product of the eigenvalues of [[4, 1], [2, 3]]. | 10 | 0 |  | The product of eigenvalues equals the determinant, 10.
M1#maths-u11-24-q2@1: A has eigenvalue 3. What is an eigenvalue of A^{2} + I? | 10 | 9 | 4 | 3 | 7 | If Av = 3v, then (A^{2} + I)v = (9 + 1)v.
M2#maths-u11-24-q3@2: Why does a singular matrix have 0 as an eigenvalue? | Some non-zero v has Av = 0 = 0v | Its trace is zero | Its entries are zero | It has no eigenvalues | It doesn't | Singular means a non-trivial null space, which is the eigenspace for 0.

## Eigenvectors
S: An eigenvector is a direction a linear map doesn't turn: it's only stretched by its eigenvalue. Eigenvectors give the natural axes of a transformation, the modes of a vibrating system and the long-run state of a Markov chain.
O: Find eigenvectors for given eigenvalues
O: Interpret eigenvectors in applications
T: Eigenvector | A non-zero v with Av = λv
T: Dominant eigenvector | The eigenvector for the eigenvalue of largest absolute value, which repeated multiplication approaches
H: Finding them
- For each eigenvalue, solve (A − λI)v = 0.
- Eigenvectors are only determined up to a non-zero scalar multiple.
- Eigenvectors for distinct eigenvalues are linearly independent.
H: Meaning
- Along an eigenvector, A acts as simple scaling.
- Repeated application Aⁿx lines up with the dominant eigenvector (the power method).
- A Markov chain's steady state is the eigenvector with eigenvalue 1, scaled to sum to 1.
H: Applications
- Normal modes of coupled oscillators.
- Principal axes of stress and inertia.
- PageRank, population models (Leslie matrices), facial recognition (eigenfaces).
X: Find eigenvectors of A = [[4, 1], [2, 3]] for λ = 5 and λ = 2.
> λ = 5: A − 5I = [[−1, 1], [2, −2]], so −x + y = 0 and v = (1, 1)
> λ = 2: A − 2I = [[2, 1], [2, 1]], so 2x + y = 0 and v = (1, −2)
> Check: A(1, 1) = (5, 5) ✓ and A(1, −2) = (2, −4) ✓
K: Solve (A − λI)v = 0 for each λ; eigenvectors are defined up to scaling; distinct eigenvalues give independent eigenvectors; dominant eigenvectors describe long-run behaviour.
!: Giving the zero vector as an eigenvector.
Q: Can the zero vector be an eigenvector? | No, by definition.
Q: Which eigenvalue's eigenvector gives a Markov chain's steady state? | λ = 1.
SUM: Eigenvectors are unturned directions.
SUM: They describe modes and long-run states.
SRC: Strang G, Introduction to Linear Algebra (6th edn, Wellesley-Cambridge Press 2023) | textbook | 2023 | https://math.mit.edu/~gs/linearalgebra/
SRC: Brin S, Page L, The anatomy of a large-scale hypertextual Web search engine, Computer Networks and ISDN Systems 30, 107 | journal | 1998 | https://doi.org/10.1016/S0169-7552(98)00110-X
NUM1#maths-u11-25-q1@1: The transition matrix [[0.9, 0.2], [0.1, 0.8]] has steady state (p, 1 − p). Find p to 4 decimal places. | 0.6667 | 0.0001 |  | Solve 0.9p + 0.2(1 − p) = p: 0.2 = 0.3p, so p = 2/3.
M1#maths-u11-25-q2@1: Which is an eigenvector of [[2, 0], [0, 5]]? | (0, 1) | (1, 1) | (1, 2) | (2, 5) | (1, −1) | A diagonal matrix scales each axis: A(0, 1) = (0, 5) = 5(0, 1), an eigenvector for 5.
M2#maths-u11-25-q3@2: What does the power method compute? | The dominant eigenvector, by repeatedly multiplying by A | All eigenvalues at once | The determinant | The inverse matrix | The smallest eigenvalue directly | Aⁿx aligns with the eigenvector of largest |λ|.

## Eigenspaces
S: The eigenspace for an eigenvalue λ is the set of all its eigenvectors together with zero. Its dimension, the geometric multiplicity, decides whether a matrix can be diagonalised.
O: Find eigenspaces and their dimensions
O: Compare algebraic and geometric multiplicity
T: Eigenspace | E_{λ} = null(A − λI), a subspace
T: Geometric multiplicity | dim E_{λ}; it's at most the algebraic multiplicity (the root's multiplicity in the characteristic polynomial)
H: Finding eigenspaces
- Row reduce A − λI and find its null space.
- Each free variable gives a basis vector.
- E_{λ} is a line, plane or bigger subspace.
H: Multiplicities
- Algebraic multiplicity: how many times λ is a root of det(A − λI).
- Geometric multiplicity ≤ algebraic multiplicity, and ≥ 1.
- Defective eigenvalue: geometric < algebraic, as for the shear [[1, 1], [0, 1]] (λ = 1 twice, one eigenvector direction).
H: Diagonalisability
- A is diagonalisable iff geometric = algebraic multiplicity for every eigenvalue.
- Equivalently, the eigenspaces' dimensions add up to n.
X: Find the eigenspaces of A = diag(2, 2, 3).
> λ = 2 has algebraic multiplicity 2; A − 2I = diag(0, 0, 1), with null space spanned by e₁ and e₂
> λ = 3: A − 3I = diag(−1, −1, 0), null space spanned by e₃
> E₂ is a plane (dimension 2), E₃ a line: dimensions add to 3, so A is diagonalisable (it already is diagonal)
K: E_{λ} = null(A − λI); geometric ≤ algebraic multiplicity; diagonalisable iff they're equal for every eigenvalue.
!: Assuming a repeated eigenvalue automatically has a 2-dimensional eigenspace.
Q: What is the geometric multiplicity of λ = 1 for [[1, 1], [0, 1]]? | 1.
Q: When is a matrix defective? | When some eigenvalue's geometric multiplicity is less than its algebraic multiplicity.
SUM: Eigenspaces collect eigenvectors.
SUM: Their dimensions decide diagonalisability.
SRC: Axler S, Linear Algebra Done Right (4th edn, Springer 2024) | textbook | 2024 | https://linear.axler.net/
SRC: Horn RA, Johnson CR, Matrix Analysis (2nd edn, Cambridge University Press 2013) | textbook | 2013 | https://www.cambridge.org/
NUM1#maths-u11-26-q1@1: For diag(2, 2, 3), what is the geometric multiplicity of λ = 2? | 2 | 0 |  | E₂ is spanned by e₁ and e₂.
M1#maths-u11-26-q2@1: Which matrix has an eigenvalue with geometric multiplicity less than its algebraic multiplicity? | [[3, 1], [0, 3]] | [[3, 0], [0, 3]] | [[1, 0], [0, 2]] | [[2, 1], [1, 2]] | [[0, 1], [1, 0]] | λ = 3 twice, but A − 3I has rank 1, giving only a line of eigenvectors.
M2#maths-u11-26-q3@2: What is always true of an eigenspace? | It's a subspace containing the zero vector | It contains only eigenvectors | It's one-dimensional | It equals the column space | It's empty for repeated eigenvalues | E_{λ} is a null space, so it's a subspace (zero included).

## Characteristic Polynomials
S: The characteristic polynomial det(A − λI) packages a matrix's eigenvalues as its roots, along with the trace and determinant as coefficients. The Cayley–Hamilton theorem says every matrix satisfies its own characteristic polynomial.
O: Compute characteristic polynomials and read off trace and determinant
O: Apply the Cayley–Hamilton theorem
T: Characteristic polynomial | p(λ) = det(A − λI) (some books use det(λI − A), differing by sign)
T: Cayley–Hamilton theorem | p(A) = 0 for every square matrix A
H: Structure
- Degree n, with leading term (−λ)ⁿ.
- For 2 × 2: λ^{2} − (tr A)λ + det A.
- In general the λ^{n−1} coefficient involves the trace and the constant term is det A.
H: Cayley–Hamilton
- [[1, 2], [3, 4]] has p(λ) = λ^{2} − 5λ − 2, so A^{2} = 5A + 2I.
- Higher powers reduce to combinations of I, A, …, A^{n−1}.
- If det A ≠ 0, A^{−1} is a polynomial in A.
H: Cautions
- Finding roots of degree 5+ polynomials needs numerics; in practice eigenvalues are computed directly (QR algorithm), not via the polynomial.
- The minimal polynomial (smallest degree with q(A) = 0) divides p and reveals diagonalisability.
X: Verify Cayley–Hamilton for A = [[1, 2], [3, 4]].
> p(λ) = λ^{2} − 5λ − 2 (trace 5, determinant −2)
> A^{2} = [[7, 10], [15, 22]]
> 5A + 2I = [[7, 10], [15, 22]], so A^{2} − 5A − 2I = 0 ✓
K: p(λ) = det(A − λI); for 2 × 2 it's λ^{2} − tr(A)λ + det A; every matrix satisfies p(A) = 0; numerics avoid computing p for large matrices.
!: Plugging A into p(λ) by replacing the constant c with c rather than cI.
Q: What is the characteristic polynomial of [[2, 0], [0, 3]]? | (λ − 2)(λ − 3) = λ^{2} − 5λ + 6.
Q: What does Cayley–Hamilton let you write A^{−1} as? | A polynomial in A (when det A ≠ 0).
SUM: Characteristic polynomials hold the eigenvalues.
SUM: Matrices satisfy their own.
SRC: Horn RA, Johnson CR, Matrix Analysis (2nd edn, Cambridge University Press 2013) | textbook | 2013 | https://www.cambridge.org/
SRC: Axler S, Linear Algebra Done Right (4th edn, Springer 2024) | textbook | 2024 | https://linear.axler.net/
NUM1#maths-u11-27-q1@1: For [[1, 2], [3, 4]], what is the constant term of λ^{2} − (tr A)λ + det A? | -2 | 0 |  | det A = 4 − 6 = −2.
M1#maths-u11-27-q2@1: Using A^{2} = 5A + 2I for A = [[1, 2], [3, 4]], which expression equals A^{−1}? | (A − 5I)/2 | (5I − A)/2 | (A + 5I)/2 | 2A − 5I | A/2 | Rearrange A^{2} − 5A = 2I as A(A − 5I) = 2I, so A^{−1} = (A − 5I)/2.
M3#maths-u11-27-q3@2: Why are large-matrix eigenvalues not computed from the characteristic polynomial? | Polynomial roots are very sensitive to rounding, so direct iterative methods are more accurate | Characteristic polynomials don't exist for large matrices | The roots are always complex | It's faster to use determinants only | They are computed that way | Tiny coefficient errors can move roots a lot; the QR algorithm works on A directly.

## Diagonalisation
S: Diagonalising a matrix means writing it as A = PDP^{−1} with D diagonal. In the eigenvector basis the map just scales each axis, so powers, exponentials and long-term behaviour become easy to compute.
O: Diagonalise matrices with enough independent eigenvectors
O: Use diagonalisation to compute powers
T: Diagonalisable | A = PDP^{−1}, with P's columns eigenvectors and D's diagonal the eigenvalues
T: Matrix power formula | A^{k} = PD^{k}P^{−1}
H: When possible
- Need n linearly independent eigenvectors.
- n distinct eigenvalues guarantee it.
- Symmetric real matrices are always diagonalisable (orthogonally).
- Defective matrices (like shears) aren't.
H: Using it
- Powers: D^{k} just raises the diagonal entries to the kth power.
- Exponentials: e^{At} = Pe^{Dt}P^{−1}, solving x′ = Ax.
- Long-term behaviour of A^{k}x is dominated by the largest |λ|.
H: Fibonacci example
- [[F_{n+1}], [F_{n}]] = [[1, 1], [1, 0]]ⁿ [[1], [0]].
- Eigenvalues φ and ψ = (1 ± √5)/2 give Binet's formula (School 2).
X: Diagonalise A = [[4, 1], [2, 3]] and find A^{3}'s eigenvalues.
> Eigenvalues 5 and 2 with eigenvectors (1, 1) and (1, −2)
> P = [[1, 1], [1, −2]], D = diag(5, 2), so A = PDP^{−1}
> A^{3} = PD^{3}P^{−1} with D^{3} = diag(125, 8)
- Example: e^{At} for A = diag(1, 2) is diag(e^{t}, e^{2t}).
K: A = PDP^{−1} when there are n independent eigenvectors; powers and exponentials act on D; the largest eigenvalue dominates long-term behaviour.
!: Putting eigenvectors in P in a different order from their eigenvalues in D.
Q: Is a matrix with 3 distinct eigenvalues (3 × 3) diagonalisable? | Yes.
Q: What is D^{k} for D = diag(2, −1)? | diag(2^{k}, (−1)^{k}).
SUM: Diagonalisation simplifies to scaling.
SUM: Powers become easy.
SRC: Strang G, Introduction to Linear Algebra (6th edn, Wellesley-Cambridge Press 2023) | textbook | 2023 | https://math.mit.edu/~gs/linearalgebra/
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
NUM1#maths-u11-28-q1@1: For the example, what is the largest eigenvalue of A^{3}? | 125 | 0 |  | 5^{3} = 125.
M1#maths-u11-28-q2@1: Which matrix is not diagonalisable? | [[2, 1], [0, 2]] | [[2, 0], [0, 3]] | [[1, 2], [2, 1]] | [[0, 1], [1, 0]] | [[4, 1], [2, 3]] | λ = 2 is repeated with only one independent eigenvector.
M2#maths-u11-28-q3@2: Why does the largest eigenvalue dominate A^{k}x for large k? | Its power grows fastest, swamping the other components | It's always positive | Other eigenvectors vanish immediately | A^{k} becomes diagonal | It doesn't | Writing x in the eigenbasis, each component is multiplied by λ_{i}^{k}.

## Jordan Normal Form
S: Not every matrix can be diagonalised, but every complex matrix is similar to a Jordan normal form: nearly diagonal, with some 1s just above the diagonal. It completely classifies matrices up to similarity and explains terms like te^{λt} in differential equations.
O: Find the Jordan form of small matrices
O: Use Jordan blocks to compute powers and exponentials
T: Jordan block | J_{k}(λ), a k × k matrix with λ on the diagonal and 1s on the superdiagonal
T: Jordan normal form | A block-diagonal matrix of Jordan blocks, similar to A and unique up to block order
H: Structure
- One block per independent eigenvector; block sizes show how defective each eigenvalue is.
- Diagonalisable ⇔ all blocks are 1 × 1.
- The minimal polynomial's exponent for λ is the largest block size.
H: Computing with blocks
- J = λI + N, with N nilpotent (N^{k} = 0).
- e^{Jt} = e^{λt}(I + Nt + N^{2}t^{2}/2! + …), a finite sum.
- For a 2 × 2 block: e^{Jt} = e^{λt}[[1, t], [0, 1]]: the te^{λt} terms of repeated roots in ODEs.
H: In practice
- Theoretical rather than numerical: tiny perturbations change the Jordan form.
- Numerically, the Schur decomposition or SVD is used instead.
X: Find the Jordan form of A = [[3, 1], [−1, 1]].
> Characteristic polynomial: (3 − λ)(1 − λ) + 1 = λ^{2} − 4λ + 4 = (λ − 2)^{2}
> A − 2I = [[1, 1], [−1, −1]] has rank 1, so only one independent eigenvector
> Jordan form [[2, 1], [0, 2]]: a single 2 × 2 block
K: Every complex matrix is similar to a Jordan form; blocks J_{k}(λ) count defectiveness; e^{Jt} gives te^{λt} terms; it's theoretical, not numerically stable.
!: Expecting numerical software to return exact Jordan forms of measured data.
Q: What Jordan form does a diagonalisable matrix have? | A diagonal one (all blocks 1 × 1).
Q: What is e^{Jt} for J = [[λ, 1], [0, λ]]? | e^{λt}[[1, t], [0, 1]].
SUM: Jordan form handles non-diagonalisable matrices.
SUM: Blocks explain repeated-root solutions.
SRC: Horn RA, Johnson CR, Matrix Analysis (2nd edn, Cambridge University Press 2013) | textbook | 2013 | https://www.cambridge.org/
SRC: Axler S, Linear Algebra Done Right (4th edn, Springer 2024) | textbook | 2024 | https://linear.axler.net/
NUM1#maths-u11-29-q1@1: In the example, what is the size of the largest Jordan block? | 2 | 0 |  | A single 2 × 2 block for λ = 2.
M1#maths-u11-29-q2@1: Which matrix is a Jordan block? | [[5, 1], [0, 5]] | [[5, 1], [1, 5]] | [[5, 0], [1, 5]] | [[1, 5], [0, 1]] | [[5, 2], [0, 5]] | λ on the diagonal, 1 on the superdiagonal, zeros elsewhere.
M2#maths-u11-29-q3@2: Why isn't the Jordan form computed in numerical software? | Tiny rounding changes can alter block structure completely | It doesn't exist for real matrices | It requires infinite precision only for diagonal matrices | It's always diagonal | It is computed routinely | The Jordan form is discontinuous in the matrix entries.

## Symmetric Matrices
S: Real symmetric matrices (A = Aᵀ) are the best-behaved matrices: their eigenvalues are real and their eigenvectors can be chosen orthonormal. This spectral theorem underlies quadratic forms, principal axes, PCA and the physics of vibrations.
O: State and apply the spectral theorem for symmetric matrices
O: Diagonalise quadratic forms
T: Spectral theorem | A real symmetric matrix factorises as A = QΛQᵀ with Q orthogonal and Λ diagonal (real)
T: Quadratic form | xᵀAx, a homogeneous polynomial of degree 2 written with a symmetric matrix
H: Properties
- All eigenvalues are real.
- Eigenvectors for different eigenvalues are orthogonal.
- So there's always an orthonormal eigenbasis: Q^{−1} = Qᵀ.
H: Quadratic forms
- 2x^{2} + 2xy + 2y^{2} = xᵀ[[2, 1], [1, 2]]x.
- Rotating to the eigenvector axes removes the cross term: 3u^{2} + v^{2}.
- The signs of the eigenvalues classify conic sections and critical points.
H: Where they appear
- Covariance matrices, Hessians, stiffness and inertia matrices, graph Laplacians.
- PCA diagonalises the covariance matrix (later in this school).
X: Diagonalise A = [[2, 1], [1, 2]] orthogonally.
> Eigenvalues: (2 − λ)^{2} − 1 = 0, so λ = 1 and λ = 3
> Unit eigenvectors: (1, −1)/√2 for 1 and (1, 1)/√2 for 3, which are orthogonal
> A = QΛQᵀ with Q = [[1/√2, 1/√2], [−1/√2, 1/√2]] and Λ = diag(1, 3)
K: Symmetric real matrices have real eigenvalues and orthonormal eigenvectors; A = QΛQᵀ; rotating to eigenvectors diagonalises quadratic forms.
!: Assuming a non-symmetric real matrix has real eigenvalues.
Q: Are the eigenvalues of a real symmetric matrix always real? | Yes.
Q: What is Q^{−1} for an orthogonal Q? | Qᵀ.
SUM: Symmetric matrices have orthonormal eigenbases.
SUM: They diagonalise quadratic forms.
SRC: Strang G, Introduction to Linear Algebra (6th edn, Wellesley-Cambridge Press 2023) | textbook | 2023 | https://math.mit.edu/~gs/linearalgebra/
SRC: Horn RA, Johnson CR, Matrix Analysis (2nd edn, Cambridge University Press 2013) | textbook | 2013 | https://www.cambridge.org/
NUM1#maths-u11-30-q1@1: Find the sum of the eigenvalues of [[2, 1], [1, 2]]. | 4 | 0 |  | The trace 2 + 2 = 4 equals the sum (1 + 3).
M1#maths-u11-30-q2@1: Which quadratic form corresponds to [[1, 3], [3, 4]]? | x^{2} + 6xy + 4y^{2} | x^{2} + 3xy + 4y^{2} | x^{2} + 9xy + 4y^{2} | 4x^{2} + 6xy + y^{2} | x^{2} + 4y^{2} | The off-diagonal 3 appears twice, giving 2 × 3 = 6xy.
M3#maths-u11-30-q3@2: Why are eigenvectors of a symmetric matrix for different eigenvalues orthogonal? | λ₁ v₁ · v₂ = Av₁ · v₂ = v₁ · Av₂ = λ₂ v₁ · v₂, forcing v₁ · v₂ = 0 | Symmetric matrices have only one eigenvalue | All eigenvectors are unit vectors | It's a coincidence | They aren't | Symmetry lets A move across the dot product, and λ₁ ≠ λ₂.

## Hermitian Matrices
S: A Hermitian matrix equals its own conjugate transpose: the complex counterpart of a real symmetric matrix. Hermitian matrices have real eigenvalues and orthonormal eigenvectors, which is why they represent measurable quantities in quantum mechanics.
O: Recognise Hermitian matrices and compute their eigenvalues
O: Explain their role in quantum mechanics
T: Conjugate transpose | A* (or A^{H}): transpose and take complex conjugates of every entry
T: Hermitian matrix | A square complex matrix with A* = A
H: Properties
- Diagonal entries are real; off-diagonal entries come in conjugate pairs.
- All eigenvalues are real.
- Unitary diagonalisation: A = UΛU* with U unitary (U*U = I).
- Real symmetric matrices are Hermitian.
H: Related classes
- Unitary: U*U = I (complex rotations, preserving inner products).
- Skew-Hermitian: A* = −A, with purely imaginary eigenvalues.
- Normal: A*A = AA*, exactly the unitarily diagonalisable matrices.
H: Quantum mechanics
- Observables (energy, spin, position) are Hermitian operators, so measured values are real.
- The Pauli matrices σ_{x}, σ_{y}, σ_{z} are Hermitian with eigenvalues ±1.
- Time evolution is unitary.
X: Find the eigenvalues of A = [[2, i], [−i, 2]].
> Check A* = A: the conjugate transpose swaps i and −i, so it's Hermitian
> det(A − λI) = (2 − λ)^{2} − (i)(−i) = (2 − λ)^{2} − 1
> λ = 1 or λ = 3: real, as guaranteed
K: Hermitian means A* = A; eigenvalues are real and eigenvectors orthonormal; A = UΛU*; quantum observables are Hermitian.
!: Transposing without conjugating when checking whether a complex matrix is Hermitian.
Q: Are the diagonal entries of a Hermitian matrix real? | Yes.
Q: What are the eigenvalues of the Pauli matrix σ_{z}? | ±1.
SUM: Hermitian matrices are complex symmetric matrices.
SUM: Their eigenvalues are real.
SRC: Horn RA, Johnson CR, Matrix Analysis (2nd edn, Cambridge University Press 2013) | textbook | 2013 | https://www.cambridge.org/
SRC: Nielsen MA, Chuang IL, Quantum Computation and Quantum Information (10th anniversary edn, Cambridge University Press 2010) | textbook | 2010 | https://www.cambridge.org/
NUM1#maths-u11-31-q1@1: Find the larger eigenvalue of [[2, i], [−i, 2]]. | 3 | 0 |  | (2 − λ)^{2} = 1 gives λ = 1 or 3.
M1#maths-u11-31-q2@1: Which matrix is Hermitian? | [[1, 2 + i], [2 − i, 3]] | [[1, 2 + i], [2 + i, 3]] | [[i, 0], [0, 1]] | [[1, i], [i, 1]] | [[0, 1], [−1, 0]] | Real diagonal and conjugate off-diagonal pairs.
M2#maths-u11-31-q3@2: Why must quantum observables be Hermitian? | Their eigenvalues (possible measurements) must be real | Hermitian matrices are always diagonal | They make states unnormalised | Quantum mechanics uses only real matrices | They needn't be | Hermitian operators have real spectra and orthogonal eigenstates.

## Positive Definite Matrices
S: A symmetric matrix is positive definite when xᵀAx > 0 for every non-zero x. Such matrices describe bowls: energy, covariance and the curvature at a minimum. They're the matrices for which Cholesky factorisation and many optimisation methods work.
O: Test matrices for positive definiteness
O: Recognise where positive definite matrices arise
T: Positive definite | Symmetric A with xᵀAx > 0 for all x ≠ 0
T: Positive semi-definite | xᵀAx ≥ 0 for all x (zero allowed)
H: Tests (any one suffices)
- All eigenvalues are positive.
- All leading principal minors are positive (Sylvester's criterion).
- A = RᵀR for some R with independent columns (Cholesky exists).
- All pivots in elimination are positive.
H: Where they arise
- Covariance matrices are positive semi-definite.
- A Hessian that's positive definite at a critical point means a local minimum (School 18).
- Stiffness and mass matrices in mechanics; kernels in machine learning (Gram matrices).
H: Geometry
- xᵀAx = 1 is an ellipsoid with axes along the eigenvectors.
- Indefinite matrices give saddles; semi-definite ones give flat directions.
X: Is A = [[2, −1], [−1, 2]] positive definite?
> Leading minors: 2 > 0, and det A = 4 − 1 = 3 > 0
> By Sylvester's criterion, A is positive definite
> Check with eigenvalues: 1 and 3, both positive ✓
K: Positive definite means xᵀAx > 0; test by eigenvalues, leading minors or Cholesky; covariance and Hessians at minima are (semi-)definite.
!: Checking only that the diagonal entries are positive, which isn't enough.
Q: Is [[1, 2], [2, 1]] positive definite? | No: its determinant is −3.
Q: What does a positive definite Hessian at a critical point indicate? | A local minimum.
SUM: Positive definite matrices describe bowls.
SUM: Several equivalent tests exist.
SRC: Strang G, Introduction to Linear Algebra (6th edn, Wellesley-Cambridge Press 2023) | textbook | 2023 | https://math.mit.edu/~gs/linearalgebra/
SRC: Horn RA, Johnson CR, Matrix Analysis (2nd edn, Cambridge University Press 2013) | textbook | 2013 | https://www.cambridge.org/
NUM1#maths-u11-32-q1@1: Find the determinant of [[2, −1], [−1, 2]]. | 3 | 0 |  | 4 − 1 = 3, the second leading minor.
M1#maths-u11-32-q2@1: Which matrix is positive definite? | [[3, 1], [1, 2]] | [[1, 3], [3, 1]] | [[−1, 0], [0, 2]] | [[0, 0], [0, 1]] | [[2, 3], [3, 2]] | It's symmetric with leading minors 3 > 0 and 3 × 2 − 1 = 5 > 0, so Sylvester's test passes.
M2#maths-u11-32-q3@2: Why are covariance matrices positive semi-definite? | xᵀΣx is the variance of the combination xᵀX, which can't be negative | They're always diagonal | All covariances are positive | They have unit determinant | They aren't | For any weights x, xᵀΣx is the variance of xᵀX, and a variance can never be negative.

## Inner Product Spaces
S: An inner product generalises the dot product, giving lengths and angles in any vector space, including spaces of functions. It lets geometric ideas such as orthogonality and projection work for polynomials, signals and data.
O: Check the inner product axioms and compute inner products of functions
O: Use Cauchy–Schwarz and angles in inner product spaces
T: Inner product | ⟨u, v⟩, linear in each argument (conjugate-linear in one for complex spaces), symmetric (or Hermitian) and positive definite
T: Cauchy–Schwarz inequality | |⟨u, v⟩| ≤ ‖u‖‖v‖
H: Examples
- The dot product on ℝⁿ.
- Weighted: ⟨x, y⟩ = Σ w_{i}x_{i}y_{i} with w_{i} > 0.
- Functions on [a, b]: ⟨f, g⟩ = ∫ₐ^{b} f(x)g(x) dx.
- Matrices: ⟨A, B⟩ = tr(AᵀB) (the Frobenius inner product).
H: Geometry
- Length ‖v‖ = √⟨v, v⟩; angle via cos θ = ⟨u, v⟩/(‖u‖‖v‖).
- Orthogonality: ⟨u, v⟩ = 0. sin x and cos x are orthogonal on [−π, π].
- Pythagoras and the parallelogram law hold.
H: Uses
- Fourier series are expansions in orthogonal functions (School 6, School 9).
- Least squares and approximation by polynomials.
- Hilbert spaces are complete inner product spaces (School 9).
X: With ⟨f, g⟩ = ∫₀¹ f(x)g(x) dx, find ⟨x, x^{2}⟩ and ‖x‖.
> ⟨x, x^{2}⟩ = ∫₀¹ x^{3} dx = ¼
> ‖x‖^{2} = ∫₀¹ x^{2} dx = ⅓
> ‖x‖ = 1/√3 ≈ 0.577
- Example: on [−π, π], ‖sin x‖^{2} = π, so sin x/√π is a unit vector.
- Gram–Schmidt (later in this school) builds orthonormal bases in any inner product space.
K: Inner products give length, angle and orthogonality in any vector space; functions use ∫fg; Cauchy–Schwarz bounds inner products.
!: Forgetting positivity: ⟨v, v⟩ must be positive for v ≠ 0.
Q: Are sin x and cos x orthogonal on [−π, π]? | Yes: ∫ sin x cos x dx = 0 over that interval.
Q: What does Cauchy–Schwarz say? | |⟨u, v⟩| ≤ ‖u‖‖v‖.
SUM: Inner products bring geometry to any space.
SUM: Functions can be orthogonal.
SRC: Axler S, Linear Algebra Done Right (4th edn, Springer 2024) | textbook | 2024 | https://linear.axler.net/
SRC: Kreyszig E, Introductory Functional Analysis with Applications (Wiley 1978) | textbook | 1978 | https://www.wiley.com/
NUM1#maths-u11-33-q1@1: With ⟨f, g⟩ = ∫₀¹ fg dx, find ⟨1, x⟩. | 0.5 | 0.0001 |  | ∫₀¹ x dx = ½.
M1#maths-u11-33-q2@1: Which formula is an inner product on ℝ^{2}? | ⟨x, y⟩ = 2x₁y₁ + 3x₂y₂ | ⟨x, y⟩ = x₁y₁ − x₂y₂ | ⟨x, y⟩ = x₁y₂ | ⟨x, y⟩ = x₁ + y₁ | ⟨x, y⟩ = |x₁y₁| | Positive weights keep it symmetric, bilinear and positive definite.
M2#maths-u11-33-q3@2: Why does ⟨x, y⟩ = x₁y₁ − x₂y₂ fail to be an inner product? | ⟨(0, 1), (0, 1)⟩ = −1 < 0, breaking positivity | It isn't symmetric | It isn't linear | It's always zero | It is one | Inner products need ⟨v, v⟩ > 0 for v ≠ 0.

## Norms
S: A norm measures the size of a vector. Different norms (the Euclidean length, the sum of absolute values, the maximum entry) suit different problems, and matrix norms measure how much a matrix can stretch vectors.
O: Calculate the 1-, 2- and ∞-norms of vectors
O: Interpret matrix norms and the condition number
T: Norm | ‖v‖ ≥ 0, zero only for v = 0, with ‖cv‖ = |c|‖v‖ and ‖u + v‖ ≤ ‖u‖ + ‖v‖
T: Condition number | κ(A) = ‖A‖‖A^{−1}‖, measuring how much relative errors can be amplified when solving Ax = b
H: Vector norms
- 1-norm: Σ|v_{i}| (taxicab distance).
- 2-norm: √(Σv_{i}^{2}) (Euclidean length).
- ∞-norm: max |v_{i}|.
- In finite dimensions all norms are equivalent (within constant factors).
H: Matrix norms
- Induced norm: ‖A‖ = max ‖Ax‖/‖x‖.
- ‖A‖₂ = largest singular value; ‖A‖₁ = largest column sum; ‖A‖_{∞} = largest row sum.
- Frobenius norm: √(Σa_{ij}^{2}).
H: Conditioning
- κ(A) ≥ 1; large κ means a nearly singular, sensitive system.
- A rule of thumb: you can lose about log₁₀ κ digits of accuracy.
- Lasso and ridge regression use 1- and 2-norm penalties (School 13).
X: Find the 1-, 2- and ∞-norms of v = (3, −4, 12).
> 1-norm: 3 + 4 + 12 = 19
> 2-norm: √(9 + 16 + 144) = 13
> ∞-norm: 12
- Unit balls differ: a diamond for the 1-norm, a circle for the 2-norm, a square for the ∞-norm.
- Example: ‖[[2, 0], [0, 3]]‖₂ = 3, the largest stretch.
K: Norms measure size (1, 2 and ∞ are standard); matrix norms bound stretching; the condition number predicts sensitivity of linear systems.
!: Using the 2-norm formula when a problem specifies the 1- or ∞-norm.
Q: What is the ∞-norm of (−7, 2, 5)? | 7.
Q: What does a large condition number warn of? | A system whose solution is very sensitive to errors.
SUM: Norms measure size in different ways.
SUM: Condition numbers measure sensitivity.
SRC: Trefethen LN, Bau D, Numerical Linear Algebra (SIAM 1997) | textbook | 1997 | https://epubs.siam.org/
SRC: Golub GH, Van Loan CF, Matrix Computations (4th edn, Johns Hopkins University Press 2013) | textbook | 2013 | https://www.press.jhu.edu/
NUM1#maths-u11-34-q1@1: Find the 1-norm of (1, −2, 3). | 6 | 0 |  | |1| + |−2| + |3| = 6.
M1#maths-u11-34-q2@1: What is the ∞-norm (largest row sum) of [[1, −2], [3, 4]]? | 7 | 4 | 6 | 10 | 5 | Absolute row sums are |1| + |−2| = 3 and |3| + |4| = 7, so the ∞-norm is 7.
M3#maths-u11-34-q3@2: A system has κ(A) = 10^{8}, and data are accurate to 16 digits. Roughly how many digits of the solution can you trust? | About 8 | About 16 | About 24 | None | About 2 | As a rule you lose about log₁₀ κ = 8 of the 16 digits, leaving roughly 8 trustworthy digits.

## Orthogonality
S: Orthogonal vectors are perpendicular: their inner product is zero. Orthonormal bases make coordinates trivial to compute, and orthogonal matrices (rotations and reflections) preserve lengths and angles, so they're numerically ideal.
O: Work with orthogonal and orthonormal sets and orthogonal matrices
O: Find coordinates in an orthonormal basis using inner products
T: Orthonormal set | Vectors of length 1 that are pairwise orthogonal
T: Orthogonal matrix | A square Q with QᵀQ = I, so Q^{−1} = Qᵀ
H: Orthonormal bases
- Coordinates are inner products: if {q_{i}} is orthonormal, v = Σ ⟨v, q_{i}⟩ q_{i}.
- Orthogonal non-zero vectors are automatically independent.
- Parseval: ‖v‖^{2} = Σ ⟨v, q_{i}⟩^{2}.
H: Orthogonal matrices
- Columns (and rows) are orthonormal.
- ‖Qx‖ = ‖x‖ and Qx · Qy = x · y: lengths and angles are preserved.
- det Q = ±1: rotations (+1) and reflections (−1).
- Products and inverses of orthogonal matrices are orthogonal.
H: Orthogonal complements
- W^{⟂} = vectors orthogonal to all of W; dim W + dim W^{⟂} = n.
- null(A) = row(A)^{⟂}; null(Aᵀ) = col(A)^{⟂}.
X: Find the coordinates of v = (3, 1) in the orthonormal basis q₁ = (1, 1)/√2, q₂ = (1, −1)/√2.
> c₁ = v · q₁ = (3 + 1)/√2 = 2√2
> c₂ = v · q₂ = (3 − 1)/√2 = √2
> Check: c₁^{2} + c₂^{2} = 8 + 2 = 10 = ‖v‖^{2} ✓
K: Orthonormal bases give coordinates by inner products; orthogonal matrices satisfy QᵀQ = I and preserve length and angle; complements split the space.
!: Using the inner-product formula for coordinates in a basis that isn't orthonormal.
Q: What is the determinant of an orthogonal matrix? | +1 or −1.
Q: What is Q^{−1} for an orthogonal matrix Q? | Qᵀ.
SUM: Orthonormal bases make coordinates easy.
SUM: Orthogonal matrices preserve geometry.
SRC: Strang G, Introduction to Linear Algebra (6th edn, Wellesley-Cambridge Press 2023) | textbook | 2023 | https://math.mit.edu/~gs/linearalgebra/
SRC: Trefethen LN, Bau D, Numerical Linear Algebra (SIAM 1997) | textbook | 1997 | https://epubs.siam.org/
NUM1#maths-u11-35-q1@1: In the example, find c₁ to 3 decimal places. | 2.828 | 0.001 |  | 2√2 ≈ 2.828.
M1#maths-u11-35-q2@1: Which matrix is orthogonal? | [[0, 1], [1, 0]] | [[1, 1], [0, 1]] | [[2, 0], [0, 2]] | [[1, 2], [3, 4]] | [[1, 1], [1, 1]] | Its columns are orthonormal: it's a reflection.
M2#maths-u11-35-q3@2: Why are orthogonal matrices numerically ideal? | They don't amplify errors: ‖Qx‖ = ‖x‖ and their condition number is 1 | They're always diagonal | They have no inverses | Their entries are integers | They aren't ideal | Preserving norms means rounding errors aren't magnified.

## Orthogonal Projections
S: An orthogonal projection drops a vector onto a subspace at right angles, giving the closest point in that subspace. Projections are behind least squares, best approximations and the geometry of regression.
O: Project vectors onto lines and subspaces
O: Use projection matrices and their properties
T: Projection onto a line | proj_{a}b = (a · b/a · a) a
T: Projection matrix | P = A(AᵀA)^{−1}Aᵀ, projecting onto col(A) (independent columns)
H: Properties
- b − Pb is orthogonal to the subspace: the error is perpendicular.
- Pb is the closest point in the subspace to b.
- P^{2} = P (projecting twice changes nothing) and Pᵀ = P.
- With an orthonormal basis Q: P = QQᵀ.
H: Least squares
- If Ax = b has no solution, solve AᵀAx̂ = Aᵀb: Ax̂ is the projection of b onto col(A).
- Fitting a line y = c + mx to data is exactly this.
H: Other projections
- Oblique projections (not at right angles) satisfy P^{2} = P but not Pᵀ = P.
- Projection onto a plane through the origin with normal n: b − (n · b/n · n)n.
X: Project b = (1, 2, 3) onto the line through a = (1, 1, 1).
> a · b = 6 and a · a = 3
> proj = 2(1, 1, 1) = (2, 2, 2)
> The error (−1, 0, 1) is orthogonal to a ✓; distance = √2
- Example: projecting onto the xy-plane in ℝ^{3} uses P = diag(1, 1, 0).
K: Projection gives the closest point with perpendicular error; P = A(AᵀA)^{−1}Aᵀ with P^{2} = P = Pᵀ; least squares projects b onto col(A).
!: Forgetting to divide by a · a when projecting onto a non-unit vector.
Q: What is P^{2} for a projection matrix? | P.
Q: What equations give the least squares solution? | AᵀAx̂ = Aᵀb.
SUM: Projections find closest points.
SUM: Errors are perpendicular.
SRC: Strang G, Introduction to Linear Algebra (6th edn, Wellesley-Cambridge Press 2023) | textbook | 2023 | https://math.mit.edu/~gs/linearalgebra/
SRC: Lay DC, Lay SR, McDonald JJ, Linear Algebra and Its Applications (6th edn, Pearson 2021) | textbook | 2021 | https://www.pearson.com/
NUM1#maths-u11-36-q1@1: Find the distance from (1, 2, 3) to the line through (1, 1, 1), to 3 decimal places. | 1.414 | 0.001 |  | The error vector (−1, 0, 1) has length √2 ≈ 1.414.
M1#maths-u11-36-q2@1: What is the projection of (4, 3) onto the x-axis? | (4, 0) | (0, 3) | (4, 3) | (3, 0) | (5, 0) | Dropping perpendicularly onto the x-axis keeps x and zeroes y.
M3#maths-u11-36-q3@2: Why is the least squares fit the projection of b onto col(A)? | It minimises ‖Ax − b‖, and the closest point in a subspace is the orthogonal projection | It makes Ax equal to b exactly | It uses the largest eigenvalue | It ignores the columns of A | It isn't | Minimising distance to a subspace gives a perpendicular residual: Aᵀ(b − Ax̂) = 0.

## Gram–Schmidt Process
S: The Gram–Schmidt process turns any linearly independent set into an orthonormal one spanning the same space. It subtracts each vector's components along earlier ones and normalises, and it's the idea behind the QR decomposition.
O: Apply Gram–Schmidt to small sets of vectors
O: Explain modified Gram–Schmidt and the link to QR
T: Gram–Schmidt step | u_{k} = v_{k} − Σ_{j<k} (v_{k} · q_{j}) q_{j}, then q_{k} = u_{k}/‖u_{k}‖
T: Modified Gram–Schmidt | A reordering that subtracts components one at a time, more stable in floating point
H: The process
- q₁ = v₁/‖v₁‖.
- For each next vector, remove its projections onto all earlier q's, then normalise.
- A zero vector appears exactly when the input was dependent.
H: Uses
- Orthonormal bases for subspaces and function spaces (Legendre polynomials come from orthonormalising 1, x, x^{2}, … on [−1, 1]).
- QR decomposition: A = QR, with R recording the coefficients.
- Krylov methods (Arnoldi, Lanczos) use it repeatedly.
H: Numerical cautions
- Classical Gram–Schmidt loses orthogonality with nearly dependent vectors.
- Modified Gram–Schmidt or Householder reflections are preferred in practice.
X: Apply Gram–Schmidt to v₁ = (1, 1, 0) and v₂ = (1, 0, 1).
> u₁ = (1, 1, 0); q₁ = (1, 1, 0)/√2
> u₂ = v₂ − (v₂ · u₁/u₁ · u₁)u₁ = (1, 0, 1) − ½(1, 1, 0) = (½, −½, 1)
> q₂ = u₂/‖u₂‖ = (½, −½, 1)/√1.5; check u₁ · u₂ = ½ − ½ + 0 = 0 ✓
K: Subtract projections onto earlier vectors, then normalise; it builds orthonormal bases and QR; use modified Gram–Schmidt or Householder for stability.
!: Subtracting projections onto the original vectors v_{j} instead of the orthogonalised ones.
Q: What does Gram–Schmidt produce from a dependent set? | A zero vector at the first dependent position.
Q: Which polynomials come from Gram–Schmidt on 1, x, x^{2} over [−1, 1]? | Legendre polynomials (up to scaling).
SUM: Gram–Schmidt orthonormalises.
SUM: It underlies QR.
SRC: Trefethen LN, Bau D, Numerical Linear Algebra (SIAM 1997) | textbook | 1997 | https://epubs.siam.org/
SRC: Strang G, Introduction to Linear Algebra (6th edn, Wellesley-Cambridge Press 2023) | textbook | 2023 | https://math.mit.edu/~gs/linearalgebra/
NUM1#maths-u11-37-q1@1: Find ‖u₂‖ = ‖(½, −½, 1)‖ to 4 decimal places. | 1.2247 | 0.0001 |  | √(0.25 + 0.25 + 1) = √1.5 ≈ 1.2247.
M1#maths-u11-37-q2@1: Applying Gram–Schmidt to (3, 4) gives which first vector? | (0.6, 0.8) | (3, 4) | (0.8, 0.6) | (1, 1) | (0.75, 1) | The first step just normalises: (3, 4) has length 5, giving (0.6, 0.8).
M2#maths-u11-37-q3@2: Why is modified Gram–Schmidt preferred to the classical version? | It keeps vectors closer to orthogonal in floating-point arithmetic | It uses fewer vectors | It needs no normalisation | It works only on square matrices | It isn't preferred | Subtracting components one at a time reduces the build-up of rounding errors.

## Matrix Decomposition
S: A matrix decomposition writes a matrix as a product of simpler matrices: triangular, orthogonal or diagonal. Choosing the right one turns hard problems (solving systems, least squares, eigenvalues, compression) into easy steps.
O: Match common decompositions to the problems they solve
O: Use a factorisation to solve a linear system
T: Factorisation | Writing A as a product such as LU, QR, LLᵀ, QΛQᵀ or UΣVᵀ
T: Triangular solve | Solving Lx = b or Ux = b by forward or back substitution, in about n^{2} operations
H: The main decompositions
- LU (with pivoting): general square systems.
- Cholesky LLᵀ: symmetric positive definite systems, twice as fast.
- QR: least squares and the QR eigenvalue algorithm.
- Eigendecomposition and Schur: dynamics and powers.
- SVD: rank, low-rank approximation, pseudoinverses, PCA.
H: Why factorise?
- Factor once (about n^{3} work), then solve for many right-hand sides cheaply (n^{2} each).
- Structure (triangular, orthogonal) makes each step stable and simple.
- Libraries (LAPACK) implement them carefully.
H: Choosing
- Is A square, symmetric, positive definite, sparse, rectangular?
- Speed vs stability: QR and SVD are more robust; LU and Cholesky faster.
X: Given A = LU with L = [[1, 0], [2, 1]] and U = [[2, 1], [0, 3]], solve Ax = (4, 11).
> Forward solve Ly = b: y₁ = 4, then 2 × 4 + y₂ = 11, so y₂ = 3
> Back solve Ux = y: 3x₂ = 3, so x₂ = 1; 2x₁ + 1 = 4, so x₁ = 1.5
> Check: A = [[2, 1], [4, 5]] and A(1.5, 1) = (4, 11) ✓
K: Decompose into simple factors; LU and Cholesky for systems, QR for least squares, SVD for rank and compression; factor once and reuse.
!: Re-factorising a matrix for every new right-hand side.
Q: Which decomposition suits symmetric positive definite systems? | Cholesky.
Q: About how much work is a triangular solve? | About n^{2} operations.
SUM: Decompositions make problems easy.
SUM: Choose by the matrix's structure.
SRC: Golub GH, Van Loan CF, Matrix Computations (4th edn, Johns Hopkins University Press 2013) | textbook | 2013 | https://www.press.jhu.edu/
SRC: Anderson E et al, LAPACK Users' Guide (3rd edn, SIAM 1999) | guidance | 1999 | https://www.netlib.org/lapack/lug/
NUM1#maths-u11-38-q1@1: In the example, find x₁. | 1.5 | 0.0001 |  | Back substitution gives x₁ = (4 − 1)/2 = 1.5.
M1#maths-u11-38-q2@1: Which decomposition is best for computing a low-rank approximation of an image? | The singular value decomposition | LU decomposition | Cholesky decomposition | Jordan form | Row echelon form | Truncating the SVD gives the best low-rank approximation.
M2#maths-u11-38-q3@2: Why factorise A once when solving Ax = b for 100 different b? | Factorising costs ~n^{3} once; each extra solve costs only ~n^{2} | Each b needs its own factorisation | Factorisation changes the solution | It's slower overall | It doesn't matter | Reusing L and U turns 100 expensive solves into cheap triangular ones.

## LU Decomposition
S: LU decomposition writes a square matrix as a lower triangular L times an upper triangular U. It's Gaussian elimination recorded as matrices, and with row pivoting it's the standard way to solve general linear systems.
O: Compute an LU decomposition by elimination
O: Use pivoting and the LU factors to solve systems and find determinants
T: LU decomposition | A = LU with L unit lower triangular (multipliers below the diagonal) and U upper triangular
T: Partial pivoting | Swapping rows so the largest available entry becomes the pivot: PA = LU
H: Computing
- Eliminate below each pivot; record each multiplier in L.
- U is the final echelon form.
- Cost: about 2n^{3}/3 operations.
H: Using it
- Solve Ly = b (forward), then Ux = y (back).
- det A = product of U's diagonal (times ±1 for row swaps).
- Inverse, if really needed, by solving with each column of I.
H: Pivoting
- Without pivoting, a zero or tiny pivot breaks or destabilises the method.
- [[0, 1], [1, 1]] has no LU without a row swap.
- With partial pivoting, LU is stable in practice for almost all matrices.
X: Find the LU decomposition of A = [[2, 1], [6, 4]] and det A.
> Multiplier 6/2 = 3: R₂ − 3R₁ gives U = [[2, 1], [0, 1]]
> L = [[1, 0], [3, 1]]
> det A = 2 × 1 = 2 (check: 8 − 6 = 2)
- Example: for a 1,000 × 1,000 system, LU takes about 6.7 × 10^{8} operations, then each new solve about 2 × 10^{6}.
- Sparse LU tries to preserve zeros (see Sparse Matrices).
K: Elimination gives U with multipliers in L; solve by forward and back substitution; det = product of U's pivots; pivot for stability.
!: Putting the negatives of the multipliers in L.
Q: What does L contain below its diagonal? | The elimination multipliers.
Q: Why is pivoting needed for [[0, 1], [1, 1]]? | The first pivot is zero.
SUM: LU records elimination.
SUM: Pivoting keeps it stable.
SRC: Golub GH, Van Loan CF, Matrix Computations (4th edn, Johns Hopkins University Press 2013) | textbook | 2013 | https://www.press.jhu.edu/
SRC: Trefethen LN, Bau D, Numerical Linear Algebra (SIAM 1997) | textbook | 1997 | https://epubs.siam.org/
NUM1#maths-u11-39-q1@1: For A = [[2, 1], [6, 4]], find the product of U's diagonal entries. | 2 | 0 |  | U = [[2, 1], [0, 1]], so 2 × 1 = 2 = det A.
M1#maths-u11-39-q2@1: For A = [[1, 2], [4, 9]], what is U in A = LU? | [[1, 2], [0, 1]] | [[1, 2], [0, 9]] | [[1, 0], [4, 1]] | [[4, 9], [0, 2]] | [[1, 2], [4, 1]] | Subtract 4 × row 1 from row 2: (4, 9) − (4, 8) = (0, 1), so U = [[1, 2], [0, 1]].
M3#maths-u11-39-q3@2: What is the approximate cost of LU for an n × n matrix? | About 2n^{3}/3 operations | About n^{2} operations | About n operations | About 2ⁿ operations | About n log n operations | Elimination works on (n − k)^{2} entries at step k, summing to ~2n^{3}/3.

## QR Decomposition
S: QR decomposition writes a matrix as an orthogonal (or orthonormal-column) Q times an upper triangular R. It's the stable way to solve least squares problems and the engine of the QR algorithm that computes eigenvalues.
O: Compute a QR decomposition of a small matrix
O: Use QR for least squares
T: QR decomposition | A = QR, with Q's columns orthonormal and R upper triangular
T: Householder reflection | An orthogonal reflection I − 2vvᵀ/(vᵀv) used to zero out entries below a pivot
H: Computing
- Gram–Schmidt on A's columns gives Q; R holds the coefficients r_{ij} = q_{i} · a_{j}.
- Householder reflections or Givens rotations are more stable.
- Cost is about twice that of LU for square matrices.
H: Least squares
- Minimise ‖Ax − b‖: with A = QR, solve Rx = Qᵀb by back substitution.
- Avoids forming AᵀA, which squares the condition number.
H: The QR algorithm
- Iterate A_{k} = Q_{k}R_{k}, A_{k+1} = R_{k}Q_{k}: similar matrices converging to triangular form.
- The diagonal approaches the eigenvalues.
- With shifts and deflation, it's how software computes eigenvalues (Francis, Kublanovskaya, around 1961).
X: Find the QR decomposition of A = [[3, 0], [4, 5]] (columns a₁ = (3, 4), a₂ = (0, 5)).
> r₁₁ = ‖a₁‖ = 5, q₁ = (0.6, 0.8); r₁₂ = q₁ · a₂ = 4
> a₂ − 4q₁ = (−2.4, 1.8), of length 3: r₂₂ = 3, q₂ = (−0.8, 0.6)
> Q = [[0.6, −0.8], [0.8, 0.6]] and R = [[5, 4], [0, 3]]
K: A = QR with orthonormal Q and triangular R; compute by Gram–Schmidt or Householder; solve least squares by Rx = Qᵀb; the QR algorithm finds eigenvalues.
!: Solving least squares via AᵀA when A is ill-conditioned, losing accuracy.
Q: How is least squares solved with QR? | Solve Rx = Qᵀb.
Q: What does the QR algorithm compute? | Eigenvalues.
SUM: QR is orthogonal times triangular.
SUM: It's the stable route to least squares.
SRC: Trefethen LN, Bau D, Numerical Linear Algebra (SIAM 1997) | textbook | 1997 | https://epubs.siam.org/
SRC: Householder AS, Unitary triangularization of a nonsymmetric matrix, Journal of the ACM 5(4), 339 | journal | 1958 | https://doi.org/10.1145/320941.320947
NUM1#maths-u11-40-q1@1: In the example, find r₂₂. | 3 | 0 |  | The remaining component (−2.4, 1.8) has length 3.
M1#maths-u11-40-q2@1: What kind of matrix is Q in A = QR? | One with orthonormal columns | Upper triangular | Diagonal | Symmetric positive definite | Singular | Q collects an orthonormal basis for col(A).
M2#maths-u11-40-q3@2: Why is QR preferred to the normal equations for ill-conditioned least squares? | Forming AᵀA squares the condition number, losing accuracy | QR is always faster | The normal equations have no solution | QR needs no arithmetic | It isn't preferred | κ(AᵀA) = κ(A)^{2}, so the normal equations amplify errors.

## Cholesky Decomposition
S: The Cholesky decomposition writes a symmetric positive definite matrix as LLᵀ, a lower triangular matrix times its transpose. It's about twice as fast as LU, very stable, and doubles as a test for positive definiteness.
O: Compute a Cholesky factorisation of a small matrix
O: Use Cholesky to solve systems and simulate correlated random variables
T: Cholesky decomposition | A = LLᵀ with L lower triangular with positive diagonal, for symmetric positive definite A
T: Correlated sampling | If z has independent standard normal entries, x = Lz has covariance LLᵀ = Σ
H: Computing
- l₁₁ = √a₁₁; l_{i1} = a_{i1}/l₁₁.
- Each diagonal entry: l_{kk} = √(a_{kk} − Σ_{j<k} l_{kj}^{2}).
- If a square root of a negative number is needed, A isn't positive definite.
- Cost about n^{3}/3, half of LU.
H: Uses
- Solving normal equations, Kalman filters and optimisation steps.
- Monte Carlo: generating correlated normals for finance and risk (School 21).
- Gaussian process regression in machine learning.
H: Stability
- No pivoting needed for positive definite matrices.
- Semi-definite or nearly singular cases need care (pivoted or modified Cholesky).
X: Find the Cholesky factor of A = [[4, 2], [2, 5]].
> l₁₁ = √4 = 2; l₂₁ = 2/2 = 1
> l₂₂ = √(5 − 1^{2}) = 2
> L = [[2, 0], [1, 2]]; check LLᵀ = [[4, 2], [2, 5]] ✓
- Example: a covariance matrix of asset returns is factorised to simulate joint market scenarios.
K: A = LLᵀ for symmetric positive definite A; compute column by column with square roots; failure signals non-definiteness; use it for fast solves and correlated sampling.
!: Applying Cholesky to a matrix that isn't symmetric positive definite.
Q: What does a negative number under the square root in Cholesky indicate? | The matrix isn't positive definite.
Q: How do you generate normals with covariance Σ = LLᵀ? | Take x = Lz with z standard normal.
SUM: Cholesky factors positive definite matrices.
SUM: It's fast and stable.
SRC: Golub GH, Van Loan CF, Matrix Computations (4th edn, Johns Hopkins University Press 2013) | textbook | 2013 | https://www.press.jhu.edu/
SRC: Glasserman P, Monte Carlo Methods in Financial Engineering (Springer 2003) | textbook | 2003 | https://link.springer.com/
NUM1#maths-u11-41-q1@1: For A = [[9, 3], [3, 5]], find l₂₂ in the Cholesky factor. | 2 | 0 |  | l₁₁ = 3, l₂₁ = 1, l₂₂ = √(5 − 1) = 2.
M1#maths-u11-41-q2@1: Which matrix has a Cholesky decomposition? | [[4, 2], [2, 3]] | [[1, 2], [2, 1]] | [[0, 1], [1, 0]] | [[−1, 0], [0, 1]] | [[1, 3], [2, 1]] | It's symmetric with positive leading minors (4 and 8).
M2#maths-u11-41-q3@2: Why is Cholesky about twice as fast as LU? | Symmetry means only one triangular factor needs computing | It uses fewer rows | It skips the diagonal | It works only on 2 × 2 matrices | It isn't faster | A = LLᵀ needs only L, half the work of separate L and U.

## Singular Value Decomposition (SVD)
S: The singular value decomposition writes any matrix as A = UΣVᵀ: a rotation, a stretch and another rotation. It exists for every matrix, reveals rank and conditioning, and gives the best low-rank approximations used in compression, recommendation systems and data analysis.
O: Find singular values from AᵀA
O: Use the SVD for rank, low-rank approximation and the pseudoinverse
T: Singular values | σ₁ ≥ σ₂ ≥ … ≥ 0, the square roots of the eigenvalues of AᵀA
T: Eckart–Young theorem | Keeping the k largest singular values gives the best rank-k approximation in the 2-norm and Frobenius norm
H: The decomposition
- U and V orthogonal; Σ diagonal (rectangular) with the singular values.
- Columns of V are eigenvectors of AᵀA; columns of U are eigenvectors of AAᵀ.
- Rank = number of non-zero singular values; ‖A‖₂ = σ₁; κ(A) = σ₁/σ_{n}.
H: Uses
- Compression: a rank-k image needs k(m + n + 1) numbers instead of mn.
- Pseudoinverse A⁺ = VΣ⁺Uᵀ gives minimum-norm least squares solutions.
- PCA, latent semantic analysis, recommender systems (the Netflix Prize), noise reduction.
H: Geometry
- A maps the unit sphere to an ellipsoid with semi-axes σ_{i} along the u_{i}.
- |det A| = product of singular values (for square A).
X: Find the singular values of A = [[3, 0], [4, 5]].
> AᵀA = [[25, 20], [20, 25]], with eigenvalues 45 and 5
> σ₁ = √45 ≈ 6.708, σ₂ = √5 ≈ 2.236
> Check: σ₁σ₂ = √225 = 15 = |det A| ✓
K: A = UΣVᵀ for every matrix; σ_{i} = √eig(AᵀA); rank and norm from Σ; truncation gives the best low-rank approximation; pseudoinverse via Σ⁺.
!: Confusing singular values with eigenvalues (they differ for non-symmetric matrices).
Q: What is the 2-norm of A in terms of its SVD? | The largest singular value σ₁.
Q: Does every matrix have an SVD? | Yes.
SUM: The SVD decomposes any matrix.
SUM: Truncation gives the best approximations.
SRC: Eckart C, Young G, The approximation of one matrix by another of lower rank, Psychometrika 1(3), 211 | journal | 1936 | https://doi.org/10.1007/BF02288367
SRC: Trefethen LN, Bau D, Numerical Linear Algebra (SIAM 1997) | textbook | 1997 | https://epubs.siam.org/
NUM1#maths-u11-42-q1@1: Find the largest singular value of [[3, 0], [4, 5]], to 3 decimal places. | 6.708 | 0.001 |  | √45 ≈ 6.708.
M1#maths-u11-42-q2@1: A 1,000 × 1,000 image is approximated with rank 20. About how many numbers are stored? | About 40,000 | About 1,000,000 | About 20 | About 2,000 | About 400 | Each of the 20 terms stores a u vector, a v vector and a singular value: 20 × 2,001 ≈ 40,000.
M3#maths-u11-42-q3@2: What is the condition number of a square matrix with singular values 10, 2 and 0.01? | 1,000 | 10 | 5 | 0.001 | 100 | The 2-norm condition number is σ_{max}/σ_{min} = 10/0.01 = 1,000.

## Principal Component Analysis (PCA)
S: Principal component analysis finds the directions in which data vary most and re-expresses the data along them. It reduces many correlated variables to a few components, for visualisation, compression, noise reduction and as a step before machine learning.
O: Carry out PCA from a covariance matrix
O: Interpret components, variance explained and when to standardise
T: Principal components | Orthonormal eigenvectors of the covariance matrix, ordered by eigenvalue (variance)
T: Proportion of variance explained | λ_{i}/Σλ, the share of total variance along component i
H: The method
- Centre the data (subtract column means); standardise if variables use different units.
- Compute the covariance matrix and its eigenvectors and eigenvalues (or the SVD of the data matrix).
- Project the data onto the leading components; choose how many by a scree plot or cumulative variance.
H: Interpreting
- Loadings show how original variables combine into each component.
- Scores place each observation in component coordinates.
- PCA finds linear structure only; components needn't have real-world meaning.
H: Uses and links
- Genetics (population structure), finance (yield curve factors), image analysis (eigenfaces).
- Data compression and denoising.
- Related methods: factor analysis (School 13), kernel PCA, autoencoders (School 24).
X: Data have covariance matrix [[5, 2], [2, 2]]. Find the principal components and the variance explained by the first.
> Eigenvalues: λ^{2} − 7λ + 6 = 0, so λ = 6 and λ = 1
> PC1 for λ = 6: (5 − 6)x + 2y = 0, so direction (2, 1)/√5; PC2 is (−1, 2)/√5
> PC1 explains 6/7 ≈ 85.7% of the variance
K: Centre (and usually standardise), find covariance eigenvectors or the SVD, keep components with most variance; loadings and scores interpret them.
!: Running PCA on variables with very different units without standardising, so the largest-unit variable dominates.
Q: What do PCA's eigenvalues represent? | The variance along each principal component.
Q: Why centre the data before PCA? | So components describe variation around the mean, not the mean itself.
SUM: PCA finds directions of greatest variance.
SUM: It reduces dimension with minimal loss.
SRC: Jolliffe IT, Cadima J, Principal component analysis: a review and recent developments, Philosophical Transactions of the Royal Society A 374, 20150202 | journal | 2016 | https://doi.org/10.1098/rsta.2015.0202
SRC: James G, Witten D, Hastie T, Tibshirani R, An Introduction to Statistical Learning (2nd edn, Springer 2021) | textbook | 2021 | https://www.statlearning.com/
NUM1#maths-u11-43-q1@1: In the example, what percentage of variance does PC1 explain, to 1 decimal place? | 85.7 | 0.05 | % | 6/7 ≈ 85.7%.
M1#maths-u11-43-q2@1: How are principal components computed in practice? | From the SVD of the centred data matrix | From the determinant of the data | From the row echelon form | From the mean of each variable | By sorting the data | The right singular vectors of centred data are the principal directions.
M2#maths-u11-43-q3@2: Two variables have perfect correlation. What does PCA give? | One component with all the variance and one with none | Two equal components | No components | Components along the axes | Negative variance | All points lie on a line, so a single direction carries everything.

## Sparse Matrices
S: A sparse matrix is mostly zeros. Matrices from networks, finite elements and text data can have millions of rows but only a few non-zeros per row; storing and computing with only the non-zeros makes such problems solvable.
O: Store sparse matrices efficiently and estimate savings
O: Choose suitable methods for sparse systems
T: Compressed sparse row (CSR) | Storing the non-zero values, their column indices and pointers to the start of each row
T: Fill-in | New non-zeros created during factorisation, which can destroy sparsity
H: Storage and operations
- Memory and matrix-vector products scale with the number of non-zeros (nnz), not n^{2}.
- Formats: coordinate (COO), CSR, CSC, banded.
- A tridiagonal n × n matrix has 3n − 2 non-zeros.
H: Solving systems
- Direct sparse solvers reorder rows and columns (minimum degree, nested dissection) to limit fill-in.
- Iterative methods (conjugate gradient, GMRES) only need matrix-vector products.
- Preconditioners speed up convergence.
H: Where they arise
- Finite difference and element discretisations of PDEs.
- Graphs: adjacency and Laplacian matrices of networks (School 15).
- Recommender systems and document–term matrices.
X: What fraction of entries must be stored for a 1,000 × 1,000 tridiagonal matrix?
> Non-zeros: 3 × 1,000 − 2 = 2,998
> Total entries: 1,000,000
> About 0.3% need storing
K: Store only non-zeros (CSR and similar); costs scale with nnz; reorder to limit fill-in; iterative methods suit very large sparse systems.
!: Converting a large sparse matrix to dense form, exhausting memory.
Q: How many non-zeros does a tridiagonal n × n matrix have? | 3n − 2.
Q: What is fill-in? | New non-zeros created during factorisation.
SUM: Sparse matrices store only non-zeros.
SUM: Special methods keep them sparse.
SRC: Davis TA, Direct Methods for Sparse Linear Systems (SIAM 2006) | textbook | 2006 | https://epubs.siam.org/
SRC: Saad Y, Iterative Methods for Sparse Linear Systems (2nd edn, SIAM 2003) | textbook | 2003 | https://www-users.cse.umn.edu/~saad/IterMethBook_2ndEd.pdf
NUM1#maths-u11-44-q1@1: How many non-zeros does a 10 × 10 tridiagonal matrix have? | 28 | 0 |  | 3 × 10 − 2 = 28.
M1#maths-u11-44-q2@1: Which method needs only matrix-vector products with A? | The conjugate gradient method | Dense LU decomposition | Computing A^{−1} explicitly | Cramer's rule | Gauss–Jordan on the full matrix | Krylov iterative methods use A only through products Av.
M2#maths-u11-44-q3@2: Why do sparse direct solvers reorder the matrix first? | A good ordering reduces fill-in, saving memory and time | Reordering changes the solution | It makes the matrix dense | It's required for symmetry | It doesn't help | Elimination order determines how many zeros become non-zero.

## Block Matrices
S: Partitioning a matrix into blocks lets you treat submatrices as single entries. Block multiplication, block triangular structure and the Schur complement simplify proofs, algorithms and the analysis of coupled systems.
O: Multiply and invert block matrices
O: Use the Schur complement to find determinants and solve systems
T: Block matrix | A matrix partitioned into submatrices, such as [[A, B], [C, D]]
T: Schur complement | S = D − CA^{−1}B, for the block [[A, B], [C, D]] with A invertible
H: Operations
- Multiply blocks like entries, keeping the order (blocks don't commute).
- Block diagonal: inverse and determinant work block by block.
- Block triangular: det = det A × det D.
H: Schur complement
- det [[A, B], [C, D]] = det A × det(D − CA^{−1}B).
- Eliminating the first block of unknowns from a system leaves a system with matrix S.
- In statistics, conditional covariances of multivariate normals are Schur complements (School 12).
H: Uses
- Coupled physical systems (fluid and structure), saddle-point systems in optimisation.
- Parallel algorithms that split work across blocks.
- Kalman filter update formulas.
X: For the 2 × 2 matrix [[2, 1], [1, 3]] viewed as 1 × 1 blocks, find the Schur complement and det.
> S = 3 − 1 × (1/2) × 1 = 2.5
> det = det A × S = 2 × 2.5 = 5
> Check: 2 × 3 − 1 × 1 = 5 ✓
K: Block matrices multiply like entries, in order; block triangular determinants multiply; S = D − CA^{−1}B gives determinants and reduced systems.
!: Commuting blocks during multiplication (writing CA^{−1}B as A^{−1}BC, for instance).
Q: What is the inverse of the block diagonal matrix diag(A, D)? | diag(A^{−1}, D^{−1}).
Q: What is det of block triangular [[A, B], [0, D]]? | det A × det D.
SUM: Blocks simplify large matrices.
SUM: The Schur complement reduces systems.
SRC: Zhang F (ed), The Schur Complement and Its Applications (Springer 2005) | textbook | 2005 | https://link.springer.com/
SRC: Horn RA, Johnson CR, Matrix Analysis (2nd edn, Cambridge University Press 2013) | textbook | 2013 | https://www.cambridge.org/
NUM1#maths-u11-45-q1@1: In the example, what is the Schur complement S? | 2.5 | 0.0001 |  | 3 − 1 × ½ × 1 = 2.5.
M1#maths-u11-45-q2@1: What is det [[A, 0], [0, D]] with det A = 3 and det D = 4? | 12 | 7 | 1 | 0 | 34 | Determinants of block diagonal matrices multiply: 3 × 4 = 12.
M2#maths-u11-45-q3@2: Why must block multiplication keep the order of blocks? | Matrix blocks generally don't commute | Blocks are scalars | Order never matters | It changes the size | It doesn't need to | Each block product is a matrix product, which isn't commutative.

## Numerical Linear Algebra
S: Numerical linear algebra designs fast, accurate algorithms for matrix problems on real computers with finite precision. It underpins scientific computing, machine learning and engineering simulation, where matrices can have millions of rows.
O: Explain stability, conditioning and backward error
O: Describe direct and iterative methods and their costs
T: Backward stable algorithm | One whose computed answer is the exact answer for slightly perturbed data
T: Krylov subspace method | An iterative method building approximations from span{b, Ab, A^{2}b, …}, such as conjugate gradient or GMRES
H: Accuracy
- Floating-point arithmetic has relative precision about 10^{−16} (double precision).
- Error in the answer ≲ condition number × backward error.
- Stable algorithms (LU with pivoting, QR, SVD) keep backward error tiny; ill-conditioning is the problem's fault, not the algorithm's.
H: Methods
- Direct methods (LU, Cholesky, QR) cost O(n^{3}) for dense matrices.
- Iterative methods suit large sparse systems; conjugate gradient for symmetric positive definite ones.
- CG error falls by about (√κ − 1)/(√κ + 1) per iteration: preconditioning reduces κ.
- Eigenvalues: QR algorithm (dense), Lanczos and Arnoldi (large sparse).
H: Software and hardware
- BLAS and LAPACK are the standard libraries; GPUs accelerate matrix products for machine learning.
- Communication (moving data) often costs more than arithmetic.
X: For conjugate gradient with κ = 100, estimate the error reduction per iteration.
> √κ = 10
> Factor (10 − 1)/(10 + 1) = 9/11 ≈ 0.818
> About 12 iterations reduce the error by 10 (since 0.818^{12} ≈ 0.09)
K: Accuracy ≈ conditioning × backward error; stable algorithms have small backward error; direct methods for dense, Krylov methods for large sparse; preconditioning speeds convergence.
!: Blaming an algorithm for inaccuracy caused by an ill-conditioned problem.
Q: What is double-precision machine epsilon, roughly? | About 10^{−16}.
Q: Which iterative method suits symmetric positive definite systems? | Conjugate gradient.
SUM: Numerical linear algebra balances speed and accuracy.
SUM: Conditioning limits what any algorithm can do.
SRC: Trefethen LN, Bau D, Numerical Linear Algebra (SIAM 1997) | textbook | 1997 | https://epubs.siam.org/
SRC: Hestenes MR, Stiefel E, Methods of conjugate gradients for solving linear systems, Journal of Research of the National Bureau of Standards 49(6), 409 | journal | 1952 | https://doi.org/10.6028/jres.049.044
NUM1#maths-u11-46-q1@1: For κ = 100, find the CG reduction factor (√κ − 1)/(√κ + 1) to 3 decimal places. | 0.818 | 0.001 |  | 9/11 ≈ 0.818.
M1#maths-u11-46-q2@1: What does backward stability guarantee? | The computed answer is exact for slightly perturbed input | The answer is exactly right | The algorithm never rounds | The matrix is well conditioned | The method is iterative | Small backward error plus good conditioning gives accurate answers.
M3#maths-u11-46-q3@2: An iterative solver converges slowly because κ(A) is huge. What usually helps most? | A good preconditioner that reduces the effective condition number | Using single precision | Removing pivoting | Inverting A explicitly | More digits in the answer | Preconditioning transforms the system so Krylov methods converge in far fewer steps.

## Multilinear Algebra
S: Multilinear algebra studies functions that are linear in each of several vector arguments, such as the dot product, the determinant and bilinear forms. It's the foundation for tensors, which appear across physics, geometry and data science.
O: Recognise bilinear and multilinear maps
O: Use the determinant as an alternating multilinear function
T: Multilinear map | A function f(v₁, …, v_{k}) linear in each argument when the others are fixed
T: Alternating map | A multilinear map that changes sign when two arguments are swapped (and vanishes if two are equal)
H: Examples
- Bilinear forms: f(x, y) = xᵀAy (the dot product when A = I).
- The determinant is the unique alternating multilinear function of the columns with det I = 1.
- The cross product and scalar triple product are multilinear.
H: Dual spaces
- The dual space V* consists of linear functionals V → ℝ.
- A bilinear form on V corresponds to a linear map V → V*.
- Covectors (row vectors, gradients) live in the dual space.
H: Why it matters
- Tensors represent multilinear maps (next lessons).
- Differential forms in geometry and physics.
- Multiway data (images over time, user–item–context) are naturally multilinear.
X: The determinant is multilinear in the columns. If det A = 1, what is the determinant after multiplying column 1 by 2 and column 3 by 5?
> Multilinearity: scaling one column scales the determinant by the same factor
> Two scalings multiply: 2 × 5 = 10
> The new determinant is 10
K: Multilinear maps are linear in each argument; bilinear forms are xᵀAy; the determinant is the alternating multilinear function of columns; dual spaces hold covectors.
!: Assuming a bilinear map is linear in both arguments together (f(2x, 2y) = 4f(x, y), not 2f(x, y)).
Q: What is f(2x, 3y) for a bilinear f? | 6f(x, y).
Q: What happens to a determinant when two columns are swapped? | It changes sign.
SUM: Multilinear maps are linear slot by slot.
SUM: The determinant is the key example.
SRC: Greub W, Multilinear Algebra (2nd edn, Springer 1978) | textbook | 1978 | https://link.springer.com/
SRC: Axler S, Linear Algebra Done Right (4th edn, Springer 2024) | textbook | 2024 | https://linear.axler.net/
NUM1#maths-u11-47-q1@1: For the bilinear form f(x, y) = xᵀAy with A = [[1, 2], [3, 4]], find f(e₁, e₂). | 2 | 0 |  | f(e₁, e₂) = a₁₂ = 2.
M1#maths-u11-47-q2@1: Which function is bilinear on ℝ^{2} × ℝ^{2}? | f(x, y) = x₁y₂ − x₂y₁ | f(x, y) = x₁ + y₁ | f(x, y) = x₁^{2}y₁ | f(x, y) = |x · y| | f(x, y) = x₁y₁ + 1 | Each term is linear in x and linear in y.
M2#maths-u11-47-q3@2: Why is the determinant called alternating? | Swapping two columns changes its sign | It alternates between 0 and 1 | Its entries alternate in sign | It's only defined for even n | It isn't | Antisymmetry under swaps also makes it zero when two columns are equal.

## Tensor Products
S: The tensor product V ⊗ W combines two vector spaces into one whose dimension is the product of theirs. It's how quantum mechanics combines systems (and creates entanglement), and its matrix form, the Kronecker product, appears in signal processing and statistics.
O: Compute tensor products of vectors and their dimensions
O: Recognise elementary tensors and entanglement
T: Tensor product | V ⊗ W, spanned by v ⊗ w, with dim(V ⊗ W) = dim V × dim W
T: Kronecker product | A ⊗ B, the block matrix [a_{ij}B], representing the tensor product of linear maps
H: Building tensors
- (1, 2) ⊗ (3, 4) = (3, 4, 6, 8) in ℝ^{4} (each entry of the first times the whole second).
- Bilinearity: (u + v) ⊗ w = u ⊗ w + v ⊗ w and (cv) ⊗ w = c(v ⊗ w).
- Universal property: bilinear maps V × W → U correspond to linear maps V ⊗ W → U.
H: Elementary vs general tensors
- Not every tensor is v ⊗ w: in ℝ^{2} ⊗ ℝ^{2}, e₁ ⊗ e₁ + e₂ ⊗ e₂ isn't a single product.
- In quantum mechanics such states are entangled (Bell states).
- Rank of a tensor in V ⊗ W equals the rank of the corresponding matrix.
H: Kronecker products
- (A ⊗ B)(C ⊗ D) = AC ⊗ BD.
- Used for multidimensional transforms, quantum gates on several qubits, and covariance structures.
X: Find (1, 2) ⊗ (3, 4) and the dimension of ℝ^{2} ⊗ ℝ^{3}.
> (1, 2) ⊗ (3, 4) = (1 × 3, 1 × 4, 2 × 3, 2 × 4)
> = (3, 4, 6, 8)
> dim(ℝ^{2} ⊗ ℝ^{3}) = 2 × 3 = 6
K: dim(V ⊗ W) = dim V × dim W; v ⊗ w is bilinear in v and w; not all tensors are elementary (entanglement); Kronecker products represent tensor products of maps.
!: Thinking dim(V ⊗ W) = dim V + dim W (that's the direct sum).
Q: What is the dimension of the state space of three qubits? | 8 (2 × 2 × 2).
Q: What size is the Kronecker product of a 2 × 2 and a 3 × 3 matrix? | 6 × 6.
SUM: Tensor products multiply dimensions.
SUM: Non-elementary tensors are entangled.
SRC: Nielsen MA, Chuang IL, Quantum Computation and Quantum Information (10th anniversary edn, Cambridge University Press 2010) | textbook | 2010 | https://www.cambridge.org/
SRC: Greub W, Multilinear Algebra (2nd edn, Springer 1978) | textbook | 1978 | https://link.springer.com/
NUM1#maths-u11-48-q1@1: What is the dimension of ℂ^{2} ⊗ ℂ^{2} ⊗ ℂ^{2} ⊗ ℂ^{2}? | 16 | 0 |  | 2^{4} = 16.
M1#maths-u11-48-q2@1: Which element of ℝ^{2} ⊗ ℝ^{2} (written in the basis e_{i} ⊗ e_{j}) is elementary? | (1, 2, 3, 6) | (1, 0, 0, 1) | (0, 1, 1, 0) | (1, 0, 0, −1) | (1, 1, 1, −1) | (1, 2, 3, 6) = (1, 3) ⊗ (1, 2); as a 2 × 2 matrix it has rank 1.
M3#maths-u11-48-q3@2: Why is the Bell state (e₁ ⊗ e₁ + e₂ ⊗ e₂)/√2 entangled? | As a 2 × 2 coefficient matrix it has rank 2, so it isn't a single product u ⊗ v | It has length 1 | It's a sum of two terms | It's in ℂ^{4} | It isn't entangled | Elementary tensors correspond to rank-1 coefficient matrices.

## Tensor Algebra
S: The tensor algebra collects all tensor powers of a vector space into one algebra, and tensors of each type describe multilinear quantities such as stress, curvature and multiway data. Symmetric and antisymmetric parts give the symmetric and exterior algebras.
O: Describe tensors of type (p, q) and operations on them
O: Compute dimensions of tensor, symmetric and antisymmetric spaces
T: Tensor algebra | T(V) = ℝ ⊕ V ⊕ (V ⊗ V) ⊕ (V ⊗ V ⊗ V) ⊕ …, with ⊗ as multiplication
T: Contraction | Summing over a paired upper and lower index, reducing a tensor's order by two (the trace is an example)
H: Tensors and their types
- A (p, q) tensor has p vector and q covector slots.
- Vectors (1, 0); covectors (0, 1); linear maps (1, 1); bilinear forms (0, 2).
- dim V^{⊗k} = nᵏ for dim V = n.
H: Operations
- Tensor product raises order; contraction lowers it.
- Symmetrising gives symmetric tensors, dimension C(n + k − 1, k).
- Antisymmetrising gives alternating tensors, dimension C(n, k) (exterior algebra, next lesson).
H: Applications
- Physics: stress and strain tensors, the electromagnetic field tensor, curvature in general relativity.
- Data science: tensor decompositions (CP, Tucker) of multiway arrays.
- Deep learning frameworks name their arrays "tensors" (multi-indexed arrays).
X: Find dim V^{⊗3} and the dimension of symmetric 3-tensors for dim V = 2.
> dim V^{⊗3} = 2^{3} = 8
> Symmetric tensors: C(2 + 3 − 1, 3) = C(4, 3) = 4
> (They correspond to cubic forms ax^{3} + bx^{2}y + cxy^{2} + dy^{3})
K: T(V) collects all tensor powers; (p, q) types count vector and covector slots; contraction lowers order; symmetric and antisymmetric parts have C(n + k − 1, k) and C(n, k) dimensions.
!: Confusing a multi-indexed data array with a tensor's transformation law; the physics meaning requires the right behaviour under change of basis.
Q: What type of tensor is a linear map V → V? | (1, 1).
Q: What is the contraction of v ⊗ w (with a covector) called for matrices? | The trace.
SUM: Tensor algebra organises all tensors.
SUM: Contraction and symmetry shape them.
SRC: Kolda TG, Bader BW, Tensor decompositions and applications, SIAM Review 51(3), 455 | journal | 2009 | https://doi.org/10.1137/07070111X
SRC: Greub W, Multilinear Algebra (2nd edn, Springer 1978) | textbook | 1978 | https://link.springer.com/
NUM1#maths-u11-49-q1@1: What is the dimension of the symmetric 2-tensors on ℝ^{3}? | 6 | 0 |  | C(3 + 2 − 1, 2) = C(4, 2) = 6, like symmetric 3 × 3 matrices.
M1#maths-u11-49-q2@1: What is the dimension of V^{⊗2} for dim V = 4? | 16 | 8 | 6 | 10 | 4 | Tensor products multiply dimensions, so dim(V ⊗ V) = 4 × 4 = 16.
M2#maths-u11-49-q3@2: What does contracting a (1, 1) tensor give? | A scalar: its trace | A vector | A (2, 2) tensor | A matrix of the same size | Nothing | Pairing the upper and lower index sums the diagonal.

## Exterior Algebra
S: The exterior algebra is built from the wedge product, an antisymmetric product of vectors that measures oriented areas, volumes and their higher-dimensional analogues. It gives a clean theory of determinants and is the algebra behind differential forms.
O: Compute wedge products and relate them to areas and determinants
O: Find dimensions of exterior powers
T: Wedge product | v ∧ w, bilinear and antisymmetric: v ∧ w = −w ∧ v, so v ∧ v = 0
T: Exterior power | Λᵏ(V), spanned by k-fold wedges, of dimension C(n, k) for dim V = n
H: Properties
- (ae₁ + be₂) ∧ (ce₁ + de₂) = (ad − bc) e₁ ∧ e₂: the determinant appears.
- v₁ ∧ … ∧ vₙ = det[v₁ … vₙ] e₁ ∧ … ∧ eₙ.
- Vectors are dependent iff their wedge is zero.
- Total dimension of the exterior algebra: Σ C(n, k) = 2ⁿ.
H: Geometry
- v ∧ w represents the oriented parallelogram on v and w.
- In ℝ^{3}, Λ^{2} has dimension 3, which is why the cross product can be treated as a vector.
- Higher wedges represent oriented volumes.
H: Differential forms
- Forms like f dx ∧ dy are integrated over surfaces.
- The exterior derivative d unifies grad, curl and div.
- Stokes' theorem in general form: ∫_{M} dω = ∫_{∂M} ω, covering Green, Stokes and divergence (School 8).
X: Compute (2e₁ + 3e₂) ∧ (e₁ + 4e₂) in ℝ^{2}.
> Expand: 2e₁ ∧ e₁ + 8e₁ ∧ e₂ + 3e₂ ∧ e₁ + 12e₂ ∧ e₂
> e₁ ∧ e₁ = e₂ ∧ e₂ = 0 and e₂ ∧ e₁ = −e₁ ∧ e₂
> Result: (8 − 3)e₁ ∧ e₂ = 5e₁ ∧ e₂, matching det [[2, 1], [3, 4]] = 5
K: Wedge products are antisymmetric; their coefficients are determinants; dim Λᵏ = C(n, k); forms and the generalised Stokes theorem build on them.
!: Forgetting the sign change when reordering factors in a wedge product.
Q: What is v ∧ v? | 0.
Q: What is the dimension of Λ^{2}(ℝ^{3})? | 3.
SUM: Wedge products measure oriented volumes.
SUM: They underlie determinants and forms.
SRC: Spivak M, Calculus on Manifolds (W. A. Benjamin 1965) | textbook | 1965 | https://www.routledge.com/
SRC: Winitzki S, Linear Algebra via Exterior Products (2nd edn, self-published 2020) | textbook | 2020 | https://sites.google.com/site/winitzki/linalg
NUM1#maths-u11-50-q1@1: What is the dimension of Λ^{2}(ℝ^{4})? | 6 | 0 |  | C(4, 2) = 6.
M1#maths-u11-50-q2@1: What is e₂ ∧ e₁ in terms of e₁ ∧ e₂? | −e₁ ∧ e₂ | e₁ ∧ e₂ | 0 | 2e₁ ∧ e₂ | e₂ ∧ e₂ | Swapping the factors of a wedge product changes its sign, so e₂ ∧ e₁ = −e₁ ∧ e₂.
M2#maths-u11-50-q3@2: Why does Λ^{2}(ℝ^{3}) let the cross product be treated as a vector? | It has dimension 3, matching ℝ^{3} itself | It has dimension 9 | Wedges are always vectors | It equals ℝ^{2} | It doesn't | C(3, 2) = 3, so 2-vectors pair with ordinary vectors in three dimensions.
`;
