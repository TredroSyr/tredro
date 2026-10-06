import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "تنقيب المعطيات",
    template: "%s | تنقيب المعطيات",
  },
  description: "دراسة مادة تنقيب المعطيات: أفكار كل محاضرة، القوانين والاختصارات، وأسئلة MCQ.",
  robots: { index: false, follow: false },
};

export default function DataMiningLayout({
  children,
}: LayoutProps<"/data-mining">) {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 pb-24 pt-10 sm:px-6">
      {children}
    </main>
  );
}
