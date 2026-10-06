"use client";

import { usePathname } from "next/navigation";

// Hides site chrome (header/footer/...) on standalone sections like /data-mining.
export function HideOnPath({
  prefix,
  children,
}: {
  prefix: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname?.startsWith(prefix)) return null;
  return children;
}
