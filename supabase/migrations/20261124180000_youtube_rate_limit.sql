-- A rate limit for the youtube-notes Edge Function that holds across every instance.
--
-- youtube-notes runs signed out (verify_jwt off), so the YouTube to notes tool works without an account. Its only limit
-- was a counter in each instance's memory: every cold start or extra instance began again from zero, so the function
-- could be used as an unmetered YouTube proxy. Now each request first takes a turn here:
--   10 a minute and 200 a day from one caller, and 5000 a day for the whole service.
-- A caller is a keyed hash of their IP address (an HMAC made in the function with a key only the server holds), never
-- the address itself, and a request is kept for one day and then deleted, the next time anyone takes a turn.
-- Only the service role (the function) can call youtube_take; the table has no policies, so learners can't read it.
-- Run after 20261120120000_notes_knowledge_base.sql.
create table public.youtube_requests (
  id bigint generated always as identity primary key,
  caller text not null check (caller ~ '^[0-9a-f]{64}$'),
  at timestamptz not null default now()
);
create index youtube_requests_caller_at on public.youtube_requests (caller, at);
create index youtube_requests_at on public.youtube_requests (at);
alter table public.youtube_requests enable row level security;
revoke all on table public.youtube_requests from anon, authenticated;

-- 'ok' (the turn is taken and counted), 'rate' (this caller, this minute), 'daily' (this caller, today) or 'busy' (the
-- whole service, today). Refused requests aren't counted, so waiting is enough to be let back in.
create or replace function public.youtube_take(p_caller text, p_per_minute integer default 10, p_per_day integer default 200, p_global_per_day integer default 5000) returns text
language plpgsql volatile security definer set search_path = public as $$
begin
  if p_caller is null or p_caller !~ '^[0-9a-f]{64}$' then raise exception 'youtube_take: caller must be a hex SHA-256'; end if;
  -- one caller at a time, so a burst can't all pass the same count; and one global lock for the service-wide count
  perform pg_advisory_xact_lock(hashtextextended('gradify.youtube.' || p_caller, 0));
  perform pg_advisory_xact_lock(hashtextextended('gradify.youtube', 0));
  delete from public.youtube_requests r where r.at < now() - interval '1 day';
  if (select count(*) from public.youtube_requests r where r.caller = p_caller and r.at > now() - interval '1 minute') >= p_per_minute then return 'rate'; end if;
  if (select count(*) from public.youtube_requests r where r.caller = p_caller) >= p_per_day then return 'daily'; end if;
  if (select count(*) from public.youtube_requests r) >= p_global_per_day then return 'busy'; end if;
  insert into public.youtube_requests (caller) values (p_caller);
  return 'ok';
end $$;
revoke all on function public.youtube_take(text, integer, integer, integer) from public, anon, authenticated;
grant execute on function public.youtube_take(text, integer, integer, integer) to service_role;
