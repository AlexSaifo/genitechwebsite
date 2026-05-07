import { getRequestConfig } from "next-intl/server";

const SUPPORTED_LOCALES = ["en", "ar"] as const;
const DEFAULT_LOCALE = "ar";

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const locale: (typeof SUPPORTED_LOCALES)[number] = SUPPORTED_LOCALES.includes(
    requestedLocale as (typeof SUPPORTED_LOCALES)[number],
  )
    ? (requestedLocale as (typeof SUPPORTED_LOCALES)[number])
    : DEFAULT_LOCALE;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
