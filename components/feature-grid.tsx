import React, { useState, useRef, useEffect, useCallback } from "react";

import Image from "next/image";
import { IconRenderer } from "@/assets/icons/iconRenderer";
import type { iconName } from "@/assets/icons/iconRenderer/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft } from "lucide-react";

interface GridCellProps {
  name: string;
  icon: iconName;
  onClick?: () => void;
  className?: string;
  isActive?: boolean;
}

const ToolCell: React.FC<GridCellProps> = ({
  name,
  icon,
  onClick,
  className = "",
  isActive = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={`group relative flex flex-col items-center justify-center p-3 sm:p-4 text-center cursor-pointer transition-all duration-200 border-r border-b border-border hover:bg-muted/60 select-none min-h-[100px] sm:min-h-[115px] ${isActive ? "bg-primary/5" : "bg-card"} ${className}`}
    >
      <div className="text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all duration-200 mb-2">
        <IconRenderer name={icon} className="w-5 h-5" />
      </div>
      <span className="text-[11px] sm:text-xs font-bold text-foreground/80 group-hover:text-foreground transition-colors leading-tight px-1 line-clamp-2">
        {name}
      </span>
    </div>
  );
};

export const FeatureGrid: React.FC<{
  onSelectFeature?: (name: string) => void;
}> = ({ onSelectFeature }) => {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  // ---- Scroll affordance state ----
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const hasUserScrolled = useRef(false);

  const handleCellClick = (name: string) => {
    setActiveTab(name);
    if (onSelectFeature) onSelectFeature(name);
  };

  // Recompute which edges are reachable, so the fade masks only show
  // where there's actually more content to reveal. The grid is RTL, so
  // scrollLeft starts at 0 (showing the first/rightmost content) and
  // moves negative as later content is revealed on the left — meaning
  // "room left to scroll" (left mask) and "already scrolled past start"
  // (right mask) are inverted from the usual LTR case.
  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const scrolled = Math.abs(el.scrollLeft);
    setCanScrollLeft(scrolled < maxScroll - 4);
    setCanScrollRight(scrolled > 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();

    const onScroll = () => {
      if (!hasUserScrolled.current) {
        hasUserScrolled.current = true;
        setShowHint(false);
      }
      updateScrollState();
    };

    // Stop the auto-scroll the moment the user takes over — any touch,
    // wheel, or pointer interaction on the scroll area counts.
    const stopAutoScroll = () => {
      hasUserScrolled.current = true;
      setShowHint(false);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("touchstart", stopAutoScroll, { passive: true });
    el.addEventListener("pointerdown", stopAutoScroll, { passive: true });
    el.addEventListener("wheel", stopAutoScroll, { passive: true });

    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(el);

    // Only bother with the hint/loop if the content actually overflows
    // (i.e. we're on a small screen where the grid doesn't fit).
    const isOverflowing = el.scrollWidth > el.clientWidth + 4;
    let startTimeout: ReturnType<typeof setTimeout> | undefined;
    let loopTimeout: ReturnType<typeof setTimeout> | undefined;

    if (isOverflowing) {
      setShowHint(true);

      // Keep gently nudging the grid back and forth until the user
      // scrolls it themselves — a repeating hint rather than a one-off.
      const runNudge = () => {
        const node = scrollRef.current;
        if (hasUserScrolled.current || !node) return;

        node.scrollBy({ left: 90, behavior: "smooth" });
        loopTimeout = setTimeout(() => {
          const n = scrollRef.current;
          if (hasUserScrolled.current || !n) return;
          n.scrollBy({ left: -90, behavior: "smooth" });
          loopTimeout = setTimeout(runNudge, 1800);
        }, 700);
      };

      startTimeout = setTimeout(runNudge, 700);
    }

    return () => {
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("touchstart", stopAutoScroll);
      el.removeEventListener("pointerdown", stopAutoScroll);
      el.removeEventListener("wheel", stopAutoScroll);
      resizeObserver.disconnect();
      if (startTimeout) clearTimeout(startTimeout);
      if (loopTimeout) clearTimeout(loopTimeout);
    };
  }, [updateScrollState]);

  const scrollByAmount = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    hasUserScrolled.current = true;
    setShowHint(false);
    const amount = Math.round(el.clientWidth * 0.7);
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="product"
      className="py-16 sm:py-24 bg-background border-t border-border overflow-hidden relative "
    >
      <div className="max-w-[1440px] mx-auto px-2 sm:px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <h2 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
            جدول ميزات وأدوات منصة{" "}
            <span className="font-sans text-primary">Tredro</span>
          </h2>
          <p className="text-sm sm:text-base font-bold text-muted-foreground">
            تكامل شامل يغطي كل تفاصيل مبيعات الجملة، التوزيع الميداني،
            والمستودعات.
          </p>
        </div>

        {/* Unified Periodic Grid Matrix Container with Left & Right Gradient Blur */}
        <div className="relative w-full">
          {/* Left Edge Fade & Blur Mask — only visible once you've scrolled away from the start */}
          <div
            className={`pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-32 md:w-44 bg-gradient-to-r from-background via-background/80 to-transparent backdrop-blur-[2px] z-20 transition-opacity duration-300 ${
              canScrollLeft ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Right Edge Fade & Blur Mask — only visible while there's more to scroll to */}
          <div
            className={`pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-32 md:w-44 bg-gradient-to-l from-background via-background/80 to-transparent backdrop-blur-[2px] z-20 transition-opacity duration-300 ${
              canScrollRight ? "opacity-100" : "opacity-0"
            }`}
          />

          <div
            ref={scrollRef}
            className="relative w-full overflow-x-auto no-scrollbar rounded-3xl border border-border shadow-xs bg-card"
          >
            {/* 10-Column Unified Grid */}
            <div className="min-w-[1100px] grid grid-cols-10 border-l border-t border-border">
              {/* ================= ROW 1 (10 Items) ================= */}
              <ToolCell
                name="تتبع GPS لحظي"
                icon="location_outlined"
                onClick={() => handleCellClick("تتبع GPS لحظي")}
              />
              <ToolCell
                name="بحث متصل بالباركود"
                icon="tag_outlined"
                onClick={() => handleCellClick("بحث متصل بالباركود")}
              />
              <ToolCell
                name="مهام وزيارات اليوم"
                icon="tick_outlined"
                onClick={() => handleCellClick("مهام وزيارات اليوم")}
              />
              <ToolCell
                name="تخطيط مسار المندوب"
                icon="map_outlined"
                onClick={() => handleCellClick("تخطيط مسار المندوب")}
              />
              <ToolCell
                name="دليل المنتجات"
                icon="book_outlined"
                onClick={() => handleCellClick("دليل المنتجات")}
              />
              <ToolCell
                name="أوامر صوتية بالذكاء الاصطناعي"
                icon="voice_outlined"
                onClick={() => handleCellClick("أوامر صوتية بالذكاء الاصطناعي")}
              />
              <ToolCell
                name="جدول التوريد والتسليم"
                icon="calendar_outlined"
                onClick={() => handleCellClick("جدول التوريد والتسليم")}
              />
              <ToolCell
                name="معاينة الفواتير"
                icon="eye_visible_outlined"
                onClick={() => handleCellClick("معاينة الفواتير")}
              />
              <ToolCell
                name="أرصدة وحسابات الزبائن"
                icon="contacts_outlined"
                onClick={() => handleCellClick("أرصدة وحسابات الزبائن")}
              />
              <ToolCell
                name="قوالب الفواتير الضريبية"
                icon="template_outlined"
                onClick={() => handleCellClick("قوالب الفواتير الضريبية")}
              />

              {/* ================= ROW 2 & 3: LEFT (Cols 1-3) | CENTER 4-5 (REPS) | CENTER 6-7 (INVOICES) | RIGHT (Cols 8-10) ================= */}

              {/* Row 2 - Left 3 cols */}
              <ToolCell
                name="تنبيهات انخفاض المخزون"
                icon="notification_outlined"
                onClick={() => handleCellClick("تنبيهات انخفاض المخزون")}
              />
              <ToolCell
                name="تقارير الأرباح والمبيعات"
                icon="assessments_outlined"
                onClick={() => handleCellClick("تقارير الأرباح والمبيعات")}
              />
              <ToolCell
                name="الهدف الشهري للمبيعات"
                icon="flag_outlined"
                onClick={() => handleCellClick("الهدف الشهري للمبيعات")}
              />

              {/* Center Left Spotlight (Cols 4-5, Rows 2-3): REPS / PROJECTS */}
              <div className="col-span-2 row-span-2 bg-card border-r border-b border-border p-5 sm:p-6 flex flex-col justify-between relative group hover:bg-muted/40 transition-colors text-right">
                {/* Mini Interactive Preview Graphic */}
                <div className="relative pt-2 pb-1">
                  <Card className="rounded-xl border-border shadow-xs p-3 max-w-[240px] mx-auto space-y-2">
                    <div className="flex items-center justify-between gap-1.5">
                      <Badge
                        variant="outline"
                        className="h-auto gap-1 bg-warning/10 text-warning border-warning/20 text-[10px] font-black px-2 py-0.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-warning" />{" "}
                        قيد التوزيع{" "}
                        <span className="text-warning/70 font-normal">5</span>
                      </Badge>
                      <Badge
                        variant="outline"
                        className="h-auto gap-1 bg-primary/10 text-primary border-primary/20 text-[10px] font-black px-2 py-0.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />{" "}
                        تم التسليم{" "}
                        <span className="text-primary/70 font-normal">14</span>
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1.5 border-t border-border">
                      <div className="flex -space-x-1.5">
                        <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center ring-2 ring-background">
                          محمد
                        </div>
                        <div className="w-5 h-5 rounded-full bg-secondary text-secondary-foreground text-[9px] font-bold flex items-center justify-center ring-2 ring-background">
                          أحمد
                        </div>
                        <div className="w-5 h-5 rounded-full bg-foreground text-background text-[9px] font-bold flex items-center justify-center ring-2 ring-background">
                          +3
                        </div>
                      </div>
                      <span className="text-[10px] text-muted-foreground font-bold">
                        مسار دمشق الجنوبي
                      </span>
                    </div>
                  </Card>
                </div>

                {/* Core Feature Title */}
                <div className="flex items-center justify-center gap-2.5 pt-4">
                  <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-xs">
                    <IconRenderer name="bundle_filled" className="w-4 h-4" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                    إدارة المناديب
                  </h3>
                </div>
              </div>

              {/* Center Right Spotlight (Cols 6-7, Rows 2-3): INVOICES / DOCS */}
              <div className="col-span-2 row-span-2 bg-card border-r border-b border-border p-5 sm:p-6 flex flex-col justify-between relative group hover:bg-muted/40 transition-colors text-right">
                {/* Mini Interactive Preview Graphic */}
                <div className="relative pt-2 pb-1 flex justify-center">
                  <div className="relative w-full max-w-[240px]">
                    <Card className="rounded-xl border-border shadow-xs p-3.5 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-[11px] font-bold text-foreground flex items-center gap-1.5">
                          <IconRenderer
                            name="checkout_outlined"
                            className="w-3.5 h-3.5 text-primary"
                          />
                          <span>فاتورة توريد #4810</span>
                        </div>
                        <div className="flex -space-x-1">
                          <span className="w-4 h-4 rounded-full bg-primary text-[8px] text-primary-foreground flex items-center justify-center font-bold">
                            معتمد
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1 pt-1">
                        <div className="h-1.5 bg-muted rounded-full w-full" />
                        <div className="h-1.5 bg-muted rounded-full w-4/5" />
                        <div className="h-1.5 bg-muted rounded-full w-3/5" />
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Core Feature Title */}
                <div className="flex items-center justify-center gap-2.5 pt-4">
                  <div className="w-7 h-7 rounded-lg bg-info flex items-center justify-center text-info-foreground shadow-xs">
                    <IconRenderer name="checkout_filled" className="w-4 h-4" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                    الفواتير والمخزون
                  </h3>
                </div>
              </div>

              {/* Row 2 - Right 3 cols */}
              <ToolCell
                name="توصيل فوري ومتابعة لحظية"
                icon="rocket_outlined"
                onClick={() => handleCellClick("توصيل فوري ومتابعة لحظية")}
              />
              <ToolCell
                name="حالات الطلبيات المخصصة"
                icon="assign_outlined"
                onClick={() => handleCellClick("حالات الطلبيات المخصصة")}
              />
              <ToolCell
                name="عروض الأسعار الآلية"
                icon="edit_outlined"
                onClick={() => handleCellClick("عروض الأسعار الآلية")}
              />

              {/* Row 3 - Left 3 cols */}
              <ToolCell
                name="التكامل مع برامج المحاسبة عبر API"
                icon="code_outlined"
                onClick={() =>
                  handleCellClick("التكامل مع برامج المحاسبة عبر API")
                }
              />
              <ToolCell
                name="محطات التوزيع المركزية"
                icon="pin_outlined"
                onClick={() => handleCellClick("محطات التوزيع المركزية")}
              />
              <ToolCell
                name="نماذج تسجيل المحلات"
                icon="form_outlined"
                onClick={() => handleCellClick("نماذج تسجيل المحلات")}
              />

              {/* Row 3 - Right 3 cols */}
              <ToolCell
                name="أتمتة أوامر الشراء"
                icon="bundle_outlined"
                onClick={() => handleCellClick("أتمتة أوامر الشراء")}
              />
              <ToolCell
                name="حقول تسعير مخصصة"
                icon="customize_outlined"
                onClick={() => handleCellClick("حقول تسعير مخصصة")}
              />
              <ToolCell
                name="سجلات دوام المناديب"
                icon="time_outlined"
                onClick={() => handleCellClick("سجلات دوام المناديب")}
              />

              {/* ================= ROW 4 & 5: LEFT (Cols 1-3) | CENTER 4-5 (BRAIN) | CENTER 6-7 (CHAT) | RIGHT (Cols 8-10) ================= */}

              {/* Row 4 - Left 3 cols */}
              <ToolCell
                name="المساعد الذكي للأسئلة"
                icon="faq_outlined"
                onClick={() => handleCellClick("المساعد الذكي للأسئلة")}
              />
              <ToolCell
                name="أولوية توصيل البضاعة"
                icon="level_outlined"
                onClick={() => handleCellClick("أولوية توصيل البضاعة")}
              />
              <ToolCell
                name="حاسبة عمولات المبيعات"
                icon="money_outlined"
                onClick={() => handleCellClick("حاسبة عمولات المبيعات")}
              />

              {/* Center Left Spotlight (Cols 4-5, Rows 4-5): BRAIN */}
              <div className="col-span-2 row-span-2 bg-card border-r border-b border-border p-5 sm:p-6 flex flex-col justify-between relative group hover:bg-primary/5 transition-colors text-right">
                {/* Mini Interactive Preview Graphic */}
                <div className="relative pt-2 pb-1 flex justify-center">
                  <div className="w-full max-w-[240px] space-y-2">
                    <div className="bg-primary/10 border border-primary/20 rounded-xl px-3 py-1.5 text-center shadow-2xs">
                      <span className="text-[11px] font-bold text-primary">
                        ما هي المنتجات الأكثر طلباً هذا الأسبوع؟
                      </span>
                    </div>
                    <Card className="rounded-xl border-border shadow-xs p-2.5 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-bold">
                        <Image
                          src="/tredro/logo.svg"
                          alt="logo"
                          width={30}
                          height={30}
                          className="transition-transform duration-200 hover:scale-105"
                        />
                        <span>
                          تحليل <strong className="text-foreground">48</strong>{" "}
                          متجراً ونمط الطلب
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] bg-muted px-2 py-1 rounded-md">
                        <span className="font-bold text-foreground flex items-center gap-1">
                          <IconRenderer
                            name="tick_outlined"
                            className="w-3 h-3 text-primary"
                          />
                          حليب 1 لتر كامل الدسم
                        </span>
                        <span className="bg-primary/10 text-primary text-[8px] font-black px-1.5 py-0.5 rounded uppercase">
                          +34% نمو
                        </span>
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Core Feature Title */}
                <div className="flex items-center justify-center gap-2.5 pt-4">
                  <Image
                    src="/tredro/logo.svg"
                    alt="logo"
                    width={30}
                    height={30}
                    className="transition-transform duration-200 hover:scale-105"
                  />
                  <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                    Tredro AI
                  </h3>
                </div>
              </div>

              {/* Center Right Spotlight (Cols 6-7, Rows 4-5): CHAT / ORDERS */}
              <div className="col-span-2 row-span-2 bg-card border-r border-b border-border p-5 sm:p-6 flex flex-col justify-between relative group hover:bg-muted/40 transition-colors text-right">
                {/* Mini Interactive Preview Graphic */}
                <div className="relative pt-2 pb-1 flex justify-center">
                  <div className="w-full max-w-[240px] space-y-2">
                    <Card className="rounded-xl border-border shadow-xs p-2.5 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-info text-info-foreground text-[9px] font-bold flex items-center justify-center">
                          سوبرماركت النخبة
                        </div>
                        <div className="h-2 bg-muted rounded-full w-28" />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center">
                          المندوب سامر
                        </div>
                        <div className="h-2 bg-muted rounded-full w-20" />
                      </div>
                      <div className="flex items-center gap-1.5 pt-1 border-t border-border">
                        <Badge
                          variant="outline"
                          className="h-auto gap-1 bg-primary/10 text-primary border-primary/20 text-[9px] font-bold px-1.5 py-0.5"
                        >
                          <IconRenderer
                            name="cart_outlined"
                            className="w-2.5 h-2.5"
                          />
                          طلب جديد
                        </Badge>
                        <Badge
                          variant="outline"
                          className="h-auto gap-1 bg-info/10 text-info border-info/20 text-[9px] font-bold px-1.5 py-0.5"
                        >
                          <IconRenderer
                            name="whatsapp_outlined"
                            className="w-2.5 h-2.5"
                          />
                          واتساب
                        </Badge>
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Core Feature Title */}
                <div className="flex items-center justify-center gap-2.5 pt-4">
                  <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-xs">
                    <IconRenderer
                      name="chat_conversation_filled"
                      className="w-4 h-4"
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                    طلبيات المحلات
                  </h3>
                </div>
              </div>

              {/* Row 4 - Right 3 cols */}
              <ToolCell
                name="تسجيلات تفقد الرفوف"
                icon="video_outlined"
                onClick={() => handleCellClick("تسجيلات تفقد الرفوف")}
              />
              <ToolCell
                name="لوحة التحكم الشاملة"
                icon="dashbaord_outlined"
                onClick={() => handleCellClick("لوحة التحكم الشاملة")}
              />
              <ToolCell
                name="صلاحيات وأمان الدخول"
                icon="password_outlined"
                onClick={() => handleCellClick("صلاحيات وأمان الدخول")}
              />

              {/* Row 5 - Left 3 cols */}
              <ToolCell
                name="إشعارات المبيعات الفورية"
                icon="mail_outlined"
                onClick={() => handleCellClick("إشعارات المبيعات الفورية")}
              />
              <ToolCell
                name="لوحات مؤشرات الأداء (KPI)"
                icon="overview_outlined"
                onClick={() => handleCellClick("لوحات مؤشرات الأداء (KPI)")}
              />
              <ToolCell
                name="توقيت زيارات المحلات"
                icon="hourglass_outlined"
                onClick={() => handleCellClick("توقيت زيارات المحلات")}
              />

              {/* Row 5 - Right 3 cols */}
              <ToolCell
                name="لوحة كانبان للطلبيات"
                icon="column_outlined_three_column"
                onClick={() => handleCellClick("لوحة كانبان للطلبيات")}
              />
              <ToolCell
                name="التكامل مع ERP والمستودعات"
                icon="automation_outlined"
                onClick={() => handleCellClick("التكامل مع ERP والمستودعات")}
              />
              <ToolCell
                name="حسابات الزبائن والسوبرماركت"
                icon="add_user_outlined"
                onClick={() => handleCellClick("حسابات الزبائن والسوبرماركت")}
              />

              {/* ================= ROW 6 (10 Items) ================= */}
              <ToolCell
                name="تصنيفات المنتجات"
                icon="category_outlined"
                onClick={() => handleCellClick("تصنيفات المنتجات")}
              />
              <ToolCell
                name="دعم فني واستجابة 24/7"
                icon="mobile_outlined"
                onClick={() => handleCellClick("دعم فني واستجابة 24/7")}
              />
              <ToolCell
                name="قوائم فحص السيارات"
                icon="list_outlined"
                onClick={() => handleCellClick("قوائم فحص السيارات")}
              />
              <ToolCell
                name="جدولة خطوط السير"
                icon="reschedule_outlined"
                onClick={() => handleCellClick("جدولة خطوط السير")}
              />
              <ToolCell
                name="تصدير واستيراد إكسل"
                icon="report_outlined"
                onClick={() => handleCellClick("تصدير واستيراد إكسل")}
              />
              <ToolCell
                name="عروض تقديمية للشركات"
                icon="screen_outlined"
                onClick={() => handleCellClick("عروض تقديمية للشركات")}
              />
              <ToolCell
                name="مخططات غانت للتوزيع"
                icon="list_view_outlined"
                onClick={() => handleCellClick("مخططات غانت للتوزيع")}
              />
              <ToolCell
                name="خارطة طريق التوسع"
                icon="map_outlined"
                onClick={() => handleCellClick("خارطة طريق التوسع")}
              />
              <ToolCell
                name="صندوق الوارد والطلبيات"
                icon="message_center_outlined"
                onClick={() => handleCellClick("صندوق الوارد والطلبيات")}
              />
              <ToolCell
                name="فرق عمل المناديب"
                icon="users_outlined"
                onClick={() => handleCellClick("فرق عمل المناديب")}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
