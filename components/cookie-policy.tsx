import { CookiePreferencesButton } from "@/components/cookie-preferences-button";

const sections = [
  {
    title: "ما هي ملفات تعريف الارتباط؟",
    body: "ملفات تعريف الارتباط (الكوكيز) هي ملفات نصية صغيرة تُخزَّن على جهازك عند زيارة موقعنا. تُستخدم هذه الملفات لتذكر تفضيلاتك، وتحسين أداء الموقع، وفهم كيفية استخدام الزوار له.",
  },
  {
    title: "كيف تستخدم Tredro ملفات تعريف الارتباط؟",
    body: "نستخدم نوعين من ملفات تعريف الارتباط: ملفات ضرورية لعمل الموقع بشكل أساسي (مثل حفظ تفضيل المظهر الفاتح أو الداكن)، وملفات تحليلية اختيارية تساعدنا على قياس حركة الزيارات وتحسين تجربة الاستخدام.",
  },
  {
    title: "Google Analytics",
    body: "عند موافقتك على ملفات تعريف الارتباط التحليلية، نستخدم خدمة Google Analytics 4 لجمع بيانات مجهولة حول كيفية تصفح زوارنا للموقع، مثل الصفحات الأكثر زيارة ومدة الجلسة. لا تُستخدم هذه البيانات للتعرف على هويتك الشخصية.",
  },
  {
    title: "كيف نحفظ اختيارك؟",
    body: "بمجرد اختيارك (قبول أو رفض)، يُحفظ هذا الاختيار محلياً في متصفحك ولا تظهر لك نافذة الموافقة مرة أخرى في زياراتك القادمة، إلى أن تقوم بتغيير تفضيلاتك أو مسح بيانات المتصفح.",
  },
  {
    title: "التحكم في تفضيلاتك",
    body: "يمكنك تعديل موافقتك على ملفات تعريف الارتباط التحليلية في أي وقت من خلال الزر أدناه، والذي سيعيد عرض نافذة إدارة ملفات تعريف الارتباط.",
  },
];

export default function CookiePolicy() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
      <h1 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
        سياسة ملفات تعريف الارتباط
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        توضح هذه السياسة كيفية استخدام منصة Tredro لملفات تعريف الارتباط
        وتقنيات التتبع المشابهة على موقعنا{" "}
        <span dir="ltr" className="font-medium text-foreground">
          https://www.tredro.online
        </span>
        . باستخدامك لموقعنا، فإنك توافق على استخدام ملفات تعريف الارتباط
        الضرورية، بينما تبقى ملفات تعريف الارتباط التحليلية اختيارية وتخضع
        لموافقتك الصريحة.
      </p>

      <div className="mt-10 flex flex-col gap-8">
        {sections.map((section) => (
          <div key={section.title} className="flex flex-col gap-2">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              {section.title}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {section.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-start gap-3 rounded-xl border border-border bg-muted/40 p-5">
        <p className="text-sm text-muted-foreground">
          غيّرت رأيك؟ يمكنك تعديل موافقتك على ملفات تعريف الارتباط التحليلية
          في أي وقت.
        </p>
        <CookiePreferencesButton />
      </div>
    </section>
  );
}
