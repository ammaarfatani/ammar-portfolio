"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { CinematicVideo } from "@/components/ui/cinematic-video";
import { projects, filterCategories, type FilterCategory } from "@/lib/projects";

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("ALL");

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === "ALL") return true;
    return project.filterCategory === activeCategory;
  });

  return (
    <div className="site-shell bg-[#0a0a0a] text-neutral-200 min-h-screen">
      <Navigation />
      <main id="main-content" className="work-page py-24 px-4 sm:px-8 max-w-7xl mx-auto" tabIndex={-1}>
        
        {/* Header Section */}
        <header className="mb-16 border-b border-white/10 pb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <span className="text-accent text-xs font-mono uppercase tracking-widest block mb-3">
                Project Archive / Showreel
              </span>
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-4">
                All Works
              </h1>
              <p className="text-neutral-400 max-w-2xl text-base sm:text-lg font-light">
                A collection of selected digital experiences, interfaces and systems I&apos;ve designed and built.
              </p>
            </div>

            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300 self-start md:self-auto">
              <strong className="text-accent">{projects.length} PROJECTS</strong> / WEB / PRODUCT / FULL-STACK
            </div>
          </div>

          {/* Minimal Filter Navigation */}
          <div className="flex flex-wrap gap-2 pt-4">
            {filterCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-accent text-black font-semibold shadow-lg shadow-accent/20"
                    : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </header>

        {/* Editorial Video Showreel (Alternating Layout) */}
        <div className="space-y-24">
          {filteredProjects.map((project, index) => {
            const isEven = index % 2 === 0;
            const projectNumber = String(index + 1).padStart(2, "0");

            return (
              <article
                key={project.id}
                className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center border-b border-white/10 pb-20"
              >
                {/* Large Video Preview Frame */}
                <div
                  className={`lg:col-span-7 ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-black/80 shadow-2xl group-hover:border-accent/40 transition-colors duration-500">
                    {project.video ? (
                      <CinematicVideo
                        src={project.video}
                        poster={project.screenshots[0]}
                        alt={`${project.title} screen recording showcase`}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                      />
                    ) : project.screenshots[0] ? (
                      <img
                        src={project.screenshots[0]}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-600 font-mono text-sm">
                        {project.title}
                      </div>
                    )}
                  </div>
                </div>

                {/* Project Metadata & Content */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-center space-y-6 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div>
                    {/* Index & Category */}
                    <div className="flex items-center gap-3 text-xs font-mono text-neutral-500 uppercase tracking-widest mb-3">
                      <span className="text-accent font-bold text-sm group-hover:text-accent transition-colors">
                        {projectNumber}
                      </span>
                      <span>/</span>
                      <span className="text-neutral-400">{project.category}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-4 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300">
                      {project.title}
                    </h2>

                    {/* Description */}
                    <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light mb-6">
                      {project.shortDescription}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-mono text-neutral-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Case Study Link */}
                  <div>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/15 text-xs font-mono uppercase tracking-wider text-white hover:bg-accent hover:text-black hover:border-accent transition-all duration-300 group-hover:shadow-lg group-hover:shadow-accent/10"
                    >
                      View Case Study <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Minimal Footer Transition */}
        <section className="mt-24 pt-16 text-center border-t border-white/10">
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
            That&apos;s the archive.
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Have a project in mind?
          </h3>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-accent text-black font-semibold text-xs font-mono uppercase tracking-wider hover:opacity-90 transition-opacity shadow-lg shadow-accent/20"
          >
            Contact Me <ArrowRight size={15} />
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
