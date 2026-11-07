// Ray optics: refraction at a surface (Snell's law, total internal reflection) and thin lenses and mirrors
// (1/f = 1/u + 1/v). Geometrical optics: light as rays, thin lenses, paraxial principal rays for image finding.
import { shell, canvas, slider, seg, line, clear, text, circle, arrow, challenges, panel, C } from "../lab.js";

// Snell's law: the refraction angle in degrees, or null for total internal reflection
export function refract(deg, n1, n2) { const s = (n1 / n2) * Math.sin((deg * Math.PI) / 180); return Math.abs(s) > 1 ? null : (Math.asin(s) * 180) / Math.PI; }
export const critical = (n1, n2) => (n1 > n2 ? (Math.asin(n2 / n1) * 180) / Math.PI : null);
// thin lens (real-is-positive): object distance u > 0, focal length f; returns image distance v and magnification
export function image(u, f) { if (Math.abs(u - f) < 1e-9) return { v: Infinity, m: Infinity }; const v = 1 / (1 / f - 1 / u); return { v, m: -v / u }; }
export const MATERIALS = { air: ["Air", 1.0003], water: ["Water", 1.333], glass: ["Crown glass", 1.52], diamond: ["Diamond", 2.42] };

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.6, max: 400 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  let mode = ["lens", "mirror"].includes(ctx.mode) ? ctx.mode : "snell";
  const P = { deg: 30, n1: "air", n2: "glass", u: 30, f: 10, diverging: false };
  const st = { tir: false, real: false, virtual: false, mag: false };
  const ch = challenges(ctrl, ctx, [
    { id: "tir", text: "Light leaving glass: find the critical angle and get total internal reflection", test: (s) => s.tir },
    { id: "real", text: "Converging lens: make a real, inverted image the same size as the object", test: (s) => s.real },
    { id: "virt", text: "Move the object inside the focal length to make a magnifying glass (virtual, upright)", test: (s) => s.virtual },
    { id: "mag", text: "Diverging lens: show the image is always virtual, upright and smaller", test: (s) => s.mag },
  ]);
  seg($(".top"), [["snell", "Refraction"], ["lens", "Thin lens"], ["mirror", "Curved mirror"]], mode, (v) => { mode = v; controls(); });
  const sl = document.createElement("div"); sl.className = "lab-ctrl"; ctrl.prepend(sl);
  function controls() {
    sl.innerHTML = "";
    if (mode === "snell") {
      slider(sl, { label: "Angle of incidence", min: 0, max: 89, step: 0.5, value: P.deg, unit: "°", fmt: (v) => v.toFixed(1), onInput: (v) => { P.deg = v; draw(); } });
      for (const [key, label] of [["n1", "Light comes from"], ["n2", "Into"]]) {
        const w = document.createElement("label"); w.className = "lab-sel"; w.innerHTML = `<span>${label}</span><select>${Object.entries(MATERIALS).map(([k, [n, i]]) => `<option value="${k}" ${P[key] === k ? "selected" : ""}>${n} (n = ${i})</option>`).join("")}</select>`; sl.append(w);
        w.querySelector("select").addEventListener("change", (e) => { P[key] = e.target.value; draw(); });
      }
    } else {
      slider(sl, { label: "Object distance", min: 2, max: 60, step: 0.5, value: P.u, unit: "cm", fmt: (v) => v.toFixed(1), onInput: (v) => { P.u = v; draw(); } });
      slider(sl, { label: "Focal length", min: 4, max: 25, step: 0.5, value: P.f, unit: "cm", fmt: (v) => v.toFixed(1), onInput: (v) => { P.f = v; draw(); } });
      const t = document.createElement("label"); t.className = "lab-tog"; t.innerHTML = `<input type="checkbox" ${P.diverging ? "checked" : ""}><span>${mode === "lens" ? "Diverging (concave) lens" : "Convex (diverging) mirror"}</span>`; sl.append(t);
      t.querySelector("input").addEventListener("change", (e) => { P.diverging = e.target.checked; draw(); });
    }
    draw();
  }
  function draw() {
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    if (mode === "snell") return drawSnell(g, W, H);
    const f = P.diverging ? -P.f : P.f, { v, m } = image(P.u, f), cx = mode === "lens" ? W * 0.5 : W * 0.72, cy = H * 0.55, sc = (W * 0.42) / 60;
    line(g, [[0, cy], [W, cy]], "rgba(255,255,255,.25)", 1);
    // the lens or mirror
    if (mode === "lens") { g.strokeStyle = "rgba(140,200,255,.9)"; g.lineWidth = 3; g.beginPath(); g.moveTo(cx, cy - H * 0.38); g.lineTo(cx, cy + H * 0.38); g.stroke(); for (const s of [-1, 1]) { const y = cy + s * H * 0.38; if (P.diverging) { line(g, [[cx - 7, y + s * -8], [cx, y], [cx + 7, y + s * -8]], "rgba(140,200,255,.9)", 2); } else { line(g, [[cx - 7, y - s * 8], [cx, y], [cx + 7, y - s * 8]], "rgba(140,200,255,.9)", 2); } } }
    else { g.strokeStyle = "rgba(200,210,230,.9)"; g.lineWidth = 3; g.beginPath(); const R = 2 * P.f * sc, dir = P.diverging ? -1 : 1; g.arc(cx - dir * R, cy, R, -Math.asin(Math.min(1, (H * 0.38) / R)), Math.asin(Math.min(1, (H * 0.38) / R))); if (P.diverging) { g.beginPath(); g.arc(cx + R, cy, R, Math.PI - Math.asin(Math.min(1, (H * 0.38) / R)), Math.PI + Math.asin(Math.min(1, (H * 0.38) / R))); } g.stroke(); }
    // focal points
    for (const s of mode === "lens" ? [-1, 1] : [-1]) { const fx = cx + s * P.f * sc; circle(g, fx, cy, 3.5, C.gold); text(g, "F", fx, cy + 16, { align: "center", size: 11, color: C.gold }); }
    // object (an arrow) and its image; mirror images form on the same side, so v is measured to the left
    const ho = 6, ox = cx - P.u * sc, oy = cy - ho * sc; arrow(g, ox, cy, ox, oy, C.teal, 3, 10); text(g, "object", ox, cy + 16, { align: "center", size: 11, color: C.teal });
    const side = mode === "lens" ? 1 : -1, ix = cx + side * v * sc, iy = cy - m * ho * sc, virtual = v < 0;
    // principal rays
    const ray = (pts, col, dash) => line(g, pts, col, 1.4, dash);
    const top = [ox, oy];
    if (Number.isFinite(v)) {
      if (mode === "lens") {
        // parallel to the axis, then through (or as if from) the far focal point
        ray([top, [cx, oy]], C.orange); const fx = cx + f * sc; const slope = (cy - oy) / (fx - cx); ray([[cx, oy], [W, oy + slope * (W - cx)]], C.orange); if (virtual || f < 0) ray([[cx, oy], [ix, iy]], C.orange, [4, 4]);
        // through the centre, undeviated
        ray([top, [W, oy + ((cy - oy) / (cx - ox)) * (W - ox)]], C.violet);
        if (virtual) ray([top, [ix, iy]], C.violet, [4, 4]);
      } else {
        ray([top, [cx, oy]], C.orange); ray([[cx, oy], [ix, iy]], C.orange, virtual ? [4, 4] : null); if (!virtual) ray([[ix, iy], [ix - (cx - ix) * 0.3, iy - (oy - iy) * 0.3]], C.orange);
        ray([top, [cx, cy]], C.violet); ray([[cx, cy], [ix, iy]], C.violet, virtual ? [4, 4] : null);
      }
      if (Math.abs(ix) < W * 2 && Math.abs(iy) < H * 3) { g.globalAlpha = virtual ? 0.55 : 1; arrow(g, ix, cy, ix, iy, C.pink, 3, 10); g.globalAlpha = 1; text(g, virtual ? "virtual image" : "real image", ix, cy + (m > 0 ? 16 : -6) + (m > 0 ? 0 : 0), { align: "center", size: 11, color: C.pink }); }
    } else text(g, "Object at the focal point: the rays leave parallel and no image forms", W / 2, 22, { align: "center", size: 12, color: C.gold });
    // challenges
    if (mode === "lens" && !P.diverging && v > 0 && Math.abs(m + 1) < 0.03) st.real = true;
    if ((mode === "lens" || mode === "mirror") && !P.diverging && P.u < P.f && m > 1) st.virtual = true;
    if (mode === "lens" && P.diverging) st.mag = true;
    ch.check(st);
    const kind = !Number.isFinite(v) ? "none (at infinity)" : `${virtual ? "virtual" : "real"}, ${m > 0 ? "upright" : "inverted"}, ${Math.abs(m) > 1 ? "magnified" : Math.abs(m) < 1 ? "diminished" : "same size"}`;
    out(`<div class="lab-read"><div><small>Image distance v</small><b>${Number.isFinite(v) ? `${v.toFixed(1)} cm` : "∞"}</b></div><div><small>Magnification m = −v/u</small><b>${Number.isFinite(m) ? m.toFixed(2) : "∞"}</b></div><div><small>Image</small><b>${kind}</b></div><div><small>Power 1/f</small><b>${(100 / f).toFixed(1)} D</b></div></div>
      <p class="lab-msg">Every ray from the tip of the object that passes through the ${mode} meets the others at the tip of the image. Two are easy to draw: one parallel to the axis bends through the focal point, one through the centre goes straight on. When the rays really meet the image is real and can be projected on a screen; when they only appear to come from a point (dashed), it is virtual. The lens equation 1/f = 1/u + 1/v gives the same answer as the drawing.</p>`);
  }
  function drawSnell(g, W, H) {
    const [n1n, n1] = MATERIALS[P.n1], [n2n, n2] = MATERIALS[P.n2], cx = W / 2, cy = H / 2, R = Math.min(W, H) * 0.45;
    g.fillStyle = `rgba(90,160,255,${0.06 + (n1 - 1) * 0.12})`; g.fillRect(0, 0, W, cy); g.fillStyle = `rgba(90,160,255,${0.06 + (n2 - 1) * 0.12})`; g.fillRect(0, cy, W, H - cy);
    text(g, `${n1n} (n = ${n1})`, 12, 22, { size: 12, color: C.mute }); text(g, `${n2n} (n = ${n2})`, 12, H - 12, { size: 12, color: C.mute });
    line(g, [[cx, 10], [cx, H - 10]], "rgba(255,255,255,.3)", 1, [4, 4]);
    const a = (P.deg * Math.PI) / 180, sx = cx - R * Math.sin(a), sy = cy - R * Math.cos(a);
    line(g, [[sx, sy], [cx, cy]], C.gold, 3);
    const r = refract(P.deg, n1, n2), refl = r == null ? 1 : fresnel(P.deg, r, n1, n2);
    g.globalAlpha = Math.max(0.15, refl); line(g, [[cx, cy], [cx + R * Math.sin(a), cy - R * Math.cos(a)]], C.gold, 3); g.globalAlpha = 1;
    if (r != null) { const b = (r * Math.PI) / 180; g.globalAlpha = Math.max(0.15, 1 - refl); line(g, [[cx, cy], [cx + R * Math.sin(b), cy + R * Math.cos(b)]], C.gold, 3); g.globalAlpha = 1; }
    text(g, `${P.deg.toFixed(1)}°`, cx - 34, cy - 46, { size: 12, color: C.gold });
    if (r != null) text(g, `${r.toFixed(1)}°`, cx + 12, cy + 56, { size: 12, color: C.gold });
    const crit = critical(n1, n2);
    if (r == null) st.tir = true;
    ch.check(st);
    out(`<div class="lab-read"><div><small>Refraction angle</small><b>${r == null ? "none: totally reflected" : `${r.toFixed(1)}°`}</b></div><div><small>Critical angle</small><b>${crit ? `${crit.toFixed(1)}°` : "none (into a denser medium)"}</b></div><div><small>Reflected fraction</small><b>${(refl * 100).toFixed(1)}%</b></div><div><small>Speed of light here</small><b>${(299792 / n1).toFixed(0)} → ${(299792 / n2).toFixed(0)} km/s</b></div></div>
      <p class="lab-msg">Light slows down in denser materials (by the refractive index n), so it bends at the boundary: n₁ sin θ₁ = n₂ sin θ₂. Going into a denser medium it bends towards the normal; coming out, away from it. Beyond the critical angle no refracted ray is possible and all the light reflects, which is how optical fibres carry light round corners. The brightness of each ray shows how the light divides (Fresnel equations, unpolarised light).</p>`);
  }
  controls();
}
// fraction reflected for unpolarised light (Fresnel)
function fresnel(i, r, n1, n2) {
  const a = (i * Math.PI) / 180, b = (r * Math.PI) / 180, ci = Math.cos(a), ct = Math.cos(b);
  const rs = ((n1 * ci - n2 * ct) / (n1 * ci + n2 * ct)) ** 2, rp = ((n1 * ct - n2 * ci) / (n1 * ct + n2 * ci)) ** 2;
  return (rs + rp) / 2;
}
