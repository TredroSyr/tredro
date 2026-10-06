import { Fragment } from "react";

// Renders `code` as LTR inline (English terms / formulas) and **bold**.
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <bdi
              key={i}
              dir="ltr"
              className="mx-0.5 rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
            >
              {part.slice(1, -1)}
            </bdi>
          );
        }
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-bold text-foreground">
              <RichText text={part.slice(2, -2)} />
            </strong>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
