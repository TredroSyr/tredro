import type { Metadata } from "next";

const SITE_URL = "https://www.tredro.online";

export const metadata: Metadata = {
  alternates: {
    canonical: "/home",
    languages: {
      ar: "/home",
      "ar-SA": "/home",
    },
  },
  openGraph: {
    url: `${SITE_URL}/home`,
  },
};

export default function HomeLayout({ children }: LayoutProps<"/home">) {
  return children;
}
