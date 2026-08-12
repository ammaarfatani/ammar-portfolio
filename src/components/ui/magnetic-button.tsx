"use client";

import type { PointerEvent, ReactNode } from "react";
import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type SharedProps = { children: ReactNode; className?: string; label?: string; variant?: "primary" | "secondary" | "text" };
type MagneticButtonProps = SharedProps & (HTMLMotionProps<"button"> | (HTMLMotionProps<"a"> & { href: string }));

const variants = { primary: "bg-accent text-accent-ink hover:bg-[#ddff78]", secondary: "border border-line text-foreground hover:border-foreground", text: "text-foreground" };

export function MagneticButton({ children, className, label, variant = "primary", ...props }: MagneticButtonProps) {
  const x = useMotionValue(0); const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 18, mass: 0.25 }); const springY = useSpring(y, { stiffness: 280, damping: 18, mass: 0.25 });
  const sharedClassName = cn("group inline-flex min-h-12 items-center justify-center gap-2 px-5 text-sm font-medium tracking-[-0.02em] transition-colors duration-300", variants[variant], className);
  const move = (event: PointerEvent<HTMLElement>) => { const bounds = event.currentTarget.getBoundingClientRect(); x.set((event.clientX - (bounds.left + bounds.width / 2)) * 0.14); y.set((event.clientY - (bounds.top + bounds.height / 2)) * 0.14); };
  const reset = () => { x.set(0); y.set(0); };
  const content = <><span>{children}</span><span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">↗</span></>;
  if ("href" in props) return <motion.a {...props} data-cursor-label={label} className={sharedClassName} style={{ x: springX, y: springY }} onPointerMove={move} onPointerLeave={reset} whileTap={{ scale: 0.96 }}>{content}</motion.a>;
  return <motion.button {...props} data-cursor-label={label} className={sharedClassName} style={{ x: springX, y: springY }} onPointerMove={move} onPointerLeave={reset} whileTap={{ scale: 0.96 }}>{content}</motion.button>;
}
