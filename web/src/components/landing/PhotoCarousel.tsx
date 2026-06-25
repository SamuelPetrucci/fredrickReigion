"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCarouselSwipe } from "@/lib/use-carousel-swipe";

type PhotoCarouselProps = {
  images: string[];
  embedded?: boolean;
};

export function PhotoCarousel({ images, embedded = false }: PhotoCarouselProps) {
  const { activeIndex, goTo, pauseAutoAdvance, trackStyle, swipeHandlers } =
    useCarouselSwipe({ length: images.length, autoAdvanceMs: 6000 });

  if (images.length === 0) return null;

  return (
    <div
      className={`relative ${embedded ? "w-full" : "mx-auto max-w-4xl"}`}
      onMouseEnter={pauseAutoAdvance}
      onMouseLeave={() => {}}
    >
      <div
        className={`relative overflow-hidden rounded-2xl bg-zinc-900 shadow-lg ring-2 ${
          embedded
            ? "shadow-amber-900/20 ring-[#d4af37]/35"
            : "ring-black/5"
        }`}
        role="region"
        aria-label="Office photo gallery"
        aria-roledescription="carousel"
        aria-live="polite"
      >
        <div
          className="relative aspect-[4/3] cursor-grab touch-pan-x active:cursor-grabbing sm:aspect-[16/10]"
          {...swipeHandlers}
        >
          <div className="flex h-full" style={trackStyle}>
            {images.map((src, index) => (
              <div
                key={src}
                className="relative h-full min-w-full flex-[0_0_100%]"
                aria-hidden={index !== activeIndex}
              >
                <Image
                  src={src}
                  alt="Fort Lauderdale office"
                  fill
                  unoptimized
                  className="object-cover select-none"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 896px"
                  priority={index === 0}
                  draggable={false}
                />
              </div>
            ))}
          </div>

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/35 to-transparent"
            aria-hidden
          />
        </div>
      </div>

      {images.length > 1 && (
        <div
          className={`flex items-center justify-center gap-4 ${embedded ? "mt-4" : "mt-5"}`}
        >
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            className="landing-nav-btn flex h-11 w-11 items-center justify-center rounded-full shadow-sm transition-all"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>

          <div
            className="flex max-w-[min(100%,12rem)] flex-wrap items-center justify-center gap-2"
            role="tablist"
            aria-label="Gallery slides"
          >
            {images.map((src, index) => (
              <button
                key={src}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Photo ${index + 1} of ${images.length}`}
                onClick={() => goTo(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-8 bg-gradient-to-r from-[#FFE566] to-[#8B6914]"
                    : "w-2.5 bg-zinc-600 hover:bg-zinc-500"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            className="landing-nav-btn flex h-11 w-11 items-center justify-center rounded-full shadow-sm transition-all"
            aria-label="Next photo"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}
