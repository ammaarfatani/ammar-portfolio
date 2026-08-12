import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { experiments, getExperiment } from "@/lib/experiments";

type LabDetailProps = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return experiments.map((experiment) => ({ slug: experiment.slug })); }
export async function generateMetadata({ params }: LabDetailProps): Promise<Metadata> { const experiment = getExperiment((await params).slug); return experiment ? { title: `${experiment.title} — The Lab`, description: experiment.description } : {}; }
export default async function LabDetail({ params }: LabDetailProps) { const experiment = getExperiment((await params).slug); if (!experiment) notFound(); return <main className="lab-detail"><Link href="/#playground" className="case-back"><ArrowLeft size={15} />Playground</Link><p>{experiment.category}</p><h1>{experiment.title}</h1><p className="lab-detail-description">{experiment.description}</p>{experiment.interactiveUrl && <a href={experiment.interactiveUrl} className="lab-detail-link">Open interactive experience <ArrowUpRight size={16} /></a>}</main>; }
