// MathGradify step by step: linear equations (GCSE). Checked by kit/interactive/stepcheck.js.
export default {
  id: "linear", title: "Solving linear equations", level: "GCSE", lessons: ["u03-09"],
  problems: [
    { id: "lin-1", kind: "equation", prompt: "Solve", start: "3(x − 2) = 2x + 5", solutions: [11], d: 1,
      hints: ["Expand the bracket first.", "Collect the x terms on one side."], solution: ["3x − 6 = 2x + 5", "x − 6 = 5", "x = 11"] },
    { id: "lin-2", kind: "equation", prompt: "Solve", start: "5x + 7 = 2x − 8", solutions: [-5], d: 1,
      hints: ["Subtract 2x from both sides.", "Then subtract 7 from both sides: −8 − 7 = −15."], solution: ["3x + 7 = −8", "3x = −15", "x = −5"] },
    { id: "lin-3", kind: "equation", prompt: "Solve", start: "4(2x + 1) − 3(x − 2) = 25", solutions: [3], d: 2,
      hints: ["Expand both brackets: −3 × −2 = +6.", "Collect like terms on the left."], solution: ["8x + 4 − 3x + 6 = 25", "5x + 10 = 25", "5x = 15", "x = 3"] },
    { id: "lin-4", kind: "equation", prompt: "Solve", start: "x/4 + 3 = 7", solutions: [16], d: 1,
      hints: ["Subtract 3 from both sides first.", "Then multiply both sides by 4."], solution: ["x/4 = 4", "x = 16"] },
    { id: "lin-5", kind: "equation", prompt: "Solve", start: "(x + 1)/3 = (x − 2)/2", solutions: [8], d: 3,
      hints: ["Multiply both sides by 6 (the lowest common multiple of 3 and 2) to clear the fractions.", "Remember to multiply the whole of each numerator: 2(x + 1) = 3(x − 2)."], solution: ["2(x + 1) = 3(x − 2)", "2x + 2 = 3x − 6", "8 = x", "x = 8"] },
    { id: "lin-6", kind: "equation", prompt: "Solve", start: "7 − 2(3 − x) = 4x − 9", solutions: [5], d: 2,
      hints: ["−2 × −x = +2x.", "7 − 6 = 1."], solution: ["7 − 6 + 2x = 4x − 9", "1 + 2x = 4x − 9", "10 = 2x", "x = 5"] },
  ],
};
