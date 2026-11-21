// Deploy Edge Functions through the Supabase Management API (what `supabase functions deploy` does), from this checkout.
//   NODE_USE_ENV_PROXY=1 node scripts/deploy-functions.mjs billing-checkout billing-portal calendar-sync
// Uploads each function's index.ts and the _shared files it imports, under their repository paths, keeps the function's
// verify_jwt setting as it is in production, then reads the function back and prints its new version.
// The access token comes from a credential-injecting proxy or SUPABASE_ACCESS_TOKEN. Deploys only the names given.
import { readFile } from "node:fs/promises";

const REF = "ezlohntrnassgsbofcfc";
const API = `https://api.supabase.com/v1/projects/${REF}`;
const auth = { Authorization: `Bearer ${process.env.SUPABASE_ACCESS_TOKEN || "proxy-injected"}` };
const slugs = process.argv.slice(2);
if (!slugs.length) { console.error("Name the functions to deploy."); process.exit(2); }

const current = await (await fetch(`${API}/functions`, { headers: auth })).json();
for (const slug of slugs) {
  const before = current.find((f) => f.slug === slug);
  if (!before) throw new Error(`${slug} isn't deployed yet: deploy it once with the Supabase CLI first.`);
  const entry = `supabase/functions/${slug}/index.ts`;
  const source = await readFile(entry, "utf8");
  const shared = [...source.matchAll(/from "\.\.\/_shared\/([^"]+)"/g)].map((m) => `supabase/functions/_shared/${m[1]}`);
  const form = new FormData();
  form.append("metadata", JSON.stringify({ name: slug, entrypoint_path: entry, verify_jwt: before.verify_jwt }));
  for (const path of [entry, ...shared]) form.append("file", new Blob([await readFile(path)], { type: "application/typescript" }), path);
  const res = await fetch(`${API}/functions/deploy?slug=${slug}`, { method: "POST", headers: auth, body: form });
  const out = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${slug}: deploy failed (${res.status}) ${JSON.stringify(out).slice(0, 300)}`);
  let after = null;
  for (let i = 0; i < 3 && !after; i++) {   // read back only; never redeploy
    const r = await fetch(`${API}/functions/${slug}`, { headers: auth });
    const body = await r.json().catch(() => null);
    if (r.ok && body?.version && body?.status) after = body; else await new Promise((ok) => setTimeout(ok, 2000));
  }
  if (!after) { console.error(`${slug}: deployed, but reading it back failed; check it in the Supabase dashboard.`); process.exit(1); }
  console.log(`${slug}: v${before.version} → v${after.version}, ${after.status}, verify_jwt ${after.verify_jwt}, files ${[entry, ...shared].join(", ")}`);
}
