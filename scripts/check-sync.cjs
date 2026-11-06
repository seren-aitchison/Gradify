// Browser check of the signed-in student journey against a stand-in Supabase: the real course pages and their
// real code, in Chromium, with the browser's requests answered by a small in-memory backend that applies
// row-level security by user. It proves the site's own behaviour; it does not prove the real project works
// (scripts/verify-backend.mjs and status.html do that against the live project).
//   npm run serve            (in one terminal)
//   node scripts/check-sync.cjs        (BASE=http://localhost:8080 by default)
// Scenarios: progress and answers reach the account; a second device sees both; closing the tab right after
// finishing a lesson; going offline mid-lesson; the server rejecting uploads; an expired session during an AI
// request (refreshed and retried); a sign-in that can't be refreshed; AI failures.
const { chromium } = require("playwright");
const http = require("http");
const BASE = process.env.BASE || "http://localhost:8080";
// the stand-in backend is a real local server, not request interception, so requests the browser sends while a
// tab closes (keepalive saves) arrive exactly as they would at Supabase
const PORT = Number(process.env.FAKE_PORT || 54329), HOST = `http://127.0.0.1:${PORT}`, REF = "127";
const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64url");
const jwt = (claims) => `${b64({ alg: "HS256", typ: "JWT" })}.${b64(claims)}.c2lnbmF0dXJl`;
const ANON = jwt({ role: "anon", iss: "supabase" });
const USER = { id: "11111111-1111-4111-8111-111111111111", email: "learner@example.com", aud: "authenticated", role: "authenticated" };

// ---------- the stand-in backend ----------
const db = { course_progress: [], assessment_attempts: [], profiles: [{ id: USER.id, xp: 0, daily_minutes: 20, goal: "course", site: "LawGradify", learner: {} }], activity: [], documents: [], cards: [], packs: [], reviews: [], plan_blocks: [] };
const tokens = new Map(); let n = 0;
const fake = { offline: false, failAttempts: 0, expired: new Set(), refreshFails: false, tutor: "ok", refreshes: 0, tutorCalls: 0 };
function session() {
  const access = jwt({ sub: USER.id, role: "authenticated", exp: Math.floor(Date.now() / 1000) + 3600, n: ++n }), refresh = `refresh-${n}`;
  tokens.set(access, USER.id); tokens.set(refresh, USER.id);
  return { access_token: access, refresh_token: refresh, token_type: "bearer", expires_in: 3600, expires_at: Math.floor(Date.now() / 1000) + 3600, user: USER };
}
const cors = { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "GET,POST,PATCH,DELETE,OPTIONS,HEAD", "access-control-expose-headers": "content-range" };
async function backend(route) {
  const req = route.request(), url = new URL(req.url()), method = req.method(), h = req.headers();
  const send = (status, body, extra = {}) => route.fulfill({ status, headers: { ...cors, "content-type": "application/json", ...extra }, body: body === undefined ? "" : JSON.stringify(body) });
  if (method === "OPTIONS") return route.fulfill({ status: 204, headers: cors });
  if (fake.offline) return route.abort("internetdisconnected");
  const token = (h.authorization || "").replace(/^Bearer /, ""), who = tokens.get(token) || null;
  const body = req.postData() ? JSON.parse(req.postData()) : null;
  if (url.pathname === "/auth/v1/user") return who ? send(200, USER) : send(401, { msg: "invalid JWT" });
  if (url.pathname === "/auth/v1/token") {
    fake.refreshes++;
    if (fake.refreshFails || !tokens.get(body?.refresh_token)) return send(400, { error: "invalid_grant", error_description: "Invalid Refresh Token" });
    return send(200, session());
  }
  if (url.pathname.startsWith("/auth/v1/")) return send(200, {});
  if (url.pathname === "/functions/v1/course-tutor") {
    fake.tutorCalls++;
    if (!who || fake.expired.has(token)) return send(401, { error: "Please sign in to use the Gradify AI tutor." });
    if (fake.tutor === "down") return send(502, { error: "The tutor is busy or unavailable. Please try again in a minute." });
    if (fake.tutor === "garbage") return route.fulfill({ status: 502, headers: cors, body: "<html>Bad gateway</html>" });
    return send(200, { answer: `Stand-in answer to: ${body.question}`, fromLesson: true, model: "stand-in" });
  }
  const table = url.pathname.replace("/rest/v1/", "");
  if (!db[table]) return send(404, { code: "PGRST205", message: `no table ${table}` });
  if (!who) return send(401, { message: "JWT required" });
  const own = (r) => (r.user_id ?? r.id) === who;
  const filters = [...url.searchParams].filter(([k]) => !["select", "order", "limit", "on_conflict", "columns"].includes(k));
  const match = (r) => filters.every(([k, v]) => { const [op, val] = [v.slice(0, v.indexOf(".")), v.slice(v.indexOf(".") + 1)]; return op === "eq" ? String(r[k]) === val : op === "gte" ? String(r[k]) >= val : op === "in" ? val.slice(1, -1).split(",").includes(String(r[k])) : true; });
  const rows = db[table].filter((r) => own(r) && match(r));
  const single = /vnd\.pgrst\.object/.test(h.accept || "");
  if (method === "GET" || method === "HEAD") return single ? (rows[0] ? send(200, rows[0]) : send(406, { message: "no rows" })) : send(200, rows);
  if (method === "POST") {
    if (table === "assessment_attempts" && fake.failAttempts > 0) { fake.failAttempts--; return send(500, { message: "stand-in server error" }); }
    const list = (Array.isArray(body) ? body : [body]).map((r) => ({ user_id: who, ...r, id: r.id ?? `${table}-${++n}` }));
    const ignore = /ignore-duplicates/.test(h.prefer || ""), merge = /merge-duplicates/.test(h.prefer || "");
    for (const r of list) {
      const key = table === "course_progress" ? (x) => x.user_id === r.user_id && x.subject === r.subject : (x) => x.id === r.id;
      const i = db[table].findIndex(key);
      if (i >= 0) { if (merge || table === "course_progress") db[table][i] = r; else if (!ignore) return send(409, { message: "duplicate key" }); }
      else db[table].push(r);
    }
    return /return=representation/.test(h.prefer || "") ? (single ? send(201, list[0]) : send(201, list)) : send(201);
  }
  if (method === "PATCH") { for (const r of rows) Object.assign(r, body); return single ? send(200, rows[0]) : send(200, rows); }
  if (method === "DELETE") { db[table] = db[table].filter((r) => !rows.includes(r)); return send(204); }
  return send(405, {});
}

function serve() {
  return new Promise((done) => {
    const server = http.createServer((req, res) => {
      let data = ""; req.on("data", (c) => { data += c; });
      req.on("end", () => backend({
        request: () => ({ url: () => `${HOST}${req.url}`, method: () => req.method, headers: () => Object.fromEntries(Object.entries(req.headers).map(([k, v]) => [k.toLowerCase(), String(v)])), postData: () => data || null }),
        fulfill: ({ status, headers = {}, body = "", contentType }) => { res.writeHead(status, { ...headers, ...(contentType ? { "content-type": contentType } : {}) }); res.end(body); },
        abort: () => req.socket.destroy(),
      }));
    });
    server.listen(PORT, "127.0.0.1", () => done(server));
  });
}

// ---------- devices ----------
async function device(b, name) {
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
  const s = session();
  // sandboxed frames (some interactives) have no storage, so the seeding is guarded
  await ctx.addInitScript(([key, value]) => { try { if (!localStorage.getItem(key)) localStorage.setItem(key, value); } catch { /* no storage in this frame */ } }, [`sb-${REF}-auth-token`, JSON.stringify(s)]);
  await ctx.route("**/gradify.config.js", (r) => r.fulfill({ status: 200, contentType: "text/javascript", body: `export const SITE = null;\nexport const SUPABASE_URL = "${HOST}";\nexport const SUPABASE_ANON_KEY = "${ANON}";\n` }));
  const errs = [];
  ctx.on("page", (p) => p.on("pageerror", (e) => errs.push(`${name}: ${e.message}`)));
  return { ctx, errs, session: s };
}
const local = (p) => p.evaluate(() => JSON.parse(localStorage.getItem("gradify.course.law") || "{}"));
const results = [];
const check = (label, ok, detail = "") => { results.push({ label, ok, detail }); console.log(`${ok ? "✓" : "✗"} ${label}${detail ? `: ${detail}` : ""}`); };
const until = async (fn, ms = 8000) => { const t = Date.now(); while (Date.now() - t < ms) { if (await fn()) return true; await new Promise((r) => setTimeout(r, 200)); } return false; };
async function answer(p, right) {
  // answer the first single-choice question on the page, wrongly or rightly, using the key the page shows after
  const box = p.locator(".aq", { has: p.locator(".aq-opts") }).first();
  await box.scrollIntoViewIfNeeded();
  const opts = box.locator(".aq-opts button"), count = await opts.count();
  for (let i = 0; i < count; i++) {
    await opts.nth(i).click(); await p.waitForTimeout(150);
    const correct = (await box.locator(".aq-result.ok").count()) > 0;
    if (correct === right || correct) return;
  }
}

(async () => {
  const server = await serve();
  const b = await chromium.launch();
  const A = await device(b, "device A"), pa = await A.ctx.newPage();

  // 1. a lesson's progress and answers reach the account
  await pa.goto(`${BASE}/lawgradify/course/#/lesson/u01-01`); await pa.waitForTimeout(2500);
  await answer(pa, false);
  await pa.locator(".co-complete").click();
  const synced = await until(() => db.course_progress.some((r) => r.state?.done?.["u01-01"]) && db.assessment_attempts.length >= 1);
  check("Progress and answers reach the account", synced, `${db.assessment_attempts.length} answers, progress row ${db.course_progress.length ? "saved" : "missing"}`);
  check("Nothing is left waiting on device A", (await local(pa)).outbox?.length === 0, `outbox ${JSON.stringify((await local(pa)).outbox)}`);

  // 2. closing the tab straight after finishing a lesson
  await pa.goto(`${BASE}/lawgradify/course/#/lesson/u01-02`); await pa.waitForTimeout(2000);
  await pa.locator(".co-complete").click(); await pa.waitForTimeout(150);
  await pa.close({ runBeforeUnload: true });
  check("A lesson finished just before the tab closes still reaches the account", await until(() => db.course_progress.some((r) => r.state?.done?.["u01-02"]), 4000));

  // 3. a second device sees everything
  const B = await device(b, "device B"), pb = await B.ctx.newPage();
  await pb.goto(`${BASE}/lawgradify/course/#/learn`); await pb.waitForTimeout(3500);
  const sb = await local(pb);
  check("Device B sees the lessons finished on device A", Boolean(sb.done?.["u01-01"] && sb.done?.["u01-02"]), Object.keys(sb.done || {}).join(", "));
  check("Device B sees device A's answers (for mastery, Revisit and plans)", (sb.attempts || []).length === db.assessment_attempts.length, `${(sb.attempts || []).length} of ${db.assessment_attempts.length}`);

  // 4. going offline mid-lesson, then reconnecting
  await pb.goto(`${BASE}/lawgradify/course/#/lesson/u01-03`); await pb.waitForTimeout(2500);
  fake.offline = true; await B.ctx.setOffline(true);
  const before = db.assessment_attempts.length;
  await answer(pb, true); await pb.waitForTimeout(800);
  const waiting = ((await local(pb)).outbox || []).length;
  check("Offline, the answers wait on the device", waiting >= 1, `${waiting} waiting`);
  await pb.goto(`${BASE}/lawgradify/course/#/learn`).catch(() => {}); await pb.waitForTimeout(600);
  const warn = await pb.locator(".co-syncwarn").innerText().catch(() => "");
  check("The learner is told it hasn't synced yet", /offline|couldn't reach/i.test(warn), warn.slice(0, 90));
  fake.offline = false; await B.ctx.setOffline(false);
  check("Reconnecting sends each waiting answer exactly once", await until(() => db.assessment_attempts.length === before + waiting), `${db.assessment_attempts.length - before} sent of ${waiting} waiting`);
  check("Nothing is left waiting after reconnecting", await until(async () => ((await local(pb)).outbox || []).length === 0));

  // 5. the server rejecting uploads, then recovering on the next visit
  fake.failAttempts = 3;
  await pb.goto(`${BASE}/lawgradify/course/#/lesson/u01-04`); await pb.waitForTimeout(2500);
  const before2 = db.assessment_attempts.length;
  await answer(pb, true); await pb.waitForTimeout(1500);
  const rejected = ((await local(pb)).outbox || []).length;
  check("Rejected uploads keep the answers on the device", rejected >= 1 && db.assessment_attempts.length === before2, `${rejected} kept`);
  fake.failAttempts = 0;
  await pb.reload(); await pb.waitForTimeout(3500);
  const unique = new Set(db.assessment_attempts.map((a) => a.id)).size;
  check("The next visit uploads them all, without duplicates", db.assessment_attempts.length === before2 + rejected && unique === db.assessment_attempts.length && ((await local(pb)).outbox || []).length === 0, `${db.assessment_attempts.length - before2} uploaded of ${rejected}; ${db.assessment_attempts.length} rows, ${unique} unique`);

  // 6. the AI tutor: expired session refreshed and retried; a sign-in that has ended; service failures
  const ask = async (q) => {
    await pb.goto(`${BASE}/lawgradify/course/#/lesson/u01-01`); await pb.waitForTimeout(2500);
    await pb.fill("#co-askq", q); await pb.click(".co-askform button"); await pb.waitForTimeout(1500);
    return pb.locator(".co-askout").innerText();
  };
  check("Signed in, the tutor answers", /Stand-in answer/.test(await ask("What is law, in short?")));
  const tok = JSON.parse(await pb.evaluate((k) => localStorage.getItem(k), `sb-${REF}-auth-token`)).access_token;
  fake.expired.add(tok); const r0 = fake.refreshes;
  const out1 = await ask("Why do courts follow precedent?");
  check("An expired session is refreshed and the question answered", /Stand-in answer/.test(out1) && fake.refreshes > r0, out1.slice(0, 80));
  for (const t of tokens.keys()) fake.expired.add(t); fake.refreshFails = true;
  const out2 = await ask("What is equity?");
  check("A sign-in that has ended gets a clear message", /sign-in has expired|sign in/i.test(out2), out2.slice(0, 90));
  fake.expired.clear(); fake.refreshFails = false;
  // the page may hold a session the backend now rejects; give the device a fresh one
  const fresh = session(); await pb.evaluate(([k, v]) => localStorage.setItem(k, v), [`sb-${REF}-auth-token`, JSON.stringify(fresh)]);
  fake.tutor = "down"; const out3 = await ask("What is a statute?");
  check("The tutor being down gets its message", /busy or unavailable/.test(out3), out3.slice(0, 80));
  fake.tutor = "garbage"; const out4 = await ask("What is a statute?");
  check("An unreadable reply gets a plain message", /isn't available right now/.test(out4), out4.slice(0, 80));
  fake.tutor = "ok"; fake.offline = true; await B.ctx.setOffline(true);
  const out5 = await ask("What is a statute?");
  check("Offline, the tutor says so", /offline|couldn't reach/i.test(out5), out5.slice(0, 80));
  fake.offline = false; await B.ctx.setOffline(false);

  const errs = [...A.errs, ...B.errs];
  check("No page errors", errs.length === 0, errs.slice(0, 3).join(" | "));
  await b.close(); server.close();
  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length} of ${results.length} passed`);
  if (failed.length) process.exitCode = 1;
})();
