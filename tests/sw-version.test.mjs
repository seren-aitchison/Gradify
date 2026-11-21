// Each deploy's service worker has its own cache (sw.js): the site build stamps CACHE with a hash of what it published,
// and only a stamped worker serves from the cache first.
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile, readFile, copyFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { stampServiceWorker } from "../scripts/build-site.mjs";

test("the build stamps the service worker's cache with the deploy's version", async () => {
  const dir = await mkdtemp(join(tmpdir(), "gradify-sw-"));
  await copyFile(new URL("../sw.js", import.meta.url), join(dir, "sw.js"));
  await stampServiceWorker(dir, "0123456789ab");
  const out = await readFile(join(dir, "sw.js"), "utf8");
  assert.match(out, /const CACHE = "gradify-v\d+-0123456789ab";/);
  // the stamp is what switches cache-first serving on
  assert.match(out, /const DEPLOYED = \/-\[0-9a-f\]\{12\}\$\/\.test\(CACHE\);/);
});

test("a service worker without a CACHE name to stamp stops the build", async () => {
  const dir = await mkdtemp(join(tmpdir(), "gradify-sw-"));
  await writeFile(join(dir, "sw.js"), "// no cache here\n");
  await assert.rejects(stampServiceWorker(dir, "0123456789ab"), /no CACHE name/);
});

test("unstamped (the repository as it is, local development), the worker asks the server first", async () => {
  const src = await readFile(new URL("../sw.js", import.meta.url), "utf8");
  assert.match(src, /const CACHE = "gradify-v\d+";/);
  assert.match(src, /const hit = DEPLOYED && await cache\.match/);
});
