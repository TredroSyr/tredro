"use client";
import { FeatureGrid } from "@/components/feature-grid";
import { HeroSection } from "@/components/hero";
import { RepPhoneInspectSection } from "@/components/rep-phone-Inspect";
import { WorkSprawlSection } from "@/components/work-sprawl-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WorkSprawlSection />
      <RepPhoneInspectSection />
      <FeatureGrid />
    </>
  );
}
