# Hope Church Winchester — Website

A 9-page static marketing website for Hope Church Winchester.

The pages are **plain, self-contained HTML** — no build step, no framework, no
runtime. You can open them in any editor, host them on any static host, and
serve them as-is. (They were originally authored as bespoke `.dc.html` "design
components" that needed a client-side React/Babel runtime; that has been
converted away — see *History* below.)

---

## Pages

| File | Purpose |
|---|---|
| `index.html` | Landing page / site entry point |
| `new-here.html` | First-time visitor guide |
| `sunday.html` | What Sundays are like |
| `families.html` | Families & children's ministry |
| `whats-on.html` | Midweek groups, events and activities |
| `about.html` | Who we are, what we believe, leadership team |
| `teaching.html` | Sermons, series archive, podcasts, worship music |
| `partners.html` | Church family, local & global mission partners, blog |
| `contact.html` | Contact details, location, directions, newsletter |

Every page shares a top nav and footer that link to the others with plain
relative links (e.g. `href="about.html"`).

---

## Project layout

```
/
├── index.html, *.html        # the 9 pages
├── site.css                  # shared reset + responsive rules (media queries)
├── site.js                   # shared interactions (mobile menu, nav-on-scroll,
│                             #   hero parallax, scroll reveal) — progressive
│                             #   enhancement; pages work fully without it
├── assets/                   # all photography and logos used by the site
│   ├── partners/             #   partner / charity / mission logos
│   ├── teaching/             #   sermon-series & teaching imagery
│   └── team/                 #   leadership & welcome-team photos
└── _ds/                      # design-system bundle (Neue Montreal font files)
```

### How the styling works
Each page carries its **desktop layout as inline styles** (baked in during the
conversion). `site.css` then does two things: a small base reset, and the
**responsive breakpoints** via media queries keyed on `data-*` hooks
(`data-grid2/3/4`, `data-footgrid`, `data-navlinks`, `data-hamburger`, …):

- `mobile`  — viewport `< 1080px`
- `narrow`  — viewport `< 560px`

To adjust a responsive rule, edit `site.css`. To adjust content or the desktop
look, edit the inline styles on the relevant page.

---

## Running it locally

Serve the folder over HTTP (relative asset paths don't work from `file://`):

```bash
# from the project root
python3 -m http.server 8000
# then visit http://localhost:8000/
```

---

## Hosting

The site is deployed to **GitHub Pages** by the workflow at
`.github/workflows/deploy-pages.yml` (repo root), which publishes this folder on
every push to `main`. Any static host works too (Netlify, Cloudflare Pages) —
just serve this folder with `index.html` as the entry point.

---

## External links used across the site
These point at the church's real services (open in a new tab). Keep them in sync
if any change:
- ChurchSuite (giving, forms, events): `hopewinchester.churchsuite.com` / `.co.uk`
- Newsletter signup: `hopewinchester.churchsuite.co.uk/embed/addressbook/form`
- YouTube: `youtube.com/@HopeChurchWinchester`
- Spotify / Apple Podcasts / SoundCloud (sermons)
- Blog: `hopeinactionwinchester.squarespace.com/blog`
- Facebook, Instagram (the Instagram feed on the homepage uses LightWidget)
- Middle Brook Centre room hire; Google Maps directions; SharePoint safeguarding policy PDF

---

## Fonts
- Body: **Neue Montreal** (files in `_ds/…/fonts/`, loaded via `@font-face`).
- `Inter` is pulled from Google Fonts as a secondary/UI face.
- The design spec also names *ED Nimpkish* and *PP Mori* for display/headings;
  those were not delivered and are substituted. Drop licensed files into
  `_ds/…/fonts/` and update the font stacks if/when they're available.

---

## Content / tone notes for future edits
Copy is warm, plain-English and first-person ("we"/"you"), British spellings, no
jargon or emoji. Times in British style (`10am`, `7.30pm`).

---

## History
This site was originally delivered as `.dc.html` design components rendered by a
bundled `support.js` runtime that loaded React and Babel in the browser. It was
converted to plain static HTML by rendering each page through that runtime once
and capturing the final markup, then reimplementing the runtime's responsive
behaviour and interactions as the small `site.css` / `site.js` above. The
original design-component sources remain in the project's git history if ever
needed for reference.
