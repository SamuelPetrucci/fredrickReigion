"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SWIPE_THRESHOLD_PX = 40;

type UseCarouselSwipeOptions = {
  length: number;
  autoAdvanceMs?: number;
};

export function useCarouselSwipe({
  length,
  autoAdvanceMs = 8000,
}: UseCarouselSwipeOptions) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const pausedRef = useRef(false);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointerStartX = useRef(0);
  const pointerStartY = useRef(0);
  const pointerId = useRef<number | null>(null);
  const dragOffsetRef = useRef(0);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const pauseAutoAdvance = useCallback(() => {
    pausedRef.current = true;
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, autoAdvanceMs * 2);
  }, [autoAdvanceMs]);

  const goTo = useCallback(
    (index: number) => {
      const next = ((index % length) + length) % length;
      setActiveIndex(next);
      dragOffsetRef.current = 0;
      setDragOffset(0);
      pauseAutoAdvance();
    },
    [length, pauseAutoAdvance]
  );

  useEffect(() => {
    if (!autoAdvanceMs || length <= 1) return;

    const id = setInterval(() => {
      if (pausedRef.current || isDragging) return;
      setActiveIndex((current) => (current + 1) % length);
    }, autoAdvanceMs);

    return () => clearInterval(id);
  }, [length, autoAdvanceMs, isDragging]);

  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || length <= 1) return;
    pointerId.current = e.pointerId;
    pointerStartX.current = e.clientX;
    pointerStartY.current = e.clientY;
    setIsDragging(true);
    pauseAutoAdvance();
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || pointerId.current !== e.pointerId) return;

    const deltaX = e.clientX - pointerStartX.current;
    const deltaY = e.clientY - pointerStartY.current;

    if (
      Math.abs(deltaY) > Math.abs(deltaX) * 1.2 &&
      Math.abs(deltaY) > SWIPE_THRESHOLD_PX
    ) {
      setIsDragging(false);
      setDragOffset(0);
      e.currentTarget.releasePointerCapture(e.pointerId);
      return;
    }

    if (Math.abs(deltaX) > 8) e.preventDefault();
    dragOffsetRef.current = deltaX;
    setDragOffset(deltaX);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (pointerId.current !== e.pointerId) return;

    const offset = dragOffsetRef.current;
    if (offset < -SWIPE_THRESHOLD_PX) goTo(activeIndexRef.current + 1);
    else if (offset > SWIPE_THRESHOLD_PX) goTo(activeIndexRef.current - 1);
    else {
      dragOffsetRef.current = 0;
      setDragOffset(0);
    }

    setIsDragging(false);
    pointerId.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const trackStyle: React.CSSProperties = {
    transform: `translateX(calc(-${activeIndex * 100}% + ${dragOffset}px))`,
    transition: isDragging
      ? "none"
      : "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)",
  };

  return {
    activeIndex,
    dragOffset,
    isDragging,
    goTo,
    pauseAutoAdvance,
    trackStyle,
    swipeHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
    },
  };
}
