"use client";

import { useId } from "react";
import type { SiteConfig } from "@/config/site-config-schema";

type BrandMarkProps = {
  meta: SiteConfig["meta"];
  badgeRecruiting?: string;
  badgeOffice?: string;
  size?: "default" | "compact";
};

function LogoIcon({
  className,
  gradientId,
}: {
  className?: string;
  gradientId: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden
    >
      <rect width="32" height="32" rx="7" fill="#0B111D" />
      <defs>
        <linearGradient
          id={gradientId}
          x1="4"
          y1="4"
          x2="28"
          y2="28"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#22D3EE" />
          <stop offset="0.55" stopColor="#2563EB" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
      <path
        d="M9 11.5 16 6.5 23 11.5"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="23" cy="8.5" r="1.35" fill="#22D3EE" />
      <text
        x="16"
        y="24.5"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="12.5"
        fontWeight="800"
        letterSpacing="-0.5"
      >
        <tspan fill="#FFFFFF">F</tspan>
        <tspan fill={`url(#${gradientId})`}>R</tspan>
      </text>
    </svg>
  );
}

export function BrandMark({
  meta,
  badgeRecruiting,
  badgeOffice,
  size = "default",
}: BrandMarkProps) {
  const compact = size === "compact";
  const gradientId = useId().replace(/:/g, "");

  return (
    <div
      className={`group relative inline-flex max-w-full items-center gap-3.5 rounded-2xl border border-zinc-200/90 bg-white/80 px-3 py-2.5 shadow-sm shadow-sky-500/5 ring-1 ring-sky-100/60 backdrop-blur-sm transition-all duration-300 hover:border-sky-200/80 hover:shadow-md hover:shadow-sky-500/10 sm:gap-4 sm:px-4 sm:py-3 ${
        compact ? "gap-3 px-3 py-2" : ""
      }`}
    >
      {/* Gradient halo behind logo */}
      <div
        className="pointer-events-none absolute -left-1 top-1/2 h-14 w-14 -translate-y-1/2 rounded-2xl bg-[radial-gradient(circle,rgba(34,211,238,0.25),transparent_70%)] opacity-80 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />

      <div className="relative shrink-0">
        <div
          className={`rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-700 p-[2px] shadow-md shadow-blue-900/20 ${
            compact ? "rounded-lg" : ""
          }`}
        >
          <div
            className={`overflow-hidden rounded-[10px] bg-[#0b111d] ${
              compact ? "h-10 w-10 rounded-[8px]" : "h-12 w-12 sm:h-14 sm:w-14"
            }`}
          >
            <LogoIcon className="h-full w-full" gradientId={gradientId} />
          </div>
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          {(badgeRecruiting || badgeOffice) && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200/80 bg-sky-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-sky-800">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sky-500" />
              </span>
              {badgeRecruiting ?? "Recruiting"}
            </span>
          )}
        </div>

        <p
          className={`truncate font-bold tracking-tight text-[#0b111d] ${
            compact ? "text-sm" : "text-base sm:text-lg"
          }`}
        >
          {meta.brand}
        </p>
        <p
          className={`truncate font-medium text-zinc-600 ${
            compact ? "text-xs" : "text-sm"
          }`}
        >
          {meta.company}
        </p>
        {!compact && (
          <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-zinc-500">
            {meta.division}
          </p>
        )}
        {badgeOffice && !compact && (
          <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
            {badgeOffice}
          </p>
        )}
      </div>
    </div>
  );
}
