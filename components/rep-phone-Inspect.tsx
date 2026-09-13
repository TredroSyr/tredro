import React, { useEffect, useState } from "react";
import { Wifi, Battery } from "lucide-react";

import { IconRenderer } from "@/assets/icons/iconRenderer";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import MapCpmnainer from "@/components/map/map-conainter";

export const RepPhoneInspect: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const [screenState, setScreenState] = useState<"launcher" | "splash" | "map">(
    "launcher",
  );
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const statusBarTime = now
    ? now.toLocaleTimeString("ar", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : "";
  const launcherDayName = now
    ? now.toLocaleDateString("ar-SY", { weekday: "long" })
    : "";
  const launcherDayNum = now ? now.getDate() : "";
  const launcherMonthName = now
    ? now.toLocaleDateString("ar-SY", { month: "long" })
    : "";

  const handleLaunchApp = () => {
    setScreenState("splash");
    setTimeout(() => {
      setScreenState("map");
    }, 700);
  };

  const handleGoHome = () => {
    setScreenState("launcher");
  };

  return (
    <div className={`flex flex-1 flex-col items-center justify-center  ${className}`}>
      <div className="relative w-full max-w-[min(340px,90vw)] sm:max-w-[360px] h-[670px]  rounded-[48px] p-3.5 shadow-2xl shadow-primary/30 border-2 border-foreground/10 ring-1 ring-foreground/40 select-none overflow-hidden">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4.5  rounded-full z-40 flex items-center justify-center ring-1 ring-background/10">
          <div className="w-2.5 h-2.5 rounded-full  border  mr-4" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
        </div>

        <div className="relative w-full h-full  rounded-[38px] overflow-hidden flex flex-col ">
          <div
            className={`w-full h-7 pt-1 px-5 flex items-center justify-between text-[11px] font-bold z-30 shrink-0 select-none transition-colors ${
              screenState === "launcher"
                ? "text-foreground/80 bg-transparent"
                : "text-background bg-foreground/60 backdrop-blur-sm"
            }`}
          >
            <span>{statusBarTime}</span>
            <div className="flex items-center gap-1.5 text-xs">
              <Wifi className="w-3 h-3" />
              <span className="text-[10px] font-bold">67%</span>
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>

          {screenState === "launcher" && (
            <div className="relative flex-1 w-full h-full  p-4 flex flex-col justify-between  animate-in fade-in duration-300">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-info/20 rounded-full blur-3xl pointer-events-none" />

              <div className="pt-6 text-center space-y-1 z-10">
                <div className="text-4xl  tracking-tight font-sans">
                  {statusBarTime}
                </div>
                <div className="text-xs  font-bold">
                  {launcherDayName}، {launcherDayNum} {launcherMonthName} • 29°
                  مشمس
                </div>

                <div className="mt-4 mx-auto max-w-[260px]  backdrop-blur-md border  rounded-full px-3 py-1.5 flex items-center justify-between text-[11px] ">
                  <div className="flex items-center gap-2">
                    <IconRenderer
                      name="search_outlined"
                      className="w-3.5 h-3.5 /50"
                    />
                    <span>بحث في الهاتف...</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-primary" />
                </div>
              </div>

              <div className="space-y-6 z-10">
                <div className="grid grid-cols-4 gap-3 text-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/30">
                      <IconRenderer name="mobile_filled" className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold ">الهاتف</span>
                  </div>

                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-12 h-12 rounded-2xl bg-info text-info-foreground flex items-center justify-center shadow-lg shadow-info/30">
                      <IconRenderer
                        name="chat_conversation_outlined"
                        className="w-6 h-6"
                      />
                    </div>
                    <span className="text-[10px] font-bold ">الرسائل</span>
                  </div>

                  <Button
                    variant="ghost"
                    onClick={handleLaunchApp}
                    className="flex flex-col items-center gap-1.5 h-auto p-0 hover:bg-transparent active:scale-90 transition-transform duration-150"
                  >
                    <div className="relative w-12 h-12 rounded-2xl bg-background flex items-center justify-center shadow-lg shrink-0 hover:scale-110 hover:shadow-primary/40 transition-all duration-200 animate-in zoom-in-50 fade-in">
                      <span className="absolute -inset-1.5 rounded-2xl bg-primary/25 animate-ping pointer-events-none" />
                      <Image
                        src="/tredro/logo.svg"
                        alt="logo"
                        width={26}
                        height={26}
                        className="relative"
                      />
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive border-2 border-foreground flex items-center justify-center text-[9px] font-black text-primary-foreground animate-bounce">
                        4
                      </span>
                    </div>
                    <span className="text-[10px] font-bold ">
                      Tredro Mandoub
                    </span>
                  </Button>

                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-12 h-12 rounded-2xl bg-accent text-accent-foreground flex items-center justify-center shadow-lg">
                      <IconRenderer
                        name="settings_outlined"
                        className="w-6 h-6"
                      />
                    </div>
                    <span className="text-[10px] font-bold ">الإعدادات</span>
                  </div>
                </div>
              </div>

              <div className=" backdrop-blur-xl border  rounded-3xl p-2.5 flex items-center justify-around z-10">
                <Button
                  variant="ghost"
                  onClick={handleLaunchApp}
                  className="flex flex-col items-center gap-1 h-auto p-0 hover:bg-transparent hover:scale-110 transition-transform"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-md shadow-primary/30">
                    <Image
                      src="/tredro/logo.svg"
                      alt="logo"
                      width={20}
                      height={20}
                    />
                  </div>
                </Button>

                <Button
                  variant="ghost"
                  onClick={handleLaunchApp}
                  className="flex flex-col items-center gap-1 h-auto p-0 hover:bg-transparent hover:scale-110 transition-transform"
                >
                  <div className="w-10 h-10 rounded-xl bg-info text-info-foreground flex items-center justify-center shadow-md">
                    <IconRenderer name="map_outlined" className="w-5 h-5" />
                  </div>
                </Button>

                <Button
                  variant="ghost"
                  onClick={handleLaunchApp}
                  className="flex flex-col items-center gap-1 h-auto p-0 hover:bg-transparent hover:scale-110 transition-transform"
                >
                  <div className="w-10 h-10 rounded-xl bg-warning text-warning-foreground flex items-center justify-center shadow-md">
                    <IconRenderer
                      name="checkout_outlined"
                      className="w-5 h-5"
                    />
                  </div>
                </Button>

                <Button
                  variant="ghost"
                  onClick={handleLaunchApp}
                  className="flex flex-col items-center gap-1 h-auto p-0 hover:bg-transparent hover:scale-110 transition-transform"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent text-accent-foreground flex items-center justify-center shadow-md">
                    <IconRenderer name="cart_filled" className="w-5 h-5" />
                  </div>
                </Button>
              </div>
            </div>
          )}

          {screenState === "splash" && (
            <div className="flex-1 w-full h-full flex justify-center items-center bg-background animate-in fade-in duration-200">
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-3xl bg-primary/20 animate-ping" />
                <div className="relative w-20 h-20 rounded-3xl bg-background flex items-center justify-center shadow-xl shadow-primary/30 animate-in zoom-in-50 fade-in duration-500">
                  <Image
                    src="/tredro/logo.svg"
                    alt="logo"
                    width={46}
                    height={46}
                    className="animate-pulse"
                  />
                </div>
              </div>
            </div>
          )}

          {screenState === "map" && (
            <div className="relative flex-1 w-full h-full overflow-hidden animate-in fade-in duration-300">
              <MapCpmnainer />
            </div>
          )}

          <div className="w-full h-9 bg-card border-t border-border flex items-center justify-around shrink-0 select-none">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleGoHome}
              className="h-auto p-2 text-muted-foreground hover:text-foreground"
              title="التطبيقات الأخيرة"
            >
              <div className="w-3.5 h-3.5 rounded-[3px] border-2 border-current" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleGoHome}
              className="h-auto p-2 text-foreground hover:text-primary"
              title="الشاشة الرئيسية"
            >
              <div className="w-4 h-4 rounded-full border-2 border-current" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleGoHome}
              className="h-auto p-2 text-muted-foreground hover:text-foreground"
              title="رجوع"
            >
              <div className="w-0 h-0 border-y-[6px] border-y-transparent border-r-[9px] border-r-current" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export const RepPhoneInspectSection: React.FC = () => {
  return (
    <section
      id="rep-mobile-inspect"
      className="py-16 sm:py-24 relative overflow-hidden border-y  "
    >
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-info/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-right order-2 lg:order-1">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              تطبيق هاتف المندوب <br />
              <span className="bg-gradient-to-r from-primary via-primary/70 to-info bg-clip-text text-transparent">
                لإدارة الجولات والزيارات الميدانية
              </span>
            </h2>

            <p className=" text-base sm:text-lg leading-relaxed font-normal">
              تطبيق مخصص لمندوبي مبيعات الجملة على هواتف أندرويد. يبدأ المندوب
              يومه بفتح التطبيق للاطلاع على خط السير المخصص لليوم، وتحديد مواقع
              السوبرماركت على الخريطة عبر GPS، وتحصيل الذمم المالية، وإصدار
              الفواتير الفورية.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs sm:text-sm">
              <Card className="p-4 rounded-2xl   flex-row items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-primary/20 text-primary flex items-center justify-center shrink-0">
                  <IconRenderer name="calendar_outlined" className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold mb-1">
                    توزيع الجولات حسب الأيام
                  </h4>
                  <p className=" text-xs">
                    تبويب أيام الأسبوع (السبت، الأحد، ...) مع عدد المحلات
                    المجدولة لكل جولة.
                  </p>
                </div>
              </Card>

              <Card className="p-4 rounded-2xl   flex-row items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-info/20 text-info flex items-center justify-center shrink-0">
                  <IconRenderer name="location_filled" className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold mb-1">
                    دقة تحديد الموقع عبر GPS
                  </h4>
                  <p className=" text-xs">
                    زر واحد لتثبيت موقع المندوب فوراً، لمنع التلاعب وضمان صحة
                    الزيارات الميدانية.
                  </p>
                </div>
              </Card>

              <Card className="p-4 rounded-2xl   flex-row items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-warning/20 text-warning flex items-center justify-center shrink-0">
                  <IconRenderer name="checkout_filled" className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold mb-1">فواتير وتحصيل لحظي</h4>
                  <p className=" text-xs">
                    عرض الرصيد والذمم، تسجيل الدفعات النقدية، وإصدار الفواتير
                    الفورية.
                  </p>
                </div>
              </Card>

              <Card className="p-4 rounded-2xl   flex-row items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-accent/60 text-accent-foreground flex items-center justify-center shrink-0">
                  <IconRenderer
                    name="plus_circle_outlined"
                    className="w-4 h-4"
                  />
                </div>
                <div>
                  <h4 className="font-extrabold mb-1">إضافة محلات ميدانياً</h4>
                  <p className=" text-xs">
                    زر الإضافة السريع (+) لضم عملاء وسوبرماركت جدد أثناء الجولة
                    مباشرة.
                  </p>
                </div>
              </Card>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <RepPhoneInspect />
          </div>
        </div>
      </div>
    </section>
  );
};
