import { LandingPage } from "@/components/landing/LandingPage";
import { getSiteConfig } from "@/lib/site-config-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const config = await getSiteConfig();
  return <LandingPage config={config} />;
}
