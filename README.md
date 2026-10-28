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

Any static host works: GitHub Pages, Netlify, Vercel or Cloudflare Pages. Point it at the repo root. No build command is needed.
