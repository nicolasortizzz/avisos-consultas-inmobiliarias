import Link from "next/link";
import { auth } from "@/auth";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { WA_DEFAULT_TEXT, waLink } from "@/lib/whatsapp";

export async function Header() {
  const session = await auth();
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="text-sm font-semibold tracking-tight text-stone-900">
          Ortiz <span className="text-emerald-700">·</span> Avisos y consultas
        </Link>
        <nav className="flex items-center gap-2 text-sm text-stone-600 sm:gap-4">
          <Link href="/#planes" className="hidden hover:text-stone-900 md:inline">Planes</Link>
          <Link href="/#garantia" className="hidden hover:text-stone-900 md:inline">Garantía</Link>
          <Link href="/cuenta" className="hidden hover:text-stone-900 sm:inline">
            {session?.user ? "Mi cuenta" : "Ingresar"}
          </Link>
          <a
            href={waLink(WA_DEFAULT_TEXT)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600 px-3 py-1.5 font-medium text-emerald-700 hover:bg-emerald-50"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
          <Link
            href="/reservar"
            className="rounded-full bg-stone-900 px-3.5 py-1.5 font-medium text-white hover:bg-stone-800"
          >
            Reservar llamada
          </Link>
        </nav>
      </div>
    </header>
  );
}
