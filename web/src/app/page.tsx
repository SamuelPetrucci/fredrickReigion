import { LandingPage } from "@/components/landing/LandingPage";
import { getSiteConfig } from "@/lib/site-config";

export default function Home() {
  const config = getSiteConfig();
  return <LandingPage config={config} />;
}
