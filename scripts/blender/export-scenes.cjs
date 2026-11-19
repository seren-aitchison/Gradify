// Export every 3D model's live three.js scene (as built by kit/models/viewer.js, with the HD anatomy) and its
// default camera, for scripts/blender/render-previews.py to render in Cycles.
//   node scripts/blender/export-scenes.cjs <out dir> <path to three@0.169.0 package> [model file ...]
// Needs the site served on localhost:8080 (npm run serve).
const { chromium } = require("playwright");
const fs = require("fs"), path = require("path");
(async () => {
  const [out, threePkg, ...only] = process.argv.slice(2);
  // three's examples/jsm served under /__jsm/, with "three" pointed at the site's own copy
  const jsm = (rel) => fs.readFileSync(path.join(threePkg, "examples/jsm", rel), "utf8").replace(/from 'three'/g, "from '/kit/vendor/three/three.module.min.js'");
  const index = fs.readFileSync(path.join(__dirname, "../../kit/models/index.js"), "utf8");
  const models = {}; for (const [, site, file] of index.matchAll(/(\w+Gradify): \{ file: "(\w+\.js)"/g)) models[file] ||= site.toLowerCase();
  const b = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
  fs.mkdirSync(out, { recursive: true });
  for (const [file, site] of Object.entries(models)) {
    if (only.length && !only.includes(file)) continue;
    if (!only.length && fs.existsSync(path.join(out, file.replace(".js", ".glb")))) continue;   // already exported (name it to redo it)
    try {
    const p = await (await b.newContext({ viewport: { width: 1600, height: 900 }, serviceWorkers: "block", acceptDownloads: true })).newPage();   // routes don't see requests a service worker answers
    await p.route("**/__jsm/**", (r) => r.fulfill({ body: jsm(new URL(r.request().url()).pathname.replace("/__jsm/", "")), contentType: "text/javascript" }));
    await p.addInitScript(() => { window.addEventListener("gradify:anatomy-hd", () => { window.__hd = true; }); });
    p.on("pageerror", (e) => console.log("error", file, e.message));
    p.on("console", (m) => { if (/^exported|rror/.test(m.text())) console.log(file, m.text().slice(0, 200)); });
    await p.goto(`http://localhost:8080/${site}/3d.html?hd=1&quality=high`);
    await p.waitForFunction(() => document.querySelector(".mv-canvas")?.mv, null, { timeout: 300000 });
    if (await p.evaluate(() => [...document.querySelectorAll("script")].some((s) => s.textContent.includes("anatomy")) || !!document.querySelector(".mv-canvas").mv.parts.skull || !!document.querySelector(".mv-canvas").mv.parts.mandible))
      await p.waitForFunction(() => window.__hd, null, { timeout: 300000 }).catch(() => console.log("no HD layer for", file));
    await p.waitForTimeout(1500);
    const dl = p.waitForEvent("download", { timeout: 900000 });
    const info = await p.evaluate(async () => {
      const { GLTFExporter } = await import("/__jsm/exporters/GLTFExporter.js");
      const mv = document.querySelector(".mv-canvas").mv, cam = mv.camera;
      mv.state.motion = false; mv.state.labels = false;
      // the whole scene graph (so parts keep their groups' transforms), minus what a Cycles still doesn't want:
      // three's lights (Blender gets its own studio), labels, points and lines
      const hidden = []; mv.scene.traverse((o) => { if (o.visible && (o.isLight || o.isSprite || o.isPoints || o.isLine)) { o.visible = false; hidden.push(o); } });
      let keep = 0; mv.scene.traverseVisible((o) => { if (o.isMesh) keep++; });
      const t0 = performance.now(), res = await new GLTFExporter().parseAsync(mv.scene, { binary: true, onlyVisible: true, maxTextureSize: 2048 });
      hidden.forEach((o) => { o.visible = true; });
      console.log("exported", keep, "meshes in", Math.round(performance.now() - t0), "ms,", res.byteLength, "bytes");
      const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([res])); a.download = "scene.glb"; document.body.append(a); a.click();   // streamed to disk by Playwright
      return { pos: cam.position.toArray(), target: mv.controls.target.toArray(), fov: cam.fov, meshes: keep };
    });
    const target = path.join(out, file.replace(".js", ".glb"));
    await (await dl).saveAs(target);
    fs.writeFileSync(path.join(out, file.replace(".js", ".json")), JSON.stringify(info));
    console.log(file, info.meshes, "meshes", (fs.statSync(target).size / 1e6).toFixed(1), "MB");
    await p.close();
    } catch (e) { console.log("failed", file, e.message.split("\n")[0]); }   // one model failing doesn't stop the rest
  }
  await b.close();
})();
