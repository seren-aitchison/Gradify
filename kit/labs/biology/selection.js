// Natural selection: a population of moths with one gene for wing colour (dark allele D dominant to pale d,
// as in the peppered moth's carbonaria form). Birds catch the moths that stand out against the tree bark;
// survivors breed at random, so allele frequencies change from generation to generation. With selection
// switched off, small populations still change by chance: genetic drift.
// Simplified: one gene, random mating, non-overlapping generations, a fixed population size, and predation
// risk proportional to colour contrast.
import { shell, canvas, slider, button, toggle, axes, line, clear, circle, text, challenges, panel, loop, seeded, C } from "../lab.js";

// one generation: returns the new dark-allele frequency
export function generation(p, { N, bark, strength, rand = Math.random }) {
  const pheno = (g) => (g > 0 ? 0.15 : 0.85); // brightness of dark and pale moths
  let pop = Array.from({ length: N }, () => (rand() < p ? 1 : 0) + (rand() < p ? 1 : 0));
  // survival depends on contrast with the bark (0 = dark bark, 1 = pale lichen-covered bark)
  pop = pop.filter((g) => rand() > strength * Math.abs(pheno(g) - bark));
  if (!pop.length) return p;
  const alleles = pop.reduce((a, g) => a + g, 0) / (2 * pop.length);
  return alleles;
}

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-cols"><div><div class="lab-stage"></div><div class="lab-stage2"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.42, max: 260 }), cv2 = canvas($(".lab-stage2"), { aspect: 0.5, max: 300 });
  const ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  const s = { N: 200, bark: 0.85, strength: 0.5, p0: 0.02, selection: true };
  let hist = [s.p0], running = false, timer = 0, moths = [];
  const st = { industrial: false, reverse: false, drift: false };
  const ch = challenges(ctrl, ctx, [
    { id: "ind", text: "Darken the bark (pollution) and drive the dark allele above 90%", test: (x) => x.industrial },
    { id: "rev", text: "Clean the air again: watch the pale form recover", test: (x) => x.reverse },
    { id: "drift", text: "Turn selection off with a small population and see drift change the frequency", test: (x) => x.drift },
  ]);
  slider(ctrl, { label: "Bark colour", min: 0, max: 1, step: 0.05, value: s.bark, fmt: (v) => (v < 0.35 ? "dark (soot)" : v > 0.65 ? "pale (lichen)" : "mixed"), onInput: (v) => { s.bark = v; } });
  slider(ctrl, { label: "Predation strength", min: 0, max: 1, step: 0.05, value: s.strength, fmt: (v) => v.toFixed(2), onInput: (v) => { s.strength = v; } });
  slider(ctrl, { label: "Population size", min: 10, max: 1000, step: 10, value: s.N, fmt: (v) => v, onInput: (v) => { s.N = v; } });
  toggle(ctrl, "Selection on", true, (v) => { s.selection = v; });
  const rb = button(ctrl, "Run", () => { running = !running; rb.textContent = running ? "Pause" : "Run"; }, "pri");
  button(ctrl, "Next generation", () => step());
  button(ctrl, "Reset", () => { hist = [s.p0]; scatter(); draw(); });
  function scatter() { const p = hist.at(-1), r = seeded(hist.length * 7919); moths = Array.from({ length: 60 }, () => ({ x: r(), y: r(), g: (r() < p ? 1 : 0) + (r() < p ? 1 : 0), a: r() * Math.PI })); }
  let wasHigh = false;
  function step() {
    const p = generation(hist.at(-1), { N: s.N, bark: s.bark, strength: s.selection ? s.strength : 0 });
    hist.push(p); if (hist.length > 200) hist.shift();
    if (s.bark < 0.35 && p > 0.9) { st.industrial = true; wasHigh = true; }
    if (wasHigh && s.bark > 0.65 && p < 0.5) st.reverse = true;
    if (!s.selection && s.N <= 60 && hist.length > 15) { const recent = hist.slice(-15); if (Math.max(...recent) - Math.min(...recent) > 0.15) st.drift = true; }
    ch.check(st); scatter(); draw();
  }
  function draw() {
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H, `rgb(${Math.round(40 + s.bark * 170)},${Math.round(38 + s.bark * 160)},${Math.round(32 + s.bark * 140)})`);
    for (const m of moths) { const x = 16 + m.x * (W - 32), y = 16 + m.y * (H - 32), c = m.g > 0 ? 40 : 225; g.save(); g.translate(x, y); g.rotate(m.a); g.fillStyle = `rgb(${c},${c - 5},${c - 15})`; g.beginPath(); g.ellipse(-6, 0, 7, 4, -0.5, 0, Math.PI * 2); g.ellipse(6, 0, 7, 4, 0.5, 0, Math.PI * 2); g.fill(); g.restore(); }
    text(g, "A sample of the current generation on the bark", 10, H - 8, { size: 11, color: s.bark > 0.5 ? "#222" : "#ddd" });
    const g2 = cv2.g, W2 = cv2.W, H2 = cv2.H; clear(g2, W2, H2);
    const A = axes(g2, { l: 48, t: 12, w: W2 - 62, h: H2 - 46 }, { x0: 0, x1: Math.max(50, hist.length - 1), y0: 0, y1: 1, xl: "generation", yl: "frequency", xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(1) });
    line(g2, hist.map((p, i) => [A.X(i), A.Y(p)]), C.orange, 2.2);
    line(g2, hist.map((p, i) => [A.X(i), A.Y(1 - (1 - p) ** 2)]), C.gold, 1.4, [4, 3]);
    text(g2, "D allele", A.X(1), A.Y(Math.min(0.95, hist.at(-1) + 0.06)), { size: 11, color: C.orange }); text(g2, "dark moths (DD + Dd)", A.X(1), 24, { size: 11, color: C.gold });
    const p = hist.at(-1), q = 1 - p;
    out(`<div class="lab-read"><div><small>Generation</small><b>${hist.length - 1}</b></div><div><small>D (dark) allele</small><b>${(p * 100).toFixed(1)}%</b></div><div><small>Dark moths</small><b>${((1 - q * q) * 100).toFixed(1)}%</b></div><div><small>Pale moths (dd)</small><b>${(q * q * 100).toFixed(1)}%</b></div></div>
      <p class="lab-msg">Phenotype frequencies follow Hardy–Weinberg proportions at birth (p², 2pq, q²). Selection acts on phenotypes, but what changes over generations is the allele frequency. ${s.selection ? "" : "With selection off, any change is drift, which is stronger in small populations."} When D is rare almost all D alleles are in heterozygotes, so a dominant advantageous allele spreads quickly at first; the recessive d is never fully removed, because it hides in heterozygotes.</p>`);
  }
  scatter(); draw();
  const stop = loop(el, (dt) => { if (!running) return; timer += dt; if (timer > 0.25) { timer = 0; step(); } });
  return stop;
}
