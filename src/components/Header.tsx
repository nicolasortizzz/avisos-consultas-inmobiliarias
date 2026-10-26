import Link from "next/link";
import { auth } from "@/auth";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { WA_DEFAULT_TEXT, WA_DISPLAY, waLink } from "@/lib/whatsapp";

export async function Header() {
  let signedIn = false;
  try {
    signedIn = Boolean((await auth())?.user);
  } catch {}
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-ivory/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-forest-800 font-display text-lg text-ivory">N</span>
          <span className="leading-tight">
            <span className="block text-[15px] font-semibold text-ink">Nicolás Ortiz</span>
            <span className="block text-xs text-ink-mute">Avisos y consultas</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm text-ink-soft sm:gap-2">
          <Link href="/#servicio" className="hidden rounded-full px-3 py-2 hover:text-ink lg:inline">Servicio</Link>
          <Link href="/#proceso" className="hidden rounded-full px-3 py-2 hover:text-ink lg:inline">Proceso</Link>
          <Link href="/#socios" className="hidden rounded-full px-3 py-2 hover:text-ink lg:inline">Socios</Link>
          <Link href="/#planes" className="hidden rounded-full px-3 py-2 hover:text-ink md:inline">Planes</Link>
          <Link href="/#preguntas" className="hidden rounded-full px-3 py-2 hover:text-ink lg:inline">Preguntas</Link>
          <Link href="/cuenta" className="hidden rounded-full px-3 py-2 hover:text-ink md:inline">{signedIn ? "Mi cuenta" : "Ingresar"}</Link>
          <a href={waLink(WA_DEFAULT_TEXT)} target="_blank" rel="noopener noreferrer"
            className="ml-1 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-3.5 py-2 font-medium text-ink hover:border-[#1faa59] hover:text-[#178f4a]">
            <WhatsAppIcon className="h-4 w-4 text-[#1faa59]" />
            <span className="hidden sm:inline">{WA_DISPLAY}</span>
          </a>
          <Link href="/reservar" className="rounded-full bg-forest-800 px-4 py-2 font-semibold text-white hover:bg-forest-900">
            Reservar llamada
          </Link>
        </nav>
      </div>
    </header>
  );
}
