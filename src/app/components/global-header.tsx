"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

const SUPPORTED_LOCALES = ["en", "ar"] as const;

type LocaleCode = (typeof SUPPORTED_LOCALES)[number];

type NavItem = {
  key: "home" | "about" | "services" | "blog";
  sectionId: string;
};

const navItems: NavItem[] = [
  { key: "home", sectionId: "home" },
  { key: "about", sectionId: "about" },
  { key: "services", sectionId: "services" },
  { key: "blog", sectionId: "blog" },
];

function getPathWithoutLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (first && SUPPORTED_LOCALES.includes(first as LocaleCode)) {
    const rest = segments.slice(1);
    return rest.length ? `/${rest.join("/")}` : "/";
  }

  return pathname || "/";
}

function withLocalePrefix(pathname: string, locale: string): string {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

export default function GlobalHeader() {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dir = locale === "ar" ? "rtl" : "ltr";
  const localHome = withLocalePrefix("/", locale);

  const currentPathWithoutLocale = useMemo(
    () => getPathWithoutLocale(pathname),
    [pathname],
  );

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleLanguageChange = (nextLocale: string) => {
    const nextPath = withLocalePrefix(currentPathWithoutLocale, nextLocale);
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    router.push(`${nextPath}${hash}`);
    setIsMenuOpen(false);
  };

  return (
    <header className="site-header" dir={dir}>
      <div className="site-header__inner">
        <div className="site-header__controls">
          <Link href={`${localHome}#contact`} className="site-header__cta">
            {t("cta")}
          </Link>

          <label className="site-header__language" aria-label={t("languageLabel")}>
            <svg
              viewBox="0 0 24 24"
              role="img"
              aria-hidden="true"
              className="site-header__globe"
            >
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.93 6h-2.95a15.8 15.8 0 0 0-1.38-3.56A8.01 8.01 0 0 1 18.93 8zM12 4.04c.83 1.2 1.52 2.54 2.02 3.96H9.98A14.9 14.9 0 0 1 12 4.04zM4.26 14a8.08 8.08 0 0 1 0-4h3.25a17.3 17.3 0 0 0 0 4H4.26zm.81 2h2.95c.34 1.25.8 2.45 1.38 3.56A8.01 8.01 0 0 1 5.07 16zM8.02 14a15.4 15.4 0 0 1 0-4h7.96c.14.65.22 1.32.22 2s-.08 1.35-.22 2H8.02zm3.98 5.96A14.9 14.9 0 0 1 9.98 16h4.04A14.9 14.9 0 0 1 12 19.96zM14.6 19.56A15.8 15.8 0 0 0 15.98 16h2.95a8.01 8.01 0 0 1-4.33 3.56zM16.49 14a17.3 17.3 0 0 0 0-4h3.25a8.08 8.08 0 0 1 0 4h-3.25z"
              />
            </svg>
            <select
              value={locale}
              onChange={(event) => handleLanguageChange(event.target.value)}
            >
              <option value="ar">{t("languageAr")}</option>
              <option value="en">{t("languageEn")}</option>
            </select>
          </label>
        </div>

        <nav className="site-header__nav" aria-label={t("mainNavLabel")}>
          {navItems.map((item) => {
            const href = `${localHome}#${item.sectionId}`;
            const isActive = item.key === "home" && currentPathWithoutLocale === "/";

            return (
              <Link
                key={item.key}
                href={href}
                className={`site-header__link ${isActive ? "is-active" : ""}`}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <Link href={localHome} className="site-header__brand" aria-label={t("logoAlt")}>
          <Image
            src="/genitech-icon.svg"
            alt={t("logoAlt")}
            width={148}
            height={52}
            priority
          />
        </Link>

        <button
          className="site-header__menu-button"
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`site-header__mobile-panel ${isMenuOpen ? "is-open" : ""}`}>
        <nav className="site-header__mobile-nav" aria-label={t("mainNavLabel")}>
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={`${localHome}#${item.sectionId}`}
              className="site-header__mobile-link"
              onClick={() => setIsMenuOpen(false)}
            >
              {t(item.key)}
            </Link>
          ))}
          <Link
            href={`${localHome}#contact`}
            className="site-header__mobile-cta"
            onClick={() => setIsMenuOpen(false)}
          >
            {t("cta")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
