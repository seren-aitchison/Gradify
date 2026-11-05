// Calling server functions (kit/data/functions.js) and syncing course work (kit/course/progress.js): the failure
// scenarios a real learner meets, each ending in a clear message or a retry, never in lost work.
import { test } from "node:test";
import assert from "node:assert/strict";
import { callFunction, FUNCTION_MESSAGES as M } from "../kit/data/functions.js";
import { mergeAttempts, queueAttempt, outboxAttempts, confirmAttempts, cloudCopy, mergeProgress } from "../kit/course/progress.js";

const res = (status, body) => ({ status, ok: status >= 200 && status < 300, json: async () => (body === undefined ? Promise.reject(new Error("not json")) : body) });
const store = (o = {}) => ({ mode: "cloud", session: async () => ({ access_token: "t1" }), refreshSession: async () => ({ access_token: "t2" }), ...o });
const opts = (f, o = {}) => ({ url: "https://p.supabase.co", anonKey: "anon", fetch: f, ...o });

test("not signed in: the caller is told to show its sign-in prompt", async () => {
  await assert.rejects(callFunction({ mode: "local" }, "course-tutor", {}, opts(async () => res(200, {}))), (e) => e.signin === true);
  await assert.rejects(callFunction(store({ session: async () => null }), "course-tutor", {}, opts(async () => res(200, {}))), (e) => e.signin === true);
  await assert.rejects(callFunction(store(), "course-tutor", {}, opts(async () => res(200, {}), { url: "" })), (e) => e.signin === true, "no backend configured counts as no account");
});

test("an expired access token is refreshed once and the request retried", async () => {
  const seen = [];
  const out = await callFunction(store(), "course-tutor", { q: 1 }, opts(async (u, init) => { seen.push(init.headers.Authorization); return seen.length === 1 ? res(401, { error: "jwt expired" }) : res(200, { answer: "ok" }); }));
  assert.deepEqual(out, { answer: "ok" });
  assert.deepEqual(seen, ["Bearer t1", "Bearer t2"]);
});

test("a sign-in that can't be refreshed ends in a clear message", async () => {
  await assert.rejects(callFunction(store({ refreshSession: async () => null }), "course-tutor", {}, opts(async () => res(401, { error: "x" }))), { message: M.expired });
  await assert.rejects(callFunction(store(), "course-tutor", {}, opts(async () => res(401, {}))), { message: M.expired }, "still 401 after refreshing");
});

test("offline, unreachable and slow services each get their own message", async () => {
  const fail = async () => { throw new TypeError("Failed to fetch"); };
  await assert.rejects(callFunction(store(), "x", {}, opts(fail, { online: () => false })), { message: M.offline });
  await assert.rejects(callFunction(store(), "x", {}, opts(fail, { online: () => true })), { message: M.unreachable });
  const hang = (u, init) => new Promise((_, reject) => init.signal.addEventListener("abort", () => reject(Object.assign(new Error("aborted"), { name: "AbortError" }))));
  await assert.rejects(callFunction(store(), "x", {}, opts(hang, { timeout: 20 })), { message: M.slow });
});

test("the function's own errors are passed on, with a fallback when the reply isn't readable", async () => {
  await assert.rejects(callFunction(store(), "x", {}, opts(async () => res(429, { error: "You've reached today's limit." }))), (e) => e.message === "You've reached today's limit." && e.status === 429);
  await assert.rejects(callFunction(store(), "x", {}, opts(async () => res(502), { fallback: "Tutor unavailable." })), { message: "Tutor unavailable." });
});

const att = (id, at) => ({ id, at, subject: "law", question: { id: "q" }, score: 1 });
test("answers from two devices merge without duplicates, in time order, capped", () => {
  const a = [att("a", "2026-01-01"), att("b", "2026-01-03")], b = [att("b", "2026-01-03"), att("c", "2026-01-02")];
  assert.deepEqual(mergeAttempts(a, b).map((x) => x.id), ["a", "c", "b"]);
  assert.deepEqual(mergeAttempts(a, b, 2).map((x) => x.id), ["c", "b"], "the oldest drop off past the cap");
});

test("an answer stays queued until the account confirms it, and a retry sends only what's missing", () => {
  const S = { attempts: [att("a", "1"), att("b", "2")] };
  queueAttempt(S, "a"); queueAttempt(S, "b"); queueAttempt(S, "a");
  assert.deepEqual(S.outbox, ["a", "b"], "queued once each");
  assert.deepEqual(outboxAttempts(S).map((x) => x.id), ["a", "b"]);
  confirmAttempts(S, ["a"]);
  assert.deepEqual(S.outbox, ["b"], "a failed or partial upload leaves the rest queued");
  S.attempts = [att("c", "3")]; confirmAttempts(S, []);
  assert.deepEqual(S.outbox, [], "ids whose answer has aged out are dropped, since there is nothing left to send");
});

test("the device's queue and sync status never go to the account, and survive a merge", () => {
  const S = { done: { l1: 1 }, attempts: [att("a", "1")], outbox: ["a"], sync: { ok: 5 } };
  assert.deepEqual(Object.keys(cloudCopy(S)), ["done"]);
  const m = mergeProgress(S, { done: { l2: 2 }, updated: 9 });
  assert.deepEqual(m.outbox, ["a"]); assert.deepEqual(m.done, { l1: 1, l2: 2 });
});
