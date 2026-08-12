import Image from "next/image";
import { CinematicVideo } from "@/components/ui/cinematic-video";
import type { Project } from "@/lib/projects";

type ProjectPreviewProps = {
  project: Project;
  className?: string;
  playVideo?: boolean;
  priority?: boolean;
};

export function ProjectPreview({ project, className, playVideo = false, priority = false }: ProjectPreviewProps) {
  const still = project.screenshots?.[0] ?? project.thumbnail ?? project.poster ?? project.image;

  if (playVideo && project.video) {
    return <CinematicVideo className={className} src={project.video} poster={project.poster ?? still} alt={`${project.title} project preview`} />;
  }

  if (still) {
    return (
      <div className={className} style={{ position: "relative" }}>
        <Image src={still} alt={`${project.title} project preview`} fill priority={priority} sizes="(max-width: 767px) 78vw, (max-width: 1023px) 48vw, 32vw" className="object-cover" />
      </div>
    );
  }

  return (
    <div className={className} aria-label={`${project.title} project preview`}>
      <div className="project-preview-placeholder" aria-hidden>
        <span>{project.title}</span>
      </div>
    </div>
  );
}
