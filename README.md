# Gradify™

The parent site for the Gradify family of learning sites. It links out to every Gradify site, plus TechGradify · ForgeLab and Klerio.

It's a plain static site with no build step: HTML, CSS and one JavaScript module.

```
index.html          page structure
assets/sites.js     every site: name, colour, description, URL  ← edit this to add or change sites
assets/styles.css   liquid-glass styling, light + dark mode
assets/app.js       renders the cards, colour strip, search, filters, theme toggle
assets/favicon.svg  icon
```

## Run it locally

ES modules don't load from `file://`, so serve the folder:

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080.

## Add or change a site

Edit `assets/sites.js`. A site with no `u` (URL) shows as "Coming soon".

## Deploy

Live on GitHub Pages at https://getgradify.com, deployed from the `main` branch root. Every push to `main` goes live within a minute or so. `CNAME` holds the custom domain, and `.nojekyll` tells Pages to serve the files as they are.

DNS is on Cloudflare: four `A` records for `getgradify.com` point at GitHub Pages, and `www` is a `CNAME` to `seren-aitchison.github.io`.
