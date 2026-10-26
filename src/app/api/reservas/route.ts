import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createReserva, listReservasForEmail } from "@/lib/store";
import { reservaSchema } from "@/lib/reserva-schema";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, formErrors: ["JSON inválido."] },
      { status: 400 }
    );
  }

  const parsed = reservaSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        fieldErrors: parsed.error.flatten().fieldErrors,
        formErrors: parsed.error.flatten().formErrors,
      },
      { status: 400 }
    );
  }

  const data = parsed.data;
  if (data.website) {
    return NextResponse.json({ ok: true, id: "ignored" });
  }

  let userId: string | null = null;
  try {
    const session = await auth();
    userId =
      (session?.user as { id?: string } | undefined)?.id ||
      session?.user?.email ||
      null;
  } catch {
    userId = null;
  }

  try {
  const record = await createReserva({
    userId,
    name: data.name,
    email: data.email,
    phone: data.phone,
    agency: data.agency,
    zone: data.zone,
    plan: data.plan,
    slot: data.slot,
    message: data.message || "",
  });

  return NextResponse.json({ ok: true, id: record.id }, { status: 201 });
  } catch (err) {
    console.error("POST /api/reservas failed", err);
    return NextResponse.json(
      { ok: false, formErrors: ["No pude guardar la reserva. Escribime por WhatsApp al 11 2591-0795 y lo coordinamos."] },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json(
      { ok: false, formErrors: ["Tenés que ingresar."] },
      { status: 401 }
    );
  }
  const items = await listReservasForEmail(session.user.email).catch(() => []);
  return NextResponse.json({ ok: true, items });
}
