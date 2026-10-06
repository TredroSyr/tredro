"use client";

import { useState } from "react";
import {
  BookOpen,
  Calculator,
  Check,
  ChevronDown,
  Circle,
  CircleCheck,
  ListChecks,
  PenLine,
} from "lucide-react";
import type { Block, Exercise, Lecture } from "@/lib/data-mining/types";
import { setAllStudied, setStudied, useStudied } from "@/lib/data-mining/progress";
import { RichText } from "./rich-text";
import { McqQuiz } from "./mcq-quiz";

const TABS = [
  { id: "study", label: "دراسة المادة", short: "الدراسة", icon: BookOpen },
  { id: "laws", label: "قوانين واختصارات", short: "القوانين", icon: Calculator },
  { id: "mcq", label: "MCQ", short: "MCQ", icon: ListChecks },
  { id: "exercises", label: "أمثلة امتحانية", short: "أمثلة", icon: PenLine },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function LectureView({ lecture }: { lecture: Lecture }) {
  const [tab, setTab] = useState<TabId>("study");
  const tabs = TABS.filter(
    (t) => t.id !== "exercises" || (lecture.exercises?.length ?? 0) > 0,
  );

  return (
    <div>
      <div
        role="tablist"
        style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
        className="sticky top-3 z-30 mb-8 grid gap-1 rounded-2xl border border-border bg-background/90 p-1 shadow-sm backdrop-blur"
      >
        {tabs.map(({ id, label, short, icon: Icon }) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            onClick={() => {
              setTab(id);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`flex items-center justify-center gap-2 rounded-xl px-2 py-2.5 text-sm font-semibold transition-colors ${
              tab === id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Icon className="size-4 shrink-0" />
            <span className="truncate sm:hidden">{short}</span>
            <span className="hidden truncate sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {tab === "study" && <StudyTab lecture={lecture} />}
      {tab === "laws" && <LawsTab lecture={lecture} />}
      {tab === "mcq" && <McqQuiz key={lecture.n} questions={lecture.mcq} />}
      {tab === "exercises" && lecture.exercises && (
        <ExercisesTab exercises={lecture.exercises} />
      )}
    </div>
  );
}

function ExercisesTab({ exercises }: { exercises: Exercise[] }) {
  return (
    <div className="space-y-6">
      <p className="rounded-2xl border border-border bg-muted/40 px-5 py-4 leading-8 text-muted-foreground">
        حاول تحل كل مثال على ورقة قبل ما تفتح الحل، بعدين قارن خطوة بخطوة.
      </p>
      {exercises.map((ex, i) => (
        <ExerciseCard key={i} exercise={ex} />
      ))}
    </div>
  );
}

function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const [shown, setShown] = useState(false);
  return (
    <article className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-bold">{exercise.title}</h3>
      <div className="space-y-4">
        {exercise.problem.map((block, j) => (
          <BlockView key={j} block={block} />
        ))}
      </div>

      <button
        onClick={() => setShown((v) => !v)}
        aria-expanded={shown}
        className={`mt-5 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
          shown
            ? "border border-border hover:bg-muted"
            : "bg-primary text-primary-foreground hover:bg-primary/90"
        }`}
      >
        <ChevronDown
          className={`size-4 transition-transform ${shown ? "rotate-180" : ""}`}
        />
        {shown ? "إخفاء الحل" : "إظهار الحل"}
      </button>

      {shown && (
        <div className="mt-5 space-y-4 border-t border-border pt-5">
          {exercise.solution.map((block, j) => (
            <BlockView key={j} block={block} />
          ))}
          <div className="rounded-xl border border-green-600/40 bg-green-600/10 px-4 py-3 leading-8">
            <span className="font-bold">الجواب النهائي: </span>
            <RichText text={exercise.answer} />
          </div>
        </div>
      )}
    </article>
  );
}

function StudyTab({ lecture }: { lecture: Lecture }) {
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));
  const allOpen = open.size === lecture.ideas.length;
  const studied = useStudied(lecture.n);
  const studiedSet = new Set(studied);
  const total = lecture.ideas.length;
  const doneCount = lecture.ideas.filter((_, i) => studiedSet.has(i)).length;
  const allDone = doneCount === total;

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  // Mark as studied from inside the idea: collapse it and open the next one.
  const finish = (i: number) => {
    setStudied(lecture.n, i, true);
    setOpen((prev) => {
      const next = new Set(prev);
      next.delete(i);
      if (i + 1 < total) next.add(i + 1);
      return next;
    });
    document
      .getElementById(`idea-head-${i + 1}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="space-y-3">
      <div className="mb-4 rounded-2xl border border-border bg-card p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-bold">
            تمت دراسة{" "}
            <span className={allDone ? "text-green-600" : "text-primary"}>
              {doneCount}
            </span>{" "}
            من {total} فكرة
          </p>
          <div className="flex gap-2">
            <button
              onClick={() =>
                setAllStudied(
                  lecture.n,
                  allDone ? [] : lecture.ideas.map((_, i) => i),
                )
              }
              className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted"
            >
              {allDone ? "إلغاء تحديد الكل" : "تحديد الكل كمدروس"}
            </button>
            <button
              onClick={() =>
                setOpen(allOpen ? new Set() : new Set(lecture.ideas.map((_, i) => i)))
              }
              className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted"
            >
              {allOpen ? "إغلاق الكل" : "فتح الكل"}
            </button>
          </div>
        </div>
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={doneCount}
          className="mt-3 h-2 overflow-hidden rounded-full bg-muted"
        >
          <div
            className={`h-full rounded-full transition-[width] duration-300 ${
              allDone ? "bg-green-600" : "bg-primary"
            }`}
            style={{ width: `${(doneCount / total) * 100}%` }}
          />
        </div>
      </div>

      {lecture.ideas.map((idea, i) => {
        const isOpen = open.has(i);
        const isDone = studiedSet.has(i);
        return (
          <section
            key={i}
            id={`idea-head-${i}`}
            className={`scroll-mt-24 overflow-hidden rounded-2xl border bg-card transition-colors ${
              isOpen
                ? "border-primary/40 shadow-sm"
                : isDone
                  ? "border-green-600/40"
                  : "border-border"
            }`}
          >
            <div className="flex items-center hover:bg-muted/40">
              <button
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                aria-controls={`idea-${i + 1}`}
                className="flex min-w-0 flex-1 items-center gap-3 py-4 ps-4 text-start sm:ps-5"
              >
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    isDone
                      ? "bg-green-600 text-white"
                      : isOpen
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/10 text-primary"
                  }`}
                >
                  {isDone ? <Check className="size-4" /> : i + 1}
                </span>
                <span className="flex-1">
                  <span className="block text-lg font-bold leading-snug">
                    {idea.title}
                  </span>
                  {idea.en && (
                    <span
                      dir="ltr"
                      className="block text-right text-sm text-muted-foreground"
                    >
                      {idea.en}
                    </span>
                  )}
                </span>
                <ChevronDown
                  className={`size-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <button
                onClick={() => setStudied(lecture.n, i, !isDone)}
                aria-pressed={isDone}
                title={isDone ? "تمت الدراسة — اضغط للإلغاء" : "تحديد كمدروس"}
                aria-label={isDone ? "إلغاء تحديد كمدروس" : "تحديد كمدروس"}
                className={`mx-2 flex size-10 shrink-0 items-center justify-center rounded-full transition-colors sm:me-3 ${
                  isDone
                    ? "text-green-600 hover:bg-green-600/10"
                    : "text-muted-foreground/60 hover:bg-muted hover:text-foreground"
                }`}
              >
                {isDone ? (
                  <CircleCheck className="size-6" />
                ) : (
                  <Circle className="size-6" />
                )}
              </button>
            </div>
            <div
              id={`idea-${i + 1}`}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="space-y-4 border-t border-border px-4 pb-5 pt-4 sm:px-5 sm:ps-16">
                  {idea.blocks.map((block, j) => (
                    <BlockView key={j} block={block} />
                  ))}
                  <div className="flex justify-end pt-2">
                    {isDone ? (
                      <button
                        onClick={() => setStudied(lecture.n, i, false)}
                        className="flex items-center gap-2 rounded-lg border border-green-600/40 bg-green-600/10 px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-600/20 dark:text-green-400"
                      >
                        <CircleCheck className="size-4" />
                        تمت الدراسة — إلغاء
                      </button>
                    ) : (
                      <button
                        onClick={() => finish(i)}
                        className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                      >
                        <Check className="size-4" />
                        تمت دراسة هذه الفكرة
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

export function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return (
        <p className="leading-8 text-foreground/85">
          <RichText text={block.text} />
        </p>
      );
    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag
          className={`space-y-2 ps-5 leading-8 text-foreground/85 ${
            block.ordered ? "list-decimal" : "list-disc"
          } marker:text-primary`}
        >
          {block.items.map((item, i) => (
            <li key={i}>
              <RichText text={item} />
            </li>
          ))}
        </Tag>
      );
    }
    case "formula":
      return <FormulaBox lines={block.lines} />;
    case "table":
      if (block.ltr) return <MatrixTable head={block.head} rows={block.rows} />;
      return (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-120 text-sm">
            <thead className="bg-muted/60">
              <tr>
                {block.head.map((h, i) => (
                  <th key={i} className="px-3 py-2.5 text-start font-bold">
                    <RichText text={h} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-t border-border align-top">
                  {row.map((cell, j) => (
                    <td key={j} className="px-3 py-2.5 leading-7 text-foreground/85">
                      <RichText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "note":
      return (
        <div className="rounded-xl border-s-4 border-warning bg-warning/10 px-4 py-3 leading-8">
          <span className="font-bold">ملاحظة: </span>
          <RichText text={block.text} />
        </div>
      );
    case "example":
      return (
        <div className="rounded-xl border-s-4 border-info bg-info/10 px-4 py-3 leading-8">
          <span className="font-bold">مثال: </span>
          <RichText text={block.text} />
        </div>
      );
  }
}

// Numeric tables / proximity matrices: read left-to-right, first column is a row label.
function MatrixTable({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div dir="ltr" className="overflow-x-auto">
      <table className="mx-auto border-collapse font-mono text-sm">
        <thead>
          <tr>
            {head.map((h, i) => (
              <th
                key={i}
                className="border border-border bg-muted/60 px-3 py-2 text-center font-bold whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`border border-border px-3 py-2 text-center whitespace-nowrap ${
                    j === 0 ? "bg-muted/60 font-bold" : ""
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FormulaBox({ lines }: { lines: string[] }) {
  return (
    <div
      dir="ltr"
      className="overflow-x-auto rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 font-mono text-[15px] leading-8 text-foreground"
    >
      {lines.map((line, i) => (
        <div key={i} className="whitespace-pre">
          {line}
        </div>
      ))}
    </div>
  );
}

function LawsTab({ lecture }: { lecture: Lecture }) {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="mb-5 text-xl font-bold">القوانين</h2>
        <div className="grid gap-4">
          {lecture.laws.map((law, i) => (
            <article
              key={i}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <h3 className="mb-3 font-bold">{law.name}</h3>
              <FormulaBox lines={law.formula} />
              <p className="mt-3 leading-8 text-foreground/85">
                <RichText text={law.explain} />
              </p>
              {law.example && (
                <div className="mt-2 rounded-lg bg-muted/60 px-3 py-2 text-sm leading-7">
                  <span className="font-bold">مثال:</span>
                  <div dir="auto" className="font-mono">
                    {law.example}
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-5 text-xl font-bold">اختصارات للحفظ</h2>
        <ul className="grid gap-3">
          {lecture.shortcuts.map((s, i) => (
            <li
              key={i}
              className="flex gap-3 rounded-xl border border-border bg-muted/30 px-4 py-3 leading-8"
            >
              <span className="mt-2.5 size-2 shrink-0 rounded-full bg-primary" />
              <span>
                <RichText text={s} />
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
