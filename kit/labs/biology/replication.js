// DNA replication at a replication fork (bacterial enzymes named, as in most courses): helicase unwinds,
// single-strand binding proteins hold the strands apart, primase lays RNA primers, DNA polymerase III
// extends them 5′→3′, so one strand is made continuously (leading) and the other in Okazaki fragments
// (lagging), which DNA polymerase I and ligase finish. Illustrative timing; fragments are drawn about
// 30 times shorter than real bacterial Okazaki fragments (1,000–2,000 nucleotides).
import { shell, canvas, loop, clear, text, circle, button, slider, quiz, C } from "../lab.js";

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-stage"></div><div class="lab-row tools"></div><div class="lab-legend">
    <span><i style="background:#ced4da"></i>Parent (template) strands</span><span><i style="background:${C.teal}"></i>New leading strand</span><span><i style="background:${C.lime}"></i>New lagging strand (Okazaki fragments)</span><span><i style="background:${C.red}"></i>RNA primer</span></div><div class="lab-q"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.5, max: 420 }), g = cv.g;
  let t = 0, playing = true, speed = 1, labels = true;
  const L = 110; // fragment length in px
  const tools = $(".tools");
  const pb = button(tools, "Pause", () => { playing = !playing; pb.textContent = playing ? "Pause" : "Play"; });
  button(tools, "Restart", () => { t = 0; });
  button(tools, "Labels", () => { labels = !labels; });
  slider(tools, { label: "Speed", min: 0.25, max: 3, step: 0.25, value: 1, fmt: (v) => `${v}×`, onInput: (v) => { speed = v; } });
  quiz($(".lab-q"), ctx, [
    { id: "dir", q: "Why is the lagging strand made in fragments?", options: ["DNA polymerase can only add nucleotides to a 3′ end, so it can only build 5′→3′", "Helicase only unwinds short stretches", "The lagging template is damaged", "Primase is too slow"], answer: 0, why: "The two template strands are antiparallel. Polymerase only extends 5′→3′, so on one template it must work away from the fork, restarting with a new primer each time more template is exposed." },
    { id: "primer", q: "Which enzyme removes the RNA primers and fills the gap with DNA?", options: ["DNA ligase", "DNA polymerase I", "Primase", "Helicase"], answer: 1, why: "DNA polymerase I's 5′→3′ exonuclease removes RNA primer nucleotides while its polymerase activity replaces them with DNA. Ligase then seals the nick." },
    { id: "ligase", q: "What does DNA ligase do?", options: ["Unwinds the double helix", "Joins Okazaki fragments by forming a phosphodiester bond across the nick", "Makes RNA primers", "Relieves supercoiling ahead of the fork"], answer: 1, why: "Ligase forms the last phosphodiester bond between adjacent fragments, making the lagging strand continuous." },
  ]);
  function draw() {
    const W = cv.W, H = cv.H, mid = H / 2, x0 = 40, F = Math.min(W - 30, x0 + 30 + t * 38); // fork position
    clear(g, W, H);
    const sep = (x) => { const d = F - x; return d <= 0 ? 7 : d >= 50 ? 46 : 7 + (39 * d) / 50; };
    // template strands
    g.lineWidth = 4; g.strokeStyle = "#ced4da"; g.lineCap = "round";
    for (const s of [-1, 1]) { g.beginPath(); for (let x = x0; x <= W - 10; x += 4) { const y = mid + s * sep(x); x === x0 ? g.moveTo(x, y) : g.lineTo(x, y); } g.stroke(); }
    // polarity labels
    text(g, "3′", x0 - 18, mid - 46 + 4, { color: C.mute }); text(g, "5′", W - 14, mid - 7 - 6, { color: C.mute });
    text(g, "5′", x0 - 18, mid + 46 + 4, { color: C.mute }); text(g, "3′", W - 14, mid + 7 + 14, { color: C.mute });
    // leading strand (inside the top template), continuous toward the fork
    const lead = F - 18;
    if (lead > x0) {
      g.strokeStyle = C.red; g.lineWidth = 4; g.beginPath(); g.moveTo(x0, mid - 34); g.lineTo(Math.min(lead, x0 + 14), mid - 34); g.stroke();
      if (lead > x0 + 14) { g.strokeStyle = C.teal; g.beginPath(); g.moveTo(x0 + 14, mid - 34); g.lineTo(lead, mid - 34); g.stroke(); }
      circle(g, lead + 4, mid - 34, 9, "rgba(90,160,255,.9)");
      if (labels) text(g, "DNA pol III", lead - 30, mid - 52, { size: 11, color: C.blue });
    }
    // lagging strand fragments (inside the bottom template), each made away from the fork
    let lastLig = null;
    for (let k = 0; ; k++) {
      const s = x0 + (k + 1) * L; // the fragment's 5′ (primer) end
      const start = s + 22;        // the fork must pass this point before primase can work
      if (F < start || s > W) break;
      const ext = Math.min(L, F - start), left = s - ext, y = mid + 34;
      const prim = Math.min(14, ext);
      // primer at the 5′ end (right), DNA extends leftwards
      const nextDone = F >= start + L + 0 + L; // the next fragment has reached this one
      const p1 = F - (start + L + L); // time since the next fragment reached this primer
      const primerGone = nextDone && p1 > 28, sealed = nextDone && p1 > 50;
      g.lineWidth = 4;
      g.strokeStyle = C.lime; g.beginPath(); g.moveTo(left, y); g.lineTo(s - prim, y); g.stroke();
      g.strokeStyle = primerGone ? C.lime : C.red; g.beginPath(); g.moveTo(s - prim, y); g.lineTo(s - 2, y); g.stroke();
      if (!sealed && k > 0 && ext >= L) { g.fillStyle = C.bg; g.fillRect(s - 3, y - 4, 3, 8); }
      if (ext < L) { circle(g, left - 4, y, 9, "rgba(90,160,255,.9)"); if (labels) text(g, "DNA pol III", left - 40, y + 24, { size: 11, color: C.blue }); }
      if (nextDone && !primerGone) { circle(g, s - 7, y, 8, "rgba(250,176,5,.95)"); if (labels) text(g, "DNA pol I", s - 30, y + 24, { size: 11, color: C.gold }); }
      if (primerGone && !sealed) { lastLig = s; }
      if (labels && ext < 16 && ext > 0) text(g, "primase", s - 10, y + 24, { size: 11, color: C.red });
    }
    if (lastLig) { circle(g, lastLig - 1, mid + 34, 7, "rgba(244,114,182,.95)"); if (labels) text(g, "ligase", lastLig - 18, mid + 58, { size: 11, color: C.pink }); }
    // helicase at the fork, SSBs on the single strands, topoisomerase ahead
    if (F < W - 30) {
      g.fillStyle = C.orange; g.beginPath(); g.moveTo(F + 6, mid); g.lineTo(F - 10, mid - 12); g.lineTo(F - 10, mid + 12); g.closePath(); g.fill();
      if (labels) text(g, "helicase", F + 10, mid + 4, { size: 11, color: C.orange });
      for (let x = F - 48; x < F - 10; x += 12) { circle(g, x, mid - sep(x) - 5, 3, "#e599f7"); circle(g, x, mid + sep(x) + 5, 3, "#e599f7"); }
      if (labels) text(g, "SSB proteins", F - 70, mid + 66, { size: 11, color: "#e599f7" });
      circle(g, Math.min(W - 24, F + 60), mid, 7, "rgba(102,217,232,.9)"); if (labels) text(g, "topoisomerase", Math.min(W - 90, F + 40), mid - 18, { size: 11, color: "#66d9e8" });
    } else text(g, "Replication of this stretch complete", W / 2, 22, { align: "center", color: C.teal });
    text(g, "Leading strand: continuous, toward the fork", 14, 18, { size: 12, color: C.teal });
    text(g, "Lagging strand: Okazaki fragments, away from the fork", 14, H - 10, { size: 12, color: C.lime });
  }
  const stop = loop(el, (dt) => { if (playing) { t += dt * speed; if (40 + 30 + t * 38 > cv.W + 200) t = 0; } draw(); });
  cv.onresize = draw;
  return () => { stop(); cv.stop(); };
}
