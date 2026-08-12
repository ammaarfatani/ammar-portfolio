import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary: "bg-accent text-accent-ink hover:bg-[#d8ff75]",
  secondary: "border border-line bg-surface text-foreground hover:border-foreground",
  ghost: "text-foreground hover:bg-surface-raised",
};

export function Button({ className, variant = "primary", type = "button", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center px-4 text-sm font-medium tracking-[-0.01em] transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        className,
      )}
      type={type}
      {...props}
    />
  );
}
