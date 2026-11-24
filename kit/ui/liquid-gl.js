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
// Three tiers, so the glass never costs the lesson its responsiveness:
//   "webgl"       the full material, up to 32 surfaces, at up to 1.25x pixels
//   "webgl-lite"  the same look, cheaper: no colour split, fewer surfaces, fewer pixels (phones, small GPUs, or a
//                 full tier that measured slow)
//   "css"         the CSS glass (kit/styles/base.css), unchanged: no WebGL, software rendering, reduced transparency,
//                 high contrast, data saver, a lost GPU context, or the lite tier measured slow too
// Software rendering is spotted two ways: the browser itself (a context asked for with failIfMajorPerformanceCaveat
// isn't given when there's no GPU behind it, or the GPU is blocklisted) and the renderer's name. Speed is then measured
// from the frame rate over a couple of dozen frames, after the shaders have finished compiling and the first frames
// (which still carry driver work) are discarded; the page is never blocked waiting for the GPU.
// What happened is on <html data-glass="..."> and in window.gradifyGlass (tier, reason, renderer, frame time).
// localStorage "gradify.glass": "off" turns it off, "lite" asks for the lite tier, "force" skips the GPU and speed checks.
// Loaded by kit/core/theme-boot.js.

// which boxes are glass, and which never are (controls, and the dark islands of kit/styles/base.css / scripts/theme-tokens.mjs)
export const GLASS = [".glass", ".panel", ".plan", ".hub-foot", ".sub-foot", ".co-card", ".cx-panel", ".cx-ucard", ".cx-sylhead", ".cx-plank", ".cx-fpanel", ".cx-widget", ".cx-tree", ".co-pncard", ".co-read .co-notes", ".cx-lbar", ".cx-dock", ".co-tabs", ".pro-card", ".cp-card", ".course-card", ".start-card", ".goal-card", ".offer-card"].join(", ");
export const ISLANDS = [".earth-map", ".tree-wrap", ".isle3d", ".isle-tag", ".forest", ".fs-key", ".mv-stage", ".mv-studio", ".sm-3d-art", ".lab-3d", ".lab-cv", ".lab-svg", ".co-lab", ".tablet", ".shot-frame", "[class*=\"vc-\"]", ".holo", ".sphere", ".spotlight", ".bi-stage", ".mv-labels", ".mv-tip", ".mv-controls", ".mv-info", ".gj-ring", "[class*=\"hb-\"]", ".glass-coach", "[class*=\"gc-\"]", ".cx-fcard", ".cx-bcover", ".cx-rings", ".cx-wok"];
const NEVER = ["button", "input", "select", "textarea", ".btn", "dialog", ...ISLANDS].join(", ");
const MAX = 32, MAX_LITE = 12;   // surfaces drawn at once (the ones on screen, outermost first)

// a renderer string that means there's no GPU behind WebGL
export const softwareRenderer = (name) => /swiftshader|llvmpipe|softpipe|software|basic render|microsoft basic/i.test(name || "");
// may it run here? (a pure check, so the decision is testable)
export function allowed({ webgl, reducedTransparency, highContrast, saveData, pref }) {
  return !!webgl && !reducedTransparency && !highContrast && !saveData && pref !== "off";
}
// the tier to start at, before anything is measured
export function startTier({ caveat, renderer, pref, coarse, memory, cores, highp, uniforms }) {
  if (pref === "force") return highp && uniforms >= 16 + 2 * MAX ? "webgl" : "webgl-lite";
  if (caveat || softwareRenderer(renderer)) return "css";
  if (uniforms < 16 + 2 * MAX_LITE) return "css";
  if (pref === "lite" || !highp || uniforms < 16 + 2 * MAX) return "webgl-lite";
  if (coarse && ((memory && memory <= 4) || (cores && cores <= 4))) return "webgl-lite";
  return "webgl";
}
// after measuring: the median time between frames (ms) decides whether to step down. 34ms is below ~30fps.
export const SLOW_MS = 34;
export function nextTier(tier, medianMs, pref) {
  if (pref === "force" || !(medianMs > SLOW_MS)) return tier;
  // far too slow for the full tier: the lite one (roughly half the work) won't rescue it, so don't make the lesson wait
  return tier === "webgl" && medianMs <= 3 * SLOW_MS ? "webgl-lite" : "css";
}
export const median = (xs) => { const a = [...xs].sort((x, y) => x - y), m = a.length >> 1; return a.length ? (a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2) : 0; };

const VS = "attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }";
const fragment = (MAX, lite, precision) => `precision ${precision} float;
uniform vec2 res; uniform vec2 light; uniform float lightMode; uniform float dpr;
uniform vec3 base; uniform vec3 acc1; uniform vec3 acc2; uniform float accentRim;
uniform int n; uniform vec4 rects[${MAX}]; uniform vec4 props[${MAX}];
float sdBox(vec2 p, vec2 b, float r){ vec2 q = abs(p) - b + r; return length(max(q, 0.)) + min(max(q.x, q.y), 0.) - r; }
float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
vec3 hue(float a){ return clamp(abs(mod(a * 6. + vec3(0., 4., 2.), 6.) - 3.) - 1., 0., 1.); }
float blob(vec2 uv, vec2 c, float r){ vec2 d = (uv - c) * vec2(res.x / res.y, 1.); return exp(-dot(d, d) / (r * r)); }
// the page behind the glass: plain (November 2026: no coloured light gathered at the edges)
vec3 scene(vec2 px){
  // the page itself, pure white or pure black: colour comes from the content and the motifs, not a lit backdrop
  vec3 c = base;
  return c${precision === "highp" ? " + (hash(px) - .5) / 255." : ""};   // a whisper of grain against banding (highp only: mediump can't hash safely)
}
void main(){
  vec2 fc = vec2(gl_FragCoord.x, res.y - gl_FragCoord.y);
  vec3 col = scene(fc);
  // soft contact shadows under the glass
  for (int i = 0; i < ${MAX}; i++) { if (i >= n) break;
    vec4 r = rects[i]; vec2 p = fc - r.xy - vec2(0., 14. * dpr);
    if (abs(p.x) > r.z + 70. * dpr || abs(p.y) > r.w + 70. * dpr) continue;
    float d = sdBox(p, r.zw, props[i].x);
    float sh = 1. - smoothstep(-20. * dpr, 50. * dpr, d);
    if (lightMode > .5) col *= 1. - .07 * sh;   // light mode: a soft grey shadow
    else col *= 1. - .22 * sh;
    float dh = sdBox(fc - r.xy, r.zw, props[i].x);                           // a halo, hugging the edge and fading out
    if (dh > 0.) col = mix(col, lightMode > .5 ? vec3(1.) : mix(acc1, vec3(1.), .25), (lightMode > .5 ? .62 : .2) * pow(1. - smoothstep(0., 46. * dpr, dh), 1.6));
  }
  // the canvas is see-through except for the glass: outside it only the light mode's contact shadow is drawn (as a black
  // wash), so the page and its motifs (kit/ui/motifs.js), which sit beneath the canvas, show through around the glass
  float sa = lightMode > .5 ? clamp(1. - col.g / max(base.g, .01), 0., 1.) : 0.;
  float cover = 0.;
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
    float wet = props[i].y;                                                  // the Gradify bar: thicker, wetter, magnifying
    vec2 off = -nrm * bend * bez * (1.1 + .9 * wet) - p * (.04 + .14 * wet);   // refraction at the edge, a lens inside (1.2x on the bar)
    vec2 disp = nrm * bend * (lightMode > .5 ? 9. : 5.) * dpr;                                       // colours part at the rim
    ${lite ? "vec3 c = scene(fc + off);" : "vec3 c = vec3(scene(fc + off - disp).r, scene(fc + off).g, scene(fc + off + disp).b);"}
    float tint = props[i].z;
    c = mix(c, lightMode > .5 ? vec3(1.) : vec3(.045, .045, .07), tint);
    vec3 N = normalize(vec3(nrm * bend * 1.8, h + .02)), L = normalize(vec3(light, .8)), H = normalize(L + vec3(0., 0., 1.));
    float ndh = max(dot(N, H), 0.);
    float spec = pow(ndh, 90. - 30. * wet) * (lightMode > .5 ? .9 : 1.3) * (1. + .7 * wet) + pow(ndh, 12.) * (.08 + .1 * wet);
    float fres = pow(1. - h, 3.) * (lightMode > .5 ? .55 : .5);
    float rim = smoothstep(-3. * dpr, -.6 * dpr, d) * (1. - smoothstep(-.5, 1., d));   // a definite edge
    float lit = .5 + .5 * dot(nrm, light);
    vec3 rimc = accentRim > .5 ? mix(acc1, vec3(1.), .25 + .45 * lit) : vec3(1.);   // the course's colour, or white light
    if (props[i].y > .5) rimc = lightMode > .5 ? vec3(.86, .86, .9) : vec3(.32, .32, .36);   // the Gradify bar: a plain frosted edge
    float gloss = (1. - smoothstep(-r.w, -r.w + min(70. * dpr, r.w * (.7 - .25 * wet)), p.y)) * (lightMode > .5 ? .22 : .1) * (1. + 1.2 * wet);   // a glossy sheet across the top
    // wet: a bright arc where the bevel turns to the light, and light gathered along the bottom edge inside (a caustic)
    float arc = wet * bend * pow(max(dot(nrm, light), 0.), 3.) * (lightMode > .5 ? .35 : .5);
    float caustic = wet * smoothstep(.2, 1., nrm.y) * bend * (lightMode > .5 ? .18 : .32);
    vec3 glass = c + fres * (1. + .6 * wet) + spec + gloss + arc + caustic;
    if (lightMode > .5) {
      // wet chrome: the bevel reflects a bright sky and a grey horizon in thin bands, as polished glass on white does
      float band = .5 + .5 * sin(bend * (11. + 5. * wet) - nrm.y * 1.6);
      vec3 chrome = mix(vec3(.58, .6, .66), vec3(1.), smoothstep(.25, .85, band));
      glass = mix(glass, chrome, smoothstep(.04, .5, bend) * (.55 + .2 * wet));
      // holographic: a thin-film spectrum running round the inner bevel, brightest towards the light
      float film = smoothstep(.12, .4, bend) * (1. - smoothstep(.55, .9, bend));
      vec3 iri = mix(mix(hue(atan(p.y, p.x) / 6.2832 + bend * 1.4 + .1), vec3(.78, .72, 1.), .3), vec3(1.), .4);   // pastel: lilac, pink, blue, peach
      glass = mix(glass, iri, film * .28 * (1. - wet) * (.55 + .45 * lit));   // the bar has no film: plain frost
    }
    glass = mix(glass, rimc, rim * (props[i].y > .5 ? .95 : (accentRim > .5 ? .85 : .55 + .35 * lit)));
    glass *= 1. - (.14 + (lightMode > .5 ? .22 : .12) * wet) * bend * max(dot(nrm, -light), 0.);   // the edge away from the light, in shade (deeper on the bar)
    col = mix(col, glass, aa); cover = max(cover, aa);
  }
  gl_FragColor = vec4(col * cover, cover + (1. - cover) * sa);   // premultiplied
}`;

const hexRgb = (s) => {
  s = (s || "").trim();
  let m = s.match(/^#([0-9a-f]{6})$/i); if (m) { const v = parseInt(m[1], 16); return [(v >> 16) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255]; }
  m = s.match(/^#([0-9a-f]{3})$/i); if (m) return [...m[1]].map((x) => parseInt(x + x, 16) / 255);
  m = s.match(/rgba?\(([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)/); if (m) return [m[1] / 255, m[2] / 255, m[3] / 255];
  return null;
};

let running = null;   // one renderer per page

export function start() {
  const root = document.documentElement;
  if (running || window.top !== window) return running;
  const status = (tier, why, extra) => {
    root.dataset.glass = tier;
    window.gradifyGlass = Object.assign(window.gradifyGlass || {}, { tier, why }, extra);
    if (tier === "css" && why) console.info(`Liquid Glass: CSS glass (${why})`);
  };
  const pref = (() => { try { return localStorage.getItem("gradify.glass"); } catch { return null; } })();
  const canvas = document.createElement("canvas");
  const opts = { antialias: false, alpha: true, premultipliedAlpha: true, depth: false, stencil: false, powerPreference: "default" };
  // the browser's own answer to "is there a real GPU here?": no context with this flag on software rendering
  let gl = pref === "force" ? null : canvas.getContext("webgl", { ...opts, failIfMajorPerformanceCaveat: true });
  const caveat = !gl && pref !== "force";
  if (!gl) gl = canvas.getContext("webgl", opts);
  const mqT = matchMedia("(prefers-reduced-transparency: reduce)"), mqC = matchMedia("(prefers-contrast: more)");
  // the reading-size setting zooms <body>; a canvas inside it would be scaled twice, so keep the CSS glass then
  const zoomed = () => { const z = parseFloat(getComputedStyle(document.body).zoom); return !!z && Math.abs(z - 1) > .01; };
  const ok = allowed({ webgl: gl, reducedTransparency: mqT.matches, highContrast: root.getAttribute("data-a-contrast") === "high" || mqC.matches, saveData: !!navigator.connection?.saveData, pref });
  if (!ok || zoomed()) { status("css", !gl ? "no WebGL" : pref === "off" ? "turned off" : zoomed() ? "larger reading size" : "accessibility or data-saver setting"); return null; }
  const dbg = gl.getExtension("WEBGL_debug_renderer_info");
  const renderer = String(dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER));
  const highp = (gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT)?.precision || 0) > 0;
  const uniforms = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS) || 0;
  const coarse = matchMedia("(pointer: coarse)").matches;
  let tier = startTier({ caveat, renderer, pref, coarse, memory: navigator.deviceMemory, cores: navigator.hardwareConcurrency, highp, uniforms });
  window.gradifyGlass = { renderer, highp, uniforms };
  if (tier === "css") { status("css", caveat ? "software rendering (browser reported)" : uniforms < 16 + 2 * MAX_LITE ? "GPU too small" : "software rendering: " + renderer); return null; }
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let par = gl.getExtension("KHR_parallel_shader_compile");

  // the GPU program for a tier; compiled in the background where the browser can, so the page never waits on it
  let P = null, lost = false;
  const build = (t) => new Promise((resolve, reject) => {
    const era = lostCount;   // a build from before a lost context goes quiet: its program no longer exists
    const max = t === "webgl" ? MAX : MAX_LITE;
    const sh = (type, src) => { const o = gl.createShader(type); gl.shaderSource(o, src); gl.compileShader(o); return o; };
    const vs = sh(gl.VERTEX_SHADER, VS), fs = sh(gl.FRAGMENT_SHADER, fragment(max, t !== "webgl", highp ? "highp" : "mediump"));
    const prog = gl.createProgram(); gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    const done = () => {
      if (stopped) return;   // stopped while compiling: install nothing
      if (gl.isContextLost()) return reject(new Error("context lost"));
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return reject(new Error(gl.getShaderInfoLog(fs) || gl.getProgramInfoLog(prog) || "link failed"));
      gl.deleteShader(vs); gl.deleteShader(fs);
      if (P) gl.deleteProgram(P.prog);
      gl.useProgram(prog);
      if (!P || !P.buf || P.lostAt !== lostCount) {
        const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
        P = { buf, lostAt: lostCount };
      }
      const loc = gl.getAttribLocation(prog, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      const U = {}; for (const k of ["res", "light", "lightMode", "dpr", "base", "acc1", "acc2", "accentRim", "n", "rects", "props"]) U[k] = gl.getUniformLocation(prog, k);
      Object.assign(P, { prog, U, max, tier: t }); tier = t; resolve();
    };
    if (!par) return done();
    const poll = () => { if (stopped || era !== lostCount) return; if (gl.isContextLost()) return reject(new Error("context lost")); gl.getProgramParameter(prog, par.COMPLETION_STATUS_KHR) ? done() : (pollT = setTimeout(poll, 30)); };
    poll();
  });
  let lostCount = 0, pollT = 0;

  canvas.className = "lgl-canvas"; canvas.setAttribute("aria-hidden", "true");
  const style = document.createElement("style");
  style.textContent = `
    .lgl-canvas { position: fixed; inset: 0; width: 100vw; height: 100vh; z-index: -1; pointer-events: none; }
    html:not(.lgl) .lgl-canvas, html:not(.lgl) .lgl-cap { display: none !important; }
    html.lgl body { background: transparent !important; }
    html.lgl [data-lg][data-lg] { background: transparent !important; -webkit-backdrop-filter: none !important; backdrop-filter: none !important; box-shadow: none !important; border-color: transparent !important; }
    html.lgl [data-lg-cap] { isolation: isolate; }
    .lgl-cap.lgl-cap { position: absolute !important; z-index: -1 !important; pointer-events: none !important; display: block !important; margin: 0 !important; padding: 0 !important; border: 0 !important; border-radius: inherit; grid-area: auto !important; width: auto; height: auto; }
    @media print { .lgl-canvas, .lgl-cap { display: none; } html.lgl [data-lg][data-lg] { background: #fff !important; } }`;

  // pixels drawn: the lite tier draws fewer and lets the browser scale them up
  const DPR = () => { const d = Math.min(devicePixelRatio || 1, coarse ? 1 : 1.25); return P && P.tier !== "webgl" ? Math.max(.5, d * .7) : d; };
  let els = [], light = [-0.55, -0.83], dirty = true, pending = false, raf = 0, busyUntil = 0, colours = null, live = false;
  const rects = new Float32Array(MAX * 4), props = new Float32Array(MAX * 4);

  // the boxes that are glass right now (cheap: re-run only when the page changes)
  const collect = () => {
    const prev = els;
    // a box inside something that paints its own solid background (the app pictured on the homepage, a modal) can't
    // show the canvas behind it: it keeps its CSS glass
    const solid = (e) => { for (let a = e.parentElement; a && a !== document.body; a = a.parentElement) {
      if (a.hasAttribute("data-lg") || (a.matches(GLASS) && !a.closest(NEVER))) continue;   // glass around glass: both drawn
      const cs = getComputedStyle(a), m = cs.backgroundColor.match(/rgba?\(([^)]+)\)/), alpha = m ? (m[1].split(/[ ,/]+/)[3] ?? 1) : 0;
      if (+alpha > .6 || (cs.backgroundImage !== "none" && !/url\(/.test(cs.backgroundImage))) return true; } return false; };
    els = [...document.querySelectorAll(GLASS)].filter((e) => !e.closest(NEVER) && !e.matches(NEVER));
    els = els.filter((e) => !solid(e));
    // boxes that left the set (removed, moved under a dark island, now over a solid parent) get their CSS glass back
    const now = new Set(els); for (const e of prev) if (!now.has(e)) { e.removeAttribute("data-lg"); e.removeAttribute("data-lg-cap"); e.querySelector(":scope > .lgl-cap")?.remove(); }
    for (const e of els) {
      e.setAttribute("data-lg", "");
      const cs = getComputedStyle(e), sticky = cs.position === "fixed" || cs.position === "sticky";
      if (sticky && !e.querySelector(":scope > .lgl-cap")) {
        const c = document.createElement("canvas"); c.className = "lgl-cap"; c.setAttribute("aria-hidden", "true");
        const bw = parseFloat(cs.borderTopWidth) || 0; c.style.cssText = `inset:${-bw}px;width:calc(100% + ${2 * bw}px);height:calc(100% + ${2 * bw}px)`;
        e.setAttribute("data-lg-cap", ""); e.prepend(c);
      }
    }
  };
  // the floating bars' copies only change when what they show changes (see draw), so they're versioned
  let capGen = 0, capT = 0;
  const readColours = () => {
    const rs = getComputedStyle(root), course = document.querySelector("#course, .co"), cs = course && getComputedStyle(course), bs = getComputedStyle(document.body);
    const lightMode = root.getAttribute("data-theme") === "light";
    const base = hexRgb(rs.getPropertyValue("--bg")) || (lightMode ? [1, 1, 1] : [0, 0, 0]);
    const a1 = hexRgb(cs?.getPropertyValue("--la")) || hexRgb(bs.getPropertyValue("--accent")) || [.27, .25, 1];
    const a2 = hexRgb(cs?.getPropertyValue("--lb")) || [.94, .33, .87];
    const next = { lightMode, base, a1, a2, course: !!course };
    if (JSON.stringify(next) !== JSON.stringify(colours)) capGen++;   // only a real change refreshes the bars' copies
    colours = next;
  };

  const draw = () => {
    pending = false; raf = 0;
    if (!live || lost || !P) return;
    const dpr = DPR(), W = Math.round(innerWidth * dpr), H = Math.round(innerHeight * dpr), max = P.max;
    if (canvas.width !== W || canvas.height !== H) { canvas.width = W; canvas.height = H; }
    if (dirty) { collect(); readColours(); dirty = false; }
    // the surfaces on screen, outermost (and earliest) first, so nested glass draws over its parent; the bars that float
    // over the page (header, toolbar, dock) last, so cards scrolling underneath never paint over them (or their edge)
    let k = 0; const caps = [];
    const floating = els.filter((e) => e.hasAttribute("data-lg-cap")), order = [...els.filter((e) => !e.hasAttribute("data-lg-cap")), ...floating];
    for (const e of order) {
      const r = e.getBoundingClientRect();
      if (r.width < 8 || r.height < 8 || r.bottom < -40 || r.top > innerHeight + 40 || r.right < -40 || r.left > innerWidth + 40) continue;
      const cs = getComputedStyle(e);
      if (cs.visibility === "hidden" || +cs.opacity < .05) continue;
      // past the drawing limit (room is kept for the bars): this box keeps its CSS glass rather than going see-through
      if (k >= max || (k >= max - floating.length && !e.hasAttribute("data-lg-cap"))) { e.removeAttribute("data-lg"); continue; }
      if (!e.hasAttribute("data-lg")) e.setAttribute("data-lg", "");
      const hw = r.width / 2, hh = r.height / 2, rad = Math.min(parseFloat(cs.borderTopLeftRadius) || 0, hw, hh);
      const big = r.width * r.height > innerWidth * innerHeight * .25;
      rects.set([(r.left + hw) * dpr, (r.top + hh) * dpr, hw * dpr, hh * dpr], k * 4);
      const rainbow = e.matches("header.bar, header.sub-nav") ? 1 : 0;
      const tint = (colours.lightMode ? (big ? .62 : .46) : (big ? .56 : .42)) * (rainbow ? .7 : 1);   // light mode: clear glass, not milk   // the bar: clearer, so it magnifies what's behind
      props.set([rad * dpr, rainbow, tint, Math.min(rainbow ? 30 : big ? 16 : 22, rainbow ? hh * .85 : rad * .9 + 6, hw, hh) * dpr], k * 4);
      if (e.hasAttribute("data-lg-cap")) caps.push([e, r, k]);
      k++;
    }
    gl.viewport(0, 0, W, H);
    gl.uniform2f(P.U.res, W, H); gl.uniform2f(P.U.light, light[0], light[1]); gl.uniform1f(P.U.lightMode, colours.lightMode ? 1 : 0); gl.uniform1f(P.U.dpr, dpr);
    gl.uniform1f(P.U.accentRim, colours.course ? 1 : 0); gl.uniform3fv(P.U.base, colours.base); gl.uniform3fv(P.U.acc1, colours.a1); gl.uniform3fv(P.U.acc2, colours.a2);
    gl.uniform1i(P.U.n, k); gl.uniform4fv(P.U.rects, rects.subarray(0, max * 4)); gl.uniform4fv(P.U.props, props.subarray(0, max * 4));
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    // the bars that float over the page: their patch of the canvas, inside them, above what scrolls beneath
    // copying the GPU canvas into a bar stalls the main thread on the GPU, so it happens only when the bar's glass looks
    // different: the bar moved or resized, the colours, theme, tier or canvas changed, or the light moved (at most ~20
    // times a second). A bar's glass refracts the page's light, not the cards scrolling under it, so plain scrolling
    // with the bar stuck in place copies nothing.
    const now = performance.now();
    for (const [e, r, i] of caps) {
      const c = e.querySelector(":scope > .lgl-cap"); if (!c) continue;
      const w = Math.max(1, Math.round(r.width * dpr)), h = Math.max(1, Math.round(r.height * dpr));
      const shape = Array.from(props.subarray(i * 4, i * 4 + 4), (v) => v.toFixed(2)).join(",");   // radius, rainbow, tint, bevel
      const key = `${Math.round(r.left * dpr)},${Math.round(r.top * dpr)},${w},${h},${W},${H},${capGen},${P.tier},${shape}`;
      const lit = `${light[0].toFixed(3)},${light[1].toFixed(3)}`;
      if (c.__key === key && c.__lit === lit) continue;
      // the light moved again within 50ms: skip this frame, but come back once the 50ms are up, so a bar never keeps a
      // stale highlight when the pointer stops
      if (c.__key === key && now - (c.__at || 0) < 50) { if (!capT) capT = setTimeout(() => { capT = 0; kick(); }, 50 - (now - c.__at) + 1); continue; }
      if (c.width !== w || c.height !== h) { c.width = w; c.height = h; }
      c.getContext("2d").drawImage(canvas, r.left * dpr, r.top * dpr, w, h, 0, 0, w, h);
      c.__key = key; c.__lit = lit; c.__at = now;
    }
    if (probing) sample();
    if (performance.now() < busyUntil) kick();
  };
  const kick = () => { if (!pending && live) { pending = true; raf = requestAnimationFrame(draw); } };
  const busy = (ms) => { busyUntil = Math.max(busyUntil, performance.now() + (reducedMotion.matches ? Math.min(ms, 120) : ms)); kick(); };

  // the speed check: the time between frames while drawing every frame, after the first few (driver warm-up) are
  // dropped. A gap while the tab was hidden isn't counted; a slow gap is (a GPU that slow must not keep running), and
  // if the frames haven't come in by the deadline, it's too slow. Nothing waits for the GPU to finish: the page is never blocked.
  const SKIP = 3, TAKE = 20, DEADLINE = 5000;
  let probing = false, remeasure = false, last = 0, seen = 0, gaps = [], since = 0;
  const probe = () => { remeasure = false; probing = true; last = 0; seen = 0; gaps = []; since = performance.now(); busyUntil = since + DEADLINE + 1000; kick(); };   // redraws of a still page: not motion
  const sample = () => {
    const t = performance.now();
    if (document.hidden) { last = 0; return; }
    if (last && ++seen > SKIP) gaps.push(t - last);
    last = t;
    // three very slow frames in a row: no need to wait for the rest, the lesson shouldn't feel it any longer
    const stalled = gaps.length >= 3 && gaps.slice(-3).every((g) => g > 3 * SLOW_MS);
    if (!stalled && gaps.length < TAKE && t - since < DEADLINE) return;
    probing = false;
    const ms = gaps.length < 3 ? Infinity : stalled ? median(gaps.slice(-3)) : median(gaps), next = nextTier(P.tier, ms, pref);
    window.gradifyGlass.frameMs = Math.round(ms * 10) / 10;
    if (next === P.tier) { status(P.tier, "measured " + window.gradifyGlass.frameMs + "ms a frame"); return; }
    if (next === "css") { status("css", `too slow here (${window.gradifyGlass.frameMs}ms a frame)`); return stop(); }
    tier = next; remeasure = true;   // a step-down in progress survives a lost context: the restore builds it and measures
    build(next).then(() => { if (stopped) return; dirty = true; status(next, `measuring (full tier was ${window.gradifyGlass.frameMs}ms a frame)`); probe(); }).catch((e) => { if (lost || gl.isContextLost()) return; status("css", "lite shader failed: " + e.message); stop(); });   // a lost context: onRestored takes over
  };

  const onScroll = () => kick();
  const onResize = () => { dirty = true; kick(); };
  const onHash = () => { dirty = true; busy(900); };
  const onMove = (e) => {
    if (reducedMotion.matches) return;   // the light stays put
    // the light sits towards the pointer, seen from the middle of the window
    const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5, l = Math.hypot(x, y) || 1;
    light = [x / l * .85 - .15, y / l * .85 - .25]; const m = Math.hypot(...light) || 1; light = [light[0] / m, light[1] / m]; kick();
  };
  const onVis = () => { if (document.hidden) return; if (probing) probe(); else kick(); };
  let mt = 0;
  const mo = new MutationObserver(() => { if (!live) return; clearTimeout(mt); mt = setTimeout(() => { dirty = true; busy(700); }, 60); });
  const to = new MutationObserver(() => { dirty = true; if (root.getAttribute("data-a-contrast") === "high") { status("css", "high contrast"); stop(); } else kick(); });
  // reduced transparency, more contrast or a bigger reading size chosen later: stop and hand back; any other reading
  // setting moves the boxes, so measure again once it has applied
  const onAccess = () => {
    if (root.getAttribute("data-a-contrast") === "high" || mqT.matches || mqC.matches || zoomed()) { status("css", "accessibility setting changed"); return stop(); }
    requestAnimationFrame(() => { dirty = true; busy(300); });
  };

  // the GPU can be taken away (a driver reset, too many contexts, the OS reclaiming memory): CSS glass meanwhile,
  // the same canvas and observers back when it returns
  const onLost = (e) => { e.preventDefault(); lost = true; lostCount++; P = null; root.classList.remove("lgl"); status("css", "GPU context lost; waiting for it back"); };
  // back from a lost context: rebuild the tier that last built; a speed check that was running starts afresh (downtime isn't slowness)
  const onRestored = () => { if (stopped) return; par = gl.getExtension("KHR_parallel_shader_compile"); build(tier).then(() => { if (stopped) return; lost = false; root.classList.add("lgl"); dirty = true; status(P.tier, "GPU context restored"); if (probing || remeasure) probe(); else kick(); }).catch(() => { if (!gl.isContextLost()) stop(); }); };

  function stop() {
    if (stopped) return; stopped = true;
    live = false; if (running === handle) running = null;   // never clear a newer instance
    clearTimeout(mt); clearTimeout(pollT); clearTimeout(capT); if (raf) cancelAnimationFrame(raf); probing = false;
    mqT.removeEventListener("change", onAccess); mqC.removeEventListener("change", onAccess);
    mo.disconnect(); to.disconnect(); root.classList.remove("lgl"); canvas.remove(); style.remove();
    document.querySelectorAll("[data-lg]").forEach((e) => { e.removeAttribute("data-lg"); e.removeAttribute("data-lg-cap"); });
    document.querySelectorAll(".lgl-cap").forEach((c) => c.remove());
    removeEventListener("scroll", onScroll, { capture: true }); removeEventListener("resize", onResize); removeEventListener("hashchange", onHash);
    removeEventListener("pointermove", onMove); removeEventListener("visibilitychange", onVis); document.removeEventListener("gradify:access", onAccess);
    canvas.removeEventListener("webglcontextlost", onLost); canvas.removeEventListener("webglcontextrestored", onRestored);
    els = [];
    if (root.dataset.glass !== "css") status("css", "stopped");
  }

  let stopped = false;
  const handle = running = { stop, redraw: () => { dirty = true; kick(); }, get tier() { return P ? P.tier : "css"; } };
  status("css", null, { pending: tier });   // CSS glass until the GPU program is ready
  build(tier).catch((e) => !stopped && tier === "webgl" ? build(tier = "webgl-lite") : Promise.reject(e)).then(() => {
    if (!running || stopped) return;
    document.head.appendChild(style); document.body.appendChild(canvas);
    canvas.addEventListener("webglcontextlost", onLost); canvas.addEventListener("webglcontextrestored", onRestored);
    addEventListener("scroll", onScroll, { passive: true, capture: true }); addEventListener("resize", onResize); addEventListener("hashchange", onHash);
    if (matchMedia("(pointer: fine)").matches) addEventListener("pointermove", onMove, { passive: true });
    addEventListener("visibilitychange", onVis); document.addEventListener("gradify:access", onAccess);
    mqT.addEventListener("change", onAccess); mqC.addEventListener("change", onAccess);
    mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "open", "hidden", "style"] });
    to.observe(root, { attributes: true, attributeFilter: ["data-theme", "data-a-contrast"] });
    if (root.getAttribute("data-a-contrast") === "high" || mqT.matches || mqC.matches || zoomed()) { status("css", "accessibility setting changed"); return stop(); }
    live = true; root.classList.add("lgl"); status(P.tier, "measuring");
    probe();   // entrance animations move things for a moment, and the speed check runs over the same frames
  }).catch((e) => { if (stopped) return; console.warn("Liquid Glass: falling back to CSS glass", e); status("css", "shader failed: " + e.message); stop(); });
  return running;
}
