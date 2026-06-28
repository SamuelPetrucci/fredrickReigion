"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SWIPE_THRESHOLD_PX = 40;
const AXIS_LOCK_THRESHOLD_PX = 10;

type UseCarouselSwipeOptions = {
  length: number;
  autoAdvanceMs?: number;
};

type GestureAxis = "none" | "horizontal" | "vertical";

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
  const gestureAxis = useRef<GestureAxis>("none");

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

  const resetGesture = useCallback(() => {
    gestureAxis.current = "none";
    pointerId.current = null;
    dragOffsetRef.current = 0;
    setDragOffset(0);
    setIsDragging(false);
  }, []);

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
    gestureAxis.current = "none";
    dragOffsetRef.current = 0;
    setDragOffset(0);
    setIsDragging(false);
    pauseAutoAdvance();
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (pointerId.current !== e.pointerId) return;

    const deltaX = e.clientX - pointerStartX.current;
    const deltaY = e.clientY - pointerStartY.current;

    if (gestureAxis.current === "none") {
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      if (
        absX < AXIS_LOCK_THRESHOLD_PX &&
        absY < AXIS_LOCK_THRESHOLD_PX
      ) {
        return;
      }

      if (absY > absX) {
        gestureAxis.current = "vertical";
        return;
      }

      gestureAxis.current = "horizontal";
      setIsDragging(true);
      e.currentTarget.setPointerCapture(e.pointerId);
    }

    if (gestureAxis.current === "vertical") return;

    e.preventDefault();
    dragOffsetRef.current = deltaX;
    setDragOffset(deltaX);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (pointerId.current !== e.pointerId) return;

    if (gestureAxis.current === "horizontal") {
      const offset = dragOffsetRef.current;
      if (offset < -SWIPE_THRESHOLD_PX) goTo(activeIndexRef.current + 1);
      else if (offset > SWIPE_THRESHOLD_PX) goTo(activeIndexRef.current - 1);
    }

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    resetGesture();
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
