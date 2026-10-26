# Avisos y consultas para inmobiliarias

Sitio público de Nicolás Ortiz: landing del servicio, ingreso con Google (Auth.js) y pedido de llamada de diagnóstico (reserva).

## Qué guarda

Solo lo mínimo, en `data/` (JSON local; en Vercel conviene migrar a un store durable):

- `users.json` — cuentas al iniciar sesión
- `reservas.json` — pedidos de llamada

## Local

```bash
cp .env.example .env.local
# completar AUTH_SECRET (openssl rand -base64 32)
npm install
npm run dev
```

Abrí http://localhost:3000

Sin `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET`, la página `/cuenta` ofrece un **acceso de prueba** (solo para desarrollo).

## Google OAuth

1. Creá credenciales OAuth en Google Cloud Console (tipo Web).
2. Authorized redirect URI: `{AUTH_URL}/api/auth/callback/google`
3. En `.env.local` / Vercel:
   - `AUTH_GOOGLE_ID`
   - `AUTH_GOOGLE_SECRET`
   - `AUTH_SECRET`
   - `AUTH_URL` = URL pública del sitio
   - `NEXT_PUBLIC_SITE_URL` = misma URL pública

## Deploy (público)

Recomendado: **Vercel** (necesita runtime Node por Auth + API).

1. Subí este repo a GitHub (público o privado).
2. Importá el proyecto en Vercel y cargá las variables de entorno.
3. Para persistencia real en producción, reemplazá `src/lib/store.ts` por Postgres/SQLite remoto; la interfaz de funciones ya está aislada.

Contacto comercial: WhatsApp **11 2591-0795**.
