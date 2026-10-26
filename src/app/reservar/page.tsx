import { auth } from "@/auth";
import { ReservaForm } from "@/components/ReservaForm";

export const metadata = {
  title: "Reservar llamada | Avisos y consultas",
};

const validPlans = ["dedicado", "completo", "avisos"];

export default async function ReservarPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const session = await auth();
  const { plan } = await searchParams;
  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:py-16">
      <p className="text-sm font-medium uppercase tracking-wide text-emerald-700">Llamada de diagnóstico · 20 min</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
        Charlemos 20 minutos
      </h1>
      <p className="mt-3 text-stone-600">
        Miramos juntos uno de tus avisos y vemos si el servicio te sirve. Sin compromiso.
        Solo necesito tu nombre, tu WhatsApp y una franja.
      </p>
      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-sm text-stone-500">
        <li>✓ Sin costo</li>
        <li>✓ Te confirmo por WhatsApp</li>
        <li>✓ Menos de 1 minuto</li>
      </ul>
      <div className="mt-8">
        <ReservaForm
          defaultName={session?.user?.name || ""}
          defaultEmail={session?.user?.email || ""}
          defaultPlan={plan && validPlans.includes(plan) ? plan : ""}
        />
      </div>
    </div>
  );
}
