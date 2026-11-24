// Labs in light mode. The 137 labs (kit/labs/*) were drawn for a dark stage: white grid lines, pale labels, neon
// accents on near-black. Rather than rewrite ~450 hand-picked colours, every colour a lab draws passes through
// adapt(), which in light mode:
//   - turns greys and whites into ink, and near-black into paper (lightness flipped, alpha kept), so a white grid line
//     becomes an ink grid line and the dark stage becomes white;
//   - darkens saturated colours, keeping their hue, until they read on white (contrast at least 3:1), so a neon green
//     curve stays green but no longer vanishes.
// In dark mode adapt() returns its input unchanged. Wired in through kit/labs/lab.js: canvas() wraps the 2D context,
// shell() watches the lab's SVG and inline styles, and kit/labs/three.js picks a light background. Pure functions
// (adaptColour, parse) are tested in Node: tests/lab-theme.test.mjs.

const NAMED = { white: [255, 255, 255], black: [0, 0, 0], transparent: [0, 0, 0, 0] };
/** "#rgb", "#rrggbb", "#rrggbbaa", "rgb(...)", "rgba(...)" or a few names → [r, g, b, a], else null (left alone). */
export function parse(c) {
  const s = String(c).trim().toLowerCase();
  if (NAMED[s]) { const [r, g, b, a = 1] = NAMED[s]; return [r, g, b, a]; }
  let m = s.match(/^#([0-9a-f]{3,8})$/);
  if (m) {
    let h = m[1];
    if (h.length === 3 || h.length === 4) h = [...h].map((x) => x + x).join("");
    if (h.length !== 6 && h.length !== 8) return null;
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16), h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1];
  }
  m = s.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?\s*\)$/);
  if (m) { const a = m[4] == null ? 1 : m[4].endsWith("%") ? parseFloat(m[4]) / 100 : parseFloat(m[4]); return [+m[1], +m[2], +m[3], a]; }
  return null;
}
const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
export const contrastOnWhite = (rgb) => 1.05 / (lum(rgb) + 0.05);
function toHsl([r, g, b]) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2, d = max - min;
  if (!d) return [0, 0, l];
  const s = d / (1 - Math.abs(2 * l - 1));
  const h = max === r ? ((g - b) / d + (g < b ? 6 : 0)) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h * 60, s, l];
}
function fromHsl([h, s, l]) {
  const c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = l - c / 2;
  const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return [r, g, b].map((v) => Math.round((v + m) * 255));
}
const out = ([r, g, b], a) => (a >= 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${+a.toFixed(3)})`);
const INK = [22, 22, 40], PAPER = [255, 255, 255];

/** The light-mode version of one colour (any input adapt() can't read is returned unchanged). */
export function adaptColour(c) {
  const p = parse(c); if (!p) return c;
  const [r, g, b, a] = p;
  if (a === 0) return c;
  const [h, s, l] = toHsl([r, g, b]);
  // greys, whites and near-blacks: flip lightness (white grid → ink grid, black stage → white paper)
  if (s < 0.16 || l > 0.93 || l < 0.08) {
    const nl = 1 - l;
    if (nl < 0.12) return out(INK, a);
    if (nl > 0.86) return out(PAPER, a);
    return out(fromHsl([h, Math.min(s, 0.12), nl * 0.92]), a);
  }
  // very dark saturated colours are stages and fills (a navy cell, a midnight membrane): a pale tint of the same hue,
  // so ink labels drawn on them stay readable
  if (l < 0.22) return out(fromHsl([h, Math.min(s, 0.55), 0.93]), a);
  // saturated colours: keep the hue, darken until they read on white (3:1), and never paler than they were
  let nl = l, rgb = [r, g, b];
  for (let i = 0; i < 40 && contrastOnWhite(rgb) < 3; i++) { nl -= 0.02; rgb = fromHsl([h, Math.min(1, s * 1.05), Math.max(0.12, nl)]); }
  return out(rgb, a);
}

// ---------- the live theme (browser only) ----------
export const isLight = () => typeof document !== "undefined" && document.documentElement.dataset.theme === "light";
const memo = new Map();
/** adaptColour in light mode, the input unchanged in dark mode (memoised: labs set the same colours every frame). */
export function adapt(c) {
  if (typeof c !== "string" || !isLight()) return c;
  let v = memo.get(c); if (v === undefined) { v = adaptColour(c); if (memo.size > 5000) memo.clear(); memo.set(c, v); }
  return v;
}
// colours inside a style or attribute string ("fill:#fff;stroke:rgba(255,255,255,.3)")
const IN_TEXT = /#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)/g;
export const adaptText = (t) => (isLight() && t ? String(t).replace(IN_TEXT, (m) => adapt(m)) : t);

/** A 2D context whose colours follow the theme: fillStyle, strokeStyle, shadowColor and gradient stops. */
export function themedContext(g) {
  if (!g || g.__themed) return g;
  const proto = Object.getPrototypeOf(g);
  for (const prop of ["fillStyle", "strokeStyle", "shadowColor"]) {
    const d = Object.getOwnPropertyDescriptor(proto, prop); if (!d) continue;
    Object.defineProperty(g, prop, { configurable: true, get() { return d.get.call(this); }, set(v) { d.set.call(this, typeof v === "string" ? adapt(v) : v); } });
  }
  for (const make of ["createLinearGradient", "createRadialGradient", "createConicGradient"]) {
    const f = g[make]; if (typeof f !== "function") continue;
    g[make] = function (...args) { const gr = f.apply(this, args), add = gr.addColorStop; gr.addColorStop = (o, col) => add.call(gr, o, adapt(col)); return gr; };
  }
  Object.defineProperty(g, "__themed", { value: true });
  return g;
}

const ATTRS = ["fill", "stroke", "stop-color", "color", "flood-color", "lighting-color"];
const written = new WeakMap();   // element → { attr: value we wrote }, so an adapted value is never adapted twice
function fixEl(el) {
  if (el.nodeType !== 1) return;
  const mine = written.get(el) || {};
  for (const at of [...ATTRS, "style"]) {
    if (!el.hasAttribute(at)) continue;
    const v = el.getAttribute(at); if (mine[at] === v) continue;
    const nv = adaptText(v); mine[at] = nv;
    if (nv !== v) el.setAttribute(at, nv);
  }
  written.set(el, mine);
}
/** Adapt a lab's inline colours (SVG attributes and style="…") now and as it redraws. Returns a stop function. */
export function themeTree(root) {
  if (!root || typeof MutationObserver === "undefined") return () => {};
  const all = (n) => { if (!isLight()) return; fixEl(n); n.querySelectorAll?.("*").forEach(fixEl); };
  all(root);
  const mo = new MutationObserver((list) => {
    if (!isLight()) return;
    for (const m of list) {
      if (m.type === "attributes") fixEl(m.target);
      else m.addedNodes.forEach((n) => all(n));
    }
  });
  mo.observe(root, { subtree: true, childList: true, attributes: true, attributeFilter: [...ATTRS, "style"] });
  return () => mo.disconnect();
}
