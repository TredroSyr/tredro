import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const footerLinks = [
  { label: "الشروط والأحكام", href: "#" },
  { label: "سياسة الخصوصية", href: "#" },
  { label: "أمان البيانات", href: "#" },
  { label: "تواصل معنا", href: "#" },
];

const Footer = () => {
  return (
    <footer className="relative bg-muted text-card-foreground border-t border-border overflow-hidden">
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-info/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6 sm:py-10">
        <div className="flex flex-col md:flex-row md:items-start items-center text-center md:text-start justify-between gap-8">
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
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors duration-200 hover:text-card-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
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
