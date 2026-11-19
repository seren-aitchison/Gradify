#!/usr/bin/env node
// Light mode: turn the hard-coded dark-theme colours in Gradify's stylesheets into theme tokens, so one set of
// rules draws both themes (tokens in kit/styles/base.css, switched by html[data-theme], set by kit/core/theme-boot.js).
//
//   rgba(255,255,255,a)            white ink on dark  → rgba(var(--ink-rgb), a)       (dark ink on light)
//   rgba(n,n,n,a), n ≤ 40          dark glass         → rgba(var(--surface-rgb), a)   (white glass on light)
//   rgba(0,0,0,a) (not shadows)    darkening          → rgba(var(--sink-rgb), a)
//   color: #fff                    text               → var(--fg), except on coloured backgrounds
//   background: #fff + color: #000 a white button     → var(--invert-bg) / var(--invert-fg)
//   background: #000 / dark hex    page and panels    → light-dark(light, original)
//   color: pastel                  tag text on dark   → light-dark(darker shade, original)
// Shadows, the 3D glass icons and anything already using tokens are left alone. Idempotent: run it again after
// adding CSS and only new hard-coded colours change. Usage: node scripts/theme-tokens.mjs [--check]
import { readFileSync, writeFileSync } from "node:fs";

export const FILES = ["kit/styles/base.css", "kit/styles/body.css", "kit/styles/components.css", "kit/styles/course.css", "kit/styles/game.css", "kit/styles/labs.css",
  "kit/styles/maths-labs.css", "kit/styles/model.css", "kit/styles/social-labs.css", "kit/styles/subsite.css", "kit/styles/ui.css", "kit/app/app.css", "assets/styles.css"];
// the glass diagrams (.gd) and the Plus banner (.lim-) are drawn on their own coloured glass, like the icons
const SKIP_SEL = /g3d|\.gd\b|\.gd-|\.lim-|aurora|theme-tokens-skip|:root|\[data-theme/;
// things that stay dark in light mode too (a 3D stage, a map at night, a lab canvas, the app pictured on the homepage):
// their colours are left alone and base.css gives them the dark tokens ("dark islands")
export const ISLANDS = [".earth-map", ".tree-wrap", ".isle3d", ".isle-tag", ".forest", ".fs-key", ".mv-stage", ".mv-studio", ".sm-3d-art", ".lab-3d", ".lab-cv", ".lab-svg", ".co-lab", ".tablet", ".shot-frame", ".vc-", ".holo", ".sphere", ".spotlight", ".bi-stage", ".mv-labels", ".mv-tip", ".mv-controls", ".mv-info", ".gj-ring"];
const islandSel = (sel) => ISLANDS.some((x) => sel.includes(x));
const SHADOW = /^(box-shadow|text-shadow|filter|-webkit-filter|backdrop-filter|-webkit-backdrop-filter|mask|-webkit-mask)/;

const hex = (h) => { h = h.replace("#", ""); if (h.length === 3) h = [...h].map((c) => c + c).join(""); return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)); };
const toHex = (rgb) => `#${rgb.map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("")}`;
function hsl([r, g, b]) {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
  const s = d ? d / (1 - Math.abs(2 * l - 1)) : 0;
  const h = !d ? 0 : mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [(h * 60 + 360) % 360, s, l];
}
function fromHsl([h, s, l]) {
  const c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = l - c / 2;
  const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
}
const neutral = (rgb) => Math.max(...rgb) - Math.min(...rgb) <= 10;
const saturatedHex = (v) => [...v.replace(/light-dark\([^()]*(\([^()]*\)[^()]*)*\)/g, "").matchAll(/#([0-9a-f]{6}|[0-9a-f]{3})\b/gi)].some((m) => !neutral(hex(m[0])) && Math.max(...hex(m[0])) >= 90);
// a translucent wash (alpha under .6) over a dark base isn't a coloured background: in light mode the base is light
const saturatedRgba = (v) => [...v.matchAll(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?/g)].some((m) => !neutral([+m[1], +m[2], +m[3]]) && (m[4] === undefined || +m[4] >= 0.6));
// a rule whose background is a colour (a gradient pill, a brand tile): white text stays white there
const accentRule = (body) => body.split(";").some((d) => /^\s*background(-color|-image)?\s*:/i.test(d) && (saturatedHex(d) || saturatedRgba(d) || /var\(--(spectrum|c|a|b|accent|tile|brand|site|hue)\b/.test(d)));
// a pastel text colour, readable on black but not on white: a darker shade of the same hue for light mode
function darker(h) { const [hh, s, l] = hsl(hex(h)); return toHex(fromHsl([hh, Math.min(1, s + 0.1), Math.min(l, 0.36)])); }
// a dark colour's light-mode partner: the same hue, nearly white
function tint(rgb) { const [h, s0, l] = hsl(rgb); return toHex(neutral(rgb) ? [255, 255, 255] : fromHsl([h, Math.min(s0, 0.7), 0.96])); }
const pastel = (h) => { const [, s, l] = hsl(hex(h)); return l > 0.6 && s > 0.25; };
const darkNeutralHex = (h) => { const rgb = hex(h); return neutral(rgb) && Math.max(...rgb) <= 42; };

export function tokenise(css) {
  let changed = 0;
  const out = css.replace(/([^{}]*)\{([^{}]*)\}/g, (all, sel, body) => {
    if (SKIP_SEL.test(sel) || islandSel(sel) || /^\s*@(font-face|keyframes)/.test(sel)) return all;
    const accent = accentRule(body);
    const whiteBg = /(^|;)\s*background(-color)?\s*:\s*(#fff\b|#ffffff\b|white\b|var\(--invert-bg\))/i.test(body);
    const decls = body.split(";").map((d) => {
      const m = d.match(/^(\s*)([-a-z]+)(\s*:\s*)([\s\S]*)$/i);
      if (!m) return d;
      let [, sp, prop, colon, v] = m;
      const before = v;
      if (SHADOW.test(prop) || /--[a-z]/i.test(prop) || /light-dark\(/.test(v)) return d;
      const paired = new RegExp(`(^|;)\\s*${prop}\\s*:[^;]*light-dark\\(`, "i").test(body);   // already has its light pair
      v = v.replace(/rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*([\d.]+)\s*\)/g, "rgba(var(--ink-rgb), $1)");
      v = v.replace(/rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*([\d.]+)\s*\)/g, "rgba(var(--sink-rgb), $1)");
      v = v.replace(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/g, (x, r, g, b, a) => (neutral([+r, +g, +b]) && Math.max(+r, +g, +b) <= 40 ? `rgba(var(--surface-rgb), ${a})` : x));
      // dark stops inside gradients and colour mixes: a light tint of the same hue in light mode
      if (/^background(-image)?$/i.test(prop) && /gradient\(|color-mix\(/.test(v) && !paired && !/light-dark/.test(v)) {
        const lit = v.replace(/#[0-9a-f]{6}\b|#[0-9a-f]{3}\b/gi, (h) => (Math.max(...hex(h)) <= 70 ? `light-dark(${tint(hex(h))}, ${h})` : h))
          .replace(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/g, (x, r, g, b, a) => (Math.max(+r, +g, +b) <= 70 ? `light-dark(rgba(${hex(tint([+r, +g, +b])).join(", ")}, ${a}), ${x})` : x));
        if (lit !== v) return `${sp}${prop}${colon}${v};${sp}${prop}${colon}${lit}`;
      }
      if (/^background(-color)?$/i.test(prop)) {
        if (/^\s*(#fff|#ffffff|white)\s*(!important)?\s*$/i.test(v)) v = v.replace(/#fff(fff)?|white/i, "var(--invert-bg)");
        else if (/^\s*#0{3}(0{3})?\s*(!important)?\s*$/.test(v)) v = v.replace(/#0{3}(0{3})?/, "var(--bg)");
        else { const h = v.match(/^\s*(#[0-9a-f]{3}(?:[0-9a-f]{3})?)\s*(!important)?\s*$/i); if (h && darkNeutralHex(h[1]) && !paired) return `${sp}${prop}${colon}${v};${sp}${prop}${colon}light-dark(#ffffff, ${h[1]})${h[2] ? " !important" : ""}`; }
      }
      if (/^(color|fill|stroke|outline-color|caret-color|border-color|outline|border|border-(top|bottom|left|right))$/i.test(prop)) {
        if (whiteBg && prop === "color" && /^\s*(#000|#000000|#0[0-9a-f]{2}|#0[0-9a-f]{5}|#1[0-9a-f]{5}|black)\s*(!important)?\s*$/i.test(v)) v = v.replace(/#[0-9a-f]{3,6}|black/i, "var(--invert-fg)");
        else if (whiteBg && /^border/i.test(prop)) v = v.replace(/#fff(fff)?\b|\bwhite\b/gi, "var(--invert-bg)");
        else if (!accent && !whiteBg) v = v.replace(/#fff(fff)?\b|\bwhite\b/gi, "var(--fg)");
        if (prop === "color" && !accent) { const h = v.match(/^\s*(#[0-9a-f]{6}|#[0-9a-f]{3})\s*(!important)?\s*$/i); if (h && pastel(h[1]) && !paired) return `${sp}${prop}${colon}${v};${sp}${prop}${colon}light-dark(${darker(h[1])}, ${h[1]})${h[2] ? " !important" : ""}`; }
      }
      if (v !== before) changed++;
      return `${sp}${prop}${colon}${v}`;
    });
    const seen = new Set(), kept = decls.filter((d) => { const k = d.trim(); if (!k || !/:/.test(k)) return true; if (seen.has(k)) { changed++; return false; } seen.add(k); return true; });
    return `${sel}{${kept.join(";")}}`;
  });
  return { css: out, changed };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const check = process.argv.includes("--check");
  let total = 0;
  for (const f of FILES) {
    const src = readFileSync(f, "utf8"), { css, changed } = tokenise(src);
    total += changed;
    if (changed) console.log(`${check ? "would change" : "changed"} ${changed} declarations in ${f}`);
    if (!check && css !== src) writeFileSync(f, css);
  }
  if (check && total) { console.error(`${total} hard-coded dark-theme colours: run node scripts/theme-tokens.mjs`); process.exit(1); }
}
