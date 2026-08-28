import React, { useState } from "react";

import { Menu, X, Building2, Store } from "lucide-react";
import Image from "next/image";
import { IconRenderer } from "@/assets/icons/iconRenderer";
interface HeaderProps {
  currentPage: "home" | "about";
  onNavigate: (page: "home" | "about") => void;
  onStartCompany: () => void;
  onStartCustomer: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onStartCompany,
  onStartCustomer,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md transition-all duration-200 border-b border-slate-100 font-['Cairo',sans-serif]">
      {/* Main Navbar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Right (RTL right): Brand Logo & Main Nav Items (Home + About) */}
        <div className="flex items-center gap-6 sm:gap-8">
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center focus:outline-none cursor-pointer"
            aria-label="Tredro Home"
          >
            <Image
              src="/tredro/full_logo.svg"
              alt="logo"
              width={100}
              height={50}
              className="cursor-pointer transition-transform duration-200 hover:scale-105"
            />
          </button>

          {/* Desktop Nav Items: ONLY Home + About */}
          <div className="hidden sm:flex items-center gap-2 text-sm font-bold text-slate-700">
            {/* 1. Home (الرئيسية) */}
            <button
              onClick={() => onNavigate("home")}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                currentPage === "home"
                  ? "bg-blue-50 text-blue-600 font-black shadow-xs"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              الرئيسية
            </button>

            {/* 2. About (من نحن) */}
            <button
              onClick={() => onNavigate("about")}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                currentPage === "about"
                  ? "bg-blue-50 text-blue-600 font-black shadow-xs"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              من نحن
            </button>
          </div>
        </div>

        {/* Left CTA Actions: ONLY Start as company + Start as customer */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Start as customer (ابدأ كزبون) */}
          <button
            onClick={onStartCustomer}
            className="text-xs sm:text-sm font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-xs active:scale-95"
          >
            <Store className="w-4 h-4 text-emerald-600" />
            <span>ابدأ كزبون</span>
          </button>

          {/* Start as company (ابدأ كشركة) */}
          <button
            onClick={onStartCompany}
            className="text-xs sm:text-sm font-bold text-white bg-[#0052cc] hover:bg-blue-700 px-5 py-2.5 rounded-xl transition-all duration-200 shadow-md shadow-blue-600/20 active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <Building2 className="w-4 h-4 text-white" />
            <span>ابدأ كشركة</span>
          </button>
        </div>

        {/* Mobile Action & Menu Toggle Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onStartCompany}
            className="text-[11px] font-bold text-white bg-blue-600 px-3 py-1.5 rounded-xl shadow-xs"
          >
            ابدأ كشركة
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu: ONLY Home + About + Start as company + Start as customer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-200 text-right">
          <div className="flex flex-col gap-1 text-sm font-bold text-slate-800">
            <button
              onClick={() => {
                onNavigate("home");
                setMobileMenuOpen(false);
              }}
              className={`p-3 rounded-xl text-right transition-colors ${
                currentPage === "home"
                  ? "bg-blue-50 text-blue-600 font-extrabold"
                  : "hover:bg-slate-50"
              }`}
            >
              الرئيسية
            </button>

            <button
              onClick={() => {
                onNavigate("about");
                setMobileMenuOpen(false);
              }}
              className={`p-3 rounded-xl text-right transition-colors ${
                currentPage === "about"
                  ? "bg-blue-50 text-blue-600 font-extrabold"
                  : "hover:bg-slate-50"
              }`}
            >
              من نحن
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onStartCustomer();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs flex items-center justify-center gap-2"
            >
              <Store className="w-4 h-4" />
              <span>ابدأ كزبون (سوبرماركت ومتاجر)</span>
            </button>

            <button
              onClick={() => {
                onStartCompany();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-[#0052cc] text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center justify-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              <span>ابدأ كشركة (موردين وموزعين)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
