-- Optional: lets the anonymous usage counts (kit/core/analytics.js) include what visitors do on the free tools, guides
-- and topic pages. Run once in the Supabase SQL editor, then set ACTIONS_LIVE = true in kit/core/analytics.js.
-- It only widens the list of allowed event names: no new columns, nothing personal, RLS unchanged.
-- (Includes the gentle-rhythm events too, so running it after rhythm-events.sql loses nothing.)
alter table public.page_events drop constraint if exists page_events_event_check;
alter table public.page_events add constraint page_events_event_check check (event in (
  'view', 'lesson_complete', 'exam_finish', 'tutor',
  'autonext_on', 'autonext_off', 'autonext_go', 'autonext_stay', 'break_shown', 'break_taken', 'part2_open',
  'tool_use', 'quiz_finish', 'cta_click', 'share', 'print', 'export'
));

-- Action rate per page type, last 30 days (views vs actions):
-- select split_part(path, '/', 2) as section, event, count(*) from public.page_events
--  where day > current_date - 30 group by 1, 2 order by 1, 3 desc;
