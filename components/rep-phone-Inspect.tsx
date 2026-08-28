import React, { useState } from "react";
import { Wifi, Battery } from "lucide-react";

import { IconRenderer } from "@/assets/icons/iconRenderer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface StoreLocation {
  id: string;
  name: string;
  owner: string;
  phone: string;
  day: string;
  status: "pending" | "completed" | "current";
  address: string;
  balance: number;
  lastOrder?: string;
  x: number;
  y: number;
}

const SAMPLE_STORES: StoreLocation[] = [
  {
    id: "1",
    name: "سوبرماركت البركة",
    owner: "أبو أحمد الشامي",
    phone: "+963 933 123 456",
    day: "السبت",
    status: "completed",
    address: "شارع طارق بن زياد - تقاطع 4",
    balance: 1450000,
    lastOrder: "3 كراتين حليب نيدو + 5 كراتين زيت الزهرة",
    x: 38,
    y: 42,
  },
  {
    id: "2",
    name: "ميني ماركت الأمل",
    owner: "محمود خليل",
    phone: "+963 944 987 654",
    day: "السبت",
    status: "current",
    address: "شارع المحلق الشرقي - جانب الصيدلية",
    balance: 3200000,
    lastOrder: "طلب مسبق قيد التسليم (شاي سيلاني + أرز)",
    x: 55,
    y: 32,
  },
  {
    id: "3",
    name: "بقالية النور والهدى",
    owner: "سالم الدوسري",
    phone: "+963 955 321 098",
    day: "السبت",
    status: "pending",
    address: "طريق المدينة المنورة - بناء الأوقاف",
    balance: 0,
    lastOrder: "زيارة دورية أسبوعية لتحصيل الفاتورة",
    x: 68,
    y: 64,
  },
  {
    id: "4",
    name: "أسواق الخيرات الكبرى",
    owner: "الحاج عمر غسان",
    phone: "+963 966 789 123",
    day: "السبت",
    status: "pending",
    address: "شارع التجارة المركزي",
    balance: 5850000,
    lastOrder: "تحصيل شيك + توريد 10 كراتين تونة",
    x: 28,
    y: 72,
  },
  {
    id: "5",
    name: "تموينات الفلاح الحديثة",
    owner: "فهد العتيبي",
    phone: "+963 988 334 455",
    day: "الأحد",
    status: "pending",
    address: "شارع النهضة الرئيسي",
    balance: 920000,
    lastOrder: "طلب شهري منتظم",
    x: 45,
    y: 50,
  },
  {
    id: "6",
    name: "سوبرماركت الوفاء التجاري",
    owner: "طارق ناصر",
    phone: "+963 999 112 233",
    day: "الاثنين",
    status: "pending",
    address: "شارع الملك فيصل",
    balance: 2100000,
    lastOrder: "طلب مستعجل مسحوق غسيل وزيت",
    x: 60,
    y: 45,
  },
];

export const RepPhoneInspect: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  // Mobile app state: 'launcher' (home screen with apps) | 'splash' | 'map'
  const [screenState, setScreenState] = useState<"launcher" | "splash" | "map">(
    "launcher",
  );
  const [selectedDay, setSelectedDay] = useState<string>("السبت");
  const [selectedStore, setSelectedStore] = useState<StoreLocation | null>(
    null,
  );
  const [storesListOpen, setStoresListOpen] = useState(false);
  const [addStoreModalOpen, setAddStoreModalOpen] = useState(false);
  const [activeBottomTab, setActiveBottomTab] = useState<
    "history" | "pos" | "home" | "stores" | "map"
  >("map");
  const [gpsNotification, setGpsNotification] = useState<string | null>(null);
  const [newStoreName, setNewStoreName] = useState("");
  const [newStoreAddress, setNewStoreAddress] = useState("");

  const daysList = [
    { name: "السبت", count: 4 },
    { name: "الأحد", count: 5 },
    { name: "الاثنين", count: 3 },
    { name: "الثلاثاء", count: 6 },
    { name: "الأربعاء", count: 4 },
    { name: "الخميس", count: 2 },
  ];

  const handleLaunchApp = () => {
    setScreenState("splash");
    setTimeout(() => {
      setScreenState("map");
    }, 700);
  };

  const handleGoHome = () => {
    setSelectedStore(null);
    setStoresListOpen(false);
    setAddStoreModalOpen(false);
    setScreenState("launcher");
  };

  const handleGpsLocate = () => {
    setGpsNotification("تم تحديد موقعك بدقة عبر الـ GPS 🎯 (شارع طارق غسان)");
    setTimeout(() => setGpsNotification(null), 3000);
  };

  const handleAddStoreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStoreName.trim()) return;
    setGpsNotification(
      `تمت إضافة ${newStoreName} إلى خط سير ${selectedDay} بنجاح ✅`,
    );
    setNewStoreName("");
    setNewStoreAddress("");
    setAddStoreModalOpen(false);
    setTimeout(() => setGpsNotification(null), 3500);
  };

  const currentDayStores = SAMPLE_STORES.filter((s) => s.day === selectedDay);

  return (
    <div className={`flex flex-col items-center justify-center  ${className}`}>
      {/* Device Frame with Sleek Android Silhouette */}
      <div className="relative w-full max-w-[min(340px,90vw)] sm:max-w-[360px] h-[670px]  rounded-[48px] p-3.5 shadow-2xl shadow-primary/30 border-4 border-foreground/70 ring-1 ring-foreground/40 select-none overflow-hidden">
        {/* Dynamic Island / Punch hole camera */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4.5  rounded-full z-40 flex items-center justify-center ring-1 ring-background/10">
          <div className="w-2.5 h-2.5 rounded-full  border  mr-4" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
        </div>

        {/* Screen Container */}
        <div className="relative w-full h-full  rounded-[38px] overflow-hidden flex flex-col ">
          {/* Top Android Status Bar */}
          <div
            className={`w-full h-7 pt-1 px-5 flex items-center justify-between text-[11px] font-bold z-30 shrink-0 select-none transition-colors ${
              screenState === "launcher"
                ? "/80 bg-transparent"
                : "text-foreground/80 bg-background/90 backdrop-blur-md"
            }`}
          >
            <span>6:08</span>
            <div className="flex items-center gap-1.5 text-xs">
              <Wifi className="w-3 h-3" />
              <span className="text-[10px] font-bold">67%</span>
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* ========================================================
              SCREEN 1: PHONE HOME SCREEN (LAUNCHER)
              ======================================================== */}
          {screenState === "launcher" && (
            <div className="relative flex-1 w-full h-full  p-4 flex flex-col justify-between  animate-in fade-in duration-300">
              {/* Wallpaper Ambient Glow */}
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-info/20 rounded-full blur-3xl pointer-events-none" />

              <div className="pt-6 text-center space-y-1 z-10">
                <div className="text-4xl  tracking-tight font-sans">06:08</div>
                <div className="text-xs  font-bold">
                  السبت، 28 آب • 29° مشمس
                </div>

                {/* Google / Quick Search Pill */}
                <div className="mt-4 mx-auto max-w-[260px]  backdrop-blur-md border  rounded-full px-3 py-1.5 flex items-center justify-between text-[11px] ">
                  <div className="flex items-center gap-2">
                    <IconRenderer
                      name="search_outlined"
                      className="w-3.5 h-3.5 /50"
                    />
                    <span>بحث في الهاتف...</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-primary" />
                </div>
              </div>

              {/* Main Apps Grid on Home Screen */}
              <div className="space-y-6 z-10">
                {/* App Row 1: Common Apps */}
                <div className="grid grid-cols-4 gap-3 text-center">
                  {/* Phone */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/30">
                      <IconRenderer name="mobile_filled" className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold ">الهاتف</span>
                  </div>

                  {/* Messages */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-12 h-12 rounded-2xl bg-info text-info-foreground flex items-center justify-center shadow-lg shadow-info/30">
                      <IconRenderer
                        name="chat_conversation_outlined"
                        className="w-6 h-6"
                      />
                    </div>
                    <span className="text-[10px] font-bold ">الرسائل</span>
                  </div>

                  {/* Camera */}
                  <div className="relative animate-bounce w-13 h-13 rounded-2xl cursor-pointer bg-accent  border-primary-foreground/80 flex items-center justify-center shadow-xl shadow-primary/60 group-hover:scale-105 transition-transform shrink-0">
                    <Image
                      src="/tredro/logo.svg"
                      alt="logo"
                      width={30}
                      height={30}
                      onClick={handleLaunchApp}
                      className="transition-transform duration-200 hover:scale-105 "
                    />
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive border-2 border-foreground flex items-center justify-center text-[9px] font-black text-primary-foreground">
                      4
                    </span>
                  </div>

                  {/* Settings */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-12 h-12 rounded-2xl bg-accent text-accent-foreground flex items-center justify-center shadow-lg">
                      <IconRenderer
                        name="settings_outlined"
                        className="w-6 h-6"
                      />
                    </div>
                    <span className="text-[10px] font-bold ">الإعدادات</span>
                  </div>
                </div>
              </div>

              {/* Bottom Dock Apps */}
              <div className=" backdrop-blur-xl border  rounded-3xl p-2.5 flex items-center justify-around z-10">
                {/* Store Icon */}
                <button
                  onClick={handleLaunchApp}
                  className="flex flex-col items-center gap-1 hover:scale-110 transition-transform"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-md shadow-primary/30">
                    <Image
                      src="/tredro/logo.svg"
                      alt="logo"
                      width={20}
                      height={20}
                    />
                  </div>
                </button>

                {/* Map */}
                <button
                  onClick={handleLaunchApp}
                  className="flex flex-col items-center gap-1 hover:scale-110 transition-transform"
                >
                  <div className="w-10 h-10 rounded-xl bg-info text-info-foreground flex items-center justify-center shadow-md">
                    <IconRenderer name="map_outlined" className="w-5 h-5" />
                  </div>
                </button>

                {/* Invoices */}
                <button
                  onClick={handleLaunchApp}
                  className="flex flex-col items-center gap-1 hover:scale-110 transition-transform"
                >
                  <div className="w-10 h-10 rounded-xl bg-warning text-warning-foreground flex items-center justify-center shadow-md">
                    <IconRenderer
                      name="checkout_outlined"
                      className="w-5 h-5"
                    />
                  </div>
                </button>

                {/* POS */}
                <button
                  onClick={handleLaunchApp}
                  className="flex flex-col items-center gap-1 hover:scale-110 transition-transform"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent text-accent-foreground flex items-center justify-center shadow-md">
                    <IconRenderer name="cart_filled" className="w-5 h-5" />
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* ========================================================
              SCREEN 2: APP SPLASH SCREEN ANIMATION
              ======================================================== */}
          {screenState === "splash" && (
            <div className="flex-1 w-[400px] h-full  flex flex-col items-center justify-center text-primary-foreground p-6 animate-in zoom-in-95 duration-200">
              <div className="w-20 h-20 rounded-3xl  backdrop-blur-md border border-primary-foreground/20 flex items-center justify-center shadow-2xl mb-4 animate-pulse">
                <Image
                  src="/tredro/logo.svg"
                  alt="logo"
                  width={46}
                  height={46}
                />
              </div>
            </div>
          )}

          {/* ========================================================
              SCREEN 3: FULL INTERACTIVE GPS MAP VIEW
              ======================================================== */}
          {screenState === "map" && (
            <div className="flex-1 w-full h-full flex flex-col bg-muted overflow-hidden animate-in fade-in duration-300">
              {/* Top Navigation & Day Filter Bar */}
              <div className="w-full bg-card px-2 py-1.5 border-b border-border z-20 shrink-0 shadow-xs">
                {/* Header with Back to Launcher Button */}
                <div className="flex items-center justify-between pb-1.5 mb-1 border-b border-border px-1 text-xs">
                  <button
                    onClick={handleGoHome}
                    className="flex items-center gap-1 text-muted-foreground hover:text-primary font-bold px-2 py-0.5 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                    title="الرجوع إلى شاشة الهاتف"
                  >
                    <IconRenderer
                      name="home_outlined"
                      className="w-3.5 h-3.5"
                    />
                    <span className="text-[10px]">الهاتف</span>
                  </button>

                  <div className="flex items-center gap-1.5 font-black text-foreground text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span>خط سير {selectedDay} (مباشر)</span>
                  </div>

                  <button
                    onClick={handleGpsLocate}
                    className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-lg border border-primary/20"
                  >
                    GPS نشط
                  </button>
                </div>

                {/* Day Filter Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 justify-end">
                  {daysList.map((day) => {
                    const isSelected = selectedDay === day.name;
                    return (
                      <button
                        key={day.name}
                        onClick={() => {
                          setSelectedDay(day.name);
                          setSelectedStore(null);
                        }}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? "bg-primary text-primary-foreground shadow-md shadow-primary/30 font-black"
                            : "bg-transparent text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        <span>{day.name}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? "bg-primary-foreground/25 text-primary-foreground" : "text-muted-foreground"}`}
                        >
                          {day.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Toast / Notification Popover */}
              {gpsNotification && (
                <div className="absolute top-20 left-3 right-3 z-40 /95 text-[11px] font-bold px-3 py-2 rounded-xl shadow-xl border border-border flex items-center justify-between animate-in slide-in-from-top-2">
                  <span>{gpsNotification}</span>
                  <button
                    onClick={() => setGpsNotification(null)}
                    className=" hover:"
                  >
                    <IconRenderer
                      name="close_outlined"
                      className="w-3.5 h-3.5"
                    />
                  </button>
                </div>
              )}

              {/* Main Interactive Map Canvas */}
              <div className="flex-1 relative bg-muted overflow-hidden select-none">
                {/* SVG Vector Map Streets & Roads */}
                <svg
                  className="w-full h-full absolute inset-0 opacity-85"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id="rep-street-grid"
                      width="60"
                      height="60"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 60 0 L 0 0 0 60"
                        fill="none"
                        stroke="var(--border)"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>
                  <rect
                    width="100%"
                    height="100%"
                    fill="url(#rep-street-grid)"
                  />

                  {/* Major Highway / Ring Road */}
                  <path
                    d="M -20 180 Q 150 120, 380 200"
                    fill="none"
                    stroke="var(--muted-foreground)"
                    strokeWidth="10"
                    opacity="0.35"
                  />
                  <path
                    d="M -20 180 Q 150 120, 380 200"
                    fill="none"
                    stroke="var(--background)"
                    strokeWidth="6"
                  />

                  {/* Secondary Main Avenue */}
                  <path
                    d="M 280 -20 L 140 400"
                    fill="none"
                    stroke="var(--muted-foreground)"
                    strokeWidth="8"
                    opacity="0.35"
                  />
                  <path
                    d="M 280 -20 L 140 400"
                    fill="none"
                    stroke="var(--background)"
                    strokeWidth="5"
                  />

                  {/* Connecting Arterials */}
                  <path
                    d="M 60 80 L 320 140"
                    fill="none"
                    stroke="var(--background)"
                    strokeWidth="4"
                  />
                  <path
                    d="M 40 280 L 340 320"
                    fill="none"
                    stroke="var(--background)"
                    strokeWidth="4"
                  />
                  <path
                    d="M 120 40 L 160 360"
                    fill="none"
                    stroke="var(--background)"
                    strokeWidth="4"
                  />
                </svg>

                {/* Arabic Street Name Labels */}
                <div className="absolute top-12 right-6 text-[9px] font-bold text-muted-foreground/90 rotate-[-25deg] pointer-events-none">
                  شارع طارق غسان
                </div>
                <div className="absolute top-44 right-14 text-[9px] font-bold text-muted-foreground/90 rotate-[70deg] pointer-events-none">
                  المحلق الشرقي
                </div>
                <div className="absolute bottom-28 left-8 text-[9px] font-bold text-muted-foreground/90 rotate-[-8deg] pointer-events-none">
                  طريق المدينة المنورة
                </div>

                {/* Rep Current Position Marker */}
                <div
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{ left: "46%", top: "48%" }}
                  onClick={handleGpsLocate}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/20 animate-ping absolute -inset-1" />
                  <div className="relative w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg border-2 border-background shadow-primary/50">
                    <IconRenderer name="user_filled" className="w-4 h-4" />
                  </div>
                </div>

                {/* Store Markers on Route */}
                {currentDayStores.map((store) => {
                  const isSelected = selectedStore?.id === store.id;
                  const isDone = store.status === "completed";
                  return (
                    <div
                      key={store.id}
                      onClick={() => setSelectedStore(store)}
                      className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-125"
                      style={{ left: `${store.x}%`, top: `${store.y}%` }}
                    >
                      <div
                        className={`relative px-2 py-1 rounded-full text-[10px] font-extrabold flex items-center gap-1 shadow-md border ${
                          isSelected
                            ? "bg-primary text-primary-foreground border-background scale-110 shadow-primary/40 ring-2 ring-primary/50"
                            : isDone
                              ? " border-background"
                              : "bg-card text-foreground border-border"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${isDone ? "bg-background" : "bg-primary animate-pulse"}`}
                        />
                        <span className="truncate max-w-[80px]">
                          {store.name}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Floating Action Controls on Map */}
                <div className="absolute bottom-4 left-3 right-3 flex items-center justify-between z-30 pointer-events-auto">
                  {/* 1. Left Floating GPS Target Button */}
                  <button
                    onClick={handleGpsLocate}
                    className="w-11 h-11 rounded-full bg-card text-primary border border-border shadow-lg flex items-center justify-center hover:bg-muted active:scale-95 transition-all cursor-pointer"
                    title="تحديد موقعي GPS"
                  >
                    <IconRenderer
                      name="location_outlined"
                      className="w-5 h-5"
                    />
                  </button>

                  {/* 2. Center Floating Pill: محلات اليوم */}
                  <button
                    onClick={() => setStoresListOpen(true)}
                    className="px-5 py-2.5 bg-card text-foreground rounded-full border border-border shadow-lg font-bold text-xs flex items-center gap-2 hover:bg-muted active:scale-95 transition-all cursor-pointer"
                  >
                    <IconRenderer
                      name="list_outlined"
                      className="w-4 h-4 text-muted-foreground"
                    />
                    <span>
                      محلات {selectedDay} ({currentDayStores.length})
                    </span>
                  </button>

                  {/* 3. Right Floating Action Button (+ Blue Circle) */}
                  <button
                    onClick={() => setAddStoreModalOpen(true)}
                    className="w-11 h-11 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/40 flex items-center justify-center hover:bg-primary/90 active:scale-95 transition-all cursor-pointer"
                    title="إضافة متجر جديد في المسار"
                  >
                    <IconRenderer name="plus_filled" className="w-6 h-6" />
                  </button>
                </div>

                {/* Store Quick Details Card / Bottom Sheet Popup */}
                {selectedStore && (
                  <div className="absolute bottom-16 left-3 right-3 bg-card rounded-2xl p-3.5 shadow-2xl border border-border z-40 text-right animate-in slide-in-from-bottom-4">
                    <div className="flex items-start justify-between">
                      <button
                        onClick={() => setSelectedStore(null)}
                        className="text-muted-foreground hover:text-foreground p-1"
                      >
                        <IconRenderer
                          name="close_outlined"
                          className="w-4 h-4"
                        />
                      </button>
                      <div>
                        <div className="flex items-center gap-2 justify-end">
                          <Badge
                            variant="outline"
                            className={`h-auto text-[10px] font-bold px-2 py-0.5 ${
                              selectedStore.status === "completed"
                                ? "bg-primary/10 text-primary border-primary/20"
                                : "bg-warning/10 text-warning border-warning/20"
                            }`}
                          >
                            {selectedStore.status === "completed"
                              ? "تمت الزيارة"
                              : "قيد الانتظار"}
                          </Badge>
                          <h4 className="font-extrabold text-sm text-foreground">
                            {selectedStore.name}
                          </h4>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          {selectedStore.address}
                        </p>
                      </div>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-border grid grid-cols-2 gap-2 text-[11px]">
                      <div className="bg-muted p-2 rounded-xl">
                        <span className="text-muted-foreground block text-[9px]">
                          الرصيد / الذمم
                        </span>
                        <span className="font-extrabold text-foreground">
                          {selectedStore.balance.toLocaleString()} ل.س
                        </span>
                      </div>
                      <div className="bg-muted p-2 rounded-xl">
                        <span className="text-muted-foreground block text-[9px]">
                          المسؤول
                        </span>
                        <span className="font-bold text-foreground">
                          {selectedStore.owner}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => {
                          setGpsNotification(
                            `تم تسجيل طلبية جديدة لـ ${selectedStore.name} 🛒`,
                          );
                          setSelectedStore(null);
                          setTimeout(() => setGpsNotification(null), 3000);
                        }}
                        className="flex-1 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-primary/20"
                      >
                        <IconRenderer
                          name="cart_filled"
                          className="w-3.5 h-3.5"
                        />
                        <span>إنشاء فاتورة / طلب</span>
                      </button>
                      <button
                        onClick={() => {
                          setGpsNotification(
                            `تم تسجيل تحصيل دفعة نقدية لـ ${selectedStore.name} 💰`,
                          );
                          setSelectedStore(null);
                          setTimeout(() => setGpsNotification(null), 3000);
                        }}
                        className="py-2 px-3 bg-muted hover:bg-muted/70 text-foreground font-bold rounded-xl text-xs"
                      >
                        تحصيل
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Stores Drawer List */}
              {storesListOpen && (
                <div className="absolute inset-0 bg-black/40 z-50 flex flex-col justify-end animate-in fade-in">
                  <div className="bg-card rounded-t-3xl p-4 max-h-[75%] overflow-y-auto text-right animate-in slide-in-from-bottom-5">
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
                      <button
                        onClick={() => setStoresListOpen(false)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <IconRenderer
                          name="close_outlined"
                          className="w-5 h-5"
                        />
                      </button>
                      <h3 className="font-extrabold text-sm text-foreground">
                        جدول محلات {selectedDay} ({currentDayStores.length})
                      </h3>
                    </div>

                    <div className="space-y-2">
                      {currentDayStores.map((s, idx) => (
                        <div
                          key={s.id}
                          onClick={() => {
                            setSelectedStore(s);
                            setStoresListOpen(false);
                          }}
                          className="p-3 bg-muted hover:bg-primary/10 rounded-xl border border-border flex items-center justify-between cursor-pointer transition-colors"
                        >
                          <span className="text-xs text-primary font-bold">
                            عرض على الخريطة
                          </span>
                          <div className="text-right">
                            <div className="flex items-center gap-1.5 justify-end">
                              <span className="font-bold text-xs text-foreground">
                                {s.name}
                              </span>
                              <span className="w-4 h-4 rounded-full bg-primary/15 text-primary text-[10px] font-black flex items-center justify-center">
                                {idx + 1}
                              </span>
                            </div>
                            <span className="text-[10px] text-muted-foreground">
                              {s.address}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Add Store Modal */}
              {addStoreModalOpen && (
                <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                  <form
                    onSubmit={handleAddStoreSubmit}
                    className="bg-card rounded-3xl p-4 w-full text-right animate-in zoom-in-95"
                  >
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
                      <button
                        type="button"
                        onClick={() => setAddStoreModalOpen(false)}
                        className="text-muted-foreground"
                      >
                        <IconRenderer
                          name="close_outlined"
                          className="w-4 h-4"
                        />
                      </button>
                      <h3 className="font-bold text-xs text-foreground">
                        إضافة عميل / سوبرماركت جديد
                      </h3>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div>
                        <label className="block text-[11px] font-bold text-foreground mb-1">
                          اسم المحل
                        </label>
                        <input
                          type="text"
                          placeholder="مثال: أسواق العاصمة"
                          value={newStoreName}
                          onChange={(e) => setNewStoreName(e.target.value)}
                          className="w-full px-3 py-2 bg-muted border border-border rounded-xl text-xs text-right outline-none focus:border-primary"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-foreground mb-1">
                          العنوان / الشارع
                        </label>
                        <input
                          type="text"
                          placeholder="مثال: شارع طارق غسان"
                          value={newStoreAddress}
                          onChange={(e) => setNewStoreAddress(e.target.value)}
                          className="w-full px-3 py-2 bg-muted border border-border rounded-xl text-xs text-right outline-none focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <button
                        type="submit"
                        className="flex-1 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl text-xs"
                      >
                        حفظ في خط سير {selectedDay}
                      </button>
                      <button
                        type="button"
                        onClick={() => setAddStoreModalOpen(false)}
                        className="py-2 px-3 bg-muted text-foreground font-bold rounded-xl text-xs"
                      >
                        إلغاء
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Bottom 5-Icon Navigation Bar */}
              <div className="w-full bg-card border-t border-border py-1.5 px-3 flex items-center justify-around z-30 shrink-0 select-none">
                {/* 1. History */}
                <button
                  onClick={() => setActiveBottomTab("history")}
                  className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition-colors cursor-pointer ${
                    activeBottomTab === "history"
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <IconRenderer name="history_outlined" className="w-5 h-5" />
                </button>

                {/* 2. POS / Invoices */}
                <button
                  onClick={() => setActiveBottomTab("pos")}
                  className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition-colors cursor-pointer ${
                    activeBottomTab === "pos"
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <IconRenderer name="checkout_outlined" className="w-5 h-5" />
                </button>

                {/* 3. Home Icon (Returns to Launcher Screen) */}
                <button
                  onClick={handleGoHome}
                  className="flex flex-col items-center justify-center p-1.5 rounded-xl transition-colors cursor-pointer text-muted-foreground hover:text-primary"
                  title="الخروج إلى شاشة التطبيقات"
                >
                  <IconRenderer name="home_outlined" className="w-5 h-5" />
                </button>

                {/* 4. Stores Directory */}
                <button
                  onClick={() => setActiveBottomTab("stores")}
                  className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition-colors cursor-pointer ${
                    activeBottomTab === "stores"
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <IconRenderer name="partners_outlined" className="w-5 h-5" />
                </button>

                {/* 5. Route / Map Icon (Active Blue Pill) */}
                <button
                  onClick={() => setActiveBottomTab("map")}
                  className={`px-4 py-1.5 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
                    activeBottomTab === "map"
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <IconRenderer name="map_outlined" className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Android Bottom Home Bar */}
          <div
            onClick={handleGoHome}
            className="w-full h-4 bg-card hover:bg-muted flex items-center justify-center shrink-0 cursor-pointer transition-colors"
            title="الرجوع للشاشة الرئيسية"
          >
            <div className="w-24 h-1 bg-border rounded-full" />
          </div>
        </div>
      </div>

      {/* Direct Interactive Hint */}
      <div className="mt-3 text-center text-xs font-bold text-primary flex items-center gap-1.5">
        {screenState === "launcher" ? (
          <span>
            انقر على أيقونة Tredro Rep داخل الهاتف لفتح الخريطة الميدانية
          </span>
        ) : (
          <button
            onClick={handleGoHome}
            className="underline hover:text-foreground flex items-center gap-1"
          >
            <IconRenderer name="undo_outlined" className="w-3 h-3" />
            <span>الرجوع إلى شاشة الهاتف الرئيسية</span>
          </button>
        )}
      </div>
    </div>
  );
};

export const RepPhoneInspectSection: React.FC = () => {
  return (
    <section
      id="rep-mobile-inspect"
      className="py-16 sm:py-24 relative overflow-hidden border border-x"
    >
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-info/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Clear Explanation of the Rep Mobile Application */}
          <div className="lg:col-span-7 space-y-6 text-right order-2 lg:order-1">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              تطبيق هاتف المندوب <br />
              <span className="bg-gradient-to-r from-primary via-primary/70 to-info bg-clip-text text-transparent">
                لإدارة الجولات والزيارات الميدانية
              </span>
            </h2>

            <p className=" text-base sm:text-lg leading-relaxed font-normal">
              تطبيق مخصص لمندوبي مبيعات الجملة على هواتف أندرويد. يبدأ المندوب
              يومه بفتح التطبيق للاطلاع على خط السير المخصص لليوم، تحديد مواقع
              السوبرماركت على خريطة GPS، تحصيل الذمم المالية، وإصدار الفواتير
              الفورية.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs sm:text-sm">
              <Card className="p-4 rounded-2xl   flex-row items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-primary/20 text-primary flex items-center justify-center shrink-0">
                  <IconRenderer name="calendar_outlined" className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold mb-1">
                    توزيع الجولات حسب الأيام
                  </h4>
                  <p className=" text-xs">
                    تبويب أيام الأسبوع (السبت، الأحد، ...) مع عدد المحلات
                    المجدولة لكل جولة.
                  </p>
                </div>
              </Card>

              <Card className="p-4 rounded-2xl   flex-row items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-info/20 text-info flex items-center justify-center shrink-0">
                  <IconRenderer name="location_filled" className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold mb-1">دقة تحديد المواقع GPS</h4>
                  <p className=" text-xs">
                    زر معايرة وتثبيت فوري لموقع المندوب لمنع التلاعب وضمان
                    الزيارات الفعلية.
                  </p>
                </div>
              </Card>

              <Card className="p-4 rounded-2xl   flex-row items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-warning/20 text-warning flex items-center justify-center shrink-0">
                  <IconRenderer name="checkout_filled" className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold mb-1">فواتير وتحصيل لحظي</h4>
                  <p className=" text-xs">
                    عرض الرصيد والذمم، تسجيل الدفعات النقدية، وإصدار الفواتير
                    الفورية.
                  </p>
                </div>
              </Card>

              <Card className="p-4 rounded-2xl   flex-row items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-accent/60 text-accent-foreground flex items-center justify-center shrink-0">
                  <IconRenderer
                    name="plus_circle_outlined"
                    className="w-4 h-4"
                  />
                </div>
                <div>
                  <h4 className="font-extrabold mb-1">إضافة محلات ميدانياً</h4>
                  <p className=" text-xs">
                    زر الإضافة السريع (+) لضم عملاء وسوبرماركت جدد أثناء الجولة
                    مباشرة.
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* Right Column: Phone Simulator starting from Launcher */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <RepPhoneInspect />
          </div>
        </div>
      </div>
    </section>
  );
};
