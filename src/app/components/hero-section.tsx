"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations();
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
      dir={isArabic ? "rtl" : "ltr"}
      className={`${isVisible ? "animate-from-bottom animate-delay-100" : "opacity-0"} relative overflow-hidden px-4 pt-6 md:px-6 lg:px-8 lg:pb-20`}
    >
      <div
        className={`mx-auto grid w-full max-w-310 grid-cols-1 justify-items-center items-center gap-10 pb-3 lg:gap-8 ${
          isArabic
            ? "lg:flex lg:flex-row-reverse lg:items-center lg:justify-between"
            : "lg:flex lg:flex-row lg:items-center lg:justify-between"
        }`}
      >
        <div
          className={`relative order-2 mx-auto h-[264.16px] max-w-[665] justify-self-center min-[420px]:h-[314.96px] md:h-[386.08px] lg:h-127 lg:justify-self-auto ${
            isArabic ? "lg:order-1" : "lg:order-2"
          }`}
          aria-hidden="true"
        >
          <div
            className="absolute left-1/2 top-0 h-127 w-224.25 origin-top -translate-x-1/2 scale-[0.52] min-[420px]:scale-[0.62] md:scale-[0.76] lg:scale-100"
          >
            <div
              className={`absolute left-36.75 top-6.5 h-105.5 w-48.5 overflow-visible rounded-3xl ${cardTone}`}
            >
              <Image
                src="/assets/images/hero/hero-side-icon.png"
                alt="hero side icon"
                width={52}
                height={68}
                className="absolute -bottom-7.5 left-40 max-w-none w-28.75"
              />
              <Image
                src="/assets/images/hero/hero-character.png"
                alt="hero character"
                width={216}
                height={623}
                className="absolute bottom-0 left-1/2 h-auto w-54 max-w-none -translate-x-1/2"
                priority
              />
            </div>

            <div
              className={`absolute left-89.25 top-6.5 flex h-50.75 w-74.5 flex-col items-center justify-center rounded-3xl ${cardTone}`}
            >
              <Image
                src="/assets/images/hero/hero-small-logo.png"
                alt="hero small logo"
                width={102}
                height={37}
                className="absolute -bottom-2 left-55 h-auto w-25.5"
              />
              <Image
                src="/genitech-icon.svg"
                alt={t("Navigation.logoAlt")}
                width={102}
                height={37}
                priority
              />
              <p className="m-0 text-[30px] font-bold leading-14 text-white">
                Tech you Trust
              </p>
            </div>

            <div
              className={`absolute left-89.25 top-61.75 h-50.75 w-74.5 overflow-hidden rounded-3xl ${cardTone}`}
            >
              <Image
                src="/assets/images/hero/hero-phone.png"
                alt="hero phone"
                width={229}
                height={163}
                className={`absolute left-1/2 top-1/2 h-auto w-57.25 -translate-y-1/2 transition-all duration-700 ease-in-out ${
                  showPhone
                    ? "-translate-x-1/2 opacity-100"
                    : "-translate-x-47.5 opacity-0"
                }`}
              />
              <Image
                src="/assets/images/hero/hero-badge.png"
                alt=""
                width={224}
                height={123}
                className={`absolute left-1/2 top-1/2 h-auto w-56 -translate-y-1/2 transition-all duration-700 ease-in-out ${
                  showPhone
                    ? "translate-x-47.5 opacity-0"
                    : "-translate-x-1/2 opacity-100"
                }`}
              />
            </div>
          </div>
        </div>

        <div
          className={`order-1 flex flex-col gap-6 lg:gap-11 ${
            isArabic
              ? "lg:order-2 items-end text-right"
              : "lg:order-1 items-start text-left"
          }`}
        >
          <div className="flex w-full max-w-194.5 flex-col items-end gap-6">
            <div
              className={`flex w-full flex-col gap-4 lg:gap-6 ${isArabic ? "items-end" : "items-start"}`}
            >
              <h1 className="m-0 w-full bg-[linear-gradient(89.18deg,#0ca5f0_15.53%,#ffffff_220.84%)] bg-clip-text text-[34px] font-black leading-[1.35] text-transparent min-[500px]:text-[46px] lg:text-[56px] lg:leading-26.25">
                {t("Home.heroTitle")}
              </h1>
              <h2 className="m-0 w-full text-[20px] font-bold leading-[1.6] text-white min-[500px]:text-[24px] lg:text-[28px] lg:leading-13">
                {t("Home.heroSubtitle")}
              </h2>
            </div>

            <p className="m-0 w-full max-w-157 text-[16px] leading-[1.8] text-white min-[500px]:text-[17px] lg:text-[18px] lg:leading-8.5">
              {t("Home.heroDescription")}
            </p>
          </div>

          <div
            className={`flex w-full flex-wrap gap-3 min-[500px]:gap-5 lg:w-full lg:flex-nowrap ${isArabic ? "justify-start" : "justify-start"}`}
          >
            <Link
              href={`/${locale}#contact`}
              className="inline-flex min-h-12 w-full min-w-41.25 items-center justify-center gap-2 rounded-full bg-background px-5 py-2 text-[15px] font-semibold text-white transition-opacity hover:opacity-90 min-[500px]:w-auto min-[500px]:px-6 lg:w-51.25"
              style={{
                border: "1px solid transparent",
                borderRadius: "999px",
                background:
                  "linear-gradient(var(--background), var(--background)) padding-box, linear-gradient(269.48deg, #1BC4F9 3.26%, #5A6BE0 65.08%, #DC41CA 135.82%) border-box",
                WebkitBackgroundClip: "padding-box, border-box",
                backgroundClip: "padding-box, border-box",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.91682 4.48286L3.05738 6.20173C2.36714 7.58222 2.07391 9.14636 2.5769 10.6055C3.18108 12.3583 4.38906 14.8701 6.75988 17.241C9.13069 19.6118 11.6426 20.8198 13.3953 21.4239C14.8545 21.9269 16.4186 21.6337 17.7991 20.9434L19.5754 20.0553C20.7797 19.4531 21.057 17.8571 20.1264 16.8841L18.167 14.8352C17.4803 14.1173 16.3675 14.0206 15.5673 14.6093C14.67 15.2696 13.4701 15.3821 12.5295 14.7851C11.9682 14.4288 11.371 14.0036 10.9472 13.5799C10.4556 13.0883 9.96194 12.363 9.57634 11.7314C9.0838 10.9247 9.09083 9.92431 9.51353 9.07891L9.77626 8.55345C10.1613 7.78347 10.0103 6.85352 9.40162 6.2448L7.11988 3.96307C6.1546 2.99779 4.52732 3.26186 3.91682 4.48286ZM5.25846 5.15368L4.39902 6.87255C3.82332 8.02397 3.66462 9.15823 3.99501 10.1167C4.54344 11.7077 5.64649 14.0063 7.82054 16.1803C9.99458 18.3543 12.2931 19.4574 13.8841 20.0058C14.8426 20.3362 15.9769 20.1775 17.1283 19.6018L18.9046 18.7136C19.2057 18.5631 19.275 18.1641 19.0424 17.9208L17.0829 15.872C16.9174 15.6989 16.6491 15.6756 16.4563 15.8175C15.1277 16.7951 13.2554 17.0226 11.7256 16.0515C11.1364 15.6775 10.4283 15.1822 9.88659 14.6406C9.26372 14.0177 8.69481 13.1661 8.2961 12.5131C7.50281 11.2138 7.54625 9.65937 8.17189 8.40809L8.43462 7.88263C8.53087 7.69013 8.49314 7.45764 8.34096 7.30546L6.05922 5.02373C5.81791 4.78241 5.41109 4.84843 5.25846 5.15368Z"
                  fill="white"
                />
                <path
                  d="M15.5354 8.12227C14.8819 7.46877 14.0879 7.11687 13.4848 7.20302C13.2115 7.24207 12.9582 7.05211 12.9192 6.77875C12.8801 6.50538 13.0701 6.25212 13.3434 6.21307C14.3903 6.06353 15.4818 6.65445 16.2425 7.41517C17.0033 8.17589 17.5942 9.26746 17.4446 10.3143C17.4056 10.5877 17.1523 10.7776 16.8789 10.7386C16.6056 10.6995 16.4156 10.4463 16.4547 10.1729C16.5408 9.56982 16.1889 8.77577 15.5354 8.12227Z"
                  fill="white"
                />
                <path
                  d="M12.8844 9.29686C13.8484 8.93121 14.7265 9.80933 14.3608 10.7734C14.2629 11.0316 14.3928 11.3203 14.651 11.4182C14.9092 11.5161 15.1979 11.3862 15.2958 11.128C15.9672 9.35793 14.2998 7.69046 12.5297 8.36186C12.2715 8.45979 12.1416 8.74849 12.2395 9.00669C12.3375 9.26488 12.6262 9.39479 12.8844 9.29686Z"
                  fill="white"
                />
              </svg>
              <span>{t("Home.heroContact")}</span>
            </Link>

            <Link
              href={`/${locale}#services`}
              className="inline-flex min-h-12 w-full min-w-41.25 items-center justify-center rounded-full bg-[#141b2b] px-6 py-2 text-[15px] font-semibold text-white transition-colors hover:bg-[#1a2336] min-[500px]:w-auto lg:w-51.25"
            >
              {t("Home.heroDiscover")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
