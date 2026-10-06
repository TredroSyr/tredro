"use client";

import { createContext, useContext, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  BookOpen,
  Check,
  ChevronDown,
  ClipboardCheck,
  RotateCcw,
  X,
} from "lucide-react";
import type { Exam, ExamQuestion } from "@/lib/data-mining/types";
import { BlockView } from "./lecture-view";
import { RichText } from "./rich-text";

const LETTERS = ["A", "B", "C", "D"];

const MODES = [
  { id: "study", label: "وضع الدراسة", short: "دراسة", icon: BookOpen },
  { id: "test", label: "وضع الاختبار", short: "اختبار", icon: ClipboardCheck },
] as const;

type Mode = (typeof MODES)[number]["id"];

// Lecture titles by number, passed from the server so the lecture content
// stays out of the client bundle.
const TitlesContext = createContext<Record<number, string>>({});

export function ExamView({
  exam,
  lectureTitles,
}: {
  exam: Exam;
  lectureTitles: Record<number, string>;
}) {
  const [mode, setMode] = useState<Mode>("study");

  return (
    <TitlesContext value={lectureTitles}>
      <div
        role="tablist"
        className="sticky top-3 z-30 mb-8 grid grid-cols-2 gap-1 rounded-2xl border border-border bg-background/90 p-1 shadow-sm backdrop-blur"
      >
        {MODES.map(({ id, label, short, icon: Icon }) => (
          <button
            key={id}
            role="tab"
            aria-selected={mode === id}
            onClick={() => {
              setMode(id);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`flex items-center justify-center gap-2 rounded-xl px-2 py-2.5 text-sm font-semibold transition-colors ${
              mode === id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Icon className="size-4 shrink-0" />
            <span className="sm:hidden">{short}</span>
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {mode === "study" ? <StudyMode exam={exam} /> : <TestMode exam={exam} />}
    </TitlesContext>
  );
}

// ───────────────────────── Study mode ─────────────────────────

function StudyMode({ exam }: { exam: Exam }) {
  const [filter, setFilter] = useState<number | null>(null);
  const lectureNs = Array.from(new Set(exam.questions.map((q) => q.lecture))).sort(
    (a, b) => a - b,
  );
  const visible = exam.questions.filter((q) => filter === null || q.lecture === filter);

  return (
    <div className="space-y-6">
      <p className="rounded-2xl border border-border bg-muted/40 px-5 py-4 leading-8 text-muted-foreground">
        كل سؤال مع جوابه وطريقة حله، والمحاضرة والفكرة التي جاء منها. اختر محاضرة
        لتراجع أسئلتها فقط.
      </p>

      <div className="flex flex-wrap gap-2">
        <FilterChip active={filter === null} onClick={() => setFilter(null)}>
          الكل ({exam.questions.length})
        </FilterChip>
        {lectureNs.map((n) => (
          <FilterChip key={n} active={filter === n} onClick={() => setFilter(n)}>
            المحاضرة {n} ({exam.questions.filter((q) => q.lecture === n).length})
          </FilterChip>
        ))}
      </div>

      <QuestionList exam={exam} questions={visible}>
        {(q) => <StudyCard question={q} />}
      </QuestionList>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border hover:border-primary/50 hover:bg-muted"
      }`}
    >
      {children}
    </button>
  );
}

function StudyCard({ question: q }: { question: ExamQuestion }) {
  return (
    <QuestionCard question={q}>
      <Options question={q} picked={null} reveal />
      <Solution question={q} />
    </QuestionCard>
  );
}

// ───────────────────────── Test mode ─────────────────────────

function TestMode({ exam }: { exam: Exam }) {
  const total = exam.questions.length;
  const [picked, setPicked] = useState<(number | null)[]>(() =>
    exam.questions.map(() => null),
  );

  const answered = picked.filter((p) => p !== null).length;
  const correct = exam.questions.filter((q, i) => picked[i] === q.answer).length;
  const wrong = answered - correct;
  const done = answered === total;

  const reset = () => {
    setPicked(exam.questions.map(() => null));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      <p className="rounded-2xl border border-border bg-muted/40 px-5 py-4 leading-8 text-muted-foreground">
        اختر جوابك وسيظهر فوراً إذا كان صحيحاً أو خاطئاً، مع زر لعرض الشرح. بعد
        آخر سؤال تظهر علامتك والمحاضرات التي تحتاج مراجعة.
      </p>

      <QuestionList exam={exam} questions={exam.questions}>
        {(q) => {
          const i = exam.questions.indexOf(q);
          const choice = picked[i];
          return (
            <QuestionCard
              question={q}
              status={
                choice === null ? undefined : choice === q.answer ? "right" : "wrong"
              }
            >
              <Options
                question={q}
                picked={choice}
                reveal={choice !== null}
                onPick={
                  choice !== null
                    ? undefined
                    : (oi) => setPicked((prev) => prev.map((p, j) => (j === i ? oi : p)))
                }
              />
              {choice !== null && <CollapsibleSolution question={q} />}
            </QuestionCard>
          );
        }}
      </QuestionList>

      {done && <Result exam={exam} picked={picked} correct={correct} onReset={reset} />}

      <div className="sticky bottom-4 z-30 flex items-center gap-4 rounded-2xl border border-border bg-background/95 px-5 py-3 shadow-lg backdrop-blur">
        <div className="min-w-0 flex-1">
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-bold">
            <span className="flex items-center gap-1 text-green-600">
              <Check className="size-4" />
              {correct}
            </span>
            <span className="flex items-center gap-1 text-destructive">
              <X className="size-4" />
              {wrong}
            </span>
            <span className="font-normal text-muted-foreground">
              {answered} من {total}
            </span>
          </p>
          <div className="mt-2 flex h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-green-600 transition-[width] duration-300"
              style={{ width: `${(correct / total) * 100}%` }}
            />
            <div
              className="h-full bg-destructive transition-[width] duration-300"
              style={{ width: `${(wrong / total) * 100}%` }}
            />
          </div>
        </div>
        <button
          onClick={reset}
          disabled={answered === 0}
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted disabled:opacity-40"
        >
          <RotateCcw className="size-3.5" />
          إعادة
        </button>
      </div>
    </div>
  );
}

function Result({
  exam,
  picked,
  correct,
  onReset,
}: {
  exam: Exam;
  picked: (number | null)[];
  correct: number;
  onReset: () => void;
}) {
  const total = exam.questions.length;
  const percent = Math.round((correct / total) * 100);

  const byLecture = new Map<number, { right: number; total: number }>();
  exam.questions.forEach((q, i) => {
    const row = byLecture.get(q.lecture) ?? { right: 0, total: 0 };
    row.total += 1;
    if (picked[i] === q.answer) row.right += 1;
    byLecture.set(q.lecture, row);
  });
  const rows = [...byLecture.entries()].sort((a, b) => a[0] - b[0]);
  const titles = useContext(TitlesContext);

  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">علامتك</p>
          <p className="text-4xl font-bold">
            <span className={percent >= 60 ? "text-green-600" : "text-destructive"}>
              {correct}
            </span>
            <span className="text-2xl text-muted-foreground"> / {total}</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {percent}% · {percent >= 60 ? "ناجح" : "تحتاج مراجعة"}
          </p>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm hover:bg-muted"
        >
          <RotateCcw className="size-4" />
          إعادة الاختبار
        </button>
      </div>

      <h2 className="mb-3 mt-6 font-bold">النتيجة حسب المحاضرة</h2>
      <div className="grid gap-2">
        {rows.map(([n, r]) => {
          const full = r.right === r.total;
          return (
            <Link
              key={n}
              href={`/data-mining/${n}`}
              className="flex items-center gap-3 rounded-xl border border-border px-4 py-2.5 text-sm hover:border-primary/50 hover:bg-muted/40"
            >
              <span
                className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  full ? "bg-green-600 text-white" : "bg-destructive/15 text-destructive"
                }`}
              >
                {n}
              </span>
              <span className="min-w-0 flex-1 truncate">{titles[n]}</span>
              <span className={`font-bold ${full ? "text-green-600" : "text-destructive"}`}>
                {r.right} / {r.total}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

// ───────────────────────── Shared pieces ─────────────────────────

// Renders questions in order, showing each shared table/matrix before the
// first visible question that uses it.
function QuestionList({
  exam,
  questions,
  children,
}: {
  exam: Exam;
  questions: ExamQuestion[];
  children: (q: ExamQuestion) => React.ReactNode;
}) {
  const seen = new Set<string>();
  return (
    <div className="space-y-5">
      {questions.map((q) => {
        let context = null;
        if (q.context && !seen.has(q.context)) {
          seen.add(q.context);
          context = exam.contexts.find((c) => c.id === q.context);
        }
        return (
          <div key={q.n} className="space-y-5">
            {context && (
              <section className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-5">
                <h2 className="mb-4 font-bold text-primary">{context.title}</h2>
                <div className="space-y-4">
                  {context.blocks.map((b, j) => (
                    <BlockView key={j} block={b} />
                  ))}
                </div>
              </section>
            )}
            {children(q)}
          </div>
        );
      })}
    </div>
  );
}

function QuestionCard({
  question: q,
  status,
  children,
}: {
  question: ExamQuestion;
  status?: "right" | "wrong";
  children: React.ReactNode;
}) {
  const title = useContext(TitlesContext)[q.lecture];
  return (
    <article
      id={`q-${q.n}`}
      className={`scroll-mt-24 rounded-2xl border bg-card p-5 shadow-sm ${
        status === "right"
          ? "border-green-600/50"
          : status === "wrong"
            ? "border-destructive/50"
            : "border-border"
      }`}
    >
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
        <Link
          href={`/data-mining/${q.lecture}`}
          className="rounded-full bg-primary/10 px-2.5 py-1 font-semibold text-primary hover:bg-primary/20"
        >
          المحاضرة {q.lecture}
          {title ? `: ${title}` : ""}
        </Link>
        <span className="rounded-full bg-muted px-2.5 py-1 text-muted-foreground">
          {q.idea}
        </span>
        {status && (
          <span
            className={`ms-auto flex items-center gap-1 font-bold ${
              status === "right" ? "text-green-600" : "text-destructive"
            }`}
          >
            {status === "right" ? <Check className="size-4" /> : <X className="size-4" />}
            {status === "right" ? "صح" : "خطأ"}
          </span>
        )}
      </div>
      <h3 className="mb-4 flex gap-2 font-bold leading-8">
        <span className="text-primary">{q.n}.</span>
        <span>
          <RichText text={q.q} />
        </span>
      </h3>
      {children}
    </article>
  );
}

function Options({
  question: q,
  picked,
  reveal,
  onPick,
}: {
  question: ExamQuestion;
  picked: number | null;
  reveal: boolean;
  onPick?: (i: number) => void;
}) {
  return (
    <div className="grid gap-2">
      {q.options.map((opt, oi) => {
        const isAnswer = oi === q.answer;
        const isPicked = oi === picked;
        let style = "border-border";
        if (reveal && isAnswer) style = "border-green-600 bg-green-600/10";
        else if (reveal && isPicked) style = "border-destructive bg-destructive/10";
        else if (reveal) style = "border-border opacity-70";
        else if (isPicked) style = "border-primary bg-primary/10";
        else if (onPick) style = "border-border hover:border-primary/50 hover:bg-muted/50";
        return (
          <button
            key={oi}
            disabled={!onPick}
            onClick={() => onPick?.(oi)}
            aria-pressed={isPicked}
            className={`flex items-center gap-3 rounded-xl border px-4 py-2.5 text-start leading-7 transition-colors disabled:cursor-default ${style}`}
          >
            <span
              className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                isPicked && !reveal ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              {LETTERS[oi]}
            </span>
            <span className="flex-1">
              <RichText text={opt} />
            </span>
            {reveal && isAnswer && <Check className="size-4 text-green-600" />}
            {reveal && isPicked && !isAnswer && <X className="size-4 text-destructive" />}
          </button>
        );
      })}
    </div>
  );
}

function Solution({ question: q }: { question: ExamQuestion }) {
  return (
    <div className="mt-5 space-y-4 border-t border-border pt-5">
      <p className="font-bold">
        الحل: <span className="text-green-600">{LETTERS[q.answer]}</span>
      </p>
      {q.solution.map((b, j) => (
        <BlockView key={j} block={b} />
      ))}
      {q.trap && (
        <div className="flex gap-2 rounded-xl border-s-4 border-destructive bg-destructive/10 px-4 py-3 leading-8">
          <AlertTriangle className="mt-1.5 size-4 shrink-0 text-destructive" />
          <span>
            <span className="font-bold">انتبه: </span>
            <RichText text={q.trap} />
          </span>
        </div>
      )}
    </div>
  );
}

function CollapsibleSolution({ question }: { question: ExamQuestion }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="mt-4 flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
      >
        <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
        {open ? "إخفاء الشرح" : "عرض الشرح"}
      </button>
      {open && <Solution question={question} />}
    </>
  );
}
