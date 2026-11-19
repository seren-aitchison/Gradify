// Turn the 4K Cycles renders (scripts/blender/render-previews.py) into the preview images the site loads:
// kit/models/previews/<model>-{960,1920,3840}.{avif,webp}, plus <model>.webp (1920 wide) for older links.
//   node scripts/blender/encode-previews.mjs <render dir> [sharp module path]
import { readdir } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
const [dir, sharpPath = "sharp"] = process.argv.slice(2);
const sharp = createRequire(import.meta.url)(sharpPath);
const out = new URL("../../kit/models/previews/", import.meta.url).pathname;
for (const f of (await readdir(dir)).filter((f) => f.endsWith(".png"))) {
  const name = f.replace(".png", ""), src = path.join(dir, f);
  for (const w of [960, 1920, 3840]) {
    const img = () => sharp(src).resize({ width: w, withoutEnlargement: true });
    await img().avif({ quality: w >= 3840 ? 50 : 55, effort: 6 }).toFile(`${out}${name}-${w}.avif`);
    await img().webp({ quality: w >= 3840 ? 78 : 82, effort: 6 }).toFile(`${out}${name}-${w}.webp`);
  }
  await sharp(src).resize({ width: 1920 }).webp({ quality: 82, effort: 6 }).toFile(`${out}${name}.webp`);
  console.log(name);
}
