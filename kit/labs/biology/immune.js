// Primary and secondary immune responses, and vaccination: give an infection or a vaccine dose on any day and
// watch the pathogen and the antibody response. The antibody curves are a descriptive model of measured
// responses, not a mechanistic simulation: a primary response starts after about 6 days, peaks about 2 weeks
// after exposure and is mostly IgM at first; once memory cells exist, a response starts within about 2 days,
// peaks within a week, is mostly IgG and is roughly ten times larger. The pathogen grows logistically and is
// cleared in proportion to the antibody present. Arbitrary units throughout.
import { shell, canvas, button, axes, line, clear, text, challenges, panel, C } from "../lab.js";

// one response to an exposure: rises after a lag to a peak, then decays (IgM falls faster than IgG)
const wave = (t, { lag, tp, amp, half }) => { const x = t - lag; if (x <= 0) return 0; if (x <= tp) return amp * (x / tp) ** 2 * Math.exp(2 * (1 - x / tp)); return amp * Math.exp((-Math.LN2 * (x - tp)) / half); };
export function simulate(events, days = 120, h = 0.05) {
  const ex = [...events].sort((a, b) => a.day - b.day).map((e, i, all) => {
    const memory = all.slice(0, i).some((x) => e.day - x.day >= 7); // memory cells exist once an earlier response has had time to form them
    return { ...e, igm: memory ? { lag: 2, tp: 4, amp: 0.6, half: 4 } : { lag: 5, tp: 6, amp: 1.2, half: 4 }, igg: memory ? { lag: 2, tp: 5, amp: 10, half: 21 } : { lag: 7, tp: 9, amp: 1, half: 21 } };
  });
  const out = []; let P = 0;
  for (let t = 0, i = 0; t <= days; i++, t = i * h) {
    for (const e of ex) if (e.kind === "infection" && Math.abs(t - e.day) < h / 2) P += 1;
    const IgM = ex.reduce((a, e) => a + wave(t - e.day, e.igm), 0), IgG = ex.reduce((a, e) => a + wave(t - e.day, e.igg), 0);
    if (i % 4 === 0) out.push({ t, P, IgM, IgG });
    P = Math.max(0, P + h * (0.9 * P * (1 - P / 1000) - 3 * (IgM + IgG) * P)); if (P < 1e-3) P = 0;
  }
  return out;
}
export const peak = (tr, key, from, to) => tr.filter((p) => p.t >= from && p.t < to).reduce((a, p) => (p[key] > a[key] ? p : a), { [key]: 0, t: from });

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row tools"></div><div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.62, max: 380 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  let events = [{ day: 5, kind: "infection" }], day = 50;
  const st = { secondary: false, vaccine: false };
  const ch = challenges(ctrl, ctx, [
    { id: "sec", text: "Show a second infection: the response is faster and bigger", test: (x) => x.secondary },
    { id: "vac", text: "Vaccinate first, then infect: the pathogen barely grows", test: (x) => x.vaccine },
  ]);
  const add = (kind) => { events.push({ day, kind }); events.sort((a, b) => a.day - b.day); draw(); };
  button($(".tools"), "Infect on day…", () => add("infection"), "pri");
  button($(".tools"), "Vaccinate on day…", () => add("vaccine"));
  button($(".tools"), "Clear", () => { events = []; draw(); });
  const dayLbl = document.createElement("label"); dayLbl.className = "lab-sl"; dayLbl.innerHTML = `<span>Day</span><input type="range" min="0" max="110" value="${day}"><output>${day}</output>`; $(".tools").append(dayLbl);
  dayLbl.querySelector("input").addEventListener("input", (e) => { day = Number(e.target.value); dayLbl.querySelector("output").textContent = day; });
  function draw() {
    const tr = simulate(events), g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const mx = Math.max(5, ...tr.map((p) => Math.max(p.IgM, p.IgG)));
    const A = axes(g, { l: 50, t: 12, w: W - 64, h: H - 48 }, { x0: 0, x1: 120, y0: 0, y1: mx * 1.1, xl: "day", yl: "antibody (arbitrary units)", xt: 6, yt: 3, xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(0) });
    const pm = Math.max(1, ...tr.map((p) => p.P));
    line(g, tr.map((p) => [A.X(p.t), A.Y((p.P / pm) * mx * 0.5)]), "rgba(255,77,109,.6)", 1.6, [4, 3]);
    line(g, tr.map((p) => [A.X(p.t), A.Y(p.IgM)]), C.gold, 2); line(g, tr.map((p) => [A.X(p.t), A.Y(p.IgG)]), C.green, 2.4);
    for (const e of events) { line(g, [[A.X(e.day), A.Y(0)], [A.X(e.day), A.Y(mx * 1.1)]], e.kind === "infection" ? "rgba(255,77,109,.5)" : "rgba(90,160,255,.6)", 1, [2, 3]); text(g, e.kind === "infection" ? "infection" : "vaccine", A.X(e.day) + 3, 24, { size: 10, color: e.kind === "infection" ? C.red : C.blue }); }
    text(g, "IgG", A.X(115), A.Y(tr.at(-1).IgG) - 6, { size: 11, color: C.green, align: "right" }); text(g, "IgM", A.X(4), 40, { size: 11, color: C.gold }); text(g, "pathogen (scaled)", A.X(4), 56, { size: 11, color: C.red });
    const inf = events.filter((e) => e.kind === "infection");
    if (inf.length >= 2) { const p1 = peak(tr, "IgG", inf[0].day, inf[1].day), p2 = peak(tr, "IgG", inf[1].day, inf[1].day + 40); if (p2.IgG > p1.IgG * 1.5 && p2.t - inf[1].day < p1.t - inf[0].day) st.secondary = true; }
    const vac = events.find((e) => e.kind === "vaccine"), late = vac && inf.find((e) => e.day > vac.day + 10);
    if (late) { const pv = peak(tr, "P", late.day, late.day + 30).P, naive = peak(simulate([{ day: late.day, kind: "infection" }]), "P", late.day, late.day + 30).P; if (pv < naive * 0.2) st.vaccine = true; }
    ch.check(st);
    out(`<p class="lab-msg">The primary response has a lag of about a week while rare naive B cells specific to the antigen are selected and multiply; IgM comes first, then class switching to IgG. Memory cells make the secondary response faster, larger and mostly IgG. A vaccine supplies antigen without a growing pathogen, so it primes memory safely. The response curves are descriptive (their shape follows measured responses); units are arbitrary.</p>`);
  }
  draw();
}
