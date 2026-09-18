import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { thmanyahSans } from "@/lib/fonts";
import { Header } from "@/components/header";
import Footer from "@/components/footer";
import "leaflet/dist/leaflet.css";

const THEME_INIT_SCRIPT = `
  try {
    const stored = localStorage.getItem('theme-storage');
    const theme = stored ? JSON.parse(stored).state.theme : 'light';
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://www.tredro.online";
const SITE_NAME = "Tredro | تريدرو";
const SITE_TITLE = "Tredro | إدارة مندوبي المبيعات، الطلبيات، والعملاء";
const SITE_DESCRIPTION =
  "منصة Tredro تربط الشركات بالمناديب والسوبرماركت ضمن دورة عمل واحدة: إدارة المناديب، متابعة الزيارات، إدارة الطلبيات والفواتير، وتطبيق خاص لأصحاب المحلات لطلب البضاعة مباشرة من الشركات. تخدم المنصة شركات التوزيع والمناديب في جميع المحافظات السورية، وتشمل حلب وطرطوس ودمشق واللاذقية وحمص.";

// Common English/Arabic misspellings of the brand, kept in one place so
// they can feed both `keywords` and the JSON-LD `alternateName` list.
const NAME_MISSPELLINGS_EN = [
  "Tredor",
  "Terdro",
  "Tradro",
  "Tredoo",
  "Treadro",
  "Tridro",
  "Tedro",
];
const NAME_MISSPELLINGS_AR = [
  "تريدور",
  "تردرو",
  "تريدرا",
  "تريدروا",
  "ترايدرو",
  "تريدو",
  "تردو",
];

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
    "نظام مناديب في سوريا",
    "توزيع في حلب",
    "مناديب مبيعات في طرطوس",
    "برنامج توزيع دمشق",
    "sales rep app Syria",
    "distribution software Aleppo",
    "sales rep management Tartous",
    ...NAME_MISSPELLINGS_EN,
    ...NAME_MISSPELLINGS_AR,
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
    locale: "ar_SY",
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

  category: "business",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${thmanyahSans.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="flex flex-col font-thmanyah">
        <Header />
        {children}
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Tredro",
              alternateName: [
                "تريدرو",
                ...NAME_MISSPELLINGS_EN,
                ...NAME_MISSPELLINGS_AR,
              ],
              url: SITE_URL,
              logo: `${SITE_URL}/icon-512.png`,
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Tredro",
              alternateName: [
                "تريدرو",
                ...NAME_MISSPELLINGS_EN,
                ...NAME_MISSPELLINGS_AR,
              ],
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web, Android, iOS",
              description:
                "منصة لإدارة المناديب وربطهم بالشركات والسوبرماركت لإدارة الطلبيات والفواتير والمخزون.",
              url: SITE_URL,
              areaServed: [
                {
                  "@type": "Country",
                  name: "Syria",
                },
                {
                  "@type": "City",
                  name: "Aleppo",
                },
                {
                  "@type": "City",
                  name: "Tartous",
                },
                {
                  "@type": "City",
                  name: "Damascus",
                },
                {
                  "@type": "City",
                  name: "Latakia",
                },
                {
                  "@type": "City",
                  name: "Homs",
                },
              ],
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
        <Footer />
      </body>
    </html>
  );
}
