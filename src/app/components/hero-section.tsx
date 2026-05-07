"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("Home");
  const tNav = useTranslations("Navigation");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [showPhone, setShowPhone] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setShowPhone((prev) => !prev);
    }, 3500);

    return () => clearInterval(intervalId);
  }, []);

  const cardTone =
    "border border-dashed border-white/30 bg-[linear-gradient(230.97deg,rgba(4,209,241,0.04)_-23.56%,rgba(124,81,189,0.04)_89.91%,rgba(186,36,149,0.04)_268.11%)]";

  return (
    <section
      id="home"
      className="relative overflow-hidden px-4 pt-6 md:px-6 lg:px-8"
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-10 pb-3 lg:grid-cols-2 lg:gap-8">
        <div
          className="relative order-2 mx-auto h-[320px] w-full max-w-[655px] min-[500px]:h-[430px] lg:order-1 lg:h-[508px]"
          aria-hidden="true"
        >
          <div
            className={`absolute left-1/2 top-4 h-[250px] w-[130px] -translate-x-[65%] overflow-visible rounded-3xl min-[500px]:h-[360px] min-[500px]:w-[170px] lg:left-[147px] lg:top-[26px] lg:h-[422px] lg:w-[194px] lg:translate-x-0 ${cardTone}`}
          >
            <Image
              src="/assets/images/hero/hero-side-icon.png"
              alt=""
              width={52}
              height={68}
              className="absolute bottom-[-30px] left-[160px] max-w-[none] w-[115px]"
            />
            <Image
              src="/assets/images/hero/hero-character.png"
              alt=""
              width={348}
              height={623}
              className="absolute bottom-0 left-1/2 h-auto w-[210px] -translate-x-1/2 min-[500px]:w-[300px] lg:w-[348px] max-w-[none]"
              priority
            />
          </div>

          <div
            className={`absolute right-2 top-4 flex h-[120px] w-[190px] flex-col items-center justify-center rounded-3xl min-[500px]:h-[170px] min-[500px]:w-[270px] lg:left-[357px] lg:top-[26px] lg:h-[203px] lg:w-[298px] ${cardTone}`}
          >
            <Image
              src="/assets/images/hero/hero-small-logo.png"
              alt=""
              width={102}
              height={37}
              className="h-auto w-[80px] min-[500px]:w-[96px] lg:w-[102px] absolute left-[220px] bottom-[-8px]"
            />
            <Image
              src="/genitech-icon.svg"
              alt={tNav("logoAlt")}
              width={102}
              height={37}
              priority
            />
            <p className="m-0 text-[20px] font-bold leading-[1.6] text-white min-[500px]:text-[28px] lg:text-[30px] lg:leading-[56px]">
              Tech you Trust
            </p>
          </div>

          <div
            className={`absolute right-2 top-[152px] h-[120px] w-[190px] overflow-hidden rounded-3xl min-[500px]:top-[205px] min-[500px]:h-[170px] min-[500px]:w-[270px] lg:left-[357px] lg:top-[247px] lg:h-[203px] lg:w-[298px] ${cardTone}`}
          >
            <Image
              src="/assets/images/hero/hero-phone.png"
              alt=""
              width={229}
              height={163}
              className={`absolute left-1/2 top-1/2 h-auto w-[145px] -translate-y-1/2 transition-all duration-700 ease-in-out min-[500px]:w-[205px] lg:w-[229px] ${
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
              className={`absolute left-1/2 top-1/2 h-auto w-[145px] -translate-y-1/2 transition-all duration-700 ease-in-out min-[500px]:w-[200px] lg:w-[224px] ${
                showPhone
                  ? "translate-x-[190px] opacity-0"
                  : "-translate-x-1/2 opacity-100"
              }`}
            />
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
