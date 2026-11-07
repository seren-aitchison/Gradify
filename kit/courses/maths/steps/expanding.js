// MathGradify step by step: expanding and simplifying (GCSE). Checked by kit/interactive/stepcheck.js.
export default {
  id: "expanding", title: "Expanding and simplifying", level: "GCSE", lessons: ["u03-05", "u03-04"],
  problems: [
    { id: "expand-1", prompt: "Expand and simplify", start: "3(x + 4) − 2(x − 5)", form: "expanded", terms: 2, d: 1,
      hints: ["Multiply every term inside each bracket by the number outside it.", "−2 × −5 = +10: watch the sign of the second bracket."], solution: ["3x + 12 − 2x + 10", "x + 22"], why: "The common slip is −2(x − 5) = −2x − 10: a negative times a negative is positive." },
    { id: "expand-2", prompt: "Expand and simplify", start: "(x + 3)(x − 5)", form: "expanded", terms: 3, d: 1,
      hints: ["Multiply each term in the first bracket by each term in the second (four products).", "Then collect the x terms."], solution: ["x^2 − 5x + 3x − 15", "x^2 − 2x − 15"] },
    { id: "expand-3", prompt: "Expand and simplify", start: "(2x − 1)^2", form: "expanded", terms: 3, d: 2,
      hints: ["Write it as (2x − 1)(2x − 1) first.", "(2x − 1)^2 isn't 4x^2 + 1: there's a middle term."], solution: ["(2x − 1)(2x − 1)", "4x^2 − 2x − 2x + 1", "4x^2 − 4x + 1"], why: "Squaring a bracket gives three terms: (a − b)^2 = a^2 − 2ab + b^2." },
    { id: "expand-4", prompt: "Expand and simplify", start: "2x(x − 3) + 4(x + 1)", form: "expanded", terms: 3, d: 1,
      hints: ["2x × x = 2x^2.", "Collect −6x and +4x."], solution: ["2x^2 − 6x + 4x + 4", "2x^2 − 2x + 4"] },
    { id: "expand-5", prompt: "Expand and simplify", start: "(x + 2)(x^2 − 3x + 1)", form: "expanded", terms: 4, d: 2,
      hints: ["Multiply x by each of the three terms, then 2 by each of them: six products.", "Collect the x^2 terms and the x terms."], solution: ["x^3 − 3x^2 + x + 2x^2 − 6x + 2", "x^3 − x^2 − 5x + 2"] },
    { id: "expand-6", prompt: "Expand and simplify", start: "(x + 1)(x − 1)(x + 2)", form: "expanded", terms: 4, d: 3,
      hints: ["Expand two brackets first: (x + 1)(x − 1) = x^2 − 1, the difference of two squares.", "Then multiply (x^2 − 1) by (x + 2)."], solution: ["(x^2 − 1)(x + 2)", "x^3 + 2x^2 − x − 2"] },
  ],
};
