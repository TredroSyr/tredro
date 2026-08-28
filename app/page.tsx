"use client";
import { FeatureGrid } from "@/components/feature-grid";
import { HeroSection } from "@/components/hero";
import { RepPhoneInspectSection } from "@/components/rep-phone-Inspect";
import { WorkSprawlSection } from "@/components/work-sprawl-section";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Tredro",
            url: "https://tredro.online",
            logo: "https://tredro.online/logo.png",
            sameAs: [
              "https://www.facebook.com/tredro",
              "https://www.instagram.com/tredro",
            ],
          }),
        }}
      />
      <HeroSection />
      <WorkSprawlSection />
      <RepPhoneInspectSection />
      <FeatureGrid />
    </>
  );
}
