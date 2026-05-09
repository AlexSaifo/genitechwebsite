"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

const POSTS = [
  { titleKey: "blogPost1Title", image: "/assets/images/blog-posts/1.png" },
  { titleKey: "blogPost2Title", image: "/assets/images/blog-posts/2.png" },
  { titleKey: "blogPost3Title", image: "/assets/images/blog-posts/3.png" },
] as const;

export default function BlogSection() {
  const t = useTranslations("Home");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const gridRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="blog"
      className="relative px-4 py-14 md:px-6 lg:px-8 lg:py-20"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="mx-auto flex w-full max-w-310 flex-col items-center gap-14 lg:gap-[84px]">
        {/* Heading */}
        <h2 className="m-0 w-full bg-[linear-gradient(89.18deg,#0CA5F0_15.53%,#FFFFFF_220.84%)] bg-clip-text text-center text-[26px] font-black leading-[1.35] text-transparent min-[500px]:text-[30px] lg:text-[36px]">
          {t("blogTitle")}
        </h2>

        {/* Cards grid */}
        <div ref={gridRef} className="grid w-full grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {POSTS.map((post, idx) => (
            <article
              key={post.titleKey}
              className="relative w-full max-w-[367px] transition-[transform,opacity] duration-700 ease-out"
              style={{
                height: "391.62px",
                transitionDelay: `${idx * 120}ms`,
                transform: visible ? "translate(0, 0)" : "translate(-60px, 60px)",
                opacity: visible ? 1 : 0,
              }}
            >
              {/* Image frame – top 0% → ~71.24% of card, white bg clips the image */}
              <div
                className="absolute inset-x-0 top-0 overflow-hidden rounded-t-[24px] rounded-b-[4px] bg-white"
                style={{ bottom: "28.76%" }}
              >
                <Image
                  src={post.image}
                  alt={t("blogPostImageAlt")}
                  fill
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 367px"
                  className="object-cover object-center"
                  draggable={false}
                />
              </div>

              {/* Dark text frame – top 67.41% → bottom 0%, slightly overlaps image */}
              <div
                className={`absolute bottom-0 flex flex-col justify-between gap-[9px] rounded-t-[4px] rounded-b-[24px] bg-[#13192B] px-6 py-5 ${
                  isArabic ? "items-end text-right" : "items-start text-left"
                }`}
                style={{ top: "67.41%", left: "2.45%", right: "2.45%" }}
              >
                <p className="m-0 text-[16px] leading-[30px] text-white">
                  {t(post.titleKey)}
                </p>

                {/* Circular arrow button */}
                <button
                  className="flex h-[27.62px] w-[27.62px] flex-shrink-0 items-center justify-center rounded-full border border-white text-white transition-colors duration-200 hover:bg-white hover:text-[#13192B] focus:outline-none"
                  aria-label={t("blogPostImageAlt")}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={isArabic ? "" : "rotate-180"}
                  >
                    <path
                      d="M7.5 9L4.5 6L7.5 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
