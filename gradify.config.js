// Settings for the Gradify Kit (kit/), shared by getgradify.com and every sub-site in its folders.

// Which Gradify site this is. Leave it null: every sub-site lives in its own folder on
// getgradify.com (getgradify.com/medgradify/) and its pages say which site they are with
// <meta name="gradify-site" content="MedGradify">, or it's worked out from the folder name.
// Set it only for a copy of the kit hosted somewhere else.
export const SITE = null;

// Supabase: one project for the whole family, so one account (and one learner's progress)
// works on every site. Fill these in once the project exists (see
// docs/SETUP.md). Both values are safe to publish: the anon key only allows what row-level
// security permits. Leave them empty and the app runs in "this device" mode.
export const SUPABASE_URL = "https://ezlohntrnassgsbofcfc.supabase.co";
export const SUPABASE_ANON_KEY = "sb_publishable_TG7ZtA0a9zQdObOW0tub7g_NedlFGj-";

// Push notifications (docs/NOTIFICATIONS.md): the public half of the VAPID key pair the push-send function signs with.
// Safe to publish. Leave it empty and Gradify still sends reminders while it's open, but not when it's closed.
export const PUSH_PUBLIC_KEY = "";

// The Gradify app on Apple's App Store (docs/APP-STORE.md). Every "Get the app" button goes here instead of installing
// the website as an app. Paste each listing's link once it's live, e.g. "https://apps.apple.com/app/gradify/id1234567890".
// iPhone and iPad share one listing; the Mac app can share it too (one universal purchase) or have its own.
// Leave them empty and Gradify says the app is coming to the App Store, and installs nothing.
export const APP_STORE = { ios: "", mac: "" };

// Microsoft Clarity (free heatmaps and session replays) on the free tools, guides and topic pages (docs/SEO.md). Paste
// the project ID from clarity.microsoft.com to switch it on. It runs only where the anonymous usage counts may run (not
// with Do Not Track, Global Privacy Control or the privacy-page opt-out), and Clarity is told the visitor hasn't
// consented to cookies, so it sets none. Leave it empty and nothing loads.
export const CLARITY_ID = "";
