// The Gradify Tree and Forest: two ways to see growth.
// Tree: one limb per connected site, a canopy that fills out with that site's activity over
// the last 30 days, gold fruit for credentials, standing over a landscape of daily study bars.
// Forest: an isometric garden where every day you studied grows a tree, plus time by site.
import { mix, shade } from "../core/colour.js";

const f1 = (n) => n.toFixed(1);

// A curve drawn as a tapering limb: short segments with shrinking width
function limb(x0, y0, cx, cy, x1, y1, w0, w1, cls = "bark") {
  let out = "";
  const N = 8;
  let px = x0, py = y0;
  for (let i = 1; i <= N; i++) {
    const t = i / N;
    const x = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * cx + t * t * x1;
    const y = (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * cy + t * t * y1;
    out += `<path d="M${f1(px)} ${f1(py)} L${f1(x)} ${f1(y)}" class="${cls}" style="stroke-width:${f1(w0 + (w1 - w0) * t)}"/>`;
    px = x; py = y;
  }
  return out;
}
const at = (x0, y0, cx, cy, x1, y1, t) => [
  (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * cx + t * t * x1,
  (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * cy + t * t * y1,
];

export function drawTree(el, { sites, bars, rand }) {
  const W = 760, G = 372, X = 380;
  let defs = "", back = "", limbs = "", fruit = "";
  const puffs = [];

  // landscape: daily study bars, then soft waves
  const bw = (W - 80) / bars.length, max = Math.max(...bars, 1);
  bars.forEach((v, i) => {
    const h = 20 + (v / max) * 150;
    back += `<rect x="${f1(40 + i * bw + 1)}" y="${f1(G - h)}" width="${f1(bw - 3)}" height="${f1(h)}" rx="2" class="${i === bars.length - 1 ? "bar-now" : "bar-day"}"/>`;
  });
  const wave = (y, a, ph) => {
    let d = `M0 ${G + 40} L0 ${y}`;
    for (let x = 0; x <= W; x += 95) d += ` Q${x + 47} ${f1(y - a * Math.sin((x + ph) / 90))} ${x + 95} ${y}`;
    return d + ` L${W} ${G + 40} Z`;
  };
  back += `<path d="${wave(G - 46, 22, 0)}" class="wave w1"/><path d="${wave(G - 22, 16, 140)}" class="wave w2"/><path d="${wave(G - 4, 10, 60)}" class="wave w3"/>`;

  // roots and trunk
  for (const [dx, dy, s] of [[-70, 18, -1], [-38, 26, -1], [36, 24, 1], [74, 16, 1]]) limbs += limb(X + s * 10, G - 6, X + dx * 0.4, G + 2, X + dx, G + dy, 12, 2);
  limbs += `<path d="M${X - 30} ${G} C${X - 16} ${G - 60} ${X - 14} ${G - 110} ${X - 12} ${G - 150} L${X + 12} ${G - 150} C${X + 14} ${G - 110} ${X + 16} ${G - 60} ${X + 30} ${G} Z" class="trunk"/>`;

  // one crown, split into a colour region per site sized by its activity
  const growth = sites.reduce((t, x) => t + x.k, 0) / Math.max(1, sites.length);
  const CX = X, CY = G - 262, RX = 225 + 55 * growth, RY = 78 + 22 * growth;
  const weights = sites.map((x) => 0.35 + x.k);
  const wsum = weights.reduce((t, w) => t + w, 0);
  let acc = 0;
  const sectors = sites.map((x, i) => { const from = acc / wsum; acc += weights[i]; return { ...x, i, from, to: acc / wsum, mid: (from + acc / wsum) / 2 }; });
  const sectorAt = (px) => { const u = (px - (CX - RX)) / (2 * RX); return sectors.find((q) => u <= q.to) || sectors[sectors.length - 1]; };

  sectors.forEach((q) => {
    defs += `<radialGradient id="pf${q.i}" cx="34%" cy="28%" r="78%"><stop offset="0" stop-color="${mix(q.c, 0.45)}"/><stop offset=".55" stop-color="#${q.c}"/><stop offset="1" stop-color="${shade(q.c, 0.55)}"/></radialGradient>
      <radialGradient id="pb${q.i}" cx="40%" cy="35%" r="80%"><stop offset="0" stop-color="${shade(q.c, 0.25)}"/><stop offset="1" stop-color="${shade(q.c, 0.7)}"/></radialGradient>`;
    // a limb from the trunk up into this region of the crown
    const tx = CX - RX * 0.75 + 2 * RX * 0.75 * q.mid, ty = CY + RY * 0.55 - Math.sin(Math.PI * q.mid) * RY * 0.5;
    const ox = X + (q.mid - 0.5) * 16, oy = G - 150 + Math.abs(q.mid - 0.5) * 40;
    limbs += limb(ox, oy, (ox + tx) / 2 + (q.mid - 0.5) * 30, (oy + ty) / 2 + 30, tx, ty, 8 + 5 * q.k, 2.5);
    q.tip = [tx, ty];
  });

  const total = 70 + Math.round(70 * growth);
  for (let j = 0; j < total; j++) {
    // random point in the crown, biased to the upper half
    const th = rand() * Math.PI * 2, rr = Math.sqrt(rand());
    const px = CX + Math.cos(th) * RX * rr, py = CY + Math.sin(th) * RY * rr * (Math.sin(th) > 0 ? 0.6 : 1.05);
    const q = sectorAt(px);
    const r = 11 + rand() * 13 + (1 - rr) * 7;
    puffs.push({ x: px, y: py, r, id: `pf${q.i}`, back: `pb${q.i}`, d: Math.round(rr * 500 + j * 6) });
  }
  // fruit near the crown's outer edge, in the region of the site that earned them
  sectors.forEach((q) => q.creds.forEach((_, f) => {
    const u = q.from + (q.to - q.from) * (0.35 + 0.3 * f);
    const fx = CX - RX + 2 * RX * u, fy = CY - Math.sqrt(Math.max(0, 1 - ((fx - CX) / RX) ** 2)) * RY * 0.7 + 14;
    fruit += `<circle cx="${f1(fx)}" cy="${f1(fy)}" r="7.5" class="fruit"/>`;
  }));
  puffs.sort((p, q) => p.y - q.y);
  const backLayer = puffs.filter((_, j) => j % 3 === 0).map((p) => `<circle cx="${f1(p.x + 6)}" cy="${f1(p.y + 10)}" r="${f1(p.r * 1.25)}" fill="url(#${p.back})" class="puff" style="animation-delay:${p.d}ms"/>`).join("");
  const canopy = backLayer + puffs.map((p) => `<circle cx="${f1(p.x)}" cy="${f1(p.y)}" r="${f1(p.r)}" fill="url(#${p.id})" class="puff" style="animation-delay:${p.d}ms"/>`
    + (p.r > 20 ? `<circle cx="${f1(p.x - p.r * 0.35)}" cy="${f1(p.y - p.r * 0.4)}" r="${f1(p.r * 0.16)}" class="glint"/>` : "")).join("");

  el.innerHTML = `<svg viewBox="0 -24 ${W} ${G + 64}" role="img" aria-label="Gradify Tree: ${sites.length} branches over a landscape of daily study">
    <defs>${defs}
      <linearGradient id="barg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#fff" stop-opacity=".02"/></linearGradient>
      <linearGradient id="trunkg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6b5440"/><stop offset=".45" stop-color="#d8c0a0"/><stop offset="1" stop-color="#5a4535"/></linearGradient>
      <radialGradient id="canshadow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#000" stop-opacity=".55"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
    </defs>
    ${back}
    <ellipse cx="${X}" cy="${G + 6}" rx="150" ry="14" fill="url(#canshadow)"/>
    <g class="sway">${limbs}${canopy}${fruit}</g>
  </svg>`;
}

// Isometric garden of the last 12 weeks
export function drawForest(el, { days, colourOf, off }) {
  const TW = 46, TH = 23, D = 8;
  const cols = Math.ceil(days.length / 7);
  const ox = 7 * (TW / 2) + 20, oy = 30;
  let out = "";
  const cells = days.map((d, i) => ({ d, col: Math.floor(i / 7), row: i % 7 })).sort((a, b) => a.col + a.row - (b.col + b.row));
  for (const { d, col, row } of cells) {
    const x = ox + (col - row) * (TW / 2), y = oy + (col + row) * (TH / 2);
    const parts = Object.entries(d.counts).filter(([n]) => !off.has(n)).sort((a, b) => b[1] - a[1]);
    const total = parts.reduce((a, [, c]) => a + c, 0);
    const top = `M${x} ${y} l${TW / 2} ${TH / 2} l${-TW / 2} ${TH / 2} l${-TW / 2} ${-TH / 2} Z`;
    out += `<path d="M${x - TW / 2} ${y + TH / 2} l${TW / 2} ${TH / 2} v${D} l${-TW / 2} ${-TH / 2} Z" class="iso-l"/>
      <path d="M${x + TW / 2} ${y + TH / 2} l${-TW / 2} ${TH / 2} v${D} l${TW / 2} ${-TH / 2} Z" class="iso-r"/>
      <path d="${top}" class="iso-top ${total ? "grass" : ""} ${d.today ? "today" : ""}"><title>${d.date.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}: ${total} ${total === 1 ? "activity" : "activities"}</title></path>`;
    if (total) {
      const c = colourOf(parts[0][0]);
      const s = Math.min(1.4, 0.65 + total * 0.12);
      const ty = y + TH / 2;
      out += `<g class="iso-tree" transform="translate(${x} ${ty}) scale(${f1(s)})">
        <rect x="-1.6" y="-12" width="3.2" height="12" rx="1.2" fill="#a88a6a"/>
        <circle cx="0" cy="-17" r="8" fill="url(#iso-${c})"/>
        ${parts[1] ? `<circle cx="5" cy="-12" r="4.5" fill="url(#iso-${colourOf(parts[1][0])})"/>` : ""}
      </g>`;
    }
  }
  const used = [...new Set(days.flatMap((d) => Object.keys(d.counts)).map(colourOf))];
  const defs = used.map((c) => `<radialGradient id="iso-${c}" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="${mix(c, 0.5)}"/><stop offset=".55" stop-color="#${c}"/><stop offset="1" stop-color="${shade(c, 0.5)}"/></radialGradient>`).join("");
  const w = ox + cols * (TW / 2) + 20, h = oy + (cols + 7) * (TH / 2) + D + 20;
  el.innerHTML = `<svg viewBox="0 0 ${f1(w)} ${f1(h)}" role="img" aria-label="Forest: a tree for every day you studied in the last ${cols} weeks"><defs>${defs}</defs>${out}</svg>`;
}

// Donut of time by site
export function drawDonut(el, rows) {
  const total = rows.reduce((a, r) => a + r.min, 0) || 1;
  const R = 54, C = 2 * Math.PI * R;
  let off = 0, segs = "";
  for (const r of rows) {
    const len = (r.min / total) * C;
    segs += `<circle cx="70" cy="70" r="${R}" stroke="#${r.c}" stroke-dasharray="${f1(Math.max(0, len - 2))} ${f1(C)}" stroke-dashoffset="${f1(-off)}"/>`;
    off += len;
  }
  const hours = (m) => `${(m / 60).toFixed(1)} h`;
  el.innerHTML = `<div class="donut"><svg viewBox="0 0 140 140" aria-hidden="true"><g transform="rotate(-90 70 70)">${segs}</g></svg><span><b>${hours(total)}</b>total</span></div>
    <ul class="donut-list">${rows.map((r) => `<li><i style="background:#${r.c}"></i><span>${r.name}</span><em>${Math.round((r.min / total) * 100)}%</em><b>${hours(r.min)}</b></li>`).join("")}</ul>`;
}
