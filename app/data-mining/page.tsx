import Link from "next/link";
import { ChevronLeft, ClipboardCheck, Lock, Target } from "lucide-react";
import { TOTAL_LECTURES, getLecture } from "@/lib/data-mining";
import { weakPoints } from "@/lib/data-mining/weak-points";
import { LectureProgress } from "@/components/data-mining/lecture-progress";

export default function DataMiningPage() {
  const slots = Array.from({ length: TOTAL_LECTURES }, (_, i) => i + 1);

  return (
    <>
      <header className="mb-10">
        <p dir="ltr" className="text-right text-sm font-semibold text-primary">
          Data Mining
        </p>
        <h1 className="mt-1 text-3xl font-bold sm:text-4xl">تنقيب المعطيات</h1>
        <p className="mt-3 max-w-2xl leading-8 text-muted-foreground">
          كل محاضرة مقسّمة إلى أفكار مرتّبة بدون اختصار للمحتوى، مع قسم للقوانين
          والاختصارات، وقسم أسئلة MCQ مع التعليل.
        </p>
      </header>

      <Link
        href="/data-mining/exams"
        className="group mb-3 flex items-center gap-4 rounded-2xl border-2 border-primary/40 bg-primary/5 px-5 py-4 shadow-sm transition-colors hover:border-primary"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <ClipboardCheck className="size-5" />
        </span>
        <span className="flex-1">
          <span className="block font-bold">القسم الامتحاني</span>
          <span className="mt-1 block text-sm leading-6 text-muted-foreground">
            امتحانات سابقة بوضع دراسة (الحل مع الشرح) ووضع اختبار
          </span>
        </span>
        <ChevronLeft className="size-5 text-muted-foreground transition-transform group-hover:-translate-x-1" />
      </Link>

      <Link
        href="/data-mining/weak-points"
        className="group mb-8 flex items-center gap-4 rounded-2xl border-2 border-amber-500/40 bg-amber-500/5 px-5 py-4 shadow-sm transition-colors hover:border-amber-500"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white">
          <Target className="size-5" />
        </span>
        <span className="flex-1">
          <span className="block font-bold">{weakPoints.title}</span>
          <span className="mt-1 block text-sm leading-6 text-muted-foreground">
            تنبؤية ووصفية · الاختصارات · التعادل في 1R · Hunt · Information Gain
          </span>
        </span>
        <LectureProgress n={weakPoints.n} total={weakPoints.ideas.length} />
        <ChevronLeft className="size-5 text-muted-foreground transition-transform group-hover:-translate-x-1" />
      </Link>

      <div className="grid gap-3">
        {slots.map((n) => {
          const lecture = getLecture(n);
          if (!lecture) {
            return (
              <div
                key={n}
                className="flex items-center gap-4 rounded-2xl border border-dashed border-border px-5 py-4 text-muted-foreground"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted font-bold">
                  {n}
                </span>
                <span className="flex-1">المحاضرة {n} — قريباً</span>
                <Lock className="size-4" />
              </div>
            );
          }
          return (
            <Link
              key={n}
              href={`/data-mining/${n}`}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card px-5 py-4 shadow-sm transition-colors hover:border-primary/50"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold">
                {n}
              </span>
              <span className="flex-1">
                <span className="block font-bold">{lecture.title}</span>
                <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                  {lecture.ideas.length} فكرة · {lecture.laws.length} قانون ·{" "}
                  {lecture.mcq.length} سؤال
                  {lecture.exercises?.length
                    ? ` · ${lecture.exercises.length} مثال امتحاني`
                    : ""}
                </span>
              </span>
              <LectureProgress n={n} total={lecture.ideas.length} />
              <ChevronLeft className="size-5 text-muted-foreground transition-transform group-hover:-translate-x-1" />
            </Link>
          );
        })}
      </div>
    </>
  );
}
