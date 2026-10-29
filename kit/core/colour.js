// Colour helpers shared by the page scripts. Colours are hex strings without "#".

export const rgb = (h) => [0, 2, 4].map((i) => parseInt(h.substr(i, 2), 16));
// "r, g, b" string for use inside rgba()
export const triple = (h) => rgb(h).join(", ");
// Mix towards white by t (0–1); returns "#rrggbb"
export const mix = (h, t) => "#" + rgb(h).map((v) => Math.round(v + (255 - v) * t).toString(16).padStart(2, "0")).join("");
export const lum = (h) => {
  const [r, g, b] = rgb(h).map((v) => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; });
  return .2126 * r + .7152 * g + .0722 * b;
};
// Dark or white text, whichever reads better on this colour
export const ink = (h) => (lum(h) > .45 ? "#14151b" : "#fff");
// Glossy icon-tile gradient
export const tile = (h) => `linear-gradient(135deg, ${mix(h, .28)} 0%, #${h} 70%)`;
// Mix towards black by t (0–1); returns "#rrggbb"
export const shade = (h, t) => "#" + rgb(h).map((v) => Math.round(v * (1 - t)).toString(16).padStart(2, "0")).join("");
