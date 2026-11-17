-- The Gradify Plus funnel, in the same privacy-first counts as page views (kit/core/analytics.js): no user id, no
-- session or device id, the date only. Six new events:
--   plus_prompt       a Plus banner or prompt was shown (a Free allowance ran out, or a Plus feature was opened)
--   plus_click        its "Get Gradify Plus" button was pressed
--   pricing_view      the pricing page was opened
--   checkout_start    a learner pressed a buy button on the pricing page (before Stripe Checkout)
--   checkout_success  they came back from Stripe Checkout having paid
--   checkout_cancel   they came back having cancelled
-- For the first two, `path` names what triggered it (/plus/lesson, /plus/map, /plus/tool/cards, /plus/exams…), so the
-- funnel shows which limit sells Plus. Paying learners themselves are counted from public.subscriptions.
alter table public.page_events drop constraint page_events_event_check, add constraint page_events_event_check check (event in ('view', 'lesson_complete', 'exam_finish', 'tutor', 'plus_prompt', 'plus_click', 'pricing_view', 'checkout_start', 'checkout_success', 'checkout_cancel'));

-- for the owner, in the SQL editor or with scripts/plus-funnel.mjs: each day's funnel, by what triggered it
create view public.plus_funnel with (security_invoker = true) as
  select day, case when event in ('plus_prompt', 'plus_click') then path else '' end as source,
    count(*) filter (where event = 'plus_prompt') as shown,
    count(*) filter (where event = 'plus_click') as clicked,
    count(*) filter (where event = 'pricing_view') as pricing,
    count(*) filter (where event = 'checkout_start') as checkout,
    count(*) filter (where event = 'checkout_success') as paid,
    count(*) filter (where event = 'checkout_cancel') as cancelled
  from public.page_events
  where event in ('plus_prompt', 'plus_click', 'pricing_view', 'checkout_start', 'checkout_success', 'checkout_cancel')
  group by 1, 2;
revoke all on public.plus_funnel from anon, authenticated;
