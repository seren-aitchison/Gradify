# Gradify™ · Ad Marketing Campaign Hub
**Parent Domain:** [getgradify.com](https://getgradify.com) | **Web App:** [getgradify.com/app.html](https://getgradify.com/app.html)

This directory contains the production-ready marketing assets, faceless video scripts, motion graphic animation generators, and Meta advertising copy matrices for launching the Gradify ad campaign.

---

## 📁 Campaign Assets Breakdown

1. **[faceless-video-scripts.md](faceless-video-scripts.md)**:
   - 4 Complete Second-by-Second Video Scripts for TikTok, IG Reels, and YouTube Shorts (9:16 vertical).
   - Angles: *The 10-Second Study Pack*, *The 4.0 GPA Paradox (Contrarian science)*, *Aesthetic LifeOS (Dark mode luxury)*, and *Med/Law High-Stakes Prep*.
   - Includes voiceover scripts, kinetic caption styling, visual cues, and ASMR audio guidelines.

2. **[meta-ads-matrix.md](meta-ads-matrix.md)**:
   - Complete direct-response copy matrix for Meta Ads (Instagram & Facebook).
   - 4 angles x 3 copy variations each (Punchy Direct Response, Relatable Student Story, Feature-Benefit Bullets).
   - High-CTR mobile headlines and description tags.
   - Recommended Advantage+ audience targeting, demographics, and retargeting exclusion rules.

3. **[seo-optimised-ads.md](seo-optimised-ads.md)**:
   - Substantial suite of SEO-optimised Search Ads (Google/Bing Responsive Search Ads) and Social Search Ads (TikTok/Instagram search engine keywords).
   - 6 High-Intent Search Clusters: *PDF-to-Flashcards*, *Mastery & Spaced Repetition*, *MedGradify / USMLE*, *LawGradify / SQE*, *STEM & SciGradify*, and *Aesthetic LifeOS*.
   - 90 Pinned Search Headlines, 24 Quality Score Descriptions, Sitelink & Callout Assets, and Negative Keywords.

4. **[animation-generator.html](animation-generator.html)**:
   - A browser-based motion graphics and video ad preview studio built in pure HTML/CSS/JS.
   - Live simulated scenes with Gradify's aurora glow, kinetic text transitions, PDF dropzone, grounded quote inspection cards, and daily heatmap animations.
   - Aspect ratio switchers (9:16 Vertical Video, 1:1 Feed Carousel, 4:5 Feed Portrait).
   - Designed for easy 60fps screen recording (using macOS QuickTime or OBS) to generate pristine B-roll without After Effects.

5. **[plus-launch/](plus-launch/README.md)**:
   - The Gradify Plus launch email (code GRADIFY48): email-safe HTML and plain text, the founder's email signature, and a launch checklist (PECR/GDPR eligibility, SPF/DKIM/DMARC, Stripe promotion code, test sends, warm-up batches).
   - Claims only features that are live on getgradify.com. README.md records what was checked.

---

## 🚀 Quick Start: Recording Video B-Roll

To launch the Animation Studio locally:

```bash
# From the Gradify root:
open campaign/animation-generator.html
```

Or serve via local HTTP server:
```bash
python3 -m http.server 8080
# Open http://localhost:8080/campaign/animation-generator.html
```

Press **"Play Full Reel"** and screen record the black viewport at 60fps for instant faceless video footage.
