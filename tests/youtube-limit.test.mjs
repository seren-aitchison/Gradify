// The youtube-notes rate limit (supabase/migrations/20261122120000_youtube_rate_limit.sql), run for real in a temporary
// PostgreSQL: per caller per minute and per day, the whole service per day, a day's retention, and only the service
// role may take a turn. Plus the function's side: it hashes the caller's IP and asks the database before fetching.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { createHmac } from "node:crypto";
import { tempDb } from "../scripts/pg-rehearsal.mjs";

const A = "a".repeat(64), B = "b".repeat(64);

async function db() {
  const d = await tempDb();
  const dir = new URL("../supabase/migrations/", import.meta.url);
  for (const f of (await readdir(dir)).filter((x) => x.endsWith(".sql")).sort()) await d.sql(await readFile(new URL(f, dir), "utf8"));
  // as on Supabase: the API roles have table privileges by default, and the migration takes them away
  await d.sql(`grant usage on schema public to anon, authenticated, service_role;
    grant all on all tables in schema public to service_role; grant all on all sequences in schema public to service_role;`);
  const svc = async (q) => { try { return await d.sql(`set role service_role; ${q};`); } finally { await d.sql("reset role;"); } };
  const take = async (caller, perMinute = 10, perDay = 200, global = 5000) =>
    (await svc(`select public.youtube_take('${caller}', ${perMinute}, ${perDay}, ${global}) as r`))[0].r;
  return { d, svc, take };
}

test("one caller gets 10 a minute; refusals aren't counted; another caller is unaffected", async () => {
  const { d, take } = await db();
  for (let i = 0; i < 10; i++) assert.equal(await take(A), "ok");
  assert.equal(await take(A), "rate");
  assert.equal(await take(A), "rate");
  assert.equal(await take(B), "ok", "a different caller has their own count");
  assert.equal((await d.sql(`select count(*)::int as n from public.youtube_requests where caller = '${A}'`))[0].n, 10, "refused requests aren't recorded");
  // a minute later the caller is let back in
  await d.sql(`update public.youtube_requests set at = now() - interval '61 seconds'`);
  assert.equal(await take(A), "ok");
  await d.close();
});

test("a day's cap per caller, a day's cap for the service, and requests are deleted after a day", async () => {
  const { d, take } = await db();
  for (let i = 0; i < 3; i++) assert.equal(await take(A, 100, 3, 1000), "ok");
  assert.equal(await take(A, 100, 3, 1000), "daily");
  assert.equal(await take(B, 100, 3, 4), "ok");
  assert.equal(await take("c".repeat(64), 100, 3, 4), "busy", "the whole service has had 4 today");
  await d.sql(`update public.youtube_requests set at = now() - interval '25 hours'`);
  assert.equal(await take(A, 100, 3, 1000), "ok", "yesterday's requests no longer count");
  assert.equal((await d.sql(`select count(*)::int as n from public.youtube_requests`))[0].n, 1, "and they're gone from the table");
  await d.close();
});

test("only a hex SHA-256 is accepted as a caller, never a raw address", async () => {
  const { take } = await db();
  await assert.rejects(take("203.0.113.9"), /caller must be a hex SHA-256/);
  await assert.rejects(take("A".repeat(64)), /caller must be a hex SHA-256/);
});

test("learners and visitors can't take turns or read who has asked", async () => {
  const { d } = await db();
  for (const role of ["anon", "authenticated"]) {
    await assert.rejects(d.sql(`set role ${role}; select public.youtube_take('${A}');`).finally(() => d.sql("reset role;")), /permission denied/);
    await assert.rejects(d.sql(`set role ${role}; select * from public.youtube_requests;`).finally(() => d.sql("reset role;")), /permission denied/);
  }
  await d.close();
});

test("the function hashes the IP with a server-side key and takes a turn before it fetches anything from YouTube", async () => {
  const src = await readFile(new URL("../supabase/functions/youtube-notes/index.ts", import.meta.url), "utf8");
  const serve = src.slice(src.indexOf("Deno.serve("));
  const takeAt = serve.indexOf(`admin.rpc("youtube_take"`), fetchAt = serve.indexOf("tracksOf(");
  assert.ok(takeAt > 0 && fetchAt > takeAt, "youtube_take is called before the watch page is fetched");
  assert.match(serve, /p_caller: await callerKey\(who, SECRET\)/, "the database sees the keyed hash, not the address");
  assert.match(serve, /if \(error\) return json\(req, \{[^}]*\}, 503\)/, "a database error refuses the request rather than skipping the limit");
  // the real callerKey, compiled from the TypeScript, gives HMAC-SHA-256(key, "youtube-notes:<ip>") in hex
  const { transform } = await import("esbuild");
  const fn = src.match(/export async function callerKey[\s\S]*?\n\}/)[0];
  const { code } = await transform(fn, { loader: "ts", format: "esm" });
  const { callerKey } = await import(`data:text/javascript,${encodeURIComponent(code)}`);
  const got = await callerKey("203.0.113.9", "server-key");
  assert.equal(got, createHmac("sha256", "server-key").update("youtube-notes:203.0.113.9").digest("hex"));
  assert.notEqual(await callerKey("203.0.113.9", "another-key"), got, "without the server's key the hash can't be recomputed");
});
