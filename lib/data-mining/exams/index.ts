import { exam2025Second } from "./exam-2025-2";
import { exam2026B } from "./exam-2026-b";
import type { Exam } from "../types";

// Newest first.
export const exams: Exam[] = [exam2026B, exam2025Second];

export function getExam(slug: string): Exam | undefined {
  return exams.find((e) => e.slug === slug);
}
