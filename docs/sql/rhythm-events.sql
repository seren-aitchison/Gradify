-- Optional: lets the anonymous usage counts (kit/core/analytics.js) include the gentle-rhythm events.
-- Run once in the Supabase SQL editor, then set RHYTHM_LIVE = true in kit/core/analytics.js.
-- It only widens the list of allowed event names: no new columns, nothing personal, RLS unchanged.
alter table public.page_events drop constraint if exists page_events_event_check;
alter table public.page_events add constraint page_events_event_check check (event in (
  'view', 'lesson_complete', 'exam_finish', 'tutor',
  'autonext_on', 'autonext_off', 'autonext_go', 'autonext_stay', 'break_shown', 'break_taken', 'part2_open'
));

-- Reading the counts, e.g. the last 30 days:
-- select event, count(*) from public.page_events
--  where day > current_date - 30 and event not in ('view') group by 1 order by 2 desc;
