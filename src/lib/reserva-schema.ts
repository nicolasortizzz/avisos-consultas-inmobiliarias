import { z } from "zod";

export const zonaOptions = [
  { value: "nunez", label: "Núñez" },
  { value: "belgrano", label: "Belgrano" },
  { value: "saavedra", label: "Saavedra" },
  { value: "san-isidro", label: "San Isidro" },
  { value: "martinez", label: "Martínez" },
] as const;

export const planOptions = [
  { value: "", label: "Todavía no sé" },
  { value: "dedicado", label: "Dedicado" },
  { value: "completo", label: "Completo" },
  { value: "avisos", label: "Avisos" },
] as const;

export const slotOptions = [
  { value: "manana", label: "Mañana (9–13)" },
  { value: "tarde", label: "Tarde (13–18)" },
  { value: "noche", label: "Noche (18–21)" },
] as const;

export const reservaSchema = z.object({
  name: z.string().trim().min(2, "Escribí tu nombre."),
  email: z.string().trim().email("Email inválido."),
  phone: z.string().trim().min(8, "Teléfono / WhatsApp."),
  agency: z.string().trim().min(2, "Nombre de la inmobiliaria."),
  zone: z.enum(["nunez", "belgrano", "saavedra", "san-isidro", "martinez"], {
    message: "Elegí una zona de trabajo.",
  }),
  plan: z.enum(["", "dedicado", "completo", "avisos"]),
  slot: z.enum(["manana", "tarde", "noche"], {
    message: "Elegí una franja para la llamada.",
  }),
  message: z.string().trim().max(1000).optional().default(""),
  website: z.string().optional(), // honeypot
});

export type ReservaInput = z.infer<typeof reservaSchema>;
