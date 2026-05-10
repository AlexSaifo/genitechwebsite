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

const CYCLE_MS = 3800;
const TRACK_HEIGHT = 402;
const THUMB_HEIGHT = 156;
const FRAME_WIDTH = 1240;
const FRAME_HEIGHT = 484;
const GESTURE_THRESHOLD = 20;
const GESTURE_DEBOUNCE_MS = 250;

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
  const currentRef = useRef(0);
  const [isSectionActive, setIsSectionActive] = useState(false);
  const isSectionActiveRef = useRef(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const lastGestureAtRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);
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

  const setSectionActive = (nextValue: boolean) => {
    isSectionActiveRef.current = nextValue;
    setIsSectionActive(nextValue);
  };

  useEffect(() => {
    if (isSectionActive) return;

    const id = setInterval(() => {
      goNext();
    }, CYCLE_MS);

    return () => clearInterval(id);
  }, [isSectionActive]);

  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  useEffect(() => {
    const canHandleGesture = (target: EventTarget | null) => {
      const sectionNode = sectionRef.current;
      if (!sectionNode || !isSectionActiveRef.current) return false;
      if (!(target instanceof Node)) return false;
      return sectionNode.contains(target);
    };

    const advanceByDirection = (direction: 1 | -1) => {
      if (direction > 0) {
        setCurrent((prev) => {
          const next = Math.min(prev + 1, slides.length - 1);
          currentRef.current = next;
          return next;
        });
        return;
      }

      setCurrent((prev) => {
        const next = Math.max(prev - 1, 0);
        currentRef.current = next;
        return next;
      });
    };

    const handleGesture = (deltaY: number, event: WheelEvent | TouchEvent) => {
      const magnitude = Math.abs(deltaY);
      if (magnitude < GESTURE_THRESHOLD) {
        event.preventDefault();
        return;
      }

      const direction: 1 | -1 = deltaY > 0 ? 1 : -1;
      const isMovingPastLast = direction > 0 && currentRef.current >= slides.length - 1;
      const isMovingPastFirst = direction < 0 && currentRef.current <= 0;

      if (isMovingPastLast || isMovingPastFirst) {
        setSectionActive(false);
        return;
      }

      event.preventDefault();

      const now = Date.now();
      if (now - lastGestureAtRef.current < GESTURE_DEBOUNCE_MS) return;

      lastGestureAtRef.current = now;
      advanceByDirection(direction);
    };

    const onWheel = (event: WheelEvent) => {
      if (!canHandleGesture(event.target)) return;
      handleGesture(event.deltaY, event);
    };

    const onTouchStart = (event: TouchEvent) => {
      if (!canHandleGesture(event.target)) return;
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!canHandleGesture(event.target)) return;

      const startY = touchStartYRef.current;
      const currentTouchY = event.touches[0]?.clientY;
      if (startY == null || currentTouchY == null) return;

      const deltaY = startY - currentTouchY;
      handleGesture(deltaY, event);

      if (Math.abs(deltaY) >= GESTURE_THRESHOLD) {
        touchStartYRef.current = currentTouchY;
      }
    };

    const onTouchEnd = () => {
      touchStartYRef.current = null;
    };

    document.addEventListener("wheel", onWheel, { capture: true, passive: false });
    window.addEventListener("touchstart", onTouchStart, {
      capture: true,
      passive: true,
    });
    window.addEventListener("touchmove", onTouchMove, {
      capture: true,
      passive: false,
    });
    window.addEventListener("touchend", onTouchEnd, { capture: true });
    window.addEventListener("touchcancel", onTouchEnd, { capture: true });

    return () => {
      document.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("touchstart", onTouchStart, { capture: true });
      window.removeEventListener("touchmove", onTouchMove, { capture: true });
      window.removeEventListener("touchend", onTouchEnd, { capture: true });
      window.removeEventListener("touchcancel", onTouchEnd, { capture: true });
    };
  }, []);

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
    <section
      id="work"
      ref={sectionRef}
      className="relative px-3 py-14 sm:px-4 md:px-6 lg:px-8 lg:py-20"
      onMouseEnter={() => setSectionActive(true)}
      onPointerEnter={() => setSectionActive(true)}
      onPointerLeave={() => setSectionActive(false)}
      onTouchStart={() => setSectionActive(true)}
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
                className="absolute left-1/2 top-1/2 cursor-grab select-none transition-all duration-700 ease-out active:cursor-grabbing"
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

          <div className="absolute right-2 top-1/2 hidden -translate-y-1/2 md:block">
            <div
              ref={trackRef}
              className="relative h-100.5 w-1.5 cursor-pointer rounded-[20px] bg-[#3F4042]"
              onPointerDown={onTrackPointerDown}
              onPointerMove={onTrackPointerMove}
              onPointerUp={onTrackPointerEnd}
              onPointerCancel={onTrackPointerEnd}
              style={{ touchAction: "none" }}
            >
              <span
                className="absolute left-0 top-0 block h-39 w-full cursor-grab rounded-[20px] bg-[linear-gradient(179.98deg,#086EA8_0.02%,#A81E98_196.44%)] transition-transform duration-700 ease-out active:cursor-grabbing"
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
