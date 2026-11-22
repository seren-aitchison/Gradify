// Flow-cytometry gating simulator: a seeded sample of white blood cells on a forward-scatter / side-scatter plot.
// Drag the four gate edges to select the lymphocytes; the lab reports what share of events is gated, how pure the gate is,
// how many lymphocytes it caught and what percentage of the gated cells are CD4-positive. Illustrative simulated data
// (not a patient sample); in a real run the cell types are not coloured: that is only available here, as a coach.
import { shell, slider, toggle, panel, challenges, seeded, esc } from "../lab.js";

export const POPS = [
  { name: "lymphocytes", fsc: [300, 42], ssc: [200, 38], frac: 0.35, colour: "#748ffc" },
  { name: "monocytes", fsc: [500, 55], ssc: [390, 55], frac: 0.07, colour: "#ffa94d" },
  { name: "granulocytes", fsc: [470, 65], ssc: [690, 90], frac: 0.58, colour: "#69db7c" },
];
const CD4_FRAC = 0.4;   // illustrative share of lymphocytes that are CD4-positive

export function simulate(n = 1500, seed = 14) {
  const r = seeded(seed), gauss = () => Math.sqrt(-2 * Math.log(1 - r())) * Math.cos(2 * Math.PI * r()), ev = [];
  for (const p of POPS) for (let i = 0, k = Math.round(n * p.frac); i < k; i++) ev.push({ pop: p.name, fsc: Math.max(5, Math.min(995, p.fsc[0] + p.fsc[1] * gauss())), ssc: Math.max(5, Math.min(995, p.ssc[0] + p.ssc[1] * gauss())), cd4: p.name === "lymphocytes" && r() < CD4_FRAC });
  return ev;
}
// What a gate selects: the share of all events, its purity (gated cells that are lymphocytes), the recall (lymphocytes gated)
// and the percentage of the gated cells that carry CD4.
export function gateStats(ev, g) {
  const inside = ev.filter((e) => e.fsc >= g.fsc[0] && e.fsc <= g.fsc[1] && e.ssc >= g.ssc[0] && e.ssc <= g.ssc[1]), lym = ev.filter((e) => e.pop === "lymphocytes"), got = inside.filter((e) => e.pop === "lymphocytes");
  return { gated: inside.length, percent: ev.length ? (100 * inside.length) / ev.length : 0, purity: inside.length ? got.length / inside.length : 0, recall: lym.length ? got.length / lym.length : 0, cd4: inside.length ? (100 * inside.filter((e) => e.cd4).length) / inside.length : 0 };
}

const W = 520, H = 400, pad = { l: 52, r: 16, t: 14, b: 44 };
const sx = (v) => pad.l + (v / 1000) * (W - pad.l - pad.r), sy = (v) => H - pad.b - (v / 1000) * (H - pad.t - pad.b);

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row lab-top"></div><div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl"><div class="lab-side"></div></div></div>`);
  const ev = simulate(), g = { fsc: [100, 800], ssc: [50, 900] }, prog = { good: false, sloppy: false, tight: false }, st = { reveal: false };
  const info = panel($(".lab-side"));
  const ch = challenges($(".lab-side"), ctx, [
    { id: "good", text: "Gate the lymphocytes: at least 90% pure and 90% of them caught", test: (s) => s.good },
    { id: "sloppy", text: "Make a gate that is under 60% pure and see what it does to the CD4 count", test: (s) => s.sloppy },
    { id: "tight", text: "Make a gate that catches under half the lymphocytes", test: (s) => s.tight },
  ]);
  const ctl = $(".lab-top");
  const sl = (key, i, label, min, max) => slider(ctl, { label, min, max, step: 5, value: g[key][i], onInput: (v) => { g[key][i] = v; if (g.fsc[0] > g.fsc[1] || g.ssc[0] > g.ssc[1]) { g[key][i] = i ? g[key][0] : g[key][1]; } update(); } });
  const sliders = [sl("fsc", 0, "Size from", 0, 1000), sl("fsc", 1, "Size to", 0, 1000), sl("ssc", 0, "Granularity from", 0, 1000), sl("ssc", 1, "Granularity to", 0, 1000)];
  toggle(ctl, "Show cell types (not possible in a real run)", st.reveal, (v) => { st.reveal = v; draw(); });
  const draw = () => {
    const S = gateStats(ev, g), inGate = (e) => e.fsc >= g.fsc[0] && e.fsc <= g.fsc[1] && e.ssc >= g.ssc[0] && e.ssc <= g.ssc[1];
    const dots = (list, colour, op) => `<path d="M${list.map((e) => `${sx(e.fsc).toFixed(1)} ${sy(e.ssc).toFixed(1)}h0`).join("M")}" stroke="${colour}" stroke-opacity="${op}" stroke-width="3" stroke-linecap="round" fill="none"/>`;
    let pts = "";
    if (st.reveal) for (const p of POPS) pts += dots(ev.filter((e) => e.pop === p.name), p.colour, 0.8);
    else pts = dots(ev.filter((e) => !inGate(e)), "#868e96", 0.6) + dots(ev.filter(inGate), "#e8eaed", 0.85);
    let axes = ""; for (const t of [0, 250, 500, 750, 1000]) axes += `<text x="${sx(t)}" y="${H - pad.b + 16}" fill="#9aa0a6" font-size="11" text-anchor="middle">${t}</text><text x="${pad.l - 8}" y="${sy(t) + 4}" fill="#9aa0a6" font-size="11" text-anchor="end">${t}</text>`;
    $(".lab-stage").innerHTML = `<svg class="lab-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Scatter plot of side scatter against forward scatter with a gate"><rect x="${pad.l}" y="${pad.t}" width="${W - pad.l - pad.r}" height="${H - pad.t - pad.b}" fill="none" stroke="rgba(255,255,255,.35)"/>${axes}${pts}
      <rect x="${sx(g.fsc[0])}" y="${sy(g.ssc[1])}" width="${Math.max(0, sx(g.fsc[1]) - sx(g.fsc[0]))}" height="${Math.max(0, sy(g.ssc[0]) - sy(g.ssc[1]))}" fill="rgba(240,101,149,.08)" stroke="#f06595" stroke-width="2.2"/>
      <text x="${(pad.l + W - pad.r) / 2}" y="${H - 8}" fill="#e8eaed" font-size="12" text-anchor="middle">forward scatter (size), arbitrary units</text><text transform="translate(14 ${(pad.t + H - pad.b) / 2}) rotate(-90)" fill="#e8eaed" font-size="12" text-anchor="middle">side scatter (granularity)</text>
      ${st.reveal ? POPS.map((p, i) => `<text x="${W - pad.r - 8}" y="${pad.t + 18 + i * 16}" fill="${p.colour}" font-size="12" font-weight="700" text-anchor="end">${p.name}</text>`).join("") : ""}</svg>`;
    return S;
  };
  function update() {
    const S = draw(), pct = (v) => `${(100 * v).toFixed(0)}%`;
    prog.good = prog.good || (S.purity >= 0.9 && S.recall >= 0.9);
    prog.sloppy = prog.sloppy || (S.gated > 0 && S.purity < 0.6);
    prog.tight = prog.tight || (S.gated > 0 && S.recall < 0.5);
    ch.check(prog);
    const note = S.gated === 0 ? "The gate is empty." : S.purity < 0.6 ? "Many gated cells are not lymphocytes, so the CD4 percentage is diluted." : S.recall < 0.5 ? "The gate is too tight: it loses most of the lymphocytes." : S.purity >= 0.9 && S.recall >= 0.9 ? "A good gate: nearly all gated cells are lymphocytes, and nearly all lymphocytes are gated." : "Adjust the edges to enclose the low-size, low-granularity cluster.";
    info(`<h4>${S.percent.toFixed(1)}% of events are gated</h4><p>${S.gated} of ${ev.length} events. Of the gated cells, <b>${S.cd4.toFixed(1)}%</b> are CD4-positive.</p><p class="lab-msg">Purity ${pct(S.purity)} · lymphocytes caught ${pct(S.recall)}. ${esc(note)}</p><p class="lab-msg">Simulated sample: 40% of the lymphocytes are CD4-positive. The numbers are illustrative.</p>`);
  }
  void sliders; update();
}
