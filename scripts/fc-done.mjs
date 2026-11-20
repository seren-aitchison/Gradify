// Commit gate for the "10 more flashcards per lesson" run (docs/FLASHCARD-QUALITY.md).
// node scripts/fc-done.mjs <notes file> [--check-only]
// Runs the structural checker and the heuristic audit on one file. If every lesson has its 10 cards, the
// checker passes and the audit has no blocking flags, commits that file alone and pushes the branch.
// Retries on git lock and push races, since several writers share one checkout.
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const [file, flag] = process.argv.slice(2);
if (!file) { console.error("usage: node scripts/fc-done.mjs <notes file> [--check-only]"); process.exit(2); }
const dir = mkdtempSync(join(tmpdir(), "fc-done-"));
const run = (script, extra) => spawnSync("node", [script, ...extra, file], { encoding: "utf8" });

const c = run("scripts/check-flashcard-additions.mjs", ["--json", join(dir, "c.json")]);
const cr = JSON.parse(readFileSync(join(dir, "c.json"), "utf8")).results[0];
const a = run("scripts/audit-flashcard-quality.mjs", ["--out", dir, "--sample", "0"]);
const flags = JSON.parse(readFileSync(join(dir, "flags.json"), "utf8"));
const BLOCK = /^(yes-no|list-count|too-thin)/;
const blocking = flags.filter((x) => x.flags.some((k) => BLOCK.test(k)));
const review = flags.filter((x) => !x.flags.some((k) => BLOCK.test(k)));

console.log(`${file}: ${cr.status}, ${cr.done}/${cr.lessons} lessons at 10, ${cr.added} new cards`);
for (const e of cr.errors) console.log("  CHECKER: " + e);
for (const x of blocking) console.log(`  BLOCKING ${x.id} [${x.flags.join("; ")}]\n    Q: ${x.q} | ${x.a}`);
for (const x of review) console.log(`  REVIEW   ${x.id} [${x.flags.join("; ")}]\n    Q: ${x.q} | ${x.a}`);
if (c.status === null || a.status !== 0) { console.log(a.stderr); process.exit(1); }
if (cr.status !== "complete" || blocking.length) { console.log("NOT COMMITTED: fix the above first."); process.exit(1); }
if (flag === "--check-only") { console.log("PASSES (check only, not committed)."); process.exit(0); }

const git = (...x) => execFileSync("git", x, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
const sleep = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
for (let i = 0; ; i++) {
  try {
    git("add", "--", file);
    git("commit", "-q", "-m", `Notes: 10 more flashcards per lesson, ${file.replace("kit/courses/", "")}\n\n${cr.lessons} lessons, ${cr.added} new cards; passes check-flashcard-additions and the quality audit gate.\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_0183yzNBbPAoibnEn3B5Qose`, "--", file);
    break;
  } catch (e) {
    const msg = String(e.stderr || e.message);
    if (/nothing to commit|no changes added/.test(msg)) { console.log("already committed"); break; }
    if (i > 20) { console.log("COMMIT FAILED: " + msg); process.exit(1); }
    sleep(500 + Math.random() * 2000);
  }
}
console.log("COMMITTED " + git("log", "-1", "--format=%h").trim());
for (let i = 0; i < 4; i++) {
  try { git("push", "-q", "origin", "HEAD:claude/funny-johnson-jzpit1"); console.log("pushed"); break; }
  catch (e) { if (i === 3) console.log("push failed (commit is safe locally; the lead will push): " + String(e.stderr).slice(0, 200)); sleep(2000 * 2 ** i); }
}
