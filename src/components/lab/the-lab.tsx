"use client";

import Link from "next/link";
import { ArrowUpRight, Cpu, Sparkles, Terminal, Activity, Layers } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow } from "@/components/ui/type";
import { experiments } from "@/lib/experiments";

export function TheLab() {
  const reduceMotion = useReducedMotion();

  // Fallback experiments if list is empty
  const labItems = experiments.length > 0 ? experiments : [
    {
      slug: "ai-agent-workflow",
      title: "Autonomous AI Agent Workflow",
      category: "AI & SYSTEM ARCHITECTURE",
      description: "Exploration into multi-agent task orchestration, real-time streaming state machines, and webhook triggers.",
      status: "ACTIVE EXPERIMENT",
      tech: ["AI / AUTOMATION / SYSTEMS"],
    },
    {
      slug: "webgl-shaders",
      title: "Interactive WebGL Shaders",
      category: "CREATIVE CODING & 3D",
      description: "Custom Fragment Shaders, torus knot deformations, and particle physics rendered with Three.js.",
      status: "PROTOTYPE",
      tech: ["WEBGL / THREE.JS"],
    },
    {
      slug: "realtime-audio-canvas",
      title: "Real-time Audio Visualizer",
      category: "EXPERIMENTAL UI",
      description: "Frequency domain audio analysis and dynamic canvas rendering for reactive user interfaces.",
      status: "EXPLORATORY",
      tech: ["AUDIO / CANVAS / WEB APIs"],
    },
  ];

  return (
    <section id="lab" className="the-lab bg-[#0a0a0a] text-neutral-200 py-28 px-4 sm:px-8 border-t border-white/10" aria-labelledby="lab-title">
      <div className="max-w-7xl mx-auto">
        
        {/* Left-aligned Editorial Header */}
        <header className="mb-16 border-b border-white/10 pb-10">
          <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-widest mb-3">
            <Sparkles size={14} />
            <span>Lab / Experiments</span>
          </div>

          <h2 id="lab-title" className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-4">
            The <span className="text-accent">Lab</span>
          </h2>

          <p className="text-neutral-400 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
            A digital playground for creative coding, AI agent workflows, WebGL experiments, and exploratory interface architecture.
          </p>
        </header>

        {/* Editorial Experiment Panels Stack (No 3-column generic grid!) */}
        <div className="space-y-12">
          {labItems.map((item, index) => {
            const itemNumber = String(index + 1).padStart(2, "0");
            
            return (
              <motion.article
                key={item.slug}
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-[#111315] border border-white/10 rounded-2xl overflow-hidden hover:border-accent/40 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 shadow-2xl"
              >
                {/* Left Side: Editorial Details */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-accent uppercase tracking-widest font-bold">
                        {itemNumber} / EXPERIMENT
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Activity size={12} className="text-accent" /> {item.status || "ACTIVE"}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-4 group-hover:text-accent group-hover:translate-x-1.5 transition-all duration-300">
                      {item.title}
                    </h3>

                    <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light mb-6">
                      {item.description}
                    </p>
                  </div>

                  <div>
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.tech?.map((t) => (
                        <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-mono text-neutral-300 tracking-wider">
                          TECH: {t}
                        </span>
                      ))}
                    </div>

                    {/* Interactive Action Link */}
                    <Link
                      href={`/lab/${item.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent group-hover:underline"
                    >
                      Open Experiment <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Right Side: Interactive Playground Visual Graphic Frame */}
                <div className="lg:col-span-6 relative aspect-video w-full rounded-xl overflow-hidden bg-black/90 border border-white/10 flex flex-col justify-between p-6 group-hover:border-accent/30 transition-colors">
                  
                  {/* Decorative Code / System Matrix Header */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 border-b border-white/10 pb-3">
                    <span className="flex items-center gap-2">
                      <Terminal size={14} className="text-accent" /> system_process_0{index + 1}.exec()
                    </span>
                    <span className="text-accent">ONLINE</span>
                  </div>

                  {/* Visual Simulation Graphics */}
                  <div className="my-auto py-4 flex flex-col items-center justify-center text-center space-y-3">
                    <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-500">
                      <Layers size={24} />
                    </div>
                    <span className="text-xs font-mono text-neutral-400 tracking-widest uppercase">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Interactive Engine Ready</span>
                    </div>
                  </div>

                  {/* Micro Visual Footer */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 pt-3 border-t border-white/10">
                    <span>STATUS: 200 OK</span>
                    <span>RENDER: 60 FPS</span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
