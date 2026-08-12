"use client";

import { useEffect, useRef } from "react";
import { Bot, User } from "lucide-react";
import { QuickActions } from "./quick-actions";
import { TypingIndicator } from "./typing-indicator";

export type ChatMessage = {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  isError?: boolean;
};

type ChatMessagesProps = {
  messages: ChatMessage[];
  isLoading: boolean;
  onQuickActionSelect: (actionText: string) => void;
};

export function ChatMessages({ messages, isLoading, onQuickActionSelect }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-xs scrollbar-thin scrollbar-thumb-white/20">
      {messages.map((msg, idx) => {
        const isUser = msg.sender === "user";

        return (
          <div key={msg.id || idx} className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
            {/* Avatar */}
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                isUser
                  ? "bg-[#1f2910] border border-accent/40 text-accent"
                  : "bg-[#181a1d] border border-white/15 text-accent"
              }`}
            >
              {isUser ? <User size={14} /> : <Bot size={14} />}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[85%] sm:max-w-[80%] px-4 py-3 shadow-md ${
                isUser
                  ? "bg-[#182312] border border-accent/30 text-white rounded-2xl rounded-tr-xs"
                  : msg.isError
                  ? "bg-red-950/40 border border-red-500/40 text-red-200 rounded-2xl rounded-tl-xs"
                  : "bg-[#14171a] border border-white/10 text-neutral-200 rounded-2xl rounded-tl-xs"
              }`}
            >
              <div className="leading-relaxed whitespace-pre-wrap break-words">
                {parseMarkdownText(msg.text)}
              </div>
              <span className="text-[9px] text-neutral-500 block mt-1.5 text-right font-mono">
                {msg.timestamp}
              </span>
            </div>
          </div>
        );
      })}

      {/* Show Quick Action Prompt Chips after the initial greeting if only 1 AI message exists */}
      {messages.length === 1 && (
        <QuickActions onSelect={onQuickActionSelect} disabled={isLoading} />
      )}

      {/* Typing Indicator */}
      {isLoading && <TypingIndicator />}

      <div ref={bottomRef} />
    </div>
  );
}

// Simple, safe Markdown & Link parser helper
function parseMarkdownText(text: string) {
  if (!text) return null;

  // Split into lines
  const lines = text.split("\n");

  return lines.map((line, lineIdx) => {
    // Check for bullet items
    const isBullet = line.trim().startsWith("- ") || line.trim().startsWith("* ");
    const content = isBullet ? line.trim().substring(2) : line;

    // Process inline formatting: bold & links
    const parts = parseInlineFormatting(content);

    if (isBullet) {
      return (
        <div key={lineIdx} className="flex items-start gap-1.5 my-1 pl-2">
          <span className="text-accent text-sm leading-none">•</span>
          <div className="flex-1">{parts}</div>
        </div>
      );
    }

    return (
      <span key={lineIdx} className="block min-h-[1.25em]">
        {parts}
      </span>
    );
  });
}

function parseInlineFormatting(text: string) {
  // Regex pattern for bold **text** and markdown links [label](url) and raw URLs
  const regex = /(\*\*.*?\*\*|\[.*?\]\(https?:\/\/.*?\)|https?:\/\/[^\s]+)/g;
  const tokens = text.split(regex);

  return tokens.map((token, i) => {
    if (!token) return null;

    // Bold text **...**
    if (token.startsWith("**") && token.endsWith("**") && token.length > 4) {
      return (
        <strong key={i} className="text-white font-bold">
          {token.slice(2, -2)}
        </strong>
      );
    }

    // Markdown link [text](url)
    const mdLinkMatch = token.match(/^\[(.*?)\]\((https?:\/\/.*?)\)$/);
    if (mdLinkMatch) {
      const [, label, url] = mdLinkMatch;
      return (
        <a
          key={i}
          href={url}
          target="_blank"
          rel="noreferrer"
          className="text-accent underline font-semibold hover:text-white transition-colors"
        >
          {label}
        </a>
      );
    }

    // Raw URL https://...
    if (token.startsWith("http://") || token.startsWith("https://")) {
      return (
        <a
          key={i}
          href={token}
          target="_blank"
          rel="noreferrer"
          className="text-accent underline font-semibold hover:text-white transition-colors"
        >
          {token}
        </a>
      );
    }

    return token;
  });
}
