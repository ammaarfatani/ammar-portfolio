"use client";

import { motion, useReducedMotion } from "framer-motion";
import { experience, education } from "@/lib/profile-data";
import { Briefcase, GraduationCap, Calendar, CheckCircle2 } from "lucide-react";

export function ExperienceEducation() {
  const reduceMotion = useReducedMotion();

  // Combine experience and education into a unified chronological sequence
  const timeline = [
    {
      id: "exp-1",
      number: "01",
      year: "2025",
      type: "EXPERIENCE",
      title: "THE TECH IO",
      role: "React Developer",
      detail: "Freelance",
      icon: Briefcase,
    },
    {
      id: "exp-2",
      number: "02",
      year: "2025",
      type: "EXPERIENCE",
      title: "AYKAYS",
      role: "Frontend Developer Intern",
      detail: "React & Next.js Development",
      icon: Briefcase,
    },
    {
      id: "edu-1",
      number: "03",
      year: "2023–2026",
      type: "EDUCATION",
      title: "Aptech International Institute",
      role: "ACCP PRO",
      detail: "Diploma in Software Engineering",
      icon: GraduationCap,
    },
  ];

  return (
    <section
      id="experience"
      className="experience-education bg-[#0d0f11] text-neutral-200 py-28 px-4 sm:px-8 border-t border-white/10"
      aria-labelledby="experience-title"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column (35-40% Width): Left-Aligned Editorial Introduction */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span>Career / Journey</span>
          </div>

          {/* Left-Aligned Heading with Lime Accent */}
          <h2 id="experience-title" className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight uppercase">
            Education &amp;<br />
            <span className="text-accent">Experience</span>
          </h2>

          <p className="text-neutral-400 text-base sm:text-lg font-light leading-relaxed max-w-md">
            A chronological timeline of my formal education, software engineering diploma, and development experience in software and web applications.
          </p>

          <div className="pt-4 border-t border-white/10 flex items-center gap-6 font-mono text-xs text-neutral-500">
            <div>
              <strong className="text-white block text-lg font-bold">1–1.5</strong>
              <span>Years Experience</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <strong className="text-accent block text-lg font-bold">30+</strong>
              <span>Projects Completed</span>
            </div>
          </div>
        </div>

        {/* Right Column (60-65% Width): Refined Editorial Timeline */}
        <div className="lg:col-span-7 relative border-l border-white/15 pl-6 sm:pl-10 space-y-12 my-auto">
          {timeline.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.id}
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="group relative"
              >
                {/* Timeline Connected Spine Indicator (Not a generic heavy card!) */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-[#0d0f11] border-2 border-neutral-600 group-hover:border-accent group-hover:bg-accent/20 transition-all duration-300 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 group-hover:bg-accent transition-colors" />
                </div>

                {/* Entry Content */}
                <div className="space-y-3 pb-8 border-b border-white/10">
                  {/* Top Meta: Step Number, Year & Type */}
                  <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                    <div className="flex items-center gap-3">
                      <span className="text-accent font-bold text-sm">
                        {item.number}
                      </span>
                      <span className="text-neutral-500">/</span>
                      <span className="text-neutral-400 tracking-wider">
                        {item.type}
                      </span>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-[11px] font-medium flex items-center gap-1.5">
                      <Calendar size={12} className="text-accent" /> {item.year}
                    </span>
                  </div>

                  {/* Title & Role */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-base sm:text-lg text-neutral-300 font-mono mt-1">
                      {item.role}
                    </p>
                  </div>

                  {/* Qualification Detail */}
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 pt-1">
                    <CheckCircle2 size={14} className="text-accent shrink-0" />
                    <span>{item.detail}</span>
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
