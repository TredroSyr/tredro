"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PhoneInputProps {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  className?: string;
  placeholder?: string;
}

export function PhoneInput({
  value,
  onChange,
  readOnly = false,
  className,
  placeholder = "9xxxxxxxx",
}: PhoneInputProps) {
  if (readOnly) {
    return (
      <p
        dir="ltr"
        className={cn(
          "truncate text-end font-mono text-[11px] text-muted-foreground",
          className,
        )}
      >
        {value || "—"}
      </p>
    );
  }

  return (
    <Input
      type="tel"
      dir="ltr"
      inputMode="tel"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className={cn("font-mono", className)}
    />
  );
}
