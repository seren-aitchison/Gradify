// MathGradify step by step: integration (A level). Checked by kit/interactive/stepcheck.js. An answer is
// right if differentiating it gives the integrand: it can differ from the model by a constant.
export default {
  id: "integration", title: "Integration", level: "A level", lessons: ["u07-27", "u07-31", "u07-32"],
  problems: [
    { id: "int-1", kind: "integral", prompt: "Find", start: "∫ (6x^2 − 4x + 3) dx", fn: "6x^2 − 4x + 3", target: "2x^3 − 2x^2 + 3x", d: 1,
      hints: ["Raise each power by one, then divide by the new power.", "Don't forget + c."], solution: ["2x^3 − 2x^2 + 3x + c"] },
    { id: "int-2", kind: "integral", prompt: "Find", start: "∫ (sqrt(x) + 4/x^3) dx", fn: "sqrt(x) + 4/x^3", target: "(2/3)x^(3/2) − 2/x^2", range: [0.2, 6], d: 2,
      hints: ["Rewrite as x^(1/2) + 4x^−3.", "x^(1/2) integrates to x^(3/2) ÷ (3/2) = (2/3)x^(3/2)."], solution: ["x^(1/2) + 4x^−3", "(2/3)x^(3/2) − 2x^−2 + c"] },
    { id: "int-3", kind: "integral", prompt: "Find", start: "∫ (2x + 3)^4 dx", fn: "(2x + 3)^4", target: "(2x + 3)^5/10", d: 2,
      hints: ["Reverse the chain rule: try (2x + 3)^5 and adjust.", "Differentiating (2x + 3)^5 gives 10(2x + 3)^4, so divide by 10."], solution: ["(2x + 3)^5/10 + c"] },
    { id: "int-4", kind: "integral", prompt: "Use integration by parts to find", start: "∫ x e^x dx", fn: "x e^x", target: "x e^x − e^x", d: 3,
      hints: ["u = x, dv/dx = e^x, so du/dx = 1 and v = e^x.", "∫ u dv = uv − ∫ v du = x e^x − ∫ e^x dx."], solution: ["x e^x − e^x + c"] },
    { id: "int-5", kind: "integral", prompt: "Find", start: "∫ 1/(2x + 1) dx", fn: "1/(2x + 1)", target: "(1/2)ln(2x + 1)", range: [0.1, 6], d: 2,
      hints: ["∫ 1/(ax + b) dx = (1/a) ln|ax + b| + c."], solution: ["(1/2)ln(2x + 1) + c"] },
    { id: "int-6", kind: "integral", prompt: "Find", start: "∫ cos(3x) dx", fn: "cos(3x)", target: "sin(3x)/3", d: 2,
      hints: ["The integral of cos(x) is sin(x).", "Differentiating sin(3x) gives 3cos(3x), so divide by 3."], solution: ["(1/3)sin(3x) + c"] },
  ],
};
