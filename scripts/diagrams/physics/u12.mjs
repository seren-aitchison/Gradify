// Unit 12, Thermodynamics. Every number in a caption or claim is computed here once. Run: node scripts/diagrams/physics/u12.mjs
import { mk } from "./spec.mjs";

const R = 8.31, f0 = (x) => x.toFixed(0), f1 = (x) => x.toFixed(1), f2 = (x) => x.toFixed(2);

// u12-04 Specific heat capacity: the 2.0 kW kettle
{
  const P = 2000, m = 1.0, c = 4180, T0 = 20, T1 = 100, Q = m * c * (T1 - T0), t = Q / P, rate = P / (m * c);
  mk("u12-04", "phys-u12-kettle-heating", "graph", {
    title: "Heating 1.0 kg of water with a 2.0 kW kettle",
    caption: `With Q = mcΔT = ${m} × ${c} × ${T1 - T0} = ${f0(Q / 1000)} kJ and a power of ${P / 1000} kW, the water reaches ${T1} °C after t = Q/P = ${f1(t)} s (about ${f1(t / 60)} min). The line is straight because c is taken as constant and all the power goes into the water, so ${f2(rate)} K rise every second: the stated time is a minimum.`,
    alt: `Graph of water temperature against time: a straight line from ${T0} °C at 0 s to ${T1} °C at ${f1(t)} s.`,
    description: [`The horizontal axis is time in seconds, the vertical axis is the water temperature in °C.`, `The temperature rises at P/(mc) = ${P} ÷ (${m} × ${c}) = ${f2(rate)} K s⁻¹, starting at ${T0} °C.`, `The line reaches ${T1} °C at t = ${f1(t)} s, the lesson's answer of about 167 s.`],
    range: { x: [0, 200], y: [0, 120] }, ticks: [[50, 100, 150, 200], [20, 40, 60, 80, 100]], grid: [50, 20], height: [320, 300], xLabelBelow: true, axisLabels: ["t / s", "T / °C"],
    curves: [{ expr: `${T0}+${rate}*x`, colour: "a1", domain: [0, t], label: "T = 20 + 0.478 t", labelAt: [20, 52] }],
    points: [{ x: 0, y: T0, label: "20 °C", dx: 10, dy: -10 }, { x: t, y: T1, label: `${f1(t)} s`, dx: -8, dy: -14, anchor: "end" }],
    marks: [{ y: 100 }],
    checks: [{ type: "point", expr: `${T0}+${rate}*x`, x: 0, y: T0, name: "starts at 20 °C" }, { type: "point", expr: `${T0}+${rate}*x`, x: t, y: T1, name: `reaches 100 °C at t = Q/P = ${f1(t)} s` }, { type: "slope", expr: `${T0}+${rate}*x`, x: 50, value: rate, name: `the gradient is P/(mc) = ${f2(rate)} K per second` }],
  });
}

// u12-05 Latent heat: 0.5 kg of ice at -10 °C to steam at 100 °C
{
  const m = 0.5, ci = 2100, cw = 4180, Lf = 334, Lv = 2260;
  const q1 = (m * ci * 10) / 1000, q2 = m * Lf, q3 = (m * cw * 100) / 1000, q4 = m * Lv, a = q1, b = a + q2, c = b + q3, d = c + q4;
  mk("u12-05", "phys-u12-heating-curve", "graph", {
    title: "Heating curve: ice at −10 °C to steam at 100 °C",
    caption: `For ${m} kg: warming the ice takes ${f1(q1)} kJ, melting ${f0(q2)} kJ, warming the water ${f0(q3)} kJ and boiling ${f0(q4)} kJ, a total of ${f0(d)} kJ. The sloping parts have gradient 1/(mc); the flat plateaus are the latent heats, where energy goes into the bonds and the temperature stays put. Boiling alone is ${f0((q4 / d) * 100)}% of the total.`,
    alt: `Graph of temperature against energy supplied: a short slope from −10 to 0 °C, a plateau at 0 °C to ${f0(b)} kJ, a slope to 100 °C at ${f0(c)} kJ, then a long plateau at 100 °C ending at ${f0(d)} kJ.`,
    description: [`The horizontal axis is the energy supplied in kJ; the vertical axis is the temperature in °C.`, `Ice warms from −10 to 0 °C: Q = ${m} × ${ci} × 10 = ${f1(q1)} kJ.`, `Melting at 0 °C: Q = mL = ${m} × ${Lf} = ${f0(q2)} kJ, a flat plateau.`, `Water warms 0 to 100 °C: ${m} × ${cw} × 100 = ${f0(q3)} kJ.`, `Boiling at 100 °C: ${m} × ${Lv} = ${f0(q4)} kJ, the longest plateau. Total ≈ ${f0(d)} kJ.`],
    range: { x: [0, 1700], y: [-20, 125] }, ticks: [[0, 500, 1000, 1500], [0, 50, 100]], grid: [500, 50], height: [340, 320], xLabelBelow: true, axisLabels: ["Q / kJ", "T / °C"],
    curves: [
      { expr: `-10+10*x/${q1}`, domain: [0, a], colour: "a1", width: 3.4 },
      { expr: "0+0*x", domain: [a, b], colour: "a2", width: 3.4, label: "melting", labelAt: [a + 30, 12], anchor: "start" },
      { expr: `100*(x-${b})/${q3}`, domain: [b, c], colour: "a1", width: 3.4 },
      { expr: "100+0*x", domain: [c, d], colour: "a2", width: 3.4, label: "boiling", labelAt: [c + 330, 112], anchor: "middle" },
    ],
    points: [{ x: d, y: 100, label: `${f0(d)} kJ`, dx: -4, dy: 18, anchor: "end" }],
    checks: [
      { type: "point", expr: `-10+10*x/${q1}`, x: a, y: 0, name: `ice reaches 0 °C after ${f1(q1)} kJ` },
      { type: "point", expr: `100*(x-${b})/${q3}`, x: b, y: 0, name: `the water starts at 0 °C after ${f0(b)} kJ (melting took ${f0(q2)} kJ)` },
      { type: "point", expr: `100*(x-${b})/${q3}`, x: c, y: 100, name: `the water reaches 100 °C after ${f0(c)} kJ` },
      { type: "slope", expr: `100*(x-${b})/${q3}`, x: 300, value: 100 / q3, name: "the water gradient is 1/(mc)" },
    ],
  });
}

// u12-07 First law
{
  const Q = 500, W = 200, dU = Q - W;
  mk("u12-07", "phys-u12-first-law", "sankey", {
    title: "The first law: where 500 J of heat goes",
    caption: `The gas absorbs Q = ${Q} J. Of it, W = ${W} J leaves as work done by the gas and the other ΔU = Q − W = +${dU} J stays as internal energy. Energy is conserved: the two outputs add up to the heat put in.`,
    alt: `Energy flow: ${Q} J of heat in splits into ${W} J of work done by the gas and ${dU} J of increased internal energy.`,
    description: [`${Q} J of heat flows into the gas.`, `${W} J leaves as work done by the gas on its surroundings.`, `ΔU = ${Q} − ${W} = +${dU} J remains in the gas as internal energy, so its temperature rises.`],
    units: "J", input: { label: "heat absorbed Q", value: Q }, outputs: [{ label: "work done by gas W", value: W, useful: true }, { label: "rise in internal energy ΔU", value: dU }],
  });
}

// u12-08 Work by an isothermal ideal gas
{
  const n = 2, T = 300, V1 = 10, V2 = 30, nRT = n * R * T, W = nRT * Math.log(V2 / V1), pf = (V) => nRT / V;
  mk("u12-08", "phys-u12-isothermal-work", "graph", {
    title: "Work done as the area under the isotherm",
    caption: `For 2 mol at ${T} K, p = nRT/V = ${f0(nRT)}/V (p in kPa, V in L). The shaded area between V = ${V1} L and ${V2} L is W = ∫p dV = nRT ln(V₂/V₁) = ${n} × ${R} × ${T} × ln 3 = ${f1(W / 1000)} kJ. The gas starts at ${f0(pf(V1))} kPa and ends at ${f0(pf(V2))} kPa.`,
    alt: `p–V graph: a falling hyperbola from ${f0(pf(V1))} kPa at 10 L to ${f0(pf(V2))} kPa at 30 L, with the area under it shaded: ${f1(W / 1000)} kJ.`,
    description: [`The horizontal axis is volume in litres, the vertical axis pressure in kPa.`, `The isotherm p = ${f0(nRT)}/V falls from ${f0(pf(V1))} kPa at ${V1} L to ${f0(pf(V2))} kPa at ${V2} L.`, `The area under it between the two volumes is the work done by the gas: ${n} × ${R} × ${T} × ln 3 = ${f1(W / 1000)} kJ.`],
    range: { x: [0, 35], y: [0, 600] }, ticks: [[10, 20, 30], [100, 200, 300, 400, 500]], grid: [10, 100], height: [320, 300], xLabelBelow: true, axisLabels: ["V / L", "p / kPa"],
    areas: [{ expr: `${nRT}/x`, from: V1, to: V2, colour: "a1", opacity: 0.25 }],
    curves: [{ expr: `${nRT}/x`, domain: [7, 35], colour: "a1", label: "300 K", labelAt: [22, 260] }],
    points: [{ x: V1, y: pf(V1), label: `${f0(pf(V1))} kPa`, dx: 10, dy: -8 }, { x: V2, y: pf(V2), label: `${f0(pf(V2))} kPa`, dx: -4, dy: -14, anchor: "end" }],
    checks: [{ type: "area", expr: `${nRT}/x`, from: V1, to: V2, value: W, tol: 0.5, name: `area under the isotherm = nRT ln 3 = ${f0(W)} J (kPa × L = J)` }, { type: "point", expr: `${nRT}/x`, x: V1, y: pf(V1), name: "pV = nRT at 10 L" }],
  });
}

// u12-09 p-V rectangle
{
  const p1 = 100, p2 = 300, V1 = 1, V2 = 2, top = p2 * (V2 - V1), bot = p1 * (V2 - V1), net = top - bot;
  mk("u12-09", "phys-u12-pv-rectangle", "graph", {
    title: "A clockwise rectangle on a p–V diagram",
    caption: `The gas expands at ${p2} kPa (area under the top edge ${top} J) and is compressed at ${p1} kPa (${bot} J given back), so the net work done by the gas is the enclosed area: ${top} − ${bot} = ${net} J. A clockwise cycle on p–V gives positive net work. This is the lesson's ${p1 / 100}–${p2 / 100} × 10⁵ Pa, ${V1}–${V2} L example.`,
    alt: `p–V rectangle with corners at (${V1} L, ${p1} kPa), (${V1} L, ${p2} kPa), (${V2} L, ${p2} kPa) and (${V2} L, ${p1} kPa) traversed clockwise; enclosed area ${net} J.`,
    description: ["The horizontal axis is volume in litres, the vertical axis pressure in kPa.", `Clockwise from the bottom left: heated at constant volume from ${p1} to ${p2} kPa, expands at ${p2} kPa from ${V1} to ${V2} L, cooled at constant volume, compressed at ${p1} kPa.`, `Work done by the gas on the way across the top: ${p2} × (${V2} − ${V1}) = ${top} J; work done on it on the way back: ${bot} J.`, `Net work done per cycle = enclosed area = ${net} J.`],
    range: { x: [0, 3], y: [0, 400] }, ticks: [[1, 2], [100, 200, 300]], grid: [1, 100], height: [320, 300], xLabelBelow: true, axisLabels: ["V / L", "p / kPa"],
    series: [{ points: [[V1, p1], [V1, p2], [V2, p2], [V2, p1], [V1, p1]], colour: "a1", width: 3 }],
    arrows: [{ from: [1.35, p2], to: [1.7, p2], colour: "a1", label: "expansion", dy: -14 }, { from: [1.7, p1], to: [1.35, p1], colour: "a1", label: "compression", dy: 18 }],
    points: [{ x: 1.5, y: 200, label: `area = ${net} J`, colour: "a2", anchor: "middle", dx: 0, dy: 24 }],
    checks: [{ type: "area", expr: `${p2}+0*x`, from: V1, to: V2, value: top, tol: 0.01, name: `work done by the gas on expansion = ${top} J` }, { type: "area", expr: `${p1}+0*x`, from: V1, to: V2, value: bot, tol: 0.01, name: `work done on the gas on compression = ${bot} J` }, { type: "value", expr: `${p2}-${p1}`, x: 0, between: [net / (V2 - V1), net / (V2 - V1)], name: `net work = (${p2} − ${p1}) kPa × (${V2} − ${V1}) L = ${net} J` }],
  });
}

// u12-11 Adiabat against isotherm: air compressed 20 times
{
  const g = 1.4, r = 20, T1 = 300, T2 = T1 * r ** (g - 1), pa = r ** g, pi = r;
  mk("u12-11", "phys-u12-adiabat-isotherm", "graph", {
    title: "Adiabatic compression of air is steeper than isothermal",
    caption: `Compressing air (γ = ${g}) to 1/${r} of its volume: along the isotherm pV = constant the pressure rises ${r}-fold (T stays ${T1} K); along the adiabat pV^γ = constant it rises ${f1(pa)}-fold, because the gas also heats up. T₂ = ${T1} × ${r}^${g - 1} = ${f0(T2)} K, which is ${f0(pa / pi * T1)} K from the pressure ratio ${f1(pa)}/${pi}. At any point the adiabat is ${g} times as steep.`,
    alt: `p–V graph with pressure and volume as ratios to the start: the isotherm and the steeper adiabat both start at (1, 1); at V = 0.05 the isotherm is at ${pi} and the adiabat at ${f1(pa)}.`,
    description: [`Both axes are ratios to the starting state: V/V₁ (from 1 down to 1/${r}) and p/p₁.`, `Isotherm p = 1/V reaches ${pi} when V = 1/${r}.`, `Adiabat p = V^−${g} reaches ${r}^${g} = ${f1(pa)} there, and starts ${g} times as steep: dp/dV = −γp/V against −p/V.`, `The temperature ratio is the pressure ratio ÷ ${r}: ${f2(pa / pi)}, so T₂ = ${f0(T2)} K.`],
    range: { x: [0, 1.1], y: [0, 75] }, ticks: [[0.05, 0.25, 0.5, 0.75, 1], [20, 40, 60]], grid: [0.25, 20], height: [330, 310], xLabelBelow: true, axisLabels: ["V / V₁", "p / p₁"],
    curves: [{ expr: "1/x", colour: "a1", domain: [0.045, 1.1], label: "isotherm", labelAt: [0.3, 8], anchor: "start" }, { expr: `x^(-${g})`, colour: "a2", domain: [0.045, 1.1], label: "adiabat", labelAt: [0.1, 58] }],
    points: [{ x: 1, y: 1, label: "start", dx: -8, dy: -12, anchor: "end" }, { x: 1 / r, y: pi, colour: "a1", label: String(pi), dx: 10, dy: 0 }, { x: 1 / r, y: pa, colour: "a2", label: f1(pa), dx: 10, dy: 0 }],
    checks: [{ type: "point", expr: "1/x", x: 1 / r, y: pi, name: `isotherm: p rises ${r}-fold` }, { type: "point", expr: `x^(-${g})`, x: 1 / r, y: pa, name: `adiabat: p rises ${r}^1.4 = ${f1(pa)}-fold` }, { type: "slope", expr: `x^(-${g})`, x: 1, value: -g, name: `at the start the adiabat gradient is −γ = −${g}` }, { type: "slope", expr: "1/x", x: 1, value: -1, name: "at the start the isotherm gradient is −1" }],
  });
}

// u12-12 Isobaric heating of a diatomic gas
{
  const n = 2, dT = 50, CV = 2.5 * R, Q = n * (CV + R) * dT, W = n * R * dT, dU = n * CV * dT;
  mk("u12-12", "phys-u12-isobaric-split", "sankey", {
    title: "Heating a diatomic gas at constant pressure",
    caption: `Heating 2 mol by ${dT} K at constant pressure takes Q = nC_pΔT = ${f0(Q)} J. Of this ΔU = nC_VΔT = ${f0(dU)} J raises the internal energy and W = nRΔT = ${f0(W)} J is the work of expanding: C_p = C_V + R, so ${f0((W / Q) * 100)}% of the heat becomes work (γ = 7/5).`,
    alt: `Energy flow: ${f0(Q)} J of heat in, ${f0(dU)} J to internal energy and ${f0(W)} J to work done by the gas.`,
    description: [`Heat supplied at constant pressure: Q = 2 × (5R/2 + R) × 50 = ${f0(Q)} J.`, `Internal energy: ΔU = 2 × 5R/2 × 50 = ${f0(dU)} J.`, `Work: W = pΔV = nRΔT = 2 × ${R} × 50 = ${f0(W)} J. ΔU + W = Q.`],
    units: "J", input: { label: "heat Q", value: Q }, outputs: [{ label: "internal energy ΔU", value: dU }, { label: "work done by gas W", value: W, useful: true }],
  });
}

// u12-13 Heat engine: a power station
{
  const Qh = 2500, W = 1000, Qc = Qh - W, eta = W / Qh;
  mk("u12-13", "phys-u12-power-station", "sankey", {
    title: "A power station as a heat engine",
    caption: `The station takes in Q_h = ${Qh} MW of heat, outputs W = ${W} MW of electricity and rejects Q_c = Q_h − W = ${Qc} MW to the cooling towers or a river. Efficiency η = W/Q_h = ${f0(eta * 100)}%. The rejected heat cannot be avoided entirely: the second law forbids η = 100%.`,
    alt: `Energy flow: ${Qh} MW of heat in, ${W} MW of electricity out and ${Qc} MW of waste heat; efficiency ${f0(eta * 100)} percent.`,
    description: [`${Qh} MW of heat enters the engine from the hot source.`, `${W} MW leaves as electrical work.`, `${Qc} MW is rejected to the cold sink. Efficiency = ${W} ÷ ${Qh} = ${f0(eta * 100)}%.`],
    units: "MW", input: { label: "heat in Q_{h}", value: Qh }, outputs: [{ label: "electricity W", value: W, useful: true }, { label: "heat rejected Q_{c}", value: Qc }], efficiency: eta,
  });
}

// u12-19 Carnot cycle on a p-V diagram
{
  const n = 1, g = 5 / 3, Th = 773.15, Tc = 293.15, VA = 1, VB = 2, k = (Th / Tc) ** (1 / (g - 1)), VC = VB * k, VD = VA * k;
  const nRTh = n * R * Th / 1000, nRTc = n * R * Tc / 1000, pA = nRTh / VA, pB = nRTh / VB, pC = nRTc / VC, pD = nRTc / VD, eta = 1 - Tc / Th;
  const hot = `${nRTh}/x`, cold = `${nRTc}/x`, adB = `${pB}*(${VB}/x)^${g}`, adD = `${pD}*(${VD}/x)^${g}`;
  const area = (c, V1, V2) => c * Math.log(V2 / V1), W = nRTh * Math.log(VB / VA) - nRTc * Math.log(VC / VD);
  const AB = area(nRTh, VA, VB), CD = area(nRTc, VD, VC);
  const adArea = (p0, V0, V1, V2) => (p0 * V0 ** g * (V1 ** (1 - g) - V2 ** (1 - g))) / (g - 1);
  mk("u12-19", "phys-u12-carnot-cycle", "graph", {
    title: "The Carnot cycle between 500 °C and 20 °C",
    caption: `1 mol of monatomic gas runs A→B isothermally at T_h = ${f0(Th)} K (500 °C), B→C adiabatically, C→D isothermally at T_c = ${f0(Tc)} K (20 °C), D→A adiabatically. Heat in Q_h = nRT_h ln(V_B/V_A) = ${f1(AB)} kJ, heat out Q_c = ${f1(CD)} kJ, so Q_c/Q_h = T_c/T_h and η = 1 − ${f0(Tc)}/${f0(Th)} = ${f0(eta * 100)}%. Net work (enclosed area) ${f1(W)} kJ.`,
    alt: `p–V diagram of a Carnot cycle: a hot isotherm A to B, an adiabat B to C, a cold isotherm C to D and an adiabat D to A; efficiency ${f0(eta * 100)} percent.`,
    description: [`Axes: volume in litres, pressure in MPa, for 1 mol.`, `A→B: isothermal expansion at ${f0(Th)} K from ${VA} L to ${VB} L, absorbing Q_h = ${f1(AB)} kJ.`, `B→C: adiabatic expansion to ${f1(VC)} L, cooling to ${f0(Tc)} K (TV^(γ−1) is constant, γ = 5/3).`, `C→D: isothermal compression at ${f0(Tc)} K to ${f1(VD)} L, rejecting Q_c = ${f1(CD)} kJ.`, `D→A: adiabatic compression back to A. η = W/Q_h = ${f1(W)}/${f1(AB)} = ${f0(eta * 100)}% = 1 − T_c/T_h.`],
    range: { x: [0, 10], y: [0, 7.5] }, ticks: [[2, 4, 6, 8, 10], [2, 4, 6]], grid: [2, 2], height: [350, 330], xLabelBelow: true, axisLabels: ["V / L", "p / MPa"],
    curves: [
      { expr: hot, domain: [VA, VB], colour: "a2", width: 3.4, label: "T_{h}", labelAt: [1.35, 5.3], anchor: "middle" },
      { expr: adB, domain: [VB, VC], colour: "a1", width: 3.4 },
      { expr: cold, domain: [VD, VC], colour: "a1", width: 3.4, label: "T_{c}", labelAt: [6, 0.9], anchor: "middle" },
      { expr: adD, domain: [VA, VD], colour: "a1", width: 3.4 },
    ],
    points: [{ x: VA, y: pA, label: "A", dx: -10, dy: -8, anchor: "end" }, { x: VB, y: pB, label: "B", dx: 8, dy: -10 }, { x: VC, y: pC, label: "C", dx: 8, dy: -10 }, { x: VD, y: pD, label: "D", dx: 0, dy: -14, anchor: "middle" }],
    checks: [
      { type: "point", expr: hot, x: VA, y: pA, name: "A lies on the hot isotherm" }, { type: "point", expr: hot, x: VB, y: pB, name: "B lies on the hot isotherm" },
      { type: "intersect", a: hot, b: `${pA}*(${VA}/x)^0`, x: VA, y: pA, name: "pV = nRT_h at A" },
      { type: "point", expr: adB, x: VB, y: pB, name: "the adiabat B→C starts at B" }, { type: "point", expr: adB, x: VC, y: pC, name: `the adiabat B→C reaches the cold isotherm at C (T = ${f0(Tc)} K)` },
      { type: "point", expr: cold, x: VC, y: pC, name: "C lies on the cold isotherm" }, { type: "point", expr: cold, x: VD, y: pD, name: "D lies on the cold isotherm" },
      { type: "point", expr: adD, x: VA, y: pA, name: `the adiabat D→A ends at A (V_C/V_B = V_D/V_A)` },
      { type: "area", expr: hot, from: VA, to: VB, value: AB, tol: 0.01, name: `Q_h = nRT_h ln(V_B/V_A) = ${f1(AB)} kJ` },
      { type: "area", expr: cold, from: VD, to: VC, value: CD, tol: 0.01, name: `Q_c = nRT_c ln(V_C/V_D) = ${f1(CD)} kJ, so Q_c/Q_h = T_c/T_h` },
    ],
  });
}

// u12-23 Gibbs free energy: when does ice melt?
{
  const dH = 6.01, dS = 22.0, Tm = (dH * 1000) / dS;
  mk("u12-23", "phys-u12-gibbs-melting", "graph", {
    title: "Free energy of melting against temperature",
    caption: `For ice → water, ΔG = ΔH − TΔS = ${dH} − ${dS / 1000} T (kJ mol⁻¹). Below T = ΔH/ΔS = ${f0(dH * 1000)}/${dS} = ${f0(Tm)} K, ΔG > 0 and melting does not happen on its own; above it ΔG < 0. At ΔG = 0 the two phases are in equilibrium: the melting point, 273 K.`,
    alt: `Graph of ΔG against temperature: a straight line falling from ${dH} kJ per mole at 0 K through zero at ${f0(Tm)} K.`,
    description: ["The horizontal axis is temperature in kelvin, the vertical axis ΔG for melting in kJ mol⁻¹.", `ΔG = ΔH − TΔS is a straight line of gradient −ΔS = −${dS / 1000} kJ mol⁻¹ K⁻¹, starting at ΔH = +${dH} kJ mol⁻¹.`, `It crosses zero at T = ${f0(Tm)} K: ice and water coexist. Left of this ice is stable, right of it water is.`],
    range: { x: [0, 400], y: [-3, 7] }, ticks: [[100, 200, 300, 400], [-2, 0, 2, 4, 6]], grid: [100, 2], height: [320, 300], xLabelBelow: true, axisLabels: ["T / K", "ΔG / kJ mol^{-1}"],
    curves: [{ expr: `${dH}-${dS / 1000}*x`, colour: "a1", label: "ΔG = ΔH − TΔS", labelAt: [20, 3.4], anchor: "start" }],
    points: [{ x: Tm, y: 0, label: `${f0(Tm)} K`, colour: "a2", dx: 10, dy: -12 }],
    bands: [{ x: [0, Tm], label: "ice stable", colour: "a4" }, { x: [Tm, 400], label: "water stable", colour: "a2" }],
    checks: [{ type: "point", expr: `${dH}-${dS / 1000}*x`, x: Tm, y: 0, name: `ΔG = 0 at T = ΔH/ΔS = ${f0(Tm)} K` }, { type: "point", expr: `${dH}-${dS / 1000}*x`, x: 0, y: dH, name: "ΔG = ΔH at 0 K" }, { type: "slope", expr: `${dH}-${dS / 1000}*x`, x: 100, value: -dS / 1000, name: "gradient = −ΔS" }],
  });
}

// u12-27 Otto cycle
{
  const g = 1.4, r = 10, p1 = 1, V1 = r, V2 = 1, p2 = p1 * r ** g, p3 = 3 * p2, p4 = p3 / r ** g, qin = ((p3 - p2) * V2) / (g - 1), qout = ((p4 - p1) * V1) / (g - 1), eta = 1 - qout / qin, eta2 = 1 - r ** (1 - g);
  const comp = `${p1 * V1 ** g}*x^(-${g})`, expn = `${p3 * V2 ** g}*x^(-${g})`;
  const ar = (k, a, b) => (k * (a ** (1 - g) - b ** (1 - g))) / (g - 1), Wn = ar(p3, V2, V1) - ar(p1 * V1 ** g, V2, V1);
  mk("u12-27", "phys-u12-otto-cycle", "graph", {
    title: "The ideal Otto cycle, compression ratio 10",
    caption: `1→2 adiabatic compression from V to V/${r} (pressure × ${f1(p2)}), 2→3 heat in at constant volume, 3→4 adiabatic expansion, 4→1 heat out at constant volume. With γ = ${g}, η = 1 − r^(1−γ) = 1 − ${r}^−0.4 = ${f1(eta2 * 100)}%, found here also from heat in ∝ p₃ − p₂ and heat out ∝ p₄ − p₁ (${f1(eta * 100)}%). Real engines reach about 35%.`,
    alt: `p–V diagram of the Otto cycle: two adiabats joined by two vertical constant-volume lines, volume ratio ${r}; efficiency ${f0(eta2 * 100)} percent.`,
    description: ["Axes: volume as a multiple of the clearance volume, pressure as a multiple of the intake pressure p₁.", `1→2: adiabatic compression from V = ${r} to ${V2}: p rises from ${p1} to ${f1(p2)} (pV^${g} constant).`, `2→3: combustion at constant volume, p to ${f1(p3)}. 3→4: adiabatic expansion back to V = ${r}, p = ${f1(p4)}. 4→1: exhaust heat at constant volume.`, `Heat in ∝ ${f1(p3)} − ${f1(p2)}, heat out ∝ ${f1(p4)} − ${p1} (times V/(γ−1)): η = ${f1(eta * 100)}%.`],
    range: { x: [0, 11], y: [0, 85] }, ticks: [[1, 5, 10], [20, 40, 60, 80]], grid: [5, 20], height: [340, 320], xLabelBelow: true, axisLabels: ["V / V_{min}", "p / p₁"],
    curves: [{ expr: comp, domain: [V2, V1], colour: "a1", width: 3.4, label: "compression", labelAt: [3.4, 8], anchor: "start" }, { expr: expn, domain: [V2, V1], colour: "a2", width: 3.4, label: "expansion", labelAt: [4.5, 30], anchor: "start" }],
    series: [{ points: [[V2, p2], [V2, p3]], colour: "a3", width: 3.4 }, { points: [[V1, p4], [V1, p1]], colour: "a3", width: 3.4 }],
    points: [{ x: V1, y: p1, label: "1", dx: 8, dy: 14 }, { x: V2, y: p2, label: "2", dx: 10, dy: 4 }, { x: V2, y: p3, label: "3", dx: 10, dy: 4 }, { x: V1, y: p4, label: "4", dx: 8, dy: -8 }],
    checks: [{ type: "point", expr: comp, x: V2, y: p2, name: `compression to 1/${r} the volume raises p ${f1(p2)}-fold` }, { type: "point", expr: expn, x: V1, y: p4, name: "expansion returns to the full volume at p₄" },
      { type: "area", expr: expn, from: V2, to: V1, value: ar(p3, V2, V1), tol: 0.01, name: "work from the expansion adiabat" }, { type: "area", expr: comp, from: V2, to: V1, value: ar(p1 * V1 ** g, V2, V1), tol: 0.01, name: `net work ${f1(Wn)} = η × heat in (${f1(Wn / qin * 100)}% = 1 − r^(1−γ))` }],
  });
}

// u12-28 Ideal gas against van der Waals: CO2 in 1 L at 300 K
{
  const a = 0.364, b = 4.27e-5, T = 300, V0 = 1e-3, RT = R * T, pid = RT / V0 / 1e5, pvw = (RT / (V0 - b) - a / V0 ** 2) / 1e5, bL = b * 1000, aBar = (a * 1e6) / 1e5;
  const ideal = `${RT / 100}/x`, vdw = `${RT / 100}/(x-${bL})-${aBar}/(x*x)`;
  mk("u12-28", "phys-u12-vdw-co2", "graph", {
    title: "CO₂: ideal gas against van der Waals",
    caption: `1 mol of CO₂ at ${T} K in 1.0 L. Ideal gas: p = RT/V = ${f1(pid)} bar. Van der Waals, with a = ${a} Pa m⁶ mol⁻² and b = 4.27 × 10⁻⁵ m³ mol⁻¹: p = RT/(V − b) − a/V² = ${f1(RT / (V0 - b) / 1e5)} − ${f1(a / V0 ** 2 / 1e5)} = ${f1(pvw)} bar. The excluded volume b raises p; the attraction term a/V² lowers it, and here the attraction wins.`,
    alt: `Graph of pressure against volume for CO2 at 300 K: the ideal hyperbola and the lower van der Waals curve; at 1 litre they read ${f1(pid)} and ${f1(pvw)} bar.`,
    description: ["The horizontal axis is volume in litres, the vertical axis pressure in bar.", `The ideal-gas curve p = ${f1(RT / 100)}/V passes through ${f1(pid)} bar at 1.0 L.`, `The van der Waals curve lies below it at moderate volumes (attraction), ${f1(pvw)} bar at 1.0 L.`, "The two curves agree at large volume, where the molecules are far apart."],
    range: { x: [0.4, 3], y: [0, 60] }, ticks: [[0.5, 1, 1.5, 2, 2.5, 3], [10, 20, 30, 40, 50]], grid: [0.5, 10], height: [330, 310], xLabelBelow: true, axisLabels: ["V / L", "p / bar"],
    curves: [{ expr: ideal, colour: "a1", label: "ideal", labelAt: [0.55, 52], anchor: "start" }, { expr: vdw, colour: "a2", label: "van der Waals", labelAt: [1.5, 8], anchor: "start" }],
    points: [{ x: 1, y: pid, label: `${f1(pid)} bar`, colour: "a1", dx: 10, dy: -12 }, { x: 1, y: pvw, label: `${f1(pvw)} bar`, colour: "a2", dx: 10, dy: 20 }],
    checks: [{ type: "point", expr: ideal, x: 1, y: pid, name: `ideal gas: ${f1(pid)} bar at 1.0 L` }, { type: "point", expr: vdw, x: 1, y: pvw, name: `van der Waals: ${f1(pvw)} bar at 1.0 L` }],
  });
}

// u12-29 Critical point: reduced van der Waals isotherms
{
  const a = 0.364, b = 4.27e-5, Tc = (8 * a) / (27 * R * b), pf = (t) => `8*${t}/(3*x-1)-3/(x*x)`;
  mk("u12-29", "phys-u12-critical-isotherms", "graph", {
    title: "van der Waals isotherms around the critical point",
    caption: `In reduced units (p, V, T divided by their critical values) the van der Waals isotherms are p = 8T/(3V − 1) − 3/V². Above T_c (here T = 1.1) the curve is smooth; at T_c it has a flat inflection exactly at (1, 1), the critical point; below T_c (T = 0.9) it has a wiggle where liquid and gas coexist. For CO₂, T_c = 8a/(27Rb) = ${f0(Tc)} K.`,
    alt: "Three reduced van der Waals isotherms: a smooth one above the critical temperature, one with a flat inflection at the point (1, 1), and one below with a dip and a hump.",
    description: ["Axes: reduced volume V/V_c and reduced pressure p/p_c.", "T = 1.1 T_c: pressure falls monotonically with volume.", "T = T_c: the curve is flat (gradient 0) as it passes through (1, 1): the critical point where liquid and gas become identical.", `T = 0.9 T_c: the curve has a minimum and a maximum; the equal-area construction replaces that part by a horizontal line. CO₂: T_c = 8 × ${a}/(27 × ${R} × 4.27 × 10⁻⁵) = ${f0(Tc)} K.`],
    range: { x: [0.4, 3], y: [0, 1.8] }, ticks: [[0.5, 1, 1.5, 2, 2.5, 3], [0.5, 1, 1.5]], grid: [0.5, 0.5], height: [340, 320], xLabelBelow: true, axisLabels: ["V/V_{c}", "p/p_{c}"],
    curves: [{ expr: pf(1.1), colour: "a2", label: "T = 1.1 T_{c}", labelAt: [1.9, 1.38] }, { expr: pf(1), colour: "a1", width: 3.6, label: "T_{c}", labelAt: [2.0, 0.86] }, { expr: pf(0.9), colour: "a4", label: "0.9 T_{c}", labelAt: [1.9, 0.42] }],
    points: [{ x: 1, y: 1, label: "critical point", colour: "ink", dx: 12, dy: -14 }],
    checks: [{ type: "point", expr: pf(1), x: 1, y: 1, name: "the T = T_c isotherm passes through (1, 1)" }, { type: "slope", expr: pf(1), x: 1, value: 0, name: "its gradient there is zero: dp/dV = 0" }, { type: "slope", expr: pf(1.1), x: 1, value: (-8 * 1.1 * 3) / 4 + 6, name: "above T_c the gradient is still negative (no wiggle)" }],
  });
}
