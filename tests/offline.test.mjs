// The app and the homepage open offline: every module they import before they draw (their static import graph)
// is in the service worker's offline list (sw.js SHELL). A module missing from the list fails the whole app offline,
// as kit/game/journey.js once did. Imports made later, on demand (import("…")), load when online and aren't needed.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const STATIC = /(?:^|\n)\s*(?:import|export)\s[^"';]*?from\s*["']([^"']+)["']|(?:^|\n)\s*import\s*["']([^"']+)["']/g;

async function graph(entry) {
  const seen = new Set(), todo = [entry];
  while (todo.length) {
    const f = todo.pop(); if (seen.has(f)) continue; seen.add(f);
    const src = await readFile(new URL(f, root), "utf8");
    for (const m of src.matchAll(STATIC)) {
      const spec = m[1] || m[2]; if (!spec.startsWith(".") && !spec.startsWith("/")) continue;
      const u = spec.startsWith("/") ? new URL(`.${spec}`, root) : new URL(spec, new URL(f, root));
      todo.push(u.pathname.replace(new URL(root).pathname, ""));
    }
  }
  return [...seen];
}
const scriptsOf = async (page) => [...(await readFile(new URL(page, root), "utf8")).matchAll(/<script[^>]+type="module"[^>]+src="([^"]+)"/g)].map((m) => m[1].replace(/^\.?\//, ""));

test("everything the app and the homepage import is kept for offline use", async () => {
  const sw = await readFile(new URL("sw.js", root), "utf8");
  const shell = new Set([...sw.match(/const SHELL = \[([\s\S]*?)\n\];/)[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]));
  for (const page of ["app.html", "index.html"]) {
    for (const entry of await scriptsOf(page)) {
      for (const f of await graph(entry)) assert.ok(shell.has(f), `${page} needs ${f} (via ${entry}), which sw.js doesn't keep for offline use`);
    }
  }
});
