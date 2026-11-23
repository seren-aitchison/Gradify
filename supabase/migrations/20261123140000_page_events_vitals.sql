-- Applied to production on 23 Nov 2026: real-user page speed (kit/core/vitals.js) as anonymous counts. For each page
-- view, LCP, INP and CLS are each counted as good, needs improvement (ni) or poor; no timings, nothing personal.
-- Only widens the allowed event names: no new columns, RLS unchanged.
alter table public.page_events drop constraint if exists page_events_event_check;
alter table public.page_events add constraint page_events_event_check check (event in (
  'view', 'lesson_complete', 'exam_finish', 'tutor',
  'autonext_on', 'autonext_off', 'autonext_go', 'autonext_stay', 'break_shown', 'break_taken', 'part2_open',
  'tool_use', 'quiz_finish', 'cta_click', 'share', 'print', 'export',
  'lcp_good', 'lcp_ni', 'lcp_poor', 'inp_good', 'inp_ni', 'inp_poor', 'cls_good', 'cls_ni', 'cls_poor'
));

-- Share of page views with good speed, last 7 days (Google's "good" thresholds):
-- select split_part(event, '_', 1) as metric, round(100.0 * count(*) filter (where event like '%_good') / count(*)) as pct_good, count(*)
--  from public.page_events where event ~ '^(lcp|inp|cls)_' and day > current_date - 7 group by 1;
