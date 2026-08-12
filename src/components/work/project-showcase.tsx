"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import type { Project } from "@/lib/projects";

const ProjectVisual = dynamic(() => import("@/components/work/project-visual").then((module) => module.ProjectVisual), { ssr: false, loading: () => <div className="project-visual-loading" /> });

type ProjectShowcaseProps = { project: Project; index: number };

export function ProjectShowcase({ project, index }: ProjectShowcaseProps) {
  const projectNumber = String(index + 1).padStart(2, "0");

  return (
    <article className="project-showcase">
      <div className="project-visual-link" data-cursor-label="View">
        <ProjectVisual project={project} />
        <Link href={`/projects/${project.slug}`} className="project-visual-navigation" aria-label={`View ${project.title} project`} />
        <span className="project-hover-state">View project <ArrowUpRight size={18} /></span>
      </div>
      <div className="project-copy">
        <div className="project-index"><span>{projectNumber}</span><span>{project.category}</span></div>
        <div className="project-summary"><h3>{project.title}</h3><p>{project.shortDescription}</p></div>
        <div className="project-footer"><ul aria-label={`${project.title} technologies`}>{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul><div className="project-actions"><Link href={`/projects/${project.slug}`}>Case study <ArrowUpRight size={15} /></Link>{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={15} /></a>}{project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer">GitHub <FolderGit2 size={14} /></a>}</div></div>
      </div>
    </article>
  );
}
