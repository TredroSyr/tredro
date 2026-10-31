import React, { useState } from "react";
import { InstagramIcon, INSTAGRAM_URL } from "@/components/footer";

// Paste reel links as copied from Instagram ("Share" → "Copy link").
const REEL_URLS: string[] = [
  "https://www.instagram.com/p/DfHE3TMqeR8/",
  "https://www.instagram.com/p/DdrgI7mpQEX/",
  "https://www.instagram.com/p/DeT3hSyq_nH/",
  "https://www.instagram.com/p/Dd1tN1Lq97x/",
];

const getReelCode = (url: string) =>
  url.match(/instagram\.com\/(?:reel|reels|p)\/([\w-]+)/)?.[1] ?? null;

const ReelCard: React.FC<{ code: string; index: number }> = ({
  code,
  index,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative aspect-[9/16] w-[260px] sm:w-auto shrink-0 snap-center overflow-hidden rounded-3xl border border-border bg-muted shadow-xl">
      {isPlaying ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.instagram.com/p/${code}/embed/`}
          title={`ريل Tredro رقم ${index + 1}`}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          aria-label={`تشغيل الريل رقم ${index + 1}`}
          className="group absolute inset-0 flex h-full w-full cursor-pointer flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5] text-white"
        >
          <InstagramIcon className="absolute top-4 right-4 h-6 w-6 opacity-90" />
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform duration-200 group-hover:scale-110">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-7 w-7 translate-x-0.5"
              aria-hidden="true"
            >
              <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l11-6.86a1 1 0 0 0 0-1.7l-11-6.86A1 1 0 0 0 8 5.14z" />
            </svg>
          </span>
          <span className="text-sm font-bold">اضغط للمشاهدة</span>
        </button>
      )}
    </div>
  );
};

export const InstagramReelsSection: React.FC = () => {
  const codes = REEL_URLS.map(getReelCode).filter(
    (code): code is string => code !== null,
  );

  if (codes.length === 0) return null;

  return (
    <section id="reels" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
            Tredro على{" "}
            <span className="text-primary text-3xl sm:text-5xl font-black tracking-tight">
              إنستغرام
            </span>
          </h2>
          <p className="text-sm sm:text-base font-bold text-muted-foreground">
            مقاطع قصيرة من الميدان، نصائح للتوزيع، وأحدث ميزات المنصة.
          </p>
        </div>

        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-auto sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {codes.map((code, index) => (
            <ReelCard key={code} code={code} index={index} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-bold text-foreground transition-colors hover:bg-muted"
          >
            <InstagramIcon className="h-4 w-4" />
            تابعنا على إنستغرام @tredro_sy
          </a>
        </div>
      </div>
    </section>
  );
};
