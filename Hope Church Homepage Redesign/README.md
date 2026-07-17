# Hope Church Winchester — Website

A 9-page marketing website for Hope Church Winchester, intended to replace the church's current site. This package is the **complete working source** for the site, ready to be version-controlled in GitHub and maintained with Claude Code.

---

## ⚠️ Read this first — the file format

The pages are authored as **Design Components** (`*.dc.html`). Each one is a normal HTML document that, at runtime, is rendered by a small client-side runtime bundled in this project (`support.js`). They are **not** plain static HTML and they are **not** React/Vue source. You cannot simply drop a `.dc.html` file onto a web server and expect it to render — it needs `support.js` (and, for styling tokens, the `_ds/` bundle) loaded alongside it.

This matters for how you take the project forward. See **Taking this to production** below.

### How a `.dc.html` file is structured
- An `<x-dc>…</x-dc>` block containing the **template** (markup with `{{ dotted.path }}` holes and control-flow tags like `<sc-for>` / `<sc-if>`).
- A `<script type="text/x-dc" data-dc-script>` block containing a **logic class** (`class Component extends DCLogic { renderVals() { … } }`) that supplies the values the template interpolates and the responsive/interaction behaviour.
- All styling is **inline** on the elements (no external stylesheets beyond the design-system tokens). Responsive behaviour is handled in each page's `applyResponsive()` method, which sets `grid-template-columns` etc. based on `window.innerWidth` breakpoints (`mobile < 1080px`, `narrow < 560px`).

---

## Pages

| File | Purpose |
|---|---|
| `Hope Homepage.dc.html` | Landing page / site entry point |
| `New Here.dc.html` | First-time visitor guide (what to expect, good to know, next steps) |
| `Sunday.dc.html` | What Sundays are like (services, kids, getting here, FAQ) |
| `Families.dc.html` | Families & children's ministry |
| `What's On.dc.html` | Midweek groups, events and activities |
| `About.dc.html` | Who we are, what we believe, leadership team |
| `Teaching.dc.html` | Sermons, series archive, podcasts, worship music |
| `Partners.dc.html` | Church family, local & global mission partners, blog |
| `Contact.dc.html` | Contact details, location, directions, newsletter |

**Navigation:** every page has a shared top nav and footer that link to the others via relative links (e.g. `href="About.dc.html"`). The intended entry point is `Hope Homepage.dc.html`.

---

## Project layout

```
/
├── *.dc.html                 # the 9 pages (above)
├── support.js                # Design Component runtime (required to render the pages)
├── image-slot.js             # drag-and-drop image placeholder web component
├── assets/                   # all photography and logos used by the site
│   ├── partners/             #   partner / charity / mission logos
│   ├── teaching/             #   sermon-series & teaching imagery
│   └── team/                 #   leadership & welcome-team photos
└── _ds/                      # Hope Church Winchester design-system bundle
    └── hope-church-winchester-design-system-<id>/
        ├── colors_and_type.css   # design tokens (colours, fonts) + @font-face
        ├── fonts/                # Neue Montreal font files
        └── _ds_bundle.js         # design-system component bundle
```

---

## Running it locally

Because the pages load `support.js` and assets by relative path, serve the folder over HTTP (don't just `file://` open a page):

```bash
# from the project root
npx serve .
# or
python3 -m http.server 8000
```

Then visit `http://localhost:8000/Hope%20Homepage.dc.html`.

> Note: filenames contain spaces (e.g. `Hope Homepage.dc.html`, `What's On.dc.html`). For web hosting you will almost certainly want to rename these to hyphenated, lowercase names (`index.html`, `whats-on.html`, …) and update the nav/footer links accordingly. See below.

---

## Design tokens

The full brand spec lives in `_ds/…/colors_and_type.css`. The site as built uses this working palette:

**Core**
- Deep navy (primary dark surface): `#0D1B3E`
- Deeper navy (footer / step-downs): `#060D1E`, `#0A1430`
- Panel navy (cards on dark): `#162040`, border `#1E2D50`
- Soft cream (default light surface): `#F4EBE1`
- White (body-text panels): `#FFFFFF`
- Slate blue (accents, links, buttons): `#3F5CAA` (hover `#34518f`)
- Light blue (accents on dark): `#A3C0E8`
- Body text on light: `#5b5955` / charcoal `#232220`

**Brand (from the design system — use for ministry sub-brands)**
- Purple `#6028A7`, Blue `#044EFF`, Lavender `#CEDCF1`, Orange `#F36C41`, Green `#36A877`

**Type**
- Body: **Neue Montreal** (files in `_ds/…/fonts/`). The pages currently also reference `Inter` and `'Neue Montreal'` in font stacks — standardise on the licensed families when productionising.
- Display / headings: the design system specifies **ED Nimpkish** (display, lowercase) and **PP Mori** (headings). These were **not** delivered and are substituted — see the design-system guide. Licensed files should be dropped into `_ds/…/fonts/` and the stacks updated.

**Radii / shadows:** pills (`999px`) and `14–22px` card radii; single soft shadows, no coloured shadows. See the design-system guide for the full rules.

---

## External links used across the site
These point at the church's real services (open in a new tab). Keep them in sync if any change:
- ChurchSuite (giving, forms, events): `hopewinchester.churchsuite.com` / `.co.uk`
- Newsletter signup: `hopewinchester.churchsuite.co.uk/embed/addressbook/form`
- YouTube: `youtube.com/@HopeChurchWinchester`
- Spotify / Apple Podcasts / SoundCloud (sermons)
- Blog: `hopeinactionwinchester.squarespace.com/blog`
- Facebook, Instagram
- Middle Brook Centre room hire; Google Maps directions; SharePoint safeguarding policy PDF

---

## Taking this to production

You have two realistic paths. **Decide this before building out the GitHub workflow.**

### Path A — Convert to a plain static site (recommended for hosting)
Recreate each page as a standard, self-contained HTML/CSS/JS file (no `support.js` runtime), then host on GitHub Pages / Netlify / Cloudflare Pages.
- Use the `.dc.html` files as the **exact visual + content reference** — all the markup, copy, inline styles and imagery are here.
- Move the per-page inline styles into a shared stylesheet, and reimplement the small amount of JS (sticky-nav state, mobile menu toggle, the `applyResponsive()` grid breakpoints, scroll-reveal) as ordinary scripts or CSS media queries.
- Rename files to web-friendly names (`index.html`, `new-here.html`, `sunday.html`, `whats-on.html`, `about.html`, `teaching.html`, `families.html`, `partners.html`, `contact.html`) and update all nav/footer links.
- Keep `assets/` and the fonts as-is.

### Path B — Keep the Design Component format
Commit the project as-is (including `support.js` and `_ds/`) and keep editing the `.dc.html` files. This preserves everything exactly but ties the site to this runtime, and hosting requires serving the runtime + components rather than plain pages. Only choose this if you intend to keep using the same rendering runtime.

> **Recommendation:** For a public church website that a comms team will host and maintain, **Path A** is the better long-term choice — standard files, standard hosting, no dependency on a bespoke runtime.

---

## Suggested GitHub workflow
1. Create the Hope Church comms GitHub account and a new (private to start) repo.
2. Commit this project to it as the starting point / reference.
3. With Claude Code, do the Path A conversion on a branch, review the rendered result, and merge.
4. Enable GitHub Pages (or Netlify / Cloudflare Pages) and point the church domain at it.
5. Make future content changes (text, images, events, sermon links) as small commits via Claude Code.

## Content / tone notes for future edits
Copy is warm, plain-English and first-person ("we"/"you"), British spellings, no jargon or emoji. Times in British style (`10am`, `7.30pm`). Full voice guidance is in the design-system guide.
