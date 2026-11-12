// Launch lists: "tell me when this opens", for a Gradify site that's coming soon or for Gradify Pro.
// Writes one row to public.waitlist (email + what it's for). The table is insert-only through the API: nobody,
// including the person who joined, can read it back, and joining twice is ignored. Without accounts configured it
// is kept in this browser only. privacy.html says what's kept and why.
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../../gradify.config.js";

export const PRO_LIST = "Gradify Pro";
// the same pattern as the table's check constraint, plus the longest address email allows (254 characters)
export const validEmail = (e) => { const s = String(e ?? "").trim(); return s.length <= 254 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s); };

/** Join the list for `what` (a site name, or PRO_LIST). Resolves to a message for the learner; throws on failure. */
export async function joinWaitlist(email, what, { fetch: f = globalThis.fetch?.bind(globalThis), url = SUPABASE_URL, key = SUPABASE_ANON_KEY } = {}) {
  // one entry per address and list whatever the capitals (the table's unique key is on the exact text)
  email = String(email ?? "").trim().toLowerCase();
  if (!validEmail(email)) throw Object.assign(new Error("Please enter a valid email address."), { invalid: true });
  const done = what === PRO_LIST ? "Thanks. We'll email you once, when Gradify Pro opens." : `Thanks. We'll email you when ${what} launches.`;
  if (url && key) {
    const res = await f(`${url}/rest/v1/waitlist`, {
      method: "POST",
      headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=minimal,resolution=ignore-duplicates" },
      body: JSON.stringify({ email, site: what }),
    });
    if (!res.ok && res.status !== 409) throw new Error(String(res.status));
    return done;
  }
  try { const list = JSON.parse(localStorage.getItem("gradify.waitlist") || "[]"); list.push({ email, site: what, at: Date.now() }); localStorage.setItem("gradify.waitlist", JSON.stringify(list)); } catch { /* storage blocked */ }
  return "Noted on this device. Launch emails start when Gradify accounts open.";
}
