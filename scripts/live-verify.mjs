// The live verification stage of the controlled deployment, run after the backup and migrations:
//   1 create two throwaway test accounts (scripts/supabase-admin.mjs createTestAccounts: passwords made in memory,
//     never shown or stored) and prove each can sign in
//   2 the backend check (kit/data/backend-check.js): project, schema, the isolation matrix on every learner table
//     (read, change, delete and forged create by the other learner; signed-out reads), XP guard, sign-out, and
//     with --ai both AI functions answering for real
//   3 the live student journey in a browser (scripts/check-live.cjs), each flow reported separately
//   4 ALWAYS, even after a failure: delete both test accounts and confirm they are gone
//   GRADIFY_SUPABASE_URL=https://<ref>.supabase.co GRADIFY_SUPABASE_ANON_KEY=… \
//   node scripts/live-verify.mjs <ref> [--ai] [--site https://getgradify.com] [--write]
// Needs the Management API (for creating and deleting the test accounts) and the project's host.
import { spawn } from "node:child_process";
import { appendFile } from "node:fs/promises";
import { client, createTestAccounts, deleteTestAccounts } from "./supabase-admin.mjs";
import { checkBackend } from "../kit/data/backend-check.js";

const [ref, ...rest] = process.argv.slice(2), flag = (k) => rest.includes(k), arg = (k) => { const i = rest.indexOf(k); return i >= 0 ? rest[i + 1] : null; };
const url = (process.env.GRADIFY_SUPABASE_URL || "").replace(/\/+$/, ""), anonKey = process.env.GRADIFY_SUPABASE_ANON_KEY || "";
const site = arg("--site"), ai = flag("--ai"), write = flag("--write");
if (!url || !anonKey) { console.error("Set GRADIFY_SUPABASE_URL and GRADIFY_SUPABASE_ANON_KEY (both public)."); process.exit(2); }
const c = client(ref);
const log = [], say = (l) => { log.push(l); console.log(l); };
let accounts = [], failed = false;

try {
  say("1 Test accounts");
  accounts = await createTestAccounts(c, 2);
  for (const a of accounts) {
    const r = await fetch(`${url}/auth/v1/token?grant_type=password`, { method: "POST", headers: { apikey: anonKey, "Content-Type": "application/json" }, body: JSON.stringify({ email: a.email, password: a.password }) });
    const ok = r.ok; await r.text();
    say(`  ${ok ? "✓" : "✗"} ${a.email} can sign in${ok ? "" : ` (HTTP ${r.status}): creating accounts by SQL doesn't match this project's auth schema`}`);
    if (!ok) throw new Error("a test account couldn't sign in; stopping before any checks");
  }

  say("2 Backend check");
  const origin = site ? new URL(site).origin : "https://getgradify.com";
  const { steps, summary } = await checkBackend({ url, anonKey, accounts: accounts.map(({ email, password }) => ({ email, password })), ai, origin });
  for (const s of steps) say(`  ${s.ok === true ? "✓" : s.ok === false ? "✗" : "–"} ${s.label}${s.detail ? `: ${s.detail}` : ""}`);
  if (steps.some((s) => s.ok === false)) failed = true;
  say(`  Summary: project ${summary[2]}, accounts ${summary[4]}, AI ${summary[5]}`);

  if (site) {
    say("3 Live student journey");
    const code = await new Promise((done) => {
      const child = spawn(process.execPath, [new URL("./check-live.cjs", import.meta.url).pathname, ...(ai ? ["--ai"] : []), ...(write ? ["--write"] : [])], {
        stdio: ["ignore", "inherit", "inherit"],
        // the test password reaches the browser check only through its environment, never a file or the screen
        env: { ...process.env, BASE: site, GRADIFY_SUPABASE_URL: url, GRADIFY_SUPABASE_ANON_KEY: anonKey, GRADIFY_TEST_EMAIL: accounts[0].email, GRADIFY_TEST_PASSWORD: accounts[0].password },
      });
      child.on("exit", done);
    });
    if (code !== 0) failed = true;
    say(`  Live student journey ${code === 0 ? "passed" : "FAILED (details above, and in BACKEND-LOG.md)"}`);
  }
} catch (e) { failed = true; say(`  ✗ Stopped: ${e.message}`); }
finally {
  say("4 Clean-up");
  try {
    const left = await deleteTestAccounts(c, accounts);
    say(`  ${left === 0 ? "✓" : "✗"} ${accounts.length} test accounts deleted${left ? `; ${left} STILL PRESENT: delete them in Authentication → Users` : ", confirmed gone (their rows were removed with them)"}`);
    if (left) failed = true;
  } catch (e) { failed = true; say(`  ✗ Couldn't delete the test accounts (${e.message}): delete ${accounts.map((a) => a.email).join(", ")} in Authentication → Users`); }
  for (const a of accounts) a.password = null;
  if (write) await appendFile(new URL("../docs/BACKEND-LOG.md", import.meta.url), `\n## ${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC · Live verification · ${ref}\n\n\`\`\`\n${log.join("\n")}\n\`\`\`\n`);
  process.exitCode = failed ? 1 : 0;
}
