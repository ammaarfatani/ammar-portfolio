"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Sparkles, X } from "lucide-react";
import { ChatHeader } from "./chat-header";
import { ChatMessages, type ChatMessage } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { getOrCreateSessionId, resetSessionId } from "@/lib/chat-config";

const INITIAL_GREETING = `Hi! 👋 I'm Ammar's AI assistant.

I can tell you about Ammar's skills, experience, projects, availability, or help you get in touch with him.

How can I help you today?`;

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");

  // Initialize session ID and initial greeting
  useEffect(() => {
    const id = getOrCreateSessionId();
    setSessionId(id);

    setMessages([
      {
        id: "init_greeting",
        sender: "ai",
        text: INITIAL_GREETING,
        timestamp: formatTime(new Date()),
      },
    ]);
  }, []);

  // Listen for Escape key to close window
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSendMessage = useCallback(
    async (userInput: string) => {
      if (!userInput.trim() || isLoading) return;

      const userMsg: ChatMessage = {
        id: `user_${Date.now()}`,
        sender: "user",
        text: userInput,
        timestamp: formatTime(new Date()),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chatInput: userInput,
            sessionId: sessionId || getOrCreateSessionId(),
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Request failed");
        }

        const aiMsg: ChatMessage = {
          id: `ai_${Date.now()}`,
          sender: "ai",
          text: data.output || "I have received your message.",
          timestamp: formatTime(new Date()),
        };

        setMessages((prev) => [...prev, aiMsg]);
      } catch {
        const errorMsg: ChatMessage = {
          id: `error_${Date.now()}`,
          sender: "ai",
          text: "Sorry, I couldn't connect to Ammar's assistant right now. Please try again in a moment or contact Ammar via email (fataniammar188@gmail.com) or WhatsApp (+92 336 2567192).",
          timestamp: formatTime(new Date()),
          isError: true,
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, sessionId]
  );

  const handleReset = useCallback(() => {
    const newId = resetSessionId();
    setSessionId(newId);
    setMessages([
      {
        id: `init_greeting_${Date.now()}`,
        sender: "ai",
        text: INITIAL_GREETING,
        timestamp: formatTime(new Date()),
      },
    ]);
  }, []);

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-5 right-5 z-50 select-none">
        <motion.button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Ammar's AI Assistant"
          title="Ammar's AI Assistant"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#0c0e10]/95 text-white border border-white/20 hover:border-accent shadow-[0_8px_30px_rgb(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(200,255,61,0.25)] backdrop-blur-md transition-all duration-200"
        >
          {/* Glowing Status Pulse Dot */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
          </span>

          <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-wider">
            <Bot size={18} className="text-accent group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Ask Ammar&apos;s AI</span>
          </div>

          {isOpen ? (
            <X size={16} className="text-neutral-400 group-hover:text-white transition-colors ml-1" />
          ) : (
            <Sparkles size={14} className="text-accent ml-1" />
          )}
        </motion.button>
      </div>

      {/* Floating Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-20 right-4 sm:right-6 z-50 w-[92vw] sm:w-[410px] h-[560px] max-h-[80vh] flex flex-col bg-[#0c0e10]/95 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl overflow-hidden font-sans"
          >
            {/* Header */}
            <ChatHeader onClose={() => setIsOpen(false)} onReset={handleReset} />

            {/* Messages Body */}
            <ChatMessages
              messages={messages}
              isLoading={isLoading}
              onQuickActionSelect={handleSendMessage}
            />

            {/* Input Bar */}
            <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
