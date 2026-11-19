# Draft for review: newsletter wording (not published)

Nothing here is on the site. `privacy.html` is unchanged. When approved, the section below goes into `privacy.html`
after "Launch lists", the MailerLite line goes into "Who else handles your data", and "Last updated" changes.
It doesn't change the "Launch lists" promise: launch-list addresses are still used for one email and never for
marketing, and they are never copied into the newsletter. The newsletter is a separate list that people join themselves.

Points to confirm before publishing are marked **[check]**.

---

## Email updates (privacy.html, new section after "Launch lists")

> **Email updates**
>
> If you choose to get email updates from Gradify, we send you occasional emails about Gradify: new features and
> subjects, learning and revision resources, and offers such as discounts on Gradify Pro. Not more than **[check: a few
> times a month]**.
>
> Signing up is optional and separate from having a Gradify account. Creating an account, using Gradify or buying a plan
> never signs you up, and the sign-up box is never ticked for you. We send a confirmation email first, and you're only
> added once you've confirmed (double opt-in).
>
> What we keep: your email address, your first name if you give it, and a record of your consent: when and where you
> signed up (which form or page), the wording you agreed to, and when you confirmed. Our email service also records
> whether each email was delivered, opened and which links were clicked, so we can see what's useful and stop emailing
> addresses that bounce.
>
> MailerLite sends the emails and stores the list for us, as our processor. **[check: MailerLite's company and where it
> stores data, from its data processing agreement; it is based in the EU]**
>
> Why we can do this: you asked for these emails (your consent). You can withdraw it at any time: every email has an
> unsubscribe link, or email privacy@getgradify.com. Unsubscribing stops the emails straight away; we keep your address
> on a do-not-email list only so you're never added again by mistake. Otherwise we delete your details within
> **[check: 30 days]** of unsubscribing, or after **[check: 2 years]** without opening an email.
>
> We don't sell or share the list, and we don't use it for advertising elsewhere.

## Who else handles your data (privacy.html, add one line)

> - **MailerLite** sends email updates, only to people who signed up for them, and stores that list.

## The sign-up form (MailerLite, linked from posts and the site)

- Field: email (required), first name (optional).
- One **unticked** checkbox, required to submit, with this exact text (wording version **v1, 19 November 2026**):

  > Email me occasional updates from Gradify: new features, learning resources and offers. I can unsubscribe at any time.
  > [Privacy](https://getgradify.com/privacy.html#email-updates)

- Double opt-in on (MailerLite → Forms → the form → Double opt-in).
- MailerLite records the sign-up time, the confirmation time and the form for each subscriber. Add a hidden field or
  form name that carries the wording version (`consent_v1`), so later changes to the wording can be told apart.
- Group: "Gradify". Send the launch campaign only to subscribers who joined through this form.

## Check before publishing

- [ ] The frequency, retention periods and MailerLite's details above.
- [ ] The anchor `#email-updates` added to the new heading.
- [ ] The MailerLite form's checkbox, wording and double opt-in match this page.
