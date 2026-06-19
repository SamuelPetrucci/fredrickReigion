import { defaultSiteConfig } from "@/config/default-site-config";
import type { SiteConfig } from "@/config/site-config-schema";

const DEFAULT_SCHEDULE_URL =
  "https://calendar.app.google/2VmyRRuvzv5a1oM46";

function normalizeScheduleUrl(url: string | undefined): string {
  const trimmed = url?.trim() ?? "";
  if (!trimmed || trimmed === "#" || trimmed === "#schedule") {
    return DEFAULT_SCHEDULE_URL;
  }
  return trimmed;
}

/** Keeps `nav.interviewHref` in sync with `schedule.url` for every CTA. */
export function getSiteConfig(): SiteConfig {
  const scheduleUrl = normalizeScheduleUrl(defaultSiteConfig.schedule.url);
  return {
    ...defaultSiteConfig,
    schedule: {
      ...defaultSiteConfig.schedule,
      url: scheduleUrl,
    },
    nav: {
      ...defaultSiteConfig.nav,
      interviewHref: scheduleUrl,
    },
  };
}

/** Google Calendar booking URL — use for every schedule / appointment CTA */
export function getScheduleUrl(config: SiteConfig): string {
  return normalizeScheduleUrl(
    config.schedule.url?.trim() || config.nav.interviewHref
  );
}
