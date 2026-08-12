"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex items-end gap-2.5 my-3">
      {/* AI Assistant Avatar */}
      <div className="w-7 h-7 rounded-full bg-[#181a1d] border border-white/15 flex items-center justify-center text-accent shrink-0 shadow-sm">
        <Bot size={14} />
      </div>

      {/* Typing Bubble */}
      <div className="px-4 py-3 rounded-2xl rounded-tl-xs bg-white/5 border border-white/10 flex items-center gap-2 text-xs font-mono text-neutral-400">
        <span className="text-[11px] text-neutral-400">Thinking</span>
        <div className="flex items-center gap-1">
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-accent"
          />
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1, delay: 0.2, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-accent"
          />
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1, delay: 0.4, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-accent"
          />
        </div>
      </div>
    </div>
  );
}
