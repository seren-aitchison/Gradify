// Is the Gradify backend actually working? Runs the end-to-end check in kit/data/backend-check.js
// from your own computer (Supabase isn't reachable from every network).
//
//   node scripts/verify-backend.mjs                     uses gradify.config.js
//   GRADIFY_SUPABASE_URL=https://xyz.supabase.co GRADIFY_SUPABASE_ANON_KEY=eyJ... node scripts/verify-backend.mjs
//                                                       test a project before putting it in the config
// Options (environment variables):
//   GRADIFY_TEST_EMAIL / GRADIFY_TEST_PASSWORD          test learner A (create in Supabase: Authentication →
//   GRADIFY_TEST_EMAIL_B / GRADIFY_TEST_PASSWORD_B      Users → Add user, "Auto confirm"); B checks isolation
//   --site https://getgradify.com                       also check the deployed site's gradify.config.js
//   --ai                                                also ask Claude for one flashcard (about a cent)
//   --write                                             record the result in docs/BACKEND-STATUS.md
// Only the public anon key is ever used. A service_role key is refused.
import { readFile, writeFile, access } from "node:fs/promises";
import { checkBackend, parseConfig, TABLES } from "../kit/data/backend-check.js";

const root = new URL("../", import.meta.url);
const arg = (k) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
const flag = (k) => process.argv.includes(k);
const env = process.env;

const local = parseConfig(await readFile(new URL("gradify.config.js", root), "utf8"));
const url = env.GRADIFY_SUPABASE_URL || local.url, anonKey = env.GRADIFY_SUPABASE_ANON_KEY || local.anonKey;
const accounts = [[env.GRADIFY_TEST_EMAIL, env.GRADIFY_TEST_PASSWORD], [env.GRADIFY_TEST_EMAIL_B, env.GRADIFY_TEST_PASSWORD_B]].filter(([e, p]) => e && p).map(([email, password]) => ({ email, password }));

const MARK = { true: "✓", false: "✗", null: "–" };
const steps = [];
const show = (s) => { steps.push(s); console.log(`  ${MARK[s.ok]} ${s.label}${s.detail ? `: ${s.detail}` : ""}`); };

// 1. code: in the repository
console.log("1 Code in the repository");
const files = [...Object.keys(TABLES).map((m) => `supabase/migrations/${m}.sql`), "supabase/functions/study-pack/index.ts", "kit/data/store.js"];
const absent = [];
for (const f of files) if (!(await access(new URL(f, root)).then(() => true, () => false))) absent.push(f);
show({ stage: 1, id: "code", label: "Migrations, study-pack function and cloud store exist", ok: absent.length === 0, detail: absent.length ? `missing ${absent.join(", ")}` : `${files.length} files` });

// 3. the deployed site's config
let siteConfig = null;
const site = arg("--site");
if (site) {
  try {
    const r = await fetch(`${site.replace(/\/+$/, "")}/gradify.config.js`, { cache: "no-store" });
    siteConfig = r.ok ? { ...parseConfig(await r.text()), where: site } : { url: "", anonKey: "", where: `${site} (HTTP ${r.status})` };
  } catch (e) { siteConfig = { url: "", anonKey: "", where: `${site} (unreachable: ${e.message})` }; }
} else if (!env.GRADIFY_SUPABASE_URL) siteConfig = { ...local, where: "gradify.config.js in this checkout" };

let stage = 1;
const { summary } = await checkBackend({
  url, anonKey, siteConfig, accounts, ai: flag("--ai"),
  onStep: (s) => { if (s.stage !== stage) { stage = s.stage; console.log(`${s.stage} ${["", "", "Supabase project", "Site connected", "Accounts and saving", "Gradify AI"][s.stage]}`); } show(s); },
});
summary[1] = absent.length ? "failing" : "working";

const NAMES = { 1: "Backend code in the repository", 2: "Supabase project exists and is set up", 3: "Deployed site connected to it", 4: "Accounts and saving work in production", 5: "AI function deployed and answering" };
console.log("\nSummary");
for (const n of [1, 2, 3, 4, 5]) console.log(`  ${n}. ${NAMES[n]}: ${summary[n]}`);

if (flag("--write")) {
  const day = new Date().toISOString().slice(0, 10);
  const block = `<!-- verify:start -->
Last run: ${day}, \`node scripts/verify-backend.mjs${process.argv.slice(2).length ? ` ${process.argv.slice(2).join(" ")}` : ""}\`, against ${url ? url.replace(/^https?:\/\//, "") : "no project"}${accounts.length ? ` with ${accounts.length} test account${accounts.length > 1 ? "s" : ""}` : ", no test accounts"}.

| | Question | Result |
|---|---|---|
${[1, 2, 3, 4, 5].map((n) => `| ${n} | ${NAMES[n]} | **${summary[n]}** |`).join("\n")}

| Check | Result | Detail |
|---|---|---|
${steps.map((s) => `| ${s.label} | ${MARK[s.ok]} | ${String(s.detail || "").replace(/\|/g, "/")} |`).join("\n")}
<!-- verify:end -->`;
  const docUrl = new URL("docs/BACKEND-STATUS.md", root);
  const doc = await readFile(docUrl, "utf8");
  await writeFile(docUrl, doc.replace(/<!-- verify:start -->[\s\S]*<!-- verify:end -->/, block));
  console.log("\nRecorded in docs/BACKEND-STATUS.md");
}
if (steps.some((s) => s.ok === false)) process.exitCode = 1;
