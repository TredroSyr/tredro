"use client";

import { useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import type { Mcq } from "@/lib/data-mining/types";
import { RichText } from "./rich-text";

const LETTERS = ["أ", "ب", "ج", "د"];

export function McqQuiz({ questions }: { questions: Mcq[] }) {
  const [picked, setPicked] = useState<(number | null)[]>(() =>
    questions.map(() => null),
  );
  const [revealAll, setRevealAll] = useState(false);

  const answered = picked.filter((p) => p !== null).length;
  const correct = picked.filter((p, i) => p === questions[i].answer).length;

  const reset = () => {
    setPicked(questions.map(() => null));
    setRevealAll(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-muted/40 px-5 py-4">
        <p className="font-semibold">
          النتيجة:{" "}
          <span className="text-primary">
            {correct} / {answered}
          </span>
          <span className="text-sm font-normal text-muted-foreground">
            {" "}
            (من أصل {questions.length} سؤال)
          </span>
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setRevealAll((v) => !v)}
            className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted"
          >
            {revealAll ? "إخفاء الإجابات" : "إظهار كل الإجابات"}
          </button>
          <button
            onClick={reset}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted"
          >
            <RotateCcw className="size-3.5" />
            إعادة
          </button>
        </div>
      </div>

      {questions.map((q, qi) => {
        const choice = picked[qi];
        const shown = revealAll || choice !== null;
        return (
          <article
            key={qi}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <h3 className="mb-4 flex gap-2 font-bold leading-8">
              <span className="text-primary">{qi + 1}.</span>
              <span>
                <RichText text={q.q} />
              </span>
            </h3>
            <div className="grid gap-2">
              {q.options.map((opt, oi) => {
                const isAnswer = oi === q.answer;
                const isPicked = oi === choice;
                let style = "border-border hover:border-primary/50 hover:bg-muted/50";
                if (shown && isAnswer)
                  style = "border-green-600 bg-green-600/10 text-foreground";
                else if (shown && isPicked)
                  style = "border-destructive bg-destructive/10";
                else if (shown) style = "border-border opacity-70";
                return (
                  <button
                    key={oi}
                    disabled={choice !== null}
                    onClick={() =>
                      setPicked((prev) => prev.map((p, i) => (i === qi ? oi : p)))
                    }
                    className={`flex items-center gap-3 rounded-xl border px-4 py-2.5 text-start leading-7 transition-colors disabled:cursor-default ${style}`}
                  >
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold">
                      {LETTERS[oi]}
                    </span>
                    <span className="flex-1">
                      <RichText text={opt} />
                    </span>
                    {shown && isAnswer && <Check className="size-4 text-green-600" />}
                    {shown && isPicked && !isAnswer && (
                      <X className="size-4 text-destructive" />
                    )}
                  </button>
                );
              })}
            </div>
            {shown && (
              <p className="mt-3 rounded-lg bg-muted/60 px-3 py-2 text-sm leading-7">
                <span className="font-bold">التعليل: </span>
                <RichText text={q.why} />
              </p>
            )}
          </article>
        );
      })}
    </div>
  );
}
