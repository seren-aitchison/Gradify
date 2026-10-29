// Gradify Earth as a 3D globe on a canvas: land drawn as glowing dots, each module lighting
// up its own continent, topics as pins, prerequisites as arcs over the surface, and portals
// to other Gradify sites arcing up into space. Drag to turn it; it keeps spinning a little
// when you let go, and drifts slowly when left alone.
import { LAND } from "./earth-land.js";

const RAD = Math.PI / 180;
const reduce = globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// lat/lon (degrees) → unit vector
const vec = (lat, lon) => { const a = lat * RAD, b = lon * RAD; return [Math.cos(a) * Math.sin(b), Math.sin(a), Math.cos(a) * Math.cos(b)]; };
const LAND_V = []; for (let i = 0; i < LAND.length; i += 2) LAND_V.push(vec(LAND[i] / 10, LAND[i + 1] / 10));
const angle = (p, q) => Math.acos(Math.max(-1, Math.min(1, p[0] * q[0] + p[1] * q[1] + p[2] * q[2])));
// deterministic "random" per dot, so city lights don't flicker between frames
const hash = (i) => { let x = Math.sin(i * 12.9898) * 43758.5453; return x - Math.floor(x); };
const hexRgb = (h) => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };

export function createGlobe(canvas, { onPick, onHover }) {
  const ctx = canvas.getContext("2d");
  let W = 0, H = 0, R = 0, cx = 0, cy = 0, dpr = 1;
  const HOME = { yaw: -58 * RAD, pitch: -8 * RAD };     // start facing South America, like the reference
  let yaw = HOME.yaw, pitch = HOME.pitch, zoom = 1;
  let vyaw = 0, vpitch = 0, dragging = false, moved = false, last = null, idle = 0;
  let target = null;                                      // animate to face a topic
  let scene = { regions: [], pins: [], roads: [], portals: [], selected: null, rings: true };
  let pinsOnScreen = [], visible = true, raf = 0, t0 = performance.now();
  // dots tinted by the nearest module region, worked out once per scene
  let dotTint = [];

  function resize() {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(2, devicePixelRatio || 1);
    W = r.width; H = r.height;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx = W / 2; cy = H / 2;
  }

  // rotate a unit vector by the current view, then project (orthographic)
  function project(v, alt = 1) {
    const cyw = Math.cos(yaw), syw = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
    let x = v[0] * cyw - v[2] * syw, z = v[0] * syw + v[2] * cyw, y = v[1];
    const y2 = y * cp - z * sp, z2 = y * sp + z * cp;
    const r = R * zoom * alt;
    return { x: cx + x * r, y: cy - y2 * r, z: z2 };
  }
  // for points above the surface: hidden only when behind the planet's disc
  const behind = (p, alt) => p.z < 0 && Math.hypot(p.x - cx, p.y - cy) < R * zoom * 0.995 && alt > 1 ? true : p.z < 0 && alt <= 1;

  function setScene(s) {
    scene = s;
    dotTint = LAND_V.map((v) => {
      let best = null, d = 1e9;
      for (const r of scene.regions) { const a = angle(v, r.v); if (a < r.radius && a < d) { d = a; best = r; } }
      return best ? { rgb: best.rgb, k: (1 - d / best.radius) * best.light, locked: best.locked } : null;
    });
    kick();
  }

  function draw(now) {
    const t = (now - t0) / 1000;
    ctx.clearRect(0, 0, W, H);
    const r = R * zoom;
    // atmosphere glow
    let g = ctx.createRadialGradient(cx, cy, r * 0.9, cx, cy, r * 1.35);
    g.addColorStop(0, "rgba(70,140,255,.32)"); g.addColorStop(0.35, "rgba(70,140,255,.10)"); g.addColorStop(1, "rgba(70,140,255,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, r * 1.35, 0, 7); ctx.fill();
    // ocean sphere
    g = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.4, r * 0.1, cx, cy, r);
    g.addColorStop(0, "#0b1d33"); g.addColorStop(0.6, "#050e1c"); g.addColorStop(1, "#02060d");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.fill();
    // rim light
    g = ctx.createRadialGradient(cx, cy, r * 0.9, cx, cy, r);
    g.addColorStop(0, "rgba(120,180,255,0)"); g.addColorStop(1, "rgba(140,200,255,.38)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.fill();

    // land dots: bright blue-white, warm "city lights", and module regions in their colour,
    // added together so dense land glows like the reference
    const size = Math.max(1.3, r / 150);
    ctx.globalCompositeOperation = "lighter";
    for (let i = 0; i < LAND_V.length; i++) {
      const p = project(LAND_V[i]);
      if (p.z < 0.02) continue;
      const shade = 0.4 + 0.6 * p.z, h = hash(i), tint = dotTint[i];
      let col, a, s = size * (0.75 + p.z * 0.45);
      if (tint && !tint.locked && h <= 0.88) {
        // fade from the module's colour at the centre of its region to blue at the edge
        const m = Math.min(1, tint.k * 1.8), blue = [120, 175, 255];
        col = blue.map((c, j) => Math.round(c + (tint.rgb[j] - c) * m));
        a = shade * (0.95 - 0.1 * m + 0.1 * m * Math.sin(t * 1.6 + h * 20));
        s *= 1 + m * 0.3;
      } else if (h > 0.88) { col = [255, 150, 90]; a = shade * (0.7 + 0.3 * Math.sin(t * 2 + h * 40)); s *= 1.25; }
      else { col = tint?.locked ? [150, 150, 165] : [120, 175, 255]; a = shade * (tint?.locked ? 0.45 : 0.95); }
      ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${Math.min(1, a).toFixed(3)})`;
      ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s);
    }
    ctx.globalCompositeOperation = "source-over";

    // contour rings floating around the planet, like orbits
    if (scene.rings) {
      for (const [tilt, alt, spin, alpha] of [[24, 1.12, 0.05, 0.22], [-38, 1.2, -0.035, 0.14], [70, 1.07, 0.02, 0.12]]) {
        ctx.beginPath();
        let started = false;
        for (let k = 0; k <= 120; k++) {
          const a = (k / 120) * Math.PI * 2 + t * spin;
          const v = [Math.cos(a), Math.sin(a) * Math.sin(tilt * RAD), Math.sin(a) * Math.cos(tilt * RAD)];
          const p = project(v, alt);
          if (behind(p, alt)) { started = false; continue; }
          if (!started) { ctx.moveTo(p.x, p.y); started = true; } else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = `rgba(140,190,255,${alpha})`; ctx.lineWidth = 1; ctx.stroke();
      }
    }

    // hubs: glowing orange city markers, like the reference
    ctx.globalCompositeOperation = "lighter";
    const hubLabels = [];
    for (const [i, hub] of (scene.hubs || []).entries()) {
      const p = project(hub.v);
      if (p.z < 0.05) continue;
      const k = 0.35 + 0.65 * p.z, beat = 0.85 + 0.15 * Math.sin(t * 2.2 + i * 1.7), gr = (14 + r / 20) * beat;
      const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, gr);
      glow.addColorStop(0, `rgba(255,190,110,${k})`); glow.addColorStop(0.2, `rgba(255,120,45,${0.8 * k})`); glow.addColorStop(0.5, `rgba(255,90,30,${0.25 * k})`); glow.addColorStop(1, "rgba(255,80,20,0)");
      ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(p.x, p.y, gr, 0, 7); ctx.fill();
      ctx.fillStyle = `rgba(255,236,210,${k})`; ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, 7); ctx.fill();
      if (p.z > 0.35) hubLabels.push([hub.name.toUpperCase(), p.x + 8, p.y - 6, k]);
    }
    ctx.globalCompositeOperation = "source-over";
    for (const [text, x, y, k] of hubLabels) {
      ctx.font = `600 ${W < 500 ? 8.5 : 10}px Geist, Inter, system-ui, sans-serif`;
      ctx.textAlign = "left";
      ctx.lineWidth = 3; ctx.strokeStyle = "rgba(0,0,0,.8)"; ctx.strokeText(text, x, y);
      ctx.fillStyle = `rgba(255,255,255,${0.85 * k})`; ctx.fillText(text, x, y);
    }

    // prerequisites: great-circle arcs lifted a little off the surface
    for (const rd of scene.roads) {
      ctx.beginPath();
      let started = false;
      const ang = angle(rd.a, rd.b);
      for (let k = 0; k <= 24; k++) {
        const f = k / 24, s1 = Math.sin((1 - f) * ang) / Math.sin(ang), s2 = Math.sin(f * ang) / Math.sin(ang);
        const v = [rd.a[0] * s1 + rd.b[0] * s2, rd.a[1] * s1 + rd.b[1] * s2, rd.a[2] * s1 + rd.b[2] * s2];
        const alt = 1 + Math.sin(f * Math.PI) * (0.02 + Math.min(ang, 1.2) * 0.08), p = project(v, alt);
        if (behind(p, alt)) { started = false; continue; }
        if (!started) { ctx.moveTo(p.x, p.y); started = true; } else ctx.lineTo(p.x, p.y);
      }
      ctx.setLineDash(rd.weak ? [3, 5] : []);
      ctx.strokeStyle = rd.weak ? "rgba(255,255,255,.28)" : "rgba(255,255,255,.65)";
      ctx.lineWidth = rd.weak ? 1 : 1.6; ctx.stroke(); ctx.setLineDash([]);
    }

    // portals: arcs up into space towards another Gradify site
    for (const po of scene.portals) {
      const base = project(po.v);
      if (base.z < 0) continue;  // only portals whose topic faces you
      ctx.beginPath();
      let started = false;
      for (let k = 0; k <= 20; k++) {
        const f = k / 20;
        const v = [po.v[0] + po.dir[0] * f * 0.5, po.v[1] + po.dir[1] * f * 0.5, po.v[2] + po.dir[2] * f * 0.5];
        const n = Math.hypot(...v), u = [v[0] / n, v[1] / n, v[2] / n];
        const p = project(u, 1 + f * 0.32);
        if (behind(p, 1 + f * 0.32)) { started = false; continue; }
        if (!started) { ctx.moveTo(p.x, p.y); started = true; } else ctx.lineTo(p.x, p.y);
      }
      ctx.setLineDash([2, 4]); ctx.strokeStyle = po.c; ctx.globalAlpha = 0.8; ctx.lineWidth = 1.5; ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
      const end = (() => { const v = [po.v[0] + po.dir[0] * 0.5, po.v[1] + po.dir[1] * 0.5, po.v[2] + po.dir[2] * 0.5]; const n = Math.hypot(...v); return project([v[0] / n, v[1] / n, v[2] / n], 1.32); })();
      if (!behind(end, 1.32)) {
        ctx.beginPath(); ctx.arc(end.x, end.y, 9, 0, 7); ctx.fillStyle = "#000"; ctx.fill(); ctx.strokeStyle = po.c; ctx.lineWidth = 2; ctx.stroke();
        ctx.beginPath(); ctx.arc(end.x, end.y, 4, 0, 7); ctx.fillStyle = po.c; ctx.fill();
        label(`→ ${po.site}`, end.x, end.y - 16, po.c, 10);
      }
    }

    // topic pins
    pinsOnScreen = [];
    const sel = scene.selected;
    const pins = scene.pins.map((pin) => ({ pin, p: project(pin.v) })).filter((o) => o.p.z > 0).sort((a, b) => a.p.z - b.p.z);
    for (const { pin, p } of pins) {
      const fade = 0.45 + 0.55 * p.z, rr = (4 + pin.strength / 22) * (0.7 + 0.3 * p.z), c = pin.c;
      ctx.globalAlpha = fade;
      if (pin.state === "recent") { const k = (t * 0.8) % 1; ctx.beginPath(); ctx.arc(p.x, p.y, rr + 4 + k * 16, 0, 7); ctx.strokeStyle = c; ctx.globalAlpha = fade * (1 - k); ctx.lineWidth = 2; ctx.stroke(); ctx.globalAlpha = fade; }
      // outer ring, like the reference's markers
      ctx.beginPath(); ctx.arc(p.x, p.y, rr + 6, 0, 7); ctx.strokeStyle = pin.state === "locked" || pin.state === "new" ? "rgba(255,255,255,.25)" : c; ctx.lineWidth = 1;
      if (pin.state === "fading") ctx.setLineDash([3, 3]);
      ctx.stroke(); ctx.setLineDash([]);
      // core
      ctx.beginPath(); ctx.arc(p.x, p.y, rr, 0, 7);
      if (pin.state === "mastered" || pin.state === "recent") { ctx.shadowColor = c; ctx.shadowBlur = 14; ctx.fillStyle = "#fff"; ctx.fill(); ctx.shadowBlur = 0; ctx.beginPath(); ctx.arc(p.x, p.y, rr * 0.55, 0, 7); ctx.fillStyle = c; ctx.fill(); }
      else if (pin.state === "learning") { ctx.fillStyle = "#000"; ctx.fill(); ctx.strokeStyle = c; ctx.lineWidth = 2.5; ctx.stroke(); }
      else if (pin.state === "fading") { const [a, b2, d] = hexRgb(c); ctx.fillStyle = `rgba(${a},${b2},${d},.35)`; ctx.fill(); }
      else { ctx.fillStyle = "#111"; ctx.fill(); ctx.strokeStyle = "rgba(255,255,255,.35)"; ctx.lineWidth = 1.5; ctx.stroke(); }
      if (pin.id === sel) { ctx.beginPath(); ctx.arc(p.x, p.y, rr + 11, 0, 7); ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.stroke(); }
      ctx.globalAlpha = 1;
      if (pin.id === sel || (W >= 500 && p.z > 0.7)) label(pin.name, p.x, p.y + rr + 18, pin.id === sel ? "#fff" : "rgba(255,255,255,.8)", pin.id === sel ? 12 : 10.5, pin.id === sel);
      pinsOnScreen.push({ id: pin.id, x: p.x, y: p.y, r: rr + 10 });
    }

    // turn smoothly towards a chosen topic
    if (target) {
      const TAU = Math.PI * 2, dy = ((((target.yaw - yaw + Math.PI) % TAU) + TAU) % TAU) - Math.PI, dp = target.pitch - pitch;
      yaw += dy * 0.12; pitch += dp * 0.12;
      if (Math.abs(dy) < 0.002 && Math.abs(dp) < 0.002) target = null;
    } else if (!dragging) {
      yaw += vyaw; pitch = clampPitch(pitch + vpitch);
      vyaw *= 0.94; vpitch *= 0.94;
      idle += 1;
      if (!reduce && idle > 180 && Math.abs(vyaw) < 0.0005) yaw -= 0.0012;
    }
  }

  function label(text, x, y, color, size, bold) {
    ctx.font = `${bold ? 700 : 500} ${size}px Geist, Inter, system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.lineWidth = 3.5; ctx.strokeStyle = "rgba(0,0,0,.85)"; ctx.strokeText(text, x, y);
    ctx.fillStyle = color; ctx.fillText(text, x, y);
  }
  const clampPitch = (p) => Math.max(-1.25, Math.min(1.25, p));

  function loop(now) {
    raf = 0;
    if (!visible) return;
    draw(now);
    raf = requestAnimationFrame(loop);
  }
  function kick() { if (!raf && visible) raf = requestAnimationFrame(loop); }

  // ---------- Interaction ----------
  canvas.addEventListener("pointerdown", (e) => {
    dragging = true; moved = false; target = null; idle = 0;
    last = { x: e.clientX, y: e.clientY, t: performance.now() };
    canvas.setPointerCapture(e.pointerId);
    canvas.classList.add("grabbing");
  });
  canvas.addEventListener("pointermove", (e) => {
    if (!dragging) {
      const r = canvas.getBoundingClientRect();
      const hit = pick(e.clientX - r.left, e.clientY - r.top);
      canvas.style.cursor = hit ? "pointer" : "grab";
      onHover?.(hit);
      return;
    }
    const dx = e.clientX - last.x, dy = e.clientY - last.y;
    if (Math.abs(dx) + Math.abs(dy) > 3) moved = true;
    const k = 0.005 / zoom;
    yaw -= dx * k; pitch = clampPitch(pitch + dy * k);
    vyaw = -dx * k; vpitch = dy * k;
    last = { x: e.clientX, y: e.clientY, t: performance.now() };
  });
  const end = (e) => {
    if (!dragging) return;
    dragging = false; idle = 0;
    canvas.classList.remove("grabbing");
    if (performance.now() - last.t > 80) { vyaw = 0; vpitch = 0; }
    if (!moved) {
      const r = canvas.getBoundingClientRect();
      const hit = pick(e.clientX - r.left, e.clientY - r.top);
      if (hit) onPick(hit);
    }
  };
  canvas.addEventListener("pointerup", end);
  canvas.addEventListener("pointercancel", end);
  canvas.addEventListener("keydown", (e) => {
    const step = 0.12;
    const m = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, step], ArrowDown: [0, -step] }[e.key];
    if (m) { e.preventDefault(); target = null; yaw += m[0]; pitch = clampPitch(pitch + m[1]); idle = 0; }
    if (e.key === "+" || e.key === "=") setZoom(zoom * 1.15);
    if (e.key === "-") setZoom(zoom / 1.15);
  });
  // pinch to zoom on touch screens; ctrl/⌘ + scroll on trackpads (plain scroll still scrolls the page)
  canvas.addEventListener("wheel", (e) => { if (!e.ctrlKey && !e.metaKey) return; e.preventDefault(); setZoom(zoom * (e.deltaY < 0 ? 1.08 : 1 / 1.08)); }, { passive: false });
  let pinch = null;
  canvas.addEventListener("touchstart", (e) => { if (e.touches.length === 2) pinch = { d: Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY), z: zoom }; }, { passive: true });
  canvas.addEventListener("touchmove", (e) => { if (pinch && e.touches.length === 2) setZoom(pinch.z * Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY) / pinch.d); }, { passive: true });
  canvas.addEventListener("touchend", () => { pinch = null; });

  function pick(x, y) {
    let best = null, d = 1e9;
    for (const p of pinsOnScreen) { const dd = Math.hypot(p.x - x, p.y - y); if (dd < Math.max(14, p.r) && dd < d) { d = dd; best = p.id; } }
    return best;
  }
  function setZoom(z) { zoom = Math.max(0.75, Math.min(2.2, z)); }

  const ro = new ResizeObserver(() => { resize(); R = Math.min(W, H) * 0.41; });
  ro.observe(canvas);
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) kick(); }).observe(canvas);
  resize(); R = Math.min(W, H) * 0.4;

  return {
    setScene,
    // face a point: put its longitude in the middle and tilt to its latitude
    faceTo(v) {
      const lon = Math.atan2(v[0], v[2]), lat = Math.asin(v[1]);
      target = { yaw: lon, pitch: clampPitch(lat) };
      idle = 0;
      kick();
    },
    zoomBy(f) { setZoom(zoom * f); kick(); },
    reset() { target = { ...HOME }; zoom = 1; idle = 0; kick(); },
  };
}

export { vec };
