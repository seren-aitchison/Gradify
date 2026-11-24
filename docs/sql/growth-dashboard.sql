-- Gradify growth dashboard: acquisition → conversion → activation → retention → revenue, from data Gradify already
-- keeps. READ-ONLY: every statement is a SELECT. Nothing here creates, changes or deletes anything. Run the queries one
-- at a time in the Supabase SQL editor (they need the owner's role: page_events and auth.users aren't readable through
-- the API).
--
-- Where each number comes from, and what it can't tell you:
--   page_events      anonymous counts (no user, no session): page views and actions by page and referring host.
--                    Good for "which pages get visits and send people into the app". Can't follow one person.
--   auth.users       sign-ups, and raw_user_meta_data->'first_touch' (kit/core/attribution.js): the first referrer,
--                    utm tags and landing path of the browser that signed up. Missing when the visit had no referrer
--                    and no tags (typed or bookmarked), so "unknown" is not the same as "direct".
--   public.activity  learning events per account (flashcard sessions, quizzes, study blocks, reviews). Lessons done
--                    inside a course are saved in course_progress, NOT here, so activation and retention below
--                    UNDERCOUNT learners who only use courses. docs/SEO.md lists the fix (log a "lesson" activity).
--   subscriptions    paid plans (written by the Stripe webhook).
--   Google Search Console  impressions, clicks, CTR, position and queries: NOT in the database. Export from Search
--                    Console (Performance → Export) and join by page URL if wanted.
-- Unavailable is not zero: a query returning no rows means "not measured", not "nobody".
--
-- Definitions
--   page type       from the path: the same categories as scripts/seo-audit.mjs
--   meaningful learning action  an activity row of kind session, quiz, lesson, practice, review, review-fading,
--                   cards or block. Making a pack, rewards and sport check-ins don't count on their own.
--   activated       an account with a meaningful learning action within 7 days of signing up
--   WALS            Weekly Active Learning Students: accounts with at least one meaningful learning action in a week

-- 0. Shared definitions (paste above any query that uses them)
-- with learning as (
--   select user_id, at from public.activity
--   where kind in ('session', 'quiz', 'lesson', 'practice', 'review', 'review-fading', 'cards', 'block')
-- )

---------------------------------------------------------------------------------------------------------------------
-- 1. ACQUISITION: views by page type and source, last 28 days
select
  case
    when path = '/' or path = '/index.html' then 'home'
    when path ~ '^/features/' then 'feature'
    when path ~ '^/(tools|pdf-to-flashcards|lecture-notes-to-mind-map|notes-to-cheat-sheet|youtube-to-flashcards|notes-to-study-chant)/' then 'tool'
    when path ~ '^/(guides|vs|compare|checklists|glossary|templates)/' then 'guide'
    when path ~ '^/topics/' then 'topic'
    when path ~ '^/terms/' then 'key term'
    when path ~ '^/(questions|exam-traps)/' then 'practice questions'
    when path ~ '^/study-plan/' then 'study plan'
    when path ~ '^/[a-z]+gradify/(course/)?$' then 'site home or course'
    when path ~ '^/[a-z]+gradify/' then 'site page'
    else 'other'
  end as page_type,
  case
    when referrer is null then 'none (direct, app or hidden)'
    when referrer ~* '(^|\.)(google|bing|duckduckgo|yahoo|ecosia|yandex|baidu)\.' then 'search engine'
    when referrer ~* '(chatgpt\.com|openai\.com|perplexity\.ai|gemini\.google\.com|claude\.ai|copilot\.microsoft\.com)' then 'AI assistant'
    when referrer ~* '(tiktok|instagram|facebook|reddit|youtube|pinterest|x\.com|twitter|linkedin|discord)' then 'social'
    else 'other site'
  end as source,
  count(*) as views
from public.page_events
where event = 'view' and day > current_date - 28
group by 1, 2 order by 3 desc;

-- 2. LANDING-PAGE CONVERSION: clicks into the app per view, by page, last 28 days (pages with 50+ views)
select path,
  count(*) filter (where event = 'view') as views,
  count(*) filter (where event = 'cta_click') as app_clicks,
  round(100.0 * count(*) filter (where event = 'cta_click') / nullif(count(*) filter (where event = 'view'), 0), 1) as click_rate_pct,
  count(*) filter (where event = 'tool_use') as tool_uses
from public.page_events
where day > current_date - 28
group by 1 having count(*) filter (where event = 'view') >= 50
order by click_rate_pct asc nulls first;   -- weakest first: these are the pages to improve

-- 3. SIGN-UPS by week and first-touch source
select date_trunc('week', created_at)::date as week,
  case
    when raw_user_meta_data->'first_touch' is null then 'unknown'
    when raw_user_meta_data->'first_touch'->>'ai' is not null then 'AI assistant'
    when raw_user_meta_data->'first_touch'->>'utm_source' is not null then 'campaign: ' || (raw_user_meta_data->'first_touch'->>'utm_source')
    when raw_user_meta_data->'first_touch'->>'referrer' ~* '(^|\.)(google|bing|duckduckgo|yahoo|ecosia)\.' then 'search engine'
    else 'referral: ' || coalesce(raw_user_meta_data->'first_touch'->>'referrer', '?')
  end as source,
  count(*) as signups
from auth.users
where created_at > now() - interval '12 weeks'
group by 1, 2 order by 1 desc, 3 desc;

-- 4. SIGN-UPS by first landing page type (which kinds of page bring accounts)
select regexp_replace(coalesce(raw_user_meta_data->'first_touch'->>'landing', '(unknown)'), '^/([^/]*)/?.*$', '/\1/') as landing_section,
  count(*) as signups
from auth.users
where created_at > now() - interval '90 days'
group by 1 order by 2 desc;

-- 5. ACTIVATION: share of each week's sign-ups with a meaningful learning action within 7 days, and time to it
with learning as (
  select user_id, at from public.activity
  where kind in ('session', 'quiz', 'lesson', 'practice', 'review', 'review-fading', 'cards', 'block')
), first_value as (
  select u.id, u.created_at, min(l.at) as first_at
  from auth.users u left join learning l on l.user_id = u.id
  group by 1, 2
)
select date_trunc('week', created_at)::date as signup_week,
  count(*) as signups,
  count(*) filter (where first_at <= created_at + interval '7 days') as activated_7d,
  round(100.0 * count(*) filter (where first_at <= created_at + interval '7 days') / nullif(count(*), 0), 1) as activation_pct,
  round((percentile_cont(0.5) within group (order by extract(epoch from first_at - created_at) / 3600)
    filter (where first_at is not null))::numeric, 1) as median_hours_to_first_value
from first_value
where created_at > now() - interval '12 weeks' and created_at < now() - interval '7 days'
group by 1 order by 1 desc;

-- 6. RETENTION: of each week's sign-ups, who came back to learn on day 1, within days 2–7 and within days 8–30
with learning as (
  select user_id, at from public.activity
  where kind in ('session', 'quiz', 'lesson', 'practice', 'review', 'review-fading', 'cards', 'block')
)
select date_trunc('week', u.created_at)::date as signup_week,
  count(distinct u.id) as signups,
  round(100.0 * count(distinct l.user_id) filter (where l.at::date = u.created_at::date + 1) / nullif(count(distinct u.id), 0), 1) as d1_pct,
  round(100.0 * count(distinct l.user_id) filter (where l.at >= u.created_at + interval '1 day' and l.at < u.created_at + interval '7 days') / nullif(count(distinct u.id), 0), 1) as d7_pct,
  round(100.0 * count(distinct l.user_id) filter (where l.at >= u.created_at + interval '7 days' and l.at < u.created_at + interval '30 days') / nullif(count(distinct u.id), 0), 1) as d30_pct
from auth.users u left join learning l on l.user_id = u.id
where u.created_at > now() - interval '16 weeks'
group by 1 order by 1 desc;
-- recent weeks haven't had 30 days yet: read d30 only for weeks at least 30 days old

-- 7. NORTH STAR: Weekly Active Learning Students (WALS), and how many of them are new that week
with learning as (
  select user_id, at from public.activity
  where kind in ('session', 'quiz', 'lesson', 'practice', 'review', 'review-fading', 'cards', 'block')
)
select date_trunc('week', l.at)::date as week,
  count(distinct l.user_id) as wals,
  count(distinct l.user_id) filter (where u.created_at >= date_trunc('week', l.at)) as new_that_week,
  count(distinct l.user_id) filter (where u.created_at < date_trunc('week', l.at)) as returning
from learning l join auth.users u on u.id = l.user_id
where l.at > now() - interval '16 weeks'
group by 1 order by 1 desc;

-- 8. FEATURE ADOPTION: how many accounts use each kind of activity, and how many come back to it
select kind,
  count(distinct user_id) as accounts,
  count(distinct user_id) filter (where days >= 2) as used_on_2plus_days,
  sum(n) as events
from (select user_id, kind, count(*) as n, count(distinct at::date) as days from public.activity where at > now() - interval '90 days' group by 1, 2) x
group by 1 order by 2 desc;

-- 9. REVENUE: free to paid, by sign-up month
select date_trunc('month', u.created_at)::date as signup_month,
  count(*) as signups,
  count(s.user_id) filter (where s.status in ('active', 'trialing', 'past_due')) as paying_now,
  count(s.user_id) filter (where s.status = 'canceled' or s.cancel_at_period_end) as cancelled_or_cancelling,
  round(100.0 * count(s.user_id) filter (where s.status in ('active', 'trialing', 'past_due')) / nullif(count(*), 0), 2) as paid_pct
from auth.users u left join public.subscriptions s on s.user_id = u.id
group by 1 order by 1 desc;

-- 10. FUNNEL DIAGNOSIS: one row, last 28 days. Read it left to right; the biggest drop is the next thing to fix.
--   high impressions, low clicks   → Search Console (titles, descriptions): not in this database
--   views but few app clicks       → landing pages (query 2)
--   sign-ups but low activation    → first-use experience (query 5)
--   activation but low retention   → ongoing value (query 6)
--   retention but few paid         → Pro positioning (query 9)
with learning as (
  select user_id, at from public.activity
  where kind in ('session', 'quiz', 'lesson', 'practice', 'review', 'review-fading', 'cards', 'block')
), signups as (select id, created_at from auth.users where created_at > now() - interval '28 days')
select
  (select count(*) from public.page_events where event = 'view' and day > current_date - 28) as page_views,
  (select count(*) from public.page_events where event = 'cta_click' and day > current_date - 28) as app_clicks,
  (select count(*) from signups) as signups,
  (select count(distinct s.id) from signups s join learning l on l.user_id = s.id and l.at <= s.created_at + interval '7 days') as activated,
  (select count(distinct s.id) from signups s join learning l on l.user_id = s.id and l.at >= s.created_at + interval '1 day') as returned,
  (select count(*) from public.subscriptions where status in ('active', 'trialing', 'past_due')) as paying_now;

---------------------------------------------------------------------------------------------------------------------
-- For the growth report (scripts/growth/report.mjs). Download each result as CSV from the SQL editor and save it in
-- data/growth/inputs/ with the name given.

-- 11. save as db-signups-by-page.csv: sign-ups and activated learners by the exact page they first landed on (90 days)
with learning as (
  select user_id, at from public.activity
  where kind in ('session', 'quiz', 'lesson', 'practice', 'review', 'review-fading', 'cards', 'block')
)
select coalesce(u.raw_user_meta_data->'first_touch'->>'landing', '(unknown)') as landing,
  count(distinct u.id) as signups,
  count(distinct u.id) filter (where exists (select 1 from learning l where l.user_id = u.id and l.at <= u.created_at + interval '7 days')) as activated
from auth.users u
where u.created_at > now() - interval '90 days'
group by 1 order by 3 desc, 2 desc;

-- 12. save as db-retention-by-site.csv: for each site, learners active there in the last 90 days, and how many learned
-- there in 2 or more different weeks (coming back, not one visit)
with learning as (
  select user_id, site, at from public.activity
  where kind in ('session', 'quiz', 'lesson', 'practice', 'review', 'review-fading', 'cards', 'block') and at > now() - interval '90 days'
)
select site, count(distinct user_id) as learners,
  count(distinct user_id) filter (where weeks >= 2) as returning,
  round(100.0 * count(distinct user_id) filter (where weeks >= 2) / nullif(count(distinct user_id), 0), 1) as returning_pct
from (select user_id, site, count(distinct date_trunc('week', at)) as weeks from learning group by 1, 2) x
group by 1 order by 4 desc nulls last;

-- 13. save as db-features-and-paid.csv: which activity kinds paying learners used before they subscribed, compared
-- with free learners. An association, not proof a feature caused the purchase.
with paying as (select user_id from public.subscriptions where status in ('active', 'trialing', 'past_due')),
used as (select distinct user_id, kind from public.activity where at > now() - interval '180 days')
select kind,
  count(*) filter (where user_id in (select user_id from paying)) as paying_users,
  count(*) filter (where user_id not in (select user_id from paying)) as free_users,
  round(100.0 * count(*) filter (where user_id in (select user_id from paying)) / nullif((select count(*) from paying), 0), 1) as pct_of_paying,
  round(100.0 * count(*) filter (where user_id not in (select user_id from paying)) / nullif((select count(distinct user_id) from used where user_id not in (select user_id from paying)), 0), 1) as pct_of_free
from used group by 1 order by 4 desc nulls last;
