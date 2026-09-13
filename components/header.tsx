"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";

import { IconRenderer } from "@/assets/icons/iconRenderer";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/store/use-theme-store";

const NAV_ITEMS = [
  { href: "/home", label: "الرئيسية" },
  { href: "/home#work-sprawl", label: "التحديات" },
  { href: "/home#rep-mobile-inspect", label: "تطبيق المندوب" },
  { href: "/home#product", label: "المزايا" },
  { href: "/about", label: "من نحن" },
];

export const DASHBOARD_URL = "https://dashboard.tredro.online/";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme, hasHydrated } = useThemeStore();
  const isDark = hasHydrated && theme === "dark";

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const [path, hash] = href.split("#");
    if (hash && path === "/home" && pathname === "/home") {
      event.preventDefault();
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="relative sticky top-3 z-40 w-full px-4 transition-all duration-200 sm:top-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 z-0 rounded-full bg-gradient-to-b from-primary/30 via-primary/15 to-transparent blur-3xl pointer-events-none" />

      <nav className="relative z-10 mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full border border-border/60 bg-background/60 px-4 shadow-lg shadow-black/5 backdrop-blur-[90px] backdrop-saturate-200 dark:border-border/40 dark:bg-background/40 sm:h-20 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 sm:gap-8">
          <Link
            href="/home"
            className="flex items-center focus:outline-none"
            aria-label="Tredro Home"
          >
            <Image
              src="/tredro/full_logo.svg"
              alt="logo"
              width={100}
              height={50}
              className="transition-transform duration-200 hover:scale-105"
            />
          </Link>

          <div className="hidden items-center gap-2 text-sm font-bold text-muted-foreground sm:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(event) => handleNavClick(event, item.href)}
                  className={`rounded-full px-4 py-2 transition-all ${
                    isActive
                      ? "bg-primary/10 font-black text-primary shadow-xs"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <Button
            render={
              <a
                href={DASHBOARD_URL}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
            variant="default"
            size="lg"
            className="rounded-full text-xs sm:text-sm"
          >
            <IconRenderer name="partners_outlined" />
            <span>ابدأ كشركة</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="تبديل المظهر"
            className="rounded-full"
          >
            <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
              <Sun
                className={`absolute h-4 w-4 text-primary transition-all duration-300 ${
                  isDark
                    ? "-rotate-90 scale-0 opacity-0"
                    : "rotate-0 scale-100 opacity-100"
                }`}
              />
              <Moon
                className={`absolute h-4 w-4 text-primary transition-all duration-300 ${
                  isDark
                    ? "rotate-0 scale-100 opacity-100"
                    : "rotate-90 scale-0 opacity-0"
                }`}
              />
            </span>
          </Button>
        </div>

        <div className="flex items-center gap-2 sm:hidden">
          <Button
            render={
              <a
                href={DASHBOARD_URL}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
            variant="default"
            size="sm"
            className="rounded-full text-[11px]"
          >
            ابدأ كشركة
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="تبديل المظهر"
            className="rounded-full"
          >
            <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
              <Sun
                className={`absolute h-4 w-4 text-primary transition-all duration-300 ${
                  isDark
                    ? "-rotate-90 scale-0 opacity-0"
                    : "rotate-0 scale-100 opacity-100"
                }`}
              />
              <Moon
                className={`absolute h-4 w-4 text-primary transition-all duration-300 ${
                  isDark
                    ? "rotate-0 scale-100 opacity-100"
                    : "rotate-90 scale-0 opacity-0"
                }`}
              />
            </span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="rounded-full"
          >
            <IconRenderer
              name={mobileMenuOpen ? "close_outlined" : "menu_outlined"}
            />
          </Button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="animate-in slide-in-from-top-2 relative z-10 mx-auto mt-2 max-w-7xl space-y-3 rounded-3xl border border-border/60 bg-background/80 px-4 pt-3 pb-6 text-right shadow-xl backdrop-blur-2xl backdrop-saturate-150 duration-200 sm:hidden">
          <div className="flex flex-col gap-1 text-sm font-bold text-foreground">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(event) => handleNavClick(event, item.href)}
                  className={`rounded-2xl p-3 text-right transition-colors ${
                    isActive
                      ? "bg-primary/10 font-extrabold text-primary"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col gap-2 border-t border-border pt-3">
            <Button
              render={
                <a
                  href={DASHBOARD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                />
              }
              variant="default"
              className="w-full rounded-full text-xs"
            >
              <IconRenderer name="partners_outlined" />
              <span>ابدأ كشركة (موردين وموزعين)</span>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
