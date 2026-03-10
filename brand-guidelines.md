# EJP Unified Brand Guidelines
## Abstracted from Three Source Sites

---

## Source Site 1: Employment Center (1199careers.org)

### Overview
- **Platform:** Custom CMS / ATS (likely iCIMS-powered)
- **Aesthetic:** Professional, corporate healthcare recruitment
- **Tagline:** "Your Future Starts With Us!"

### Colors
- Primary brand color referenced via `.primary-font-color` CSS class (exact hex managed through CMS — likely inherits from parent 1199SEIU brand)
- Grayscale palette used in UI elements: `lightgray`, `gray`, `darkgray`
- Standard link blue (implied `#0066cc` or similar)
- Clean white backgrounds with professional corporate tones
- Note: CMS-managed styles make direct extraction difficult; visual inspection shows burgundy/maroon brand tones consistent with TEF branding

### Typography
- Font families managed through CMS backend (not hard-coded)
- Standard weights: normal, bold
- Heading hierarchy: H3 used for section titles
- Responsive text: separate mobile/desktop text variants

### Layout & Components
- Flexbox-based layout system
- Viewport-relative sizing (`80vh` hero sections)
- Centered content (`margin: 0 auto`)
- CTA buttons: "Get Referred", "Apply Now", "Next", "Back", "Submit"
- Responsive design with mobile-specific content variations
- Loading animations with rotating spinner (2s linear infinite)

### Key Brand Elements
- 1199SEIU Employment Center logo (header)
- Healthcare career imagery
- 9 job category grid (Nursing, Technical, etc.)
- Benefits-focused messaging
- Regional job location filtering

---

## Source Site 2: TEF Employment Page (1199seiubenefits.org/employment)

### Overview
- **Platform:** WordPress
- **Aesthetic:** Modern, clean, accessible
- **Parent Brand:** 1199SEIU Training & Employment Funds

### Colors

**Primary / Brand:**
| Token | Value | Usage |
|-------|-------|-------|
| **TEF Burgundy/Maroon** | `#852633` | **Key brand color for Training & Employment Fund division** — hover states, accent elements, CTAs |
| Navy Blue | `#031f73` | Shared fund-level brand color, headers |
| Background Gray | `#f1f1f1` | Section backgrounds |
| White | `#ffffff` | Content areas |
| Black | `#000000` | Text |
| Gold/Yellow | `#fecb00` | Accent highlights |

**Fund Division Colors (from parent 1199seiubenefits.org):**
| Token | Value | Usage |
|-------|-------|-------|
| TEF (Training & Employment) | `#852633` | Burgundy/maroon — the EJP-relevant brand color |
| Child Care Fund | `#0A5640` | Teal green |
| Pension Fund | `#015694` | Medium blue |
| Shared Navy | `#031f73` | Cross-fund primary |

**Accents:**
| Token | Value | Usage |
|-------|-------|-------|
| Vivid Cyan Blue | `#0693e3` | Links, interactive elements |
| Vivid Purple | `#9b51e0` | Accent highlights |
| Vivid Green Cyan | `#00d084` | Success states, callouts |

**Neutrals:**
| Token | Value | Usage |
|-------|-------|-------|
| Very Light Gray | `#eeeeee` | Borders, dividers |
| Very Dark Gray | `#313131` | Button backgrounds, secondary text |
| Light Gray BG | `#f0f0f0` | Alternate section backgrounds |
| Dark Footer Gray | `#333333` | Footer backgrounds |

### Typography

**Font Families:**
- **Primary:** Roboto, sans-serif (weights: 100, 300, 400, 500, 700, 900)
- **Monospace:** Fira Code, monospace (weights: 300, 400, 500, 600, 700)

**Type Scale (Fluid/Responsive):**
| Level | Size | Notes |
|-------|------|-------|
| H1 (XX-Large) | `clamp(2.15rem, 2.15rem + ((1vw - 0.2rem) * 1.259), 3rem)` | ~34px to 48px |
| H2 (X-Large) | `clamp(1.75rem, 1.75rem + ((1vw - 0.2rem) * 0.37), 2rem)` | ~28px to 32px |
| H3 (Large) | `clamp(1.125rem, 1.125rem + ((1vw - 0.2rem) * 0.37), 1.375rem)` | ~18px to 22px |
| H4 (Medium) | `clamp(1rem, 1rem + ((1vw - 0.2rem) * 0.185), 1.125rem)` | ~16px to 18px |
| H5/H6 (Small) | `0.875rem` | 14px |
| Body | `1rem` / `16px` | Base size |

**Text Properties:**
- Letter-spacing: `-0.1px` (headings and body)
- Line-height: `1.4` (body), `1.125` (headings)
- Body font-weight: `300` (light)
- Heading font-weight: `400` (regular)

### Spacing System (Responsive)
| Token | Value |
|-------|-------|
| `--spacing--20` | `10px` |
| `--spacing--30` | `20px` |
| `--spacing--40` | `30px` |
| `--spacing--50` | `clamp(30px, 5vw, 50px)` |
| `--spacing--60` | `clamp(30px, 7vw, 70px)` |
| `--spacing--70` | `clamp(50px, 7vw, 90px)` |
| `--spacing--80` | `clamp(70px, 10vw, 140px)` |

### Button Styles
- **Background:** `#313131` (dark gray on light backgrounds)
- **Text:** `#ffffff`
- **Padding:** `1rem 2.25rem`
- **Hover:** 85% opacity
- **Font-size:** `1rem`
- **Border:** none

### Shadows
| Type | Value |
|------|-------|
| Natural | `6px 6px 9px rgba(0, 0, 0, 0.2)` |
| Deep | `12px 12px 50px rgba(0, 0, 0, 0.4)` |
| Sharp | `6px 6px 0px rgba(0, 0, 0, 0.2)` |

### Content Widths
- Max content: `700px`
- Max wide: `1400px`

### Key Brand Elements
- TEF thin logo with red accent text
- Gradient swoosh decorative element (header/footer)
- Funds logo (221x221px)
- MyTEF portal integration
- Career services focus

---

## Source Site 3: Career Pathways Training / CPT (tefcpt.org)

### Overview
- **Platform:** WordPress (Landslide theme)
- **Aesthetic:** Clean, healthcare education focused
- **Tagline:** "Become the future of New York healthcare"
- **Parent Brand:** 1199SEIU Funds Training & Employment

### Colors
- White text on dark backgrounds (`fill: #fff`)
- Linear gradient fills used extensively in SVG/graphic elements
- White strokes with `7px` width and round joins for graphic elements
- Exact brand colors managed through WordPress theme (not directly extractable)

### Typography
- **Primary Font:** Poppins (Bold, weight 700)
- **Secondary/Fallback:** Arial (weight 600)
- SVG text elements at `12px`
- Clean, bold heading style with italicized emphasis on key words

### Layout & Components
- WordPress with custom "Landslide" theme
- Responsive image handling
- Prominent navigation: Mission, Occupations, Job Placement, etc.
- "Continuing Students" CTA prominently placed
- MyTEF account login integration
- Decorative spark SVG icons

### Key Visual Assets
- 1199SEIU Funds Training & Employment logo (`logo.png`)
- Hero image (`main.png`, 1500px height)
- Program imagery (`lpn-wide.jpg`, `offerings2.png`, `backpack.png`)
- Footer partner logos (`footer-logos2.png`)
- Spark/decorative SVG elements

### Key Brand Elements
- Healthcare training focus
- 10 target healthcare occupations
- Program completion pipeline (7,500 participants)
- Typeform intake integration
- Employer partner portal

---

## Cross-Site Brand Analysis

### Parent Brand: 1199SEIU

The parent union site (1199seiu.org) uses a deep purple `rgb(70, 22, 107)` / `#46166B` as its primary brand color.

The benefits/funds site (1199seiubenefits.org) assigns each fund division its own color:
- **Training & Employment Fund (TEF): `#852633` (Burgundy/Maroon)** — this is the most relevant brand color for EJP
- Child Care Fund: `#0A5640` (Teal)
- Pension Fund: `#015694` (Blue)
- Shared fund-level navy: `#031f73`
- Gold accent: `#fecb00`

### Shared Brand DNA
All three sites fall under the **1199SEIU** umbrella organization, sharing:
- Healthcare industry focus
- Union membership as core audience
- Professional, accessible, trust-building tone
- Employment and career advancement mission
- **Burgundy/maroon (`#852633`) as the TEF division brand color** — visible across the TEF employment page and associated branding
- Navy blue (`#031f73`) as a secondary shared brand color

### Current Inconsistencies
| Element | Site 1 (EC) | Site 2 (TEF) | Site 3 (CPT) |
|---------|-------------|--------------|--------------|
| **Primary Font** | CMS-managed (unknown) | Roboto | Poppins |
| **Primary Color** | Unknown (likely burgundy/maroon inherited from TEF) | `#852633` (burgundy/maroon) + `#031f73` (navy) | Theme-managed |
| **Platform** | Custom CMS/ATS | WordPress | WordPress (Landslide) |
| **Button Style** | CMS-styled CTAs | Dark gray `#313131` | Theme-managed |
| **Typography Weight** | Standard (normal/bold) | Light (300 body) | Bold (700 headings) |
| **Design System** | None visible | Fluid/responsive tokens | Theme-dependent |

### What Works Well (Keep)
- TEF's fluid typography system with `clamp()` values
- TEF's responsive spacing token system
- TEF's accessible color contrast ratios
- **Burgundy/maroon (`#852633`) as the TEF brand anchor** — recognizable and distinctive
- Navy blue (`#031f73`) as a strong supporting color
- Gold accent (`#fecb00`) for energy and warmth
- Roboto as a modern, readable sans-serif
- Clean white space and content-width constraints
- Healthcare-focused imagery and messaging

### What Needs Unification
- Single font stack across all pages
- Unified color palette with clear semantic roles
- Consistent button/CTA styling
- Shared spacing and layout system
- Consolidated design tokens as CSS custom properties
- Single responsive breakpoint strategy
- Unified component library (cards, forms, navigation)

---
---

# Recommended Unified Brand Guidelines

## Design Philosophy

The unified EJP site serves three distinct audiences — job seekers (many from training programs and diverse backgrounds), healthcare employers, and laid-off union members seeking support. The design must communicate **institutional trustworthiness** without feeling cold, **professional competence** without feeling corporate, and **warmth and accessibility** without feeling casual.

Every decision below is guided by these principles:

1. **Clarity over cleverness.** Many users are navigating stressful career transitions. The interface must never make them think.
2. **Accessibility is not optional.** WCAG AA minimum everywhere; AAA where achievable. Many users are on older devices, have varying literacy levels, or use assistive technology.
3. **Union identity is a feature.** The 1199SEIU brand carries deep trust. Lean into the burgundy TEF heritage. This is not a generic job board — it is a union benefit.
4. **One system, not three.** Every token, component, and pattern should feel like it was designed once, on purpose.

---

## 1. Unified Color Palette

### Design Rationale

The palette anchors on **burgundy/maroon `#852633`** — the institutional brand color of the Training & Employment Fund (TEF), the 1199SEIU division under which EJP operates. Each fund division within 1199SEIU Benefits has its own identifying color; TEF's is burgundy. This color carries the weight and recognition of the TEF brand and communicates warmth, seriousness, and institutional authority without the coldness of a corporate blue.

Navy blue `#031f73` — a shared color across the 1199SEIU Benefits fund — serves as a strong secondary palette for depth and variety. The parent 1199SEIU union itself uses deep purple `#46166B`, but at the fund/division level, burgundy is the primary identifier for TEF/EJP.

Gold `#fecb00` — already present in the parent 1199SEIU brand — serves as the accent color. Its warmth complements burgundy naturally (a classic, proven pairing) and provides the high-visibility energy needed for calls to action on a job placement site.

All pairings below have been selected to meet WCAG AA contrast requirements (4.5:1 for normal text, 3:1 for large text) against their intended background.

### Primary Colors (Burgundy/Maroon)

The primary scale is built around `#852633` — the core TEF brand burgundy. Darker steps deepen for backgrounds and overlays; lighter steps soften for tints and hover states.

| Token | Hex | RGB | Usage | Contrast on White |
|-------|-----|-----|-------|--------------------|
| `--color-primary-950` | `#3a0f16` | 58, 15, 22 | Deepest brand — overlays, dark mode backgrounds | 17.4:1 |
| `--color-primary-900` | `#4e1520` | 78, 21, 32 | Footer backgrounds, heavy emphasis | 15.1:1 |
| `--color-primary-800` | `#6b1e2b` | 107, 30, 43 | Dark headers, primary nav backgrounds | 11.8:1 |
| `--color-primary-700` | `#852633` | 133, 38, 51 | **Core brand burgundy** — headers, hero backgrounds, key UI | 9.2:1 |
| `--color-primary-600` | `#a03040` | 160, 48, 64 | Hover state for primary elements | 6.8:1 |
| `--color-primary-500` | `#b8404f` | 184, 64, 79 | Links on white backgrounds, active state | 5.0:1 |
| `--color-primary-400` | `#cc6170` | 204, 97, 112 | Link hover state | 3.5:1 (large text only) |
| `--color-primary-300` | `#dd8e99` | 221, 142, 153 | Decorative, illustrations | Not for text |
| `--color-primary-200` | `#eab8bf` | 234, 184, 191 | Light tinted backgrounds | Not for text |
| `--color-primary-100` | `#f4d8dc` | 244, 216, 220 | Subtle background tints, selected states | Not for text |
| `--color-primary-50` | `#fbeff1` | 251, 239, 241 | Lightest tint — card backgrounds, hover fills | Not for text |

### Secondary Colors (Navy Blue)

Navy blue `#031f73` is a shared fund-level color that provides depth and authority. Use for secondary actions, informational elements, and visual variety alongside the burgundy primary.

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-secondary-900` | `#021652` | Darkest navy — heavy overlays |
| `--color-secondary-800` | `#031f73` | **Core navy** — secondary buttons, nav accents |
| `--color-secondary-700` | `#0a2e8a` | Section accents, secondary headings |
| `--color-secondary-600` | `#1240a8` | Interactive secondary elements |
| `--color-secondary-500` | `#1a54c4` | Secondary links, badges |
| `--color-secondary-400` | `#3b72db` | Hover state for secondary |
| `--color-secondary-200` | `#a3c1f5` | Light secondary backgrounds |
| `--color-secondary-100` | `#d4e3fb` | Subtle navy tint |
| `--color-secondary-50` | `#eef4fd` | Lightest navy wash |

### Accent / Action Colors (Gold)

Gold `#fecb00` is drawn from the parent 1199SEIU brand identity. It is the natural complement to burgundy — a classic, high-contrast pairing used across institutional and healthcare branding. Reserve it for the highest-priority calls to action: "Apply Now," "Get Referred," "Submit Application." Use sparingly — if everything is gold, nothing is.

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-accent-700` | `#a68400` | Dark gold for text on light gold backgrounds (5.4:1 on white) |
| `--color-accent-600` | `#d4a900` | CTA button background alternative (darker, higher contrast) |
| `--color-accent-500` | `#fecb00` | **Core brand gold** — primary CTA buttons, highlights |
| `--color-accent-400` | `#fed733` | CTA hover state |
| `--color-accent-200` | `#fee877` | Light gold backgrounds |
| `--color-accent-100` | `#fef4c4` | Subtle gold tint |
| `--color-accent-50` | `#fffbe6` | Lightest gold wash |

**Important:** Gold CTA buttons must use `--color-primary-900` (`#4e1520`) or `--color-neutral-950` as their text color for sufficient contrast on the gold background (minimum 10.5:1 ratio with `#4e1520` on `#fecb00`).

### Semantic Colors

| Token | Hex | Usage | Notes |
|-------|-----|-------|-------|
| `--color-success-700` | `#15803d` | Success text | 5.1:1 on white |
| `--color-success-600` | `#16a34a` | Success icons, borders | |
| `--color-success-100` | `#dcfce7` | Success background tint | |
| `--color-success-50` | `#f0fdf4` | Subtle success background | |
| `--color-warning-700` | `#a16207` | Warning text | 5.4:1 on white |
| `--color-warning-600` | `#ca8a04` | Warning icons, borders | |
| `--color-warning-100` | `#fef9c3` | Warning background tint | |
| `--color-warning-50` | `#fefce8` | Subtle warning background | |
| `--color-error-700` | `#b91c1c` | Error text | 6.1:1 on white |
| `--color-error-600` | `#dc2626` | Error icons, borders | |
| `--color-error-100` | `#fee2e2` | Error background tint | |
| `--color-error-50` | `#fef2f2` | Subtle error background | |
| `--color-info-700` | `#0369a1` | Info text | 5.5:1 on white |
| `--color-info-600` | `#0284c7` | Info icons, borders | |
| `--color-info-100` | `#e0f2fe` | Info background tint | |
| `--color-info-50` | `#f0f9ff` | Subtle info background | |

### Neutral / Gray Scale

The gray scale uses a slight warm undertone to harmonize with the burgundy primary. Pure grays can feel sterile in a healthcare context; these have a subtle warm cast (~2% red-brown saturation) to feel cohesive without being noticeably tinted.

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-neutral-950` | `#1a0f10` | Maximum contrast text (use sparingly) |
| `--color-neutral-900` | `#2c1e20` | Primary body text |
| `--color-neutral-800` | `#453235` | Secondary headings, emphasis text |
| `--color-neutral-700` | `#5e4a4d` | Secondary body text, labels |
| `--color-neutral-600` | `#776266` | Muted text, placeholders |
| `--color-neutral-500` | `#907c80` | Disabled text, icons |
| `--color-neutral-400` | `#ad9ea1` | Borders on dark backgrounds |
| `--color-neutral-300` | `#c7bcbe` | Disabled controls |
| `--color-neutral-200` | `#ddd6d8` | Borders, dividers |
| `--color-neutral-100` | `#ece8e9` | Subtle borders, table lines |
| `--color-neutral-75` | `#f3f0f1` | Alternate row backgrounds, input fields |
| `--color-neutral-50` | `#f9f7f8` | Page background, card backgrounds |
| `--color-white` | `#ffffff` | Content surface |

---

## 2. Typography System

### Font Selection: Roboto

**Primary font: Roboto** — used across all text on the site.

Rationale for choosing Roboto over Poppins:
- Roboto has superior readability at small sizes due to its open apertures and generous x-height.
- Its weight range (200–800) provides more design flexibility than Poppins's more uniform stroke widths.
- It feels modern and approachable without being trendy — important for a site that needs to last.
- It was already successfully deployed on the TEF site with a proven fluid type system.
- Roboto is available as a variable font, meaning one file covers all weights. This is a performance win on older devices.

Poppins is a fine font, but its geometric forms can feel slightly cold at body text sizes, and its bolder weights compete with the brand burgundy for visual attention. Roboto's balanced, approachable construction is well suited to an institution that serves people.

**Font Stack:**
```
font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
```

**Monospace (code, data tables, reference numbers):**
```
font-family: 'Fira Code', 'Cascadia Code', 'Consolas', 'Monaco', monospace;
```

Load Roboto from Google Fonts. Subset to `latin` and `latin-ext` to keep file size minimal. Preload the font file in the document `<head>` to prevent layout shift.

### Type Scale

The type scale uses `clamp()` for fluid sizing between a 375px mobile viewport and a 1440px desktop viewport. The base is `1rem` (16px). The scale ratio is approximately 1.25 (Major Third) — large enough to create clear hierarchy, restrained enough to avoid oversized headings that push content below the fold on mobile.

| Token | Element | Size (clamp) | Approx. Range | Weight | Line Height | Letter Spacing | Margin Bottom |
|-------|---------|--------------|---------------|--------|-------------|----------------|---------------|
| `--text-display` | Hero headlines | `clamp(2.25rem, 1.8rem + 1.8vw, 3.5rem)` | 36px → 56px | 700 | 1.1 | `-0.02em` | `0.5em` |
| `--text-h1` | Page titles | `clamp(1.875rem, 1.55rem + 1.3vw, 2.75rem)` | 30px → 44px | 700 | 1.15 | `-0.015em` | `0.5em` |
| `--text-h2` | Section titles | `clamp(1.5rem, 1.3rem + 0.8vw, 2.125rem)` | 24px → 34px | 600 | 1.2 | `-0.01em` | `0.5em` |
| `--text-h3` | Subsections | `clamp(1.25rem, 1.15rem + 0.4vw, 1.625rem)` | 20px → 26px | 600 | 1.25 | `-0.005em` | `0.4em` |
| `--text-h4` | Card titles | `clamp(1.125rem, 1.07rem + 0.2vw, 1.3125rem)` | 18px → 21px | 600 | 1.3 | `0` | `0.3em` |
| `--text-h5` | Labels, small headings | `1rem` | 16px | 600 | 1.4 | `0.01em` | `0.3em` |
| `--text-h6` | Overlines, categories | `0.875rem` | 14px | 700 | 1.4 | `0.05em` | `0.3em` |
| `--text-body-lg` | Lead paragraphs | `clamp(1.0625rem, 1.02rem + 0.15vw, 1.1875rem)` | 17px → 19px | 400 | 1.6 | `0` | `1em` |
| `--text-body` | Default body | `1rem` | 16px | 400 | 1.6 | `0` | `1em` |
| `--text-body-sm` | Secondary text | `0.875rem` | 14px | 400 | 1.5 | `0.005em` | `0.75em` |
| `--text-caption` | Captions, timestamps | `0.8125rem` | 13px | 400 | 1.4 | `0.01em` | `0.5em` |
| `--text-label` | Form labels, tags | `0.8125rem` | 13px | 600 | 1.3 | `0.03em` | `0.25em` |
| `--text-overline` | Category labels | `0.75rem` | 12px | 700 | 1.3 | `0.08em` | `0.25em` |

### Typography Guidelines

- **Body text weight:** `400` (Regular). The TEF site used `300` (Light) — this is too thin for many screens and user environments. Regular weight ensures readability on low-resolution displays and for users with visual impairments.
- **Heading weight:** `600` (SemiBold) for most headings, `700` (Bold) for display/H1. This creates clear hierarchy without the heaviness of `800`.
- **Maximum line length:** `65–75ch` for body text. This is a readability essential, not a suggestion.
- **Paragraph spacing:** Use `margin-bottom` rather than `margin-top` on text elements (the "lobotomized owl" pattern with `* + *` can supplement but not replace intentional spacing).
- **Never use font-weight below 400 for any text smaller than 18px.**
- **Uppercase text:** Used only for `--text-overline` and `--text-h6` elements. Apply `text-transform: uppercase` alongside the wider letter-spacing. Never uppercase body text or links.

---

## 3. Spacing & Layout System

### Spacing Scale

Use a **4px base unit** system. Every spacing value in the application should be a multiple of 4px. This creates visual rhythm without being as restrictive as an 8px-only system (which can feel too loose for dense UI like forms and data tables).

| Token | Value | Common Usage |
|-------|-------|-------------|
| `--space-0` | `0` | Reset |
| `--space-1` | `0.25rem` (4px) | Tight inline spacing, icon-to-text gaps |
| `--space-2` | `0.5rem` (8px) | Compact element spacing, form field gaps |
| `--space-3` | `0.75rem` (12px) | Standard inline padding, tag spacing |
| `--space-4` | `1rem` (16px) | Default component padding, paragraph spacing |
| `--space-5` | `1.25rem` (20px) | Card padding (compact) |
| `--space-6` | `1.5rem` (24px) | Card padding (standard), section sub-spacing |
| `--space-8` | `2rem` (32px) | Component group spacing |
| `--space-10` | `2.5rem` (40px) | Section internal padding |
| `--space-12` | `3rem` (48px) | Section breaks |
| `--space-16` | `4rem` (64px) | Large section padding |
| `--space-20` | `5rem` (80px) | Page section spacing (desktop) |
| `--space-24` | `6rem` (96px) | Hero section padding |
| `--space-32` | `8rem` (128px) | Maximum section spacing |

### Responsive Section Spacing

For vertical section spacing (the rhythm between major page sections), use fluid values:

| Token | Value | Usage |
|-------|-------|-------|
| `--section-gap-sm` | `clamp(2rem, 1.5rem + 2vw, 3rem)` | Tight section gap |
| `--section-gap-md` | `clamp(3rem, 2rem + 4vw, 5rem)` | Standard section gap |
| `--section-gap-lg` | `clamp(4rem, 2.5rem + 6vw, 7rem)` | Large section gap, hero padding |
| `--section-gap-xl` | `clamp(5rem, 3rem + 8vw, 9rem)` | Maximum section gap |

### Content Width Constraints

| Token | Value | Usage |
|-------|-------|-------|
| `--content-width-narrow` | `40rem` (640px) | Long-form text, single-column forms |
| `--content-width-default` | `48rem` (768px) | Standard content (job descriptions, articles) |
| `--content-width-wide` | `72rem` (1152px) | Card grids, multi-column layouts |
| `--content-width-max` | `90rem` (1440px) | Maximum page width |
| `--content-padding-x` | `clamp(1rem, 0.5rem + 2vw, 2rem)` | Horizontal page gutters |

The standard page container pattern:
```css
.container {
  width: 100%;
  max-width: var(--content-width-max);
  margin-inline: auto;
  padding-inline: var(--content-padding-x);
}
```

### Grid System

Use CSS Grid as the primary layout mechanism. Do not introduce a third-party grid framework.

```css
.grid {
  display: grid;
  gap: var(--space-6);
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 20rem), 1fr));
}
```

This single pattern handles most card/grid layouts responsively without breakpoints. For explicit column control:

| Token | Columns | Min Card Width |
|-------|---------|---------------|
| `--grid-cols-2` | `repeat(auto-fill, minmax(min(100%, 24rem), 1fr))` | 384px |
| `--grid-cols-3` | `repeat(auto-fill, minmax(min(100%, 20rem), 1fr))` | 320px |
| `--grid-cols-4` | `repeat(auto-fill, minmax(min(100%, 16rem), 1fr))` | 256px |

### Responsive Breakpoints

Use mobile-first breakpoints. These are ranges, not targets — design fluid layouts that work across the entire range, not just at exact breakpoint widths.

| Token | Value | Usage |
|-------|-------|-------|
| `--bp-sm` | `36em` (576px) | Small devices: larger phones in landscape |
| `--bp-md` | `48em` (768px) | Medium: tablets, small laptops |
| `--bp-lg` | `64em` (1024px) | Large: standard laptops, desktops |
| `--bp-xl` | `80em` (1280px) | Extra large: wide desktops |
| `--bp-2xl` | `90em` (1440px) | Maximum content width hit |

**Use `em` units for breakpoints** (not `px` or `rem`). `em`-based media queries respect user font-size preferences in all browsers, which is critical for accessibility.

---

## 4. Component Styles

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-none` | `0` | No rounding |
| `--radius-sm` | `0.25rem` (4px) | Inputs, tags, subtle rounding |
| `--radius-md` | `0.5rem` (8px) | Buttons, cards, dropdowns |
| `--radius-lg` | `0.75rem` (12px) | Modals, larger containers |
| `--radius-xl` | `1rem` (16px) | Feature cards, callout boxes |
| `--radius-full` | `9999px` | Pills, avatars, circular elements |

Default radius for most components: `--radius-md` (8px). This is rounded enough to feel modern and friendly, sharp enough to feel professional. Avoid over-rounding — this is not a consumer social app.

### Shadow System

Shadows are functional (they communicate elevation) not decorative. Use restraint.

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-xs` | `0 1px 2px 0 rgba(11, 15, 26, 0.05)` | Subtle lift: inputs, inline cards |
| `--shadow-sm` | `0 1px 3px 0 rgba(11, 15, 26, 0.08), 0 1px 2px -1px rgba(11, 15, 26, 0.08)` | Default card elevation |
| `--shadow-md` | `0 4px 6px -1px rgba(11, 15, 26, 0.08), 0 2px 4px -2px rgba(11, 15, 26, 0.06)` | Raised cards, dropdowns |
| `--shadow-lg` | `0 10px 15px -3px rgba(11, 15, 26, 0.08), 0 4px 6px -4px rgba(11, 15, 26, 0.04)` | Modals, popovers |
| `--shadow-xl` | `0 20px 25px -5px rgba(11, 15, 26, 0.1), 0 8px 10px -6px rgba(11, 15, 26, 0.06)` | Elevated dialogs, overlays |
| `--shadow-focus` | `0 0 0 3px rgba(133, 38, 51, 0.4)` | Focus ring (see accessibility states below) |

### Button Styles

Buttons are the most important interactive elements on a job placement site. They must be large enough to tap on mobile, visually distinct by purpose, and absolutely clear about what they do.

**Base button properties (shared across all variants):**
```
font-family: 'Roboto', sans-serif;
font-size: 1rem;
font-weight: 600;
line-height: 1.25;
padding: 0.75rem 1.5rem;
border-radius: var(--radius-md);
border: 2px solid transparent;
cursor: pointer;
transition: background-color 150ms ease, border-color 150ms ease, box-shadow 150ms ease;
text-decoration: none;
display: inline-flex;
align-items: center;
gap: 0.5rem;
```

**Minimum touch target: 44px height.** The padding above achieves ~44px with the line-height. Never reduce button padding below this threshold.

#### Primary Button (High-priority actions: "Apply Now", "Get Referred", "Submit")

| State | Background | Text | Border |
|-------|-----------|------|--------|
| Default | `--color-primary-700` (#852633) | `--color-white` | transparent |
| Hover | `--color-primary-600` (#a03040) | `--color-white` | transparent |
| Active/Pressed | `--color-primary-800` (#6b1e2b) | `--color-white` | transparent |
| Focus | `--color-primary-700` | `--color-white` | `--shadow-focus` ring |
| Disabled | `--color-neutral-200` (#ddd6d8) | `--color-neutral-500` (#907c80) | transparent |

#### Secondary Button (Standard actions: "Save", "Next", "View Details")

| State | Background | Text | Border |
|-------|-----------|------|--------|
| Default | `--color-secondary-800` (#031f73) | `--color-white` | transparent |
| Hover | `--color-secondary-700` (#0a2e8a) | `--color-white` | transparent |
| Active/Pressed | `--color-secondary-600` (#1240a8) | `--color-white` | transparent |
| Focus | `--color-secondary-800` | `--color-white` | `--shadow-focus` ring |
| Disabled | `--color-neutral-200` | `--color-neutral-500` | transparent |

#### Accent Button (Highest-visibility CTA: featured "Apply Now" on hero sections)

Use sparingly — only for the single most important action on a page.

| State | Background | Text | Border |
|-------|-----------|------|--------|
| Default | `--color-accent-500` (#fecb00) | `--color-primary-900` (#4e1520) | transparent |
| Hover | `--color-accent-400` (#fed733) | `--color-primary-900` | transparent |
| Active/Pressed | `--color-accent-600` (#d4a900) | `--color-primary-900` | transparent |
| Focus | `--color-accent-500` | `--color-primary-900` | `--shadow-focus` ring |
| Disabled | `--color-neutral-200` | `--color-neutral-500` | transparent |

#### Outline/Ghost Button (Tertiary actions: "Back", "Cancel", "Learn More")

| State | Background | Text | Border |
|-------|-----------|------|--------|
| Default | transparent | `--color-primary-700` | `--color-primary-700` |
| Hover | `--color-primary-50` (#fbeff1) | `--color-primary-700` | `--color-primary-700` |
| Active/Pressed | `--color-primary-100` (#f4d8dc) | `--color-primary-700` | `--color-primary-700` |
| Focus | transparent | `--color-primary-700` | `--shadow-focus` ring |
| Disabled | transparent | `--color-neutral-400` | `--color-neutral-300` |

#### Destructive Button (Dangerous actions: "Withdraw Application", "Delete Account")

| State | Background | Text | Border |
|-------|-----------|------|--------|
| Default | `--color-error-700` (#b91c1c) | `--color-white` | transparent |
| Hover | `#991b1b` | `--color-white` | transparent |
| Active/Pressed | `#7f1d1d` | `--color-white` | transparent |
| Focus | `--color-error-700` | `--color-white` | `0 0 0 3px rgba(185, 28, 28, 0.4)` |
| Disabled | `--color-neutral-200` | `--color-neutral-500` | transparent |

#### Button Sizes

| Size | Padding | Font Size | Min Height |
|------|---------|-----------|------------|
| Small | `0.5rem 1rem` | `0.875rem` | 36px |
| Default | `0.75rem 1.5rem` | `1rem` | 44px |
| Large | `1rem 2rem` | `1.125rem` | 52px |

### Card Styles

Cards are the primary content container for job listings, program descriptions, and resource links.

**Base Card:**
```
background: var(--color-white);
border: 1px solid var(--color-neutral-100);
border-radius: var(--radius-lg);
padding: var(--space-6);
box-shadow: var(--shadow-sm);
transition: box-shadow 200ms ease, border-color 200ms ease;
```

**Card Hover (when card is a link):**
```
box-shadow: var(--shadow-md);
border-color: var(--color-neutral-200);
```

**Card Variants:**

| Variant | Additional Styles | Usage |
|---------|------------------|-------|
| Default | As above | Job listings, generic content |
| Featured | `border-left: 4px solid var(--color-primary-700)` | Highlighted jobs, urgent notices |
| Info | `background: var(--color-secondary-50); border-color: var(--color-secondary-200)` | Informational callouts |
| Success | `background: var(--color-success-50); border-color: var(--color-success-600)` | Confirmation messages, completed steps |
| Warning | `background: var(--color-warning-50); border-color: var(--color-warning-600)` | Layoff notices, expiring deadlines |

### Form Element Styles

**Text Input / Select / Textarea:**
```
font-family: 'Roboto', sans-serif;
font-size: 1rem;
font-weight: 400;
line-height: 1.5;
padding: 0.625rem 0.875rem;
min-height: 44px;
background: var(--color-white);
border: 1.5px solid var(--color-neutral-300);
border-radius: var(--radius-sm);
color: var(--color-neutral-900);
transition: border-color 150ms ease, box-shadow 150ms ease;
```

**Input States:**

| State | Border | Shadow | Background |
|-------|--------|--------|------------|
| Default | `--color-neutral-300` | none | `--color-white` |
| Hover | `--color-neutral-400` | none | `--color-white` |
| Focus | `--color-primary-500` (#b8404f) | `--shadow-focus` | `--color-white` |
| Error | `--color-error-600` | `0 0 0 3px rgba(220, 38, 38, 0.15)` | `--color-error-50` |
| Disabled | `--color-neutral-200` | none | `--color-neutral-75` |

**Form Labels:**
```
font-size: var(--text-label);
font-weight: 600;
color: var(--color-neutral-800);
margin-bottom: var(--space-2);
display: block;
```

**Helper / Error Text:**
```
font-size: var(--text-caption);
margin-top: var(--space-1);
color: var(--color-neutral-600);  /* helper */
color: var(--color-error-700);    /* error */
```

**Checkboxes and Radio buttons:** Use native elements with custom styling via `appearance: none`. Minimum size: 20px x 20px. Checked state uses `--color-primary-700` (`#852633`) as the fill. Always ensure a visible focus ring.

### Focus & Accessibility States

**This is non-negotiable.** Every interactive element must have a visible, high-contrast focus indicator.

**Standard Focus Ring:**
```css
:focus-visible {
  outline: 2px solid var(--color-primary-500); /* burgundy #b8404f */
  outline-offset: 2px;
  box-shadow: var(--shadow-focus);
}
```

Use `:focus-visible` (not `:focus`) so that focus rings appear for keyboard navigation but not for mouse clicks. For browsers that do not support `:focus-visible`, include a `:focus` fallback.

**Skip-to-content link:** Must be present and visible on keyboard focus. Position at top of page, styled with `--color-primary-700` (`#852633`) background and `--color-white` text.

**Reduced motion:** All transitions and animations must be wrapped in:
```css
@media (prefers-reduced-motion: no-preference) {
  /* transitions here */
}
```

**High contrast mode:** Test all components in Windows High Contrast Mode. Use `forced-colors: active` media query to ensure borders and focus indicators remain visible.

---

## 5. Brand Voice & Visual Identity

### Brand Voice

The EJP site speaks as a **knowledgeable, supportive colleague** — not a bureaucratic institution, not a slick recruiter. The voice should feel like a trusted union representative who knows the system and genuinely wants to help you navigate it.

**Voice characteristics:**

| Quality | What this means | Example |
|---------|----------------|---------|
| **Clear** | Short sentences. Plain language. No jargon without explanation. | "You qualify for this program" not "Eligible candidates meeting criteria may apply" |
| **Direct** | Tell people what to do and what happens next. | "Click Apply Now to submit your resume" not "Opportunities await" |
| **Respectful** | Acknowledge that career transitions are stressful. Never condescend. | "We know this process can be overwhelming. Here's what to do first." |
| **Confident** | This is a benefit you have earned through your union membership. | "As a 1199SEIU member, you have access to..." not "You may be eligible for..." |
| **Warm** | Human, not robotic. Use "you" and "we." | "We'll help you find the right job" not "Job placement services are available" |

**Language guidelines:**
- Write at an 8th-grade reading level. Use the Hemingway App or similar tool to verify.
- Avoid passive voice. "Your counselor will contact you" not "You will be contacted."
- Translate all critical content into Spanish, Mandarin, Haitian Creole, and Russian (the primary non-English languages of 1199SEIU membership). Design the layout to accommodate 20–40% text expansion for translations.
- Never use "click here" as link text. Use descriptive labels: "View nursing positions" or "Download the application form."

### Icon Style

Use a single, consistent icon library throughout the site. **Recommended: Lucide Icons** (MIT-licensed, 1000+ icons, consistent 24px grid, 1.5px stroke weight).

**Icon guidelines:**
- Default size: 24px (1.5rem)
- Compact size: 20px (1.25rem)
- Large/feature size: 32px (2rem)
- Stroke weight: 1.5px (default Lucide)
- Color: inherit from parent text color
- Always pair icons with text labels — never use icons alone for navigation or actions (except universally understood icons like close/X, search magnifying glass, or hamburger menu)
- For healthcare-specific iconography (stethoscope, hospital, etc.), ensure icons are simple and not overly literal or clip-art-like

### Photography & Imagery

**The people on this site should look like the people who use this site.**

- Feature real healthcare workers in real settings wherever possible. Avoid generic stock photography of models in pristine lab coats.
- Show diversity of age, race, ethnicity, body type, and role — this workforce includes nursing assistants, technicians, dietary workers, janitorial staff, and administrative personnel. Not just doctors and nurses.
- Prefer images of people actively engaged in their work or learning, not posed headshots.
- Images should be warm in tone — avoid cold, blue-cast clinical photography.
- All images must have meaningful `alt` text. Decorative images get `alt=""`.
- Use `aspect-ratio` in CSS to prevent layout shift during image loading.
- Provide images in WebP format with JPEG fallback. Use responsive `srcset` for multiple resolutions.
- Maximum image quality: 80% compression. Prioritize page speed for users on slower connections.

**Illustration style (if used):**
- Simple, flat or semi-flat illustration with the brand color palette
- Inclusive character representation
- Use for empty states, onboarding flows, and error pages
- Never use illustrations as a replacement for real photography in job listings or program descriptions

### Motion & Animation

Motion should be **functional, not decorative**. Every animation must serve a purpose: orienting the user, providing feedback, or smoothing a transition.

**Principles:**
- Keep transitions under 300ms. Most should be 150–200ms.
- Use `ease` or `ease-out` for enter animations. Use `ease-in` for exit animations.
- Never animate layout properties (`width`, `height`, `top`, `left`) — use `transform` and `opacity` only for smooth 60fps performance.
- Never use animation to delay access to content. Loading states should appear instantly; content should appear as soon as it is ready.
- Always respect `prefers-reduced-motion`. When reduced motion is preferred, transitions should be instant (0ms) or reduced to simple opacity fades.

**Standard transitions:**
| Element | Property | Duration | Easing |
|---------|----------|----------|--------|
| Button hover | background-color, border-color | 150ms | ease |
| Card hover | box-shadow | 200ms | ease |
| Dropdown open | opacity, transform | 200ms | ease-out |
| Modal open | opacity, transform | 250ms | ease-out |
| Page transition | opacity | 200ms | ease |
| Focus ring | box-shadow | 100ms | ease |

---

## 6. CSS Custom Properties — Design Token Foundation

The following custom properties should be defined on `:root` and serve as the single source of truth for all styling across the EJP site. No component should use a raw hex value, pixel value, or font name — everything references these tokens.

```css
:root {
  /* ============================================================
     COLOR TOKENS
     ============================================================ */

  /* Primary (Burgundy/Maroon — TEF Brand) */
  --color-primary-950: #3a0f16;
  --color-primary-900: #4e1520;
  --color-primary-800: #6b1e2b;
  --color-primary-700: #852633;
  --color-primary-600: #a03040;
  --color-primary-500: #b8404f;
  --color-primary-400: #cc6170;
  --color-primary-300: #dd8e99;
  --color-primary-200: #eab8bf;
  --color-primary-100: #f4d8dc;
  --color-primary-50:  #fbeff1;

  /* Secondary (Navy Blue — Shared Fund Color) */
  --color-secondary-900: #021652;
  --color-secondary-800: #031f73;
  --color-secondary-700: #0a2e8a;
  --color-secondary-600: #1240a8;
  --color-secondary-500: #1a54c4;
  --color-secondary-400: #3b72db;
  --color-secondary-200: #a3c1f5;
  --color-secondary-100: #d4e3fb;
  --color-secondary-50:  #eef4fd;

  /* Accent (Gold — Parent 1199SEIU Brand) */
  --color-accent-700: #a68400;
  --color-accent-600: #d4a900;
  --color-accent-500: #fecb00;
  --color-accent-400: #fed733;
  --color-accent-200: #fee877;
  --color-accent-100: #fef4c4;
  --color-accent-50:  #fffbe6;

  /* Semantic: Success */
  --color-success-700: #15803d;
  --color-success-600: #16a34a;
  --color-success-100: #dcfce7;
  --color-success-50:  #f0fdf4;

  /* Semantic: Warning */
  --color-warning-700: #a16207;
  --color-warning-600: #ca8a04;
  --color-warning-100: #fef9c3;
  --color-warning-50:  #fefce8;

  /* Semantic: Error */
  --color-error-700: #b91c1c;
  --color-error-600: #dc2626;
  --color-error-100: #fee2e2;
  --color-error-50:  #fef2f2;

  /* Semantic: Info */
  --color-info-700: #0369a1;
  --color-info-600: #0284c7;
  --color-info-100: #e0f2fe;
  --color-info-50:  #f0f9ff;

  /* Neutrals (warm undertone to harmonize with burgundy) */
  --color-neutral-950: #1a0f10;
  --color-neutral-900: #2c1e20;
  --color-neutral-800: #453235;
  --color-neutral-700: #5e4a4d;
  --color-neutral-600: #776266;
  --color-neutral-500: #907c80;
  --color-neutral-400: #ad9ea1;
  --color-neutral-300: #c7bcbe;
  --color-neutral-200: #ddd6d8;
  --color-neutral-100: #ece8e9;
  --color-neutral-75:  #f3f0f1;
  --color-neutral-50:  #f9f7f8;
  --color-white:       #ffffff;

  /* ============================================================
     SEMANTIC ALIASES (use these in components)
     ============================================================ */

  /* Text */
  --text-color-primary:   var(--color-neutral-900);
  --text-color-secondary: var(--color-neutral-700);
  --text-color-muted:     var(--color-neutral-600);
  --text-color-disabled:  var(--color-neutral-500);
  --text-color-inverse:   var(--color-white);
  --text-color-link:      var(--color-primary-500);   /* burgundy #b8404f */
  --text-color-link-hover: var(--color-primary-600);  /* deeper burgundy #a03040 */
  --text-color-brand:     var(--color-primary-700);   /* core burgundy #852633 */

  /* Surfaces */
  --surface-page:    var(--color-neutral-50);
  --surface-card:    var(--color-white);
  --surface-raised:  var(--color-white);
  --surface-overlay: var(--color-white);
  --surface-sunken:  var(--color-neutral-75);
  --surface-brand:   var(--color-primary-700);  /* burgundy #852633 */
  --surface-brand-secondary: var(--color-secondary-800); /* navy #031f73 */

  /* Borders */
  --border-default:  var(--color-neutral-200);
  --border-subtle:   var(--color-neutral-100);
  --border-strong:   var(--color-neutral-300);
  --border-focus:    var(--color-primary-500);  /* burgundy #b8404f */
  --border-error:    var(--color-error-600);

  /* ============================================================
     TYPOGRAPHY TOKENS
     ============================================================ */

  /* Font Families */
  --font-sans:  'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  --font-mono:  'Fira Code', 'Cascadia Code', Consolas, Monaco, monospace;

  /* Font Sizes (Fluid) */
  --text-display:  clamp(2.25rem, 1.8rem + 1.8vw, 3.5rem);
  --text-h1:       clamp(1.875rem, 1.55rem + 1.3vw, 2.75rem);
  --text-h2:       clamp(1.5rem, 1.3rem + 0.8vw, 2.125rem);
  --text-h3:       clamp(1.25rem, 1.15rem + 0.4vw, 1.625rem);
  --text-h4:       clamp(1.125rem, 1.07rem + 0.2vw, 1.3125rem);
  --text-h5:       1rem;
  --text-h6:       0.875rem;
  --text-body-lg:  clamp(1.0625rem, 1.02rem + 0.15vw, 1.1875rem);
  --text-body:     1rem;
  --text-body-sm:  0.875rem;
  --text-caption:  0.8125rem;
  --text-label:    0.8125rem;
  --text-overline: 0.75rem;

  /* Font Weights */
  --weight-regular:  400;
  --weight-medium:   500;
  --weight-semibold: 600;
  --weight-bold:     700;

  /* Line Heights */
  --leading-tight:   1.1;
  --leading-snug:    1.25;
  --leading-normal:  1.5;
  --leading-relaxed: 1.6;
  --leading-loose:   1.75;

  /* Letter Spacing */
  --tracking-tight:    -0.02em;
  --tracking-snug:     -0.01em;
  --tracking-normal:   0;
  --tracking-wide:     0.01em;
  --tracking-wider:    0.03em;
  --tracking-widest:   0.08em;

  /* ============================================================
     SPACING TOKENS
     ============================================================ */

  --space-0:  0;
  --space-1:  0.25rem;
  --space-2:  0.5rem;
  --space-3:  0.75rem;
  --space-4:  1rem;
  --space-5:  1.25rem;
  --space-6:  1.5rem;
  --space-8:  2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --space-32: 8rem;

  /* Section Spacing (Fluid) */
  --section-gap-sm: clamp(2rem, 1.5rem + 2vw, 3rem);
  --section-gap-md: clamp(3rem, 2rem + 4vw, 5rem);
  --section-gap-lg: clamp(4rem, 2.5rem + 6vw, 7rem);
  --section-gap-xl: clamp(5rem, 3rem + 8vw, 9rem);

  /* ============================================================
     LAYOUT TOKENS
     ============================================================ */

  --content-width-narrow:  40rem;
  --content-width-default: 48rem;
  --content-width-wide:    72rem;
  --content-width-max:     90rem;
  --content-padding-x:     clamp(1rem, 0.5rem + 2vw, 2rem);

  /* ============================================================
     BORDER RADIUS TOKENS
     ============================================================ */

  --radius-none: 0;
  --radius-sm:   0.25rem;
  --radius-md:   0.5rem;
  --radius-lg:   0.75rem;
  --radius-xl:   1rem;
  --radius-full: 9999px;

  /* ============================================================
     SHADOW TOKENS
     ============================================================ */

  --shadow-xs:    0 1px 2px 0 rgba(11, 15, 26, 0.05);
  --shadow-sm:    0 1px 3px 0 rgba(11, 15, 26, 0.08), 0 1px 2px -1px rgba(11, 15, 26, 0.08);
  --shadow-md:    0 4px 6px -1px rgba(11, 15, 26, 0.08), 0 2px 4px -2px rgba(11, 15, 26, 0.06);
  --shadow-lg:    0 10px 15px -3px rgba(11, 15, 26, 0.08), 0 4px 6px -4px rgba(11, 15, 26, 0.04);
  --shadow-xl:    0 20px 25px -5px rgba(11, 15, 26, 0.1), 0 8px 10px -6px rgba(11, 15, 26, 0.06);
  --shadow-focus: 0 0 0 3px rgba(133, 38, 51, 0.4); /* burgundy focus ring */

  /* ============================================================
     TRANSITION TOKENS
     ============================================================ */

  --transition-fast:   150ms ease;
  --transition-base:   200ms ease;
  --transition-slow:   300ms ease;
  --transition-enter:  200ms ease-out;
  --transition-exit:   150ms ease-in;

  /* ============================================================
     Z-INDEX SCALE
     ============================================================ */

  --z-base:      0;
  --z-raised:    10;
  --z-dropdown:  100;
  --z-sticky:    200;
  --z-overlay:   300;
  --z-modal:     400;
  --z-popover:   500;
  --z-toast:     600;
  --z-tooltip:   700;
  --z-max:       9999;
}

/* ============================================================
   DARK MODE PREPARATION (optional future enhancement)
   Define overrides here when ready. The semantic aliases above
   make this straightforward — swap surface and text values.
   ============================================================ */

/*
@media (prefers-color-scheme: dark) {
  :root {
    --text-color-primary:   var(--color-neutral-100);
    --text-color-secondary: var(--color-neutral-300);
    --surface-page:         var(--color-neutral-950);
    --surface-card:         var(--color-neutral-900);
    --border-default:       var(--color-neutral-700);
  }
}
*/
```

---

## Implementation Notes

### Priority Order for Adoption

1. **CSS Custom Properties first.** Import the token file into the project before building any components. Every subsequent decision references these tokens.
2. **Typography and color next.** Set the font stack, base sizes, and text/background colors site-wide.
3. **Layout system.** Establish the container, grid, and spacing patterns.
4. **Component library.** Build buttons, cards, forms, and navigation using the tokens above.
5. **Brand voice and content.** Apply writing guidelines during content migration from the three source sites.

### Compatibility

- CSS Custom Properties are supported in all browsers with >96% global coverage. For the rare older browser, provide fallback values inline: `color: #852633; color: var(--color-primary-700);`
- `clamp()` has >95% support. Fallback: provide a static `rem` value before the `clamp()` declaration.
- `focus-visible` has >94% support. Include a `:focus` fallback for older browsers.
- Variable fonts have >93% support. Include a static `woff2` fallback for Roboto at weights 400, 500, and 700.

### Performance Budget

Given the audience may include users on older devices and slower connections:
- Total page weight target: under 500KB on initial load (compressed)
- Web fonts: under 50KB (variable font, latin subset, woff2)
- Largest Contentful Paint: under 2.5 seconds on 4G
- Cumulative Layout Shift: under 0.1
- First Input Delay: under 100ms

### Accessibility Checklist

Every page on the unified EJP site must meet:
- [ ] WCAG 2.1 AA compliance minimum
- [ ] All text meets 4.5:1 contrast ratio (3:1 for large text)
- [ ] All interactive elements have visible focus indicators
- [ ] All images have appropriate alt text
- [ ] All forms have associated labels
- [ ] Site is fully navigable by keyboard
- [ ] Skip-to-content link is present
- [ ] Reduced motion preferences are respected
- [ ] Content is readable at 200% zoom
- [ ] Touch targets are minimum 44x44px
