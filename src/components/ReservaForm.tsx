"use client";

import { FormEvent, useState } from "react";
import { planOptions, slotOptions, zonaOptions } from "@/lib/reserva-schema";
import { WA_DISPLAY, waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppIcon";

type Props = { defaultName?: string; defaultEmail?: string; defaultPlan?: string };

const FALLBACK = `No pudimos registrar el pedido. Probá de nuevo o escribime por WhatsApp al ${WA_DISPLAY}.`;

export function ReservaForm({ defaultName = "", defaultEmail = "", defaultPlan = "" }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [slot, setSlot] = useState("");
  const [plan, setPlan] = useState(defaultPlan);
  const [summary, setSummary] = useState("Hola Nicolás, quiero coordinar una llamada de 20 min.");
  const [showMore, setShowMore] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.set("slot", slot);
    fd.set("plan", plan);
    const payload = Object.fromEntries(fd.entries()) as Record<string, string>;

    const fe: Record<string, string> = {};
    if ((payload.name || "").trim().length < 2) fe.name = "Escribí tu nombre.";
    if ((payload.phone || "").replace(/\D/g, "").length < 8) fe.phone = "Dejame un WhatsApp válido (ej. 11 2345-6789).";
    if (!slot) fe.slot = "Elegí una franja para la llamada.";
    setFieldErrors(fe);
    if (Object.keys(fe).length) { setStatus("error"); setError(""); return; }

    setStatus("loading");
    setError("");
    const slotLabel = slotOptions.find((s) => s.value === slot)?.label ?? slot;
    const planLabel = planOptions.find((p) => p.value === plan)?.label;
    setSummary(
      [
        `Hola Nicolás, soy ${payload.name}${payload.agency ? ` de ${payload.agency}` : ""}.`,
        `Pedí una llamada de 20 min (franja: ${slotLabel}).`,
        plan ? `Me interesa el plan ${planLabel}.` : "",
      ].filter(Boolean).join(" ")
    );

    try {
      const res = await fetch("/api/reservas", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        const srv: Record<string, string> = {};
        for (const [k, v] of Object.entries((json.fieldErrors || {}) as Record<string, string[]>)) if (v?.[0]) srv[k] = v[0];
        setFieldErrors(srv);
        setStatus("error");
        setError(Object.keys(srv).length ? "Revisá los campos marcados." : json.formErrors?.join(" ") || FALLBACK);
        return;
      }
      setStatus("ok");
    } catch {
      setStatus("error");
      setError(FALLBACK);
    }
  }

  if (status === "ok") {
    return (
      <div className="card p-10 text-center shadow-lift">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest-100 text-forest-700">
          <svg viewBox="0 0 20 20" className="h-7 w-7" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.58l7.3-7.3a1 1 0 0 1 1.4 0Z" clipRule="evenodd" /></svg>
        </div>
        <h2 className="mt-6 font-display text-3xl text-ink">¡Listo, quedó pedida!</h2>
        <p className="mx-auto mt-3 max-w-sm leading-relaxed text-ink-soft">
          Recibí tu pedido. Te escribo por WhatsApp en el día para confirmar el horario.
        </p>
        <div className="mx-auto mt-8 max-w-xs border-t border-ink/10 pt-6">
          <p className="text-sm text-ink-mute">¿Querés adelantarlo?</p>
          <a href={waLink(summary)} target="_blank" rel="noopener noreferrer" className="btn-wa mt-3 w-full">
            <WhatsAppIcon className="h-5 w-5" /> Mandarme el mensaje
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card p-7 shadow-lift sm:p-10">
      <div className="flex items-center justify-between border-b border-ink/10 pb-6">
        <div>
          <h2 className="font-display text-2xl text-ink">Reservá tu llamada</h2>
          <p className="mt-1 text-sm text-ink-mute">Tres datos y listo.</p>
        </div>
        <span className="rounded-full bg-forest-50 px-3 py-1 text-xs font-semibold text-forest-700">20 min · gratis</span>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field label="Tu nombre" name="name" defaultValue={defaultName} autoComplete="name" placeholder="Nombre y apellido" error={fieldErrors.name} />
        <Field label="Tu WhatsApp" name="phone" type="tel" placeholder="11 2345-6789" autoComplete="tel" inputMode="tel" error={fieldErrors.phone} />
      </div>

      <fieldset className="mt-7">
        <legend className="mb-3 text-sm font-semibold text-ink">¿Cuándo te queda mejor?</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {slotOptions.map((s) => {
            const [title, hours] = s.label.split(" (");
            const active = slot === s.value;
            return (
              <button key={s.value} type="button" aria-pressed={active}
                onClick={() => { setSlot(s.value); setFieldErrors((f) => ({ ...f, slot: "" })); }}
                className={`rounded-xl border px-4 py-3.5 text-left transition ${active ? "border-forest-700 bg-forest-50 ring-2 ring-forest-700/15" : "border-ink/15 bg-white hover:border-ink/35"}`}>
                <span className="flex items-center justify-between">
                  <span className={`text-[15px] font-semibold ${active ? "text-forest-800" : "text-ink"}`}>{title}</span>
                  <span className={`h-4 w-4 rounded-full border ${active ? "border-[5px] border-forest-700" : "border-ink/25"}`} />
                </span>
                <span className="mt-0.5 block text-sm text-ink-mute">{hours?.replace(")", "")} hs</span>
              </button>
            );
          })}
        </div>
        {fieldErrors.slot ? <p className="mt-2 text-sm text-clay-600">{fieldErrors.slot}</p> : null}
      </fieldset>

      <fieldset className="mt-7">
        <legend className="mb-3 text-sm font-semibold text-ink">Plan de interés <span className="font-normal text-ink-mute">(opcional)</span></legend>
        <div className="flex flex-wrap gap-2">
          {planOptions.map((p) => {
            const active = plan === p.value;
            return (
              <button key={p.value || "none"} type="button" aria-pressed={active} onClick={() => setPlan(p.value)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${active ? "border-forest-700 bg-forest-700 text-white" : "border-ink/15 bg-white text-ink-soft hover:border-ink/35 hover:text-ink"}`}>
                {p.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      {showMore ? (
        <div className="mt-7 grid gap-5 border-t border-ink/10 pt-7 sm:grid-cols-2">
          <Field label="Inmobiliaria" name="agency" autoComplete="organization" />
          <Field label="Email" name="email" type="email" defaultValue={defaultEmail} autoComplete="email" error={fieldErrors.email} />
          <label className="block sm:col-span-2">
            <span className="mb-2 block text-sm font-semibold text-ink">Zona</span>
            <select name="zone" defaultValue="" className="input">
              <option value="">Elegí una zona</option>
              {zonaOptions.map((z) => <option key={z.value} value={z.value}>{z.label}</option>)}
            </select>
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-2 block text-sm font-semibold text-ink">Mensaje</span>
            <textarea name="message" rows={3} className="input" placeholder="Cantidad de avisos, cómo manejan las consultas hoy…" />
          </label>
        </div>
      ) : (
        <>
          <input type="hidden" name="email" value={defaultEmail} />
          <button type="button" onClick={() => setShowMore(true)} className="mt-6 text-sm font-medium text-forest-700 hover:text-forest-900">
            + Sumar inmobiliaria, zona o un mensaje
          </button>
        </>
      )}

      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      {error ? (
        <div role="alert" className="mt-7 rounded-xl border border-clay-500/30 bg-clay-50 px-4 py-3 text-sm text-clay-600">
          {error}{" "}
          <a href={waLink(summary)} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">Abrir WhatsApp</a>
        </div>
      ) : null}

      <button type="submit" disabled={status === "loading"} className="btn-primary mt-8 w-full py-4 text-base disabled:opacity-60">
        {status === "loading" ? "Enviando…" : "Pedir mi llamada"}
      </button>
      <p className="mt-4 text-center text-sm text-ink-mute">Te confirmo por WhatsApp en el día. No comparto tus datos.</p>
    </form>
  );
}

function Field(props: {
  label: string; name: string; type?: string; defaultValue?: string; placeholder?: string;
  autoComplete?: string; inputMode?: "tel" | "text" | "email"; error?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-ink">{props.label}</span>
      <input
        name={props.name} type={props.type || "text"} defaultValue={props.defaultValue} placeholder={props.placeholder}
        autoComplete={props.autoComplete} inputMode={props.inputMode} aria-invalid={Boolean(props.error)}
        className={`input ${props.error ? "border-clay-500 focus:border-clay-500 focus:ring-clay-500/10" : ""}`}
      />
      {props.error ? <span className="mt-1.5 block text-sm text-clay-600">{props.error}</span> : null}
    </label>
  );
}
