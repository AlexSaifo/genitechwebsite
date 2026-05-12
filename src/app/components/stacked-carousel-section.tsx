"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Slide = {
  src: string;
  alt: string;
};

const slides: Slide[] = [
  {
    src: "/assets/images/stepper-images/step1.png",
    alt: "Mobile app showcase slide 1",
  },
  {
    src: "/assets/images/stepper-images/step2.png",
    alt: "Mobile app showcase slide 2",
  },
  {
    src: "/assets/images/stepper-images/step3.png",
    alt: "Mobile app showcase slide 3",
  },
];

const TRACK_HEIGHT = 402;
const THUMB_HEIGHT = 156;
const FRAME_WIDTH = 1240;
const FRAME_HEIGHT = 484;
const STICKY_TOP = "8.2rem";
const STICKY_HEIGHT = `calc(100svh - ${STICKY_TOP})`;
const SECTION_HEIGHT = `calc(3 * (100svh - ${STICKY_TOP}))`;

type SlotStyle = {
  offsetY: number;
  scale: number;
  zIndex: number;
  opacity: number;
};

const slotStyles: Record<"front" | "middle" | "back", SlotStyle> = {
  front: { offsetY: 12, scale: 1, zIndex: 30, opacity: 1 },
  middle: { offsetY: -24, scale: 0.992, zIndex: 20, opacity: 0.96 },
  back: { offsetY: -52, scale: 0.978, zIndex: 10, opacity: 0.9 },
};

export default function StackedCarouselSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const updateScrollProgress = () => {
      const section = sectionRef.current;
      const sticky = stickyRef.current;
      if (!section || !sticky) return;

      const sectionRect = section.getBoundingClientRect();
      const stickyRect = sticky.getBoundingClientRect();
      const sectionTop = sectionRect.top + window.scrollY;
      const scrollableDistance = Math.max(1, sectionRect.height - stickyRect.height);
      const nextProgress = Math.max(
        0,
        Math.min(1, (window.scrollY - sectionTop) / scrollableDistance),
      );

      setScrollProgress((prev) =>
        Math.abs(prev - nextProgress) < 0.001 ? prev : nextProgress,
      );
    };

    const scheduleUpdate = () => {
      if (rafRef.current !== null) return;

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        updateScrollProgress();
      });
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("orientationchange", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("orientationchange", scheduleUpdate);

      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  const current = Math.min(
    slides.length - 1,
    Math.floor(scrollProgress * slides.length),
  );

  const roleByIndex = useMemo(() => {
    const front = current;
    const middle = (current + slides.length - 1) % slides.length;

    return slides.map((_, index) => {
      if (index === front) return "front" as const;
      if (index === middle) return "middle" as const;
      return "back" as const;
    });
  }, [current]);

  const thumbOffset =
    slides.length > 1
      ? scrollProgress * (TRACK_HEIGHT - THUMB_HEIGHT)
      : 0;

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative px-3 sm:px-4 md:px-6 lg:px-8"
    >
      <div className="mx-auto w-full max-w-350">
        <div
          className="relative w-full"
          style={{ height: SECTION_HEIGHT }}
        >
          <div
            ref={stickyRef}
            className="sticky flex w-full items-center justify-center"
            style={{ top: STICKY_TOP, height: STICKY_HEIGHT }}
          >
            <div
              className="relative mx-auto h-[clamp(260px,52vw,574px)] w-full max-w-350 overflow-hidden rounded-[20px] sm:rounded-3xl lg:rounded-4xl"
            >
              {slides.map((slide, index) => {
                const role = roleByIndex[index];
                const slot = slotStyles[role];

                return (
                  <div
                    key={slide.src}
                    className="absolute left-1/2 top-1/2 select-none transition-all duration-1000 ease-out motion-reduce:transition-none"
                    style={{
                      width: `min(${FRAME_WIDTH}px, calc(100% - 16px))`,
                      maxWidth: "100%",
                      opacity: slot.opacity,
                      zIndex: slot.zIndex,
                      transform: `translate(-50%, -50%) translateY(${slot.offsetY}px) scale(${slot.scale})`,
                      boxShadow:
                        slot.zIndex === 30
                          ? "0 40px 80px rgba(0,0,0,0.18)"
                          : "0 24px 48px rgba(0,0,0,0.16)",
                    }}
                  >
                    <div
                      className="relative w-full overflow-hidden rounded-[14px] sm:rounded-[18px] lg:rounded-3xl"
                      style={{ aspectRatio: `${FRAME_WIDTH} / ${FRAME_HEIGHT}` }}
                    >
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        sizes="(max-width: 640px) calc(100vw - 4rem), (max-width: 1024px) min(72vw, 560px), 900px"
                        className="object-cover"
                        quality={60}
                        draggable={false}
                      />
                    </div>
                  </div>
                );
              })}

              <div className="absolute right-2 top-1/2 hidden -translate-y-1/2 md:block" aria-hidden="true">
                <div className="relative h-100.5 w-1.5 rounded-[20px] bg-[#3F4042]">
                  <span
                    className="absolute left-0 top-0 block h-39 w-full rounded-[20px] bg-[linear-gradient(179.98deg,#086EA8_0.02%,#A81E98_196.44%)] transition-transform duration-1000 ease-out motion-reduce:transition-none"
                    style={{ transform: `translateY(${thumbOffset}px)` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
