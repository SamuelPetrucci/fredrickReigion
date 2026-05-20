"use client";

import { useEffect, useState } from "react";
import { getFallbackCountdownTarget, parseCountdownTarget } from "@/lib/countdown";

type Unit = { value: number; label: string };

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function getUnits(target: Date): Unit[] {
  const now = Date.now();
  const end = target.getTime();
  const diff = Math.max(0, end - now);
  const sec = Math.floor(diff / 1000);
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const min = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return [
    { value: days, label: "DAYS" },
    { value: hours, label: "HOURS" },
    { value: min, label: "MIN" },
    { value: s, label: "SEC" },
  ];
}

const zeroUnits: Unit[] = [
  { value: 0, label: "DAYS" },
  { value: 0, label: "HOURS" },
  { value: 0, label: "MIN" },
  { value: 0, label: "SEC" },
];

function resolveTargetDate(targetIso: string | null): Date {
  if (targetIso) {
    const parsed = parseCountdownTarget(targetIso);
    if (parsed) return parsed;
  }
  return getFallbackCountdownTarget();
}

export function Countdown({ targetIso }: { targetIso: string | null }) {
  const [units, setUnits] = useState<Unit[]>(zeroUnits);

  useEffect(() => {
    const target = resolveTargetDate(targetIso);
    const tick = () => setUnits(getUnits(target));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [targetIso]);

  return (
    <div className="flex flex-wrap justify-end gap-2 sm:gap-3">
      {units.map((u) => (
        <div key={u.label} className="flex flex-col items-center">
          <div className="flex min-w-[3rem] items-center justify-center rounded-lg bg-white/10 px-2 py-2 text-lg font-bold tabular-nums text-white transition-[transform,opacity] duration-300 ease-out will-change-transform sm:min-w-[3.5rem] sm:text-xl">
            {u.label === "DAYS" ? u.value : pad(u.value)}
          </div>
          <span className="mt-1 text-[10px] font-medium tracking-wide text-zinc-400 transition-colors duration-300">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}
