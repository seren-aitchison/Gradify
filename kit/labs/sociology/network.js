// Social network visualiser: a small network laid out by a force simulation. Select people to see their degree and
// betweenness centrality (Freeman, 1977), add or remove ties, and compare network shapes. Granovetter's (1973) "strength
// of weak ties": bridges between clusters carry new information. The networks are invented.
import { shell, canvas, seg, button, panel, challenges, clear, circle, line, text, C, seeded } from "../lab.js";
import { dataLabel, table } from "../social/ui.js";

export const PRESETS = {
  clusters: { name: "Two friendship groups with a bridge", n: 12, e: [[0,1],[0,2],[1,2],[1,3],[2,3],[3,4],[0,4],[2,4],[6,7],[6,8],[7,8],[7,9],[8,9],[9,10],[10,11],[6,11],[8,10],[4,5],[5,6]] },
  star: { name: "A star (one central person)", n: 9, e: [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8]] },
  chain: { name: "A chain", n: 8, e: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]] },
  dense: { name: "A dense close-knit group", n: 7, e: [[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[1,5],[2,3],[2,6],[3,4],[4,5],[5,6],[4,6],[0,6]] },
};
export const density = (n, E) => (n > 1 ? E.length / ((n * (n - 1)) / 2) : 0);
export function degree(n, E) { const d = Array(n).fill(0); for (const [a, b] of E) { d[a]++; d[b]++; } return d; }
// betweenness centrality by Brandes' algorithm (unweighted, undirected)
export function betweenness(n, E) {
  const adj = Array.from({ length: n }, () => []); for (const [a, b] of E) { adj[a].push(b); adj[b].push(a); }
  const CB = Array(n).fill(0);
  for (let s = 0; s < n; s++) {
    const S = [], P = Array.from({ length: n }, () => []), sigma = Array(n).fill(0), d = Array(n).fill(-1), Q = [s]; sigma[s] = 1; d[s] = 0;
    while (Q.length) { const v = Q.shift(); S.push(v); for (const w of adj[v]) { if (d[w] < 0) { d[w] = d[v] + 1; Q.push(w); } if (d[w] === d[v] + 1) { sigma[w] += sigma[v]; P[w].push(v); } } }
    const delta = Array(n).fill(0); while (S.length) { const w = S.pop(); for (const v of P[w]) delta[v] += (sigma[v] / sigma[w]) * (1 + delta[w]); if (w !== s) CB[w] += delta[w]; }
  }
  return CB.map((v) => v / 2);
}
export function components(n, E) { const p = [...Array(n).keys()], f = (x) => (p[x] === x ? x : (p[x] = f(p[x]))); for (const [a, b] of E) p[f(a)] = f(b); return new Set(p.map(f)).size; }
export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row sx-mode"></div><div class="lab-cols"><div><div class="lab-stage"></div><div class="sx-btns sx-list" role="group" aria-label="People"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.7, max: 420 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out")), btns = $(".sx-btns");
  dataLabel(ctrl, { real: false, how: "Invented networks for learning the measures; real network studies collect ties by survey, observation or digital traces." });
  let n = 0, E = [], pos = [], sel = null, preset = "clusters"; const st = { seen: new Set() };
  const ch = challenges(ctrl, ctx, [{ id: "bridge", text: "In the two-group network, find the person with the highest betweenness", test: (x) => x.bridge }, { id: "cut", text: "Remove a tie so the network splits into two components", test: (x) => x.split }, { id: "shapes", text: "Compare density in the star, the chain and the dense group", test: (x) => ["star", "chain", "dense"].every((k) => x.seen.has(k)) }]);
  seg($(".lab-row.sx-mode"), Object.entries(PRESETS).map(([k, v]) => [k, v.name]), preset, (v) => load(v));
  button(ctrl, "Remove a tie of the selected person", () => { if (sel == null) return; const i = E.findIndex((e) => e.includes(sel)); if (i >= 0) { E.splice(i, 1); if (components(n, E) > 1) st.split = true; ch.check(st); run(); } });
  button(ctrl, "Add a tie from the selected person to a random other", () => { if (sel == null) return; const others = [...Array(n).keys()].filter((j) => j !== sel && !E.some((e) => e.includes(sel) && e.includes(j))); if (others.length) { E.push([sel, others[Math.floor(Math.random() * others.length)]]); run(); } });
  function load(k) { preset = k; st.seen.add(k); n = PRESETS[k].n; E = PRESETS[k].e.map((e) => [...e]); const r = seeded(9); pos = Array.from({ length: n }, () => [r(), r()]); sel = null; layout(); btns.innerHTML = Array.from({ length: n }, (_, i) => `<button type="button" data-i="${i}">${String.fromCharCode(65 + i)}</button>`).join(""); ch.check(st); run(); }
  function layout() { for (let it = 0; it < 400; it++) { const F = pos.map(() => [0, 0]); for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (i !== j) { const dx = pos[i][0] - pos[j][0], dy = pos[i][1] - pos[j][1], d2 = dx * dx + dy * dy + 1e-4; F[i][0] += (0.002 * dx) / d2; F[i][1] += (0.002 * dy) / d2; } for (const [a, b] of E) { const dx = pos[b][0] - pos[a][0], dy = pos[b][1] - pos[a][1]; F[a][0] += 0.05 * dx; F[a][1] += 0.05 * dy; F[b][0] -= 0.05 * dx; F[b][1] -= 0.05 * dy; } pos = pos.map(([x, y], i) => [Math.max(0.05, Math.min(0.95, x + F[i][0] * 0.5 + (0.5 - x) * 0.01)), Math.max(0.05, Math.min(0.95, y + F[i][1] * 0.5 + (0.5 - y) * 0.01))]); } }
  function run() {
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H); const deg = degree(n, E), bt = betweenness(n, E), mb = Math.max(...bt, 1), P = (i) => [20 + pos[i][0] * (W - 40), 20 + pos[i][1] * (H - 40)];
    for (const [a, b] of E) line(g, [P(a), P(b)], sel != null && (a === sel || b === sel) ? C.gold : "rgba(255,255,255,.3)", 2);
    for (let i = 0; i < n; i++) { const [x, y] = P(i); circle(g, x, y, 9 + 10 * (bt[i] / mb), i === sel ? C.gold : C.pink, "#fff"); text(g, String.fromCharCode(65 + i), x, y + 4, { align: "center", size: 11, weight: 700, color: "#000" }); }
    if (preset === "clusters" && sel != null && bt[sel] === Math.max(...bt)) st.bridge = true; ch.check(st);
    btns.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", Number(b.dataset.i) === sel));
    out(`<p><b>${PRESETS[preset].name}:</b> ${n} people, ${E.length} ties, density ${density(n, E).toFixed(2)}, ${components(n, E)} component${components(n, E) > 1 ? "s" : ""}. Circle size shows betweenness.</p>${sel != null ? table(["Person", "Degree (ties)", "Betweenness"], [[String.fromCharCode(65 + sel), deg[sel], bt[sel].toFixed(1)]]) : "<p>Select a person (on the buttons below the network) to see their measures.</p>"}<p class="sx-fb">Degree counts direct ties; betweenness counts how often someone lies on the shortest path between two others, so brokers between groups score highly even with few ties. Dense networks support trust and norms (bonding social capital); bridges give access to new information and opportunities (bridging capital; Putnam, 2000).</p>`);
  }
  btns.addEventListener("click", (e) => { const b = e.target.closest("[data-i]"); if (b) { sel = Number(b.dataset.i); run(); } });
  cv.cv.addEventListener("click", (e) => { const [x, y] = cv.pos(e); let best = null, bd = 400; for (let i = 0; i < n; i++) { const px = 20 + pos[i][0] * (cv.W - 40), py = 20 + pos[i][1] * (cv.H - 40), d = (px - x) ** 2 + (py - y) ** 2; if (d < bd) { bd = d; best = i; } } if (best != null) { sel = best; run(); } });
  load(preset); cv.onresize = run;
  return () => cv.stop();
}
