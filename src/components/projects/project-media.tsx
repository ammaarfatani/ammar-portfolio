import Image from "next/image";
import type { ProjectMedia as ProjectMediaType } from "@/lib/projects";
export { CinematicVideo } from "@/components/ui/cinematic-video";
import { CinematicVideo } from "@/components/ui/cinematic-video";

export function ProjectImage({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return <div className="case-image"><Image src={src} alt={alt} fill priority={priority} sizes="(max-width: 768px) 100vw, 88vw" /></div>;
}

export function ProjectGallery({ media }: { media: ProjectMediaType[] }) {
  return <div className="project-gallery">{media.map((item, index) => item.type === "video" ? <CinematicVideo key={item.src} src={item.src} poster={item.poster} alt={item.alt} /> : <ProjectImage key={item.src} src={item.src} alt={item.alt} priority={index === 0} />)}</div>;
}
