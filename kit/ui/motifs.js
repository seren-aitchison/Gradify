// Gradify motifs: a few line ribbons down the page, behind everything. Hundreds of hair-thin lines bend and twist into a
// ribbon of light: iridescent glass on white in light mode, red, pink and white neon on black in dark. They are drawn
// once per theme on a canvas (no SVG filters, nothing animated), turned into an image and placed at the page's edges,
// half off-screen and faded out, about one every screen and a half, never more than six.
//
// The rule that matters: text never sits on a motif. A motif is only placed where it covers no text that isn't inside
// a box of its own (a tile, a card, the lesson sheet, the bar). Text in a box is fine: the box is opaque. Loaded from
// kit/core/theme-boot.js on every page; off for high contrast, reduced transparency, print and the data saver.
//
//   import { mountMotifs } from "kit/ui/motifs.js";   mountMotifs();   // idempotent; re-places itself as the page changes

// each tone: a cycle of colours the lines shimmer through (thin-film light), one set for white and one for black.
// The light-mode colours are deeper, so hair-thin lines still show on white.
export const TONES = {
  pink:   { light: ["#e8157a", "#f24fbf", "#9b38f0", "#ff6fae", "#e62e5c", "#c040ff"], dark: ["#ff1f8f", "#ff5fd2", "#b23cff", "#ff9ad5", "#ff3d6e", "#ffd1ec"] },
  blue:   { light: ["#1361e8", "#1fa9e6", "#5b4cf0", "#12b5d4", "#2a46d8", "#3c8cff"], dark: ["#1f7bff", "#39d0ff", "#6a5cff", "#9ff3ff", "#2a5bff", "#5ee0e8"] },
  lime:   { light: ["#4caf10", "#86c400", "#10b386", "#9fb400", "#2f9e3c", "#62c21a"], dark: ["#8dff2e", "#d4ff3a", "#2dffa8", "#f4ff8a", "#46e05a", "#b6ff6e"] },
  yellow: { light: ["#d9a400", "#e3b800", "#e08a00", "#c99600", "#efb000", "#d27f00"], dark: ["#ffd60a", "#fff06a", "#ffab1f", "#fff6c2", "#ffc83d", "#ffe14d"] },
  orange: { light: ["#e85a00", "#f08a1c", "#e0304f", "#e39a36", "#d94a10", "#f07a2a"], dark: ["#ff6a00", "#ffa040", "#ff3d5e", "#ffcf80", "#ff5020", "#ffb35c"] },
  iris:   { light: ["#2fa8f5", "#8a6bff", "#f25aa8", "#ff9a4d", "#22c4ad", "#5468ff"], dark: ["#ff2d8a", "#b44cff", "#3fc5ff", "#2effb0", "#ffd400", "#ff6a00"] },
  teal:    { light: ["#0e8f86", "#16a7a0", "#0f6fb0", "#2bb39a", "#0a7d74", "#3aa6c9"], dark: ["#19e3cf", "#5cffe4", "#2aa8ff", "#b8fff2", "#12c9b6", "#7ae7ff"] },
  violet:  { light: ["#6a3fe0", "#8a4ff0", "#4b3bd0", "#a35ae6", "#5a2fc4", "#7c6cf0"], dark: ["#9b6cff", "#c79bff", "#6f5cff", "#e3d2ff", "#b07cff", "#8a8cff"] },
  magenta: { light: ["#c4157f", "#e0279f", "#9a1fb8", "#ea4ca8", "#b0126c", "#d43cc4"], dark: ["#ff2fb2", "#ff7ad8", "#d23cff", "#ffc2ec", "#ff4fa0", "#f07cff"] },
  coral:   { light: ["#e2503b", "#f06a4f", "#d9365f", "#f0866a", "#c9432e", "#ee5c7a"], dark: ["#ff6b55", "#ff9a80", "#ff4f7a", "#ffd0c2", "#ff7d5c", "#ff8aa8"] },
  emerald: { light: ["#118a4f", "#1fa864", "#0c7a6a", "#3cb878", "#0a6e43", "#29a38c"], dark: ["#21e38a", "#7dffb8", "#14d6b0", "#c8ffe0", "#3cf08f", "#5cf0d0"] },
  gold:    { light: ["#b8860b", "#d19a10", "#a86a00", "#c9a227", "#9c7400", "#d4a531"], dark: ["#ffc62e", "#ffe27a", "#ffae2e", "#fff1c2", "#ffd24f", "#f5c56a"] },
  cyan:    { light: ["#0a86c2", "#1aa3d9", "#0b65b8", "#22b7d6", "#086f9e", "#3b8ff0"], dark: ["#21c8ff", "#8be6ff", "#3d8bff", "#d2f6ff", "#3fdcff", "#6fb0ff"] },
  red:    { light: ["#e8173a", "#f2457e", "#c4124b", "#ff7a8f", "#d8204a", "#f06a8c"], dark: ["#ff1f45", "#ff4f8b", "#e8173a", "#ff9fb8", "#ff3d7f", "#ffb3c4"] },
};
export const TONE_NAMES = Object.keys(TONES);
const MAX = 7;          // at most this many on a page
const EVERY = 1.7;      // one per this many screen heights, at most
const TEXT = "h1,h2,h3,h4,h5,h6,p,li,dt,dd,label,blockquote,figcaption,td,th,summary,a,button,small,b,strong,em,span,input,textarea,select";

const rng = (s) => () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
const lightMode = () => document.documentElement.getAttribute("data-theme") === "light";

const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
// a colour from a cycle of colours, blended smoothly (h wraps round)
function cycle(cols, h) {
  const n = cols.length, x = ((h % 1) + 1) % 1 * n, i = Math.floor(x), f = x - i, a = cols[i % n], b = cols[(i + 1) % n];
  const k = f * f * (3 - 2 * f);
  return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
}

/**
 * Draws one ribbon onto a square canvas of `size` pixels and returns it: a band of hair-thin wavy lines whose ripples
 * slide across them, so they crowd into bright folds; the colour shimmers through the tone's cycle along and across the
 * band (thin-film light), a soft haze glows beneath it, and its edges and ends fade away. `seed` picks the shape.
 */
export function drawRibbon(size, { light = true, seed = 1, tone = light ? "iris" : "red", lines = 96 } = {}) {
  const cols = (TONES[tone] || TONES.iris)[light ? "light" : "dark"].map(hex), r = rng(seed * 7919 + 13);
  const cv = document.createElement("canvas"); cv.width = cv.height = size;
  const g = cv.getContext("2d"); if (!g) return cv;
  // the shape: a band crossing the square at an angle, meandering (two slow waves), with ripples that drift across it
  const ang = (-0.7 + r() * 1.4) + (r() < 0.5 ? 0 : Math.PI / 2), ca = Math.cos(ang), sa = Math.sin(ang);
  const A1 = 0.09 + r() * 0.08, f1 = 0.7 + r() * 0.6, p1 = r() * 6.28, A2 = 0.04 + r() * 0.04, f2 = 1.6 + r() * 1.2, p2 = r() * 6.28;
  const B = 0.05 + r() * 0.04, f3 = 1.3 + r() * 1.4, gv = 0.6 + r() * 1.1, p3 = r() * 6.28, W0 = 0.5 + r() * 0.2;
  const hc1 = 1.1 + r() * 1.1, hc2 = 1.3 + r() * 1.1, hp = r();
  const N = 120, M = lines;
  const at = (t, v) => {
    const yc = A1 * Math.sin(6.283 * f1 * t + p1) + A2 * Math.sin(6.283 * f2 * t + p2);
    const W = W0 * (0.65 + 0.35 * Math.sin(Math.PI * t)) * (0.9 + 0.1 * Math.sin(9 * t + p1));
    const y = yc + v * W + B * Math.sin(6.283 * (f3 * t + gv * v) + p3) * (1 - 2 * Math.abs(v)) ;
    const x = t - 0.5;
    return [0.5 + (x * ca - y * sa) * 1.18, 0.5 + (x * sa + y * ca) * 1.18, W];
  };
  const pts = [];
  for (let i = 0; i < M; i++) { const v = i / (M - 1) - 0.5, row = []; for (let k = 0; k <= N; k++) row.push(at(k / N, v)); pts.push(row); }
  const S = size, lw = S / 900;
  g.lineCap = "round"; g.lineJoin = "round";
  // two passes: a broad soft haze (the glow beneath), then the lines themselves
  for (const pass of [0, 1]) {
    g.globalCompositeOperation = light ? (pass ? "source-over" : "multiply") : "lighter";
    for (let i = pass ? 0 : 2; i < M; i += pass ? 1 : 4) {
      const v = i / (M - 1) - 0.5, edge = Math.pow(Math.max(0, 1 - Math.abs(v) * 2), 0.7);
      const row = pts[i], nb = pts[Math.min(M - 1, i + 1)];
      for (let k = 0; k < N; k++) {
        const t = k / N, ends = Math.sin(Math.PI * Math.min(1, Math.max(0, (t - 0.02) / 0.96)));
        // the fold: where neighbouring lines crowd together the band is turning edge-on, and catches the light
        const gap = Math.hypot(nb[k][0] - row[k][0], nb[k][1] - row[k][1]) * M / Math.max(0.05, row[k][2]);
        const fold = Math.max(0, Math.min(1, 1.25 - gap));
        const c = cycle(cols, hc1 * t + hc2 * v + 0.25 * Math.sin(6 * t + 4 * v + p3) + hp);
        const hi = fold * fold;
        // towards white at a fold (in dark: a white-hot highlight; on white: a lighter, pearly line)
        const mix = light ? hi * 0.22 : hi * 0.5;
        const R = c[0] + (255 - c[0]) * mix, G = c[1] + (255 - c[1]) * mix, Bc = c[2] + (255 - c[2]) * mix;
        const al = Math.min(1, (pass ? (light ? 0.8 + 0.25 * fold : 0.62 + 0.4 * fold) : (light ? 0.075 : 0.12)) * edge * ends * 1.08);
        if (al < 0.01) continue;
        g.strokeStyle = `rgba(${R | 0},${G | 0},${Bc | 0},${al.toFixed(3)})`;
        g.lineWidth = pass ? lw * (light ? 1.9 : 1.6) * (1 + 0.3 * fold) : lw * 40;
        g.beginPath(); g.moveTo(row[k][0] * S, row[k][1] * S); g.lineTo(row[k + 1][0] * S, row[k + 1][1] * S); g.stroke();
      }
    }
  }
  return cv;
}

// a box: something opaque enough that text inside it reads whatever is behind it
function boxedBy(el, memo) {
  const chain = [];
  let e = el, res = false;
  while (e && e !== document.body && e !== document.documentElement) {
    if (memo.has(e)) { res = memo.get(e); break; }
    chain.push(e);
    const cs = getComputedStyle(e);
    if (cs.position === "fixed" || cs.position === "sticky") { res = true; break; }   // bars and docks: boxed, and they move
    if (e.hasAttribute("data-lg") || e.classList.contains("glass")) { res = true; break; }
    const bg = cs.backgroundColor, m = bg.match(/rgba?\(([^)]+)\)/);
    const alpha = m ? (m[1].split(/[ ,/]+/).filter(Boolean)[3] ?? 1) : 1;
    if ((bg !== "transparent" && Number(alpha) >= 0.6) || (cs.backgroundImage !== "none" && !/^url\(/.test(cs.backgroundImage) && parseFloat(cs.borderRadius) > 0)) { res = true; break; }
    e = e.parentElement;
  }
  for (const c of chain) memo.set(c, res);
  return res;
}

/** The rectangles (page coordinates) of text that isn't inside a box: where a motif must not go. */
export function bareText() {
  const memo = new Map(), out = [], sx = scrollX, sy = scrollY;
  for (const el of document.body.querySelectorAll(TEXT)) {
    if (el.closest(".g-motifs, [hidden], [aria-hidden='true']")) continue;
    let own = false;
    for (const n of el.childNodes) if (n.nodeType === 3 && n.textContent.trim()) { own = true; break; }
    if (!own && !/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) continue;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    if (boxedBy(el, memo)) continue;
    out.push({ l: r.left + sx, t: r.top + sy, r: r.right + sx, b: r.bottom + sy });
  }
  return out;
}

const hits = (a, list, pad) => list.some((b) => a.l < b.r + pad && a.r > b.l - pad && a.t < b.b + pad && a.b > b.t - pad);

/** Where the motifs go: page-coordinate squares, at most MAX, alternating sides, clear of bare text. */
export function placements({ vw, vh, docH, text, seed = 1 }) {
  const phone = vw < 700, S = Math.round(phone ? vw * 0.95 : Math.min(760, Math.max(380, vw * 0.4)));
  const show = phone ? 0.38 : 0.6;            // how much of the square is on screen
  const out = [], r = rng(seed);
  let side = r() < 0.5 ? 0 : 1, y = vh * (0.35 + r() * 0.3);
  while (y < docH - S * 0.4 && out.length < MAX) {
    const x = side ? vw - S * show : -S * (1 - show);
    let placed = null;
    for (const dy of [0, -0.2, 0.2, -0.4, 0.4, 0.6]) {
      const top = y + dy * vh;
      if (top < 40 || top + S * 0.3 > docH) continue;
      // the part that shows and isn't faded away: the inner 70% of the visible slice
      const vis = { l: Math.max(0, x + S * 0.15), r: Math.min(vw, x + S * 0.85), t: top + S * 0.15, b: top + S * 0.85 };
      if (!hits(vis, text, 16)) { placed = { x, y: top, size: S, side, seed: Math.floor(r() * 1e6) }; break; }
    }
    if (placed) { out.push(placed); side = 1 - side; y = placed.y + vh * EVERY + r() * vh * 0.5; } else y += vh * 0.5;
  }
  return out;
}

let layer = null, cache = {}, timer = 0, lastKey = "";
const allowed = () => {
  const h = document.documentElement, mq = (q) => window.matchMedia && matchMedia(q).matches;
  if (h.getAttribute("data-a-contrast") === "high" || mq("(prefers-contrast: more)") || mq("(prefers-reduced-transparency: reduce)") || mq("(forced-colors: active)")) return false;
  if (navigator.connection && navigator.connection.saveData) return false;
  if (h.classList.contains("embed") || document.querySelector("meta[name='gradify-motifs'][content='off']")) return false;
  return true;
};

function imageFor(light, seed, tone) {
  const k = `${light ? "l" : "d"}${tone}${seed % 5}`;
  if (!cache[k]) {
    const px = Math.round(Math.min(1.5, devicePixelRatio || 1) * 760);
    cache[k] = drawRibbon(px, { light, seed: (seed % 5) + 1, tone }).toDataURL("image/png");
  }
  return cache[k];
}

function place() {
  timer = 0;
  if (!allowed()) { layer?.remove(); layer = null; return; }
  if (!layer) {
    layer = document.createElement("div"); layer.className = "g-motifs"; layer.setAttribute("aria-hidden", "true");
    layer.style.cssText = "position:absolute;left:0;top:0;width:100%;height:0;overflow:hidden;pointer-events:none;z-index:-2;contain:strict";
    document.body.prepend(layer);
  }
  layer.style.height = "0px";
  const vw = document.documentElement.clientWidth, vh = innerHeight, docH = document.documentElement.scrollHeight, light = lightMode();
  const text = bareText();
  const key = `${vw}x${docH}:${light}:${text.length}:${Math.round(text.reduce((s, t) => s + t.t, 0) / 50)}`;
  layer.style.height = `${docH}px`;
  if (key === lastKey) return;
  lastKey = key;
  const seed = [...location.pathname].reduce((s, c) => s * 31 + c.charCodeAt(0), 7) >>> 0;
  const spots = placements({ vw, vh, docH, text, seed });
  const rr = rng(seed + 99), order = [...TONE_NAMES].sort(() => rr() - 0.5);
  layer.innerHTML = spots.map((p, n) => {
    const tone = order[n % order.length];
    const fade = p.side ? "radial-gradient(closest-side at 62% 50%, #000 38%, transparent 100%)" : "radial-gradient(closest-side at 38% 50%, #000 38%, transparent 100%)";
    return `<i style="position:absolute;left:${p.x}px;top:${p.y}px;width:${p.size}px;height:${p.size}px;background:url(${imageFor(light, p.seed, tone)}) center/cover no-repeat;-webkit-mask:${fade};mask:${fade};opacity:1"></i>`;
  }).join("");
}

const soon = (ms = 400) => { clearTimeout(timer); timer = setTimeout(() => ("requestIdleCallback" in window ? requestIdleCallback(place, { timeout: 1200 }) : place()), ms); };

/** Puts the motifs on the page and keeps them placed as it changes (routes, resizes, the theme). */
export function mountMotifs() {
  if (mountMotifs.on) return; mountMotifs.on = true;
  soon(0);
  addEventListener("resize", () => soon(300));
  addEventListener("hashchange", () => soon(700));
  new MutationObserver(() => soon(900)).observe(document.body, { childList: true, subtree: true });
  new MutationObserver(() => { lastKey = ""; soon(50); }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "data-a-contrast"] });
  addEventListener("beforeprint", () => layer && (layer.style.display = "none"));
  addEventListener("afterprint", () => layer && (layer.style.display = ""));
}
