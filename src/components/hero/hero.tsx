"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { stackSkills } from "@/lib/stack-data";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Fallback if browser restricts autoplay
      });
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="hero" aria-labelledby="hero-title">
      {/* LAYER 0: Background Video */}
      <video
        ref={videoRef}
        className="hero-video-bg"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/hero/hero-video.mp4" type="video/mp4" />
      </video>

      {/* LAYER 1: Subtle Dark Overlay */}
      <div className="hero-video-overlay" aria-hidden="true" />

      {/* LAYER 2: Main Editorial Content */}
      <div className="hero-inner">
        <motion.div
          className="hero-main-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow Label */}
          <motion.div className="hero-eyebrow" variants={itemVariants}>
            <span className="hero-eyebrow-dot" />
            <span className="hero-eyebrow-text">Full-Stack &amp; AI Developer</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 id="hero-title" className="hero-title" variants={itemVariants}>
            Building <br />
            digital <br />
            <span className="hero-title-accent">experiences.</span>
          </motion.h1>

          {/* Short Description */}
          <motion.p className="hero-copy" variants={itemVariants}>
            I build modern web experiences, full-stack applications and digital systems that turn ideas into useful products.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div className="hero-actions" variants={itemVariants}>
            <MagneticButton href="#work" label="Explore">
              View My Work &rarr;
            </MagneticButton>
            <MagneticButton href="#contact" label="Open" variant="secondary">
              Let&apos;s Talk
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Right Side: Statistic Cards Panel */}
        <motion.div
          className="hero-side-panel"
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45, duration: 0.55, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div className="hero-stat-card">
            <span className="hero-stat-label">Experience</span>
            <strong className="hero-stat-value">1–1.5</strong>
            <small className="hero-stat-sub">Years</small>
          </div>

          <div className="hero-stat-card">
            <span className="hero-stat-label">Projects</span>
            <strong className="hero-stat-value">30–35+</strong>
            <small className="hero-stat-sub">Completed</small>
          </div>

          <div className="hero-stat-card">
            <span className="hero-stat-label">Clients</span>
            <strong className="hero-stat-value">15–20+</strong>
            <small className="hero-stat-sub">Worldwide</small>
          </div>
        </motion.div>
      </div>

      {/* Bottom Footer / Scroll Indicator */}
      <div className="hero-footer" aria-hidden="true">
        <div className="hero-scroll-indicator">
          <span>Scroll to explore</span>
          <span className="hero-scroll-arrow">&darr;</span>
        </div>
        <div className="hero-index-label">
          <span>01 &mdash; 12</span>
        </div>
      </div>
    </section>
  );
}


