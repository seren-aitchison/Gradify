import { lum, mix } from "./colour.js";

// A site's accent colour for text on the dark background: its brand colour, lightened (towards white, keeping its
// hue) only as far as it takes to reach 5.5:1 on the dark top bar: WCAG AA's 4.5:1 with room for the coloured light
// behind the glass.
const ON_BAR = lum("16161a");
export const accentOf = (s) => {
  for (let t = 0; t < 0.9; t += 0.04) { const c = t ? mix(s.c, t) : `#${s.c}`; if ((lum(c.slice(1)) + 0.05) / (ON_BAR + 0.05) >= 5.5) return c; }
  return mix(s.c, 0.9);
};
// the same for the light top bar: darkened (towards black, keeping its hue) until it reaches 5.5:1 on near-white
const ON_LIGHT = lum("f4f4f8");
const shade = (h, t) => "#" + [0, 2, 4].map((i) => Math.round(parseInt(h.slice(i, i + 2), 16) * (1 - t)).toString(16).padStart(2, "0")).join("");
export const accentOnLight = (s) => {
  for (let t = 0; t < 0.9; t += 0.04) { const c = t ? shade(s.c, t) : `#${s.c}`; if ((ON_LIGHT + 0.05) / (lum(c.slice(1)) + 0.05) >= 5.5) return c; }
  return shade(s.c, 0.9);
};
