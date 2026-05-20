import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { siteConfigSchema } from "@/config/site-config-schema";
import { getAdminSessionToken, validateAdminSession } from "@/lib/admin-auth";
import { getSiteConfig, saveSiteConfig } from "@/lib/site-config-store";

export async function GET() {
  const token = await getAdminSessionToken();
  if (!(await validateAdminSession(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const config = await getSiteConfig();
  return NextResponse.json(config);
}

export async function POST(req: Request) {
  const token = await getAdminSessionToken();
  if (!(await validateAdminSession(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = siteConfigSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    await saveSiteConfig(parsed.data);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Save failed";
    return NextResponse.json({ error: msg }, { status: 503 });
  }

  revalidatePath("/");
  revalidatePath("/admin");
  return NextResponse.json({ ok: true });
}
