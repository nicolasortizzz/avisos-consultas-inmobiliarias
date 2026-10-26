import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

const dataDir = path.join(process.cwd(), "data");

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
  reservas.push(record);
  await writeJson("reservas.json", reservas);
  return record;
}

export async function listReservasForEmail(email: string): Promise<ReservaRecord[]> {
  const reservas = await readJson<ReservaRecord[]>("reservas.json", []);
  return reservas.filter((r) => r.email.toLowerCase() === email.toLowerCase());
}
