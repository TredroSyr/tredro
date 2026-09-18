"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Check, Cookie, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  getConsent,
  getConsentServerSnapshot,
  setConsent,
  subscribeConsent,
} from "@/lib/cookie-consent";

export function CookieConsent() {
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsent,
    getConsentServerSnapshot,
  );
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  if (consent !== null) return null;

  function savePreferences() {
    setConsent(analyticsEnabled ? "granted" : "denied");
    setPreferencesOpen(false);
  }

  return (
    <>
      <Card
        id="cookie-consent-banner"
        className="fixed inset-x-4 bottom-4 z-50 max-w-sm gap-4 rounded-2xl p-5 shadow-2xl sm:inset-x-auto sm:start-4"
      >
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Cookie className="size-5" />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="font-heading text-sm font-semibold text-foreground">
              نحن نستخدم ملفات تعريف الارتباط
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              نستخدم ملفات تعريف الارتباط وتقنيات مشابهة لتحسين تجربتك على
              الموقع وتحليل حركة الزيارات. بالنقر على &quot;قبول الكل&quot;
              فإنك توافق على استخدامنا لملفات تعريف الارتباط. اطّلع على{" "}
              <Link
                href="/cookies"
                className="text-primary underline underline-offset-2 hover:text-primary/80"
              >
                سياسة ملفات تعريف الارتباط
              </Link>{" "}
              لمزيد من المعلومات.
            </p>
          </div>
        </div>

        <div className="flex gap-2 sm:hidden">
          <Button
            variant="default"
            size="icon"
            aria-label="قبول الكل"
            onClick={() => setConsent("granted")}
          >
            <Check />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            aria-label="رفض"
            onClick={() => setConsent("denied")}
          >
            <X />
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label="إدارة التفضيلات"
            onClick={() => setPreferencesOpen(true)}
          >
            <SlidersHorizontal />
          </Button>
        </div>

        <div className="hidden gap-2 sm:grid sm:grid-cols-3">
          <Button
            variant="default"
            size="default"
            onClick={() => setConsent("granted")}
          >
            قبول الكل
          </Button>
          <Button
            variant="secondary"
            size="default"
            onClick={() => setConsent("denied")}
          >
            رفض
          </Button>
          <Button
            variant="outline"
            size="default"
            onClick={() => setPreferencesOpen(true)}
          >
            إدارة التفضيلات
          </Button>
        </div>
      </Card>

      <Dialog open={preferencesOpen} onOpenChange={setPreferencesOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إدارة تفضيلات ملفات تعريف الارتباط</DialogTitle>
            <DialogDescription>
              اختر أنواع ملفات تعريف الارتباط التي توافق على استخدامها. يمكنك
              تغيير هذه التفضيلات لاحقاً في أي وقت.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-4 rounded-lg border border-border p-3">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-foreground">
                  ملفات تعريف الارتباط الضرورية
                </span>
                <span className="text-xs text-muted-foreground">
                  ضرورية لعمل الموقع بشكل أساسي، ولا يمكن تعطيلها.
                </span>
              </div>
              <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                دائم التفعيل
              </span>
            </div>

            <div className="flex items-start justify-between gap-4 rounded-lg border border-border p-3">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-foreground">
                  ملفات تعريف الارتباط التحليلية
                </span>
                <span className="text-xs text-muted-foreground">
                  تساعدنا على فهم كيفية استخدام الزوار للموقع لتحسين الأداء
                  والمحتوى.
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={analyticsEnabled}
                aria-label="تفعيل ملفات تعريف الارتباط التحليلية"
                onClick={() => setAnalyticsEnabled((prev) => !prev)}
                className={cn(
                  "flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors",
                  analyticsEnabled
                    ? "justify-end bg-primary"
                    : "justify-start bg-muted",
                )}
              >
                <span className="size-5 rounded-full bg-white shadow" />
              </button>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setConsent("denied")}>
              رفض الكل
            </Button>
            <Button variant="default" onClick={savePreferences}>
              حفظ التفضيلات
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
