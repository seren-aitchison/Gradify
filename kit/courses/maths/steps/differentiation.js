// MathGradify step by step: differentiation (A level). Checked by kit/interactive/stepcheck.js.
export default {
  id: "differentiation", title: "Differentiation", level: "A level", lessons: ["u07-07", "u07-10", "u07-11", "u07-12"],
  problems: [
    { id: "diff-1", kind: "derivative", prompt: "Find dy/dx when", start: "y = 4x^3 − 5x^2 + 7x − 2", fn: "4x^3 − 5x^2 + 7x − 2", target: "12x^2 − 10x + 7", d: 1,
      hints: ["Multiply by the power, then reduce the power by one.", "The constant −2 differentiates to 0."], solution: ["dy/dx = 12x^2 − 10x + 7"] },
    { id: "diff-2", kind: "derivative", prompt: "Find dy/dx when", start: "y = 3/x^2 + 2sqrt(x)", fn: "3/x^2 + 2sqrt(x)", target: "−6/x^3 + 1/sqrt(x)", range: [0.2, 6], d: 2,
      hints: ["Rewrite with powers first: 3x^−2 + 2x^(1/2).", "Then −2 × 3x^−3 and ½ × 2x^(−1/2)."], solution: ["y = 3x^−2 + 2x^(1/2)", "dy/dx = −6x^−3 + x^(−1/2)"] },
    { id: "diff-3", kind: "derivative", prompt: "Use the chain rule to find dy/dx when", start: "y = (3x + 1)^5", fn: "(3x + 1)^5", target: "15(3x + 1)^4", d: 2,
      hints: ["Differentiate the outside: 5(3x + 1)^4.", "Multiply by the derivative of the inside, 3."], solution: ["dy/dx = 5(3x + 1)^4 × 3", "dy/dx = 15(3x + 1)^4"] },
    { id: "diff-4", kind: "derivative", prompt: "Use the product rule to find dy/dx when", start: "y = x^2 sin(x)", fn: "x^2 sin(x)", target: "2x sin(x) + x^2 cos(x)", d: 2,
      hints: ["u = x^2 and v = sin(x).", "dy/dx = u'v + uv'."], solution: ["dy/dx = 2x sin(x) + x^2 cos(x)"] },
    { id: "diff-5", kind: "derivative", prompt: "Use the quotient rule to find dy/dx when", start: "y = (2x + 1)/(x − 3)", fn: "(2x + 1)/(x − 3)", target: "−7/(x − 3)^2", d: 3,
      hints: ["u = 2x + 1, v = x − 3: dy/dx = (u'v − uv')/v^2.", "The numerator is 2(x − 3) − (2x + 1) × 1."], solution: ["dy/dx = (2(x − 3) − (2x + 1))/(x − 3)^2", "dy/dx = −7/(x − 3)^2"] },
    { id: "diff-6", kind: "derivative", prompt: "Find dy/dx when", start: "y = e^(2x) ln(x)", fn: "e^(2x) ln(x)", target: "2e^(2x) ln(x) + e^(2x)/x", range: [0.2, 4], d: 3,
      hints: ["Product rule with u = e^(2x), v = ln(x).", "d/dx e^(2x) = 2e^(2x) (chain rule) and d/dx ln(x) = 1/x."], solution: ["dy/dx = 2e^(2x) ln(x) + e^(2x)/x"] },
  ],
};
