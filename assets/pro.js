// The homepage's plan cards: Free, Pro and Ultra. Every price, allowance and the on-sale status come from
// kit/data/billing.js, the same source as pricing.html and the server's allowances (tests compare them), so the
// homepage can't promise something the product doesn't do.
import { PLAN_PRICES, PLUS_ON_SALE, PRO_ON_SALE, AI_ALLOWANCES, uses } from "../kit/data/billing.js";
import { pounds } from "../kit/data/plan.js";
import { joinWaitlist, PRO_LIST } from "../kit/data/waitlist.js";

const $ = (s) => document.querySelector(s);
import { esc } from "../kit/core/text.js";
const CK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>`;

for (const el of document.querySelectorAll(".pro [data-price]")) el.textContent = pounds(PLAN_PRICES[el.dataset.price].month);
// Ultra's list: its Gradify AI allowances, straight from billing.js ("40 AI tutor conversations a month")
$("#ultra-list")?.insertAdjacentHTML("beforeend", AI_ALLOWANCES.map((a) => `<li>${CK}<span>${esc(uses(a, a.pro))} a month</span></li>`).join(""));

$("#compare-price").textContent = `Prices include VAT. Gradify AI has a monthly fair-use limit.`;
$("#pro-status").innerHTML = PLUS_ON_SALE
  ? `<span class="tag on">Pro on sale</span> ${PRO_ON_SALE ? "Gradify Ultra is on sale too." : "Ultra opens when Gradify AI launches."} Cancel any time.`
  : `<span class="tag soon">Opening soon</span> Until Gradify Pro opens, everything on Gradify is free.`;

// "Notify me": one row in the launch list (kit/data/waitlist.js); no account, no payment
const form = $("#notify-pro");
form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const msg = $("#notify-msg"), input = form.querySelector("input"), btn = form.querySelector("button");
  btn.disabled = true;
  try {
    msg.textContent = await joinWaitlist(input.value, PRO_LIST);
    form.querySelector(".notify-row").hidden = true; form.classList.add("done");
  } catch (err) {
    msg.textContent = err.invalid ? err.message : "Sorry, that didn't work. Please try again in a moment.";
    input.focus();
  } finally { btn.disabled = false; }
});
