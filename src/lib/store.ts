import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

import os from "os";

// On Vercel/Lambda the bundle dir (/var/task) is read-only: write under /tmp there.
// Locally (next dev / next start without those vars) keep ./data.
export function resolveDataDir(env: NodeJS.ProcessEnv = process.env): string {
  if (env.DATA_DIR) return env.DATA_DIR;
  if (env.VERCEL || env.AWS_LAMBDA_FUNCTION_NAME) {
    return path.join(os.tmpdir(), "inmobiliarias-data");
  }
  return path.join(process.cwd(), "data");
}

const dataDir = resolveDataDir();

export type UserRecord = {
  id: string;
  email: string;
  name: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ReservaRecord = {
  id: string;
  userId: string | null;
  name: string;
  email: string;
  phone: string;
  agency: string;
  zone: string;
  plan: string;
  slot: string;
  message: string;
  createdAt: string;
};

async function ensureDataDir() {
  await fs.mkdir(dataDir, { recursive: true });
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  await ensureDataDir();
  const full = path.join(dataDir, file);
  try {
    const raw = await fs.readFile(full, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson<T>(file: string, value: T) {
  await ensureDataDir();
  const full = path.join(dataDir, file);
  await fs.writeFile(full, JSON.stringify(value, null, 2), "utf8");
}

export async function upsertUserFromAuth(input: {
  email: string;
  name: string;
  image: string | null;
}): Promise<UserRecord> {
  const users = await readJson<UserRecord[]>("users.json", []);
  const email = input.email.toLowerCase();
  const now = new Date().toISOString();
  const existing = users.find((u) => u.email === email);
  if (existing) {
    existing.name = input.name;
    existing.image = input.image;
    existing.updatedAt = now;
    await writeJson("users.json", users);
    return existing;
  }
  const created: UserRecord = {
    id: randomUUID(),
    email,
    name: input.name,
    image: input.image,
    createdAt: now,
    updatedAt: now,
  };
  users.push(created);
  await writeJson("users.json", users);
  return created;
}

export async function createReserva(
  input: Omit<ReservaRecord, "id" | "createdAt">
): Promise<ReservaRecord> {
  const reservas = await readJson<ReservaRecord[]>("reservas.json", []);
  const record: ReservaRecord = {
    ...input,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };
  // Always log so it shows up in Vercel logs even if /tmp is wiped between invocations.
  console.log(JSON.stringify({ type: "reserva", ...record }));
  reservas.push(record);
  try {
    await writeJson("reservas.json", reservas);
  } catch (err) {
    console.error("reserva storage failed (logged above)", err);
  }
  return record;
}

export async function listReservasForEmail(email: string): Promise<ReservaRecord[]> {
  const reservas = await readJson<ReservaRecord[]>("reservas.json", []);
  return reservas.filter((r) => r.email.toLowerCase() === email.toLowerCase());
}
