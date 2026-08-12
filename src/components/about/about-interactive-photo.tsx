"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { MouseEvent, useRef } from "react";

export function AboutInteractivePhoto({ focus }: { focus: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Normalized mouse coordinates (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for 3D tilt
  const springConfig = { damping: 25, stiffness: 180, mass: 0.6 };
  
  // Rotate towards mouse position
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  // Subtle parallax translation
  const imageX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  const imageY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || reduceMotion) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      className="about-photo-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="about-photo-card"
        style={
          reduceMotion
            ? {}
            : {
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }
        }
        whileHover={reduceMotion ? {} : { scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Subtle Ambient Glow Behind Photo */}
        <div className="about-photo-ambient-glow" />

        {/* Photo Container with Parallax Effect */}
        <motion.div
          className="about-photo-image-container"
          style={reduceMotion ? {} : { x: imageX, y: imageY, transform: "translateZ(25px)" }}
        >
          <Image
            src="/images/ammar-personal.png"
            alt="Ammar Fatani - Developer Profile"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px"
            className="about-photo-image"
            priority
          />
          <div className="about-photo-overlay-gradient" />
        </motion.div>

        {/* Subtle Glass Border Frame */}
        <div className="about-photo-glass-frame" />

        {/* Dynamic Focus Tag */}
        <motion.div
          className="about-photo-status-tag"
          style={reduceMotion ? {} : { transform: "translateZ(40px)" }}
        >
          <span className="about-photo-status-dot" />
          <span className="about-photo-status-text">{focus || "Full-Stack System Focus"}</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
