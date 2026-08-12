// Configuration for n8n AI Agent Webhook integration

export const N8N_CHAT_WEBHOOK_URL =
  process.env.N8N_CHAT_WEBHOOK_URL ||
  process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL ||
  "https://ammaragents.app.n8n.cloud/webhook/51950829-5099-4a20-9c9b-fadb69f83458/chat";

export function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "server_session";
  const STORAGE_KEY = "ammar_ai_chat_session_id";
  let sessionId = localStorage.getItem(STORAGE_KEY);
  if (!sessionId) {
    sessionId = "session_" + Math.random().toString(36).substring(2, 9) + "_" + Date.now();
    localStorage.setItem(STORAGE_KEY, sessionId);
  }
  return sessionId;
}

export function resetSessionId(): string {
  if (typeof window === "undefined") return "server_session";
  const STORAGE_KEY = "ammar_ai_chat_session_id";
  const newSessionId = "session_" + Math.random().toString(36).substring(2, 9) + "_" + Date.now();
  localStorage.setItem(STORAGE_KEY, newSessionId);
  return newSessionId;
}
