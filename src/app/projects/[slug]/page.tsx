import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, FolderGit2 } from "lucide-react";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { CinematicVideo } from "@/components/ui/cinematic-video";
import { getProject, projects } from "@/lib/projects";
import { ProjectCta } from "@/components/work/project-cta";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project
    ? {
        title: `${project.title} — Case Study`,
        description: project.shortDescription,
      }
    : {};
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  // Find previous and next project for bottom navigation
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];

  const mainVisual = project.video ? (
    <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black">
      <CinematicVideo src={project.video} poster={project.screenshots[0]} alt={`${project.title} project showcase`} />
    </div>
  ) : project.screenshots[0] ? (
    <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-neutral-900">
      <Image src={project.screenshots[0]} alt={project.title} fill className="object-cover" priority sizes="(max-width: 1200px) 100vw, 1200px" />
    </div>
  ) : null;

  return (
    <div className="site-shell bg-[#0a0a0a] text-neutral-200 min-h-screen">
      <Navigation />
      <main id="main-content" className="case-study-page py-20 px-4 sm:px-8 max-w-5xl mx-auto" tabIndex={-1}>
        
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-12">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-accent transition-colors"
          >
            <ArrowLeft size={14} /> Back to Works
          </Link>

          <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
            Project <span className="text-accent font-semibold">{project.number}</span> / {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        {/* Header Section */}
        <header className="mb-14">
          <div className="flex items-center gap-3 text-xs font-mono text-accent uppercase tracking-widest mb-4">
            <span>{project.number}</span>
            <span>/</span>
            <span>Selected Work</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-neutral-300 max-w-3xl leading-relaxed mb-10 font-light">
            {project.shortDescription}
          </p>

          {/* Structured Metadata Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-y border-white/10 text-xs font-mono mb-12">
            <div>
              <span className="text-neutral-500 uppercase tracking-wider block mb-2">Role</span>
              <span className="text-neutral-200 font-medium block">{project.role.join(" / ")}</span>
            </div>
            <div>
              <span className="text-neutral-500 uppercase tracking-wider block mb-2">Tech Stack</span>
              <span className="text-neutral-200 font-medium block">{project.technologies.join(" / ")}</span>
            </div>
            <div>
              <span className="text-neutral-500 uppercase tracking-wider block mb-2">Category</span>
              <span className="text-accent font-medium block">{project.category}</span>
            </div>
          </div>

          {/* Main Visual */}
          {mainVisual && <div className="mb-16">{mainVisual}</div>}
        </header>

        {/* Case Study Content Breakdown */}
        <div className="space-y-16">
          
          {/* Overview */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-white/10 pb-12">
            <div className="md:col-span-4">
              <h2 className="text-xs font-mono text-accent uppercase tracking-widest">Overview</h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-light">
                {project.shortDescription}
              </p>
            </div>
          </section>

          {/* Role */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-white/10 pb-12">
            <div className="md:col-span-4">
              <h2 className="text-xs font-mono text-accent uppercase tracking-widest">My Role</h2>
            </div>
            <div className="md:col-span-8">
              <ul className="space-y-2 text-neutral-300 text-sm sm:text-base font-mono">
                {project.role.map((r, i) => (
                  <li key={r} className="flex items-center gap-3">
                    <span className="text-accent text-xs">0{i + 1}</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Minimal Tech Stack Specification List */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-white/10 pb-12">
            <div className="md:col-span-4">
              <h2 className="text-xs font-mono text-accent uppercase tracking-widest">Tech Specification</h2>
            </div>
            <div className="md:col-span-8">
              <div className="divide-y divide-white/10 border-y border-white/10">
                {project.technologies.map((tech, idx) => (
                  <div key={tech} className="py-3 flex items-center justify-between font-mono text-xs sm:text-sm">
                    <span className="text-accent">0{idx + 1}</span>
                    <span className="text-neutral-400 uppercase tracking-wider">Technology</span>
                    <span className="text-white font-medium">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Key Features */}
          {project.features && project.features.length > 0 && (
            <section className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-white/10 pb-12">
              <div className="md:col-span-4">
                <h2 className="text-xs font-mono text-accent uppercase tracking-widest">Key Features</h2>
              </div>
              <div className="md:col-span-8">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-neutral-300 font-light">
                      <span className="text-accent font-mono text-xs mt-0.5">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* The Challenge */}
          {project.caseStudy?.challenge && (
            <section className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-white/10 pb-12">
              <div className="md:col-span-4">
                <h2 className="text-xs font-mono text-accent uppercase tracking-widest">The Challenge</h2>
              </div>
              <div className="md:col-span-8">
                <p className="text-neutral-300 leading-relaxed text-base sm:text-lg font-light">
                  {project.caseStudy.challenge}
                </p>
              </div>
            </section>
          )}

          {/* The Approach */}
          {project.caseStudy?.approach && (
            <section className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-white/10 pb-12">
              <div className="md:col-span-4">
                <h2 className="text-xs font-mono text-accent uppercase tracking-widest">The Approach</h2>
              </div>
              <div className="md:col-span-8">
                <p className="text-neutral-300 leading-relaxed text-base sm:text-lg font-light">
                  {project.caseStudy.approach}
                </p>
              </div>
            </section>
          )}

          {/* The Result */}
          {project.caseStudy?.result && (
            <section className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-white/10 pb-12">
              <div className="md:col-span-4">
                <h2 className="text-xs font-mono text-accent uppercase tracking-widest">The Result / Impact</h2>
              </div>
              <div className="md:col-span-8">
                <p className="text-neutral-300 leading-relaxed text-base sm:text-lg font-light">
                  {project.caseStudy.result}
                </p>
              </div>
            </section>
          )}

          {/* Screenshots Presentation (if present) */}
          {project.screenshots && project.screenshots.length > 0 && (
            <section className="space-y-8 pt-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h2 className="text-xs font-mono text-accent uppercase tracking-widest">Project Visuals</h2>
                <span className="text-xs font-mono text-neutral-500">{project.screenshots.length} Images</span>
              </div>
              <div className="space-y-8">
                {project.screenshots.map((shot, idx) => (
                  <div key={idx} className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/10 bg-neutral-900 shadow-xl">
                    <Image src={shot} alt={`${project.title} screenshot ${idx + 1}`} fill className="object-cover" sizes="(max-width: 1200px) 100vw, 1200px" />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Reusable Case Study Ending & Next Project Navigation */}
        <ProjectCta nextProject={nextProject} />
      </main>
      <Footer />
    </div>
  );
}
