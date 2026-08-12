"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ProjectPreview } from "@/components/projects/project-preview";
import type { Project } from "@/lib/projects";

export function WorkSlider({ projects }: { projects: Project[] }) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const activeProject = projects[activeIndex];
  const move = useCallback((nextDirection: number) => {
    setDirection(nextDirection);
    setActiveIndex((current) => (current + nextDirection + projects.length) % projects.length);
  }, [projects.length]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [move]);

  if (!activeProject) return null;
  const transition = { duration: reduceMotion ? 0.01 : 0.55, ease: [0.16, 1, 0.3, 1] as const };

  return <section className="work-slider" aria-label="Selected projects">
    <AnimatePresence mode="wait" initial={false} custom={direction}>
      <motion.article key={activeProject.id} className="work-slide" custom={direction} initial={{ opacity: 0, x: reduceMotion ? 0 : direction * 36, clipPath: "inset(0 0 8% 0)" }} animate={{ opacity: 1, x: 0, clipPath: "inset(0 0 0% 0)" }} exit={{ opacity: 0, x: reduceMotion ? 0 : direction * -28, scale: 0.985, clipPath: "inset(8% 0 0 0)" }} transition={transition}>
        <motion.div className="work-slider-visual" drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.12} onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 54) move(info.offset.x > 0 ? -1 : 1); }}>
          <ProjectPreview project={activeProject} className="work-slider-preview" playVideo />
        </motion.div>
        <div className="work-slider-copy"><span>{activeProject.category}</span><h2>{activeProject.title}</h2><p>{activeProject.shortDescription}</p><Link href={`/work/${activeProject.slug}`}>View case study <ArrowRight size={16} /></Link></div>
      </motion.article>
    </AnimatePresence>
    <div className="work-slider-controls"><button type="button" onClick={() => move(-1)} aria-label="Previous project"><ArrowLeft size={18} /><span>Previous</span></button><p aria-live="polite"><strong>{String(activeIndex + 1).padStart(2, "0")}</strong> / {String(projects.length).padStart(2, "0")}</p><button type="button" onClick={() => move(1)} aria-label="Next project"><span>Next</span><ArrowRight size={18} /></button></div>
  </section>;
}
