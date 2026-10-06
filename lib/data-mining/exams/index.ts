import { exam2025Second } from "./exam-2025-2";
import { exam2026B } from "./exam-2026-b";
import { examReview1 } from "./exam-review-1";
import type { Exam } from "../types";

// Newest first; practice sets after the real exams.
export const exams: Exam[] = [exam2026B, exam2025Second, examReview1];

export function getExam(slug: string): Exam | undefined {
  return exams.find((e) => e.slug === slug);
}
