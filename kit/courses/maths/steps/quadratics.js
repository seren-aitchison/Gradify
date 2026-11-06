// MathGradify step by step: quadratic equations (GCSE and A level). Checked by kit/interactive/stepcheck.js.
export default {
  id: "quadratics", title: "Solving quadratic equations", level: "GCSE", lessons: ["u03-11", "u03-12", "u03-13"],
  problems: [
    { id: "quad-1", kind: "equation", prompt: "Solve", start: "x^2 − 5x + 6 = 0", solutions: [2, 3], d: 1,
      hints: ["Factorise: two numbers that multiply to 6 and add to −5.", "If a product is zero, one of the factors is zero."], solution: ["(x − 2)(x − 3) = 0", "x = 2 or x = 3"] },
    { id: "quad-2", kind: "equation", prompt: "Solve", start: "x^2 = 4x", solutions: [0, 4], d: 2,
      hints: ["Don't divide both sides by x: x could be 0, and you'd lose that solution.", "Rearrange to x^2 − 4x = 0 and factorise."], solution: ["x^2 − 4x = 0", "x(x − 4) = 0", "x = 0 or x = 4"], why: "Dividing by x loses the solution x = 0: the checker flags that step." },
    { id: "quad-3", kind: "equation", prompt: "Solve", start: "2x^2 + x − 6 = 0", solutions: [1.5, -2], d: 2,
      hints: ["a × c = −12: find two numbers that multiply to −12 and add to 1.", "4 and −3: split x into 4x − 3x and factorise in pairs."], solution: ["(2x − 3)(x + 2) = 0", "x = 3/2 or x = −2"] },
    { id: "quad-4", kind: "equation", prompt: "Solve by completing the square, leaving your answers in surd form", start: "x^2 + 6x + 2 = 0", solutions: [-3 + Math.sqrt(7), -3 - Math.sqrt(7)], d: 3,
      hints: ["x^2 + 6x = (x + 3)^2 − 9.", "(x + 3)^2 = 7, so x + 3 = √7 or x + 3 = −√7."], solution: ["(x + 3)^2 − 9 + 2 = 0", "(x + 3)^2 = 7", "x = −3 + sqrt(7) or x = −3 − sqrt(7)"] },
    { id: "quad-5", kind: "equation", prompt: "Solve", start: "(x − 1)^2 = 9", solutions: [4, -2], d: 2,
      hints: ["Square-rooting gives x − 1 = 3 or x − 1 = −3: don't forget the negative root.", "Or expand, rearrange to = 0, and factorise."], solution: ["x^2 − 2x + 1 = 9", "x^2 − 2x − 8 = 0", "(x − 4)(x + 2) = 0", "x = 4 or x = −2"] },
    { id: "quad-6", kind: "equation", prompt: "Solve using the quadratic formula, to 3 significant figures", start: "3x^2 − 5x − 1 = 0", solutions: [(5 + Math.sqrt(37)) / 6, (5 - Math.sqrt(37)) / 6], d: 3, placeholder: "e.g. x = (5 + sqrt(37))/6 or x = (5 − sqrt(37))/6",
      hints: ["a = 3, b = −5, c = −1. The discriminant b^2 − 4ac = 25 + 12 = 37.", "x = (5 ± √37) ÷ 6: write the two answers separately."], solution: ["x = (5 + sqrt(37))/6 or x = (5 − sqrt(37))/6"], why: "To 3 significant figures, x = 1.85 or x = −0.180." },
  ],
};
