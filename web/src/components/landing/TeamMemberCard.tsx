import type { TeamMember } from "@/config/site-config-schema";
import { GradientStars } from "./GradientStars";
import { ScheduleCtaButton } from "./ScheduleCtaButton";

type TeamMemberCardProps = {
  member: TeamMember;
  scheduleUrl: string;
  badgeLabel?: string;
  compact?: boolean;
  featured?: boolean;
  showCta?: boolean;
};

export function TeamMemberCard({
  member,
  scheduleUrl,
  badgeLabel = "Schedule",
  compact = false,
  featured = false,
  showCta = true,
}: TeamMemberCardProps) {
  return (
    <article
      className={`flex flex-col rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 ease-out hover:border-sky-200/80 hover:shadow-lg ${
        compact ? "p-4" : featured ? "min-h-[22rem] p-8 sm:min-h-[24rem] sm:p-10" : "p-6 hover:-translate-y-1"
      }`}
    >
      <GradientStars className={compact ? "mb-2" : featured ? "mb-5" : "mb-4"} />
      <p
        className={`flex-1 leading-relaxed text-zinc-600 ${
          compact
            ? "line-clamp-4 text-xs"
            : featured
              ? "text-base sm:text-lg"
              : "text-sm"
        }`}
      >
        &ldquo;{member.quote}&rdquo;
      </p>
      <div
        className={`flex flex-wrap items-end justify-between gap-3 border-t border-zinc-100 ${
          compact ? "mt-3 pt-3" : "mt-6 pt-5"
        }`}
      >
        <div className="min-w-0">
          <p
            className={`font-bold text-[#0b111d] ${compact ? "text-sm" : featured ? "text-lg" : ""}`}
          >
            {member.name}
          </p>
          <p className="text-xs text-zinc-500">{member.tagline}</p>
        </div>
        {!compact && (
          <span className="text-xs font-semibold uppercase tracking-wide text-sky-700">
            {badgeLabel}
          </span>
        )}
      </div>
      {showCta && !compact && !featured && (
        <div className="mt-4">
          <ScheduleCtaButton href={scheduleUrl} external fullWidth>
            Schedule your interview
          </ScheduleCtaButton>
        </div>
      )}
    </article>
  );
}
