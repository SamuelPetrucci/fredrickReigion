import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  formatApplicationEmail,
  validateApplicationPayload,
  type ApplicationPayload,
} from "@/lib/application-form";

export async function POST(request: Request) {
  let body: Partial<ApplicationPayload>;

  try {
    body = (await request.json()) as Partial<ApplicationPayload>;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const validated = validateApplicationPayload(body);
  if (!validated.ok) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.APPLICATION_TO_EMAIL;
  const fromEmail =
    process.env.APPLICATION_FROM_EMAIL ?? "Fedrick Region <onboarding@resend.dev>";

  if (!apiKey || !toEmail) {
    console.error("Missing RESEND_API_KEY or APPLICATION_TO_EMAIL");
    return NextResponse.json(
      { error: "Application email is not configured yet." },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);
  const text = formatApplicationEmail(validated.data);

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    replyTo: validated.data.email,
    subject: `New application — ${validated.data.name}`,
    text,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Failed to send application. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
