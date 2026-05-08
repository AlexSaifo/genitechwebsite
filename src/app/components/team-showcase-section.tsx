"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

export default function TeamShowcaseSection() {
  const t = useTranslations("Home");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const sectionText = {
    titleLine1: t("teamShowcaseTitleLine1"),
    titleLine2: t("teamShowcaseTitleLine2"),
    description: t("teamShowcaseDescription"),
    button: t("teamShowcaseButton"),
    imageAlt: t("teamShowcaseImageAlt"),
  };
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative px-4 py-14 md:px-6 lg:px-8 lg:py-20"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div
        className="mx-auto flex w-full max-w-310 flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-10"
      >
        <div
          className={`flex w-full max-w-124.5 flex-col gap-6 transition-all duration-700 ease-out lg:gap-6 ${
            isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
          } ${isArabic ? "items-end text-right" : "items-start text-left"}`}
        >
          <h2 className="m-0 w-full bg-[linear-gradient(89.18deg,#0CA5F0_15.53%,#FFFFFF_220.84%)] bg-clip-text text-[32px] font-black leading-[1.7] text-transparent min-[500px]:text-[34px] lg:text-[36.2667px] lg:leading-17">
            <span className="block">{sectionText.titleLine1}</span>
            <span className="block">{sectionText.titleLine2}</span>
          </h2>

          <p className="m-0 w-full text-[18px] font-normal leading-8.5 text-white">
            {sectionText.description}
          </p>

          <a
            href="#contact"
            className={`inline-flex h-12.5 w-51 items-center justify-center gap-2.5 rounded-3xl bg-[#086EA8] px-4 py-2 text-[18px] font-normal leading-8.5 text-white transition-colors duration-200 hover:bg-[#0a7bbd] ${
              isArabic ? "self-start" : "self-start"
            }`}
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

            <span>{sectionText.button}</span>
          </a>
        </div>

        <div
          className={`relative w-full max-w-179.25 shrink-0 transition-all duration-700 ease-out ${
            isVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-10 opacity-0"
          }`}
        >
          <div className="pointer-events-none absolute -inset-x-4 -inset-y-6 -z-10 rounded-[36px] bg-[radial-gradient(ellipse_at_center,rgba(12,165,240,0.14)_0%,rgba(3,8,14,0)_70%)]" />
          <div className="relative aspect-717/565 w-full">
            <Image
              src="/assets/images/Group 19.png"
              alt={sectionText.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 717px"
              className="object-contain"
              style={{ transform: !isArabic ? "scaleX(-1)" : undefined }}
              draggable={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
