-- Retire saved calendar links (Stage 5, November 2026). NOT a migration: run by hand, only with the owner's approval.
--
-- Before this change, Smart Plan saved calendar feed links (which work like passwords) in
-- public.profiles.learner -> 'intel' -> 'calendars'. The app now removes them the next time a learner opens it
-- (retiredIntel in kit/intel/calsync.js). This removes them for everyone else, so the clean-up doesn't depend on a
-- learner coming back. It changes only that one key: imported events (public.plan_blocks), study plans, progress and
-- every other setting are untouched. It records how many links were removed (never the links), so the app shows the
-- learner a one-off notice.
--
-- Nothing here prints or copies a link: the preview counts rows only.

-- 1. Preview: how many profiles hold saved links (read-only).
select count(*) as profiles_with_links,
       coalesce(sum(jsonb_array_length(learner -> 'intel' -> 'calendars')), 0) as links
from public.profiles
where jsonb_typeof(learner -> 'intel' -> 'calendars') = 'array'
  and jsonb_array_length(learner -> 'intel' -> 'calendars') > 0;

-- 2. Remove them, in one transaction. Check the row count matches the preview before committing.
begin;
update public.profiles
set learner = jsonb_set(
  learner #- '{intel,calendars}',
  '{intel,calendars_retired}',
  jsonb_build_object('at', to_char(now() at time zone 'utc', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
                     'count', jsonb_array_length(learner -> 'intel' -> 'calendars'),
                     'seen', false))
where jsonb_typeof(learner -> 'intel' -> 'calendars') = 'array'
  and jsonb_array_length(learner -> 'intel' -> 'calendars') > 0;
-- Empty lists carry no link: drop the key without a notice.
update public.profiles set learner = learner #- '{intel,calendars}'
where learner -> 'intel' ? 'calendars';
commit;

-- 3. Verify: both should be 0.
select count(*) as remaining from public.profiles where learner -> 'intel' ? 'calendars';
select count(*) as rows_mentioning_ical from public.profiles where learner::text ilike '%/ical/%' or learner::text ilike '%.ics%';
