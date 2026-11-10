// Calling Gradify's server functions (supabase/functions/*) from the browser, with every failure turned into a
// message a learner can act on. Used by the course tutor (kit/course/course.js) and the notes AI
// (kit/notes/engine.js), so each behaves the same way:
//   no account or not signed in   → error.signin = true (the caller shows its sign-in prompt)
//   access token expired          → the session is refreshed once and the request retried
//   still unauthorised            → "Your sign-in has expired…"
//   offline / unreachable / slow  → a plain message; nothing the learner did is lost
//   the function's own error      → its message (daily limits, notes too long, invalid input)
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../../gradify.config.js";

export const TIMEOUT_MS = 90_000;
const MSG = {
  signin: "Sign in to use Gradify AI.",
  expired: "Your sign-in has expired. Sign in again from Account, then try once more.",
  offline: "You're offline. Connect to the internet to use Gradify AI; your work is saved on this device.",
  unreachable: "Couldn't reach Gradify AI. Check your connection and try again in a moment.",
  slow: "Gradify AI took too long to answer. Check your connection and try again.",
};

/**
 * @param {object} store   the learner's store (kit/data/store.js): session(), refreshSession()
 * @param {string} name    the function, e.g. "course-tutor" or "study-pack"
 * @param {object} payload the JSON body
 * @param {{ fallback?: string, timeout?: number, fetch?: Function, online?: () => boolean, url?: string, anonKey?: string }} [o]
 */
export async function callFunction(store, name, payload, o = {}) {
  const { fallback = "Gradify AI isn't available right now.", timeout = TIMEOUT_MS, fetch: f = globalThis.fetch.bind(globalThis), online = () => globalThis.navigator?.onLine !== false, url = SUPABASE_URL, anonKey = SUPABASE_ANON_KEY } = o;
  let session = store?.mode === "cloud" ? await store.session?.().catch(() => null) : null;
  if (!session || !url) throw Object.assign(new Error(MSG.signin), { signin: true });
  const once = async (token) => {
    const ctl = new AbortController(), timer = setTimeout(() => ctl.abort(), timeout);
    try {
      return await f(`${url}/functions/v1/${name}`, { method: "POST", signal: ctl.signal, headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, apikey: anonKey }, body: JSON.stringify(payload) });
    } catch (e) {
      throw new Error(e?.name === "AbortError" ? MSG.slow : online() ? MSG.unreachable : MSG.offline);
    } finally { clearTimeout(timer); }
  };
  let res = await once(session.access_token);
  if (res.status === 401 && store.refreshSession) {
    session = await store.refreshSession().catch(() => null);
    if (session) res = await once(session.access_token);
  }
  const body = await res.json().catch(() => ({}));
  if (res.status === 401) throw Object.assign(new Error(MSG.expired), { expired: true });
  // Gradify AI refusals say why ({ reason, feature, plan, used, allowance, resetsAt, upgrade }: docs/APP-API.md)
  if (!res.ok) throw Object.assign(new Error(body.error || fallback), { status: res.status, reason: body.reason ?? null, upgrade: Boolean(body.upgrade), usage: body.usage ?? null, allowance: body.reason === "allowance" ? { feature: body.feature, plan: body.plan, used: body.used, allowance: body.allowance, resetsAt: body.resetsAt } : null });
  return body;
}

/** A link to the plans after an "allowance used up" message, for learners on Free. */
export const upgradeLink = (err, href = "/pricing.html") => (err?.upgrade ? ` <a href="${href}">See Gradify Pro</a>` : "");
export { MSG as FUNCTION_MESSAGES };
