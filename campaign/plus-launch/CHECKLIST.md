# Gradify Plus launch email: checklist

Work through this in order. Each step is yours to do or approve: nothing here has been sent, created or changed.
"Launch" (T) is the moment the first batch goes out. The code expires at T + 48 hours.

## 1. Decide who may receive it (UK PECR and UK GDPR)

PECR regulation 22 covers marketing email to **individual subscribers**: personal addresses, and also sole
traders and some partnerships. You may only email them with **consent**, or under the **soft opt-in**. Soft
opt-in applies only if all of these are true:

- you got their address in the course of a sale, or negotiations for a sale, of your own product;
- the email is about your own similar products;
- they were given a simple way to opt out when you collected the address;
- they get a simple way to opt out in every email.

Since the Data (Use and Access) Act 2025, PECR fines can reach UK GDPR levels. The ICO enforces actively, often
after a handful of complaints.

**Corporate subscribers** are companies, LLPs, Scottish partnerships and public bodies, at their own addresses
(e.g. `jane.smith@company.co.uk`). PECR's consent rule doesn't apply to them. You still must:

- say who you are;
- give a valid address for opting out;
- honour opt-outs;
- have a lawful basis under UK GDPR when the address names a person. Usually that's legitimate interests, with a
  short legitimate interests assessment, and your privacy notice must cover it. Gradify's privacy page doesn't
  cover marketing yet.

Treat student and school addresses (`.ac.uk`, `.sch.uk`) as **individuals**. They're used personally, and many of
the people behind them are under 18.

Apply this to every one of the 1,000 addresses, by where each address came from:

| Source | May they get this email? | Why |
| --- | --- | --- |
| `public.waitlist`, `site = 'Gradify Plus'` | **Yes, once.** | They consented to "one email when Gradify Plus opens". This is it. Afterwards delete their rows, because privacy.html promises that, and don't add them to any ongoing list. |
| `public.waitlist`, `site = 'Gradify Pro'` | **No, not yet.** | They asked to hear when **Pro** opens, and Pro isn't open. Keep them for the Pro launch email. |
| `public.waitlist`, a coming-soon site | **No.** | They asked about that site, not Plus. |
| Gradify account holders who aren't on the Plus list | **No.** | Sign-up collected no marketing consent and offered no opt-out, so soft opt-in fails, and privacy.html says nothing about marketing to accounts. Tell them in the app instead (the Plus card already shows). |
| Contacts from anywhere else: personal contacts, social followers, other projects, bought, rented or scraped lists | **No**, unless each person gave Gradify consent you can show. | Consent must be specific to Gradify and recorded. Never use a bought list. |
| Corporate addresses (e.g. a business or school's general inbox) | **Only** with a clear business reason, a legitimate interests assessment and an updated privacy notice. | Usually not worth it for this launch. Skip them. |

Before anything is sent:

- [ ] Export the eligible list from the Supabase dashboard (SQL editor). The table can't be read through the
      website: `select email, created_at from public.waitlist where site = 'Gradify Plus' order by created_at;`
- [ ] Keep that export privately as your consent record: address, list and date joined. Don't commit it to this
      repository.
- [ ] Remove anyone who has asked privacy@getgradify.com to be removed, and any address that has bounced before.
- [ ] Count what's left. If it's well under 1,000, that's the right number. Don't top it up from ineligible
      sources.
- [ ] Choose the `{{WHY_YOU_GET_THIS}}` line for this audience (README.md).
- [ ] After the send: delete the sent rows from `public.waitlist` (`site = 'Gradify Plus'`). privacy.html says
      that happens. Keep only the sending service's suppression list (unsubscribes and bounces), which you need
      to stop emailing them.
- [ ] Later, if you want an ongoing marketing list: add an unticked "Email me about Gradify news and offers"
      box at sign-up, store the consent and its date, and update privacy.html. That's a code change for a
      separate PR.

## 2. Mailbox and sending service

- [ ] **Sending address.** Suggested: `hello@getgradify.com`. It's already published in terms.html, privacy.html
      and pricing.html, and replies go somewhere you read. Today Cloudflare Email Routing receives mail for the
      domain. Check in Cloudflare that `hello@` forwards to an inbox you check.
- [ ] **A real sending service for the 1,000.** Don't BCC them from a personal Gmail or Outlook account. Use an
      email service provider (for example Brevo, Mailchimp, MailerLite, Resend Broadcasts or Postmark Broadcast).
      It needs:
  - [ ] a custom domain with DKIM;
  - [ ] a one-click `List-Unsubscribe` and `List-Unsubscribe-Post` header (Gmail and Yahoo require it for bulk
        mail);
  - [ ] an unsubscribe link merge tag for `{{UNSUBSCRIBE_URL}}`;
  - [ ] automatic suppression of bounces and complaints;
  - [ ] a UK/EU data processing agreement. Add the provider to privacy.html's list of processors.
- [ ] For replies sent by hand from hello@, use a mailbox that can send as the domain, such as Google Workspace or
      Fastmail. Cloudflare Email Routing can only receive.

## 3. SPF, DKIM and DMARC (Cloudflare DNS for getgradify.com)

Current records (checked 17 Nov 2026):

- MX: `route1/2/3.mx.cloudflare.net`
- SPF: `v=spf1 include:_spf.mx.cloudflare.net ~all`
- DMARC: **none**

Steps:

- [ ] **DKIM:** add the CNAME or TXT records the sending service gives you (e.g. `s1._domainkey`). Wait until it
      shows "verified".
- [ ] **SPF:** keep **one** SPF record and add the provider to it. For example:
      `v=spf1 include:_spf.mx.cloudflare.net include:<provider's include> ~all`
      Two SPF records make both fail. Keep it under 10 DNS lookups.
- [ ] **Return-path / bounce domain:** if the provider offers a custom one (e.g. `bounce.getgradify.com`), set it
      up so SPF aligns with getgradify.com.
- [ ] **DMARC:** add TXT `_dmarc.getgradify.com`:
      `v=DMARC1; p=none; rua=mailto:dmarc@getgradify.com; adkim=r; aspf=r; pct=100`
      Route `dmarc@` in Cloudflare Email Routing first. Once 2 to 4 weeks of reports look clean, move to
      `p=quarantine`.
- [ ] Check all three with MXToolbox (SPF, DKIM, DMARC lookups). Send to mail-tester.com and aim for 9/10 or more.
- [ ] Sign up getgradify.com to Google Postmaster Tools, to watch spam rate and reputation during the send.
- [ ] Do this **at least a few days before launch**. New DNS needs time to propagate, and a domain that starts
      sending the same hour it gets DKIM looks suspicious.

## 4. Stripe promotion code (live mode, after a test-mode rehearsal)

Gradify's checkout already allows promotion codes (`allow_promotion_codes` in
`supabase/functions/billing-checkout`), so no code change is needed.

- [ ] **Test mode first.** In Stripe's test mode, create the same coupon and code. Then subscribe a test account
      through getgradify.com with card `4242 4242 4242 4242` and check:
  - [ ] the first invoice is **£5.00**;
  - [ ] the next upcoming invoice is **£10.00**;
  - [ ] the code is refused a second time on the same account;
  - [ ] the webhook still records the plan as Plus.
- [ ] **Coupon:** Product catalogue → Coupons → Create.
  - [ ] Name: "Gradify Plus launch: £5 off the first month".
  - [ ] Type **Fixed amount**, **£5.00 GBP**. Plus is £10 VAT-inclusive, so £5 off makes the first month £5.
        Confirm that on the test invoice, especially if Stripe Tax is on.
  - [ ] Duration **Once**.
  - [ ] **Apply to specific products: Gradify Plus only**, so it can't discount Pro later.
- [ ] **Promotion code** on that coupon:
  - [ ] Code `GRADIFY48`.
  - [ ] Tick **Eligible for first-time order only**. Stripe then only accepts it from a customer with no previous
        successful payment. Because each Gradify account has a single Stripe customer, that means one use per
        account, and not for anyone who has paid before. Someone with a second Gradify account under another
        email could use it again; that's acceptable at this scale.
  - [ ] Optionally **Limit the number of times this code can be redeemed** to the number of recipients.
  - [ ] **Expiration date:** T + 48 hours. Check the time zone Stripe shows matches UK time, and put the same
        time in `{{OFFER_ENDS}}`.
- [ ] **Customer-facing wording:** if you use Stripe's "custom text" or the email's wording, it must match: £5
      for the first month, then £10 a month until cancelled.
- [ ] At T + 48 hours, check the code shows as expired. If it doesn't, archive it by hand.

## 5. Discord invite

- [ ] Create the server, or confirm it exists, with a #welcome channel, rules and moderation. Turn on AutoMod.
      Some learners will be 13 to 17, which is Discord's minimum age range, so set it up with that in mind.
- [ ] Create an invite that **never expires** and has **no use limit**, from a channel everyone can see.
- [ ] Put it in `{{DISCORD_URL}}` in email.html, email.txt and signature.html. If there's no Discord by launch,
      delete the marked DISCORD blocks. Don't send a dead link.

## 6. Fill the placeholders and build the campaign

- [ ] Fill every placeholder in README.md. Search the files for `{{` and check nothing is left.
- [ ] In the sending service, create the campaign:
  - [ ] HTML part: email.html.
  - [ ] Plain-text part: email.txt, **without** its Subject and Preheader lines.
  - [ ] Subject: `Gradify Plus is open: £5 for your first month, for 48 hours`.
  - [ ] From: "{{FOUNDER_FIRST_NAME}} at Gradify" `<hello@getgradify.com>`. Reply-to: the same.
- [ ] Turn **off** open and click tracking for the first send, or at least know it rewrites links. Tracked links
      on a brand-new domain can hurt delivery. The `utm_` tags on the links already tell you what came from the
      email.
- [ ] Check the prices against `kit/data/billing.js` once more: Plus £10 a month, and the offer £5 off the first
      month.

## 7. Test sends (before any real recipient)

Send to your own addresses in each of these, and check them in light and dark mode:

- [ ] **Gmail:** web and the iOS/Android app. Check for no clipping (the email is well under 102 KB) and that the
      preheader shows.
- [ ] **Outlook:** Windows desktop (the Word renderer: the button and offer box must still look right),
      Outlook.com and the Outlook mobile app.
- [ ] **Apple Mail:** macOS and iPhone.
- [ ] In each one, check that:
  - [ ] the code `GRADIFY48` is readable and copyable;
  - [ ] every link works, including Unsubscribe, Privacy, Terms and Discord;
  - [ ] unsubscribing actually removes the test address;
  - [ ] the plain-text version reads cleanly;
  - [ ] the footer shows Gradify Ltd's number and address;
  - [ ] it lands in the **inbox**, not spam or Promotions → Spam.
- [ ] mail-tester.com score 9/10 or better, with SPF, DKIM and DMARC all passing.
- [ ] Do one full purchase in **live** mode with the real code on your own card. Check you're charged £5 and the
      next invoice is £10. Then refund and cancel it in Stripe if you don't want to keep it.

## 8. Send in small warm-up batches

getgradify.com has no sending history, so don't send all of them at once. The batches must fit inside the 48-hour
offer, and everyone should get at least about 24 hours to use the code:

| When | Batch | Who |
| --- | --- | --- |
| T | 50 | The most recent joiners, who are the most likely to open it |
| T + 2 h | 100 | |
| T + 6 h | 200 | |
| T + 12 h | 300 | |
| T + 20 h | The rest | |

Between batches, check the sending service and Google Postmaster Tools. **Pause** if:

- bounces go above 2%;
- spam complaints go above 0.1% (Gmail's hard limit is 0.3%);
- any batch lands in spam on your seed addresses.

If the list ends up much smaller than 1,000, two batches (T and T + 4 h) are enough.

## 9. After the send

- [ ] Reply to replies from hello@ within a day.
- [ ] Process unsubscribes immediately. The service does this, but check that no manual list bypasses it.
- [ ] Delete the sent Plus-waitlist rows, as section 1 says.
- [ ] Note what was sent, to how many people, when and from which list. Keep that as your record.
