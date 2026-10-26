import Link from "next/link";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { WA_DEFAULT_TEXT, WA_DISPLAY, waLink, waPlanText } from "@/lib/whatsapp";

const planes = [
  {
    name: "Dedicado",
    slug: "dedicado",
    price: "ARS 550.000",
    detail: "Hasta ~80 avisos · lun–dom · reporte · comparables de zona",
  },
  {
    name: "Completo",
    slug: "completo",
    price: "ARS 350.000",
    detail: "Hasta ~40 avisos · lun–sáb · seguimiento · reporte semanal",
    recommended: true,
  },
  {
    name: "Avisos",
    slug: "avisos",
    price: "ARS 180.000",
    detail: "Hasta ~40 avisos priorizados · reporte mensual",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-emerald-50/60 to-transparent">
      <div className="mx-auto max-w-5xl px-4 pb-16 pt-16 sm:pt-20">
        <p className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-emerald-800 ring-1 ring-emerald-200">
          Núñez · Belgrano · Saavedra · San Isidro · Martínez
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
          Avisos bien hechos y consultas contestadas a tiempo
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-stone-600">
          Servicio mensual para inmobiliarias: completo los avisos de alquiler en
          Argenprop y Zonaprop, respondo consultas en menos de 15 minutos en un
          horario fijo, y te mando un reporte cada lunes.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/reservar"
            className="rounded-full bg-stone-900 px-6 py-3.5 text-center text-base font-semibold text-white shadow-sm hover:bg-stone-800"
          >
            Reservar llamada de 20 min →
          </Link>
          <a
            href={waLink(WA_DEFAULT_TEXT)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-[#1ebe5b]"
          >
            <WhatsAppIcon /> Escribime al {WA_DISPLAY}
          </a>
        </div>
        <p className="mt-4 text-sm text-stone-500">Sin compromiso · Te respondo en el día</p>
      </div>
      </section>

      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 py-14 sm:grid-cols-3">
          <Stat value="358" label="avisos relevados en Argenprop (19/10/2026)" />
          <Stat value="~50%" label="sin m², sin expensas o con menos de 10 fotos" />
          <Stat value="< 15 min" label="respuesta en el horario acordado" />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14">
        <h2 className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">Qué incluye</h2>
        <ul className="mt-6 grid gap-4 text-stone-700 sm:grid-cols-3">
          <li className="rounded-2xl border border-stone-200 bg-white p-5 leading-relaxed shadow-sm">
            <strong className="text-stone-900">Mejora de avisos.</strong> Datos
            completos (expensas, m², ubicación, fotos, precio) y descripciones
            reescritas.
          </li>
          <li className="rounded-2xl border border-stone-200 bg-white p-5 leading-relaxed shadow-sm">
            <strong className="text-stone-900">Consultas rápidas.</strong> Menos
            de 15 minutos en horario fijo, con respuestas tipo que ustedes
            aprueban. Uso IA para redactar sobre esas plantillas y reviso cada
            una; lo no previsto se deriva a la inmobiliaria.
          </li>
          <li className="rounded-2xl border border-stone-200 bg-white p-5 leading-relaxed shadow-sm">
            <strong className="text-stone-900">Reporte semanal.</strong> Consultas,
            visitas y cierres, todos los lunes.
          </li>
        </ul>
      </section>

      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-14">
          <h2 className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">Cómo trabajo</h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              ["Semana 1", "Corrijo avisos priorizados y armo las respuestas tipo con ustedes."],
              ["Semanas 1–4", "Respuesta en < 15 min en el horario; lo no previsto pasa a su contacto."],
              ["Todos los lunes", "Reporte de consultas, visitas y cierres."],
              ["Día 21", "Reunión de resultados contra la línea de base del inicio."],
            ].map(([t, d]) => (
              <li key={t} className="rounded-2xl border border-stone-200 p-4">
                <p className="font-medium text-stone-900">{t}</p>
                <p className="mt-1 text-sm text-stone-600">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="planes" className="mx-auto max-w-5xl px-4 py-14">
        <h2 className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">Planes</h2>
        <p className="mt-2 text-stone-600">
          Tres opciones mensuales. La recomendada es Completo.
        </p>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {planes.map((p) => (
            <div
              key={p.name}
              className={`flex flex-col rounded-2xl border p-6 shadow-sm ${
                p.recommended
                  ? "border-stone-900 bg-stone-900 text-white"
                  : "border-stone-200 bg-white text-stone-900"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                {p.recommended ? (
                  <span className="rounded-full bg-white/15 px-2 py-0.5 text-xs">
                    Recomendado
                  </span>
                ) : null}
              </div>
              <p className={`mt-3 text-2xl font-semibold ${p.recommended ? "text-white" : ""}`}>
                {p.price}
                <span className={`text-sm font-normal ${p.recommended ? "text-stone-300" : "text-stone-500"}`}>
                  {" "}/ mes
                </span>
              </p>
              <p className={`mt-3 text-sm ${p.recommended ? "text-stone-300" : "text-stone-600"}`}>
                {p.detail}
              </p>
              <div className="mt-6 flex flex-col gap-2 pt-2 sm:mt-auto">
                <Link
                  href={`/reservar?plan=${p.slug}`}
                  className={`rounded-full px-4 py-2.5 text-center text-sm font-semibold ${
                    p.recommended ? "bg-white text-stone-900 hover:bg-stone-100" : "bg-stone-900 text-white hover:bg-stone-800"
                  }`}
                >
                  Reservar llamada
                </Link>
                <a
                  href={waLink(waPlanText(p.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-1.5 rounded-full border px-4 py-2.5 text-sm font-medium ${
                    p.recommended ? "border-white/30 text-white hover:bg-white/10" : "border-emerald-600 text-emerald-700 hover:bg-emerald-50"
                  }`}
                >
                  <WhatsAppIcon className="h-4 w-4" /> Consultar por WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-stone-500">
          Programa fundadoras: 3 cupos, primer mes al 50%. Cobro por Mercado Pago
          o transferencia.
        </p>
      </section>

      <section id="garantia" className="border-y border-stone-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-14">
          <h2 className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">Garantía</h2>
          <p className="mt-4 max-w-3xl text-stone-700">
            Si en los primeros 30 días no cumplo los plazos de avisos, el 90% de
            las consultas del horario a tiempo o el reporte de todos los lunes,
            devuelvo el 100% de ese mes. La garantía es sobre tiempos, entregas y
            reporte — nunca sobre alquileres cerrados.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14">
        <div className="rounded-3xl bg-stone-900 px-6 py-10 text-white sm:px-10">
          <h2 className="text-2xl font-semibold">Empezá con una llamada corta</h2>
          <p className="mt-3 max-w-2xl text-stone-300">
            20 minutos de diagnóstico, sin compromiso. Reservá en menos de un
            minuto o escribime directo por WhatsApp.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/reservar"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-stone-900 hover:bg-stone-100"
            >
              Reservar llamada
            </Link>
            <a
              href={waLink(WA_DEFAULT_TEXT)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1ebe5b]"
            >
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp {WA_DISPLAY}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-3xl font-semibold tracking-tight text-stone-900">{value}</p>
      <p className="mt-1 text-sm text-stone-600">{label}</p>
    </div>
  );
}
