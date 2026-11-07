// Gradify Earth as a 3D globe on a canvas: a lit planet with land, oceans, clouds, a night side with
// city lights and an atmosphere (kit/earth/surface.js), each module tinting its own continent, topics as pins, prerequisites as arcs over the surface, and portals
// to other Gradify sites arcing up into space. Drag to turn it; it keeps spinning a little
// when you let go, and drifts slowly when left alone.
import { createSurface } from "./surface.js";

const RAD = Math.PI / 180;
const reduce = globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// lat/lon (degrees) → unit vector
const vec = (lat, lon) => { const a = lat * RAD, b = lon * RAD; return [Math.cos(a) * Math.sin(b), Math.sin(a), Math.cos(a) * Math.cos(b)]; };
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
  let pinsOnScreen = [], hubsOnScreen = [], visible = true, raf = 0, t0 = performance.now();
  // the planet itself, and a field of stars behind it
  const surface = createSurface();
  const stars = Array.from({ length: 220 }, (_, i) => [hash(i + 0.5), hash(i + 101.3), 0.25 + hash(i + 57.7) * 0.75, hash(i + 9.1) > 0.92]);

  function resize() {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(2, devicePixelRatio || 1);
    W = r.width; H = r.height;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx = W / 2; cy = H / 2 + (W < 500 ? 14 : 0);  // clear of the controls on phones
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
    surface.setRegions(scene.regions);
    kick();
  }

  function draw(now) {
    const t = (now - t0) / 1000;
    ctx.clearRect(0, 0, W, H);
    const r = R * zoom;
    // stars, then the atmosphere's glow into space, then the planet
    for (const [sx, sy, b, big] of stars) {
      const x = sx * W, y = sy * H; if (Math.hypot(x - cx, y - cy) < r * 1.02) continue;
      ctx.fillStyle = `rgba(220,232,255,${(b * (0.55 + 0.45 * Math.sin(t * 0.7 + sx * 40))).toFixed(3)})`;
      ctx.fillRect(x, y, big ? 1.6 : 1, big ? 1.6 : 1);
    }
    let g = ctx.createRadialGradient(cx, cy, r * 0.96, cx, cy, r * 1.22);
    g.addColorStop(0, "rgba(110,175,255,.42)"); g.addColorStop(0.25, "rgba(80,150,255,.16)"); g.addColorStop(1, "rgba(70,140,255,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, r * 1.22, 0, 7); ctx.fill();
    surface.render(ctx, cx, cy, r, yaw, pitch, t, dpr);
    // a thin bright rim where sunlight scatters through the atmosphere
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r + 0.6, 0, 7);
    const rim = ctx.createLinearGradient(cx - r, cy - r, cx + r * 0.6, cy + r * 0.8);
    rim.addColorStop(0, "rgba(200,230,255,.85)"); rim.addColorStop(0.55, "rgba(140,190,255,.25)"); rim.addColorStop(1, "rgba(140,190,255,.05)");
    ctx.strokeStyle = rim; ctx.lineWidth = 1.4; ctx.stroke(); ctx.restore();

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
    hubsOnScreen = [];
    for (const [i, hub] of (scene.hubs || []).entries()) {
      const p = project(hub.v);
      if (p.z < 0.05) continue;
      const k = 0.35 + 0.65 * p.z, beat = 0.85 + 0.15 * Math.sin(t * 2.2 + i * 1.7), gr = (14 + r / 20) * beat;
      const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, gr);
      glow.addColorStop(0, `rgba(255,190,110,${k})`); glow.addColorStop(0.2, `rgba(255,120,45,${0.8 * k})`); glow.addColorStop(0.5, `rgba(255,90,30,${0.25 * k})`); glow.addColorStop(1, "rgba(255,80,20,0)");
      ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(p.x, p.y, gr, 0, 7); ctx.fill();
      ctx.fillStyle = `rgba(255,236,210,${k})`; ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, 7); ctx.fill();
      if (p.z > 0.35) hubLabels.push([hub.name.toUpperCase(), p.x + 8, p.y - 6, k, hub.id === scene.selected]);
      if (hub.id === scene.selected) { ctx.globalCompositeOperation = "source-over"; ctx.beginPath(); ctx.arc(p.x, p.y, 11, 0, 7); ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.stroke(); ctx.globalCompositeOperation = "lighter"; }
      if (p.z > 0.2) hubsOnScreen.push({ id: hub.id, x: p.x, y: p.y, r: 14 });
    }
    ctx.globalCompositeOperation = "source-over";
    for (const [text, x, y, k, on] of hubLabels) {
      ctx.font = `${on ? 700 : 600} ${on ? 12 : W < 500 ? 8.5 : 10}px Geist, Inter, system-ui, sans-serif`;
      ctx.textAlign = "left";
      ctx.lineWidth = 3; ctx.strokeStyle = "rgba(0,0,0,.8)"; ctx.strokeText(text, x, y);
      ctx.fillStyle = on ? "#fff" : `rgba(255,255,255,${0.85 * k})`; ctx.fillText(text, x, y);
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

  // labels sit in small dark boxes, like a mission-control display
  function label(text, x, y, color, size, bold) {
    ctx.save();
    ctx.globalCompositeOperation = "source-over";
    ctx.font = `${bold ? 700 : 500} ${size}px Geist, Inter, system-ui, sans-serif`;
    ctx.textAlign = "center"; ctx.textBaseline = "alphabetic";
    const w = ctx.measureText(text).width + 10, h = size + 7, bx = x - w / 2, by = y - size - 1;
    ctx.beginPath(); ctx.roundRect ? ctx.roundRect(bx, by, w, h, 4) : ctx.rect(bx, by, w, h);
    ctx.fillStyle = "rgba(8,12,18,.74)"; ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,.16)"; ctx.lineWidth = 1; ctx.stroke();
    ctx.fillStyle = color; ctx.fillText(text, x, y + 1);
    ctx.restore();
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
    // cities too, so whichever marker is nearest the tap wins
    for (const p of hubsOnScreen) { const dd = Math.hypot(p.x - x, p.y - y); if (dd < p.r && dd < d) { d = dd; best = p.id; } }
    return best;
  }
  function setZoom(z) { zoom = Math.max(0.75, Math.min(2.2, z)); }

  // the globe fills more of the frame on phones, where there's less room around it
  const fit = () => { R = Math.min(W, H) * (W < 500 ? 0.46 : 0.41); };
  const ro = new ResizeObserver(() => { resize(); fit(); });
  ro.observe(canvas);
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) kick(); }).observe(canvas);
  resize(); fit();

  const api = {
    setScene,
    // face a point: put its longitude in the middle and tilt to its latitude
    faceTo(v, instant) {
      const lon = Math.atan2(v[0], v[2]), lat = Math.asin(v[1]);
      target = { yaw: lon, pitch: clampPitch(lat) };
      if (instant) { yaw = target.yaw; pitch = target.pitch; target = null; vyaw = vpitch = 0; }
      idle = 0;
      kick();
    },
    zoomBy(f) { setZoom(zoom * f); kick(); },
    reset() { target = { ...HOME }; zoom = 1; idle = 0; kick(); },
  };
  canvas.globe = api;  // for tests
  return api;
}

export { vec };
