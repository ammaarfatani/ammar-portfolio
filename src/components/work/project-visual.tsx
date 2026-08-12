"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { PointerEvent } from "react";
import type { Project } from "@/lib/projects";
import { CinematicVideo } from "@/components/ui/cinematic-video";

export function ProjectVisual({ project }: { project: Project }) {
  const pointerX = useMotionValue(0); const pointerY = useMotionValue(0);
  const rotateX = useSpring(pointerY, { stiffness: 120, damping: 18 });
  const rotateY = useSpring(pointerX, { stiffness: 120, damping: 18 });
  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 4);
    pointerY.set(-((event.clientY - bounds.top) / bounds.height - 0.5) * 4);
  };

  return <motion.div className="project-visual" onPointerMove={onMove} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }} style={{ rotateX, rotateY }} initial={{ clipPath: "inset(10% 0 10% 0)", scale: 1.07, opacity: 0 }} whileInView={{ clipPath: "inset(0% 0 0% 0)", scale: 1, opacity: 1 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
    {project.video ? <CinematicVideo className="project-media" src={project.video} poster={project.image} alt={`${project.title} project preview`} /> : project.image ? <Image className="project-media" src={project.image} alt={`${project.title} project preview`} fill sizes="(max-width: 768px) 100vw, 85vw" /> : <div className="project-media-fallback" aria-hidden><span>{project.title.slice(0, 1)}</span></div>}
    <div className="project-visual-shade" />
  </motion.div>;
}
