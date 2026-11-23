// Behaviour for Gradify's search pages (scripts/build-seo.mjs): the "Share with your study group" button (the phone's
// share sheet, or the link copied for WhatsApp, Discord or iMessage), the study-tips email opt-in, the free tools, and
// the "Print or save as PDF" buttons on templates. The pages work without it; this only adds what needs a script.
const $$ = (s) => document.querySelectorAll(s);

for (const b of $$("[data-share]")) b.addEventListener("click", async () => {
  const msg = b.parentElement.querySelector(".share-msg");
  const link = new URL(location.pathname, location.origin);
  link.searchParams.set("utm_source", "share"); link.searchParams.set("utm_medium", "group-chat");
  const data = { title: document.title, text: document.querySelector('meta[name="description"]')?.content || "", url: link.href };
  try {
    if (navigator.share) { await navigator.share(data); return; }
    await navigator.clipboard.writeText(`${data.title}\n${data.url}`);
    msg.textContent = "Link copied. Paste it into your group chat.";
  } catch (e) { if (e?.name !== "AbortError") msg.textContent = data.url; }
});

for (const f of $$("[data-optin]")) f.addEventListener("submit", async (e) => {
  e.preventDefault();
  const msg = f.querySelector(".optin-msg"), email = f.querySelector("input[type=email]").value;
  msg.textContent = "Sending…";
  try {
    const { joinWaitlist } = await import("/kit/data/waitlist.js");
    await joinWaitlist(email, "Study tips");
    msg.textContent = "Done. Your plan is on its way, then one tip a week.";
    f.querySelector("button").disabled = true;
  } catch (err) { msg.textContent = err?.invalid ? err.message : "That didn't send. Try again in a moment."; }
});

for (const b of $$("[data-print]")) b.addEventListener("click", () => print());

if (document.querySelector("[data-tool]")) import("/assets/study-tools.js").then((m) => m.mount());

// the privacy-first page count (no cookie, no identifier: kit/core/analytics.js), which keeps the referring site's host,
// so visits from ChatGPT, Perplexity, Gemini or Claude show up; and where a learner first came from, for sign-ups
import("/kit/core/analytics.js").then((m) => m.trackView("Gradify")).catch(() => {});
import("/kit/core/attribution.js").then((m) => m.captureFirstTouch()).catch(() => {});
