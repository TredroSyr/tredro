import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconRenderer } from "@/assets/icons/iconRenderer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const AboutUs = () => {
  const calendarDays = [
    { num: 10, dayAr: "الإثنين", label: "يوم عمل اعتيادي" },
    { num: 11, dayAr: "الثلاثاء", label: "يوم عمل اعتيادي" },
    { num: 12, dayAr: "الأربعاء", label: "يوم عمل اعتيادي" },
    { num: 13, dayAr: "الخميس", label: "يوم عمل اعتيادي" },
    { num: 14, dayAr: "الجمعة", label: "يوم عمل اعتيادي" },
    { num: 15, dayAr: "السبت", label: "يوم التوفير المكتسب ⚡", isSaved: true },
    { num: 16, dayAr: "الأحد", label: "يوم عمل اعتيادي" },
  ];

  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(5);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setSelectedDayIndex((prevIndex) => (prevIndex + 1) % calendarDays.length);
    }, 2200);

    return () => clearInterval(timer);
  }, [isPaused, calendarDays.length]);

  const values = [
    {
      tag: "#التطوير_المستمر",
      title: "النمو بنسبة 1% يومياً",
      subtitle: "التحسين التراكمي الدائم",
      body: "التحسينات الصغيرة المتتالية تصنع قفزات نوعية في سرعة وكفاءة العمليات.",
      footer: "#عقلية_النمو",
      accent: "primary",
    },
    {
      tag: "#الشغف_والإتقان",
      title: "شغف دائم وتعلّم متواصل",
      subtitle: "الريادة في الحلول التقنية",
      body: "نواصل البحث والابتكار لتقديم أفضل تجربة تقنية تخدم التاجر والموزع.",
      footer: "#العمل_الدؤوب",
      accent: "info",
    },
    {
      tag: "#الدقة_والإحكام",
      title: "العناية بأدق التفاصيل",
      subtitle: "الدقة أساس النجاح",
      body: "فوارق الأرباح وسرعة التوصيل تُحسم في دقة الفواتير والمسارات والمخزون.",
      footer: "#التفاصيل_تصنع_الفرق",
      accent: "warning",
    },
    {
      tag: "#روح_الفريق",
      title: "بيئة إيجابية ومحفزة",
      subtitle: "التعاون والاحترام المتبادل",
      body: "نبني بيئة تعاونية مرنة ومحفزة تنعكس سعادة وتميزاً على شركائنا وعملائنا.",
      footer: "#الإيجابية_والمرونة",
      accent: "primary",
    },
  ] as const;

  const valuesRow2 = [
    {
      tag: "#جودة_الخدمة",
      title: "أفضل تجربة للموردين والمتاجر",
      subtitle: "خدمة عملاء فائقة ومستمرة",
      body: "دعم فني واستجابة فورية لضمان استمرارية عمليات البيع دون أي انقطاع.",
      footer: "#رضا_العملاء",
      accent: "info",
    },
    {
      tag: "#الشفافية_المطلقة",
      title: "الصدق والوضوح التام",
      subtitle: "بيانات دقيقة وموثوقة",
      body: "مطابقة تامة بين الفواتير، الأرصدة المالية، وحركات المستودعات الفعلية.",
      footer: "#الوضوح_والأمانة",
      accent: "warning",
    },
  ] as const;

  const accentClasses = {
    primary: "text-primary",
    info: "text-info",
    warning: "text-warning",
  };

  return (
    <div>
      <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-28 overflow-hidden bg-gradient-to-b from-muted/40 via-background to-background">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="relative flex flex-col items-center justify-center pt-8 pb-12 sm:pb-20">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none -top-10 sm:-top-16 opacity-90">
              <div className="relative w-full max-w-2xl h-64 sm:h-96">
                <Image
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop&q=80"
                  alt="قمة جبلية ترمز إلى علو الهمة والريادة"
                  fill
                  sizes="(min-width: 640px) 42rem, 100vw"
                  className="object-cover rounded-3xl mix-blend-multiply filter contrast-125 brightness-95"
                  style={{
                    maskImage:
                      "radial-gradient(circle at 50% 45%, black 35%, transparent 75%)",
                    WebkitMaskImage:
                      "radial-gradient(circle at 50% 45%, black 35%, transparent 75%)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
              </div>
            </div>

            <h1 className="relative z-10 text-4xl sm:text-7xl md:text-8xl font-black tracking-tight text-foreground select-none">
              رسالتنا ومهمتنا
            </h1>

            <Badge
              variant="outline"
              className="relative z-10 mt-4 h-auto gap-2 rounded-full bg-primary/10 border-primary/20 text-primary px-4 py-1.5 text-xs sm:text-sm font-bold"
            >
              <IconRenderer name="star_outlined" className="w-4 h-4" />
              <span>رؤية منظومة Tredro لأتمتة التجارة والتوزيع الميداني</span>
            </Badge>
          </div>

          <div className="max-w-3xl mx-auto text-center space-y-6 pt-4">
            <h2 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight leading-tight">
              مضاعفة كفاءة وإنتاجية سلاسل التوزيع
            </h2>
            <p className="text-lg sm:text-xl font-bold text-primary">
              تمكين شركات التوزيع، المناديب الميدانيين، ومحلات التجزئة من العمل
              بأعلى سرعة ودقة.
            </p>

            <div className="text-muted-foreground text-base sm:text-lg leading-relaxed space-y-5 font-normal pt-2 text-justify sm:text-center">
              <p>
                انطلقت منظومة{" "}
                <span className="font-bold text-foreground">Tredro</span> من
                إدراك عميق للتحديات الجسيمة التي تواجه قطاع تجارة الجملة
                والتوزيع التقليدي، حيث تتشتت العمليات بين الفواتير الورقية،
                السجلات اليدوية، والرسائل غير المنظمة؛ مما يتسبب في هدر الوقت
                وفقدان الأرباح وتأخر وصول البضائع.
              </p>
              <p>
                عقدنا العزم على ابتكار نموذج رقمي متكامل يجمع لوحة التحكم
                المركزية للمؤسسة، وتطبيق المندوب الذكي على الهواتف، ومنصة الطلب
                المباشر للمتاجر، مدعومة بمحرك الذكاء الاصطناعي لتحليل المبيعات
                والتنبؤ بحركة الطلب بدقة متناهية.
              </p>
              <p className="font-medium text-foreground/80">
                اليوم، نؤسس لمرحلة جديدة تلتقي فيها الحوسبة السحابية بالذكاء
                الاصطناعي والعمل الميداني الفعلي؛ لتتحول إدارة التوزيع من عبء
                إداري مستنزف إلى محرك نمو فوري ومستدام.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-16 sm:py-24 bg-muted/30 border-y border-border relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            غايتنا واضحة: مضاعفة الإنتاجية وتوفير الجهد البشري عبر رقمنة
            المسارات وأتمتة الفواتير لتسهيل العمل اليومي لجميع الأطراف.
          </p>

          <div className="inline-block mb-3">
            <span className="text-xs sm:text-sm font-black tracking-widest text-primary uppercase">
              شعارنا الراسخ
            </span>
          </div>

          <h2 className="text-3xl sm:text-6xl font-black text-foreground tracking-tight mb-4">
            توفير يوم عمل كامل كل أسبوع
          </h2>
          <p className="text-sm sm:text-base font-bold text-muted-foreground mb-10">
            أتمتة الفواتير والمسارات والمطابقات المالية تختصر ساعات طويلة من
            الإجراءات الورقية المتكررة.
          </p>

          <Card className="max-w-2xl mx-auto p-3 sm:p-4 rounded-3xl mb-6">
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {calendarDays.map((d, idx) => {
                const isActive = idx === selectedDayIndex;
                return (
                  <div
                    key={d.num}
                    onClick={() => {
                      setSelectedDayIndex(idx);
                      setIsPaused(true);
                    }}
                    className={`relative py-4 sm:py-6 px-1 sm:px-2 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 cursor-pointer select-none ${
                      isActive
                        ? "bg-primary/10 shadow-lg shadow-primary/15 border-2 border-primary scale-105 z-10"
                        : "hover:bg-muted text-muted-foreground border border-transparent"
                    }`}
                  >
                    <span
                      className={`text-xl sm:text-4xl font-black transition-colors ${
                        isActive ? "text-primary" : "text-muted-foreground/50"
                      }`}
                    >
                      {d.num}
                    </span>
                    <span
                      className={`text-[11px] sm:text-sm font-bold mt-1 transition-colors ${
                        isActive
                          ? "text-primary font-black"
                          : "text-muted-foreground"
                      }`}
                    >
                      {d.dayAr}
                    </span>

                    {isActive && (
                      <Badge className="absolute -top-3 h-auto whitespace-nowrap px-2.5 py-0.5 text-[9px] font-black">
                        {d.isSaved
                          ? "يوم موفّر ومكتسب ⚡"
                          : "سير العمل المؤتمت"}
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>

          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground font-medium">
            <IconRenderer
              name="clock_outlined"
              className="w-3.5 h-3.5 text-primary"
            />
            <span>
              يتنقل مؤشر الأيام تلقائياً لعرض دورة التوفير الأسبوعية (يمكنك
              النقر على أي يوم لتحديده)
            </span>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-28 bg-background relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <Badge
              variant="outline"
              className="h-auto gap-2 rounded-full bg-muted border-transparent text-foreground/80 px-3.5 py-1.5 text-xs font-bold mb-3"
            >
              <IconRenderer
                name="success_outlined"
                className="w-3.5 h-3.5 text-primary"
              />
              <span>المبادئ والثقافة المؤسسية</span>
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
              القيم التي تقود قراراتنا وتطورنا
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-border rounded-3xl overflow-hidden shadow-xl shadow-foreground/5 bg-card divide-y lg:divide-y-0 divide-border">
            {values.slice(0, 4).map((v) => (
              <div
                key={v.tag}
                className="p-6 sm:p-8 flex flex-col justify-between min-h-55 border-b lg:border-b-0 lg:border-l border-border hover:bg-muted/50 transition-colors text-right"
              >
                <span
                  className={`text-[11px] font-extrabold tracking-wider ${accentClasses[v.accent]}`}
                >
                  {v.tag}
                </span>
                <div className="my-4">
                  <h3 className="text-xl sm:text-2xl font-black text-foreground mb-1">
                    {v.title}
                  </h3>
                  <p className={`text-xs font-bold ${accentClasses[v.accent]}`}>
                    {v.subtitle}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    {v.body}
                  </p>
                </div>
                <span className="text-[11px] font-extrabold text-muted-foreground/70 tracking-wider">
                  {v.footer}
                </span>
              </div>
            ))}

            <div className="col-span-1 lg:col-span-2 p-8 sm:p-12 flex flex-col items-center justify-center text-center border-t border-border lg:border-l bg-primary/5 relative overflow-hidden">
              <span className="text-xs font-black text-muted-foreground tracking-widest uppercase mb-2">
                ثوابت الانطلاق
              </span>
              <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-primary select-none">
                قيمنا الجوهرية
              </h3>
              <p className="text-sm font-bold text-muted-foreground mt-3 max-w-sm">
                المبادئ الأساسية التي ترسم مستقبل التجارة والتوزيع الذكي مع
                Tredro.
              </p>
            </div>

            {valuesRow2.map((v) => (
              <div
                key={v.tag}
                className="p-6 sm:p-8 flex flex-col justify-between min-h-55 border-t border-border lg:border-l last:border-l-0 hover:bg-muted/50 transition-colors text-right"
              >
                <span
                  className={`text-[11px] font-extrabold tracking-wider ${accentClasses[v.accent]}`}
                >
                  {v.tag}
                </span>
                <div className="my-4">
                  <h3 className="text-xl sm:text-2xl font-black text-foreground mb-1 leading-snug">
                    {v.title}
                  </h3>
                  <p className={`text-xs font-bold ${accentClasses[v.accent]}`}>
                    {v.subtitle}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    {v.body}
                  </p>
                </div>
                <span className="text-[11px] font-extrabold text-muted-foreground/70 tracking-wider">
                  {v.footer}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center rounded-3xl p-8 sm:p-12 AboutUs shadow-2xl border border-border relative ">
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h3 className="text-2xl sm:text-4xl font-black tracking-tight">
                هل أنت مستعد لبدء تجربة توزيع أكثر كفاءة وإنتاجية؟
              </h3>
              <p className="text-sm sm:text-base  leading-relaxed font-medium">
                انضم اليوم إلى مئات الموردين والموزعين وأصحاب المتاجر الذين
                يعتمدون على منظومة Tredro في إدارة مبيعاتهم اليومية.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Button
                  render={<Link href="/company" />}
                  size="lg"
                  className="text-sm"
                >
                  <IconRenderer name="partners_outlined" />
                  <span>ابدأ كشركة توزيع الآن</span>
                </Button>
                <Button
                  render={<Link href="/customer" />}
                  variant="secondary"
                  size="lg"
                  className="text-sm"
                >
                  <IconRenderer name="cart_outlined" />
                  <span>سجل كمتجر / سوبرماركت</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
