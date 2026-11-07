// School 16: Logic, Sets and Foundations. Format: kit/course/notes.js. Standard: docs/CURRICULUM_CONTENT_STANDARD.md
// Sets, relations and orders, logic, proof and the foundations of mathematics.
export default `
## Elementary Set Theory
S: A set is a collection of distinct objects, called its elements. Sets are the basic building blocks of modern mathematics: numbers, functions and spaces are all built from them, so fluency with set notation pays off everywhere.
O: Read and write set notation, including set-builder notation
O: Decide membership and subset relations between sets
T: Set | A well-defined collection of distinct objects; order and repetition don't matter
T: Subset | A ⊆ B when every element of A is also an element of B
H: Notation
- Roster form: {1, 2, 3}. Set-builder form: {x ∈ ℤ : 0 < x < 4}.
- x ∈ A means x is an element of A; x ∉ A means it isn't.
- The empty set ∅ has no elements; |A| is the number of elements of a finite set.
- Standard sets: ℕ, ℤ, ℚ, ℝ, ℂ.
H: Equality and subsets
- A = B exactly when A ⊆ B and B ⊆ A (the usual way to prove equality).
- {1, 2, 2} = {2, 1}: repetition and order are ignored.
- ∅ is a subset of every set; every set is a subset of itself.
- A ⊂ B (proper subset) means A ⊆ B and A ≠ B.
H: Membership versus subset
- 1 ∈ {1, 2} but {1} ⊆ {1, 2}; {1} ∉ {1, 2}.
- Sets can contain sets: {∅} has one element, ∅.
- Venn diagrams picture relationships between a few sets.
X: Let A = {x ∈ ℤ : x^{2} < 10}. List A and find |A|.
> x^{2} < 10 holds for integers −3 ≤ x ≤ 3 (since 4^{2} = 16)
> A = {−3, −2, −1, 0, 1, 2, 3}
> |A| = 7
K: Sets are collections of distinct elements; ∈ is membership, ⊆ is inclusion; equality is proved by inclusion both ways; ∅ is a subset of every set.
!: Confusing ∈ with ⊆, for example writing 1 ⊆ {1, 2}.
Q: How many elements does {∅} have? | One.
Q: Is ∅ a subset of {1, 2}? | Yes.
SUM: Sets are the basic objects of mathematics.
SUM: Membership and inclusion are different.
SRC: Halmos PR, Naive Set Theory (Van Nostrand 1960) | textbook | 1960 | https://link.springer.com/
SRC: Velleman DJ, How to Prove It: A Structured Approach (3rd edn, Cambridge University Press 2019) | textbook | 2019 | https://www.cambridge.org/
NUM1#maths-u16-01-q1@1: How many elements does {x ∈ ℕ : 1 ≤ x ≤ 20 and x is a multiple of 3} have? | 6 | 0 |  | The multiples of 3 up to 20 are 3, 6, 9, 12, 15 and 18, which is six elements.
M1#maths-u16-01-q2@1: Which statement about A = {1, {2}, 3} is true? | {2} ∈ A | 2 ∈ A | {1, 2} ⊆ A | |A| = 4 | {3} ∈ A | A's elements are 1, the set {2} and 3, so {2} is an element but the number 2 isn't.
M2#maths-u16-01-q3@2: How is equality of two sets A and B usually proved? | Show A ⊆ B and B ⊆ A | Show they have equal sizes | Show one element lies in both | Show A ∩ B is non-empty | Draw a single Venn diagram | Two sets are equal exactly when each is contained in the other, so both inclusions are proved.

## Set Theory
S: Set theory studies sets in general: how they're built, compared and measured. Cantor's work in the 1870s and 1880s showed that infinite sets come in different sizes, and paradoxes found around 1900 led to careful axioms for what sets may exist.
O: Describe the historical development of set theory and Russell's paradox
O: Explain why set theory serves as a foundation for mathematics
T: Russell's paradox | The "set" R = {x : x ∉ x} leads to contradiction, since R ∈ R iff R ∉ R
T: Naive set theory | Set theory allowing any property to define a set, which turns out to be inconsistent
H: Origins
- Cantor (1874) proved ℝ is not countable: infinities differ in size.
- Dedekind built ℝ from ℚ using sets (cuts).
- Frege tried to base arithmetic on sets defined by any property.
H: Paradoxes
- Russell (1901): R = {x : x ∉ x} is contradictory.
- The Burali-Forti paradox: the "set of all ordinals" is contradictory.
- Fix: restrict which sets exist, giving axiomatic set theories like ZFC.
H: Set theory as a foundation
- Numbers: 0 = ∅, 1 = {∅}, 2 = {∅, {∅}} (von Neumann).
- Ordered pairs (a, b) = {{a}, {a, b}} (Kuratowski), then functions and relations.
- Almost all of mathematics can be formalised in ZFC.
X: Show Russell's set R = {x : x ∉ x} leads to contradiction.
> Suppose R ∈ R. Then by definition R ∉ R: contradiction
> Suppose R ∉ R. Then R satisfies the condition, so R ∈ R: contradiction
> Either way we contradict ourselves, so R can't be a set
K: Cantor founded set theory; Russell's paradox showed unrestricted comprehension is inconsistent; axiomatic set theory such as ZFC is the standard foundation.
!: Assuming any property defines a set (it may only carve a subset from an existing set).
Q: Who showed that ℝ is uncountable? | Georg Cantor.
Q: What is the von Neumann number 2? | {∅, {∅}}.
SUM: Set theory measures and builds collections.
SUM: Paradoxes forced axioms.
SRC: Enderton HB, Elements of Set Theory (Academic Press 1977) | textbook | 1977 | https://www.elsevier.com/
SRC: Ferreirós J, Labyrinth of Thought: A History of Set Theory and Its Role in Modern Mathematics (2nd edn, Birkhäuser 2007) | textbook | 2007 | https://link.springer.com/
NUM1#maths-u16-02-q1@1: How many elements does the von Neumann natural number 3 have? | 3 | 0 |  | 3 = {0, 1, 2} = {∅, {∅}, {∅, {∅}}}, so each von Neumann number n has n elements.
M1#maths-u16-02-q2@1: What does Russell's paradox show? | Not every property defines a set | Every set contains itself | ℝ is countable | The empty set doesn't exist | Infinite sets are all equal | R = {x : x ∉ x} leads to contradiction, so unrestricted set formation must be abandoned.
M3#maths-u16-02-q3@2: Why is the Kuratowski definition (a, b) = {{a}, {a, b}} useful? | It encodes order using only sets, so (a, b) = (c, d) exactly when a = c and b = d | It makes (a, b) equal to (b, a), so pairs become unordered sets | It shows ordered pairs can't be built from sets and need new axioms | It gives every ordered pair exactly three elements, one per brace | It removes the need for the empty set when building numbers | Sets ignore order, yet this construction recovers which element comes first.

## Set Operations
S: Set operations combine sets into new ones: union, intersection, difference, complement and symmetric difference. They obey algebraic laws much like arithmetic, and the same laws reappear in logic, probability and Boolean circuits.
O: Compute unions, intersections, differences and symmetric differences
O: Use the algebraic laws of set operations
T: Set difference | A \ B = {x : x ∈ A and x ∉ B}
T: Symmetric difference | A Δ B = (A \ B) ∪ (B \ A): elements in exactly one of the sets
H: Operations
- Union A ∪ B, intersection A ∩ B, difference A \ B.
- Symmetric difference A Δ B, like exclusive or.
- Complement Aᶜ relative to a universal set U.
H: Laws
- Commutative and associative laws for ∪ and ∩.
- Distributive: A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C), and dually.
- Identity: A ∪ ∅ = A, A ∩ U = A. Idempotent: A ∪ A = A.
- Absorption: A ∪ (A ∩ B) = A.
H: Counting
- Inclusion–exclusion: |A ∪ B| = |A| + |B| − |A ∩ B|.
- For three sets add back |A ∩ B ∩ C| after subtracting pairwise intersections.
- Δ is associative, and A Δ A = ∅.
X: With A = {1, 2, 3, 4} and B = {3, 4, 5}, find A \ B, B \ A and A Δ B.
> A \ B = {1, 2}
> B \ A = {5}
> A Δ B = {1, 2, 5}
- Venn diagrams: draw A \ B as A with the overlap shaded out, and A Δ B as both sets minus the overlap.
- Set operations correspond to bitwise operations on characteristic vectors (AND, OR, XOR).
K: Union, intersection, difference, complement and symmetric difference obey commutative, associative, distributive and absorption laws; inclusion–exclusion counts unions.
!: Treating A \ B and B \ A as equal.
Q: What is A Δ A? | ∅.
Q: What is A ∪ (A ∩ B)? | A.
SUM: Set operations form an algebra.
SUM: Inclusion–exclusion counts unions.
SRC: Velleman DJ, How to Prove It: A Structured Approach (3rd edn, Cambridge University Press 2019) | textbook | 2019 | https://www.cambridge.org/
SRC: Rosen KH, Discrete Mathematics and Its Applications (8th edn, McGraw-Hill 2019) | textbook | 2019 | https://www.mheducation.com/
NUM1#maths-u16-03-q1@1: If |A| = 12, |B| = 9 and |A ∩ B| = 4, find |A Δ B|. | 13 | 0 |  | |A Δ B| = |A| + |B| − 2|A ∩ B| = 12 + 9 − 8 = 13, since the overlap is removed from both sets.
M1#maths-u16-03-q2@1: Which expression equals A ∩ (B ∪ C)? | (A ∩ B) ∪ (A ∩ C) | (A ∪ B) ∩ (A ∪ C) | (A ∩ B) ∩ C | A ∪ (B ∩ C) | (A \ B) ∪ C | Intersection distributes over union, just as multiplication distributes over addition.
M2#maths-u16-03-q3@2: Which description fits the symmetric difference A Δ B? | Elements in exactly one of A and B | Elements in both A and B | Elements in neither A nor B | Elements in A but not in B | All elements of A and B | A Δ B = (A \ B) ∪ (B \ A), so it keeps elements belonging to one set only.

## Union and Intersection
S: Union collects everything in either set; intersection keeps only what's common. These two operations extend from pairs to whole families of sets, and they correspond to "or" and "and" in logic.
O: Compute unions and intersections of finite and indexed families
O: Link union and intersection to logical "or" and "and"
T: Union | A ∪ B = {x : x ∈ A or x ∈ B}
T: Intersection | A ∩ B = {x : x ∈ A and x ∈ B}
H: Basics
- A ∩ B ⊆ A ⊆ A ∪ B.
- Disjoint sets have A ∩ B = ∅.
- A ⊆ B iff A ∪ B = B iff A ∩ B = A.
H: Indexed families
- ⋃ₙ Aₙ: x belongs to at least one Aₙ. ⋂ₙ Aₙ: x belongs to every Aₙ.
- ⋃_{n≥1} [1/n, 1] = (0, 1].
- ⋂_{n≥1} (−1/n, 1/n) = {0}.
- ⋂_{n≥1} (0, 1/n) = ∅, though each set is non-empty.
H: Logic and probability
- ∪ matches "or" (inclusive), ∩ matches "and".
- P(A ∪ B) = P(A) + P(B) − P(A ∩ B).
- Partitions: pairwise disjoint sets whose union is everything.
X: Find ⋃_{n≥1} [1/n, 2] and ⋂_{n≥1} [0, 1 + 1/n].
> Every x with 0 < x ≤ 2 lies in [1/n, 2] for large n; 0 never does: union = (0, 2]
> x lies in every [0, 1 + 1/n] iff 0 ≤ x ≤ 1
> Intersection = [0, 1]
- Union and intersection are both associative, so A ∪ B ∪ C and A ∩ B ∩ C need no brackets.
- Each distributes over the other: A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C).
K: Union is "or", intersection is "and"; A ⊆ B iff A ∪ B = B; indexed unions and intersections can produce sets unlike any member of the family.
!: Assuming an intersection of nested non-empty sets must be non-empty.
Q: What is A ∩ ∅? | ∅.
Q: When are A and B disjoint? | When A ∩ B = ∅.
SUM: Union is "or"; intersection is "and".
SUM: Indexed families extend both.
SRC: Halmos PR, Naive Set Theory (Van Nostrand 1960) | textbook | 1960 | https://link.springer.com/
SRC: Velleman DJ, How to Prove It: A Structured Approach (3rd edn, Cambridge University Press 2019) | textbook | 2019 | https://www.cambridge.org/
NUM1#maths-u16-04-q1@1: Students take French (18) or Spanish (14); 5 take both. How many take at least one? | 27 | 0 |  | |F ∪ S| = 18 + 14 − 5 = 27, since the 5 students in both are otherwise counted twice.
M1#maths-u16-04-q2@1: What is ⋂_{n≥1} (0, 1/n)? | ∅ | {0} | (0, 1) | [0, 1] | (0, 1/2) | No positive number lies below every 1/n, and 0 is excluded, so nothing is in all the sets.
M2#maths-u16-04-q3@2: If A ∪ B = B, what must be true? | A ⊆ B | B ⊆ A | A = ∅ | A ∩ B = ∅ | A = B always | Union with B leaves B unchanged exactly when everything in A is already in B.

## Complements
S: The complement of a set is everything not in it, relative to a chosen universal set. De Morgan's laws show how complements turn unions into intersections and back, which is the set version of negating "or" and "and".
O: Find complements relative to a universal set
O: Apply De Morgan's laws for sets
T: Complement | Aᶜ = U \ A = {x ∈ U : x ∉ A}
T: De Morgan's laws | (A ∪ B)ᶜ = Aᶜ ∩ Bᶜ and (A ∩ B)ᶜ = Aᶜ ∪ Bᶜ
H: Basics
- The universal set U must be fixed: the complement of the evens is the odds in ℤ but not in ℝ.
- (Aᶜ)ᶜ = A; ∅ᶜ = U; Uᶜ = ∅.
- A ∪ Aᶜ = U and A ∩ Aᶜ = ∅.
- A \ B = A ∩ Bᶜ.
H: De Morgan
- "Not in A or B" means "not in A and not in B".
- Extends to families: (⋃ Aᵢ)ᶜ = ⋂ Aᵢᶜ.
- Logic version: ¬(p ∨ q) ≡ ¬p ∧ ¬q.
H: Uses
- Complementary counting: count what you don't want and subtract.
- Topology: closed sets are complements of open sets.
- Probability: P(Aᶜ) = 1 − P(A).
X: In U = {1, …, 10}, let A = evens and B = multiples of 3. Find (A ∪ B)ᶜ.
> A ∪ B = {2, 3, 4, 6, 8, 9, 10}
> Its complement is {1, 5, 7}
> Check by De Morgan: Aᶜ ∩ Bᶜ = {1, 3, 5, 7, 9} ∩ {1, 2, 4, 5, 7, 8, 10} = {1, 5, 7} ✓
- Relative complements: B \ A is the complement of A inside B, with no universal set needed.
- In a truth table, complement corresponds to negating the membership column.
K: Complements depend on the universal set; De Morgan's laws swap ∪ and ∩ under complement; A \ B = A ∩ Bᶜ; complementary counting simplifies problems.
!: Writing (A ∪ B)ᶜ = Aᶜ ∪ Bᶜ, forgetting to switch union to intersection.
Q: What is (Aᶜ)ᶜ? | A.
Q: Express A \ B using intersection and complement. | A ∩ Bᶜ.
SUM: Complements are relative to U.
SUM: De Morgan swaps union and intersection.
SRC: Rosen KH, Discrete Mathematics and Its Applications (8th edn, McGraw-Hill 2019) | textbook | 2019 | https://www.mheducation.com/
SRC: Velleman DJ, How to Prove It: A Structured Approach (3rd edn, Cambridge University Press 2019) | textbook | 2019 | https://www.cambridge.org/
NUM1#maths-u16-05-q1@1: In U = {1, …, 100}, how many numbers are divisible by neither 2 nor 5? | 40 | 0 |  | Divisible by 2 or 5: 50 + 20 − 10 = 60, so the complement has 100 − 60 = 40 numbers.
M1#maths-u16-05-q2@1: Which set equals (A ∩ B)ᶜ? | Aᶜ ∪ Bᶜ | Aᶜ ∩ Bᶜ | A ∪ B | A ∩ Bᶜ | (A ∪ B)ᶜ | By De Morgan, the complement of an intersection is the union of the complements.
M2#maths-u16-05-q3@2: Why must a universal set be fixed before taking complements? | The complement of a set changes with what counts as "everything" | Complements are always empty unless a universal set is named | Sets have no elements outside them, so a fixed U adds nothing | The universal set is always ℝ, so fixing it is just a habit | Complements depend only on the set itself, never on any U | In ℤ the complement of the evens is the odds, but in ℝ it also contains every non-integer.

## Cartesian Products
S: The Cartesian product A × B is the set of all ordered pairs with first entry from A and second from B. It builds the coordinate plane ℝ × ℝ, and relations and functions are defined as subsets of products.
O: List and count elements of Cartesian products
O: Use products to describe grids, relations and functions
T: Cartesian product | A × B = {(a, b) : a ∈ A, b ∈ B}
T: Ordered pair | (a, b), where (a, b) = (c, d) iff a = c and b = d
H: Basics
- |A × B| = |A| × |B| for finite sets.
- A × B ≠ B × A in general: (1, 2) ≠ (2, 1).
- A × ∅ = ∅.
- Aⁿ = A × A × … × A: n-tuples, such as ℝ^{3}.
H: Laws
- A × (B ∪ C) = (A × B) ∪ (A × C).
- A × (B ∩ C) = (A × B) ∩ (A × C).
- (A × B) ∩ (C × D) = (A ∩ C) × (B ∩ D).
H: Uses
- The plane ℝ^{2} and grids of pixels.
- Relations are subsets of A × B; functions are special relations.
- Databases: a table is a subset of a product of column domains.
X: Let A = {a, b} and B = {1, 2, 3}. List A × B and find |A × B|.
> Pair each element of A with each element of B
> A × B = {(a, 1), (a, 2), (a, 3), (b, 1), (b, 2), (b, 3)}
> |A × B| = 2 × 3 = 6
- A relation from A to B is any subset of A × B, so there are 2^{|A||B|} of them.
- Products of infinite sets: ℕ × ℕ is countable, but ℝ × ℝ has the same size as ℝ.
- Graphs of functions: the graph of f: A → B is the subset {(a, f(a))} of A × B.
K: A × B contains ordered pairs; its size is |A||B|; products distribute over ∪ and ∩; relations and functions live inside products.
!: Treating ordered pairs as sets, so that (1, 2) = (2, 1).
Q: What is A × ∅? | ∅.
Q: Is A × B equal to B × A in general? | No.
SUM: Products pair elements in order.
SUM: They host relations and coordinates.
SRC: Halmos PR, Naive Set Theory (Van Nostrand 1960) | textbook | 1960 | https://link.springer.com/
SRC: Rosen KH, Discrete Mathematics and Its Applications (8th edn, McGraw-Hill 2019) | textbook | 2019 | https://www.mheducation.com/
NUM1#maths-u16-06-q1@1: If |A| = 4 and |B| = 5, how many elements does A × B × A have? | 80 | 0 |  | |A × B × A| = 4 × 5 × 4 = 80, multiplying the sizes of the factors.
M1#maths-u16-06-q2@1: Which pair belongs to {1, 2} × {x, y}? | (2, x) | (x, 2) | {1, x} | (1, 2) | (x, y) | Elements of A × B have first entry from A and second from B, in that order.
M2#maths-u16-06-q3@2: Which equation holds for all sets A, B and C? | A × (B ∪ C) = (A × B) ∪ (A × C) | A × B = B × A | A × (B ∪ C) = A × B × C | (A × B)ᶜ = Aᶜ × Bᶜ | A × A = A | Products distribute over unions: a pair has second entry in B ∪ C iff it lies in A × B or A × C.

## Power Sets
S: The power set of A is the set of all subsets of A. A set with n elements has 2ⁿ subsets, and Cantor's theorem shows the power set is always strictly larger than the set, even for infinite sets.
O: List power sets and count subsets
O: State and prove Cantor's theorem
T: Power set | P(A) = {S : S ⊆ A}
T: Cantor's theorem | No function from A to P(A) is onto, so |P(A)| > |A|
H: Counting
- Each element is either in or out of a subset: 2ⁿ subsets.
- P(∅) = {∅} has one element.
- Subsets of size k: C(n, k); Σₖ C(n, k) = 2ⁿ.
H: Cantor's theorem
- Given f: A → P(A), let D = {x ∈ A : x ∉ f(x)}.
- If D = f(d), then d ∈ D iff d ∉ D: contradiction.
- So f misses D, and there are infinitely many sizes of infinity.
H: Structure
- P(A) ordered by ⊆ is a Boolean lattice (see Boolean Lattices).
- Subsets correspond to binary strings (characteristic functions).
- P(ℕ) has the same size as ℝ.
X: List P({a, b, c}) and check the count.
> Size 0: ∅. Size 1: {a}, {b}, {c}
> Size 2: {a, b}, {a, c}, {b, c}. Size 3: {a, b, c}
> 1 + 3 + 3 + 1 = 8 = 2^{3} ✓
- Subsets of {1, …, n} match n-bit binary strings: bit i is 1 when i is in the subset.
- So listing subsets is the same as counting from 0 to 2ⁿ − 1 in binary.
- The power set operation is monotone: if A ⊆ B then P(A) ⊆ P(B).
K: P(A) contains every subset; |P(A)| = 2ⁿ for finite A; Cantor's diagonal argument shows P(A) is always bigger than A.
!: Forgetting ∅ and A itself when listing subsets.
Q: How many elements does P(∅) have? | One.
Q: How many subsets does a 10-element set have? | 1024.
SUM: Power sets collect all subsets.
SUM: They are always strictly larger.
SRC: Enderton HB, Elements of Set Theory (Academic Press 1977) | textbook | 1977 | https://www.elsevier.com/
SRC: Cantor G, Über eine elementare Frage der Mannigfaltigkeitslehre, Jahresbericht der DMV 1, 75 | journal | 1891 | https://eudml.org/
NUM1#maths-u16-07-q1@1: How many subsets of a 6-element set have exactly 2 elements? | 15 | 0 |  | C(6, 2) = 6 × 5/2 = 15 ways to choose which two elements are included.
M1#maths-u16-07-q2@1: How many elements does P(P(∅)) have? | 2 | 1 | 0 | 4 | 3 | P(∅) = {∅} has one element, so its power set has 2^{1} = 2 elements: ∅ and {∅}.
M3#maths-u16-07-q3@2: In Cantor's proof, why can the set D = {x : x ∉ f(x)} never equal f(d)? | If it did, d ∈ D would hold exactly when d ∉ D | D is always empty | D is always the whole of A | f can't be a function | D contains every element of A | Assuming D = f(d) makes d's membership in D contradict itself.

## Countability
S: A set is countable if its elements can be listed as a first, second, third and so on. Surprising sets such as the integers and rationals are countable, so "infinite" alone doesn't capture size: what matters is whether a one-to-one correspondence with ℕ exists.
O: Prove sets countable by constructing listings or bijections with ℕ
O: Use closure properties of countable sets
T: Countable set | A set that is finite or in bijection with ℕ
T: Countably infinite | In bijection with ℕ; its size is ℵ₀
H: Listing arguments
- ℤ: 0, 1, −1, 2, −2, …
- ℕ × ℕ: list pairs by diagonals (sum 0, sum 1, sum 2, …).
- ℚ: list fractions p/q by |p| + q, skipping repeats.
H: Closure facts
- Subsets of countable sets are countable.
- Finite products of countable sets are countable.
- A countable union of countable sets is countable (using countable choice).
- The set of finite strings over a finite alphabet is countable.
H: Hilbert's hotel
- A full hotel with rooms 1, 2, 3, … can still fit one more guest: move each guest from n to n + 1.
- It can fit countably many new guests: move n to 2n and use the odd rooms.
- Infinite sets can be in bijection with proper subsets of themselves.
X: Give an explicit bijection f: ℕ → ℤ, taking ℕ = {0, 1, 2, …}.
> Send even n to n/2 and odd n to −(n + 1)/2
> f(0) = 0, f(1) = −1, f(2) = 1, f(3) = −2, f(4) = 2, …
> Every integer appears exactly once, so ℤ is countable
K: Countable means listable; ℤ, ℚ and ℕ × ℕ are countable; countable sets are closed under subsets, finite products and countable unions.
!: Assuming a set is uncountable because it's "dense" or seems bigger, as with ℚ.
Q: Is ℚ countable? | Yes.
Q: Is the set of finite English texts countable? | Yes.
SUM: Countable means listable.
SUM: Many infinite sets are countable.
SRC: Enderton HB, Elements of Set Theory (Academic Press 1977) | textbook | 1977 | https://www.elsevier.com/
SRC: Velleman DJ, How to Prove It: A Structured Approach (3rd edn, Cambridge University Press 2019) | textbook | 2019 | https://www.cambridge.org/
NUM1#maths-u16-08-q1@1: Under the bijection f(n) = n/2 for even n and −(n + 1)/2 for odd n, what is f(7)? | -4 | 0 |  | 7 is odd, so f(7) = −(7 + 1)/2 = −4.
M1#maths-u16-08-q2@1: Which set is countably infinite? | The set of prime numbers | The set of real numbers | The interval [0, 1] | The power set of ℕ | The set of irrationals | The primes are an infinite subset of ℕ, so they can be listed in increasing order.
M2#maths-u16-08-q3@2: How does Hilbert's hotel fit countably many new guests when full? | Move each guest from room n to room 2n, freeing the odd rooms | Ask every second guest to leave and give their rooms away | Build new rooms beyond the last room and send guests there | Put two guests into every room, doubling the occupancy | It can't: a full hotel has no space for even one more guest | Doubling room numbers frees infinitely many rooms while keeping everyone housed.

## Countable and Uncountable Sets
S: Some infinite sets are too big to list. Cantor's diagonal argument shows the real numbers are uncountable, so there are strictly more reals than natural numbers, and most real numbers can never be described by any finite formula.
O: Prove ℝ is uncountable by the diagonal argument
O: Classify common sets as countable or uncountable
T: Uncountable set | An infinite set with no bijection to ℕ
T: Diagonal argument | Building an element that differs from the nth listed item in the nth place, so it's missing from the list
H: The diagonal argument
- Suppose the reals in (0, 1) are listed as r₁, r₂, r₃, … with decimal expansions.
- Build x whose nth digit differs from the nth digit of rₙ (using digits 4 and 5 avoids 0.4999… issues).
- x is in (0, 1) but differs from every rₙ, so no list is complete.
H: Classification
- Countable: ℕ, ℤ, ℚ, algebraic numbers, finite strings, computer programs.
- Uncountable: ℝ, any interval, irrationals, transcendental numbers, P(ℕ), infinite binary sequences.
- Since algebraic numbers are countable, transcendental numbers exist and are "most" reals.
H: Consequences
- Most real numbers are not computable: there are only countably many programs.
- The continuum hypothesis asks whether any size lies strictly between ℵ₀ and |ℝ| (see Axiom of Choice and Cardinal Arithmetic).
X: Explain why the irrational numbers are uncountable.
> ℝ = ℚ ∪ (irrationals)
> If the irrationals were countable, ℝ would be a union of two countable sets, hence countable
> But ℝ is uncountable, so the irrationals must be uncountable
K: The diagonal argument proves ℝ uncountable; intervals, irrationals and P(ℕ) are uncountable; countably many algebraic numbers implies most reals are transcendental.
!: Applying the diagonal argument to ℚ (the new number needn't be rational).
Q: Are the algebraic numbers countable? | Yes.
Q: Is the set of infinite binary sequences countable? | No.
SUM: Some infinities are bigger.
SUM: Diagonalisation proves it.
SRC: Cantor G, Über eine elementare Frage der Mannigfaltigkeitslehre, Jahresbericht der DMV 1, 75 | journal | 1891 | https://eudml.org/
SRC: Enderton HB, Elements of Set Theory (Academic Press 1977) | textbook | 1977 | https://www.elsevier.com/
NUM1#maths-u16-09-q1@1: How many binary strings of length 10 are there? (Infinite binary sequences, by contrast, are uncountable.) | 1024 | 0 |  | Each of the 10 positions is 0 or 1, giving 2^{10} = 1024 strings.
M1#maths-u16-09-q2@1: Which set is uncountable? | The set of transcendental numbers | The set of algebraic numbers | The set of rational numbers | The set of computer programs | The set of finite subsets of ℕ | Removing the countable algebraic numbers from uncountable ℝ leaves an uncountable set.
M3#maths-u16-09-q3@2: Why does the diagonal argument fail to show ℚ is uncountable? | The number it builds needn't be rational, so it may not belong to ℚ at all | ℚ has no decimal expansions, so no list of digits exists | It doesn't fail: the argument works and ℚ is uncountable | Rationals have only finitely many digits, so no diagonal exists | ℚ is finite, so listing it needs no diagonal argument | The constructed decimal can be non-repeating, so it escapes ℚ rather than contradicting the list.

## Relations
S: A relation from A to B is any set of ordered pairs, recording which elements are related. Relations model friendships, orderings, divisibility and database tables, and their properties sort them into equivalence relations, orders and functions.
O: Represent relations as sets of pairs, matrices and directed graphs
O: Test relations for reflexivity, symmetry, antisymmetry and transitivity
T: Relation | A subset R ⊆ A × B; we write a R b when (a, b) ∈ R
T: Transitive relation | a R b and b R c imply a R c
H: Representations
- Sets of pairs, such as divisibility on {1, 2, 3, 4}: (1, 1), (1, 2), (1, 3), (1, 4), (2, 2), (2, 4), (3, 3), (4, 4).
- 0–1 matrices with a 1 where a R b.
- Directed graphs with an arrow a → b.
H: Properties on a set A
- Reflexive: a R a for all a.
- Symmetric: a R b implies b R a.
- Antisymmetric: a R b and b R a imply a = b.
- Transitive: a R b and b R c imply a R c.
H: Operations
- Inverse R^{−1} = {(b, a) : (a, b) ∈ R}.
- Composition: a (S ∘ R) c if a R b and b S c for some b.
- Transitive closure: the smallest transitive relation containing R (reachability in a graph).
X: Test "a divides b" on the positive integers for each property.
> Reflexive: a | a ✓. Transitive: a | b and b | c give c = b k = a j k ✓
> Antisymmetric: a | b and b | a with positive a, b force a = b ✓
> Not symmetric: 2 | 4 but 4 ∤ 2
K: Relations are sets of pairs; they can be drawn as matrices or digraphs; reflexive, symmetric, antisymmetric and transitive are the key properties.
!: Thinking antisymmetric means "not symmetric" (a relation can be both or neither).
Q: Is "less than" on ℝ reflexive? | No.
Q: What is the inverse of the relation "is a parent of"? | "Is a child of".
SUM: Relations are sets of pairs.
SUM: Four properties classify them.
SRC: Rosen KH, Discrete Mathematics and Its Applications (8th edn, McGraw-Hill 2019) | textbook | 2019 | https://www.mheducation.com/
SRC: Velleman DJ, How to Prove It: A Structured Approach (3rd edn, Cambridge University Press 2019) | textbook | 2019 | https://www.cambridge.org/
NUM1#maths-u16-10-q1@1: How many different relations are there on a 3-element set? | 512 | 0 |  | A relation is any subset of A × A, which has 9 pairs, so there are 2^{9} = 512 relations.
M1#maths-u16-10-q2@1: Which relation on ℤ is symmetric but not reflexive? | a R b iff a + b = 1 | a R b iff a ≤ b | a R b iff a = b | a R b iff a divides b | a R b iff a − b is even | a + b = 1 is symmetric, but a R a needs 2a = 1, which fails for every integer.
M2#maths-u16-10-q3@2: What does the transitive closure of a graph's edge relation describe? | Which vertices can reach which others by some path | Which vertices have the same degree | Which edges form a cycle | Which vertices are isolated | Which edges are undirected | Closing under transitivity adds an arrow a → c whenever a path from a to c exists.

## Relations and Functions
S: A function is a relation in which every input is related to exactly one output. Seeing functions as special relations explains when a rule really defines a function, and lets us talk about domains, ranges and inverses precisely.
O: Decide whether a relation is a function
O: Find domains, codomains and ranges
T: Function | A relation f ⊆ A × B where each a ∈ A appears in exactly one pair (a, b)
T: Range | The set of outputs actually reached, {f(a) : a ∈ A}, a subset of the codomain
H: When is a relation a function?
- Every element of the domain must have an output (total).
- No element may have two outputs (well defined).
- Graph test: every vertical line meets the graph at most once (and at least once over the domain).
H: Parts of a function
- Domain A, codomain B, range f(A) ⊆ B.
- x^{2} on ℝ → ℝ has range [0, ∞).
- Partial functions may leave some inputs undefined, as in computing.
H: Well-definedness
- A rule on equivalence classes must give the same answer for every representative.
- f(a/b) = a + b isn't well defined on ℚ: 1/2 = 2/4 but 3 ≠ 6.
- f(a/b) = a/b + 1 is well defined.
X: Is R = {(x, y) ∈ ℝ^{2} : x^{2} + y^{2} = 1} a function from [−1, 1] to ℝ?
> For x = 0, both (0, 1) and (0, −1) lie in R
> So 0 has two outputs
> R is not a function (though y = √(1 − x^{2}) is)
K: Functions are relations with exactly one output per input; domain, codomain and range are distinct; rules on equivalence classes must be well defined.
!: Confusing codomain with range.
Q: Is every function a relation? | Yes.
Q: What is the range of sin: ℝ → ℝ? | [−1, 1].
SUM: Functions are single-valued relations.
SUM: Range sits inside the codomain.
SRC: Velleman DJ, How to Prove It: A Structured Approach (3rd edn, Cambridge University Press 2019) | textbook | 2019 | https://www.cambridge.org/
SRC: Halmos PR, Naive Set Theory (Van Nostrand 1960) | textbook | 1960 | https://link.springer.com/
NUM1#maths-u16-11-q1@1: How many functions are there from a 3-element set to a 4-element set? | 64 | 0 |  | Each of the 3 inputs independently chooses one of 4 outputs, giving 4^{3} = 64 functions.
M1#maths-u16-11-q2@1: Which relation from {1, 2, 3} to {a, b} is a function? | {(1, a), (2, a), (3, b)} | {(1, a), (1, b), (2, a), (3, b)} | {(1, a), (2, b)} | {(1, b), (3, a)} | {(a, 1), (b, 2), (b, 3)} | Each of 1, 2 and 3 appears exactly once as a first entry, so every input has one output.
M3#maths-u16-11-q3@2: Why isn't f(a/b) = a + b a function on ℚ? | Equal fractions such as 1/2 and 2/4 would get different outputs, 3 and 6 | Fractions have no numerators, so a + b can't be computed | It has no inputs, since ℚ is empty under this rule | Its codomain is too small to contain the sums a + b | It is a function, since a + b is always an integer | A rule on fractions must not depend on which representative is chosen.

## Functions and Mappings
S: Functions, also called mappings, can be one-to-one, onto or both. These properties decide whether a function has an inverse and are the tools for comparing sizes of sets and building structure-preserving maps.
O: Test functions for injectivity, surjectivity and bijectivity
O: Compose functions and find inverses
T: Injective function | f(a) = f(a′) implies a = a′: distinct inputs give distinct outputs
T: Surjective function | Every element of the codomain is f(a) for some a
H: Types
- Bijective: injective and surjective, so it has an inverse f^{−1}.
- f(x) = 2x + 1 on ℝ is bijective; x^{2} on ℝ is neither.
- x^{2} on [0, ∞) → [0, ∞) is bijective.
H: Composition
- (g ∘ f)(x) = g(f(x)); composition is associative but not commutative.
- Compositions of injections are injective; of surjections, surjective.
- If g ∘ f is injective then f is injective; if g ∘ f is surjective then g is surjective.
H: Counting and sizes
- Pigeonhole: no injection from a larger finite set into a smaller one.
- Injections from n to m elements: m!/(m − n)!.
- Bijections define equal cardinality, even for infinite sets.
X: Show f(x) = 3x − 5 is a bijection on ℝ and find its inverse.
> Injective: 3a − 5 = 3b − 5 gives a = b
> Surjective: for any y, x = (y + 5)/3 gives f(x) = y
> f^{−1}(y) = (y + 5)/3
- Images and preimages: f(S) = {f(x) : x ∈ S} and f^{−1}(T) = {x : f(x) ∈ T}.
K: Injective means no collisions, surjective means every output is hit, bijective means both and invertible; composition preserves these properties.
!: Assuming f ∘ g = g ∘ f.
Q: Is f(x) = eˣ from ℝ to ℝ surjective? | No: it never takes values ≤ 0.
Q: What is the inverse of a bijection f? | f^{−1}, with f^{−1}(f(x)) = x.
SUM: Injective, surjective, bijective.
SUM: Bijections have inverses.
SRC: Velleman DJ, How to Prove It: A Structured Approach (3rd edn, Cambridge University Press 2019) | textbook | 2019 | https://www.cambridge.org/
SRC: Rosen KH, Discrete Mathematics and Its Applications (8th edn, McGraw-Hill 2019) | textbook | 2019 | https://www.mheducation.com/
NUM1#maths-u16-12-q1@1: How many injective functions are there from a 3-element set to a 5-element set? | 60 | 0 |  | 5 × 4 × 3 = 60: each successive input must pick an output not already used.
M1#maths-u16-12-q2@1: Which function from ℝ to ℝ is injective but not surjective? | f(x) = eˣ | f(x) = x^{3} | f(x) = x^{2} | f(x) = sin x | f(x) = 2x + 1 | eˣ never repeats a value, but it misses every negative number and 0.
M2#maths-u16-12-q3@2: If g ∘ f is surjective, what can you conclude? | g is surjective | f is surjective | f is injective | g is injective | Both are bijections | Every output of g ∘ f is an output of g, so g must hit everything.

## Equivalence Relations
S: An equivalence relation is reflexive, symmetric and transitive: it says when two things count as "the same" for some purpose. Congruence mod n, similarity of triangles and having the same birthday are all equivalence relations.
O: Verify the three equivalence relation properties
O: Recognise equivalence relations in algebra and geometry
T: Equivalence relation | A relation that is reflexive, symmetric and transitive
T: Congruence modulo n | a ≡ b (mod n) when n divides a − b
H: Checking
- Reflexive: a ~ a. Symmetric: a ~ b ⇒ b ~ a. Transitive: a ~ b, b ~ c ⇒ a ~ c.
- Congruence mod n: n | 0; n | (a − b) ⇒ n | (b − a); sums of multiples of n are multiples of n.
- "Is within 1 of" on ℝ is reflexive and symmetric but not transitive.
H: Examples
- Equality, the finest equivalence relation.
- Similar triangles, isomorphic groups, homeomorphic spaces.
- Equal fractions: (a, b) ~ (c, d) iff ad = bc, used to build ℚ.
- Same remainder on division by n.
H: Why it matters
- Equivalence relations correspond exactly to partitions (see Equivalence Classes).
- Quotient constructions: ℤ/nℤ, quotient groups, quotient spaces.
- Classification problems ask for the classes of an equivalence relation.
X: Show a ~ b iff a − b is divisible by 3 is an equivalence relation on ℤ.
> Reflexive: a − a = 0 = 3 × 0
> Symmetric: a − b = 3k gives b − a = 3(−k)
> Transitive: a − b = 3k and b − c = 3m give a − c = 3(k + m)
K: Equivalence relations are reflexive, symmetric and transitive; congruence, similarity and equal fractions are examples; they underpin quotient constructions.
!: Treating "close to" relations as equivalences, though they fail transitivity.
Q: Is "has the same birthday as" an equivalence relation? | Yes: it's reflexive, symmetric and transitive.
Q: Which property does "is within 1 of" fail? | Transitivity.
SUM: Equivalence relations capture sameness.
SUM: They need three properties.
SRC: Velleman DJ, How to Prove It: A Structured Approach (3rd edn, Cambridge University Press 2019) | textbook | 2019 | https://www.cambridge.org/
SRC: Rosen KH, Discrete Mathematics and Its Applications (8th edn, McGraw-Hill 2019) | textbook | 2019 | https://www.mheducation.com/
NUM1#maths-u16-13-q1@1: How many equivalence classes does congruence modulo 7 have on ℤ? | 7 | 0 |  | The classes correspond to the remainders 0, 1, 2, 3, 4, 5 and 6 on division by 7.
M1#maths-u16-13-q2@1: Which relation on ℝ is an equivalence relation? | x ~ y iff x − y ∈ ℤ | x ~ y iff x ≤ y | x ~ y iff |x − y| < 1 | x ~ y iff xy > 0 | x ~ y iff x < y | Differences in ℤ are reflexive (0), symmetric (negation) and transitive (sums of integers).
M2#maths-u16-13-q3@2: Which property fails for "xy > 0" on ℝ? | Reflexivity, since 0 × 0 = 0 | Symmetry, since xy ≠ yx | Transitivity, for all non-zero numbers | None: it's an equivalence relation | Antisymmetry fails, so it's not one | 0 isn't related to itself, though on non-zero reals the relation is an equivalence.

## Equivalence Classes
S: An equivalence relation splits a set into disjoint equivalence classes, each containing elements that are equivalent to each other. Conversely every partition comes from an equivalence relation, and the set of classes is a new object, the quotient.
O: Find equivalence classes and the quotient set
O: Use the correspondence between equivalence relations and partitions
T: Equivalence class | [a] = {x : x ~ a}
T: Partition | A collection of non-empty, pairwise disjoint subsets whose union is the whole set
H: Key facts
- Every element lies in its own class, a ∈ [a].
- Two classes are either equal or disjoint: [a] = [b] iff a ~ b.
- The classes form a partition, and every partition defines an equivalence relation.
H: Quotients
- The quotient set A/~ is the set of classes.
- ℤ/3ℤ = {[0], [1], [2]}.
- ℚ is the set of classes of pairs (a, b) with b ≠ 0 under ad = bc.
- A circle is the quotient of [0, 1] with 0 ~ 1.
H: Counting partitions
- Bell numbers count partitions: 1, 1, 2, 5, 15, 52 for sets of size 0 to 5.
- So a 4-element set has 15 equivalence relations.
- Stirling numbers S(n, k) count partitions into exactly k classes.
X: On {1, 2, 3, 4, 5, 6}, let a ~ b iff a and b have the same remainder mod 3. List the classes.
> Remainder 0: {3, 6}
> Remainder 1: {1, 4}. Remainder 2: {2, 5}
> Three classes partition the set
K: Equivalence classes partition a set; classes are equal or disjoint; the quotient is the set of classes; Bell numbers count equivalence relations.
!: Thinking two different classes can overlap.
Q: Can two different equivalence classes share an element? | No.
Q: How many equivalence relations are there on a 3-element set? | 5.
SUM: Classes partition the set.
SUM: Quotients collect the classes.
SRC: Velleman DJ, How to Prove It: A Structured Approach (3rd edn, Cambridge University Press 2019) | textbook | 2019 | https://www.cambridge.org/
SRC: Graham RL, Knuth DE, Patashnik O, Concrete Mathematics (2nd edn, Addison-Wesley 1994) | textbook | 1994 | https://www-cs-faculty.stanford.edu/~knuth/gkp.html
NUM1#maths-u16-14-q1@1: How many equivalence relations are there on a 4-element set? | 15 | 0 |  | They correspond to partitions of the set, counted by the Bell number B₄ = 15.
M1#maths-u16-14-q2@1: Under congruence mod 4 on ℤ, which set is the class [3]? | {…, −5, −1, 3, 7, 11, …} | {…, −3, 0, 3, 6, 9, …} | {3} only | {0, 1, 2, 3} | {…, −4, 0, 4, 8, …} | [3] contains integers leaving remainder 3 on division by 4, including −1 and −5.
M3#maths-u16-14-q3@2: Why must two equivalence classes be either equal or disjoint? | A shared element would make every member of one equivalent to every member of the other, by symmetry and transitivity | Equivalence classes are always singletons, so they can never share an element | Equivalence relations aren't transitive, so overlapping classes are ruled out by definition | Classes never contain their own representatives, so two classes have nothing in common | They needn't be: two classes can overlap in some elements and differ in others | If c ∈ [a] ∩ [b], then a ~ c ~ b, so a ~ b and [a] = [b].

## Partial Orders
S: A partial order is a reflexive, antisymmetric and transitive relation, capturing "comes before" when not every pair needs to be comparable. Subsets under inclusion and integers under divisibility are partial orders, and they model dependencies and hierarchies.
O: Verify the partial order properties
O: Identify comparable and incomparable elements and draw Hasse diagrams
T: Partial order | A reflexive, antisymmetric and transitive relation ≤
T: Hasse diagram | A drawing of a partial order showing only covering relations, with larger elements higher
H: Examples
- ≤ on ℝ (also total).
- ⊆ on P(A): {1} and {2} are incomparable.
- Divisibility on positive integers: 2 and 3 are incomparable.
- Prerequisites among university modules.
H: Hasse diagrams
- Draw an edge from x up to y when y covers x (x < y with nothing between).
- Omit loops and edges implied by transitivity.
- Divisors of 12: 1 at the bottom; 2, 3; then 4, 6; then 12.
H: Uses
- Topological sorting gives a total order compatible with a partial order (scheduling tasks).
- Strict partial orders (<) are irreflexive and transitive.
- Dilworth's theorem relates chains and antichains.
X: Find the covering pairs of divisibility on {1, 2, 3, 6}.
> 1 is covered by 2 and by 3 (nothing strictly between)
> 2 and 3 are each covered by 6
> 1 | 6 isn't a covering pair, since 2 lies between: the Hasse diagram is a diamond
K: Partial orders are reflexive, antisymmetric and transitive; not every pair need be comparable; Hasse diagrams show covering relations; topological sorting extends them to total orders.
!: Drawing transitive edges in a Hasse diagram, which should show only covers.
Q: Are {1} and {2} comparable under ⊆? | No.
Q: Is divisibility on ℤ (including negatives) antisymmetric? | No: 2 | −2 and −2 | 2.
SUM: Partial orders allow incomparability.
SUM: Hasse diagrams draw them.
SRC: Davey BA, Priestley HA, Introduction to Lattices and Order (2nd edn, Cambridge University Press 2002) | textbook | 2002 | https://www.cambridge.org/
SRC: Rosen KH, Discrete Mathematics and Its Applications (8th edn, McGraw-Hill 2019) | textbook | 2019 | https://www.mheducation.com/
NUM1#maths-u16-15-q1@1: How many edges does the Hasse diagram of divisibility on the divisors of 12 have? | 7 | 0 |  | Covers: 1–2, 1–3, 2–4, 2–6, 3–6, 4–12 and 6–12, which is seven edges.
M1#maths-u16-15-q2@1: Which relation is a partial order? | ⊆ on the subsets of a set | < on the real numbers | "is a sibling of" on people | Congruence mod 5 on ℤ | "is within 1 of" on ℝ | Inclusion is reflexive, antisymmetric and transitive, the three defining properties.
M2#maths-u16-15-q3@2: What does a topological sort of a partial order produce? | A total order listing every element after everything below it | A partition of the set into disjoint equivalence classes | A Hasse diagram with all the transitive edges added back | An equivalence relation identifying comparable elements | A list of the pairs of elements that are incomparable | It linearly orders the elements consistently with the partial order, as in task scheduling.

## Partially Ordered Sets
S: A partially ordered set, or poset, is a set together with a partial order. Posets have special elements such as maxima, minima, upper bounds and least upper bounds, and their chains and antichains measure how ordered they are.
O: Find maximal, minimal, greatest and least elements and bounds
O: Use chains, antichains and Zorn's lemma
T: Maximal element | An element m with no element strictly above it
T: Least upper bound | A supremum: an upper bound below every other upper bound
H: Special elements
- Greatest element: above everything. Maximal: nothing above it. A poset can have several maximal elements but at most one greatest.
- In {2, 3, 4, 6} under divisibility, 4 and 6 are maximal, and there's no greatest element.
- Upper bounds of a subset; the supremum if there's a least one.
H: Chains and antichains
- A chain is a totally ordered subset; an antichain has no two comparable elements.
- Dilworth: the minimum number of chains covering a finite poset equals its largest antichain size.
- Sperner: the largest antichain in P({1, …, n}) has size C(n, ⌊n/2⌋).
H: Zorn's lemma
- If every chain in a non-empty poset has an upper bound, a maximal element exists.
- It's equivalent to the axiom of choice.
- Uses: every vector space has a basis; every ring with 1 has a maximal ideal.
X: In the poset {1, 2, 3, 4, 5, 6} under divisibility, find the maximal and minimal elements.
> Minimal: 1 divides everything, so it's the least element and the only minimal one
> Maximal: 4, 5 and 6 divide nothing else in the set
> No greatest element exists, since 4, 5 and 6 are incomparable
K: Posets have maximal, minimal, greatest and least elements and bounds; chains and antichains measure order; Zorn's lemma guarantees maximal elements.
!: Equating maximal with greatest.
Q: Can a poset have two maximal elements? | Yes.
Q: What is the largest antichain in P({1, 2, 3, 4})? | Size C(4, 2) = 6.
SUM: Posets have bounds and extremes.
SUM: Zorn's lemma finds maximal elements.
SRC: Davey BA, Priestley HA, Introduction to Lattices and Order (2nd edn, Cambridge University Press 2002) | textbook | 2002 | https://www.cambridge.org/
SRC: Trotter WT, Combinatorics and Partially Ordered Sets: Dimension Theory (Johns Hopkins University Press 1992) | textbook | 1992 | https://www.press.jhu.edu/
NUM1#maths-u16-16-q1@1: What is the size of the largest antichain in P({1, 2, 3, 4, 5}) ordered by inclusion? | 10 | 0 |  | By Sperner's theorem it's C(5, 2) = 10, achieved by all 2-element subsets.
M1#maths-u16-16-q2@1: In {2, 3, 4, 6, 12} under divisibility, which element is greatest? | 12 | 6 | 4 | 2 | There is none | Every other element divides 12, so 12 lies above all of them.
M3#maths-u16-16-q3@2: Why is Zorn's lemma needed to show every vector space has a basis? | Infinite spaces may have no step-by-step construction, but chains of independent sets have upper bounds, giving a maximal one | Every vector space is finite-dimensional, so a basis can always be built one vector at a time | Bases never exist without Zorn, even in ℝ^{2}, since spanning sets need choice to shrink | Zorn's lemma computes the basis explicitly, giving a formula for each basis vector | It isn't needed: every vector space has a countable basis found by Gram–Schmidt | A maximal linearly independent set is a basis, and Zorn guarantees one exists.

## Totally Ordered Sets
S: A total order is a partial order where every two elements are comparable. The integers, rationals and reals are totally ordered, and well-orders, in which every non-empty subset has a least element, underpin induction and the theory of ordinals.
O: Distinguish total orders, dense orders and well-orders
O: Use lexicographic order and least-element arguments
T: Total order | A partial order in which any a, b satisfy a ≤ b or b ≤ a
T: Well-order | A total order in which every non-empty subset has a least element
H: Examples
- ℕ, ℤ, ℚ, ℝ under ≤ are total.
- ℕ is well-ordered; ℤ isn't (no least element); nor is (0, 1).
- Lexicographic (dictionary) order on words or pairs is total.
H: Density and completeness
- Dense: between any two elements lies another (ℚ, ℝ; not ℤ).
- Cantor: every countable dense total order without endpoints is isomorphic to ℚ.
- ℝ is the completion of ℚ: every bounded set has a supremum.
H: Well-ordering
- The well-ordering principle for ℕ is equivalent to induction.
- The well-ordering theorem (every set can be well-ordered) is equivalent to the axiom of choice.
- Well-orders are classified by ordinals.
X: Order the pairs (2, 1), (1, 3), (2, 0) and (1, 2) lexicographically.
> Compare first entries: those starting with 1 come first
> Among them (1, 2) < (1, 3); among those starting with 2, (2, 0) < (2, 1)
> Order: (1, 2), (1, 3), (2, 0), (2, 1)
K: Total orders make all pairs comparable; ℚ and ℝ are dense; well-orders have least elements in every non-empty subset; well-ordering of ℕ is induction.
!: Thinking every total order is a well-order (ℤ and ℝ aren't).
Q: Is ℤ well-ordered by ≤? | No.
Q: Is ℚ dense? | Yes.
SUM: Total orders compare everything.
SUM: Well-orders have least elements.
SRC: Davey BA, Priestley HA, Introduction to Lattices and Order (2nd edn, Cambridge University Press 2002) | textbook | 2002 | https://www.cambridge.org/
SRC: Enderton HB, Elements of Set Theory (Academic Press 1977) | textbook | 1977 | https://www.elsevier.com/
NUM1#maths-u16-17-q1@1: In lexicographic order on two-letter strings from {a, b, c}, what position (counting from 1) does "ca" hold? | 7 | 0 |  | The aa–ac block has 3 strings and ba–bc another 3, so "ca" is the 7th string.
M1#maths-u16-17-q2@1: Which set is well-ordered by its usual order? | ℕ = {0, 1, 2, …} | ℤ, all the integers | ℚ ∩ [0, 1] | (0, 1) | The negative integers | Every non-empty set of natural numbers has a least element.
M2#maths-u16-17-q3@2: Which order is dense? | ℚ under ≤ | ℤ under ≤ | ℕ under ≤ | {0, 1} under ≤ | Words of length 1 in dictionary order | Between rationals a < b lies (a + b)/2, so ℚ is dense; the others have gaps.

## Lattices
S: A lattice is a poset in which every pair of elements has a least upper bound (join) and a greatest lower bound (meet). Subsets, divisors and subgroups form lattices, and lattice theory gives a common framework for order and algebra.
O: Compute joins and meets in standard lattices
O: Recognise distributive and modular lattices
T: Join | a ∨ b, the least upper bound of a and b
T: Meet | a ∧ b, the greatest lower bound of a and b
H: Examples
- P(A) under ⊆: join ∪, meet ∩.
- Positive integers under divisibility: join lcm, meet gcd.
- Subgroups of a group: meet is intersection; join is the subgroup generated.
- ℝ under ≤: join max, meet min.
H: Laws
- Commutative, associative, idempotent and absorption: a ∨ (a ∧ b) = a.
- Distributive lattices also satisfy a ∧ (b ∨ c) = (a ∧ b) ∨ (a ∧ c).
- Non-distributive examples: the diamond M₃ and the pentagon N₅.
H: Completeness and fixed points
- Complete lattices have joins and meets of all subsets.
- Knaster–Tarski: every order-preserving map on a complete lattice has a fixed point.
- Used in program analysis and the semantics of recursion.
X: In the divisibility lattice, find 12 ∨ 18 and 12 ∧ 18.
> Join = lcm(12, 18) = 36
> Meet = gcd(12, 18) = 6
> Check: 6 | 12, 6 | 18, and 12 | 36, 18 | 36 ✓
K: Lattices have joins and meets for every pair; examples are subsets, divisors and subgroups; distributive lattices satisfy distributive laws; Knaster–Tarski gives fixed points.
!: Assuming every lattice is distributive.
Q: What is the meet in the divisibility lattice? | gcd.
Q: Which theorem gives fixed points on complete lattices? | Knaster–Tarski.
SUM: Lattices have joins and meets.
SUM: Many structures form lattices.
SRC: Davey BA, Priestley HA, Introduction to Lattices and Order (2nd edn, Cambridge University Press 2002) | textbook | 2002 | https://www.cambridge.org/
SRC: Birkhoff G, Lattice Theory (3rd edn, American Mathematical Society 1967) | textbook | 1967 | https://bookstore.ams.org/
NUM1#maths-u16-18-q1@1: In the divisibility lattice, find 8 ∨ 12. | 24 | 0 |  | The join is the least common multiple, and lcm(8, 12) = 24.
M1#maths-u16-18-q2@1: What are join and meet in the lattice P(A) ordered by ⊆? | Union and intersection | Intersection and union | Product and sum | Complement and difference | Maximum and minimum | A ∪ B is the smallest set containing both, and A ∩ B is the largest set inside both.
M3#maths-u16-18-q3@2: Why is the pentagon lattice N₅ important? | A lattice is modular exactly when it contains no copy of N₅, so N₅ is the model failure | It is the only distributive lattice with five elements | It has no meets at all, so it isn't even a lattice | It is a Boolean lattice, the smallest with a complement | Every lattice is a copy of it, so it's the only example | Dedekind's criterion: non-modularity always shows up as a pentagon sublattice.

## Boolean Lattices
S: A Boolean lattice is a distributive lattice with a least and greatest element in which every element has a complement. Power sets are the model example, and Boolean algebras describe logic gates, digital circuits and propositional logic.
O: Identify Boolean lattices and their operations
O: Connect Boolean algebra to logic and circuits
T: Boolean algebra | A complemented distributive lattice with 0 and 1
T: Complement in a lattice | An element a′ with a ∨ a′ = 1 and a ∧ a′ = 0
H: Examples
- P(A) with ∪, ∩, complement, ∅ and A.
- Truth values {0, 1} with OR, AND, NOT.
- Divisors of a square-free number such as 30 under lcm and gcd.
H: Structure
- Every finite Boolean algebra is isomorphic to a power set, so it has 2ⁿ elements.
- De Morgan's laws hold: (a ∨ b)′ = a′ ∧ b′.
- Stone's representation theorem: every Boolean algebra is a field of sets.
H: Applications
- Logic gate design: AND, OR, NOT, and NAND alone is universal.
- Simplifying circuits with Karnaugh maps.
- Search queries and database filters.
X: Show the divisors of 30 form a Boolean lattice, and find the complement of 6.
> Divisors: 1, 2, 3, 5, 6, 10, 15, 30, eight elements matching P({2, 3, 5})
> The complement of 6 must satisfy lcm(6, x) = 30 and gcd(6, x) = 1
> x = 5, matching the complement of {2, 3} in {2, 3, 5}
K: Boolean lattices are complemented distributive lattices; finite ones are power sets of size 2ⁿ; they model logic gates and propositional logic.
!: Expecting divisors of a non-square-free number like 12 to form a Boolean lattice.
Q: How many elements can a finite Boolean algebra have? | A power of 2.
Q: Which single gate can build every Boolean function? | NAND (or NOR).
SUM: Boolean lattices model logic.
SUM: Finite ones are power sets.
SRC: Givant S, Halmos P, Introduction to Boolean Algebras (Springer 2009) | textbook | 2009 | https://link.springer.com/
SRC: Davey BA, Priestley HA, Introduction to Lattices and Order (2nd edn, Cambridge University Press 2002) | textbook | 2002 | https://www.cambridge.org/
NUM1#maths-u16-19-q1@1: How many elements does the Boolean lattice of divisors of 210 = 2 × 3 × 5 × 7 have? | 16 | 0 |  | 210 has four distinct prime factors, so its divisors match P of a 4-element set: 2^{4} = 16.
M1#maths-u16-19-q2@1: In the divisor lattice of 30, what is the complement of 2? | 15 | 3 | 5 | 30 | 1 | lcm(2, 15) = 30 and gcd(2, 15) = 1, so 15 is the complement.
M2#maths-u16-19-q3@2: Why don't the divisors of 12 form a Boolean lattice? | 2 has no complement: no x gives lcm(2, x) = 12 and gcd(2, x) = 1 | 12 has too few divisors to form any lattice at all | Divisibility isn't a partial order on the divisors of 12 | It has six elements, and no lattice can have six elements | They do form one, with lcm as join and gcd as meet | Only 3 is coprime to 2 among the divisors, and lcm(2, 3) = 6 ≠ 12.

## Mathematical Logic
S: Mathematical logic studies reasoning itself with mathematical precision. It defines formal languages, rules of proof and meanings, and asks what can be proved, what is true and how the two relate, results that also shaped computer science.
O: Describe the main branches of mathematical logic
O: Distinguish syntax (proof) from semantics (truth)
T: Syntax | The formal symbols, formulas and proof rules of a logical system, independent of meaning
T: Semantics | The meaning of formulas: when they are true in a structure or under an assignment
H: Branches
- Set theory: the foundations of mathematical objects.
- Model theory: structures where formulas are true.
- Proof theory: the structure of proofs themselves.
- Computability theory: what algorithms can and can't do.
H: Proof and truth
- ⊢ φ: φ is provable. ⊨ φ: φ is true in every model.
- Soundness: provable ⇒ true. Completeness: true ⇒ provable.
- First-order logic is both (Gödel 1929); arithmetic can't be completely axiomatised (Gödel 1931).
H: Influence
- Turing machines and the theory of computation grew from logic.
- Type systems, program verification and proof assistants (Lean, Coq).
- Databases use first-order logic as their query language (SQL's core).
X: Classify each as syntax or semantics: (a) a derivation of p → p using proof rules, (b) checking p ∨ ¬p is true in every row of a truth table.
> (a) uses only rules on symbols: syntax (⊢)
> (b) uses meanings (truth values): semantics (⊨)
> Soundness and completeness say both approaches agree for propositional logic
K: Mathematical logic covers set theory, model theory, proof theory and computability; it separates provability (⊢) from truth (⊨); soundness and completeness link them.
!: Assuming every true statement must be provable in any given system.
Q: What does soundness say? | Everything provable is true.
Q: Who proved the completeness theorem for first-order logic? | Kurt Gödel (1929).
SUM: Logic studies reasoning mathematically.
SUM: Proof and truth are linked by soundness and completeness.
SRC: Enderton HB, A Mathematical Introduction to Logic (2nd edn, Academic Press 2001) | textbook | 2001 | https://www.elsevier.com/
SRC: Mendelson E, Introduction to Mathematical Logic (6th edn, CRC Press 2015) | textbook | 2015 | https://www.routledge.com/
NUM1#maths-u16-20-q1@1: In what year did Gödel publish his incompleteness theorems? | 1931 | 0 |  | Gödel's paper "Über formal unentscheidbare Sätze" appeared in 1931, two years after his completeness theorem.
M1#maths-u16-20-q2@1: What does the completeness theorem for first-order logic say? | Every logically valid formula is provable | Every arithmetic truth is provable | Every formula is true | No formula is provable | Proofs are always short | Gödel showed that semantic validity (⊨) implies syntactic provability (⊢) in first-order logic.
M2#maths-u16-20-q3@2: Which branch of logic studies what algorithms can compute? | Computability theory | Model theory | Proof theory | Modal logic | Fuzzy logic | Computability theory, founded by Turing, Church and Gödel, studies decidable and undecidable problems.

## Propositional Logic
S: Propositional logic studies statements that are true or false, combined with connectives such as "and", "or", "not" and "implies". Truth tables decide validity mechanically, and the same logic runs inside every digital circuit.
O: Build truth tables and test for tautologies and equivalence
O: Convert formulas to conjunctive and disjunctive normal form
T: Tautology | A formula true under every assignment of truth values, such as p ∨ ¬p
T: Logical equivalence | φ ≡ ψ when φ and ψ have the same truth value under every assignment
H: Connectives
- ¬p, p ∧ q, p ∨ q (inclusive), p → q (false only when p is true and q false), p ↔ q.
- p → q ≡ ¬p ∨ q ≡ ¬q → ¬p (contrapositive).
- The converse q → p is not equivalent to p → q.
H: Laws
- De Morgan: ¬(p ∧ q) ≡ ¬p ∨ ¬q.
- Distributive, double negation, absorption laws.
- {¬, ∧} and {NAND} are each functionally complete.
H: Normal forms and satisfiability
- CNF: an AND of ORs; DNF: an OR of ANDs.
- SAT asks whether a formula can be made true; it's NP-complete (Cook–Levin).
- SAT solvers handle millions of variables in chip verification and scheduling.
X: Show (p → q) ∧ p → q is a tautology.
> The formula can only be false if q is false and (p → q) ∧ p is true
> Then p is true, and p → q forces q true: contradiction
> So it is never false: a tautology (modus ponens)
K: Propositional logic combines true/false statements with connectives; truth tables decide tautology and equivalence; formulas have CNF and DNF; SAT is NP-complete.
!: Confusing p → q with its converse q → p.
Q: When is p → q false? | Only when p is true and q is false.
Q: What is the contrapositive of p → q? | ¬q → ¬p.
SUM: Propositions combine by connectives.
SUM: Truth tables decide validity.
SRC: Enderton HB, A Mathematical Introduction to Logic (2nd edn, Academic Press 2001) | textbook | 2001 | https://www.elsevier.com/
SRC: Huth M, Ryan M, Logic in Computer Science (2nd edn, Cambridge University Press 2004) | textbook | 2004 | https://www.cambridge.org/
NUM1#maths-u16-21-q1@1: How many rows does a truth table for a formula with 5 variables have? | 32 | 0 |  | Each variable is true or false independently, giving 2^{5} = 32 assignments.
M1#maths-u16-21-q2@1: Which formula is equivalent to p → q? | ¬p ∨ q | p ∨ ¬q | q → p | ¬p → ¬q | p ∧ ¬q | p → q fails only when p is true and q false, which is exactly when ¬p ∨ q fails.
M2#maths-u16-21-q3@2: Which formula is a tautology? | (p ∧ q) → p | p → (p ∧ q) | p ∨ q | p → ¬p | (p ∨ q) → p | Whenever p ∧ q is true, p is true, so the implication can never be false.

## Predicate Logic
S: Predicate logic adds variables, predicates and the quantifiers "for all" (∀) and "there exists" (∃) to propositional logic. It can express statements such as "every number has a larger prime", and getting quantifier order right is essential in mathematics.
O: Translate statements into predicate logic with quantifiers
O: Negate quantified statements correctly
T: Universal quantifier | ∀x P(x): P(x) holds for every x in the domain
T: Existential quantifier | ∃x P(x): P(x) holds for at least one x in the domain
H: Translating
- "Every student passed": ∀x (S(x) → P(x)).
- "Some student passed": ∃x (S(x) ∧ P(x)).
- Note → with ∀ and ∧ with ∃.
H: Negation
- ¬∀x P(x) ≡ ∃x ¬P(x); ¬∃x P(x) ≡ ∀x ¬P(x).
- Push negations inward, flipping each quantifier.
- Negating continuity: ∃ε > 0 ∀δ > 0 ∃x (|x − a| < δ and |f(x) − f(a)| ≥ ε).
H: Quantifier order
- ∀x ∃y (y > x) is true in ℕ: every number has a bigger one.
- ∃y ∀x (y > x) is false: no number exceeds them all.
- Same-type quantifiers commute; mixed ones generally don't.
X: Negate "every even number greater than 2 is a sum of two primes".
> Original: ∀n (E(n) ∧ n > 2 → ∃p ∃q (P(p) ∧ P(q) ∧ n = p + q))
> Negation: ∃n (E(n) ∧ n > 2 ∧ ∀p ∀q ¬(P(p) ∧ P(q) ∧ n = p + q))
> "Some even number greater than 2 is not a sum of two primes" (a counterexample to Goldbach)
K: Predicate logic uses predicates, variables and quantifiers; negation flips ∀ and ∃; quantifier order changes meaning; ∀ pairs with → and ∃ with ∧.
!: Translating "some S are P" as ∃x (S(x) → P(x)), which is true whenever something isn't S.
Q: What is ¬∃x P(x) equivalent to? | ∀x ¬P(x).
Q: Is ∃y ∀x (y > x) true in ℕ? | No.
SUM: Quantifiers express generality.
SUM: Order and negation need care.
SRC: Velleman DJ, How to Prove It: A Structured Approach (3rd edn, Cambridge University Press 2019) | textbook | 2019 | https://www.cambridge.org/
SRC: Enderton HB, A Mathematical Introduction to Logic (2nd edn, Academic Press 2001) | textbook | 2001 | https://www.elsevier.com/
NUM1#maths-u16-22-q1@1: On the domain {1, 2, 3, 4}, how many values of x satisfy ∃y (y > x)? | 3 | 0 |  | x = 1, 2 and 3 each have a larger element in the domain; x = 4 has none.
M1#maths-u16-22-q2@1: Which formula negates "for every x there is some y with P(x, y)"? | ∃x ∀y ¬P(x, y) | ∀x ∃y ¬P(x, y) | ∃x ∃y ¬P(x, y) | ∀x ∀y P(x, y) | ∃y ∀x ¬P(x, y) | Each quantifier flips as the negation passes it, and P is negated at the end.
M3#maths-u16-22-q3@2: Why is ∃x (S(x) → P(x)) a poor translation of "some student passed"? | It is true as soon as anything isn't a student, even if no student passed | It is false whenever a student passed, so it never fits | It means every student passed, which is far too strong | It uses the wrong variable, since x should be y here | It is a correct translation of the sentence | An implication with a false premise is true, so any non-student makes the formula true.

## First-Order Logic
S: First-order logic is predicate logic in which quantifiers range over individual objects, with a precise syntax, proof system and semantics. It's the standard logic of mathematics, and Gödel proved it complete, but it has limits on what it can pin down.
O: Describe the syntax and semantics of first-order logic
O: State completeness, compactness and Löwenheim–Skolem
T: First-order language | Constants, function and relation symbols, variables, connectives, quantifiers over elements and equality
T: Compactness theorem | A set of first-order sentences has a model if every finite subset has one
H: Syntax and semantics
- Terms (like x + 1) name objects; formulas state facts about them.
- A structure gives a domain and interprets the symbols; formulas are true or false in it.
- Theories: groups, ordered fields, Peano arithmetic, ZFC.
H: Metatheorems
- Completeness (Gödel 1929): every valid sentence is provable.
- Compactness: consistency of all finite parts implies consistency of the whole.
- Löwenheim–Skolem: a theory with an infinite model has models of every infinite size.
H: Limits
- "The domain is finite" can't be expressed by any set of first-order sentences.
- Non-standard models of arithmetic exist, containing infinite "numbers".
- Validity is semi-decidable but not decidable (Church, Turing 1936).
X: Use compactness to show there's a model of arithmetic with an element larger than every standard number.
> Add a constant c and sentences c > 0, c > 1, c > 2, …
> Any finite subset is satisfied in ℕ by choosing c large enough
> By compactness the whole set has a model, where c exceeds every standard natural number
K: First-order logic quantifies over elements; it's complete and compact; Löwenheim–Skolem gives models of every infinite size; finiteness and ℕ can't be pinned down exactly.
!: Thinking first-order axioms for arithmetic describe only ℕ.
Q: Is validity in first-order logic decidable? | No.
Q: What does compactness say? | If every finite subset of a theory has a model, the theory has a model.
SUM: First-order logic is mathematics' standard logic.
SUM: It is complete but can't fix sizes.
SRC: Enderton HB, A Mathematical Introduction to Logic (2nd edn, Academic Press 2001) | textbook | 2001 | https://www.elsevier.com/
SRC: Ebbinghaus HD, Flum J, Thomas W, Mathematical Logic (3rd edn, Springer 2021) | textbook | 2021 | https://link.springer.com/
NUM1#maths-u16-23-q1@1: In the compactness argument, a finite subset contains c > 0, c > 1, …, c > 99. What is the smallest natural value of c that satisfies it in ℕ? | 100 | 0 |  | c must exceed 99, so c = 100 is the least choice that works in the standard model.
M1#maths-u16-23-q2@1: Which property can't be expressed by a set of first-order sentences? | The domain is finite | The domain has at least 3 elements | The relation is transitive | There is a least element | The operation is commutative | By compactness, any theory with arbitrarily large finite models also has an infinite model.
M2#maths-u16-23-q3@2: What does the Löwenheim–Skolem theorem imply about ZFC? | If consistent, it has a countable model, though it proves uncountable sets exist | It has exactly one model, the true universe of all sets | It has no models at all, since it proves uncountable sets | All its models are finite, as every proof is finite | It decides every statement, including the continuum hypothesis | Skolem's paradox: "uncountable" inside a model needn't mean uncountable from outside.

## Higher-Order Logic
S: Higher-order logic lets quantifiers range over properties, sets and functions, not just individual objects. It's more expressive than first-order logic and can describe ℕ exactly, but with standard semantics it loses completeness and compactness.
O: Contrast first-order and second-order quantification
O: Explain the trade-off between expressiveness and good proof theory
T: Second-order logic | Logic with quantifiers over properties or sets of individuals, such as ∀P
T: Henkin semantics | An interpretation of higher-order logic where quantifiers range over a chosen collection of sets, restoring completeness
H: Expressiveness
- Second-order induction: ∀P [(P(0) ∧ ∀n (P(n) → P(n + 1))) → ∀n P(n)].
- With it, Peano arithmetic has only one model up to isomorphism: ℕ.
- Finiteness and the completeness of ℝ can be expressed.
H: The cost
- With full semantics, there's no complete, effective proof system.
- Compactness and Löwenheim–Skolem fail.
- Questions of set theory (like the continuum hypothesis) get built into the logic.
H: Uses
- Higher-order logic underlies proof assistants such as Isabelle/HOL and HOL Light.
- Type theory is a form of higher-order logic (see Type Theory).
- Henkin semantics treats it like a many-sorted first-order logic.
X: Express "x and y have exactly the same properties" in second-order logic.
> Quantify over properties P
> ∀P (P(x) ↔ P(y))
> Leibniz's identity of indiscernibles: this defines x = y
K: Higher-order logic quantifies over properties and sets; it can characterise ℕ uniquely; with full semantics it lacks completeness and compactness; HOL powers proof assistants.
!: Assuming more expressive power always comes with better proof theory.
Q: Does second-order Peano arithmetic have non-standard models (full semantics)? | No: it's categorical.
Q: Is full second-order logic complete? | No.
SUM: Higher-order logic is more expressive.
SUM: It sacrifices completeness.
SRC: Shapiro S, Foundations without Foundationalism: A Case for Second-Order Logic (Oxford University Press 1991) | textbook | 1991 | https://global.oup.com/
SRC: Väänänen J, Second-order and higher-order logic, Stanford Encyclopedia of Philosophy | review | 2024 | https://plato.stanford.edu/entries/logic-higher-order/
NUM1#maths-u16-24-q1@1: How many models up to isomorphism does second-order Peano arithmetic have under full semantics? | 1 | 0 |  | Dedekind's categoricity theorem shows every full model is isomorphic to ℕ.
M1#maths-u16-24-q2@1: What does second-order logic allow quantifiers to range over? | Properties and sets of individuals | Only individual objects | Only truth values | Only natural numbers | Only finite sets | Second-order quantifiers like ∀P range over properties, not only elements.
M3#maths-u16-24-q3@2: Why can't full second-order logic have a complete, effective proof system? | Its validities include truths of arithmetic that, by Gödel, no effective system can capture | It has no formulas at all, so there's nothing for a proof system to derive | Every formula is valid, so no proof system could ever be sound for it | It is weaker than first-order logic, so it can't express arithmetic at all | It does have one: Henkin's proof system is complete for full semantics | Categorical arithmetic makes second-order validity at least as hard as full arithmetic truth.

## Modal Logic
S: Modal logic adds operators for "necessarily" (□) and "possibly" (◇). Interpreted over possible worlds, it models knowledge, obligation, provability and computation, and different axioms give different systems suited to each use.
O: Interpret □ and ◇ in Kripke possible-worlds models
O: Match modal axioms to properties of the accessibility relation
T: Kripke model | Possible worlds, an accessibility relation between them, and truth values at each world
T: Necessity | □p is true at a world w when p is true at every world accessible from w
H: Semantics
- ◇p ≡ ¬□¬p: p holds at some accessible world.
- □ is like ∀ over accessible worlds; ◇ is like ∃.
- The basic system K: □(p → q) → (□p → □q).
H: Axioms and frames
- T: □p → p, valid when access is reflexive.
- 4: □p → □□p, valid when access is transitive.
- S5 (equivalence relation): every world sees every other in its class.
- Epistemic logic (knowledge) often uses S5; provability logic uses GL.
H: Applications
- Epistemic logic: what agents know.
- Deontic logic: obligation and permission.
- Temporal logic and program verification (see Temporal Logic).
X: In a model with worlds w₁, w₂, w₃, w₁ sees w₂ and w₃; p is true at w₂ but false at w₃. Evaluate □p and ◇p at w₁.
> □p needs p at every accessible world: false at w₃, so □p is false
> ◇p needs p at some accessible world: true at w₂
> So at w₁: □p false, ◇p true
K: □ means true at all accessible worlds, ◇ at some; axioms like T and 4 match reflexive and transitive frames; modal logic models knowledge, duty and time.
!: Thinking □p → p holds in every modal system (it needs reflexive frames).
Q: How is ◇p defined from □? | ¬□¬p.
Q: Which frame property validates axiom 4? | Transitivity.
SUM: Modal logic reasons about necessity.
SUM: Frames determine valid axioms.
SRC: Blackburn P, de Rijke M, Venema Y, Modal Logic (Cambridge University Press 2001) | textbook | 2001 | https://www.cambridge.org/
SRC: Kripke SA, Semantical considerations on modal logic, Acta Philosophica Fennica 16, 83 | journal | 1963 | https://philpapers.org/
NUM1#maths-u16-25-q1@1: A world w sees 4 worlds, and p is true at 3 of them. At how many of those 4 worlds must p be true for □p to hold at w? | 4 | 0 |  | □p requires p at every accessible world, so all 4 must make p true; here □p fails.
M1#maths-u16-25-q2@1: Which axiom corresponds to a reflexive accessibility relation? | □p → p | □p → □□p | ◇p → □◇p | □(p → q) → (□p → □q) | p → □p | If each world sees itself, whatever is necessary at w is true at w.
M2#maths-u16-25-q3@2: Which modal system is commonly used for knowledge, where access is an equivalence relation? | S5 | K | GL | T only | No modal system | S5 frames are reflexive, symmetric and transitive, matching ideal knowledge.

## Intuitionistic Logic
S: Intuitionistic logic treats a statement as true only when it has a proof or construction. It rejects the law of excluded middle as a general principle, so proofs of existence must produce the object, and it matches the logic of computer programs.
O: Explain which classical principles intuitionistic logic rejects
O: Interpret logical connectives by the BHK interpretation
T: Law of excluded middle | p ∨ ¬p for every p, rejected as a general law in intuitionistic logic
T: BHK interpretation | Brouwer–Heyting–Kolmogorov: a proof of p → q is a method turning proofs of p into proofs of q
H: What changes
- Not valid: p ∨ ¬p, ¬¬p → p, ¬∀x P(x) → ∃x ¬P(x).
- Still valid: p → ¬¬p, ¬(p ∨ q) ↔ (¬p ∧ ¬q).
- A proof of ∃x P(x) must provide a specific x.
H: BHK meanings
- p ∧ q: a pair of proofs. p ∨ q: a proof of one, with a tag saying which.
- ¬p: a method turning any proof of p into a contradiction.
- Curry–Howard: proofs are programs and propositions are types.
H: Example of the difference
- Classical: some irrationals a, b have aᵇ rational: if √2^{√2} is rational take a = b = √2, else take a = √2^{√2}, b = √2.
- This doesn't say which case holds, so it isn't intuitionistically acceptable as it stands.
- (In fact √2^{√2} is irrational, by the Gelfond–Schneider theorem.)
X: Show p → ¬¬p holds intuitionistically.
> ¬¬p means: any proof of ¬p gives a contradiction
> Given a proof of p and a proof of ¬p (a map from proofs of p to contradiction), apply the second to the first
> That gives a contradiction, so from p we obtain ¬¬p; the converse needs excluded middle
K: Intuitionistic logic needs constructions; it rejects excluded middle and double-negation elimination; BHK reads connectives as constructions; Curry–Howard links it to programs.
!: Thinking intuitionists assert ¬(p ∨ ¬p) (they only decline to assert p ∨ ¬p in general).
Q: Is ¬¬p → p intuitionistically valid? | No.
Q: What does a constructive proof of ∃x P(x) provide? | A specific x with a proof of P(x).
SUM: Intuitionistic truth is provability.
SUM: Excluded middle isn't assumed.
SRC: Troelstra AS, van Dalen D, Constructivism in Mathematics (North-Holland 1988) | textbook | 1988 | https://www.elsevier.com/
SRC: Moschovakis J, Intuitionistic logic, Stanford Encyclopedia of Philosophy | review | 2023 | https://plato.stanford.edu/entries/logic-intuitionistic/
NUM1#maths-u16-26-q1@1: In the classical proof about aᵇ, the second case uses (√2^{√2})^{√2}. What rational number does it equal? | 2 | 0 |  | (√2^{√2})^{√2} = √2^{2} = 2, so that choice works if √2^{√2} is irrational.
M1#maths-u16-26-q2@1: Which principle does intuitionistic logic reject in general? | p ∨ ¬p | p → p | (p ∧ q) → p | p → (q → p) | p → ¬¬p | Excluded middle would assert a proof of p or of ¬p for every statement, which may not exist.
M2#maths-u16-26-q3@2: What does the Curry–Howard correspondence identify? | Proofs with programs and propositions with types | Sets with numbers | Truth tables with circuits | Models with proofs | Axioms with theorems | Intuitionistic proofs correspond to typed programs, the basis of proof assistants.

## Fuzzy Logic
S: Fuzzy logic allows truth values anywhere between 0 and 1, modelling vague ideas like "tall" or "warm". It's used in control systems, from washing machines to train braking, where smooth rules work better than sharp cut-offs.
O: Compute fuzzy AND, OR and NOT
O: Describe fuzzy sets and how fuzzy controllers work
T: Fuzzy set | A set with a membership function μ: X → [0, 1] giving degrees of membership
T: t-norm | A fuzzy AND operation, such as min(a, b) or the product ab
H: Operations
- Zadeh operations: NOT a = 1 − a; AND = min(a, b); OR = max(a, b).
- Other t-norms: product ab; Łukasiewicz max(0, a + b − 1).
- Excluded middle fails: a OR NOT a can be 0.5.
H: Fuzzy sets
- "Tall" might have μ(160 cm) = 0, μ(175 cm) = 0.5, μ(190 cm) = 1.
- Membership degree isn't probability: it measures vagueness, not chance.
- Linguistic hedges: "very tall" as μ^{2}.
H: Fuzzy control
- Fuzzify inputs, apply rules like "if temperature is high, fan is fast", then defuzzify (for example by centroid).
- Used in the Sendai subway (1987), cameras and appliances.
- Smooth, interpretable control without a precise model.
X: If "warm" has truth 0.7 and "humid" has truth 0.4, find "warm AND humid", "warm OR humid" and "NOT warm" using Zadeh operations.
> AND = min(0.7, 0.4) = 0.4
> OR = max(0.7, 0.4) = 0.7
> NOT warm = 1 − 0.7 = 0.3
K: Fuzzy logic uses truth degrees in [0, 1]; Zadeh's min, max and 1 − a are standard; fuzzy sets model vagueness; fuzzy controllers apply graded rules.
!: Treating membership degrees as probabilities.
Q: What is NOT 0.2 in fuzzy logic? | 0.8.
Q: Does p OR NOT p always equal 1 in fuzzy logic? | No.
SUM: Fuzzy logic grades truth.
SUM: It powers practical controllers.
SRC: Zadeh LA, Fuzzy sets, Information and Control 8(3), 338 | journal | 1965 | https://doi.org/10.1016/S0019-9958(65)90241-X
SRC: Klir GJ, Yuan B, Fuzzy Sets and Fuzzy Logic: Theory and Applications (Prentice Hall 1995) | textbook | 1995 | https://www.pearson.com/
NUM1#maths-u16-27-q1@1: Using the product t-norm, what is the fuzzy AND of truth values 0.6 and 0.5? | 0.3 | 0 |  | The product t-norm multiplies the truth values: 0.6 × 0.5 = 0.3.
M1#maths-u16-27-q2@1: Using Zadeh operations, what is p OR NOT p when p = 0.5? | 0.5 | 1 | 0 | 0.25 | 0.75 | NOT p = 0.5, and max(0.5, 0.5) = 0.5, so excluded middle fails.
M2#maths-u16-27-q3@2: How does a fuzzy membership degree differ from a probability? | It measures how far something fits a vague concept, not how likely an event is | It is always exactly 0 or 1, unlike a probability | Degrees must sum to 1 over all sets, like a distribution | It is a frequency measured over repeated experiments | They are the same thing under different names | Someone 175 cm tall is partly tall with certainty; there's no randomness involved.

## Temporal Logic
S: Temporal logic adds operators about time: "always", "eventually", "next" and "until". It is the language of model checking, which verifies that hardware and software satisfy requirements such as "every request is eventually answered".
O: Read and write formulas in linear temporal logic (LTL)
O: Distinguish safety and liveness properties
T: Linear temporal logic | LTL, with operators X (next), F (eventually), G (always) and U (until) over paths of states
T: Model checking | Automatically checking that every behaviour of a finite-state system satisfies a temporal formula
H: Operators
- G p: p holds at every future state. F p: p holds at some future state.
- X p: p holds at the next state. p U q: p holds until q becomes true (and q does).
- G F p: p holds infinitely often. F G p: from some point on, p always holds.
H: Property types
- Safety, "nothing bad happens": G ¬(crash).
- Liveness, "something good eventually happens": G (request → F response).
- Fairness: a process that is always enabled eventually runs.
H: In practice
- CTL adds path quantifiers (A, E) for branching time.
- Model checkers like SPIN and NuSMV verify protocols and chips.
- Pnueli won the 1996 Turing Award for temporal logic in computing; model checking won the 2007 award.
X: Write "every request is eventually followed by a grant" in LTL, and say whether it's safety or liveness.
> At every time: if there's a request, then at some later time there's a grant
> G (req → F grant)
> It's liveness: it promises something good will happen, and no finite trace can violate it
K: LTL uses X, F, G and U over paths; safety says nothing bad happens, liveness says something good eventually does; model checking verifies systems automatically.
!: Confusing G F p (infinitely often) with F G p (eventually always).
Q: What does F p mean? | p is eventually true.
Q: Is G ¬(error) a safety or a liveness property? | Safety.
SUM: Temporal logic reasons about time.
SUM: Model checking verifies systems.
SRC: Pnueli A, The temporal logic of programs, 18th Symposium on Foundations of Computer Science, 46 | journal | 1977 | https://doi.org/10.1109/SFCS.1977.32
SRC: Baier C, Katoen JP, Principles of Model Checking (MIT Press 2008) | textbook | 2008 | https://mitpress.mit.edu/
NUM1#maths-u16-28-q1@1: On the path where p is true exactly at times 0, 2, 4, 6, … (forever), how many of G p, F p, G F p and F G p are true at time 0? | 2 | 0 |  | F p and G F p are true; G p fails at time 1, and F G p fails because p keeps switching off.
M1#maths-u16-28-q2@1: Which LTL formula says "p holds infinitely often"? | G F p | F G p | X p | G p | p U q | At every point there's a later point where p holds, so p recurs forever.
M3#maths-u16-28-q3@2: Why can no finite observation show that a liveness property is violated? | The good event could still happen later, so any finite trace can be extended to satisfy it | Liveness properties are always false, so they need no observation | Finite traces satisfy every temporal formula, safety included | Liveness concerns only the first state, so one step decides it | It can: a finite trace with no good event shows the violation | Safety violations show up in finite prefixes; liveness violations only in infinite behaviour.

## Proof Techniques
S: A proof is a convincing logical argument that a statement follows from accepted facts. Mathematicians use a toolkit of standard methods, and choosing the right one, whether direct, contrapositive, contradiction, cases or induction, is half the work.
O: Choose a suitable proof technique for a statement's form
O: Recognise common proof structures and errors
T: Proof by cases | Splitting into exhaustive cases and proving the statement in each
T: Counterexample | A single instance showing a universal statement is false
H: Matching technique to form
- P → Q: direct proof, or contrapositive ¬Q → ¬P.
- ∀n ∈ ℕ P(n): induction.
- "There is no…" or "is irrational": contradiction.
- ∃x P(x): construct an example. "Disprove ∀x P(x)": find a counterexample.
H: Other methods
- Cases: n even or odd; x ≥ 0 or x < 0.
- Pigeonhole and counting arguments.
- Proving "if and only if" means proving both directions.
- Uniqueness: assume two objects work and show they're equal.
H: Common errors
- Assuming what you want to prove (circular reasoning).
- Proving the converse instead of the statement.
- Checking examples instead of proving the general case.
- Dividing by something that may be zero.
X: Prove that n^{2} + n is even for every integer n, by cases.
> Case 1: n even, n = 2k: n^{2} + n = 4k^{2} + 2k = 2(2k^{2} + k), even
> Case 2: n odd, n = 2k + 1: n^{2} + n = (2k + 1)(2k + 2) = 2(2k + 1)(k + 1), even
> The cases are exhaustive, so the claim holds for all n
K: The statement's logical form suggests the technique; cases, construction, counterexamples and pigeonhole extend the basic methods; avoid circularity and proving converses.
!: Thinking many confirming examples prove a universal statement.
Q: How do you disprove "every prime is odd"? | Give the counterexample 2.
Q: What must you prove for "P if and only if Q"? | Both P → Q and Q → P.
SUM: Match method to statement.
SUM: Avoid circular and converse errors.
SRC: Velleman DJ, How to Prove It: A Structured Approach (3rd edn, Cambridge University Press 2019) | textbook | 2019 | https://www.cambridge.org/
SRC: Hammack R, Book of Proof (3rd edn, Richard Hammack 2018) | textbook | 2018 | https://www.people.vcu.edu/~rhammack/BookOfProof/
NUM1#maths-u16-29-q1@1: Find the smallest n ≥ 1 for which n^{2} + n + 41 is not prime, a counterexample to Euler's pattern. | 40 | 0 |  | 40^{2} + 40 + 41 = 1681 = 41^{2}, while n = 1 to 39 all give primes.
M1#maths-u16-29-q2@1: Which technique is most natural for proving "√3 is irrational"? | Proof by contradiction | Mathematical induction | A single example | Proof by cases on parity | Direct calculation | Assume √3 = p/q in lowest terms and derive a contradiction about divisibility by 3.
M2#maths-u16-29-q3@2: What is the error in "for n = 1, 2, 3 the formula works, so it's true for all n"? | Checking examples doesn't prove a universal statement | The examples are too large to be checked reliably | Induction was used, but its step was set out wrongly | It proves the converse of the formula instead | There's no error: three cases make a valid proof | Patterns can fail later, as n^{2} + n + 41 does at n = 40.

## Direct Proof
S: A direct proof starts from the hypotheses and moves step by step to the conclusion using definitions and known results. Most proofs in mathematics are direct, and writing them well means unpacking definitions carefully.
O: Write direct proofs from definitions
O: Structure a proof clearly with stated assumptions and conclusions
T: Direct proof | Assume P and deduce Q through a chain of valid steps
T: Definition unpacking | Replacing a term like "even" with its definition, n = 2k for some integer k
H: Method
- Write "Assume P". Unpack definitions into algebraic statements.
- Manipulate towards the form required by Q's definition.
- Conclude "Therefore Q".
H: Examples
- Sum of two even numbers is even: 2a + 2b = 2(a + b).
- If a | b and b | c then a | c: b = am, c = bn = a(mn).
- Product of two odd numbers is odd: (2a + 1)(2b + 1) = 2(2ab + a + b) + 1.
H: Good practice
- Use different letters for different unknowns (not 2k and 2k for two numbers).
- State where each fact comes from.
- End by matching the definition exactly.
- Write in sentences, not just equations.
X: Prove directly: if n is odd then n^{2} is odd.
> Assume n is odd, so n = 2k + 1 for some integer k
> n^{2} = 4k^{2} + 4k + 1 = 2(2k^{2} + 2k) + 1
> 2k^{2} + 2k is an integer, so n^{2} is odd
K: Direct proofs assume the hypothesis, unpack definitions and reach the conclusion's definition; separate letters, cited facts and clear sentences make them sound.
!: Using the same variable for two different numbers, as in a = 2k and b = 2k.
Q: How do you unpack "a divides b"? | b = ak for some integer k.
Q: What's the first line of a direct proof of P → Q? | Assume P.
SUM: Direct proofs go forward.
SUM: Definitions do the work.
SRC: Hammack R, Book of Proof (3rd edn, Richard Hammack 2018) | textbook | 2018 | https://www.people.vcu.edu/~rhammack/BookOfProof/
SRC: Velleman DJ, How to Prove It: A Structured Approach (3rd edn, Cambridge University Press 2019) | textbook | 2019 | https://www.cambridge.org/
NUM1#maths-u16-30-q1@1: In the direct proof that (2a + 1)(2b + 1) is odd, with a = 3 and b = 4, what is the integer m in the form 2m + 1? | 31 | 0 |  | m = 2ab + a + b = 24 + 3 + 4 = 31, and indeed 7 × 9 = 63 = 2 × 31 + 1.
M1#maths-u16-30-q2@1: What is wrong with writing "let a = 2k and b = 2k" for two even numbers? | It forces a and b to be equal, so the proof covers only that special case | Even numbers can't be written in the form 2k at all | k must be odd for 2k to be an even number | It is perfectly correct and the usual way to start | It assumes the conclusion, so the proof is circular | Distinct numbers need distinct parameters, such as a = 2k and b = 2m.
M2#maths-u16-30-q3@2: Which first step suits a direct proof that the sum of two rationals is rational? | Write them as a/b and c/d with integers a, b, c, d and b, d ≠ 0 | Assume the sum is irrational and look for a contradiction | Check the claim for 1/2 and 1/3 and then generalise | Use induction on the numerators of the two fractions | Draw both numbers on a number line and add lengths | Unpacking "rational" gives a/b + c/d = (ad + bc)/bd, which is rational.

## Proof by Contraposition
S: To prove "if P then Q", you can instead prove the equivalent "if not Q then not P". This contrapositive is often easier when the conclusion is a negative statement or the hypothesis is hard to use directly.
O: Form the contrapositive of an implication
O: Prove statements by contraposition
T: Contrapositive | ¬Q → ¬P, logically equivalent to P → Q
T: Converse | Q → P, which is not equivalent to P → Q
H: Logic
- P → Q ≡ ¬Q → ¬P: the same truth table.
- The converse and inverse (¬P → ¬Q) are equivalent to each other but not to the original.
- "If it rains the ground is wet" ⇔ "if the ground is dry it didn't rain".
H: When to use it
- When Q is a negative or "not divisible" statement.
- When ¬Q gives a concrete form to work with (n = 2k + 1).
- Statements like "if n^{2} is even then n is even".
H: Contraposition versus contradiction
- Contraposition proves ¬Q → ¬P directly, with a clear target.
- Contradiction assumes P and ¬Q and seeks any contradiction.
- A contradiction proof that just derives ¬P is really a contraposition.
X: Prove: if n^{2} is even then n is even.
> Contrapositive: if n is odd then n^{2} is odd
> n = 2k + 1 gives n^{2} = 2(2k^{2} + 2k) + 1, odd
> The contrapositive holds, so the original statement holds
K: P → Q is equivalent to ¬Q → ¬P; use it when ¬Q is easier to work with; don't confuse it with the converse; it's often cleaner than contradiction.
!: Proving the converse Q → P and thinking it proves P → Q.
Q: What is the contrapositive of "if x > 2 then x^{2} > 4"? | If x^{2} ≤ 4 then x ≤ 2.
Q: Is the converse of a true implication always true? | No.
SUM: The contrapositive is equivalent.
SUM: The converse isn't.
SRC: Hammack R, Book of Proof (3rd edn, Richard Hammack 2018) | textbook | 2018 | https://www.people.vcu.edu/~rhammack/BookOfProof/
SRC: Velleman DJ, How to Prove It: A Structured Approach (3rd edn, Cambridge University Press 2019) | textbook | 2019 | https://www.cambridge.org/
NUM1#maths-u16-31-q1@1: Of the converse, inverse and contrapositive of P → Q, how many are logically equivalent to P → Q? | 1 | 0 |  | Only the contrapositive ¬Q → ¬P is equivalent; the converse and inverse are equivalent to each other.
M1#maths-u16-31-q2@1: Which statement is the contrapositive of "if a number is divisible by 6 then it is even"? | If a number is odd then it isn't divisible by 6 | If a number is even then it's divisible by 6 | If a number isn't divisible by 6 then it's odd | If a number is odd then it's divisible by 6 | Every even number is divisible by 6 | Negate both parts and swap them: "not even" implies "not divisible by 6".
M2#maths-u16-31-q3@2: Why is contraposition natural for "if xy is irrational then x or y is irrational"? | ¬Q says x and y are both rational, which is concrete and quickly gives xy rational | The statement has no hypothesis, so a direct proof can't even begin | Irrational numbers have simple formulas, so the contrapositive is direct | It can't be proved any other way, as contradiction fails for irrationals | Contraposition is unsuitable here, since the conclusion is an "or" | Rational numbers have the form a/b, so the contrapositive is a one-line direct proof.

## Proof by Contradiction
S: Proof by contradiction assumes the statement is false and derives something impossible. It gives the classic proofs that √2 is irrational and that there are infinitely many primes, and it's a powerful tool when there's no obvious direct route.
O: Structure a proof by contradiction
O: Reproduce classic contradiction proofs
T: Proof by contradiction | Assume ¬P, derive a contradiction (some R and ¬R), and conclude P
T: Reductio ad absurdum | The classical name for reasoning by contradiction
H: Structure
- "Suppose, for contradiction, that P is false."
- Derive consequences until something impossible appears.
- "This contradiction shows P is true."
H: Classic examples
- √2 is irrational: if √2 = p/q in lowest terms, then p^{2} = 2q^{2}, so p and q are both even.
- Infinitely many primes (Euclid): if p₁, …, pₙ were all, then p₁⋯pₙ + 1 has a prime factor not in the list.
- No largest integer: n + 1 would be larger.
H: Care points
- The negation must be stated correctly (see Predicate Logic).
- Intuitionists don't accept proving existence this way (see Intuitionistic Logic).
- If the contradiction is just ¬hypothesis, a contrapositive proof may be clearer.
X: Prove √2 is irrational.
> Suppose √2 = p/q with integers p, q in lowest terms
> Then p^{2} = 2q^{2}, so p^{2} is even and p = 2r; then 4r^{2} = 2q^{2}, so q^{2} = 2r^{2} and q is even
> Both even contradicts lowest terms, so √2 is irrational
K: Contradiction assumes ¬P and derives an impossibility; it proves √2 irrational and the infinitude of primes; state negations carefully.
!: Claiming Euclid's number p₁⋯pₙ + 1 must itself be prime (it only has a prime factor outside the list).
Q: What do you assume first in a proof by contradiction? | That the statement is false.
Q: Is 2 × 3 × 5 × 7 × 11 × 13 + 1 prime? | No: 30031 = 59 × 509.
SUM: Assume false, reach the impossible.
SUM: Classic proofs use it.
SRC: Hardy GH, Wright EM, An Introduction to the Theory of Numbers (6th edn, Oxford University Press 2008) | textbook | 2008 | https://global.oup.com/
SRC: Aigner M, Ziegler GM, Proofs from THE BOOK (6th edn, Springer 2018) | textbook | 2018 | https://link.springer.com/
NUM1#maths-u16-32-q1@1: Compute Euclid's number 2 × 3 × 5 + 1. | 31 | 0 |  | 2 × 3 × 5 + 1 = 31, which is prime and not in the list {2, 3, 5}.
M1#maths-u16-32-q2@1: In the proof that √2 is irrational, what contradiction is reached? | p and q are both even, though p/q was in lowest terms | p is odd and even at the same time | q is zero | √2 is negative | p^{2} equals q^{2} | Both being even means they share a factor 2, contradicting lowest terms.
M3#maths-u16-32-q3@2: Why doesn't Euclid's proof claim p₁p₂⋯pₙ + 1 is always prime? | It only needs some prime factor of it outside the list, and the number may be composite, like 30031 | The number p₁p₂⋯pₙ + 1 is always even, so it can't be prime | It is always prime, so Euclid had no need to claim it | The proof is really about composite numbers, not primes | Euclid did assume it was prime, and the proof relies on it | Dividing by any listed prime leaves remainder 1, so its prime factors are new.

## Mathematical Induction
S: Mathematical induction proves a statement for every natural number by proving a base case and showing each case implies the next. Like dominoes falling, it handles sums, inequalities, divisibility and recursive structures.
O: Write induction proofs with base case and inductive step
O: Use strong induction and recognise faulty induction
T: Principle of induction | If P(1) holds and P(k) ⇒ P(k + 1) for all k ≥ 1, then P(n) holds for all n ≥ 1
T: Strong induction | Assume P(1), …, P(k) all hold to prove P(k + 1)
H: Template
- Base case: check P(1) (or the first value).
- Inductive hypothesis: assume P(k).
- Inductive step: prove P(k + 1) using P(k).
- Conclude for all n.
H: Variants
- Strong induction: every n ≥ 2 is a product of primes.
- Starting elsewhere: 2ⁿ > n^{2} for n ≥ 5.
- Structural induction over trees, formulas and lists.
H: Pitfalls
- Skipping the base case: "n = n + 1" passes the step but fails the base.
- The "all horses are the same colour" fallacy fails from n = 1 to n = 2.
- The step must work for every k, not just large ones.
X: Prove 1 + 2 + … + n = n(n + 1)/2 by induction.
> Base: n = 1 gives 1 = 1 × 2/2 ✓
> Step: assume the sum to k is k(k + 1)/2; then the sum to k + 1 is k(k + 1)/2 + (k + 1) = (k + 1)(k + 2)/2
> This is the formula for k + 1, so it holds for all n ≥ 1
K: Induction needs a base case and an inductive step; strong induction assumes all earlier cases; structural induction works on recursive objects; each part is essential.
!: Omitting the base case, or using an inductive step that fails for small k.
Q: What does strong induction assume? | That all earlier cases hold.
Q: Where does the "all horses same colour" argument fail? | Going from 1 horse to 2.
SUM: Induction climbs from case to case.
SUM: Base and step are both essential.
SRC: Hammack R, Book of Proof (3rd edn, Richard Hammack 2018) | textbook | 2018 | https://www.people.vcu.edu/~rhammack/BookOfProof/
SRC: Graham RL, Knuth DE, Patashnik O, Concrete Mathematics (2nd edn, Addison-Wesley 1994) | textbook | 1994 | https://www-cs-faculty.stanford.edu/~knuth/gkp.html
NUM1#maths-u16-33-q1@1: What is the smallest n ≥ 1 from which 2ⁿ > n^{2} holds for all larger n? | 5 | 0 |  | It holds at n = 1 but fails at n = 2, 3, 4 (4 = 4, 8 < 9, 16 = 16); from n = 5 (32 > 25) induction carries it on.
M1#maths-u16-33-q2@1: What is the role of the inductive hypothesis? | Assuming P(k) to derive P(k + 1) | Assuming P(n) for every n | Checking the case n = 1 | Proving P(k) for one k | Giving a counterexample | The step shows the truth passes from k to k + 1; the hypothesis is the assumption P(k).
M2#maths-u16-33-q3@2: Which statement is naturally proved by strong induction? | Every integer n ≥ 2 is a product of primes | 1 + 2 + … + n = n(n + 1)/2 | 2ⁿ ≥ n + 1 for all n | 3 divides n^{3} − n | n! > 2ⁿ for n ≥ 4 | A composite n factors into smaller numbers, each needing the hypothesis, not just n − 1.

## Formal Proofs
S: A formal proof is a sequence of formulas, each an axiom or following from earlier ones by an explicit rule. Formal proofs can be checked mechanically, and proof assistants now verify major theorems, such as the four colour theorem and the Kepler conjecture, line by line.
O: Build short derivations in a formal proof system
O: Describe how proof assistants check mathematics
T: Natural deduction | A proof system with introduction and elimination rules for each connective
T: Proof assistant | Software such as Lean, Coq or Isabelle that checks formal proofs step by step
H: Proof systems
- Hilbert systems: many axioms, one rule (modus ponens).
- Natural deduction: rules like →-introduction (assume P, derive Q, conclude P → Q).
- Sequent calculus: Gentzen's system, used in proof theory.
H: Checking proofs
- Each step is justified by a named rule, so a program can check it.
- Formal proofs are long, but tactics automate routine steps.
- The de Bruijn criterion: a small trusted kernel checks everything.
H: Achievements
- Four colour theorem (Coq, Gonthier 2005).
- Kepler conjecture (Flyspeck project, HOL Light and Isabelle, 2014).
- Lean's mathlib formalises large parts of undergraduate and research mathematics.
X: Give a natural deduction proof of (P ∧ Q) → (Q ∧ P).
> 1. Assume P ∧ Q
> 2. From 1, ∧-elimination gives P and gives Q; ∧-introduction gives Q ∧ P
> 3. Discharge the assumption by →-introduction: (P ∧ Q) → (Q ∧ P)
K: Formal proofs use explicit rules so they can be checked mechanically; Hilbert, natural deduction and sequent systems differ in style; proof assistants have verified major theorems.
!: Thinking formal proofs are only of theoretical interest (they're now used in practice).
Q: Which theorem was formally verified in Coq in 2005? | The four colour theorem.
Q: What is the single rule of a typical Hilbert system? | Modus ponens.
SUM: Formal proofs can be machine-checked.
SUM: Proof assistants verify real mathematics.
SRC: Gonthier G, Formal proof: the four-color theorem, Notices of the AMS 55(11), 1382 | journal | 2008 | https://www.ams.org/notices/200811/
SRC: Hales T et al., A formal proof of the Kepler conjecture, Forum of Mathematics, Pi 5, e2 | journal | 2017 | https://doi.org/10.1017/fmp.2017.1
NUM1#maths-u16-34-q1@1: In what year was the formal proof of the Kepler conjecture (Flyspeck) completed? | 2014 | 0 |  | The Flyspeck project announced completion in August 2014, and the paper appeared in 2017.
M1#maths-u16-34-q2@1: Which rule introduces an implication in natural deduction? | Assume P, derive Q, then discharge to conclude P → Q | From P and P → Q conclude Q | From P ∧ Q conclude P | From P conclude P ∨ Q | From ¬¬P conclude P | →-introduction discharges an assumption; the second option is →-elimination (modus ponens).
M2#maths-u16-34-q3@2: Why do proof assistants rely on a small trusted kernel? | Only the kernel's simple checks need trusting, however complex the tactics that produce proofs | The kernel writes all the proofs, so users never need to | Kernels make every formal proof shorter than on paper | It removes the need for axioms, since the kernel decides truth | They don't: proof assistants trust every tactic equally | The de Bruijn criterion keeps the trusted code small and easy to audit.

## Axiomatic Systems
S: An axiomatic system starts from a few basic statements, the axioms, and derives everything else by logic. Euclid's geometry was the first great example, and modern mathematics is organised as axiomatic theories judged by consistency, independence and completeness.
O: Describe axioms, theorems and models of an axiomatic system
O: Explain consistency, independence and completeness
T: Axiom | A statement accepted without proof as a starting point of a theory
T: Independent axiom | One that can't be proved from the other axioms
H: Structure
- Undefined terms (point, line, set), axioms, definitions and theorems.
- A model is a structure where all the axioms are true.
- Examples: Euclid's postulates, the group axioms, Peano arithmetic, ZFC.
H: Desirable properties
- Consistency: no contradiction can be derived (shown by exhibiting a model).
- Independence: no axiom is redundant (shown by a model where it fails and the others hold).
- Completeness: every statement or its negation is provable (rare for rich theories).
H: The parallel postulate
- For 2,000 years people tried to prove it from Euclid's other postulates.
- Hyperbolic geometry (Bolyai, Lobachevsky) is a model where it fails.
- So it's independent, and non-Euclidean geometries are equally consistent.
X: Show the axiom "xy = yx" is independent of the group axioms.
> The group axioms hold in the symmetric group S₃
> In S₃, two transpositions don't commute
> So commutativity fails in a model of the other axioms: it's independent
K: Axiomatic systems derive theorems from axioms; models show consistency and independence; completeness is rare; the parallel postulate is the classic independent axiom.
!: Thinking axioms must be "self-evidently true" rather than chosen starting points.
Q: How do you show an axiom is independent? | Find a model of the other axioms where it fails.
Q: Which geometry shows the parallel postulate is independent? | Hyperbolic geometry.
SUM: Axioms are chosen starting points.
SUM: Models test consistency and independence.
SRC: Greenberg MJ, Euclidean and Non-Euclidean Geometries: Development and History (4th edn, W. H. Freeman 2008) | textbook | 2008 | https://www.macmillanlearning.com/
SRC: Hilbert D, Grundlagen der Geometrie (Teubner 1899) | textbook | 1899 | https://archive.org/
NUM1#maths-u16-35-q1@1: How many postulates did Euclid state at the start of the Elements? | 5 | 0 |  | Euclid listed five postulates, the fifth being the parallel postulate, alongside common notions.
M1#maths-u16-35-q2@1: How is the consistency of an axiom system usually shown? | By exhibiting a model in which all the axioms are true | By proving every axiom from the others | By listing many theorems | By checking the axioms are short | By showing it is complete | If a model exists, no contradiction can be derived, since the model would make it true.
M2#maths-u16-35-q3@2: What did hyperbolic geometry show about the parallel postulate? | It is independent of Euclid's other postulates | It can be proved from the other postulates | It is false in every geometry | It makes geometry inconsistent | It is equivalent to Pythagoras | A consistent model where the others hold but parallels fail shows it can't be proved.

## Axiomatic Set Theory
S: Axiomatic set theory replaces naive set formation with explicit axioms saying which sets exist. This avoids Russell's paradox while still allowing all of ordinary mathematics to be built, and it makes clear which assumptions each proof uses.
O: Explain why axioms are needed for set theory
O: Compare ZFC with other axiomatic set theories
T: Separation (Aussonderung) | From a set A and a property P, form {x ∈ A : P(x)}; you can only carve subsets from existing sets
T: Class | A collection defined by a property that may be too big to be a set, such as all sets
H: Avoiding paradoxes
- Unrestricted comprehension gives Russell's set; separation only allows subsets.
- Russell's argument then shows: no set contains every set.
- Large collections like "all sets" become proper classes.
H: Main theories
- ZF and ZFC (Zermelo 1908, Fraenkel and Skolem 1922): the standard choice.
- NBG and Morse–Kelley: add classes as objects.
- New Foundations (Quine): a different approach with a universal set.
H: Relative consistency
- No theory like ZFC can prove its own consistency (Gödel).
- Results are stated relative: "if ZF is consistent, so is ZFC".
- Mathematicians work in ZFC by default, usually without mentioning it.
X: Show that separation proves there is no set of all sets.
> Suppose V contains every set
> By separation, R = {x ∈ V : x ∉ x} is a set
> Then R ∈ R iff R ∉ R, a contradiction, so V can't exist
K: Axiomatic set theory limits set formation; separation blocks Russell's paradox; ZFC is standard, with NBG and others as alternatives; consistency is proved only relatively.
!: Thinking Russell's argument shows set theory is inconsistent (it only rules out a universal set in ZF).
Q: What is a proper class? | A collection too large to be a set, such as all sets.
Q: Who first axiomatised set theory, in 1908? | Ernst Zermelo.
SUM: Axioms decide which sets exist.
SUM: ZFC is the standard theory.
SRC: Kunen K, Set Theory (College Publications 2011) | textbook | 2011 | https://www.collegepublications.co.uk/
SRC: Zermelo E, Untersuchungen über die Grundlagen der Mengenlehre I, Mathematische Annalen 65, 261 | journal | 1908 | https://doi.org/10.1007/BF01449999
NUM1#maths-u16-36-q1@1: In what year did Zermelo publish his axioms for set theory? | 1908 | 0 |  | Zermelo's 1908 paper in Mathematische Annalen gave the first axiomatisation, later extended by Fraenkel and Skolem.
M1#maths-u16-36-q2@1: Which axiom replaces unrestricted comprehension in ZF? | Separation: subsets of existing sets defined by a property | Choice: selecting an element from each set | Infinity: a set containing ℕ exists | Extensionality: sets with equal members are equal | Foundation: no infinite descending ∈ chains | Separation only forms {x ∈ A : P(x)}, which blocks Russell's construction.
M3#maths-u16-36-q3@2: Why are consistency results for ZFC stated relatively, such as "if ZF is consistent, so is ZFC"? | Gödel's second theorem means ZF can't prove its own consistency, so only relative results are possible | ZF is known to be inconsistent, so absolute results would be false | Consistency is never meaningful for theories as strong as ZF | ZFC proves its own consistency, so relative results are just simpler | Relative results are just a convention with no logical reason behind it | Absolute consistency proofs would need a stronger theory.

## Zermelo–Fraenkel Set Theory
S: Zermelo–Fraenkel set theory with choice, ZFC, is the standard foundation of mathematics. Its axioms describe how sets are formed: pairs, unions, power sets, an infinite set and images of functions, plus foundation and choice.
O: State the main ZFC axioms in words
O: Use the axioms to justify set constructions
T: ZFC | Zermelo–Fraenkel set theory with the axiom of choice
T: Axiom of replacement | The image of a set under a definable function is a set
H: The axioms
- Extensionality: sets with the same elements are equal.
- Empty set, pairing ({a, b}), union (⋃A), power set (P(A)).
- Separation and replacement (schemas).
- Infinity: there's a set containing ∅ and closed under x ↦ x ∪ {x}.
- Foundation: every non-empty set has an ∈-minimal element (no x ∈ x).
- Choice (see Axiom of Choice).
H: Building mathematics
- ℕ from infinity; ℤ, ℚ as equivalence classes; ℝ as Dedekind cuts.
- Functions as sets of ordered pairs.
- Replacement gives ordinals beyond ω + ω, such as ω·2 and beyond.
H: Independence
- The continuum hypothesis is independent of ZFC (Gödel 1940, Cohen 1963).
- So is the existence of large cardinals (see Large Cardinal Theory).
- Most everyday mathematics needs far less than full ZFC.
X: Which ZFC axioms show {a, b, c} is a set when a, b and c are sets?
> Pairing gives {a, b} and {c, c} = {c}
> Pairing gives {{a, b}, {c}}
> Union gives ⋃ {{a, b}, {c}} = {a, b, c}
K: ZFC's axioms cover extensionality, pairing, union, power set, separation, replacement, infinity, foundation and choice; they build all of standard mathematics; CH is independent.
!: Thinking ZFC decides every mathematical question.
Q: Which axiom rules out x ∈ x? | Foundation (regularity).
Q: Is the continuum hypothesis provable in ZFC? | No, nor is its negation.
SUM: ZFC is the standard foundation.
SUM: Its axioms build sets step by step.
SRC: Kunen K, Set Theory (College Publications 2011) | textbook | 2011 | https://www.collegepublications.co.uk/
SRC: Jech T, Set Theory (3rd millennium edn, Springer 2003) | textbook | 2003 | https://link.springer.com/
NUM1#maths-u16-37-q1@1: How many elements does the set ⋃ {{1, 2}, {2, 3}, {4}} have? | 4 | 0 |  | The union collects 1, 2, 3 and 4, with 2 counted once, so it has four elements.
M1#maths-u16-37-q2@1: Which ZFC axiom guarantees an infinite set exists? | Infinity | Extensionality | Pairing | Foundation | Separation | The axiom of infinity asserts a set containing ∅ and closed under successor.
M2#maths-u16-37-q3@2: What does the axiom of extensionality say? | Two sets with exactly the same elements are equal | Every set has a power set | Every set is infinite | Sets can contain themselves | Every property defines a set | Sets are determined by their members alone, so {1, 2} = {2, 1}.

## Axiom of Choice
S: The axiom of choice says that from any collection of non-empty sets you can choose one element from each, even when there's no rule for choosing. It's equivalent to Zorn's lemma and the well-ordering theorem, and it has both powerful and paradoxical consequences.
O: State the axiom of choice and its main equivalents
O: Describe consequences such as Banach–Tarski and non-measurable sets
T: Choice function | A function f with f(A) ∈ A for every set A in a family of non-empty sets
T: Banach–Tarski paradox | Using choice, a solid ball can be split into finitely many pieces and reassembled into two balls of the same size
H: Equivalents (over ZF)
- Zorn's lemma.
- The well-ordering theorem.
- Every surjection has a right inverse.
- Every vector space has a basis.
H: Consequences
- Non-measurable sets exist (Vitali sets).
- Banach–Tarski: the pieces are non-measurable, so volume isn't preserved.
- Tychonoff's theorem; every ring with 1 has a maximal ideal.
H: Status
- Independent of ZF (Gödel 1938 showed consistency; Cohen 1963 showed independence).
- Russell's example: choosing from infinitely many pairs of shoes is easy (take the left), but pairs of socks need choice.
- Weaker forms (countable or dependent choice) suffice for most analysis.
X: Explain why choosing from infinitely many pairs of shoes needs no axiom of choice, but socks do.
> Shoes: the rule "take the left shoe" defines a choice function explicitly
> Socks: the two socks in a pair are indistinguishable, so no rule picks one
> Choosing from infinitely many sock pairs needs the axiom of choice
K: Choice picks elements from every set in a family; it's equivalent to Zorn and well-ordering; it gives bases, maximal ideals and Banach–Tarski; it's independent of ZF.
!: Thinking choice is needed for finitely many choices (finite choice is provable in ZF).
Q: Is the axiom of choice provable in ZF? | No.
Q: Name a statement equivalent to choice. | Zorn's lemma (or well-ordering).
SUM: Choice selects without a rule.
SUM: It is powerful and independent.
SRC: Jech T, The Axiom of Choice (North-Holland 1973; Dover 2008) | textbook | 2008 | https://store.doverpublications.com/
SRC: Wagon S, Tomkowicz G, The Banach–Tarski Paradox (2nd edn, Cambridge University Press 2016) | textbook | 2016 | https://www.cambridge.org/
NUM1#maths-u16-38-q1@1: In the Banach–Tarski paradox, what is the minimum number of pieces needed to turn one ball into two? | 5 | 0 |  | Robinson showed five pieces suffice and that fewer are impossible.
M1#maths-u16-38-q2@1: Which statement is equivalent to the axiom of choice over ZF? | Every set can be well-ordered | Every set is finite | Every function is continuous | Every set is countable | Every subset of ℝ is measurable | Zermelo's well-ordering theorem is one of the classic equivalents of choice.
M3#maths-u16-38-q3@2: Why doesn't Banach–Tarski contradict the conservation of volume? | The pieces are non-measurable sets, so they have no well-defined volume to conserve | Volume isn't conserved by rotations, only by translations | The second ball is smaller than the first, so volume shrinks | It only works in two dimensions, where area isn't preserved | It does: the paradox is a contradiction proved in ZFC | Rigid motions preserve measure, but only for measurable sets.

## Set-Theoretic Mathematics
S: In set-theoretic foundations every mathematical object is a set: numbers, pairs, functions and spaces. Seeing how ℕ, ℤ, ℚ and ℝ are built from sets explains what these objects are and which properties their definitions guarantee.
O: Construct the number systems from sets
O: Explain what "everything is a set" does and doesn't mean in practice
T: Dedekind cut | A partition of ℚ into a lower set with no greatest element and an upper set, defining a real number
T: Von Neumann ordinal | A set containing exactly the smaller ordinals, such as 3 = {0, 1, 2}
H: The number tower
- ℕ: 0 = ∅, n + 1 = n ∪ {n}.
- ℤ: classes of pairs (a, b) of naturals, thought of as a − b.
- ℚ: classes of pairs (p, q) with q ≠ 0, thought of as p/q.
- ℝ: Dedekind cuts or classes of Cauchy sequences of rationals.
H: Other objects
- Functions and relations: sets of ordered pairs.
- Sequences: functions from ℕ.
- Structures (groups, spaces): a set plus operations or a topology.
H: In practice
- Statements like "3 ∈ 5" are true in von Neumann coding but meaningless in ordinary use ("junk theorems").
- Mathematicians use the interface (properties) rather than the encoding.
- Type theory and category theory offer structural alternatives.
X: Which pair of naturals represents the integer −3, and which other pairs represent it too?
> (a, b) represents a − b
> (0, 3) gives 0 − 3 = −3
> The class also contains (1, 4), (2, 5), …: (a, b) ~ (c, d) iff a + d = b + c
K: All number systems can be built from sets: ℕ by von Neumann, ℤ and ℚ as classes of pairs, ℝ by cuts or Cauchy sequences; encodings give junk theorems, so mathematicians use properties.
!: Taking encoding facts like "2 ∈ 3" as meaningful mathematical statements.
Q: How is ℝ built from ℚ? | By Dedekind cuts or Cauchy sequences.
Q: Which set is the von Neumann natural 1? | {∅}.
SUM: Everything can be encoded as sets.
SUM: Properties matter more than encodings.
SRC: Enderton HB, Elements of Set Theory (Academic Press 1977) | textbook | 1977 | https://www.elsevier.com/
SRC: Dedekind R, Stetigkeit und irrationale Zahlen (Vieweg 1872) | textbook | 1872 | https://archive.org/
NUM1#maths-u16-39-q1@1: Under the pair representation of ℤ, (a, b) represents a − b. If (7, b) represents −2, what is b? | 9 | 0 |  | 7 − b = −2 gives b = 9, so (7, 9) lies in the class of −2.
M1#maths-u16-39-q2@1: How is a real number defined as a Dedekind cut? | As a split of ℚ into a lower set with no greatest element and the upper rest | As an infinite string of decimal digits with no last digit | As an ordered pair of integers (a, b) with b non-zero | As the limit of an increasing sequence of integers | As a set of natural numbers coding its binary digits | Cuts fill the gaps in ℚ: √2 is the cut {q : q < 0 or q^{2} < 2}.
M2#maths-u16-39-q3@2: What is a "junk theorem" in set-theoretic foundations? | A true statement about an encoding with no ordinary meaning, such as 2 ∈ 3 | A false theorem of ZFC that was accepted by mistake | A theorem whose shortest proof is impractically long | A theorem about junk data in computer databases | A theorem that can be proved only with choice | It reflects how numbers are coded as sets, not anything about numbers themselves.

## Ordinal Arithmetic
S: Ordinals extend counting beyond the finite: after 0, 1, 2, … comes ω, then ω + 1, ω + 2, and on. They measure the length of well-ordered sets, and their arithmetic is strange: addition and multiplication aren't commutative.
O: List and compare small transfinite ordinals
O: Compute ordinal sums and products, noting non-commutativity
T: Ordinal | The order type of a well-ordered set; in ZF, a transitive set well-ordered by ∈
T: Limit ordinal | A non-zero ordinal with no immediate predecessor, such as ω
H: The sequence
- 0, 1, 2, …, ω, ω + 1, …, ω·2, …, ω^{2}, …, ω^{ω}, …, ε₀ = ω^{ω^{ω^{…}}}.
- Every ordinal is zero, a successor α + 1, or a limit.
- Transfinite induction and recursion work over ordinals.
H: Arithmetic
- α + β: α followed by β. 1 + ω = ω, but ω + 1 > ω.
- α·β: β copies of α. 2·ω = ω, but ω·2 = ω + ω.
- Cantor normal form: every ordinal is uniquely a sum ω^{β₁}c₁ + … with β₁ > β₂ > … .
H: Uses
- Goodstein's theorem: proved with ordinals below ε₀, unprovable in Peano arithmetic.
- Proof theory measures theories by ordinals (PA has ε₀).
- Cantor–Bendixson rank in topology.
X: Show that 1 + ω = ω but ω + 1 ≠ ω.
> 1 + ω: a point, then a copy of ℕ: •, 0, 1, 2, …, which is again order type ω
> ω + 1: a copy of ℕ, then a point after it: 0, 1, 2, …, •, which has a greatest element
> ω has no greatest element, so ω + 1 ≠ ω
K: Ordinals continue counting past ω; addition and multiplication are associative but not commutative; Cantor normal form represents ordinals; ε₀ measures Peano arithmetic.
!: Assuming ordinal arithmetic is commutative, so ω + 1 = 1 + ω.
Q: Is 2·ω equal to ω? | Yes.
Q: What ordinal comes right after ω? | ω + 1.
SUM: Ordinals extend counting.
SUM: Their arithmetic isn't commutative.
SRC: Jech T, Set Theory (3rd millennium edn, Springer 2003) | textbook | 2003 | https://link.springer.com/
SRC: Kirby L, Paris J, Accessible independence results for Peano arithmetic, Bulletin of the London Mathematical Society 14(4), 285 | journal | 1982 | https://doi.org/10.1112/blms/14.4.285
NUM1#maths-u16-40-q1@1: How many of the equations 1 + ω = ω, ω + 1 = ω, 2·ω = ω and ω·2 = ω are true? | 2 | 0 |  | 1 + ω = ω and 2·ω = ω are true; ω + 1 and ω·2 = ω + ω are strictly larger than ω.
M1#maths-u16-40-q2@1: Which ordinal is a limit ordinal? | ω·2 | ω + 1 | 5 | ω + 7 | ω·2 + 1 | ω·2 = ω + ω has no immediate predecessor; the others are successors.
M3#maths-u16-40-q3@2: Why does Goodstein's theorem need ordinals beyond those Peano arithmetic can handle? | Its termination proof assigns decreasing ordinals below ε₀, and PA can't prove transfinite induction up to ε₀ | Goodstein sequences are infinite | Ordinals are unrelated to Goodstein's theorem | Peano arithmetic proves it easily | The sequences increase forever | Kirby and Paris showed PA can't prove the theorem, matching PA's proof-theoretic ordinal ε₀.

## Cardinal Arithmetic
S: Cardinals measure the size of sets. ℵ₀ is the size of ℕ, and 2^{ℵ₀} is the size of ℝ. Infinite cardinal addition and multiplication are surprisingly simple, but exponentiation leads to the unresolved continuum hypothesis.
O: Compute sums and products of infinite cardinals
O: State Cantor's theorem and the continuum hypothesis
T: Cardinal number | The size of a set, where two sets have the same cardinality if a bijection exists
T: Continuum hypothesis | CH: there is no cardinal strictly between ℵ₀ and 2^{ℵ₀}, so 2^{ℵ₀} = ℵ₁
H: Addition and multiplication
- For infinite κ, λ: κ + λ = κ·λ = max(κ, λ).
- ℵ₀ + ℵ₀ = ℵ₀; ℵ₀·ℵ₀ = ℵ₀ (ℕ × ℕ is countable).
- |ℝ^{2}| = |ℝ|: the plane has as many points as the line.
H: Exponentiation
- 2^{κ} = |P(κ)| > κ (Cantor).
- |ℝ| = 2^{ℵ₀}; ℵ₀^{ℵ₀} = 2^{ℵ₀}.
- Cardinals: ℵ₀ < ℵ₁ < ℵ₂ < …, where ℵ₁ is the least uncountable cardinal.
H: The continuum hypothesis
- Cantor conjectured 2^{ℵ₀} = ℵ₁.
- Gödel (1940): CH is consistent with ZFC. Cohen (1963): ¬CH is too, via forcing.
- Easton: 2^{κ} for regular κ can be almost anything consistent with simple rules.
X: Show |ℝ × ℝ| = |ℝ| using cardinal arithmetic.
> |ℝ| = 2^{ℵ₀}
> |ℝ × ℝ| = 2^{ℵ₀}·2^{ℵ₀} = 2^{ℵ₀ + ℵ₀}
> = 2^{ℵ₀}, since ℵ₀ + ℵ₀ = ℵ₀
- Cantor–Schröder–Bernstein: injections A → B and B → A together give a bijection.
- Cardinal comparison needs choice to be total: every two cardinals are comparable iff AC holds.
K: Infinite sums and products are the maximum; 2^{κ} > κ; |ℝ| = 2^{ℵ₀}; CH is independent of ZFC (Gödel and Cohen).
!: Thinking the continuum hypothesis has been proved or disproved.
Q: What is ℵ₀ · ℵ₀? | ℵ₀.
Q: Who showed ¬CH is consistent with ZFC? | Paul Cohen (1963).
SUM: Infinite sizes add simply.
SUM: Exponentiation is mysterious.
SRC: Jech T, Set Theory (3rd millennium edn, Springer 2003) | textbook | 2003 | https://link.springer.com/
SRC: Cohen PJ, The independence of the continuum hypothesis, PNAS 50(6), 1143 | journal | 1963 | https://doi.org/10.1073/pnas.50.6.1143
NUM1#maths-u16-41-q1@1: In what year did Paul Cohen prove the independence of the continuum hypothesis? | 1963 | 0 |  | Cohen introduced forcing in 1963 to show ¬CH is consistent, for which he won the 1966 Fields Medal.
M1#maths-u16-41-q2@1: What is ℵ₀ + 2^{ℵ₀}? | 2^{ℵ₀} | ℵ₀ | ℵ₁ in every model | 2^{ℵ₀ + 1} | ℵ₀ + 1 | Infinite cardinal sums equal the larger summand, here 2^{ℵ₀}.
M2#maths-u16-41-q3@2: What did Gödel and Cohen together show about CH? | Neither CH nor its negation can be proved from ZFC | CH is true, settled by Gödel's constructible universe | CH is false, settled by Cohen's method of forcing | CH is meaningless, so no proof could ever apply to it | ZFC is inconsistent, since it proves both CH and ¬CH | Gödel built a model where CH holds and Cohen one where it fails.

## Large Cardinal Theory
S: Large cardinals are infinite sizes so big that ZFC can't prove they exist. Adding them as axioms gives a ladder of ever stronger theories, which set theorists use to measure the consistency strength of mathematical statements.
O: Describe inaccessible and measurable cardinals
O: Explain how large cardinals measure consistency strength
T: Inaccessible cardinal | An uncountable regular cardinal κ with 2^{λ} < κ for every λ < κ
T: Consistency strength | A ranking of theories by which can prove the others consistent
H: The ladder
- Inaccessible < Mahlo < weakly compact < measurable < supercompact < … .
- Each level proves the consistency of the levels below.
- A Grothendieck universe, used in category theory, amounts to an inaccessible cardinal.
H: Why ZFC can't prove them
- If κ is inaccessible, V_{κ} is a model of ZFC.
- So ZFC + "an inaccessible exists" proves Con(ZFC).
- By Gödel's second theorem, ZFC can't prove an inaccessible exists (if ZFC is consistent).
H: Uses
- Measurable cardinals imply V ≠ L (Scott 1961).
- Determinacy of projective sets follows from Woodin cardinals (Martin–Steel 1989).
- Many natural statements line up neatly on the large cardinal ladder.
X: Explain why ZFC + "there is an inaccessible cardinal" is stronger than ZFC.
> If κ is inaccessible, V_{κ} satisfies every ZFC axiom
> So the stronger theory proves ZFC has a model, hence Con(ZFC)
> ZFC can't prove Con(ZFC), so it can't prove that an inaccessible exists
K: Large cardinals are axioms beyond ZFC; inaccessibles give models of ZFC; the ladder ranks consistency strength; they settle questions like projective determinacy.
!: Thinking large cardinals are proved to exist (they're assumed as new axioms).
Q: What does V_{κ} model when κ is inaccessible? | ZFC.
Q: Which is stronger, a measurable or an inaccessible cardinal? | Measurable.
SUM: Large cardinals extend ZFC.
SUM: They measure strength.
SRC: Kanamori A, The Higher Infinite (2nd edn, Springer 2003) | textbook | 2003 | https://link.springer.com/
SRC: Martin DA, Steel JR, A proof of projective determinacy, Journal of the AMS 2(1), 71 | journal | 1989 | https://doi.org/10.1090/S0894-0347-1989-0955605-X
NUM1#maths-u16-42-q1@1: In what year did Martin and Steel publish their proof of projective determinacy from Woodin cardinals? | 1989 | 0 |  | Their paper appeared in the Journal of the AMS in 1989.
M1#maths-u16-42-q2@1: Which list orders large cardinals from weaker to stronger? | Inaccessible, measurable, supercompact | Supercompact, measurable, inaccessible | Measurable, inaccessible, supercompact | Inaccessible, supercompact, measurable | They are all equally strong | Each later notion implies the consistency of the earlier ones.
M3#maths-u16-42-q3@2: Why can't ZFC prove an inaccessible cardinal exists, assuming ZFC is consistent? | It would then prove V_{κ} is a model of ZFC, so it would prove its own consistency, violating Gödel's second theorem | Inaccessible cardinals are finite, so ZFC's infinite methods never reach them at all | ZFC has no infinite sets, so it can't discuss any cardinals beyond the natural numbers | They have been shown not to exist, so proving they exist would make ZFC inconsistent | It can: inaccessibles follow from the power set and replacement axioms together | The existence of an inaccessible implies Con(ZFC).

## Proof Theory
S: Proof theory treats proofs as mathematical objects. It analyses their structure, transforms them into normal forms and measures the strength of theories, results that link logic to computation and underpin modern proof assistants.
O: Describe cut elimination and normal forms of proofs
O: Explain Gentzen's consistency proof and ordinal analysis
T: Cut elimination | Gentzen's theorem that the cut rule (using lemmas) can be removed from sequent calculus proofs
T: Proof-theoretic ordinal | The smallest ordinal whose well-foundedness a theory can't prove, measuring its strength
H: Hilbert's programme
- Hilbert wanted finitary consistency proofs for mathematics.
- Gödel's second theorem showed this can't fully work.
- Proof theory salvaged relative and ordinal versions.
H: Gentzen's results
- Sequent calculus and natural deduction (1934–35).
- Cut elimination: every proof can be made direct, using only subformulas.
- Consistency of Peano arithmetic (1936) using induction up to ε₀.
H: Modern directions
- Ordinal analysis: PA has ordinal ε₀; stronger theories have larger ordinals.
- Reverse mathematics: which axioms are needed for which theorems.
- Proof mining: extracting bounds and algorithms from proofs.
X: Why does a cut-free proof of a contradiction (⊢ with an empty sequent) not exist in sequent calculus?
> In a cut-free proof, every formula is a subformula of the conclusion
> The empty sequent has no subformulas, but every rule except cut introduces a formula
> So no cut-free derivation ends in the empty sequent; with cut elimination, the system is consistent
K: Proof theory studies proofs as objects; cut elimination yields direct proofs with the subformula property; Gentzen proved PA consistent using ε₀; ordinal analysis measures strength.
!: Thinking Gentzen's proof contradicts Gödel (it uses transfinite induction beyond PA).
Q: What is the proof-theoretic ordinal of Peano arithmetic? | ε₀.
Q: What property do cut-free proofs have? | The subformula property.
SUM: Proofs are objects of study.
SUM: Ordinals measure theory strength.
SRC: Gentzen G, Die Widerspruchsfreiheit der reinen Zahlentheorie, Mathematische Annalen 112, 493 | journal | 1936 | https://doi.org/10.1007/BF01565428
SRC: Takeuti G, Proof Theory (2nd edn, North-Holland 1987; Dover 2013) | textbook | 2013 | https://store.doverpublications.com/
NUM1#maths-u16-43-q1@1: In what year did Gentzen publish his consistency proof for Peano arithmetic? | 1936 | 0 |  | Gentzen's proof appeared in Mathematische Annalen in 1936, using induction up to ε₀.
M1#maths-u16-43-q2@1: What does cut elimination guarantee? | Every provable sequent has a proof using only subformulas of its conclusion | Every formula is provable | Proofs can't be shortened | Every theory is complete | Lemmas are always necessary | Cut-free proofs never introduce formulas that aren't parts of the result.
M2#maths-u16-43-q3@2: How does Gentzen's consistency proof avoid conflicting with Gödel's second theorem? | It uses transfinite induction up to ε₀, which Peano arithmetic itself can't prove | It shows PA is inconsistent, agreeing with Gödel's theorem | It is a proof carried out entirely inside PA itself | Gödel's theorem doesn't apply to arithmetic at all | It doesn't: the two results genuinely contradict each other | The proof uses a principle beyond PA, so PA doesn't prove its own consistency.

## Model Theory
S: Model theory studies the relationship between formal theories and the structures that satisfy them. It asks which structures a theory describes, when two structures are indistinguishable, and it has produced deep results in algebra and number theory.
O: Use models, elementary equivalence and categoricity
O: Describe quantifier elimination and applications of model theory
T: Model | A structure in which every sentence of a theory is true
T: Elementary equivalence | Two structures satisfying exactly the same first-order sentences
H: Basic ideas
- (ℚ, <) and (ℝ, <) are elementarily equivalent: both are dense orders without endpoints.
- A theory is κ-categorical if all its models of size κ are isomorphic.
- Dense linear orders without endpoints are ℵ₀-categorical (Cantor).
H: Quantifier elimination
- Real closed fields (Tarski): every formula is equivalent to one without quantifiers.
- So the first-order theory of (ℝ, +, ·, <) is decidable.
- Algebraically closed fields also have quantifier elimination (Chevalley's theorem).
H: Applications
- Non-standard analysis (Robinson): infinitesimals made rigorous via ultrapowers.
- Ax–Grothendieck: injective polynomial maps ℂⁿ → ℂⁿ are surjective.
- Hrushovski's proof of the Mordell–Lang conjecture for function fields.
X: Show (ℤ, <) and (ℚ, <) aren't elementarily equivalent.
> The sentence ∀x ∀y (x < y → ∃z (x < z ∧ z < y)) says the order is dense
> It's true in (ℚ, <) and false in (ℤ, <) (nothing lies between 0 and 1)
> A first-order sentence separates them, so they aren't elementarily equivalent
K: Model theory studies theories and their models; elementary equivalence and categoricity compare structures; quantifier elimination gives decidability; applications reach algebra and geometry.
!: Thinking elementarily equivalent structures must be isomorphic.
Q: Is the theory of real closed fields decidable? | Yes (Tarski).
Q: Are (ℚ, <) and (ℝ, <) isomorphic? | No: they differ in size.
SUM: Model theory links theories and structures.
SUM: It has strong algebraic applications.
SRC: Marker D, Model Theory: An Introduction (Springer 2002) | textbook | 2002 | https://link.springer.com/
SRC: Hodges W, A Shorter Model Theory (Cambridge University Press 1997) | textbook | 1997 | https://www.cambridge.org/
NUM1#maths-u16-44-q1@1: How many countable dense linear orders without endpoints are there, up to isomorphism? | 1 | 0 |  | Cantor's back-and-forth theorem shows every such order is isomorphic to (ℚ, <).
M1#maths-u16-44-q2@1: Which sentence is true in (ℚ, <) but false in (ℤ, <)? | Between any two elements lies a third | There is no greatest element | There is no least element | Every two elements are comparable | The order is irreflexive | Density holds in ℚ, but nothing lies strictly between 0 and 1 in ℤ.
M2#maths-u16-44-q3@2: What did Tarski's quantifier elimination show about real numbers? | The first-order theory of (ℝ, +, ·, <) is decidable | Every real number is rational | ℝ is countable | Real arithmetic is undecidable | ℝ has no models | Removing quantifiers reduces questions to checking polynomial sign conditions, which is algorithmic.

## Gödel's Incompleteness Theorems
S: Gödel's incompleteness theorems (1931) show that any consistent, effectively axiomatised theory strong enough for basic arithmetic leaves some true statements unprovable, and can't prove its own consistency. They set permanent limits on formal mathematics.
O: State the first and second incompleteness theorems precisely
O: Outline the idea of the Gödel sentence
T: First incompleteness theorem | A consistent, effectively axiomatised theory containing basic arithmetic has a sentence it can neither prove nor refute
T: Second incompleteness theorem | Such a theory can't prove its own consistency
H: The idea
- Gödel numbering codes formulas and proofs as numbers.
- "x is a proof of y" becomes an arithmetic relation.
- Diagonalisation builds G that says "G is not provable".
- If the theory proves G it proves something false; so (if consistent and sound) G is true but unprovable.
H: Conditions matter
- Effectively axiomatised: a program can list the axioms.
- Strong enough: Robinson arithmetic Q suffices.
- Complete decidable theories exist for weaker systems: Presburger arithmetic and real closed fields.
H: Consequences and misreadings
- Hilbert's programme can't be completed as planned.
- It doesn't say "mathematics is inconsistent" or "truth is relative".
- Natural unprovable statements: Goodstein's theorem and Paris–Harrington for PA.
X: Explain why "this sentence is unprovable" can't be false in a sound theory.
> Suppose G ("G is unprovable") were false
> Then G would be provable
> A sound theory proves only true sentences, so G would be true: contradiction; G is true and unprovable
K: Gödel numbering and diagonalisation build a true but unprovable sentence; consistent theories can't prove their consistency; the theorems need effectiveness and enough arithmetic.
!: Applying incompleteness to theories that are too weak or not effectively axiomatised.
Q: Is Presburger arithmetic (addition only) complete? | Yes.
Q: What does the second theorem say? | A consistent theory of this kind can't prove its own consistency.
SUM: Arithmetic can't be fully axiomatised.
SUM: Consistency can't be self-proved.
SRC: Gödel K, Über formal unentscheidbare Sätze der Principia Mathematica und verwandter Systeme I, Monatshefte für Mathematik und Physik 38, 173 | journal | 1931 | https://doi.org/10.1007/BF01700692
SRC: Smith P, An Introduction to Gödel's Theorems (2nd edn, Cambridge University Press 2013) | textbook | 2013 | https://www.cambridge.org/
NUM1#maths-u16-45-q1@1: Using Gödel's coding 2^{a}·3^{b} for a pair (a, b), what number codes (2, 1)? | 12 | 0 |  | 2^{2} × 3^{1} = 4 × 3 = 12, and unique factorisation lets the pair be recovered.
M1#maths-u16-45-q2@1: Which theory escapes the first incompleteness theorem because it's too weak? | Presburger arithmetic, with addition but no multiplication | Peano arithmetic | ZFC set theory | Robinson arithmetic Q | Second-order arithmetic | Without multiplication, it can't code proofs, and it's complete and decidable.
M3#maths-u16-45-q3@2: Why doesn't incompleteness mean ZFC's unprovable statements are unknowable forever? | Stronger axioms can prove them, though the new theory has its own unprovable sentences | Every statement is eventually proved in ZFC given enough time | Unprovable statements are all false, so nothing remains unknown | Incompleteness applies only to ZFC, not to stronger theories | It does: unprovable statements can never be settled at all | Adding Con(ZFC) or large cardinals settles some, but incompleteness reappears at each level.

## Computability Theory
S: Computability theory asks which problems can be solved by an algorithm at all. Turing's machines gave a precise definition of computation and showed some problems, such as the halting problem, can never be solved by any program.
O: Describe Turing machines and the Church–Turing thesis
O: Prove the halting problem is undecidable and use reductions
T: Turing machine | An abstract machine with a tape, a head and finitely many states, reading and writing symbols by fixed rules
T: Halting problem | Deciding whether a given program halts on a given input; it's undecidable
H: Models of computation
- Turing machines, λ-calculus, recursive functions and register machines all compute the same functions.
- Church–Turing thesis: these capture every effectively calculable function.
- Universal Turing machine: one machine simulates any other (stored-program computers).
H: Undecidability
- Halting problem: if H decided halting, build D that does the opposite of H on itself; D(D) halts iff it doesn't.
- Reductions spread undecidability: Rice's theorem says every non-trivial property of what programs compute is undecidable.
- Hilbert's tenth problem (integer solutions of polynomials) is undecidable (Matiyasevich 1970).
H: Degrees of unsolvability
- Some sets are semi-decidable (listable): halting programs can be listed.
- Turing degrees compare how unsolvable problems are.
- Oracles and the arithmetical hierarchy classify further.
X: Outline why no program H(P, x) can decide whether P halts on input x.
> Suppose H exists; define D(P): if H(P, P) says "halts", loop forever, else halt
> Run D(D): if it halts, H(D, D) said "doesn't halt"; if it loops, H said "halts"
> Either way H is wrong, so H can't exist
K: Turing machines define computation; the Church–Turing thesis says they capture all algorithms; the halting problem is undecidable; Rice's theorem and reductions extend this.
!: Confusing undecidable with merely slow (undecidable means no algorithm at all).
Q: Is the set of halting programs listable? | Yes (semi-decidable), but not decidable.
Q: What does Rice's theorem say? | Every non-trivial semantic property of programs is undecidable.
SUM: Some problems have no algorithm.
SUM: Diagonalisation proves it.
SRC: Turing AM, On computable numbers, with an application to the Entscheidungsproblem, Proceedings of the London Mathematical Society 42, 230 | journal | 1936 | https://doi.org/10.1112/plms/s2-42.1.230
SRC: Sipser M, Introduction to the Theory of Computation (3rd edn, Cengage 2012) | textbook | 2012 | https://www.cengage.com/
NUM1#maths-u16-46-q1@1: In what year did Matiyasevich complete the proof that Hilbert's tenth problem is undecidable? | 1970 | 0 |  | Building on Davis, Putnam and Robinson, Matiyasevich finished the proof in 1970.
M1#maths-u16-46-q2@1: What does the Church–Turing thesis claim? | Every effectively calculable function is Turing computable | Every function is computable | Turing machines are faster than computers | The halting problem is decidable | λ-calculus is weaker than Turing machines | It identifies the informal idea of an algorithm with Turing computability.
M2#maths-u16-46-q3@2: Which problem is undecidable by Rice's theorem? | Whether a program outputs 0 on every input | Whether a program's source has 100 lines | Whether a program contains a loop keyword | Whether a file is a valid program | Whether two strings are equal | It's a non-trivial property of the function computed, so no algorithm can decide it.

## Recursive Functions
S: The recursive functions are built from simple starting functions by composition, primitive recursion and minimisation. They give a definition of computable function independent of machines, and they match exactly what Turing machines compute.
O: Build functions by primitive recursion
O: Distinguish primitive recursive and general recursive functions
T: Primitive recursion | Defining f(0, y) = g(y) and f(n + 1, y) = h(n, f(n, y), y) from known g and h
T: μ-operator | Minimisation: μn [f(n, y) = 0], the least n making f zero, which may not exist
H: Building blocks
- Zero, successor and projection functions.
- Composition and primitive recursion give addition, multiplication, exponentiation, factorial.
- These primitive recursive functions are total and always terminate.
H: Beyond primitive recursion
- The Ackermann function is computable but grows too fast to be primitive recursive.
- Adding the μ-operator gives the general (partial) recursive functions.
- Kleene: general recursive functions = Turing computable functions.
H: Uses
- Gödel used primitive recursive functions to code syntax.
- Recursion theory studies sets definable by these functions.
- Programming: loops with fixed bounds are primitive recursive; while loops need μ.
X: Define addition by primitive recursion and compute 2 + 3.
> add(0, y) = y; add(n + 1, y) = S(add(n, y)), where S is successor
> add(2, 3) = S(add(1, 3)) = S(S(add(0, 3)))
> = S(S(3)) = 5
K: Primitive recursive functions come from zero, successor, projections, composition and recursion; Ackermann's function exceeds them; μ gives all computable functions.
!: Thinking every computable total function is primitive recursive.
Q: Is factorial primitive recursive? | Yes.
Q: Which function is computable but not primitive recursive? | The Ackermann function.
SUM: Recursion builds computable functions.
SUM: μ completes the class.
SRC: Kleene SC, Introduction to Metamathematics (North-Holland 1952) | textbook | 1952 | https://www.elsevier.com/
SRC: Boolos GS, Burgess JP, Jeffrey RC, Computability and Logic (5th edn, Cambridge University Press 2007) | textbook | 2007 | https://www.cambridge.org/
NUM1#maths-u16-47-q1@1: With mult(0, y) = 0 and mult(n + 1, y) = add(mult(n, y), y), compute mult(4, 6). | 24 | 0 |  | Each step adds 6 once more: 0, 6, 12, 18, 24, so mult(4, 6) = 24.
M1#maths-u16-47-q2@1: Which operation takes us from primitive recursive to general recursive functions? | The μ-operator (unbounded minimisation) | Composition of functions | Primitive recursion on two variables | Adding the successor function | Using projection functions | Unbounded search may never stop, giving partial functions and all computable ones.
M3#maths-u16-47-q3@2: Why can't the Ackermann function be primitive recursive? | It eventually outgrows every primitive recursive function, each of which is bounded by some fixed level of Ackermann's | It isn't computable, so it lies outside every class of recursive functions | It is undefined for large inputs, so it isn't a total function at all | It uses only the successor function, which is too weak to count as recursion | It is primitive recursive, being defined by a double recursion on two variables | Each primitive recursive function is dominated by A(k, ·) for some k, but A(n, n) dominates all of these.

## Lambda Calculus
S: The lambda calculus, created by Alonzo Church in the 1930s, describes computation using only function definition and application. It's as powerful as Turing machines and is the theoretical core of functional programming languages such as Haskell and Lisp.
O: Perform β-reduction on lambda terms
O: Encode numbers and booleans as lambda terms
T: λ-abstraction | λx. M, the function sending x to M
T: β-reduction | (λx. M) N → M with N substituted for x
H: Syntax
- Terms are variables, abstractions λx. M and applications M N.
- Identity: λx. x. Constant function: λx. λy. x.
- Free and bound variables; α-conversion renames bound variables.
H: Encoding data
- Church booleans: true = λx. λy. x, false = λx. λy. y.
- Church numerals: n = λf. λx. fⁿ(x), applying f n times.
- Successor: λn. λf. λx. f (n f x).
- The Y combinator gives recursion: Y f = f (Y f).
H: Theory
- Church–Rosser: if a term reduces to a normal form, that form is unique.
- Some terms never reach normal form: (λx. x x)(λx. x x).
- Typed λ-calculi guarantee termination and connect with logic (see Type Theory).
X: Reduce (λx. λy. x) a b.
> Apply to a: (λx. λy. x) a → λy. a
> Apply to b: (λy. a) b → a
> Result a: this term is the Church boolean "true" choosing its first argument
K: λ-calculus has variables, abstraction and application; β-reduction computes; numerals and booleans can be encoded; the Y combinator gives recursion; normal forms are unique when they exist.
!: Capturing free variables during substitution instead of renaming bound ones first.
Q: Who created the lambda calculus? | Alonzo Church.
Q: What is (λx. x) y? | y.
SUM: λ-calculus is computation by functions.
SUM: It underlies functional programming.
SRC: Barendregt HP, The Lambda Calculus: Its Syntax and Semantics (rev. edn, North-Holland 1984) | textbook | 1984 | https://www.elsevier.com/
SRC: Church A, An unsolvable problem of elementary number theory, American Journal of Mathematics 58(2), 345 | journal | 1936 | https://doi.org/10.2307/2371045
NUM1#maths-u16-48-q1@1: The Church numeral 3 applies f three times. Applying it to f = (add 2) and x = 1, what is the result? | 7 | 0 |  | f(f(f(1))) = 1 + 2 + 2 + 2 = 7.
M1#maths-u16-48-q2@1: What does (λx. λy. y) a b reduce to? | b | a | λy. y | a b | λx. x | The first application discards a, leaving λy. y, which returns b: this is "false".
M2#maths-u16-48-q3@2: Which term has no normal form? | (λx. x x)(λx. x x) | λx. x | (λx. x) y | λx. λy. x | (λx. y) z | It reduces to itself forever, so β-reduction never terminates.

## Type Theory
S: Type theory classifies every term by a type, preventing nonsense like adding a number to a function. Martin-Löf type theory and its descendants serve both as programming languages and as foundations of mathematics, where proofs are programs and propositions are types.
O: Explain types, typing judgements and the Curry–Howard correspondence
O: Describe dependent types and their role in proof assistants
T: Dependent type | A type that depends on a value, such as Vector(n), lists of length n
T: Curry–Howard correspondence | Propositions as types and proofs as programs
H: Simple types
- Russell introduced types (1908) to avoid paradoxes.
- Church's simply typed λ-calculus: every typed term terminates.
- Typing judgement: Γ ⊢ t : A, "in context Γ, t has type A".
H: Propositions as types
- A → B: functions, or implications.
- A × B: pairs, or conjunction. A + B: tagged unions, or disjunction.
- Π-types (dependent functions) are ∀; Σ-types (dependent pairs) are ∃.
H: In practice
- Martin-Löf type theory (1970s), the calculus of constructions (Coq/Rocq), Lean's type theory.
- Homotopy type theory reads types as spaces and equality as paths (univalence).
- Mathlib and other libraries formalise mathematics in these systems.
X: Give a program of type A × B → B × A and explain the corresponding proof.
> λp. (snd p, fst p) takes a pair and swaps it
> Its type is A × B → B × A
> Under Curry–Howard it's a proof that A ∧ B implies B ∧ A
K: Types classify terms and block nonsense; typed λ-calculi terminate; Curry–Howard identifies propositions with types and proofs with programs; dependent types power proof assistants.
!: Thinking type theory is just a programming tool rather than a foundation for mathematics.
Q: What type corresponds to "A implies B"? | The function type A → B.
Q: Which quantifier corresponds to Π-types? | ∀ (for all).
SUM: Types classify terms.
SUM: Proofs are programs.
SRC: Martin-Löf P, Intuitionistic Type Theory (Bibliopolis 1984) | textbook | 1984 | https://archive-pml.github.io/
SRC: The Univalent Foundations Program, Homotopy Type Theory: Univalent Foundations of Mathematics (Institute for Advanced Study 2013) | textbook | 2013 | https://homotopytypetheory.org/book/
NUM1#maths-u16-49-q1@1: How many distinct functions of type Bool → Bool are there, where Bool has 2 values? | 4 | 0 |  | Each of the 2 inputs can map to either of 2 outputs, giving 2^{2} = 4 functions.
M1#maths-u16-49-q2@1: Under Curry–Howard, what does a term of type A × B correspond to? | A proof of A and B | A proof of A or B | A proof that A implies B | A proof of not A | A proof that A equals B | A pair contains evidence for both components, matching conjunction.
M2#maths-u16-49-q3@2: What is a dependent type? | A type that depends on a value, such as vectors of length n | A type that can't be used | A type with no elements | A type equal to every other | A type of booleans | Dependent types let types mention values, expressing precise specifications.

## Constructive Mathematics
S: Constructive mathematics requires that existence proofs show how to find the object. Built on intuitionistic logic, it yields algorithms from proofs and connects naturally to computer science, though some classical theorems need changes.
O: Distinguish constructive and classical existence proofs
O: Describe the main schools and the computational content of proofs
T: Constructive existence proof | A proof of ∃x P(x) that provides a method to compute such an x
T: Bishop's constructive analysis | A development of real analysis using only constructive methods (Bishop 1967)
H: Schools
- Brouwer's intuitionism (with choice sequences, sometimes contradicting classical results).
- Bishop-style constructive mathematics, compatible with classical mathematics.
- Russian recursive mathematics (Markov): objects are computable.
H: What changes
- The intermediate value theorem holds in approximate form (for any ε, find x with |f(x)| < ε).
- Real numbers can't always be compared: x = 0 or x ≠ 0 isn't decidable.
- Proof by contradiction can still show negative statements ¬P.
H: Why use it
- Proofs give algorithms (program extraction in Coq and Agda).
- Finer distinctions between classically equivalent statements.
- Reverse mathematics and topos theory study the boundary.
X: Is "there is a prime greater than 10^{6}" provable constructively?
> Euclid's argument: take the product of primes up to 10^{6}, add 1, and factor it
> This gives a procedure to find a new prime, though it may be slow
> So yes: the proof is constructive, unlike proofs by excluded middle
K: Constructive proofs provide witnesses; schools include intuitionism, Bishop-style and recursive mathematics; some classical theorems become approximate; proofs yield programs.
!: Thinking constructive mathematics bans proof by contradiction entirely (it can prove negations).
Q: Who developed constructive real analysis in 1967? | Errett Bishop.
Q: Is x = 0 ∨ x ≠ 0 decidable for constructive reals? | No.
SUM: Constructive proofs compute.
SUM: Some classical results become approximate.
SRC: Bishop E, Foundations of Constructive Analysis (McGraw-Hill 1967) | textbook | 1967 | https://archive.org/
SRC: Bridges D, Palmgren E, Constructive mathematics, Stanford Encyclopedia of Philosophy | review | 2022 | https://plato.stanford.edu/entries/mathematics-constructive/
NUM1#maths-u16-50-q1@1: Euclid's construction from the primes 2, 3, 5, 7 gives 2 × 3 × 5 × 7 + 1. What is it? | 211 | 0 |  | 210 + 1 = 211, which happens to be prime, a new prime not on the list.
M1#maths-u16-50-q2@1: Which form of the intermediate value theorem is constructively provable? | For every ε > 0 there's an x with |f(x)| < ε | There's always an exact root found by trial | Every function has a root | Roots can be found by excluded middle | No form is provable | Approximate roots can be computed by bisection, though an exact root may not be.
M2#maths-u16-50-q3@2: What practical benefit does constructive proof offer in proof assistants? | Programs can be extracted from proofs automatically | Proofs become shorter in every case | It avoids needing any axioms | It makes every theorem decidable | It has no practical benefit | A constructive proof of ∀x ∃y P(x, y) contains an algorithm computing y from x.

## Category-Theoretic Foundations
S: Category-theoretic foundations describe mathematics through structures and maps rather than membership. Lawvere's elementary theory of the category of sets (ETCS) and topos theory offer alternatives to ZFC that match how mathematicians use structure.
O: Describe ETCS and elementary toposes
O: Compare structural and membership-based foundations
T: Elementary topos | A category with finite limits, exponentials and a subobject classifier, behaving like a universe of sets
T: ETCS | Lawvere's elementary theory of the category of sets: axioms about sets and functions, not membership
H: Structural foundations
- ETCS (Lawvere 1964): sets are objects, elements are maps from a one-point set.
- Equivalent in strength to a weak fragment of ZFC (bounded Zermelo with choice).
- It describes sets by their roles, avoiding junk theorems like 2 ∈ 3.
H: Toposes
- Every topos has an internal logic, typically intuitionistic.
- Sheaf toposes model variable sets; the effective topos models computability.
- Cohen's forcing can be seen as building a sheaf topos.
H: Further directions
- Univalent foundations and homotopy type theory (see Type Theory).
- ∞-categories in modern algebraic topology and geometry.
- Debate continues over which foundation is best; most mathematics works in any.
X: In ETCS, how is an element of a set A described?
> Fix a terminal object 1 (a one-point set)
> An element of A is a map x: 1 → A
> Applying f: A → B to x gives the composite f ∘ x: 1 → B
K: Category-theoretic foundations use objects and maps; ETCS axiomatises sets structurally; toposes are universes with intuitionistic internal logic; univalent foundations extend this.
!: Thinking category-theoretic foundations are inconsistent with ZFC (they're interpretable in each other at matching strength).
Q: Who proposed ETCS? | William Lawvere.
Q: What logic is internal to a general topos? | Intuitionistic logic.
SUM: Foundations can be structural.
SUM: Toposes are generalised universes of sets.
SRC: Lawvere FW, An elementary theory of the category of sets, PNAS 52(6), 1506 | journal | 1964 | https://doi.org/10.1073/pnas.52.6.1506
SRC: Mac Lane S, Moerdijk I, Sheaves in Geometry and Logic: A First Introduction to Topos Theory (Springer 1992) | textbook | 1992 | https://link.springer.com/
NUM1#maths-u16-51-q1@1: In ETCS, elements of A are maps 1 → A. How many maps are there from 1 to a 5-element set? | 5 | 0 |  | Each map from a one-point set picks out exactly one element, so there are 5.
M1#maths-u16-51-q2@1: What does a subobject classifier do in a topos? | It represents subobjects, as {true, false} does for subsets of sets | It counts the objects of the topos and their morphisms | It lists every morphism into each object of the topos | It makes the internal logic of the topos classical | It removes all limits so that only colimits remain | In Set, subsets of A correspond to maps A → {0, 1}; Ω generalises this.
M3#maths-u16-51-q3@2: Why are structural foundations said to avoid "junk theorems"? | They describe objects only by maps and properties, so facts like 2 ∈ 3 can't even be stated | They forbid all theorems about sets, so no junk can arise | They are inconsistent, so they prove junk and its negation | They use only finite sets, where encodings are unambiguous | They don't: junk theorems are provable in them just as in ZFC | Without a global membership relation, encoding accidents don't appear.

## Philosophy of Mathematics
S: The philosophy of mathematics asks what mathematical objects are and how we know mathematical truths. Platonism, formalism, intuitionism, logicism and structuralism give different answers, and the foundational crises around 1900 made these questions practical.
O: Compare the main positions in the philosophy of mathematics
O: Relate foundational results to philosophical debates
T: Platonism | The view that mathematical objects exist independently of minds and language
T: Formalism | The view that mathematics is the manipulation of symbols by rules, without needing reference to objects
H: Classic positions
- Logicism (Frege, Russell): mathematics reduces to logic.
- Formalism (Hilbert): mathematics is formal systems, secured by consistency proofs.
- Intuitionism (Brouwer): mathematics is mental construction.
- Platonism (Gödel): mathematical objects are real and discovered.
H: Impact of results
- Russell's paradox undermined Frege's logicism.
- Gödel's theorems blocked Hilbert's original programme.
- Independence results (CH) raise the question whether such statements have answers.
H: Contemporary views
- Structuralism: mathematics studies structures, not particular objects.
- The indispensability argument (Quine, Putnam): we should believe in what our best science needs.
- Fictionalism (Field): mathematics is a useful fiction.
- Wigner's "unreasonable effectiveness of mathematics" in physics.
X: How would a Platonist and a formalist differ on whether the continuum hypothesis has a truth value?
> Platonist: sets exist, so CH is true or false, even if ZFC can't decide it
> Formalist: CH is a formula that is neither provable nor refutable from ZFC; there's no further fact
> The disagreement motivates searches for new axioms (Gödel's programme)
K: Logicism, formalism, intuitionism and Platonism answer what mathematics is; paradoxes and Gödel reshaped them; structuralism, indispensability and fictionalism are modern options.
!: Assuming independence results settle philosophical questions on their own.
Q: Which programme did Russell's paradox undermine? | Frege's logicism.
Q: Who wrote about "the unreasonable effectiveness of mathematics"? | Eugene Wigner (1960).
SUM: Philosophy asks what mathematics is.
SUM: Foundational results inform the debate.
SRC: Shapiro S, Thinking about Mathematics: The Philosophy of Mathematics (Oxford University Press 2000) | textbook | 2000 | https://global.oup.com/
SRC: Wigner EP, The unreasonable effectiveness of mathematics in the natural sciences, Communications on Pure and Applied Mathematics 13(1), 1 | journal | 1960 | https://doi.org/10.1002/cpa.3160130102
NUM1#maths-u16-52-q1@1: In what year did Russell write to Frege about the paradox in his system? | 1902 | 0 |  | Russell's letter of June 1902 reached Frege as the second volume of his Grundgesetze was in press.
M1#maths-u16-52-q2@1: Which position holds that mathematics studies structures rather than particular objects? | Structuralism | Logicism | Formalism | Intuitionism | Fictionalism | Structuralists say "3" means a position in the natural number structure, not a specific set.
M2#maths-u16-52-q3@2: What is the indispensability argument? | We should believe in mathematical objects because our best scientific theories need them | Mathematics is invented, so it is useful fiction and nothing more | Mathematics reduces to logic, as Frege tried to show | Only mental constructions are real mathematical objects | Mathematics is meaningless symbols moved by fixed rules | Quine and Putnam argued commitment to science brings commitment to its mathematics.
`;
