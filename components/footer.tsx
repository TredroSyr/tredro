const Footer = () => {
  return (
    <footer className="bg-primary  border-t border-border py-4 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 ">
          <div className="flex items-center gap-2">
            <span>صُممت منصة Tredro بعناية لتطوير كفاءة التوزيع والمبيعات الميدانية</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-300">
              الشروط والأحكام
            </a>
            <a href="#" className="hover:text-slate-300">
              سياسة الخصوصية
            </a>
            <a href="#" className="hover:text-slate-300">
              أمان البيانات
            </a>
            <span>
              © {new Date().getFullYear()} منصة Tredro. جميع الحقوق محفوظة.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
