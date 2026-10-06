import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { weakPoints } from "@/lib/data-mining/weak-points";
import { LectureView } from "@/components/data-mining/lecture-view";

export const metadata: Metadata = { title: weakPoints.title };

export default function WeakPointsPage() {
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

      <LectureView lecture={weakPoints} />
    </>
  );
}
