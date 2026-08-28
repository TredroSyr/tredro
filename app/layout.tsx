import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { thmanyahSans } from "@/lib/fonts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://tredro.online";
const SITE_NAME = "Tredro | ترادرو";
const SITE_TITLE = "Tredro | إدارة مندوبي المبيعات، الطلبات، والعملاء";
const SITE_DESCRIPTION =
  "منصة Tredro تربط الشركات بالمناديب والسوبرماركت في نظام واحد: إدارة المناديب، متابعة الزيارات، إدارة الطلبيات والفواتير، وتطبيق خاص لأصحاب المحلات لطلب البضاعة مباشرة من الشركات.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Tredro",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "نظام إدارة المناديب",
    "تطبيق مناديب مبيعات",
    "إدارة طلبيات السوبرماركت",
    "برنامج مبيعات ميدانية",
    "sales rep management system",
    "rep app",
    "إدارة فواتير ومخزون",
    "Tredro",
  ],
  authors: [{ name: "Tredro" }],
  creator: "Tredro",
  publisher: "Tredro",
  applicationName: SITE_NAME,

  alternates: {
    canonical: "/",
    languages: {
      ar: "/",
      "ar-SA": "/",
    },
  },

  openGraph: {
    type: "website",
    locale: "ar_AR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tredro - نظام إدارة المناديب",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },

  manifest: "/site.webmanifest",

  verification: {
    google: "ضع_كود_Google_Search_Console_هون",
    // other: { "facebook-domain-verification": "..." },
  },

  category: "business",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a", // بدّلها للون هوية Tredro
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${thmanyahSans.variable}   antialiased`}
    >
      <body className=" flex flex-col font-thmanyah">
        {children}
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Tredro",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web, Android, iOS",
              description:
                "منصة لإدارة المناديب وربطهم بالشركات والسوبرماركت لإدارة الطلبيات والفواتير والمخزون.",
              url: SITE_URL,
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
