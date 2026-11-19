// Render quality for every three.js view on Gradify (the 3D models in kit/models/viewer.js and the lab
// stage in kit/labs/three.js): which tier a device gets, how many pixels to draw, and a governor that
// trades resolution for frame rate.
// "high" (a desktop-class device on a fast connection) renders at the screen's own resolution up to a
// 4K pixel budget, with ambient occlusion and 4096px shadows; "standard" keeps the old 2x cap. Either way
// the resolution then follows the frame rate, so a slow GPU drops pixels instead of frames.
// ?quality=high|standard forces a tier.
export function qualityTier() {
  try { const q = new URLSearchParams(location.search).get("quality"); if (q === "high" || q === "standard") return q; } catch { /* no location */ }
  const c = navigator.connection, small = Math.min(screen.width, screen.height) < 700 && navigator.maxTouchPoints > 0;
  if (small || c?.saveData || (navigator.deviceMemory && navigator.deviceMemory < 4) || (navigator.hardwareConcurrency || 8) < 4) return "standard";
  return "high";
}
const PIXELS_4K = 3840 * 2160;
// the most device pixels per CSS pixel worth drawing for a canvas this size
export const maxPixelRatio = (tier, w, h) => tier === "high" ? Math.max(1, Math.min(devicePixelRatio || 1, 3, Math.sqrt(PIXELS_4K / Math.max(1, w * h)))) : Math.min(2, devicePixelRatio || 1);
// steps the pixel ratio down when frames run long and back up when there's room
export function adaptiveResolution(onChange) {
  let ceiling = 1, pr = 1, acc = 0, n = 0, cool = 0;
  return {
    set ceiling(v) { ceiling = v; if (pr > v || !n) { pr = v; onChange(pr); } },
    get ratio() { return pr; },
    frame(ms) {
      if (cool > 0) { cool--; return; }
      acc += ms; n++; if (n < 45) return;
      const avg = acc / n; acc = 0; n = 0;
      const next = avg > 40 ? Math.max(1, pr * 0.7) : avg > 24 ? Math.max(1, pr - 0.25) : avg < 13 ? Math.min(ceiling, pr + 0.25) : pr;
      if (next !== pr) { pr = next; cool = 30; onChange(pr); }
    },
  };
}
