// Gradify Video: a study pack as a narrated 3D animation, set up like a Blender scene.
// A viewport (perspective grid floor, keyframed camera, shaded objects with the notes written
// on them, a navigation gizmo), a dope-sheet timeline with keyframes you can scrub, and a
// properties panel to configure it: animation style, interpolation, lens, speed, voice and
// captions. "Render" records the viewport to a .webm file.
//
// mountVideo(root, { slides, say, cancelSpeech, esc, toast }) → { stop(), destroy() }
// slides: [{ h, sub?, big?, pts?, say, sym, c }]  (c: hex colour without "#")

const FPS = 24;
const reduce = globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export const STYLES = [
  { id: "orbit", name: "Orbit", d: "The camera circles the scene" },
  { id: "dolly", name: "Dolly in", d: "Pushes in towards the subject" },
  { id: "turntable", name: "Turntable", d: "The scene spins, the camera holds" },
  { id: "fly", name: "Fly-through", d: "Glides past each card" },
  { id: "explode", name: "Exploded view", d: "Cards burst out of a stack" },
];
const INTERP = {
  bezier: { name: "Bézier", f: (u) => (u < 0.5 ? 4 * u * u * u : 1 - (-2 * u + 2) ** 3 / 2) },
  linear: { name: "Linear", f: (u) => u },
  constant: { name: "Constant", f: (u) => (u < 1 ? 0 : 1) },
  back: { name: "Back", f: (u) => { const c = 1.70158, c3 = c + 1; return 1 + c3 * (u - 1) ** 3 + c * (u - 1) ** 2; } },
  elastic: { name: "Elastic", f: (u) => (u <= 0 ? 0 : u >= 1 ? 1 : 2 ** (-10 * u) * Math.sin((u * 10 - 0.75) * (2 * Math.PI / 3)) + 1) },
};
const LENS = { 24: 74, 35: 54, 50: 40, 85: 24 };   // focal length (mm) → vertical field of view (degrees)
const BACKGROUNDS = {
  night: { name: "Night", top: "#0b1220", bottom: "#05070c", grid: "120,190,255", floor: 0.16 },
  blender: { name: "Studio grey", top: "#3d3d3d", bottom: "#2a2a2a", grid: "255,255,255", floor: 0.1 },
  holo: { name: "Holo", top: "#062530", bottom: "#020b10", grid: "94,240,255", floor: 0.22 },
};

// ---------- tiny 3D maths ----------
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const mul = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = (a) => { const l = Math.hypot(...a) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };
const lerp = (a, b, u) => a + (b - a) * u;
const lerp3 = (a, b, u) => [lerp(a[0], b[0], u), lerp(a[1], b[1], u), lerp(a[2], b[2], u)];
const rotY = (p, a) => { const c = Math.cos(a), s = Math.sin(a); return [p[0] * c + p[2] * s, p[1], -p[0] * s + p[2] * c]; };
const rotX = (p, a) => { const c = Math.cos(a), s = Math.sin(a); return [p[0], p[1] * c - p[2] * s, p[1] * s + p[2] * c]; };
const clamp01 = (u) => Math.max(0, Math.min(1, u));
const hex = (h) => { const n = parseInt(h, 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const LIGHT = norm([0.5, 0.9, 0.6]);

// an icosahedron for the hero object of each slide
const ICO = (() => {
  const t = (1 + Math.sqrt(5)) / 2;
  const v = [[-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0], [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t], [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]].map(norm);
  const f = [[0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11], [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8], [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9], [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]];
  return { v, f };
})();
// a box: 8 corners, 6 faces (front face first, so the text goes on face 0)
function boxOf(w, h, d) {
  const x = w / 2, y = h / 2, z = d / 2;
  const v = [[-x, -y, z], [x, -y, z], [x, y, z], [-x, y, z], [-x, -y, -z], [x, -y, -z], [x, y, -z], [-x, y, -z]];
  const f = [[0, 1, 2, 3], [5, 4, 7, 6], [4, 0, 3, 7], [1, 5, 6, 2], [3, 2, 6, 7], [4, 5, 1, 0]];
  return { v, f };
}

// ---------- the timeline: one shot per slide ----------
function buildTimeline(slides, speed) {
  let t = 0;
  return slides.map((s, i) => {
    const words = s.say.split(/\s+/).length;
    const dur = Math.max(4.5, words * 0.42 + 1.6) / speed;
    const shot = { i, start: t, dur, end: t + dur };
    t += dur;
    return shot;
  });
}

export function mountVideo(root, { slides, say, cancelSpeech, esc, toast }) {
  const cfg = { style: reduce ? "dolly" : "orbit", interp: "bezier", lens: 35, speed: 1, voice: true, captions: true, bg: "night" };
  root.innerHTML = `
    <div class="vc">
      <div class="vc-stage">
        <div class="vc-viewport">
          <canvas class="vc-canvas" aria-label="3D animation of your notes"></canvas>
          <div class="vc-hud"><span class="vc-mode">Camera Perspective</span><span class="vc-scene"></span></div>
          <button type="button" class="vc-bigplay" aria-label="Play">▶</button>
        </div>
        <div class="vc-timeline">
          <div class="vc-transport">
            <button type="button" data-t="start" aria-label="Jump to start" title="Jump to start">⏮</button>
            <button type="button" data-t="prev" aria-label="Previous keyframe" title="Previous keyframe">◆◂</button>
            <button type="button" data-t="play" class="vc-play" aria-label="Play">▶</button>
            <button type="button" data-t="next" aria-label="Next keyframe" title="Next keyframe">▸◆</button>
            <button type="button" data-t="end" aria-label="Jump to end" title="Jump to end">⏭</button>
            <span class="vc-frame">Frame <b>0</b> / 0</span>
            <span class="vc-time">0:00</span>
          </div>
          <canvas class="vc-dope" aria-label="Dope sheet: drag to scrub"></canvas>
        </div>
      </div>
      <aside class="vc-props" aria-label="Video settings">
        <h5>Animation</h5>
        <div class="vc-styles" role="radiogroup" aria-label="Animation style">${STYLES.map((s) => `<button type="button" role="radio" data-style="${s.id}" aria-checked="${s.id === cfg.style}"><b>${s.name}</b><em>${s.d}</em></button>`).join("")}</div>
        <label class="vc-field"><span>Interpolation</span><select data-k="interp">${Object.entries(INTERP).map(([k, v]) => `<option value="${k}">${v.name}</option>`).join("")}</select></label>
        <label class="vc-field"><span>Lens</span><select data-k="lens">${Object.keys(LENS).map((k) => `<option value="${k}" ${+k === cfg.lens ? "selected" : ""}>${k} mm</option>`).join("")}</select></label>
        <label class="vc-field"><span>Speed</span><select data-k="speed">${[0.75, 1, 1.25, 1.5].map((k) => `<option value="${k}" ${k === 1 ? "selected" : ""}>${k}×</option>`).join("")}</select></label>
        <label class="vc-field"><span>World</span><select data-k="bg">${Object.entries(BACKGROUNDS).map(([k, v]) => `<option value="${k}">${v.name}</option>`).join("")}</select></label>
        <label class="switch"><input type="checkbox" data-k="voice" role="switch" checked><span class="sw-track lg" aria-hidden="true"><span class="sw-knob"></span></span><span>Voiceover</span></label>
        <label class="switch"><input type="checkbox" data-k="captions" role="switch" checked><span class="sw-track lg" aria-hidden="true"><span class="sw-knob"></span></span><span>Captions</span></label>
        <button type="button" class="btn btn-light lg btn-sm vc-render"><span>Render video (.webm)</span></button>
        <p class="vc-note">Renders in real time with captions. Browsers can't record their own voice, so the file is silent.</p>
      </aside>
    </div>`;

  const view = root.querySelector(".vc-canvas"), g = view.getContext("2d");
  const dope = root.querySelector(".vc-dope"), dg = dope.getContext("2d");
  const $ = (s) => root.querySelector(s);
  let shots = buildTimeline(slides, cfg.speed), total = shots.at(-1).end;
  let time = Math.min(1.2, shots[0].dur * 0.4);   // show a frame with things in it before anyone presses play
  let playing = false, raf = 0, last = 0, spoken = -1, speechDone = true, holding = false, recorder = null;
  let W = 0, H = 0, DW = 0, DH = 0, dpr = 1;

  // ---------- layout ----------
  function resize() {
    dpr = Math.min(2, devicePixelRatio || 1);
    const r = view.getBoundingClientRect(), d = dope.getBoundingClientRect();
    W = r.width; H = r.height; DW = d.width; DH = d.height;
    view.width = Math.round(W * dpr); view.height = Math.round(H * dpr);
    dope.width = Math.round(DW * dpr); dope.height = Math.round(DH * dpr);
    draw();
  }

  // ---------- the scene at time t ----------
  const shotAt = (t) => shots.find((s) => t < s.end) || shots.at(-1);
  function camera(shot, u) {
    const e = INTERP[cfg.interp].f, k = e(clamp01(u));
    const target = [0, 0.9, 0];
    switch (cfg.style) {
      case "dolly": { const r = lerp(10, 4.8, k); return { pos: [Math.sin(0.3) * r, lerp(3.4, 1.9, k), Math.cos(0.3) * r], target }; }
      case "turntable": return { pos: [Math.sin(0.35) * 5.8, 2.4, Math.cos(0.35) * 5.8], target, spin: k * 1.4 - 0.7 };
      case "fly": { const x = lerp(-4.2, 4.2, k); return { pos: [x, 1.6, 4.4], target: [x * 0.5, 0.85, 0] }; }
      case "explode": { const a = 0.35 + k * 0.45; return { pos: [Math.sin(a) * 6, 2.6, Math.cos(a) * 6], target }; }
      default: { const a = -0.5 + k * 1 + (shot.i % 2 ? 0.3 : -0.3); return { pos: [Math.sin(a) * 5.6, lerp(2.9, 2, k), Math.cos(a) * 5.6], target }; }
    }
  }
  function project(cam) {
    const f = norm(sub(cam.target, cam.pos)), r = norm(cross(f, [0, 1, 0])), up = cross(r, f);
    const focal = H / (2 * Math.tan((LENS[cfg.lens] * Math.PI) / 360));
    const cx = W / 2, cy = H / 2;
    const toCam = (p) => { const d = sub(p, cam.pos); return [dot(d, r), dot(d, up), dot(d, f)]; };
    const screen = (c) => [cx + (c[0] / c[2]) * focal, cy - (c[1] / c[2]) * focal];
    return { f, r, up, focal, toCam, screen, pos: cam.pos };
  }

  function drawWorld(P, bg) {
    let gr = g.createLinearGradient(0, 0, 0, H);
    gr.addColorStop(0, bg.top); gr.addColorStop(1, bg.bottom);
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    // floor grid, clipped at the camera's near plane, fading with distance
    const line = (a, b, style, width) => {
      let A = P.toCam(a), B = P.toCam(b);
      const near = 0.2;
      if (A[2] < near && B[2] < near) return;
      if (A[2] < near) A = lerp3(A, B, (near - A[2]) / (B[2] - A[2]));
      if (B[2] < near) B = lerp3(B, A, (near - B[2]) / (A[2] - B[2]));
      const sa = P.screen(A), sb = P.screen(B);
      g.strokeStyle = style; g.lineWidth = width;
      g.beginPath(); g.moveTo(sa[0], sa[1]); g.lineTo(sb[0], sb[1]); g.stroke();
    };
    for (let i = -12; i <= 12; i++) {
      const a = bg.floor * (1 - Math.abs(i) / 14) * (i % 4 === 0 ? 1.6 : 1);
      if (i !== 0) { line([i, 0, -12], [i, 0, 12], `rgba(${bg.grid},${a})`, 1); line([-12, 0, i], [12, 0, i], `rgba(${bg.grid},${a})`, 1); }
    }
    line([-12, 0, 0], [12, 0, 0], "rgba(255,74,92,.75)", 1.4);   // X axis, red like Blender
    line([0, 0, -12], [0, 0, 12], "rgba(132,204,22,.75)", 1.4);  // Y axis, green
  }

  // draw a mesh: flat-shaded faces sorted back to front, with optional text on the front face
  function drawMesh(P, mesh, place, colour, opts = {}) {
    const verts = mesh.v.map((v) => place(v));
    const cam = verts.map((v) => P.toCam(v));
    if (cam.some((c) => c[2] < 0.25)) return;
    const faces = mesh.f.map((idx, fi) => {
      const n = norm(cross(sub(verts[idx[1]], verts[idx[0]]), sub(verts[idx[2]], verts[idx[0]])));
      const centre = idx.reduce((a, k) => add(a, mul(verts[k], 1 / idx.length)), [0, 0, 0]);
      return { idx, fi, n, depth: idx.reduce((a, k) => a + cam[k][2], 0) / idx.length, facing: dot(n, sub(P.pos, centre)) > 0 };
    }).filter((f) => f.facing).sort((a, b) => b.depth - a.depth);
    const [cr, cg, cb] = colour;
    for (const f of faces) {
      const lit = 0.32 + 0.68 * Math.max(0, dot(f.n, LIGHT));
      g.beginPath();
      f.idx.forEach((k, j) => { const s = P.screen(cam[k]); j ? g.lineTo(s[0], s[1]) : g.moveTo(s[0], s[1]); });
      g.closePath();
      g.globalAlpha = opts.alpha ?? 1;
      g.fillStyle = `rgb(${Math.round(cr * lit)},${Math.round(cg * lit)},${Math.round(cb * lit)})`;
      g.fill();
      g.strokeStyle = opts.selected ? "#ffa53d" : `rgba(255,255,255,${opts.wire ? 0.5 : 0.14})`;
      g.lineWidth = opts.selected ? 2 : 1;
      g.stroke();
      // text on the front face: map the face's corners with an affine transform, so the words sit on the card in perspective
      if (f.fi === 0 && opts.text) {
        const [a, b, , d] = f.idx.map((k) => P.screen(cam[k]));   // bottom-left, bottom-right, top-right, top-left
        const tw = 300, th = 180;
        g.save();
        g.setTransform(dpr * (b[0] - a[0]) / tw, dpr * (b[1] - a[1]) / tw, dpr * (d[0] - a[0]) / th, dpr * (d[1] - a[1]) / th, dpr * d[0], dpr * d[1]);
        // the face's local y runs from bottom-left up to top-left; flip so text reads downwards from the top
        g.transform(1, 0, 0, -1, 0, 0);
        g.globalAlpha = opts.alpha ?? 1;
        opts.text(g, tw, th);
        g.restore();
      }
    }
    g.globalAlpha = 1;
  }
  const shadow = (P, p, rx, alpha) => {
    const c = P.toCam([p[0], 0.01, p[2]]);
    if (c[2] < 0.3) return;
    const s = P.screen(c), k = P.focal / c[2];
    g.fillStyle = `rgba(0,0,0,${alpha})`;
    g.beginPath(); g.ellipse(s[0], s[1], rx * k, rx * k * 0.3, 0, 0, 7); g.fill();
  };
  function wrap(ctx2, text, maxW) {
    const out = []; let line = "";
    for (const w of text.split(" ")) { const t = line ? `${line} ${w}` : w; if (ctx2.measureText(t).width > maxW && line) { out.push(line); line = w; } else line = t; }
    out.push(line);
    return out;
  }

  function drawShot(P, shot, t) {
    const s = slides[shot.i], u = (t - shot.start) / shot.dur, e = INTERP[cfg.interp].f;
    const col = hex(s.c), spin = (P.spin || 0);
    const place = (offset, rot = 0, tilt = 0, scale = 1) => (v) => add(rotY(add(rotY(rotX(mul(v, scale), tilt), rot), offset), spin), [0, 0, 0]);
    // hero: an icosahedron in the slide's colour, rising and turning
    const rise = e(clamp01(u / 0.18));
    const hero = [0, lerp(-0.6, 1.25, rise), s.pts ? -1.6 : 0];
    shadow(P, rotY(hero, spin), 0.9 * rise, 0.35);
    drawMesh(P, ICO, place(hero, t * 0.6, 0.35, 0.85 * Math.max(0.05, rise)), col, { wire: true });
    // cards: one per point (or one big card for a title or equation), keyed in one after another
    const items = s.pts ? s.pts.slice(0, 5) : [s.big || s.sub || ""].filter(Boolean);
    const n = items.length;
    items.forEach((txt, j) => {
      const k0 = 0.12 + j * 0.08, kin = e(clamp01((u - k0) / 0.16));
      const ang = n === 1 ? 0 : (j - (n - 1) / 2) * 0.42;
      let pos = n === 1 ? [0, 0.95, 1.4] : [Math.sin(ang) * 3.4, 0.9, Math.cos(ang) * 3.4 - 1.6];
      let from = [pos[0], -1.4, pos[2]];
      if (cfg.style === "explode") from = [0, 0.9 + j * 0.05, 0];
      const p = lerp3(from, pos, kin);
      const w = n === 1 ? 3.4 : 2.1, h = n === 1 ? 1.5 : 1.25;
      const focus = n > 1 && clamp01((u - 0.25) / 0.7) * n >= j && clamp01((u - 0.25) / 0.7) * n < j + 1;
      shadow(P, rotY(p, spin), w * 0.45 * kin, 0.3);
      drawMesh(P, boxOf(w, h, 0.09), place(p, ang), [26, 30, 40], {
        alpha: kin, selected: focus,
        text: (c, tw, th) => {
          c.fillStyle = `#${s.c}`; c.fillRect(0, 0, tw, 8);
          c.fillStyle = "#fff"; c.textBaseline = "top";
          const big = n === 1 && s.big;
          c.font = `${big ? 700 : 600} ${big ? 44 : n === 1 ? 26 : 22}px Geist, Inter, system-ui, sans-serif`;
          const [term, ...rest] = txt.split(": ");
          if (rest.length) {
            c.fillText(term, 18, 26, tw - 36);
            c.font = "400 18px Geist, Inter, system-ui, sans-serif"; c.fillStyle = "rgba(255,255,255,.78)";
            wrap(c, rest.join(": "), tw - 36).slice(0, 4).forEach((l, k) => c.fillText(l, 18, 64 + k * 24));
          } else wrap(c, txt, tw - 36).slice(0, 4).forEach((l, k) => c.fillText(l, 18, big ? 62 : 30 + k * 32));
        },
      });
    });
    return { s, u };
  }

  function drawOverlay(P, s, u, t) {
    // lower third: the slide's heading
    const inK = INTERP.bezier.f(clamp01(u / 0.12)), outK = 1 - INTERP.bezier.f(clamp01((u - 0.92) / 0.08));
    const a = Math.min(inK, outK);
    g.globalAlpha = a;
    const small = W < 520, fs = small ? 15 : Math.min(28, W / 26);
    const x = (small ? 12 : 22) + (1 - inK) * -30, y = small ? 62 : H - (cfg.captions ? 86 : 50);
    g.fillStyle = `#${s.c}`; g.fillRect(x, y - fs, 4, fs * 1.3);
    g.fillStyle = "#fff"; g.font = `700 ${fs}px Geist, Inter, system-ui, sans-serif`;
    g.fillText(s.h, x + 16, y, W - 60);
    g.globalAlpha = 1;
    // captions
    if (cfg.captions) {
      g.font = `500 ${Math.max(11, Math.min(16, W / 40))}px Geist, Inter, system-ui, sans-serif`;
      const lines = wrap(g, s.say, W * 0.86), words = s.say.split(" ").length;
      // show the part of the narration that's being said now, two lines at a time
      const per = Math.max(1, Math.ceil(lines.length / 2)), page = Math.min(per - 1, Math.floor(clamp01(u) * per));
      const shown = lines.slice(page * 2, page * 2 + 2);
      const lh = Math.max(14, Math.min(22, W / 30)), bw = Math.max(...shown.map((l) => g.measureText(l).width)) + 24;
      g.fillStyle = "rgba(0,0,0,.65)";
      g.beginPath(); g.roundRect(W / 2 - bw / 2, H - 16 - shown.length * lh - 8, bw, shown.length * lh + 12, 8); g.fill();
      g.fillStyle = "#fff"; g.textAlign = "center";
      shown.forEach((l, k) => g.fillText(l, W / 2, H - 16 - (shown.length - 1 - k) * lh - 6));
      g.textAlign = "left";
      void words;
    }
    // navigation gizmo, top right, like Blender's
    const R = W < 520 ? 15 : 26, gx = W - R - 20, gy = R + 20;
    g.fillStyle = "rgba(255,255,255,.06)"; g.beginPath(); g.arc(gx, gy, R + 10, 0, 7); g.fill();
    const axes = [["X", [1, 0, 0], "#ff3352"], ["Y", [0, 0, -1], "#8bdc00"], ["Z", [0, 1, 0], "#2890ff"]]
      .map(([l, v, c]) => ({ l, c, x: dot(v, P.r), y: dot(v, P.up), z: dot(v, P.f) })).sort((a, b) => b.z - a.z);
    for (const ax of axes) {
      const px = gx + ax.x * R, py = gy - ax.y * R;
      g.strokeStyle = ax.c; g.lineWidth = 2; g.beginPath(); g.moveTo(gx, gy); g.lineTo(px, py); g.stroke();
      g.fillStyle = ax.c; g.beginPath(); g.arc(px, py, R < 20 ? 6 : 8, 0, 7); g.fill();
      g.fillStyle = "#111"; g.font = "700 9px Geist, Inter, system-ui, sans-serif"; g.textAlign = "center"; g.fillText(ax.l, px, py + 3); g.textAlign = "left";
    }
    // fade between shots
    const shot = shotAt(t), edge = Math.min(t - shot.start, shot.end - t);
    if (edge < 0.25 && shot.i > 0 && t - shot.start < 0.25) { g.fillStyle = `rgba(0,0,0,${1 - edge / 0.25})`; g.fillRect(0, 0, W, H); }
  }

  function draw() {
    if (!W || !H) return;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    const shot = shotAt(time), u = clamp01((time - shot.start) / shot.dur);
    const cam = camera(shot, u), P = project(cam);
    P.spin = cam.spin;
    drawWorld(P, BACKGROUNDS[cfg.bg]);
    const { s } = drawShot(P, shot, time);
    drawOverlay(P, s, u, time);
    const frame = Math.round(time * FPS), last = Math.round(total * FPS);
    $(".vc-frame").innerHTML = `Frame <b>${String(frame).padStart(4, "0")}</b> / ${last}`;
    $(".vc-time").textContent = `${Math.floor(time / 60)}:${String(Math.floor(time % 60)).padStart(2, "0")}`;
    $(".vc-scene").textContent = `Scene ${shot.i + 1}/${shots.length} · ${s.h}`;
    drawDope();
  }

  // ---------- dope sheet ----------
  const LABEL_W = 92, RULER = 22, ROWS = ["Camera", "Cards", "Title", "Voice"];
  const xOf = (t) => LABEL_W + (t / total) * (DW - LABEL_W - 10);
  const tOf = (x) => clamp01((x - LABEL_W) / (DW - LABEL_W - 10)) * total;
  function keyframes(shot) {   // the times each track has a key, per shot
    return {
      Camera: [shot.start, shot.end - 0.04],
      Cards: (slides[shot.i].pts ? slides[shot.i].pts.slice(0, 5) : [1]).map((_, j) => shot.start + (0.12 + j * 0.08 + 0.16) * shot.dur),
      Title: [shot.start + 0.12 * shot.dur, shot.start + 0.92 * shot.dur],
    };
  }
  function drawDope() {
    if (!DW) return;
    const c = dg;
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.fillStyle = "#1d1d1d"; c.fillRect(0, 0, DW, DH);
    const rowH = (DH - RULER) / ROWS.length;
    ROWS.forEach((r, k) => {
      c.fillStyle = k % 2 ? "#232323" : "#282828"; c.fillRect(0, RULER + k * rowH, DW, rowH);
      c.fillStyle = "#b8b8b8"; c.font = "500 11px Geist, Inter, system-ui, sans-serif"; c.fillText(r, 12, RULER + k * rowH + rowH / 2 + 4);
    });
    c.fillStyle = "#303030"; c.fillRect(0, 0, DW, RULER);
    c.fillStyle = "#151515"; c.fillRect(LABEL_W - 1, 0, 1, DH);
    // ruler: a tick every second, a number every few
    c.fillStyle = "#8a8a8a"; c.font = "500 10px Geist Mono, ui-monospace, monospace";
    const step = total > 60 ? 10 : total > 24 ? 5 : 2;
    for (let s = 0; s <= total; s += 1) {
      const x = xOf(s);
      c.fillStyle = s % step === 0 ? "#6a6a6a" : "#3d3d3d"; c.fillRect(x, s % step === 0 ? 8 : 15, 1, s % step === 0 ? 14 : 7);
      if (s % step === 0) { c.fillStyle = "#9a9a9a"; c.fillText(String(s * FPS), x + 3, 14); }
    }
    const cur = shotAt(time);
    for (const shot of shots) {
      // shot boundaries
      c.fillStyle = "rgba(255,255,255,.05)"; c.fillRect(xOf(shot.start), RULER, 1, DH - RULER);
      const keys = keyframes(shot);
      ["Camera", "Cards", "Title"].forEach((r, k) => {
        for (const kt of keys[r]) {
          const x = xOf(kt), y = RULER + k * rowH + rowH / 2, sel = shot === cur;
          c.save(); c.translate(x, y); c.rotate(Math.PI / 4);
          c.fillStyle = sel ? "#ffa53d" : "#e6e6e6"; c.strokeStyle = "#111"; c.lineWidth = 1;
          c.fillRect(-3.5, -3.5, 7, 7); c.strokeRect(-3.5, -3.5, 7, 7);
          c.restore();
        }
      });
      // voice: a strip for each line of narration
      if (cfg.voice) {
        const y = RULER + 3 * rowH + rowH * 0.28;
        c.fillStyle = shot === cur ? "rgba(79,224,166,.7)" : "rgba(79,224,166,.35)";
        c.beginPath(); c.roundRect(xOf(shot.start) + 2, y, Math.max(2, xOf(shot.end) - xOf(shot.start) - 4), rowH * 0.44, 3); c.fill();
      }
    }
    // playhead, blue like Blender's
    const px = xOf(time);
    c.fillStyle = "#4772b3"; c.fillRect(px - 0.75, RULER - 2, 1.5, DH - RULER + 2);
    const label = String(Math.round(time * FPS));
    c.font = "600 10px Geist Mono, ui-monospace, monospace";
    const lw = c.measureText(label).width + 10;
    c.beginPath(); c.roundRect(px - lw / 2, 2, lw, 17, 4); c.fill();
    c.fillStyle = "#fff"; c.textAlign = "center"; c.fillText(label, px, 14); c.textAlign = "left";
  }

  // ---------- playback ----------
  function speak(i) {
    spoken = i;
    if (!cfg.voice || recorder) { speechDone = true; return; }
    cancelSpeech(); speechDone = false;
    say(slides[i].say).then(() => { if (spoken === i) speechDone = true; });
  }
  function tick(now) {
    raf = 0;
    if (!playing) return;
    const dt = Math.min(0.1, (now - last) / 1000); last = now;
    const shot = shotAt(time);
    if (spoken !== shot.i) speak(shot.i);
    // keep the picture in step with the voice: hold the last frame of a shot until its line is finished
    holding = !speechDone && time + dt >= shot.end - 0.05;
    if (!holding) time = Math.min(total, time + dt);
    draw();
    if (time >= total) { pause(); finishRender(); return; }
    raf = requestAnimationFrame(tick);
  }
  function play() {
    if (time >= total - 0.05) time = 0;
    playing = true; spoken = -1; last = performance.now();
    setPlayIcon();
    raf ||= requestAnimationFrame(tick);
  }
  function pause() {
    playing = false; cancelSpeech(); spoken = -1;
    cancelAnimationFrame(raf); raf = 0;
    setPlayIcon();
  }
  function setPlayIcon() {
    $(".vc-play").textContent = playing ? "⏸" : "▶"; $(".vc-play").setAttribute("aria-label", playing ? "Pause" : "Play");
    if (playing) $(".vc-bigplay").hidden = true;   // only shown until the first play
  }
  function seek(t) { time = Math.max(0, Math.min(total, t)); spoken = -1; if (playing) cancelSpeech(); draw(); }
  const allKeys = () => shots.flatMap((s) => Object.values(keyframes(s)).flat()).sort((a, b) => a - b);

  // ---------- render to a file ----------
  function render() {
    if (recorder) return;
    if (!view.captureStream || !window.MediaRecorder) { toast("This browser can't record video from the page."); return; }
    const type = ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm"].find((m) => MediaRecorder.isTypeSupported(m));
    const chunks = [];
    recorder = new MediaRecorder(view.captureStream(30), type ? { mimeType: type, videoBitsPerSecond: 6e6 } : undefined);
    recorder.ondataavailable = (e) => e.data.size && chunks.push(e.data);
    recorder.onstop = () => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob(chunks, { type: "video/webm" }));
      a.download = "gradify-video.webm"; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      recorder = null; root.querySelector(".vc").classList.remove("rendering");
      $(".vc-render span").textContent = "Render video (.webm)";
      toast("Rendered. Your video is downloading.");
    };
    recorder.start(250);
    root.querySelector(".vc").classList.add("rendering");
    $(".vc-render span").textContent = "Rendering…";
    time = 0; play();
  }
  function finishRender() { if (recorder && recorder.state === "recording") recorder.stop(); }

  // ---------- events ----------
  root.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.style) {
      cfg.style = b.dataset.style;
      root.querySelectorAll("[data-style]").forEach((x) => x.setAttribute("aria-checked", String(x === b)));
      draw(); return;
    }
    if (b.classList.contains("vc-bigplay")) return play();
    if (b.classList.contains("vc-render")) return render();
    const t = b.dataset.t;
    if (t === "play") return playing ? pause() : play();
    if (t === "start") return seek(0);
    if (t === "end") return seek(total);
    if (t === "next") return seek(allKeys().find((k) => k > time + 0.02) ?? total);
    if (t === "prev") return seek([...allKeys()].reverse().find((k) => k < time - 0.02) ?? 0);
  });
  root.addEventListener("change", (e) => {
    const k = e.target.dataset.k;
    if (!k) return;
    cfg[k] = e.target.type === "checkbox" ? e.target.checked : ["lens", "speed"].includes(k) ? Number(e.target.value) : e.target.value;
    if (k === "speed") { const frac = time / total; shots = buildTimeline(slides, cfg.speed); total = shots.at(-1).end; time = frac * total; }
    if (k === "voice" && !cfg.voice) cancelSpeech();
    draw();
  });
  // scrub the dope sheet
  let scrubbing = false;
  dope.addEventListener("pointerdown", (e) => { scrubbing = true; dope.setPointerCapture(e.pointerId); const r = dope.getBoundingClientRect(); seek(tOf(e.clientX - r.left)); });
  dope.addEventListener("pointermove", (e) => { if (!scrubbing) return; const r = dope.getBoundingClientRect(); seek(tOf(e.clientX - r.left)); });
  dope.addEventListener("pointerup", () => { scrubbing = false; });
  // keyboard: space plays, arrows step a frame, up/down jump between keyframes (Blender's shortcuts)
  const keys = (e) => {
    if (!root.contains(document.activeElement) || e.target.closest("select")) return;
    if (e.key === " ") { e.preventDefault(); playing ? pause() : play(); }
    else if (e.key === "ArrowRight") { e.preventDefault(); seek(time + 1 / FPS); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); seek(time - 1 / FPS); }
    else if (e.key === "ArrowUp") { e.preventDefault(); seek(allKeys().find((k) => k > time + 0.02) ?? total); }
    else if (e.key === "ArrowDown") { e.preventDefault(); seek([...allKeys()].reverse().find((k) => k < time - 0.02) ?? 0); }
  };
  root.tabIndex = -1;
  addEventListener("keydown", keys);
  const ro = new ResizeObserver(resize);
  ro.observe(view); ro.observe(dope);

  return {
    stop: () => { pause(); if (recorder) { recorder.ondataavailable = null; recorder.onstop = null; recorder.stop(); recorder = null; } },
    destroy() { this.stop(); ro.disconnect(); removeEventListener("keydown", keys); },
    // for tests
    get state() { return { time, total, playing, cfg: { ...cfg }, shots: shots.length }; },
    seek, play, pause,
  };
}
