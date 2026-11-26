// Gradify ribbons: a few bands of silk light behind the page, in the spirit of apple.com's product pages, in Gradify's
// own warm colours. Each ribbon is a handful of smooth strokes that run together and pinch where the silk twists, over
// a soft glow of the same colours, drifting very slowly. They are drawn as SVG (a few paths, built once per page with a
// little arithmetic, so they cost almost nothing to draw), placed at the page's edges, half off-screen and faded out,
// about one every screen and a half, never more than six. Only the transform moves, on the GPU, and only while a
// ribbon is on screen; they stand still for reduced motion.
//
// The rule that matters: text never sits on a motif. A motif is only placed where it covers no text that isn't inside
// a box of its own (a tile, a card, the lesson sheet, the bar). Text in a box is fine: the box is opaque. Loaded from
// kit/core/theme-boot.js on every page; off for high contrast, reduced transparency, print and the data saver.
//
//   import { mountMotifs } from "kit/ui/motifs.js";   mountMotifs();   // idempotent; re-places itself as the page changes

// each palette runs along the ribbon: Gradify's sunrise (pink, coral, amber), dusk (violet into pink), lagoon (teal
// into blue and violet) and bloom (rose into periwinkle). Light mode takes slightly deeper colours, so silk shows on white.
export const TONES = {
  sunrise: { light: ["#ff2e88", "#ff5a3c", "#ff9a1f", "#ffc23a"], dark: ["#ff3d95", "#ff6b4a", "#ffab3a", "#ffd76a"] },
  dusk:    { light: ["#6a4cff", "#b13cff", "#ff3f97", "#ff8a4c"], dark: ["#8a6cff", "#c95cff", "#ff5fa8", "#ffa06a"] },
  lagoon:  { light: ["#0fb3a6", "#1f86ff", "#5a52ff", "#a85cff"], dark: ["#2ae0cf", "#3a9bff", "#7a6cff", "#c47cff"] },
  bloom:   { light: ["#ff4f9a", "#ff7fbc", "#9a6bff", "#4f8dff"], dark: ["#ff6aab", "#ff9ccd", "#b28aff", "#6fa4ff"] },
};
export const TONE_NAMES = Object.keys(TONES);
const MAX = 6;          // at most this many on a page
const EVERY = 1.7;      // one per this many screen heights, at most
const TEXT = "h1,h2,h3,h4,h5,h6,p,li,dt,dd,label,blockquote,figcaption,td,th,summary,a,button,small,b,strong,em,span,input,textarea,select";

const rng = (s) => () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
const lightMode = () => document.documentElement.getAttribute("data-theme") === "light";
const f1 = (n) => Math.round(n * 10) / 10;

// a smooth path through points (Catmull-Rom, as cubic Béziers)
function smooth(pts) {
  let d = `M${f1(pts[0][0])} ${f1(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
    d += `C${f1(p1[0] + (p2[0] - p0[0]) / 6)} ${f1(p1[1] + (p2[1] - p0[1]) / 6)} ${f1(p2[0] - (p3[0] - p1[0]) / 6)} ${f1(p2[1] - (p3[1] - p1[1]) / 6)} ${f1(p2[0])} ${f1(p2[1])}`;
  }
  return d;
}

/**
 * One ribbon as SVG markup in a 1000 × 1000 box: a band that sweeps across on a meandering curve, tapers at its ends
 * and twists (its strokes run together where it turns edge-on, which is where the light gathers), over a blurred glow.
 * `seed` picks the shape, `tone` the palette.
 */
export function drawRibbon({ light = true, seed = 1, tone = "sunrise", id = "r", w = 1000, h = 1000 } = {}) {
  const cols = (TONES[tone] || TONES.sunrise)[light ? "light" : "dark"], r = rng(seed * 7919 + 13);
  // the centre line: a cubic sweeping from one side to the other, with generous swings that stay inside the box
  const y0 = h * (0.3 + r() * 0.4), y3 = h * (0.3 + r() * 0.4);
  const P = [[-0.08 * w, y0], [w * (0.26 + r() * 0.16), y0 + (r() - 0.5) * h * 0.9], [w * (0.6 + r() * 0.16), y3 + (r() - 0.5) * h * 0.9], [1.08 * w, y3]];
  const at = (t) => { const u = 1 - t; return [0, 1].map((k) => u * u * u * P[0][k] + 3 * u * u * t * P[1][k] + 3 * u * t * t * P[2][k] + t * t * t * P[3][k]); };
  const N = Math.round(44 * Math.max(1, w / h / 1.6)), W = h * (0.11 + r() * 0.07), turns = (0.8 + r() * 0.9) * Math.max(1, w / h / 2), phase = r() * 6.283, L = 21;
  const centre = [], normal = [], width = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N, a = at(Math.max(0, t - 0.002)), b = at(Math.min(1, t + 0.002)), dx = b[0] - a[0], dy = b[1] - a[1], m = Math.hypot(dx, dy) || 1;
    centre.push(at(t)); normal.push([-dy / m, dx / m]);
    width.push(W * (0.28 + 0.72 * Math.sin(Math.PI * t)) * Math.cos(turns * 6.283 * t + phase));   // taper × twist
  }
  const line = (u) => smooth(centre.map((c, i) => [c[0] + normal[i][0] * width[i] * u, c[1] + normal[i][1] * width[i] * u]));
  const edgeA = centre.map((c, i) => [c[0] + normal[i][0] * width[i], c[1] + normal[i][1] * width[i]]);
  const edgeB = centre.map((c, i) => [c[0] - normal[i][0] * width[i], c[1] - normal[i][1] * width[i]]).reverse();
  const body = `${smooth(edgeA)}L${f1(edgeB[0][0])} ${f1(edgeB[0][1])}${smooth(edgeB).slice(smooth(edgeB).indexOf("C"))}Z`;
  const g = `${id}g`, f = `${id}f`;
  const stops = cols.map((c, i) => `<stop offset="${f1((i / (cols.length - 1)) * 100)}%" stop-color="${c}"/>`).join("");
  let strokes = "";
  for (let i = 0; i < L; i++) {
    const u = -1 + (2 * i) / (L - 1), edge = Math.abs(u);
    strokes += `<path d="${line(u)}" stroke-width="${f1((1.1 + (1 - edge) * 1.6) * h / 1000 * 1.4)}" stroke-opacity="${f1(0.35 + (1 - edge) * 0.5)}"/>`;
  }
  return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" aria-hidden="true" focusable="false">
<defs><linearGradient id="${g}" gradientUnits="userSpaceOnUse" x1="${f1(P[0][0])}" y1="${f1(P[0][1])}" x2="${f1(P[3][0])}" y2="${f1(P[3][1])}">${stops}</linearGradient>
<filter id="${f}" x="-20%" y="-40%" width="140%" height="180%"><feGaussianBlur stdDeviation="${f1(h * 0.026)}"/></filter></defs>
<path d="${body}" fill="url(#${g})" opacity="${light ? 0.36 : 0.5}" filter="url(#${f})"/>
<path d="${body}" fill="url(#${g})" opacity="${light ? 0.14 : 0.2}"/>
<g fill="none" stroke="url(#${g})" stroke-linecap="round">${strokes}</g>
<path d="${line(0)}" fill="none" stroke="#fff" stroke-opacity="${light ? 0.55 : 0.4}" stroke-width="${f1(2.2 * h / 1000 * 1.4)}" stroke-linecap="round"/>
</svg>`;
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

/** Where the bands go: full-width strips with no bare text in them, at least a screen apart, at most four. */
export function bands({ vh, docH, text, min = 200, max = 560 }) {
  const cover = text.map((b) => [b.t - 28, b.b + 28]).sort((a, b) => a[0] - b[0]), free = [];
  let y = 0;
  for (const [t, b] of cover) { if (t > y) free.push([y, t]); y = Math.max(y, b); }
  if (docH > y) free.push([y, docH]);
  const out = [];
  for (const [t, b] of free) {
    const hgt = Math.min(max, b - t); if (hgt < min) continue;
    const top = t + (b - t - hgt) / 2;
    if (out.length && top - out.at(-1).y < vh * 0.9) continue;
    out.push({ y: top, h: hgt });
    if (out.length >= 4) break;
  }
  return out;
}

let layer = null, cache = {}, timer = 0, lastKey = "", seen = null;
const allowed = () => {
  const h = document.documentElement, mq = (q) => window.matchMedia && matchMedia(q).matches;
  if (h.getAttribute("data-a-contrast") === "high" || mq("(prefers-contrast: more)") || mq("(prefers-reduced-transparency: reduce)") || mq("(forced-colors: active)")) return false;
  if (navigator.connection && navigator.connection.saveData) return false;
  if (h.classList.contains("embed") || document.querySelector("meta[name='gradify-motifs'][content='off']")) return false;
  return true;
};

// built once per tone, theme and shape, then reused. SVG, not a background image: a large image painted after load
// would count as the page's "largest contentful paint" (scripts/perf-check.cjs caught it); plain paths never do
function sourceFor(light, seed, tone, id) {
  const k = `${light ? "l" : "d"}${tone}${seed % 5}`;
  if (!cache[k]) cache[k] = drawRibbon({ light, seed: (seed % 5) + 1, tone, id: "R" });
  return cache[k].replaceAll('id="Rg"', `id="${id}g"`).replaceAll("url(#Rg)", `url(#${id}g)`).replaceAll('id="Rf"', `id="${id}f"`).replaceAll("url(#Rf)", `url(#${id}f)`);
}

// the drift: very slow, a few pixels and a fraction of a degree, so the silk seems to breathe (transform only, on the GPU)
const STYLE = `.g-silk{position:absolute;will-change:transform;animation:g-silk-drift var(--d,34s) cubic-bezier(.45,0,.55,1) var(--dl,0s) infinite alternate;animation-play-state:paused}
.g-silk.on{animation-play-state:running}
@keyframes g-silk-drift{from{transform:translate3d(0,0,0) rotate(0deg) scale(1)}to{transform:translate3d(var(--dx,14px),var(--dy,-10px),0) rotate(var(--dr,1.2deg)) scale(1.025)}}
@media (prefers-reduced-motion:reduce){.g-silk{animation:none}}
:root[data-motion="reduce"] .g-silk{animation:none}`;

function place() {
  timer = 0;
  if (!allowed()) { layer?.remove(); layer = null; return; }
  if (!layer) {
    layer = document.createElement("div"); layer.className = "g-motifs"; layer.setAttribute("aria-hidden", "true");
    layer.style.cssText = "position:absolute;left:0;top:0;width:100%;height:0;overflow:hidden;pointer-events:none;z-index:-2;contain:strict";
    if (!document.getElementById("g-silk-css")) { const st = document.createElement("style"); st.id = "g-silk-css"; st.textContent = STYLE; document.head.append(st); }
    document.body.prepend(layer);
    // a ribbon only moves while it's on screen
    seen = "IntersectionObserver" in window ? new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle("on", e.isIntersecting)), { rootMargin: "120px" }) : null;
  }
  layer.style.height = "0px";
  const vw = document.documentElement.clientWidth, vh = innerHeight, docH = document.documentElement.scrollHeight, light = lightMode();
  const text = bareText();
  const key = `${vw}x${docH}:${light}:${text.length}:${Math.round(text.reduce((s, t) => s + t.t, 0) / 50)}`;
  layer.style.height = `${docH}px`;
  if (key === lastKey) return;
  lastKey = key;
  const seed = [...location.pathname].reduce((s, c) => s * 31 + c.charCodeAt(0), 7) >>> 0;
  const rr = rng(seed + 99), order = [...TONE_NAMES].sort(() => rr() - 0.5);
  seen?.disconnect();
  layer.textContent = "";
  const strips = bands({ vh, docH, text });
  strips.forEach((b, n) => {
    const tone = order[n % order.length], k = rng(seed + n * 101), w = Math.round(vw * 1.1);
    const el = document.createElement("div");
    el.className = "g-silk";
    const fade = "linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent), linear-gradient(transparent, #000 22%, #000 78%, transparent)";
    el.style.cssText = `left:${Math.round(-vw * 0.05)}px;top:${Math.round(b.y)}px;width:${w}px;height:${Math.round(b.h)}px;-webkit-mask:${fade};-webkit-mask-composite:source-in;mask:${fade};mask-composite:intersect;--d:${Math.round(30 + k() * 14)}s;--dl:-${Math.round(k() * 20)}s;--dx:${Math.round((k() - 0.5) * 40)}px;--dy:${Math.round((k() - 0.5) * 16)}px;--dr:${f1((k() - 0.5) * 1.2)}deg`;
    el.innerHTML = drawRibbon({ light, seed: (seed + n * 7) % 997 + 1, tone, id: `b${n}`, w: 1600, h: Math.round(1600 * b.h / w) });
    layer.append(el);
    seen?.observe(el);
  });
  const spots = strips.length ? [] : placements({ vw, vh, docH, text, seed });
  spots.forEach((p, n) => {
    const tone = order[n % order.length];
    const fade = p.side ? "radial-gradient(closest-side at 62% 50%, #000 42%, transparent 100%)" : "radial-gradient(closest-side at 38% 50%, #000 42%, transparent 100%)";
    const el = document.createElement("div");
    el.className = "g-silk";
    const k = rng(p.seed);
    el.style.cssText = `left:${p.x}px;top:${p.y}px;width:${p.size}px;height:${p.size}px;-webkit-mask:${fade};mask:${fade};--d:${Math.round(28 + k() * 16)}s;--dl:-${Math.round(k() * 20)}s;--dx:${Math.round((k() - 0.5) * 36)}px;--dy:${Math.round((k() - 0.5) * 28)}px;--dr:${f1((k() - 0.5) * 3)}deg`;
    el.innerHTML = sourceFor(light, p.seed, tone, `m${n}`);
    layer.append(el);
    seen?.observe(el);
  });
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
