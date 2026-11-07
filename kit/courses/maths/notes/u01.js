// School 1: Number and Arithmetic. Format: kit/course/notes.js. Standard: docs/CURRICULUM_CONTENT_STANDARD.md
// UK school mathematics (KS3, GCSE, Functional Skills), with notes on where ideas lead at A level and beyond.
export default `
## Arithmetic
S: Arithmetic is calculating with numbers: adding, subtracting, multiplying and dividing. Fluent, accurate arithmetic, with written methods you trust and the habit of checking, underpins every other part of mathematics.
O: Use written methods for the four operations accurately
O: Check answers using inverse operations and estimation
T: Inverse operation | An operation that undoes another: subtraction undoes addition, division undoes multiplication
T: Commutative | An operation where order doesn't matter: a + b = b + a and a × b = b × a, but not for subtraction or division
H: The four operations
- **Addition and subtraction**: line up place values; carry or exchange (borrow) across columns.
- **Multiplication**: the grid method or long multiplication; multiply by each digit, keeping place value, then add.
- **Division**: short or long division; a remainder can be written as a remainder, a fraction or a decimal, depending on the question.
- Addition and multiplication are **commutative** and **associative** (you can regroup); subtraction and division aren't.
- **Distributive law**: a × (b + c) = a × b + a × c, which is why 7 × 23 = 7 × 20 + 7 × 3.
H: Checking
- Use the inverse: if 384 ÷ 12 = 32, then 32 × 12 should be 384.
- Estimate first by rounding: 384 ÷ 12 is about 400 ÷ 10 = 40, so 32 is sensible.
- Check the last digit: 37 × 24 must end in 8, because 7 × 4 = 28.
X: Work out 37 × 24 using long multiplication.
> 37 × 4 = 148
> 37 × 20 = 740
> 148 + 740 = 888. Check: 37 × 24 ≈ 40 × 25 = 1,000, so 888 is sensible, and it ends in 8 as 7 × 4 ends in 8.
K: Use written methods that keep place value, and check every answer with an inverse operation or an estimate.
!: Treating subtraction as commutative: 3 − 7 isn't the same as 7 − 3.
Q: Why is 7 × 23 = 7 × 20 + 7 × 3? | Multiplication distributes over addition: 7 × (20 + 3) = 7 × 20 + 7 × 3.
Q: How can you check 384 ÷ 12 = 32? | Use the inverse: 32 × 12 = 384.
SUM: The four operations follow rules; addition and multiplication are commutative, subtraction and division aren't.
SUM: Estimate and use inverse operations to check.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: National Centre for Excellence in the Teaching of Mathematics, Secondary mastery professional development materials: arithmetic procedures | guidance | 2019 | https://www.ncetm.org.uk/
NUM1#maths-u01-01-q1@1: Work out 468 ÷ 18. | 26 | 0 |  | 18 × 26 = 468 (18 × 25 = 450, plus 18), so 468 ÷ 18 = 26.
M1#maths-u01-01-q2@1: Which operation is commutative? | Multiplication | Subtraction | Division | Finding a remainder | Raising to a power | 6 × 4 = 4 × 6, but 6 − 4 ≠ 4 − 6 and 6 ÷ 4 ≠ 4 ÷ 6.
M2#maths-u01-01-q3@2: Which check best shows that 52 × 19 = 988 is plausible? | 52 × 19 ≈ 50 × 20 = 1,000 | 52 + 19 = 71 | 988 is even | 988 has three digits | 19 is prime | Estimating by rounding each number shows the answer should be close to 1,000.

## Order of Operations
S: When a calculation has several operations, the order you do them in changes the answer. A single agreed convention (brackets, then indices, then division and multiplication, then addition and subtraction) means everyone gets the same result.
O: Apply the order of operations, including with brackets and powers
O: Recognise and avoid common order-of-operations errors
T: BIDMAS | Brackets, Indices, Division and Multiplication, Addition and Subtraction: the order for evaluating a calculation
T: Index | A power, such as the 2 in 3^{2}
H: The convention
- **B**rackets first, working from the innermost.
- **I**ndices (powers and roots) next.
- **D**ivision and **M**ultiplication have equal priority: work left to right.
- **A**ddition and **S**ubtraction have equal priority: work left to right.
- A fraction bar acts as brackets around the top and the bottom: (8 + 4) ÷ (2 + 1).
H: Pitfalls
- 12 ÷ 4 × 3 = 3 × 3 = 9, not 12 ÷ 12 = 1: left to right.
- −3^{2} = −9, because the power applies to 3 before the minus; (−3)^{2} = 9.
- Calculators follow the convention, so type brackets around fraction tops and bottoms.
X: Evaluate 20 − 3 × (5 − 2)^{2} ÷ 9.
> Brackets: 5 − 2 = 3
> Indices: 3^{2} = 9
> Multiplication and division, left to right: 3 × 9 = 27, then 27 ÷ 9 = 3
> Subtraction: 20 − 3 = 17
- In algebra the same order applies: 2x^{2} means 2 × (x^{2}), not (2x)^{2}.
K: Brackets, indices, then multiplication and division left to right, then addition and subtraction left to right.
!: Doing all multiplication before any division: they have equal priority and go left to right.
Q: What is 12 ÷ 4 × 3? | 9: divide and multiply from left to right.
Q: What is the difference between −3^{2} and (−3)^{2}? | −3^{2} = −9 (the power applies first); (−3)^{2} = 9.
SUM: BIDMAS gives a single agreed answer.
SUM: Operations of equal priority go left to right.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: National Centre for Excellence in the Teaching of Mathematics, Secondary mastery professional development materials: the order of operations | guidance | 2019 | https://www.ncetm.org.uk/
NUM1#maths-u01-02-q1@1: Evaluate 6 + 18 ÷ 3 × 2 − 4. | 14 | 0 |  | 18 ÷ 3 = 6, then 6 × 2 = 12 (left to right), so 6 + 12 − 4 = 14.
M2#maths-u01-02-q2@2: What is 2 × 3^{2}? | 18 | 36 | 12 | 81 | 9 | Indices first: 3^{2} = 9, then 2 × 9 = 18. (2 × 3)^{2} would be 36.
M3#maths-u01-02-q3@2: A student types 10 + 6 ÷ 2 into a calculator wanting (10 + 6) ÷ 2. What do they get? | 13 | 8 | 16 | 3 | 5 | The calculator divides first: 6 ÷ 2 = 3, then adds 10. Brackets are needed to get 8.

## Number Systems
S: A number system is a way of representing numbers with symbols. Our everyday system is decimal and positional, but others (Roman numerals, binary, base 60 for time) show that the symbols are a choice, while the numbers themselves are the same.
O: Explain what makes a number system positional
O: Compare the decimal system with other number systems
T: Positional system | A system where a digit's value depends on its position, such as hundreds, tens and units
T: Base | The number of different digits a positional system uses, and the multiplier between neighbouring places
H: Positional systems
- In base 10, each place is worth 10 times the place to its right: 3,507 = 3 × 1000 + 5 × 100 + 0 × 10 + 7 × 1.
- **Zero** is essential as a placeholder: without it, 3,507 and 357 would look alike.
- Other bases: binary (base 2) in computers, base 60 in minutes and degrees, base 12 in older measures.
H: Non-positional systems
- Roman numerals add and subtract symbols (XIV = 10 + 4) and have no zero, making written arithmetic hard.
- Tally marks are the simplest system: one mark per object.
H: Systems of numbers
- "Number system" also means a family of numbers: natural numbers ⊂ integers ⊂ rationals ⊂ reals ⊂ complex numbers. The next lessons cover each.
X: Write 2,046 as a sum of place values, and as a Roman numeral.
> 2,046 = 2 × 1000 + 0 × 100 + 4 × 10 + 6 × 1
> Roman: 2000 = MM, 40 = XL, 6 = VI, so 2,046 = MMXLVI
K: In a positional system, place gives value and zero holds empty places; the base sets the multiplier between places.
!: Forgetting the zero placeholder, writing 2,046 as 246.
Q: What is the value of the 5 in 3,507? | 500: five hundreds.
Q: Why is zero important in a positional system? | It holds empty places, so 3,507 and 357 can be told apart.
SUM: Our number system is positional with base 10.
SUM: Other bases and systems represent the same numbers differently.
SRC: Courant R, Robbins H, What Is Mathematics? (2nd edn, Oxford University Press 1996) | textbook | 1996 | https://global.oup.com/
SRC: Department for Education, Mathematics programmes of study: key stage 3 | standard | 2013 | https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study
M1#maths-u01-03-q1@1: What is the value of the digit 4 in 64,215? | 4,000 | 4 | 40 | 400 | 40,000 | The 4 is in the thousands place, so it's worth 4 × 1,000 = 4,000.
M2#maths-u01-03-q2@2: Why are written calculations hard with Roman numerals? | They aren't positional and have no zero | They use letters instead of digits only | They only go up to 100 | They can't show odd numbers | They're base 2 | Positional notation lets column methods work; Roman numerals don't line up by place value.

## Natural Numbers
S: The natural numbers are the counting numbers 1, 2, 3, … (and, in many university courses, 0 as well). They're the starting point for all other numbers and the setting for primes, divisibility and induction.
O: Define the natural numbers and their properties
O: Identify which operations keep you within the natural numbers
T: Natural numbers | The counting numbers 1, 2, 3, …, written ℕ; some definitions include 0
T: Closed | A set is closed under an operation if applying it to members always gives a member
H: Properties
- ℕ is infinite: there's no largest natural number, because n + 1 is always bigger.
- ℕ is **closed** under addition and multiplication: the sum and product of natural numbers are natural numbers.
- It isn't closed under subtraction (3 − 5 isn't natural) or division (3 ÷ 5 isn't natural), which is why we extend to integers and rationals.
- Every non-empty set of natural numbers has a smallest member (the well-ordering principle), the basis of proof by induction.
H: Conventions
- School maths usually starts at 1; university and computing courses often include 0 (ℕ₀ or ℕ with 0). Check the convention in use.
X: Is the set of natural numbers closed under the operation "find the difference between two numbers, larger minus smaller"?
> For any natural numbers a and b with a > b, a − b is natural (for example 9 − 4 = 5).
> But if a = b, a − b = 0, which is natural only if your convention includes 0.
> So the answer depends on the convention: yes if 0 ∈ ℕ, no otherwise.
K: The natural numbers are the counting numbers; they're closed under addition and multiplication but not subtraction or division.
!: Assuming everyone agrees whether 0 is a natural number.
Q: Is ℕ closed under subtraction? | No: for example 3 − 5 = −2 isn't natural.
Q: Why is there no largest natural number? | For any n, n + 1 is also natural and bigger.
SUM: ℕ is the set of counting numbers.
SUM: Closure fails under subtraction and division, motivating larger number systems.
SRC: Courant R, Robbins H, What Is Mathematics? (2nd edn, Oxford University Press 1996) | textbook | 1996 | https://global.oup.com/
SRC: Liebeck M, A Concise Introduction to Pure Mathematics (4th edn, CRC Press 2015) | textbook | 2015 | https://www.routledge.com/
M1#maths-u01-04-q1@1: Which of these is a natural number in every convention? | 7 | 0 | −2 | 1/2 | 0.5 | 7 is a counting number; 0 depends on the convention.
M2#maths-u01-04-q2@2: Under which operation is ℕ closed? | Multiplication | Subtraction | Division | Taking square roots | Halving | The product of two natural numbers is always natural.

## Integers
S: The integers extend the natural numbers to include zero and the negatives: …, −2, −1, 0, 1, 2, …. They let us subtract freely and describe temperatures, debts and directions.
O: Calculate with negative numbers
O: Order integers and use them in context
T: Integers | The whole numbers, positive, negative and zero, written ℤ
T: Absolute value | The distance of a number from zero, written |x|, so |−5| = 5
H: Calculating with negatives
- Adding a negative is subtracting: 6 + (−4) = 2.
- Subtracting a negative is adding: 6 − (−4) = 10.
- Multiplying or dividing: same signs give a positive, different signs a negative: (−3) × (−4) = 12, (−12) ÷ 4 = −3.
H: Ordering and context
- On a number line, numbers increase to the right: −7 < −2 < 0 < 3.
- −7 is less than −2, even though 7 > 2.
- Contexts: temperature changes, bank balances, floors below ground, heights below sea level.
X: The temperature at 06:00 is −5 °C. By 14:00 it has risen by 9 °C, then it falls by 12 °C overnight. What is the final temperature?
> −5 + 9 = 4 °C
> 4 − 12 = −8 °C
> The final temperature is −8 °C.
- Zero is neither positive nor negative, and every integer has an opposite (additive inverse): 5 and −5 add to 0.
- Multiplying by −1 reflects a number in zero on the number line, which is why two negatives multiply to a positive.
- Integers are closed under addition, subtraction and multiplication, but not division: 7 ÷ 2 isn't an integer.
K: Adding a negative subtracts, subtracting a negative adds, and same signs multiply to a positive.
!: Thinking −7 is greater than −2 because 7 is greater than 2.
Q: What is 6 − (−4)? | 10: subtracting a negative is adding.
Q: Which is greater, −7 or −2? | −2, because it's further right on the number line.
SUM: Integers include zero and the negatives.
SUM: Sign rules govern calculations with negatives.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: National Centre for Excellence in the Teaching of Mathematics, Secondary mastery professional development materials: directed number | guidance | 2019 | https://www.ncetm.org.uk/
NUM1#maths-u01-05-q1@1: Work out (−6) × (−7) − 50. | -8 | 0 |  | (−6) × (−7) = 42 (same signs give a positive), and 42 − 50 = −8.
M1#maths-u01-05-q2@1: What is −3 − 5? | −8 | 2 | −2 | 8 | 15 | Starting at −3 and moving 5 to the left reaches −8.
M2#maths-u01-05-q3@2: What is (−24) ÷ (−6) × (−2)? | −8 | 8 | 2 | −2 | −12 | Left to right: (−24) ÷ (−6) = 4, then 4 × (−2) = −8.

## Rational Numbers
S: Rational numbers are numbers that can be written as a fraction of two integers, p/q with q not zero. They include all integers, fractions and terminating or recurring decimals, and they're closed under all four operations (except dividing by zero).
O: Identify rational numbers in different forms
O: Convert recurring decimals to fractions
T: Rational number | A number that can be written as p/q, where p and q are integers and q ≠ 0, written ℚ
T: Recurring decimal | A decimal with a repeating block of digits, such as 0.272727… = 0.\\dot{2}\\dot{7}
H: Forms of rational numbers
- Integers: 5 = 5/1. Fractions: 3/8. Terminating decimals: 0.375 = 3/8. Recurring decimals: 0.333… = 1/3.
- Every rational number's decimal either terminates or recurs; a fraction in lowest terms terminates exactly when its denominator has no prime factors other than 2 and 5.
- Between any two rationals there's another rational (their mean), so they're "dense" on the number line.
H: Converting recurring decimals
- Let x be the decimal, multiply by a power of 10 to line up the repeats, then subtract.
X: Write 0.272727… as a fraction in its simplest form.
> Let x = 0.272727…
> Then 100x = 27.272727…
> Subtract: 99x = 27, so x = 27/99 = 3/11
- The rationals aren't complete: there are gaps, such as √2, which the real numbers fill.
K: Rationals are fractions of integers; their decimals terminate or recur, and recurring decimals convert by multiplying and subtracting.
!: Thinking 0.999… is less than 1: by the same method, it equals 1.
Q: Is 0.125 rational? | Yes: 0.125 = 1/8.
Q: Which fractions in lowest terms give terminating decimals? | Those whose denominators have only 2 and 5 as prime factors.
SUM: Rational numbers are fractions of integers.
SUM: Recurring decimals can be written as fractions.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: Liebeck M, A Concise Introduction to Pure Mathematics (4th edn, CRC Press 2015) | textbook | 2015 | https://www.routledge.com/
M1#maths-u01-06-q1@1: Which number is rational? | 0.454545… | √2 | π | √3 | e | Any recurring decimal is rational: 0.4545… = 5/11.
M2#maths-u01-06-q2@2: Which fraction gives a terminating decimal? | 7/40 | 1/3 | 2/7 | 5/6 | 4/9 | 40 = 2^{3} × 5, so 7/40 = 0.175 terminates.
M3#maths-u01-06-q3@2: What is 0.\\dot{1}\\dot{8} as a fraction in its simplest form? | 2/11 | 18/100 | 9/50 | 1/8 | 18/90 | Let x = 0.1818…; then 100x − x = 18, so x = 18/99, which simplifies to 2/11.

## Irrational Numbers
S: An irrational number can't be written as a fraction of two integers. Its decimal goes on forever without repeating. Famous examples are √2, π and e, and there are, in a precise sense, far more irrationals than rationals.
O: Identify irrational numbers
O: Follow the proof that √2 is irrational
T: Irrational number | A real number that can't be written as p/q with integers p and q
T: Proof by contradiction | A proof that assumes the opposite of what you want, and shows it leads to something impossible
H: Examples
- √n is irrational whenever n is a natural number that isn't a perfect square: √2, √3, √5, √8.
- π (the ratio of a circle's circumference to its diameter) and e (the base of natural logarithms) are irrational.
- The sum of a rational and an irrational is irrational, but two irrationals can sum to a rational: √2 + (−√2) = 0.
H: Why √2 is irrational
P: Suppose √2 = p/q in lowest terms. Then p^{2} = 2q^{2}, so p^{2} is even, so p is even: p = 2k. Then 4k^{2} = 2q^{2}, so q^{2} = 2k^{2} and q is even too. But then p/q wasn't in lowest terms: a contradiction. So √2 is irrational.
X: Is √50 rational or irrational? Simplify it.
> 50 = 25 × 2, so √50 = √25 × √2 = 5√2
> 5 is rational and √2 is irrational, and a non-zero rational times an irrational is irrational
> So √50 = 5√2 is irrational
K: Irrationals can't be written as fractions; their decimals never end or repeat; √2 is irrational by contradiction.
!: Thinking 22/7 equals π: it's only an approximation (π is irrational).
Q: Why must p be even if p^{2} is even? | If p were odd, p^{2} would be odd.
Q: Can two irrational numbers add up to a rational number? | Yes: for example √2 + (−√2) = 0.
SUM: Irrational numbers have non-repeating, non-terminating decimals.
SUM: The irrationality of √2 is the classic proof by contradiction.
SRC: Hardy GH, Wright EM, An Introduction to the Theory of Numbers (6th edn, Oxford University Press 2008) | textbook | 2008 | https://global.oup.com/
SRC: Department for Education, Mathematics AS and A level subject content: proof | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
M1#maths-u01-07-q1@1: Which number is irrational? | √7 | √49 | 0.25 | 3/11 | −4 | 7 isn't a perfect square, so √7 is irrational.
M2#maths-u01-07-q2@2: In the proof that √2 is irrational, what gives the contradiction? | Both p and q turn out to be even, though p/q was in lowest terms | p turns out to be negative | q turns out to be zero | √2 turns out to equal 1 | p^{2} turns out to be odd | Lowest terms means p and q share no common factor, but both are even.
M3#maths-u01-07-q3@2: Which product is rational? | √8 × √2 | √2 × √3 | π × 2 | √5 × 3 | e × e | √8 × √2 = √16 = 4, a whole number, so it's rational; the others are irrational.

## Real Numbers
S: The real numbers are all the rational and irrational numbers together: every point on the number line. They're the numbers of measurement and calculus.
O: Classify numbers as natural, integer, rational, irrational or real
O: Describe the real number line and intervals
T: Real numbers | All rational and irrational numbers, written ℝ
T: Interval | A set of real numbers between two endpoints, such as [2, 5) = {x : 2 ≤ x < 5}
H: Classifying numbers
- ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ: every natural number is an integer, every integer is rational, and every rational is real.
- ℝ = ℚ together with the irrationals.
- Numbers like √−1 aren't real: they're complex numbers (School 3).
H: The number line and intervals
- Every real number is a point on the number line, with no gaps (the reals are "complete").
- Interval notation: [a, b] includes both ends; (a, b) excludes both; [a, b) includes a only. Inequalities say the same: 2 ≤ x < 5.
- On a number line, a filled circle includes an endpoint; an open circle excludes it.
X: Classify each of −3, 0.75, √9, √10 and π as natural, integer, rational, irrational or real (all that apply).
> −3: integer, rational, real
> 0.75 = 3/4: rational, real
> √9 = 3: natural, integer, rational, real
> √10 and π: irrational, real
- The real numbers can be ordered, added, multiplied and divided (except by zero) with all the familiar rules: they form a field.
K: The reals are every point on the number line: rational and irrational numbers together.
!: Forgetting that integers and natural numbers are also rational and real.
Q: Is every rational number real? | Yes: ℚ ⊂ ℝ.
Q: What does the interval (1, 4] mean? | All real x with 1 < x ≤ 4.
SUM: The real numbers fill the number line.
SUM: Number sets nest inside one another.
SRC: Liebeck M, A Concise Introduction to Pure Mathematics (4th edn, CRC Press 2015) | textbook | 2015 | https://www.routledge.com/
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
M1#maths-u01-08-q1@1: Which set contains π? | The real numbers | The integers | The rational numbers | The natural numbers | None of them | π is irrational, so it's real but not rational.
M2#maths-u01-08-q2@2: Which inequality matches the interval [−2, 3)? | −2 ≤ x < 3 | −2 < x ≤ 3 | −2 < x < 3 | −2 ≤ x ≤ 3 | x < −2 or x ≥ 3 | The square bracket includes −2; the round bracket excludes 3.

## Factors and Multiples
S: A factor of a number divides it exactly; a multiple is the result of multiplying it by a whole number. Factors and multiples are the language of divisibility, fractions and primes.
O: List all the factors of a number systematically
O: Identify multiples and common factors and multiples
T: Factor | A whole number that divides another exactly: the factors of 12 are 1, 2, 3, 4, 6, 12
T: Multiple | The product of a number and a whole number: multiples of 7 are 7, 14, 21, …
H: Finding factors
- Work in **factor pairs** from 1 upwards: 36 = 1 × 36 = 2 × 18 = 3 × 12 = 4 × 9 = 6 × 6.
- Stop when the pairs meet (at or before √n): this guarantees you haven't missed any.
- A square number has an odd number of factors, because one pair repeats (6 × 6).
H: Multiples and common ones
- Every number has infinitely many multiples but finitely many factors.
- Common factors of 18 and 24: 1, 2, 3, 6 (the highest is the HCF).
- Common multiples of 4 and 6: 12, 24, 36, … (the lowest is the LCM).
X: List the factors of 60 in pairs.
> 1 × 60, 2 × 30, 3 × 20, 4 × 15, 5 × 12, 6 × 10
> 7 doesn't divide 60, and the next pair would pass √60 ≈ 7.7
> Factors: 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60 (12 factors)
- A number with exactly two factors is prime; 1 has only one factor.
- Factors are always less than or equal to the number; multiples are always greater than or equal to it.
K: List factors in pairs up to the square root; multiples go on for ever, factors don't.
!: Confusing factors and multiples: 3 is a factor of 12; 12 is a multiple of 3.
Q: Why can you stop searching for factor pairs at √n? | Beyond √n, the pairs repeat in reverse.
Q: Why do square numbers have an odd number of factors? | One factor pair repeats, such as 6 × 6 for 36.
SUM: Factors divide exactly; multiples are products.
SUM: Pairs up to √n find all factors.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: National Centre for Excellence in the Teaching of Mathematics, Secondary mastery professional development materials: multiplicative relationships | guidance | 2019 | https://www.ncetm.org.uk/
NUM1#maths-u01-09-q1@1: How many factors does 48 have? | 10 | 0 |  | 1×48, 2×24, 3×16, 4×12, 6×8: five pairs, so 10 factors.
M1#maths-u01-09-q2@1: Which number is a multiple of 8? | 72 | 4 | 20 | 36 | 50 | 72 = 8 × 9, so 72 is in the 8 times table; the others aren't.
M2#maths-u01-09-q3@2: Which number has an odd number of factors? | 49 | 50 | 30 | 12 | 18 | 49 is a square number (7 × 7), so one factor pair repeats.

## Divisibility
S: Divisibility tests tell you whether one number divides another without doing the division. They speed up factorising, simplifying fractions and spotting primes.
O: Apply divisibility tests for 2, 3, 4, 5, 6, 8, 9 and 10
O: Explain why the digit-sum test for 3 and 9 works
T: Divisible | a is divisible by b if a ÷ b is a whole number, written b | a
T: Digit sum | The total of a number's digits
H: The tests
- **2**: last digit even. **5**: last digit 0 or 5. **10**: last digit 0.
- **4**: last two digits divisible by 4. **8**: last three digits divisible by 8.
- **3**: digit sum divisible by 3. **9**: digit sum divisible by 9.
- **6**: divisible by both 2 and 3.
- **11**: alternating sum of digits divisible by 11 (for 2,728: 2 − 7 + 2 − 8 = −11).
H: Why the digit-sum test works
P: 10 = 9 + 1, so 10, 100, 1000, … each leave remainder 1 when divided by 9 (or 3). So a number leaves the same remainder as its digit sum. For example 4,725 = 4 × 1000 + 7 × 100 + 2 × 10 + 5, which has the same remainder as 4 + 7 + 2 + 5 = 18 when divided by 9: none.
X: Is 7,128 divisible by 6? By 8? By 9?
> 6: it's even, and its digit sum is 7 + 1 + 2 + 8 = 18, divisible by 3, so yes
> 8: the last three digits, 128 = 8 × 16, so yes
> 9: the digit sum 18 is divisible by 9, so yes
- Divisibility is transitive: if 4 divides 12 and 12 divides 36, then 4 divides 36.
K: Use last-digit tests for 2, 4, 5, 8 and 10, digit sums for 3 and 9, and combine tests for 6.
!: Using the digit-sum test for 6 alone: a number also needs to be even.
Q: How do you test for divisibility by 4? | Check whether the last two digits form a multiple of 4.
Q: Why does the digit-sum test work for 9? | Each power of 10 leaves remainder 1 on division by 9.
SUM: Divisibility tests avoid long division.
SUM: The digit-sum tests come from 10 leaving remainder 1.
SRC: Hardy GH, Wright EM, An Introduction to the Theory of Numbers (6th edn, Oxford University Press 2008) | textbook | 2008 | https://global.oup.com/
SRC: Department for Education, Mathematics programmes of study: key stage 3 | standard | 2013 | https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study
M1#maths-u01-10-q1@1: Which number is divisible by 9? | 5,814 | 5,813 | 5,812 | 5,810 | 5,815 | 5 + 8 + 1 + 4 = 18, which is divisible by 9.
M2#maths-u01-10-q2@2: Which number is divisible by 6? | 2,334 | 2,335 | 1,334 | 2,333 | 1,331 | 2,334 is even and its digit sum 12 is divisible by 3.
M3#maths-u01-10-q3@2: Which test shows 3,512 is divisible by 8? | 512 = 8 × 64 | 3 + 5 + 1 + 2 = 11 | 12 is divisible by 4 | It ends in 2 | 35 is odd | Divisibility by 8 depends on the last three digits.

## Prime Numbers
S: A prime number has exactly two factors: 1 and itself. Primes are the building blocks of the whole numbers, and their mysteries drive both number theory and modern cryptography.
O: Identify prime numbers and explain why 1 isn't prime
O: Use a sieve and trial division to find primes
T: Prime number | A natural number greater than 1 whose only factors are 1 and itself
T: Sieve of Eratosthenes | A method for listing primes by crossing out multiples of each prime in turn
H: Recognising primes
- The primes under 50: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47.
- 2 is the only even prime. 1 isn't prime: it has only one factor, and excluding it keeps prime factorisation unique.
- **Trial division**: to test n, try dividing by primes up to √n. If none divides it, n is prime.
H: How many primes?
P: There are infinitely many primes (Euclid). Suppose there were only finitely many, p₁, …, pₖ. Then N = p₁ × … × pₖ + 1 leaves remainder 1 on division by each of them, so N has a prime factor not in the list: a contradiction.
X: Is 221 prime?
> √221 ≈ 14.9, so test the primes 2, 3, 5, 7, 11 and 13
> 2, 3, 5, 7 and 11 don't divide 221
> 221 ÷ 13 = 17, so 221 = 13 × 17 isn't prime
- Primes become rarer among larger numbers: around n, roughly 1 in every ln(n) numbers is prime (the prime number theorem, School 2).
- Large primes, hundreds of digits long, are the basis of RSA encryption, which secures online payments.
K: Primes have exactly two factors; test by dividing by primes up to √n; there are infinitely many.
!: Calling 1 a prime, or 9, 15 or 21 primes because they're odd.
Q: Why isn't 1 a prime number? | It has only one factor, and excluding it keeps prime factorisation unique.
Q: Up to what number must you test when checking if n is prime? | √n.
SUM: Primes have exactly two factors.
SUM: Euclid proved there are infinitely many primes.
SRC: Hardy GH, Wright EM, An Introduction to the Theory of Numbers (6th edn, Oxford University Press 2008) | textbook | 2008 | https://global.oup.com/
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
M1#maths-u01-11-q1@1: Which number is prime? | 37 | 39 | 51 | 57 | 91 | 37 has no factors other than 1 and 37; 39 = 3 × 13, 51 = 3 × 17, 57 = 3 × 19, 91 = 7 × 13.
M2#maths-u01-11-q2@2: To test whether 199 is prime, which primes must you try? | 2, 3, 5, 7, 11 and 13 | All primes up to 199 | Only 2 and 3 | All odd numbers up to 100 | 2, 3 and 5 only | √199 ≈ 14.1, so primes up to 13 are enough.
NUM1#maths-u01-11-q3@2: What is the sum of the prime numbers between 20 and 40? | 120 | 0 |  | The primes are 23, 29, 31 and 37, which add to 120.

## Composite Numbers
S: A composite number is a natural number greater than 1 that isn't prime: it has at least one factor other than 1 and itself. Every composite number breaks down into primes.
O: Distinguish prime, composite and neither
O: Find a factor pair that shows a number is composite
T: Composite number | A natural number greater than 1 with more than two factors
T: Proper factor | A factor other than 1 and the number itself
H: Classifying
- 1 is neither prime nor composite.
- Composite numbers include every even number greater than 2, every multiple of a prime greater than that prime, and every square of a whole number greater than 1.
- To show a number is composite, give one factor pair: 91 = 7 × 13.
H: Runs of composites
- There are arbitrarily long runs of composite numbers: n! + 2, n! + 3, …, n! + n are all composite (n! + k is divisible by k).
- So gaps between consecutive primes can be as large as you like.
X: Find five consecutive composite numbers.
> Use 6! = 720
> 722, 723, 724, 725, 726 are divisible by 2, 3, 4, 5 and 6 respectively
> (There are smaller examples, such as 24, 25, 26, 27, 28.)
- Every composite number n has a prime factor no bigger than √n, which is why trial division only needs to go up to √n.
- Composite numbers can be co-prime with each other: 8 and 9 share no factors.
K: Composites have proper factors; one factor pair is enough to prove a number composite.
!: Thinking an odd number must be prime: 91 = 7 × 13 is composite.
Q: Is 1 prime, composite or neither? | Neither.
Q: How do you prove 87 is composite? | Show a factor pair: 87 = 3 × 29.
SUM: Composites have more than two factors.
SUM: There are arbitrarily long runs of composite numbers.
SRC: Hardy GH, Wright EM, An Introduction to the Theory of Numbers (6th edn, Oxford University Press 2008) | textbook | 2008 | https://global.oup.com/
SRC: Department for Education, Mathematics programmes of study: key stage 3 | standard | 2013 | https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study
M1#maths-u01-12-q1@1: Which number is composite? | 119 | 113 | 109 | 107 | 103 | 119 = 7 × 17, so it has factors other than 1 and itself; the others are prime.
M2#maths-u01-12-q2@2: Why is 6! + 4 composite? | It's divisible by 4 | It's even and greater than 2 only by coincidence | It's a square number | It's divisible by 7 | 6! is prime | 6! = 720 is divisible by 4, so 720 + 4 is too.

## Prime Factorisation
S: Every whole number greater than 1 can be written as a product of primes in exactly one way, apart from order. This "fundamental theorem of arithmetic" makes prime factorisation a powerful tool for HCFs, LCMs, roots and fractions.
O: Write a number as a product of prime factors using index notation
O: Use prime factorisation to test for squares and cubes
T: Prime factorisation | Writing a number as a product of primes, such as 360 = 2^{3} × 3^{2} × 5
T: Fundamental theorem of arithmetic | Every integer greater than 1 has a unique prime factorisation, up to order
H: Finding the factorisation
- **Factor tree**: split into any factor pair and keep splitting until every branch ends in a prime.
- **Repeated division**: divide by 2 as often as possible, then 3, then 5, and so on.
- Write the answer in index form, primes in ascending order.
H: Using it
- A number is a **square** if every power in its factorisation is even: 3,600 = 2^{4} × 3^{2} × 5^{2}, so √3,600 = 2^{2} × 3 × 5 = 60.
- A **cube** has every power a multiple of 3.
- Factorisation gives HCF and LCM (next lessons) and simplifies surds.
X: Write 1,764 as a product of prime factors, and decide whether it's a square number.
> 1,764 ÷ 2 = 882, ÷ 2 = 441
> 441 ÷ 3 = 147, ÷ 3 = 49, and 49 = 7 × 7
> 1,764 = 2^{2} × 3^{2} × 7^{2}: every power is even, so it's a square: √1,764 = 2 × 3 × 7 = 42
- Factorising large numbers is very hard for computers, which is what keeps RSA encryption secure.
K: Every whole number above 1 has one prime factorisation; even powers mean a square, multiples of 3 mean a cube.
!: Leaving a composite number (such as 9) in the "product of primes".
Q: What is 72 as a product of prime factors? | 2^{3} × 3^{2}.
Q: How can you tell from its factorisation that a number is a perfect square? | Every prime's power is even.
SUM: Prime factorisation is unique.
SUM: It reveals squares, cubes and common factors.
SRC: Hardy GH, Wright EM, An Introduction to the Theory of Numbers (6th edn, Oxford University Press 2008) | textbook | 2008 | https://global.oup.com/
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
M1#maths-u01-13-q1@1: What is 84 as a product of prime factors? | 2^{2} × 3 × 7 | 2 × 42 | 4 × 21 | 2^{2} × 21 | 2 × 3 × 14 | 84 = 2 × 2 × 3 × 7; the other answers include composite factors.
M2#maths-u01-13-q2@2: What is the smallest number you can multiply 2^{3} × 3 × 5^{2} by to make a square? | 6 | 2 | 3 | 5 | 30 | Multiplying by 2 × 3 makes the powers 2^{4} × 3^{2} × 5^{2}, all even.
NUM1#maths-u01-13-q3@2: 2^{a} × 3^{b} = 648. What is a + b? | 7 | 0 |  | 648 = 8 × 81 = 2^{3} × 3^{4}, so a + b = 3 + 4 = 7.

## Greatest Common Divisor (GCD)
S: The greatest common divisor (GCD), called the highest common factor (HCF) at GCSE, is the largest number that divides two numbers exactly. It simplifies fractions and solves sharing and tiling problems.
O: Find the HCF by listing, by prime factorisation and by Euclid's algorithm
O: Use the HCF to solve problems
T: Highest common factor (HCF) | The largest number that is a factor of two or more numbers; also called the greatest common divisor
T: Co-prime | Two numbers whose HCF is 1, such as 8 and 15
H: Three methods
- **Listing**: factors of 24 are 1, 2, 3, 4, 6, 8, 12, 24; of 36 are 1, 2, 3, 4, 6, 9, 12, 18, 36; HCF = 12.
- **Prime factors**: take each common prime to its lowest power: 24 = 2^{3} × 3, 36 = 2^{2} × 3^{2}, HCF = 2^{2} × 3 = 12.
- **Euclid's algorithm**: replace the larger number with the remainder when dividing: HCF(36, 24) = HCF(24, 12) = HCF(12, 0) = 12. It's fast even for huge numbers.
H: Uses
- Simplifying fractions: 24/36 = 2/3 after dividing by the HCF 12.
- The largest square tile that exactly covers a 24 cm by 36 cm rectangle is 12 cm.
X: Find the HCF of 252 and 198 using prime factors, then check with Euclid's algorithm.
> 252 = 2^{2} × 3^{2} × 7 and 198 = 2 × 3^{2} × 11
> Common primes to the lowest powers: 2 × 3^{2} = 18
> Euclid: 252 = 1 × 198 + 54; 198 = 3 × 54 + 36; 54 = 1 × 36 + 18; 36 = 2 × 18 + 0, so HCF = 18
K: The HCF takes common primes to their lowest powers; Euclid's algorithm finds it by repeated remainders.
!: Taking the highest powers for the HCF (that gives the LCM).
Q: How do you find the HCF from prime factorisations? | Multiply the common primes, each to the lowest power it appears.
Q: What does co-prime mean? | The numbers have HCF 1.
SUM: The HCF is the largest common factor.
SUM: Euclid's algorithm finds it efficiently.
SRC: Hardy GH, Wright EM, An Introduction to the Theory of Numbers (6th edn, Oxford University Press 2008) | textbook | 2008 | https://global.oup.com/
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
NUM1#maths-u01-14-q1@1: Find the HCF of 84 and 126. | 42 | 0 |  | 84 = 2^{2} × 3 × 7 and 126 = 2 × 3^{2} × 7, so HCF = 2 × 3 × 7 = 42.
M1#maths-u01-14-q2@1: Which pair of numbers is co-prime? | 9 and 16 | 6 and 15 | 8 and 12 | 14 and 21 | 10 and 25 | 9 = 3^{2} and 16 = 2^{4} share no prime factors.
M2#maths-u01-14-q3@2: A 48 cm by 60 cm board is covered exactly with the largest possible identical square tiles. How wide is each tile? | 12 cm | 6 cm | 4 cm | 24 cm | 240 cm | The tile width must divide both 48 and 60: the largest such number is the HCF, 12.

## Least Common Multiple (LCM)
S: The least common multiple (LCM), called the lowest common multiple at GCSE, is the smallest number that is a multiple of two numbers. It finds common denominators and solves "when do they coincide again?" problems.
O: Find the LCM by listing and by prime factorisation
O: Use HCF × LCM = product for two numbers
T: Lowest common multiple (LCM) | The smallest positive number that is a multiple of two or more numbers
T: Common denominator | A shared denominator for adding or subtracting fractions, usually the LCM of the denominators
H: Methods
- **Listing**: multiples of 6 are 6, 12, 18, 24, …; of 8 are 8, 16, 24, …; LCM = 24.
- **Prime factors**: take every prime that appears to its highest power: 6 = 2 × 3, 8 = 2^{3}, LCM = 2^{3} × 3 = 24.
- For two numbers, HCF × LCM = the product: 2 × 24 = 6 × 8 = 48.
H: Uses
- Adding 5/6 + 3/8: the common denominator is 24, giving 20/24 + 9/24 = 29/24.
- Buses leaving every 12 and 18 minutes next leave together after LCM(12, 18) = 36 minutes.
X: Two lighthouses flash every 20 seconds and every 45 seconds. They flash together at 21:00:00. When do they next flash together?
> 20 = 2^{2} × 5 and 45 = 3^{2} × 5
> LCM = 2^{2} × 3^{2} × 5 = 180 seconds
> They next flash together after 3 minutes, at 21:03:00.
- The LCM of co-prime numbers is their product: LCM(8, 9) = 72.
- The LCM of three numbers: take each prime to its highest power across all three.
K: The LCM takes every prime to its highest power; for two numbers, HCF × LCM equals their product.
!: Multiplying the two numbers and calling it the LCM: 6 × 8 = 48, but the LCM is 24.
Q: What is the LCM of 4 and 10? | 20.
Q: For two numbers, how are the HCF and LCM related? | HCF × LCM = the product of the numbers.
SUM: The LCM is the smallest common multiple.
SUM: It gives common denominators and coincidence times.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: Hardy GH, Wright EM, An Introduction to the Theory of Numbers (6th edn, Oxford University Press 2008) | textbook | 2008 | https://global.oup.com/
NUM1#maths-u01-15-q1@1: Find the LCM of 18 and 30. | 90 | 0 |  | 18 = 2 × 3^{2} and 30 = 2 × 3 × 5, so the LCM is 2 × 3^{2} × 5 = 90.
M1#maths-u01-15-q2@1: What is the LCM of 9 and 12? | 36 | 108 | 3 | 72 | 21 | 9 = 3^{2}, 12 = 2^{2} × 3, so the LCM is 2^{2} × 3^{2} = 36.
M3#maths-u01-15-q3@2: Two numbers have HCF 6 and LCM 72. One is 18. What is the other? | 24 | 12 | 36 | 4 | 54 | For two numbers, HCF × LCM = their product: 6 × 72 = 432, and 432 ÷ 18 = 24.

## Fractions
S: A fraction represents part of a whole, or a division: 3/4 means 3 ÷ 4. Understanding equivalent fractions and simplifying is the key to calculating with them.
O: Find equivalent fractions and simplify fractions
O: Convert between improper fractions and mixed numbers, and compare fractions
T: Equivalent fractions | Fractions with the same value, such as 2/3 = 8/12
T: Improper fraction | A fraction whose numerator is greater than or equal to its denominator, such as 7/4 = 1¾
H: Meaning and equivalence
- The denominator says how many equal parts the whole is split into; the numerator says how many you have.
- Multiplying or dividing the top and bottom by the same non-zero number gives an equivalent fraction.
- **Simplest form**: divide the top and bottom by their HCF: 18/24 = 3/4.
H: Mixed numbers and comparing
- 17/5 = 3 remainder 2, so 3⅖. Back again: 3⅖ = (3 × 5 + 2)/5 = 17/5.
- To compare, write with a common denominator (or convert to decimals): 5/8 = 15/24 and 2/3 = 16/24, so 2/3 is bigger.
- A fraction of an amount: 3/5 of 40 = 40 ÷ 5 × 3 = 24.
X: Put 3/4, 5/7 and 7/10 in order, smallest first.
> The LCM of 4, 7 and 10 is 140
> 3/4 = 105/140, 5/7 = 100/140, 7/10 = 98/140
> Order: 7/10, 5/7, 3/4
- A unit fraction has numerator 1, such as 1/5; every fraction is a multiple of a unit fraction: 3/5 = 3 × 1/5.
- A fraction with denominator 0 is undefined: you can't share into zero parts.
K: Equivalent fractions come from multiplying top and bottom by the same number; compare with a common denominator.
!: Adding to the top and bottom to make equivalent fractions: 2/3 isn't equal to 3/4.
Q: What is 45/60 in its simplest form? | 3/4 (dividing by the HCF, 15).
Q: How do you find 2/7 of 63? | 63 ÷ 7 × 2 = 18.
SUM: Fractions are parts of a whole, or divisions.
SUM: Simplify using the HCF; compare using a common denominator.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: National Centre for Excellence in the Teaching of Mathematics, Secondary mastery professional development materials: fractions | guidance | 2019 | https://www.ncetm.org.uk/
M1#maths-u01-16-q1@1: Which fraction is equivalent to 3/8? | 15/40 | 6/24 | 5/10 | 9/16 | 4/9 | Multiply top and bottom by 5: 3/8 = 15/40.
M2#maths-u01-16-q2@2: Which fraction is largest? | 4/5 | 7/9 | 11/15 | 3/4 | 5/7 | As decimals: 0.8, 0.778, 0.733, 0.75, 0.714.
NUM1#maths-u01-16-q3@1: What is 3/8 of 96? | 36 | 0 |  | 96 ÷ 8 = 12, and 12 × 3 = 36.

## Decimals
S: Decimals extend place value to the right of the units: tenths, hundredths, thousandths. They're how measurements and money are written, and calculators show results as decimals.
O: Calculate with decimals using place value
O: Convert between fractions and decimals
T: Decimal place | A position after the decimal point: tenths, hundredths, thousandths
T: Terminating decimal | A decimal that ends, such as 0.375
H: Calculating with decimals
- Add and subtract by lining up the decimal points.
- Multiply by ignoring the points, then put back as many decimal places as there were in total: 0.3 × 0.04: 3 × 4 = 12, three decimal places, so 0.012.
- Divide by a decimal by multiplying both numbers by a power of 10: 4.2 ÷ 0.06 = 420 ÷ 6 = 70.
H: Converting
- Fraction to decimal: divide: 3/8 = 3 ÷ 8 = 0.375.
- Decimal to fraction: use place value and simplify: 0.45 = 45/100 = 9/20.
- Multiplying by a number between 0 and 1 makes things smaller; dividing by one makes things bigger.
X: Work out 2.4 × 0.35 without a calculator.
> 24 × 35 = 840
> There are 1 + 2 = 3 decimal places in the question
> 2.4 × 0.35 = 0.840 = 0.84
- Multiplying by 10, 100 or 1,000 moves every digit 1, 2 or 3 places to the left; dividing moves them to the right.
- Compare decimals place by place from the left: 0.45 and 0.405 have the same tenths, but 0.45 has 5 hundredths and 0.405 has none, so 0.45 is bigger.
K: Line up points to add, count decimal places to multiply, and scale both numbers to divide.
!: Thinking 0.3 × 0.3 = 0.9: it's 0.09.
Q: What is 4.2 ÷ 0.06? | 70: multiply both by 100 to get 420 ÷ 6.
Q: What is 0.45 as a fraction in its simplest form? | 9/20.
SUM: Decimals use place value to the right of the point.
SUM: Fractions and decimals convert by dividing or by place value.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: National Centre for Excellence in the Teaching of Mathematics, Secondary mastery professional development materials: place value | guidance | 2019 | https://www.ncetm.org.uk/
NUM1#maths-u01-17-q1@1: Work out 0.7 × 0.08. | 0.056 | 0 |  | 7 × 8 = 56, and there are three decimal places in total, so 0.056.
M1#maths-u01-17-q2@1: What is 7/20 as a decimal? | 0.35 | 0.7 | 0.207 | 3.5 | 0.72 | Multiply top and bottom by 5: 7/20 = 35/100 = 0.35.
M2#maths-u01-17-q3@2: Which calculation gives an answer greater than 50? | 50 ÷ 0.8 | 50 × 0.8 | 50 − 0.8 × 2 | 50 × 0.99 | 50 ÷ 1.2 | Dividing by a number less than 1 makes the result bigger: 50 ÷ 0.8 = 62.5.

## Percentages
S: A percentage is a fraction out of 100. Percentages compare proportions on a common scale and appear everywhere: discounts, interest, test scores and statistics.
O: Convert between percentages, fractions and decimals
O: Find a percentage of an amount and express one quantity as a percentage of another
T: Percentage | A number of parts per hundred: 35% = 35/100 = 0.35
T: Multiplier | The decimal you multiply by to find a percentage of an amount: 35% gives 0.35
H: Conversions
- 35% = 35/100 = 7/20 = 0.35.
- 0.125 = 12.5%; 3/8 = 0.375 = 37.5%.
- Useful facts: 50% = ½, 25% = ¼, 10% = 1/10, 1% = 1/100, 33⅓% = ⅓.
H: Calculating
- **Percentage of an amount**: multiply by the multiplier: 35% of 240 = 0.35 × 240 = 84. Without a calculator, build from 10% and 5%.
- **One quantity as a percentage of another**: divide and multiply by 100: 18 out of 24 = 18 ÷ 24 × 100 = 75%.
- Make units match first: 45 minutes as a percentage of 2 hours = 45 ÷ 120 × 100 = 37.5%.
X: Without a calculator, find 17.5% of £360.
> 10% = £36, 5% = £18, 2.5% = £9
> 17.5% = 10% + 5% + 2.5% = £36 + £18 + £9
> = £63
- Percentages can exceed 100%: 150% of 40 is 60.
- A percentage point is a difference between percentages: a rate rising from 4% to 5% is 1 percentage point, but a 25% increase.
- Percentages of percentages multiply: 50% of 20% is 10%.
- To find a percentage of an amount mentally, find 1% (divide by 100) or 10% (divide by 10) and scale up.
K: Percent means per hundred: multiply by the decimal multiplier, or divide and multiply by 100 to compare.
!: Comparing quantities in different units without converting first.
Q: What is 3/8 as a percentage? | 37.5%.
Q: How do you write 18 out of 24 as a percentage? | 18 ÷ 24 × 100 = 75%.
SUM: Percentages are fractions out of 100.
SUM: Use multipliers for percentages of amounts.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: National Centre for Excellence in the Teaching of Mathematics, Secondary mastery professional development materials: percentages | guidance | 2019 | https://www.ncetm.org.uk/
NUM1#maths-u01-18-q1@1: What is 35% of 260? | 91 | 0 |  | 0.35 × 260 = 91.
M1#maths-u01-18-q2@1: Which is 0.06 as a percentage? | 6% | 0.6% | 60% | 0.06% | 600% | To turn a decimal into a percentage, multiply by 100: 0.06 = 6/100 = 6%.
M2#maths-u01-18-q3@2: In a test, Ali scores 42 out of 56. What percentage is this? | 75% | 42% | 56% | 70% | 80% | Divide the score by the total and multiply by 100: 42 ÷ 56 = 0.75 = 75%.

## Percentage Change and Reverse Percentages
S: Percentage change measures an increase or decrease relative to the original amount. Reverse percentages work backwards from a changed amount to the original, a common exam question and a common source of everyday mistakes.
O: Increase or decrease an amount by a percentage using multipliers
O: Find the original amount before a percentage change
T: Percentage change | (change ÷ original) × 100
T: Reverse percentage | Finding the original value when you know the value after a percentage change
H: Percentage change
- Increase by 15%: multiply by 1.15. Decrease by 15%: multiply by 0.85.
- Percentage change = (new − original) ÷ original × 100. Always divide by the **original**.
- Successive changes multiply: up 10% then down 10% is × 1.1 × 0.9 = × 0.99, a 1% decrease overall.
H: Reverse percentages
- If a price after a 20% increase is £96, then £96 is 120% of the original: original = 96 ÷ 1.2 = £80.
- Don't take 20% off £96 (that gives £76.80, which is wrong).
X: A coat costs £68 in a sale with 15% off. What was the original price?
> The sale price is 85% of the original
> Original × 0.85 = 68
> Original = 68 ÷ 0.85 = £80
- Compound changes over n periods use the multiplier to the power n: 5% growth for 3 years is × 1.05^{3}.
- Depreciation (a car losing 15% a year) uses multipliers less than 1: × 0.85^{n}.
K: Use multipliers (1 + r and 1 − r); divide by the original for percentage change; reverse by dividing by the multiplier.
!: Finding the original by adding the percentage back on to the new amount.
Q: What multiplier decreases an amount by 8%? | 0.92.
Q: A price rises 10% then falls 10%. What is the overall change? | A 1% decrease (× 1.1 × 0.9 = × 0.99).
SUM: Multipliers handle percentage increases and decreases.
SUM: Reverse percentages divide by the multiplier.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: National Centre for Excellence in the Teaching of Mathematics, Secondary mastery professional development materials: percentage change | guidance | 2019 | https://www.ncetm.org.uk/
NUM1#maths-u01-29-q1@1: A laptop's price rises from £640 to £720. What is the percentage increase? | 12.5 | 0.01 | % | The increase is £80, and 80 ÷ 640 × 100 = 12.5%.
NUM1#maths-u01-29-q2@2: After a 25% increase, a value is 150. What was the original value? | 120 | 0 |  | 150 is 125% of the original, so the original is 150 ÷ 1.25 = 120.
M3#maths-u01-29-q3@2: A shop increases prices by 20%, then reduces them by 20%. Compared with the start, prices are: | 4% lower | the same | 4% higher | 2% lower | 20% lower | The multipliers combine: × 1.2 × 0.8 = × 0.96, which is a 4% decrease overall.
M1#maths-u01-29-q4@1: Which multiplier increases an amount by 7%? | 1.07 | 0.07 | 1.7 | 0.93 | 7 | An increase of 7% keeps 100% and adds 7%, so multiply by 107% = 1.07.

## Exponents and Powers
S: A power (exponent, index) tells you how many times to multiply a number by itself. The laws of indices make calculations with powers fast, and extend naturally to zero, negative and fractional powers.
O: Apply the laws of indices
O: Evaluate zero, negative and fractional powers
T: Index (power, exponent) | The small raised number showing repeated multiplication: in 5^{3}, the index is 3
T: Base | The number being raised to a power: in 5^{3}, the base is 5
H: The laws
E: a^{m} × a^{n} = a^{m+n}; a^{m} ÷ a^{n} = a^{m−n}; (a^{m})^{n} = a^{mn}
E: a^{0} = 1 (a ≠ 0); a^{−n} = 1/a^{n}; a^{1/n} = ⁿ√a; a^{m/n} = (ⁿ√a)^{m}
- The laws apply only when the bases are the same.
H: Why these definitions?
- a^{0} = 1 keeps the division law working: a^{3} ÷ a^{3} = a^{0} and also = 1.
- a^{−2} = 1/a^{2} keeps the law working: a^{3} ÷ a^{5} = a^{−2} = 1/a^{2}.
- a^{1/2} × a^{1/2} = a^{1} = a, so a^{1/2} = √a.
X: Evaluate 27^{−2/3}.
> The negative power means a reciprocal: 1/27^{2/3}
> 27^{1/3} = 3, so 27^{2/3} = 3^{2} = 9
> 27^{−2/3} = 1/9
- Powers of 10 give place value: 10^{3} = 1,000 and 10^{−2} = 0.01.
- (ab)^{n} = a^{n}b^{n}, but (a + b)^{n} isn't a^{n} + b^{n}: (2 + 3)^{2} = 25, not 13.
- Powers grow fast: 2^{10} = 1,024, and 2^{20} is just over a million.
- A negative base with an even power is positive, (−2)^{4} = 16, and with an odd power is negative, (−2)^{3} = −8.
K: Multiply: add powers; divide: subtract; power of a power: multiply. Negative means reciprocal; fractional means root.
!: Multiplying the bases as well: 2^{3} × 2^{4} = 2^{7}, not 4^{7}.
Q: What is 5^{0}? | 1.
Q: What is 16^{3/4}? | 8: the fourth root of 16 is 2, and 2^{3} = 8.
SUM: The laws of indices simplify calculations with powers.
SUM: Zero, negative and fractional powers follow from keeping the laws consistent.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: Department for Education, Mathematics AS and A level subject content: algebra and functions | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
NUM1#maths-u01-20-q1@1: Evaluate 32^{3/5}. | 8 | 0 |  | The fifth root of 32 is 2, and 2^{3} = 8.
M1#maths-u01-20-q2@1: Simplify x^{5} × x^{3}. | x^{8} | x^{15} | x^{2} | 2x^{8} | x^{53} | Multiplying powers of the same base adds the indices: 5 + 3 = 8, so x^{8}.
M2#maths-u01-20-q3@2: What is 2^{−3}? | 1/8 | −8 | −6 | 8 | 1/6 | A negative power is a reciprocal: 1/2^{3} = 1/8.

## Roots and Radicals
S: A root undoes a power: the square root of 49 is 7 because 7^{2} = 49. Roots that aren't whole numbers are left exactly as surds (School 3) or estimated as decimals.
O: Find square and cube roots, and estimate roots between whole numbers
O: Relate roots to fractional powers
T: Square root | A number which, multiplied by itself, gives the original: √49 = 7
T: Radical | A root sign, √ or ⁿ√, and the expression under it
H: Roots
- Every positive number has two square roots, ± (for example ±7 for 49); √ means the positive one.
- Negative numbers have no real square roots, but they do have real cube roots: ³√−8 = −2.
- ⁿ√a = a^{1/n}.
- Learn squares to 15^{2} and cubes of 1 to 5 and 10.
H: Estimating
- √50 lies between √49 = 7 and √64 = 8, closer to 7: about 7.07.
- Use roots in context: a square of area 200 cm^{2} has side √200 ≈ 14.1 cm.
X: Estimate √90 to one decimal place without a calculator.
> 81 < 90 < 100, so 9 < √90 < 10
> 9.5^{2} = 90.25, slightly above 90, so √90 is just under 9.5
> 9.4^{2} = 88.36, so √90 ≈ 9.5 to one decimal place (9.49 to two)
- √(ab) = √a × √b and √(a/b) = √a ÷ √b, for positive a and b: these simplify surds (School 3).
- Square numbers end only in 0, 1, 4, 5, 6 or 9, so 7,342 can't be a perfect square.
- Cube roots and other odd roots keep the sign: ³√−64 = −4, because (−4)^{3} = −64.
- A calculator gives decimal approximations of roots; exact answers keep the root sign (√2, not 1.414…).
K: Roots undo powers; square roots of positives come in ± pairs; estimate by bracketing between known squares.
!: Writing √(a + b) = √a + √b: √(9 + 16) = 5, but √9 + √16 = 7.
Q: What are the square roots of 64? | 8 and −8.
Q: What is ³√−27? | −3.
SUM: Roots undo powers.
SUM: Estimate roots between known squares and cubes.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: National Centre for Excellence in the Teaching of Mathematics, Secondary mastery professional development materials: powers and roots | guidance | 2019 | https://www.ncetm.org.uk/
NUM1#maths-u01-21-q1@1: What is ³√125 + √144? | 17 | 0 |  | ³√125 = 5 and √144 = 12, so 17.
M1#maths-u01-21-q2@1: Between which two whole numbers does √40 lie? | 6 and 7 | 4 and 5 | 5 and 6 | 7 and 8 | 19 and 21 | 40 lies between the square numbers 36 = 6^{2} and 49 = 7^{2}, so √40 is between 6 and 7.
M3#maths-u01-21-q3@2: Which statement is true? | √(36 + 64) = 10 | √36 + √64 = 10 | √(36 + 64) = 14 | √36 × √64 = 100 | √(36 × 64) = 100 | √100 = 10, while √36 + √64 = 14: roots don't distribute over addition.

## Scientific Notation
S: Scientific notation (standard form) writes numbers as A × 10^{n}, with 1 ≤ A < 10. It makes very large and very small numbers readable and easy to compare and calculate with.
O: Convert between ordinary numbers and standard form
O: Calculate with numbers in standard form
T: Standard form | A × 10^{n}, where 1 ≤ A < 10 and n is an integer
T: Order of magnitude | The power of 10 a quantity is closest to
H: Converting
- 4,700,000 = 4.7 × 10^{6}; 0.00052 = 5.2 × 10^{−4}.
- A positive power means a large number; a negative power means a number less than 1.
- 23 × 10^{4} isn't in standard form: it's 2.3 × 10^{5}.
H: Calculating
- Multiply: multiply the A values, add the powers, then adjust: (3 × 10^{4}) × (5 × 10^{6}) = 15 × 10^{10} = 1.5 × 10^{11}.
- Divide: divide the A values, subtract the powers.
- Add and subtract: convert to the same power of 10 (or to ordinary numbers) first.
X: The Earth's mass is about 5.97 × 10^{24} kg and the Moon's is about 7.35 × 10^{22} kg. How many times heavier is the Earth?
> 5.97 × 10^{24} ÷ 7.35 × 10^{22} = (5.97 ÷ 7.35) × 10^{24 − 22}
> = 0.812 × 10^{2}
> ≈ 81 times heavier
- On a calculator, standard form may appear as 4.7E6 or 4.7 × 10^{06}: always write it properly in your answer.
- To compare numbers in standard form, compare the powers first, then the A values.
K: Write A × 10^{n} with 1 ≤ A < 10; multiply by adding powers, divide by subtracting, and adjust A at the end.
!: Leaving answers like 15 × 10^{10}, where A isn't between 1 and 10.
Q: What is 0.00052 in standard form? | 5.2 × 10^{−4}.
Q: What is (2 × 10^{3}) × (4 × 10^{5})? | 8 × 10^{8}.
SUM: Standard form handles very large and small numbers.
SUM: Calculate by combining the numbers and the powers separately.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: NASA, Planetary fact sheet | data | 2024 | https://nssdc.gsfc.nasa.gov/planetary/factsheet/
NUM1#maths-u01-22-q1@1: Work out (6 × 10^{5}) × (4 × 10^{−2}) as an ordinary number. | 24000 | 0 |  | 6 × 4 = 24 and 10^{5 − 2} = 10^{3}, giving 24 × 10^{3} = 24,000 (2.4 × 10^{4}).
M1#maths-u01-22-q2@1: Which is 360,000 in standard form? | 3.6 × 10^{5} | 36 × 10^{4} | 3.6 × 10^{4} | 0.36 × 10^{6} | 3.6 × 10^{6} | Move the point 5 places so that A = 3.6 is between 1 and 10.
M2#maths-u01-22-q3@2: What is (8 × 10^{9}) ÷ (2 × 10^{−3})? | 4 × 10^{12} | 4 × 10^{6} | 4 × 10^{−27} | 6 × 10^{12} | 16 × 10^{6} | Divide the numbers (8 ÷ 2 = 4) and subtract the powers: 9 − (−3) = 12, giving 4 × 10^{12}.

## Rounding and Estimation
S: Rounding simplifies numbers to a sensible accuracy; estimation uses rounded numbers to predict an answer. Together they catch calculator slips and give quick answers when exactness isn't needed.
O: Round to a given number of decimal places or to the nearest unit, 10, 100 and so on
O: Estimate calculations by rounding to one significant figure
T: Rounding | Replacing a number with a simpler nearby value at a stated accuracy
T: Estimate | An approximate answer found with rounded numbers
H: Rounding
- Look at the digit after the last one you're keeping: 5 or more rounds up; less than 5 rounds down.
- 3.4567 to 2 d.p. is 3.46; 18,350 to the nearest 1,000 is 18,000; 2.995 to 2 d.p. is 3.00 (keep the zeros to show the accuracy).
H: Estimating
- Round each number to 1 significant figure, then calculate: 48.7 × 3.12 ÷ 0.512 ≈ 50 × 3 ÷ 0.5 = 300.
- Say whether your estimate is an over- or underestimate when asked: rounding 48.7 up to 50 overestimates that part.
- Compare the calculator answer with the estimate: if they differ wildly, check.
X: Estimate (21.8 × 4.93) ÷ 0.198.
> Round to 1 significant figure: (20 × 5) ÷ 0.2
> = 100 ÷ 0.2
> = 500 (the calculator gives about 542.8)
- Truncating (chopping off digits) is different from rounding: 3.78 truncated to 1 d.p. is 3.7, but rounded it's 3.8.
- Rounding to the nearest whole number: 7.5 rounds to 8 (the usual convention rounds halves up).
K: Round by looking at the next digit; estimate by rounding everything to one significant figure first.
!: Rounding in stages: 3.4467 → 3.447 → 3.45 → 3.5, when 3.4467 to 1 d.p. is 3.4.
Q: What is 7.2649 to 2 decimal places? | 7.26.
Q: Estimate 398 × 0.52. | 400 × 0.5 = 200.
SUM: Round by looking at the next digit.
SUM: Estimate to check answers.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: National Centre for Excellence in the Teaching of Mathematics, Secondary mastery professional development materials: estimation | guidance | 2019 | https://www.ncetm.org.uk/
M1#maths-u01-23-q1@1: What is 4,649 to the nearest hundred? | 4,600 | 4,700 | 4,650 | 5,000 | 4,640 | To the nearest hundred, look at the tens digit: it's 4, so round down to 4,600.
M2#maths-u01-23-q2@2: Which is the best estimate of 6.12 × 39.7 ÷ 0.49? | 480 | 240 | 120 | 4,800 | 48 | Round each number to 1 significant figure: 6 × 40 ÷ 0.5 = 240 ÷ 0.5 = 480.
NUM1#maths-u01-23-q3@2: Round 0.0896 to 2 decimal places. | 0.09 | 0 |  | The third decimal digit is 9, so 0.08 rounds up to 0.09.

## Significant Figures
S: Significant figures count the digits that carry meaning about a number's size and precision. They let you state answers to a sensible accuracy, especially for very large or very small numbers.
O: Round numbers to a given number of significant figures
O: Choose an appropriate accuracy for an answer
T: Significant figure | A digit that contributes to a number's precision, starting from the first non-zero digit
T: Leading zero | A zero before the first non-zero digit, such as in 0.0045: never significant
H: Counting significant figures
- Start from the first non-zero digit: in 0.004 50, the significant figures are 4, 5 and the final 0 (3 s.f.).
- Zeros between non-zero digits count: 3,007 has 4 s.f.
- Trailing zeros in a whole number are ambiguous: 5,200 may be 2, 3 or 4 s.f., so say which.
H: Rounding to significant figures
- 48,762 to 2 s.f. = 49,000 (keep the place value with zeros).
- 0.003 846 to 2 s.f. = 0.003 8.
- Give answers to no more significant figures than your least precise measurement: 3 s.f. is the usual default at GCSE unless told otherwise.
X: The area of a circle with radius 7.3 cm is calculated as 167.4154… cm^{2}. Give the area to 3 significant figures.
> The first three significant figures are 1, 6 and 7
> The next digit is 4, so round down
> Area = 167 cm^{2} (3 s.f.)
- Round only the final answer: keep full accuracy in intermediate steps, or rounding errors build up.
K: Significant figures start at the first non-zero digit; keep place value with zeros when rounding.
!: Rounding 48,762 to 2 s.f. as 49 instead of 49,000.
Q: How many significant figures are in 0.0507? | 3: the 5, 0 and 7.
Q: What is 0.006 849 to 2 s.f.? | 0.006 8.
SUM: Significant figures show precision.
SUM: Keep place value when rounding.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: National Physical Laboratory, Good practice guide: a beginner's guide to uncertainty of measurement | guidance | 2012 | https://www.npl.co.uk/
NUM1#maths-u01-24-q1@1: Round 0.004 865 to 2 significant figures. | 0.0049 | 0 |  | The first two significant figures are 4 and 8; the next digit is 6, so round up to 0.0049.
M1#maths-u01-24-q2@1: What is 72,486 to 1 significant figure? | 70,000 | 7 | 72,000 | 80,000 | 70 | The first significant figure is the 7 in the ten-thousands place; the next digit (2) rounds down.
M2#maths-u01-24-q3@2: How many significant figures does 30.050 have? | 5 | 3 | 4 | 2 | 6 | All digits from the first non-zero digit count, including the trailing zero after the decimal point.

## Sequences of Numbers
S: A sequence is an ordered list of numbers following a rule. Spotting and describing the rule, whether term-to-term or position-to-term, is the foundation of algebra and of series in calculus.
O: Continue sequences and describe term-to-term rules
O: Find and use the nth term of an arithmetic sequence
T: Arithmetic sequence | A sequence with a constant difference between terms, such as 5, 8, 11, 14, …
T: nth term | A formula giving any term from its position n
H: Rules
- **Term-to-term**: how to get from one term to the next ("add 3").
- **Position-to-term (nth term)**: a formula in n: for 5, 8, 11, 14, … the nth term is 3n + 2.
- The coefficient of n is the common difference; adjust the constant so that n = 1 gives the first term.
H: Using the nth term
- The 50th term of 3n + 2 is 152.
- Is 101 a term? Solve 3n + 2 = 101: n = 33, a whole number, so yes. Is 100? 3n = 98 has no whole-number solution, so no.
- Other types: geometric (× a constant), quadratic (second differences constant), Fibonacci-style (add the previous two).
X: Find the nth term of 17, 13, 9, 5, … and its 30th term.
> The common difference is −4, so the nth term is −4n + c
> When n = 1: −4 + c = 17, so c = 21
> nth term = 21 − 4n; the 30th term is 21 − 120 = −99
- Geometric sequences multiply by a constant ratio: 3, 6, 12, 24, … has nth term 3 × 2^{n−1}.
K: The difference gives the coefficient of n; adjust the constant to match the first term.
!: Writing the nth term of 5, 8, 11, … as n + 3 (the term-to-term rule) instead of 3n + 2.
Q: What is the nth term of 7, 12, 17, 22, …? | 5n + 2.
Q: How do you test whether a number is a term of an arithmetic sequence? | Set the nth term equal to it and check n is a positive whole number.
SUM: Sequences follow term-to-term or position-to-term rules.
SUM: Arithmetic sequences have nth terms of the form dn + c.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: National Centre for Excellence in the Teaching of Mathematics, Secondary mastery professional development materials: sequences | guidance | 2019 | https://www.ncetm.org.uk/
NUM1#maths-u01-25-q1@1: What is the 40th term of the sequence with nth term 6n − 11? | 229 | 0 |  | 6 × 40 − 11 = 229.
M1#maths-u01-25-q2@1: What is the nth term of 4, 10, 16, 22, …? | 6n − 2 | n + 6 | 6n + 4 | 4n + 6 | 6n | The common difference is 6, so start with 6n; then 6 × 1 = 6 needs − 2 to give the first term 4.
M2#maths-u01-25-q3@2: Is 200 a term of the sequence 3n + 5? | Yes, the 65th term | No | Yes, the 66th term | Yes, the 200th term | Only if n can be a fraction | Solve 3n + 5 = 200: 3n = 195, so n = 65, a whole number, so it's the 65th term.

## Number Patterns
S: Number patterns (square, triangular, cube and Fibonacci numbers, and patterns in tables) reveal structure in mathematics. Explaining why a pattern holds, not just noticing it, is the first step towards proof.
O: Recognise square, cube, triangular and Fibonacci numbers
O: Explain why a number pattern holds
T: Triangular number | A number of dots that can form a triangle: 1, 3, 6, 10, …, with nth term n(n + 1)/2
T: Conjecture | A statement believed to be true from evidence, but not yet proved
H: Special sequences
- Square numbers 1, 4, 9, 16, … = n^{2}; cube numbers 1, 8, 27, 64, … = n^{3}.
- Triangular numbers 1, 3, 6, 10, 15, … = n(n + 1)/2.
- Fibonacci: 1, 1, 2, 3, 5, 8, 13, …: each term is the sum of the previous two.
- Quadratic sequences have constant second differences: 3, 8, 15, 24, … (differences 5, 7, 9; second differences 2) has nth term n^{2} + 2n.
H: From pattern to proof
- The sum of the first n odd numbers is n^{2}: 1 + 3 + 5 = 9. Why? Each odd number adds an L-shaped border to a square.
- Two consecutive triangular numbers add to a square: 6 + 10 = 16. Algebra: n(n + 1)/2 + (n + 1)(n + 2)/2 = (n + 1)^{2}.
- Patterns can mislead: n^{2} + n + 41 is prime for n = 0 to 39, but not for n = 40 (it's 41^{2}).
X: Find the nth term of the quadratic sequence 2, 7, 14, 23, 34, ….
> First differences: 5, 7, 9, 11; second differences: 2, so the n^{2} coefficient is 2 ÷ 2 = 1
> Subtract n^{2} (1, 4, 9, 16, 25): 1, 3, 5, 7, 9, which is 2n − 1
> nth term = n^{2} + 2n − 1 (check: n = 1 gives 2 ✓)
K: Square, cube, triangular and Fibonacci numbers recur; halve the second difference for a quadratic's n^{2} coefficient; prove patterns, don't just observe them.
!: Assuming a pattern always continues because it holds for the first few cases.
Q: What is the 10th triangular number? | 55: 10 × 11 ÷ 2.
Q: What is the sum of the first 20 odd numbers? | 400: 20^{2}.
SUM: Number patterns reveal mathematical structure.
SUM: Explain patterns with diagrams or algebra.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: Courant R, Robbins H, What Is Mathematics? (2nd edn, Oxford University Press 1996) | textbook | 1996 | https://global.oup.com/
NUM1#maths-u01-26-q1@1: What is the 12th triangular number? | 78 | 0 |  | 12 × 13 ÷ 2 = 78.
M1#maths-u01-26-q2@1: Which is the next Fibonacci number after 21, 34? | 55 | 47 | 68 | 89 | 42 | Each Fibonacci number is the sum of the two before it: 21 + 34 = 55.
M3#maths-u01-26-q3@2: What is the nth term of 4, 9, 16, 25, 36, …? | (n + 1)^{2} | n^{2} + 3 | 5n − 1 | n^{2} + 4 | 2n + 2 | These are the squares 2^{2}, 3^{2}, 4^{2}, …: term n is (n + 1)^{2}.

## Number Bases
S: A number base is the number of digits a positional system uses. Binary (base 2), octal (base 8) and hexadecimal (base 16) are used throughout computing, and converting between bases deepens understanding of place value.
O: Convert numbers between base 10 and other bases
O: Explain place value in any base
T: Base b | A positional system with digits 0 to b − 1, where each place is worth b times the place to its right
T: Hexadecimal | Base 16, with digits 0–9 and A–F (A = 10, …, F = 15)
H: Place value in other bases
- In base b, the places are 1, b, b^{2}, b^{3}, …. In base 5, 342₅ = 3 × 25 + 4 × 5 + 2 = 97.
- Hexadecimal is compact for binary: each hex digit is exactly 4 binary digits (bits). 2F₁₆ = 2 × 16 + 15 = 47.
H: Converting from base 10
- Repeatedly divide by the base, recording remainders; read them from the last to the first.
- 97 ÷ 5 = 19 r 2; 19 ÷ 5 = 3 r 4; 3 ÷ 5 = 0 r 3. Reading upwards: 342₅.
X: Convert 200 to hexadecimal.
> 200 ÷ 16 = 12 remainder 8
> 12 ÷ 16 = 0 remainder 12, which is C in hexadecimal
> Reading the remainders upwards: 200 = C8₁₆ (check: 12 × 16 + 8 = 200)
- In any base b, the number written 10 means b itself, and 100 means b^{2}.
- To convert between two non-decimal bases, it's usually easiest to go through base 10 (or through binary for bases 2, 8 and 16).
K: Place values in base b are powers of b; convert to base 10 by multiplying out, and from base 10 by repeated division.
!: Reading the remainders in the wrong order (from first to last).
Q: What is 213₄ in base 10? | 2 × 16 + 1 × 4 + 3 = 39.
Q: What digits does base 8 use? | 0 to 7.
SUM: Bases change the multiplier between places.
SUM: Hexadecimal is a compact way to write binary.
SRC: Courant R, Robbins H, What Is Mathematics? (2nd edn, Oxford University Press 1996) | textbook | 1996 | https://global.oup.com/
SRC: Rosen KH, Discrete Mathematics and Its Applications (8th edn, McGraw Hill 2019) | textbook | 2019 | https://www.mheducation.com/
NUM1#maths-u01-27-q1@1: Convert 1043₅ (base 5) to base 10. | 148 | 0 |  | 1 × 125 + 0 × 25 + 4 × 5 + 3 = 148.
M1#maths-u01-27-q2@1: What is the hexadecimal digit for 13? | D | C | E | B | 13 | Hexadecimal uses letters for 10 to 15: A = 10, B = 11, C = 12, D = 13.
M2#maths-u01-27-q3@2: What is 45 in base 3? | 1200₃ | 1020₃ | 2100₃ | 1110₃ | 45₃ | 45 = 1 × 27 + 2 × 9 + 0 × 3 + 0, so 1200₃.

## Binary Arithmetic
S: Binary (base 2) uses only the digits 0 and 1, matching the off and on states of electronic circuits. Every number, character and image in a computer is ultimately stored and calculated in binary.
O: Convert between binary and denary
O: Add, subtract and multiply in binary
T: Bit | A binary digit: 0 or 1
T: Byte | 8 bits, which can represent 2^{8} = 256 values (0 to 255)
H: Place values
- 1, 2, 4, 8, 16, 32, 64, 128, …: 101101₂ = 32 + 8 + 4 + 1 = 45.
- n bits represent 2^{n} different values.
- To convert denary to binary, subtract the largest powers of 2, or divide repeatedly by 2.
H: Arithmetic
- **Addition**: 0 + 0 = 0, 0 + 1 = 1, 1 + 1 = 10 (write 0, carry 1), 1 + 1 + 1 = 11 (write 1, carry 1).
- **Multiplying by 2** shifts every digit one place left (append a 0), just as multiplying by 10 does in denary.
- Computers represent negatives using **two's complement**: invert the bits and add 1.
X: Add 1011₂ and 0110₂, and check in denary.
> Right to left: 1 + 0 = 1; 1 + 1 = 10 (write 0, carry 1); 0 + 1 + 1 = 10 (write 0, carry 1); 1 + 0 + 1 = 10 (write 0, carry 1)
> Write the final carry: 10001₂
> Check: 1011₂ = 11, 0110₂ = 6, and 11 + 6 = 17 = 10001₂ ✓
- Shifting right halves a number (losing any remainder), which computers use for fast division by 2.
K: Binary places are powers of 2; 1 + 1 = 10 with a carry; shifting left doubles a number.
!: Reading binary as denary: 101₂ is five, not one hundred and one.
Q: What is 11001₂ in denary? | 25: 16 + 8 + 1.
Q: How many values can a byte store? | 256 (0 to 255).
SUM: Binary is base 2, the language of computers.
SUM: Binary arithmetic follows the same column rules as denary.
SRC: Rosen KH, Discrete Mathematics and Its Applications (8th edn, McGraw Hill 2019) | textbook | 2019 | https://www.mheducation.com/
SRC: Department for Education, Computer science GCSE subject content | standard | 2015 | https://www.gov.uk/government/publications/gcse-computer-science
NUM1#maths-u01-28-q1@1: Convert 1101001₂ to denary. | 105 | 0 |  | 64 + 32 + 8 + 1 = 105.
M1#maths-u01-28-q2@1: What is 13 in binary? | 1101 | 1011 | 1110 | 1001 | 111 | 13 = 8 + 4 + 1, so there are 1s in the 8, 4 and 1 columns and a 0 in the 2 column: 1101.
M2#maths-u01-28-q3@2: What is 111₂ + 1₂? | 1000₂ | 112₂ | 1111₂ | 110₂ | 1001₂ | 7 + 1 = 8 = 1000₂: the carries ripple through.

## Ratios and Proportions
S: A ratio compares the sizes of quantities; a proportion says two ratios are equal. Ratio reasoning scales recipes, maps and mixtures, and is one of the most used ideas in everyday and professional maths.
O: Simplify ratios and share amounts in a given ratio
O: Solve problems using direct proportion
T: Ratio | A comparison of quantities, such as 3 : 2, showing how many of one for each of the other
T: Direct proportion | Two quantities that increase at the same rate: doubling one doubles the other
H: Ratios
- Simplify by dividing by the HCF: 18 : 12 = 3 : 2. Use the same units first: 50 cm : 2 m = 50 : 200 = 1 : 4.
- **Sharing** £240 in the ratio 3 : 5: total parts 8, one part £30, so £90 and £150.
- A ratio can be written as a fraction of the whole: in 3 : 5, the first share is 3/8 of the total.
H: Proportion
- **Unitary method**: find one unit, then scale: if 4 pens cost £3.60, 1 costs £0.90, so 7 cost £6.30.
- Directly proportional quantities have a constant ratio: y = kx (graph through the origin).
- **Inverse proportion** (School 3's functions work extends it): more workers, less time: y = k/x.
X: A recipe for 6 people uses 450 g of flour and 2 eggs. How much of each is needed for 15 people?
> Scale factor = 15 ÷ 6 = 2.5
> Flour: 450 × 2.5 = 1,125 g
> Eggs: 2 × 2.5 = 5
K: Simplify ratios with the HCF in the same units; share by finding one part; scale proportions using the unitary method or a scale factor.
!: Dividing the total by one side of the ratio instead of by the total number of parts.
Q: Share £84 in the ratio 2 : 5. | £24 and £60.
Q: If 3 m of fabric costs £13.50, how much do 8 m cost? | £36 (£4.50 per metre).
SUM: Ratios compare quantities; proportions keep ratios equal.
SUM: Find one part or one unit, then scale.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: National Centre for Excellence in the Teaching of Mathematics, Secondary mastery professional development materials: ratio and proportion | guidance | 2019 | https://www.ncetm.org.uk/
NUM1#maths-u01-19-q1@1: Share 360 in the ratio 4 : 5. What is the larger share? | 200 | 0 |  | 9 parts, so one part is 40; the larger share is 5 × 40 = 200.
M1#maths-u01-19-q2@1: What is 45 : 60 in its simplest form? | 3 : 4 | 9 : 12 | 4 : 3 | 45 : 60 | 15 : 20 | Divide both parts by their highest common factor, 15, to get 3 : 4.
M2#maths-u01-19-q3@2: Paint is mixed blue to yellow in the ratio 2 : 3. How much blue is needed to make 8 litres? | 3.2 litres | 2 litres | 5.33 litres | 4.8 litres | 2.67 litres | Blue is 2/5 of the mix: 2/5 × 8 = 3.2 litres.
`;
