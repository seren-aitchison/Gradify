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

const LIGHT = { stops: ["#2fa8f5", "#8a6bff", "#f25aa8", "#ff9a4d", "#22c4ad", "#5468ff", "#f0609a"], bright: "#ffffff", glow: 0, alpha: [0.5, 0.95] };
const DARK = { stops: ["#ff1f45", "#ff4f8b", "#e8173a", "#ff9fb8", "#ff3d7f", "#ffb3c4", "#ff2244"], bright: "#ffffff", glow: 5, alpha: [0.16, 0.55] };
const MAX = 6;          // at most this many on a page
const EVERY = 1.7;      // one per this many screen heights, at most
const TEXT = "h1,h2,h3,h4,h5,h6,p,li,dt,dd,label,blockquote,figcaption,td,th,summary,a,button,small,b,strong,em,span,input,textarea,select";

const rng = (s) => () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
const lightMode = () => document.documentElement.getAttribute("data-theme") === "light";

/** Draws one ribbon onto a square canvas of `size` pixels and returns it. `seed` picks the shape. */
export function drawRibbon(size, { light = true, seed = 1, lines = 130 } = {}) {
  const P = light ? LIGHT : DARK, r = rng(seed * 7919 + 13);
  const cv = document.createElement("canvas"); cv.width = cv.height = size;
  const g = cv.getContext("2d"); if (!g) return cv;
  // the ribbon: a broad band whose spine sweeps across the square in an S, swelling and narrowing, and twisting so it
  // turns edge-on in places (there its lines crowd together into bright folds, as light does on a turning ribbon)
  const a0 = -0.9 + r() * 1.8, sw = 0.16 + r() * 0.12, ph = r() * 6.28, turns = 1.1 + r() * 0.9, fat = 0.42 + r() * 0.16;
  const dir = [Math.cos(a0 + 0.8), Math.sin(a0 + 0.8)], nrm = [-dir[1], dir[0]];
  const spine = (t) => {
    const u = t - 0.5, s1 = Math.sin(t * Math.PI * 2 + ph) * sw, s2 = Math.sin(t * Math.PI * 3.3 + ph * 1.7) * sw * 0.35;
    const x = 0.5 + dir[0] * u * 1.15 + nrm[0] * (s1 + s2), y = 0.5 + dir[1] * u * 1.15 + nrm[1] * (s1 + s2);
    const dx = dir[0] + nrm[0] * Math.cos(t * Math.PI * 2 + ph) * sw * 6, dy = dir[1] + nrm[1] * Math.cos(t * Math.PI * 2 + ph) * sw * 6;
    return [x, y, Math.atan2(dy, dx) + Math.PI / 2];
  };
  const width = (t) => fat * (0.55 + 0.45 * Math.sin(t * Math.PI)) * (0.85 + 0.15 * Math.sin(t * 11 + ph));
  const twist = (t) => 0.18 + 0.82 * Math.abs(Math.cos(t * Math.PI * turns + ph));
  const grad = g.createLinearGradient(0, 0, size, size);
  P.stops.forEach((c, i) => grad.addColorStop(i / (P.stops.length - 1), c));
  g.lineCap = "round"; g.lineJoin = "round";
  if (!light) { g.globalCompositeOperation = "lighter"; g.shadowBlur = P.glow; }
  const N = 90;
  for (let i = 0; i < lines; i++) {
    const v = i / (lines - 1) - 0.5;
    g.beginPath();
    for (let k = 0; k <= N; k++) {
      const t = k / N, [x, y, n] = spine(t), w = width(t) * twist(t);
      const px = (x + Math.cos(n) * v * w) * size, py = (y + Math.sin(n) * v * w) * size;
      k ? g.lineTo(px, py) : g.moveTo(px, py);
    }
    // every seventh line is a bright highlight (white light caught on an edge); the rest take the ribbon's colours,
    // fainter towards the ribbon's edges
    const hi = i % 9 === 4, edge = 1 - Math.abs(v) * 1.6;
    g.strokeStyle = hi ? (light ? "rgba(255,255,255,.95)" : P.bright) : grad;
    if (!light) g.shadowColor = hi ? "rgba(255,255,255,.9)" : "rgba(255,40,80,.9)";
    g.globalAlpha = Math.max(0.05, P.alpha[0] + (P.alpha[1] - P.alpha[0]) * edge) * (hi ? (light ? 0.9 : 1) : 1);
    g.lineWidth = (hi ? 1.5 : light ? 1.35 : 1.15) * (size / 900);
    g.stroke();
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
  const show = phone ? 0.34 : 0.55;            // how much of the square is on screen
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

function imageFor(light, seed) {
  const k = `${light ? "l" : "d"}${seed % 5}`;
  if (!cache[k]) {
    const px = Math.round(Math.min(1.5, devicePixelRatio || 1) * 760);
    cache[k] = drawRibbon(px, { light, seed: (seed % 5) + 1 }).toDataURL("image/png");
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
  layer.innerHTML = spots.map((p) => {
    const fade = p.side ? "radial-gradient(closest-side at 62% 50%, #000 38%, transparent 100%)" : "radial-gradient(closest-side at 38% 50%, #000 38%, transparent 100%)";
    return `<i style="position:absolute;left:${p.x}px;top:${p.y}px;width:${p.size}px;height:${p.size}px;background:url(${imageFor(light, p.seed)}) center/cover no-repeat;-webkit-mask:${fade};mask:${fade};opacity:${light ? 0.9 : 0.85}"></i>`;
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
