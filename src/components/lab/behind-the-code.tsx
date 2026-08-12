"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CinematicVideo } from "@/components/ui/cinematic-video";
import { developmentVideos } from "@/lib/development-videos";
import { Eyebrow } from "@/components/ui/type";

export function BehindTheCode() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0.12, 0.52], [reduceMotion ? 1 : 0.84, 1]);
  const radius = useTransform(scrollYProgress, [0.12, 0.52], [reduceMotion ? 0 : 34, 0]);
  const clipPath = useTransform(scrollYProgress, [0.12, 0.52], ["inset(8% 9% 8% 9%)", "inset(0% 0% 0% 0%)"]);
  const y = useTransform(scrollYProgress, [0.12, 0.7], [reduceMotion ? 0 : 48, 0]);

  return <section ref={sectionRef} id="behind-code" className={`behind-code ${developmentVideos.length === 0 ? "is-empty" : ""}`} aria-labelledby="behind-code-title"><div className="behind-code-header"><Eyebrow>Behind the Code</Eyebrow><h2 id="behind-code-title">The work,<br />in motion.</h2><p>Real development sessions and product work, captured as it happens.</p></div>{developmentVideos.length > 0 && <div className="development-video-list">{developmentVideos.map((video, index) => <motion.figure key={video.slug} className="development-video-frame" style={index === 0 ? { scale, borderRadius: radius, clipPath, y } : undefined}><CinematicVideo src={video.src} poster={video.poster} alt={video.title} /><figcaption><span>{String(index + 1).padStart(2, "0")}</span><strong>{video.title}</strong><p>{video.caption}</p></figcaption></motion.figure>)}</div>}</section>;
}
