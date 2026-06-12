import { defaultSiteConfig } from "@/config/default-site-config";
import type { SiteConfig } from "@/config/site-config-schema";

export function getSiteConfig(): SiteConfig {
  return defaultSiteConfig;
}
