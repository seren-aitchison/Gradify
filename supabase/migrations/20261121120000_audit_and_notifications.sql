-- Stage 1 (docs/architecture/STAGE1-DEPENDENCIES.md): the platform services every later stage records through.
-- New tables and functions only; no existing table, policy or function changes.
--
--   audit_log      append-only record of who did what, written only by Gradify's own functions (never by a client).
--                  Rows can't be changed or removed by anyone, including the service role: the only change allowed
--                  is the database clearing `actor` when that person's account is deleted, so an organisation's
--                  history survives without naming them. Organisations read their own rows once
--                  20261121130000_organisations.sql adds the policy.
--   notifications  in-app notifications. A person reads and dismisses their own; only Gradify's functions create
--                  them. `dedupe_key` makes one event notify once, however many workflows it passes through.
--                  Links are in-app only (#/…), so a notification can't send anyone to another site.
--   notification_prefs   a person's choice per kind and channel (in-app, email, push); no row means on.
--   email_outbox   emails waiting to be sent by the send-email Edge Function (supabase/functions/_shared/email.js,
--                  behind a provider-independent EmailService). No client can read or write it. Each email is sent
--                  once (dedupe_key), retried with backoff, and its data is cleared once it's sent.

create table public.audit_log (
  id bigint generated always as identity primary key,
  at timestamptz not null default now(),
  actor uuid references auth.users (id) on delete set null,
  org_id uuid,                                      -- no foreign key: the record outlives an archived or deleted organisation
  action text not null check (action ~ '^[a-z_]+(\.[a-z_]+)+$' and length(action) <= 80),
  target_kind text check (target_kind is null or (target_kind ~ '^[a-z_]+$' and length(target_kind) <= 40)),
  target_id text check (target_id is null or length(target_id) <= 80),
  detail jsonb check (detail is null or (jsonb_typeof(detail) = 'object' and pg_column_size(detail) <= 4000))
);
create index audit_log_org_time on public.audit_log (org_id, at desc) where org_id is not null;
create index audit_log_actor_time on public.audit_log (actor, at desc);
alter table public.audit_log enable row level security;
revoke all on table public.audit_log from anon;
revoke insert, update, delete, truncate, references, trigger, maintain on table public.audit_log from authenticated;

-- append-only, for everyone: only the account-deletion cascade (actor → null, nothing else) may change a row
create function public.audit_log_immutable() returns trigger language plpgsql as $$
begin
  if tg_op = 'UPDATE' and old.actor is not null and new.actor is null and new.id = old.id and new.at = old.at
     and new.org_id is not distinct from old.org_id and new.action = old.action and new.target_kind is not distinct from old.target_kind
     and new.target_id is not distinct from old.target_id and new.detail is not distinct from old.detail then
    return new;
  end if;
  raise exception 'The audit log can''t be changed.' using errcode = '42501';
end $$;
create trigger audit_log_immutable before update or delete on public.audit_log for each row execute function public.audit_log_immutable();

-- the one way rows are written: by Gradify's own security-definer functions, as the person calling them
create function public._audit(p_action text, p_org uuid, p_target_kind text, p_target_id text, p_detail jsonb) returns void language sql volatile security definer set search_path = public as $$
  insert into public.audit_log (actor, org_id, action, target_kind, target_id, detail) values (auth.uid(), p_org, p_action, p_target_kind, p_target_id, p_detail);
$$;
revoke all on function public._audit(text, uuid, text, text, jsonb) from public, anon, authenticated;

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  kind text not null check (kind ~ '^[a-z_]+(\.[a-z_]+)*$' and length(kind) <= 60),
  org_id uuid,
  title text not null check (length(btrim(title)) between 1 and 200),
  body text not null default '' check (length(body) <= 2000),
  href text check (href is null or (href ~ '^#/[A-Za-z0-9/_.:%?=&-]*$' and length(href) <= 300)),
  dedupe_key text not null check (length(dedupe_key) between 1 and 200),
  created_at timestamptz not null default now(),
  read_at timestamptz,
  unique (user_id, dedupe_key)
);
create index notifications_user_time on public.notifications (user_id, created_at desc);
alter table public.notifications enable row level security;
create policy "own notifications: read" on public.notifications for select to authenticated using (user_id = auth.uid());
create policy "own notifications: dismiss" on public.notifications for delete to authenticated using (user_id = auth.uid());
revoke all on table public.notifications from anon;
revoke insert, update, truncate, references, trigger, maintain on table public.notifications from authenticated;

create table public.notification_prefs (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  kind text not null check (kind ~ '^[a-z_]+(\.[a-z_]+)*$' and length(kind) <= 60),
  channel text not null check (channel in ('in_app', 'email', 'push')),
  enabled boolean not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, kind, channel)
);
alter table public.notification_prefs enable row level security;
create policy "own notification preferences" on public.notification_prefs for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
revoke all on table public.notification_prefs from anon;

-- whether a kind is switched on for a person on a channel: a preference for the exact kind, else for its first part
-- ("org" covers "org.invited"), else on
create function public._wants(p_user uuid, p_kind text, p_channel text) returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(
    (select enabled from public.notification_prefs where user_id = p_user and kind = p_kind and channel = p_channel),
    (select enabled from public.notification_prefs where user_id = p_user and kind = split_part(p_kind, '.', 1) and channel = p_channel),
    true);
$$;
revoke all on function public._wants(uuid, text, text) from public, anon, authenticated;

-- creates one notification (or none, if it was already sent or the person has switched that kind off)
create function public._notify(p_user uuid, p_kind text, p_org uuid, p_title text, p_body text, p_href text, p_dedupe text) returns boolean language plpgsql volatile security definer set search_path = public as $$
declare n int;
begin
  if p_user is null or not public._wants(p_user, p_kind, 'in_app') then return false; end if;
  insert into public.notifications (user_id, kind, org_id, title, body, href, dedupe_key)
  values (p_user, p_kind, p_org, left(p_title, 200), left(coalesce(p_body, ''), 2000), p_href, p_dedupe)
  on conflict (user_id, dedupe_key) do nothing;
  get diagnostics n = row_count;
  return n = 1;
end $$;
revoke all on function public._notify(uuid, text, uuid, text, text, text, text) from public, anon, authenticated;

-- marks a person's notifications read: one (by id), or all of them (null)
create function public.mark_notifications_read(p_id uuid) returns integer language plpgsql volatile security definer set search_path = public as $$
declare n int;
begin
  if auth.uid() is null then raise exception 'Sign in first.' using errcode = '42501'; end if;
  update public.notifications set read_at = now()
  where user_id = auth.uid() and read_at is null and (p_id is null or id = p_id);
  get diagnostics n = row_count;
  return n;
end $$;
revoke all on function public.mark_notifications_read(uuid) from public, anon;
grant execute on function public.mark_notifications_read(uuid) to authenticated;

create table public.email_outbox (
  id uuid primary key default gen_random_uuid(),
  to_user uuid references auth.users (id) on delete cascade,
  to_address text check (to_address is null or (length(to_address) <= 254 and to_address ~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$')),
  template text not null check (template in ('org_invitation', 'classroom_invitation', 'notification_digest', 'assignment_published', 'feedback_released', 'training_reminder', 'certificate_awarded')),
  data jsonb not null default '{}'::jsonb check (jsonb_typeof(data) = 'object' and pg_column_size(data) <= 8000),
  dedupe_key text not null unique check (length(dedupe_key) between 1 and 200),
  status text not null default 'queued' check (status in ('queued', 'sending', 'sent', 'failed', 'suppressed')),
  attempts integer not null default 0 check (attempts between 0 and 10),
  last_error text check (last_error is null or length(last_error) <= 500),
  send_after timestamptz not null default now(),
  sent_at timestamptz,
  provider_id text check (provider_id is null or length(provider_id) <= 200),
  created_at timestamptz not null default now(),
  check (to_user is not null or to_address is not null)
);
create index email_outbox_due on public.email_outbox (send_after) where status = 'queued';
alter table public.email_outbox enable row level security;
revoke all on table public.email_outbox from anon, authenticated;

-- queues an email (once per dedupe key). A person who has switched that template off by email gets nothing.
create function public._queue_email(p_to_user uuid, p_to_address text, p_template text, p_data jsonb, p_dedupe text) returns void language plpgsql volatile security definer set search_path = public as $$
begin
  insert into public.email_outbox (to_user, to_address, template, data, dedupe_key, status)
  values (p_to_user, lower(btrim(p_to_address)), p_template, coalesce(p_data, '{}'::jsonb), p_dedupe,
    case when p_to_user is not null and not public._wants(p_to_user, p_template, 'email') then 'suppressed' else 'queued' end)
  on conflict (dedupe_key) do nothing;
end $$;
revoke all on function public._queue_email(uuid, text, text, jsonb, text) from public, anon, authenticated;

-- for the send-email Edge Function only (service role): take a batch to send, and record how each went
create function public.claim_email_batch(p_limit integer) returns table (id uuid, to_address text, template text, data jsonb, dedupe_key text, attempts integer) language sql volatile security definer set search_path = public as $$
  update public.email_outbox o set status = 'sending', attempts = o.attempts + 1
  from (select e.id from public.email_outbox e where e.status = 'queued' and e.send_after <= now() order by e.send_after limit least(greatest(p_limit, 1), 100) for update skip locked) due
  where o.id = due.id
  returning o.id, coalesce(o.to_address, (select u.email from auth.users u where u.id = o.to_user)), o.template, o.data, o.dedupe_key, o.attempts;
$$;
create function public.finish_email(p_id uuid, p_ok boolean, p_provider_id text, p_error text) returns void language plpgsql volatile security definer set search_path = public as $$
begin
  if p_ok then
    -- sent: the data (which can hold an invitation link) isn't kept
    update public.email_outbox set status = 'sent', sent_at = now(), provider_id = left(p_provider_id, 200), data = '{}'::jsonb, last_error = null where id = p_id;
  else
    update public.email_outbox set status = case when attempts >= 5 then 'failed' else 'queued' end,
      send_after = now() + make_interval(mins => power(2, attempts)::int), last_error = left(p_error, 500) where id = p_id;
  end if;
end $$;
revoke all on function public.claim_email_batch(integer) from public, anon, authenticated;
revoke all on function public.finish_email(uuid, boolean, text, text) from public, anon, authenticated;
grant execute on function public.claim_email_batch(integer) to service_role;
grant execute on function public.finish_email(uuid, boolean, text, text) to service_role;
