"use client";

import { Button } from "@/components/ui/button";
import { clearConsent } from "@/lib/cookie-consent";

export function CookiePreferencesButton() {
  return (
    <Button variant="outline" onClick={clearConsent}>
      تعديل تفضيلات ملفات تعريف الارتباط
    </Button>
  );
}
