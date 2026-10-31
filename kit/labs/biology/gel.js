// Agarose gel electrophoresis of DNA: digest a 5,000 bp circular plasmid with restriction enzymes, load the
// lanes beside a size ladder, run the gel and estimate an unknown band from the ladder. DNA is negatively
// charged (phosphate backbone) so it moves towards the positive electrode; over a useful range, distance
// travelled falls roughly linearly with log(size). Simplified: that log-linear relation is used throughout,
// and supercoiled uncut plasmid is shown running faster than its size suggests.
import { shell, canvas, slider, button, select, loop, clear, text, rrect, challenges, panel, C } from "../lab.js";

export const PLASMID = 5000;
export const SITES = { EcoRI: [396], BamHI: [1650], HindIII: [2210, 4420], PstI: [915, 3020, 3880] };
export const LADDER = [10000, 8000, 6000, 5000, 4000, 3000, 2500, 2000, 1500, 1000, 750, 500, 250];
// fragment sizes from cutting a circular plasmid at these positions
export function digest(enzymes) {
  const cuts = [...new Set(enzymes.flatMap((e) => SITES[e] || []))].sort((a, b) => a - b);
  if (!cuts.length) return null; // uncut
  return cuts.map((c, i) => (i < cuts.length - 1 ? cuts[i + 1] - c : PLASMID - c + cuts[0])).sort((a, b) => b - a);
}

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.8, max: 460 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  const lanes = [["Ladder"], ["Uncut"], ["EcoRI"], ["HindIII"], ["EcoRI", "BamHI"], ["Unknown"]];
  const unknownSize = Math.round(600 + Math.random() * 3800);
  let agarose = 1, run = 0, running = false, guess = 2000;
  const st = { ran: false, guess: false, two: false };
  const ch = challenges(ctrl, ctx, [
    { id: "run", text: "Run the gel and compare the digests with the ladder", test: (x) => x.ran },
    { id: "two", text: "Explain the HindIII lane: two sites in a circle give two fragments", test: (x) => x.two },
    { id: "size", text: "Estimate the unknown band's size to within 10%", test: (x) => x.guess },
  ]);
  slider(ctrl, { label: "Agarose", min: 0.6, max: 2, step: 0.1, value: agarose, unit: "%", fmt: (v) => v.toFixed(1), onInput: (v) => { agarose = v; } });
  const rb = button(ctrl, "Run gel", () => { running = !running; rb.textContent = running ? "Stop" : "Run gel"; if (!running) st.ran = run > 0.6, ch.check(st); }, "pri");
  button(ctrl, "Reset", () => { run = 0; running = false; rb.textContent = "Run gel"; });
  const sel = select(ctrl, { label: "Lane 5", options: [["EcoRI,BamHI", "EcoRI + BamHI"], ["PstI", "PstI"], ["BamHI,HindIII", "BamHI + HindIII"], ["EcoRI,PstI", "EcoRI + PstI"]], value: "EcoRI,BamHI", onChange: (v) => { lanes[4] = v.split(","); } });
  const gs = slider(ctrl, { label: "Your estimate", min: 250, max: 10000, step: 50, value: guess, unit: "bp", fmt: (v) => v.toLocaleString(), onInput: (v) => { guess = v; } });
  button(ctrl, "Check estimate", () => { const ok = Math.abs(guess - unknownSize) / unknownSize <= 0.1; if (ok) st.guess = true; ch.check(st); msg = ok ? `Within 10%: the band is ${unknownSize.toLocaleString()} bp.` : `Not within 10% yet. Use the ladder bands either side of it.`; draw(); });
  let msg = "";
  const quizBtns = document.createElement("div"); quizBtns.className = "lab-chips"; ctrl.append(quizBtns);
  quizBtns.innerHTML = `<span class="lab-msg">How many bands does the HindIII lane have?</span>${[1, 2, 3].map((n) => `<button type="button" data-n="${n}">${n}</button>`).join("")}`;
  quizBtns.addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; const ok = b.dataset.n === "2"; b.classList.add(ok ? "ok" : "no"); if (ok) { st.two = true; ch.check(st); } });
  // distance travelled (0–1 of the gel) for a fragment, at this agarose % and run time
  const dist = (bp) => { const slope = 0.42 + (agarose - 1) * 0.12; return Math.max(0.02, Math.min(1.1, run * (1.95 - slope * Math.log10(bp) - (agarose - 1) * 0.35))); };
  function bandsFor(lane) {
    if (lane[0] === "Ladder") return LADDER.map((b) => ({ bp: b, label: b }));
    if (lane[0] === "Unknown") return [{ bp: unknownSize }];
    const d = digest(lane); if (!d) return [{ bp: 3200, label: "supercoiled" }]; // uncut supercoiled plasmid runs ahead of its true size
    return d.map((bp) => ({ bp }));
  }
  function draw() {
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const top = 44, bot = H - 20, lw = (W - 40) / lanes.length;
    rrect(g, 14, 20, W - 28, H - 32, 12, "#10141a", "#2a3240");
    text(g, "− (wells)", 20, 16, { size: 11, color: C.mute }); text(g, "+", W - 24, H - 4, { size: 13, color: C.red });
    lanes.forEach((lane, i) => {
      const x = 20 + i * lw + lw * 0.15, w = lw * 0.7;
      rrect(g, x, top - 12, w, 8, 2, "#2a3240");
      text(g, i === 4 ? lane.join(" + ") : lane.join(" + "), x + w / 2, top + -16, { align: "center", size: 10, color: C.mute });
      for (const b of bandsFor(lane)) {
        const y = top + dist(b.bp) * (bot - top);
        if (y > bot) continue;
        const glow = g.createLinearGradient(0, y - 4, 0, y + 4); glow.addColorStop(0, "rgba(120,255,170,0)"); glow.addColorStop(0.5, `rgba(140,255,180,${lane[0] === "Ladder" ? 0.75 : 0.95})`); glow.addColorStop(1, "rgba(120,255,170,0)");
        g.fillStyle = glow; g.fillRect(x, y - 4, w, 8);
        if (lane[0] === "Ladder" && run > 0.3) text(g, b.bp >= 1000 ? `${b.bp / 1000} kb` : `${b.bp}`, x - 2, y + 3, { align: "right", size: 9, color: C.mute });
      }
    });
    const rows = lanes.slice(1, 5).map((l) => { const d = digest(l); return `<tr><td>${l.join(" + ")}</td><td>${d ? d.map((x) => x.toLocaleString()).join(", ") + " bp" : "uncut (supercoiled, runs fast)"}</td></tr>`; }).join("");
    out(`<table><tr><th>Lane</th><th>Fragments (from the plasmid map)</th></tr>${rows}<tr><td>Unknown</td><td>?</td></tr></table>
      <p class="lab-msg">${msg || `Plasmid of ${PLASMID.toLocaleString()} bp. Sites: EcoRI 396; BamHI 1,650; HindIII 2,210 and 4,420; PstI 915, 3,020 and 3,880. In a circle, n cuts give n fragments. Higher agarose percentages separate small fragments better.`}</p>`);
  }
  const stop = loop(el, (dt) => { if (running) { run = Math.min(1.25, run + dt * 0.12); if (run >= 1.25) { running = false; rb.textContent = "Run gel"; st.ran = true; ch.check(st); } } draw(); });
  return stop;
}
