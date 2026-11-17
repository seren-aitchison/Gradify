# Gradify on the App Store

Today "the Mac app" and "the iPhone app" are the website installed from the browser (Chrome's Install, or Safari's
Add to Dock / Add to Home Screen). Gradify no longer offers that itself: every "Get the app" button now goes to the
App Store listing in `APP_STORE` in `gradify.config.js`, and until that's filled in it says the app is coming soon.

## What's needed to get there

1. **Apple Developer Program** (£79 / $99 a year), enrolled as the organisation (Gradify Ltd) so the listing shows the
   company name. Needs a D-U-N-S number for the company.
2. **A native wrapper around the web app.** Recommended: [Capacitor](https://capacitorjs.com), which loads the same
   `app.html` and `kit/` inside a native iOS app (and the same app runs on Apple-silicon Macs, or as a Mac Catalyst build).
   On a Mac with Xcode:
   ```bash
   npm i -D @capacitor/cli @capacitor/core @capacitor/ios
   npx cap init Gradify com.getgradify.app --web-dir .
   npx cap add ios
   npx cap open ios
   ```
   Apple rejects apps that are only a website in a frame (guideline 4.2), so the wrapper should add native value:
   push notifications through APNs, Home Screen widgets (due cards, streak), offline study, Sign in with Apple.
3. **Sign in with Apple** (guideline 4.8): required because the app offers Google sign-in. Supabase supports it as a
   provider.
4. **Payments for Plus and Pro inside the app** (guideline 3.1.1): digital subscriptions bought in an iOS app must
   use Apple's In-App Purchase, except in storefronts where a link out to the website is allowed (the US, and the EU
   under the DMA, with conditions). Plan: IAP products for Plus and Pro in App Store Connect, verified server-side by
   a new Edge Function that writes `public.subscriptions` like `billing-webhook` does for Stripe.
5. **App Store Connect listing:** name, subtitle, screenshots (6.9" iPhone, 13" iPad, Mac), privacy nutrition labels
   (match `privacy.html`), age rating, support URL, the privacy policy URL.
6. **TestFlight**, then submit for review.
7. **When it's live:** paste the listing link into `APP_STORE` in `gradify.config.js` and push. Every install button
   and the "Get the app" prompt switch over at once.

Not doable from a cloud session: steps 1, 2 (needs Xcode on a Mac), 5 and 6 need the Apple accounts.
