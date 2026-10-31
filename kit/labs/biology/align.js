// Pairwise sequence alignment by dynamic programming: Needleman–Wunsch (global) and Smith–Waterman (local)
// with linear gap penalties. Shows the filled score matrix and the traceback for short sequences.
// These are the exact algorithms; real tools (BLAST, EMBOSS Needle) add substitution matrices such as
// BLOSUM62 for proteins and affine gap penalties.
import { shell, panel, challenges, slider, seg, esc, C } from "../lab.js";

export function align(a, b, { match = 1, mismatch = -1, gap = -2, local = false } = {}) {
  const n = a.length, m = b.length, F = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0)), T = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(""));
  for (let i = 1; i <= n; i++) { F[i][0] = local ? 0 : i * gap; T[i][0] = local ? "" : "u"; }
  for (let j = 1; j <= m; j++) { F[0][j] = local ? 0 : j * gap; T[0][j] = local ? "" : "l"; }
  let best = [0, 0];
  for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++) {
    const d = F[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? match : mismatch), u = F[i - 1][j] + gap, l = F[i][j - 1] + gap;
    let v = Math.max(d, u, l), t = v === d ? "d" : v === u ? "u" : "l";
    if (local && v <= 0) { v = 0; t = ""; }
    F[i][j] = v; T[i][j] = t;
    if (local && v > F[best[0]][best[1]]) best = [i, j];
  }
  let [i, j] = local ? best : [n, m]; const path = [[i, j]]; let A = "", B = "";
  while ((i > 0 || j > 0) && T[i][j]) {
    const t = T[i][j];
    if (t === "d") { A = a[i - 1] + A; B = b[j - 1] + B; i--; j--; } else if (t === "u") { A = a[i - 1] + A; B = "-" + B; i--; } else { A = "-" + A; B = b[j - 1] + B; j--; }
    path.push([i, j]);
  }
  const score = local ? F[best[0]][best[1]] : F[n][m];
  const same = [...A].filter((c, k) => c === B[k] && c !== "-").length;
  return { F, path, A, B, score, identity: A.length ? same / A.length : 0 };
}

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row"><label class="lab-sel">Sequence 1 <input type="text" class="s1" value="GATTACAGT" maxlength="16" spellcheck="false"></label><label class="lab-sel">Sequence 2 <input type="text" class="s2" value="GCATGCAT" maxlength="16" spellcheck="false"></label></div>
    <div class="lab-row top"></div><div class="lab-cols"><div class="lab-mat" style="overflow:auto"></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  const P = { match: 1, mismatch: -1, gap: -2, local: false };
  const st = { gapChanged: false, local: false, own: false, perfect: false };
  const ch = challenges(ctrl, ctx, [
    { id: "own", text: "Align two sequences of your own", test: (x) => x.own },
    { id: "gap", text: "Change the gap penalty until the alignment itself changes", test: (x) => x.gapChanged },
    { id: "loc", text: "Switch to a local alignment and find the best-matching region", test: (x) => x.local },
  ]);
  seg($(".top"), [["global", "Global (Needleman–Wunsch)"], ["local", "Local (Smith–Waterman)"]], "global", (v) => { P.local = v === "local"; if (P.local) st.local = true; run(); });
  slider(ctrl, { label: "Match", min: 0, max: 5, step: 1, value: P.match, fmt: (v) => `+${v}`, onInput: (v) => { P.match = v; run(); } });
  slider(ctrl, { label: "Mismatch", min: -5, max: 0, step: 1, value: P.mismatch, fmt: (v) => v, onInput: (v) => { P.mismatch = v; run(); } });
  slider(ctrl, { label: "Gap", min: -6, max: 0, step: 1, value: P.gap, fmt: (v) => v, onInput: (v) => { P.gap = v; run(); } });
  let firstAlign = null;
  const clean = (s) => s.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 16);
  for (const c of [".s1", ".s2"]) $(c).addEventListener("input", (e) => { e.target.value = clean(e.target.value); st.own = true; firstAlign = null; run(); });
  function run() {
    const a = clean($(".s1").value), b = clean($(".s2").value), r = align(a, b, P), on = new Set(r.path.map(([i, j]) => `${i},${j}`));
    if (firstAlign == null) firstAlign = r.A + "/" + r.B; else if (r.A + "/" + r.B !== firstAlign && !P.local) st.gapChanged = true;
    ch.check(st);
    const cell = (v, k, i, j) => `<td style="padding:3px 6px;text-align:center;font:12px var(--mono);${on.has(k) ? `background:${C.green}44;color:#fff;font-weight:700` : "color:var(--mute)"}">${v}</td>`;
    $(".lab-mat").innerHTML = `<table style="border-collapse:collapse"><tr><td></td><td></td>${[...b].map((x) => `<th style="padding:3px 6px;font:600 12px var(--mono)">${x}</th>`).join("")}</tr>${r.F.map((row, i) => `<tr><th style="padding:3px 6px;font:600 12px var(--mono)">${i ? a[i - 1] : ""}</th>${row.map((v, j) => cell(v, `${i},${j}`, i, j)).join("")}</tr>`).join("")}</table>`;
    const mid = [...r.A].map((c, k) => (c === r.B[k] && c !== "-" ? "|" : c === "-" || r.B[k] === "-" ? " " : ".")).join("");
    out(`<pre class="lab-seq" style="white-space:pre;margin:0">${esc(r.A)}\n${esc(mid)}\n${esc(r.B)}</pre>
      <div class="lab-read"><div><small>Score</small><b>${r.score}</b></div><div><small>Identity</small><b>${Math.round(r.identity * 100)}%</b></div><div><small>Length</small><b>${r.A.length}</b></div></div>
      <p class="lab-msg">Each cell holds the best score for aligning the prefixes up to that point: the maximum of a diagonal move (match or mismatch) and moves from above or the left (a gap). The highlighted path is the traceback${P.local ? ", starting from the highest cell and stopping at a zero" : " from the bottom-right corner"}.</p>`);
  }
  run();
}
