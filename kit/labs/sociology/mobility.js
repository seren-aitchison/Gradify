// Social mobility as a Markov chain over three classes (working, intermediate, service, in the spirit of the
// Goldthorpe class schema). A transition matrix gives the chance a child ends in each class given their parent's.
// Absolute mobility is the share who end in a different class; relative mobility compares the chances of people from
// different origins (here the odds ratio for reaching the service class rather than the working class). Structural
// change (more professional jobs) can raise absolute mobility while relative chances stay unequal: the pattern
// Goldthorpe's Oxford Mobility Study reported for Britain (Goldthorpe, 1980). The matrices are illustrative.
import { shell, canvas, slider, button, panel, challenges, clear, rrect, text, C } from "../lab.js";
import { dataLabel, table } from "../social/ui.js";

export const CLASSES = ["Working", "Intermediate", "Service"];
// fluidity f (0 = children always inherit the parent's class, 1 = destination independent of origin); upgrade shifts
// destinations towards the service class (structural change)
export function matrix(f = 0.4, upgrade = 0) {
  const target = [0.4 - upgrade / 2, 0.3, 0.3 + upgrade / 2];
  return [0, 1, 2].map((i) => [0, 1, 2].map((j) => (1 - f) * (i === j ? 1 : 0) * 0.6 + (1 - f) * 0.4 * target[j] + f * target[j]));
}
export const step = (dist, M) => [0, 1, 2].map((j) => dist.reduce((s, p, i) => s + p * M[i][j], 0));
export function absolute(dist, M) { return 1 - dist.reduce((s, p, i) => s + p * M[i][i], 0); }
export function oddsRatio(M) { const s = M[2], w = M[0]; return (s[2] / s[0]) / (w[2] / w[0]); }
export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-cols"><div><div class="lab-stage"></div><div class="lab-out"></div></div><div class="lab-ctrl"></div></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.55, max: 320 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out")), s = { f: 0.4, up: 0, gen: 0 }, st = {};
  dataLabel(ctrl, { real: false, how: "Illustrative transition matrices built from two settings, not estimates from a real mobility study." });
  const ch = challenges(ctrl, ctx, [{ id: "rigid", text: "Make a closed society: children almost always stay in their parents' class", test: (x) => x.abs < 0.15 }, { id: "struct", text: "Raise absolute mobility through structural change alone, with fluidity unchanged", test: (x) => x.up >= 0.2 && x.f === 0.4 }, { id: "gens", text: "Run four generations and watch the class structure settle", test: (x) => x.gen >= 4 }]);
  slider(ctrl, { label: "Social fluidity (openness)", min: 0, max: 1, step: 0.05, value: s.f, fmt: (v) => v.toFixed(2), onInput: (v) => { s.f = v; s.gen = 0; run(); } });
  slider(ctrl, { label: "Structural change: growth of service-class jobs", min: 0, max: 0.4, step: 0.05, value: 0, fmt: (v) => `+${Math.round(v * 100)} points`, onInput: (v) => { s.up = v; s.gen = 0; run(); } });
  button(ctrl, "Next generation", () => { s.gen++; run(); }, "pri"); button(ctrl, "Reset", () => { s.gen = 0; run(); });
  function run() {
    const M = matrix(s.f, s.up); let d = [0.55, 0.25, 0.2]; const hist = [d]; for (let g = 0; g < s.gen; g++) { d = step(d, M); hist.push(d); }
    const abs = absolute(hist.at(-2) || hist[0], M), or = oddsRatio(M); Object.assign(st, { abs, up: s.up, f: s.f, gen: s.gen }); ch.check(st);
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H); const cw = Math.min(110, (W - 40) / hist.length - 10);
    hist.forEach((dd, k) => { let y = H - 26; dd.forEach((p, j) => { const h = p * (H - 50); rrect(g, 20 + k * (cw + 10), y - h, cw, h - 2, 6, ["#64748b", "#c026d3", "#ec4899"][j]); if (p > 0.08) text(g, `${Math.round(p * 100)}%`, 20 + k * (cw + 10) + cw / 2, y - h / 2 + 4, { align: "center", size: 11, color: "#fff" }); y -= h; }); text(g, k ? `gen ${k}` : "parents", 20 + k * (cw + 10) + cw / 2, H - 8, { align: "center", size: 11, color: C.mute }); });
    out(`${table(["Origin ↓ / destination →", ...CLASSES], M.map((r, i) => [CLASSES[i], ...r.map((v) => `${Math.round(v * 100)}%`)]))}
      <p><b>Absolute mobility: ${Math.round(abs * 100)}%</b> of children end in a different class from their parents. <b>Relative mobility:</b> a service-class child's odds of a service rather than a working-class destination are <b>${or.toFixed(1)} times</b> a working-class child's (1 would be perfect equality of opportunity).</p>
      <p class="sx-fb">Absolute and relative mobility answer different questions: “is there more room at the top?” and “is the competition for it fairer?”. Structural change alone raises absolute mobility without changing anyone's relative chances.</p>`);
  }
  run(); cv.onresize = run;
  return () => cv.stop();
}
