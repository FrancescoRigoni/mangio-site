# mangio-site

The website of [Mangio](https://mangiodiary.com), a private food and water diary for Android. Plain HTML and CSS, served by GitHub Pages from `main`. No build step.

- `index.html`: the home page
- `privacy/index.html`: the privacy policy (the app's Play listing links it)
- `404.html`: shown by GitHub Pages for a missing page
- `assets/`: the stylesheet, script, self-hosted fonts (Fraunces and DM Sans, SIL OFL, licences next to them), screenshots and icons
- `CNAME`: the custom domain. Never delete it: without it the site falls back to the github.io address.

Colours come from the app's dark theme (`core/design` Theme.kt and `app/src/main/res/values/colors.xml` in the app repository); the logo is drawn from its `logo_mark` and `logo_angio` drawables.

The page loads nothing from other sites (no fonts CDN, no analytics), so the privacy policy can say so. Keep it that way, or update the policy's "This website" section.

## When the Play listing goes live

Replace the "Coming soon to Google Play" buttons in `index.html` (hero and the `#get` section) with links to `https://play.google.com/store/apps/details?id=com.abtool.mangio`, and the official Google Play badge.

## Preview locally

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000.
