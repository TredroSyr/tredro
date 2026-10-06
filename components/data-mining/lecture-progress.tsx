"use client";

import { CircleCheck } from "lucide-react";
import { useStudied } from "@/lib/data-mining/progress";

// Studied-ideas count for a lecture card (localStorage, so client-only).
export function LectureProgress({ n, total }: { n: number; total: number }) {
  const done = useStudied(n).filter((i) => i < total).length;
  if (done === 0) return null;

  if (done === total) {
    return (
      <span className="flex shrink-0 items-center gap-1 rounded-full bg-green-600/10 px-2.5 py-1 text-xs font-bold text-green-700 dark:text-green-400">
        <CircleCheck className="size-3.5" />
        مكتملة
      </span>
    );
  }

  return (
    <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
      {done}/{total}
    </span>
  );
}
