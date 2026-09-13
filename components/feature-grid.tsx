import React, { useState, useRef, useEffect, useCallback } from "react";

import Image from "next/image";
import { IconRenderer } from "@/assets/icons/iconRenderer";
import type { iconName } from "@/assets/icons/iconRenderer/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const hasUserScrolled = useRef(false);

  const handleCellClick = (name: string) => {
    setActiveTab(name);
    if (onSelectFeature) onSelectFeature(name);
  };

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

    const isOverflowing = el.scrollWidth > el.clientWidth + 4;
    let startTimeout: ReturnType<typeof setTimeout> | undefined;
    let loopTimeout: ReturnType<typeof setTimeout> | undefined;

    if (isOverflowing) {
      setShowHint(true);

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
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <h2 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
            جدول ميزات وأدوات منصة{" "}
            <span className="text-primary text-3xl sm:text-5xl font-black  tracking-tight">
              Tredro
            </span>
          </h2>
          <p className="text-sm sm:text-base font-bold text-muted-foreground">
            تكامل شامل يغطي كل تفاصيل مبيعات الجملة، التوزيع الميداني،
            والمستودعات.
          </p>
        </div>

        <div className="relative w-full">
          <div
            className={`hidden lg:block pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-32 md:w-44 bg-gradient-to-r from-background via-background/80 to-transparent backdrop-blur-[2px] z-20 transition-opacity duration-300 ${
              canScrollLeft ? "opacity-100" : "opacity-0"
            }`}
          />

          <div
            className={`hidden lg:block pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-32 md:w-44 bg-gradient-to-l from-background via-background/80 to-transparent backdrop-blur-[2px] z-20 transition-opacity duration-300 ${
              canScrollRight ? "opacity-100" : "opacity-0"
            }`}
          />

          <div
            ref={scrollRef}
            className="relative w-full lg:overflow-x-auto no-scrollbar rounded-3xl border border-border shadow-xs bg-card"
          >
            <div className="grid grid-cols-4 lg:min-w-[900px] lg:grid-cols-8 border-l border-t border-border">
              <ToolCell
                name="مهام وزيارات اليوم"
                icon="tick_outlined"
                className="order-[1] lg:order-none"
                onClick={() => handleCellClick("مهام وزيارات اليوم")}
              />
              <ToolCell
                name="تخطيط مسار المندوب"
                icon="map_outlined"
                className="order-[2] lg:order-none"
                onClick={() => handleCellClick("تخطيط مسار المندوب")}
              />
              <ToolCell
                name="دليل المنتجات"
                icon="book_outlined"
                className="order-[3] lg:order-none"
                onClick={() => handleCellClick("دليل المنتجات")}
              />

              <ToolCell
                name="جدول التوريد والتسليم"
                icon="calendar_outlined"
                className="order-[4] lg:order-none"
                onClick={() => handleCellClick("جدول التوريد والتسليم")}
              />
              <ToolCell
                name="معاينة الفواتير"
                icon="eye_visible_outlined"
                className="order-[5] lg:order-none"
                onClick={() => handleCellClick("معاينة الفواتير")}
              />
              <ToolCell
                name="أرصدة وحسابات الزبائن"
                icon="contacts_outlined"
                className="order-[6] lg:order-none"
                onClick={() => handleCellClick("أرصدة وحسابات الزبائن")}
              />
              <ToolCell
                name="توصيل فوري ومتابعة لحظية"
                icon="rocket_outlined"
                className="order-[7] lg:order-none"
                onClick={() => handleCellClick("توصيل فوري ومتابعة لحظية")}
              />
              <ToolCell
                name="حالات الطلبيات المخصصة"
                icon="assign_outlined"
                className="order-[8] lg:order-none"
                onClick={() => handleCellClick("حالات الطلبيات المخصصة")}
              />

              <ToolCell
                name="نماذج تسجيل المحلات"
                icon="form_outlined"
                className="order-[11] lg:order-none"
                onClick={() => handleCellClick("نماذج تسجيل المحلات")}
              />
              <ToolCell
                name="حقول تسعير مخصصة"
                icon="customize_outlined"
                className="order-[12] lg:order-none"
                onClick={() => handleCellClick("حقول تسعير مخصصة")}
              />

              <div className="order-[9] lg:order-none col-span-2 row-span-2 bg-card border-r border-b border-border p-5 sm:p-6 flex flex-col justify-between relative group hover:bg-muted/40 transition-colors text-right">
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

                <div className="flex items-center justify-center gap-2.5 pt-4">
                  <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-xs">
                    <IconRenderer name="bundle_filled" className="w-4 h-4" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                    إدارة المناديب
                  </h3>
                </div>
              </div>

              <div className="order-[10] lg:order-none col-span-2 row-span-2 bg-card border-r border-b border-border p-5 sm:p-6 flex flex-col justify-between relative group hover:bg-primary/5 transition-colors text-right">
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

              <ToolCell
                name="سجلات دوام المناديب"
                icon="time_outlined"
                className="order-[13] lg:order-none"
                onClick={() => handleCellClick("سجلات دوام المناديب")}
              />
              <ToolCell
                name="أولوية توصيل البضاعة"
                icon="level_outlined"
                className="order-[14] lg:order-none"
                onClick={() => handleCellClick("أولوية توصيل البضاعة")}
              />
              <ToolCell
                name="صندوق الوارد والطلبيات"
                icon="message_center_outlined"
                className="order-[15] lg:order-none"
                onClick={() => handleCellClick("صندوق الوارد والطلبيات")}
              />
              <ToolCell
                name="فرق عمل المناديب"
                icon="users_outlined"
                className="order-[16] lg:order-none"
                onClick={() => handleCellClick("فرق عمل المناديب")}
              />
              <ToolCell
                name="لوحة التحكم الشاملة"
                icon="dashbaord_outlined"
                className="order-[17] lg:order-none"
                onClick={() => handleCellClick("لوحة التحكم الشاملة")}
              />
              <ToolCell
                name="صلاحيات وأمان الدخول"
                icon="password_outlined"
                className="order-[18] lg:order-none"
                onClick={() => handleCellClick("صلاحيات وأمان الدخول")}
              />

              <ToolCell
                name="إشعارات المبيعات الفورية"
                icon="mail_outlined"
                className="order-[19] lg:order-none"
                onClick={() => handleCellClick("إشعارات المبيعات الفورية")}
              />
              <ToolCell
                name="الفواتير والمخزون"
                icon="checkout_outlined"
                className="order-[20] lg:order-none"
                onClick={() => handleCellClick("الفواتير والمخزون")}
              />
              <ToolCell
                name="لوحات مؤشرات الأداء (KPI)"
                icon="overview_outlined"
                className="order-[21] lg:order-none"
                onClick={() => handleCellClick("لوحات مؤشرات الأداء (KPI)")}
              />
              <ToolCell
                name="طلبيات المحلات"
                icon="chat_conversation_filled"
                className="order-[22] lg:order-none"
                onClick={() => handleCellClick("طلبيات المحلات")}
              />
              <ToolCell
                name="توقيت زيارات المحلات"
                icon="hourglass_outlined"
                className="order-[23] lg:order-none"
                onClick={() => handleCellClick("توقيت زيارات المحلات")}
              />

              <ToolCell
                name="حسابات الزبائن والسوبرماركت"
                icon="add_user_outlined"
                className="order-[24] lg:order-none"
                onClick={() => handleCellClick("حسابات الزبائن والسوبرماركت")}
              />

              <ToolCell
                name="تصنيفات المنتجات"
                icon="category_outlined"
                className="order-[25] lg:order-none"
                onClick={() => handleCellClick("تصنيفات المنتجات")}
              />
              <ToolCell
                name="دعم فني واستجابة 24/7"
                icon="mobile_outlined"
                className="order-[26] lg:order-none"
                onClick={() => handleCellClick("دعم فني واستجابة 24/7")}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
