import Link from "next/link";

const planes = [
  {
    name: "Dedicado",
    price: "ARS 550.000",
    detail: "Hasta ~80 avisos · lun–dom · reporte · comparables de zona",
  },
  {
    name: "Completo",
    price: "ARS 350.000",
    detail: "Hasta ~40 avisos · lun–sáb · seguimiento · reporte semanal",
    recommended: true,
  },
  {
    name: "Avisos",
    price: "ARS 180.000",
    detail: "Hasta ~40 avisos priorizados · reporte mensual",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="mx-auto max-w-5xl px-4 pb-16 pt-14">
        <p className="text-sm font-medium uppercase tracking-wide text-stone-500">
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
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/reservar"
            className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-stone-800"
          >
            Reservar llamada de 20 min
          </Link>
          <a
            href="https://wa.me/5491125910795"
            className="rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-stone-800 hover:bg-stone-50"
          >
            WhatsApp 11 2591-0795
          </a>
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
        <h2 className="text-2xl font-semibold text-stone-900">Qué incluye</h2>
        <ul className="mt-6 space-y-3 text-stone-700">
          <li className="rounded-2xl border border-stone-200 bg-white p-4">
            <strong className="text-stone-900">Mejora de avisos.</strong> Datos
            completos (expensas, m², ubicación, fotos, precio) y descripciones
            reescritas.
          </li>
          <li className="rounded-2xl border border-stone-200 bg-white p-4">
            <strong className="text-stone-900">Consultas rápidas.</strong> Menos
            de 15 minutos en horario fijo, con respuestas tipo que ustedes
            aprueban. Uso IA para redactar sobre esas plantillas y reviso cada
            una; lo no previsto se deriva a la inmobiliaria.
          </li>
          <li className="rounded-2xl border border-stone-200 bg-white p-4">
            <strong className="text-stone-900">Reporte semanal.</strong> Consultas,
            visitas y cierres, todos los lunes.
          </li>
        </ul>
      </section>

      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-14">
          <h2 className="text-2xl font-semibold text-stone-900">Cómo trabajo</h2>
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
        <h2 className="text-2xl font-semibold text-stone-900">Planes</h2>
        <p className="mt-2 text-stone-600">
          Tres opciones mensuales. La recomendada es Completo.
        </p>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {planes.map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl border p-5 ${
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
          <h2 className="text-2xl font-semibold text-stone-900">Garantía</h2>
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
            20 minutos de diagnóstico. Si preferís, ingresá con Google para
            guardar tu pedido en tu cuenta.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/reservar"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-stone-900 hover:bg-stone-100"
            >
              Reservar
            </Link>
            <Link
              href="/cuenta"
              className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10"
            >
              Ingresar
            </Link>
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
