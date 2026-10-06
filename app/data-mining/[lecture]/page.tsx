import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getLecture, lectures } from "@/lib/data-mining";
import { LectureView } from "@/components/data-mining/lecture-view";

export const dynamicParams = false;

export function generateStaticParams() {
  return lectures.map((l) => ({ lecture: String(l.n) }));
}

export async function generateMetadata({
  params,
}: PageProps<"/data-mining/[lecture]">): Promise<Metadata> {
  const { lecture: slug } = await params;
  const lecture = getLecture(Number(slug));
  return { title: lecture ? `المحاضرة ${lecture.n}: ${lecture.title}` : undefined };
}

export default async function LecturePage({
  params,
}: PageProps<"/data-mining/[lecture]">) {
  const { lecture: slug } = await params;
  const lecture = getLecture(Number(slug));
  if (!lecture) notFound();

  const prev = getLecture(lecture.n - 1);
  const next = getLecture(lecture.n + 1);

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
          المحاضرة {lecture.n} ·{" "}
          <bdi dir="ltr">{lecture.en}</bdi>
        </p>
        <h1 className="mt-1 text-3xl font-bold leading-tight sm:text-4xl">
          {lecture.title}
        </h1>
        <p className="mt-3 leading-8 text-muted-foreground">{lecture.summary}</p>
      </header>

      <LectureView lecture={lecture} />

      <nav className="mt-16 flex justify-between gap-3 border-t border-border pt-6 text-sm">
        {prev ? (
          <Link
            href={`/data-mining/${prev.n}`}
            className="flex items-center gap-1 hover:text-primary"
          >
            <ChevronRight className="size-4" />
            المحاضرة {prev.n}: {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/data-mining/${next.n}`}
            className="flex items-center gap-1 hover:text-primary"
          >
            المحاضرة {next.n}: {next.title}
            <ChevronLeft className="size-4" />
          </Link>
        )}
      </nav>
    </>
  );
}
