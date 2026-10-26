import { auth } from "@/auth";
import { ReservaForm } from "@/components/ReservaForm";
import Link from "next/link";

export const metadata = {
  title: "Reservar llamada | Avisos y consultas",
};

export default async function ReservarPage() {
  const session = await auth();
  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-stone-900">Llamada de diagnóstico</h1>
      <p className="mt-3 text-stone-600">
        20 minutos para ver un aviso suyo y si el servicio les sirve. Sin
        compromiso.
      </p>
      {!session?.user ? (
        <p className="mt-4 text-sm text-stone-500">
          Opcional:{" "}
          <Link href="/cuenta" className="underline">
            ingresá con Google
          </Link>{" "}
          para guardar el pedido en tu cuenta.
        </p>
      ) : (
        <p className="mt-4 text-sm text-stone-500">
          Sesión: {session.user.email}
        </p>
      )}
      <div className="mt-8">
        <ReservaForm
          defaultName={session?.user?.name || ""}
          defaultEmail={session?.user?.email || ""}
        />
      </div>
    </div>
  );
}
