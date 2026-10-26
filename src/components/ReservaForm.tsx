"use client";

import { FormEvent, useState } from "react";
import { planOptions, slotOptions, zonaOptions } from "@/lib/reserva-schema";
import { WA_DISPLAY, waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppIcon";

type Props = {
  defaultName?: string;
  defaultEmail?: string;
  defaultPlan?: string;
};

export function ReservaForm({ defaultName = "", defaultEmail = "", defaultPlan = "" }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const [slot, setSlot] = useState("");
  const [plan, setPlan] = useState(defaultPlan);
  const [summary, setSummary] = useState("");
  const [showMore, setShowMore] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!slot) {
      setStatus("error");
      setError("Elegí una franja horaria para la llamada.");
      return;
    }
    setStatus("loading");
    setError("");
    const fd = new FormData(e.currentTarget);
    fd.set("slot", slot);
    fd.set("plan", plan);
    const payload = Object.fromEntries(fd.entries()) as Record<string, string>;

    const slotLabel = slotOptions.find((s) => s.value === slot)?.label ?? slot;
    const planLabel = planOptions.find((p) => p.value === plan)?.label;
    const msg = [
      `Hola Nicolás, soy ${payload.name}${payload.agency ? ` de ${payload.agency}` : ""}.`,
      `Pedí una llamada de 20 min — franja: ${slotLabel}.`,
      plan ? `Me interesa el plan ${planLabel}.` : "",
    ]
      .filter(Boolean)
      .join(" ");
    setSummary(msg);

    try {
      const res = await fetch("/api/reservas", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        const fields = json.fieldErrors
          ? Object.values(json.fieldErrors as Record<string, string[]>).flat().join(" ")
          : "";
        setStatus("error");
        setError(fields || json.formErrors?.join(" ") || "No se pudo enviar. Escribime por WhatsApp y lo coordinamos.");
        return;
      }
      setStatus("ok");
    } catch {
      setStatus("error");
      setError("No se pudo enviar. Escribime por WhatsApp y lo coordinamos.");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center text-emerald-950 shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-2xl text-white">✓</div>
        <h2 className="mt-4 text-xl font-semibold">¡Listo! Tu llamada quedó pedida.</h2>
        <p className="mt-2 text-sm text-emerald-900">
          Te escribo por WhatsApp para confirmar el horario. Si querés acelerar, mandame el mensaje ya:
        </p>
        <a
          href={waLink(summary)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1ebe5b]"
        >
          <WhatsAppIcon /> Confirmar por WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Tu nombre" name="name" defaultValue={defaultName} autoComplete="name" required />
        <Field label="Tu WhatsApp" name="phone" type="tel" placeholder="11 2345-6789" autoComplete="tel" inputMode="tel" required />
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-stone-700">¿Cuándo te queda mejor?</legend>
        <div className="grid grid-cols-3 gap-2">
          {slotOptions.map((s) => (
            <Chip key={s.value} active={slot === s.value} onClick={() => setSlot(s.value)}>
              {s.label}
            </Chip>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-stone-700">
          Plan de interés <span className="font-normal text-stone-400">(opcional)</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {planOptions.map((p) => (
            <Chip key={p.value || "none"} active={plan === p.value} onClick={() => setPlan(p.value)}>
              {p.label}
            </Chip>
          ))}
        </div>
      </fieldset>

      {showMore ? (
        <div className="grid gap-4 border-t border-stone-100 pt-5 sm:grid-cols-2">
          <Field label="Inmobiliaria" name="agency" autoComplete="organization" />
          <Field label="Email" name="email" type="email" defaultValue={defaultEmail} autoComplete="email" />
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-stone-700">Zona</span>
            <select name="zone" defaultValue="" className="w-full rounded-xl border border-stone-300 px-3 py-2.5 text-stone-900">
              <option value="">—</option>
              {zonaOptions.map((z) => (
                <option key={z.value} value={z.value}>{z.label}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="mb-1 block font-medium text-stone-700">Mensaje</span>
            <textarea name="message" rows={3} className="w-full rounded-xl border border-stone-300 px-3 py-2 text-stone-900" placeholder="Cantidad de avisos, cómo manejan las consultas hoy…" />
          </label>
        </div>
      ) : (
        <>
          <input type="hidden" name="email" value={defaultEmail} />
          <button type="button" onClick={() => setShowMore(true)} className="text-sm font-medium text-stone-500 underline-offset-4 hover:text-stone-900 hover:underline">
            + Agregar inmobiliaria, zona o mensaje (opcional)
          </button>
        </>
      )}

      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      {error ? <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-stone-900 px-5 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-stone-800 disabled:opacity-60"
      >
        {status === "loading" ? "Enviando…" : "Pedir mi llamada de 20 min"}
      </button>
      <p className="text-center text-sm text-stone-500">
        ¿Más rápido?{" "}
        <a href={waLink("Hola Nicolás, quiero coordinar una llamada de 20 min.")} target="_blank" rel="noopener noreferrer" className="font-medium text-emerald-700 hover:underline">
          Escribime por WhatsApp al {WA_DISPLAY}
        </a>
      </p>
    </form>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
        active ? "border-stone-900 bg-stone-900 text-white" : "border-stone-300 bg-white text-stone-700 hover:border-stone-500"
      }`}
    >
      {children}
    </button>
  );
}

function Field(props: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "tel" | "text" | "email";
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-stone-700">{props.label}</span>
      <input
        name={props.name}
        type={props.type || "text"}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        required={props.required}
        autoComplete={props.autoComplete}
        inputMode={props.inputMode}
        className="w-full rounded-xl border border-stone-300 px-3 py-2.5 text-stone-900 focus:border-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900/10"
      />
    </label>
  );
}
