"use client";

import { useSyncExternalStore } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import {
  getConsent,
  getConsentServerSnapshot,
  subscribeConsent,
} from "@/lib/cookie-consent";

export function GoogleAnalyticsGate({ gaId }: { gaId: string }) {
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsent,
    getConsentServerSnapshot,
  );

  if (consent !== "granted") return null;

  return <GoogleAnalytics gaId={gaId} />;
}
