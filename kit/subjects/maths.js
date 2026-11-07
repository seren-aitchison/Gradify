// The mathematics adapter (MathGradify). What's specific to maths lives here; everything else is the shared engine.
// Maths needs no extra question types: numerical answers (NUM) with tolerances are shared, and notation such as
// x^{2} and a_{n} is rendered by the shared notes format. The step-by-step checker and the labs are maths
// capabilities, given to the engine through the workspace and interactives fields of kit/courses/maths/course.js.
const year = (L) => Math.max(0, ...L.sources.map((x) => Number(String(x.date).slice(0, 4)) || 0));
const SOFTWARE = 27;   // School 27 quotes software syntax (x^2, Solve[…]), where a bare caret is correct

export default {
  id: "maths", name: "Mathematics",
  defaults: {
    app: "../app.html", unitWord: "School",
    levels: ["Fluency", "Application", "Problem solving"],
    practiceLabel: "Explore",
    tutor: "Answers come from Gradify AI, using this lesson's notes. It can make mistakes, especially with arithmetic: check its working, and try the step-by-step checker to test your own.",
  },
  questionTypes: [],
  qa: {
    expert: "a mathematics teacher or lecturer",
    // warnings for npm run qa: things a maths lesson needs that a rule can check
    rules(unit, L, text) {
      const w = [];
      // Schools 26 (reasoning and research) and 27 (software) teach practice, not calculation
      if (![26, SOFTWARE].includes(unit.n) && !L.blocks.some((b) => b.t === "ex")) w.push("no worked example (X: with > steps)");
      // notation: x^2 shows a caret; x^{2} renders as a superscript
      if (unit.n !== SOFTWARE) { const m = String(text).match(/[A-Za-z0-9)]\^[0-9A-Za-z(−-]/); if (m) w.push(`bare caret "${m[0]}": write ^{…} so it renders as a superscript`); }
      return w;
    },
    // prompts for the expert reviewer (docs/qa/maths-review-queue.md)
    flags(L, text) {
      const f = [];
      if (L.blocks.some((b) => b.t === "ex")) f.push("worked examples: check every step of the arithmetic");
      if (/\b(aqa|edexcel|ocr|wjec|eduqas|ccea|sqa|ib)\b/i.test(text)) f.push("exam board details: check against the current specification");
      if (year(L) >= 2024) f.push("recent source");
      return f;
    },
  },
};
