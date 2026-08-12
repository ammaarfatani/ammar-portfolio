"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, MessageCircle, Sparkles } from "lucide-react";
import type { Project } from "@/lib/projects";

type ProjectCtaProps = {
  nextProject?: Project;
};

export function ProjectCta({ nextProject }: ProjectCtaProps) {
  return (
    <div className="space-y-16 mt-20 pt-16 border-t border-white/10">
      {/* Editorial Next Project Link */}
      {nextProject && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl">
          <div>
            <span className="text-[11px] font-mono text-accent uppercase tracking-widest block mb-1">
              NEXT PROJECT
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {nextProject.title}
            </h3>
            <p className="text-xs text-neutral-400 font-mono mt-0.5">
              {nextProject.category}
            </p>
          </div>

          <Link
            href={`/work/${nextProject.slug}`}
            className="group px-5 py-2.5 bg-accent text-black font-mono text-xs font-bold rounded-lg hover:brightness-110 transition-all flex items-center gap-2 uppercase tracking-wider shrink-0"
          >
            <span>Explore Next Case Study</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}

      {/* Reusable Final Case Study CTA */}
      <section className="bg-[#111315] border border-white/10 rounded-2xl p-8 sm:p-12 space-y-8 relative overflow-hidden shadow-2xl">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-widest">
            <Sparkles size={14} />
            <span>Project Inquiry / Collaboration</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase leading-tight">
            Have a project in mind?<br />
            Let&apos;s build<br />
            <span className="text-accent">The right thing.</span>
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base font-light max-w-xl leading-relaxed">
            Ready to turn your vision into an art-directed, high-performance web product? Let&apos;s discuss scope, architecture, and timeline.
          </p>
        </div>

        {/* Dual Primary & WhatsApp CTAs */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            href="/#contact"
            className="group px-6 py-3 bg-accent text-black font-mono text-xs font-bold rounded-lg hover:brightness-110 transition-all flex items-center gap-2 uppercase tracking-wider shadow-lg"
          >
            <span>Start A Project</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href="https://wa.me/923362567192"
            target="_blank"
            rel="noreferrer"
            className="group px-6 py-3 bg-white/5 border border-white/15 rounded-lg hover:border-accent hover:bg-white/10 transition-all flex items-center gap-2 text-xs font-mono font-bold text-white hover:text-accent uppercase tracking-wider"
          >
            <MessageCircle size={14} className="text-accent" />
            <span>WhatsApp Me</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </section>
    </div>
  );
}
