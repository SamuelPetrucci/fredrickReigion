"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { TeamMember } from "@/config/site-config-schema";
import { TeamMemberCard } from "./TeamMemberCard";

const AUTO_ADVANCE_MS = 8000;
const SWIPE_THRESHOLD_PX = 48;

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const pausedRef = useRef(false);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const goTo = useCallback(
    (index: number) => {
      const next =
        ((index % members.length) + members.length) % members.length;
      if (next === activeIndex) return;

      setIsAnimating(true);
      setActiveIndex(next);

      pausedRef.current = true;
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = setTimeout(() => {
        pausedRef.current = false;
      }, AUTO_ADVANCE_MS * 2);
    },
    [activeIndex, members.length]
  );

  useEffect(() => {
    if (!isAnimating) return;
    const id = window.setTimeout(() => setIsAnimating(false), 500);
    return () => window.clearTimeout(id);
  }, [isAnimating, activeIndex]);

  useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current) return;
      setActiveIndex((current) => {
        const next = (current + 1) % members.length;
        setIsAnimating(true);
        return next;
      });
    }, AUTO_ADVANCE_MS);

    return () => clearInterval(id);
  }, [members.length]);

  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo(activeIndex - 1);
      if (e.key === "ArrowRight") goTo(activeIndex + 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, goTo]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    pausedRef.current = true;
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, AUTO_ADVANCE_MS * 2);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;

    if (
      Math.abs(deltaX) > SWIPE_THRESHOLD_PX &&
      Math.abs(deltaX) > Math.abs(deltaY)
    ) {
      if (deltaX > 0) goTo(activeIndex + 1);
      else goTo(activeIndex - 1);
    }
  };

  return (
    <div
      className="relative mx-auto max-w-3xl"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
    >
      <div
        className="grid overflow-hidden touch-pan-y"
        aria-label="Team testimonials"
        role="region"
        aria-live="polite"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {members.map((member, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={member.name}
              className={`col-start-1 row-start-1 transition-all duration-500 ease-in-out ${
                isActive
                  ? "z-10 translate-x-0 opacity-100"
                  : "z-0 translate-x-6 opacity-0 pointer-events-none"
              }`}
              aria-hidden={!isActive}
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${members.length}: ${member.name}`}
            >
              <TeamMemberCard
                member={member}
                scheduleUrl={scheduleUrl}
                badgeLabel={badgeLabel}
                featured
              />
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => goTo(activeIndex - 1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-sm transition-all hover:border-sky-200 hover:bg-sky-50 hover:text-sky-800"
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
                  ? "w-8 bg-gradient-to-r from-cyan-400 to-blue-600"
                  : "w-2.5 bg-zinc-300 hover:bg-zinc-400"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(activeIndex + 1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-sm transition-all hover:border-sky-200 hover:bg-sky-50 hover:text-sky-800"
          aria-label="Next team member"
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
