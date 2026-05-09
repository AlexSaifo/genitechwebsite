# GeniTech Website

Corporate marketing website for **GeniTech** — a bilingual (Arabic / English) technology company. Built with Next.js 16, fully statically generated (SSG), and optimised for SEO.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2 (App Router, Turbopack) |
| i18n | next-intl 4 — `ar` (default) + `en` |
| Styling | Tailwind CSS v4 |
| Fonts | Cairo (Arabic/Latin), Geist Sans, Geist Mono |
| Language | TypeScript 5 (strict) |
| Rendering | Full SSG — both locales pre-rendered at build time |

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                  # Root layout (minimal passthrough — fonts + globals)
│   ├── globals.css                 # Global styles, CSS animations, site-header classes
│   ├── sitemap.ts                  # Auto-generated /sitemap.xml (both locales)
│   ├── robots.ts                   # Auto-generated /robots.txt
│   ├── manifest.ts                 # PWA web manifest
│   └── [locale]/
│       ├── layout.tsx              # Locale shell: <html lang dir>, generateMetadata, JSON-LD, SSG
│       └── page.tsx                # Home page — all sections composed here
│
├── components/
│   ├── global-header.tsx           # Fixed nav bar with locale switcher
│   ├── global-footer.tsx           # Footer with links, socials, contact
│   ├── hero-section.tsx            # Landing hero with animated cards and CTAs
│   ├── statistics-section.tsx      # Key metrics / stat counters
│   ├── services-section.tsx        # Service offering cards (Branding, Web, Mobile)
│   ├── stacked-carousel-section.tsx# Work showcase carousel
│   ├── team-members-section.tsx    # Flip-card team grid
│   ├── team-showcase-section.tsx   # Full-width team photo + description
│   ├── testimonials-section.tsx    # Client testimonials
│   ├── partners-section.tsx        # Partner logos
│   └── blog-section.tsx            # Blog post preview cards with hover animation
│
├── lib/
│   └── site-config.ts              # ⭐ Single source of truth for all SEO data (see below)
│
└── i18n/
    └── request.ts                  # next-intl server config

messages/
├── ar.json                         # Arabic translations (all sections + navigation + footer)
└── en.json                         # English translations
```

---

## Pages & Sections

The home page (`/ar` and `/en`) is composed of these sections in order:

1. **Hero** — headline, sub-headline, CTA buttons, animated phone cards
2. **Statistics** — key numbers (downloads, rating, support, retention, experience, clients)
3. **Services** — Branding & UI/UX, Web Development, Mobile App Development
4. **Work Showcase** — stacked carousel of previous projects
5. **Team Members** — flip-card grid of team profiles
6. **Team Showcase** — full-width photo + description + contact CTA
7. **Testimonials** — three client review cards
8. **Partners** — partner logo grid (56+ partners)
9. **Blog** — three blog post preview cards

---

## Localisation

- Locales: `ar` (Arabic, default) and `en` (English)
- Routing: `/ar/...` and `/en/...` via `next-intl` middleware
- All UI strings live in `messages/ar.json` and `messages/en.json`
- RTL/LTR: `<html dir="rtl">` for Arabic, `<html dir="ltr">` for English — set automatically from the locale
- Footer column order reverses per locale (brand left in EN, brand right in AR)

---

## SEO & SSG

### Static Generation

Both `/ar` and `/en` are pre-rendered at build time using `generateStaticParams`. `setRequestLocale` is called in both the layout and page to prevent next-intl from falling back to request-time `headers()` reads.

### Metadata

All metadata is generated from **`src/lib/site-config.ts`** via Next.js's `generateMetadata` API. Each page includes:

- Per-locale `title` (with template `%s | GeniTech`) and `description`
- `keywords` array
- `<link rel="canonical">` for the current locale URL
- `<link rel="alternate" hreflang="en|ar|x-default">` for cross-locale discovery
- Open Graph tags: `og:title`, `og:description`, `og:locale`, `og:image`, `og:url`, `og:siteName`, `og:alternateLocale`
- Twitter card: `summary_large_image`
- `robots` with `max-image-preview: large` for Google
- `metadataBase` for absolute URL resolution

### Structured Data (JSON-LD)

An `Organization` schema is injected server-side in every page:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "GeniTech",
  "url": "https://genitech.com",
  "logo": "https://genitech.com/assets/images/logo.png",
  "sameAs": ["LinkedIn URL", "Facebook URL"],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": ["Arabic", "English"]
  }
}
```

### Auto-generated SEO files

| URL | Source file |
|---|---|
| `/sitemap.xml` | `src/app/sitemap.ts` |
| `/robots.txt` | `src/app/robots.ts` |
| `/manifest.webmanifest` | `src/app/manifest.ts` |

---

## Before Going Live — Required Updates

All values are centralised in **`src/lib/site-config.ts`**. Open that file and update:

### 1. Production URL
```ts
export const SITE_URL = "https://genitech.com";
// Replace with the real domain, e.g. "https://www.genitech.io"
// No trailing slash.
```

### 2. Social profile URLs
```ts
export const ORGANIZATION = {
  sameAs: [
    "https://www.linkedin.com/company/genitech", // ← real LinkedIn URL
    "https://www.facebook.com/genitech",          // ← real Facebook URL
  ],
};
```

### 3. Twitter / X handle
```ts
export const TWITTER_HANDLE = "@genitech"; // ← real handle, or "" to disable
```

### 4. Google Search Console verification
```ts
export const GOOGLE_SITE_VERIFICATION = ""; // ← paste the token from GSC HTML-tag verification
```
Get the token from: Google Search Console → Add property → HTML tag method → copy only the `content` value.

### 5. OG image
Add a `1200 × 630 px` JPEG at:
```
public/assets/images/og-image.jpg
```
This is shown when the site is shared on social media. Update the alt text if needed:
```ts
export const OG_IMAGE = {
  path: "/assets/images/og-image.jpg",
  alt: "GeniTech — Tech You Trust",
};
```

### 6. PWA icons (optional)
Add icon files if you want PWA / home-screen installation to work:
```
public/assets/images/icon-192.png   (192×192 px)
public/assets/images/icon-512.png   (512×512 px)
```

### 7. Favicon & Apple touch icon
Place these in `/public/`:
```
public/favicon.ico
public/apple-touch-icon.png  (180×180 px)
```

### 8. Logo path
```ts
export const ORGANIZATION = {
  logoPath: "/assets/images/logo.png", // ← verify this path matches the actual logo file
};
```

### 9. Real team member names and content
Update the placeholder names in `messages/ar.json` and `messages/en.json`:
- `Home.teamMember1` through `Home.teamMember4`
- `Home.testimonial*Name` and `Home.testimonial*Review`
- `Home.blogPost*Title`

---

## Development

```bash
npm install
npm run dev        # http://localhost:3000 (redirects to /ar by default)
```

## Build & Preview

```bash
npm run build      # Static HTML generated for /ar and /en
npm start          # Serve the production build locally
```

## Type Check

```bash
npx tsc --noEmit
```

## Lint

```bash
npm run lint
```
