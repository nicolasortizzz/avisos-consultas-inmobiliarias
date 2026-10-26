import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Avisos y consultas de alquiler para inmobiliarias | Nicolás Ortiz",
  description:
    "Avisos completos, respuesta a consultas en menos de 15 minutos y reporte semanal para inmobiliarias de Núñez, Belgrano, Saavedra, San Isidro y Martínez.",
  openGraph: {
    title: "Avisos y consultas de alquiler para inmobiliarias",
    description:
      "Servicio mensual: avisos bien hechos, consultas a tiempo y reporte semanal. WhatsApp 11 2591-0795.",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR">
      <body className="min-h-screen antialiased">
        <Header />
        <main>{children}</main>
        <footer className="border-t border-stone-200 bg-white">
          <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between">
            <p>Nicolás Ortiz · Lic. en Economía (UBA)</p>
            <a className="hover:text-stone-800" href="https://wa.me/5491125910795">
              WhatsApp 11 2591-0795
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
