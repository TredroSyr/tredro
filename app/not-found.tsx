import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "الصفحة غير موجودة",
  description: "الصفحة التي تبحث عنها غير موجودة.",
};

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16 sm:py-24">
      <div className="grid w-full max-w-5xl items-center gap-10 md:grid-cols-2">
        <div className="relative order-first mx-auto flex w-64 items-center justify-center sm:w-80 md:order-last md:w-full md:max-w-md">
          <div
            aria-hidden
            className="absolute inset-[8%] rounded-[46%_54%_42%_58%/52%_44%_56%_48%] bg-primary/10 blur-2xl dark:bg-primary/20"
          />
          <img
            src="/illustration/404-robot.png"
            alt="روبوت معطّل يعبّر عن صفحة غير موجودة"
            className="relative w-full max-w-full select-none object-contain drop-shadow-[0_18px_35px_color-mix(in_oklab,var(--primary)_18%,transparent)]"
          />
        </div>

        <div className="text-center md:text-right">
          <p className="bg-gradient-to-l from-primary to-primary/50 bg-clip-text text-7xl font-black tracking-tight text-transparent sm:text-8xl">
            404
          </p>
          <h1 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">
            عذرًا! الصفحة غير موجودة
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground md:mx-0">
            الرابط الذي فتحته غير صحيح أو تمت إزالة الصفحة. يمكنك العودة إلى
            الصفحة الرئيسية والمتابعة من هناك.
          </p>
          <div className="mt-7 flex justify-center md:justify-start">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              العودة للرئيسية
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
