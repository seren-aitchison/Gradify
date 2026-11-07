// The Gradify Earth's planet surface, drawn pixel by pixel under the globe's pins and arcs (kit/earth/globe.js):
// land and sea from the Natural Earth land points (earth-land.js), terrain colour by latitude with noise, ice caps,
// slowly drifting clouds, a day side lit from the upper left with a soft terminator, city lights on the night side,
// sun glint on the oceans and an atmosphere at the rim. Everything is generated in the browser: no image files.
// Module regions tint the land in their colour; locked regions are greyed.
import { LAND } from "./earth-land.js";

const EW = 1024, EH = 512;        // land, colour and lights (equirectangular)
const NW = 512, NH = 256;         // clouds and region tint
const TAU = Math.PI * 2;
const hash = (i) => { const x = Math.sin(i * 12.9898) * 43758.5453; return x - Math.floor(x); };
const sstep = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

// 3D value noise on the unit sphere, so the textures have no seam at the date line or pinch at the poles
function h3(x, y, z) { let n = (x * 374761393 + y * 668265263 + z * 1274126177) | 0; n = (n ^ (n >>> 13)) * 1274126177; return ((n ^ (n >>> 16)) >>> 0) / 4294967295; }
function noise(x, y, z) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z), xf = x - xi, yf = y - yi, zf = z - zi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf), w = zf * zf * (3 - 2 * zf);
  const l = (a, b, t) => a + (b - a) * t;
  return l(l(l(h3(xi, yi, zi), h3(xi + 1, yi, zi), u), l(h3(xi, yi + 1, zi), h3(xi + 1, yi + 1, zi), u), v),
    l(l(h3(xi, yi, zi + 1), h3(xi + 1, yi, zi + 1), u), l(h3(xi, yi + 1, zi + 1), h3(xi + 1, yi + 1, zi + 1), u), v), w);
}
function fbm(x, y, z, oct) { let s = 0, a = 0.5, f = 1; for (let o = 0; o < oct; o++) { s += a * noise(x * f, y * f, z * f); f *= 2.03; a *= 0.5; } return s; }
const unit = (lat, lon) => [Math.cos(lat) * Math.sin(lon), Math.sin(lat), Math.cos(lat) * Math.cos(lon)];

let T = null;   // the textures, built once on first use
function build() {
  // land mask: a soft disc at every land point, blurred into solid land with soft coasts
  const c1 = Object.assign(document.createElement("canvas"), { width: EW, height: EH }), g1 = c1.getContext("2d");
  g1.fillStyle = "#000"; g1.fillRect(0, 0, EW, EH); g1.fillStyle = "#fff";
  for (let i = 0; i < LAND.length; i += 2) {
    const lat = LAND[i] / 10, lon = LAND[i + 1] / 10, x = ((lon + 180) / 360) * EW, y = ((90 - lat) / 180) * EH;
    const rx = Math.min(12, 3.1 / Math.max(0.2, Math.cos((lat * Math.PI) / 180)));
    g1.beginPath(); g1.ellipse(x, y, rx, 3.1, 0, 0, TAU); g1.fill();
    if (x < rx) { g1.beginPath(); g1.ellipse(x + EW, y, rx, 3.1, 0, 0, TAU); g1.fill(); }
    if (x > EW - rx) { g1.beginPath(); g1.ellipse(x - EW, y, rx, 3.1, 0, 0, TAU); g1.fill(); }
  }
  const c2 = Object.assign(document.createElement("canvas"), { width: EW, height: EH }), g2 = c2.getContext("2d");
  g2.filter = "blur(2.2px)"; g2.drawImage(c1, 0, 0);
  const raw = g2.getImageData(0, 0, EW, EH).data;
  const land = new Float32Array(EW * EH);
  for (let i = 0; i < land.length; i++) land[i] = raw[i * 4] / 255;

  // city lights: warm points on a share of the land, the same ones the old dot globe lit
  const lights = new Float32Array(EW * EH);
  for (let i = 0, k = 0; i < LAND.length; i += 2, k++) {
    if (hash(k) <= 0.86) continue;
    const x = Math.round(((LAND[i + 1] / 10 + 180) / 360) * EW) % EW, y = Math.round(((90 - LAND[i] / 10) / 180) * EH);
    const b = 0.5 + hash(k * 7.1) * 0.5;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const j = ((y + dy + EH) % EH) * EW + ((x + dx + EW) % EW); lights[j] = Math.min(1, lights[j] + b * (dx || dy ? 0.35 : 1));
    }
  }

  // colour: sea depth near coasts, then land by latitude, varied with noise; ice at the poles
  const col = new Uint8ClampedArray(EW * EH * 3);
  const nT = new Float32Array(NW * NH);
  for (let y = 0; y < NH; y++) for (let x = 0; x < NW; x++) {
    const [a, b, c] = unit((0.5 - (y + 0.5) / NH) * Math.PI, ((x + 0.5) / NW - 0.5) * TAU);
    nT[y * NW + x] = fbm(a * 3 + 11, b * 3 + 7, c * 3 + 3, 5);
  }
  // fine relief, per texel of the coarse map, for texture on the land
  const rel = new Float32Array(NW * NH);
  for (let y = 0; y < NH; y++) for (let x = 0; x < NW; x++) {
    const [a, b, c] = unit((0.5 - (y + 0.5) / NH) * Math.PI, ((x + 0.5) / NW - 0.5) * TAU);
    rel[y * NW + x] = fbm(a * 14 + 2, b * 14 - 3, c * 14 + 8, 3);
  }
  for (let y = 0; y < EH; y++) {
    const lat = 90 - ((y + 0.5) / EH) * 180, al = Math.abs(lat);
    for (let x = 0; x < EW; x++) {
      const i = y * EW + x, m = land[i], ci = (y >> 1) * NW + (x >> 1), n = nT[ci], f = rel[ci];
      // sea: deep slate blue, a little lighter over the shelf near land
      const shelf = sstep(0.04, 0.55, m) * 0.6;
      let r = 12 + 20 * shelf + 8 * n, g = 26 + 34 * shelf + 10 * n, bl = 44 + 40 * shelf + 14 * n;
      if (m > 0.42) {
        // land, muted to the cool satellite look: grey-green where it's wet, pale stone and sand where it's dry
        const desert = sstep(12, 20, al) * (1 - sstep(33, 41, al)) * sstep(0.4, 0.62, n + 0.12);
        const tundra = sstep(50, 66, al);
        const relief = 0.78 + 0.44 * f;
        let lr = (104 + 36 * n) * relief, lg = (116 + 30 * n) * relief, lb = (100 + 24 * n) * relief;
        lr += (206 * relief - lr) * desert; lg += (194 * relief - lg) * desert; lb += (168 * relief - lb) * desert;
        lr += (150 * relief - lr) * tundra; lg += (150 * relief - lg) * tundra; lb += (148 * relief - lb) * tundra;
        const k = sstep(0.42, 0.6, m);
        r += (lr - r) * k; g += (lg - g) * k; bl += (lb - bl) * k;
      }
      // ice: Antarctica, Greenland and the Arctic sea ice
      const ice = lat < -62 ? sstep(-62, -70, lat) * (m > 0.3 ? 1 : 0.85) : sstep(72, 80, lat) + (m > 0.45 && lat > 60 && x < EW * 0.47 && x > EW * 0.28 ? 0.9 : 0);
      const ik = Math.min(1, ice) * (0.85 + 0.15 * n);
      r += (232 - r) * ik; g += (238 - g) * ik; bl += (244 - bl) * ik;
      col[i * 3] = r; col[i * 3 + 1] = g; col[i * 3 + 2] = bl;
    }
  }

  // clouds: warped noise, thickest in the storm belts and over the equator, thin over the subtropics
  const cloud = new Float32Array(NW * NH);
  for (let y = 0; y < NH; y++) {
    const lat = (0.5 - (y + 0.5) / NH) * Math.PI, al = Math.abs(lat * 57.3);
    const belt = 0.5 + 0.35 * Math.exp(-((al - 55) ** 2) / 200) + 0.25 * Math.exp(-(al ** 2) / 60) - 0.18 * Math.exp(-((al - 25) ** 2) / 90);
    for (let x = 0; x < NW; x++) {
      const [a, b, c] = unit(lat, ((x + 0.5) / NW - 0.5) * TAU);
      const w = fbm(a * 2.5 + 5, b * 2.5, c * 2.5 - 4, 3);
      const v = fbm(a * 5 + w * 2.6, b * 8 + w * 1.8, c * 5 - w * 2.6, 6);
      const wisp = fbm(a * 18 + w, b * 24, c * 18 - w, 3);
      cloud[y * NW + x] = sstep(0.5 - belt * 0.14, 0.72 - belt * 0.1, v * 0.82 + wisp * 0.22) * 0.97;
    }
  }
  T = { land, col, lights, cloud };
}

export function createSurface() {
  let tint = null, off = null, octx = null, img = null, D = 0;
  // per pixel, worked out once per size: the view-space normal's lighting terms
  let inside = null, lit = null, day = null, glint = null, haze = null, edge = null;
  // per pixel, worked out once per tilt: texture row and the longitude before turning
  let row = null, vrow = null, lon0 = null, tilt = NaN;
  // region tint, per texel of a coarse map: [r, g, b, strength, locked]
  function setRegions(regions) {
    if (!regions?.length) { tint = null; return; }
    tint = new Float32Array(NW * NH * 5);
    for (let y = 0; y < NH; y++) for (let x = 0; x < NW; x++) {
      const v = unit((0.5 - (y + 0.5) / NH) * Math.PI, ((x + 0.5) / NW - 0.5) * TAU);
      let best = null, d = 1e9;
      for (const r of regions) { const a = Math.acos(Math.max(-1, Math.min(1, v[0] * r.v[0] + v[1] * r.v[1] + v[2] * r.v[2]))); if (a < r.radius && a < d) { d = a; best = r; } }
      if (!best) continue;
      const j = (y * NW + x) * 5; tint[j] = best.rgb[0]; tint[j + 1] = best.rgb[1]; tint[j + 2] = best.rgb[2];
      tint[j + 3] = sstep(0, 0.6, 1 - d / best.radius) * best.light; tint[j + 4] = best.locked ? 1 : 0;
    }
  }
  // the sun: upper left and towards the viewer; its half-vector for the ocean glint
  const L = (() => { const v = [-0.78, 0.36, 0.5], n = Math.hypot(...v); return v.map((c) => c / n); })();
  const Hv = (() => { const v = [L[0], L[1], L[2] + 1], n = Math.hypot(...v); return v.map((c) => c / n); })();
  function size(n) {
    D = n; off = Object.assign(document.createElement("canvas"), { width: D, height: D }); octx = off.getContext("2d");
    img = octx.createImageData(D, D);
    const N = D * D;
    inside = new Uint8Array(N); lit = new Float32Array(N); day = new Float32Array(N); glint = new Float32Array(N); haze = new Float32Array(N); edge = new Float32Array(N);
    row = new Int32Array(N); vrow = new Float32Array(N); lon0 = new Float32Array(N); tilt = NaN;
    for (let py = 0; py < D; py++) for (let px = 0; px < D; px++) {
      const i = py * D + px, x = ((px + 0.5) / D) * 2 - 1, y = 1 - ((py + 0.5) / D) * 2, q = x * x + y * y;
      if (q >= 1) continue;
      const z = Math.sqrt(1 - q), d = x * L[0] + y * L[1] + z * L[2], h = x * Hv[0] + y * Hv[1] + z * Hv[2], f = 1 - z;
      inside[i] = 1; lit[i] = d > 0 ? d : 0; day[i] = sstep(-0.18, 0.22, d);
      glint[i] = h > 0.9 ? Math.pow(h, 60) * 170 : 0;
      haze[i] = f * f * f * (0.25 + 0.9 * day[i]);
      edge[i] = 1 - q > 2 / D ? 1 : Math.max(0, ((1 - q) * D) / 2);
    }
  }
  function setTilt(pitch) {
    tilt = pitch;
    const cp = Math.cos(pitch), sp = Math.sin(pitch);
    for (let py = 0; py < D; py++) for (let px = 0; px < D; px++) {
      const i = py * D + px; if (!inside[i]) continue;
      const x = ((px + 0.5) / D) * 2 - 1, y = 1 - ((py + 0.5) / D) * 2, z = Math.sqrt(Math.max(0, 1 - x * x - y * y));
      const wy = y * cp + z * sp, zz = -y * sp + z * cp;
      const v = (0.5 - Math.asin(wy < -1 ? -1 : wy > 1 ? 1 : wy) / Math.PI) * EH;
      row[i] = Math.min(EH - 1, v | 0); vrow[i] = Math.min(NH - 1.001, Math.max(0, v / 2 - 0.5));
      lon0[i] = (Math.atan2(x, zz) / TAU + 0.5) * EW;
    }
  }

  /** draw the planet into ctx: a disc of radius r at (cx, cy), viewed with yaw and pitch, at time t (s) */
  function render(ctx, cx, cy, r, yaw, pitch, t, dpr = 1) {
    if (!T) build();
    const want = Math.max(96, Math.min(560, Math.round(2 * r * Math.min(dpr, 1.25))));
    if (want !== D) size(want);
    if (pitch !== tilt) setTilt(pitch);
    const px = img.data, turn = (((yaw / TAU) * EW) % EW + EW) % EW, cshift = (t * 0.004 % 1) * EW;
    const { land, col, lights, cloud } = T;
    for (let i = 0, n = D * D; i < n; i++) {
      const o = i * 4;
      if (!inside[i]) { px[o + 3] = 0; continue; }
      const uf = lon0[i] + turn, ui = (uf | 0) % EW, vi = row[i], e = vi * EW + ui;
      let r0 = col[e * 3], g0 = col[e * 3 + 1], b0 = col[e * 3 + 2];
      // clouds are smooth: sampled between the four nearest texels
      const cu = ((uf + cshift) % EW) / 2, cv = vrow[i], cx0 = cu | 0, cy0 = cv | 0, fx = cu - cx0, fy = cv - cy0;
      const cx1 = (cx0 + 1) % NW, cy1 = cy0 + 1 < NH ? cy0 + 1 : cy0, c0 = cy0 * NW, c1 = cy1 * NW;
      const c = (cloud[c0 + cx0] * (1 - fx) + cloud[c0 + cx1] * fx) * (1 - fy) + (cloud[c1 + cx0] * (1 - fx) + cloud[c1 + cx1] * fx) * fy;
      // module regions glow in their colour over the land; locked ones are greyed
      if (tint) {
        const k = ((vi >> 1) * NW + (ui >> 1)) * 5, s = tint[k + 3];
        if (s > 0) {
          if (tint[k + 4]) { const grey = (r0 + g0 + b0) / 3; r0 += (grey - r0) * s; g0 += (grey - g0) * s; b0 += (grey - b0) * s; }
          else { const m = land[e] > 0.45 ? 0.55 : 0.22; r0 += (tint[k] - r0) * s * m; g0 += (tint[k + 1] - g0) * s * m; b0 += (tint[k + 2] - b0) * s * m; }
        }
      }
      const li = lit[i], amb = 0.07 + 1.05 * li;
      let R = r0 * amb, G = g0 * amb, B = b0 * amb;
      // sun glint on open water
      if (glint[i] > 0 && land[e] < 0.4) { const s = glint[i] * (1 - c); R += s; G += s; B += s * 0.95; }
      // clouds, lit like the ground
      if (c > 0) { const w = c * 0.92, cl = 0.05 + 1.0 * li; R += (236 * cl - R) * w; G += (240 * cl - G) * w; B += (248 * cl - B) * w; }
      // city lights where it's night and the sky is clear
      const night = 1 - day[i], lt = lights[e];
      if (lt > 0 && night > 0.05) { const k = lt * night * (1 - c * 0.85) * 220; R += k; G += k * 0.72; B += k * 0.38; }
      // atmosphere: blue haze towards the rim, stronger on the day side
      const a = haze[i];
      if (a > 0.002) { R += (110 - R) * a * 0.7; G += (170 - G) * a * 0.7; B += (255 - B) * a * 0.75; }
      px[o] = R; px[o + 1] = G; px[o + 2] = B; px[o + 3] = edge[i] * 255;
    }
    octx.putImageData(img, 0, 0);
    ctx.save(); ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = "high";
    ctx.drawImage(off, cx - r, cy - r, 2 * r, 2 * r); ctx.restore();
  }
  return { setRegions, render };
}
