import { WhatsAppIcon } from "./WhatsAppIcon";
import { WA_DEFAULT_TEXT, waLink } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  return (
    <a href={waLink(WA_DEFAULT_TEXT)} target="_blank" rel="noopener noreferrer" aria-label="Escribime por WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#1faa59] p-3.5 text-sm font-semibold text-white shadow-lift ring-4 ring-white/70 transition hover:-translate-y-0.5 hover:bg-[#178f4a] sm:px-5">
      <WhatsAppIcon className="h-6 w-6" />
      <span className="hidden sm:inline">¿Hablamos por WhatsApp?</span>
    </a>
  );
}
