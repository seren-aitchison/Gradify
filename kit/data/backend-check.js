// End-to-end check of the Gradify backend, in plain fetch so the same code runs in Node
// (scripts/verify-backend.mjs) and in the browser on the live site (status.html).
// It answers the five questions separately, because "the code exists" is not "it works for a learner":
//   1 code      the migrations and the study-pack function are in the repository (Node only)
//   2 project   a Supabase project answers at this URL with this key
//   3 site      the deployed site is configured with that project
//   4 accounts  sign-in, profile, saving and reading progress, isolation and sign-out work for real
//   5 ai        the study-pack function is deployed, and (optionally) Claude answers through it
// It never needs, and refuses to run with, a secret (service_role) key. Everything it writes is
// tagged "_verify" and deleted again before it finishes.

export const TABLES = {
  "20261028120000_gradify_core": ["profiles", "documents", "packs", "cards", "reviews", "activity", "plan_blocks", "waitlist"],
  "20261029120000_mastery_evidence": ["reviews?select=confidence,mode"],
  "20261031120000_sport_body_intelligence": ["workouts", "body_checkins", "fitness_tests"],
  "20261101120000_assessment_attempts": ["assessment_attempts"],
  "20261105120000_course_progress": ["course_progress"],
};

// what kind of key this is, without ever printing it
export function keyKind(key = "") {
  if (key.startsWith("sb_secret_")) return "secret";
  if (key.startsWith("sb_publishable_")) return "publishable";
  try {
    const p = JSON.parse(atob(key.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
    return p.role === "service_role" ? "secret" : p.role === "anon" ? "anon" : "unknown";
  } catch { return "unknown"; }
}

export async function checkBackend({ url, anonKey, siteConfig = null, accounts = [], session = null, ai = false, origin = "https://getgradify.com", fetch = globalThis.fetch.bind(globalThis), onStep = () => {} } = {}) {
  const steps = [];
  const step = (stage, id, label, ok, detail = "") => { const s = { stage, id, label, ok, detail }; steps.push(s); onStep(s); return ok; };
  const done = () => ({ steps, summary: summarise(steps) });
  url = (url || "").replace(/\/+$/, "");

  // ---- 3. site (checked first: an empty site config is a finding even with no project) ----
  if (siteConfig) {
    const same = Boolean(siteConfig.url) && (siteConfig.url || "").replace(/\/+$/, "") === url && siteConfig.anonKey === anonKey;
    step(3, "site", "The deployed site uses this project", same, siteConfig.url ? (same ? siteConfig.where || "" : `The site points at ${siteConfig.url || "nothing"}`) : `${siteConfig.where || "The site"}'s gradify.config.js is empty`);
  }

  // ---- 2. project ----
  if (!url || !anonKey) { step(2, "config", "Supabase URL and anon key provided", false, "Both are empty, so the site runs in this-browser-only mode."); return done(); }
  const kind = keyKind(anonKey);
  if (kind === "secret") { step(2, "key", "Key is the public anon key", false, "This is a secret (service_role) key. Never use it here or put it in the site; rotate it if it has been shared."); return done(); }
  step(2, "key", "Key is the public anon key", true, kind === "unknown" ? "Key format not recognised; continuing." : `${kind} key`);
  const H = (token) => ({ apikey: anonKey, "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : kind === "anon" ? { Authorization: `Bearer ${anonKey}` } : {}) });
  const call = async (path, { method = "GET", token, body, prefer, headers = {} } = {}) => {
    try {
      const r = await fetch(`${url}${path}`, { method, headers: { ...H(token), ...(prefer ? { Prefer: prefer } : {}), ...headers }, body: body === undefined ? undefined : JSON.stringify(body) });
      const text = await r.text(); let data = null; try { data = text ? JSON.parse(text) : null; } catch { data = text; }
      return { status: r.status, ok: r.ok, data, headers: r.headers };
    } catch (e) { return { status: 0, ok: false, data: String(e.message || e) }; }
  };
  const settings = await call("/auth/v1/settings");
  if (!step(2, "reachable", "Supabase project answers", settings.ok, settings.ok ? url : `HTTP ${settings.status}: ${msg(settings.data)}`)) return done();
  const ext = settings.data?.external || {};
  step(2, "providers", "Email sign-in is enabled", ext.email !== false, `email ${ext.email ? "on" : "off"}, Google ${ext.google ? "on" : "off"}`);

  const missing = [];
  for (const [migration, tables] of Object.entries(TABLES)) for (const t of tables) {
    const r = await call(`/rest/v1/${t.includes("?") ? `${t}&limit=0` : `${t}?select=*&limit=0`}`);
    if (!r.ok) missing.push(`${migration} (${t.split("?")[0]}: ${msg(r.data) || `HTTP ${r.status}`})`);
  }
  step(2, "schema", "Every migration has been run", missing.length === 0, missing.length ? `Missing: ${[...new Set(missing)].join("; ")}` : `${Object.keys(TABLES).length} migrations present`);
  const leak = await call("/rest/v1/course_progress?select=subject&limit=1");
  step(2, "anon", "Signed-out visitors can't read learner data", leak.ok ? Array.isArray(leak.data) && leak.data.length === 0 : true, leak.ok ? (leak.data?.length ? "Rows were returned to the anon key: check row-level security now." : "No rows visible without signing in") : "Refused");

  // ---- 4. accounts ----
  const nonce = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  let A = session, B = null;
  const signIn = async ({ email, password }) => { const r = await call("/auth/v1/token?grant_type=password", { method: "POST", body: { email, password } }); return r.ok ? r.data : { error: msg(r.data) || `HTTP ${r.status}` }; };
  if (!A && accounts[0]) {
    const s = await signIn(accounts[0]);
    if (!step(4, "signin", "Learner A can sign in", !s.error, s.error || s.user?.email)) return done();
    A = s;
  }
  if (!A) { step(4, "signin", "A signed-in learner to test with", null, "Skipped: no test account or session given."); return finishAi(); }
  const uid = A.user?.id;
  const prof = await call(`/rest/v1/profiles?id=eq.${uid}&select=id,xp,daily_minutes`, { token: A.access_token });
  step(4, "profile", "The account has a profile", prof.ok && prof.data?.length === 1, prof.ok ? (prof.data?.length ? "created by the sign-up trigger" : "No profile row: the on_auth_user_created trigger didn't run") : msg(prof.data));
  if (prof.data?.[0]) {
    const before = prof.data[0];
    const upd = await call(`/rest/v1/profiles?id=eq.${uid}`, { method: "PATCH", token: A.access_token, prefer: "return=representation", body: { daily_minutes: before.daily_minutes, xp: (before.xp || 0) + 100000 } });
    step(4, "profile-save", "Profile changes save", upd.ok && upd.data?.length === 1, upd.ok ? "" : msg(upd.data));
    if (upd.ok) step(4, "xp-guard", "XP can't be set from the browser", upd.data?.[0]?.xp === before.xp, upd.data?.[0]?.xp === before.xp ? "guard_xp kept XP unchanged" : "XP changed: the guard_xp trigger is missing");
  }
  const state = { verify: nonce, lessons: { "u01-01": { done: true, at: new Date().toISOString() } } };
  const save = await call("/rest/v1/course_progress", { method: "POST", token: A.access_token, prefer: "resolution=merge-duplicates,return=minimal", body: { user_id: uid, subject: "_verify", site: "Gradify", state } });
  step(4, "save", "Lesson progress saves to the account", save.ok, save.ok ? "" : msg(save.data));
  const attempt = await call("/rest/v1/assessment_attempts", { method: "POST", token: A.access_token, prefer: "return=minimal", body: { id: `_verify-${nonce}`, site: "Gradify", subject: "_verify", context: "lesson", question_id: "_verify", question_type: "mcq", score: 1, correct: true } });
  step(4, "attempt", "Answers save to the account", attempt.ok, attempt.ok ? "" : msg(attempt.data));

  // a second, independent sign-in stands in for another device
  let A2 = null;
  if (accounts[0] && !session) { const s = await signIn(accounts[0]); A2 = s.error ? null : s; }
  const read = await call("/rest/v1/course_progress?subject=eq._verify&select=state", { token: (A2 || A).access_token });
  step(4, "read", A2 ? "Progress reads back on a second device (a new session)" : "Progress reads back", read.ok && read.data?.[0]?.state?.verify === nonce, read.ok ? (read.data?.[0] ? "" : "Saved row not found") : msg(read.data));

  if (accounts[1]) {
    const s = await signIn(accounts[1]);
    if (step(4, "signin-b", "Learner B can sign in", !s.error, s.error || "")) {
      B = s;
      const peek = await call("/rest/v1/course_progress?subject=eq._verify&select=user_id", { token: B.access_token });
      const tamper = await call(`/rest/v1/course_progress?subject=eq._verify&user_id=eq.${uid}`, { method: "PATCH", token: B.access_token, prefer: "return=representation", body: { state: { verify: "tampered" } } });
      step(4, "isolation", "Learner B can't see or change learner A's progress", peek.ok && peek.data.length === 0 && (!tamper.ok || tamper.data.length === 0), peek.data?.length ? "B could read A's row: check row-level security now." : tamper.data?.length ? "B could change A's row." : "");
    }
  } else step(4, "isolation", "One learner can't see another's progress", null, "Skipped: give a second test account to check this.");

  // clean up, then sign out
  await call("/rest/v1/course_progress?subject=eq._verify", { method: "DELETE", token: A.access_token });
  await call(`/rest/v1/assessment_attempts?id=eq._verify-${nonce}`, { method: "DELETE", token: A.access_token });
  if (!session) {
    for (const s of [A2, B]) if (s) await call("/auth/v1/logout?scope=local", { method: "POST", token: s.access_token });
    const out = await call("/auth/v1/logout?scope=local", { method: "POST", token: A.access_token });
    const again = await call("/auth/v1/token?grant_type=refresh_token", { method: "POST", body: { refresh_token: A.refresh_token } });
    step(4, "signout", "Signing out ends the session", out.ok && !again.ok, out.ok ? (again.ok ? "The refresh token still works after sign-out" : "") : msg(out.data));
  }
  return finishAi();

  // ---- 5. ai ----
  async function finishAi() {
    const fn = "/functions/v1/study-pack";
    // In a browser the request itself is the CORS test (a refused one never returns), and the
    // response headers can't be read; from Node, read the preflight's Allow-Origin instead.
    const browser = typeof window !== "undefined";
    const pre = browser ? null : await call(fn, { method: "OPTIONS", headers: { Origin: origin, "Access-Control-Request-Method": "POST" } });
    const probe = await call(fn, { method: "POST", body: { mode: "card", fact: "" } });
    const deployed = probe.status !== 404 && probe.status !== 0;
    step(5, "deployed", "The study-pack function is deployed", deployed, deployed ? `refuses signed-out callers (HTTP ${probe.status})` : probe.status ? "Not found: run supabase functions deploy study-pack"
      : browser ? `This page couldn't reach it: it isn't deployed, or GRADIFY_ALLOWED_ORIGINS doesn't include ${origin}` : msg(probe.data));
    if (deployed && pre?.headers) { const allow = pre.headers.get("access-control-allow-origin"); step(5, "cors", `It accepts requests from ${origin}`, allow === origin || allow === "*", allow ? `allows ${allow}` : "No CORS headers"); }
    else if (deployed && browser) step(5, "cors", `It accepts requests from ${origin}`, true, "");
    const token = A?.access_token;
    if (deployed && ai && token) {
      const r = await call(fn, { method: "POST", token, body: { mode: "card", fact: "Water boils at 100 °C at sea level (1 atm).", notes: "At standard atmospheric pressure, pure water boils at 100 °C.", avoid: [] } });
      step(5, "claude", "Claude answers through the function", r.ok && Boolean(r.data?.card?.front), r.ok ? `card: ${String(r.data?.card?.front || "").slice(0, 80)}` : `HTTP ${r.status}: ${msg(r.data)}`);
    } else if (deployed) step(5, "claude", "Claude answers through the function", null, token ? "Skipped: run with AI checks on (one card, about a cent)." : "Skipped: needs a signed-in learner.");
    return done();
  }
}

function msg(d) { return typeof d === "string" ? d.slice(0, 200) : d?.message || d?.msg || d?.error_description || d?.error || d?.hint || ""; }

// one line per question: working (every check passed), failing, or not yet tested
export function summarise(steps) {
  const out = {};
  for (const n of [2, 3, 4, 5]) {
    const s = steps.filter((x) => x.stage === n);
    out[n] = !s.length ? "untested" : s.some((x) => x.ok === false) ? "failing" : s.every((x) => x.ok === true) ? "working" : "partly tested";
  }
  return out;
}

// read SUPABASE_URL and SUPABASE_ANON_KEY out of a gradify.config.js source
export function parseConfig(src = "") {
  const get = (k) => (src.match(new RegExp(`${k}\\s*=\\s*["'\`]([^"'\`]*)["'\`]`)) || [])[1] || "";
  return { url: get("SUPABASE_URL"), anonKey: get("SUPABASE_ANON_KEY") };
}
