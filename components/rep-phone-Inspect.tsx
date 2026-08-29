import React, { useEffect, useState } from "react";
import { Wifi, Battery } from "lucide-react";

import { IconRenderer } from "@/assets/icons/iconRenderer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

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

  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const statusBarTime = now.toLocaleTimeString("ar", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const launcherDayName = now.toLocaleDateString("ar-SY", { weekday: "long" });
  const launcherDayNum = now.getDate();
  const launcherMonthName = now.toLocaleDateString("ar-SY", { month: "long" });

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
      <div className="relative w-full max-w-[min(340px,90vw)] sm:max-w-[360px] h-[670px]  rounded-[48px] p-3.5 shadow-2xl shadow-primary/30 border-2 border-foreground/10 ring-1 ring-foreground/40 select-none overflow-hidden">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4.5  rounded-full z-40 flex items-center justify-center ring-1 ring-background/10">
          <div className="w-2.5 h-2.5 rounded-full  border  mr-4" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
        </div>

        <div className="relative w-full h-full  rounded-[38px] overflow-hidden flex flex-col ">
          <div
            className={`w-full h-7 pt-1 px-5 flex items-center justify-between text-[11px] font-bold z-30 shrink-0 select-none transition-colors ${
              screenState === "launcher"
                ? "text-foreground/80 bg-transparent"
                : "text-background bg-foreground/60 backdrop-blur-sm"
            }`}
          >
            <span>{statusBarTime}</span>
            <div className="flex items-center gap-1.5 text-xs">
              <Wifi className="w-3 h-3" />
              <span className="text-[10px] font-bold">67%</span>
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>

          {screenState === "launcher" && (
            <div className="relative flex-1 w-full h-full  p-4 flex flex-col justify-between  animate-in fade-in duration-300">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-info/20 rounded-full blur-3xl pointer-events-none" />

              <div className="pt-6 text-center space-y-1 z-10">
                <div className="text-4xl  tracking-tight font-sans">
                  {statusBarTime}
                </div>
                <div className="text-xs  font-bold">
                  {launcherDayName}، {launcherDayNum} {launcherMonthName} • 29°
                  مشمس
                </div>

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

              <div className="space-y-6 z-10">
                <div className="grid grid-cols-4 gap-3 text-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/30">
                      <IconRenderer name="mobile_filled" className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold ">الهاتف</span>
                  </div>

                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-12 h-12 rounded-2xl bg-info text-info-foreground flex items-center justify-center shadow-lg shadow-info/30">
                      <IconRenderer
                        name="chat_conversation_outlined"
                        className="w-6 h-6"
                      />
                    </div>
                    <span className="text-[10px] font-bold ">الرسائل</span>
                  </div>

                  <Button
                    variant="ghost"
                    onClick={handleLaunchApp}
                    className="flex flex-col items-center gap-1.5 h-auto p-0 hover:bg-transparent"
                  >
                    <div className="relative w-12 h-12 rounded-2xl bg-background flex items-center justify-center shadow-lg shrink-0">
                      <Image
                        src="/tredro/logo.svg"
                        alt="logo"
                        width={26}
                        height={26}
                      />
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive border-2 border-foreground flex items-center justify-center text-[9px] font-black text-primary-foreground">
                        4
                      </span>
                    </div>
                    <span className="text-[10px] font-bold ">
                      Tredro Mandoub
                    </span>
                  </Button>

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

              <div className=" backdrop-blur-xl border  rounded-3xl p-2.5 flex items-center justify-around z-10">
                <Button
                  variant="ghost"
                  onClick={handleLaunchApp}
                  className="flex flex-col items-center gap-1 h-auto p-0 hover:bg-transparent hover:scale-110 transition-transform"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-md shadow-primary/30">
                    <Image
                      src="/tredro/logo.svg"
                      alt="logo"
                      width={20}
                      height={20}
                    />
                  </div>
                </Button>

                <Button
                  variant="ghost"
                  onClick={handleLaunchApp}
                  className="flex flex-col items-center gap-1 h-auto p-0 hover:bg-transparent hover:scale-110 transition-transform"
                >
                  <div className="w-10 h-10 rounded-xl bg-info text-info-foreground flex items-center justify-center shadow-md">
                    <IconRenderer name="map_outlined" className="w-5 h-5" />
                  </div>
                </Button>

                <Button
                  variant="ghost"
                  onClick={handleLaunchApp}
                  className="flex flex-col items-center gap-1 h-auto p-0 hover:bg-transparent hover:scale-110 transition-transform"
                >
                  <div className="w-10 h-10 rounded-xl bg-warning text-warning-foreground flex items-center justify-center shadow-md">
                    <IconRenderer
                      name="checkout_outlined"
                      className="w-5 h-5"
                    />
                  </div>
                </Button>

                <Button
                  variant="ghost"
                  onClick={handleLaunchApp}
                  className="flex flex-col items-center gap-1 h-auto p-0 hover:bg-transparent hover:scale-110 transition-transform"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent text-accent-foreground flex items-center justify-center shadow-md">
                    <IconRenderer name="cart_filled" className="w-5 h-5" />
                  </div>
                </Button>
              </div>
            </div>
          )}

          {screenState === "splash" && (
            <div className="flex-1  w-125  flex justify-center items-center animate-in fade-in duration-200">
              <div className="w-20 h-20 rounded-3xl bg-background flex items-center justify-center">
                <Image
                  src="/tredro/logo.svg"
                  alt="logo"
                  width={46}
                  height={46}
                />
              </div>
            </div>
          )}

          {screenState === "map" && (
            <div className="flex-1 w-full h-full flex flex-col bg-muted overflow-hidden animate-in fade-in duration-300">
              <div className="w-full bg-card px-2 py-1.5 border-b border-border z-20 shrink-0 shadow-xs">
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 justify-end">
                  {daysList.map((day) => {
                    const isSelected = selectedDay === day.name;
                    return (
                      <Button
                        key={day.name}
                        variant={isSelected ? "default" : "ghost"}
                        size="sm"
                        onClick={() => {
                          setSelectedDay(day.name);
                          setSelectedStore(null);
                        }}
                        className={`rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1.5 h-auto py-1 px-3 ${
                          isSelected
                            ? "shadow-md shadow-primary/30 font-black"
                            : "text-muted-foreground"
                        }`}
                      >
                        <span>{day.name}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? "bg-primary-foreground/25 text-primary-foreground" : "text-muted-foreground"}`}
                        >
                          {day.count}
                        </span>
                      </Button>
                    );
                  })}
                </div>
              </div>

              {gpsNotification && (
                <div className="absolute top-14 left-3 right-3 z-40 bg-popover text-popover-foreground text-[11px] font-bold px-3 py-2 rounded-xl shadow-xl border border-border flex items-center justify-between animate-in slide-in-from-top-2">
                  <span>{gpsNotification}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setGpsNotification(null)}
                    className="h-auto w-auto p-1 text-muted-foreground hover:text-foreground"
                  >
                    <IconRenderer
                      name="close_outlined"
                      className="w-3.5 h-3.5"
                    />
                  </Button>
                </div>
              )}

              <div className="flex-1 relative bg-muted overflow-hidden select-none">
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 340 565"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id="aleppo-street-grid"
                      width="34"
                      height="34"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 34 0 L 0 0 0 34"
                        fill="none"
                        stroke="var(--border)"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>
                  <rect
                    width="100%"
                    height="100%"
                    fill="url(#aleppo-street-grid)"
                  />

                  <ellipse
                    cx="170"
                    cy="365"
                    rx="95"
                    ry="70"
                    fill="var(--muted-foreground)"
                    opacity="0.12"
                  />
                  <ellipse
                    cx="270"
                    cy="300"
                    rx="45"
                    ry="30"
                    fill="var(--muted-foreground)"
                    opacity="0.1"
                  />
                  <ellipse
                    cx="110"
                    cy="300"
                    rx="40"
                    ry="26"
                    fill="var(--muted-foreground)"
                    opacity="0.1"
                  />
                  <ellipse
                    cx="150"
                    cy="150"
                    rx="55"
                    ry="35"
                    fill="var(--muted-foreground)"
                    opacity="0.08"
                  />
                  <ellipse
                    cx="60"
                    cy="470"
                    rx="50"
                    ry="30"
                    fill="var(--muted-foreground)"
                    opacity="0.08"
                  />

                  <path
                    d="M 20 60 Q 150 100, 300 70"
                    fill="none"
                    stroke="var(--border)"
                    strokeWidth="2"
                  />
                  <path
                    d="M 40 140 L 300 160"
                    fill="none"
                    stroke="var(--border)"
                    strokeWidth="2"
                  />
                  <path
                    d="M 30 230 Q 170 260, 310 220"
                    fill="none"
                    stroke="var(--border)"
                    strokeWidth="2"
                  />
                  <path
                    d="M 170 40 L 170 540"
                    fill="none"
                    stroke="var(--border)"
                    strokeWidth="2"
                  />
                  <path
                    d="M 20 340 L 320 380"
                    fill="none"
                    stroke="var(--border)"
                    strokeWidth="2"
                  />
                  <path
                    d="M 60 420 Q 170 460, 290 430"
                    fill="none"
                    stroke="var(--border)"
                    strokeWidth="2"
                  />
                  <path
                    d="M 90 40 L 60 540"
                    fill="none"
                    stroke="var(--border)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 260 60 L 290 520"
                    fill="none"
                    stroke="var(--border)"
                    strokeWidth="1.5"
                  />
                </svg>

                <div
                  className="absolute text-[8px] font-semibold text-muted-foreground"
                  style={{ left: "62%", top: "2%" }}
                >
                  Al-Musallamiye
                </div>
                <div
                  className="absolute text-[8px] font-semibold text-muted-foreground"
                  style={{ left: "38%", top: "11%" }}
                >
                  HANDARAT
                </div>
                <div
                  className="absolute text-[8px] font-semibold text-muted-foreground"
                  style={{ left: "2%", top: "18%" }}
                >
                  Ratbah
                </div>
                <div
                  className="absolute text-[8px] font-semibold text-muted-foreground text-center"
                  style={{ left: "55%", top: "19%" }}
                >
                  MUKHAYAM
                  <br />
                  HANDARAT
                </div>
                <div
                  className="absolute text-[8px] font-semibold text-muted-foreground text-center"
                  style={{ left: "40%", top: "27%" }}
                >
                  WADI
                  <br />
                  BUSTAN
                </div>
                <div
                  className="absolute text-[8px] font-semibold text-muted-foreground"
                  style={{ left: "0%", top: "33%" }}
                >
                  AL AL
                  <br />
                  GLIZ
                </div>
                <div
                  className="absolute text-[8px] font-semibold text-muted-foreground"
                  style={{ left: "0%", top: "43%" }}
                >
                  mra
                </div>
                <div
                  className="absolute text-[8px] font-semibold text-muted-foreground"
                  style={{ left: "0%", top: "52%" }}
                >
                  nun
                </div>
                <div
                  className="absolute text-[8px] font-semibold text-muted-foreground"
                  style={{ left: "25%", top: "54%" }}
                >
                  ASHRAFIEH
                </div>
                <div
                  className="absolute text-[8px] font-semibold text-muted-foreground"
                  style={{ left: "78%", top: "54%" }}
                >
                  HANANO
                </div>
                <div
                  className="absolute text-[13px] font-bold text-foreground"
                  style={{ left: "42%", top: "65%" }}
                >
                  ALEPPO
                </div>
                <div
                  className="absolute text-[8px] font-semibold text-muted-foreground"
                  style={{ left: "50%", top: "72%" }}
                >
                  حي المرجة
                </div>
                <div
                  className="absolute text-[8px] font-semibold text-muted-foreground text-center"
                  style={{ left: "0%", top: "80%" }}
                >
                  RAMADANIYAH
                  <br />
                  DISTRICT
                </div>
                <div
                  className="absolute text-[8px] font-semibold text-muted-foreground text-center"
                  style={{ left: "42%", top: "87%" }}
                >
                  SHEIKH
                  <br />
                  SAEED
                  <br />
                  DISTRICT
                </div>
                <div
                  className="absolute text-[8px] font-semibold text-muted-foreground"
                  style={{ left: "70%", top: "89%" }}
                >
                  Azizi
                </div>
                <div
                  className="absolute text-[8px] font-semibold text-muted-foreground"
                  style={{ left: "8%", top: "96%" }}
                >
                  al-Sharfah
                </div>
                <div
                  className="absolute text-[8px] font-semibold text-muted-foreground"
                  style={{ left: "80%", top: "96%" }}
                >
                  Adh-Dhahabiye
                </div>

                <div
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ left: "46%", top: "48%" }}
                  onClick={handleGpsLocate}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/20 animate-ping absolute -inset-1" />
                  <div className="relative w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg border-2 border-background shadow-primary/50">
                    <IconRenderer name="user_filled" className="w-4 h-4" />
                  </div>
                </div>

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
                              ? "bg-card border-background"
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

                <div className="absolute bottom-4 left-3 right-3 flex items-center justify-between z-30 pointer-events-auto">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleGpsLocate}
                    className="w-11 h-11 rounded-full bg-card text-primary shadow-sm"
                    title="تحديد موقعي GPS"
                  >
                    <IconRenderer
                      name="location_outlined"
                      className="w-5 h-5"
                    />
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => setStoresListOpen(true)}
                    className="px-5 py-2.5 h-auto bg-card text-foreground rounded-full shadow-lg font-bold text-xs flex items-center gap-2"
                  >
                    <IconRenderer
                      name="list_outlined"
                      className="w-4 h-4 text-muted-foreground"
                    />
                    <span>
                      محلات {selectedDay} ({currentDayStores.length})
                    </span>
                  </Button>

                  <Button
                    size="icon"
                    onClick={() => setAddStoreModalOpen(true)}
                    className="w-11 h-11 rounded-full shadow-lg shadow-primary/40"
                    title="إضافة متجر جديد في المسار"
                  >
                    <IconRenderer name="plus_filled" className="w-6 h-6" />
                  </Button>
                </div>

                {selectedStore && (
                  <div className="absolute bottom-16 left-3 right-3 bg-card rounded-2xl p-3.5 shadow-2xl border border-border z-40 text-right animate-in slide-in-from-bottom-4">
                    <div className="flex items-start justify-between">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedStore(null)}
                        className="h-auto w-auto p-1 text-muted-foreground hover:text-foreground"
                      >
                        <IconRenderer
                          name="close_outlined"
                          className="w-4 h-4"
                        />
                      </Button>
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
                      <Button
                        onClick={() => {
                          setGpsNotification(
                            `تم تسجيل طلبية جديدة لـ ${selectedStore.name} 🛒`,
                          );
                          setSelectedStore(null);
                          setTimeout(() => setGpsNotification(null), 3000);
                        }}
                        className="flex-1 h-auto py-2 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-primary/20"
                      >
                        <IconRenderer
                          name="cart_filled"
                          className="w-3.5 h-3.5"
                        />
                        <span>إنشاء فاتورة / طلب</span>
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setGpsNotification(
                            `تم تسجيل تحصيل دفعة نقدية لـ ${selectedStore.name} 💰`,
                          );
                          setSelectedStore(null);
                          setTimeout(() => setGpsNotification(null), 3000);
                        }}
                        className="h-auto py-2 px-3 font-bold rounded-xl text-xs"
                      >
                        تحصيل
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="w-full bg-card border-t border-border py-1.5 px-3 flex items-center justify-around z-30 shrink-0 select-none">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setActiveBottomTab("history")}
                  className={`h-auto p-1.5 rounded-xl ${
                    activeBottomTab === "history"
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <IconRenderer name="history_outlined" className="w-5 h-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setActiveBottomTab("pos")}
                  className={`h-auto p-1.5 rounded-xl ${
                    activeBottomTab === "pos"
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <IconRenderer name="checkout_outlined" className="w-5 h-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setActiveBottomTab("home")}
                  className={`h-auto p-1.5 rounded-xl ${
                    activeBottomTab === "home"
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <IconRenderer name="home_outlined" className="w-5 h-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setActiveBottomTab("stores")}
                  className={`h-auto p-1.5 rounded-xl ${
                    activeBottomTab === "stores"
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <IconRenderer
                    name="chat_conversation_outlined"
                    className="w-5 h-5"
                  />
                </Button>

                <Button
                  onClick={() => setActiveBottomTab("map")}
                  className={`h-auto px-4 py-1.5 rounded-2xl ${
                    activeBottomTab === "map"
                      ? "shadow-md shadow-primary/30"
                      : "bg-transparent text-muted-foreground hover:bg-transparent hover:text-foreground shadow-none"
                  }`}
                >
                  <IconRenderer name="map_outlined" className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {storesListOpen && (
            <div className="absolute inset-0 z-50 flex flex-col justify-end">
              <div
                className="absolute inset-0 bg-black/40 animate-in fade-in duration-200"
                onClick={() => setStoresListOpen(false)}
              />
              <div className="relative bg-card rounded-t-3xl p-4 max-h-[75%] overflow-y-auto text-right animate-in slide-in-from-bottom-4 duration-200">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setStoresListOpen(false)}
                    className="h-auto w-auto p-1 text-muted-foreground hover:text-foreground"
                  >
                    <IconRenderer name="close_outlined" className="w-4 h-4" />
                  </Button>
                  <span className="font-extrabold text-sm text-foreground">
                    جدول محلات {selectedDay} ({currentDayStores.length})
                  </span>
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

          {addStoreModalOpen && (
            <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
              <div
                className="absolute inset-0 bg-black/40 animate-in fade-in duration-200"
                onClick={() => setAddStoreModalOpen(false)}
              />
              <div className="relative bg-card rounded-3xl p-4 w-full text-right animate-in zoom-in-95 duration-200">
                <form onSubmit={handleAddStoreSubmit}>
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      onClick={() => setAddStoreModalOpen(false)}
                      className="h-auto w-auto p-1 text-muted-foreground hover:text-foreground"
                    >
                      <IconRenderer name="close_outlined" className="w-4 h-4" />
                    </Button>
                    <span className="font-bold text-xs text-foreground">
                      إضافة عميل / سوبرماركت جديد
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div>
                      <label className="block text-[11px] font-bold text-foreground mb-1">
                        اسم المحل
                      </label>
                      <Input
                        type="text"
                        placeholder="مثال: أسواق العاصمة"
                        value={newStoreName}
                        onChange={(e) => setNewStoreName(e.target.value)}
                        className="text-right rounded-xl"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-foreground mb-1">
                        العنوان / الشارع
                      </label>
                      <Input
                        type="text"
                        placeholder="مثال: شارع طارق غسان"
                        value={newStoreAddress}
                        onChange={(e) => setNewStoreAddress(e.target.value)}
                        className="text-right rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <Button
                      type="submit"
                      className="flex-1 h-auto py-2 font-bold rounded-xl text-xs"
                    >
                      حفظ في خط سير {selectedDay}
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setAddStoreModalOpen(false)}
                      className="h-auto py-2 px-3 font-bold rounded-xl text-xs"
                    >
                      إلغاء
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="w-full h-9 bg-card border-t border-border flex items-center justify-around shrink-0 select-none">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleGoHome}
              className="h-auto p-2 text-muted-foreground hover:text-foreground"
              title="التطبيقات الأخيرة"
            >
              <div className="w-3.5 h-3.5 rounded-[3px] border-2 border-current" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleGoHome}
              className="h-auto p-2 text-foreground hover:text-primary"
              title="الشاشة الرئيسية"
            >
              <div className="w-4 h-4 rounded-full border-2 border-current" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleGoHome}
              className="h-auto p-2 text-muted-foreground hover:text-foreground"
              title="رجوع"
            >
              <div className="w-0 h-0 border-y-[6px] border-y-transparent border-r-[9px] border-r-current" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export const RepPhoneInspectSection: React.FC = () => {
  return (
    <section
      id="rep-mobile-inspect"
      className="py-16 sm:py-24 relative overflow-hidden border-y  "
    >
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-info/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-right order-2 lg:order-1">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              تطبيق هاتف المندوب <br />
              <span className="bg-gradient-to-r from-primary via-primary/70 to-info bg-clip-text text-transparent">
                لإدارة الجولات والزيارات الميدانية
              </span>
            </h2>

            <p className=" text-base sm:text-lg leading-relaxed font-normal">
              تطبيق مخصص لمندوبي مبيعات الجملة على هواتف أندرويد. يبدأ المندوب
              يومه بفتح التطبيق للاطلاع على خط السير المخصص لليوم، وتحديد مواقع
              السوبرماركت على الخريطة عبر GPS، وتحصيل الذمم المالية، وإصدار
              الفواتير الفورية.
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
                  <h4 className="font-extrabold mb-1">
                    دقة تحديد الموقع عبر GPS
                  </h4>
                  <p className=" text-xs">
                    زر واحد لتثبيت موقع المندوب فوراً، لمنع التلاعب وضمان صحة
                    الزيارات الميدانية.
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

          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <RepPhoneInspect />
          </div>
        </div>
      </div>
    </section>
  );
};
