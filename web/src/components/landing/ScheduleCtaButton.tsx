import Link from "next/link";
import type { ReactNode } from "react";

type ScheduleCtaButtonProps = {
  href: string;
  children: ReactNode;
  external?: boolean;
  size?: "default" | "large";
  fullWidth?: boolean;
  className?: string;
};

export function ScheduleCtaButton({
  href,
  children,
  external = false,
  size = "default",
  fullWidth = false,
  className = "",
}: ScheduleCtaButtonProps) {
  const sizeClasses =
    size === "large"
      ? "px-10 py-5 text-base sm:px-12 sm:py-5"
      : "px-8 py-4 text-sm";

  return (
    <Link
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={`group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 font-bold uppercase tracking-wide text-white shadow-lg shadow-sky-500/35 ring-2 ring-sky-400/25 transition-all duration-300 ease-out hover:-translate-y-1 hover:from-cyan-300 hover:via-sky-400 hover:to-blue-500 hover:shadow-xl hover:shadow-sky-500/45 hover:ring-sky-300/50 active:translate-y-0 active:shadow-lg ${sizeClasses} ${
        fullWidth ? "w-full sm:w-auto" : ""
      } ${className}`}
    >
      <span
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        aria-hidden
      />
      <span className="relative">{children}</span>
      <span className="relative text-lg transition-transform duration-300 group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}
