// Turn the 4K Cycles renders (scripts/blender/render-previews.py) into the preview images the site loads:
// kit/models/previews/<model>-{960,1920,3840}.{avif,webp}, plus <model>.webp (1920 wide) for older links.
//   node scripts/blender/encode-previews.mjs <render dir> [sharp module path] [out dir] [widths]
// The molecule pipeline (scripts/visuals/build.py) uses the same encoder, so every Blender still on Gradify comes in
// the same formats and sizes: it passes its own out dir (kit/visuals/molecules) and widths ("960,1920").
import { readdir } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
const [dir, sharpPath = "sharp", outDir, widthList] = process.argv.slice(2);
const sharp = createRequire(import.meta.url)(sharpPath);
const out = outDir ? `${path.resolve(outDir)}/` : new URL("../../kit/models/previews/", import.meta.url).pathname;
const widths = widthList ? widthList.split(",").map(Number) : [960, 1920, 3840];
for (const f of (await readdir(dir)).filter((f) => f.endsWith(".png"))) {
  const name = f.replace(".png", ""), src = path.join(dir, f);
  for (const w of widths) {
    const img = () => sharp(src).resize({ width: w, withoutEnlargement: true });
    await img().avif({ quality: w >= 3840 ? 50 : 55, effort: 6 }).toFile(`${out}${name}-${w}.avif`);
    await img().webp({ quality: w >= 3840 ? 78 : 82, effort: 6 }).toFile(`${out}${name}-${w}.webp`);
  }
  if (!outDir) await sharp(src).resize({ width: 1920 }).webp({ quality: 82, effort: 6 }).toFile(`${out}${name}.webp`);
  console.log(name);
}
