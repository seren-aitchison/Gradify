// Building a phylogenetic tree from a distance matrix with UPGMA, one merge at a time. UPGMA assumes a
// constant rate of change (a molecular clock), so it gives an ultrametric tree; neighbour-joining and
// likelihood methods relax that and are used for most real analyses. Distances here are p-distances
// (proportion of differing sites) computed from a short invented alignment.
import { shell, panel, challenges, button, esc, C } from "../lab.js";

export const SEQS = {
  Human: "ACGTTGCAAGTCCGATAGCTTACG", Chimpanzee: "ACGTTGCAAGTCCGATAGCTTACT", Gorilla: "ACGTTGCAGGTCCGATGGCTTACG",
  Orangutan: "ACGCTGCAAGTCAGATAGCTCACG", Macaque: "AAGTTGAAAGCCCGGTAGCCTACG", Mouse: "GATTCTAAATCACTGCATCCTGAG",
};
export const pdist = (a, b) => [...a].filter((c, i) => c !== b[i]).length / a.length;
export function upgma(names, D) {
  let clusters = names.map((n) => ({ name: n, size: 1, height: 0, kids: null })), M = D.map((r) => [...r]);
  const steps = [];
  while (clusters.length > 1) {
    let bi = 0, bj = 1;
    for (let i = 0; i < M.length; i++) for (let j = i + 1; j < M.length; j++) if (M[i][j] < M[bi][bj]) { bi = i; bj = j; }
    const a = clusters[bi], b = clusters[bj], node = { name: `(${a.name},${b.name})`, size: a.size + b.size, height: M[bi][bj] / 2, kids: [a, b] };
    steps.push({ a: a.name, b: b.name, d: M[bi][bj], M: M.map((r) => [...r]), labels: clusters.map((c) => c.name) });
    const row = M.map((r, k) => (r[bi] * a.size + r[bj] * b.size) / (a.size + b.size));
    const keep = M.map((_, k) => k).filter((k) => k !== bi && k !== bj);
    M = [...keep.map((k) => [...keep.map((l) => M[k][l]), row[k]]), [...keep.map((k) => row[k]), 0]];
    clusters = [...keep.map((k) => clusters[k]), node];
  }
  return { tree: clusters[0], steps };
}

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row tools"></div><div class="lab-cols"><div class="lab-tree"></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  const names = Object.keys(SEQS), D = names.map((a) => names.map((b) => pdist(SEQS[a], SEQS[b])));
  const { tree, steps } = upgma(names, D);
  let k = 0;
  const st = { done: false, first: false };
  const ch = challenges(ctrl, ctx, [
    { id: "first", text: "Predict which pair UPGMA joins first, then check", test: (x) => x.first },
    { id: "done", text: "Step through until the tree is complete", test: (x) => x.done },
  ]);
  const q = document.createElement("div"); q.className = "lab-chips"; ctrl.prepend(q);
  q.innerHTML = `<span class="lab-msg">Which pair joins first?</span>${[["Human", "Chimpanzee"], ["Human", "Gorilla"], ["Macaque", "Mouse"]].map(([a, b]) => `<button type="button" data-p="${a}|${b}">${a} + ${b}</button>`).join("")}`;
  q.addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; const ok = b.dataset.p === `${steps[0].a}|${steps[0].b}` || b.dataset.p === `${steps[0].b}|${steps[0].a}`; b.classList.add(ok ? "ok" : "no"); if (ok) { st.first = true; ch.check(st); } });
  button($(".tools"), "Next merge", () => { k = Math.min(steps.length, k + 1); if (k === steps.length) st.done = true; ch.check(st); draw(); }, "pri");
  button($(".tools"), "Back", () => { k = Math.max(0, k - 1); draw(); });
  button($(".tools"), "Restart", () => { k = 0; draw(); });
  function draw() {
    // the matrix before merge k
    const s = steps[Math.min(k, steps.length - 1)], cur = k < steps.length ? s : null;
    const lbl = (n) => n.replace(/[()]/g, "").split(",").length > 1 ? `{${n.replace(/[()]/g, "").split(",").map((x) => x.slice(0, 3)).join(",")}}` : n;
    const mat = cur ? `<table><tr><td></td>${cur.labels.map((l) => `<th>${esc(lbl(l))}</th>`).join("")}</tr>${cur.M.map((r, i) => `<tr><th>${esc(lbl(cur.labels[i]))}</th>${r.map((v, j) => `<td class="num" style="${(cur.labels[i] === cur.a && cur.labels[j] === cur.b) || (cur.labels[i] === cur.b && cur.labels[j] === cur.a) ? `background:${C.green}55;color:#fff` : ""}">${i === j ? "–" : v.toFixed(3)}</td>`).join("")}</tr>`).join("")}</table><p>Smallest distance: <b>${esc(lbl(cur.a))}</b> and <b>${esc(lbl(cur.b))}</b> (${cur.d.toFixed(3)}). They join at height ${(cur.d / 2).toFixed(3)}; the new cluster's distance to each other cluster is the size-weighted average.</p>` : `<p><b>Tree complete.</b> Branch heights are half the distance at which each pair joined.</p>`;
    out(`<h4>Step ${Math.min(k + 1, steps.length)} of ${steps.length}</h4>${mat}<p class="lab-msg">Distances: proportion of the 24 aligned sites that differ (invented sequences for teaching; real primate trees use thousands of sites).</p>`);
    // draw the tree built so far
    const joined = steps.slice(0, k), W = 520, H = 300, leafY = {}, pos = {};
    names.forEach((n, i) => { leafY[n] = 30 + i * ((H - 60) / (names.length - 1)); });
    // order leaves by the final tree so branches don't cross
    const order = []; (function walk(t) { if (!t.kids) order.push(t.name); else t.kids.forEach(walk); })(tree);
    order.forEach((n, i) => { leafY[n] = 30 + i * ((H - 60) / (names.length - 1)); pos[n] = { x: W - 110, y: leafY[n] }; });
    const maxH = steps.at(-1).d / 2, X = (h) => W - 110 - (h / maxH) * (W - 160);
    let svg = order.map((n) => `<text x="${W - 104}" y="${leafY[n] + 4}" font-size="13" fill="#e8eaed">${n}</text>`).join("");
    for (const j of joined) {
      const h = j.d / 2, pa = pos[j.a], pb = pos[j.b], x = X(h);
      svg += `<path d="M${pa.x} ${pa.y} H${x} V${pb.y} H${pb.x}" fill="none" stroke="${C.green}" stroke-width="2.2"/>`;
      pos[`(${j.a},${j.b})`] = { x, y: (pa.y + pb.y) / 2 };
    }
    $(".lab-tree").innerHTML = `<svg class="lab-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="UPGMA tree">${svg}<line x1="${X(0)}" y1="${H - 12}" x2="${X(maxH)}" y2="${H - 12}" stroke="#555"/><text x="${X(maxH)}" y="${H - 2}" font-size="10" fill="#9aa0a6">height ${maxH.toFixed(3)}</text><text x="${X(0) - 4}" y="${H - 2}" font-size="10" fill="#9aa0a6" text-anchor="end">0</text></svg>`;
  }
  draw();
}
