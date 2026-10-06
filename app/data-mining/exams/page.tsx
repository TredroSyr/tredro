import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ClipboardCheck } from "lucide-react";
import { exams } from "@/lib/data-mining/exams";

export const metadata: Metadata = { title: "القسم الامتحاني" };

export default function ExamsPage() {
  return (
    <>
      <Link
        href="/data-mining"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
      >
        <ChevronRight className="size-4" />
        كل المحاضرات
      </Link>

      <header className="mb-10">
        <h1 className="text-3xl font-bold sm:text-4xl">القسم الامتحاني</h1>
        <p className="mt-3 max-w-2xl leading-8 text-muted-foreground">
          نماذج امتحانات سابقة بوضعين: <strong>دراسة</strong> (الجواب والشرح ظاهرين
          مع المحاضرة التي جاء منها كل سؤال) و<strong>اختبار</strong> (تختار جوابك
          فيظهر فوراً صح أو خطأ، وبالنهاية علامتك).
        </p>
      </header>

      <div className="grid gap-3">
        {exams.map((exam) => (
          <Link
            key={exam.slug}
            href={`/data-mining/exams/${exam.slug}`}
            className="group flex items-center gap-4 rounded-2xl border border-border bg-card px-5 py-4 shadow-sm transition-colors hover:border-primary/50"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <ClipboardCheck className="size-5" />
            </span>
            <span className="flex-1">
              <span className="block font-bold">{exam.title}</span>
              <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                {exam.subtitle}
              </span>
            </span>
            <ChevronLeft className="size-5 text-muted-foreground transition-transform group-hover:-translate-x-1" />
          </Link>
        ))}
      </div>
    </>
  );
}
