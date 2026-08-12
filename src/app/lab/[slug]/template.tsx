"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function LabTemplate({ children }: { children: ReactNode }) { return <motion.div initial={{ opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>; }
