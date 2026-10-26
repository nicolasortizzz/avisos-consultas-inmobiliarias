import Link from "next/link";
import { auth } from "@/auth";

export async function Header() {
  const session = await auth();
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-sm font-semibold tracking-tight text-stone-900">
          Ortiz · Avisos y consultas
        </Link>
        <nav className="flex items-center gap-3 text-sm text-stone-600">
          <a href="#planes" className="hidden hover:text-stone-900 sm:inline">
            Planes
          </a>
          <a href="#garantia" className="hidden hover:text-stone-900 sm:inline">
            Garantía
          </a>
          <Link
            href="/reservar"
            className="rounded-full bg-stone-900 px-3.5 py-1.5 font-medium text-white hover:bg-stone-800"
          >
            Reservar llamada
          </Link>
          <Link href="/cuenta" className="hover:text-stone-900">
            {session?.user ? "Mi cuenta" : "Ingresar"}
          </Link>
        </nav>
      </div>
    </header>
  );
}
