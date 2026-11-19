# Gradify Pro launch: Discord and Reddit posts (review, then post by hand)

Nothing here is posted automatically. Every post discloses that you founded Gradify. One post per community, each
adapted, spread over days: never the same text into many places at once, no DMs to members, no second accounts, no
asking friends to upvote.

**What could not be checked from here:** this environment can't open reddit.com or discord.com, so no community's rules
were read. Every community below is marked *rules not yet read*. Read the sidebar or rules channel yourself before
posting, and message the moderators first wherever promotion isn't clearly allowed.

## Facts the posts may use (checked against the live site and the code, 19 November 2026)

- **31 Gradify subject sites are live**, one account across all of them. Courses include GCSE, biology, chemistry,
  physics, maths, medicine, dentistry, nursing, pharmacy, veterinary, law, business, finance, computing, engineering,
  psychology, history, literature, languages, music, art and sport.
- **Free, no card:** 10 lessons in each course you start (with worked examples, interactive labs and practice
  questions), 5 flashcard sets with spaced repetition, 5 mind maps, the study tools (lesson search, mind map and
  flashcard creators, notes converter) 5 times each, basic revision and progress (due cards, streaks, XP, the Gradify
  road), manual study planning, one study device.
- **Notes Studio:** paste notes or upload a PDF; Gradify suggests flashcards from what you wrote, and you keep the ones
  you want. (Gradify AI is *not* switched on yet: don't mention AI.)
- **Gradify Pro (£10 a month):** no limits; Smart Plan (your week planned around your free time, replanned when you
  miss a day); readiness forecasts; cards ordered by what's fading and matters most; revision recommendations with a
  reason for each; timed exams and the full question bank; calendar import (a calendar link or .ics file) and export of your plan, and reminders; every device.
- **Offer:** first month £5, then £10 a month, cancel any time. Code GRADIFY48 is applied automatically through the
  links below (it can also be typed at checkout). First Gradify Pro subscription only. Ends **Sunday 22 November 2026,
  23:59 UK time**. Remove the offer line from anything posted after that.

Don't claim: user numbers, results, grade improvements, "AI", reviews or testimonials. None exist yet.

## Links (each place gets its own, so you can see where sign-ups came from)

Pattern: `https://getgradify.com/pricing.html?offer=GRADIFY48&utm_source=SOURCE&utm_medium=MEDIUM&utm_campaign=pro_launch`

The offer and the tags only work through this link (getgradify.com's front page doesn't pick them up). Pricing keeps
the tags until the visitor makes an account, where they're stored as `first_touch` (fixed 19 Nov in #124). `OUTREACH.md` has the first set; add one per new community: `utm_source=reddit_6thform`,
`utm_source=reddit_uniuk`, `utm_source=discord_<server>` and so on, `utm_medium=community`.

**The four numbers, per source** (Supabase → SQL editor; read-only queries, checked against the live database on
19 November: 8 sign-ups since 1 November, all before tracking, 0 paying):

```sql
-- registrations, opened Pro checkout, and currently paying Pro: by the link that first brought each account
-- (paying_pro_now drops anyone who has since cancelled; Stripe → Payments has every purchase)
select coalesce(u.raw_user_meta_data->'first_touch'->>'utm_source', '(no source)') as source,
       count(*) as registrations,
       count(s.stripe_customer_id) as opened_checkout,
       round(100.0 * count(s.stripe_customer_id) / nullif(count(*), 0)) as checkout_start_pct,
       count(s.user_id) filter (where s.plan = 'plus' and (s.status in ('active', 'trialing')
         or (s.status = 'past_due' and s.current_period_end > now() - interval '3 days'))) as paying_pro_now
from auth.users u
left join public.subscriptions s on s.user_id = u.id
where u.created_at >= '2026-11-19'
group by 1 order by registrations desc;

-- visits to Pricing (anonymous counts, not unique people) by referring site, from 19 November
select day, coalesce(referrer, '(none: app, email or direct)') as referrer, count(*) as visits
from public.page_events
where path = '/pricing.html' and event = 'view' and day >= '2026-11-19'
group by 1, 2 order by 1, 3 desc;
```

`opened_checkout` counts accounts that started a Stripe Checkout at least once (Gradify creates their Stripe customer
then). Visits can't be split by `utm_source` (the counter never stores anything after `?`), only by referring site;
the Discord app sends no referrer, so Discord visits show as "(none)". Registrations and buyers are the reliable
per-link numbers. Paying customers also show in Stripe → Payments.

## Discord

### Communities to consider (rules not yet read)

From the earlier research; member counts are as reported then, not checked today.

| Server | Reported members | Fit | Approach |
| --- | --- | --- | --- |
| Revision Server | ~21,000 | UK school and university revision | Read rules; look for #resources / #self-promo; else ask a mod |
| Blair's Brainiacs | ~13,000 | GCSE, A-level, university | Same; run by a revision creator, so ask a mod first |
| The Resit Room | ~2,900 | A-level resits, gap years | Small and focused: ask a mod, offer to answer questions |
| Study Together | ~1,000,000 | Global study rooms | Very large, strict servers usually: self-promo channel only |
| Study With Me | ~53,000 | Pomodoro, productivity | Productivity version only, in a promo channel |
| STUDYFLOW | ~28,000 | Focus rooms, study habits | Same |
| Homework Help | ~145,000 | Broad homework help | Low fit (people want answers); skip unless a resources channel exists |

To find more: search Discord's Discover and disboard.org for "GCSE", "A-level", "medicine UK", "uni UK"; prefer servers
with a stated self-promotion or resources channel. Add each to the table with its rule before posting.

### Asking a moderator (send first wherever promotion isn't clearly allowed)

> Hi! I'm Seren, I built Gradify (getgradify.com), a free revision site with courses, flashcards and practice questions
> for GCSE through university. Would it be OK to share it once in the right channel? There's a launch offer this week,
> but most of it is free. Happy to follow whatever you prefer, and no worries if it's a no.

### 0. Preferred: free-first, no offer (use this by default)

> 📚 **I built a free revision site and would love some feedback**
>
> Hi everyone! I'm Seren, the founder of Gradify (getgradify.com), so full disclosure: this is my own project.
>
> I've been building a platform that brings learning and revision tools together:
> • Courses and lessons across 31 subject sites, from GCSE to university-level subjects
> • Worked examples, interactive labs and practice questions
> • Flashcards with spaced repetition
> • Flashcards suggested from your own notes or uploaded PDFs
> • Mind maps, study planning, streaks and XP
>
> The free version includes plenty to get started, and you don't need a payment card.
>
> There's also an optional Pro subscription for personalised weekly revision planning, readiness forecasts,
> revision recommendations and more.
>
> I'd genuinely appreciate feedback from students: what's useful, what's missing, and what would make you actually
> want to use it?
>
> LINK

Use the versions below with the £5 offer only where a server's rules or a moderator allow promotional offers.

### 1. Main post (with the offer)

> **I built a free revision site and I'd love students to try it** 📚
>
> Hi everyone, I'm Seren, and I made **Gradify** (getgradify.com), so yes, this is my own project.
>
> The idea: one place to access courses, lessons and revision tools across 31 subjects, without juggling five apps.
> • **Courses** for GCSE, A-level sciences, maths, medicine, law, computing and more, with worked examples,
>   interactive labs and practice questions
> • **Flashcards with spaced repetition**, bringing topics back at the right intervals to help you retain them
> • **Turn your own notes into flashcards**: paste them or upload a PDF, keep the cards you want
> • **Mind maps, streaks and XP** to keep you going
>
> It's free to use, no card needed.
>
> There's also **Gradify Pro**, which plans your revision week for you around your free time, shows how ready you are
> for an exam, and ranks what to revise next. Launch offer until **Sunday 22 Nov (23:59 UK)**: **£5 for your first
> month**, then £10/month, cancel any time (first Gradify Pro subscription only). The code applies itself through this link:
> 👉 LINK
>
> I'm a solo founder, so honest feedback (what's confusing, what's missing) genuinely helps. Happy to answer anything here.

### 2. Short version (promo channels with tight limits)

> 📚 I built **Gradify**, a free revision site: courses (GCSE → uni), flashcards with spaced repetition, practice
> questions, and flashcards made from your own notes. Free, no card. Pro plans your revision week for you: **£5 first
> month** until Sun 22 Nov (then £10/mo, cancel any time; first Pro subscription only) 👉 LINK
> I'm the founder, so feedback very welcome!

### 3. GCSE / A-level version

> **Revising for GCSEs or A-levels? I built something that might help** ✏️
>
> I'm Seren, the founder of **Gradify** (getgradify.com). It's a free site for learning and revising:
> • Lessons with worked examples and practice questions (GCSE, biology, chemistry, physics, maths and more)
> • Flashcards with spaced repetition, bringing topics back at the right intervals to help you retain them
> • Paste your class notes and it suggests flashcards from them
> • Streaks and XP, if that keeps you going
>
> Free, no card needed. If you want it to plan your revision for you, **Gradify Pro** fits sessions into your free
> time, shows how ready you are for your exams and what to revise next. **£5 for the first month** until Sunday
> 22 Nov (then £10/month, cancel any time; first Pro subscription only) 👉 LINK
>
> Tell me what your exam board / subjects are and what's missing: I'm building this actively.

### 4. University version

> **For uni students: one place for your notes, flashcards and revision plan** 🎓
>
> I'm Seren, and I built **Gradify** (getgradify.com). Most people I know revise across lecture slides, Anki, a
> calendar and a to-do list. Gradify puts that in one place:
> • **Upload lecture notes (PDF or text)** and keep the flashcards it suggests
> • **Spaced repetition** for every deck
> • **Courses** in medicine, law, nursing, pharmacy, engineering, computing, psychology, business and more
> • **Pro:** a weekly plan built around your free time and exam dates, readiness forecasts, timed exams, and calendar
>   import your calendar and export your plan
>
> Free to use. Pro launch offer: **£5 first month** until Sun 22 Nov 23:59 UK, then £10/month, cancel any time (first Pro subscription
> only) 👉 LINK
>
> I'm the founder; I'd really value hearing how your course revises and where this falls short.

## Reddit

Lead with what's free (lessons, practice, flashcards, notes to flashcards, no card); Pro is optional. Reddit is the most sensitive to promotion. A post that reads as an ad gets removed and can get the account
banned from the subreddit. Rules of thumb: use your own long-standing account, disclose clearly, lead with the
problem or a question, put the link once at the end, reply to every comment, and don't repost to many subreddits in
one day.

### Subreddits (rules not yet read; what search turned up)

| Subreddit | Audience | What's known | Approach |
| --- | --- | --- | --- |
| r/6thForm | Sixth formers, A-levels, UCAS (~181k per a directory listing) | Rules not found | Read rules; modmail first |
| r/GCSE | GCSE students | Members have recently criticised paid revision apps | Free-first framing; modmail first; use any resources megathread |
| r/alevel | A-level students | Rules not found | Read rules; modmail first |
| r/UniUK | UK university students | Its wiki has survey rules; promotion rules not found | Read rules; modmail first |
| r/GetStudying | Study habits, global | A 2023 mod post covers app promotion and asks for modmail questions | Productivity/discussion version; modmail first |
| r/studytips | Study techniques | Rules not found | Discussion version |
| r/medicalschooluk | UK medical students | Rules not found | University version, medicine angle; modmail first |
| r/premeduk | UK medicine applicants | Rules not found | Probably low fit; only if allowed |
| r/Anki | Spaced repetition users | Self-promotion and market research get extra scrutiny; AI-built projects must be disclosed | Not for this launch: users compare directly with Anki, and promotion is scrutinised |
| r/SideProject | Makers | Built for sharing projects | General version, founder angle; good for feedback, few students |

### Titles

- General: *I built a free site that combines courses, flashcards and a revision plan. Would love feedback.*
- GCSE/A-level: *Made a free revision site for GCSE/A-level (lessons, practice questions, spaced repetition). What's missing?*
- University: *Uni students: how do you organise revision across modules? I built a tool for it and want honest feedback*
- Productivity: *What actually helped you stop wasting time deciding what to revise?*
- Short/thread: *Gradify: free revision site (founder here)*

### 0. Preferred: general introduction, free-first, no offer

**Title:** I built a free revision platform because I wanted learning and revision in one place. Would appreciate
some honest feedback

> Hi everyone! I'm Seren, and I've been building Gradify (getgradify.com).
>
> Full disclosure: I'm the founder, and there is an optional paid subscription.
>
> The problem I wanted to solve was having lessons in one place, flashcards somewhere else, revision plans in a
> calendar, and no clear idea of what to work on next. Gradify brings those things together.
>
> The free version currently includes:
> - Courses and lessons across 31 subject sites
> - Worked examples, interactive labs and practice questions
> - Flashcards with spaced repetition
> - Flashcards suggested from your own notes or uploaded PDFs
> - Mind maps, study tools, streaks and progress tracking
>
> You can start without a payment card.
>
> There's also Gradify Pro for people who want personalised weekly planning, readiness forecasts, revision
> recommendations and additional exam tools.
>
> I'm building this as a solo founder, and I'm much more interested in honest feedback than pretending the product is
> perfect. I'd particularly like to know:
> 1. What revision tools do you currently use?
> 2. What frustrates you about them?
> 3. What's missing from Gradify that would make it genuinely useful?
>
> Here's the site if anyone wants to have a look: LINK

Keep the launch discount out of general Reddit posts unless the subreddit explicitly allows promotional offers;
mention it in an approved promotion thread instead (version 5).

### 1. General introduction (with the offer; only where offers are allowed)

> I'm Seren, and over the past months I've built **Gradify** (getgradify.com), a place to learn and revise in one go.
> Disclosure up front: it's my project, and there's a paid tier.
>
> **Why:** revising usually means notes in one place, flashcards in another, a plan in your head, and no idea what
> you're actually ready for. I wanted one place with courses, lessons and revision tools across 31 subjects, that also tells you
> what to do next.
>
> **What's there now (free, no card):**
> - Courses across 31 subject sites, from GCSE to medicine, law and engineering, with worked examples, interactive
>   labs and practice questions
> - Flashcards with spaced repetition, and flashcards suggested from notes you paste or upload
> - Mind maps, streaks and XP
>
> **The paid part (Gradify Pro, £10/month):** it plans your week around your free time and exam dates, forecasts
> readiness, ranks what to revise next with a reason, and adds timed exams and calendar sync. This week it's £5 for
> the first month (until Sunday 22 Nov, 23:59 UK; first Pro subscription only; cancel any time).
>
> Link: LINK
>
> What I'd most like to know: what's confusing, what's missing for your subject, and whether the free part is enough
> on its own. I'll reply to everything.

### 2. GCSE / A-level

> I'm the founder of **Gradify** (getgradify.com), a free revision site, and I'd like feedback from people actually
> sitting GCSEs and A-levels.
>
> It has lessons with worked examples and practice questions (GCSE, biology, chemistry, physics, maths and more),
> flashcards that use spaced repetition, and you can paste your class notes to get flashcards suggested from them.
> Free, no card.
>
> There's a paid tier that plans your revision for you; it's £5 for the first month until Sunday 22 Nov (then
> £10/month; first Pro subscription only). You don't need it to use the site.
>
> LINK
>
> Which exam boards and subjects should I prioritise? And what do the revision sites you already use get wrong?

### 3. University

> Question first: how do you organise revision across several modules? Slides, Anki, a calendar, something else?
>
> I built **Gradify** (getgradify.com) because my own answer was "badly". You upload lecture notes and keep the
> flashcards it suggests, everything uses spaced repetition, and there are courses for medicine, law, nursing,
> pharmacy, engineering, computing, psychology and more. Free to use.
>
> The paid tier (£10/month; £5 first month until Sun 22 Nov, first Pro subscription only) plans your week around your free time and exam dates,
> forecasts readiness, adds timed exams and imports your calendar and exports your plan.
>
> Disclosure: it's mine. LINK
>
> I'd value honest takes on what would make you switch from what you use now, or why you wouldn't.

### 4. Productivity / revision (discussion first)

> What actually helped you stop wasting time deciding *what* to revise?
>
> For me the hard part was never the revising; it was the 20 minutes beforehand working out where to start. Things
> that helped: revising what you're about to forget first (spaced repetition), fixing repeated mistakes before
> learning new material, and planning sessions into real free time instead of an ideal timetable.
>
> I ended up building those ideas into a site, **Gradify** (getgradify.com; I'm the founder): flashcards with spaced
> repetition, a revision queue that says why each item is next, and a weekly plan that moves when you miss a day. The
> free part covers flashcards and courses; the planning is in a paid tier (£5 first month until Sun 22 Nov, then £10/month;
> first Pro subscription only): LINK
>
> But I'm more interested in your answers: what's worked for you?

### 5. Short (weekly promotion / resource threads)

> **Gradify** (getgradify.com): free revision site, GCSE to university. Courses with practice questions, flashcards
> with spaced repetition, flashcards from your own notes. Pro (£10/mo) plans your revision week; £5 first month until
> Sun 22 Nov (first Pro subscription only). I'm the founder; feedback welcome. LINK

## Where to start (in this order)

1. **r/SideProject**: introduce the product, founder feedback (if its current rules allow the post).
2. **Revision Server** (Discord): UK student audience.
3. **Blair's Brainiacs** (Discord): school and sixth form, with moderator permission.
4. **r/6thForm**: highly relevant; approach carefully, modmail first.
5. **r/UniUK**: university courses and feedback.
6. **The Resit Room** (Discord): small but very relevant.

Unread rules are a hard stop, not a formality: where rules are unclear, get a moderator's permission first. Start with
one approved Discord community and one approved subreddit, look at the results, then expand.

**Weekend scorecard (stretch targets, not forecasts):** reach ~1,000, 50 registrations, 5 checkout starts, 1 to 3
paying. Don't judge a community on one or two visits.

## Posting schedule (Thursday 19 to Sunday 22 November)

| Day | Discord | Reddit |
| --- | --- | --- |
| Thu evening | Moderator messages to 3 to 4 servers | Modmail to r/6thForm, r/UniUK, r/GCSE, r/GetStudying |
| Fri | Post where allowed (2 servers max) | r/SideProject (general) + one approved student subreddit |
| Sat | 1 to 2 more servers, answer every reply | One more approved subreddit; discussion post in r/studytips if allowed |
| Sun | Reply to existing conversations; a reminder only where a server's rules explicitly allow repeat posts | Reply to comments; offer reminder only in an approved promotion thread |

Check the source query each evening; put more effort into whichever sources bring sign-ups.

## Organisations (email, one at a time)

What the research found (19 November):

- The ambassador inboxes from the earlier research that could be confirmed (Surrey `ambassadors@surrey.ac.uk`, King's
  `ambassador@kcl.ac.uk`, UWE `student.ambassador@uwe.ac.uk`) are **the inboxes for running those paid ambassador
  schemes** (shifts, training, uniforms), not routes for outside partners. Don't pitch to them.
- Leeds Beckett `contentambassadors@…` and Plymouth `studentambassadors@…` **could not be confirmed** on any official
  page. Don't use them.
- Better routes, each to be checked on the organisation's own site before sending: a students' union's "advertise with
  us" or commercial/marketing page (these exist to promote services to students, sometimes paid); a university's
  stated partnerships or student-engagement contact; education charities' and tutoring companies' partnership
  addresses. Only use an address the organisation publishes for that purpose, and check it's the organisation itself
  (a company, university or charity), not an individual or an unincorporated society.

Before each email, check `campaign/plus-launch/do-not-contact.md` and skip anyone on it. Anyone who says no, or
doesn't want contact, goes on it the same day.
