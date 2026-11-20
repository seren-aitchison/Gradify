// Liquid Glass, drawn by the GPU, on every Gradify page (the material from labs/liquid-glass, the "WebGL shader"
// renderer). One fixed canvas behind the page paints the page's light (the theme's background with the course's or
// site's colours and the Gradify spectrum gathered at the edges, white or deep ink at the centre) and, over it, every
// glass surface on screen: headers, footers, panels, cards. Each surface is a rounded rectangle with a curved bevel
// that bends the light behind it, splits its colours a little at the edge, catches a specular highlight from the
// pointer's light, brightens at grazing angles (Fresnel) and casts a soft contact shadow. The page's own content draws
// on top, as before; the surfaces' CSS fills step aside while this runs.
//
// Bars that stay on screen as you scroll (the header, the course toolbar and dock) get a small copy of their patch of
// the canvas inside them, so the page scrolling underneath stays behind the glass.
//
// It only runs where it can run well: WebGL available, transparency and contrast at their defaults, no data saver, and
// the first frames fast enough; otherwise the CSS glass (kit/styles/base.css) stays, unchanged. Turn it off on a device
// with localStorage "gradify.glass" = "off" ("force" skips the speed check, for testing). Loaded by kit/core/theme-boot.js.

// which boxes are glass, and which never are (controls, and the dark islands of kit/styles/base.css / scripts/theme-tokens.mjs)
export const GLASS = [".glass", ".panel", ".plan", ".hub-foot", ".sub-foot", ".co-card", ".cx-panel", ".cx-ucard", ".cx-sylhead", ".cx-widget", ".cx-tree", ".co-pncard", ".co-read .co-notes", ".cx-lbar", ".cx-dock", ".pro-card", ".cp-card", ".course-card", ".start-card", ".goal-card", ".offer-card"].join(", ");
export const ISLANDS = [".earth-map", ".tree-wrap", ".isle3d", ".isle-tag", ".forest", ".fs-key", ".mv-stage", ".mv-studio", ".sm-3d-art", ".lab-3d", ".lab-cv", ".lab-svg", ".co-lab", ".tablet", ".shot-frame", "[class*=\"vc-\"]", ".holo", ".sphere", ".spotlight", ".bi-stage", ".mv-labels", ".mv-tip", ".mv-controls", ".mv-info", ".gj-ring"];
const NEVER = ["button", "input", "select", "textarea", ".btn", "dialog", ...ISLANDS].join(", ");
const MAX = 32;   // surfaces drawn at once (the ones on screen, outermost first)

// may it run here? (a pure check, so the decision is testable)
export function allowed({ webgl, reducedTransparency, highContrast, saveData, pref }) {
  return !!webgl && !reducedTransparency && !highContrast && !saveData && pref !== "off";
}

const VS = "attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }";
const FS = `precision highp float;
uniform vec2 res; uniform vec2 light; uniform float lightMode; uniform float dpr;
uniform vec3 base; uniform vec3 acc1; uniform vec3 acc2;
uniform int n; uniform vec4 rects[${MAX}]; uniform vec4 props[${MAX}];
float sdBox(vec2 p, vec2 b, float r){ vec2 q = abs(p) - b + r; return length(max(q, 0.)) + min(max(q.x, q.y), 0.) - r; }
float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
float blob(vec2 uv, vec2 c, float r){ vec2 d = (uv - c) * vec2(res.x / res.y, 1.); return exp(-dot(d, d) / (r * r)); }
// the page's light: the theme, colour at the edges (the course or site, and the Gradify spectrum), a bright (light) or
// deep (dark) centre
vec3 scene(vec2 px){
  vec2 uv = px / res; vec3 c = base;
  float s = lightMode > .5 ? .75 : .62;
  c = mix(c, acc1, s * blob(uv, vec2(-.04, .10), .42));
  c = mix(c, acc2, s * blob(uv, vec2(1.04, .16), .40));
  c = mix(c, vec3(1., .69, .13), s * .7 * blob(uv, vec2(-.06, .62), .30));
  c = mix(c, vec3(.14, .78, .85), s * .7 * blob(uv, vec2(1.06, .64), .32));
  c = mix(c, vec3(1., .31, .64), s * .75 * blob(uv, vec2(.06, 1.06), .34));
  c = mix(c, vec3(.27, .25, 1.), s * .8 * blob(uv, vec2(.96, 1.06), .36));
  float core = blob(uv, vec2(.5, .46), .62);
  c = mix(c, lightMode > .5 ? vec3(1.) : base, (lightMode > .5 ? .9 : .7) * core);
  return c + (hash(px) - .5) / 255.;   // a whisper of grain: no banding in the gradients
}
void main(){
  vec2 fc = vec2(gl_FragCoord.x, res.y - gl_FragCoord.y);
  vec3 col = scene(fc);
  // soft contact shadows under the glass
  for (int i = 0; i < ${MAX}; i++) { if (i >= n) break;
    vec4 r = rects[i]; vec2 p = fc - r.xy - vec2(0., 14. * dpr);
    if (abs(p.x) > r.z + 70. * dpr || abs(p.y) > r.w + 70. * dpr) continue;
    float d = sdBox(p, r.zw, props[i].x);
    col *= 1. - (lightMode > .5 ? .07 : .22) * (1. - smoothstep(-20. * dpr, 50. * dpr, d));
  }
  for (int i = 0; i < ${MAX}; i++) { if (i >= n) break;
    vec4 r = rects[i]; vec2 p = fc - r.xy;
    if (abs(p.x) > r.z + 2. || abs(p.y) > r.w + 2.) continue;
    float rad = props[i].x, d = sdBox(p, r.zw, rad);
    if (d > 1.5) continue;
    float aa = 1. - smoothstep(-1., 1., d);
    vec2 g = vec2(sdBox(p + vec2(1., 0.), r.zw, rad) - sdBox(p - vec2(1., 0.), r.zw, rad), sdBox(p + vec2(0., 1.), r.zw, rad) - sdBox(p - vec2(0., 1.), r.zw, rad));
    vec2 nrm = normalize(g + 1e-6);
    float bez = props[i].w, t = clamp(-d / bez, 0., 1.);
    float h = sqrt(max(1. - (1. - t) * (1. - t), 0.)), bend = 1. - h;      // a circular bevel
    vec2 off = -nrm * bend * bez * 1.1 - p * .04;                            // refraction at the edge, a slight lens inside
    vec2 disp = nrm * bend * 5. * dpr;                                       // colours part at the rim
    vec3 c = vec3(scene(fc + off - disp).r, scene(fc + off).g, scene(fc + off + disp).b);
    float tint = props[i].z;
    c = mix(c, lightMode > .5 ? vec3(1.) : vec3(.045, .045, .07), tint);
    vec3 N = normalize(vec3(nrm * bend * 1.8, h + .02)), L = normalize(vec3(light, .8)), H = normalize(L + vec3(0., 0., 1.));
    float ndh = max(dot(N, H), 0.);
    float spec = pow(ndh, 90.) * (lightMode > .5 ? .9 : 1.3) + pow(ndh, 12.) * .08;
    float fres = pow(1. - h, 3.) * (lightMode > .5 ? .55 : .5);
    float rim = smoothstep(-2.2 * dpr, -.4, d) * (1. - smoothstep(-.4, 1., d));
    float lit = .5 + .5 * dot(nrm, light);
    vec3 rimc = vec3(1.);
    if (props[i].y > .5) { float a = atan(p.y, p.x) / 6.2832 + .5;          // the Gradify bar: a rainbow edge
      rimc = clamp(abs(mod(a * 6. + vec3(0., 4., 2.), 6.) - 3.) - 1., 0., 1.); rimc = mix(rimc, vec3(1.), .15); }
    vec3 glass = c + fres + spec + rim * rimc * (props[i].y > .5 ? .9 : (.22 + .5 * lit));
    glass *= 1. - .14 * bend * max(dot(nrm, -light), 0.);
    col = mix(col, glass, aa);
  }
  gl_FragColor = vec4(col, 1.);
}`;

const hexRgb = (s) => {
  s = (s || "").trim();
  let m = s.match(/^#([0-9a-f]{6})$/i); if (m) { const v = parseInt(m[1], 16); return [(v >> 16) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255]; }
  m = s.match(/^#([0-9a-f]{3})$/i); if (m) return [...m[1]].map((x) => parseInt(x + x, 16) / 255);
  m = s.match(/rgba?\(([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)/); if (m) return [m[1] / 255, m[2] / 255, m[3] / 255];
  return null;
};

export function start() {
  const root = document.documentElement;
  if (root.classList.contains("lgl") || window.top !== window) return null;
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
  const pref = (() => { try { return localStorage.getItem("gradify.glass"); } catch { return null; } })();
  const ok = allowed({ webgl: gl, reducedTransparency: matchMedia("(prefers-reduced-transparency: reduce)").matches, highContrast: root.getAttribute("data-a-contrast") === "high" || matchMedia("(prefers-contrast: more)").matches, saveData: !!navigator.connection?.saveData, pref });
  if (!ok) return null;

  const sh = (t, s) => { const o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(o)); return o; };
  let prog;
  try { prog = gl.createProgram(); gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(prog); if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog)); }
  catch (e) { console.warn("Liquid Glass: falling back to CSS glass", e); return null; }
  gl.useProgram(prog);
  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const U = {}; for (const k of ["res", "light", "lightMode", "dpr", "base", "acc1", "acc2", "n", "rects", "props"]) U[k] = gl.getUniformLocation(prog, k);

  canvas.className = "lgl-canvas"; canvas.setAttribute("aria-hidden", "true");
  const style = document.createElement("style");
  style.textContent = `
    .lgl-canvas { position: fixed; inset: 0; width: 100vw; height: 100vh; z-index: -1; pointer-events: none; }
    html.lgl body { background: transparent !important; }
    html.lgl [data-lg][data-lg] { background: transparent !important; -webkit-backdrop-filter: none !important; backdrop-filter: none !important; box-shadow: none !important; border-color: transparent !important; }
    html.lgl [data-lg-cap] { isolation: isolate; }
    .lgl-cap { position: absolute; z-index: -1; pointer-events: none; border-radius: inherit; display: block; }
    @media print { .lgl-canvas, .lgl-cap { display: none; } html.lgl [data-lg][data-lg] { background: #fff !important; } }`;
  document.head.appendChild(style);
  document.body.appendChild(canvas);
  root.classList.add("lgl");

  const DPR = () => Math.min(devicePixelRatio || 1, matchMedia("(pointer: coarse)").matches ? 1 : 1.25);
  let els = [], light = [-0.55, -0.83], dirty = true, pending = false, busyUntil = 0, colours = null;
  const rects = new Float32Array(MAX * 4), props = new Float32Array(MAX * 4);

  // the boxes that are glass right now (cheap: re-run only when the page changes)
  const collect = () => {
    for (const e of els) if (!e.isConnected) e.removeAttribute("data-lg");
    // a box inside something that paints its own solid background (the app pictured on the homepage, a modal) can't
    // show the canvas behind it: it keeps its CSS glass
    const solid = (e) => { for (let a = e.parentElement; a && a !== document.body; a = a.parentElement) {
      if (a.hasAttribute("data-lg") || (a.matches(GLASS) && !a.closest(NEVER))) continue;   // glass around glass: both drawn
      const cs = getComputedStyle(a), m = cs.backgroundColor.match(/rgba?\(([^)]+)\)/), alpha = m ? (m[1].split(/[ ,/]+/)[3] ?? 1) : 0;
      if (+alpha > .6 || (cs.backgroundImage !== "none" && !/url\(/.test(cs.backgroundImage))) return true; } return false; };
    els = [...document.querySelectorAll(GLASS)].filter((e) => !e.closest(NEVER) && !e.matches(NEVER));
    els = els.filter((e) => { const keep = !solid(e); if (!keep) e.removeAttribute("data-lg"); return keep; });
    for (const e of els) {
      e.setAttribute("data-lg", "");
      const cs = getComputedStyle(e), sticky = cs.position === "fixed" || cs.position === "sticky";
      if (sticky && !e.querySelector(":scope > .lgl-cap")) {
        const c = document.createElement("canvas"); c.className = "lgl-cap"; c.setAttribute("aria-hidden", "true");
        const bw = parseFloat(cs.borderTopWidth) || 0; c.style.inset = `${-bw}px`;
        e.setAttribute("data-lg-cap", ""); e.prepend(c);
      }
    }
  };
  const readColours = () => {
    const rs = getComputedStyle(root), course = document.querySelector("#course, .co"), cs = course && getComputedStyle(course), bs = getComputedStyle(document.body);
    const lightMode = root.getAttribute("data-theme") === "light";
    const base = hexRgb(rs.getPropertyValue("--bg")) || (lightMode ? [.965, .965, .984] : [0, 0, 0]);
    const a1 = hexRgb(cs?.getPropertyValue("--la")) || hexRgb(bs.getPropertyValue("--accent")) || [.27, .25, 1];
    const a2 = hexRgb(cs?.getPropertyValue("--lb")) || [.94, .33, .87];
    colours = { lightMode, base, a1, a2 };
  };

  const draw = () => {
    pending = false;
    const dpr = DPR(), W = Math.round(innerWidth * dpr), H = Math.round(innerHeight * dpr);
    if (canvas.width !== W || canvas.height !== H) { canvas.width = W; canvas.height = H; }
    if (dirty) { collect(); readColours(); dirty = false; }
    // the surfaces on screen, outermost (and earliest) first, so nested glass draws over its parent
    let k = 0; const caps = [];
    for (const e of els) {
      if (k >= MAX) break;
      const r = e.getBoundingClientRect();
      if (r.width < 8 || r.height < 8 || r.bottom < -40 || r.top > innerHeight + 40 || r.right < -40 || r.left > innerWidth + 40) continue;
      const cs = getComputedStyle(e);
      if (cs.visibility === "hidden" || +cs.opacity < .05) continue;
      const hw = r.width / 2, hh = r.height / 2, rad = Math.min(parseFloat(cs.borderTopLeftRadius) || 0, hw, hh);
      const big = r.width * r.height > innerWidth * innerHeight * .25;
      rects.set([(r.left + hw) * dpr, (r.top + hh) * dpr, hw * dpr, hh * dpr], k * 4);
      const rainbow = e.matches("header.bar, header.sub-nav") ? 1 : 0;
      const tint = colours.lightMode ? (big ? .72 : .5) : (big ? .5 : .32);
      props.set([rad * dpr, rainbow, tint, Math.min(big ? 16 : 22, rad * .9 + 6, hw, hh) * dpr], k * 4);
      if (e.hasAttribute("data-lg-cap")) caps.push([e, r]);
      k++;
    }
    gl.viewport(0, 0, W, H);
    gl.uniform2f(U.res, W, H); gl.uniform2f(U.light, light[0], light[1]); gl.uniform1f(U.lightMode, colours.lightMode ? 1 : 0); gl.uniform1f(U.dpr, dpr);
    gl.uniform3fv(U.base, colours.base); gl.uniform3fv(U.acc1, colours.a1); gl.uniform3fv(U.acc2, colours.a2);
    gl.uniform1i(U.n, k); gl.uniform4fv(U.rects, rects); gl.uniform4fv(U.props, props);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    // the bars that float over the page: their patch of the canvas, inside them, above what scrolls beneath
    for (const [e, r] of caps) {
      const c = e.querySelector(":scope > .lgl-cap"); if (!c) continue;
      const w = Math.max(1, Math.round(r.width * dpr)), h = Math.max(1, Math.round(r.height * dpr));
      if (c.width !== w || c.height !== h) { c.width = w; c.height = h; }
      c.getContext("2d").drawImage(canvas, r.left * dpr, r.top * dpr, w, h, 0, 0, w, h);
    }
    if (performance.now() < busyUntil) kick();
  };
  const kick = () => { if (!pending) { pending = true; requestAnimationFrame(draw); } };
  const busy = (ms) => { busyUntil = Math.max(busyUntil, performance.now() + ms); kick(); };

  // too slow here (an old phone, software rendering): give the page back to the CSS glass
  let frames = 0, spent = 0;
  const probe = () => { const t = performance.now(); draw(); gl.finish(); spent += performance.now() - t; if (++frames < 12) requestAnimationFrame(probe); else if (spent / frames > 22 && pref !== "force") stop(); };

  addEventListener("scroll", kick, { passive: true, capture: true });
  addEventListener("resize", () => { dirty = true; kick(); });
  addEventListener("hashchange", () => { dirty = true; busy(900); });
  if (matchMedia("(pointer: fine)").matches) addEventListener("pointermove", (e) => {
    // the light sits towards the pointer, seen from the middle of the window
    const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5, l = Math.hypot(x, y) || 1;
    light = [x / l * .85 - .15, y / l * .85 - .25]; const m = Math.hypot(...light) || 1; light = [light[0] / m, light[1] / m]; kick();
  }, { passive: true });
  let mt = 0;
  const mo = new MutationObserver(() => { clearTimeout(mt); mt = setTimeout(() => { dirty = true; busy(700); }, 60); });
  mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "open", "hidden", "style"] });
  const to = new MutationObserver(() => { dirty = true; kick(); });
  to.observe(root, { attributes: true, attributeFilter: ["data-theme", "data-a-contrast"] });
  addEventListener("visibilitychange", () => { if (!document.hidden) kick(); });
  // reduced transparency or high contrast chosen later: stop and hand back
  const watch = () => { if (root.getAttribute("data-a-contrast") === "high") stop(); };
  to.observe(root, { attributes: true, attributeFilter: ["data-a-contrast"] }); document.addEventListener("gradify:access", watch);

  function stop() {
    mo.disconnect(); to.disconnect(); root.classList.remove("lgl"); canvas.remove(); style.remove();
    document.querySelectorAll("[data-lg]").forEach((e) => { e.removeAttribute("data-lg"); e.removeAttribute("data-lg-cap"); });
    document.querySelectorAll(".lgl-cap").forEach((c) => c.remove());
    removeEventListener("scroll", kick, { capture: true });
  }
  busy(1600);   // entrance animations move things for a moment
  requestAnimationFrame(probe);
  return { stop, redraw: () => { dirty = true; kick(); } };
}
