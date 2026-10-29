// This site's settings for the Gradify Kit (kit/). Every Gradify site has its own copy of this
// file next to its kit/ folder; updating the kit never touches it.

// Which Gradify site this is. getgradify.com is the parent of every site, so it leaves this
// null and learners pick their site during setup. A sub-site sets its own name, exactly as it
// appears in kit/core/sites.js, and setup skips that step, e.g.
//   export const SITE = "MedGradify";
export const SITE = "MedGradify";

// Supabase: every Gradify site uses the same project, so one account (and one learner's
// progress) works across the whole family. Fill these in once the project exists (see
// docs/SETUP.md). Both values are safe to publish: the anon key only allows what row-level
// security permits. Leave them empty and the app runs in "this device" mode.
export const SUPABASE_URL = "";
export const SUPABASE_ANON_KEY = "";
