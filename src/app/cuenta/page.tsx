import { auth, signIn, signOut } from "@/auth";
import { listReservasForEmail } from "@/lib/store";
import Link from "next/link";

export const metadata = {
  title: "Cuenta | Avisos y consultas",
};

export default async function CuentaPage() {
  const session = await auth();
  const googleConfigured =
    Boolean(process.env.AUTH_GOOGLE_ID) && Boolean(process.env.AUTH_GOOGLE_SECRET);

  if (session?.user?.email) {
    const reservas = await listReservasForEmail(session.user.email);
    return (
      <div className="mx-auto max-w-xl px-4 py-12">
        <h1 className="text-3xl font-semibold text-ink">Mi cuenta</h1>
        <p className="mt-2 text-ink-soft">
          {session.user.name} · {session.user.email}
        </p>
        <div className="mt-8 space-y-3">
          <h2 className="text-sm font-medium uppercase tracking-wide text-ink-mute">
            Tus pedidos de llamada
          </h2>
          {reservas.length === 0 ? (
            <p className="text-sm text-ink-soft">
              Todavía no hay pedidos.{" "}
              <Link href="/reservar" className="underline">
                Reservar ahora
              </Link>
            </p>
          ) : (
            <ul className="space-y-2">
              {reservas.map((r) => (
                <li
                  key={r.id}
                  className="rounded-xl border border-ink/10 bg-white p-4 text-sm text-ink-soft"
                >
                  <p className="font-medium text-ink">{r.agency}</p>
                  <p>
                    {r.zone} · {r.slot} · {new Date(r.createdAt).toLocaleString("es-AR")}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
        <form
          className="mt-8"
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button className="text-sm text-ink-soft underline" type="submit">
            Cerrar sesión
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-3xl font-semibold text-ink">Ingresar</h1>
      <p className="mt-3 text-ink-soft">
        Guardá tu cuenta y tus pedidos de llamada. Lo mínimo: email y nombre.
      </p>

      {googleConfigured ? (
        <form
          className="mt-8"
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/cuenta" });
          }}
        >
          <button
            type="submit"
            className="w-full rounded-full bg-forest-800 px-4 py-2.5 text-sm font-medium text-white hover:bg-forest-900"
          >
            Continuar con Google
          </button>
        </form>
      ) : (
        <div className="mt-8 space-y-4 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <p className="text-sm text-amber-900">
            Google OAuth todavía no está configurado en este entorno. Podés
            ingresar con un acceso de prueba (solo desarrollo) o reservar sin
            cuenta.
          </p>
          <form
            className="space-y-3"
            action={async (fd) => {
              "use server";
              const email = String(fd.get("email") || "");
              const name = String(fd.get("name") || "");
              await signIn("dev-login", {
                email,
                name,
                redirectTo: "/cuenta",
              });
            }}
          >
            <input
              name="name"
              placeholder="Nombre"
              required
              className="w-full rounded-xl border border-ink/10 px-3 py-2"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="w-full rounded-xl border border-ink/10 px-3 py-2"
            />
            <button
              type="submit"
              className="w-full rounded-full bg-forest-800 px-4 py-2.5 text-sm font-medium text-white"
            >
              Entrar (prueba)
            </button>
          </form>
        </div>
      )}

      <p className="mt-6 text-center text-sm text-ink-mute">
        <Link href="/reservar" className="underline">
          Reservar sin ingresar
        </Link>
      </p>
    </div>
  );
}
