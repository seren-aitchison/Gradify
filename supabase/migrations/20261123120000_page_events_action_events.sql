-- Applied to production on 23 Nov 2026 (docs/sql/action-events.sql): count what visitors do on the free tools, guides and
-- topic pages, and the gentle-rhythm events. Only widens the allowed event names: no new columns, nothing personal, RLS unchanged.
alter table public.page_events drop constraint if exists page_events_event_check;
alter table public.page_events add constraint page_events_event_check check (event in (
  'view', 'lesson_complete', 'exam_finish', 'tutor',
  'autonext_on', 'autonext_off', 'autonext_go', 'autonext_stay', 'break_shown', 'break_taken', 'part2_open',
  'tool_use', 'quiz_finish', 'cta_click', 'share', 'print', 'export'
));
