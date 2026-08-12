import { NextResponse } from "next/server";
import { N8N_CHAT_WEBHOOK_URL } from "@/lib/chat-config";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const chatInput = (body.chatInput || body.message || "").toString().trim();
    const sessionId = (body.sessionId || "default_session").toString().trim();

    if (!chatInput) {
      return NextResponse.json({ message: "Message body cannot be empty." }, { status: 400 });
    }

    // Call production n8n AI agent Chat Trigger webhook
    const response = await fetch(N8N_CHAT_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatInput,
        sessionId,
        action: "sendMessage",
      }),
      signal: AbortSignal.timeout(25000),
    });

    if (!response.ok) {
      throw new Error(`n8n responded with status ${response.status}`);
    }

    const data = await response.json();

    // Extract text output from n8n response object/array
    let outputText = "";
    if (typeof data === "string") {
      outputText = data;
    } else if (Array.isArray(data) && data[0]?.output) {
      outputText = data[0].output;
    } else if (data.output) {
      outputText = data.output;
    } else if (data.message) {
      outputText = data.message;
    } else if (data.response) {
      outputText = data.response;
    } else {
      outputText = typeof data === "object" ? JSON.stringify(data) : String(data);
    }

    return NextResponse.json({ output: outputText });
  } catch (error) {
    console.error("n8n Chat webhook error:", error);
    return NextResponse.json(
      {
        message:
          "Sorry, I couldn't connect to Ammar's assistant right now. Please try again in a moment or get in touch via email (fataniammar188@gmail.com) or WhatsApp (+92 336 2567192).",
      },
      { status: 500 }
    );
  }
}
