import React, { useState } from "react";
import { IconRenderer } from "@/assets/icons/iconRenderer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const WorkSprawlSection: React.FC = () => {
  const [activeNode, setActiveNode] = useState<number | null>(null);

  return (
    <section id="work-sprawl" className=" overflow-hidden relative ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4 mb-8 sm:mb-24">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-[1.18]">
            60% من وقت مناديب التوزيع يضيع بسبب تشتت وسائل التواصل،{" "}
            <br className="hidden sm:block" />
            <span className="text-muted-foreground">
              والطلبيات اليدوية تُسبب فوضى في المخزون
            </span>
          </h2>
          <p className="text-base sm:text-xl font-bold text-muted-foreground max-w-2xl mx-auto">
            تعدد قنوات التواصل، دفاتر الفواتير الورقية، وانعدام الربط مع
            المستودع — كل ذلك يعطّل نمو أعمالك.
          </p>
        </div>

        {/* Central Graphic Container with Tangled Ribbon Illustration */}
        <div className="relative max-w-5xl mx-auto mb-12">
          {/* ===================== MOBILE: VERTICAL RIBBON (top to bottom) ===================== */}
          <div className="relative w-full h-[560px] sm:hidden overflow-hidden select-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[320px] h-[560px]">
              <svg
                viewBox="0 0 320 560"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                {/* Soft glow path behind */}
                <path
                  d="M 160 30 C 100 30, 70 70, 90 110 C 110 150, 220 140, 230 90 C 238 55, 190 45, 175 75 C 160 105, 210 130, 230 170 C 248 205, 200 230, 165 220 C 130 210, 130 260, 170 270 C 210 280, 220 320, 190 340 C 160 360, 110 350, 110 390 C 110 425, 160 430, 170 465 C 178 495, 150 510, 160 540"
                  stroke="var(--muted)"
                  strokeWidth="24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-70"
                />
                <path
                  d="M 160 30 C 100 30, 70 70, 90 110 C 110 150, 220 140, 230 90 C 238 55, 190 45, 175 75 C 160 105, 210 130, 230 170 C 248 205, 200 230, 165 220 C 130 210, 130 260, 170 270 C 210 280, 220 320, 190 340 C 160 360, 110 350, 110 390 C 110 425, 160 430, 170 465 C 178 495, 150 510, 160 540"
                  stroke="var(--border)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M 160 30 C 100 30, 70 70, 90 110 C 110 150, 220 140, 230 90 C 238 55, 190 45, 175 75 C 160 105, 210 130, 230 170 C 248 205, 200 230, 165 220 C 130 210, 130 260, 170 270 C 210 280, 220 320, 190 340 C 160 360, 110 350, 110 390 C 110 425, 160 430, 170 465 C 178 495, 150 510, 160 540"
                  stroke="var(--background)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Top Cluster: App Icons */}
              <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-40 h-32 flex items-center justify-center">
                {/* WhatsApp */}
                <Card className="absolute -top-1 left-2 size-9 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30 items-center justify-center transform -rotate-6">
                  <IconRenderer name="whatsapp_filled" className="w-4 h-4" />
                </Card>
                {/* Excel */}
                <Card className="absolute top-1 right-3 size-9 rounded-xl bg-info text-info-foreground shadow-lg shadow-info/30 items-center justify-center transform rotate-12">
                  <IconRenderer name="report_filled" className="w-4 h-4" />
                </Card>
                {/* Phone calls */}
                <Card className="absolute bottom-2 left-6 size-9 rounded-xl bg-card border-border items-center justify-center transform rotate-6">
                  <IconRenderer
                    name="mobile_outlined"
                    className="w-4 h-4 text-primary"
                  />
                </Card>
                {/* Paper note */}
                <Card className="absolute bottom-6 right-2 size-9 rounded-xl bg-warning text-warning-foreground shadow-lg shadow-warning/30 items-center justify-center transform -rotate-12">
                  <IconRenderer name="sticky_filled" className="w-4 h-4" />
                </Card>
                <Card className="absolute top-10 left-12 size-8 rounded-full bg-destructive/15 text-destructive items-center justify-center">
                  <IconRenderer name="warning_filled" className="w-3.5 h-3.5" />
                </Card>
              </div>

              {/* Middle Cluster: AI Models */}
              <div className="absolute top-[220px] left-1/2 -translate-x-1/2 w-40 h-32 flex items-center justify-center">
                {/* Sparkle AI */}
                <Card className="absolute top-0 left-8 size-10 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25 items-center justify-center">
                  <IconRenderer name="ai_filled" className="w-5 h-5" />
                </Card>
                {/* GPS Tracker */}
                <Card className="absolute top-6 right-4 size-9 rounded-2xl bg-card border-border items-center justify-center">
                  <IconRenderer
                    name="pin_filled"
                    className="w-4 h-4 text-primary"
                  />
                </Card>
                {/* Warehouse Sync */}
                <Card className="absolute bottom-8 left-10 size-9 rounded-2xl bg-foreground text-background shadow-lg shadow-foreground/20 items-center justify-center">
                  <IconRenderer name="bundle_filled" className="w-4 h-4" />
                </Card>
                {/* Brain Smart Matching */}
                <Card className="absolute bottom-2 right-6 size-9 rounded-2xl bg-secondary text-secondary-foreground shadow-lg items-center justify-center">
                  <IconRenderer name="automation_filled" className="w-4 h-4" />
                </Card>
              </div>

              {/* Bottom Cluster: Speech bubbles */}
              <div className="absolute top-[420px] left-1/2 -translate-x-1/2 w-56 h-36">
                <Badge
                  variant="outline"
                  className="absolute top-0 left-0 h-auto whitespace-normal bg-card/95 backdrop-blur-sm border-border px-3 py-1 text-[11px] font-bold text-foreground shadow-md transform -rotate-3"
                >
                  أين وصل المندوب؟
                </Badge>
                <Badge
                  variant="outline"
                  className="absolute top-10 right-0 h-auto whitespace-normal bg-card/95 backdrop-blur-sm border-border px-3 py-1 text-[11px] font-bold text-foreground shadow-md transform rotate-2"
                >
                  هل المنتج متوفر في المستودع؟
                </Badge>
                <Badge
                  variant="outline"
                  className="absolute bottom-0 left-8 h-auto whitespace-normal bg-card/95 backdrop-blur-sm border-border px-3 py-1 text-[11px] font-bold text-foreground shadow-md transform -rotate-1"
                >
                  تأكيد الفاتورة الضريبية
                </Badge>
              </div>
            </div>
          </div>

          {/* ===================== DESKTOP/TABLET: HORIZONTAL RIBBON (original) ===================== */}
          <div className="hidden sm:block relative w-full h-[146px] md:h-[182px] lg:h-[260px] overflow-hidden select-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[260px] origin-top scale-[0.56] md:scale-[0.7] lg:scale-100">
              <svg
                viewBox="0 0 1000 260"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                {/* Soft glow path behind */}
                <path
                  d="M 50 140 C 150 140, 180 80, 240 80 C 300 80, 260 200, 220 200 C 180 200, 180 110, 260 120 C 340 130, 420 120, 500 120 C 560 120, 540 60, 500 60 C 460 60, 460 180, 520 180 C 580 180, 560 120, 640 130 C 720 140, 760 110, 800 110 C 840 110, 830 190, 780 190 C 730 190, 740 100, 820 120 C 880 135, 920 135, 950 135"
                  stroke="var(--muted)"
                  strokeWidth="28"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-70"
                />
                <path
                  d="M 50 140 C 150 140, 180 80, 240 80 C 300 80, 260 200, 220 200 C 180 200, 180 110, 260 120 C 340 130, 420 120, 500 120 C 560 120, 540 60, 500 60 C 460 60, 460 180, 520 180 C 580 180, 560 120, 640 130 C 720 140, 760 110, 800 110 C 840 110, 830 190, 780 190 C 730 190, 740 100, 820 120 C 880 135, 920 135, 950 135"
                  stroke="var(--border)"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M 50 140 C 150 140, 180 80, 240 80 C 300 80, 260 200, 220 200 C 180 200, 180 110, 260 120 C 340 130, 420 120, 500 120 C 560 120, 540 60, 500 60 C 460 60, 460 180, 520 180 C 580 180, 560 120, 640 130 C 720 140, 760 110, 800 110 C 840 110, 830 190, 780 190 C 730 190, 740 100, 820 120 C 880 135, 920 135, 950 135"
                  stroke="var(--background)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Left Cluster: App Icons floating inside the tangled knot */}
              <div className="absolute top-[40px] left-[150px] w-48 h-36 flex items-center justify-center">
                {/* WhatsApp */}
                <Card className="absolute -top-1 left-2 size-9 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30 items-center justify-center transform -rotate-6 hover:scale-110 transition-transform">
                  <IconRenderer name="whatsapp_filled" className="w-4 h-4" />
                </Card>
                {/* Excel */}
                <Card className="absolute top-1 right-3 size-9 rounded-xl bg-info text-info-foreground shadow-lg shadow-info/30 items-center justify-center transform rotate-12 hover:scale-110 transition-transform">
                  <IconRenderer name="report_filled" className="w-4 h-4" />
                </Card>
                {/* Phone calls */}
                <Card className="absolute bottom-2 left-6 size-9 rounded-xl bg-card border-border items-center justify-center transform rotate-6 hover:scale-110 transition-transform">
                  <IconRenderer
                    name="mobile_outlined"
                    className="w-4 h-4 text-primary"
                  />
                </Card>
                {/* Paper note */}
                <Card className="absolute bottom-6 right-2 size-9 rounded-xl bg-warning text-warning-foreground shadow-lg shadow-warning/30 items-center justify-center transform -rotate-12 hover:scale-110 transition-transform">
                  <IconRenderer name="sticky_filled" className="w-4 h-4" />
                </Card>
                <Card className="absolute top-10 left-12 size-8 rounded-full bg-destructive/15 text-destructive items-center justify-center">
                  <IconRenderer name="warning_filled" className="w-3.5 h-3.5" />
                </Card>
              </div>

              {/* Center Cluster: AI Models floating inside knot */}
              <div className="absolute top-[40px] left-[420px] w-48 h-36 flex items-center justify-center">
                {/* Sparkle AI */}
                <Card className="absolute top-0 left-8 size-10 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25 items-center justify-center hover:scale-110 transition-transform">
                  <IconRenderer name="ai_filled" className="w-5 h-5" />
                </Card>
                {/* GPS Tracker */}
                <Card className="absolute top-6 right-4 size-9 rounded-2xl bg-card border-border items-center justify-center hover:scale-110 transition-transform">
                  <IconRenderer
                    name="pin_filled"
                    className="w-4 h-4 text-primary"
                  />
                </Card>
                {/* Warehouse Sync */}
                <Card className="absolute bottom-8 left-10 size-9 rounded-2xl bg-foreground text-background shadow-lg shadow-foreground/20 items-center justify-center hover:scale-110 transition-transform">
                  <IconRenderer name="bundle_filled" className="w-4 h-4" />
                </Card>
                {/* Brain Smart Matching */}
                <Card className="absolute bottom-2 right-6 size-9 rounded-2xl bg-secondary text-secondary-foreground shadow-lg items-center justify-center hover:scale-110 transition-transform">
                  <IconRenderer name="automation_filled" className="w-4 h-4" />
                </Card>
              </div>

              {/* Right Cluster: Floating speech bubbles inside knot */}
              <div className="absolute top-[30px] right-[100px] w-56 h-40">
                <Badge
                  variant="outline"
                  className="absolute top-0 left-0 h-auto whitespace-normal bg-card/95 backdrop-blur-sm border-border px-3 py-1 text-[11px] font-bold text-foreground shadow-md transform -rotate-3 hover:scale-105 transition-transform"
                >
                  أين وصل المندوب؟
                </Badge>
                <Badge
                  variant="outline"
                  className="absolute top-8 right-0 h-auto whitespace-normal bg-card/95 backdrop-blur-sm border-border px-3 py-1 text-[11px] font-bold text-foreground shadow-md transform rotate-2 hover:scale-105 transition-transform"
                >
                  هل المنتج متوفر في المستودع؟
                </Badge>
                <Badge
                  variant="outline"
                  className="absolute bottom-4 left-6 h-auto whitespace-normal bg-card/95 backdrop-blur-sm border-border px-3 py-1 text-[11px] font-bold text-foreground shadow-md transform -rotate-1 hover:scale-105 transition-transform"
                >
                  تأكيد الفاتورة الضريبية
                </Badge>
              </div>
            </div>
          </div>

          {/* 3 Metric Cards Under the Tangle */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-6 mt-4 pt-6 border-t md:border-t-0 border-border text-right">
            {/* Column 1: Context Switching */}
            <Card
              onMouseEnter={() => setActiveNode(1)}
              onMouseLeave={() => setActiveNode(null)}
              className="p-6 rounded-2xl border-0 border-r-2 border-border hover:border-primary bg-transparent hover:bg-primary/5 shadow-none transition-all duration-300 group"
            >
              <CardContent className="p-0">
                <div className="text-xl sm:text-2xl font-black text-foreground mb-2">
                  تشتت قنوات التواصل
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-bold">
                  ضياع الطلبيات بين رسائل الواتساب والمكالمات يقلل كفاءة المندوب
                  بنسبة تصل إلى{" "}
                  <strong className="font-black text-foreground text-base">
                    35%
                  </strong>
                </p>
              </CardContent>
            </Card>

            {/* Column 2: Context Missing */}
            <Card
              onMouseEnter={() => setActiveNode(2)}
              onMouseLeave={() => setActiveNode(null)}
              className="p-6 rounded-2xl border-0 border-r-2 border-border hover:border-primary bg-transparent hover:bg-primary/5 shadow-none transition-all duration-300 group"
            >
              <CardContent className="p-0">
                <div className="text-xl sm:text-2xl font-black text-foreground mb-2">
                  نقص الرؤية الجغرافية
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-bold">
                  <strong className="font-black text-foreground text-base">
                    80% من الشركات
                  </strong>{" "}
                  تعاني من صعوبة التحقق الفعلي من وصول المناديب، وتثبيت مواقع
                  الزبائن على الخريطة
                </p>
              </CardContent>
            </Card>

            {/* Column 3: Context Stitching */}
            <Card
              onMouseEnter={() => setActiveNode(3)}
              onMouseLeave={() => setActiveNode(null)}
              className="p-6 rounded-2xl border-0 border-r-2 border-border hover:border-primary bg-transparent hover:bg-primary/5 shadow-none transition-all duration-300 group"
            >
              <CardContent className="p-0">
                <div className="text-xl sm:text-2xl font-black text-foreground mb-2">
                  مطابقة العهدة والفواتير
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-bold">
                  <strong className="font-black text-foreground text-base">
                    ساعتان ونصف يومياً
                  </strong>{" "}
                  تُهدر في مراجعة فواتير الإدخال، مرتجعات البضاعة، وتسوية العُهد
                  المالية
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
