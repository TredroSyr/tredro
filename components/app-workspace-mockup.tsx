"use client";

import { useState } from "react";
import Image from "next/image";
import { Sun, Moon, Copy, Check } from "lucide-react";
import { IconRenderer } from "@/assets/icons/iconRenderer";
import type { iconName } from "@/assets/icons/iconRenderer/types";
import { useThemeStore } from "@/store/use-theme-store";
import { Button } from "./ui/button";

type DashboardView =
  | "home"
  | "reps"
  | "customers"
  | "products"
  | "orders"
  | "invoices"
  | "permissions";

const SECTION_IMAGE_SLUGS: Record<DashboardView, string> = {
  home: "home",
  reps: "reps",
  customers: "customers",
  products: "products",
  orders: "orders",
  invoices: "invoices",
  permissions: "permissions",
};

interface NavItemConfig {
  key: DashboardView;
  label: string;
  icon: iconName;
  badge?: number;
  tone?: "primary" | "muted";
}

const NAV_ITEMS: NavItemConfig[] = [
  { key: "home", label: "الرئيسية", icon: "home_outlined" },
  { key: "reps", label: "المناديب", icon: "users_outlined", badge: 5 },
  { key: "customers", label: "الزبائن", icon: "contacts_outlined", badge: 5 },
  { key: "products", label: "المنتجات", icon: "category_outlined", badge: 8 },
  {
    key: "orders",
    label: "الطلبيات",
    icon: "card_outlined",
    badge: 5,
    tone: "muted",
  },
  {
    key: "invoices",
    label: "فواتير المستودع",
    icon: "checkout_outlined",
    badge: 4,
    tone: "muted",
  },
  {
    key: "permissions",
    label: "المستخدمون والصلاحيات",
    icon: "authorities_outlined",
  },
];

const SECTION_LABELS: Record<DashboardView, string> = NAV_ITEMS.reduce(
  (acc, item) => ({ ...acc, [item.key]: item.label }),
  {} as Record<DashboardView, string>,
);

interface NavButtonProps {
  item: NavItemConfig;
  isActive: boolean;
  onClick: () => void;
}

const NavButton = ({ item, isActive, onClick }: NavButtonProps) => {
  return (
    <button
      onClick={onClick}
      title={item.label}
      className={`group relative text-center flex w-full items-center gap-2.5 overflow-hidden rounded-xl px-3 py-2.5 1  ${
        isActive
          ? "bg-primary/10 text-primary  "
          : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
      }`}
    >
      <IconRenderer
        name={item.icon}
        className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
          isActive ? "scale-110 text-primary" : "group-hover:scale-110"
        }`}
      />
      <span className="hidden flex-1 truncate text-right lg:inline">
        {item.label}
      </span>
    </button>
  );
};

const MobileTopBar = () => {
  return (
    <div className="flex items-center justify-center border-b border-border bg-card px-4 py-3 lg:hidden">
      <Image
        src="/tredro/full_logo.svg"
        alt="logo"
        width={100}
        height={50}
        className="cursor-pointer transition-transform duration-200 hover:scale-105"
      />
    </div>
  );
};

interface SidebarInnerProps {
  activeTab: DashboardView;
  setActiveTab: (tab: DashboardView) => void;
  onNavigate?: () => void;
  showToast: (msg: string) => void;
}

const SidebarInner = ({
  activeTab,
  setActiveTab,
  onNavigate,
  showToast,
}: SidebarInnerProps) => {
  const { theme, toggleTheme, hasHydrated } = useThemeStore();
  const isDark = hasHydrated && theme === "dark";
  const [logoutOpen, setLogoutOpen] = useState(false);

  return (
    <div className="flex h-full flex-col bg-card p-2 ">
      <div className="mb-3 hidden items-center justify-center border-b border-border pb-4 lg:flex">
        <Image
          src="/tredro/full_logo.svg"
          alt="logo"
          width={140}
          height={70}
          className="h-auto w-[140px] object-contain"
        />
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <NavButton
            key={item.key}
            item={item}
            isActive={activeTab === item.key}
            onClick={() => {
              setActiveTab(item.key);
              onNavigate?.();
            }}
          />
        ))}
      </div>

      <div className="space-y-2 border-t border-border pt-3">
        <button
          onClick={toggleTheme}
          className="flex w-full items-center justify-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-bold text-muted-foreground transition-all duration-200 hover:translate-x-1 hover:bg-primary/10 active:scale-[0.97] lg:justify-start"
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
          <span className="hidden lg:inline">
            {isDark ? "الوضع الليلي" : "الوضع النهاري"}
          </span>
        </button>

        <button
          onClick={() => showToast("مركز مساعدة ودعم Tredro")}
          className="flex w-full items-center justify-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-bold text-muted-foreground transition-all duration-200 hover:translate-x-1 hover:bg-primary/10 active:scale-[0.97] lg:justify-start"
        >
          <IconRenderer
            name="help_outlined"
            className="h-4 w-4 shrink-0 text-primary"
          />
          <span className="hidden lg:inline">المساعدة والمعلومات</span>
        </button>

        <button
          onClick={() => setLogoutOpen(true)}
          className="flex w-full items-center justify-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-bold text-destructive transition-all duration-200 hover:translate-x-1 hover:bg-destructive/10 active:scale-[0.97] lg:justify-start"
        >
          <IconRenderer
            name="logout_outlined"
            className="h-4 w-4 shrink-0 text-destructive"
          />
          <span className="hidden lg:inline">تسجيل الخروج</span>
        </button>
      </div>
    </div>
  );
};

export const AppWorkspaceMockup = () => {
  const [activeTab, setActiveTab] = useState<DashboardView>("home");
  const [notification, setNotification] = useState<string | null>(null);
  const [installBannerVisible, setInstallBannerVisible] = useState(true);
  const [copied, setCopied] = useState(false);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleInstallApp = () => {
    window.open(
      "https://dashboard.tredro.online/download/tredro-dashboard.apk",
      "_blank",
      "noopener,noreferrer",
    );
    showToast("جارِ تحميل تطبيق Tredro Dashboard ✅");
  };

  const handleCopyUrl = async () => {
    const url = `https://dashboard.tredro.online/${activeTab}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      showToast("تم نسخ الرابط");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      showToast("تعذّر نسخ الرابط");
    }
  };

  const imageSlug = SECTION_IMAGE_SLUGS[activeTab];

  return (
    <div className="relative flex w-full select-none flex-col overflow-hidden rounded-3xl border border-border bg-card text-foreground shadow-2xl shadow-foreground/10">
      {installBannerVisible && (
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 sm:gap-3 border-b border-primary/50 bg-gradient-to-l from-primary/70 via-primary to-primary/90 px-3.5 py-2.5 text-xs text-primary-foreground sm:px-6">
          <div className="flex min-w-0 flex-1 items-center gap-2.5">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/20">
              <IconRenderer
                name="mobile_outlined"
                className="h-3.5 w-3.5 text-white"
              />
            </div>
            <p className="min-w-0 flex-1 text-[11px] leading-snug text-white sm:text-xs line-clamp-2 sm:line-clamp-1">
              يمكنك تنزيل تطبيق Tredro dashboard وتثبيته كتطبيق مستقل على الهاتف
              للعمل دون متصفح وبأداء أسرع.
            </p>
          </div>
          <Button
            variant="secondary"
            onClick={handleInstallApp}
            className="shrink-0 whitespace-nowrap"
          >
            <IconRenderer name="download_outlined" className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">تثبيت التطبيق الآن</span>
          </Button>
        </div>
      )}

      <div className="flex items-center justify-between gap-2 border-b border-border bg-muted/90 px-3 py-2.5 text-xs sm:gap-4 sm:px-4">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-destructive sm:h-3 sm:w-3" />
          <div className="h-2.5 w-2.5 rounded-full bg-warning sm:h-3 sm:w-3" />
          <div className="h-2.5 w-2.5 rounded-full bg-primary sm:h-3 sm:w-3" />
        </div>

        <div
          onClick={() =>
            window.open(
              `https://dashboard.tredro.online/${activeTab}`,
              "_blank",
              "noopener,noreferrer",
            )
          }
          role="button"
          tabIndex={0}
          className="flex max-w-md flex-1 cursor-pointer items-center gap-2 rounded-xl border border-border bg-card px-2.5 py-1 font-mono text-[10px] text-muted-foreground shadow-xs hover:bg-accent/50 sm:px-3 sm:text-[11px]"
        >
          <IconRenderer name="lock_filled" />
          <span className="truncate">dashboard.tredro.online/{activeTab}</span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCopyUrl();
          }}
          aria-label="نسخ الرابط"
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-all duration-200 hover:bg-accent active:scale-[0.9]"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-primary" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>

        <div className="w-6 sm:hidden" />
      </div>

      <MobileTopBar />

      <div className="relative flex min-h-[600px] flex-row overflow-hidden bg-muted/50">
        <div className="flex w-14 shrink-0 border-l border-border lg:w-[15rem]">
          <SidebarInner
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            showToast={showToast}
          />
        </div>

        <main className="flex-1 ">
          <div
            key={activeTab}
            className="h-full w-full animate-in fade-in overflow-hidden border-r border-border bg-muted shadow-xs duration-200"
          >
            <img
              src={`/phone/${imageSlug}-light.jpeg`}
              alt={SECTION_LABELS[activeTab]}
              className="block h-auto w-full object-cover lg:hidden dark:hidden"
            />
            <img
              src={`/phone/${imageSlug}-dark.jpeg`}
              alt={SECTION_LABELS[activeTab]}
              className="hidden h-auto w-full object-cover dark:block dark:lg:hidden"
            />
            <img
              src={`/dashborad/${imageSlug}-light.jpeg`}
              alt={SECTION_LABELS[activeTab]}
              className="hidden h-auto w-full object-cover lg:block lg:dark:hidden"
            />
            <img
              src={`/dashborad/${imageSlug}-dark.jpeg`}
              alt={SECTION_LABELS[activeTab]}
              className="hidden h-auto w-full object-cover dark:lg:block"
            />
          </div>
        </main>
      </div>

      {notification && (
        <div className="absolute bottom-4 right-4 z-[70] max-w-xs rounded-xl bg-foreground px-4 py-2.5 text-xs font-bold text-background shadow-lg">
          {notification}
        </div>
      )}
    </div>
  );
};

export default AppWorkspaceMockup;
