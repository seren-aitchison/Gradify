-- Privacy-first usage counts (kit/core/analytics.js): which pages are visited and how often learners finish
-- lessons and exams, so Gradify can see whether it's used. Deliberately minimal:
--   no user id, no session or device id, no IP address, no cookie, no time of day (the date only),
--   the referrer as a host name only, the device as phone / tablet / desktop.
-- Anyone can add a row (the site is public); nobody can read rows through the API. The owner reads them
-- in the Supabase dashboard (SQL editor), e.g. the daily_usage view below.
create table public.page_events (
  id bigint generated always as identity primary key,
  day date not null default (now() at time zone 'utc')::date,
  site text not null check (length(site) between 1 and 40),
  path text not null check (length(path) between 1 and 200),
  event text not null check (event in ('view', 'lesson_complete', 'exam_finish', 'tutor')),
  referrer text check (length(referrer) <= 100),
  device text check (device in ('phone', 'tablet', 'desktop'))
);
create index page_events_day on public.page_events (day, site);
alter table public.page_events enable row level security;
create policy "count a visit" on public.page_events for insert to anon, authenticated with check (day = (now() at time zone 'utc')::date);
-- no select, update or delete policy: rows can't be read or changed through the API

-- for the owner, in the SQL editor
create view public.daily_usage with (security_invoker = true) as
  select day, site, event, count(*) as n from public.page_events group by 1, 2, 3;
revoke all on public.daily_usage from anon, authenticated;
