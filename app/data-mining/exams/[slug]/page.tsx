import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Info } from "lucide-react";
import { lectures } from "@/lib/data-mining";
import { exams, getExam } from "@/lib/data-mining/exams";
import { ExamView } from "@/components/data-mining/exam-view";

export const dynamicParams = false;

export function generateStaticParams() {
  return exams.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/data-mining/exams/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: getExam(slug)?.title };
}

export default async function ExamPage({
  params,
}: PageProps<"/data-mining/exams/[slug]">) {
  const { slug } = await params;
  const exam = getExam(slug);
  if (!exam) notFound();

  const lectureTitles = Object.fromEntries(lectures.map((l) => [l.n, l.title]));

  return (
    <>
      <Link
        href="/data-mining/exams"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
      >
        <ChevronRight className="size-4" />
        القسم الامتحاني
      </Link>

      <header className="mb-8">
        <p className="text-sm font-semibold text-primary">امتحان سابق</p>
        <h1 className="mt-1 text-3xl font-bold leading-tight sm:text-4xl">
          {exam.title}
        </h1>
        <p className="mt-3 leading-8 text-muted-foreground">{exam.subtitle}</p>
        <div className="mt-4 flex gap-2 rounded-xl border-s-4 border-info bg-info/10 px-4 py-3 text-sm leading-7">
          <Info className="mt-1 size-4 shrink-0" />
          <span>{exam.note}</span>
        </div>
      </header>

      <ExamView exam={exam} lectureTitles={lectureTitles} />
    </>
  );
}
