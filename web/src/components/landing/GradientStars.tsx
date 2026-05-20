"use client";

import { useId } from "react";

export function GradientStars({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const gradId = `star-grad-${id}`;

  return (
    <div
      className={`flex gap-0.5 ${className}`}
      role="img"
      aria-label="5 out of 5"
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const gid = `${gradId}-${i}`;
        return (
          <svg
            key={i}
            className="h-4 w-4 shrink-0"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <defs>
              <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#${gid})`}
              d="M12 2l2.9 6.62L22 9.27l-5 4.9L18.18 22 12 18.77 5.82 22 7 14.17l-5-4.9 7.1-1.65L12 2z"
            />
          </svg>
        );
      })}
    </div>
  );
}
