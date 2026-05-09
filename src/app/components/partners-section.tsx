import Image from "next/image";
import { useTranslations } from "next-intl";

// Replace these entries with real partner logo paths when available.
// alt text is intentionally left to the translated partnersLogoAlt key.
const PARTNER_LOGOS = [
  "/genitech-icon.svg",
  "/genitech-icon.svg",
  "/genitech-icon.svg",
  "/genitech-icon.svg",
];

export default function PartnersSection() {
  const t = useTranslations("Home");

  return (
    <section id="partners" className="relative px-4 py-14 md:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto flex w-full max-w-310 flex-col items-center gap-10 lg:gap-16">
        {/* Heading */}
        <div className="flex flex-col items-center gap-5 text-center">
          <h2 className="m-0 bg-[linear-gradient(89.18deg,#0CA5F0_15.53%,#FFFFFF_220.84%)] bg-clip-text text-[30px] font-black leading-[1.35] text-transparent min-[500px]:text-[34px] lg:text-[36px]">
            {t("partnersTitle")}
          </h2>
          <p className="m-0 w-full text-[16px] leading-[1.9] text-white min-[500px]:text-[17px] lg:text-[18px]">
            {t("partnersSubtitle")}
          </p>
        </div>

        {/* Logos row */}
        <div className="grid w-full grid-cols-2 items-center justify-items-center gap-10 sm:grid-cols-4 sm:gap-8 lg:gap-32.75">
          {PARTNER_LOGOS.map((src, idx) => (
            <div key={idx} className="flex items-center justify-center opacity-80 transition-opacity duration-300 hover:opacity-100">
              <Image
                src={src}
                alt={t("partnersLogoAlt")}
                width={174}
                height={63}
                className="h-auto w-36 sm:w-40 lg:w-43.5"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
