# Connecting Gradify to Supabase: the simple guide

**For the owner. About 20 minutes, in short sittings. You don't need to understand Supabase to follow it.**

Supabase is the service that holds Gradify accounts and saved progress. The website and the iPhone, iPad and Mac
apps will all use the **same** Supabase project, so one account works everywhere.

You'll only ever handle **two values**, and **both are safe to share**. They're designed to be public, like a
shop's address. What keeps each learner's data private is the database's own rules (row-level security), which
are already written and are tested in step 6.

| Value | Looks like | Safe to share with Claude? |
|---|---|---|
| Project URL | `https://ezlohntrnassgsbofcfc.supabase.co` | Yes |
| Publishable key | starts `sb_publishable_` | Yes |

**Never copy anything else.** If a screen shows a value labelled **Secret**, **service_role**, `sb_secret_…` or
**Database password**, leave it alone. Gradify doesn't need it, and you should never paste it into Claude or GitHub.
If one ever is pasted somewhere, tell Claude, and it will walk you through replacing it.

Nothing goes live while you follow this guide. The website keeps working exactly as it does now. Accounts are
switched on only at the end, after the checks pass and you approve.

---

## Step 1. Can you see the project?

1. Go to <https://supabase.com/dashboard> and sign in.
2. Look for a project whose address contains **`ezlohntrnassgsbofcfc`**. The quickest way is to open
   <https://supabase.com/dashboard/project/ezlohntrnassgsbofcfc>.

**Tell Claude one of these:**
- "I can see it." Carry on to step 2.
- "It says the project doesn't exist, or I don't have access." Stop here. Claude will help you create the right
  one (it's quick), and the guide continues from step 2 with the new project.
- "It says the project is paused." Click **Restore project**, wait for it to finish, then carry on.

## Step 2. Copy the two public values

1. In the project, click the **gear icon (Project Settings)** at the bottom of the left-hand menu.
2. Click **API Keys**. Under **Publishable key**, click the copy button next to the value that starts
   `sb_publishable_`.
   (If you only see an older screen with **anon public** and **service_role**, copy **anon public**. It does the same
   job. Don't touch **service_role**.)
3. The Project URL is `https://ezlohntrnassgsbofcfc.supabase.co`. You can also see it under **Data API** in the same
   settings menu.

**Send Claude both values.** Claude uses them to check the project from its side, and won't put them in the website
until step 6 passes and you approve.

## Step 3. Which tables are already there?

Claude can check this from the two public values, so you don't need to. (On 8 November 2026 the project was empty:
none of Gradify's tables existed yet.)

## Step 4. Set up the tables: one paste

For a new, empty project, everything is in one file that runs as a single unit: if any part fails, nothing is
changed, and if it's run a second time it stops without changing anything.

1. Open <https://github.com/seren-aitchison/Gradify/blob/claude/native-app-brief/docs/setup/gradify-setup.sql>.
2. Click the **Copy raw file** button (two overlapping squares, top right of the file).
3. In Supabase, click **SQL Editor** in the left-hand menu, then **New query**.
4. Paste, then click **Run** (or press Cmd + Return). If Supabase asks you to confirm, choose **Run this query**.
5. You should see one row of results: **Gradify setup complete** and **11**. If you see red text instead, nothing
   has been changed: replace everything in the query box with `rollback;` and click Run once (this closes the
   cancelled setup cleanly), then send Claude the red message (it contains no secrets). If you see neither, the paste was probably cut
   short: run it again from step 1 (it's safe to: a run that didn't finish changed nothing).
   Check the project name at the top of the Supabase page before you click Run: the script can't tell which project
   it's in.
6. Tell Claude "done". Claude re-runs the check from here to confirm every table is in place with its privacy rules.

(If a project already has some of Gradify's tables, the file refuses to run, and Claude names the individual files
in `supabase/migrations/` to run instead.)

## Step 5. Sign-in settings

1. Click **Authentication** in the left-hand menu, then **URL Configuration**.
2. **Site URL:** replace what's there with `https://getgradify.com/app.html` and click **Save**.
3. **Redirect URLs:** click **Add URL**, enter `https://getgradify.com/**`, and click **Save URLs**.

## Step 6. Two test learners, and the check

**Create the test learners.** These exist only for testing.

1. Click **Authentication**, then **Users**, then **Add user**, then **Create new user**.
2. Email: `test-a@` followed by your own email domain (any address you control). Choose a long password and save it
   in your password manager. Tick **Auto Confirm User**. Click **Create user**.
3. Repeat with `test-b@…` and a different password.

**Run the check on your Mac.** Open **Terminal** (press Cmd + Space, type *Terminal*, press Return). Copy and run
each block in turn.

Get the code (only needed once):

```bash
git clone https://github.com/seren-aitchison/Gradify.git ~/Gradify
```

```bash
cd ~/Gradify && git checkout claude/native-app-brief && npm ci
```

(If `npm` isn't found, install Node.js from <https://nodejs.org> first, choosing the LTS version, then run that
line again.)

Enter the values. Terminal asks for each one in turn. Passwords don't appear as you type, and nothing is saved
to a file or to Terminal's history:

```bash
read -r -p "Project URL: " GRADIFY_SUPABASE_URL; read -r -p "Publishable key: " GRADIFY_SUPABASE_ANON_KEY; read -r -p "Test learner A email: " GRADIFY_TEST_EMAIL; read -r -s -p "Test learner A password: " GRADIFY_TEST_PASSWORD; echo; read -r -p "Test learner B email: " GRADIFY_TEST_EMAIL_B; read -r -s -p "Test learner B password: " GRADIFY_TEST_PASSWORD_B; echo; export GRADIFY_SUPABASE_URL GRADIFY_SUPABASE_ANON_KEY GRADIFY_TEST_EMAIL GRADIFY_TEST_PASSWORD GRADIFY_TEST_EMAIL_B GRADIFY_TEST_PASSWORD_B
```

Run the check:

```bash
node scripts/verify-backend.mjs
```

**Copy everything it prints and send it to Claude.** It shows ✓ and ✗ lines and never prints a key or password.
Then close the Terminal window, which forgets the values you entered.

### What the check tests

| You asked for | The check |
|---|---|
| The project is set up | Every table answers, and signed-out visitors can't read anyone's data |
| Registration | Each test learner has a profile, made automatically when the account was created |
| Login | Learner A and learner B can each sign in |
| Progress saving | A lesson and an answer save to learner A's account |
| Cross-device syncing | A second, separate sign-in (standing in for another device) reads A's progress back |
| Privacy | Learner B can't read, change or delete anything of A's, in every table |

Everything it saves is deleted before it finishes.

**What it doesn't test:** signing up through a real email link (the test learners skip that), and the website itself.
Both are checked by hand in step 7.

## Step 7. Going live (only when you say so)

Once step 6 shows all ✓ and you approve:

1. Claude adds the two public values to `gradify.config.js`, on the branch first. GitHub's checks confirm nothing
   secret is in it.
2. Claude finishes the device-sync fix ([PROGRESS-SYNC.md](PROGRESS-SYNC.md)) **before** accounts go live, so a phone
   can never overwrite a laptop's progress.
3. You approve the merge to `main`. The website switches on accounts a few minutes later.
4. You sign up at getgradify.com/app.html with your real email on your phone and on your laptop. Finish a lesson on
   one, reload the other, and check it's there. Then open getgradify.com/status.html on both.

Gradify AI (the tutor and study packs) is a separate, later step. It needs an Anthropic key that goes **only** into
Supabase (Edge Functions → Secrets), never into Claude or GitHub. Claude will guide you through it when you're ready.

## If something goes wrong

| You see | It means | Do |
|---|---|---|
| ✗ "Every migration has been run: Missing: …" | Some tables aren't set up | Send Claude the line, and it will say what to run |
| ✗ "Learner A can sign in: Invalid login credentials" | Wrong email or password, or **Auto Confirm User** wasn't ticked | Check both in Authentication → Users; delete the user and create it again if needed |
| ✗ "Key is the public anon key: This is a secret key" | A secret key was pasted instead of the publishable one | In Supabase, replace that secret key (Project Settings → API Keys), then re-run with the publishable key |
| "fetch failed" or "unreachable" | Your Mac can't reach Supabase, or the project is paused | Check you're online; restore the project if it's paused |
