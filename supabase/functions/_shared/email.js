// Gradify's EmailService (decision D6): one interface for every email Gradify sends, so the provider can change
// without touching anything that sends mail. Plain JavaScript: runs in Deno (supabase/functions/send-email) and in
// Node (tests/email.test.mjs). Never used from the browser: provider keys live only in the function's environment.
//
//   const mail = emailService({ provider: resendProvider({ apiKey }), from: "Gradify <hello@getgradify.com>", siteUrl });
//   await mail.send({ to, template: "org_invitation", data, key })   // → { ok, id } or { ok: false, retry, error }
//
// Emails are written here from templates (subject, plain text and HTML), with every value from the data escaped.
// Links only ever point at the Gradify site. `key` is passed to the provider as an idempotency key, so a retry after
// a timeout can't send the same email twice.

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const ROLE = { owner: "an owner", admin: "an administrator", unit_head: "a head of department", academic_lead: "an academic lead", teacher: "a teacher", assistant: "a teaching assistant", student: "a student", auditor: "an auditor" };

/** The emails Gradify sends. Each returns { subject, text, html, link? } from its data. */
export const TEMPLATES = {
  org_invitation: (d, site) => {
    const link = `${site}/app.html#/join/${encodeURIComponent(d.token)}`;
    const days = Number(d.expires_days) || 7;
    return {
      subject: `You're invited to join ${d.organisation} on Gradify`,
      lines: [`You've been invited to join ${d.organisation} on Gradify as ${ROLE[d.role] || "a member"}.`, `Accept the invitation (it lasts ${days} ${days === 1 ? "day" : "days"}):`],
      link, cta: "Accept the invitation",
      foot: "Joining gives the organisation access to the work you do for it, not to your own study on Gradify. If you weren't expecting this, ignore it.",
    };
  },
  classroom_invitation: (d, site) => ({ subject: `Join ${d.classroom} on Gradify`, lines: [`${d.teacher || "Your teacher"} has invited you to ${d.classroom}.`], link: `${site}/app.html#/join/${encodeURIComponent(d.token)}`, cta: "Join the class" }),
  notification_digest: (d, site) => ({ subject: d.title || "What's new on Gradify", lines: [].concat(d.lines || []).slice(0, 20), link: `${site}/app.html#/inbox`, cta: "Open Gradify" }),
  assignment_published: (d, site) => ({ subject: `New work: ${d.assignment}`, lines: [`${d.classroom}: ${d.assignment}${d.due ? `, due ${d.due}` : ""}.`], link: `${site}/app.html#/inbox`, cta: "Open it" }),
  feedback_released: (d, site) => ({ subject: `Feedback on ${d.assignment}`, lines: [`Your teacher has returned ${d.assignment}.`], link: `${site}/app.html#/inbox`, cta: "See your feedback" }),
  training_reminder: (d, site) => ({ subject: `Reminder: ${d.programme}`, lines: [`${d.programme}${d.due ? ` is due ${d.due}` : ""}.`], link: `${site}/app.html#/inbox`, cta: "Continue" }),
  certificate_awarded: (d, site) => ({ subject: `Your certificate: ${d.programme}`, lines: [`Well done: you've completed ${d.programme}.`], link: `${site}/app.html#/inbox`, cta: "See your certificate" }),
};

/** An email from a template: subject, plain text and HTML, with the data escaped and links kept on the site. */
export function render(template, data = {}, { siteUrl = "https://getgradify.com" } = {}) {
  const make = TEMPLATES[template];
  if (!make) throw new Error(`Unknown email template: ${template}`);
  const site = String(siteUrl).replace(/\/+$/, "");
  const t = make(data || {}, site);
  if (t.link && !t.link.startsWith(`${site}/`)) throw new Error("Email links must point at the Gradify site.");
  const subject = String(t.subject).replace(/[\r\n]+/g, " ").slice(0, 200);
  const text = [...t.lines, ...(t.link ? ["", t.link] : []), ...(t.foot ? ["", t.foot] : []), "", "Gradify · getgradify.com"].join("\n");
  const html = `<!doctype html><html lang="en"><body style="margin:0;padding:24px;background:#f6f6fb;font:16px/1.55 -apple-system,Segoe UI,Roboto,sans-serif;color:#0d0d18">
<div style="max-width:520px;margin:0 auto;background:#fff;border-radius:14px;padding:28px;border:1px solid #e4e4ee">
<p style="margin:0 0 18px;font-weight:700;font-size:18px">Gradify</p>
${t.lines.map((l) => `<p style="margin:0 0 12px">${esc(l)}</p>`).join("")}
${t.link ? `<p style="margin:22px 0"><a href="${esc(t.link)}" style="display:inline-block;background:#0d0d18;color:#fff;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:600">${esc(t.cta || "Open Gradify")}</a></p><p style="margin:0 0 12px;font-size:13px;color:#545466;word-break:break-all">${esc(t.link)}</p>` : ""}
${t.foot ? `<p style="margin:18px 0 0;font-size:13px;color:#545466">${esc(t.foot)}</p>` : ""}
</div></body></html>`;
  return { subject, text, html };
}

/** Resend (resend.com). Errors are retryable when the provider is busy or down, not when the request was wrong. */
export function resendProvider({ apiKey, fetch: f = globalThis.fetch, url = "https://api.resend.com/emails" } = {}) {
  if (!apiKey) throw new Error("RESEND_API_KEY is missing.");
  return {
    name: "resend",
    async send({ from, to, subject, text, html, key }) {
      let res;
      try {
        res = await f(url, { method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", ...(key ? { "Idempotency-Key": String(key).slice(0, 256) } : {}) }, body: JSON.stringify({ from, to: [to], subject, text, html }) });
      } catch (e) { return { ok: false, retry: true, error: `network: ${e?.message || e}`.slice(0, 300) }; }
      const body = await res.json().catch(() => ({}));
      if (res.ok && body.id) return { ok: true, id: body.id };
      return { ok: false, retry: res.status === 429 || res.status >= 500, error: `${res.status}: ${body.message || body.name || "error"}`.slice(0, 300) };
    },
  };
}
/** For development and tests: keeps what would have been sent. */
export function memoryProvider() {
  const sent = [];
  return { name: "memory", sent, async send(m) { sent.push(m); return { ok: true, id: `mem_${sent.length}` }; } };
}

/** The service everything sends through. */
export function emailService({ provider, from, siteUrl }) {
  if (!provider) throw new Error("No email provider.");
  if (!from) throw new Error("GRADIFY_EMAIL_FROM is missing.");
  return {
    provider: provider.name,
    async send({ to, template, data, key }) {
      if (!to || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(to)) return { ok: false, retry: false, error: "no valid address" };
      let msg;
      try { msg = render(template, data, { siteUrl }); } catch (e) { return { ok: false, retry: false, error: String(e.message).slice(0, 300) }; }
      return provider.send({ from, to, ...msg, key });
    },
  };
}

/**
 * Sends what's due in the outbox (public.email_outbox) through a database client with the service role:
 * claim_email_batch → send each → finish_email. Safe to run on a schedule and to overlap (rows are claimed with
 * SKIP LOCKED). Returns { sent, failed }.
 */
export async function drainOutbox({ rpc, mail, limit = 50 }) {
  const { data: batch, error } = await rpc("claim_email_batch", { p_limit: limit });
  if (error) throw new Error(error.message || String(error));
  let sent = 0, failed = 0;
  for (const e of batch || []) {
    const r = await mail.send({ to: e.to_address, template: e.template, data: e.data, key: e.dedupe_key });
    // a request that can never succeed (no address, bad template) is given up on at once by marking it at the limit
    await rpc("finish_email", { p_id: e.id, p_ok: r.ok, p_provider_id: r.id ?? null, p_error: r.ok ? null : `${r.retry ? "" : "[permanent] "}${r.error}` });
    if (r.ok) sent++; else failed++;
  }
  return { sent, failed };
}
