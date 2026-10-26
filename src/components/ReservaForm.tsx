"use client";

import { FormEvent, useState } from "react";
import { planOptions, slotOptions, zonaOptions } from "@/lib/reserva-schema";

type Props = {
  defaultName?: string;
  defaultEmail?: string;
};

export function ReservaForm({ defaultName = "", defaultEmail = "" }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());

    const res = await fetch("/api/reservas", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok || !json.ok) {
      setStatus("error");
      const fields = json.fieldErrors
        ? Object.values(json.fieldErrors as Record<string, string[]>)
            .flat()
            .join(" ")
        : "";
      setError(fields || json.formErrors?.join(" ") || "No se pudo enviar.");
      return;
    }
    setStatus("ok");
    form.reset();
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900">
        <p className="font-medium">Listo, pediste la llamada.</p>
        <p className="mt-2 text-sm">
          Te contacto por WhatsApp o mail para confirmar el horario. También podés
          escribirme ya al{" "}
          <a className="underline" href="https://wa.me/5491125910795">
            11 2591-0795
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nombre" name="name" defaultValue={defaultName} required />
        <Field label="Email" name="email" type="email" defaultValue={defaultEmail} required />
        <Field label="WhatsApp" name="phone" placeholder="11 …" required />
        <Field label="Inmobiliaria" name="agency" required />
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-stone-700">Zona</span>
          <select
            name="zone"
            required
            className="w-full rounded-xl border border-stone-300 px-3 py-2 text-stone-900"
            defaultValue=""
          >
            <option value="" disabled>
              Elegí…
            </option>
            {zonaOptions.map((z) => (
              <option key={z.value} value={z.value}>
                {z.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-stone-700">Plan de interés</span>
          <select
            name="plan"
            className="w-full rounded-xl border border-stone-300 px-3 py-2 text-stone-900"
            defaultValue=""
          >
            {planOptions.map((p) => (
              <option key={p.value || "none"} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1 block font-medium text-stone-700">Franja para la llamada (20 min)</span>
          <select
            name="slot"
            required
            className="w-full rounded-xl border border-stone-300 px-3 py-2 text-stone-900"
            defaultValue=""
          >
            <option value="" disabled>
              Elegí…
            </option>
            {slotOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-stone-700">Mensaje (opcional)</span>
        <textarea
          name="message"
          rows={3}
          className="w-full rounded-xl border border-stone-300 px-3 py-2 text-stone-900"
          placeholder="Cantidad de avisos, cómo manejan consultas hoy…"
        />
      </label>
      {/* honeypot */}
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-stone-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-stone-800 disabled:opacity-60"
      >
        {status === "loading" ? "Enviando…" : "Pedir llamada de diagnóstico"}
      </button>
    </form>
  );
}

function Field(props: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
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
        className="w-full rounded-xl border border-stone-300 px-3 py-2 text-stone-900"
      />
    </label>
  );
}
