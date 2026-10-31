// Evolutionary tree explorer: a simplified tree of life across the three domains. Tap two organisms to find
// their most recent common ancestor and roughly when it lived. Divergence times are rounded molecular-clock
// estimates of the kind collected by TimeTree (timetree.org); the deepest splits (over about 1,500 million
// years) are very uncertain, and the shape of the tree near the root is still debated.
import { shell, panel, challenges, esc, C } from "../lab.js";

// clade(name, time of the split in millions of years (Ma), ...children); a string is a living organism
const clade = (name, t, ...kids) => [name, t, kids];
export const TREE = clade("Life", 4000,
  clade("Bacteria", 3000, "Escherichia coli", "Cyanobacteria"),
  clade("Archaea and eukaryotes", 2700,
    clade("Archaea", 2500, "Methanogens", "Halophiles"),
    clade("Eukaryotes", 1600,
      clade("Plants", 1000, "Green alga",
        clade("Land plants", 470, "Moss", clade("Seed plants", 320, "Pine (conifer)", "Oak (flowering plant)"))),
      clade("Opisthokonts", 1100,
        clade("Fungi", 600, "Yeast", "Mushroom"),
        clade("Animals", 690, "Fruit fly",
          clade("Vertebrates", 430, "Zebrafish",
            clade("Tetrapods", 350, "Frog",
              clade("Amniotes", 320,
                clade("Reptiles and birds", 280, "Lizard", "Chicken"),
                clade("Mammals", 160, "Kangaroo",
                  clade("Placental mammals", 90, "Mouse",
                    clade("Primates", 29, "Macaque", clade("Great apes", 6.5, "Chimpanzee", "Human"))))))))))));
const leaves = [], nodes = [];
(function walk(n, parent, depth) {
  if (typeof n === "string") { const L = { name: n, parent, leaf: true, t: 0 }; leaves.push(L); return L; }
  const N = { name: n[0], t: n[1], parent, kids: [] }; nodes.push(N);
  N.kids = n[2].map((c) => walk(c, N, depth + 1)); return N;
})(TREE, null, 0);
const ancestors = (x) => { const a = []; for (let p = x.parent; p; p = p.parent) a.push(p); return a; };
export function mrca(a, b) { const A = ancestors(leaves.find((l) => l.name === a)), B = new Set(ancestors(leaves.find((l) => l.name === b))); return A.find((n) => B.has(n)); }

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-tree"></div><div class="lab-cols"><div class="lab-out"></div><div class="lab-ctrl"></div></div>`);
  const out = panel($(".lab-out")), ctrl = $(".lab-ctrl");
  let picked = [];
  const st = { found: new Set() };
  const goals = [["Human", "Mushroom", "humfun", "Find when humans and mushrooms last shared an ancestor"], ["Human", "Mouse", "hummouse", "Find the common ancestor of humans and mice"], ["Oak (flowering plant)", "Yeast", "plantfun", "Show that fungi are closer to animals than to plants (pick a plant and a fungus)"]];
  const ch = challenges(ctrl, ctx, goals.map(([a, b, id, txt]) => ({ id, text: txt, test: (x) => x.found.has(id) })));
  const W = 800, H = 30 + leaves.length * 22, X = (t) => 190 + (1 - Math.log10(t + 1) / Math.log10(4001)) * (W - 360);
  // layout: leaves top to bottom, internal nodes at the mean height of their children
  const pos = new Map(); leaves.forEach((l, i) => pos.set(l, { x: X(0), y: 20 + i * 22 }));
  (function place(n) { if (n.leaf) return pos.get(n); const ps = n.kids.map(place); const p = { x: X(n.t), y: ps.reduce((a, q) => a + q.y, 0) / ps.length }; pos.set(n, p); return p; })(nodes[0]);
  function draw() {
    const hi = picked.length === 2 ? mrca(picked[0], picked[1]) : null;
    const onPath = new Set(); if (hi) for (const nm of picked) { for (let p = leaves.find((l) => l.name === nm); p && p !== hi.parent; p = p.parent) onPath.add(p); }
    let svg = "";
    for (const n of nodes) { const p = pos.get(n); for (const k of n.kids) { const q = pos.get(k); const on = onPath.has(k) && onPath.has(n); svg += `<path d="M${p.x} ${p.y} V${q.y} H${q.x}" fill="none" stroke="${on ? C.gold : "#4b5563"}" stroke-width="${on ? 3 : 1.5}"/>`; } }
    for (const n of nodes) { const p = pos.get(n); svg += `<circle cx="${p.x}" cy="${p.y}" r="${n === hi ? 6 : 3}" fill="${n === hi ? C.gold : "#9ca3af"}"/>${n.t >= 90 || n === hi ? `<text x="${p.x - 5}" y="${p.y + 13}" font-size="10" text-anchor="end" fill="${n === hi ? C.gold : "#9aa0a6"}">${esc(n.name)}</text>` : ""}`; }
    for (const l of leaves) { const p = pos.get(l), on = picked.includes(l.name); svg += `<g class="hot ${on ? "sel" : ""}" data-l="${esc(l.name)}" tabindex="0" role="button"><rect x="${p.x + 4}" y="${p.y - 9}" width="${l.name.length * 6.6 + 12}" height="18" rx="9" fill="${on ? C.green : "#1f2937"}"/><text x="${p.x + 10}" y="${p.y + 4}" font-size="12" fill="${on ? "#000" : "#e5e7eb"}">${esc(l.name)}</text></g>`; }
    for (const t of [4000, 1000, 100, 10, 1]) svg += `<text x="${X(t)}" y="${H - 2}" font-size="10" fill="#6b7280" text-anchor="middle">${t >= 1000 ? `${t / 1000} Ga` : `${t} Ma`}</text>`;
    $(".lab-tree").innerHTML = `<svg class="lab-svg" viewBox="0 0 ${W} ${H + 8}" role="img" aria-label="Tree of life">${svg}</svg>`;
    $.all("[data-l]").forEach((g) => g.addEventListener("click", () => { const nm = g.dataset.l; picked = picked.length >= 2 ? [nm] : picked.includes(nm) ? picked : [...picked, nm]; check(); draw(); }));
    out(hi ? `<h4>${esc(picked[0])} and ${esc(picked[1])}</h4><p>Most recent common ancestor: <b>${esc(hi.name)}</b>, roughly <b>${hi.t >= 1000 ? `${(hi.t / 1000).toFixed(1)} billion` : `${hi.t} million`} years ago</b>${hi.t >= 1500 ? " (a very uncertain estimate)" : ""}.</p><p class="lab-msg">Every organism alive today is equally "evolved": none is ancestral to another. Relatedness is about how recently two lineages shared an ancestor. Time axis is logarithmic.</p>` : `<p>Tap two organisms to find their most recent common ancestor. The time axis is logarithmic so recent splits are visible.</p>`);
  }
  function check() {
    if (picked.length !== 2) return;
    const set = new Set(picked);
    for (const [a, b, id] of goals) if ((set.has(a) && set.has(b)) || (id === "plantfun" && picked.some((p) => ["Oak (flowering plant)", "Pine (conifer)", "Moss", "Green alga"].includes(p)) && picked.some((p) => ["Yeast", "Mushroom"].includes(p)))) st.found.add(id);
    ch.check(st);
  }
  draw();
}
