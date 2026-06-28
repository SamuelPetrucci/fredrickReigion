import { LandingPage } from "@/components/landing/LandingPage";
import { ApplyModalProvider } from "@/components/landing/ApplyModalProvider";
import { getSiteConfig } from "@/lib/site-config";

export default function Home() {
  const config = getSiteConfig();
  return (
    <ApplyModalProvider
      apply={config.apply}
      applySectionId={config.nav.applySectionId}
    >
      <LandingPage config={config} />
    </ApplyModalProvider>
  );
}
