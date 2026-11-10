// The public website is built from an allowlist (scripts/build-site.mjs). These tests make the deploy fail if a
// file that shouldn't be public would be published, or a file the site needs would be left out.
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile, mkdir, readFile, readdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { existsSync } from "node:fs";
import { PUBLISH, EXCLUDE, classify, workingTree, build, verify, references } from "../scripts/build-site.mjs";
import { execFileSync } from "node:child_process";

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
  assert.match(deployJob, /needs: test/);
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
