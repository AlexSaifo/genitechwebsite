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

const CYCLE_MS = 5000;
const FRAME_WIDTH = 1240;
const FRAME_HEIGHT = 484;
const DRAG_THRESHOLD = 56;

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
  const [current, setCurrent] = useState(0);
  const [autoplayResetKey, setAutoplayResetKey] = useState(0);
  const cardDragRef = useRef<{
    isDragging: boolean;
    startX: number;
    hasSwitched: boolean;
  }>({
    isDragging: false,
    startX: 0,
    hasSwitched: false,
  });

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const goPrev = () => {
    setCurrent((prev) => (prev + slides.length - 1) % slides.length);
  };

  const resetAutoplay = () => {
    setAutoplayResetKey((key) => key + 1);
  };

  useEffect(() => {
    if (slides.length < 2) return;

    const id = window.setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, CYCLE_MS);

    return () => window.clearTimeout(id);
  }, [current, autoplayResetKey]);

  const roleByIndex = useMemo(() => {
    const front = current;
    const middle = (current + slides.length - 1) % slides.length;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const back = (current + slides.length - 2) % slides.length;

    return slides.map((_, index) => {
      if (index === front) return "front" as const;
      if (index === middle) return "middle" as const;
      return "back" as const;
    });
  }, [current]);

  const onCardsPointerDown: React.PointerEventHandler<HTMLDivElement> = (event) => {
    cardDragRef.current = {
      isDragging: true,
      startX: event.clientX,
      hasSwitched: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onCardsPointerMove: React.PointerEventHandler<HTMLDivElement> = (event) => {
    const drag = cardDragRef.current;
    if (!drag.isDragging || drag.hasSwitched) return;

    const deltaX = event.clientX - drag.startX;
    if (Math.abs(deltaX) < DRAG_THRESHOLD) return;

    if (deltaX < 0) {
      goNext();
    } else {
      goPrev();
    }

    cardDragRef.current.hasSwitched = true;
    resetAutoplay();
  };

  const onCardsPointerEnd: React.PointerEventHandler<HTMLDivElement> = (event) => {
    cardDragRef.current = {
      isDragging: false,
      startX: 0,
      hasSwitched: false,
    };

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <section
      id="work"
      className="relative px-3 py-14 sm:px-4 md:px-6 lg:px-8 lg:py-20"
    >
      <div className="mx-auto w-full max-w-350">
        <div
          className="relative mx-auto h-[clamp(260px,52vw,574px)] w-full max-w-350 overflow-hidden rounded-[20px] sm:rounded-3xl lg:rounded-4xl"
          onPointerDown={onCardsPointerDown}
          onPointerMove={onCardsPointerMove}
          onPointerUp={onCardsPointerEnd}
          onPointerCancel={onCardsPointerEnd}
          onPointerLeave={onCardsPointerEnd}
          style={{ touchAction: "pan-y" }}
        >
          {slides.map((slide, index) => {
            const role = roleByIndex[index];
            const slot = slotStyles[role];

            return (
              <div
                key={slide.src}
                className="absolute left-1/2 top-1/2 cursor-grab select-none transition-[transform,opacity,filter,box-shadow] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] active:cursor-grabbing motion-reduce:transition-none"
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
                  filter: slot.zIndex === 30 ? "none" : "saturate(0.88) brightness(0.86)",
                }}
              >
                <div className="relative w-full overflow-hidden rounded-[14px] sm:rounded-[18px] lg:rounded-3xl" style={{ aspectRatio: `${FRAME_WIDTH} / ${FRAME_HEIGHT}` }}>
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

        </div>

        <div className=" flex w-full items-center justify-center ">
          <div className="flex items-center gap-2 rounded-full bg-white/8 px-2.5 py-1.5 ring-1 ring-white/12 backdrop-blur-sm sm:gap-2.5 sm:px-3 sm:py-2">
            {slides.map((slide, index) => {
              const isActive = current === index;

              return (
                <button
                  key={slide.src}
                  type="button"
                  aria-current={isActive ? "page" : undefined}
                  aria-label={`Go to carousel slide ${index + 1}`}
                  className="group flex h-7 w-7 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-6 sm:w-6"
                  onClick={() => {
                    setCurrent(index);
                    resetAutoplay();
                  }}
                >
                  <span
                    className={`block rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                      isActive
                        ? "h-3.5 w-3.5 bg-[linear-gradient(135deg,#086EA8_0%,#A81E98_100%)] shadow-[0_0_18px_rgba(168,30,152,0.58)] sm:h-3 sm:w-3"
                        : "h-2.5 w-2.5 bg-white/45 group-hover:bg-white/75 sm:h-2 sm:w-2"
                    }`}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
