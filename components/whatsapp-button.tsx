import { WhatsappFilled } from "@/assets/icons/whatsapp_filled";

const WHATSAPP_NUMBER = (
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+963939537334"
).replace(/\D/g, "");
const WHATSAPP_MESSAGE = "مرحباً، أرغب بالاستفسار عن منصة Tredro";

export function WhatsappButton() {
  if (!WHATSAPP_NUMBER) return null;

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل معنا عبر واتساب"
      className="group fixed bottom-4 end-4 z-40 flex h-14 items-center justify-center rounded-full bg-[#25D366] px-3 text-white shadow-lg transition-all hover:bg-[#1ebe5a] hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:bottom-6 sm:inset-e-6"
    >
      <WhatsappFilled className="size-8 shrink-0" aria-hidden="true" />
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-200 group-hover:ms-2 group-hover:me-1 group-hover:max-w-40 group-hover:opacity-100 group-focus-visible:ms-2 group-focus-visible:me-1 group-focus-visible:max-w-40 group-focus-visible:opacity-100 sm:inline">
        تواصل معنا
      </span>
    </a>
  );
}
