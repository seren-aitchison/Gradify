// School 2: Number Theory and Cryptography. Format: kit/course/notes.js. Standard: docs/CURRICULUM_CONTENT_STANDARD.md
// From divisibility and congruences to the classical theorems, modern number theory and the cryptography built on it.
export default `
## Elementary Number Theory
S: Number theory studies the integers: divisibility, primes and the patterns they hide. Gauss called it the queen of mathematics, and its once "useless" results now secure online banking and messaging.
O: Use the division algorithm and the language of divisibility
O: Prove simple divisibility results
T: Divides | a | b means b = ka for some integer k
T: Division algorithm | For integers a and b > 0 there are unique q and r with a = bq + r and 0 ≤ r < b
H: Divisibility
- a | b and a | c imply a | (bx + cy) for any integers x and y.
- Every integer greater than 1 is a product of primes, uniquely apart from order (the fundamental theorem of arithmetic).
- Parity (odd and even) and remainders sort integers into classes.
H: Proof techniques
- Write numbers in a general form: an odd number is 2k + 1.
- Split into cases by remainder: every integer is 3k, 3k + 1 or 3k + 2.
- Factorise: n^{3} − n = (n − 1)n(n + 1), three consecutive integers.
H: Big questions
- Some easy-to-state problems took centuries: Fermat's Last Theorem (proved by Wiles in 1995).
- Others remain open: Goldbach's conjecture (every even number above 2 is a sum of two primes).
- Number theory feeds cryptography, coding theory and computer science.
X: Prove that n^{3} − n is divisible by 6 for every integer n.
> n^{3} − n = (n − 1)n(n + 1), a product of three consecutive integers
> Among any two consecutive integers one is even, so 2 divides it; among any three, one is a multiple of 3
> Since 2 and 3 are coprime, 6 divides n^{3} − n ∎
K: a | b means b = ka; the division algorithm gives unique quotient and remainder; prove by general forms, cases by remainder and factorising.
!: Checking a few values of n and calling it a proof.
Q: What are the quotient and remainder when 47 is divided by 6? | q = 7, r = 5.
Q: If a | b and a | c, does a divide b − c? | Yes.
SUM: Number theory studies integers and divisibility.
SUM: Remainders and factorising drive proofs.
SRC: Hardy GH, Wright EM, An Introduction to the Theory of Numbers (6th edn, Oxford University Press 2008) | textbook | 2008 | https://global.oup.com/
SRC: Burton DM, Elementary Number Theory (7th edn, McGraw-Hill 2011) | textbook | 2011 | https://www.mheducation.com/
NUM1#maths-u02-01-q1@1: Find the remainder when 1,000 is divided by 37. | 1 | 0 |  | 37 × 27 = 999, so 1,000 = 37 × 27 + 1 and the remainder is 1.
M1#maths-u02-01-q2@1: Which form describes every odd integer? | 2k + 1 for some integer k | 2k for some integer k | k + 2 for some integer k | k^{2} for some integer k | 3k + 1 for some integer k | Odd integers leave remainder 1 on division by 2, so each is 2k + 1.
M2#maths-u02-01-q3@2: Why is the product of any three consecutive integers divisible by 3? | One of any three consecutive integers is a multiple of 3 | Three consecutive numbers always include a multiple of 9 | Every integer is divisible by 3 | Only if the first is odd | It isn't always divisible by 3 | Remainders mod 3 cycle 0, 1, 2, so one of the three has remainder 0.

## Modular Arithmetic
S: Modular arithmetic is "clock arithmetic": numbers wrap around after reaching a modulus. It turns huge calculations into small ones and is the language of check digits, calendars and cryptography.
O: Calculate sums, products and powers modulo n
O: Use cycles of powers to find last digits and remainders
T: Congruent modulo n | a ≡ b (mod n) means n divides a − b: a and b leave the same remainder on division by n
T: Residue | The remainder of a number modulo n, between 0 and n − 1
H: Rules
- If a ≡ b and c ≡ d (mod n), then a + c ≡ b + d and ac ≡ bd (mod n).
- Reduce early: 37 × 52 mod 5 = 2 × 2 = 4.
- Division isn't automatic: you can "divide" by a only when a has an inverse mod n (gcd(a, n) = 1).
H: Powers
- Powers cycle: 3^{k} mod 10 runs 3, 9, 7, 1, 3, 9, ….
- To find 3^{2025} mod 10, reduce the exponent by the cycle length 4.
- Fermat's and Euler's theorems explain the cycles (later in this school).
H: Uses
- The time 9 hours after 20:00 is 29 mod 24 = 5:00.
- Check digits: ISBN-10 uses mod 11, bank card numbers use the Luhn mod 10 check.
- Hash tables, random number generators and cryptography all use modular arithmetic.
X: Find the last digit of 3^{2025}.
> Last digits of powers of 3 cycle with length 4: 3, 9, 7, 1
> 2025 = 4 × 506 + 1, so 3^{2025} ≡ 3^{1} (mod 10)
> The last digit is 3
K: Congruence means equal remainders; reduce before multiplying; powers cycle, so reduce exponents by the cycle length.
!: Dividing both sides of a congruence by a number that isn't coprime to the modulus.
Q: What is 17 mod 5? | 2.
Q: What day of the week is 100 days after a Monday? | Wednesday (100 ≡ 2 mod 7).
SUM: Modular arithmetic wraps numbers around.
SUM: Powers cycle mod n.
SRC: Burton DM, Elementary Number Theory (7th edn, McGraw-Hill 2011) | textbook | 2011 | https://www.mheducation.com/
SRC: Gauss CF, Disquisitiones Arithmeticae (1801), trans. Clarke AA (Springer 1986) | textbook | 1986 | https://link.springer.com/
NUM1#maths-u02-02-q1@1: Find 7^{4} mod 9. | 7 | 0 |  | 7^{2} = 49 ≡ 4, so 7^{4} ≡ 4^{2} = 16 ≡ 7 (mod 9).
M1#maths-u02-02-q2@1: What is 245 × 378 mod 10? | 0 | 5 | 8 | 4 | 2 | Only last digits matter mod 10: 5 × 8 = 40 ≡ 0.
M2#maths-u02-02-q3@2: Why can't you always cancel a factor in a congruence like 2x ≡ 2y (mod 4)? | 2 shares a factor with 4, so x and y may differ by 2 | Congruences can't be multiplied | Cancelling is always allowed | Because 2 is prime, so it can never be cancelled | The congruence is false | x = 1 and y = 3 satisfy 2x ≡ 2y (mod 4) though x ≢ y (mod 4).

## Congruences
S: A congruence equation such as 3x ≡ 4 (mod 7) asks which integers satisfy a relationship modulo n. Solving them uses inverses and the gcd, and they explain the divisibility tests learnt at school.
O: Solve linear congruences ax ≡ b (mod n)
O: Prove divisibility tests using congruences
T: Linear congruence | An equation ax ≡ b (mod n); it has solutions exactly when gcd(a, n) divides b
T: Modular inverse | A number a^{−1} with a × a^{−1} ≡ 1 (mod n); it exists when gcd(a, n) = 1
H: Solving
- If gcd(a, n) = 1, multiply both sides by a^{−1}: x ≡ a^{−1}b (mod n), a unique solution.
- If d = gcd(a, n) divides b, there are d solutions mod n; divide through by d first.
- If d doesn't divide b, there are none: 2x ≡ 1 (mod 4) has no solution.
H: Divisibility tests
- 10 ≡ 1 (mod 9), so a number is congruent to its digit sum mod 9 (and mod 3).
- 10 ≡ −1 (mod 11): alternate the signs of the digits for the 11 test.
- 10 ≡ 0 (mod 2 and 5): only the last digit matters.
H: Systems
- Several congruences with coprime moduli are solved by the Chinese remainder theorem (later in this school).
- Polynomial congruences such as x^{2} ≡ a (mod p) lead to quadratic residues.
X: Solve 3x ≡ 4 (mod 7).
> gcd(3, 7) = 1, so 3 has an inverse; 3 × 5 = 15 ≡ 1, so 3^{−1} ≡ 5
> x ≡ 5 × 4 = 20 ≡ 6 (mod 7)
> Check: 3 × 6 = 18 ≡ 4 (mod 7) ✓
- Check every solution by substituting it back into the original congruence.
K: ax ≡ b (mod n) is solvable iff gcd(a, n) | b; multiply by the inverse when it exists; congruences prove divisibility tests.
!: Assuming every linear congruence has exactly one solution.
Q: Does 4x ≡ 6 (mod 10) have solutions? | Yes: gcd(4, 10) = 2 divides 6, giving two solutions mod 10 (x ≡ 4 or 9).
Q: Why does the digit-sum test work for 9? | Because 10 ≡ 1 (mod 9).
SUM: Linear congruences are solved with inverses.
SUM: Congruences explain divisibility tests.
SRC: Niven I, Zuckerman HS, Montgomery HL, An Introduction to the Theory of Numbers (5th edn, Wiley 1991) | textbook | 1991 | https://www.wiley.com/
SRC: Burton DM, Elementary Number Theory (7th edn, McGraw-Hill 2011) | textbook | 2011 | https://www.mheducation.com/
NUM1#maths-u02-03-q1@1: Find the inverse of 7 modulo 26 (between 0 and 25). | 15 | 0 |  | 7 × 15 = 105 = 4 × 26 + 1, so 7 × 15 ≡ 1 (mod 26).
M1#maths-u02-03-q2@1: Is 918,082 divisible by 11? | Yes: the alternating digit sum is 0 | No: the digit sum is 28 | Yes: it ends in 2 | No: it's even | It can't be decided | 2 − 8 + 0 − 8 + 1 − 9 = −22, a multiple of 11 (918,082 = 11 × 83,462).
M3#maths-u02-03-q3@2: How many solutions does 6x ≡ 9 (mod 15) have modulo 15? | 3 | 1 | 0 | 6 | 15 | gcd(6, 15) = 3 divides 9, so there are 3 solutions: x ≡ 4, 9, 14.

## Euclidean Algorithm
S: The Euclidean algorithm finds the greatest common divisor of two integers by repeated division. Over 2,300 years old, it's still one of the fastest and most used algorithms in mathematics and computing.
O: Find the gcd of two integers with the Euclidean algorithm
O: Explain why the algorithm works and how fast it is
T: Greatest common divisor | gcd(a, b), the largest integer dividing both a and b
T: Euclidean algorithm | Replace (a, b) by (b, a mod b) until the remainder is 0; the last non-zero remainder is the gcd
H: The method
- Divide the larger by the smaller and keep the remainder.
- Repeat with the divisor and the remainder.
- Stop when the remainder is 0: the previous remainder is the gcd.
H: Why it works
- gcd(a, b) = gcd(b, a − qb): any common divisor of a and b divides the remainder, and vice versa.
- The remainders strictly decrease, so the process ends.
- Lamé's theorem: the number of steps is at most about five times the number of digits of the smaller number.
H: Uses
- Simplifying fractions; lcm(a, b) = ab/gcd(a, b).
- Finding modular inverses (with the extended algorithm, next lesson).
- Polynomial gcds work the same way.
X: Find gcd(252, 198).
> 252 = 1 × 198 + 54
> 198 = 3 × 54 + 36; 54 = 1 × 36 + 18; 36 = 2 × 18 + 0
> gcd(252, 198) = 18
- Example: gcd(21, 13) takes 6 steps, because consecutive Fibonacci numbers are the worst case.
K: Repeatedly replace (a, b) by (b, a mod b); the last non-zero remainder is the gcd; it's fast, with steps proportional to the number of digits.
!: Stopping at the zero remainder and reporting 0 instead of the previous remainder.
Q: What is gcd(48, 18)? | 6.
Q: How is lcm(a, b) found from the gcd? | lcm = ab/gcd(a, b).
SUM: Euclid's algorithm finds gcds by division.
SUM: It's ancient and very fast.
SRC: Euclid, Elements, Book VII, propositions 1 and 2 (c. 300 BCE), ed. Joyce DE | textbook | 1998 | https://mathcs.clarku.edu/~djoyce/java/elements/
SRC: Knuth DE, The Art of Computer Programming, vol 2: Seminumerical Algorithms (3rd edn, Addison-Wesley 1997) | textbook | 1997 | https://www-cs-faculty.stanford.edu/~knuth/taocp.html
NUM1#maths-u02-04-q1@1: Find gcd(1071, 462). | 21 | 0 |  | 1071 = 2 × 462 + 147; 462 = 3 × 147 + 21; 147 = 7 × 21, so the gcd is 21.
M1#maths-u02-04-q2@1: Which step does the Euclidean algorithm repeat? | Replace (a, b) with (b, a mod b) | Replace (a, b) with (a + b, b) | Halve both numbers | Factorise both numbers completely | Subtract 1 from each | Each step keeps the gcd and shrinks the numbers.
M2#maths-u02-04-q3@2: Why is the Euclidean algorithm better than factorising to find a gcd of large numbers? | Factorising large numbers is very slow, while the algorithm needs few divisions | Factorising always gives the wrong answer | The algorithm needs prime factors | It isn't better | Factorising only works for primes | Steps grow only with the number of digits, but no fast factoring method is known.

## Extended Euclidean Algorithm
S: The extended Euclidean algorithm finds integers x and y with ax + by = gcd(a, b). These Bézout coefficients give modular inverses, which are needed to solve congruences and to build RSA keys.
O: Find Bézout coefficients by back-substitution
O: Use them to compute modular inverses
T: Bézout's identity | For integers a and b, there are integers x and y with ax + by = gcd(a, b)
T: Back-substitution | Rewriting each remainder from the Euclidean algorithm in terms of a and b
H: The method
- Run the Euclidean algorithm and record each equation.
- Starting from the gcd line, substitute each remainder using the line above.
- Alternatively, track coefficients in a table as you go (the iterative version used in code).
H: Inverses
- If gcd(a, n) = 1, then ax + ny = 1, so ax ≡ 1 (mod n): x is the inverse of a.
- If gcd(a, n) > 1, no inverse exists.
- RSA key generation finds d as the inverse of e modulo φ(n).
H: Consequences
- Every common divisor of a and b divides gcd(a, b).
- Euclid's lemma: if p is prime and p | ab, then p | a or p | b, the key to unique factorisation.
X: Find integers x and y with 240x + 46y = gcd(240, 46).
> 240 = 5 × 46 + 10; 46 = 4 × 10 + 6; 10 = 1 × 6 + 4; 6 = 1 × 4 + 2; 4 = 2 × 2: gcd 2
> 2 = 6 − 4 = 6 − (10 − 6) = 2 × 6 − 10 = 2(46 − 4 × 10) − 10 = 2 × 46 − 9 × 10
> = 2 × 46 − 9(240 − 5 × 46) = 47 × 46 − 9 × 240, so x = −9, y = 47
K: Back-substitute through the Euclidean steps to write the gcd as ax + by; when the gcd is 1, x is the inverse of a mod b.
!: Losing track of signs during back-substitution: check the final equation numerically.
Q: What does Bézout's identity state? | gcd(a, b) can be written as ax + by for integers x and y.
Q: When does a have an inverse modulo n? | When gcd(a, n) = 1.
SUM: The extended algorithm finds Bézout coefficients.
SUM: They give modular inverses.
SRC: Knuth DE, The Art of Computer Programming, vol 2: Seminumerical Algorithms (3rd edn, Addison-Wesley 1997) | textbook | 1997 | https://www-cs-faculty.stanford.edu/~knuth/taocp.html
SRC: Menezes AJ, van Oorschot PC, Vanstone SA, Handbook of Applied Cryptography, chapter 2 (CRC Press 1996) | textbook | 1996 | https://cacr.uwaterloo.ca/hac/
NUM1#maths-u02-05-q1@1: Find the inverse of 3 modulo 11 (between 0 and 10). | 4 | 0 |  | 3 × 4 = 12 = 11 + 1, so 3 × 4 ≡ 1 (mod 11).
M1#maths-u02-05-q2@1: The extended algorithm gives 17 × 5 − 12 × 7 = 1. What is the inverse of 17 modulo 12? | 5 | 7 | −7 | 12 | 17 | Reducing mod 12 leaves 17 × 5 ≡ 1, so 5 is the inverse.
M2#maths-u02-05-q3@2: Why does 6 have no inverse modulo 15? | gcd(6, 15) = 3, so 6x + 15y can't equal 1 | 15 is odd | 6 is even | Every number has an inverse | Inverses only exist mod primes | Any combination 6x + 15y is a multiple of 3, never 1.

## Diophantine Equations
S: Diophantine equations are equations whose solutions must be integers, named after Diophantus of Alexandria. Linear ones are solved completely with the gcd; others, like Fermat's Last Theorem, can be extraordinarily hard.
O: Solve linear Diophantine equations and find all solutions
O: Describe famous non-linear Diophantine problems
T: Linear Diophantine equation | ax + by = c in integers; solvable exactly when gcd(a, b) divides c
T: General solution | All solutions of ax + by = c: x = x₀ + (b/d)t, y = y₀ − (a/d)t, with d = gcd(a, b) and t an integer
H: Linear equations
- Check gcd(a, b) | c; find one solution (by inspection or the extended algorithm, scaled by c/d).
- Write the general solution with a parameter t.
- Constraints (such as x, y ≥ 0) select finitely many solutions.
H: Non-linear examples
- Pythagorean triples: x^{2} + y^{2} = z^{2}, all given by (m^{2} − n^{2}, 2mn, m^{2} + n^{2}) times a constant.
- Fermat's Last Theorem: x^{n} + y^{n} = z^{n} has no positive solutions for n ≥ 3 (Wiles, 1995).
- Hilbert's tenth problem: no general algorithm decides whether a Diophantine equation has solutions (Matiyasevich, 1970).
H: Applications
- Coin and stamp problems: which totals can be made from given values?
- Scheduling and integer programming (School 18).
X: Find all non-negative integer solutions of 3x + 5y = 47.
> gcd(3, 5) = 1 divides 47; try y values: y = 7 gives 3x = 12, so x = 4
> General solution: x = 4 + 5t, y = 7 − 3t
> Non-negative: t = 0, 1, 2 give (4, 7), (9, 4), (14, 1)
K: ax + by = c is solvable iff gcd(a, b) | c; find one solution and add multiples of (b/d, −a/d); non-linear equations range from easy to undecidable.
!: Giving one solution when the question asks for all of them.
Q: Does 6x + 9y = 20 have integer solutions? | No: gcd(6, 9) = 3 doesn't divide 20.
Q: Give the Pythagorean triple from m = 3 and n = 2. | (5, 12, 13).
SUM: Linear Diophantine equations are fully understood.
SUM: Non-linear ones can be very deep.
SRC: Niven I, Zuckerman HS, Montgomery HL, An Introduction to the Theory of Numbers (5th edn, Wiley 1991) | textbook | 1991 | https://www.wiley.com/
SRC: Wiles A, Modular elliptic curves and Fermat's Last Theorem, Annals of Mathematics 141(3), 443 | journal | 1995 | https://doi.org/10.2307/2118559
NUM1#maths-u02-06-q1@1: How many positive integer solutions does 2x + 3y = 20 have? | 3 | 0 |  | y must be even: y = 2, 4, 6 gives x = 7, 4, 1; y = 0 isn't positive.
M1#maths-u02-06-q2@1: Which equation has integer solutions? | 4x + 6y = 10 | 4x + 6y = 9 | 6x + 9y = 4 | 10x + 15y = 7 | 8x + 12y = 2 | gcd(4, 6) = 2 divides 10; in each other case the gcd doesn't divide the right side.
M2#maths-u02-06-q3@2: What did Matiyasevich prove about Hilbert's tenth problem? | No algorithm can decide whether every Diophantine equation has integer solutions | Every Diophantine equation is solvable | Fermat's Last Theorem is true | All linear equations have solutions | Pell's equation has finitely many solutions | Building on Davis, Putnam and Robinson, he showed the problem is undecidable.

## Divisor Functions
S: Divisor functions count or add the divisors of a number. Their formulas follow from prime factorisation, and they lead to perfect numbers, amicable pairs and deep questions in analytic number theory.
O: Calculate the number and sum of divisors from a prime factorisation
O: Use the multiplicative property of divisor functions
T: Number of divisors | d(n) or τ(n): how many positive divisors n has
T: Sum of divisors | σ(n): the sum of all positive divisors of n
H: Formulas
- If n = p₁^{a₁} p₂^{a₂} … p_{k}^{a_{k}}, then d(n) = (a₁ + 1)(a₂ + 1)…(a_{k} + 1).
- σ(p^{a}) = 1 + p + … + p^{a} = (p^{a+1} − 1)/(p − 1).
- σ(n) is the product of σ(p_{i}^{a_{i}}) over the prime powers.
H: Multiplicative functions
- f is multiplicative if f(mn) = f(m)f(n) whenever gcd(m, n) = 1.
- d, σ and Euler's φ are all multiplicative.
- So they're determined by their values on prime powers.
H: Facts and links
- d(n) is odd exactly when n is a perfect square (divisors pair up except √n).
- Highly composite numbers (like 12, 60, 360) have more divisors than any smaller number.
- Amicable pairs: σ(m) − m = n and σ(n) − n = m, such as 220 and 284.
X: Find d(72) and σ(72).
> 72 = 2^{3} × 3^{2}
> d(72) = (3 + 1)(2 + 1) = 12
> σ(72) = (1 + 2 + 4 + 8)(1 + 3 + 9) = 15 × 13 = 195
- Example: d(60) = 12, since 60 = 2^{2} × 3 × 5 gives 3 × 2 × 2.
K: From n = Πp^{a}: d(n) = Π(a + 1) and σ(n) = Π(1 + p + … + p^{a}); both are multiplicative; d(n) is odd only for squares.
!: Multiplying the exponents instead of the exponents plus one when counting divisors.
Q: How many divisors does 100 have? | 9.
Q: Which numbers have an odd number of divisors? | Perfect squares.
SUM: Divisor counts come from prime factorisations.
SUM: Divisor functions are multiplicative.
SRC: Hardy GH, Wright EM, An Introduction to the Theory of Numbers (6th edn, Oxford University Press 2008) | textbook | 2008 | https://global.oup.com/
SRC: Burton DM, Elementary Number Theory (7th edn, McGraw-Hill 2011) | textbook | 2011 | https://www.mheducation.com/
NUM1#maths-u02-07-q1@1: Find σ(28). | 56 | 0 |  | 28 = 2^{2} × 7: σ = (1 + 2 + 4)(1 + 7) = 7 × 8 = 56.
M1#maths-u02-07-q2@1: How many divisors does 2^{4} × 5^{2} have? | 15 | 8 | 6 | 10 | 40 | Add one to each exponent and multiply: d = (4 + 1)(2 + 1) = 15 divisors.
M2#maths-u02-07-q3@2: What does it mean for a function f to be multiplicative? | f(mn) = f(m)f(n) whenever m and n are coprime | f(mn) = f(m) + f(n) always | f(n) = n always | f(mn) = f(m)f(n) for all m and n | f is increasing | The property only needs to hold for coprime m and n.

## Perfect Numbers
S: A perfect number equals the sum of its proper divisors, like 6 = 1 + 2 + 3. Euclid and Euler showed that even perfect numbers come exactly from Mersenne primes, while whether any odd perfect number exists is one of the oldest open problems.
O: Test whether a number is perfect using σ(n)
O: State the Euclid–Euler theorem and link it to Mersenne primes
T: Perfect number | n with σ(n) = 2n, equivalently the sum of proper divisors equals n
T: Mersenne prime | A prime of the form 2^{p} − 1 (p itself must then be prime)
H: Examples
- 6, 28, 496, 8128 were known to the ancient Greeks.
- Abundant numbers have σ(n) > 2n (12); deficient ones have σ(n) < 2n (all primes).
H: Euclid–Euler theorem
- If 2^{p} − 1 is prime, then 2^{p−1}(2^{p} − 1) is perfect (Euclid).
- Every even perfect number has this form (Euler).
- So even perfect numbers correspond one-to-one with Mersenne primes.
H: Open questions
- Are there infinitely many Mersenne primes (and so even perfect numbers)?
- Does an odd perfect number exist? None below 10^{1500}, and any must satisfy many conditions.
- GIMPS, a volunteer computing project, finds record Mersenne primes; 52 were known by late 2024.
X: Show that 496 is perfect using the Euclid–Euler form.
> 496 = 16 × 31 = 2^{4}(2^{5} − 1), and 31 is prime
> σ(496) = σ(2^{4})σ(31) = 31 × 32 = 992
> 992 = 2 × 496, so 496 is perfect
K: Perfect means σ(n) = 2n; even perfect numbers are exactly 2^{p−1}(2^{p} − 1) with 2^{p} − 1 prime; odd perfect numbers are unknown.
!: Thinking 2^{p} − 1 is prime for every prime p: 2^{11} − 1 = 2047 = 23 × 89.
Q: What is the next perfect number after 28? | 496.
Q: Is 12 perfect, abundant or deficient? | Abundant (1 + 2 + 3 + 4 + 6 = 16 > 12).
SUM: Perfect numbers equal their proper divisor sums.
SUM: Even ones come from Mersenne primes.
SRC: Hardy GH, Wright EM, An Introduction to the Theory of Numbers (6th edn, Oxford University Press 2008) | textbook | 2008 | https://global.oup.com/
SRC: Great Internet Mersenne Prime Search (GIMPS), List of known Mersenne prime numbers | data | 2024 | https://www.mersenne.org/primes/
NUM1#maths-u02-08-q1@1: Using p = 7 (2^{7} − 1 = 127 is prime), find the corresponding perfect number. | 8128 | 0 |  | 2^{6} × 127 = 64 × 127 = 8,128.
M1#maths-u02-08-q2@1: What do all known perfect numbers have in common? | They're even | They're odd | They're prime | They're squares | They end in 7 | Every known perfect number has Euclid–Euler form; no odd one has been found.
M3#maths-u02-08-q3@2: Why can't 2^{p} − 1 be prime when p is composite? | If p = ab, then 2^{a} − 1 divides 2^{p} − 1 | Composite exponents give even numbers | It can be prime | Because 2 is prime | Only if p is odd | x^{b} − 1 is divisible by x − 1; put x = 2^{a}.

## Fibonacci Numbers
S: The Fibonacci numbers 1, 1, 2, 3, 5, 8, … each add the two before. They're full of number-theoretic structure, they're linked to the golden ratio, and they appear in algorithms, nature and art.
O: Use the Fibonacci recurrence and Binet's formula
O: Prove simple Fibonacci identities
T: Fibonacci recurrence | F₁ = F₂ = 1 and F_{n} = F_{n−1} + F_{n−2}
T: Golden ratio | φ = (1 + √5)/2 ≈ 1.618, the limit of F_{n+1}/F_{n}
H: Formulas
- Binet: F_{n} = (φ^{n} − ψ^{n})/√5 with ψ = (1 − √5)/2; since |ψ| < 1, F_{n} is the nearest integer to φ^{n}/√5.
- Ratios F_{n+1}/F_{n} → φ, alternately above and below.
- Sum: F₁ + … + F_{n} = F_{n+2} − 1.
H: Number theory
- Consecutive Fibonacci numbers are coprime.
- gcd(F_{m}, F_{n}) = F_{gcd(m, n)}.
- Cassini's identity: F_{n−1}F_{n+1} − F_{n}^{2} = (−1)^{n}.
- Zeckendorf: every positive integer is a unique sum of non-consecutive Fibonacci numbers.
H: Appearances
- The Euclidean algorithm is slowest on consecutive Fibonacci numbers.
- Spiral counts in sunflowers and pine cones are often consecutive Fibonacci numbers.
- Leonardo of Pisa (Fibonacci) introduced them to Europe in Liber Abaci (1202) with a rabbit puzzle.
X: Use Binet's formula to check F₁₀.
> φ^{10} ≈ 122.99
> φ^{10}/√5 ≈ 122.99/2.236 ≈ 55.0
> So F₁₀ = 55 (check: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55)
K: F_{n} = F_{n−1} + F_{n−2}; Binet's formula and φ; gcd(F_{m}, F_{n}) = F_{gcd(m, n)}; Cassini and Zeckendorf identities.
!: Starting the sequence inconsistently (F₀ = 0, F₁ = 1 versus F₁ = F₂ = 1) and getting indices wrong.
Q: What is F₁₂? | 144.
Q: What is the limit of consecutive Fibonacci ratios? | The golden ratio φ ≈ 1.618.
SUM: Fibonacci numbers add the previous two.
SUM: They're tied to the golden ratio.
SRC: Koshy T, Fibonacci and Lucas Numbers with Applications (2nd edn, Wiley 2017) | textbook | 2017 | https://www.wiley.com/
SRC: Sigler LE, Fibonacci's Liber Abaci: A Translation into Modern English (Springer 2002) | textbook | 2002 | https://link.springer.com/
NUM1#maths-u02-09-q1@1: Find gcd(F₁₂, F₁₈) using gcd(F_{m}, F_{n}) = F_{gcd(m, n)}. | 8 | 0 |  | gcd(12, 18) = 6, and F₆ = 8 (check: gcd(144, 2584) = 8).
M1#maths-u02-09-q2@1: What is F₅F₇ − F₆^{2}? | 1 | −1 | 0 | 13 | 2 | Cassini: (−1)^{6} = 1; check 5 × 13 − 64 = 1.
M2#maths-u02-09-q3@2: Write 100 as a Zeckendorf sum of non-consecutive Fibonacci numbers. | 89 + 8 + 3 | 55 + 34 + 8 + 3 | 89 + 11 | 50 + 50 | 89 + 5 + 3 + 2 + 1 | Greedily take 89, then 8 from 11, then 3; 55 + 34 uses consecutive numbers.

## Continued Fractions
S: A continued fraction writes a number as an integer plus 1 over (an integer plus 1 over …). Its truncations, the convergents, are the best rational approximations to the number, which is how 22/7 and 355/113 approximate π.
O: Find the continued fraction of a rational number and a simple surd
O: Calculate convergents and explain their approximation property
T: Continued fraction | [a₀; a₁, a₂, …] = a₀ + 1/(a₁ + 1/(a₂ + …))
T: Convergent | A truncation p_{k}/q_{k} of a continued fraction
H: Computing
- Take the integer part, invert the fractional part, repeat (the same steps as the Euclidean algorithm).
- Rationals have finite continued fractions; irrationals infinite ones.
- Quadratic irrationals (like √2) have eventually periodic ones: √2 = [1; 2, 2, 2, …].
H: Convergents
- p_{k} = a_{k}p_{k−1} + p_{k−2} and q_{k} = a_{k}q_{k−1} + q_{k−2}.
- √2: convergents 1, 3/2, 7/5, 17/12, 41/29, ….
- They satisfy |x − p/q| < 1/q^{2} and are best approximations for their denominators.
H: Famous expansions
- π = [3; 7, 15, 1, 292, …]: convergents 22/7 and 355/113 (the large 292 makes 355/113 exceptionally good).
- φ = [1; 1, 1, 1, …], the "most irrational" number, hardest to approximate.
- Continued fractions solve Pell's equation (later in this school).
X: Find the continued fraction of 43/19.
> 43/19 = 2 + 5/19; invert: 19/5 = 3 + 4/5
> 5/4 = 1 + 1/4; 4 = 4 exactly
> 43/19 = [2; 3, 1, 4]
K: Repeatedly take integer parts and invert; rationals terminate, quadratic surds repeat; convergents are best rational approximations.
!: Forgetting to invert the fractional part at each step.
Q: What is the continued fraction of √2? | [1; 2, 2, 2, …].
Q: Which convergent of π is 355/113? | The fourth: [3; 7, 15, 1].
SUM: Continued fractions encode numbers by integer parts.
SUM: Convergents give best approximations.
SRC: Khinchin AY, Continued Fractions (Dover 1997, from the 3rd Russian edn 1961) | textbook | 1997 | https://store.doverpublications.com/
SRC: Hardy GH, Wright EM, An Introduction to the Theory of Numbers (6th edn, Oxford University Press 2008) | textbook | 2008 | https://global.oup.com/
NUM1#maths-u02-10-q1@1: Evaluate [1; 2, 2, 2] as a decimal, to 4 decimal places. | 1.4167 | 0.0001 |  | [1; 2, 2, 2] = 17/12 ≈ 1.4167, a convergent to √2.
M1#maths-u02-10-q2@1: Which rational numbers have infinite continued fractions? | None: every rational's expansion terminates | All of them | Those with odd denominators | Those greater than 1 | Fractions in lowest terms only | Expanding a rational repeats the Euclidean algorithm, which always stops.
M2#maths-u02-10-q3@2: Why is 355/113 such a good approximation to π? | The next partial quotient, 292, is unusually large | Its denominator 113 is the largest prime below 120 | It's the first convergent | 355 is divisible by 5 | It isn't a convergent | A large next term means the convergent before it is extremely close.

## Prime Number Theory
S: Prime number theory studies how primes are distributed. They never run out, they thin out roughly like 1/ln x, and simple-sounding questions about them, such as twin primes, remain unsolved.
O: Prove that there are infinitely many primes
O: Use the prime number theorem to estimate how many primes there are
T: Prime-counting function | π(x), the number of primes up to x
T: Prime number theorem | π(x) is asymptotic to x/ln x: their ratio tends to 1
H: Infinitely many primes
- Euclid: if p₁, …, p_{k} were all the primes, then p₁p₂…p_{k} + 1 would have a prime factor not in the list.
- Dirichlet's theorem: every arithmetic progression a, a + d, a + 2d, … with gcd(a, d) = 1 contains infinitely many primes.
- Primes have arbitrarily large gaps: n! + 2, …, n! + n are all composite.
H: How many?
- π(100) = 25, π(1,000) = 168, π(10^{6}) = 78,498.
- Prime number theorem (Hadamard and de la Vallée Poussin, 1896): π(x) ~ x/ln x.
- The logarithmic integral Li(x) is a much better approximation.
- Near x, roughly 1 in ln x numbers is prime.
H: Open problems
- Twin prime conjecture: infinitely many primes p with p + 2 prime. Zhang (2013) proved bounded gaps.
- Goldbach's conjecture: every even number greater than 2 is a sum of two primes (checked to beyond 10^{18}).
- The Riemann hypothesis would give the sharpest error term in the prime number theorem.
X: Estimate π(1,000) with x/ln x and compare with the true value.
> ln 1,000 ≈ 6.908
> 1,000/6.908 ≈ 144.8
> The true value is 168: the estimate is about 14% low, though the ratio tends to 1 as x grows
K: Euclid proved infinitely many primes; π(x) ~ x/ln x; about 1 in ln x numbers near x is prime; twin primes and Goldbach remain open.
!: Thinking Euclid's number p₁…p_{k} + 1 must itself be prime (2 × 3 × 5 × 7 × 11 × 13 + 1 = 30,031 = 59 × 509).
Q: How many primes are less than 100? | 25.
Q: Roughly what fraction of numbers near 10^{6} are prime? | About 1 in 14 (ln 10^{6} ≈ 13.8).
SUM: Primes are infinite but thin out.
SUM: Their distribution is still not fully understood.
SRC: Hardy GH, Wright EM, An Introduction to the Theory of Numbers (6th edn, Oxford University Press 2008) | textbook | 2008 | https://global.oup.com/
SRC: Zhang Y, Bounded gaps between primes, Annals of Mathematics 179(3), 1121 | journal | 2014 | https://doi.org/10.4007/annals.2014.179.3.7
NUM1#maths-u02-11-q1@1: Estimate π(10^{6}) using x/ln x, to the nearest thousand. | 72000 | 500 |  | 10^{6}/13.8155 ≈ 72,382, about 72,000 (the true value is 78,498).
M1#maths-u02-11-q2@1: Which statement is Dirichlet's theorem? | Every arithmetic progression a + nd with gcd(a, d) = 1 contains infinitely many primes | Every even number is a sum of two primes | There are infinitely many twin primes | π(x) = x/ln x exactly | All Mersenne numbers are prime | Dirichlet proved it in 1837 using L-functions.
M2#maths-u02-11-q3@2: Why are the numbers 7! + 2, 7! + 3, …, 7! + 7 all composite? | 7! + k is divisible by k for 2 ≤ k ≤ 7 | They're all even | 7! is prime | They're all perfect squares | They aren't all composite | k divides both 7! and itself, giving a run of 6 composites.

## Fermat's Little Theorem
S: Fermat's little theorem says that for a prime p and any a not divisible by p, a^{p−1} ≡ 1 (mod p). It makes huge powers easy to reduce, underlies fast primality tests and is a cornerstone of RSA.
O: State and apply Fermat's little theorem
O: Use it to test for compositeness and understand its limits
T: Fermat's little theorem | If p is prime and p ∤ a, then a^{p−1} ≡ 1 (mod p); equivalently a^{p} ≡ a (mod p) for all a
T: Carmichael number | A composite n with a^{n−1} ≡ 1 (mod n) for all a coprime to n, such as 561
H: Using it
- Reduce exponents mod p − 1: 2^{100} mod 13 uses 2^{12} ≡ 1.
- Inverses: a^{−1} ≡ a^{p−2} (mod p).
- Proof idea: multiplying 1, 2, …, p − 1 by a permutes them mod p.
H: Fermat test
- If a^{n−1} ≢ 1 (mod n), then n is definitely composite.
- If it is 1, n is "probably prime" for that base.
- Carmichael numbers fool the test for every coprime base: 561 = 3 × 11 × 17 is the smallest.
- The Miller–Rabin test fixes this weakness (later in this school).
H: History
- Fermat stated it in 1640 without proof; Euler gave a proof and a generalisation (Euler's theorem, later in this school).
X: Find 2^{100} mod 13.
> 13 is prime and doesn't divide 2, so 2^{12} ≡ 1 (mod 13)
> 100 = 8 × 12 + 4, so 2^{100} ≡ 2^{4} = 16
> 16 ≡ 3 (mod 13)
- Example: since 7 is prime, 10^{6} ≡ 1 (mod 7), which is why 1/7 = 0.142857… repeats every 6 digits.
K: a^{p−1} ≡ 1 (mod p) for p ∤ a; reduce exponents mod p − 1; failing the test proves compositeness, passing doesn't prove primality.
!: Applying the theorem with a composite modulus or when p divides a.
Q: What is 5^{6} mod 7? | 1.
Q: What is the smallest Carmichael number? | 561.
SUM: Fermat's little theorem tames large powers.
SUM: Its test can be fooled by Carmichael numbers.
SRC: Burton DM, Elementary Number Theory (7th edn, McGraw-Hill 2011) | textbook | 2011 | https://www.mheducation.com/
SRC: Crandall R, Pomerance C, Prime Numbers: A Computational Perspective (2nd edn, Springer 2005) | textbook | 2005 | https://link.springer.com/
NUM1#maths-u02-12-q1@1: Find 3^{50} mod 7. | 2 | 0 |  | 3^{6} ≡ 1, and 50 = 8 × 6 + 2, so 3^{50} ≡ 3^{2} = 9 ≡ 2 (mod 7).
M1#maths-u02-12-q2@1: Using Fermat's little theorem, what is the inverse of 4 modulo 7? | 2 | 4 | 3 | 6 | 1 | a^{−1} ≡ a^{p−2} = 4^{5} = 1024 ≡ 2, and 4 × 2 = 8 ≡ 1.
M3#maths-u02-12-q3@2: A number n passes the Fermat test for base 2. What can you conclude? | n is probably prime, but could be composite | n is definitely prime | n is definitely composite | n is a Carmichael number | n is prime, because base 2 is the strongest base | Some composites (pseudoprimes such as 341) pass for base 2.

## Euler's Totient Function
S: Euler's totient function φ(n) counts the numbers from 1 to n that are coprime to n. It measures the size of the group of units mod n, appears in Euler's theorem and is central to RSA.
O: Calculate φ(n) from a prime factorisation
O: Use the multiplicative property of φ
T: Euler's totient | φ(n) = the number of integers k with 1 ≤ k ≤ n and gcd(k, n) = 1
T: Units modulo n | The residues with inverses mod n; there are φ(n) of them
H: Formulas
- φ(p) = p − 1 for a prime p.
- φ(p^{k}) = p^{k} − p^{k−1} = p^{k−1}(p − 1).
- Multiplicative: φ(mn) = φ(m)φ(n) when gcd(m, n) = 1.
- So φ(n) = n Π(1 − 1/p) over the primes p dividing n.
H: Properties
- Σ_{d | n} φ(d) = n.
- φ(n) is even for n ≥ 3.
- For RSA, n = pq gives φ(n) = (p − 1)(q − 1), easy to compute if you know p and q, hard otherwise.
H: Meaning
- φ(n)/n is the probability that a random number is coprime to n.
- The fractions k/n in lowest terms with denominator n number φ(n).
X: Find φ(360).
> 360 = 2^{3} × 3^{2} × 5
> φ(360) = 360 × (1 − 1/2)(1 − 1/3)(1 − 1/5)
> = 360 × 1/2 × 2/3 × 4/5 = 96
- Small values: φ(1) = 1, φ(6) = 2, φ(8) = 4, φ(9) = 6, φ(10) = 4, φ(12) = 4.
- φ(n) for n = 2^{k} is 2^{k−1}: half of the numbers up to 2^{k} are odd.
- Computing φ(n) is easy given n's prime factors and believed hard without them, which is why it stays secret in RSA.
K: φ(p) = p − 1; φ(p^{k}) = p^{k−1}(p − 1); φ is multiplicative; φ(n) = nΠ(1 − 1/p).
!: Using φ(mn) = φ(m)φ(n) when m and n share a factor (φ(4) = 2, but φ(2)φ(2) = 1).
Q: What is φ(13)? | 12.
Q: What is φ(pq) for distinct primes p and q? | (p − 1)(q − 1).
SUM: φ(n) counts the units mod n.
SUM: It's multiplicative.
SRC: Burton DM, Elementary Number Theory (7th edn, McGraw-Hill 2011) | textbook | 2011 | https://www.mheducation.com/
SRC: Ireland K, Rosen M, A Classical Introduction to Modern Number Theory (2nd edn, Springer 1990) | textbook | 1990 | https://link.springer.com/
NUM1#maths-u02-13-q1@1: Find φ(77). | 60 | 0 |  | 77 = 7 × 11, so φ = 6 × 10 = 60.
M1#maths-u02-13-q2@1: What is φ(27)? | 18 | 26 | 9 | 24 | 3 | For a prime power, φ(p^{k}) = p^{k−1}(p − 1), so φ(3^{3}) = 9 × 2 = 18.
M2#maths-u02-13-q3@2: For which n is φ(n) = n − 1? | When n is prime | When n is even | When n is a square | For all n | When n is a power of 2 | Every number below a prime is coprime to it, and only primes have that property.

## Euler's Theorem
S: Euler's theorem generalises Fermat's little theorem to any modulus: if gcd(a, n) = 1, then a^{φ(n)} ≡ 1 (mod n). It explains why powers cycle and why RSA decryption works.
O: Apply Euler's theorem to reduce powers modulo any n
O: Explain how Euler's theorem underlies RSA
T: Euler's theorem | If gcd(a, n) = 1, then a^{φ(n)} ≡ 1 (mod n)
T: Order of a modulo n | The smallest positive k with a^{k} ≡ 1 (mod n); it divides φ(n)
H: Using it
- Reduce exponents mod φ(n): to find 7^{222} mod 10, use φ(10) = 4.
- Last two digits use mod 100 and φ(100) = 40.
- The actual cycle length (the order) may be smaller than φ(n), but always divides it.
H: Proof idea
- Multiplying the φ(n) units mod n by a just permutes them.
- So the product of the units equals a^{φ(n)} times itself, giving a^{φ(n)} ≡ 1.
- It's Lagrange's theorem from group theory (School 4) in disguise.
H: RSA
- With ed ≡ 1 (mod φ(n)), m^{ed} = m^{1 + kφ(n)} ≡ m (mod n).
- So encrypting with e and decrypting with d returns the message.
X: Find the last digit of 7^{222}.
> gcd(7, 10) = 1 and φ(10) = 4, so 7^{4} ≡ 1 (mod 10)
> 222 = 4 × 55 + 2, so 7^{222} ≡ 7^{2} = 49
> The last digit is 9
- Example: 3^{100} mod 100: φ(100) = 40, so 3^{100} ≡ 3^{20}, and 3^{20} ≡ 1 (mod 100), giving last two digits 01.
- The exponent can always be reduced modulo the order, which is often smaller than φ(n).
K: a^{φ(n)} ≡ 1 (mod n) for gcd(a, n) = 1; reduce exponents mod φ(n); orders divide φ(n); this makes RSA work.
!: Using Euler's theorem when a and n share a factor.
Q: What is 3^{40} mod 100? | 1 (since φ(100) = 40).
Q: What does the order of a modulo n always divide? | φ(n).
SUM: Euler generalises Fermat.
SUM: It's the engine of RSA.
SRC: Ireland K, Rosen M, A Classical Introduction to Modern Number Theory (2nd edn, Springer 1990) | textbook | 1990 | https://link.springer.com/
SRC: Rivest RL, Shamir A, Adleman L, A method for obtaining digital signatures and public-key cryptosystems, Communications of the ACM 21(2), 120 | journal | 1978 | https://doi.org/10.1145/359340.359342
NUM1#maths-u02-14-q1@1: Find 5^{100} mod 12. | 1 | 0 |  | φ(12) = 4 and 100 is a multiple of 4, so 5^{100} ≡ 1 (mod 12).
M1#maths-u02-14-q2@1: Why can't Euler's theorem be used for 6^{10} mod 9? | gcd(6, 9) = 3, not 1 | 9 isn't prime | φ(9) is odd | 10 is too small | It can be used | Euler's theorem needs gcd(a, n) = 1, but 6 and 9 share the factor 3.
M3#maths-u02-14-q3@2: The order of 2 modulo 7 is 3. What is 2^{100} mod 7? | 2 | 1 | 4 | 3 | 6 | 100 = 33 × 3 + 1, so 2^{100} ≡ 2^{1} = 2.

## Chinese Remainder Theorem
S: The Chinese remainder theorem says that a system of congruences with pairwise coprime moduli has exactly one solution modulo their product. It first appeared in Sunzi's Mathematical Manual (around the 3rd to 5th century) and now speeds up RSA and big-number arithmetic.
O: Solve systems of congruences with coprime moduli
O: Explain uses of the Chinese remainder theorem
T: Pairwise coprime | Every pair of moduli has gcd 1
T: CRT | If n₁, …, n_{k} are pairwise coprime, x ≡ a_{i} (mod n_{i}) for all i has a unique solution mod N = n₁…n_{k}
H: Solving
- Constructive method: N_{i} = N/n_{i}; find y_{i} ≡ N_{i}^{−1} (mod n_{i}); x = Σ a_{i}N_{i}y_{i} mod N.
- Or step by step: write x = a₁ + n₁t, substitute into the next congruence, solve for t.
- If moduli aren't coprime, a solution exists only if the congruences agree on common factors.
H: Sunzi's problem
- "Counted in threes, 2 remain; in fives, 3 remain; in sevens, 2 remain."
- The answer is 23 (mod 105).
H: Uses
- RSA decryption runs about four times faster by working mod p and mod q separately.
- Computer arithmetic on huge numbers using several small moduli (residue number systems).
- Secret sharing and calendar calculations.
X: Solve x ≡ 2 (mod 3), x ≡ 3 (mod 5), x ≡ 2 (mod 7).
> From the first: x = 2 + 3t; then 2 + 3t ≡ 3 (mod 5), so 3t ≡ 1, t ≡ 2: x = 8 + 15s
> 8 + 15s ≡ 2 (mod 7): 1 + s ≡ 2, so s ≡ 1: x = 23
> x ≡ 23 (mod 105); check: 23 = 7 × 3 + 2 = 4 × 5 + 3 = 3 × 7 + 2 ✓
K: Coprime moduli give a unique solution mod their product; solve stepwise or with the N_{i}y_{i} formula; CRT speeds up RSA.
!: Applying the CRT to moduli that aren't coprime without checking consistency.
Q: How many solutions does a CRT system with moduli 4, 9 and 25 have mod 900? | Exactly one.
Q: Why does CRT speed up RSA decryption? | It works with p and q (half-size numbers) instead of n.
SUM: Coprime congruences combine uniquely.
SUM: The theorem is ancient and practical.
SRC: Ireland K, Rosen M, A Classical Introduction to Modern Number Theory (2nd edn, Springer 1990) | textbook | 1990 | https://link.springer.com/
SRC: Menezes AJ, van Oorschot PC, Vanstone SA, Handbook of Applied Cryptography, chapter 14 (CRC Press 1996) | textbook | 1996 | https://cacr.uwaterloo.ca/hac/
NUM1#maths-u02-15-q1@1: Find the smallest positive x with x ≡ 1 (mod 4) and x ≡ 2 (mod 5). | 17 | 0 |  | Numbers ≡ 2 mod 5 are 2, 7, 12, 17; 17 = 4 × 4 + 1.
M1#maths-u02-15-q2@1: Which system is guaranteed a unique solution modulo the product of its moduli? | x ≡ 1 (mod 8), x ≡ 3 (mod 15) | x ≡ 1 (mod 6), x ≡ 2 (mod 9) | x ≡ 0 (mod 4), x ≡ 1 (mod 6) | x ≡ 2 (mod 10), x ≡ 3 (mod 15) | x ≡ 1 (mod 12), x ≡ 5 (mod 18) | The CRT needs coprime moduli; only 8 and 15 share no common factor.
M2#maths-u02-15-q3@2: Does x ≡ 1 (mod 6), x ≡ 2 (mod 4) have a solution? | No: the first makes x odd, the second makes it even | Yes, exactly one mod 24 | Yes: the CRT gives one solution modulo 24 | Yes, infinitely many mod 12 | Only mod 10 | Both moduli are even and the conditions disagree mod 2.

## Quadratic Residues
S: A quadratic residue modulo p is a number that's a perfect square mod p. Which numbers are squares follows beautiful laws, culminating in Gauss's quadratic reciprocity, which he called the "golden theorem".
O: Find quadratic residues and use the Legendre symbol
O: Apply Euler's criterion and quadratic reciprocity
T: Quadratic residue | a (not divisible by p) is a QR mod p if x^{2} ≡ a (mod p) has a solution
T: Legendre symbol | (a/p) = 1 if a is a QR mod p, −1 if not, and 0 if p | a
H: Basics
- Modulo an odd prime p, exactly (p − 1)/2 of the non-zero residues are squares.
- Squares mod 11: 1, 4, 9, 5, 3 (from 1^{2} to 5^{2}).
- (ab/p) = (a/p)(b/p): residue × residue and non-residue × non-residue are residues.
H: Criteria
- Euler's criterion: (a/p) ≡ a^{(p−1)/2} (mod p).
- −1 is a QR mod p exactly when p ≡ 1 (mod 4).
- 2 is a QR mod p exactly when p ≡ ±1 (mod 8).
H: Quadratic reciprocity
- For distinct odd primes p and q: (p/q)(q/p) = (−1)^{((p−1)/2)((q−1)/2)}.
- So (p/q) = (q/p) unless both are ≡ 3 (mod 4), when they're opposite.
- Gauss gave several proofs; it underlies many algorithms and generalisations.
X: Is 3 a quadratic residue modulo 11?
> Squares mod 11: 1^{2} = 1, 2^{2} = 4, 3^{2} = 9, 4^{2} = 16 ≡ 5, 5^{2} = 25 ≡ 3
> 3 appears (5^{2} ≡ 3), so yes
> Check by Euler: 3^{5} = 243 = 22 × 11 + 1 ≡ 1 ✓
- Applications include primality tests (Solovay–Strassen) and computing square roots mod p.
K: Half the non-zero residues mod p are squares; Euler's criterion computes (a/p); reciprocity relates (p/q) and (q/p).
!: Including 0 among the (p − 1)/2 quadratic residues.
Q: List the quadratic residues mod 7. | 1, 2, 4.
Q: Is −1 a quadratic residue mod 13? | Yes, since 13 ≡ 1 (mod 4) (5^{2} = 25 ≡ −1).
SUM: Quadratic residues are squares mod p.
SUM: Reciprocity links different primes.
SRC: Ireland K, Rosen M, A Classical Introduction to Modern Number Theory (2nd edn, Springer 1990) | textbook | 1990 | https://link.springer.com/
SRC: Gauss CF, Disquisitiones Arithmeticae (1801), trans. Clarke AA (Springer 1986) | textbook | 1986 | https://link.springer.com/
NUM1#maths-u02-16-q1@1: How many quadratic residues (non-zero) are there modulo 23? | 11 | 0 |  | Exactly (p − 1)/2 = 22/2 = 11.
M1#maths-u02-16-q2@1: Using Euler's criterion, is 2 a quadratic residue mod 7? | Yes: 2^{3} = 8 ≡ 1 | No: 2^{3} ≡ −1 | Yes: 2 is prime | No: 7 is odd | It can't be decided | 2^{(7−1)/2} ≡ 1, and indeed 3^{2} = 9 ≡ 2.
M3#maths-u02-16-q3@2: Primes p = 7 and q = 11 are both ≡ 3 (mod 4). Given that (7/11) = −1, what is (11/7)? | 1 | −1 | 0 | 7 | It's undetermined | Reciprocity says the symbols are opposite when both primes are ≡ 3 (mod 4).

## Primitive Roots
S: A primitive root modulo p is a number whose powers run through every non-zero residue. Primitive roots make multiplication mod p look like addition of exponents, the idea behind discrete logarithms and Diffie–Hellman key exchange.
O: Test whether a number is a primitive root
O: Count primitive roots and connect them to discrete logarithms
T: Primitive root | g is a primitive root mod p if its order is p − 1, so g, g^{2}, …, g^{p−1} are all different
T: Discrete logarithm | The exponent x with g^{x} ≡ h (mod p)
H: Existence and counting
- Every prime p has primitive roots; there are φ(p − 1) of them.
- Primitive roots also exist mod 2, 4, p^{k} and 2p^{k}, and for no other moduli.
- Artin's conjecture: 2 is a primitive root for infinitely many primes (still open).
H: Testing
- g is a primitive root mod p iff g^{(p−1)/q} ≢ 1 for every prime q dividing p − 1.
- This avoids computing all p − 1 powers.
H: Uses
- Every non-zero residue is g^{x} for a unique x mod p − 1: the discrete logarithm.
- Computing powers is easy; finding x from g^{x} is believed hard for large p.
- Diffie–Hellman and DSA rely on this asymmetry.
X: Show that 3 is a primitive root mod 7 but 2 isn't.
> Powers of 3: 3, 2, 6, 4, 5, 1: all six non-zero residues appear, so the order is 6
> Powers of 2: 2, 4, 1: order 3, so 2 isn't primitive
> There are φ(6) = 2 primitive roots mod 7: 3 and 5
K: A primitive root has order p − 1; there are φ(p − 1) of them; test with g^{(p−1)/q} ≢ 1; they define discrete logarithms.
!: Checking only that g^{p−1} ≡ 1, which every non-zero g satisfies.
Q: How many primitive roots are there mod 11? | φ(10) = 4.
Q: Is 2 a primitive root mod 5? | Yes: its powers are 2, 4, 3, 1.
SUM: Primitive roots generate all non-zero residues.
SUM: They make discrete logarithms possible.
SRC: Ireland K, Rosen M, A Classical Introduction to Modern Number Theory (2nd edn, Springer 1990) | textbook | 1990 | https://link.springer.com/
SRC: Burton DM, Elementary Number Theory (7th edn, McGraw-Hill 2011) | textbook | 2011 | https://www.mheducation.com/
NUM1#maths-u02-17-q1@1: How many primitive roots are there modulo 13? | 4 | 0 |  | φ(12) = 12 × 1/2 × 2/3 = 4 (they are 2, 6, 7 and 11).
M1#maths-u02-17-q2@1: To test whether g is a primitive root mod 13, which powers must not be 1? | g^{6} and g^{4} | g^{12} only | g^{1} and g^{2} | g^{13} | All powers up to g^{12} | 12 = 2^{2} × 3, so check g^{12/2} and g^{12/3}.
M2#maths-u02-17-q3@2: Which modulus has no primitive root? | 8 | 7 | 9 | 10 | 4 | Every unit mod 8 (1, 3, 5, 7) squares to 1, so none has order 4.

## Pell's Equation
S: Pell's equation x^{2} − Dy^{2} = 1, for a non-square D, always has infinitely many integer solutions, all generated from the smallest one. Ancient Indian mathematicians (Brahmagupta, Bhāskara II) solved it centuries before Europe, and continued fractions explain why.
O: Find the fundamental solution of Pell's equation for small D
O: Generate further solutions from the fundamental one
T: Pell's equation | x^{2} − Dy^{2} = 1 with D a positive non-square integer
T: Fundamental solution | The smallest positive solution (x₁, y₁); all others come from powers of x₁ + y₁√D
H: Finding solutions
- Small D: try y = 1, 2, 3, … until 1 + Dy^{2} is a square. D = 2: (3, 2); D = 3: (2, 1).
- In general, the fundamental solution comes from a convergent of the continued fraction of √D.
- It can be enormous: for D = 61 it's x = 1,766,319,049, y = 226,153,980.
H: Generating more
- (x_{n} + y_{n}√D) = (x₁ + y₁√D)^{n}.
- D = 2: (3 + 2√2)^{2} = 17 + 12√2, so (17, 12) is the next solution.
- Ratios x/y give excellent rational approximations to √D.
H: History
- Brahmagupta (628) found a composition rule; Bhāskara II's chakravala method (12th century) solved it in general.
- Fermat challenged European mathematicians with D = 61; Lagrange proved solutions always exist (1768).
- Euler's mistaken attribution gave it Pell's name.
X: Starting from (2, 1) for D = 3, find the next solution.
> (2 + √3)^{2} = 4 + 4√3 + 3 = 7 + 4√3
> So (x, y) = (7, 4)
> Check: 49 − 3 × 16 = 49 − 48 = 1 ✓
K: x^{2} − Dy^{2} = 1 has infinitely many solutions for non-square D; find the fundamental one by search or continued fractions; generate others with powers of x₁ + y₁√D.
!: Applying the method to a square D, where only the trivial solution exists.
Q: What is the fundamental solution for D = 2? | (3, 2).
Q: Who developed the chakravala method? | Bhāskara II.
SUM: Pell's equation has infinitely many solutions.
SUM: Powers of the fundamental solution generate them.
SRC: Stillwell J, Elements of Number Theory (Springer 2003) | textbook | 2003 | https://link.springer.com/
SRC: Hardy GH, Wright EM, An Introduction to the Theory of Numbers (6th edn, Oxford University Press 2008) | textbook | 2008 | https://global.oup.com/
NUM1#maths-u02-18-q1@1: Find the smallest positive x with x^{2} − 5y^{2} = 1 for some positive integer y. | 9 | 0 |  | y = 4 gives 1 + 80 = 81 = 9^{2}, and y = 1, 2, 3 give 6, 21, 46, not squares.
M1#maths-u02-18-q2@1: Which pair solves x^{2} − 2y^{2} = 1? | (17, 12) | (7, 5) | (10, 7) | (5, 3) | (12, 17) | Check directly: 17^{2} − 2 × 12^{2} = 289 − 288 = 1, so (17, 12) works.
M3#maths-u02-18-q3@2: Why does x^{2} − 9y^{2} = 1 have only the trivial solution (1, 0)? | (x − 3y)(x + 3y) = 1 forces y = 0 | 9 is odd | Pell equations never have solutions | 9 is prime | It has infinitely many | With D a square the equation factorises, and integer factors of 1 are ±1.

## Diophantine Approximation
S: Diophantine approximation asks how closely real numbers can be approximated by fractions with small denominators. It separates "badly approximable" numbers like the golden ratio from Liouville's transcendental numbers, and its deepest result, Roth's theorem, won a Fields Medal.
O: State Dirichlet's approximation theorem
O: Describe how approximation properties classify numbers
T: Dirichlet's approximation theorem | For irrational α there are infinitely many fractions p/q with |α − p/q| < 1/q^{2}
T: Liouville number | A real number approximable by rationals so well that it must be transcendental
H: How well can we approximate?
- Dirichlet (by the pigeonhole principle): every irrational has infinitely many p/q within 1/q^{2}.
- Continued fraction convergents achieve this.
- Hurwitz: the constant can be improved to 1/(√5 q^{2}), and no further for the golden ratio.
H: Classifying numbers
- Badly approximable numbers (bounded continued fraction terms) include all quadratic irrationals.
- Liouville (1844) built the first explicit transcendental number, Σ 10^{−n!}, by showing it's too well approximable to be algebraic.
- Roth (1955): algebraic irrationals can't be approximated to within 1/q^{2+ε} infinitely often.
H: Applications
- Calendar design: approximating the year's length by fractions of days (the Gregorian 97 leap years in 400).
- Musical tuning: 12-tone equal temperament approximates log₂(3/2) ≈ 7/12.
- Stability in dynamical systems (KAM theory) depends on badly approximable frequencies.
X: How close is 355/113 to π, compared with the Dirichlet bound 1/q^{2}?
> 355/113 ≈ 3.14159292 and π ≈ 3.14159265
> |π − 355/113| ≈ 2.7 × 10^{−7}
> 1/113^{2} ≈ 7.8 × 10^{−5}: the approximation is about 300 times better than the bound guarantees
K: Every irrational has infinitely many p/q within 1/q^{2}; quadratic irrationals are badly approximable; Liouville numbers are too well approximable to be algebraic; Roth's theorem limits algebraic numbers.
!: Thinking a closer approximation with a larger denominator is always "better": quality is measured relative to q.
Q: Which number is the hardest to approximate by rationals? | The golden ratio.
Q: What did Liouville use approximation to prove? | The existence of transcendental numbers.
SUM: Approximation quality classifies real numbers.
SUM: Continued fractions give the best approximations.
SRC: Schmidt WM, Diophantine Approximation, Lecture Notes in Mathematics 785 (Springer 1980) | textbook | 1980 | https://link.springer.com/
SRC: Hardy GH, Wright EM, An Introduction to the Theory of Numbers (6th edn, Oxford University Press 2008) | textbook | 2008 | https://global.oup.com/
NUM1#maths-u02-19-q1@1: The Gregorian calendar has 97 leap years in 400. What average year length, in days, does that give? | 365.2425 | 0.0001 | days | 365 + 97/400 = 365.2425 days.
M1#maths-u02-19-q2@1: What does Dirichlet's approximation theorem guarantee for irrational α? | Infinitely many p/q with |α − p/q| < 1/q^{2} | A finite number of good approximations | An exact rational value | Approximations only for algebraic α | Nothing for transcendental α | The pigeonhole principle gives infinitely many such fractions.
M2#maths-u02-19-q3@2: Why is the golden ratio called "badly approximable"? | All its continued fraction terms are 1, the smallest possible | It's transcendental, so no fraction comes close | Its decimal expansion repeats | It has no continued fraction | Its convergents don't exist | Small partial quotients mean convergents are never unusually close.

## Analytic Number Theory
S: Analytic number theory uses calculus and complex analysis to study integers, especially primes. Its central object, the Riemann zeta function, links the primes to an infinite series, and the Riemann hypothesis about its zeros is the most famous open problem in mathematics.
O: Describe the Riemann zeta function and the Euler product
O: Explain the significance of the Riemann hypothesis
T: Riemann zeta function | ζ(s) = Σ 1/n^{s} for real part of s greater than 1, extended to the complex plane
T: Euler product | ζ(s) = Π 1/(1 − p^{−s}) over all primes p
H: Zeta and primes
- The Euler product encodes unique factorisation: expanding each factor and multiplying gives every 1/n^{s} once.
- As s → 1, Σ 1/n diverges, so there must be infinitely many primes (Euler).
- ζ(2) = π^{2}/6 (Euler's Basel problem, 1734).
- The probability that two random integers are coprime is 1/ζ(2) = 6/π^{2} ≈ 0.608.
H: The Riemann hypothesis
- Riemann (1859) extended ζ to the complex plane and linked its zeros to prime counting.
- Hypothesis: all non-trivial zeros have real part ½.
- It would give the best possible error term in the prime number theorem.
- A Clay Millennium Prize of $1 million is offered for a proof.
H: Other tools
- Dirichlet L-functions prove infinitely many primes in arithmetic progressions.
- Sieve methods estimate how many numbers avoid small prime factors.
- The circle method attacks additive problems such as Goldbach's.
X: Use ζ(2) = π^{2}/6 to find the probability that two random integers are coprime.
> Two integers are both divisible by p with probability 1/p^{2}
> They're coprime if no prime divides both: Π(1 − 1/p^{2}) = 1/ζ(2)
> = 6/π^{2} ≈ 0.608
K: ζ(s) = Σ n^{−s} = Π (1 − p^{−s})^{−1}; ζ(2) = π^{2}/6; the Riemann hypothesis concerns its zeros and controls the primes' distribution.
!: Thinking ζ(1) is finite: the harmonic series diverges.
Q: What is ζ(2)? | π^{2}/6.
Q: What does the Riemann hypothesis claim? | All non-trivial zeros of ζ have real part ½.
SUM: Analysis illuminates the primes.
SUM: The Riemann hypothesis remains open.
SRC: Apostol TM, Introduction to Analytic Number Theory (Springer 1976) | textbook | 1976 | https://link.springer.com/
SRC: Clay Mathematics Institute, The Riemann hypothesis: Millennium Prize problem | guidance | 2000 | https://www.claymath.org/millennium/riemann-hypothesis/
NUM1#maths-u02-20-q1@1: Find 6/π^{2} to 4 decimal places. | 0.6079 | 0.0001 |  | 6/9.8696 ≈ 0.6079.
M1#maths-u02-20-q2@1: Which fact about the primes follows from the divergence of the harmonic series? | There are infinitely many primes | All primes are odd | Primes have bounded gaps | Twin primes exist | There are 25 primes below 100 | If primes were finite, the Euler product at s = 1 would be finite, but Σ 1/n diverges.
M3#maths-u02-20-q3@2: Why does the Euler product hold? | Unique prime factorisation makes each n^{−s} appear exactly once when the product is expanded | All numbers are prime | ζ(s) is always 1 | It's a definition with no reason | Primes are evenly spaced | Expanding Π(1 + p^{−s} + p^{−2s} + …) produces each n^{−s} from n's factorisation.

## Algebraic Number Theory
S: Algebraic number theory studies number systems such as the Gaussian integers, where unique factorisation can fail. Repairing it with ideals, as Kummer and Dedekind did, created much of modern algebra and was needed for the proof of Fermat's Last Theorem.
O: Work with Gaussian integers and norms
O: Explain the failure of unique factorisation and the role of ideals
T: Gaussian integers | Numbers a + bi with a and b integers; their norm is N(a + bi) = a^{2} + b^{2}
T: Ideal | A subset of a ring closed under addition and under multiplication by ring elements; ideals restore unique factorisation
H: Number fields
- A number field adds an algebraic number to the rationals, such as ℚ(i) or ℚ(√−5).
- Its algebraic integers play the role of the ordinary integers.
- Norms are multiplicative: N(αβ) = N(α)N(β).
H: Gaussian integers
- They have unique factorisation.
- A prime p ≡ 1 (mod 4) splits: 13 = (2 + 3i)(2 − 3i), so 13 = 2^{2} + 3^{2}.
- Primes p ≡ 3 (mod 4) stay prime: this proves Fermat's two-squares theorem.
H: Failure and repair
- In ℤ[√−5], 6 = 2 × 3 = (1 + √−5)(1 − √−5): two different factorisations into irreducibles.
- Kummer's "ideal numbers" and Dedekind's ideals restore unique factorisation of ideals.
- The class number measures how badly unique factorisation fails (1 for ℤ[i], 2 for ℤ[√−5]).
X: Factorise 13 in the Gaussian integers and check with the norm.
> 13 = 4 + 9 = 2^{2} + 3^{2}
> So 13 = (2 + 3i)(2 − 3i)
> Norms: N(2 + 3i) = 13 and N(13) = 169 = 13 × 13 ✓
K: Number fields have their own integers; norms are multiplicative; Gaussian integers explain sums of two squares; ideals repair failed unique factorisation.
!: Assuming unique factorisation holds in every ring of algebraic integers.
Q: What is N(1 + i)? | 2.
Q: Which primes are sums of two squares? | 2 and primes ≡ 1 (mod 4).
SUM: Algebraic number theory extends the integers.
SUM: Ideals repair factorisation.
SRC: Stewart I, Tall D, Algebraic Number Theory and Fermat's Last Theorem (4th edn, CRC Press 2015) | textbook | 2015 | https://www.routledge.com/
SRC: Ireland K, Rosen M, A Classical Introduction to Modern Number Theory (2nd edn, Springer 1990) | textbook | 1990 | https://link.springer.com/
NUM1#maths-u02-21-q1@1: Find the norm of 3 + 4i. | 25 | 0 |  | N(3 + 4i) = 3^{2} + 4^{2} = 25.
M1#maths-u02-21-q2@1: Which prime splits in the Gaussian integers? | 29 | 7 | 11 | 19 | 3 | 29 ≡ 1 (mod 4) and 29 = 4 + 25 = (2 + 5i)(2 − 5i).
M2#maths-u02-21-q3@2: Why do the two factorisations of 6 in ℤ[√−5] matter? | They show unique factorisation into irreducibles fails there | They prove 6 is prime | They show √−5 is rational | They're the same factorisation | They don't matter | 2, 3 and 1 ± √−5 are irreducible and not associates, so factorisation isn't unique.

## Computational Number Theory
S: Computational number theory designs algorithms for number-theoretic problems: testing primality, factorising, computing gcds and discrete logarithms. The gap between easy problems (multiplying) and hard ones (factorising) is what modern cryptography relies on.
O: Compare the complexity of key number-theoretic algorithms
O: Use the sieve of Eratosthenes efficiently
T: Polynomial time | An algorithm whose running time grows like a power of the number of digits of the input
T: Sieve of Eratosthenes | Listing primes up to N by crossing out multiples of each prime up to √N
H: Easy problems
- Addition, multiplication, gcd (Euclid), modular inverses and modular powers are all polynomial in the number of digits.
- Primality testing is polynomial too: Miller–Rabin in practice, and AKS (2002) proved it deterministically.
H: Hard problems
- No known classical polynomial-time algorithm factorises integers or computes discrete logarithms.
- Best methods (the number field sieve) are sub-exponential.
- Shor's algorithm would do both in polynomial time on a large quantum computer.
H: Tools and records
- Software: PARI/GP, SageMath, Magma.
- The Great Internet Mersenne Prime Search finds record primes using the Lucas–Lehmer test.
- Experiments suggest conjectures, which then need proofs.
X: Use the sieve of Eratosthenes to find the primes up to 30.
> √30 ≈ 5.5, so only cross out multiples of 2, 3 and 5
> Remaining: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29
> There are 10 primes up to 30
K: Multiplying, gcds, powers and primality testing are fast; factorising and discrete logs aren't (classically); sieves find small primes efficiently.
!: Continuing the sieve past √N, which crosses out nothing new.
Q: Up to which prime must you sieve to find all primes up to 100? | 7 (since √100 = 10).
Q: Which algorithm proved primality testing is in polynomial time? | AKS (Agrawal, Kayal and Saxena, 2002).
SUM: Some number problems are easy, others hard.
SUM: Cryptography exploits the gap.
SRC: Crandall R, Pomerance C, Prime Numbers: A Computational Perspective (2nd edn, Springer 2005) | textbook | 2005 | https://link.springer.com/
SRC: Agrawal M, Kayal N, Saxena N, PRIMES is in P, Annals of Mathematics 160(2), 781 | journal | 2004 | https://doi.org/10.4007/annals.2004.160.781
NUM1#maths-u02-22-q1@1: How many primes are there between 30 and 50? | 5 | 0 |  | 31, 37, 41, 43 and 47.
M1#maths-u02-22-q2@1: Which problem has no known classical polynomial-time algorithm? | Factorising large integers | Computing a gcd | Multiplying two integers | Testing primality | Computing a^{b} mod n | Factorising is believed hard, which RSA relies on.
M2#maths-u02-22-q3@2: Why is it enough to sieve with primes up to √N? | Any composite up to N has a prime factor at most √N | Primes above √N don't exist | √N is always prime | It saves memory only | Primes larger than √N can never divide numbers up to N | If n = ab with both factors above √N, then n > N.

## Elliptic Curves
S: An elliptic curve is a curve y^{2} = x^{3} + ax + b whose points can be added together, forming a group. They're central to modern number theory (they led to the proof of Fermat's Last Theorem) and to cryptography.
O: Add points on an elliptic curve using the chord-and-tangent rule
O: Describe elliptic curves over finite fields
T: Elliptic curve | y^{2} = x^{3} + ax + b with 4a^{3} + 27b^{2} ≠ 0 (no cusps or self-crossings), plus a point at infinity O
T: Group law | P + Q is the reflection in the x-axis of the third point where the line through P and Q meets the curve
H: Adding points
- Slope λ = (y₂ − y₁)/(x₂ − x₁) for distinct points; λ = (3x₁^{2} + a)/(2y₁) for doubling.
- x₃ = λ^{2} − x₁ − x₂; y₃ = λ(x₁ − x₃) − y₁.
- The point at infinity O is the identity; −(x, y) = (x, −y).
H: Over the rationals and finite fields
- Mordell's theorem: the rational points form a finitely generated group.
- Over the field 𝔽_{p}, there are finitely many points; Hasse's theorem: |N − (p + 1)| ≤ 2√p.
- Repeated addition nP is fast; recovering n from nP is hard (the basis of ECC).
H: Big results
- Wiles proved Fermat's Last Theorem (1995) by proving the modularity of semistable elliptic curves.
- The Birch and Swinnerton-Dyer conjecture (a Millennium Prize problem) predicts the rank of the rational points from an L-function.
- Lenstra's elliptic curve factoring method uses them too.
X: On y^{2} = x^{3} − 2x + 1, add P = (0, 1) and Q = (1, 0).
> λ = (0 − 1)/(1 − 0) = −1
> x₃ = 1 − 0 − 1 = 0; y₃ = −1(0 − 0) − 1 = −1
> P + Q = (0, −1); check: (−1)^{2} = 0 − 0 + 1 ✓
K: Points add by chords and tangents, with O as identity; over 𝔽_{p} there are about p + 1 points (Hasse); scalar multiplication is easy, its inverse hard.
!: Forgetting to reflect the third intersection point in the x-axis.
Q: What is the identity element of the elliptic curve group? | The point at infinity O.
Q: What is −P for P = (x, y)? | (x, −y).
SUM: Elliptic curve points form a group.
SUM: They underpin modern number theory and cryptography.
SRC: Silverman JH, Tate JT, Rational Points on Elliptic Curves (2nd edn, Springer 2015) | textbook | 2015 | https://link.springer.com/
SRC: Washington LC, Elliptic Curves: Number Theory and Cryptography (2nd edn, CRC Press 2008) | textbook | 2008 | https://www.routledge.com/
NUM1#maths-u02-23-q1@1: By Hasse's theorem, what is the largest possible number of points on an elliptic curve over 𝔽₁₀₁ (including O)? | 122 | 0 |  | N ≤ 101 + 1 + 2√101 ≈ 102 + 20.1, so at most 122.
M1#maths-u02-23-q2@1: Which condition makes y^{2} = x^{3} + ax + b an elliptic curve? | 4a^{3} + 27b^{2} ≠ 0 | a = b | b = 0 | a > 0 | a and b are primes | The discriminant condition rules out cusps and self-intersections.
M3#maths-u02-23-q3@2: Why is elliptic curve scalar multiplication suitable for cryptography? | Computing nP is fast by doubling, but finding n from nP is believed hard | It's slow in both directions | Points can't be added | It needs no prime field | Finding n is easy | The elliptic curve discrete logarithm problem has no known efficient classical algorithm.

## Arithmetic Geometry
S: Arithmetic geometry studies the integer and rational solutions of polynomial equations using geometry. The shape of a curve, measured by its genus, largely decides whether it has no rational points, infinitely many, or only finitely many.
O: Parametrise rational points on a conic
O: Describe how genus governs rational points on curves
T: Rational point | A solution of a polynomial equation with rational coordinates
T: Genus | A measure of a curve's complexity: 0 for lines and conics, 1 for elliptic curves, 2 or more for more complicated curves
H: Genus 0
- A conic has either no rational points or infinitely many.
- Given one point, lines through it with rational slope t find all others.
- On x^{2} + y^{2} = 1 from (−1, 0): ((1 − t^{2})/(1 + t^{2}), 2t/(1 + t^{2})), which generates every Pythagorean triple.
H: Genus 1 and higher
- Genus 1 (elliptic curves): rational points form a finitely generated group (Mordell).
- Genus at least 2: only finitely many rational points (Faltings, 1983, a Fields Medal result).
- Fermat curves x^{n} + y^{n} = 1 have genus at least 2 for n ≥ 4.
H: Methods and conjectures
- Local–global principle (Hasse): solutions in the reals and modulo every prime power often, but not always, imply rational solutions.
- The Birch and Swinnerton-Dyer conjecture, and the Langlands programme, link geometry to L-functions.
X: Use the slope t = 1/2 on x^{2} + y^{2} = 1 to find a rational point and a Pythagorean triple.
> x = (1 − 1/4)/(1 + 1/4) = (3/4)/(5/4) = 3/5
> y = (2 × 1/2)/(5/4) = 1/(5/4) = 4/5
> (3/5, 4/5) is on the circle, giving the triple 3, 4, 5
K: Conics have none or infinitely many rational points, parametrised by slopes; genus 1 gives finitely generated groups; genus ≥ 2 gives finitely many (Faltings).
!: Assuming every polynomial equation with real solutions has rational ones (x^{2} + y^{2} = 3 has none).
Q: What genus does an elliptic curve have? | 1.
Q: What did Faltings prove? | Curves of genus at least 2 have finitely many rational points.
SUM: Geometry controls rational solutions.
SUM: Genus is the key invariant.
SRC: Hindry M, Silverman JH, Diophantine Geometry: An Introduction (Springer 2000) | textbook | 2000 | https://link.springer.com/
SRC: Faltings G, Endlichkeitssätze für abelsche Varietäten über Zahlkörpern, Inventiones Mathematicae 73, 349 | journal | 1983 | https://doi.org/10.1007/BF01388432
NUM1#maths-u02-24-q1@1: Using slope t = 2/3 on the unit circle, the point has x = (1 − t^{2})/(1 + t^{2}). Find x as a decimal, to 4 decimal places. | 0.3846 | 0.0001 |  | (1 − 4/9)/(1 + 4/9) = (5/9)/(13/9) = 5/13 ≈ 0.3846, from the 5-12-13 triangle.
M1#maths-u02-24-q2@1: How many rational points can a curve of genus 3 have? | Only finitely many | Always infinitely many | Exactly one | None ever | Exactly 3 | Faltings' theorem applies to all curves of genus at least 2.
M2#maths-u02-24-q3@2: Why does x^{2} + y^{2} = 3 have no rational points? | Clearing denominators gives a^{2} + b^{2} = 3c^{2}, impossible by a mod 3 argument | Its genus is 2, so Faltings rules out any points | Circles never have rational points | It has infinitely many | 3 is odd | Squares mod 3 are 0 or 1, forcing a, b and then c to be divisible by 3 forever.

## Cryptography
S: Cryptography protects information: keeping it secret, proving it hasn't been altered and confirming who sent it. It has evolved from simple letter shifts to mathematically grounded systems that secure every online payment.
O: Describe the goals of cryptography and classical ciphers
O: Distinguish symmetric and asymmetric cryptography
T: Symmetric cryptography | Encryption where sender and receiver share the same secret key, such as AES
T: Kerckhoffs's principle | A system should stay secure even if everything except the key is public
H: Goals
- Confidentiality: only intended readers can read.
- Integrity: tampering is detected.
- Authentication and non-repudiation: the sender is who they claim and can't deny it.
H: Classical ciphers
- Caesar shift: replace each letter by the one k places later; only 26 keys, easy to break.
- Substitution ciphers fall to frequency analysis (al-Kindi, 9th century).
- Vigenère uses a repeating keyword; broken by Kasiski and Babbage in the 19th century.
- The one-time pad is perfectly secret if the key is random, as long as the message and never reused.
H: Modern cryptography
- Symmetric ciphers (AES) are fast; the problem is sharing the key.
- Public-key cryptography (next lessons) solves key sharing with number theory.
- Security is defined mathematically and keys are long: AES-128 has 2^{128} ≈ 3.4 × 10^{38} keys.
- Bletchley Park's breaking of Enigma showed the importance of mathematics in cryptanalysis.
X: Encrypt MATHS with a Caesar shift of 3.
> M → P, A → D, T → W, H → K, S → V
> Ciphertext: PDWKV
> An attacker could try all 26 shifts in moments: the key space is far too small
K: Cryptography provides confidentiality, integrity and authentication; classical ciphers fall to small key spaces and frequency analysis; modern systems use long keys and public algorithms.
!: Relying on keeping the algorithm secret instead of the key ("security through obscurity").
Q: What does Kerckhoffs's principle say? | Security should depend only on the secrecy of the key.
Q: Why is a Caesar cipher insecure? | It has only 26 possible keys.
SUM: Cryptography secures information.
SUM: Modern security rests on mathematics and long keys.
SRC: Katz J, Lindell Y, Introduction to Modern Cryptography (3rd edn, CRC Press 2020) | textbook | 2020 | https://www.routledge.com/
SRC: Singh S, The Code Book (Fourth Estate 1999) | textbook | 1999 | https://www.harpercollins.co.uk/
NUM1#maths-u02-25-q1@1: How many possible keys does a simple substitution cipher on 26 letters have? Give the answer as a power of ten, rounded to the nearest whole exponent. | 26 | 0 |  | 26! ≈ 4.03 × 10^{26}, so about 10^{26} keys, yet frequency analysis breaks it easily.
M1#maths-u02-25-q2@1: Which method breaks a simple substitution cipher? | Frequency analysis of letters | Trying all 26 shifts | Factorising the key | Reversing the alphabet | It can't be broken | Common letters like E and T show through the substitution.
M2#maths-u02-25-q3@2: What is the main practical problem with symmetric encryption? | Securely sharing the secret key | It's too slow | It can't encrypt text | Keys are always short | It needs prime numbers | Both parties need the same key before communicating.

## Public-Key Cryptography
S: Public-key cryptography lets strangers communicate securely without sharing a secret in advance. Each person has a public key that anyone can use and a private key only they hold, linked by a one-way mathematical function.
O: Explain public-key encryption, key exchange and digital signatures
O: Carry out a small Diffie–Hellman key exchange
T: Trapdoor one-way function | A function easy to compute but hard to invert unless you know a secret (the trapdoor)
T: Digital signature | A value made with a private key that anyone can verify with the public key
H: The idea
- Diffie and Hellman (1976) published key exchange; RSA (1977) gave encryption and signatures.
- GCHQ's Ellis, Cocks and Williamson had found equivalent ideas earlier, kept secret until 1997.
- Public keys are certified by trusted authorities (the padlock in a browser).
H: Diffie–Hellman
- Public: a prime p and generator g.
- Alice picks secret a and sends A = g^{a} mod p; Bob picks b and sends B = g^{b} mod p.
- Both compute g^{ab}: Alice as B^{a}, Bob as A^{b}. An eavesdropper sees only g^{a} and g^{b}.
- Security rests on the difficulty of discrete logarithms.
H: In practice
- Public-key methods are slow, so they exchange a symmetric key, which then encrypts the data (hybrid encryption).
- TLS (HTTPS), messaging apps and software updates all use this.
X: Diffie–Hellman with p = 23, g = 5, a = 6, b = 15. Find the shared key.
> A = 5^{6} mod 23 = 8; B = 5^{15} mod 23 = 19
> Alice: 19^{6} mod 23 = 2; Bob: 8^{15} mod 23 = 2
> The shared secret is 2
K: Public keys encrypt or verify, private keys decrypt or sign; Diffie–Hellman builds a shared secret from g^{a} and g^{b}; hybrid systems combine public-key and symmetric methods.
!: Thinking the public key must be kept secret.
Q: In Diffie–Hellman, what does each party send publicly? | g raised to their secret, mod p.
Q: Why are hybrid systems used? | Public-key methods are slow, so they set up a fast symmetric key.
SUM: Public-key cryptography removes the need for pre-shared secrets.
SUM: It rests on one-way functions.
SRC: Diffie W, Hellman ME, New directions in cryptography, IEEE Transactions on Information Theory 22(6), 644 | journal | 1976 | https://doi.org/10.1109/TIT.1976.1055638
SRC: Katz J, Lindell Y, Introduction to Modern Cryptography (3rd edn, CRC Press 2020) | textbook | 2020 | https://www.routledge.com/
NUM1#maths-u02-26-q1@1: With p = 11, g = 2 and Alice's secret a = 3, what does Alice send? | 8 | 0 |  | A = 2^{3} mod 11 = 8.
M1#maths-u02-26-q2@1: Which key do you use to verify someone's digital signature? | Their public key | Their private key | Your private key | A shared symmetric key | No key is needed | Only the signer's private key can sign; anyone can verify with the public key.
M3#maths-u02-26-q3@2: Why can't an eavesdropper who sees g^{a} and g^{b} compute g^{ab} easily? | They would need to solve a discrete logarithm problem | g^{ab} = g^{a} + g^{b} | p is kept secret, so they can't reduce modulo p | They can compute it easily | The values are encrypted | Combining g^{a} and g^{b} without a or b is believed as hard as discrete logarithms.

## Modular Exponentiation
S: Modular exponentiation computes a^{e} mod n. It's the core operation of RSA, Diffie–Hellman and primality testing, and the square-and-multiply method does it in a number of steps proportional to the number of digits of e, not to e itself.
O: Compute modular powers by repeated squaring
O: Explain why the method is efficient
T: Square-and-multiply | Compute a^{e} mod n by squaring for each bit of e and multiplying when the bit is 1
T: Binary expansion | Writing the exponent in base 2, such as 13 = 1101₂ = 8 + 4 + 1
H: The method
- Write e in binary.
- Compute a, a^{2}, a^{4}, a^{8}, … mod n by repeated squaring.
- Multiply together the powers whose bits are 1, reducing mod n each time.
H: Efficiency
- A 2,048-bit exponent needs about 2,048 squarings and up to 2,048 multiplications, not 2^{2048} multiplications.
- Reducing after each step keeps numbers small.
- Montgomery multiplication speeds up the reductions in hardware.
H: Security notes
- A simple implementation can leak the key through timing or power use (side-channel attacks).
- Constant-time implementations do the same work whatever the bits are.
X: Compute 3^{13} mod 7 by square-and-multiply.
> 13 = 8 + 4 + 1; 3^{1} = 3, 3^{2} = 9 ≡ 2, 3^{4} ≡ 4, 3^{8} ≡ 16 ≡ 2
> 3^{13} ≡ 3^{8} × 3^{4} × 3^{1} = 2 × 4 × 3 = 24
> 24 ≡ 3 (mod 7) (check: by Fermat, 3^{12} ≡ 1, so 3^{13} ≡ 3 ✓)
K: Square for each bit, multiply for each 1 bit, reduce mod n throughout; the cost grows with the number of bits; implementations must resist side channels.
!: Computing a^{e} in full before reducing, which creates impossibly large numbers.
Q: Write 22 in binary. | 10110.
Q: Roughly how many squarings does a 1,024-bit exponent need? | About 1,024.
SUM: Square-and-multiply makes huge powers practical.
SUM: Reduce at every step.
SRC: Knuth DE, The Art of Computer Programming, vol 2: Seminumerical Algorithms (3rd edn, Addison-Wesley 1997) | textbook | 1997 | https://www-cs-faculty.stanford.edu/~knuth/taocp.html
SRC: Kocher PC, Timing attacks on implementations of Diffie-Hellman, RSA, DSS, and other systems, CRYPTO '96, LNCS 1109, 104 | journal | 1996 | https://doi.org/10.1007/3-540-68697-5_9
NUM1#maths-u02-27-q1@1: Compute 5^{6} mod 13. | 12 | 0 |  | 5^{2} = 25 ≡ 12 ≡ −1, so 5^{4} ≡ 1 and 5^{6} = 5^{4} × 5^{2} ≡ 12.
M1#maths-u02-27-q2@1: How many squarings does square-and-multiply need for an exponent of 1,000 (10 bits)? | About 9 or 10 | 1,000 | 500 | About 500, half the exponent | 100 | One squaring per bit after the first: the cost is logarithmic in e.
M2#maths-u02-27-q3@2: What is a timing side-channel attack on modular exponentiation? | Measuring how long operations take to infer the secret exponent's bits | Guessing the modulus | Factorising n directly | Changing the public key | Breaking AES | Extra multiplications for 1 bits take extra time, leaking information.

## RSA Cryptography
S: RSA, published by Rivest, Shamir and Adleman in 1977, was the first practical public-key system for encryption and signatures. Its security rests on the difficulty of factorising the product of two large primes.
O: Generate an RSA key pair and encrypt and decrypt small messages
O: Explain why RSA works and what keeps it secure
T: RSA modulus | n = pq for large primes p and q, part of the public key
T: Private exponent | d, the inverse of the public exponent e modulo φ(n) = (p − 1)(q − 1)
H: Key generation
- Choose primes p and q; compute n = pq and φ(n) = (p − 1)(q − 1).
- Choose e coprime to φ(n) (65,537 is common); find d with ed ≡ 1 (mod φ(n)).
- Public key (n, e); private key d (with p and q kept secret).
H: Using it
- Encrypt: c = m^{e} mod n. Decrypt: m = c^{d} mod n (Euler's theorem makes this work).
- Sign: s = m^{d} mod n; verify: s^{e} ≡ m.
- In practice messages are padded (OAEP, PSS) and hashed; "textbook RSA" is insecure.
H: Security
- Anyone who factorises n can compute φ(n) and d.
- Keys of 2,048 bits or more are recommended; RSA-250 (829 bits) was factorised in 2020.
- A large quantum computer running Shor's algorithm would break RSA (see Post-Quantum Cryptography).
X: Make an RSA key with p = 61, q = 53 and e = 17.
> n = 3,233 and φ(n) = 60 × 52 = 3,120
> d = 17^{−1} mod 3,120 = 2,753 (17 × 2,753 = 46,801 = 15 × 3,120 + 1)
> Public key (3,233, 17), private key 2,753; encrypting m = 65 gives c = 65^{17} mod 3,233 = 2,790
K: n = pq, φ = (p − 1)(q − 1), d = e^{−1} mod φ; encrypt with m^{e}, decrypt with c^{d}; security relies on factorising n; always use padding.
!: Using textbook RSA without padding, which leaks information and allows forgeries.
Q: What must be kept secret in RSA? | d (and p, q, φ(n)).
Q: Why does knowing p and q break RSA? | They give φ(n), from which d is computed.
SUM: RSA uses modular powers and factorisation.
SUM: Padding and key size keep it secure.
SRC: Rivest RL, Shamir A, Adleman L, A method for obtaining digital signatures and public-key cryptosystems, Communications of the ACM 21(2), 120 | journal | 1978 | https://doi.org/10.1145/359340.359342
SRC: National Institute of Standards and Technology, Recommendation for key management: part 1 (SP 800-57 Part 1 Rev 5) | standard | 2020 | https://doi.org/10.6028/NIST.SP.800-57pt1r5
NUM1#maths-u02-28-q1@1: For p = 11, q = 13 and e = 7, find d. | 103 | 0 |  | φ = 10 × 12 = 120, and 7 × 103 = 721 = 6 × 120 + 1.
M1#maths-u02-28-q2@1: In RSA with n = 33 and e = 3, what is the ciphertext for m = 4? | 31 | 12 | 64 | 4 | 7 | Encrypt with c = m^{e} mod n: 4^{3} = 64 = 33 + 31, so c = 31.
M2#maths-u02-28-q3@2: Why is the public exponent e often 65,537? | It's prime with few 1 bits, so encryption is fast | It makes d small | It's the largest prime | It hides n | Standards require all keys to be equal | 65,537 = 2^{16} + 1 needs only 17 multiplications and is coprime to most φ(n).

## Discrete Logarithm Problem
S: The discrete logarithm problem asks, given g and h = g^{x} mod p, to find x. Easy in one direction and believed hard in the other, it secures Diffie–Hellman, DSA and elliptic curve cryptography.
O: Solve small discrete logarithm problems
O: Describe algorithms for discrete logarithms and their costs
T: Discrete logarithm | The exponent x with g^{x} ≡ h (mod p), written log_{g} h
T: Baby-step giant-step | An algorithm finding x in about √p steps using a table of g^{j} and repeated multiplication by g^{−m}
H: Difficulty
- Exhaustive search takes up to p − 1 steps.
- Baby-step giant-step and Pollard's rho take about √p steps: impractical for p of 2,048 bits.
- Index calculus is sub-exponential for prime fields, so they need bigger keys than elliptic curves.
H: Weak cases
- If p − 1 has only small prime factors, Pohlig–Hellman splits the problem into small ones.
- So safe primes (p = 2q + 1 with q prime) or large prime-order subgroups are used.
- Shor's algorithm solves discrete logs efficiently on a large quantum computer.
H: Uses
- Diffie–Hellman key exchange, ElGamal encryption, the Digital Signature Algorithm.
- The elliptic curve version is harder still, giving shorter keys.
X: Solve 3^{x} ≡ 13 (mod 17).
> 3^{1} = 3, 3^{2} = 9, 3^{3} = 27 ≡ 10
> 3^{4} ≡ 30 ≡ 13
> x = 4
- Example sizes: 2,048-bit prime fields or 256-bit elliptic curves give about 112 to 128 bits of security.
K: Discrete logs invert modular powers; generic algorithms take about √p steps; avoid weak primes; quantum computers would break them.
!: Using a prime p where p − 1 has only small factors, which makes discrete logs easy.
Q: How many steps does baby-step giant-step need, roughly? | About √p.
Q: Which systems rely on discrete logarithms? | Diffie–Hellman, ElGamal and DSA (and their elliptic curve versions).
SUM: Discrete logs are easy to pose, hard to solve.
SUM: Parameter choice avoids weak cases.
SRC: Menezes AJ, van Oorschot PC, Vanstone SA, Handbook of Applied Cryptography, chapter 3 (CRC Press 1996) | textbook | 1996 | https://cacr.uwaterloo.ca/hac/
SRC: Pohlig S, Hellman M, An improved algorithm for computing logarithms over GF(p), IEEE Transactions on Information Theory 24(1), 106 | journal | 1978 | https://doi.org/10.1109/TIT.1978.1055817
NUM1#maths-u02-29-q1@1: Solve 2^{x} ≡ 9 (mod 11) for x between 1 and 10. | 6 | 0 |  | Powers of 2 mod 11: 2, 4, 8, 5, 10, 9, so x = 6.
M1#maths-u02-29-q2@1: About how many operations does baby-step giant-step need for a prime p ≈ 10^{12}? | About 10^{6} | About 10^{12} | About 12 | About 10^{24} | About 10^{3} | Baby-step giant-step needs about √p steps, and √(10^{12}) = 10^{6}.
M2#maths-u02-29-q3@2: Why should p − 1 have a large prime factor in Diffie–Hellman? | Otherwise Pohlig–Hellman reduces the problem to easy small ones | It makes g smaller | It speeds up encryption | p − 1 must be prime | It doesn't matter | The algorithm's cost depends on the largest prime factor of the group order.

## Elliptic Curve Cryptography
S: Elliptic curve cryptography (ECC) uses the group of points on an elliptic curve over a finite field. Because the elliptic curve discrete logarithm problem resists the attacks that work on numbers mod p, ECC gives the same security with much shorter keys.
O: Describe ECDH and ECDSA
O: Compare ECC and RSA key sizes and explain practical pitfalls
T: ECDLP | The elliptic curve discrete logarithm problem: given P and Q = nP, find n
T: ECDSA | The Elliptic Curve Digital Signature Algorithm
H: How it works
- Public parameters: a curve over 𝔽_{p} and a base point G of large prime order.
- Private key: a random number n; public key: Q = nG, computed by double-and-add.
- ECDH: Alice and Bob exchange aG and bG and both compute abG.
H: Key sizes
- A 256-bit elliptic curve key gives about 128-bit security, comparable to 3,072-bit RSA (NIST SP 800-57).
- Shorter keys mean faster operations and less bandwidth, good for phones and smart cards.
- Widely used curves include P-256 and Curve25519; Bitcoin uses secp256k1.
H: Pitfalls
- ECDSA needs a fresh secret random nonce for each signature; reusing it reveals the private key (as happened with the PlayStation 3 signing key in 2010).
- Use well-studied curves and validated implementations.
- Like RSA, ECC would fall to Shor's algorithm.
X: Roughly how many group operations does double-and-add need to compute nG for a 256-bit n?
> One doubling per bit: about 256 doublings
> One addition for each 1 bit: on average about 128
> About 384 operations in total, compared with up to 2^{256} additions by repeated adding
K: ECC uses scalar multiplication nG; ECDLP is hard; 256-bit ECC ≈ 3,072-bit RSA; never reuse ECDSA nonces.
!: Reusing or poorly generating ECDSA nonces, which leaks the private key.
Q: What security level does a 256-bit elliptic curve key give? | About 128 bits.
Q: Which curve does Bitcoin use? | secp256k1.
SUM: ECC gives strong security with short keys.
SUM: Implementation details matter.
SRC: Koblitz N, Elliptic curve cryptosystems, Mathematics of Computation 48(177), 203 | journal | 1987 | https://doi.org/10.1090/S0025-5718-1987-0866109-5
SRC: National Institute of Standards and Technology, Recommendation for key management: part 1 (SP 800-57 Part 1 Rev 5) | standard | 2020 | https://doi.org/10.6028/NIST.SP.800-57pt1r5
NUM1#maths-u02-30-q1@1: About how many times longer is a 3,072-bit RSA modulus than a 256-bit ECC key of similar strength? | 12 | 0 |  | 3,072/256 = 12.
M1#maths-u02-30-q2@1: What is the public key in elliptic curve cryptography? | The point Q = nG | The private number n | The prime p only | The curve's discriminant | The nonce | The private scalar n is multiplied by the base point G.
M2#maths-u02-30-q3@2: What went wrong with the PlayStation 3's ECDSA signatures? | The same nonce was used for every signature, revealing the private key | The curve was too small | RSA was used instead | The hash function was missing | Nothing went wrong | Two signatures with the same nonce let attackers solve for the private key.

## Cryptographic Hash Functions
S: A cryptographic hash function turns any input into a short fixed-length digest that acts like a fingerprint. Hashes check integrity, store passwords, build digital signatures and underpin blockchains.
O: State the security properties of hash functions
O: Use the birthday bound to estimate collision resistance
T: Hash function | A function mapping inputs of any length to a fixed-length output, such as SHA-256's 256 bits
T: Collision | Two different inputs with the same hash
H: Properties
- Preimage resistance: given h, hard to find any m with H(m) = h.
- Second-preimage resistance: given m, hard to find m′ ≠ m with the same hash.
- Collision resistance: hard to find any two inputs with the same hash.
- Avalanche effect: changing one bit changes about half the output bits.
H: The birthday bound
- With 23 people, the chance two share a birthday exceeds 50%.
- For an n-bit hash, collisions appear after about 2^{n/2} tries, so SHA-256 gives about 128-bit collision security.
- MD5 and SHA-1 are broken for collisions (a SHA-1 collision was demonstrated in 2017); use SHA-2 or SHA-3.
H: Passwords
- Never store passwords in plain text or with a fast hash alone.
- Add a unique random salt and use a slow, memory-hard function (Argon2, scrypt, bcrypt).
- This makes precomputed tables and mass guessing far harder.
X: Estimate the probability that at least two of 23 people share a birthday (365 equally likely days).
> P(all different) = (365/365)(364/365)…(343/365)
> ≈ 0.493
> P(shared birthday) ≈ 0.507: just over a half, far fewer people than intuition suggests
K: Hashes must resist preimages, second preimages and collisions; collisions take about 2^{n/2} work; use SHA-2/SHA-3; salt and slow-hash passwords.
!: Storing passwords with a fast unsalted hash such as plain SHA-256.
Q: How much work does finding a collision in a 160-bit hash take, generically? | About 2^{80}.
Q: Why add a salt to a password before hashing? | So identical passwords get different hashes and precomputed tables don't work.
SUM: Hashes fingerprint data.
SUM: Collisions arise at the square root of the output space.
SRC: National Institute of Standards and Technology, Secure Hash Standard (FIPS 180-4) | standard | 2015 | https://doi.org/10.6028/NIST.FIPS.180-4
SRC: Stevens M, Bursztein E, Karpman P, Albertini A, Markov Y, The first collision for full SHA-1, CRYPTO 2017, LNCS 10401, 570 | journal | 2017 | https://doi.org/10.1007/978-3-319-63688-7_19
NUM1#maths-u02-31-q1@1: What is the generic collision security, in bits, of a 512-bit hash function? | 256 | 0 | bits | By the birthday bound, collisions take about 2^{512/2} = 2^{256} work.
M1#maths-u02-31-q2@1: Which property means it's hard to find any two inputs with the same digest? | Collision resistance | Preimage resistance | The avalanche effect | Compression | Determinism | Collision resistance concerns any pair, not a given target.
M2#maths-u02-31-q3@2: Why are slow hash functions such as Argon2 recommended for passwords? | They make each guess expensive for an attacker | They produce longer passwords | They're reversible | They avoid salts | They're faster to verify | Legitimate logins check one password; attackers must try billions, so slowness hurts only them.

## Primality Testing
S: Primality tests decide whether a number is prime without factorising it. Cryptography needs huge random primes, so fast tests, mostly probabilistic, are essential.
O: Test small numbers by trial division
O: Explain the Fermat, Miller–Rabin and AKS tests
T: Miller–Rabin test | A probabilistic test: a composite passes a random round with probability at most 1/4
T: Strong pseudoprime | A composite that passes a Miller–Rabin round for a particular base
H: Simple methods
- Trial division by primes up to √n: certain but far too slow for large n.
- Fermat test: check a^{n−1} ≡ 1 (mod n); fooled by Carmichael numbers.
H: Miller–Rabin
- Write n − 1 = 2^{s}d with d odd; for a random base a, check whether a^{d} ≡ 1 or a^{2^{r}d} ≡ −1 for some r < s.
- Composites fail for at least 3/4 of bases, so k rounds give error at most 4^{−k}.
- 40 rounds make the error far smaller than the chance of a hardware fault.
H: Deterministic tests
- AKS (2002): the first unconditional polynomial-time deterministic test, important in theory.
- Elliptic curve primality proving (ECPP) produces certificates for large primes.
- Lucas–Lehmer: a fast special test for Mersenne numbers 2^{p} − 1.
X: Is 221 prime?
> √221 ≈ 14.9, so try primes 2, 3, 5, 7, 11, 13
> 221 = 13 × 17
> 221 is composite
- Random large numbers are prime with probability about 1/ln n, so finding a 1,024-bit prime takes a few hundred tries.
K: Trial division to √n is certain but slow; Miller–Rabin is fast with error ≤ 4^{−k}; AKS proved deterministic polynomial testing possible.
!: Trusting a single Fermat test, which Carmichael numbers always pass.
Q: Up to which value must trial division check to test n? | √n.
Q: What is the error bound for k rounds of Miller–Rabin? | At most 4^{−k}.
SUM: Primality tests avoid factorising.
SUM: Miller–Rabin is the practical workhorse.
SRC: Crandall R, Pomerance C, Prime Numbers: A Computational Perspective (2nd edn, Springer 2005) | textbook | 2005 | https://link.springer.com/
SRC: Rabin MO, Probabilistic algorithm for testing primality, Journal of Number Theory 12(1), 128 | journal | 1980 | https://doi.org/10.1016/0022-314X(80)90084-0
NUM1#maths-u02-32-q1@1: What is the error bound for 10 rounds of Miller–Rabin, as a power of 4? Give the exponent of 4 as a negative number. | -10 | 0 |  | Each round has error at most 1/4, so 10 rounds give at most 4^{−10}.
M1#maths-u02-32-q2@1: Which composite passes the Fermat test for every base coprime to it? | 561 | 221 | 91 | 15 | 341 only for base 3 | 561 = 3 × 11 × 17 is a Carmichael number.
M3#maths-u02-32-q3@2: A number passes 50 rounds of Miller–Rabin with random bases. What's the best conclusion? | It's prime with overwhelming probability | It must be a perfect square | It's a Carmichael number | It's certainly composite | It's certainly prime, since 50 rounds is a proof | The chance a composite passes all 50 rounds is at most 4^{−50}.

## Integer Factorisation
S: Integer factorisation is splitting a number into primes. Multiplying primes is easy, but recovering them from a large product appears very hard, and that asymmetry is what RSA's security rests on.
O: Factorise numbers using trial division and Fermat's method
O: Explain how hard factorisation is and how records have progressed
T: Fermat's factorisation method | Write n = a^{2} − b^{2} = (a − b)(a + b), searching for a from ⌈√n⌉ upwards
T: Semiprime | A product of two primes, the form of an RSA modulus
H: Simple methods
- Trial division: try primes up to √n; fine for small numbers.
- Fermat's method: fast when the two factors are close together.
- So RSA primes must not be too close.
H: Hardness
- The best classical algorithm, the general number field sieve, is sub-exponential.
- Records: RSA-250 (829 bits) was factorised in 2020 using thousands of core-years.
- 2,048-bit moduli are far out of reach of classical methods.
H: The quantum threat
- Shor's algorithm (1994) factorises in polynomial time on a large fault-tolerant quantum computer.
- Current quantum computers are far too small, but the threat drives post-quantum cryptography.
X: Factorise 5,959 by Fermat's method.
> √5,959 ≈ 77.2: try a = 78 (6,084 − 5,959 = 125, not square), a = 79 (282, not square)
> a = 80: 6,400 − 5,959 = 441 = 21^{2}
> 5,959 = (80 − 21)(80 + 21) = 59 × 101
K: Trial division for small n; Fermat's method when factors are close; the number field sieve is the best classical method; Shor's algorithm threatens RSA.
!: Choosing RSA primes that are very close together, which Fermat's method exploits.
Q: When does Fermat's method work quickly? | When the two factors are close to √n.
Q: Which quantum algorithm factorises efficiently? | Shor's algorithm.
SUM: Factorising is believed hard classically.
SUM: That hardness protects RSA.
SRC: Crandall R, Pomerance C, Prime Numbers: A Computational Perspective (2nd edn, Springer 2005) | textbook | 2005 | https://link.springer.com/
SRC: Shor PW, Polynomial-time algorithms for prime factorization and discrete logarithms on a quantum computer, SIAM Journal on Computing 26(5), 1484 | journal | 1997 | https://doi.org/10.1137/S0097539795293172
NUM1#maths-u02-33-q1@1: Factorise 899 using 899 = 30^{2} − 1^{2}. Give the larger factor. | 31 | 0 |  | 899 = (30 − 1)(30 + 1) = 29 × 31.
M1#maths-u02-33-q2@1: Why must RSA's primes p and q not be too close together? | Fermat's method would factorise n quickly | They must be equal | n would turn out to be prime, so it couldn't be used | Encryption would fail | It makes no difference | If p ≈ q, then n is close to a square and a − b is small.
M2#maths-u02-33-q3@2: What would a large quantum computer running Shor's algorithm do to RSA? | Factorise n efficiently, breaking it | Make it twice as secure | Nothing | Only slow it down | Replace primes with squares | Shor's algorithm factorises in polynomial time.

## Prime Factorisation Algorithms
S: Beyond trial division, mathematicians have built clever factorisation algorithms that exploit hidden structure: Pollard's rho and p − 1 methods, Lenstra's elliptic curve method, and the quadratic and number field sieves. Each suits different sizes of number and factor.
O: Apply Pollard's p − 1 method to a small example
O: Choose a suitable factorisation algorithm for a problem
T: Smooth number | A number whose prime factors are all small (B-smooth if all are at most B)
T: Pollard's rho | A method using a pseudo-random sequence mod n to find a factor p in about √p steps
H: Special-purpose methods
- Pollard's rho: good for finding small factors; about √p steps.
- Pollard's p − 1: works if p − 1 is smooth for some factor p: compute gcd(a^{M} − 1, n) with M a product of small primes.
- Lenstra's elliptic curve method (ECM): like p − 1, but over many random curves; great for medium-sized factors.
H: General-purpose methods
- The quadratic sieve: best for numbers up to about 100 digits.
- The general number field sieve: the fastest known for very large numbers.
- Both find many smooth relations, then combine them with linear algebra to get x^{2} ≡ y^{2} (mod n).
H: Choosing
- Small factors first: trial division, then rho or ECM.
- Large balanced semiprimes (like RSA moduli): the number field sieve.
X: Use Pollard's p − 1 method with M = 12 and a = 2 to factorise 299.
> 2^{12} = 4,096 ≡ 209 (mod 299)
> gcd(208, 299) = 13
> 299 = 13 × 23 (it worked because 13 − 1 = 12 is smooth)
K: Rho and ECM find smaller factors; p − 1 needs a smooth p − 1; sieves find relations giving x^{2} ≡ y^{2} (mod n) for large numbers.
!: Using a general-purpose sieve to find a small factor that trial division or ECM would find quickly.
Q: What does Pollard's p − 1 method need to succeed? | A prime factor p with p − 1 smooth.
Q: Which method is fastest for very large RSA-style numbers? | The general number field sieve.
SUM: Factorisation algorithms exploit structure.
SUM: Choose the method by factor size.
SRC: Pollard JM, A Monte Carlo method for factorization, BIT Numerical Mathematics 15, 331 | journal | 1975 | https://doi.org/10.1007/BF01933667
SRC: Lenstra HW, Factoring integers with elliptic curves, Annals of Mathematics 126(3), 649 | journal | 1987 | https://doi.org/10.2307/1971363
NUM1#maths-u02-34-q1@1: Is 2^{4} × 3^{2} × 7 a 7-smooth number? Enter 1 for yes or 0 for no. | 1 | 0 |  | All its prime factors (2, 3 and 7) are at most 7, so it's 7-smooth.
M1#maths-u02-34-q2@1: Which method suits finding a 20-digit factor of a 200-digit number? | The elliptic curve method | Trial division | Fermat's method | The quadratic sieve | Guessing | ECM's cost depends on the size of the factor found, not of n.
M3#maths-u02-34-q3@2: What do the quadratic and number field sieves ultimately look for? | x and y with x^{2} ≡ y^{2} (mod n), giving a factor via gcd(x − y, n) | A prime factor directly by division | Primitive roots | Points on a curve | Pell equation solutions | Such a congruence often splits n when x ≢ ±y.

## Lattice-Based Cryptography
S: Lattice-based cryptography builds security on hard geometric problems in high-dimensional lattices, such as finding short vectors. No efficient quantum algorithm is known for them, so lattices underpin the main new post-quantum standards.
O: Describe lattices and the shortest vector problem
O: Explain the Learning With Errors problem
T: Lattice | All integer combinations of a set of basis vectors in ℝ^{n}
T: Learning With Errors (LWE) | Recover a secret vector s from many noisy equations b = ⟨a, s⟩ + e (mod q)
H: Lattice problems
- Shortest vector problem (SVP): find the shortest non-zero lattice vector.
- With a good (short, nearly orthogonal) basis it's easy; with a bad basis in hundreds of dimensions it's very hard.
- The LLL algorithm (1982) finds fairly short vectors in polynomial time, not short enough to break well-chosen parameters.
H: Learning With Errors
- Without noise, b = As (mod q) is solved by linear algebra.
- Small random errors e make it believed hard, even for quantum computers (Regev, 2005).
- Module-LWE adds structure for efficiency.
H: Standards
- NIST published ML-KEM (from CRYSTALS-Kyber, FIPS 203) and ML-DSA (from CRYSTALS-Dilithium, FIPS 204) in 2024.
- Lattices also enable fully homomorphic encryption: computing on encrypted data.
X: A toy LWE sample has q = 17, secret s = (3, 5), a = (2, 7) and error e = 1. Compute b.
> ⟨a, s⟩ = 2 × 3 + 7 × 5 = 41
> b = 41 + 1 = 42 ≡ 8 (mod 17)
> Many such samples with errors hide s; without e, a few samples would reveal it by solving linear equations
K: Lattices are integer combinations of basis vectors; SVP and LWE are hard, even for quantum computers as far as known; ML-KEM and ML-DSA are lattice-based standards.
!: Thinking the noise in LWE is a flaw: it's exactly what makes the problem hard.
Q: What does LWE stand for? | Learning With Errors.
Q: Which NIST standard specifies lattice-based key encapsulation? | FIPS 203 (ML-KEM).
SUM: Lattice problems resist known quantum attacks.
SUM: Noise makes linear equations hard.
SRC: Regev O, On lattices, learning with errors, random linear codes, and cryptography, Journal of the ACM 56(6), 34 | journal | 2009 | https://doi.org/10.1145/1568318.1568324
SRC: National Institute of Standards and Technology, Module-Lattice-Based Key-Encapsulation Mechanism Standard (FIPS 203) | standard | 2024 | https://doi.org/10.6028/NIST.FIPS.203
NUM1#maths-u02-35-q1@1: With q = 13, s = (2, 4), a = (5, 3) and e = −1, compute b = ⟨a, s⟩ + e mod 13. | 8 | 0 |  | ⟨a, s⟩ = 10 + 12 = 22; 22 − 1 = 21 ≡ 8 (mod 13).
M1#maths-u02-35-q2@1: Why does LWE add small errors to the equations? | Without them, linear algebra would recover the secret easily | To make decryption impossible | To shorten keys | Errors are accidental | To make it faster | Noise turns an easy linear system into a hard problem.
M2#maths-u02-35-q3@2: What is a lattice? | The set of all integer combinations of some basis vectors | A random set of points | A curve over a finite field | A random scatter of points in n dimensions | A prime field | Lattices are regular grids of points generated by a basis.

## Post-Quantum Cryptography
S: Post-quantum cryptography is public-key cryptography designed to resist attacks by large quantum computers. Because data encrypted today could be stored and decrypted later, governments and companies are already migrating to the new standards.
O: Explain which current systems quantum computers threaten
O: Describe the post-quantum standards and migration challenges
T: Shor's algorithm | A quantum algorithm that factorises and solves discrete logarithms in polynomial time
T: Harvest now, decrypt later | Recording encrypted traffic today to decrypt it once quantum computers exist
H: The threat
- Shor's algorithm breaks RSA, Diffie–Hellman and elliptic curve cryptography.
- Grover's algorithm only square-roots brute-force search: AES-256 keeps about 128-bit security, so symmetric crypto survives with longer keys.
- Large fault-tolerant quantum computers don't yet exist, but long-lived secrets are at risk now.
H: New standards (NIST, 2024 onwards)
- FIPS 203 ML-KEM (lattice-based key encapsulation).
- FIPS 204 ML-DSA (lattice-based signatures); FIPS 205 SLH-DSA (hash-based signatures).
- Further algorithms (such as the code-based HQC) were selected as backups.
H: Migration
- Inventory where public-key cryptography is used; prioritise long-lived data.
- Hybrid schemes combine classical and post-quantum key exchange during the transition.
- The UK's National Cyber Security Centre has published migration timelines aiming for completion by 2035.
- New algorithms have larger keys and signatures, affecting protocols and devices.
X: AES-128 and AES-256 face Grover's algorithm. What security level does each keep?
> Grover searches 2^{n} keys in about 2^{n/2} steps
> AES-128: about 2^{64}, too weak against a large quantum computer
> AES-256: about 2^{128}, still considered secure
K: Shor breaks RSA, DH and ECC; Grover halves symmetric key strength; ML-KEM, ML-DSA and SLH-DSA are the new standards; migrate early, with hybrids.
!: Thinking post-quantum cryptography needs quantum computers to run: it runs on ordinary computers.
Q: Which current public-key systems does Shor's algorithm break? | RSA, Diffie–Hellman and elliptic curve cryptography.
Q: Why migrate before large quantum computers exist? | Encrypted data recorded now could be decrypted later.
SUM: Quantum computers threaten today's public-key cryptography.
SUM: New standards are being deployed now.
SRC: National Institute of Standards and Technology, Module-Lattice-Based Digital Signature Standard (FIPS 204) | standard | 2024 | https://doi.org/10.6028/NIST.FIPS.204
SRC: National Cyber Security Centre, Timelines for migration to post-quantum cryptography | guidance | 2025 | https://www.ncsc.gov.uk/
NUM1#maths-u02-36-q1@1: Against Grover's algorithm, how many bits of security does a 192-bit symmetric key keep? | 96 | 0 | bits | Grover square-roots the search: 2^{192} becomes about 2^{96}.
M1#maths-u02-36-q2@1: Which cryptographic primitive survives quantum attack with a modest change? | Symmetric encryption, by using longer keys | RSA with the same key size | Diffie–Hellman over prime fields | Elliptic curve cryptography | None of them | Grover only halves the key length's effective strength.
M3#maths-u02-36-q3@2: Why is "harvest now, decrypt later" a reason to act now? | Secrets with long lifetimes recorded today could be exposed once quantum computers arrive | Quantum computers already break RSA | Old data is never valuable | It only affects passwords | It isn't a real concern | Data that must stay confidential for decades is already at risk.
`;
