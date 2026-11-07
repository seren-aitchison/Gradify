// MathGradify written practice (#/write): proofs and explanations, the part of maths that generated questions
// and line checking can't mark. Each task has a rubric and a model answer: learners can always self-assess,
// and when signed in can ask the Gradify AI tutor for provisional feedback (kit/assess/tutor.js).
export const WRITING = [
  {
    id: "maths-w-sqrt2", unit: "u01", kind: "Proof", minutes: 15,
    title: "Prove that √2 is irrational",
    brief: "Write a complete proof by contradiction, explaining every step.",
    prompt: "Prove that √2 is irrational. Your proof should state the assumption you make, explain each deduction (including why p must be even if p^2 is even), identify the contradiction clearly, and state the conclusion.",
    rubric: [
      "States the assumption for contradiction: √2 = p/q with p and q integers, q ≠ 0, and the fraction in lowest terms (p and q have no common factor)",
      "Squares and rearranges correctly to p^2 = 2q^2, and deduces p^2 is even",
      "Justifies that p is even because the square of an odd number is odd (for example (2k + 1)^2 = 4k^2 + 4k + 1)",
      "Substitutes p = 2k to get q^2 = 2k^2, so q is also even",
      "Identifies the contradiction (p and q share the factor 2, contradicting lowest terms) and concludes that √2 is irrational",
    ],
    model: "Suppose, for contradiction, that √2 is rational. Then √2 = p/q, where p and q are integers, q ≠ 0, and the fraction is in its lowest terms, so p and q have no common factor other than 1. Squaring gives 2 = p^2/q^2, so p^2 = 2q^2. Therefore p^2 is even. Then p must be even: if p were odd, say p = 2k + 1, then p^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1 would be odd. So p = 2k for some integer k. Substituting, (2k)^2 = 2q^2, so 4k^2 = 2q^2 and q^2 = 2k^2. By the same argument, q^2 is even, so q is even. But then p and q are both even, so they share the factor 2, which contradicts our assumption that p/q was in lowest terms. So the assumption was false, and √2 is irrational.",
  },
  {
    id: "maths-w-primes", unit: "u01", kind: "Proof", minutes: 15,
    title: "Prove that there are infinitely many primes",
    brief: "Write Euclid's proof in your own words.",
    prompt: "Prove that there are infinitely many prime numbers. Explain clearly why the number you construct must have a prime factor that isn't in your list, and why this gives a contradiction.",
    rubric: [
      "Assumes, for contradiction, that there are finitely many primes and lists them all: p₁, p₂, …, pₖ",
      "Constructs N = p₁ × p₂ × … × pₖ + 1 and notes N > 1",
      "Explains that dividing N by any pᵢ leaves remainder 1, so no pᵢ divides N",
      "Uses the fact that every integer greater than 1 has a prime factor, so N has a prime factor not in the list",
      "States the contradiction and concludes there are infinitely many primes",
    ],
    model: "Suppose, for contradiction, that there are only finitely many primes, and list them all: p₁, p₂, …, pₖ. Consider N = p₁ × p₂ × … × pₖ + 1. N is greater than 1, so it has at least one prime factor (every integer greater than 1 is either prime or a product of primes). But N leaves remainder 1 when divided by each of p₁, …, pₖ, because p₁ × … × pₖ is a multiple of each of them. So none of the primes in our list divides N. Therefore N has a prime factor that isn't in the list, contradicting the assumption that the list contained every prime. So there are infinitely many primes. (Note that N itself need not be prime: 2 × 3 × 5 × 7 × 11 × 13 + 1 = 30,031 = 59 × 509. The argument only needs a prime factor outside the list.)",
  },
  {
    id: "maths-w-divisibility", unit: "u01", kind: "Proof", minutes: 15,
    title: "Why the digit-sum test for 9 works",
    brief: "Prove the divisibility test for 9 for any three-digit number, then explain why it works for any number of digits.",
    prompt: "A three-digit number has digits a, b and c, so its value is 100a + 10b + c. Prove that it is divisible by 9 if and only if a + b + c is divisible by 9. Then explain in words why the same test works for numbers with any number of digits.",
    rubric: [
      "Writes 100a + 10b + c = 99a + 9b + (a + b + c)",
      "Notes that 99a + 9b = 9(11a + b) is always a multiple of 9",
      "Concludes that the number and a + b + c differ by a multiple of 9, so one is divisible by 9 exactly when the other is (both directions)",
      "Generalises: every power of 10 is one more than a multiple of 9 (10^n − 1 = 99…9), so any number differs from its digit sum by a multiple of 9",
    ],
    model: "Write the number as 100a + 10b + c = (99a + 9b) + (a + b + c). Since 99a + 9b = 9(11a + b), the first bracket is always a multiple of 9. So the number and its digit sum a + b + c differ by a multiple of 9. If a + b + c is divisible by 9, then the number is a multiple of 9 plus a multiple of 9, so it is divisible by 9. Conversely, if the number is divisible by 9, then a + b + c = number − 9(11a + b) is a difference of multiples of 9, so it is divisible by 9. This works for any number of digits because every power of 10 is one more than a multiple of 9: 10 = 9 + 1, 100 = 99 + 1, 1000 = 999 + 1, and in general 10^n = (10^n − 1) + 1, where 10^n − 1 = 99…9. So a digit d in the 10^n place contributes d × 10^n = d × 99…9 + d, which is d plus a multiple of 9. Adding up all the places, the number equals its digit sum plus a multiple of 9.",
  },
  {
    id: "maths-w-recurring", unit: "u01", kind: "Explanation", minutes: 10,
    title: "Is 0.999… equal to 1?",
    brief: "Explain, with an algebraic argument and one other argument, whether 0.999… (recurring) equals 1.",
    prompt: "A student says 0.999… (with the 9s recurring for ever) is \"just less than 1\". Explain why 0.999… is exactly equal to 1. Give the algebraic argument using x = 0.999…, and at least one other convincing argument.",
    rubric: [
      "Sets x = 0.999…, forms 10x = 9.999…, subtracts to get 9x = 9 and concludes x = 1",
      "Gives a second argument, for example 1/3 = 0.333… so 3 × 1/3 = 0.999… = 1, or that no number lies strictly between 0.999… and 1",
      "Addresses the student's misconception: a recurring decimal is the limit of its partial sums, not a number that is still 'getting closer'",
      "Explains clearly in full sentences, using correct notation",
    ],
    model: "Let x = 0.999…. Then 10x = 9.999…, with the same infinite tail of 9s. Subtracting, 10x − x = 9.999… − 0.999… = 9, so 9x = 9 and x = 1. A second argument: 1/3 = 0.333…, and multiplying both sides by 3 gives 1 = 0.999…. A third: if 0.999… were less than 1, there would be a number between them (their average, for example), but any decimal bigger than 0.999… must have a digit bigger than 9 somewhere, which is impossible, so there's no gap: they are the same number. The student's intuition comes from thinking of 0.999… as a process that keeps getting closer to 1. But the notation means the limit of 0.9, 0.99, 0.999, …, and that limit is exactly 1. Some numbers have two decimal representations, and 1 = 1.000… = 0.999… is one of them.",
  },
];
