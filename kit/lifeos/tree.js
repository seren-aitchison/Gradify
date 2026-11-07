// The Gradify Tree and Forest: two ways to see growth.
// Tree: one limb per connected site, a canopy cluster that fills out with that site's activity over
// the last 30 days, gold fruit for credentials, on a floating island whose grass is the last 60 days of study.
// Forest: an isometric garden where every day you studied grows a tree, plus time by site.
import { mix, shade } from "../core/colour.js";

const f1 = (n) => n.toFixed(1);

// The tree is drawn as a flat, soft illustration: a floating island of grass and soil, a smooth tapered trunk,
// and a canopy of big rounded leaf clusters, each lit from the top left with a shaded crescent underneath.
// A point on a quadratic curve, and the curve as a filled limb that tapers from w0 to w1
const at = (x0, y0, cx, cy, x1, y1, t) => [
  (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * cx + t * t * x1,
  (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * cy + t * t * y1,
];
function taper(x0, y0, cx, cy, x1, y1, w0, w1, N = 14) {
  const L = [], R = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N, [x, y] = at(x0, y0, cx, cy, x1, y1, t);
    const [ax, ay] = at(x0, y0, cx, cy, x1, y1, Math.max(0, t - 0.01)), [bx, by] = at(x0, y0, cx, cy, x1, y1, Math.min(1, t + 0.01));
    const len = Math.hypot(bx - ax, by - ay) || 1, nx = -(by - ay) / len, ny = (bx - ax) / len, w = (w0 + (w1 - w0) * t) / 2;
    L.push([x + nx * w, y + ny * w]); R.push([x - nx * w, y - ny * w]);
  }
  const [ex, ey] = at(x0, y0, cx, cy, x1, y1, 1);
  const pts = [...L, [ex, ey - 0.001], ...R.reverse()];
  // a rounded tip: the two sides meet through a small arc
  return `M${pts.map(([x, y]) => `${f1(x)} ${f1(y)}`).join(" L")} Z`;
}

export function drawTree(el, { sites, bars, rand }) {
  const W = 760, G = 372, X = 380;
  // ids are per drawing, so two trees on one page don't share gradients or clips
  const U = `t${Math.random().toString(36).slice(2, 8)}`;
  let defs = "", sky = "", isle = "", tufts = "", wood = "", leaves = "", fruit = "";

  // a soft halo and a few motes of light behind the tree
  sky += `<circle cx="${X}" cy="${G - 175}" r="300" fill="url(#${U}halo)"/>`;
  for (let i = 0; i < 26; i++) {
    const x = 40 + rand() * (W - 80), y = -10 + rand() * (G - 120), r = 0.8 + rand() * 1.6;
    sky += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" class="mote" style="animation-delay:${Math.round(rand() * 4000)}ms"/>`;
  }

  // the floating island: a grass top, soil underneath, and its shadow far below
  const IR = 270, IY = 30;
  isle += `<ellipse cx="${X}" cy="${G + 128}" rx="${IR * 0.62}" ry="16" fill="url(#${U}shadow)"/>`;
  isle += `<path d="M${X - IR} ${G} C${X - IR + 10} ${G + 70} ${X - 120} ${G + 112} ${X - 30} ${G + 118} C${X + 10} ${G + 121} ${X + 30} ${G + 104} ${X + 70} ${G + 100} C${X + 170} ${G + 86} ${X + IR - 6} ${G + 60} ${X + IR} ${G} Z" fill="url(#${U}soil)"/>`;
  // strata in the soil, and a few stones
  isle += `<path d="M${X - IR + 26} ${G + 40} C${X - 120} ${G + 74} ${X + 110} ${G + 70} ${X + IR - 28} ${G + 36}" class="isle-line"/>`;
  isle += `<path d="M${X - 170} ${G + 76} C${X - 80} ${G + 96} ${X + 60} ${G + 92} ${X + 150} ${G + 70}" class="isle-line"/>`;
  for (const [dx, dy, r] of [[-150, 52, 7], [-60, 88, 5], [92, 60, 8], [160, 40, 5], [20, 102, 4]]) isle += `<ellipse cx="${X + dx}" cy="${G + dy}" rx="${r * 1.3}" ry="${r}" class="isle-stone"/>`;
  isle += `<ellipse cx="${X}" cy="${G}" rx="${IR}" ry="${IY}" fill="url(#${U}grass)"/>`;
  isle += `<ellipse cx="${X}" cy="${G + 3}" rx="${IR - 4}" ry="${IY - 3}" class="isle-rim"/>`;
  isle += `<ellipse cx="${X - 40}" cy="${G - 8}" rx="${IR * 0.62}" ry="${IY * 0.45}" class="isle-sheen"/>`;
  isle += `<ellipse cx="${X + 14}" cy="${G + 4}" rx="130" ry="15" class="isle-shade"/>`;

  // the last 60 days of study as grass along the island's front edge; today is a flower
  const max = Math.max(...bars, 1);
  bars.forEach((v, i) => {
    const t = 0.1 + 0.8 * (i / Math.max(1, bars.length - 1)), a = Math.PI * (1 - t);
    const x = X + Math.cos(a) * (IR - 10), y = G + Math.sin(a) * (IY - 4) + 2;
    if (i === bars.length - 1) {
      const h = 10 + (v / max) * 14;
      tufts += `<g transform="translate(${f1(x)} ${f1(y)})"><g class="tuft"><path d="M0 0 Q1 ${f1(-h / 2)} 0 ${f1(-h)}" class="stem"/>${[0, 72, 144, 216, 288].map((d) => `<ellipse cx="0" cy="${f1(-h - 4)}" rx="2.6" ry="4.2" transform="rotate(${d} 0 ${f1(-h)})" class="petal"/>`).join("")}<circle cx="0" cy="${f1(-h)}" r="2.4" class="pistil"/></g></g>`;
      return;
    }
    if (!v) return;
    const h = 7 + (v / max) * 20, lean = (rand() - 0.5) * 5;
    tufts += `<path d="M${f1(x - 3)} ${f1(y)} Q${f1(x - 3 + lean)} ${f1(y - h * 0.6)} ${f1(x - 5 + lean)} ${f1(y - h * 0.8)} Q${f1(x - 1)} ${f1(y - h * 0.4)} ${f1(x)} ${f1(y - h)} Q${f1(x + 1)} ${f1(y - h * 0.4)} ${f1(x + 5 + lean)} ${f1(y - h * 0.75)} Q${f1(x + 3 + lean)} ${f1(y - h * 0.5)} ${f1(x + 3)} ${f1(y)} Z" class="${i > bars.length - 8 ? "blade now" : "blade"}"/>`;
  });

  // trunk and roots
  const TT = G - 150;
  wood += taper(X - 4, G + 6, X + 8, G - 70, X, TT, 40, 18);
  for (const [dx, dy] of [[-34, 10], [30, 12], [-14, 16]]) wood += " " + taper(X + dx * 0.2, G - 4, X + dx * 0.6, G + 2, X + dx, G + dy, 12, 3, 8);

  // the canopy: one cluster of leaf blobs per site, along an arc above the trunk, sized by its activity
  // clusters sit on a dome above the trunk, so together they read as one rounded crown
  const n = Math.max(1, sites.length), growth = sites.reduce((t, x) => t + x.k, 0) / n;
  const spread = Math.min(1, 0.3 + n * 0.12), DX = (128 + 44 * growth) * spread, DY = (96 + 30 * growth) * Math.min(1, 0.45 + n * 0.1), CY = G - 205;
  const fit = Math.max(0.85, Math.min(1.7, 2.3 - n * 0.17));
  const blobs = [], fill = [];
  sites.forEach((q, i) => {
    const mid = n === 1 ? 0.5 : i / (n - 1), u = mid * 2 - 1, a = Math.PI * (1.08 + 0.84 * mid);
    const tx = X + Math.cos(a) * DX, ty = CY + Math.sin(a) * DY + (rand() - 0.5) * 10;
    const R = (40 + 28 * q.k) * fit;
    const leaf = mix(q.c, 0.22), dark = shade(q.c, 0.32), light = mix(q.c, 0.55);
    defs += `<radialGradient id="${U}g${i}" cx="38%" cy="32%" r="75%"><stop offset="0" stop-color="${light}"/><stop offset=".6" stop-color="${leaf}"/><stop offset="1" stop-color="${mix(q.c, 0.06)}"/></radialGradient>`;
    // a limb from the top of the trunk into the cluster
    const ox = X + u * 6, oy = TT + 10 + Math.abs(u) * 18;
    wood += " " + taper(ox, oy, ox + (tx - ox) * 0.35, oy + (ty - oy) * 0.7, tx, ty + R * 0.35, 9 + 6 * q.k, 3);
    const parts = [[0, 0, 1], [-0.72, 0.28, 0.72], [0.7, 0.3, 0.7], [-0.25, -0.55, 0.62], [0.32, -0.5, 0.56]].slice(0, 3 + Math.round(q.k * 2));
    parts.forEach(([dx, dy, s], j) => blobs.push({ x: tx + dx * R, y: ty + dy * R, r: R * s, fill: `url(#${U}g${i})`, dark, light, z: ty + dy * R + j * 0.01, d: 120 * i + 90 * j }));
    // filler towards the middle of the crown, in this cluster's shade, so no gaps show between clusters
    fill.push({ x: tx + (X - tx) * 0.45, y: ty + (CY - 10 - ty) * 0.45, r: R * 0.95, c: shade(q.c, 0.45) });
    // gold fruit for credentials, hanging from the lower edge of the cluster
    q.creds.forEach((_, f) => {
      const fx = tx + (f % 2 ? 0.45 : -0.4) * R + f * 6, fy = ty + R * 0.55 + (f % 3) * 4;
      fruit += `<g transform="translate(${f1(fx)} ${f1(fy)})"><g class="fruit"><path d="M0 -7 q1 -5 4 -6" class="fruit-stem"/><path d="M1.5 -9 q5 -5 9 -2 q-4 4 -9 2 Z" class="fruit-leaf"/><circle r="7.5" class="fruit-body"/><circle cx="-2.4" cy="-2.6" r="2.2" class="fruit-shine"/></g></g>`;
    });
  });
  // back to front, so lower blobs overlap the ones behind them
  blobs.sort((a, b) => a.z - b.z);
  const core = fill.map((b) => `<circle cx="${f1(b.x)}" cy="${f1(b.y)}" r="${f1(b.r)}" fill="${b.c}" class="blob"/>`).join("");
  const back = core + blobs.map((b) => `<circle cx="${f1(b.x + b.r * 0.08)}" cy="${f1(b.y + b.r * 0.14)}" r="${f1(b.r * 1.06)}" fill="${b.dark}" class="blob" style="animation-delay:${b.d}ms"/>`).join("");
  const front = blobs.map((b, k) => {
    defs += `<clipPath id="${U}c${k}"><circle cx="${f1(b.x)}" cy="${f1(b.y)}" r="${f1(b.r)}"/></clipPath>`;
    return `<g class="blob" style="animation-delay:${b.d}ms"><circle cx="${f1(b.x)}" cy="${f1(b.y)}" r="${f1(b.r)}" fill="${b.fill}"/>
      <circle cx="${f1(b.x + b.r * 0.32)}" cy="${f1(b.y + b.r * 0.42)}" r="${f1(b.r * 0.92)}" fill="${b.dark}" opacity=".32" clip-path="url(#${U}c${k})"/>
      <ellipse cx="${f1(b.x - b.r * 0.38)}" cy="${f1(b.y - b.r * 0.42)}" rx="${f1(b.r * 0.26)}" ry="${f1(b.r * 0.15)}" transform="rotate(-35 ${f1(b.x - b.r * 0.38)} ${f1(b.y - b.r * 0.42)})" class="blob-shine"/></g>`;
  }).join("");
  // a few loose leaves at the cluster edges
  for (const b of blobs.filter((_, k) => k % 3 === 1)) {
    const a = -0.6 - rand() * 1.9, lx = b.x + Math.cos(a) * b.r * 0.98, ly = b.y + Math.sin(a) * b.r * 0.98, rot = (a * 180) / Math.PI + 90;
    leaves += `<path d="M0 0 Q5 -6 0 -13 Q-5 -6 0 0 Z" transform="translate(${f1(lx)} ${f1(ly)}) rotate(${f1(rot)})" fill="${b.light}" class="loose-leaf"/>`;
  }

  el.innerHTML = `<svg viewBox="0 -40 ${W} ${G + 200}" role="img" aria-label="Gradify Tree: ${sites.length} ${sites.length === 1 ? "branch" : "branches"} on an island of daily study">
    <defs>${defs}
      <radialGradient id="${U}halo" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#2c4a46" stop-opacity=".55"/><stop offset=".6" stop-color="#1a2b2d" stop-opacity=".25"/><stop offset="1" stop-color="#0b0f10" stop-opacity="0"/></radialGradient>
      <radialGradient id="${U}shadow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#000" stop-opacity=".5"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
      <linearGradient id="${U}grass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fdc84"/><stop offset=".55" stop-color="#6fbf62"/><stop offset="1" stop-color="#4f9a4c"/></linearGradient>
      <linearGradient id="${U}soil" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a8774f"/><stop offset=".5" stop-color="#835a3b"/><stop offset="1" stop-color="#5c3d29"/></linearGradient>
      <linearGradient id="${U}bark" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b9845a"/><stop offset=".5" stop-color="#9a6a45"/><stop offset="1" stop-color="#6d4a32"/></linearGradient>
    </defs>
    ${sky}${isle}
    <g class="sway">
      <path d="${wood}" fill="url(#${U}bark)" class="wood"/>
      <ellipse cx="${X}" cy="${CY + 40}" rx="${f1(DX + 60)}" ry="${f1(DY * 0.7)}" fill="url(#${U}shadow)" opacity=".35"/>
      ${back}${front}${leaves}${fruit}
    </g>
    ${tufts}
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
