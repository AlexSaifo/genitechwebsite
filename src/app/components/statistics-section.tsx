"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

type StatItem = {
  value: string;
  label: string;
  accent?: boolean;
};

function formatStatValue(value: string): string {
  const trimmed = value.trim();
  const hasPlus = trimmed.includes("+");
  const hasPercent = trimmed.includes("%");
  let normalized = trimmed.replace(/\+/g, "").trim();

  if (hasPercent) {
    normalized = normalized.replace(/\s*%\s*/g, "");
    if (hasPlus) {
      return `% ${normalized} +`;
    }
    return `% ${normalized}`;
  }

  if (hasPlus) {
    return `${normalized} +`;
  }

  return normalized;
}

function StatBlock({ value, label, accent = false }: StatItem) {
  return (
    <div className="flex w-full max-w-[262px] flex-col items-center justify-center text-center">
      <p
        className={`m-0 text-[34px] font-semibold leading-[1.25] min-[500px]:text-[42px] lg:text-[52px] ${
          accent
            ? "bg-[linear-gradient(90deg,#40B8F3_35.58%,#4A2A91_100%)] bg-clip-text text-transparent"
            : "text-white"
        }`}
      >
        {formatStatValue(value)}
      </p>
      <p className="m-0 text-[16px] font-normal leading-[1.9] text-white/65 min-[500px]:text-[17px] lg:text-[18px]">
        {label}
      </p>
    </div>
  );
}

export default function StatisticsSection() {
  const t = useTranslations("Home");
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

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
      { threshold: 0.25 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const panelStats: StatItem[] = [
    { value: t("statsPanelDownloadsValue"), label: t("statsPanelDownloadsLabel") },
    { value: t("statsPanelSupportValue"), label: t("statsPanelSupportLabel") },
    { value: t("statsPanelRatingValue"), label: t("statsPanelRatingLabel") },
  ];

  const topStats: StatItem[] = [
    {
      value: t("statsTopRetentionValue"),
      label: t("statsTopRetentionLabel"),
      accent: true,
    },
    {
      value: t("statsTopVisitsValue"),
      label: t("statsTopVisitsLabel"),
      accent: true,
    },
  ];

  const bottomStats: StatItem[] = [
    {
      value: t("statsBottomStabilityValue"),
      label: t("statsBottomStabilityLabel"),
      accent: true,
    },
    {
      value: t("statsBottomClientsValue"),
      label: t("statsBottomClientsLabel"),
      accent: true,
    },
  ];

  return (
    <section ref={sectionRef} className="relative px-4 py-14 md:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_298px] lg:items-center lg:gap-10">
        <div className="order-2 flex flex-col items-center gap-8 lg:order-1 lg:gap-12">
          <div className={`${isVisible ? "animate-from-top animate-delay-100" : "opacity-0"} flex w-full flex-col items-center justify-center gap-8 min-[680px]:flex-row min-[680px]:gap-12 lg:gap-[180px]`}>
            {topStats.map((item) => (
              <StatBlock key={item.label} {...item} />
            ))}
          </div>

          <div className={`${isVisible ? "animate-from-left animate-delay-200" : "opacity-0"}`}>
            <StatBlock
              value={t("statsCenterExperienceValue")}
              label={t("statsCenterExperienceLabel")}
              accent
            />
          </div>

          <div className={`${isVisible ? "animate-from-bottom animate-delay-100" : "opacity-0"} flex w-full flex-col items-center justify-center gap-8 min-[680px]:flex-row min-[680px]:gap-12 lg:gap-[180px]`}>
            {bottomStats.map((item) => (
              <StatBlock key={item.label} {...item} />
            ))}
          </div>
        </div>

        <div className={`${isVisible ? "animate-from-right animate-delay-150" : "opacity-0"} relative order-1 mx-auto w-full max-w-[298px] rounded-[24px] bg-[linear-gradient(269.48deg,#1BC4F9_3.26%,#5A6BE0_65.08%,#DC41CA_135.82%)] p-px lg:order-2 lg:min-h-[499px]`}>
          <aside className="flex h-full w-full items-center justify-center rounded-[22px] bg-[var(--background)] px-6 py-10 min-[500px]:px-8 min-[500px]:py-14 lg:px-10 lg:py-[65px]">
            <div className="flex w-full max-w-[262px] flex-col items-center gap-6 text-center">
              {panelStats.map((item, index) => (
                <div key={item.label} className="flex min-h-[91px] w-full flex-col items-center justify-center gap-1">
                  <p className="m-0 text-[40px] font-medium leading-[1.2] text-white min-[500px]:text-[48px] lg:leading-[90px]">
                    {formatStatValue(item.value)}
                  </p>
                  <p className="m-0 text-[16px] font-normal leading-[1.8] text-white/65 min-[500px]:text-[18px] lg:leading-[34px]">
                    {item.label}
                  </p>
                  {index < panelStats.length - 1 ? (
                    <span className="block h-px w-[216px] bg-white/20" aria-hidden="true" />
                  ) : null}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}