import { Countdown } from "./Countdown";

export function CountdownBar({
  overviewLabel,
  targetIso,
}: {
  overviewLabel: string;
  targetIso: string | null;
}) {
  return (
    <div className="bg-[#0b111d] px-4 py-4 transition-colors duration-500 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 text-sm font-medium text-white sm:text-base">
          <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
          </span>
          <span>{overviewLabel}</span>
        </div>
        <Countdown targetIso={targetIso} />
      </div>
    </div>
  );
}
