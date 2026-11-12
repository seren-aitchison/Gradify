-- PROPOSED, NOT APPLIED. Phase 1 of least-privilege client access: removes table privileges that no row-level
-- security policy allows and no website, app or server-as-user code uses. Row-level security already refuses all of
-- these, so nothing that works today changes; the privileges stop being a second line that depends on every policy
-- staying right. Revokes only (no grants, no data, no policy changes). service_role and postgres are untouched.

-- 1. Never needed by a client, and not governed by row-level security: TRUNCATE, REFERENCES, TRIGGER, MAINTAIN.
--    (The five server-only tables lose everything in section 2, and the view's anon grants go in section 7, so they
--    aren't repeated here: each privilege is revoked exactly once.)
revoke truncate, references, trigger, maintain on table public.activity from anon, authenticated;
revoke truncate, references, trigger, maintain on table public.ai_admins from anon, authenticated;
revoke truncate, references, trigger, maintain on table public.ai_limits from anon, authenticated;
revoke truncate, references, trigger, maintain on table public.ai_plan_caps from anon, authenticated;
revoke truncate, references, trigger, maintain on table public.ai_testers from anon, authenticated;
revoke truncate, references, trigger, maintain on table public.assessment_attempts from anon, authenticated;
revoke truncate, references, trigger, maintain on table public.body_checkins from anon, authenticated;
revoke truncate, references, trigger, maintain on table public.cards from anon, authenticated;
revoke truncate, references, trigger, maintain on table public.course_progress from anon, authenticated;
revoke truncate, references, trigger, maintain on table public.documents from anon, authenticated;
revoke truncate, references, trigger, maintain on table public.fitness_tests from anon, authenticated;
revoke truncate, references, trigger, maintain on table public.goals from anon, authenticated;
revoke truncate, references, trigger, maintain on table public.packs from anon, authenticated;
revoke truncate, references, trigger, maintain on table public.page_events from anon, authenticated;
revoke truncate, references, trigger, maintain on table public.plan_blocks from anon, authenticated;
revoke truncate, references, trigger, maintain on table public.profiles from anon, authenticated;
revoke truncate, references, trigger, maintain on table public.revalidation_entries from anon, authenticated;
revoke truncate, references, trigger, maintain on table public.reviews from anon, authenticated;
revoke truncate, references, trigger, maintain on table public.subscriptions from anon, authenticated;
revoke truncate, references, trigger, maintain on table public.tutor_usage from anon, authenticated;
revoke truncate, references, trigger, maintain on table public.waitlist from anon, authenticated;
revoke truncate, references, trigger, maintain on table public.workouts from anon, authenticated;
revoke truncate, references, trigger, maintain on table public.daily_activity from authenticated;  -- anon: everything, section 7

-- 2. Server-only tables: no client policy at all, read and written only by the server (service_role)
revoke all on table public.ai_cache from anon, authenticated;
revoke all on table public.ai_feature_models from anon, authenticated;
revoke all on table public.ai_prices from anon, authenticated;
revoke all on table public.ai_settings from anon, authenticated;
revoke all on table public.billing_events from anon, authenticated;

-- 3. Signed-out visitors never add, change or delete learner rows (every learner policy is for signed-in users).
--    Their SELECT stays for now: the owner's diagnostic (kit/data/backend-check.js) checks each table exists with a
--    signed-out read that returns no rows. Phase 2 removes it after that check is changed.
revoke insert, update, delete on table public.activity from anon;
revoke insert, update, delete on table public.assessment_attempts from anon;
revoke insert, update, delete on table public.body_checkins from anon;
revoke insert, update, delete on table public.cards from anon;
revoke insert, update, delete on table public.course_progress from anon;
revoke insert, update, delete on table public.documents from anon;
revoke insert, update, delete on table public.fitness_tests from anon;
revoke insert, update, delete on table public.goals from anon;
revoke insert, update, delete on table public.packs from anon;
revoke insert, update, delete on table public.plan_blocks from anon;
revoke insert, update, delete on table public.profiles from anon;
revoke insert, update, delete on table public.revalidation_entries from anon;
revoke insert, update, delete on table public.reviews from anon;
revoke insert, update, delete on table public.subscriptions from anon;
revoke insert, update, delete on table public.tutor_usage from anon;
revoke insert, update, delete on table public.ai_admins from anon;
revoke insert, update, delete on table public.ai_testers from anon;
revoke insert, update, delete on table public.workouts from anon;

-- 4. Settings anyone may read: nobody outside the server changes them
revoke insert, update, delete on table public.ai_limits from anon, authenticated;
revoke insert, update, delete on table public.ai_plan_caps from anon, authenticated;

-- 5. Add-only tables: visitors add rows, nobody changes or deletes them
revoke update, delete on table public.page_events from anon, authenticated;
revoke update, delete on table public.waitlist from anon, authenticated;

-- 6. Signed-in learners: only the operations their policies allow
revoke update on table public.assessment_attempts from authenticated;          -- read, add, delete
revoke insert, update, delete on table public.subscriptions from authenticated; -- read; the billing server writes
revoke update, delete on table public.tutor_usage from authenticated;          -- read (adds are refused by its trigger)
revoke insert, update, delete on table public.ai_admins from authenticated;     -- read own role
revoke insert, update, delete on table public.ai_testers from authenticated;    -- read own role

-- 7. The daily_activity view (security_invoker, over activity): signed-in read only
revoke all on table public.daily_activity from anon;
revoke insert, update, delete on table public.daily_activity from authenticated;
