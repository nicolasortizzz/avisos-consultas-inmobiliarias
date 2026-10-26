import Link from "next/link";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { WA_DEFAULT_TEXT, WA_DISPLAY, waLink, waPlanText } from "@/lib/whatsapp";

const planes = [
  {
    name: "Avisos",
    slug: "avisos",
    price: "180.000",
    pitch: "Para ordenar la cartera publicada.",
    items: ["Hasta ~40 avisos priorizados", "Datos completos y descripciones reescritas", "Reporte mensual"],
  },
  {
    name: "Completo",
    slug: "completo",
    price: "350.000",
    pitch: "Avisos al día y consultas contestadas a tiempo.",
    items: ["Hasta ~40 avisos", "Consultas en < 15 min · lun a sáb", "Seguimiento de interesados", "Reporte todos los lunes"],
    recommended: true,
  },
  {
    name: "Dedicado",
    slug: "dedicado",
    price: "550.000",
    pitch: "Para carteras grandes, toda la semana.",
    items: ["Hasta ~80 avisos", "Consultas en < 15 min · lun a dom", "Comparables de precios de la zona", "Reporte semanal"],
  },
];

const servicio = [
  { n: "01", t: "Avisos completos", d: "Expensas, m², ubicación, fotos y precio bien cargados en Argenprop y Zonaprop, con descripciones reescritas para que el aviso se entienda de un vistazo." },
  { n: "02", t: "Consultas a tiempo", d: "Respondo en menos de 15 minutos dentro del horario acordado, con respuestas tipo que ustedes aprueban. Lo que no está previsto pasa directo a su contacto." },
  { n: "03", t: "Reporte cada lunes", d: "Consultas recibidas, visitas coordinadas y cierres de la semana, en un resumen corto y claro para decidir rápido." },
];

const proceso = [
  ["Llamada de 20 min", "Miramos juntos un par de avisos y cómo manejan hoy las consultas."],
  ["Semana 1", "Corrijo los avisos prioritarios y armamos las respuestas tipo."],
  ["Semanas 1 a 4", "Respuesta en menos de 15 min en el horario; reporte todos los lunes."],
  ["Día 21", "Reunión de resultados contra la línea de base del inicio."],
];

const faqs = [
  ["¿Garantizás alquileres cerrados?", "No. Me comprometo con lo que depende de mí: plazos de avisos, tiempo de respuesta y reporte. Si en los primeros 30 días no cumplo esos plazos, te devuelvo el 100% de ese mes."],
  ["¿Usás IA para responder?", "Uso IA para redactar sobre las respuestas tipo que ustedes aprueban, y reviso cada mensaje antes de enviarlo. Lo no previsto se deriva a la inmobiliaria."],
  ["¿Qué zonas cubrís?", "Núñez, Belgrano, Saavedra, San Isidro y Martínez."],
  ["¿Cómo se paga?", "Abono mensual por Mercado Pago o transferencia. Sin permanencia mínima."],
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-forest-100/60 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl gap-14 px-6 pb-20 pt-16 sm:pt-24 lg:grid-cols-[1.25fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow">Para inmobiliarias de Núñez a Martínez</p>
            <h1 className="mt-5 font-display text-[2.6rem] font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl">
              Avisos bien hechos.<br />
              <span className="italic text-forest-700">Consultas contestadas a tiempo.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              Me ocupo de tus avisos de alquiler y de responder cada consulta en menos de 15 minutos,
              para que tu equipo se dedique a mostrar y cerrar.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/reservar" className="btn-primary px-7 py-4 text-base">Reservar llamada de 20 min</Link>
              <a href={waLink(WA_DEFAULT_TEXT)} target="_blank" rel="noopener noreferrer" className="btn-secondary px-7 py-4 text-base">
                <WhatsAppIcon className="h-5 w-5 text-[#1faa59]" /> Escribime al {WA_DISPLAY}
              </a>
            </div>
            <p className="mt-5 text-sm text-ink-mute">Sin compromiso · Te respondo en el día</p>
          </div>

          <div className="card relative p-7 shadow-lift">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-mute">Relevamiento Argenprop · 19/10/2026</p>
            <p className="mt-4 font-display text-6xl font-medium text-ink">~50%</p>
            <p className="mt-2 text-ink-soft">de 358 avisos de la zona sin m², sin expensas o con menos de 10 fotos.</p>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-ivory-200"><div className="h-full w-1/2 rounded-full bg-clay-500" /></div>
            <div className="mt-7 grid grid-cols-2 gap-4 border-t border-ink/10 pt-6">
              <div><p className="font-display text-3xl text-ink">&lt; 15 min</p><p className="text-sm text-ink-mute">respuesta en horario</p></div>
              <div><p className="font-display text-3xl text-ink">Lunes</p><p className="text-sm text-ink-mute">reporte semanal</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="border-y border-ink/10 bg-white">
        <div className="mx-auto grid max-w-6xl divide-y divide-ink/10 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            ["358", "avisos relevados en la zona"],
            ["5", "barrios: Núñez a Martínez"],
            ["30 días", "devolución si no cumplo plazos"],
          ].map(([v, l]) => (
            <div key={l} className="py-8 sm:px-8 first:sm:pl-0">
              <p className="font-display text-4xl text-forest-800">{v}</p>
              <p className="mt-1 text-sm text-ink-soft">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Servicio */}
      <section id="servicio" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
        <div className="max-w-2xl">
          <p className="eyebrow">Qué incluye</p>
          <h2 className="h2 mt-4">Lo que hace que un interesado termine en visita.</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {servicio.map((s) => (
            <div key={s.n} className="card p-8 transition hover:-translate-y-0.5 hover:shadow-lift">
              <p className="font-display text-sm text-clay-600">{s.n}</p>
              <h3 className="mt-6 text-xl font-semibold text-ink">{s.t}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Proceso */}
      <section id="proceso" className="scroll-mt-24 bg-forest-900 text-ivory">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-clay-50/70">Cómo trabajamos</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-medium tracking-tight sm:text-[2.6rem] sm:leading-[1.1]">Un primer mes claro, con resultados medibles.</h2>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {proceso.map(([t, d], i) => (
              <li key={t} className="bg-forest-900 p-7">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 font-display text-sm">{i + 1}</span>
                <p className="mt-6 font-semibold">{t}</p>
                <p className="mt-2 text-sm leading-relaxed text-ivory/70">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Planes */}
      <section id="planes" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Planes mensuales</p>
          <h2 className="h2 mt-4">Elegí el nivel de apoyo que necesitás.</h2>
          <p className="mt-4 text-ink-soft">Precios en pesos, por mes. Sin permanencia mínima.</p>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {planes.map((p) => (
            <div key={p.slug} className={`relative flex flex-col rounded-2xl border p-8 ${p.recommended ? "border-forest-800 bg-white shadow-lift ring-1 ring-forest-800 lg:-my-4 lg:py-12" : "border-ink/10 bg-white/70 shadow-soft"}`}>
              {p.recommended ? (
                <span className="absolute -top-3 left-8 rounded-full bg-clay-500 px-3 py-1 text-xs font-semibold text-white">Más elegido</span>
              ) : null}
              <h3 className="font-display text-2xl text-ink">{p.name}</h3>
              <p className="mt-2 text-sm text-ink-soft">{p.pitch}</p>
              <p className="mt-6 flex items-baseline gap-1.5">
                <span className="text-sm text-ink-mute">ARS</span>
                <span className="font-display text-5xl font-medium tracking-tight text-ink">{p.price}</span>
                <span className="text-sm text-ink-mute">/ mes</span>
              </p>
              <ul className="mt-7 space-y-3 border-t border-ink/10 pt-7 text-[15px] text-ink-soft">
                {p.items.map((it) => (
                  <li key={it} className="flex gap-3">
                    <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 flex-none text-forest-600" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.58l7.3-7.3a1 1 0 0 1 1.4 0Z" clipRule="evenodd" /></svg>
                    {it}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-2.5 pt-9">
                <Link href={`/reservar?plan=${p.slug}`} className={p.recommended ? "btn-primary" : "btn-secondary"}>Reservar llamada</Link>
                <a href={waLink(waPlanText(p.name))} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-ink-soft hover:text-[#178f4a]">
                  <WhatsAppIcon className="h-4 w-4 text-[#1faa59]" /> Consultar por WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-12 text-center text-sm text-ink-mute">
          Programa fundadoras: 3 cupos con el primer mes al 50%. Pago por Mercado Pago o transferencia.
        </p>
      </section>

      {/* FAQ */}
      <section id="preguntas" className="scroll-mt-24 border-t border-ink/10 bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="eyebrow">Preguntas frecuentes</p>
            <h2 className="h2 mt-4">Lo que suelen preguntarme.</h2>
            <p className="mt-4 text-ink-soft">¿Otra duda? <a className="font-medium text-forest-700 underline underline-offset-4" href={waLink(WA_DEFAULT_TEXT)} target="_blank" rel="noopener noreferrer">Escribime por WhatsApp</a>.</p>
          </div>
          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {faqs.map(([q, a]) => (
              <details key={q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium text-ink">
                  {q}
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-ink/15 text-ink-soft transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="relative overflow-hidden rounded-3xl bg-forest-800 px-8 py-16 text-center text-white sm:px-16">
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-forest-600/40 blur-3xl" />
          <h2 className="relative font-display text-3xl font-medium tracking-tight sm:text-5xl">Empecemos con una llamada corta.</h2>
          <p className="relative mx-auto mt-5 max-w-xl text-lg text-ivory/75">20 minutos de diagnóstico, sin compromiso. Reservás en menos de un minuto.</p>
          <div className="relative mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/reservar" className="btn bg-white px-7 py-4 text-base text-forest-900 hover:bg-ivory">Reservar llamada</Link>
            <a href={waLink(WA_DEFAULT_TEXT)} target="_blank" rel="noopener noreferrer" className="btn-wa px-7 py-4 text-base">
              <WhatsAppIcon className="h-5 w-5" /> WhatsApp {WA_DISPLAY}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
