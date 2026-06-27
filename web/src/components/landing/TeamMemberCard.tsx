import type { TeamMember } from "@/config/site-config-schema";
import { GradientStars } from "./GradientStars";

type TeamMemberCardProps = {
  member: TeamMember;
  badgeLabel?: string;
  compact?: boolean;
  featured?: boolean;
};

export function TeamMemberCard({
  member,
  badgeLabel = "Producer",
  compact = false,
  featured = false,
}: TeamMemberCardProps) {
  return (
    <article
      className={`landing-card flex flex-col rounded-2xl shadow-sm transition-all duration-300 ease-out hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-900/10 ${
        compact ? "p-4" : featured ? "min-h-[22rem] p-8 sm:min-h-[24rem] sm:p-10" : "p-6 hover:-translate-y-1"
      }`}
    >
      <GradientStars className={compact ? "mb-2" : featured ? "mb-5" : "mb-4"} />
      <p
        className={`flex-1 leading-relaxed text-zinc-300 ${
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
        className={`flex flex-wrap items-end justify-between gap-3 border-t border-white/10 ${
          compact ? "mt-3 pt-3" : "mt-6 pt-5"
        }`}
      >
        <div className="min-w-0">
          <p
            className={`font-bold text-white ${compact ? "text-sm" : featured ? "text-lg" : ""}`}
          >
            {member.name}
          </p>
          <p className="text-xs text-zinc-500">{member.tagline}</p>
        </div>
        {!compact && (
          <span className="text-xs font-semibold uppercase tracking-wide text-amber-400">
            {badgeLabel}
          </span>
        )}
      </div>
    </article>
  );
}
