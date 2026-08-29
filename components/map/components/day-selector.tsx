"use client";

import { Button } from "@/components/ui/button";
import { DayKey, DAYS, CustomerListItem } from "../lib/tour-data";

interface DaySelectorProps {
  day: DayKey;
  onDayChange: (day: DayKey) => void;
  items: CustomerListItem[];
}

export function DaySelector({ day, onDayChange, items }: DaySelectorProps) {
  const getCountForDay = (d: DayKey): number =>
    items.filter((item) => item.workDays.includes(d)).length;

  return (
    <div className="pointer-events-auto mt-2 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {DAYS.map((d) => {
        const count = getCountForDay(d.key);
        const active = d.key === day;
        return (
          <Button
            key={d.key}
            onClick={() => onDayChange(d.key)}
            variant={active ? "default" : "secondary"}
            size="sm"
            className="shrink-0 rounded-2xl px-3.5"
          >
            {d.label}
            <span className="ms-1.5 font-mono text-[10px] opacity-70">
              {count}
            </span>
          </Button>
        );
      })}
    </div>
  );
}
