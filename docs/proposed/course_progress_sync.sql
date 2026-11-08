-- PROPOSED, NOT A MIGRATION (docs/PROGRESS-SYNC.md). Kept out of supabase/migrations/ until the design is approved,
-- so nothing runs it. tests/progress-sync.test.mjs applies it to a temporary PostgreSQL after the real migrations
-- and runs the phone/laptop scenarios against it.
--
-- 1. Version-checked saves for course_progress: a device's save is accepted only if it has seen the latest copy.
-- 2. Retry-safe flashcard reviews: each review carries an id made on the device, so sending it twice stores it once.
-- Additive only: no existing column, row or policy is changed or removed.

alter table public.course_progress add column if not exists version bigint not null default 0;

-- Save a course's progress if nobody has saved since the device last read it (expected = the version it saw;
-- 0 for a course it has never saved). If someone has, nothing is written and the current copy comes back, so
-- the device can merge it in and try again (kit/course/sync.js). Runs as the signed-in learner: row-level
-- security applies, and a learner can only ever touch their own rows.
create or replace function public.save_course_progress(p_subject text, p_site text, p_state jsonb, p_expected bigint)
returns table (saved boolean, cur_version bigint, cur_state jsonb, server_time timestamptz)
language plpgsql security invoker set search_path = public as $$
declare me uuid := auth.uid(); cur public.course_progress;
begin
  if me is null then raise exception 'Sign in to save progress.' using errcode = '28000'; end if;
  if p_expected = 0 then
    insert into public.course_progress (user_id, subject, site, state, version, updated_at)
    values (me, p_subject, p_site, p_state, 1, now())
    on conflict (user_id, subject) do nothing;
    if found then return query select true, 1::bigint, null::jsonb, now(); return; end if;
  else
    -- under concurrent saves PostgreSQL locks the row: the second waits, re-reads the version and finds it changed
    update public.course_progress c set state = p_state, site = p_site, version = c.version + 1, updated_at = now()
    where c.user_id = me and c.subject = p_subject and c.version = p_expected;
    if found then return query select true, p_expected + 1, null::jsonb, now(); return; end if;
  end if;
  select * into cur from public.course_progress c where c.user_id = me and c.subject = p_subject;
  return query select false, coalesce(cur.version, 0), cur.state, now();
end $$;
revoke all on function public.save_course_progress(text, text, jsonb, bigint) from public, anon;
grant execute on function public.save_course_progress(text, text, jsonb, bigint) to authenticated;

-- Reviews sent twice (a retry after a dropped connection) are stored once.
alter table public.reviews add column if not exists client_id uuid;
-- a plain unique constraint (rows from before have no client_id, and NULLs never clash), so the client can insert
-- with on conflict (user_id, client_id) do nothing
alter table public.reviews add constraint reviews_client_unique unique (user_id, client_id);
