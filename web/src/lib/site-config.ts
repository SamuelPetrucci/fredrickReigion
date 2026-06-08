import { defaultSiteConfig } from "@/config/default-site-config";
import type { SiteConfig } from "@/config/site-config-schema";

function applyEnvFallbacks(config: SiteConfig): SiteConfig {
  const envVideo = process.env.NEXT_PUBLIC_VIDEO_EMBED_SRC?.trim() ?? "";
  const envTarget = process.env.NEXT_PUBLIC_COUNTDOWN_TARGET?.trim() ?? "";
  return {
    ...config,
    videoEmbedSrc: config.videoEmbedSrc?.trim() || envVideo,
    countdown: {
      ...config.countdown,
      targetIso: config.countdown.targetIso?.trim() || envTarget,
    },
  };
}

/** Static site content — edit `src/config/default-site-config.ts` to change copy. */
export function getSiteConfig(): SiteConfig {
  return applyEnvFallbacks(defaultSiteConfig);
}

export function getResolvedVideoEmbedSrc(config: SiteConfig): string | null {
  const v = config.videoEmbedSrc?.trim();
  return v && v.length > 0 ? v : null;
}

export function getResolvedCountdownTargetIso(
  config: SiteConfig
): string | null {
  const t = config.countdown.targetIso?.trim();
  return t && t.length > 0 ? t : null;
}
