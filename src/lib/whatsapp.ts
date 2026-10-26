export const WA_NUMBER = "5491125910795";
export const WA_DISPLAY = "11 2591-0795";

export function waLink(text?: string) {
  const base = `https://wa.me/${WA_NUMBER}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export const WA_DEFAULT_TEXT =
  "Hola Nicolás, vi tu web y quiero consultar por los planes (Dedicado, Completo o Avisos).";

export function waPlanText(plan: string) {
  return `Hola Nicolás, me interesa el plan ${plan}. ¿Podemos hablar?`;
}
