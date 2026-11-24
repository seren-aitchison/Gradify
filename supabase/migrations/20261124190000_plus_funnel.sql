-- The Gradify Plus funnel, in the same privacy-first counts as page views (kit/core/analytics.js; recorded once PLUS_LIVE is switched on after this runs): no user id, no
-- session or device id, the date only. Six new events:
--   plus_prompt       a Plus banner or prompt was shown (a Free allowance ran out, or a Plus feature was opened)
--   plus_click        its "Get Gradify Plus" button was pressed
--   pricing_view      the pricing page was opened
--   checkout_start    a learner pressed a buy button on the pricing page (before Stripe Checkout)
--   checkout_success  they came back from Stripe Checkout having paid
--   checkout_cancel   they came back having cancelled
-- For the first two, `path` names what triggered it (/plus/lesson, /plus/map, /plus/tool/cards, /plus/exams…), so the
-- funnel shows which limit sells Plus. Paying learners themselves are counted from public.subscriptions.
-- every event the table already accepts (20261123140000_page_events_vitals.sql) stays allowed; the six funnel events join them
alter table public.page_events drop constraint if exists page_events_event_check;
alter table public.page_events add constraint page_events_event_check check (event in (
  'view', 'lesson_complete', 'exam_finish', 'tutor',
  'autonext_on', 'autonext_off', 'autonext_go', 'autonext_stay', 'break_shown', 'break_taken', 'part2_open',
  'tool_use', 'quiz_finish', 'cta_click', 'share', 'print', 'export',
  'lcp_good', 'lcp_ni', 'lcp_poor', 'inp_good', 'inp_ni', 'inp_poor', 'cls_good', 'cls_ni', 'cls_poor',
  'plus_prompt', 'plus_click', 'pricing_view', 'checkout_start', 'checkout_success', 'checkout_cancel'
));

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
