"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { TeamMember } from "@/config/site-config-schema";
import { TeamMemberCard } from "./TeamMemberCard";

const AUTO_ADVANCE_MS = 8000;

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
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const pausedRef = useRef(false);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[index] as HTMLElement | undefined;
    if (!slide) return;
    slide.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
    setActiveIndex(index);
  }, []);

  const pauseAutoAdvance = useCallback(() => {
    pausedRef.current = true;
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, AUTO_ADVANCE_MS * 2);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      pauseAutoAdvance();
      const next =
        ((index % members.length) + members.length) % members.length;
      scrollToIndex(next);
    },
    [members.length, pauseAutoAdvance, scrollToIndex]
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const { scrollLeft, offsetWidth } = track;
      if (offsetWidth === 0) return;
      const index = Math.round(scrollLeft / offsetWidth);
      setActiveIndex(Math.min(Math.max(index, 0), members.length - 1));
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [members.length]);

  useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current) return;
      setActiveIndex((current) => {
        const next = (current + 1) % members.length;
        scrollToIndex(next);
        return next;
      });
    }, AUTO_ADVANCE_MS);

    return () => clearInterval(id);
  }, [members.length, scrollToIndex]);

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

  return (
    <div
      className="relative mx-auto max-w-3xl"
      onMouseEnter={pauseAutoAdvance}
      onTouchStart={pauseAutoAdvance}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-16 bg-gradient-to-r from-white to-transparent sm:block" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-16 bg-gradient-to-l from-white to-transparent sm:block" />

      <div
        ref={trackRef}
        className="team-carousel-track flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
        aria-label="Team testimonials"
        role="region"
      >
        {members.map((member, index) => (
          <div
            key={member.name}
            className="w-full shrink-0 snap-center snap-always px-1 sm:px-2"
            aria-hidden={index !== activeIndex}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${members.length}`}
          >
            <TeamMemberCard
              member={member}
              scheduleUrl={scheduleUrl}
              badgeLabel={badgeLabel}
              featured
            />
          </div>
        ))}
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

        <div className="flex items-center gap-2" role="tablist" aria-label="Team slides">
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
