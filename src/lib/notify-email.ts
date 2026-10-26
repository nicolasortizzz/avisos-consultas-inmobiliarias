import { Resend } from "resend";
import type { ReservaRecord } from "@/lib/store";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function notifyReservaEmail(r: ReservaRecord): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set; skipping reserva email notification");
    return;
  }
  const to = process.env.NOTIFY_EMAIL || "nicolasortizarmesto@gmail.com";
  const from = process.env.RESEND_FROM || "Avisos inmobiliarias <onboarding@resend.dev>";
  const when =
    new Date(r.createdAt).toLocaleString("es-AR", { timeZone: "America/Buenos_Aires" }) +
    " (hora de Buenos Aires)";
  const rows: [string, string][] = [
    ["Nombre", r.name],
    ["WhatsApp / teléfono", r.phone || "-"],
    ["Plan", r.plan || "-"],
    ["Horario", r.slot || "-"],
    ["Inmobiliaria", r.agency || "-"],
    ["Zona", r.zone || "-"],
    ["Email", r.email || "-"],
    ["Mensaje", r.message || "-"],
    ["ID reserva", r.id],
    ["Fecha", when],
  ];
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<h2>Nueva reserva</h2><table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif">${rows
    .map(([k, v]) => `<tr><td style="font-weight:bold;border-bottom:1px solid #eee">${esc(k)}</td><td style="border-bottom:1px solid #eee">${esc(String(v))}</td></tr>`)
    .join("")}</table>`;
  const { error } = await new Resend(apiKey).emails.send({
    from,
    to,
    replyTo: r.email || undefined,
    subject: `Nueva reserva: ${r.name} — ${r.slot}`,
    text,
    html,
  });
  if (error) throw new Error(`Resend error: ${error.message}`);
}
