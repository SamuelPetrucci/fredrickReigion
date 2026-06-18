"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ParsedStat = {
  prefix: string;
  number: number;
  suffix: string;
  decimals: number;
  useGrouping: boolean;
};

function parseStatValue(value: string): ParsedStat {
  const trimmed = value.trim();
  const match = trimmed.match(/^([^0-9]*)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return {
      prefix: "",
      number: 0,
      suffix: trimmed,
      decimals: 0,
      useGrouping: false,
    };
  }

  const [, prefix, numStr, suffix] = match;
  const cleanNum = numStr.replace(/,/g, "");
  const decimals = cleanNum.includes(".")
    ? (cleanNum.split(".")[1]?.length ?? 0)
    : 0;

  return {
    prefix,
    number: parseFloat(cleanNum),
    suffix,
    decimals,
    useGrouping: numStr.includes(","),
  };
}

function formatNumber(
  n: number,
  decimals: number,
  useGrouping: boolean
): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping,
  });
}

function easeOutQuart(t: number): number {
  return 1 - (1 - t) ** 4;
}

function initialDisplay(parsed: ParsedStat): string {
  return `${parsed.prefix}${formatNumber(0, parsed.decimals, parsed.useGrouping)}${parsed.suffix}`;
}

type CountUpProps = {
  value: string;
  className?: string;
};

export function CountUp({ value, className = "" }: CountUpProps) {
  const parsed = useMemo(() => parseStatValue(value), [value]);
  const ref = useRef<HTMLSpanElement>(null);
  const hasStarted = useRef(false);
  const [display, setDisplay] = useState(() => initialDisplay(parsed));

  useEffect(() => {
    setDisplay(initialDisplay(parsed));
    hasStarted.current = false;
  }, [parsed]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) {
      setDisplay(value);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hasStarted.current) return;
        hasStarted.current = true;
        obs.disconnect();

        const duration = 2000;
        const start = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = easeOutQuart(progress);
          const current = parsed.number * eased;

          setDisplay(
            `${parsed.prefix}${formatNumber(current, parsed.decimals, parsed.useGrouping)}${parsed.suffix}`
          );

          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [value, parsed]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
