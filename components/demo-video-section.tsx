import React, { useState } from "react";
import { IconRenderer } from "@/assets/icons/iconRenderer";

const DEMO_VIDEO_ID = "Rgcvvkl5N5M";

export const DemoVideoSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="demo" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
            شاهد{" "}
            <span className="text-primary text-3xl sm:text-5xl font-black tracking-tight">
              Tredro
            </span>{" "}
            أثناء العمل
          </h2>
          <p className="text-sm sm:text-base font-bold text-muted-foreground">
            جولة سريعة توضح كيف تدير الشركة الطلبيات والمناديب والمخزون من
            مكان واحد.
          </p>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-border bg-muted shadow-2xl shadow-primary/10">
          {isPlaying ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${DEMO_VIDEO_ID}?autoplay=1&rel=0`}
              title="عرض توضيحي لمنصة Tredro"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              aria-label="تشغيل العرض التوضيحي"
              className="group absolute inset-0 h-full w-full cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.ytimg.com/vi/${DEMO_VIDEO_ID}/hqdefault.jpg`}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/20" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform duration-200 group-hover:scale-110">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-7 w-7 sm:h-9 sm:w-9 translate-x-0.5"
                    aria-hidden="true"
                  >
                    <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l11-6.86a1 1 0 0 0 0-1.7l-11-6.86A1 1 0 0 0 8 5.14z" />
                  </svg>
                </span>
              </span>
              <span className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-background/90 px-4 py-2 text-xs sm:text-sm font-bold text-foreground">
                <IconRenderer name="video_outlined" />
                العرض التوضيحي
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
