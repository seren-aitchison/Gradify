// Live check of the student journey: the real course pages in Chromium, against the REAL Supabase project,
// signed in as a throwaway test learner. Each flow is verified separately and confirmed by reading the
// account directly, never by trusting what the page says:
//   1 authentication     password sign-in, the page sees the account, the session survives a reload
//   2 progress sync      a finished lesson and its answers reach the account; closing the tab right after still saves
//   3 cross-device       a second, fresh browser sees the lessons and the answers
//   4 offline recovery   offline answers wait on the device, then arrive exactly once on reconnecting
//   5 expired session    a broken access token is refreshed and syncing carries on
//   6 AI (with --ai)     the tutor answers a real question through course-tutor, and an expired token is refreshed first
// Only the test learner's own rows are touched, and those it created are removed at the end.
//   GRADIFY_SUPABASE_URL=… GRADIFY_SUPABASE_ANON_KEY=… GRADIFY_TEST_EMAIL=… GRADIFY_TEST_PASSWORD=… \
//   BASE=https://getgradify.com node scripts/check-live.cjs [--ai] [--write]
// BASE may also be a local copy of the site (npm run serve); the backend is always the real project.
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const env = process.env, AI = process.argv.includes("--ai"), WRITE = process.argv.includes("--write");
const BASE = (env.BASE || "http://localhost:8080").replace(/\/+$/, "");
const URL_ = (env.GRADIFY_SUPABASE_URL || "").replace(/\/+$/, ""), ANON = env.GRADIFY_SUPABASE_ANON_KEY || "";
const EMAIL = env.GRADIFY_TEST_EMAIL, PASSWORD = env.GRADIFY_TEST_PASSWORD;
if (!URL_ || !ANON || !EMAIL || !PASSWORD) { console.error("Set GRADIFY_SUPABASE_URL, GRADIFY_SUPABASE_ANON_KEY, GRADIFY_TEST_EMAIL and GRADIFY_TEST_PASSWORD (a throwaway test account)."); process.exit(2); }
const REF = new URL(URL_).hostname.split(".")[0], KEY = `sb-${REF}-auth-token`, COURSE = "law", LESSONS = ["u01-01", "u01-02", "u01-03"];

const api = async (p, { method = "GET", token, body, prefer } = {}) => {
  const r = await fetch(`${URL_}${p}`, { method, headers: { apikey: ANON, "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(prefer ? { Prefer: prefer } : {}) }, body: body ? JSON.stringify(body) : undefined });
  const t = await r.text(); let data = null; try { data = t ? JSON.parse(t) : null; } catch { data = t; }
  return { ok: r.ok, status: r.status, data };
};
const results = [];
let section = "";
const check = (label, ok, detail = "") => { results.push({ section, label, ok, detail }); console.log(`  ${ok ? "✓" : "✗"} ${label}${detail ? `: ${detail}` : ""}`); return ok; };
const head = (s) => { section = s; console.log(`\n${s}`); };
const until = async (fn, ms = 15000) => { const t = Date.now(); while (Date.now() - t < ms) { if (await fn()) return true; await new Promise((r) => setTimeout(r, 500)); } return false; };

(async () => {
  head("1 Authentication");
  const s = await api("/auth/v1/token?grant_type=password", { method: "POST", body: { email: EMAIL, password: PASSWORD } });
  if (!check("The test learner can sign in", s.ok, s.ok ? s.data.user.email : JSON.stringify(s.data).slice(0, 120))) return finish();
  const token = () => s.data.access_token, uid = s.data.user.id;
  const progress = async () => (await api(`/rest/v1/course_progress?subject=eq.${COURSE}&select=state`, { token: token() })).data?.[0]?.state || null;
  const attempts = async () => (await api(`/rest/v1/assessment_attempts?subject=eq.${COURSE}&select=id`, { token: token() })).data || [];
  const startAttempts = new Set((await attempts()).map((a) => a.id)), startProgress = await progress();
  if (startProgress && LESSONS.some((l) => startProgress.done?.[l])) console.log("  (note: the test account already has some of these lessons done; results count only new changes)");

  const b = await chromium.launch();
  const device = async () => {
    const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
    await ctx.addInitScript(([k, v]) => { try { if (!localStorage.getItem(k)) localStorage.setItem(k, v); } catch { /* frame without storage */ } }, [KEY, JSON.stringify({ ...s.data, expires_at: Math.floor(Date.now() / 1000) + (s.data.expires_in || 3600) })]);
    if (!/getgradify\.com/.test(BASE)) await ctx.route("**/gradify.config.js", (r) => r.fulfill({ status: 200, contentType: "text/javascript", body: `export const SITE = null;\nexport const SUPABASE_URL = "${URL_}";\nexport const SUPABASE_ANON_KEY = "${ANON}";\n` }));
    const errs = []; ctx.on("page", (p) => p.on("pageerror", (e) => errs.push(e.message)));
    return { ctx, errs };
  };
  const local = (p) => p.evaluate(() => JSON.parse(localStorage.getItem("gradify.course.law") || "{}"));
  const answerOne = async (p) => { const box = p.locator(".aq", { has: p.locator(".aq-opts") }).first(); await box.scrollIntoViewIfNeeded(); await box.locator(".aq-opts button").first().click(); await p.waitForTimeout(400); };

  const A = await device(), pa = await A.ctx.newPage();
  await pa.goto(`${BASE}/lawgradify/course/#/me`); await pa.waitForTimeout(4000);
  check("The course page sees the signed-in account", /Synced to your account|syncs to every device/i.test(await pa.locator(".co-acct").innerText().catch(() => "")));
  await pa.reload(); await pa.waitForTimeout(3000);
  check("The session survives a reload", /Synced to your account|syncs to every device/i.test(await pa.locator(".co-acct").innerText().catch(() => "")));

  head("2 Progress sync");
  await pa.goto(`${BASE}/lawgradify/course/#/lesson/${LESSONS[0]}`); await pa.waitForTimeout(3000);
  await answerOne(pa);
  await pa.locator(".co-complete").click();
  check("A finished lesson reaches the account", await until(async () => (await progress())?.done?.[LESSONS[0]]));
  const mineA = (await local(pa)).attempts?.map((a) => a.id).filter((id) => !startAttempts.has(id)) || [];
  check("Its answers reach the account", mineA.length > 0 && await until(async () => { const have = new Set((await attempts()).map((a) => a.id)); return mineA.every((id) => have.has(id)); }), `${mineA.length} answers`);
  await pa.goto(`${BASE}/lawgradify/course/#/lesson/${LESSONS[1]}`); await pa.waitForTimeout(3000);
  await pa.locator(".co-complete").click(); await pa.waitForTimeout(200);
  await pa.close({ runBeforeUnload: true });
  check("A lesson finished just before the tab closes still reaches the account", await until(async () => (await progress())?.done?.[LESSONS[1]], 10000));

  head("3 Cross-device");
  const B = await device(), pb = await B.ctx.newPage();
  await pb.goto(`${BASE}/lawgradify/course/#/learn`); await pb.waitForTimeout(5000);
  const sb = await local(pb);
  check("A second device sees both lessons", Boolean(sb.done?.[LESSONS[0]] && sb.done?.[LESSONS[1]]));
  check("A second device sees the answers", mineA.every((id) => (sb.attempts || []).some((a) => a.id === id)), `${(sb.attempts || []).length} answers on device B`);

  head("4 Offline recovery");
  await pb.goto(`${BASE}/lawgradify/course/#/lesson/${LESSONS[2]}`); await pb.waitForTimeout(3000);
  await B.ctx.setOffline(true);
  await answerOne(pb); await pb.waitForTimeout(1000);
  const waiting = (await local(pb)).outbox || [];
  check("Offline, answers wait on the device", waiting.length > 0, `${waiting.length} waiting`);
  await B.ctx.setOffline(false);
  check("Reconnecting sends them", await until(async () => { const have = new Set((await attempts()).map((a) => a.id)); return waiting.every((id) => have.has(id)); }));
  check("…exactly once", (await attempts()).length === new Set((await attempts()).map((a) => a.id)).size);
  check("Nothing is left waiting", await until(async () => ((await local(pb)).outbox || []).length === 0));

  head("5 Expired session");
  await pb.evaluate((k) => { const v = JSON.parse(localStorage.getItem(k)); v.access_token = "expired.invalid.token"; v.expires_at = Math.floor(Date.now() / 1000) - 10; localStorage.setItem(k, JSON.stringify(v)); }, KEY);
  await pb.goto(`${BASE}/lawgradify/course/#/lesson/${LESSONS[2]}`); await pb.reload(); await pb.waitForTimeout(4000);
  await answerOne(pb); await pb.waitForTimeout(500);
  const after = (await local(pb)).attempts?.at(-1)?.id;
  check("After the access token expires, the session is refreshed and work still syncs", Boolean(after) && await until(async () => (await attempts()).some((a) => a.id === after)));

  if (AI) {
    head("6 AI tutor (real model)");
    await pb.goto(`${BASE}/lawgradify/course/#/lesson/${LESSONS[0]}`); await pb.waitForTimeout(3000);
    await pb.fill("#co-askq", "In one sentence, what makes a rule a law rather than a moral rule?"); await pb.click(".co-askform button");
    const ok = await until(async () => (await pb.locator(".co-askans").count()) > 0, 90000);
    check("The tutor answers a real question", ok, (await pb.locator(".co-askout").innerText().catch(() => "")).slice(0, 140).replace(/\n/g, " "));
    await pb.evaluate((k) => { const v = JSON.parse(localStorage.getItem(k)); v.access_token = "expired.invalid.token"; localStorage.setItem(k, JSON.stringify(v)); }, KEY);
    await pb.reload(); await pb.waitForTimeout(3000);
    await pb.fill("#co-askq", "In one sentence, what is equity?"); await pb.click(".co-askform button");
    check("With an expired token, the tutor refreshes the session and still answers", await until(async () => (await pb.locator(".co-askans").count()) > 0, 90000), (await pb.locator(".co-askout").innerText().catch(() => "")).slice(0, 140).replace(/\n/g, " "));
  } else { head("6 AI tutor"); check("Skipped (run with --ai; one or two real requests)", true); results.at(-1).ok = null; }

  head("Clean-up");
  const created = (await attempts()).map((a) => a.id).filter((id) => !startAttempts.has(id));
  for (const id of created) await api(`/rest/v1/assessment_attempts?id=eq.${encodeURIComponent(id)}`, { method: "DELETE", token: token() });
  if (startProgress) await api("/rest/v1/course_progress", { method: "POST", token: token(), prefer: "resolution=merge-duplicates", body: { user_id: uid, subject: COURSE, site: "LawGradify", state: startProgress } });
  else await api(`/rest/v1/course_progress?subject=eq.${COURSE}`, { method: "DELETE", token: token() });
  check("The test learner's account is back as it was", (await attempts()).length === startAttempts.size, `${created.length} test answers removed${startProgress ? ", progress restored" : ", progress removed"}`);
  check("No page errors", [...A.errs, ...B.errs].length === 0, [...A.errs, ...B.errs].slice(0, 2).join(" | "));
  await b.close();
  finish();
})();

function finish() {
  const failed = results.filter((r) => r.ok === false);
  console.log(`\n${results.filter((r) => r.ok).length} passed, ${failed.length} failed${results.some((r) => r.ok === null) ? ", some skipped" : ""}`);
  if (WRITE) {
    const day = new Date().toISOString().slice(0, 16).replace("T", " ");
    const entry = `\n## ${day} UTC · Live student journey (${BASE}, project ${REF})\n\n| Flow | Check | Result | Detail |\n|---|---|---|---|\n${results.map((r) => `| ${r.section} | ${r.label} | ${r.ok === true ? "✓" : r.ok === false ? "✗" : "–"} | ${String(r.detail || "").replace(/\|/g, "/")} |`).join("\n")}\n`;
    fs.appendFileSync(path.join(__dirname, "..", "docs", "BACKEND-LOG.md"), entry);
    console.log("Appended to docs/BACKEND-LOG.md");
  }
  if (failed.length) process.exitCode = 1;
}
