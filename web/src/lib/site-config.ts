import { defaultSiteConfig } from "@/config/default-site-config";
import type { SiteConfig } from "@/config/site-config-schema";

export function getSiteConfig(): SiteConfig {
  return defaultSiteConfig;
}

/** Google Calendar booking URL — use for every schedule CTA */
export function getScheduleUrl(config: SiteConfig): string {
  return config.schedule.url.trim();
}
