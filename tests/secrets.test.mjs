// No privileged credential may ever be committed, in site code or anywhere else in the repository. Runs in CI
// before every deploy, so a leaked key stops the site being published. What's allowed: the Supabase project
// URL and its public anon (or publishable) key in gradify.config.js, which row-level security makes safe.
import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { keyKind } from "../kit/data/backend-check.js";
import { SECRET_PATTERNS } from "../scripts/build-site.mjs";

const root = new URL("../", import.meta.url);
const files = execFileSync("git", ["ls-files", "-z"], { cwd: root, encoding: "utf8" }).split("\0").filter(Boolean)
  .filter((f) => !/\.(png|jpe?g|gif|webp|glb|gltf|bin|ico|woff2?|ttf|pdf|mp4|wasm)$/i.test(f));

// the same patterns the site build refuses to publish (scripts/build-site.mjs)
const PATTERNS = SECRET_PATTERNS;
const JWT = /eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/g;

test("no privileged credential is committed anywhere in the repository", async () => {
  const found = [];
  for (const f of files) {
    let text; try { text = await readFile(new URL(f, root), "utf8"); } catch { continue; }
    for (const [name, re] of PATTERNS) if (re.test(text)) found.push(`${f}: ${name}`);
    // a JWT is only allowed if it is a public anon key, and only in the site config
    for (const jwt of text.match(JWT) || []) {
      const kind = keyKind(jwt);
      if (kind === "secret") found.push(`${f}: service_role JWT`);
      else if (f !== "gradify.config.js") found.push(`${f}: a JWT outside gradify.config.js (${kind})`);
    }
  }
  assert.deepEqual(found, [], `remove these and rotate the credentials:\n${found.join("\n")}`);
});

test("the site config holds only the public project URL and anon key", async () => {
  const src = await readFile(new URL("gradify.config.js", root), "utf8");
  const key = (src.match(/SUPABASE_ANON_KEY\s*=\s*["'`]([^"'`]*)["'`]/) || [])[1] ?? "";
  assert.ok(key === "" || ["anon", "publishable"].includes(keyKind(key)), "gradify.config.js must only ever hold the anon (publishable) key");
  assert.doesNotMatch(src, /service_role|ANTHROPIC|sk-ant/i);
});

// The only functions allowed the service role, and why. Subscriptions have no learner write policy on purpose:
// Stripe's webhook has no signed-in learner, and checkout links a learner to their Stripe customer, which a learner
// must never be able to set themselves. Adding to this list needs the same justification.
// The AI functions use it only for the Gradify AI usage ledger (ai_claim_for / ai_settle_for / the response cache), which
// learners must not be able to write: everything else they do (sign-in, saved packs) uses the learner's own token.
const SERVICE_ROLE_ALLOWED = new Set(["supabase/functions/billing-webhook/index.ts", "supabase/functions/billing-checkout/index.ts",
  "supabase/functions/course-tutor/index.ts", "supabase/functions/study-pack/index.ts"]);

test("server functions act as the signed-in learner, never with the service role (billing writes excepted)", async () => {
  for (const f of files.filter((x) => x.startsWith("supabase/functions/") && /\.(ts|js)$/.test(x))) {
    if (SERVICE_ROLE_ALLOWED.has(f)) continue;
    const src = await readFile(new URL(f, root), "utf8");
    assert.doesNotMatch(src, /SERVICE_ROLE/, `${f} must not use the service-role key: row-level security has to apply to every query`);
  }
  for (const f of SERVICE_ROLE_ALLOWED) {
    const src = await readFile(new URL(f, root), "utf8");
    // even these identify the learner from their own token, never from the request body
    if (f.includes("checkout")) assert.match(src, /auth\.getUser\(\)/, `${f} must identify the learner from their token`);
    // handleStripeEvent verifies the signature before anything else (tests/billing-lifecycle.test.mjs)
    if (f.includes("webhook")) assert.match(src, /handleStripeEvent|verifyStripeEvent/, `${f} must verify Stripe's signature before writing`);
    if (f.includes("tutor") || f.includes("study-pack")) {
      assert.match(src, /auth\.getUser\(\)/, `${f} must identify the learner from their token`);
      // the service-role client is handed to the ledger and used for nothing else
      const uses = [...src.matchAll(/\badmin\b/g)].length, allowed = [...src.matchAll(/const admin = createClient|ledger\(admin, user\.id\)/g)].length;
      assert.equal(uses, allowed, `${f} may use the service role only through ledger(admin, user.id)`);
    }
  }
});

test("browser code never reads server-only secrets", async () => {
  for (const f of files.filter((x) => /^(kit|assets)\/.*\.js$/.test(x) || /\.html$/.test(x))) {
    const src = await readFile(new URL(f, root), "utf8");
    assert.doesNotMatch(src, /ANTHROPIC_API_KEY|Deno\.env|process\.env\.(ANTHROPIC|SUPABASE_SERVICE)/, `${f} references a server-only secret`);
  }
});
