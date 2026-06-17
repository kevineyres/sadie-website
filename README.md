# Sadie Gardere — website

Marketing site for *When the Wind Changes*, a picture book by Sadie Gardere
(Tiny Torch Books, an imprint of The Collective Book Studio · February 2027).

A simple static site — plain HTML, CSS, and a little JavaScript. No build step.

## Files
- `index.html` — the home page
- `styles.css` — all styling (design system + sections)
- `main.js` — small interactions (mobile menu, hero rotation, signup, "coming soon")
- `favicon.svg` — browser-tab icon
- `assets/img/` — watercolor artwork from the book

## Preview locally
Open `index.html` in any browser, **or** serve the folder:

```
python3 -m http.server 8000
```

then visit http://localhost:8000

## Deploy
Hosted on **Netlify**, auto-deployed from this repository on every push.
The domain **sadiegardere.com** stays registered at GoDaddy; only the website
DNS records point to Netlify — email is unaffected.
