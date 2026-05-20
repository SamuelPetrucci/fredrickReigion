import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  destroyAdminSession,
  getAdminSessionToken,
} from "@/lib/admin-auth";

export async function POST() {
  const token = await getAdminSessionToken();
  await destroyAdminSession(token);
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE);
  return NextResponse.json({ ok: true });
}
