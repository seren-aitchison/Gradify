// The science adapter (SciGradify: physics, chemistry and biology). The three courses share their labs' framing and
// their mock exam structure; each keeps its own syllabus, levels, theme and labs in kit/courses/<slug>/course.js.
export const scienceExams = (units, tracks) => [
  ...tracks.map((t, i) => ({ id: `stage-${i + 1}`, title: `${t.name}`, sub: "Mixed questions from every written school in this stage.", units: t.units, format: "science", count: 20, minutes: 30, pass: 0.7 })),
  { id: "whole", title: "Whole course", sub: "Forty mixed questions from every written school.", units: units.map((u) => u.n), format: "science", count: 40, minutes: 60, pass: 0.7 },
];

export default {
  id: "science", name: "Science",
  defaults: {
    site: "SciGradify", app: "../app.html", unitWord: "School", trackWord: "Stage",
    practiceLabel: "Lab",
    practiceNote: "Simulations run a real model, with its simplifications stated; illustrative models show a structure or process without simulating it; exercises check your answers. Challenges inside them earn XP.",
  },
  questionTypes: [],
  qa: {
    expert: "a science teacher or lecturer in the subject",
    rules(unit, L) {
      const w = [];
      // a practical science lesson states its sources, so values (constants, data) can be checked
      if (!L.sources.length && /\b\d+(\.\d+)?\s?(×\s?10|mol|kJ|J|N|Pa|K|°C|m s|g)\b/.test(L.blocks.map((b) => b.x || "").join(" "))) w.push("quantitative values with no source to check them against");
      return w;
    },
    flags: () => [],
  },
};
