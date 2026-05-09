"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

type LinkItem = {
  key: string;
  href: string;
};

const linkItems: LinkItem[] = [
  { key: "home", href: "#home" },
  { key: "about", href: "#about" },
  { key: "blog", href: "#blog" },
  { key: "contact", href: "#contact" },
  { key: "privacy", href: "#" },
];

const serviceItems: LinkItem[] = [
  { key: "mobileApps", href: "#services" },
  { key: "webDevelopment", href: "#services" },
  { key: "desktopApps", href: "#services" },
  { key: "branding", href: "#services" },
  { key: "uiDesign", href: "#services" },
];

function iconClass() {
  return "h-5 w-5 text-white/90 transition-colors duration-200 hover:text-white";
}

export default function GlobalFooter() {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const localHome = `/${locale}`;
  const isArabic = locale === "ar";
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" dir={isArabic ? "rtl" : "ltr"} className="relative mt-8 overflow-hidden px-4 pb-10 pt-16 md:px-6 lg:px-8 lg:pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24  h-[620px] w-[620px] rounded-full opacity-75 blur-[142px]"
        style={{
          background:
            "linear-gradient(29.56deg, rgba(4, 209, 241, 0.22) 1.15%, rgba(124, 81, 189, 0.22) 58.15%, rgba(186, 36, 149, 0.22) 108.11%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-310 flex-col items-center gap-14 lg:gap-16">
        <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-stretch lg:justify-between lg:gap-[73px]">
          <div className={`order-2 w-full rounded-3xl border border-white/12 bg-[linear-gradient(230.97deg,rgba(4,209,241,0.04)_-23.56%,rgba(124,81,189,0.04)_89.91%,rgba(186,36,149,0.04)_268.11%)] p-6 sm:p-8 lg:max-w-[614px] lg:p-10 ${
            isArabic ? "lg:order-2" : "lg:order-1"
          }`}>
            <div className="flex flex-col gap-8">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">
                <div className={`flex flex-col gap-6 ${isArabic ? "items-end text-right" : "items-start text-left"}`}>
                  <h3 className="m-0 w-full text-[18px] font-normal leading-[34px] text-white">{t("ourLinks")}</h3>
                  <div className="flex w-full flex-col gap-4">
                    {linkItems.map((item) => (
                      <Link
                        key={item.key}
                        href={`${localHome}${item.href}`}
                        className="text-[16px] leading-[30px] text-white/56 transition-colors duration-200 hover:text-white"
                      >
                        {t(`links.${item.key}`)}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className={`flex flex-col gap-6 ${isArabic ? "items-end text-right" : "items-start text-left"}`}>
                  <h3 className="m-0 w-full text-[18px] font-normal leading-[34px] text-white">{t("ourServices")}</h3>
                  <div className="flex w-full flex-col gap-4">
                    {serviceItems.map((item) => (
                      <Link
                        key={item.key}
                        href={`${localHome}${item.href}`}
                        className="text-[16px] leading-[30px] text-white/56 transition-colors duration-200 hover:text-white"
                      >
                        {t(`services.${item.key}`)}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="h-px w-full bg-white/22" />

              <div className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${isArabic ? "sm:flex-row-reverse" : ""}`}>
                <div className={`flex items-center gap-6 ${isArabic ? "flex-row-reverse" : ""}`}>
                  <a href="https://www.linkedin.com" aria-label="LinkedIn" className={iconClass()} target="_blank" rel="noreferrer">
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M7 9.5V17" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                      <path d="M7 7.25C7.62132 7.25 8.125 6.74632 8.125 6.125C8.125 5.50368 7.62132 5 7 5C6.37868 5 5.875 5.50368 5.875 6.125C5.875 6.74632 6.37868 7.25 7 7.25Z" fill="currentColor" />
                      <path d="M11 17V12.75C11 11.5074 12.0074 10.5 13.25 10.5C14.4926 10.5 15.5 11.5074 15.5 12.75V17" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                      <rect x="2.75" y="2.75" width="18.5" height="18.5" rx="5" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </a>

                  <a href="https://www.facebook.com" aria-label="Facebook" className={iconClass()} target="_blank" rel="noreferrer">
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M13 8.5H14.5V6.5H13C11.6193 6.5 10.5 7.61929 10.5 9V10.5H9V12.5H10.5V17.5H12.5V12.5H14.5L15 10.5H12.5V9C12.5 8.72386 12.7239 8.5 13 8.5Z" fill="currentColor" />
                      <rect x="2.75" y="2.75" width="18.5" height="18.5" rx="5" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </a>

                  <a href="https://wa.me/963956495873" aria-label="WhatsApp" className={iconClass()} target="_blank" rel="noreferrer">
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 13.6937 4.52663 15.2644 5.4248 16.5571L4.5 19.5L7.44288 18.5752C8.73559 19.4734 10.3063 20 12 20Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M9.35 9.9C9.35 9.6 9.6 9.35 9.9 9.35H10.35C10.6 9.35 10.82 9.52 10.88 9.76L11.11 10.72C11.16 10.92 11.1 11.14 10.95 11.29L10.57 11.67C10.95 12.35 11.52 12.91 12.2 13.29L12.58 12.91C12.73 12.76 12.95 12.7 13.15 12.75L14.11 12.98C14.35 13.04 14.52 13.26 14.52 13.51V13.96C14.52 14.26 14.27 14.51 13.97 14.51H13.5C11.18 14.51 9.35 12.68 9.35 10.36V9.9Z" fill="currentColor" />
                    </svg>
                  </a>
                </div>

                <p className="m-0 text-[16px] leading-[30px] text-white/77">{t("followUs")}</p>
              </div>
            </div>
          </div>

          <div className={`order-1 flex w-full flex-col justify-center gap-6 lg:max-w-[553px] ${isArabic ? "items-start text-right lg:order-1" : "items-start text-left lg:order-2"}`}>
            <Image
              src="/genitech-icon.svg"
              alt={t("logoAlt")}
              width={174}
              height={61}
              className="h-auto w-[174px]"
              draggable={false}
            />

            <p className="m-0 w-full text-[18px] leading-[34px] text-white">{t("description")}</p>

            <div className="h-px w-full bg-white/44" />

            <div className={`flex w-full flex-col gap-3 ${isArabic ? "items-start text-right" : "items-start text-left"}`}>
              <p className="m-0 text-[18px] leading-[34px] text-white/77">{t("contactTitle")}</p>
              <div className={`flex w-full flex-col gap-2 text-[18px] leading-[34px] text-white underline sm:flex-row sm:items-center sm:gap-9 `}>
                <a href="mailto:genitechsolutions2025@gmail.com" className="hover:text-white/80">
                  genitechsolutions2025@gmail.com
                </a>
                <a href="tel:+963956495873" className="hover:text-white/80">
                  +963 956 495 873
                </a>
              </div>
            </div>
          </div>
        </div>

        <p className="m-0 w-full text-center text-[16px] leading-[30px] text-white/44">
          {t("copyright", { year: currentYear })}
        </p>
      </div>
    </footer>
  );
}
