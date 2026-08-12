"use client";

import { Bot, RotateCcw, X } from "lucide-react";

type ChatHeaderProps = {
  onClose: () => void;
  onReset: () => void;
};

export function ChatHeader({ onClose, onReset }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/10 bg-[#0f1114]/90 backdrop-blur-md rounded-t-2xl select-none">
      <div className="flex items-center gap-3">
        {/* Avatar with Status Dot */}
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-[#181a1d] border border-white/15 flex items-center justify-center text-accent shadow-sm">
            <Bot size={18} />
          </div>
          <span
            className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-accent ring-2 ring-[#0c0e10] animate-pulse"
            title="Online"
          />
        </div>

        <div>
          <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span>Ammar&apos;s AI Assistant</span>
          </h3>
          <p className="text-[11px] font-mono text-neutral-400 flex items-center gap-1.5 mt-0.5">
            <span className="text-accent font-bold">&bull;</span>
            <span>Online &bull; Ask me anything</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        {/* Reset Conversation Button */}
        <button
          type="button"
          onClick={onReset}
          title="Restart Conversation"
          aria-label="Restart Conversation"
          className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <RotateCcw size={15} />
        </button>

        {/* Close Panel Button */}
        <button
          type="button"
          onClick={onClose}
          title="Close Chat"
          aria-label="Close Chat"
          className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X size={17} />
        </button>
      </div>
    </div>
  );
}
