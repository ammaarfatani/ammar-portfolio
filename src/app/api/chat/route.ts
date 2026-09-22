import { NextResponse } from "next/server";
import { generateAssistantReply, type ChatTurn } from "@/lib/assistant";

const CONTACT_FALLBACK =
  "Sorry, I couldn't reach Ammar's assistant right now. Please try again in a moment or get in touch via email (fataniammar188@gmail.com) or WhatsApp (+92 336 2567192).";

function parseHistory(value: unknown): ChatTurn[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const role = "role" in item ? String(item.role) : "";
      const content = "content" in item ? String(item.content) : "";
      if (!content.trim()) return null;
      if (role !== "user" && role !== "assistant") return null;
      return { role, content: content.slice(0, 4000) } satisfies ChatTurn;
    })
    .filter((item): item is ChatTurn => item !== null)
    .slice(-16);
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const chatInput = (body.chatInput || body.message || "").toString().trim();

    if (!chatInput) {
      return NextResponse.json({ message: "Message body cannot be empty." }, { status: 400 });
    }

    const history = parseHistory(body.messages);
    const output = await generateAssistantReply(chatInput.slice(0, 4000), history);

    return NextResponse.json({ output });
  } catch (error) {
    console.error("Portfolio assistant error:", error);
    return NextResponse.json({ message: CONTACT_FALLBACK }, { status: 500 });
  }
}
