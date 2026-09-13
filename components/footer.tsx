import { SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { DASHBOARD_URL } from "@/components/header";

const FacebookIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.5" y1="6.5" y2="6.5" />
  </svg>
);

const MANDOUB_URL = "https://mandoub.tredro.online";
const CUSTOMER_URL = "https://customer.tredro.online";

const siteLinks = [
  { label: "لوحة التحكم", href: DASHBOARD_URL },
  { label: "تطبيق المندوب", href: MANDOUB_URL },
  { label: "تطبيق العميل", href: CUSTOMER_URL },
];

const downloadLinks = [
  {
    label: " لوحة التحكم",
    href: "https://dashboard.tredro.online/download/tredro-dashboard.apk",
  },
  {
    label: " تطبيق المندوب",
    href: "https://mandoub.tredro.online/download/tredro-mandoub.apk",
  },
  {
    label: " تطبيق العميل",
    href: "https://customer.tredro.online/download/tredro-customer.apk",
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1Fm16LgfnH/",
    icon: FacebookIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/tredro_sy",
    icon: InstagramIcon,
  },
];

const Footer = () => {
  return (
    <footer className="relative bg-muted text-card-foreground border-t border-border overflow-hidden">
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-info/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6 sm:py-10">
        <div className="flex flex-col md:flex-row md:flex-wrap md:items-start items-center text-center md:text-start justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-3 max-w-sm">
            <Image
              src="/tredro/full_logo.svg"
              alt="logo"
              width={120}
              height={50}
              className="cursor-pointer transition-transform duration-200 hover:scale-105"
            />
            <p className="text-sm leading-relaxed text-muted-foreground">
              صُممت منصة Tredro بعناية لتطوير كفاءة التوزيع والمبيعات الميدانية،
              من خلال حلول رقمية متكاملة تدعم فرق العمل الميدانية.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h3 className="text-sm font-semibold text-card-foreground/90">
              روابط سريعة
            </h3>
            <nav className="flex flex-col items-center md:items-start gap-2">
              {siteLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors duration-200 hover:text-card-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Downloads */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h3 className="text-sm font-semibold text-card-foreground/90">
              تحميل التطبيقات
            </h3>
            <nav className="flex flex-col items-center md:items-start gap-2">
              {downloadLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors duration-200 hover:text-card-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h3 className="text-sm font-semibold text-card-foreground/90">
              تابعنا
            </h3>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-background/60 text-muted-foreground transition-colors duration-200 hover:text-card-foreground"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-border" />

        {/* Bottom bar */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
          <span className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} منصة Tredro. جميع الحقوق محفوظة.
          </span>
          <span className="text-xs text-muted-foreground">
            صُنع بعناية في سورية
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
