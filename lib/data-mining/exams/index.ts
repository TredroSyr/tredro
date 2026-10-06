import { exam2025Second } from "./exam-2025-2";
import { exam2026B } from "./exam-2026-b";
import { examReview1 } from "./exam-review-1";
import type { Exam, ExamTopic, ExamTopicSet } from "../types";

// Newest first; practice sets after the real exams.
export const exams: Exam[] = [exam2026B, exam2025Second, examReview1];

export function getExam(slug: string): Exam | undefined {
  return exams.find((e) => e.slug === slug);
}

export function resolveExamTopics(topics: ExamTopic[]): ExamTopicSet[] {
  return topics.map((topic) => ({
    title: topic.title,
    exams: topic.refs.map(({ exam: slug, questions: ns }) => {
      const exam = getExam(slug);
      if (!exam) throw new Error(`Unknown exam: ${slug}`);
      const questions = ns.map((n) => {
        const q = exam.questions.find((q) => q.n === n);
        if (!q) throw new Error(`Exam ${slug} has no question ${n}`);
        return q;
      });
      const used = new Set(questions.map((q) => q.context));
      return {
        ...exam,
        questions,
        contexts: exam.contexts.filter((c) => used.has(c.id)),
      };
    }),
  }));
}
