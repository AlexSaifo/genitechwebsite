"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("Home");
  const tNav = useTranslations("Navigation");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [showPhone, setShowPhone] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setShowPhone((prev) => !prev);
    }, 3500);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const cardTone =
    "border border-dashed border-white/30 bg-[linear-gradient(230.97deg,rgba(4,209,241,0.04)_-23.56%,rgba(124,81,189,0.04)_89.91%,rgba(186,36,149,0.04)_268.11%)]";

  return (
    <section
      ref={sectionRef}
      id="home"
      className={`${isVisible ? "animate-from-bottom animate-delay-100" : "opacity-0"} relative overflow-hidden px-4 pt-6 md:px-6 lg:px-8 lg:pb-20`}
    >
      <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 justify-items-center items-center gap-10 pb-3 lg:grid-cols-2 lg:justify-items-stretch lg:gap-8">
        <div
          className="relative order-2 mx-auto h-[calc(508px*0.52)]  max-w-[665] justify-self-center min-[420px]:h-[calc(508px*0.62)] md:h-[calc(508px*0.76)] lg:order-1 lg:h-[508px] lg:justify-self-auto"
          aria-hidden="true"
        >
          <div className="absolute left-1/2 top-0 h-[508px] w-[897px] origin-top -translate-x-1/2 scale-[0.52] min-[420px]:scale-[0.62] md:scale-[0.76] lg:scale-100">
            <div
              className={`absolute left-[147px] top-[26px] h-[422px] w-[194px] overflow-visible rounded-3xl ${cardTone}`}
            >
              <Image
                src="/assets/images/hero/hero-side-icon.png"
                alt="hero side icon"
                width={52}
                height={68}
                className="absolute bottom-[-30px] left-[160px] max-w-[none] w-[115px]"
              />
              <Image
                src="/assets/images/hero/hero-character.png"
                alt="hero character"
                width={216}
                height={623}
                className="absolute bottom-0 left-1/2 h-auto w-[216px] max-w-[none] -translate-x-1/2"
                priority
              />
            </div>

            <div
              className={`absolute left-[357px] top-[26px] flex h-[203px] w-[298px] flex-col items-center justify-center rounded-3xl ${cardTone}`}
            >
              <Image
                src="/assets/images/hero/hero-small-logo.png"
                alt="hero small logo"
                width={102}
                height={37}
                className="absolute bottom-[-8px] left-[220px] h-auto w-[102px]"
              />
              <Image
                src="/genitech-icon.svg"
                alt={tNav("logoAlt")}
                width={102}
                height={37}
                priority
              />
              <p className="m-0 text-[30px] font-bold leading-[56px] text-white">
                Tech you Trust
              </p>
            </div>

            <div
              className={`absolute left-[357px] top-[247px] h-[203px] w-[298px] overflow-hidden rounded-3xl ${cardTone}`}
            >
              <Image
                src="/assets/images/hero/hero-phone.png"
                alt="hero phone"
                width={229}
                height={163}
                className={`absolute left-1/2 top-1/2 h-auto w-[229px] -translate-y-1/2 transition-all duration-700 ease-in-out ${
                  showPhone
                    ? "-translate-x-1/2 opacity-100"
                    : "-translate-x-[190px] opacity-0"
                }`}
              />
              <Image
                src="/assets/images/hero/hero-badge.png"
                alt=""
                width={224}
                height={123}
                className={`absolute left-1/2 top-1/2 h-auto w-[224px] -translate-y-1/2 transition-all duration-700 ease-in-out ${
                  showPhone
                    ? "translate-x-[190px] opacity-0"
                    : "-translate-x-1/2 opacity-100"
                }`}
              />
            </div>
          </div>
        </div>

        <div className="order-1 flex flex-col items-start gap-6 text-right lg:order-2 lg:items-end lg:gap-11">
          <div className="flex w-full max-w-[778px] flex-col items-end gap-6">
            <div className="flex w-full flex-col items-end gap-4 lg:gap-6">
              <h1 className="m-0 w-full bg-[linear-gradient(89.18deg,#0ca5f0_15.53%,#ffffff_220.84%)] bg-clip-text text-[34px] font-black leading-[1.35] text-transparent min-[500px]:text-[46px] lg:text-[56px] lg:leading-[105px]">
                {t("heroTitle")}
              </h1>
              <h2 className="m-0 w-full text-[20px] font-bold leading-[1.6] text-white min-[500px]:text-[24px] lg:text-[28px] lg:leading-[52px]">
                {t("heroSubtitle")}
              </h2>
            </div>

            <p className="m-0 w-full max-w-[628px] text-[16px] leading-[1.8] text-white min-[500px]:text-[17px] lg:text-[18px] lg:leading-[34px]">
              {t("heroDescription")}
            </p>
          </div>

          <div className="flex w-full flex-wrap justify-end gap-3 min-[500px]:gap-5 lg:w-auto lg:flex-nowrap">
            <Link
              href={`/${locale}#services`}
              className="inline-flex min-h-12 w-full min-w-[165px] items-center justify-center rounded-full bg-[#141b2b] px-6 py-2 text-[15px] font-semibold text-white transition-colors hover:bg-[#1a2336] min-[500px]:w-auto lg:w-[205px]"
            >
              {t("heroDiscover")}
            </Link>

            <Link
              href={`/${locale}#contact`}
              className="inline-flex min-h-12 w-full min-w-[165px] items-center justify-center gap-2 rounded-full bg-[var(--background)] px-5 py-2 text-[15px] font-semibold text-white transition-opacity hover:opacity-90 min-[500px]:w-auto min-[500px]:px-6 lg:w-[205px]"
              style={{
                border: "1px solid transparent",
                borderRadius: "999px",
                background:
                  "linear-gradient(var(--background), var(--background)) padding-box, linear-gradient(269.48deg, #1BC4F9 3.26%, #5A6BE0 65.08%, #DC41CA 135.82%) border-box",
                WebkitBackgroundClip: "padding-box, border-box",
                backgroundClip: "padding-box, border-box",
              }}
            >
              <span>{t("heroContact")}</span>
              <span aria-hidden="true" className="text-base leading-none">
                &#9742;
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
