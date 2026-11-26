// The coverage commands run end to end, as a person runs them: `engine.mjs apply`, `engine.mjs refresh` and
// `gradify publish`, each in its own process with a time limit (a command that hangs fails here, as apply once did on a
// circular import). Everything they write goes under a temporary GRADIFY_OUT, never the repository, and the tests check
// the repository's map, reports and specification links are byte for byte unchanged.
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, cpSync, readFileSync, writeFileSync, existsSync, rmSync, readdirSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { REVIEW_COLUMNS } from "../scripts/curriculum/engine.mjs";

const repo = new URL("../", import.meta.url).pathname, FW = "aqa-gcse-biology";
const WATCH = ["kit/curriculum/maps/aqa-gcse-biology.json", "docs/curriculum/BIOLOGY-COVERAGE.md", "docs/curriculum/AQA-GCSE-BIOLOGY-8461.md", "kit/specs/aqa-gcse-biology-8461.links.js"];
const sha = (f) => createHash("sha1").update(readFileSync(join(repo, f))).digest("hex");
const before = Object.fromEntries(WATCH.map((f) => [f, sha(f)]));
const sandbox = () => mkdtempSync(join(tmpdir(), "gradify-cli-"));
const run = (out, args) => spawnSync(process.execPath, args, { cwd: repo, env: { ...process.env, GRADIFY_OUT: out }, encoding: "utf8", timeout: 180_000 });
const engine = (out, ...a) => run(out, ["scripts/curriculum/engine.mjs", ...a]);
const read = (out, f) => readFileSync(join(out, f), "utf8");
const undate = (t) => t.replace(/ on \d{4}-\d{2}-\d{2}\./, " on DATE.");
// every file a command wrote, relative to the sandbox
const files = (dir, base = dir) => readdirSync(dir).flatMap((n) => { const p = join(dir, n); return statSync(p).isDirectory() ? files(p, base) : [p.slice(base.length + 1)]; });
const repoUnchanged = () => { for (const f of WATCH) assert.equal(sha(f), before[f], `${f} in the repository was changed by a test`); };
const sheet = (rows) => [REVIEW_COLUMNS.join(","), ...rows.map((r) => REVIEW_COLUMNS.map((c) => { const v = String(r[c] ?? ""); return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v; }).join(","))].join("\n") + "\n";

test("refresh: rewrites every derived output from the map, and never writes a decision", () => {
  const out = sandbox(), r = engine(out, "refresh", FW);
  assert.equal(r.status, 0, r.stderr || "refresh hung or failed");
  // the map is unchanged, so the derived files are the repository's (dates aside)
  for (const f of WATCH.slice(1)) assert.equal(undate(read(out, f)), undate(readFileSync(join(repo, f), "utf8")), f);
  assert.deepEqual(files(out).sort(), WATCH.slice(1).sort(), "only derived outputs: no decisions, history or learner data written");
  repoUnchanged(); rmSync(out, { recursive: true, force: true });
});

test("refresh: a partial failure is loud and names what's stale; running it again recovers, decisions untouched", () => {
  const out = sandbox();
  writeFileSync(join(out, "kit"), "not a folder");   // the specification pages can't be written
  const r = engine(out, "refresh", FW);
  assert.equal(r.status, 2, "a stale output is an error, not a success");
  assert.match(r.stderr, /STALE COVERAGE/); assert.match(r.stderr, /specification page links/); assert.match(r.stderr, /engine\.mjs refresh aqa-gcse-biology/);
  assert.ok(existsSync(join(out, "docs/curriculum/AQA-GCSE-BIOLOGY-8461.md")), "the other outputs were still written");
  rmSync(join(out, "kit"));
  const again = engine(out, "refresh", FW);
  assert.equal(again.status, 0, again.stderr);
  assert.equal(read(out, WATCH[3]), readFileSync(join(repo, WATCH[3]), "utf8"), "the pages are recovered");
  assert.ok(!existsSync(join(out, WATCH[0])), "refresh never writes the map");
  repoUnchanged(); rmSync(out, { recursive: true, force: true });
});

test("apply then revoke: a person's decision reaches every derived view, and its revocation removes it everywhere", () => {
  const out = sandbox(), csv = join(out, "review.csv");
  const row = { ref: "4.1.2.1.a", lessons: "u02-09", reviewer: "A Reviewer", reviewed_on: "2026-11-26" };
  writeFileSync(csv, sheet([{ ...row, decision: "full", note: "section 2 teaches every part" }]));
  const r = engine(out, "apply", FW, csv);
  assert.equal(r.status, 0, r.stderr || "apply hung or failed");
  const map = JSON.parse(read(out, WATCH[0]));
  assert.equal(map.links["4.1.2.1.a"].status, "verified"); assert.equal(map.links["4.1.2.1.a"].reviewer, "A Reviewer");
  assert.match(read(out, WATCH[2]), /^\| 1 \| 0 \| 0 \| 474 \|$/m, "the specification's report counts it");
  assert.match(read(out, WATCH[3]), /"4\.1\.2\.1": \{[^}]*"evidence": "verified"/, "the specification pages show it");
  // revoked: out of every count and page, the history kept
  writeFileSync(csv, sheet([{ ...row, decision: "revoke", note: "the lesson never covers genes", reviewer: "B Reviewer" }]));
  const v = engine(out, "apply", FW, csv);
  assert.equal(v.status, 0, v.stderr);
  const after = JSON.parse(read(out, WATCH[0])).links["4.1.2.1.a"];
  assert.equal(after.status, "proposed"); assert.equal(after.revoked[0].was.reviewer, "A Reviewer"); assert.equal(after.revoked[0].why, "the lesson never covers genes");
  assert.match(read(out, WATCH[2]), /^\| 0 \| 0 \| 0 \| 475 \|$/m, "the report no longer counts it");
  assert.equal(read(out, WATCH[3]), readFileSync(join(repo, WATCH[3]), "utf8"), "the pages are back to the repository's");
  repoUnchanged(); rmSync(out, { recursive: true, force: true });
});

test("publish: the command runs to the end (its modules load without a circular wait)", () => {
  // publish reads and extends the course's own files, so the sandbox starts with copies of them
  const out = sandbox(); mkdirSync(join(out, "kit/courses/biology"), { recursive: true });
  for (const f of ["syllabus.js", "ids.js", "qa.js", "course.js", "published.js"]) cpSync(join(repo, "kit/courses/biology", f), join(out, "kit/courses/biology", f));
  const r = run(out, ["scripts/gradify.mjs", "publish", "biology"]);
  assert.equal(r.status, 0, r.stderr || "publish hung or failed");
  repoUnchanged(); rmSync(out, { recursive: true, force: true });
});
