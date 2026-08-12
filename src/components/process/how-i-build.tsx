"use client";

import Image from "next/image";
import { motion, AnimatePresence, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/type";
import { ArrowDown, CheckCircle2 } from "lucide-react";

type ProcessStep = {
  number: string;
  phase: string;
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  image: string;
  alt: string;
};

const steps: ProcessStep[] = [
  {
    number: "01",
    phase: "PHASE 01 — PRODUCT DISCOVERY",
    title: "DISCOVER",
    subtitle: "Understanding the problem, users, and product direction.",
    description: "Understand the idea, audience and requirements before development begins. I analyze goals, map user flows, and establish clear project parameters.",
    points: ["REQUIREMENTS", "USER FLOWS", "PRODUCT DIRECTION"],
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200&auto=format&fit=crop",
    alt: "Product discovery research and UX planning",
  },
  {
    number: "02",
    phase: "PHASE 02 — SYSTEM ARCHITECTURE",
    title: "PLAN",
    subtitle: "Turning requirements into structure & technical direction.",
    description: "Turn the idea into a clear product structure and technical direction. I design database schemas, API contracts, and scalable architecture.",
    points: ["UX STRUCTURE", "ARCHITECTURE", "TECHNICAL PLANNING"],
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
    alt: "System architecture and technical planning",
  },
  {
    number: "03",
    phase: "PHASE 03 — FULL-STACK ENGINEERING",
    title: "BUILD",
    subtitle: "Translating approved direction into production code.",
    description: "Translate the approved direction into a functional digital product. I write clean, maintainable frontend and backend code with robust API integrations.",
    points: ["FRONTEND", "BACKEND", "INTEGRATION"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    alt: "Developer writing full-stack production code",
  },
  {
    number: "04",
    phase: "PHASE 04 — QUALITY & DEPLOYMENT",
    title: "REFINE",
    subtitle: "Polishing experience, accessibility & production readiness.",
    description: "Test, polish and prepare the product for a real-world launch. I perform responsive QA, optimize load speeds, and verify production environments.",
    points: ["RESPONSIVE QA", "PERFORMANCE", "FINAL POLISH"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    alt: "Polished interface quality assurance and launch dashboard",
  },
];

export function HowIBuild() {
  const sectionRef = useRef<HTMLElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map scroll progress (0 to 1) to active step index (0 to 3)
    const next = Math.min(steps.length - 1, Math.floor(latest * steps.length));
    if (next !== activeRef.current) {
      activeRef.current = next;
      setActive(next);
    }
  });

  const goTo = useCallback((index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const distance = Math.max(0, section.offsetHeight - window.innerHeight);
    const targetScroll = sectionTop + (distance * index) / (steps.length - 1);
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  }, []);

  const activeStep = steps[active];

  return (
    <section
      id="process"
      ref={sectionRef}
      className="how-i-build relative bg-[#0d0f11] text-neutral-200"
      aria-labelledby="process-title"
      tabIndex={-1}
      onKeyDown={(event) => {
        if (event.key === "ArrowDown" || event.key === "ArrowRight") {
          event.preventDefault();
          goTo(Math.min(steps.length - 1, active + 1));
        }
        if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
          event.preventDefault();
          goTo(Math.max(0, active - 1));
        }
      }}
    >
      {/* Desktop Sticky Container */}
      <div className="hidden md:block sticky top-0 h-screen w-full overflow-hidden">
        <div className="max-w-7xl mx-auto h-full px-6 lg:px-12 grid grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Introduction & Step List */}
          <div className="col-span-5 flex flex-col justify-between h-[75vh] py-4">
            <div>
              <Eyebrow>How I Build</Eyebrow>

              <h2
                id="process-title"
                className="text-3xl lg:text-5xl font-bold tracking-tight text-white mt-4 mb-4 leading-tight uppercase"
              >
                How I <span className="text-accent">Build</span><br />
                <span className="text-neutral-400 font-light">From Idea To Real Product.</span>
              </h2>

              <p className="text-neutral-400 text-sm lg:text-base leading-relaxed mb-6 max-w-md font-light">
                I turn ideas and requirements into polished, scalable digital products through a structured development process.
              </p>

              <button
                type="button"
                onClick={() => goTo(Math.min(steps.length - 1, active + 1))}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-300 hover:text-accent border-b border-white/20 hover:border-accent pb-1 transition-all duration-300 mb-8"
              >
                Explore My Process <ArrowDown size={14} className="text-accent" />
              </button>
            </div>

            {/* Step Navigation List */}
            <nav className="space-y-3" aria-label="Process steps">
              {steps.map((step, index) => {
                const isActive = active === index;
                return (
                  <button
                    key={step.number}
                    type="button"
                    onClick={() => goTo(index)}
                    className={`w-full flex items-center gap-4 py-2 px-3 rounded-lg text-left transition-all duration-300 font-mono text-xs tracking-wider uppercase ${
                      isActive
                        ? "bg-white/10 text-white border-l-2 border-accent shadow-sm"
                        : "text-neutral-500 hover:text-neutral-300 hover:bg-white/5"
                    }`}
                  >
                    <span className={isActive ? "text-accent font-bold" : "text-neutral-600"}>
                      {step.number}
                    </span>
                    <span className="font-medium">{step.title}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Column: Active Process Panel (Single Dominant Card) */}
          <div className="col-span-6 relative h-[75vh] flex items-center justify-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={activeStep.number}
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full bg-[#141719] border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full justify-between"
              >
                {/* Upper Half: Editorial Image Visual */}
                <div className="relative aspect-[16/9] w-full bg-neutral-900 overflow-hidden border-b border-white/10 shrink-0">
                  <Image
                    src={activeStep.image}
                    alt={activeStep.alt}
                    fill
                    sizes="(max-width: 1200px) 50vw, 600px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    priority
                  />
                  {/* Subtle Top & Bottom Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141719] via-transparent to-black/40" />

                  {/* Micro Metadata Badge */}
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-[10px] font-mono text-accent tracking-widest uppercase">
                    {activeStep.phase}
                  </div>
                </div>

                {/* Lower Half: Copy & Specification Points */}
                <div className="p-6 lg:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-accent tracking-widest">
                        {activeStep.number} / 04
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                        System Build Step
                      </span>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight mb-2 uppercase">
                      {activeStep.title}
                    </h3>

                    <p className="text-xs lg:text-sm font-mono text-neutral-400 mb-3">
                      {activeStep.subtitle}
                    </p>

                    <p className="text-neutral-300 text-sm leading-relaxed font-light mb-6">
                      {activeStep.description}
                    </p>
                  </div>

                  {/* Key Feature Points */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                    {activeStep.points.map((point) => (
                      <span
                        key={point}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-md text-[11px] font-mono text-neutral-200 tracking-wider"
                      >
                        <span className="text-accent font-bold">+</span> {point}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          {/* Far Right: Step Indicator */}
          <div className="col-span-1 flex flex-col items-center justify-center space-y-4">
            {steps.map((step, index) => {
              const isActive = active === index;
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => goTo(index)}
                  className="group flex flex-col items-center"
                  aria-label={`Go to step ${step.number}`}
                >
                  <span
                    className={`text-[11px] font-mono transition-colors ${
                      isActive ? "text-accent font-bold" : "text-neutral-600 group-hover:text-neutral-400"
                    }`}
                  >
                    {step.number}
                  </span>
                  <div
                    className={`w-0.5 h-6 transition-all my-1 ${
                      isActive ? "bg-accent scale-y-110" : "bg-white/10 group-hover:bg-white/30"
                    }`}
                  />
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* Mobile Vertical Process List (<768px) */}
      <div className="block md:hidden py-16 px-4">
        <div className="mb-10 text-center">
          <Eyebrow>How I Build</Eyebrow>
          <h2 className="text-3xl font-bold tracking-tight text-white mt-2 uppercase">
            How I <span className="text-accent">Build</span><br />
            <span className="text-neutral-400 font-light">From Idea To Real Product.</span>
          </h2>
          <p className="text-neutral-400 text-sm mt-3 font-light max-w-sm mx-auto">
            I turn ideas and requirements into polished, scalable digital products through a structured development process.
          </p>
        </div>

        <div className="space-y-8">
          {steps.map((step) => (
            <article
              key={step.number}
              className="bg-[#141719] border border-white/15 rounded-xl overflow-hidden shadow-lg"
            >
              <div className="relative aspect-video w-full bg-neutral-900">
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/15 text-[10px] font-mono text-accent">
                  {step.number} — {step.title}
                </div>
              </div>

              <div className="p-5">
                <span className="text-[10px] font-mono text-accent uppercase tracking-widest block mb-1">
                  {step.phase}
                </span>
                <h3 className="text-xl font-bold text-white mb-2 uppercase">{step.title}</h3>
                <p className="text-neutral-300 text-xs leading-relaxed font-light mb-4">
                  {step.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                  {step.points.map((point) => (
                    <span
                      key={point}
                      className="px-2.5 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] font-mono text-neutral-300"
                    >
                      + {point}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
