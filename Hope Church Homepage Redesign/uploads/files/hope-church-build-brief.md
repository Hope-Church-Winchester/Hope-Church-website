# Hope Church Winchester — Website Rebuild Brief
## Instructions for Claude Code

This document contains everything needed to build hopewinchester.org in Webflow. Read it fully before touching any code or making any design decisions. All decisions in this brief are final unless explicitly overridden by the user.

---

## 1. Project Overview

**Client:** Hope Church Winchester
**Site:** hopewinchester.org
**Platform:** Webflow (site ID: `6499987693896867c8b3f970`)
**Goal:** Full redesign and rebuild. UX-first, mobile-equal-to-desktop, newcomer-focused.
**Current status:** Design system established, homepage and Sunday page mockups approved. Build page by page with user review at each stage.

**Build workflow:**
1. Webflow Designer must be open/foregrounded for all write operations via MCP
2. Set up design system (colour variables, text styles, components) before building any pages
3. Build one page at a time, user reviews, then move to next
4. All pages need both desktop (1280px) and mobile (390px) layouts

---

## 2. Brand & Design System

### Colours

**Primary palette:**
- Deep Navy `#0D1B3E` — primary dark background, hero sections
- Navy Mid `#162040` — secondary dark background, card backgrounds on dark
- Slate Blue `#3F5CAA` — PRIMARY interactive colour. All buttons, links, CTAs, active states
- Cream `#F4EBE1` — primary light background
- Light Blue `#A3C0E8` — labels, links, and eyebrows on dark backgrounds
- Lavender `#CEDCF1` — photo placeholders, age badges, light accents
- Charcoal `#232220` — body text on light backgrounds
- White `#FFFFFF`

**Secondary palette:**
- Purple `#6028A7` — palette entry ONLY. Never use as an interactive or UI colour
- Orange `#F36C41` — Hope Street Café ONLY. Do not use elsewhere
- Green `#36A877` — REMOVED. Do not use anywhere

**Accessibility:** All text/background combinations must pass WCAG AA minimum. Use `#A3C0E8` for any text or labels on dark navy backgrounds.

### Typography

**Heading font:** Silka (loaded in Webflow). Weight mapping:
- Light = 300
- Regular = 400
- Medium = 600

**Body font:** Neue Montreal Regular

**UI/nav font:** Inter (Google Fonts)

**Rules:**
- Proper sentence and title case throughout. No all-lowercase style
- No ED Nimpkish, no Space Grotesk — these are not used
- Large headings: font-size 88–108px, font-weight 300, line-height 0.9–0.95, letter-spacing -0.03em
- Section headings: font-size 48–60px, font-weight 300, line-height 0.95, letter-spacing -0.025em
- Body: font-size 17px, line-height 1.78
- Eyebrow labels: font-size 11px, font-weight 600, letter-spacing 0.16em, text-transform uppercase

### Buttons

All buttons are pill-shaped (border-radius: 999px). No other border-radius for buttons.

- **Primary (solid slate blue):** background `#3F5CAA`, white text, padding 14px 28px, font-size 15px, font-weight 600
- **Ghost on dark:** transparent background, white text, white border 2px, same padding
- **Ghost on light:** transparent background, slate blue text, slate blue border 2px, same padding
- **White (on dark sections):** white background, `#0D1B3E` text — used as primary CTA on dark hero sections
- **Small (nav):** padding 9px 20px, font-size 13px

Hover states: solid buttons darken 10%, ghost buttons fill slightly, all translateY(-1px).

### Icons

**Inline SVG only.** No CDN icon fonts, no emoji. Zero exceptions.

Use Tabler outline icon paths (stroke-width 1.5, stroke-linecap round, stroke-linejoin round). Icons inherit colour from parent element via `stroke="currentColor"`.

Common icons used:
- Clock: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`
- Map pin: `<svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`
- World: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`
- Parking: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/></svg>`
- Bus: `<svg viewBox="0 0 24 24"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/></svg>`
- People: `<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`

### Photography

People-first throughout. Every section should have a real candid photo of Hope Church people where possible.

**Photography principles:**
- Candid over posed
- Diverse — the congregation reflects many nationalities and ages
- Warm, natural light preferred
- No stock photography
- People in community, worship, serving — not empty rooms or architecture

Photo treatment on dark sections: full-bleed with a dark gradient overlay (`linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.1) 100%)`)

### Section Rhythm

Pages alternate dark/light sections to create pace:

- Dark: `#0D1B3E` (deep navy)
- Light: `#F4EBE1` (cream) or `white`
- Accent dark: `#3F5CAA` (slate blue) — used for CTA banner sections
- Section dividers where sections of similar tone meet: 4px `#0D1B3E` bar

Section padding: 88–96px top and bottom on desktop, 56–64px on mobile.
Max content width: 1280px, centred, with 40px side padding on desktop, 20px on mobile.

---

## 3. Navigation

### Desktop nav

Fixed to top. Background: `#0D1B3E`, 72px height.

**Left:** Hope Church logo (transparent PNG, height 25px)

**Centre links:** Home · New Here · What's On · Sermons · Sunday · About · Contact
- Font: Inter 14px, colour rgba(255,255,255,0.78)
- Active: white text, 2px slate blue bottom border
- Hover: white text

**Right:**
- Give — solid white button (small size)
- ChurchSuite — ghost/outline white button (small size)

Nav becomes transparent when at top of page, transitions to `rgba(8,15,36,0.96)` with `backdrop-filter: blur(16px)` on scroll.

Mobile: hamburger icon replaces centre links. Opens full-width dropdown with all links stacked, Give and ChurchSuite buttons at bottom.

### Footer

Background: `#060D1E` (darker than nav), 1px top border rgba(255,255,255,0.05)

**Four columns:**
1. Logo + address + contact details + office hours
2. Visit: Sunday, New Here, Families, What's On
3. Learn: About Us, Sermons, Hope In The City, Blog
4. Connect: Contact, Give, ChurchSuite, Room Hire, Safeguarding

**Bottom bar:** Copyright + charity/company numbers left. Social links right (Facebook, Instagram, YouTube, Soundcloud — NOT Spotify).

**Key details:**
- Address: Middle Brook Centre, Middle Brook Street, Winchester SO23 8DQ
- Email: office@hopewinchester.org
- Phone: 01962 840800
- Office hours: Mon–Fri 9am–5pm
- Charity: 1128609
- Company: 6804892
- Soundcloud: soundcloud.com/hopechurchwinchester
- YouTube: @HopeChurchWinchester

---

## 4. Design Aesthetic & Reference Sites

**Aesthetic direction:** Modern editorial church website. Full-bleed photography, large light-weight type, cinematic dark sections, confident but warm. NOT corporate, not template-y, not generic.

**Reference sites (study these):**
- redeemerbk.com — full-bleed hero photography, massive type over images
- kxc.org.uk — photography-led, clean and simple
- redeemerdt.com — split hero layout, warm and accessible

**What to avoid:**
- Generic card grids that look like every other church website
- Overly complex layouts that exclude elderly users or non-native English speakers
- Sections that bleed into each other without clear visual breaks
- All-lowercase styling (previously used on the site, now removed)
- Emojis anywhere on the site

---

## 5. GA4 Data — Design Decisions

These insights from Google Analytics must inform every layout decision:

| Insight | Design implication |
|---|---|
| 61% organic search traffic | SEO fundamentals: proper page titles, meta descriptions, heading hierarchy |
| 49.5% mobile / 48.7% desktop | Every page needs equal mobile and desktop treatment |
| Primary mobile viewport: 390px (iPhone 14/15) | Design mobile at 390px width |
| Sunday page: 87 direct Google landing sessions, 39% engagement rate | Times and address must be visible without scrolling on the Sunday page |
| About page: 1m 11s avg engagement | People are genuinely reading — keep it thorough |
| Direct traffic (35%) has 14s avg engagement | Existing members passing through — don't over-optimise for them |
| /en/ duplicate pages getting 0% engagement | Redirect all /en/ URLs in the rebuild |
| Contact page: 23.8% landing engagement | Form may be broken — ensure contact form works and info is unmissable |

---

## 6. Site Map & Page Hierarchy

### Primary navigation pages

**Home (`/`)** — Convince a first-time visitor Hope Church is worth a closer look. Sections: Hero → Sundays teaser → Hope in the City → What's On preview → Sermons preview → New Here CTA → Newsletter signup → Footer

**New Here (`/new-here`)** — Guide someone who visited for the first time through what to do next. Sections: Welcome → Next Steps (Newcomers Meal, Lunches in Homes, Explore, Membership) → Hope In The City teaser → Meet the Team

**What's On (`/whats-on`)** — Help anyone find something relevant to them. Sections: Intro → Community & Social Groups → Outreach (Warm Welcome, All Nations Café, Hope Street Café, CAP) → Families & Kids → Students

**Sermons (`/sermons`)** — Find and explore teaching by series. Sections: Current series featured → All series grid → YouTube + Soundcloud links

**Sunday (`/sunday`)** — Tell a first-time visitor exactly what to expect. See Section 7 for full spec.

**About (`/about`)** — Explain who Hope Church is and what they believe. Sections: Who We Are → What We Believe → Network (Commission/Newfrontiers — text only, no logos) → Staff grid → Elders (couple portrait cards) → Deacons & Trustees

**Contact (`/contact`)** — Remove every barrier to getting in touch. Sections: Form → Office details → Address + map → Connect Point → Social channels → Newsletter signup

### Supporting pages

**Hope In The City (`/hope-in-the-city`)** — Show Winchester what Hope does in the community. Accessible to people with no church background.

**Families (`/families`)** — Help parents understand provision for every age group.

**People (`/people`)** — Staff, elders, deacons, trustees directory.

**Give (`/give`)** — Make giving straightforward with theological framing before ChurchSuite link.

### Utility / external

- ChurchSuite: hopewinchester.churchsuite.com
- Blog: Squarespace (external, new tab)
- Room Hire: middlebrookcentre.org (external)
- Safeguarding: SharePoint PDF link (footer only)

---

## 7. Sunday Page — Full Specification

This is the most important page after the homepage. Build to this exact spec.

### Hero (Concept B style)
- Full-bleed photo background (worship congregation shot — hands raised)
- Dark gradient overlay: `linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.1) 100%)`
- Headline: "Sundays" / "at Hope." — "at Hope." in `#A3C0E8`
- Font: 96px, weight 300, line-height 0.9, letter-spacing -0.03em
- Below headline: four info panels in a horizontal row, each with SVG icon + value + sub-label
  - Clock icon → "10am" / "Doors open 9:30"
  - Map pin icon → "Middle Brook Centre" / "Winchester"
  - People icon → "Kids groups 0–18" / "Throughout the service"
  - World icon → "40+ languages" / "Live translation available"
- Info panels: dark frosted glass treatment, `rgba(0,0,0,0.3)` background, `backdrop-filter: blur(12px)`, 1px border `rgba(255,255,255,0.08)`, separated by vertical dividers
- Final panel: Get Directions (white button) + I'm New Here (ghost white button)
- Gradient footer fades hero into next section background

### What to Expect (Concept A style)
Two-column layout, no section padding — sits directly below hero:
- **Left panel** (`#0D1B3E` background, 56px padding):
  - Eyebrow: "Sunday morning" in `#A3C0E8`
  - H2: "What happens on Sunday" in white, 40px, weight 300
  - Three numbered steps with slate blue circle badges (numbers 1, 2, 3):
    1. "9:30am — Doors open" / "Tea, coffee, and a warm welcome from our team. Come as you are."
    2. "10:00am — Service begins" / "Sung worship, a Bible talk, and time to connect with others."
    3. "~11:30am — Service ends" / "Stay for coffee and conversation. There's no rush." (faded badge)
  - "Plan My Visit →" primary button
- **Right panel** (white background, 56px padding):
  - Photo placeholder (aspect-ratio 4/3, `#CEDCF1` background)
  - Replace with a warm welcoming arrival photo when available
- **4px `#0D1B3E` divider bar** between this section and Kids below

### Children & Young People
Background: `#F4EBE1`
- Eyebrow: "Children & Young People"
- H2: "Your Kids Are Welcome Here"
- Intro paragraph
- Four age-band cards in a row (white background, 1px border):
  - Age 0–4: Under 5s Stay & Play
  - Age 2–4: Under 5s Kids
  - Year R–3: Lower Primary
  - Year 4–6: Upper Kids
- Each card: lavender age badge, bold name, description text
- "Find Out More About Families →" primary button below grid
- "Also During the Week" label
- Two midweek cards side by side:
  - The Ark: white background — Mondays 10–11:30am, term time, £1 per family
  - Youth: `#0D1B3E` background — Thursdays 7:15–9pm, Year 7–13

### Sunday Evenings
Background: `#0D1B3E`
Two-column: text left, photo right (aspect-ratio 4/3)
- Eyebrow: "Sunday Evenings"
- H2: "Go Deeper Together"
- Body copy about prayer, worship, word, deeper
- Four tag pills: Prayer, Worship, Word, Deeper
- Two time cards: "7:30pm" (slate blue card) + "Middle Brook Centre" (cream card)
- "See the Calendar →" button linking to ChurchSuite calendar

### In Your Language
Background: `#3F5CAA`
Two-column: text left, QR code right
- H2: "We Speak Your Language"
- Body about 40+ languages live translation
- "40+" stat badge
- QR code placeholder (replace with real QR code)

### Catch Up Online
Background: `#F4EBE1`
Two-column: content left, photo placeholder right (aspect-ratio 4/3)
- H2: "Catch Up Online"
- Brief intro copy
- YouTube card (red icon, link to @HopeChurchWinchester)
- Soundcloud card (orange icon, link to soundcloud.com/hopechurchwinchester)
- "Browse all sermon series →" text link

### Find Us in Winchester
Background: `#0D1B3E`
Three-column card grid:
- Address card: map pin SVG icon, address details, Get Directions link
- Parking card: parking SVG icon, info, Find Parking link
- Transport card: bus SVG icon, info, Plan Your Journey link
All cards: `#162040` background, 1px `#1E2D50` border

### The Connect Point
Background: `#F4EBE1`
Two-column: Connect Point photo left (aspect-ratio 4/3), text right
- Photo: the woman in Hope Church hoodie at Connect Point desk
- H2: "The Connect Point"
- Two paragraphs of welcoming copy
- "I'm New Here →" primary button + "Get in Touch" outline button

---

## 8. Homepage — Key Sections

### Hero
- Full-bleed worship congregation photo (hands raised, DSC01566)
- Gradient overlay
- Headline: "Find / Hope / Here." — "Here." in `#A3C0E8`
- Font: 108px, weight 300, line-height 0.9, letter-spacing -0.03em
- Eyebrow: "Hope Church Winchester"
- Subtext paragraph: warm welcoming copy
- Two CTAs: "I'm New Here →" (solid white) + "What's On" (ghost white)
- Vertical scroll indicator right side

### Sundays Teaser
Background: `#0D1B3E`
Two-column: text left, photo right
- Eyebrow: "Every Sunday"
- H2: "Join Us This Sunday"
- Key info tags: 10am Sunday, Middle Brook Centre, Ages 0–18, 40+ languages
- "Plan My Visit →" button
- Floating info cards over photo bottom-left: "10am" (slate blue) + "7:30pm" (cream)

### Hope in the City
Background: `#F4EBE1`
- H2: "Hope in the City"
- Intro copy right of heading
- Full-width photo (laughing group, DSC02894) with dark glass overlay panels at bottom for three ministries:
  - Warm Welcome, Mon 1–2:30pm
  - All Nations Café, Mon 7:30–9pm
  - Hope Street Café, Thu 6–8pm

### What's On Preview
Background: `#0D1B3E`
Three ministry cards with real photos and real logos:
- Community Groups (blue logo, film photo)
- The Ark (Ark logo, toddler play photo)
- Youth (Youth logo, foosball photo)

### Catch Up on Sermons
Background: `#F4EBE1`
Three sermon series cards, thumbnail IS the card:
- The Ancient Path for Our Modern World (CURRENT — slate blue border + "Current Series" label)
- Light in the Darkness
- Glorious Gospel
Each card: real thumbnail image, dark bar below with talk count + "Watch →" white pill button

### New Here CTA Banner
Background: `#3F5CAA`
Two-column: text + CTAs left, welcoming photo right (Connect Point photo)

### Newsletter Signup
Background: `#0D1B3E`
Centred, single column
- H2: "The Hope Weekly"
- Email input + Sign Up button

---

## 9. Ministry Cards

Ministry cards are used across What's On, homepage, and New Here pages.

**Structure:**
- Photo fills the card top (200px height)
- Real ministry logo sits top-left over photo (48px circle, `border-radius: 50%`, `objectFit: cover`)
- Below photo: eyebrow label (time/frequency), bold name, description, "Find Out More →" link
- Dark version (on dark sections): `#162040` background, `#1E2D50` border
- Light version (on light sections): white background, `#e5e7eb` border

**Ministry logos available:**
- Community Groups: blue circle with "COMMUNITY GROUPS" text
- The Ark: cream/teal wavy background with Ark logo
- Youth: black background with "YOUTH" in white box
- (Others available via welcome pack PDF extraction)

---

## 10. Team & People Cards

**Individual staff cards (portrait format):**
- Rounded rectangle (border-radius 12px), no circles
- Portrait photo fills top portion (220px height, aspect-ratio portrait)
- Name and role below in padding area
- Background: white with 1px border

**Elder couple cards (landscape format):**
- Wider card to accommodate couple shots
- Landscape photo fills top
- "Name and Name Surname" format
- Same white/border treatment

Two distinct card types needed in Webflow — do not use circles for either.

---

## 11. Sermon Cards

Thumbnails ARE the cards. No text overlay on the image.

- Thumbnail image fills the card (aspect-ratio 16/9 or close)
- Dark bar below thumbnail containing:
  - Talk count (left, small text, `rgba(255,255,255,0.72)`)
  - "Watch →" pill button (right, white background, dark text)
- Current series: 2px `#3F5CAA` border + "Current Series" label bar at top
- Hover: `transform: translateY(-4px)`

Link each card to its YouTube playlist URL.

---

## 12. Key Content & Copy

**Tagline:** Find Hope Here

**Vision:** We're here to share God's love and hope with everyone, so Winchester and the surrounding area can become a city full of joy and a blessing to all nations.

**Mission:** We help people get to know and follow Jesus and grow in God's Word. We equip believers to serve Winchester, the wider UK, and support God's global mission.

**Four pillars:** Hope for Disciples, Hope for the City, Hope for the Nation, Hope for the World

**Tone:** Warm and welcoming. Clear, concise, no jargon. Accessible to people with no church background, non-native English speakers, elderly visitors. No fear or guilt. No corporate language. Celebrate impact and community.

**Sunday service:**
- Doors: 9:30am
- Service: 10am
- Ends: approximately 11:30am
- Evening: 7:30pm most Sunday evenings
- Kids: ages 0–18 throughout morning service
- Translation: 40+ languages live

**The Ark:** Mondays, 10–11:30am, term time, £1 per family, admission closes 10:30am

**Youth:** Thursdays, 7:15–9pm, Year 7–13

**Warm Welcome:** Mondays, 1–2:30pm

**All Nations Café:** Mondays, 7:30–9pm

**Hope Street Café:** Thursdays, 6–8pm

**Explore:** Tuesdays (Christianity explored course)

**Newcomers Meal:** Termly, Wednesday evenings

---

## 13. External Links

| Destination | URL |
|---|---|
| ChurchSuite | https://hopewinchester.churchsuite.com/ |
| Give | https://hopewinchester.churchsuite.com/donate/fund/y4kw8yml |
| Calendar | https://hopewinchester.churchsuite.com/events/calendar |
| YouTube | https://www.youtube.com/@HopeChurchWinchester |
| Soundcloud | https://soundcloud.com/hopechurchwinchester |
| Facebook | https://www.facebook.com/hopechurchwinchester |
| Instagram | https://www.instagram.com/hopechurchwinchester |
| Room Hire | https://www.middlebrookcentre.org |
| Blog | https://hopeinactionwinchester.squarespace.com/blog |
| Google Maps | https://maps.google.com/maps?q=Middle+Brook+Centre+Winchester |

All external links: `target="_blank" rel="noopener noreferrer"`

---

## 14. SEO Basics

Every page needs:
- Descriptive `<title>` tag: "[Page Name] — Hope Church Winchester"
- Meta description: 150–160 characters, warm and descriptive
- Single `<h1>` per page
- Proper heading hierarchy (h1 → h2 → h3, never skipping)
- Alt text on all images
- Redirect all `/en/*` URLs to their non-prefixed equivalents (e.g. `/en/sunday` → `/sunday`)

---

## 15. Accessibility

- WCAG AA minimum for all text/background combinations
- All images have descriptive alt text
- All interactive elements have visible focus states
- No content conveyed by colour alone
- Font size minimum 13px anywhere on the site
- Form labels always visible (not just placeholder text)
- Skip to main content link

---

## 16. What We've Already Built

The following mockup files exist and are approved. Use them as exact references:

- `sunday.html` — Full Sunday page, approved layout (B hero + A What to Expect)
- `hope-homepage.jsx` — Homepage mockup with real photos embedded
- `hope-design-system.jsx` — Full design system reference with all components, colours, cards, nav, footer

When building in Webflow, match these mockups exactly. Do not improvise design decisions — if something isn't covered here, ask before proceeding.

---

## 17. Things to Avoid

| Do not | Why |
|---|---|
| Use emojis anywhere | Looks unprofessional, off-brand |
| Use circles for team photos | Photos are portrait format — circles crop badly |
| Use purple as a CTA or button colour | Purple is palette-only, not interactive |
| Use orange outside Hope Street Café | Brand rule |
| Use green anywhere | Removed from the design system |
| Use Spotify links | Replaced with Soundcloud |
| Include Commission/Newfrontiers logos | Removed by client decision |
| Put CAP on any page except Ministries | Brand decision |
| Use lowercase style | Removed — use proper capitalisation throughout |
| Load icons from a CDN | Use inline SVG only |
| Use stock photography | Real Hope Church photos only |
| Make assumptions and build ahead | Check with the user at each page stage |

---

*Document compiled from the Hope Church Winchester website rebuild project conversation. Last updated June 2026.*
