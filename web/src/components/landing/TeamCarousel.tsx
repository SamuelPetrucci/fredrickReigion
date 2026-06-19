"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import type { TeamMember } from "@/config/site-config-schema";
import { useCarouselSwipe } from "@/lib/use-carousel-swipe";
import { TeamMemberCard } from "./TeamMemberCard";

type TeamCarouselProps = {
  members: TeamMember[];
  scheduleUrl: string;
  badgeLabel: string;
};

export function TeamCarousel({
  members,
  scheduleUrl,
  badgeLabel,
}: TeamCarouselProps) {
  const { activeIndex, goTo, pauseAutoAdvance, trackStyle, swipeHandlers } =
    useCarouselSwipe({ length: members.length, autoAdvanceMs: 8000 });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo(activeIndex - 1);
      if (e.key === "ArrowRight") goTo(activeIndex + 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, goTo]);

  return (
    <div
      className="relative mx-auto max-w-3xl"
      onMouseEnter={pauseAutoAdvance}
      onMouseLeave={() => {}}
    >
      <div
        className="overflow-hidden rounded-2xl"
        role="region"
        aria-label="Team testimonials"
        aria-roledescription="carousel"
        aria-live="polite"
      >
        <div
          className="cursor-grab touch-pan-x active:cursor-grabbing"
          {...swipeHandlers}
        >
          <div className="flex" style={trackStyle}>
            {members.map((member, index) => (
              <div
                key={member.name}
                className="w-full shrink-0 px-1 sm:px-2"
                aria-hidden={index !== activeIndex}
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${members.length}: ${member.name}`}
              >
                <TeamMemberCard
                  member={member}
                  scheduleUrl={scheduleUrl}
                  badgeLabel={badgeLabel}
                featured
                showCta
              />
              </div>
            ))}
          </div>
        </div>
      </div>

      {members.length > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-sm transition-all hover:border-amber-200 hover:bg-amber-50 hover:text-amber-900"
            aria-label="Previous team member"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>

          <div
            className="flex items-center gap-2"
            role="tablist"
            aria-label="Team slides"
          >
            {members.map((member, index) => (
              <button
                key={member.name}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Show ${member.name}`}
                onClick={() => goTo(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-8 bg-gradient-to-r from-[#F5E27A] to-[#9A7B2F]"
                    : "w-2.5 bg-zinc-300 hover:bg-zinc-400"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-sm transition-all hover:border-amber-200 hover:bg-amber-50 hover:text-amber-900"
            aria-label="Next team member"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}
