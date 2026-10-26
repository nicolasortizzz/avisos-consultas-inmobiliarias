import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Header } from "@/components/Header";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { WA_DISPLAY, WA_DEFAULT_TEXT, waLink } from "@/lib/whatsapp";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Fraunces({ subsets: ["latin"], variable: "--font-display", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Avisos y consultas de alquiler para inmobiliarias | Nicolás Ortiz",
  description:
    "Avisos completos, respuesta a consultas en menos de 15 minutos y reporte semanal para inmobiliarias de Núñez a Martínez.",
  openGraph: {
    title: "Avisos y consultas de alquiler para inmobiliarias",
    description: "Servicio mensual: avisos bien hechos, consultas a tiempo y reporte semanal. WhatsApp 11 2591-0795.",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${sans.variable} ${display.variable}`}>
      <body className="min-h-screen bg-ivory font-sans text-ink antialiased">
        <Header />
        <main>{children}</main>
        <footer className="border-t border-ink/10 bg-ivory-100">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 pb-28 pt-14 sm:grid-cols-3">
            <div>
              <p className="font-display text-lg text-ink">Nicolás Ortiz</p>
              <p className="mt-1 text-sm text-ink-soft">Avisos y consultas para inmobiliarias · Lic. en Economía (UBA)</p>
            </div>
            <div className="text-sm text-ink-soft">
              <p className="font-semibold text-ink">Zonas</p>
              <p className="mt-1">Núñez · Belgrano · Saavedra · San Isidro · Martínez</p>
            </div>
            <div className="text-sm text-ink-soft sm:text-right">
              <p className="font-semibold text-ink">Contacto</p>
              <a className="mt-1 block hover:text-forest-700" href={waLink(WA_DEFAULT_TEXT)} target="_blank" rel="noopener noreferrer">WhatsApp {WA_DISPLAY}</a>
              <Link className="block hover:text-forest-700" href="/reservar">Reservar llamada</Link>
            </div>
          </div>
        </footer>
        <WhatsAppFloat />
      </body>
    </html>
  );
}
