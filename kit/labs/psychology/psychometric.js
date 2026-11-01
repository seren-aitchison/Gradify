// Psychometric interpretation: convert a standard score between scales (z, T, IQ-style, stanine, percentile) and show
// the uncertainty that comes from imperfect reliability: the standard error of measurement SEM = SD √(1 − r) and a 95%
// confidence band of ±1.96 SEM. The scores are invented: this is a tool for learning to read reports, not a test.
import { shell, canvas, slider, seg, panel, challenges, clear, axes, line, text, C } from "../lab.js";
import { normCdf, normPdf } from "../social/stats.js";
import { caveat, table } from "../social/ui.js";

export const SCALES = { iq: { name: "Standard score (mean 100, SD 15)", m: 100, sd: 15 }, t: { name: "T-score (mean 50, SD 10)", m: 50, sd: 10 }, z: { name: "z-score (mean 0, SD 1)", m: 0, sd: 1 } };
export function interpret(score, scale = "iq", r = 0.9) {
  const S = SCALES[scale], z = (score - S.m) / S.sd, sem = S.sd * Math.sqrt(1 - r);
  return { z, pct: normCdf(z) * 100, sem, ci: [score - 1.96 * sem, score + 1.96 * sem], stanine: Math.max(1, Math.min(9, Math.round(2 * z + 5))), t: 50 + 10 * z, iq: 100 + 15 * z };
}
export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-cols"><div><div class="lab-row sx-mode"></div><div class="lab-stage"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.45, max: 260 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  caveat(ctrl, "<b>A teaching tool, not a test.</b> The scores are invented for practice. Real psychometric tests are administered and interpreted only by trained, qualified practitioners using the test's own norms.");
  const s = { scale: "iq", score: 115, r: 0.9 }, st = {};
  const ch = challenges(ctrl, ctx, [{ id: "pct", text: "Find the score at the 98th percentile on the standard-score scale (about 130)", test: (x) => x.scale === "iq" && x.score >= 129 && x.score <= 131 }, { id: "rel", text: "Lower the reliability to .70 and see how wide the confidence band becomes", test: (x) => x.r <= 0.7 }]);
  let sl;
  seg($(".lab-row.sx-mode"), Object.entries(SCALES).map(([k, v]) => [k, v.name.split(" (")[0]]), s.scale, (v) => { const z = (s.score - SCALES[s.scale].m) / SCALES[s.scale].sd; s.scale = v; s.score = +(SCALES[v].m + z * SCALES[v].sd).toFixed(v === "z" ? 2 : 0); build(); run(); });
  const host = document.createElement("div"); ctrl.prepend(host);
  function build() { host.innerHTML = ""; const S = SCALES[s.scale]; sl = slider(host, { label: "Score", min: S.m - 3.5 * S.sd, max: S.m + 3.5 * S.sd, step: S.sd / 15, value: s.score, fmt: (v) => v.toFixed(s.scale === "z" ? 2 : 0), onInput: (v) => { s.score = v; run(); } }); slider(host, { label: "Reliability of the test (r)", min: 0.5, max: 0.99, step: 0.01, value: s.r, fmt: (v) => v.toFixed(2), onInput: (v) => { s.r = v; run(); } }); }
  function run() {
    const S = SCALES[s.scale], I = interpret(s.score, s.scale, s.r); Object.assign(st, s); ch.check(st);
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const A = axes(g, { l: 30, t: 10, w: W - 44, h: H - 40 }, { x0: S.m - 3.5 * S.sd, x1: S.m + 3.5 * S.sd, y0: 0, y1: 0.45, xl: S.name, yl: "", xt: 7, yt: 1, xf: (v) => v.toFixed(s.scale === "z" ? 1 : 0), yf: () => "" });
    const xs = Array.from({ length: 141 }, (_, i) => S.m - 3.5 * S.sd + i * S.sd * 0.05);
    g.save(); g.fillStyle = "rgba(167,139,250,.35)"; g.beginPath(); g.moveTo(A.X(xs[0]), A.Y(0)); xs.filter((x) => x <= s.score).forEach((x) => g.lineTo(A.X(x), A.Y(normPdf((x - S.m) / S.sd)))); g.lineTo(A.X(s.score), A.Y(0)); g.fill();
    g.fillStyle = "rgba(251,191,36,.18)"; g.fillRect(A.X(I.ci[0]), A.Y(0.42), A.X(I.ci[1]) - A.X(I.ci[0]), A.Y(0) - A.Y(0.42)); g.restore();
    line(g, xs.map((x) => [A.X(x), A.Y(normPdf((x - S.m) / S.sd))]), C.violet, 2); line(g, [[A.X(s.score), A.Y(0)], [A.X(s.score), A.Y(0.42)]], C.gold, 2);
    text(g, "95% band", A.X(I.ci[1]) + 4, A.Y(0.38), { size: 11, color: C.gold });
    const d = s.scale === "z" ? 2 : 1;
    out(`${table(["Measure", "Value"], [["z-score", I.z.toFixed(2)], ["Percentile", `${I.pct.toFixed(1)} (higher than ${I.pct.toFixed(0)}% of the norm group)`], ["T-score", I.t.toFixed(0)], ["Standard score", I.iq.toFixed(0)], ["Stanine", I.stanine], ["Standard error of measurement", I.sem.toFixed(d)], ["95% confidence interval", `${I.ci[0].toFixed(d)} to ${I.ci[1].toFixed(d)}`]])}
      <p>All of these say the same thing in different units. The confidence interval matters most: with reliability ${s.r.toFixed(2)}, a person's “true” score could plausibly lie anywhere in the gold band, so small differences between two people, or between two of one person's scores, may not be meaningful.</p>`);
  }
  build(); run(); cv.onresize = run;
  return () => cv.stop();
}
