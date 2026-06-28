"use client";

import type { ReactNode } from "react";
import { useApplyModal } from "./ApplyModalProvider";

type ApplyCtaButtonProps = {
  children: ReactNode;
  size?: "default" | "large";
  fullWidth?: boolean;
  className?: string;
};

const buttonClass = (
  size: "default" | "large",
  fullWidth: boolean,
  className: string
) => {
  const sizeClasses =
    size === "large"
      ? "px-10 py-5 text-base sm:px-12 sm:py-5"
      : "px-8 py-4 text-sm";

  return `group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-gold-button font-extrabold uppercase tracking-wide text-[#0b111d] shadow-lg shadow-amber-900/30 ring-2 ring-[#b8860b]/50 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-900/40 hover:ring-[#9a7b2f]/60 active:translate-y-0 active:shadow-lg ${sizeClasses} ${
    fullWidth ? "w-full sm:w-auto" : ""
  } ${className}`;
};

export function ApplyCtaButton({
  children,
  size = "default",
  fullWidth = false,
  className = "",
}: ApplyCtaButtonProps) {
  const { openApplyModal } = useApplyModal();
  const classes = buttonClass(size, fullWidth, className);

  return (
    <button
      type="button"
      onClick={openApplyModal}
      className={classes}
      aria-label="Apply — open application form"
    >
      <span
        className="pointer-events-none absolute inset-0 z-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        aria-hidden
      />
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 text-lg transition-transform duration-300 group-hover:translate-x-0.5">
        →
      </span>
    </button>
  );
}
