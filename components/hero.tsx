import { IconRenderer } from "@/assets/icons/iconRenderer";
import { Button } from "@/components/ui/button";
import { AppWorkspaceMockup } from "./app-workspace-mockup";
import Image from "next/image";

export const HeroSection = () => {
  const handleCta = () => {
    window.open("https://dashboard.tredro.online/", "_blank", "noopener,noreferrer");
  };

  const handleScrollToBrain = () => {
    document.querySelector("#brain")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent pointer-events-none -z-10 blur-3xl" />
      <section className="relative pt-6 sm:pt-10 pb-16 sm:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className=" space-y-3 sm:space-y-4 mb-8 sm:mb-10 w-full text-center">
            <h1 className=" font-black tracking-tight text-foreground leading-[1.18]">
              منصة{" "}
              <span className="text-primary text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.18]">
                Tredro
              </span>{" "}
              لتوزيع الجملة وإدارة المناديب والمخزون
            </h1>
            <p className=" text-muted-foreground tracking-tight leading-snug">
              منصة ذكية واحدة تربط الشركة، مناديب المبيعات الميدانية، ومحلات
              السوبرماركت في دورة عمل متكاملة.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row  justify-center items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
            <Button
              onClick={handleCta}
              className="p-6  flex justify-center   items-center rounded-3xl active:scale-95 transition-all duration-200   group"
            >
              <span>ابدأ تجربة Tredro مجاناً</span>
              <IconRenderer name="arrow-up-right" />
            </Button>
          </div>

          <AppWorkspaceMockup />
        </div>
      </section>
    </>
  );
};
