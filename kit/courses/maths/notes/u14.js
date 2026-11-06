// School 14: Discrete Mathematics and Combinatorics. Format: kit/course/notes.js. Standard: docs/CURRICULUM_CONTENT_STANDARD.md
// Counting and its principles, advanced combinatorics, and the discrete mathematics of codes, algorithms, automata and games.
export default `
## Discrete Mathematics
S: Discrete mathematics studies countable, separate objects: integers, graphs, logical statements, finite sets and algorithms. It's the mathematical foundation of computer science, cryptography and network design.
O: Describe the main areas of discrete mathematics
O: Use counting and induction on discrete structures
T: Discrete structure | A set of separate objects with relations between them, such as a graph or a set of strings
T: Proof by induction | Prove P(1), then show P(k) implies P(k + 1), to establish P(n) for all n ≥ 1
H: Areas
- Logic and proof; sets, relations and functions (School 16).
- Combinatorics: counting and arranging (this school).
- Graph theory and networks (School 15); number theory (School 2).
- Algorithms, automata and complexity (this school).
H: Methods
- Counting arguments, bijections and recurrences.
- Induction for statements about all natural numbers or all finite structures.
- The pigeonhole principle and invariants.
H: Why it matters
- Computers store and manipulate discrete data: bits, strings, graphs.
- Discrete models underpin databases, networks, scheduling, coding and cryptography.
X: Use induction to show an n-element set has 2ⁿ subsets.
> Base: the empty set has 1 = 2^{0} subset
> Step: a set with k + 1 elements has subsets that omit the new element (2ᵏ) and subsets that include it (2ᵏ)
> Total 2 × 2ᵏ = 2^{k+1}, so the result holds for all n ∎
K: Discrete maths studies separate objects; key tools are counting, induction, recurrences and logic; it underlies computing.
!: Proving only the base case and the step for one specific k rather than general k.
Q: How many binary strings of length 8 are there? | 256.
Q: What are the two parts of an induction proof? | The base case and the inductive step.
SUM: Discrete maths studies countable structures.
SUM: It's the mathematics of computing.
SRC: Rosen KH, Discrete Mathematics and Its Applications (8th edn, McGraw-Hill 2019) | textbook | 2019 | https://www.mheducation.com/
SRC: Biggs NL, Discrete Mathematics (2nd edn, Oxford University Press 2002) | textbook | 2002 | https://global.oup.com/
NUM1#maths-u14-01-q1@1: How many binary strings of length 10 are there? | 1024 | 0 |  | Each position has 2 choices: 2^{10} = 1,024.
M1#maths-u14-01-q2@1: Which area belongs to discrete rather than continuous mathematics? | Graph theory | Differential equations | Real analysis | Fluid dynamics | Calculus of variations | Graphs consist of separate vertices and edges.
M2#maths-u14-01-q3@2: Why is discrete mathematics central to computer science? | Computers store and process separate symbols, bits and structures | Computers can only do calculus | It avoids proofs | Continuous maths is incorrect | It isn't central | Data, programs and networks are discrete objects.

## Combinatorics
S: Combinatorics is the mathematics of counting, arranging and selecting. It asks how many ways something can be done, whether a structure exists, and how to build or optimise it, with answers that feed probability, computer science and chemistry.
O: Recognise counting, existence and construction problems
O: Count lattice paths and other standard structures
T: Bijective proof | Proving two sets have the same size by pairing their elements exactly
T: Catalan numbers | Cₙ = C(2n, n)/(n + 1): 1, 1, 2, 5, 14, 42, …, counting many nested structures
H: Kinds of question
- Enumeration: how many? (arrangements, subsets, paths).
- Existence: is there one? (pigeonhole, Ramsey theory).
- Construction and optimisation: build the best one (designs, codes).
H: Classic counts
- Lattice paths from (0, 0) to (m, n) using right and up steps: C(m + n, n).
- Catalan numbers count balanced bracket sequences, binary trees and triangulations of polygons.
- Bijections often explain why two counts agree.
H: Tools
- Counting principles, permutations and combinations.
- Recurrences and generating functions.
- Inclusion–exclusion and the pigeonhole principle (later in this school).
X: Count the shortest lattice paths from (0, 0) to (3, 2), and the balanced arrangements of 3 pairs of brackets.
> A path is 5 steps, 3 right and 2 up: choose which 2 are up: C(5, 2) = 10
> Brackets: C₃ = C(6, 3)/4 = 20/4 = 5
> They are ((())), (()()), (())(), ()(()), ()()()
K: Combinatorics counts, proves existence and constructs; lattice paths are C(m + n, n); Catalan numbers count nested structures; bijections explain equal counts.
!: Counting lattice paths as m × n instead of choosing step positions.
Q: What is the third Catalan number C₃? | 5.
Q: How many shortest paths go from (0, 0) to (2, 2)? | 6.
SUM: Combinatorics counts and constructs.
SUM: Bijections reveal hidden equalities.
SRC: Stanley RP, Enumerative Combinatorics, vol 1 (2nd edn, Cambridge University Press 2011) | textbook | 2011 | https://www.cambridge.org/
SRC: Graham RL, Knuth DE, Patashnik O, Concrete Mathematics (2nd edn, Addison-Wesley 1994) | textbook | 1994 | https://www.pearson.com/
NUM1#maths-u14-02-q1@1: Find the Catalan number C₄. | 14 | 0 |  | C(8, 4)/5 = 70/5 = 14.
M1#maths-u14-02-q2@1: How many shortest lattice paths go from (0, 0) to (4, 3)? | 35 | 12 | 7 | 70 | 24 | Choose the 3 up-steps among 7: C(7, 3) = 35.
M2#maths-u14-02-q3@2: What does a bijective proof show? | Two sets have the same size, by pairing their elements exactly | A formula holds for small cases, so it holds for all cases | A set is infinite | A formula is false | Nothing about size | A one-to-one correspondence proves equal cardinality.

## Counting Principles
S: The basic counting principles (add for "or", multiply for "and", subtract the complement, divide out overcounting) solve a huge range of problems. Choosing the right principle is most of the work.
O: Apply the sum, product and complement principles
O: Correct for overcounting by division
T: Product rule | If a task has stages with m and n options, there are mn ways overall
T: Complement principle | Count what you don't want and subtract from the total
H: Sum and product
- Sum rule: disjoint choices add (a dessert or a cheese: 4 + 3 options).
- Product rule: successive choices multiply (3 shirts × 4 trousers = 12 outfits).
- Number plates, passwords and menus are product-rule problems.
H: Complements and overcounting
- "At least one" is usually easier as total − none.
- Division rule: if each outcome is counted k times, divide by k (seating round a table: n!/n).
- Bijections: count an easier set of the same size.
H: Pitfalls
- Order matters or not? Repetition allowed or not?
- Make sure cases are disjoint before adding.
- Check with a small example.
X: How many 4-digit PINs (digits 0–9) have at least one repeated digit?
> Total PINs: 10^{4} = 10,000
> All digits different: 10 × 9 × 8 × 7 = 5,040
> At least one repeat: 10,000 − 5,040 = 4,960
- Example: a restaurant's 4 starters, 6 mains and 3 desserts give 4 × 6 × 3 = 72 three-course meals.
K: Add for disjoint alternatives, multiply for successive stages, subtract complements, divide out overcounting; decide whether order and repetition matter.
!: Adding counts of overlapping cases.
Q: A café offers 5 mains and 3 desserts. How many main-plus-dessert meals? | 15.
Q: How many ways can 6 people sit round a circular table (rotations the same)? | 120.
SUM: Add, multiply, subtract, divide.
SUM: Choose the principle carefully.
SRC: Rosen KH, Discrete Mathematics and Its Applications (8th edn, McGraw-Hill 2019) | textbook | 2019 | https://www.mheducation.com/
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
NUM1#maths-u14-03-q1@1: How many 4-digit PINs have at least one repeated digit? | 4960 | 0 |  | 10,000 − 10 × 9 × 8 × 7 = 4,960.
M1#maths-u14-03-q2@1: Number plates have 2 letters then 3 digits. How many are possible? | 676,000 | 46,800 | 26,000 | 6,760 | 175,760 | Multiply the choices for each position: 26 × 26 × 10 × 10 × 10 = 676,000.
M3#maths-u14-03-q3@2: How many 3-letter strings from A–Z contain at least one vowel (A, E, I, O, U)? | 8,315 | 9,261 | 2,197 | 5,000 | 125 | Total 17,576 minus 21^{3} = 9,261 with no vowels.

## Permutations
S: A permutation is an ordered arrangement. Counting permutations answers questions about rankings, seatings, passwords and anagrams, using factorials and adjustments for repeated items.
O: Count permutations with and without repetition
O: Handle repeated items, circular arrangements and derangements
T: Factorial | n! = n × (n − 1) × … × 1, with 0! = 1
T: Permutations of r from n | P(n, r) = n!/(n − r)!
H: Basic counts
- Arranging n distinct objects: n!.
- Choosing and ordering r from n: P(n, r).
- With repetition allowed: nʳ.
H: Special cases
- Repeated items: n!/(n₁! n₂! …), as in anagrams of MISSISSIPPI.
- Circular arrangements: (n − 1)!.
- Derangements (no item in its original place): D_{n} ≈ n!/e (see Inclusion–Exclusion).
H: Growth
- Factorials grow faster than exponentials: 10! = 3,628,800 and 20! ≈ 2.4 × 10^{18}.
- Stirling's approximation: n! ≈ √(2πn)(n/e)ⁿ.
- That's why brute force over all orderings (travelling salesperson) is hopeless for large n.
X: How many distinct arrangements are there of the letters of MISSISSIPPI?
> 11 letters: M once, I four times, S four times, P twice
> 11!/(4! × 4! × 2!) = 39,916,800/(24 × 24 × 2)
> = 34,650
- Example: the 26 letters can be arranged in 26! ≈ 4 × 10^{26} orders, which is why brute-force substitution cracking fails.
- Ranking problems (first, second, third) are permutations; committees aren't.
K: n! arrangements; P(n, r) = n!/(n − r)!; divide by repeats' factorials; circular is (n − 1)!; factorials grow extremely fast.
!: Forgetting to divide by the factorials of repeated letters.
Q: How many ways can 5 runners finish first, second and third? | P(5, 3) = 60.
Q: What is 0!? | 1.
SUM: Permutations count orderings.
SUM: Adjust for repeats and symmetry.
SRC: Rosen KH, Discrete Mathematics and Its Applications (8th edn, McGraw-Hill 2019) | textbook | 2019 | https://www.mheducation.com/
SRC: Graham RL, Knuth DE, Patashnik O, Concrete Mathematics (2nd edn, Addison-Wesley 1994) | textbook | 1994 | https://www.pearson.com/
NUM1#maths-u14-04-q1@1: Find P(10, 3). | 720 | 0 |  | 10 × 9 × 8 = 720.
M1#maths-u14-04-q2@1: How many arrangements are there of the letters of LEVEL? | 30 | 120 | 60 | 20 | 10 | 5!/(2! × 2!) = 120/4 = 30 (two Ls and two Es).
M2#maths-u14-04-q3@2: How many ways can 7 people sit around a round table, if only relative positions matter? | 720 | 5,040 | 840 | 49 | 120 | Fix one person to remove rotations: (7 − 1)! = 720.

## Combinations
S: A combination is a selection where order doesn't matter: a committee, a lottery ticket, a hand of cards. The binomial coefficient C(n, r) counts them, and the stars-and-bars method counts selections with repetition.
O: Count combinations and use Pascal's rule
O: Solve problems with restrictions and with repetition
T: Binomial coefficient | C(n, r) = n!/(r!(n − r)!), the number of r-element subsets of an n-element set
T: Stars and bars | The number of ways to put n identical items into k groups is C(n + k − 1, k − 1)
H: Properties
- Symmetry: C(n, r) = C(n, n − r).
- Pascal's rule: C(n, r) = C(n − 1, r − 1) + C(n − 1, r).
- Σ_{r} C(n, r) = 2ⁿ.
H: Restrictions
- "At least one" via complements: committees with at least one woman = all − all-men.
- Fixed members: include them, then choose the rest.
- Cases: split into disjoint cases and add.
H: With repetition
- Choosing r items from n types, repetition allowed: C(n + r − 1, r).
- Distributing 10 identical sweets among 3 children: C(12, 2) = 66.
X: A committee of 3 is chosen from 6 men and 4 women. How many committees include at least one woman?
> All committees: C(10, 3) = 120
> All-men committees: C(6, 3) = 20
> At least one woman: 120 − 20 = 100
- Example: the UK Lotto chooses 6 of 59 numbers: C(59, 6) = 45,057,474 possible tickets.
- C(n, r) also counts lattice paths and binary strings with r ones.
- Check by a small case: C(4, 2) = 6 pairs from {a, b, c, d}.
K: C(n, r) counts unordered selections; use symmetry, Pascal's rule and complements; stars and bars handles repetition.
!: Using permutations when order doesn't matter, overcounting by r!.
Q: What is C(8, 2)? | 28.
Q: How many subsets does a 6-element set have? | 64.
SUM: Combinations count selections.
SUM: Stars and bars counts distributions.
SRC: Rosen KH, Discrete Mathematics and Its Applications (8th edn, McGraw-Hill 2019) | textbook | 2019 | https://www.mheducation.com/
SRC: Department for Education, Mathematics AS and A level subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
NUM1#maths-u14-05-q1@1: In how many ways can 10 identical sweets be shared among 3 children (some may get none)? | 66 | 0 |  | Stars and bars: C(10 + 3 − 1, 2) = C(12, 2) = 66.
M1#maths-u14-05-q2@1: How many 5-card hands can be dealt from a 52-card pack? | 2,598,960 | 311,875,200 | 260 | 380,204,032 | 1,326 | C(52, 5) = 2,598,960; order doesn't matter in a hand.
M3#maths-u14-05-q3@2: How many ways can 3 of 8 people be chosen if two particular people refuse to serve together? | 50 | 56 | 6 | 336 | 20 | All C(8, 3) = 56 minus those with both: 6 (choose the third from 6).

## Binomial Theorem
S: The binomial theorem expands (a + b)ⁿ using binomial coefficients, connecting algebra to counting. Pascal's triangle displays the coefficients, and Newton's generalisation to any power gives important series.
O: Expand (a + b)ⁿ and find specific coefficients
O: Use the general binomial series for approximations
T: Binomial theorem | (a + b)ⁿ = Σ_{k=0}^{n} C(n, k) a^{n−k}b^{k}
T: General binomial series | (1 + x)^{α} = 1 + αx + α(α − 1)x^{2}/2! + …, valid for |x| < 1
H: Why the coefficients are binomial
- Expanding (a + b)ⁿ picks a or b from each of n brackets.
- The number of ways to pick b exactly k times is C(n, k).
- Pascal's triangle: each entry is the sum of the two above.
H: Using it
- Coefficient of x³ in (2 + x)⁵: C(5, 3) × 2^{2} = 40.
- Setting a = b = 1 gives Σ C(n, k) = 2ⁿ; a = 1, b = −1 gives alternating sum 0.
- Approximations: 1.01^{10} ≈ 1 + 10 × 0.01 + 45 × 0.0001 = 1.1045.
H: General powers
- For non-integer or negative α, the series is infinite.
- √(1 + x) ≈ 1 + x/2 − x^{2}/8 for small x.
- Newton found the general series around 1665.
X: Find the coefficient of x^{3} in (2 + x)^{5}.
> The term with x^{3} has k = 3: C(5, 3) × 2^{5−3} × x^{3}
> = 10 × 4 × x^{3}
> The coefficient is 40
- The middle coefficient C(2n, n) is the largest in row 2n.
K: (a + b)ⁿ = Σ C(n, k)a^{n−k}b^{k}; coefficients come from Pascal's triangle; the general series extends to any power for |x| < 1.
!: Forgetting to raise the constant term to its power (writing C(5, 3) × 2 instead of × 2^{2}).
Q: What is the sum of the coefficients of (1 + x)^{7}? | 2^{7} = 128.
Q: What is the first-order approximation to (1 + x)^{−1} for small x? | 1 − x.
SUM: The binomial theorem expands powers by counting.
SUM: Newton extended it to any exponent.
SRC: Department for Education, Mathematics AS and A level subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Graham RL, Knuth DE, Patashnik O, Concrete Mathematics (2nd edn, Addison-Wesley 1994) | textbook | 1994 | https://www.pearson.com/
NUM1#maths-u14-06-q1@1: Find the coefficient of x^{2} in (1 − 3x)^{6}. | 135 | 0 |  | C(6, 2) × (−3)^{2} = 15 × 9 = 135.
M1#maths-u14-06-q2@1: What is the fourth row (n = 4) of Pascal's triangle? | 1, 4, 6, 4, 1 | 1, 3, 3, 1 | 1, 4, 4, 1 | 1, 5, 10, 10, 5, 1 | 1, 2, 3, 2, 1 | Row n lists C(n, k) for k = 0 to n; for n = 4 that's 1, 4, 6, 4, 1.
M2#maths-u14-06-q3@2: Using the binomial series, what is √(1.02) to 4 decimal places? | 1.0100 | 1.0200 | 1.0010 | 1.0141 | 0.9900 | 1 + 0.02/2 − 0.0004/8 = 1.00995 ≈ 1.0100.

## Pigeonhole Principle
S: If more than n pigeons go into n holes, some hole has at least two. This simple principle proves surprising existence results: shared birthdays, repeated remainders and close points, without finding them explicitly.
O: Apply the basic and generalised pigeonhole principle
O: Choose suitable "pigeons" and "holes" in proofs
T: Pigeonhole principle | If N objects are placed in k boxes and N > k, some box contains at least two
T: Generalised pigeonhole | Some box contains at least ⌈N/k⌉ objects
H: Examples
- Among 13 people, two share a birth month.
- Among any 6 integers, two have the same remainder mod 5, so their difference is divisible by 5.
- Five points in a unit square: split it into four half-size squares, so two points are within √2/2 of each other.
H: Choosing the holes
- Remainders, ranges, colours, sub-regions or pairs summing to a fixed total.
- Example: any 6 numbers from 1–10 include two that add to 11 (holes: {1, 10}, {2, 9}, …, {5, 6}).
H: Deeper uses
- Dirichlet's approximation theorem (School 2).
- Ramsey theory is a vast generalisation (later in this school).
- Lossless compression can't shrink every file: there are fewer short files than long ones.
X: How many people guarantee that three share a birth month?
> Months are holes (12); we want some hole with ≥ 3
> 24 people could be exactly two per month
> 25 people force ⌈25/12⌉ = 3 in some month
K: N > k objects in k boxes force a shared box; generalised: some box has ⌈N/k⌉; the art is choosing the boxes.
!: Choosing holes that don't guarantee the property you need.
Q: How many socks must you take from a drawer of red and blue socks to be sure of a matching pair? | 3.
Q: Why can't a compression algorithm shorten every file? | There are fewer shorter files than files of a given length (pigeonhole).
SUM: Too many pigeons force a shared hole.
SUM: Choosing holes is the skill.
SRC: Engel A, Problem-Solving Strategies (Springer 1998) | textbook | 1998 | https://link.springer.com/
SRC: Rosen KH, Discrete Mathematics and Its Applications (8th edn, McGraw-Hill 2019) | textbook | 2019 | https://www.mheducation.com/
NUM1#maths-u14-07-q1@1: What is the minimum number of people needed to guarantee that 3 share a birth month? | 25 | 0 |  | 2 × 12 + 1 = 25.
M1#maths-u14-07-q2@1: Any 6 numbers chosen from 1 to 10 must include what? | Two that add to 11 | Two that are equal | Three primes | Two that multiply to 10 | Two consecutive odd numbers | The five pairs {1, 10}, …, {5, 6} are the holes.
M2#maths-u14-07-q3@2: Why must any 11 integers include two whose difference is divisible by 10? | There are only 10 possible last digits | Integers are infinite | All integers are even | Differences are always divisible by 10 | It isn't true | Two share a remainder mod 10, so their difference is a multiple of 10.

## Inclusion–Exclusion Principle
S: Inclusion–exclusion counts the union of overlapping sets by adding sizes, subtracting pairwise overlaps, adding back triple overlaps and so on. It counts divisibility, derangements and surjections.
O: Apply inclusion–exclusion for two and three sets
O: Count derangements and other structures with the general formula
T: Inclusion–exclusion | |A ∪ B ∪ C| = |A| + |B| + |C| − |A ∩ B| − |A ∩ C| − |B ∩ C| + |A ∩ B ∩ C|
T: Derangement | A permutation with no fixed points; D_{n} = n! Σ_{k=0}^{n} (−1)^{k}/k!
H: The idea
- Adding set sizes counts overlaps more than once; alternately subtract and add to correct.
- General: |∪ A_{i}| = Σ|A_{i}| − Σ|A_{i} ∩ A_{j}| + … ± |A₁ ∩ … ∩ Aₙ|.
- Complement form: elements in none of the sets.
H: Applications
- Divisibility counts (numbers up to N divisible by 2, 3 or 5).
- Derangements: D₄ = 9; D_{n}/n! → 1/e ≈ 0.368 (the hat-check problem).
- Euler's totient φ(n) and surjection counts.
H: Probability
- P(A ∪ B ∪ C) follows the same pattern (School 12).
- Bonferroni inequalities give bounds by truncating the sum.
X: How many integers from 1 to 100 are divisible by 2, 3 or 5?
> Singles: 50 + 33 + 20 = 103
> Pairs: divisible by 6, 10, 15: 16 + 10 + 6 = 32; triple: divisible by 30: 3
> Total: 103 − 32 + 3 = 74
- Example: surjections from a 4-set onto a 2-set number 2^{4} − 2 = 14 (subtracting the 2 constant maps).
- Venn diagrams make the two- and three-set cases visible.
K: Add singles, subtract pairs, add triples, alternating; use it for divisibility, derangements and surjections; derangement probability tends to 1/e.
!: Forgetting to add back the triple intersection.
Q: What is D₃, the number of derangements of 3 items? | 2.
Q: What does the probability that a random permutation is a derangement approach? | 1/e ≈ 0.368.
SUM: Inclusion–exclusion corrects overlaps.
SUM: Signs alternate.
SRC: Stanley RP, Enumerative Combinatorics, vol 1 (2nd edn, Cambridge University Press 2011) | textbook | 2011 | https://www.cambridge.org/
SRC: Rosen KH, Discrete Mathematics and Its Applications (8th edn, McGraw-Hill 2019) | textbook | 2019 | https://www.mheducation.com/
NUM1#maths-u14-08-q1@1: Find D₄, the number of derangements of 4 items. | 9 | 0 |  | 4!(1 − 1 + ½ − 1/6 + 1/24) = 24 × 9/24 = 9.
M1#maths-u14-08-q2@1: In a class, 20 study French, 15 Spanish, and 6 both. How many study at least one? | 29 | 35 | 41 | 26 | 9 | Add the two groups and subtract the overlap counted twice: 20 + 15 − 6 = 29.
M3#maths-u14-08-q3@2: Four letters go into four addressed envelopes at random. What is the probability none is correct? | 3/8 | 1/4 | 1/24 | 1/e exactly | 5/8 | There are D₄ = 9 derangements among 4! = 24 arrangements, so the probability is 9/24 = 3/8.

## Generating Functions
S: A generating function packs a whole sequence into the coefficients of a power series. Algebra on the series (adding, multiplying, solving equations) then answers counting questions and solves recurrences.
O: Write generating functions for sequences and counting problems
O: Use them to count combinations and solve recurrences
T: Ordinary generating function | A(x) = Σ aₙxⁿ for a sequence a₀, a₁, a₂, …
T: Coefficient extraction | [xⁿ]A(x), the coefficient of xⁿ, which gives aₙ
H: Building them
- 1/(1 − x) = 1 + x + x^{2} + … (all 1s).
- Products count combinations: choosing from several sources multiplies their generating functions.
- Coins of 1, 2 and 5: 1/((1 − x)(1 − x^{2})(1 − x^{5})); the coefficient of x^{10} counts ways to make 10.
H: Recurrences
- Fibonacci: F(x) = x/(1 − x − x^{2}); partial fractions recover Binet's formula.
- Linear recurrences give rational generating functions.
- Exponential generating functions Σ aₙxⁿ/n! suit labelled structures.
H: Applications
- Integer partitions: Π 1/(1 − xᵏ) (Euler).
- Probability generating functions in statistics (School 12).
- Analytic combinatorics: asymptotics from singularities.
X: How many ways can 10p be made from 1p, 2p and 5p coins?
> Count solutions of a + 2b + 5c = 10 (the coefficient of x^{10})
> c = 0: b = 0 to 5 (6 ways); c = 1: a + 2b = 5 gives b = 0 to 2 (3 ways); c = 2: 1 way
> Total 6 + 3 + 1 = 10
K: Encode sequences as power series; products combine choices; coefficients count; rational generating functions solve linear recurrences.
!: Multiplying generating functions for choices that aren't independent.
Q: What is the generating function of the sequence 1, 1, 1, …? | 1/(1 − x).
Q: What is the generating function of the Fibonacci numbers (F₀ = 0)? | x/(1 − x − x^{2}).
SUM: Generating functions encode sequences.
SUM: Algebra on them counts.
SRC: Wilf HS, generatingfunctionology (3rd edn, A K Peters 2006) | textbook | 2006 | https://www2.math.upenn.edu/~wilf/DownldGF.html
SRC: Flajolet P, Sedgewick R, Analytic Combinatorics (Cambridge University Press 2009) | textbook | 2009 | https://algo.inria.fr/flajolet/Publications/book.pdf
NUM1#maths-u14-09-q1@1: In how many ways can 10p be made from 1p, 2p and 5p coins? | 10 | 0 |  | 6 + 3 + 1 = 10 by cases on the number of 5p coins.
M1#maths-u14-09-q2@1: What is the coefficient of x^{3} in 1/(1 − x)^{2} = Σ (n + 1)xⁿ? | 4 | 3 | 1 | 6 | 8 | The coefficient of xⁿ in Σ (n + 1)xⁿ is n + 1, so for x^{3} it's 4.
M2#maths-u14-09-q3@2: Why does multiplying generating functions count combined choices? | The coefficient of xⁿ in a product sums over all ways to split n between the factors | Multiplication adds sequences | It squares every term | It only works for Fibonacci | It doesn't count anything | [xⁿ]A(x)B(x) = Σ aₖb_{n−k}, exactly the combined count.

## Enumerative Combinatorics
S: Enumerative combinatorics counts families of structures: partitions of numbers and sets, permutations with given properties, trees and lattice paths. Special number families (Stirling, Bell, Catalan) appear again and again.
O: Count integer partitions and set partitions for small cases
O: Recognise Stirling, Bell and Catalan numbers
T: Integer partition | A way to write n as a sum of positive integers, order ignored; p(n) counts them
T: Stirling number of the second kind | S(n, k), the number of ways to split an n-element set into k non-empty blocks
H: Partitions of numbers
- p(5) = 7: 5, 4 + 1, 3 + 2, 3 + 1 + 1, 2 + 2 + 1, 2 + 1 + 1 + 1, 1 + 1 + 1 + 1 + 1.
- p(n) grows quickly: p(100) = 190,569,292.
- Ramanujan and Hardy found an asymptotic formula; Ramanujan found striking congruences such as p(5n + 4) ≡ 0 (mod 5).
H: Partitions of sets
- S(4, 2) = 7: split {1, 2, 3, 4} into two non-empty groups.
- Bell numbers B_{n} = Σ_{k} S(n, k): 1, 1, 2, 5, 15, 52, ….
- Recurrence: S(n, k) = kS(n − 1, k) + S(n − 1, k − 1).
H: Other families
- Catalan numbers (see Combinatorics).
- Stirling numbers of the first kind count permutations by cycles.
- Tools: bijections, recurrences, generating functions, the transfer matrix method.
X: Find p(5) and S(4, 2).
> List partitions of 5: 5, 4+1, 3+2, 3+1+1, 2+2+1, 2+1+1+1, 1+1+1+1+1: p(5) = 7
> Split {1, 2, 3, 4} into 2 blocks: 4 ways with a single element apart, 3 ways as two pairs
> S(4, 2) = 4 + 3 = 7
K: p(n) counts number partitions, S(n, k) set partitions into k blocks, Bell numbers all set partitions; recurrences and generating functions organise them.
!: Counting 3 + 2 and 2 + 3 as different partitions.
Q: What is the Bell number B₃? | 5.
Q: What is S(n, 1)? | 1.
SUM: Enumeration counts structured families.
SUM: Special numbers recur everywhere.
SRC: Stanley RP, Enumerative Combinatorics, vol 1 (2nd edn, Cambridge University Press 2011) | textbook | 2011 | https://www.cambridge.org/
SRC: Andrews GE, The Theory of Partitions (Cambridge University Press 1998) | textbook | 1998 | https://www.cambridge.org/
NUM1#maths-u14-10-q1@1: Find p(6), the number of partitions of 6. | 11 | 0 |  | 6, 5+1, 4+2, 4+1+1, 3+3, 3+2+1, 3+1+1+1, 2+2+2, 2+2+1+1, 2+1+1+1+1, 1+1+1+1+1+1.
M1#maths-u14-10-q2@1: What is S(3, 2)? | 3 | 2 | 1 | 6 | 4 | Splitting {1, 2, 3} into two blocks means choosing which element stands alone: 3 ways.
M2#maths-u14-10-q3@2: Which sequence counts all partitions of an n-element set? | The Bell numbers | The Catalan numbers | The Fibonacci numbers | The binomial coefficients | The factorials | The Bell number B_{n} = Σ_{k} S(n, k) counts set partitions into any number of blocks.

## Extremal Combinatorics
S: Extremal combinatorics asks how large or small a structure can be while avoiding (or forcing) some property: the most edges in a graph with no triangle, the largest family of sets where none contains another. Its answers guide network design and coding.
O: Apply Mantel's and Sperner's theorems
O: Describe the extremal approach and its applications
T: Mantel's theorem | A triangle-free graph on n vertices has at most ⌊n^{2}/4⌋ edges
T: Antichain | A family of sets in which no set contains another
H: Classic results
- Mantel (1907): the complete bipartite graph with equal halves is the extremal triangle-free graph.
- Turán's theorem generalises to graphs without a complete subgraph K_{r}.
- Sperner (1928): the largest antichain of subsets of an n-set has size C(n, ⌊n/2⌋).
- Erdős–Ko–Rado: largest families of k-subsets that pairwise intersect.
H: Methods
- Counting (double counting), averaging and the probabilistic method (Erdős).
- Shifting and compression arguments.
- Linear algebra bounds (dimension arguments).
H: Uses
- Bounds on codes (how many codewords at given distance).
- Network design avoiding unwanted substructures.
- Theoretical computer science lower bounds.
X: What is the largest number of edges in a triangle-free graph on 10 vertices?
> Mantel: ⌊10^{2}/4⌋ = 25
> Achieved by splitting the vertices into two groups of 5 and joining every pair across
> Any 26th edge would create a triangle
K: Extremal results bound sizes while avoiding properties; Mantel ⌊n^{2}/4⌋ for triangles; Sperner C(n, ⌊n/2⌋) for antichains; probabilistic and counting methods prove them.
!: Thinking the bound must be achieved by a "random-looking" graph rather than a structured one.
Q: What is the extremal triangle-free graph? | The balanced complete bipartite graph.
Q: What is the largest antichain of subsets of a 6-element set? | C(6, 3) = 20.
SUM: Extremal problems find the limits of structures.
SUM: Classic bounds are often achieved by symmetric examples.
SRC: Jukna S, Extremal Combinatorics (2nd edn, Springer 2011) | textbook | 2011 | https://link.springer.com/
SRC: Alon N, Spencer JH, The Probabilistic Method (4th edn, Wiley 2016) | textbook | 2016 | https://www.wiley.com/
NUM1#maths-u14-11-q1@1: What is the largest antichain of subsets of a 4-element set, by Sperner's theorem? | 6 | 0 |  | C(4, 2) = 6.
M1#maths-u14-11-q2@1: By Mantel's theorem, how many edges can a triangle-free graph on 8 vertices have at most? | 16 | 28 | 8 | 12 | 20 | Mantel's bound is ⌊n^{2}/4⌋, which for n = 8 is 64/4 = 16 edges.
M2#maths-u14-11-q3@2: Which technique did Erdős pioneer for extremal problems? | The probabilistic method | Gaussian elimination | Fourier series | The simplex method | Mathematical induction only | Showing a random construction has the property with positive probability proves existence.

## Ramsey Theory
S: Ramsey theory shows that complete disorder is impossible: any large enough structure contains an orderly substructure. Among any six people, three are mutual friends or three are mutual strangers, and the general question leads to some of mathematics' hardest computations.
O: Prove R(3, 3) = 6
O: Explain Ramsey numbers and why they're hard to compute
T: Ramsey number | R(s, t), the smallest n such that every red/blue colouring of the edges of K_{n} has a red K_{s} or a blue K_{t}
T: Monochromatic clique | A set of vertices all joined by edges of the same colour
H: R(3, 3) = 6
- In K₆, pick a vertex: of its 5 edges, at least 3 share a colour (pigeonhole), say red to A, B, C.
- If any edge among A, B, C is red, there's a red triangle; otherwise A, B, C form a blue triangle.
- K₅ can be coloured with no monochromatic triangle (a red pentagon and blue pentagram), so R(3, 3) > 5.
H: Known values
- R(4, 4) = 18; R(5, 5) is unknown (known bounds are 43 ≤ R(5, 5) ≤ 46).
- Erdős joked that aliens demanding R(6, 6) should be attacked rather than answered.
- Exponential bounds: √2^{k} < R(k, k) < 4^{k}; a 2023 result improved the upper base below 4.
H: Wider Ramsey theory
- Van der Waerden: any colouring of the integers has long monochromatic arithmetic progressions.
- Applications in logic, computer science and number theory.
X: Prove that among any 6 people, 3 are mutual friends or 3 are mutual strangers.
> Fix person P; of the other 5, at least 3 are friends of P or at least 3 are strangers to P; say friends A, B, C
> If any two of A, B, C are friends, they and P form 3 mutual friends
> If none are, A, B, C are 3 mutual strangers ∎
K: Large structures contain orderly substructures; R(3, 3) = 6 by pigeonhole; Ramsey numbers grow fast and few are known.
!: Thinking a colouring of K₅ must contain a monochromatic triangle.
Q: What is R(3, 3)? | 6.
Q: What does van der Waerden's theorem guarantee? | Long monochromatic arithmetic progressions in any finite colouring of the integers.
SUM: Complete disorder is impossible.
SUM: Ramsey numbers are notoriously hard.
SRC: Graham RL, Rothschild BL, Spencer JH, Ramsey Theory (2nd edn, Wiley 1990) | textbook | 1990 | https://www.wiley.com/
SRC: Radziszowski SP, Small Ramsey numbers, Electronic Journal of Combinatorics, Dynamic Survey DS1 | journal | 2024 | https://www.combinatorics.org/
NUM1#maths-u14-12-q1@1: What is R(4, 4)? | 18 | 0 |  | Greenwood and Gleason showed R(4, 4) = 18 in 1955.
M1#maths-u14-12-q2@1: Why is R(3, 3) greater than 5? | K₅ can be 2-coloured as a red pentagon and blue pentagram with no monochromatic triangle | K₅ has no triangles | Five is odd | Every colouring of K₅ has one | It isn't greater | That colouring avoids monochromatic triangles, so 5 vertices don't suffice.
M3#maths-u14-12-q3@2: In the R(3, 3) proof, why does one vertex have 3 edges of the same colour? | Its 5 edges in 2 colours force at least ⌈5/2⌉ = 3 of one colour | Every vertex has exactly 3 edges | Colours alternate | Graphs are symmetric | It doesn't | The generalised pigeonhole principle applies to the 5 edges.

## Design Theory
S: Design theory constructs arrangements with perfect balance: Latin squares, Steiner systems and block designs in which every pair of items appears together equally often. They schedule tournaments, design fair experiments and build error-correcting codes.
O: Construct and check Latin squares and simple designs
O: Explain uses of combinatorial designs
T: Latin square | An n × n grid with n symbols, each appearing exactly once in every row and column
T: Steiner triple system | A collection of 3-element blocks such that every pair of points lies in exactly one block
H: Latin squares
- Every group's multiplication table is a Latin square.
- Sudoku solutions are 9 × 9 Latin squares with extra box constraints.
- Orthogonal Latin squares: Euler's 36 officers problem (no pair of order 6 exists, Tarry 1900).
H: Steiner systems
- A Steiner triple system on v points exists iff v ≡ 1 or 3 (mod 6) (Kirkman, 1847).
- Kirkman's schoolgirl problem: 15 girls walk in 5 rows of 3 for 7 days so that no two walk together twice.
- The Fano plane is the Steiner triple system on 7 points.
H: Uses
- Experimental design: balanced allocation of treatments (Fisher).
- Tournament and timetable scheduling.
- Error-correcting codes and cryptographic key distribution.
X: Write a 3 × 3 Latin square and check it.
> Rows: (1, 2, 3), (2, 3, 1), (3, 1, 2)
> Each row contains 1, 2, 3 once
> Each column also contains 1, 2, 3 once ✓ (it's the addition table of ℤ₃, relabelled)
K: Designs arrange items with perfect balance; Latin squares, Steiner systems and block designs are key examples; they serve experiments, schedules and codes.
!: Checking only rows (or only columns) of a proposed Latin square.
Q: For which v do Steiner triple systems exist? | v ≡ 1 or 3 (mod 6).
Q: Which famous problem has no pair of orthogonal Latin squares of order 6? | Euler's 36 officers problem.
SUM: Designs balance arrangements perfectly.
SUM: They serve experiments and schedules.
SRC: Stinson DR, Combinatorial Designs: Constructions and Analysis (Springer 2004) | textbook | 2004 | https://link.springer.com/
SRC: Colbourn CJ, Dinitz JH (eds), Handbook of Combinatorial Designs (2nd edn, Chapman & Hall/CRC 2006) | textbook | 2006 | https://www.routledge.com/
NUM1#maths-u14-13-q1@1: In Kirkman's schoolgirl problem (15 girls, 5 triples a day, 7 days), how many triples are used in total? | 35 | 0 |  | 5 × 7 = 35, which equals C(15, 2)/3, covering each pair exactly once.
M1#maths-u14-13-q2@1: Which grid is a Latin square? | (1, 2), (2, 1) | (1, 1), (2, 2) | (1, 2), (1, 2) | (2, 2), (1, 1) | (1, 2), (2, 2) | Each symbol appears once in every row and column.
M2#maths-u14-13-q3@2: Does a Steiner triple system exist on 9 points? | Yes, since 9 ≡ 3 (mod 6) | No, since 9 is odd | No, since 9 is a square | Only on 7 points | Only for even numbers | Kirkman's condition v ≡ 1 or 3 (mod 6) is met.

## Block Designs
S: A balanced incomplete block design (BIBD) arranges v items into b blocks of size k so that every pair of items appears together in exactly λ blocks. Simple counting gives necessary conditions, and the Fano plane is the smallest interesting example.
O: Use the BIBD parameter relations
O: Check whether a design with given parameters can exist
T: BIBD (v, b, r, k, λ) | v points, b blocks of size k, each point in r blocks, each pair in λ blocks
T: Fisher's inequality | In any BIBD, b ≥ v
H: Counting conditions
- bk = vr (count point–block incidences two ways).
- λ(v − 1) = r(k − 1) (count pairs containing a fixed point).
- Both r and b must be whole numbers.
H: Examples
- Fano plane: (7, 7, 3, 3, 1): seven lines of three points, any two points on exactly one line.
- Affine plane of order 3: (9, 12, 4, 3, 1).
- Symmetric designs have b = v.
H: Existence
- The conditions are necessary but not always sufficient (Bruck–Ryser–Chowla).
- Projective planes of order n give (n^{2} + n + 1, …, n + 1, 1) designs; order 10 doesn't exist (computer proof, 1989).
- Used in balanced experiments where not every treatment fits in every block.
X: Check the Fano plane's parameters (v, b, r, k, λ) = (7, 7, 3, 3, 1).
> bk = 7 × 3 = 21 and vr = 7 × 3 = 21 ✓
> λ(v − 1) = 1 × 6 = 6 and r(k − 1) = 3 × 2 = 6 ✓
> Fisher's inequality b ≥ v holds with equality: a symmetric design
K: BIBDs satisfy bk = vr and λ(v − 1) = r(k − 1); Fisher's inequality b ≥ v; the conditions are necessary, not sufficient.
!: Assuming any parameters satisfying the counting conditions give an actual design.
Q: In a BIBD, what does λ count? | The number of blocks containing any given pair of points.
Q: What are the parameters of the Fano plane? | (7, 7, 3, 3, 1).
SUM: BIBDs balance pairs across blocks.
SUM: Counting gives necessary conditions.
SRC: Stinson DR, Combinatorial Designs: Constructions and Analysis (Springer 2004) | textbook | 2004 | https://link.springer.com/
SRC: Lam CWH, The search for a finite projective plane of order 10, American Mathematical Monthly 98(4), 305 | journal | 1991 | https://doi.org/10.2307/2323798
NUM1#maths-u14-14-q1@1: A BIBD has v = 9, k = 3 and λ = 1. Find r. | 4 | 0 |  | r = λ(v − 1)/(k − 1) = 8/2 = 4 (and b = vr/k = 12).
M1#maths-u14-14-q2@1: Which relation holds in every BIBD? | bk = vr | b = v | k = λ | r = k | v = λ + 1 | Both sides count the pairs (point, block containing it).
M3#maths-u14-14-q3@2: Can a BIBD have v = 8, k = 3, λ = 1? | No: r = 7/2 isn't a whole number | Yes, it's the Fano plane | Yes, with b = 8 | Only if λ = 2 | It depends on the blocks chosen | λ(v − 1) = r(k − 1) gives 7 = 2r, impossible.

## Invariants
S: An invariant is a quantity that doesn't change when allowed moves are made. Finding one proves that some configurations can never be reached, a powerful technique in puzzles, olympiad problems and the analysis of algorithms.
O: Find invariants and monovariants for processes
O: Use them to prove impossibility and termination
T: Invariant | A property preserved by every allowed move
T: Monovariant | A quantity that always increases (or always decreases), used to prove a process stops
H: Common invariants
- Parity (odd or even) of a sum or count.
- Colourings: chessboard colours, mod 3 colourings.
- Remainders, signs of permutations, products.
H: Proving impossibility
- If the start and target differ in an invariant, the target can't be reached.
- The 15-puzzle with two tiles swapped is unsolvable: each move preserves a permutation parity invariant.
- Rubik's cube: twisting a single corner piece is impossible.
H: Monovariants and termination
- A positive integer quantity that strictly decreases must stop.
- Euclid's algorithm terminates because remainders decrease.
- Sorting algorithms terminate because the number of inversions falls.
X: The numbers 1 to 10 are written down. Repeatedly erase two numbers a and b and write |a − b|. Can the last number be 0?
> a + b and |a − b| have the same parity, so the parity of the total sum never changes
> The initial sum is 55, which is odd
> So the final number is odd and can't be 0
K: Invariants stay fixed under moves and prove impossibility; monovariants change in one direction and prove termination; parity and colourings are the commonest.
!: Finding a quantity that changes only sometimes and calling it an invariant.
Q: What is a monovariant used for? | Proving that a process terminates.
Q: Why does Euclid's algorithm terminate? | The remainders strictly decrease and stay non-negative.
SUM: Invariants prove what's impossible.
SUM: Monovariants prove processes end.
SRC: Engel A, Problem-Solving Strategies (Springer 1998) | textbook | 1998 | https://link.springer.com/
SRC: Zeitz P, The Art and Craft of Problem Solving (3rd edn, Wiley 2017) | textbook | 2017 | https://www.wiley.com/
NUM1#maths-u14-15-q1@1: In the example, what is the parity-determining initial sum of 1 to 10? | 55 | 0 |  | 10 × 11/2 = 55, which is odd.
M1#maths-u14-15-q2@1: A knight moves on a chessboard. What changes with every move? | The colour of its square | The row number's parity only | Nothing | The column number only | Its distance from the corner | Each knight move goes from a light square to a dark one or vice versa.
M3#maths-u14-15-q3@2: Why can't the 15-puzzle be solved if two tiles are swapped from the solved state? | A permutation-parity invariant combined with the blank's position never changes, but a swap flips it | Tiles can't move | The puzzle has no solutions at all | It can be solved | Only corner tiles can move | Each move preserves the combined parity, while a single swap changes it.

## Coding Theory
S: Coding theory designs ways to send information reliably over noisy channels by adding structured redundancy. Error-correcting codes protect phone calls, QR codes, spacecraft signals and data storage.
O: Calculate Hamming distances and the error-correcting capability of a code
O: Describe the Hamming (7, 4) code and other important codes
T: Hamming distance | The number of positions in which two strings differ
T: Minimum distance | d, the smallest Hamming distance between distinct codewords; the code detects d − 1 errors and corrects ⌊(d − 1)/2⌋
H: Basics
- A code adds redundancy: n transmitted bits carry k bits of information (rate k/n).
- Larger minimum distance gives more protection but lower rate.
- Repetition code (send each bit 3 times): d = 3, corrects 1 error, rate ⅓.
H: Hamming (7, 4)
- 4 data bits plus 3 parity bits; minimum distance 3; corrects any single error.
- The syndrome (the parity check results) points to the error position.
- Hamming invented it in 1950 at Bell Labs, frustrated by machine errors.
H: Modern codes
- Reed–Solomon codes: CDs, DVDs, QR codes, deep-space probes.
- LDPC and turbo codes approach Shannon's limit (School 23); polar codes are used in 5G.
- Linear codes are subspaces of 𝔽₂ⁿ, so linear algebra does the work.
X: Find the Hamming distance between 1011101 and 1001001, and say how many errors a code with d = 5 corrects.
> Compare position by position: they differ in positions 3 and 5
> Distance = 2
> A code with minimum distance 5 corrects ⌊(5 − 1)/2⌋ = 2 errors
K: Hamming distance counts differing positions; minimum distance d detects d − 1 and corrects ⌊(d − 1)/2⌋ errors; Hamming (7, 4) corrects one error at rate 4/7.
!: Confusing error detection (d − 1) with error correction (⌊(d − 1)/2⌋).
Q: What is the rate of the Hamming (7, 4) code? | 4/7.
Q: How many errors can a code with minimum distance 3 correct? | 1.
SUM: Codes add structured redundancy.
SUM: Distance sets their power.
SRC: Hamming RW, Error detecting and error correcting codes, Bell System Technical Journal 29(2), 147 | journal | 1950 | https://doi.org/10.1002/j.1538-7305.1950.tb00463.x
SRC: MacWilliams FJ, Sloane NJA, The Theory of Error-Correcting Codes (North-Holland 1977) | textbook | 1977 | https://www.sciencedirect.com/
NUM1#maths-u14-16-q1@1: How many errors can a code with minimum distance 7 correct? | 3 | 0 |  | ⌊(7 − 1)/2⌋ = 3.
M1#maths-u14-16-q2@1: What is the Hamming distance between 10110 and 11100? | 2 | 1 | 3 | 5 | 0 | Compare position by position: 10110 and 11100 differ in positions 2 and 4, so the distance is 2.
M2#maths-u14-16-q3@2: Why are Reed–Solomon codes used on CDs and QR codes? | They correct bursts of errors, such as scratches or smudges | They need no redundancy | They compress data | They encrypt the data | They're the only codes known | Working with symbols rather than bits, they handle clustered damage well.

## Boolean Functions
S: A Boolean function takes true/false inputs and returns true or false. Every digital circuit computes Boolean functions, and simplifying them saves gates, power and time.
O: Represent Boolean functions with truth tables and normal forms
O: Simplify Boolean expressions
T: Boolean function | f: {0, 1}ⁿ → {0, 1}; there are 2^{2ⁿ} of them
T: Disjunctive normal form | An OR of ANDs of variables or negations, read from the rows of a truth table where f = 1
H: Representations
- Truth tables list all 2ⁿ input rows.
- DNF (sum of products) and CNF (product of sums).
- Circuits of AND, OR and NOT gates; NAND alone is universal.
H: Simplification
- Boolean algebra laws: x + x′y = x + y, xy + xy′ = x (see School 3, Boolean Algebra).
- Karnaugh maps group adjacent 1s visually (up to about 4–6 variables).
- Algorithms (Quine–McCluskey, Espresso) for larger functions.
H: Important functions
- XOR (parity): 1 when an odd number of inputs are 1; adders use it.
- Majority, threshold and symmetric functions.
- In cryptography, Boolean functions must be balanced and highly nonlinear.
X: Simplify f = x′y + xy, and count Boolean functions of 3 variables.
> f = (x′ + x)y = 1 · y = y
> So f depends only on y
> Functions of 3 variables: 2^{2^{3}} = 2^{8} = 256
- Example: majority of three inputs is xy + yz + xz.
K: Boolean functions map bits to bits; there are 2^{2ⁿ}; truth tables give DNF/CNF; simplify with algebra or Karnaugh maps; XOR and NAND are key.
!: Thinking there are 2ⁿ Boolean functions of n variables (that's the number of input rows).
Q: How many rows does the truth table of a 4-variable function have? | 16.
Q: Which single gate type can build every Boolean function? | NAND (or NOR).
SUM: Boolean functions underlie digital circuits.
SUM: Simplification saves hardware.
SRC: Rosen KH, Discrete Mathematics and Its Applications (8th edn, McGraw-Hill 2019) | textbook | 2019 | https://www.mheducation.com/
SRC: O'Donnell R, Analysis of Boolean Functions (Cambridge University Press 2014) | textbook | 2014 | https://www.cambridge.org/
NUM1#maths-u14-17-q1@1: How many Boolean functions of 2 variables are there? | 16 | 0 |  | 2^{2^{2}} = 2^{4} = 16.
M1#maths-u14-17-q2@1: What does XOR output for inputs 1 and 1? | 0 | 1 | 2 | Undefined | It depends on order | XOR is 1 only when exactly one input is 1.
M2#maths-u14-17-q3@2: Why are Karnaugh maps arranged in Gray code order? | Adjacent cells differ in one variable, so grouping them eliminates that variable | It makes the map square | It sorts outputs numerically | It's a random convention | They aren't | Grouping neighbours that differ in one input lets xy + xy′ = x simplify visually.

## Algorithms and Complexity
S: An algorithm is a precise step-by-step procedure; complexity measures how its running time or memory grows with input size. Big-O notation compares algorithms independently of hardware, so you can predict what will scale.
O: Analyse simple algorithms with big-O notation
O: Compare common growth rates and their practical consequences
T: Big-O notation | f(n) = O(g(n)) if f(n) ≤ Cg(n) for all large n: an upper bound on growth
T: Worst-case complexity | The largest running time over all inputs of size n
H: Growth rates
- O(1) constant, O(log n) binary search, O(n) linear scan.
- O(n log n) efficient sorting (merge sort, heapsort).
- O(n^{2}) nested loops, O(2ⁿ) brute-force subsets, O(n!) brute-force orderings.
H: Analysing algorithms
- Count basic operations as a function of n; keep the dominant term.
- Loops multiply; sequential steps add.
- Divide and conquer: recurrences like T(n) = 2T(n/2) + n give O(n log n).
H: Practical meaning
- Doubling n doubles O(n) time but quadruples O(n^{2}) time.
- Comparison sorting needs at least about n log₂ n comparisons.
- Good algorithms matter more than faster computers for large inputs.
X: How many comparisons does binary search need, at most, to find an item among 1,000,000 sorted items?
> Each comparison halves the remaining range
> 2^{20} = 1,048,576 ≥ 1,000,000
> At most 20 comparisons, against up to 1,000,000 for a linear scan
K: Big-O captures growth; binary search is O(log n), good sorting O(n log n); nested loops give O(n^{2}); exponential algorithms don't scale.
!: Treating an O(n^{2}) algorithm as fine because it's fast on small test inputs.
Q: What is the complexity of binary search? | O(log n).
Q: If n doubles, how does O(n^{2}) running time change? | It roughly quadruples.
SUM: Big-O describes how algorithms scale.
SUM: Algorithm choice beats hardware.
SRC: Cormen TH, Leiserson CE, Rivest RL, Stein C, Introduction to Algorithms (4th edn, MIT Press 2022) | textbook | 2022 | https://mitpress.mit.edu/
SRC: Knuth DE, The Art of Computer Programming, vol 3: Sorting and Searching (2nd edn, Addison-Wesley 1998) | textbook | 1998 | https://www-cs-faculty.stanford.edu/~knuth/taocp.html
NUM1#maths-u14-18-q1@1: What is the maximum number of comparisons for binary search on 1,000,000 sorted items? | 20 | 0 |  | ⌈log₂ 1,000,000⌉ = 20.
M1#maths-u14-18-q2@1: Which complexity do efficient comparison sorts achieve? | O(n log n) | O(log n) | O(n^{2}) | O(2ⁿ) | O(1) | Merge sort and heapsort run in O(n log n), matching the lower bound.
M2#maths-u14-18-q3@2: An algorithm loops over all pairs of n items. What is its complexity? | O(n^{2}) | O(n) | O(log n) | O(n log n) | O(2ⁿ) | There are n(n − 1)/2 ≈ n^{2}/2 pairs, so the running time grows as O(n^{2}).

## Computational Complexity Theory
S: Complexity theory classifies problems by the resources needed to solve them. Its central question, P versus NP, asks whether every problem whose solutions can be checked quickly can also be solved quickly: one of the Millennium Prize problems.
O: Define P, NP and NP-completeness
O: Explain reductions and the significance of P versus NP
T: NP | Decision problems whose "yes" answers can be verified in polynomial time given a certificate
T: NP-complete | A problem in NP to which every NP problem reduces in polynomial time; SAT was the first (Cook, Levin)
H: Classes
- P: solvable in polynomial time (sorting, shortest paths, linear programming).
- NP: verifiable in polynomial time (Sudoku, scheduling, SAT).
- NP-complete: the hardest in NP; examples include SAT, 3-colouring, the travelling salesperson decision problem.
- Beyond: PSPACE, EXP; and undecidable problems like the halting problem.
H: Reductions
- A reduces to B if a fast algorithm for B gives one for A.
- To show a problem NP-complete, reduce a known NP-complete problem to it.
- Thousands of practical problems are NP-complete.
H: Why it matters
- If P = NP, much modern cryptography would break.
- In practice: approximation algorithms, heuristics and special cases tackle NP-hard problems.
- Most researchers believe P ≠ NP, but it's unproved.
X: Explain why checking a completed Sudoku is easy but solving one may be hard.
> Checking: test each row, column and box for repeated digits, polynomial in the grid size
> Solving general n^{2} × n^{2} Sudoku is NP-complete
> So Sudoku is in NP, and a fast general solver would imply P = NP
K: P = solvable fast, NP = checkable fast; NP-complete problems are the hardest in NP; reductions transfer hardness; P vs NP is open and crucial.
!: Thinking NP means "not polynomial" (it means non-deterministic polynomial: verifiable quickly).
Q: What was the first problem proved NP-complete? | Boolean satisfiability (SAT).
Q: What would P = NP imply for cryptography? | Many systems would become breakable.
SUM: Complexity classifies problem difficulty.
SUM: P versus NP is the central open question.
SRC: Sipser M, Introduction to the Theory of Computation (3rd edn, Cengage 2013) | textbook | 2013 | https://www.cengage.co.uk/
SRC: Cook SA, The complexity of theorem-proving procedures, Proceedings of the 3rd ACM Symposium on Theory of Computing, 151 | journal | 1971 | https://doi.org/10.1145/800157.805047
NUM1#maths-u14-19-q1@1: A brute-force SAT solver tries every assignment of 30 variables. How many assignments, in millions to the nearest million? | 1074 | 1 | million | 2^{30} = 1,073,741,824, about 1,074 million.
M1#maths-u14-19-q2@1: Which problem is in P? | Finding shortest paths in a graph | Boolean satisfiability in general | Graph 3-colouring in general | The travelling salesperson decision problem | General Sudoku | Dijkstra's algorithm solves shortest paths in polynomial time.
M3#maths-u14-19-q3@2: Problem X is NP-complete and you find a polynomial algorithm for it. What follows? | P = NP | X wasn't really NP-complete | Only X becomes easy | Nothing | P ≠ NP | Every NP problem reduces to X, so all would be solvable in polynomial time.

## Automata Theory
S: Automata are abstract machines that read input and change state. Finite automata recognise patterns such as valid numbers or passwords, and the hierarchy up to Turing machines defines what computers can and can't do.
O: Design and run simple finite automata
O: Compare finite automata, pushdown automata and Turing machines
T: Deterministic finite automaton (DFA) | A machine with finitely many states, a start state, accepting states and a transition for each state and symbol
T: Turing machine | A machine with an unbounded tape and a read/write head, the standard model of computation
H: Finite automata
- Read the input one symbol at a time, moving between states.
- Accept if the final state is accepting.
- Non-deterministic automata (NFAs) recognise exactly the same languages as DFAs (subset construction).
- Example: binary numbers divisible by 3 need 3 states (the remainder).
H: Beyond finite automata
- Pushdown automata add a stack: they recognise context-free languages (balanced brackets).
- Turing machines add an unbounded tape: they capture all algorithmic computation (Church–Turing thesis).
- Some problems (the halting problem) no Turing machine can solve.
H: Uses
- Lexical analysis in compilers, regular expression engines, protocol design.
- Hardware controllers and vending machines.
- Model checking for verifying systems.
X: A DFA tracks the remainder mod 3 of a binary number read left to right. What state is it in after reading 110?
> Reading bit b changes remainder r to (2r + b) mod 3; start at 0
> 1: (0 + 1) = 1; 1: (2 + 1) = 3 ≡ 0; 0: (0 + 0) = 0
> State 0: 110₂ = 6 is divisible by 3, so the DFA accepts
K: DFAs read input through finite states; NFAs are no more powerful; adding a stack gives pushdown automata; Turing machines capture computation, with undecidable limits.
!: Thinking a finite automaton can count arbitrarily high (it can't recognise aⁿbⁿ).
Q: What extra memory does a pushdown automaton have? | A stack.
Q: Name a problem no Turing machine can solve. | The halting problem.
SUM: Automata model computation in layers.
SUM: Turing machines set the ultimate limits.
SRC: Hopcroft JE, Motwani R, Ullman JD, Introduction to Automata Theory, Languages, and Computation (3rd edn, Pearson 2006) | textbook | 2006 | https://www.pearson.com/
SRC: Turing AM, On computable numbers, with an application to the Entscheidungsproblem, Proceedings of the London Mathematical Society s2-42(1), 230 | journal | 1937 | https://doi.org/10.1112/plms/s2-42.1.230
NUM1#maths-u14-20-q1@1: How many states does a minimal DFA need to test whether a binary number is divisible by 5? | 5 | 0 |  | One state for each possible remainder mod 5.
M1#maths-u14-20-q2@1: Which language can a finite automaton recognise? | Binary strings ending in 01 | Strings aⁿbⁿ for all n | Balanced brackets of any depth | Palindromes of any length | Prime-length strings | Recognising a fixed ending needs only bounded memory.
M2#maths-u14-20-q3@2: Why are NFAs no more powerful than DFAs? | The subset construction turns any NFA into an equivalent DFA | NFAs have fewer states | DFAs can guess | NFAs need a stack | They are more powerful | A DFA's states can track the set of states the NFA might be in.

## Formal Languages
S: A formal language is a set of strings over an alphabet, defined by rules. Grammars and the Chomsky hierarchy classify languages by the machines that recognise them, which is the theory behind programming languages, compilers and parts of linguistics.
O: Write regular expressions and simple grammars
O: Place languages in the Chomsky hierarchy
T: Grammar | Rules for rewriting symbols, such as S → aSb | ε, that generate the strings of a language
T: Chomsky hierarchy | Regular ⊂ context-free ⊂ context-sensitive ⊂ recursively enumerable languages
H: Regular languages
- Described by regular expressions: (0|1)*01 means binary strings ending in 01.
- Recognised by finite automata.
- Pumping lemma: aⁿbⁿ isn't regular (a finite machine can't count n).
H: Context-free languages
- Grammars with single non-terminals on the left: S → aSb | ε generates aⁿbⁿ.
- Recognised by pushdown automata; the syntax of programming languages is (mostly) context-free.
- Parsers build syntax trees from grammars.
H: Higher levels
- Context-sensitive: aⁿbⁿcⁿ.
- Recursively enumerable: anything a Turing machine can list.
- Natural languages have features beyond context-free (cross-serial dependencies in Swiss German).
X: Show that the grammar S → aSb | ε generates aⁿbⁿ, and derive aabb.
> Each use of S → aSb adds one a on the left and one b on the right
> Stopping with S → ε leaves equal numbers: aⁿbⁿ
> S ⇒ aSb ⇒ aaSbb ⇒ aabb
K: Languages are sets of strings; regular expressions and finite automata define regular languages; context-free grammars and pushdown automata the next level; the Chomsky hierarchy orders them.
!: Assuming every language that looks simple is regular (aⁿbⁿ isn't).
Q: Which machine recognises context-free languages? | A pushdown automaton.
Q: Is aⁿbⁿ regular? | No.
SUM: Formal languages are rule-defined string sets.
SUM: The Chomsky hierarchy classifies them.
SRC: Sipser M, Introduction to the Theory of Computation (3rd edn, Cengage 2013) | textbook | 2013 | https://www.cengage.co.uk/
SRC: Chomsky N, Three models for the description of language, IRE Transactions on Information Theory 2(3), 113 | journal | 1956 | https://doi.org/10.1109/TIT.1956.1056813
NUM1#maths-u14-21-q1@1: How many strings of length 3 are there over the alphabet {a, b}? | 8 | 0 |  | 2^{3} = 8.
M1#maths-u14-21-q2@1: Which string matches the regular expression a(b|c)*a? | abcba | abcab | abac | bca | ab | It starts and ends with a, with only b and c between.
M3#maths-u14-21-q3@2: Why can't any finite automaton recognise aⁿbⁿ? | It would need to remember n, but has only finitely many states | aⁿbⁿ is infinite | Automata can't read b | It can | The language is empty | By the pumping lemma, long enough strings would let the machine be fooled.

## Cellular Automata
S: A cellular automaton is a grid of cells, each updating its state by a simple rule depending on its neighbours. Despite simple rules, they produce complex patterns, randomness and even universal computation.
O: Run elementary cellular automata and the Game of Life
O: Explain how simple local rules produce complex behaviour
T: Elementary cellular automaton | A one-dimensional binary CA where each cell's next state depends on itself and its two neighbours; 256 possible rules
T: Game of Life | Conway's 2D automaton: a live cell survives with 2 or 3 live neighbours; a dead cell is born with exactly 3
H: Elementary automata
- Rules are numbered 0–255 by their outputs on the 8 neighbourhoods.
- Rule 30 produces randomness (used as a random number generator); Rule 90 draws the Sierpiński triangle.
- Rule 110 is Turing complete (Cook, 2004).
H: The Game of Life
- Introduced by John Conway in 1970.
- Still lifes (block), oscillators (blinker, period 2) and gliders (moving patterns).
- Glider guns and logic gates make it Turing complete.
H: Uses
- Models of crystal growth, forest fires, traffic and biological patterns.
- Parallel computation and physics-like simulations (lattice gas models).
- Illustrations of emergence: complex global behaviour from local rules.
X: In the Game of Life, what happens to a horizontal row of three live cells (a blinker)?
> The middle cell has 2 live neighbours, so it survives; the end cells have 1, so they die
> The cells above and below the middle each have 3 live neighbours, so they're born
> The row becomes a vertical line of three: it alternates with period 2
K: CAs update cells by local rules; elementary rules number 256; Rule 30 is random-looking, Rule 110 universal; Life's B3/S23 rule creates gliders and computation.
!: Updating cells one at a time instead of all at once from the previous generation.
Q: How many elementary cellular automaton rules are there? | 256.
Q: What is a glider in the Game of Life? | A small pattern that moves across the grid.
SUM: Simple local rules create complexity.
SUM: Some CAs can compute anything.
SRC: Gardner M, Mathematical games: the fantastic combinations of John Conway's new solitaire game "life", Scientific American 223(4), 120 | journal | 1970 | https://doi.org/10.1038/scientificamerican1070-120
SRC: Cook M, Universality in elementary cellular automata, Complex Systems 15(1), 1 | journal | 2004 | https://www.complex-systems.com/
NUM1#maths-u14-22-q1@1: How many neighbourhood patterns does an elementary cellular automaton rule specify outputs for? | 8 | 0 |  | Three binary cells give 2^{3} = 8 patterns.
M1#maths-u14-22-q2@1: Which elementary rule is known to be Turing complete? | Rule 110 | Rule 30 | Rule 90 | Rule 0 | Rule 255 | Matthew Cook proved in 2004 that Rule 110 can simulate any Turing machine.
M2#maths-u14-22-q3@2: In the Game of Life, what happens to a dead cell with exactly 3 live neighbours? | It becomes alive | It stays dead | It dies again | It moves | Nothing is defined | Conway's birth rule (B3) brings a dead cell to life when exactly 3 neighbours are alive.

## Game Theory
S: Game theory studies strategic decisions where each player's outcome depends on others' choices. Nash equilibria, mixed strategies and combinatorial game analysis apply to economics, biology, politics and recreational games like Nim.
O: Find Nash equilibria in simple games, including the prisoner's dilemma
O: Analyse Nim using binary XOR
T: Nash equilibrium | A combination of strategies where no player can gain by changing strategy alone
T: Nim-sum | The XOR (binary sum without carry) of the heap sizes in Nim; the player to move wins iff it's non-zero
H: Strategic games
- Prisoner's dilemma: defecting is each player's best response, so (defect, defect) is the equilibrium, though both cooperating would be better.
- Mixed strategies: Nash (1950) proved every finite game has an equilibrium in mixed strategies.
- Zero-sum games: von Neumann's minimax theorem.
H: Combinatorial games
- Nim: players remove any number of objects from one heap; whoever takes the last wins.
- Bouton (1901): a position is losing for the player to move iff the nim-sum is 0.
- Sprague–Grundy theory reduces many impartial games to Nim.
H: Applications
- Auctions, pricing and oligopoly in economics (School 21).
- Evolutionary stable strategies in biology.
- Mechanism design, voting and network security.
X: In Nim with heaps of 3, 4 and 5, who wins and what is a winning first move?
> Nim-sum: 3 XOR 4 = 7, then 7 XOR 5 = 2, which is non-zero, so the first player wins
> Make the nim-sum 0: heap 3 XOR 2 = 1, so reduce the heap of 3 to 1
> New heaps 1, 4, 5 have nim-sum 1 XOR 4 XOR 5 = 0, a losing position for the opponent
K: Nash equilibria are mutual best responses; the prisoner's dilemma shows individual rationality can hurt everyone; Nim is solved by XOR.
!: Assuming a Nash equilibrium is the best outcome for the players collectively.
Q: What is the Nash equilibrium of the one-shot prisoner's dilemma? | Both defect.
Q: In Nim, when is the player to move in a losing position? | When the nim-sum is 0.
SUM: Game theory analyses strategic choice.
SUM: Equilibria needn't be optimal for all.
SRC: Osborne MJ, An Introduction to Game Theory (Oxford University Press 2004) | textbook | 2004 | https://global.oup.com/
SRC: Nash JF, Equilibrium points in n-person games, Proceedings of the National Academy of Sciences 36(1), 48 | journal | 1950 | https://doi.org/10.1073/pnas.36.1.48
NUM1#maths-u14-23-q1@1: What is the nim-sum of heaps 1, 2 and 3? | 0 | 0 |  | 1 XOR 2 = 3, and 3 XOR 3 = 0: the player to move loses.
M1#maths-u14-23-q2@1: What does Nash's theorem guarantee? | Every finite game has at least one equilibrium in mixed strategies | Every game has a pure equilibrium | Equilibria are always fair | Cooperation always wins | Zero-sum games have no equilibria | Allowing randomised strategies guarantees existence.
M2#maths-u14-23-q3@2: Why do both players defect in the one-shot prisoner's dilemma? | Defecting is better for each player whatever the other does | They prefer worse outcomes | Cooperation is illegal | They can communicate | They don't defect | Defection is a dominant strategy, even though mutual cooperation pays more.
`;
