import React, { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { IconRenderer } from "@/assets/icons/iconRenderer";
import type { iconName } from "@/assets/icons/iconRenderer/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { useThemeStore } from "@/store/use-theme-store";

import Image from "next/image";

const ThemeToggleItem = () => {
  const { theme, toggleTheme, hasHydrated } = useThemeStore();
  const isDark = hasHydrated && theme === "dark";

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={toggleTheme}
        className="cursor-pointer transition-all duration-200 hover:translate-x-1 hover:bg-primary/10 active:scale-[0.97]"
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
        <span className="truncate">
          {isDark ? "الوضع الليلي" : "الوضع النهاري"}
        </span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

const LogoutMenuItem = ({ onConfirm }: { onConfirm: () => void }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={() => setOpen(true)}
          className="cursor-pointer text-destructive transition-all duration-200 hover:translate-x-1 hover:bg-destructive/10 hover:text-destructive active:scale-[0.97]"
        >
          <IconRenderer
            name="logout_outlined"
            className="h-4 w-4 shrink-0 text-destructive"
          />
          <span className="truncate">تسجيل الخروج</span>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>تسجيل الخروج</DialogTitle>
          <DialogDescription>هل انت متأكد من تسجيل الخروج</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            إلغاء
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              setOpen(false);
              onConfirm();
            }}
          >
            تسجيل الخروج
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export type DashboardView =
  | "home"
  | "reps"
  | "customers"
  | "products"
  | "create_product"
  | "orders"
  | "invoices"
  | "permissions";

const SECTION_IMAGE_SLUGS: Record<DashboardView, string> = {
  home: "home",
  reps: "reps",
  customers: "customers",
  products: "products",
  create_product: "create-product",
  orders: "orders",
  invoices: "invoices",
  permissions: "permissions",
};

export const AppWorkspaceMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DashboardView>("home");
  const [notification, setNotification] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [installedPwa, setInstalledPwa] = useState(false);
  const [installBannerVisible, setInstallBannerVisible] = useState(true);

  const theme = useThemeStore((s) => s.theme);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleInstallApp = () => {
    setInstalledPwa(true);
    showToast("تم تثبيت تطبيق Tredro بنجاح على جهازك ✅");
  };

  const sidebarNavItems: {
    key: DashboardView;
    label: string;
    icon: iconName;
    isActive: boolean;
    badge?: { count: number; tone: "primary" | "muted" };
  }[] = [
    {
      key: "home",
      label: "الرئيسية",
      icon: "home_outlined",
      isActive: activeTab === "home",
    },
    {
      key: "reps",
      label: "المناديب",
      icon: "users_outlined",
      isActive: activeTab === "reps",
      badge: { count: 5, tone: "primary" },
    },
    {
      key: "customers",
      label: "الزبائن",
      icon: "contacts_outlined",
      isActive: activeTab === "customers",
      badge: { count: 5, tone: "primary" },
    },
    {
      key: "products",
      label: "المنتجات",
      icon: "category_outlined",
      isActive: activeTab === "products" || activeTab === "create_product",
      badge: { count: 8, tone: "primary" },
    },
    {
      key: "orders",
      label: "الطلبيات",
      icon: "cart_outlined",
      isActive: activeTab === "orders",
      badge: { count: 5, tone: "muted" },
    },
    {
      key: "invoices",
      label: "فواتير المستودع",
      icon: "checkout_outlined",
      isActive: activeTab === "invoices",
      badge: { count: 4, tone: "muted" },
    },
    {
      key: "permissions",
      label: "المستخدمون والصلاحيات",
      icon: "authorities_outlined",
      isActive: activeTab === "permissions",
    },
  ];

  const imageSlug = SECTION_IMAGE_SLUGS[activeTab];
  const imageSrc = `/dashborad/${imageSlug}-${theme}.jpeg`;

  return (
    <div className="w-full bg-card rounded-3xl shadow-2xl shadow-foreground/10 border border-border overflow-hidden text-foreground flex flex-col select-none relative">
      {installBannerVisible && (
        <div className="bg-gradient-to-r from-primary/90 via-primary to-primary/70 text-primary-foreground px-3.5 sm:px-6 py-2.5 flex items-center justify-between gap-3 text-xs border-b border-primary/50 shadow-sm animate-in fade-in duration-300">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-6 h-6 rounded-lg bg-primary-foreground/20 flex items-center justify-center shrink-0">
              <IconRenderer
                name="mobile_outlined"
                className="w-3.5 h-3.5 text-primary-foreground"
              />
            </div>
            <p className="font-bold truncate text-[11px] sm:text-xs">
              يمكنك تنزيل تطبيق Tredro وتثبيته كتطبيق مستقل على الهاتف
              والكمبيوتر، للعمل دون متصفح وبأداء أسرع.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              onClick={handleInstallApp}
              className="px-3 py-1 bg-card text-primary hover:bg-primary/10 font-black rounded-lg text-[11px] shadow-xs active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <IconRenderer name="download_outlined" className="w-3.5 h-3.5" />
              <span>
                {installedPwa ? "مثبت على جهازك ✓" : "تثبيت التطبيق الآن"}
              </span>
            </Button>
            <Button
              onClick={() => setInstallBannerVisible(false)}
              className="text-primary-foreground/70 hover:text-primary-foreground p-1 rounded-md"
              title="إغلاق التنبيه"
            >
              <IconRenderer name="close_outlined" className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      )}

      {/* Top Chrome / Browser Address Bar Simulation */}
      <div className="bg-muted/90 px-3 sm:px-4 py-2.5 border-b border-border flex items-center justify-between gap-2 sm:gap-4 text-xs">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-destructive" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-warning" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary" />
        </div>

        {/* URL Bar */}
        <div className="flex-1 max-w-md bg-card rounded-xl px-2.5 sm:px-3 py-1 border border-border flex items-center gap-2 text-muted-foreground font-mono text-[10px] sm:text-[11px] shadow-xs">
          <IconRenderer name="lock_filled" />
          <span className=" ">
            dashboard.tredro.online/
            {activeTab === "create_product" ? "products/create" : activeTab}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground">
          <div></div>
        </div>
      </div>

      {/* Mobile Top Horizontal Scrollable Tabs */}
      <div className="lg:hidden bg-card border-b border-border px-3 py-2 overflow-x-auto no-scrollbar flex items-center gap-1.5 text-xs font-bold shrink-0">
        <Button
          onClick={() => setMobileMenuOpen(true)}
          className="px-3 py-1.5 rounded-xl bg-muted hover:bg-accent text-foreground font-extrabold flex items-center gap-1.5 shrink-0 border border-border cursor-pointer"
        >
          <IconRenderer
            name="menu_outlined"
            className="w-3.5 h-3.5 text-primary"
          />
          <span>كل الأقسام</span>
        </Button>
        <Button
          onClick={() => setActiveTab("home")}
          className={`px-3 py-1.5 rounded-xl whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
            activeTab === "home"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "bg-muted text-muted-foreground hover:bg-accent"
          }`}
        >
          <IconRenderer name="home_outlined" className="w-3.5 h-3.5" />
          <span>الرئيسية</span>
        </Button>
        <Button
          onClick={() => setActiveTab("reps")}
          className={`px-3 py-1.5 rounded-xl whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
            activeTab === "reps"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "bg-muted text-muted-foreground hover:bg-accent"
          }`}
        >
          <IconRenderer name="users_outlined" className="w-3.5 h-3.5" />
          <span>المناديب (5)</span>
        </Button>
        <Button
          onClick={() => setActiveTab("customers")}
          className={`px-3 py-1.5 rounded-xl whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
            activeTab === "customers"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "bg-muted text-muted-foreground hover:bg-accent"
          }`}
        >
          <IconRenderer name="contacts_outlined" className="w-3.5 h-3.5" />
          <span>الزبائن (5)</span>
        </Button>
        <Button
          onClick={() => setActiveTab("products")}
          className={`px-3 py-1.5 rounded-xl whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
            activeTab === "products" || activeTab === "create_product"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "bg-muted text-muted-foreground hover:bg-accent"
          }`}
        >
          <IconRenderer name="category_outlined" className="w-3.5 h-3.5" />
          <span>المنتجات (8)</span>
        </Button>
        <Button
          onClick={() => setActiveTab("orders")}
          className={`px-3 py-1.5 rounded-xl whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
            activeTab === "orders"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "bg-muted text-muted-foreground hover:bg-accent"
          }`}
        >
          <IconRenderer name="cart_outlined" className="w-3.5 h-3.5" />
          <span>الطلبيات (5)</span>
        </Button>
        <Button
          onClick={() => setActiveTab("invoices")}
          className={`px-3 py-1.5 rounded-xl whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
            activeTab === "invoices"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "bg-muted text-muted-foreground hover:bg-accent"
          }`}
        >
          <IconRenderer name="checkout_outlined" className="w-3.5 h-3.5" />
          <span>الفواتير (4)</span>
        </Button>
      </div>

      {/* Toast Notification */}
      {notification && (
        <div className="bg-foreground text-primary-foreground text-xs font-bold px-4 py-2 flex items-center justify-between border-b border-border animate-in slide-in-from-top duration-200">
          <span className="flex items-center gap-2">
            <IconRenderer
              name="success_outlined"
              className="w-4 h-4 text-primary"
            />{" "}
            {notification}
          </span>
          <Button
            onClick={() => setNotification(null)}
            className="text-muted-foreground hover:text-primary-foreground"
          >
            <IconRenderer name="close_outlined" className="w-3.5 h-3.5" />
          </Button>
        </div>
      )}

      {/* Main App Layout */}
      <SidebarProvider
        defaultOpen
        className="contents"
        style={{ "--sidebar-width": "15rem" } as React.CSSProperties}
      >
        <div className="flex flex-col lg:flex-row min-h-[600px] bg-muted/50">
          {/* ========================================================
              RIGHT SIDEBAR (Desktop) — same Sidebar kit as the real app
              ======================================================== */}
          <div className="hidden lg:contents">
            <Sidebar
              side="right"
              collapsible="none"
              className="border-l border-border bg-card p-3 flex-col justify-between shrink-0"
            >
              <SidebarHeader className="p-0 pb-4 mb-3 border-b border-border">
                <Image
                  src="/tredro/full_logo.svg"
                  alt="logo"
                  width={110}
                  height={55}
                  className="transition-transform duration-200 hover:scale-105"
                />
              </SidebarHeader>

              <SidebarContent className="gap-0">
                <SidebarGroup className="p-0">
                  <SidebarGroupContent>
                    <SidebarMenu className="gap-2">
                      {sidebarNavItems.map((item) => (
                        <SidebarMenuItem
                          key={item.key}
                          className="group/menu-item"
                        >
                          <SidebarMenuButton
                            isActive={item.isActive}
                            onClick={() => setActiveTab(item.key)}
                            className={`relative cursor-pointer overflow-hidden text-xs font-bold transition-all duration-200 ease-out hover:translate-x-1 hover:bg-primary/10 active:scale-[0.97] ${
                              item.isActive
                                ? "bg-primary/10 font-black text-primary before:absolute before:right-0 before:top-1/2 before:h-4/5 before:w-1 before:-translate-y-1/2 before:rounded-full before:bg-primary"
                                : "text-muted-foreground"
                            }`}
                          >
                            <IconRenderer
                              name={item.icon}
                              className={`h-4 w-4 shrink-0 transition-all duration-200 ${
                                item.isActive
                                  ? "scale-110 text-primary"
                                  : "text-muted-foreground group-hover/menu-item:scale-110 group-hover/menu-item:text-primary"
                              }`}
                            />
                            <span className="flex-1 truncate">
                              {item.label}
                            </span>
                            {item.badge && (
                              <Badge
                                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                                  item.badge.tone === "primary"
                                    ? "bg-primary/15 text-primary"
                                    : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {item.badge.count}
                              </Badge>
                            )}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                {/* Rep Mobile App Jump Card (marketing-only shortcut) */}
                <div className="mt-4 p-2.5 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl">
                  <a
                    href="#rep-mobile-inspect"
                    className="flex items-center justify-between text-xs font-black text-primary hover:text-primary"
                  >
                    <span className="flex items-center gap-1.5">
                      <IconRenderer
                        name="mobile_outlined"
                        className="w-4 h-4 text-primary"
                      />
                      <span>تطبيق هاتف المندوب</span>
                    </span>
                    <Badge className="text-[9px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded-md font-bold">
                      Auto Map
                    </Badge>
                  </a>
                </div>
              </SidebarContent>

              <SidebarFooter className="gap-2 p-0 pt-3 border-t border-border">
                <SidebarMenu className="gap-2">
                  {/* Company Profile Card */}
                  <div
                    onClick={() =>
                      showToast("الانتقال إلى الملف الشخصي للمنشأة (تجريبي)")
                    }
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-primary/5 p-2.5 transition-all duration-200 hover:bg-primary/10 active:scale-[0.97]"
                  >
                    <Avatar className="h-9 w-9 shrink-0 border-2 border-background">
                      <AvatarFallback className="bg-primary/20 text-primary flex items-center justify-center">
                        <IconRenderer
                          name="no_image_filled"
                          className="h-4.5 w-4.5 text-primary/70"
                        />
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-foreground">
                        مؤسسة الشامي للتوزيع
                      </p>
                      <Badge className="h-4 mt-0.5 bg-primary/10 text-primary px-1.5 text-[10px] font-bold">
                        Tredro Cloud متصل
                      </Badge>
                    </div>
                  </div>

                  <ThemeToggleItem />

                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => showToast("مركز مساعدة ودعم Tredro")}
                      className="cursor-pointer text-xs font-bold transition-all duration-200 hover:translate-x-1 hover:bg-primary/10 active:scale-[0.97]"
                    >
                      <IconRenderer
                        name="help_outlined"
                        className="h-4 w-4 shrink-0 text-primary"
                      />
                      <span className="truncate">المساعدة والمعلومات</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <LogoutMenuItem
                    onConfirm={() => showToast("تم تسجيل الخروج (تجريبي)")}
                  />
                </SidebarMenu>
              </SidebarFooter>
            </Sidebar>
          </div>

          {/* ========================================================
              MAIN CONTENT AREA — static per-section screenshot
              ======================================================== */}
          <main className="flex-1 p-3.5 sm:p-6 overflow-y-auto">
            <div
              key={imageSrc}
              className="w-full h-full rounded-2xl overflow-hidden border border-border shadow-xs bg-muted animate-in fade-in duration-200"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageSrc}
                alt={
                  sidebarNavItems.find((i) => i.key === activeTab)?.label ??
                  activeTab
                }
                className="w-full h-auto object-contain"
              />
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};
