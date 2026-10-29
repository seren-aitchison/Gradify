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
export const SUPABASE_URL = "";
export const SUPABASE_ANON_KEY = "";
