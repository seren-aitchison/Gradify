// The public website is built from an allowlist (scripts/build-site.mjs). These tests make the deploy fail if a
// file that shouldn't be public would be published, or a file the site needs would be left out.
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile, mkdir, readFile, readdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { existsSync, readFileSync } from "node:fs";
import { PUBLISH, EXCLUDE, classify, workingTree, build, verify, references, cspFor, cspOf, withCsp, CSP_SCRIPT_HOSTS, CSP_ANALYTICS_HOSTS } from "../scripts/build-site.mjs";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";

// the tests check the working tree (committed files plus new ones), so local changes are validated before a commit
const tracked = () => workingTree();

const root = new URL("../", import.meta.url);
async function built() {
  const out = await mkdtemp(join(tmpdir(), "gradify-site-test-"));
  await build(out, { files: tracked() });
  return out;
}

test("every top-level entry in the repository is either published or deliberately left out", () => {
  const { unclassified } = classify(tracked());
  assert.deepEqual(unclassified, [], "add each to PUBLISH or EXCLUDE in scripts/build-site.mjs");
  for (const f of PUBLISH.files) assert.ok(tracked().includes(f), `${f} is allowlisted but not in the repository`);
});

test("the built site passes every check, and holds no documentation, scripts, migrations, tests or tooling", async () => {
  const out = await built();
  const { problems, files } = await verify(out, { files: tracked() });
  assert.deepEqual(problems, []);
  const top = await readdir(out);
  for (const name of Object.keys(EXCLUDE.top)) assert.ok(!top.includes(name), `${name} must not be published`);
  for (const f of EXCLUDE.inside) assert.ok(!existsSync(join(out, f)), `${f} must not be published`);
  assert.ok(existsSync(join(out, "kit", "vendor", "anatomy", "ATTRIBUTION.md")), "licences and attributions stay published");
  assert.ok(top.includes("index.html") && top.includes("CNAME") && top.includes("kit") && top.includes("lawgradify"));
  assert.equal(files, classify(tracked()).publish.length);
  await rm(out, { recursive: true });
});

test("every file the service worker keeps for offline use is published", async () => {
  const out = await built();
  const shell = references("sw.js", await readFile(new URL("sw.js", root), "utf8"));
  assert.ok(shell.length > 100);
  const have = new Set(classify(tracked()).publish);
  for (const p of shell.filter((x) => x !== "./")) assert.ok(have.has(p), `sw.js caches ${p}, which isn't published`);
  await rm(out, { recursive: true });
});

test("the checks catch an excluded file, an unlisted file, a missing asset and a planted credential", async () => {
  const out = await built();
  await mkdir(join(out, "docs"), { recursive: true });
  await writeFile(join(out, "docs", "BACKEND-LOG.md"), "internal");
  await writeFile(join(out, "notes.txt"), "stray");
  await mkdir(join(out, "kit", "templates", "subsite"), { recursive: true });
  await writeFile(join(out, "kit", "templates", "subsite", "index.html"), "<p>template</p>");
  await rm(join(out, "kit", "core", "site.js"));
  await writeFile(join(out, "kit", "planted.js"), `export const k = "${"sk-ant-"}${"x".repeat(24)}";`);
  const { problems } = await verify(out, { files: tracked() });
  const has = (re) => assert.ok(problems.some((p) => re.test(p)), `expected a problem matching ${re}:\n${problems.join("\n")}`);
  has(/excluded file published: docs\/BACKEND-LOG\.md/);
  has(/not in the allowlist: notes\.txt/);
  has(/excluded file published: kit\/templates\/subsite\/index\.html/);
  has(/missing: kit\/core\/site\.js/);
  has(/needs \.\.\/kit\/core\/site\.js, which is not published/);   // a sub-site page that imports it
  has(/kit\/planted\.js: looks like a Anthropic API key/);
  await rm(out, { recursive: true });
});

test("a new top-level folder nobody has decided about stops the build", async () => {
  const files = [...tracked(), "private-notes/plan.md"];
  assert.deepEqual(classify(files).unclassified, ["private-notes"]);
  await assert.rejects(build(join(tmpdir(), "never-written"), { files }), /not in the allowlist or the exclusions: private-notes/);
});

test("CI checks the build on every push and deploys only the allowlisted build", async () => {
  const ci = await readFile(new URL(".github/workflows/ci.yml", root), "utf8");
  const [testJob, deployJob] = ci.split(/\n  deploy:\n/);
  assert.match(testJob, /node scripts\/build-site\.mjs --check/);
  assert.match(deployJob, /node scripts\/build-site\.mjs "\$RUNNER_TEMP\/site"/);
  assert.doesNotMatch(deployJob, /rsync|cp -r|path: \.\s*$/m, "the deploy must not copy the repository wholesale");
  // the deploy waits for the signed-in journey too: a break only signed-in learners see can't go live
  assert.match(deployJob, /needs: \[test, signed-in\]/);
  assert.match(testJob, /\n  signed-in:\n[\s\S]*npx playwright install --with-deps chromium[\s\S]*node scripts\/check-sync\.cjs/);
});

test("the service worker precaches each file once and every file exists (a duplicate or a 404 stops it installing)", async () => {
  const { readFile: rf, access: ac } = await import("node:fs/promises");
  const src = await rf(new URL("../sw.js", import.meta.url), "utf8");
  const files = [...src.match(/const SHELL = \[([\s\S]*?)\n\];/)[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  const dupes = files.filter((f, i) => files.indexOf(f) !== i);
  assert.deepEqual(dupes, [], "duplicate precache entries");
  for (const f of files.filter((x) => x !== "./")) await ac(new URL(`../${f}`, import.meta.url));
});

test("local validation sees new files before they're committed, and not deleted or ignored ones", async () => {
  const dir = await mkdtemp(join(tmpdir(), "gradify-wt-"));
  const git = (...a) => execFileSync("git", a, { cwd: dir, encoding: "utf8" });
  git("init", "-q"); git("config", "user.email", "t@example.com"); git("config", "user.name", "t");
  await writeFile(join(dir, ".gitignore"), "secret.txt\n");
  await writeFile(join(dir, "old.html"), "x"); await writeFile(join(dir, "gone.html"), "x");
  git("add", "."); git("commit", "-q", "-m", "init");
  await rm(join(dir, "gone.html"));
  await writeFile(join(dir, "new.html"), "x"); await writeFile(join(dir, "secret.txt"), "x");
  assert.deepEqual(workingTree(dir), [".gitignore", "new.html", "old.html"]);
  await rm(dir, { recursive: true });
});

// ---------- Content-Security-Policy (written into every page by the build) ----------
const hashOf = (s) => `'sha256-${createHash("sha256").update(s, "utf8").digest("base64")}'`;

test("the CSP allows a page's own inline scripts and handlers by hash, and nothing injected", () => {
  const page = `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="x.css" media="print" onload="this.media='all'"><script type="module">import "./a.js";</script></head><body><script src="b.js"></script></body></html>`;
  const csp = cspFor(page), script = csp.split("; ").find((d) => d.startsWith("script-src "));
  assert.ok(script.includes(hashOf(`import "./a.js";`)), "the inline module is allowed by its hash");
  assert.ok(script.includes(hashOf("this.media='all'")), "the onload handler is allowed by its hash");
  assert.match(script, /'unsafe-hashes'/);
  assert.doesNotMatch(script, /'unsafe-inline'/, "inline script is never allowed wholesale");
  assert.equal(script.split(" ").filter((s) => s.startsWith("'sha256-")).length, 2, "b.js (an external script) adds no hash");
  for (const d of ["object-src 'none'", "base-uri 'self'", "default-src 'self'"]) assert.ok(csp.includes(d), d);
  // a page with no inline handlers doesn't need 'unsafe-hashes'
  assert.doesNotMatch(cspFor(`<head><script>1</script></head>`), /'unsafe-hashes'/);
  // pinned CDN packages only: a directory per exact version, never a whole host
  for (const h of CSP_SCRIPT_HOSTS) assert.match(h, /^https:\/\/cdn\.jsdelivr\.net\/npm\/[^/]+@v?\d+\.\d+\.\d+\/$/);
  // the only whole hosts are the consent-gated analytics ones, and exactly these
  assert.deepEqual(CSP_ANALYTICS_HOSTS, ["https://www.googletagmanager.com", "https://www.googleadservices.com", "https://googleads.g.doubleclick.net", "https://*.clarity.ms"]);
  for (const h of CSP_ANALYTICS_HOSTS) assert.ok(script.includes(h), h);
});

test("the CSP meta goes right after <meta charset>, and a page that already has one stops the build", () => {
  const out = withCsp(`<html><head><meta charset="utf-8"><title>t</title><script>go()</script></head></html>`);
  assert.match(out, /<meta charset="utf-8">\n {2}<meta http-equiv="Content-Security-Policy" content="[^"]+">\n?<title>/);
  assert.equal(cspOf(out), cspFor(out), "adding the meta doesn't change the policy the page needs");
  assert.throws(() => withCsp(out), /already has a CSP/);
  assert.throws(() => withCsp(`<p>no head</p>`), /no <head>/);
});

test("every built page carries a CSP that matches its inline scripts, and a page edited after the build is caught", async () => {
  const out = await built();
  try {
    const pages = (await readdir(out, { recursive: true })).filter((f) => f.endsWith(".html"));
    assert.ok(pages.length > 100);
    for (const f of pages) { const html = await readFile(join(out, f), "utf8"); assert.equal(cspOf(html), cspFor(html), f); }
    const f = join(out, "index.html");
    await writeFile(f, (await readFile(f, "utf8")).replace("</body>", "<script>alert(1)</script></body>"));
    const { problems } = await verify(out, { files: tracked() });
    assert.ok(problems.some((p) => /index\.html: its Content-Security-Policy doesn't match/.test(p)), problems.join("\n"));
  } finally { await rm(out, { recursive: true, force: true }); }
});

test("markup built in JavaScript has no inline event handlers (the CSP refuses them: use addEventListener)", () => {
  const offenders = [];
  for (const f of tracked().filter((x) => /^(kit|assets)\/.*\.js$/.test(x) && !x.startsWith("kit/vendor/"))) {
    const text = readFileSync(new URL(`../${f}`, import.meta.url), "utf8");
    for (const m of text.matchAll(/<[a-z][a-z0-9-]*\b[^<>`]*\son(click|load|error|change|input|submit|keydown|keyup|mouse[a-z]+|focus|blur)=["']/gi)) offenders.push(`${f}: ${m[0].slice(0, 80)}`);
  }
  assert.deepEqual(offenders, []);
});
