import { cookies } from "next/headers";
import { getRedis } from "@/lib/redis";

export const ADMIN_COOKIE = "fr_admin";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 24 * 7;

const SESS_PREFIX = "fredrick:adm:";

export function getAdminCookieName() {
  return ADMIN_COOKIE;
}

export async function createAdminSession(): Promise<string> {
  const redis = getRedis();
  if (!redis) throw new Error("Redis is not configured");
  const token = crypto.randomUUID();
  await redis.set(SESS_PREFIX + token, "1", { ex: ADMIN_SESSION_MAX_AGE });
  return token;
}

export async function validateAdminSession(
  token: string | undefined
): Promise<boolean> {
  if (!token) return false;
  const redis = getRedis();
  if (!redis) return false;
  const v = await redis.get<string>(SESS_PREFIX + token);
  return v === "1";
}

export async function destroyAdminSession(
  token: string | undefined
): Promise<void> {
  if (!token) return;
  const redis = getRedis();
  if (redis) await redis.del(SESS_PREFIX + token);
}

export async function getAdminSessionToken(): Promise<string | undefined> {
  const jar = await cookies();
  return jar.get(ADMIN_COOKIE)?.value;
}

export async function assertAdminSession(): Promise<string> {
  const token = await getAdminSessionToken();
  if (!(await validateAdminSession(token))) {
    throw new Error("Unauthorized");
  }
  return token!;
}
