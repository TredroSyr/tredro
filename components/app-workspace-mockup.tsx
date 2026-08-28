import React, { useState, useMemo } from "react";
import { IconRenderer } from "@/assets/icons/iconRenderer";
import type { iconName } from "@/assets/icons/iconRenderer/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import Image from "next/image";

export type DashboardView =
  | "home"
  | "reps"
  | "customers"
  | "products"
  | "create_product"
  | "orders"
  | "invoices"
  | "permissions";

export const AppWorkspaceMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DashboardView>("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [aiInsightSlide, setAiInsightSlide] = useState(0);
  const [notification, setNotification] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [installedPwa, setInstalledPwa] = useState(false);
  const [installBannerVisible, setInstallBannerVisible] = useState(true);
  const [sidebarInspectOpen, setSidebarInspectOpen] = useState(false);

  // New product form state
  const [createProductTab, setCreateProductTab] = useState<
    "basic" | "details" | "pricing" | "custom" | "images" | "review"
  >("basic");
  const [productForm, setProductForm] = useState({
    name: "زيت دوار الشمس النقي (كرتونة 12 عبوة)",
    description:
      "زيت نباتي مكرر عالي الجودة للطهي والقلي والتوزيع اليومي للمحلات والسوبرماركت",
    sku: "OIL-SUN-12L",
    barcode: "6291048201948",
    category: "زيوت ودهون",
    brand: "الزهرة",
    wholesalePrice: "145000",
    cartonQty: "12",
    stockInWarehouse: "450",
  });

  // Reps sample data (realistic Syrian FMCG wholesale distribution)
  const [repsList, setRepsList] = useState([
    {
      id: 1,
      name: "أحمد الشامي",
      phone: "+963 933 123 456",
      referral: "REP-DMS-01",
      status: "مفعل",
      visits: 28,
      target: "94%",
      region: "دمشق - الميدان والمزة",
      vehicle: "فان هيونداي H1",
    },
    {
      id: 2,
      name: "سامر الحلبي",
      phone: "+963 944 987 654",
      referral: "REP-ALP-02",
      status: "مفعل",
      visits: 34,
      target: "98%",
      region: "حلب - السليمانية والشهباء",
      vehicle: "كيا موهافي فان",
    },
    {
      id: 3,
      name: "محمود العلي",
      phone: "+963 955 312 323",
      referral: "REP-HMS-03",
      status: "مفعل",
      visits: 19,
      target: "82%",
      region: "حمص وحماة",
      vehicle: "شاحنة ميتسوبيشي 2.5 طن",
    },
    {
      id: 4,
      name: "فهد الدوسري",
      phone: "+963 966 323 949",
      referral: "REP-LTK-04",
      status: "مفعل",
      visits: 22,
      target: "89%",
      region: "اللاذقية وطرطوس",
      vehicle: "فان تويوتا هايس",
    },
    {
      id: 5,
      name: "طارق غسان",
      phone: "+963 988 565 232",
      referral: "REP-DRZ-05",
      status: "مفعل",
      visits: 30,
      target: "95%",
      region: "درعا والسويداء",
      vehicle: "فان هيونداي كلاسيك",
    },
  ]);

  // Customers (Supermarkets) sample data
  const [customersList, setCustomersList] = useState([
    {
      id: 1,
      name: "سوبرماركت البركة",
      owner: "أبو محمد البركة",
      phone: "+963 933 445 566",
      address: "دمشق - المزة فيلات غربية",
      balance: "1,450,000 ل.س",
      rep: "أحمد الشامي",
      lastOrder: "اليوم",
    },
    {
      id: 2,
      name: "ميني ماركت الأمل",
      owner: "سامي الخراط",
      phone: "+963 944 556 677",
      address: "حلب - حي السليمانية",
      balance: "3,200,000 ل.س",
      rep: "سامر الحلبي",
      lastOrder: "اليوم",
    },
    {
      id: 3,
      name: "أسواق الخيرات الكبرى",
      owner: "حاج رضوان الخير",
      phone: "+963 955 667 788",
      address: "حمص - شارع الدبلان",
      balance: "5,850,000 ل.س",
      rep: "محمود العلي",
      lastOrder: "أمس",
    },
    {
      id: 4,
      name: "تموينات الفلاح الحديثة",
      owner: "موفق الفلاح",
      phone: "+963 966 778 899",
      address: "اللاذقية - شارع 8 آذار",
      balance: "920,000 ل.س",
      rep: "فهد الدوسري",
      lastOrder: "أمس",
    },
    {
      id: 5,
      name: "سوبرماركت الوفاء",
      owner: "باسم الوفائي",
      phone: "+963 988 889 900",
      address: "درعا - السوق التجاري",
      balance: "2,100,000 ل.س",
      rep: "طارق غسان",
      lastOrder: "26 آب",
    },
  ]);

  // Products sample data (realistic FMCG wholesale items with images)
  const [productsList, setProductsList] = useState([
    {
      id: 1,
      name: "زيت دوار الشمس النقي (كرتونة 12 عبوة)",
      desc: "عبوات سعة 1 لتر مكرر نقي ممتاز للقلي والطهي",
      cat: "زيوت ودهون",
      status: "منشور",
      price: "145,000",
      unit: "كرتونة",
      tag: "الزهرة",
      stock: 450,
      image:
        "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      name: "سكر أبيض ناعم مكرر (شوال 10 كغ)",
      desc: "سكر نقي تعبئة وتوزيع ممتاز عالي الجودة",
      cat: "مواد أساسية",
      status: "منشور",
      price: "95,000",
      unit: "شوال",
      tag: "الخيرات",
      stock: 820,
      image:
        "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=500&auto=format&fit=crop&q=80",
    },
    {
      id: 3,
      name: "حليب مجفف كامل الدسم (صندوق 12 علبة)",
      desc: "عبوة معدنية 900 غرام غني بالفيتامينات والمعادن",
      cat: "ألبان وتغذية",
      status: "منشور",
      price: "480,000",
      unit: "صندوق",
      tag: "نيدو",
      stock: 180,
      image:
        "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=80",
    },
    {
      id: 4,
      name: "أرز بسمتي هندي درجة أولى (شوال 10 كغ)",
      desc: "أرز هندي حبة طويلة فاخر ورائحة زكية",
      cat: "حبوب وتموين",
      status: "منشور",
      price: "160,000",
      unit: "شوال",
      tag: "الشعلان",
      stock: 320,
      image:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80",
    },
    {
      id: 5,
      name: "شاي سيلاني أسود فاخر (كرتونة 24 علبة)",
      desc: "شاي أسود فرط نكهة أصلية 400 غرام جودة فائقة",
      cat: "مشروبات",
      status: "منشور",
      price: "240,000",
      unit: "كرتونة",
      tag: "الغزالين",
      stock: 290,
      image:
        "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=80",
    },
    {
      id: 6,
      name: "تونة خفيفة بالزيت النباتي (صندوق 48 علبة)",
      desc: "قطع متماسكة 185 غرام معقمة ومحفوظة بعناية",
      cat: "معلبات",
      status: "منشور",
      price: "380,000",
      unit: "صندوق",
      tag: "المحيط",
      stock: 150,
      image:
        "https://images.unsplash.com/photo-1534483509719-3feaee7c30da?w=500&auto=format&fit=crop&q=80",
    },
    {
      id: 7,
      name: "معكرونة إيطالية تشكيلة (كرتونة 20 كيس)",
      desc: "سميد قمح قاسي 500 غرام متنوعة الأشكال",
      cat: "حبوب وتموين",
      status: "مسودة",
      price: "85,000",
      unit: "كرتونة",
      tag: "البركة",
      stock: 540,
      image:
        "https://images.unsplash.com/photo-1621996346565-e3adc6d7d0f3?w=500&auto=format&fit=crop&q=80",
    },
    {
      id: 8,
      name: "مسحوق غسيل أوتوماتيك (شوال 10 كغ)",
      desc: "تركيبة إزالة البقع الصعبة برائحة اللافندر المنعشة",
      cat: "منظفات",
      status: "منشور",
      price: "115,000",
      unit: "شوال",
      tag: "أومو",
      stock: 210,
      image:
        "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500&auto=format&fit=crop&q=80",
    },
  ]);

  // Orders sample data
  const [ordersList, setOrdersList] = useState([
    {
      id: "ORD-8942",
      store: "سوبرماركت البركة",
      rep: "أحمد الشامي",
      total: "1,450,000 ل.س",
      items: 8,
      status: "مكتملة",
      date: "اليوم، 10:30 ص",
      payment: "نقدي (تم التحصيل)",
    },
    {
      id: "ORD-8941",
      store: "ميني ماركت الأمل",
      rep: "سامر الحلبي",
      total: "3,200,000 ل.س",
      items: 14,
      status: "قيد التوصيل",
      date: "اليوم، 09:15 ص",
      payment: "آجل 15 يوم",
    },
    {
      id: "ORD-8940",
      store: "أسواق الخيرات الكبرى",
      rep: "طارق غسان",
      total: "5,850,000 ل.س",
      items: 22,
      status: "قيد الانتظار",
      date: "أمس، 04:45 م",
      payment: "شيك مصرفي",
    },
    {
      id: "ORD-8939",
      store: "تموينات الفلاح الحديثة",
      rep: "محمود العلي",
      total: "920,000 ل.س",
      items: 5,
      status: "مكتملة",
      date: "أمس، 02:10 م",
      payment: "نقدي (تم التحصيل)",
    },
    {
      id: "ORD-8938",
      store: "سوبرماركت الوفاء",
      rep: "فهد الدوسري",
      total: "2,100,000 ل.س",
      items: 11,
      status: "مكتملة",
      date: "26 آب، 11:20 ص",
      payment: "نقدي (تم التحصيل)",
    },
  ]);

  // Invoices sample data
  const [invoicesList, setInvoicesList] = useState([
    {
      id: "INV-IN-104",
      type: "إدخال مستودع",
      supplier: "شركة الزيوت الحديثة",
      amount: "12,400,000 ل.س",
      status: "معتمدة ومطابقة",
      date: "28 آب 2026",
      itemsCount: 450,
    },
    {
      id: "INV-IN-103",
      type: "إدخال مستودع",
      supplier: "مجموعة النيدو للتوريد",
      amount: "24,800,000 ل.س",
      status: "معتمدة ومطابقة",
      date: "27 آب 2026",
      itemsCount: 180,
    },
    {
      id: "INV-RET-012",
      type: "مرتجع تالف من مندوب",
      supplier: "المندوب: أحمد الشامي",
      amount: "185,000 ل.س",
      status: "تمت التسوية",
      date: "26 آب 2026",
      itemsCount: 4,
    },
    {
      id: "INV-IN-102",
      type: "إدخال مستودع",
      supplier: "مطاحن ومستودعات السكر",
      amount: "18,500,000 ل.س",
      status: "معتمدة ومطابقة",
      date: "25 آب 2026",
      itemsCount: 820,
    },
  ]);

  const [addRepModalOpen, setAddRepModalOpen] = useState(false);
  const [newRepName, setNewRepName] = useState("");
  const [newRepPhone, setNewRepPhone] = useState("");
  const [newRepRegion, setNewRepRegion] = useState("");

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleInstallApp = () => {
    setInstalledPwa(true);
    showToast("تم تثبيت تطبيق Tredro بنجاح على جهازك ✅");
  };

  const handleCopyPhone = (phone: string, idx: number) => {
    navigator.clipboard?.writeText(phone);
    setCopiedIndex(idx);
    showToast(`تم نسخ رقم الهاتف: ${phone}`);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleDeleteRep = (id: number) => {
    setRepsList(repsList.filter((r) => r.id !== id));
    showToast("تم حذف المندوب من القائمة");
  };

  const handleDeleteProduct = (id: number) => {
    setProductsList(productsList.filter((p) => p.id !== id));
    showToast("تم حذف المنتج بنجاح");
  };

  const handleAddRepSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRepName.trim()) return;
    const newId = repsList.length + 1;
    setRepsList([
      ...repsList,
      {
        id: newId,
        name: newRepName,
        phone: newRepPhone || "+963 999 000 111",
        referral: `REP-NEW-0${newId}`,
        status: "مفعل",
        visits: 0,
        target: "100%",
        region: newRepRegion || "خط سير جديد",
        vehicle: "فان توزيع مخصص",
      },
    ]);
    setNewRepName("");
    setNewRepPhone("");
    setNewRepRegion("");
    setAddRepModalOpen(false);
    showToast(`تمت إضافة المندوب (${newRepName}) بنجاح`);
  };

  const handlePublishProduct = () => {
    setProductsList([
      {
        id: Date.now(),
        name: productForm.name,
        desc: productForm.description,
        cat: productForm.category,
        status: "منشور",
        price: Number(productForm.wholesalePrice).toLocaleString(),
        unit: "كرتونة",
        tag: productForm.brand,
        stock: Number(productForm.stockInWarehouse) || 100,
        image: "",
      },
      ...productsList,
    ]);
    setActiveTab("products");
    showToast("تم نشر المنتج الجديد بنجاح في كتالوج Tredro ✅");
  };

  // Filtered lists based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return productsList;
    return productsList.filter(
      (p) =>
        p.name.includes(searchQuery) ||
        p.cat.includes(searchQuery) ||
        p.tag.includes(searchQuery),
    );
  }, [productsList, searchQuery]);

  const filteredReps = useMemo(() => {
    if (!searchQuery.trim()) return repsList;
    return repsList.filter(
      (r) =>
        r.name.includes(searchQuery) ||
        r.phone.includes(searchQuery) ||
        r.region.includes(searchQuery),
    );
  }, [repsList, searchQuery]);

  const filteredOrders = useMemo(() => {
    if (!searchQuery.trim()) return ordersList;
    return ordersList.filter(
      (o) =>
        o.id.includes(searchQuery) ||
        o.store.includes(searchQuery) ||
        o.rep.includes(searchQuery),
    );
  }, [ordersList, searchQuery]);

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
      badge: { count: repsList.length, tone: "primary" },
    },
    {
      key: "customers",
      label: "الزبائن",
      icon: "contacts_outlined",
      isActive: activeTab === "customers",
      badge: { count: customersList.length, tone: "primary" },
    },
    {
      key: "products",
      label: "المنتجات",
      icon: "category_outlined",
      isActive: activeTab === "products" || activeTab === "create_product",
      badge: { count: productsList.length, tone: "primary" },
    },
    {
      key: "orders",
      label: "الطلبيات",
      icon: "cart_outlined",
      isActive: activeTab === "orders",
      badge: { count: ordersList.length, tone: "muted" },
    },
    {
      key: "invoices",
      label: "فواتير المستودع",
      icon: "checkout_outlined",
      isActive: activeTab === "invoices",
      badge: { count: invoicesList.length, tone: "muted" },
    },
    {
      key: "permissions",
      label: "المستخدمون والصلاحيات",
      icon: "authorities_outlined",
      isActive: activeTab === "permissions",
    },
  ];

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
              يمكنك تنزيل وتثبيت منظومة Tredro كتطبيق مستقل على الجوال
              والكمبيوتر للعمل دون متصفح وبسرعة فائقة.
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
          <span>المناديب ({repsList.length})</span>
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
          <span>الزبائن ({customersList.length})</span>
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
          <span>المنتجات ({productsList.length})</span>
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
          <span>الطلبيات ({ordersList.length})</span>
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
          <span>الفواتير ({invoicesList.length})</span>
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
      <div className="flex flex-col lg:flex-row min-h-[600px] bg-muted/50">
        {/* ========================================================
            RIGHT SIDEBAR (Desktop)
            ======================================================== */}
        <aside className="w-full lg:w-60 bg-card border-l border-border p-4 hidden lg:flex flex-col justify-between shrink-0">
          <div>
            <div className="pb-4 mb-3 border-b border-border flex items-center justify-between">
              <Image
                src="/tredro/full_logo.svg"
                alt="logo"
                width={100}
                height={50}
                className="transition-transform duration-200 hover:scale-105"
              />
            </div>

            <nav className="space-y-4">
              {sidebarNavItems.map((item) => (
                <Button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    item.isActive
                      ? "bg-primary/10 hover:bg-primary text-primary font-black shadow-xs"
                      : "text-muted-foreground hover:bg-accent bg-accent hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconRenderer name={item.icon} className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
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
                </Button>
              ))}
            </nav>

            {/* Rep Mobile App Jump Button */}
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
          </div>

          {/* Bottom Sidebar Info */}
          <div className="pt-4 border-t border-border space-y-2 text-xs">
            <div className="p-2.5 bg-muted/80 rounded-2xl flex items-center justify-between">
              <span className="font-extrabold text-xs text-foreground font-sans">
                Tredro Cloud
              </span>
              <div className="w-6 h-6 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-xs">
                <IconRenderer name="globe_outlined" className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="space-y-1 text-muted-foreground font-semibold text-[11px]">
              <div
                onClick={() => showToast("مركز مساعدة ودعم Tredro")}
                className="flex items-center gap-2 px-2 py-1 hover:text-foreground cursor-pointer"
              >
                <IconRenderer
                  name="help_outlined"
                  className="w-3.5 h-3.5 text-primary"
                />
                <span>المساعدة والمعلومات</span>
              </div>
            </div>
          </div>
        </aside>

        {/* ========================================================
            MAIN CONTENT AREA
            ======================================================== */}
        <main className="flex-1 p-3.5 sm:p-6 overflow-y-auto">
          {/* ----------------------------------------------------
              TAB 1: HOME DASHBOARD
              ---------------------------------------------------- */}
          {activeTab === "home" && (
            <div className="space-y-5 sm:space-y-6 animate-in fade-in duration-200">
              {/* Header Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                    نظرة عامة على المنصة
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 font-medium">
                    ملخص شامل للمناديب، الزبائن، الطلبات، الفواتير والمنتجات
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-muted-foreground bg-card border border-border px-3 py-1.5 rounded-xl shadow-xs">
                    📅 آب 2026 (مباشر)
                  </span>
                </div>
              </div>

              {/* 6 KPI Cards with realistic data */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
                {/* 1. مناديب نشطين */}
                <div
                  onClick={() => setActiveTab("reps")}
                  className="bg-card p-3 sm:p-3.5 rounded-2xl border border-border shadow-xs hover:border-primary transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-primary flex items-center gap-0.5">
                      <IconRenderer
                        name="arrow_up_right_outlined"
                        className="w-3 h-3"
                      />{" "}
                      6%
                    </span>
                    <div className="w-7 h-7 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <IconRenderer
                        name="users_outlined"
                        className="w-3.5 h-3.5"
                      />
                    </div>
                  </div>
                  <div className="mt-2.5">
                    <span className="text-xl sm:text-2xl font-black text-foreground">
                      {repsList.length}
                    </span>
                    <span className="block text-[11px] font-bold text-muted-foreground mt-0.5">
                      مناديب نشطين
                    </span>
                  </div>
                </div>

                {/* 2. إجمالي الزبائن */}
                <div className="bg-card p-3 sm:p-3.5 rounded-2xl border border-border shadow-xs hover:border-primary transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-primary flex items-center gap-0.5">
                      <IconRenderer
                        name="arrow_up_right_outlined"
                        className="w-3 h-3"
                      />{" "}
                      9%
                    </span>
                    <div className="w-7 h-7 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <IconRenderer
                        name="contacts_outlined"
                        className="w-3.5 h-3.5"
                      />
                    </div>
                  </div>
                  <div className="mt-2.5">
                    <span className="text-xl sm:text-2xl font-black text-foreground">
                      342
                    </span>
                    <span className="block text-[11px] font-bold text-muted-foreground mt-0.5">
                      سوبرماركت مسجل
                    </span>
                  </div>
                </div>

                {/* 3. الطلبات هالشهر */}
                <div
                  onClick={() => setActiveTab("orders")}
                  className="bg-card p-3 sm:p-3.5 rounded-2xl border border-border shadow-xs hover:border-primary transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-primary flex items-center gap-0.5">
                      <IconRenderer
                        name="arrow_up_right_outlined"
                        className="w-3 h-3"
                      />{" "}
                      14%
                    </span>
                    <div className="w-7 h-7 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <IconRenderer
                        name="cart_outlined"
                        className="w-3.5 h-3.5"
                      />
                    </div>
                  </div>
                  <div className="mt-2.5">
                    <span className="text-xl sm:text-2xl font-black text-foreground">
                      1,240
                    </span>
                    <span className="block text-[11px] font-bold text-muted-foreground mt-0.5">
                      الطلبات هالشهر
                    </span>
                  </div>
                </div>

                {/* 4. إجمالي المبيعات */}
                <div className="bg-card p-3 sm:p-3.5 rounded-2xl border border-border shadow-xs hover:border-primary transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-primary flex items-center gap-0.5">
                      <IconRenderer
                        name="arrow_up_right_outlined"
                        className="w-3 h-3"
                      />{" "}
                      11%
                    </span>
                    <div className="w-7 h-7 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <IconRenderer
                        name="money_outlined"
                        className="w-3.5 h-3.5"
                      />
                    </div>
                  </div>
                  <div className="mt-2.5">
                    <span className="text-base sm:text-xl font-black text-foreground">
                      86.4M
                    </span>
                    <span className="text-[9px] font-bold text-muted-foreground block">
                      ليرة سورية
                    </span>
                    <span className="block text-[11px] font-bold text-muted-foreground mt-0.5">
                      إجمالي المبيعات
                    </span>
                  </div>
                </div>

                {/* 5. الفواتير (إدخال/مرتجع) */}
                <div
                  onClick={() => setActiveTab("invoices")}
                  className="bg-card p-3 sm:p-3.5 rounded-2xl border border-border shadow-xs hover:border-primary transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-destructive flex items-center gap-0.5">
                      <IconRenderer
                        name="down_right_outlined"
                        className="w-3 h-3"
                      />{" "}
                      4%
                    </span>
                    <div className="w-7 h-7 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <IconRenderer
                        name="checkout_outlined"
                        className="w-3.5 h-3.5"
                      />
                    </div>
                  </div>
                  <div className="mt-2.5">
                    <span className="text-xl sm:text-2xl font-black text-foreground">
                      96
                    </span>
                    <span className="block text-[11px] font-bold text-muted-foreground mt-0.5">
                      فواتير المستودع
                    </span>
                  </div>
                </div>

                {/* 6. أصناف المخزون */}
                <div
                  onClick={() => setActiveTab("products")}
                  className="bg-card p-3 sm:p-3.5 rounded-2xl border border-border shadow-xs hover:border-primary transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-primary flex items-center gap-0.5">
                      <IconRenderer
                        name="arrow_up_right_outlined"
                        className="w-3 h-3"
                      />{" "}
                      22%
                    </span>
                    <div className="w-7 h-7 rounded-xl bg-warning/10 text-warning flex items-center justify-center">
                      <IconRenderer
                        name="category_outlined"
                        className="w-3.5 h-3.5"
                      />
                    </div>
                  </div>
                  <div className="mt-2.5">
                    <span className="text-xl sm:text-2xl font-black text-foreground">
                      {productsList.length}
                    </span>
                    <span className="block text-[11px] font-bold text-muted-foreground mt-0.5">
                      أصناف الكتالوج
                    </span>
                  </div>
                </div>
              </div>

              {/* Middle Section: AI Insights + Orders Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* AI Insights Card */}
                <div className="lg:col-span-5 bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-5 text-primary-foreground flex flex-col justify-between shadow-xl shadow-primary/20 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-0.5 rounded-lg bg-primary-foreground/15 text-[10px] font-black tracking-wider flex items-center gap-1 border border-primary-foreground/20">
                      <IconRenderer name="ai_outlined" className="w-3 h-3" />{" "}
                      Tredro AI
                    </span>
                    <h3 className="font-extrabold text-base text-primary-foreground">
                      توقعات وتنبؤات ذكية
                    </h3>
                  </div>

                  <div className="bg-primary-foreground/10 backdrop-blur-md rounded-2xl p-4 border border-primary-foreground/15 my-2">
                    <div className="flex items-start gap-2.5">
                      <IconRenderer
                        name="warning_outlined"
                        className="w-5 h-5 text-warning shrink-0 mt-0.5"
                      />
                      <div>
                        <h4 className="font-bold text-xs text-warning mb-1">
                          تنبيه ذكي: إعادة طلب صنف الزيت
                        </h4>
                        <p className="text-xs text-primary-foreground/90 leading-relaxed font-normal">
                          مخزون زيت الزهرة في سيارات مناديب خط دمشق شارف على
                          النفاد (المتبقي 42 كرتونة فقط مع ارتفاع الطلب 30%).
                          يُقترح تزويد الفانات صباح الغد.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Button
                      onClick={() =>
                        showToast("تم توجيه أمر تعزيز المخزون لأمين المستودع")
                      }
                      className="text-xs font-bold text-primary-foreground bg-primary-foreground/20 hover:bg-primary-foreground/30 px-3 py-1.5 rounded-xl border border-primary-foreground/20 transition-colors"
                    >
                      تنفيذ التوجيه فوراً
                    </Button>
                    <span className="text-[10px] text-primary-foreground/70">
                      تحليل لحظي لحركة البيع
                    </span>
                  </div>
                </div>

                {/* Orders Distribution Chart Card */}
                <div className="lg:col-span-7 bg-card rounded-3xl p-5 border border-border shadow-xs flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <IconRenderer
                      name="arrow_up_right_outlined"
                      className="w-4 h-4 text-muted-foreground"
                    />
                    <div className="text-right">
                      <span className="text-xs font-bold text-muted-foreground">
                        توزيع الطلبيات — هذا الشهر
                      </span>
                      <div className="flex items-baseline justify-end gap-1.5 mt-0.5">
                        <span className="text-2xl font-black text-foreground">
                          1,240
                        </span>
                        <span className="text-xs text-muted-foreground font-bold">
                          طلبية
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Visual Bar Columns */}
                  <div className="grid grid-cols-4 gap-3 items-end h-36 pt-4 pb-2 border-b border-border">
                    {/* 1. ملغية */}
                    <div className="flex flex-col items-center gap-1 h-full justify-end group">
                      <span className="text-[10px] font-bold text-muted-foreground">
                        50
                      </span>
                      <div className="w-full bg-muted rounded-xl h-[14%] group-hover:bg-destructive transition-colors" />
                      <span className="text-[11px] font-bold text-muted-foreground mt-1">
                        ملغية
                      </span>
                    </div>

                    {/* 2. مرتجعة */}
                    <div className="flex flex-col items-center gap-1 h-full justify-end group">
                      <span className="text-[10px] font-bold text-muted-foreground">
                        90
                      </span>
                      <div className="w-full bg-muted rounded-xl h-[20%] group-hover:bg-warning transition-colors" />
                      <span className="text-[11px] font-bold text-muted-foreground mt-1">
                        مرتجعة
                      </span>
                    </div>

                    {/* 3. قيد الانتظار */}
                    <div className="flex flex-col items-center gap-1 h-full justify-end group">
                      <span className="text-[10px] font-bold text-muted-foreground">
                        240
                      </span>
                      <div className="w-full bg-muted rounded-xl h-[38%] group-hover:bg-primary transition-colors" />
                      <span className="text-[11px] font-bold text-muted-foreground mt-1">
                        قيد الانتظار
                      </span>
                    </div>

                    {/* 4. مكتملة */}
                    <div className="flex flex-col items-center gap-1 h-full justify-end group">
                      <span className="text-xs font-black text-primary">
                        860
                      </span>
                      <div className="w-full bg-primary rounded-xl h-[85%] shadow-md shadow-primary/30" />
                      <span className="text-[11px] font-black text-foreground mt-1">
                        مكتملة
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ----------------------------------------------------
              TAB 2: PRODUCTS
              ---------------------------------------------------- */}
          {(activeTab === "products" || activeTab === "create_product") &&
            activeTab !== "create_product" && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-black text-foreground">
                      المنتجات وكتالوج الجملة
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-primary/15 text-primary text-xs font-black">
                      {filteredProducts.length} منتج
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="relative flex-1 sm:w-64">
                      <input
                        type="text"
                        placeholder="ابحث بالاسم، الصنف أو الماركة..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pr-8 pl-3 py-2 bg-card border border-border rounded-xl text-xs outline-none focus:border-primary shadow-xs"
                      />
                      <IconRenderer
                        name="search_outlined"
                        className="w-3.5 h-3.5 text-muted-foreground absolute right-2.5 top-1/2 -translate-y-1/2"
                      />
                    </div>

                    <Button
                      onClick={() => setActiveTab("create_product")}
                      className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-primary/20 cursor-pointer active:scale-95 transition-all"
                    >
                      <IconRenderer name="plus_outlined" className="w-4 h-4" />
                      <span>إضافة منتج</span>
                    </Button>
                  </div>
                </div>

                {/* Product Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="bg-card rounded-2xl border border-border overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div className="p-3 bg-muted/60 border-b border-border flex items-center justify-between text-[11px]">
                        <span className="font-bold text-muted-foreground">
                          {prod.cat}
                        </span>
                        <Badge
                          className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                            prod.status === "منشور"
                              ? "bg-primary/10 text-primary border border-primary/20"
                              : "bg-warning/10 text-warning border border-warning/30"
                          }`}
                        >
                          {prod.status}
                        </Badge>
                      </div>

                      <div className="h-36 bg-muted overflow-hidden relative group">
                        {prod.image ? (
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-primary/10">
                            <div className="w-10 h-10 rounded-2xl bg-primary-foreground/80 border border-primary/15 flex items-center justify-center text-primary shadow-xs">
                              <IconRenderer
                                name="bundle_outlined"
                                className="w-5 h-5"
                              />
                            </div>
                          </div>
                        )}
                        <span className="absolute bottom-2 right-2 text-[10px] bg-foreground/80 backdrop-blur-xs text-primary-foreground px-2.5 py-0.5 rounded-lg font-mono font-bold shadow-xs">
                          مخزون: {prod.stock}
                        </span>
                      </div>

                      <div className="p-3">
                        <h4 className="font-extrabold text-xs sm:text-sm text-foreground line-clamp-1">
                          {prod.name}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                          {prod.desc}
                        </p>
                      </div>

                      <div className="p-3 bg-muted/80 border-t border-border flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                          <Button
                            onClick={() => handleDeleteProduct(prod.id)}
                            className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                            title="حذف"
                          >
                            <IconRenderer
                              name="bin_outlined"
                              className="w-3.5 h-3.5"
                            />
                          </Button>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <Badge className="text-[10px] bg-muted/80 text-foreground px-1.5 py-0.2 rounded font-semibold">
                            {prod.tag}
                          </Badge>
                          <span className="font-black text-foreground text-xs">
                            {prod.price} ل.س
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* ----------------------------------------------------
              TAB: CREATE PRODUCT FORM
              ---------------------------------------------------- */}
          {activeTab === "create_product" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setActiveTab("products")}
                    className="p-1.5 rounded-lg bg-muted hover:bg-accent text-muted-foreground"
                  >
                    <IconRenderer
                      name="arrow_right_outlined"
                      className="w-4 h-4"
                    />
                  </Button>
                  <div>
                    <h2 className="text-xl font-black text-foreground">
                      إضافة منتج جديد للكتالوج
                    </h2>
                    <p className="text-xs text-muted-foreground font-medium">
                      أدخل تفاصيل الصنف، سعر الجملة، وسعة الكرتونة
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setActiveTab("products")}
                    className="px-3 py-1.5 text-xs font-bold text-muted-foreground hover:bg-accent rounded-xl"
                  >
                    إلغاء
                  </Button>
                  <Button
                    onClick={handlePublishProduct}
                    className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-primary/20"
                  >
                    <IconRenderer
                      name="upload_outlined"
                      className="w-3.5 h-3.5"
                    />
                    <span>حفظ ونشر في المنظومة</span>
                  </Button>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-card p-4 rounded-2xl border border-border space-y-3">
                  <h3 className="font-extrabold text-sm text-foreground border-b border-border pb-2">
                    البيانات الأساسية
                  </h3>

                  <div>
                    <label className="block font-bold text-foreground mb-1">
                      اسم المنتج
                    </label>
                    <input
                      type="text"
                      value={productForm.name}
                      onChange={(e) =>
                        setProductForm({ ...productForm, name: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-muted border border-border rounded-xl outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-foreground mb-1">
                      الوصف والتفاصيل
                    </label>
                    <textarea
                      rows={3}
                      value={productForm.description}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-muted border border-border rounded-xl outline-none focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-foreground mb-1">
                        التصنيف
                      </label>
                      <input
                        type="text"
                        value={productForm.category}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            category: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-muted border border-border rounded-xl outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-foreground mb-1">
                        الماركة / Brand
                      </label>
                      <input
                        type="text"
                        value={productForm.brand}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            brand: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-muted border border-border rounded-xl outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-2xl border border-border space-y-3">
                  <h3 className="font-extrabold text-sm text-foreground border-b border-border pb-2">
                    التسعير والمخزون
                  </h3>

                  <div>
                    <label className="block font-bold text-foreground mb-1">
                      سعر الجملة للكرتونة (ل.س)
                    </label>
                    <input
                      type="number"
                      value={productForm.wholesalePrice}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          wholesalePrice: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-muted border border-border rounded-xl outline-none focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-foreground mb-1">
                        عدد القطع في الكرتونة
                      </label>
                      <input
                        type="number"
                        value={productForm.cartonQty}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            cartonQty: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-muted border border-border rounded-xl outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-foreground mb-1">
                        الرصيد المتاح بالمستودع
                      </label>
                      <input
                        type="number"
                        value={productForm.stockInWarehouse}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            stockInWarehouse: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-muted border border-border rounded-xl outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-foreground mb-1">
                        رمز الـ SKU
                      </label>
                      <input
                        type="text"
                        value={productForm.sku}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            sku: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-muted border border-border rounded-xl outline-none focus:border-primary font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-foreground mb-1">
                        الباركود الدولي
                      </label>
                      <input
                        type="text"
                        value={productForm.barcode}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            barcode: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-muted border border-border rounded-xl outline-none focus:border-primary font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ----------------------------------------------------
              TAB 3: REPS
              ---------------------------------------------------- */}
          {activeTab === "reps" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-foreground">
                    فريق المناديب الميدانيين
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/15 text-primary text-xs font-black">
                    {filteredReps.length} مندوب
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative flex-1 sm:w-64">
                    <input
                      type="text"
                      placeholder="ابحث بالاسم، المنطقة أو الهاتف..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pr-8 pl-3 py-2 bg-card border border-border rounded-xl text-xs outline-none focus:border-primary shadow-xs"
                    />
                    <IconRenderer
                      name="search_outlined"
                      className="w-3.5 h-3.5 text-muted-foreground absolute right-2.5 top-1/2 -translate-y-1/2"
                    />
                  </div>

                  <Button
                    onClick={() => setAddRepModalOpen(true)}
                    className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-primary/20 cursor-pointer active:scale-95 transition-all"
                  >
                    <IconRenderer name="plus_outlined" className="w-4 h-4" />
                    <span>إضافة مندوب</span>
                  </Button>
                </div>
              </div>

              {/* Reps Table */}
              <div className="bg-card rounded-2xl border border-border shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-muted text-muted-foreground font-bold border-b border-border">
                      <tr>
                        <th className="py-3.5 px-4">#</th>
                        <th className="py-3.5 px-4">اسم المندوب</th>
                        <th className="py-3.5 px-4">المنطقة والخط</th>
                        <th className="py-3.5 px-4">المركبة</th>
                        <th className="py-3.5 px-4">رقم الهاتف</th>
                        <th className="py-3.5 px-4 text-center">الإنجاز</th>
                        <th className="py-3.5 px-4 text-center">الحالة</th>
                        <th className="py-3.5 px-4 text-center">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredReps.map((rep) => (
                        <tr
                          key={rep.id}
                          className="hover:bg-primary/10 transition-colors"
                        >
                          <td className="py-3.5 px-4 font-bold text-muted-foreground">
                            {rep.id}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-extrabold text-foreground">
                              {rep.name}
                            </div>
                            <span className="text-[10px] text-muted-foreground font-mono">
                              {rep.referral}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-foreground font-medium">
                            {rep.region}
                          </td>
                          <td className="py-3.5 px-4 text-muted-foreground">
                            {rep.vehicle}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-1.5 text-foreground font-mono">
                              <span className="text-sm">🇸🇾</span>
                              <span dir="ltr">{rep.phone}</span>
                              <Button
                                onClick={() =>
                                  handleCopyPhone(rep.phone, rep.id)
                                }
                                className="text-muted-foreground hover:text-primary p-0.5"
                                title="نسخ رقم الهاتف"
                              >
                                {copiedIndex === rep.id ? (
                                  <IconRenderer
                                    name="tick_outlined"
                                    className="w-3.5 h-3.5 text-primary"
                                  />
                                ) : (
                                  <IconRenderer
                                    name="copy_outlined"
                                    className="w-3.5 h-3.5"
                                  />
                                )}
                              </Button>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary font-bold text-[11px] border border-primary/20">
                              {rep.target} ({rep.visits} زيارة)
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-bold text-[11px] border border-primary/20">
                              {rep.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center justify-center gap-2 text-muted-foreground">
                              <Button
                                onClick={() => handleDeleteRep(rep.id)}
                                className="hover:text-destructive transition-colors p-1"
                                title="حذف"
                              >
                                <IconRenderer
                                  name="bin_outlined"
                                  className="w-3.5 h-3.5"
                                />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ----------------------------------------------------
              TAB: CUSTOMERS (الزبائن والمحلات)
              ---------------------------------------------------- */}
          {activeTab === "customers" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-foreground">
                    الزبائن والمتاجر المسجلة
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/15 text-primary text-xs font-black">
                    {customersList.length} متجر
                  </span>
                </div>

                <Button
                  onClick={() =>
                    showToast("إضافة متجر سوبرماركت جديد إلى خط التوزيع")
                  }
                  className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-primary/20 cursor-pointer active:scale-95 transition-all"
                >
                  <IconRenderer name="plus_outlined" className="w-4 h-4" />
                  <span>إضافة زبون جديد</span>
                </Button>
              </div>

              {/* Customers Table */}
              <div className="bg-card rounded-2xl border border-border shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-muted text-muted-foreground font-bold border-b border-border">
                      <tr>
                        <th className="py-3.5 px-4">#</th>
                        <th className="py-3.5 px-4">
                          اسم المتجر / السوبرماركت
                        </th>
                        <th className="py-3.5 px-4">صاحب المتجر</th>
                        <th className="py-3.5 px-4">العنوان والحي</th>
                        <th className="py-3.5 px-4">رقم الهاتف</th>
                        <th className="py-3.5 px-4">المندوب المخصص</th>
                        <th className="py-3.5 px-4 text-center">
                          الرصيد الآجل
                        </th>
                        <th className="py-3.5 px-4 text-center">آخر طلب</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {customersList.map((cust) => (
                        <tr
                          key={cust.id}
                          className="hover:bg-primary/10 transition-colors"
                        >
                          <td className="py-3.5 px-4 font-bold text-muted-foreground">
                            {cust.id}
                          </td>
                          <td className="py-3.5 px-4 font-extrabold text-foreground">
                            {cust.name}
                          </td>
                          <td className="py-3.5 px-4 text-foreground">
                            {cust.owner}
                          </td>
                          <td className="py-3.5 px-4 text-muted-foreground">
                            {cust.address}
                          </td>
                          <td
                            className="py-3.5 px-4 font-mono text-foreground"
                            dir="ltr"
                          >
                            {cust.phone}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary font-bold text-[11px] border border-primary/20">
                              {cust.rep}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center font-black text-foreground">
                            {cust.balance}
                          </td>
                          <td className="py-3.5 px-4 text-center text-muted-foreground text-[11px]">
                            {cust.lastOrder}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ----------------------------------------------------
              TAB 4: ORDERS
              ---------------------------------------------------- */}
          {activeTab === "orders" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-foreground">
                    طلبيات السوبرماركت والمحلات
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/15 text-primary text-xs font-black">
                    {filteredOrders.length} طلبية
                  </span>
                </div>

                <div className="relative flex-1 sm:w-64">
                  <input
                    type="text"
                    placeholder="ابحث برقم الطلب أو اسم المحل..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pr-8 pl-3 py-2 bg-card border border-border rounded-xl text-xs outline-none focus:border-primary shadow-xs"
                  />
                  <IconRenderer
                    name="search_outlined"
                    className="w-3.5 h-3.5 text-muted-foreground absolute right-2.5 top-1/2 -translate-y-1/2"
                  />
                </div>
              </div>

              {/* Orders Table */}
              <div className="bg-card rounded-2xl border border-border shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-muted text-muted-foreground font-bold border-b border-border">
                      <tr>
                        <th className="py-3.5 px-4">رقم الطلبية</th>
                        <th className="py-3.5 px-4">السوبرماركت / المتجر</th>
                        <th className="py-3.5 px-4">المندوب المسؤول</th>
                        <th className="py-3.5 px-4">إجمالي الفاتورة</th>
                        <th className="py-3.5 px-4">طريقة السداد</th>
                        <th className="py-3.5 px-4 text-center">
                          حالة التوصيل
                        </th>
                        <th className="py-3.5 px-4 text-center">التاريخ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredOrders.map((ord) => (
                        <tr
                          key={ord.id}
                          className="hover:bg-primary/10 transition-colors"
                        >
                          <td className="py-3.5 px-4 font-mono font-black text-primary">
                            {ord.id}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-foreground">
                            {ord.store}
                          </td>
                          <td className="py-3.5 px-4 text-foreground">
                            {ord.rep}
                          </td>
                          <td className="py-3.5 px-4 font-black text-foreground">
                            {ord.total}
                          </td>
                          <td className="py-3.5 px-4 text-muted-foreground text-[11px]">
                            {ord.payment}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <Badge
                              className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                                ord.status === "مكتملة"
                                  ? "bg-primary/10 text-primary border border-primary/20"
                                  : ord.status === "قيد التوصيل"
                                    ? "bg-primary/10 text-primary border border-primary/20"
                                    : "bg-warning/10 text-warning border border-warning/30"
                              }`}
                            >
                              {ord.status}
                            </Badge>
                          </td>
                          <td className="py-3.5 px-4 text-center text-muted-foreground text-[11px]">
                            {ord.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ----------------------------------------------------
              TAB 5: INVOICES
              ---------------------------------------------------- */}
          {activeTab === "invoices" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black text-foreground">
                    فواتير إدخال المستودع والتسويات
                  </h2>
                  <p className="text-xs text-muted-foreground font-medium">
                    أذون الاستلام (Stock In) ومطابقة الكميات مع الموردين
                  </p>
                </div>

                <Button
                  onClick={() =>
                    showToast("فتح معالج إدخال فاتورة مستودع Stock-In جديدة")
                  }
                  className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-primary/20"
                >
                  <IconRenderer name="plus_outlined" className="w-4 h-4" />
                  <span>فاتورة إدخال مستودع جديدة</span>
                </Button>
              </div>

              {/* Invoices Table */}
              <div className="bg-card rounded-2xl border border-border shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-muted text-muted-foreground font-bold border-b border-border">
                      <tr>
                        <th className="py-3.5 px-4">رقم الفاتورة</th>
                        <th className="py-3.5 px-4">نوع المستند</th>
                        <th className="py-3.5 px-4">المورد / المصدر</th>
                        <th className="py-3.5 px-4">إجمالي القيمة</th>
                        <th className="py-3.5 px-4">الكمية الإجمالية</th>
                        <th className="py-3.5 px-4 text-center">
                          حالة التدقيق
                        </th>
                        <th className="py-3.5 px-4 text-center">التاريخ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {invoicesList.map((inv) => (
                        <tr
                          key={inv.id}
                          className="hover:bg-primary/10 transition-colors"
                        >
                          <td className="py-3.5 px-4 font-mono font-black text-foreground">
                            {inv.id}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-primary">
                            {inv.type}
                          </td>
                          <td className="py-3.5 px-4 text-foreground">
                            {inv.supplier}
                          </td>
                          <td className="py-3.5 px-4 font-black text-foreground">
                            {inv.amount}
                          </td>
                          <td className="py-3.5 px-4 text-muted-foreground font-mono">
                            {inv.itemsCount} كرتونة
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-bold text-[11px] border border-primary/20">
                              {inv.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center text-muted-foreground text-[11px]">
                            {inv.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ----------------------------------------------------
              TAB 6: PERMISSIONS
              ---------------------------------------------------- */}
          {activeTab === "permissions" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-black text-foreground">
                  المستخدمون وصلاحيات المنظومة
                </h2>
                <p className="text-xs text-muted-foreground font-medium">
                  إدارة أدوار المشرفين، المحاسبين، ومسؤولي المستودع
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-card p-4 rounded-2xl border border-border space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-primary/15 text-primary flex items-center justify-center font-black">
                    1
                  </div>
                  <h3 className="font-extrabold text-sm text-foreground">
                    إدارة العمليات (Super Admin)
                  </h3>
                  <p className="text-muted-foreground text-xs">
                    صلاحية مطلقة لإدارة الحسابات، تسعير المنتجات، والاطلاع على
                    أرباح الشركة.
                  </p>
                  <Badge className="inline-block px-2 py-0.5 bg-primary/10 text-primary rounded-md font-bold text-[10px]">
                    2 مستخدمين نشطين
                  </Badge>
                </div>

                <div className="bg-card p-4 rounded-2xl border border-border space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-primary/15 text-primary flex items-center justify-center font-black">
                    2
                  </div>
                  <h3 className="font-extrabold text-sm text-foreground">
                    مشرفو المستودع (Warehouse)
                  </h3>
                  <p className="text-muted-foreground text-xs">
                    تسجيل فواتير Stock In، صرف شحنات سيارات المناديب، وتسجيل
                    المرتجعات.
                  </p>
                  <Badge className="inline-block px-2 py-0.5 bg-primary/10 text-primary rounded-md font-bold text-[10px]">
                    3 أمناء مستودع
                  </Badge>
                </div>

                <div className="bg-card p-4 rounded-2xl border border-border space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-primary/15 text-primary flex items-center justify-center font-black">
                    3
                  </div>
                  <h3 className="font-extrabold text-sm text-foreground">
                    مناديب المبيعات (Van Sales)
                  </h3>
                  <p className="text-muted-foreground text-xs">
                    استخدام تطبيق الهاتف فقط، زيارة خطوط السير المجدولة، وتحصيل
                    الفواتير.
                  </p>
                  <Badge className="inline-block px-2 py-0.5 bg-primary/10 text-primary rounded-md font-bold text-[10px]">
                    {repsList.length} مناديب ميدانيين
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modal: Add New Rep */}
      {addRepModalOpen && (
        <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleAddRepSubmit}
            className="bg-card rounded-3xl p-5 max-w-md w-full text-right animate-in zoom-in-95 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <Button
                type="button"
                onClick={() => setAddRepModalOpen(false)}
                className="text-muted-foreground hover:text-muted-foreground"
              >
                <IconRenderer name="close_outlined" className="w-5 h-5" />
              </Button>
              <h3 className="font-black text-sm text-foreground">
                إضافة مندوب مبيعات جديد
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-foreground mb-1">
                  اسم المندوب الرباعي
                </label>
                <input
                  type="text"
                  placeholder="مثال: خالد محمود النجار"
                  value={newRepName}
                  onChange={(e) => setNewRepName(e.target.value)}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-xl outline-none focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-foreground mb-1">
                  رقم الهاتف الجوال
                </label>
                <input
                  type="text"
                  placeholder="+963 933 000 111"
                  value={newRepPhone}
                  onChange={(e) => setNewRepPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-xl outline-none focus:border-primary font-mono text-left"
                />
              </div>

              <div>
                <label className="block font-bold text-foreground mb-1">
                  المنطقة وخط السير
                </label>
                <input
                  type="text"
                  placeholder="مثال: دمشق - جرمانا وباب توما"
                  value={newRepRegion}
                  onChange={(e) => setNewRepRegion(e.target.value)}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-xl outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Button
                type="submit"
                className="flex-1 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl text-xs shadow-md shadow-primary/20"
              >
                تأكيد وإضافة المندوب
              </Button>
              <Button
                type="button"
                onClick={() => setAddRepModalOpen(false)}
                className="py-2.5 px-4 bg-muted text-foreground font-bold rounded-xl text-xs"
              >
                إلغاء
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Modal: Sidebar Inspection (فحص ومعاينة المنظومة الشاملة من القائمة الجانبية) */}
      {sidebarInspectOpen && (
        <div className="fixed inset-0 bg-foreground/70 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-card rounded-3xl max-w-2xl w-full shadow-2xl border border-border overflow-hidden text-right animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground flex items-center justify-between">
              <Button
                onClick={() => setSidebarInspectOpen(false)}
                className="w-8 h-8 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground flex items-center justify-center transition-colors cursor-pointer"
              >
                <IconRenderer name="close_outlined" className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-2.5">
                <div>
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-[10px] bg-primary-foreground/20 text-primary-foreground px-2 py-0.5 rounded-full font-black">
                      Inspect Bar
                    </span>
                    <h3 className="font-black text-base sm:text-lg">
                      فحص ومعاينة منظومة Tredro
                    </h3>
                  </div>
                  <p className="text-[11px] sm:text-xs text-primary-foreground/80 mt-0.5">
                    تقرير الفحص والتشغيل الفوري لشبكة التوزيع والمستودعات
                  </p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-primary-foreground/20 flex items-center justify-center shrink-0">
                  <IconRenderer
                    name="eye_visible_outlined"
                    className="w-5 h-5 text-primary-foreground"
                  />
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs">
              {/* Inspection Overview Banner with Syrian Distribution Context */}
              <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&auto=format&fit=crop&q=80"
                  alt="مستودع التوزيع الذكي"
                  className="w-full sm:w-28 h-24 sm:h-20 object-cover rounded-xl shadow-xs shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-1 text-right">
                  <div className="flex items-center gap-1.5 justify-end">
                    <span className="text-[10px] bg-primary/15 text-primary font-bold px-2 py-0.5 rounded-md">
                      حالة النظام: سليم 100%
                    </span>
                    <h4 className="font-extrabold text-sm text-foreground">
                      المستودع المركزي وشبكة الفانات
                    </h4>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-[11px]">
                    الربط السحابي اللحظي نشط بين إدارة الشركة، 5 سيارات توزيع
                    ميدانية في مختلف المحافظات، و342 نقطة بيع وسوبرماركت.
                  </p>
                </div>
              </div>

              {/* Status Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="bg-muted p-3 rounded-2xl border border-border">
                  <div className="text-xl font-black text-primary">
                    {repsList.length}
                  </div>
                  <div className="text-[11px] font-bold text-muted-foreground mt-0.5">
                    مناديب متصلين
                  </div>
                </div>
                <div className="bg-muted p-3 rounded-2xl border border-border">
                  <div className="text-xl font-black text-primary">
                    {productsList.length}
                  </div>
                  <div className="text-[11px] font-bold text-muted-foreground mt-0.5">
                    أصناف مفهرسة
                  </div>
                </div>
                <div className="bg-muted p-3 rounded-2xl border border-border">
                  <div className="text-xl font-black text-primary">
                    {ordersList.length}
                  </div>
                  <div className="text-[11px] font-bold text-muted-foreground mt-0.5">
                    طلبات قيد المعالجة
                  </div>
                </div>
                <div className="bg-muted p-3 rounded-2xl border border-border">
                  <div className="text-xl font-black text-warning">0.12s</div>
                  <div className="text-[11px] font-bold text-muted-foreground mt-0.5">
                    سرعة الاستجابة
                  </div>
                </div>
              </div>

              {/* FMCG Showcase Mini Gallery */}
              <div>
                <h4 className="font-black text-foreground text-xs sm:text-sm mb-2.5">
                  عينة أصناف المستودع قيد التداول اليوم
                </h4>
                <div className="grid grid-cols-3 gap-2.5">
                  {productsList.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-border overflow-hidden bg-muted p-2 text-center space-y-1"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-16 object-cover rounded-lg"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <div className="font-extrabold text-[11px] text-foreground truncate">
                        {item.name}
                      </div>
                      <div className="text-[10px] text-primary font-bold">
                        {item.price} ل.س
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 bg-muted border-t border-border flex items-center justify-between">
              <Button
                onClick={() => setSidebarInspectOpen(false)}
                className="px-5 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl text-xs shadow-xs cursor-pointer"
              >
                إغلاق تقرير الفحص
              </Button>
              <span className="text-[11px] text-muted-foreground font-mono">
                Tredro Core v2.4
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
