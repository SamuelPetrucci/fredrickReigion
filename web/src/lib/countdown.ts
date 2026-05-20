/** Parse ISO 8601 into a Date, or null if invalid. */
export function parseCountdownTarget(iso: string): Date | null {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d;
}

/**
 * When no `countdown.targetIso` (or env override) is set, the timer counts down
 * to this instant: seven days from first render (placeholder). Set a real
 * interview slot in Admin → `countdown.targetIso` (ISO 8601).
 */
export function getFallbackCountdownTarget(): Date {
  return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
}
