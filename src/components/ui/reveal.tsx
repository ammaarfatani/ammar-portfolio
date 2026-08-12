"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type RevealProps = Omit<HTMLMotionProps<"div">, "children"> & { children: ReactNode; delay?: number };
export function Reveal({ children, className, delay = 0, ...props }: RevealProps) {
  const reduceMotion = useReducedMotion();
  return <motion.div {...props} className={cn(className)} initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: reduceMotion ? 0.01 : 0.65, delay, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>;
}
