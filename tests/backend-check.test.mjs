// The backend check (kit/data/backend-check.js) against a small in-memory imitation of Supabase:
// a working project passes every step, and each kind of breakage is reported at the right stage.
import { test } from "node:test";
import assert from "node:assert/strict";
import { checkBackend, keyKind, parseConfig, summarise } from "../kit/data/backend-check.js";

const jwt = (role) => `x.${Buffer.from(JSON.stringify({ role })).toString("base64url")}.y`;
const ANON = jwt("anon");

function fakeSupabase({ rls = true, tables = ["profiles", "documents", "packs", "cards", "reviews", "activity", "plan_blocks", "waitlist", "workouts", "body_checkins", "fitness_tests", "assessment_attempts", "course_progress"], fn = true, xpGuard = true } = {}) {
  const users = { "a@x": { id: "uA", password: "pa" }, "b@x": { id: "uB", password: "pb" } };
  const sessions = {}, refresh = {};
  const db = { profiles: [{ id: "uA", xp: 40, daily_minutes: 20 }, { id: "uB", xp: 0, daily_minutes: 20 }], course_progress: [], assessment_attempts: [] };
  let n = 0;
  const res = (status, body, headers = {}) => new Response(body === undefined ? null : JSON.stringify(body), { status, headers });
  return async (href, { method = "GET", headers = {}, body } = {}) => {
    const u = new URL(href), path = u.pathname, data = body ? JSON.parse(body) : null;
    const token = (headers.Authorization || "").replace("Bearer ", ""), who = sessions[token] || null;
    if (path === "/auth/v1/settings") return res(200, { external: { email: true, google: false } });
    if (path === "/auth/v1/token" && u.searchParams.get("grant_type") === "password") {
      const usr = users[data.email]; if (!usr || usr.password !== data.password) return res(400, { error_description: "Invalid login credentials" });
      const t = `tok${++n}`, r = `ref${n}`; sessions[t] = usr.id; refresh[r] = usr.id;
      return res(200, { access_token: t, refresh_token: r, user: { id: usr.id, email: data.email } });
    }
    if (path === "/auth/v1/token") return refresh[data.refresh_token] ? res(200, {}) : res(400, { error_description: "Invalid Refresh Token" });
    if (path === "/auth/v1/logout") { for (const [r, id] of Object.entries(refresh)) if (id === who) delete refresh[r]; return res(204); }
    if (path === "/functions/v1/study-pack") {
      if (!fn) return res(404, { message: "Requested function was not found" });
      if (method === "OPTIONS") return new Response("ok", { headers: { "access-control-allow-origin": headers.Origin } });
      return who ? res(200, { card: { type: "definition", front: "At what temperature does water boil at 1 atm?", back: "100 °C" } }) : res(401, { error: "Please sign in to use Gradify AI." });
    }
    const t = path.replace("/rest/v1/", "");
    if (!tables.includes(t)) return res(404, { code: "PGRST205", message: `Could not find the table 'public.${t}'` });
    const rows = db[t] ||= [];
    const filters = [...u.searchParams].filter(([k]) => !["select", "limit"].includes(k)).map(([k, v]) => [k, v.replace(/^eq\./, "")]);
    const visible = rows.filter((r) => (!rls || (r.user_id ?? r.id) === who) && filters.every(([k, v]) => String(r[k]) === v));
    if (method === "GET") return res(200, visible);
    if (!who && rls) return res(401, { message: "new row violates row-level security policy" });
    if (method === "POST") {
      const row = { user_id: who, ...data };
      const i = rows.findIndex((r) => r.user_id === row.user_id && r.subject === row.subject && t === "course_progress");
      if (i >= 0) rows[i] = row; else rows.push(row);
      return res(201);
    }
    if (method === "PATCH") { for (const r of visible) { const old = r.xp; Object.assign(r, data); if (xpGuard && "xp" in r) r.xp = old; } return res(200, visible); }
    if (method === "DELETE") { db[t] = rows.filter((r) => !visible.includes(r)); return res(204); }
  };
}
const run = (opts, fetchOpts) => checkBackend({ url: "https://p.supabase.co", anonKey: ANON, accounts: [{ email: "a@x", password: "pa" }, { email: "b@x", password: "pb" }], ai: true, fetch: fakeSupabase(fetchOpts), ...opts });

test("a working project passes every stage", async () => {
  const { steps, summary } = await run({ siteConfig: { url: "https://p.supabase.co", anonKey: ANON } });
  assert.deepEqual(steps.filter((s) => s.ok !== true).map((s) => s.id), []);
  assert.deepEqual(summary, { 2: "working", 3: "working", 4: "working", 5: "working" });
});

test("broken row-level security is caught", async () => {
  const { steps } = await run({}, { rls: false });
  assert.equal(steps.find((s) => s.id === "isolation").ok, false);
});

test("a missing migration is named", async () => {
  const { steps } = await run({}, { tables: ["profiles", "documents", "packs", "cards", "reviews", "activity", "plan_blocks", "waitlist"] });
  const s = steps.find((x) => x.id === "schema");
  assert.equal(s.ok, false); assert.match(s.detail, /course_progress/); assert.match(s.detail, /assessment_attempts/);
});

test("an undeployed function, an empty site config and a missing XP guard each fail their own stage", async () => {
  const { summary, steps } = await run({ siteConfig: { url: "", anonKey: "" } }, { fn: false, xpGuard: false });
  assert.equal(summary[3], "failing"); assert.equal(summary[5], "failing");
  assert.equal(steps.find((s) => s.id === "xp-guard").ok, false);
});

test("without test accounts, account checks are reported as untested, not as working", async () => {
  const { summary } = await run({ accounts: [] });
  assert.equal(summary[4], "partly tested");
});

test("test data is removed afterwards", async () => {
  const f = fakeSupabase();
  await checkBackend({ url: "https://p.supabase.co", anonKey: ANON, accounts: [{ email: "a@x", password: "pa" }], fetch: f });
  const s = await (await f("https://p.supabase.co/auth/v1/token?grant_type=password", { method: "POST", body: JSON.stringify({ email: "a@x", password: "pa" }) })).json();
  const left = await (await f("https://p.supabase.co/rest/v1/course_progress?subject=eq._verify", { headers: { Authorization: `Bearer ${s.access_token}` } })).json();
  assert.deepEqual(left, []);
});

test("secret keys are refused and an empty config stops early", async () => {
  assert.equal(keyKind(jwt("service_role")), "secret");
  assert.equal(keyKind("sb_secret_abc"), "secret");
  assert.equal(keyKind(ANON), "anon");
  const { steps } = await checkBackend({ url: "https://p.supabase.co", anonKey: jwt("service_role"), fetch: fakeSupabase() });
  assert.equal(steps.at(-1).ok, false);
  assert.equal((await checkBackend({ url: "", anonKey: "" })).steps[0].ok, false);
  assert.deepEqual(summarise([]), { 2: "untested", 3: "untested", 4: "untested", 5: "untested" });
});

test("config parsing reads the live file format", () => {
  assert.deepEqual(parseConfig(`export const SUPABASE_URL = "https://a.supabase.co";\nexport const SUPABASE_ANON_KEY = "eyJ1";`), { url: "https://a.supabase.co", anonKey: "eyJ1" });
  assert.deepEqual(parseConfig(`export const SUPABASE_URL = "";`), { url: "", anonKey: "" });
});

test("an empty site config is reported as not connected even when no project is given", async () => {
  const { summary } = await checkBackend({ url: "", anonKey: "", siteConfig: { url: "", anonKey: "" } });
  assert.equal(summary[3], "failing");
});
