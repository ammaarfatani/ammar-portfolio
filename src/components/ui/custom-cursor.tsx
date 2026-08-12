"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [label, setLabel] = useState<string | null>(null); const [interactive, setInteractive] = useState(false);
  const x = useMotionValue(-100); const y = useMotionValue(-100);
  const smoothX = useSpring(x, { stiffness: 600, damping: 36, mass: 0.35 }); const smoothY = useSpring(y, { stiffness: 600, damping: 36, mass: 0.35 });
  useEffect(() => {
    const move = (event: PointerEvent) => { x.set(event.clientX); y.set(event.clientY); };
    const over = (event: PointerEvent) => { const target = (event.target as HTMLElement).closest<HTMLElement>("a, button, [data-cursor-label]"); setInteractive(Boolean(target)); setLabel(target?.dataset.cursorLabel ?? null); };
    window.addEventListener("pointermove", move); window.addEventListener("pointerover", over);
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerover", over); };
  }, [x, y]);
  return <motion.div className="custom-cursor" style={{ x: smoothX, y: smoothY }} animate={{ width: label ? 62 : interactive ? 30 : 10, height: label ? 62 : interactive ? 30 : 10 }}><span>{label}</span></motion.div>;
}
