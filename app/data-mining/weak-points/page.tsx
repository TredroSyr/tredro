import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { lectures } from "@/lib/data-mining";
import { resolveExamTopics } from "@/lib/data-mining/exams";
import { weakPoints } from "@/lib/data-mining/weak-points";
import { LectureView } from "@/components/data-mining/lecture-view";
import { ExamPractice } from "@/components/data-mining/exam-view";

export const metadata: Metadata = { title: weakPoints.title };

export default function WeakPointsPage() {
  const lectureTitles = Object.fromEntries(lectures.map((l) => [l.n, l.title]));

  return (
    <>
      <Link
        href="/data-mining"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
      >
        <ChevronRight className="size-4" />
        كل المحاضرات
      </Link>

      <header className="mb-8">
        <p className="text-sm font-semibold text-primary">
          قسم خاص · <bdi dir="ltr">{weakPoints.en}</bdi>
        </p>
        <h1 className="mt-1 text-3xl font-bold leading-tight sm:text-4xl">
          {weakPoints.title}
        </h1>
        <p className="mt-3 leading-8 text-muted-foreground">{weakPoints.summary}</p>
      </header>

      <LectureView
        lecture={weakPoints}
        examPractice={
          weakPoints.fromExams && (
            <ExamPractice
              topics={resolveExamTopics(weakPoints.fromExams)}
              lectureTitles={lectureTitles}
            />
          )
        }
      />
    </>
  );
}
