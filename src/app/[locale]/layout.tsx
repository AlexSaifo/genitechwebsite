import { NextIntlClientProvider } from "next-intl";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GlobalHeader from "../components/global-header";
import "../globals.css";

const SUPPORTED_LOCALES = ["ar", "en"] as const;

export const metadata: Metadata = {
  title: "GeniTech",
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!SUPPORTED_LOCALES.includes(locale as (typeof SUPPORTED_LOCALES)[number])) {
    notFound();
  }

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <GlobalHeader />
      {children}
    </NextIntlClientProvider>
  );
}
