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

// The Gradify Tree: the low-poly 3D island (kit/lifeos/island3d.js) where WebGL works, loaded on first use; the
// flat drawing below everywhere else, and for the moment before the 3D module arrives.
let island = null, islandP = null;
const loadIsland = () => (islandP ||= import("./island3d.js").then((m) => (m.webglOK() ? (island = m) : null)).catch(() => null));
// three.js and the island cost about half a second of main thread to start, so they wait until the tree is actually on
// screen (or close to it): a tree in a hidden tab, or far down the page, stays flat until then and the page loads smoothly
const whenSeen = (el) => new Promise((resolve) => {
  if (typeof IntersectionObserver !== "function") return resolve();
  const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { io.disconnect(); resolve(); } }, { rootMargin: "300px 0px" });
  io.observe(el);
});
export function drawTree(el, data) {
  drawTreeFlat(el, data);
  // swap in the island once it's on screen (even when the module is already loaded: building a renderer for a hidden
  // tree is the expensive part) and loaded, unless something else has been drawn here since
  const mine = (el.__drawn = {});
  whenSeen(el).then(() => el.__drawn === mine && (island || loadIsland())).then((m) => { if (m && el.isConnected && el.__drawn === mine) m.drawIsland(el, data); });
}

export function drawTreeFlat(el, { sites, bars, rand }) {
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
// The Forest: a soft, rounded garden plot under a daytime sky, a patch for each of the last weeks' days (rows are days
// of the week, columns are weeks). A day you studied grows a cartoon tree in the colour of that day's main site, and the
// more you did, the bigger it grows: a sprout (1 to 2 activities), a puffy tree (3 to 4), a pine (5 to 6), a great tree
// in blossom (7 or more). Days without study are dry patches. Today has a glowing ring and a flag. Trees pop up one
// after another, then sway.
const FOREST_KINDS = [[7, "great"], [5, "pine"], [3, "round"], [1, "sprout"]];
export const forestKind = (total) => (FOREST_KINDS.find(([n]) => total >= n) || [0, null])[1];
// a puffy canopy: overlapping circles, each with a shaded underside and a soft highlight
function puff(circles, c) {
  const base = mix(c, 0.24), dark = shade(mix(c, 0.12), 0.08), light = mix(c, 0.58);
  return circles.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${dark}"/>`).join("")
    + circles.map(([x, y, r]) => `<circle cx="${f1(x - r * 0.12)}" cy="${f1(y - r * 0.14)}" r="${f1(r * 0.9)}" fill="${base}"/>`).join("")
    + circles.map(([x, y, r]) => `<ellipse cx="${f1(x - r * 0.38)}" cy="${f1(y - r * 0.45)}" rx="${f1(r * 0.32)}" ry="${f1(r * 0.2)}" fill="${light}" opacity=".9"/>`).join("");
}
const trunkOf = (h, w = 3) => `<rect x="${-w / 2}" y="${-h}" width="${w}" height="${h + 1}" rx="${w / 2}" fill="#9a6b47"/><rect x="0" y="${-h}" width="${w / 2}" height="${h + 1}" rx="${w / 4}" fill="#7d5538"/>`;
function plant(kind, c, c2) {
  if (kind === "sprout") return `<path d="M0 0 V-6" stroke="#7d5538" stroke-width="1.6" stroke-linecap="round"/>
    <ellipse cx="-3.4" cy="-7" rx="3.8" ry="2.4" transform="rotate(-25 -3.4 -7)" fill="${mix(c, 0.3)}"/><ellipse cx="3.6" cy="-8.2" rx="4.2" ry="2.6" transform="rotate(25 3.6 -8.2)" fill="${mix(c, 0.15)}"/>`;
  if (kind === "round") return `${trunkOf(9)}${puff([[-4, -13, 5.2], [4, -13.5, 5.4], [0, -18.5, 6.2]], c)}`;
  if (kind === "pine") {
    // three soft tiers in the site's colour, the right side of each a little shaded, a highlight on the left
    const base = mix(c, 0.22), dark = shade(mix(c, 0.1), 0.2), light = mix(c, 0.55);
    return `${trunkOf(5, 2.6)}${[[-6.5, 9, 9], [-12, 7.4, 8], [-17, 5.8, 7]].map(([y, w, h]) =>
      `<path d="M${-w} ${y} Q0 ${y + 2.4} ${w} ${y} L0 ${y - h} Z" fill="${base}" stroke="${base}" stroke-width="2.4" stroke-linejoin="round"/>
       <path d="M0 ${y - h} L${w} ${y} Q${w * 0.5} ${y + 1.6} 0 ${y + 1.2} Z" fill="${dark}" opacity=".55"/>
       <path d="M${-w * 0.55} ${y - 1.4} L${-w * 0.12} ${y - h * 0.62}" stroke="${light}" stroke-width="1.3" stroke-linecap="round" opacity=".9"/>`).join("")}`;
  }
  // a great tree: a broad puffy crown (its lower left in the day's second site, if any) with blossom
  return `${trunkOf(12, 4)}<path d="M0 -8 L-5 -13 M0 -10 L5 -14" stroke="#7d5538" stroke-width="1.8" stroke-linecap="round"/>
    ${puff([[-7, -17, 6.5]], c2 || c)}${puff([[7, -18, 7], [0, -24, 8.5], [-4, -20, 5], [4.5, -25.5, 5.5]], c)}
    ${[[-6, -22], [3, -28], [7, -19], [-1, -17], [-8, -15]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.25" fill="#fff4f8"/><circle cx="${x}" cy="${y}" r=".55" fill="#ffc23d"/>`).join("")}`;
}
// a diamond with rounded corners (the plot, seen from above); f is how far along each edge the rounding starts
function roundDiamond(pts, f = 0.07) {
  let d = "";
  pts.forEach((p, i) => {
    const prev = pts[(i + 3) % 4], next = pts[(i + 1) % 4];
    const a = [p[0] + (prev[0] - p[0]) * f, p[1] + (prev[1] - p[1]) * f], b = [p[0] + (next[0] - p[0]) * f, p[1] + (next[1] - p[1]) * f];
    d += `${i ? "L" : "M"}${f1(a[0])} ${f1(a[1])} Q${f1(p[0])} ${f1(p[1])} ${f1(b[0])} ${f1(b[1])} `;
  });
  return d + "Z";
}
export function drawForest(el, { days, colourOf, off }) {
  el.__drawn = null; island?.disposeIsland(el);
  const TW = 46, TH = 23, D = 24, R = 7, pad = 0.55;
  const cols = Math.ceil(days.length / 7);
  const ox = R * (TW / 2) + 40, oy = 56;
  const P = (c, r) => [ox + (c - r) * (TW / 2), oy + (c + r) * (TH / 2)];
  // the plot: grass with rounded corners on a thick, rounded base of soil (drawn as stacked layers, deepest first)
  const corners = [P(-pad, -pad), P(cols + pad, -pad), P(cols + pad, R + pad), P(-pad, R + pad)];
  const at = (dy) => corners.map(([x, y]) => [x, y + dy]);
  let out = `<ellipse cx="${f1(corners[2][0])}" cy="${f1(corners[2][1] + D + 10)}" rx="${f1((corners[1][0] - corners[3][0]) * 0.4)}" ry="14" fill="rgba(60,70,110,.22)" filter="url(#fs-blur)"/>`;
  for (let dy = D; dy > 0; dy -= 2) out += `<path d="${roundDiamond(at(dy))}" fill="${dy > 9 ? "url(#fs-soil)" : "url(#fs-turf)"}"/>`;
  out += `<path d="${roundDiamond(at(0))}" fill="url(#fs-grass)"/>`;
  const cells = days.map((d, i) => ({ d, col: Math.floor(i / 7), row: i % 7 })).sort((a, b) => a.col + a.row - (b.col + b.row));
  let n = 0, trees = "";
  for (const { d, col, row } of cells) {
    const [x, y] = P(col, row);
    const parts = Object.entries(d.counts).filter(([k]) => !off.has(k)).sort((a, b) => b[1] - a[1]);
    const total = parts.reduce((a, [, c]) => a + c, 0), kind = forestKind(total);
    const date = d.date.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
    // each day's patch: a faint checker on the grass, drier where nothing was studied
    out += `<path d="M${x} ${y + 1} l${TW / 2 - 1.5} ${TH / 2 - 0.75} l${-TW / 2 + 1.5} ${TH / 2 - 0.75} l${-TW / 2 + 1.5} ${-TH / 2 + 0.75} Z" class="fs-tile${d.today ? " today" : ""}" fill="${kind ? ((col + row) % 2 ? "rgba(255,255,255,.07)" : "rgba(0,60,0,.04)") : "rgba(214,190,120,.55)"}"><title>${date}: ${total ? `${total} ${total === 1 ? "activity" : "activities"}${parts[0] ? `, mostly ${parts[0][0]}` : ""}` : "no study"}</title></path>`;
    const bx = x, by = y + TH / 2;
    if (!kind) { out += `<ellipse cx="${f1(bx + 3)}" cy="${f1(by + 2)}" rx="2" ry="1.2" fill="#c2b49a"/><ellipse cx="${f1(bx - 4)}" cy="${f1(by - 1)}" rx="1.3" ry=".8" fill="#cfc2a6"/>`; continue; }
    const c = colourOf(parts[0][0]), c2 = parts[1] ? colourOf(parts[1][0]) : null;
    trees += `<g transform="translate(${f1(bx)} ${f1(by)})"><ellipse cx="2" cy="1.2" rx="${kind === "great" ? 13 : kind === "sprout" ? 5 : 8.5}" ry="${kind === "great" ? 4.6 : 3}" fill="rgba(40,80,30,.28)"/>
      <g class="fs-tree" style="--d:${(n++ * 0.018).toFixed(3)}s;--sw:${(2.6 + ((col * 7 + row) % 5) * 0.35).toFixed(2)}s">${plant(kind, c, c2)}</g></g>`;
  }
  const ti = days.findIndex((d) => d.today);
  if (ti >= 0) { const [x, y] = P(Math.floor(ti / 7), ti % 7); trees += `<g class="fs-today" transform="translate(${f1(x)} ${f1(y + TH / 2)})"><ellipse rx="${TW / 2 - 4}" ry="${TH / 2 - 3}" fill="rgba(255,255,255,.35)" stroke="#fff" stroke-width="1.6"/><path d="M13 0 V-27" stroke="#6b4a32" stroke-width="1.3" stroke-linecap="round"/><path d="M13 -27 h21 l-4 5 l4 5 h-21 Z" fill="#ff6f61"/><text x="23" y="-21.3" font-size="6.6" font-weight="800" text-anchor="middle" fill="#fff">Today</text></g>`; }
  const lab = (pt, t, a, dx, dy) => `<text x="${f1(pt[0] + dx)}" y="${f1(pt[1] + dy)}" font-size="9.5" font-weight="800" text-anchor="${a}" fill="#3d4a6b" letter-spacing=".8" opacity=".75">${t}</text>`;
  const w = ox + (cols + pad) * (TW / 2) + 40, h = oy + (cols + R + 2 * pad) * (TH / 2) + D + 44;
  el.innerHTML = `<svg viewBox="0 0 ${f1(w)} ${f1(h)}" class="forest" role="img" aria-label="Forest: a tree for every day you studied in the last ${cols} weeks; the more you studied, the bigger the tree">
    <defs><filter id="fs-blur" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="7"/></filter>
      <linearGradient id="fs-grass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a6e36b"/><stop offset=".55" stop-color="#86d15a"/><stop offset="1" stop-color="#6fbf4a"/></linearGradient>
      <linearGradient id="fs-turf" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6cb845"/><stop offset="1" stop-color="#4f9a36"/></linearGradient>
      <linearGradient id="fs-soil" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b98a5e"/><stop offset=".5" stop-color="#a5764d"/><stop offset="1" stop-color="#8a5f3c"/></linearGradient></defs>
    ${out}${trees}${lab(corners[0], `${cols} WEEKS AGO`, "middle", 0, -12)}${lab(corners[1], "THIS WEEK", "end", -4, -10)}</svg>
    <p class="fs-key"><span>${plantIcon("sprout")} 1–2</span><span>${plantIcon("round")} 3–4</span><span>${plantIcon("pine")} 5–6</span><span>${plantIcon("great")} 7+ activities a day</span></p>`;
}
// each kind framed to its own size, so even the sprout reads in the key
const ICON_BOX = { sprout: "-9 -12 18 13", round: "-11 -26 22 28", pine: "-11 -26 22 28", great: "-15 -35 30 37" };
const plantIcon = (k) => `<svg viewBox="${ICON_BOX[k]}" aria-hidden="true">${plant(k, "40d4b1", "8b3dff")}</svg>`;

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
