// The Müller-Lyer illusion (Müller-Lyer, 1889): adjust the plain line until it looks the same length as the line with
// fins, then see how far you were out. Explanations are contested: Gregory (1968) proposed misapplied size constancy
// (fins read as corners); Segall, Campbell and Herskovits (1966) found smaller illusions in some non-Western samples and
// proposed the "carpentered world" hypothesis; others propose that the fins are averaged into the line's length.
import { shell, canvas, panel, button, challenges, clear, line, text, C } from "../lab.js";
import { caveat, local } from "../social/ui.js";

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="sx-panel"><div class="lab-stage"></div><div class="sx-btns sx-list"></div><div class="sx-res"></div></div><div class="lab-ctrl"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.4, max: 260 }), btns = $(".sx-btns"), res = panel($(".sx-res")), ctrl = $(".lab-ctrl");
  caveat(ctrl, "Use the buttons or ← and → keys to stretch the plain line, then press Match. Six trials: three with fins out, three with fins in. Your results stay on this device.");
  const ch = challenges(ctrl, ctx, [{ id: "done", text: "Complete all six trials", test: (x) => x.done }, { id: "both", text: "See whether fins out and fins in push your judgements in opposite directions", test: (x) => x.opposite }]);
  const trials = ["out", "in", "out", "in", "out", "in"], errs = []; let i = 0, len = 0, std = 160;
  function newTrial() { std = 140 + Math.random() * 40; len = std * (0.7 + Math.random() * 0.6); draw(); }
  function draw() {
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H); if (i >= trials.length) return;
    const y1 = H * 0.35, y2 = H * 0.72, x0 = W / 2 - std / 2, f = 18, out = trials[i] === "out";
    line(g, [[x0, y1], [x0 + std, y1]], C.white, 3);
    for (const [x, d] of [[x0, -1], [x0 + std, 1]]) { const dx = out ? d * f : -d * f; line(g, [[x, y1], [x + dx * 0.8, y1 - f * 0.7]], C.white, 3); line(g, [[x, y1], [x + dx * 0.8, y1 + f * 0.7]], C.white, 3); }
    line(g, [[W / 2 - len / 2, y2], [W / 2 + len / 2, y2]], C.violet, 3);
    text(g, `Trial ${i + 1} of 6: make the purple line match the white one`, 10, 18, { size: 12, color: C.mute });
  }
  const adj = (d) => { len = Math.max(40, Math.min(cv.W - 20, len + d)); draw(); };
  button(btns, "← Shorter", () => adj(-4)); button(btns, "Longer →", () => adj(4));
  button(btns, "Match", () => {
    if (i >= trials.length) return; errs.push({ fins: trials[i], pct: ((len - std) / std) * 100 }); i++;
    if (i < trials.length) return newTrial();
    const m = (k) => errs.filter((e) => e.fins === k).reduce((s, e) => s + e.pct, 0) / 3, o = m("out"), n = m("in");
    const st = { done: true, opposite: o > 0 && n < 0 }; ch.check(st); local.set("muller-lyer", { at: Date.now(), out: o, in: n });
    draw(); res(`<p><b>Fins out: you set the line ${Math.abs(o).toFixed(1)}% ${o >= 0 ? "too long" : "too short"}. Fins in: ${Math.abs(n).toFixed(1)}% ${n >= 0 ? "too long" : "too short"}.</b> ${st.opposite ? "The classic pattern: fins out make a line look longer, fins in shorter." : "Not the classic pattern this time; a few trials are noisy."}</p><p class="sx-fb">Knowing it's an illusion doesn't remove it, which suggests early, automatic perceptual processes. Why it happens is still debated, so treat each explanation as a hypothesis with mixed support.</p>`);
    btns.querySelector("button:last-child").textContent = "Done";
  });
  const onKey = (e) => { if (!el.isConnected || i >= trials.length) return; if (e.key === "ArrowLeft") { e.preventDefault(); adj(-4); } if (e.key === "ArrowRight") { e.preventDefault(); adj(4); } };
  cv.cv.tabIndex = 0; cv.cv.addEventListener("keydown", onKey); cv.cv.setAttribute("aria-label", "Müller-Lyer display; use left and right arrows to adjust");
  newTrial(); cv.onresize = draw;
  return () => cv.stop();
}
