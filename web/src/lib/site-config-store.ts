import { defaultSiteConfig } from "@/config/default-site-config";
import {
  siteConfigSchema,
  type SiteConfig,
} from "@/config/site-config-schema";
import { getRedis } from "@/lib/redis";

export const SITE_CONFIG_REDIS_KEY = "fredrick:site:v1";

function cloneConfig(c: SiteConfig): SiteConfig {
  return JSON.parse(JSON.stringify(c)) as SiteConfig;
}

function parseStored(raw: string): SiteConfig | null {
  try {
    const data: unknown = JSON.parse(raw);
    const parsed = siteConfigSchema.safeParse(data);
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

/** Merge env fallbacks when stored fields are empty (deploy-time overrides). */
export function applyEnvFallbacks(config: SiteConfig): SiteConfig {
  const c = cloneConfig(config);
  const envVideo = process.env.NEXT_PUBLIC_VIDEO_EMBED_SRC?.trim() ?? "";
  const envTarget = process.env.NEXT_PUBLIC_COUNTDOWN_TARGET?.trim() ?? "";
  if (!c.videoEmbedSrc?.trim() && envVideo) c.videoEmbedSrc = envVideo;
  if (!c.countdown.targetIso?.trim() && envTarget) {
    c.countdown = { ...c.countdown, targetIso: envTarget };
  }
  return c;
}

export async function getSiteConfig(): Promise<SiteConfig> {
  const base = cloneConfig(defaultSiteConfig);
  const redis = getRedis();
  if (!redis) {
    return applyEnvFallbacks(base);
  }
  const raw = await redis.get<string>(SITE_CONFIG_REDIS_KEY);
  if (!raw || typeof raw !== "string") {
    return applyEnvFallbacks(base);
  }
  const parsed = parseStored(raw);
  return applyEnvFallbacks(parsed ?? base);
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

export async function saveSiteConfig(config: SiteConfig): Promise<void> {
  const redis = getRedis();
  if (!redis) {
    throw new Error("UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN must be set");
  }
  const parsed = siteConfigSchema.parse(config);
  await redis.set(SITE_CONFIG_REDIS_KEY, JSON.stringify(parsed));
}
