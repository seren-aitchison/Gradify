// Measuring real learning, with consent (docs/LEARNING-OUTCOMES.md,
// supabase/migrations/20261124170000_learning_outcomes_and_visuals.sql).
//   consent()            this learner's choice: { granted, over_16 } (signed in only)
//   setConsent(store, …) switch it on or off; off takes effect at once, everywhere
//   explanationPriors()  how often each way of explaining led to a right answer, across consenting learners (groups of
//                        10 or more only), for kit/learning/explain.js. {} until there's enough.
//   learningOutcomes()   per lesson: first-try accuracy and retention a week later, across consenting learners
//   summary()            whether there are enough consenting learners yet
// The measures hold no personal data and are public, so anyone can see what Gradify knows about how well it teaches.
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../../gradify.config.js";

export const CONSENT_VERSION = "2026-11";
const rpc = async (name, body = {}) => {
  if (!SUPABASE_URL) return null;
  const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${name}`, { method: "POST", headers: { apikey: SUPABASE_ANON_KEY, "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (!r.ok) throw new Error(`${name}: ${r.status}`);
  return r.json();
};
const cached = (key, ms, f) => async () => {
  try { const c = JSON.parse(sessionStorage.getItem(key) || "null"); if (c && Date.now() - c.at < ms) return c.v; } catch { /* fine */ }
  const v = await f(); try { sessionStorage.setItem(key, JSON.stringify({ at: Date.now(), v })); } catch { /* fine */ }
  return v;
};
export const explanationPriors = cached("gradify.outcomes.explain", 6 * 36e5, async () => {
  const rows = (await rpc("explanation_outcomes").catch(() => null)) || [];
  return Object.fromEntries(rows.map((r) => [r.strategy, { ok: Number(r.ok), no: Number(r.no), learners: Number(r.learners) }]));
});
export const learningOutcomes = cached("gradify.outcomes.lessons", 36e5, async () => (await rpc("learning_outcomes", { p_min: 10 }).catch(() => null)) || []);
export const summary = cached("gradify.outcomes.summary", 36e5, async () => (await rpc("outcomes_summary").catch(() => null)) || { enough: false, threshold: 10 });

export async function consent(store) {
  if (store?.mode !== "cloud" || !store.db) return null;
  const { data, error } = await store.db.from("research_consent").select("granted, over_16, version, updated_at").maybeSingle();
  // the table not there yet (before its migration runs): say so, rather than offer a switch that can't save
  if (error) return { unavailable: true };
  return data || { granted: false, over_16: false };
}
export async function setConsent(store, { granted, over_16 }) {
  const { error } = await store.db.from("research_consent").upsert({ granted: Boolean(granted && over_16), over_16: Boolean(over_16), version: CONSENT_VERSION, updated_at: new Date().toISOString() }, { onConflict: "user_id" });
  if (error) throw error;
}

/** The consent panel for Settings. */
export function consentPanelHtml(c, esc) {
  if (c?.unavailable) return `<article class="panel glass" data-pane="data"><h3>Help Gradify teach better</h3><p class="sub">Coming very soon: you'll be able to choose whether your answers help measure what teaches well. It's always off unless you switch it on.</p></article>`;
  if (!c) return `<article class="panel glass" data-pane="data"><h3>Help Gradify teach better</h3><p class="sub">Sign in to choose whether your answers help measure what teaches well. It's always off unless you switch it on.</p></article>`;
  return `<article class="panel glass oc-consent" data-pane="data"><div class="panel-head"><div><h3>Help Gradify teach better</h3><p class="sub">Off unless you switch it on. You can switch it off at any time, and it stops counting immediately.</p></div><span class="pill-dark">${c.granted ? "On" : "Off"}</span></div>
    <details><summary>What this means</summary><ul class="sub">
      <li><b>What's used:</b> whether your answers to Gradify's own questions were right, and when; and, after Gradify explains something another way, whether your next answer was right.</li>
      <li><b>What isn't:</b> your notes, your name, your email, anything you type, or anything outside Gradify's questions.</li>
      <li><b>How it's used:</b> only as totals across at least 10 people, worked out live (first-try accuracy and what's remembered a week later for each lesson, and which ways of explaining help). No one learner can be picked out, and nothing is copied or sold.</li>
      <li><b>Why:</b> so Gradify improves lessons by what actually helps people learn, not by guesswork. The totals are published on the <a href="/quality.html#outcomes">quality page</a>.</li>
      <li><b>Age:</b> you need to be 16 or over to switch this on.</li></ul></details>
    <label class="tl-fact"><input type="checkbox" class="tl-switch" id="oc-16" ${c.over_16 ? "checked" : ""}><span>I'm 16 or over</span></label>
    <label class="tl-fact"><input type="checkbox" class="tl-switch" id="oc-on" ${c.granted ? "checked" : ""} ${c.over_16 ? "" : "disabled"}><span>Count my answers towards Gradify's measures of what teaches well</span></label></article>`;
}
export function wireConsent(view, store, toast) {
  const on = view.querySelector("#oc-on"), age = view.querySelector("#oc-16"); if (!on) return;
  const save = async () => {
    on.disabled = !age.checked; if (!age.checked) on.checked = false;
    try { await setConsent(store, { granted: on.checked, over_16: age.checked }); toast(on.checked ? "Thank you. Your answers now help measure what teaches well." : "Switched off. Your answers no longer count, from now."); view.querySelector(".oc-consent .pill-dark").textContent = on.checked ? "On" : "Off"; }
    catch (e) { toast(`Couldn't save that: ${e.message}`); }
  };
  on.addEventListener("change", save); age.addEventListener("change", save);
}
