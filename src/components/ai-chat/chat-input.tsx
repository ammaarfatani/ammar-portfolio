"use client";

import { Send, Loader2 } from "lucide-react";
import { useState, useRef, type KeyboardEvent, type FormEvent } from "react";

type ChatInputProps = {
  onSend: (message: string) => void;
  isLoading: boolean;
};

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setText("");
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 border-t border-white/10 bg-[#0f1114]/90 backdrop-blur-md rounded-b-2xl"
    >
      <div className="relative flex items-center bg-[#15181c] border border-white/15 focus-within:border-accent/60 rounded-xl px-3 py-2 transition-colors">
        <textarea
          ref={inputRef}
          rows={1}
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder="Ask about Ammar's stack, projects, experience..."
          aria-label="Ask Ammar's AI Assistant"
          className="w-full bg-transparent text-white text-xs font-mono placeholder:text-neutral-500 focus:outline-none resize-none min-h-[24px] max-h-[120px] py-1 leading-relaxed"
        />

        <button
          type="submit"
          disabled={!text.trim() || isLoading}
          title="Send message"
          aria-label="Send message"
          className="ml-2 p-2 rounded-lg bg-accent text-[#0b0c0e] hover:bg-accent/90 disabled:opacity-30 disabled:hover:bg-accent disabled:cursor-not-allowed transition-all shrink-0 active:scale-95 flex items-center justify-center font-bold"
        >
          {isLoading ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Send size={14} className="stroke-[2.5]" />
          )}
        </button>
      </div>
      <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 mt-2 px-1">
        <span>Enter to send &bull; Shift+Enter for newline</span>
        {/* <span className="text-accent/80 font-bold">n8n Powered</span> */}
      </div>
    </form>
  );
}
