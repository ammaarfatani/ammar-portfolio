"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Cpu, Sparkles, Terminal } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { PointerEvent } from "react";
import type { Experiment } from "@/lib/experiments";

export function ExperimentCard({ experiment, index }: { experiment: Experiment; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(x, { stiffness: 150, damping: 20 });

  const move = (event: PointerEvent<HTMLAnchorElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set(-((event.clientX - bounds.left) / bounds.width - 0.5) * 6);
    y.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 6);
  };

  return (
    <Link
      href={`/lab/${experiment.slug}`}
      className="group block relative"
      data-cursor-label="Explore"
      onPointerMove={move}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.article
        style={{ rotateX, rotateY }}
        className="h-full bg-neutral-900/60 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-accent/50 transition-all duration-300 backdrop-blur-md shadow-xl relative overflow-hidden"
      >
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-accent uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles size={12} /> {experiment.category}
            </span>
            <span className="text-xs font-mono text-neutral-500">
              EXP 0{index + 1}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-accent transition-colors flex items-center justify-between">
            {experiment.title}
            <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
          </h3>

          {/* Description */}
          <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-light">
            {experiment.description}
          </p>
        </div>

        {/* Bottom Specs & Status */}
        <div>
          {experiment.tech && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {experiment.tech.map((t) => (
                <span key={t} className="px-2.5 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] font-mono text-neutral-300">
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-500">
            <span className="flex items-center gap-1.5 text-accent">
              <Cpu size={13} /> {experiment.status || "ACTIVE EXPERIMENT"}
            </span>
            <span className="group-hover:text-white transition-colors">
              Explore Lab &rarr;
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
