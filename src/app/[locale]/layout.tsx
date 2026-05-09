import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import GlobalFooter from "../components/global-footer";
import GlobalHeader from "../components/global-header";
import { cairo, geistMono, geistSans } from "../layout";
import {
  DEFAULT_LOCALE,
  GOOGLE_SITE_VERIFICATION,
  LOCALE_META,
  LOCALES,
  OG_IMAGE,
  ORGANIZATION,
  SITE_URL,
  TWITTER_HANDLE,
  type Locale,
} from "@/lib/site-config";

// ─── SSG: pre-render /ar and /en at build time ───────────────────────────────
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

// All unknown locales → 404 (no dynamic fallback)
export const dynamicParams = false;

// ─── Per-locale metadata ─────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  // Required so static generation doesn't fall back to reading request headers.
  setRequestLocale(locale);
  const meta = LOCALE_META[(locale as Locale) ?? DEFAULT_LOCALE];

  const canonicalUrl = `${SITE_URL}/${locale}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: meta.title,
      template: meta.titleTemplate,
    },
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: ORGANIZATION.name, url: SITE_URL }],
    creator: ORGANIZATION.name,
    publisher: ORGANIZATION.name,

    // ── Canonical + hreflang alternates ──────────────────────────────────────
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE_URL}/en`,
        ar: `${SITE_URL}/ar`,
        "x-default": `${SITE_URL}/${DEFAULT_LOCALE}`,
      },
    },

    // ── Open Graph ────────────────────────────────────────────────────────────
    openGraph: {
      type: "website",
      locale: meta.ogLocale,
      alternateLocale: LOCALES.filter((l) => l !== locale).map(
        (l) => LOCALE_META[l].ogLocale
      ),
      url: canonicalUrl,
      siteName: ORGANIZATION.name,
      title: meta.title,
      description: meta.description,
      images: [
        {
          url: OG_IMAGE.path,
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
          alt: OG_IMAGE.alt,
        },
      ],
    },

    // ── Twitter / X card ─────────────────────────────────────────────────────
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      title: meta.title,
      description: meta.description,
      images: [OG_IMAGE.path],
    },

    // ── Crawling / indexing ───────────────────────────────────────────────────
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // ── Icons ─────────────────────────────────────────────────────────────────
    icons: {
      icon: "/genitech-icon.svg",
      apple: "/genitech-icon.svg",
    },

    // ── Search Console ────────────────────────────────────────────────────────
    verification: GOOGLE_SITE_VERIFICATION
      ? { google: GOOGLE_SITE_VERIFICATION }
      : undefined,
  };
}

// ─── JSON-LD Organisation schema ─────────────────────────────────────────────
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: ORGANIZATION.name,
  legalName: ORGANIZATION.legalName,
  url: SITE_URL,
  logo: `${SITE_URL}${ORGANIZATION.logoPath}`,
  sameAs: ORGANIZATION.sameAs,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: ORGANIZATION.contactPoint.contactType,
    availableLanguage: ORGANIZATION.contactPoint.availableLanguage,
  },
};

// ─── Layout ──────────────────────────────────────────────────────────────────
export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Pre-seed the locale cache so next-intl doesn't fall back to headers().
  // Required for static rendering (SSG).
  setRequestLocale(locale);

  if (!LOCALES.includes(locale as Locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const { lang, dir } = LOCALE_META[typedLocale];

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <html
      lang={lang}
      dir={dir}
      className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable} h-full antialiased`}
    >
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" href="/genitech-icon.svg" />
        <link rel="apple-touch-icon" href="/genitech-icon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <main className="site-main">
          <NextIntlClientProvider locale={locale} messages={messages}>
            <GlobalHeader />
            {children}
            <GlobalFooter />
          </NextIntlClientProvider>
        </main>
      </body>
    </html>
  );
}
