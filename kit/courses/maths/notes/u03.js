// School 3: Algebra. Format: kit/course/notes.js. Standard: docs/CURRICULUM_CONTENT_STANDARD.md
// From the first use of letters for numbers through GCSE and A level algebra to complex numbers and Boolean algebra.
export default `
## Basic Algebra
S: Algebra uses letters to stand for numbers, so that we can describe patterns, rules and relationships that hold for many values at once. It turns "think of a number, double it and add three" into 2n + 3.
O: Use letters to represent unknowns and variables
O: Write and interpret simple algebraic expressions
T: Variable | A letter standing for a number that can change, such as x in y = 2x + 1
T: Expression | A combination of numbers, letters and operations, with no equals sign, such as 3a + 2b
H: Letters for numbers
- A letter can stand for an **unknown** (one particular number we want to find, as in x + 4 = 9) or a **variable** (a quantity that can take many values, as in A = l × w).
- Conventions: 3x means 3 × x; xy means x × y; x/2 means x ÷ 2; x^{2} means x × x. Write numbers before letters (3x, not x3).
- The same letter means the same number throughout one problem; different letters may or may not be equal.
H: Writing expressions from words
- "5 more than n" is n + 5; "5 less than n" is n − 5 (not 5 − n); "twice n" is 2n; "n squared" is n^{2}; "half of n" is n/2.
- "The cost of x pens at 45p each plus a 30p bag" is 45x + 30 pence.
- Check an expression by substituting a simple value: if n = 10, "5 less than n" should give 5.
H: Why algebra matters
- It lets us state general rules (a + b = b + a for all numbers), solve problems with unknowns, and model situations in science, finance and computing.
X: A taxi charges £3 plus £1.80 per mile. Write an expression for the cost of a journey of m miles, and find the cost of 12 miles.
> Cost = 3 + 1.8m pounds
> For m = 12: 3 + 1.8 × 12 = 3 + 21.6
> = £24.60
K: Letters stand for numbers; 3x means 3 × x; translate words carefully and check with a simple value.
!: Writing "5 less than n" as 5 − n: it's n − 5.
Q: What does 4xy mean? | 4 × x × y.
Q: Write "3 more than double a" as an expression. | 2a + 3.
SUM: Algebra uses letters for unknown or varying numbers.
SUM: Expressions translate words into symbols.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: National Centre for Excellence in the Teaching of Mathematics, Secondary mastery professional development materials: algebraic notation | guidance | 2019 | https://www.ncetm.org.uk/
M1#maths-u03-01-q1@1: Which expression means "7 less than y"? | y − 7 | 7 − y | 7y | y ÷ 7 | y + 7 | "Less than" subtracts 7 from y, so y − 7; 7 − y is 7 minus y.
M2#maths-u03-01-q2@2: Pens cost p pence each and a pad costs 90p. What is the cost, in pence, of 4 pens and 2 pads? | 4p + 180 | 6p + 90 | 4p + 90 | 8p | 4(p + 90) | 4 pens cost 4p and 2 pads cost 2 × 90 = 180, so 4p + 180.
NUM1#maths-u03-01-q3@1: Find the value of 2n + 3 when n = 8.5. | 20 | 0 |  | 2 × 8.5 = 17, and 17 + 3 = 20.

## Elementary Algebra
S: Elementary algebra is the toolkit of school algebra: the rules for manipulating expressions and equations, built on the properties of numbers. Every later technique, from factorising to calculus, rests on these rules.
O: Apply the commutative, associative and distributive laws to expressions
O: Distinguish expressions, equations, formulae and identities
T: Identity | A statement true for every value of the variable, such as 2(x + 3) ≡ 2x + 6
T: Formula | A rule linking quantities, such as v = u + at
H: The laws
- **Commutative**: a + b = b + a and ab = ba.
- **Associative**: (a + b) + c = a + (b + c) and (ab)c = a(bc).
- **Distributive**: a(b + c) = ab + ac. This is the engine behind expanding brackets and factorising.
- **Inverses**: a + (−a) = 0 and a × (1/a) = 1 (a ≠ 0), which is why we can "undo" operations when solving equations.
H: Four kinds of statement
- **Expression**: no equals sign: 4x − 7.
- **Equation**: true only for particular values: 4x − 7 = 13 (x = 5).
- **Formula**: links quantities that can be measured: A = πr^{2}.
- **Identity**: true for all values, written with ≡: (x + 1)^{2} ≡ x^{2} + 2x + 1.
H: Balancing
- Whatever you do to one side of an equation, do to the other: add, subtract, multiply or divide (by anything except zero).
X: Decide whether each statement is an expression, equation, formula or identity: (a) 5(y − 2) ≡ 5y − 10; (b) 3k + 1 = 22; (c) P = 2l + 2w; (d) 9m^{2} − 4.
> (a) True for every y: an identity
> (b) True only when k = 7: an equation
> (c) Links perimeter, length and width: a formula
> (d) No equals sign: an expression
K: The commutative, associative and distributive laws justify every algebraic step; keep equations balanced.
!: Dividing both sides by an expression that might be zero, which can lose solutions.
Q: What does the distributive law say? | a(b + c) = ab + ac.
Q: What symbol shows an identity? | ≡.
SUM: Algebra follows the laws of arithmetic.
SUM: Expressions, equations, formulae and identities are different kinds of statement.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: Gelfand IM, Shen A, Algebra (Birkhäuser 1993) | textbook | 1993 | https://link.springer.com/
M1#maths-u03-02-q1@1: Which is an identity? | 3(x + 2) ≡ 3x + 6 | 3x + 2 = 11 | y = 3x + 2 | 3x + 2 | 3x > 2 | It's true for every value of x, so it's an identity.
M2#maths-u03-02-q2@2: Which law justifies 7 × 98 = 7 × 100 − 7 × 2? | The distributive law | The commutative law | The associative law | The law of indices | The inverse law | 7(100 − 2) = 7 × 100 − 7 × 2 multiplies across a bracket.

## Algebraic Expressions
S: An algebraic expression is built from terms joined by + and −. Knowing the vocabulary (terms, coefficients, constants, like terms) and substituting values accurately are the foundations of algebraic fluency.
O: Identify terms, coefficients and constants
O: Substitute values, including negatives, into expressions
T: Term | A part of an expression separated by + or −, such as 5x^{2}, −3x and 7 in 5x^{2} − 3x + 7
T: Coefficient | The number multiplying a variable in a term: the coefficient of x in −3x is −3
H: Vocabulary
- In 5x^{2} − 3x + 7: three terms; coefficients 5 and −3; constant 7.
- **Like terms** have the same letters to the same powers: 3ab and −ab are like; 3ab and 3a^{2}b aren't.
- The sign in front of a term belongs to it: in 8 − 2x, the x term is −2x.
- A **polynomial** is an expression with whole-number powers of the variable, like 4x^{3} − x + 1.
H: Substitution
- Replace each letter with its value in brackets, then follow the order of operations.
- If x = −3: x^{2} = (−3)^{2} = 9, but −x^{2} = −9, and 2x^{2} = 2 × 9 = 18 (not (2 × −3)^{2} = 36).
- Formulae from science and finance are substitution exercises: s = ut + ½at^{2} with u = 4, a = 10, t = 3 gives 12 + 45 = 57.
X: Evaluate 3a^{2} − 2ab + b when a = −2 and b = 5.
> 3a^{2} = 3 × (−2)^{2} = 3 × 4 = 12
> −2ab = −2 × (−2) × 5 = 20
> 12 + 20 + 5 = 37
- Expressions can be compared by substituting: 2(x + 1) and 2x + 1 differ for every x.
K: Identify terms with their signs; substitute with brackets and follow BIDMAS.
!: Squaring before applying the coefficient's sign wrongly: −x^{2} with x = −3 is −9, not 9.
Q: What is the coefficient of x in 7 − 4x? | −4.
Q: Are 2xy^{2} and −5y^{2}x like terms? | Yes: same letters to the same powers.
SUM: Expressions are made of terms with coefficients.
SUM: Substitute with brackets around negative values.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: National Centre for Excellence in the Teaching of Mathematics, Secondary mastery professional development materials: algebraic expressions | guidance | 2019 | https://www.ncetm.org.uk/
NUM1#maths-u03-03-q1@1: Evaluate 4x^{2} − 3x when x = −2. | 22 | 0 |  | 4 × (−2)^{2} = 16 and −3 × (−2) = 6, so 16 + 6 = 22.
M1#maths-u03-03-q2@1: Which pair are like terms? | 5a^{2}b and −a^{2}b | 5ab and 5a^{2}b | 3x and 3y | 4x^{2} and 4x | 2p and 2 | Like terms have the same letters to the same powers: a^{2}b in both.
M2#maths-u03-03-q3@2: What is the value of −x^{2} + 2x when x = −4? | −24 | 8 | −8 | 24 | 32 | −(−4)^{2} = −16 and 2 × (−4) = −8, giving −24.

## Simplifying Expressions
S: Simplifying an expression means writing it in an equivalent, shorter form by collecting like terms and using index laws. Simple expressions are easier to read, check and use.
O: Collect like terms accurately
O: Simplify products and quotients of algebraic terms
T: Collecting like terms | Adding or subtracting the coefficients of like terms: 5x + 3x − x = 7x
T: Equivalent expressions | Expressions with the same value for every value of the variables
H: Collecting like terms
- Group like terms (keeping each term's sign), then combine: 4a + 3b − a + 5b = 3a + 8b.
- Unlike terms can't be combined: 3x + 2y stays as it is, and x^{2} + x isn't 2x^{3}.
- Order: write terms in descending powers by convention: 2x^{2} − 5x + 3.
H: Multiplying and dividing terms
- Multiply the numbers, then the letters, using index laws: 3a^{2}b × 4ab^{3} = 12a^{3}b^{4}.
- Divide likewise: 12x^{5}y ÷ 3x^{2}y = 4x^{3}.
- Fractions of terms simplify by cancelling common factors: 6x^{2}/(9x) = 2x/3.
H: Checking
- Substitute a value into the original and simplified forms; they must agree (try x = 2, not 0 or 1, which hide errors).
X: Simplify 5x^{2} − 3x + 7 − 2x^{2} + 8x − 10.
> x^{2} terms: 5x^{2} − 2x^{2} = 3x^{2}
> x terms: −3x + 8x = 5x; constants: 7 − 10 = −3
> 3x^{2} + 5x − 3 (check with x = 2: original 20 − 6 + 7 − 8 + 16 − 10 = 19; simplified 12 + 10 − 3 = 19 ✓)
K: Combine only like terms, carrying each term's sign; use index laws for products and quotients.
!: Combining unlike terms, such as x^{2} + x^{2} = x^{4} (it's 2x^{2}).
Q: Simplify 2a × 5a^{3}. | 10a^{4}.
Q: Why test simplifications with x = 2 rather than x = 1? | Powers of 1 are all 1, which can hide errors.
SUM: Simplify by collecting like terms.
SUM: Use index laws to multiply and divide terms.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: National Centre for Excellence in the Teaching of Mathematics, Secondary mastery professional development materials: simplifying expressions | guidance | 2019 | https://www.ncetm.org.uk/
M1#maths-u03-04-q1@1: Simplify 7y − 3 + 2y + 8. | 9y + 5 | 9y + 11 | 14y | 5y + 5 | 9y − 11 | Collect the y terms (7y + 2y = 9y) and the numbers (−3 + 8 = 5), giving 9y + 5.
M2#maths-u03-04-q2@2: Simplify 18a^{4}b^{2} ÷ 6ab^{2}. | 3a^{3} | 3a^{4} | 12a^{3}b | 3a^{3}b | 3a^{5}b^{4} | 18 ÷ 6 = 3, a^{4} ÷ a = a^{3}, and b^{2} ÷ b^{2} = 1.
M3#maths-u03-04-q3@2: Which expression is equivalent to 2x^{2} + 3x − x^{2} − 3x? | x^{2} | x^{2} + 6x | 3x^{2} | x^{4} | 0 | The x^{2} terms give x^{2}; the x terms cancel to 0.

## Expanding Brackets
S: Expanding brackets means multiplying out so that an expression is written as a sum of terms. It relies on the distributive law and is the reverse of factorising.
O: Expand single, double and triple brackets
O: Recognise and use the expansions of (a ± b)^{2} and (a + b)(a − b)
T: Expand | Multiply out brackets to remove them
T: Difference of two squares | (a + b)(a − b) = a^{2} − b^{2}
H: Single and double brackets
- Single: multiply every term inside by the term outside: −3(2x − 5) = −6x + 15.
- Double: every term in the first bracket multiplies every term in the second: (x + 4)(x − 7) = x^{2} − 7x + 4x − 28 = x^{2} − 3x − 28. A grid keeps track of all four products.
- Expand then simplify: 3(x + 2) − 2(x − 1) = 3x + 6 − 2x + 2 = x + 8.
H: Special products
E: (a + b)^{2} = a^{2} + 2ab + b^{2}; (a − b)^{2} = a^{2} − 2ab + b^{2}; (a + b)(a − b) = a^{2} − b^{2}
- (x + 5)^{2} isn't x^{2} + 25: the middle term 10x is easy to forget.
H: Triple brackets
- Expand two brackets first, then multiply the result by the third: (x + 1)(x + 2)(x − 3) = (x^{2} + 3x + 2)(x − 3) = x^{3} − 7x − 6.
X: Expand and simplify (2x − 3)(x + 4) − (x − 1)^{2}.
> (2x − 3)(x + 4) = 2x^{2} + 8x − 3x − 12 = 2x^{2} + 5x − 12
> (x − 1)^{2} = x^{2} − 2x + 1
> 2x^{2} + 5x − 12 − x^{2} + 2x − 1 = x^{2} + 7x − 13 (the minus sign applies to every term of the square)
K: Every term multiplies every term; squares of brackets have a middle term; a minus before a bracket changes every sign.
!: Writing (x + 5)^{2} = x^{2} + 25.
Q: Expand (x − 6)(x + 6). | x^{2} − 36.
Q: Expand (3x + 2)^{2}. | 9x^{2} + 12x + 4.
SUM: Expanding uses the distributive law.
SUM: Special products save time and avoid errors.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: National Centre for Excellence in the Teaching of Mathematics, Secondary mastery professional development materials: expanding brackets | guidance | 2019 | https://www.ncetm.org.uk/
M1#maths-u03-05-q1@1: Expand 4(3x − 2). | 12x − 8 | 12x − 2 | 7x − 6 | 12x + 8 | 3x − 8 | Multiply both terms by 4: 4 × 3x = 12x and 4 × (−2) = −8.
M2#maths-u03-05-q2@2: Expand (x − 9)(x + 2). | x^{2} − 7x − 18 | x^{2} + 7x − 18 | x^{2} − 7x + 18 | x^{2} − 11x − 18 | x^{2} − 18 | x × 2 = 2x and −9 × x = −9x combine to −7x; −9 × 2 = −18.
M3#maths-u03-05-q3@2: What is the coefficient of x in (2x − 5)^{2}? | −20 | −10 | 10 | 25 | 4 | (2x − 5)^{2} = 4x^{2} − 20x + 25: the middle term is 2 × 2x × (−5).

## Factorisation
S: Factorising writes an expression as a product of factors. It's the reverse of expanding and the key to solving quadratic equations, simplifying algebraic fractions and finding roots.
O: Factorise by taking out common factors and factorising quadratics
O: Recognise the difference of two squares and perfect squares
T: Factorise | Write an expression as a product of its factors
T: Fully factorised | Factorised so that no factor can be factorised further
H: Common factors
- Take out the HCF of all terms, including letters: 12x^{2}y − 18xy^{2} = 6xy(2x − 3y).
- Check by expanding back.
H: Quadratics
- x^{2} + bx + c: find two numbers that multiply to c and add to b: x^{2} − x − 12 = (x − 4)(x + 3).
- ax^{2} + bx + c with a ≠ 1: find two numbers that multiply to ac and add to b, split the middle term, then factorise in pairs: 6x^{2} + x − 2 = 6x^{2} + 4x − 3x − 2 = 2x(3x + 2) − (3x + 2) = (2x − 1)(3x + 2).
H: Special forms
- Difference of two squares: a^{2} − b^{2} = (a − b)(a + b): 9x^{2} − 49 = (3x − 7)(3x + 7).
- Perfect square: x^{2} + 10x + 25 = (x + 5)^{2}.
- Always look for a common factor first, then check whether a bracket factorises further: 2x^{2} − 18 = 2(x^{2} − 9) = 2(x − 3)(x + 3).
X: Factorise fully 3x^{3} − 12x.
> Common factor 3x: 3x(x^{2} − 4)
> x^{2} − 4 is a difference of two squares: (x − 2)(x + 2)
> 3x(x − 2)(x + 2)
P: **Investigate with the lab.** Build a quadratic with roots −1 and 3 and compare the factorised form shown with the expanded one. Then try to factorise one with no real roots.
IX: quadratics
K: Common factor first; then two numbers for quadratics; spot differences of two squares; check by expanding.
!: Stopping before fully factorising, as in 2(x^{2} − 9).
Q: Factorise x^{2} + 9x + 20. | (x + 4)(x + 5).
Q: Factorise 25 − 4y^{2}. | (5 − 2y)(5 + 2y).
SUM: Factorising reverses expanding.
SUM: Fully factorise by checking every bracket.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: National Centre for Excellence in the Teaching of Mathematics, Secondary mastery professional development materials: factorising | guidance | 2019 | https://www.ncetm.org.uk/
M1#maths-u03-06-q1@1: Factorise x^{2} − 5x + 6. | (x − 2)(x − 3) | (x + 2)(x + 3) | (x − 1)(x − 6) | (x − 2)(x + 3) | x(x − 5) + 6 | −2 and −3 multiply to 6 and add to −5, so the factors are (x − 2)(x − 3).
M2#maths-u03-06-q2@2: Factorise fully 8x^{2} − 2. | 2(2x − 1)(2x + 1) | (8x − 2)(x + 1) | 2(4x^{2} − 1) | (4x − 1)(2x + 2) | 8(x − 1)(x + 1) | Take out 2 to get 2(4x^{2} − 1), then 4x^{2} − 1 is a difference of two squares.
M3#maths-u03-06-q3@2: Factorise 3x^{2} − 10x − 8. | (3x + 2)(x − 4) | (3x − 2)(x + 4) | (3x − 4)(x + 2) | (3x + 4)(x − 2) | 3(x − 4)(x + 2) | ac = −24: −12 and 2 add to −10, giving 3x(x − 4) + 2(x − 4) = (3x + 2)(x − 4).

## Algebraic Manipulation
S: Algebraic manipulation is rearranging, substituting and transforming expressions and formulae while keeping them equal. It's how a formula for one quantity is turned into a formula for another, and how proofs are built.
O: Rearrange formulae to change the subject
O: Use algebra to prove simple general results
T: Subject of a formula | The variable on its own on one side, such as v in v = u + at
T: Algebraic proof | Showing a statement holds for all values using algebra, not examples
H: Changing the subject
- Undo operations in reverse order, doing the same to both sides: v = u + at gives at = v − u, so t = (v − u)/a.
- If the new subject appears twice, collect those terms and factorise it out: ax + b = cx + d gives x(a − c) = d − b, so x = (d − b)/(a − c).
- Squares and roots: A = πr^{2} gives r = √(A/π) (taking the positive root for a length).
H: Algebraic proof
- Represent general numbers: an even number is 2n, an odd number 2n + 1, consecutive integers n and n + 1.
- Show the sum of any three consecutive integers is a multiple of 3: n + (n + 1) + (n + 2) = 3n + 3 = 3(n + 1).
- Examples can support a conjecture, but only algebra proves it for every case.
X: Make x the subject of y = (3x + 2)/(x − 1).
> Multiply both sides by (x − 1): y(x − 1) = 3x + 2, so xy − y = 3x + 2
> Collect x terms: xy − 3x = y + 2
> Factorise: x(y − 3) = y + 2, so x = (y + 2)/(y − 3)
K: Undo operations in reverse order; if the subject appears twice, collect and factorise; prove with general expressions like 2n and 2n + 1.
!: Checking a "proof" with a few numbers and calling it proved.
Q: Make r the subject of C = 2πr. | r = C/(2π).
Q: How do you write a general odd number? | 2n + 1, where n is an integer.
SUM: Rearranging keeps formulae equivalent.
SUM: Algebra proves results for all cases.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: Department for Education, Mathematics AS and A level subject content: proof | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
M1#maths-u03-07-q1@1: Make a the subject of v^{2} = u^{2} + 2as. | a = (v^{2} − u^{2})/(2s) | a = v^{2} − u^{2} − 2s | a = (v − u)^{2}/(2s) | a = 2s/(v^{2} − u^{2}) | a = (v^{2} + u^{2})/(2s) | Subtract u^{2} from both sides to get 2as = v^{2} − u^{2}, then divide by 2s.
M2#maths-u03-07-q2@2: Which expression shows the product of two consecutive integers is even? | n(n + 1), where one of n and n + 1 is even | 2n | 2n + 1 | n + (n + 1) | n^{2} + 1 | Of any two consecutive integers, one is even, so their product n(n + 1) has a factor of 2.

## Algebraic Fractions
S: Algebraic fractions have expressions on the top or bottom. They follow the same rules as numerical fractions: simplify by cancelling common factors, and add or subtract over a common denominator.
O: Simplify algebraic fractions by factorising
O: Add, subtract, multiply and divide algebraic fractions
T: Algebraic fraction | A fraction whose numerator or denominator is an algebraic expression, such as (x + 2)/(x^{2} − 4)
T: Cancelling | Dividing the numerator and denominator by a common factor
H: Simplifying
- Factorise top and bottom fully, then cancel common **factors** (whole brackets), never individual terms: (x^{2} − 9)/(x^{2} + 3x) = (x − 3)(x + 3)/(x(x + 3)) = (x − 3)/x.
- (x + 2)/x isn't 2: you can't cancel the x in a sum.
H: The four operations
- Multiply tops and bottoms (cancelling first saves work); divide by multiplying by the reciprocal.
- Add or subtract over the lowest common denominator: 2/x + 3/(x + 1) = (2(x + 1) + 3x)/(x(x + 1)) = (5x + 2)/(x(x + 1)).
- Equations with algebraic fractions: multiply every term by the common denominator to clear them, then check no solution makes a denominator zero.
X: Simplify (2x^{2} + 5x − 3)/(4x^{2} − 1).
> Numerator: (2x − 1)(x + 3)
> Denominator: (2x − 1)(2x + 1)
> Cancel (2x − 1): (x + 3)/(2x + 1)
- Excluded values matter: (x^{2} − 9)/(x^{2} + 3x) simplifies to (x − 3)/x, but the original is still undefined at x = −3 and x = 0.
- Dividing by a fraction: (x/3) ÷ (x^{2}/6) = (x/3) × (6/x^{2}) = 2/x.
K: Factorise, then cancel whole factors; use a common denominator to add and subtract.
!: Cancelling terms instead of factors, as in (x + 6)/6 = x.
Q: Simplify (3x + 6)/(x + 2). | 3.
Q: What is 1/x + 1/y as a single fraction? | (y + x)/(xy).
SUM: Algebraic fractions follow the rules of fractions.
SUM: Only common factors cancel.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: Department for Education, Mathematics AS and A level subject content: algebra and functions | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
M1#maths-u03-08-q1@1: Simplify (x^{2} − 4x)/(x^{2} − 16). | x/(x + 4) | −4x/(−16) | x/4 | 1/(x + 4) | (x − 4)/x | x(x − 4)/((x − 4)(x + 4)) cancels to x/(x + 4).
M2#maths-u03-08-q2@2: Write 3/(x − 2) − 1/x as a single fraction. | (2x + 2)/(x(x − 2)) | 2/(x − 2) | (3x − 1)/(x(x − 2)) | 2/(2x − 2) | (2x − 2)/(x(x − 2)) | (3x − (x − 2))/(x(x − 2)) = (2x + 2)/(x(x − 2)).

## Linear Equations
S: A linear equation has the unknown only to the first power, like 3x + 5 = 20. Solving it means finding the value that makes it true, by doing the same thing to both sides until the unknown is alone.
O: Solve linear equations, including with brackets, fractions and unknowns on both sides
O: Form and solve linear equations from problems
T: Linear equation | An equation in which the unknown appears only to the power 1
T: Solution | A value of the unknown that makes the equation true
H: Solving
- Expand brackets, then collect unknowns on one side and numbers on the other, then divide: 5(x − 2) = 2x + 11 gives 5x − 10 = 2x + 11, so 3x = 21 and x = 7.
- Fractions: multiply every term by the LCM of the denominators: x/3 + x/4 = 7 gives 4x + 3x = 84, so x = 12.
- Check by substituting back: 5(7 − 2) = 25 and 2(7) + 11 = 25 ✓.
H: Forming equations
- Define the unknown clearly ("let the width be w cm"), write the relationship, solve, then answer in context with units.
- A rectangle's length is 3 cm more than its width and its perimeter is 46 cm: 2w + 2(w + 3) = 46 gives w = 10, so it's 10 cm by 13 cm.
- Some equations have no solution (2x + 1 = 2x + 5) or infinitely many (2(x + 1) = 2x + 2, an identity).
X: Solve (2x + 1)/3 − (x − 2)/4 = 2.
> Multiply every term by 12: 4(2x + 1) − 3(x − 2) = 24
> Expand: 8x + 4 − 3x + 6 = 24, so 5x + 10 = 24
> 5x = 14, so x = 14/5 = 2.8
P: **Investigate with the lab.** Choose Linear equations and solve each problem by doing the same operation to both sides, line by line.
IX: practice
K: Expand, clear fractions with the LCM, collect, divide, and check by substitution.
!: Forgetting to multiply every term (including whole-number terms) when clearing fractions.
Q: Solve 4x − 7 = x + 8. | x = 5.
Q: How do you clear the fractions in x/2 + x/5 = 7? | Multiply every term by 10.
SUM: Linear equations are solved by balancing.
SUM: Form equations by defining the unknown and writing the relationship.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: National Centre for Excellence in the Teaching of Mathematics, Secondary mastery professional development materials: solving equations | guidance | 2019 | https://www.ncetm.org.uk/
NUM1#maths-u03-09-q1@1: Solve 3(2x − 4) = 2(x + 6). | 6 | 0 |  | 6x − 12 = 2x + 12, so 4x = 24 and x = 6.
M1#maths-u03-09-q2@1: Solve 7 − 2x = 15. | x = −4 | x = 4 | x = 11 | x = −11 | x = 8 | Subtract 7 from both sides: −2x = 8. Divide by −2: x = −4.
M2#maths-u03-09-q3@2: Three consecutive integers add up to 141. What is the largest? | 48 | 47 | 46 | 49 | 45 | n + (n + 1) + (n + 2) = 141 gives 3n + 3 = 141, n = 46, so the largest is 48.
NUM1#maths-u03-09-q4@1: Solve 5x − 7 = 2x + 8. | 5 | 0 |  | 3x = 15, so x = 5.

## Simultaneous Equations
S: Simultaneous equations are two or more equations that must be true at the same time. With two unknowns you need two equations, and the solution is where their graphs meet.
O: Solve linear simultaneous equations by elimination and substitution
O: Interpret solutions graphically and form equations from problems
T: Elimination | Adding or subtracting equations to remove one unknown
T: Substitution | Rearranging one equation and substituting it into the other
H: Elimination
- Make the coefficients of one unknown equal (multiplying equations if needed), then add (opposite signs) or subtract (same signs).
- 3x + 2y = 16 and 5x − 2y = 8: add to get 8x = 24, so x = 3, then 9 + 2y = 16 gives y = 3.5.
H: Substitution
- Best when one equation already gives one unknown: y = 2x − 1 and 3x + y = 14 gives 3x + 2x − 1 = 14, so x = 3 and y = 5.
- Substitution also solves a linear and a quadratic equation together (next lessons on quadratics): y = x + 1 and x^{2} + y^{2} = 25 give two solutions.
H: Meaning
- Each linear equation is a straight line; the solution is their intersection point.
- Parallel lines (same gradient, different intercept) give no solution; the same line gives infinitely many.
X: Two adult tickets and three child tickets cost £36; one adult and four child tickets cost £33. Find the price of each.
> 2a + 3c = 36 and a + 4c = 33
> Double the second: 2a + 8c = 66; subtract the first: 5c = 30, so c = 6
> a + 24 = 33, so a = 9: adults £9, children £6 (check: 18 + 18 = 36 ✓)
P: **Investigate with the lab.** Choose Simultaneous equations and solve each pair by elimination, then check both equations with your answer.
IX: practice
K: Match coefficients and add or subtract to eliminate, or substitute; the solution is the intersection of the graphs.
!: Subtracting when the signs are opposite (you should add), or forgetting to multiply every term.
Q: When should you add the equations in elimination? | When the coefficients of the unknown have opposite signs.
Q: What does a pair of simultaneous equations with no solution look like graphically? | Two parallel lines.
SUM: Two unknowns need two equations.
SUM: Solve by elimination or substitution.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: National Centre for Excellence in the Teaching of Mathematics, Secondary mastery professional development materials: simultaneous equations | guidance | 2019 | https://www.ncetm.org.uk/
M1#maths-u03-10-q1@1: Solve x + y = 10 and x − y = 4. | x = 7, y = 3 | x = 3, y = 7 | x = 6, y = 4 | x = 5, y = 5 | x = 14, y = −4 | Adding gives 2x = 14, so x = 7 and y = 3.
M2#maths-u03-10-q2@2: Solve 2x + 3y = 12 and 4x − y = 10. | x = 3, y = 2 | x = 2, y = 3 | x = 4, y = 6 | x = 1.5, y = 3 | x = 3, y = −2 | From the second, y = 4x − 10; then 2x + 12x − 30 = 12 gives x = 3 and y = 2.
NUM1#maths-u03-10-q3@1: Solve x + y = 7 and x − y = 3. What is x? | 5 | 0 |  | Adding the equations gives 2x = 10, so x = 5 (and y = 2).

## Quadratic Equations
S: A quadratic equation has the unknown squared, like x^{2} − 5x + 6 = 0. It can have two, one or no real solutions, found by factorising, completing the square or the quadratic formula.
O: Solve quadratic equations by factorising
O: Interpret the solutions as roots of a graph
T: Quadratic equation | An equation of the form ax^{2} + bx + c = 0 with a ≠ 0
T: Root | A solution of an equation; the x-coordinate where a graph crosses the x-axis
H: Solving by factorising
- Rearrange to = 0, factorise, then use the fact that if a product is zero, one factor is zero.
- x^{2} − x − 20 = 0 → (x − 5)(x + 4) = 0 → x = 5 or x = −4.
- x^{2} = 6x → x^{2} − 6x = 0 → x(x − 6) = 0 → x = 0 or 6. Don't divide by x: you'd lose x = 0.
- 9x^{2} = 4 → x^{2} = 4/9 → x = ±2/3: remember both roots.
H: Graphs and roots
- The graph of y = ax^{2} + bx + c is a parabola; its x-intercepts are the roots.
- Two roots: crosses the x-axis twice; one repeated root: touches it; no real roots: misses it.
- Many problems lead to quadratics (areas, projectiles, profit); reject solutions that don't fit the context (a negative length).
X: A rectangle has length 3 cm more than its width and area 40 cm^{2}. Find its dimensions.
> w(w + 3) = 40, so w^{2} + 3w − 40 = 0
> (w + 8)(w − 5) = 0, so w = −8 or w = 5
> A width can't be negative, so the rectangle is 5 cm by 8 cm
P: **Investigate with the lab.** Choose Quadratic equations. Try factorising first, and use the formula when it won't factorise.
IX: practice
P: **Investigate with the lab.** Set b and c so the roots are −1 and 3, then change a: the roots stay put while the parabola stretches. What does a change, and what doesn't it?
IX: quadratics
K: Rearrange to = 0, factorise, set each factor to zero; never divide by the unknown; check solutions fit the context.
!: Solving x^{2} = 6x by dividing by x and losing the solution x = 0.
Q: Solve (x − 3)(2x + 1) = 0. | x = 3 or x = −1/2.
Q: What does a repeated root look like on a graph? | The parabola touches the x-axis at one point.
SUM: Quadratics are solved by making them equal zero.
SUM: Roots are where the parabola meets the x-axis.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: Department for Education, Mathematics AS and A level subject content: algebra and functions | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
M1#maths-u03-11-q1@1: Solve x^{2} + 2x − 15 = 0. | x = 3 or x = −5 | x = −3 or x = 5 | x = 15 or x = −1 | x = 3 only | x = −2 or x = 15 | It factorises as (x + 5)(x − 3) = 0, so x = −5 or x = 3.
M2#maths-u03-11-q2@2: Solve 2x^{2} = 18. | x = 3 or x = −3 | x = 3 | x = 9 | x = ±9 | x = 4.5 | Divide by 2 to get x^{2} = 9, so x = ±3: both the positive and negative roots count.
M3#maths-u03-11-q3@2: Why is it wrong to solve x^{2} = 5x by dividing both sides by x? | It loses the solution x = 0 | It gives the wrong positive root | Division isn't allowed in equations | It makes the equation linear | It doubles the solutions | Dividing by x assumes x ≠ 0, but x = 0 is a solution.
NUM1#maths-u03-11-q4@1: What is the larger root of x^{2} − x − 12 = 0? | 4 | 0 |  | (x − 4)(x + 3) = 0 gives x = 4 or x = −3.

## Completing the Square
S: Completing the square rewrites x^{2} + bx + c as (x + p)^{2} + q. It solves any quadratic, gives the turning point of a parabola, and is how the quadratic formula is derived.
O: Write a quadratic in completed-square form
O: Use completed-square form to solve equations and find turning points
T: Completed-square form | A quadratic written as a(x + p)^{2} + q
T: Turning point | The minimum or maximum point of a parabola; for (x + p)^{2} + q it's (−p, q)
H: The method
- Halve the coefficient of x: x^{2} + bx = (x + b/2)^{2} − (b/2)^{2}.
- x^{2} + 6x + 11 = (x + 3)^{2} − 9 + 11 = (x + 3)^{2} + 2.
- If a ≠ 1, factor it out of the x terms first: 2x^{2} − 12x + 7 = 2(x^{2} − 6x) + 7 = 2((x − 3)^{2} − 9) + 7 = 2(x − 3)^{2} − 11.
H: Uses
- **Solving**: (x + 3)^{2} = 7 gives x + 3 = ±√7, so x = −3 ± √7 (exact surd answers).
- **Turning point**: y = (x + 3)^{2} + 2 has a minimum at (−3, 2), because the square is never negative.
- **No real roots**: if the completed square equals a negative number, there are no real solutions: (x + 3)^{2} + 2 = 0 has none.
X: Solve x^{2} − 8x + 5 = 0 by completing the square, leaving your answer in surd form.
> x^{2} − 8x = (x − 4)^{2} − 16
> (x − 4)^{2} − 16 + 5 = 0, so (x − 4)^{2} = 11
> x − 4 = ±√11, so x = 4 ± √11
- For a negative leading coefficient, −x^{2} + 4x + 1 = −(x − 2)^{2} + 5 has a maximum at (2, 5).
P: **Investigate with the lab.** Move the vertex to (2, −3) and read the completed-square form beneath the graph. Check that the numbers in a(x − p)² + q are the vertex coordinates.
IX: quadratics
K: Halve the x coefficient, square and subtract; the turning point of a(x + p)^{2} + q is (−p, q).
!: Forgetting to subtract (b/2)^{2}, or forgetting the ± when square-rooting.
Q: Write x^{2} + 10x in completed-square form. | (x + 5)^{2} − 25.
Q: What is the turning point of y = (x − 2)^{2} − 7? | (2, −7).
SUM: Completing the square solves any quadratic.
SUM: It reveals the turning point.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: Department for Education, Mathematics AS and A level subject content: algebra and functions | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
M1#maths-u03-12-q1@1: Write x^{2} − 4x + 9 in the form (x + p)^{2} + q. | (x − 2)^{2} + 5 | (x − 2)^{2} + 9 | (x − 4)^{2} − 7 | (x + 2)^{2} + 5 | (x − 2)^{2} − 5 | (x − 2)^{2} = x^{2} − 4x + 4, so add 5 to reach 9.
M2#maths-u03-12-q2@2: What is the minimum value of x^{2} + 6x + 14? | 5 | 14 | −3 | 3 | 9 | (x + 3)^{2} + 5 is smallest when the square is zero, giving 5.

## The Quadratic Formula
S: The quadratic formula gives the solutions of any quadratic equation directly from its coefficients. The discriminant inside it tells you how many real solutions there are before you calculate them.
O: Solve quadratic equations using the formula
O: Use the discriminant to find the number of real roots
T: Quadratic formula | x = (−b ± √(b^{2} − 4ac))/(2a) for ax^{2} + bx + c = 0
T: Discriminant | b^{2} − 4ac, which decides the nature of the roots
H: Using the formula
E: x = (−b ± √(b^{2} − 4ac)) / (2a)
- Write the equation as ax^{2} + bx + c = 0 and identify a, b and c with their signs.
- 2x^{2} − 3x − 4 = 0: a = 2, b = −3, c = −4, so x = (3 ± √(9 + 32))/4 = (3 ± √41)/4, giving x ≈ 2.35 or −0.85.
- Use it when factorising fails or the question asks for answers to a number of decimal places or significant figures.
H: The discriminant
- b^{2} − 4ac > 0: two distinct real roots. = 0: one repeated root. < 0: no real roots (two complex roots, later in this school).
- A level questions: find k so that x^{2} + kx + 9 = 0 has equal roots: k^{2} − 36 = 0, so k = ±6.
H: Where it comes from
- Completing the square on ax^{2} + bx + c = 0 gives (x + b/(2a))^{2} = (b^{2} − 4ac)/(4a^{2}), and square-rooting gives the formula.
X: Solve 3x^{2} + 5x − 1 = 0, giving answers to 3 significant figures.
> a = 3, b = 5, c = −1; discriminant = 25 + 12 = 37
> x = (−5 ± √37)/6
> x ≈ 0.180 or x ≈ −1.85
P: **Investigate with the lab.** Watch the discriminant as you change c. Find the value where the graph just touches the x-axis, then go past it and see the roots become complex.
IX: quadratics
K: Read off a, b, c with signs; b^{2} − 4ac decides the number of roots.
!: Using b instead of −b, or dividing only part of the top by 2a.
Q: How many real roots does x^{2} + 2x + 5 = 0 have? | None: b^{2} − 4ac = 4 − 20 < 0.
Q: What does a zero discriminant mean? | One repeated real root.
SUM: The formula solves every quadratic.
SUM: The discriminant counts the real roots.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: Department for Education, Mathematics AS and A level subject content: algebra and functions | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
NUM1#maths-u03-13-q1@1: What is the discriminant of 2x^{2} − 7x + 3 = 0? | 25 | 0 |  | b^{2} − 4ac = 49 − 24 = 25, so there are two distinct real roots.
M1#maths-u03-13-q2@1: How many real roots does x^{2} − 6x + 9 = 0 have? | One (repeated) | Two | None | Three | Infinitely many | b^{2} − 4ac = 36 − 36 = 0, so there's one repeated root, x = 3.
M3#maths-u03-13-q3@2: For which value of k does x^{2} + 4x + k = 0 have no real roots? | k = 5 | k = 4 | k = 3 | k = 0 | k = −1 | No real roots needs 16 − 4k < 0, so k > 4; only k = 5 works.

## Cubic Equations
S: A cubic equation has the unknown cubed, like x^{3} − 6x^{2} + 11x − 6 = 0. Every cubic has at least one real root, and once one root is found, the rest come from a quadratic.
O: Solve cubic equations using the factor theorem
O: Sketch cubic graphs from their roots
T: Cubic | A polynomial of degree 3: ax^{3} + bx^{2} + cx + d with a ≠ 0
T: Degree | The highest power of the variable in a polynomial
H: Solving cubics
- Look for a common factor first: x^{3} − 4x = x(x − 2)(x + 2), so roots 0, ±2.
- Otherwise use the factor theorem: test x = ±1, ±2, … (divisors of the constant term) until f(a) = 0; then (x − a) is a factor.
- Divide to get a quadratic factor, then solve that.
- A cubic has 1, 2 or 3 distinct real roots (counting a repeated root once), never none.
H: Graphs
- For a > 0 the curve goes from bottom left to top right; for a < 0, top left to bottom right.
- It crosses the x-axis at single roots, touches it at a repeated (squared) root, and crosses the y-axis at d.
- y = (x − 1)^{2}(x + 3) touches at x = 1 and crosses at x = −3.
X: Solve x^{3} − 6x^{2} + 11x − 6 = 0.
> f(1) = 1 − 6 + 11 − 6 = 0, so (x − 1) is a factor
> Dividing: x^{3} − 6x^{2} + 11x − 6 = (x − 1)(x^{2} − 5x + 6) = (x − 1)(x − 2)(x − 3)
> Roots: x = 1, 2, 3
K: Take out common factors; find one root with the factor theorem; divide to a quadratic; sketch from the roots and the sign of a.
!: Assuming a cubic with a positive constant has no negative roots: test negative divisors too.
Q: How many real roots must a cubic have? | At least one.
Q: What does a squared factor (x − a)^{2} mean for the graph? | It touches the x-axis at x = a.
SUM: Cubics factorise once one root is found.
SUM: Roots and the leading coefficient give the graph's shape.
SRC: Department for Education, Mathematics AS and A level subject content: algebra and functions | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Gelfand IM, Shen A, Algebra (Birkhäuser 1993) | textbook | 1993 | https://link.springer.com/
M1#maths-u03-14-q1@1: What are the roots of x(x − 4)(x + 1) = 0? | 0, 4 and −1 | 4 and −1 only | 0, −4 and 1 | 4 only | 0 only | Each factor gives a root: x = 0, x = 4, x = −1.
M2#maths-u03-14-q2@2: Which value is a root of x^{3} − 2x^{2} − 5x + 6? | x = 1 | x = −1 | x = 2 | x = −2 | x = 6 | Substituting gives f(1) = 1 − 2 − 5 + 6 = 0, so x = 1 is a root.

## Polynomial Equations
S: Polynomial equations of any degree arise in modelling and science. Low-degree ones can be solved exactly; for higher degrees we factorise where possible and otherwise solve numerically or graphically.
O: Solve polynomial equations by factorising and substitution
O: Recognise when numerical or graphical methods are needed
T: Polynomial equation | An equation p(x) = 0 where p is a polynomial
T: Hidden quadratic | An equation like x^{4} − 5x^{2} + 4 = 0 that becomes quadratic with a substitution (u = x^{2})
H: Exact methods
- Factorise fully: x^{4} − 16 = (x^{2} − 4)(x^{2} + 4) = (x − 2)(x + 2)(x^{2} + 4), so real roots ±2.
- Hidden quadratics: x^{4} − 5x^{2} + 4 = 0 with u = x^{2} gives u^{2} − 5u + 4 = 0, so u = 1 or 4, so x = ±1 or ±2.
- Also works for 2^{2x} − 5 × 2^{x} + 4 = 0 (u = 2^{x}).
- A polynomial of degree n has at most n real roots.
H: When exact methods fail
- There are formulae for cubics and quartics, but they're unwieldy, and there's no general formula for degree 5 or higher (the Abel–Ruffini theorem).
- Use graphs to locate roots, then numerical methods (bisection, Newton–Raphson: School 19) to approximate them.
X: Solve x^{4} − 13x^{2} + 36 = 0.
> Let u = x^{2}: u^{2} − 13u + 36 = 0
> (u − 4)(u − 9) = 0, so u = 4 or u = 9
> x^{2} = 4 or 9, so x = ±2 or ±3
- Graphs show how many real roots to expect before you solve.
K: Factorise or substitute to reach a quadratic; degree n means at most n roots; use numerical methods when exact ones run out.
!: Forgetting the negative square roots when returning from u = x^{2} to x.
Q: What substitution solves x^{6} − 9x^{3} + 8 = 0? | u = x^{3}.
Q: Is there a general formula for degree 5 polynomials? | No: the Abel–Ruffini theorem shows there isn't one in radicals.
SUM: Many polynomial equations reduce to quadratics.
SUM: Higher degrees often need numerical methods.
SRC: Department for Education, Mathematics AS and A level subject content: algebra and functions | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart I, Galois Theory (5th edn, CRC Press 2022) | textbook | 2022 | https://www.routledge.com/
NUM1#maths-u03-15-q1@2: How many real solutions does x^{4} − 10x^{2} + 9 = 0 have? | 4 | 0 |  | u^{2} − 10u + 9 = 0 gives u = 1 or 9, so x = ±1 or ±3: four solutions.
M1#maths-u03-15-q2@1: What is the maximum number of real roots a degree 4 polynomial can have? | 4 | 2 | 3 | 5 | 8 | A polynomial of degree n has at most n real roots.
M2#maths-u03-15-q3@2: What are the real solutions of x^{4} − 81 = 0? | x = 3 or x = −3 | x = 3 only | x = ±9 | x = ±3 and ±3i as real roots | x = 81 | (x^{2} − 9)(x^{2} + 9) = 0; x^{2} + 9 = 0 has no real roots.

## Inequalities
S: An inequality compares two quantities using <, >, ≤ or ≥. Solving one gives a range of values rather than a single answer, shown on a number line or in set or interval notation.
O: Solve linear and quadratic inequalities
O: Represent solution sets on number lines and in set notation
T: Inequality | A statement that one quantity is less than, greater than, or at most or at least another
T: Critical values | The values where the two sides of an inequality are equal; for a quadratic inequality, the roots
H: Linear inequalities
- Solve like equations, but **reverse the sign when multiplying or dividing by a negative**: −3x < 12 gives x > −4.
- 2x + 5 ≥ 11 gives x ≥ 3; on a number line, a filled circle at 3 and an arrow to the right.
- Double inequalities: −1 < 2x + 3 ≤ 9 gives −2 < x ≤ 3. Integers satisfying it: −1, 0, 1, 2, 3.
H: Quadratic inequalities
- Find the critical values by solving the equation, sketch the parabola, and read off where it's above or below the axis.
- x^{2} − x − 6 < 0: roots −2 and 3; the curve is below the axis between them, so −2 < x < 3.
- x^{2} − x − 6 > 0: x < −2 or x > 3 (two separate regions).
- Set notation: {x : x < −2} ∪ {x : x > 3}.
X: Solve 2x^{2} − 5x − 3 ≥ 0.
> Critical values: (2x + 1)(x − 3) = 0 gives x = −1/2 or x = 3
> The parabola opens upwards, so it's above or on the axis outside the roots
> x ≤ −1/2 or x ≥ 3
K: Reverse the inequality when multiplying or dividing by a negative; for quadratics, find the roots and sketch.
!: Writing −2 > x > 3 for "x < −2 or x > 3": no number satisfies it.
Q: Solve 5 − 2x > 1. | x < 2.
Q: Solve x^{2} < 16. | −4 < x < 4.
SUM: Inequalities have ranges of solutions.
SUM: Sketch quadratics to solve quadratic inequalities.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: Department for Education, Mathematics AS and A level subject content: algebra and functions | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
M1#maths-u03-16-q1@1: Solve −4x ≥ 20. | x ≤ −5 | x ≥ −5 | x ≤ 5 | x ≥ 5 | x ≤ −80 | Dividing by −4 reverses the inequality: x ≤ −5.
M2#maths-u03-16-q2@2: Solve x^{2} − 9 > 0. | x < −3 or x > 3 | −3 < x < 3 | x > 3 | x > ±3 | x > 9 | The parabola is above the axis outside its roots, ±3.
M3#maths-u03-16-q3@2: How many integers satisfy −3 ≤ 2x + 1 < 8? | 6 | 5 | 7 | 4 | 11 | −4 ≤ 2x < 7 gives −2 ≤ x < 3.5: the integers −2, −1, 0, 1, 2, 3.

## Simultaneous Inequalities
S: Simultaneous inequalities are several conditions that must all hold at once. In two variables, each inequality is a region of the plane, and the solution set is where all the regions overlap: the basis of linear programming.
O: Solve simultaneous inequalities in one variable
O: Represent and find regions defined by inequalities in two variables
T: Feasible region | The set of points satisfying all the inequalities at once
T: Boundary line | The line where an inequality becomes an equation: solid for ≤ or ≥, dashed for < or >
H: One variable
- Solve each inequality and find the overlap: x > 2 and x ≤ 7 gives 2 < x ≤ 7.
- If there's no overlap (x < 1 and x > 4), there's no solution.
- A linear and a quadratic: x > 1 and x^{2} < 9 gives 1 < x < 3.
H: Two variables
- Draw each boundary line (solid for ≤, ≥; dashed for <, >), then test a point such as (0, 0) to decide which side satisfies it.
- Shade the region (exam boards differ on shading wanted or unwanted regions: label clearly).
- The region y ≥ x, y ≤ 4 and x ≥ 0 is a triangle with vertices (0, 0), (0, 4) and (4, 4).
- In linear programming (School 18), the best value of an objective is at a vertex of the feasible region.
X: List the integer points (x, y) satisfying x ≥ 1, y > x and x + y ≤ 6.
> x = 1: y > 1 and y ≤ 5, so y = 2, 3, 4, 5
> x = 2: y > 2 and y ≤ 4, so y = 3, 4; x = 3: y > 3 and y ≤ 3: none
> Points: (1, 2), (1, 3), (1, 4), (1, 5), (2, 3), (2, 4)
K: Find the overlap of all conditions; in 2D, draw boundaries (solid or dashed) and test a point to choose the side.
!: Drawing y > x with a solid line, which includes points on the line.
Q: What does a dashed boundary line mean? | Points on the line aren't included (strict inequality).
Q: Solve x > 3 and x < 1 together. | No solution.
SUM: Simultaneous inequalities overlap.
SUM: In two variables, they define regions.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: Department for Education, Mathematics AS and A level subject content: algebra and functions | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
M1#maths-u03-17-q1@1: Which values satisfy x > −2 and x ≤ 3? | −2 < x ≤ 3 | x ≤ −2 | x > 3 | −2 ≤ x < 3 | Any real number | The overlap of x > −2 and x ≤ 3 is −2 < x ≤ 3.
M2#maths-u03-17-q2@2: Which point lies in the region y < 2x, y > 1? | (2, 3) | (1, 3) | (0, 0) | (3, 0) | (1, 2) | For (2, 3): 3 < 4 and 3 > 1, so both hold.

## Absolute Value Equations
S: The absolute value (modulus) |x| is the distance of x from zero, so it's never negative. Equations and inequalities with absolute values usually split into two cases.
O: Solve equations and inequalities involving |x|
O: Sketch graphs of y = |f(x)|
T: Modulus | The absolute value |x|: x if x ≥ 0 and −x if x < 0
T: Case analysis | Splitting a problem into separate cases, such as the inside of a modulus being positive or negative
H: Equations
- |x − 3| = 5 means x − 3 = 5 or x − 3 = −5, so x = 8 or x = −2.
- |2x + 1| = |x − 4|: square both sides or use cases: 2x + 1 = x − 4 gives x = −5, and 2x + 1 = −(x − 4) gives x = 1.
- Always check: some case solutions don't satisfy the original (for example in |x| = 2x − 3).
H: Inequalities and graphs
- |x − a| < b means a − b < x < a + b (within b of a); |x − a| > b means x < a − b or x > a + b.
- y = |f(x)| reflects any part of y = f(x) below the x-axis upwards: a V shape for |x|.
- Graphs show solutions: intersections of y = |2x − 1| and y = 3.
X: Solve |x| = 2x − 3.
> Case x ≥ 0: x = 2x − 3, so x = 3 (valid, since 3 ≥ 0)
> Case x < 0: −x = 2x − 3, so x = 1 (invalid, since 1 isn't negative)
> Check x = 3: |3| = 3 and 2(3) − 3 = 3 ✓. The only solution is x = 3
- |x| = −3 has no solution, because a modulus is never negative.
- |a × b| = |a| × |b|, but |a + b| ≤ |a| + |b| (the triangle inequality).
K: Split into cases (or square both sides), then check every solution in the original equation.
!: Forgetting to check case solutions, keeping invalid ones.
Q: Solve |x + 2| = 7. | x = 5 or x = −9.
Q: Write |x − 5| < 2 without a modulus. | 3 < x < 7.
SUM: |x| is distance from zero.
SUM: Modulus problems split into cases.
SRC: Department for Education, Mathematics AS and A level subject content: algebra and functions | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Gelfand IM, Shen A, Algebra (Birkhäuser 1993) | textbook | 1993 | https://link.springer.com/
M1#maths-u03-18-q1@1: Solve |2x| = 10. | x = 5 or x = −5 | x = 5 | x = 20 | x = ±20 | x = −5 | The modulus is 10 when 2x = 10 or 2x = −10, giving x = 5 or x = −5.
M2#maths-u03-18-q2@2: Which describes |x − 1| ≥ 4? | x ≤ −3 or x ≥ 5 | −3 ≤ x ≤ 5 | x ≥ 5 | x ≥ 3 | x ≤ −5 or x ≥ 3 | The distance from 1 is at least 4: x ≤ 1 − 4 or x ≥ 1 + 4.

## Rational Equations
S: A rational equation contains algebraic fractions, like 2/x + 3/(x + 1) = 1. Clearing the denominators turns it into a polynomial equation, but any solution that makes a denominator zero must be rejected.
O: Solve equations involving algebraic fractions
O: Identify and reject extraneous solutions
T: Rational expression | A quotient of two polynomials
T: Extraneous solution | A value produced by the algebra that doesn't satisfy the original equation
H: Method
- Note the excluded values (where a denominator is zero) first.
- Multiply every term by the lowest common denominator.
- Solve the resulting polynomial equation.
- Check each solution against the excluded values and in the original equation.
H: Example of an extraneous solution
- x/(x − 2) = 2/(x − 2): multiplying by (x − 2) gives x = 2, but x = 2 makes the denominators zero, so there's no solution.
- Rational equations appear in rates of work ("one pipe fills a tank in 3 hours and another in 6"): 1/3 + 1/6 = 1/t gives t = 2 hours together.
X: Solve 3/(x − 1) − 2/(x + 2) = 1.
> Excluded: x ≠ 1, x ≠ −2. Multiply by (x − 1)(x + 2): 3(x + 2) − 2(x − 1) = (x − 1)(x + 2)
> x + 8 = x^{2} + x − 2, so x^{2} = 10
> x = ±√10 (neither is excluded, so both are solutions)
- Cross-multiplying is a shortcut when there's one fraction on each side: 2/(x + 1) = 3/x gives 2x = 3x + 3, so x = −3.
K: Note excluded values, multiply by the common denominator, solve, and reject extraneous solutions.
!: Keeping a solution that makes a denominator zero.
Q: What is an extraneous solution? | A solution of the cleared equation that doesn't satisfy the original.
Q: Two machines take 4 and 12 hours alone. How long together? | 3 hours (1/4 + 1/12 = 1/3).
SUM: Clear denominators to solve rational equations.
SUM: Always check against excluded values.
SRC: Department for Education, Mathematics AS and A level subject content: algebra and functions | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Gelfand IM, Shen A, Algebra (Birkhäuser 1993) | textbook | 1993 | https://link.springer.com/
NUM1#maths-u03-19-q1@1: Solve 6/x + 1 = 4. | 2 | 0 |  | 6/x = 3, so x = 2 (which isn't excluded).
M2#maths-u03-19-q2@2: How many solutions does (x^{2} − 9)/(x − 3) = 6 have? | None | One | Two | Three | Infinitely many | It simplifies to x + 3 = 6, so x = 3, but x = 3 is excluded: no solutions.
M3#maths-u03-19-q3@2: Solve 1/x + 1/(x + 1) = 5/6. | x = 2 or x = −3/5 | x = 2 only | x = 3 | x = −2 or x = 3/5 | x = 6 | 6(x + 1) + 6x = 5x(x + 1) gives 5x^{2} − 7x − 6 = 0, so (5x + 3)(x − 2) = 0.


## Surds
S: A surd is a root that can't be simplified to a rational number, such as √2 or √12. Leaving answers in surd form keeps them exact, which matters in geometry, trigonometry and exact A level answers.
O: Simplify surds and calculate with them
O: Rationalise denominators
T: Surd | An irrational root, such as √3 or ∛5, left in root form to keep it exact
T: Rationalise the denominator | Rewrite a fraction so its denominator has no surds
H: Rules
E: √(ab) = √a × √b; √(a/b) = √a / √b; √a × √a = a
- Simplify by taking out square factors: √72 = √36 × √2 = 6√2.
- Add only like surds: 3√2 + 5√2 = 8√2; √2 + √3 can't be combined. Simplify first: √50 + √8 = 5√2 + 2√2 = 7√2.
- Expand brackets as usual: (3 + √2)(3 − √2) = 9 − 2 = 7.
H: Rationalising
- Single surd: multiply top and bottom by it: 6/√3 = 6√3/3 = 2√3.
- a + √b in the denominator: multiply by the conjugate a − √b, using the difference of two squares: 4/(3 + √5) = 4(3 − √5)/(9 − 5) = 3 − √5.
- Exact values: sin 60° = √3/2 and a square of side 1 has diagonal √2.
X: Simplify (√12 + √27)/√3.
> √12 = 2√3 and √27 = 3√3, so the top is 5√3
> 5√3/√3 = 5
> Answer: 5
- Surds appear in exact trigonometric values, Pythagoras' theorem and quadratic formula answers.
- A rational number times a surd is still irrational (unless the rational number is 0).
- Like surds behave like like terms: 4√3 − √3 = 3√3.
K: Take out square factors, combine only like surds, and rationalise with the conjugate.
!: Writing √(a + b) = √a + √b: √(9 + 16) = 5, not 7.
Q: Simplify √48. | 4√3.
Q: Rationalise 1/(√5 − 2). | √5 + 2 (multiply by the conjugate √5 + 2; the denominator becomes 5 − 4 = 1).
SUM: Surds keep answers exact.
SUM: Conjugates rationalise denominators.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: Department for Education, Mathematics AS and A level subject content: algebra and functions | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
M1#maths-u03-20-q1@1: Simplify √75. | 5√3 | 3√5 | 25√3 | 15√5 | 75√1 | 75 = 25 × 3 and 25 is a square number with √25 = 5, so √75 = 5√3.
M2#maths-u03-20-q2@2: Rationalise 10/√5. | 2√5 | 10√5 | 5√2 | 2 | √50/5 | Multiply top and bottom by √5: 10√5/5, which simplifies to 2√5.
M3#maths-u03-20-q3@2: Expand (2 + √3)^{2}. | 7 + 4√3 | 7 | 4 + 3 | 7 + 2√3 | 13 | 4 + 4√3 + 3 = 7 + 4√3: the middle term is 2 × 2 × √3.

## Logarithms
S: A logarithm answers the question "what power?": log_{2} 8 = 3 because 2^{3} = 8. Logarithms turn multiplication into addition and powers into multiplication, which is why they solve exponential equations and compress huge ranges of values.
O: Convert between exponential and logarithmic forms
O: Use the laws of logarithms
T: Logarithm | log_{a} x is the power to which a must be raised to give x
T: Natural logarithm | ln x = log_{e} x, the logarithm to base e ≈ 2.718
H: Definition
- y = a^{x} ⇔ x = log_{a} y (a > 0, a ≠ 1, y > 0).
- log_{10} 1000 = 3; log_{5} 1 = 0 (because 5^{0} = 1); log_{a} a = 1; log_{4} 2 = ½.
- Logs of zero or negative numbers aren't defined (for real numbers).
H: The laws
E: log_{a} (xy) = log_{a} x + log_{a} y; log_{a} (x/y) = log_{a} x − log_{a} y; log_{a} (x^{k}) = k log_{a} x
- Change of base: log_{a} x = log x / log a (any base): log_{3} 20 = ln 20/ln 3 ≈ 2.73.
- There's no law for log(x + y).
- Logarithmic scales: pH, decibels and the Richter scale each add 1 for every tenfold change.
X: Write 2 log 5 + log 4 − log 2 as a single logarithm and evaluate it (base 10).
> 2 log 5 = log 25
> log 25 + log 4 − log 2 = log (25 × 4 ÷ 2) = log 50
> log_{10} 50 ≈ 1.70
- log_{a} a^{x} = x and a^{log_{a} x} = x: the two operations undo each other.
- On a calculator, log usually means base 10 and ln means base e.
P: **Investigate with the lab.** Choose Logarithms and rewrite each equation in exponential form before solving.
IX: practice
P: **Investigate with the lab.** Set the base to 10 and type 1000 into the solver: the inverse graph turns "10 to what power is 1000?" into a point you can read. Try other bases.
IX: explog
K: A log is a power; add logs to multiply, subtract to divide, and bring powers to the front.
!: Writing log(x + y) = log x + log y.
Q: What is log_{2} 32? | 5.
Q: Write 3 ln x − ln y as a single logarithm. | ln(x^{3}/y).
SUM: Logarithms are inverse to powers.
SUM: The laws turn products into sums.
SRC: Department for Education, Mathematics AS and A level subject content: exponentials and logarithms | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Courant R, Robbins H, What Is Mathematics? (2nd edn, Oxford University Press 1996) | textbook | 1996 | https://global.oup.com/
NUM1#maths-u03-21-q1@1: Evaluate log_{3} 81 + log_{2} (1/4). | 2 | 0 |  | log_{3} 81 = 4 and log_{2} (1/4) = −2, so the total is 2.
M1#maths-u03-21-q2@1: Which statement is equivalent to log_{5} 125 = 3? | 5^{3} = 125 | 3^{5} = 125 | 125^{3} = 5 | 5 × 3 = 125 | 125^{5} = 3 | The logarithm is the power: 5 raised to 3 gives 125.
M2#maths-u03-21-q3@2: Which equals log 12? | log 3 + log 4 | log 3 × log 4 | log 6 + log 6 | 12 log 1 | log 24 − log 12 | The log of a product is the sum of the logs: log(3 × 4) = log 3 + log 4.
NUM1#maths-u03-21-q4@1: Solve log₂ x = 5. | 32 | 0 |  | log₂ x = 5 means x = 2^{5} = 32.

## Exponential Equations
S: In an exponential equation the unknown is in a power, like 3^{x} = 20. Taking logarithms brings the unknown down, and equations in disguise (like 4^{x} − 2^{x+1} = 8) become quadratics.
O: Solve exponential equations using logarithms
O: Solve exponential equations that reduce to quadratics
T: Exponential equation | An equation with the unknown in an exponent
T: Exponential function | A function such as f(x) = a^{x} or e^{kx}, where the variable is the power
H: Using logarithms
- Same base: 2^{x+1} = 2^{5} gives x + 1 = 5, so x = 4. Write numbers as powers of a common base where possible: 9^{x} = 27 → 3^{2x} = 3^{3} → x = 3/2.
- Otherwise take logs of both sides: 3^{x} = 20 → x ln 3 = ln 20 → x = ln 20/ln 3 ≈ 2.73.
- e^{2x} = 7 → 2x = ln 7 → x = ½ ln 7 ≈ 0.973.
H: Hidden quadratics
- 4^{x} = (2^{x})^{2}: let u = 2^{x}. 4^{x} − 2^{x+1} − 8 = 0 becomes u^{2} − 2u − 8 = 0, so u = 4 or −2.
- 2^{x} = 4 gives x = 2; 2^{x} = −2 has no solution, because 2^{x} > 0 for every real x.
- Applications: doubling times, half-lives, compound interest (when will £1,000 at 4% reach £1,500?).
X: £1,000 is invested at 4% compound interest. After how many whole years does it first exceed £1,500?
> 1000 × 1.04^{n} > 1500, so 1.04^{n} > 1.5
> n > ln 1.5/ln 1.04 = 10.34
> It first exceeds £1,500 after 11 years
P: **Investigate with the lab.** Find the base that doubles every 2 units, then the base that halves every unit. Compare your bases with √2 and 0.5.
IX: explog
K: Match bases where possible, otherwise take logs; substitute u = a^{x} for hidden quadratics and reject u ≤ 0.
!: Accepting a solution of a^{x} = a negative number: exponentials are always positive.
Q: Solve 5^{x} = 125. | x = 3.
Q: Why does 2^{x} = −2 have no real solution? | 2^{x} is positive for every real x.
SUM: Logs bring exponents down.
SUM: Substitution turns some exponential equations into quadratics.
SRC: Department for Education, Mathematics AS and A level subject content: exponentials and logarithms | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Courant R, Robbins H, What Is Mathematics? (2nd edn, Oxford University Press 1996) | textbook | 1996 | https://global.oup.com/
NUM1#maths-u03-22-q1@1: Solve 2^{x} = 50, to 3 significant figures. | 5.64 | 0.01 |  | x = ln 50/ln 2 ≈ 5.644, which is 5.64 to 3 significant figures.
M1#maths-u03-22-q2@1: Solve 8^{x} = 32. | x = 5/3 | x = 4 | x = 1/4 | x = 3/5 | x = 2 | Write both as powers of 2: 2^{3x} = 2^{5}, so 3x = 5 and x = 5/3.
M3#maths-u03-22-q3@2: Solve 9^{x} − 4 × 3^{x} + 3 = 0. | x = 0 or x = 1 | x = 1 or x = 3 | x = 0 only | x = 3 only | x = −1 or x = 1 | With u = 3^{x}: u^{2} − 4u + 3 = 0, so u = 1 or 3, giving x = 0 or 1.

## Logarithmic Equations
S: Logarithmic equations have the unknown inside a logarithm. Combine the logs into one using the laws, convert to exponential form, and check that every solution keeps the arguments of the logs positive.
O: Solve equations involving logarithms
O: Check solutions against the domain of the logarithm
T: Argument | The input of a function: in log(x − 2), the argument is x − 2, which must be positive
T: Domain | The set of allowed inputs
H: Method
- Use the laws to collect logs: log_{2} x + log_{2} (x − 2) = 3 → log_{2} (x(x − 2)) = 3.
- Convert to exponential form: x(x − 2) = 2^{3} = 8, so x^{2} − 2x − 8 = 0, so x = 4 or −2.
- Check: x = −2 makes log_{2} x undefined, so reject it. The solution is x = 4.
H: Equal logs
- log x = log y (same base) means x = y: ln(2x + 1) = ln(x + 5) gives x = 4.
- ln x = 2 means x = e^{2} ≈ 7.39.
- Logs with different bases: change base first.
X: Solve log_{3} (x + 6) − log_{3} x = 2.
> Combine: log_{3} ((x + 6)/x) = 2
> (x + 6)/x = 3^{2} = 9, so x + 6 = 9x
> 8x = 6, so x = 3/4 (check: x + 6 > 0 and x > 0 ✓)
- Equations with logs on one side only: log_{3}(2x + 1) = 4 gives 2x + 1 = 81, so x = 40.
- Different bases: log_{4} x = log_{2} 3 → log_{2} x/2 = log_{2} 3 → x = 9.
- Natural logs work the same way: ln(x + 1) = 2 gives x = e^{2} − 1 ≈ 6.39.
P: **Investigate with the lab.** Solve bˣ = 8 for three different bases and check each answer is log 8 ÷ log b. Then switch to the log scale and see why.
IX: explog
K: Combine into one log, convert to exponential form, solve, and reject values that make any argument non-positive.
!: Keeping a solution that makes the argument of a logarithm zero or negative.
Q: Solve ln x = 3. | x = e^{3} ≈ 20.1.
Q: Why reject x = −2 in log_{2} x + log_{2}(x − 2) = 3? | log_{2}(−2) isn't defined.
SUM: Combine logs, then exponentiate.
SUM: Check that arguments are positive.
SRC: Department for Education, Mathematics AS and A level subject content: exponentials and logarithms | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Courant R, Robbins H, What Is Mathematics? (2nd edn, Oxford University Press 1996) | textbook | 1996 | https://global.oup.com/
NUM1#maths-u03-23-q1@1: Solve log_{2} (3x − 1) = 5. | 11 | 0 |  | 3x − 1 = 2^{5} = 32, so 3x = 33 and x = 11.
M1#maths-u03-23-q2@1: Solve log_{10} x = −2. | x = 0.01 | x = −100 | x = 100 | x = −0.01 | No solution | Convert to exponential form: x = 10^{−2} = 0.01, which is positive, so it's valid.
M2#maths-u03-23-q3@2: Solve log x + log (x − 3) = log 10. | x = 5 | x = −2 or x = 5 | x = −2 | x = 13 | x = 10 | x(x − 3) = 10 gives x = 5 or −2; x = −2 makes log x undefined.

## Polynomials
S: A polynomial is a sum of terms each made of a number times a whole-number power of the variable, like 3x^{4} − 2x + 7. Polynomials are the simplest functions, and much of algebra is about understanding them.
O: Identify the degree, leading coefficient and constant term of a polynomial
O: Describe the graph shapes of polynomials
T: Polynomial | An expression a_{n}x^{n} + … + a_{1}x + a_{0} with whole-number powers
T: Leading coefficient | The coefficient of the highest power, a_{n}
H: Vocabulary
- Degree 1: linear; 2: quadratic; 3: cubic; 4: quartic; 5: quintic.
- In 3x^{4} − 2x + 7: degree 4, leading coefficient 3, constant term 7.
- Not polynomials: 1/x (negative power), √x (fractional power), 2^{x} (variable in the power).
H: Graphs
- **End behaviour** depends on the degree and the sign of the leading coefficient: even degree and positive leading coefficient means both ends up; odd degree and positive means down on the left, up on the right.
- A degree n polynomial has at most n roots and at most n − 1 turning points.
- The y-intercept is the constant term.
- Polynomials are continuous and smooth: no breaks or corners.
X: Describe the graph of y = −2x^{3} + 5x^{2} − x + 4.
> Degree 3 with leading coefficient −2: up on the left, down on the right
> At most 3 roots and at most 2 turning points
> It crosses the y-axis at (0, 4)
K: Degree and leading coefficient set the end behaviour; the constant term is the y-intercept; at most n roots.
!: Calling 3/x^{2} + 1 a polynomial: negative powers aren't allowed.
Q: What is the degree of 5 − x^{3} + 2x^{6}? | 6.
Q: How many turning points can a quartic have at most? | 3.
SUM: Polynomials use whole-number powers.
SUM: Degree governs roots, turning points and end behaviour.
SRC: Department for Education, Mathematics AS and A level subject content: algebra and functions | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Gelfand IM, Shen A, Algebra (Birkhäuser 1993) | textbook | 1993 | https://link.springer.com/
M1#maths-u03-24-q1@1: Which is a polynomial? | 4x^{3} − x + 2 | 2/x + 1 | √x + 3 | 3^{x} | x^{−2} | Every power of x is a whole number in 4x^{3} − x + 2.
M2#maths-u03-24-q2@2: What is the end behaviour of y = −x^{4} + 3x? | Both ends go down | Both ends go up | Down on the left, up on the right | Up on the left, down on the right | It levels off | Even degree with a negative leading coefficient: both ends go down.

## Polynomial Algebra
S: Polynomial algebra is adding, subtracting and multiplying polynomials, and comparing their coefficients. Equating coefficients is a powerful tool for finding unknown constants.
O: Add, subtract and multiply polynomials
O: Use equating coefficients to find unknowns in identities
T: Equating coefficients | If two polynomials are identical, their coefficients of each power are equal
T: Like powers | Terms with the same power of the variable
H: Operations
- Add or subtract like powers: (3x^{2} + 2x − 1) − (x^{2} − 5x + 4) = 2x^{2} + 7x − 5.
- Multiply every term by every term: (x^{2} + 2x − 1)(x − 3) = x^{3} − x^{2} − 7x + 3.
- The degree of a product is the sum of the degrees.
H: Equating coefficients
- If ax^{2} + bx + c ≡ 2x^{2} − 7x + 4 for all x, then a = 2, b = −7, c = 4.
- Find A, B and C if (x + 2)(Ax + B) + C ≡ 3x^{2} + 5x + 1: expand to Ax^{2} + (2A + B)x + 2B + C; so A = 3, 2A + B = 5 gives B = −1, and 2B + C = 1 gives C = 3.
- This is the technique behind partial fractions and polynomial division.
X: Find the coefficient of x^{2} in (2x^{2} − x + 3)(x^{2} + 4x − 2).
> x^{2} terms come from 2x^{2} × (−2), (−x) × 4x and 3 × x^{2}
> −4x^{2} − 4x^{2} + 3x^{2}
> Coefficient: −5
- The constant term of a product is the product of the constant terms.
- Evaluating at x = 1 gives the sum of the coefficients: (x + 2)^{3} at x = 1 is 27.
K: Combine like powers; multiply every term; compare coefficients to find unknowns in identities.
!: Missing one of the products that contributes to a given power.
Q: What is the degree of (x^{3} + 1)(x^{2} − x)? | 5.
Q: If (x + 1)(x + b) ≡ x^{2} + 5x + 4, what is b? | 4.
SUM: Polynomials add and multiply term by term.
SUM: Identical polynomials have equal coefficients.
SRC: Department for Education, Mathematics AS and A level subject content: algebra and functions | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Gelfand IM, Shen A, Algebra (Birkhäuser 1993) | textbook | 1993 | https://link.springer.com/
NUM1#maths-u03-25-q1@1: Find the coefficient of x in (3x^{2} − 2x + 5)(x − 4). | 13 | 0 |  | The x terms are −2x × (−4) = 8x and 5 × x = 5x, giving 13x.
M2#maths-u03-25-q2@2: If 2x^{2} + 9x + 7 ≡ (2x + a)(x + b), what are a and b? | a = 7, b = 1 | a = 1, b = 7 | a = 2, b = 7 | a = 9, b = 7 | a = 7, b = 2 | Expanding (2x + 7)(x + 1) gives 2x^{2} + 2x + 7x + 7 = 2x^{2} + 9x + 7.
M3#maths-u03-25-q3@2: What is the degree of (x^{4} − 1)(x^{3} + x) − x^{7}? | 5 | 7 | 4 | 12 | 3 | The x^{7} terms cancel, leaving x^{5} − x^{3} − x: degree 5.

## Polynomial Division
S: Polynomials can be divided like numbers, giving a quotient and a remainder. Division finds the other factors once one is known and is essential for solving cubics and simplifying rational expressions.
O: Divide a polynomial by a linear expression using long division or synthetic division
O: Interpret the quotient and remainder
T: Quotient | The result of the division (the polynomial part)
T: Remainder | What's left over: for division by a linear expression, a constant
H: Long division
- Divide the leading term, multiply back, subtract, bring down, and repeat, as in long division of numbers.
- (2x^{3} − 3x^{2} − 11x + 6) ÷ (x − 3): 2x^{2}, then 3x, then −2, remainder 0. So 2x^{3} − 3x^{2} − 11x + 6 = (x − 3)(2x^{2} + 3x − 2) = (x − 3)(2x − 1)(x + 2).
- Include zero coefficients for missing powers: write x^{3} − 8 as x^{3} + 0x^{2} + 0x − 8.
H: Other methods
- **Equating coefficients**: x^{3} − 7x + 6 ≡ (x − 1)(ax^{2} + bx + c) gives a = 1, c = −6, b = 1.
- **Synthetic division** (for x − a): a shortcut using only coefficients.
- In general, p(x) = d(x)q(x) + r(x), where the remainder's degree is less than the divisor's.
X: Divide x^{3} + 2x^{2} − 5x − 6 by (x + 1).
> x^{3} ÷ x = x^{2}; x^{2}(x + 1) = x^{3} + x^{2}; subtract: x^{2} − 5x
> x^{2} ÷ x = x; x(x + 1) = x^{2} + x; subtract: −6x − 6
> −6x ÷ x = −6; −6(x + 1) = −6x − 6; subtract: 0. Quotient x^{2} + x − 6 = (x + 3)(x − 2), remainder 0
K: Divide leading terms, multiply back, subtract and repeat; include zero coefficients for missing powers.
!: Leaving out missing powers, which misaligns the columns.
Q: What is the remainder when x^{2} + 1 is divided by x − 1? | 2.
Q: How do you handle x^{3} − 8 in long division? | Write it as x^{3} + 0x^{2} + 0x − 8.
SUM: Polynomial division works like number division.
SUM: Dividing by a known factor leaves a simpler polynomial.
SRC: Department for Education, Mathematics AS and A level subject content: algebra and functions | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Gelfand IM, Shen A, Algebra (Birkhäuser 1993) | textbook | 1993 | https://link.springer.com/
M1#maths-u03-26-q1@1: What is (x^{2} + 5x + 6) ÷ (x + 2)? | x + 3 | x + 2 | x − 3 | x + 6 | x^{2} + 3 | x^{2} + 5x + 6 factorises as (x + 2)(x + 3), so dividing by (x + 2) leaves x + 3.
M2#maths-u03-26-q2@2: What is the quotient when x^{3} − 1 is divided by x − 1? | x^{2} + x + 1 | x^{2} − 1 | x^{2} − x + 1 | x^{2} + 1 | x + 1 | (x − 1)(x^{2} + x + 1) = x^{3} − 1 (difference of two cubes).

## Remainder Theorem
S: The remainder theorem gives the remainder of dividing a polynomial by (x − a) without doing the division: it's simply f(a). It's a quick, powerful check.
O: Use the remainder theorem to find remainders
O: Find unknown coefficients from given remainders
T: Remainder theorem | The remainder when f(x) is divided by (x − a) is f(a)
T: Divisor | The expression you divide by
H: Why it works
- f(x) = (x − a)q(x) + r. Put x = a: f(a) = 0 × q(a) + r = r.
- For (ax − b), the remainder is f(b/a).
- f(x) = x^{3} − 2x + 5 divided by (x + 2): remainder f(−2) = −8 + 4 + 5 = 1.
H: Finding unknowns
- If x^{3} + kx^{2} − 4 leaves remainder 5 when divided by (x − 1): 1 + k − 4 = 5, so k = 8.
- Two unknowns need two conditions: solve the resulting simultaneous equations.
X: When f(x) = 2x^{3} + ax^{2} + bx − 3 is divided by (x − 1) the remainder is 4, and by (x + 1) the remainder is −6. Find a and b.
> f(1) = 2 + a + b − 3 = 4, so a + b = 5
> f(−1) = −2 + a − b − 3 = −6, so a − b = −1
> Adding: 2a = 4, so a = 2 and b = 3
- A quick check: the remainder on dividing by (x − 1) is the sum of the coefficients.
- The remainder on dividing by a quadratic is linear (ax + b), found from two substitutions.
- If the remainder is zero, the divisor is a factor: this is the factor theorem.
- It's much faster than long division when only the remainder is needed.
K: The remainder on dividing by (x − a) is f(a); for (ax − b) use f(b/a).
!: Substituting x = a when dividing by (x + a): use x = −a.
Q: What is the remainder when x^{4} − 3 is divided by (x − 2)? | 13.
Q: What do you substitute to find the remainder on division by (2x − 1)? | x = 1/2.
SUM: The remainder is f(a).
SUM: Remainder conditions give equations for unknowns.
SRC: Gelfand IM, Shen A, Algebra (Birkhäuser 1993) | textbook | 1993 | https://link.springer.com/
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
NUM1#maths-u03-27-q1@1: Find the remainder when x^{3} − 4x^{2} + 2x + 7 is divided by (x − 3). | 4 | 0 |  | f(3) = 27 − 36 + 6 + 7 = 4.
M1#maths-u03-27-q2@1: What is the remainder when x^{2} + 3x − 1 is divided by (x + 1)? | −3 | 3 | 1 | −1 | 5 | By the remainder theorem, substitute x = −1: f(−1) = 1 − 3 − 1 = −3.
M2#maths-u03-27-q3@2: x^{3} + kx + 2 leaves remainder 0 when divided by (x − 1). What is k? | −3 | 3 | −1 | 0 | 2 | A zero remainder means f(1) = 0: 1 + k + 2 = 0, so k = −3.

## Factor Theorem
S: The factor theorem is the remainder theorem with remainder zero: (x − a) is a factor of f(x) exactly when f(a) = 0. It's how we find the first factor of a cubic or quartic.
O: Use the factor theorem to test and find factors
O: Factorise cubics completely
T: Factor theorem | (x − a) is a factor of f(x) if and only if f(a) = 0
T: Rational root test | Any rational root p/q of a polynomial with integer coefficients has p dividing the constant term and q dividing the leading coefficient
H: Testing for factors
- (x − 2) is a factor of x^{3} − 3x^{2} + 4 because f(2) = 8 − 12 + 4 = 0.
- Candidates for integer roots divide the constant term: for x^{3} − 7x − 6, try ±1, ±2, ±3, ±6.
- (2x − 1) is a factor if f(1/2) = 0.
H: Factorising completely
- Find one factor, divide (or equate coefficients) to get a quadratic, then factorise or solve that.
- x^{3} − 7x − 6: f(−1) = −1 + 7 − 6 = 0, so (x + 1) is a factor; dividing gives x^{2} − x − 6 = (x − 3)(x + 2). So x^{3} − 7x − 6 = (x + 1)(x − 3)(x + 2).
X: Show that (x − 2) is a factor of 2x^{3} − 5x^{2} − x + 6 and factorise completely.
> f(2) = 16 − 20 − 2 + 6 = 0, so (x − 2) is a factor
> Dividing: 2x^{3} − 5x^{2} − x + 6 = (x − 2)(2x^{2} − x − 3)
> 2x^{2} − x − 3 = (2x − 3)(x + 1), so the answer is (x − 2)(2x − 3)(x + 1)
- Graphs help: a sketch or calculator plot suggests which values to test first.
- Fractional roots: for 2x^{3} + … try ±1/2 and ±3/2 too.
K: f(a) = 0 ⇔ (x − a) is a factor; try divisors of the constant; then divide and factorise the quadratic.
!: Testing only positive values: roots are often negative.
Q: Is (x + 3) a factor of x^{2} + x − 6? | Yes: f(−3) = 9 − 3 − 6 = 0.
Q: Which values should you try first as roots of x^{3} + 2x^{2} − 5x − 6? | Divisors of 6: ±1, ±2, ±3, ±6.
SUM: f(a) = 0 means (x − a) is a factor.
SUM: One factor reduces a cubic to a quadratic.
SRC: Department for Education, Mathematics AS and A level subject content: algebra and functions | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Gelfand IM, Shen A, Algebra (Birkhäuser 1993) | textbook | 1993 | https://link.springer.com/
M1#maths-u03-28-q1@1: Which is a factor of x^{3} − 4x^{2} + x + 6? | x − 2 | x + 2 | x − 1 | x + 3 | x − 6 | By the factor theorem, f(2) = 8 − 16 + 2 + 6 = 0, so (x − 2) is a factor.
M2#maths-u03-28-q2@2: (x − 3) is a factor of x^{3} − 2x^{2} + kx − 6. What is k? | −1 | 1 | −3 | 3 | 6 | f(3) = 27 − 18 + 3k − 6 = 0 gives 3k = −3, so k = −1.
M3#maths-u03-28-q3@2: Factorise x^{3} + x^{2} − 10x + 8 completely. | (x − 1)(x − 2)(x + 4) | (x + 1)(x + 2)(x − 4) | (x − 1)(x + 2)(x − 4) | (x − 2)^{2}(x + 2) | (x − 1)(x^{2} + 2x − 8) | f(1) = 0, and x^{2} + 2x − 8 = (x − 2)(x + 4).

## Roots of Polynomials
S: The roots of a polynomial are the values that make it zero. Their number, nature and position tell you a lot about the polynomial and its graph, and every polynomial's roots exist in the complex numbers.
O: Relate roots, factors and graphs of polynomials
O: Describe repeated and complex roots
T: Multiplicity | How many times a root is repeated: in (x − 2)^{3}, the root 2 has multiplicity 3
T: Fundamental theorem of algebra | Every polynomial of degree n ≥ 1 has exactly n complex roots, counted with multiplicity
H: Roots and factors
- If the roots of a cubic are 1, −2 and 4, then f(x) = k(x − 1)(x + 2)(x − 4) for some constant k.
- A single root: the graph crosses the axis. Double root: touches and turns. Triple root: crosses with a flat point (inflection).
H: Complex roots
- x^{2} + 1 = 0 has no real roots but two complex ones, ±i (later in this school).
- For polynomials with real coefficients, complex roots come in conjugate pairs: if 2 + 3i is a root, so is 2 − 3i.
- So a real cubic always has at least one real root.
- Sign changes locate roots: if f(1) < 0 and f(2) > 0 and f is continuous, there's a root between 1 and 2.
X: Find the cubic with roots −1, 2 and 3 that passes through (0, 12).
> f(x) = k(x + 1)(x − 2)(x − 3)
> f(0) = k(1)(−2)(−3) = 6k = 12, so k = 2
> f(x) = 2(x + 1)(x − 2)(x − 3) = 2x^{3} − 8x^{2} + 2x + 12
P: **Investigate with the lab.** Do the cubic-roots challenge. Move b and c and watch the x-intercepts follow them: each factor (x − r) puts a root at r.
IX: grapher
K: Roots give factors; multiplicity shapes the graph; complex roots of real polynomials come in conjugate pairs.
!: Forgetting the constant k when building a polynomial from its roots.
Q: How many complex roots does a degree 5 polynomial have? | Exactly 5, counted with multiplicity.
Q: If 1 − i is a root of a real polynomial, what else must be a root? | 1 + i.
SUM: Roots correspond to linear factors.
SUM: Every polynomial has its full set of roots in the complex numbers.
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
SRC: Stewart I, Galois Theory (5th edn, CRC Press 2022) | textbook | 2022 | https://www.routledge.com/
M1#maths-u03-29-q1@1: What happens to the graph of y = (x − 3)^{2}(x + 1) at x = 3? | It touches the x-axis and turns | It crosses the x-axis | It has an asymptote | It has a gap | It crosses with a flat point | A double root means the graph touches the axis there.
M2#maths-u03-29-q2@2: A real quartic has roots 2i and 1 (single). How many real roots does it have in total? | 2 | 1 | 3 | 4 | 0 | 2i and −2i account for two roots, leaving two real ones: 1 and one more.
M2#maths-u03-29-q3@2: Where does y = (x − 2)(x + 3)(x + 1) cross the x-axis? | At x = 2, −3 and −1 | At x = −2, 3 and 1 | At x = 2, 3 and 1 | Only at x = 2 | At x = 6 | Each linear factor (x − r) is zero at x = r.

## Vieta's Formulas
S: Vieta's formulas link the roots of a polynomial to its coefficients: for example, the roots of x^{2} + bx + c add to −b and multiply to c. They let you work with roots without finding them.
O: State Vieta's formulas for quadratics and cubics
O: Use them to find expressions in the roots and to form new equations
T: Sum of roots | For ax^{2} + bx + c = 0, α + β = −b/a
T: Product of roots | For ax^{2} + bx + c = 0, αβ = c/a
H: Quadratics and cubics
E: ax^{2} + bx + c: α + β = −b/a, αβ = c/a
E: ax^{3} + bx^{2} + cx + d: α + β + γ = −b/a, αβ + βγ + γα = c/a, αβγ = −d/a
- Why: a(x − α)(x − β) = ax^{2} − a(α + β)x + aαβ; compare coefficients.
H: Using them
- α^{2} + β^{2} = (α + β)^{2} − 2αβ.
- 1/α + 1/β = (α + β)/(αβ).
- To form an equation with roots 2α and 2β, use the new sum and product: x^{2} − (sum)x + (product) = 0.
X: The roots of 2x^{2} − 6x + 1 = 0 are α and β. Find α^{2} + β^{2}.
> α + β = 6/2 = 3 and αβ = 1/2
> α^{2} + β^{2} = (α + β)^{2} − 2αβ = 9 − 1
> = 8
- The sum and product don't depend on the roots being real: x^{2} + 2x + 5 = 0 has complex roots with sum −2 and product 5.
- They generalise: for degree n, the sum of the roots is −a_{n−1}/a_{n}.
- Check: the roots of x^{2} − 5x + 6 are 2 and 3, with sum 5 and product 6.
- For a cubic with roots α, β, γ: α^{2} + β^{2} + γ^{2} = (α + β + γ)^{2} − 2(αβ + βγ + γα).
K: Sum of roots −b/a, product c/a (quadratics); rewrite expressions in terms of sums and products.
!: Forgetting the minus sign in the sum of roots.
Q: For x^{2} − 7x + 10 = 0, what are the sum and product of the roots? | Sum 7, product 10.
Q: Write α^{2} + β^{2} in terms of α + β and αβ. | (α + β)^{2} − 2αβ.
SUM: Coefficients encode symmetric facts about roots.
SUM: Expressions in the roots can be found without solving.
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
SRC: Stewart I, Galois Theory (5th edn, CRC Press 2022) | textbook | 2022 | https://www.routledge.com/
NUM1#maths-u03-30-q1@1: The roots of x^{2} + 5x − 3 = 0 are α and β. Find 1/α + 1/β. | 1.6667 | 0.001 |  | (α + β)/(αβ) = (−5)/(−3) = 5/3 ≈ 1.667.
M1#maths-u03-30-q2@1: What is the product of the roots of 3x^{2} − 4x − 12 = 0? | −4 | 4 | 4/3 | −12 | 12 | By Vieta's formulas the product of the roots is c/a = −12/3 = −4.
M3#maths-u03-30-q3@2: The roots of x^{2} − 3x + 1 = 0 are α and β. Which equation has roots α + 1 and β + 1? | x^{2} − 5x + 5 = 0 | x^{2} − 3x + 2 = 0 | x^{2} − 4x + 2 = 0 | x^{2} − 5x + 2 = 0 | x^{2} + 5x + 5 = 0 | New sum = 3 + 2 = 5; new product = αβ + (α + β) + 1 = 1 + 3 + 1 = 5.

## Symmetric Polynomials
S: A symmetric polynomial is unchanged when its variables are swapped, like x + y or x^{2} + y^{2}. Every symmetric polynomial can be written in terms of a few basic ones, which is why Vieta's formulas are so powerful.
O: Recognise symmetric polynomials
O: Express symmetric polynomials in terms of elementary symmetric polynomials
T: Symmetric polynomial | A polynomial unchanged by any permutation of its variables
T: Elementary symmetric polynomials | In two variables, e₁ = x + y and e₂ = xy; in three, x + y + z, xy + yz + zx and xyz
H: Recognising symmetry
- x^{2} + y^{2}, x^{3}y + xy^{3} and (x − y)^{2} are symmetric; x − y and x^{2}y are not.
- The fundamental theorem of symmetric polynomials: every symmetric polynomial is a polynomial in the elementary ones.
H: Useful identities
E: x^{2} + y^{2} = e₁^{2} − 2e₂; x^{3} + y^{3} = e₁^{3} − 3e₁e₂; (x − y)^{2} = e₁^{2} − 4e₂
- With Vieta's formulas, e₁ and e₂ come straight from a quadratic's coefficients, so any symmetric expression in its roots can be computed exactly.
- Newton's identities relate power sums (x^{k} + y^{k}) to elementary symmetric polynomials recursively.
X: If x + y = 5 and xy = 3, find x^{3} + y^{3}.
> x^{3} + y^{3} = (x + y)^{3} − 3xy(x + y)
> = 125 − 3 × 3 × 5
> = 80
- They underpin Galois theory, which explains why some equations can't be solved by formulae.
K: Symmetric polynomials are unchanged by swapping variables, and every one is a polynomial in the elementary symmetric polynomials.
!: Assuming every expression in the roots is symmetric: α − β isn't (only its square is).
Q: Is x^{2}y + xy^{2} symmetric? | Yes: it equals xy(x + y).
Q: Express x^{2} + y^{2} using e₁ and e₂. | e₁^{2} − 2e₂.
SUM: Symmetric polynomials are invariant under swapping variables.
SUM: They reduce to elementary symmetric polynomials.
SRC: Stewart I, Galois Theory (5th edn, CRC Press 2022) | textbook | 2022 | https://www.routledge.com/
SRC: Gelfand IM, Shen A, Algebra (Birkhäuser 1993) | textbook | 1993 | https://link.springer.com/
NUM1#maths-u03-31-q1@1: If x + y = 4 and xy = 1, find (x − y)^{2}. | 12 | 0 |  | (x − y)^{2} = (x + y)^{2} − 4xy = 16 − 4 = 12.
M1#maths-u03-31-q2@1: Which polynomial is symmetric in x and y? | x^{2} + 3xy + y^{2} | x^{2} − y^{2} | x + 2y | x^{3}y | x − y | Swapping x and y leaves x^{2} + 3xy + y^{2} unchanged.
M2#maths-u03-31-q3@2: If a + b = 3 and ab = −2, what is a^{2} + b^{2}? | 13 | 5 | 9 | 7 | 1 | Use a^{2} + b^{2} = (a + b)^{2} − 2ab = 9 − 2(−2) = 9 + 4 = 13.

## Partial Fractions
S: Partial fractions split a complicated algebraic fraction into a sum of simpler ones. This is the reverse of adding fractions, and it's essential for integrating rational functions and for binomial expansions at A level.
O: Decompose fractions with distinct linear and repeated linear factors
O: Handle improper fractions by dividing first
T: Partial fractions | Writing a rational expression as a sum of fractions with simpler denominators
T: Improper algebraic fraction | One where the numerator's degree is at least the denominator's
H: Forms
E: (px + q)/((x − a)(x − b)) ≡ A/(x − a) + B/(x − b)
E: (px^{2} + qx + r)/((x − a)(x − b)^{2}) ≡ A/(x − a) + B/(x − b) + C/(x − b)^{2}
- Multiply through by the denominator, then substitute convenient values (the roots) or equate coefficients.
H: Example and improper fractions
- (5x − 1)/((x + 1)(x − 2)) ≡ A/(x + 1) + B/(x − 2): 5x − 1 ≡ A(x − 2) + B(x + 1). Put x = 2: 9 = 3B, so B = 3. Put x = −1: −6 = −3A, so A = 2.
- Improper fractions: divide first, then decompose the proper remainder.
- Used for integrals like ∫ 1/(x(x + 1)) dx and expansions of (1 + x)^{−1} type (Schools 7 and 8).
X: Express (x + 7)/((x − 1)(x + 2)^{2}) in partial fractions.
> x + 7 ≡ A(x + 2)^{2} + B(x − 1)(x + 2) + C(x − 1)
> x = 1: 8 = 9A, so A = 8/9; x = −2: 5 = −3C, so C = −5/3
> Compare x^{2} coefficients: 0 = A + B, so B = −8/9. Answer: 8/(9(x − 1)) − 8/(9(x + 2)) − 5/(3(x + 2)^{2})
K: Match the form to the factors (a repeated factor needs every power), substitute roots, equate coefficients for the rest.
!: Using only A/(x + 2)^{2} for a repeated factor and missing the B/(x + 2) term.
Q: What form do you use for 1/(x(x + 3))? | A/x + B/(x + 3).
Q: What must you do first if the numerator's degree is at least the denominator's? | Divide.
SUM: Partial fractions undo adding fractions.
SUM: Repeated factors need a term for each power.
SRC: Department for Education, Mathematics AS and A level subject content: algebra and functions | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stroud KA, Booth DJ, Engineering Mathematics (8th edn, Bloomsbury 2020) | textbook | 2020 | https://www.bloomsbury.com/
M1#maths-u03-32-q1@1: Which is the correct form for (3x + 1)/((x − 2)(x + 5))? | A/(x − 2) + B/(x + 5) | A/(x − 2)(x + 5) | (Ax + B)/(x − 2) | A/(x − 2)^{2} + B/(x + 5) | A + B/(x + 5) | Two distinct linear factors give two simple fractions.
M2#maths-u03-32-q2@2: If 4/((x − 1)(x + 1)) ≡ A/(x − 1) + B/(x + 1), what is A? | 2 | −2 | 4 | 1 | 1/2 | 4 ≡ A(x + 1) + B(x − 1); with x = 1, 4 = 2A, so A = 2.

## Functions
S: A function is a rule that takes each input and gives exactly one output. Functions are the central idea of modern mathematics: graphs, calculus and modelling are all about functions.
O: Use function notation and evaluate functions
O: Distinguish functions from relations that aren't functions
T: Function | A rule assigning exactly one output to each input in its domain, written f(x) or f: x ↦ …
T: Mapping | The correspondence between inputs and outputs; one-to-one, many-to-one or one-to-many
H: Notation
- f(x) = 3x − 2 means "the output of f for input x". f(4) = 10; f(a + 1) = 3a + 1; f(x) = 7 means 3x − 2 = 7, so x = 3.
- Mapping notation: f: x ↦ 3x − 2.
- Functions can be given by a formula, a table, a graph or in words.
H: What counts as a function
- **One-to-one**: each output from exactly one input (f(x) = 2x + 1).
- **Many-to-one**: different inputs share an output (f(x) = x^{2}: f(3) = f(−3) = 9). Still a function.
- **One-to-many** isn't a function: y = ±√x gives two outputs for x = 4.
- Vertical line test: a graph is a function of x if no vertical line meets it more than once. A circle fails.
X: f(x) = x^{2} − 4x. Find f(−1), solve f(x) = 5, and find f(2a).
> f(−1) = 1 + 4 = 5
> x^{2} − 4x = 5 → (x − 5)(x + 1) = 0, so x = 5 or x = −1
> f(2a) = 4a^{2} − 8a
- Functions can have many inputs: the area of a rectangle is a function of its length and width, A(l, w) = lw.
- A function's graph is the set of points (x, f(x)).
P: **Investigate with the lab.** Plot y = x^{2} − 4 and read off its domain, range and roots. Then complete the straight-line challenge by matching a target line.
IX: grapher
K: A function gives one output per input; use f(x) notation; many-to-one is allowed, one-to-many isn't.
!: Reading f(x) as "f times x".
Q: If g(x) = 5 − 2x, what is g(−3)? | 11.
Q: Is y^{2} = x a function of x? | No: most x values give two y values.
SUM: Functions map each input to one output.
SUM: The vertical line test identifies functions.
SRC: Department for Education, Mathematics AS and A level subject content: algebra and functions | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
NUM1#maths-u03-33-q1@1: If f(x) = 2x^{2} − 3x + 1, find f(−2). | 15 | 0 |  | 2 × 4 + 6 + 1 = 15.
M1#maths-u03-33-q2@1: Which describes f(x) = x^{2}? | Many-to-one | One-to-one | One-to-many | Not a function | Many-to-many | f(2) = f(−2) = 4: two inputs share an output.
M2#maths-u03-33-q3@2: For f(x) = 4x + 1, solve f(x) = f(2x − 3). | x = 3 | x = −3 | x = 1 | x = 0 | No solution | f(2x − 3) = 4(2x − 3) + 1 = 8x − 11, and 4x + 1 = 8x − 11 gives x = 3.
M2#maths-u03-33-q4@2: Plotting y = x^{2} − 4, what is the range of the function? | y ≥ −4, since the minimum value is −4 at x = 0 | All real numbers, since parabolas go on forever | y ≥ 0, since squares are never negative | y ≤ −4, since the graph opens downwards | −2 ≤ y ≤ 2, the roots | x^{2} ≥ 0, so x^{2} − 4 ≥ −4, and every value above −4 is reached.

## Domain and Range
S: The domain of a function is the set of inputs it accepts; the range is the set of outputs it actually produces. Getting these right avoids dividing by zero, square-rooting negatives, and makes inverse functions possible.
O: Find the natural domain of a function
O: Find the range of a function on a given domain
T: Domain | The set of allowed inputs of a function
T: Range | The set of all outputs the function produces
H: Domains
- Exclude values that make a denominator zero: f(x) = 1/(x − 3) has domain x ≠ 3.
- Square roots need non-negative arguments: g(x) = √(x + 2) has domain x ≥ −2.
- Logarithms need positive arguments: ln(5 − x) has domain x < 5.
- A domain can also be chosen, such as "f(x) = x^{2} for 0 ≤ x ≤ 3".
H: Ranges
- Sketch the graph over the domain and read off the y-values.
- f(x) = x^{2} + 2 for all real x: range f(x) ≥ 2. For −1 ≤ x ≤ 3: range 2 ≤ f(x) ≤ 11 (the minimum at x = 0 matters, not just the endpoints).
- e^{x} has range e^{x} > 0; sin x has range −1 ≤ sin x ≤ 1.
- Completing the square finds quadratic ranges: x^{2} − 6x + 10 = (x − 3)^{2} + 1 ≥ 1.
X: Find the domain and range of h(x) = 3 + √(x − 1).
> Need x − 1 ≥ 0, so the domain is x ≥ 1
> √(x − 1) takes every value ≥ 0
> So the range is h(x) ≥ 3
K: Domains exclude zero denominators, negative roots and non-positive logs; ranges come from the graph over the domain.
!: Finding the range of a quadratic on an interval from the endpoints only, missing the turning point.
Q: What is the domain of f(x) = 1/(x^{2} − 4)? | All real x except ±2.
Q: What is the range of f(x) = (x + 1)^{2} − 5? | f(x) ≥ −5.
SUM: The domain is what goes in; the range is what comes out.
SUM: Sketch to find ranges.
SRC: Department for Education, Mathematics AS and A level subject content: algebra and functions | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Liebeck M, A Concise Introduction to Pure Mathematics (4th edn, CRC Press 2015) | textbook | 2015 | https://www.routledge.com/
M1#maths-u03-34-q1@1: What is the domain of f(x) = √(4 − x)? | x ≤ 4 | x ≥ 4 | x > 4 | x ≥ 0 | All real x | The square root needs 4 − x ≥ 0, so the domain is x ≤ 4.
M2#maths-u03-34-q2@2: What is the range of f(x) = x^{2} − 2x for −1 ≤ x ≤ 4? | −1 ≤ f(x) ≤ 8 | 3 ≤ f(x) ≤ 8 | 0 ≤ f(x) ≤ 8 | f(x) ≥ −1 | −1 ≤ f(x) ≤ 3 | (x − 1)^{2} − 1 has minimum −1 at x = 1 and maximum 8 at x = 4.

## Composite Functions
S: A composite function applies one function and then another: fg(x) means "do g, then f". Composition builds complicated functions from simple ones and is the idea behind the chain rule.
O: Form and evaluate composite functions
O: Find domains of composites and solve equations involving them
T: Composite function | fg(x) = f(g(x)): apply g first, then f
T: Order of composition | fg and gf are usually different
H: Forming composites
- f(x) = 2x + 1 and g(x) = x^{2}: fg(x) = f(x^{2}) = 2x^{2} + 1, but gf(x) = g(2x + 1) = (2x + 1)^{2}.
- Evaluate from the inside out: fg(3) = f(9) = 19.
- f^{2}(x) means ff(x): for f(x) = 2x + 1, ff(x) = 2(2x + 1) + 1 = 4x + 3.
H: Domains and equations
- fg(x) exists only where g(x) is in the domain of f: with f(x) = √x and g(x) = x − 5, fg(x) = √(x − 5) needs x ≥ 5.
- Solve fg(x) = 11 by forming fg(x) first: 2x^{2} + 1 = 11 gives x = ±√5.
- Decomposing: e^{sin x} is f(g(x)) with g = sin and f = exp, which is how the chain rule sees it (School 7).
X: f(x) = 3x − 4 and g(x) = 1/(x + 2). Find gf(x) and its domain, and solve gf(x) = 1/5.
> gf(x) = g(3x − 4) = 1/(3x − 2)
> Domain: 3x − 2 ≠ 0, so x ≠ 2/3
> 1/(3x − 2) = 1/5 gives 3x − 2 = 5, so x = 7/3
- Composition is associative: f(g(h(x))) is the same whichever pair you compose first.
- A function composed with its inverse gives the identity: ff^{−1}(x) = x.
K: fg means g first; composition order matters; the inner output must lie in the outer function's domain.
!: Applying f first when asked for fg(x).
Q: If f(x) = x + 3 and g(x) = 2x, what is gf(1)? | 8.
Q: Is fg always equal to gf? | No: usually they differ.
SUM: Composites chain functions together.
SUM: Work from the inside out.
SRC: Department for Education, Mathematics AS and A level subject content: algebra and functions | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
NUM1#maths-u03-35-q1@1: f(x) = x^{2} − 1 and g(x) = 3x + 2. Find fg(−1). | 0 | 0 |  | g(−1) = −1, and f(−1) = 1 − 1 = 0.
M1#maths-u03-35-q2@1: f(x) = 2x and g(x) = x + 5. What is fg(x)? | 2x + 10 | 2x + 5 | 2x^{2} + 10x | x + 10 | 2x + 52 | Apply g first: fg(x) = f(x + 5) = 2(x + 5) = 2x + 10.
M2#maths-u03-35-q3@2: f(x) = x^{2} and g(x) = x − 3. Solve gf(x) = fg(x). | x = 2 | x = 3 | x = 0 | No solution | x = −2 | gf(x) = x^{2} − 3 and fg(x) = (x − 3)^{2} = x^{2} − 6x + 9, so −3 = −6x + 9 and x = 2.

## Inverse Functions
S: An inverse function undoes a function: if f takes 3 to 11, then f^{−1} takes 11 back to 3. Only one-to-one functions have inverses, and the graph of an inverse is the reflection of the original in the line y = x.
O: Find the inverse of a one-to-one function
O: State the domain and range of an inverse and sketch it
T: Inverse function | f^{−1}, where f^{−1}(f(x)) = x for every x in the domain of f
T: Self-inverse | A function that is its own inverse, such as f(x) = 1/x or f(x) = 5 − x
H: Finding an inverse
- Write y = f(x), swap x and y, and rearrange for y: f(x) = (2x + 3)/5 → x = (2y + 3)/5 → y = (5x − 3)/2. So f^{−1}(x) = (5x − 3)/2.
- Check: f^{−1}(f(1)) = f^{−1}(1) = 1 ✓.
- Only one-to-one functions have inverses. f(x) = x^{2} has an inverse only on a restricted domain such as x ≥ 0, where f^{−1}(x) = √x.
H: Domain, range and graph
- The domain of f^{−1} is the range of f, and the range of f^{−1} is the domain of f.
- The graph of y = f^{−1}(x) is the reflection of y = f(x) in y = x.
- e^{x} and ln x are inverses: e^{ln x} = x for x > 0 and ln(e^{x}) = x for all x.
X: f(x) = √(x − 2) for x ≥ 2. Find f^{−1}(x) and its domain.
> y = √(x − 2); swap: x = √(y − 2), so x^{2} = y − 2
> f^{−1}(x) = x^{2} + 2
> The range of f is f(x) ≥ 0, so the domain of f^{−1} is x ≥ 0
- Self-inverse functions are symmetric in y = x: their graphs are unchanged by the reflection.
P: **Investigate with the lab.** Compare bˣ and log_b x with the line y = x: each point on one graph has a mirror image on the other. Change the base and see the pair move together.
IX: explog
K: Swap x and y and rearrange; the domain of f^{−1} is the range of f; reflect in y = x.
!: Writing f^{−1}(x) = 1/f(x): the inverse isn't the reciprocal.
Q: Find the inverse of f(x) = 4x − 7. | f^{−1}(x) = (x + 7)/4.
Q: Why doesn't f(x) = x^{2} (all real x) have an inverse? | It's many-to-one: f(2) = f(−2).
SUM: Inverses undo functions.
SUM: Inverse graphs reflect in y = x.
SRC: Department for Education, Mathematics AS and A level subject content: algebra and functions | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
NUM1#maths-u03-36-q1@1: f(x) = (x + 4)/3. Find f^{−1}(5). | 11 | 0 |  | f^{−1}(x) = 3x − 4, so f^{−1}(5) = 11 (check: f(11) = 15/3 = 5).
M1#maths-u03-36-q2@1: What is the inverse of f(x) = x^{3} + 1? | f^{−1}(x) = ∛(x − 1) | f^{−1}(x) = ∛x − 1 | f^{−1}(x) = 1/(x^{3} + 1) | f^{−1}(x) = x^{3} − 1 | f^{−1}(x) = (x − 1)^{3} | Swap and rearrange: x = y^{3} + 1, so y = ∛(x − 1).
M2#maths-u03-36-q3@2: f(x) = e^{x} + 2. What is the domain of f^{−1}? | x > 2 | x > 0 | All real x | x ≥ 2 | x < 2 | The range of f is f(x) > 2, which becomes the domain of f^{−1}.

## Transformations of Functions
S: Transformations move, stretch and reflect graphs. Knowing how f(x) + a, f(x + a), af(x) and f(ax) change a graph lets you sketch whole families of functions from one you know.
O: Describe the effect of translations, stretches and reflections on graphs
O: Combine transformations and find equations of transformed graphs
T: Translation | A shift of a graph without changing its shape, described by a vector
T: Stretch | Scaling a graph parallel to an axis by a scale factor
H: The four basic transformations
- y = f(x) + a: translation by (0, a) (up a).
- y = f(x + a): translation by (−a, 0) (left a: the opposite way to the sign).
- y = af(x): stretch parallel to the y-axis, scale factor a.
- y = f(ax): stretch parallel to the x-axis, scale factor 1/a.
- y = −f(x): reflection in the x-axis; y = f(−x): reflection in the y-axis.
H: Combining
- Changes inside the bracket act on x (horizontal, and "backwards"); changes outside act on y (vertical, and as you'd expect).
- y = 2(x − 3)^{2} + 1 is y = x^{2} translated 3 right, stretched vertically by 2, then translated up 1: the vertex moves to (3, 1).
- Points transform too: if (2, 5) is on y = f(x), then (1, 5) is on y = f(2x) and (2, 10) is on y = 2f(x).
X: The curve y = f(x) has a maximum at (4, 6). Find the maximum of y = 3f(x − 1) and of y = f(2x) − 5.
> y = 3f(x − 1): move 1 right, stretch vertically by 3: maximum at (5, 18)
> y = f(2x) − 5: halve the x-coordinate, then move down 5
> Maximum at (2, 1)
P: **Investigate with the lab.** Work through the completed-square and reflected-parabola challenges. For each slider, predict the effect before you move it.
IX: grapher
K: Outside the bracket affects y as written; inside affects x in reverse; track key points through each step.
!: Moving y = f(x + 3) to the right instead of to the left.
Q: Describe y = f(x) − 4 compared with y = f(x). | Translation down 4 (vector (0, −4)).
Q: What does y = f(3x) do to the graph? | Stretches it parallel to the x-axis by scale factor 1/3.
SUM: Translations, stretches and reflections transform graphs.
SUM: Inside changes act on x in reverse.
SRC: Department for Education, Mathematics AS and A level subject content: algebra and functions | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
M1#maths-u03-37-q1@1: Which transformation maps y = x^{2} to y = (x + 5)^{2}? | Translation 5 to the left | Translation 5 to the right | Translation 5 up | Stretch by 5 | Reflection | f(x + 5) moves the graph 5 units in the negative x direction.
M2#maths-u03-37-q2@2: (3, −2) lies on y = f(x). Which point lies on y = −f(x) + 4? | (3, 6) | (3, 2) | (−3, 6) | (3, −6) | (7, 2) | Reflecting gives (3, 2), then up 4 gives (3, 6).
M3#maths-u03-37-q3@2: Which describes y = f(2x + 6) compared with y = f(x)? | Translate 6 left, then stretch by 1/2 parallel to the x-axis | Stretch by 1/2, then translate 6 left | Translate 3 right | Stretch by 2, then translate 6 right | Translate 6 right, then stretch by 1/2 | f(2x + 6) = f(2(x + 3)): it's also "stretch by ½, then translate 3 left"; translating 6 left first, then stretching, gives the same graph.
M2#maths-u03-37-q4@2: Compared with y = x^{2}, how is y = −2(x + 1)^{2} + 4 transformed? | Shifted 1 left and 4 up, stretched by 2 vertically and reflected in the x-axis | Shifted 1 right and 4 up, then reflected | Shifted 1 left and 4 down, stretched horizontally by 2 | Only reflected in the y-axis | Shifted 2 left and 4 up | The vertex moves to (−1, 4), and the factor −2 stretches by 2 and flips the curve.

## Piecewise Functions
S: A piecewise function uses different rules on different parts of its domain, like a tax system with bands or a phone tariff. They model real situations and test careful reading of where each rule applies.
O: Evaluate and sketch piecewise functions
O: Check continuity at the boundaries between pieces
T: Piecewise function | A function defined by different formulae on different intervals
T: Continuous | Having no jumps: at each boundary the pieces meet
H: Evaluating and sketching
- f(x) = x^{2} for x < 1, and 3 − 2x for x ≥ 1. f(−2) = 4; f(1) = 1; f(3) = −3.
- Sketch each piece only on its own interval, with a filled dot where the endpoint is included and an open dot where it isn't.
- |x| is piecewise: −x for x < 0, x for x ≥ 0.
H: Continuity and applications
- At x = 1 above: the left piece gives 1^{2} = 1 and the right gives 1, so f is continuous there.
- Find a constant to make a function continuous by equating the pieces at the boundary.
- Real examples: income tax bands, postage costs (step functions), and the floor function ⌊x⌋.
X: f(x) = kx + 1 for x < 2, and x^{2} − 3 for x ≥ 2. Find k so that f is continuous.
> At x = 2 the right piece gives 4 − 3 = 1
> The left piece gives 2k + 1
> 2k + 1 = 1, so k = 0
- The floor function ⌊x⌋ gives the greatest integer ≤ x: ⌊3.7⌋ = 3 and ⌊−1.2⌋ = −2.
K: Use the right rule for each input; check that pieces meet at boundaries for continuity.
!: Applying the wrong piece at a boundary point (check ≤ versus <).
Q: For f(x) = 2x if x ≤ 3, 10 − x if x > 3, find f(3) and f(4). | 6 and 6.
Q: What does a step function look like? | Horizontal segments with jumps between them.
SUM: Piecewise functions change rule across intervals.
SUM: Continuity means the pieces meet.
SRC: Department for Education, Mathematics AS and A level subject content: algebra and functions | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Liebeck M, A Concise Introduction to Pure Mathematics (4th edn, CRC Press 2015) | textbook | 2015 | https://www.routledge.com/
M1#maths-u03-38-q1@1: f(x) = x + 4 for x < 0 and 4 − x^{2} for x ≥ 0. What is f(−1) + f(2)? | 3 | 0 | 6 | 7 | −1 | −1 uses the first rule: f(−1) = 3; 2 uses the second: f(2) = 4 − 4 = 0. Total 3.
M2#maths-u03-38-q2@2: Is f(x) = 2x for x < 1 and x + 2 for x ≥ 1 continuous at x = 1? | No: the pieces give 2 and 3 | Yes | Yes: both pieces are linear | No: f(1) is undefined | Only from the right | The left piece approaches 2 but the right piece gives 3: a jump.

## Parametric Equations
S: Parametric equations describe a curve using a third variable, the parameter, for both coordinates: x = t^{2}, y = 2t. They're natural for motion, where t is time, and describe curves that aren't functions, like circles.
O: Convert between parametric and Cartesian forms
O: Sketch and interpret parametric curves
T: Parameter | An extra variable, often t or θ, on which both x and y depend
T: Cartesian equation | An equation linking x and y directly
H: Working with parameters
- Plot points by choosing values of t: x = t^{2}, y = 2t gives (0, 0), (1, 2), (1, −2), (4, 4), ….
- Eliminate the parameter to get a Cartesian equation: t = y/2, so x = y^{2}/4.
- Circles: x = r cos θ, y = r sin θ; since cos^{2} θ + sin^{2} θ = 1, x^{2} + y^{2} = r^{2}.
- Ellipses: x = a cos θ, y = b sin θ gives x^{2}/a^{2} + y^{2}/b^{2} = 1.
H: Motion and intersections
- A projectile: x = 20t, y = 15t − 5t^{2}. It lands when y = 0: t = 3, so x = 60 m.
- Find where a parametric curve meets a line by substituting x(t) and y(t) into the line's equation.
- Parametric differentiation (School 7) finds gradients: dy/dx = (dy/dt)/(dx/dt).
X: Find the Cartesian equation of x = 2t + 1, y = t^{2} − 3.
> From x: t = (x − 1)/2
> Substitute: y = ((x − 1)/2)^{2} − 3
> y = (x − 1)^{2}/4 − 3, a parabola
K: Eliminate the parameter to get a Cartesian equation; use trigonometric identities for circles and ellipses.
!: Forgetting that the parameter's range can restrict the curve to only part of the Cartesian graph.
Q: What curve is x = 3 cos θ, y = 3 sin θ? | A circle of radius 3 centred at the origin.
Q: For x = t^{3}, y = t^{2}, what is the Cartesian equation? | y = x^{2/3} (or y^{3} = x^{2}).
SUM: Parameters describe both coordinates.
SUM: Eliminate the parameter for Cartesian form.
SRC: Department for Education, Mathematics AS and A level subject content: coordinate geometry | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stroud KA, Booth DJ, Engineering Mathematics (8th edn, Bloomsbury 2020) | textbook | 2020 | https://www.bloomsbury.com/
NUM1#maths-u03-39-q1@1: A curve has x = 3t − 1, y = t^{2}. Find y when x = 5. | 4 | 0 |  | 3t − 1 = 5 gives t = 2, so y = 4.
M1#maths-u03-39-q2@1: Which Cartesian equation matches x = t + 1, y = 2t? | y = 2x − 2 | y = 2x + 2 | y = x + 1 | y = 2x | y = x/2 − 1 | From x = t + 1, t = x − 1; substituting gives y = 2(x − 1) = 2x − 2.
M2#maths-u03-39-q3@2: Which curve is x = 4 cos t, y = 2 sin t? | An ellipse | A circle | A parabola | A hyperbola | A straight line | x^{2}/16 + y^{2}/4 = cos^{2} t + sin^{2} t = 1.

## Implicit Equations
S: An implicit equation links x and y without making y the subject, like x^{2} + y^{2} = 25 or x^{3} + y^{3} = 6xy. Many important curves can only be written this way, and they're differentiated implicitly.
O: Interpret and sketch curves given implicitly
O: Find points on implicit curves and test whether points lie on them
T: Implicit equation | An equation in x and y where y isn't given explicitly as a function of x
T: Explicit equation | An equation with y as the subject, such as y = 3x^{2}
H: Working with implicit curves
- x^{2} + y^{2} = 25 is a circle; solving for y gives two explicit pieces, y = ±√(25 − x^{2}).
- Test a point by substituting: is (3, 4) on x^{2} + y^{2} = 25? 9 + 16 = 25, yes.
- Find y for a given x by solving the resulting equation: on x^{2} + xy + y^{2} = 7, x = 1 gives y^{2} + y − 6 = 0, so y = 2 or y = −3.
- Symmetry: replacing y with −y leaves x^{2} + y^{2} = 25 unchanged, so it's symmetric in the x-axis.
H: Why they matter
- Conics (circles, ellipses, hyperbolas), level curves of functions of two variables (contour lines), and curves like the folium of Descartes x^{3} + y^{3} = 3xy.
- Implicit differentiation (School 7) finds gradients without solving for y.
X: Find the points where x^{2} + 2y^{2} = 18 meets the line y = x.
> Substitute y = x: x^{2} + 2x^{2} = 18, so 3x^{2} = 18
> x^{2} = 6, so x = ±√6
> Points: (√6, √6) and (−√6, −√6)
K: Implicit equations link x and y directly; substitute to test points, find coordinates or intersections.
!: Assuming an implicit curve gives one y for each x.
Q: Does (1, 2) lie on x^{2} + y^{2} − 2x = 4? | No: 1 + 4 − 2 = 3, not 4.
Q: Why might you leave a curve in implicit form? | Solving for y may be impossible or give several branches.
SUM: Implicit equations describe curves without y as the subject.
SUM: Substitute to test points and find intersections.
SRC: Department for Education, Mathematics AS and A level subject content: differentiation | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stroud KA, Booth DJ, Engineering Mathematics (8th edn, Bloomsbury 2020) | textbook | 2020 | https://www.bloomsbury.com/
M1#maths-u03-40-q1@1: Which point lies on x^{2} − y^{2} = 16? | (5, 3) | (4, 1) | (3, 5) | (5, 4) | (2, 2) | Substituting (5, 3): 5^{2} − 3^{2} = 25 − 9 = 16, so the point lies on the curve.
M2#maths-u03-40-q2@2: On x^{2} + xy + y^{2} = 7, what are the y-values when x = 1? | 2 and −3 | 3 and −2 | 2 only | ±√6 | 7 and −1 | 1 + y + y^{2} = 7 gives (y + 3)(y − 2) = 0.

## Recurrence Relations
S: A recurrence relation defines each term of a sequence from earlier terms, like u_{n+1} = 2u_{n} + 3. Recurrences model populations, loans and algorithms, and some can be solved to give a formula for the nth term.
O: Generate terms from a recurrence relation
O: Describe the long-term behaviour of a sequence and find limits
T: Recurrence relation | A rule giving each term from previous ones, with starting values
T: Limit | A value that the terms approach as n becomes large
H: Generating and describing
- u_{n+1} = 2u_{n} + 3 with u_{1} = 1: 1, 5, 13, 29, … (increasing).
- Sequences can be increasing, decreasing, periodic (repeating) or convergent.
- u_{n+1} = 1/u_{n} with u_{1} = 2: 2, ½, 2, ½, … is periodic with period 2.
- Fibonacci: F_{n+2} = F_{n+1} + F_{n} needs two starting values.
H: Limits and solutions
- If u_{n+1} = au_{n} + b converges, its limit L satisfies L = aL + b, so L = b/(1 − a). It converges when |a| < 1.
- u_{n+1} = 0.5u_{n} + 6 converges to L = 6/0.5 = 12, from any start.
- Some recurrences have closed forms: u_{n+1} = 2u_{n} + 3, u_{1} = 1 gives u_{n} = 2^{n+1} − 3.
- Loans: a balance B with monthly interest r and repayment R follows B_{n+1} = (1 + r)B_{n} − R.
X: A pond has 200 fish. Each year the population falls by 10% and 30 fish are added: P_{n+1} = 0.9P_{n} + 30. Find P_{2} and the long-term population.
> P_{1} = 0.9 × 200 + 30 = 210
> P_{2} = 0.9 × 210 + 30 = 219
> Limit: L = 0.9L + 30, so 0.1L = 30 and L = 300 fish
K: Generate terms by repeated substitution; for u_{n+1} = au_{n} + b with |a| < 1, the limit is b/(1 − a).
!: Assuming every recurrence has a limit: u_{n+1} = 2u_{n} + 3 grows without bound.
Q: What is u_{3} if u_{1} = 4 and u_{n+1} = 3u_{n} − 5? | u_{2} = 7, u_{3} = 16.
Q: What is the limit of u_{n+1} = 0.2u_{n} + 8? | 10.
SUM: Recurrences build sequences step by step.
SUM: Some converge to a limit found by solving L = f(L).
SRC: Department for Education, Mathematics AS and A level subject content: sequences and series | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Rosen KH, Discrete Mathematics and Its Applications (8th edn, McGraw Hill 2019) | textbook | 2019 | https://www.mheducation.com/
NUM1#maths-u03-41-q1@1: u_{1} = 2 and u_{n+1} = u_{n}^{2} − 1. Find u_{4}. | 63 | 0 |  | u_{2} = 3, u_{3} = 8, u_{4} = 63.
M1#maths-u03-41-q2@1: Which type of sequence is u_{n+1} = −u_{n}, u_{1} = 5? | Periodic | Increasing | Decreasing | Convergent to 0 | Arithmetic | It alternates 5, −5, 5, −5, …, repeating every 2 terms.
M2#maths-u03-41-q3@2: u_{n+1} = 0.75u_{n} + 5. What is its limit? | 20 | 5 | 6.67 | 15 | It has none | L = 0.75L + 5 gives 0.25L = 5, so L = 20.

## Intermediate Algebra
S: Intermediate algebra bridges GCSE and A level: confident manipulation of quadratics, functions, inequalities, surds and indices together, in multi-step problems. It's where fluency becomes problem solving.
O: Combine algebraic techniques in multi-step problems
O: Choose an efficient method for a given problem
T: Fluency | Carrying out standard procedures accurately and efficiently
T: Strategy | Choosing which technique to use, and in what order
H: Combining techniques
- Many problems need a chain of methods: rearrange, substitute, factorise, solve, check.
- Example: the line y = 2x + k is a tangent to y = x^{2} + 3. Setting x^{2} + 3 = 2x + k gives x^{2} − 2x + 3 − k = 0. A tangent means one repeated root, so the discriminant 4 − 4(3 − k) = 0, giving k = 2.
- Indices and surds together: (√8 × 2^{−1/2})^{2} = (2^{3/2} × 2^{−1/2})^{2} = 2^{2} = 4.
H: Choosing methods
- Factorise if the quadratic factorises easily; complete the square for turning points or exact surds; use the formula otherwise.
- For simultaneous linear and quadratic equations, substitute the linear one into the quadratic.
- Check the answer's reasonableness: signs, sizes and context.
X: Find where the line y = x + 1 meets the circle x^{2} + y^{2} = 13.
> Substitute: x^{2} + (x + 1)^{2} = 13, so 2x^{2} + 2x − 12 = 0, so x^{2} + x − 6 = 0
> (x + 3)(x − 2) = 0, so x = −3 or x = 2
> Points: (−3, −2) and (2, 3)
K: Chain techniques deliberately; use the discriminant for tangency; substitute linear into quadratic.
!: Losing track of signs across several steps: check each line.
Q: How do you show a line is a tangent to a curve? | Substitute and show the resulting quadratic has a repeated root (discriminant 0).
Q: When is completing the square better than the formula? | When you need the turning point or an exact surd form.
SUM: Intermediate algebra combines methods.
SUM: Strategy matters as much as technique.
SRC: Department for Education, Mathematics AS and A level subject content: algebra and functions | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Pólya G, How to Solve It (Princeton University Press 2004) | textbook | 2004 | https://press.princeton.edu/
M1#maths-u03-42-q1@1: For what value of k is y = 4x + k a tangent to y = x^{2}? | −4 | 4 | 0 | 2 | −2 | x^{2} − 4x − k = 0 needs 16 + 4k = 0, so k = −4.
M2#maths-u03-42-q2@2: Where does y = 2x meet y = x^{2} − 3? | (3, 6) and (−1, −2) | (3, 6) only | (−3, −6) and (1, 2) | (2, 4) and (0, 0) | They don't meet | Set 2x = x^{2} − 3: x^{2} − 2x − 3 = 0, so x = 3 or −1, giving (3, 6) and (−1, −2).

## Advanced Algebra
S: Advanced algebra extends school methods with proof by induction, the binomial theorem for any power, series and complex roots. It's the algebra of A level Further Maths and the first year of a maths degree.
O: Use the binomial expansion for positive integer and other powers
O: Prove algebraic results by induction
T: Binomial expansion | (a + b)^{n} = Σ nCr a^{n−r}b^{r}
T: Proof by induction | Proving a statement for n = 1 and that truth for n = k implies truth for n = k + 1
H: Binomial expansions
- (1 + x)^{4} = 1 + 4x + 6x^{2} + 4x^{3} + x^{4} (coefficients from Pascal's triangle or nCr).
- The coefficient of x^{3} in (2 + x)^{6} is 6C3 × 2^{3} = 20 × 8 = 160.
- For non-integer or negative n, (1 + x)^{n} = 1 + nx + n(n − 1)x^{2}/2! + … is an infinite series valid for |x| < 1: (1 + x)^{−1} = 1 − x + x^{2} − ….
H: Induction
- Prove 1 + 2 + … + n = n(n + 1)/2. Basis: n = 1 gives 1 = 1. Step: if true for k, then 1 + … + k + (k + 1) = k(k + 1)/2 + (k + 1) = (k + 1)(k + 2)/2, which is the formula for k + 1. So it's true for all n ≥ 1.
- Induction also proves divisibility results (7^{n} − 1 is divisible by 6) and matrix powers.
X: Find the first three terms of (1 − 2x)^{1/2} in ascending powers of x, and state where it's valid.
> 1 + (½)(−2x) + (½)(−½)(−2x)^{2}/2
> = 1 − x − ½x^{2} + …
> Valid for |2x| < 1, so |x| < ½
K: Use nCr for whole-number powers and the general series for others (with its validity range); prove "for all n" statements by induction.
!: Forgetting to raise the coefficient inside the bracket to the power, as in (2x)^{2} = 4x^{2}.
Q: What is 5C2? | 10.
Q: What are the two parts of a proof by induction? | The base case and the inductive step.
SUM: The binomial theorem expands powers of brackets.
SUM: Induction proves statements for all natural numbers.
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
SRC: Liebeck M, A Concise Introduction to Pure Mathematics (4th edn, CRC Press 2015) | textbook | 2015 | https://www.routledge.com/
NUM1#maths-u03-43-q1@1: Find the coefficient of x^{2} in (3 + 2x)^{5}. | 1080 | 0 |  | 5C2 × 3^{3} × 2^{2} = 10 × 27 × 4 = 1080.
M1#maths-u03-43-q2@1: What is the coefficient of x in (1 + x)^{−2}? | −2 | 2 | 1 | −1 | 3 | In (1 + x)^{n} = 1 + nx + …, the coefficient of x is n, which is −2 here.
M3#maths-u03-43-q3@2: In the inductive step for 1 + 3 + … + (2n − 1) = n^{2}, what must you show? | k^{2} + (2k + 1) = (k + 1)^{2} | k^{2} = (k + 1)^{2} | 1 = 1^{2} | 2k − 1 = k^{2} | (k + 1)^{2} − k^{2} = 1 | Adding the next odd number, 2(k + 1) − 1 = 2k + 1, to k^{2} must give (k + 1)^{2}.

## Complex Numbers
S: Complex numbers extend the reals with i, where i^{2} = −1. Every polynomial has all its roots among them, and they're indispensable in electrical engineering, quantum mechanics and signal processing.
O: Calculate with complex numbers in the form a + bi
O: Solve quadratic equations with complex roots and represent numbers on an Argand diagram
T: Imaginary unit | i, with i^{2} = −1
T: Complex conjugate | For z = a + bi, the conjugate is z* = a − bi
H: Arithmetic
- Add and subtract real and imaginary parts: (3 + 2i) + (1 − 5i) = 4 − 3i.
- Multiply like brackets, using i^{2} = −1: (2 + i)(3 − 4i) = 6 − 8i + 3i − 4i^{2} = 10 − 5i.
- zz* = a^{2} + b^{2} is real, so divide by multiplying top and bottom by the conjugate: (1 + 2i)/(3 − i) = (1 + 2i)(3 + i)/10 = (1 + 7i)/10.
H: Roots and the Argand diagram
- x^{2} + 4x + 13 = 0: discriminant −36, so x = (−4 ± 6i)/2 = −2 ± 3i (a conjugate pair).
- On the Argand diagram, a + bi is the point (a, b). The modulus |z| = √(a^{2} + b^{2}) is its distance from the origin; the argument is its angle from the positive real axis.
- Modulus-argument form z = r(cos θ + i sin θ) and Euler's formula e^{iθ} = cos θ + i sin θ make multiplication a rotation and scaling (School 6 and Further Maths).
X: Solve z^{2} − 6z + 34 = 0 and find the modulus of each root.
> z = (6 ± √(36 − 136))/2 = (6 ± √−100)/2
> z = (6 ± 10i)/2 = 3 ± 5i
> |3 ± 5i| = √(9 + 25) = √34
P: **Investigate with the lab.** Multiply z by i and watch it turn 90°, then multiply z by its conjugate and see the product land on the real axis.
IX: complex
P: **Investigate with the lab.** Show the 6th roots of unity, then solve z⁴ = −16. Notice the roots always form a regular polygon centred on the origin.
IX: unity
K: Treat i as a variable with i^{2} = −1; divide using the conjugate; real quadratics have conjugate complex roots.
!: Writing i^{2} = 1, or forgetting to multiply the denominator by the conjugate too.
Q: What is i^{3}? | −i.
Q: What is (2 − 3i)(2 + 3i)? | 13.
SUM: Complex numbers solve every polynomial equation.
SUM: The Argand diagram shows them as points.
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
SRC: Needham T, Visual Complex Analysis (Oxford University Press 2023) | textbook | 2023 | https://global.oup.com/
NUM1#maths-u03-44-q1@1: Find |6 − 8i|. | 10 | 0 |  | √(36 + 64) = √100 = 10.
M1#maths-u03-44-q2@1: What is (4 + i) − (1 − 3i)? | 3 + 4i | 3 − 2i | 5 − 2i | 3 + 2i | 5 + 4i | Real parts: 4 − 1 = 3; imaginary parts: 1 − (−3) = 4.
M2#maths-u03-44-q3@2: What are the roots of z^{2} + 9 = 0? | 3i and −3i | 3 and −3 | 9i and −9i | 3 + i and 3 − i | There are none | z^{2} = −9, and √−9 = 3i, so the roots are the conjugate pair z = ±3i.
M3#maths-u03-44-q4@2: Simplify (5 + 5i)/(2 + i). | 3 + i | 5 + 5i/2 | 2.5 + 5i | 1 + 3i | 3 − i | Multiply by (2 − i)/(2 − i): (10 − 5i + 10i + 5)/5 = (15 + 5i)/5 = 3 + i.
M2#maths-u03-44-q5@2: On the Argand diagram, what does multiplying a complex number by i do? | Rotates it 90° anticlockwise about the origin, keeping its modulus | Reflects it in the real axis | Doubles its modulus | Rotates it 90° clockwise | Moves it one unit up | i has modulus 1 and argument 90°, so multiplication adds 90° to the argument and leaves the modulus unchanged.
NUM1#maths-u03-44-q6@1: What is the modulus of each solution of z^{4} = −16? | 2 | 0 |  | Each root has modulus 16^{1/4} = 2; the four roots sit at arguments 45°, 135°, 225° and 315°.

## Boolean Algebra
S: Boolean algebra is the algebra of true and false (1 and 0), with operations AND, OR and NOT. It's the mathematics of logic circuits, search queries and computer programs.
O: Evaluate Boolean expressions and construct truth tables
O: Simplify Boolean expressions using the laws, including De Morgan's laws
T: Boolean variable | A variable taking only the values 0 (false) and 1 (true)
T: De Morgan's laws | NOT (A AND B) = (NOT A) OR (NOT B); NOT (A OR B) = (NOT A) AND (NOT B)
H: Operations and truth tables
- A AND B (A·B or A ∧ B): 1 only if both are 1. A OR B (A + B or A ∨ B): 1 if at least one is 1. NOT A (Ā or ¬A): swaps 0 and 1.
- A truth table lists every combination: with n variables there are 2^{n} rows.
- XOR (exclusive or) is 1 when exactly one input is 1.
H: Laws
- Identity: A + 0 = A, A·1 = A. Annihilation: A + 1 = 1, A·0 = 0. Idempotence: A + A = A, A·A = A.
- Complement: A + Ā = 1, A·Ā = 0. Absorption: A + A·B = A.
- Distributive: A·(B + C) = A·B + A·C, and also A + B·C = (A + B)·(A + C), unlike ordinary algebra.
- De Morgan: the complement of A·B is Ā + B̄, and the complement of A + B is Ā·B̄.
X: Simplify A·B + A·B̄ + Ā·B.
> A·B + A·B̄ = A·(B + B̄) = A·1 = A
> So the expression is A + Ā·B
> A + Ā·B = (A + Ā)·(A + B) = A + B
- Logic gates (AND, OR, NOT, NAND, NOR, XOR) are physical circuits for these operations; NAND alone can build all the others.
K: AND, OR and NOT follow their own laws; De Morgan's laws flip AND and OR under NOT; truth tables check any simplification.
!: Using ordinary arithmetic: in Boolean algebra 1 + 1 = 1.
Q: What is NOT (A OR B) by De Morgan's law? | (NOT A) AND (NOT B).
Q: How many rows does a truth table for 3 variables have? | 8.
SUM: Boolean algebra describes logic.
SUM: Its laws simplify circuits and conditions.
SRC: Rosen KH, Discrete Mathematics and Its Applications (8th edn, McGraw Hill 2019) | textbook | 2019 | https://www.mheducation.com/
SRC: Department for Education, Computer science GCSE subject content | standard | 2015 | https://www.gov.uk/government/publications/gcse-computer-science
M1#maths-u03-45-q1@1: What is 1 AND 0? | 0 | 1 | 2 | 10 | Undefined | AND gives 1 only when both inputs are 1; here one input is 0, so the result is 0.
M2#maths-u03-45-q2@2: Which expression equals A + A·B? | A | B | A·B | A + B | 1 | By absorption: A + A·B = A·(1 + B) = A·1 = A.
`;
