import type { Metadata } from "next";

const SITE_URL = "https://www.tredro.online";
const ABOUT_TITLE = "من نحن";
const ABOUT_DESCRIPTION =
  "تعرف على قصة منصة Tredro ورسالتها في أتمتة التجارة والتوزيع الميداني، ورؤيتها لمضاعفة كفاءة وإنتاجية سلاسل التوزيع، وتمكين شركات التوزيع والمناديب الميدانيين ومحلات التجزئة من العمل بأعلى سرعة ودقة.";

export const metadata: Metadata = {
  title: ABOUT_TITLE,
  description: ABOUT_DESCRIPTION,
  alternates: {
    canonical: "/about",
    languages: {
      ar: "/about",
      "ar-SA": "/about",
    },
  },
  openGraph: {
    url: `${SITE_URL}/about`,
    title: ABOUT_TITLE,
    description: ABOUT_DESCRIPTION,
  },
  twitter: {
    title: ABOUT_TITLE,
    description: ABOUT_DESCRIPTION,
  },
};

export default function AboutLayout({ children }: LayoutProps<"/about">) {
  return children;
}
