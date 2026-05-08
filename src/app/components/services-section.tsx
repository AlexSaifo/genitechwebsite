"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

type ServiceCard = {
  id: string;
  icon: React.ReactNode;
};

export default function ServicesSection() {
  const t = useTranslations("Home");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const servicesSubtitle = t("servicesSubtitle");
  const selectedPhraseByLocale: Record<string, string> = {
    ar: "حلولًا رقمية تُحدث الفرق",
    en: "digital solutions that truly make a difference",
  };
  const selectedPhrase = selectedPhraseByLocale[locale] ?? selectedPhraseByLocale.en;
  const phraseStartIndex = servicesSubtitle
    .toLocaleLowerCase(locale)
    .indexOf(selectedPhrase.toLocaleLowerCase(locale));
  const hasSelectablePhrase = phraseStartIndex >= 0;
  const subtitlePrefix = hasSelectablePhrase
    ? servicesSubtitle.slice(0, phraseStartIndex)
    : servicesSubtitle;
  const renderedPhrase = hasSelectablePhrase
    ? servicesSubtitle.slice(phraseStartIndex, phraseStartIndex + selectedPhrase.length)
    : servicesSubtitle;
  const subtitleSuffix = hasSelectablePhrase
    ? servicesSubtitle.slice(phraseStartIndex + selectedPhrase.length)
    : "";

  const cards: ServiceCard[] = [
    {
      id: "branding",
      icon: (
        <svg
          width="81"
          height="81"
          viewBox="0 0 81 81"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_214_2891)">
            <circle cx="42.5" cy="34.5" r="28.5" fill="#AD1F9D" />
          </g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M36.1309 28.6163C36.1309 26.3602 37.9598 24.5312 40.2159 24.5312H46.8669C49.123 24.5312 50.9519 26.3602 50.9519 28.6163C50.9519 29.9367 50.3255 31.1108 49.3535 31.8576C50.3255 32.6043 50.9519 33.7784 50.9519 35.0988C50.9519 37.355 49.123 39.1839 46.8669 39.1839H46.7827C45.8869 39.1839 45.0585 38.8956 44.3852 38.4067V41.5393C44.3852 43.8257 42.5091 45.6664 40.2368 45.6664C37.9878 45.6664 36.1309 43.8446 36.1309 41.5814C36.1309 40.261 36.7573 39.0869 37.7293 38.3401C36.7573 37.5934 36.1309 36.4193 36.1309 35.0988C36.1309 33.7784 36.7573 32.6043 37.7293 31.8576C36.7573 31.1108 36.1309 29.9367 36.1309 28.6163ZM42.6977 35.0929C42.6977 35.0948 42.6976 35.0968 42.6976 35.0988C42.6976 35.1008 42.6977 35.1028 42.6977 35.1048V37.4963H40.2159L40.2036 37.4964C38.8851 37.4897 37.8184 36.4189 37.8184 35.0988C37.8184 33.7788 38.8852 32.7079 40.2038 32.7013L40.2159 32.7013H42.6976L42.6977 35.0929ZM46.879 31.0138C46.875 31.0138 46.8709 31.0138 46.8669 31.0138H46.7827C46.776 31.0138 46.7694 31.0138 46.7627 31.0138H44.3852V26.2187H46.8669C48.191 26.2187 49.2644 27.2922 49.2644 28.6163C49.2644 29.9364 48.1976 31.0073 46.879 31.0138ZM44.3852 35.1034C44.3876 36.4255 45.4601 37.4964 46.7827 37.4964H46.8669C48.191 37.4964 49.2644 36.423 49.2644 35.0988C49.2644 33.7788 48.1976 32.7079 46.879 32.7013C46.875 32.7013 46.8709 32.7013 46.8669 32.7013H46.7674C45.4518 32.7096 44.3876 33.7773 44.3852 35.0943V35.1034ZM40.2159 39.1839L40.2036 39.1839C38.8851 39.1905 37.8184 40.2614 37.8184 41.5814C37.8184 42.8985 38.9056 43.9789 40.2368 43.9789C41.5913 43.9789 42.6977 42.8796 42.6977 41.5393V39.1839H40.2159ZM42.6976 31.0138H40.2159L40.2038 31.0138C38.8852 31.0073 37.8184 29.9364 37.8184 28.6163C37.8184 27.2922 38.8918 26.2187 40.2159 26.2187H42.6976V31.0138Z"
            fill="white"
          />
          <defs>
            <filter
              id="filter0_d_214_2891"
              x="0"
              y="0"
              width="81"
              height="81"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="-2" dy="6" />
              <feGaussianBlur stdDeviation="6" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.678431 0 0 0 0 0.121569 0 0 0 0 0.615686 0 0 0 0.24 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_214_2891"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_214_2891"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      ),
    },
    {
      id: "web",
      icon: (
        <svg
          width="81"
          height="81"
          viewBox="0 0 81 81"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_214_2891)">
            <circle cx="42.5" cy="34.5" r="28.5" fill="#2B3CB8" />
          </g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M36.875 31.125C36.875 29.8824 37.8824 28.875 39.125 28.875L45.875 28.875C47.1176 28.875 48.125 29.8824 48.125 31.125L48.125 37.875C48.125 39.1176 47.1176 40.125 45.875 40.125L39.125 40.125C37.8824 40.125 36.875 39.1176 36.875 37.875L36.875 31.125ZM38.5625 31.125C38.5625 30.8143 38.8143 30.5625 39.125 30.5625L45.875 30.5625C46.1857 30.5625 46.4375 30.8143 46.4375 31.125L46.4375 37.875C46.4375 38.1857 46.1857 38.4375 45.875 38.4375L39.125 38.4375C38.8143 38.4375 38.5625 38.1857 38.5625 37.875L38.5625 31.125Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M38 23.5313C38.466 23.5313 38.8437 23.909 38.8437 24.375L38.8437 25.5L39.9687 25.5L39.9687 24.375C39.9687 23.909 40.3465 23.5313 40.8125 23.5313C41.2785 23.5313 41.6562 23.909 41.6562 24.375L41.6562 25.5L43.3437 25.5L43.3437 24.375C43.3437 23.909 43.7215 23.5313 44.1875 23.5313C44.6535 23.5313 45.0312 23.909 45.0312 24.375L45.0312 25.5L46.1562 25.5L46.1562 24.375C46.1562 23.909 46.534 23.5313 47 23.5313C47.466 23.5313 47.8437 23.909 47.8437 24.375L47.8437 25.579C49.6524 25.9221 51.0779 27.3476 51.421 29.1562L52.625 29.1562C53.091 29.1562 53.4687 29.534 53.4687 30C53.4687 30.466 53.091 30.8437 52.625 30.8437L51.5 30.8437L51.5 31.9687L52.625 31.9687C53.091 31.9687 53.4687 32.3465 53.4687 32.8125C53.4687 33.2785 53.091 33.6562 52.625 33.6562L51.5 33.6562L51.5 35.3437L52.625 35.3437C53.091 35.3437 53.4687 35.7215 53.4687 36.1875C53.4687 36.6535 53.091 37.0312 52.625 37.0312L51.5 37.0312L51.5 38.1562L52.625 38.1562C53.091 38.1562 53.4687 38.534 53.4687 39C53.4687 39.466 53.091 39.8437 52.625 39.8437L51.421 39.8437C51.0779 41.6524 49.6524 43.0779 47.8437 43.421L47.8437 44.625C47.8437 45.091 47.466 45.4687 47 45.4687C46.534 45.4687 46.1562 45.091 46.1562 44.625L46.1562 43.5L45.0312 43.5L45.0312 44.625C45.0312 45.091 44.6535 45.4687 44.1875 45.4687C43.7215 45.4687 43.3437 45.091 43.3437 44.625L43.3437 43.5L41.6562 43.5L41.6562 44.625C41.6562 45.091 41.2785 45.4687 40.8125 45.4687C40.3465 45.4687 39.9687 45.091 39.9687 44.625L39.9687 43.5L38.8437 43.5L38.8437 44.625C38.8437 45.091 38.466 45.4687 38 45.4687C37.534 45.4687 37.1562 45.091 37.1562 44.625L37.1562 43.421C35.3476 43.0779 33.9221 41.6524 33.579 39.8437L32.375 39.8437C31.909 39.8437 31.5312 39.466 31.5312 39C31.5312 38.534 31.909 38.1562 32.375 38.1562L33.5 38.1562L33.5 37.0312L32.375 37.0312C31.909 37.0312 31.5312 36.6535 31.5312 36.1875C31.5312 35.7215 31.909 35.3437 32.375 35.3437L33.5 35.3437L33.5 33.6562L32.375 33.6562C31.909 33.6562 31.5312 33.2785 31.5312 32.8125C31.5312 32.3465 31.909 31.9687 32.375 31.9687L33.5 31.9687L33.5 30.8437L32.375 30.8437C31.909 30.8437 31.5312 30.466 31.5312 30C31.5312 29.534 31.909 29.1562 32.375 29.1562L33.579 29.1562C33.9221 27.3476 35.3476 25.9221 37.1562 25.579L37.1562 24.375C37.1562 23.909 37.534 23.5313 38 23.5313ZM35.1875 30C35.1875 28.4467 36.4467 27.1875 38 27.1875L47 27.1875C48.5533 27.1875 49.8125 28.4467 49.8125 30L49.8125 39C49.8125 40.5533 48.5533 41.8125 47 41.8125L38 41.8125C36.4467 41.8125 35.1875 40.5533 35.1875 39L35.1875 30Z"
            fill="white"
          />
          <defs>
            <filter
              id="filter0_d_214_2891"
              x="0"
              y="0"
              width="81"
              height="81"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="-2" dy="6" />
              <feGaussianBlur stdDeviation="6" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.168627 0 0 0 0 0.235294 0 0 0 0 0.721569 0 0 0 0.24 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_214_2891"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_214_2891"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      ),
    },
    {
      id: "mobile",
      icon: (
        <svg
          width="81"
          height="81"
          viewBox="0 0 81 81"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_214_2891)">
            <circle cx="42.5" cy="34.5" r="28.5" fill="#0CA5F0" />
          </g>
          <path
            d="M42.5013 43.5C43.0766 43.5 43.543 42.9963 43.543 42.375C43.543 41.7537 43.0766 41.25 42.5013 41.25C41.926 41.25 41.4596 41.7537 41.4596 42.375C41.4596 42.9963 41.926 43.5 42.5013 43.5Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M34.168 27.75C34.168 25.2647 36.0334 23.25 38.3346 23.25H46.668C48.9692 23.25 50.8346 25.2647 50.8346 27.75V41.25C50.8346 43.7353 48.9692 45.75 46.668 45.75H38.3346C36.0334 45.75 34.168 43.7353 34.168 41.25V27.75ZM35.7305 27.75C35.7305 26.1967 36.8964 24.9375 38.3346 24.9375H46.668C48.1062 24.9375 49.2721 26.1967 49.2721 27.75V41.25C49.2721 42.8033 48.1062 44.0625 46.668 44.0625H38.3346C36.8964 44.0625 35.7305 42.8033 35.7305 41.25V27.75Z"
            fill="white"
          />
          <defs>
            <filter
              id="filter0_d_214_2891"
              x="0"
              y="0"
              width="81"
              height="81"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="-2" dy="6" />
              <feGaussianBlur stdDeviation="6" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.0470588 0 0 0 0 0.647059 0 0 0 0 0.941176 0 0 0 0.24 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_214_2891"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_214_2891"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      ),
    },
  ];

  return (
    <section
      id="services"
      className="relative px-4 py-16 md:px-6 lg:px-8 lg:py-20"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="mx-auto flex w-full max-w-310 flex-col items-center gap-12 lg:gap-16">
        <div className="relative flex w-full max-w-115 flex-col items-center gap-4 text-center">
          <h2 className="m-0 w-full bg-[linear-gradient(89.18deg,#0CA5F0_15.53%,#FFFFFF_220.84%)] bg-clip-text text-[30px] font-black leading-[1.35] text-transparent min-[500px]:text-[34px] lg:text-[36px]">
            {t("servicesTitle")}
          </h2>
          <p className="m-0 w-full text-[16px] leading-[1.9] text-white min-[500px]:text-[17px] lg:text-[18px]">
            {hasSelectablePhrase ? (
              <>
                {subtitlePrefix}
                <span className="relative inline-block rounded-xs border border-white/60 bg-[#16216F4A] px-0.5">
                  {renderedPhrase}
                  <Image
                    src="/assets/svg/small cursor.svg"
                    alt=""
                    width={20}
                    height={20}
                    className={`pointer-events-none absolute h-5 w-5 rotate-[8deg] ${
                      isArabic ? "-left-4 -bottom-3" : "-right-4 -bottom-3 scale-x-[-1]"
                    }`}
                    aria-hidden="true"
                  />
                </span>
                {subtitleSuffix}
              </>
            ) : (
              servicesSubtitle
            )}
          </p>

        </div>

        <div className="grid w-full grid-cols-1 justify-items-center gap-6 lg:grid-cols-3 lg:gap-8">
          {cards.map((card) => (
            <article
              key={card.id}
              className="group relative h-78 w-full max-w-98 overflow-visible"
            >
              <div className="pointer-events-none absolute inset-0 translate-x-px translate-y-px rounded-3xl border border-dashed border-white/32 bg-[linear-gradient(230.97deg,rgba(4,209,241,0.04)_-23.56%,rgba(124,81,189,0.04)_89.91%,rgba(186,36,149,0.04)_268.11%)] z-0" />
              <div
                className={`absolute inset-0 z-10 rounded-3xl bg-[#13192B] px-10 pb-10 pt-6 transition-transform duration-400 ease-out will-change-transform ${
                  isArabic
                    ? "origin-center group-hover:-translate-y-2.5 group-hover:rotate-[-9deg]"
                    : "origin-center group-hover:-translate-y-2.5 group-hover:rotate-[9deg]"
                }`}
              >
                <div
                  className={`flex h-full flex-col justify-center gap-4 ${
                    isArabic ? "items-end text-right" : "items-start text-left"
                  }`}
                >
                  <div
                    className={`shrink-0 w-full ${isArabic ? "self-end" : "self-start"}`}
                  >
                    {card.icon}
                  </div>
                  <h3 className="m-0 w-full text-[20px] font-bold leading-[1.85] text-white">
                    {t(`servicesCard${card.id}Title`)}
                  </h3>
                  <p className="m-0 w-full text-[16px] leading-[1.9] text-white">
                    {t(`servicesCard${card.id}Description`)}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
