import { NextResponse } from "next/server";

type ContactPayload = { name?: string; email?: string; projectType?: string; message?: string };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: ContactPayload;
  try { payload = await request.json(); } catch { return NextResponse.json({ message: "Invalid request." }, { status: 400 }); }
  const name = payload.name?.trim(); const email = payload.email?.trim(); const projectType = payload.projectType?.trim(); const message = payload.message?.trim();
  if (!name || !email || !projectType || !message || !emailPattern.test(email) || name.length > 100 || message.length > 5000) return NextResponse.json({ message: "Please complete the form with valid details." }, { status: 400 });

  const webhookUrl = process.env.CONTACT_FORM_WEBHOOK_URL;
  // TODO: Configure CONTACT_FORM_WEBHOOK_URL in the deployment environment to
  // connect a trusted email/serverless provider. Keep provider secrets server-side.
  if (!webhookUrl) return NextResponse.json({ message: "Contact delivery is not configured yet. Please use the email link instead." }, { status: 503 });

  try {
    const response = await fetch(webhookUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, projectType, message }), signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error("Provider request failed");
    return NextResponse.json({ message: "Message sent successfully." });
  } catch { return NextResponse.json({ message: "Message delivery is unavailable right now. Please use the email link instead." }, { status: 502 }); }
}
