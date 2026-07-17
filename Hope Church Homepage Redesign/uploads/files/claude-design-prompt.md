# Claude Design Prompt — Hope Church Winchester Website Redesign

Paste this entire document as your opening message to Claude Design, then attach the files listed at the bottom.

---

## Your task

I need you to redesign the Hope Church Winchester website (hopewinchester.org). I have an established brand, a clear design direction, approved page mockups, and real photography. I want you to take all of this and produce a polished, production-ready visual design for the site.

Start with the **homepage** and the **Sunday page**. These are the two most important pages and the ones where we have the most developed thinking.

---

## Who Hope Church Winchester is

Hope Church Winchester is a Word and Spirit church based at the Middle Brook Centre in Winchester, UK. The congregation is diverse — all ages, many nationalities, people at all stages of faith. The church is outward-facing: they run community outreach programmes, support global mission, and equip church leaders nationally.

**Tagline:** Find Hope Here

**Tone:** Warm and welcoming. Clear and accessible. Confident but not corporate. No jargon. Works for someone who has never been to church before, and for someone who has been going for 50 years.

**The primary audience for the website** is someone who Googled "Hope Church Winchester" — they don't know the church, they want to find out what it is and whether it's for them. Design for them first.

---

## Brand colours

| Name | Hex | Usage |
|---|---|---|
| Deep Navy | `#0D1B3E` | Primary dark background, hero sections |
| Navy Mid | `#162040` | Secondary dark background, card backgrounds |
| Slate Blue | `#3F5CAA` | PRIMARY interactive colour — all buttons, CTAs, links |
| Cream | `#F4EBE1` | Primary light background |
| Light Blue | `#A3C0E8` | Labels and links on dark backgrounds |
| Lavender | `#CEDCF1` | Badges, accents, photo placeholders |
| Charcoal | `#232220` | Body text |
| White | `#FFFFFF` | |
| Purple | `#6028A7` | Palette only — NEVER use as a button or interactive element |
| Orange | `#F36C41` | Hope Street Café branding only |

Do not use green anywhere. Do not use purple as a CTA colour.

---

## Typography

- **Headings:** Silka (weight 300 light for large display type, weight 600 medium for subheadings)
- **Body:** Neue Montreal Regular
- **UI / nav:** Inter

Large hero headlines: very large, lightweight (300), tight line-height (0.9–0.95), tight letter-spacing (-0.02 to -0.03em). Think editorial magazine, not website header.

Proper sentence and title case throughout. No all-lowercase styling.

---

## Design direction

**Aesthetic:** Modern, editorial, cinematic. Full-bleed photography. Large light-weight type. Dark and light sections alternating. People-first — real candid photos of real congregation members throughout. Warm but not cheesy. Confident but accessible.

**Reference sites to study:**
- redeemerbk.com — full-bleed hero photography, massive type over images, people walking in the street
- kxc.org.uk — photography-led, clean and simple, worship congregation photos
- redeemerdt.com — split hero, warm palette

**What we don't want:**
- Template-looking generic church website
- Clipart or stock photos
- Overly complex layouts that exclude elderly users or non-native English speakers
- Emojis anywhere on the site (use inline SVG icons instead)
- All cards the same size in a grid (vary the layout)

---

## Key design decisions already made

1. **Hero:** Full-bleed congregation photo with dark gradient overlay. Headline sits large and lightweight over the image at the bottom of the viewport. CTAs below.

2. **Section rhythm:** Pages alternate Dark (`#0D1B3E`) → Light (`#F4EBE1`) → Dark → Light. Accent sections in `#3F5CAA` (slate blue) for CTA banners.

3. **Buttons:** Always pill-shaped (border-radius 999px). Never square or rounded-corner rectangles.

4. **Photography:** Candid, diverse, warm. No posed photos. No stock.

5. **Icons:** Inline SVG Tabler outline icons only. No emoji, no icon fonts, no CDN dependencies.

6. **No circles for team photos.** Staff headshots are portrait-format — use portrait rounded rectangle cards.

7. **Nav:** Transparent on page top, dark navy on scroll. Logo left, links centre, Give (solid) + ChurchSuite (outline) right.

8. **Footer:** Dark navy (`#060D1E`), four columns: contact details + three link groups (Visit, Learn, Connect).

---

## Sunday page — approved layout structure

The Sunday page has been iterated and approved. The layout is:

**1. Hero (full-bleed, cinematic)**
- Worship congregation photo (people with hands raised, from below, looking toward stage)
- Gradient overlay dark at bottom, fading to transparent at top
- Large headline: "Sundays / at Hope." — "at Hope." in Light Blue `#A3C0E8`
- Below headline: horizontal row of four info panels (frosted glass treatment)
  - Clock icon + "10am" + "Doors open 9:30"
  - Map pin icon + "Middle Brook Centre" + "Winchester"
  - People icon + "Kids groups 0–18" + "Throughout the service"
  - Globe icon + "40+ languages" + "Live translation available"
- CTAs: "Get Directions" (white button) + "I'm New Here" (ghost white)

**2. What to Expect (two panels, no padding between hero and this)**
- Left panel (Deep Navy background): numbered steps 1, 2, 3 with slate blue circle badges
  - 9:30am Doors open
  - 10:00am Service begins
  - ~11:30am Service ends
  - "Plan My Visit" button
- Right panel (White background): photo placeholder (arrival/welcome moment)
- Hard 4px Deep Navy divider below this section

**3. Children & Young People** (Cream background)
Four age-group cards: Under 5s Stay & Play, Under 5s Kids, Lower Primary, Upper Kids
"Find Out More About Families" button
Two midweek cards: The Ark (white) + Youth (navy)

**4. Sunday Evenings** (Deep Navy)
Split layout: text + time cards left, photo right
Prayer / Worship / Word / Deeper tag pills
7:30pm and Middle Brook Centre time cards
"See the Calendar" button

**5. In Your Language** (Slate Blue)
"40+" stat, "We Speak Your Language", QR code placeholder

**6. Catch Up Online** (Cream)
Two-column: YouTube + Soundcloud cards left, photo right

**7. Find Us in Winchester** (Deep Navy)
Three cards with SVG icons: Address, Parking, Public Transport

**8. The Connect Point** (Cream)
Two-column: photo left (Connect Point desk, woman in Hope Church hoodie smiling), text + CTAs right

---

## Homepage — approved layout structure

**1. Hero**
Full-bleed congregation photo. Headline: "Find / Hope / Here." — "Here." in Light Blue. Two CTAs: "I'm New Here" (solid white) + "What's On" (ghost white). Scroll indicator.

**2. Join Us This Sunday** (Deep Navy)
Split: text + info tags left, photo right. Floating info cards over photo: "10am" (slate blue) + "7:30pm" (cream).

**3. Hope in the City** (Cream)
Full-width photo of people laughing/in community. Three dark glass overlay panels at bottom: Warm Welcome, All Nations Café, Hope Street Café.

**4. What's On** (Deep Navy)
Three ministry cards with real photos and real logos overlaid top-left:
- Community Groups (blue logo)
- The Ark (Ark logo, toddlers playing)
- Youth (Youth logo, foosball)

**5. Catch Up on Sermons** (Cream)
Three sermon series thumbnail cards. Thumbnail IS the card. Dark bar below with talk count + Watch button. Current series has slate blue border.

**6. Ready to Take a Next Step?** (Slate Blue)
CTA banner. Text + buttons left. Photo right (Connect Point, welcoming woman in Hope Church hoodie).

**7. The Hope Weekly** (Deep Navy)
Centred newsletter signup. Email input + Sign Up button.

---

## Photography available (attach these files)

I am attaching the following photos for you to use directly in the designs:

| File | Use |
|---|---|
| DSC01566__2_.jpeg | Hero photo — worship congregation, hands raised. Primary hero for both homepage and Sunday page. |
| DSC01027.jpeg | Band/worship team on stage. Use for Sundays section. |
| 6516d8a9a170ca9b5bd556d2_DSC02894-Enhanced-NR-p-1600.jpg | Group of people laughing, Hope lanyards. Use for Hope in the City / community sections. |
| 65240de23efb05f4a9484442_DSC03622-Enhanced-NR.jpg | Woman in purple Hope Church hoodie at Connect Point desk, smiling. Use for Connect Point + New Here CTA sections. |
| Ministries_Website_Page_Images.png | Woman at craft activity, community group setting. Use for community/ministry sections. |
| 68f8f634215f94d161670ceb_ARK_23-9-p-1600.jpeg | Toddlers playing. Use for The Ark section. |
| 69a594fbe2a0ac3c7affc34c_Ministries_Website_Page_Images__1_-p-1600.jpg | Foosball game. Use for Youth section. |
| 68f8f01ab4a1381118a09091_000004100019-p-500.jpeg | Young people eating together, film photo. Use for Community Groups. |
| studio_square_thumbnail.jpg | The Ancient Path for Our Modern World sermon series graphic (current series). |
| studio_square_thumbnail__1_.jpg | Light in the Darkness sermon series graphic. |
| hqdefault.jpg | Glorious Gospel sermon series graphic. |

**Ministry logos:**
| File | Ministry |
|---|---|
| 68f8ef32498742f2e25e9370_Foundations-01-p-500__1_.jpg | Community Groups (blue circle) |
| 68ed1b19d1044c30b26d4564_252114465...png | The Ark logo |
| 64bfd64e7add0dfb0f752e3d_Youth_Icon-p-500.png | Youth logo (black square) |

**Brand logo:**
| File | Usage |
|---|---|
| HopeBrand_Logo1_White.png | Hope Church Winchester white logo — use in nav and footer |

---

## Reference mockup files (attach these)

| File | Description |
|---|---|
| sunday.html | Approved Sunday page mockup — open in browser to see the full page with real photos. Use as the reference for the Sunday page design. |
| hope-church-build-brief.md | Full technical brief with all design decisions, content, colours, and specifications. Read this in full. |

---

## What I want from you

1. **Redesign the homepage** using the layout structure above, the real photography provided, and the brand system. The design should feel cinematic, warm, and modern — closer to redeemerbk.com than a generic church website template.

2. **Redesign the Sunday page** following the approved layout structure above. The Sunday page is the most critical page for first-time visitors — make sure times and address are visible without scrolling.

3. For each page, show me:
   - Desktop version (1280px wide)
   - Mobile version (390px wide — iPhone 14/15)

4. Stay true to the brand colours, typography, and design direction. Do not introduce new colours or change the established palette.

5. If you want to suggest improvements to the layout or visual treatment, propose them clearly and explain your reasoning. Don't just implement them without flagging.

---

## Key content facts

- Address: Middle Brook Centre, Middle Brook Street, Winchester SO23 8DQ
- Sunday morning: Doors 9:30am, service 10am, ends ~11:30am
- Sunday evening: 7:30pm most Sundays
- Kids: ages 0–18 throughout Sunday morning service
- Translation: 40+ languages live
- The Ark: Mondays 10–11:30am, term time, £1 per family
- Youth: Thursdays 7:15–9pm, Year 7–13
- Email: office@hopewinchester.org
- Phone: 01962 840800
- Charity: 1128609 | Company: 6804892

---

## Files to attach (in order of priority)

**Essential:**
1. `DSC01566__2_.jpeg` — hero photo
2. `65240de23efb05f4a9484442_DSC03622-Enhanced-NR.jpg` — Connect Point photo
3. `6516d8a9a170ca9b5bd556d2_DSC02894-Enhanced-NR-p-1600.jpg` — community photo
4. `DSC01027.jpeg` — worship band photo
5. `HopeBrand_Logo1_White.png` — logo
6. `sunday.html` — approved Sunday page mockup
7. `hope-church-build-brief.md` — full brief

**Ministry photos:**
8. `68f8f634215f94d161670ceb_ARK_23-9-p-1600.jpeg`
9. `69a594fbe2a0ac3c7affc34c_Ministries_Website_Page_Images__1_-p-1600.jpg`
10. `68f8f01ab4a1381118a09091_000004100019-p-500.jpeg`
11. `Ministries_Website_Page_Images.png`

**Logos:**
12. `68f8ef32498742f2e25e9370_Foundations-01-p-500__1_.jpg`
13. `68ed1b19d1044c30b26d4564_252114465_3088190521463126_7336826119241398195_n__1_.png`
14. `64bfd64e7add0dfb0f752e3d_Youth_Icon-p-500.png`

**Sermon thumbnails:**
15. `studio_square_thumbnail.jpg`
16. `studio_square_thumbnail__1_.jpg`
17. `hqdefault.jpg`
