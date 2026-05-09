/**
 * ─── SITE SEO CONFIGURATION ────────────────────────────────────────────────
 * This is the single source of truth for all SEO-related data.
 * Edit the values here to update metadata, structured data, sitemaps, etc.
 * ────────────────────────────────────────────────────────────────────────────
 */

// ─── Production URL ──────────────────────────────────────────────────────────
// No trailing slash. Change this when deploying.
export const SITE_URL = "https://genitechwebsite-opsalex.vercel.app";

// ─── Locales ─────────────────────────────────────────────────────────────────
export const LOCALES = ["ar", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "ar";

// ─── Per-locale metadata ────────────────────────────────────────────────────
export const LOCALE_META: Record<
  Locale,
  {
    lang: string;
    dir: "ltr" | "rtl";
    ogLocale: string;
    title: string;
    titleTemplate: string;
    description: string;
    keywords: string[];
  }
> = {
  ar: {
    lang: "ar",
    dir: "rtl",
    ogLocale: "ar_AR",
    title: "جيني تك | تقنية تثق بها",
    titleTemplate: "%s | جيني تك",
    description:
      "نؤمن بأن التكنولوجيا ليست مجرد أداة، بل هي وسيلة لتحقيق الإبداع والتميز. نساعد الشركات على تحقيق أهدافها الرقمية من خلال تطوير المواقع والتطبيقات وتصميم الهويات البصرية.",
    keywords: [
      "تطوير مواقع",
      "تطبيقات موبايل",
      "هوية بصرية",
      "تصميم UI UX",
      "شركة تقنية",
      "جيني تك",
      "تطوير برمجيات",
      "تصميم مواقع احترافية",
    ],
  },
  en: {
    lang: "en",
    dir: "ltr",
    ogLocale: "en_US",
    title: "GeniTech | Tech You Trust",
    titleTemplate: "%s | GeniTech",
    description:
      "GeniTech helps businesses achieve their digital goals through web development, mobile app development, and brand identity design. Technology you can trust.",
    keywords: [
      "web development",
      "mobile app development",
      "brand identity",
      "UI UX design",
      "tech company",
      "GeniTech",
      "software development",
      "digital solutions",
    ],
  },
};

// ─── Organisation / Brand ────────────────────────────────────────────────────
export const ORGANIZATION = {
  name: "GeniTech",
  legalName: "GeniTech",
  /** Path relative to public/ — used for OG image and JSON-LD logo */
  logoPath: "/assets/images/logo.png",
  /** Social profile URLs */
  sameAs: [
    "https://www.linkedin.com/company/genitech",
    "https://www.facebook.com/genitech",
  ],
  contactPoint: {
    contactType: "customer service",
    availableLanguage: ["Arabic", "English"],
  },
};

// ─── Twitter / X ─────────────────────────────────────────────────────────────
/** Twitter @handle — leave empty string if none */
export const TWITTER_HANDLE = "@genitech";

// ─── Google Search Console Verification ─────────────────────────────────────
/** Paste the content value from the HTML tag verification method.
 *  Leave empty string until you have a verified property. */
export const GOOGLE_SITE_VERIFICATION = "";

// ─── Open Graph / Sharing ────────────────────────────────────────────────────
/** Static OG image in /public. Recommended: 1200×630 px */
export const OG_IMAGE = {
  path: "/assets/images/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "GeniTech — Tech You Trust",
};
