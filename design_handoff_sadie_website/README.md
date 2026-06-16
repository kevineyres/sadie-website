# Sadie Gardere — Author Website (v2)

Marketing site for children's-book author **Sadie Gardere** ("soulful scientist") and her
debut picture book *When the Wind Changes* (Feb 2027). Warm, watercolor-driven, editorial.

> **These files are a design reference, not production code.**
> They are HTML/CSS/JS prototypes that show the intended look, layout, copy, and behavior.
> The task is to **recreate this design in your target environment** (React/Next, Astro, plain
> static site, a CMS theme, etc.) using that stack's established patterns — or, if you're
> starting fresh, to pick the most appropriate framework and implement it there. You can also
> ship the static files close to as-is; they work standalone in any browser.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, copy, and interactions are all here.
Recreate the UI pixel-for-pixel. The one deliberately unfinished area is **imagery** — several
slots are placeholders awaiting final photography/art (noted below).

---

## What's in this bundle

```
design_handoff_sadie_website/
├── index.html                    # Home (was "Sadie Gardere - Home v2.html")
├── media.html                    # Media / press page
├── parents-and-teachers.html     # Resources for parents & teachers
├── assets/
│   ├── css/site.css              # All styles + design tokens (:root vars)
│   ├── js/image-slot.js          # <image-slot> web component (drag-drop image placeholders)
│   ├── js/tweaks-panel.jsx       # Optional in-page "Tweaks" panel (design-time only, see below)
│   └── img/                      # 13 watercolor JPGs (hero art + book spreads)
└── README.md
```

**Note on filenames/links:** the original prototype filenames had spaces and an em-dash, and
the cross-page nav links pointed at the em-dash names while the files used a hyphen — so
multi-page navigation was broken. This export renames the pages to web-safe slugs
(`index.html`, `media.html`, `parents-and-teachers.html`) and rewrites every internal link and
asset path to match. Navigation now works as-is.

---

## Pages / Views

### 1. `index.html` — Home
Long single-scroll page. Section order:

1. **Sticky top nav** — wordmark ("Sadie Gardere / soulful scientist") left; links right
   (About, The Book, Emotional Attunement, Speaking, Media, For Parents & Teachers, Connect)
   + a filled "Pre-order" CTA. In-page links are hash anchors; Media & Parents/Teachers go to
   their own pages.
2. **Hero** — full-viewport cross-fading slideshow of 4 watercolor paintings
   (`hero-moonflight`, `hero-hug`, `hero-geese-turquoise`, `hero-hilltop`), ~9s pace, with a
   cream text panel overlaid (headline, intro, pre-order CTA, "Coming February 2027"). Each
   slide has a tuned `object-position` so figures' heads are never cropped.
3. **About** — two-column: copy + a portrait/video slot (`image-slot`, 4:5).
4. **Letters from Sadie** — newsletter sign-up band over a watercolor wash.
5. **The Book** — title block + a large featured spread (`spread-heylittleone`) + a 3-up
   "peek inside" row (`spread-v-lake`, `spread-courage`, `spread-ballet`), each 16:9, uncropped.
6. **Pre-order band** — retailer wordmarks (placeholder) + bulk-order contact.
7. **Emotional Attunement** — dark "night" section over a moonlit wash.
8. **Speaking & Workshops** — copy + photo slot (3:2) + CTA.
9. **Media band** & **Parents/Teachers band** — full-width promo links to the sub-pages.
10. **Connect** — circular portrait slot, contact rows (email per purpose), and "Follow us
    on social" with real platform icons (Instagram, TikTok, YouTube, LinkedIn, Facebook).
11. **Footer** — sitemap + tagline "Soul leads. Science follows."

### 2. `media.html` — Media / press
Page hero + press kit / inquiry content. "← Back to the homepage" link. Shares the nav + footer.

### 3. `parents-and-teachers.html` — Resources
Page hero + a grid of resource cards (coloring pages, discussion guides, etc., several marked
in-progress) + newsletter band. Shares the nav + footer.

---

## Design tokens
All defined as CSS custom properties in `assets/css/site.css` `:root`.

**Color**
| Token | Hex | Use |
|---|---|---|
| `--cream` | `#FDF8F0` | page background (leads the whole design) |
| `--paper` | `#F5EDDE` | secondary surfaces |
| `--night` | `#1F3A4D` | deep teal-navy; dark sections, headings |
| `--night-deep` | `#162B3A` | darkest navy |
| `--dusk` | `#2B7A8C` | primary teal; links, accents |
| `--dusk-deep` | `#1F5E6D` | hover teal |
| `--sky` | `#CBE7E4` | pale aqua tint |
| `--blush` | `#F3D3D9` | soft pink tint |
| `--sun` | `#F0C97E` | warm gold; pre-order band |
| `--sun-soft` | `#F7DFAE` | light gold; eyebrows on dark art |
| `--gold` | `#C4956A` | muted gold (decorative only) |
| `--gold-deep` | `#A06A3C` | **the accent gold** — eyebrows, script attributions, taglines |
| `--ink` | `#2C2C2C` | body text |
| `--ink-soft` | `#5C564C` | secondary text |
| `--rule` | `#E5DAC4` | hairline borders |

> Accent consistency: `--gold-deep` is the single accent gold across eyebrows, the "— Sadie"
> script attribution, "soulful scientist" lockups, and the footer tagline. Don't reintroduce
> the lighter `--gold` for text — it failed contrast review.

**Type**
- **Serif (display/headings):** Cormorant Garamond — `h1, h2, h3, .serif`. Fallback: Iowan Old Style, Georgia.
- **Sans (UI/body):** Inter — body @ 17px / line-height 1.7. Weights 300–600.
- **Script (accents):** Caveat — attributions, signatures, the "soulful scientist" lockup.
- Eyebrows: Inter 13px, weight 600, letter-spacing ~2.5px, uppercase, color `--gold-deep`.
- All three families load from Google Fonts (`<link>` in each page `<head>`).

**Other**
- `--wash-opacity: 0.16` — opacity of the watercolor background washes behind sections.
- `--hero-pace: 9s` — hero slide cross-fade interval.
- Hero head-safe framing: per-slide `object-position` overrides (see `.hero .slide:nth-child(n)` rules).

---

## Interactions & behavior
- **Hero slideshow:** JS cycles `.active` across `.slide` elements on `--hero-pace`; CSS opacity
  cross-fade. Respects `prefers-reduced-motion`.
- **Smooth scroll** to hash anchors (`html { scroll-behavior: smooth }`).
- **Sticky nav** at top.
- **Social icons:** circular chips; teal (`--dusk`) fill on hover.
- **`<image-slot>`** (web component, `assets/js/image-slot.js`): drag-and-drop placeholders the
  *user* fills; the drop persists in `localStorage` keyed by the slot `id`. **This is a
  prototyping convenience — in production, replace each `<image-slot>` with a normal `<img>`
  (or your framework's image component) pointing at the final asset.** Slots in use:
  `about-portrait` (4:5), `speaking-photo` (3:2), `connect-portrait` (circle, 170px).

## "Tweaks" panel — design-time only, **remove for production**
`assets/js/tweaks-panel.jsx` + the React/Babel `<script>` tags at the bottom of `index.html`
power an in-page controls panel used during design iteration. It is **not part of the website**.
When recreating in a real codebase, drop the tweaks panel, the three React/Babel CDN
`<script>` tags, and the trailing `<script type="text/babel">` block entirely. The site itself
needs no JS framework — only the small vanilla `image-slot.js` (and even that is replaceable
with plain `<img>`).

---

## Assets
13 watercolor illustrations in `assets/img/` — original artwork for the book and site:
- Hero paintings: `hero-moonflight`, `hero-hug`, `hero-geese-turquoise`, `hero-hilltop`
- Book spreads: `spread-heylittleone`, `spread-v-lake`, `spread-courage`, `spread-ballet`,
  `spread-singing`, `spread-moonrest`, `spread-tree`, `spread-feather`, `spread-feelings`,
  `spread-front-goose`

**Still needed (placeholders today):** Sadie's portrait/welcome-video still (About), live
speaking photo (Speaking), Connect portrait, and official retailer logos (Pre-order band).
Fonts are loaded from Google Fonts CDN; self-host them if you want zero external requests.

## Getting it on the web / GitHub
It's a static site — no build step. Open `index.html` directly, or serve the folder
(`python3 -m http.server`) and visit `/`. For GitHub Pages, push this folder's contents to the
repo root (or `/docs`) and enable Pages; `index.html` is the entry point. Once the tweaks panel
and React/Babel scripts are removed, there are no external script dependencies beyond Google Fonts.
