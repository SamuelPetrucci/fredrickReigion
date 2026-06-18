"use client";

import { CountUp } from "./CountUp";

type StatValueProps = {
  value: string;
  gradient: boolean;
};

export function StatValue({ value, gradient }: StatValueProps) {
  return (
    <CountUp
      value={value}
      className={
        gradient
          ? "text-gradient-gold font-extrabold"
          : "font-extrabold text-zinc-100"
      }
    />
  );
}
