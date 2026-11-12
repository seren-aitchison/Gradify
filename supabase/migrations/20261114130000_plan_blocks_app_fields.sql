-- PROPOSED, NOT APPLIED. The planner's fields in the account, so the plan syncs between the website, iPhone, iPad and
-- Mac. The apps already keep these on the device (PlanBlock in gradify-apple); this gives them columns.
--   all_day      an all-day item (stored as 0–1440 minutes, which the existing checks allow)
--   repeats      never | daily | weekdays | weekly | fortnightly | monthly, from `day` until `repeat_until`
--   reminder_min minutes before the start to remind (reminders themselves stay on each device)
--   notes, course
--   done_days, skip_days   for a repeating item: the days it was ticked off, and the days removed from it
--   updated_at   set by the database on every change (as goals_touch does), so two devices editing the same item can't
--                silently overwrite each other: a write that started from an older copy finds it changed
--
-- Backwards compatible: every new column has a default, so the website's existing reads (select *) and writes (insert
-- with day, start_min, end_min, title, cal, auto; update with the row it read) keep working unchanged, and a block it
-- writes is a plain one-off block. No existing value changes; existing rows get the defaults and updated_at = now.
-- Additive only: nine columns with defaults or nulls, their checks, one trigger.
-- Rollback: drop trigger plan_blocks_touch on public.plan_blocks; drop function public.plan_blocks_touch();
--           then drop the nine columns (the device copies keep the values).
alter table public.plan_blocks add column all_day boolean not null default false;
alter table public.plan_blocks add column repeats text not null default 'never'
  check (repeats in ('never', 'daily', 'weekdays', 'weekly', 'fortnightly', 'monthly'));
alter table public.plan_blocks add column repeat_until date;
alter table public.plan_blocks add column reminder_min int check (reminder_min is null or reminder_min between 0 and 10080);
alter table public.plan_blocks add column notes text not null default '' check (length(notes) <= 4000);
alter table public.plan_blocks add column course text check (course is null or length(course) between 1 and 60);
alter table public.plan_blocks add column done_days date[] not null default '{}' check (cardinality(done_days) <= 1000);
alter table public.plan_blocks add column skip_days date[] not null default '{}' check (cardinality(skip_days) <= 1000);
alter table public.plan_blocks add column updated_at timestamptz not null default now();
create function public.plan_blocks_touch() returns trigger language plpgsql as $$
begin
  if tg_op = 'UPDATE' then
    new.created_at := old.created_at;
    new.updated_at := greatest(clock_timestamp(), old.updated_at + interval '1 microsecond');
  else
    new.updated_at := clock_timestamp();
  end if;
  return new;
end $$;
create trigger plan_blocks_touch before insert or update on public.plan_blocks for each row execute function public.plan_blocks_touch();
