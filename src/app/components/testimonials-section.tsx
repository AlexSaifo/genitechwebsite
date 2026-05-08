"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

const StarIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.53937 0.702898C7.83072 -0.234732 9.1578 -0.23481 9.44926 0.702788L10.7457 4.87321C10.8757 5.29142 11.2627 5.57639 11.7006 5.57636L15.9864 5.57612C16.9443 5.57607 17.3542 6.79295 16.5914 7.37241L13.0489 10.0635C12.7139 10.318 12.574 10.7549 12.6989 11.1566L14.0341 15.4518C14.3229 16.381 13.2492 17.1335 12.4743 16.545L9.09993 13.9822C8.74239 13.7107 8.24771 13.7107 7.8902 13.9823L4.5161 16.5455C3.74128 17.1341 2.6675 16.3816 2.95623 15.4524L4.29093 11.1571C4.41576 10.7554 4.27581 10.3184 3.94079 10.064L0.398006 7.37333C-0.364852 6.79395 0.04484 5.57702 1.00277 5.57697L5.28855 5.57672C5.7265 5.5767 6.11349 5.29169 6.24345 4.87346L7.53937 0.702898Z"
      fill="#DFB639"
    />
  </svg>
);

interface TestimonialCardProps {
  review: string;
  name: string;
  avatar: string;
  isArabic: boolean;
}

function TestimonialCard({
  review,
  name,
  avatar,
  isArabic,
}: TestimonialCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    /* Padding so rotated card doesn't clip its container */
    <div
      className="relative w-full max-w-[392px] px-4 py-6"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Dashed border stays flat — does NOT rotate */}
      <div className="pointer-events-none absolute inset-x-4 inset-y-6 rounded-3xl border border-dashed border-white/[.32] bg-[linear-gradient(230.97deg,rgba(4,209,241,0.04)_-23.56%,rgba(124,81,189,0.04)_89.91%,rgba(186,36,149,0.04)_268.11%)]" />

      {/* Solid card rotates on hover */}
      <div
        dir={isArabic ? "rtl" : "ltr"}
        style={{
          backgroundColor: hovered ? "#086EA8" : "#13192B",
          transform: hovered ? "rotate(4.42deg)" : "rotate(0deg)",
          transition:
            "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), background-color 0.35s ease",
        }}
        className="relative flex min-h-[312px] flex-col gap-4 rounded-3xl px-10 pb-10 pt-6"
      >
        {/* 5 gold stars */}
        <div
          className={`flex flex-row gap-1.5 justify-start`}
        >
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} />
          ))}
        </div>

        {/* Review text */}
        <p
          className={`m-0 w-full text-[16px] leading-[30px] text-white ${isArabic ? "text-right" : "text-left"}`}
        >
          {review}
        </p>

        {/* Author row */}
        <div
          className={`mt-auto flex w-full items-center gap-2.5 justify-start `}
        >
          <span
            className={`text-[16px] font-bold leading-[30px] text-white ${
              isArabic ? "order-1" : "order-2"
            }`}
          >
            {name}
          </span>
          <div
            className={`relative h-[57px] w-[57px] shrink-0 overflow-hidden rounded-full border border-white/[.66] shadow-[-2px_6px_12px_rgba(43,60,184,0.24)] `}
          >
            <Image
              src={avatar}
              alt={name}
              fill
              className="object-cover"
              sizes="57px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const TESTIMONIALS = [
  {
    avatar:
      "/assets/images/team-members/telegram-cloud-photo-size-4-6014997541256105139-y%201.png",
    reviewKey: "Home.testimonial1Review" as const,
    nameKey: "Home.testimonial1Name" as const,
  },
  {
    avatar:
      "/assets/images/team-members/telegram-cloud-photo-size-4-6014997541256105140-y%201.png",
    reviewKey: "Home.testimonial2Review" as const,
    nameKey: "Home.testimonial2Name" as const,
  },
  {
    avatar:
      "/assets/images/team-members/telegram-cloud-photo-size-4-6014997541256105141-y%201.png",
    reviewKey: "Home.testimonial3Review" as const,
    nameKey: "Home.testimonial3Name" as const,
  },
];

export default function TestimonialsSection() {
  const t = useTranslations();
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

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
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      dir={isArabic ? "rtl" : "ltr"}
      className={`${isVisible ? "animate-from-bottom animate-delay-100" : "opacity-0"} relative px-4 py-16 md:px-6 lg:px-8 lg:py-20`}
    >
      <div className="mx-auto max-w-[1240px]">
        {/* Section title */}
        <h2 className="m-0 mb-16 w-full bg-[linear-gradient(89.18deg,#0CA5F0_15.53%,#FFFFFF_220.84%)] bg-clip-text text-center text-[36px] font-black leading-[68px] text-transparent">
          {t("Home.testimonialsTitle")}
        </h2>

        {/* Cards grid — 1 col on mobile, 2 on sm, 3 on lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map(({ avatar, reviewKey, nameKey }) => (
            <div key={nameKey} className="flex justify-center">
              <TestimonialCard
                review={t(reviewKey)}
                name={t(nameKey)}
                avatar={avatar}
                isArabic={isArabic}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
