import { WhatsAppIcon } from "./WhatsAppIcon";
import { WA_DEFAULT_TEXT, waLink } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  return (
    <a
      href={waLink(WA_DEFAULT_TEXT)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribime por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition hover:scale-105 hover:bg-[#1ebe5b]"
    >
      <WhatsAppIcon className="h-6 w-6" />
      <span className="hidden sm:inline">Escribime por WhatsApp</span>
    </a>
  );
}
