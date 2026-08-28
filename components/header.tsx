"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { IconRenderer } from "@/assets/icons/iconRenderer";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/store/use-theme-store";

const NAV_ITEMS = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "من نحن" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const theme = useThemeStore((state) => state.theme);
  const hasHydrated = useThemeStore((state) => state.hasHydrated);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const themeToggleIcon = hasHydrated && theme === "dark" ? "morning_sun_outlined" : "moon_outlined";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-md transition-all duration-200">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 sm:gap-8">
          <Link href="/" className="flex items-center focus:outline-none" aria-label="Tredro Home">
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
                  className={`rounded-xl px-4 py-2 transition-all ${
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
            render={<Link href="/customer" />}
            variant="outline"
            size="lg"
            className="text-xs sm:text-sm"
          >
            <IconRenderer name="cart_outlined" />
            <span>ابدأ كزبون</span>
          </Button>

          <Button
            render={<Link href="/company" />}
            variant="default"
            size="lg"
            className="text-xs sm:text-sm"
          >
            <IconRenderer name="partners_outlined" />
            <span>ابدأ كشركة</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="تبديل المظهر"
          >
            <IconRenderer name={themeToggleIcon} />
          </Button>
        </div>

        <div className="flex items-center gap-2 sm:hidden">
          <Button render={<Link href="/company" />} variant="default" size="sm" className="text-[11px]">
            ابدأ كشركة
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="تبديل المظهر"
          >
            <IconRenderer name={themeToggleIcon} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <IconRenderer name={mobileMenuOpen ? "close_outlined" : "menu_outlined"} />
          </Button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="animate-in slide-in-from-top-2 space-y-3 border-t border-border bg-background px-4 pt-3 pb-6 text-right shadow-xl duration-200 sm:hidden">
          <div className="flex flex-col gap-1 text-sm font-bold text-foreground">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-xl p-3 text-right transition-colors ${
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
              render={<Link href="/customer" onClick={() => setMobileMenuOpen(false)} />}
              variant="outline"
              className="w-full text-xs"
            >
              <IconRenderer name="cart_outlined" />
              <span>ابدأ كزبون (سوبرماركت ومتاجر)</span>
            </Button>

            <Button
              render={<Link href="/company" onClick={() => setMobileMenuOpen(false)} />}
              variant="default"
              className="w-full text-xs"
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
