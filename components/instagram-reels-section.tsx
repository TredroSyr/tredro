import React, { useRef, useState } from "react";
import Image from "next/image";
import { InstagramIcon, INSTAGRAM_URL } from "@/components/footer";

type Reel = {
  code: string;
  title: string;
  // Optional self-hosted clip, e.g. "/reels/<code>.mp4". Without it the card
  // opens the reel on Instagram instead of playing inline.
  video?: string;
};

// Thumbnails live in public/reels/<code>.jpg.
const REELS: Reel[] = [
  { code: "DfHE3TMqeR8", title: "مندوبك هلّق وين؟ Tredro بيقلّك بالضبط" },
  { code: "DdrgI7mpQEX", title: "من الورقة والقلم إلى طلبية ذكية" },
  { code: "DeT3hSyq_nH", title: "المرتجع من الزبون لحد مستودع الشركة" },
  { code: "Dd1tN1Lq97x", title: "المندوب بيطلب البضاعة من جواله" },
];

const CARD_TILTS = ["-rotate-2", "rotate-[1.5deg]", "-rotate-1", "rotate-2"];
const TAPE_TILTS = ["-rotate-3", "rotate-2", "-rotate-2", "rotate-3"];

const reelUrl = (code: string) => `https://www.instagram.com/p/${code}/`;

const PlayIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5 translate-x-0.5"
    aria-hidden="true"
  >
    <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l11-6.86a1 1 0 0 0 0-1.7l-11-6.86A1 1 0 0 0 8 5.14z" />
  </svg>
);

const ReelCard: React.FC<{
  reel: Reel;
  index: number;
  // Copy used only to make the mobile marquee loop seamlessly.
  duplicate?: boolean;
}> = ({ reel, index, duplicate = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const poster = `/reels/${reel.code}.jpg`;

  const play = () => {
    videoRef.current?.play().then(() => setIsPlaying(true), () => {});
  };
  const pause = () => {
    videoRef.current?.pause();
    setIsPlaying(false);
  };

  const media = (
    <>
      {reel.video ? (
        <video
          ref={videoRef}
          src={reel.video}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <Image
          src={poster}
          alt=""
          fill
          sizes="(min-width: 1024px) 260px, 66vw"
          className="object-cover"
        />
      )}
      <span
        className={`absolute inset-0 grid place-items-center transition-opacity duration-200 ${
          isPlaying ? "opacity-0" : "opacity-100"
        }`}
      >
        <span className="grid h-12 w-12 place-items-center rounded-full bg-white/90 text-neutral-900 shadow-lg transition-transform duration-200 group-hover:scale-110">
          <PlayIcon />
        </span>
      </span>
      <span className="absolute bottom-2.5 left-2.5 rounded bg-black/70 px-2 py-1 font-mono text-[11px] tracking-wider text-white">
        INSTAGRAM
      </span>
    </>
  );

  const mediaClass =
    "group relative block aspect-[9/16] w-full cursor-pointer overflow-hidden bg-neutral-900";

  return (
    <li
      aria-hidden={duplicate || undefined}
      inert={duplicate || undefined}
      className={`relative w-[66vw] max-w-[260px] shrink-0 bg-card p-2.5 pb-4 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:rotate-0 motion-reduce:rotate-0 motion-reduce:transition-none lg:w-auto lg:max-w-none ${
        duplicate ? "motion-reduce:hidden lg:hidden" : ""
      } ${CARD_TILTS[index % CARD_TILTS.length]}`}
    >
      <span
        aria-hidden="true"
        className={`absolute -top-3 left-1/2 z-10 h-6 w-24 -translate-x-1/2 bg-yellow-200/80 shadow-sm ${
          TAPE_TILTS[index % TAPE_TILTS.length]
        }`}
      />

      {reel.video ? (
        <button
          type="button"
          aria-label={`تشغيل: ${reel.title}`}
          onMouseEnter={play}
          onMouseLeave={pause}
          onClick={() => (isPlaying ? pause() : play())}
          className={mediaClass}
        >
          {media}
        </button>
      ) : (
        <a
          href={reelUrl(reel.code)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`شاهد على إنستغرام: ${reel.title}`}
          className={mediaClass}
        >
          {media}
        </a>
      )}

      <div className="px-0.5 pt-3">
        <p className="text-sm sm:text-base font-black leading-snug text-card-foreground">
          {reel.title}
        </p>
        <a
          href={reelUrl(reel.code)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
        >
          شاهد على إنستغرام ←
        </a>
      </div>
    </li>
  );
};

export const InstagramReelsSection: React.FC = () => {
  if (REELS.length === 0) return null;

  return (
    <section id="reels" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
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

        {/* Below lg the list is rendered twice and drifts slowly as a
            seamless marquee (pauses on touch/hover). Reduced-motion users get
            a plain swipeable row instead. */}
        <div className="-mx-4 overflow-hidden motion-reduce:overflow-x-auto motion-reduce:[scrollbar-width:none] motion-reduce:[&::-webkit-scrollbar]:hidden lg:mx-0 lg:overflow-visible">
          <ul className="flex w-max gap-6 pe-6 pt-4 pb-8 animate-reels-marquee hover:[animation-play-state:paused] active:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:ps-6 lg:grid lg:w-auto lg:animate-none lg:grid-cols-4 lg:gap-8 lg:pe-0">
            {REELS.map((reel, index) => (
              <ReelCard key={reel.code} reel={reel} index={index} />
            ))}
            {REELS.map((reel, index) => (
              <ReelCard
                key={`${reel.code}-dup`}
                reel={reel}
                index={index}
                duplicate
              />
            ))}
          </ul>
        </div>

        <div className="mt-6 flex justify-center">
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
