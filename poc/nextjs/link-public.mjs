// The PoC serves the existing site's files unchanged: public/ links to the repository's kit/, assets/ and root files,
// so the Next pages load exactly the modules the static pages load (and `next build` copies them into out/).
import { mkdirSync, symlinkSync, rmSync } from "node:fs";
import { resolve } from "node:path";
mkdirSync("public", { recursive: true });
for (const f of ["kit", "assets", "sw.js", "gradify.config.js", "manifest.webmanifest"]) {
  rmSync(`public/${f}`, { force: true, recursive: false });
  symlinkSync(resolve("../..", f), `public/${f}`);
}
