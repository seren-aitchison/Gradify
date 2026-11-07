// MathGradify step by step: factorising (GCSE). Checked by kit/interactive/stepcheck.js.
export default {
  id: "factorising", title: "Factorising", level: "GCSE", lessons: ["u03-06"],
  problems: [
    { id: "fact-1", prompt: "Factorise fully", start: "6x^2 + 9x", form: "factorised", factors: 2, d: 1,
      hints: ["What's the highest common factor of 6x^2 and 9x? Include x.", "The HCF is 3x."], solution: ["3x(2x + 3)"] },
    { id: "fact-2", prompt: "Factorise", start: "x^2 + 7x + 12", form: "factorised", factors: 2, d: 1,
      hints: ["Find two numbers that multiply to 12 and add to 7."], solution: ["(x + 3)(x + 4)"] },
    { id: "fact-3", prompt: "Factorise", start: "x^2 − 9", form: "factorised", factors: 2, d: 1,
      hints: ["This is a difference of two squares: a^2 − b^2 = (a − b)(a + b)."], solution: ["(x − 3)(x + 3)"] },
    { id: "fact-4", prompt: "Factorise fully", start: "3x^2 − 12", form: "factorised", factors: 2, d: 2,
      hints: ["Take out the common factor 3 first.", "Then x^2 − 4 is a difference of two squares."], solution: ["3(x^2 − 4)", "3(x − 2)(x + 2)"], why: "Always check whether a bracket can be factorised further." },
    { id: "fact-5", prompt: "Factorise", start: "2x^2 + 5x − 3", form: "factorised", factors: 2, d: 3,
      hints: ["Multiply a × c: 2 × −3 = −6. Find two numbers that multiply to −6 and add to 5.", "6 and −1: split 5x into 6x − x, then factorise in pairs."], solution: ["2x^2 + 6x − x − 3", "2x(x + 3) − (x + 3)", "(2x − 1)(x + 3)"] },
    { id: "fact-6", prompt: "Factorise fully", start: "x^3 − 4x^2 + 4x", form: "factorised", factors: 3, d: 3,
      hints: ["Take out the common factor x.", "x^2 − 4x + 4 is a perfect square."], solution: ["x(x^2 − 4x + 4)", "x(x − 2)^2"] },
  ],
};
