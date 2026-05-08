"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Slide = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

const slides: Slide[] = [
  {
    src: "/assets/images/stepper-images/step1.png",
    width: 1240,
    height: 484,
    alt: "Mobile app showcase slide 1",
  },
  {
    src: "/assets/images/stepper-images/step2.png",
    width: 1281,
    height: 494,
    alt: "Mobile app showcase slide 2",
  },
  {
    src: "/assets/images/stepper-images/step3.png",
    width: 1281,
    height: 494,
    alt: "Mobile app showcase slide 3",
  },
];

const CYCLE_MS = 3800;
const TRACK_HEIGHT = 402;
const THUMB_HEIGHT = 156;

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
  const cardDragRef = useRef<{
    isDragging: boolean;
    startX: number;
    hasSwitched: boolean;
  }>({
    isDragging: false,
    startX: 0,
    hasSwitched: false,
  });
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isTrackDragging, setIsTrackDragging] = useState(false);

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const goPrev = () => {
    setCurrent((prev) => (prev + slides.length - 1) % slides.length);
  };

  useEffect(() => {
    const id = setInterval(() => {
      goNext();
    }, CYCLE_MS);

    return () => clearInterval(id);
  }, []);

  const roleByIndex = useMemo(() => {
    const front = current;
    const middle = (current + slides.length - 1) % slides.length;
    const back = (current + slides.length - 2) % slides.length;

    return slides.map((_, index) => {
      if (index === front) return "front" as const;
      if (index === middle) return "middle" as const;
      return "back" as const;
    });
  }, [current]);

  const thumbOffset =
    slides.length > 1
      ? (current / (slides.length - 1)) * (TRACK_HEIGHT - THUMB_HEIGHT)
      : 0;

  const setSlideFromTrackPointer = (clientY: number) => {
    const node = trackRef.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const maxThumbOffset = TRACK_HEIGHT - THUMB_HEIGHT;
    const relative = Math.max(
      0,
      Math.min(maxThumbOffset, clientY - rect.top - THUMB_HEIGHT / 2),
    );

    const nextIndex = Math.round((relative / maxThumbOffset) * (slides.length - 1));
    setCurrent(nextIndex);
  };

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
    if (Math.abs(deltaX) < 56) return;

    if (deltaX < 0) {
      goNext();
    } else {
      goPrev();
    }

    cardDragRef.current.hasSwitched = true;
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

  const onTrackPointerDown: React.PointerEventHandler<HTMLDivElement> = (event) => {
    setSlideFromTrackPointer(event.clientY);
    setIsTrackDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onTrackPointerMove: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if (!isTrackDragging) return;
    setSlideFromTrackPointer(event.clientY);
  };

  const onTrackPointerEnd: React.PointerEventHandler<HTMLDivElement> = (event) => {
    setIsTrackDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <section id="work" className="relative px-4 py-16 md:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto w-full max-w-[1400px]">
        <div
          className="relative mx-auto h-[574px] w-full max-w-[1320px] overflow-hidden rounded-[32px]"
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
                className="absolute left-1/2 top-1/2 cursor-grab select-none transition-all duration-700 ease-out active:cursor-grabbing"
                style={{
                  width: `${slide.width}px`,
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
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  width={slide.width}
                  height={slide.height}
                  className="h-auto w-full rounded-[28px]"
                  priority={index === current}
                />
              </div>
            );
          })}

          <div className="absolute right-2 top-1/2 hidden -translate-y-1/2 md:block">
            <div
              ref={trackRef}
              className="relative h-[402px] w-1.5 cursor-pointer rounded-[20px] bg-[#3F4042]"
              onPointerDown={onTrackPointerDown}
              onPointerMove={onTrackPointerMove}
              onPointerUp={onTrackPointerEnd}
              onPointerCancel={onTrackPointerEnd}
              style={{ touchAction: "none" }}
            >
              <span
                className="absolute left-0 top-0 block h-[156px] w-full cursor-grab rounded-[20px] bg-[linear-gradient(179.98deg,#086EA8_0.02%,#A81E98_196.44%)] transition-transform duration-700 ease-out active:cursor-grabbing"
                style={{ transform: `translateY(${thumbOffset}px)` }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
