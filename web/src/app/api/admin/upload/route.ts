import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getAdminSessionToken, validateAdminSession } from "@/lib/admin-auth";
import { isBlobConfigured } from "@/lib/blob-env";

export async function POST(req: Request) {
  const token = await getAdminSessionToken();
  if (!(await validateAdminSession(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isBlobConfigured()) {
    return NextResponse.json(
      { error: "Set BLOB_READ_WRITE_TOKEN (Vercel Blob) in environment" },
      { status: 503 }
    );
  }

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  const safeName = file.name.replace(/[^\w.-]+/g, "_").slice(0, 120);
  const pathname = `fredrick/${Date.now()}-${safeName}`;

  const blob = await put(pathname, file, {
    access: "public",
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  return NextResponse.json({ url: blob.url });
}
