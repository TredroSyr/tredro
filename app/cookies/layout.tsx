import type { Metadata } from "next";

const SITE_URL = "https://www.tredro.online";
const COOKIES_TITLE = "سياسة ملفات تعريف الارتباط";
const COOKIES_DESCRIPTION =
  "تعرف على كيفية استخدام منصة Tredro لملفات تعريف الارتباط وأدوات التحليل مثل Google Analytics، وكيف يمكنك التحكم في تفضيلاتك.";

export const metadata: Metadata = {
  title: COOKIES_TITLE,
  description: COOKIES_DESCRIPTION,
  alternates: {
    canonical: "/cookies",
    languages: {
      ar: "/cookies",
      "ar-SA": "/cookies",
    },
  },
  openGraph: {
    url: `${SITE_URL}/cookies`,
    title: COOKIES_TITLE,
    description: COOKIES_DESCRIPTION,
  },
  twitter: {
    title: COOKIES_TITLE,
    description: COOKIES_DESCRIPTION,
  },
};

export default function CookiesLayout({ children }: LayoutProps<"/cookies">) {
  return children;
}
