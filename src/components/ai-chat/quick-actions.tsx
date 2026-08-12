"use client";

import { Sparkles } from "lucide-react";

type QuickActionsProps = {
  onSelect: (actionText: string) => void;
  disabled?: boolean;
};

const QUICK_ACTIONS = [
  "About Ammar",
  "Skills & Stack",
  "Projects",
  "Availability",
  "Let's Work Together",
  "I have a project",
];

export function QuickActions({ onSelect, disabled }: QuickActionsProps) {
  return (
    <div className="space-y-2 my-3">
      <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400 uppercase tracking-widest px-1">
        <Sparkles size={11} className="text-accent" />
        <span>Quick Questions</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(action)}
            className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-accent hover:bg-accent/10 hover:text-accent text-neutral-300 text-xs font-mono transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-left"
          >
            {action} &rarr;
          </button>
        ))}
      </div>
    </div>
  );
}
