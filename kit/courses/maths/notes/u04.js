// School 4: Abstract Algebra. Format: kit/course/notes.js. Standard: docs/CURRICULUM_CONTENT_STANDARD.md
// Groups, rings, fields and modules, through Galois theory, homological and universal algebra, to representations and Lie theory.
export default `
## Abstract Algebra
S: Abstract algebra studies structures defined by rules (axioms) rather than by particular numbers: groups, rings, fields, modules. Proving a theorem once for a structure proves it for every example, from clock arithmetic to symmetries of molecules.
O: Explain what abstract algebra studies and why abstraction is useful
O: Check the group axioms for simple examples
T: Axiom | A rule assumed to hold in a structure, from which theorems are proved
T: Binary operation | A rule combining two elements of a set to give an element of the same set
H: The idea
- Integers under addition, non-zero rationals under multiplication and rotations of a square all share the same pattern: a group.
- Studying the pattern itself gives results that apply to all of them at once.
- Structures differ in their operations and axioms: groups have one operation, rings two, modules combine a ring and a group.
H: Why it matters
- Galois (around 1830) used groups to show which polynomial equations can be solved by formulas.
- Emmy Noether (1920s) made abstract structures the centre of algebra.
- Today algebra underpins cryptography, coding theory, physics (symmetry), chemistry and computer science.
H: Working abstractly
- State the axioms precisely; check each one for a proposed example.
- Look for counterexamples: one failing case shows an axiom fails.
- Prove results from the axioms alone, without using properties of a particular example.
X: Check that the integers mod 5 under addition form a group.
> Closure: (a + b) mod 5 is again in {0, 1, 2, 3, 4}; associativity is inherited from ordinary addition
> Identity: 0, since a + 0 = a
> Inverses: each a has 5 − a (and 0 has 0), so all axioms hold
K: Abstract algebra studies structures defined by axioms; one theorem covers every example; check axioms one by one and use counterexamples.
!: Assuming a property of one example (such as commutativity) holds for every structure of that type.
Q: Name three structures studied in abstract algebra. | For example groups, rings and fields.
Q: Who used groups to study the solvability of polynomial equations? | Évariste Galois.
SUM: Abstract algebra studies structures through axioms.
SUM: One proof covers every example.
SRC: Dummit DS, Foote RM, Abstract Algebra (3rd edn, Wiley 2004) | textbook | 2004 | https://www.wiley.com/
SRC: Fraleigh JB, A First Course in Abstract Algebra (7th edn, Pearson 2003) | textbook | 2003 | https://www.pearson.com/
NUM1#maths-u04-01-q1@1: How many elements of the integers mod 6 under addition generate the whole group? | 2 | 0 |  | 1 and 5 generate everything; 2, 3 and 4 share a factor with 6, and 0 generates only itself.
M1#maths-u04-01-q2@1: Which set and operation form a group? | The integers under addition | The natural numbers under addition | The integers under multiplication | All rationals under multiplication | The integers under subtraction | Addition on ℤ has identity 0 and inverses −a; the others lack inverses or associativity.
M2#maths-u04-01-q3@2: Why is it useful to prove theorems for groups in general? | Each theorem then applies to every example of a group at once | General proofs are always shorter than proofs about examples | It avoids needing any examples | Groups are the only structures that matter | Specific examples can't be proved | Abstraction means one argument covers integers, symmetries, matrices and more.

## Algebraic Structures
S: An algebraic structure is a set with one or more operations satisfying axioms. A hierarchy runs from magmas and semigroups through monoids and groups to rings, fields and vector spaces, each adding rules and gaining theorems.
O: Identify magmas, semigroups, monoids and groups
O: Recognise rings, fields and vector spaces from their axioms
T: Monoid | A set with an associative operation and an identity element
T: Field | A commutative ring in which every non-zero element has a multiplicative inverse
H: One operation
- Magma: just a closed binary operation.
- Semigroup: associative; monoid: plus an identity; group: plus inverses.
- Abelian group: also commutative.
- Example: strings under concatenation form a monoid (identity: the empty string), not a group.
H: Two operations
- Ring: an abelian group under +, associative ×, and the distributive laws (ℤ, polynomials, matrices).
- Field: a commutative ring where non-zero elements have inverses (ℚ, ℝ, ℂ, ℤ_{p} for prime p).
- Vector space: an abelian group with scalar multiplication by a field.
H: Other structures
- Lattices and Boolean algebras (meet and join).
- Modules: like vector spaces over a ring (later in this school).
- Category theory studies structures and the maps between them in general.
X: Is the set of integers under subtraction a group?
> Closure holds: a − b is an integer
> Associativity fails: (5 − 3) − 1 = 1 but 5 − (3 − 1) = 3
> So it isn't even a semigroup, let alone a group
K: Each structure adds axioms: semigroup (associative), monoid (identity), group (inverses), ring (two operations), field (division); check every axiom.
!: Forgetting to check associativity because it's true for familiar operations.
Q: What does a monoid have that a semigroup may not? | An identity element.
Q: Is ℤ₆ a field? | No: 2 has no multiplicative inverse (2 × 3 = 0).
SUM: Structures form a hierarchy by axioms.
SUM: More axioms give more theorems.
SRC: Fraleigh JB, A First Course in Abstract Algebra (7th edn, Pearson 2003) | textbook | 2003 | https://www.pearson.com/
SRC: Burris S, Sankappanavar HP, A Course in Universal Algebra (Springer 1981) | textbook | 1981 | https://www.math.uwaterloo.ca/~snburris/htdocs/ualg.html
NUM1#maths-u04-02-q1@1: What is the identity element of the natural numbers {0, 1, 2, …} under addition? | 0 | 0 |  | a + 0 = a for every natural number, so 0 is the identity; it's a monoid without inverses.
M1#maths-u04-02-q2@1: Which structure is a field? | The rationals with + and × | The integers with + and × | 2 × 2 matrices with + and × | ℤ₈ with + and × | Polynomials with + and × | Every non-zero rational has a multiplicative inverse; the others lack some inverses.
M2#maths-u04-02-q3@2: Strings of letters under concatenation form which structure? | A monoid but not a group | A group | A field | A ring | Not even a semigroup | Concatenation is associative with the empty string as identity, but there are no inverses.

## Group Theory
S: Group theory studies symmetry. A group is a set with an associative operation, an identity and inverses; groups describe rotations, permutations, solutions of equations and particle physics, and simple counting theorems such as Lagrange's reveal a lot about their structure.
O: Find orders of elements and subgroups
O: Apply Lagrange's theorem and work with cyclic, symmetric and dihedral groups
T: Order | The number of elements of a group; the order of an element g is the smallest k > 0 with g^{k} = e
T: Lagrange's theorem | In a finite group, the order of every subgroup divides the order of the group
H: Examples
- Cyclic groups ℤ_{n}: generated by one element.
- Symmetric group S_{n}: all permutations of n objects, order n!.
- Dihedral group D_{n}: symmetries of a regular n-gon, order 2n (n rotations, n reflections).
- Matrix groups such as GL_{n}(ℝ), the invertible n × n matrices.
H: Subgroups and Lagrange
- A subgroup is a subset that's a group under the same operation.
- Lagrange: |H| divides |G|; so the order of each element divides |G|.
- Consequence: a group of prime order is cyclic.
- The converse fails: A₄ (order 12) has no subgroup of order 6.
H: Cyclic groups
- ℤ_{n} has exactly one subgroup of each order dividing n.
- The order of k in ℤ_{n} is n/gcd(k, n).
X: Find the order of 4 in ℤ₁₂ and the number of subgroups of ℤ₁₂.
> 4, 8, 12 ≡ 0: the order of 4 is 3 (= 12/gcd(4, 12))
> ℤ₁₂ has one subgroup for each divisor of 12: 1, 2, 3, 4, 6, 12
> So it has 6 subgroups
K: Groups have closure, associativity, identity and inverses; element orders divide |G| (Lagrange); ℤ_{n} has one subgroup per divisor; |S_{n}| = n! and |D_{n}| = 2n.
!: Assuming the converse of Lagrange: a divisor of |G| need not be the order of a subgroup.
Q: What is the order of D₆, the symmetries of a hexagon? | 12.
Q: Why is every group of prime order cyclic? | Any non-identity element has order dividing p, so its order is p and it generates the group.
SUM: Groups formalise symmetry.
SUM: Lagrange's theorem constrains subgroups.
SRC: Armstrong MA, Groups and Symmetry (Springer 1988) | textbook | 1988 | https://link.springer.com/
SRC: Gallian JA, Contemporary Abstract Algebra (10th edn, CRC Press 2021) | textbook | 2021 | https://www.routledge.com/
NUM1#maths-u04-03-q1@1: What is the order of the symmetric group S₅? | 120 | 0 |  | |S₅| = 5! = 120.
M1#maths-u04-03-q2@1: Can a group of order 15 have a subgroup of order 4? | No: 4 doesn't divide 15 | Yes, always | Yes, if it's cyclic | Only if it's abelian | Only if it's non-abelian | Lagrange's theorem forbids subgroup orders that don't divide the group order.
M3#maths-u04-03-q3@2: What is the order of 9 in ℤ₁₂? | 4 | 3 | 9 | 12 | 2 | The order of k in ℤ_{n} is n/gcd(k, n) = 12/3 = 4: the multiples run 9, 6, 3, 0.

## Homomorphisms
S: A homomorphism is a map between algebraic structures that respects their operations. Homomorphisms reveal how structures relate, and the first isomorphism theorem turns every homomorphism into a quotient.
O: Check whether a map is a homomorphism and find its kernel and image
O: Apply the first isomorphism theorem
T: Homomorphism | A map φ: G → H with φ(ab) = φ(a)φ(b) for all a, b in G
T: Kernel | ker φ = {g : φ(g) = e}, always a normal subgroup
H: Examples
- Determinant: GL_{n}(ℝ) → ℝ^{×}, since det(AB) = det A det B.
- Exponential: (ℝ, +) → (ℝ_{>0}, ×), since e^{a+b} = e^{a}e^{b}.
- Sign of a permutation: S_{n} → {±1}, with kernel the alternating group A_{n}.
- Reduction mod n: ℤ → ℤ_{n}.
H: Properties
- φ(e) = e and φ(g^{−1}) = φ(g)^{−1}.
- φ is injective exactly when its kernel is trivial.
- The image is a subgroup of H.
H: First isomorphism theorem
- G/ker φ ≅ im φ.
- So |G| = |ker φ| × |im φ| for finite groups.
- Ring homomorphisms have kernels that are ideals, with the same theorem.
X: Let φ: ℤ → ℤ₅ send n to n mod 5. Find the kernel and image and apply the first isomorphism theorem.
> φ(a + b) = (a + b) mod 5 = φ(a) + φ(b), so φ is a homomorphism
> ker φ = 5ℤ (multiples of 5); im φ = ℤ₅ (it's onto)
> First isomorphism theorem: ℤ/5ℤ ≅ ℤ₅
K: Homomorphisms preserve operations; kernels are normal subgroups (ideals for rings); injective iff the kernel is trivial; G/ker φ ≅ im φ.
!: Forgetting to check the operation is preserved for all pairs, not just a few.
Q: What is the kernel of the sign homomorphism on S_{n}? | The alternating group A_{n}.
Q: When is a homomorphism injective? | When its kernel is just the identity.
SUM: Homomorphisms preserve structure.
SUM: Kernels give quotients.
SRC: Dummit DS, Foote RM, Abstract Algebra (3rd edn, Wiley 2004) | textbook | 2004 | https://www.wiley.com/
SRC: Artin M, Algebra (2nd edn, Pearson 2011) | textbook | 2011 | https://www.pearson.com/
NUM1#maths-u04-04-q1@1: What is the order of the kernel of the sign homomorphism on S₄? | 12 | 0 |  | The image {±1} has order 2, so |ker| = 24/2 = 12 (it's A₄).
M1#maths-u04-04-q2@1: Which map is a homomorphism from (ℝ, +) to (ℝ_{>0}, ×)? | x ↦ e^{x} | x ↦ x^{2} | x ↦ x + 1 | x ↦ |x| | x ↦ 1/x | e^{x+y} = e^{x}e^{y}, turning addition into multiplication.
M2#maths-u04-04-q3@2: A homomorphism from a group of order 12 has image of order 4. What is the order of its kernel? | 3 | 4 | 8 | 12 | 48 | By the first isomorphism theorem, |ker| = 12/4 = 3.

## Isomorphisms
S: An isomorphism is a bijective homomorphism: it shows two structures are "the same" apart from the names of their elements. Deciding whether two groups are isomorphic, and classifying groups up to isomorphism, is a central task in algebra.
O: Show two groups are isomorphic or prove they aren't using invariants
O: Classify small groups up to isomorphism
T: Isomorphism | A bijective homomorphism; its inverse is also a homomorphism
T: Invariant | A property preserved by isomorphisms, such as order, being abelian or the number of elements of each order
H: Proving isomorphism
- Exhibit a bijection that preserves the operation.
- (ℝ, +) ≅ (ℝ_{>0}, ×) via the exponential.
- ℤ₆ ≅ ℤ₂ × ℤ₃ since 2 and 3 are coprime (Chinese remainder theorem).
H: Proving non-isomorphism
- Find an invariant that differs: ℤ₄ has an element of order 4; ℤ₂ × ℤ₂ doesn't.
- S₃ is non-abelian, ℤ₆ abelian: not isomorphic, though both have order 6.
- Counting elements of each order is a powerful test.
H: Classification
- Every group is isomorphic to a group of permutations (Cayley's theorem).
- Groups of order 4: ℤ₄ and ℤ₂ × ℤ₂. Order 6: ℤ₆ and S₃. Order p: only ℤ_{p}.
- The classification of finite simple groups, completed over decades, is one of the largest projects in mathematics.
X: Show that ℤ₄ and ℤ₂ × ℤ₂ aren't isomorphic.
> In ℤ₄, the element 1 has order 4
> In ℤ₂ × ℤ₂, every non-identity element has order 2: (1, 0), (0, 1), (1, 1)
> Isomorphisms preserve element orders, so the groups aren't isomorphic
K: Isomorphic structures differ only in names; prove isomorphism with an explicit map and non-isomorphism with an invariant; small groups can be classified.
!: Concluding two groups are isomorphic because they have the same order.
Q: How many groups of order 6 are there up to isomorphism? | Two: ℤ₆ and S₃.
Q: What does Cayley's theorem say? | Every group is isomorphic to a group of permutations.
SUM: Isomorphisms identify structures.
SUM: Invariants distinguish them.
SRC: Gallian JA, Contemporary Abstract Algebra (10th edn, CRC Press 2021) | textbook | 2021 | https://www.routledge.com/
SRC: Artin M, Algebra (2nd edn, Pearson 2011) | textbook | 2011 | https://www.pearson.com/
NUM1#maths-u04-05-q1@1: How many groups of order 4 are there, up to isomorphism? | 2 | 0 |  | ℤ₄ and the Klein four-group ℤ₂ × ℤ₂.
M1#maths-u04-05-q2@1: Which invariant shows ℤ₆ and S₃ aren't isomorphic? | ℤ₆ is abelian but S₃ isn't | They have different orders | Both are cyclic | Neither has an identity | S₃ has no elements of order 2 | Being abelian is preserved by isomorphisms.
M3#maths-u04-05-q3@2: Is ℤ₂ × ℤ₄ isomorphic to ℤ₈? | No: ℤ₂ × ℤ₄ has no element of order 8 | Yes, since both have order 8 | Yes, because 2 × 4 = 8 | Only if both are cyclic | It can't be decided | ℤ_{m} × ℤ_{n} ≅ ℤ_{mn} only when gcd(m, n) = 1; here the largest element order is lcm(2, 4) = 4.

## Automorphisms
S: An automorphism is an isomorphism from a structure to itself: a symmetry of the structure. The automorphisms of a group form a group, which measures how symmetric the group is and connects to conjugation and Galois theory.
O: Find the automorphism group of small cyclic groups
O: Distinguish inner and outer automorphisms
T: Automorphism group | Aut(G), the group of isomorphisms G → G under composition
T: Inner automorphism | Conjugation by an element: x ↦ gxg^{−1}
H: Cyclic groups
- An automorphism of ℤ_{n} is determined by where it sends 1, which must be a generator.
- So |Aut(ℤ_{n})| = φ(n), and Aut(ℤ_{n}) ≅ the units of ℤ_{n} under multiplication.
- Aut(ℤ₈) has order 4 and is ℤ₂ × ℤ₂.
H: Inner and outer
- Conjugation by any g is an automorphism; these form Inn(G) ≅ G/Z(G), where Z(G) is the centre.
- Abelian groups have only the trivial inner automorphism.
- Out(G) = Aut(G)/Inn(G); S₆ is the only symmetric group with a non-trivial outer automorphism.
H: Other structures
- Aut(ℤ₂ × ℤ₂) ≅ S₃: any permutation of the three non-identity elements works.
- Field automorphisms: complex conjugation is an automorphism of ℂ fixing ℝ.
- Galois groups are automorphism groups of field extensions (later in this school).
X: Find Aut(ℤ₈).
> Generators of ℤ₈ are 1, 3, 5, 7, so there are φ(8) = 4 automorphisms: x ↦ x, 3x, 5x, 7x
> Each squares to the identity (3^{2} = 9 ≡ 1, 5^{2} ≡ 1, 7^{2} ≡ 1 mod 8)
> So Aut(ℤ₈) ≅ ℤ₂ × ℤ₂
K: Automorphisms are self-isomorphisms; Aut(ℤ_{n}) ≅ (ℤ_{n})^{×} with order φ(n); conjugations are inner automorphisms; outer ones are the rest.
!: Thinking every bijection of a group to itself is an automorphism: it must preserve the operation.
Q: How many automorphisms does ℤ₇ have? | 6.
Q: What are the inner automorphisms of an abelian group? | Only the identity map.
SUM: Automorphisms are symmetries of structures.
SUM: They form a group.
SRC: Dummit DS, Foote RM, Abstract Algebra (3rd edn, Wiley 2004) | textbook | 2004 | https://www.wiley.com/
SRC: Rotman JJ, An Introduction to the Theory of Groups (4th edn, Springer 1995) | textbook | 1995 | https://link.springer.com/
NUM1#maths-u04-06-q1@1: Find |Aut(ℤ₁₂)|. | 4 | 0 |  | |Aut(ℤ₁₂)| = φ(12) = 4 (multiplication by 1, 5, 7 or 11).
M1#maths-u04-06-q2@1: Which group is Aut(ℤ₂ × ℤ₂) isomorphic to? | S₃ | ℤ₄ | ℤ₂ | ℤ₂ × ℤ₂ | The trivial group | Any permutation of the three non-identity elements preserves the operation.
M2#maths-u04-06-q3@2: Why does complex conjugation count as a field automorphism of ℂ? | It's a bijection preserving both addition and multiplication | It changes the sign of every number | It maps every complex number onto the real line, fixing ℝ | It's the identity map | It reverses the order of numbers | conj(z + w) = conj z + conj w and conj(zw) = conj z × conj w.

## Quotient Structures
S: A quotient structure "divides out" a substructure, treating elements as equal when they differ by something in it. Quotient groups and rings, such as ℤ/nℤ and ℝ[x]/(x^{2} + 1) ≅ ℂ, build new structures and explain modular arithmetic.
O: Form quotient groups by normal subgroups and quotient rings by ideals
O: Identify quotients using the first isomorphism theorem
T: Normal subgroup | A subgroup N with gNg^{−1} = N for every g; exactly the subgroups that give quotient groups
T: Coset | A set gN = {gn : n ∈ N}; the cosets partition the group
H: Quotient groups
- The cosets of N in G form a group G/N with (aN)(bN) = (ab)N, provided N is normal.
- |G/N| = |G|/|N|.
- In abelian groups every subgroup is normal.
H: Quotient rings
- For an ideal I of a ring R, R/I has cosets a + I as elements.
- ℤ/nℤ is the integers mod n.
- ℝ[x]/(x^{2} + 1) ≅ ℂ, with x playing the role of i.
- R/I is a field exactly when I is a maximal ideal (see Commutative Algebra).
H: Meaning
- Quotients forget detail inside N (or I) while keeping the rest of the structure.
- Clock time is ℤ/12ℤ; angles are ℝ/2πℤ.
X: Describe the quotient ℤ₁₂/⟨4⟩.
> ⟨4⟩ = {0, 4, 8}, of order 3
> The quotient has 12/3 = 4 cosets: ⟨4⟩, 1 + ⟨4⟩, 2 + ⟨4⟩, 3 + ⟨4⟩
> 1 + ⟨4⟩ has order 4, so ℤ₁₂/⟨4⟩ ≅ ℤ₄
- Lagrange's theorem follows from cosets: they all have size |N| and partition G.
K: Cosets of a normal subgroup form G/N of order |G|/|N|; ideals give quotient rings; ℝ[x]/(x^{2} + 1) ≅ ℂ.
!: Forming G/H for a subgroup H that isn't normal, where coset multiplication isn't well defined.
Q: What is the order of S₄/A₄? | 2.
Q: What ring is ℤ/7ℤ? | The integers mod 7, a field.
SUM: Quotients divide out substructures.
SUM: Normal subgroups and ideals make them work.
SRC: Dummit DS, Foote RM, Abstract Algebra (3rd edn, Wiley 2004) | textbook | 2004 | https://www.wiley.com/
SRC: Artin M, Algebra (2nd edn, Pearson 2011) | textbook | 2011 | https://www.pearson.com/
NUM1#maths-u04-07-q1@1: What is the order of the quotient group ℤ₁₈/⟨3⟩? | 3 | 0 |  | ⟨3⟩ = {0, 3, …, 15} has 6 elements, so the quotient has 18/6 = 3.
M1#maths-u04-07-q2@1: Which subgroup is guaranteed to be normal? | Any subgroup of an abelian group | Any subgroup of S₃ | Any subgroup of order 2 | Any cyclic subgroup | Any subgroup of a non-abelian group | In an abelian group gng^{−1} = n, so every subgroup is normal.
M2#maths-u04-07-q3@2: In ℝ[x]/(x^{2} + 1), what is x^{2}? | −1 | 1 | 0 | x | x + 1 | Modulo x^{2} + 1, x^{2} = −1, so x behaves like i.

## Direct Products
S: The direct product combines two structures into one by working component by component. Direct products build bigger groups from smaller ones, and every finite abelian group is a direct product of cyclic groups.
O: Calculate orders of elements in direct products
O: Use the classification of finite abelian groups
T: Direct product | G × H, the set of pairs (g, h) with (g, h)(g′, h′) = (gg′, hh′)
T: Fundamental theorem of finite abelian groups | Every finite abelian group is a direct product of cyclic groups of prime-power order
H: Basics
- |G × H| = |G||H|.
- The order of (g, h) is lcm(order of g, order of h).
- ℤ_{m} × ℤ_{n} ≅ ℤ_{mn} exactly when gcd(m, n) = 1.
H: Finite abelian groups
- Abelian groups of order p^{k} correspond to partitions of k.
- Order 8: ℤ₈, ℤ₄ × ℤ₂, ℤ₂ × ℤ₂ × ℤ₂ (partitions 3, 2 + 1, 1 + 1 + 1).
- For general n, combine the counts for each prime power.
H: Other products
- Direct products of rings: ℤ₆ ≅ ℤ₂ × ℤ₃ as rings too (Chinese remainder theorem).
- Semidirect products twist the operation and build non-abelian groups such as D_{n}.
X: Find the order of (2, 3) in ℤ₄ × ℤ₆, and list the abelian groups of order 8.
> 2 has order 2 in ℤ₄; 3 has order 2 in ℤ₆; lcm(2, 2) = 2
> Abelian groups of order 8 correspond to partitions of 3
> ℤ₈, ℤ₄ × ℤ₂ and ℤ₂ × ℤ₂ × ℤ₂
- Example: ℤ₂ × ℤ₂ (the Klein four-group) describes the symmetries of a rectangle.
K: Products work componentwise; element order is the lcm; ℤ_{m} × ℤ_{n} ≅ ℤ_{mn} iff coprime; finite abelian groups are products of cyclic prime-power groups.
!: Assuming ℤ₂ × ℤ₄ ≅ ℤ₈ because the orders match.
Q: What is the largest element order in ℤ₆ × ℤ₁₀? | lcm(6, 10) = 30.
Q: Is ℤ₃ × ℤ₅ cyclic? | Yes: it's isomorphic to ℤ₁₅.
SUM: Direct products combine structures.
SUM: They classify finite abelian groups.
SRC: Gallian JA, Contemporary Abstract Algebra (10th edn, CRC Press 2021) | textbook | 2021 | https://www.routledge.com/
SRC: Fraleigh JB, A First Course in Abstract Algebra (7th edn, Pearson 2003) | textbook | 2003 | https://www.pearson.com/
NUM1#maths-u04-08-q1@1: How many abelian groups of order 36 are there, up to isomorphism? | 4 | 0 |  | 36 = 2^{2} × 3^{2}; each prime square gives 2 options, so 2 × 2 = 4.
M1#maths-u04-08-q2@1: What is the order of (1, 1) in ℤ₄ × ℤ₆? | 12 | 24 | 6 | 4 | 10 | The order of a pair is the lcm of the component orders: lcm(4, 6) = 12.
M3#maths-u04-08-q3@2: Which group is cyclic? | ℤ₉ × ℤ₄ | ℤ₂ × ℤ₆ | ℤ₃ × ℤ₃ | ℤ₄ × ℤ₆ | ℤ₂ × ℤ₂ | gcd(9, 4) = 1, so ℤ₉ × ℤ₄ ≅ ℤ₃₆; each of the others has a shared factor.

## Free Groups
S: A free group on a set of generators has no relations except those forced by the group axioms. Every group is a quotient of a free group, which is why groups can be described by presentations: generators plus relations.
O: Reduce words in a free group
O: Write and interpret group presentations
T: Free group | F(S), the group of reduced words in the generators S and their inverses, multiplied by concatenation and cancellation
T: Presentation | ⟨S | R⟩: the group generated by S subject to the relations R
H: Words
- Words are strings like ab^{−1}a; reduce by cancelling adjacent xx^{−1}.
- Each element has a unique reduced form.
- Free groups on two or more generators are non-abelian: ab ≠ ba.
H: Universal property
- Any function from S to a group G extends uniquely to a homomorphism F(S) → G.
- So every group generated by S is a quotient of F(S).
- Presentations: ℤ_{n} = ⟨a | a^{n}⟩; D_{n} = ⟨r, s | r^{n}, s^{2}, srs^{−1}r⟩.
H: Deeper results
- Nielsen–Schreier: every subgroup of a free group is free.
- The fundamental group of a figure-of-eight is the free group on two generators.
- The word problem (deciding whether a word equals the identity) is unsolvable for some finitely presented groups (Novikov, Boone).
X: Reduce the word abb^{−1}a^{−1}ba in the free group on a and b.
> Cancel bb^{−1}: aa^{−1}ba
> Cancel aa^{−1}: ba
> The reduced word is ba, of length 2
K: Free groups consist of reduced words; every group is a quotient of a free group; presentations ⟨S | R⟩ describe groups by generators and relations.
!: Cancelling non-adjacent letters, such as a and a^{−1} separated by b.
Q: Give a presentation of ℤ₅. | ⟨a | a^{5}⟩.
Q: What does Nielsen–Schreier say? | Subgroups of free groups are free.
SUM: Free groups have no extra relations.
SUM: Presentations describe groups compactly.
SRC: Magnus W, Karrass A, Solitar D, Combinatorial Group Theory (2nd edn, Dover 2004) | textbook | 2004 | https://store.doverpublications.com/
SRC: Hatcher A, Algebraic Topology (Cambridge University Press 2002) | textbook | 2002 | https://pi.math.cornell.edu/~hatcher/AT/ATpage.html
NUM1#maths-u04-09-q1@1: How many reduced words of length 2 are there in the free group on a and b? | 12 | 0 |  | 4 choices for the first letter (a, a^{−1}, b, b^{−1}), then 3 that don't cancel it: 4 × 3 = 12.
M1#maths-u04-09-q2@1: Which word is reduced in the free group on a and b? | ab^{−1}ab | abb^{−1}a | a^{−1}ab | baa^{−1} | bb^{−1} | Only ab^{−1}ab has no adjacent pair xx^{−1} or x^{−1}x.
M2#maths-u04-09-q3@2: Why is every group a quotient of a free group? | Mapping generators to the group's elements extends to a surjective homomorphism from the free group | Every group is itself free, so it is its own quotient | Free groups are finite | Every group is abelian | Only cyclic groups are quotients | The universal property gives the map; the first isomorphism theorem gives the quotient.

## Ring Theory
S: A ring has addition and multiplication, linked by the distributive law. Rings include the integers, polynomials, matrices and integers mod n, and studying their units, zero divisors and ideals generalises the arithmetic of whole numbers.
O: Identify units, zero divisors and integral domains
O: Recognise ideals and their role in ring theory
T: Zero divisor | A non-zero a with ab = 0 for some non-zero b
T: Integral domain | A commutative ring with 1 and no zero divisors, such as ℤ
H: Basics
- Ring axioms: abelian group under +, associative ×, distributive laws; often with 1.
- Units: elements with multiplicative inverses; in ℤ_{n} they're the residues coprime to n.
- Zero divisors: in ℤ₆, 2 × 3 = 0. Matrix rings have them too.
H: Types of rings
- Integral domains: cancellation works (ab = ac and a ≠ 0 imply b = c).
- Fields: every non-zero element is a unit; every finite integral domain is a field.
- Principal ideal domains (ℤ, F[x]) and unique factorisation domains generalise ℤ's arithmetic.
H: Ideals
- An ideal I is an additive subgroup with ra and ar in I for all r in R, a in I.
- Ideals are kernels of ring homomorphisms and give quotient rings.
- In ℤ every ideal is nℤ.
X: Find the units and zero divisors of ℤ₁₂.
> Units are residues coprime to 12: 1, 5, 7, 11 (each squares to 1)
> Zero divisors: 2, 3, 4, 6, 8, 9, 10 (for example 3 × 4 = 0)
> Every non-zero element of ℤ₁₂ is either a unit or a zero divisor
K: Rings have + and × with distributivity; units have inverses, zero divisors multiply to zero; integral domains have no zero divisors; ideals are kernels.
!: Assuming cancellation (ab = ac ⇒ b = c) works in every ring.
Q: Is ℤ₇ an integral domain? | Yes: it's a field, since 7 is prime.
Q: Give a zero divisor in the ring of 2 × 2 matrices. | For example [[1, 0], [0, 0]], whose product with [[0, 0], [0, 1]] is 0.
SUM: Rings generalise integer arithmetic.
SUM: Units, zero divisors and ideals describe them.
SRC: Dummit DS, Foote RM, Abstract Algebra (3rd edn, Wiley 2004) | textbook | 2004 | https://www.wiley.com/
SRC: Fraleigh JB, A First Course in Abstract Algebra (7th edn, Pearson 2003) | textbook | 2003 | https://www.pearson.com/
NUM1#maths-u04-10-q1@1: How many units are there in ℤ₂₀? | 8 | 0 |  | The units are the residues coprime to 20: φ(20) = 8.
M1#maths-u04-10-q2@1: Which ring has zero divisors? | ℤ₁₀ | ℤ | ℚ | ℤ₁₁ | ℝ | In ℤ₁₀, 2 × 5 = 10 ≡ 0 with both factors non-zero, so 2 and 5 are zero divisors.
M3#maths-u04-10-q3@2: Why is every finite integral domain a field? | Multiplying by a non-zero a is injective, hence onto, so some b gives ab = 1 | Every ring is a field | Every ring is a field, so it's automatic | Integral domains are always infinite | Finite rings never contain zero, so every element is invertible | Without zero divisors x ↦ ax is injective; on a finite set, injective implies surjective.

## Field Theory
S: Field theory studies fields and their extensions: bigger fields containing smaller ones, like ℚ ⊂ ℚ(√2) ⊂ ℝ. Measuring extensions by their degree answered ancient questions: angles can't be trisected and cubes can't be doubled with ruler and compass.
O: Find degrees of field extensions using minimal polynomials and the tower law
O: Explain classical impossibility results
T: Degree of an extension | [K : F], the dimension of K as a vector space over F
T: Minimal polynomial | The monic irreducible polynomial of least degree over F with α as a root; its degree is [F(α) : F]
H: Extensions
- ℚ(√2) = {a + b√2}: degree 2, minimal polynomial x^{2} − 2.
- ℚ(∛2): degree 3, minimal polynomial x^{3} − 2 (irreducible by Eisenstein's criterion).
- Tower law: [L : F] = [L : K][K : F].
- Algebraic numbers satisfy polynomials; transcendental ones (π, e) don't.
H: Finite fields
- Every finite field has p^{n} elements for a prime p, and there's exactly one of each such size.
- Characteristic: the smallest p with p × 1 = 0 (or 0 if none).
- Used in coding theory and cryptography (AES works in the field with 2^{8} elements).
H: Constructions
- Ruler-and-compass constructible numbers lie in towers of degree-2 extensions, so have degree a power of 2.
- Doubling the cube needs ∛2 (degree 3): impossible.
- Trisecting 60° needs cos 20°, a root of 8x^{3} − 6x − 1 (degree 3): impossible (Wantzel, 1837).
X: Find [ℚ(√2, √3) : ℚ].
> [ℚ(√2) : ℚ] = 2
> √3 isn't in ℚ(√2), so x^{2} − 3 stays irreducible and [ℚ(√2, √3) : ℚ(√2)] = 2
> Tower law: 2 × 2 = 4
K: Degree = dimension over the base field = degree of the minimal polynomial; degrees multiply in towers; finite fields have p^{n} elements; degree arguments prove impossibility.
!: Assuming every root of a polynomial of degree n generates an extension of degree n (the polynomial must be irreducible).
Q: What is the minimal polynomial of √5 over ℚ? | x^{2} − 5.
Q: How many elements can a finite field have? | A prime power p^{n}.
SUM: Field extensions are measured by degree.
SUM: Degrees settle classical construction problems.
SRC: Stewart I, Galois Theory (5th edn, CRC Press 2022) | textbook | 2022 | https://www.routledge.com/
SRC: Wantzel PL, Recherches sur les moyens de reconnaître si un problème de géométrie peut se résoudre avec la règle et le compas, Journal de Mathématiques Pures et Appliquées 2, 366 | journal | 1837 | http://www.numdam.org/
NUM1#maths-u04-11-q1@1: What is [ℚ(∛2) : ℚ]? | 3 | 0 |  | x^{3} − 2 is irreducible over ℚ, so the degree is 3.
M1#maths-u04-11-q2@1: Which field size is impossible for a finite field? | 6 | 8 | 9 | 25 | 2 | Finite fields have prime-power order, and 6 isn't a prime power.
M2#maths-u04-11-q3@2: Why can't a cube be doubled with ruler and compass? | ∛2 has degree 3, but constructible numbers have degree a power of 2 | Cubes have no diagonals to measure | Cubes have no diagonals | Compasses can't draw cubes | ∛2 is irrational, and compasses only draw rational lengths | Each construction step gives an extension of degree at most 2.

## Modules
S: A module is like a vector space but with scalars from a ring instead of a field. Abelian groups, ideals and vector spaces with a linear map are all modules, and the structure theorem over principal ideal domains unifies the classification of abelian groups and the Jordan normal form.
O: Recognise modules and how they differ from vector spaces
O: State the structure theorem for finitely generated modules over a PID
T: R-module | An abelian group M with scalar multiplication by a ring R satisfying the vector-space-style axioms
T: Torsion element | An m with rm = 0 for some non-zero r in R
H: Examples
- A vector space is a module over a field.
- Every abelian group is a ℤ-module: n·m means m added n times.
- An ideal of R is an R-module; so is R itself.
- A vector space V with a linear map T is an F[x]-module (x acts as T).
H: Differences from vector spaces
- Modules needn't have a basis: ℤ₂ is a ℤ-module with no basis (2·1 = 0).
- Free modules (with a basis) behave most like vector spaces.
- Torsion appears: in ℤ₆, 6·m = 0 for every m.
H: Structure theorem
- A finitely generated module over a PID is R^{r} ⊕ R/(d₁) ⊕ … ⊕ R/(d_{k}).
- Over ℤ, this is the classification of finitely generated abelian groups.
- Over F[x], it gives the rational and Jordan canonical forms of matrices.
X: Explain why ℤ₂, viewed as a ℤ-module, isn't free.
> A basis element b would need r·b = 0 to imply r = 0
> But 2·b = 0 in ℤ₂ for every b, with 2 ≠ 0 in ℤ
> So no element is linearly independent and ℤ₂ has no basis
K: Modules are vector spaces over rings; abelian groups are ℤ-modules; modules can have torsion and lack bases; the PID structure theorem classifies them.
!: Assuming every module has a basis, as every vector space does.
Q: What kind of module is an abelian group? | A ℤ-module.
Q: What is the rank of ℤ^{3} ⊕ ℤ₄? | 3.
SUM: Modules generalise vector spaces.
SUM: The structure theorem unifies classifications.
SRC: Dummit DS, Foote RM, Abstract Algebra (3rd edn, Wiley 2004) | textbook | 2004 | https://www.wiley.com/
SRC: Atiyah MF, Macdonald IG, Introduction to Commutative Algebra (Addison-Wesley 1969) | textbook | 1969 | https://www.routledge.com/
NUM1#maths-u04-12-q1@1: How many elements does the ℤ-module ℤ₂ ⊕ ℤ₃ have? | 6 | 0 |  | 2 × 3 = 6 (it's isomorphic to ℤ₆).
M1#maths-u04-12-q2@1: Which statement about modules is true? | A module over a field is a vector space | Every module has a basis | Modules never have torsion | Modules need a commutative field | ℤ₂ is a free ℤ-module | Over a field, the module axioms are exactly the vector space axioms.
M2#maths-u04-12-q3@2: What does the structure theorem give when R = F[x]? | Canonical forms of matrices, such as the Jordan form | The classification of finite fields | Galois groups | Free group presentations | The fundamental theorem of calculus | A linear map makes the space an F[x]-module, and its decomposition gives canonical forms.

## Algebras
S: An algebra over a field is a vector space with a compatible multiplication. Matrix algebras, polynomial algebras and Hamilton's quaternions are the classic examples, and only three associative division algebras exist over the reals.
O: Recognise algebras over a field and compute in the quaternions
O: State Frobenius's theorem on real division algebras
T: Algebra over a field | A vector space A over F with a bilinear multiplication; associative if (ab)c = a(bc)
T: Quaternions | ℍ = {a + bi + cj + dk} with i^{2} = j^{2} = k^{2} = ijk = −1
H: Examples
- Matrix algebra M_{n}(F), of dimension n^{2}.
- Polynomial algebra F[x], infinite-dimensional.
- Group algebras F[G] (see Ring Representations).
- ℂ is a 2-dimensional algebra over ℝ.
H: Quaternions
- Discovered by Hamilton in 1843, who carved the rules on Broom Bridge in Dublin.
- Multiplication isn't commutative: ij = k but ji = −k.
- Unit quaternions represent 3D rotations without gimbal lock, used in graphics and spacecraft.
H: Division algebras
- Frobenius (1877): the only finite-dimensional associative real division algebras are ℝ, ℂ and ℍ.
- Dropping associativity adds the octonions (dimension 8).
- Lie algebras are important non-associative algebras (later in this school).
X: Compute (1 + i)(1 + j) in the quaternions.
> Expand: 1 + j + i + ij
> ij = k
> (1 + i)(1 + j) = 1 + i + j + k
K: An algebra is a vector space with bilinear multiplication; M_{n}(F) has dimension n^{2}; quaternions are non-commutative; ℝ, ℂ, ℍ are the only associative real division algebras.
!: Assuming quaternion multiplication commutes.
Q: What is ji in the quaternions? | −k.
Q: What dimension does the algebra M₃(ℝ) have? | 9.
SUM: Algebras combine vector spaces with multiplication.
SUM: Quaternions are the key non-commutative example.
SRC: Hamilton WR, On quaternions; or on a new system of imaginaries in algebra, Philosophical Magazine 25, 489 | journal | 1844 | https://www.maths.tcd.ie/pub/HistMath/People/Hamilton/OnQuat/
SRC: Conway JH, Smith DA, On Quaternions and Octonions (A K Peters 2003) | textbook | 2003 | https://www.routledge.com/
NUM1#maths-u04-13-q1@1: What is the dimension of the algebra M₄(ℝ) of 4 × 4 real matrices? | 16 | 0 |  | An n × n matrix has n^{2} entries: 4^{2} = 16.
M1#maths-u04-13-q2@1: What is i^{2} in the quaternions? | −1 | 1 | k | 0 | i | Hamilton's rules give i^{2} = j^{2} = k^{2} = −1.
M3#maths-u04-13-q3@2: Why are unit quaternions used for 3D rotations in graphics? | They compose smoothly without gimbal lock | They commute, making rotations order-independent | They need fewer than three numbers | They avoid all floating-point error | They're the same as Euler angles | Quaternions represent rotations without the singularities of angle triples, and interpolate well.

## Commutative Algebra
S: Commutative algebra studies commutative rings and their ideals. Prime and maximal ideals generalise prime numbers, and the subject is the algebraic foundation of algebraic geometry and algebraic number theory.
O: Identify prime and maximal ideals
O: Use quotients to test whether an ideal is prime or maximal
T: Prime ideal | P ≠ R such that ab ∈ P implies a ∈ P or b ∈ P
T: Maximal ideal | M ≠ R with no ideal strictly between M and R
H: Prime and maximal
- R/P is an integral domain exactly when P is prime.
- R/M is a field exactly when M is maximal.
- Every maximal ideal is prime; not every prime ideal is maximal.
- In ℤ: (p) for primes p are maximal; (0) is prime but not maximal.
H: Noetherian rings
- Every ideal is finitely generated (equivalently, ascending chains of ideals stop).
- Hilbert's basis theorem: if R is Noetherian, so is R[x].
- So polynomial rings over fields are Noetherian.
H: Links to geometry
- Hilbert's Nullstellensatz: maximal ideals of ℂ[x₁, …, x_{n}] correspond to points of ℂ^{n}.
- Prime ideals correspond to irreducible varieties: geometry becomes algebra.
- Localisation and the spectrum of a ring are the starting points of scheme theory.
X: Decide whether (6) and (5) are prime or maximal ideals of ℤ, and whether (x) is maximal in ℤ[x].
> (6) isn't prime: 2 × 3 ∈ (6) but neither 2 nor 3 is
> ℤ/(5) = ℤ₅ is a field, so (5) is maximal (hence prime)
> ℤ[x]/(x) ≅ ℤ, a domain but not a field: (x) is prime but not maximal
K: P is prime iff R/P is a domain; M is maximal iff R/M is a field; maximal implies prime; Noetherian rings have finitely generated ideals.
!: Assuming every prime ideal is maximal, as happens for non-zero ideals of ℤ.
Q: Is (x^{2} + 1) maximal in ℝ[x]? | Yes: ℝ[x]/(x^{2} + 1) ≅ ℂ is a field.
Q: What does Hilbert's basis theorem say? | If R is Noetherian, then R[x] is Noetherian.
SUM: Prime and maximal ideals generalise primes.
SUM: Quotients test them.
SRC: Atiyah MF, Macdonald IG, Introduction to Commutative Algebra (Addison-Wesley 1969) | textbook | 1969 | https://www.routledge.com/
SRC: Eisenbud D, Commutative Algebra with a View Toward Algebraic Geometry (Springer 1995) | textbook | 1995 | https://link.springer.com/
NUM1#maths-u04-14-q1@1: How many maximal ideals does ℤ₁₂ have? | 2 | 0 |  | Maximal ideals of ℤ₁₂ correspond to primes dividing 12: (2) and (3).
M1#maths-u04-14-q2@1: Which ideal of ℤ is prime but not maximal? | (0) | (2) | (7) | (4) | ℤ itself | ℤ/(0) ≅ ℤ is an integral domain but not a field, so (0) is prime but not maximal.
M2#maths-u04-14-q3@2: Why is every maximal ideal prime? | A field is an integral domain, so R/M being a field makes it a domain | Prime ideals are always larger | Maximal ideals are always zero | Maximal ideals always contain every prime ideal of the ring | Every ideal is prime | If M is maximal then R/M is a field, every field is a domain, so R/M is a domain and M is prime.

## Galois Theory
S: Galois theory links field extensions to groups: the symmetries of the roots of a polynomial form its Galois group. The fundamental theorem matches subgroups with intermediate fields, and it explains why there's no general formula for solving quintic equations.
O: Find Galois groups of simple extensions
O: State the fundamental theorem and the criterion for solvability by radicals
T: Galois group | Gal(K/F), the automorphisms of K that fix every element of F
T: Solvable group | A group with a chain of subgroups whose successive quotients are abelian
H: Galois groups
- Gal(ℚ(√2)/ℚ) has two elements: the identity and √2 ↦ −√2.
- Gal(ℚ(√2, √3)/ℚ) ≅ ℤ₂ × ℤ₂ (signs of √2 and √3 chosen independently).
- The splitting field of x^{3} − 2 has degree 6 and Galois group S₃.
H: Fundamental theorem
- For a Galois extension K/F, subgroups H of Gal(K/F) correspond one-to-one with intermediate fields.
- The correspondence reverses inclusion; |H| = [K : fixed field of H].
- Normal subgroups correspond to Galois intermediate extensions.
H: Solving equations
- A polynomial is solvable by radicals iff its Galois group is solvable.
- S₅ isn't solvable, so x^{5} − x − 1, with Galois group S₅, has no formula in radicals.
- This completes the Abel–Ruffini theorem; Galois wrote it down before his death at 20 in 1832.
X: List the automorphisms of ℚ(√2, √3) over ℚ and count intermediate fields.
> Each automorphism sends √2 ↦ ±√2 and √3 ↦ ±√3: four automorphisms, forming ℤ₂ × ℤ₂
> ℤ₂ × ℤ₂ has 5 subgroups (trivial, three of order 2, whole group)
> So there are 5 intermediate fields: ℚ, ℚ(√2), ℚ(√3), ℚ(√6) and ℚ(√2, √3)
K: Galois groups are automorphisms fixing the base field; subgroups ↔ intermediate fields; solvable by radicals ⇔ solvable Galois group; general quintics aren't.
!: Thinking no quintic is solvable: x^{5} − 2 is solvable by radicals; only general quintics aren't.
Q: What is the Galois group of x^{2} − 3 over ℚ? | ℤ₂.
Q: Why is the general quintic not solvable by radicals? | Its Galois group S₅ isn't solvable.
SUM: Galois theory links fields and groups.
SUM: It settles solvability by radicals.
SRC: Stewart I, Galois Theory (5th edn, CRC Press 2022) | textbook | 2022 | https://www.routledge.com/
SRC: Artin E, Galois Theory (Dover 1998, from the 2nd edn 1944) | textbook | 1998 | https://store.doverpublications.com/
NUM1#maths-u04-15-q1@1: What is the order of the Galois group of the splitting field of x^{3} − 2 over ℚ? | 6 | 0 |  | The splitting field ℚ(∛2, ω) has degree 6, and its Galois group is S₃.
M1#maths-u04-15-q2@1: Which polynomial is solvable by radicals? | x^{5} − 2 | x^{5} − x − 1 | x^{5} − 4x + 2 | x^{5} − 6x + 3 | None of them | The roots of x^{5} − 2 are the real fifth root of 2 times the fifth roots of unity, all expressible by radicals.
M3#maths-u04-15-q3@2: In the fundamental theorem, what does a subgroup of order 2 in a Galois group of order 8 correspond to? | An intermediate field of degree 4 over the base | A field of degree 2 over the base | The base field | The whole extension | Nothing | The fixed field E of H satisfies [K : E] = |H| = 2, so [E : F] = 8/2 = 4.

## Homological Algebra
S: Homological algebra studies sequences of algebraic objects and maps, measuring how far they fail to be exact. It grew from algebraic topology and now provides tools (homology, Ext and Tor) used throughout algebra, geometry and topology.
O: Check exactness of sequences and compute simple homology groups
O: Describe derived functors such as Ext and Tor
T: Chain complex | A sequence of modules and maps … → C_{n+1} → C_{n} → C_{n−1} → … with each composite of two maps zero (∂^{2} = 0)
T: Homology | H_{n} = ker ∂_{n}/im ∂_{n+1}, measuring failure of exactness at C_{n}
H: Exact sequences
- A sequence is exact where the image of one map equals the kernel of the next.
- Short exact sequence 0 → A → B → C → 0: A injects into B and C ≅ B/A.
- Example: 0 → ℤ → ℤ → ℤ₂ → 0, with the first map multiplication by 2.
H: Homology
- Exactness everywhere gives zero homology.
- In topology, homology counts holes: H₁ of a circle is ℤ.
- Euler characteristic: alternating sum of ranks, unchanged by taking homology.
H: Tools
- The snake lemma and five lemma relate exact sequences.
- Derived functors Ext and Tor measure the failure of Hom and ⊗ to preserve exactness.
- Ext¹ classifies extensions; Tor detects torsion: Tor(ℤ_{m}, ℤ_{n}) ≅ ℤ_{gcd(m,n)}.
X: Check that 0 → ℤ → ℤ → ℤ₂ → 0, with maps n ↦ 2n and reduction mod 2, is exact.
> At the first ℤ: n ↦ 2n is injective, so the kernel is 0, the image of the zero map
> At the middle ℤ: the image of ×2 is 2ℤ, which is exactly the kernel of reduction mod 2
> At ℤ₂: reduction is onto, so its image is the kernel of the final zero map ✓
K: Complexes satisfy ∂^{2} = 0; homology is ker/im; exact sequences have zero homology; Ext and Tor measure failures of exactness.
!: Calling a sequence exact because consecutive composites are zero: that only makes it a complex.
Q: What is the condition for a sequence of maps to be a chain complex? | Each composite of consecutive maps is zero.
Q: What is a short exact sequence? | 0 → A → B → C → 0 exact at every place.
SUM: Homological algebra measures exactness.
SUM: Homology turns failure into algebraic invariants.
SRC: Weibel CA, An Introduction to Homological Algebra (Cambridge University Press 1994) | textbook | 1994 | https://www.cambridge.org/
SRC: Hatcher A, Algebraic Topology (Cambridge University Press 2002) | textbook | 2002 | https://pi.math.cornell.edu/~hatcher/AT/ATpage.html
NUM1#maths-u04-16-q1@1: For the complex 0 → ℤ → ℤ → 0 with the middle map multiplication by 3, what is the order of the homology at the second ℤ? | 3 | 0 |  | Kernel of the zero map is ℤ, image of ×3 is 3ℤ, so the homology is ℤ/3ℤ, of order 3.
M1#maths-u04-16-q2@1: What does it mean for a sequence to be exact at B in A → B → C? | The image of A → B equals the kernel of B → C | The maps are bijections | B is zero | The composite is the identity | A and C are isomorphic | Exactness means image equals kernel at each place.
M2#maths-u04-16-q3@2: What is Tor(ℤ₄, ℤ₆)? | ℤ₂ | ℤ₄ | ℤ₆ | ℤ₁₂ | 0 | Tor(ℤ_{m}, ℤ_{n}) ≅ ℤ_{gcd(m, n)}, and gcd(4, 6) = 2.

## Universal Algebra
S: Universal algebra studies algebraic structures in general: sets with operations satisfying identities. It explains why groups, rings and lattices share theorems such as the isomorphism theorems, and which classes of structures can be defined by equations alone.
O: Describe algebras, signatures and varieties
O: Use closure properties to decide whether a class is a variety
T: Signature | The list of operation symbols and their arities, such as (·, ⁻¹, e) for groups
T: Variety | A class of algebras defined by identities (equations that hold for all values)
H: Basic notions
- An algebra is a set with operations of given arities.
- Groups form a variety when inverse and identity are included as operations.
- Subalgebras, homomorphisms, products and quotients (congruences) are defined uniformly.
H: Birkhoff's HSP theorem
- A class is a variety exactly when it's closed under homomorphic images (H), subalgebras (S) and products (P).
- Fields aren't a variety: F × F has zero divisors, so it isn't a field.
- Free algebras exist in every variety.
H: Wider context
- Isomorphism theorems hold for all algebras, via congruences.
- Equational logic: what identities follow from given ones.
- Category theory generalises further, studying structures through their maps.
X: Show that fields don't form a variety.
> Varieties are closed under products
> In ℚ × ℚ, (1, 0) × (0, 1) = (0, 0): zero divisors, so ℚ × ℚ isn't a field
> Fields aren't closed under products, so they can't be defined by identities alone (x ≠ 0 ⇒ x has an inverse isn't an identity)
K: Universal algebra studies sets with operations; varieties are defined by identities; Birkhoff: varieties are exactly classes closed under H, S and P.
!: Thinking any class described by axioms is a variety: the axioms must be identities.
Q: Are abelian groups a variety? | Yes: add the identity xy = yx to the group identities.
Q: What does HSP stand for in Birkhoff's theorem? | Homomorphic images, subalgebras and products.
SUM: Universal algebra studies structures in general.
SUM: Varieties are defined by equations.
SRC: Burris S, Sankappanavar HP, A Course in Universal Algebra (Springer 1981) | textbook | 1981 | https://www.math.uwaterloo.ca/~snburris/htdocs/ualg.html
SRC: Birkhoff G, On the structure of abstract algebras, Mathematical Proceedings of the Cambridge Philosophical Society 31(4), 433 | journal | 1935 | https://doi.org/10.1017/S0305004100013463
NUM1#maths-u04-17-q1@1: How many binary operations are there on a 2-element set? | 16 | 0 |  | Each of the 4 ordered pairs can map to either of 2 elements: 2^{4} = 16.
M1#maths-u04-17-q2@1: Which class is a variety? | Abelian groups | Fields | Integral domains | Finite groups | Division rings | Abelian groups are defined by identities; the others need non-equational conditions.
M2#maths-u04-17-q3@2: Why can't integral domains be defined by identities alone? | "ab = 0 implies a = 0 or b = 0" isn't an identity, and products of domains have zero divisors | Integral domains can't be described by any axioms at all | Domains are always fields | They have no operations | They're always finite | ℤ × ℤ isn't a domain, so the class isn't closed under products.

## Representation Theory
S: Representation theory studies abstract algebraic objects by making them act as linear maps on vector spaces. Matrices can be computed with, so representations turn hard questions about groups and algebras into linear algebra, with applications from chemistry to particle physics.
O: Define a representation and give simple examples
O: Explain why representations are useful and what irreducibility means
T: Representation | A homomorphism from a group (or algebra) to the invertible linear maps on a vector space
T: Irreducible representation | A representation with no proper non-zero invariant subspace
H: Examples
- ℤ₄ acting on ℝ^{2} by rotations through multiples of 90°.
- S_{n} permuting the coordinates of ℝ^{n}.
- The trivial representation: every element acts as the identity.
H: Building blocks
- Irreducible representations are the "atoms"; others decompose into them.
- Maschke's theorem: for finite groups over ℂ (or any field whose characteristic doesn't divide |G|), every representation is a direct sum of irreducibles.
- Schur's lemma: maps between irreducibles are zero or isomorphisms.
H: Applications
- Chemistry: molecular symmetry groups classify vibrations and orbitals.
- Physics: particles correspond to irreducible representations of symmetry groups.
- Fourier analysis is the representation theory of the circle group.
X: Give a 2-dimensional representation of ℤ₄ and check it respects the group structure.
> Send 1 ∈ ℤ₄ to the rotation R = [[0, −1], [1, 0]] (90°)
> Then k ↦ R^{k}; R^{2} = −I, R^{3} = −R, R^{4} = I
> Since R^{4} = I, adding exponents mod 4 matches the group operation ✓
K: Representations make groups act by matrices; irreducibles are the building blocks; Maschke and Schur govern decomposition; applications span science.
!: Thinking a representation must be injective: it only needs to be a homomorphism.
Q: What does Maschke's theorem guarantee? | Complete reducibility of representations of finite groups (when the characteristic doesn't divide |G|).
Q: What is the trivial representation? | Every group element acts as the identity map.
SUM: Representations turn algebra into linear algebra.
SUM: Irreducibles are the building blocks.
SRC: James G, Liebeck M, Representations and Characters of Groups (2nd edn, Cambridge University Press 2001) | textbook | 2001 | https://www.cambridge.org/
SRC: Fulton W, Harris J, Representation Theory: A First Course (Springer 1991) | textbook | 1991 | https://link.springer.com/
NUM1#maths-u04-18-q1@1: What is the trace of the 90° rotation matrix [[0, −1], [1, 0]]? | 0 | 0 |  | The diagonal entries are 0 and 0, so the trace is 0.
M1#maths-u04-18-q2@1: What is an irreducible representation? | One with no proper non-zero invariant subspace | One that's injective | One of dimension 1 only | One with real entries only | One whose matrices are all of dimension 1 | Irreducibles can't be broken into smaller invariant pieces.
M2#maths-u04-18-q3@2: Why does representation theory help with chemistry? | Molecular symmetry groups act on vibrations and orbitals, which decompose into irreducibles | Molecules are groups | Molecules are themselves groups | It predicts reaction rates directly | It replaces quantum mechanics in calculating molecular energies | Symmetry classifies vibrational modes and selection rules in spectroscopy.

## Group Representations
S: The representations of a finite group are captured by characters: the traces of the representing matrices. Character tables summarise everything about a group's representations in a small square array.
O: Use the counting formulas for irreducible representations
O: Read and construct small character tables
T: Character | χ(g) = trace of ρ(g); it's constant on conjugacy classes
T: Character table | A table of the irreducible characters evaluated on each conjugacy class
H: Counting
- The number of irreducible representations (over ℂ) equals the number of conjugacy classes.
- The squares of their dimensions add to |G|.
- Each dimension divides |G|.
- Abelian groups have only 1-dimensional irreducibles: |G| of them.
H: S₃
- Three classes: identity, transpositions (3), 3-cycles (2).
- Irreducibles: trivial (1), sign (1), standard (2): 1 + 1 + 4 = 6 ✓.
- Standard character: 2 at the identity, 0 on transpositions, −1 on 3-cycles.
H: Orthogonality
- Irreducible characters are orthonormal: (1/|G|) Σ χ(g) conj(ψ(g)) = 1 if χ = ψ, else 0.
- This decomposes any representation by computing inner products.
- Character tables reveal normal subgroups and whether a group is simple.
X: Use the counting formulas to find the dimensions of the irreducible representations of the dihedral group D₄ (order 8, five conjugacy classes).
> Five classes, so five irreducibles, with squares of dimensions adding to 8
> Trying 1s and 2s: 1 + 1 + 1 + 1 + 4 = 8
> So D₄ has four 1-dimensional and one 2-dimensional irreducible representation
K: Number of irreducibles = number of classes; Σd^{2} = |G|; characters are traces, constant on classes and orthonormal.
!: Forgetting that dimensions must divide |G| when solving Σd^{2} = |G|.
Q: How many irreducible representations does an abelian group of order 10 have? | 10, all 1-dimensional.
Q: What is a character constant on? | Conjugacy classes.
SUM: Characters summarise representations.
SUM: Counting formulas pin down dimensions.
SRC: James G, Liebeck M, Representations and Characters of Groups (2nd edn, Cambridge University Press 2001) | textbook | 2001 | https://www.cambridge.org/
SRC: Serre JP, Linear Representations of Finite Groups (Springer 1977) | textbook | 1977 | https://link.springer.com/
NUM1#maths-u04-19-q1@1: A group of order 12 has irreducible representations of dimensions 1, 1, 1 and d. Find d. | 3 | 0 |  | 1 + 1 + 1 + d^{2} = 12 gives d^{2} = 9, so d = 3 (this is A₄).
M1#maths-u04-19-q2@1: How many irreducible complex representations does S₃ have? | 3 | 6 | 2 | 1 | 4 | S₃ has three conjugacy classes, so three irreducibles.
M3#maths-u04-19-q3@2: The standard 2-dimensional character of S₃ takes which value on a 3-cycle? | −1 | 0 | 2 | 1 | 3 | A 3-cycle acts as a 120° rotation on the 2-dimensional space, with trace 2 cos 120° = −1.

## Ring Representations
S: A representation of a ring is the same thing as a module: the ring acts on an abelian group by linear maps. Group representations become modules over the group algebra, and the Artin–Wedderburn theorem describes semisimple rings as products of matrix rings.
O: Relate group representations to modules over the group algebra
O: State the Artin–Wedderburn theorem and apply it to ℂ[G]
T: Group algebra | F[G], the vector space with basis G, multiplied using the group operation
T: Semisimple ring | A ring over which every module is a direct sum of simple modules
H: Modules as representations
- A representation of R on V is a ring homomorphism R → End(V): exactly an R-module structure.
- Representations of G over F are the same as F[G]-modules.
- Simple modules correspond to irreducible representations.
H: Artin–Wedderburn
- A semisimple ring is a finite product of matrix rings over division rings.
- Over ℂ: ℂ[G] ≅ M_{d₁}(ℂ) × … × M_{d_{k}}(ℂ), one block per irreducible of dimension d_{i}.
- Comparing dimensions gives Σd_{i}^{2} = |G|.
H: Beyond semisimple
- In characteristic p dividing |G|, F[G] isn't semisimple: modular representation theory.
- Quiver representations and the representations of finite-dimensional algebras are active research areas.
X: Describe ℂ[S₃] using Artin–Wedderburn.
> S₃ has irreducibles of dimensions 1, 1 and 2
> ℂ[S₃] ≅ ℂ × ℂ × M₂(ℂ)
> Dimension check: 1 + 1 + 4 = 6 = |S₃| ✓
K: Ring representations are modules; group representations are F[G]-modules; semisimple rings are products of matrix rings; ℂ[G] ≅ Π M_{d}(ℂ).
!: Applying Maschke and Artin–Wedderburn in characteristic dividing |G|, where they fail.
Q: What is a representation of a ring R the same as? | An R-module.
Q: What is the dimension of ℂ[G] for |G| = 10? | 10.
SUM: Modules are ring representations.
SUM: Artin–Wedderburn decomposes semisimple rings.
SRC: Lam TY, A First Course in Noncommutative Rings (2nd edn, Springer 2001) | textbook | 2001 | https://link.springer.com/
SRC: Etingof P et al, Introduction to Representation Theory (American Mathematical Society 2011) | textbook | 2011 | https://math.mit.edu/~etingof/repb.pdf
NUM1#maths-u04-20-q1@1: What is the dimension of the group algebra ℂ[S₄]? | 24 | 0 |  | ℂ[G] has a basis indexed by G, and |S₄| = 24.
M1#maths-u04-20-q2@1: What does the Artin–Wedderburn theorem describe? | Semisimple rings as products of matrix rings over division rings | All rings as fields | Groups as permutations | Lie algebras by root systems | Every ring as a product of fields of prime order | That's the structure theorem for semisimple rings.
M2#maths-u04-20-q3@2: When is the group algebra F[G] not semisimple? | When the characteristic of F divides |G| | When G is abelian | When F = ℂ | When G is cyclic | Whenever G is abelian, whatever the field | Maschke's theorem fails exactly when char F divides |G|.

## Lie Groups
S: A Lie group is a group that's also a smooth space, with smooth multiplication and inversion. Rotations, the circle, invertible matrices and the symmetry groups of physics are Lie groups, combining algebra, geometry and analysis.
O: Recognise common Lie groups and find their dimensions
O: Explain the role of Lie groups in describing continuous symmetry
T: Lie group | A group that's a smooth manifold, with smooth group operations
T: Matrix Lie group | A closed subgroup of GL_{n}(ℝ) or GL_{n}(ℂ)
H: Examples
- GL_{n}(ℝ): invertible matrices, dimension n^{2}.
- SL_{n}(ℝ): determinant 1, dimension n^{2} − 1.
- SO(n): rotations of ℝ^{n}, dimension n(n − 1)/2; SO(2) is the circle of plane rotations.
- U(1) (unit complex numbers) and SU(2) (unit quaternions, a 3-sphere).
H: Continuous symmetry
- Noether's theorem: continuous symmetries give conservation laws (time translation ↔ energy, rotation ↔ angular momentum).
- The Standard Model's gauge group is SU(3) × SU(2) × U(1).
- SU(2) double-covers SO(3), which is why electrons have spin ½.
H: Structure
- Near the identity, a Lie group is determined by its Lie algebra (next lesson).
- The exponential map sends Lie algebra elements to group elements.
- Compact Lie groups have well-behaved representation theory, generalising Fourier series.
X: Explain why SO(3) has dimension 3.
> A rotation of 3D space is fixed by its axis and its angle
> The axis is a direction (2 parameters) and the angle 1 parameter
> 3 parameters in total, matching n(n − 1)/2 = 3 for n = 3
K: Lie groups are smooth groups; dim GL_{n} = n^{2}, SL_{n} = n^{2} − 1, SO(n) = n(n − 1)/2; they model continuous symmetry in physics.
!: Thinking SO(3) and SU(2) are the same group: SU(2) is a double cover.
Q: What is the dimension of SL₂(ℝ)? | 3.
Q: What gauge group does the Standard Model use? | SU(3) × SU(2) × U(1).
SUM: Lie groups combine algebra and smoothness.
SUM: They describe continuous symmetry.
SRC: Hall BC, Lie Groups, Lie Algebras, and Representations (2nd edn, Springer 2015) | textbook | 2015 | https://link.springer.com/
SRC: Stillwell J, Naive Lie Theory (Springer 2008) | textbook | 2008 | https://link.springer.com/
NUM1#maths-u04-21-q1@1: What is the dimension of SO(4)? | 6 | 0 |  | n(n − 1)/2 = 4 × 3/2 = 6.
M1#maths-u04-21-q2@1: Which group is a Lie group? | The rotations SO(3) | The integers ℤ₁₂ | The symmetric group S₅ | The free group on two letters | The quaternion group of order 8 | SO(3) is a smooth 3-dimensional manifold; the others are discrete.
M2#maths-u04-21-q3@2: According to Noether's theorem, which conservation law comes from rotational symmetry? | Angular momentum | Energy | Linear momentum | Electric charge | Mass | Invariance under rotations gives conservation of angular momentum.

## Lie Algebras
S: A Lie algebra captures the infinitesimal structure of a Lie group: its tangent space at the identity with the bracket [X, Y] = XY − YX. Simple Lie algebras were completely classified by Killing and Cartan, one of the great achievements of mathematics.
O: Compute Lie brackets of matrices and check the axioms
O: Describe sl₂ and the classification of simple Lie algebras
T: Lie algebra | A vector space with a bilinear bracket that's antisymmetric and satisfies the Jacobi identity
T: Jacobi identity | [X, [Y, Z]] + [Y, [Z, X]] + [Z, [X, Y]] = 0
H: Examples
- Matrices with the commutator [X, Y] = XY − YX.
- so(3): 3 × 3 antisymmetric matrices, isomorphic to ℝ^{3} with the cross product.
- sl₂: trace-zero 2 × 2 matrices with basis e, f, h and [h, e] = 2e, [h, f] = −2f, [e, f] = h.
H: Group and algebra
- The Lie algebra is the tangent space at the identity of the Lie group.
- exp maps the algebra to the group: exp of an antisymmetric matrix is a rotation.
- Representations of sl₂ (and su(2)) explain quantum angular momentum.
H: Classification
- Simple complex Lie algebras: four infinite families A_{n}, B_{n}, C_{n}, D_{n} and five exceptional ones, E₆, E₇, E₈, F₄, G₂.
- They're classified by root systems and Dynkin diagrams.
- E₈ has dimension 248.
X: With h = [[1, 0], [0, −1]] and e = [[0, 1], [0, 0]], compute [h, e].
> he = [[0, 1], [0, 0]]
> eh = [[0, −1], [0, 0]]
> [h, e] = he − eh = [[0, 2], [0, 0]] = 2e
K: Lie algebras have antisymmetric brackets with the Jacobi identity; matrix commutators give examples; sl₂ is the basic building block; simple Lie algebras are classified by Dynkin diagrams.
!: Treating the bracket as an associative product: [X, [Y, Z]] ≠ [[X, Y], Z] in general.
Q: What is [X, X] in any Lie algebra? | 0.
Q: How many exceptional simple complex Lie algebras are there? | Five.
SUM: Lie algebras linearise Lie groups.
SUM: Simple ones are completely classified.
SRC: Humphreys JE, Introduction to Lie Algebras and Representation Theory (Springer 1972) | textbook | 1972 | https://link.springer.com/
SRC: Hall BC, Lie Groups, Lie Algebras, and Representations (2nd edn, Springer 2015) | textbook | 2015 | https://link.springer.com/
NUM1#maths-u04-22-q1@1: What is the dimension of sl₃, the trace-zero 3 × 3 matrices? | 8 | 0 |  | 9 entries with one condition (trace 0): 9 − 1 = 8.
M1#maths-u04-22-q2@1: Which property does every Lie bracket have? | Antisymmetry: [X, Y] = −[Y, X] | Commutativity: [X, Y] = [Y, X] | Associativity of the bracket | An identity element for the bracket | Invertibility of every element | Antisymmetry and the Jacobi identity define a Lie algebra.
M2#maths-u04-22-q3@2: What is so(3) isomorphic to as a Lie algebra? | ℝ^{3} with the cross product | ℝ^{3} with the dot product | ℂ with multiplication | sl₃ | The quaternions | Antisymmetric 3 × 3 matrices correspond to vectors, with the bracket as the cross product.
`;
