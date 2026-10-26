import { auth } from "@/auth";
import { ReservaForm } from "@/components/ReservaForm";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { WA_DEFAULT_TEXT, WA_DISPLAY, waLink } from "@/lib/whatsapp";

export const metadata = { title: "Reservar llamada | Nicolás Ortiz · Avisos y consultas" };

const validPlans = ["dedicado", "completo", "avisos"];

export default async function ReservarPage({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  let session = null;
  try { session = await auth(); } catch {}
  const { plan } = await searchParams;
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:py-20 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
      <div className="lg:pt-6">
        <p className="eyebrow">Llamada de diagnóstico · 20 min</p>
        <h1 className="mt-5 font-display text-4xl font-medium leading-[1.08] tracking-tight text-ink sm:text-5xl">Charlemos 20 minutos.</h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-soft">
          Miramos juntos un par de tus avisos y cómo manejan hoy las consultas. Vemos si el servicio te sirve, sin compromiso.
        </p>
        <ul className="mt-9 space-y-5">
          {[
            ["Sin costo ni compromiso", "Es una charla para entender tu cartera."],
            ["Te confirmo por WhatsApp", "Te escribo para cerrar día y hora."],
            ["Menos de un minuto", "Solo nombre, WhatsApp y franja horaria."],
          ].map(([t, d]) => (
            <li key={t} className="flex gap-4">
              <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-forest-100 text-forest-700">
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.58l7.3-7.3a1 1 0 0 1 1.4 0Z" clipRule="evenodd" /></svg>
              </span>
              <div><p className="font-semibold text-ink">{t}</p><p className="text-sm text-ink-soft">{d}</p></div>
            </li>
          ))}
        </ul>
        <a href={waLink(WA_DEFAULT_TEXT)} target="_blank" rel="noopener noreferrer"
          className="mt-10 flex items-center gap-4 rounded-2xl border border-ink/10 bg-white/70 p-5 transition hover:border-[#1faa59]/50">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1faa59]/10 text-[#1faa59]"><WhatsAppIcon className="h-6 w-6" /></span>
          <span><span className="block text-sm text-ink-mute">¿Preferís escribirme directo?</span><span className="block font-semibold text-ink">WhatsApp {WA_DISPLAY}</span></span>
        </a>
      </div>
      <ReservaForm
        defaultName={session?.user?.name || ""}
        defaultEmail={session?.user?.email || ""}
        defaultPlan={plan && validPlans.includes(plan) ? plan : ""}
      />
    </div>
  );
}
