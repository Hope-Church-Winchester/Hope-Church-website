# Hope Church Winchester — Design System

> Hope Church Winchester is a community of Jesus followers in the heart of Winchester city. We gather people from every stage of life to worship the living God.

This design system is the single source of truth for typography, colour, voice, components, and imagery across every Hope Church Winchester touchpoint — Sunday slides, social, flyers, signage, and the website.

---

## Source materials

This system was built from a single brief: the **Hope Church Winchester Creative Guidelines** document (logo description, colour spec, type spec, photography guidance) plus a font drop. No Figma file or codebase was attached; if you have them, please re-attach so the UI kit can be made pixel-perfect.

Fonts supplied:

- **Neue Montreal** — full family, used as body. ✅ in `fonts/`
- **ED Nimpkish** — display, **not delivered**. Substituted with *Big Shoulders Display* (Google Fonts) and flagged below.
- **PP Mori** — headings, **not delivered**. Substituted with *Sora* (Google Fonts) and flagged below.

> ⚠️ **Font substitutions in play** — see [Caveats](#caveats). Drop the licensed files into `fonts/` and update `colors_and_type.css` to remove the Google Fonts `@import` and replace the `--font-display` / `--font-heading` stacks.

---

## Index

| Path | What's in it |
|---|---|
| `colors_and_type.css` | All CSS variables, `@font-face` declarations, base element styles. **Import this in every Hope artifact.** |
| `fonts/` | Local Neue Montreal `.ttf` files. |
| `assets/` | Logo SVGs (dark & cream), brand marks. |
| `preview/` | Design-system cards shown in the Design System tab. |
| `ui_kits/website/` | Recreation of the Hope marketing website surface — components + index. |
| `SKILL.md` | Agent Skills front-matter for use in Claude Code. |

---

## Brand voice & content fundamentals

We are **warm, welcoming, contemporary, and rooted in faith.** Copy should feel like an invitation, not an announcement.

### Tone

- **Warm and personal.** Speak to a friend, not an audience. We say *"we"* and *"you"*, not *"the church"*.
- **Plain English, never churchy jargon.** Prefer *"join us"* over *"come and partake"*, *"helping out"* over *"serving in ministry"*. If a guest from outside the church wouldn't get a word, replace it.
- **Confidently faithful.** We don't apologise for the gospel and we don't dress it up. Mentions of Jesus, prayer, and the Bible are direct and matter-of-fact.
- **Hopeful, never preachy.** Lift, don't lecture.

### Casing & punctuation

- **Display titles**: ED Nimpkish, **lowercase**, always. No exceptions.
- **Headings**: PP Mori, **sentence case** preferred. ("Sundays at Hope", not "Sundays At Hope".)
- **Body**: standard sentence case. British English spellings (*colour, organise, centre*).
- **Em dashes** with spaces — like this — are fine. Oxford comma: yes.
- **Numbers**: spell out one–nine, numerals for 10+. Times as *10.30am*, *6.30pm* (British style, lowercase am/pm, no space).

### Pronouns & posture

- **First-person plural**: *"We meet every Sunday at 10.30am"*, *"We'd love to see you there"*.
- **Second-person, often**: *"You're welcome here — whoever you are, wherever you've come from"*.
- **God / Jesus / the Bible / the Holy Spirit**: capitalised. Pronouns for God (He, Him) capitalised in formal copy; lowercase is acceptable in informal social posts.

### Emoji & symbols

- **Emoji**: not part of the brand identity. They may appear sparingly in social captions (a single ✨ or 🙌 at most) but never in headlines, slides, web copy, or print.
- **Unicode glyphs as icons**: avoid. Use the SVG icon set in `assets/icons/`.
- **Iconography**: minimal — see [Iconography](#iconography).

### Concrete examples

| Don't | Do |
|---|---|
| "Hope Church cordially invites you to our Sunday gathering." | "Sundays at Hope — 10.30am, everyone welcome." |
| "Partake in our community ministries." | "Find your people in a midweek group." |
| "Children's Ministry Volunteer Opportunity" | "Help out with Hope Kids" |
| "Click here to learn more 👉" | "More about Sundays →" |
| "We are passionate about reaching the lost." | "We're here to share God's love and hope with everyone." |

### Vibe in one paragraph

Imagine a hand-lettered chalkboard outside a sunlit café in central Winchester — that's the room. Generous, unhurried, a little design-aware, never trying too hard. Confident enough about Jesus to lead with Him, warm enough about people to leave space for everyone.

---

## Visual foundations

### Colour

The palette is split into **primary** (core identity — use freely) and **secondary** (ministry sub-brands only — children's, youth, café, outreach). See `colors_and_type.css` for tokens.

- **Purple `#6028A7`** — signature. Primary buttons, headline accents, primary brand surfaces.
- **Blue `#044EFF`** — electric secondary. Links, highlights, hover states for purple.
- **Soft Cream `#F4EBE1`** — default page background. Always preferred over pure white for long-form surfaces; pure white is reserved for body-text panels and breathing space.
- **Slate Blue `#3F5CAA`** — quiet support colour for muted text, secondary panels.
- **Charcoal `#232220`** — body text, dark sections. Never pure black.
- **White / Charcoal** — readability poles.

**Secondary (ministries only):**

- **Light Lavender `#CEDCF1`** — soft backgrounds for women's / prayer / pastoral.
- **Orange `#F36C41`** — Hope Kids, youth, **Hope Street Café**.
- **Green `#36A877`** — outreach, community, generosity.

**Pairing rules**

- Default surfaces: cream + charcoal text + purple accent.
- High-impact / event work: purple or charcoal as full bleed, cream type, blue or orange for one accent.
- Never combine purple + slate blue + blue at equal weight — pick one as dominant.
- Secondary colours **do not** appear on top-level Hope branding (sermon series titles, the main site header, etc.). They only mark ministry work.

### Typography

A three-typeface system, each with one job:

| Role | Family | Notes |
|---|---|---|
| Display titles | **ED Nimpkish** (substitute: Big Shoulders Display) | **lowercase, always.** Never used below ~36px. |
| Headings & subtitles | **PP Mori** (substitute: Sora) | Sentence case. Regular / Semi-Bold / Bold. |
| Body | **Neue Montreal Regular** | 10–16pt depending on medium. Line height 1.3–1.5. |

Display sets a strong, distinctive top of every layout. PP Mori carries the structural middle. Neue Montreal does the reading work, end of story. Never swap roles.

### Backgrounds & surface treatment

- **Default**: solid cream `#F4EBE1`. No textures, no gradients, no noise.
- **Bold sections**: solid purple or charcoal full-bleed, with cream type.
- **Photography**: full-bleed hero images are encouraged, **with a translucent overlay** (`rgba(35, 34, 32, 0.45)` or a bottom-up cream-to-transparent gradient) when text sits on top.
- **No** gradient meshes, no purple→blue radial blooms, no hand-drawn illustrations, no repeating patterns. The palette and type do the heavy lifting.

### Layout

- Generous whitespace. We are not a busy brand.
- Single dominant focal point per surface (one display headline, one image, one CTA — not three of each).
- 12-column grid on web, 1280–1440px max content width, 24–32px gutters.
- Slides are 1920×1080 with 96px outer margin minimum.
- Print pages keep at least 18mm margins.

### Corner radii

Restrained. We are not bubbly.

- **Buttons / pills**: full pill (`--r-pill`) **or** 8px (`--r-md`). Never both in the same surface.
- **Cards**: 14px (`--r-lg`).
- **Inputs**: 8px (`--r-md`).
- **Images**: square by default. Cards may round to 14px.

### Cards

- Cream-on-white or white-on-cream — pick whichever creates contrast with the page bg.
- 14px radius.
- Hairline border `rgba(35, 34, 32, 0.12)` **or** a single soft shadow (`--shadow-md`) — never both.
- Internal padding: 24–32px.
- No colored left-border accents. No emoji header cards.

### Shadows

Warm-cast, low-opacity. Three tiers (`--shadow-sm`, `--shadow-md`, `--shadow-lg`). Never stack. Never use a coloured shadow.

### Borders

1px, `rgba(35, 34, 32, 0.12)`. Strong borders are 24% charcoal. We do not use coloured borders except focus rings.

### Focus rings

2px solid `--hope-blue`, 3px offset. Always visible — accessibility matters.

### Hover & press

- **Buttons (purple)**: hover → darken 8%, press → darken 14% + 1px translate-y. No scale animations.
- **Buttons (cream / outline)**: hover → fill with charcoal at 6%, press → 12%.
- **Links**: hover swaps blue → purple, underline thickness unchanged.
- **Cards (clickable)**: hover → shadow grows by one tier, **no** scale, **no** colour shift.

### Animation

Quiet and confident. Easing: `cubic-bezier(0.2, 0, 0, 1)` (a gentle decelerate). Durations: 120ms for hovers, 240ms for entrances, 400ms for full transitions. **No bounces. No spring overshoot.** Fades and short translates only.

### Transparency & blur

- Backdrop blur is **only** used over photography (e.g. event card title bars over photo): `backdrop-filter: blur(12px) saturate(140%)` with a `rgba(35, 34, 32, 0.4)` fill.
- Otherwise, surfaces are solid.

### Imagery

- Real photos of the Hope community whenever possible — worship, fellowship, serving, coffee, joy.
- Warm tones, natural light, candid moments. **Not** posed stock.
- Black & white permitted for editorial features (sermon series posters, leadership portraits).
- Always show diversity of age, background, and setting.
- Faces over scenery. People over architecture.
- When stock is unavoidable, prefer warm, golden-hour, slightly-grainy work. Avoid the cool, blue-tinted modern-tech-bro look.

### Protection on photography

When type sits on a photo, use one of two treatments — never bare text on uncontrolled imagery:

1. **Cream-to-transparent gradient** rising from the bottom 40% of the image, type sits on the cream end.
2. **Solid charcoal pill / panel** (with cream type) anchored to one corner.

---

## Iconography

Hope Church Winchester does not have a custom or licensed icon set. The brand is **typography-first**; icons are a quiet accent, never a feature.

**Approach:**

- **System of choice**: [Lucide](https://lucide.dev) — stroke-based, 1.5px stroke, rounded line-caps. Loaded from CDN.
- **Style**: outline only, never filled. Always charcoal `#232220` (or cream on dark surfaces). Never coloured.
- **Sizing**: 16px in body, 20px in buttons, 24px in nav, 32px+ for feature illustrations.
- **Stroke**: 1.5px (Lucide default).
- **Emoji**: not used in product surfaces. Social-only, sparingly.
- **Unicode chars as icons** (e.g. ›, →): allowed for inline UI affordances like "More about Sundays →" but never replacing a real glyph.
- **No hand-drawn or sketchy icons.** No gradient or duo-tone icons.

To use:

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
<i data-lucide="heart" stroke-width="1.5"></i>
<script>lucide.createIcons();</script>
```

> ⚠️ **Substitution flagged**: no in-house icon system was supplied. Lucide was chosen because its stroke weight and rounded caps sit well next to PP Mori / Sora. If you have a preferred set, drop SVGs into `assets/icons/` and we'll wire them in.

---

## Caveats

1. **Display & heading fonts substituted.** ED Nimpkish and PP Mori weren't in the file drop. We're using *Big Shoulders Display* and *Sora* via Google Fonts as visual stand-ins. Headlines will look broadly right but won't match the licensed faces' exact letterforms. Please upload the real `.otf` files and we'll swap them in.
2. **No Figma or codebase.** The UI kit is built from the written guidelines plus reasonable design judgement — not from existing screens. If you have a website, social templates, or Figma library, please attach them and we'll iterate the UI kit to match exactly.
3. **No photography provided.** Image slots in the UI kit use neutral placeholders. Drop real community photos into `assets/photography/` and they'll surface throughout.
4. **Logo rendered typographically.** The HOPE | church / Winchester lockup is reconstructed from the description in your brief. If you have the original vector file, please share it — it should replace `assets/logo.svg`.
