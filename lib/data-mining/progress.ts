import { useSyncExternalStore } from "react";

// Studied ideas per lecture, persisted in localStorage:
// { "<lecture n>": [idea index, ...] }
type Progress = Record<string, number[]>;

const KEY = "data-mining:studied";
const EMPTY: Progress = {};
const NONE: number[] = [];

let cache: Progress | null = null;
const listeners = new Set<() => void>();

function read(): Progress {
  if (cache) return cache;
  try {
    const parsed = JSON.parse(window.localStorage.getItem(KEY) ?? "{}");
    cache = parsed && typeof parsed === "object" ? parsed : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache!;
}

function write(next: Progress) {
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable (private mode / quota): keep in memory only.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Sync across tabs.
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return;
    cache = null;
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useStudied(lecture: number): number[] {
  const progress = useSyncExternalStore(subscribe, read, () => EMPTY);
  return progress[lecture] ?? NONE;
}

export function setStudied(lecture: number, idea: number, done: boolean) {
  const current = read()[lecture] ?? [];
  const next = done
    ? Array.from(new Set([...current, idea])).sort((a, b) => a - b)
    : current.filter((i) => i !== idea);
  write({ ...read(), [lecture]: next });
}

export function setAllStudied(lecture: number, ideas: number[]) {
  write({ ...read(), [lecture]: ideas });
}
