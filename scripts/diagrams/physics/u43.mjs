// Unit 43, Nuclear and Particle Detection Methods. Every number in a caption or claim is computed here once, from the
// lesson's own worked example. Run: node scripts/diagrams/physics/u43.mjs
import { mk } from "./spec.mjs";

const r = (x, d = 2) => +(+x).toFixed(d);

// u43-02 dead-time correction, tau = 100 us, measured 2000 per s (rates in units of 10^3 counts per s)
{ const tau = 0.1, m = 2, n = m / (1 - m * tau), lim = 1 / tau, M = `x/(1+${tau}*x)`;
  mk("u43-02", "phys-u43-dead-time", "graph", {
    title: "A Geiger counter loses counts at high rates",
    caption: `With τ = 100 μs the counter reads m = n/(1 + nτ), which bends below the true rate n and can never exceed 1/τ = ${lim * 1000} counts s⁻¹. A reading of 2000 counts s⁻¹ means the true rate is n = m/(1 − mτ) = ${n * 1000} counts s⁻¹: a fifth of the counts were missed.`,
    alt: "Measured rate against true rate: a curve that bends away from the straight no-loss line and levels off towards a dashed limit of 10 000 counts per second, with the point (2500, 2000) marked.",
    description: ["Non-paralysable dead time: n = m/(1 − mτ), so m = n/(1 + nτ).", `Reading m = 2000 counts s⁻¹: mτ = 0.2, so n = 2000/0.8 = ${n * 1000} counts s⁻¹.`, "The dashed line m = n is a counter with no dead time.", `However fast the source, m stays below 1/τ = ${lim * 1000} counts s⁻¹.`],
    range: { x: [0, 20], y: [0, 11] }, ticks: [[5, 10, 15, 20], [2, 4, 6, 8, 10]], height: [320, 300], xLabelBelow: true, axisLabels: ["true rate n / 10³ counts s⁻¹", "measured rate m / 10³ counts s⁻¹"],
    curves: [{ expr: "x", domain: [0, 11], colour: "a4", dash: "6 5", label: "no dead time", labelAt: [8.2, 9.6], anchor: "end" }, { expr: M, colour: "a1", label: "measured m", labelAt: [14, 5.4] }],
    marks: [{ y: lim, label: "limit 1/τ" }],
    points: [{ x: n, y: m, colour: "a2", label: `n = ${n * 1000}, m = ${m * 1000}`, dx: 10, dy: 22 }],
    checks: [{ type: "point", expr: M, x: n, y: m, name: `true rate ${n * 1000} reads ${m * 1000}` }, { type: "point", expr: `x/(1-${tau}*x)`, x: m, y: n, name: `n = m/(1 − mτ) = ${n * 1000}` }, { type: "value", expr: M, x: 20, between: [0, lim], name: "the reading stays below 1/τ" }],
  }); }

// u43-03 Compton recoil-electron energy against scattering angle, Cs-137
{ const E = 662, mc2 = 511, eps = E / mc2, edge = (E * 2 * eps) / (1 + 2 * eps), T = `${E}*${r(eps, 6)}*(1-cos(x*0.0174533))/(1+${r(eps, 6)}*(1-cos(x*0.0174533)))`;
  mk("u43-03", "phys-u43-compton-edge", "graph", {
    title: "Where the Compton edge comes from",
    caption: `A 662 keV photon that scatters through angle θ hands the electron less than all its energy; the most is at θ = 180°, a backscatter. With 2E/m_ec² = ${r(2 * eps)}, that maximum is ${r(edge, 0)} keV, the Compton edge: the Compton continuum in a scintillator spectrum stops there, short of the photopeak at 662 keV.`,
    alt: "Electron recoil energy against photon scattering angle for 662 keV gamma rays, rising from zero at 0 degrees to 478 keV at 180 degrees, below the 662 keV photon energy line.",
    description: ["Electron recoil energy T = E·ε(1 − cos θ)/(1 + ε(1 − cos θ)), with ε = E/m_ec² = 662/511.", `At θ = 180° this is E(2ε)/(1 + 2ε) = 662 × ${r(2 * eps)}/${r(1 + 2 * eps)} ≈ ${r(edge, 0)} keV.`, "Smaller scattering angles give smaller recoil energies, filling the continuum below the edge.", "The photopeak, full absorption at 662 keV, lies above the edge."],
    range: { x: [0, 180], y: [0, 720] }, ticks: [[45, 90, 135, 180], [200, 400, 600]], height: [320, 300], xLabelBelow: true, axisLabels: ["photon scattering angle θ / °", "electron energy / keV"],
    curves: [{ expr: T, colour: "a1", label: "recoil electron", labelAt: [35, 90] }], marks: [{ y: E, label: "photopeak 662 keV" }, { y: r(edge, 0), label: "Compton edge 478 keV", to: 180 }],
    points: [{ x: 180, y: r(edge, 2), colour: "a2", label: "θ = 180°", dx: -10, dy: 20, anchor: "end" }],
    checks: [{ type: "point", expr: T, x: 180, y: r(edge, 3), name: `Compton edge ${r(edge, 0)} keV at 180°` }, { type: "max", expr: T, domain: [0, 180], x: 180, y: r(edge, 3), name: "the largest recoil energy is the backscatter" }],
  }); }

// u43-10 pion-kaon flight-time difference over L = 3.7 m
{ const L = 3.7, c = 3, mK2 = 0.244, mp2 = 0.019, LC = r(L / c * 10, 6), dm = r(mK2 - mp2, 3), ap = (p) => (LC * dm) / (2 * p * p), ex = (p) => LC * (Math.sqrt(1 + mK2 / (p * p)) - Math.sqrt(1 + mp2 / (p * p)));
  mk("u43-10", "phys-u43-tof-separation", "graph", {
    title: "Time-of-flight separation falls as 1/p²",
    caption: `Over L = 3.7 m a kaon and a pion of the same momentum arrive Δt ≈ L(m_K² − m_π²)/(2cp²) apart: ${r(ap(1), 2)} ns at p = 1 GeV, but only ${r(ap(3), 2)} ns at 3 GeV. The exact relativistic difference (dashed) is smaller at low p, where the approximation p ≫ m fails, but follows the same 1/p² fall. TOF is a low-momentum technique.`,
    alt: "Pion–kaon flight time difference in nanoseconds against momentum from 0.5 to 3 GeV, falling steeply; the approximate curve lies above the exact dashed curve at low momentum, with 1.39 ns marked at 1 GeV.",
    description: ["β = L/(ct); for the same p the lighter particle is faster.", `Approximate: Δt = ${L} × ${dm}/(2 × 3 × 10⁸ × p²) with m_K² − m_π² = 0.244 − 0.019 = ${dm} GeV².`, `p = 1 GeV: ${r(ap(1), 2)} ns. With 80 ps resolution this is about ${r(ap(1) / 0.08, 0)}σ.`, `p = 3 GeV: ${r(ap(3), 2)} ns, nine times smaller.`],
    range: { x: [0.5, 3], y: [0, 6] }, ticks: [[1, 1.5, 2, 2.5, 3], [1, 2, 3, 4, 5, 6]], height: [320, 300], xLabelBelow: true, axisLabels: ["momentum p / GeV", "Δt(K − π) / ns"],
    curves: [{ expr: `${LC}*${dm}/(2*x^2)`, colour: "a1", label: "Δt ≈ L(m_K² − m_π²)/2cp²", labelAt: [1.35, 3.3] }, { expr: `${LC}*(sqrt(1+${mK2}/x^2)-sqrt(1+${mp2}/x^2))`, colour: "a2", dash: "6 5", label: "exact", labelAt: [1.7, 0.85] }],
    points: [{ x: 1, y: r(ap(1), 3), colour: "a1", label: `${r(ap(1), 2)} ns at 1 GeV`, dx: 10, dy: -10 }],
    checks: [{ type: "point", expr: `${LC}*${dm}/(2*x^2)`, x: 1, y: r(ap(1), 6), name: `Δt ≈ ${r(ap(1), 2)} ns at 1 GeV` }, { type: "point", expr: `${LC}*${dm}/(2*x^2)`, x: 3, y: r(ap(3), 6), name: "falls to 1/9 at 3 GeV" }, { type: "point", expr: `${LC}*(sqrt(1+${mK2}/x^2)-sqrt(1+${mp2}/x^2))`, x: 1, y: r(ex(1), 6), name: `exact ${r(ex(1), 2)} ns at 1 GeV` }],
  }); }

// u43-11 beta against momentum for pion, kaon, proton
{ const mp2 = 0.0195, mK2 = 0.244, mP2 = 0.88, B = (m2) => `x/sqrt(x^2+${m2})`, b = (p, m2) => p / Math.sqrt(p * p + m2);
  mk("u43-11", "phys-u43-beta-momentum", "graph", {
    title: "Speed against momentum separates the hadrons",
    caption: `At the same momentum a heavier particle is slower. At p = 0.5 GeV the pion has β = ${r(b(0.5, mp2), 3)} and the proton β = ${r(b(0.5, mP2), 3)}, so the proton's dE/dx ∝ 1/β² is about ${r((b(0.5, mp2) / b(0.5, mP2)) ** 2, 0)}× larger. By a few GeV all three have β near 1: dE/dx and time of flight lose their power, and Cherenkov detectors take over.`,
    alt: "Speed β against momentum for pion, kaon and proton: the three curves rise from zero and approach 1, the pion fastest and the proton slowest, with 0.963 and 0.470 marked at 0.5 GeV.",
    description: ["β = p/E = p/√(p² + m²), with m² = 0.0195, 0.244 and 0.880 GeV² for the pion, kaon and proton.", `At p = 0.5 GeV: pion E = ${r(Math.sqrt(0.25 + mp2), 3)} GeV, β = ${r(b(0.5, mp2), 3)}; proton E = ${r(Math.sqrt(0.25 + mP2), 3)} GeV, β = ${r(b(0.5, mP2), 3)}.`, `dE/dx ∝ 1/β² makes the proton's loss about ${r((b(0.5, mp2) / b(0.5, mP2)) ** 2, 0)} times the pion's.`, "At high p every curve tends to β = 1."],
    range: { x: [0, 3], y: [0, 1.08] }, ticks: [[0.5, 1, 1.5, 2, 2.5, 3], [0.25, 0.5, 0.75, 1]], height: [320, 300], xLabelBelow: true, axisLabels: ["momentum p / GeV", "β = v/c"],
    curves: [{ expr: B(mp2), colour: "a1", label: "π", labelAt: [1.1, 1.045] }, { expr: B(mK2), colour: "a2", label: "K", labelAt: [1.3, 0.875]}, { expr: B(mP2), colour: "a3", label: "p", labelAt: [2.3, 0.86] }],
    points: [{ x: 0.5, y: r(b(0.5, mp2), 4), colour: "a1", label: `${r(b(0.5, mp2), 3)}`, dx: 10, dy: -10 }, { x: 0.5, y: r(b(0.5, mP2), 4), colour: "a3", label: `${r(b(0.5, mP2), 3)}`, dx: 10, dy: 20 }],
    checks: [{ type: "point", expr: B(mp2), x: 0.5, y: r(b(0.5, mp2), 6), name: `pion β = ${r(b(0.5, mp2), 3)} at 0.5 GeV` }, { type: "point", expr: B(mP2), x: 0.5, y: r(b(0.5, mP2), 6), name: `proton β = ${r(b(0.5, mP2), 3)} at 0.5 GeV` }, { type: "value", expr: B(mP2), x: 3, between: [0.95, 1], name: "tends to 1 at high momentum" }],
  }); }

// u43-15 linear calibration from two gamma peaks
{ const a = (1332 - 662) / (3240 - 1650), b = 662 - a * 1650, E = (adc) => a * adc + b, L = `${r(a, 6)}*x${b < 0 ? "-" : "+"}${r(Math.abs(b), 4)}`;
  mk("u43-15", "phys-u43-calibration", "graph", {
    title: "Calibrating the energy scale from two peaks",
    caption: `Two known lines fix the straight line E = a·ADC + b: a = (1332 − 662)/(3240 − 1650) ≈ ${r(a, 3)} keV per count and b ≈ ${r(b, 0)} keV. Any ADC value then reads as an energy; 2500 counts is ≈ ${r(E(2500), 0)} keV. Checking other known lines against the line is the linearity test.`,
    alt: "Energy in keV against ADC count: a straight line through the 662 keV peak at 1650 and the 1332 keV peak at 3240, with 2500 counts read as about 1020 keV.",
    description: [`Slope a = (1332 − 662)/(3240 − 1650) = 670/1590 ≈ ${r(a, 3)} keV per ADC count.`, `Intercept b = 662 − ${r(a, 3)} × 1650 ≈ ${r(b, 0)} keV.`, `Reading ADC = 2500: E ≈ ${r(a, 3)} × 2500 − 33 ≈ ${r(E(2500), 0)} keV.`],
    range: { x: [0, 4000], y: [0, 1500] }, ticks: [[1000, 2000, 3000, 4000], [500, 1000, 1500]], height: [320, 300], xLabelBelow: true, axisLabels: ["ADC channel", "energy / keV"],
    curves: [{ expr: L, colour: "a1", label: "E = a·ADC + b", labelAt: [450, 350] }],
    marks: [{ x: 2500, to: r(E(2500), 1) }],
    points: [{ x: 1650, y: 662, colour: "a2", label: "662 keV", dx: 10, dy: 20 }, { x: 3240, y: 1332, colour: "a2", label: "1332 keV", dx: -10, dy: 22, anchor: "end" }, { x: 2500, y: r(E(2500), 1), colour: "a4", label: `2500 → ${r(E(2500), 0)} keV`, dx: -10, dy: -12, anchor: "end" }],
    checks: [{ type: "point", expr: L, x: 1650, y: 662, name: "662 keV at ADC 1650" }, { type: "point", expr: L, x: 3240, y: 1332, name: "1332 keV at ADC 3240" }, { type: "slope", expr: L, x: 2000, value: r(a, 6), name: `a = ${r(a, 3)} keV per count` }, { type: "point", expr: L, x: 2500, y: r(E(2500), 4), name: `2500 counts ≈ ${r(E(2500), 0)} keV` }],
  }); }

// u43-19 S/sqrt(B) against the Asimov formula for B = 16
{ const B = 16, S = 25, A = (s) => Math.sqrt(2 * ((s + B) * Math.log(1 + s / B) - s)), AE = `sqrt(2*((x+${B})*log(1+x/${B})-x))`;
  mk("u43-19", "phys-u43-significance", "graph", {
    title: "S/√B overstates the significance when S is large",
    caption: `For B = 16 the simple S/√B and the Asimov formula agree when S ≪ B but part company as S grows. At S = 25 they give ${S / Math.sqrt(B)} and ${r(A(S), 1)}: the Asimov result is the one to quote when S is comparable to B, because it accounts for the Poisson spread of the background.`,
    alt: "Significance in sigma against signal counts S for background 16: a straight line S over root B and a lower curved Asimov line that separate as S grows, with 6.25 and 5.2 marked at S equal 25.",
    description: ["Simple: Z = S/√B = S/4 for B = 16, a straight line.", `Asimov: Z = √(2[(S + B)ln(1 + S/B) − S]); at S = 25, √(2[41 × ${r(Math.log(1 + 25 / 16), 4)} − 25]) ≈ ${r(A(S), 1)}.`, `At S = 25 the simple formula gives ${S / Math.sqrt(B)}σ, about ${r(((S / Math.sqrt(B)) / A(S) - 1) * 100, 0)}% too high.`, "For small S the two curves coincide."],
    range: { x: [0, 40], y: [0, 10] }, ticks: [[10, 20, 30, 40], [2, 4, 6, 8, 10]], height: [320, 300], xLabelBelow: true, axisLabels: ["signal events S (B = 16)", "significance Z / σ"],
    curves: [{ expr: `x/${Math.sqrt(B)}`, colour: "a2", dash: "6 5", label: "S/√B", labelAt: [30, 8.2] }, { expr: AE, colour: "a1", label: "Asimov", labelAt: [32, 5.6] }],
    points: [{ x: S, y: S / Math.sqrt(B), colour: "a2", label: `${S / Math.sqrt(B)}`, dx: -10, dy: -10, anchor: "end" }, { x: S, y: r(A(S), 4), colour: "a1", label: `${r(A(S), 1)}`, dx: 10, dy: 20 }],
    checks: [{ type: "point", expr: `x/${Math.sqrt(B)}`, x: S, y: 6.25, name: "S/√B = 6.25 at S = 25" }, { type: "point", expr: AE, x: S, y: r(A(S), 6), name: `Asimov Z = ${r(A(S), 1)} at S = 25` }, { type: "value", expr: AE, x: 40, between: [0, 10], name: "stays below S/√B (10 at S = 40)" }],
  }); }
