// Gene expression: transcription and translation (ctx.mode "tool") and protein synthesis at the ribosome
// (ctx.mode "ribosome"). The tool uses the real standard genetic code; mutate a base and see whether the
// change is silent, missense, nonsense or a frameshift. The ribosome view animates translation with the A,
// P and E sites. Simplified: no introns or splicing (as in a bacterial gene), and the ribosome is schematic.
import { shell, panel, challenges, seg, button, canvas, loop, clear, text, rrect, circle, slider, esc, C } from "../lab.js";
import { CODE, NAMES, FULL, CLASS, CLASS_COL, transcribeCoding, templateOf, translate } from "./code.js";

const START = "GCCACCATGGCTTCAAAGGGAGAAGAACTGTTCACCTGGTAA";

function tool(el, ctx) {
  const $ = shell(el, `<label class="lab-sel" style="flex-direction:column;align-items:stretch"><span>Coding (sense) strand, 5′→3′: edit it, or tap a base to mutate it</span><input type="text" class="seq" spellcheck="false" maxlength="90"></label>
    <div class="lab-row tools"></div><div class="lab-out"></div><div class="lab-side"></div>`);
  const out = panel($(".lab-out"));
  const inp = $(".seq"); inp.value = START;
  let original = START, mut = "sub";
  const st = { kinds: new Set(), edited: false };
  const ch = challenges($(".lab-side"), ctx, [
    { id: "silent", text: "Make a <b>silent</b> mutation (protein unchanged)", test: (s) => s.kinds.has("silent") },
    { id: "missense", text: "Make a <b>missense</b> mutation (one amino acid changes)", test: (s) => s.kinds.has("missense") },
    { id: "nonsense", text: "Make a <b>nonsense</b> mutation (an early stop codon)", test: (s) => s.kinds.has("nonsense") },
    { id: "frame", text: "Cause a <b>frameshift</b> with an insertion or deletion", test: (s) => s.kinds.has("frameshift") },
  ]);
  seg($(".tools"), [["sub", "Tap to substitute"], ["ins", "Tap to insert"], ["del", "Tap to delete"]], mut, (v) => { mut = v; });
  button($(".tools"), "Reset to original", () => { inp.value = original; render(); });
  const clean = (s) => s.toUpperCase().replace(/[^ATGC]/g, "");
  function classify(a, b, indel) {
    if (indel && (b.length - a.length) % 3 !== 0) return "frameshift";
    const pa = translate(transcribeCoding(a)).protein, pb = translate(transcribeCoding(b)).protein;
    if (pa === pb) return "silent";
    const sa = pa.replace(/\*$/, ""), sb = pb.replace(/\*$/, "");
    if (sb.length < sa.length && pb.endsWith("*")) return "nonsense";
    if (indel) return "in-frame indel";
    return "missense";
  }
  function render(changedAt = null, kind = null) {
    const dna = clean(inp.value), rna = transcribeCoding(dna), tr = translate(rna), tmpl = templateOf(dna);
    const inCodon = new Map(); tr.codons.forEach((c, k) => { for (let j = 0; j < 3; j++) inCodon.set(c.at + j, k); });
    const base = (b, i) => { const k = inCodon.get(i), c = k != null ? tr.codons[k] : null; const col = c ? CLASS_COL[CLASS[c.aa]] : null; return `<i data-i="${i}" style="${col ? `background:${col}${k % 2 ? "40" : "26"};` : ""}${i === changedAt ? "outline:2px solid #fff;" : ""}cursor:pointer">${b}</i>`; };
    out(`<table>
      <tr><td>Coding DNA</td><td class="lab-seq">5′-${[...dna].map(base).join("")}-3′</td></tr>
      <tr><td>Template DNA</td><td class="lab-seq">3′-${tmpl}-5′</td></tr>
      <tr><td>mRNA</td><td class="lab-seq">5′-${rna}-3′</td></tr>
      <tr><td>Protein</td><td>${tr.start < 0 ? "<i>No AUG start codon, so translation doesn't begin.</i>" : tr.codons.map((c) => `<span title="${c.codon} → ${FULL[c.aa]}" style="display:inline-block;margin:2px;padding:2px 6px;border-radius:6px;background:${CLASS_COL[CLASS[c.aa]]}33;border:1px solid ${CLASS_COL[CLASS[c.aa]]}"><small style="font-family:var(--mono);color:var(--mute)">${c.codon}</small> ${NAMES[c.aa]}</span>`).join("")}${tr.codons.length && tr.codons.at(-1).aa !== "*" ? " <i>(no stop codon yet: reading frame runs off the end)</i>" : ""}</td></tr></table>
      <p class="lab-msg">${kind ? `<b>${kind[0].toUpperCase() + kind.slice(1)}.</b> ` : ""}Transcription copies the template strand into mRNA, so the mRNA matches the coding strand with U for T. Translation starts at the first AUG and reads codons until UAA, UAG or UGA. Colours: <span style="color:${CLASS_COL.np}">non-polar</span>, <span style="color:${CLASS_COL.p}">polar</span>, <span style="color:${CLASS_COL.neg}">acidic</span>, <span style="color:${CLASS_COL.pos}">basic</span>.</p>`);
    $.all(".lab-seq i[data-i]").forEach((x) => x.addEventListener("click", () => {
      const i = Number(x.dataset.i), d = clean(inp.value); let nd;
      if (mut === "sub") { const order = "ATGC", nb = order[(order.indexOf(d[i]) + 1) % 4]; nd = d.slice(0, i) + nb + d.slice(i + 1); }
      else if (mut === "ins") nd = d.slice(0, i) + "A" + d.slice(i);
      else nd = d.slice(0, i) + d.slice(i + 1);
      const k = classify(d, nd, mut !== "sub"); st.kinds.add(k); ch.check(st);
      inp.value = nd; render(i, k);
    }));
  }
  inp.addEventListener("input", () => { inp.value = clean(inp.value); original = inp.value; render(); });
  render();
}

function ribosome(el, ctx) {
  const $ = shell(el, `<div class="lab-stage"></div><div class="lab-row tools"></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.46, max: 380 }), g = cv.g;
  const out = panel($(".lab-out"));
  const rna = transcribeCoding(START), tr = translate(rna), codons = tr.codons;
  let t = 0, playing = true, speed = 1;
  const tools = $(".tools");
  const pb = button(tools, "Pause", () => { playing = !playing; pb.textContent = playing ? "Pause" : "Play"; });
  button(tools, "Step", () => { playing = false; pb.textContent = "Play"; t = Math.floor(t) + 1; });
  button(tools, "Restart", () => { t = 0; });
  slider(tools, { label: "Speed", min: 0.25, max: 2, step: 0.25, value: 1, fmt: (v) => `${v}×`, onInput: (v) => { speed = v; } });
  const seen = { stop: false };
  const ch = challenges($(".lab-out"), ctx, [{ id: "stop", text: "Watch translation reach the stop codon and release the polypeptide", test: (s) => s.stop }]);
  function draw() {
    const W = cv.W, H = cv.H, cw = 54, step = Math.floor(t), f = t - step, n = codons.length;
    const k = Math.min(step, n - 1); // codon in the P site
    clear(g, W, H);
    const y = H * 0.72, x0 = W / 2 - cw * 0.5 - cw * (k + (step < n - 1 ? f : 0)); // codon k sits in the P site (the middle of three)
    // mRNA
    g.strokeStyle = "#868e96"; g.lineWidth = 3; g.beginPath(); g.moveTo(0, y + 16); g.lineTo(W, y + 16); g.stroke();
    text(g, "5′", 6, y + 36, { color: C.mute }); text(g, "3′", W - 16, y + 36, { color: C.mute });
    codons.forEach((c, i) => { const x = x0 + i * cw; if (x < -cw || x > W) return; text(g, c.codon, x + cw / 2, y + 10, { align: "center", size: 14, weight: 600, color: c.aa === "*" ? C.red : C.text, base: "middle" }); });
    // ribosome: small and large subunits around E, P and A sites
    const rx = W / 2 - cw * 1.5;
    rrect(g, rx - 14, y - 6, cw * 3 + 28, 40, 18, "rgba(116,143,252,.28)", "#748ffc");
    rrect(g, rx - 24, y - 150, cw * 3 + 48, 140, 46, "rgba(116,143,252,.18)", "#748ffc");
    ["E", "P", "A"].forEach((s, i) => text(g, s, rx + cw * i + cw / 2, y - 132, { align: "center", size: 13, weight: 700, color: "#bac8ff" }));
    // tRNAs in P and A, polypeptide on the P-site tRNA
    const done = step >= n - 1;
    const aaCol = (aa) => CLASS_COL[CLASS[aa]];
    const trna = (i, x, alpha = 1) => {
      const c = codons[i]; if (!c || c.aa === "*") return;
      g.globalAlpha = alpha; rrect(g, x + 10, y - 66, cw - 20, 56, 8, "rgba(255,212,59,.25)", C.gold);
      const anti = [...c.codon].map((b) => ({ A: "U", U: "A", G: "C", C: "G" })[b]).join("");
      text(g, anti, x + cw / 2, y - 18, { align: "center", size: 11, color: C.gold }); g.globalAlpha = 1;
    };
    if (!done) {
      trna(k, rx + cw); // P site
      if (codons[k + 1]?.aa !== "*") trna(k + 1, rx + cw * 2, Math.min(1, f * 2 + 0.2)); // A site, arriving
      if (k > 0) trna(k - 1, rx, Math.max(0, 1 - f * 1.5)); // E site, leaving
    }
    // the growing chain: residues up to k, attached above the P site
    const chain = codons.slice(0, done ? n - 1 : k + 1).map((c) => c.aa);
    chain.forEach((aa, i) => { const j = chain.length - 1 - i; const cx = rx + cw * 1.5 - j * 18, cy = y - 84 - j * 8 - (done ? (t - (n - 1)) * 40 : 0); circle(g, cx, cy, 10, aaCol(aa)); text(g, NAMES[aa].slice(0, 1), cx, cy + 4, { align: "center", size: 10, weight: 700, color: "#000" }); });
    if (done) { text(g, "Stop codon in the A site: a release factor binds and the polypeptide is released", W / 2, 22, { align: "center", color: C.red }); if (!seen.stop) { seen.stop = true; ch.check(seen); } }
    out(`<p><b>${done ? "Termination" : k === 0 ? "Initiation" : "Elongation"}.</b> ${done ? "No tRNA matches a stop codon. A release factor enters the A site, the bond to the last tRNA is hydrolysed and the subunits separate." : k === 0 ? "The initiator tRNA carrying methionine pairs with AUG in the P site. The next aminoacyl-tRNA arrives in the A site." : `The ribosome joins the chain to ${FULL[codons[k].aa]} by a peptide bond (catalysed by rRNA), then moves one codon along the mRNA; the empty tRNA leaves from the E site.`}</p><p class="lab-msg">Polypeptide so far: ${chain.map((a) => NAMES[a]).join("–") || "–"}</p>`);
  }
  const stop = loop(el, (dt) => { if (playing) { t += dt * 0.8 * speed; if (t > codons.length + 2.5) t = 0; } draw(); });
  return () => { stop(); cv.stop(); };
}

export function mount(el, ctx = {}) { return ctx.mode === "ribosome" ? ribosome(el, ctx) : tool(el, ctx); }
